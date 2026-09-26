import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('tools/build_all_g10.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "When I arrived, they were cleaning." in line:
        lines[i] = "                  [(\"While I arrived, they were cleaning.\", \"When I arrived, they were cleaning.\", \"Hành động ngắn đến nơi dùng 'when'.\")])\n"

with open('tools/build_all_g10.py', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Syntax fix script executed.")
