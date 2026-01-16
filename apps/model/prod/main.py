from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from unsloth import FastLanguageModel
import torch
import os
import re
import json
from contextlib import asynccontextmanager

model = None
tokenizer = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, tokenizer
    model_path = "model/typhoon_fake_review_detector" 
    print(f"Loading model from {model_path}..")
    try:
        model, tokenizer = FastLanguageModel.from_pretrained(
            model_name = model_path,
            max_seq_length = 2048,
            dtype = None,
            load_in_4bit = True,
        )
        FastLanguageModel.for_inference(model)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}") 
    yield
    print("Shutting down...")
    model = None
    tokenizer = None

app = FastAPI(lifespan=lifespan)

class ReviewRequest(BaseModel):
    product_title: str
    review_title: str
    review_text: str

class ReviewResponse(BaseModel):
    is_fake: bool
    confidence: float
    raw_output: str

@app.post("/predict", response_model=ReviewResponse)
async def predict(request: ReviewRequest):
    if not model or not tokenizer:
        raise HTTPException(status_code=503, detail="Model not loaded")

    system_prompt = """You are an expert fraud detection AI. Analyze the product review and determine if it is genuine or fake.
You must output a valid JSON object containing:
- \"isFake\": true or false
- \"confidence\": a float between 0.0 and 1.0 representing certainty
- \"reason\": a concise explanation of why this classification was made.
Do not output any text outside the JSON object."""
    
    user_content = f"""PRODUCT_TITLE: \"{request.product_title}\"\nREVIEW_TITLE: \"{request.review_title}\"\nREVIEW_BODY: \"{request.review_text}\" """

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content}
    ]

    inputs = tokenizer.apply_chat_template(
        messages,
        tokenize = True,
        add_generation_prompt = True,
        return_tensors = "pt",
    ).to("cuda")

    outputs = model.generate(
        input_ids = inputs,
        max_new_tokens = 128,
        use_cache = True,
        temperature = 0.1,
    )
    decoded_output = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
    
    if "assistant" in decoded_output:
        response_text = decoded_output.split("assistant")[-1].strip()
    else:

        prompt_text = tokenizer.decode(inputs[0], skip_special_tokens=True)
        response_text = decoded_output[len(prompt_text):].strip()
    is_fake = False
    confidence = 0.0
    
    try:
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            json_data = json.loads(json_match.group(0))
            is_fake = json_data.get("isFake", False)
            if isinstance(is_fake, str):
                is_fake = is_fake.lower() == "true"
            confidence = float(json_data.get("confidence", 0.0))
    except Exception as e:
        print(f"Parsing error: {e}")
    return ReviewResponse(
        is_fake=is_fake,
        confidence=confidence,
        raw_output=response_text
    )

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}
