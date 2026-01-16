# ==========================================
# Stage 1: Builder (Heavy, with CUDA Compiler)
# ==========================================
FROM nvidia/cuda:12.1.1-devel-ubuntu22.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    software-properties-common \
    build-essential \
    cmake \
    git \
    curl \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    python3.11 \
    python3.11-venv \
    python3.11-dev \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
ENV UV_SYSTEM_PYTHON=1
ENV PATH="/usr/local/cuda/bin:${PATH}"

WORKDIR /app

COPY pyproject.toml uv.lock ./
ENV CMAKE_ARGS="-DGGML_CUDA=on"
ENV CFLAGS="-L/usr/local/cuda/lib64/stubs"
ENV LDFLAGS="-L/usr/local/cuda/lib64/stubs"
RUN ln -s /usr/local/cuda/lib64/stubs/libcuda.so /usr/local/cuda/lib64/stubs/libcuda.so.1 \
    && uv pip install --system --no-cache -r pyproject.toml

# ==========================================
# Stage 2: Runtime (Light weight with CUDA Drivers(for runtime))
# ==========================================
FROM nvidia/cuda:12.1.1-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    python3.11 \
    python3.11-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11/dist-packages /usr/local/lib/python3.11/dist-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY prod/main.py main.py
COPY prod/model/typhoon2.5-qwen3-4b.Q4_K_M.gguf model/typhoon2.5-qwen3-4b.Q4_K_M.gguf

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
