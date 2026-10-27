/* เริ่มต้นใช้งาน · ทดสอบวัดระดับ · วรรณยุกต์สำหรับคนไทย · ห้องเรียนเพื่อน · อะไรจริง/จำลอง */
/* ----- แนะนำตัว 4 ขั้น ----- */
SC.onboard=()=>({nav:'<header class="nav"></header>',noRefresh:true,body:'<div class="stage ob" id="ob"></div>',
 mount(el){const ob=$('#ob',el);let k=0,rt=S.remindAt;
  const dots=()=>`<div class="odots">${[0,1,2,3].map(i=>`<i class="${i<=k?'on':''}"></i>`).join('')}</div>`;
  const pick=(arr,cur,key)=>`<div class="group" style="margin:18px 20px 0">${arr.map(a=>`<button class="row press ${cur===a[0]?'selrow':''}" data-ov="${a[0]}"><span class="ic" style="background:${a[3]||'#F8F3EC'}">${a[1]}</span><span class="tx"><b>${a[2]}</b>${a[4]?`<small>${a[4]}</small>`:''}</span><span class="ck2">${CHECK}</span></button>`).join('')}</div>`;
  function draw(){const P=[
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('student')}</div><div class="large" style="padding:0">ชอบเรียนจีนเพราะอะไร?</div><p class="cap" style="padding:4px 30px 0">${MASCOT_NAME}จะเลือกคำและเรื่องเล่าให้ตรงใจ</p></div>`+pick([['travel','✈️','ไปเที่ยวเมืองจีน','#EAF1FB','เรียนคำใช้จริงตอนเดินทาง'],['work','💼','ใช้ทำงาน','#FDF3E6','สุภาพ ชัดเจน'],['series','📺','ดูซีรีส์จีน','#F2ECFA','จำประโยคติดหู'],['hsk','📝','สอบ HSK','#E7F8EE','ตามหลักสูตร']],S.interest),
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('timer')}</div><div class="large" style="padding:0">วันละกี่นาทีดี?</div><p class="cap" style="padding:4px 30px 0">เริ่มน้อย ๆ แต่ทุกวัน ชนะเรียนยาวครั้งเดียว</p></div>`+pick([[10,'🌱','สบาย ๆ','#E7F8EE','10 XP ≈ 3 นาที'],[20,'🌿','กำลังดี','#FDF3E6','20 XP ≈ 6 นาที'],[30,'🌳','จริงจัง','#FDECEC','30 XP ≈ 10 นาที']],S.goal),
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('listening')}</div><div class="large" style="padding:0">ให้พี่ลามาเตือนใน LINE ไหม?</div></div>
    <div class="card pad2 mt16" style="margin:16px 20px 0"><div style="display:flex;align-items:center;gap:12px"><span class="ic" style="background:#E7F8EE;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px">🔔</span><span style="flex:1"><b>เตือนผ่าน LINE OA (จำลอง)</b><br><small class="cap">เฉพาะตอนสตรีคใกล้ขาด ไม่ส่งรัวทุกวัน</small></span><button class="sw ${S.remind?'on':''}" id="rsw" aria-label="เตือน"></button></div>
    <div class="seg mt12" id="rseg" style="${S.remind?'':'opacity:.4;pointer-events:none'}">${['เช้า','กลางวัน','เย็น','ก่อนนอน'].map(t=>`<button class="${rt===t?'on':''}" data-rt="${t}">${t}</button>`).join('')}</div></div>
    <div class="banner mt12" style="margin:12px 20px 0;background:#FDF3E6;color:#8A5A12;font-size:13px;line-height:1.5"><b>เบื้องหลังที่ซื่อสัตย์:</b> บัญชี LINE OA แพ็กเกจฟรีส่งข้อความหาผู้ใช้ได้ 300 ข้อความ/เดือน (ตอบกลับตอนผู้ใช้ทักมาไม่จำกัดและไม่นับ) ดังนั้นการเตือนจริงจะเป็นแบบ “ผู้ใช้กดรับเอง” และใช้เฉพาะตอนจำเป็น</div>`,
   ()=>`<div class="center"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('think')}</div><div class="large" style="padding:0">เคยเรียนจีนมาก่อนไหม?</div><p class="cap" style="padding:4px 30px 0">ทดสอบ 10 ข้อ (~2 นาที) ให้พี่ลามาแนะนำจุดเริ่มต้น</p></div>
    <div class="pad mt20"><button class="pill row1 press" data-ob="test">ลองทดสอบวัดระดับ</button><button class="pill sm ghost press mt12" data-ob="zero">เริ่มจากศูนย์เลย</button></div><p class="cap center mt12">ทำทีหลังได้จากแท็บบทเรียน</p>`];
   ob.innerHTML=`<div style="padding-top:6px">${dots()}</div>${P[k]()}${k<3?`<div class="dock"><button class="pill row1 press" data-ob="next" ${k===0&&!S.interest?'disabled':''}>ต่อไป</button></div>`:''}`;
   ob.classList.remove('fade-in');void ob.offsetWidth;ob.classList.add('fade-in')}
  ob.onclick=e=>{const t=e.target.closest('[data-ov],[data-ob],#rsw,[data-rt]');if(!t)return;vib(8);
   if(t.dataset.ov!==undefined){const v=t.dataset.ov;if(k===0)S.interest=v;else if(k===1)S.goal=+v;save();draw()}
   else if(t.id==='rsw'){S.remind=!S.remind;save();t.classList.toggle('on',S.remind);$('#rseg',ob).style.cssText=S.remind?'':'opacity:.4;pointer-events:none'}
   else if(t.dataset.rt){rt=S.remindAt=t.dataset.rt;save();$$('[data-rt]',ob).forEach(b=>b.classList.toggle('on',b.dataset.rt===rt))}
   else if(t.dataset.ob==='next'){k++;draw()}
   else if(t.dataset.ob==='zero'){S.seenOnboard=true;save();pop();setTimeout(()=>toast(`ไปกันเลย! บทแรกรออยู่ ${MASCOT_NAME}จะอยู่ข้าง ๆ`),400)}
   else if(t.dataset.ob==='test'){S.seenOnboard=true;save();replace('placeintro')}};
  draw()}});

/* ----- ทดสอบวัดระดับ ----- */
SC.placeintro=()=>({title:'ทดสอบวัดระดับ',body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:220px;height:220px;margin:0 auto">${M('student')}</div><div class="large" style="padding:0">ทดสอบวัดระดับ</div><p style="color:var(--sub2);font-size:15.5px;margin:6px 14px 0">10 ข้อ จากง่ายไปยาก (บทที่ 1–5) ใช้เวลาราว 2 นาที ไม่มีคะแนนตัดสิน — ผลนี้ใช้แนะนำว่าควรเริ่มบทไหนเท่านั้น</p></div>
 <div class="card pad2 mt16" style="font-size:14px;line-height:1.7">✓ ไม่หักเหรียญ ไม่นับเป็นข้อผิด<br>✓ ไม่แน่ใจข้อไหน เดาได้เลย<br>✓ ทำใหม่ได้ทุกเมื่อ</div>
 <div class="dock"><button class="pill press" data-go="placetest"><b>เริ่มทดสอบ</b><small>10 ข้อ</small></button></div>`});
SC.placetest=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const steps=[];LESSONS.forEach((L,i)=>{const pool=L.words.concat(i?LESSONS[i-1].words:[]);const ws=shuffle(L.words);const t1=makeQ(ws[0],'zh2th',pool);const t2=i<2?makeQ(ws[1],'th2zh',pool):i===2?makeQ(ws[1],'audio',pool):fillQ(L,(i+1)%L.sents.length,L.id);steps.push({k:'q',q:t1},{k:'q',q:t2})});
  session(el,steps,res=>{let rec=0;for(let i=0;i<5;i++){if(res.log[i*2]&&res.log[i*2+1])rec=i+1;else break}replace('placeres',{rec,res})},{place:true})}});
SC.placeres=({rec,res})=>{const all=rec>=5,start=Math.min(5,rec+1);const L=lessonBy(start);
 const lvl=all?'ผ่านครบทุกระดับ!':rec===0?'เริ่มจากพื้นฐานได้เลย':`ผ่านถึงบทที่ ${rec} แล้ว`;
 return {nav:'<header class="nav"></header>',noRefresh:true,body:`<div class="center" style="padding:calc(var(--st) + 20px) 20px 0"><div class="pop" style="width:230px;height:220px;margin:0 auto">${M(all?'trophy':rec>=2?'celebrate':'cheer')}</div><div class="cap">ผลทดสอบ · ตอบถูก ${res.correct}/${res.total}</div><div class="large" style="padding:2px 0">${lvl}</div>
 <p style="color:var(--sub2);font-size:15.5px;margin:6px 16px 0">${all?`คุณรู้เนื้อหาทั้ง 5 บทแล้ว! ปลดล็อกเกมทั้งหมดให้เลย — ไปลุยทบทวนและท้าเพื่อนได้`:`${MASCOT_NAME}แนะนำให้เริ่มที่ <b>บทที่ ${start} · ${L.th}</b>${rec?` (ข้ามบทที่ 1–${rec} ที่คุณรู้แล้ว)`:''}`}</p></div>
 <div class="pad mt20">${all?`<button class="pill row1 press" data-pl="all">รับทุกบทแล้วไปเล่นเกม</button>`:rec?`<button class="pill press" data-pl="skip"><b>เริ่มที่บทที่ ${start}</b><small>ข้ามบทก่อนหน้า ให้ 2 ดาวทุกรอบ</small></button><button class="pill sm ghost press mt12" data-pl="zero">เริ่มจากบทที่ 1 อยู่ดี</button>`:`<button class="pill row1 press" data-pl="zero">เริ่มบทที่ 1</button>`}
 <button class="pill sm ghost press mt12" data-pl="share" style="color:#0B7A3B;box-shadow:inset 0 0 0 1.5px rgba(6,199,85,.4)">แชร์ผลให้เพื่อนใน LINE</button></div>`,
 mount(el){el.addEventListener('click',e=>{const t=e.target.closest('[data-pl]');if(!t)return;const a=t.dataset.pl;vib(8);const mark=n=>{for(let i=1;i<=n;i++)['a','b'].forEach(p=>{if(!unitDone(i+p)){S.parts.push(i+p);S.stars[i+p]=2}})};
  if(a==='share')return shareSheet('placement',{text:all?'ฉันผ่านครบทั้ง 5 บท!':rec?`ฉันเริ่มที่บทที่ ${start}`:'ฉันเริ่มเรียนจีนบทแรก',sub:`ทดสอบวัดระดับ ตอบถูก ${res.correct}/${res.total}`,mascot:all?'trophy':'student',stats:[[res.correct+'/'+res.total,'ตอบถูก'],[Math.min(rec,5)+'','บทที่ผ่าน']]});
  S.placed=Math.max(1,rec);if(a==='all'){mark(5);addCoins(50,true);confetti(100)}else if(a==='skip')mark(rec);save();mountRoot(a==='all'?'game':'home')})}}};

/* ----- วรรณยุกต์สำหรับคนไทย ----- */
SC.tones=()=>({title:'วรรณยุกต์',body:`<div class="center" style="padding:6px 20px 0"><div style="width:170px;height:170px;margin:0 auto">${M('speaking')}</div><div class="large" style="padding:0">วรรณยุกต์จีน</div><p style="color:var(--sub2);font-size:15px;margin:6px 14px 0">คนไทยได้เปรียบ เพราะเราคุ้นกับเสียงสูงต่ำอยู่แล้ว! แตะการ์ดเพื่อฟังตัวอย่าง</p></div>
 <div class="mt16">${TONE_GUIDE.map(t=>{const [py,zh]=t.ex.split(' ');return `<button class="card tonec press" data-act="audio" data-t="${zh}"><span class="tmk ${t.c}">${t.mark}</span><span style="flex:1"><b>${t.name}</b><br><small style="color:var(--sub2);font-size:13.5px;line-height:1.45;display:block;margin-top:2px">${t.thai}</small><small class="cap" style="display:block;margin-top:3px">${t.like}</small></span><span class="tex"><span class="zh" style="font-size:26px">${zh}</span><small>${py}</small></span></button>`}).join('')}</div>
 <p class="cap center" style="padding:6px 30px 0">* การเทียบกับวรรณยุกต์ไทยเป็นการเปรียบเทียบคร่าว ๆ เพื่อช่วยจำ ไม่ใช่เสียงเดียวกันทุกประการ ฟังเสียงจริงควบคู่เสมอ</p>
 <div class="dock"><button class="pill press" data-go="tonedrill"><b>ฝึกฟังวรรณยุกต์</b><small>8 ข้อ จากคำที่เรียนแล้ว</small></button></div>`});
SC.tonedrill=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const pool=gameWords().length>=6?gameWords():ALLW;const qs=[];shuffle(pool).forEach(w=>{if(qs.length<8){const q=toneQ(w);if(q)qs.push({k:'q',q})}});
  session(el,qs,res=>{const xp=res.correct*5;addXp(xp);addCoins(res.correct);replace('result',{title:'ฝึกวรรณยุกต์เสร็จ',mascot:res.correct>=6?'celebrate':'cheer',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:res.correct,stats:[['ตอบถูก',res.correct+'/'+res.total]],back:'x'})},{review:true})}});

/* ----- ห้องเรียนของฉัน (เพื่อนที่สะสมได้) ----- */
SC.classroom=()=>{const n=CLASSMATES.filter(cmUnlocked).length;
 return {title:'ห้องเรียนของฉัน',body:`<div class="large">ห้องเรียนของฉัน</div><p class="cap" style="padding:2px 20px 0">เพื่อนร่วมห้อง ${n}/${CLASSMATES.length} · เรียนจบบทเพื่อเจอเพื่อนใหม่</p>
 <div class="cmgrid">${CLASSMATES.map(c=>{const on=cmUnlocked(c);return `<button class="cmcell card press" data-go="cm" data-id="${c.id}"><div class="cmp ${on?'':'off'}" style="${on?`background:${c.c}22`:''}">${cmImg(c,on)}</div><b>${on?c.n:'???'}</b><small>${on?c.role:c.by==='duel'?'ชนะดวลเพื่อน 1 ครั้ง':'เรียนบทที่ '+c.by.split(':')[1]+' ให้จบ'}</small></button>`}).join('')}</div>
 <p class="cap center" style="padding:14px 30px 0">${CLASSMATE_NOTE}</p>`}};
function cmSheet(id){const c=CLASSMATES.find(x=>x.id===id),on=cmUnlocked(c);
 if(!on)return openSheet(`<div class="center" style="padding:0 24px"><div style="width:150px;height:150px;margin:0 auto;opacity:.9">${cmImg(c,false)}</div><div class="h2 mt8">เพื่อนลึกลับ</div><p style="color:var(--sub2);margin:6px 0 16px;font-size:15px">${c.by==='duel'?'ชนะดวลเพื่อนสักหนึ่งครั้ง แล้วจะได้เจอ':`เรียนบทที่ ${c.by.split(':')[1]} ให้จบ แล้วจะได้เจอ`}</p><button class="pill sm press" data-act="closesheet">ตกลง</button></div>`);
 openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:170px;height:170px;margin:0 auto">${cmImg(c)}</div><div class="h2">${c.n} <span class="zh" style="font-weight:400">${c.zh}</span></div><div style="font-size:14px;margin-top:2px">${pyHtml(c.py)}</div><div class="cap mt8" style="color:${c.c};font-weight:700">${c.role}</div><p style="color:var(--sub2);margin:6px 0 10px;font-size:15px">“${c.line}”</p>
  <button class="card press" data-act="audio" data-t="${c.say}" style="width:100%;padding:12px 16px;text-align:left;display:flex;gap:12px;align-items:center"><span class="audio" style="margin:0;width:44px;height:44px;flex:none"><span style="width:20px;display:flex">${SPK}</span></span><span><span class="zh" style="font-size:19px">${c.say}</span><br><small class="cap">${c.sayTh}</small></span></button>
  <button class="pill sm ghost press mt12" id="cms">แชร์เพื่อนคนนี้ใน LINE</button></div>`,{onMount:sh=>$('#cms',sh).onclick=()=>{closeSheet();setTimeout(()=>shareSheet('cm',{cm:c}),300)}})}

/* ----- อะไรจริง อะไรจำลอง ----- */
SC.realnote=()=>({title:'อะไรจริง อะไรจำลอง',body:`<div class="large">อะไรจริง อะไรจำลอง</div><p class="cap" style="padding:2px 20px 0">เพื่อให้ตัดสินใจได้ถูกว่าอะไรพร้อมใช้จริง และอะไรต้องต่อระบบเพิ่ม</p>
 <div class="sec">ทำงานได้จริงในเว็บนี้</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">✅ บทเรียน แบบฝึกหัด ทดสอบวัดระดับ เกม<br>✅ เสียงอ่านภาษาจีนเป็นไฟล์ mp3 (สร้างจากเสียงสังเคราะห์ ไม่ใช่ผู้พูดจริง)<br>✅ สตรีค ภารกิจ เหรียญ ตั๋วกันสตรีค (เก็บในเครื่องนี้ ไม่มีระบบหลังบ้าน)<br>✅ การ์ดแชร์เป็นรูปภาพจริง และปุ่มแชร์ของมือถือ (Web Share)</div>
 <div class="sec">จำลองไว้ให้ดูประสบการณ์</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">🟡 การเข้าสู่ระบบ LINE และรายชื่อเพื่อน<br>🟡 การส่งข้อความถึงเพื่อน/กลุ่ม และคำตอบของเพื่อน<br>🟡 บัดดี้สตรีค ลีก อันดับห้องต่อห้อง บอสประจำสัปดาห์<br>🟡 ติวเตอร์ AI (ตอบจากสคริปต์ ยังไม่ได้ต่อ AI จริง)<br>🟡 ข้อความเตือนจาก OA · การชำระเงิน แผน Plus/Buddy</div>
 <div class="sec">ทำจริงบน LINE ได้ด้วยเครื่องมือเหล่านี้</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">💚 <b>LINE Login / LIFF</b> — ดึงชื่อและรูปโปรไฟล์ เปิดเว็บในแชต<br>💚 <b>shareTargetPicker</b> — ผู้ใช้เลือกเพื่อน/กลุ่มเอง แล้วส่งการ์ด Flex<br>💚 <b>Messaging API</b> — ตอบกลับ (reply) ฟรีไม่จำกัด · ข้อความ push/broadcast นับโควตา: แพ็กเกจฟรีของ LINE OA ไทย 300 ข้อความ/เดือน (ตรวจเงื่อนไขล่าสุดกับ LINE อีกครั้งก่อนใช้งานจริง)<br>💚 <b>Rich menu</b> — เมนูปุ่มใต้แชต เช่น เรียนต่อ ท้าเพื่อน ถามติวเตอร์</div>
 <div class="sec">ข้อจำกัดที่ต้องออกแบบรอบ ๆ</div><div class="card pad2" style="font-size:14.5px;line-height:1.75">⚠️ ไม่มี API ให้ดูรายชื่อเพื่อนทั้งหมดของผู้ใช้ — การชวนเพื่อนต้องให้ผู้ใช้กดส่งลิงก์เอง<br>⚠️ push ได้เฉพาะผู้ใช้ที่เป็นเพื่อนกับ OA และกินโควตา → ใช้เตือนเฉพาะตอนจำเป็น และให้ผู้ใช้ “กดรับเอง”<br>⚠️ สตรีคบัดดี้ต้องมีฐานข้อมูลฝั่งเซิร์ฟเวอร์เก็บการเรียนของทั้งสองคน</div>${DEMO.replace('data-go="realnote"','')}`});

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
