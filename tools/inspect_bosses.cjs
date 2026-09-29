const fs = require('fs');

const content = fs.readFileSync('./src/game/levels/levelConfig.ts', 'utf8');
const units = content.split(/"(g\d+-u\d+)":\s*\{/);

console.log('Unit | HasRealBoss | Name | Title | CombatMode | Phase');
console.log('-------------------------------------------------------');

for (let i = 1; i < units.length; i += 2) {
  const uid = units[i];
  const body = units[i + 1];
  
  const mReal = body.match(/"hasRealBoss":\s*(true|false)/);
  const mName = body.match(/"climax":\s*\{[\s\S]*?"name":\s*"([^"]+)"/);
  const mTitle = body.match(/"climax":\s*\{[\s\S]*?"title":\s*"([^"]+)"/);
  const mMode = body.match(/"climax":\s*\{[\s\S]*?"combatMode":\s*"([^"]+)"/);
  const mPhase = body.match(/"climax":\s*\{[\s\S]*?"bossPhase":\s*(\d+)/);

  console.log(`${uid} | ${mReal ? mReal[1] : 'false'} | ${mName ? mName[1] : ''} | ${mTitle ? mTitle[1] : ''} | ${mMode ? mMode[1] : ''} | Phase ${mPhase ? mPhase[1] : '1'}`);
}
