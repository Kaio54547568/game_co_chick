const fs = require('fs');

const content = fs.readFileSync('./src/game/levels/levelConfig.ts', 'utf8');
const match = content.match(/export const ALL_LEVEL_CONFIGS: Record<string, LevelMapConfig> = (\{[\s\S]*?\n\};)/);

if (!match) {
  console.error('Could not extract ALL_LEVEL_CONFIGS');
  process.exit(1);
}

// Evaluate config
const configs = eval('(' + match[1].replace(/;\s*$/, '') + ')');
const unitIds = Object.keys(configs);
console.log('Auditing Level Design across', unitIds.length, 'units...');

const report = [];

unitIds.forEach((unitId) => {
  const cfg = configs[unitId];
  const issues = [];

  // Check NPCs safe zone
  cfg.npcs.forEach((npc) => {
    // Check distance to all enemies
    cfg.enemies.forEach((enemy) => {
      const dist = Math.hypot(npc.x - enemy.x, npc.y - enemy.y);
      if (dist < 220) {
        issues.push({
          type: 'ENEMY_TOO_CLOSE_TO_NPC',
          npcId: npc.id,
          enemyId: enemy.enemyId,
          distance: Math.round(dist),
          npcPos: [npc.x, npc.y],
          enemyPos: [enemy.x, enemy.y],
        });
      }

      // Check if patrol range reaches NPC
      const patrolMinX = enemy.patrolRange ? enemy.patrolRange.minX : enemy.x - 100;
      const patrolMaxX = enemy.patrolRange ? enemy.patrolRange.maxX : enemy.x + 100;
      if (Math.abs(npc.y - enemy.y) < 120) {
        if (npc.x >= patrolMinX - 100 && npc.x <= patrolMaxX + 100) {
          issues.push({
            type: 'ENEMY_PATROL_INTO_NPC_SPACE',
            npcId: npc.id,
            enemyId: enemy.enemyId,
            npcX: npc.x,
            patrolRange: [patrolMinX, patrolMaxX],
          });
        }
      }
    });
  });

  // Check props distance to enemies
  cfg.props.forEach((prop) => {
    cfg.enemies.forEach((enemy) => {
      const dist = Math.hypot(prop.x - enemy.x, prop.y - enemy.y);
      if (dist < 180) {
        issues.push({
          type: 'ENEMY_TOO_CLOSE_TO_PROP',
          propId: prop.id,
          enemyId: enemy.enemyId,
          distance: Math.round(dist),
        });
      }
    });
  });

  // Check enemy-to-enemy spawn distance
  for (let i = 0; i < cfg.enemies.length; i++) {
    for (let j = i + 1; j < cfg.enemies.length; j++) {
      const e1 = cfg.enemies[i];
      const e2 = cfg.enemies[j];
      const dist = Math.hypot(e1.x - e2.x, e1.y - e2.y);
      if (dist < 140) {
        issues.push({
          type: 'ENEMIES_TOO_CLOSE_SPAWN',
          e1: e1.enemyId,
          e2: e2.enemyId,
          distance: Math.round(dist),
        });
      }
    }
  }

  // Check safe spawn haven (around x: 450-550, y: 500-600)
  cfg.enemies.forEach((enemy) => {
    if (enemy.x < 850 && enemy.y < 850) {
      issues.push({
        type: 'ENEMY_IN_SAFE_SPAWN_HAVEN',
        enemyId: enemy.enemyId,
        pos: [enemy.x, enemy.y],
      });
    }
  });

  report.push({ unitId, issuesCount: issues.length, issues });
});

const totalIssues = report.reduce((sum, r) => sum + r.issuesCount, 0);
console.log('TOTAL DESIGN ISSUES FOUND:', totalIssues);

if (totalIssues > 0) {
  console.log(JSON.stringify(report.filter(r => r.issuesCount > 0), null, 2));
} else {
  console.log('ALL 30 LEVELS SATISFY SPACING & SAFETY REQUIREMENTS!');
}
