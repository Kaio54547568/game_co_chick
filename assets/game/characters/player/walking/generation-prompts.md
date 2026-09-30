# Generation prompts

Tool: built-in `image_gen`. Both requests used `transparent_background: true`.

## Male

Reference: `characters/player/directional/male_4dir.png`.

Use case: stylized-concept. Asset type: production 2D game character walk-cycle sprite sheet with genuine transparent background. Input image: the provided four-direction male character sprite sheet is the identity and costume reference; preserve the same young male face, black tied hair, red-and-black martial-arts coat with gold trim, boots, painterly detailed 2D rendering, and proportions. Create a NEW precise 4-column by 4-row animation sheet. Rows from top to bottom: facing camera/down, facing away/up, facing screen-left, facing screen-right. Columns left to right in every row: contact pose with left foot forward, passing pose, contact pose with right foot forward, passing pose. Each of the 16 full-body sprites must be separate and centered within an equal-sized invisible cell, same scale, identical ground baseline per row, no overlap or cropping, very small natural arm and cloak motion, readable foot changes. Orthographic game sprite perspective matching reference, character remains in place for in-game movement. Transparent background with clean alpha. No labels, numbers, borders, ground, cast shadows, extra objects, text or watermark.

## Female

References: `characters/player/directional/female_4dir.png`, then the generated male walking sheet.

Use case: stylized-concept. Asset type: 2D game character walking animation sprite sheet with transparent background. Image 1: female identity and costume reference. Image 2: male walking sheet, use only for the four-direction layout and movement style. Preserve the female character from image 1: young female face, long black tied hair, red and black martial-arts coat with gold details, boots, matching detailed painterly 2D rendering. Create a new 4-column by 4-row female walk-cycle sheet, 16 separate full-body sprites. Rows: front/down, back/up, left-facing profile, right-facing profile. In each row four clearly distinct sequential walking poses: left foot forward contact, right foot passing underneath body, right foot forward contact, left foot passing underneath body. Animate legs and arms naturally and subtly, cloak and ponytail follow movement. Stay in-place, camera angle fixed, identity and clothing consistent, same body scale in every frame. IMPORTANT production layout: exact equal grid cells with generous fully transparent margins between all sprites; no sprite touches or crosses a cell boundary, full head and boots visible; baseline and torso center remain stable within each row. No background, ground, shadows, borders, writing, numbers, labels, UI or watermark.

## Packing

Original generated sheets are preserved under `assets/source/player-walk/`.
Rebuild the runtime sheets and preview with:

```powershell
python tools/package_player_walk.py assets/source/player-walk/male-generated.png assets/source/player-walk/female-generated.png
```
