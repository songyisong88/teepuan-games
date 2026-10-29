/* ระดับ HSK 1–5 · เลือกระดับ · ทดสอบวัดระดับแบบปรับระดับ · แผนที่ต่อระดับ
   สถานะที่เก็บ: S.level (ระดับที่เรียนอยู่) · S.assume (ระดับต่ำกว่าที่ถือว่ารู้แล้ว) · S.placeRes (ผลทดสอบล่าสุด)
   การสลับระดับ "ไม่ลบ" ความคืบหน้า: S.parts / S.stars เก็บรวมทุกระดับ */
const LVSTAT=n=>{const i=lvInfo(n);return i.empty?'กำลังเพิ่มเนื้อหา · ยังไม่มีบทเรียน':i.complete?`ครบตามเป้า ${i.target} คำ · ${i.lessons} บท · ${i.words} คำ`:`กำลังเพิ่มเนื้อหา · มีแล้ว ${i.lessons} บท · ${i.words}/${i.target} คำ`};
const dvCard=()=>S.dvNote?`<div class="card pad2 mt12" style="margin:12px 16px 0"><b>${S.dvNote===3?'ระดับ 1 จัดบทเรียนใหม่แล้ว':'🔄 จัดระดับบทเรียนใหม่แล้ว'}</b><div class="cap" style="line-height:1.5;margin-top:4px">${S.dvNote===3?'ระดับ 1 แบ่งเป็นบทสั้น บทละไม่เกิน 6 คำ เริ่มจากบทเสียง และมีด่านทบทวนท้ายแต่ละตอน บทที่มีคำซึ่งเรียนไปแล้วนับว่าจบ XP และเหรียญเดิมอยู่ครบ':`เราจัดบทเรียนตามรายการคำอ้างอิงให้ตรงขึ้น บางบทย้ายระดับและมีคำใหม่ ความคืบหน้าและคะแนนเดิมยังอยู่ครบ · ผลทดสอบวัดระดับเดิมอาจไม่ตรงแล้ว ลองทำใหม่ได้`} <button class="pill sm press" id="dvok" style="margin-top:8px">รับทราบ</button></div></div>`:'';
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#dvok');if(b){S.dvNote=0;save();const c=b.closest('.card');if(c)c.remove()}});
const lvCover=n=>{const m=LVMETA[n]||{};return m.official?`ครอบคลุมรายการคำอ้างอิงแล้ว ${m.covered}/${m.official} คำ`:`เป้า ≈ ${(levelBy(n)||{}).target||0} คำ`};
const lvTag=n=>{const i=lvInfo(n);return `<span class="lvtag ${i.complete?'full':'wip'}">${i.complete?'ครบตามเป้าคำ':'กำลังเพิ่มเนื้อหา'}</span>`};
function setLevel(n,assume,stay){S.level=n;S.assume=Math.max(0,Math.min(n-1,assume===undefined?S.assume:assume));S.lvPicked=true;S.placed=S.placed||0;save();
 /* ระหว่างแนะนำตัวครั้งแรก: เลือกระดับจากการทดสอบ/หน้าเลือกระดับแล้วกลับไปทำขั้นต่อไป (ความสนใจ/เป้าหมาย/เตือน) */
 if(window.__obRun&&!stay&&!S.seenOnboard){window.__obK=1;setTimeout(()=>{if(!S.seenOnboard)push('onboard')},700)}}
function levelEndCta(){const n=curLv(),i=lvInfo(n),L=levelBy(n);
 if(i.empty)return `<button class="pill press" data-go="levels"><b>${L.name} กำลังเพิ่มเนื้อหา</b><small>ยังไม่มีบทเรียน · เลือกระดับอื่นหรือเล่นเกมก่อน</small></button>`;
 if(n<LV_MAX)return `<button class="pill press" data-go="levels"><b>จบบทที่มีใน ${L.name} แล้ว!</b><small>${i.complete?`ไปต่อที่ ${levelBy(n+1).name}`:'ตอนต่อไปกำลังเพิ่มเนื้อหา · ลองระดับถัดไปหรือเล่นเกมทบทวน'}</small></button>`;
 return `<button class="pill press" data-go="games"><b>จบบทที่มีใน ${L.name} แล้ว!</b><small>ตอนต่อไปกำลังเพิ่มเนื้อหา · ไปเล่นเกมทบทวน</small></button>`}

/* ----- แผนผังข้อมูลระดับ (การ์ดสรุปในแผนที่และตัวเลือกระดับ) ----- */
const lvBar=(n)=>{const i=lvInfo(n);return `<div class="prog mt8" style="background:rgba(0,0,0,.08)"><i style="width:${Math.round(i.pct*100)}%;background:${i.L.c}"></i></div>`};
function lvSheet(n){const L=levelBy(n),i=lvInfo(n),cur=curLv()===n,lower=n>1;
 const assumeOn=lower&&(S.assume>=n-1||!S.lvPicked||curLv()!==n);
 openSheet(`<div style="padding:0 20px"><div style="display:flex;gap:14px;align-items:center"><span class="lvem" style="background:${L.bg}">${L.em}</span><div><div class="h2" style="padding:0">${L.name} · ${L.th}</div><div style="margin-top:4px">${lvTag(n)}</div></div></div>
  <div class="card pad2 mt12" style="font-size:14.5px;line-height:1.6"><b>ตอนนี้มี:</b> ${i.empty?'ยังไม่มีบทเรียน':`${i.lessons} บท · ${i.words} คำ`} <span class="cap">(เป้าหมาย ≈ ${i.target} คำ)</span><br><b>เน้น:</b> ${L.focus}<br><b>ฝึก:</b> ${L.skill}${i.pct?`<br><b>เรียนไปแล้ว:</b> ${i.done}/${i.units} รอบ`:''}</div>
  ${i.complete?'':`<p class="cap mt12" style="margin:12px 0 0">เนื้อหาระดับนี้กำลังทยอยเพิ่ม — ${i.empty?'ยังไม่มีบทให้เรียน':'เรียนได้เท่าที่มี'}</p>`}
  ${lower?`<div class="card pad2 mt12" style="display:flex;gap:12px;align-items:center"><span style="flex:1;font-size:14.5px;line-height:1.45"><b>ฉันรู้ระดับ 1${n>2?'–'+(n-1):''} แล้ว</b><br><span class="cap">คำจากระดับก่อนหน้าจะถูกใช้ในเกม ทบทวน และติวเตอร์ (ไม่ต้องเรียนซ้ำ)</span></span><button class="sw ${assumeOn?'on':''}" id="lvas" aria-label="รู้ระดับก่อนหน้าแล้ว"></button></div>`:''}
  <p class="cap mt12" style="margin:12px 0 0">สลับระดับได้ทุกเมื่อ ความคืบหน้าของทุกระดับยังอยู่ครบ</p>
  <button class="pill press mt12" id="lvgo"><b>${cur?`เรียนต่อที่ ${L.name}`:`เริ่มที่ ${L.name}`}</b><small>${i.empty?'ไปที่แผนที่ระดับนี้':i.done?'ต่อจากรอบที่ค้างไว้':'ไปที่แผนที่ระดับนี้'}</small></button></div>`,
 {onMount:sh=>{const sw=$('#lvas',sh);if(sw)sw.onclick=()=>sw.classList.toggle('on');
  $('#lvgo',sh).onclick=()=>{const as=sw?(sw.classList.contains('on')?n-1:0):0;const first=!S.lvPicked;setLevel(n,as);closeSheet();vib(10);mountRoot(first&&!S.parts.length?'home':'book');setTimeout(()=>toast(first?`ตั้งเป็น ${L.name} แล้ว · เปลี่ยนระดับได้ทุกเมื่อ`:`เปลี่ยนเป็น ${L.name} แล้ว · ความคืบหน้าเดิมยังอยู่`),350)}}})}

SC.levels=({first}={})=>{const cur=curLv();
 return {title:'เลือกระดับ',body:`<div class="large">${first?'เริ่มที่ระดับไหนดี?':'เลือกระดับของคุณ'}</div><p class="cap" style="padding:2px 24px 0;line-height:1.5">เปลี่ยนได้ทุกเมื่อ ความคืบหน้าไม่หาย · </p><div class="cap" style="padding:6px 24px 0;line-height:1.5">ℹ️ ${STD_NOTE}</div>${dvCard()}
 <div class="group mt16">${ROW('#EAF1FB','🧭','ทดสอบวัดระดับ (แนะนำ)',S.placeRes?`ผลล่าสุด ≈ ${S.placeRes.est?'ระดับ '+S.placeRes.est:'ก่อนระดับ 1'} · ทำใหม่ได้`:'12–20 ข้อ · ราว 3 นาที · ข้ามได้',undefined,'data-go="placement"')}
 ${ROW('#E7F8EE','🌱','ไม่เคยเรียนเลย — เริ่มจากศูนย์','ระดับ 1 · เริ่มที่บท 0-1 เสียงภาษาจีน',undefined,'data-go="lvzero"')}</div>
 <div class="sec">หรือเลือกระดับเอง</div><div class="group">${LEVELS.map(L=>{const i=lvInfo(L.id);return `<button class="row press ${cur===L.id?'selrow':''}" data-go="lvpick" data-lv="${L.id}"><span class="ic" style="background:${L.bg}">${L.em}</span><span class="tx"><b>${L.name} · ${L.th}</b><small>${LVSTAT(L.id)}${i.done?` · เรียนแล้ว ${i.done}/${i.units} รอบ`:''}</small></span>${cur===L.id?'<span class="chip" style="height:26px;padding:0 10px;font-size:12px">ระดับตอนนี้</span>':CHEV}</button>`}).join('')}</div>
 <p class="cap center" style="padding:14px 30px 0;line-height:1.5">ระดับที่ยังเพิ่มเนื้อหาอยู่จะมีป้าย “กำลังเพิ่มเนื้อหา” กำกับ</p>${first?'':''}`}};

/* ----- หน้าบทเรียน (แบบ C): หัวทักทาย · ทางลัด 6 วง · การ์ดตอน+ป้ายระดับ · แผนที่ซิกแซกจากบทจริงของระดับที่เลือก ----- */
const LC_X=[50,27,50,73];
function lcPic(Ls){const w=(Ls.words||[]).find(x=>typeof picHas==='function'&&picHas(x));return w?art('word',w.zh,'','lc-art'):`<span class="lc-em">${Ls.emoji||'📖'}</span>`}
function lcRev(){const r=reviewWords().length;return {k:'R',st:'rev',html:`<button class="lc-node rev press" data-go="review" aria-label="ทบทวนตามรอบ${r?' '+r+' คำ':''}"><span class="o">${M('think')}</span>${r?`<span class="rb">${r}</span>`:''}<span class="nl">ทบทวนตามรอบ</span></button>`}}
function lcMap(n){const cur=nextUnit(n);let html='',sec=0;const chs=CHAPTERS.filter(c=>c.lv===n&&LESSONS.some(l=>l.chapter===c.id)),lastCh=chs.length-1;
 chs.forEach((ch,ci)=>{const ls=LESSONS.filter(l=>l.chapter===ch.id);
  const items=[];let lsDone=0;
  ls.forEach(Ls=>{const us=UNITS.filter(u=>u.lesson===Ls.id),dn=us.filter(u=>unitDone(u.id)).length,done=dn===us.length,isCur=!!(cur&&us.some(u=>u.id===cur.id)),open=us.some(u=>unitOpen(u.id));if(done)lsDone++;
   const go=(us.find(u=>!unitDone(u.id))||us[us.length-1]).id;
   items.push({k:'L',st:done?'done':isCur?'cur':open?'open':'lock',html:`<button class="lc-node press ${done?'done':isCur?'cur':open?'':'lock'}" data-go="unit" data-id="${go}" aria-label="${lnoTxt(Ls)} ${Ls.th}${done?' เรียนจบแล้ว':isCur?' บทปัจจุบัน':open?'':' ยังล็อก'}">${isCur?'<span class="lc-bub">เริ่ม ▶</span>':''}<span class="o">${lcPic(Ls)}</span>${done?'<span class="ok">✓</span>':''}${!done&&!isCur&&!open?'<span class="lk">🔒</span>':''}<span class="nl">${Ls.th}${isCur&&dn?` · ${dn}/${us.length}`:''}</span></button>`});
   if(isCur)items.push(lcRev())});
  if(ci===lastCh&&!cur)items.push(lcRev());
  /* ตำแหน่งซิกแซก: x เป็น % ของความกว้าง, y เป็น px */
  let y=items[0]&&items[0].st==='cur'?112:70;const pts=items.map((it,i)=>{const big=it.st==='cur';if(i)y+=big||items[i-1].st==='cur'?150:124;return {x:LC_X[(i+sec)%4],y,big}});sec+=items.length;
  const H=y+80,curI=items.findIndex(it=>it.st==='cur'),lastDone=curI>=0?curI:items.reduce((a,it,i)=>it.st==='done'?i:a,-1);
  const seg=(a,b)=>{let d=`M${pts[a].x} ${pts[a].y}`;for(let i=a+1;i<=b;i++){const p=pts[i-1],q=pts[i],m=(q.y-p.y)/2;d+=` C${p.x} ${p.y+m} ${q.x} ${q.y-m} ${q.x} ${q.y}`}return d};
  const cheer=curI>=0?`<span class="lc-cheer" style="top:${pts[curI].y-90}px;${pts[curI].x<=50?'right:4%':'left:4%'}">${M('cheer')}</span>`:'';
  html+=`<div class="lc-chap"><div class="lc-ch"><span class="e" style="background:${ch.bg}">${ch.emoji}</span><span class="t"><b>${ch.th} <small class="ep">ตอน ${ci+1}</small></b><small>${ch.sub}</small></span>${1?`<button class="lc-lv press" data-go="levels" aria-label="เปลี่ยนระดับ (ตอนนี้ ${levelBy(n).name})">${levelBy(n).name}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>`:''}</div>
   <div class="lc-zz" style="height:${H}px"><svg class="lc-path" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${seg(0,pts.length-1)}" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" vector-effect="non-scaling-stroke"/>${lastDone>0?`<path d="${seg(0,lastDone)}" fill="none" stroke="#2E8B57" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 12" vector-effect="non-scaling-stroke"/>`:''}</svg>${cheer}
   ${items.map((it,i)=>`<div class="lc-pos" style="left:${pts[i].x}%;top:${pts[i].y}px">${it.html}</div>`).join('')}</div></div>`});
 return html}
SC.path=()=>{const n=curLv(),L=levelBy(n),i=lvInfo(n),cur=nextUnit(),rv=reviewWords().length;
 const hello=!S.parts.length?'เริ่มกันเลย!':cur?'ไปต่อกันเลย!':'เก่งมาก!';
 const ch=chips().replace(lvBadge(),'');
 const tail=i.empty?`<div class="card pad2 center lc-empty"><div style="width:130px;height:130px;margin:0 auto">${M('brush')}</div><div class="h2 mt8">${L.name} กำลังเพิ่มเนื้อหา</div><p class="cap" style="margin:6px 8px 0;line-height:1.5">ยังไม่มีบทเรียนในระดับนี้ — ${MASCOT_NAME}กำลังเตรียมอยู่ ระหว่างนี้เล่นเกมจากคำที่รู้แล้ว หรือย้อนไประดับอื่นได้</p><button class="pill sm press mt12" data-go="levels">เลือกระดับอื่น</button></div>`
  :(i.complete?'':`<div class="group lc-wip">${ROW('#EFE8DE',M('brush'),`ตอนต่อไปของ ${L.name}`,`กำลังเพิ่มเนื้อหา · เป้า ≈ ${i.target} คำ (มีแล้ว ${i.words})`,LOCK.replace('<svg','<svg width="18" height="18" style="color:#B9B0A6"'))}</div>`)+(!cur&&n<LV_MAX?`<div class="pad mt16"><button class="pill press" data-go="lvpick" data-lv="${n+1}"><b>ไปต่อที่ ${levelBy(n+1).name}</b><small>${lvInfo(n+1).empty?'กำลังเพิ่มเนื้อหา':LVSTAT(n+1)}</small></button></div>`:'');
 return {title:'บทเรียน',nav:`<header class="nav lc-navb"><div class="nav-l lc-hello">${M('wave')}<span>${hello}</span></div><div class="nav-t">บทเรียน</div><div class="nav-r">${ch}</div></header>`,
 body:`<h1 class="sr-only">บทเรียน</h1>${dvCard()}<div class="lc-lvs" role="group" aria-label="เลือกระดับ">${LEVELS.map(x=>{const j=lvInfo(x.id);return `<button class="lc-l5 press ${x.id===n?'on':''}" data-go="lvpick" data-lv="${x.id}" aria-label="${x.name}${j.empty?' เร็ว ๆ นี้':' เรียนแล้ว '+Math.round(j.pct*100)+'%'}"><b>${x.name}</b><small>${j.empty?'เร็ว ๆ นี้':Math.round(j.pct*100)+'%'}</small></button>`}).join('')}</div>
 <div class="lc-map">${i.empty?`<div class="lc-chap"><div class="lc-ch"><span class="e" style="background:${L.bg}">${L.em}</span><span class="t"><b>${L.name} · ${L.th}</b><small>ยังไม่มีบทเรียน</small></span><button class="lc-lv press" data-go="levels">${L.name}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button></div></div>`:lcMap(n)}${tail}
 <div class="sec">เพิ่มเติม</div><div class="group lc-more">${ROW('#FDF3E6','📝','ทบทวนตามรอบ',rv?rv+' คำถึงรอบทบทวน':'วันนี้ยังไม่มีคำค้าง',undefined,'data-go="review"')}
 ${ROW(L.bg,L.em,'เปลี่ยนระดับ',`ตอนนี้ ${L.name} · ${L.th} · ${LVSTAT(n)}`,undefined,'data-go="levels"')}
 ${ROW('#EAF1FB','🧭','ทดสอบวัดระดับ',S.placeRes?`ผลล่าสุด ≈ ${S.placeRes.est?'ระดับ '+S.placeRes.est:'ก่อนระดับ 1'} · ทำใหม่ได้`:'ไม่แน่ใจว่าควรเริ่มตรงไหน? ลอง 12–20 ข้อ',undefined,'data-go="placement"')}
 ${ROW('#E7F8EE','🎒','ห้องเรียนของฉัน',CLASSMATES.filter(cmUnlocked).length+'/'+CLASSMATES.length+' ตัวละคร',undefined,'data-go="classroom"')}</div>${DEMO}</div>`,
 mount(el){const c=$('.lc-node.cur,.l1row.cur',el),sc=$('.scroller',el);if(c&&!sc.scrollTop){setTimeout(()=>{const y=c.getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-sc.clientHeight*.42;if(y>120)sc.scrollTo({top:y,behavior:'smooth'})},260)}
  el.addEventListener('click',e=>{const b=e.target.closest('[data-lcm]');if(b){vib(8);toast('ผ่านภารกิจตอน “'+b.dataset.lcm+'” แล้ว เก่งมาก!')}})}}};

/* ----- ทดสอบวัดระดับ: ปรับระดับตามคำตอบ (2 ถูกขึ้น / 1 ผิดลง) ----- */
const PL_MIN=12,PL_MAX=20,PL_STOP_WRONG=5;
function plNext(st){ /* เลือกข้อถัดไปที่ระดับ st.d โดยกระจายทักษะ */
 const used=st.used;let lv=st.d;
 for(const dl of [0,-1,1,-2,2,-3,3,-4,4]){const L=lv+dl;if(L<1||L>LV_MAX)continue;
  const cand=PLACE.filter(q=>q.lv===L&&!used.has(q));if(!cand.length)continue;
  const min=Math.min(...Object.keys(PLACE_SKILLS).map(k=>st.sk[k]||0));
  const pref=cand.filter(q=>(st.sk[q.sk]||0)===min&&q.sk!==st.last);const pool=pref.length?pref:cand.filter(q=>q.sk!==st.last).length?cand.filter(q=>q.sk!==st.last):cand;
  return pool[Math.random()*pool.length|0]}
 return null}
function plBuild(q){let top,all;
 if(q.sk==='tone'){all=[{t:q.py,ok:true},...q.wr.map(t=>({t,ok:false}))]}
 else if(q.sk==='fill'){all=[{t:q.ans,ok:true},...q.wr.map(t=>({t,ok:false}))]}
 else all=[{t:q.th,ok:true},...q.wr.map(t=>({t,ok:false}))];
 const o=shuffle(all),spk=(t)=>`<button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${t}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`;
 if(q.sk==='vocab')top=`<div class="cap" style="font-size:14px">คำนี้แปลว่าอะไร</div><div class="bigzh zh" style="font-size:${q.zh.length>2?64:88}px">${q.zh}</div><div style="font-size:26px;font-weight:500;margin-top:2px">${pyHtml(q.py)}</div>`;
 else if(q.sk==='listen')top=`<div class="cap" style="font-size:14px">ฟังเสียงแล้วเลือกความหมาย</div>${spk(q.say)}`;
 else if(q.sk==='read')top=`<div class="cap" style="font-size:14px">อ่านประโยคแล้วเลือกความหมาย</div><div class="zh" style="font-size:${q.zh.length>14?25:30}px;line-height:1.45;margin:14px 22px 2px;font-weight:600">${q.zh}</div>${q.lv===1?`<div style="font-size:15px;color:var(--sub2)">${pyHtml(q.py)}</div>`:''}`;
 else if(q.sk==='fill')top=`<div class="cap" style="font-size:14px">เติมคำให้ประโยคสมบูรณ์</div><div style="font-size:21px;font-weight:700;margin:12px 20px 6px">${q.th}</div><div class="zh" style="font-size:30px;margin:6px 20px 0">${q.zh.replace('＿＿','<span class="blank">＿＿</span>')}</div>`;
 else top=`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอินที่ถูก</div>${spk(q.say)}`;
 const fmt=q.sk==='fill'?t=>`<span class="zh" style="font-size:26px">${t}</span>`:q.sk==='tone'?t=>`<span style="font-size:24px;letter-spacing:.3px">${t}</span>`:t=>t;
 return {top,optsHtml:o.map(x=>fmt(x.t)),ans:o.findIndex(x=>x.ok)}}
function plEstimate(log){const tiers=LEVELS.map(l=>l.id).map(lv=>{const a=log.filter(x=>x.q.lv===lv);return {lv,a:a.length,c:a.filter(x=>x.ok).length}});
 let est=0;for(let n=LV_MAX;n>=1;n--){const t=tiers[n-1];if(t.c>=2&&t.c/t.a>=.5){est=n;break}}
 const skills={};log.forEach(x=>{const s=skills[x.q.sk]=skills[x.q.sk]||{a:0,c:0};s.a++;if(x.ok)s.c++});
 const strong=Object.keys(skills).filter(k=>skills[k].a>=2&&skills[k].c/skills[k].a>=.75),weak=Object.keys(skills).filter(k=>skills[k].a>=2&&skills[k].c/skills[k].a<=.4);
 if(!strong.length){const b=Object.keys(skills).sort((x,y)=>skills[y].c/skills[y].a-skills[x].c/skills[x].a)[0];if(b&&skills[b].c)strong.push(b)}
 const miss=[];log.forEach(x=>{if(!x.ok&&(x.q.sk==='vocab'||x.q.sk==='listen')){const zh=x.q.zh||x.q.say;if(!miss.some(m=>m.zh===zh))miss.push({zh,py:x.q.py,th:x.q.th,lv:x.q.lv})}});
 return {est,rec:Math.min(LV_MAX,est+1),tiers,skills,strong,weak,miss:miss.slice(0,6)}}
function plRun(el){const stage=$('#stage',el),dock=$('#dock',el),pg=$('#pg',el),pc=$('#pc',el);
 const st={d:1,streak:0,wrongRun:0,log:[],used:new Set(),sk:{},last:null,cur:null,q:null,locked:false};
 const lvSeq=[];
 window.__plCur=()=>({q:st.cur,d:st.d,n:st.log.length,ans:st.q?st.q.ans:-1,locked:st.locked});
 function finish(){const r=plEstimate(st.log);const res=Object.assign(r,{at:today(),n:st.log.length,ok:st.log.filter(x=>x.ok).length,early:st.wrongRun>=PL_STOP_WRONG,dk:st.log.filter(x=>x.dk).length});
  S.placeRes={at:res.at,est:res.est,rec:res.rec,n:res.n,ok:res.ok,tiers:res.tiers,skills:res.skills,strong:res.strong,weak:res.weak,miss:res.miss,early:res.early};S.placed=1;(S.placeHist=S.placeHist||[]).push({at:res.at,est:res.est,n:res.n});S.placeHist=S.placeHist.slice(-10);save();stopAudio();replace('placeres',{})}
 function shouldStop(){const n=st.log.length;if(n>=PL_MAX)return true;
  if(st.wrongRun>=PL_STOP_WRONG)return true;
  const top=st.log.filter(x=>x.q.lv===LV_MAX&&x.ok).length;if(top>=3&&n>=PL_MIN)return true;
  if(n>=PL_MIN){const last=lvSeq.slice(-6);if(Math.max(...last)-Math.min(...last)<=1)return true}
  return false}
 function show(){const q=plNext(st);if(!q||shouldStop()){finish();return}
  st.cur=q;st.used.add(q);st.sk[q.sk]=(st.sk[q.sk]||0)+1;st.last=q.sk;st.q=plBuild(q);st.locked=false;
  const n=st.log.length;pg.style.width=Math.min(97,n/15*100)+'%';pc.textContent='ข้อ '+(n+1);
  stage.innerHTML=`<div class="qm" id="qm">${M('think')}</div>`+qHtml(st.q);dock.innerHTML=`<button class="pill sm ghost press" data-pl="dk">ไม่รู้ข้อนี้ (ข้าม)</button>`;
  stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in');$('.scroller',el).scrollTop=0;
  const a=$('[data-auto]',stage);if(a)setTimeout(()=>speak(q.say,a),350)}
 function answer(k,dk){if(st.locked)return;st.locked=true;const ok=!dk&&k===st.q.ans;
  if(k>=0){$$('.opt',stage).forEach((o,j)=>{if(j===k)o.classList.add('picked');else o.classList.add('dim')})}
  st.log.push({q:st.cur,ok,dk:!!dk});lvSeq.push(st.d);vib(8);
  if(ok){st.wrongRun=0;st.streak++;if(st.streak>=2){st.d=Math.min(LV_MAX,st.d+1);st.streak=0}}else{st.wrongRun++;st.streak=0;st.d=Math.max(1,st.d-1)}
  setTimeout(show,dk?120:380)}
 el.addEventListener('click',e=>{const t=e.target.closest('[data-sa],.opt,[data-pl]');if(!t||!el.contains(t))return;
  if(t.classList.contains('opt'))return answer(+t.dataset.i,false);
  if(t.dataset.pl==='dk')return answer(-1,true);
  if(t.dataset.sa==='quit')quitSheet()});
 show()}
SC.placeintro=()=>({title:'ทดสอบวัดระดับ',body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:220px;height:220px;margin:0 auto">${M('student')}</div><div class="large" style="padding:0">ทดสอบวัดระดับ</div><p style="color:var(--sub2);font-size:15.5px;margin:6px 14px 0;line-height:1.5">12–20 ข้อ ไล่จากระดับ 1 ไประดับ 5 ถ้าตอบถูกข้อจะยากขึ้น ถ้าพลาดข้อจะง่ายลง จบแล้ว${MASCOT_NAME}จะวิเคราะห์ระดับและแนะนำจุดเริ่มต้น</p></div>
 <div class="card pad2 mt16" style="font-size:14px;line-height:1.75">✓ ผสม 5 ทักษะ: คำศัพท์ · ฟัง · อ่านประโยค · เติมคำ · วรรณยุกต์<br>✓ ไม่รู้ข้อไหนกด “ไม่รู้ข้อนี้” ได้เลย ไม่ต้องเดา<br>✓ ไม่หักเหรียญ ไม่นับเป็นข้อผิด<br>✓ เลือกระดับเองหรือทำใหม่ได้ทุกเมื่อ</div>
 <p class="cap center" style="padding:10px 30px 0;line-height:1.5">เป็นตัวชี้วัดคร่าว ๆ ไม่ใช่ข้อสอบวัดระดับทางการ</p>
 <div class="dock"><button class="pill press" data-go="placetest"><b>เริ่มทดสอบ</b><small>${S.placeRes?'ทำใหม่ได้ · ผลเก่ายังเก็บไว้จนกว่าจะทำเสร็จ':'ราว 3 นาที'}</small></button><button class="pill sm ghost press mt8" data-go="levels" style="margin-top:8px">ข้าม · เลือกระดับเอง</button></div>`});
SC.placetest=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:'<div class="dock" id="dock"></div><div class="fb" id="fb"></div>',noRefresh:true,unmount(){stopAudio();window.__plCur=null},mount(el){plRun(el)}});
SC.placeres=()=>{const r=S.placeRes;if(!r)return {title:'ผลทดสอบ',body:'<div class="large">ยังไม่มีผลทดสอบ</div>'};
 const est=r.est,rec=r.rec,RL=levelBy(rec),pose=est>=4?'trophy':est>=2?'celebrate':est>=1?'cheer':'student';
 const head=est?`ระดับของคุณ ≈ ระดับ ${est}`:'ระดับของคุณ ≈ ก่อนระดับ 1';
 const msg=est>=LV_MAX?`เก่งมาก! ผ่านถึงระดับสูงสุดที่มีในแอป — ${MASCOT_NAME}ขอทึ่ง`:est>=3?`พื้นฐานแน่นแล้ว! ${MASCOT_NAME}แนะนำให้ไปต่อที่ ${RL.name}`:est>=1?`ดีเลย! คุณมีพื้นฐานอยู่แล้ว ${MASCOT_NAME}แนะนำให้เริ่มที่ ${RL.name}`:`ไม่เป็นไรเลย ทุกคนเริ่มจากศูนย์ — ${MASCOT_NAME}จะพาไปทีละบท`;
 const bars=r.tiers.map(t=>{const x=levelBy(t.lv),p=t.a?t.c/t.a:0;return `<div class="tier"><b style="width:56px">${x.name}</b><div class="tr"><i style="width:${t.a?Math.max(6,p*100):0}%;background:${x.c}"></i></div><small>${t.a?t.c+'/'+t.a:'ไม่ได้ถาม'}</small></div>`}).join('');
 const chipsOf=(arr,cls)=>arr.map(k=>`<span class="skc ${cls}">${PLACE_SKILLS[k]}</span>`).join('');
 const ri=lvInfo(rec);
 return {nav:'<header class="nav"></header>',noRefresh:true,body:`<div class="center" style="padding:calc(var(--st) + 14px) 20px 0"><div class="pop" style="width:210px;height:200px;margin:0 auto">${M(pose)}</div><div class="cap">ผลทดสอบ · ถูก ${r.ok}/${r.n} ข้อ${r.early?' · หยุดเมื่อพลาดติดกันหลายข้อ':''}</div><div class="large" style="padding:2px 0">${head}</div><p style="color:var(--sub2);font-size:15.5px;margin:6px 16px 0;line-height:1.5">${msg}</p></div>
 <div class="card pad2 mt16" style="margin:16px 20px 0"><b style="font-size:15px">ผลแต่ละระดับ</b><div class="mt8">${bars}</div></div>
 <div class="card pad2" style="margin:12px 20px 0;line-height:1.7"><div><b>แข็งแรง:</b> ${r.strong.length?chipsOf(r.strong,'g'):'<span class="cap">ยังดูไม่ชัด — ลองทำใหม่หลังเรียนสักพัก</span>'}</div><div style="margin-top:6px"><b>ควรทบทวน:</b> ${r.weak.length?chipsOf(r.weak,'w'):'<span class="cap">ยังไม่พบจุดอ่อนชัดเจน</span>'}</div>
  ${r.miss.length?`<div style="margin-top:8px"><b>คำที่ควรทบทวน:</b><div style="margin-top:4px">${r.miss.map(m=>`<span class="skc w zh" data-act="audio" data-t="${m.zh}" style="cursor:pointer">${m.zh} <small>${m.th}</small></span>`).join('')}</div></div>`:''}</div>
 <div class="card pad2" style="margin:12px 20px 0;background:${RL.bg}"><div style="display:flex;gap:12px;align-items:center"><span class="lvem" style="background:#fff">${RL.em}</span><div style="flex:1"><b>แนะนำให้เริ่มที่ ${RL.name}</b><div class="cap">${LVSTAT(rec)}</div></div></div>${rec>1?`<p class="cap mt8" style="line-height:1.5">ถ้ารับคำแนะนำ จะถือว่ารู้ระดับ 1${rec>2?'–'+(rec-1):''} แล้ว (ใช้คำเหล่านั้นในเกม) — ย้อนกลับไปเรียนได้ทุกเมื่อ</p>`:''}</div>
 <div class="pad mt16"><button class="pill press" data-pl="accept"><b>เริ่มที่ ${RL.name} (แนะนำ)</b><small>${ri.empty?'ระดับนี้กำลังเพิ่มเนื้อหา':'ไปแผนที่ผจญภัย'}</small></button><button class="pill sm ghost press mt12" data-pl="other">เลือกระดับอื่น</button><button class="pill sm ghost press mt12" data-pl="again">ทำแบบทดสอบใหม่</button>
 <button class="pill sm ghost press mt12" data-pl="share" style="color:#0B7A3B;box-shadow:inset 0 0 0 1.5px rgba(6,199,85,.4)">แชร์ผลให้เพื่อนใน LINE</button></div><p class="cap center" style="padding:12px 30px 24px;line-height:1.5">เป็นตัวชี้วัดคร่าว ๆ ไม่ใช่ข้อสอบวัดระดับทางการ · ผลถูกเก็บไว้ในเครื่องนี้</p>`,
 mount(el){el.addEventListener('click',e=>{const t=e.target.closest('[data-pl]');if(!t)return;const a=t.dataset.pl;vib(8);
  if(a==='accept'){setLevel(rec,rec-1);mountRoot('book');setTimeout(()=>toast(`เริ่มที่ ${RL.name} แล้ว · ${MASCOT_NAME}ไปด้วยนะ`),350)}
  else if(a==='other')replace('levels');
  else if(a==='again')replace('placeintro');
  else if(a==='share')shareSheet('placement',{text:est?`ระดับของฉัน ≈ ระดับ ${est}`:'ฉันเริ่มเรียนจีนจากศูนย์',sub:`ทดสอบวัดระดับ ${MASCOT_NAME} · ถูก ${r.ok}/${r.n} ข้อ`,mascot:pose,stats:[[est?'ระดับ '+est:'เริ่มต้น','ระดับ'],[r.ok+'/'+r.n,'ตอบถูก']]})})}}};
Object.assign(window.GOX,{levels:()=>push('levels',{first:!S.lvPicked&&!S.parts.length}),lvpick:el=>lvSheet(+el.dataset.lv),
 lvzero:()=>{const first=!S.lvPicked&&!S.parts.length;setLevel(1,0);vib(10);mountRoot(first?'home':'book');setTimeout(()=>{try{const u=unitBy('1001a');if(u&&!unitDone('1001a'))push('lesson',{uid:'1001a'});else push('pinlv',{n:1})}catch(e){}},350)},
 placement:()=>push('placeintro'),placetest:()=>replace('placetest')});
