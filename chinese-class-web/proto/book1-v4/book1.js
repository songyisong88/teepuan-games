/* เล่ม 1 · บทเรียนแบบสถานการณ์ (ฉาก → บทสนทนา → คำทีละคำ → เลือกคำตอบในบทสนทนา → ภารกิจ)
   ส่วนเสริมของ engine.js · ใช้คลาสบทสนทนาเดิมของแอป (.dlgwrap .dl .dav .dbub) */
const SC=n=>`../../assets/art/scene/${n}.webp`;
const WHO={f:{n:'เพื่อน',img:ART('男孩')},me:{n:'คุณ',img:ART('学生')},t:{n:'ครู',img:ART('老师')}};
/* บรรทัดบทสนทนา: {who, zh, py, th, k} · ฉาก: {sit:'ข้อความ', img} */
function lineH(d,o={}){if(d.sit)return `<div class="dl sit"><span class="msit">${d.img?`<img src="${d.img}" alt="">`:''}${d.sit}</span></div>`;
 const W=WHO[d.who],me=d.who==='me';
 return `<div class="dl ${me?'f':''} ${d.q?'q':''}" data-who="${d.who}"><span class="dav"><img src="${W.img}" alt="${W.n}"></span><div class="mdl"><span class="mwho">${W.n}</span>
 ${d.q?`<div class="dbub mqb"><span class="zh dz">?</span></div>`:`<button class="dbub press" data-play="${d.k}"><span class="zh dz">${d.zh}</span><span class="dp">${d.py}</span>${o.noTh||!d.th?'':`<span class="dt">${d.th}</span>`}</button>`}</div></div>`}
const dlgH=(L,o={})=>`<div class="dlgwrap mdlg">${L.map(d=>lineH(d,o)).join('')}</div>`;
async function playDlg(st,L){const i0=E.i;const bs=$$('.mdlg .dbub[data-play]',st);
 for(const b of bs){if(E.i!==i0||!here(st))return;bs.forEach(x=>x.classList.remove('on'));b.classList.add('on');b.scrollIntoView({block:'nearest',behavior:'smooth'});await wait(play(b.dataset.play)+380)}
 bs.forEach(x=>x.classList.remove('on'))}
/* เปิดบท: ฉาก + ประโยคแรกของบทสนทนา + คำถามเดาง่าย ๆ (ชนะภายใน 30 วินาที) */
function sceneHook(o){return {kind:'q',ans:o.ans,auto:o.line.k,
 html:()=>`${goalBar()}<div class="mscene msc1"><img src="${o.scene}" alt=""></div>${dlgH([o.line],{noTh:1})}<div class="center"><div class="mhook" style="margin-top:8px">${o.q}</div></div>${optsHtml(o)}`,
 show:st=>{if(!quiet())setTimeout(()=>{if(here(st)){const b=$('.dbub',st);b.classList.add('on');setTimeout(()=>b.classList.remove('on'),1400);play(o.line.k)}},600)},
 fb:()=>o.fb,demo:async d=>{if(d==='ok')answer(o.ans);if(d==='bad')answer(o.ans?0:1);await wait(500)}}}
/* บทสนทนาเต็ม: เล่นทีละประโยคพร้อมไฮไลต์ · แตะฟองเพื่อฟังซ้ำ */
function dialog(o){return {kind:'teach',html:()=>`${tag(o.n,o.cap||'บทสนทนาของบทนี้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div>${o.text?`<p class="l1p v4fit" style="margin-top:4px">${o.text}</p>`:''}</div>
 ${dlgH(o.lines)}<div class="center mt12"><button class="mbtn2 press" style="margin:0 auto" data-sa="dlgall">${SPK}ฟังทั้งบทสนทนา</button></div>${o.note?`<p class="mrevnote">${o.note}</p>`:''}`,
 show:st=>{$('[data-sa="dlgall"]',st).addEventListener('click',()=>{playDlg(st,o.lines)});if(!quiet())setTimeout(()=>{if(here(st))playDlg(st,o.lines)},700)},
 onPlay:b=>{$$('#stage .dbub').forEach(x=>x.classList.remove('on'));b.classList.add('on');const ms=play(b.dataset.play);setTimeout(()=>b.classList.remove('on'),ms+200)},
 demo:async d=>{if(d==='hl'||d==='done'){const b=$$('#stage .dbub')[o.hl||0];if(b)b.classList.add('on')}await wait(200)}}}
/* ลงมือ: แตะทีละพยางค์ ฟังเสียงและดูเส้นเสียงวาดขึ้นมา */
function syl(o){const x=o.w;return {kind:'teach',lock:true,html:()=>`${tag(o.n,'ลองเอง')}<div class="center l1snd"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title||'แตะทีละพยางค์'}</div><p class="l1p v4fit">${o.text||'ฟังเสียงและดูเส้นเสียงของแต่ละพยางค์'}</p></div>
 <div class="center">${pic(x,'mpic',1)}</div>
 <div class="msyl">${o.chars.map((c,i)=>`<button class="press" data-sy="${i}"><span class="zh">${c.zh}</span><span class="py q">?</span><span class="ct tc${c.t}">${c.t?contour(c.t,{hide:1,dot:1}):'<small>เบา</small>'}</span></button>`).join('')}</div>
 <div class="center"><div class="v4ok v4need" style="margin-top:12px">แตะให้ครบทุกพยางค์</div></div>`,
 show:st=>{const seen=new Set();let fin=0;$('.msyl',st).addEventListener('click',async e=>{const b=e.target.closest('[data-sy]');if(!b)return;const i=+b.dataset.sy,c=o.chars[i];bump(b);
  const ms=c.k?play(c.k):0;const sv=$('.ct svg',b);if(sv)drawLine(sv,640,c.k?sndOn(c.k):0);
  const p=$('.py',b);p.textContent=c.py;p.classList.remove('q');b.classList.add('done');seen.add(i);
  if(seen.size===o.chars.length&&!fin){fin=1;const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent=o.done||'ครบแล้ว ฟังทั้งคำอีกครั้ง';unlock();await wait(Math.min(Math.max(ms,300),1100)+250);if(here(st))play(x.k)}})},
 solve:async()=>{for(const b of $$('#stage [data-sy]')){b.click();await wait(120)}},
 demo:async d=>{const bs=$$('#stage [data-sy]');if(d==='half'){bs[0].click();await wait(800)}if(d==='done'){for(const b of bs){b.click();await wait(700)}}await wait(200)}}}
/* เลือกคำตอบในบทสนทนา · ผิด = เฉลยแล้วทำข้อเดิม · noTh = ภารกิจ ไม่มีคำแปลไทย */
function reply(o){const noTh=!!o.noTh;return {kind:'q',ans:o.ans,auto:o.line&&o.line.k,
 html:()=>`<div class="center">${o.rv?`<span class="mrevtag">${RV(o.rv)}</span>`:`<div class="cap v4tag">${o.tag||''}</div>`}<div class="cap" style="font-size:14px;margin-top:2px">${o.q||'คุณจะตอบว่าอะไร'}</div></div>
 ${dlgH([...(o.hist||[]),...(o.sit?[{sit:o.sit,img:o.simg}]:[]),...(o.line?[o.line]:[]),{who:o.me||'me',q:1}],{noTh})}
 <div class="mreply">${o.opts.map((r,i)=>`<button class="opt press" data-i="${i}"><span class="zh">${r.zh}</span><span class="py">${r.py}</span>${noTh?'':`<span class="th">${r.th}</span>`}</button>`).join('')}</div>`,
 show:st=>{const q=$('.dl.q',st);if(q)q.scrollIntoView({block:'nearest'});if(o.line&&!quiet())setTimeout(()=>{if(here(st)&&E.steps[E.i].auto===o.line.k){const b=$$('.mdlg .dbub[data-play]',st).pop();if(b){b.classList.add('on');setTimeout(()=>b.classList.remove('on'),1400)}play(o.line.k)}},500)},
 after:ok=>{const a=o.opts[o.ans];const q=$('#stage .dl.q .mqb');if(q&&ok){q.classList.add('okb');q.innerHTML=`<span class="zh dz">${a.zh}</span><span class="dp">${a.py}</span>`}if(!quiet())setTimeout(()=>play(a.k),250)},
 fb:()=>{const a=o.opts[o.ans];return `<span class="zh">${a.zh}</span> <b>${a.py}</b> = ${a.th}${o.why?` · ${o.why}`:''}`},
 demo:async d=>{if(d==='ok')answer(o.ans);if(d==='bad')answer(o.ans===0?1:0);await wait(600)}}}
/* ===== v2 (ซ้งอี้ 4 พ.ย. 2026): เปิดบทด้วยคำศัพท์ → อธิบายทีละคำ → เทคนิคการใช้ → แบบทดสอบท้ายบท ===== */
/* หน้าเปิดบท: เป้าหมาย + ฉาก + ประโยคแรก (แตะฟัง ไม่ใช่คำถาม) */
function intro(o){return {kind:'teach',btn:'เริ่มเรียน',html:()=>`${goalBar()}<div class="mscene msc1"><img src="${o.scene}" alt=""></div>
 <div class="center"><div class="cap" style="margin-top:10px">${o.cap}</div><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div></div>${dlgH([o.line])}
 <p class="mrevnote">${o.note}</p>`,
 show:st=>{const i0=E.i;if(!quiet())setTimeout(()=>{if(here(st)&&E.i===i0){const b=$('.dbub',st);b.classList.add('on');setTimeout(()=>b.classList.remove('on'),1400);play(o.line.k)}},600)},
 demo:async d=>{if(d==='done')$('#stage .dbub').classList.add('on');await wait(200)}}}
/* คำศัพท์ใหม่ของบท: การ์ดภาพ + จีน + พินอิน + ไทย · แตะฟังให้ครบ */
function vocab(o){return {kind:'teach',lock:true,html:()=>`${tag('','คำศัพท์ใหม่ของบทนี้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text}</p></div>
 <div class="mvoc">${o.items.map((it,i)=>`<button class="press" data-vc="${i}"><span class="vi"><img src="${it.img}" alt=""></span><span class="vt"><span class="zh">${it.w.zh}</span><span class="py">${it.w.py}</span><span class="v4lab">${it.w.th}</span></span><span class="vs">${SPK}</span><span class="vn">${i+1}</span></button>`).join('')}</div>
 <div class="center"><div class="v4ok v4need" style="margin-top:12px">แตะฟังให้ครบทั้ง ${o.items.length} คำ</div></div>`,
 show:st=>{const seen=new Set();$('.mvoc',st).addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(!b)return;const i=+b.dataset.vc;bump(b);play(o.items[i].w.k);b.classList.add('done');seen.add(i);
  if(seen.size===o.items.length){const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent='ฟังครบแล้ว ต่อไปเรียนทีละคำ';unlock()}})},
 solve:async()=>{for(const b of $$('#stage [data-vc]')){b.click();await wait(120)}},
 demo:async d=>{if(d==='done'){const bs=$$('#stage [data-vc]');bs[0].click();await wait(200);bs[1].click();await wait(200)}await wait(200)}}}
/* วิธีใช้คำ: ใช้เมื่อไร (ภาพสถานการณ์) + ตัวอย่างบทสนทนา + ข้อสังเกต */
function use(o){const x=o.w;return {kind:'teach',html:()=>`${tag(o.n,'ใช้อย่างไร')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px"><span class="zh">${x.zh}</span> ใช้เมื่อไร</div></div>
 <div class="mwhen">${o.when.map(c=>`<div class="c"><img src="${c.img}" alt=""><span>${c.t}</span></div>`).join('')}</div>
 <div class="center"><div class="cap" style="margin-top:12px">ตัวอย่าง · แตะฟองเพื่อฟัง</div></div>${dlgH(o.lines)}
 ${o.tip?`<div class="mhint mtip">${o.tip}</div>`:''}`,
 show:st=>{const i0=E.i;if(!quiet())setTimeout(()=>{if(here(st)&&E.i===i0)playDlg(st,o.lines)},600)},
 onPlay:b=>{$$('#stage .dbub').forEach(y=>y.classList.remove('on'));b.classList.add('on');const ms=play(b.dataset.play);setTimeout(()=>b.classList.remove('on'),ms+200)}}}
/* เทียบ 2 แบบ: การ์ดซ้าย-ขวา แตะฟัง */
function cmp(o){return {kind:'teach',html:()=>`${tag(o.n,o.cap||'เทคนิคการใช้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div>${o.text?`<p class="l1p v4fit">${o.text}</p>`:''}</div>
 <div class="mcmp2">${[o.a,o.b].map(c=>`<button class="press" data-play="${c.k}"><span class="who">${c.who}</span><span class="vi"><img src="${c.img}" alt=""></span><span class="zh">${c.zh}</span><span class="py">${c.py}</span><span class="v4lab">${c.th}</span><span class="vs">${SPK}</span></button>`).join('')}</div>
 ${o.tip?`<div class="mhint mtip">${o.tip}</div>`:''}${o.chips?`<div class="mtchips">${o.chips.map(c=>`<button class="press" data-play="${c.k}"><span class="zh">${c.zh}</span><span class="py">${c.py}</span><small>${c.th}</small></button>`).join('')}</div>`:''}`,
 onPlay:b=>{$$('#stage .mcmp2 button,#stage .mtchips button').forEach(y=>y.classList.remove('on'));b.classList.add('on');const ms=play(b.dataset.play);setTimeout(()=>b.classList.remove('on'),ms+200)},
 show:st=>{const i0=E.i;if(!quiet())setTimeout(()=>{if(here(st)&&E.i===i0)seq([o.a.k,o.b.k],st,450)},600)},
 demo:async d=>{if(d==='done')$('#stage .mcmp2 button').classList.add('on');await wait(200)}}}
/* บทสนทนาสั้นพร้อมเทคนิค (เรียน ไม่ใช่ทดสอบ) */
function talk(o){return {kind:'teach',html:()=>`${tag(o.n,o.cap||'เทคนิคการใช้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div>${o.text?`<p class="l1p v4fit">${o.text}</p>`:''}</div>
 ${dlgH(o.lines)}${o.chips?`<div class="mtchips">${o.chips.map(c=>`<button class="press" data-play="${c.k}"><span class="zh">${c.zh}</span><span class="py">${c.py}</span><small>${c.th}</small></button>`).join('')}</div>`:''}${o.tip?`<div class="mhint mtip">${o.tip}</div>`:''}`,
 show:st=>{const i0=E.i;if(!quiet())setTimeout(()=>{if(here(st)&&E.i===i0)playDlg(st,o.lines)},600)},
 onPlay:b=>{$$('#stage .dbub,#stage .mtchips button').forEach(y=>y.classList.remove('on'));b.classList.add('on');const ms=play(b.dataset.play);setTimeout(()=>b.classList.remove('on'),ms+200)},
 demo:async d=>{if(d==='done'){const b=$$('#stage .dbub')[1];if(b)b.classList.add('on')}await wait(200)}}}
/* ข้อควรระวัง: การ์ด ไม่ใช่ / ใช่ */
function tips(o){return {kind:'teach',html:()=>`${tag(o.n,o.cap||'เทคนิคการใช้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div></div>
 <div class="mtips">${o.items.map(it=>`<div class="c"><div class="h">${it.h}</div><div class="r"><span class="no">ไม่ใช่</span><s>${it.bad}</s></div><button class="r yes press" data-play="${it.k}"><span class="ok">ใช่</span><b>${it.good}</b><span class="vs">${SPK}</span></button>${it.note?`<small>${it.note}</small>`:''}</div>`).join('')}</div>`}}
/* จับคู่ จีน ↔ ไทย · ผิด = แสดงคู่ที่ถูกแล้วลองใหม่ */
function match(o){const R=shuf(o.pairs.map((_,i)=>i),o.pairs.map(p=>p.zh).join(''));return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'แตะคำจีน แล้วแตะความหมายที่ตรงกัน'}</div></div>
 <div class="mmatch"><div class="col">${o.pairs.map((p,i)=>`<button class="press l" data-ml="${i}"><span class="zh">${p.zh}</span><span class="py">${p.py}</span></button>`).join('')}</div>
 <div class="col">${R.map(i=>`<button class="press r" data-mr="${i}">${o.pairs[i].th}</button>`).join('')}</div></div>
 <div class="center"><div class="v4ok v4need" style="margin-top:12px">จับคู่ให้ครบ ${o.pairs.length} คู่</div><div class="mmfb"></div></div>`,
 show:st=>{let sel=null,n=0,busy=0;st.querySelector('.mmatch').addEventListener('click',async e=>{if(busy)return;const l=e.target.closest('[data-ml]'),r=e.target.closest('[data-mr]');
  if(l&&!l.classList.contains('ok')){$$('#stage [data-ml]').forEach(b=>b.classList.remove('sel'));l.classList.add('sel');sel=+l.dataset.ml;bump(l);play(o.pairs[sel].k);return}
  if(r&&!r.classList.contains('ok')&&sel!=null){const j=+r.dataset.mr,L=$(`#stage [data-ml="${sel}"]`);
   if(j===sel){r.classList.add('ok');L.classList.add('ok');L.classList.remove('sel');sel=null;n++;$('.mmfb',st).textContent='';
    if(n===o.pairs.length){const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent='ถูกต้องครบทุกคู่';unlock()}}
   else{busy=1;r.classList.add('bad');const c=$(`#stage [data-mr="${sel}"]`);c.classList.add('ans');$('.mmfb',st).innerHTML=`ยังไม่ใช่ · <span class="zh">${o.pairs[sel].zh}</span> = ${o.pairs[sel].th} ลองอีกครั้ง`;
    await wait(1300);r.classList.remove('bad');c.classList.remove('ans');L.classList.remove('sel');sel=null;busy=0}}})},
 solve:async()=>{for(let i=0;i<o.pairs.length;i++){$(`#stage [data-ml="${i}"]`).click();await wait(80);$(`#stage [data-mr="${i}"]`).click();await wait(80)}},
 demo:async d=>{if(d==='half'||d==='done'){$('#stage [data-ml="0"]').click();await wait(60);$('#stage [data-mr="0"]').click();await wait(60)}
  if(d==='bad'){$('#stage [data-ml="1"]').click();await wait(60);$(`#stage [data-mr="${o.pairs.length-1}"]`).click();await wait(100)}await wait(200)}}}
