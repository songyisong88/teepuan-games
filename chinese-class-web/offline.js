/* ใช้งานออฟไลน์ (เฟส 7) — หน้า "ใช้งานออฟไลน์" ในแท็บ ฉัน
   ตัวแอป (shell) ถูกแคชโดย sw.js ตอนเปิดครั้งแรกอยู่แล้ว · หน้านี้ให้ผู้ใช้กดดาวน์โหลดแพ็กเพิ่ม (เสียง/รูป/ลำดับขีด ต่อระดับ, ฟอนต์จีน, ห้องพินอิน)
   ไฟล์ที่ดาวน์โหลดเก็บใน Cache Storage ชื่อ lama-dl-v1 (sw.js อ่านจากที่นี่ก่อน) · ไม่มีการส่งข้อมูลใดออกจากเครื่อง */
(()=>{const DL='lama-dl-v1',AVG={a:15,p:21,s:3.5};/* KB เฉลี่ยต่อไฟล์ (เสียง/รูป/ลำดับขีด) ใช้ประมาณขนาดก่อนดาวน์โหลด */
const OK=()=>'caches' in window&&'serviceWorker' in navigator&&location.protocol!=='file:';
const audioOf=t=>{const out=[];['','f|'].forEach(p=>{const h=window.AUDIO_INDEX&&AUDIO_INDEX[p+t];if(h)out.push('audio/'+h+'.mp3')});return out};
function strs(o,acc){if(typeof o==='string')acc.add(o);else if(Array.isArray(o))o.forEach(x=>strs(x,acc));else if(o&&typeof o==='object')for(const k in o)strs(o[k],acc);return acc}
const hexOf=c=>c.codePointAt(0).toString(16);
function packLv(lv){const L=LESSONS.filter(l=>l.lv===lv);const a=new Set(),p=new Set(),s=new Set();
 L.forEach(l=>{strs(l,new Set()).forEach(t=>audioOf(t).forEach(u=>a.add(u)));if(window.ART_IDX&&ART_IDX['lesson/'+l.id])p.add('assets/art/lesson/'+encodeURIComponent(l.id)+'.webp');
  l.words.forEach(w=>{if(window.ART_IDX&&ART_IDX['word/'+w.zh])p.add('assets/art/word/'+encodeURIComponent(w.zh)+'.webp');
   if(typeof stkHan==='function'&&typeof STK_SET!=='undefined')stkHan(w.zh).forEach(c=>{if(STK_SET.has(c))s.add('data/stroke/'+hexOf(c)+'.json')})})});
 /* นิทาน/บทความของระดับนี้ (ห้องฝึกพิเศษ): เสียงประโยค+คำ และรูปปกบทความ */
 ((window.LABS&&LABS.stories)||[]).filter(x=>x.lv===lv).forEach(x=>{x.s.forEach(z=>audioOf(z.z).forEach(u=>a.add(u)));Object.keys(x.d||{}).forEach(t=>audioOf(t).forEach(u=>a.add(u)));if(x.pic&&window.ART_IDX&&ART_IDX['word/'+x.pic])p.add('assets/art/word/'+encodeURIComponent(x.pic)+'.webp')});
 return {a:[...a],p:[...p],s:[...s]}}
function packs(){const P=[];[1,2,3,4,5].forEach(lv=>{if(!LESSONS.some(l=>l.lv===lv))return;const k=packLv(lv);const urls=[...k.a,...k.p,...k.s];
  P.push({id:'lv'+lv,em:'📘',t:'แพ็ก HSK '+lv,sub:`เสียง ${k.a.length.toLocaleString('en-US')} · รูป ${k.p.length} · ลำดับขีด ${k.s.length.toLocaleString('en-US')} ไฟล์`,urls,kb:Math.round(k.a.length*AVG.a+k.p.length*AVG.p+k.s.length*AVG.s),est:true})});
 const O=window.OFF_IDX||{};
 if(O.cjkFonts&&O.cjkFonts.length)P.push({id:'font',em:'🔤',t:'ฟอนต์ตัวจีน (Noto Serif SC)',sub:'ให้ตัวจีนแสดงด้วยฟอนต์ของแอปเมื่อออฟไลน์ · '+O.cjkFonts.length+' ไฟล์',urls:O.cjkFonts,kb:O.cjkKB});
 if(typeof RAD_PIC!=='undefined'&&window.ART_IDX){const urls=[...new Set(Object.values(RAD_PIC).map(p=>[p[2]||'word',p[0]]).filter(([k,z])=>ART_IDX[k+'/'+z]).map(([k,z])=>'assets/art/'+k+'/'+encodeURIComponent(z)+'.webp'))];if(urls.length)P.push({id:'radpic',em:'🖼️',t:'รูปประกอบตัวข้าง',sub:'เรียนตัวอักษร · รูป '+urls.length+' ไฟล์',urls,kb:Math.round(urls.length*AVG.p),est:true})}
 if(typeof PR_SY!=='undefined'){const a=new Set();PR_SY.forEach(s=>audioOf(s.c).forEach(u=>a.add(u)));const urls=[...(O.pinroom||[]),...a];P.push({id:'pin',em:'🔊',t:'ห้องพินอิน',sub:`เสียง ${a.size} · รูป ${(O.pinroom||[]).length} ไฟล์`,urls,kb:Math.round((O.pinroomKB||0)+a.size*AVG.a),est:true})}
 return P}
const fmt=kb=>kb>=1024?(kb/1024).toFixed(kb>=10240?0:1)+' MB':Math.max(1,Math.round(kb))+' KB';
let have=null,job=null,est=null,P=null,swOn=false,shellOk=false;
async function scan(){if(!OK())return;try{const c=await caches.open(DL);have=new Set((await c.keys()).map(r=>new URL(r.url).pathname));
  const ks=await caches.keys();shellOk=ks.includes('lama-shell-'+(window.APP_VER||''));
  swOn=!!navigator.serviceWorker.controller;est=navigator.storage&&navigator.storage.estimate?await navigator.storage.estimate():null}catch(e){have=new Set()}paint()}
const abs=u=>new URL(u,location.href).pathname;
const nHave=p=>have?p.urls.reduce((t,u)=>t+(have.has(abs(u))?1:0),0):0;
function rowHtml(p){const n=nHave(p),all=n===p.urls.length&&n>0,run=job&&job.id===p.id;
 const st=run?`กำลังดาวน์โหลด ${job.done.toLocaleString('en-US')}/${job.total.toLocaleString('en-US')}${job.fail?` · ล้มเหลว ${job.fail}`:''}`:all?'✓ อยู่ในเครื่องแล้ว':n?`มีในเครื่อง ${n.toLocaleString('en-US')}/${p.urls.length.toLocaleString('en-US')}`:'ยังไม่ได้ดาวน์โหลด';
 return `<div class="row off-row" id="off-${p.id}"><span class="ic" style="background:#EAF1FB">${p.em}</span><span class="tx"><b>${p.t}</b><small>${p.sub} · ${p.est?'ประมาณ ':''}${fmt(p.kb)}</small><small class="off-st" style="color:${all?'var(--green,#1E9E5A)':'var(--sub2)'}">${st}</small>${run?`<span class="prog" style="margin-top:6px;display:block"><i style="width:${Math.round(job.done/Math.max(1,job.total)*100)}%"></i></span>`:''}</span>
  ${run?`<button class="pill sm ghost press" data-off-stop="1">หยุด</button>`:all?`<button class="pill sm ghost press" data-off-del="${p.id}" aria-label="ลบ${p.t}">ลบ</button>`:`<button class="pill sm press" data-off-get="${p.id}" ${job?'disabled':''} aria-label="ดาวน์โหลด${p.t}">${n?'ต่อ':'โหลด'}</button>`}</div>`}
function paint(){const el=document.getElementById('off-packs');if(!el||!P)return;el.innerHTML=P.map(rowHtml).join('');const s=document.getElementById('off-stat');if(s)s.innerHTML=statHtml()}
function statHtml(){if(!OK())return 'เบราว์เซอร์นี้ไม่รองรับการเก็บไฟล์ไว้ใช้ออฟไลน์';
 const on=navigator.onLine;return `<div>${on?'🟢 ออนไลน์อยู่':'⚪ ออฟไลน์อยู่ — ใช้ได้เฉพาะสิ่งที่อยู่ในเครื่อง'}</div><div>${swOn&&shellOk?'✓ ตัวแอปพร้อมเปิดแบบออฟไลน์ (เวอร์ชัน '+(window.APP_VER||'')+')':swOn?'กำลังเก็บตัวแอปเวอร์ชันล่าสุด… เปิดหน้านี้ใหม่อีกครั้งภายหลัง':'ยังไม่พร้อม — เปิดแอปตอนมีเน็ตให้โหลดเสร็จหนึ่งครั้ง แล้วเปิดใหม่'}</div>${est&&est.usage!=null?`<div>ใช้พื้นที่ในเครื่อง ${fmt(est.usage/1024)}${est.quota?` จากที่เบราว์เซอร์ให้ได้ ${fmt(est.quota/1024)}`:''}</div>`:''}`}
async function get(id){if(job)return;if(!have)await scan();if(!have)return;const p=P.find(x=>x.id===id);if(!p)return;if(!navigator.onLine){toast('ต้องต่อเน็ตก่อนดาวน์โหลด');return}
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
 const c=await caches.open(DL);const todo=p.urls.filter(u=>!have.has(abs(u)));job={id,total:p.urls.length,done:p.urls.length-todo.length,fail:0,stop:false};paint();
 let i=0;const worker=async()=>{while(i<todo.length&&!job.stop){const u=todo[i++];try{const r=await fetch(u,{headers:{'x-lama-dl':'1'}});if(!r.ok)throw 0;await c.put(u,r);have.add(abs(u))}catch(e){job.fail++}job.done++;if(job.done%20===0||job.done===job.total)paint()}};
 try{await Promise.all([0,1,2,3,4,5].map(worker))}catch(e){}
 const f=job.fail,stopped=job.stop;job=null;await scan();toast(stopped?'หยุดแล้ว · กด “ต่อ” เพื่อโหลดส่วนที่เหลือ':f?`โหลดไม่สำเร็จ ${f} ไฟล์ — ลองกด “ต่อ” อีกครั้ง`:p.t+' พร้อมใช้ออฟไลน์ ✓')}
async function del(id){const p=P.find(x=>x.id===id);if(!p||job)return;if(!confirm('ลบ '+p.t+' ออกจากเครื่อง? (ใช้ออนไลน์ได้ตามปกติ)'))return;
 const c=await caches.open(DL);const keep=new Set();P.filter(x=>x.id!==id&&nHave(x)>=x.urls.length).forEach(x=>x.urls.forEach(u=>keep.add(abs(u))));
 await Promise.all(p.urls.filter(u=>!keep.has(abs(u))).map(u=>c.delete(u)));await scan();toast('ลบแล้ว')}
SC.offline=()=>{P=packs();return {title:'ใช้งานออฟไลน์',body:`<div class="large">ใช้งานออฟไลน์</div>
 <div class="card pad2" style="margin:0 20px 12px;font-size:14.5px;line-height:1.6" id="off-stat" role="status">${statHtml()}</div>
 <div class="sec">แพ็กที่ดาวน์โหลดได้ (ไม่บังคับ)</div><div class="group" id="off-packs">${P.map(rowHtml).join('')}</div>
 <div class="card pad2" style="margin:12px 20px;font-size:14px;line-height:1.6"><b>ทำงานอย่างไร</b><br>• ตัวแอป บทเรียน เกม ฟอนต์ไทย และรูปน้องลามา เก็บไว้ในเครื่องอัตโนมัติหลังเปิดครั้งแรก — เปิดแอปได้แม้ไม่มีเน็ต<br>• เสียง รูปคำศัพท์ และลำดับขีดที่เคยเปิดแล้ว จะถูกเก็บไว้เองด้วย (เสียงเก็บล่าสุด 400 ไฟล์)<br>• กดโหลดแพ็กด้านบนถ้าอยากให้ใช้ได้ครบทั้งระดับก่อนออฟไลน์ · ขนาดที่บอกเป็นค่าประมาณ<br>• ต้องใช้เน็ตเสมอ: ลิงก์ LINE และหน้าภายนอก · ตัวที่ไม่มีคลิปเสียงจะใช้เสียงอ่านของเครื่อง ซึ่งบางเครื่องต้องใช้เน็ต<br>• ไฟล์ทั้งหมดอยู่ใน Cache Storage ของเบราว์เซอร์ในเครื่องนี้ ไม่ส่งข้อมูลใดออกไป · ถ้าเครื่องพื้นที่เต็ม เบราว์เซอร์อาจลบเองได้</div>
 <div class="group"><button class="row noic press" id="off-clear"><span class="tx"><b style="color:var(--red)">ลบไฟล์ออฟไลน์ทั้งหมด</b><small>แพ็กที่โหลด + เสียง/รูปที่เก็บไว้เอง (ไม่ลบความก้าวหน้า)</small></span></button></div>`,
 mount(el){scan();el.onclick=e=>{const g=e.target.closest('[data-off-get]'),d=e.target.closest('[data-off-del]'),s=e.target.closest('[data-off-stop]');
   if(g){vib(8);get(g.dataset.offGet)}else if(d){del(d.dataset.offDel)}else if(s&&job){job.stop=true}
   else if(e.target.closest('#off-clear')){if(job){toast('รอให้ดาวน์โหลดเสร็จหรือกดหยุดก่อน');return}if(!confirm('ลบไฟล์ออฟไลน์ทั้งหมด? ความก้าวหน้าไม่หาย'))return;
    caches.keys().then(ks=>Promise.all(ks.filter(k=>/^lama-(dl|audio-rt|art|stk|font)-/.test(k)).map(k=>caches.delete(k)))).then(scan).then(()=>toast('ลบไฟล์ออฟไลน์แล้ว'))}}}}};
window.GOX=window.GOX||{};GOX.offline=()=>push('offline',{});
addEventListener('online',paint);addEventListener('offline',paint);
window.offStatusSub=()=>!OK()?'เบราว์เซอร์นี้ไม่รองรับ':navigator.serviceWorker.controller?'เปิดได้แม้ไม่มีเน็ต · โหลดเสียง/รูปเพิ่มได้':'โหลดเสียง/รูปไว้ใช้ตอนไม่มีเน็ต';
})();
