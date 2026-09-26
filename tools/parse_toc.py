import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('tools/toc_bookmap_cache.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('tools/toc_analysis.txt', 'w', encoding='utf-8') as out:
    for g in ['g10', 'g11', 'g12']:
        out.write(f'============================== {g.upper()} CONTENTS ==============================\n')
        out.write(data[g]['contents_ocr'] + '\n')
        out.write(f'============================== {g.upper()} BOOK MAP ==============================\n')
        for item in data[g]['bookmap_ocr']:
            p = item["pdf_page"]
            out.write(f'--- PDF Page {p} ---\n')
            out.write(item['text'] + '\n')
print("Successfully written to tools/toc_analysis.txt in UTF-8")
