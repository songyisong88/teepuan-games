/* สังคม (จำลอง LINE): อันดับ กลุ่ม แชร์ แผน โปรไฟล์ */
const AVC=['#B0623A','#477F60','#4672AE','#7F52A0','#BC4B64','#27211E'];
const avatar=(n,c)=>`<span class="av" style="background:${c}">${n.replace('พี่','').replace('น้อง','')[0]}</span>`;
let rankTab=0;
const CLASSWAR=[['ห้องจีนมือใหม่ 🐑',0],['ห้องสายซีรีส์ 📺',610],['ชมรมจีนเที่ยวไทย ✈️',560],['ทีมติวระดับ 1',520],['ห้องสายธุรกิจ 💼',470]];
function classRows(){const d=(today()+3)%7+1;const mine=CLASSWAR[0];
 const rows=CLASSWAR.map((c,i)=>i===0?{n:c[0],xp:430+d*95+weekXp(),me:1}:{n:c[0],xp:c[1]-60+d*(88+i*9)});rows.sort((a,b)=>b.xp-a.xp);return rows}
function classBody(){const rows=classRows(),pos=rows.findIndex(r=>r.me)+1,me=rows[pos-1],ahead=rows[pos-2];
 const gap=ahead?ahead.xp-me.xp:0;
 return `<div class="card pad2 mt16" style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div style="flex:1"><div class="cap">สงครามห้องเรียน · สัปดาห์นี้</div><b style="font-size:18px">ห้องเราอยู่อันดับ ${pos} จาก ${rows.length}</b><div class="cap mt8">${ahead?`ตามห้อง “${ahead.n}” อยู่ ${gap} XP — XP ที่คุณหาได้ช่วยห้องเราขึ้นไปด้วย`:'นำอยู่! ช่วยกันรักษาอันดับไว้'}</div></div><div style="width:92px;height:92px;flex:none">${M(pos===1?'trophy':'duel')}</div></div>
 <div class="group">${rows.map((r,i)=>`<div class="lrow ${r.me?'me':''}"><span class="rk">${i+1}</span><span class="av" style="background:${r.me?'var(--red)':AVC[i%6]}">${r.n[0]}</span><span style="flex:1;font-weight:${r.me?700:500}">${r.n}${r.me?' (ห้องเรา)':''}</span><span class="val" style="font-weight:600;color:var(--ink)">${r.xp} XP</span></div>`).join('')}</div>
 <div class="pad mt16"><button class="pill sm linebtn row1 press" data-sa="cwshare">ส่งคำท้า “ห้องต่อห้อง” ลงกลุ่ม LINE</button></div>
 <p class="cap center" style="padding:12px 30px 0">ห้องอื่นและคะแนนเป็นข้อมูลสมมติ · ของจริงต้องมีระบบหลังบ้านรวมคะแนนจากทุกกลุ่ม LINE ที่เชิญบอทเข้าไป</p>`}
function rankBody(t){
 if(t===3)return classBody();
 if(t===0)return leagueHead()+`<div class="group">${leagueRows()}</div><p class="cap center" style="padding:12px 30px 0">คู่แข่งในลีกเป็นข้อมูลสมมติ (ตัวอย่างทดลอง) · รอบใหม่ทุกวันจันทร์ · 5 อันดับแรกขึ้นลีก 3 อันดับท้ายตกลีก</p>`;
 if(t===1)return `<div class="card pad2 mt16" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="cap">รหัสชวนของฉัน</div><b style="font-size:22px;letter-spacing:1px">${S.inviteCode}</b></div><div style="width:70px;height:70px">${M('bow')}</div></div>
   <div class="prog mt12"><i style="width:${Math.min(1,S.invited/3)*100}%"></i></div><div class="cap mt8">เพื่อนเข้าห้องแล้ว ${S.invited}/3 คน · ครบ 3 คนได้ตั๋วกันสตรีค 🎟️</div>
   <button class="pill sm linebtn row1 press mt12" data-go="invite">ชวนเพื่อนทาง LINE (จำลอง)</button><button class="cap press mt12" style="width:100%;color:var(--sub2)" data-sa="simjoin">จำลองเพื่อนกดลิงก์เข้ามา</button></div>
   <div class="group">${FRIENDS.map((f,i)=>`<div class="row"><span class="av" style="background:${f.c}">${f.n.replace('พี่','').replace('น้อง','')[0]}</span><span class="tx"><b>${f.n}</b><small>🔥 ${f.s} วัน</small></span><button class="chip press" style="height:30px;font-size:13px" data-sa="duelf" data-i="${i}">ท้า ⚔️</button></div>`).join('')}</div>`;
 return `<div class="group mt16">${GROUPS.map((g,i)=>ROW('#fff','💬',g.n,g.cnt+' คน · ห้องเรียนในไลน์ (จำลอง)',undefined,`data-go="group" data-i="${i}"`).replace('class="ic" style="background:#fff"','class="ic" style="background:#E7F8EE"')).join('')}</div><div class="group mt12">${ROW('#EAF1FB','🧩','ทีมชนทีม','3 คนชน 3 คน · 6 รอบ · เพื่อนร่วมทีมจำลอง',undefined,'data-go="teamquiz" data-m="team"')}${ROW('#E7F8EE','🏃','วิ่งผลัดคำศัพท์','ส่งไม้ต่อให้ถึงเส้นชัย · มี 3 หัวใจ',undefined,'data-go="teamquiz" data-m="relay"')}</div><p class="cap center" style="padding:12px 30px 0">บอทจะอยู่ในกลุ่ม LINE ของห้องเรียน พิมพ์ /quiz เพื่อเริ่มควิซสด — ลองดูหน้าจำลองได้เลย</p>`}
SC.rank=()=>({title:'อันดับ',body:`<div class="large">อันดับ</div><div class="seg" id="sg"><div class="th" style="width:calc(25% - 1.5px);transform:translateX(${rankTab*100}%)"></div>${['ลีก','เพื่อน','กลุ่ม','ห้องต่อห้อง'].map((l,i)=>`<button class="${rankTab===i?'on':''}" data-t="${i}">${l}</button>`).join('')}</div><div id="rb" class="fade-in">${rankBody(rankTab)}</div>${DEMO}`,
 mount(el){const sg=$('#sg',el);$$('button',sg).forEach(b=>b.onclick=()=>{rankTab=+b.dataset.t;vib(6);$$('button',sg).forEach(x=>x.classList.toggle('on',x===b));$('.th',sg).style.transform=`translateX(${rankTab*100}%)`;const rb=$('#rb',el);rb.innerHTML=rankBody(rankTab);rb.classList.remove('fade-in');void rb.offsetWidth;rb.classList.add('fade-in')});
  el.onclick=e=>{const t=e.target.closest('[data-sa]');if(!t)return;if(t.dataset.sa==='simjoin'){S.invited++;save();toast('🎟️ เพื่อนเข้าห้องแล้ว +1');$('#rb',el).innerHTML=rankBody(1)}else if(t.dataset.sa==='cwshare'){const r=classRows(),pos=r.findIndex(x=>x.me)+1;shareSheet('result',{kind:'classwar',text:`ห้องเราอันดับ ${pos} ในสงครามห้องเรียน! มาช่วยกันเรียนแซงห้องอื่น`,sub:'ใครเรียนได้ XP มากที่สุดทั้งห้อง ชนะสัปดาห์นี้',stats:[[pos+'','อันดับห้อง'],[r[pos-1].xp+'','XP รวม']]})}else if(t.dataset.sa==='duelf'){if(gameWords().length<4){toast('เรียนบทที่ 1 ให้จบก่อน แล้วค่อยท้าเพื่อนได้');return}push('duel',{f:FRIENDS[+t.dataset.i]})}}}});

/* ----- เลือกส่งผ่าน LINE (จำลอง) ----- */
/* ----- ห้องเรียนกลุ่ม (จำลอง) ----- */
SC.group=({i}={})=>{const g=GROUPS[i]||GROUPS[0];return {title:g.n,noRefresh:true,body:`<div style="display:flex;align-items:center;justify-content:space-between;padding-right:20px"><div class="large" style="font-size:28px">${g.n}</div><div style="width:84px;height:72px">${M('buddy')}</div></div><p class="cap" style="padding:2px 20px 12px">${g.cnt} คน · หน้าจำลองกลุ่ม LINE ที่มีบอทครู</p>
 <button class="card pad2 press" data-go="play" data-g="boss" style="display:flex;gap:12px;align-items:center;width:calc(100% - 40px);margin:0 20px 14px;text-align:left"><span style="width:76px;height:70px;flex:none">${M('boss')}</span><span style="flex:1"><b style="font-size:16px">บอสหมึกยักษ์มาแล้ว!</b><small style="display:block;color:var(--sub2);font-size:13px;margin:2px 0 6px">บอสประจำสัปดาห์ · ทั้งห้องช่วยกันตี HP ${S.boss.hp>0?S.boss.hp:0}/${S.boss.max}</small><span class="prog" style="display:block"><i style="width:${Math.max(0,S.boss.hp)/S.boss.max*100}%;background:#7B4BC4"></i></span></span></button>
 <div id="gday" style="margin:0 20px 14px"></div><div class="gchat" id="gc"><div class="gm"><span class="av" style="background:#4C72A7">พ</span><div><div class="nm">พี่ต้น</div><div class="b">วันนี้เรียน 你好 แล้ว ใครทวนบ้าง 😄</div></div></div>
 <div class="gm"><span class="av" style="background:#fff;padding:3px">${M('wave')}</span><div><div class="nm">${MASCOT_NAME} (บอทครู)</div><div class="b">พิมพ์ <b>/quiz</b> เพื่อเริ่มควิซสดของห้อง 3 ข้อ</div></div></div></div>
 <div class="pad mt12"><button class="pill sm row1 press" id="qz">พิมพ์ /quiz ในกลุ่ม</button></div><div id="gq" class="mt16"></div>${DEMO}`,
 mount(el){const gc=$('#gc',el),gq=$('#gq',el);const msg=(me,n,h,c='#4C72A7')=>{gc.insertAdjacentHTML('beforeend',`<div class="gm ${me?'me':''}">${me?'':`<span class="av" style="background:${c}">${n[0]}</span>`}<div>${me?'':`<div class="nm">${n}</div>`}<div class="b">${h}</div></div></div>`);gc.scrollTo({top:9e4,behavior:'smooth'})};
  
  function gday(){const pool2=gw4(),done=S.gqDay===today();const goalNow=2400+today()%5*40,have=Math.round(goalNow*.62)+dayXp()*3,pct=Math.min(1,have/goalNow);
   $('#gday',el).innerHTML=`<button class="card pad2 press" data-sa="gq" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left;margin-bottom:10px"><span style="width:56px;height:56px;flex:none">${M(done?'correct':'think')}</span><span style="flex:1"><b>ควิซประจำวันของห้อง</b><small style="display:block;color:var(--sub2);font-size:13px;margin-top:2px">${done?'ตอบแล้ววันนี้ ✓ พรุ่งนี้มีข้อใหม่':'บอทปักหมุดไว้ในกลุ่ม · ตอบข้อเดียว +10 XP'}</small></span><span class="chip" style="height:28px;padding:0 12px;font-size:12.5px">${done?'ดูผล':'ตอบเลย'}</span></button>
   <div class="card pad2"><div style="display:flex;justify-content:space-between;font-size:14px"><b>เป้าหมายห้องวันนี้</b><span class="cap" style="font-weight:600">${have}/${goalNow} XP</span></div><div class="prog mt8"><i style="width:${pct*100}%;background:#06C755"></i></div><div class="cap mt8">${pct>=1?'ทั้งห้องทำสำเร็จ! 🎉':`ทุก XP ที่คุณเรียนช่วยห้อง · เหลืออีก ${goalNow-have} XP`}</div></div>`}
  gday();$('#gday',el).onclick=e=>{if(!e.target.closest('[data-sa=gq]'))return;const pool2=gw4();const w=pool2[(today()*7)%pool2.length],q=makeQ(w,'zh2th',pool2);let answered=S.gqDay===today();
   openSheet(`<div style="padding:0 20px"><div class="cap">ควิซประจำวัน · ${g.n}</div><div class="h2">${answered?'ห้องเราตอบถูก 78% วันนี้':'ตอบข้อเดียวให้ห้อง'}</div><div id="gqq">${qHtml(q)}</div><p class="cap center mt12">สัดส่วนของห้องเป็นตัวเลขจำลอง</p></div>`,{onMount:sh=>{$('#gqq',sh).onclick=ev=>{const o=ev.target.closest('.opt');if(!o||answered)return;answered=true;const ok=+o.dataset.i===q.ans;$$('.opt',sh).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===+o.dataset.i)x.classList.add('bad')});
     S.gqDay=today();save();if(ok){addXp(5);vib(10);confetti(40)}else{addMistake(q.w);vib([25,30,25])}addCoins(5);toast(ok?'ถูกต้อง! +10 XP +5 เหรียญ':'ไม่เป็นไร ได้เหรียญร่วมสนุก +5');$('.h2',sh).textContent=ok?'เยี่ยม! ห้องเราตอบถูก 78%':'ห้องเราตอบถูก 78% — ลองใหม่พรุ่งนี้';setTimeout(gday,300)}}})};
  const pool=gw4();let busy=false;
  $('#qz',el).onclick=()=>{if(busy)return;busy=true;$('#qz',el).disabled=true;vib(8);msg(true,'',' /quiz');setTimeout(()=>msg(false,MASCOT_NAME+' (บอทครู)','เริ่มควิซสด! ตอบเร็วและถูกได้คะแนนมากกว่า 🏁','#C8102E'),500);setTimeout(startQ,1200)};
  function startQ(){const qs=shuffle(pool).slice(0,3).map((w,k)=>makeQ(w,['zh2th','th2zh','zh2th'][k],pool));const mates=FRIENDS.slice(0,4).map(f=>({n:f.n,c:f.c,s:0}));const you={n:'คุณ',c:'#C8102E',s:0};let k=0,lock=false;
   const rk=()=>[...mates,you].sort((a,b)=>b.s-a.s).map((p,x)=>`<div class="lrow ${p===you?'me':''}" style="height:46px"><span class="rk">${x+1}</span><b style="flex:1;font-weight:${p===you?700:500}">${p.n}</b><span class="val" style="font-weight:600;color:var(--ink)">${p.s}</span></div>`).join('');
   const show=()=>{lock=false;gq.innerHTML=`<div class="cap center">ข้อ ${k+1}/3</div>${qHtml(qs[k])}<div class="sec" style="padding-top:20px">อันดับสด</div><div class="group" id="lv">${rk()}</div>`;gq.scrollIntoView({behavior:'smooth',block:'start'})};
   gq.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock)return;lock=true;const q=qs[k],ok=+o.dataset.i===q.ans;$$('.opt',gq).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===+o.dataset.i)x.classList.add('bad')});
    if(ok){you.s+=10;vib(10)}else{addMistake(q.w);vib([25,30,25])}mates.forEach(m=>{if(Math.random()<.65)m.s+=10});$('#lv',gq).innerHTML=rk();
    setTimeout(()=>{k++;if(k<3)show();else done()},900)};
   function done(){const sorted=[...mates,you].sort((a,b)=>b.s-a.s),pos=sorted.indexOf(you)+1;addXp(8);addCoins(10);msg(false,MASCOT_NAME+' (บอทครู)',`จบควิซ! คุณได้อันดับ ${pos} · +15 XP +10 เหรียญ 🎉`,'#C8102E');gq.innerHTML=`<div class="center"><div style="width:140px;height:140px;margin:0 auto" class="pop">${M(pos<=2?'celebrate':'correct')}</div><div class="h2">คุณได้อันดับ ${pos}</div></div><div class="group mt12" style="margin-top:12px">${[...mates,you].sort((a,b)=>b.s-a.s).map((p,x)=>`<div class="lrow ${p===you?'me':''}" style="height:46px"><span class="rk">${x+1}</span><b style="flex:1;font-weight:500">${p.n}</b><span class="val">${p.s}</span></div>`).join('')}</div><div class="pad mt16"><button class="pill sm linebtn row1 press" id="sh2">แชร์อันดับไป LINE</button></div>`;$('#sh2',gq).onclick=()=>shareSheet('result',{kind:'score',text:`ควิซกลุ่ม ${g.n} ได้อันดับ ${pos}`});confetti(60);busy=false;$('#qz',el).disabled=false;$('#qz',el).textContent='เล่นควิซกลุ่มอีกรอบ'}
   show()}}}};

/* ----- แผนและราคา ----- */
const PLANS=[{id:'free',n:'ฟรี',p:'0 ฿',u:'',f:['บทเรียนพื้นฐานทุกบท','เกมวันละ 5 รอบ','อันดับลีกประจำสัปดาห์']},
 {id:'plus',n:'Plus',p:'99 ฿',u:'/เดือน',f:['เกมเล่นได้ไม่จำกัด','ทบทวนอัจฉริยะ','ตั๋วกันสตรีคทุกเดือน'],b:'ยอดนิยม'},
 {id:'buddy',n:'Buddy',p:'159 ฿',u:'/เดือน สำหรับ 2 คน',f:['ทุกอย่างใน Plus','เรียนคู่กับเพื่อนหรือคนในบ้าน','สตรีคคู่ ได้โบนัสเหรียญ']}];
SC.plans=()=>({title:'แผนและราคา',body:`<div class="large">แผนและราคา</div><div class="banner mt12" style="background:#FDF3E6;color:#8A5A12">ตัวอย่างทดลอง · ราคาเป็นตัวอย่าง ยังไม่เปิดชำระเงินจริง</div>
 ${PLANS.map(p=>`<div class="card plan fade-in">${p.b?`<span class="badge">${p.b}</span>`:''}${p.id==='buddy'?`<div style="position:absolute;right:14px;top:10px;width:120px;height:92px">${M('buddy')}</div>`:''}<div class="cap">${p.n}</div><div class="pr">${p.p} <small>${p.u}</small></div><ul>${p.f.map(x=>`<li>${x}</li>`).join('')}</ul><button class="pill sm press ${S.plan===p.id?'ghost':p.id==='free'?'dark':''}" data-pl="${p.id}">${S.plan===p.id?'แผนปัจจุบัน':p.id==='free'?'ใช้แผนฟรี':'เลือก '+p.n}</button></div>`).join('')}${DEMO}`,
 mount(el){$$('[data-pl]',el).forEach(b=>b.onclick=()=>{const id=b.dataset.pl;if(id===S.plan)return;if(id==='free'){S.plan='free';save();refresh();return}
  openSheet(`<div class="center" style="padding:0 24px"><div style="width:130px;height:130px;margin:0 auto">${M('bow')}</div><div class="h2 mt8">ยังไม่เปิดชำระเงิน</div><p style="color:var(--sub2);margin:6px 0 16px;font-size:15px">นี่คือหน้าตัวอย่างทดลอง ไม่มีการตัดเงินจริง ลองสลับแผนเพื่อดูหน้าตาได้เลย</p><button class="pill sm press" id="tp">ลองแผน ${PLANS.find(p=>p.id===id).n} (จำลอง)</button><button class="pill sm ghost press mt12" data-act="closesheet">ไว้ก่อน</button></div>`,{onMount:sh=>$('#tp',sh).onclick=()=>{S.plan=id;save();closeSheet();refresh();toast('สลับเป็นแผน '+PLANS.find(p=>p.id===id).n+' (จำลอง)')}})})}});

/* ----- โปรไฟล์ ----- */
SC.me=()=>{const lv=level(),pr=(S.xp%100);
 return {title:'ฉัน',body:`<div class="large">ฉัน</div>
 <div class="card pad2 mt12 fade-in" style="display:flex;gap:14px;align-items:center"><div style="width:96px;height:96px;border-radius:50%;background:var(--redsoft);overflow:hidden;flex:none;display:flex;align-items:flex-end;justify-content:center">${llama('wave',92,{acc:true,style:'margin-top:8px'})}</div>
  <div style="flex:1;min-width:0"><b style="font-size:20px">${dn()||'ผู้เรียน'}</b><div class="cap">${titleNow()} · เลเวล ${lv} · ${S.xp} XP</div><div class="prog mt8"><i style="width:${pr}%"></i></div><div class="cap mt8">อีก ${100-pr} XP ถึงเลเวล ${lv+1}</div></div></div>
 <div class="stat mt16"><div><b>${curStreak()}</b><small>วันสตรีค</small></div><div><b>${gameWords().length}</b><small>คำที่เรียน</small></div><div><b>${S.coins}</b><small>เหรียญ</small></div></div>
 <div class="sec">ระดับการเรียน</div><div class="group">
  ${ROW(levelBy(curLv()).bg,levelBy(curLv()).em,'ระดับของฉัน: '+levelBy(curLv()).name,levelBy(curLv()).th+(lvInfo(curLv()).complete?'':' · กำลังเพิ่มเนื้อหา'),'<span class="val">เปลี่ยน</span>'+CHEV,'data-go="levels"')}
  ${ROW('#EAF1FB','🧭','ทดสอบวัดระดับ',S.placeRes?'ผลล่าสุด ≈ ระดับ '+S.placeRes.est+' · ทำใหม่ได้':'12–20 ข้อ ไม่บังคับ',undefined,'data-go="placement"')}</div>
 <div class="sec">บัญชีและแผน</div><div class="group">
  ${ROW('#FDECEC','⭐','แผนและราคา','ตัวอย่างทดลอง · ไม่มีการชำระเงิน',`<span class="val">${PLANS.find(p=>p.id===S.plan).n}</span>${CHEV}`,'data-go="plans"')}
  ${ROW('#FDF3E6','🛍️','ร้านค้าเหรียญ','แต่งตัว'+MASCOT_NAME,undefined,'data-go="shop"')}
  ${ROW('#FBEFEA','📝','ทบทวนตามรอบ',reviewWords().length+' คำถึงรอบ',undefined,'data-go="review"')}</div>
 <div class="sec">เครื่องมือการเรียน</div><div class="group">
  ${ROW('#EAF1FB','🏆','อันดับและลีก','ลีกประจำสัปดาห์ · เพื่อน · กลุ่ม',undefined,'data-go="rank"')}
  ${ROW('#FDF3E6','🏅','เหรียญตราและฉายา',badgeN()+'/'+BADGES.length+' เหรียญ · '+titleNow(),undefined,'data-go="badges"')}
  ${ROW('#E7F8EE','🎒','ห้องเรียนของฉัน',CLASSMATES.filter(cmUnlocked).length+'/'+CLASSMATES.length+' ตัวละคร',undefined,'data-go="classroom"')}
  ${ROW('#F2ECFA','🎵','ฝึกวรรณยุกต์สำหรับคนไทย','เทียบกับเสียงสูงต่ำที่เราคุ้นเคย',undefined,'data-go="tones"')}
  ${ROW('#FDF3E6','🧪','ห้องฝึกพิเศษ','นิทาน · เทียบคำ · พูดตาม · ข้อสอบจำลอง',undefined,'data-go="labs"')}
  ${ROW('#E7F8EE','🤖','ถามพี่ลามา (ติวเตอร์จำลอง)','อธิบายคำ · ซ้อมคุย',undefined,'data-go="tutor"')}
  ${ROW('#FDF3E6','🍵','เรียนพร้อมกัน','ห้องอ่านหนังสือจับเวลา',undefined,'data-go="study"')}
  ${ROW('#EAF1FB','📊','สรุปสัปดาห์ของฉัน','การ์ดสรุปไว้แชร์ใน LINE',undefined,'data-go="recap"')}</div>
 <div class="sec">ตั้งค่า</div><div class="group">
  <div class="row"><span class="ic" style="background:#E7F8EE">🔔</span><span class="tx"><b>เตือนให้เรียนทุกวัน</b><small>ผ่าน LINE OA (จำลอง)</small></span><button class="sw ${S.remind?'on':''}" data-sa="remind" aria-label="เตือน"></button></div>
  <button class="row press" data-sa="goal"><span class="ic" style="background:#EAF1FB">🎯</span><span class="tx"><b>เป้าหมายต่อวัน</b><small>แตะเพื่อเปลี่ยน · ≈ ${Math.round(S.goal/3)} นาที</small></span><span class="val">${S.goal} XP</span>${CHEV}</button></div>
 <div class="sec">LINE (ตัวอย่าง)</div><div class="group">
  ${ROW('#E7F8EE','💚','หน้าทางเข้าจาก LINE OA','ดูว่าลิงก์จากริชเมนูเปิดเว็บนี้อย่างไร',undefined,'data-go="lineentry"')}
  ${ROW('#F2ECFA','💌','ชวนเพื่อนทาง LINE','',undefined,'data-go="invite"')}
  ${ROW('#FDF3E6','🔍','อะไรจริง อะไรจำลอง?','สิ่งที่ทำงานจริง / สิ่งที่จำลอง / สิ่งที่ทำได้จริงบน LINE',undefined,'data-go="realnote"')}
  <a class="row press" href="${OA_URL}" target="_blank" rel="noopener"><span class="ic" style="background:#E7F8EE">➕</span><span class="tx"><b>เพิ่มเพื่อนใน LINE</b><small>${BRAND_NAME} (${OA_ID}) · เปิดแอป LINE</small></span>${CHEV}</a></div>
 <div class="sec">ข้อมูลและความเป็นส่วนตัว</div><div class="group">
  <a class="row press" href="privacy.html" target="_blank" rel="noopener"><span class="ic" style="background:#EAF1FB">🔒</span><span class="tx"><b>นโยบายความเป็นส่วนตัว</b><small>ร่างตัวอย่าง · เก็บข้อมูลในเครื่องนี้เท่านั้น</small></span>${CHEV}</a>
  <a class="row press" href="terms.html" target="_blank" rel="noopener"><span class="ic" style="background:#F2ECFA">📄</span><span class="tx"><b>ข้อกำหนดการใช้งาน</b><small>ร่างตัวอย่าง ยังไม่ผ่านการตรวจโดยผู้เชี่ยวชาญกฎหมาย</small></span>${CHEV}</a></div>
 <div class="sec">เครื่องมือเดโม</div><div class="group">
  <button class="row noic press" data-sa="skip"><span class="tx"><b>ข้ามไปวันพรุ่งนี้</b><small>ทดสอบสตรีค/เป้าหมาย (วันที่จำลอง +${S.shift})</small></span></button>
  <button class="row noic press" data-sa="lost"><span class="tx"><b>จำลองสตรีคขาด</b><small>ดูหน้าจอตอนสตรีคหลุด</small></span></button>
  <button class="row noic press" data-sa="all"><span class="tx"><b>จบทุกบทเรียนทันที</b><small>ปลดล็อกคำในเกมทั้งหมด</small></span></button>
  <button class="row noic press" data-sa="coins"><span class="tx"><b>รับ +100 เหรียญ</b></span></button>
  <button class="row noic press" data-sa="reset"><span class="tx"><b style="color:var(--red)">ล้างข้อมูลทั้งหมด</b><small>เริ่มใหม่เหมือนเปิดครั้งแรก</small></span></button></div>${DEMO}`,
 mount(el){el.onclick=e=>{const t=e.target.closest('[data-sa]');if(!t)return;const a=t.dataset.sa;vib(8);
  if(a==='remind'){S.remind=!S.remind;save();t.classList.toggle('on',S.remind)}
  else if(a==='goal'){S.goal=({10:20,20:30,30:50,50:10})[S.goal]||20;save();refresh()}
  else if(a==='skip'){S.shift++;save();toast('ข้ามไปวันถัดไป (จำลอง)');refresh();setTimeout(checkStreakLost,700)}
  else if(a==='lost'){S.streak=7;S.lastDay=today()-4;S.lostShown=-99;S.freezes=0;save();checkStreakLost()}
  else if(a==='all'){UNITS.forEach(u=>{if(!unitDone(u.id)){S.parts.push(u.id);S.stars[u.id]=S.stars[u.id]||2}});save();toast('จบทุกบทแล้ว เกมปลดล็อกครบ');refresh()}
  else if(a==='coins'){addCoins(100);toast('+100 เหรียญ');refresh()}
  else if(a==='reset'){if(!confirm('ล้างข้อมูลทั้งหมดในเครื่องนี้ (ความคืบหน้า เหรียญ สตรีค ข้อมูลฝึกเขียน/ตัวอักษร ข้อมูลหน้าจำลอง LINE รวมถึงไฟล์ออฟไลน์ที่เก็บไว้และ Service Worker)? ย้อนกลับไม่ได้'))return;Object.keys(localStorage).filter(k=>k.indexOf('lama-')===0).forEach(k=>localStorage.removeItem(k));const fin=()=>{location.href=location.pathname};Promise.all([window.caches&&caches.keys?caches.keys().then(ks=>Promise.all(ks.filter(k=>k.indexOf('lama-')===0).map(k=>caches.delete(k)))):0,navigator.serviceWorker&&navigator.serviceWorker.getRegistrations?navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister()))):0].map(p=>Promise.resolve(p).catch(()=>0))).then(fin,fin)}}}}};
document.addEventListener('DOMContentLoaded',boot);
