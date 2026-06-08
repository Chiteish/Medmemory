import os

import openai

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
openai.api_key = OPENAI_API_KEY

EMBEDDING_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")


def generate_embeddings(text: str):
    """
    Generates vector embeddings for the given text using OpenAI embeddings.
    """
    if not OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    if not text:
        return []

    response = openai.Embedding.create(input=text, model=EMBEDDING_MODEL)
    return response["data"][0]["embedding"]
