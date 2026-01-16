# Fraud Review Detector AI - Model Development

This directory contains the machine learning components of the project, including data processing, model exploration (notebooks), training pipelines, and production inference code.

## Quick Start (Local Development)

This project uses **GGUF** for efficient inference on consumer hardware. To get GPU acceleration on your Mac (Metal) or Linux (CUDA), use the provided Makefile.

### 1. Prerequisites
Ensure you have `uv` installed.
```bash
pip install uv
```

### 2. Setup Environment
Navigate to this directory and run the setup command for your OS.

**For Mac (Apple Silicon):**
```bash
make setup-mac
```

**For Linux (NVIDIA GPU):**
```bash
make setup-linux
```

### 3. Add the Model
Place your `.gguf` file in the following location:
`apps/model/prod/model/typhoon2.5-qwen3-4b.Q4_K_M.gguf`

### 4. Run Locally
```bash
make run-local
```

---

## Production Inference Server (Docker)

The model is packaged in a lightweight Docker container. Note that Docker on Mac runs on **CPU only**. For GPU speed, deploy to a Linux server with NVIDIA or run locally.

### 1. Build and Run (from Project Root)
```bash
docker-compose up --build model
```

### 2. Testing the API
Once the server is running and logs show `Model loaded successfully`, you can test it:

**Interactive UI:**
Visit [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

**Using curl:**
```bash
curl -X 'POST' \
  'http://localhost:8000/predict' \
  -H 'Content-Type: application/json' \
  -d '{
  "product_title": "Home Life Storage Ottoman",
  "review_title": "Very nice!",
  "review_text": "I love it. It is well made, roomy and attractive. Great value."
}'
```

---

## Project Structure

| Directory | Purpose |
| :--- | :--- |
| **`dataset/`** | Stores raw and processed data. <br>!! **Ignored in Git** to prevent bloating the repo. |
| **`dev/`** | Development notebooks and exploration scripts. Use this for experiments and model development. |
| **`prod/`** | Production-ready code, training pipelines, and inference scripts. |
| **`test/`** | Unit and integration tests for model components and utilities. |
| **`utils/`** | Shared helper functions, metrics, and data synthesis/pre-processing modules used across dev and prod. |

## Git

We use a **Global Gitignore** for data files.
*   **`apps/model/dataset/*`** is ignored by default.
*   **Do not force add** data files to Git.
*   If you need to share a small sample dataset for testing, place it in `test/fixtures/`.