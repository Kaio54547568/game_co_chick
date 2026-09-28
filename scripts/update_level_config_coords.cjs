const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/game/levels/levelConfig.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', content.length);

// 1. ho_phap_phuong_tu: from (1150, 560) to (920, 560)
// We match:
// "id": "ho_phap_phuong_tu", ... "x": 1150, "y": 560
const phuongTuRegex = /("id":\s*"ho_phap_phuong_tu"[\s\S]*?"x":\s*)1150(,\s*"y":\s*)560/g;
const phuongTuMatches = (content.match(phuongTuRegex) || []).length;
console.log('Matching Phuong Tu:', phuongTuMatches);
content = content.replace(phuongTuRegex, '$1920$2560');

// 2. ho_phap_hoang_van: from (2550, 780) to (2400, 760)
const hoangVanRegex = /("id":\s*"ho_phap_hoang_van"[\s\S]*?"x":\s*)2550(,\s*"y":\s*)780/g;
const hoangVanMatches = (content.match(hoangVanRegex) || []).length;
console.log('Matching Hoang Van:', hoangVanMatches);
content = content.replace(hoangVanRegex, '$12400$2760');

// 3. ho_phap_nguyet_nguyen: from (750, 1280) to (660, 1260)
const nguyetNguyenRegex = /("id":\s*"ho_phap_nguyet_nguyen"[\s\S]*?"x":\s*)750(,\s*"y":\s*)1280/g;
const nguyetNguyenMatches = (content.match(nguyetNguyenRegex) || []).length;
console.log('Matching Nguyet Nguyen:', nguyetNguyenMatches);
content = content.replace(nguyetNguyenRegex, '$1660$21260');

// 4. Prop 1: from (1250, 620) to (1380, 580)
const prop1Regex = /"x":\s*1250,\s*"y":\s*620/g;
const prop1Matches = (content.match(prop1Regex) || []).length;
console.log('Matching Prop 1:', prop1Matches);
content = content.replace(prop1Regex, '"x": 1380,\n        "y": 580');

// 5. Prop 2: from (850, 1320) to (860, 1300)
const prop2Regex = /"x":\s*850,\s*"y":\s*1320/g;
const prop2Matches = (content.match(prop2Regex) || []).length;
console.log('Matching Prop 2:', prop2Matches);
content = content.replace(prop2Regex, '"x": 860,\n        "y": 1300');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated levelConfig.ts');
