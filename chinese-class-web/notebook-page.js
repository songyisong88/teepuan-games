/* หน้าสมุดคำของฉัน แบบ S3 สมุดกระดาษ (ซ้งอี้เลือก 31 ต.ค. 2026: การ์ดทบทวนวันนี้ · ปุ่มคำศัพท์ทั้งหมด/คำที่จำแล้ว · แถววันนี้/เมื่อวานปัดข้าง · ตารางคำที่ยังไม่ได้จำ 3 คอลัมน์)
   + ทบทวนบัตรคำ/ควิซ + การ์ดทางเข้าในแหล่งความรู้ · ต้องโหลดหลัง notebook-data.js · ถอดไฟล์นี้ออกจาก index.html ได้โดยไม่กระทบปุ่มเก็บและข้อมูล */
(()=>{
if(!window.NBX)return;const {BM,BMF,CK,XX,RE,SPKI,esc,NB,stamp,isOn,isDone,srsOf,isDue,hubItem,nbInfo,nbWord,pyTxt,nbLearn,nbRelearn,nbAll,nbLearning,nbLearned,nbPool,nbMigrate}=window.NBX;
/* ---------- เวลาแบบอ่านง่าย ---------- */
function ago(ms,pre){if(!ms||ms<1e11)return pre?'':'';const d=Math.floor((Date.now()-ms)/864e5),day=new Date(ms).toDateString()===new Date().toDateString();
 const t=day?'วันนี้':d<=1?'เมื่อวาน':d<7?d+' วันก่อน':d<30?Math.floor(d/7)+' สัปดาห์ก่อน':Math.floor(d/30)+' เดือนก่อน';return (pre||'')+t}
/* ภาพคำ: ภาพคลังคำ (hubw) ก่อน แล้วจึงภาพคำในบทเรียน (word) · ไม่มีภาพ = ป้ายตัวอักษร */
const hasArt=k=>!!(window.ART_IDX&&ART_IDX[k]);
const nbArt=(zh,th)=>hasArt('hubw/'+zh)?art('hubw',zh,'','',th):hasArt('word/'+zh)?art('word',zh,'','',th):'';
const TINT=['#FBE9E4','#E8F1EA','#E7EEF8','#FBF1DC','#F1E8F6','#E5F3F3'];const hsh=s=>[...String(s)].reduce((a,c)=>a+c.codePointAt(0),0);
const pic=(zh,th)=>nbArt(zh,th)||`<span class="nb-zt" style="background:${TINT[hsh(zh)%TINT.length]}"><span class="zh">${esc([...zh].slice(0,2).join(''))}</span></span>`;
window.nbArt=nbArt;
/* ---------- สมุดคำแบบ S3 สมุดกระดาษ (ซ้งอี้เลือก 31 ต.ค. 2026) ---------- */
const TAPE=['rgba(232,52,78,.35)','rgba(63,140,255,.32)','rgba(59,181,108,.35)','rgba(255,197,49,.5)'];
const I4={all:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="13" height="17" rx="2.5"/><path d="M8 8h5M8 12h5M20 7v13a2 2 0 0 1-2 2H8"/></svg>',
 ok:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16.5 9.5"/></svg>'};
const gloss=t=>{try{return (typeof hbGloss==='function'&&hbGloss(t))||t||''}catch(e){return t||''}};
const dayStart=k=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-k);return d.getTime()};
const ageOf=t=>!t||t<1e11?9:t>=dayStart(0)?0:t>=dayStart(1)?1:2;
/* ขนาดตัวอักษรตามจำนวนตัว · จำกัดด้วยความกว้างการ์ด (cqw) กันล้นการ์ด */
const zsz=(zh,g)=>{const n=[...zh].length;const b=(g===1?{1:24,2:23,3:21,4:19,5:16.5}:{1:22,2:21,3:19,4:17.5,5:15.5})[Math.min(n,5)];return `font-size:${b}px;font-size:min(${b}px,calc(86cqw / ${Math.max(n,1)}))`};
const psz=(py,g)=>{const n=py.length;return g?(n>13?9.5:n>10?10.5:11):(n>14?11.5:12.5)};
const tsz=(th,g)=>{const n=th.replace(/[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g,'').length;return g?(n>11?11:n>8?12:13):(n>11?13.5:15)};
const wd=zh=>{const i=nbInfo(zh),e=NB()[zh]||{};return {zh,py:String(pyTxt(i.py)||'').normalize('NFC'),th:gloss(i.th),thFull:i.th||'',say:i.say||zh,done:isDone(e),due:isDue(zh),t:e.t||0}};
function card4(w,g,i){const done=w.done;const btn=done?`<button class="k bk press" data-n4="back">${RE.replace(/18/g,'14')}<span>ทวนอีก</span></button>`:`<button class="k press" data-n4="done">${CK.replace(/18/g,'14')}<span>จำได้แล้ว</span></button>`;
 return `<div class="cd ${done?'dn':''}" data-z="${esc(w.zh)}" data-n4="open" style="--i:${i||0}" role="button" tabindex="0" aria-label="${esc(w.zh)} ${esc(w.th)}"><span class="tp" style="background:${TAPE[hsh(w.zh)%4]}"></span><span class="ph">${pic(w.zh,w.th)}</span>${done?`<span class="tag ok">จำได้แล้ว</span>`:w.due?`<span class="tag">ถึงรอบ</span>`:''}<button class="spk press" data-n4="say" aria-label="ฟังเสียง ${esc(w.zh)}">${SPKI()}</button><div class="zh" style="${zsz(w.zh,g)}">${esc(w.zh)}</div><div class="p" style="font-size:${psz(w.py,g)}px">${esc(w.py)}</div><div class="t" style="font-size:${tsz(w.th,g)}px">${esc(w.th)}</div>${btn}</div>`}
const N=(k,v)=>`<span class="n4" data-k="${k}">${v}</span>`;
function nbEmpty(){return `<div class="empty nb-empty"><div style="width:150px;height:150px">${M('empty')}</div><b>ยังไม่มีคำในสมุด</b><p>กด “เก็บลงสมุด” ที่หน้าคำในคลังคำน่ารู้ หรือแตะคำในนิทานและบทความ แล้วกดเก็บ คำนั้นจะมาอยู่ที่นี่เพื่อให้ทบทวนจนจำได้</p><button class="pill sm press mt16" data-n4="hub">ไปที่คลังคำน่ารู้</button></div>`}
const note=t=>`<div class="n4note">${t}</div>`;
function nb4Body(){const A=nbAll(),L=nbLearning(),D=nbLearned(),P=nbPool();if(!A.length)return nbEmpty();
 const tot=A.length,dn=D.length,pct=tot?Math.round(dn/tot*100):0;const W=L.map(wd);
 const td=W.filter(w=>ageOf(w.t)===0),yd=W.filter(w=>ageOf(w.t)===1);
 const dk=(P.length?P:A).filter(z=>nbArt(z)).slice(0,3);const deck=(dk.length?dk:(P.length?P:A).slice(0,3)).slice().reverse();
 const row=(ws,lbl)=>`<div class="row"><div class="track">${ws.map((w,i)=>card4(w,0,i)).join('')}</div></div>`;
 return `<div class="large">สมุดคำของฉัน</div>
 <button class="today press" data-n4="start"><b>ทบทวนวันนี้</b><small>${P.length?`${N('due',P.length)} คำถึงรอบแล้ว`:'ยังไม่มีคำถึงรอบ'}</small><span class="pg"><i data-k="pg" style="width:${pct}%"></i></span><span class="pl">จำได้แล้ว ${N('dn',dn)} จาก ${N('tot',tot)} คำ</span>
 <span class="deck" aria-hidden="true">${deck.map((z,i)=>`<span class="dc" style="--r:${(i-(deck.length-1)/2)*13}deg;--i:${i}"><span class="dp">${pic(z,'')}</span><span class="zh">${esc(z)}</span></span>`).join('')}</span></button>
 <div class="duo"><button class="db all press" data-n4="list" data-f="all"><span class="ic">${I4.all}</span><span class="tx"><b>คำศัพท์ทั้งหมด</b><small>${N('tot2',tot)} คำ</small></span><i class="ink"></i></button>
 <button class="db ok press" data-n4="list" data-f="done"><span class="ic">${I4.ok}</span><span class="tx"><b>คำที่จำแล้ว</b><small>${N('dn2',dn)} คำ</small></span><i class="ink"></i></button></div>
 <div class="gh"><b>วันนี้</b><span>${N('td',td.length)} คำ</span>${td.length?`<button class="more" data-n4="list" data-f="today">ดูทั้งหมด ›</button>`:''}</div>
 ${td.length?row(td):note('วันนี้ยังไม่ได้เก็บคำใหม่ เก็บคำได้จากคลังคำน่ารู้และเรื่องอ่าน')}
 ${yd.length?`<div class="gh"><b>เมื่อวาน</b><span>${N('yd',yd.length)} คำ</span><button class="more" data-n4="list" data-f="yest">ดูทั้งหมด ›</button></div>${row(yd)}`:''}
 <div class="gh"><b>คำศัพท์ทั้งหมด</b><span>${N('ln',L.length)} คำที่ยังไม่ได้จำ</span></div>
 ${L.length?`<div class="grid">${W.map((w,i)=>card4(w,2,i)).join('')}</div>`:note('จำได้ครบทุกคำแล้ว คำทั้งหมดอยู่ใน “คำที่จำแล้ว”')}
 <div class="n4sp"></div>`}
const I4R='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="15" rx="2.5"/><path d="M8 3h10.5A2.5 2.5 0 0 1 21 5.5V17"/></svg>';
/* ปุ่มกลมลอยขวาล่าง (M2): ทบทวนแบบสุ่มปัดการ์ดทุกคำที่ยังไม่ได้จำ · ตัวเลข = จำนวนคำที่ยังไม่ได้จำ */
function nb4Dock(){const n=nbLearning().length;if(!n)return '';
 return `<button class="go press" data-n4="all" aria-label="ทบทวนคำศัพท์ที่ยังไม่ได้จำทั้งหมด ${n} คำ">${I4R}<b>ทบทวน</b><span class="nbc" data-k="fab">${n}</span></button>`}
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* วาดใหม่แบบ FLIP: การ์ดที่เหลือเลื่อนเข้าที่ · ตัวเลขที่เปลี่ยนเล่นแอนิเมชันสลับ */
function flipPaint(root,html){const old=new Map(),nums={};
 root.querySelectorAll('.cd[data-z]').forEach(c=>{const k=(c.closest('.grid')?'g':c.closest('.row')?'r'+[...root.querySelectorAll('.row')].indexOf(c.closest('.row')):'x')+c.dataset.z;old.set(k,c.getBoundingClientRect())});
 root.querySelectorAll('.n4[data-k]').forEach(n=>nums[n.dataset.k]=n.textContent);
 const pg=root.querySelector('[data-k=pg]');const pgw=pg&&pg.style.width;
 const sl=[...root.querySelectorAll('.row')].map(r=>r.scrollLeft);
 root.innerHTML=html;[...root.querySelectorAll('.row')].forEach((r,i)=>{if(sl[i])r.scrollLeft=sl[i]});
 if(RM())return;
 root.querySelectorAll('.cd[data-z]').forEach(c=>{const k=(c.closest('.grid')?'g':c.closest('.row')?'r'+[...root.querySelectorAll('.row')].indexOf(c.closest('.row')):'x')+c.dataset.z;const o=old.get(k);if(!o)return;const n=c.getBoundingClientRect();const dx=o.left-n.left,dy=o.top-n.top;
  if((dx||dy)&&c.animate)c.animate([{translate:`${dx}px ${dy}px`},{translate:'0 0'}],{duration:420,easing:'cubic-bezier(.32,.72,0,1)'})});
 root.querySelectorAll('.n4[data-k]').forEach(n=>{if(nums[n.dataset.k]!=null&&nums[n.dataset.k]!==n.textContent&&n.animate)n.animate([{transform:'translateY(70%) scale(.6)',opacity:0},{transform:'none',opacity:1}],{duration:450,easing:'cubic-bezier(.34,1.56,.64,1)'})});
 const pg2=root.querySelector('[data-k=pg]');if(pg2&&pgw&&pg2.animate&&pgw!==pg2.style.width)pg2.animate([{width:pgw},{width:pg2.style.width}],{duration:500,easing:'cubic-bezier(.34,1.56,.64,1)'})}
/* ตราประทับ "จำได้แล้ว" แล้วการ์ดร่วงลง */
function stampOut(c,stamp,cb,keep){if(!c||RM()||!c.animate){cb();return}c.classList.add('going');
 const k=c.querySelector('.k');if(k)k.classList.add('on');
 if(stamp){const s=document.createElement('span');s.className='stamp';s.textContent='จำได้แล้ว';c.appendChild(s);s.animate([{opacity:0,transform:'rotate(-14deg) scale(2.2)'},{opacity:.95,transform:'rotate(-14deg) scale(1)'}],{duration:350,delay:150,easing:'cubic-bezier(.2,1.6,.4,1)',fill:'both'})}
 if(keep){setTimeout(cb,750);return}
 const base=getComputedStyle(c).transform;const b0=base&&base!=='none'?base:'none';
 const a=c.animate([{transform:b0,opacity:1},{transform:`${b0==='none'?'':b0+' '}translateY(300px) rotate(-14deg)`,opacity:0}],{duration:500,delay:stamp?600:150,easing:'cubic-bezier(.5,0,.75,0)',fill:'forwards'});
 let done=false;const fin=()=>{if(done)return;done=true;cb()};a.onfinish=fin;setTimeout(fin,1400)}
/* กดปุ่มด้านบน: เอียง + หมึกไล่ แล้วจึงเปิดหน้า */
function pressFx(b,cb){if(RM()||!b.animate){cb();return}b.animate([{transform:'none'},{transform:'rotate(-2.5deg) scale(.95)',offset:.4},{transform:'rotate(1deg)',offset:.75},{transform:'none'}],{duration:450,easing:'ease'});
 const ink=b.querySelector('.ink');if(ink&&ink.animate)ink.animate([{width:'6px',opacity:.15},{width:'100%',opacity:.15,offset:.6},{width:'100%',opacity:0}],{duration:500,easing:'cubic-bezier(.32,.72,0,1)'});setTimeout(cb,330)}
/* การกระทำกับการ์ด (ใช้ทั้งหน้าสมุดและหน้ารายการ) */
function n4Wire(el,box,paint){let busy=false;
 const learn=(zh,c)=>{if(busy)return;busy=true;vib(10);stampOut(c,true,()=>{const prev=nbLearn(zh);busy=false;paint();snack(el,`ย้าย <span class="zh">${esc(zh)}</span> ไปที่ “คำที่จำแล้ว”`,()=>{nbRelearn(zh,prev);paint()})},el.dataset.keep==='1')};
 const back=(zh,c,out)=>{if(busy)return;busy=true;vib(10);const go2=()=>{nbRelearn(zh,null);busy=false;paint();snack(el,`ย้าย <span class="zh">${esc(zh)}</span> กลับมาทบทวนอีก`,()=>{nbLearn(zh);paint()})};out?stampOut(c,false,go2):go2()};
 const del=zh=>{nbRemove(zh);vib(10);paint();snack(el,`นำ <span class="zh">${esc(zh)}</span> ออกจากสมุดแล้ว`,()=>{const e=NB()[zh];if(e){const d=(e.k||0)>Math.max(e.t||0,e.r||0);e.t=stamp();if(d)e.k=stamp();save()}paint()})};
 const onAct=(t,e)=>{const a=t.dataset.n4;
  if(a==='all'){if(!nbLearning().length){toast(nbAll().length?'จำได้ครบทุกคำแล้ว ยังไม่มีคำให้ทบทวน':'ยังไม่มีคำในสมุด');return}push('nbswipe',{all:1});return}if(a==='start'){if(!nbPool().length&&!nbLearning().length){toast(nbAll().length?'จำได้ครบทุกคำแล้ว ยังไม่มีคำให้ทบทวน':'ยังไม่มีคำในสมุด');return}push('nbswipe',{});return}if(a==='hub'){go('huball',t);return}
  if(a==='list'){const f=t.dataset.f;if(t.classList.contains('db'))pressFx(t,()=>push('nblist',{f}));else push('nblist',{f});return}
  const c=t.closest('.cd');if(!c)return;const zh=c.dataset.z;
  if(a==='say'){e.stopPropagation();speak(nbInfo(zh).say||zh,t);return}
  if(a==='done'){learn(zh,c);return}if(a==='back'){back(zh,c,el.dataset.out==='1');return}
  if(a==='open'){if(typeof hbOpen==='function'&&!(typeof hbOv!=='undefined'&&hbOv)){try{nbBig(el,c,paint);return}catch(err){}}wordSheet(zh,x=>{if(x==='done')learn(zh,c);else if(x==='back')back(zh,c,el.dataset.out==='1');else if(x==='del')del(zh)})}};
 box.addEventListener('click',e=>{const t=e.target.closest('[data-n4]');if(t)onAct(t,e)});
 el.addEventListener('click',e=>{if(box.contains(e.target))return;const t=e.target.closest('[data-n4]');if(t)onAct(t,e)});
 box.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.cd[data-n4=open]')){e.preventDefault();onAct(e.target,e)}})}
/* ---------- หน้าสมุดคำ ---------- */
SC.notebook=p=>({title:'สมุดคำของฉัน',body:`<div class="nb4 enter" data-nbb>${nb4Body()}</div><div class="dock nb4d" data-nbdock>${nb4Dock()}</div>`,
 mount(el){const box=el.querySelector('[data-nbb]');setTimeout(()=>box.classList.remove('enter'),1800);
  const dk=()=>{const d=el.querySelector('[data-nbdock]');if(d){d.innerHTML=nb4Dock();d.style.display=d.innerHTML?'':'none'}};dk();
  const paint=()=>{flipPaint(box,nb4Body());dk()};el._n4paint=paint;n4Wire(el,box,paint)},
 unmount(){if(typeof hbClose==='function')try{hbClose(1)}catch(e){}},
 refresh(el){if(el&&el._n4paint){el._n4paint();return true}}});
/* ---------- หน้ารายการตามตัวกรอง (คำศัพท์ทั้งหมด · คำที่จำแล้ว · วันนี้ · เมื่อวาน) ---------- */
const NBF={all:['คำศัพท์ทั้งหมด','คำทั้งหมดในสมุด',()=>nbAll(),'ยังไม่มีคำในสมุด'],done:['คำที่จำแล้ว','คำที่กด “จำได้แล้ว”',()=>nbLearned(),'ยังไม่มีคำที่จำได้แล้ว เมื่อจำคำไหนได้ กด “จำได้แล้ว” ที่การ์ดคำ'],
 today:['วันนี้','คำที่เก็บวันนี้และยังไม่ได้จำ',()=>nbLearning().filter(z=>ageOf((NB()[z]||{}).t)===0),'วันนี้ยังไม่ได้เก็บคำใหม่'],yest:['เมื่อวาน','คำที่เก็บเมื่อวานและยังไม่ได้จำ',()=>nbLearning().filter(z=>ageOf((NB()[z]||{}).t)===1),'ไม่มีคำที่เก็บเมื่อวานซึ่งยังไม่ได้จำ']};
function nbListBody(f){const F=NBF[f]||NBF.all;const zs=F[2]();const ws=zs.map(wd);
 return `<div class="large">${F[0]}</div><div class="gh sub"><span>${F[1]} · ${N('c',ws.length)} คำ</span></div>${ws.length?`<div class="grid">${ws.map((w,i)=>card4(w,1,i)).join('')}</div>`:note(F[3])}<div class="n4sp sm"></div>`}
SC.nblist=p=>{const f=NBF[p.f]?p.f:'all';return {title:NBF[f][0],body:`<div class="nb4 enter" data-nbb>${nbListBody(f)}</div>`,
 mount(el){const box=el.querySelector('[data-nbb]');setTimeout(()=>box.classList.remove('enter'),1800);if(f==='done')el.dataset.out='1';if(f==='all')el.dataset.keep='1';
  const paint=()=>flipPaint(box,nbListBody(f));el._n4paint=paint;n4Wire(el,box,paint)},
 unmount(){if(typeof hbClose==='function')try{hbClose(1)}catch(e){}},
 refresh(el){if(el&&el._n4paint){el._n4paint();return true}}}};

/* แตะการ์ดคำในสมุด = เปิดการ์ดคำใหญ่ W1 แบบเดียวกับห้องคำ (ใช้ hbOpen ใน hub.js) · ปัดซ้าย/ขวาไล่คำในหมวดเดียวกัน
   คำนอกคลัง (บทเรียน/เรื่องอ่าน) ใส่ข้อมูลเท่าที่มี ส่วนที่ไม่มีข้อมูลจะไม่แสดง · ปุ่มล่างบอกสถานะในสมุด */
function nbItem(zh){const h=hubItem(zh);if(h)return Object.assign({},h.it,{bg:h.s.bg,browse:!!h.s.browse});const i=nbInfo(zh);
 return {zh,py:i.py||'',th:i.th||'',use:'',ex:i.ex?[{zh:i.ex,py:i.exPy||'',th:i.exTh||'',say:i.ex}]:[],say:i.say||zh,lw:zh,i:-1,bg:TINT[hsh(zh)%TINT.length]}}
function nbBigBtn(it){const zh=it.zh;if(nbHas(zh)&&isDone(NB()[zh]))return `<button class="pill sm press nb-saved nb-dn" data-nbsave="${esc(zh)}" aria-pressed="true">${CK}จำได้แล้ว</button>`;return nbBtn(zh)}
function nbBig(el,c,paint){const sec=c.closest('.track,.grid')||c.parentNode;const cs=[...sec.querySelectorAll('.cd[data-z]')];const zs=cs.map(x=>x.dataset.z);const k=Math.max(0,zs.indexOf(c.dataset.z));
 let dirty=false;const S0={t:'สมุดคำ',bg:TINT[0],from:c,
  tag:(it,kc)=>it.s!=null?(it.browse?'<span class="hb-tag lv">อ่านเล่น</span>':hbTag(it,kc)):((l=>l?`<span class="hb-tag lv">ระดับ ${l}</span>`:'')(hbLv(it))),
  /* ปุ่มล่าง: จำได้แล้ว = ไม่นำออก (สั่นเบา ๆ) · อยู่ในสมุดแล้ว = นำออกพร้อมแถบเลิกทำ · เก็บลงสมุด = ใช้แบบเดิมของห้องคำ */
  save:(o,btn,it)=>{const zh=it.zh,rm=typeof hbRM==='function'&&hbRM();if(!nbHas(zh))return false;
   if(isDone(NB()[zh])){vib(6);if(!rm&&btn.animate)btn.animate([{transform:'none'},{transform:'translateX(-6px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'none'}],{duration:360,easing:'ease-out'});return true}
   const sw=()=>{const b=o.inn.querySelector('.ft [data-nbsave]');if(b)b.outerHTML=nbBigBtn(it);const ph=o.inn.querySelector('.ph');let r=ph&&ph.querySelector('.rib');
    if(nbHas(zh)){if(ph&&!r){r=document.createElement('i');r.className='rib';ph.appendChild(r)}}else if(r)r.remove()};
   nbRemove(zh);vib(10);sw();snack(o.ov,`นำ <span class="zh">${esc(zh)}</span> ออกจากสมุดแล้ว`,()=>{const e=NB()[zh];if(e){const d=(e.k||0)>Math.max(e.t||0,e.r||0);e.t=stamp();if(d)e.k=stamp();save()}if(hbOv===o&&o.list[o.k]===it)sw()});return true},
  btn:nbBigBtn,src:it=>(nbInfo(it.zh).src||''),
  tileOf:it=>{const t=[...el.querySelectorAll('.cd[data-z]')].find(x=>x.dataset.z===it.zh&&sec.contains(x))||null;if(!t)return null;const sc=el.querySelector('.scroller')||el;const r=t.getBoundingClientRect(),q=sc.getBoundingClientRect();return r.bottom>q.top+20&&r.top<q.bottom-60&&r.right>0&&r.left<innerWidth?t:null},
  onClose:()=>{const now=nbAll().join()+'|'+nbLearned().join();if(now!==snap)paint()}};
 const snap=nbAll().join()+'|'+nbLearned().join();
 hbOpen(S0,zs.map(nbItem),k,null,el)}
/* แถบเลิกทำ */
function snack(host,html,undo){host.querySelectorAll('.nb-snack').forEach(s=>s.remove());const d=document.createElement('div');d.className='nb-snack';d.setAttribute('role','status');d.innerHTML=`<span>${html}</span>${undo?'<button class="press" data-snk>เลิกทำ</button>':''}`;host.appendChild(d);
 if(d.animate)d.animate([{transform:'translateY(16px)',opacity:0},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.32,.72,0,1)'});
 const kill=()=>{if(!d.isConnected)return;if(d.animate){const a=d.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});a.onfinish=()=>d.remove()}else d.remove()};const tm=setTimeout(kill,5000);
 if(undo)d.querySelector('[data-snk]').onclick=e=>{e.stopPropagation();clearTimeout(tm);d.remove();vib(8);undo()};return d}
/* หน้ารายละเอียดคำ (แผ่นล่าง) */
function wordSheet(zh,after){const i=nbInfo(zh),e=NB()[zh];const done=isDone(e);
 openSheet(`<div class="center nb-wsh" style="padding:0 22px 6px"><div class="nb-wpic">${nbArt(zh,i.th)}</div><div class="zh" style="font-size:60px;line-height:1.2">${esc(zh)}</div><div style="font-size:22px;margin-top:2px">${i.py?pyHtml(i.py):''}</div><div style="font-size:20px;font-weight:600;margin-top:6px">${esc(i.th)}</div>
  ${i.ex?`<div class="nb-exb"><div class="zh">${esc(i.ex)}</div><div class="p">${esc(pyTxt(i.exPy))}</div><div class="t">${esc(i.exTh)}</div></div>`:''}
  <div class="cap mt8">${esc([i.src&&'เก็บจาก'+i.src,ago(e&&e.t)].filter(Boolean).join(' · '))}</div>
  <div class="nb-sheetbtn"><button class="pill sm ghost press" data-ws="say">${SPKI()}ฟังเสียง</button>${done?`<button class="pill sm press" data-ws="back">${RE}ทวนอีก</button>`:`<button class="pill sm ok press" data-ws="done">${CK}จำได้แล้ว</button>`}</div>
  <button class="pill sm ghost press mt12 nb-del" data-ws="del">ลบออกจากสมุด</button></div>`,{onMount:sh=>{speak(i.say||zh);sh.addEventListener('click',ev=>{const b=ev.target.closest('[data-ws]');if(!b)return;const a=b.dataset.ws;if(a==='say'){speak(i.say||zh,b);return}closeSheet();after&&after(a)})}})}
function startSheet(){const P=nbPool().length,all=!P;const n=P||nbLearning().length;
 openSheet(`<div style="padding:0 20px 4px"><div class="h2">ทบทวนคำในสมุด</div><p class="cap" style="margin:4px 0 14px">${all?`ยังไม่มีคำถึงรอบ ทวนล่วงหน้าทั้ง ${n} คำได้`:`ถึงรอบวันนี้ ${n} คำ`}</p>
  <div class="group" style="margin:0"><button class="row press" data-st="flip"><span class="tx"><b>บัตรคำ</b><small>ดูคำ นึกความหมาย แล้วพลิกดูคำตอบ</small></span>${CHEV}</button><button class="row press" data-st="quiz"><span class="tx"><b>ควิซ</b><small>เลือกคำตอบที่ถูก นับคะแนนและเหรียญ</small></span>${CHEV}</button></div></div>`,
 {onMount:sh=>sh.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;closeSheet();push(b.dataset.st==='flip'?'nbrev':'nbquiz',{all:all?1:0})})})}
/* ---------- ทบทวนแบบปัดการ์ด (ซ้งอี้ขอ 31 ต.ค. 2026 · ปัดขวา = จำได้แล้ว · ปัดซ้าย = ยังไม่คล่อง) ---------- */
SC.nbswipe=p=>({nav:`<div class="seshnav"><button class="x" data-ns="quit" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i data-nspg style="width:0"></i></div><div class="cap" data-nspc style="font-weight:600;color:var(--red);min-width:46px;text-align:right"></div></div>`,noRefresh:true,
 body:`<div class="nb4 nbsw" data-nsb></div>`,extra:`<div class="dock nbsw-dock" data-nsd></div>`,unmount(){stopAudio()},
 mount(el){const ws=p&&p.all?nbLearning().slice():(nbPool().length?nbPool():nbLearning().reverse()).slice(0,20);if(p&&p.all)for(let a=ws.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[ws[a],ws[b]]=[ws[b],ws[a]]}if(!ws.length){pop();return}
  let i=0,okN=0,noN=0,chkN=0,busy=false;const body=el.querySelector('[data-nsb]'),dock=el.querySelector('[data-nsd]');
  const prog=()=>{el.querySelector('[data-nspg]').style.width=Math.round(i/ws.length*100)+'%';el.querySelector('[data-nspc]').textContent=i<ws.length?`${i+1} / ${ws.length}`:''};
  const face=(zh,top)=>{const w=wd(zh),chk=isDone(NB()[zh]),src=nbInfo(zh).src||'';const tag=chk?'ตรวจว่ายังจำได้':/^คลัง/.test(src)?'จากคลังคำ':/^เรื่อง/.test(src)?'จากเรื่องอ่าน':'สมุดคำ';
   return `<div class="sc${top?' top':''}" data-z="${esc(zh)}"><span class="tp" style="background:${TAPE[hsh(zh)%4]}"></span><span class="tag">${tag}</span>${top?`<button class="spk press" data-ns="say" aria-label="ฟังเสียง ${esc(zh)}">${SPKI()}</button>`:''}<span class="ph">${pic(zh,w.th)}</span><div class="zh" style="font-size:72px;font-size:min(72px,calc(84cqw / ${Math.max([...zh].length,1)}))">${esc(zh)}</div><div class="p">${esc(w.py)}</div><div class="t">${esc(w.th)}</div>${top?'<span class="ms ok">จำได้แล้ว</span><span class="ms no">ยังไม่คล่อง</span>':''}</div>`};
  const finish=()=>{const xp=evX(4+ws.length*2),co=evC(2+Math.ceil(ws.length/2));addXp(xp,null,true);addCoins(co,true);save();try{confetti(40)}catch(e){}prog();
   body.innerHTML=`<div class="center" style="padding:24px 24px 0"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M('celebrate')}</div><div class="large" style="padding:6px 0 0">ทบทวนครบแล้ว</div><div style="font-size:16px;color:var(--sub2)">${ws.length} คำในรอบนี้</div></div>
    <div class="nb-stat"><div><b style="color:#2E8B57">${okN}</b><small>จำได้แล้ว</small></div><div><b style="color:#D9822B">${noN}</b><small>ยังไม่คล่อง</small></div><div><b>+${xp}</b><small>XP · +${co} เหรียญ</small></div></div>
    ${chkN?`<p class="cap center" style="padding:12px 30px 0">ยืนยันคำที่จำได้แล้ว ${chkN} คำ ระบบจะถามอีกครั้งใน 16 วัน</p>`:''}`;
   dock.innerHTML=`<button class="pill press" data-ns="quiz"><b>ทำควิซต่อ</b><small>คำในสมุด · เลือกคำตอบ</small></button><button class="pill sm ghost press mt12" data-ns="quit">กลับไปที่สมุด</button>`};
  const paint=()=>{if(i>=ws.length){finish();return}prog();
   body.innerHTML=`<div class="stk">${ws.slice(i+1,i+3).map((z,k)=>`<div class="under u${k+1}">${face(z,0)}</div>`).reverse().join('')}${face(ws[i],1)}</div>`;
   dock.innerHTML=`<div class="nsbar"><button class="nsb no press" data-ns="no" aria-label="ยังไม่คล่อง">${XX}</button><div class="hint">ปัดซ้าย ยังไม่คล่อง<br>ปัดขวา จำได้แล้ว</div><button class="nsb ok press" data-ns="yes" aria-label="จำได้แล้ว">${CK}</button></div>`;
   const c=body.querySelector('.sc.top');if(c&&c.animate&&!RM())c.animate([{transform:'translateY(14px) scale(.96)',opacity:.6},{transform:'none',opacity:1}],{duration:280,easing:'cubic-bezier(.32,.72,0,1)'});
   drag(c);try{speak(nbInfo(ws[i]).say||ws[i])}catch(e){}};
  const grade=yes=>{const zh=ws[i],e2=NB()[zh],chk=isDone(e2);if(!S.srs)S.srs={};
   if(!yes){if(chk)e2.r=stamp();S.srs[zh]={b:0,d:today()+1};save();noN++;vib(8)}
   else if(chk){S.srs[zh]={b:5,d:today()+16};save();okN++;chkN++;vib(10)}
   else{nbLearn(zh);okN++;vib(10)}};
  const fly=(yes,c,from)=>{if(busy)return;busy=true;c=c||body.querySelector('.sc.top');grade(yes);
   const done=()=>{busy=false;i++;paint()};if(!c||!c.animate||RM()){done();return}
   const m=c.querySelector('.ms.'+(yes?'ok':'no'));if(m)m.style.opacity=1;
   const dx=from||0,x2=(yes?1:-1)*(innerWidth+120);const a=c.animate([{transform:`translateX(${dx}px) rotate(${dx/18}deg)`},{transform:`translateX(${x2}px) rotate(${(yes?1:-1)*24}deg)`}],{duration:340,easing:'cubic-bezier(.4,0,.6,1)',fill:'forwards'});
   let f=false;const fin=()=>{if(f)return;f=true;done()};a.onfinish=fin;setTimeout(fin,600)};
  function drag(c){if(!c)return;let st=null;
   c.addEventListener('pointerdown',e=>{if(busy||e.button>0||e.target.closest('[data-ns]'))return;st={x:e.clientX,y:e.clientY,t:Date.now(),id:e.pointerId,dir:0}});
   c.addEventListener('pointermove',e=>{if(!st||e.pointerId!==st.id)return;const dx=e.clientX-st.x,dy=e.clientY-st.y;
    if(!st.dir){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;st.dir=Math.abs(dx)>Math.abs(dy)?1:2;if(st.dir===1){try{c.setPointerCapture(e.pointerId)}catch(_){}c.style.transition='none'}}
    if(st.dir!==1)return;e.preventDefault();c.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`;const k=Math.min(1,Math.abs(dx)/110);
    c.querySelector('.ms.ok').style.opacity=dx>0?k:0;c.querySelector('.ms.no').style.opacity=dx<0?k:0});
   const end=e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;if(s.dir!==1)return;const dx=e.clientX-s.x,v=dx/Math.max(1,Date.now()-s.t);
    if(Math.abs(dx)>110||Math.abs(v)>.6&&Math.abs(dx)>40){fly(dx>0,c,dx);return}
    c.style.transition='transform .3s cubic-bezier(.34,1.56,.64,1)';c.style.transform='';c.querySelectorAll('.ms').forEach(m=>m.style.opacity=0)};
   c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end)}
  el.addEventListener('click',e=>{const t=e.target.closest('[data-ns]');if(!t)return;const a=t.dataset.ns;
   if(a==='quit'){pop();return}if(a==='quiz'){replace('nbquiz',{all:0});return}
   if(a==='say'){e.stopPropagation();speak(nbInfo(ws[i]).say||ws[i],t);return}
   if(a==='yes'||a==='no'){fly(a==='yes')}});
  paint()}});
/* ---------- ทบทวนแบบบัตรคำพลิก (แบบเดิม · หน้าสมุดเปิดหน้าปัดการ์ดแทนแล้ว) ---------- */
SC.nbrev=p=>({nav:`<div class="seshnav"><button class="x" data-nr="quit" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i data-nrpg style="width:0"></i></div><div class="cap" data-nrpc style="font-weight:600;color:var(--red);min-width:46px;text-align:right"></div></div>`,noRefresh:true,
 body:`<div class="nbx" data-nrb></div>`,extra:`<div class="dock nb-rvdock" data-nrd></div>`,unmount(){stopAudio()},
 mount(el){const ws=(p.all?nbLearning().reverse():nbPool()).slice(0,20);if(!ws.length){pop();return}
  let i=0,flip=false,okN=0,noN=0,chkN=0;const hist=[];const body=el.querySelector('[data-nrb]'),dock=el.querySelector('[data-nrd]');
  const prog=()=>{el.querySelector('[data-nrpg]').style.width=Math.round((i+(flip?.5:0))/ws.length*100)+'%';el.querySelector('[data-nrpc]').textContent=i<ws.length?`${i+1} / ${ws.length}`:''};
  const card=()=>{const zh=ws[i],w=nbInfo(zh),chk=isDone(NB()[zh]);const tag=chk?'ตรวจว่ายังจำได้':(w.src||'สมุดคำ');
   const front=`<div class="nb-card" data-nr="flip"><span class="nb-tag">${esc(tag)}</span>${nbArt(zh,w.th)}<div class="bz zh">${esc(zh)}</div><div class="cap" style="margin-top:12px">นึกความหมายในใจ แล้วแตะเพื่อพลิก</div><button class="nb-say press" data-nr="say" aria-label="ฟังเสียง">${SPKI()}</button></div>`;
   const back=`<div class="nb-card nb-back" data-nr="say2"><span class="nb-tag">${esc(tag)}</span><div class="bz zh">${esc(zh)}</div><div class="bp">${w.py?pyHtml(w.py):''}</div><div class="nb-th">${esc(w.th)}</div>${w.ex?`<div class="ex"><div class="zh">${esc(w.ex)}</div><div class="p">${esc(pyTxt(w.exPy))}</div><div class="t">${esc(w.exTh)}</div></div>`:''}<button class="nb-say press" data-nr="say" aria-label="ฟังเสียง">${SPKI()}</button></div>`;
   return `<div class="cap center" style="padding-top:8px">ทบทวนสมุดคำ · ${okN?`จำได้แล้ว ${okN} คำ`:'บัตรคำ'}</div><div class="nb-flip">${flip?back:front}</div>`};
  const dockH=()=>flip?`<div style="display:flex;gap:12px"><button class="pill ghost press" data-nr="no" style="height:56px;flex:1;font-size:16px">ยังจำไม่ได้</button><button class="pill ok press" data-nr="yes" style="height:56px;flex:1;flex-direction:row;gap:6px;font-size:16px">${CK}จำได้แล้ว</button></div><p class="cap center" style="padding-top:8px">ยังจำไม่ได้ = กลับมาอีกพรุ่งนี้ · จำได้แล้ว = ออกจากกอง</p>`
   :`<button class="pill press" data-nr="flip" style="height:56px">พลิกดูความหมาย</button>`;
  const finish=()=>{document.querySelectorAll('.screen[data-name=nbrev] .nb-snack').forEach(x=>x.remove());const xp=evX(4+ws.length*2),co=evC(2+Math.ceil(ws.length/2));addXp(xp,null,true);addCoins(co,true);save();try{confetti(40)}catch(e){}
   body.innerHTML=`<div class="center" style="padding:24px 24px 0"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M('celebrate')}</div><div class="large" style="padding:6px 0 0">ทบทวนครบแล้ว</div><div style="font-size:16px;color:var(--sub2)">${ws.length} คำในรอบนี้</div></div>
    <div class="nb-stat"><div><b style="color:#2E8B57">${okN}</b><small>จำได้แล้ว</small></div><div><b style="color:var(--red)">${noN}</b><small>ยังจำไม่ได้</small></div><div><b>+${xp}</b><small>XP · +${co} เหรียญ</small></div></div>
    ${chkN?`<p class="cap center" style="padding:12px 30px 0">ยืนยันคำที่จำได้แล้ว ${chkN} คำ ระบบจะถามอีกครั้งใน 16 วัน</p>`:''}`;
   dock.innerHTML=`<button class="pill press" data-nr="quiz"><b>ทำควิซต่อ</b><small>คำในสมุด · เลือกคำตอบ</small></button><button class="pill sm ghost press mt12" data-nr="quit">กลับไปที่สมุด</button>`;prog()};
  const paint=anim=>{if(i>=ws.length){finish();return}body.innerHTML=card();dock.innerHTML=dockH();prog();const c=body.querySelector('.nb-card');
   if(anim&&c&&c.animate)c.animate(anim==='in'?[{transform:'translateX(40px)',opacity:0},{transform:'none',opacity:1}]:[{transform:'perspective(900px) rotateY(-90deg)'},{transform:'perspective(900px) rotateY(0)'}],{duration:anim==='in'?280:200,easing:'cubic-bezier(.32,.72,0,1)'})};
  const doFlip=()=>{if(flip)return;const c=body.querySelector('.nb-card');const go2=()=>{flip=true;paint('flip');speak(nbInfo(ws[i]).say||ws[i])};vib(6);
   if(c&&c.animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const a=c.animate([{transform:'perspective(900px) rotateY(0)'},{transform:'perspective(900px) rotateY(90deg)'}],{duration:170,easing:'ease-in',fill:'forwards'});a.onfinish=go2}else go2()};
  el.addEventListener('click',e=>{const t=e.target.closest('[data-nr],[data-snk]');if(!t||t.dataset.snk!==undefined)return;const a=t.dataset.nr;
   if(a==='quit'){pop();return}if(a==='quiz'){replace('nbquiz',{all:0});return}
   if(a==='say'){e.stopPropagation();speak(nbInfo(ws[i]).say||ws[i],t);return}if(a==='say2'){return}
   if(a==='flip'){doFlip();return}
   if(a==='no'||a==='yes'){const zh=ws[i],e2=NB()[zh],chk=isDone(e2);const prevS=srsOf(zh)?Object.assign({},srsOf(zh)):null;let undo=null;
    if(a==='no'){if(chk)e2.r=stamp();if(!S.srs)S.srs={};S.srs[zh]={b:0,d:today()+1};save();noN++;vib(8)}
    else if(chk){S.srs[zh]={b:5,d:today()+16};save();okN++;chkN++;vib(10)}
    else{nbLearn(zh);okN++;vib(10);const at=i;undo=()=>{nbRelearn(zh,prevS);okN--;i=at;flip=true;paint('in')}}
    hist.push(zh);i++;flip=false;paint('in');
    if(undo&&i<ws.length)snack(el,`ย้าย <span class="zh">${esc(zh)}</span> ไปที่ “จำได้แล้ว”`,undo)}})
  ;paint()}});
/* ---------- ควิซ (ใช้ระบบ session เดิม · เฉพาะคำในสมุด) ---------- */
SC.nbquiz=p=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},mount(el){
 const zs=shuffle(p.all?nbLearning():(nbPool().length?nbPool():nbLearning())).slice(0,8);if(!zs.length){pop();return}const ws=zs.map(nbWord);const types=['zh2th','th2zh','audio'];
 const pool=(()=>{const g=gw4();const m=new Map();[...ws,...nbAll().map(nbWord),...g].forEach(w=>{if(w&&w.zh&&w.th&&!m.has(w.zh))m.set(w.zh,w)});return [...m.values()]})();
 session(el,ws.map((w,i)=>({k:'q',q:(typeof picHas==='function'&&picHas(w)&&i%2===0&&picQ(w,i%4===0?'pic2zh':'aud2pic',pool))||makeQ(w,types[i%3],pool)})),res=>{
  const bad=new Set(res.wrong||[]);ws.forEach(w=>{const e=NB()[w.zh];if(bad.has(w.zh)&&isDone(e)){e.r=stamp()}});save();
  const xp=evX(res.correct*8),rc=evC(res.correct*2);addXp(xp,null,true);addCoins(rc,true);
  replace('result',{title:'ควิซสมุดคำเสร็จแล้ว',mascot:res.correct>=res.total*.6?'correct':'wrong',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:rc,stats:[['ตอบถูก',res.correct+'/'+res.total],['คำในสมุดที่ถึงรอบ',nbPool().length+' คำ']]})},{review:true})}});
/* ---------- การ์ดทางเข้าในแหล่งความรู้ ---------- */
window.nbEntry=()=>{const st=nbStats(),all=st.learn+st.done;const th=nbAll().filter(z=>nbArt(z)).slice(0,3);
 const sub=!all?'เก็บคำที่อยากจำไว้ทบทวนจนจำได้':st.learn?`กำลังจำ ${st.learn} คำ · ถึงรอบวันนี้ ${st.due}`:`จำได้แล้ว ${st.done} คำ`;
 return `<button class="nb-entry press" data-go="notebook" aria-label="สมุดคำของฉัน"><span class="ico">${BMF}</span><span class="tx"><b>สมุดคำของฉัน</b><small>${sub}</small></span>${th.length?`<span class="stk">${th.map(z=>`<span>${nbArt(z,nbInfo(z).th)}</span>`).join('')}</span>`:''}${CHEV}</button>`};
/* ปุ่มเก็บลงสมุด (ใช้ในหน้าคำของคลังคำ และแผ่นแตะคำในเรื่องอ่าน) */
Object.assign(window.GOX=window.GOX||{},{notebook(){push('notebook',{})},nbswipe(){push('notebook',{});setTimeout(()=>push('nbswipe',{all:1}),60)}});
})();
