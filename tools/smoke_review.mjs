import fs from 'node:fs';

const tabs = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const tab = tabs.find((t) => t.type === 'page' && t.url.startsWith('http://127.0.0.1:3000'));
if (!tab) throw new Error('No game tab');

const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});

let id = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(message.error) : resolve(message.result);
  }
});

function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    pending.set(key, { resolve, reject });
    ws.send(JSON.stringify({ id: key, method, params }));
  });
}

async function evaluate(expression) {
  const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
console.log('initial:', await evaluate("({buttons:[...document.querySelectorAll('button')].map(x=>x.textContent.trim()), canvas:document.querySelectorAll('canvas').length})"));
console.log('click:', await evaluate("(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Bước Vào Giang Hồ'));if(!b)return 'missing';b.click();return 'clicked'})()"));
await pause(3500);
console.log('after start:', await evaluate("({body:document.body.innerText.slice(0,1800),canvas:document.querySelectorAll('canvas').length,localStorage:!!localStorage.getItem('phuong_chick_english_wulin_save_v1')})"));
const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('tools/game_after_start.png', Buffer.from(screenshot.data, 'base64'));
ws.close();
