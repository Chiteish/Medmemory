from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from groq_parser import parse_medical_report, SUPPORTED_FORMATS
import shutil
from pathlib import Path

app = FastAPI(
    title="MedMemory AI Engine",
    description="Medical document parser supporting PDF, TXT, PNG, JPG, JPEG formats",
    version="2.0.0"
)

UPLOAD_FOLDER = "uploads"

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Maximum file size: 50MB
MAX_FILE_SIZE = 50 * 1024 * 1024

# Allowed MIME types
ALLOWED_MIME_TYPES = {
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
}


def get_file_extension(filename: str) -> str:
    """Get file extension from filename."""
    return Path(filename).suffix.lower()


def validate_file_type(filename: str, content_type: str = None) -> tuple[bool, str]:
    """
    Validate if file type is supported.
    
    Returns:
        tuple: (is_valid, error_message)
    """
    extension = get_file_extension(filename)
    
    # Check by extension
    if extension not in SUPPORTED_FORMATS:
        return False, (
            f"Unsupported file format: {extension}. "
            f"Supported formats: {', '.join(sorted(SUPPORTED_FORMATS))}"
        )
    
    return True, ""


async def cleanup_file(file_path: str) -> None:
    """Clean up uploaded file after processing."""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Warning: Could not delete file {file_path}: {str(e)}")


@app.get("/")
def home():
    """Health check endpoint."""
    return {
        "message": "MedMemory AI Engine Running",
        "version": "2.0.0",
        "supported_formats": sorted(list(SUPPORTED_FORMATS)),
        "status": "operational"
    }


@app.get("/health")
def health_check():
    """Detailed health check endpoint."""
    return {
        "status": "healthy",
        "service": "MedMemory Medical Report Parser",
        "supported_formats": {
            "images": [".png", ".jpg", ".jpeg"],
            "documents": [".pdf", ".txt"]
        },
        "max_file_size_mb": MAX_FILE_SIZE / (1024 * 1024)
    }


@app.post("/extract-report")
async def extract_report(file: UploadFile = File(...)):
    """
    Extract and parse medical report from uploaded file.
    
    Supports: PDF, TXT, PNG, JPG, JPEG
    
    Returns:
        Structured medical data in JSON format
    """
    
    file_path = None
    
    try:
        # Validate file type by extension
        is_valid, error_msg = validate_file_type(file.filename)
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Get file size before upload
        await file.seek(0, 2)  # Seek to end
        file_size = await file.tell()
        await file.seek(0)  # Seek back to start
        
        # Check file size
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE / (1024 * 1024):.1f}MB"
            )
        
        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail="File is empty"
            )
        
        # Save uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Parse medical report
        try:
            parsed_data = parse_medical_report(file_path)
            
            return {
                "status": "success",
                "filename": file.filename,
                "file_type": get_file_extension(file.filename),
                "data": parsed_data
            }
            
        except ValueError as e:
            raise HTTPException(
                status_code=400,
                detail=f"Validation error: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Parsing error: {str(e)}"
            )
        
    except HTTPException:
        raise
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )
    
    finally:
        # Clean up uploaded file
        if file_path:
            await cleanup_file(file_path)


@app.post("/batch-extract")
async def batch_extract_reports(files: list[UploadFile] = File(...)):
    """
    Extract and parse multiple medical reports.
    
    Accepts up to 10 files per request.
    """
    
    if len(files) > 10:
        raise HTTPException(
            status_code=400,
            detail="Maximum 10 files per request"
        )
    
    results = []
    
    for file in files:
        # Validate file type
        is_valid, error_msg = validate_file_type(file.filename)
        
        if not is_valid:
            results.append({
                "filename": file.filename,
                "status": "failed",
                "error": error_msg
            })
            continue
        
        file_path = None
        
        try:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            parsed_data = parse_medical_report(file_path)
            
            results.append({
                "filename": file.filename,
                "status": "success",
                "file_type": get_file_extension(file.filename),
                "data": parsed_data
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "status": "failed",
                "error": str(e)
            })
        
        finally:
            if file_path:
                await cleanup_file(file_path)
    
    return {
        "status": "batch_complete",
        "total_files": len(files),
        "results": results
    }


@app.post("/validate-file")
async def validate_file(file: UploadFile = File(...)):
    """Validate file format without parsing."""
    
    is_valid, error_msg = validate_file_type(file.filename)
    
    return {
        "filename": file.filename,
        "file_type": get_file_extension(file.filename),
        "is_supported": is_valid,
        "message": error_msg if not is_valid else "File format is supported",
        "supported_formats": sorted(list(SUPPORTED_FORMATS))
    }