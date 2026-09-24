import fs from 'node:fs';

const tabs = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const tab = tabs.find((t) => t.type === 'page' && t.url.startsWith('http://127.0.0.1:3000'));
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (!pending.has(msg.id)) return;
  const { resolve, reject } = pending.get(msg.id);
  pending.delete(msg.id);
  msg.error ? reject(msg.error) : resolve(msg.result);
});
const call = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
const evaluate = async (expression) => (await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const key = async (kind, key, code, num) => call('Input.dispatchKeyEvent', { type: kind, key, code, windowsVirtualKeyCode: num, nativeVirtualKeyCode: num });

await key('keyDown', 'd', 'KeyD', 68); await pause(500); await key('keyUp', 'd', 'KeyD', 68);
await key('keyDown', 'e', 'KeyE', 69); await pause(90); await key('keyUp', 'e', 'KeyE', 69);
await pause(400);
console.log('dialogue:', await evaluate("({text:document.body.innerText.slice(-1800),buttons:[...document.querySelectorAll('button')].map(b=>b.textContent.trim()).slice(-8)})"));
console.log('quest click:', await evaluate("(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Lĩnh Ý Bang Chủ'));if(!b)return 'missing';b.click();return 'clicked'})()"));
await pause(500);
console.log('save after quest1:', await evaluate("(()=>{const s=JSON.parse(localStorage.getItem('phuong_chick_english_wulin_save_v1'));return {progress:s.unitProgress,quest:s.quests.map(q=>[q.id,q.status]),xp:s.stats.xp}})()"));
const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('tools/game_after_quest1.png', Buffer.from(screenshot.data, 'base64'));
ws.close();
