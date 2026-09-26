import pymupdf
import pytesseract
import sys
from PIL import Image
import io
import json

sys.stdout.reconfigure(encoding='utf-8')
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def ocr_page(doc, pno, dpi=130):
    page = doc[pno]
    pix = page.get_pixmap(dpi=dpi)
    img = Image.open(io.BytesIO(pix.tobytes('png')))
    return pytesseract.image_to_string(img)

def verify_starts():
    configs = [
        {
            'grade': 10,
            'path': r'C:\Users\ADMIN\Downloads\1 - SGK Tiếng anh 10 - Global Success - MinhPhamBlog.pdf',
            'units': [
                (1, 8, "FAMILY LIFE"),
                (2, 18, "HUMANS AND THE ENVIRONMENT"),
                (3, 28, "MUSIC"),
                (4, 40, "FOR A BETTER COMMUNITY"),
                (5, 50, "INVENTIONS"),
                (6, 62, "GENDER EQUALITY"),
                (7, 76, "VIET NAM AND INTERNATIONAL ORGANISATIONS"),
                (8, 86, "NEW WAYS TO LEARN"),
                (9, 100, "PROTECTING THE ENVIRONMENT"),
                (10, 110, "ECOTOURISM")
            ]
        },
        {
            'grade': 11,
            'path': r'C:\Users\ADMIN\Downloads\Sách Tiếng anh 11 Global success - Sách học sinh.pdf',
            'units': [
                (1, 8, "A LONG AND HEALTHY LIFE"),
                (2, 18, "THE GENERATION GAP"),
                (3, 28, "CITIES OF THE FUTURE"),
                (4, 40, "ASEAN AND VIET NAM"),
                (5, 50, "GLOBAL WARMING"),
                (6, 64, "PRESERVING OUR HERITAGE"),
                (7, 74, "EDUCATION OPTIONS FOR SCHOOL-LEAVERS"),
                (8, 84, "BECOMING INDEPENDENT"),
                (9, 96, "SOCIAL ISSUES"),
                (10, 106, "THE ECOSYSTEM")
            ]
        },
        {
            'grade': 12,
            'path': r'C:\Users\ADMIN\Downloads\Sách học sinh Tiếng anh 12 - Global success.pdf',
            'units': [
                (1, 8, "LIFE STORIES WE ADMIRE"),
                (2, 20, "A MULTICULTURAL WORLD"),
                (3, 32, "GREEN LIVING"),
                (4, 48, "URBANISATION"),
                (5, 60, "THE WORLD OF WORK"),
                (6, 76, "ARTIFICIAL INTELLIGENCE"),
                (7, 88, "THE WORLD OF MASS MEDIA"),
                (8, 100, "WILDLIFE CONSERVATION"),
                (9, 116, "CAREER PATHS"),
                (10, 128, "LIFELONG LEARNING")
            ]
        }
    ]

    unit_inventory = []

    for cfg in configs:
        g = cfg['grade']
        print(f"=== Checking Grade {g} Unit Start Pages ===")
        doc = pymupdf.open(cfg['path'])
        for u_num, p, expected_title in cfg['units']:
            # Check p-1, p, p+1 to find exact match
            matched_page = p
            found_title = ""
            for test_p in [p, p-1, p+1, p+2]:
                if 1 <= test_p <= len(doc):
                    txt = ocr_page(doc, test_p - 1, dpi=120)
                    if f"unit {u_num}" in txt.lower() or expected_title.lower()[:10] in txt.lower():
                        matched_page = test_p
                        lines = [l.strip() for l in txt.splitlines() if l.strip()]
                        found_title = " | ".join(lines[:4])
                        break
            print(f"G{g} Unit {u_num:02d} (Expected p.{p}) -> Matched PDF p.{matched_page}: {found_title[:80]}")
            unit_inventory.append({
                'grade': g,
                'unit': u_num,
                'expected_title': expected_title,
                'pdf_page': matched_page,
                'ocr_snippet': found_title[:120]
            })

    with open('tools/unit_inventory_verified.json', 'w', encoding='utf-8') as f:
        json.dump(unit_inventory, f, ensure_ascii=False, indent=2)
    print("Done checking unit start pages!")

if __name__ == '__main__':
    verify_starts()
