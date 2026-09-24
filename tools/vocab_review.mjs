const tabs = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const tab = tabs.find((t) => t.type === 'page' && t.url.startsWith('http://127.0.0.1:3000'));
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
let id = 0;
const waiting = new Map();
ws.addEventListener('message', ({data}) => { const m = JSON.parse(data); if (waiting.has(m.id)) { waiting.get(m.id)(m.result); waiting.delete(m.id); } });
const call = (method, params={}) => new Promise((resolve) => { const n=++id; waiting.set(n,resolve); ws.send(JSON.stringify({id:n,method,params})); });
const evaluate = async expression => (await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const pause = ms => new Promise(r=>setTimeout(r,ms));
console.log('click book:',await evaluate("(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Bí Điển'); if(!b)return 'missing'; b.click(); return 'clicked'})()"));
await pause(400);
console.log('buttons:',await evaluate("[...document.querySelectorAll('button')].map(x=>x.textContent.trim()).slice(-30)"));
console.log('body:',await evaluate("document.body.innerText.slice(-2400)"));
const words = ['household chores','responsibility','eco-friendly','carbon footprint','sustainable','lifestyle'];
for (const word of words) {
  const result = await evaluate(`(()=>{const e=[...document.querySelectorAll('div.cursor-pointer')].find(x=>x.textContent.trim().startsWith(${JSON.stringify(word)}));if(!e)return 'missing';e.click();return 'clicked'})()`);
  console.log(word, result);
  await pause(100);
}
console.log('save after six words:',await evaluate("(()=>{const s=JSON.parse(localStorage.getItem('phuong_chick_english_wulin_save_v1'));return {learned:s.learnedVocabIds,progress:s.unitProgress,quests:s.quests.map(q=>[q.id,q.status,q.progress])}})()"));
ws.close();
