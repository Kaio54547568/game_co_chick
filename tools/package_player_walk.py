"""Pack generated walk poses into the game's existing 160x192 frame format.

This only extracts and aligns the generated artwork; it does not synthesize poses.
Usage: python tools/package_player_walk.py MALE_SOURCE FEMALE_SOURCE
"""
from pathlib import Path
import hashlib
import json
import sys

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FRAME_W, FRAME_H = 160, 192
DIRECTIONS = ['down', 'up', 'left', 'right']


def separators(counts, length):
    cuts = [0]
    for quarter in (1, 2, 3):
        target = round(length * quarter / 4)
        radius = round(length * .045)
        candidates = range(target - radius, target + radius + 1)
        cuts.append(min(candidates, key=lambda p: (counts[p], abs(p - target))))
    return cuts + [length]


def extract(source):
    image = Image.open(source).convert('RGBA')
    visible = np.asarray(image.getchannel('A')) > 40
    rows = separators(visible.sum(axis=1), image.height)
    poses = []
    for row in range(4):
        top, bottom = rows[row:row + 2]
        columns = separators(visible[top:bottom].sum(axis=0), image.width)
        for column in range(4):
            cell = image.crop((columns[column], top, columns[column + 1], bottom))
            bbox = cell.getchannel('A').point(lambda a: 255 if a > 20 else 0).getbbox()
            if bbox is None:
                raise ValueError(f'Empty pose: {source}, row {row}, column {column}')
            poses.append(cell.crop(bbox))
    return poses


all_poses = [extract(Path(source)) for source in sys.argv[1:3]]
if len(all_poses) != 2:
    raise SystemExit(__doc__)

# One scale across both characters and every frame prevents size flicker.
scale = min(178 / max(p.height for poses in all_poses for p in poses),
            150 / max(p.width for poses in all_poses for p in poses))
packed = []
metadata = {'frameWidth': FRAME_W, 'frameHeight': FRAME_H,
            'columns': 4, 'rows': DIRECTIONS, 'frameRate': 7, 'characters': {}}
for gender, poses in zip(('male', 'female'), all_poses):
    sheet = Image.new('RGBA', (FRAME_W * 4, FRAME_H * 4))
    frames = []
    for index, pose in enumerate(poses):
        resized = pose.resize((round(pose.width * scale), round(pose.height * scale)), Image.Resampling.LANCZOS)
        frame = Image.new('RGBA', (FRAME_W, FRAME_H))
        # Feet stay on y=181, matching the sprite's .94 origin in Phaser.
        frame.alpha_composite(resized, ((FRAME_W - resized.width) // 2, 181 - resized.height))
        bounds = frame.getchannel('A').getbbox()
        assert bounds and bounds[0] > 0 and bounds[1] > 0 and bounds[2] < FRAME_W and bounds[3] < FRAME_H, 'A pose touches the frame boundary'
        sheet.alpha_composite(frame, ((index % 4) * FRAME_W, (index // 4) * FRAME_H))
        frames.append(frame)
    assert len({hashlib.sha256(frame.tobytes()).hexdigest() for frame in frames}) == 16, 'Duplicate walking poses'
    for base in ('assets', 'public/assets'):
        destination = ROOT / base / 'game/characters/player/walking'
        destination.mkdir(parents=True, exist_ok=True)
        sheet.save(destination / f'{gender}_walk.png', optimize=True)
    packed.append(frames)
    metadata['characters'][gender] = {'frames': 16, 'file': f'{gender}_walk.png'}

destination = ROOT / 'assets/game/characters/player/walking'
(destination / 'manifest.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(ROOT / 'public/assets/game/characters/player/walking/manifest.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

preview = []
for step in range(4):
    canvas = Image.new('RGB', (FRAME_W * 4, FRAME_H * 2), '#18211f')
    for gender_index, frames in enumerate(packed):
        for direction in range(4):
            frame = frames[direction * 4 + step]
            canvas.paste(frame, (direction * FRAME_W, gender_index * FRAME_H), frame)
    preview.append(canvas)
preview[0].save(destination / 'walk-preview.gif', save_all=True, append_images=preview[1:], duration=145, loop=0)
print(json.dumps({'scale': round(scale, 4), 'sheetSize': [640, 768], 'poses': 32, 'output': str(destination)}, indent=2))
