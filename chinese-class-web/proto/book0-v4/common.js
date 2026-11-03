/* ต้นแบบวิธีสอน v4 · ใช้ CSS และส่วนประกอบเดิมของแอป (หน้าบทเรียน) · ไม่ผูกกับแอปจริง */
const Q=new URLSearchParams(location.search);
const SHOT=Q.has('s')?+Q.get('s'):null,DEMO=Q.get('d')||'';
const TOPW=(()=>{try{return window.top.__film?window.top:window}catch(e){return window}})();
const FILM=TOPW!==window;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
/* เสียง: s = ช้า (สอน) · ปกติ = ไฟล์เดิมในแอป · m = เสียงผู้ชาย · th_ = เสียงไทยเทียบ */
const ON={s:280,m:245,n:190,th:275};
function sndOn(k){if(k.startsWith('w:')||k.startsWith('g:'))return ON.n;return k.startsWith('th_')?ON.th:k.endsWith('-s')?ON.s:k.endsWith('-m')?ON.m:ON.n}
function clipSrc(k){const c=window.CLIPS&&CLIPS[k];return c?c[0]:'audio/'+k+'.mp3'}
function clipDur(k){const c=window.CLIPS&&CLIPS[k];return c?c[1]:((window.DUR&&DUR[k])||1.9)}
function play(k){const src=clipSrc(k);(window.__played=window.__played||[]).push(k);
  if(FILM){if(TOPW.__quiet)return Math.round(clipDur(k)*1000);(TOPW.__aud=TOPW.__aud||[]).push([TOPW.performance.now()/1000,'proto:'+k])}
  else if(SHOT==null){try{if(window.__au)window.__au.pause();const a=new Audio(src);window.__au=a;a.play().catch(()=>{})}catch(e){}}
  return Math.round(clipDur(k)*1000)}
const TONE=[null,
 {n:1,py:'mā',zh:'妈',th:'แม่',nm:'เสียง 1',ds:'ระดับสูง',long:'สูงเรียบ ยาว ๆ เหมือนร้องโน้ตสูงค้างไว้',p:'M14 22 L86 22'},
 {n:2,py:'má',zh:'麻',th:'ป่าน',nm:'เสียง 2',ds:'ขึ้น',long:'เริ่มกลาง ๆ แล้วไต่ขึ้นสูง เหมือนตอนถามด้วยความสงสัย',p:'M14 56 L86 20'},
 {n:3,py:'mǎ',zh:'马',th:'ม้า',nm:'เสียง 3',ds:'ลงแล้วขึ้น',long:'กดต่ำลงก่อน แล้วค่อยยกขึ้นเล็กน้อยตอนท้าย',p:'M14 52 L44 82 L86 30'},
 {n:4,py:'mà',zh:'骂',th:'ด่า',nm:'เสียง 4',ds:'ตกเร็ว',long:'เริ่มสูงแล้วตกลงเร็ว ๆ สั้น ๆ หนักแน่น',p:'M14 18 L86 84'}];
const RULE=[18,34,50,66,82].map(y=>`<line x1="8" y1="${y}" x2="92" y2="${y}" stroke="#EFE7DC" stroke-width="1.4"/>`).join('');
/* เส้นเสียงแบบเดียวกับแอป (l1Contour) + เส้นนำทาง/จุดเคลื่อนที่สำหรับภาพเคลื่อนไหว */
function contour(t,o={}){const T=TONE[t];
 return `<svg class="l1ct ${o.cls||''}" viewBox="0 0 100 100" aria-hidden="true">${RULE}
 ${o.guide?`<path d="${T.p}" fill="none" stroke="#E6DCCF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.1 12"/>`:''}
 <path class="cl" d="${T.p}" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" ${o.hide?'style="opacity:0"':''}/>
 ${o.dot?`<circle class="dt" r="6.5" fill="#fff" stroke="currentColor" stroke-width="3" style="opacity:0"/>`:''}</svg>`}
/* วาดเส้นตามเสียง: เริ่มเมื่อเสียงเริ่มดัง */
function drawLine(svg,ms=700,delay=0){if(!svg)return;const p=$('.cl',svg),d=$('.dt',svg),L=p.getTotalLength();
 p.style.opacity=1;p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
 const t0=performance.now()+delay;if(d)d.style.opacity=0;
 const f=now=>{let k=Math.min(1,Math.max(0,(now-t0)/ms));const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  p.style.strokeDashoffset=L*(1-e);if(d&&now>=t0){const pt=p.getPointAtLength(L*e);d.setAttribute('cx',pt.x);d.setAttribute('cy',pt.y);d.style.opacity=k<1?1:0}
  if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function sayTone(k,svg,lineMs=720){const ms=play(k);if(svg)drawLine(svg,lineMs,sndOn(k));return ms}
const SPK=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"></path><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"></path></svg>`;
const mas=n=>`<img class="mas" src="../../assets/mascot/${n}.webp" alt="" draggable="false">`;
function bump(el){if(!el)return;el.classList.remove('playing');void el.offsetWidth;el.classList.add('playing');setTimeout(()=>el.classList.remove('playing'),1300)}

/* ---------- ตัวเดินบทเรียน (เส้นตรง ทีละขั้น ไม่มีข้าม) ---------- */
const E={i:0,steps:[],busy:false};
function shell(){document.body.innerHTML=`<div id="frame"><div id="stack"><section class="screen pushed" data-name="lesson">
 <div class="seshnav"><button class="x" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i id="pg"></i></div><div class="cap" id="pc" style="font-weight:600;color:var(--red);min-width:40px;text-align:right"></div></div>
 <div class="scroller"><div class="stage" id="stage"></div></div><div class="dock" id="dock"></div><div class="fb" id="fb"></div></section></div></div><div id="finger"></div>`}
function dock(label='ต่อไป',on=true,cls=''){$('#dock').innerHTML=`<button class="pill row1 press ${cls} ${on?'':'v4off'}" data-sa="next">${label}</button>`}
function unlock(){const b=$('#dock .pill');if(b)b.classList.remove('v4off')}
function go(i){E.i=i;const s=E.steps[i],N=E.steps.length;
 $('#pg').style.width=(i/(N-1)*100)+'%';$('#pc').textContent=`${i+1} / ${N}`;
 $('#fb').classList.remove('show');$('#fb').innerHTML='';
 const st=$('#stage');st.innerHTML=s.html();st.classList.remove('v4in');void st.offsetWidth;st.classList.add('v4in');oneLlama(st);
 $('.scroller').scrollTop=0;
 if(s.kind==='q'){$('#dock').innerHTML='';E.q={tries:0,s}}else dock(s.btn||'ต่อไป',!s.lock,s.btnCls||'');
 if(s.show)s.show(st);document.body.dataset.step=i}
function next(){if(E.i<E.steps.length-1)go(E.i+1);else{document.body.dataset.done=1;if(!window.__walk)location.href='index.html'}}
/* คำถาม: ตอบถูก → ต่อไป · ตอบผิด → เฉลยแล้วทำข้อเดิมอีกครั้ง (ไม่ข้ามไปไหน) */
function answer(i){const s=E.steps[E.i];if(s.kind!=='q'||$('#fb').classList.contains('show'))return;
 const ok=i===s.ans;$$('#stage .opt').forEach(b=>{const k=+b.dataset.i;b.classList.toggle('ok',k===s.ans);b.classList.toggle('bad',k===i&&!ok);b.classList.toggle('dim',k!==i&&k!==s.ans)});
 const qm=$('#qm');if(qm)qm.style.visibility='hidden';
 const fb=$('#fb');fb.innerHTML=`<div class="grabber"></div><div class="fh"><div class="t"><b style="color:var(${ok?'--ok':'--warn'})">${ok?'ถูกต้อง':'ยังไม่ใช่'}</b><small>${ok?'ทำได้ดี':'ฟังเฉลยแล้วลองข้อเดิมอีกครั้ง'}</small></div>${hasLlama($('#stage'))?'':`<div style="width:84px;height:84px">${mas(ok?'correct':'think')}</div>`}</div>
 <div class="ans">${s.fb(ok)}</div><button class="pill row1 press ${ok?'ok':''}" style="height:52px;border-radius:26px;margin-top:14px" data-sa="${ok?'next':'retry'}">${ok?'ต่อไป':'ลองอีกครั้ง'}</button>`;
 requestAnimationFrame(()=>fb.classList.add('show'));if(s.after)s.after(ok,fb)}
document.addEventListener('click',e=>{if(e.target.closest('.seshnav .x')){location.href='index.html';return}const b=e.target.closest('[data-sa],[data-i],[data-play]');if(!b)return;
 if(b.dataset.sa==='next'){if(b.classList.contains('v4off')){bump($('#stage .v4need'));return}next()}
 else if(b.dataset.sa==='retry')go(E.i);
 else if(b.dataset.play){const s=E.steps[E.i];if(s.onPlay)s.onPlay(b);else{bump(b);sayTone(b.dataset.play,b.dataset.svg?$(b.dataset.svg):null)}}
 else if(b.dataset.i!=null&&b.classList.contains('opt'))answer(+b.dataset.i)});
async function start(steps){shell();E.steps=steps;await document.fonts.ready;
 const s0=SHOT!=null?SHOT-1:0;go(s0);
 if(SHOT!=null){const s=E.steps[s0];if(s.demo)await s.demo(DEMO);await wait(1300);document.body.dataset.ready=1}
 window.P={tap,go,next,answer,E,$,$$,wait,sayTone,play,drawLine,unlock};document.body.dataset.loaded=1}

/* ---------- ส่วนประกอบที่ใช้ซ้ำ ---------- */
const qTone=(o)=>({kind:'q',tag:o.tag,ans:o.opts.indexOf(o.t),auto:o.k,
 html:()=>`<div class="qm" id="qm">${mas('think')}</div><div class="center"><div class="cap v4tag">${o.tag}</div><div class="cap" style="font-size:14px;margin-top:2px">${o.prompt||'ฟังเสียง แล้วเลือกเส้นเสียง'}</div>
  <button class="audio press" aria-label="ฟังเสียง" style="width:84px;height:84px;margin-top:10px" data-play="${o.k}">${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div></div>
  <div class="pgrid ${o.opts.length===2?'v4two':o.opts.length===3?'v4three':''}">${o.opts.map((t,i)=>`<button class="opt ptile press tc${t}" data-i="${i}"><span class="k">${'ABCD'[i]}</span>${contour(t,{cls:'pic-t'})}<span class="l1tl">${TONE[t].py}</span>${o.hint?`<small class="v4hint">${o.hint(t)}</small>`:''}</button>`).join('')}</div>`,
 show:st=>{setTimeout(()=>{if(!TOPW.__quiet&&E.steps[E.i].auto===o.k){const b=$('[data-play]',st);bump(b);play(o.k)}},450)},
 fb:ok=>{const T=TONE[o.t];return `<b class="t${o.t}">${T.py}</b> <span class="zh">${T.zh}</span> = ${T.th} · ${T.nm} ${T.ds}`},
 demo:async d=>{if(d==='ok')answer(o.opts.indexOf(o.t));if(d==='bad')answer(o.opts.indexOf(o.t)===0?1:0);await wait(600)}});

/* วิดีโอ: แสดงนิ้วแตะ แล้วคลิกจริง */
async function tap(sel){const el=typeof sel==='string'?$(sel):sel;if(!el)return;const r=el.getBoundingClientRect(),f=$('#finger');
 const x=r.left+r.width/2,y=r.top+r.height/2;const was=+f.style.opacity;f.style.transition=was?'transform .45s cubic-bezier(.3,.7,.3,1),opacity .2s':'opacity .2s';f.style.transform=`translate(${x}px,${y+(was?0:40)}px)`;f.style.opacity=1;
 if(!was){await wait(30);f.style.transition='transform .45s cubic-bezier(.3,.7,.3,1),opacity .2s';f.style.transform=`translate(${x}px,${y}px)`}
 await wait(340);f.classList.add('down');await wait(120);el.click();await wait(100);f.classList.remove('down');
 clearTimeout(tap.h);tap.h=setTimeout(()=>{f.style.opacity=0},900)}

/* owner rule: at most one llama per screen */
const LLAMA_ART=['一起','不客气','你好','再见','去','吃','喝','快','热','谢谢','饿'];
function oneLlama(st){const im=[...st.querySelectorAll('img')].filter(i=>LLAMA_ART.some(n=>decodeURIComponent(i.getAttribute('src')||'').endsWith('/'+n+'.webp')));
 if(!im.length)return;const qm=document.getElementById('qm');if(qm)qm.remove();if(im.length<2)return;
 const grp=im[0].closest('.mcards3');if(grp){grp.querySelectorAll('img').forEach(i=>i.style.display='none');grp.classList.add('nopic')}
 else im.slice(1).forEach(i=>{const b=i.closest('.mpic')||i;b.style.display='none'})}
function hasLlama(st){return [...st.querySelectorAll('img')].some(i=>i.offsetWidth&&LLAMA_ART.some(n=>decodeURIComponent(i.getAttribute('src')||'').endsWith('/'+n+'.webp')))}
