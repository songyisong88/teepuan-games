/* ห้องฝึกพิเศษ — 5 รูปแบบ: ซีรีส์ลามา (นิทานอ่านเอง) · เทียบคำใกล้เคียง · ชาโดว์อิ้ง · ข้อสอบจำลอง · ส่วนประกอบตัวอักษร
   เนื้อหาเขียนเอง (data/labs.js) · ทำงานในเครื่องทั้งหมด ไม่มีเซิร์ฟเวอร์ ไม่มีไมโครโฟน ไม่อัปโหลดเสียง · เสียงเป็นเสียงสังเคราะห์ */
const LB=window.LABS||{stories:[],pairs:[],mock:[],comp:{c:[],s:[]}};
const lab=()=>{if(!S.lab)S.lab={};['read','pair','mock','shadow','comp'].forEach(k=>{if(!S.lab[k])S.lab[k]={}});return S.lab};
const lbKnown=()=>new Set(gameWords().map(w=>w.zh));
let _lbAll=null;const lbAllWords=()=>{if(!_lbAll){_lbAll=new Map();LESSONS.forEach(l=>l.words.forEach(w=>{if(!_lbAll.has(w.zh))_lbAll.set(w.zh,{w,lesson:l.id,lv:l.lv})}))}return _lbAll};
const lbLvTag=n=>{const l=levelBy(n)||{};return `<span class="lbtag" style="background:${l.bg||'#eee'};color:${l.c||'#333'}">${l.em||''} ระดับ ${n}</span>`};
const lbEsc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
/* เสียงช้า/ปกติ (ไฟล์เสียงสังเคราะห์เล่นด้วย playbackRate · ถ้าไม่มีไฟล์ถอยไปใช้เสียงอ่านของเบราว์เซอร์) */
function lbPlay(t,rate,done){stopAudio();const url=audioUrl(t,'');
 const fb=()=>{try{const u=new SpeechSynthesisUtterance(t);u.lang='zh-CN';u.rate=rate<1?.55:.85;if(zhVoice)u.voice=zhVoice;u.onend=u.onerror=()=>done&&done(2);speechSynthesis.speak(u)}catch(e){done&&done(2)}};
 if(!url){fb();return}
 try{const a=new Audio(url);a.playbackRate=rate;a.preservesPitch=true;a.webkitPreservesPitch=true;curAudio=a;let dur=0;a.onloadedmetadata=()=>{dur=(a.duration||2)/rate};a.onended=()=>done&&done(dur||2);a.onerror=fb;const p=a.play();if(p&&p.catch)p.catch(fb)}catch(e){fb()}}
function lbEnd(g,{xp,coins,sub,mascot,stats,title,retry,back,shareText}){xp=evX(xp);coins=evC(coins);addXp(xp,null,1);addCoins(coins,1);bumpCnt('game',1);bumpCnt('lab',1);save();
 replace('result',{title,mascot,sub,xp,coins,stats,retry:retry||null,back,share:{kind:'lab',text:shareText||title,sub:sub||'',mascot:mascot||'celebrate'}})}
const lbNote=(t)=>`<p class="cap" style="padding:10px 24px 0;line-height:1.55">${t}</p>`;
const lbOptQ=(top,opts,ans,reveal)=>({k:'q',q:{w:null,type:'lab',custom:true,top,optsHtml:opts,ans,reveal}});

/* ================= หน้ารวม ================= */
const lbDone=()=>{const L=lab();return {rd:Object.keys(L.read).length,pr:Object.keys(L.pair).length,mk:Object.keys(L.mock).length,sh:Object.keys(L.shadow).length}};
const LB_HUB_ROWS=()=>{const d=lbDone();return `<div class="group lbg">
  ${ROW('#FDECEC','📖','ซีรีส์ลามา · นิทานอ่านเอง',`${LB.stories.length} เรื่อง · แตะคำดูความหมายและเสียง · อ่านแล้ว ${d.rd}`,undefined,'data-go="readers"')}
  ${ROW('#EAF1FB','🔀','เทียบคำใกล้เคียง',`${LB.pairs.length} คู่ที่คนไทยสับสนบ่อย · 会/能 · 买/卖 …`,undefined,'data-go="pairs"')}
  ${ROW('#E7F8EE','🎧','ชาโดว์อิ้ง · ฟังแล้วพูดตาม','ช้า/ปกติ · ซ่อนพินอิน · นับรอบ · ประเมินตัวเอง',undefined,'data-go="shadow"')}
  ${ROW('#FDF3E6','📝','ข้อสอบจำลองย่อย','สุ่ม 10 ข้อจากคลัง 30 ข้อต่อระดับ · จับเวลา · ประเมินระดับคร่าว ๆ',undefined,'data-go="mocklab"')}
  ${ROW('#F2ECFA','🧩','ส่วนประกอบตัวอักษร',`${LB.comp.c.length} ส่วนที่เจอบ่อย + ตระกูลเสียง · มีตัวช่วยจำ`,undefined,'data-go="comps"')}</div>`};
SC.labs=()=>({title:'ห้องฝึกพิเศษ',body:`<div class="large">ห้องฝึกพิเศษ</div>
 <div class="lbhero fade-in"><div class="lbhl"><b>ฝึกให้ต่างจากแอปทั่วไป</b><span>อ่านนิทาน · แยกคำใกล้เคียง · พูดตาม · ลองสนามสอบ · รู้จักส่วนประกอบ</span></div><div class="lbhm">${M('teach')}</div></div>
 <div class="sec">เลือกห้อง</div>${LB_HUB_ROWS()}
 <div class="sec">อะไรจริง อะไรจำลอง</div><div class="card pad2" style="font-size:14px;line-height:1.7">
 <b>จริง:</b> เนื้อหานิทาน คำเทียบ ข้อสอบย่อย และส่วนประกอบ เขียนเองและตรวจกับรายการคำในแอป · ใช้เฉพาะคำระดับเดียวกันหรือต่ำกว่า<br>
 <b>จำลอง/จำกัด:</b> เสียงเป็นเสียงสังเคราะห์ · ชาโดว์อิ้งให้คะแนนตัวเอง (ไม่มีไมค์ ไม่ตรวจเสียง ไม่อัปโหลด) · ข้อสอบจำลองไม่ใช่ข้อสอบจริงของหน่วยงานใด และประเมินระดับได้แค่คร่าว ๆ · ตัวช่วยจำของส่วนประกอบไม่ใช่ที่มาทางภาษาศาสตร์<br>
 <b>ยังรอผู้ตรวจ:</b> เนื้อหาทั้งหมดรอเจ้าของภาษา/ครูไทยตรวจ (ดูรายการตรวจในเอกสารโครงการ)</div>${DEMO}`});
const _gamesSC=SC.games;
SC.games=()=>{const r=_gamesSC();r.body=r.body.replace('<div class="sec">รางวัลและร้านค้า</div>',`<div class="sec">ห้องฝึกพิเศษ <span class="lbnew">ใหม่</span></div>${LB_HUB_ROWS()}<div class="sec">รางวัลและร้านค้า</div>`);return r};
Object.assign(window.GOX,{labs:()=>push('labs'),readers:()=>push('readers'),pairs:()=>push('pairs'),shadow:()=>push('shadow'),mocklab:()=>push('mocklab'),comps:()=>push('comps'),
 reader:el=>push('reader',{id:el.dataset.id}),rdquiz:el=>push('rdquiz',{id:el.dataset.id}),shrun:el=>{closeSheet();push('shrun',{l:+el.dataset.l})},mockrun:el=>push('mockrun',{lv:+el.dataset.lv}),mockagain:el=>replace('mockrun',{lv:+el.dataset.lv}),compq:()=>push('game_comp'),pairq:()=>push('game_pairs')});

/* ================= 1) ซีรีส์ลามา ================= */
function lbCover(st){const known=lbKnown(),all=lbAllWords(),u=new Set();st.s.forEach(s=>s.t.forEach(t=>{if(all.has(t))u.add(t)}));let k=0;u.forEach(t=>{if(known.has(t))k++});return {k,n:u.size,ratio:u.size?k/u.size:1}}
const LB_UNLOCK=.6;
SC.readers=()=>{const cv=LB.stories.map(s=>({s,c:lbCover(s)}));const cl=curLv();const L=lab();
 const lvs=[...new Set(LB.stories.map(s=>s.lv))].sort((a,b)=>(a===cl?-1:b===cl?1:a-b));
 const row=({s,c})=>{const open=c.ratio>=LB_UNLOCK,rd=L.read[s.id];
  return `<button class="row press lbstory ${open?'':'lockd'}" data-go="reader" data-id="${s.id}" ${open?'':'data-lk="1"'}><span class="ic" style="background:#FDF3E6;font-size:22px">${s.e}</span><span class="tx"><b><span class="zh">${s.zh}</span> · ${s.th}</b><small>${open?`รู้แล้ว ${c.k}/${c.n} คำ · ${s.s.length} ประโยค${rd?` · ควิซ ${rd.best}/${s.q.length}`:''}`:`🔒 ต้องรู้ ≥${Math.round(LB_UNLOCK*100)}% ของคำ (ตอนนี้ ${c.k}/${c.n})`}</small></span>${rd?'<span class="lbck" aria-label="อ่านแล้ว">✓</span>':CHEV}</button>`};
 return {title:'ซีรีส์ลามา',body:`<div class="large">ซีรีส์ลามา</div>${lbNote('นิทานสั้นที่เขียนเอง ใช้เฉพาะคำระดับเดียวกันหรือต่ำกว่า (ชื่อคนและคำช่วยพื้นฐานไม่นับ) · แตะคำเพื่อดูความหมาย พินอิน และเสียง · จบเรื่องมีควิซ 3 ข้อ')}
 ${lvs.map(n=>`<div class="sec">ระดับ ${n} · ${(levelBy(n)||{}).th||''}${n===cl?' · ระดับของคุณ':''}</div><div class="group lbg">${cv.filter(x=>x.s.lv===n).map(row).join('')}</div>`).join('')}${DEMO}`,
 mount(el){el.addEventListener('click',e=>{const b=e.target.closest('[data-lk]');if(b){e.stopPropagation();e.preventDefault();toast('เรียนคำในระดับนี้ให้มากกว่านี้ก่อนนะ แล้วเรื่องนี้จะเปิด');vib([12,30,12])}},true)}}};
SC.reader=({id})=>{const st=LB.stories.find(x=>x.id===id);const known=lbKnown(),all=lbAllWords();let py=true,th=false,playing=false;
 const tok=t=>{const d=st.d[t];if(!d)return `<span class="lbp">${t}</span>`;const a=all.get(t);const nw=a&&!known.has(t);
  return `<button class="lbt press ${nw?'new':''}" data-tk="${lbEsc(t)}"><i class="py">${pyPlain(d[0])}</i><span class="zh">${t}</span></button>`};
 const sent=(s,i)=>`<div class="lbs"><div class="lbtk">${s.t.map(tok).join('')}</div><div class="lbth" ${th?'':'hidden'}>${s.th}</div><button class="spkl cap press" data-act="audio" data-t="${lbEsc(s.z)}" aria-label="ฟังประโยค ${i+1}"><span class="spi">${SPK}</span>ฟังประโยค ${i+1}</button></div>`;
 return {title:st.zh,noRefresh:true,body:`<div class="large"><span class="zh">${st.zh}</span></div><div class="cap" style="padding:2px 20px 0">${st.e} ${st.th} · ${lbLvTag(st.lv)}</div>
 <div class="lbbar"><button class="chip press on" data-rt="py" aria-pressed="true">พินอิน</button><button class="chip press" data-rt="th" aria-pressed="false">คำแปลไทย</button><button class="chip press" data-rt="all" aria-pressed="false">▶ ฟังทั้งเรื่อง</button></div>
 <div class="card lbbook" id="lbbook">${st.s.map(sent).join('')}</div>
 <p class="cap center" style="padding:12px 30px 0"><span class="lbdot"></span> = คำที่อยู่ในแอปแต่คุณยังไม่ได้เรียน · แตะคำเพื่อดูความหมาย</p>
 <div class="dock"><button class="pill press" data-go="rdquiz" data-id="${st.id}"><b>ทำควิซท้ายเรื่อง</b><small>3 ข้อ · ได้เหรียญ</small></button></div>`,
 unmount(){stopAudio()},
 mount(el){const book=$('#lbbook',el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-tk]');if(t){const k=t.dataset.tk,d=st.d[k],a=all.get(k);speak(k,t);
    openSheet(`<div class="center" style="padding:0 24px 8px"><div class="zh" style="font-size:64px;line-height:1.2">${k}</div><div style="font-size:24px;margin-top:2px">${pyHtml(d[0])}</div><div style="font-size:20px;font-weight:600;margin-top:8px">${d[1]}</div>
    ${a?`<div class="cap mt8">${known.has(k)?'✓ เรียนแล้ว':'คำนี้อยู่ในบทที่ '+a.lesson+' (ยังไม่ได้เรียน)'}</div>`:`<div class="cap mt8">ชื่อคน/คำช่วยพื้นฐาน</div>`}
    <button class="pill sm press mt16" data-act="audio" data-t="${lbEsc(k)}">ฟังอีกครั้ง</button>${stkBtn(k)}</div>`);return}
   const r=e.target.closest('[data-rt]');if(!r)return;const w=r.dataset.rt;
   if(w==='py'){py=!py;book.classList.toggle('nopy',!py);r.classList.toggle('on',py);r.setAttribute('aria-pressed',py)}
   else if(w==='th'){th=!th;$$('.lbth',book).forEach(x=>x.hidden=!th);r.classList.toggle('on',th);r.setAttribute('aria-pressed',th)}
   else{if(playing){playing=false;stopAudio();r.textContent='▶ ฟังทั้งเรื่อง';r.classList.remove('on');return}
    playing=true;r.textContent='⏹ หยุด';r.classList.add('on');let i=0;const rows=$$('.lbs',book);
    const step=()=>{if(!playing||i>=st.s.length){playing=false;r.textContent='▶ ฟังทั้งเรื่อง';r.classList.remove('on');rows.forEach(x=>x.classList.remove('hl'));return}
     rows.forEach(x=>x.classList.remove('hl'));rows[i].classList.add('hl');rows[i].scrollIntoView({block:'center',behavior:'smooth'});const z=st.s[i++].z;playOne(z,'',()=>setTimeout(step,350))};stopAudio();step()}})}}};
SC.rdquiz=({id})=>{const st=LB.stories.find(x=>x.id===id);
 return {nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const qs=st.q.map(q=>{const idx=shuffle(q.o.map((_,i)=>i));const opts=idx.map(i=>q.o[i]);return lbOptQ(`<div class="cap" style="font-size:14px">${st.e} <span class="zh">${st.zh}</span> · คำถามเกี่ยวกับเรื่อง</div><div style="font-size:26px;font-weight:700;margin:14px 8px 0;line-height:1.35">${q.q}</div>`,opts.map(o=>`<span>${o}</span>`),idx.indexOf(q.a),`<div class="ans">เฉลย: <b>${q.o[q.a]}</b></div>`)});
  session(el,qs,res=>{const L=lab(),prev=L.read[id],first=!prev;L.read[id]={best:Math.max(res.correct,prev?prev.best:0),n:(prev?prev.n:0)+1,day:today()};
   const xp=(first?8:3)+res.correct*3,coins=(first?4:1)+res.correct*2;lbEnd('read',{xp,coins,title:'อ่านจบแล้ว!',shareText:`ฉันอ่านนิทานจีน “${st.th}” จบแล้ว`,mascot:res.correct>=2?'celebrate':'cheer',sub:`${st.zh} · ตอบถูก ${res.correct}/${res.total}`,stats:[['เรื่องที่อ่าน',st.th],['ตอบถูก',res.correct+'/'+res.total],['ระดับ',levelBy(st.lv).th]],back:'x'})},{review:true})}}};

/* ================= 2) เทียบคำใกล้เคียง ================= */
function lbPairOpen(p,known){return known.has(p.a[0])&&known.has(p.b[0])}
SC.pairs=()=>{const known=lbKnown(),L=lab(),cl=curLv();const ok=LB.pairs.filter(p=>lbPairOpen(p,known));const nq=ok.reduce((a,p)=>a+p.s.length,0);
 const row=p=>{const open=lbPairOpen(p,known);return `<button class="row press ${open?'':'lockd'}" data-pr="${LB.pairs.indexOf(p)}"><span class="ic lbpc"><span class="zh">${p.a[0].slice(0,2)}</span></span><span class="tx"><b><span class="zh">${p.a[0]}</span> <span style="color:var(--sub)">vs</span> <span class="zh">${p.b[0]}</span></b><small>${open?p.x.split('|')[0].slice(0,46)+(p.x.length>46?'…':''):'🔒 ต้องเรียนทั้งสองคำก่อน'}</small></span>${open?CHEV:''}</button>`};
 const lvs=[...new Set(LB.pairs.map(p=>p.lv))].sort((a,b)=>a-b);
 return {title:'เทียบคำใกล้เคียง',noRefresh:true,body:`<div class="large">เทียบคำใกล้เคียง</div>${lbNote('คำไทยแปลเหมือนกันแต่ภาษาจีนใช้ต่างกัน — แตะดูคำอธิบายพร้อมประโยค หรือกดเล่นเกมเติมคำ · อธิบายด้วยมือ ตรวจกับรายการคำในแอป รอเจ้าของภาษาตรวจ')}
 <div class="stat mt16" style="margin:16px 20px 0"><div><b>${ok.length}/${LB.pairs.length}</b><small>คู่ที่เปิดแล้ว</small></div><div><b style="color:var(--red)">${Object.keys(L.pair).length}</b><small>คู่ที่เคยเล่น</small></div><div><b style="color:#B07A12">${Math.min(8,nq)}</b><small>ข้อต่อรอบ</small></div></div>
 ${lvs.map(n=>`<div class="sec">ระดับ ${n}</div><div class="group lbg">${LB.pairs.filter(p=>p.lv===n).map(row).join('')}</div>`).join('')}
 <div class="dock"><button class="pill press" data-go="pairq" ${nq<4?'disabled style="opacity:.5"':''}><b>${nq<4?'เรียนอีกนิดเพื่อปลดล็อกเกม':'เล่นเกมเติมคำ'}</b><small>${nq<4?'ต้องมีอย่างน้อย 4 ข้อจากคู่ที่เปิดแล้ว':'8 ข้อ · อธิบายหลังตอบทุกข้อ'}</small></button></div>`,
 mount(el){el.addEventListener('click',e=>{const b=e.target.closest('[data-pr]');if(!b)return;const p=LB.pairs[+b.dataset.pr];if(!lbPairOpen(p,known)){toast('เรียนทั้งสองคำนี้ก่อน แล้วคู่นี้จะเปิด');return}
  openSheet(`<div style="padding:0 20px"><div class="lbvs"><button class="lbvsb press" data-act="audio" data-t="${p.a[0]}"><span class="zh">${p.a[0]}</span><small>${pyHtml(p.a[1])}</small><small class="th">${p.a[2]}</small></button><span class="lbvsx">vs</span><button class="lbvsb press" data-act="audio" data-t="${p.b[0]}"><span class="zh">${p.b[0]}</span><small>${pyHtml(p.b[1])}</small><small class="th">${p.b[2]}</small></button></div>
  <div class="card pad2 mt12" style="margin:12px 0 0;font-size:15px;line-height:1.65">${p.x.split('|').map(x=>`<div>${x.trim()}</div>`).join('')}</div>
  ${p.s.map(s=>`<div class="lbex"><div class="lbtk" style="gap:0">${s.t.map((t,i)=>`<span class="zh ${t===p[s.i?'b':'a'][0]?'lbhi':''}">${t}</span>`).join('')}</div><div class="cap">${s.th}</div><button class="spkl cap press" data-act="audio" data-t="${lbEsc(s.z)}"><span class="spi">${SPK}</span>ฟัง</button></div>`).join('')}</div>`)})}}};
function pairQs(){const known=lbKnown();const ok=LB.pairs.filter(p=>lbPairOpen(p,known));let pool=[];ok.forEach(p=>p.s.forEach(s=>pool.push({p,s})));pool=shuffle(pool);const used=new Set(),out=[];
 pool.forEach(x=>{if(out.length<8&&!used.has(x.p.a[0])){used.add(x.p.a[0]);out.push(x)}});pool.forEach(x=>{if(out.length<8&&!out.includes(x))out.push(x)});return out}
SC.game_pairs=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const items=pairQs();if(items.length<4){toast('ยังเปิดคู่คำไม่พอ — เรียนเพิ่มอีกหน่อย');setTimeout(pop,50);return}
  const qs=items.map(({p,s})=>{const tgt=s.i?p.b:p.a,oth=s.i?p.a:p.b;let done=false;const blank=s.t.map(t=>t===tgt[0]&&!done?(done=true,'<span class="lbblank">＿＿</span>'):`<span class="zh">${t}</span>`).join('');
   const pair=shuffle([tgt,oth]);const opt=o=>`<span class="zh" style="font-size:26px">${o[0]}</span> <span class="cap" style="margin-left:6px">${pyPlain(o[1])}</span><br><span style="font-size:14px;color:var(--sub2)">${o[2]}</span>`;
   return lbOptQ(`<div class="cap" style="font-size:14px">เลือกคำที่เติมช่องว่างได้ถูก</div><div class="lbsent">${blank}</div><div class="cap" style="padding:0 8px;font-size:14px">ความหมาย: ${s.th.replace(/\s*\(.*\)\s*$/,'')}</div>`,pair.map(opt),pair.indexOf(tgt),
    `<div class="ans"><div class="zh" style="font-size:20px">${s.z} <button class="spkl cap press" data-act="audio" data-t="${lbEsc(s.z)}" style="display:inline-flex;margin-left:6px"><span class="spi">${SPK}</span>ฟัง</button></div><div style="margin-top:8px;font-size:14px;color:var(--sub2);line-height:1.6">${p.x.split('|').map(x=>`<div>${x.trim()}</div>`).join('')}</div></div>`)});
  session(el,qs,res=>{const L=lab();items.forEach(({p})=>{L.pair[p.a[0]+p.b[0]]=(L.pair[p.a[0]+p.b[0]]||0)+1});save();const xp=Math.min(30,res.correct*3),coins=res.correct;
   gameEnd(el,'pairs',res.correct,{xp,coins,title:'เทียบคำเสร็จแล้ว',mascot:res.correct>=6?'celebrate':'cheer',sub:`ตอบถูก ${res.correct}/${res.total}`,stats:[['ตอบถูก',res.correct+'/'+res.total],['คู่คำที่ได้ทบทวน',new Set(items.map(x=>x.p.a[0])).size]]})},{review:true})}});

/* ================= 3) ชาโดว์อิ้ง ================= */
function lbShadowLessons(){return LESSONS.filter(L=>L.sents&&L.sents.length&&(unitDone(L.id+'a')||unitDone(L.id+'b')||L.lv<=(S.assume||0)))}
SC.shadow=()=>{const ls=lbShadowLessons(),L=lab().shadow;const row=l=>`<button class="row press" data-go="shrun" data-l="${l.id}"><span class="ic" style="background:#E7F8EE">${l.emoji||'🎧'}</span><span class="tx"><b>บทที่ ${l.id} · ${l.th} <span class="zh" style="font-weight:400">${l.zh}</span></b><small>${l.sents.length} ประโยค${L[l.id]?` · ฝึกแล้ว ${L[l.id].n} รอบ`:''}</small></span>${CHEV}</button>`;
 return {title:'ชาโดว์อิ้ง',body:`<div class="large">ชาโดว์อิ้ง</div>${lbNote('ฟังประโยคแล้วพูดตามให้ทันเสียง โดยไม่ต้องอ่านพินอิน — ใช้ประโยคจากบทที่เรียนแล้วเท่านั้น · <b>ไม่มีไมค์ ไม่อัดเสียง ไม่อัปโหลด</b> คุณฟังตัวเองแล้วประเมินเอง')}
 <div class="card pad2 mt12" style="margin:14px 20px 0;font-size:14.5px;line-height:1.7"><b>วิธีฝึก</b><br>① ฟังช้า 1 รอบ ② ฟังปกติ ③ พูดตามเมื่อวงแหวนสว่าง ④ นับรอบ (เป้า 3 รอบ) ⑤ ประเมินตัวเอง</div>
 ${ls.length?`<div class="sec">เลือกบท (${ls.length})</div><div class="group lbg">${ls.sort((a,b)=>b.id-a.id).map(row).join('')}</div>`:`<div class="center" style="padding:30px 40px"><div style="width:140px;height:140px;margin:0 auto">${M('locked')}</div><div class="h2 mt8">ยังไม่มีบทให้ฝึก</div><p class="cap mt8">เรียนรอบแรกของบทที่ 1 ให้จบ แล้วกลับมาพูดตาม</p></div>`}${DEMO}`}};
SC.shrun=({l})=>{const Ls=lessonBy(l);const sents=Ls.sents.map(parseSent);const GOAL=3;let i=0,reps=0,view=1,rating=0,allReps=0,good=0,cd=null,summary=[];
 return {title:'ชาโดว์อิ้ง',noRefresh:true,body:`<div class="large">ชาโดว์อิ้ง</div><div class="cap" style="padding:0 20px">บทที่ ${Ls.id} · ${Ls.th}</div><div class="cap" style="padding:2px 20px 0">🎙️ จำลอง: แอปไม่ได้อัดหรือตรวจเสียงของคุณ — ฟังตัวอย่างแล้วพูดตาม แล้วกดนับและประเมินตัวเอง</div><div class="stage" id="stage" style="padding:8px 0 130px"></div>`,unmount(){stopAudio();clearTimeout(cd)},
 mount(el){const stage=$('#stage',el);
  function render(){const s=sents[i];rating=0;reps=0;
   stage.innerHTML=`<div class="cap center" style="margin-top:6px">ประโยค ${i+1} / ${sents.length}</div><div class="prog" style="margin:8px 40px 0"><i style="width:${i/sents.length*100}%"></i></div>
   <div class="card shd"><div class="shth">${s.th}</div><div class="shzh zh" id="shzh"></div><div class="shpy" id="shpy"></div>
   <div class="seg" id="shseg" role="tablist" style="margin:14px 0 0"><button data-v="0" role="tab">ฟังอย่างเดียว</button><button data-v="1" role="tab" class="on">ตัวจีน</button><button data-v="2" role="tab">ตัวจีน+พินอิน</button></div></div>
   <div class="shbtns"><button class="shb press" data-p="slow" aria-label="ฟังช้า"><span>🐢</span><small>ช้า</small></button><div class="shring" id="shring" aria-live="polite"><b id="shmsg">ฟังก่อน</b></div><button class="shb press" data-p="norm" aria-label="ฟังปกติ"><span>▶</span><small>ปกติ</small></button></div>
   <div class="shrep"><div id="shdots" aria-label="จำนวนรอบพูดตาม"></div><button class="pill sm ghost press" data-s="rep" style="width:auto;padding:0 22px">พูดตามแล้ว +1</button></div>
   <div class="cap center" style="margin-top:14px">คุณพูดชัดแค่ไหน? (ประเมินเอง)</div><div class="shrate" id="shrate"><button data-r="1" class="press">😕 ยังไม่ชัด</button><button data-r="2" class="press">🙂 พอได้</button><button data-r="3" class="press">😄 ชัดแล้ว</button></div>
   <div class="dock"><button class="pill row1 press" data-s="next" disabled id="shnext">ประโยคถัดไป</button></div>`;view=view;paint();dots()}
  function paint(){const s=sents[i];$('#shzh',stage).innerHTML=view?s.full:'<span class="cap">ฟังแล้วพูดตาม ไม่ต้องดูตัวอักษร 👂</span>';$('#shpy',stage).textContent=view===2?s.pyAll:'';$$('#shseg button',stage).forEach(b=>b.classList.toggle('on',+b.dataset.v===view))}
  function dots(){$('#shdots',stage).innerHTML=Array.from({length:GOAL},(_,k)=>`<i class="${k<reps?'on':''}"></i>`).join('')+(reps>GOAL?`<span class="cap">+${reps-GOAL}</span>`:'');chk()}
  function chk(){$('#shnext',stage).disabled=!(reps>=1&&rating)}
  function play(rate){const s=sents[i],ring=$('#shring',stage),msg=$('#shmsg',stage);clearTimeout(cd);ring.classList.remove('go');msg.textContent=rate<1?'ฟังช้า…':'ฟังปกติ…';ring.classList.add('listen');
   lbPlay(s.full,rate,dur=>{ring.classList.remove('listen');msg.textContent='ถึงตาคุณ!';ring.style.setProperty('--d',Math.max(1.6,dur*1.5+.8)+'s');ring.classList.remove('go');void ring.offsetWidth;ring.classList.add('go');cd=setTimeout(()=>{ring.classList.remove('go');msg.textContent='พูดตามแล้วกด +1'},(Math.max(1.6,dur*1.5+.8))*1000)})}
  function finish(){const day=today(),L=lab().shadow;const prev=L[Ls.id];L[Ls.id]={n:(prev?prev.n:0)+1,day,good};const again=prev&&prev.day===day;
   const cap=Math.min(allReps,sents.length*GOAL);let coins=Math.round(cap*.8),xp=Math.round(cap*1.2);if(again){coins=Math.round(coins/2);xp=Math.round(xp/2)}
   lbEnd('shadow',{xp,coins,title:'พูดตามจบแล้ว!',shareText:`ฉันฝึกพูดตามบทที่ ${Ls.id} จบแล้ว`,mascot:good>=sents.length/2?'celebrate':'cheer',sub:`บทที่ ${Ls.id} · ${sents.length} ประโยค`,stats:[['รอบที่พูดตามทั้งหมด',allReps],['ประเมินตัวเองว่า “ชัดแล้ว”',good+'/'+sents.length],['หมายเหตุ','คะแนนมาจากการประเมินตัวเอง']],back:'x'})}
  el.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||!stage.contains(t))return;
   if(t.dataset.v){view=+t.dataset.v;paint();return}
   if(t.dataset.p){play(t.dataset.p==='slow'?.65:1);return}
   if(t.dataset.r){rating=+t.dataset.r;$$('#shrate button',stage).forEach(b=>b.classList.toggle('on',b===t));vib(8);chk();return}
   if(t.dataset.s==='rep'){reps++;allReps++;vib(14);dots();if(reps===GOAL){confetti(30);toast('ครบ 3 รอบแล้ว เก่งมาก 👏')}return}
   if(t.dataset.s==='next'){stopAudio();if(rating===3)good++;i++;if(i>=sents.length)finish();else render()}});
  render()}}};

/* ================= 4) ข้อสอบจำลองย่อย ================= */
const MOCK_SEC=600,MOCK_N=10;
SC.mocklab=()=>{let lv=curLv();const L=lab().mock;const qn=n=>Math.min(MOCK_N,LB.mock.filter(q=>q.lv===n).length);
 const draw=()=>`<div class="seg lbseg" id="mseg" role="tablist" style="margin:14px 20px 0">${[1,2,3,4,5].map(n=>`<button role="tab" data-lv="${n}" class="${n===lv?'on':''}" aria-selected="${n===lv}">ระดับ ${n}</button>`).join('')}</div>
  <div class="card pad2" style="margin:16px 20px 0"><div style="display:flex;align-items:center;gap:12px"><span class="lvem" style="font-size:34px">${levelBy(lv).em}</span><div><b style="font-size:19px">ข้อสอบจำลอง ระดับ ${lv}</b><div class="cap">${levelBy(lv).th}</div></div></div>
  <div class="lbrules"><div><b>${qn(lv)}</b><small>ข้อ</small></div><div><b>${MOCK_SEC/60}</b><small>นาที</small></div><div><b>${L[lv]?L[lv].best+'/'+L[lv].total:'—'}</b><small>คะแนนดีที่สุด</small></div></div>
  <div style="font-size:14px;line-height:1.7;margin-top:10px">ข้อสอบ 4 แบบ: ความหมายคำ · เติมคำในประโยค · ฟังแล้วเลือก · อ่านสั้น ๆ · ไม่เฉลยระหว่างทำ เฉลยทีเดียวตอนจบ ข้อเดิมอาจซ้ำ แต่ลำดับและตัวเลือกสลับทุกครั้ง</div></div>
  <p class="cap center" style="padding:12px 28px 0;line-height:1.6">⚠️ <b>เขียนเองทั้งหมด ไม่ใช่ข้อสอบจริงของหน่วยงานใด</b> · 10 ข้อประเมินระดับได้แค่คร่าว ๆ ใช้ดูจุดอ่อน ไม่ใช่ผลสอบ</p>
  <div class="dock"><button class="pill press" data-go="mockrun" data-lv="${lv}"><b>เริ่มทำข้อสอบ</b><small>เริ่มจับเวลาทันที</small></button></div>`;
 return {title:'ข้อสอบจำลอง',noRefresh:true,body:`<div class="large">ข้อสอบจำลองย่อย</div><div id="mk">${draw()}</div>`,
 mount(el){el.addEventListener('click',e=>{const b=e.target.closest('#mseg [data-lv]');if(!b)return;lv=+b.dataset.lv;$('#mk',el).innerHTML=draw();vib(6)})}}};
function mockBuild(lv){const seen={};return shuffle(LB.mock.filter(q=>q.lv===lv)).filter(q=>{const k=q.k+'|'+(q.zh||(q.t||[]).join('')||q.q)+'|'+q.o[q.a];if(seen[k])return false;seen[k]=1;return true}).slice(0,MOCK_N).map(q=>{const opts=shuffle(q.o.map((o,i)=>({o,ok:i===q.a})));return Object.assign({},q,{opts,pick:-1})})}
const fmtT=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
SC.mockrun=({lv})=>{const qs=mockBuild(lv);let i=0,end=Date.now()+MOCK_SEC*1000,tm=0,done=false;
 const nav=`<header class="nav"><div class="nav-l"><button class="back" data-sa="mquit">${BACKI}<span>ออก</span></button></div><div class="nav-t" style="opacity:1;transform:none">ข้อสอบจำลอง ระดับ ${lv}</div><div class="nav-r"><span class="timer" id="mt" role="timer" aria-label="เวลาที่เหลือ">${fmtT(MOCK_SEC)}</span></div></header>`;
 return {nav,noRefresh:true,body:'<div class="stage" id="stage"></div>',extra:'<div class="dock" id="dock"></div>',unmount(){clearInterval(tm);stopAudio()},
 mount(el){const stage=$('#stage',el),dock=$('#dock',el);
  const qbody=q=>{if(q.k==='mean')return `<div class="cap center" style="font-size:14px">${q.q}</div><div class="bigzh zh center" style="font-size:${q.zh.length>2?60:84}px">${q.zh}</div><div class="center" style="font-size:24px">${pyHtml(q.py)}</div>`;
   if(q.k==='fill'){const s=q.t.map((t,i)=>t==='＿'?(q.t[i-1]==='＿'?'':'<span class="lbblank">＿＿</span>'):`<span class="zh">${t}</span>`).join('');return `<div class="cap center" style="font-size:14px">${q.q}</div><div class="lbsent">${s}</div><div class="cap center" style="padding:0 8px">ความหมาย: ${q.th}</div>`}
   if(q.k==='listen')return `<div class="cap center" style="font-size:14px">${q.q}</div><div class="center"><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${lbEsc(q.z)}">${SPK}</button><div class="cap mt12">แตะฟังซ้ำได้ (ในแอปนี้ไม่จำกัดรอบ)</div></div>`;
   return `<div class="cap center" style="font-size:14px">อ่านแล้วตอบคำถาม</div><div class="card lbread zh">${q.t.join('')}</div><div style="font-size:20px;font-weight:700;margin:16px 6px 0;line-height:1.4">${q.q}</div>`};
  function show(){const q=qs[i];stage.innerHTML=`<div class="mkhead"><span class="cap">ข้อ ${i+1} / ${qs.length}</span><button class="chip press" data-m="ov">ภาพรวม</button></div><div class="prog" style="margin:6px 20px 0"><i style="width:${(i+1)/qs.length*100}%"></i></div><div style="margin-top:14px">${qbody(q)}</div>
   <div class="group opts mt20" style="margin-top:20px">${q.opts.map((o,k)=>`<button class="opt press ${q.pick===k?'picked':''}" data-i="${k}"><span class="k">${LET[k]}</span><span>${o.o}</span></button>`).join('')}</div>`;
   dock.innerHTML=`<div style="display:flex;gap:10px"><button class="pill sm ghost press" data-m="prev" ${i?'':'disabled style="opacity:.4"'}>ก่อนหน้า</button>${i<qs.length-1?`<button class="pill sm press" data-m="next">ถัดไป</button>`:`<button class="pill sm press" data-m="sub">ส่งข้อสอบ</button>`}</div>`;
   stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in');if(q.k==='listen')setTimeout(()=>{if(i<qs.length&&qs[i]===q)speak(q.z,$('.audio',stage))},450)}
  function overview(){const un=qs.filter(q=>q.pick<0).length;openSheet(`<div style="padding:0 20px"><div class="h2">ภาพรวมข้อสอบ</div><p class="cap" style="margin:4px 0 12px">ตอบแล้ว ${qs.length-un}/${qs.length}${un?` · ยังไม่ตอบ ${un} ข้อ`:''}</p><div class="mkgrid">${qs.map((q,k)=>`<button class="mkn press ${q.pick>=0?'on':''} ${k===i?'cur':''}" data-j="${k}" aria-label="ข้อ ${k+1} ${q.pick>=0?'ตอบแล้ว':'ยังไม่ตอบ'}">${k+1}</button>`).join('')}</div><button class="pill press mt16" data-m="sub2"><b>ส่งข้อสอบ</b></button></div>`,{onMount:sh=>{sh.addEventListener('click',e=>{const j=e.target.closest('[data-j]');if(j){closeSheet();i=+j.dataset.j;show();return}if(e.target.closest('[data-m=sub2]')){closeSheet();submit(false)}})}})}
  function submit(auto){if(done)return;const un=qs.filter(q=>q.pick<0).length;if(!auto&&un){openSheet(`<div class="center" style="padding:0 24px"><div class="h2">ยังไม่ได้ตอบ ${un} ข้อ</div><p class="cap" style="margin:6px 0 16px">ข้อที่ไม่ตอบนับเป็นผิด · ส่งเลยไหม?</p><button class="pill sm press" id="ys">ส่งข้อสอบ</button><button class="pill sm ghost press mt12" data-act="closesheet">กลับไปทำต่อ</button></div>`,{onMount:sh=>$('#ys',sh).onclick=()=>{closeSheet();fin()}});return}fin()}
  function fin(){if(done)return;done=true;clearInterval(tm);stopAudio();const correct=qs.filter(q=>q.pick>=0&&q.opts[q.pick].ok).length,used=MOCK_SEC-Math.max(0,Math.round((end-Date.now())/1000));
   const L=lab().mock,prev=L[lv],day=today();const again=prev&&prev.day===day;L[lv]={best:Math.max(correct,prev?prev.best:0),total:qs.length,last:correct,day,n:(prev?prev.n:0)+1};
   let coins=correct*2,xp=correct*3;if(again){coins=Math.floor(coins/2);xp=Math.floor(xp/2)}xp=evX(xp);coins=evC(coins);addXp(xp,null,1);addCoins(coins,1);bumpCnt('lab',1);save();
   replace('mockres',{lv,qs,correct,used,xp,coins})}
  el.addEventListener('click',e=>{const o=e.target.closest('.opt');if(o&&stage.contains(o)&&!done){const q=qs[i];q.pick=+o.dataset.i;$$('.opt',stage).forEach(x=>x.classList.toggle('picked',x===o));vib(8);return}
   const m=e.target.closest('[data-m],[data-sa=mquit]');if(!m)return;if(m.dataset.sa==='mquit'){openSheet(`<div class="center" style="padding:0 24px"><div class="h2">ออกจากข้อสอบ?</div><p class="cap" style="margin:6px 0 16px">คำตอบรอบนี้จะไม่ถูกบันทึก</p><button class="pill sm press" data-act="closesheet">ทำต่อ</button><button class="pill sm ghost press mt12" id="qq">ออก</button></div>`,{onMount:sh=>$('#qq',sh).onclick=()=>{closeSheet();pop()}});return}
   const a=m.dataset.m;if(a==='next'){i++;show()}else if(a==='prev'){i--;show()}else if(a==='ov')overview();else if(a==='sub')submit(false)});
  tm=setInterval(()=>{const r=Math.max(0,Math.round((end-Date.now())/1000));const t=$('#mt',el);if(t){t.textContent=fmtT(r);t.classList.toggle('low',r<=60)}if(r<=0){closeSheet(true);toast('หมดเวลา — ส่งข้อสอบให้อัตโนมัติ');submit(true)}},500);
  show()}}};
function mockBand(lv,c){const n=lv,nx=n<5?`ลองข้อสอบระดับ ${n+1} หรืออ่านนิทานระดับถัดไป`:'คุณทำครบทุกระดับที่มีในแอปแล้ว ลองอ่านนิทานซ้ำแบบไม่ดูพินอิน',pv=n>1?`ลองข้อสอบระดับ ${n-1} ก่อน`:'ทบทวนบทที่ 1–3 แล้วลองใหม่';
 if(c>=9)return {m:'celebrate',t:'แม่นมาก',d:`คะแนนบอกว่าคุณแข็งแรงกับระดับ ${n} · ${nx}`};
 if(c>=7)return {m:'celebrate',t:'ดี — พร้อมกับระดับนี้เป็นส่วนใหญ่',d:'ทบทวนข้อที่พลาดด้านล่าง แล้วลองอีกรอบ'};
 if(c>=4)return {m:'cheer',t:'พอไปได้ — ยังมีช่องโหว่',d:`ทบทวนบทระดับ ${n} อีกรอบ โดยเฉพาะข้อที่พลาดด้านล่าง`};
 return {m:'wrong',t:'ยังไม่พร้อมกับระดับนี้ — ไม่เป็นไร',d:`${pv} หรือเรียนบทระดับ ${n} ต่อ`}}
SC.mockres=({lv,qs,correct,used,xp,coins})=>{const b=mockBand(lv,correct),tot=qs.length;
 const ansTxt=q=>q.opts.find(o=>o.ok).o;
 return {nav:'<header class="nav"></header>',noRefresh:true,body:`<div class="center" style="padding:calc(var(--st) + 24px) 20px 0"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M(b.m)}</div>
 <div class="mkscore"><b>${correct}</b><span>/ ${tot}</span></div><div class="h2">${b.t}</div><p style="font-size:15px;color:var(--sub2);margin:4px 24px 0;line-height:1.55">${b.d}</p></div>
 <div class="stat mt16"><div><b style="color:var(--red)">+${xp}</b><small>XP</small></div><div><b style="color:#B07A12">+${coins}</b><small>เหรียญ</small></div><div><b>${fmtT(used)}</b><small>เวลาที่ใช้</small></div></div>
 <p class="cap center" style="padding:10px 28px 0;line-height:1.55">คะแนนจาก 10 ข้อที่เขียนเอง ใช้ดูจุดอ่อนเท่านั้น ไม่ใช่ผลสอบจริงและไม่ใช่การรับรองระดับ</p>
 <div class="sec">เฉลยรายข้อ</div><div class="group lbg">${qs.map((q,k)=>{const ok=q.pick>=0&&q.opts[q.pick].ok;const stem=q.k==='mean'?`<span class="zh">${q.zh}</span> ${pyPlain(q.py)}`:q.k==='fill'?`<span class="zh">${q.t.join('').replace(/＿+/g,'＿＿')}</span>`:q.k==='listen'?`<span class="zh">${q.z}</span>`:`<span class="zh">${q.t.join('').slice(0,22)}…</span> · ${q.q}`;
  return `<div class="row noic mkr" style="min-height:64px;padding:10px 16px"><span class="mkmk ${ok?'ok':'bad'}" aria-label="${ok?'ถูก':'ผิด'}">${ok?'✓':'✗'}</span><span class="tx"><b style="font-weight:500;font-size:15px">${k+1}. ${stem}</b><small>${ok?'ตอบ: ':'เฉลย: '}<b>${ansTxt(q)}</b>${!ok&&q.pick>=0?` · คุณตอบ: ${q.opts[q.pick].o}`:q.pick<0?' · ไม่ได้ตอบ':''}${q.k==='fill'?'<br>'+q.th:''}${q.k==='listen'?'<br><button class="spkl cap press" style="display:inline-flex" data-act="audio" data-t="'+lbEsc(q.z)+'"><span class="spi">'+SPK+'</span>ฟัง</button>':''}</small></span></div>`}).join('')}</div>
 <div style="height:130px"></div>`,extra:`<div class="dock"><button class="pill press" data-go="mockagain" data-lv="${lv}"><b>ทำอีกครั้ง</b></button><button class="pill sm ghost press mt12" data-sa="mshare">แชร์ผลไป LINE</button><button class="pill sm ghost press mt12" data-sa="rback">กลับ</button></div>`,
 mount(el){if(correct>=7)confetti(60);el.addEventListener('click',e=>{if(e.target.closest('[data-sa=rback]'))pop();else if(e.target.closest('[data-sa=mshare]'))shareSheet('result',{kind:'lab',text:`ฉันลองข้อสอบจำลองระดับ ${lv} ได้ ${correct}/${tot}`,sub:b.t,mascot:b.m})})}}};

/* ================= 5) ส่วนประกอบตัวอักษร ================= */
SC.comps=()=>{const C=LB.comp.c,F=LB.comp.s,L=lab().comp;
 return {title:'ส่วนประกอบตัวอักษร',noRefresh:true,body:`<div class="large">ส่วนประกอบตัวอักษร</div>${lbNote('ตัวอักษรจีนจำนวนมากประกอบจากส่วนที่ซ้ำกัน — รู้จักส่วนที่เจอบ่อย ช่วยเดาความหมายและจำตัวใหม่ได้ง่ายขึ้น · แตะการ์ดดูตัวอย่างจากคำในแอป')}
 <div class="lbhint card pad2">💡 <b>ตัวช่วยจำ</b> ในแต่ละการ์ดเป็นภาพให้จำง่ายสำหรับคนไทย <b>ไม่ใช่ที่มาทางภาษาศาสตร์</b> · และส่วนประกอบบอกได้แค่ “คำใบ้” ไม่ได้ถูกต้องเสมอไป</div>
 <div class="cmpgrid">${C.map((c,k)=>`<button class="cmpc press ${L[c.c]?'seen':''}" data-ci="${k}" aria-label="ส่วนประกอบ ${c.c} ${c.m}"><span class="zh">${c.c}</span><b>${c.m}</b><small>${c.py}</small></button>`).join('')}</div>
 <div class="sec">ตระกูลเสียง — ส่วนที่ช่วยบอกเสียงอ่าน</div><div class="group lbg">${F.map((f,k)=>`<button class="row press" data-fi="${k}"><span class="ic" style="background:#F2ECFA"><span class="zh" style="font-size:20px">${f.c}</span></span><span class="tx"><b>${f.c} ${f.py} → ${f.ex.map(e=>e.ch).join(' ')}</b><small>${f.t}</small></span>${CHEV}</button>`).join('')}</div>
 ${lbNote('ตระกูลเสียงให้ “ใกล้เคียง” ไม่ใช่ “เหมือนเสมอ” (เช่น วรรณยุกต์ต่างกันได้)')}
 <div class="dock"><button class="pill press" data-go="compq"><b>เล่นควิซส่วนประกอบ</b><small>8 ข้อ · ได้เหรียญ</small></button></div>`,
 mount(el){el.addEventListener('click',e=>{const b=e.target.closest('[data-ci]'),f=e.target.closest('[data-fi]');
  if(b){const c=C[+b.dataset.ci];lab().comp[c.c]=1;save();b.classList.add('seen');speak(c.ex[0].w[0]);
   openSheet(`<div style="padding:0 20px"><div class="center"><div class="cmbig zh">${c.c}</div><div style="font-size:20px;font-weight:600">${c.m}</div><div class="cap">${c.py}</div><div class="cap mt8"><span class="demo" style="background:#EAF1FB;color:#3B7DD8">${c.kind}</span></div></div>
   <div class="cmmn"><b>🧠 ตัวช่วยจำ (ไม่ใช่ที่มาจริง)</b><br>${c.tip}</div>
   <div class="sec" style="padding:16px 0 6px">ตัวอย่างในแอป</div><div class="group" style="margin:0">${c.ex.map(x=>`<button class="row noic press" data-act="audio" data-t="${x.w[0]}"><span class="tx"><b style="font-weight:500"><span class="zh" style="font-size:26px">${x.w[0].split('').map(ch=>ch===x.ch?`<span class="lbhi">${ch}</span>`:ch).join('')}</span> <span style="font-size:14px">${pyHtml(x.w[1])}</span></b><small>${x.w[2]} · ระดับ ${x.w[3]}</small></span><span class="spi" style="width:22px">${SPK}</span></button>`).join('')}</div></div>`)}
  else if(f){const x=F[+f.dataset.fi];openSheet(`<div style="padding:0 20px"><div class="center"><div class="cmbig zh">${x.c}</div><div style="font-size:20px;font-weight:600">เสียง ${x.py}</div></div><p style="margin:10px 0 0;font-size:15px;line-height:1.6">${x.t}</p>
   <div class="group mt12" style="margin:12px 0 0">${x.ex.map(e=>`<button class="row noic press" data-act="audio" data-t="${e.w[0]}"><span class="tx"><b style="font-weight:500"><span class="zh" style="font-size:26px">${e.ch}</span> ${pyHtml(e.py)}</b><small>${e.m} · ในคำ ${e.w[0]} ${pyPlain(e.w[1])}</small></span><span class="spi" style="width:22px">${SPK}</span></button>`).join('')}</div><p class="cap mt12">ใกล้เคียง ไม่ใช่เหมือนเสมอ</p></div>`)}})}}};
function compQs(){const C=LB.comp.c,H=LB.comp.h||{};let mx=Math.max(curLv(),S.assume||0);const mk=()=>{const out=[];C.forEach(c=>c.ex.forEach(x=>{if(x.w[3]<=mx)out.push({c,x})}));return out};let pool=mk();while(pool.length<8&&mx<5){mx++;pool=mk()}
 const build=(c,x,k)=>{const others=shuffle(C.filter(y=>y.c!==c.c&&!y.ex.some(e=>e.w[0]===x.w[0])&&!((H[x.ch]||'').includes(y.c)))).slice(0,3);
  if(k%2===0){const opts=shuffle([c,...others]);return lbOptQ(`<div class="cap" style="font-size:14px">ส่วนไหนบอกหมวดความหมาย?</div><div class="zh" style="font-size:84px;line-height:1.15;margin-top:6px">${x.ch}</div><div class="cap">อยู่ในคำ <span class="zh">${x.w[0]}</span> ${pyPlain(x.w[1])}</div>`,opts.map(o=>`<span class="zh" style="font-size:30px">${o.c}</span> <span class="cap" style="margin-left:8px">${o.m}</span>`),opts.indexOf(c),`<div class="ans"><span class="zh" style="font-size:20px">${x.ch}</span> = <b>${c.c}</b> (${c.m}) + ส่วนอื่น · ${x.w[0]} = ${x.w[2]}<div style="margin-top:6px;font-size:13.5px;color:var(--sub2)">🧠 ${c.tip}</div></div>`)}
  const sameC=shuffle(C.filter(y=>y.c!==c.c&&y.ex.some(e=>!(H[e.ch]||'').includes(c.c)))).slice(0,3);const cand=shuffle([x,...sameC.map(y=>shuffle(y.ex.filter(e=>!(H[e.ch]||'').includes(c.c)))[0])]);return lbOptQ(`<div class="cap" style="font-size:14px">ส่วนประกอบ <b>${c.c}</b> (${c.m}) พบในตัวอักษรไหน?</div><div class="zh" style="font-size:84px;line-height:1.15;margin-top:6px">${c.c}</div><div class="cap">เลือกตัวที่มีส่วนประกอบนี้</div>`,cand.map(o=>`<span class="zh" style="font-size:30px">${o.ch}</span> <span class="cap" style="margin-left:8px">${o.m}</span>`),cand.indexOf(x),`<div class="ans"><span class="zh" style="font-size:20px">${x.ch}</span> (${x.m}) อยู่ในคำ ${x.w[0]} · มี <b>${c.c}</b> = ${c.m}</div>`)};
 return shuffle(pool).slice(0,8).map(({c,x},k)=>{const q=build(c,x,k);q.q.rq=()=>build(c,x,k+1);q.q.lbl=x.ch;return q})}
SC.game_comp=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const qs=compQs();session(el,qs,res=>{const xp=Math.min(26,res.correct*3),coins=res.correct;gameEnd(el,'comp',res.correct,{xp,coins,title:'ควิซส่วนประกอบเสร็จแล้ว',mascot:res.correct>=6?'celebrate':'cheer',sub:`ตอบถูก ${res.correct}/${res.total}`,stats:[['ตอบถูก',res.correct+'/'+res.total]].concat(res.wrong.length?[['ตัวที่พลาด (ถามซ้ำแล้ว)',[...new Set(res.wrong)].join(' ')]]:[])})},{review:true})}});

/* กันหน้าที่ถูกเปิดโดยไม่มีพารามิเตอร์ที่ถูกต้อง (เช่น ลิงก์เก่า/สถานะค้าง) — กลับไปหน้าฮับแทนที่จะพัง */
['reader','rdquiz','shrun','mockrun','mockres'].forEach(n=>{const f=SC[n];SC[n]=p=>{p=p||{};
 const ok=n==='reader'||n==='rdquiz'?LB.stories.some(x=>x.id===p.id):n==='shrun'?!!lessonBy(p.l):n==='mockrun'?LB.mock.some(q=>q.lv===+p.lv):Array.isArray(p.qs);
 return ok?f(p):SC.labs()}});
