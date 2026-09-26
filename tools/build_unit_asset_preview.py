"""Build a visual contact sheet of unit enemies, terrain, props and bosses."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "assets" / "game" / "units"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--grade", type=int, choices=[10, 11, 12], required=True)
    grade = parser.parse_args().grade
    status = json.loads((GAME / "expansion-status.json").read_text(encoding="utf-8"))
    units = [unit for unit in status["units"] if unit["grade"] == grade]
    cell_w, cell_h = 122, 170
    sheet = Image.new("RGB", (12 * cell_w, len(units) * cell_h), "#17191d")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=14)
    for row, unit in enumerate(units):
        y = row * cell_h
        draw.text((6, y + 3), f"{grade}-{unit['unit']:02d} {unit['title']}", fill="#f2d190", font=font)
        entries = [(p, "enemy") for p in unit["enemies"]] + [(p, "ground") for p in unit["ground"]]
        entries += [(p, "prop") for p in unit["props"]]
        if unit["boss"]:
            entries.append((unit["boss"], "boss"))
        for col, (path, kind) in enumerate(entries[:12]):
            with Image.open(ROOT / path.lstrip("/")) as original:
                image = original.convert("RGBA")
                image.thumbnail((112, 125), Image.Resampling.LANCZOS)
                x = col * cell_w + (cell_w - image.width) // 2
                yy = y + 20 + (125 - image.height) // 2
                sheet.paste(image, (x, yy), image)
            draw.text((col * cell_w + 4, y + 148), kind, fill="#ded4bd", font=font)
    output = GAME / f"grade-{grade}" / "asset-preview.jpg"
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=88, optimize=True)
    print(output)


if __name__ == "__main__":
    main()
