/* ใช้ LIFF SDK จริง + LIFF ID จริง โดยเสิร์ฟไฟล์ในเครื่องแทนเว็บจริง (map origin songyisong88.github.io → ไฟล์ใน branch นี้)
   ทดสอบถึงหน้าล็อกอินของ LINE เท่านั้น (ไม่กรอกรหัสผ่าน) · รัน: NODE_PATH=<playwright-core> node sync/test/real-liff.cjs [outDir] */
const { chromium } = require('playwright-core'); const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..'), SITE = 'https://songyisong88.github.io/teepuan-games/chinese-class-web/';
const OUT = process.argv[2] || '/tmp/lsync-shots/'; fs.mkdirSync(OUT, { recursive: true });
const TYPES = { js: 'application/javascript', css: 'text/css', html: 'text/html', json: 'application/json', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', webmanifest: 'application/manifest+json', woff2: 'font/woff2', mp3: 'audio/mpeg' };
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'th-TH', serviceWorkers: 'block' });
  await ctx.route(SITE + '**', r => { const u = new URL(r.request().url()); let f = decodeURIComponent(u.pathname.replace('/teepuan-games/chinese-class-web/', '')) || 'index.html';
    const fp = path.join(ROOT, f); if (!fp.startsWith(ROOT) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ status: 200, contentType: TYPES[path.extname(fp).slice(1)] || 'application/octet-stream', body: fs.readFileSync(fp) }) });
  const p = await ctx.newPage(), errs = [], nav = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()) });
  p.on('framenavigated', f => { if (f === p.mainFrame()) nav.push(f.url()) }); p.on('dialog', d => { console.log('dialog:', d.message().slice(0, 120).replace(/\n/g, ' / ')); d.accept() });
  await p.addInitScript(() => { if (!localStorage.getItem('lama-cn-web-demo-v2')) localStorage.setItem('lama-cn-web-demo-v2', JSON.stringify({ seenWelcome: true, seenOnboard: true, lvPicked: true, xp: 40, parts: ['1a'] })) });
  await p.goto(SITE); await p.waitForTimeout(2000);
  console.log('enabled:', await p.evaluate(() => LamaSync.enabled), '| errors before login:', errs.length, errs.join(' | '));
  await p.click('#tabbar [data-tab=me]'); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('[data-sync=login]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.click('[data-sync=login]');
  await p.waitForURL(/access\.line\.me/, { timeout: 20000 }).catch(e => console.log('no redirect:', e.message));
  await p.waitForTimeout(3000);
  const u = new URL(p.url()); console.log('now at:', u.origin + u.pathname);
  const lu = new URL(p.url()); const ru = lu.searchParams.get('returnUri'); const a = ru ? 'https://access.line.me' + ru : p.url(); const q = new URL(a).searchParams;
  console.log('authorize client_id:', q.get('client_id'));
  console.log('authorize redirect_uri:', q.get('redirect_uri'), '| scope:', q.get('scope'), '| bot_prompt:', q.get('bot_prompt'));
  console.log('nav chain:', nav.map(x => { const z = new URL(x); return z.host + z.pathname }).join(' → '));
  console.log('page title:', await p.title(), '| errors total:', errs.length);
  await p.screenshot({ path: OUT + '6-real-line-login-page.png' }); await b.close();
})().catch(e => { console.error(e); process.exit(1) });
