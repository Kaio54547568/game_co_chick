// Runtime integration review against the local Phaser review page.
// Start Vite, open /tools/player-walk-review.html, and connect
// a browser with --remote-debugging-port=9224 (or set PLAYER_WALK_CDP_PORT).
import assert from 'node:assert/strict';
import fs from 'node:fs';

const port = process.env.PLAYER_WALK_CDP_PORT || '9224';
const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const tab = tabs.find(t => t.type === 'page' && t.url.includes('player-walk-review.html'));
assert.ok(tab, 'Open the player walking review page first');
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
let sequence = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const response = JSON.parse(data);
  const request = pending.get(response.id);
  if (!request) return;
  pending.delete(response.id);
  response.error ? request.reject(response.error) : request.resolve(response.result);
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const emit = (name, payload) => evaluate(`window.walkReview.eventBus.emit(${JSON.stringify(name)}, ${JSON.stringify(payload)})`);
const state = () => evaluate(`(() => {
  const w = window.walkReview.game.scene.getScene('WorldScene');
  return { playing: w.player.anims.isPlaying, animation: w.player.anims.currentAnim?.key,
    texture: w.player.texture.key, frame: Number(w.player.frame.name),
    timeScale: w.player.anims.timeScale, x: w.player.x, y: w.player.y,
    vx: w.player.body.velocity.x, vy: w.player.body.velocity.y };
})()`);

try {
  await call('Page.bringToFront');
  for (let i = 0; i < 80; i++) {
    if (await evaluate(`Boolean(window.walkReview?.game.scene.getScene('WorldScene')?.hasInitializedLevel)`)) break;
    if (i === 79) throw new Error('World did not finish loading');
    await pause(250);
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await call('Emulation.setTouchEmulationEnabled', { enabled: true });
  await emit('lockMovement', false);
  const cases = [
    { direction: 'down', x: 0, y: 1, row: 0 },
    { direction: 'up', x: 0, y: -1, row: 1 },
    { direction: 'left', x: -1, y: 0, row: 2 },
    { direction: 'right', x: 1, y: 0, row: 3 },
  ];
  const report = [];
  for (const gender of ['male', 'female']) {
    await emit('changeGender', gender);
    for (const movement of cases) {
      await evaluate(`void window.walkReview.game.scene.getScene('WorldScene').player.setPosition(500, 900)`);
      await emit('setJoystick', { x: movement.x, y: movement.y });
      const frames = new Set();
      for (let sample = 0; sample < 7; sample++) {
        await pause(100);
        const current = await state();
        assert.equal(current.playing, true, JSON.stringify(current));
        assert.equal(current.animation, `player_${gender}_walk_${movement.direction}`);
        assert.equal(current.texture, `player_${gender}_walk`);
        assert.ok(current.frame >= movement.row * 4 && current.frame <= movement.row * 4 + 3);
        frames.add(current.frame);
      }
      assert.ok(frames.size >= 3, `${gender} ${movement.direction}: cycle did not advance`);
      await emit('setJoystick', { x: 0, y: 0 });
      await pause(60);
      const standing = await state();
      assert.equal(standing.playing, false);
      assert.equal(standing.texture, `player_${gender}_4dir`);
      assert.equal(standing.frame, movement.row);
      assert.equal(standing.vx, 0);
      assert.equal(standing.vy, 0);
      report.push({ gender, direction: movement.direction, frames: [...frames], stopped: true });
    }
  }
  await emit('setJoystick', { x: 1, y: 0 });
  await evaluate(`window.walkReview.game.scene.getScene('WorldScene').wasdKeys.SHIFT.isDown = true`);
  await pause(80);
  assert.equal((await state()).timeScale, 1.35);
  await evaluate(`window.walkReview.game.scene.getScene('WorldScene').wasdKeys.SHIFT.isDown = false`);
  await emit('lockMovement', true);
  await pause(60);
  const locked = await state();
  assert.equal(locked.playing, false);
  assert.equal(locked.vx, 0);
  assert.equal(locked.vy, 0);
  assert.equal(locked.texture, 'player_female_4dir');
  await emit('setJoystick', { x: 0, y: 0 });
  await emit('lockMovement', false);
  const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync('tools/player-walk-mobile.png', Buffer.from(screenshot.data, 'base64'));
  console.log(JSON.stringify({ checked: report, sprint: 'passed', movementLock: 'passed' }, null, 2));
} finally {
  await call('Emulation.clearDeviceMetricsOverride');
  ws.close();
}
