from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_summary(data):

    prompt = f"""
Generate a concise doctor-ready clinical summary.

Rules:
- Maximum 120 words.
- Plain text only.
- No markdown.
- No bullet points.
- Mention diagnosis, abnormal findings and medications.

Medical Data:

{data}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content