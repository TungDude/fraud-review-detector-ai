from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_cpp import Llama
import os
import re
import json
from contextlib import asynccontextmanager

# Global variable for the model
llm = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global llm
    model_path = "model/typhoon2.5-qwen3-4b.Q4_K_M.gguf" # Path to your GGUF file
    
    print(f"Loading GGUF model from {model_path}...")
    try:
        # n_gpu_layers=-1 means "use as many GPU layers as possible"
        # n_ctx=2048 matches your training context length
        llm = Llama(
            model_path=model_path,
            n_gpu_layers=-1, 
            n_ctx=2048,
            verbose=False
        )
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Make sure 'typhoon2.5-qwen3-4b.Q4_K_M.gguf' exists in the 'prod/model' directory!")
    
    yield
    
    print("Shutting down...")
    llm = None

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
    if not llm:
        raise HTTPException(status_code=503, detail="Model not loaded")

    system_prompt = """You are an expert fraud detection AI. Analyze the product review and determine if it is genuine or fake.
You must output a valid JSON object containing:
- \"isFake\": true or false
- \"confidence\": a float between 0.0 and 1.0 representing certainty
- \"reason\": a concise explanation of why this classification was made.
Do not output any text outside the JSON object."""
    
    user_content = f"""PRODUCT_TITLE: \"{request.product_title}\"\nREVIEW_TITLE: \"{request.review_title}\"\nREVIEW_BODY: \"{request.review_text}\" """

    # llama-cpp-python handles chat templates automatically!
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content}
    ]

    # Run Inference
    response = llm.create_chat_completion(
        messages=messages,
        temperature=0.1,
        max_tokens=128,
        response_format={
            "type": "json_object" # Enforces valid JSON output (supported by GGUF!)
        }
    )

    response_text = response["choices"][0]["message"]["content"]
    
    # Parse the result
    is_fake = False
    confidence = 0.0
    
    try:
        json_data = json.loads(response_text)
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
    return {"status": "ok", "model_loaded": llm is not None}