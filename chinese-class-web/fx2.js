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
 const w=function(){const r=f.apply(this,arguments);if(!r||typeof r.mount!=='function'||r.__x2)return r;r.__x2=1;const om=r.mount,ou=r.unmount;let c=null,dead=false,started=false;
  r.mount=function(el){const self=this;if(k==='game_boss'&&typeof S!=='undefined'&&S.boss&&S.boss.hp<=0&&S.boss.day===today()){started=true;return om.call(self,el)}
   const q=ev=>{if(ev.target.closest('[data-sa=gquit]')&&!started){dead=true;c&&c.cancel();pop()}};el.addEventListener('click',q);
   c=countdown(()=>{el.removeEventListener('click',q);if(dead||!el.isConnected)return;started=true;om.call(self,el)},320)};
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

function wrapRefresh(){const f=window.refresh;if(typeof f!=='function'||f.__x2)return;const w=function(){const o=f.apply(this,arguments);try{const s=top();if(s){setTimeout(()=>X2.mascot(s),60);if(SKS[s.dataset.name])X2.skel(s)}}catch(e){}return o};w.__x2=1;window.refresh=w}

/* ---------- ติดตั้ง ---------- */
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

const go=()=>{try{watch()}catch(e){console.error('[fx2]',e)}[wrapTimed,wrapWheel,wrapSpeak,wrapRefresh].forEach(fn=>{try{fn()}catch(e){console.error('[fx2]',e)}})};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
})();
