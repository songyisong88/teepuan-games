/* เกม: จับคำ จับคู่ความจำ 60 วิ ดวลเพื่อน หีบ/วงล้อ ร้านค้า ผลลัพธ์ */
const pickOne=a=>a[Math.random()*a.length|0];
const pickN=(a,n)=>{let r=[];while(r.length<n)r=r.concat(shuffle(a));return r.slice(0,n)};
SC.games=()=>{const gw=gameWords(),lock=gw.length<4,b=S.gameBest;
 const G=(g,bg,em,t,sub)=>`<button class="card gcard press ${lock?'lockd':''}" data-go="play" data-g="${g}"><span class="gi" style="background:${bg}">${em}</span><span style="flex:1"><b>${t}</b><small>${sub}</small></span>${lock?LOCK.replace('<svg','<svg width="20" height="20" style="color:#B9B0A6"'):CHEV}</button>`;
 return {title:'เกม',body:`<div class="large">เกม</div>
 ${lock?`<div class="card pad2 mt12 fade-in" style="display:flex;gap:12px;align-items:center;margin-bottom:16px"><div style="width:96px;height:96px;flex:none">${M('locked')}</div><div><b style="font-size:17px">เกมยังล็อกอยู่</b><p style="font-size:14px;color:var(--sub2);margin:4px 0 10px">เรียนบทที่ 1 ให้จบ เพื่อปลดล็อกคำศัพท์สำหรับเล่นเกม</p><button class="pill sm press" style="width:auto;padding:0 22px;height:40px;font-size:15px" data-go="path">ไปเรียนเลย</button></div></div>`
 :`<div class="stat mt12" style="margin-bottom:18px"><div><b>${gw.length}</b><small>คำในเกม</small></div><div><b style="color:#B07A12">${S.coins}</b><small>เหรียญ</small></div><div><b style="color:var(--red)">${b.catch+b.speed}</b><small>คะแนนสูงสุดรวม</small></div></div>`}
 ${G('catch','#EAF1FB','🪂','จับคำ','คำจีนร่วงลงมา แตะคำที่ถูกให้ทัน')}
 ${G('mem','#F2ECFA','🃏','จับคู่ความจำ','พลิกการ์ดจับคู่ตัวจีนกับคำไทย')}
 ${G('speed','#FDECEC','⚡','รอบเร็ว 60 วินาที','ตอบให้ได้มากที่สุดภายใน 1 นาที')}
 ${G('duel','#E7F8EE','⚔️','ดวลเพื่อน','ท้าเพื่อนแข่ง 5 ข้อ (จำลอง)')}
 ${G('boss','#F2ECFA','<span style="width:48px;height:48px;display:block">'+M('boss')+'</span>','บอสหมึกยักษ์','ทั้งห้องช่วยกันตีบอส (จำลอง)')}
 <div class="sec">ฝึกพูดและฟัง</div>
 ${G('speak','#FDECEC','<span style="width:50px;height:50px;display:block">'+M('speaking')+'</span>','ฝึกพูด','พูดตาม'+MASCOT_NAME+' (คะแนนจำลอง)')}
 ${G('listen','#EAF1FB','<span style="width:50px;height:50px;display:block">'+M('listening')+'</span>','ฝึกฟัง','ฟังเสียงแล้วเลือกความหมาย')}
 <div class="sec">รางวัลและร้านค้า</div>
 <div class="group">
  ${ROW('#FDF3E6','🎁','หีบและวงล้อประจำวัน',S.chestDay===today()?'รับแล้ว':'พร้อมเปิด!',undefined,'data-go="chest"')}
  ${ROW('#FDECEC','🛍️','ร้านค้าเหรียญ','แต่งตัว'+MASCOT_NAME,`<span class="chip coin">${S.coins}</span>`,'data-go="shop"')}
  ${ROW('#EAF1FB','🏆','ลีกประจำสัปดาห์','ดูอันดับของคุณ',undefined,'data-go="rank"')}
 </div><p class="cap center" style="padding:16px 30px 0">คำในเกมมาจากบทที่เรียนจบแล้วเท่านั้น · ข้อที่พลาดจะไปอยู่ในรายการทบทวน</p>${DEMO}`}};
const gnav=t=>`<header class="nav"><div class="nav-l"><button class="back" data-sa="gquit">${BACKI}<span>ออก</span></button></div><div class="nav-t" style="opacity:1;transform:none">${t}</div><div class="nav-r"></div></header>`;
function gameEnd(el,g,score,{xp,coins,sub,mascot,stats,title}){xp=evX(xp);coins=evC(coins);addXp(xp,null,1);addCoins(coins,1);bumpCnt('game',1);if(score>(S.gameBest[g]||0))S.gameBest[g]=score;save();
 replace('result',{title:title||({catch:'จับคำ',mem:'จับคู่ความจำ',speed:'รอบเร็ว',speak:'ฝึกพูด',listen:'ฝึกฟัง',boss:'บอสหมึกยักษ์'}[g]||'ผลลัพธ์'),mascot,sub,xp,coins,stats,retry:g,share:{kind:'score',text:sub}})}
function gameQuit(el){el.addEventListener('click',e=>{if(e.target.closest('[data-sa=gquit]'))pop()})}

/* ----- จับคำ ----- */
SC.game_catch=()=>({noRefresh:true,nav:gnav('จับคำ'),body:'',extra:`<div class="hud"><div class="lives" id="lv"></div><div class="score" id="sc"></div></div><div class="target" id="tg"></div><div class="arena" id="ar"></div>`,
 mount(el){gameQuit(el);const words=gameWords(),ar=$('#ar',el);let lives=3,score=0,round=0,raf=0,alive=true,tw=null,t0=0,dur=6000,bubs=[],lock=false;const MAXR=12;
  const hud=()=>{$('#lv',el).textContent='❤️'.repeat(lives)+'🤍'.repeat(3-lives);$('#sc',el).textContent='คะแนน '+score+' / '+MAXR};
  function end(){alive=false;cancelAnimationFrame(raf);const xp=score*3,coins=score;gameEnd(el,'catch',score,{xp,coins,mascot:score>=8?'celebrate':'wrong',sub:`จับถูก ${score} คำ`,stats:[['จับถูก',score+'/'+MAXR],['หัวใจที่เหลือ',lives]]})}
  function lose(w){lives--;addMistake(w);vib([30,40,30]);hud();if(lives<=0)setTimeout(end,500);else setTimeout(nr,650)}
  function nr(){if(!alive)return;if(score>=MAXR){end();return}ar.innerHTML='';lock=false;round++;tw=pickOne(words);const ds=shuffle(words.filter(w=>w.zh!==tw.zh)).slice(0,2);
   $('#tg',el).innerHTML=`แตะคำที่แปลว่า “${tw.th}”`;dur=Math.max(3200,6500-round*260);t0=performance.now();const xs=shuffle([20,50,80]);
   bubs=shuffle([tw,...ds]).map((w,i)=>{const d=document.createElement('div');d.className='bub zh';d.style.left=xs[i]+'%';d.style.top='0';d.textContent=w.zh;if(w.zh.length>2)d.style.fontSize='24px';d.style.transform='translateY(-70px)';d.onclick=()=>tap(d,w);ar.appendChild(d);return {d,w,dead:false}});
   cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
  function tap(d,w){if(lock||!alive)return;if(w.zh===tw.zh){lock=true;score++;d.classList.add('good');vib(14);floatXp('+3 XP',d);hud();bubs.forEach(b=>{if(b.d!==d)b.d.style.opacity='.25'});setTimeout(nr,450)}else{d.classList.add('bad');d.style.pointerEvents='none';lock=true;lose(tw)}}
  function loop(now){if(!alive||lock)return;const H=ar.clientHeight,p=(now-t0)/dur,y=p*(H+70)-70;bubs.forEach(b=>{b.d.style.transform=`translateY(${y}px)`});if(y>H-60){lock=true;bubs.forEach(b=>{if(b.w.zh===tw.zh)b.d.classList.add('good')});lose(tw);return}raf=requestAnimationFrame(loop)}
  hud();nr();this.stop=()=>{alive=false;cancelAnimationFrame(raf)}},
 unmount(){this.stop&&this.stop()}});

/* ----- จับคู่ความจำ ----- */
SC.game_mem=()=>({noRefresh:true,nav:gnav('จับคู่ความจำ'),body:'<div class="stage" style="padding-top:calc(var(--st) + 100px)"><div class="mem" id="mm"></div><p class="cap center mt16" id="mi"></p></div>',extra:`<div class="hud"><div class="score" id="mv"></div><div class="cap">จับคู่ตัวจีนกับคำไทย</div></div>`,
 mount(el){gameQuit(el);const ws=shuffle(gameWords()).slice(0,gameWords().length>=6?6:4),cols=ws.length===6?3:4,cards=shuffle(ws.flatMap(w=>[{w,t:'zh'},{w,t:'th'}]));let open=[],moves=0,matched=0,lock=false,missed=new Set(),timers=[];
  const mm=$('#mm',el);mm.style.gridTemplateColumns=`repeat(${cols},1fr)`;
  mm.innerHTML=cards.map((c,i)=>`<button class="mc" data-i="${i}"><div class="f">?</div><div class="b ${c.t==='zh'?'z zh':''}" style="${c.t==='th'&&cols===4?'font-size:12.5px':''}${c.t==='zh'&&cols===4?';font-size:26px':''}">${c.t==='zh'?c.w.zh:c.w.th}</div></button>`).join('');
  const hud=()=>$('#mv',el).textContent='เดิน '+moves+' ครั้ง · คู่ '+matched+'/'+ws.length;hud();
  mm.onclick=e=>{const b=e.target.closest('.mc');if(!b||lock)return;const i=+b.dataset.i;if(open.includes(i)||b.classList.contains('done'))return;b.classList.add('open');vib(6);open.push(i);
   if(open.length===2){moves++;lock=true;const [a,c]=open.map(k=>cards[k]);const ea=$$('.mc',mm)[open[0]],ec=$$('.mc',mm)[open[1]];
    if(a.w.zh===c.w.zh){matched++;ea.classList.add('done');ec.classList.add('done');vib(15);open=[];lock=false;hud();if(matched===ws.length)timers.push(setTimeout(fin,700))}
    else{ea.classList.add('miss');ec.classList.add('miss');if(!missed.has(a.w.zh)){missed.add(a.w.zh);addMistake(a.w)}hud();timers.push(setTimeout(()=>{[ea,ec].forEach(x=>x.classList.remove('open','miss'));open=[];lock=false},800))}}};
  function fin(){const good=moves<=ws.length+2,xp=ws.length*4+(good?6:0),coins=ws.length*2+(good?5:0);gameEnd(el,'mem',Math.max(0,40-moves),{xp,coins,mascot:good?'celebrate':'correct',sub:`จับคู่ครบใน ${moves} ครั้ง`,stats:[['จำนวนครั้ง',moves],['คู่ที่จับได้',ws.length]]})}
  this.stop=()=>timers.forEach(clearTimeout)},unmount(){this.stop&&this.stop()}});

/* ----- รอบเร็ว 60 วินาที ----- */
SC.game_speed=()=>({noRefresh:true,nav:gnav('รอบเร็ว 60 วินาที'),body:'<div class="stage" id="stage" style="padding-top:calc(var(--st) + 140px)"></div>',extra:`<div class="hud"><div class="timer" id="tm">60</div><div class="score" id="sc">0 คะแนน</div></div><div class="tbar prog"><i id="tp" style="width:100%;transition:width 1s linear"></i></div>`,
 mount(el){gameQuit(el);const words=gameWords();let left=60,score=0,combo=0,best=0,lock=false,alive=true;const stage=$('#stage',el);
  let tick=null;const startT=()=>{tick=setInterval(()=>{left--;$('#tm',el).textContent=left;$('#tp',el).style.width=left/60*100+'%';if(left<=0)end()},1000)};
  function q(){lock=false;const w=pickOne(words),qq=makeQ(w,pickOne(['zh2th','th2zh']),words);stage.innerHTML=qHtml(qq);stage._q=qq;stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in')}
  stage.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock||!alive)return;lock=true;const qq=stage._q,k=+o.dataset.i,ok=k===qq.ans;$$('.opt',stage).forEach((x,j)=>{if(j===qq.ans)x.classList.add('ok');else if(j===k)x.classList.add('bad')});
   if(ok){score++;combo++;best=Math.max(best,combo);vib(10);floatXp(combo>2?'คอมโบ x'+combo:'+1',o)}else{combo=0;addMistake(qq.w);vib([25,30,25])}
   $('#sc',el).textContent=score+' คะแนน';setTimeout(()=>{if(alive)q()},ok?280:650)};
  function end(){if(!alive)return;alive=false;clearInterval(tick);const xp=score*3,coins=score;gameEnd(el,'speed',score,{xp,coins,mascot:score>=10?'celebrate':'correct',sub:`ตอบถูก ${score} ข้อใน 60 วินาที`,stats:[['ตอบถูก',score],['คอมโบสูงสุด',best]]})}
  stage.innerHTML=`<div class="center fade-in"><div style="width:190px;height:190px;margin:0 auto" class="float">${M('timer')}</div><div class="large" style="padding:4px 0 0">รอบเร็ว 60 วินาที</div><p class="cap mt8" style="padding:0 30px">ตอบให้ได้มากที่สุดใน 1 นาที ถูกติดกันได้คอมโบ</p><div class="pad mt20"><button class="pill press" id="go"><b>เริ่มจับเวลา</b></button></div></div>`;$('#go',el).onclick=()=>{startT();q()};this.stop=()=>{alive=false;clearInterval(tick)}},unmount(){this.stop&&this.stop()}});

/* ----- ดวลเพื่อน (จำลอง) ----- */
function pickFriend(){if(gameWords().length<4){toast('เรียนบทที่ 1 ให้จบก่อน แล้วค่อยท้าเพื่อนได้');return}
 openSheet(`<div style="padding:0 20px;display:flex;align-items:center;gap:8px"><div style="flex:1"><div class="h2">ท้าเพื่อนคนไหนดี?</div><p class="cap">ดวลศัพท์ 5 ข้อ จากคำที่คุณเรียนแล้ว</p></div><div style="width:92px;height:92px;flex:none">${M('duel')}</div></div><div class="group mt12">${FRIENDS.map((f,i)=>`<button class="row press" data-fi="${i}"><span class="av" style="background:${f.c}">${f.n.replace('พี่','').replace('น้อง','')[0]}</span><span class="tx"><b>${f.n}</b><small>🔥 ${f.s} วัน</small></span><span class="chip" style="height:28px;font-size:13px">ท้าเลย</span></button>`).join('')}</div>
 <div style="padding:14px 20px 0"><button class="pill sm ghost press" id="sl">เลือกผ่าน LINE (จำลอง)</button></div>`,{onMount:sh=>{$$('[data-fi]',sh).forEach(b=>b.onclick=()=>{closeSheet();setTimeout(()=>push('duel',{f:FRIENDS[+b.dataset.fi]}),150)});$('#sl',sh).onclick=()=>{closeSheet();setTimeout(()=>shareSheet('challenge'),300)}}})}
SC.duel=({f})=>({noRefresh:true,nav:gnav('ดวลกับ '+f.n),body:'<div class="stage" id="stage" style="padding-top:calc(var(--st) + 128px)"></div>',
 extra:`<div class="hud" style="top:calc(var(--st) + 56px)"><div style="flex:1"><div class="cap">คุณ <b id="ys">0</b>/5</div><div class="prog"><i id="yp" style="width:0"></i></div></div><div style="width:18px;text-align:center">⚔️</div><div style="flex:1"><div class="cap">${f.n} <b id="fs">0</b>/5</div><div class="prog"><i id="fp" style="width:0;background:${f.c}"></i></div></div></div>`,
 mount(el){gameQuit(el);const words=gameWords(),qs=pickN(words,5).map((w,i)=>makeQ(w,['zh2th','th2zh','zh2th','th2zh','zh2th'][i],words));let i=0,me=0,fr=0,fd=0,lock=false,alive=true,over=false;const stage=$('#stage',el);const p=.55+Math.min(f.s,20)/100;
  const ft=setInterval(()=>{if(fd>=5||!alive){clearInterval(ft);return}fd++;if(Math.random()<p)fr++;$('#fp',el).style.width=fd/5*100+'%';$('#fs',el).textContent=fr},2600);
  function show(){lock=false;stage.innerHTML=qHtml(qs[i]);stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in')}
  stage.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock||!alive)return;lock=true;const q=qs[i],k=+o.dataset.i,ok=k===q.ans;$$('.opt',stage).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===k)x.classList.add('bad')});
   if(ok){me++;vib(10)}else{addMistake(q.w);vib([25,30,25])}$('#ys',el).textContent=me;i++;$('#yp',el).style.width=i/5*100+'%';
   setTimeout(()=>{if(i>=5)fin();else show()},650)};
  function fin(){alive=false;clearInterval(ft);const futureF=fr+Math.round((5-fd)*p);const win=me>futureF||(me===futureF&&fd<5);if(win)S.duelWins++;let xp=evX(win?20:8),coins=evC(win?25:5);if(win&&evOn('duelday'))coins+=30;addXp(xp,null,1);addCoins(coins,1);bumpCnt('game',1);bumpCnt('social',1);save();
   replace('result',{title:win?'คุณชนะ!':'แพ้นิดเดียว',mascot:win?'celebrate':'wrong',sub:`คุณ ${me} - ${futureF} ${f.n}`,xp,coins,stats:[['คุณ',me+'/5'],[f.n,futureF+'/5']],retry:null,share:{kind:win?'win':'lose',text:`ฉัน ${me}-${futureF} ${f.n}`,f}})}
  stage.innerHTML=`<div class="center pop" style="padding-top:6px"><div style="width:210px;height:210px;margin:0 auto">${M('duel')}</div><div class="large" style="padding:0">คุณ VS ${f.n}</div><p class="cap mt8">เตรียมตัว! 5 ข้อ ตอบให้เร็วและถูก</p></div>`;setTimeout(()=>{if(alive)show()},1400);this.stop=()=>{alive=false;clearInterval(ft)}},unmount(){this.stop&&this.stop()}});

/* ----- ผลลัพธ์ (ใช้ร่วม) ----- */
SC.result=p=>({nav:'<header class="nav"></header>',noRefresh:true,body:`<div class="center" style="padding:calc(var(--st) + 30px) 20px 0"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M(p.mascot||'celebrate')}</div>
 <div class="large" style="padding:6px 0 0">${p.title}</div><div style="font-size:16px;color:var(--sub2);margin-top:2px">${p.sub||''}</div></div>
 <div class="stat mt20 fade-in"><div><b style="color:var(--red)">+${p.xp}</b><small>XP</small></div><div><b style="color:#B07A12">+${p.coins}</b><small>เหรียญ</small></div></div>
 ${p.stats?`<div class="group mt16 fade-in">${p.stats.map(s=>`<div class="row noic" style="min-height:52px"><span class="tx"><b style="font-weight:500">${s[0]}</b></span><span class="val" style="color:var(--ink);font-weight:600">${s[1]}</span></div>`).join('')}</div>`:''}
 <p class="cap center mt12">XP และเหรียญนับรวมในสตรีคและเป้าหมายรายวัน</p><p class="cap center mt8"><span class="demo">ตัวอย่างทดลอง</span></p>`,
 extra:`<div class="dock">${p.retry?`<button class="pill press" data-sa="again" data-g="${p.retry}"><b>เล่นอีกครั้ง</b></button>`:`<button class="pill press" data-sa="rback"><b>${p.back==='review'?'กลับไปรายการทบทวน':'เสร็จแล้ว'}</b></button>`}
 <div style="display:flex;gap:10px;margin-top:12px">${p.share?`<button class="pill sm ghost press" data-sa="share">แชร์ผลไป LINE</button>`:''}${p.retry?`<button class="pill sm ghost press" data-sa="rback">กลับ</button>`:''}</div></div>`,
 mount(el){if(p.xp>=8)confetti(70);el.addEventListener('click',e=>{const t=e.target.closest('[data-sa]');if(!t)return;const a=t.dataset.sa;
  if(a==='again'){replace('game_'+t.dataset.g,{})}else if(a==='rback')pop();else if(a==='share')shareSheet('result',p.share)})}});

/* ----- หีบ + วงล้อ ----- */
const WHEEL=[['🪙 5',{c:5}],['🪙 10',{c:10}],['⭐ 10 XP',{x:10}],['🪙 20',{c:20}],['🪙 50',{c:50}],['⭐ 15 XP',{x:15}]];
SC.chest=()=>({title:'ของรางวัลประจำวัน',noRefresh:true,body:`<div class="large">ของรางวัลประจำวัน</div>
 <div class="seg" id="sg"><div class="th" style="width:calc(50% - 3px)"></div><button class="on" data-t="0">เปิดหีบ</button><button data-t="1">วงล้อ</button></div>
 <div id="cb"></div>${DEMO}`,
 mount(el){const cb=$('#cb',el),sg=$('#sg',el);let tab=0;
  const tabs=()=>{$$('button',sg).forEach(b=>b.classList.toggle('on',+b.dataset.t===tab));$('.th',sg).style.transform=`translateX(${tab*100}%)`;tab?wheel():chests()};
  $$('button',sg).forEach(b=>b.onclick=()=>{tab=+b.dataset.t;vib(6);tabs()});
  const prize=p=>{if(p.c)addCoins(p.c);if(p.x)addXp(p.x);save()};
  function chests(){const done=S.chestDay===today();cb.innerHTML=`<div class="center" style="padding-top:12px"><div style="width:170px;height:170px;margin:0 auto" class="float">${M(done?'chest':'gift')}</div><div class="h2">${done?'วันนี้เปิดไปแล้ว':'เลือกหีบ 1 ใบ'}</div><p class="cap mt8">${done?'กลับมาใหม่พรุ่งนี้นะ':'ลุ้นเหรียญ 15–60 หรือ XP โบนัส'}</p></div>
   <div class="chestwrap mt20">${[0,1,2].map(i=>`<button class="chestb press" data-c="${i}"><span>🎁</span><small></small></button>`).join('')}</div>`;
   if(done)$$('.chestb',cb).forEach(b=>b.style.opacity=.5);
   $$('.chestb',cb).forEach(b=>b.onclick=()=>{if(S.chestDay===today()){toast('วันนี้เปิดไปแล้ว กลับมาใหม่พรุ่งนี้');return}S.chestDay=today();const r=pickOne([{c:15},{c:25},{c:40},{c:60},{x:15}]);const others=shuffle([{c:15},{c:25},{x:10},{c:40}]);prize(r);vib([20,40,20]);
    $$('.chestb',cb).forEach((x,i)=>{const mine=x===b;const pr=mine?r:others.pop();x.querySelector('span').textContent=mine?'✨':'📦';x.querySelector('small').textContent=pr.c?'🪙 '+pr.c:'⭐ '+pr.x+' XP';x.style.opacity=mine?1:.55;if(mine){x.style.transform='scale(1.08)';x.style.borderColor='#E8B64A'}});
    floatXp(r.c?'+'+r.c+' 🪙':'+'+r.x+' XP',b);confetti(60);toast(r.c?`ได้เหรียญ ${r.c} เหรียญ!`:`ได้ XP โบนัส ${r.x}!`)})}
  function wheel(){const done=S.spinDay===today();const seg=360/6;
   cb.innerHTML=`<div class="center" style="padding-top:22px"><div class="wheel"><div style="position:absolute;left:50%;top:-10px;margin-left:-12px;z-index:3;font-size:26px;color:var(--red);line-height:1">▼</div>
   <div id="wh" style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(#FBF1EC 0 60deg,#fff 60deg 120deg,#FBF1EC 120deg 180deg,#fff 180deg 240deg,#FFE9B8 240deg 300deg,#fff 300deg 360deg);box-shadow:0 8px 30px rgba(60,40,30,.15),inset 0 0 0 4px #27211E;transition:transform 4s cubic-bezier(.12,.7,.15,1)">${WHEEL.map((w,i)=>`<div style="position:absolute;left:50%;top:50%;transform:rotate(${i*seg+seg/2}deg) translateY(-82px) translateX(-50%);transform-origin:0 0;font-size:14px;font-weight:700;width:70px;text-align:center;margin-left:0">${w[0]}</div>`).join('')}</div>
   <div style="position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.2);z-index:2;padding:4px">${M('wave')}</div></div>
   <p class="cap mt16">${done?'วันนี้หมุนแล้ว กลับมาพรุ่งนี้':'หมุนฟรีวันละ 1 ครั้ง'}</p></div><div class="pad mt16"><button class="pill row1 press" id="sp" ${done?'disabled':''}>${done?'หมุนแล้ววันนี้':'หมุนวงล้อ'}</button></div>`;
   $('#sp',cb).onclick=()=>{if(S.spinDay===today())return;S.spinDay=today();const k=Math.random()*WHEEL.length|0;const ang=360*5+(360-(k*seg+seg/2));$('#wh',cb).style.transform=`rotate(${ang}deg)`;$('#sp',cb).disabled=true;vib(30);
    setTimeout(()=>{prize(WHEEL[k][1]);vib([20,40,20]);confetti(60);toast('ได้ '+WHEEL[k][0]+'!');$('#sp',cb).textContent='หมุนแล้ววันนี้'},4100)}}
  tabs()}});

/* ----- ร้านค้า ----- */
SC.shop=()=>({title:'ร้านค้าเหรียญ',body:`<div class="large">ร้านค้าเหรียญ</div>
 <div class="center fade-in" style="margin:6px 0 8px"><div style="display:inline-block">${llama('wave',150,{acc:true,cls:'float'})}</div><div><span class="chip coin">${COIN.replace('<svg','<svg width="16" height="16"')} ${S.coins} เหรียญ</span></div></div>
 <div class="shopgrid mt16">${SHOP.map(it=>{const own=S.own.includes(it.id),on=S.eq[it.slot]===it.id;return `<div class="si"><div class="e">${it.e}</div><b>${it.n}</b><small>${it.slot==='hat'?'หัว':'ใบหน้า'}</small><button class="pill press ${on?'ghost':own?'dark':''}" data-buy="${it.id}">${on?'ถอดออก':own?'ใส่':it.p+' 🪙 ซื้อ'}</button></div>`}).join('')}</div>
 <p class="cap center" style="padding:18px 30px 0">ของแต่งตัวเป็นแค่ลูกเล่นหน้าตา ใช้เหรียญที่ได้จากบทเรียนและเกมเท่านั้น</p>${DEMO}`,
 mount(el){$$('[data-buy]',el).forEach(b=>b.onclick=()=>{const it=SHOP.find(s=>s.id===b.dataset.buy);
  if(!S.own.includes(it.id)){if(S.coins<it.p){vib([30,40,30]);toast('เหรียญไม่พอ ไปเก็บจากบทเรียนและเกมก่อนนะ');return}S.coins-=it.p;S.own.push(it.id);S.eq[it.slot]=it.id;toast('ซื้อ '+it.n+' แล้ว!');confetti(40)}
  else S.eq[it.slot]=S.eq[it.slot]===it.id?null:it.id;save();vib(12);refresh();bumpChips()})}});
