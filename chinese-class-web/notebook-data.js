/* สมุดคำของฉัน (ซ้งอี้อนุมัติแบบ A: รายการ + แท็บ)
   ข้อมูล: S.nb[zh] = {t:เวลาเก็บ, x:เวลานำออก, k:เวลากดจำได้แล้ว, r:เวลานำกลับมาทวน, py, th, src} ทุกช่องเป็นเวลา (ms) เพื่อให้ sync-merge (ค่ามากสุดชนะ) รวมสองเครื่องได้ถูก
   อยู่ในสมุด = t > x · จำได้แล้ว = อยู่ในสมุด และ k > max(t, r) · รอบทบทวนใช้ S.srs + srsGrade เดิม (จำได้แล้ว = b5 กลับมาตรวจอีกครั้งหลัง 16 วัน) */
/* notebook-data.js = ชั้นข้อมูล (S.nb, ย้ายคำเก่า, รอบทบทวน) + ปุ่ม "เก็บลงสมุด" — ใช้ได้โดยไม่ต้องมีหน้าสมุด
   หน้าสมุด/ทบทวน (แบบ A) อยู่ใน notebook-page.js — เปลี่ยนแบบหน้าได้โดยเขียนไฟล์หน้าใหม่ที่อ่าน window.NBX
   แล้วกำหนด SC.notebook, GOX.notebook และ window.nbEntry (การ์ดทางเข้า) เอง */
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
window.nbBtn=(zh,cls)=>{const on=nbHas(zh);return `<button class="pill sm press ${on?'nb-saved':''} ${cls||''}" data-nbsave="${esc(zh)}" aria-pressed="${on}">${on?BMF+'อยู่ในสมุดแล้ว':BM+'เก็บลงสมุด'}</button>`};
window.nbSaveToggle=(zh,info,src,btn)=>{const on=nbToggle(zh,info,src);vib(on?12:8);
 /* A07 เก็บคำลงสมุด (fx.js) แทนข้อความเดิม · การนำออกยังใช้ข้อความเดิม */
 let fx=false;if(on&&btn&&window.FX)try{fx=FX.save(btn,zh,nbLearning().length)}catch(e){fx=false}
 if(!fx)toast(on?'เก็บลงสมุดแล้ว':'นำออกจากสมุดแล้ว');return on};
window.nbBtnClick=(btn,info,src)=>{const zh=btn.dataset.nbsave;nbSaveToggle(zh,info,src,btn);btn.outerHTML=nbBtn(zh,[...btn.classList].filter(c=>!/^(pill|sm|press|nb-saved)$/.test(c)).join(' '))};
/* ให้ไฟล์หน้าสมุด (แบบใดก็ได้) ใช้ฟังก์ชันข้อมูลชุดเดียวกัน */
window.NBX={BM,BMF,CK,XX,RE,SPKI,esc,NB,stamp,isOn,isDone,srsOf,isDue,hubItem,nbInfo,nbWord,pyTxt,nbLearn,nbRelearn,nbAll,nbLearning,nbLearned,nbPool,nbMigrate,nbHas:window.nbHas,nbDoneHas:window.nbDoneHas,nbAdd:window.nbAdd,nbRemove:window.nbRemove,nbToggle:window.nbToggle,nbStats:window.nbStats};
})();
