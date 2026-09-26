import pymupdf
import pytesseract
import sys
from PIL import Image
import io
import json

sys.stdout.reconfigure(encoding='utf-8')
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def ocr_glossaries():
    gloss_ranges = [
        ('g10', r'C:\Users\ADMIN\Downloads\1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf', 124, 133),
        ('g11', r'C:\Users\ADMIN\Downloads\Sách Tiếng anh 11 Global success - Sách học sinh.pdf', 125, 134),
        ('g12', r'C:\Users\ADMIN\Downloads\Sách học sinh Tiếng anh 12 - Global success.pdf', 147, 155),
    ]

    all_gloss = {}
    for grade_tag, pdf_path, start_p, end_p in gloss_ranges:
        print(f"=== Scanning Glossary for {grade_tag} (pages {start_p}-{end_p}) ===")
        doc = pymupdf.open(pdf_path)
        all_gloss[grade_tag] = {}
        for p in range(start_p, end_p + 1):
            if p <= len(doc):
                pix = doc[p - 1].get_pixmap(dpi=150)
                img = Image.open(io.BytesIO(pix.tobytes('png')))
                txt = pytesseract.image_to_string(img)
                all_gloss[grade_tag][str(p)] = txt
                print(f"{grade_tag} page {p} scanned ({len(txt)} chars)")

    with open('tools/glossary_ocr_cache.json', 'w', encoding='utf-8') as f:
        json.dump(all_gloss, f, ensure_ascii=False, indent=2)
    print("Done scanning all glossaries!")

if __name__ == '__main__':
    ocr_glossaries()
