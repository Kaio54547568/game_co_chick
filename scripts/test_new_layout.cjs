const fixedLandmarks = [
  { id: 'son_mon', name: 'Sơn Môn', type: 'landmark', x: 450, y: 420, radius: 100 },
  { id: 'tang_kinh_cac', name: 'Tàng Kinh Các Building', type: 'landmark', x: 1150, y: 420, radius: 100 },
  { id: 'tang_kinh_cac_seal', name: 'Phong Ấn Tri Thức', type: 'landmark_zone', x: 1150, y: 520, radius: 100 },
  { id: 'truc_lam', name: 'Trúc Lâm Landmark', type: 'landmark', x: 2550, y: 660, radius: 100 },
  { id: 'training_dummy', name: 'Cọc Luyện Công', type: 'training', x: 2700, y: 760, radius: 100 },
  { id: 'ma_giao_cam_dia', name: 'Ma Giáo Cấm Địa', type: 'landmark', x: 1600, y: 1720, radius: 120 },
  { id: 'climax_gate', name: 'Cổng Cấm Địa', type: 'climax_gate', x: 1600, y: 1720, radius: 160 },
];

const lanterns = [350, 720, 1600, 2150].map((lx) => ({
  id: `lantern_${lx}`,
  name: `Đèn Lồng (${lx})`,
  type: 'prop',
  x: lx,
  y: 680,
  radius: 30,
}));

const npcs = [
  { id: 'bang_chu', name: 'Bang Chủ Hà Ánh Phượng', type: 'npc', x: 550, y: 560, radius: 100 },
  { id: 'ho_phap_phuong_tu', name: 'Hộ Pháp Phương Tú', type: 'npc', x: 920, y: 560, radius: 100 },
  { id: 'ho_phap_dang_tran_ha', name: 'Hộ Pháp Đặng Trần Hà', type: 'npc', x: 1850, y: 560, radius: 100 },
  { id: 'ho_phap_hoang_van', name: 'Hộ Pháp Hoàng Vân', type: 'npc', x: 2400, y: 760, radius: 100 },
  { id: 'ho_phap_nguyet_nguyen', name: 'Hộ Pháp Nguyệt Nguyên', type: 'npc', x: 660, y: 1260, radius: 100 },
];

const propsG12 = [
  { id: 'prop_1', name: 'Prop 1 (Tàng Kinh Các Garden)', type: 'prop', x: 1380, y: 580, radius: 90 },
  { id: 'prop_2', name: 'Prop 2 (Minh Triết Các)', type: 'prop', x: 860, y: 1300, radius: 90 },
];

const allObjs = [...fixedLandmarks, ...lanterns, ...npcs, ...propsG12];

const pairs = [];
for (let i = 0; i < allObjs.length; i++) {
  for (let j = i + 1; j < allObjs.length; j++) {
    const a = allObjs[i];
    const b = allObjs[j];
    if (a.id === 'ma_giao_cam_dia' && b.id === 'climax_gate') continue;
    if (b.id === 'ma_giao_cam_dia' && a.id === 'climax_gate') continue;
    if (a.id === 'tang_kinh_cac' && b.id === 'tang_kinh_cac_seal') continue;
    if (b.id === 'tang_kinh_cac' && a.id === 'tang_kinh_cac_seal') continue;

    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    pairs.push({ a: a.name, b: b.name, dist });
  }
}
pairs.sort((x, y) => x.dist - y.dist);
console.log('Top 10 closest pairs:');
pairs.slice(0, 10).forEach((p) => {
  console.log(`  ${p.a} <---> ${p.b}: ${p.dist.toFixed(1)}px`);
});
