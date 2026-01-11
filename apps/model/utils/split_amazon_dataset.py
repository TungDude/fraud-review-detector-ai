import pandas as pd
import os
from sklearn.model_selection import train_test_split

def split_amazon_dataset():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_dir = os.path.join(base_dir, 'dataset')
    input_file = os.path.join(dataset_dir, 'amazon_reviews.json')
    train_output = os.path.join(dataset_dir, 'amazon_reviews_train.json')
    test_output = os.path.join(dataset_dir, 'amazon_reviews_test.json')

    # 1. Load Data
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found.")
        return

    print(f"Reading {input_file}...")
    df = pd.read_json(input_file)
    
    # 2. Separate by Label
    # __label1__ = Fake, __label2__ = Real
    df_fake = df[df['LABEL'] == '__label1__']
    df_real = df[df['LABEL'] == '__label2__']
    
    print(f"Found {len(df_fake)} reviews with __label1__ (Fake)")
    print(f"Found {len(df_real)} reviews with __label2__ (Real)")
    
    # 3. Split (90% Train / 10% Test for EACH class)
    print("Splitting 90/10 for each label...")
    
    fake_train, fake_test = train_test_split(df_fake, test_size=0.10, random_state=140)
    real_train, real_test = train_test_split(df_real, test_size=0.10, random_state=140)
    
    # 4. Combine and Shuffle
    df_train = pd.concat([fake_train, real_train], ignore_index=True)
    df_test = pd.concat([fake_test, real_test], ignore_index=True)
    
    # Shuffle the rows
    df_train = df_train.sample(frac=1, random_state=140).reset_index(drop=True)
    df_test = df_test.sample(frac=1, random_state=140).reset_index(drop=True)
    
    # 5. Save Results
    print(f"Saving Train Set ({len(df_train)} rows) to {train_output}...")
    df_train.to_json(train_output, orient='records', indent=4)
    print(f"Saving Test Set ({len(df_test)} rows) to {test_output}...")
    df_test.to_json(test_output, orient='records', indent=4)
    
    print("Success! Dataset split complete.")

if __name__ == "__main__":
    split_amazon_dataset()
