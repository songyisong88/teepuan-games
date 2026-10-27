'use strict';
/* ห้องเรียนภาษาจีน v2 — ตัวอย่างทดลอง (จำลองทั้งหมดในเครื่อง ไม่มีเซิร์ฟเวอร์ ไม่มีการชำระเงิน)
   รูปมาสคอตทุกจุดใช้ไฟล์เดียว: assets/mascot.png (เปลี่ยนไฟล์นี้ไฟล์เดียวได้เลย) */
const MASCOT = 'assets/mascot.png';
const BOT = 'ห้องเรียนภาษาจีน';

/* ---------- เนื้อหา: บทเรียนวันที่ 1 (HSK 1 · คำทักทาย) ---------- */
const LESSONS = [
  {id:1, zh:'你好', py:'nǐ hǎo', th:'สวัสดี', thq:'สวัสดี', sp:['nǐ','hǎo'],
   ex:'老师，你好！', exp:'Lǎoshī, nǐ hǎo!', exs:['Lǎo','shī,','nǐ','hǎo!'], ext:'สวัสดีค่ะ/ครับ คุณครู',
   words:[['老师','lǎoshī'],['你好','nǐ hǎo']],
   tip:'พูดจริง 你好 เสียง 3 สองตัวติดกัน ตัวแรกจะอ่านเป็นเสียง 2 → “ní hǎo”'},
  {id:2, zh:'谢谢', py:'xièxie', th:'ขอบคุณ', thq:'ขอบคุณ', sp:['xiè','xie'],
   ex:'谢谢你的茶。', exp:'Xièxie nǐ de chá.', exs:['Xiè','xie','nǐ','de','chá.'], ext:'ขอบคุณสำหรับชานะ',
   words:[['谢谢','xièxie'],['你','nǐ'],['的','de'],['茶','chá']],
   tip:'พยางค์หลัง xie ออกเสียงเบาและสั้น (เสียงเบา)'},
  {id:3, zh:'再见', py:'zàijiàn', th:'ลาก่อน / แล้วเจอกัน', thq:'ลาก่อน', sp:['zài','jiàn'],
   ex:'明天见，再见！', exp:'Míngtiān jiàn, zàijiàn!', exs:['Míng','tiān','jiàn,','zài','jiàn!'], ext:'เจอกันพรุ่งนี้ ลาก่อนนะ',
   words:[['明天','míngtiān'],['见','jiàn'],['再见','zàijiàn']],
   tip:'再 = อีกครั้ง, 见 = พบ รวมกันคือ “พบกันอีก”'},
  {id:4, zh:'对不起', py:'duìbuqǐ', th:'ขอโทษ', thq:'ขอโทษ', sp:['duì','bu','qǐ'],
   ex:'对不起，我不知道。', exp:'Duìbuqǐ, wǒ bù zhīdào.', exs:['Duì','bu','qǐ,','wǒ','bù','zhī','dào.'], ext:'ขอโทษ ฉันไม่รู้',
   words:[['对不起','duìbuqǐ'],['我','wǒ'],['不','bù'],['知道','zhīdào']],
   tip:'พยางค์กลาง bu ออกเสียงเบา ส่วนตัวท้าย qǐ ลงแล้วขึ้น'},
  {id:5, zh:'没关系', py:'méi guānxi', th:'ไม่เป็นไร', thq:'ไม่เป็นไร', sp:['méi','guān','xi'],
   ex:'没关系，明天再来。', exp:'Méi guānxi, míngtiān zài lái.', exs:['Méi','guān','xi,','míng','tiān','zài','lái.'], ext:'ไม่เป็นไร พรุ่งนี้มาใหม่นะ',
   words:[['没关系','méi guānxi'],['明天','míngtiān'],['再','zài'],['来','lái']],
   tip:'没 = ไม่มี, 关系 = ความเกี่ยวข้อง รวมกันคือ “ไม่เป็นไร” (ตอบเวลาคนขอโทษ)'}
];
const EXTRA = [ /* คำพื้นฐาน HSK 1 เพิ่มสำหรับแบบทดสอบระดับ */
  {zh:'我', py:'wǒ', th:'ฉัน', thq:'ฉัน'}, {zh:'水', py:'shuǐ', th:'น้ำ', thq:'น้ำ'},
  {zh:'什么', py:'shénme', th:'อะไร', thq:'อะไร'}, {zh:'明天', py:'míngtiān', th:'พรุ่งนี้', thq:'พรุ่งนี้'},
  {zh:'老师', py:'lǎoshī', th:'ครู', thq:'ครู'}, {zh:'朋友', py:'péngyou', th:'เพื่อน', thq:'เพื่อน'},
  {zh:'学习', py:'xuéxí', th:'เรียน', thq:'เรียน'}, {zh:'喜欢', py:'xǐhuan', th:'ชอบ', thq:'ชอบ'},
  {zh:'吃', py:'chī', th:'กิน', thq:'กิน'}
];
const POOL_ALL = LESSONS.concat(EXTRA);

/* เพื่อนจำลอง */
const FRIENDS = [
  {n:'พี่ต้น', e:'🧑', bg:'#cfe8ff', xp:420, streak:12, lv:'HSK 1 กลาง'},
  {n:'น้องมะลิ', e:'👧', bg:'#ffd6e0', xp:350, streak:5, lv:'HSK 1 ต้น'},
  {n:'แพรว', e:'👩', bg:'#e6dcff', xp:280, streak:3, lv:'HSK 1 ต้น'},
  {n:'โอ๊ต', e:'🧒', bg:'#d8f3e0', xp:170, streak:1, lv:'เริ่มต้น'},
  {n:'ฟ้า', e:'👩‍🦰', bg:'#fff0c2', xp:90, streak:0, lv:'เริ่มต้น'}
];
const GROUPS = [{n:'ห้องจีนมือใหม่', e:'🏫', cnt:12}, {n:'ทีมติวสอบ HSK 1', e:'📚', cnt:8}];
const JOINERS = ['เจ', 'บีม', 'นุ่น', 'กาย', 'ใบเตย', 'ปลื้ม'];

/* ---------- state (localStorage) ---------- */
const KEY = 'panda-chinese-demo-v2';
const rndCode = () => 'CN' + Array.from({length: 4}, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
const defaults = {xp:0, streak:0, lastDay:null, learned:[], days:[], shift:0, quizzes:0, speak:0, seen:false, level:null,
  tDay:null, tUsed:0, code:null, invited:[], given:0, tickets:0, buddy:null, bDone:{}, push:47, pushOn:true, wins:0, reports:0};
let S;
try { S = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = Object.assign({}, defaults); }
if (!S.code) S.code = rndCode();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5) + (S.shift || 0);
const curStreak = () => (S.lastDay !== null && S.lastDay >= today() - 1) ? S.streak : 0;

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const chat = $('#chat');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const nowT = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
function toast(t) { const e = $('#toast'); e.textContent = t; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => e.hidden = true, 2400); }
function scrollDown() { setTimeout(() => {
  const rows = chat.querySelectorAll('.row:not(.me)'); let r = null;
  for (let i = rows.length - 1; i >= 0; i--) if (!rows[i].querySelector('.typing')) { r = rows[i]; break; }
  const bottom = chat.scrollHeight - chat.clientHeight;
  if (r) { const top = chat.scrollTop + r.getBoundingClientRect().top - chat.getBoundingClientRect().top - 8; chat.scrollTop = (chat.scrollHeight - top > chat.clientHeight) ? top : bottom; }
  else chat.scrollTop = bottom;
}, 30); }

/* วรรณยุกต์ → สี (ใช้ในการ์ดบทเรียน) */
const TONE_COL = {1:'#e0463c', 2:'#e08a00', 3:'#1f9d55', 4:'#2f6fd8', 0:'#8a847c'};
function toneOf(s) {
  if (/[āēīōūǖ]/i.test(s)) return 1; if (/[áéíóúǘ]/i.test(s)) return 2;
  if (/[ǎěǐǒǔǚ]/i.test(s)) return 3; if (/[àèìòùǜ]/i.test(s)) return 4; return 0;
}
const pyColor = syl => syl.map(s => `<span class="tn" style="color:${TONE_COL[toneOf(s)]}">${s}</span>`).join('');
const legend = () => `<div class="tlegend"><span style="color:${TONE_COL[1]}">ˉ เสียง 1</span><span style="color:${TONE_COL[2]}">ˊ เสียง 2</span><span style="color:${TONE_COL[3]}">ˇ เสียง 3</span><span style="color:${TONE_COL[4]}">ˋ เสียง 4</span><span style="color:${TONE_COL[0]}">เบา</span></div>`;
const realNote = (real, sim) => `<div class="realnote"><b>🟢 จริงใน LINE:</b> ${real}<br><b>🟡 ในเดโมนี้:</b> ${sim}</div>`;

/* เสียง: speechSynthesis zh-CN ถ้าเครื่องไม่รองรับจะเงียบไป ไม่แจ้ง error */
let zhVoice = null;
function pickVoice() { try { const v = speechSynthesis.getVoices(); zhVoice = v.find(x => /zh[-_]CN/i.test(x.lang)) || v.find(x => /^zh/i.test(x.lang)) || null; } catch (e) {} }
try { pickVoice(); speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) {}
function speak(text, btn) {
  try {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN'; u.rate = 0.8; if (zhVoice) u.voice = zhVoice;
    if (btn) { btn.classList.add('playing'); const off = () => btn.classList.remove('playing'); u.onend = off; u.onerror = off; setTimeout(off, 2500); }
    speechSynthesis.speak(u);
  } catch (e) {}
}

/* HUD + เอฟเฟกต์ */
const level = () => Math.floor(S.xp / 100) + 1;
function hud(bump) {
  $('#hudStars').textContent = '⚡ ' + S.xp; $('#hudStreak').textContent = '🔥 ' + curStreak();
  if (bump) { const e = $(bump === 'streak' ? '#hudStreak' : '#hudStars'); e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); }
}
function addXp(n, fromEl) {
  S.xp += n; save();
  const app = $('#app'), ar = app.getBoundingClientRect(), tr = $('#hudStars').getBoundingClientRect();
  const sr = fromEl ? fromEl.getBoundingClientRect() : {left: ar.left + ar.width / 2, top: ar.top + ar.height / 2, width: 0, height: 0};
  for (let i = 0; i < 3; i++) {
    const f = document.createElement('div'); f.className = 'flystar'; f.textContent = '⚡';
    f.style.left = (sr.left - ar.left + sr.width / 2 - 13 + i * 10) + 'px'; f.style.top = (sr.top - ar.top + sr.height / 2 - 13) + 'px';
    app.appendChild(f);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      f.style.transform = `translate(${tr.left - ar.left - parseFloat(f.style.left) + 8}px,${tr.top - ar.top - parseFloat(f.style.top) + 2}px) scale(.6)`; f.style.opacity = '.4';
    }));
    setTimeout(() => f.remove(), 800);
  }
  setTimeout(() => hud('stars'), 650);
}
const fx = $('#fx'), fctx = fx.getContext('2d'); let parts = [], fxOn = false;
function confetti(n = 60, ox, oy) {
  const r = fx.getBoundingClientRect(); fx.width = r.width; fx.height = r.height;
  const cols = ['#06c755', '#ffb703', '#ff6b6b', '#4dabf7', '#b197fc', '#ff9f1c'];
  for (let i = 0; i < n; i++) parts.push({x: ox ?? r.width / 2, y: oy ?? r.height * .35, vx: (Math.random() - .5) * 11, vy: -Math.random() * 11 - 3, g: .32, s: rnd(5, 10), c: cols[rnd(0, cols.length - 1)], r: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 90 + rnd(0, 40)});
  if (!fxOn) { fxOn = true; requestAnimationFrame(tick); }
}
function tick() {
  fctx.clearRect(0, 0, fx.width, fx.height);
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life--; fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.r); fctx.globalAlpha = Math.min(1, p.life / 25); fctx.fillStyle = p.c; fctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); fctx.restore(); }
  if (parts.length) requestAnimationFrame(tick); else { fxOn = false; fctx.clearRect(0, 0, fx.width, fx.height); }
}

/* ---------- chat builders ---------- */
function row(inner, cls = '') { const d = document.createElement('div'); d.className = 'row ' + cls; d.innerHTML = inner; chat.appendChild(d); scrollDown(); return d; }
function meSay(t, html) { return row(`<div class="bwrap"><div class="meta">${nowT()}</div><div class="bubble">${html || esc(t)}</div></div>`, 'me'); }
async function typing(ms = 600) { const r = row(`<img class="av" src="${MASCOT}" alt=""><div class="col"><div class="bubble typing"><i></i><i></i><i></i></div></div>`); await sleep(ms); r.remove(); }
async function botSay(html, ms = 550, demoTag) {
  if (ms) await typing(ms);
  return row(`<img class="av" src="${MASCOT}" alt=""><div class="col"><div class="who">${BOT}</div><div class="bwrap"><div class="bubble">${demoTag ? '<span class="demo-tag">' + demoTag + '</span><br>' : ''}${html}</div><div class="meta">${nowT()}</div></div></div>`);
}
async function botCard(html, ms = 500) {
  if (ms) await typing(ms);
  return row(`<img class="av" src="${MASCOT}" alt=""><div class="col" style="max-width:calc(100% - 44px)">${html}</div>`);
}
function friendSay(f, html) { return row(`<span class="av2"><span class="ph" style="background:${f.bg}">${f.e}</span></span><div class="col"><div class="who">${f.n} <span class="demo-tag">จำลอง</span></div><div class="bwrap"><div class="bubble">${html}</div><div class="meta">${nowT()}</div></div></div>`); }
function sticker(small) { return row(`<img class="av" src="${MASCOT}" alt=""><div class="col"><img class="sticker${small ? ' small' : ''}" src="${MASCOT}" alt=""></div>`); }
function chips(list) {
  const d = document.createElement('div'); d.className = 'chips';
  d.innerHTML = list.map(c => `<button class="chip" data-act="${c.act}" ${c.q ? `data-q="${esc(c.q)}"` : ''}>${c.t}</button>`).join('');
  chat.appendChild(d); scrollDown(); return d;
}
let busy = false;
async function guard(fn) { if (busy) return; busy = true; try { await fn(); } finally { busy = false; } }

/* ---------- ชั้นหน้าจอ (sheet) แบบซ้อนกันได้ ---------- */
const SH = [];
function sheetShow(keep) {
  const d = SH[SH.length - 1]; if (!d) return;
  $('#sheetTitle').textContent = d.title; const b = $('#sheetBody');
  b.className = 'sheet-body' + (d.flush ? ' flush' : ''); b.innerHTML = d.render();
  $('#sheet').hidden = false; $('#sheetClose').textContent = SH.length > 1 ? '‹' : '✕';
  if (d.after) d.after(b); b.scrollTop = keep || 0;
}
const sheetPush = d => { SH.push(d); sheetShow(); };
const sheetRefresh = () => sheetShow($('#sheetBody').scrollTop);
function sheetBack() { if (SH.length > 1) { SH.pop(); sheetShow(); } else sheetCloseAll(); }
function sheetCloseAll() { SH.length = 0; $('#sheet').hidden = true; }

/* ---------- ตัวเล่นชุดคำถาม (ใช้ซ้ำ: ทดสอบระดับ / ควิซ / ท้าเพื่อน / ควิซกลุ่ม) ---------- */
const RUN = {}; let runSeq = 0;
function makeQ(w, type, pool) {
  const opts = shuffle([w, ...shuffle(pool.filter(x => x.zh !== w.zh)).slice(0, 3)]);
  return {w, type, opts, ans: opts.indexOf(w)};
}
const TYPES4 = ['zh2th', 'th2zh', 'py2zh', 'audio'];
function makeSet(n, pool, types) { const ws = shuffle(pool).slice(0, n), ts = shuffle(types || TYPES4.concat(TYPES4)); return ws.map((w, i) => makeQ(w, ts[i % ts.length], pool)); }
function qHtml(run) {
  const q = run.qs[run.i], l = q.w, n = run.i + 1, tot = run.qs.length;
  const dots = run.qs.map((_, i) => `<i class="${i < run.i ? (run.res[i] ? 'on' : 'bad') : (i === run.i ? 'on' : '')}"></i>`).join('');
  let prompt, main;
  if (q.type === 'zh2th') { prompt = 'คำนี้แปลว่าอะไร?'; main = `<div class="qmain zh">${l.zh}</div><div class="qpy py">${l.py}</div>`; }
  else if (q.type === 'th2zh') { prompt = 'ข้อไหนคือภาษาจีนของคำนี้?'; main = `<div class="qmain thai">${l.thq}</div>`; }
  else if (q.type === 'py2zh') { prompt = 'พินอินนี้คือคำไหน?'; main = `<div class="qmain py" style="font-size:34px;color:var(--org)">${l.py}</div>`; }
  else { prompt = 'ฟังเสียงแล้วเลือกคำที่ได้ยิน 🎧'; main = `<button class="audio" data-say="${l.zh}" style="margin:10px 0"><span>🔊</span><span class="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span>กดฟัง</span></button><div class="qpy" style="font-size:11.5px;color:var(--sub);font-weight:400">ถ้าไม่มีเสียง ดูคำใบ้พินอิน: ${l.py}</div>`; }
  const optHtml = q.opts.map((o, k) => {
    const body = q.type === 'zh2th' ? esc(o.thq) : `<span class="zh">${o.zh}</span>` + (q.type === 'th2zh' ? `<span class="py">${o.py}</span>` : '');
    return `<button class="opt" data-o="${k}">${body}</button>`;
  }).join('');
  const hint = run.cfg.hintable ? `<button class="hintbtn" data-hint="1">🙋 ขอเพื่อนช่วยใบ้ (จำลอง)</button>` : '';
  return `<div class="qcard" data-run="${run.id}" data-q="${run.i}"><div class="qhead"><span>${run.cfg.icon || '⭐'} ข้อ ${n}/${tot}</span><span class="dots">${dots}</span></div><div class="qbody"><div class="qprompt">${prompt}</div>${main}<div class="opts">${optHtml}</div>${hint}</div></div>`;
}
function startRun(cfg) {
  const run = {id: ++runSeq, qs: cfg.qs, i: 0, ok: 0, res: [], locked: false, cfg, env: cfg.env || CHAT_ENV};
  RUN[run.id] = run; return askQ(run).then(() => run);
}
async function askQ(run) {
  const q = run.qs[run.i];
  run.locked = false; run.card = await run.env.card(qHtml(run));
  if (q.type === 'audio') setTimeout(() => speak(q.w.zh), 350);
  if (run.cfg.onAsk) run.cfg.onAsk(run);
}
async function answerQ(btn) {
  const card = btn.closest('.qcard'); const run = card && RUN[card.dataset.run];
  if (!run || run.locked || run.i !== +card.dataset.q) return;
  run.locked = true;
  const q = run.qs[run.i], l = q.w, ok = +btn.dataset.o === q.ans;
  const box = btn.closest('.opts'); box.classList.add('locked');
  btn.classList.add(ok ? 'ok' : 'no');
  if (!ok) { const c = box.querySelector(`[data-o="${q.ans}"]`); c && c.classList.add('ok'); }
  run.res[run.i] = ok;
  if (ok) { run.ok++; if (!run.cfg.noXp) { addXp(10, btn); } const r = btn.getBoundingClientRect(), a = $('#app').getBoundingClientRect(); confetti(24, r.left - a.left + r.width / 2, r.top - a.top); }
  speak(l.zh);
  await sleep(450);
  const good = ['ถูกต้อง! เก่งมาก 🎉', 'เยี่ยมเลย! 🌟', 'ใช่เลย! 👏', 'แม่นมาก! ✨'];
  const info = `<span class="zh"><b>${l.zh}</b></span> ${pyColor(l.py.split(' '))} = ${l.th}`;
  await run.env.say(ok ? `${good[rnd(0, 3)]}${run.cfg.noXp ? '' : ' +10 XP'}<br>${info}` : `ยังไม่ใช่นะ ไม่เป็นไร 💪<br>คำตอบคือ ${info}`, 300);
  if (run.cfg.afterAnswer) await run.cfg.afterAnswer(run, ok);
  run.i++;
  if (run.i < run.qs.length) { await sleep(250); await askQ(run); } else await run.cfg.onFinish(run);
}
/* ขอเพื่อนช่วยใบ้: เพื่อนจำลองตัดตัวเลือกผิดให้ 1 ข้อ */
async function askHint(btn) {
  const card = btn.closest('.qcard'); const run = card && RUN[card.dataset.run];
  if (!run || run.locked || run.i !== +card.dataset.q || btn.disabled) return;
  btn.disabled = true; btn.textContent = '📨 ส่งการ์ดขอใบ้ให้ พี่ต้น แล้ว…';
  const f = FRIENDS[0], q = run.qs[run.i];
  meSay('', `🙋 <b>ช่วยใบ้หน่อย!</b><br><span class="hmini">ส่งการ์ดข้อนี้ให้ ${f.n}</span>`);
  await sleep(1300);
  if (run.locked) return;
  const wrong = q.opts.map((o, k) => k).filter(k => k !== q.ans && !card.querySelector(`[data-o="${k}"]`).classList.contains('cut'));
  const k = wrong[rnd(0, wrong.length - 1)], o = q.opts[k];
  await friendSay(f, `ข้อนี้ไม่ใช่ “${q.type === 'zh2th' ? o.thq : o.zh}” แน่ๆ ลองตัดออกดูนะ 😉`);
  const el = card.querySelector(`[data-o="${k}"]`); if (el) { el.classList.add('cut'); el.disabled = true; }
  btn.textContent = '✓ เพื่อนช่วยใบ้แล้ว';
}

/* ---------- สตรีค / บัดดี้ ---------- */
function buddyDoneToday() { const t = today(); if (S.bDone[t] === undefined) S.bDone[t] = (t % 2 === 0); return S.bDone[t]; }
function checkBuddy() {
  if (!S.buddy) return false; const t = today();
  if (S.lastDay === t && buddyDoneToday() && S.buddy.both !== t) { S.buddy.streak = (S.buddy.both === t - 1) ? S.buddy.streak + 1 : 1; S.buddy.both = t; save(); return true; }
  return false;
}
function touchStreak() {
  const t = today(); const first = S.lastDay !== t;
  if (first) { S.streak = (S.lastDay === t - 1) ? S.streak + 1 : 1; S.lastDay = t; if (!S.days.includes(t)) S.days.push(t); }
  save(); const bd = checkBuddy(); hud(first ? 'streak' : 'stars'); return {first, bd};
}
function celebrate() {
  return new Promise(res => {
    const c = $('#celebrate'); const n = curStreak();
    c.innerHTML = `<img src="${MASCOT}" alt=""><div class="flame">🔥</div><div class="sn">${n}</div><div class="ct">${n === 1 ? 'วันแรกของสตรีค!' : 'วันเรียนต่อเนื่อง!'}</div><div class="cs">กลับมาเรียนทุกวัน ไฟจะยิ่งลุกโชน</div><button class="btn" style="max-width:220px" id="celOk">เยี่ยม! ไปต่อ</button>`;
    c.hidden = false; confetti(140); setTimeout(() => confetti(80), 450); setTimeout(() => confetti(80), 900);
    $('#celOk').onclick = () => { c.hidden = true; res(); };
  });
}
function scoreCard({title, score, total, xp, line, chal}) {
  const stars = '⭐'.repeat(Math.max(1, Math.round(score / total * 3)));
  return `<div class="qcard scorecard"><div class="sc-top"><img src="${MASCOT}" alt=""><div><div class="sc-t">${title}</div><div class="sc-s">${score}<small>/${total}</small></div></div><div class="sc-st">${stars}</div></div>
    <div class="qbody" style="padding-top:8px"><div class="sc-tags"><span>⚡ +${xp} XP</span><span>🔥 ${curStreak()} วัน</span><span>ระดับ ${level()}</span></div>${line ? `<div class="qprompt" style="margin-top:6px">${line}</div>` : ''}
    <button class="btn" data-share="บัตรคะแนน ${title} ${score}/${total}" data-sharekind="score" data-score="${score}/${total}">📤 ส่งบัตรคะแนนให้เพื่อน / กลุ่ม</button>
    ${chal ? '' : `<button class="btn ghost" data-act="challengeset">⚔️ ท้าเพื่อนเล่นชุดนี้</button>`}
    <div class="demo-tag" style="margin-top:8px">ตัวอย่างทดลอง · ไม่ใช่ข้อสอบ HSK ทางการ</div></div></div>`;
}

/* ---------- ต้อนรับ + ทดสอบระดับ 5 ข้อ ---------- */
async function welcome() {
  const first = !S.seen; S.seen = true; save();
  const day = document.createElement('div'); day.className = 'day'; day.textContent = 'วันนี้'; chat.appendChild(day);
  const sys = document.createElement('div'); sys.className = 'sys'; sys.textContent = 'ตัวอย่างทดลอง ยังไม่ใช่ระบบจริง'; chat.appendChild(sys);
  await sleep(250); sticker();
  await botSay(first ? 'สวัสดี! ยินดีต้อนรับสู่ <b>ห้องเรียนภาษาจีน</b> 🎓<br>เรียนจีนวันละนิดผ่านแชต LINE ได้ทั้งคนเดียวและชวนเพื่อนมาแข่ง สนุกๆ ไม่เครียด' : 'ยินดีต้อนรับกลับมา! 🎓 วันนี้เรียนต่อกันไหม?', 700);
  if (first && !S.level) {
    await botSay('ก่อนเริ่ม อยากรู้ไหมว่าควรเริ่มตรงไหน? ลอง <b>ทดสอบระดับ 5 ข้อ</b> (ประมาณ 1 นาที)<br><span style="font-size:12px;color:var(--sub)">ไม่ใช่ข้อสอบ HSK ทางการ แค่ช่วยแนะนำจุดเริ่มต้น</span>', 450);
    chips([{t: '🧭 ทดสอบระดับ 5 ข้อ', act: 'leveltest'}, {t: '📖 ข้ามไปเรียนเลย', act: 'lesson'}]);
  } else chips([{t: '📖 บทเรียนวันนี้', act: 'lesson'}, {t: '📝 ควิซ 3 ข้อ', act: 'quiz'}, {t: '⚔️ ท้าเพื่อน', act: 'challenge'}]);
}
async function doLevelTest() {
  meSay('ทดสอบระดับ 5 ข้อ');
  await botSay('เริ่มเลย! 5 ข้อ ตอบตามที่รู้ ไม่ต้องกลัวผิด 🙂', 400);
  await startRun({qs: makeSet(5, POOL_ALL, ['zh2th', 'th2zh', 'py2zh', 'zh2th', 'th2zh']), icon: '🧭', noXp: true, onFinish: levelFinish});
}
async function levelFinish(run) {
  const ok = run.ok; S.level = ok >= 4 ? 'HSK 1 กลาง' : ok >= 2 ? 'HSK 1 ต้น' : 'เริ่มต้นจากศูนย์'; addXp(10); save();
  await CHAT_ENV.card(`<div class="qcard"><div class="qhead"><span>🧭 ผลทดสอบระดับ</span><span>${ok}/5</span></div><div class="qbody"><div class="qmain" style="font-size:26px;font-family:Kanit,sans-serif;color:var(--ink)">ระดับแนะนำ: ${S.level}</div><div class="qprompt">ตอบถูก ${ok} จาก 5 ข้อ · โบนัส +10 XP</div><div class="demo-tag" style="margin-top:8px">ผลประเมินคร่าวๆ ไม่ใช่ข้อสอบ HSK ทางการ</div></div></div>`, 450);
  await botSay(ok >= 4 ? 'เก่งมาก! เริ่มจากบทเรียนวันที่ 1 แล้วไปควิซกันเลย 🚀' : 'ไม่มีปัญหา! เราเริ่มจากคำทักทายพื้นฐานก่อน ค่อยๆ ไปด้วยกันนะ 🌱', 400);
  chips([{t: '📖 เริ่มบทเรียนวันที่ 1', act: 'lesson'}, {t: '📝 ควิซ 3 ข้อ', act: 'quiz'}]);
}

/* ---------- บทเรียนวันนี้ ---------- */
function lessonCard(l, i) {
  const learned = S.learned.includes(l.id);
  return `<div class="lcard" data-id="${l.id}">
    <div class="lc-top"><span class="lc-no">บทที่ ${i + 1}/5</span><span class="lc-flower">🌸</span>
      <div class="hz zh ${l.zh.length > 2 ? 'long' : ''}">${l.zh}</div><div class="py lpy">${pyColor(l.sp)}</div>
      <button class="audio" data-say="${l.zh}"><span>🔊</span><span class="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span>ฟังเสียง</span></button></div>
    <div class="lc-body"><div class="th">${l.th}</div>${legend()}
      <div class="exbox"><div class="exh">ประโยคตัวอย่าง</div><div class="exz"><span class="zh">${l.ex}</span><button class="mini" data-say="${l.ex}" aria-label="ฟังประโยค">🔊</button></div><div class="exp py">${pyColor(l.exs)}</div><div class="ext">${l.ext}</div></div>
      <div class="tip">💡 ${l.tip}</div>
      <button class="btn ${learned ? 'done' : ''}" data-learn="${l.id}">${learned ? '✓ จำได้แล้ว' : 'จำได้แล้ว ✓ (+5 XP)'}</button>
      <div class="lc-acts"><button class="btn ghost sm" data-share="บัตรคำ ${l.zh}" data-sharekind="lesson" data-lid="${l.id}">📤 ส่งต่อบัตรคำ</button><button class="btn gray sm" data-sa="report:${l.zh}">⚑ แจ้งข้อผิด</button></div></div></div>`;
}
async function doLesson() {
  meSay('บทเรียนวันนี้');
  await botSay('มาเรียน <b>วันที่ 1: คำทักทาย</b> กัน! เลื่อนการ์ดไปทางขวาได้เลย 👉<br><span style="font-size:12px;color:var(--sub)">ระดับ HSK 1 · ตัวอย่างประโยคเขียนใหม่เอง · ควรให้เจ้าของภาษาตรวจก่อนใช้จริง</span>', 500);
  await botCard(`<div class="car-wrap"><div class="car">${LESSONS.map(lessonCard).join('')}</div></div>`, 600);
  chips([{t: '📝 ควิซ 3 ข้อ', act: 'quiz'}, {t: '🎤 ฝึกพูด', act: 'speak'}, {t: '🤖 ถามครู AI', act: 'tutor'}]);
}

/* ---------- ควิซ 3 ข้อ ---------- */
const CHAT_ENV = {say: (h, ms) => botSay(h, ms), card: (h, ms) => botCard(h, ms)};
let lastSet = null;
async function doQuiz() {
  meSay('ควิซ 3 ข้อ');
  lastSet = makeSet(3, LESSONS);
  await botSay('ควิซประจำวัน 3 ข้อ 🎯 ตอบถูกได้ <b>+10 XP</b> ต่อข้อ ลองให้เพื่อนช่วยใบ้ได้ด้วย', 450);
  await startRun({qs: lastSet, hintable: true, onFinish: quizFinish});
}
async function quizFinish(run) {
  const ok = run.ok; S.quizzes++; const bonus = ok === 3 ? 10 : 5; addXp(bonus);
  const {first, bd} = touchStreak();
  await CHAT_ENV.card(scoreCard({title: 'ควิซประจำวัน', score: ok, total: 3, xp: ok * 10 + bonus, line: ok === 3 ? 'เต็ม! เยี่ยมสุดๆ' : 'ลองอีกรอบ รับ XP เพิ่มได้'}), 450);
  if (bd) await botSay('🤝 วันนี้ทั้งคุณและบัดดี้เรียนแล้ว ไฟคู่ +1 วัน!', 300);
  if (first) { await sleep(400); await celebrate(); }
  chips([{t: '🔁 ควิซอีกรอบ', act: 'quiz'}, {t: '⚔️ ท้าเพื่อนเล่นชุดนี้', act: 'challengeset'}, {t: '🏆 อันดับ', act: 'rank'}]);
}

/* ---------- ท้าเพื่อน ---------- */
let chalFriend = null;
async function startChallenge(f, qs) {
  chalFriend = f; sheetCloseAll();
  meSay(`ท้า ${f.n}`);
  lastSet = qs || makeSet(3, LESSONS);
  await botSay(`ส่งคำท้าให้ <b>${f.n}</b> แล้ว ✉️ เพื่อนจะเล่น <b>ชุดคำถามเดียวกัน 3 ข้อ</b> ใครได้คะแนนมากกว่าชนะ! เล่นก่อนเลย 💪`, 500, 'ท้าเพื่อน — จำลอง (เพื่อนเป็นข้อมูลจำลอง)');
  await startRun({qs: lastSet, icon: '⚔️', hintable: false, onFinish: challengeFinish});
}
async function challengeFinish(run) {
  const f = chalFriend, me = run.ok; S.quizzes++; addXp(5);
  const {first, bd} = touchStreak();
  await botSay(`เล่นจบแล้ว! ได้ <b>${me}/3</b> กำลังรอ ${f.n} เล่นชุดเดียวกัน…`, 400);
  await typing(2200);
  const bias = f.xp > 250 ? 0.7 : 0.5, fs = Array.from({length: 3}, () => Math.random() < bias).filter(Boolean).length;
  const win = me > fs, draw = me === fs, gain = win ? 25 : draw ? 15 : 8; addXp(gain); if (win) S.wins++; save();
  confetti(win ? 90 : 20);
  await botCard(`<div class="qcard"><div class="qhead" style="background:${win ? 'linear-gradient(90deg,#d8f3e0,#fff4c9)' : draw ? '#eef' : '#fde6e3'}"><span>⚔️ ผลท้าเพื่อน</span><span>${win ? '🏆 คุณชนะ!' : draw ? '🤝 เสมอ' : '😅 แพ้นิดเดียว'}</span></div>
    <div class="qbody"><div class="vs"><div><div class="vs-n">คุณ</div><div class="vs-s">${me}</div></div><div class="vs-x">VS</div><div><div class="vs-n">${f.n}</div><div class="vs-s">${fs}</div></div></div>
    <div class="qprompt">รางวัล +${gain + 5} XP ${win ? '· ชนะสะสม ' + S.wins + ' ครั้ง' : '· สู้ใหม่ได้เสมอ!'}</div>
    <button class="btn" data-share="ผลท้าเพื่อน ${me}-${fs} กับ ${f.n}" data-sharekind="score" data-score="${me} VS ${fs}">📤 ส่งผลให้เพื่อน / กลุ่ม</button>
    <button class="btn ghost" data-sa="rematch">🔁 ขอแก้มือ</button>
    <div class="demo-tag" style="margin-top:8px">คะแนนเพื่อนเป็นการสุ่มจำลอง</div></div></div>`, 300);
  if (bd) await botSay('🤝 ไฟคู่กับบัดดี้ +1 วัน!', 250);
  if (first) { await sleep(300); await celebrate(); }
  chips([{t: '🔁 ท้าอีกรอบ', act: 'challenge'}, {t: '🏆 อันดับ', act: 'rank'}]);
}
function challengeHub() {
  sheetPush({title: 'ท้าเพื่อน', render: () => {
    const code = S.code, link = `line.me/R/ti/p/@ตัวอย่าง?ref=${code}`, left = S.invited.length - S.given * 2;
    const bud = S.buddy, bf = bud && FRIENDS.find(x => x.n === bud.n), bdone = buddyDoneToday(), mdone = S.lastDay === today();
    return `
    <div class="card"><h3>⚔️ ท้าเพื่อนเล่นชุดเดียวกัน</h3><div class="sub12">เลือกเพื่อน → ทั้งคู่เล่น 3 ข้อเหมือนกัน → ดูว่าใครชนะ</div>
      ${FRIENDS.map((f, i) => `<div class="lb"><div class="ph" style="background:${f.bg}">${f.e}</div><div class="nm">${f.n}<div class="sub11">${f.lv} · 🔥 ${f.streak} วัน</div></div><button class="chipbtn" data-sa="chal:${i}">ท้า</button></div>`).join('')}
      <button class="btn ghost" data-act="quiz" data-close="1">หรือเล่นคนเดียว: ควิซ 3 ข้อ</button></div>
    <div class="card"><h3>🤝 Buddy study — เรียนคู่ ไฟคู่</h3>
      ${!bud ? `<div class="sub12">เลือกบัดดี้ 1 คน ถ้าเรียนครบทั้งคู่ทุกวัน ไฟคู่จะต่อเนื่อง</div><div class="pickrow">${FRIENDS.slice(0, 4).map((f, i) => `<button class="chipbtn" data-sa="buddy:${i}">${f.e} ${f.n}</button>`).join('')}</div>`
      : `<div class="buddy"><div class="bcol"><div class="ph" style="background:#c8efd6">😀</div><div>คุณ</div><div class="${mdone ? 'bok' : 'bno'}">${mdone ? '✓ เรียนแล้ว' : 'ยังไม่เรียน'}</div></div><div class="bfire">🔥<b>${bud.streak}</b><small>ไฟคู่ (วัน)</small></div><div class="bcol"><div class="ph" style="background:${bf.bg}">${bf.e}</div><div>${bud.n}</div><div class="${bdone ? 'bok' : 'bno'}">${bdone ? '✓ เรียนแล้ว' : 'ยังไม่เรียน'}</div></div></div>
      ${!bdone ? `<button class="btn" data-sa="nudge">👋 สะกิดเตือน ${bud.n} ให้มาเรียน</button>` : ''}${!mdone ? `<button class="btn ghost" data-act="quiz" data-close="1">เรียนวันนี้ (ควิซ 3 ข้อ)</button>` : ''}
      <button class="btn gray sm" data-sa="buddyoff">เปลี่ยนบัดดี้</button>`}
      ${realNote('LINE ส่งข้อความเตือนเพื่อนได้ผ่านบอท (นับเป็นข้อความ push)', 'สถานะบัดดี้เป็นข้อมูลจำลอง')}</div>
    <div class="card"><h3>🎁 ชวนเพื่อน รับตั๋วกันไฟดับ</h3>
      <div class="sub12">ชวนเพื่อนครบทุก 2 คน ได้ 🎟 ตั๋วกันสตรีคขาด 1 ใบ (ใช้อัตโนมัติถ้าลืมเรียน 1 วัน)</div>
      <div class="invite"><div class="icode">${code}</div><div class="ilink">${link}</div></div>
      <div class="pickrow"><button class="chipbtn" data-sa="copy">📋 คัดลอกลิงก์</button><button class="chipbtn" data-share="คำเชิญเรียนจีน (โค้ด ${code})" data-sharekind="invite">📤 ส่งให้เพื่อน</button></div>
      <div class="inv-stat"><div><b>${S.invited.length}</b><small>เพื่อนที่เข้าร่วม</small></div><div><b>🎟 ${S.tickets}</b><small>ตั๋วกันไฟดับ</small></div><div><b>${left}/2</b><small>ถึงใบถัดไป</small></div></div>
      ${S.invited.length ? `<div class="sub11">เข้าร่วมแล้ว: ${S.invited.join(', ')}</div>` : ''}
      <button class="btn ghost" data-sa="join">🧪 จำลองเพื่อนกดลิงก์เข้าร่วม</button>
      ${realNote('LINE ใช้ลิงก์เพิ่มเพื่อน OA พร้อมรหัสอ้างอิง ให้บอทนับคนที่เข้ามาได้', 'ลิงก์เป็นตัวอย่าง กดไม่ได้จริง การนับเป็นปุ่มจำลอง')}</div>`;
  }});
}

/* ---------- อันดับ + ห้องกลุ่ม ---------- */
function rankSheet() {
  sheetPush({title: 'อันดับ', render: () => {
    const medal = ['🥇', '🥈', '🥉'];
    const all = FRIENDS.map(f => ({n: f.n, bg: f.bg, e: f.e, s: f.xp})).concat([{n: 'คุณ', bg: '#c8efd6', e: '😀', s: S.xp, me: 1}]).sort((a, b) => b.s - a.s);
    const rank = all.findIndex(x => x.me) + 1, wk = Math.min(7, S.days.filter(d => d > today() - 7).length);
    return `<div class="demo-tag" style="display:block;text-align:center;margin-bottom:8px">รายชื่อเพื่อนและคะแนนทั้งหมดเป็นข้อมูลจำลอง</div>
    <div class="card"><h3>🏆 อันดับสัปดาห์นี้ในหมู่เพื่อน <span class="sub11" style="font-weight:400">(นับจาก XP)</span></h3>
      ${all.map((x, i) => `<div class="lb ${x.me ? 'me' : ''}"><div class="rk">${medal[i] || i + 1}</div><div class="ph" style="background:${x.bg}">${x.e}</div><div class="nm">${esc(x.n)}</div><div class="sc">⚡ ${x.s}</div>${x.me ? '' : `<button class="chipbtn sm" data-sa="chal:${FRIENDS.findIndex(f => f.n === x.n)}">ท้า</button>`}</div>`).join('')}
      <div class="sub12" style="text-align:center;margin-top:8px">คุณอยู่อันดับที่ ${rank} จาก ${all.length} — ทำควิซเพื่อไต่อันดับ!</div>
      <button class="btn ghost" data-share="อันดับของฉัน ที่ ${rank} (⚡ ${S.xp} XP)" data-sharekind="score" data-score="อันดับ ${rank}">📤 ส่งอันดับให้เพื่อน</button></div>
    <div class="card"><h3>👥 ห้องเรียนกลุ่ม (LINE กลุ่ม + บอท)</h3><div class="sub12">เชิญบอทเข้ากลุ่ม แล้วพิมพ์คำสั่งเพื่อเล่นควิซพร้อมกัน เห็นอันดับสดๆ</div>
      ${GROUPS.map((g, i) => `<div class="lb"><div class="ph" style="background:#e9e0fa">${g.e}</div><div class="nm">${g.n}<div class="sub11">${g.cnt} คน</div></div><button class="chipbtn" data-sa="group:${i}">เปิดห้อง</button></div>`).join('')}</div>
    <div class="card"><h3>🎯 ภารกิจสัปดาห์นี้ <span style="float:right;font-weight:400;color:var(--green-d)">${wk}/7 วัน</span></h3><div class="bar"><i style="width:${Math.round(wk / 7 * 100)}%"></i></div><div class="sub12" style="margin-top:6px">เรียนให้ครบ 7 วันเพื่อรับเหรียญตราจำลอง 🏅</div></div>
    ${realNote('ตารางอันดับคำนวณจากข้อมูลผู้เรียนที่ยินยอมแสดงชื่อ เก็บในฐานข้อมูลของเรา', 'ข้อมูลทั้งหมดจำลอง ไม่มีฐานข้อมูล')}`;
  }});
}
const G = {root: null, run: null, mates: null, name: ''};
function gAppend(html, cls = '') { const d = document.createElement('div'); d.className = 'gmsg ' + cls; d.innerHTML = html; G.root.appendChild(d); G.root.scrollTop = G.root.scrollHeight; return d; }
const gBot = h => gAppend(`<img class="av" src="${MASCOT}" alt=""><div class="col"><div class="who">${BOT} <span class="demo-tag">บอท</span></div><div class="bubble">${h}</div></div>`);
const gMate = (f, h) => gAppend(`<span class="av2"><span class="ph" style="background:${f.bg}">${f.e}</span></span><div class="col"><div class="who">${f.n}</div><div class="bubble">${h}</div></div>`);
const gMe = h => gAppend(`<div class="bubble me">${h}</div>`, 'me');
const GROUP_ENV = {
  say: async (h) => { await sleep(300); gBot(h); },
  card: async (h) => { await sleep(300); return gAppend(`<img class="av" src="${MASCOT}" alt=""><div class="col">${h}</div>`); }
};
function groupSheet(i) {
  const g = GROUPS[i]; G.name = g.n;
  if (!G.root) {
    G.root = document.createElement('div'); G.root.id = 'gmsgs'; G.root.className = 'gmsgs';
    gAppend('<div class="gsys">บอท “ห้องเรียนภาษาจีน” เข้าร่วมกลุ่มแล้ว (จำลอง)</div>', 'sys');
    gMate(FRIENDS[1], 'ใครพร้อมแข่งควิซวันนี้บ้าง 😆');
    gMate(FRIENDS[0], 'พิมพ์ <b>/quiz</b> ให้บอทเริ่มเลย!');
    gBot('สวัสดีทุกคน! พิมพ์ <b>/quiz</b> เพื่อเริ่มควิซกลุ่ม 3 ข้อ แล้วดูอันดับสดๆ ได้เลย 🏁');
  }
  sheetPush({title: `${g.n} (${g.cnt})`, flush: true,
    render: () => `<div class="gwrap"><div class="gtop">คำสั่งในกลุ่ม: <b>/quiz</b> เริ่มควิซกลุ่ม · <span class="demo-tag">จำลอง</span></div><div id="gslot"></div>
      <div class="gchips"><button class="chip" data-sa="gcmd:/quiz">/quiz</button><button class="chip" data-sa="gcmd:ช่วยด้วย">ช่วยด้วย</button></div>
      <div class="ginput"><input id="gIn" type="text" placeholder="พิมพ์ข้อความในกลุ่ม… (ลอง /quiz)" autocomplete="off" enterkeyhint="send"><button class="icon-btn" id="gSend" data-sa="gsend" aria-label="ส่ง" style="color:var(--green)">➤</button></div></div>`,
    after: b => { $('#gslot').replaceWith(G.root); G.root.scrollTop = G.root.scrollHeight; const inp = $('#gIn'); inp.addEventListener('keydown', e => { if (e.key === 'Enter') gSend(); }); }});
}
function gSend(text) {
  const inp = $('#gIn'); const v = (text ?? inp.value).trim(); if (!v) return; if (inp && text === undefined) inp.value = '';
  gMe(esc(v));
  if (/^[\/!]?(quiz|ควิซ|เริ่มควิซ)/i.test(v)) { if (G.run && G.run.i < G.run.qs.length) { gBot('กำลังเล่นควิซอยู่ ตอบข้อปัจจุบันก่อนนะ 🙂'); return; } startGroupQuiz(); }
  else setTimeout(() => gBot(/ช่วย|help/i.test(v) ? 'พิมพ์ <b>/quiz</b> เพื่อเริ่มควิซกลุ่ม 3 ข้อ ตอบเร็วและถูกได้คะแนนมาก!' : 'ได้รับข้อความแล้ว 😊 พิมพ์ <b>/quiz</b> เพื่อเริ่มควิซกลุ่ม'), 700);
}
function rankHtml(scores, title) {
  const arr = scores.slice().sort((a, b) => b.s - a.s), mx = Math.max(3, ...arr.map(x => x.s));
  return `<div class="qcard"><div class="qhead"><span>📊 ${title}</span><span>สด</span></div><div class="qbody" style="padding:8px 12px">${arr.map((x, i) => `<div class="rrow ${x.me ? 'me' : ''}"><span class="rn">${i + 1}</span><span class="rnm">${x.e} ${esc(x.n)}</span><span class="rbar"><i style="width:${Math.round(x.s / mx * 100)}%"></i></span><b>${x.s}</b></div>`).join('')}</div></div>`;
}
async function startGroupQuiz() {
  G.mates = FRIENDS.slice(0, 4).map(f => ({n: f.n, e: f.e, s: 0}));
  const meS = {n: 'คุณ', e: '😀', s: 0, me: 1};
  await GROUP_ENV.say('🏁 เริ่มควิซกลุ่ม! 3 ข้อ ตอบถูกได้ 1 คะแนน เล่นพร้อมกันทุกคน');
  G.run = null;
  const qs = makeSet(3, LESSONS);
  G.run = await startRun({qs, env: GROUP_ENV, icon: '👥', noXp: true,
    onAsk: () => { FRIENDS.slice(0, 2).forEach((f, k) => setTimeout(() => gMate(f, 'ตอบแล้ว ✋'), 900 + k * 700)); },
    afterAnswer: async (run, ok) => {
      if (ok) meS.s++; G.mates.forEach(m => { if (Math.random() < 0.6) m.s++; });
      await sleep(200); gAppend(`<img class="av" src="${MASCOT}" alt=""><div class="col">${rankHtml(G.mates.concat([meS]), 'อันดับสดหลังข้อ ' + (run.i + 1))}</div>`);
    },
    onFinish: async (run) => {
      const all = G.mates.concat([meS]).sort((a, b) => b.s - a.s), rank = all.findIndex(x => x.me) + 1;
      addXp(run.ok * 5 + 5); touchStreak(); S.quizzes++; save();
      await GROUP_ENV.say(`🎉 จบควิซกลุ่ม! คุณได้ <b>${run.ok}/3</b> อยู่อันดับที่ <b>${rank}</b> (+${run.ok * 5 + 5} XP)`);
      gAppend(`<div class="gchips" style="padding:0 0 4px 42px"><button class="chip" data-share="ผลควิซกลุ่ม อันดับ ${rank}" data-sharekind="score" data-score="อันดับ ${rank} ในกลุ่ม">📤 แชร์ผล</button><button class="chip" data-sa="gcmd:/quiz">เล่นอีกรอบ</button></div>`);
      if (rank === 1) confetti(80);
    }});
}

/* ---------- ถามครู AI (จำลอง · โควตาฟรี 3/วัน) ---------- */
const ASK = ['เสียงวรรณยุกต์ต่างกันยังไง', '你好 กับ 您好 ต่างกันไหม', 'ตอบ 谢谢 ว่าอะไรดี', 'พินอินคืออะไร'];
function ans(id, extra) { const l = LESSONS.find(x => x.id === id); return `<span class="zh"><b>${l.zh}</b></span> ${pyColor(l.sp)} = ${l.th}<br>${extra}<br><span class="zh">${l.ex}</span><br>${pyColor(l.exs)}<br>${l.ext}<br>💡 ${l.tip}`; }
const KB = [
  [/วรรณยุกต์|เสียงสูง|เสียงต่ำ|tone|声调|เสียงเอก|เสียงโท/i, 'ภาษาจีนกลางมี <b>4 เสียง + เสียงเบา</b><br>ตัวอย่างพยางค์ <b>ma</b>:<br>• mā (เสียง 1 สูงเรียบ) 妈 แม่<br>• má (เสียง 2 ขึ้น) 麻 ป่าน<br>• mǎ (เสียง 3 ลงแล้วขึ้น) 马 ม้า<br>• mà (เสียง 4 ตกลงเร็ว) 骂 ด่า<br>เปลี่ยนเสียง ความหมายเปลี่ยนเลยนะ'],
  [/您|สุภาพ|ทางการ|ผู้ใหญ่|nín/i, '<b>你好 (nǐ hǎo)</b> ใช้ทั่วไป กับเพื่อน/คนรุ่นเดียวกัน<br><b>您好 (nín hǎo)</b> สุภาพกว่า ใช้กับครู ผู้ใหญ่ หรือลูกค้า<br>ต่างกันที่ตัวแรก: 你 → 您'],
  [/不客气|ตอบ.*ขอบคุณ|ขอบคุณ.*ตอบ|ตอบกลับ/i, 'ถ้ามีคนพูด <b>谢谢</b> กับเรา ตอบได้ว่า <b>不客气 (bú kèqi)</b> = ไม่ต้องเกรงใจ/ยินดีค่ะ-ครับ 😊<br>(เป็นคำนอกบทวันนี้ แต่ใช้บ่อยมาก)'],
  [/พินอิน|pinyin|อ่านยังไง|อ่านออก/i, '<b>พินอิน</b> คือตัวอักษรโรมันที่ใช้บอกเสียงอ่านของตัวจีน เช่น 你好 = <b>nǐ hǎo</b><br>เครื่องหมายบนสระ (ˉ ˊ ˇ ˋ) บอกเสียงวรรณยุกต์ ในบัตรคำเราใส่สีตามเสียงให้จำง่ายขึ้น'],
  [/hsk/i, 'บทเรียนตัวอย่างนี้ใช้คำระดับ <b>HSK 1</b> (ระดับเริ่มต้น) แต่ <b>ไม่ใช่ข้อสอบ HSK ทางการ</b> เป็นแบบฝึกหัดที่เราเขียนเอง'],
  [/你好|สวัสดี|hello|^hi$/i, () => ans(1, 'ใช้ทักทายได้ทุกเวลา ทั้งตอนเจอและเริ่มบทสนทนา')],
  [/谢谢|ขอบคุณ/i, () => ans(2, 'ใช้ขอบคุณได้ทุกสถานการณ์ ถ้าอยากสุภาพขึ้นพูดว่า 谢谢你 ได้')],
  [/再见|ลาก่อน|เจอกัน|บ๊ายบาย/i, () => ans(3, 'ใช้ตอนจากกัน จะต่อด้วยเวลาก็ได้ เช่น 明天见 (míngtiān jiàn) = เจอกันพรุ่งนี้')],
  [/对不起|ขอโทษ/i, () => ans(4, 'ใช้เวลาทำผิดหรือรบกวนคนอื่น คนฟังมักตอบว่า 没关系')],
  [/没关系|ไม่เป็นไร/i, () => ans(5, 'ใช้ตอบเมื่อมีคนขอโทษ หรือบอกว่าเรื่องนี้ไม่เป็นปัญหา')],
  [/ฝึกพูด|ออกเสียง|พูดไม่ชัด/i, 'ลองเมนู <b>ฝึกพูด</b> หรือกดปุ่ม 🔊 ฟังก่อน แล้วพูดตามช้าๆ ทีละคำ เน้นให้เสียงวรรณยุกต์ชัดมากกว่าความเร็ว'],
  [/plus|buddy|แพ็ก|แผน|ราคา|เท่าไร|เท่าไหร่|จ่าย|vip/i, 'แผนในตัวอย่างนี้มี Free / Plus 99 บาท/เดือน / Buddy 159 บาท/เดือน (2 คน) ราคาเป็นตัวอย่างสมมติ ยังไม่มีการชำระเงิน ดูที่เมนู “ฉัน” → “ดูแผนและราคา”'],
  [/ประโยค|ตัวอย่าง/i, 'ประโยคตัวอย่างของวันนี้:<br>__EX__']
];
function tutorAnswer(text) {
  for (const [re, a] of KB) if (re.test(text)) {
    let h = typeof a === 'function' ? a() : a;
    if (h.includes('__EX__')) h = h.replace('__EX__', LESSONS.map(l => `<span class="zh">${l.ex}</span><br>${pyColor(l.exs)} — ${l.ext}`).join('<br><br>'));
    return h;
  }
  return 'ตอนนี้เป็นเดโม ครู AI ตอบได้เฉพาะเรื่องบทเรียนวันที่ 1 (คำทักทาย) 🙏<br>ลองถามเรื่อง วรรณยุกต์, พินอิน, 你好, 谢谢, 再见, 对不起 หรือ 没关系 ดูนะ';
}
function quotaLeft() { if (S.tDay !== today()) { S.tDay = today(); S.tUsed = 0; save(); } return Math.max(0, 3 - S.tUsed); }
const quotaBar = () => { const n = quotaLeft(); return `<div class="quota">🎟 คำถามฟรีวันนี้เหลือ <b>${n}/3</b> · <span>จำลอง</span></div>`; };
async function doTutor() {
  meSay('ถามครู AI');
  await botSay(`สวัสดี! ถามเรื่องบทเรียนวันนี้ได้เลย พิมพ์ในช่องข้อความด้านล่าง หรือกดตัวอย่างคำถาม 👇${quotaBar()}`, 500, 'ครู AI — ตัวอย่างจำลอง (ยังไม่ใช่ AI จริง)');
  chips(ASK.map(q => ({t: q, act: 'ask', q})));
}
async function doAsk(text) {
  meSay(text);
  if (quotaLeft() === 0) {
    await botSay(`โควตาคำถามฟรีวันนี้ใช้ครบ 3 ข้อแล้ว 🙏 พรุ่งนี้รีเซ็ตใหม่ หรือดูแผน Plus ที่ถามได้ไม่จำกัด (ตัวอย่าง)${quotaBar()}`, 500, 'ครู AI — จำลอง');
    chips([{t: '💎 ดูแผนและราคา', act: 'plans'}]); return;
  }
  S.tUsed++; save();
  await botSay(tutorAnswer(text) + quotaBar(), 800, 'ตัวอย่างคำตอบ AI (เดโม)');
  chips([{t: '📖 ดูบทเรียน', act: 'lesson'}, {t: '📝 ควิซ 3 ข้อ', act: 'quiz'}]);
}

/* ---------- ฝึกพูดทีละคำ (ผลจำลอง ไม่ได้ตรวจวรรณยุกต์จริง) ---------- */
let spIdx = 0;
async function doSpeak(next) {
  if (!next) meSay('ฝึกพูด');
  const l = LESSONS[spIdx % 5];
  await botSay('ฝึกพูดทีละคำ! แตะคำเพื่อฟังตัวอย่าง แล้วกดไมค์พูดทั้งประโยคตามได้เลย', 400, 'ฝึกพูด — ผลจำลอง ยังไม่ได้ตรวจเสียงจริง');
  await botCard(`<div class="qcard" data-sp="${l.id}"><div class="qhead"><span>🎤 พูดตามประโยค</span><span>${spIdx % 5 + 1}/5</span></div><div class="qbody">
    <div class="qmain zh" style="font-size:30px">${l.ex}</div><div class="qpy py">${pyColor(l.exs)}</div><div style="font-size:13.5px;margin:2px 0 6px">${l.ext}</div>
    <div class="wchips">${l.words.map(w => `<button class="wchip" data-say="${w[0]}"><span class="zh">${w[0]}</span><small class="py">${w[1]}</small></button>`).join('')}</div>
    <div class="mic-area"><button class="micbtn" data-mic="${l.id}" aria-label="กดเพื่อพูด">🎤</button><div class="sp-state" style="font-size:12.5px;color:var(--sub)">แตะไมค์แล้วพูดตาม</div></div>
    <div class="sp-result"></div></div></div>`, 450);
}
async function doMic(btn) {
  if (btn.dataset.busy) return; btn.dataset.busy = 1;
  const card = btn.closest('.qcard'), st = card.querySelector('.sp-state'), res = card.querySelector('.sp-result'), l = LESSONS.find(x => x.id === +btn.dataset.mic);
  res.innerHTML = ''; btn.classList.add('rec'); st.textContent = 'กำลังฟัง… (จำลอง ไม่ได้เปิดไมค์จริง)';
  await sleep(1800); btn.classList.remove('rec'); st.textContent = 'กำลังสรุปผล…'; await sleep(700);
  const marks = l.words.map(w => ({w, ok: Math.random() < 0.65}));
  st.textContent = 'แตะไมค์เพื่อลองอีกครั้งได้';
  const first = !btn.dataset.scored; btn.dataset.scored = 1;
  res.innerHTML = `<div class="wres">${marks.map(m => `<div class="wr ${m.ok ? 'g' : 'y'}"><span class="zh">${m.w[0]}</span><small class="py">${m.w[1]}</small><i>${m.ok ? '👍 ชัด' : '🔁 ลองอีกที'}</i></div>`).join('')}</div>
    <div style="font-size:12.5px;margin-top:6px">ผลรายคำด้านบน “สุ่มมาเพื่อโชว์หน้าตา” ระบบจริงต้องพัฒนาการวิเคราะห์เสียงเพิ่ม</div>
    <div class="demo-tag" style="margin-top:6px">จำลอง · ไม่ได้ตรวจความถูกต้องของวรรณยุกต์/การออกเสียง</div>
    <button class="btn ghost" data-act="speaknext">ประโยคถัดไป ➡</button>`;
  if (first) { S.speak++; addXp(5, btn); save(); }
  confetti(20); delete btn.dataset.busy; scrollDown();
}

/* ---------- ฉัน (โปรไฟล์ · แจ้งเตือน · แผนราคา) ---------- */
function weekHtml() {
  const t = today(), names = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'], out = [];
  for (let d = t - 6; d <= t; d++) { const dow = new Date((d + 0.5) * 864e5).getUTCDay(), on = S.days.includes(d); out.push(`<div class="wd ${on ? 'on' : ''} ${d === t ? 'today' : ''}"><i>${on ? '🔥' : ''}</i>${names[dow]}</div>`); }
  return out.join('');
}
function meSheet() {
  sheetPush({title: 'ฉัน', render: () => {
    const st = curStreak(), lv = level(), pct = S.xp % 100;
    return `<div class="hero"><img src="${MASCOT}" alt=""><div><div class="big">ระดับ ${lv} · ${S.level || 'ยังไม่ได้ทดสอบ'}</div><div class="small">${st > 0 ? `เรียนต่อเนื่อง ${st} วัน 🔥` : 'ทำควิซวันนี้เพื่อเริ่มสตรีค'}</div></div></div>
    <div class="stats"><div class="stat"><div class="n">⚡ ${S.xp}</div><div class="l">XP รวม</div></div><div class="stat"><div class="n">🔥 ${st}</div><div class="l">วันต่อเนื่อง</div></div><div class="stat"><div class="n">🎟 ${S.tickets}</div><div class="l">ตั๋วกันไฟดับ</div></div></div>
    <div class="card"><h3>7 วันล่าสุด</h3><div class="week">${weekHtml()}</div>
      <div class="bar" style="margin-top:10px"><i style="width:${pct}%"></i></div><div class="sub11" style="margin-top:4px">อีก ${100 - pct} XP ขึ้นระดับ ${lv + 1} · ควิซ ${S.quizzes} ครั้ง · ฝึกพูด ${S.speak} · ชนะท้าเพื่อน ${S.wins}</div></div>
    <div class="card"><h3>🔔 แจ้งเตือนรายวัน (Push)</h3>
      <div class="rowx"><span>ส่งเตือนให้เรียนทุกวัน 19:00</span><button class="tog ${S.pushOn ? 'on' : ''}" data-sa="pushtog" aria-label="เปิดปิดแจ้งเตือน"><i></i></button></div>
      <div class="meter"><div class="mt"><span>ข้อความที่ใช้เดือนนี้ (แผนฟรี)</span><b>${S.push} / 300</b></div><div class="bar"><i style="width:${Math.min(100, S.push / 3)}%"></i></div></div>
      <button class="btn ghost" data-sa="pushnow">🔔 ดูตัวอย่างข้อความแจ้งเตือน</button>
      ${realNote('ข้อความที่บอท “ส่งเอง” (push/broadcast) นับโควตารายเดือนของ OA ส่วนข้อความที่ “ตอบกลับ” เวลาผู้ใช้พิมพ์มาไม่นับ', 'ตัวเลข 47/300 เป็นค่าจำลอง กดปุ่มด้านบนเพิ่มทีละ 1')}</div>
    <button class="btn" data-sa="plans">💎 ดูแผนและราคา (Free / Plus / Buddy)</button>
    <div class="pickrow" style="margin-top:10px"><button class="chipbtn" data-sa="report:ทั่วไป">⚑ แจ้งข้อผิด</button><button class="chipbtn" data-sa="about">ℹ️ เกี่ยวกับเดโม</button></div>
    <div class="card" style="margin-top:14px"><h3>🧪 ปุ่มสำหรับทดลอง (เดโม)</h3>
      <button class="btn ghost" data-sa="skipday" style="margin-top:0">⏭ ข้ามไปวันถัดไป (ดูสตรีค/ตั๋วกันไฟดับ)</button>
      <button class="btn gray" data-sa="reset">ล้างข้อมูลทดลองทั้งหมด</button></div>`;
  }});
}
function plansSheet() {
  sheetPush({title: 'แผนและราคา', render: () => `
    <div class="ph-tag" style="display:block;text-align:center;margin-bottom:10px">ราคาทุกแผนเป็นตัวอย่างสมมติ ยังไม่ใช่ราคาจริง · ไม่มีการชำระเงิน</div>
    <div class="plan"><div class="pn">Free <small>0 บาท</small></div><ul><li>บทเรียนประจำวัน 1 บท/วัน</li><li>ควิซ 3 ข้อ · ท้าเพื่อน · อันดับเพื่อน</li><li>ครู AI ถามได้ 3 ข้อ/วัน</li><li>ฝึกพูดทีละคำ (ตัวอย่าง)</li></ul><button class="btn gray" data-sa="plantoast:Free">แผนปัจจุบัน</button></div>
    <div class="plan hot"><div class="badge">แนะนำ</div><div class="pn">Plus <small>99 บาท / เดือน</small></div><ul><li>ทุกอย่างใน Free</li><li>ครู AI ถามได้ไม่จำกัด*</li><li>ฝึกพูดไม่จำกัด + สรุปจุดที่ควรฝึก*</li><li>ตั๋วกันไฟดับ 2 ใบ/เดือน</li><li>บทเรียนเสริมหัวข้อพิเศษ</li></ul><button class="btn" data-sa="plantoast:Plus">เลือกแผน Plus (ตัวอย่าง)</button></div>
    <div class="plan"><div class="pn">Buddy <small>159 บาท / เดือน · 2 คน</small></div><ul><li>ทุกอย่างใน Plus สำหรับ 2 คน (เฉลี่ยคนละ ~80 บาท)</li><li>ไฟคู่โบนัส XP เมื่อเรียนครบทั้งคู่</li><li>ความท้าทายคู่ประจำสัปดาห์</li></ul><button class="btn ghost" data-sa="plantoast:Buddy">เลือกแผน Buddy (ตัวอย่าง)</button></div>
    <div class="sub11" style="text-align:center">*“ไม่จำกัด” ในตัวอย่างหมายถึงแนวคิด ค่าใช้จริงต้องคำนวณต้นทุน AI อีกครั้ง</div>
    ${realNote('การรับชำระเงินต้องผ่านผู้ให้บริการชำระเงินที่เปิดบัญชีไว้ (ยังไม่ได้ทำ)', 'แสดงหน้าตาเฉยๆ ปุ่มเลือกแผนไม่ทำอะไรนอกจากแจ้งเตือน')}`});
}
function aboutSheet() {
  sheetPush({title: 'เกี่ยวกับเดโม', render: () => `
    <div class="card"><h3>ตัวอย่างทดลอง ยังไม่ใช่ระบบจริง</h3><div style="font-size:14px;line-height:1.7">หน้าจำลองให้เห็นว่าห้องเรียนใน LINE OA จะหน้าตาและใช้งานแบบไหน ทุกอย่างทำงานในเครื่องคุณ ไม่เชื่อมต่อ LINE จริง</div></div>
    <div class="card"><h3>ทำงานได้จริงในเดโม</h3><div style="font-size:13.5px;line-height:1.8">• บัตรคำ 5 คำ + สีวรรณยุกต์ + ปุ่มฟังเสียง (เสียงอ่านของเครื่อง บางเครื่องไม่มีเสียงจีน)<br>• ทดสอบระดับ ควิซ XP สตรีค ตั๋วกันไฟดับ (บันทึกในเครื่อง)<br>• เมนู 6 ปุ่ม การส่งต่อ/แชร์ (จำลองหน้าต่างเลือกเพื่อน)</div></div>
    <div class="card"><h3>ที่เป็นของจำลอง</h3><div style="font-size:13.5px;line-height:1.8">• เพื่อน อันดับ ห้องกลุ่ม และคะแนนของเพื่อน = ข้อมูลสมมติ<br>• ครู AI = คำตอบสำเร็จรูปตามคำสำคัญ โควตา 3 ข้อ/วันจำลอง<br>• ฝึกพูด = ผลรายคำสุ่ม ไม่ได้ตรวจเสียงจริง<br>• แพ็กเกจ/ราคา = สมมติ ไม่มีการชำระเงิน<br>• รูปมาสคอต = รูปชั่วคราว รอฝ่ายกราฟิกออกแบบตัวจริง</div></div>
    <div class="card"><h3>เรื่องความถูกต้อง</h3><div style="font-size:13.5px;line-height:1.8"><b>ไม่ใช่ข้อสอบ HSK ทางการ</b> · เนื้อหาระดับ HSK 1 ตัวอย่างประโยคเขียนใหม่ ก่อนใช้จริงควรให้เจ้าของภาษา/ครูภาษาจีนตรวจพินอินและคำแปล พบข้อผิดกดปุ่ม “แจ้งข้อผิด” ได้</div><button class="btn ghost" data-sa="report:ทั่วไป">⚑ แจ้งข้อผิด</button></div>`});
}
function reportSheet(what) {
  sheetPush({title: 'แจ้งข้อผิด', render: () => `
    <div class="card"><h3>พบข้อผิดตรงไหน?</h3><div class="sub12">เรื่อง: <b>${esc(what)}</b></div>
    <div class="pickrow" id="repkinds"><button class="chipbtn on" data-sa="repk:พินอิน">พินอิน</button><button class="chipbtn" data-sa="repk:คำแปลไทย">คำแปลไทย</button><button class="chipbtn" data-sa="repk:ตัวอักษรจีน">ตัวอักษรจีน</button><button class="chipbtn" data-sa="repk:อื่นๆ">อื่นๆ</button></div>
    <textarea id="repText" rows="4" placeholder="เล่าสั้นๆ ว่าผิดตรงไหน หรือควรเป็นแบบไหน"></textarea>
    <button class="btn" data-sa="repsend">ส่งแจ้งข้อผิด</button>
    <div class="sub11" style="margin-top:6px">ไม่ใช่ข้อสอบ HSK ทางการ · ในเดโมนี้ข้อความไม่ได้ส่งไปที่ไหน</div></div>`});
}
let PENDING = null, repKind = 'พินอิน';
function sharePicker(p) {
  PENDING = p;
  sheetPush({title: 'ส่งให้ใคร?', render: () => `
    <div class="card"><div class="sub12">กำลังส่ง: <b>${esc(p.desc)}</b></div></div>
    <div class="card"><h3>เพื่อน</h3>${FRIENDS.map((f, i) => `<div class="lb"><div class="ph" style="background:${f.bg}">${f.e}</div><div class="nm">${f.n}</div><button class="chipbtn" data-sa="sendshare:f${i}">ส่ง</button></div>`).join('')}</div>
    <div class="card"><h3>กลุ่ม</h3>${GROUPS.map((g, i) => `<div class="lb"><div class="ph" style="background:#e9e0fa">${g.e}</div><div class="nm">${g.n}<div class="sub11">${g.cnt} คน</div></div><button class="chipbtn" data-sa="sendshare:g${i}">ส่ง</button></div>`).join('')}</div>
    ${realNote('ใช้หน้าต่างเลือกเพื่อน/กลุ่มของ LINE (Share Target Picker) ส่งการ์ดข้อความได้', 'หน้าต่างนี้จำลองหน้าตา ไม่มีการส่งจริง')}`});
}
function doShare(to) {
  const p = PENDING; if (!p) return; const dest = to[0] === 'f' ? FRIENDS[+to.slice(1)] : GROUPS[+to.slice(1)];
  const inner = p.kind === 'lesson' ? (() => { const l = LESSONS.find(x => x.id === +p.lid); return `<div class="minicard"><div class="zh mz">${l.zh}</div><div>${pyColor(l.sp)}</div><div>${l.th}</div></div>`; })()
    : p.kind === 'score' ? `<div class="minicard"><div class="mz2">📤 ${esc(p.score || '')}</div><div>${esc(p.desc)}</div></div>`
    : `<div class="minicard"><div class="mz2">🎁 ชวนเรียนจีน</div><div>โค้ด <b>${S.code}</b></div></div>`;
  meSay('', `${inner}<div class="hmini">ส่งให้ ${esc(dest.n)} ✓ (จำลอง)</div>`);
  SH.pop(); if (SH.length) sheetShow(); else sheetCloseAll(); toast(`ส่งให้ ${dest.n} แล้ว (จำลอง)`);
}

/* ---------- ปุ่มต่างๆ ภายใน sheet / เมนู ---------- */
function sheetAct(name, arg) {
  $('#menuPop').hidden = true;
  switch (name) {
    case 'chal': startChallenge(FRIENDS[+arg]); break;
    case 'rematch': startChallenge(chalFriend || FRIENDS[0]); break;
    case 'buddy': S.buddy = {n: FRIENDS[+arg].n, streak: 0, both: null}; checkBuddy(); save(); sheetRefresh(); break;
    case 'buddyoff': S.buddy = null; save(); sheetRefresh(); break;
    case 'nudge': { const b = S.buddy; toast(`สะกิด ${b.n} แล้ว 👋 (จำลอง)`); setTimeout(() => { S.bDone[today()] = true; save(); checkBuddy(); if ($('#sheetTitle').textContent === 'ท้าเพื่อน') sheetRefresh(); toast(`${b.n} ตอบกลับ: “เดี๋ยวไปเรียนเลย!” แล้วเรียนเสร็จ ✓`); }, 1400); break; }
    case 'copy': try { navigator.clipboard.writeText(`https://line.me/R/ti/p/@example?ref=${S.code}`); } catch (e) {} toast('คัดลอกลิงก์ตัวอย่างแล้ว (ใช้งานจริงไม่ได้)'); break;
    case 'join': { const n = JOINERS.find(x => !S.invited.includes(x)) || ('เพื่อน' + (S.invited.length + 1)); S.invited.push(n); let msg = `${n} เข้าร่วมด้วยโค้ดของคุณ 🎉`;
      while (S.invited.length >= (S.given + 1) * 2) { S.given++; S.tickets++; msg += ' ได้ตั๋วกันไฟดับ 🎟 +1!'; confetti(60); }
      save(); sheetRefresh(); toast(msg); break; }
    case 'group': groupSheet(+arg); break;
    case 'gcmd': gSend(arg); break;
    case 'gsend': gSend(); break;
    case 'pushtog': S.pushOn = !S.pushOn; save(); sheetRefresh(); break;
    case 'pushnow': { S.push++; save(); sheetRefresh(); sheetCloseAll(); pushPreview(); break; }
    case 'plans': plansSheet(); break;
    case 'plantoast': toast(arg === 'Free' ? 'คุณใช้แผน Free อยู่ (ตัวอย่าง)' : `เดโม: ยังไม่มีการชำระเงินจริง (แผน ${arg}) 🙏`); break;
    case 'about': aboutSheet(); break;
    case 'report': reportSheet(arg); repKind = 'พินอิน'; break;
    case 'repk': repKind = arg; document.querySelectorAll('#repkinds .chipbtn').forEach(b => b.classList.toggle('on', b.dataset.sa === 'repk:' + arg)); break;
    case 'repsend': S.reports++; save(); sheetBack(); toast('ขอบคุณที่แจ้ง! (จำลอง ไม่ได้ส่งไปที่ไหน)'); break;
    case 'skipday': { S.shift = (S.shift || 0) + 1; let m = 'ข้ามไปวันถัดไปแล้ว';
      if (S.lastDay !== null && S.lastDay < today() - 1 && S.tickets > 0 && S.streak > 0) { S.tickets--; S.lastDay = today() - 1; m += ' — ใช้ 🎟 ตั๋วกันไฟดับ สตรีคไม่ขาด!'; }
      else if (S.lastDay !== null && S.lastDay < today() - 1 && S.streak > 0) m += ' — สตรีคขาดแล้ว (ไม่มีตั๋ว)';
      save(); hud(); toast(m); if (!$('#sheet').hidden) sheetRefresh(); break; }
    case 'reset': try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); break;
  }
}
async function pushPreview() {
  await sleep(250);
  row(`<img class="av" src="${MASCOT}" alt=""><div class="col"><div class="who">${BOT} <span class="demo-tag">ข้อความ Push (จำลอง)</span></div><div class="bwrap"><div class="bubble push">🔔 <b>ถึงเวลาเรียนจีนแล้ว!</b><br>วันนี้มีคำทักทาย 5 คำรออยู่ ใช้เวลาแค่ 3 นาที 🔥 สตรีคของคุณ ${curStreak()} วัน<br><span class="sub11">ใช้โควตาข้อความ ${S.push}/300</span></div></div></div>`);
  chips([{t: '📖 เรียนเลย', act: 'lesson'}, {t: '📝 ควิซ 3 ข้อ', act: 'quiz'}]);
}
function toggleMenu() {
  const p = $('#menuPop');
  if (!p.hidden) { p.hidden = true; return; }
  p.innerHTML = `<button data-act="quiz" data-close="1">📝 ควิซ 3 ข้อ</button><button data-act="leveltest" data-close="1">🧭 ทดสอบระดับ 5 ข้อ</button><button data-sa="plans">💎 ดูแผนและราคา</button><button data-sa="about">ℹ️ เกี่ยวกับเดโม</button><button data-sa="skipday">⏭ ข้ามไปวันถัดไป (ทดลอง)</button><button data-sa="reset">🗑 ล้างข้อมูลทดลอง</button>`;
  p.hidden = false;
}

/* ---------- events ---------- */
const ACT = {lesson: doLesson, quiz: doQuiz, leveltest: doLevelTest, tutor: doTutor, speak: () => doSpeak(false), speaknext: () => { spIdx++; return doSpeak(true); },
  challenge: () => { meSay('ท้าเพื่อน'); challengeHub(); }, rank: () => { meSay('อันดับ'); rankSheet(); },
  me: () => { meSay('ฉัน'); meSheet(); }, plans: () => { plansSheet(); },
  challengeset: () => { const f = chalFriend || FRIENDS[0]; return startChallenge(f, lastSet || undefined); }};
document.addEventListener('click', e => {
  const t = e.target;
  const say = t.closest('[data-say]'); if (say) { speak(say.dataset.say, say.classList.contains('audio') ? say : null); return; }
  const lr = t.closest('[data-learn]');
  if (lr) { const id = +lr.dataset.learn; if (!S.learned.includes(id)) { S.learned.push(id); lr.classList.add('done'); lr.textContent = '✓ จำได้แล้ว'; addXp(5, lr); confetti(24); save(); } return; }
  const o = t.closest('.opt'); if (o && !o.disabled) { answerQ(o); return; }
  const h = t.closest('[data-hint]'); if (h) { askHint(h); return; }
  const m = t.closest('[data-mic]'); if (m) { doMic(m); return; }
  const sh = t.closest('[data-share]'); if (sh) { sharePicker({desc: sh.dataset.share, kind: sh.dataset.sharekind, lid: sh.dataset.lid, score: sh.dataset.score}); return; }
  const sa = t.closest('[data-sa]');
  if (sa) { const [n, ...r] = sa.dataset.sa.split(':'); if (n === 'sendshare') doShare(r[0]); else sheetAct(n, r.join(':')); return; }
  const c = t.closest('[data-act]');
  if (c) {
    $('#menuPop').hidden = true;
    if (c.dataset.close) sheetCloseAll();
    if (c.classList.contains('chip')) c.classList.add('used');
    if (c.dataset.act === 'ask') { guard(() => doAsk(c.dataset.q)); return; }
    const f = ACT[c.dataset.act]; if (f) guard(async () => { await f(); }); return;
  }
  if (!t.closest('#menuPop') && !t.closest('#btnMenu')) $('#menuPop').hidden = true;
});
$('#sheetClose').onclick = sheetBack;
$('#btnMenu').onclick = toggleMenu;
$('#btnBack').onclick = () => toast('นี่เป็นตัวอย่าง ปุ่มย้อนกลับยังไม่ทำงาน');
$('#btnToggle').onclick = () => $('#richmenu').classList.toggle('open');
const msg = $('#msg'), send = $('#btnSend');
function syncSend() { send.textContent = msg.value.trim() ? '➤' : '🎤'; send.style.color = msg.value.trim() ? '#06c755' : ''; }
msg.addEventListener('input', syncSend);
msg.addEventListener('focus', () => $('#richmenu').classList.remove('open'));
function sendMsg() { const v = msg.value.trim(); if (!v) { guard(() => doSpeak(false)); return; } msg.value = ''; syncSend(); guard(() => doAsk(v)); }
send.onclick = sendMsg;
msg.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
hud(); welcome();
