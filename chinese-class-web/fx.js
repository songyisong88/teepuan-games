/* fx.js — เอฟเฟกต์ช่วงสำคัญ (ซ้งอี้อนุมัติ 31 ต.ค. 2026: A02 ตอบผิด · A04 จบบท · A05 ปลดล็อกบทถัดไป · A06 สตรีค +1 · A07 เก็บคำลงสมุด · A08 เหรียญตราใหม่)
   ไม่มี A01 (ตอบถูก) และ A03 (คอมโบ) ตามที่ตกลง · ไม่ซูม/ไม่เด้งทั้งหน้า · เลเยอร์ #fxl ไม่รับการแตะ ไม่เปลี่ยนเลย์เอาต์
   prefers-reduced-motion: ทุกฟังก์ชันตรวจเองทุกครั้ง แล้วแสดงสถานะสุดท้ายแบบนิ่ง (หรือคืน false ให้ผู้เรียกใช้พฤติกรรมเดิม) */
(function(){
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const F=()=>document.querySelector('#frame');
const css=`
#fxl{position:absolute;inset:0;pointer-events:none;z-index:900;overflow:hidden}
.fx-sp{position:absolute;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:2px}
.fx-ring{position:absolute;border-radius:50%;border:3px solid;box-sizing:border-box}
.fx-chk{position:absolute;width:34px;height:34px;border-radius:50%;background:#2E8B57;border:3px solid #fff;box-shadow:0 3px 10px rgba(46,139,87,.4);display:flex;align-items:center;justify-content:center;z-index:5}
.fx-chk svg{width:18px;height:18px}
.fx-x{background:#D9822B;box-shadow:0 3px 10px rgba(217,130,43,.35)}
.fx-pill{position:absolute;padding:5px 12px;border-radius:16px;background:#E8B64A;color:#4A3205;font:700 14px/1.2 'IBM Plex Sans Thai','Noto Sans Thai',sans-serif;white-space:nowrap;box-shadow:0 4px 12px rgba(176,122,18,.35)}
.fx-wash{position:absolute;inset:0;border-radius:inherit;pointer-events:none}
.fx-shine{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none}
.fx-shine::after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);animation:fxsw .6s ease-out forwards}
@keyframes fxsw{to{left:120%}}
.fx-rays{position:absolute;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(232,182,74,.38) 0 9deg,transparent 9deg 24deg);-webkit-mask:radial-gradient(circle,#000 25%,transparent 70%);mask:radial-gradient(circle,#000 25%,transparent 70%)}
.fx-streak .fl{width:18px;height:18px;flex:none}
.fx-odo{display:inline-block;flex:none;height:16px;overflow:hidden;vertical-align:-2px}
.fx-odo>span{display:block;line-height:16px}
.fx-mini{position:absolute;padding:8px 14px;border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(60,40,30,.22);font:600 22px/1 'Noto Serif SC','Noto Sans SC',serif;color:#27211E}
.fx-nbbadge{position:absolute;width:46px;height:46px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(60,40,30,.18);display:flex;align-items:center;justify-content:center;color:#C8102E}
.fx-nbbadge b{position:absolute;top:-7px;right:-9px;min-width:22px;height:22px;border-radius:11px;background:#C8102E;color:#fff;font:700 12px/22px Inter,sans-serif;text-align:center;border:2px solid #fff}
.fx-dot{position:absolute;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#2E8B57}
.fx-streak{position:absolute;height:34px;border-radius:17px;background:linear-gradient(90deg,#FFE3C2,#FFD0A8);color:#9A3A0E;display:flex;align-items:center;gap:6px;padding:0 12px;font:700 15px/1 'IBM Plex Sans Thai','Noto Sans Thai',sans-serif;box-shadow:0 6px 16px rgba(232,96,44,.3);white-space:nowrap;overflow:hidden;justify-content:flex-end}
.fx-ember{position:absolute;width:5px;height:5px;border-radius:50%;background:#F28A2E}
`;
function layer(){let l=document.querySelector('#fxl');if(!l){const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);l=document.createElement('div');l.id='fxl';F().appendChild(l)}return l}
const fr=()=>F().getBoundingClientRect();
const rel=r=>{const f=fr();return {x:r.left-f.left,y:r.top-f.top,w:r.width,h:r.height,cx:r.left-f.left+r.width/2,cy:r.top-f.top+r.height/2}};
const mk=(cls,html)=>{const d=document.createElement('div');d.className=cls;if(html)d.innerHTML=html;layer().appendChild(d);return d};
const A=(el,k,o)=>el.animate(k,Object.assign({duration:400,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'},o));
const kill=(el,ms)=>setTimeout(()=>el.remove(),ms);
const CHK='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>';
const XX='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const FLAME='<svg class="fl" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.5c.6 4.2 6 6.3 6 11.6a6 6 0 0 1-12 0c0-2.2 1.1-3.8 2.2-4.9 0 2.2.9 3.3 2.2 3.5C10 9.6 10.4 5.8 12 2.5z"/></svg>';
const BM='<svg width="24" height="24" viewBox="0 0 24 24" fill="#C8102E"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>';
function burst(x,y,o={}){const n=o.n||8,cols=o.c||['#E8B64A','#2E8B57','#F6D27A'],d=o.d||46;for(let i=0;i<n;i++){const s=mk('fx-sp');s.style.left=x+'px';s.style.top=y+'px';s.style.background=cols[i%cols.length];if(o.round)s.style.borderRadius='50%';const a=(i/n)*Math.PI*2+(o.rot||0),dd=d*(.75+Math.random()*.5);
 if(o.line){s.style.width='3px';s.style.height='12px';s.style.borderRadius='2px';s.style.margin='-6px 0 0 -1.5px'}
 A(s,[{transform:`translate(0,0) rotate(${a+Math.PI/2}rad) scale(1)`,opacity:1},{transform:`translate(${Math.cos(a)*dd}px,${Math.sin(a)*dd}px) rotate(${a+Math.PI/2}rad) scale(.2)`,opacity:0}],{duration:o.dur||450,delay:o.delay||0,easing:'cubic-bezier(.1,.7,.3,1)'});kill(s,(o.dur||450)+(o.delay||0)+50)}}
function ring(x,y,col,size,o={}){const r=mk('fx-ring');r.style.borderColor=col;r.style.width=r.style.height=size+'px';r.style.left=(x-size/2)+'px';r.style.top=(y-size/2)+'px';A(r,[{transform:'scale(.3)',opacity:.9},{transform:'scale(1.5)',opacity:0}],{duration:o.dur||480,delay:o.delay||0,easing:'ease-out'});kill(r,(o.dur||480)+(o.delay||0)+50)}
function fly(el,from,to,o={}){const dx=to.x-from.x,dy=to.y-from.y,lift=o.lift==null?-60:o.lift;
 return A(el,[{transform:`translate(0,0) scale(${o.s0||1})`,opacity:1},{transform:`translate(${dx*.5}px,${dy*.5+lift}px) scale(${o.s1||1.05})`,opacity:1,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(${o.s2||.5})`,opacity:o.fade===false?1:.2}],{duration:o.dur||520,delay:o.delay||0,easing:'cubic-bezier(.45,0,.3,1)'})}
function countUp(el,to,dur,delay,pre){const t0=performance.now()+(delay||0);el.textContent=(pre||'')+0;(function f(t){const k=Math.min(1,Math.max(0,(t-t0)/dur));el.textContent=(pre||'')+Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(performance.now());requestAnimationFrame(function f2(t){})}

function inCard(card,cls,html,big){const d=document.createElement('div');d.className=cls;d.innerHTML=html;if(getComputedStyle(card).position==='static')card.style.position='relative';if(big){d.style.right='10px';d.style.top='10px'}else{d.style.left='14px';d.style.top='calc(50% - 17px)'}card.appendChild(d);return d}
const FX={};
/* A02 ตอบผิด */
FX.wrong=(card,good)=>{layer();const R=rel(card.getBoundingClientRect());
 if(RM()){const big=R.h>100,w=document.createElement('div');w.className='fx-wash';w.style.background='rgba(217,130,43,.14)';w.style.boxShadow='inset 0 0 0 3px #D9822B';if(getComputedStyle(card).position==='static')card.style.position='relative';card.appendChild(w);inCard(card,'fx-chk fx-x',XX,big);card.style.opacity='.55';
  if(good){const gw=document.createElement('div');gw.className='fx-wash';gw.style.boxShadow='inset 0 0 0 3px #2E8B57';gw.style.background='rgba(46,139,87,.1)';if(getComputedStyle(good).position==='static')good.style.position='relative';good.appendChild(gw);inCard(good,'fx-chk',CHK.replace(' stroke-dashoffset="1"',''),big)}return 0}
 A(card,[{transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(6px)'},{transform:'translateX(-4px)'},{transform:'translateX(2px)'},{transform:'translateX(0)'}],{duration:380,fill:'none',easing:'ease-out'});
 const w=document.createElement('div');w.className='fx-wash';w.style.background='rgba(217,130,43,.14)';w.style.boxShadow='inset 0 0 0 3px #D9822B';card.appendChild(w);A(w,[{opacity:0},{opacity:1}],{duration:160});
 const big=R.h>100;const c=inCard(card,'fx-chk fx-x',XX,big);A(c,[{transform:'scale(0) rotate(-40deg)'},{transform:'scale(1) rotate(0)'}],{duration:260,delay:60});
 A(card,[{opacity:1},{opacity:.55}],{duration:300,delay:700});
 if(good){const G=rel(good.getBoundingClientRect());const gw=document.createElement('div');gw.className='fx-wash';gw.style.boxShadow='inset 0 0 0 3px #2E8B57';gw.style.background='rgba(46,139,87,.1)';if(getComputedStyle(good).position==='static')good.style.position='relative';good.appendChild(gw);
  A(gw,[{opacity:0},{opacity:1}],{duration:200,delay:380});
  A(good,[{boxShadow:'0 0 0 0 rgba(46,139,87,.55)'},{boxShadow:'0 0 0 14px rgba(46,139,87,0)'}],{duration:620,delay:420,iterations:2,fill:'none',easing:'ease-out'});
  const g=inCard(good,'fx-chk',CHK,big);A(g,[{transform:'scale(0)'},{transform:'scale(1.15)',offset:.6},{transform:'scale(1)'}],{duration:300,delay:420});A(g.querySelector('path'),[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:240,delay:560})}
 const m=document.querySelector('#stack>.screen:last-child #qm');if(m)A(m,[{transform:'rotate(0)'},{transform:'rotate(-8deg)',offset:.3},{transform:'rotate(5deg)',offset:.6},{transform:'rotate(0)'}],{duration:500,delay:100,fill:'none'});
 return 800};
/* A04 จบบท */
FX.complete=(el)=>{if(RM())return false;layer();const sc=el.querySelector('.scroller');const mas=el.querySelector('.pop');
 if(mas){const M=rel(mas.getBoundingClientRect());const r=mk('fx-rays');const S=340;r.style.width=r.style.height=S+'px';r.style.left=(M.cx-S/2)+'px';r.style.top=(M.cy-S/2)+'px';r.style.zIndex='-1';
  // put rays behind mascot: move into screen under scroller content
  sc.style.position='relative';r.remove();r.style.position='absolute';const sr=sc.getBoundingClientRect(),mr=mas.getBoundingClientRect();r.style.left=(mr.left-sr.left+mr.width/2-S/2)+'px';r.style.top=(mr.top-sr.top+sc.scrollTop+mr.height/2-S/2)+'px';r.style.zIndex='0';sc.insertBefore(r,sc.firstChild);mas.style.position='relative';mas.style.zIndex='1';
  A(r,[{opacity:0,transform:'scale(.6) rotate(0deg)'},{opacity:1,transform:'scale(1) rotate(25deg)',offset:.15},{opacity:1,transform:'scale(1) rotate(160deg)'}],{duration:9000,easing:'linear'});
  A(mas,[{transform:'translateY(40px) scale(.7)',opacity:0},{transform:'translateY(-8px) scale(1.04)',opacity:1,offset:.65},{transform:'none',opacity:1}],{duration:520})}
 const ttl=el.querySelector('.large');if(ttl)A(ttl,[{transform:'translateY(14px)',opacity:0},{transform:'none',opacity:1}],{duration:360,delay:250});
 const stars=[...el.querySelectorAll('.center>div>span.pop')];
 stars.forEach((s,i)=>{s.style.animation='none';const on=!/grayscale/.test(s.getAttribute('style')||'');const d=520+i*240;
  if(on){A(s,[{transform:'scale(2.6) rotate(-35deg)',opacity:0},{transform:'scale(.85) rotate(4deg)',opacity:1,offset:.7},{transform:'scale(1) rotate(0)',opacity:1}],{duration:320,delay:d,easing:'cubic-bezier(.5,0,.6,1)'});
   setTimeout(()=>{const R=rel(s.getBoundingClientRect());ring(R.cx,R.cy,'#E8B64A',56,{dur:420});burst(R.cx,R.cy,{n:7,d:38,round:true,dur:420,c:['#E8B64A','#F6D27A','#C8102E']})},d+230)}
  else A(s,[{opacity:0},{opacity:1}],{duration:300,delay:d})});
 const stat=el.querySelector('.stat');if(stat){A(stat,[{transform:'translateY(18px)',opacity:0},{transform:'none',opacity:1}],{duration:380,delay:1250});
  const bs=[...stat.querySelectorAll('b')];[0,1].forEach(i=>{const b=bs[i];if(!b)return;const v=parseInt(b.textContent.replace(/\D/g,''))||0;setTimeout(()=>countUp(b,v,650,0,'+'),1350);setTimeout(()=>A(b,[{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:260,fill:'none'}),2020+i*80)})}
 const grp=el.querySelector('.group');if(grp)A(grp,[{transform:'translateY(18px)',opacity:0},{transform:'none',opacity:1}],{duration:380,delay:1500});
 const dk=el.querySelector('.dock');if(dk)A(dk,[{transform:'translateY(30px)',opacity:0},{transform:'none',opacity:1}],{duration:380,delay:1700});
};
/* A05 ปลดล็อกบทถัดไปบนแผนที่ */
FX.unlock=(sc,a,b)=>{layer();
 const ao=a.querySelector('.o'),bo=b.querySelector('.o');{const all=[...sc.querySelectorAll('.lc-node')];all.slice(all.indexOf(a)+1,all.indexOf(b)).forEach(n=>{if(n.classList.contains('rev')){const r=n;A(r,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(16px) scale(.9)'}],{duration:260,delay:150});setTimeout(()=>r.style.opacity='0',420)}})}const bub=a.querySelector('.lc-bub');
 // 1) บทที่เพิ่งจบ: วงแดงหดลงเป็นบทที่ผ่านแล้ว พร้อมตราติ๊กเขียว
 setTimeout(()=>{a.classList.remove('cur');a.classList.add('done');if(bub)A(bub,[{opacity:1,transform:'translateX(-50%)'},{opacity:0,transform:'translateX(-50%) translateY(-10px) scale(.8)'}],{duration:220});
  A(ao,[{transform:'scale(1.36)'},{transform:'scale(.92)',offset:.6},{transform:'scale(1)'}],{duration:380});
  const ok=document.createElement('span');ok.className='ok';ok.textContent='✓';a.appendChild(ok);A(ok,[{transform:'scale(2.4)',opacity:0},{transform:'scale(.9)',opacity:1,offset:.7},{transform:'scale(1)',opacity:1}],{duration:300,delay:200});
  setTimeout(()=>{const R=rel(ok.getBoundingClientRect());ring(R.cx,R.cy,'#2E8B57',44)},420)},300);
 // 2) จุดเขียวเดินไปตามทาง
 const svg=sc.querySelector('.lc-path'),path=svg.querySelector('path'),L=path.getTotalLength(),vb=svg.viewBox.baseVal,sr=svg.getBoundingClientRect(),kx=sr.width/vb.width,ky=sr.height/vb.height;
 const ar=ao.getBoundingClientRect(),br=bo.getBoundingClientRect();const y0=ar.top+ar.height/2-sr.top,y1=br.top+br.height/2-sr.top;
 const pts=[];for(let l=0;l<L;l+=1){const q=path.getPointAtLength(l);const y=q.y*ky;if(y>y0+ar.height*0.35&&y<y1-br.height*0.62){const x=q.x*kx;if(!pts.length||Math.hypot(x-pts[pts.length-1].x,y-pts[pts.length-1].y)>=13)pts.push({x,y})}}
 const f=fr();pts.forEach((q,i)=>{const d=mk('fx-dot');d.style.left=(sr.left-f.left+q.x)+'px';d.style.top=(sr.top-f.top+q.y)+'px';A(d,[{transform:'scale(0)'},{transform:'scale(1.5)',offset:.6},{transform:'scale(1)'}],{duration:220,delay:800+i*60})});
 const t2=800+pts.length*60;
 // 3) แม่กุญแจสั่น แล้วหลุดตก บทถัดไปเด้งขึ้นเป็นบทปัจจุบัน
 const lk=b.querySelector('.lk');
 setTimeout(()=>{if(lk)A(lk,[{transform:'translateX(-50%) rotate(0)'},{transform:'translateX(-50%) rotate(-14deg)'},{transform:'translateX(-50%) rotate(12deg)'},{transform:'translateX(-50%) rotate(-8deg)'},{transform:'translateX(-50%) rotate(0)'}],{duration:360,fill:'none'})},t2);
 setTimeout(()=>{if(lk){const R=rel(lk.getBoundingClientRect());lk.style.visibility='hidden';const c=mk('fx-chk','<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0"/></svg>');c.style.background='rgba(39,33,30,.75)';c.style.border='0';c.style.width=c.style.height='28px';c.style.left=R.x+'px';c.style.top=R.y+'px';
   A(c,[{transform:'none',opacity:1},{transform:'translate(18px,-26px) rotate(25deg)',opacity:1,offset:.35},{transform:'translate(40px,70px) rotate(90deg)',opacity:0}],{duration:620,easing:'cubic-bezier(.3,0,.7,1)'});kill(c,700)}
  b.classList.remove('lock');b.classList.add('cur');const nb=document.createElement('span');nb.className='lc-bub';nb.textContent='เริ่ม ▶';b.insertBefore(nb,b.firstChild);
  A(bo,[{transform:'scale(.7)',filter:'grayscale(1)'},{transform:'scale(1.12)',filter:'grayscale(0)',offset:.6},{transform:'scale(1)',filter:'grayscale(0)'}],{duration:460});
  A(nb,[{transform:'translateX(-50%) translateY(-30px)',opacity:0},{transform:'translateX(-50%) translateY(4px)',opacity:1,offset:.7},{transform:'translateX(-50%)',opacity:1}],{duration:420,delay:260});
  setTimeout(()=>{const R=rel(bo.getBoundingClientRect());ring(R.cx,R.cy,'#C8102E',120,{dur:600});ring(R.cx,R.cy,'#C8102E',120,{dur:600,delay:200});burst(R.cx,R.cy,{n:10,d:80,dur:520,c:['#C8102E','#E8B64A','#2E8B57']})},120)},t2+380);
 return t2+1400};
/* A06 สตรีค +1 */
FX.streak=(from,to,chip)=>{layer();const C=rel(chip.getBoundingClientRect());
 const W=170;const p=mk('fx-streak',`<span style="flex:1;text-align:left;opacity:0" class="lb">เรียนต่อเนื่อง</span><span class="fl2" style="display:flex;color:#E8602C">${FLAME.replace('fill="#fff"','fill="#E8602C"')}</span><span class="fx-odo" style="height:18px"><span style="line-height:18px">${from}</span><span style="line-height:18px">${to}</span></span><span>วัน</span>`);
 p.style.top=(C.cy-17)+'px';p.style.right=(fr().width-C.x-C.w)+'px';p.style.width=C.w+'px';
 A(p,[{width:C.w+'px',opacity:1},{width:C.w+'px',opacity:1,offset:.1},{width:W+'px',opacity:1,offset:.35},{width:W+'px',opacity:1,offset:.85},{width:C.w+'px',opacity:1}],{duration:2800,easing:'linear'});
 A(p.querySelector('.lb'),[{opacity:0},{opacity:0,offset:.3},{opacity:1,offset:.4},{opacity:1,offset:.76},{opacity:0,offset:.83},{opacity:0}],{duration:2800,easing:'linear'});
 const fl=p.querySelector('.fl2');A(fl,[{transform:'scale(1)'},{transform:'scale(1.5) rotate(-10deg)',offset:.3},{transform:'scale(1.1) rotate(6deg)',offset:.55},{transform:'scale(1.3) rotate(-4deg)',offset:.75},{transform:'scale(1)'}],{duration:1100,delay:900});
 p.querySelectorAll('.fx-odo>span').forEach(s=>A(s,[{transform:'none'},{transform:'translateY(-18px)'}],{duration:320,delay:1200,easing:'cubic-bezier(.3,1.4,.5,1)'}));
 for(let i=0;i<9;i++){const e=mk('fx-ember');const x=C.x+6+Math.random()*16,y=C.cy+10;e.style.left=x+'px';e.style.top=y+'px';e.style.background=i%2?'#F2A93B':'#E8602C';A(e,[{transform:'translate(0,0) scale(1)',opacity:0},{transform:'translate(0,0) scale(1)',opacity:1,offset:.05},{transform:`translate(${(Math.random()-.5)*30}px,${18+Math.random()*26}px) scale(.3)`,opacity:0}],{duration:700,delay:1150+i*60,easing:'ease-out'});kill(e,2000)}
 setTimeout(()=>{const cs=chip.querySelector('#cs');if(cs){cs.textContent=to;chip.style.color='#E8602C';const s=chip.querySelector('svg');if(s)s.style.fill='#E8602C'}},2700);kill(p,2850)};
/* A07 เก็บคำลงสมุด */
FX.save=(btn,zh,n)=>{if(!btn||!btn.isConnected)return false;layer();const R=rel(btn.getBoundingClientRect());if(!R.w)return false;
 if(RM()){const f=fr(),nb=mk('fx-nbbadge',BM+'<b>'+n+'</b>');nb.style.left=(f.width-66)+'px';nb.style.top='60px';kill(nb,1600);return true}ring(R.cx,R.cy,'#C8102E',90,{dur:420});burst(R.cx,R.cy-4,{n:10,d:56,line:true,dur:420,c:['#C8102E','#E8B64A']});
 const f=fr();const nbx=f.width-66,nby=60;const nb=mk('fx-nbbadge',BM+'<b>'+Math.max(0,n-1)+'</b>');nb.style.left=nbx+'px';nb.style.top=nby+'px';
 A(nb,[{transform:'translateX(80px)',opacity:0},{transform:'translateX(-6px)',opacity:1,offset:.7},{transform:'none',opacity:1}],{duration:320,delay:80});
 const m=mk('fx-mini',zh);m.style.left=(R.cx-50)+'px';m.style.top=(R.y-46)+'px';
 A(m,[{transform:'scale(.4)',opacity:0},{transform:'scale(1.08)',opacity:1,offset:.7},{transform:'scale(1)',opacity:1}],{duration:220,delay:60,fill:'none'});
 const mr=m.getBoundingClientRect();fly(m,{x:R.cx,y:R.y-30},{x:nbx+23,y:nby+23},{dur:560,delay:300,lift:-120,s1:.9,s2:.2,fade:true});kill(m,900);
 setTimeout(()=>{const nn=n,n2=nb.querySelector('b');n2.textContent=String(nn);A(nb,[{transform:'scale(1)'},{transform:'scale(1.22) rotate(-6deg)'},{transform:'scale(1)'}],{duration:320,easing:'cubic-bezier(.3,1.6,.5,1)'});A(n2,[{transform:'scale(1)'},{transform:'scale(1.4)'},{transform:'scale(1)'}],{duration:300});burst(nbx+23,nby+23,{n:8,d:36,round:true,dur:380,c:['#E8B64A','#C8102E']})},840);
 A(nb,[{opacity:1,transform:'none'},{opacity:0,transform:'translateX(80px)'}],{duration:300,delay:1700,fill:'forwards'});kill(nb,2100);return true};
/* A08 เหรียญตราใหม่ */
FX.badge=(sh)=>{const m=sh&&sh.querySelector('.pop');if(!m)return false;
 const medal=()=>{m.style.borderRadius='50%';m.style.background='radial-gradient(circle at 50% 40%,#FFF6DD,#F6D27A 70%,#E8B64A)';m.style.boxShadow='0 0 0 5px #fff,0 0 0 8px #E8B64A,0 10px 24px rgba(176,122,18,.35)'};
 if(RM()){medal();m.style.transform='scale(.78)';return true}
 layer();m.style.animation='none';const wrap=m.parentElement;wrap.style.position='relative';
 const rays=document.createElement('div');rays.className='fx-rays';rays.style.cssText+=';width:280px;height:280px;left:50%;top:75px;margin:-140px 0 0 -140px;z-index:0';wrap.insertBefore(rays,wrap.firstChild);m.style.position='relative';m.style.zIndex='1';
 A(rays,[{opacity:0,transform:'scale(.5) rotate(0)'},{opacity:1,transform:'scale(1) rotate(30deg)',offset:.12},{opacity:1,transform:'scale(1) rotate(150deg)'}],{duration:8000,delay:400,easing:'linear'});
 medal();
 A(m,[{transform:'perspective(600px) rotateY(0deg) scale(.25)',opacity:0},{transform:'perspective(600px) rotateY(540deg) scale(.86)',opacity:1,offset:.75},{transform:'perspective(600px) rotateY(720deg) scale(.78)',opacity:1}],{duration:1000,delay:250,easing:'cubic-bezier(.2,.7,.3,1)'});
 setTimeout(()=>{const s=document.createElement('div');s.className='fx-shine';m.appendChild(s);const R=rel(m.getBoundingClientRect());burst(R.cx,R.cy,{n:12,d:100,dur:600,c:['#E8B64A','#F6D27A','#fff','#C8102E']});ring(R.cx,R.cy,'#E8B64A',170,{dur:600})},1200);
 [...wrap.children].filter(e=>e!==m&&e!==rays).forEach((e,i)=>A(e,[{transform:'translateY(12px)',opacity:0},{transform:'none',opacity:1}],{duration:320,delay:1150+i*90}));return true};
/* ---- A05: จำบทที่เพิ่งปลดล็อกตอนจบบท แล้วเล่นครั้งแรกที่เปิดแผนที่ (เรนเดอร์สถานะก่อนจบบทชั่วคราว เล่น แล้วสลับกลับเป็นสถานะจริง) ---- */
let UP=null;
FX.noteUnlock=(u,nu,before)=>{UP=u&&nu&&before?{uid:u.id,to:nu.id,lv:u.lv,before:before.slice(),t:Date.now()}:null};
FX.dropUnlock=()=>{UP=null};
FX.mapUnlock=el=>{const p=UP;UP=null;if(!p||RM()||Date.now()-p.t>30*60e3)return false;
 let map,nowCh,restore;
 try{if(typeof lcMap!=='function'||typeof curLv!=='function'||curLv()!==p.lv||!S.parts.includes(p.uid))return false;
  map=el.querySelector('.lc-map');const sc=el.querySelector('.scroller');if(!map||!sc)return false;
  nowCh=[...map.children].filter(c=>c.classList.contains('lc-chap'));if(!nowCh.length)return false;
  const real=S.parts;let html;S.parts=p.before;try{html=lcMap(p.lv)}finally{S.parts=real}
  const tmp=document.createElement('div');tmp.innerHTML=html;const oldCh=[...tmp.children];
  const a=tmp.querySelector(`.lc-node.cur[data-id="${p.uid}"]`),b=tmp.querySelector(`.lc-node[data-id="${p.to}"]`);
  if(!a||!b||b.classList.contains('cur')||b.classList.contains('done'))return false;
  nowCh[0].before(...oldCh);nowCh.forEach(c=>c.remove());map.style.pointerEvents='none';
  {const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),sr=sc.getBoundingClientRect();sc.scrollTop=Math.max(0,(ar.top+ar.bottom+br.top+br.bottom)/4-sr.top+sc.scrollTop-sc.clientHeight/2)}
  let done=false;
  restore=()=>{if(done)return;done=true;map.style.pointerEvents='';document.querySelectorAll('#fxl .fx-dot').forEach(d=>{A(d,[{opacity:1},{opacity:0}],{duration:240});kill(d,260)});
   const pos={};map.querySelectorAll('.lc-node[data-id]').forEach(n=>pos[n.dataset.id]=n.getBoundingClientRect());
   const cur=[...map.children].filter(c=>c.classList.contains('lc-chap'));cur[0].before(...nowCh);cur.forEach(c=>c.remove());
   if(!el.isConnected)return;
   map.querySelectorAll('.lc-node[data-id]').forEach(n=>{const o=pos[n.dataset.id];if(!o)return;const r=n.getBoundingClientRect(),dx=o.left-r.left,dy=o.top-r.top;if(Math.abs(dx)+Math.abs(dy)>1)A(n,[{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:340,fill:'none'})});
   map.querySelectorAll('.lc-node.rev:not([data-id]),.lc-cheer,.lc-path').forEach(n=>A(n,[{opacity:0},{opacity:1}],{duration:300,delay:120,fill:'backwards'}))};
  setTimeout(()=>{try{if(!el.isConnected){restore();return}const T=FX.unlock(sc,a,b);setTimeout(restore,T+250)}catch(e){console.error(e);restore()}},450);
  return true}
 catch(e){console.error(e);if(restore)restore();else if(map&&nowCh&&!nowCh[0].isConnected){map.style.pointerEvents=''}return false}};
/* ---- A06: สตรีค +1 เล่นที่ชิปสตรีคบนหัวจอ ครั้งแรกที่ชิปปรากฏ (เช่น กลับมาหน้าหลักหลังจบบท) ---- */
let SQ=null,sqT=0;
const sqStop=()=>{SQ=null;clearInterval(sqT);sqT=0};
function sqTick(){if(!SQ||Date.now()-SQ.t>10*60e3){sqStop();return}
 if(document.hidden||document.querySelector('#sheetLayer.on'))return;
 const top=document.querySelector('#stack>.screen:last-child'),chip=top&&top.querySelector('.nav-r [data-go=streak]');
 const r=chip&&chip.getBoundingClientRect(),f=fr();if(!r||!r.width||r.top<f.top||r.bottom>f.bottom){SQ.seen='';return}
 const k=Math.round(r.left)+'/'+Math.round(r.top);if(SQ.seen!==k){SQ.seen=k;return}
 sqStop();const cs=chip.querySelector('#cs'),to=cs?parseInt(cs.textContent,10):NaN;if(!(to>=1))return;
 FX.streak(to-1,to,chip);try{vib([20,40,20])}catch(e){}}
FX.streakSoon=to=>{if(RM()||!document.querySelector('#frame'))return false;SQ={to,t:Date.now(),seen:''};if(!sqT)sqT=setInterval(sqTick,400);return true};
window.FX=FX;
})();