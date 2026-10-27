/* บทเรียน: หน้าหลัก เส้นทาง บทเรียน ควิซ จบบท ทบทวน */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ROW=(bg,em,t,sub,right,attrs)=>`<button class="row press" ${attrs||''}><span class="ic" style="background:${bg}">${em}</span><span class="tx"><b>${t}</b>${sub?`<small>${sub}</small>`:''}</span>${right===undefined?CHEV:right}</button>`;
const dateTxt=()=>new Date(Date.now()+S.shift*864e5).toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
const DEMO=`<p class="cap center" style="padding:22px 30px 0"><span class="demo">ตัวอย่างทดลอง</span><br><span style="display:block;margin-top:6px">ข้อมูลเก็บในเครื่องนี้เท่านั้น ไม่มีระบบหลังบ้านและไม่มีการชำระเงิน</span><span style="display:block;margin-top:4px;font-size:12px;color:var(--sub)">${NAME_NOTE}</span></p>`;

/* ----- ควิซ ----- */
const LET='ABCD';
function makeQ(w,type,pool){const p=pool.length>=4?pool:ALLW;const others=shuffle(p.filter(x=>x.zh!==w.zh)).slice(0,3);const opts=shuffle([w,...others]);
 return {w,type,opts,ans:opts.findIndex(o=>o.zh===w.zh)}}
function qHtml(q){const w=q.w;let top='',fmt;
 if(q.type==='zh2th'){top=`<div class="cap" style="font-size:14px">คำนี้แปลว่าอะไร</div><div class="bigzh zh" style="font-size:${w.zh.length>2?64:88}px">${w.zh}</div><div style="font-size:26px;font-weight:500;margin-top:2px">${pyHtml(w.py)}</div>`;fmt=o=>o.th}
 else if(q.type==='th2zh'){top=`<div class="cap" style="font-size:14px">คำจีนของคำว่า</div><div style="font-size:38px;font-weight:700;margin:12px 0 4px">${w.th}</div><div class="cap">เลือกคำที่ถูกต้อง</div>`;fmt=o=>`<span class="zh" style="font-size:26px">${o.zh}</span> <span class="cap" style="margin-left:6px">${pyPlain(o.py)}</span>`}
 else{top=`<div class="cap" style="font-size:14px">ฟังเสียงแล้วเลือกความหมาย</div><button class="audio press" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`;fmt=o=>o.th}
 return `<div class="center">${top}</div><div class="group opts mt20" style="margin-top:22px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span>${fmt(o)}</span></button>`).join('')}</div>`}
function lessonQs(L){const types=['zh2th','th2zh','audio','zh2th','th2zh','audio'];const ws=shuffle(L.words);return [...ws.map((w,i)=>makeQ(w,types[i],ALLW)),...shuffle(L.words).slice(0,2).map((w,i)=>makeQ(w,types[4+i],ALLW))].map(q=>({k:'q',q}))}
function cardHtml(w,n,t){return `<div class="center"><div class="cap" style="letter-spacing:1.5px">คำใหม่ ${n}/${t}</div><div class="bigzh zh" style="font-size:${w.zh.length>2?84:w.zh.length>1?116:130}px">${w.zh}</div>
 <div style="font-size:30px;font-weight:500;margin-top:4px">${pyHtml(w.py)}</div><div style="font-size:27px;font-weight:600;margin-top:10px;padding:0 20px">${w.th}</div>
 <button class="audio press" data-act="audio" data-t="${w.zh}">${SPK}</button></div>
 <div class="card exc" style="margin-top:34px"><div style="position:absolute;right:6px;top:-92px;width:96px;height:96px">${M('teach')}</div>
 <div class="zh" style="font-size:23px;line-height:1.35">${zhHtml(w.ex,w.exPy)}</div><div style="font-size:13.5px;margin-top:3px;font-weight:500">${pyHtml(w.exPy)}</div><div style="font-size:15.5px;margin-top:5px;color:var(--sub2)">${w.exTh}</div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px"><button class="cap press" data-sa="say" data-t="${w.ex}" style="color:var(--red);font-weight:600;display:flex;align-items:center;gap:4px"><span style="width:16px;height:16px;display:flex">${SPK}</span>ฟังประโยค</button><button class="cap press" data-sa="rep" data-z="${w.zh}">แจ้งข้อผิด</button></div></div>`}

function session(el,steps,cb,{review=false}={}){let i=0,correct=0,run=0,locked=false,wrong=[];
 const stage=$('#stage',el),dock=$('#dock',el),fb=$('#fb',el),pg=$('#pg',el),pc=$('#pc',el),nCards=steps.filter(s=>s.k==='c').length;let cardN=0;
 function show(){fb.classList.remove('show');locked=false;const s=steps[i];pg.style.width=(i/steps.length*100)+'%';pc.textContent=(i+1)+' / '+steps.length;
  if(s.k==='c'){cardN++;stage.innerHTML=cardHtml(s.w,cardN,nCards);dock.innerHTML=`<button class="pill row1 press" data-sa="next">ต่อไป</button>`}
  else{stage.innerHTML=qHtml(s.q);dock.innerHTML='';const a=$('[data-auto]',stage);if(a)setTimeout(()=>speak(s.q.w.zh,a),350)}
  stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in');$('.scroller',el).scrollTop=0}
 function next(){i++;if(i>=steps.length){pg.style.width='100%';setTimeout(()=>cb({correct,total:steps.filter(s=>s.k==='q').length,wrong}),250)}else show()}
 function answer(btn){if(locked)return;locked=true;const q=steps[i].q,k=+btn.dataset.i,ok=k===q.ans;const os=$$('.opt',stage);
  os.forEach((o,j)=>{if(j===q.ans){o.classList.add('ok');$('.k',o).innerHTML=CHECK}else if(j===k)o.classList.add('bad');else o.classList.add('dim')});
  const w=q.w;if(ok){correct++;run++;vib(12);if(review)fixMistake(w);floatXp('+10 XP',btn)}else{run=0;vib([30,40,30]);addMistake(w);wrong.push(w.zh)}
  fb.innerHTML=`<div class="grabber"></div><div class="fh"><div class="t"><b style="color:${ok?'var(--ok)':'var(--warn)'}">${ok?'ถูกต้อง!':'ยังไม่ถูก ไม่เป็นไรนะ'}</b><small>${ok?`${MASCOT_NAME}ภูมิใจ · +10 XP${run>1?` · ตอบถูกติดต่อกัน ${run} ข้อ`:''}`:MASCOT_NAME+'เก็บคำนี้ไว้ทบทวนให้แล้ว'}</small></div><div style="width:84px;height:84px">${M(ok?'correct':'wrong')}</div></div>
  ${ok?'':`<div class="ans"><span class="zh" style="font-size:20px">${w.zh}</span> &nbsp;${pyHtml(w.py)} &nbsp;= <b>${w.th}</b></div>`}
  <button class="pill row1 press ${ok?'ok':'warn'}" style="height:52px;border-radius:26px;margin-top:14px" data-sa="next">ต่อไป</button>`;
  setTimeout(()=>fb.classList.add('show'),250)}
 el.addEventListener('click',e=>{const t=e.target.closest('[data-sa],.opt');if(!t||!el.contains(t))return;
  if(t.classList.contains('opt')){answer(t);return}
  const a=t.dataset.sa;if(a==='next'){vib(8);next()}else if(a==='say')speak(t.dataset.t);else if(a==='rep')reportSheet(t.dataset.z);else if(a==='quit')quitSheet()});
 show()}
function quitSheet(){openSheet(`<div class="center" style="padding:0 24px"><div style="width:120px;height:120px;margin:0 auto">${M('bow')}</div><div class="h2 mt8">ออกจากบทเรียนนี้?</div><p style="color:var(--sub2);margin:6px 0 18px;font-size:15px">ความคืบหน้าในรอบนี้จะไม่ถูกบันทึก</p><button class="pill sm press" data-act="closesheet">เรียนต่อ</button><button class="pill sm ghost press mt12" id="qq">ออก</button></div>`,{onMount:sh=>$('#qq',sh).onclick=()=>{closeSheet();pop()}})}
function reportSheet(z){openSheet(`<div style="padding:0 20px"><div class="h2">แจ้งข้อผิดในคำว่า ${z}</div><div class="group mt12" style="margin:12px 0 0">${['พินอินไม่ถูก','คำแปลไม่ถูก','ประโยคตัวอย่างแปลก','อื่น ๆ'].map(t=>`<button class="row noic press" data-rp>${`<span class="tx"><b style="font-weight:500">${t}</b></span>`}</button>`).join('')}</div><p class="cap mt12 center">ตัวอย่างทดลอง — ยังไม่ได้ส่งถึงใครจริง</p></div>`,{onMount:sh=>$$('[data-rp]',sh).forEach(b=>b.onclick=()=>{closeSheet();toast('ขอบคุณที่แจ้ง! (จำลอง)')})})}
const sessNav=`<div class="seshnav"><button class="x" data-sa="quit" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i id="pg" style="width:0"></i></div><div class="cap" id="pc" style="font-weight:600;color:var(--red);min-width:40px;text-align:right"></div></div>`;
const sessExtra='<div class="dock" id="dock"></div><div class="fb" id="fb"></div>';

SC.lesson=({id})=>{const L=LESSONS.find(l=>l.id===id);
 return {nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,
 mount(el){const steps=[...L.words.map(w=>({k:'c',w})),...lessonQs(L)];
  session(el,steps,res=>finishLesson(L,res))}}};
function finishLesson(L,res){const first=!isDone(L.id);const ratio=res.correct/res.total;const stars=ratio>=.9?3:ratio>=.6?2:1;
 let xp=res.correct*10+10,coins=5+res.correct*2;if(!first){xp=Math.round(xp/2);coins=Math.round(coins/2)}
 const newWords=first?L.words.length:0;if(first){S.done.push(L.id)}S.stars[L.id]=Math.max(S.stars[L.id]||0,stars);
 const wasFirstToday=S.lastDay!==today();addCoins(coins);addXp(xp);save();
 replace('complete',{L,res,xp,coins,stars,first,newWords,streakNew:wasFirstToday})}
SC.complete=({L,res,xp,coins,stars,first,newWords,streakNew})=>({nav:'<header class="nav"></header>',noRefresh:true,
 body:`<div class="center" style="padding:calc(var(--st) + 30px) 20px 0"><div class="pop" style="width:250px;height:230px;margin:0 auto">${M('levelup')}</div>
 <div class="cap mt8">บทที่ ${L.id} · ${L.th}</div><div class="large" style="padding:2px 0">${first?'เรียนจบแล้ว!':'ทบทวนเรียบร้อย!'}</div>
 <div style="font-size:34px;letter-spacing:6px;margin-top:4px">${[1,2,3].map(n=>`<span class="pop" style="display:inline-block;animation-delay:${.2+n*.15}s;filter:${n<=stars?'none':'grayscale(1) opacity(.3)'}">⭐</span>`).join('')}</div></div>
 <div class="stat mt20 fade-in" style="animation-delay:.3s"><div><b style="color:var(--red)">+${xp}</b><small>XP</small></div><div><b style="color:#B07A12">+${coins}</b><small>เหรียญ</small></div><div><b>${res.correct}/${res.total}</b><small>ตอบถูก</small></div></div>
 <div class="group mt20 fade-in" style="animation-delay:.4s">
  ${ROW('#FDECEC','🔥',`สตรีค ${curStreak()} วัน`,streakNew?'วันนี้นับเป็นวันเรียนแล้ว':'ต่อเนื่องดีมาก','')}
  ${newWords?ROW('#E7F8EE','🎮',`ปลดล็อกคำในเกม +${newWords} คำ`,L.words.map(w=>w.zh).join(' · '),'', 'style="cursor:default"'):''}
  ${res.wrong.length?ROW('#FDF3E6','📝',`ข้อที่พลาด ${res.wrong.length} ข้อ`,'เพิ่มในรายการทบทวนแล้ว',CHEV,'data-go="review"'):''}</div>
 <p class="cap center mt12"><span class="demo">ตัวอย่างทดลอง</span></p>`,
 extra:`<div class="dock">${first?`<button class="pill press" data-act="finishgo" data-to="games"><b>เล่นเกมคำใหม่</b><small>ใช้คำที่เพิ่งเรียนเก็บเหรียญ</small></button>`:`<button class="pill press" data-act="finishgo" data-to="home"><b>กลับหน้าหลัก</b></button>`}<button class="pill sm ghost press mt12" data-act="finishgo" data-to="${first?'home':'path'}">${first?'กลับหน้าหลัก':'ไปที่บทเรียน'}</button></div>`,
 mount(){confetti(110);vib([20,30,20,30,40])}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act=finishgo]');if(!t)return;const to=t.dataset.to;vib(8);mountRoot(to==='games'?'game':to==='path'?'book':'home')});

/* ----- ทบทวน ----- */
SC.review=()=>{const ws=mistakeWords();return {title:'ทบทวนข้อผิด',body:`<div class="large">ทบทวนข้อผิด</div>`+(ws.length?`
 <p class="cap" style="padding:4px 20px 14px">มี ${ws.length} คำที่ควรทบทวน · ตอบถูกแล้วจะหายไปจากรายการ</p><div class="group">${ws.map(w=>`<div class="row noic" style="min-height:68px"><span class="tx"><b><span class="zh" style="font-size:22px">${w.zh}</span> <span style="font-size:14px;font-weight:500">${pyHtml(w.py)}</span></b><small>${w.th} · พลาด ${S.mistakes[w.zh]} ครั้ง</small></span><button class="audio press" style="width:42px;height:42px;margin:0" data-act="audio" data-t="${w.zh}"><span style="width:20px;display:flex">${SPK}</span></button></div>`).join('')}</div>
 <div class="dock"><button class="pill press" data-act="reviewgo"><b>ฝึกทบทวน</b><small>${Math.min(6,ws.length)} ข้อ</small></button></div>`:
 `<div class="empty" style="padding-top:50px"><div style="width:200px;height:200px">${M('empty')}</div><b>ยังไม่มีข้อที่ต้องทบทวน</b><span>เยี่ยมมาก! เมื่อตอบพลาดในบทเรียนหรือเกม คำนั้นจะมาอยู่ที่นี่</span></div>`)}};
document.addEventListener('click',e=>{if(e.target.closest('[data-act=reviewgo]'))push('rsession')});
SC.rsession=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,mount(el){
 const ws=shuffle(mistakeWords()).slice(0,6);if(!ws.length){pop();return}const types=['zh2th','th2zh','audio'];
 session(el,ws.map((w,i)=>({k:'q',q:makeQ(w,types[i%3],ALLW)})),res=>{const xp=res.correct*8;addXp(xp);addCoins(res.correct*2);replace('result',{title:'ทบทวนเสร็จแล้ว',mascot:res.correct>=res.total*.6?'correct':'wrong',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:res.correct*2,stats:[['ตอบถูก',res.correct+'/'+res.total],['ยังต้องทบทวน',mistakeWords().length]],back:'review'})},{review:true})}});

/* ----- เส้นทาง ----- */
SC.path=()=>{const nl=nextLesson();const dn=S.done.length;
 const nodes=LESSONS.map((L,k)=>{const done=isDone(L.id),cur=nl&&nl.id===L.id,lock=!done&&!cur;const r=k%2?' r':'';
  return `<button class="node${r} press" data-go="lesson" data-id="${L.id}"><div class="nd ${done?'done':cur?'cur':'lock'}">${done?CHECK:lock?LOCK:L.id}</div><div class="nt"><b>${L.th}</b><span class="zh">${L.zh}</span><br><small>${done?'⭐'.repeat(S.stars[L.id]||1):lock?'ยังล็อกอยู่':'บทถัดไป · '+L.words.length+' คำ'}</small></div></button>`}).join('');
 return {title:'บทเรียน',body:`<div class="large">บทเรียน</div>
 <div class="unit fade-in" style="margin-top:12px"><div class="cap">หน่วย 1 · ระดับเริ่มต้นแนว HSK 1</div><b>ทักทายและแนะนำตัว</b><div class="prog"><i style="width:${dn/LESSONS.length*100}%"></i></div><div class="cap" style="margin-top:6px">เรียนแล้ว ${dn} จาก ${LESSONS.length} บท</div>
  <div style="position:absolute;right:6px;bottom:-8px;width:84px;height:84px;opacity:.95">${M(nl?'read':'celebrate')}</div></div>
 <div class="group mt16">${ROW('#FDF3E6','📝','ทบทวนข้อผิด',Object.keys(S.mistakes).length?Object.keys(S.mistakes).length+' คำรอทบทวน':'ยังไม่มี','', 'data-go="review"').replace('<span class="tx">','<span class="tx">')}</div>
 <div class="path"><div class="pathline"></div>${nodes}</div>
 <div class="group" style="opacity:.6">${ROW('#EFE8DE','🔒','หน่วย 2 · ครอบครัวและตัวเลข','เร็ว ๆ นี้ (ตัวอย่างทดลอง)',LOCK.replace('<svg','<svg width="18" height="18" style="color:#B9B0A6"'))}</div>${DEMO}`}};
function lessonSheet(id){const L=LESSONS.find(l=>l.id===id),done=isDone(id),nl=nextLesson(),open=done||(nl&&nl.id===id);
 openSheet(`<div style="padding:0 20px"><div class="cap">บทที่ ${L.id}</div><div style="font-size:24px;font-weight:700">${L.th} <span class="zh" style="font-weight:400">${L.zh}</span></div>
 <div class="group mt12" style="margin:14px 0 0">${L.words.map(w=>`<div class="row noic" style="min-height:52px"><span class="tx"><b style="font-weight:500"><span class="zh" style="font-size:20px">${w.zh}</span> &nbsp;<span style="font-size:13px">${pyHtml(w.py)}</span></b></span><span class="val">${w.th}</span></div>`).join('')}</div>
 ${open?`<button class="pill row1 press mt16" id="ls">${done?'เรียนทบทวนอีกครั้ง':'เริ่มเรียน'}</button>`:`<div class="banner mt16" style="background:#F2ECE4;color:var(--sub2);text-align:center">เรียนบทก่อนหน้าให้จบก่อน เพื่อปลดล็อกบทนี้</div>`}</div>`,{onMount:sh=>{const b=$('#ls',sh);if(b)b.onclick=()=>{closeSheet();setTimeout(()=>push('lesson',{id}),120)}}})}

/* ----- หน้าหลัก ----- */
SC.home=()=>{const nl=nextLesson(),xp=dayXp(),pct=Math.min(1,xp/S.goal),C=2*Math.PI*90;const t=today();
 const wk=Array.from({length:7},(_,k)=>{const d=t-6+k;return `<div>${['อา','จ','อ','พ','พฤ','ศ','ส'][(d+4)%7]}<i class="${dayXp(d)>0?'on':''} ${d===t?'today':''}">${dayXp(d)>0?'✓':''}</i></div>`}).join('');
 const gw=gameWords().length,cdone=S.chestDay===t;
 return {title:BRAND_NAME,body:`${S.from==='line'?'<div class="banner fade-in" style="margin-top:2px">✓ เปิดจาก LINE OA (จำลอง) · เข้าสู่ระบบให้แล้ว</div>':''}
 <div class="hero"><div><div class="cap">${dateTxt()}</div><div class="large" style="padding:2px 0 0">สวัสดี, ${S.name}</div><div class="cap" style="margin-top:2px">${MASCOT_NAME}พาเรียนวันนี้</div></div>${llama('wave',112,{acc:true,cls:'float',style:'margin-bottom:-4px'})}</div>
 <div class="card goal fade-in" style="animation-delay:.08s"><div class="cap" style="font-size:14px">เป้าหมายวันนี้</div>
  <div class="ringw"><svg viewBox="0 0 216 216"><circle cx="108" cy="108" r="90" fill="none" stroke="#F0E9DF" stroke-width="7"/><circle class="ring-fill" cx="108" cy="108" r="90" fill="none" stroke="#C8102E" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C*pct).toFixed(1)} 999" transform="rotate(-90 108 108)"/></svg><div class="ctr"><div class="n">${Math.min(xp,999)}</div><div class="cap" style="margin-top:6px;font-size:15px">จาก ${S.goal} XP</div></div></div>
  <div style="margin-top:14px;font-size:15px;color:var(--sub2)">${xp>=S.goal?'ครบเป้าหมายวันนี้แล้ว เก่งมาก! 🎉':xp>0?'อีกนิดเดียวก็ครบแล้ว':'เริ่มบทแรกของวันนี้กันเลย'}</div>
  <div class="wk">${wk}</div></div>
 <div class="pad mt20 fade-in" style="animation-delay:.16s">${nl?`<button class="pill press" data-go="lesson" data-id="${nl.id}"><b>${S.done.length?'เรียนต่อ':'เริ่มเรียน'}</b><small>บทที่ ${nl.id} · ${nl.zh}</small></button>`:`<button class="pill press" data-go="games"><b>เรียนครบทุกบทแล้ว!</b><small>ไปเล่นเกมทบทวนคำศัพท์</small></button>`}</div>
 <div class="sec">วันนี้ทำอะไรดี</div>
 <div class="group">
  ${ROW('#EAF1FB','🎮','เกมคำศัพท์',gw?gw+' คำพร้อมเล่น':'เรียนบทแรกให้จบเพื่อปลดล็อก',undefined,'data-go="games"')}
  ${ROW('#FDF3E6','🎁','หีบประจำวัน',cdone?'รับแล้ววันนี้ กลับมาใหม่พรุ่งนี้':'พร้อมเปิด! รับเหรียญฟรี',cdone?CHEV:'<span class="chip" style="height:26px;padding:0 10px;font-size:12px">เปิด</span>','data-go="chest"')}
  ${ROW('#FBEFEA','📝','ทบทวนข้อผิด',Object.keys(S.mistakes).length+' คำ',undefined,'data-go="review"')}
  ${ROW('#FDECEC',M('speaking'),'ฝึกพูด','พูดตาม'+MASCOT_NAME+' (คะแนนจำลอง)',undefined,'data-go="play" data-g="speak"')}
  ${ROW('#EAF1FB',M('listening'),'ฝึกฟัง','ฟังแล้วเลือกความหมาย',undefined,'data-go="play" data-g="listen"')}
 </div>
 <div class="sec">เรียนกับเพื่อน</div>
 <div class="group">
  ${ROW('#E7F8EE','⚔️','ท้าเพื่อน','ดวลศัพท์ 5 ข้อ ผ่าน LINE (จำลอง)',undefined,'data-go="challenge"')}
  ${ROW('#F2ECFA','💌','ชวนเพื่อน','ได้ตั๋วกันสตรีคเมื่อเพื่อนเข้าห้อง',undefined,'data-go="invite"')}
 </div>${DEMO}`}};
