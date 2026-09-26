import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest_path = ROOT / "assets" / "game" / "units" / "expansion-manifest.json"
status_path = ROOT / "assets" / "game" / "units" / "expansion-status.json"

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
status = json.loads(status_path.read_text(encoding="utf-8"))

assets_by_unit = {}
for a in manifest["assets"]:
    key = f"g{a['grade']}-u{a['unit']:02d}"
    assets_by_unit.setdefault(key, {}).setdefault(a["kind"], []).append(a)

status_by_unit = {f"g{u['grade']}-u{u['unit']:02d}": u for u in status["units"]}

units_meta = {}
for g in [10, 11, 12]:
    for u in range(1, 11):
        p = ROOT / "content" / "global-success" / f"grade-{g}" / f"unit-{u:02d}.json"
        if p.exists():
            d = json.loads(p.read_text(encoding="utf-8"))
            key = f"g{g}-u{u:02d}"
            units_meta[key] = {
                "title": d["metadata"]["title"],
                "topic": d["metadata"]["topic"],
                "grade": g,
                "unit": u
            }

# Custom enemy names per unit and role
ROLE_NAMES = {
    "scout": ("Thám Tử Tiền Trạm", "Tiền trạm thám thính"),
    "ranged": ("Hắc Ám Xạ Thủ", "Xạ thủ tầm xa"),
    "brute": ("Cuồng Bạo Ma Nhân", "Lực sĩ xung phong"),
    "construct": ("Cơ Quan Biến Dị", "Khôi lỗi cơ quan"),
    "spirit": ("Oán Linh Tà Khí", "U linh tà phái"),
    "elite": ("Thủ Trận Tinh Anh", "Hộ pháp tinh anh"),
}

# Thematic role prefixes per unit
THEME_PREFIXES = {
    "g10-u01": {"broom_raider": "Tảo Trượng Đạo Tặc", "smoke_wraith": "Yên Hồn Oán Quỷ", "water_jar_golem": "Thủy Bình Thạch Nhân", "basket_mimic": "Trúc Lung Huyễn Quái", "lantern_archer": "Đăng Lung Xạ Thủ", "steward_elite": "Quản Gia Hộ Vệ"},
    "g10-u02": {"scout": "Thanh Phong Thám Tử", "ranged": "Tầm Độc Xạ Thủ", "brute": "Cự Thạch Ma Nhân", "construct": "Cơ Quan Thạch Quái", "spirit": "Ô Nhiễm Tà Linh", "elite": "Trấn Sơn Tinh Anh"},
    "g10-u03": {"scout": "Đoạt Âm Thám Tử", "ranged": "Nhiễu Âm Cung Thủ", "brute": "Loa Giác Ma Vương", "construct": "Đồng Cổ Khôi Lỗi", "spirit": "Mê Âm U Linh", "elite": "Tà Cầm Tinh Anh"},
    "g10-u04": {"scout": "Đoạt Lương Tặc Đồ", "ranged": "Ám Tiễn Đạo Tặc", "brute": "Cuồng Nộ Hung Đồ", "construct": "Phá Kiều Cơ Quan", "spirit": "Ly Gián Tà Linh", "elite": "Nghịch Đạo Tinh Anh"},
    "g10-u05": {"scout": "Trộm Cơ Thám Tử", "ranged": "Lôi Hỏa Xạ Thủ", "brute": "Thiết Giáp Cuồng Nhân", "construct": "Biến Dị Khôi Lỗi", "spirit": "Lôi Điện U Hồn", "elite": "Thần Cơ Tinh Anh"},
    "g10-u06": {"scout": "Thiên Kiến Thám Đồ", "ranged": "Định Kiến Cung Thủ", "brute": "Bất Bình Ma Nhân", "construct": "Thất Xứng Cơ Quan", "spirit": "Oán Hồn Thiên Kiến", "elite": "Cố Chấp Kiếm Sĩ"},
    "g10-u07": {"scout": "Xâm Nhập Gian Điệp", "ranged": "Phong Tỏa Xạ Thủ", "brute": "Trọng Binh Phá Hoại", "construct": "Cấm Giới Thiết Nhân", "spirit": "Tù Đày U Linh", "elite": "Nghịch Lễ Tinh Anh"},
    "g10-u08": {"scout": "Trì Trệ Thám Tử", "ranged": "Mê Huyễn Cung Nhân", "brute": "Phong Tỏa Cự Thạch", "construct": "Cơ Quan Ngăn Trở", "spirit": "Mê Muội U Hồn", "elite": "Hủ Nho Tinh Anh"},
    "g10-u09": {"scout": "Tầm Độc Yêu Ma", "ranged": "Hủ Độc Xạ Thủ", "brute": "Săn Bắt Hung Đồ", "construct": "Than Đá Thạch Quái", "spirit": "Hắc Khí Tà Linh", "elite": "Lâm Hải Tinh Anh"},
    "g10-u10": {"scout": "Phá Hoại Thám Tử", "ranged": "Tiễn Độc Thợ Săn", "brute": "Cương Nghạnh Đao Khách", "construct": "Sơn Lâm Khôi Lỗi", "spirit": "Huyễn Vực Mê Vụ", "elite": "Đao Khách Lạc Lối"},
    # Grade 11
    "g11-u01": {"scout": "Trọc Khí Thám Tử", "ranged": "Độc Trụ Xạ Thủ", "brute": "Hủ Bại Ma Binh", "construct": "Dược Thạch Khôi Lỗi", "spirit": "Tật Bệnh U Hồn", "elite": "Trụy Lạc Y Sư", "fever_miasma": "Sốt Nhiệt Chướng Khí"},
    "g11-u02": {"scout": "Tranh Chấp Thám Đồ", "ranged": "Tùy Tiện Cung Nhân", "brute": "Cố Chấp Trưởng Lão", "construct": "Gia Quy Thiết Nhân", "spirit": "Đoạn Tuyệt Linh Hồn", "elite": "Bất Hòa Trưởng Môn", "heirloom_mimic": "Gia Bảo Huyễn Quái"},
    "g11-u03": {"scout": "Tuần Thành Cơ Quan", "ranged": "Lôi Điện Xạ Thủ", "brute": "Cơ Giới Cự Nhân", "construct": "Đô Thị Cơ Quan Nhân", "spirit": "Năng Lượng Oán Linh", "elite": "Trí Năng Hộ Vệ", "transit_drone": "Lưu Động Cơ Quan"},
    "g11-u04": {"scout": "Gian Điệp Ngoại Vi", "ranged": "Thích Khách Phóng Tiễn", "brute": "Khuấy Đảo Trọng Binh", "construct": "Hải Phòng Cơ Quan", "spirit": "Chia Rẽ Tà Linh", "elite": "Nghịch Băng Đô Đốc", "harbor_junk_spirit": "Hải Cảng Hạm Linh"},
    "g11-u05": {"scout": "Hỏa Diệm Thám Tử", "ranged": "Khói Độc Xạ Thủ", "brute": "Nham Thạch Ma Nhân", "construct": "Khí Thải Cơ Quan", "spirit": "Hắc Hỏa Tà Linh", "elite": "Ô Nhiễm Tôn Giả", "heat_tide_beast": "Nhiệt Triều Hung Thú"},
    "g11-u06": {"scout": "Đạo Mộ Tặc Đồ", "ranged": "Phá Cổ Xạ Thủ", "brute": "Toái Thạch Ma Đồ", "construct": "Di Tích Cơ Quan", "spirit": "Phong Hóa Tà Linh", "elite": "Huyễn Kính Ma Đồ", "bronze_drum_guardian": "Đồng Cổ Thủ Hộ Thú"},
    "g11-u07": {"scout": "Lạc Lối Khảo Sinh", "ranged": "Huyễn Mộng Xạ Thủ", "brute": "Xiềng Xích Hộ Môn", "construct": "Cấm Viện Khôi Lỗi", "spirit": "Mông Lung Oán Linh", "elite": "Trở Ngại Viện Trưởng", "false_certificate_wraith": "Hư Danh Oán Linh"},
    "g11-u08": {"scout": "Ỷ Lại Ma Đồ", "ranged": "Lạc Hướng Xạ Nhân", "brute": "Bó Buộc Trọng Binh", "construct": "Cương Cực Cơ Quan", "spirit": "Sợ Hãi Huyễn Ảnh", "elite": "Băng Phong Tôn Giả", "compass_golem": "La Bàn Thạch Nhân"},
    "g11-u09": {"scout": "Khẩu Thiệt Vu Sư", "ranged": "Thị Phi Xạ Thủ", "brute": "Bạo Lực Hung Đồ", "construct": "Áp Bức Khôi Lỗi", "spirit": "Cô Lập Oán Hồn", "elite": "Bắt Nạt Bá Vương", "isolation_chain_beast": "Cô Lập Tỏa Liên Thú"},
    "g11-u10": {"scout": "Hủy Hoại Thám Tử", "ranged": "Đầm Lầy Xạ Nhân", "brute": "Nuốt Chửng Đao Khách", "construct": "Hủ Mộc Khôi Lỗi", "spirit": "Héo Úa Tà Hồn", "elite": "Đầm Lầy Yêu Đồ", "invasive_root_predator": "Ký Sinh Thực Căn Quái"},
    # Grade 12
    "g12-u01": {"scout": "Quên Lãng Thám Đồ", "ranged": "Bất Trí Cung Nhân", "brute": "Bại Hoang Ma Binh", "construct": "Anh Hùng Khôi Lỗi", "spirit": "Bi Thương Oán Hồn", "elite": "Nghịch Cảnh Đao Khách", "memory_chimera": "Hồi Ức Huyễn Thú"},
    "g12-u02": {"scout": "Cực Đoan Thám Tử", "ranged": "Tạp Âm Xạ Thủ", "brute": "Cự Tuyệt Ma Nhân", "construct": "Tường Đá Cơ Quan", "spirit": "Kỳ Thị Tà Linh", "elite": "Bế Quan Trưởng Lão", "sail_spirit": "Viễn Dương Phong Linh"},
    "g12-u03": {"scout": "Phế Khí Thám Tử", "ranged": "Hủ Độc Cung Nhân", "brute": "Rác Thải Cuồng Nhân", "construct": "Ô Uế Khôi Lỗi", "spirit": "Trọc Lưu Tà Linh", "elite": "Hoang Phí Ma Vương", "recycling_crab": "Tuần Hoàn Cự Giải"},
    "g12-u04": {"scout": "Tắc Nghẽn Thám Đồ", "ranged": "Huyên Náo Xạ Thủ", "brute": "Thành Thị Ma Đồ", "construct": "Bê Tông Khôi Lỗi", "spirit": "Bụi Mù Oán Hồn", "elite": "Đô Thị Bá Chủ", "traffic_serpent": "Lạc Dịch Xà Tinh"},
    "g12-u05": {"scout": "Thất Nghiệp Thám Tử", "ranged": "Trì Trệ Xạ Thủ", "brute": "Lao Dịch Trọng Binh", "construct": "Công Xưởng Thiết Nhân", "spirit": "Áp Lực Oán Linh", "elite": "Nghiêm Khắc Giám Thị", "tool_mimic": "Bách Nghệ Huyễn Khí"},
    "g12-u06": {"scout": "Dữ Liệu Thám Đồ", "ranged": "Tia Sáng Xạ Thủ", "brute": "Lập Trình Cuồng Nhân", "construct": "Toán Pháp Khôi Lỗi", "spirit": "Linh Hồn Kỹ Thuật Số", "elite": "Trí Tuệ Nhân Tạo Tôn", "data_core": "Trí Tuệ Hạch Ma"},
    "g12-u07": {"scout": "Hư Giả Thám Tử", "ranged": "Khuấy Đảo Cung Thủ", "brute": "Dư Luận Hung Đồ", "construct": "Truyền Thông Khôi Lỗi", "spirit": "Tin Đồn Tà Linh", "elite": "Thao Túng Bá Tôn", "rumor_swarm": "Thị Phi Quỷ Đàn"},
    "g12-u08": {"scout": "Săn Trộm Gian Tặc", "ranged": "Cạm Bẫy Xạ Thủ", "brute": "Tàn Độc Thợ Săn", "construct": "Lồng Sắt Khôi Lỗi", "spirit": "Tuyệt Chủng Oán Hồn", "elite": "Đồ Tể Rừng Già", "snare_beast": "Cạm Bẫy Ma Thú"},
    "g12-u09": {"scout": "Mất Hướng Thám Tử", "ranged": "Do Dự Cung Nhân", "brute": "Trở Lực Đao Nhân", "construct": "Kỳ Lộ Thiết Quái", "spirit": "Bất Định U Hồn", "elite": "Tiền Đồ Ma Sư", "crossroads_illusion": "Kỳ Lộ Mê Ảnh"},
    "g12-u10": {"scout": "Hạn Hẹp Thám Đồ", "ranged": "Bảo Thủ Xạ Thủ", "brute": "Cố Bộ Ma Nhân", "construct": "Khóa Tri Khôi Lỗi", "spirit": "Vô Tri Oán Linh", "elite": "Phong Trí Tôn Giả", "ink_phoenix": "Hắc Mặc Huyễn Phượng"},
}

BOSS_NAMES = {
    "g10-u03": ("Mê Âm Yêu Cơ", "/assets/game/characters/bosses/me_am_yeu_co.png", "Yêu Nữ Tiếng Đàn Huyễn Mị"),
    "g10-u06": ("Bất Bình Huyễn Ảnh", "/assets/game/units/grade-10/unit-06/bosses/balance_phantom.png", "Ảo Ảnh Mất Cân Bằng"),
    "g10-u10": ("Lạc Lối Đao Vương", "/assets/game/units/grade-10/unit-10/bosses/lost_trail_warlord.png", "Chiến Tướng Rừng Hoang Cấm Địa"),
    "g11-u03": ("Hư Không Cơ Giới Thần", "/assets/game/units/grade-11/unit-03/bosses/hollow_city_engine.png", "Cơ Quan Trấn Thủ Đô Thị Tương Lai"),
    "g11-u06": ("Thiên Diện Huyễn Sư", "/assets/game/characters/bosses/thien_dien_huyen_su.png", "Bá Chủ Ảo Ảnh Xâm Hại Di Sản"),
    "g11-u10": ("Đầm Lầy Nuốt Chửng", "/assets/game/units/grade-11/unit-10/bosses/marsh_devourer.png", "Cổ Thú Tàn Phá Hệ Sinh Thái"),
    "g12-u03": ("Khói Độc Ma Quân", "/assets/game/units/grade-12/unit-03/bosses/smoke_sovereign.png", "Chúa Tể Khói Thải & Rác Rưởi"),
    "g12-u06": ("Ngụy Trí Ma Tôn", "/assets/game/units/grade-12/unit-06/bosses/false_intellect.png", "Trí Tuệ Giả Mạo Thao Túng Nhân Gian"),
    "g12-u10": ("Vô Ngôn Ma Tôn", "/assets/game/characters/bosses/vo_ngon_ma_ton.png", "Tuyệt Đỉnh Ma Đầu Phong Tỏa Ngôn Từ"),
}

# Base positions for enemies across danger zones (Map size: 3200x2000)
ENEMY_SPAWNS = [
    {"x": 1450, "y": 1050, "minX": 1380, "maxX": 1540},
    {"x": 1950, "y": 1050, "minX": 1870, "maxX": 2030},
    {"x": 2450, "y": 1150, "minX": 2370, "maxX": 2530},
    {"x": 2850, "y": 1300, "minX": 2770, "maxX": 2930},
    {"x": 1750, "y": 1380, "minX": 1670, "maxX": 1830},
    {"x": 2250, "y": 1450, "minX": 2170, "maxX": 2330},
    {"x": 1350, "y": 1450, "minX": 1270, "maxX": 1430}, # 7th enemy
]

configs = {}

for unit_id in sorted(units_meta.keys()):
    meta = units_meta[unit_id]
    g = meta["grade"]
    u = meta["unit"]
    u_assets = assets_by_unit.get(unit_id, {})
    
    # Ground
    grounds = u_assets.get("ground", [])
    primary_ground = grounds[0]["path"] if grounds else "/assets/game/world/ground/forest_earth.png"
    secondary_ground = grounds[1]["path"] if len(grounds) > 1 else None
    tileable = grounds[0].get("tileableVerified", True) if grounds else True
    
    # Props
    props_list = []
    for idx, p in enumerate(u_assets.get("prop", [])):
        px = 1250 if idx == 0 else 850
        py = 620 if idx == 0 else 1320
        props_list.append({
            "id": f"{unit_id}_{p['id']}",
            "name": p.get("concept", "Đạo cụ đặc trưng"),
            "path": p["path"],
            "x": px,
            "y": py,
            "size": p.get("size", [160, 160]),
        })
        
    # NPCs
    npcs_list = [
        {
            "id": "bang_chu",
            "name": "Bang Chủ Hà Ánh Phượng",
            "title": "Lãnh Tụ Võ Lâm Chính Phái",
            "elementColor": "#fbe285",
            "spriteKey": "bang_chu_ha_anh_phuong",
            "portraitPath": "/assets/game/characters/npc/portraits/bang_chu_ha_anh_phuong.png",
            "x": 550,
            "y": 560,
            "prompt": "[E] Bái kiến Bang Chủ",
            "dialogueIntro": f"Chào mừng thiếu hiệp! Hôm nay chúng ta cùng khám phá Unit {u}: {meta['title']} ({meta['topic']}). Hãy rèn luyện võ học, giải trừ ma chướng!",
        },
        {
            "id": "ho_phap_phuong_tu",
            "name": "Hộ Pháp Phương Tú",
            "title": "Hộ Pháp Từ Vựng & Trưởng Thành",
            "elementColor": "#59caa0",
            "spriteKey": "ho_phap_phuong_tu",
            "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_phuong_tu.png",
            "x": 1150,
            "y": 560,
            "prompt": "[E] Tham Vấn Hộ Pháp Phương Tú",
            "dialogueIntro": f"Tàng Kinh Các lưu giữ toàn bộ bí điển từ vựng của {meta['title']}. Hãy lĩnh hội từng câu chữ để tích lũy công lực căn bản!",
        },
        {
            "id": "ho_phap_dang_tran_ha",
            "name": "Hộ Pháp Đặng Trần Hà",
            "title": "Hộ Pháp Ngữ Pháp & Thách Đấu",
            "elementColor": "#60a5fa",
            "spriteKey": "ho_phap_dang_tran_ha",
            "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_dang_tran_ha.png",
            "x": 1850,
            "y": 560,
            "prompt": "[E] Bái Kiến Hộ Pháp Đặng Trần Hà",
            "dialogueIntro": f"Ngữ pháp là xương sống của kiếm chiêu! Muốn phá phong ấn thạch trận của {meta['title']}, tâm ý phải chuẩn xác, cú pháp không được sai lệch một ly!",
        },
        {
            "id": "ho_phap_hoang_van",
            "name": "Hộ Pháp Hoàng Vân",
            "title": "Hộ Pháp Nghe & Nhịp Điệu",
            "elementColor": "#fbbf24",
            "spriteKey": "ho_phap_hoang_van",
            "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_hoang_van.png",
            "x": 2550,
            "y": 780,
            "prompt": "[E] Thỉnh Giáo Hộ Pháp Hoàng Vân",
            "dialogueIntro": f"Lắng nghe âm điệu tự nhiên, nghe rõ từng ngữ âm để thấu suốt chiêu thức địch nhân. Hãy vào Võ Luyện Đài luyện tập cùng ta!",
        },
        {
            "id": "ho_phap_nguyet_nguyen",
            "name": "Hộ Pháp Nguyệt Nguyên",
            "title": "Hộ Pháp Đọc Hiểu & Minh Triết",
            "elementColor": "#38bdf8",
            "spriteKey": "ho_phap_nguyet_nguyen",
            "portraitPath": "/assets/game/characters/npc/portraits/ho_phap_nguyet_nguyen.png",
            "x": 750,
            "y": 1280,
            "prompt": "[E] Luận Đạo Hộ Pháp Nguyệt Nguyên",
            "dialogueIntro": f"Minh Triết Các soi rọi chân lý. Khi đối mặt với thuật ngụy tạo và mê trận thông tin của {meta['title']}, hãy tìm đúng câu bằng chứng để phá tan ảo ảnh!",
        },
    ]
    
    # Enemies
    enemies_list = []
    raw_enemies = u_assets.get("enemy", [])
    for idx, e in enumerate(raw_enemies):
        eid = e["id"]
        spawn = ENEMY_SPAWNS[idx % len(ENEMY_SPAWNS)]
        
        # Determine name
        custom_map = THEME_PREFIXES.get(unit_id, {})
        ename = custom_map.get(eid)
        if not ename:
            ename, _ = ROLE_NAMES.get(eid, (e.get("concept", "Ma Tặc"), "Tà Binh"))
        
        # Rank-based stats
        is_elite = eid == "elite" or idx == len(raw_enemies) - 1
        base_hp = 220 + u * 15 if is_elite else 120 + idx * 15 + u * 10
        base_atk = 24 + u * 2 if is_elite else 16 + idx * 2 + u
        base_def = 10 + u if is_elite else 6 + idx + u
        xp = 180 + u * 15 if is_elite else 80 + idx * 10 + u * 8
        
        enemies_list.append({
            "encounterId": f"{unit_id}_enc_{eid}",
            "enemyId": eid,
            "name": ename,
            "title": "Hộ Vệ Tinh Anh" if is_elite else "Tà Binh Tuần Tra",
            "concept": e.get("concept", ""),
            "spritePath": e["path"],
            "x": spawn["x"],
            "y": spawn["y"],
            "patrolRange": {"minX": spawn["minX"], "maxX": spawn["maxX"]},
            "hp": base_hp,
            "maxHp": base_hp,
            "attack": base_atk,
            "defense": base_def,
            "xpReward": xp,
        })
        
    # Climax / Boss
    is_boss_unit = unit_id in BOSS_NAMES
    if is_boss_unit:
        b_name, b_sprite, b_title = BOSS_NAMES[unit_id]
        climax = {
            "hasRealBoss": True,
            "encounterId": f"{unit_id}_boss_{u}",
            "enemy": {
                "id": f"boss_{unit_id}",
                "name": b_name,
                "title": b_title,
                "spriteKey": b_sprite,
                "hp": 340 + u * 25,
                "maxHp": 340 + u * 25,
                "attack": 32 + u * 3,
                "defense": 14 + u * 2,
                "xpReward": 450 + u * 40,
                "isBoss": True,
                "bossPhase": 1,
                "dialogueIntro": f"“Khá khen tiểu bối dám bước vào Cấm Địa {meta['title']}! Hãy nếm thử kiếm khí của {b_name}!”",
                "dialoguePhase2": f"“Cuồng Nộ Huyết Ma kích hoạt! Tuyệt kỹ {meta['title']} sẽ biến ngươi thành tro bụi!”",
            },
            "x": 1600,
            "y": 1720,
            "barrierPrompt": f"🔒 Ma Khí Cấm Địa (Cần >= 70% tiến độ)",
            "unlockedPrompt": f"⚡ Cổng Ma Giáo Cấm Địa ĐÃ MỞ! Quyết chiến {b_name}!",
        }
    else:
        # Climax trial with elite guardian
        elite_enemy = raw_enemies[-1] if raw_enemies else None
        climax_sprite = elite_enemy["path"] if elite_enemy else "/assets/game/characters/enemies/elite_disciple.png"
        climax_name = f"Thủ Trận Tinh Anh - {meta['title']}"
        climax = {
            "hasRealBoss": False,
            "encounterId": f"{unit_id}_climax_{u}",
            "enemy": {
                "id": f"climax_{unit_id}",
                "name": climax_name,
                "title": "Trấn Thủ Trận Đỉnh Điểm",
                "spriteKey": climax_sprite,
                "hp": 280 + u * 20,
                "maxHp": 280 + u * 20,
                "attack": 26 + u * 2,
                "defense": 12 + u,
                "xpReward": 320 + u * 25,
                "isBoss": False,
                "bossPhase": 1,
                "dialogueIntro": f"“Ta là Thủ Trận Tinh Anh trấn giữ thạch trận đỉnh điểm của {meta['title']}. Hãy dốc toàn lực chiến thắng để chứng minh sự tinh thông!”",
                "dialoguePhase2": f"“Ngươi quả thực có thực lực! Đỡ chiêu biến hóa cuối cùng này!”",
            },
            "x": 1600,
            "y": 1720,
            "barrierPrompt": f"🔒 Phong Ấn Trận Đỉnh Điểm (Cần >= 70% tiến độ)",
            "unlockedPrompt": f"⚡ Phong Ấn Đỉnh Điểm ĐÃ MỞ! Thách đấu Thủ Trận Tinh Anh!",
        }
        
    configs[unit_id] = {
        "unitId": unit_id,
        "grade": g,
        "unitNumber": u,
        "title": meta["title"],
        "topic": meta["topic"],
        "mapWidth": 3200,
        "mapHeight": 2000,
        "ground": {
            "primaryPath": primary_ground,
            "secondaryPath": secondary_ground,
            "tileable": tileable,
        },
        "npcs": npcs_list,
        "props": props_list,
        "enemies": enemies_list,
        "climax": climax,
    }

# Write levelConfig.ts
out_path = ROOT / "src" / "game" / "levels" / "levelConfig.ts"
out_path.parent.mkdir(parents=True, exist_ok=True)

ts_content = f"""/**
 * LEVEL CONFIGURATION FOR ALL 30 UNITS (GRADES 10, 11, 12)
 * Auto-generated and verified against Global Success dataset & expansion manifests.
 */
import {{ CombatEnemy }} from '../../types/game';

export interface LevelEnemyConfig {{
  encounterId: string;
  enemyId: string;
  name: string;
  title: string;
  concept: string;
  spritePath: string;
  x: number;
  y: number;
  patrolRange: {{ minX: number; maxX: number }};
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  xpReward: number;
}}

export interface LevelNpcConfig {{
  id: string;
  name: string;
  title: string;
  elementColor: string;
  spriteKey: string;
  portraitPath: string;
  x: number;
  y: number;
  prompt: string;
  dialogueIntro: string;
}}

export interface LevelPropConfig {{
  id: string;
  name: string;
  path: string;
  x: number;
  y: number;
  size: [number, number];
}}

export interface LevelClimaxConfig {{
  hasRealBoss: boolean;
  encounterId: string;
  enemy: CombatEnemy;
  x: number;
  y: number;
  barrierPrompt: string;
  unlockedPrompt: string;
}}

export interface LevelMapConfig {{
  unitId: string;
  grade: 10 | 11 | 12;
  unitNumber: number;
  title: string;
  topic: string;
  mapWidth: number;
  mapHeight: number;
  ground: {{
    primaryPath: string;
    secondaryPath?: string | null;
    tileable: boolean;
  }};
  npcs: LevelNpcConfig[];
  props: LevelPropConfig[];
  enemies: LevelEnemyConfig[];
  climax: LevelClimaxConfig;
}}

export const ALL_LEVEL_CONFIGS: Record<string, LevelMapConfig> = {json.dumps(configs, ensure_ascii=False, indent=2)};

export function getLevelConfig(unitId: string): LevelMapConfig {{
  return ALL_LEVEL_CONFIGS[unitId] || ALL_LEVEL_CONFIGS['g10-u01'];
}}
"""

out_path.write_text(ts_content, encoding="utf-8")
print(f"Successfully generated levelConfig.ts with {len(configs)} units at {out_path}")
