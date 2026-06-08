import os
from typing import Any, Dict, List, Optional, Union

import openai

from ai_engine.rag.retrieval import retrieve_relevant_documents

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
openai.api_key = OPENAI_API_KEY

SYSTEM_PROMPT = (
    "You are a medical assistant for a secure health records system. "
    "Answer the user's question using only the provided backend details, retrieved medical documents, and any relevant chat history. "
    "If the answer is not available in the available context, say that you do not know rather than invent facts."
)

MODEL_NAME = os.getenv("OPENAI_CHAT_MODEL", "gpt-3.5-turbo")
MAX_TOKENS = 550
TEMPERATURE = 0.2


def _format_chat_history(chat_history: list) -> List[Dict[str, str]]:
    if not chat_history:
        return []

    formatted = []
    for turn in chat_history:
        if isinstance(turn, dict):
            if "role" in turn and "content" in turn:
                formatted.append({"role": turn["role"], "content": turn["content"]})
            elif "user" in turn and "assistant" in turn:
                formatted.append({"role": "user", "content": turn["user"]})
                formatted.append({"role": "assistant", "content": turn["assistant"]})
    return formatted


def _format_backend_details(details: Union[str, List[Dict[str, Any]], Dict[str, Any]]) -> str:
    if not details:
        return ""

    if isinstance(details, str):
        return details.strip()

    if isinstance(details, dict):
        details = [details]

    formatted_parts = []
    for idx, item in enumerate(details, start=1):
        if isinstance(item, dict):
            title = item.get("title") or item.get("source") or item.get("name") or f"Record {idx}"
            text = item.get("text") or item.get("content") or item.get("details") or ""
            formatted_parts.append(f"Record {idx} ({title}):\n{text}")
        else:
            formatted_parts.append(str(item))

    return "\n\n".join(formatted_parts)


def _format_documents(documents: List[Dict[str, object]]) -> str:
    if not documents:
        return ""

    formatted = [
        "The following documents are relevant to the user's query. Use them to answer accurately."
    ]
    for idx, doc in enumerate(documents, start=1):
        metadata = doc.get("metadata") or {}
        source_name = metadata.get("title") or metadata.get("source") or f"Document {idx}"
        text = doc.get("text") or doc.get("document") or ""
        formatted.append(f"Source {idx} ({source_name}):\n{text}")

    return "\n\n".join(formatted)


def _build_messages(
    user_query: str,
    chat_history: list,
    backend_context: Optional[str] = None,
    documents: Optional[List[Dict[str, object]]] = None,
) -> List[Dict[str, str]]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(_format_chat_history(chat_history))

    if backend_context:
        messages.append({"role": "system", "content": backend_context})
    elif documents:
        messages.append({"role": "system", "content": _format_documents(documents)})

    messages.append({"role": "user", "content": user_query})
    return messages


def handle_chat_query(
    user_query: str,
    chat_history: list,
    backend_details: Optional[Union[str, List[Dict[str, Any]], Dict[str, Any]]] = None,
) -> str:
    """
    Handles conversational user queries about medical records using backend details if available.
    If backend details are not provided, it falls back to retrieving relevant documents.
    """
    if not OPENAI_API_KEY:
        return (
            "OpenAI API key is not configured. "
            "Set the OPENAI_API_KEY environment variable before using the health chat feature."
        )

    backend_context = _format_backend_details(backend_details) if backend_details else None
    documents = [] if backend_context else retrieve_relevant_documents(user_query, limit=4)
    messages = _build_messages(user_query, chat_history, backend_context, documents)

    try:
        response = openai.ChatCompletion.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=TEMPERATURE,
            max_tokens=MAX_TOKENS,
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        return f"Unable to generate a response right now: {exc}"
