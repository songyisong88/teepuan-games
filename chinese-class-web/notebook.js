/* สมุดคำของฉัน (ซ้งอี้อนุมัติแบบ A: รายการ + แท็บ)
   ข้อมูล: S.nb[zh] = {t:เวลาเก็บ, x:เวลานำออก, k:เวลากดจำได้แล้ว, r:เวลานำกลับมาทวน, py, th, src} ทุกช่องเป็นเวลา (ms) เพื่อให้ sync-merge (ค่ามากสุดชนะ) รวมสองเครื่องได้ถูก
   อยู่ในสมุด = t > x · จำได้แล้ว = อยู่ในสมุด และ k > max(t, r) · รอบทบทวนใช้ S.srs + srsGrade เดิม (จำได้แล้ว = b5 กลับมาตรวจอีกครั้งหลัง 16 วัน) */
(()=>{
const BM='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>';
const BMF='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>';
const CK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const XX='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const RE='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/></svg>';
const SPKI=()=>typeof HB_SPK!=='undefined'?HB_SPK:SPK;
window.NB_ICON={BM,BMF,CK};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NB=()=>{if(!S.nb||typeof S.nb!=='object'||Array.isArray(S.nb))S.nb={};return S.nb};
const now=()=>Math.max(Date.now(),(nbLast||0)+1);let nbLast=0;const stamp=()=>(nbLast=now());
const isOn=e=>!!e&&(e.t||0)>(e.x||0);
const isDone=e=>isOn(e)&&(e.k||0)>Math.max(e.t||0,e.r||0);
const srsOf=zh=>(S.srs||{})[zh];
const isDue=zh=>{const r=srsOf(zh);return !r||!(r.d>today())};
/* ข้อมูลคำ: คำในบทเรียน > คำในคลัง > คำจากเรื่องอ่าน (เก็บ py/th ไว้ในสมุด) */
function hubItem(zh){if(typeof HB_SETS==='undefined')return null;for(const s of HB_SETS)for(const it of s.items)if(it.zh===zh)return {it,s};return null}
function nbInfo(zh){const e=NB()[zh]||{};const w=typeof wordBy==='function'&&wordBy(zh);
 if(w)return {zh,py:w.py,th:w.th,ex:w.ex,exPy:w.exPy,exTh:w.exTh,src:e.src||'',w};
 const h=hubItem(zh);if(h){const x=h.it.ex&&h.it.ex[0];return {zh,py:h.it.py,th:h.it.th,ex:x&&x.zh,exPy:x&&x.py,exTh:x&&x.th,say:h.it.say,src:e.src||'คลัง'+h.s.t,w:wordAny(zh)}}
 return {zh,py:e.py||'',th:e.th||'',src:e.src||'',w:null}}
const nbWord=zh=>{const i=nbInfo(zh);return i.w||{zh,py:i.py,th:i.th}};
const pyTxt=p=>typeof pyPlain==='function'?pyPlain(p||''):(p||'');
/* ---------- API ---------- */
window.nbHas=zh=>isOn(NB()[zh]);
window.nbDoneHas=zh=>isDone(NB()[zh]);
window.nbAdd=(zh,info,src)=>{const nb=NB();const e=Object.assign({},nb[zh]||{});e.t=stamp();if(info){if(info.py)e.py=info.py;if(info.th)e.th=info.th}if(src)e.src=src;nb[zh]=e;
 if(!S.srs)S.srs={};const r=S.srs[zh]||{b:0,d:0};if(!(r.d<=today()))r.d=today();if(!(typeof wordBy==='function'&&wordBy(zh)))r.b=0;S.srs[zh]=r;save()};
window.nbRemove=zh=>{const e=NB()[zh];if(!e)return;e.x=stamp();save()};
function nbLearn(zh){const e=NB()[zh];if(!e)return null;const prev=srsOf(zh)?Object.assign({},srsOf(zh)):null;e.k=stamp();if(!S.srs)S.srs={};S.srs[zh]={b:5,d:today()+16};save();return prev}
function nbRelearn(zh,prev){const e=NB()[zh];if(!e)return;e.r=stamp();if(!S.srs)S.srs={};S.srs[zh]=prev&&prev.b<5?prev:{b:0,d:today()};save()}
window.nbToggle=(zh,info,src)=>{if(nbHas(zh)){nbRemove(zh);return false}nbAdd(zh,info,src);return true};
function nbAll(){const nb=NB();return Object.keys(nb).filter(z=>isOn(nb[z])).sort((a,b)=>(nb[b].t||0)-(nb[a].t||0))}
const nbLearning=()=>nbAll().filter(z=>!isDone(NB()[z]));
const nbLearned=()=>nbAll().filter(z=>isDone(NB()[z])).sort((a,b)=>(NB()[b].k||0)-(NB()[a].k||0));
/* กองทบทวน: คำที่กำลังจำและถึงรอบ + คำที่จำได้แล้วซึ่งครบ 16 วัน (ถามซ้ำเพื่อยืนยัน) · เรียงคำที่เก็บก่อนขึ้นก่อน */
const nbPool=()=>[...nbLearning().filter(isDue).reverse(),...nbLearned().filter(isDue)];
window.nbStats=()=>({learn:nbLearning().length,done:nbLearned().length,due:nbPool().length});
/* ย้ายคำที่เคยกด "เก็บ" จากคลังคำ (ระบบเดิมเก็บใน S.srs) เข้าสมุด — ทำซ้ำได้ ไม่ซ้ำซ้อน · คำในบทเรียนแยกไม่ออกว่าเก็บจากคลังหรือไม่ จึงไม่ย้าย */
function nbMigrate(){if(typeof HB_SETS==='undefined'||!S.srs)return;const nb=NB();let n=0;
 for(const s of HB_SETS)for(const it of s.items){if(nb[it.zh]||!S.srs[it.zh]||(typeof wordBy==='function'&&wordBy(it.zh)))continue;nb[it.zh]={t:1+n,src:'คลัง'+s.t};n++}
 if(n){S.nbMig=(S.nbMig||0)+n;save()}}
try{nbMigrate()}catch(e){}
/* ---------- เวลาแบบอ่านง่าย ---------- */
function ago(ms,pre){if(!ms||ms<1e11)return pre?'':'';const d=Math.floor((Date.now()-ms)/864e5),day=new Date(ms).toDateString()===new Date().toDateString();
 const t=day?'วันนี้':d<=1?'เมื่อวาน':d<7?d+' วันก่อน':d<30?Math.floor(d/7)+' สัปดาห์ก่อน':Math.floor(d/30)+' เดือนก่อน';return (pre||'')+t}
const pic=(zh,th)=>art('word',zh,'','',th)||`<span class="nb-zt"><span class="zh">${esc(zh)}</span></span>`;
function rowHtml(zh,tab){const e=NB()[zh],i=nbInfo(zh),done=tab==='done';const chk=done&&isDue(zh);
 const sub=done?`<span class="nb-badge">${CK.replace(/18/g,'12')}${chk?'ถึงรอบตรวจว่ายังจำได้':ago(e.k,'จำได้ ')||'จำได้แล้ว'}</span>`:esc([i.src,ago(e.t)].filter(Boolean).join(' · '));
 const right=done?`<button class="nb-ghost press" data-nba="back">ทวนอีก</button>`:`<button class="nb-ok press" data-nba="done">${CK}จำได้แล้ว</button>`;
 const acts=done?`<button class="b" data-nba="back">${RE}ทวนอีก</button><button class="r" data-nba="del">${XX}ลบออก</button>`:`<button class="g" data-nba="done">${CK}จำได้แล้ว</button><button class="r" data-nba="del">${XX}ลบออก</button>`;
 return `<div class="nb-sw" data-z="${esc(zh)}"><div class="nb-act" aria-hidden="true">${acts}</div><div class="nb-row" data-nba="open"><span class="nb-pic">${pic(zh,i.th)}<button class="nb-spk" data-nba="say" aria-label="ฟังเสียง ${esc(zh)}">${SPKI()}</button></span><div class="nb-tx"><div class="z"><span class="zh">${esc(zh)}</span><i>${esc(pyTxt(i.py))}</i></div><div class="t">${esc(i.th)}</div><div class="s">${sub}</div></div>${right}</div></div>`}
let nbTab='learn';
function nbBody(){const L=nbLearning(),D=nbLearned(),P=nbPool();const all=L.length+D.length;
 if(!all)return `<div class="empty nb-empty"><div style="width:150px;height:150px">${M('empty')}</div><b>ยังไม่มีคำในสมุด</b><p>กด “เก็บลงสมุด” ที่หน้าคำในคลังคำน่ารู้ หรือแตะคำในนิทานและบทความ แล้วกดเก็บ คำนั้นจะมาอยู่ที่นี่เพื่อให้ทบทวนจนจำได้</p><button class="pill sm press mt16" data-nba="hub">ไปที่คลังคำน่ารู้</button></div>`;
 const learn=nbTab==='learn';const due=L.filter(isDue),later=L.filter(z=>!isDue(z)),chk=D.filter(isDue),ok=D.filter(z=>!isDue(z));
 const grp=(h,zs,tab)=>zs.length?`<div class="sec">${h} · ${zs.length} คำ</div><div class="group nb-grp">${zs.map(z=>rowHtml(z,tab)).join('')}</div>`:'';
 return `<div class="nb-stat"><div><b>${L.length}</b><small>กำลังจำ</small></div><div><b style="color:#2E8B57">${D.length}</b><small>จำได้แล้ว</small></div><div><b style="color:var(--red)">${P.length}</b><small>ถึงรอบวันนี้</small></div></div>
 <div class="seg" role="tablist" style="margin-top:16px"><span class="th" style="width:calc(50% - 3px);transform:translateX(${learn?0:'100%'})"></span><button role="tab" class="${learn?'on':''}" data-nbtab="learn" aria-selected="${learn}">กำลังจำ ${L.length}</button><button role="tab" class="${learn?'':'on'}" data-nbtab="done" aria-selected="${!learn}">จำได้แล้ว ${D.length}</button></div>
 ${learn?(L.length?grp('ถึงรอบวันนี้',due,'learn')+grp('ยังไม่ถึงรอบ',later,'learn'):`<div class="empty" style="padding:30px 36px 0"><b>ทบทวนครบทุกคำแล้ว</b><p>คำที่จำได้แล้วอยู่ในแท็บ “จำได้แล้ว” เก็บคำใหม่เพิ่มได้จากคลังคำและเรื่องอ่าน</p></div>`)
 :(D.length?grp('ถึงรอบตรวจว่ายังจำได้',chk,'done')+grp('จำได้แล้ว',ok,'done')+`<p class="cap" style="padding:12px 24px 0">คำที่จำได้แล้วจะไม่อยู่ในกองทบทวน ระบบจะถามอีกครั้งหลัง 16 วันเพื่อยืนยันว่ายังจำได้ กด “ทวนอีก” เพื่อนำกลับมาในกอง</p>`:`<div class="empty" style="padding:30px 36px 0"><b>ยังไม่มีคำที่จำได้แล้ว</b><p>เมื่อจำคำไหนได้ กด “จำได้แล้ว” หรือปัดแถวไปทางซ้าย คำจะย้ายมาอยู่ที่นี่</p></div>`)}
 <p class="cap center" style="padding:14px 30px 0">ปัดแถวไปทางซ้ายเพื่อดูคำสั่งเพิ่ม</p>`}
function nbDock(){const P=nbPool().length,L=nbLearning().length;if(!P&&!L)return '';
 return P?`<button class="pill press" data-nba="start"><b>เริ่มทบทวน</b><small>${P} คำถึงรอบ · บัตรคำและควิซ</small></button>`:`<button class="pill press" data-nba="start"><b>ทบทวนล่วงหน้า</b><small>ยังไม่มีคำถึงรอบ · ทวนทั้ง ${L} คำได้</small></button>`}
/* แถบเลิกทำ */
function snack(host,html,undo){host.querySelectorAll('.nb-snack').forEach(s=>s.remove());const d=document.createElement('div');d.className='nb-snack';d.setAttribute('role','status');d.innerHTML=`<span>${html}</span>${undo?'<button class="press" data-snk>เลิกทำ</button>':''}`;host.appendChild(d);
 if(d.animate)d.animate([{transform:'translateY(16px)',opacity:0},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.32,.72,0,1)'});
 const kill=()=>{if(!d.isConnected)return;if(d.animate){const a=d.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});a.onfinish=()=>d.remove()}else d.remove()};const tm=setTimeout(kill,5000);
 if(undo)d.querySelector('[data-snk]').onclick=e=>{e.stopPropagation();clearTimeout(tm);d.remove();vib(8);undo()};return d}
/* ปัดแถวไปทางซ้าย (เหมือนแอปข้อความของ iPhone) */
const OPEN=168;
function swipeRows(root){let cur=null;const close=(sw,anim=true)=>{const r=sw&&sw.querySelector('.nb-row');if(!r)return;r.style.transition=anim?'transform .32s cubic-bezier(.32,.72,0,1)':'none';r.style.transform='';sw.classList.remove('open')};
 root._nbClose=()=>{root.querySelectorAll('.nb-sw.open').forEach(s=>close(s))};
 let st=null;
 root.addEventListener('pointerdown',e=>{const row=e.target.closest('.nb-row');if(!row||e.button>0)return;const sw=row.parentNode;if(e.clientX<24)return;
  root.querySelectorAll('.nb-sw.open').forEach(s=>{if(s!==sw)close(s)});st={sw,row,x:e.clientX,y:e.clientY,base:sw.classList.contains('open')?-OPEN:0,dir:0,id:e.pointerId}});
 root.addEventListener('pointermove',e=>{if(!st||e.pointerId!==st.id)return;const dx=e.clientX-st.x,dy=e.clientY-st.y;
  if(!st.dir){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;st.dir=Math.abs(dx)>Math.abs(dy)*1.2?1:2;if(st.dir===1){try{st.row.setPointerCapture(e.pointerId)}catch(_){}st.row.style.transition='none'}}
  if(st.dir!==1)return;let v=st.base+dx;if(v>0)v=v/4;if(v<-OPEN)v=-OPEN+(v+OPEN)/3;st.row.style.transform=`translateX(${v}px)`});
 const end=e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;if(s.dir!==1)return;root._nbSwiped=Date.now();const m=/-?[\d.]+/.exec(s.row.style.transform||'');const v=m?+m[0]:0;
  s.row.style.transition='transform .32s cubic-bezier(.32,.72,0,1)';if(v<-OPEN/2){s.row.style.transform=`translateX(${-OPEN}px)`;s.sw.classList.add('open');vib(6)}else close(s.sw)};
 root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);
 root._nbOpen=sw=>{const r=sw.querySelector('.nb-row');r.style.transition='transform .32s cubic-bezier(.32,.72,0,1)';r.style.transform=`translateX(${-OPEN}px)`;sw.classList.add('open')}}
function collapse(sw,cb){if(!sw||!sw.animate){cb();return}const h=sw.offsetHeight;const a=sw.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:240,easing:'cubic-bezier(.32,.72,0,1)',fill:'forwards'});a.onfinish=cb}
/* หน้ารายละเอียดคำ (แผ่นล่าง) */
function wordSheet(zh,after){const i=nbInfo(zh),e=NB()[zh];const done=isDone(e);
 openSheet(`<div class="center nb-wsh" style="padding:0 22px 6px"><div class="nb-wpic">${art('word',zh,'','',i.th)}</div><div class="zh" style="font-size:60px;line-height:1.2">${esc(zh)}</div><div style="font-size:22px;margin-top:2px">${i.py?pyHtml(i.py):''}</div><div style="font-size:20px;font-weight:600;margin-top:6px">${esc(i.th)}</div>
  ${i.ex?`<div class="nb-exb"><div class="zh">${esc(i.ex)}</div><div class="p">${esc(pyTxt(i.exPy))}</div><div class="t">${esc(i.exTh)}</div></div>`:''}
  <div class="cap mt8">${esc([i.src&&'เก็บจาก'+i.src,ago(e&&e.t)].filter(Boolean).join(' · '))}</div>
  <div class="nb-sheetbtn"><button class="pill sm ghost press" data-ws="say">${SPKI()}ฟังเสียง</button>${done?`<button class="pill sm press" data-ws="back">${RE}ทวนอีก</button>`:`<button class="pill sm ok press" data-ws="done">${CK}จำได้แล้ว</button>`}</div>
  <button class="pill sm ghost press mt12 nb-del" data-ws="del">ลบออกจากสมุด</button></div>`,{onMount:sh=>{speak(i.say||zh);sh.addEventListener('click',ev=>{const b=ev.target.closest('[data-ws]');if(!b)return;const a=b.dataset.ws;if(a==='say'){speak(i.say||zh,b);return}closeSheet();after&&after(a)})}})}
/* ---------- หน้าสมุดคำ ---------- */
SC.notebook=p=>{if(p&&p.tab)nbTab=p.tab;return {title:'สมุดคำของฉัน',body:`<div class="nbx"><div class="large">สมุดคำของฉัน</div><p class="cap" style="padding:4px 20px 0">คำที่คุณเก็บไว้ ทบทวนจนจำได้แล้วกด “จำได้แล้ว” เพื่อย้ายออกจากกอง</p><div data-nbb>${nbBody()}</div><div style="height:140px"></div></div><div class="dock" data-nbdock>${nbDock()}</div>`,
 mount(el){const box=el.querySelector('[data-nbb]');swipeRows(box);
  const paint=()=>{box.innerHTML=nbBody();const d=el.querySelector('[data-nbdock]');if(d){d.innerHTML=nbDock();d.style.display=d.innerHTML?'':'none'}};
  const dk=el.querySelector('[data-nbdock]');if(dk&&!dk.innerHTML)dk.style.display='none';
  const act=(a,zh,sw)=>{const z=`<span class="zh">${esc(zh)}</span>`;
   if(a==='done'){const prev=nbLearn(zh);vib(10);collapse(sw,paint);snack(el,`ย้าย ${z} ไปที่ “จำได้แล้ว”`,()=>{nbRelearn(zh,prev);paint()})}
   else if(a==='back'){nbRelearn(zh,null);vib(10);collapse(sw,paint);snack(el,`ย้าย ${z} กลับไปที่ “กำลังจำ”`,()=>{nbLearn(zh);paint()})}
   else if(a==='del'){nbRemove(zh);vib(10);collapse(sw,paint);snack(el,`นำ ${z} ออกจากสมุดแล้ว`,()=>{const e=NB()[zh];if(e){e.t=stamp();save()}paint()})}};
  el.addEventListener('click',e=>{const tb=e.target.closest('[data-nbtab]');if(tb){if(nbTab!==tb.dataset.nbtab){nbTab=tb.dataset.nbtab;vib(6);paint()}return}
   const t=e.target.closest('[data-nba]');if(!t)return;const a=t.dataset.nba;
   if(a==='start'){startSheet();return}if(a==='hub'){go('huball',t);return}
   const sw=t.closest('.nb-sw');if(!sw)return;const zh=sw.dataset.z;
   if(box._nbSwiped&&Date.now()-box._nbSwiped<350)return;
   if(a==='open'){if(sw.classList.contains('open')){box._nbClose();return}if(box.querySelector('.nb-sw.open')){box._nbClose();return}wordSheet(zh,x=>{if(x==='done'||x==='back'||x==='del')act(x,zh,sw)});return}
   if(a==='say'){e.stopPropagation();speak(nbInfo(zh).say||zh,t);return}
   act(a,zh,sw)})},
 refresh(el){const box=el&&el.querySelector('[data-nbb]');if(box){box.innerHTML=nbBody();const d=el.querySelector('[data-nbdock]');if(d){d.innerHTML=nbDock();d.style.display=d.innerHTML?'':'none'}return true}}}};
function startSheet(){const P=nbPool().length,all=!P;const n=P||nbLearning().length;
 openSheet(`<div style="padding:0 20px 4px"><div class="h2">ทบทวนคำในสมุด</div><p class="cap" style="margin:4px 0 14px">${all?`ยังไม่มีคำถึงรอบ ทวนล่วงหน้าทั้ง ${n} คำได้`:`ถึงรอบวันนี้ ${n} คำ`}</p>
  <div class="group" style="margin:0"><button class="row press" data-st="flip"><span class="tx"><b>บัตรคำ</b><small>ดูคำ นึกความหมาย แล้วพลิกดูคำตอบ</small></span>${CHEV}</button><button class="row press" data-st="quiz"><span class="tx"><b>ควิซ</b><small>เลือกคำตอบที่ถูก นับคะแนนและเหรียญ</small></span>${CHEV}</button></div></div>`,
 {onMount:sh=>sh.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;closeSheet();push(b.dataset.st==='flip'?'nbrev':'nbquiz',{all:all?1:0})})})}
/* ---------- ทบทวนแบบบัตรคำพลิก ---------- */
SC.nbrev=p=>({nav:`<div class="seshnav"><button class="x" data-nr="quit" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i data-nrpg style="width:0"></i></div><div class="cap" data-nrpc style="font-weight:600;color:var(--red);min-width:46px;text-align:right"></div></div>`,noRefresh:true,
 body:`<div class="nbx" data-nrb></div>`,extra:`<div class="dock nb-rvdock" data-nrd></div>`,unmount(){stopAudio()},
 mount(el){const ws=(p.all?nbLearning().reverse():nbPool()).slice(0,20);if(!ws.length){pop();return}
  let i=0,flip=false,okN=0,noN=0,chkN=0;const hist=[];const body=el.querySelector('[data-nrb]'),dock=el.querySelector('[data-nrd]');
  const prog=()=>{el.querySelector('[data-nrpg]').style.width=Math.round((i+(flip?.5:0))/ws.length*100)+'%';el.querySelector('[data-nrpc]').textContent=i<ws.length?`${i+1} / ${ws.length}`:''};
  const card=()=>{const zh=ws[i],w=nbInfo(zh),chk=isDone(NB()[zh]);const tag=chk?'ตรวจว่ายังจำได้':(w.src||'สมุดคำ');
   const front=`<div class="nb-card" data-nr="flip"><span class="nb-tag">${esc(tag)}</span>${art('word',zh,'','',w.th)}<div class="bz zh">${esc(zh)}</div><div class="cap" style="margin-top:12px">นึกความหมายในใจ แล้วแตะเพื่อพลิก</div><button class="nb-say press" data-nr="say" aria-label="ฟังเสียง">${SPKI()}</button></div>`;
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
window.nbEntry=()=>{const st=nbStats(),all=st.learn+st.done;const th=nbAll().filter(z=>window.ART_IDX&&ART_IDX['word/'+z]).slice(0,3);
 const sub=!all?'เก็บคำที่อยากจำไว้ทบทวนจนจำได้':st.learn?`กำลังจำ ${st.learn} คำ · ถึงรอบวันนี้ ${st.due}`:`จำได้แล้ว ${st.done} คำ`;
 return `<button class="nb-entry press" data-go="notebook" aria-label="สมุดคำของฉัน"><span class="ico">${BMF}</span><span class="tx"><b>สมุดคำของฉัน</b><small>${sub}</small></span>${th.length?`<span class="stk">${th.map(z=>`<span>${art('word',z,'','',nbInfo(z).th)}</span>`).join('')}</span>`:''}${CHEV}</button>`};
/* ปุ่มเก็บลงสมุด (ใช้ในหน้าคำของคลังคำ และแผ่นแตะคำในเรื่องอ่าน) */
window.nbBtn=(zh,cls)=>{const on=nbHas(zh);return `<button class="pill sm press ${on?'nb-saved':''} ${cls||''}" data-nbsave="${esc(zh)}" aria-pressed="${on}">${on?BMF+'อยู่ในสมุดแล้ว':BM+'เก็บลงสมุด'}</button>`};
window.nbSaveToggle=(zh,info,src)=>{const on=nbToggle(zh,info,src);vib(on?12:8);toast(on?'เก็บลงสมุดแล้ว':'นำออกจากสมุดแล้ว');return on};
window.nbBtnClick=(btn,info,src)=>{const zh=btn.dataset.nbsave;nbSaveToggle(zh,info,src);btn.outerHTML=nbBtn(zh,[...btn.classList].filter(c=>!/^(pill|sm|press|nb-saved)$/.test(c)).join(' '))};
Object.assign(window.GOX=window.GOX||{},{notebook(){push('notebook',{})}});
})();
