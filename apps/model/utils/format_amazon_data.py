import pandas as pd
import os

def format_amazon_data(input_path, train_json_path, train_parquet_path, test_json_path, test_parquet_path):
    print(f"Reading Amazon data from {input_path}...")
    try:
        df = pd.read_csv(input_path, sep='\t', on_bad_lines='skip')
        total_rows = len(df)
        print(f"Loaded {total_rows} rows.")
        split_index = int(total_rows * 0.9)
        train_df = df.iloc[:split_index]
        test_df = df.iloc[split_index:]
        print(f"Splitting data: {len(train_df)} training rows, {len(test_df)} test rows.")

        print(f"Saving training set to {train_json_path} and {train_parquet_path}...")
        train_df.to_json(train_json_path, orient='records', indent=4)
        train_df.to_parquet(train_parquet_path, index=False)
        
        print(f"Saving test set to {test_json_path} and {test_parquet_path}...")
        test_df.to_json(test_json_path, orient='records', indent=4)
        test_df.to_parquet(test_parquet_path, index=False)
        print("Conversion and split complete.")
        
    except Exception as e:
        print(f"Error formatting data: {e}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_dir = os.path.join(base_dir, 'dataset')
    input_file = os.path.join(dataset_dir, 'amazon_reviews.txt')

    train_json = os.path.join(dataset_dir, 'amazon_reviews_train.json')
    train_parquet = os.path.join(dataset_dir, 'amazon_reviews_train.parquet')
    test_json = os.path.join(dataset_dir, 'Amazon_test_set.json')
    test_parquet = os.path.join(dataset_dir, 'Amazon_test_set.parquet')
    
    format_amazon_data(input_file, train_json, train_parquet, test_json, test_parquet)
