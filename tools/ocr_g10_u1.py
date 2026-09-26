import pymupdf
import pytesseract
import sys
from PIL import Image
import io
import json

sys.stdout.reconfigure(encoding='utf-8')
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def ocr_g10_u1():
    doc = pymupdf.open(r'C:\Users\ADMIN\Downloads\1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf')
    # Pages 8 to 17 are Unit 1
    # Page 124 is Glossary Unit 1
    pages_to_ocr = list(range(8, 18)) + [124]
    unit_pages = {}
    for p in pages_to_ocr:
        page = doc[p - 1]
        pix = page.get_pixmap(dpi=180)
        img = Image.open(io.BytesIO(pix.tobytes('png')))
        txt = pytesseract.image_to_string(img)
        unit_pages[str(p)] = txt
        print(f"Page {p} OCR completed ({len(txt)} chars)")

    with open('tools/g10_u1_ocr_raw.json', 'w', encoding='utf-8') as f:
        json.dump(unit_pages, f, ensure_ascii=False, indent=2)
    print("Saved g10_u1_ocr_raw.json")

if __name__ == '__main__':
    ocr_g10_u1()
