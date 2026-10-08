import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";

const version = await fetch("http://127.0.0.1:9231/json/version").then((r) => r.json());
const browserSocket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { browserSocket.onopen = resolve; browserSocket.onerror = reject; });
let browserCommandId = 0;
const browserPending = new Map();
browserSocket.onmessage = ({ data }) => { const message = JSON.parse(data); if (message.id && browserPending.has(message.id)) { const resolve = browserPending.get(message.id); browserPending.delete(message.id); resolve(message.result); } };
function browserSend(method, params = {}) { const id = ++browserCommandId; browserSocket.send(JSON.stringify({ id, method, params })); return new Promise((resolve) => browserPending.set(id, resolve)); }
const { browserContextId } = await browserSend("Target.createBrowserContext", { disposeOnDetach: true });
const { targetId } = await browserSend("Target.createTarget", { url: "http://127.0.0.1:5173/", browserContextId });
await new Promise((resolve) => setTimeout(resolve, 500));
const target = (await fetch("http://127.0.0.1:9231/json/list").then((r) => r.json())).find((item) => item.id === targetId);
assert.ok(target, "Could not create isolated browser page");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let commandId = 0;
const pending = new Map();
const exceptions = [];
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
  if (message.id && pending.has(message.id)) { const resolve = pending.get(message.id); pending.delete(message.id); resolve(message.result); }
};
function send(method, params = {}) { const id = ++commandId; socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve) => pending.set(id, resolve)); }
async function run(js) { const result = await send("Runtime.evaluate", { expression: js, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result?.value; }
const pause = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));
async function click(selector, index = 0, wait = 180) { const clicked = await run(`(()=>{const e=document.querySelectorAll(${JSON.stringify(selector)})[${index}];if(!e)return false;e.click();return true})()`); assert.equal(clicked, true, `Missing clickable ${selector} #${index}`); await pause(wait); }
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
await pause(1100);
const home = await run("document.querySelector('#app')?.innerText || ''");
assert.match(home, /Chuyện xưa/);
const image = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
writeFileSync("dist/prototype-home.png", Buffer.from(image.data, "base64"));
assert.equal(await run("document.querySelectorAll('.chibi svg').length > 0"), true);
assert.equal(await run("[...document.querySelectorAll('.nav-item')].every(e=>e.querySelector('svg.icon')&&e.title)"), true);

// Owner removed custom character creation from player progression.
assert.equal(await run("document.querySelectorAll('[data-page=\\\"create\\\"],[data-action^=\\\"create-\\\"]').length"), 0);

// Claim the one-time pack, reveal every result in order, then verify the saved roster.
await click('.nav-item[data-page="summon"]');
await click('[data-action="open-summon"]', 0, 300);
for (let i = 0; i < 10; i++) {
  await click('[data-action="reveal-next"]', 0, 850);
  const count = await run("document.querySelectorAll('.reveal-info h2').length");
  assert.equal(count, 1, `Reveal ${i + 1} did not show a Hero`);
}
const revealCount = await run("document.querySelector('.reveal-progress b').innerText");
assert.match(revealCount, /10/);
await click('[data-action="reveal-next"]', 0, 220);
assert.equal(await run("document.querySelectorAll('.result-card').length"), 10);
assert.equal(await run("new Set([...document.querySelectorAll('.result-card h3')].map(e=>e.textContent)).size"), 10);
assert.equal(await run("[...document.querySelectorAll('.result-card .tier-badge')].some(e=>['S','SS'].includes(e.textContent))"), true);
assert.equal(await run("[...document.querySelectorAll('.result-card .tier-badge')].some(e=>['A','S','SS'].includes(e.textContent))"), true);

// Reload and confirm the initial result is durable, claim remains one-time, and tier names render.
await send("Page.reload", { ignoreCache: true });
await pause(900);
await click('.nav-item[data-page="roster"]');
assert.equal(await run("document.querySelectorAll('.character-tile').length"), 10);
await click('.tile-inspect');
assert.equal(await run("document.querySelector('.character-dialog')?.open"), true);
assert.match(await run("document.querySelector('.character-dialog')?.innerText || ''"), /Chỉ số nền/);
await click('.dialog-kit summary');
assert.equal(await run("document.querySelector('.dialog-kit')?.open"), true);
await click('.dialog-close');
const save = await run(`new Promise(resolve=>{const r=indexedDB.open('dau-truong-nhan-vat-local',2);r.onsuccess=()=>{const t=r.result.transaction('save','readonly');const g=t.objectStore('save').get('root');g.onsuccess=()=>resolve(g.result)};r.onerror=()=>resolve(null)})`);
assert.equal(save.da_nhan_trieu_hoi_khoi_dau, true);
assert.equal(save.starter_result.length, 10);
assert.equal(new Set(save.starter_result.map((hero) => hero.class_id)).size, 10);
assert.ok(save.characters.every((character) => character.la_hero_preset));

// Form a party and complete a real PvE turn loop in Chrome.
await click('.nav-item[data-page="team"]');
for (let i = 0; i < 3; i++) await click('.team-choice input[name="member"]', i, 80);
await click('#team-form button');
assert.match(await run("document.querySelector('.toast-note')?.innerText || ''"), /Đội hình đã lưu/);
await click('.nav-item[data-page="pve"]');
await click('.help-tip');
assert.equal(await run("!!document.querySelector('.help-popover')"), true);
await click('.help-tip');
assert.equal(await run("!!document.querySelector('.help-popover')"), false);
await click('[data-action="stage"][data-id="stage-1"]', 0, 450);
let battleResult = "";
for (let turn = 0; turn < 80; turn++) {
  battleResult = await run("document.querySelector('.battle-result')?.innerText || ''");
  if (battleResult) break;
  const usable = await run("document.querySelectorAll('.battle-skill:not(:disabled)').length");
  if (usable) await click('.battle-skill:not(:disabled)', 0, 180);
  else await pause(200);
}
assert.match(battleResult, /Chiến thắng/i);
assert.match(battleResult, /100 Hương Hỏa/);
await send("Page.reload", { ignoreCache: true });
await pause(850);
assert.equal(await run("document.querySelector('[data-wallet]')?.textContent"), "100");
const reloaded = await run(`new Promise(resolve=>{const r=indexedDB.open('dau-truong-nhan-vat-local',2);r.onsuccess=()=>{const t=r.result.transaction('save','readonly');const g=t.objectStore('save').get('root');g.onsuccess=()=>resolve(g.result)};r.onerror=()=>resolve(null)})`);
assert.equal(reloaded.tien_do_di_ai["stage-1"].da_hoan_thanh, true);
assert.equal(reloaded.vi_huong_hoa.so_du, 100);

// DEV LOCAL is development-only and its sandbox uses the same engine without player-save writes.
await send("Page.navigate", { url: "http://127.0.0.1:5173/?dev=1" });
await pause(900);
await click('.nav-item[data-page="dev"]');
assert.match(await run("document.querySelector('.dev-workbench')?.innerText || ''"), /DEV LOCAL/);
await click('[data-dev-tab="effects"]');
assert.equal(await run("document.querySelectorAll('.dev-effect-card').length"), 19);
await click('[data-dev-tab="content"]');
assert.equal(await run("document.querySelectorAll('.dev-content-card').length"), 23);
const selectDevClass = async () => { await run("(()=>{const s=document.querySelector('[name=\"editor-class\"]');s.value='hero-thanh-giong';s.dispatchEvent(new Event('change',{bubbles:true}))})()"); await pause(220); };
await selectDevClass();
await run("(()=>{document.querySelector('[name=\"class-name\"]').value='Thánh Gióng Dev v2';document.querySelector('[data-dev-action=\"new-skill\"]').click()})()");
await pause(220);
assert.equal(await run("document.querySelector('[name=\"editor-skill\"]')?.options.length"), 7);
await run("(()=>{document.querySelector('[name=\"skill-name\"]').value='Skill Dev Hai Effect';document.querySelector('[data-dev-action=\"add-effect\"]').click()})()");
await pause(220);
assert.equal(await run("document.querySelectorAll('#dev-content-form .dev-effect-edit').length"), 2);
assert.equal(await run("document.querySelectorAll('.dev-guardrail.red').length"), 0);
await click('[data-passive-add]');
assert.equal(await run("document.querySelectorAll('.dev-passive-effect').length"), 2);
await run("(()=>{const s=document.querySelector('[name=\"passive-condition\"]');s.value='HP_PCT_NHO_HON_BANG';s.dispatchEvent(new Event('change',{bubbles:true}))})()");
await pause(220);
assert.equal(await run("document.querySelector('[name=\"passive-condition-value\"]')?.disabled"), false);
await run("document.querySelector('#dev-content-form').requestSubmit()");
await pause(250);
assert.equal(await run("localStorage.getItem('dau-truong-nhan-vat-dev-content-version')"), "2");
await click('[data-dev-tab="sandbox"]');
await run("(()=>{const s=document.querySelector('[data-dev-skills=\"a\"][data-slot=\"1\"]');for(const o of s.options)o.selected=o.textContent.includes('Skill Dev Hai Effect')})()");
await run("document.querySelector('#dev-sandbox-form').requestSubmit()");
await pause(250);
assert.equal(await run("document.querySelectorAll('.dev-state-card').length"), 2, await run("document.querySelector('.dev-main')?.innerText || ''"));
assert.match(await run("document.querySelector('.dev-state-card small')?.textContent || ''"), /^SS ·/);
assert.match(await run("document.querySelector('.dev-battle').innerText"), /CONTENT v2/);
assert.match(await run("document.querySelector('.dev-battle').innerText"), /Skill Dev Hai Effect/);
await run("(()=>{document.querySelector('[name=\\\"batch-count\\\"]').value='1'})()");
await click('[data-dev-action="run-batch"]');
await pause(500);
assert.match(await run("document.querySelector('.dev-batch-report h2')?.textContent || ''"), /AI-vs-AI · 1 trận/);
assert.equal(await run("[...document.querySelectorAll('.dev-batch-grid article b')].length >= 12 && [...document.querySelectorAll('.dev-batch-grid article b')].every(e=>!e.textContent.includes('NaN'))"), true);
await click('.dev-skill-button:not(:disabled)');
assert.equal(await run("document.querySelectorAll('.dev-combat-log li').length"), 1);
await click('[data-dev-tab="content"]');
await selectDevClass();
await run("(()=>{document.querySelector('[name=\"class-name\"]').value='Thánh Gióng Dev v3';document.querySelector('#dev-content-form').requestSubmit()})()");
await pause(250);
await click('[data-dev-tab="sandbox"]');
assert.match(await run("document.querySelector('.dev-battle').innerText"), /CONTENT v2/);
await click('[data-dev-action="reset"]');
await run("document.querySelector('#dev-sandbox-form').requestSubmit()");
await pause(250);
assert.match(await run("document.querySelector('.dev-battle').innerText"), /CONTENT v3/);
assert.match(await run("document.querySelector('.dev-state-card small')?.textContent || ''"), /Thánh Gióng Dev v3/);
const afterDev = await run(`new Promise(resolve=>{const r=indexedDB.open('dau-truong-nhan-vat-local',2);r.onsuccess=()=>{const t=r.result.transaction('save','readonly');const g=t.objectStore('save').get('root');g.onsuccess=()=>resolve(g.result)};r.onerror=()=>resolve(null)})`);
assert.equal(afterDev.vi_huong_hoa.so_du, 100);
assert.equal(afterDev.tien_do_di_ai["stage-1"].da_hoan_thanh, true);

// DEV progression tools use their own wallet and never modify the player save.
await click('[data-dev-tab="progression"]');
await run("(()=>{document.querySelector('[name=\"gacha-seed\"]').value='42';document.querySelector('[name=\"gacha-count\"]').value='3';document.querySelector('#dev-gacha-form').requestSubmit()})()");
await pause(250);
assert.equal(await run("document.querySelectorAll('.dev-gacha-run').length"), 3);
assert.equal(await run("[...document.querySelectorAll('.dev-gacha-run')].every(e=>e.querySelectorAll('li').length===10&&new Set([...e.querySelectorAll('li')].map(x=>x.textContent.slice(4))).size===10)"), true);
await click('[data-dev-action="wallet-100"]');
await click('[data-dev-action="test-first-clear"]');
assert.match(await run("document.querySelector('.dev-count')?.textContent || ''"), /200/);
await click('[data-dev-action="test-replay"]');
assert.match(await run("document.querySelector('.dev-count')?.textContent || ''"), /200/);
await run("(()=>{document.querySelector('[name=\"wallet-value\"]').value='300';document.querySelector('#dev-wallet-form').requestSubmit()})()");
await pause(180);
await run("document.querySelector('[name=\"dev-unlock-target\"]').value='linh-than-lac-long-quan'");
await click('[data-dev-action="unlock-dev"]');
assert.match(await run("document.querySelector('.dev-count')?.textContent || ''"), /0/);
await click('[data-dev-action="reset-progress"]');
assert.match(await run("document.querySelector('.dev-count')?.textContent || ''"), /0/);
const playerAfterProgressLab = await run(`new Promise(resolve=>{const r=indexedDB.open('dau-truong-nhan-vat-local',2);r.onsuccess=()=>{const t=r.result.transaction('save','readonly');const g=t.objectStore('save').get('root');g.onsuccess=()=>resolve(g.result)};r.onerror=()=>resolve(null)})`);
assert.equal(playerAfterProgressLab.vi_huong_hoa.so_du, 100);
assert.equal(playerAfterProgressLab.characters.length, 10);

// Narrow phone and tablet viewports: game UI and fixed bottom navigation do not overflow.
await send("Emulation.setDeviceMetricsOverride", { width: 320, height: 780, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: "http://127.0.0.1:5173/" });
await pause(700);
assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true);
assert.equal(await run("getComputedStyle(document.querySelector('.main-nav')).position"), "fixed");
assert.equal(await run("Math.abs(document.querySelector('.main-nav').getBoundingClientRect().bottom-innerHeight)<4"), true);
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await pause(250);
assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true);
await send("Emulation.setDeviceMetricsOverride", { width: 768, height: 1024, deviceScaleFactor: 1, mobile: true });
await pause(250);
assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true);
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
await pause(250);
assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true);
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await pause(250);
const mobile = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
writeFileSync("dist/prototype-mobile.png", Buffer.from(mobile.data, "base64"));
assert.deepEqual(exceptions, []);
console.log(JSON.stringify({ url: target.url, screens: ["home without custom creation", "sequential summon 1-10", "roster and reload", "formation", "PvE combat", "first-clear and reload", "Dev Local content/effect editor", "isolated seeded battle sandbox", "mobile layout"], results: save.starter_result.map(({ ten_co_dinh, tier }) => `${ten_co_dinh} (${tier})`), characterCountAfterReload: reloaded.characters.length, firstClearBalance: reloaded.vi_huong_hoa.so_du, devVersion: 3, consoleExceptions: exceptions }));
socket.close();
browserSocket.close();
