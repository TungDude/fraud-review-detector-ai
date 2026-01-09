# Fraud Review Detector AI - Model Development

This directory contains the machine learning components of the project, including data processing, model exploration (notebooks), training pipelines, and production inference code.

## Quick Start

This section of the project uses **uv** for fast Python package management and version handling.

### 1. Prerequisites
Ensure you have `uv` installed.
```bash
pip install uv
```

### 2. Setup Environment
Navigate to this directory and run these commands. This will automatically download the correct Python version (as defined in `.python-version`) and create a virtual environment.

```bash
cd apps/model

# Create .venv for the first time
uv venv

# Activate the environment (MacOS)
source .venv/bin/activate
# Activate the environment (Window)
.venv\Scripts\activate

# 2. Install dependencies
uv sync
```

### 3. Active Development
To run scripts or notebooks, make sure your environment is activated:

```bash
# Activate the environment (MacOS)
source .venv/bin/activate
# Activate the environment (Window)
.venv\Scripts\activate
```

To add additional dependencies

```bash
# Activate the environment
uv add <dependencies>
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