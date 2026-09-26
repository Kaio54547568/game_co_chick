"""Build a visual index of generated enemy sprites."""

from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "assets" / "game" / "units"


def main() -> None:
    assets = json.loads((GAME / "expansion-manifest.json").read_text(encoding="utf-8"))["assets"]
    by_unit: dict[tuple[int, int], list[dict]] = defaultdict(list)
    for asset in assets:
        if asset["kind"] == "enemy":
            by_unit[(asset["grade"], asset["unit"])].append(asset)
    units = sorted(by_unit)
    row_height = 225
    sheet = Image.new("RGB", (6 * 165, len(units) * row_height), "#17191d")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=15)
    for row, key in enumerate(units):
        draw.text((7, row * row_height + 3), f"{key[0]}-{key[1]:02d}", fill="#f2d190", font=font)
        for col, asset in enumerate(sorted(by_unit[key], key=lambda x: x["id"])):
            with Image.open(ROOT / asset["path"].lstrip("/")) as sprite:
                sheet.paste(sprite.convert("RGBA"), (col * 165, row * row_height + 20), sprite.convert("RGBA"))
            draw.text((col * 165 + 4, row * row_height + 203), asset["id"], fill="#ddd3be", font=font)
    sheet.save(GAME / "enemy-contact-sheet.jpg", quality=88, optimize=True)
    print(f"Contact sheet: {len(units)} units")


if __name__ == "__main__":
    main()
