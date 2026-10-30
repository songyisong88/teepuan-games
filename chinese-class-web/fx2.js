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
const STG={games:1,path:1,me:1,shop:1};
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
function krStop(){if(!KR)return;const k=KR;KR=null;cancelAnimationFrame(k.raf);try{k.pill.remove()}catch(e){}k.toks.forEach(t=>{t.classList.remove('x2-kw');t.style.translate=''});if(k.book)k.book.classList.remove('x2-kdim');if(k.row)k.row.classList.remove('x2-kon')}
function aud(){try{return typeof curAudio!=='undefined'?curAudio:null}catch(e){return null}}
X2.karaoke=T(row=>{krStop();if(!row||!row.isConnected)return;const tk=$1('.lbtk',row);if(!tk)return;const toks=$A('.lbt',tk);if(!toks.length)return;
 const book=row.closest('.lbbook');const w=toks.map(t=>Math.max(1,($1('.zh',t)||t).textContent.trim().length));const tot=w.reduce((a,b)=>a+b,0);
 const pill=document.createElement('i');pill.className='x2-kp';tk.appendChild(pill);
 const k=KR={row,toks,book,pill,i:-1,t0:performance.now(),a:null,raf:0};if(book&&!RM())book.classList.add('x2-kdim');row.classList.add('x2-kon');
 const place=i=>{if(i===k.i)return;k.i=i;toks.forEach((t,j)=>{t.classList.toggle('x2-kw',j===i);if(!RM())t.style.translate=j===i?'0 -2px':''});
  const t=toks[i];pill.style.left=t.offsetLeft+'px';pill.style.top=t.offsetTop+'px';pill.style.width=t.offsetWidth+'px';pill.style.height=t.offsetHeight+'px';pill.style.opacity='1';if(RM())pill.style.transition='none'};
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

/* ---------- ติดตั้ง ---------- */
onScr.push((el,n)=>{if(STG[n])requestAnimationFrame(()=>X2.stagger(el,n))});
onScr.push((el,n)=>{if(n==='reader')readerHook(el)});
onScr.push((el,n)=>{if(n==='rank')setTimeout(()=>X2.league(el),120)});
document.addEventListener('pointerdown',T(pressDown),{capture:true,passive:true});
document.addEventListener('click',T(qNext),true);
document.addEventListener('click',T(cardClick),true);
document.addEventListener('click',T(chestClick),true);
addEventListener('pagehide',krStop);
const go=()=>{try{watch()}catch(e){console.error('[fx2]',e)}};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})();
