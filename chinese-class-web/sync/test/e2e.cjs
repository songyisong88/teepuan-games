/* ทดสอบ sync.js ด้วย LIFF + Supabase จำลอง (ไม่ออกเน็ตจริง)
   รัน: (cd chinese-class-web && python3 -m http.server 8790 &) ; NODE_PATH=<playwright-core> node sync/test/e2e.cjs [baseURL] [outDir] */
const { chromium } = require('playwright-core');
const assert = require('assert');
const BASE = process.argv[2] || 'http://127.0.0.1:8790/';
const OUT = process.argv[3] || '/tmp/lsync-shots/';
const FN = 'https://xkwbggclhxcskikqlqkv.supabase.co/functions/v1/line-sync';
const UID = 'U' + 'a'.repeat(32);
require('fs').mkdirSync(OUT, { recursive: true });

const MOCK_LIFF = `window.liff={_in:()=>sessionStorage.getItem('mockLiffIn')==='1',
 init:async function(o){if(!o||!o.liffId)throw new Error('no liffId');if(/[?&]code=/.test(location.search)){sessionStorage.setItem('mockLiffIn','1');history.replaceState(null,'',location.pathname)}window.__liffInit=(window.__liffInit||0)+1},
 isLoggedIn(){return this._in()},isInClient:()=>false,
 login(o){sessionStorage.setItem('mockLoginCalled','1');location.href=o.redirectUri.split('?')[0]+'?code=abc&state=xyz'},
 getIDToken(){return this._in()?'MOCKIDTOKEN.${UID}':null},getDecodedIDToken:()=>({name:'ซ้งอี้',sub:'${UID}'}),
 logout(){sessionStorage.removeItem('mockLiffIn')}};`;

// เซิร์ฟเวอร์จำลอง (พฤติกรรมเดียวกับ Edge Function: uid มาจาก token เท่านั้น)
const db = {}; const calls = [];
const sess = uid => 'SESS.' + uid;
function handle(op, body, headers) {
  calls.push({ op, body, headers });
  if (op === 'login') { const m = /^MOCKIDTOKEN\.(U[0-9a-f]{32})$/.exec(body.idToken || ''); return m ? [200, { session: sess(m[1]), exp: Date.now() + 30 * 864e5 }] : [401, { error: 'bad token' }]; }
  const m = /^SESS\.(U[0-9a-f]{32})$/.exec(headers['x-lama-session'] || ''); if (!m) return [401, { error: 'session' }];
  const uid = m[1], row = db[uid];
  if (op === 'pull') return [200, row ? { state: row.state, rev: row.rev, t: row.t } : { state: null, rev: 0 }];
  if (op === 'push') { const cur = row ? row.rev : 0; if (body.baseRev !== cur) return [200, { conflict: true, rev: cur, state: row && row.state, t: row && row.t }];
    db[uid] = { state: body.state, rev: cur + 1, t: body.t }; return [200, { rev: cur + 1 }]; }
  if (op === 'delete') { delete db[uid]; return [200, { deleted: true }]; }
  return [400, { error: 'op' }];
}
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'content-type': 'application/json' };

const seed = { seenWelcome: true, seenOnboard: true, lvPicked: true, xp: 40, coins: 25, streak: 2, lastDay: 0, parts: ['1a'], stars: { '1a': 2 }, srs: {}, dv: 2 };

async function ctxFor(b, { configured, debounce = 600 }) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'th-TH', serviceWorkers: 'block' });
  const net = [];
  ctx.on('request', r => { const u = r.url(); if (!u.startsWith(BASE)) net.push(u) });
  await ctx.route('https://static.line-scdn.net/**', r => r.fulfill({ status: 200, contentType: 'application/javascript', body: MOCK_LIFF }));
  await ctx.route(FN, async r => { if (r.request().method() === 'OPTIONS') return r.fulfill({ status: 204, headers: CORS });
    const body = JSON.parse(r.request().postData() || '{}'); const [s, j] = handle(body.op, body, r.request().headers()); await r.fulfill({ status: s, headers: CORS, body: JSON.stringify(j) }) });
  await ctx.route(/\/sync-config\.js/, async r => { const res = await r.fetch(); let t = await res.text();
    t = t.replace(/LIFF_ID:'[^']*'/, configured ? "LIFF_ID:'2012275318-kQuUJGv4'" : "LIFF_ID:''").replace(/PUSH_DEBOUNCE_MS:\d+/, 'PUSH_DEBOUNCE_MS:' + debounce); await r.fulfill({ response: res, body: t }) });
  // ปิดเสียง/โฟกัสอื่น ๆ ที่ไม่เกี่ยว: ปล่อยตามจริง
  return { ctx, net };
}
async function open(ctx, state) {
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()) });
  p.on('dialog', d => d.accept());
  if (state) await p.addInitScript(s => { if (!localStorage.getItem('lama-cn-web-demo-v2')) { const d = JSON.parse(s); d.lastDay = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5); localStorage.setItem('lama-cn-web-demo-v2', JSON.stringify(d)) } }, JSON.stringify(state));
  await p.goto(BASE); await p.waitForTimeout(1500); return { p, errs };
}
const meTab = p => p.click('#tabbar [data-tab=me]').then(() => p.waitForTimeout(500));
const scrollTo = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: 'center' }) }, sel).then(() => p.waitForTimeout(300));
const S = p => p.evaluate(() => JSON.parse(JSON.stringify(S)));
const results = [];
const ok = (n, c, extra) => { const L=(c ? 'PASS ' : 'FAIL ') + n + (extra ? ' — ' + extra : ''); results.push(L); console.log(L); if (!c) process.exitCode = 1 };

(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });

  // 1) ยังไม่ตั้งค่า (ค่าใน repo ตอนนี้: LIFF_ID ว่าง) → ระบบปิด ไม่ออกเน็ต ไม่มีปุ่ม
  { const { ctx, net } = await ctxFor(b, { configured: false });
    const { p, errs } = await open(ctx, seed); await meTab(p);
    ok('unconfigured: LamaSync.enabled=false', (await p.evaluate(() => LamaSync.enabled)) === false);
    ok('unconfigured: no LINE section in ฉัน', (await p.locator('[data-sync]').count()) === 0);
    ok('unconfigured: no LIFF/Supabase requests', !net.some(u => /line-scdn|supabase/.test(u)), net.filter(u => /line|supabase/.test(u)).join(','));
    await p.evaluate(() => { S.parts.push('1b'); save() }); await p.waitForTimeout(2500);
    ok('unconfigured: no banner', (await p.locator('.lsync-ban').count()) === 0);
    ok('unconfigured: 0 console errors', errs.length === 0, errs.join(' | '));
    await p.screenshot({ path: OUT + '1-unconfigured-me.png' }); await ctx.close(); }

  // 2) ตั้งค่าแล้ว + ผู้เยี่ยมชม → ทำงานเหมือนเดิม, ไม่โหลด LIFF จนกว่าจะกด, มีปุ่มในฉัน, มีแบนเนอร์ชวน
  { const { ctx, net } = await ctxFor(b, { configured: true });
    const { p, errs } = await open(ctx, seed);
    ok('guest: enabled', (await p.evaluate(() => LamaSync.enabled)) === true);
    ok('guest: LIFF SDK not loaded before login', !net.some(u => /line-scdn/.test(u)));
    await p.waitForTimeout(3500);
    ok('guest: banner shown after ≥1 unit', (await p.locator('.lsync-ban.on').count()) === 1);
    await p.screenshot({ path: OUT + '2-guest-banner.png' });
    await p.click('.lsync-ban .x'); await p.waitForTimeout(400);
    ok('guest: banner dismissed', (await p.locator('.lsync-ban').count()) === 0);
    await p.evaluate(() => { S.xp += 5; save() }); await p.waitForTimeout(2200);
    ok('guest: banner not re-shown (3-day cooldown)', (await p.locator('.lsync-ban').count()) === 0);
    ok('guest: localStorage still saves', JSON.parse(await p.evaluate(() => localStorage.getItem('lama-cn-web-demo-v2'))).xp === 45);
    await meTab(p); await scrollTo(p, '[data-sync=login]');
    ok('guest: login row in ฉัน', (await p.locator('[data-sync=login]').count()) === 1);
    await p.screenshot({ path: OUT + '3-guest-me-login-row.png' });
    ok('guest: no network to supabase', !net.some(u => /supabase/.test(u)));
    ok('guest: 0 console errors', errs.length === 0, errs.join(' | '));

    // 3) ล็อกอิน: คลาวด์มีข้อมูลจากอีกเครื่อง → รวมแบบไม่หาย
    db[UID] = { rev: 3, t: Date.now() - 864e5, state: Object.assign({}, seed, { xp: 300, coins: 10, parts: ['1a', '2a'], stars: { '1a': 3, '2a': 1 }, streak: 9, lastDay: 1, name: 'เครื่องเก่า', inviteCode: 'LAMA-OLD1' }) };
    await p.click('[data-sync=login]'); await p.waitForURL(/code=abc/).catch(() => {}); await p.waitForTimeout(2500);
    const s = await S(p);
    ok('login: liff.login redirect used', (await p.evaluate(() => sessionStorage.getItem('mockLoginCalled'))) === '1');
    ok('login: callback query stripped', !/code=/.test(p.url()));
    ok('login: merged xp=max', s.xp === 300, 'xp=' + s.xp);
    ok('login: merged coins=max', s.coins === 25, 'coins=' + s.coins);
    ok('login: parts union', ['1a', '2a'].every(x => s.parts.includes(x)), s.parts.join(','));
    ok('login: stars per-key max', s.stars['1a'] === 3 && s.stars['2a'] === 1);
    ok('login: streak from latest study day (local today)', s.streak === 2 && s.bestStreak >= 9, 'streak=' + s.streak + ' best=' + s.bestStreak);
    ok('login: inviteCode kept from cloud', s.inviteCode === 'LAMA-OLD1');
    ok('login: cloud updated to merged', db[UID].rev >= 4 && db[UID].state.xp === 300 && db[UID].state.parts.includes('2a') && db[UID].state.coins === 25, 'rev=' + db[UID].rev);
    ok('security: client never sent a userId', calls.every(c => !/"(uid|userId|line_uid|sub)"/.test(JSON.stringify(c.body))));
    ok('security: session token not in lama-* (backup) keys', await p.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('lama-')).every(k => !/SESS\./.test(localStorage.getItem(k)))));
    await meTab(p); await scrollTo(p, '[data-sync=now]');
    ok('linked: ฉัน shows linked rows', (await p.locator('[data-sync=now]').count()) === 1 && (await p.locator('[data-sync=logout]').count()) === 1);
    await p.screenshot({ path: OUT + '4-linked-me.png' });

    // 4) debounce: บันทึก 5 ครั้งติดกัน → push ครั้งเดียว
    const before = calls.filter(c => c.op === 'push').length;
    await p.evaluate(async () => { for (let i = 0; i < 5; i++) { S.xp += 1; save(); await new Promise(r => setTimeout(r, 80)) } });
    await p.waitForTimeout(1500);
    const pushes = calls.filter(c => c.op === 'push').length - before;
    ok('debounce: 5 saves → 1 push', pushes === 1, 'pushes=' + pushes);
    ok('debounce: cloud has latest xp', db[UID].state.xp === 305, 'xp=' + db[UID].state.xp);

    // 5) ชนกัน: อีกเครื่องเขียนก่อน → 409 → รวม → ส่งใหม่สำเร็จ
    db[UID] = { rev: db[UID].rev + 1, t: Date.now(), state: Object.assign({}, db[UID].state, { xp: 400, parts: db[UID].state.parts.concat('3a') }) };
    await p.evaluate(() => { S.coins += 7; save() }); await p.waitForTimeout(1500);
    const s2 = await S(p);
    ok('conflict: local merged other device (xp 400, 3a)', s2.xp === 400 && s2.parts.includes('3a'));
    ok('conflict: cloud has both changes', db[UID].state.xp === 400 && db[UID].state.coins === s2.coins && db[UID].state.parts.includes('3a'));

    // 6) โหลดหน้าใหม่ตอนเชื่อมแล้ว → ดึงคลาวด์อัตโนมัติ
    db[UID].state.xp = 450; db[UID].rev++; await p.reload(); await p.waitForTimeout(2500);
    ok('reload: pulled newer cloud xp', (await S(p)).xp === 450);

    // 7) ออกจากระบบ → ข้อมูลในเครื่องยังอยู่ แล้วไม่ส่งอะไรอีก
    await meTab(p); await scrollTo(p, '[data-sync=logout]'); await p.click('[data-sync=logout]'); await p.waitForTimeout(800);
    const n0 = calls.length; await p.evaluate(() => { S.xp += 1; save() }); await p.waitForTimeout(1500);
    ok('logout: local data kept', (await S(p)).xp === 451);
    ok('logout: no more sync calls', calls.length === n0);
    ok('logout: back to login row', (await p.locator('[data-sync=login]').count()) === 1);
    ok('configured flow: 0 console errors', errs.length === 0, errs.join(' | '));
    await ctx.close(); }

  // 8) ผู้เยี่ยมชมหน้าแรก (ไม่มีข้อมูลเลย) ทั้งสองแบบ: ต้องไม่มี error
  for (const cfg of [false, true]) { const { ctx } = await ctxFor(b, { configured: cfg }); const { p, errs } = await open(ctx, null);
    await p.screenshot({ path: OUT + '5-firstopen-' + (cfg ? 'configured' : 'unconfigured') + '.png' });
    ok('first open (' + (cfg ? 'configured' : 'unconfigured') + '): 0 console errors', errs.length === 0, errs.join(' | ')); await ctx.close(); }

  await b.close(); console.log('\n' + results.filter(x=>x.startsWith('PASS')).length + '/' + results.length + ' passed');
})().catch(e => { console.error(e); process.exit(1) });
