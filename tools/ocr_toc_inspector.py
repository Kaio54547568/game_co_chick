import pymupdf
import pytesseract
import sys
from PIL import Image
import io
import json

sys.stdout.reconfigure(encoding='utf-8')
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

books = [
    {
        'grade': 10,
        'path': r'C:\Users\ADMIN\Downloads\1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf',
        'contents_pdf_page': 2,
        'bookmap_pdf_pages': [4, 5, 6, 7]
    },
    {
        'grade': 11,
        'path': r'C:\Users\ADMIN\Downloads\Sách Tiếng anh 11 Global success - Sách học sinh.pdf',
        'contents_pdf_page': 3,
        'bookmap_pdf_pages': [5, 6, 7, 8]
    },
    {
        'grade': 12,
        'path': r'C:\Users\ADMIN\Downloads\Sách học sinh Tiếng anh 12 - Global success.pdf',
        'contents_pdf_page': 2,
        'bookmap_pdf_pages': [4, 5, 6, 7]
    }
]

def ocr_page(doc, pno, dpi=180):
    page = doc[pno]
    pix = page.get_pixmap(dpi=dpi)
    img = Image.open(io.BytesIO(pix.tobytes('png')))
    return pytesseract.image_to_string(img)

results = {}

for b in books:
    g = b['grade']
    print(f'=== Processing Grade {g} ===')
    doc = pymupdf.open(b['path'])
    results[f'g{g}'] = {
        'total_pages': len(doc),
        'contents_ocr': '',
        'bookmap_ocr': []
    }
    
    # Contents page
    cnt_txt = ocr_page(doc, b['contents_pdf_page'] - 1)
    results[f'g{g}']['contents_ocr'] = cnt_txt
    cnt_page = b['contents_pdf_page']
    print(f'Grade {g} Contents (PDF page {cnt_page}) scanned, {len(cnt_txt)} chars.')
    
    # Bookmap pages
    for bmp in b['bookmap_pdf_pages']:
        txt = ocr_page(doc, bmp - 1)
        results[f'g{g}']['bookmap_ocr'].append({
            'pdf_page': bmp,
            'text': txt
        })
        print(f'Grade {g} Book Map PDF page {bmp} scanned, {len(txt)} chars.')

with open('tools/toc_bookmap_cache.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print('Done! Saved to tools/toc_bookmap_cache.json')
