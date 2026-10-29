/* ───── รูปแบบเล่นกลุ่ม: ทีมชนทีม · วิ่งผลัดคำศัพท์ (เพื่อนร่วมทีมเป็นบอทจำลอง) ───── */
window.GOX=window.GOX||{};
(function(){
const TEAM_ROUNDS=6,RELAY_LEGS=6,RELAY_LIVES=3;
const mates=n=>shuffle(FRIENDS.slice()).slice(0,n);
const av=(p,sz=34)=>`<span class="av" style="background:${p.c};width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.46)}px">${p.n.replace(/^(พี่|น้อง)/,'')[0]}</span>`;
const lvPool=()=>{const p=gw4();return p.length>=4?p:qFallback()};

SC.teamquiz=({m})=>{
 const relay=m==='relay';
 return {title:relay?'วิ่งผลัดคำศัพท์':'ทีมชนทีม',noRefresh:true,body:`<div class="pad"><div class="large" style="padding:0 0 4px">${relay?'วิ่งผลัดคำศัพท์':'ทีมชนทีม'}</div>
  <p class="cap" style="padding:0 0 12px">${relay?`ส่งไม้ต่อให้ถึงเส้นชัย ${RELAY_LEGS} ช่วง ตอบพลาดไม้หล่น เสียหัวใจ 1 ดวง (มี ${RELAY_LIVES} ดวง)`:`ทีม 3 คนชนกับอีกทีม ${TEAM_ROUNDS} รอบ ใครตอบถูกเยอะกว่าชนะ`}</p>
  <div id="tq"></div></div>${DEMO}`,
 mount(el){const box=$('#tq',el);let dead=false;const alive=()=>!dead&&el.isConnected;
  const me={n:'คุณ',c:'#C8102E'};
  function lobby(){const pool=lvPool();const all=mates(5),mine=all.slice(0,relay?3:2),foes=all.slice(relay?3:2,relay?5:5);
   box.innerHTML=`<div class="card pad2"><div class="cap">${relay?'ทีมของคุณ (ลำดับวิ่ง)':'ทีมของคุณ'}</div><div class="tqrow">${[me,...mine].slice(0,relay?4:3).map(p=>`<div class="tqp">${av(p,44)}<small>${p.n}</small></div>`).join('')}</div>
    ${relay?'':`<div class="tqvs">VS</div><div class="cap">ทีมตรงข้าม</div><div class="tqrow">${foes.map(p=>`<div class="tqp">${av(p,44)}<small>${p.n}</small></div>`).join('')}</div>`}</div>
    <div class="pad mt16"><button class="pill press" id="go"><b>เริ่มเลย</b><small>เพื่อนร่วมทีมเป็นบอทจำลอง · คำถามจากคำที่คุณเรียนแล้ว</small></button></div>
    <p class="cap center" style="padding:10px 24px 0">ผลลัพธ์ของเพื่อนในทีมเป็นการจำลองสุ่ม ไม่ใช่ผู้เล่นจริง</p>`;
   $('#go',box).onclick=()=>{vib(10);relay?playRelay([me,...mine].slice(0,4),pool):playTeam(me,mine,foes,pool)}}
  function qOne(q,onDone){const lock={v:false};
   box.querySelector('#qa').innerHTML=qHtml(q);
   $('#qa',box).onclick=e=>{const o=e.target.closest('.opt');if(!o||lock.v)return;lock.v=true;const ok=+o.dataset.i===q.ans;
    $$('.opt',box).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===+o.dataset.i)x.classList.add('bad')});
    if(ok){vib(10)}else{addMistake(q.w);vib([25,30,25])}
    setTimeout(()=>{if(alive())onDone(ok)},850)}}
  function playTeam(me,mine,foes,pool){const qs=shuffle(pool).slice(0,TEAM_ROUNDS).map((w,k)=>makeQ(w,['zh2th','th2zh'][k%2],pool));
   let k=0,A=0,B=0,youOk=0;const sk=()=>Math.min(.85,.5+curLv()*.04);
   const head=()=>`<div class="tqscore"><div class="a"><b>${A}</b><small>ทีมคุณ</small></div><div class="bar"><i style="width:${A+B?A/(A+B)*100:50}%"></i></div><div class="b"><b>${B}</b><small>ทีมตรงข้าม</small></div></div><div class="cap center" style="margin-top:10px">รอบ ${Math.min(k+1,TEAM_ROUNDS)}/${TEAM_ROUNDS}</div>`;
   const show=()=>{box.innerHTML=`${head()}<div id="qa"></div><div id="feed" class="tqfeed"></div>`;qOne(qs[k],ok=>{if(ok){A++;youOk++}
     const lines=[];mine.forEach(p=>{const r=Math.random()<sk();if(r)A++;lines.push(`${av(p,22)}<span>${p.n} ${r?'ตอบถูก ✓':'พลาด ✗'}</span>`)});
     foes.forEach(p=>{if(Math.random()<sk()-.02)B++});
     box.querySelector('#feed').innerHTML=lines.map(l=>`<div class="tqf">${l}</div>`).join('');
     k++;setTimeout(()=>{if(!alive())return;k<TEAM_ROUNDS?show():fin()},900)})};
   function fin(){const win=A>B,tie=A===B;const xp=evX(win?14:tie?10:7),coins=evC(win?20:tie?10:6);addXp(xp,null,1);addCoins(coins,1);bumpCnt('game');bumpCnt('social');bumpCnt('teamq');if(win)bumpCnt('teamwin');
    box.innerHTML=`<div class="center"><div class="pop" style="width:150px;height:150px;margin:0 auto">${M(win?'celebrate':tie?'correct':'think')}</div><div class="h2">${win?'ทีมคุณชนะ':tie?'เสมอกัน':(B-A<=2?'แพ้ไม่กี่คะแนน ลองอีกครั้ง':'ลองอีกครั้งในรอบหน้า')}</div>
     <p style="color:var(--sub2);margin:4px 0 4px;font-size:15px">${A} : ${B} · คุณตอบถูก ${youOk}/${TEAM_ROUNDS}</p><p class="cap">+${xp} XP · +${coins} เหรียญ</p></div>
     <div class="pad mt16"><button class="pill sm linebtn press" id="sh">แชร์ผลไป LINE</button><button class="pill sm ghost press mt8" id="ag">เล่นอีกรอบ</button></div>`;
    confetti(win?70:0);$('#sh',box).onclick=()=>shareSheet('result',{kind:'score',text:`ทีมชนทีม ${A}:${B} ${win?'ชนะ':tie?'เสมอ':'แพ้'}`});$('#ag',box).onclick=lobby}
   show()}
  function playRelay(team,pool){const qs=shuffle(pool).slice(0,RELAY_LEGS*2).map((w,k)=>makeQ(w,['zh2th','th2zh'][k%2],pool));
   let leg=0,lives=RELAY_LIVES,qi=0,turn=0,ok=0;const sk=()=>Math.min(.82,.55+curLv()*.04);
   const hdr=()=>`<div class="tqtrack">${Array.from({length:RELAY_LEGS},(_,i)=>`<i class="${i<leg?'done':i===leg?'cur':''}"></i>`).join('')}<span class="fin">🏁</span></div><div class="tqscore" style="justify-content:space-between;margin-top:10px"><span>ช่วงที่ ${Math.min(leg+1,RELAY_LEGS)}/${RELAY_LEGS}</span><span>${'❤️'.repeat(lives)}${'🤍'.repeat(RELAY_LIVES-lives)}</span></div>`;
   const next=()=>{if(!alive())return;if(leg>=RELAY_LEGS)return fin(true);if(lives<=0)return fin(false);const p=team[turn%team.length];turn++;
    if(p===team[0]){box.innerHTML=`${hdr()}<div class="cap center mt8">ตาคุณถือไม้</div><div id="qa"></div>`;const q=qs[qi++%qs.length];qOne(q,r=>{if(r){leg++;ok++}else lives--;next()})}
    else{const r=Math.random()<sk();box.innerHTML=`${hdr()}<div class="center mt16" style="padding:24px 0">${av(p,64)}<div class="h2 mt8">${p.n} ถือไม้อยู่…</div><p class="cap">${r?'ส่งต่อได้สวย ✓':'ไม้หล่น ✗'}</p></div>`;setTimeout(()=>{if(r)leg++;else lives--;next()},1100)}};
   function fin(win){const xp=evX(win?16:8),coins=evC(win?24:6);addXp(xp,null,1);addCoins(coins,1);bumpCnt('game');bumpCnt('social');bumpCnt('relay');if(win)bumpCnt('teamwin');
    box.innerHTML=`<div class="center"><div class="pop" style="width:150px;height:150px;margin:0 auto">${M(win?'celebrate':'think')}</div><div class="h2">${win?'ถึงเส้นชัยแล้ว':'ไม้หล่นหมดแล้ว'}</div><p style="color:var(--sub2);margin:4px 0 4px;font-size:15px">คุณตอบถูก ${ok} ครั้ง · วิ่งได้ ${Math.min(leg,RELAY_LEGS)}/${RELAY_LEGS} ช่วง</p><p class="cap">+${xp} XP · +${coins} เหรียญ</p></div>
     <div class="pad mt16"><button class="pill sm linebtn press" id="sh">แชร์ผลไป LINE</button><button class="pill sm ghost press mt8" id="ag">วิ่งอีกรอบ</button></div>`;
    confetti(win?70:0);$('#sh',box).onclick=()=>shareSheet('result',{kind:'score',text:`วิ่งผลัดคำศัพท์ ${win?'ถึงเส้นชัย':'ไม้หล่น'} (${Math.min(leg,RELAY_LEGS)}/${RELAY_LEGS} ช่วง)`});$('#ag',box).onclick=lobby}
   next()}
  lobby()}}};
GOX.teamquiz=el=>push('teamquiz',{m:el.dataset.m});
})();
