import { describe, it } from 'vitest';
import fs from 'fs';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';

interface ObjectItem {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  radius: number;
  width?: number;
  height?: number;
  patrolMinX?: number;
  patrolMaxX?: number;
}

describe('Audit 30 Levels Layout', () => {
  it('detects all overlaps, patrol intersections, and layout conflicts across 30 units', () => {
    const report: any[] = [];

    // Fixed objects from WorldScene (after layout overhaul)
    const fixedLandmarks = [
      { id: 'son_mon', name: 'Sơn Môn', type: 'landmark', x: 450, y: 420, radius: 100 },
      { id: 'tang_kinh_cac', name: 'Tàng Kinh Các Building', type: 'landmark', x: 1150, y: 420, radius: 100 },
      { id: 'tang_kinh_cac_seal', name: 'Phong Ấn Tri Thức', type: 'landmark_zone', x: 1150, y: 520, radius: 105 },
      { id: 'truc_lam', name: 'Trúc Lâm Landmark', type: 'landmark', x: 2550, y: 660, radius: 100 },
      { id: 'training_dummy', name: 'Cọc Luyện Công', type: 'training', x: 2700, y: 760, radius: 105 },
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

    for (const [unitId, cfg] of Object.entries(ALL_LEVEL_CONFIGS)) {
      const unitIssues: string[] = [];
      const objects: ObjectItem[] = [];

      // 1. Add fixed landmarks and interactive zones
      fixedLandmarks.forEach((fl) => objects.push({ ...fl }));
      lanterns.forEach((lt) => objects.push({ ...lt }));

      // 2. Add NPCs
      cfg.npcs.forEach((npc) => {
        objects.push({
          id: npc.id,
          name: npc.name,
          type: 'npc',
          x: npc.x,
          y: npc.y,
          radius: 120,
          width: 80,
          height: 120,
        });
      });

      // 3. Add Props
      cfg.props.forEach((prop) => {
        objects.push({
          id: prop.id,
          name: prop.name,
          type: 'prop',
          x: prop.x,
          y: prop.y,
          radius: 110,
          width: prop.size[0],
          height: prop.size[1],
        });
      });

      // 4. Add Enemies
      cfg.enemies.forEach((enemy) => {
        objects.push({
          id: enemy.encounterId,
          name: enemy.name,
          type: 'mob',
          x: enemy.x,
          y: enemy.y,
          radius: 110,
          width: 70,
          height: 90,
          patrolMinX: enemy.patrolRange.minX,
          patrolMaxX: enemy.patrolRange.maxX,
        });
      });

      // Check bounds
      objects.forEach((obj) => {
        if (obj.x < 50 || obj.x > 3150 || obj.y < 50 || obj.y > 1950) {
          unitIssues.push(`[OUT OF BOUNDS] ${obj.name} (${obj.id}) at (${obj.x}, ${obj.y})`);
        }
        if (obj.patrolMinX !== undefined && (obj.patrolMinX < 50 || obj.patrolMaxX! > 3150)) {
          unitIssues.push(`[PATROL OUT OF BOUNDS] ${obj.name} patrol [${obj.patrolMinX}, ${obj.patrolMaxX}]`);
        }
      });

      // Pairwise check for overlap and zone interference
      for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
          const a = objects[i];
          const b = objects[j];

          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          // Both interactive?
          const aInteractive = ['npc', 'landmark_zone', 'training', 'climax_gate', 'prop', 'mob'].includes(a.type);
          const bInteractive = ['npc', 'landmark_zone', 'training', 'climax_gate', 'prop', 'mob'].includes(b.type);

          // Intentional pairs
          const isIntentionalPair =
            (a.id === 'ma_giao_cam_dia' && b.id === 'climax_gate') ||
            (b.id === 'ma_giao_cam_dia' && a.id === 'climax_gate') ||
            (a.id === 'tang_kinh_cac' && b.id === 'tang_kinh_cac_seal') ||
            (b.id === 'tang_kinh_cac' && a.id === 'tang_kinh_cac_seal');

          if (isIntentionalPair) {
            // Intentional trigger-on-landmark pairing: skip error reporting
            continue;
          }

          // Severe sprite overlap: dist < 50
          if (dist < 50) {
            unitIssues.push(
              `[SEVERE SPRITE OVERLAP] ${a.name} (${a.type} @ ${a.x},${a.y}) vs ${b.name} (${b.type} @ ${b.x},${b.y}) - Dist: ${dist.toFixed(1)}px`
            );
          } else if (dist < 90 && aInteractive && bInteractive) {
            unitIssues.push(
              `[CLOSE INTERACTIVE OVERLAP] ${a.name} (${a.type} @ ${a.x},${a.y}) vs ${b.name} (${b.type} @ ${b.x},${b.y}) - Dist: ${dist.toFixed(1)}px`
            );
          } else if (dist < (a.radius + b.radius) * 0.7 && aInteractive && bInteractive) {
            unitIssues.push(
              `[ZONE INTERSECTION] ${a.name} (r=${a.radius}) vs ${b.name} (r=${b.radius}) - Dist: ${dist.toFixed(1)}px < ${(a.radius + b.radius).toFixed(1)}px`
            );
          }

          // Check if Mob patrol range intersects NPC or Landmark or Prop or other mobs
          if (a.type === 'mob' && b.type !== 'mob') {
            const inY = Math.abs(a.y - b.y) < 100;
            const inX = b.x >= (a.patrolMinX! - 50) && b.x <= (a.patrolMaxX! + 50);
            if (inY && inX) {
              unitIssues.push(
                `[MOB PATROL INTERSECTS OBJECT] Mob ${a.name} (patrol X: ${a.patrolMinX}-${a.patrolMaxX}, Y: ${a.y}) collides with ${b.name} (${b.type} @ ${b.x},${b.y})`
              );
            }
          }
          if (b.type === 'mob' && a.type !== 'mob') {
            const inY = Math.abs(b.y - a.y) < 100;
            const inX = a.x >= (b.patrolMinX! - 50) && a.x <= (b.patrolMaxX! + 50);
            if (inY && inX) {
              unitIssues.push(
                `[MOB PATROL INTERSECTS OBJECT] Mob ${b.name} (patrol X: ${b.patrolMinX}-${b.patrolMaxX}, Y: ${b.y}) collides with ${a.name} (${a.type} @ ${a.x},${a.y})`
              );
            }
          }

          // Check if two mobs have overlapping patrol ranges at similar Y
          if (a.type === 'mob' && b.type === 'mob') {
            const yDist = Math.abs(a.y - b.y);
            const xOverlap = Math.max(0, Math.min(a.patrolMaxX!, b.patrolMaxX!) - Math.max(a.patrolMinX!, b.patrolMinX!));
            if (yDist < 60 && xOverlap > 0) {
              unitIssues.push(
                `[MOB PATROL COLLISION] Mob ${a.name} [${a.patrolMinX}-${a.patrolMaxX}, y=${a.y}] and Mob ${b.name} [${b.patrolMinX}-${b.patrolMaxX}, y=${b.y}] overlap in patrol by ${xOverlap}px`
              );
            }
          }
        }
      }

      report.push({ unitId, issuesCount: unitIssues.length, issues: unitIssues });
    }

    console.log(`TOTAL UNITS AUDITED: ${report.length}`);
    let totalIssues = 0;
    report.forEach((r) => {
      totalIssues += r.issuesCount;
    });
    console.log(`\nTOTAL ISSUES DETECTED: ${totalIssues}`);

    fs.writeFileSync('audit_results.json', JSON.stringify(report, null, 2));
  });
});
