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
/* ===== v3 (ซ้งอี้ 4 พ.ย. 2026): การ์ดคำแบบห้องคำของแอป (ไทล์ W3 + การ์ดใหญ่ W1 จาก hub.js) และกิจกรรมเฉพาะของแต่ละบท ===== */
Object.assign(WHO,{g:{n:'เพื่อน',img:ART('女孩')}});
/* ภาพที่ยังไม่มี: ชื่อไฟล์ตาม ART-NEEDED.md · ไฟล์ยังไม่มา = กล่องสีครีมกับตัวอักษรจีน (วางไฟล์แล้วขึ้นเองทันที) */
const A2=zh=>ART(zh+'-v2');
const BGS=['#FFF4D6','#EAF1FB','#E6F4F1','#FCE9EF','#EAF4EC','#F1ECFA'];
function PH(t){const n=[...t].length,fs=n>3?110:n>2?140:n>1?180:240;
 const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#F7F0E6"/><rect x="26" y="26" width="460" height="460" rx="48" fill="none" stroke="#E3D3BF" stroke-width="6" stroke-dasharray="18 14"/><text x="256" y="${Math.round(256+fs*.36)}" text-anchor="middle" font-size="${fs}" font-family="Noto Sans SC,Noto Sans CJK SC,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif" fill="#B98A66">${t}</text></svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}
document.addEventListener('error',e=>{const i=e.target;if(!i||i.tagName!=='IMG'||i.dataset.ph)return;
 if(i.dataset.fb){const f=i.dataset.fb;delete i.dataset.fb;i.src=f;return}
 if(i.hasAttribute('data-rm')){i.remove();return}
 const m=decodeURIComponent(i.getAttribute('src')||'').match(/\/art\/word\/(.+?)(?:-v2)?\.webp$/);if(!m)return;i.dataset.ph=1;i.classList.add('isph');i.src=PH(m[1])},true);
const isLl=u=>LLAMA_ART.some(n=>String(u).endsWith('/'+n+'.webp'));
const HSPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
/* ไทล์คำแบบห้องคำ (W3): วงกลมภาพ + จีน + ไทย */
function hbT(x,i,img,bg,fb){const n=[...x.zh].length;return `<button class="hb-t press" data-vc="${i}"><span class="cc" style="background:${bg||BGS[i%BGS.length]}"><span class="phz zh" style="font-size:${Math.min(34,Math.floor(62/n))}px">${x.zh}</span>${img?`<img src="${img}" alt="" data-rm${fb?` data-fb="${fb}"`:''} draggable="false">`:''}</span><span class="z zh" style="font-size:${Math.min(17,Math.floor(96/n))}px">${x.zh}</span><span class="t">${x.th}</span><i class="ck"></i></button>`}
/* ลามาไม่เกิน 1 ตัวต่อหน้า: ภาพลามาตัวที่ 2 เป็นต้นไปใช้ภาพแบบไม่มีลามา (-v2) */
function vItems(items){let ll=0;return items.map(it=>{const x=it.w||it,own=it.w?it.img:null;let img=own||x.img;if(!own&&isLl(img)&&ll++)img=A2(x.zh);return {x,img,fb:it.fb}})}
/* หน้าคำศัพท์ใหม่ของบท: ไทล์ W3 · แตะฟังให้ครบ */
function vgrid(o){const its=vItems(o.items);return {kind:'teach',lock:true,html:()=>`${tag('',o.cap||'คำศัพท์ใหม่ของบทนี้')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text||'แตะการ์ดเพื่อฟังเสียงทีละคำ'}</p></div>
 <div class="hb-g3 mvg">${its.map(({x,img,fb},i)=>hbT(x,i,img,null,fb)).join('')}</div>
 <div class="center"><div class="v4ok v4need" style="margin-top:14px">แตะฟังให้ครบทั้ง ${its.length} คำ</div></div>`,
 show:st=>{const seen=new Set();$('.mvg',st).addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(!b)return;const i=+b.dataset.vc;bump(b);play(its[i].x.k);b.classList.add('done');seen.add(i);
  if(seen.size===its.length){const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent=o.done||'ฟังครบแล้ว ต่อไปเรียนทีละคำ';unlock()}})},
 solve:async()=>{for(const b of $$('#stage [data-vc]')){b.click();await wait(120)}},
 demo:async d=>{if(d==='done'){const bs=$$('#stage [data-vc]');bs[0].click();await wait(200);if(bs[1]){bs[1].click();await wait(200)}}await wait(200)}}}
/* สีพื้นกล่องภาพ = สีขอบภาพ (แบบ hbPicBg ของแอป) */
function wcBg(st){const im=$('.wcd .pic img',st);if(!im)return;const go=()=>{try{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(im,0,0,4,4,0,0,1,1);const d=x.getImageData(0,0,1,1).data;im.parentNode.style.background=`rgb(${d[0]},${d[1]},${d[2]})`}catch(e){}};im.complete&&im.naturalWidth?go():im.addEventListener('load',go,{once:true})}
/* การ์ดคำใหญ่ (W1) ในบทเรียน: ภาพ จีน พินอิน เสียง ไทย ฟังแบบช้า · ออกเสียงอย่างไร · ใช้เมื่อไร · ตัวอย่างประโยค */
function wcard(o){const x=o.w,N=o.of,k=o.no,n=[...x.zh].length,zf=Math.min(40,Math.floor(250/n)),pf=Math.min(76,Math.floor(280/n));const img=o.img||x.img;
 return {kind:'teach',html:()=>`<div class="hb-bc wcd"><div class="top"><span class="cnt">คำที่ ${k} จาก ${N}</span><span class="dots" aria-hidden="true">${Array.from({length:N},(_,j)=>`<i${j===k-1?' class="on"':''}></i>`).join('')}</span><span class="cn2">${o.cap||''}</span></div>
 <div class="ph"><span class="pic" style="background:${o.bg||BGS[(k-1)%BGS.length]}"><span class="phz zh" style="font-size:${pf}px">${x.zh}</span><img src="${img}" alt="" data-rm draggable="false"></span></div>
 <div class="hd"><div class="hw"><div class="hz zh" style="font-size:${zf}px">${x.zh}</div><div class="py">${(o.py||x.py).replace(/\[(.+?)\]/g,'<span class="hl">$1</span>')}</div></div><button class="say press" data-play="${x.k}" aria-label="ฟังเสียง">${HSPK}</button></div>
 <div class="tr"><span class="th">${x.th}</span>${o.tag?`<span class="hb-tag lv">${o.tag}</span>`:''}${o.sk?`<button class="slow press" data-play="${o.sk}">ฟังแบบช้า</button>`:''}</div>
 ${o.aid||o.hint?`<div class="box"><h4>ออกเสียงอย่างไร</h4>${aidHtml(aidW(o.aid))}${o.hint?`<p>${o.hint}</p>`:''}</div>`:''}
 ${o.use?`<div class="box"><h4>ใช้เมื่อไร</h4><p>${o.use}</p></div>`:''}
 ${o.ex&&o.ex.length?`<div class="box"><h4>ตัวอย่างประโยค</h4>${o.ex.map(e=>`<div class="exr"><span class="tx"><b class="zh">${e.zh}</b><span class="p">${e.py}</span><small>${e.th}</small></span><button class="say press" data-play="${e.k}" aria-label="ฟังประโยค">${HSPK}</button></div>`).join('')}</div>`:''}</div>`,
 onPlay:b=>{bump(b);const kk=b.dataset.play;b.classList.add('playing');const ms=play(kk);animAid($('#stage'),ms,kk);setTimeout(()=>b.classList.remove('playing'),ms+100)},
 show:st=>{wcBg(st);if(quiet())return;const i0=E.i;setTimeout(()=>{if(here(st)&&E.i===i0)seq(o.sk?[x.k,o.sk]:[x.k],st,450)},500)},
 demo:async d=>{if(d==='done'){const b=$('#stage .hd .say');if(b)b.classList.add('playing')}await wait(200)}}}
/* ทวนคำหลายบท (บททบทวน): ไทล์ W3 แบ่งตามบท · แตะฟัง */
function recap(o){let n=0;const V=vItems(o.groups.flatMap(g=>g.items));const G2=o.groups.map(g=>({lab:g.lab,its:g.items.map(()=>Object.assign(V[n],{i:n++}))}));const all=G2.flatMap(g=>g.its);
 return {kind:'teach',html:()=>`${tag('',o.cap||'ทบทวนคำทั้งหน่วย')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text}</p></div>
 ${G2.map(g=>`<div class="mrcp"><div class="lab">${g.lab}</div><div class="hb-g3 mvg sm">${g.its.map(v=>hbT(v.x,v.i,v.img,null,v.fb)).join('')}</div></div>`).join('')}`,
 show:st=>{st.addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(!b)return;bump(b);play(all[+b.dataset.vc].x.k);b.classList.add('done')})},
 demo:async d=>{await wait(200)}}}
const fbBox=(st,h)=>{const f=$('.mmfb',st);if(f)f.innerHTML=h};
const doneOk=(st,t)=>{const ok=$('.v4ok',st);if(ok){ok.classList.add('on');ok.textContent=t}unlock()};
const rOpt=(r,i,noTh,a='data-so')=>`<button class="opt press" ${a}="${i}"><span class="zh">${r.zh}</span><span class="py">${r.py}</span>${noTh?'':`<span class="th">${r.th}</span>`}</button>`;
/* 1-2 เรื่องเล่าเป็นภาพ: ช่วยตัวละครพูดทีละภาพ · ผิด = เฉลยแล้วทำภาพเดิม */
function story(o){const P=o.panels,noTh=!!o.noTh;return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'ช่วยพูดให้ถูกในแต่ละภาพ'}</div></div>
 <div class="mstrip">${P.map((p,i)=>`<div class="fr${i?'':' cur'}" data-fr="${i}"><span class="n">${i+1}</span><img src="${p.img}" alt=""><span class="bb zh">?</span></div>`).join('')}</div>
 <div class="mstory"><div class="sit"></div><div class="ln"></div><div class="mreply"></div><div class="mmfb"></div></div>
 <div class="center"><div class="v4ok v4need" style="margin-top:8px">ทำให้ครบทั้ง ${P.length} ภาพ</div></div>`,
 show:st=>{let c=0,busy=0;const i0=E.i;const ok=()=>E.i===i0&&here(st);
  const draw=()=>{const p=P[c];$$('.mstrip .fr',st).forEach((f,j)=>f.classList.toggle('cur',j===c));$('.mstory .sit',st).innerHTML=`<b>ภาพที่ ${c+1}</b> ${p.sit}`;
   $('.mstory .ln',st).innerHTML=p.line?dlgH([p.line],{noTh}):'';$('.mstory .mreply',st).innerHTML=p.opts.map((r,i)=>rOpt(r,i,noTh)).join('');fbBox(st,'');
   if(p.line&&!quiet())setTimeout(()=>{if(ok())play(p.line.k)},400)};
  draw();
  $('.mstory',st).addEventListener('click',async e=>{const b=e.target.closest('[data-so]');if(!b||busy)return;const p=P[c],i=+b.dataset.so,a=p.opts[p.ans];busy=1;
   if(i===p.ans){b.classList.add('ok');const f=$(`.mstrip [data-fr="${c}"]`,st);f.classList.add('done');$('.bb',f).textContent=a.zh.replace(/[！。？，]/g,'');fbBox(st,`ถูกต้อง · <span class="zh">${a.zh}</span> ${a.th}`);
    await wait(Math.max(play(a.k),600)+250);if(!ok())return;if(++c<P.length){draw();busy=0}else{doneOk(st,o.done||'ครบทุกภาพแล้ว');busy=0}}
   else{b.classList.add('bad');const r=$(`.mstory [data-so="${p.ans}"]`,st);r.classList.add('ok');fbBox(st,`ยังไม่ใช่ · คำตอบคือ <span class="zh">${a.zh}</span>${noTh?'':' '+a.th} · ${p.why||''} ลองภาพเดิมอีกครั้ง`);
    await wait(Math.max(play(a.k),600)+900);if(!ok())return;draw();busy=0}})},
 onPlay:b=>{bump(b);play(b.dataset.play)},
 solve:async()=>{for(let j=0;j<P.length;j++){const b=$(`#stage .mstory [data-so="${P[j].ans}"]`);if(b)b.click();for(let t=0;t<40;t++){await wait(200);const f=$(`#stage .mstrip [data-fr="${j}"]`);if(f&&f.classList.contains('done')&&(j===P.length-1||$(`#stage .mstrip [data-fr="${j+1}"]`).classList.contains('cur'))&&!$(`#stage .mstory [data-so].ok`))break}}await wait(900)},
 demo:async d=>{if(d==='half'||d==='done'){$(`#stage .mstory [data-so="${P[0].ans}"]`).click();await wait(1500)}if(d==='bad'){$(`#stage .mstory [data-so="${P[0].ans?0:1}"]`).click();await wait(300)}await wait(200)}}}
/* 1-3 ชี้ให้ถูกคน: เห็นตัวอักษร + ได้ยินเสียง แล้วแตะคน · ผิด = เฉลยแล้วทำรอบเดิม */
function point(o){const C=o.cards,R=o.rounds,noTh=!!o.noTh;return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'ดูตัวอักษร ฟังเสียง แล้วแตะคนที่ตรงกัน'}</div>
 <div class="mpq"><button class="audio press" data-pp="1">${SPK}</button><span class="zh big">?</span><span class="dots">${R.map(()=>'<i></i>').join('')}</span></div></div>
 <div class="mpt">${C.map((c,i)=>`<button class="press" data-pc="${i}"><img src="${c.img}" alt="">${noTh?'':`<span class="v4lab">${c.th}</span>`}</button>`).join('')}</div>
 <div class="center"><div class="mmfb"></div><div class="v4ok v4need" style="margin-top:6px">ทำให้ครบ ${R.length} รอบ</div></div>`,
 show:st=>{let r=0,busy=0;const i0=E.i;const ok=()=>E.i===i0&&here(st);
  const draw=()=>{const x=R[r];$('.mpq .big',st).textContent=x.zh;$$('.mpq .dots i',st).forEach((d,j)=>d.classList.toggle('on',j<r));$$('.mpt button',st).forEach(b=>b.classList.remove('ok','bad','ans'));fbBox(st,'');if(!quiet())setTimeout(()=>{if(ok())play(x.k)},300)};
  draw();$('[data-pp]',st).addEventListener('click',e=>{bump(e.currentTarget);play(R[r].k)});
  $('.mpt',st).addEventListener('click',async e=>{const b=e.target.closest('[data-pc]');if(!b||busy)return;const x=R[r],i=+b.dataset.pc;busy=1;
   if(i===x.ans){b.classList.add('ok');fbBox(st,`ถูกต้อง · <span class="zh">${x.zh}</span> ${x.py}${noTh?'':' = '+C[x.ans].th}`);await wait(900);if(!ok())return;
    if(++r<R.length){draw();busy=0}else{$$('.mpq .dots i',st).forEach(d=>d.classList.add('on'));doneOk(st,o.done||'ครบทุกรอบแล้ว');busy=0}}
   else{b.classList.add('bad');$(`.mpt [data-pc="${x.ans}"]`,st).classList.add('ans');fbBox(st,`ยังไม่ใช่ · <span class="zh">${x.zh}</span> คือคนนี้${x.why?' · '+x.why:''} ลองรอบเดิมอีกครั้ง`);await wait(1800);if(!ok())return;draw();busy=0}})},
 solve:async()=>{for(const x of R){$(`#stage .mpt [data-pc="${x.ans}"]`).click();await wait(1050)}},
 demo:async d=>{if(d==='half'||d==='done'){$(`#stage .mpt [data-pc="${R[0].ans}"]`).click();await wait(300)}if(d==='bad'){$(`#stage .mpt [data-pc="${(R[0].ans+1)%C.length}"]`).click();await wait(300)}await wait(200)}}}
/* เรียงคำเป็นประโยค: แตะคำตามลำดับ · ผิด = ไฮไลต์คำที่ถูกแล้วแตะใหม่ */
function order(o){const T=o.tiles,A=o.ans,noTh=!!o.noTh,S=shuf(T.map((_,i)=>i),T.map(t=>t.zh).join('')+'o');return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'แตะคำเรียงเป็นประโยค'}</div>
 ${noTh?'':`<div class="mordth">${o.th}</div>`}<button class="audio press" style="width:64px;height:64px;margin-top:8px" data-oa="1">${SPK}</button></div>
 <div class="mslots">${A.map((_,j)=>`<span class="sl" data-sl="${j}"></span>`).join('')}<span class="pu zh">${o.end||''}</span></div>
 <div class="mtiles">${S.map(i=>`<button class="press" data-ot="${i}"><span class="zh">${T[i].zh}</span><span class="py">${T[i].py}</span></button>`).join('')}</div>
 <div class="center"><div class="mmfb"></div><div class="v4ok v4need" style="margin-top:6px">เรียงให้ครบทั้งประโยค</div></div>`,
 show:st=>{let pos=0,busy=0;const i0=E.i;$('[data-oa]',st).addEventListener('click',e=>{bump(e.currentTarget);play(o.k)});if(noTh&&!quiet())setTimeout(()=>{if(E.i===i0&&here(st))play(o.k)},450);
  $('.mtiles',st).addEventListener('click',async e=>{const b=e.target.closest('[data-ot]');if(!b||busy||b.classList.contains('used'))return;const i=+b.dataset.ot;$$('.mtiles button',st).forEach(x=>x.classList.remove('hint'));
   if(T[i].zh===T[A[pos]].zh){b.classList.add('used');const s=$(`.mslots [data-sl="${pos}"]`,st);s.innerHTML=`<span class="zh">${T[i].zh}</span><span class="py">${T[i].py}</span>`;s.classList.add('on');fbBox(st,'');
    if(++pos===A.length){busy=1;$('.mslots',st).classList.add('done');doneOk(st,o.done||'ถูกต้อง ฟังทั้งประโยค');await wait(250);if(E.i===i0)play(o.k)}}
   else{b.classList.remove('no');void b.offsetWidth;b.classList.add('no');const c=$$('.mtiles button',st).find(x=>!x.classList.contains('used')&&T[+x.dataset.ot].zh===T[A[pos]].zh);if(c)c.classList.add('hint');
    fbBox(st,`ยังไม่ใช่ · คำถัดไปคือ <span class="zh">${T[A[pos]].zh}</span> ${T[A[pos]].py} แตะคำที่กระพริบ`)}})},
 solve:async()=>{for(const j of A){const b=$$('#stage .mtiles button').find(x=>!x.classList.contains('used')&&T[+x.dataset.ot].zh===T[j].zh);if(b)b.click();await wait(120)}},
 demo:async d=>{const b=$$('#stage .mtiles button').find(x=>T[+x.dataset.ot].zh===T[A[0]].zh);if(d==='half'||d==='done')b.click();if(d==='bad'){const w2=$$('#stage .mtiles button').find(x=>T[+x.dataset.ot].zh!==T[A[0]].zh);w2.click()}await wait(300)}}}
/* 1-4 เรียงบทสนทนา: แตะฟองตามลำดับที่ควรพูด · ผิด = ไฮไลต์ฟองที่ถูกแล้วแตะใหม่ */
function lineup(o){const L=o.lines,noTh=!!o.noTh,S=shuf(L.map((_,i)=>i),L.map(l=>l.zh).join('')+'lu');const same=(a,b)=>a.zh===b.zh&&a.who===b.who;return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'แตะฟองเรียงตามลำดับที่ควรพูด'}</div>${o.sit?`<div class="msit" style="margin-top:6px">${o.sit}</div>`:''}</div>
 <div class="dlgwrap mdlg mlu">${L.map((_,j)=>`<div class="luslot" data-ls="${j}"><span>${j+1}</span></div>`).join('')}</div>
 <div class="mlupool">${S.map(i=>{const d=L[i],W=WHO[d.who];return `<button class="press" data-lp="${i}"><img src="${W.img}" alt=""><span class="zh">${d.zh}</span><span class="py">${d.py}</span>${noTh?'':`<small>${d.th}</small>`}</button>`}).join('')}</div>
 <div class="center"><div class="mmfb"></div><div class="v4ok v4need" style="margin-top:6px">เรียงให้ครบ ${L.length} ประโยค</div></div>`,
 show:st=>{let pos=0,busy=0;const i0=E.i;
  $('.mlupool',st).addEventListener('click',async e=>{const b=e.target.closest('[data-lp]');if(!b||busy||b.classList.contains('used'))return;const i=+b.dataset.lp;$$('.mlupool button',st).forEach(x=>x.classList.remove('hint'));
   if(same(L[i],L[pos])){b.classList.add('used');const s=$(`.mlu [data-ls="${pos}"]`,st);s.outerHTML=lineH(L[pos],{noTh});fbBox(st,'');busy=1;const ms=play(L[pos].k);
    if(++pos===L.length){doneOk(st,o.done||'เรียงบทสนทนาได้ครบแล้ว')}await wait(Math.min(ms,900));busy=0}
   else{b.classList.remove('no');void b.offsetWidth;b.classList.add('no');const c=$$('.mlupool button',st).find(x=>!x.classList.contains('used')&&same(L[+x.dataset.lp],L[pos]));if(c)c.classList.add('hint');
    fbBox(st,`ยังไม่ใช่ · ประโยคที่ ${pos+1} คือ <span class="zh">${L[pos].zh}</span> แตะฟองที่กระพริบ`)}})},
 onPlay:b=>{$$('#stage .dbub').forEach(x=>x.classList.remove('on'));b.classList.add('on');const ms=play(b.dataset.play);setTimeout(()=>b.classList.remove('on'),ms+200)},
 solve:async()=>{for(let j=0;j<L.length;j++){const b=$$('#stage .mlupool button').find(x=>!x.classList.contains('used')&&same(L[+x.dataset.lp],L[j]));if(b)b.click();await wait(1000)}},
 demo:async d=>{const f=()=>$$('#stage .mlupool button').find(x=>same(L[+x.dataset.lp],L[0]));if(d==='half'||d==='done'){f().click();await wait(400)}if(d==='bad'){$$('#stage .mlupool button').find(x=>!same(L[+x.dataset.lp],L[0])).click();await wait(300)}await wait(200)}}}
/* 1-5 บัตรชื่อของฉัน: พิมพ์ชื่อตัวเองลงบัตร แล้วดูประโยค 我叫… */
function namecard(o){return {kind:'teach',lock:true,html:()=>`${tag(o.n,o.cap||'ลองเอง')}<div class="center"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text}</p></div>
 <div class="mnc"><div class="hd"><span class="zh">名字</span><span class="py">míngzi</span><span class="v4lab">ชื่อ</span></div><input class="in" maxlength="14" placeholder="พิมพ์ชื่อของคุณ" aria-label="ชื่อของคุณ" autocomplete="off"><div class="smp">${o.names.map((x,i)=>`<button class="press" data-nm="${i}"><span class="zh">${x.zh}</span><small>${x.py}</small></button>`).join('')}</div></div>
 <div class="mncs"><div class="zh s">我叫 <b class="nm">＿＿</b>。</div><div class="py">wǒ jiào <b class="nmp">＿＿</b>.</div><div class="th">ฉันชื่อ <b class="nmt">＿＿</b></div><button class="mbtn2 press" data-ncp="1">${SPK}ฟัง 我叫</button></div>
 <div class="center"><div class="v4ok v4need" style="margin-top:10px">พิมพ์ชื่อ หรือแตะชื่อตัวอย่าง</div></div>`,
 show:st=>{const inp=$('.in',st);let k=o.k;const set=(zh,py,th,kk)=>{$('.nm',st).textContent=zh||'＿＿';$('.nmp',st).textContent=py||'＿＿';$('.nmt',st).textContent=th||'＿＿';k=kk||o.k;
   if(zh){$('.mncs',st).classList.add('on');doneOk(st,o.done||'บัตรชื่อเสร็จแล้ว ลองพูดประโยคนี้ดัง ๆ')}};
  inp.addEventListener('input',()=>{const v=inp.value.trim();$$('.smp button',st).forEach(b=>b.classList.remove('on'));set(v,v,v,o.k)});
  $('.smp',st).addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;const x=o.names[+b.dataset.nm];$$('.smp button',st).forEach(y=>y.classList.toggle('on',y===b));inp.value='';set(x.zh,x.py,x.th,x.k);bump(b);play(x.k)});
  $('[data-ncp]',st).addEventListener('click',e=>{bump(e.currentTarget);play(k)})},
 solve:async()=>{const b=$('#stage .smp button');if(b)b.click();await wait(200)},
 demo:async d=>{if(d==='done'){const i=$('#stage .in');i.value='มะลิ';i.dispatchEvent(new Event('input'))}await wait(200)}}}
/* 1-6 ใครมาจากไหน: ฟังคนแนะนำตัว แล้วแตะแผนที่ประเทศ · ผิด = เฉลยแล้วฟังใหม่ */
function sortmap(o){const I=o.items,B=o.bins,noTh=!!o.noTh;return {kind:'teach',lock:true,html:()=>`<div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.q||'ฟังแต่ละคนแนะนำตัว แล้วแตะประเทศของเขา'}</div></div>
 <div class="msrt"><div class="who"><span class="n"></span><img src="" alt=""><button class="audio press" data-sp="1">${SPK}</button><div class="said"></div></div>
 <div class="bins">${B.map((b,i)=>`<button class="press" data-bn="${i}"><img src="${b.img}" alt=""><span class="zh">${b.zh}</span><span class="py">${b.py}</span>${noTh?'':`<span class="v4lab">${b.th}</span>`}<span class="ppl"></span></button>`).join('')}</div></div>
 <div class="center"><div class="mmfb"></div><div class="v4ok v4need" style="margin-top:6px">ทำให้ครบ ${I.length} คน</div></div>`,
 show:st=>{let c=0,busy=0;const i0=E.i;const ok=()=>E.i===i0&&here(st);
  const draw=()=>{const x=I[c];$('.msrt .who img',st).src=x.img;$('.msrt .n',st).textContent=`คนที่ ${c+1}/${I.length}`;$('.msrt .said',st).innerHTML='';$$('.bins button',st).forEach(b=>b.classList.remove('ok','bad','ans'));fbBox(st,'');if(!quiet())setTimeout(()=>{if(ok())play(x.k)},350)};
  draw();$('[data-sp]',st).addEventListener('click',e=>{bump(e.currentTarget);play(I[c].k)});
  $('.bins',st).addEventListener('click',async e=>{const b=e.target.closest('[data-bn]');if(!b||busy)return;const x=I[c],i=+b.dataset.bn;busy=1;
   $('.msrt .said',st).innerHTML=`<span class="zh">${x.zh}</span><span class="py">${x.py}</span>${noTh?'':`<small>${x.th}</small>`}`;
   if(i===x.bin){b.classList.add('ok');$('.ppl',b).insertAdjacentHTML('beforeend',`<img src="${x.img}" alt="">`);fbBox(st,'ถูกต้อง');await wait(1000);if(!ok())return;
    if(++c<I.length){draw();busy=0}else{doneOk(st,o.done||'ครบทุกคนแล้ว');busy=0}}
   else{b.classList.add('bad');$(`.bins [data-bn="${x.bin}"]`,st).classList.add('ans');fbBox(st,`ยังไม่ใช่ · เขาพูดว่า <span class="zh">${x.zh}</span> ฟังอีกครั้งแล้วลองใหม่`);play(x.k);await wait(2000);if(!ok())return;draw();busy=0}})},
 solve:async()=>{for(const x of I){$(`#stage .bins [data-bn="${x.bin}"]`).click();await wait(1150)}},
 demo:async d=>{if(d==='half'||d==='done'){$(`#stage .bins [data-bn="${I[0].bin}"]`).click();await wait(300)}if(d==='bad'){$(`#stage .bins [data-bn="${I[0].bin?0:1}"]`).click();await wait(300)}await wait(200)}}}
/* ถูกหรือไม่ถูก: บัตรข้อมูลคน + ฟังประโยค */
function tf(o){const s=ask({tag:o.tag,q:o.q||'ฟังประโยค แล้วดูบัตร ถูกหรือไม่ถูก',k:o.k,noTh:o.noTh,
  show:`<div class="mtf"><img class="p" src="${o.img}" alt=""><div class="i">${o.card}</div></div>`,opts:['ถูก','ไม่ถูก'],ans:o.ans,fb:o.fb});return s}
/* เติมคำในช่องว่าง */
function blank(o){const s=ask({tag:o.tag,q:o.q||'เลือกคำเติมในช่องว่าง',k:o.k,noTh:o.noTh,
  show:`<div class="mblank"><div class="zh s">${o.s.replace('_','<span class="sl">？</span>')}</div>${o.noTh?'':`<div class="th">${o.th}</div>`}</div>`,
  opts:o.opts.map(x=>`<span class="zh">${x}</span>`),ans:o.ans,fb:o.fb});
 s.after=ok=>{if(ok){const sl=$('#stage .mblank .sl');if(sl){sl.textContent=o.opts[o.ans];sl.classList.add('on')}}if(o.k&&!quiet())setTimeout(()=>play(o.k),250)};return s}

/* คำ 3 พยางค์: รวมพยางค์กับเส้นเสียงไว้ในช่องเดียว ไม่ให้ล้นการ์ด */
function aidW(a){if(!a||!a.parts||a.parts.length<=4)return a;const ps=a.parts,pr=[];for(let i=0;i<ps.length;i+=2)pr.push([ps[i],ps[i+1]]);
 return Object.assign({},a,{parts:null,html:`<div class="parts p3">${pr.map(([y,t])=>`<span>${t?contour(t):'<small>เบา</small>'}<b>${y}</b></span>`).join('<i>+</i>')}</div>`})}
