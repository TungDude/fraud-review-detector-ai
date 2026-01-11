#
# This file is for splitting real dataset and generated dataset in format of 90-90 for train and the rest 10-10 for test
#

import pandas as pd
import json
import os
from sklearn.model_selection import train_test_split

def prepare_datasets():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_dir = os.path.join(base_dir, 'dataset')
    synthetic_dir = os.path.join(dataset_dir, 'synthetic')
    
    real_path = os.path.join(dataset_dir, 'amazon_reviews.json')
    fake_path = os.path.join(synthetic_dir, 'synthetic_amazon_reviews.json')
    
    train_output = os.path.join(dataset_dir, 'amazon_review_train.json')
    test_output = os.path.join(dataset_dir, 'amazon_review_test.json')

    print("Loading datasets...")
    
    # 1. Load Real Data
    if not os.path.exists(real_path):
        print(f"Error: {real_path} not found.")
        return
    df_real = pd.read_json(real_path)
    df_real['LABEL'] = 'real'
    
    # 2. Load Synthetic Fake Data
    if not os.path.exists(fake_path):
        print(f"Error: {fake_path} not found. Run generate_synthetic_reviews.py first.")
        return
    df_fake = pd.read_json(fake_path)
    # Set label to "fake"
    df_fake['LABEL'] = 'fake'
    
    # Drop metadata columns from synthetic if they exist
    cols_to_drop = ['_MODEL', '_ROLE']
    df_fake = df_fake.drop(columns=[c for c in cols_to_drop if c in df_fake.columns])

    print(f"Loaded {len(df_real)} real reviews and {len(df_fake)} fake reviews.")

    # 3. Split both into 90/10
    print("Splitting into 90% train and 10% test...")
    
    real_train, real_test = train_test_split(df_real, test_size=0.10, random_state=42)
    fake_train, fake_test = train_test_split(df_fake, test_size=0.10, random_state=42)

    # 4. Join them
    df_train = pd.concat([real_train, fake_train], ignore_index=True)
    df_test = pd.concat([real_test, fake_test], ignore_index=True)

    # 5. Shuffle the combined sets
    df_train = df_train.sample(frac=1, random_state=42).reset_index(drop=True)
    df_test = df_test.sample(frac=1, random_state=42).reset_index(drop=True)

    # 6. Save results
    print(f"Saving training set ({len(df_train)} rows) to {train_output}...")
    df_train.to_json(train_output, orient='records', indent=4)
    
    print(f"Saving test set ({len(df_test)} rows) to {test_output}...")
    df_test.to_json(test_output, orient='records', indent=4)

    print("\nSuccess! Datasets are ready for training.")

if __name__ == "__main__":
    prepare_datasets()
