/* ล็อกอิน LINE (LIFF) + ซิงก์ความคืบหน้าขึ้นคลาวด์ — ไม่บังคับ: ผู้เยี่ยมชมใช้ localStorage เหมือนเดิม
   • ปิดเองทั้งหมดถ้า sync-config.js ยังไม่มี LIFF_ID/endpoint (ไม่โหลด SDK ไม่ส่งข้อมูล ไม่มีปุ่ม)
   • ไม่เชื่อ userId จากเครื่องผู้ใช้: ส่ง LINE ID token ให้เซิร์ฟเวอร์ตรวจกับ LINE เอง แล้วได้ "session" ที่เซิร์ฟเวอร์เซ็นไว้กลับมา
   • รวมข้อมูลแบบไม่หาย (sync-merge.js) · บันทึกถี่ ๆ รวมเป็นการส่งครั้งเดียว (debounce) · ส่งค้างตอนปิดแท็บ
   • backend เป็นอแดปเตอร์: window.LAMA_SYNC_ADAPTERS[name]={configured,login,pull,push,remove} (โหลดก่อน sync.js) — มี supabase แล้ว (sync-supabase.js) */
(function(){
const C=window.LAMA_SYNC_CONFIG||{};
const ADAPTERS=window.LAMA_SYNC_ADAPTERS=window.LAMA_SYNC_ADAPTERS||{};
const LS_META='lamasync-meta';/* ไม่ขึ้นต้นด้วย lama- เพื่อไม่ให้ติดไปกับไฟล์สำรอง/รหัสสำรอง (มี session token) */
const SDK='https://static.line-scdn.net/liff/edge/2/sdk.js';
const filled=v=>typeof v==='string'&&v.trim()&&!/^\[|TBD|YOUR_|xxx/i.test(v);
const api={enabled:false,registerAdapter(n,a){ADAPTERS[n]=a},status:()=>({...st,meta:{...meta,session:meta.session?'(set)':''}})};
window.LamaSync=api;
let meta={};try{meta=JSON.parse(localStorage.getItem(LS_META)||'{}')||{}}catch(e){meta={}}
const saveMeta=()=>{try{localStorage.setItem(LS_META,JSON.stringify(meta))}catch(e){}};
const st={phase:'idle',err:'',busy:false};
let liffReady=null,pushT=null,inflight=null,dirty=false,origSave=null;

function adapter(){return ADAPTERS[C.BACKEND||'supabase']}
function configured(){return filled(C.LIFF_ID)&&!!adapter()&&adapter().configured()}

/* ---------- LIFF ---------- */
function loadSdk(){if(window.liff)return Promise.resolve(window.liff);
 return new Promise((res,rej)=>{const s=document.createElement('script');s.src=SDK;s.async=true;s.onload=()=>window.liff?res(window.liff):rej(new Error('no liff'));s.onerror=()=>rej(new Error('โหลด LINE SDK ไม่ได้'));document.head.appendChild(s)})}
function initLiff(){if(!liffReady)liffReady=loadSdk().then(l=>l.init({liffId:C.LIFF_ID}).then(()=>l)).catch(e=>{liffReady=null;throw e});return liffReady}
const cbParams=()=>/[?&](code|liff\.state|liffClientId|liffRedirectUri)=/.test(location.search);
const inLine=()=>/ Line\//i.test(navigator.userAgent);

/* ---------- state ---------- */
const getS=()=>(typeof S!=='undefined'?S:null);
function applyState(merged){const s=getS();if(!s)return;for(const k of Object.keys(merged))s[k]=merged[k];origSave&&origSave();
 try{if(typeof refresh==='function')refresh()}catch(e){}}
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

async function ensureSession(interactive){
 if(meta.session&&(meta.exp||0)>Date.now()+60e3)return meta.session;
 const l=await initLiff();
 if(!l.isLoggedIn()){if(!interactive)throw Object.assign(new Error('ต้องเข้าสู่ระบบ LINE อีกครั้ง'),{relogin:true});
  meta.pending=1;saveMeta();l.login({redirectUri:location.href.split('#')[0]});return new Promise(()=>{})}/* ออกจากหน้าไปหน้า LINE */
 const tok=l.getIDToken();if(!tok)throw new Error('ไม่ได้รับ ID token จาก LINE (ตรวจว่าเปิด scope openid ใน LIFF)');
 const r=await adapter().login(tok);/* เซิร์ฟเวอร์ตรวจ token กับ LINE แล้วเซ็น session ให้ */
 let nm='';try{const d=l.getDecodedIDToken();nm=(d&&d.name)||''}catch(e){}
 Object.assign(meta,{session:r.session,exp:r.exp,linked:1,pending:0,name:nm});saveMeta();return r.session}

/* ดึงจากคลาวด์ → รวม → เขียนในเครื่อง → ส่งกลับถ้าในเครื่องมีมากกว่า */
async function pullMerge(){const ses=await ensureSession(false);const cloud=await adapter().pull(ses);const s=getS();if(!s)return;
 const local=JSON.parse(JSON.stringify(s));
 if(!cloud||!cloud.state){meta.rev=0;saveMeta();await pushNow();return}
 const merged=LamaMerge.mergeState(local,cloud.state,meta.tLocal||0,cloud.t||0);
 meta.rev=cloud.rev;saveMeta();
 if(!same(merged,local))applyState(merged);
 if(!same(merged,cloud.state))await pushNow();else{meta.last=Date.now();saveMeta()}}

async function pushNow(keepalive){clearTimeout(pushT);pushT=null;
 if(inflight)return inflight.then(()=>dirty&&pushNow());
 inflight=(async()=>{dirty=false;const s=getS();if(!s)return;
  for(let i=0;i<3;i++){const ses=await ensureSession(false);
   const body={state:JSON.parse(JSON.stringify(s)),t:meta.tLocal||Date.now(),baseRev:meta.rev||0};
   if(JSON.stringify(body.state).length>900e3)throw new Error('ข้อมูลใหญ่เกินจะซิงก์');
   const r=await adapter().push(ses,body,{keepalive});
   if(r.ok){meta.rev=r.rev;meta.last=Date.now();saveMeta();return}
   if(r.conflict){/* อีกเครื่องส่งมาก่อน: รวมกับของล่าสุดแล้วลองใหม่ */
    const merged=LamaMerge.mergeState(body.state,r.state||{},body.t,r.t||0);meta.rev=r.rev;saveMeta();if(!same(merged,body.state))applyState(merged);continue}
   throw new Error('ซิงก์ไม่สำเร็จ')}
  throw new Error('ข้อมูลชนกันหลายครั้ง ลองใหม่ภายหลัง')})();
 try{await inflight;st.err=''}catch(e){st.err=e.message||String(e);if(e.status===401||e.relogin){meta.session='';saveMeta()}throw e}finally{inflight=null}}

function schedulePush(){if(!meta.linked)return;dirty=true;clearTimeout(pushT);pushT=setTimeout(()=>{pushNow().catch(()=>{})},C.PUSH_DEBOUNCE_MS||4000)}

/* ---------- UI ---------- */
const CSS=`.lsync-ban{position:absolute;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 74px);z-index:60;background:#fff;border-radius:16px;box-shadow:0 6px 24px rgba(0,0,0,.16);padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:14px;line-height:1.45;transform:translateY(12px);opacity:0;transition:.25s}
.lsync-ban.on{transform:none;opacity:1}.lsync-ban b{display:block;font-size:15px}.lsync-ban .tx{flex:1;min-width:0}
.lsync-ban .go{background:#06C755;color:#fff;border:0;border-radius:999px;padding:8px 12px;font:inherit;font-weight:700;white-space:nowrap}
.lsync-ban .x{background:none;border:0;color:#888;font-size:20px;line-height:1;padding:4px 2px}`;
function injectCss(){if(document.getElementById('lsync-css'))return;const s=document.createElement('style');s.id='lsync-css';s.textContent=CSS;document.head.appendChild(s)}
function fmtT(t){if(!t)return 'ยังไม่เคย';const d=new Date(t);return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')+' น. '+d.getDate()+'/'+(d.getMonth()+1)}
const R=(bg,em,t,sub,right,attrs)=>typeof ROW==='function'?ROW(bg,em,t,sub,right,attrs):`<button class="row press" ${attrs}><span class="tx"><b>${t}</b><small>${sub}</small></span></button>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function meSection(){
 if(!meta.linked)return `<div class="sec">บัญชี LINE</div><div class="group">${R('#E7F8EE','💚','เข้าสู่ระบบด้วย LINE','เก็บความคืบหน้าไว้ในบัญชี เปลี่ยนเครื่องก็ไม่หาย',undefined,'data-sync="login"')}</div>`;
 const sub=(meta.name?esc(meta.name)+' · ':'')+(st.err?'⚠️ '+esc(st.err):'ซิงก์ล่าสุด '+fmtT(meta.last));
 return `<div class="sec">บัญชี LINE</div><div class="group">${R('#E7F8EE','✅','เชื่อมกับ LINE แล้ว',sub,'<span class="val">ซิงก์ตอนนี้</span>','data-sync="now"')}
  ${R('#EAF1FB','🚪','ออกจากระบบ','ข้อมูลในเครื่องนี้ยังอยู่ครบ',undefined,'data-sync="logout"')}
  ${R('#FDECEC','🗑️','ลบข้อมูลบนคลาวด์','ลบความคืบหน้าที่เก็บไว้ในบัญชี (ในเครื่องนี้ไม่ถูกลบ)',undefined,'data-sync="delete"')}</div>`}
function hookMe(){if(typeof SC==='undefined'||!SC.me||SC.me.__lsync)return;const orig=SC.me;
 const w=function(){const r=orig.apply(this,arguments);if(!r||typeof r.body!=='string')return r;
  const mk='<div class="sec">ข้อมูลและความเป็นส่วนตัว</div>',sec=meSection();
  r.body=r.body.indexOf(mk)>=0?r.body.replace(mk,sec+mk):r.body+sec;
  const om=r.mount;r.mount=function(el){om&&om.apply(this,arguments);el.addEventListener('click',onMeClick)};return r};
 w.__lsync=1;SC.me=w}
async function onMeClick(e){const t=e.target.closest('[data-sync]');if(!t||st.busy)return;const a=t.dataset.sync;st.busy=true;
 const say=m=>{try{toast(m)}catch(x){}};
 try{
  if(a==='login'){await doLogin()}
  else if(a==='now'){say('กำลังซิงก์…');await pullMerge();say('ซิงก์แล้ว ✓')}
  else if(a==='logout'){if(!confirm('ออกจากระบบ LINE บนเครื่องนี้? ความคืบหน้าในเครื่องยังอยู่ครบ'))return;
   if(dirty)await pushNow().catch(()=>{});try{const l=await initLiff();if(l.isLoggedIn())l.logout()}catch(x){}
   meta={tLocal:meta.tLocal,promptN:meta.promptN,promptAt:meta.promptAt};saveMeta();say('ออกจากระบบแล้ว')}
  else if(a==='delete'){if(!confirm('ลบความคืบหน้าที่เก็บไว้บนคลาวด์ทั้งหมด และออกจากระบบ? ข้อมูลในเครื่องนี้ไม่ถูกลบ'))return;
   const ses=await ensureSession(false);await adapter().remove(ses);try{const l=await initLiff();if(l.isLoggedIn())l.logout()}catch(x){}
   meta={tLocal:meta.tLocal,promptN:9};saveMeta();say('ลบข้อมูลบนคลาวด์แล้ว')}
 }catch(x){st.err=x.message||String(x);say(st.err)}finally{st.busy=false;try{refresh()}catch(x){}}}
async function doLogin(){
 if(!confirm('เข้าสู่ระบบด้วย LINE เพื่อเก็บความคืบหน้าในบัญชี?\n\nสิ่งที่เก็บ: ความคืบหน้าในแอป (บทเรียน XP เหรียญ สตรีค คำที่ทบทวน) และรหัสผู้ใช้ LINE ของคุณ\nไม่เก็บ: รายชื่อเพื่อน แชต หรือเบอร์โทร\nออกจากระบบหรือลบข้อมูลบนคลาวด์ได้ทุกเมื่อที่หน้า “ฉัน”'))return;
 hideBanner();meta.consent=Date.now();saveMeta();
 await ensureSession(true);await pullMerge();try{toast('เชื่อมกับ LINE แล้ว ความคืบหน้าถูกเก็บในบัญชี ✓')}catch(x){}}

/* ชวนล็อกอินแบบไม่รบกวน: หลังเรียนจบตามจำนวนที่ตั้ง · ไม่เกิน 3 ครั้ง · ห่างกันอย่างน้อย 3 วัน · ไม่ทับหน้าต่างอื่น */
function maybePrompt(){const n=C.PROMPT_AFTER_UNITS;if(!n||meta.linked||st.busy)return;const s=getS();if(!s||(s.parts||[]).length<n)return;
 if((meta.promptN||0)>=3||Date.now()-(meta.promptAt||0)<3*864e5)return;
 if(document.querySelector('#sheetLayer.on,.welcome,.onb,.lsync-ban'))return;
 const fr=document.getElementById('frame');if(!fr)return;injectCss();
 const b=document.createElement('div');b.className='lsync-ban';b.setAttribute('role','dialog');b.setAttribute('aria-label','เก็บความคืบหน้าด้วย LINE');
 b.innerHTML='<span style="font-size:26px">💚</span><span class="tx"><b>เก็บความคืบหน้าไว้ในบัญชี LINE</b>เปลี่ยนเครื่องหรือล้างเบราว์เซอร์ก็ไม่หาย</span><button class="go" data-l="go">เข้าสู่ระบบ</button><button class="x" data-l="x" aria-label="ไว้ทีหลัง">×</button>';
 b.onclick=e=>{const a=e.target.closest('[data-l]');if(!a)return;if(a.dataset.l==='go'){doLogin().catch(x=>{try{toast(x.message)}catch(y){}})}else hideBanner()};
 fr.appendChild(b);requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add('on')));
 meta.promptN=(meta.promptN||0)+1;meta.promptAt=Date.now();saveMeta();setTimeout(hideBanner,15000)}
function hideBanner(){const b=document.querySelector('.lsync-ban');if(b){b.classList.remove('on');setTimeout(()=>b.remove(),260)}}

/* ---------- boot ---------- */
function hookSave(){if(typeof window.save!=='function'||window.save.__lsync)return;origSave=window.save;
 const w=function(){const r=origSave.apply(this,arguments);meta.tLocal=Date.now();saveMeta();schedulePush();clearTimeout(hookSave.p);hookSave.p=setTimeout(maybePrompt,1500);return r};
 w.__lsync=1;window.save=w}
function start(){
 if(!configured())return;/* ยังไม่ตั้งค่า → ปิดทั้งระบบ */
 api.enabled=true;hookSave();hookMe();
 /* "ล้างข้อมูลทั้งหมด" ลบคีย์ lama-* ไปแล้ว → ถือว่าออกจากระบบบนเครื่องนี้ (ไม่ดึงคลาวด์กลับมาเอง) */
 if(meta.linked&&!localStorage.getItem(typeof KEY!=='undefined'?KEY:'lama-cn-web-demo-v2')){meta={promptN:meta.promptN,promptAt:meta.promptAt};saveMeta()}
 api.login=doLogin;api.syncNow=pullMerge;api.flush=()=>pushNow();
 const kick=()=>{
  if(meta.linked||meta.pending||cbParams()){
   initLiff().then(l=>{if(meta.pending&&!l.isLoggedIn()){meta.pending=0;saveMeta();return}
    if(meta.pending&&!meta.consent){meta.pending=0;saveMeta();return}
    return pullMerge()}).then(()=>{try{refresh()}catch(e){}}).catch(e=>{st.err=e.message||String(e)})}
  else if(inLine())initLiff().then(()=>setTimeout(maybePrompt,2500)).catch(()=>{});
  else setTimeout(maybePrompt,3000)};
 if(document.readyState==='complete')setTimeout(kick,0);else addEventListener('load',()=>setTimeout(kick,0));
 document.addEventListener('visibilitychange',()=>{if(!meta.linked)return;
  if(document.visibilityState==='hidden'){if(dirty||pushT)pushNow(true).catch(()=>{})}
  else if(Date.now()-(meta.last||0)>60e3)pullMerge().catch(()=>{})})}
/* sync.js โหลดแบบ defer: รันหลังสคริปต์หลักทั้งหมด แต่ก่อน DOMContentLoaded (boot) → SC.me ถูกห่อทันก่อนวาดจอแรก */
if(document.readyState==='loading')start();else{start();try{refresh()}catch(e){}}
})();
