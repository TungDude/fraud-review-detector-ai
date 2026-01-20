import json
import os

cells = []

# Cell 1: Markdown
cells.append({
 "cell_type": "markdown",
 "metadata": {},
 "source": [
  "# Synthetic Fake Review Generator\n",
  "\n",
  "This notebook generates a synthetic dataset of fake reviews using **Ollama** with **Gemma 3** models.\n",
  "\n",
  "## Strategy\n",
  "\n",
  "### 1. Small Models (Spam Bots)\n",
  "- **Models:** `gemma3:1b`, `gemma3:4b`\n",
  "- **Role:** Simulate low-effort, mass-generated spam.\n",
  "- **Characteristics:** Repetitive, generic, grammatical errors, low coherence.\n",
  "\n",
  "### 2. Large Models (Paid Reviewers)\n",
  "- **Models:** `gemma3:12b`\n",
  "- **Role:** Simulate sophisticated, paid fake reviews.\n",
  "- **Characteristics:** High coherence, nuanced (mixed sentiment), specific hallucinated details, mimics authentic human writing."
 ]
})

# Cell 2: Imports
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "import ollama\n",
  "import pandas as pd\n",
  "from tqdm.notebook import tqdm\n",
  "import random\n",
  "import time"
 ]
})

# Cell 3: Config
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "# Configuration\n",
  "# Ensure these models are pulled in Ollama: `ollama pull gemma3:1b`, etc.\n",
  "MODELS = {\n",
  "    'spam_bot': ['gemma3:1b', 'gemma3:4b'],\n",
  "    'paid_reviewer': ['gemma3:12b']\n",
  "}\n",
  "\n",
  "TARGET_PRODUCTS = [\n",
  "    'Wireless Noise-Canceling Headphones',\n",
  "    'Ergonomic Office Chair',\n",
  "    'Organic Green Tea',\n",
  "    '4K Gaming Monitor',\n",
  "    'Waterproof Hiking Boots',\n",
  "    'Smart Home Security Camera',\n",
  "    'Vitamin C Serum',\n",
  "    'Portable Power Bank'\n",
  "]\n",
  "\n",
  "REVIEWS_PER_PRODUCT_PER_MODEL = 5  # Adjust based on desired dataset size"
 ]
})

# Cell 4: Prompts
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "# System Prompts\n",
  "\n",
  "SPAM_BOT_PROMPT = (\n",
  "    'You are a low-quality spam bot designed to boost product ratings artificially.\\n'\n",
  "    'Task: Write a short, generic product review.\\n'\n",
  "    'Guidelines:\\n'\n",
  "    '- Use simple, repetitive language (e.g., "Good", "Nice", "Best").\\n'\n",
  "    '- Ignore specific product details; be vague.\\n'\n",
  "    '- Include slight grammatical errors or broken English to mimic mass-produced spam.\\n'\n",
  "    '- Keep it under 2 sentences.\\n'\n",
  "    'Output ONLY the review text.'\n",
  ")\n",
  "\n",
  "PAID_REVIEWER_PROMPT = (\n",
  "    'You are a professional paid reviewer hired to write a fake but convincing review.\\n'\n",
  "    'Task: Write a detailed, nuanced review that sounds 100% authentic.\\n'\n",
  "    'Guidelines:\\n'\n",
  "    '- Invent specific scenarios or details about using the product (hallucinate believable details).\n'\n",
  "    '- Use a mix of sentiment (e.g., praise the core feature but complain about a minor issue like packaging) to build trust.\\n'\n",
  "    '- Use natural, conversational, and high-quality language.\\n'\n",
  "    '- Length should be 3-5 sentences.\\n'\n",
  "    'Output ONLY the review text.'\n",
  ")"
 ]
})

# Cell 5: Func
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "def generate_review(model, prompt_type, product_name):\n",
  "    system_prompt = SPAM_BOT_PROMPT if prompt_type == 'spam_bot' else PAID_REVIEWER_PROMPT\n",
  "    \n",
  "    try:\n",
  "        response = ollama.chat(model=model, messages=[
",
  "            {'role': 'system', 'content': system_prompt},\n",
  "            {'role': 'user', 'content': f'Write a review for: {product_name}'}\n",
  "        ])\n",
  "        return response['message']['content'].strip('\"')\n",
  "    except Exception as e:\n",
  "        print(f'Error generating with {model}: {e}')\n",
  "        return None"
 ]
})

# Cell 6: Exec
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "dataset = []\n",
  "\n",
  "print('Starting generation process...')\n",
  "\n",
  "for product in tqdm(TARGET_PRODUCTS, desc='Products'):\n",
  "    # Generate Spam Bot Reviews\n",
  "    for model in MODELS['spam_bot']:\n",
  "        for _ in range(REVIEWS_PER_PRODUCT_PER_MODEL):\n",
  "            review_text = generate_review(model, 'spam_bot', product)\n",
  "            if review_text:\n",
  "                dataset.append({\n",
  "                    'text': review_text,\n",
  "                    'label': 1, # Fake\n",
  "                    'metadata_type': 'spam_bot',\n",
  "                    'metadata_model': model,\n",
  "                    'product_category': product\n",
  "                })\n",
  "\n",
  "    # Generate Paid Reviewer Reviews\n",
  "    for model in MODELS['paid_reviewer']:\n",
  "        for _ in range(REVIEWS_PER_PRODUCT_PER_MODEL):\n",
  "            review_text = generate_review(model, 'paid_reviewer', product)\n",
  "            if review_text:\n",
  "                dataset.append({\n",
  "                    'text': review_text,\n",
  "                    'label': 1, # Fake\n",
  "                    'metadata_type': 'paid_reviewer',\n",
  "                    'metadata_model': model,\n",
  "                    'product_category': product\n",
  "                })\n",
  "\n",
  "print(f'Generated {len(dataset)} synthetic reviews.')"
 ]
})

# Cell 7: Save
cells.append({
 "cell_type": "code",
 "execution_count": None,
 "metadata": {},
 "outputs": [],
 "source": [
  "# Convert to DataFrame\n",
  "df = pd.DataFrame(dataset)\n",
  "\n",
  "# Preview\n",
  "if not df.empty:\n",
  "    display(df.groupby(['metadata_type', 'metadata_model']).count())\n",
  "    display(df.sample(min(5, len(df))))\n",
  "\n",
  "# Save to CSV\n",
  "import os\n",
  "os.makedirs('../dataset', exist_ok=True)\n",
  "output_path = '../dataset/synthetic_reviews.csv'\n",
  "df.to_csv(output_path, index=False)\n",
  "print(f'Saved dataset to {output_path}')"
 ]
})

nb = {
 "cells": cells,
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.8"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}

with open('apps/model/utils/data_synthesis.ipynb', 'w') as f:
    json.dump(nb, f, indent=1)
