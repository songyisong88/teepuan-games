/* เหรียญตรา (achievements) + ฉายา — คำนวณจากสถานะที่เก็บในเครื่อง ไม่มีเซิร์ฟเวอร์ */
const lifeOf=k=>(S.life&&S.life[k])||0;
const bestStreakN=()=>Math.max(S.bestStreak||0,S.streak||0);
const starCount=n=>Object.values(S.stars).filter(x=>x>=n).length;
const srsMaster=()=>Object.values(S.srs||{}).filter(x=>x.b>=5).length;
const lvStarted=n=>S.parts.some(id=>{const u=unitBy(id);return u&&u.lv===n});
const chapDone=cid=>{const ls=LESSONS.filter(l=>l.chapter===cid);return ls.length>0&&ls.every(l=>isDone(l.id))};
const BCATS=[['start','เริ่มต้น'],['streak','สตรีค'],['vocab','คำศัพท์'],['skill','ความแม่น'],['game','เกม'],['social','เพื่อนและ LINE'],['league','ลีกและระดับ']];
/* t: [ปัจจุบัน, เป้าหมาย] */
const BADGES=[
 {id:'first',c:'start',em:'🌱',n:'ก้าวแรก',d:'เรียนจบ 1 รอบ',t:()=>[lifeOf('unit'),1]},
 {id:'place',c:'start',em:'🧭',n:'รู้ทางตัวเอง',d:'ทำแบบทดสอบวัดระดับ 1 ครั้ง',t:()=>[S.placeRes?1:0,1]},
 {id:'ear50',c:'start',em:'🎧',n:'หูไว',d:'ฟังเสียงจีน 50 ครั้ง',t:()=>[lifeOf('audio'),50]},
 {id:'tutor5',c:'start',em:'💬',n:'ช่างถาม',d:'ถามติวเตอร์ 5 ข้อ',t:()=>[lifeOf('tutor'),5]},
 {id:'s3',c:'streak',em:'🔥',n:'ไฟเริ่มติด',d:'สตรีค 3 วัน',t:()=>[bestStreakN(),3]},
 {id:'s7',c:'streak',em:'🔥',n:'หนึ่งสัปดาห์เต็ม',d:'สตรีค 7 วัน',t:()=>[bestStreakN(),7]},
 {id:'s14',c:'streak',em:'🔥',n:'สองสัปดาห์ไม่ขาด',d:'สตรีค 14 วัน',t:()=>[bestStreakN(),14]},
 {id:'s30',c:'streak',em:'🏮',n:'เดือนแห่งความตั้งใจ',d:'สตรีค 30 วัน',t:()=>[bestStreakN(),30],big:1},
 {id:'s100',c:'streak',em:'👑',n:'ร้อยวันไม่หยุด',d:'สตรีค 100 วัน',t:()=>[bestStreakN(),100],big:1},
 {id:'w25',c:'vocab',em:'📗',n:'25 คำแรก',d:'เรียนคำศัพท์ครบ 25 คำ',t:()=>[learnedCount(),25]},
 {id:'w50',c:'vocab',em:'📘',n:'50 คำ',d:'เรียนคำศัพท์ครบ 50 คำ',t:()=>[learnedCount(),50]},
 {id:'w100',c:'vocab',em:'📙',n:'ร้อยคำแล้ว',d:'เรียนคำศัพท์ครบ 100 คำ',t:()=>[learnedCount(),100]},
 {id:'w200',c:'vocab',em:'📕',n:'สองร้อยคำ',d:'เรียนคำศัพท์ครบ 200 คำ',t:()=>[learnedCount(),200],big:1},
 {id:'w400',c:'vocab',em:'📚',n:'นักสะสมคำ',d:'เรียนคำศัพท์ครบ 400 คำ',t:()=>[learnedCount(),400],big:1},
 {id:'ch1',c:'vocab',em:'🏫',n:'จบตอนแรก',d:'เรียนจบทุกบทของตอนที่ 1',t:()=>[chapDone(1)?1:0,1]},
 {id:'perf5',c:'skill',em:'⭐',n:'เต็มสามดาว',d:'ได้ 3 ดาว 5 รอบ',t:()=>[starCount(3),5]},
 {id:'qok100',c:'skill',em:'✅',n:'ตอบถูกร้อยข้อ',d:'ตอบถูกสะสม 100 ข้อ',t:()=>[(S.qOk||0),100]},
 {id:'qok500',c:'skill',em:'🎯',n:'แม่นปืน',d:'ตอบถูกสะสม 500 ข้อ',t:()=>[(S.qOk||0),500],big:1},
 {id:'srs10',c:'skill',em:'🧠',n:'ความจำระยะยาว',d:'คำ 10 คำขึ้นถึงกล่องทบทวนสูงสุด',t:()=>[srsMaster(),10],big:1},
 {id:'g10',c:'game',em:'🎮',n:'นักเล่นเกม',d:'เล่นเกมครบ 10 ครั้ง',t:()=>[lifeOf('game'),10]},
 {id:'duel1',c:'game',em:'⚔️',n:'ชนะดวลครั้งแรก',d:'ชนะดวลเพื่อน 1 ครั้ง',t:()=>[S.duelWins,1]},
 {id:'duel10',c:'game',em:'🥇',n:'จอมประลอง',d:'ชนะดวลเพื่อน 10 ครั้ง',t:()=>[S.duelWins,10],big:1},
 {id:'boss1',c:'game',em:'🦑',n:'ผู้ล้มบอส',d:'ช่วยห้องล้มบอสประจำสัปดาห์',t:()=>[S.bossWins,1],big:1},
 {id:'team1',c:'game',em:'🧩',n:'ลูกทีมตัวจริง',d:'ชนะทีมชนทีมหรือวิ่งผลัด 1 ครั้ง',t:()=>[lifeOf('teamwin'),1]},
 {id:'team10',c:'game',em:'🏁',n:'กัปตันทีม',d:'ชนะเกมทีมครบ 10 ครั้ง',t:()=>[lifeOf('teamwin'),10],big:1},
 {id:'stk3',c:'social',em:'🎁',n:'นักสะสมสติกเกอร์',d:'เก็บสติกเกอร์ธีมสัปดาห์ 3 แผ่น',t:()=>[(S.stickers||[]).length,3]},
 {id:'soc5',c:'social',em:'💚',n:'ใจดีมีน้ำใจ',d:'ส่งการ์ดหรือกำลังใจ 5 ครั้ง',t:()=>[lifeOf('social'),5]},
 {id:'inv3',c:'social',em:'🎟️',n:'ตัวแทนห้องเรียน',d:'ชวนเพื่อนเข้าห้อง 3 คน (จำลอง)',t:()=>[S.invited,3]},
 {id:'bud7',c:'social',em:'🤝',n:'คู่หูสตรีค',d:'สตรีคบัดดี้ 7 วัน (จำลอง)',t:()=>[S.buddy?buddyStreak():0,7]},
 {id:'cm6',c:'social',em:'🎒',n:'เพื่อนเต็มห้อง',d:'ปลดล็อกเพื่อนร่วมห้อง 6 ตัว',t:()=>[CLASSMATES.filter(cmUnlocked).length,6],big:1},
 {id:'lg2',c:'league',em:'🥈',n:'ขึ้นลีกเงิน',d:'เลื่อนไปลีกเงิน (จำลอง)',t:()=>[lgTier(),1]},
 {id:'lg4',c:'league',em:'💠',n:'ลีกแซฟไฟร์',d:'เลื่อนไปลีกแซฟไฟร์ (จำลอง)',t:()=>[lgTier(),3],big:1},
 {id:'lv2',c:'league',em:'🌿',n:'ก้าวสู่ระดับ 2',d:'เริ่มเรียนระดับ 2',t:()=>[lvStarted(2)?1:0,1]},
 {id:'lv3',c:'league',em:'🌳',n:'ก้าวสู่ระดับ 3',d:'เริ่มเรียนระดับ 3',t:()=>[lvStarted(3)?1:0,1],big:1}];
const badgeBy=id=>BADGES.find(b=>b.id===id);
const badgeGot=id=>!!(S.badges&&S.badges[id]);
const badgeN=()=>BADGES.filter(b=>badgeGot(b.id)).length;
const TITLES=[[0,'ลูกศิษย์หน้าใหม่'],[10,'นักฝึกพินอิน'],[30,'นักสะสมคำ'],[70,'นักเล่าเรื่องจีน'],[130,'ศิษย์เอกลามา'],[220,'จอมคำศัพท์'],[400,'ปรมาจารย์ลามา']];
const titleNow=()=>{const n=learnedCount();let t=TITLES[0];TITLES.forEach(x=>{if(n>=x[0])t=x});return t[1]};
const titleNext=()=>{const n=learnedCount();return TITLES.find(x=>x[0]>n)};
function badgeCheck(){if(!S.badges)S.badges={};const fresh=[];
 BADGES.forEach(b=>{if(S.badges[b.id])return;const [c,g]=b.t();if(c>=g){S.badges[b.id]=today();fresh.push(b)}});
 if(!fresh.length)return;fresh.forEach(b=>{S.coins+=b.big?25:10;S.coinsEarned+=b.big?25:10});save();bumpChips();
 const top=stack[stack.length-1],ok=top&&['home','complete','result','me','rank','badges','games','path','rad','know'].includes(top.name);
 if(ok&&!$('.sheet')){const b=fresh[0];
  openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:150px;height:150px;margin:0 auto">${M(b.big?'trophy':'celebrate')}</div>
   <div class="cap" style="color:var(--red);font-weight:700">ได้เหรียญตราใหม่${fresh.length>1?` (+อีก ${fresh.length-1})`:''}</div>
   <div class="h2">${b.em} ${b.n}</div><p style="color:var(--sub2);margin:6px 0 4px;font-size:15px">${b.d}</p><p style="font-size:15px;font-weight:600;margin:0 0 14px">รางวัล +${b.big?25:10} 🪙</p>
   <div style="display:flex;gap:10px;justify-content:center"><button class="pill sm ghost press" id="bsh" style="flex:1">แชร์ลง LINE</button><button class="pill sm press" data-act="closesheet" style="flex:1">เยี่ยม!</button></div></div>`,
   {onMount:sh=>{$('#bsh',sh).onclick=()=>{closeSheet(true);shareSheet('badge',{b})}},onClose:()=>{confetti(60);refresh()}})}
 else toast(`🏅 ได้เหรียญตรา: ${fresh[0].n}${fresh.length>1?` และอีก ${fresh.length-1}`:''}`)}
let _bt=0;function badgeSoon(){clearTimeout(_bt);_bt=setTimeout(()=>{try{badgeCheck()}catch(e){console.error(e)}},1500)}
function badgeTile(b){const got=badgeGot(b.id),[c,g]=b.t(),p=Math.min(1,c/g);
 return `<button class="bdg press ${got?'on':''}" data-go="badge" data-id="${b.id}" aria-label="${b.n} ${got?'ได้แล้ว':'ยังไม่ได้ '+Math.min(c,g)+'/'+g}"><span class="be">${b.em}</span><b>${b.n}</b>${got?'<small>ได้แล้ว ✓</small>':`<span class="prog" style="height:4px;margin:6px 8px 0"><i style="width:${p*100}%"></i></span><small>${Math.min(c,g)}/${g}</small>`}</button>`}
SC.badges=()=>{const nx=titleNext(),n=learnedCount();
 return {title:'เหรียญตรา',body:`<div class="large">เหรียญตรา</div><p class="cap" style="padding:2px 20px 0">ได้แล้ว ${badgeN()}/${BADGES.length} เหรียญ · ปลดล็อกจากสิ่งที่คุณทำจริง</p>
 <div class="card pad2 mt12" style="display:flex;gap:14px;align-items:center"><div style="width:84px;height:84px;flex:none">${M('student')}</div><div style="flex:1"><div class="cap">ฉายาของคุณตอนนี้</div><b style="font-size:19px">${titleNow()}</b>${nx?`<div class="prog mt8"><i style="width:${Math.min(100,n/nx[0]*100)}%"></i></div><div class="cap mt8">อีก ${nx[0]-n} คำ ได้ฉายา “${nx[1]}”</div>`:'<div class="cap mt8">ฉายาสูงสุดแล้ว!</div>'}</div></div>
 ${BCATS.map(([k,t])=>`<div class="sec">${t}</div><div class="bdgrid">${BADGES.filter(b=>b.c===k).map(badgeTile).join('')}</div>`).join('')}
 <p class="cap center" style="padding:16px 30px 0">เหรียญตราเก็บในเครื่องนี้ (ตัวอย่างทดลอง) · เหรียญที่เกี่ยวกับเพื่อน/ลีก/ชวนเพื่อนใช้ข้อมูลจำลอง</p>`}};
window.GOX=window.GOX||{};
GOX.badges=()=>push('badges');
GOX.badge=el=>{const b=badgeBy(el.dataset.id),got=badgeGot(b.id),[c,g]=b.t();
 openSheet(`<div class="center" style="padding:0 24px"><div style="font-size:64px;line-height:1;filter:${got?'none':'grayscale(1) opacity(.4)'}">${b.em}</div><div class="h2 mt8">${b.n}</div><p style="color:var(--sub2);margin:6px 0 10px;font-size:15px">${b.d}</p>
  ${got?`<p style="font-weight:600;color:var(--ok);margin:0 0 14px">ได้แล้ว ✓</p><button class="pill sm ghost press" id="bsh">แชร์ลง LINE</button>`:`<div class="prog" style="margin:0 40px 8px"><i style="width:${Math.min(1,c/g)*100}%"></i></div><p class="cap">${Math.min(c,g)}/${g} · รางวัลเมื่อได้ +${b.big?25:10} 🪙</p><button class="pill sm press mt12" data-act="closesheet">สู้ต่อ!</button>`}</div>`,
  {onMount:sh=>{const s=$('#bsh',sh);if(s)s.onclick=()=>{closeSheet(true);shareSheet('badge',{b})}}})};
