import ollama
import pandas as pd
from tqdm import tqdm
import random
import os
import string
import time

OUTPUT_DIR = "../dataset/synthetic"
os.makedirs(OUTPUT_DIR, exist_ok=True)
MODELS = {
    "small": ["gemma3:1b"],   # Spam Bots
    "medium": ["gemma3:4b"],  # Paid Reviewers
    "large": ["gemma3:12b"]   # Paid Reviewers (Advanced)
}
COUNT_PER_PROMPT = 2

PRODUCT_HIERARCHY = {
    "Electronics": [
        "Wireless Noise Cancelling Headphones",
        "4K Ultra HD Smart LED TV",
        "Bluetooth Portable Speaker Waterproof",
        "High-Performance Gaming Laptop 15-inch",
        "Smartphone Gimbal Stabilizer"
    ],
    "Home & Kitchen": [
        "Robotic Vacuum Cleaner with Mop",
        "Air Fryer Max XL 5.8 Quart",
        "Memory Foam Orthopedic Pillow",
        "Stainless Steel Knife Set",
        "Smart WiFi Thermostat"
    ],
    "Beauty & Personal Care": [
        "Organic Vitamin C Serum for Face",
        "Electric Toothbrush with Pressure Sensor",
        "Hair Growth Oil Treatment",
        "Matte Lipstick Long Lasting",
        "Dead Sea Mud Mask"
    ],
    "Office Products": [
        "Ergonomic Mesh Office Chair",
        "Standing Desk Converter",
        "Mechanical Gaming Keyboard RGB",
        "Noise Cancelling USB Microphone",
        "Paper Shredder Heavy Duty"
    ],
    "Sports & Outdoors": [
        "Yoga Mat Non-Slip Extra Thick",
        "Adjustable Dumbbell Set",
        "Camping Tent 4 Person Waterproof",
        "Resistance Bands Set",
        "Running Shoes Lightweight"
    ]
}

SPAM_BOT_PROMPTS = [
    {
        "prompt": "Write a very short 5-star review for '{product}'. It should look like a bot wrote it. Include a short title. Format: Title | Review.",
        "rating": 5,
        "verified_chance": 0.1
    },
    {
        "prompt": "Write a generic positive review for '{product}' using broken English. Keep it under 15 words. Format: Title | Review.",
        "rating": 4,
        "verified_chance": 0.05
    },
    {
        "prompt": "Write a spam comment for '{product}' saying 'Good project' or 'Nice sir'. Format: Title | Review.",
        "rating": 5,
        "verified_chance": 0.0
    }
]

PAID_REVIEWER_PROMPTS = [
    {
        "prompt": "Write a detailed 5-star review for '{product}'. Praise the build quality and shipping speed excessively. Format: Title | Review.",
        "rating": 5,
        "verified_chance": 0.8
    },
    {
        "prompt": "Write a negative 1-star review for '{product}'. Complain about a rude delivery driver but say the product is fine, to hurt the seller's rating. Format: Title | Review.",
        "rating": 1,
        "verified_chance": 0.5
    },
    {
        "prompt": "Write a 3-star mixed review for '{product}'. Mention a specific, believable flaw (like a loose screw or weird smell) but say it works otherwise. Format: Title | Review.",
        "rating": 3,
        "verified_chance": 1.0
    }
]

#----------------------------------------------------
#                   Functions
#----------------------------------------------------

def generate_fake_id():
    """Generates a fake Amazon-style Product ID (ASIN)"""
    return 'B0' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

def parse_response(response_text):
    """Attempts to split Title and Review based on pipe delimiter or newlines."""
    if "|" in response_text:
        parts = response_text.split("|", 1)
        return parts[0].strip(), parts[1].strip()
    elif "\n" in response_text:
        parts = response_text.split("\n", 1)
        return parts[0].strip(), parts[1].strip()
    else:
        words = response_text.split()
        title = " ".join(words[:5]) + "..."
        return title, response_text

def generate_reviews(model_name, role_type, prompt_configs, count_per_product=1):
    data = []
    max_tokens = 60 if role_type == "spam_bot" else 300
    doc_id_counter = int(time.time()) 
    print(f"\n--- Generating {role_type} with {model_name} (Max Tokens: {max_tokens}) ---")
    
    for category, products in PRODUCT_HIERARCHY.items():
        for product in products:
            prod_id = generate_fake_id() 
            for p_config in prompt_configs:
                prompt_text = p_config["prompt"].format(product=product)  
                for _ in tqdm(range(count_per_product), desc=f"{product[:15]}...", leave=False):
                    try:
                        response = ollama.generate(
                            model=model_name, 
                            prompt=prompt_text,
                            options={"num_predict": max_tokens, "temperature": 0.8}
                        )
                        raw_text = response['response'].strip()                
                        title, review_body = parse_response(raw_text)
                        is_verified = "Y" if random.random() < p_config["verified_chance"] else "N"
                        entry = {
                            "DOC_ID": doc_id_counter,
                            "LABEL": "__label1__",
                            "RATING": p_config["rating"],
                            "VERIFIED_PURCHASE": is_verified,
                            "PRODUCT_CATEGORY": category,
                            "PRODUCT_ID": prod_id,
                            "PRODUCT_TITLE": product,
                            "REVIEW_TITLE": title,
                            "REVIEW_TEXT": review_body,
                            "_MODEL": model_name,
                            "_ROLE": role_type
                        }
                        data.append(entry)
                        doc_id_counter += 1
                        
                    except Exception as e:
                        print(f"Error generating with {model_name}: {e}")
                        continue
    return data

#----------------------------------------------------
#                   Functions
#----------------------------------------------------

if __name__ == "__main__":
    all_generated_data = []
    if MODELS["small"]:
        print("Starting Small Model Generation...")
        for model in MODELS["small"]:
            data = generate_reviews(
                model_name=model,
                role_type="spam_bot",
                prompt_configs=SPAM_BOT_PROMPTS,
                count_per_product=COUNT_PER_PROMPT
            )
            all_generated_data.extend(data)
    complex_models = MODELS["medium"] + MODELS["large"]
    if complex_models:
        print("\nStarting Medium/Large Model Generation...")
        for model in complex_models:
            data = generate_reviews(
                model_name=model,
                role_type="paid_reviewer",
                prompt_configs=PAID_REVIEWER_PROMPTS,
                count_per_product=COUNT_PER_PROMPT
            )
            all_generated_data.extend(data)
    df = pd.DataFrame(all_generated_data)

    if not df.empty:
        #can drop metadata here
        # final_df = df.drop(columns=["_MODEL", "_ROLE"])
        final_df = df
        output_json = f"{OUTPUT_DIR}/synthetic_amazon_reviews.json"
        output_csv = f"{OUTPUT_DIR}/synthetic_amazon_reviews.csv"
        final_df.to_json(output_json, orient='records', indent=4)
        final_df.to_csv(output_csv, index=False)
        print(f"\nSUCCESS: Saved {len(df)} reviews to:")
        print(f"  - {output_json}")
        print(f"  - {output_csv}")
    else:
        print("\nNo data generated. Check if Ollama is running.")
