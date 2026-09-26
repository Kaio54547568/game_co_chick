"""Report completed and missing art for the 30-unit expansion."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "assets" / "game" / "units"
ENEMY_IDS = ["scout", "ranged", "brute", "construct", "spirit", "elite"]
FIRST_UNIT_IDS = ["broom_raider", "smoke_wraith", "water_jar_golem", "basket_mimic", "lantern_archer", "steward_elite"]
REUSED_BOSSES = {
    (10, 3): "/assets/game/characters/bosses/me_am_yeu_co.png",
    (11, 6): "/assets/game/characters/bosses/thien_dien_huyen_su.png",
    (12, 10): "/assets/game/characters/bosses/vo_ngon_ma_ton.png",
}


def main() -> None:
    plan = json.loads((ROOT / "tools" / "unit_expansion_plan.json").read_text(encoding="utf-8"))
    assets = json.loads((GAME / "expansion-manifest.json").read_text(encoding="utf-8"))["assets"]
    indexed = {(a["grade"], a["unit"], a["kind"], a["id"]): a for a in assets}
    units: list[dict] = []
    for spec in plan:
        grade, unit = spec["grade"], spec["unit"]
        enemies = [a for a in assets if a["grade"] == grade and a["unit"] == unit and a["kind"] == "enemy"]
        ground = [a for a in assets if a["grade"] == grade and a["unit"] == unit and a["kind"] == "ground"]
        props = [a for a in assets if a["grade"] == grade and a["unit"] == unit and a["kind"] == "prop"]
        bosses = [a for a in assets if a["grade"] == grade and a["unit"] == unit and a["kind"] == "boss"]
        reused = REUSED_BOSSES.get((grade, unit))
        if reused and not (ROOT / reused.lstrip("/")).is_file():
            raise FileNotFoundError(reused)
        expected_enemy_ids = FIRST_UNIT_IDS if (grade, unit) == (10, 1) else ENEMY_IDS
        missing = [f"enemy:{enemy_id}" for enemy_id in expected_enemy_ids if (grade, unit, "enemy", enemy_id) not in indexed]
        if not ground:
            missing.append("ground:main_ground")
        if not props:
            missing.append("prop:theme_prop")
        if spec["boss"] and not (bosses or reused):
            missing.append("boss")
        units.append({
            "grade": grade,
            "unit": unit,
            "title": spec["title"],
            "enemies": [a["path"] for a in enemies],
            "ground": [a["path"] for a in ground],
            "props": [a["path"] for a in props],
            "boss": bosses[0]["path"] if bosses else reused,
            "missing": missing,
            "complete": not missing,
        })

    report = {
        "version": 1,
        "expected": {"enemies": 180, "ground": 30, "props": 30, "newBosses": 6, "reusedBosses": 3},
        "created": {
            "enemies": sum(a["kind"] == "enemy" for a in assets),
            "ground": sum(a["kind"] == "ground" for a in assets),
            "props": sum(a["kind"] == "prop" for a in assets),
            "newBosses": sum(a["kind"] == "boss" for a in assets),
        },
        "completeUnits": sum(unit["complete"] for unit in units),
        "units": units,
    }
    (GAME / "expansion-status.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Created:", report["created"], "Complete units:", report["completeUnits"])


if __name__ == "__main__":
    main()
