from fastapi import APIRouter

router = APIRouter()

@router.post("/ask")
async def ask_question(question: str):
    return {"answer": "AI response placeholder"}