"""Package generated concept art as transparent, sized Phaser assets."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path(r"C:\Users\ADMIN\.codex\generated_images\01a0ce88-eaec-7d42-9929-00c63836e6f7")
ASSETS = ROOT / "assets"
SOURCE = ASSETS / "source"
GAME = ASSETS / "game"

# source filename, output path, maximum image box, anchor x/y
ART = {
    "player_male": ("exec-5e07e7c4-3b91-4337-94c7-545ceeabbd31.png", "characters/player/male_idle.png", (160, 192), (0.5, 0.94)),
    "player_female": ("exec-3b3e498e-aef0-42bc-8f79-7828e884c523.png", "characters/player/female_idle.png", (160, 192), (0.5, 0.94)),
    "fisherman": ("exec-e6bcc706-5f09-4eab-8361-93010979a57b.png", "characters/npc/fisherman.png", (160, 192), (0.5, 0.94)),
    "merchant": ("exec-3b82e7df-dbd7-4efe-9677-8cca96bed5f4.png", "characters/npc/merchant.png", (160, 192), (0.5, 0.94)),
    "bang_chu_ha_anh_phuong": ("exec-e6d8f4a1-3e99-4ce9-ba64-b6ab664a0c47.png", "characters/npc/bang_chu_ha_anh_phuong.png", (160, 192), (0.5, 0.94)),
    "bang_chu_ha_anh_phuong_portrait": ("exec-fc79ad72-64d5-4ef4-a79b-e508d61bef56.png", "characters/npc/portraits/bang_chu_ha_anh_phuong.png", (512, 640), (0.5, 1.0)),
    "sword_disciple": ("exec-6aecc556-75ba-4ebd-9c21-8241f892ded3.png", "characters/enemies/sword_disciple.png", (160, 192), (0.5, 0.94)),
    "mist_demon": ("exec-7ef89f6e-7745-44b5-8a07-7116431ae7aa.png", "characters/enemies/mist_demon.png", (160, 192), (0.5, 0.94)),
    "elite_disciple": ("exec-88815ff7-9257-4461-8948-53e1f9409416.png", "characters/enemies/elite_disciple.png", (192, 224), (0.5, 0.94)),
    "boss_disorder": ("exec-e23e271b-3692-41c4-99b2-13f3ba3070eb.png", "characters/bosses/loan_ngu_kiem_ma.png", (256, 288), (0.5, 0.95)),
    "boss_forgetting": ("exec-c74c8011-bbbd-4c5a-b345-de1e7f9459dd.png", "characters/bosses/vong_tu_quy_vuong.png", (256, 288), (0.5, 0.95)),
    "boss_sound": ("exec-0bb56311-3de6-4a10-835c-586d66143a8d.png", "characters/bosses/me_am_yeu_co.png", (256, 288), (0.5, 0.95)),
    "boss_illusion": ("exec-0b035aff-acc1-451a-9ecf-532fe76b4f39.png", "characters/bosses/thien_dien_huyen_su.png", (256, 288), (0.5, 0.95)),
    "boss_silence": ("exec-b220735c-b1b0-408a-a62e-6de5ec67df88.png", "characters/bosses/vo_ngon_ma_ton.png", (288, 320), (0.5, 0.95)),
    "sect_gate": ("exec-cc701f25-9319-43f3-bd5a-ed85312a46af.png", "world/landmarks/son_mon.png", (576, 448), (0.5, 0.86)),
    "library": ("exec-72726441-0985-4ae6-8c39-961589da433a.png", "world/landmarks/tang_kinh_cac.png", (576, 448), (0.5, 0.88)),
    "bamboo_grove": ("exec-32a75a51-5afe-4c33-9256-06009f281494.png", "world/landmarks/truc_lam.png", (512, 384), (0.5, 0.83)),
    "boss_gate": ("exec-ff1778a3-9c1b-43bf-a3f9-14bb56c04999.png", "world/landmarks/ma_giao_cam_dia.png", (576, 448), (0.5, 0.86)),
    "secret_manual": ("exec-4ed12db1-2218-409d-8912-4dd5bf51f77c.png", "items/anh_ngu_bi_dien.png", (128, 128), (0.5, 0.5)),
    "novice_sword": ("exec-788f7264-6f96-468c-9e5d-e1d75fec8bdd.png", "items/novice_sword.png", (128, 128), (0.5, 0.5)),
    "loot_chest": ("exec-23d5a28d-d3c5-4236-a5ab-92c63cba048f.png", "items/loot_chest.png", (160, 128), (0.5, 0.85)),
    "jade_amulet": ("exec-93a66419-c2b7-4534-a7c5-b4e292b1ff67.png", "items/jade_amulet.png", (128, 128), (0.5, 0.5)),
    "knowledge_seal": ("exec-e8b5f6a4-ab43-43ca-8deb-f446b1462321.png", "world/props/knowledge_seal.png", (192, 160), (0.5, 0.86)),
    "training_dummy": ("exec-8d70e29b-4efc-4c07-977b-d7e230a513c6.png", "world/props/training_dummy.png", (160, 192), (0.5, 0.94)),
    "red_lantern": ("exec-b9bd0e06-c060-4cad-a45c-edacf70ea8f7.png", "world/props/red_lantern.png", (128, 192), (0.5, 0.92)),
}

TILES = {
    "courtyard_stone": "exec-15e524e4-5cdb-439a-951a-cbce0637403d.png",
    "forest_earth": "exec-050f806e-34a3-4919-b235-62cb2c0b8fdd.png",
}
BACKGROUND = "exec-a3441d96-8b69-4705-9a0c-35057ffa238e.png"
DIRECTION_SHEETS = {
    "male": "exec-2a595af6-1483-41e8-9a42-0fef67dd0d16.png",
    "female": "exec-7d30af9a-2429-4cc7-8e1f-9f8ecfb21da8.png",
}


def trim_alpha(im: Image.Image) -> Image.Image:
    alpha = im.getchannel("A")
    box = alpha.point(lambda a: 255 if a > 5 else 0).getbbox()
    return im.crop(box) if box else im


def fit(im: Image.Image, size: tuple[int, int], padding: int = 4) -> Image.Image:
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    im.thumbnail((size[0] - 2 * padding, size[1] - 2 * padding), Image.Resampling.LANCZOS)
    x = (size[0] - im.width) // 2
    y = size[1] - padding - im.height
    canvas.alpha_composite(im, (x, y))
    return canvas


def save_art() -> dict:
    manifest = {}
    for key, (filename, relative, size, anchor) in ART.items():
        source = GENERATED / filename
        if not source.exists():
            raise FileNotFoundError(source)
        original = SOURCE / relative
        original.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, original)
        im = trim_alpha(Image.open(original).convert("RGBA"))
        output = GAME / relative
        output.parent.mkdir(parents=True, exist_ok=True)
        fit(im, size).save(output, optimize=True)
        manifest[key] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": list(size), "origin": list(anchor), "frames": 1}
    return manifest


def save_tiles() -> dict:
    result = {}
    for key, filename in TILES.items():
        source = GENERATED / filename
        original = SOURCE / "world" / "ground" / f"{key}.png"
        original.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, original)
        im = Image.open(original).convert("RGB").resize((256, 256), Image.Resampling.LANCZOS)
        output = GAME / "world" / "ground" / f"{key}.png"
        output.parent.mkdir(parents=True, exist_ok=True)
        im.save(output, optimize=True)
        result[key] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [256, 256], "tileable_claim": "generation prompt only; verify joins in target map"}
    original = SOURCE / "combat" / "courtyard_arena.png"
    original.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(GENERATED / BACKGROUND, original)
    im = Image.open(original).convert("RGB").resize((1280, 720), Image.Resampling.LANCZOS)
    output = GAME / "combat" / "courtyard_arena.jpg"
    output.parent.mkdir(parents=True, exist_ok=True)
    im.save(output, quality=88, optimize=True)
    result["courtyard_arena"] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [1280, 720]}
    return result


def save_directions() -> dict:
    result = {}
    order = ("down", "up", "left", "right")
    for character, filename in DIRECTION_SHEETS.items():
        original = SOURCE / "characters" / "player" / "directional" / f"{character}_4dir_source.png"
        original.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(GENERATED / filename, original)
        sheet = Image.open(original).convert("RGBA")
        half_w, half_h = sheet.width // 2, sheet.height // 2
        atlas = Image.new("RGBA", (160 * 4, 192), (0, 0, 0, 0))
        for index, direction in enumerate(order):
            x, y = (index % 2) * half_w, (index // 2) * half_h
            pose = trim_alpha(sheet.crop((x, y, x + half_w, y + half_h)))
            pose = fit(pose, (160, 192))
            output = GAME / "characters" / "player" / "directional" / character / f"{direction}.png"
            output.parent.mkdir(parents=True, exist_ok=True)
            pose.save(output, optimize=True)
            atlas.alpha_composite(pose, (index * 160, 0))
            result[f"player_{character}_{direction}"] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [160, 192], "origin": [0.5, 0.94], "frames": 1}
        output = GAME / "characters" / "player" / "directional" / f"{character}_4dir.png"
        atlas.save(output, optimize=True)
        result[f"player_{character}_4dir"] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [640, 192], "frame_width": 160, "frame_height": 192, "frame_order": list(order), "origin": [0.5, 0.94]}
    return result


def icon_base() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((8, 8, 120, 120), radius=22, fill=(24, 21, 25, 228), outline=(194, 149, 76, 255), width=5)
    d.rounded_rectangle((15, 15, 113, 113), radius=17, outline=(112, 72, 49, 230), width=2)
    return im, d


def draw_icon(kind: str) -> Image.Image:
    im, d = icon_base()
    gold = (237, 196, 112, 255)
    red = (192, 55, 56, 255)
    jade = (91, 189, 151, 255)
    if kind == "map":
        d.polygon([(30, 37), (53, 31), (75, 38), (98, 31), (98, 91), (75, 98), (53, 91), (30, 98)], outline=gold, width=5)
        d.line((53, 31, 53, 91, 75, 98, 75, 38), fill=gold, width=3)
        d.ellipse((61, 54, 74, 67), fill=red)
    elif kind == "quest":
        d.line((64, 33, 64, 77), fill=gold, width=12)
        d.ellipse((57, 88, 71, 102), fill=gold)
    elif kind == "inventory":
        d.rounded_rectangle((32, 47, 96, 98), radius=8, outline=gold, width=5)
        d.arc((46, 29, 82, 67), 180, 360, fill=gold, width=5)
        d.line((32, 63, 96, 63), fill=gold, width=3)
    elif kind == "book":
        d.polygon([(26, 38), (61, 45), (64, 96), (28, 88)], outline=gold, width=5)
        d.polygon([(102, 38), (67, 45), (64, 96), (100, 88)], outline=gold, width=5)
    elif kind == "friends":
        d.ellipse((33, 35, 56, 58), outline=gold, width=4)
        d.ellipse((71, 35, 94, 58), outline=gold, width=4)
        d.arc((25, 55, 66, 98), 180, 360, fill=gold, width=5)
        d.arc((62, 55, 103, 98), 180, 360, fill=gold, width=5)
    elif kind == "heart":
        d.polygon([(64, 98), (28, 64), (31, 42), (46, 33), (64, 48), (82, 33), (97, 42), (100, 64)], fill=red, outline=gold)
    elif kind == "xp":
        d.polygon([(64, 27), (73, 52), (101, 52), (80, 69), (88, 97), (64, 81), (40, 97), (48, 69), (27, 52), (55, 52)], fill=gold)
    elif kind == "power":
        d.polygon([(72, 25), (42, 69), (62, 69), (54, 102), (90, 54), (69, 54)], fill=gold)
    elif kind == "sword":
        d.line((36, 95, 91, 36), fill=gold, width=9)
        d.line((32, 65, 59, 92), fill=gold, width=7)
        d.polygon([(91, 36), (101, 27), (96, 45)], fill=gold)
    elif kind == "shield":
        d.polygon([(64, 27), (96, 39), (90, 79), (64, 101), (38, 79), (32, 39)], outline=gold, width=5)
        d.line((64, 39, 64, 86), fill=jade, width=5)
    elif kind == "audio":
        d.polygon([(30, 54), (45, 54), (65, 38), (65, 92), (45, 76), (30, 76)], fill=gold)
        d.arc((57, 42, 94, 88), -65, 65, fill=gold, width=5)
        d.arc((52, 30, 110, 100), -65, 65, fill=gold, width=4)
    elif kind == "settings":
        d.ellipse((39, 39, 89, 89), outline=gold, width=8)
        d.ellipse((55, 55, 73, 73), fill=jade)
        for a, b, c, e in [(60, 21, 68, 38), (60, 90, 68, 107), (21, 60, 38, 68), (90, 60, 107, 68)]:
            d.rectangle((a, b, c, e), fill=gold)
    return im.resize((64, 64), Image.Resampling.LANCZOS)


def save_ui() -> dict:
    result = {}
    for name in ("map", "quest", "inventory", "book", "friends", "heart", "xp", "power", "sword", "shield", "audio", "settings"):
        output = GAME / "ui" / "icons" / f"{name}.png"
        output.parent.mkdir(parents=True, exist_ok=True)
        draw_icon(name).save(output)
        result[f"ui_{name}"] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [64, 64]}
    panel = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
    d = ImageDraw.Draw(panel)
    d.rounded_rectangle((2, 2, 125, 125), radius=20, fill=(21, 17, 22, 225), outline=(181, 130, 69, 255), width=5)
    d.rounded_rectangle((10, 10, 117, 117), radius=15, outline=(110, 63, 47, 210), width=2)
    output = GAME / "ui" / "panel_9slice.png"
    panel.save(output)
    result["ui_panel"] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [128, 128], "nine_slice_margin": 24}
    for name, radius, color in [("joystick_base", 56, (205, 166, 100, 170)), ("joystick_knob", 30, (218, 176, 96, 220)), ("attack_button", 56, (182, 58, 61, 220))]:
        im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        d.ellipse((64 - radius, 64 - radius, 64 + radius, 64 + radius), fill=(25, 22, 27, 160), outline=color, width=6)
        if name == "attack_button":
            d.line((38, 89, 91, 36), fill=(239, 204, 141, 255), width=9)
            d.line((32, 61, 61, 91), fill=(239, 204, 141, 255), width=6)
        output = GAME / "ui" / "controls" / f"{name}.png"
        output.parent.mkdir(parents=True, exist_ok=True)
        im.save(output)
        result[name] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [128, 128]}
    return result


def save_vfx() -> dict:
    result = {}
    for name, color in [("hit_spark", (255, 207, 124, 255)), ("critical_spark", (236, 82, 77, 255)), ("quest_glow", (121, 226, 179, 255))]:
        im = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        for radius in (50, 37, 23):
            d.ellipse((64-radius, 64-radius, 64+radius, 64+radius), outline=(*color[:3], 55 + (50-radius)*3), width=3)
        if name != "quest_glow":
            for x1, y1, x2, y2 in ((64, 13, 64, 115), (13, 64, 115, 64), (28, 28, 100, 100), (28, 100, 100, 28)):
                d.line((x1, y1, x2, y2), fill=color, width=4)
        im = im.filter(ImageFilter.GaussianBlur(1))
        output = GAME / "vfx" / f"{name}.png"
        output.parent.mkdir(parents=True, exist_ok=True)
        im.save(output)
        result[name] = {"path": str(output.relative_to(ROOT)).replace("\\", "/"), "size": [128, 128]}
    return result


def main() -> None:
    manifest = {"version": 1, "art": save_art(), "directions": save_directions(), "scenes": save_tiles(), "ui": save_ui(), "vfx": save_vfx()}
    (ASSETS / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Packaged {sum(len(section) for section in manifest.values() if isinstance(section, dict))} assets")


if __name__ == "__main__":
    main()
