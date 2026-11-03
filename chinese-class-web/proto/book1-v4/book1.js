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
