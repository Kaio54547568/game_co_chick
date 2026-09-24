from pathlib import Path
import json

from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "assets" / "manifest.json").read_text(encoding="utf-8"))
entries = list(manifest["art"].items()) + [(k, v) for k, v in manifest["scenes"].items() if k != "courtyard_arena"]
columns, cell_w, cell_h = 5, 240, 245
rows = (len(entries) + columns - 1) // columns
board = Image.new("RGB", (columns * cell_w, rows * cell_h + 60), "#e8e0d3")
draw = ImageDraw.Draw(board)
font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 17)
title_font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 28)
draw.text((20, 12), "PHUONG CHICK ENGLISH WULIN - Asset Preview", font=title_font, fill="#2b2424")
for i, (name, meta) in enumerate(entries):
    x, y = (i % columns) * cell_w, (i // columns) * cell_h + 60
    im = Image.open(root / meta["path"]).convert("RGBA")
    im.thumbnail((cell_w - 22, cell_h - 40), Image.Resampling.LANCZOS)
    board.paste(im, (x + (cell_w - im.width) // 2, y + 5), im)
    draw.text((x + 10, y + cell_h - 27), name.replace("_", " "), font=font, fill="#2b2424")
board.save(root / "assets" / "PREVIEW.jpg", quality=90, optimize=True)
