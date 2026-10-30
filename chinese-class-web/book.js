/* ห้องเรียนคู่หนังสือ: เสียงประกอบหนังสือ "ภาษาจีนสำหรับผู้เริ่มต้น" 32 บท
   หน้าจอ: bookhome (หน้าแรก) · booklist (เลือกบท) · bookch (หน้าบท/นิทาน/แบบทดสอบ) · bookplay (เล่นแทร็ก)
   ข้อมูล: data/book1.js (บท จาก TOC) · data/book1-tracks.js (แทร็ก) · data/book1-audio.js (ดัชนีเสียงเพิ่มเติม)
   สร้างข้อมูลใหม่: python3 tools/book-build/build_book.py แล้ว node build.js
   ลิงก์ตรง: ?go=book&ch=9 (บทที่ 1–32) · ch=s1..s5 นิทานท้ายภาค · ch=q1..q5 แบบทดสอบย่อยภาค
   ความคืบหน้าเก็บในเครื่องเท่านั้น (localStorage lama-book1) ไม่ต้องสมัคร ไม่ต้องใช้รหัส */
(function(){
/* เสียงของห้องนี้อยู่แยกไฟล์ รวมเข้าดัชนีหลักเฉพาะคีย์ที่ยังไม่มี */
try{if(window.BOOK1_AUDIO){window.AUDIO_INDEX=window.AUDIO_INDEX||{};for(const k in BOOK1_AUDIO)if(!AUDIO_INDEX[k])AUDIO_INDEX[k]=BOOK1_AUDIO[k]}}catch(e){}

/* ---------- ไอคอน (ชุดเดียวกับม็อกอัป) ---------- */
const sv=(p,w=22,c='currentColor',sw=1.8)=>`<svg class="bk-mi" width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I={
 play:(w=16)=>`<svg class="bk-mi" width="${w}" height="${w}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 4.8v14.4c0 .8.9 1.3 1.6.9l11.3-7.2c.6-.4.6-1.3 0-1.7L9.1 3.9c-.7-.4-1.6.1-1.6.9z"/></svg>`,
 pause:(w=16)=>`<svg class="bk-mi" width="${w}" height="${w}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/></svg>`,
 prev:(w=26)=>`<svg class="bk-mi" width="${w}" height="${w}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="5" width="2.6" height="14" rx="1.2"/><path d="M19 5.6v12.8c0 .8-.9 1.2-1.5.8L8.4 12.8a1 1 0 0 1 0-1.6l9.1-6.4c.6-.4 1.5 0 1.5.8z"/></svg>`,
 next:(w=26)=>`<svg class="bk-mi" width="${w}" height="${w}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="17.4" y="5" width="2.6" height="14" rx="1.2"/><path d="M5 5.6v12.8c0 .8.9 1.2 1.5.8l9.1-6.4a1 1 0 0 0 0-1.6L6.5 4.8C5.9 4.4 5 4.8 5 5.6z"/></svg>`,
 replay:(w=26)=>sv('<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',w,'currentColor',2),
 repeat:(w=20)=>sv('<path d="M17 2.5l3 3-3 3"/><path d="M4 11.5v-1a5 5 0 0 1 5-5h11"/><path d="M7 21.5l-3-3 3-3"/><path d="M20 12.5v1a5 5 0 0 1-5 5H4"/>',w,'currentColor',2),
 back:()=>sv('<path d="M15 5l-7 7 7 7"/>',24,'#27211E',2.2),
 down:()=>sv('<path d="M6 9l6 6 6-6"/>',26,'#27211E',2.2),
 chev:()=>sv('<path d="M9 6l6 6-6 6"/>',18,'#B5ABA2',2.2),
 check:(c='#fff',w=14)=>sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>',w,c,2.8),
 qr:(w=22)=>sv('<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM14 18.5v2M18.5 14h2"/>',w),
 pen:(w=20)=>sv('<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/>',w,'currentColor',1.9),
 head:(w=20)=>sv('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.6"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.6"/>',w,'currentColor',1.9),
 book:(w=20)=>sv('<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',w),
 eye:(w=18)=>sv('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',w,'currentColor',1.9)};
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const zhw=s=>esc(s).replace(/([\u3400-\u9fff！？，。、]+)/g,'<span class="bk-zh">$1</span>');
/* ข้อความไทยที่มีพินอินปน: ระบายสีพยางค์ที่มีเครื่องหมายวรรณยุกต์ */
const pyw=s=>zhw(s).replace(/(^|[\s(])([A-Za-züÜ]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][A-Za-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ']*)/g,(m,a,p)=>a+'<span class="bk-py">'+pyHtml(p)+'</span>');
const fmt=s=>{s=Math.max(0,Math.round(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const MAS=n=>`assets/mascot/${n}.webp`;

/* ---------- ข้อมูล (อ่านแบบยืดหยุ่น ไฟล์หาย/ไม่ครบก็ไม่พัง) ---------- */
const B=()=>window.BOOK1&&Array.isArray(BOOK1.parts)?BOOK1:{parts:[]};
const CHS=()=>{const o=[];B().parts.forEach(p=>(p.ch||[]).forEach(c=>o.push(Object.assign({part:p.n},c))));return o};
const chBy=n=>CHS().find(c=>c.n===+n)||null;
const partBy=n=>B().parts.find(p=>p.n===+n)||null;
let _tr=null;
function tracks(){if(_tr)return _tr;const raw=Array.isArray(window.BOOK1_TRACKS)?BOOK1_TRACKS:(window.BOOK1_TRACKS&&Array.isArray(BOOK1_TRACKS.tracks)?BOOK1_TRACKS.tracks:[]);
 _tr=raw.map(r=>{if(!r||typeof r!=='object')return null;const id=String(r.id||r.track||r.trackId||'').replace(/^(แทร็ก|track)\s*/i,'').trim();const m=/^(\d+)[-–](\d+)$/.exec(id);
  const ch=+(r.ch||r.chapter||(m&&m[1])||0);if(!id||!ch)return null;const sec=String(r.section||'');
  const grp=r.grp||(/นิทาน|เรื่องสั้น|story/i.test(sec)?'story':/แบบทดสอบ|quiz/i.test(sec)?'quiz':'ch');
  const c=chBy(ch);const items=(Array.isArray(r.items)?r.items:Array.isArray(r.lines)?r.lines:[]).map(x=>typeof x==='string'?{zh:x,py:''}:{zh:String(x.zh||x.hanzi||''),py:String(x.py||x.pinyin||'')}).filter(x=>x.zh||x.py);
  return {id,ch,part:+(r.part||(c&&c.part)||0),grp,pg:+(r.pg||r.page||0)||null,ex:String(r.ex||r.exercise||r.title||''),kind:/listen|ฟัง/i.test(String(r.kind||''))?'listening':'lesson',note:String(r.note||''),ans:r.ans||r.answer||'',items,a:String(r.a||r.audio||''),d:+(r.d||r.dur||0)||0}}).filter(Boolean);
 return _tr}
/* กลุ่ม: c9 = บทที่ 9 · s1 = นิทานท้ายภาค 1 · q1 = แบบทดสอบย่อยภาค 1 */
function group(g){g=String(g||'');let m;
 if((m=/^c?(\d+)$/.exec(g))){const c=chBy(m[1]);if(!c)return null;return {g:'c'+c.n,kind:'ch',c,part:c.part,tr:tracks().filter(t=>t.grp==='ch'&&t.ch===c.n)}}
 if((m=/^([sq])(\d)$/.exec(g))){const p=partBy(m[2]);if(!p)return null;const st=m[1]==='s';if(st&&!p.story||!st&&!p.quiz)return null;
  return {g:m[1]+p.n,kind:st?'story':'quiz',p,part:p.n,tr:tracks().filter(t=>t.grp===(st?'story':'quiz')&&(t.part===p.n||(!t.part&&chBy(t.ch)&&chBy(t.ch).part===p.n)))}}
 return null}
const exTitle=t=>(t.ex||'').replace(/^\d+\s+/,'').trim()||('แทร็ก '+t.id);
const gTitle=G=>G.kind==='ch'?`บทที่ ${G.c.n} ${G.c.t}`:G.kind==='story'?`นิทานน้องลามา: ${G.p.story.zh}`:`แบบทดสอบย่อยภาค ${G.p.n}`;
/* เลขหน้าใช้เฉพาะเลขหน้าจริงของเล่ม (B5) ที่ตัวสร้างข้อมูลใส่มา ถ้ายังไม่มีให้ซ่อน ไม่ใช้เลขหน้าจากสารบัญเดิม */
const gPages=G=>{if(G.kind==='ch'){const a=G.c.p0,b=G.c.p1;return a?(b&&b!==a?`${a}–${b}`:String(a)):''}const v=G.kind==='story'?G.p.story.p:G.p.quiz.p;return v?String(v):''};
const gWords=G=>G.kind==='ch'?(G.c.voc||[]).map(v=>v.zh):G.kind==='story'?(G.p.story.lines||[]).map(l=>l.zh):[];

/* ---------- ความคืบหน้า (ในเครื่องนี้) ---------- */
const KEY='lama-book1';
function P(){try{const o=JSON.parse(localStorage.getItem(KEY)||'{}');o.heard=o.heard||{};o.pos=o.pos||{};return o}catch(e){return {heard:{},pos:{}}}}
function saveP(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
function mark(g,type,id){const o=P();const h=o.heard[g]=o.heard[g]||{v:[],t:[]};const a=h[type]=h[type]||[];if(a.indexOf(id)<0)a.push(id);saveP(o)}
function setLast(g,t){const o=P();o.last={g,t:t||'',at:Date.now()};saveP(o)}
function setPos(id,s,d){const o=P();if(s>1&&d&&s<d-1)o.pos[id]=[Math.round(s*10)/10,Math.round(d*10)/10];else delete o.pos[id];saveP(o)}
function stat(G){const h=P().heard[G.g]||{};const w=gWords(G),hv=(h.v||[]).filter(x=>w.indexOf(x)>=0).length,ht=(h.t||[]).filter(x=>G.tr.some(t=>t.id===x)).length;const tot=w.length+G.tr.length;return {done:hv+ht,tot,all:tot>0&&hv+ht>=tot,hv:h.v||[],ht:h.t||[]}}
function lastG(){const o=P();return o.last&&group(o.last.g)?o.last:null}

/* ---------- ส่วนหัว ---------- */
const hdr=(t,s,rt)=>`<header class="nav bk-hdr"><button class="bk-bk press" data-act="back" aria-label="กลับ">${I.back()}</button><div class="bk-tt"><b>${t}</b><small>${s}</small></div>${rt||''}</header>`;
function qrSheet(){openSheet(`<div class="bk-sheet"><p>หัวบทในหนังสือทุกบทมี QR ของบทนั้น</p><p><b>เปิดกล้องของโทรศัพท์ แล้วส่องที่ QR</b> แตะลิงก์ที่ขึ้นมา แอปจะเปิดหน้าบทนั้นให้ทันที</p><p>ถ้าไม่สะดวกสแกน เลือกบทจากรายการในแอปได้ ตามเลขบทในหนังสือ</p></div>`,{title:'สแกน QR ในหนังสือ'})}

/* ===================== 1. หน้าแรก ===================== */
SC.bookhome=()=>{const L=lastG();const G=group(L?L.g:'c1');let cont='';
 if(G){const st=stat(G);const t=L&&L.t?G.tr.find(x=>x.id===L.t):null;
  const sub=t?`แบบฝึกหัด · แทร็ก <span class="bk-trk">${t.id}</span>${t.pg?' · หน้า '+t.pg:''}`:(gPages(G)?`หน้า ${gPages(G)}`:'');
  const pct=st.tot?Math.round(st.done/st.tot*100):0;
  cont=`<div class="bk-card bk-cont press" data-go="bkcont" role="button"><div class="bk-k">${I.head(15)} ${L?'ฟังต่อจากครั้งก่อน':'เริ่มฟังบทแรก'}</div>
<div class="bk-row"><div class="bk-tx"><b>${zhw(gTitle(G))}</b><small>${sub}</small></div><span class="bk-go" aria-label="เล่น">${I.play(20)}</span></div>
<div class="bk-bar"><b style="width:${pct}%"></b></div><div class="bk-meta"><span>${st.tot?`ฟังแล้ว ${st.done} จาก ${st.tot} รายการใน${G.kind==='ch'?'บทนี้':'ส่วนนี้'}`:'แทร็กแบบฝึกหัดของบทนี้กำลังจัดทำ'}</span><span>ภาค ${G.part}</span></div></div>`}
 const nch=CHS().length||32,np=B().parts.length||5;
 return {title:'ห้องเรียนคู่หนังสือ',noRefresh:false,nav:hdr('ห้องเรียนคู่หนังสือ','ภาษาจีนสำหรับผู้เริ่มต้น'),body:`<div class="bk-root bk-home">
<div class="bk-cover"><div class="bk-wm bk-zh">书</div><div class="bk-ctx"><span class="bk-cbadge">ห้องเรียนคู่หนังสือ</span><b>ภาษาจีน<br>สำหรับผู้เริ่มต้น</b><small>${np} ภาค · ${nch} บท · เสียงประกอบทุกบท</small></div><img src="${MAS('teach')}" alt="" draggable="false"></div>
${cont}
<div class="bk-acts"><button class="bk-card bk-act press" data-go="bklist"><span class="bk-ic">${I.book(22)}</span><b>เลือกบท</b><small>เลือกจากรายการในแอป ตามเลขบทในหนังสือ</small></button>
<button class="bk-card bk-act press" data-go="bkqr"><span class="bk-ic">${I.qr(22)}</span><b>สแกน QR ในหนังสือ</b><small>QR ที่หัวบทเปิดบทนั้นโดยตรง</small></button></div>
<div class="bk-sec"><h3>วิธีใช้ร่วมกับหนังสือ</h3></div>
<div class="bk-card bk-how">
<div class="bk-st"><span class="bk-no">1</span><div><b>เปิดบทที่กำลังเรียน</b><small>เข้าจากเมนูห้องเรียนคู่หนังสือในแอป หรือสแกน QR ที่หัวบทในหนังสือ</small></div></div>
<div class="bk-st"><span class="bk-no">2</span><div><b>ฟังเสียงบทเรียนและคำศัพท์</b><small>ฟังพร้อมอ่านพินอินในหนังสือ แล้วออกเสียงตาม</small></div></div>
<div class="bk-st"><span class="bk-no">3</span><div><b>ฟังแทร็กแบบฝึกหัดทีละข้อ</b><small>เลขแทร็กตรงกับที่พิมพ์ในหนังสือ เขียนคำตอบลงในหนังสือ</small></div></div>
</div>
<div class="bk-foot">เข้าได้ 2 ทาง: เมนูในแอป หรือ QR ในหนังสือ<br>ใช้งานได้ทันที ไม่ต้องสมัครสมาชิก ความคืบหน้าบันทึกไว้ในเครื่องนี้</div></div>`}};

/* ===================== 2. เลือกบท ===================== */
SC.booklist=()=>{const L=lastG();const cur=L?L.g:'';const curT=L&&L.t||'';const curPart=(L&&group(L.g)||{}).part||1;
 let rows='';
 B().parts.forEach(p=>{rows+=`<div class="bk-ph" id="bkp${p.n}"><span class="bk-n">ภาค ${p.n}</span><b>${esc(p.t)}</b>${p.pg?`<small>หน้า ${esc(p.pg)}</small>`:''}</div><div class="bk-card bk-list">`;
  (p.ch||[]).forEach(c=>{const G=group('c'+c.n),st=stat(G),pg=gPages(G),isCur=cur===G.g;const cls=isCur?'bk-cur':st.all?'bk-ok':'';
   let sm=[pg?`หน้า ${pg}`:'',st.all&&!isCur?'ฟังครบแล้ว':''].filter(Boolean).join(' · ');if(isCur)sm=`กำลังฟัง${curT?` · แทร็ก ${curT}`:''}${pg?' · หน้า '+pg:''}`;
   rows+=`<button class="bk-ch ${cls} press" data-go="bkch" data-g="${G.g}"><span class="bk-no">${st.all&&!isCur?I.check('#fff',16):c.n}</span><div class="bk-tx"><b>บทที่ ${c.n} ${zhw(c.t)}</b><small>${sm}</small></div>${I.chev()}</button>`});
  if(p.story)rows+=`<button class="bk-ch bk-ex${cur==='s'+p.n?' bk-cur':''} press" data-go="bkch" data-g="s${p.n}"><span class="bk-no">${I.book(17)}</span><div class="bk-tx"><b>นิทานน้องลามา: ${zhw(p.story.zh)}</b><small>${p.story.p?`หน้า ${p.story.p} · `:''}เสียงอ่านนิทาน</small></div>${I.chev()}</button>`;
  if(p.quiz)rows+=`<button class="bk-ch bk-ex${cur==='q'+p.n?' bk-cur':''} press" data-go="bkch" data-g="q${p.n}"><span class="bk-no">${I.pen(17)}</span><div class="bk-tx"><b>แบบทดสอบย่อยภาค ${p.n}</b><small>${[p.quiz.p?'หน้า '+p.quiz.p:'',group('q'+p.n).tr.length?'โจทย์ฟัง':'แทร็กกำลังจัดทำ'].filter(Boolean).join(' · ')}</small></div>${I.chev()}</button>`;
  rows+='</div>'});
 return {title:'เลือกบท',nav:hdr('เลือกบท',`ห้องเรียนคู่หนังสือ · ${CHS().length||32} บท`,`<button class="bk-rt press" data-go="bkqr">${I.qr(17)} สแกน</button>`),
  body:`<div class="bk-root bk-lst"><div class="bk-jump">${B().parts.map(p=>`<button class="bk-p${p.n===curPart?' bk-on':''} press" data-go="bkjump" data-p="${p.n}">ภาค<b>${p.n}</b></button>`).join('')}</div>${rows}</div>`,
  mount(el){const sc=el.querySelector('.scroller');if(!sc||sc._bk)return;sc._bk=1;
   const upd=()=>{let on=1;el.querySelectorAll('.bk-ph').forEach(h=>{if(h.offsetTop-sc.scrollTop<sc.clientHeight*.45)on=+h.id.slice(3)});el.querySelectorAll('.bk-p').forEach(b=>b.classList.toggle('bk-on',+b.dataset.p===on))};
   sc.addEventListener('scroll',()=>{cancelAnimationFrame(sc._raf);sc._raf=requestAnimationFrame(upd)},{passive:true});
   if(!el._bkInit){el._bkInit=1;if(curPart>1){const h=el.querySelector('#bkp'+curPart);if(h){sc.style.scrollBehavior='auto';sc.scrollTop=h.offsetTop-64;sc.style.scrollBehavior=''}}}}}};

/* ===================== 3. หน้าบท ===================== */
let vPlay=null;/* {g,i} คำที่กำลังเล่น */
function picv(z){const on=window.ART_IDX&&ART_IDX['word/'+z];
 if(on)return `<span class="bk-pic" style="width:48px;height:48px;border-radius:12px"><img src="${artUrl('word',z)}" alt="" loading="lazy" decoding="async" draggable="false" onerror="this.parentNode.classList.add('bk-tile');this.parentNode.innerHTML='<span class=&quot;bk-zh&quot;>${z.charAt(0)}</span>'"></span>`;
 return `<span class="bk-pic bk-tile${[...z].length>2?' bk-long':''}"><span class="bk-zh">${esc([...z].length>3?[...z].slice(0,3).join(''):z)}</span></span>`}
function chBody(G){const st=stat(G),L=lastG(),pos=P().pos;const nW=gWords(G).length,nT=G.tr.length;
 let head,img='wave',sm=[];
 if(G.kind==='ch'){head=`บทที่ ${G.c.n} ${G.c.t}`;if(nW)sm.push(`คำศัพท์ ${nW} คำ`);if(nT)sm.push(`แบบฝึกหัดฟัง ${nT} แทร็ก`)}
 else if(G.kind==='story'){head=`นิทานน้องลามา: ${G.p.story.zh}`;sm.push(esc(G.p.story.th));if(nW)sm.push(`${nW} ประโยค`)}
 else{head=`แบบทดสอบย่อยภาค ${G.p.n}`;sm.push(`${G.p.quiz.q||10} ข้อ`);if(nT)sm.push(`โจทย์ฟัง ${nT} แทร็ก`)}
 let h=`<div class="bk-root bk-chp"><div class="bk-card bk-chd"><div class="bk-tx"><div class="bk-chips"><span class="bk-chip">ภาค ${G.part}</span>${gPages(G)?`<span class="bk-chip bk-g">หน้า ${gPages(G)}</span>`:''}</div><b>${zhw(head)}</b><small>${sm.join(' · ')||'&nbsp;'}</small></div><img src="${MAS(img)}" alt="" draggable="false"></div>`;
 /* คำศัพท์ / ประโยคนิทาน */
 const W=G.kind==='ch'?(G.c.voc||[]):G.kind==='story'?(G.p.story.lines||[]):[];
 if(W.length){h+=`<div class="bk-sh"><h3>${I.head(20)} ${G.kind==='story'?'เสียงอ่านนิทาน':'เสียงบทเรียนและคำศัพท์'}</h3><button class="bk-all bk-gh press" data-go="bkvall" data-g="${G.g}">${I.play(13)} เล่นทั้งหมด</button></div><div class="bk-card bk-vl">`;
  W.forEach((v,i)=>{const on=vPlay&&vPlay.g===G.g&&vPlay.i===i;const ln=G.kind==='story';
   h+=`<div class="bk-v${ln?' bk-ln':''}${on?' bk-on':''}" data-i="${i}">${ln?'':picv(v.zh)}<div class="bk-tx"><span class="bk-z bk-zh">${esc(v.zh)}</span><span class="bk-py">${pyHtml(v.py||'')}</span><span class="bk-th">${esc(v.th||'')}${on?' · กำลังเล่น':''}</span></div><button class="bk-pb${on?' bk-on':''} press" data-go="bkv" data-g="${G.g}" data-i="${i}" aria-label="ฟัง">${on?I.pause(16):I.play(16)}</button></div>`});
  h+='</div>'}
 if(G.kind==='ch'&&G.c.pron){const seg=G.c.pron.split(' · ');const zs=G.c.pron.match(/[\u3400-\u9fff]+/g)||[];
  h+=`<div class="bk-card bk-dlg">${zs.length?`<button class="bk-pb press" data-go="bkpron" data-g="${G.g}" aria-label="ฟัง">${I.play(16)}</button>`:''}<div class="bk-tx"><b>จุดออกเสียง: ${pyw(seg[0])}</b>${seg.length>1?`<small>${seg.slice(1).map(pyw).join(' · ')}</small>`:''}</div></div>`}
 if(G.kind==='ch'&&!W.length&&(G.c.topic||G.c.goal))h+=`<div class="bk-card bk-dlg"><div class="bk-tx"><b>${pyw(G.c.topic||'')}</b>${G.c.goal?`<small>${pyw(G.c.goal)}</small>`:''}</div></div>`;
 if(G.kind==='quiz'&&G.p.quiz.fmt)h+=`<div class="bk-card bk-dlg"><div class="bk-tx"><b>รูปแบบข้อสอบ</b><small>${esc(G.p.quiz.fmt)}</small></div></div>`;
 /* แทร็ก */
 if(G.kind!=='story'||nT){h+=`<div class="bk-sh"><h3>${I.pen(20)} ${G.kind==='story'?'แทร็กนิทาน':'แบบฝึกหัดฟัง'}</h3>${nT?`<button class="bk-all press" data-go="bkplay" data-g="${G.g}" data-t="${G.tr[0].id}">${I.play(13)} เริ่มที่ ${G.tr[0].id}</button>`:''}</div>`;
  if(nT){h+='<div class="bk-card bk-tl">';
   G.tr.forEach(t=>{const ok=st.ht.indexOf(t.id)>=0,cur=L&&L.g===G.g&&L.t===t.id,ps=pos[t.id];const cls=cur?'bk-cur':ok?'bk-ok':'';
    const s=cur&&ps?`ฟังค้างไว้ ${fmt(ps[0])} / ${fmt(ps[1])}`:ok?'ฟังแล้ว':(t.d?fmt(t.d):(t.pg?'หน้า '+t.pg:''));
    h+=`<button class="bk-t ${cls} press" data-go="bkplay" data-g="${G.g}" data-t="${t.id}"><div class="bk-num"><small>แทร็ก</small><span class="bk-trk">${t.id}</span></div><div class="bk-tx"><b>${pyw(exTitle(t))}</b><small>${s}</small></div><span class="bk-pb${cur?' bk-on':''}">${I.play(16)}</span></button>`});
   h+='</div>';
   const pg=G.kind==='quiz'?G.p.quiz.p:(G.tr[G.tr.length-1].pg||(G.kind==='ch'?G.c.p1:''));
   h+=G.kind==='quiz'?`<div class="bk-note">${I.pen(18)}<div>ฟังทีละแทร็ก แล้ว<b>เขียนคำตอบลงในหนังสือ${pg?' หน้า '+pg:''}</b> เฉลยอยู่ในภาคผนวก ง</div></div>`
    :`<div class="bk-note">${I.pen(18)}<div>ฟังทีละแทร็ก แล้ว<b>เขียนคำตอบลงในหนังสือ${pg?' หน้า '+pg:''}</b> เฉลยอยู่ท้ายหน้าเดียวกัน</div></div>`}
  else h+=`<div class="bk-note bk-wait">${I.pen(18)}<div>แทร็กแบบฝึกหัดของบทนี้กำลังจัดทำ</div></div>`}
 return h+'</div>'}
SC.bookch=(p)=>{const G=group(p&&p.g)||group('c1');const rt=`<button class="bk-rt press" data-go="bklist">ทั้งหมด ${CHS().length||32} บท</button>`;
 const t=G.kind==='ch'?`บทที่ ${G.c.n}`:G.kind==='story'?'นิทานน้องลามา':`แบบทดสอบย่อยภาค ${G.p.n}`;
 return {title:t,nav:hdr(t,`ห้องเรียนคู่หนังสือ · ภาค ${G.part}`,rt),body:chBody(G),
  mount(){},unmount(){if(vPlay){vPlay=null;stopAudio()}}}};
function vRefresh(){const top=stack[stack.length-1];if(!top||top.name!=='bookch')return;const G=group(top.params.g);if(!G)return;
 top.el.querySelectorAll('.bk-v').forEach(r=>{const i=+r.dataset.i,on=vPlay&&vPlay.g===G.g&&vPlay.i===i;r.classList.toggle('bk-on',on);const b=r.querySelector('.bk-pb');b.classList.toggle('bk-on',on);b.innerHTML=on?I.pause(16):I.play(16);
  const th=r.querySelector('.bk-th');const W=G.kind==='story'?G.p.story.lines:G.c.voc;th.textContent=(W[i].th||'')+(on?' · กำลังเล่น':'')})}
function playWords(G,list){stopAudio();const tok={};playWords.tok=tok;let k=0;
 const step=()=>{if(playWords.tok!==tok)return;if(k>=list.length){vPlay=null;vRefresh();return}const i=list[k++];const W=gWords(G);vPlay={g:G.g,i};vRefresh();mark(G.g,'v',W[i]);
  playOne(W[i],'',()=>{if(playWords.tok!==tok)return;setTimeout(step,list.length>1?500:0)})};
 setLast(G.g,(lastG()&&lastG().g===G.g)?lastG().t:'');step()}

/* ===================== 4. เล่นแทร็ก ===================== */
const PL={a:null,slow:false,loop:false,tts:false,ansOpen:false};
SC.bookplay=(p)=>{const G=group(p&&p.g);const tr=G?G.tr:[];const i=Math.max(0,tr.findIndex(t=>t.id===(p&&p.t)));const t=tr[i];
 if(!G||!t)return {title:'ห้องเรียนคู่หนังสือ',nav:hdr('ห้องเรียนคู่หนังสือ',''),body:`<div class="bk-root"><div class="bk-note">${I.pen(18)}<div>แทร็กแบบฝึกหัดของบทนี้กำลังจัดทำ</div></div></div>`};
 const st=stat(G);const pv=tr[i-1],nx=tr[i+1];const ls=t.kind==='listening';
 const head=G.kind==='ch'?`บทที่ ${G.c.n} · แบบฝึกหัดฟัง`:G.kind==='story'?'นิทานน้องลามา':`แบบทดสอบย่อยภาค ${G.p.n}`;
 const pg=t.pg||(G.kind==='ch'?G.c.p0:'');
 const note=ls?`<b>เขียนคำตอบลงในหนังสือ</b>${pg?' หน้า '+pg:''} กดฟังซ้ำได้ตามต้องการ`:`<b>ฟังแล้วอ่านตามทีละคำ</b> ดูพินอินในหนังสือ${pg?' หน้า '+pg:''} ประกอบ`;
 const ansLbl=ls?'ดูเฉลยและบทที่อ่าน':'ดูบทที่อ่าน';
 const ol=t.items.map(x=>`<li>${x.zh?`<span class="bk-zh">${esc(x.zh)}</span> `:''}<span class="bk-py">${pyHtml(x.py||'')}</span></li>`).join('');
 const ansTxt=Array.isArray(t.ans)?t.ans.join(' · '):String(t.ans||'');
 const ansOpen=`<div class="bk-hd"><b>${ls?'เฉลยแทร็ก':'บทที่อ่านในแทร็ก'} ${t.id}</b><span>แตะเพื่อซ่อน</span></div>${ansTxt?`<div class="bk-script">${pyw(ansTxt)}</div>`:`${ls?`<div class="bk-script">เฉลยอยู่ท้ายหน้า${pg?' '+pg:''} ในหนังสือ</div>`:''}${ol?`<ol class="bk-ol">${ol}</ol>`:''}`}${t.note?`<div class="bk-script">${esc(t.note)}</div>`:''}`;
 const ansClosed=`<span class="bk-ic">${I.eye(20)}</span><div class="bk-tx"><b>${ansLbl}</b><small>ซ่อนไว้ แตะเมื่อ${ls?'เขียนคำตอบเสร็จแล้ว':'ต้องการดู'}</small></div>${I.chev()}`;
 return {title:head,noRefresh:true,
  nav:`<header class="nav bk-hdr"><button class="bk-bk press" data-act="back" aria-label="กลับ">${I.down()}</button><div class="bk-tt" style="text-align:center"><b>${zhw(head)}</b><small>ห้องเรียนคู่หนังสือ</small></div><span class="bk-bk"></span></header>`,
  body:`<div class="bk-root bk-ply">
<div class="bk-art"><div class="bk-ring"><img src="${MAS('listening')}" alt="" draggable="false"></div></div>
<div class="bk-big"><small>แทร็ก</small><span class="bk-trk">${t.id}</span><b>${pyw(exTitle(t))}</b>${pg?`<span class="bk-chip bk-g bk-pg">${I.book(14)} หนังสือหน้า ${pg}</span>`:''}</div>
<div class="bk-scrub"><div class="bk-line" id="bkLine"><b id="bkFill" style="width:0%"></b><i id="bkKnob" style="left:0%"></i></div><div class="bk-tm"><span id="bkCur">0:00</span><span id="bkDur">${t.d?fmt(t.d):'0:00'}</span></div></div>
<div class="bk-ctl"><button class="bk-sm press${pv?'':' bk-dis'}" data-go="bkstep" data-d="-1" aria-label="แทร็กก่อนหน้า">${I.prev(30)}<span>${pv?'แทร็ก '+pv.id:'&nbsp;'}</span></button><button class="bk-main press" data-go="bktog" id="bkMain" aria-label="เล่น">${I.play(36)}</button><button class="bk-sm press${nx?'':' bk-dis'}" data-go="bkstep" data-d="1" aria-label="แทร็กถัดไป">${I.next(30)}<span>${nx?'แทร็ก '+nx.id:'&nbsp;'}</span></button></div>
<div class="bk-opts"><button class="bk-opt press" data-go="bkreplay">${I.replay(18)} ฟังซ้ำ</button><button class="bk-opt press${PL.slow?' bk-on':''}" data-go="bkslow" id="bkSlow"><span class="bk-py">0.75x</span></button><button class="bk-opt press${PL.loop?' bk-on':''}" data-go="bkloop" id="bkLoop">${I.repeat(18)} เล่นวน</button></div>
<div class="bk-note">${I.pen(18)}<div>${note}</div></div>
<div class="bk-card bk-ans" data-go="bkans" role="button" aria-expanded="false" data-open="${esc(ansOpen)}" data-closed="${esc(ansClosed)}">${ansClosed}</div>
<div class="bk-dots">${tr.map((x,j)=>`<button class="bk-dot bk-trk${j===i?' bk-on':st.ht.indexOf(x.id)>=0?' bk-ok':''} press" data-go="bkdot" data-t="${x.id}">${x.id}</button>`).join('')}</div></div>`,
  mount(el){plMount(el,G,t)},unmount(){plStop(true)}}};
function plStop(keep){const a=PL.a;if(a){try{if(keep&&PL.cur)setPos(PL.cur.id,a.currentTime,a.duration);a.pause();a.removeAttribute('src');a.load()}catch(e){}}PL.a=null;PL.cur=null;try{speechSynthesis.cancel()}catch(e){}PL.tts=false}
function plMount(el,G,t){if(el._bk)return;el._bk=1;plStop(false);stopAudio();setLast(G.g,t.id);PL.cur=t;PL.G=G;PL.el=el;
 const $q=s=>el.querySelector(s);const url=t.a?'audio/'+t.a+'.mp3':null;
 const ui=()=>{const a=PL.a;const d=(a&&isFinite(a.duration)&&a.duration)||t.d||0,c=a?a.currentTime:0,p=d?Math.min(100,c/d*100):0;
  $q('#bkFill').style.width=p+'%';$q('#bkKnob').style.left=p+'%';$q('#bkCur').textContent=fmt(c);$q('#bkDur').textContent=fmt(d);
  const on=a?!a.paused:PL.tts;const m=$q('#bkMain');m.innerHTML=on?I.pause(36):I.play(36);m.setAttribute('aria-label',on?'หยุดชั่วคราว':'เล่น')};
 PL.ui=ui;
 if(url){const a=new Audio();a.preload='auto';a.src=url;PL.a=a;a.playbackRate=PL.slow?.75:1;a.loop=PL.loop;
  a.addEventListener('timeupdate',ui);a.addEventListener('loadedmetadata',()=>{const ps=P().pos[t.id];if(ps&&ps[0]<a.duration-1)a.currentTime=ps[0];ui()});a.addEventListener('play',ui);a.addEventListener('pause',()=>{ui();if(PL.cur)setPos(t.id,a.currentTime,a.duration)});
  a.addEventListener('ended',()=>{mark(G.g,'t',t.id);setPos(t.id,0,0);ui();const d=el.querySelector('.bk-dot.bk-on');if(d)d.classList.add('bk-ok')});
  a.addEventListener('error',()=>{if(PL.a===a){PL.a=null;ui()}})}
 /* เปิดหน้าแล้วเล่นทันที (กดมาจากปุ่มเล่น) — เบราว์เซอร์ไม่ยอมก็รอให้กดปุ่มเอง */
 setTimeout(()=>{if(PL.cur===t)plPlay(true)},380);
 const line=$q('#bkLine');const seek=e=>{const a=PL.a;if(!a||!isFinite(a.duration))return;const r=line.getBoundingClientRect();const x=((e.touches?e.touches[0].clientX:e.clientX)-r.left)/r.width;a.currentTime=Math.max(0,Math.min(1,x))*a.duration;ui()};
 line.addEventListener('pointerdown',e=>{seek(e);const mv=ev=>seek(ev),up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};addEventListener('pointermove',mv);addEventListener('pointerup',up)});
 ui()}
function plTTS(){const t=PL.cur;if(!t)return;const say=t.items.map(x=>x.zh).filter(Boolean);if(!say.length){toast('ยังไม่มีไฟล์เสียงของแทร็กนี้');return}
 PL.tts=true;PL.ui&&PL.ui();let k=0;const tok=PL.ttsTok={};const step=()=>{if(PL.ttsTok!==tok||!PL.tts)return;if(k>=say.length){if(PL.loop){k=0}else{PL.tts=false;mark(PL.G.g,'t',t.id);PL.ui&&PL.ui();return}}
  try{const u=new SpeechSynthesisUtterance(say[k++]);u.lang='zh-CN';u.rate=PL.slow?.6:.8;u.onend=u.onerror=()=>setTimeout(step,700);speechSynthesis.speak(u)}catch(e){PL.tts=false;PL.ui&&PL.ui()}};step()}
function plPlay(auto){const a=PL.a;if(a){a.playbackRate=PL.slow?.75:1;const pr=a.play();if(pr&&pr.catch)pr.catch(()=>{PL.ui&&PL.ui()});return}if(!auto)plTTS()}
function plToggle(){const a=PL.a;if(a){if(a.paused)plPlay();else a.pause()}else{if(PL.tts){PL.tts=false;PL.ttsTok=null;try{speechSynthesis.cancel()}catch(e){}PL.ui&&PL.ui()}else plTTS()}}
function goTrack(id){const top=stack[stack.length-1];if(!top||top.name!=='bookplay')return;if(PL.cur&&PL.cur.id===id)return;plStop(true);PL.ansOpen=false;replace('bookplay',{g:top.params.g,t:id})}

/* ---------- การกด ---------- */
Object.assign(window.GOX=window.GOX||{},{
 bookroom(){push('bookhome')},
 bklist(){const s=stack;if(s.length>1&&s[s.length-2].name==='booklist')return pop();push('booklist')},
 bkqr(){qrSheet()},
 bkch(el){push('bookch',{g:el.dataset.g})},
 bkcont(){const L=lastG();if(L&&L.t&&group(L.g).tr.some(t=>t.id===L.t)){push('bookch',{g:L.g});setTimeout(()=>push('bookplay',{g:L.g,t:L.t}),NAV_MS+20)}else push('bookch',{g:L?L.g:'c1'})},
 bkjump(el){const top=stack[stack.length-1];const h=top&&top.el.querySelector('#bkp'+el.dataset.p);const sc=top&&top.el.querySelector('.scroller');if(h&&sc)sc.scrollTo({top:h.offsetTop-64,behavior:'smooth'})},
 bkv(el){const G=group(el.dataset.g);if(!G)return;const i=+el.dataset.i;if(vPlay&&vPlay.g===G.g&&vPlay.i===i){playWords.tok=null;vPlay=null;stopAudio();vRefresh();return}playWords(G,[i])},
 bkvall(el){const G=group(el.dataset.g);if(!G)return;playWords(G,gWords(G).map((_,i)=>i))},
 bkpron(el){const G=group(el.dataset.g);if(!G||!G.c)return;const zs=G.c.pron.match(/[\u3400-\u9fff]+/g)||[];playWords.tok=null;vPlay=null;vRefresh();speakSeq(zs.map(t=>({t,r:''})))},
 bkplay(el){playWords.tok=null;vPlay=null;stopAudio();vRefresh();push('bookplay',{g:el.dataset.g,t:el.dataset.t})},
 bktog(){plToggle()},
 bkreplay(){const a=PL.a;if(a){a.currentTime=0;plPlay()}else{PL.tts=false;try{speechSynthesis.cancel()}catch(e){}plTTS()}},
 bkslow(el){PL.slow=!PL.slow;el.classList.toggle('bk-on',PL.slow);if(PL.a)PL.a.playbackRate=PL.slow?.75:1},
 bkloop(el){PL.loop=!PL.loop;el.classList.toggle('bk-on',PL.loop);if(PL.a)PL.a.loop=PL.loop},
 bkstep(el){const top=stack[stack.length-1];const G=group(top&&top.params.g);if(!G||!PL.cur)return;const i=G.tr.findIndex(t=>t.id===PL.cur.id)+(+el.dataset.d);if(G.tr[i])goTrack(G.tr[i].id)},
 bkdot(el){goTrack(el.dataset.t)},
 bkans(el){const open=!el.classList.contains('bk-open');el.classList.toggle('bk-open',open);el.setAttribute('aria-expanded',open);el.innerHTML=open?el.dataset.open:el.dataset.closed}});
/* ลิงก์ตรง ?go=book&ch=9 */
window.bookDeepLink=function(ch){const G=group(ch);return ()=>{mountRoot('know',false);push('bookhome');if(G)setTimeout(()=>push('bookch',{g:G.g}),NAV_MS+40)}};
})();
