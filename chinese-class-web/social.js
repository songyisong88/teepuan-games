/* สังคม (จำลอง LINE): อันดับ กลุ่ม แชร์ แผน โปรไฟล์ */
const AVC=['#C9774A','#5E9B7A','#5B86C4','#9568B5','#D1647A','#27211E'];
const avatar=(n,c)=>`<span class="av" style="background:${c}">${n.replace('พี่','').replace('น้อง','')[0]}</span>`;
let rankTab=0;
function leagueRows(){const me=['คุณ',weekXp()];const all=[...LEAGUE,me].sort((a,b)=>b[1]-a[1]);let o='';
 all.forEach((p,i)=>{if(i===0)o+=`<div class="zone">▲ 5 อันดับแรกเลื่อนขึ้นลีกถัดไป</div>`;if(i===all.length-3)o+=`<div class="zone d">▼ 3 อันดับสุดท้ายตกลีก</div>`;
  const isMe=p===me;o+=`<div class="lrow ${isMe?'me':''}"><span class="rk">${i+1}</span>${isMe?`<span class="av" style="background:var(--red)">ฉ</span>`:avatar(p[0],AVC[(p[0].charCodeAt(0))%6])}<span style="flex:1;font-weight:${isMe?700:500}">${p[0]}${isMe?' (คุณ)':''}</span><span class="val" style="font-weight:600;color:var(--ink)">${p[1]} XP</span></div>`});return o}
function rankBody(t){
 if(t===0)return `<div class="card pad2 mt16" style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div style="flex:1"><div class="cap">ลีกบรอนซ์ · เหลืออีก 3 วัน</div><b style="font-size:18px">XP ของคุณสัปดาห์นี้ ${weekXp()}</b><div class="cap mt8">ได้ XP จากบทเรียนและเกมเพื่อไต่อันดับ</div></div><div style="width:96px;height:96px;flex:none">${M('trophy')}</div></div><div class="group">${leagueRows()}</div><p class="cap center" style="padding:12px 30px 0">คู่แข่งในลีกเป็นข้อมูลสมมติ (ตัวอย่างทดลอง)</p>`;
 if(t===1)return `<div class="card pad2 mt16" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="cap">รหัสชวนของฉัน</div><b style="font-size:22px;letter-spacing:1px">${S.inviteCode}</b></div><div style="width:70px;height:70px">${M('bow')}</div></div>
   <div class="prog mt12"><i style="width:${Math.min(1,S.invited/3)*100}%"></i></div><div class="cap mt8">เพื่อนเข้าห้องแล้ว ${S.invited}/3 คน · ครบ 3 คนได้ตั๋วกันสตรีค 🎟️</div>
   <button class="pill sm linebtn row1 press mt12" data-go="invite">ชวนเพื่อนทาง LINE (จำลอง)</button><button class="cap press mt12" style="width:100%;color:var(--sub2)" data-sa="simjoin">จำลองเพื่อนกดลิงก์เข้ามา</button></div>
   <div class="group">${FRIENDS.map((f,i)=>`<div class="row"><span class="av" style="background:${f.c}">${f.n.replace('พี่','').replace('น้อง','')[0]}</span><span class="tx"><b>${f.n}</b><small>🔥 ${f.s} วัน</small></span><button class="chip press" style="height:30px;font-size:13px" data-sa="duelf" data-i="${i}">ท้า ⚔️</button></div>`).join('')}</div>`;
 return `<div class="group mt16">${GROUPS.map((g,i)=>ROW('#fff','💬',g.n,g.cnt+' คน · ห้องเรียนในไลน์ (จำลอง)',undefined,`data-go="group" data-i="${i}"`).replace('class="ic" style="background:#fff"','class="ic" style="background:#E7F8EE"')).join('')}</div><p class="cap center" style="padding:12px 30px 0">บอทจะอยู่ในกลุ่ม LINE ของห้องเรียน พิมพ์ /quiz เพื่อเริ่มควิซสด — ลองดูหน้าจำลองได้เลย</p>`}
SC.rank=()=>({title:'อันดับ',body:`<div class="large">อันดับ</div><div class="seg" id="sg"><div class="th" style="width:calc(33.33% - 2px);transform:translateX(${rankTab*100}%)"></div>${['ลีกสัปดาห์','เพื่อน','กลุ่ม'].map((l,i)=>`<button class="${rankTab===i?'on':''}" data-t="${i}">${l}</button>`).join('')}</div><div id="rb" class="fade-in">${rankBody(rankTab)}</div>${DEMO}`,
 mount(el){const sg=$('#sg',el);$$('button',sg).forEach(b=>b.onclick=()=>{rankTab=+b.dataset.t;vib(6);$$('button',sg).forEach(x=>x.classList.toggle('on',x===b));$('.th',sg).style.transform=`translateX(${rankTab*100}%)`;const rb=$('#rb',el);rb.innerHTML=rankBody(rankTab);rb.classList.remove('fade-in');void rb.offsetWidth;rb.classList.add('fade-in')});
  el.onclick=e=>{const t=e.target.closest('[data-sa]');if(!t)return;if(t.dataset.sa==='simjoin'){S.invited++;save();toast('🎟️ เพื่อนเข้าห้องแล้ว +1');$('#rb',el).innerHTML=rankBody(1)}else if(t.dataset.sa==='duelf'){if(gameWords().length<4){toast('เรียนบทที่ 1 ให้จบก่อน แล้วค่อยท้าเพื่อนได้');return}push('duel',{f:FRIENDS[+t.dataset.i]})}}}});

/* ----- เลือกส่งผ่าน LINE (จำลอง) ----- */
function shareSheet(kind,data={}){const cards={
 invite:{t:'ชวนมาเรียนจีนด้วยกัน!',s:`ใช้รหัส ${S.inviteCode} ได้ตั๋วกันสตรีคทั้งคู่`,m:'wave',cta:'เข้าร่วม'},
 challenge:{t:'ท้าดวลศัพท์จีนกับฉัน!',s:`ฉันสตรีค ${curStreak()} วันแล้ว ลองชนะฉันดูสิ`,m:'teach',cta:'รับคำท้า'},
 result:{t:data.kind==='lose'?'แพ้นิดเดียว ขอล้างตา!':data.kind==='win'?'ฉันชนะดวลศัพท์จีน!':'ผลเกมศัพท์จีนของฉัน',s:data.text||'',m:data.kind==='lose'?'wrong':'celebrate',cta:'ลองเล่น'}}[kind];
 const rows=[...FRIENDS.map(f=>({n:f.n,c:f.c,sub:'เพื่อน'})),...GROUPS.map(g=>({n:g.n,c:g.c,sub:g.cnt+' คน · กลุ่ม'}))];
 openSheet(`<div style="padding:0 20px 0"><div class="h2" style="text-align:center">ส่งไปที่ LINE</div><p class="cap center">หน้าจำลอง ไม่ได้ส่งถึงใครจริง</p></div>
 <div class="sharecard mt8"><div class="sc-top"><div style="flex:1;padding-bottom:14px"><small>${BRAND_NAME}</small><b>${cards.t}</b><small>${cards.s}</small></div><div style="width:100px;height:112px;flex:none">${M(cards.m)}</div></div><div class="sc-bot"><span>${cards.cta}</span><div>line.me/…/lama-demo</div></div></div>
 <div class="search mt12">🔍 <span>ค้นหาเพื่อนหรือกลุ่ม</span></div>
 <div class="group" style="margin-top:4px">${rows.map((r,i)=>`<button class="pickrow" data-p="${i}">${avatar(r.n,r.c)}<span style="flex:1"><b style="font-weight:600">${r.n}</b><br><small class="cap">${r.sub}</small></span><span class="ck">${CHECK}</span></button>`).join('')}</div>
 <div style="padding:16px 20px 0"><button class="pill row1 linebtn press" id="snd" disabled>ส่ง</button></div>`,
 {onMount:sh=>{const sel=new Set();const b=$('#snd',sh);$$('[data-p]',sh).forEach(r=>r.onclick=()=>{const i=+r.dataset.p;sel.has(i)?sel.delete(i):sel.add(i);r.classList.toggle('on');vib(6);b.disabled=!sel.size;b.textContent=sel.size?`ส่ง (${sel.size})`:'ส่ง'});
  b.onclick=()=>{const n=sel.size;closeSheet();vib([15,30,15]);toast(`✓ ส่งแล้ว ${n} ห้อง (จำลอง)`);if(kind==='invite'){S.invited+=n;save();setTimeout(()=>toast('🎟️ มีเพื่อนกดลิงก์เข้ามาแล้ว! (จำลอง)'),2600)}}}})}

/* ----- ห้องเรียนกลุ่ม (จำลอง) ----- */
SC.group=({i})=>{const g=GROUPS[i];return {title:g.n,noRefresh:true,body:`<div style="display:flex;align-items:center;justify-content:space-between;padding-right:20px"><div class="large" style="font-size:28px">${g.n}</div><div style="width:84px;height:72px">${M('buddy')}</div></div><p class="cap" style="padding:2px 20px 12px">${g.cnt} คน · หน้าจำลองกลุ่ม LINE ที่มีบอทครู</p>
 <button class="card pad2 press" data-go="play" data-g="boss" style="display:flex;gap:12px;align-items:center;width:calc(100% - 40px);margin:0 20px 14px;text-align:left"><span style="width:76px;height:70px;flex:none">${M('boss')}</span><span style="flex:1"><b style="font-size:16px">บอสหมึกยักษ์มาแล้ว!</b><small style="display:block;color:var(--sub2);font-size:13px;margin:2px 0 6px">ทั้งห้องช่วยกันตี HP ${S.boss.hp>0?S.boss.hp:0}/${S.boss.max}</small><span class="prog" style="display:block"><i style="width:${Math.max(0,S.boss.hp)/S.boss.max*100}%;background:#7B4BC4"></i></span></span></button>
 <div class="gchat" id="gc"><div class="gm"><span class="av" style="background:#5B86C4">พ</span><div><div class="nm">พี่ต้น</div><div class="b">วันนี้เรียน 你好 แล้ว ใครทวนบ้าง 😄</div></div></div>
 <div class="gm"><span class="av" style="background:#fff;padding:3px">${M('wave')}</span><div><div class="nm">${MASCOT_NAME} (บอทครู)</div><div class="b">พิมพ์ <b>/quiz</b> เพื่อเริ่มควิซสดของห้อง 3 ข้อ</div></div></div></div>
 <div class="pad mt12"><button class="pill sm row1 press" id="qz">พิมพ์ /quiz ในกลุ่ม</button></div><div id="gq" class="mt16"></div>${DEMO}`,
 mount(el){const gc=$('#gc',el),gq=$('#gq',el);const msg=(me,n,h,c='#5B86C4')=>{gc.insertAdjacentHTML('beforeend',`<div class="gm ${me?'me':''}">${me?'':`<span class="av" style="background:${c}">${n[0]}</span>`}<div>${me?'':`<div class="nm">${n}</div>`}<div class="b">${h}</div></div></div>`);gc.scrollTo({top:9e4,behavior:'smooth'})};
  const pool=gameWords().length>=4?gameWords():ALLW;let busy=false;
  $('#qz',el).onclick=()=>{if(busy)return;busy=true;$('#qz',el).disabled=true;vib(8);msg(true,'',' /quiz');setTimeout(()=>msg(false,MASCOT_NAME+' (บอทครู)','เริ่มควิซสด! ตอบเร็วและถูกได้คะแนนมากกว่า 🏁','#C8102E'),500);setTimeout(startQ,1200)};
  function startQ(){const qs=shuffle(pool).slice(0,3).map((w,k)=>makeQ(w,['zh2th','th2zh','zh2th'][k],pool));const mates=FRIENDS.slice(0,4).map(f=>({n:f.n,c:f.c,s:0}));const you={n:'คุณ',c:'#C8102E',s:0};let k=0,lock=false;
   const rk=()=>[...mates,you].sort((a,b)=>b.s-a.s).map((p,x)=>`<div class="lrow ${p===you?'me':''}" style="height:46px"><span class="rk">${x+1}</span><b style="flex:1;font-weight:${p===you?700:500}">${p.n}</b><span class="val" style="font-weight:600;color:var(--ink)">${p.s}</span></div>`).join('');
   const show=()=>{lock=false;gq.innerHTML=`<div class="cap center">ข้อ ${k+1}/3</div>${qHtml(qs[k])}<div class="sec" style="padding-top:20px">อันดับสด</div><div class="group" id="lv">${rk()}</div>`;gq.scrollIntoView({behavior:'smooth',block:'start'})};
   gq.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock)return;lock=true;const q=qs[k],ok=+o.dataset.i===q.ans;$$('.opt',gq).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===+o.dataset.i)x.classList.add('bad')});
    if(ok){you.s+=10;vib(10)}else{addMistake(q.w);vib([25,30,25])}mates.forEach(m=>{if(Math.random()<.65)m.s+=10});$('#lv',gq).innerHTML=rk();
    setTimeout(()=>{k++;if(k<3)show();else done()},900)};
   function done(){const sorted=[...mates,you].sort((a,b)=>b.s-a.s),pos=sorted.indexOf(you)+1;addXp(15);addCoins(10);msg(false,MASCOT_NAME+' (บอทครู)',`จบควิซ! คุณได้อันดับ ${pos} · +15 XP +10 เหรียญ 🎉`,'#C8102E');gq.innerHTML=`<div class="center"><div style="width:140px;height:140px;margin:0 auto" class="pop">${M(pos<=2?'celebrate':'correct')}</div><div class="h2">คุณได้อันดับ ${pos}</div></div><div class="group mt12" style="margin-top:12px">${[...mates,you].sort((a,b)=>b.s-a.s).map((p,x)=>`<div class="lrow ${p===you?'me':''}" style="height:46px"><span class="rk">${x+1}</span><b style="flex:1;font-weight:500">${p.n}</b><span class="val">${p.s}</span></div>`).join('')}</div><div class="pad mt16"><button class="pill sm linebtn row1 press" id="sh2">แชร์อันดับไป LINE</button></div>`;$('#sh2',gq).onclick=()=>shareSheet('result',{kind:'score',text:`ควิซกลุ่ม ${g.n} ได้อันดับ ${pos}`});confetti(60);busy=false;$('#qz',el).disabled=false;$('#qz',el).textContent='เล่นควิซกลุ่มอีกรอบ'}
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
  <div style="flex:1;min-width:0"><b style="font-size:20px">${S.name}</b><div class="cap">เลเวล ${lv} · ${S.xp} XP</div><div class="prog mt8"><i style="width:${pr}%"></i></div><div class="cap mt8">อีก ${100-pr} XP ถึงเลเวล ${lv+1}</div></div></div>
 <div class="stat mt16"><div><b>${curStreak()}</b><small>วันสตรีค</small></div><div><b>${gameWords().length}</b><small>คำที่เรียน</small></div><div><b>${S.coins}</b><small>เหรียญ</small></div></div>
 <div class="sec">บัญชีและแผน</div><div class="group">
  ${ROW('#FDECEC','⭐','แผนและราคา','ตัวอย่างทดลอง · ไม่มีการชำระเงิน',`<span class="val">${PLANS.find(p=>p.id===S.plan).n}</span>${CHEV}`,'data-go="plans"')}
  ${ROW('#FDF3E6','🛍️','ร้านค้าเหรียญ','แต่งตัว'+MASCOT_NAME,undefined,'data-go="shop"')}
  ${ROW('#FBEFEA','📝','ทบทวนข้อผิด',Object.keys(S.mistakes).length+' คำ',undefined,'data-go="review"')}</div>
 <div class="sec">ตั้งค่า</div><div class="group">
  <div class="row"><span class="ic" style="background:#E7F8EE">🔔</span><span class="tx"><b>เตือนให้เรียนทุกวัน</b><small>ผ่าน LINE OA (จำลอง)</small></span><button class="sw ${S.remind?'on':''}" data-sa="remind" aria-label="เตือน"></button></div>
  <button class="row press" data-sa="goal"><span class="ic" style="background:#EAF1FB">🎯</span><span class="tx"><b>เป้าหมายต่อวัน</b><small>แตะเพื่อเปลี่ยน</small></span><span class="val">${S.goal} XP</span>${CHEV}</button></div>
 <div class="sec">LINE (ตัวอย่าง)</div><div class="group">
  ${ROW('#E7F8EE','💚','หน้าทางเข้าจาก LINE OA','ดูว่าลิงก์จากริชเมนูเปิดเว็บนี้อย่างไร',undefined,'data-go="lineentry"')}
  ${ROW('#F2ECFA','💌','ชวนเพื่อนทาง LINE','',undefined,'data-go="invite"')}</div>
 <div class="sec">เครื่องมือเดโม</div><div class="group">
  <button class="row noic press" data-sa="skip"><span class="tx"><b>ข้ามไปวันพรุ่งนี้</b><small>ทดสอบสตรีค/เป้าหมาย (วันที่จำลอง +${S.shift})</small></span></button>
  <button class="row noic press" data-sa="lost"><span class="tx"><b>จำลองสตรีคขาด</b><small>ดูหน้าจอตอนสตรีคหลุด</small></span></button>
  <button class="row noic press" data-sa="all"><span class="tx"><b>จบทุกบทเรียนทันที</b><small>ปลดล็อกคำในเกมทั้งหมด</small></span></button>
  <button class="row noic press" data-sa="coins"><span class="tx"><b>รับ +100 เหรียญ</b></span></button>
  <button class="row noic press" data-sa="reset"><span class="tx"><b style="color:var(--red)">ล้างข้อมูลทั้งหมด</b><small>เริ่มใหม่เหมือนเปิดครั้งแรก</small></span></button></div>${DEMO}`,
 mount(el){el.onclick=e=>{const t=e.target.closest('[data-sa]');if(!t)return;const a=t.dataset.sa;vib(8);
  if(a==='remind'){S.remind=!S.remind;save();t.classList.toggle('on',S.remind)}
  else if(a==='goal'){S.goal=S.goal>=30?10:S.goal+10;save();refresh()}
  else if(a==='skip'){S.shift++;save();toast('ข้ามไปวันถัดไป (จำลอง)');refresh();setTimeout(checkStreakLost,700)}
  else if(a==='lost'){S.streak=7;S.lastDay=today()-3;S.lostShown=-99;save();checkStreakLost()}
  else if(a==='all'){LESSONS.forEach(l=>{if(!isDone(l.id))S.done.push(l.id)});save();toast('จบทุกบทแล้ว เกมปลดล็อกครบ');refresh()}
  else if(a==='coins'){addCoins(100);toast('+100 เหรียญ');refresh()}
  else if(a==='reset'){localStorage.removeItem(KEY);location.href=location.pathname}}}}};
document.addEventListener('DOMContentLoaded',boot);
