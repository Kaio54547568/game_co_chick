const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/game/levels/levelConfig.ts');
let content = fs.readFileSync(filePath, 'utf8');

const mentorBlock = `      {
        "id": "bach_khoa_thu_sinh",
        "name": "Bách Khoa Thư Sinh",
        "title": "Đại Sư Huynh Tông Môn",
        "elementColor": "#c084fc",
        "spriteKey": "bach_khoa_thu_sinh",
        "portraitPath": "/assets/game/characters/npc/portraits/bach_khoa_thu_sinh_v2.png",
        "x": 740,
        "y": 480,
        "prompt": "[E] Thỉnh Giáo Bách Khoa Thư Sinh",
        "dialogueIntro": "Chào sư đệ/sư muội! Đại học không nhàn như giang hồ đồn đâu các đệ... Nhưng qua được ải THPT này, thiên hạ sẽ mở rộng trước mắt! Có gì vướng mắc về bẫy thi cử hay kỹ năng thực chiến, cứ hỏi ta!"
      },`;

// Replace each occurrence of "id": "bang_chu" block's closing brace and comma with mentorBlock followed by the next NPC
const bangChuRegex = /(\{\s*"id":\s*"bang_chu"[\s\S]*?"dialogueIntro":\s*"[^"]*"\s*\},\s*\n)/g;

let count = 0;
content = content.replace(bangChuRegex, (match) => {
  count++;
  return match + mentorBlock + '\n';
});

console.log(`Inserted bach_khoa_thu_sinh into ${count} units in levelConfig.ts`);
fs.writeFileSync(filePath, content, 'utf8');
