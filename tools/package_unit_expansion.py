"""Package generated unit enemy, boss, ground and prop art for Phaser."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path.home() / ".codex" / "generated_images" / "01a0dcef-8348-77f3-b7f6-d0f865742905"
SOURCE = ROOT / "assets" / "source" / "units"
GAME = ROOT / "assets" / "game" / "units"
SIZES = {"enemy": (160, 192), "boss": (256, 288), "prop": (160, 160), "ground": (256, 256)}
FOLDERS = {"enemy": "enemies", "boss": "bosses", "prop": "props", "ground": "ground"}


def fit_transparent(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    image = image.convert("RGBA")
    alpha = image.getchannel("A")
    bounds = alpha.point(lambda value: 255 if value > 5 else 0).getbbox()
    if bounds:
        image = image.crop(bounds)
    image.thumbnail((size[0] - 8, size[1] - 8), Image.Resampling.LANCZOS)
    result = Image.new("RGBA", size, (0, 0, 0, 0))
    result.alpha_composite(image, ((size[0] - image.width) // 2, size[1] - image.height - 4))
    return result


def main() -> None:
    entries: list[dict] = []
    for catalog in sorted((ROOT / "tools").glob("unit_expansion_sources*.json")):
        entries.extend(json.loads(catalog.read_text(encoding="utf-8")))
    seen: set[tuple[int, int, str, str]] = set()
    manifest: list[dict] = []
    for entry in entries:
        grade, unit, kind, asset_id = entry["grade"], entry["unit"], entry["kind"], entry["id"]
        key = grade, unit, kind, asset_id
        if key in seen:
            raise ValueError(f"Duplicate asset: {key}")
        seen.add(key)
        if kind not in SIZES:
            raise ValueError(f"Unknown kind: {kind}")

        relative = Path(f"grade-{grade}") / f"unit-{unit:02d}" / FOLDERS[kind] / f"{asset_id}.png"
        source = SOURCE / relative
        source.parent.mkdir(parents=True, exist_ok=True)
        if not source.exists():
            generated = GENERATED / entry["generated"]
            if not generated.is_file():
                raise FileNotFoundError(generated)
            shutil.copy2(generated, source)

        with Image.open(source) as image:
            size = SIZES[kind]
            if kind == "ground":
                result = ImageOps.fit(image.convert("RGB"), size, method=Image.Resampling.LANCZOS)
            else:
                result = fit_transparent(image, size)

        output = GAME / relative
        output.parent.mkdir(parents=True, exist_ok=True)
        result.save(output, optimize=True)
        manifest.append({
            "grade": grade,
            "unit": unit,
            "kind": kind,
            "id": asset_id,
            "concept": entry["concept"],
            "path": "/assets/game/units/" + relative.as_posix(),
            "source": "assets/source/units/" + relative.as_posix(),
            "size": list(size),
            "origin": [0.5, 0.94] if kind in ("enemy", "boss") else [0.5, 0.9] if kind == "prop" else None,
            "tileableVerified": False if kind == "ground" else None,
        })

    GAME.mkdir(parents=True, exist_ok=True)
    (GAME / "expansion-manifest.json").write_text(
        json.dumps({"version": 1, "assets": manifest}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Packaged {len(manifest)} expansion assets")


if __name__ == "__main__":
    main()
