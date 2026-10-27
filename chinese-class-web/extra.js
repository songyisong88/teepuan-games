/* ===== ชุดที่ 2: ฝึกพูด · ฝึกฟัง · บอสหมึกยักษ์ · สตรีคขาด ===== */
const PAGEH=(id,max,label)=>`<div class="hud" style="top:calc(var(--st) + 56px)"><div style="flex:1"><div class="cap">${label} <b id="${id}n">1</b>/${max}</div><div class="prog"><i id="${id}p" style="width:0"></i></div></div></div>`;

/* ----- ฝึกพูด (จำลอง: ไม่ได้ฟังเสียงจริง) ----- */
SC.game_speak=()=>({noRefresh:true,nav:gnav('ฝึกพูด'),body:'<div class="stage" id="stage" style="padding-top:calc(var(--st) + 100px)"></div>',extra:PAGEH('sk',5,'คำที่'),
 mount(el){gameQuit(el);const ws=pickN(gameWords(),5),stage=$('#stage',el);let i=0,sum=0,busy=false,alive=true,sc=0;
  function show(){busy=false;sc=0;const w=ws[i];$('#skn',el).textContent=i+1;$('#skp',el).style.width=i/5*100+'%';
   stage.innerHTML=`<div class="center fade-in"><div style="width:120px;height:120px;margin:0 auto -6px">${M('speaking')}</div><div class="cap">พูดตาม${MASCOT_NAME}</div>
    <div class="bigzh zh" style="font-size:${w.zh.length>2?64:88}px">${w.zh}</div><div style="font-size:26px;font-weight:500">${pyHtml(w.py)}</div><div style="font-size:19px;font-weight:600;margin-top:6px">${w.th}</div>
    <button class="audio press" data-act="audio" data-t="${w.zh}" style="margin-top:12px">${SPK}</button><div class="cap mt8">แตะลำโพงเพื่อฟังก่อน</div>
    <button class="mic press" id="mic" aria-label="พูด">🎤</button><div class="cap" id="mh">แตะไมค์แล้วพูดตามได้เลย</div><div id="sres" class="mt12"></div></div>`;
   $('#mic',el).onclick=rec}
  function rec(){if(busy||!alive)return;busy=true;vib(12);const m=$('#mic',el);m.classList.add('rec');$('#mh',el).innerHTML='<span class="wv"><i></i><i></i><i></i><i></i><i></i></span> กำลังฟัง…';
   setTimeout(()=>{if(!alive)return;m.classList.remove('rec');sc=70+Math.floor(Math.random()*29);sum+=sc;const st=sc>=92?3:sc>=82?2:1;
    $('#mh',el).textContent='';$('#sres',el).innerHTML=`<div class="pop"><div style="font-size:30px;letter-spacing:4px">${[1,2,3].map(n=>`<span style="filter:${n<=st?'none':'grayscale(1) opacity(.3)'}">⭐</span>`).join('')}</div><div style="font-size:22px;font-weight:700;color:${st>2?'var(--ok)':'var(--ink)'}">${sc}/100</div><div class="cap">${st>2?'สำเนียงดีมาก!':st>1?'ดีแล้ว ลองอีกนิดจะเป๊ะ':'ใกล้แล้ว ฟังอีกครั้งแล้วลองใหม่'} · คะแนนจำลอง</div></div><div class="pad mt16"><button class="pill sm press" id="nx"><b>${i>=4?'ดูผล':'คำต่อไป'}</b></button><button class="pill sm ghost press mt12" id="rt">ลองพูดอีกครั้ง</button></div>`;
    vib(14);$('#nx',el).onclick=()=>{i++;if(i>=5)fin();else show()};$('#rt',el).onclick=()=>{sum-=sc;show()}},1900)}
  function fin(){alive=false;const avg=Math.round(sum/5);gameEnd(el,'speak',avg,{xp:15+Math.round(avg/10),coins:5+Math.round(avg/20),mascot:avg>=85?'celebrate':'speaking',sub:`คะแนนพูดเฉลี่ย ${avg}/100 (จำลอง)`,stats:[['คำที่ฝึก','5'],['คะแนนเฉลี่ย',avg+'/100']]})}
  show();this.stop=()=>{alive=false}},unmount(){this.stop&&this.stop()}});

/* ----- ฝึกฟัง ----- */
SC.game_listen=()=>({noRefresh:true,nav:gnav('ฝึกฟัง'),body:'<div class="stage" id="stage" style="padding-top:calc(var(--st) + 100px)"></div>',extra:PAGEH('ls',6,'ข้อ'),
 mount(el){gameQuit(el);const words=gameWords(),qs=pickN(words,6).map(w=>makeQ(w,'audio',words)),stage=$('#stage',el);let i=0,ok=0,lock=false,alive=true;
  function show(){lock=false;$('#lsn',el).textContent=i+1;$('#lsp',el).style.width=i/6*100+'%';stage.innerHTML=`<div style="width:120px;height:120px;margin:0 auto -14px">${M('listening')}</div>`+qHtml(qs[i]);stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in');const a=$('[data-auto]',stage);if(a)setTimeout(()=>alive&&speak(qs[i].w.zh,a),350)}
  stage.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock||!alive)return;lock=true;const q=qs[i],k=+o.dataset.i,good=k===q.ans;$$('.opt',stage).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===k)x.classList.add('bad')});
   if(good){ok++;vib(10);floatXp('+3 XP',o)}else{addMistake(q.w);vib([25,30,25])}
   setTimeout(()=>{i++;if(i>=6)fin();else if(alive)show()},good?650:1000)};
  function fin(){alive=false;gameEnd(el,'listen',ok,{xp:ok*3+4,coins:ok,mascot:ok>=5?'celebrate':'listening',sub:`ฟังถูก ${ok} จาก 6 ข้อ`,stats:[['ฟังถูก',ok+'/6']]})}
  show();this.stop=()=>{alive=false}},unmount(){this.stop&&this.stop()}});

/* ----- บอสหมึกยักษ์ (จำลอง: เพื่อนในห้องช่วยตี) ----- */
SC.game_boss=()=>({noRefresh:true,nav:gnav('บอสหมึกยักษ์'),body:'<div class="stage" id="stage" style="padding-top:calc(var(--st) + 84px)"></div>',
 extra:`<div class="hud" style="top:calc(var(--st) + 52px);flex-direction:column;align-items:stretch;gap:5px"><div style="display:flex;justify-content:space-between"><span class="cap">บอสหมึกยักษ์ · ห้องช่วยกันตี</span><b id="bhp" style="font-size:14px"></b></div><div class="prog"><i id="bbar" style="background:#7B4BC4;width:100%"></i></div></div>`,
 mount(el){gameQuit(el);const B=S.boss;if(B.hp<=0&&B.day!==today())B.hp=B.max=260;const stage=$('#stage',el);
  if(B.hp<=0){$('#bhp',el).textContent='0/'+B.max;$('#bbar',el).style.width='0';stage.innerHTML=`<div class="center fade-in"><div style="width:200px;height:170px;margin:0 auto;filter:grayscale(.6)">${M('boss')}</div><div class="large" style="padding:4px 0">บอสพ่ายแล้ว!</div><p class="cap" style="padding:0 30px">ห้องของเราชนะแล้ววันนี้ พรุ่งนี้บอสตัวใหม่จะมา</p><div class="pad mt20"><button class="pill press" data-sa="gquit"><b>กลับ</b></button></div></div>`;this.stop=()=>{};return}
  const words=gameWords(),qs=pickN(words,8).map((w,i)=>makeQ(w,['zh2th','th2zh'][i%2],words));let hp=B.hp,i=0,mine=0,combo=0,lock=false,alive=true;
  const NAMES=['พี่ต้น','น้องฝน','พี่เจน','น้องบอส'];
  const hud=()=>{$('#bhp',el).textContent=Math.max(0,hp)+'/'+B.max;$('#bbar',el).style.width=Math.max(0,hp)/B.max*100+'%'};
  const hit=(n)=>{const b=$('#bimg',el);if(!b)return;b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')};
  stage.innerHTML=`<div id="bimg" style="width:150px;height:128px;margin:0 auto">${M('boss')}</div><div class="cap center" id="feed" style="height:18px;margin:2px 0 6px">เพื่อนในห้องกำลังช่วยตี…</div><div id="qa"></div>`;
  const qa=$('#qa',el);
  const mates=setInterval(()=>{if(!alive)return;const d=6+Math.floor(Math.random()*9);hp-=d;hud();$('#feed',el).textContent=`${pickOne(NAMES)} ตีบอส −${d}`;hit();if(hp<=0)fin()},2400);
  function show(){lock=false;qa.innerHTML=qHtml(qs[i]);qa.classList.remove('fade-in');void qa.offsetWidth;qa.classList.add('fade-in')}
  qa.onclick=e=>{const o=e.target.closest('.opt');if(!o||lock||!alive)return;lock=true;const q=qs[i],k=+o.dataset.i,good=k===q.ans;$$('.opt',qa).forEach((x,j)=>{if(j===q.ans)x.classList.add('ok');else if(j===k)x.classList.add('bad')});
   if(good){combo++;const d=15+(combo>=3?10:0);mine+=d;hp-=d;vib(14);floatXp('−'+d+' HP',o);hit();$('#feed',el).textContent=combo>=3?`คอมโบ x${combo}! ตีแรงขึ้น`:'ตีโดน!'}else{combo=0;addMistake(q.w);hp=Math.min(B.max,hp+5);vib([25,30,25]);$('#feed',el).textContent='พลาด! บอสฟื้น +5'}
   hud();setTimeout(()=>{if(hp<=0)return;i++;if(i>=qs.length)fin();else if(alive)show()},good?650:950)};
  function fin(){if(!alive)return;alive=false;clearInterval(mates);const win=hp<=0;B.hp=Math.max(0,hp);if(win){B.day=today();S.bossWins++}save();
   gameEnd(el,'boss',mine,{title:win?'ห้องเราชนะบอส!':'ตีบอสไปได้เยอะเลย',xp:(win?30:10)+Math.round(mine/5),coins:(win?40:10)+Math.round(mine/10),mascot:win?'celebrate':'streak',sub:win?`ตีบอสไป ${mine} แต้ม · บอสพ่ายแล้ว`:`ตีไป ${mine} แต้ม · บอสเหลือ HP ${Math.max(0,hp)}`,stats:[['แต้มของคุณ',mine],['HP บอสที่เหลือ',Math.max(0,hp)+'/'+B.max]]})}
  hud();show();this.stop=()=>{alive=false;clearInterval(mates)}},unmount(){this.stop&&this.stop()}});

/* ----- สตรีคขาด ----- */
