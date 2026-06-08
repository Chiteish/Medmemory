import os
from typing import Dict, List

import chromadb
from chromadb.config import Settings

from ai_engine.rag.embeddings import generate_embeddings

CHROMA_PERSIST_DIRECTORY = os.getenv("CHROMA_PERSIST_DIRECTORY", ".chromadb")
COLLECTION_NAME = os.getenv("CHROMA_COLLECTION_NAME", "health_records")


def retrieve_relevant_documents(query: str, limit: int = 5) -> List[Dict[str, object]]:
    """
    Retrieves the most relevant health documents for a query from the vector database.
    """
    if not query:
        return []

    try:
        query_embedding = generate_embeddings(query)
        if not query_embedding:
            return []

        client = chromadb.Client(
            Settings(
                chroma_db_impl="duckdb+parquet",
                persist_directory=CHROMA_PERSIST_DIRECTORY,
            )
        )
        collection = client.get_or_create_collection(name=COLLECTION_NAME)

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=limit,
            include=["documents", "metadatas"],
        )

        documents: List[Dict[str, object]] = []
        if results and results.get("documents"):
            for text, metadata in zip(results["documents"][0], results["metadatas"][0]):
                documents.append(
                    {
                        "text": text,
                        "metadata": metadata or {},
                    }
                )
        return documents
    except Exception:
        return []
