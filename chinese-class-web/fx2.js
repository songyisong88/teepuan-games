/* fx2.js — แอนิเมชันรอบที่ 2 (ซ้งอี้อนุมัติ 31 ต.ค. 2026: ทุกข้อยกเว้น R01)
   เพิ่มเฉพาะการเคลื่อนไหวบนหน้าจอเดิม ไม่เปลี่ยนโครงสร้าง/เลย์เอาต์/การนำทาง · ไม่ซูม/ไม่เด้งทั้งหน้า
   ไม่มีเอฟเฟกต์ตอบถูก/คอมโบ (A01/A03 ไม่อนุมัติ) · เลเยอร์ #fx2 ไม่รับการแตะ
   prefers-reduced-motion: ทุกฟังก์ชันตรวจ RM() เองทุกครั้ง แล้วใช้แบบนิ่ง/จางแทน
   ทุกจุดเชื่อมห่อด้วย try/catch — ถ้าหา DOM ไม่เจอจะไม่ทำอะไร พฤติกรรมเดิมทำงานตามปกติ */
(function(){
'use strict';
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const F=()=>document.querySelector('#frame');
const $1=(s,r)=>(r||document).querySelector(s),$A=(s,r)=>[...(r||document).querySelectorAll(s)];
const EZ='cubic-bezier(.2,.8,.2,1)',SPR='cubic-bezier(.34,1.56,.64,1)';
const A=(el,k,o)=>{try{return el.animate(k,Object.assign({duration:300,easing:EZ,fill:'none'},o))}catch(e){return null}};
const T=fn=>function(){try{return fn.apply(this,arguments)}catch(e){console.error('[fx2]',e)}};
function layer(){let l=$1('#fx2');if(!l){const f=F();if(!f)return null;l=document.createElement('div');l.id='fx2';f.appendChild(l)}return l}
const fr=()=>{const f=F();return f?f.getBoundingClientRect():{left:0,top:0,width:innerWidth,height:innerHeight}};
const rel=r=>{const f=fr();return {x:r.left-f.left,y:r.top-f.top,w:r.width,h:r.height,cx:r.left-f.left+r.width/2,cy:r.top-f.top+r.height/2}};
const mk=(cls,html,par)=>{const d=document.createElement('div');d.className=cls;if(html)d.innerHTML=html;(par||layer()).appendChild(d);return d};
const kill=(el,ms)=>setTimeout(()=>{try{el.remove()}catch(e){}},ms);
const vis=(el,sc)=>{const r=el.getBoundingClientRect();if(!r.width&&!r.height)return false;const b=(sc||F()).getBoundingClientRect();return r.bottom>b.top&&r.top<b.bottom};
const top=()=>$1('#stack>.screen:last-child');
const X2={};window.FX2=X2;

/* ---------- ตรวจจับหน้าจอใหม่ (push/replace/mountRoot/refresh) ---------- */
const onScr=[];const seen=new Set();
function scrAdded(el){if(!el||!el.classList||!el.classList.contains('screen'))return;const n=el.dataset.name||'';onScr.forEach(f=>{try{f(el,n)}catch(e){console.error('[fx2]',e)}})}
function watch(){const st=$1('#stack');if(!st)return;new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(scrAdded))).observe(st,{childList:true});$A('.screen',st).forEach(scrAdded)}

/* ---------- R05 ปุ่มหลักกดยุบลงแบบมีน้ำหนัก + ระลอกจากจุดแตะ ---------- */
const PRI='.pill:not([disabled]):not(.hb-dis),.hg-qa .go';
function pressDown(e){const b=e.target.closest&&e.target.closest('.pill,.hg-qa');if(!b||b.disabled)return;
 const t=b.classList.contains('hg-qa')?$1('.go',b):b;if(!t||!t.matches(PRI))return;
 if(RM()){A(t,[{filter:'brightness(.9)'},{filter:'brightness(.9)'}],{duration:180,fill:'none'});return}
 const r=t.getBoundingClientRect();
 t.__x2a&&t.__x2a.cancel();t.__x2a=A(t,[{translate:'0 0'},{translate:'0 3px'}],{duration:100,easing:'ease-out',fill:'forwards'});
 let w=t.querySelector(':scope>.x2-rw');if(!w){w=document.createElement('span');w.className='x2-rw';t.appendChild(w)}
 const rp=document.createElement('i');const s=Math.max(r.width,r.height)*2.2,x=(e.clientX||r.left+r.width/2)-r.left,y=(e.clientY||r.top+r.height/2)-r.top;
 rp.style.cssText=`width:${s}px;height:${s}px;left:${x-s/2}px;top:${y-s/2}px`;w.appendChild(rp);
 A(rp,[{transform:'scale(0)',opacity:.55},{transform:'scale(1)',opacity:0}],{duration:520,easing:'cubic-bezier(.2,.6,.3,1)',fill:'forwards'});kill(rp,560);
 const up=()=>{removeEventListener('pointerup',up,true);removeEventListener('pointercancel',up,true);
  const a=t.__x2a;t.__x2a=A(t,[{translate:'0 3px'},{translate:'0 -1px',offset:.45},{translate:'0 0'}],{duration:350,easing:SPR});if(a)a.cancel()};
 addEventListener('pointerup',up,true);addEventListener('pointercancel',up,true)}

/* ---------- R03 เนื้อหาไหลขึ้นทีละบล็อก (ครั้งแรกในรอบการใช้งาน) ---------- */
const STG={games:1,arcade:1,prac:1,path:1,me:1,shop:1};
function staggerItems(sc,name){const out=[];
 if(name==='path'){$A('.lc-ch,.lc-node',sc).forEach(n=>{if(vis(n,sc))out.push(n)});return out.slice(0,12)}
 [...sc.children].forEach(c=>{if(!vis(c,sc))return;if(c.classList.contains('group')||c.classList.contains('lbg')){[...c.children].forEach(r=>vis(r,sc)&&out.push(r))}else out.push(c)});return out.slice(0,12)}
X2.stagger=T((el,name,force)=>{if(RM())return;const sc=$1('.scroller',el);if(!sc)return;
 if(!force){if(seen.has('st:'+name))return;seen.add('st:'+name)}
 if(name==='path'){const m=$1('.lc-map',sc);if(m&&m.style.pointerEvents==='none')return;const c=$1('.lc-node.cur,.l1row.cur',sc);if(c&&!sc.scrollTop&&c.getBoundingClientRect().top-sc.getBoundingClientRect().top-sc.clientHeight*.42>120)return}/* หน้าแผนที่จะเลื่อนไปบทปัจจุบันเอง *//* กำลังเล่น A05 ปลดล็อกแผนที่ */
 const items=staggerItems(sc,name);const gap=Math.min(55,Math.floor(450/Math.max(1,items.length)));
 items.forEach((n,i)=>{if(n.getAnimations&&n.getAnimations().length)return;
  A(n,[{opacity:0,translate:'0 22px'},{opacity:1,translate:'0 0'}],{duration:320,delay:i*gap,fill:'backwards'});
  const ic=$1(':scope>.ic,:scope>.gi,:scope .ic,:scope .gi',n);if(ic)A(ic,[{scale:'.6'},{scale:'1'}],{duration:340,delay:i*gap+60,easing:SPR,fill:'backwards'})})});

/* ---------- R16 ข้อถัดไปเลื่อนเข้าแทนการกะพริบ ---------- */
function qNext(e){const b=e.target.closest&&e.target.closest('[data-sa=next]');if(!b)return;const scr=b.closest('.screen');const st=scr&&$1('#stage',scr);if(!st||!st.firstElementChild)return;
 const before=st.innerHTML;let cl=null;
 if(!RM()){cl=st.cloneNode(true);cl.removeAttribute('id');$A('[id]',cl).forEach(n=>n.removeAttribute('id'));cl.setAttribute('aria-hidden','true');cl.classList.remove('fade-in');
  cl.style.cssText+=`;position:absolute;left:${st.offsetLeft}px;top:${st.offsetTop}px;width:${st.offsetWidth}px;height:${st.offsetHeight}px;margin:0;pointer-events:none;overflow:hidden;z-index:1`;
  cl.scrollTop=st.scrollTop;}
 setTimeout(T(()=>{if(!st.isConnected||st.innerHTML===before){return}
  if(RM()){A(st,[{opacity:0},{opacity:1}],{duration:150});return}
  st.parentNode.insertBefore(cl,st.nextSibling);cl.scrollTop=0;
  const a=A(cl,[{opacity:1,translate:'0 0'},{opacity:0,translate:'-28px 0'}],{duration:160,easing:'ease-in',fill:'forwards'});kill(cl,200);
  st.classList.remove('fade-in');
  const opts=$A('[data-i],.opt,.chipw,.mcell',st).slice(0,10);const ops=new Set(opts);
  [...st.children].forEach(c=>{if(!ops.has(c))A(c,[{opacity:0,translate:'28px 0'},{opacity:1,translate:'0 0'}],{duration:280,delay:120,fill:'backwards'})});
  opts.forEach((o,i)=>A(o,[{opacity:0,translate:'28px 0'},{opacity:1,translate:'0 0'}],{duration:260,delay:150+i*45,fill:'backwards'}))}),0)}

/* ---------- R02 การ์ดคลังความรู้ขยายเป็นหน้าเต็ม ---------- */
let cxBusy=false;
function cardClick(e){if(e.__x2)return;const c=e.target.closest&&e.target.closest('.kn-c');if(!c||cxBusy||RM())return;
 if(!c.closest('.screen'))return;if(!c.dataset.go&&!c.dataset.act&&!c.getAttribute('data-go'))return;
 e.stopPropagation();e.preventDefault();cxBusy=true;
 const r=rel(c.getBoundingClientRect()),f=fr(),cov=$1('.kn-cov',c),cs=getComputedStyle(c);
 const L=layer();const g=mk('x2-cx');g.style.cssText=`left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;border-radius:${cs.borderRadius};background:${cs.backgroundColor||'#fff'}`;
 if(cov){const cr=rel(cov.getBoundingClientRect());const k=cov.cloneNode(true);k.classList.add('x2-cxc');k.style.cssText+=`;position:absolute;left:${cr.x-r.x}px;top:${cr.y-r.y}px;width:${cr.w}px;height:${cr.h}px;margin:0`;g.appendChild(k);
  const sc2=Math.min(1.5,(f.width*.42)/Math.max(1,cr.w));k.style.transformOrigin='0 0';
  A(k,[{translate:'0 0',scale:'1'},{translate:`${(f.width-cr.w*sc2)/2-(cr.x-r.x)}px ${f.height*.16-(cr.y-r.y)}px`,scale:String(sc2)}],{duration:420,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'})}
 c.style.visibility='hidden';
 A(g,[{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px',borderRadius:cs.borderRadius},{left:'0px',top:'0px',width:f.width+'px',height:f.height+'px',borderRadius:'0px'}],{duration:420,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'});
 setTimeout(T(()=>{c.style.visibility='';const n0=$A('#stack>.screen').length;const ev=new MouseEvent('click',{bubbles:true,cancelable:true});ev.__x2=true;c.dispatchEvent(ev);
  const t=top();if(t&&$A('#stack>.screen').length>=n0){t.getAnimations({subtree:false}).forEach(a=>{try{a.finish()}catch(x){}});$A('#stack>.screen').forEach(s=>s!==t&&s.getAnimations().forEach(a=>{try{a.finish()}catch(x){}}));
   const sc=$1('.scroller',t);if(sc)[...sc.children].slice(0,6).forEach((n,i)=>A(n,[{opacity:0,translate:'0 18px'},{opacity:1,translate:'0 0'}],{duration:300,delay:80+i*50,fill:'backwards'}))}
  A(g,[{opacity:1},{opacity:0}],{duration:220,fill:'forwards'});kill(g,260);cxBusy=false}),430)}

/* ---------- R25 คาราโอเกะในห้องอ่าน ---------- */
let KR=null;
function krStop(){if(!KR)return;const k=KR;KR=null;cancelAnimationFrame(k.raf);try{k.pill.remove()}catch(e){}k.toks.forEach(t=>{t.classList.remove('x2-kw');t.style.translate=''});if(k.book)k.book.classList.remove('x2-kdim');if(k.row){k.row.classList.remove('x2-kon');k.row.querySelectorAll('.al-lit').forEach(e=>e.classList.remove('al-lit'))}}
function aud(){try{return typeof curAudio!=='undefined'?curAudio:null}catch(e){return null}}
X2.karaoke=T(row=>{krStop();if(!row||!row.isConnected)return;const tk=$1('.lbtk',row);if(!tk)return;const toks=$A('.lbt',tk);if(!toks.length)return;
 const book=row.closest('.lbbook');const w=toks.map(t=>Math.max(1,($1('.zh',t)||t).textContent.trim().length));const tot=w.reduce((a,b)=>a+b,0);
 const pill=document.createElement('i');pill.className='x2-kp';tk.appendChild(pill);
 const k=KR={row,toks,book,pill,i:-1,t0:performance.now(),a:null,raf:0};if(book&&!RM())book.classList.add('x2-kdim');row.classList.add('x2-kon');
 const place=i=>{if(i===k.i)return;k.i=i;toks.forEach((t,j)=>{t.classList.toggle('x2-kw',j===i);if(!RM())t.style.translate=j===i?'0 -2px':''});
  const t=toks[i];pill.style.left=t.offsetLeft+'px';pill.style.top=t.offsetTop+'px';pill.style.width=t.offsetWidth+'px';pill.style.height=t.offsetHeight+'px';pill.style.opacity='1';if(RM())pill.style.transition='none';if(row.classList.contains('al-on')){const on=new Set([...t.querySelectorAll('.al')].map(e=>e.dataset.i));row.querySelectorAll('.al').forEach(e=>e.classList.toggle('al-lit',on.has(e.dataset.i)))}};
 let waited=0;
 const tick=()=>{if(KR!==k)return;if(!row.isConnected){krStop();return}
  let p;const a=k.a;
  if(a){if(aud()!==a||a.ended||(a.paused&&a.currentTime>0)){krStop();return}const d=a.duration;p=d>0&&isFinite(d)?a.currentTime/d:(performance.now()-k.t0)/(tot*300+300)}
  else{const el=performance.now()-k.t0;if(el>400&&!speechBusy()){krStop();return}p=el/(tot*300+300)}
  if(p>=1){krStop();return}
  let acc=0,i=0;const at=p*tot;for(;i<w.length-1;i++){if(acc+w[i]>at)break;acc+=w[i]}place(i);k.raf=requestAnimationFrame(tick)};
 {const a=aud();k.a=a&&!a.ended?a:null;if(k.a){const st=()=>{if(KR===k)krStop()};k.a.addEventListener('ended',st,{once:true});k.a.addEventListener('error',st,{once:true})}}k.raf=requestAnimationFrame(tick)});
function speechBusy(){try{return speechSynthesis.speaking||speechSynthesis.pending}catch(e){return false}}
function readerHook(el){const book=$1('#lbbook',el);if(!book)return;
 new MutationObserver(ms=>{for(const m of ms){const r=m.target;if(r.classList&&r.classList.contains('lbs')&&r.classList.contains('hl')&&(!KR||KR.row!==r)){setTimeout(()=>X2.karaoke(r),0);break}}}).observe(book,{attributes:true,attributeFilter:['class'],subtree:true});
 book.addEventListener('click',e=>{const b=e.target.closest('.lbs [data-act=audio]');if(b){const r=b.closest('.lbs');setTimeout(()=>X2.karaoke(r),0);return}if(e.target.closest('[data-tk]'))krStop()});
 el.addEventListener('click',e=>{const r=e.target.closest('[data-rt=all]');if(r&&!r.classList.contains('on'))setTimeout(()=>{if(!r.classList.contains('on'))krStop()},0)})}

/* ---------- R33 เปิดหีบรางวัล: ลุ้น > ระเบิดแสง > เหรียญพุ่งไปที่ตัวเลข ---------- */
let chBusy=false;
function chestClick(e){if(e.__x2)return;const b=e.target.closest&&e.target.closest('.chestb');if(!b||!b.closest('.screen[data-name=chest]'))return;
 if(chBusy){e.stopPropagation();e.preventDefault();return}
 try{if(S.chestDay===today())return}catch(x){return}
 if(typeof b.onclick!=='function'||RM())return;
 e.stopPropagation();e.preventDefault();chBusy=true;
 const all=$A('.chestb',b.parentNode);all.forEach(x=>x!==b&&A(x,[{opacity:1},{opacity:.35}],{duration:250,fill:'forwards'}));
 const sp=$1('span',b)||b;
 A(sp,[0,-4,5,-6,7,-8,8,-8,6,0].map((d,i)=>({rotate:d+'deg',translate:`${i%2?1:-1}px 0`})),{duration:700,easing:'ease-in'});
 A(b,[{boxShadow:'0 0 0 0 rgba(232,182,74,0)'},{boxShadow:'0 0 0 10px rgba(232,182,74,.35),0 0 26px 8px rgba(232,182,74,.55)'}],{duration:700,easing:'ease-in',fill:'forwards'});
 try{navigator.vibrate&&navigator.vibrate([10,90,12,60,14,40,18,25,22])}catch(x){}
 setTimeout(T(()=>{const c0=S.coins;try{b.onclick.call(b,{__x2:true,target:b,currentTarget:b})}catch(x){console.error(x)}
  all.forEach(x=>x.getAnimations().forEach(a=>a.cancel()));chBusy=false;
  const r=rel(b.getBoundingClientRect());
  const ry=mk('x2-rays');const s=220;ry.style.cssText=`left:${r.cx-s/2}px;top:${r.cy-s/2}px;width:${s}px;height:${s}px`;
  A(ry,[{opacity:0,scale:'.3',rotate:'0deg'},{opacity:1,scale:'1',rotate:'40deg',offset:.3},{opacity:0,scale:'1.15',rotate:'110deg'}],{duration:1200,easing:'ease-out',fill:'forwards'});kill(ry,1250);
  const gain=Math.max(0,S.coins-c0);if(!gain)return;
  setTimeout(T(()=>{const tg=$1('#toast.on')||$1('.nav-r .chip.coin',top()||document);if(!tg)return;let tr=rel(tg.getBoundingClientRect());if(tg.id==='toast'){const f=fr();tr={cx:f.width/2,cy:tg.offsetTop+tg.offsetHeight/2}}const n=Math.min(10,Math.max(5,Math.round(gain/6)));
   for(let i=0;i<n;i++){const c=mk('x2-coin');c.style.left=(r.cx-9)+'px';c.style.top=(r.cy-9)+'px';const dx=tr.cx-r.cx,dy=tr.cy-r.cy,sx=(Math.random()-.5)*90;
    A(c,[{translate:'0 0',scale:'.6',opacity:0},{translate:`${sx}px ${-40-Math.random()*40}px`,scale:'1',opacity:1,offset:.3},{translate:`${dx}px ${dy}px`,scale:'.7',opacity:1}],{duration:700,delay:i*55,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'});kill(c,760+i*55)}
   setTimeout(()=>{if(tg.isConnected)A(tg,[{scale:'1'},{scale:'1.08'},{scale:'1'}],{duration:260,easing:SPR})},700+n*55-120)}),250)}),700)}

/* ---------- R36 ลีก: แถวของฉันแซงขึ้นไปจริง ---------- */
const LGK='lama-fx2-lg';
X2.league=T(el=>{if(typeof rankTab==='undefined'||rankTab!==0||typeof lgBoard!=='function')return;
 const b=lgBoard(),wk=typeof wkIdx==='function'&&typeof today==='function'?wkIdx(today()):0;let old=null;try{old=JSON.parse(localStorage.getItem(LGK)||'null')}catch(e){}
 localStorage.setItem(LGK,JSON.stringify({wk,pos:b.pos,xp:b.me.xp}));
 if(!old||old.wk!==wk)return;const rows=$A('.lrow',el),me=$1('.lrow.me',el);if(!me||!rows.length)return;
 const dPos=old.pos-b.pos,dXp=b.me.xp-old.xp;if(dPos<=0&&dXp<=0)return;
 const val=$1('.val',me),rk=$1('.rk',me);const sc=$1('.scroller',el);
 const cnt=(node,from,to,suf,dur,delay)=>{if(!node)return;const t0=performance.now()+delay;node.textContent=from+suf;const f=t=>{const k=Math.min(1,Math.max(0,(t-t0)/dur));node.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
 if(RM()){if(dPos>0)tagUp(me,dPos,true);return}
 const go=()=>{const pos=b.pos;
  if(dPos>0&&old.pos<=rows.length){const tops=rows.map(r=>r.getBoundingClientRect().top);const oi=old.pos-1;
   me.style.position='relative';me.style.zIndex='2';setTimeout(()=>{me.style.zIndex=''},1400);
   A(me,[{translate:`0 ${tops[oi]-tops[pos-1]}px`,boxShadow:'0 10px 24px rgba(60,40,30,.22)'},{translate:'0 0',boxShadow:'0 10px 24px rgba(60,40,30,.22)',offset:.85},{translate:'0 0',boxShadow:'none'}],{duration:1100,delay:200,easing:'cubic-bezier(.45,0,.2,1)',fill:'backwards'});
   for(let k=pos;k<=oi;k++){const r=rows[k];A(r,[{translate:`0 ${tops[k-1]-tops[k]}px`},{translate:'0 0'}],{duration:900,delay:260,easing:'cubic-bezier(.45,0,.2,1)',fill:'backwards'})}
   cnt(rk,old.pos,pos,'',1000,250);setTimeout(()=>{tagUp(me,dPos);const sh=document.createElement('span');sh.className='x2-shine';me.appendChild(sh);kill(sh,800)},1300)}
  if(dXp>0)cnt(val,old.xp,b.me.xp,' XP',1000,250)};
 if(sc&&dPos>0){const mr=me.getBoundingClientRect(),sr=sc.getBoundingClientRect();if(mr.bottom>sr.bottom-40||mr.top<sr.top){sc.scrollTop+=mr.top-sr.top-sc.clientHeight*.45;setTimeout(go,250);return}}
 go()});
function tagUp(me,n,still){const t=document.createElement('span');t.className='x2-up';t.textContent='เลื่อนขึ้น '+n+' อันดับ';if(getComputedStyle(me).position==='static')me.style.position='relative';me.appendChild(t);
 if(!still)A(t,[{opacity:0,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:260,fill:'backwards'});setTimeout(()=>{A(t,[{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});kill(t,320)},2600)}

/* ========== ชุดที่ 2 ========== */
const SVGNS='http://www.w3.org/2000/svg';
const now=()=>performance.now();
const skipFx=e=>e&&e.__x2;

/* ---------- R12 น้องลามามีชีวิต: หายใจ/เอียงตัว และตอบสนองเมื่อแตะ ---------- */
const HEART='<svg viewBox="0 0 24 22" width="16" height="15"><path d="M12 21C5 15.6 1 12 1 7.2 1 3.8 3.6 1.3 6.8 1.3c2.1 0 4 1.1 5.2 2.9 1.2-1.8 3.1-2.9 5.2-2.9C20.4 1.3 23 3.8 23 7.2 23 12 19 15.6 12 21z" fill="#E8485A"/><path d="M6 5.2c-1.2.4-2 1.4-2.2 2.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".6"/></svg>';
function masList(el){return $A('img.mas,.llama',el).filter(m=>{if(m.closest('.ava,.lc-node,.kn-c,.x2-cx'))return false;if(m.tagName==='IMG'&&m.closest('.llama'))return false;if(!m.classList.contains('x2-br')&&getComputedStyle(m).animationName!=='none')return false;const r=m.getBoundingClientRect();return r.width>=56})}
X2.mascot=T(el=>{masList(el).forEach((m,i)=>{if(m.classList.contains('x2-br'))return;m.classList.add('x2-br');m.style.animationDelay=(-(i*0.9)%2.6)+'s, '+(-(i*1.7)%5.2)+'s'})});
function masTap(e){if(RM())return;const m=e.target.closest&&e.target.closest('.x2-br');if(!m||m.closest('button,a,[data-go],[data-sa],[data-act]'))return;if(m._x2t&&now()-m._x2t<700)return;m._x2t=now();
 A(m,[{translate:'0 0',scale:'1 1'},{translate:'0 0',scale:'1.06 .9',offset:.18},{translate:'0 -14px',scale:'.96 1.05',offset:.45},{translate:'0 0',scale:'1.03 .97',offset:.75},{translate:'0 0',scale:'1 1'}],{duration:700,easing:'ease-out',composite:'add'});
 const r=rel(m.getBoundingClientRect());
 for(let i=0;i<4;i++){const h=mk('x2-heart',HEART);h.style.left=(r.cx-8+(i-1.5)*14)+'px';h.style.top=(r.y+r.h*.25)+'px';const dx=(i-1.5)*16+(Math.random()-.5)*10;
  A(h,[{translate:'0 0',scale:'.3',opacity:0},{translate:`${dx*.4}px -18px`,scale:'1.1',opacity:1,offset:.25},{translate:`${dx}px -70px`,scale:'.9',opacity:0}],{duration:700+i*60,delay:120+i*70,easing:'ease-out',fill:'both'});kill(h,1100)}
 try{navigator.vibrate&&navigator.vibrate(8)}catch(_){}}

/* ---------- R28 นับถอยหลัง 3-2-1 ก่อนเกมจับเวลา ---------- */
let cdOn=null;
function countdown(done,delay){if(cdOn){cdOn.cancel();}if(delay){let c2=null,dd=false;const h=setTimeout(()=>{if(!dd)c2=countdown(done)},delay);const o={cancel(){dd=true;clearTimeout(h);c2&&c2.cancel()}};return o}
 const L=layer();if(!L){done();return {cancel(){}}}const rm=RM();let dead=false;const tm=[];
 const ov=mk('x2-cd','<div class="x2-cdbg"></div><div class="x2-cdc"><svg viewBox="0 0 120 120" class="x2-cdr"><circle cx="60" cy="60" r="52" class="t"/><circle cx="60" cy="60" r="52" class="p" pathLength="100"/></svg><b class="x2-cdn"></b></div>');
 const bg=$1('.x2-cdbg',ov),n=$1('.x2-cdn',ov),ring=$1('.p',ov),rs=$1('.x2-cdr',ov);
 A(bg,[{opacity:0},{opacity:1}],{duration:220,fill:'forwards'});
 const show=(t,k)=>{if(dead)return;n.textContent=t;n.classList.toggle('go',k===3);
  if(rm){A(n,[{opacity:.4},{opacity:1}],{duration:150});}
  else if(k<3)A(n,[{scale:'1.9',opacity:0},{scale:'.94',opacity:1,offset:.55},{scale:'1',opacity:1}],{duration:380,easing:'cubic-bezier(.2,.9,.3,1)'});
  else A(n,[{scale:'.7',opacity:0},{scale:'1.15',opacity:1,offset:.35},{scale:'1.6',opacity:0}],{duration:600,easing:'ease-out',fill:'forwards'});
  if(k<3){ring.style.strokeDashoffset='0';A(ring,[{strokeDashoffset:0},{strokeDashoffset:100}],{duration:rm?0:800,easing:'linear',fill:'forwards'});try{navigator.vibrate&&navigator.vibrate(10)}catch(_){}}
  else{if(!rm)A(rs,[{scale:'1',opacity:1},{scale:'1.7',opacity:0}],{duration:500,easing:'ease-out',fill:'forwards'});else rs.style.opacity=0;try{navigator.vibrate&&navigator.vibrate(25)}catch(_){}}};
 ['3','2','1','เริ่ม'].forEach((t,k)=>tm.push(setTimeout(T(()=>show(t,k)),k*800)));
 tm.push(setTimeout(T(()=>{if(dead)return;cdOn=null;A(bg,[{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});kill(ov,620);done()}),2400+ (rm?200:250)));
 const c={cancel(){if(dead)return;dead=true;tm.forEach(clearTimeout);ov.remove();if(cdOn===c)cdOn=null}};cdOn=c;return c}
X2.countdown=countdown;
function speedGo(e){if(skipFx(e))return;const g=e.target.closest&&e.target.closest('#go');if(!g)return;const s=g.closest('section.screen');if(!s||s.dataset.name!=='game_speed'||typeof g.onclick!=='function')return;
 e.preventDefault();e.stopImmediatePropagation();if(g._x2cd)return;g._x2cd=1;const fn=g.onclick;countdown(()=>{if(s.isConnected)fn.call(g,e)})}
function wrapTimed(){['game_catch','game_boss'].concat(['duel']).forEach(k=>{const f=typeof SC!=='undefined'&&SC[k];if(typeof f!=='function'||f.__x2)return;
 const w=function(){const args=arguments;const r=f.apply(this,arguments);if(!r||typeof r.mount!=='function'||r.__x2)return r;r.__x2=1;const om=r.mount,ou=r.unmount;let c=null,dead=false,started=false;
  r.mount=function(el){const self=this;if(k==='game_boss'&&typeof S!=='undefined'&&S.boss&&S.boss.hp<=0&&S.boss.day===today()){started=true;return om.call(self,el)}
   const q=ev=>{if(ev.target.closest('[data-sa=gquit]')&&!started){dead=true;c&&c.cancel();pop()}};el.addEventListener('click',q);
   const run=d=>{c=countdown(()=>{el.removeEventListener('click',q);if(dead||!el.isConnected)return;started=true;om.call(self,el)},d)};
   if(k==='duel'){const fr0=(args[0]&&args[0].f)||(typeof FRIENDS!=='undefined'&&FRIENDS[0])||{n:'เพื่อน',c:'#3F6FB5'};
    c=vsIntro({n:'คุณ',c:'#C8102E',av:avH('คุณ','#C8102E')},{n:fr0.n,c:fr0.c||'#3F6FB5',av:avH(fr0.n,fr0.c||'#3F6FB5')},()=>{if(!dead&&el.isConnected)run(0)},300)}
   else run(320)};
  r.unmount=function(){dead=true;c&&c.cancel();if(started&&ou)return ou.apply(this,arguments)};return r};
 w.__x2=1;SC[k]=w})}

/* ---------- R34 ร้านค้า: ปุ่มซื้อเปลี่ยนรูป ของบินไปใส่น้องลามา ---------- */
let shopBusy=false;
const CHK='<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" class="x2-ck"/></svg>';
function shopBuy(e){if(skipFx(e))return;const b=e.target.closest&&e.target.closest('[data-buy]');if(!b)return;const s=b.closest('section.screen');if(!s||s.dataset.name!=='shop'||typeof b.onclick!=='function')return;
 if(typeof SHOP==='undefined'||typeof S==='undefined')return;const it=SHOP.find(x=>x.id===b.dataset.buy);if(!it||S.own.includes(it.id)||S.coins<it.p)return;
 e.preventDefault();e.stopImmediatePropagation();if(shopBusy)return;shopBusy=true;const fn=b.onclick,fin=()=>{shopBusy=false;try{fn.call(b,e)}catch(er){console.error(er)}};
 const w=b.offsetWidth,h=b.offsetHeight;
 if(RM()){b.innerHTML=CHK;b.classList.add('x2-ok');setTimeout(fin,350);return}
 b.style.width=w+'px';b.style.marginLeft=b.style.marginRight='auto';b.classList.add('x2-buying');b.innerHTML='<span class="x2-spin"></span>';
 A(b,[{width:w+'px'},{width:h+'px'}],{duration:320,easing:EZ,fill:'forwards'});
 setTimeout(T(()=>{b.innerHTML=CHK;b.classList.add('x2-ok');A(b,[{scale:'1'},{scale:'1.12'},{scale:'1'}],{duration:300,easing:SPR})}),760);
 const chip=$1('.chip.coin',s),cell=b.closest('.si'),em=cell&&$1('.e',cell),lla=$1('.llama',s);
 if(chip&&em){const cr=rel(chip.getBoundingClientRect()),er=rel(em.getBoundingClientRect());
  for(let i=0;i<5;i++){const c=mk('x2-coin');c.style.left=(cr.cx-9)+'px';c.style.top=(cr.cy-9)+'px';
   A(c,[{translate:'0 0',scale:'.5',opacity:0},{translate:`${(er.cx-cr.cx)*.5+(i-2)*12}px ${(er.cy-cr.cy)*.5-30}px`,scale:'1',opacity:1,offset:.45},{translate:`${er.cx-cr.cx}px ${er.cy-cr.cy}px`,scale:'.6',opacity:0}],{duration:560,delay:200+i*70,easing:'cubic-bezier(.5,0,.4,1)',fill:'both'});kill(c,900)}
  const tn=[...chip.childNodes].reverse().find(x=>x.nodeType===3&&/\d/.test(x.textContent));
  if(tn){const a=S.coins,z=a-it.p,t0=now()+200;const st=()=>{const k=Math.min(1,Math.max(0,(now()-t0)/600));tn.textContent=' '+Math.round(a+(z-a)*k)+' เหรียญ';if(k<1&&tn.isConnected)requestAnimationFrame(st)};requestAnimationFrame(st)}}
 if(em&&lla){setTimeout(T(()=>{const er=rel(em.getBoundingClientRect()),lr=rel(lla.getBoundingClientRect());const f=mk('x2-fly');f.textContent=em.textContent;f.style.left=(er.cx-20)+'px';f.style.top=(er.cy-20)+'px';
   const dx=lr.cx-er.cx,dy=lr.y+lr.h*.28-er.cy;A(em,[{opacity:1},{opacity:.25}],{duration:200,fill:'forwards'});
   A(f,[{translate:'0 0',scale:'1'},{translate:`${dx*.5}px ${Math.min(dy,0)*.5-90}px`,scale:'1.2',offset:.45},{translate:`${dx}px ${dy}px`,scale:'.6'}],{duration:560,easing:'cubic-bezier(.45,0,.35,1)',fill:'forwards'});kill(f,600)}),720)}
 setTimeout(T(()=>{fin();const s2=top(),l2=s2&&$1('.llama',s2);if(!l2)return;
  A(l2,[{translate:'0 0'},{translate:'0 -12px',offset:.35},{translate:'0 0'}],{duration:420,easing:'cubic-bezier(.3,.7,.4,1)',composite:'add'});
  const r=rel(l2.getBoundingClientRect());for(let i=0;i<8;i++){const sp=mk('x2-spk');const a=i/8*Math.PI*2,R=r.w*.55;sp.style.left=(r.cx-5)+'px';sp.style.top=(r.cy-5)+'px';
   A(sp,[{translate:'0 0',scale:'0',opacity:1},{translate:`${Math.cos(a)*R}px ${Math.sin(a)*R*.9}px`,scale:'1',opacity:1,offset:.6},{translate:`${Math.cos(a)*R*1.1}px ${Math.sin(a)*R}px`,scale:'0',opacity:0}],{duration:500,delay:i*15,easing:'ease-out',fill:'both'});kill(sp,700)}}),1300)}

/* ---------- R35 เหรียญตราโฮโลแกรม และแตะแล้วยกขึ้นมาดู ---------- */
function badgeTap(e){if(skipFx(e))return;const t=e.target.closest&&e.target.closest('.bdg.on');if(!t)return;const s=t.closest('section.screen');if(!s||s.dataset.name!=='badges')return;
 e.preventDefault();e.stopImmediatePropagation();if($1('.x2-bdov'))return;
 const open=()=>{const ev=new MouseEvent('click',{bubbles:true,cancelable:true});ev.__x2=1;t.dispatchEvent(ev)};
 const L=layer();if(!L){open();return}const r=rel(t.getBoundingClientRect()),f=fr(),rm=RM();
 const ov=mk('x2-bdov','<div class="x2-bdbg"></div><div class="x2-bdp"></div>');ov.style.pointerEvents='auto';const bg=ov.firstChild,pp=ov.lastChild;
 const c=t.cloneNode(true);c.removeAttribute('data-go');c.classList.add('x2-bdc');c.style.cssText=`position:absolute;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;margin:0`;pp.appendChild(c);
 t.style.visibility='hidden';
 const sc=Math.min(1.9,f.width*.48/r.w),tx=f.width/2-r.cx,ty=f.height*.4-r.cy;
 A(bg,[{opacity:0},{opacity:1}],{duration:300,fill:'forwards'});
 let done=false;const tm=[];const end=()=>{if(done)return;done=true;tm.forEach(clearTimeout);
  A(ov,[{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});setTimeout(()=>{ov.remove();t.style.visibility=''},210);open()};
 ov.addEventListener('click',end);
 if(rm){c.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`;tm.push(setTimeout(end,1400));return}
 A(c,[{transform:'translate(0,0) scale(1) rotateY(0deg)'},{transform:`translate(${tx}px,${ty}px) scale(${sc}) rotateY(360deg)`}],{duration:700,easing:'cubic-bezier(.3,.8,.3,1)',fill:'forwards'});
 tm.push(setTimeout(T(()=>{const base=`translate(${tx}px,${ty}px) scale(${sc}) `;
  A(c,[{transform:base+'rotateX(0deg) rotateY(0deg)',backgroundPosition:'50% 0'},{transform:base+'rotateX(10deg) rotateY(-16deg)',offset:.25},{transform:base+'rotateX(-8deg) rotateY(15deg)',offset:.6},{transform:base+'rotateX(6deg) rotateY(-8deg)',offset:.85},{transform:base+'rotateX(0deg) rotateY(0deg)'}],{duration:2200,easing:'ease-in-out',fill:'forwards'});
  c.classList.add('x2-tilt')}),700));
 tm.push(setTimeout(end,2900))}

/* ---------- R04 โครงร่างระหว่างโหลดรูป แล้วจางเข้าเป็นรูปจริง ---------- */
const SKS={readers:1,reader:1,know:1,kncat:1,huball:1,hubcol:1,hubword:1,rank:1,bookhome:1,booklist:1};
X2.skel=T(el=>{$A('img',el).forEach(im=>{if(im.complete&&im.naturalWidth)return;if(im._x2sk)return;im._x2sk=1;
 let tg=im;if(im.offsetWidth<8||im.offsetHeight<8){const pa=im.parentElement,cs=pa&&getComputedStyle(pa);if(!pa||cs.backgroundImage!=='none'||cs.animationName!=='none')return;tg=pa}
 const cl=tg===im?'x2-sk':'x2-skp';tg.classList.add(cl);
 const clr=()=>{if(tg===im||!$A('img',tg).some(x=>!x.complete))tg.classList.remove(cl)};
 const ok=()=>{clr();if(!RM())A(im,[{opacity:0,translate:'0 4px'},{opacity:1,translate:'0 0'}],{duration:300})};
 im.addEventListener('load',ok,{once:true});im.addEventListener('error',clr,{once:true})})});

/* ---------- R13 วงล้อคำประจำวัน: เบลอตามแนวหมุน เข็มกระดิก ช่องที่ได้เรืองแสง ---------- */
const angOf=el=>{const m=getComputedStyle(el).transform;if(!m||m==='none')return 0;const v=m.match(/matrix\(([^)]+)\)/);if(!v)return 0;const [a,b]=v[1].split(',').map(parseFloat);return Math.atan2(b,a)*180/Math.PI};
function wrapWheel(){const f=window.hgSpin;if(typeof f!=='function'||f.__x2)return;
 const w=function(el){let r0=null;try{r0=$1('#hgRot',el)}catch(_){}const before=r0&&r0.style.transform;const out=f.apply(this,arguments);
  try{if(!r0||RM()||!/3\.2s/.test(r0.style.transition||'')||!r0.isConnected)return out;wheelFx(el,r0)}catch(er){console.error('[fx2]',er)}return out};
 w.__x2=1;window.hgSpin=w}
function wheelFx(el,r){const D=2800;r.style.transition=`transform ${D}ms cubic-bezier(.16,.72,.12,1)`;
 const wh=r.parentElement,ptr=$1('.hg-ptr',wh),svg=$1('svg',r);if(!svg)return;
 const gs=[1,2].map(k=>{const g=document.createElement('div');g.className='x2-gh';g.appendChild(svg.cloneNode(true));wh.insertBefore(g,r.nextSibling);return g});
 let last=null,prev=null,pt=now(),lastSeg=null;const t0=now();
 const step=()=>{if(!r.isConnected){gs.forEach(g=>g.remove());return}let a=angOf(r);if(a<0)a+=360;const t=now();
  if(prev!=null){let d=a-prev;if(d<-180)d+=360;if(d>180)d-=360;const v=Math.abs(d)/Math.max(1,t-pt);/* deg/ms */
   gs.forEach((g,k)=>{const lag=Math.min(24,v*14*(k+1));g.style.transform=`rotate(${a-lag}deg)`;g.style.opacity=Math.min(.3,v*.35)/(k+1)});
   const seg=Math.floor(((360-a)+30)/60);if(lastSeg!=null&&seg!==lastSeg&&ptr){A(ptr,[{rotate:'0deg'},{rotate:'-22deg',offset:.3},{rotate:'0deg'}],{duration:Math.max(90,Math.min(260,60/Math.max(v,.05))),easing:'ease-out'})}lastSeg=seg}
  prev=a;pt=t;if(t-t0<D+60)requestAnimationFrame(step);else{gs.forEach(g=>g.remove());glow()}};
 requestAnimationFrame(()=>requestAnimationFrame(step));
 const glow=T(()=>{if(!wh.isConnected)return;const b=rel(wh.getBoundingClientRect()),s=b.w,C=s/2,R=s/2,p=a=>[C+R*Math.sin(a*Math.PI/180),C-R*Math.cos(a*Math.PI/180)];const [x0,y0]=p(-30),[x1,y1]=p(30);
  const g=mk('x2-wglow',`<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${C} ${C}L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z" fill="rgba(255,255,255,.38)" stroke="#F5C443" stroke-width="4" stroke-linejoin="round"/></svg>`);
  g.style.cssText=`left:${b.x}px;top:${b.y}px;width:${s}px;height:${s}px`;
  A(g,[{opacity:0,scale:'1'},{opacity:1,scale:'1.06',offset:.35},{opacity:1,scale:'1.04',offset:.75},{opacity:0,scale:'1.04'}],{duration:700,easing:'ease-out',fill:'forwards'});kill(g,750)})}

/* ---------- R19 ปุ่มฟังเสียง: แท่งคลื่นเสียงขณะเล่น ---------- */
let eqBtn=null,eqT=0;
function eqOff(b){if(!b)return;b.classList.remove('x2-eqon');const q=$1(':scope>.x2-eq',b);if(q){A(q,[{opacity:1,scale:'1'},{opacity:0,scale:'.6'}],{duration:200,fill:'forwards'});kill(q,210)}if(eqBtn===b)eqBtn=null}
const playingNow=()=>{try{if(typeof curAudio!=='undefined'&&curAudio&&!curAudio.paused&&!curAudio.ended)return true}catch(_){}try{return speechSynthesis.speaking}catch(_){return false}};
function eqOn(b){if(!b||!b.isConnected||!$1(':scope>svg',b))return;if(eqBtn&&eqBtn!==b)eqOff(eqBtn);eqBtn=b;
 if(getComputedStyle(b).position==='static')b.classList.add('x2-eqpos');
 let q=$1(':scope>.x2-eq',b);if(!q){q=document.createElement('span');q.className='x2-eq';q.innerHTML='<i></i><i></i><i></i>';b.appendChild(q)}
 const sv=$1(':scope>svg',b),sr=sv.getBoundingClientRect(),br=b.getBoundingClientRect(),bw=b.offsetWidth?br.width/b.offsetWidth:1,cs=getComputedStyle(b);q.style.left=((sr.left-br.left)/bw+sr.width/bw/2-(parseFloat(cs.borderLeftWidth)||0))+'px';q.style.top=((sr.top-br.top)/bw+sr.height/bw/2-(parseFloat(cs.borderTopWidth)||0))+'px';const z=Math.max(12,Math.min(22,sr.width/bw*.8||16));q.style.width=z+'px';q.style.height=z*.85+'px';q.style.margin=(-z*.425)+'px 0 0 '+(-z/2)+'px';q.getAnimations().forEach(a=>a.cancel());b.classList.add('x2-eqon');const tk=++eqT,t0=now();
 const poll=()=>{if(tk!==eqT||eqBtn!==b)return;if(!b.isConnected){eqBtn=null;return}const el=now()-t0;if(el>500&&!playingNow()||el>30000){eqOff(b);return}setTimeout(poll,150)};setTimeout(poll,150)}
function wrapSpeak(){const f=window.speak;if(typeof f!=='function'||f.__x2)return;
 const w=function(t,btn){const out=f.apply(this,arguments);try{if(btn&&btn.nodeType===1)eqOn(btn);else if(eqBtn)eqOff(eqBtn)}catch(er){console.error('[fx2]',er)}return out};w.__x2=1;window.speak=w;}

function wrapRefresh(){const f=window.refresh;if(typeof f!=='function'||f.__x2)return;const w=function(){const o=f.apply(this,arguments);try{const s=top();if(s){setTimeout(()=>X2.mascot(s),60);if(SKS[s.dataset.name])X2.skel(s);stTier(s);if($1('.lc-map',s))setTimeout(()=>mapFx(s,1),120)}}catch(e){}return o};w.__x2=1;window.refresh=w}

/* ================= ชุดที่ 3 ================= */
const SVGN='http://www.w3.org/2000/svg';
const vibp=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(_){}};
const REWARD=[18,60,18,60,30];

/* ---------- R06 หัวข้อใหญ่หด/จางตามการเลื่อน เส้นขอบแถบบนค่อย ๆ ปรากฏ ภาพปกเลื่อนช้ากว่าการ์ด ---------- */
function r06(e){const sc=e.target;if(!sc||!sc.classList||!sc.classList.contains('scroller'))return;if(sc.__x2r6)return;sc.__x2r6=1;
 requestAnimationFrame(T(()=>{sc.__x2r6=0;const s=sc.closest('section.screen');if(s)r06apply(s,sc)}))}
function r06apply(s,sc){const st=Math.max(0,sc.scrollTop),k=Math.min(1,st/50),rm=RM();
 if(sc.__x2lg===undefined||(sc.__x2lg&&!sc.__x2lg.isConnected)){const lg=$1(':scope>.large,:scope>.kn-hd>h1,:scope>.hg-hello>h1',sc);sc.__x2lg=lg||null}
 const lg=sc.__x2lg;if(lg){if(!rm){lg.style.transformOrigin='0 60%';lg.style.scale=k?String(1-.08*k):''}lg.style.opacity=k?String(1-k*.65):''}
 const nav=$1(':scope>.nav',s);if(nav){nav.style.boxShadow=k&&!s.classList.contains('collapsed')?`0 .5px 0 rgba(60,40,30,${(.18*k).toFixed(3)})`:''}
 if(rm)return;const sr=sc.getBoundingClientRect();let n=0;
 for(const im of sc.getElementsByTagName('img')){if(n>40)break;if(im.__x2px===0)continue;
  if(im.__x2px===undefined){if(!im.complete||!im.naturalWidth)continue;const cs=getComputedStyle(im),pa=im.parentElement;
   const ok=cs.objectFit==='cover'&&(cs.objectPosition==='50% 50%')&&im.offsetHeight>=60&&pa&&getComputedStyle(pa).overflow==='hidden'&&Math.abs(im.naturalWidth/im.naturalHeight-im.offsetWidth/im.offsetHeight)>.08;im.__x2px=ok?1:0;if(!ok)continue}
  const r=im.getBoundingClientRect();if(r.bottom<sr.top||r.top>sr.bottom)continue;n++;
  const f=Math.max(-1,Math.min(1,((r.top+r.height/2)-(sr.top+sr.height/2))/(sr.height/2)));im.style.objectPosition=`50% ${(50+f*22).toFixed(1)}%`}}

/* ---------- R08 ข้อความแจ้งเตือนเลื่อนลงแบบสปริง ขยายจากเล็ก และหดกลับขึ้นไป ---------- */
let tObs=null;
function toastIn(t){if(t.__x2t)t.__x2t.cancel();const rm=RM();
 t.__x2t=rm?A(t,[{transform:'translate(-50%,0)',opacity:0},{transform:'translate(-50%,0)',opacity:1}],{duration:250,fill:'forwards'})
  :A(t,[{transform:'translate(-50%,-56px) scale(.42,.55)',opacity:.2},{transform:'translate(-50%,3px) scale(1.02,1.02)',opacity:1,offset:.68},{transform:'translate(-50%,0) scale(1)',opacity:1}],{duration:350,easing:'cubic-bezier(.25,.8,.3,1)',fill:'forwards'});
 const a=t.__x2t;setTimeout(()=>{if(t.__x2t===a){a&&a.cancel();t.__x2t=null}},560);
 if(!tObs){let on=true;tObs=new MutationObserver(()=>{const now2=t.classList.contains('on');if(on&&!now2)toastOut(t);on=now2});tObs.observe(t,{attributes:true,attributeFilter:['class']})}}
function toastOut(t){if(t.__x2t)t.__x2t.cancel();const rm=RM();
 t.__x2t=rm?A(t,[{transform:'translate(-50%,0)',opacity:1},{transform:'translate(-50%,0)',opacity:0}],{duration:200,fill:'forwards'})
  :A(t,[{transform:'translate(-50%,0) scale(1)',opacity:1},{transform:'translate(-50%,-46px) scale(.45,.5)',opacity:0}],{duration:250,easing:'cubic-bezier(.5,0,.75,.3)',fill:'forwards'});
 const a=t.__x2t;setTimeout(()=>{if(t.__x2t===a){a&&a.cancel();t.__x2t=null}},560)}
function wrapToast(){const f=window.toast;if(typeof f!=='function'||f.__x2)return;
 const w=function(){const t=$1('#toast');const was=t&&t.classList.contains('on');const o=f.apply(this,arguments);try{const t2=$1('#toast');if(t2&&!was&&t2.classList.contains('on'))toastIn(t2)}catch(er){console.error('[fx2]',er)}return o};w.__x2=1;window.toast=w}

/* ---------- R09 สวิตช์ยืดเป็นแคปซูล · ตัวเลือกแบ่งส่วนเลื่อนแบบสปริง ---------- */
function ctlTap(e){if(skipFx(e))return;const sw=e.target.closest&&e.target.closest('.sw');
 if(sw){const was=sw.classList.contains('on');setTimeout(T(()=>{if(RM()||!sw.isConnected)return;const on=sw.classList.contains('on');if(on===was)return;
   sw.classList.remove('x2-mvon','x2-mvoff');void sw.offsetWidth;sw.classList.add(on?'x2-mvon':'x2-mvoff');setTimeout(()=>sw.classList.remove('x2-mvon','x2-mvoff'),380)}),0);return}
 const b=e.target.closest&&e.target.closest('.seg>button');if(!b)return;const sg=b.parentElement;if($1(':scope>.th',sg))return;const old=$1(':scope>button.on',sg);if(!old||old===b)return;
 const s=sg.closest('section.screen'),si=s?$A('.seg',s).indexOf(sg):-1,r0=old.getBoundingClientRect();
 setTimeout(T(()=>{if(RM())return;let g=sg;if(!g.isConnected){const s2=top();g=s2&&si>=0&&$A('.seg',s2)[si];if(!g)return}
  const nb=$1(':scope>button.on',g);if(!nb)return;const r1=nb.getBoundingClientRect(),gr=g.getBoundingClientRect();if(Math.abs(r1.left-r0.left)<2)return;
  const th=document.createElement('span');th.className='x2-segth';th.style.cssText=`left:${r1.left-gr.left-g.clientLeft}px;top:${r1.top-gr.top-g.clientTop}px;width:${r1.width}px;height:${r1.height}px`;
  g.appendChild(th);g.classList.add('x2-segm');
  A(th,[{transform:`translateX(${r0.left-r1.left}px)`,width:r0.width+'px'},{transform:'none',width:r1.width+'px'}],{duration:300,easing:SPR});
  A(nb,[{color:'var(--sub2)'},{color:'var(--ink)'}],{duration:250});
  setTimeout(()=>{g.classList.remove('x2-segm');th.remove()},310)}),0)}

/* ---------- R10 ตัวเลขสถิตินับขึ้นจาก 0 เมื่อเข้ามาในจอ ---------- */
const CNT={me:1,recap:1,mockres:1};
const eOut=k=>1-Math.pow(1-k,3);
function runCount(x,D){const fin=x.textContent;const parts=fin.split(/(\d+)/);const nums=parts.map((p,i)=>i%2?parseInt(p,10):null);if(!nums.some(v=>v>0))return;
 const t0=now();let last=null;const step=()=>{if(!x.isConnected)return;if(last!==null&&x.textContent!==last)return;const k=Math.min(1,(now()-t0)/D),e=eOut(k);
  last=parts.map((p,i)=>i%2?String(Math.round(nums[i]*e)):p).join('');if(k>=1)last=fin;x.textContent=last;if(k<1)requestAnimationFrame(step)};step()}
function countIn(el,n){if(!CNT[n]||RM())return;const t0=now();
 $A('.stat b,.group .row .val',el).filter(x=>!x.children.length&&/[1-9]/.test(x.textContent)).slice(0,12).forEach(x=>{
  const io=new IntersectionObserver(es=>{if(!es.some(z=>z.isIntersecting))return;io.disconnect();if(now()-t0<1600)runCount(x,700)});io.observe(x)})}

/* ---------- R11 ระบบการสั่น: แตะทั่วไปไม่สั่น · ถูก 1 ครั้ง · ผิด 2 ครั้ง · รางวัล 3 จังหวะ · หีบถี่ขึ้น ---------- */
let pdT=0;
function pdMark(e){const t=e.target.closest&&e.target.closest('button,a,[data-go],[data-act],[data-sa],.press');if(t)pdT=now()}
function wrapVib(){const n=navigator;if(typeof n.vibrate!=='function'||n.vibrate.__x2)return;const o=n.vibrate.bind(n);
 const w=function(p){try{const v=Array.isArray(p)?(p.length===1?p[0]:null):p;if(typeof v==='number'&&v>0&&v<=8&&now()-pdT<350)return true}catch(_){}return o(p)};
 w.__x2=1;try{n.vibrate=w}catch(_){}}

/* ---------- R14 แผนที่บทเรียน: เส้นทางวาดตัวเอง วงแสงหายใจรอบด่านปัจจุบัน ---------- */
let mkId=0;
function mapFx(el,nd){const map=$1('.lc-map',el);if(!map)return;const rm=RM();
 const cur=$1('.lc-node.cur',map);if(cur&&!rm){const pos=cur.closest('.lc-pos')||cur.parentElement,o=$1('.o',cur)||cur;
  if(pos&&!$1(':scope>.x2-ring',pos)){const pr=pos.getBoundingClientRect(),orr=o.getBoundingClientRect();if(orr.width){const rg=document.createElement('span');rg.className='x2-ring';
   rg.style.cssText=`left:${orr.left-pr.left}px;top:${orr.top-pr.top}px;width:${orr.width}px;height:${orr.height}px`;pos.insertBefore(rg,pos.firstChild)}}}
 if(rm||nd)return;
 $A('svg.lc-path',map).forEach(svg=>{if(!vis(svg))return;const g=$A('path',svg).find(p=>/2e8b57/i.test(p.getAttribute('stroke')||''));if(!g||g.__x2d)return;g.__x2d=1;
  const vb=(svg.getAttribute('viewBox')||'0 0 100 100').split(/[ ,]+/).map(Number),id='x2mk'+(++mkId);
  const m=document.createElementNS(SVGN,'mask');m.id=id;m.setAttribute('maskUnits','userSpaceOnUse');m.setAttribute('x',vb[0]-20);m.setAttribute('y',vb[1]-20);m.setAttribute('width',vb[2]+40);m.setAttribute('height',vb[3]+40);
  const mp=document.createElementNS(SVGN,'path');mp.setAttribute('d',g.getAttribute('d'));mp.setAttribute('fill','none');mp.setAttribute('stroke','#fff');mp.setAttribute('stroke-width','16');mp.setAttribute('vector-effect','non-scaling-stroke');mp.setAttribute('pathLength','1');mp.setAttribute('stroke-dasharray','1 1');mp.setAttribute('stroke-dashoffset','1');mp.setAttribute('stroke-linecap','round');
  m.appendChild(mp);svg.appendChild(m);g.setAttribute('mask',`url(#${id})`);
  const an=A(mp,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:600,delay:180,easing:'cubic-bezier(.4,0,.2,1)',fill:'both'});
  setTimeout(()=>{g.removeAttribute('mask');m.remove()},820)})}

/* ---------- R15/R27 แผ่นล่างขยายออกจากจุดที่แตะ (ด่านบนแผนที่ / คำในบทอ่าน) ---------- */
let from=null;
function originTap(e){const t=e.target.closest&&e.target.closest('.lc-node,.lbt[data-tk]');if(!t)return;const r=t.getBoundingClientRect();from={x:r.left+r.width/2,y:r.top+r.height/2,t:now(),w:t.classList.contains('lbt')?t:null}}
function sheetFrom(o){const L=$1('#sheetLayer'),sh=L&&$1('.sheet',L);if(!sh)return;
 if(o.w){$A('.x2-wsel').forEach(x=>x.classList.remove('x2-wsel'));o.w.classList.add('x2-wsel')}
 const rm=RM();sh.style.transition='none';sh.style.transform='none';
 const r=sh.getBoundingClientRect(),cx=Math.max(-40,Math.min(r.width+40,o.x-r.left)),cy=o.y-r.top;
 const R=Math.ceil(Math.max(Math.hypot(cx,cy-r.height),Math.hypot(r.width-cx,cy-r.height),Math.hypot(cx,cy),Math.hypot(r.width-cx,cy)))+4;
 if(rm)A(sh,[{opacity:0},{opacity:1}],{duration:200});
 else{const c0=Math.max(18,cy<0?-cy+18:18);A(sh,[{clipPath:`circle(${c0}px at ${cx}px ${cy}px)`},{clipPath:`circle(${R}px at ${cx}px ${cy}px)`}],{duration:300,easing:'cubic-bezier(.3,.7,.2,1)'});
  const bs=[...new Set($A('.sh-body button,.sh-body .pill',sh))].filter(b=>!b.closest('.pill')||b.classList.contains('pill')).slice(0,7);
  bs.forEach((b,i)=>A(b,[{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:240,delay:110+i*45,fill:'backwards'}))}
 setTimeout(()=>{sh.style.transition='';sh.style.transform=''},rm?220:330)}
function wrapSheet(){const f=window.openSheet;if(typeof f==='function'&&!f.__x2){const w=function(){const o=from;from=null;const out=f.apply(this,arguments);try{if(o&&now()-o.t<600)sheetFrom(o)}catch(er){console.error('[fx2]',er)}return out};w.__x2=1;window.openSheet=w}
 const c=window.closeSheet;if(typeof c==='function'&&!c.__x2){const w2=function(){try{$A('.x2-wsel').forEach(x=>x.classList.remove('x2-wsel'))}catch(_){}return c.apply(this,arguments)};w2.__x2=1;window.closeSheet=w2}}

/* ---------- R17 เรียงคำ: คำบินโค้งเข้าช่องแบบแม่เหล็ก คำอื่นขยับปิดช่อง แตะออกแล้วบินกลับ ---------- */
function ordTap(e){if(skipFx(e))return;const c=e.target.closest&&e.target.closest('.chipw[data-ox]');if(!c)return;const inA=c.closest('#oa'),inP=c.closest('#op');if(!inA&&!inP)return;if(inP&&c.classList.contains('used'))return;
 const st=c.closest('section.screen');if(!st)return;const ox=c.dataset.ox,r0=c.getBoundingClientRect(),before={};$A('#oa .chipw[data-ox]',st).forEach(x=>before[x.dataset.ox]=x.getBoundingClientRect());
 setTimeout(T(()=>{if(RM())return;const oa=$1('#oa',st),op=$1('#op',st);if(!oa||!op)return;
  if(inP){const t=$1(`.chipw[data-ox="${ox}"]`,oa);if(t){const r1=t.getBoundingClientRect(),dx=r0.left-r1.left,dy=r0.top-r1.top;
    A(t,[{translate:`${dx}px ${dy}px`},{translate:`${dx*.45}px ${Math.min(dy,0)*.45-26}px`,offset:.45},{translate:'0 -3px',offset:.8},{translate:'0 0'}],{duration:280,easing:'cubic-bezier(.3,.6,.35,1)'})}}
  else{const t=$1(`.chipw[data-ox="${ox}"]`,op);if(t&&c!==t){const r1=t.getBoundingClientRect(),a=rel(r0);const k=c.cloneNode(true);k.classList.add('x2-chfly');k.style.cssText=`left:${a.x}px;top:${a.y}px;width:${r0.width}px;height:${r0.height}px`;layer().appendChild(k);
    const dx=r1.left-r0.left,dy=r1.top-r0.top;t.style.visibility='hidden';
    A(k,[{translate:'0 0'},{translate:`${dx*.5}px ${Math.min(dy,0)*.5-22}px`,offset:.45},{translate:`${dx}px ${dy}px`}],{duration:280,easing:'cubic-bezier(.3,.6,.35,1)',fill:'forwards'});
    setTimeout(()=>{t.style.visibility='';k.remove()},285)}}
  $A('.chipw[data-ox]',oa).forEach(x=>{if(inP&&x.dataset.ox===ox)return;const b=before[x.dataset.ox];if(!b)return;const r=x.getBoundingClientRect(),dx=b.left-r.left,dy=b.top-r.top;if(Math.abs(dx)+Math.abs(dy)<1)return;
   A(x,[{translate:`${dx}px ${dy}px`},{translate:'0 0'}],{duration:280,easing:SPR})})}),0)}

/* ---------- R18 จับคู่: เส้นโค้งเชื่อมคู่ที่เลือก ถูกแล้วขยับเข้าหากัน ผิดแล้วเส้นหดกลับ ---------- */
function matTap(e){if(skipFx(e)||RM())return;const R=e.target.closest&&e.target.closest('[data-mr]');if(!R||R.classList.contains('ok'))return;const st=R.closest('section.screen'),Lc=st&&$1('[data-ml].sel',st);if(!Lc)return;
 const L=layer();if(!L)return;const a=rel(Lc.getBoundingClientRect()),b=rel(R.getBoundingClientRect()),rt=b.cx>=a.cx;
 const x1=rt?a.x+a.w-6:a.x+6,y1=a.cy,x2=rt?b.x+6:b.x+b.w-6,y2=b.cy,mx=(x1+x2)/2;
 const sv=document.createElementNS(SVGN,'svg');sv.setAttribute('class','x2-mline');const p=document.createElementNS(SVGN,'path');
 p.setAttribute('d',`M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`);p.setAttribute('pathLength','1');sv.appendChild(p);
 [[x1,y1],[x2,y2]].forEach(([x,y],i)=>{const d=document.createElementNS(SVGN,'circle');d.setAttribute('cx',x);d.setAttribute('cy',y);d.setAttribute('r','4');if(i)d.setAttribute('class','e');sv.appendChild(d)});L.appendChild(sv);
 A(p,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:140,easing:'ease-out',fill:'forwards'});A($1('circle.e',sv),[{opacity:0},{opacity:0,offset:.8},{opacity:1}],{duration:140,fill:'forwards'});
 setTimeout(T(()=>{const ok=R.classList.contains('ok');
  if(ok){sv.classList.add('ok');const dx=(b.cx-a.cx)*.06,dy=(b.cy-a.cy)*.06;
   A(Lc,[{translate:'0 0'},{translate:`${dx}px ${dy}px`,offset:.45},{translate:'0 0'}],{duration:300,easing:'ease-out'});A(R,[{translate:'0 0'},{translate:`${-dx}px ${-dy}px`,offset:.45},{translate:'0 0'}],{duration:300,easing:'ease-out'});
   A(sv,[{opacity:1},{opacity:1,offset:.4},{opacity:0}],{duration:320,fill:'forwards'});kill(sv,330)}
  else{A(p,[{strokeDashoffset:0},{strokeDashoffset:1}],{duration:200,easing:'ease-in',fill:'forwards'});A($A('circle',sv)[1],[{opacity:1},{opacity:0}],{duration:120,fill:'forwards'});A(sv,[{opacity:1},{opacity:1,offset:.7},{opacity:0}],{duration:260,fill:'forwards'});kill(sv,270)}}),150)}

/* ---------- R20 วรรณยุกต์: จุดสว่างวิ่งตามเส้นขณะเล่นเสียง เส้นที่ผ่านเข้มขึ้น ---------- */
function toneRun(e){const b=e.target.closest&&e.target.closest('.tlc[data-act=audio],.tlg[data-act=audio]');if(!b)return;const sv=$1('svg',b);if(!sv)return;const pls=$A(':scope>polyline',sv);if(!pls.length)return;
 $A('.x2-tl',sv).forEach(x=>x.remove());const rm=RM(),per=pls.length>1?380:520,ov=[];
 pls.forEach((pl,k)=>{const c=pl.cloneNode(false);c.setAttribute('class','x2-tl');c.setAttribute('stroke','rgba(30,10,10,.38)');c.setAttribute('pathLength','1');c.setAttribute('stroke-dasharray','1 1');c.setAttribute('stroke-dashoffset',rm?'0':'1');pl.after(c);ov.push(c);
  if(!rm){A(c,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:per,delay:k*per,easing:'linear',fill:'forwards'});
   const sw=parseFloat(pl.getAttribute('stroke-width'))||5,d=document.createElementNS(SVGN,'circle');d.setAttribute('class','x2-tl x2-tldot');d.setAttribute('r',String(sw*.95));d.setAttribute('fill','#fff');d.setAttribute('stroke',pl.getAttribute('stroke'));d.setAttribute('stroke-width','2');d.style.opacity='0';sv.appendChild(d);ov.push(d);
   let L0=0;try{L0=pl.getTotalLength()}catch(_){}const t0=now()+k*per;
   const step=()=>{if(!d.isConnected)return;const q=(now()-t0)/per;if(q<0){requestAnimationFrame(step);return}const z=Math.min(1,q);
    try{const P=pl.getPointAtLength(L0*z);d.setAttribute('cx',P.x);d.setAttribute('cy',P.y)}catch(_){}d.style.opacity=z>=1?'0':'1';if(z<1)requestAnimationFrame(step)};requestAnimationFrame(step)}});
 const tEnd=rm?600:per*pls.length+260;setTimeout(()=>{ov.forEach(x=>{if(x.classList.contains('x2-tldot'))x.remove();else A(x,[{opacity:1},{opacity:0}],{duration:240,fill:'forwards'})});setTimeout(()=>ov.forEach(x=>x.remove()),250)},tEnd)}

/* ---------- R23 ตารางวรรณยุกต์คู่: ช่องที่แตะยุบลง คลื่นกระจายสองชั้น แถว/คอลัมน์เดียวกันสว่างนานกว่า ---------- */
function gridTap(e){const b=e.target.closest&&e.target.closest('.tlgrid>.tlg');if(!b)return;const g=b.parentElement,cells=$A(':scope>.tlg',g),i=cells.indexOf(b);if(i<0)return;
 const cols=getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length||4,r=Math.floor(i/cols),c=i%cols,rm=RM();
 if(!rm)A(b,[{scale:'1'},{scale:'.93',offset:.35},{scale:'1'}],{duration:320,easing:SPR});
 cells.forEach((x,j)=>{if(x===b)return;const rr=Math.floor(j/cols),cc=j%cols,line=rr===r||cc===c,d=Math.max(Math.abs(rr-r),Math.abs(cc-c));
  const col=line?'rgba(200,16,46,.5)':'rgba(232,182,74,.55)',z={outline:'2px solid rgba(0,0,0,0)',outlineOffset:'-2px'},on={outline:'2px solid '+col,outlineOffset:'-2px'};
  if(rm){if(line)A(x,[on,Object.assign({offset:.8},on),z],{duration:700,easing:'linear'});return}
  if(!line&&d>2)return;
  A(x,line?[z,Object.assign({offset:.2},on),Object.assign({offset:.75},on),z]:[z,Object.assign({offset:.4},on),z],{duration:line?700:360,delay:(d-1)*80+40,easing:'linear',fill:'backwards'})})}

/* ---------- R21 ฝึกเขียน: เส้นที่เขียนซึมหมึกเล็กน้อยเมื่อจบขีด ---------- */
function inkUp(e){if(RM())return;const pw=e.target.closest&&e.target.closest('#pcv,#pw');if(!pw)return;const box=pw.closest('.stk-pc')||pw;
 setTimeout(T(()=>{const ps=$A('#pw svg path',box).filter(p=>p.getAttribute('fill')==='none'&&p.getAttribute('stroke-width')!=='200'&&!/opacity:\s*0/.test(p.getAttribute('style')||''));const p=ps[ps.length-1];if(!p||p.__x2i)return;p.__x2i=1;
  const sw=parseFloat(p.getAttribute('stroke-width'))||17;
  A(p,[{strokeWidth:sw+'px',filter:'drop-shadow(0 0 0 rgba(200,16,46,0))'},{strokeWidth:(sw*1.16)+'px',filter:'drop-shadow(0 0 1.6px rgba(200,16,46,.55))'}],{duration:250,easing:'ease-out',fill:'forwards'})}),10)}

/* ---------- R22 ประกอบอักษร: ส่วนประกอบเลื่อนเข้าหากันรวมเป็นตัวอักษร ขอบมีแสงวาบ ---------- */
function radWatch(el){if(el.__x2rw)return;el.__x2rw=1;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1)continue;const s=n.id==='rgs'?n:$1('#rgs',n);if(s&&s.classList.contains('fill')&&s.classList.contains('ok')){setTimeout(T(()=>radJoin(el,s)),0);return}}}).observe(el,{childList:true,subtree:true})}
function radJoin(el,slot){if(slot.__x2j||!slot.isConnected)return;slot.__x2j=1;const lay=slot.parentElement,kn=lay&&$1('.rd-pt.k',lay);if(!kn)return;
 const hb=$1('#rgh b',el),ch=hb&&hb.textContent.trim();if(!ch||ch.length>2)return;
 const L=layer();if(!L)return;const lr=rel(lay.getBoundingClientRect()),kr=rel(kn.getBoundingClientRect()),sr=rel(slot.getBoundingClientRect()),rm=RM(),pl=$1('i.pl',lay);
 const fs=Math.min(lr.h*.9,Math.max(kr.h,sr.h)*1.25);const o=mk('x2-radj',`<span class="zh">${ch}</span>`);o.style.cssText=`left:${lr.cx-100}px;top:${lr.cy-fs*.6}px;width:200px;height:${fs*1.2}px;font-size:${fs}px;line-height:${fs*1.2}px`;
 const parts=[kn,slot,pl].filter(Boolean);
 if(rm){parts.forEach(p=>A(p,[{opacity:1},{opacity:0},{opacity:0,offset:.85},{opacity:1}],{duration:1500}));A(o,[{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.8},{opacity:0}],{duration:1500,fill:'forwards'});kill(o,1520);return}
 [kn,slot].forEach(p=>{const r=rel(p.getBoundingClientRect()),dx=(lr.cx-r.cx)*.7,dy=(lr.cy-r.cy)*.7;
  A(p,[{translate:'0 0',opacity:1,easing:'cubic-bezier(.4,0,.2,1)'},{translate:`${dx}px ${dy}px`,opacity:1,offset:.45},{translate:`${dx}px ${dy}px`,opacity:0,offset:.62},{translate:`${dx}px ${dy}px`,opacity:0,offset:.86},{translate:'0 0',opacity:1}],{duration:1500,easing:'linear'})});
 if(pl)A(pl,[{opacity:1},{opacity:0,offset:.2},{opacity:0,offset:.86},{opacity:1}],{duration:1500,easing:'linear'});
 A(o,[{opacity:0,scale:'.9',textShadow:'0 0 0 rgba(245,196,67,0)'},{opacity:0,scale:'.9',offset:.18},{opacity:1,scale:'1.04',textShadow:'0 0 18px rgba(245,196,67,1)',offset:.3},{opacity:1,scale:'1',textShadow:'0 0 4px rgba(245,196,67,.3)',offset:.42},{opacity:1,scale:'1',textShadow:'0 0 0 rgba(245,196,67,0)',offset:.8},{opacity:0,scale:'1'}],{duration:1500,easing:'linear',fill:'forwards'});
 const chk=setInterval(()=>{if(!lay.isConnected){o.remove();clearInterval(chk)}},100);setTimeout(()=>{clearInterval(chk);o.remove()},1520)}

/* ---------- R24 ลักษณนาม: การ์ดคำบินโค้งลงกล่อง กล่องยุบรับ รูปล่าสุดในกล่องเด้งขึ้น ---------- */
function mwTap(e){if(skipFx(e))return;const btn=e.target.closest&&e.target.closest('.mv-b');if(!btn)return;const it=$1('#mvi',btn.closest('section.screen')||document);if(!it)return;
 const r0=it.getBoundingClientRect(),k=it.cloneNode(true);k.removeAttribute('id');
 setTimeout(T(()=>{if(!btn.classList.contains('hit')||RM())return;const L=layer();if(!L)return;const br=btn.getBoundingClientRect(),a=rel(r0);
  k.classList.add('x2-mvfly');k.style.cssText=`left:${a.x}px;top:${a.y}px;width:${r0.width}px;height:${r0.height}px`;L.appendChild(k);
  const dx=(br.left+br.width/2)-(r0.left+r0.width/2),dy=(br.top+br.height*.4)-(r0.top+r0.height/2);
  A(k,[{translate:'0 0',scale:'1',opacity:1},{translate:`${dx*.45}px ${Math.min(dy*.4,0)-34}px`,scale:'.62',opacity:1,offset:.45},{translate:`${dx}px ${dy}px`,scale:'.14',opacity:.3}],{duration:350,easing:'cubic-bezier(.45,0,.4,1)',fill:'forwards'});kill(k,360);
  A(it,[{opacity:0},{opacity:0}],{duration:250,fill:'none'});
  setTimeout(T(()=>{A(btn,[{scale:'1 1'},{scale:'1.05 .9',offset:.35},{scale:'.98 1.03',offset:.7},{scale:'1 1'}],{duration:320,easing:'ease-out'});
   const tn=$1('.in',btn),last=tn&&tn.lastElementChild;if(last)A(last,[{scale:'.3',opacity:0},{scale:'1.15',opacity:1,offset:.6},{scale:'1',opacity:1}],{duration:300,easing:SPR})}),330)}),0)}

/* ---------- R29 เวลาใกล้หมด: ตัวเลขเต้นทุกวินาที ขอบจอแดงจาง ๆ ---------- */
const TMR=['#tm','#mvt','#rgt','#rbt','#mt'];
const tParse=s=>{s=(s||'').trim();const m=s.match(/(\d+):(\d{1,2})/);if(m)return +m[1]*60+ +m[2];const n=s.match(/^\D*(\d+)\D*$/);return n?+n[1]:NaN};
function tmTick(){if(document.hidden)return;const s=top();if(!s)return;let el=null;for(const q of TMR){el=$1(q,s);if(el)break}if(!el)return;const v=tParse(el.textContent);
 if(v>=1&&v<=5){if(el.__x2v===v)return;el.__x2v=v;el.classList.add('x2-tlow');if(RM())return;
  A(el,[{scale:'1'},{scale:'1.32',offset:.22},{scale:'1'}],{duration:620,easing:'ease-out'});
  const vg=mk('x2-vig');A(vg,[{opacity:0},{opacity:1,offset:.22},{opacity:0}],{duration:900,easing:'ease-out',fill:'forwards'});kill(vg,920)}
 else if(el.__x2v){el.__x2v=0;el.classList.remove('x2-tlow')}}

/* ---------- R30 เกมบอส: หยุดภาพชั่วครู่ บอสกะพริบขาว จอสั่น 2px แถบพลังลดสองชั้น ---------- */
function bossSetup(el){const bar=$1('#bbar',el);if(!bar||bar.__x2g)return;bar.__x2g=1;const pg=bar.parentElement;pg.classList.add('x2-bprog');bar.classList.add('x2-bbar');
 const gh=document.createElement('i');gh.className='x2-ghost';gh.style.width=bar.style.width||'100%';pg.insertBefore(gh,bar);let w0=parseFloat(bar.style.width)||100,ga=null;
 new MutationObserver(()=>{const w=parseFloat(bar.style.width);if(isNaN(w))return;if(w<w0){const from=gh.style.width||w0+'%';if(ga)ga.cancel();gh.style.width=w+'%';ga=A(gh,[{width:from},{width:from,offset:.4},{width:w+'%'}],{duration:700,easing:'cubic-bezier(.4,0,.2,1)'})}else{gh.style.width=w+'%'}w0=w}).observe(bar,{attributes:true,attributeFilter:['style']})}
function bossTap(e){const o=e.target.closest&&e.target.closest('#qa .opt');if(!o)return;const s=o.closest('section.screen');if(!s||s.dataset.name!=='game_boss')return;
 setTimeout(T(()=>{if(!o.classList.contains('ok')||RM())return;const bi=$1('#bimg',s),st=$1('#stage',s);
  if(bi)A(bi,[{filter:'brightness(1)'},{filter:'brightness(2.6) saturate(.15)',offset:.12},{filter:'brightness(2.6) saturate(.15)',offset:.32},{filter:'brightness(1)'}],{duration:320,easing:'ease-out'});
  if(st)A(st,[{translate:'0 0'},{translate:'0 0',offset:.2},{translate:'2px 0',offset:.36},{translate:'-2px 0',offset:.54},{translate:'2px 0',offset:.72},{translate:'0 0'}],{duration:300})}),0)}

/* ---------- R31 ดวล/ทีมชนทีม: ฉากเปิดแยกจอสองฝั่ง ---------- */
function vsIntro(Lf,Rt,done,delay){let dead=false,ov=null;const tm=[];const fin=()=>{if(dead)return;dead=true;tm.forEach(clearTimeout);if(ov)ov.remove();done()};
 tm.push(setTimeout(T(()=>{if(dead)return;const L=layer();if(!L){fin();return}const rm=RM();
  ov=mk('x2-vs',`<div class="x2-vsh l" style="--c:${Lf.c}"><div class="in"><div class="av2">${Lf.av}</div><b>${Lf.n}</b></div></div><div class="x2-vsh r" style="--c:${Rt.c}"><div class="in"><div class="av2">${Rt.av}</div><b>${Rt.n}</b></div></div><i class="x2-vsd"></i><span class="x2-vst">VS</span>`);
  const l=$1('.l',ov),r=$1('.r',ov),d=$1('.x2-vsd',ov),v=$1('.x2-vst',ov);
  if(rm){A(ov,[{opacity:0},{opacity:1},{opacity:1,offset:.75},{opacity:0}],{duration:1000,fill:'forwards'});tm.push(setTimeout(T(fin),1000));return}
  const ei='cubic-bezier(.2,.8,.25,1)',eo='cubic-bezier(.6,0,.85,.4)';A(l,[{translate:'-100% 0',easing:ei},{translate:'0 0',offset:.25},{translate:'0 0',offset:.68,easing:eo},{translate:'-100% 0'}],{duration:1200,easing:'linear',fill:'forwards'});
  A(r,[{translate:'100% 0',easing:ei},{translate:'0 0',offset:.25},{translate:'0 0',offset:.68,easing:eo},{translate:'100% 0'}],{duration:1200,easing:'linear',fill:'forwards'});
  A($1('.l .in',ov),[{translate:'-30px 0'},{translate:'0 0'}],{duration:500,delay:200,easing:EZ,fill:'backwards'});A($1('.r .in',ov),[{translate:'30px 0'},{translate:'0 0'}],{duration:500,delay:200,easing:EZ,fill:'backwards'});
  A(d,[{opacity:0},{opacity:0,offset:.25},{opacity:1,offset:.32},{opacity:.5,offset:.5},{opacity:0,offset:.66},{opacity:0}],{duration:1200,easing:'linear',fill:'forwards'});
  A(v,[{opacity:0,scale:'.6'},{opacity:0,scale:'.6',offset:.27},{opacity:1,scale:'1.08',offset:.36},{opacity:1,scale:'1',offset:.62},{opacity:0,scale:'1'}],{duration:1200,easing:'linear',fill:'forwards'});
  tm.push(setTimeout(()=>vibp(12),330));tm.push(setTimeout(T(fin),1200))}),delay||0));
 return {cancel(){if(dead)return;dead=true;tm.forEach(clearTimeout);if(ov)ov.remove()}}}
X2.vs=vsIntro;
const avH=(n,c)=>{try{if(typeof avatar==='function')return avatar(n,c)}catch(_){}return `<span class="av" style="background:${c}">${String(n).replace('พี่','').replace('น้อง','')[0]||''}</span>`};
function teamGo(e){if(skipFx(e))return;const g=e.target.closest&&e.target.closest('#go');if(!g)return;const s=g.closest('section.screen');if(!s||s.dataset.name==='game_speed')return;const vs=$1('.tqvs',s);if(!vs||typeof g.onclick!=='function')return;
 e.preventDefault();e.stopImmediatePropagation();if(g._x2vs)return;g._x2vs=1;const fn=g.onclick;
 const row=(el,k)=>{const r=el&&el[k];return r&&r.classList&&r.classList.contains('tqrow')?r:null};
 const prevRow=(()=>{let x=vs.previousElementSibling;while(x&&!x.classList.contains('tqrow'))x=x.previousElementSibling;return x})(),nextRow=(()=>{let x=vs.nextElementSibling;while(x&&!x.classList.contains('tqrow'))x=x.nextElementSibling;return x})();
 const avs=r=>r?$A('.tqp',r).slice(0,4).map(p=>{const a=p.firstElementChild;return a?a.outerHTML:''}).join(''):'';
 vsIntro({n:'ทีมของคุณ',c:'#C8102E',av:`<span class="grp">${avs(prevRow)}</span>`},{n:'ทีมตรงข้าม',c:'#3F6FB5',av:`<span class="grp">${avs(nextRow)}</span>`},()=>{g._x2vs=0;if(s.isConnected)fn.call(g,e)})}

/* ---------- R32 ผลเกม: ตัวเลขหมุนแบบสล็อตหยุดทีละหลัก · ป้าย "สถิติใหม่" ---------- */
let REC=null;
function wrapGameEnd(){const f=window.gameEnd;if(typeof f!=='function'||f.__x2)return;
 const w=function(el,g,score){try{const prev=(typeof S!=='undefined'&&S.gameBest)?(S.gameBest[g]||0):0;REC=(typeof score==='number'&&score>prev&&prev>0)?{t:now()}:null}catch(_){REC=null}return f.apply(this,arguments)};w.__x2=1;window.gameEnd=w}
function slot(x,delay){const fin=x.textContent;if(x.children.length||!/\d/.test(fin))return 0;let k=0,mx=0;
 x.innerHTML=fin.split('').map(ch=>{if(!/\d/.test(ch))return ch.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));const n=7+k*3,seq=[];for(let i=0;i<n-1;i++)seq.push((+ch+i*7+3)%10);seq.push(ch);const d=420+k*160;mx=Math.max(mx,d);k++;
  return `<span class="x2-rl"><span class="x2-rc" data-n="${n}" data-d="${d}">${seq.join('<br>')}</span></span>`}).join('');
 $A('.x2-rc',x).forEach(c=>{const n=+c.dataset.n;A(c,[{translate:'0 0'},{translate:`0 ${-(n-1)*1.15}em`}],{duration:+c.dataset.d,delay,easing:'cubic-bezier(.2,.7,.25,1)',fill:'both'})});
 setTimeout(()=>{if(x.isConnected)x.textContent=fin},delay+mx+60);return delay+mx}
function resultFx(el){const rec=REC&&now()-REC.t<4000;REC=null;const rm=RM();let end=0;
 if(!rm)$A('.stat b,.group .row .val',el).slice(0,8).forEach((x,i)=>{end=Math.max(end,slot(x,250+i*60))});
 if(!rec)return;const lg=$1('.large',el),box=lg&&lg.parentElement;if(!box)return;if(getComputedStyle(box).position==='static')box.style.position='relative';
 const st=document.createElement('div');st.className='x2-stamp';st.textContent='สถิติใหม่';st.style.top=(lg.offsetTop-4)+'px';box.appendChild(st);
 if(rm)return;A(st,[{scale:'1.6',opacity:0,rotate:'-16deg'},{scale:'.94',opacity:1,rotate:'-8deg',offset:.7},{scale:'1',opacity:1,rotate:'-8deg'}],{duration:380,delay:Math.max(700,end),easing:'cubic-bezier(.5,0,.6,1.2)',fill:'backwards'});
 setTimeout(()=>{if(st.isConnected)vibp(REWARD)},Math.max(700,end)+260)}

/* ---------- R37 วันต่อเนื่องถึงหลัก 7/30/100: เปลวไฟเปลี่ยนสี และแสงวิ่งรอบชิปหนึ่งรอบ ---------- */
const tierOf=v=>v>=100?3:v>=30?2:v>=7?1:0;
function stTier(el){$A('.nav-r [data-go=streak]',el||document).forEach(ch=>{const cs=$1('#cs',ch),v=cs?parseInt(cs.textContent,10):0,t=tierOf(v);[1,2,3].forEach(i=>ch.classList.toggle('x2-st'+i,t===i))})}
function stMile(chip,to){if(!chip||!chip.isConnected)return;const t=tierOf(to);[1,2,3].forEach(i=>chip.classList.toggle('x2-st'+i,t===i));if(RM())return;
 const sv=$1('svg',chip);if(sv)A(sv,[{filter:'brightness(1.6)'},{filter:'brightness(1)'}],{duration:500});
 chip.classList.add('x2-rel');const sw=document.createElement('span');sw.className='x2-sweep';chip.appendChild(sw);
 A(sw,[{'--x2a':'0deg',opacity:1},{'--x2a':'360deg',opacity:1,offset:.9},{'--x2a':'360deg',opacity:0}],{duration:1000,easing:'cubic-bezier(.4,0,.3,1)',fill:'forwards'});setTimeout(()=>{sw.remove()},1020);vibp(REWARD)}
function wrapStreak(){const X=window.FX;if(!X||typeof X.streak!=='function'||X.streak.__x2)return;const f=X.streak;
 const w=function(from,to,chip){const o=f.apply(this,arguments);try{if(to===7||to===30||to===100)setTimeout(T(()=>stMile(chip,to)),2720)}catch(_){}return o};w.__x2=1;X.streak=w}
X2.streakMile=stMile;

/* ---------- R38 การ์ดแชร์: เลื่อนขึ้น เอียงแล้วตั้งตรง แสงวาบวิ่งผ่านหนึ่งครั้ง ---------- */
function cardFx(cp,cv){if(!cv.isConnected)return;const rm=RM();
 if(rm){A(cv,[{opacity:0},{opacity:1}],{duration:300});return}
 A(cv,[{translate:'0 46px',rotate:'-4deg',opacity:0},{translate:'0 -4px',rotate:'.8deg',opacity:1,offset:.62},{translate:'0 0',rotate:'0deg',opacity:1}],{duration:460,easing:'cubic-bezier(.2,.8,.3,1)'});
 setTimeout(T(()=>{if(!cv.isConnected)return;if(getComputedStyle(cp).position==='static')cp.classList.add('x2-rel');const r=cv.getBoundingClientRect(),pr=cp.getBoundingClientRect();
  const w=document.createElement('span');w.className='x2-shw';w.style.cssText=`left:${r.left-pr.left}px;top:${r.top-pr.top}px;width:${r.width}px;height:${r.height}px;border-radius:${getComputedStyle(cv).borderRadius}`;w.innerHTML='<i></i>';cp.appendChild(w);
  A(w.firstChild,[{translate:'-120% 0'},{translate:'260% 0'}],{duration:520,easing:'ease-in-out',fill:'forwards'});kill(w,540)}),330)}
function wrapShare(){const f=window.shareSheet;if(typeof f!=='function'||f.__x2)return;
 const w=function(){const o=f.apply(this,arguments);try{const cp=$1('#sheetLayer #cp');if(cp){const ex=$1('canvas,img',cp);if(ex)cardFx(cp,ex);else{const mo=new MutationObserver(()=>{const c=$1('canvas,img',cp);if(c){mo.disconnect();cardFx(cp,c)}});mo.observe(cp,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),8000)}}}catch(er){console.error('[fx2]',er)}return o};w.__x2=1;window.shareSheet=w}

/* ---------- ติดตั้ง ---------- */
/* ชุดที่ 3 */
document.addEventListener('scroll',T(r06),{capture:true,passive:true});
document.addEventListener('click',T(ctlTap),true);
document.addEventListener('pointerdown',T(pdMark),{capture:true,passive:true});
document.addEventListener('click',T(originTap),true);
document.addEventListener('click',T(ordTap),true);
document.addEventListener('click',T(matTap),true);
document.addEventListener('click',T(toneRun),true);
document.addEventListener('click',T(gridTap),true);
document.addEventListener('pointerup',T(inkUp),{capture:true,passive:true});
document.addEventListener('click',T(mwTap),true);
document.addEventListener('click',T(bossTap),true);
document.addEventListener('click',T(teamGo),true);
setInterval(T(tmTick),250);
onScr.push((el,n)=>{countIn(el,n)});
onScr.push((el,n)=>{if($1('.lc-map',el))setTimeout(()=>mapFx(el),120)});
onScr.push((el,n)=>{if(n==='radbuild')radWatch(el)});
onScr.push((el,n)=>{if(n==='game_boss')bossSetup(el)});
onScr.push((el,n)=>{if(n==='result')requestAnimationFrame(()=>resultFx(el))});
onScr.push((el,n)=>{stTier(el)});

onScr.push((el,n)=>{if(STG[n])requestAnimationFrame(()=>X2.stagger(el,n))});
onScr.push((el,n)=>{if(n==='reader')readerHook(el)});
onScr.push((el,n)=>{if(n==='rank')setTimeout(()=>X2.league(el),120)});
document.addEventListener('pointerdown',T(pressDown),{capture:true,passive:true});
document.addEventListener('click',T(qNext),true);
document.addEventListener('click',T(cardClick),true);
document.addEventListener('click',T(chestClick),true);
addEventListener('pagehide',krStop);
onScr.push((el,n)=>{setTimeout(()=>X2.mascot(el),60)});
onScr.push((el,n)=>{if(SKS[n])X2.skel(el)});
document.addEventListener('pointerup',T(masTap),{capture:true,passive:true});
document.addEventListener('click',T(speedGo),true);
document.addEventListener('click',T(shopBuy),true);
document.addEventListener('click',T(badgeTap),true);

const go=()=>{try{watch()}catch(e){console.error('[fx2]',e)}[wrapTimed,wrapWheel,wrapSpeak,wrapRefresh,wrapToast,wrapVib,wrapSheet,wrapGameEnd,wrapStreak,wrapShare].forEach(fn=>{try{fn()}catch(e){console.error('[fx2]',e)}})};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})();
