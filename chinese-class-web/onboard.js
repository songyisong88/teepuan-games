/* เริ่มต้นใช้งาน · ทดสอบวัดระดับ · วรรณยุกต์สำหรับคนไทย · ห้องเรียนเพื่อน · อะไรจริง/จำลอง */
/* ----- แนะนำตัว 4 ขั้น ----- */
SC.onboard=()=>({nav:'<header class="nav"></header>',noRefresh:true,body:'<div class="stage ob" id="ob"></div>',
 mount(el){const ob=$('#ob',el);let k=window.__obK||0,rt=S.remindAt,obPick=false;const ORD=[3,0,1,2];window.__obRun=true;
  const dots=()=>`<div class="odots">${[0,1,2,3].map(i=>`<i class="${i<=k?'on':''}"></i>`).join('')}</div>`;
  const pick=(arr,cur,key)=>`<div class="group" style="margin:18px 20px 0">${arr.map(a=>`<button class="row press ${cur===a[0]?'selrow':''}" data-ov="${a[0]}"><span class="ic" style="background:${a[3]||'#F8F3EC'}">${a[1]}</span><span class="tx"><b>${a[2]}</b>${a[4]?`<small>${a[4]}</small>`:''}</span><span class="ck2">${CHECK}</span></button>`).join('')}</div>`;
  function draw(){const P=[
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('student')}</div><div class="large" style="padding:0">ชอบเรียนจีนเพราะอะไร?</div><p class="cap" style="padding:4px 30px 0">${MASCOT_NAME}จะเลือกคำและเรื่องเล่าให้ตรงใจ</p></div>`+pick([['travel','✈️','ไปเที่ยวเมืองจีน','#EAF1FB','เรียนคำใช้จริงตอนเดินทาง'],['work','💼','ใช้ทำงาน','#FDF3E6','สุภาพ ชัดเจน'],['series','📺','ดูซีรีส์จีน','#F2ECFA','จำประโยคติดหู'],['hsk','📝','เตรียมสอบ','#E7F8EE','ตามหลักสูตร']],S.interest),
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('timer')}</div><div class="large" style="padding:0">วันละกี่นาทีดี?</div><p class="cap" style="padding:4px 30px 0">เริ่มน้อย ๆ แต่ทุกวัน ชนะเรียนยาวครั้งเดียว</p></div>`+pick([[10,'🌱','สบาย ๆ','#E7F8EE','10 XP ≈ 3 นาที'],[20,'🌿','กำลังดี','#FDF3E6','20 XP ≈ 6 นาที'],[30,'🌳','จริงจัง','#FDECEC','30 XP ≈ 10 นาที'],[50,'🔥','สายแข็ง','#F1EBFA','50 XP ≈ 16 นาที']],S.goal),
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('listening')}</div><div class="large" style="padding:0">ให้น้องลามาเตือนใน LINE ไหม?</div></div>
    <div class="card pad2 mt16" style="margin:16px 20px 0"><div style="display:flex;align-items:center;gap:12px"><span class="ic" style="background:#E7F8EE;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px">🔔</span><span style="flex:1"><b>เตือนผ่าน LINE OA (จำลอง)</b><br><small class="cap">เฉพาะตอนสตรีคใกล้ขาด ไม่ส่งรัวทุกวัน</small></span><button class="sw ${S.remind?'on':''}" id="rsw" aria-label="เตือน"></button></div>
    <div class="seg mt12" id="rseg" style="${S.remind?'':'opacity:.4;pointer-events:none'}">${['เช้า','กลางวัน','เย็น','ก่อนนอน'].map(t=>`<button class="${rt===t?'on':''}" data-rt="${t}">${t}</button>`).join('')}</div></div>
    <div class="banner mt12" style="margin:12px 20px 0;background:#FDF3E6;color:#8A5A12;font-size:13px;line-height:1.5"><b>เบื้องหลังที่ซื่อสัตย์:</b> บัญชี LINE OA แพ็กเกจฟรีส่งข้อความหาผู้ใช้ได้ 300 ข้อความ/เดือน (ตอบกลับตอนผู้ใช้ทักมาไม่จำกัดและไม่นับ) ดังนั้นการเตือนจริงจะเป็นแบบ “ผู้ใช้กดรับเอง” และใช้เฉพาะตอนจำเป็น</div>`,
   ()=>{const lp=S.lvPicked||S.placed,L=levelBy(curLv());return `<div class="center"><div class="pop" style="width:190px;height:190px;margin:0 auto">${M('think')}</div><div class="large" style="padding:0">เริ่มที่ระดับไหนดี?</div><p class="cap" style="padding:4px 30px 0">เลือกจุดเริ่มต้น เปลี่ยนทีหลังได้ทุกเมื่อ ความคืบหน้าไม่หาย</p></div>
    <div class="pad mt16"><button class="pill obbig press" data-ob="test"><b>ทดสอบวัดระดับ</b><small>แนะนำ · 12–20 ข้อ ราว 3 นาที · ไม่รู้ข้อไหนกดข้ามได้</small></button><button class="pill obbig alt press mt12" data-ob="pickopen"><b>เลือกระดับเอง</b><small>ระดับ 1–5 · เลือกได้เลยไม่ต้องทดสอบ</small></button></div>
    ${obPick?`<div class="group" style="margin:12px 20px 0">${LEVELS.map(x=>`<button class="row press ${lp&&curLv()===x.id?'selrow':''}" data-ob="lv" data-lv="${x.id}"><span class="ic" style="background:${x.bg}">${x.em}</span><span class="tx"><b>${x.name} · ${x.th}</b><small>${LVSTAT(x.id)}</small></span><span class="ck2">${CHECK}</span></button>`).join('')}</div>`:''}
    <div class="pad"><button class="pill sm ghost press mt12" data-ob="zero">ไม่เคยเรียนเลย — เริ่มจากศูนย์</button></div>${lp?`<p class="cap center" style="padding:10px 30px 0;line-height:1.5">ตอนนี้ตั้งไว้ที่ <b>${L.name}</b>${S.assume>0?` · ถือว่ารู้ระดับ 1${S.assume>1?'–'+S.assume:''} แล้ว`:''}</p><div class="dock"><button class="pill row1 press" data-ob="next">ต่อไป</button></div>`:''}`}];
   const st=ORD[k];ob.innerHTML=`<div style="padding-top:6px">${dots()}</div>${P[st]()}${k>0&&k<3?`<div class="dock"><button class="pill row1 press" data-ob="next" ${st===0&&!S.interest?'disabled':''}>ต่อไป</button><button class="pill sm ghost press" data-ob="back" style="margin-top:8px">ย้อนกลับ</button></div>`:k===3?`<div class="dock"><button class="pill row1 press" data-ob="fin">เริ่มเรียนเลย</button><button class="pill sm ghost press" data-ob="back" style="margin-top:8px">ย้อนกลับ</button></div>`:''}`;
   ob.classList.remove('fade-in');void ob.offsetWidth;ob.classList.add('fade-in')}
  ob.onclick=e=>{const t=e.target.closest('[data-ov],[data-ob],#rsw,[data-rt]');if(!t)return;vib(8);
   if(t.dataset.ov!==undefined){const v=t.dataset.ov;if(ORD[k]===0)S.interest=v;else if(ORD[k]===1)S.goal=+v;save();draw()}
   else if(t.id==='rsw'){S.remind=!S.remind;save();t.classList.toggle('on',S.remind);$('#rseg',ob).style.cssText=S.remind?'':'opacity:.4;pointer-events:none'}
   else if(t.dataset.rt){rt=S.remindAt=t.dataset.rt;save();$$('[data-rt]',ob).forEach(b=>b.classList.toggle('on',b.dataset.rt===rt))}
   else if(t.dataset.ob==='next'){k++;draw()}
   else if(t.dataset.ob==='back'){k=Math.max(0,k-1);draw()}
   else if(t.dataset.ob==='pickopen'){obPick=!obPick;draw();if(obPick)setTimeout(()=>{const g=$('[data-ob=lv]',ob);if(g)g.scrollIntoView({block:'center',behavior:'smooth'})},60)}
   else if(t.dataset.ob==='lv'){const n=+t.dataset.lv;setLevel(n,n-1,true);obPick=true;draw()}
   else if(t.dataset.ob==='zero'){setLevel(1,0,true);window.__pinZero=true;window.__obK=1;k=1;draw()}
   else if(t.dataset.ob==='test'){window.__obK=1;push('placeintro')}
   else if(t.dataset.ob==='fin'){S.seenOnboard=true;save();window.__obRun=false;window.__obK=0;mountRoot('home',false);if(window.__pinZero){window.__pinZero=false;setTimeout(()=>{try{push('pinlv',{n:1})}catch(e){}},120)}setTimeout(()=>toast(lvDriven()?`เริ่มที่ระดับ ${curLv()} แล้ว · ${MASCOT_NAME}ไปด้วยนะ`:`ไปกันเลย! บทแรกรออยู่ ${MASCOT_NAME}จะอยู่ข้าง ๆ`),400)}};
  draw()}});

/* ทดสอบวัดระดับและเลือกระดับ → levels.js */

/* ----- วรรณยุกต์สำหรับคนไทย ----- */
SC.tones=()=>({title:'วรรณยุกต์',body:`<div class="center" style="padding:6px 20px 0"><div style="width:170px;height:170px;margin:0 auto">${M('speaking')}</div><div class="large" style="padding:0">วรรณยุกต์จีน</div><p style="color:var(--sub2);font-size:15px;margin:6px 14px 0">คนไทยได้เปรียบ เพราะเราคุ้นกับเสียงสูงต่ำอยู่แล้ว! แตะการ์ดเพื่อฟังตัวอย่าง</p></div>
 <div class="mt16">${TONE_GUIDE.map(t=>{const [py,zh]=t.ex.split(' ');return `<button class="card tonec press" data-act="audio" data-t="${zh}"><span class="tmk ${t.c}">${t.mark}</span><span style="flex:1"><b>${t.name}</b><br><small style="color:var(--sub2);font-size:13.5px;line-height:1.45;display:block;margin-top:2px">${t.thai}</small><small class="cap" style="display:block;margin-top:3px">${t.like}</small></span><span class="tex"><span class="zh" style="font-size:26px">${zh}</span><small>${py}</small></span></button>`}).join('')}</div>
 <p class="cap center" style="padding:6px 30px 0">* การเทียบกับวรรณยุกต์ไทยเป็นการเปรียบเทียบคร่าว ๆ เพื่อช่วยจำ ไม่ใช่เสียงเดียวกันทุกประการ ฟังเสียงจริงควบคู่เสมอ</p>
 <div class="dock"><button class="pill press" data-go="tonedrill"><b>ฝึกฟังวรรณยุกต์</b><small>8 ข้อ จากคำที่เรียนแล้ว</small></button></div>`});
SC.tonedrill=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const pool=gw4();const qs=[];shuffle(pool).forEach(w=>{if(qs.length<8){const q=toneQ(w);if(q)qs.push({k:'q',q})}});
  session(el,qs,res=>{const xp=evX(res.correct*2),cn=evC(res.correct);addXp(xp,null,1);addCoins(cn,1);replace('result',{title:'ฝึกวรรณยุกต์เสร็จ',mascot:res.correct>=6?'celebrate':'cheer',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:cn,stats:[['ตอบถูก',res.correct+'/'+res.total]],back:'x'})},{review:true})}});

/* ----- ห้องเรียนของฉัน (เพื่อนที่สะสมได้) ----- */
SC.classroom=()=>{const n=CLASSMATES.filter(cmUnlocked).length;
 return {title:'ห้องเรียนของฉัน',body:`<div class="large">ห้องเรียนของฉัน</div><p class="cap" style="padding:2px 20px 0">เพื่อนร่วมห้อง ${n}/${CLASSMATES.length} · เรียนจบบทเพื่อเจอเพื่อนใหม่</p>
 <div class="cmgrid">${CLASSMATES.map(c=>{const on=cmUnlocked(c);return `<button class="cmcell card press" data-go="cm" data-id="${c.id}"><div class="cmp ${on?'':'off'}" style="${on?`background:${c.c}22`:''}">${cmImg(c,on)}</div><b>${on?c.n:'???'}</b><small>${on?c.role:c.by==='duel'?'ชนะดวลเพื่อน 1 ครั้ง':'เรียนบทที่ '+c.by.split(':')[1]+' ให้จบ'}</small></button>`}).join('')}</div>
 <p class="cap center" style="padding:14px 30px 0">${CLASSMATE_NOTE}</p>`}};
function cmSheet(id){const c=CLASSMATES.find(x=>x.id===id),on=cmUnlocked(c);
 if(!on)return openSheet(`<div class="center" style="padding:0 24px"><div style="width:150px;height:150px;margin:0 auto;opacity:.9">${cmImg(c,false)}</div><div class="h2 mt8">เพื่อนลึกลับ</div><p style="color:var(--sub2);margin:6px 0 16px;font-size:15px">${c.by==='duel'?'ชนะดวลเพื่อนสักหนึ่งครั้ง แล้วจะได้เจอ':`เรียน${lnoTxt(lessonBy(+c.by.split(':')[1]))} ให้จบ แล้วจะได้เจอ`}</p><button class="pill sm press" data-act="closesheet">ตกลง</button></div>`);
 openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:170px;height:170px;margin:0 auto">${cmImg(c)}</div><div class="h2">${c.n} <span class="zh" style="font-weight:400">${c.zh}</span></div><div style="font-size:14px;margin-top:2px">${pyHtml(c.py)}</div><div class="cap mt8" style="color:${c.c};font-weight:700">${c.role}</div><p style="color:var(--sub2);margin:6px 0 10px;font-size:15px">“${c.line}”</p>
  <button class="card press" data-act="audio" data-t="${c.say}" style="width:100%;padding:12px 16px;text-align:left;display:flex;gap:12px;align-items:center"><span class="audio" style="margin:0;width:44px;height:44px;flex:none"><span style="width:20px;display:flex">${SPK}</span></span><span><span class="zh" style="font-size:19px">${c.say}</span><br><small class="cap">${c.sayTh}</small></span></button>
  <button class="pill sm ghost press mt12" id="cms">แชร์เพื่อนคนนี้ใน LINE</button></div>`,{onMount:sh=>$('#cms',sh).onclick=()=>{closeSheet();setTimeout(()=>shareSheet('cm',{cm:c}),300)}})}

/* ----- อะไรจริง อะไรจำลอง ----- */
SC.realnote=()=>({title:'อะไรจริง อะไรจำลอง',body:`<div class="large">อะไรจริง อะไรจำลอง</div><p class="cap" style="padding:2px 20px 0">เพื่อให้ตัดสินใจได้ถูกว่าอะไรพร้อมใช้จริง และอะไรต้องต่อระบบเพิ่ม</p>
 <div class="sec">ทำงานได้จริงในเว็บนี้</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">· บทเรียน แบบฝึกหัด ทดสอบวัดระดับ เกม<br>· เสียงอ่านภาษาจีนเป็นไฟล์ mp3 (สร้างจากเสียงสังเคราะห์ ไม่ใช่ผู้พูดจริง)<br>· สตรีค ภารกิจ เหรียญ ตั๋วกันสตรีค (เก็บในเครื่องนี้ ไม่มีระบบหลังบ้าน)<br>· การ์ดแชร์เป็นรูปภาพจริง และปุ่มแชร์ของมือถือ (Web Share)</div>
 <div class="sec">จำลองไว้ให้ดูประสบการณ์</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">· การเข้าสู่ระบบ LINE และรายชื่อเพื่อน<br>· การส่งข้อความถึงเพื่อน/กลุ่ม และคำตอบของเพื่อน<br>· บัดดี้สตรีค ลีก อันดับห้องต่อห้อง บอสประจำสัปดาห์<br>· ติวเตอร์ AI (ตอบจากสคริปต์ ยังไม่ได้ต่อ AI จริง)<br>· ข้อความเตือนจาก OA · การชำระเงิน แผน Plus/Buddy</div>
 <div class="sec">ทำจริงบน LINE ได้ด้วยเครื่องมือเหล่านี้</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">💚 <b>LINE Login / LIFF</b> — ดึงชื่อและรูปโปรไฟล์ เปิดเว็บในแชต<br>💚 <b>shareTargetPicker</b> — ผู้ใช้เลือกเพื่อน/กลุ่มเอง แล้วส่งการ์ด Flex<br>💚 <b>Messaging API</b> — ตอบกลับ (reply) ฟรีไม่จำกัด · ข้อความ push/broadcast นับโควตา: แพ็กเกจฟรีของ LINE OA ไทย 300 ข้อความ/เดือน (ตรวจเงื่อนไขล่าสุดกับ LINE อีกครั้งก่อนใช้งานจริง)<br>💚 <b>Rich menu</b> — เมนูปุ่มใต้แชต เช่น เรียนต่อ ท้าเพื่อน ถามติวเตอร์</div>
 <div class="sec">ข้อจำกัดที่ต้องออกแบบรอบ ๆ</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">· ไม่มี API ให้ดูรายชื่อเพื่อนทั้งหมดของผู้ใช้ — การชวนเพื่อนต้องให้ผู้ใช้กดส่งลิงก์เอง<br>· push ได้เฉพาะผู้ใช้ที่เป็นเพื่อนกับ OA และกินโควตา → ใช้เตือนเฉพาะตอนจำเป็น และให้ผู้ใช้ “กดรับเอง”<br>· สตรีคบัดดี้ต้องมีฐานข้อมูลฝั่งเซิร์ฟเวอร์เก็บการเรียนของทั้งสองคน</div>${DEMO.replace('data-go="realnote"','')}`});

/* ----- ตัวเชื่อมการนำทางเพิ่มเติม (ใช้กับ data-go) ----- */
window.GOX={
 event:()=>eventOpen(),
 mclaim:el=>missionClaim(el.dataset.id),
 buddy:()=>push('buddy'),
 buddypick:()=>buddyPick(),
 nudge:()=>{const f=buddyInfo();shareSheet('nudge',{to:f.n})},
 nudge2:()=>{const f=buddyInfo();shareSheet('nudge',{to:f.n})},
 buddyend:()=>{S.buddy=null;save();pop();toast('ยกเลิกบัดดี้แล้ว');refresh()},
 tones:()=>push('tones'),tonedrill:()=>replace('tonedrill'),
 study:()=>push('study'),recap:()=>push('recap'),tutor:()=>push('tutor'),
 placement:()=>push('placeintro'),placetest:()=>replace('placetest'),
 classroom:()=>push('classroom'),cm:el=>cmSheet(el.dataset.id),realnote:()=>push('realnote'),
 reviewgo:()=>push('rsession')};
function buddyPick(){openSheet(`<div style="padding:0 20px"><div class="h2">เลือกบัดดี้สตรีค</div><p class="cap">หน้าจำลองรายชื่อ LINE · ใน LINE จริงจะส่งลิงก์ชวนให้เพื่อนกดรับ</p></div><div class="group mt12">${FRIENDS.map((f,i)=>`<button class="row press" data-bf="${i}">${avatar(f.n,f.c)}<span class="tx"><b>${f.n}</b><small>สตรีค ${f.s} วัน</small></span>${CHEV}</button>`).join('')}</div>`,
 {onMount:sh=>$$('[data-bf]',sh).forEach(b=>b.onclick=()=>{const i=+b.dataset.bf;closeSheet();toast(`ส่งคำชวนถึง${FRIENDS[i].n}แล้ว…`);bumpCnt('social',1);setTimeout(()=>{S.buddy={n:i,since:today(),last:-99,streak:0,nudgeDay:-99};save();toast(`🤝 ${FRIENDS[i].n}รับคำชวนแล้ว! (จำลอง)`);confetti(60);vib([15,30,15]);buddyTick();refresh()},1300)})})}
