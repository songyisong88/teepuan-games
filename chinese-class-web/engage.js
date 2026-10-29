/* ระบบดึงให้กลับมาเรียน: ภารกิจ · กิจกรรมประจำวัน · ตั๋วกันสตรีค · บัดดี้สตรีค · ของขวัญกลับมา · หน้าหลัก */
/* ----- ตัวนับรายวัน ----- */
function bumpCnt(k,n=1){if(!S.life)S.life={};S.life[k]=(S.life[k]||0)+n;if(S.cnt.day!==today())S.cnt={day:today()};S.cnt[k]=(S.cnt[k]||0)+n;if(k!=='audio'||S.cnt[k]%5===0)save()}
const cntOf=k=>S.cnt.day===today()?(S.cnt[k]||0):0;

/* ----- ภารกิจประจำวัน (หมุนเวียนวันละ 3 ข้อ) ----- */
const MIS=[{id:'unit',t:'เรียนจบ 1 รอบ',k:'unit',n:1,pw:'课本',em:'📖'},{id:'q',t:'ตอบถูก 10 ข้อ',k:'qok',n:10,em:'✅'},{id:'game',t:'เล่นเกม 1 ครั้ง',k:'game',n:1,pw:'游戏',em:'🎮'},{id:'ear',t:'ฟังเสียงจีน 12 ครั้ง',k:'audio',n:12,pw:'耳机',em:'🎧'},{id:'q2',t:'ตอบถูก 20 ข้อ',k:'qok',n:20,em:'🎯'},{id:'soc',t:'ท้าเพื่อนหรือส่งกำลังใจ 1 ครั้ง',k:'social',n:1,pw:'朋友',em:'💚'},{id:'tut',t:'ถามติวเตอร์ 1 คำถาม',k:'tutor',n:1,pw:'老师',em:'💬'},{id:'pic',t:'ตอบถูกข้อดูรูป 5 ข้อ',k:'pic',n:5,em:'🖼️'}];
/* เป้าภารกิจปรับตามระดับ: ระดับสูงขึ้น ต้องตอบ/ฟังมากขึ้น (+15% ต่อระดับ) */
const misScale=m=>{if(m.k!=='qok'&&m.k!=='audio')return m;const n=Math.round(m.n*(1+.15*(curLv()-1)));return Object.assign({},m,{n,t:m.t.replace(/\d+/,n)})};
const misIc=m=>m.pw&&typeof picHas==='function'&&picHas({zh:m.pw})?art('word',m.pw,m.em,'mis-pic'):m.em;
const todayMis=()=>{const t=today();return [0,2,4].map(o=>misScale(MIS[(t+o)%MIS.length]))};
function misState(){if(S.mis.day!==today())S.mis={day:today(),got:[]};return S.mis}
function missionsHtml(){const ms=misState(),list=todayMis(),all=list.every(m=>ms.got.includes(m.id));const nGot=ms.got.length;
 return `<div class="sec" style="display:flex;justify-content:space-between;align-items:center">ภารกิจวันนี้<span class="cap" style="font-weight:600">${nGot}/3 ${all?'· รับโบนัสแล้ว ✓':'· ครบสามได้ +25 เหรียญ'}</span></div><div class="group">${list.map(m=>{const c=Math.min(m.n,cntOf(m.k)),done=c>=m.n,got=ms.got.includes(m.id);
  return `<div class="row noic mis" style="min-height:64px"><span class="mem">${misIc(m)}</span><span class="tx"><b style="font-weight:500">${m.t}</b><div class="prog" style="height:5px;margin-top:7px"><i style="width:${c/m.n*100}%"></i></div></span>${got?'<span class="val" style="color:var(--ok);font-weight:600">✓ รับแล้ว</span>':done?`<button class="chip coin press" style="margin-left:10px" data-go="mclaim" data-id="${m.id}">รับ 🪙10</button>`:`<span class="val" style="margin-left:10px">${c}/${m.n}</span>`}</div>`}).join('')}</div>`}
function missionClaim(id){const ms=misState();if(ms.got.includes(id))return;ms.got.push(id);addCoins(10,true);vib([15,30]);let bonus=todayMis().every(m=>ms.got.includes(m.id));if(bonus){addCoins(25,true);confetti(80);toast('ครบทั้ง 3 ภารกิจ โบนัส +25 เหรียญ')}else toast('+10 เหรียญ');save();refresh()}

/* ----- กิจกรรมประจำวัน (สุ่มตามวัน เปิดแล้วจึงมีผล) ----- */
const EVENTS=[
 {id:'lantern',em:'🏮',n:'วันโคมไฟ',d:'XP ทุกอย่างที่ได้วันนี้ ×2',pose:'lantern',say:'โคมไฟสว่างแล้ว เรียนวันนี้ได้ XP สองเท่า'},
 {id:'tea',em:'🍵',n:'วันจิบน้ำชา',d:'เหรียญที่ได้วันนี้ ×1.5',pose:'tea',say:'จิบชาก่อนเรียน วันนี้ได้เหรียญเพิ่มครึ่งหนึ่ง'},
 {id:'visit',em:'🎁',n:'เพื่อนแวะมาเยี่ยม',d:'เพื่อนร่วมห้องฝากของมาให้',pose:'gift',say:'มีของฝากจากเพื่อนมาถึงแล้ว',claim:1},
 {id:'mystery',em:'❓',n:'กล่องปริศนา',d:'เปิดดูว่าวันนี้ได้อะไร (20–60 เหรียญ)',pose:'shock',say:'เอ๊ะ มีกล่องแปลก ๆ วางอยู่หน้าห้อง',claim:1},
 {id:'duelday',em:'⚔️',n:'วันประลอง',d:'ชนะดวลเพื่อนวันนี้ รับโบนัส +30 เหรียญ',pose:'duel',say:'วันนี้ฟ้าสวย เหมาะกับการประลอง'},
 {id:'plum',em:'🌸',n:'วันดอกบ๊วย',d:'ดอกบ๊วยบานแล้ว รับตั๋วกันสตรีคฟรี 1 ใบ',pose:'plum',say:'ดอกบ๊วยบานกลางฤดูหนาว เหมือนคนที่ไม่ยอมแพ้',claim:1},
 {id:'easy',em:'🌤️',n:'วันสบาย ๆ',d:'เป้าหมายวันนี้ลดเหลือ 10 XP',pose:'tea',say:'วันนี้ไม่ต้องหักโหม เป้าหมายเบา ๆ ก็พอ'}];
const evToday=()=>EVENTS[today()%EVENTS.length];
const evOn=id=>S.evDay===today()&&evToday().id===id;
const evX=n=>evOn('lantern')?n*2:n;
const evC=n=>evOn('tea')?Math.round(n*1.5):n;
const goalNow=()=>evOn('easy')?Math.min(10,S.goal):S.goal;
const eventXpNote=()=>evOn('lantern')?'วันโคมไฟ: XP คูณสองรวมในผลนี้แล้ว':evOn('tea')?'วันจิบน้ำชา: เหรียญคูณ 1.5 รวมในผลนี้แล้ว':'';
function eventCard(){const e=evToday(),open=S.evDay===today();
 return `<button class="card evcard press fade-in" data-go="event" style="animation-delay:.04s"><span class="eimg">${M(open?e.pose:'gift')}</span><span class="etx">${open?`<span class="cap" style="color:var(--red);font-weight:700">กิจกรรมวันนี้</span><b>${e.em} ${e.n}</b><small>${e.d}${e.claim&&S.evGot!==today()?' · <u>แตะรับ</u>':''}</small>`:`<span class="cap" style="color:var(--red);font-weight:700">เซอร์ไพรส์ประจำวัน</span><b>มีของพิเศษรออยู่</b><small>แตะเพื่อเปิดดูว่าวันนี้เป็นวันอะไร</small>`}</span></button>`}
function eventOpen(){const e=evToday();S.evDay=today();save();
 const can=e.claim&&S.evGot!==today();
 openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M(e.pose)}</div><div class="cap" style="color:var(--red);font-weight:700">กิจกรรมวันนี้</div><div class="h2">${e.em} ${e.n}</div><p style="color:var(--sub2);margin:6px 0 4px;font-size:15px">“${e.say}”</p><p style="font-size:15px;font-weight:600;margin:0 0 16px">${e.d}</p>
  ${can?`<button class="pill sm press" id="ev">${e.id==='visit'?'รับของฝาก':e.id==='plum'?'เก็บดอกบ๊วย':'เปิดกล่อง'}</button>`:`<button class="pill sm press" data-act="closesheet">เริ่มเรียนเลย</button>`}<p class="cap mt12">กิจกรรมเปลี่ยนทุกวัน — กลับมาดูพรุ่งนี้ว่าจะเป็นอะไร</p></div>`,
  {onMount:sh=>{const b=$('#ev',sh);if(b)b.onclick=()=>{let c=e.id==='visit'?25:e.id==='plum'?15:20+(Math.random()*41|0);if(e.id==='plum')S.freezes=Math.min(2,S.freezes+1);S.evGot=today();addCoins(c,true);save();vib([20,30,20]);confetti(60);
    const cm=CLASSMATES.filter(cmUnlocked);const from=cm.length?cm[Math.random()*cm.length|0]:null;
    $('.center',sh).innerHTML=`<div class="pop" style="width:150px;height:150px;margin:0 auto">${from&&e.id==='visit'?`<img src="assets/friends/${from.img}.webp" style="width:100%;height:100%;object-fit:contain" alt="">`:M('celebrate')}</div><div class="h2 mt8">+${c} เหรียญ${e.id==='plum'?' + ตั๋วกันสตรีค 1 ใบ':''}</div><p style="color:var(--sub2);font-size:15px;margin:6px 0 16px">${e.id==='visit'?(from?`${from.n}ฝากเหรียญมาให้ “สู้ ๆ นะ”`:'เพื่อนในห้องฝากเหรียญมาให้'):'โชคดีจังเลย'}</p><button class="pill sm press" data-act="closesheet">ขอบคุณ</button>`;refresh()}}});refresh()}

/* ----- สตรีค: ตั๋วกันสตรีค · ขาด · กลับมา ----- */
function freezeBuy(){if(S.freezes>=2){toast('ถือตั๋วกันสตรีคได้สูงสุด 2 ใบ');return}if(S.coins<40){toast('เหรียญไม่พอ (ต้องใช้ 40)');return}S.coins-=40;S.freezes++;save();bumpChips();vib([15,30]);toast('ได้ตั๋วกันสตรีคเพิ่ม 1 ใบ');streakSheet()}
function streakSheet(){const b=S.buddy;
 openSheet(`<div class="center" style="padding:0 24px"><div style="width:140px;height:140px;margin:0 auto">${M('streak')}</div><div class="h2 mt8">สตรีค ${curStreak()} วัน</div><p style="color:var(--sub2);margin:6px 0 14px;font-size:14.5px">ได้ XP จากบทเรียนหรือเกมอย่างน้อย 1 ครั้งต่อวัน สตรีคก็ไม่ขาด</p>
  <div class="card" style="display:flex;align-items:center;gap:12px;padding:12px 16px;text-align:left"><span style="font-size:30px">🧊</span><span style="flex:1"><b style="font-size:16px">ตั๋วกันสตรีค × ${S.freezes}</b><br><small class="cap">ลืมเรียนได้สูงสุด 2 วัน ระบบใช้ตั๋วให้อัตโนมัติ</small></span><button class="chip coin press" id="fb">🪙40</button></div>
  ${b?`<div class="card mt8" style="display:flex;align-items:center;gap:12px;padding:12px 16px;text-align:left"><span style="font-size:30px">🤝</span><span style="flex:1"><b style="font-size:16px">สตรีคบัดดี้ ${buddyStreak()} วัน</b><br><small class="cap">กับ${b.n} · ต้องเรียนทั้งคู่ถึงจะนับ</small></span></div>`:`<button class="card mt8 press" data-go="buddy" style="display:flex;align-items:center;gap:12px;padding:12px 16px;text-align:left;width:100%"><span style="font-size:30px">🤝</span><span style="flex:1"><b style="font-size:16px">ชวนเพื่อนเป็นบัดดี้สตรีค</b><br><small class="cap">เรียนด้วยกันทุกวัน ไม่อยากทำให้เพื่อนขาด</small></span></button>`}
  <button class="pill sm press mt16" data-act="closesheet">เข้าใจแล้ว</button></div>`,{onMount:sh=>{$('#fb',sh).onclick=freezeBuy}})}
function dailyCheck(){const t=today();try{leagueRoll()}catch(er){console.error(er)}
 if(S.streak>=1&&S.lastDay>-90&&S.lastDay<t-1){const m=t-1-S.lastDay;
  if(m<=2&&S.freezes>=m&&S.freezeUsed!==t){S.freezes-=m;S.lastDay=t-1;S.freezeUsed=t;save();
   return setTimeout(()=>openSheet(`<div class="center" style="padding:0 24px"><div style="width:150px;height:150px;margin:0 auto">${M('tea')}</div><div class="h2 mt8">ตั๋วกันสตรีคช่วยไว้</div><p style="color:var(--sub2);margin:6px 0 16px;font-size:15px">วันที่ผ่านมาไม่ได้เรียน แต่ใช้ตั๋ว ${m} ใบ สตรีค ${S.streak} วันจึงยังอยู่ เหลือตั๋ว ${S.freezes} ใบ — วันนี้เรียนสักนิดนะ</p><button class="pill sm press" data-act="closesheet">ได้เลย</button></div>`),700)}
  if(S.lostShown!==t)return setTimeout(lostSheet,700)}
 comebackIf()}
const checkStreakLost=dailyCheck;
function lostSheet(){if($('.sheet'))return;S.lostShown=today();save();const lost=S.streak,can=S.coins>=50||S.invited>=3;
 openSheet(`<div class="center" style="padding:0 24px"><div style="width:170px;height:170px;margin:0 auto">${M('streaklost')}</div><div class="h2 mt8">สตรีค ${lost} วันขาดแล้ว</div><p style="color:var(--sub2);margin:6px 0 18px;font-size:15px">ไม่เป็นไรนะ ${MASCOT_NAME}เข้าใจ เริ่มใหม่วันนี้ก็ได้ หรือใช้เหรียญกู้สตรีคกลับมา</p>
  <button class="pill sm press" id="rs" ${can?'':'disabled'}><b>กู้สตรีค ${lost} วัน</b><small>${S.invited>=3?'ใช้ตั๋วชวนเพื่อน':'50 เหรียญ (จำลอง)'}</small></button><button class="pill sm ghost press mt12" id="nw">เริ่มสตรีคใหม่</button><p class="cap mt12"><span class="demo">ตัวอย่างทดลอง</span></p></div>`,
  {onMount:sh=>{$('#rs',sh).onclick=()=>{if(S.invited>=3)S.invited-=3;else S.coins-=50;S.lastDay=today()-1;save();closeSheet();bumpChips();toast('กู้สตรีคกลับมาแล้ว');refresh()};$('#nw',sh).onclick=()=>{S.streak=0;save();closeSheet();refresh();setTimeout(comebackIf,500)}}})}
function comebackIf(){const t=today();if(S.lastDay>-90&&t-S.lastDay>=3&&S.comebackDay<S.lastDay&&(S.streak===0||S.lastDay<t-1)&&!$('.sheet')&&S.parts.length){
 if(S.streak>=2&&S.lastDay<t-1)return;S.comebackDay=t;S.coins+=30;S.freezes=Math.min(2,S.freezes+1);save();bumpChips();
 setTimeout(()=>openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M('tired')}</div><div class="h2 mt8">คิดถึงจังเลย</div><p style="color:var(--sub2);margin:6px 0 12px;font-size:15px">หายไป ${t-S.lastDay} วัน ${MASCOT_NAME}รอมาตลอด เลยเตรียมของขวัญต้อนรับกลับมาให้</p>
  <div class="card" style="padding:12px 16px;display:flex;justify-content:space-around"><span><b style="font-size:20px;color:#B07A12">+30</b><br><small class="cap">เหรียญ</small></span><span><b style="font-size:20px">+1 🧊</b><br><small class="cap">ตั๋วกันสตรีค</small></span></div><p class="cap mt8">ทบทวนข้อผิดสัก 1 รอบก่อน แล้วค่อยเรียนต่อก็ได้</p><button class="pill sm press mt12" data-act="closesheet">กลับมาเรียนกันเถอะ</button></div>`,{onClose:()=>refresh()}),600)}}

/* ----- บัดดี้สตรีค (เพื่อนจำลอง) ----- */
const hash=(n,d)=>((((d*2654435761)>>>0)^(n*40503))>>>0)%100;
const buddyDone=d=>{const b=S.buddy;if(!b)return false;return d===today()&&b.nudgeDay===d?true:hash(b.n,d)<85};
const buddyStreak=()=>{const b=S.buddy;return b&&b.last>=today()-1?b.streak:0};
const buddyInfo=()=>FRIENDS[S.buddy.n];
function buddyTick(){const b=S.buddy;if(!b)return;const t=today();if(dayXp()<=0||b.last===t||!buddyDone(t))return;b.streak=b.last===t-1?b.streak+1:1;b.last=t;save();
 if(b.streak>1||b.since===t)setTimeout(()=>{toast(`สตรีคบัดดี้กับ${FRIENDS[b.n].n} ${b.streak} วัน`);if([3,7,14,30].includes(b.streak))confetti(80)},900)}
function buddyDoneRow(){const b=S.buddy;if(!b)return ROW('#F2ECFA','🤝','ชวนเพื่อนเป็นบัดดี้สตรีค','เรียนด้วยกันทุกวัน สตรีคเพิ่มเป็นสองเท่าแรงใจ',CHEV,'data-go="buddy"');
 const f=FRIENDS[b.n],ok=buddyDone(today());return ROW('#F2ECFA','🤝',`บัดดี้สตรีค ${buddyStreak()} วัน`,ok?`${f.n}เรียนวันนี้แล้ว ✓ ครบทั้งคู่`:`รอ${f.n}อยู่ · แตะเพื่อส่งกำลังใจ`,CHEV,'data-go="buddy"')}
function buddyCard(){const b=S.buddy;if(!b)return `<button class="card buddycard press fade-in" data-go="buddy"><span class="bimg">${M('buddy')}</span><span class="btx"><span class="cap" style="color:#7A4FB0;font-weight:700">ใหม่ · บัดดี้สตรีค</span><b>ชวนเพื่อนมาเรียนคู่กัน</b><small>ถ้าคนใดคนหนึ่งขาด สตรีคของทั้งคู่หลุด… เลยต้องคอยเตือนกัน</small></span></button>`;
 const f=FRIENDS[b.n],me=dayXp()>0,fr=buddyDone(today());
 return `<button class="card buddycard press fade-in" data-go="buddy"><span class="bpair"><span class="av" style="background:var(--red)">${dn()[0]||'ฉ'}${me?'<i class="tk">✓</i>':''}</span><span class="bfl">🔥</span><span class="av" style="background:${f.c}">${f.n.replace(/^(พี่|น้อง)/,'')[0]}${fr?'<i class="tk">✓</i>':''}</span></span><span class="btx"><b>บัดดี้สตรีค ${buddyStreak()} วัน</b><small>${me&&fr?'วันนี้ครบทั้งคู่แล้ว':!me?'วันนี้คุณยังไม่ได้เรียน — ' +f.n+(fr?'เรียนไปแล้วนะ':'ก็ยังรออยู่'):`รอ${f.n}อยู่ · แตะเพื่อส่งกำลังใจ`}</small></span></button>`}
SC.buddy=()=>{const b=S.buddy;
 if(!b)return {title:'บัดดี้สตรีค',body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:220px;height:220px;margin:0 auto">${M('buddy')}</div><div class="large" style="padding:0">บัดดี้สตรีค</div><p style="color:var(--sub2);font-size:15.5px;margin:6px 10px 0">เลือกเพื่อนหนึ่งคนเป็นคู่หู — ต้อง <b>เรียนทั้งคู่ในวันเดียวกัน</b> สตรีคคู่ถึงจะเพิ่ม ใครลืมก็ส่งกำลังใจกระตุ้นกันได้ผ่าน LINE</p></div>
  <div class="card pad2 mt16" style="font-size:14px;line-height:1.55"><b>ข้อดีของบัดดี้</b><br>· ช่วยกันรักษาสตรีคของทั้งสองคน<br>· เพื่อนเป็นผู้เตือนแทนการแจ้งเตือนจากแอป<br>· สตรีคคู่ครบ 3 / 7 / 14 / 30 วัน รับรางวัล</div>
  <div class="pad mt16"><button class="pill row1 linebtn press" data-go="buddypick">เลือกเพื่อนจาก LINE (จำลอง)</button></div>
  <div class="banner mt16" style="background:#FDF3E6;color:#8A5A12">จริงหรือจำลอง? ใน LINE จริง แอปดูรายชื่อเพื่อนไม่ได้ ต้องส่งลิงก์ชวนให้เพื่อนกดรับเอง · ในหน้านี้เพื่อนและการเรียนของเพื่อนเป็นข้อมูลจำลอง</div>`};
 const f=FRIENDS[b.n],me=dayXp()>0,fr=buddyDone(today()),nud=b.nudgeDay===today();
 return {title:'บัดดี้สตรีค',body:`<div class="center" style="padding:6px 20px 0"><div style="width:190px;height:190px;margin:0 auto">${M('buddy','float')}</div><div class="large" style="padding:0">${buddyStreak()} วัน</div><div class="cap">สตรีคคู่กับ ${f.n} (จำลอง)</div></div>
 <div class="group mt16"><div class="row noic" style="min-height:62px"><span class="av" style="background:var(--red)">${dn()[0]||'ฉ'}</span><span class="tx"><b>คุณ</b><small>${me?'เรียนวันนี้แล้ว':'ยังไม่ได้เรียนวันนี้'}</small></span><span style="font-size:22px">${me?'✅':'⏳'}</span></div>
  <div class="row noic" style="min-height:62px"><span class="av" style="background:${f.c}">${f.n.replace(/^(พี่|น้อง)/,'')[0]}</span><span class="tx"><b>${f.n}</b><small>${fr?'เรียนวันนี้แล้ว':'ยังไม่ได้เรียน'}</small></span><span style="font-size:22px">${fr?'✅':'⏳'}</span></div></div>
 <div class="wk mt16" style="padding:0 24px">${Array.from({length:7},(_,k)=>{const d=today()-6+k;const both=(d===today()?me&&fr:dayXp(d)>0&&buddyDone(d));return `<div>${['อา','จ','อ','พ','พฤ','ศ','ส'][(d+4)%7]}<i class="${both?'on':''} ${d===today()?'today':''}">${both?'✓':''}</i></div>`}).join('')}</div>
 <div class="pad mt20">${!fr&&!nud?`<button class="pill row1 linebtn press" data-go="nudge">ส่งกำลังใจให้${f.n}ใน LINE</button>`:nud&&!fr?'':`<button class="pill row1 ghost press" data-go="nudge2">${me?'ส่งข้อความให้กำลังใจ':'ชวน'+f.n+'มาเรียนด้วยกัน'}</button>`}${!me?`<button class="pill sm mt12 press" data-go="path">ไปเรียนเลย</button>`:''}</div>
 <p class="cap center mt16" style="padding:0 30px">รางวัลสตรีคคู่: 3 วัน +20 เหรียญ · 7 วัน +50 เหรียญ · 14 วัน ตั๋วกันสตรีค 1 ใบ · 30 วัน มงกุฎ (ตัวอย่างทดลอง)</p>
 <div class="banner mt12" style="background:#FDF3E6;color:#8A5A12">ใน LINE จริง ข้อความกระตุ้นต้องส่งจากแชตของคุณเอง (ผ่านปุ่มแชร์) ไม่ใช่แอปส่งแทน เพื่อไม่ผิดกติกาและไม่กินโควตา push ของ OA</div>
 <div style="padding:8px 20px 0"><button class="cap press" style="color:var(--sub);text-decoration:underline" data-go="buddyend">เปลี่ยนบัดดี้</button></div>`}};

/* ----- หน้าหลัก ----- */
SC.home=()=>{const nu=nextUnit(),goal=goalNow(),xp=dayXp(),pct=Math.min(1,xp/goal),C=2*Math.PI*90,t=today(),hr=new Date().getHours();
 const wk=Array.from({length:7},(_,k)=>{const d=t-6+k;return `<div>${['อา','จ','อ','พ','พฤ','ศ','ส'][(d+4)%7]}<i class="${dayXp(d)>0?'on':''} ${d===t?'today':''}">${dayXp(d)>0?'✓':''}</i></div>`}).join('');
 const gw=gamesOpen()?gw4().length:0,cdone=S.chestDay===t;const pose=xp>=goal?'celebrate':!S.parts.length?'wave':hr>=22||hr<5?'sleepy':curStreak()>=3?'jump':'wave';
 const hello=!S.parts.length?(lvDriven()?`เริ่มที่ระดับ ${curLv()} · บทแรกของระดับนี้รออยู่`:'เริ่มด้วยบทแรก ใช้เวลาแค่ 3 นาที'):xp>=goal?'ครบเป้าหมายวันนี้แล้ว เก่งที่สุด':curStreak()>=3?`สตรีค ${curStreak()} วันแล้ว อย่าให้ขาดนะ`:`${MASCOT_NAME}พาเรียนวันนี้`;
 return {title:BRAND_NAME,body:`${S.from==='line'?'<div class="banner fade-in" style="margin-top:2px">✓ เปิดจาก LINE OA (จำลอง) · เข้าสู่ระบบให้แล้ว</div>':''}
 <div class="hero"><div><div class="cap">${dateTxt()}</div><div class="large" style="padding:2px 0 0">สวัสดี, ${S.name}</div><div class="cap" style="margin-top:2px;max-width:200px">${hello}</div></div>${llama(pose,112,{acc:true,cls:'float',style:'margin-bottom:-4px'})}</div>
 <div class="pad mt12">${typeof stkHomeSearch==='function'?stkHomeSearch():''}</div>
 <div class="pad mt12">${eventCard()}</div>
 <div class="card goal fade-in" style="animation-delay:.08s"><div class="cap" style="font-size:14px">เป้าหมายวันนี้${goal!==S.goal?' (วันสบาย ๆ)':''}</div>
  <div class="ringw"><svg viewBox="0 0 216 216"><circle cx="108" cy="108" r="90" fill="none" stroke="#F0E9DF" stroke-width="7"/><circle class="ring-fill" cx="108" cy="108" r="90" fill="none" stroke="#C8102E" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C*pct).toFixed(1)} 999" transform="rotate(-90 108 108)"/></svg><div class="ctr"><div class="n">${Math.min(xp,999)}</div><div class="cap" style="margin-top:6px;font-size:15px">จาก ${goal} XP</div></div></div>
  <div style="margin-top:14px;font-size:15px;color:var(--sub2)">${xp>=goal?'ครบเป้าหมายวันนี้แล้ว':xp>0?'อีกนิดเดียวก็ครบแล้ว':'เริ่มรอบแรกของวันนี้กันเลย'}</div>
  <div class="wk">${wk}</div>
  <button class="frz press" data-go="streak"><span>🔥 ${curStreak()} วัน</span><span>🧊 ${S.freezes}</span></button></div>
 <div class="pad mt20 fade-in" style="animation-delay:.16s">${nu?`<button class="pill press" data-go="unit" data-id="${nu.id}"><b>${S.parts.length?'เรียนต่อ':'เริ่มเรียน'}</b><small>${levelBy(curLv()).name} · ${uTxt(nu).replace(/\/2$/,'')} · ${lessonBy(nu.lesson).th}</small></button>`:levelEndCta()}</div>
 ${typeof radHomeCard==='function'?'<div class="pad mt16">'+radHomeCard()+'</div>':''}
 ${typeof stkHomeCard==='function'?'<div class="pad mt16">'+stkHomeCard()+'</div>':''}
 ${missionsHtml()}
 ${typeof weeklyCard==='function'?weeklyCard():''}
 <div class="sec">บัดดี้</div><div class="pad">${buddyCard()}</div>
 <div class="sec">วันนี้ทำอะไรดี</div>
 <div class="group">
  ${ROW('#E7F8EE',M('teach'),'ถามน้องลามา (ติวเตอร์จำลอง)','อธิบายคำ · ซ้อมคุย · แก้ประโยค',undefined,'data-go="tutor"')}
  ${ROW('#EAF1FB','🎮','เกมคำศัพท์',gw?gw+' คำพร้อมเล่น':'เรียนรอบแรกให้จบเพื่อปลดล็อก',undefined,'data-go="games"')}
  ${ROW('#FDF3E6','🎁','หีบประจำวัน',cdone?'รับแล้ววันนี้ กลับมาใหม่พรุ่งนี้':'พร้อมเปิด รับเหรียญฟรี',cdone?CHEV:'<span class="chip" style="height:26px;padding:0 10px;font-size:12px">เปิด</span>','data-go="chest"')}
  ${ROW('#FBEFEA','📝','ทบทวนตามรอบ',reviewWords().length+' คำถึงรอบ',undefined,'data-go="review"')}
  ${ROW('#FDECEC',M('speaking'),'ฝึกพูด','พูดตาม'+MASCOT_NAME+' (คะแนนจำลอง)',undefined,'data-go="play" data-g="speak"')}
  ${ROW('#EAF1FB',M('listening'),'ฝึกฟัง','ฟังแล้วเลือกความหมาย',undefined,'data-go="play" data-g="listen"')}
  ${ROW('#F2ECFA',M('write'),'ฝึกวรรณยุกต์ (สำหรับคนไทย)','เทียบกับเสียงสูงต่ำที่เราคุ้นเคย',undefined,'data-go="tones"')}
  ${ROW('#FDF3E6','🧪','ห้องฝึกพิเศษ','นิทานอ่านเอง · เทียบคำ · พูดตาม · ข้อสอบจำลอง · ส่วนประกอบ',undefined,'data-go="labs"')}
 </div>
 <div class="sec">เรียนกับเพื่อนใน LINE</div>
 <div class="group">
  ${ROW('#E7F8EE','⚔️','ท้าเพื่อน','ดวลศัพท์ 5 ข้อ · ส่งการ์ดผลลง LINE',undefined,'data-go="challenge"')}
  ${ROW('#FDF3E6','🍵','เรียนพร้อมกัน','จับเวลา 10–15 นาที มีเพื่อนในห้องนั่งเรียนด้วย',undefined,'data-go="study"')}
  ${ROW('#F2ECFA','🏫','ห้องเรียนกลุ่ม','ควิซประจำวัน · บอสประจำสัปดาห์ · อันดับห้อง',undefined,'data-go="group" data-i="0"')}
  ${ROW('#EAF1FB','📊','สรุปสัปดาห์ของฉัน','การ์ดสรุปไว้แชร์ใน LINE',undefined,'data-go="recap"')}
  ${ROW('#FDECEC','💌','ชวนเพื่อนรับรางวัล','เพื่อนเข้าห้อง ได้ทั้งคู่ · ครบ 3 คนได้ตั๋วกันสตรีค',undefined,'data-go="invite"')}
 </div>${DEMO}`}};
