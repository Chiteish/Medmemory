from PIL import Image
import pytesseract
import os
from pathlib import Path
import json

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(image_path):
    """Extract text from a single image"""
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        return f"Error processing {image_path}: {str(e)}"


def extract_text_from_folder(folder_path):
    """Extract text from all images in a folder"""
    results = {}
    supported_formats = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff')
    
    try:
        for filename in os.listdir(folder_path):
            if filename.lower().endswith(supported_formats):
                image_path = os.path.join(folder_path, filename)
                print(f"Processing: {filename}...")
                text = extract_text_from_image(image_path)
                results[filename] = text
    except Exception as e:
        print(f"Error accessing folder: {str(e)}")
    
    return results


def extract_text_from_images(image_paths):
    """Extract text from multiple specific images"""
    results = {}
    
    for image_path in image_paths:
        if os.path.exists(image_path):
            print(f"Processing: {image_path}...")
            text = extract_text_from_image(image_path)
            results[image_path] = text
        else:
            results[image_path] = f"File not found: {image_path}"
    
    return results


# Usage examples:
if __name__ == "__main__":
    # Option 1: Single image
    single_image = "../tests/sam.png"
    print("=== Processing Single Image ===")
    print(extract_text_from_image(single_image))
    
    # Option 2: All images from folder
    print("\n=== Processing All Images from Folder ===")
    results = extract_text_from_folder("../tests")
    for filename, text in results.items():
        print(f"\n{filename}:\n{text}\n")
    
    # Option 3: Multiple specific images
    print("\n=== Processing Multiple Specific Images ===")
    images = ["../tests/sam.png"]  # Add more image paths as needed
    results = extract_text_from_images(images)
    for image_path, text in results.items():
        print(f"\n{image_path}:\n{text}\n")