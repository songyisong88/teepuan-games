/* ปกสมุดคำ K2 กระดาษคราฟต์ (ซ้งอี้เลือก 31 ต.ค. 2026: "ปกสมุดเอา K2 กระดาษคราฟต์")
   - แทนการ์ดทางเข้า window.nbEntry (เดิมเป็นแถว .nb-entry ใน notebook-page.js) ด้วยการ์ดปกสมุด
   - สติกเกอร์ = รูปของคำที่เก็บไว้จริง (ล่าสุดก่อน สูงสุด 4 รูป) + ลามะ 1 ตัว · ตัวเลขจาก NBX (เก็บไว้ / กำลังจำ / จำได้แล้ว / ถึงรอบวันนี้)
   - แตะแล้ว: ปกลอยมากลางจอ → สติกเกอร์เด้งทีละชิ้น → ปกพลิกเปิด → หน้าสมุดขยายจากขนาดเล่มจนเต็มจอ (รวม ~3.5 วินาที)
   - prefers-reduced-motion: ข้ามแอนิเมชัน เปิดหน้าสมุดทันที
   ไม่แตะ notebook-page.js / nb-page.css — ไฟล์นี้โหลดหลัง notebook-page.js แล้วเขียนทับ window.nbEntry */
(()=>{
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
const LLAMA='assets/mascot/cheer.webp';
const picOf=zh=>{const I=window.ART_IDX;if(!I||typeof artUrl!=='function')return '';return I['hubw/'+zh]?artUrl('hubw',zh):I['word/'+zh]?artUrl('word',zh):''};
function data(){const X=window.NBX;if(!X)return {total:0,learn:0,done:0,due:0,pics:[]};
 const st=X.nbStats();const pics=X.nbAll().map(picOf).filter(Boolean).slice(0,4);
 return {total:st.learn+st.done,learn:st.learn,done:st.done,due:st.due,pics}}
/* ตำแหน่งสติกเกอร์ตามแบบ K2 */
const SLOTS=[['sq',178,178,80,9],['',48,184,76,-8],['',122,216,64,5],['sq',232,258,52,-12]];
function book(d){const st=SLOTS.map(([c,l,t,w,r],i)=>{const p=d.pics[i];
  return `<div class="nbc-st ${c} nbc-s${i+1}${p?'':' em'}" style="left:${l}px;top:${t}px;width:${w}px;height:${w}px;transform:rotate(${r}deg)">${p?`<img src="${esc(p)}" alt="" draggable="false" decoding="async" onerror="this.parentNode.classList.add('em');this.remove()">`:''}</div>`}).join('');
 return `<div class="nbc-bk" aria-hidden="true"><div class="nbc-pg"></div><div class="nbc-cv"><div class="nbc-f"><div class="nbc-sp"></div>
 <div class="nbc-tp"><i class="nbc-wt a"></i><i class="nbc-wt b"></i><b>สมุดคำของฉัน</b><span class="zh">我的生词本</span></div>${st}
 <div class="nbc-lm nbc-s5"><img src="${LLAMA}" alt="" draggable="false"></div>
 <div class="nbc-ct nbc-s6"><b>${d.total}</b><small>คำ</small></div></div><div class="nbc-b"></div></div></div>`}
window.nbEntry=()=>{const d=data();
 const info=d.total?`<small>กำลังจำ ${d.learn} คำ<br>จำได้แล้ว ${d.done} คำ</small>${d.due?`<span class="nbc-due">ถึงรอบวันนี้ ${d.due} คำ</span>`:`<span class="nbc-due ok">วันนี้ทบทวนครบแล้ว</span>`}`
  :`<small>ยังไม่มีคำในสมุด<br>กดเก็บคำที่อยากจำไว้ทบทวน</small>`;
 return `<button class="nbc-card press" data-nbcover="1" aria-label="สมุดคำของฉัน เก็บไว้ ${d.total} คำ"><div class="nbc-th">${book(d)}</div><div class="nbc-ki"><b>สมุดคำของฉัน</b>${info}<br><span class="nbc-go">เปิดสมุด ${CH}</span></div></button>`};

const reduce=()=>window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const openNb=()=>{if(window.GOX&&GOX.notebook)GOX.notebook();else if(typeof push==='function')push('notebook',{})};
const T=4.5;
/* คีย์เฟรมตามเวลา (วินาที) → Web Animations */
const tl=(el,fr)=>{if(!el)return;const f=fr.map(([t,p])=>Object.assign({offset:Math.min(1,t/T)},p));if(f[0].offset>0)f.unshift(Object.assign({},f[0],{offset:0,easing:'linear'}));const l=f[f.length-1];if(l.offset<1)f.push(Object.assign({},l,{offset:1,easing:'linear'}));f.forEach(x=>{if(!x.easing)x.easing='linear'});return el.animate(f,{duration:T*1000,fill:'both'})};
let busy=false;
function play(card){const fr=document.getElementById('frame')||document.body;const FR=fr.getBoundingClientRect();
 const th=card.querySelector('.nbc-th');const R=th.getBoundingClientRect();
 const W=FR.width,Hh=FR.height,c={x:R.left+R.width/2-FR.left,y:R.top+R.height/2-FR.top};
 const o=document.createElement('div');o.id='nbc-ov';
 o.innerHTML=`<div class="nbc-tap" style="left:${c.x}px;top:${c.y}px"></div><div class="nbc-dim"></div><div class="nbc-hole"></div><div class="nbc-fly">${th.innerHTML}</div>`;
 fr.appendChild(o);card.classList.add('nbc-busy');
 const q=s=>o.querySelector(s),fl=q('.nbc-fly');q('.nbc-bk').style.transform='none';
 /* ขนาดเล่มกลางจอ: กว้างไม่เกิน 300 / ไม่เกิน 78% ของจอ */
 const S=Math.min(1,(W*.78)/300,(Hh*.58)/420),BX=W/2,BY=Math.min(Hh*.47,Hh/2);
 const TR=(x,y,r,s)=>`translate(${x-150}px,${y-210}px) rotate(${r}deg) scale(${s})`,EO='cubic-bezier(.25,.8,.25,1)';
 tl(fl,[[0,{transform:TR(c.x,c.y,-4,.42)}],[.28,{transform:TR(c.x,c.y,-4,.395),easing:'ease-out'}],[.48,{transform:TR(c.x,c.y,-4,.43),easing:'ease-in-out'}],[.58,{transform:TR(c.x,c.y,-4,.42),easing:EO}],[1.12,{transform:TR(BX,BY,1,S*1.035),easing:'ease-in-out'}],[1.3,{transform:TR(BX,BY,0,S)}]]);
 tl(fl,[[0,{opacity:1}],[3.05,{opacity:1,easing:'ease-in'}],[3.3,{opacity:0}]]);
 tl(q('.nbc-tap'),[[0,{opacity:0,transform:'scale(.3)'}],[.2,{opacity:.6,transform:'scale(.6)',easing:'ease-out'}],[.75,{opacity:0,transform:'scale(1.6)'}]]);
 tl(q('.nbc-dim'),[[0,{opacity:0}],[.55,{opacity:0,easing:'ease-out'}],[1.2,{opacity:1}],[2.0,{opacity:1}],[2.02,{opacity:0}]]);
 /* สติกเกอร์เด้งทีละชิ้น */
 const H=1.3;[1,2,3,4,5,6].forEach((n,i)=>{const a=H-.1+i*.11;tl(q('.nbc-s'+n),[[0,{scale:'1'}],[a,{scale:'1',easing:'ease-out'}],[a+.14,{scale:'1.2',easing:'ease-in-out'}],[a+.32,{scale:'1'}]])});
 tl(q('.nbc-cv'),[[0,{transform:'rotateY(0deg)'}],[2.05,{transform:'rotateY(0deg)',easing:'cubic-bezier(.55,0,.3,1)'}],[3.0,{transform:'rotateY(-178deg)'}]]);
 tl(q('.nbc-pg'),[[0,{opacity:1}],[2.05,{opacity:1}],[2.12,{opacity:0}]]);
 /* หน้าสมุดจริงอยู่ใต้ชั้นนี้ — เปิดช่องขนาดเล่มแล้วขยายจนเต็มจอ */
 const bw=300*S,bh=420*S,bx=BX-bw/2,by=BY-bh/2;
 const hole=(x,y,w,h,r)=>({transform:`translate(${x}px,${y}px)`,width:w+'px',height:h+'px',borderRadius:r});
 tl(q('.nbc-hole'),[[0,Object.assign({opacity:0},hole(bx,by,bw,bh,'4px 12px 12px 4px'))],[2.0,Object.assign({opacity:0},hole(bx,by,bw,bh,'4px 12px 12px 4px'))],[2.02,Object.assign({opacity:1},hole(bx,by,bw,bh,'4px 12px 12px 4px'))],
  [2.8,Object.assign({opacity:1,easing:'cubic-bezier(.5,0,.2,1)'},hole(bx,by,bw,bh,'4px 12px 12px 4px'))],[3.5,Object.assign({opacity:1},hole(-2,-2,W+4,Hh+4,'0px'))],[3.7,Object.assign({opacity:0},hole(-2,-2,W+4,Hh+4,'0px'))]]);
 /* เปิดหน้าสมุดตอนเล่มอยู่กลางจอ (ไม่ให้เลื่อนเข้าข้าง เพราะซ่อนอยู่หลังเล่ม) */
 setTimeout(()=>{try{openNb();const st=document.querySelectorAll('#stack>*');const top=st[st.length-1];if(top){top.style.transition='none';top.style.transform='';void top.offsetWidth;setTimeout(()=>{top.style.transition=''},60)}}catch(e){console.error(e)}},1980);
 const end=()=>{o.remove();card.classList.remove('nbc-busy');busy=false};
 setTimeout(end,T*1000-700);setTimeout(()=>{if(document.getElementById('nbc-ov')===o)end()},T*1000+400)}
document.addEventListener('click',e=>{const card=e.target.closest&&e.target.closest('[data-nbcover]');if(!card)return;
 e.stopPropagation();e.preventDefault();if(busy)return;if(typeof vib==='function')vib(6);
 if(reduce()||!Element.prototype.animate){openNb();return}
 busy=true;try{play(card)}catch(err){console.error(err);const o=document.getElementById('nbc-ov');if(o)o.remove();card.classList.remove('nbc-busy');busy=false;openNb()}},true);
})();
