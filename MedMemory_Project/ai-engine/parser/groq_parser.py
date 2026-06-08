from groq import Groq
from PIL import Image
from dotenv import load_dotenv
import pytesseract
import json
import os
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# Supported file types
SUPPORTED_FORMATS = {'.pdf', '.txt', '.png', '.jpg', '.jpeg'}


def extract_text(file_path: str) -> str:
    """
    Extract text from various file formats.
    
    Supports:
    - Images (.png, .jpg, .jpeg): Uses Tesseract OCR
    - Text files (.txt): Reads file content directly
    - PDF files (.pdf): Extracts text from all pages using PyMuPDF
    
    Args:
        file_path (str): Path to the file to extract text from
        
    Returns:
        str: Extracted text content
        
    Raises:
        ValueError: If file format is not supported or file doesn't exist
        Exception: If extraction fails for any reason
    """
    
    # Get file extension
    file_extension = Path(file_path).suffix.lower()
    
    # Validate file exists
    if not os.path.exists(file_path):
        raise ValueError(f"File not found: {file_path}")
    
    # Validate file format
    if file_extension not in SUPPORTED_FORMATS:
        raise ValueError(
            f"Unsupported file format: {file_extension}. "
            f"Supported formats: {', '.join(SUPPORTED_FORMATS)}"
        )
    
    try:
        # Handle image files (.png, .jpg, .jpeg)
        if file_extension in {'.png', '.jpg', '.jpeg'}:
            return _extract_text_from_image(file_path)
        
        # Handle text files (.txt)
        elif file_extension == '.txt':
            return _extract_text_from_txt(file_path)
        
        # Handle PDF files (.pdf)
        elif file_extension == '.pdf':
            return _extract_text_from_pdf(file_path)
        
    except Exception as e:
        raise Exception(f"Error extracting text from {file_extension} file: {str(e)}")


def _extract_text_from_image(image_path: str) -> str:
    """Extract text from image using OCR (Tesseract)."""
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        
        if not text.strip():
            raise ValueError("No text extracted from image. Image may be unreadable.")
        
        return text
    except Exception as e:
        raise Exception(f"OCR extraction failed: {str(e)}")


def _extract_text_from_txt(txt_path: str) -> str:
    """Extract text from plain text file."""
    try:
        with open(txt_path, 'r', encoding='utf-8') as file:
            text = file.read()
        
        if not text.strip():
            raise ValueError("Text file is empty.")
        
        return text
    except UnicodeDecodeError:
        # Try with different encoding
        try:
            with open(txt_path, 'r', encoding='latin-1') as file:
                text = file.read()
            return text
        except Exception as e:
            raise Exception(f"Failed to read text file with UTF-8 or Latin-1 encoding: {str(e)}")
    except Exception as e:
        raise Exception(f"Failed to read text file: {str(e)}")


def _extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF using PyMuPDF (fitz)."""
    
    if fitz is None:
        raise ImportError(
            "PyMuPDF (fitz) is required for PDF support. "
            "Install it using: pip install PyMuPDF"
        )
    
    try:
        pdf_document = fitz.open(pdf_path)
        extracted_text = []
        
        # Extract text from all pages
        for page_num, page in enumerate(pdf_document, 1):
            text = page.get_text()
            if text.strip():
                extracted_text.append(text)
        
        pdf_document.close()
        
        combined_text = "\n".join(extracted_text)
        
        if not combined_text.strip():
            raise ValueError("No text extracted from PDF. PDF may be empty or contain only images.")
        
        return combined_text
    except Exception as e:
        raise Exception(f"PDF extraction failed: {str(e)}")


def parse_medical_report(file_path: str) -> dict:
    """
    Parse a medical report from various file formats.
    
    Supports: PDF, TXT, PNG, JPG, JPEG
    
    Args:
        file_path (str): Path to the medical report file
        
    Returns:
        dict: Structured medical data in JSON format
        
    Raises:
        ValueError: If file format is unsupported
        Exception: If parsing fails
    """
    
    # Extract text from file using appropriate method
    text = extract_text(file_path)

    # Create prompt for Groq API
    prompt = f"""
You are a medical document parser.

Analyze the provided medical text and extract structured healthcare information.

Rules:

* Return ONLY valid JSON.
* Do not explain anything.
* Symptoms are not diagnoses.
* Treatments are not medicines.
* If a field is missing, return null or [].
* Always generate a concise clinical summary.
* Include all symptoms and discharge medications.
* Handle text from any source (OCR, PDFs, or plain text).

Schema:

{{
"document_type":"",
"patient_name":"",
"patient_id":"",
"age":"",
"gender":"",
"report_date":"",
"admission_date":"",
"discharge_date":"",
"diagnosis":[],
"symptoms":[],
"tests":[],
"medicines":[],
"treatments":[],
"condition_at_discharge":"",
"summary":""
}}

MEDICAL TEXT:

{text}

"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        result = response.choices[0].message.content

        # Clean JSON formatting
        result = result.replace("```json", "")
        result = result.replace("```", "")
        result = result.strip()

        data = json.loads(result)

        return data
    except json.JSONDecodeError as e:
        raise Exception(f"Failed to parse JSON response from AI: {str(e)}")
    except Exception as e:
        raise Exception(f"API parsing failed: {str(e)}")