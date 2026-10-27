/* ติวเตอร์ AI (จำลอง) · เรียนด้วยกัน · สรุปสัปดาห์ */
/* ---------- ติวเตอร์: ตอบจากสคริปต์ ไม่ใช่ AI จริง ----------
   จุดเชื่อมต่อเดียว: TUTOR_ADAPTER(msg, ctx) -> Promise<{html, say?, act?}>
   ถ้าจะต่อ AI จริง: แทนที่ฟังก์ชันนี้ด้วย fetch ไปยังเซิร์ฟเวอร์ของคุณ (เก็บ API key ฝั่งเซิร์ฟเวอร์เท่านั้น)
   ให้ตอบกลับรูปแบบเดียวกัน แล้วที่เหลือของหน้าจอใช้ได้ทันที */
const TUTOR_ADAPTER=(msg,ctx)=>Promise.resolve(tutorReplySim(msg,ctx));
const CORR=[['我是很好','我很好','“是” (shì = เป็น/คือ) ใช้เชื่อมคำนาม ไม่ใช้นำหน้าคำคุณศัพท์ ถ้าจะบอกว่าสบายดี พูดว่า 我很好。'],
 ['你名字什么','你叫什么名字？','ถามชื่อ ใช้ 叫 (jiào = ชื่อว่า) นำหน้า: 你叫什么名字？ (เธอชื่ออะไร)'],
 ['再见明天','明天见！','ลำดับคำจีนคือ “เวลา” มาก่อน “คำกริยา”: 明天见 = พรุ่งนี้เจอกัน']];
const sh=t=>String(t).replace(/[\s，。？！,.?!、“”"'「」]/g,'');
const tzh=(zh,py)=>`<span class="zh" style="font-size:20px">${zh}</span>`+(py?` <span style="font-size:13px">${pyHtml(py)}</span>`:'');
function tutorWordHtml(w){const L=lessonBy(w.lesson);
 return `<b>${tzh(w.zh,w.py)}</b> ${spkBtn(w.zh,'','ฟัง')}<br>แปลว่า <b>${w.th}</b> · อ่านแบบไทยประมาณ “${w.h}”${w.mn?`<br><span class="cap" style="font-size:13px">💡 ${w.mn}</span>`:''}<br><div style="margin-top:6px;padding:8px 10px;background:rgba(0,0,0,.04);border-radius:12px"><span class="zh" style="font-size:16px">${zhHtml(w.ex.replace(/\//g,''),w.exPy&&w.exPy.replace(/\//g,' '))}</span> ${spkBtn(w.ex.replace(/\//g,''),'','')}<br><span class="cap">${w.exTh}</span></div><span class="cap" style="font-size:12px">จากบทที่ ${L.id} · ${L.th}</span>`}
function tutorReplySim(m,ctx){m=(m||'').trim();const k=sh(m);
 if(!k)return {html:'พิมพ์คำถามมาได้เลย หรือแตะปุ่มด้านล่าง'};
 for(const c of CORR)if(k.includes(c[0]))return {html:`เกือบถูกแล้ว! ลองแบบนี้นะ<br><b>${tzh(c[1].replace(/？|！/g,''))}</b> ${spkBtn(c[1].replace(/？|！/g,''))}<br>${c[2]}`,say:c[1]};
 if(/แก้|ตรวจ|ผิดไหม|ถูกไหม/.test(m))return {html:'ส่งประโยคจีนที่อยากให้ตรวจมาได้เลย (ในโหมดจำลองตรวจได้ 3 ประโยคตัวอย่าง) ลองพิมพ์: <b>我是很好</b>',chips:['我是很好','你名字什么','再见明天']};
 if(/วรรณยุกต์|เสียงสูงต่ำ|tone|เสียง ?[1-4]/i.test(m))return {html:`จีนกลางมี 4 เสียงหลัก + เสียงเบา:<br>${TONE_GUIDE.slice(0,4).map(t=>`<b>${t.name}</b>: ${t.thai}`).join('<br>')}<br><span class="cap">* เทียบกับเสียงไทยแบบคร่าว ๆ เท่านั้น</span>`,act:'tones'};
 if(/สนทนา|บทบาท|role|คุยกัน|ฝึกพูด/i.test(m))return {html:'มาเล่นบทบาทสมมติกัน! ฉันพูดก่อน คุณเลือกคำตอบที่เหมาะสม',act:'rp'};
 if(/สวัสดี|หวัดดี|hello|hi\b/i.test(m)){const w=wordBy('你好');return {html:`สวัสดีครับ! ภาษาจีนทักทายว่า <b>${tzh('你好','nǐ hǎo')}</b> ${spkBtn('你好')} ลองพูดตามดูนะ`,say:'你好'}}
 if(/ขอบคุณ/.test(m)){const w=wordBy('谢谢');if(w)return {html:tutorWordHtml(w)}}
 if(/ลา|บาย|ไปก่อน/.test(m)&&/จีน|พูด/.test(m)){const w=wordBy('再见');if(w)return {html:tutorWordHtml(w)}}
 if(/สุ่ม|คำศัพท์|ทวน|ขอคำ/.test(m)){const pool=gameWords().length?gameWords():ALLW;const w=pool[Math.random()*pool.length|0];return {html:`คำสุ่มวันนี้!<br>${tutorWordHtml(w)}`}}
 const zhs=[...m].filter(c=>/[\u4e00-\u9fff]/.test(c)).join('');
 if(zhs){const ws=ALLW.filter(w=>zhs.includes(w.zh)||w.zh===zhs).sort((a,b)=>b.zh.length-a.zh.length);
  if(ws.length){return {html:(ws.length>1&&ws[0].zh!==zhs?`ในประโยคนี้มีคำที่เราเรียนไปแล้ว ${ws.length} คำ:<br>`:'')+ws.slice(0,2).map(tutorWordHtml).join('<hr style="border:0;border-top:.5px solid rgba(0,0,0,.1);margin:8px 0">')}}
  return {html:`<span style="display:block;width:72px;height:72px;margin-bottom:2px">${M('notfound')}</span>`+'คำนี้ยังไม่อยู่ในบทที่เรียนไปค่ะ/ครับ (ติวเตอร์จำลองรู้เฉพาะคำใน 5 บทแรก) ลองถามคำอื่น หรือพิมพ์ภาษาไทยของคำที่อยากรู้ เช่น “ขอบคุณ”'}}
 const hit=ALLW.filter(w=>w.th.split(/ ?\/ ?/).some(t=>t.length>=2&&m.includes(t.replace(/^(เป็น|คือ) ?/,''))));
 if(hit.length)return {html:`ภาษาจีนของ “${hit[0].th.split(' / ')[0]}” คือ<br>${tutorWordHtml(hit[0])}`};
 return {html:`<span style="display:block;width:72px;height:72px;margin-bottom:2px">${M('notfound')}</span>ตอนนี้ฉันเป็นเวอร์ชันจำลอง ตอบได้เฉพาะ: อธิบายคำในบทที่เรียน · ตรวจ 3 ประโยคตัวอย่าง · เล่นบทบาทสมมติ · เรื่องวรรณยุกต์<br><span class="cap" style="font-size:12.5px">ติวเตอร์ AI จริงต้องต่อ API ภายนอก (ดูหน้า “อะไรจริง อะไรจำลอง”)</span>`}}

SC.tutor=()=>({title:'ติวเตอร์ AI',noRefresh:true,unmount(){stopAudio()},
 body:`<div class="tutorhd"><span class="tav">${M('teacher')}</span><span style="flex:1"><b>${MASCOT_NAME} · ติวเตอร์</b><br><span class="demo">จำลอง · ตอบจากสคริปต์</span></span></div>
 <div class="tchat" id="tc"></div>
 <div class="tchips" id="tchips"></div>
 <form class="tform" id="tf" autocomplete="off"><input id="ti" type="text" placeholder="พิมพ์คำจีน คำไทย หรือประโยคที่อยากตรวจ…" enterkeyhint="send" aria-label="ข้อความถึงติวเตอร์"><button class="tsend press" aria-label="ส่ง">↑</button></form>`,
 mount(el){const tc=$('#tc',el),chips=$('#tchips',el),ti=$('#ti',el);let rp=null,busy=false;
  const bub=(me,h)=>{tc.insertAdjacentHTML('beforeend',`<div class="tm ${me?'me':'bot'} fade-in">${me?'':`<span class="tav2">${M('teacher')}</span>`}<div class="tb">${h}</div></div>`);setTimeout(()=>{tc.scrollTop=tc.scrollHeight},30)};
  const setChips=a=>{chips.innerHTML=a.map(c=>`<button class="tchip press" data-q="${c}">${c}</button>`).join('')};
  const base=['ขอคำศัพท์สุ่ม','ลองสนทนา','แก้ประโยคให้หน่อย','วรรณยุกต์ยากจัง'];
  const typing=()=>{tc.insertAdjacentHTML('beforeend','<div class="tm bot" id="ty"><span class="tav2">'+M('think')+'</span><div class="tb"><span class="dots"><i></i><i></i><i></i></span></div></div>');tc.scrollTop=tc.scrollHeight};
  async function ask(t){if(busy)return;busy=true;bub(true,t.replace(/</g,'&lt;'));S.tutorN++;bumpCnt('tutor',1);save();vib(6);chips.innerHTML='';typing();
   const r=await TUTOR_ADAPTER(t,{});await new Promise(o=>setTimeout(o,650));$('#ty',tc)&&$('#ty',tc).remove();bub(false,r.html);if(r.say)setTimeout(()=>speak(r.say),400);
   if(r.act==='rp'){rpStart()}else{if(r.act==='tones')bub(false,`<button class="pill sm press" data-go="tones">เปิดหน้าวรรณยุกต์ + ฝึกฟัง</button>`);setChips(r.chips||base)}busy=false}
  function rpStart(){const ls=LESSONS.filter(l=>isDone(l.id));const L=ls.length?ls[Math.random()*ls.length|0]:LESSONS[0];rp={L,k:0};bub(false,`ฉากจากบทที่ ${L.id} · ${L.th} — ฉันเป็นครู คุณเป็นนักเรียน`);setTimeout(rpNext,500)}
  function rpNext(){const {L,k}=rp;if(k>=L.dlg.length){const xp=10;addXp(xp);bub(false,`เก่งมาก! จบฉากแล้ว +${xp} XP 🎉`);rp=null;setChips(base);return}
   const d=L.dlg[k];if(d[0]==='t'){bub(false,`<span class="zh" style="font-size:19px">${zhHtml(d[1],d[2])}</span> ${spkBtn(d[1],'t','')}<br><span class="cap">${d[3]}</span>`);setTimeout(()=>speak(d[1],null,'t'),300);rp.k++;setTimeout(rpNext,900)}
   else{const wrong=shuffle(LESSONS.flatMap(l=>l.dlg.filter(x=>x[0]==='f'&&x[1]!==d[1]))).slice(0,2);const opts=shuffle([d,...wrong]);rp.ans=d;bub(false,'คุณจะตอบว่าอะไรดี? 👇');chips.innerHTML=opts.map(o=>`<button class="tchip rpo press" data-rp="${o[1]}"><span class="zh">${o[1]}</span><small>${o[3]}</small></button>`).join('')}}
  chips.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.rp!==undefined){if(!rp)return;const ok=b.dataset.rp===rp.ans[1];chips.innerHTML='';bub(true,`<span class="zh">${b.dataset.rp}</span>`);speak(b.dataset.rp,null,'f');
    if(ok){vib(12);bub(false,'ตอบได้เหมาะสมเลย ✓');rp.k++;setTimeout(rpNext,900)}else{vib([25,30,25]);bub(false,`ลองแบบนี้นะ: <span class="zh">${rp.ans[1]}</span> ${spkBtn(rp.ans[1],'f','')}<br><span class="cap">${rp.ans[3]}</span>`);rp.k++;setTimeout(rpNext,1600)}}
   else if(b.dataset.q)ask(b.dataset.q)};
  $('#tf',el).onsubmit=e=>{e.preventDefault();const v=ti.value.trim();if(!v)return;ti.value='';if(rp){bub(false,'ตอนนี้อยู่ในฉากสนทนา เลือกคำตอบจากปุ่มก่อนนะ');return}ask(v)};
  bub(false,`สวัสดี! ฉันคือ${MASCOT_NAME} ติวเตอร์ประจำตัวของคุณ 🦙<br>ถามคำที่เรียนมา ให้ตรวจประโยค หรือฝึกสนทนาได้เลย<br><span class="cap" style="font-size:12.5px">หน้านี้เป็นการจำลอง ตอบจากสคริปต์ที่เตรียมไว้ — ยังไม่ได้ต่อ AI จริง</span>`);setChips(base)}});

/* ---------- เรียนด้วยกัน (ห้องอ่านหนังสือจำลอง) ---------- */
SC.study=()=>({title:'เรียนด้วยกัน',noRefresh:true,body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('read')}</div><div class="large" style="padding:0">ห้องอ่านหนังสือ</div><p style="color:var(--sub2);font-size:15px;margin:6px 14px 0">เปิดจับเวลาพร้อมเพื่อน ๆ — เห็นว่าใครกำลังตั้งใจอยู่ด้วยกัน มีแรงฮึดขึ้นเยอะ!</p></div>
 <div class="seg mt16" id="stg" style="margin:16px 20px 0">${[5,10,15].map((m,i)=>`<button data-m="${m}" class="${i===1?'on':''}">${m} นาที</button>`).join('')}</div>
 <div id="stb"></div>${DEMO}`,
 mount(el){let mins=10,timer=null,fast=false;const box=$('#stb',el);
  const ppl=[['พี่ต้น','#C9774A'],['น้องมะลิ','#5E9B7A'],['แพรว','#5B86C4']];
  const idle=()=>{box.innerHTML=`<div class="card pad2 mt16 center" style="margin:16px 20px 0"><div style="font-size:54px;font-weight:700;letter-spacing:1px" class="num">${String(mins).padStart(2,'0')}:00</div><div class="cap">รางวัลเมื่อครบ: +${mins*2} เหรียญ · +${mins} XP</div></div><div class="pad mt16"><button class="pill row1 press" id="go">เริ่มอ่านพร้อมเพื่อน</button></div><p class="cap center" style="padding:10px 30px 0">ใน LINE จริง เพื่อนจะเข้าห้องผ่านลิงก์ชวนในกลุ่ม · การเห็นว่าใครกำลังอ่านต้องมีเซิร์ฟเวอร์ ตอนนี้เพื่อนเป็นข้อมูลจำลอง</p>`;$('#go',el).onclick=start};
  function start(){let left=mins*60;const joined=[];vib(10);
   box.innerHTML=`<div class="card pad2 mt16 center" style="margin:16px 20px 0"><div style="font-size:64px;font-weight:700" class="num" id="tm">${mins}:00</div><div class="prog mt8"><i id="tp" style="width:0%"></i></div><div class="cap mt8" id="tn">กำลังรอเพื่อนเข้าห้อง…</div></div><div class="pbar mt16" id="pp"></div><div class="pad mt16"><button class="pill sm ghost press" id="gv">เลิกก่อน (ไม่ได้รางวัล)</button><button class="cap press" id="ff" style="display:block;margin:14px auto 0;text-decoration:underline;color:var(--sub)">เดโม: เร่งเวลา ×30</button></div>`;
   const draw=()=>{const m=Math.floor(left/60),s=left%60;$('#tm',el).textContent=`${m}:${String(s).padStart(2,'0')}`;$('#tp',el).style.width=(1-left/(mins*60))*100+'%'};
   $('#pp',el).innerHTML=`<div class="center" style="display:flex;justify-content:center;gap:14px"><span class="av big" style="background:var(--red)">${S.name[0]}</span>${ppl.map((p,i)=>`<span class="av big off" id="pf${i}" style="background:${p[1]}">${p[0].replace(/^(พี่|น้อง)/,'')[0]}</span>`).join('')}</div>`;
   ppl.forEach((p,i)=>setTimeout(()=>{if(!timer)return;$('#pf'+i,el)&&$('#pf'+i,el).classList.remove('off');joined.push(p[0]);$('#tn',el).textContent=`${joined.join(' · ')} กำลังอ่านอยู่ด้วย (จำลอง)`;toast(`${p[0]}เข้าห้องแล้ว`)},2200+i*3000));
   timer=setInterval(()=>{left-=fast?30:1;if(left<=0){clearInterval(timer);timer=null;fin()}else draw()},1000);
   $('#ff',el).onclick=()=>{fast=true;$('#ff',el).remove()};
   $('#gv',el).onclick=()=>{clearInterval(timer);timer=null;toast('เลิกก่อนแล้ว ไว้ลองใหม่นะ');idle()}}
  function fin(){S.studyN++;bumpCnt('study',1);addXp(mins,null,0);addCoins(mins*2);save();confetti(90);vib([20,30,20]);
   box.innerHTML=`<div class="center mt16"><div class="pop" style="width:160px;height:160px;margin:0 auto">${M('celebrate')}</div><div class="h2">อ่านครบ ${mins} นาที!</div><p class="cap">+${mins} XP · +${mins*2} เหรียญ</p></div><div class="pad mt16"><button class="pill row1 press" id="ag">อ่านอีกรอบ</button></div>`;$('#ag',el).onclick=idle}
  $$('[data-m]',el).forEach(b=>b.onclick=()=>{if(timer)return;mins=+b.dataset.m;$$('[data-m]',el).forEach(x=>x.classList.toggle('on',x===b));idle()});
  idle();this.stop=()=>clearInterval(timer)},unmount(){this.stop&&this.stop()}});

/* ---------- สรุปสัปดาห์ ---------- */
function recapData(){const t=today();let days=0,best=0,bd=0;for(let i=0;i<7;i++){const x=dayXp(t-i);if(x>0)days++;if(x>best){best=x;bd=i}}
 const acc=S.qAll?Math.round(S.qOk/S.qAll*100):0;return {xp:weekXp(),days,best,words:learnedCount(),streak:curStreak(),acc,mis:Object.keys(S.mistakes).length,cms:CLASSMATES.filter(cmUnlocked).length,bs:S.buddy?buddyStreak():0}}
SC.recap=()=>{const r=recapData();const line=r.days>=6?'สัปดาห์นี้คุณเทพมาก!':r.days>=3?'ทำได้ดีมาก ต่อเนื่องแบบนี้เลย':r.days>=1?'เริ่มต้นได้ดี สัปดาห์หน้าเพิ่มอีกวันนะ':'สัปดาห์นี้ยังไม่ได้เรียน เริ่มวันนี้ก็ยังทัน';
 const spec={badge:'สรุปสัปดาห์',title:line,sub:`เรียนไป ${r.days}/7 วัน · ${r.words} คำ`,mascot:r.days>=5?'trophy':r.days>=2?'thumbs':'cheer',tint:'#EAF1FB',accent:'#3E6FB0',stats:[[r.xp+'','XP สัปดาห์นี้'],[r.streak+'','วันสตรีค'],[r.acc+'%','ตอบถูก']],ctaLabel:'ลองเรียนด้วยกัน'};
 S.recapDay=today();save();
 return {title:'สรุปสัปดาห์',body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M(spec.mascot)}</div><div class="large" style="padding:0">สรุป 7 วันที่ผ่านมา</div><p style="color:var(--sub2);font-size:15.5px;margin:4px 14px 0">${line}</p></div>
 <div class="stat mt16"><div><b style="color:var(--red)">${r.xp}</b><small>XP</small></div><div><b>${r.days}/7</b><small>วันที่เรียน</small></div><div><b>${r.words}</b><small>คำที่เรียน</small></div></div>
 <div class="group mt16">${[['🔥','สตรีคปัจจุบัน',r.streak+' วัน'],['🎯','ตอบถูกรวม',S.qAll?r.acc+'% ('+S.qOk+'/'+S.qAll+')':'—'],['📝','คำที่ควรทวน',r.mis+' คำ'],['🤝','สตรีคบัดดี้',S.buddy?r.bs+' วัน':'ยังไม่มีบัดดี้'],['🏫','เพื่อนร่วมห้อง',r.cms+'/'+CLASSMATES.length+' คน'],['⭐','วันที่ XP สูงสุด',r.best?r.best+' XP':'—']].map(x=>`<div class="row" style="min-height:52px"><span class="ic" style="background:#F8F3EC">${x[0]}</span><span class="tx"><b style="font-weight:500">${x[1]}</b></span><span class="val" style="color:var(--ink);font-weight:600">${x[2]}</span></div>`).join('')}</div>
 <div class="dock"><button class="pill linebtn press" id="rs"><b>แชร์สรุปไป LINE</b></button></div>`,
 mount(el){$('#rs',el).onclick=()=>shareSheet('recap',{recap:spec})}}};
