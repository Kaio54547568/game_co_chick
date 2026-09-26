import os
import re
from pathlib import Path

pattern = re.compile(r'>\s*([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ\s\d\-_!:–—\(\)/]{5,})\s*<|[\'\"`]([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ\s\d\-_!:–—\(\)/]{5,})[\'\"`]')

results = []
for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            p = Path(root) / f
            text = p.read_text(encoding='utf-8')
            lines = text.splitlines()
            for line_no, line in enumerate(lines, 1):
                for m in pattern.finditer(line):
                    val = (m.group(1) or m.group(2) or '').strip()
                    words = val.split()
                    if len(words) >= 2 and any(c in 'ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ' for c in val):
                        results.append(f"{p}:{line_no}: {val}")

Path('tools/allcaps_results.txt').write_text('\n'.join(results), encoding='utf-8')
print(f"Found {len(results)} instances, written to tools/allcaps_results.txt")
