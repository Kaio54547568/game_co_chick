# Player walking sprites

Generated with the built-in `image_gen` tool from the existing male and female
four-direction standing sprites. Existing standing artwork remains available.

- `male_walk.png`, `female_walk.png`: 640 × 768 PNG with transparent background.
- Each frame is 160 × 192 pixels. Four columns form a walking cycle.
- Rows, in order: down, up, left, right.
- Frames 0–3 down; 4–7 up; 8–11 left; 12–15 right.
- Phaser plays at 7 frames per second; sprinting uses 1.35 times that speed.
- Standing, movement lock, and a gender change stop the cycle and restore the
  standing frame for the current direction.
- `walk-preview.gif` shows male on top, female below, directions from left to
  right in the same order as the rows.

The generation prompts requested a four-by-four walking sheet matching the
original character's face, hair, red and black clothing, gold details, and
painterly style. The sequential poses alternate left contact, passing, right
contact, passing, with gentle arm, hair, and cloak movement. Each character was
generated separately; the male sheet also provided the layout reference for the
female sheet. Exact prompts are stored in `generation-prompts.md`.

`tools/package_player_walk.py` extracts the poses from each generated sheet and
packs them onto equal cells with a shared scale and foot baseline at y=181. It
does not create the walking poses. The runtime uses the packed PNG files.
