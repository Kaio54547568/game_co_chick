const fs = require('fs');

const content = fs.readFileSync('./src/game/levels/levelConfig.ts', 'utf8');

const countMatches = (regex) => (content.match(regex) || []).length;

console.log('Total file lines:', content.split('\n').length);
console.log('ho_phap_phuong_tu at 1150, 560:', countMatches(/"ho_phap_phuong_tu"[\s\S]*?"x":\s*1150,\s*"y":\s*560/g));
console.log('ho_phap_hoang_van at 2550, 780:', countMatches(/"ho_phap_hoang_van"[\s\S]*?"x":\s*2550,\s*"y":\s*780/g));
console.log('ho_phap_nguyet_nguyen at 750, 1280:', countMatches(/"ho_phap_nguyet_nguyen"[\s\S]*?"x":\s*750,\s*"y":\s*1280/g));
console.log('Prop 1 at 1250, 620:', countMatches(/"x":\s*1250,\s*"y":\s*620/g));
console.log('Prop 2 at 850, 1320:', countMatches(/"x":\s*850,\s*"y":\s*1320/g));
