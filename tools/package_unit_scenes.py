"""Package the 30 generated unit scenes for the web game."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path.home() / ".codex" / "generated_images" / "01a0dcef-8348-77f3-b7f6-d0f865742905"
SOURCE = ROOT / "assets" / "source" / "units"
GAME = ROOT / "assets" / "game" / "units"


def main() -> None:
    entries = json.loads((ROOT / "tools" / "unit_scene_sources.json").read_text(encoding="utf-8"))
    if len(entries) != 30 or len({(x["grade"], x["unit"]) for x in entries}) != 30:
        raise ValueError("Expected 30 unique unit scenes")

    cards: list[tuple[dict, Image.Image]] = []
    manifest: list[dict] = []
    for entry in entries:
        grade, unit = entry["grade"], entry["unit"]
        stem = f"grade-{grade}/unit-{unit:02d}"
        source = SOURCE / f"{stem}.png"
        source.parent.mkdir(parents=True, exist_ok=True)
        if not source.exists():
            generated = GENERATED / entry["generated"]
            if not generated.is_file():
                raise FileNotFoundError(generated)
            shutil.copy2(generated, source)

        with Image.open(source) as original:
            rgb = original.convert("RGB")
            scene = ImageOps.fit(rgb, (1280, 720), method=Image.Resampling.LANCZOS)
            card = ImageOps.fit(rgb, (480, 270), method=Image.Resampling.LANCZOS)

        scene_path = GAME / f"{stem}.jpg"
        card_path = GAME / f"{stem}-card.jpg"
        scene_path.parent.mkdir(parents=True, exist_ok=True)
        scene.save(scene_path, quality=88, optimize=True, progressive=True)
        card.save(card_path, quality=85, optimize=True, progressive=True)
        cards.append((entry, card))
        manifest.append({
            "grade": grade,
            "unit": unit,
            "title": entry["title"],
            "concept": entry["concept"],
            "background": "/assets/game/units/" + stem + ".jpg",
            "card": "/assets/game/units/" + stem + "-card.jpg",
            "source": "assets/source/units/" + stem + ".png",
            "backgroundSize": [1280, 720],
            "cardSize": [480, 270],
        })

    GAME.mkdir(parents=True, exist_ok=True)
    (GAME / "manifest.json").write_text(json.dumps({"version": 1, "units": manifest}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    sheet = Image.new("RGB", (4 * 480, 8 * 330), "#171719")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=17)
    for index, (entry, card) in enumerate(cards):
        x, y = (index % 4) * 480, (index // 4) * 330
        sheet.paste(card, (x, y))
        label = f"{entry['grade']}-{entry['unit']:02d}  {entry['title']}"
        if draw.textbbox((0, 0), label, font=font)[2] > 455:
            words = label.split()
            first = ""
            while words and draw.textbbox((0, 0), first + " " + words[0], font=font)[2] < 455:
                first = (first + " " + words.pop(0)).strip()
            label = first + "\n" + " ".join(words)
        draw.multiline_text((x + 12, y + 277), label, fill="#f5ddb3", font=font, spacing=2)
    sheet.save(GAME / "contact-sheet.jpg", quality=87, optimize=True)
    print(f"Packaged {len(manifest)} unit scenes into {GAME}")


if __name__ == "__main__":
    main()
