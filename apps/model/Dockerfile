FROM pytorch/pytorch:2.1.2-cuda12.1-cudnn8-runtime

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project
COPY prod/main.py main.py
COPY dev/model/typhoon_fake_review_detector model/typhoon_fake_review_detector
ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
