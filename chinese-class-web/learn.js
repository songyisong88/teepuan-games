/* บทเรียน v2: เอนจินบทเรียน (การ์ด/ควิซหลายแบบ/บทสนทนา) · แผนที่การเดินทาง · จบบท · ทบทวน */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ROW=(bg,em,t,sub,right,attrs)=>`<button class="row press" ${attrs||''}><span class="ic" style="background:${bg}">${em}</span><span class="tx"><b>${t}</b>${sub?`<small>${sub}</small>`:''}</span>${right===undefined?CHEV:right}</button>`;
const dateTxt=()=>new Date(Date.now()+S.shift*864e5).toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});
const DEMO=`<p class="cap center" style="padding:22px 30px 0"><span class="demo">ตัวอย่างทดลอง</span><br><span style="display:block;margin-top:6px">ข้อมูลเก็บในเครื่องนี้เท่านั้น ไม่มีระบบหลังบ้านและไม่มีการชำระเงิน</span><span style="display:block;margin-top:4px;font-size:12px;color:var(--sub)">${NAME_NOTE}</span><button class="cap press" style="margin-top:8px;color:var(--red);font-weight:600" data-go="realnote">อะไรจริง อะไรจำลอง?</button></p>`;

/* ----- ตัวช่วยเรื่องประโยคและวรรณยุกต์ ----- */
const strip=t=>t.replace(/[，。！？、,.!?]/g,'');
const parseSent=s=>({zh:s[0].split('/'),py:s[1].split('/'),th:s[2],full:s[0].replace(/\//g,''),pyAll:s[1].replace(/\//g,' ')});
const TM={a:'āáǎà',e:'ēéěè',i:'īíǐì',o:'ōóǒò',u:'ūúǔù',ü:'ǖǘǚǜ'};const BASEOF={};Object.keys(TM).forEach(k=>[...TM[k]].forEach((c,j)=>BASEOF[c]=[k,j+1]));
const retone=(syl,t)=>{let o='';for(const c of syl){const b=BASEOF[c];o+=b?TM[b[0]][t-1]:c}return o};
const SENT_CACHE={};
function tokPool(maxLesson){const m=new Map();lvUpTo(maxLesson).forEach(l=>l.sents.forEach(s=>{const z=s[0].split('/'),p=s[1].split('/');z.forEach((t,k)=>{const a=strip(t);if(a&&!m.has(a))m.set(a,pyPlain(strip(p[k]||'')))})}));return [...m].map(([zh,py])=>({zh,py}))}

/* ----- ชนิดคำถาม ----- */
const LET='ABCD';
function makeQ(w,type,pool){const p=pool.length>=4?pool:ALLW;const others=shuffle(p.filter(x=>x.zh!==w.zh&&x.th!==w.th)).slice(0,3);const opts=shuffle([w,...others]);
 return {w,type,opts,ans:opts.findIndex(o=>o.zh===w.zh)}}
function qHtml(q){const w=q.w;let top='',fmt;
 if(q.pic)return picQHtml(q);
 if(q.top){return `<div class="center">${q.top}</div><div class="group opts mt20" style="margin-top:22px">${q.optsHtml.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span>${o}</span></button>`).join('')}</div>`}
 if(q.type==='zh2th'){top=`<div class="cap" style="font-size:14px">คำนี้แปลว่าอะไร</div><div class="bigzh zh" style="font-size:${w.zh.length>2?64:88}px">${w.zh}</div><div style="font-size:26px;font-weight:500;margin-top:2px">${pyHtml(w.py)}</div>`;fmt=o=>o.th}
 else if(q.type==='th2zh'){top=`<div class="cap" style="font-size:14px">คำจีนของคำว่า</div><div style="font-size:38px;font-weight:700;margin:12px 0 4px">${w.th}</div><div class="cap">เลือกคำที่ถูกต้อง</div>`;fmt=o=>`<span class="zh" style="font-size:26px">${o.zh}</span> <span class="cap" style="margin-left:6px">${pyPlain(o.py)}</span>`}
 else{top=`<div class="cap" style="font-size:14px">ฟังเสียงแล้วเลือกความหมาย</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`;fmt=o=>o.th}
 return `<div class="center">${top}</div><div class="group opts mt20" style="margin-top:22px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span>${fmt(o)}</span></button>`).join('')}</div>`}
const spkBtn=(t,r,lab='ฟัง')=>`<button class="cap press spkl" data-act="audio" data-t="${t}" ${r?`data-r="${r}"`:''}><span class="spi">${SPK}</span>${lab}</button>`;
const sentReveal=(zh,py,th)=>`<div class="ans"><div class="zh" style="font-size:21px;line-height:1.35">${zhHtml(zh,py)}</div><div style="font-size:13px;margin-top:2px">${pyHtml(py)}</div><div style="color:var(--sub2);margin-top:3px">${th}</div>${spkBtn(zh,'','ฟังประโยค')}</div>`;

function toneQ(w){if(w.py.split(' ').length>3)return null;const parts=w.py.split(/([| ])/);const idxs=[];parts.forEach((p,i)=>{if(i%2===0)idxs.push(i)});const tn=idxs.map(i=>toneOf(parts[i]));
 for(let k=0;k<tn.length-1;k++)if(tn[k]===3&&tn[k+1]===3)return null;
 let cand=idxs.filter((_,k)=>tn[k]<=4&&tn[k]!==3&&tn[k]!==5);if(!cand.length){const kl=tn.length-1;if(tn[kl]===3)cand=[idxs[kl]];else return null}
 const pos=cand[cand.length-1],orig=toneOf(parts[pos]),base=parts[pos];
 const variants=[1,2,3,4].map(t=>{const np=parts.slice();np[pos]=retone(base,t);return {t,txt:np.filter((_,i)=>i%2===0||np[i]===' ').join('').replace(/\|/g,'').replace(/ /g,' ')}});
 /* ต่อพินอินให้ครบ (ตัดตัวคั่น |) */
 variants.forEach(v=>{const np=parts.slice();np[pos]=retone(base,v.t);v.txt=np.join('').replace(/\|/g,'')});
 const opts=shuffle(variants);const tg=TONE_GUIDE[orig-1];
 return {w,type:'tone',custom:true,top:`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอินที่ถูก</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">ตั้งใจฟังเสียงสูง–ต่ำของพยางค์ที่ต่างกัน</div>`,
  optsHtml:opts.map(o=>`<span style="font-size:24px;letter-spacing:.3px">${o.txt}</span>`),ans:opts.findIndex(o=>o.t===orig),
  reveal:`<div class="ans"><b style="font-size:17px">${pyHtml(w.py)}</b> · <span class="zh">${w.zh}</span> = ${w.th}<div style="margin-top:6px;font-size:14px;color:var(--sub2)"><b class="${tg.c}">${tg.name}</b> — ${tg.thai}</div></div>`}}
function fillQ(L,k,learnedMax){const s=parseSent(L.sents[k]);const cands=s.zh.map((t,i)=>i).filter(i=>strip(s.zh[i]).length>=1);let big=cands.filter(i=>strip(s.zh[i]).length>=2);const bi=(big.length?big:cands)[Math.random()*(big.length||cands.length)|0];
 const a=strip(s.zh[bi]),apy=pyPlain(strip(s.py[bi]||''));const pool=tokPool(learnedMax).filter(t=>t.zh!==a&&!s.zh.map(strip).includes(t.zh));
 let same=shuffle(pool.filter(t=>t.zh.length===a.length)),rest=shuffle(pool.filter(t=>t.zh.length!==a.length));const ds=[...same,...rest].slice(0,3);const opts=shuffle([{zh:a,py:apy},...ds]);
 const sentBlank=s.zh.map((t,i)=>i===bi?t.replace(a,'<span class="blank">＿＿</span>'):t).join('');
 return {w:null,type:'fill',custom:true,top:`<div class="cap" style="font-size:14px">เติมคำที่หายไปให้ถูกความหมาย</div><div style="font-size:21px;font-weight:600;margin:12px 20px 4px">${s.th}</div><div class="zh fillz">${sentBlank}</div>`,
  optsHtml:opts.map(o=>`<span class="zh" style="font-size:26px">${o.zh}</span> <span class="cap" style="margin-left:6px">${o.py}</span>`),ans:opts.findIndex(o=>o.zh===a),reveal:sentReveal(s.full,s.pyAll,s.th)}}
function replyQ(L){const r=L.rq||null;if(!r)return null;const p=L.dlg[r.p],c=L.dlg[r.p+1];const all=shuffle([{zh:c[1],py:c[2],th:c[3],ok:1},...r.wrong.map(x=>({zh:x[0],py:x[1],th:x[2],ok:0}))]);
 return {w:null,type:'reply',custom:true,top:`<div class="cap" style="font-size:14px">เพื่อนพูดกับคุณว่า… ตอบอย่างไรดี?</div><div class="bubq"><div class="zh" style="font-size:24px">${zhHtml(p[1],p[2])}</div><div style="font-size:13px;margin-top:2px">${pyHtml(p[2])}</div><div class="cap" style="margin-top:4px">${p[3]}</div></div>${spkBtn(p[1],p[0]==='f'?'f':'','ฟังอีกครั้ง')}`,
  optsHtml:all.map(o=>`<span class="zh" style="font-size:22px">${o.zh}</span><br><span class="cap">${pyPlain(o.py)}</span>`),ans:all.findIndex(o=>o.ok),reveal:sentReveal(c[1],c[2],c[3])}}
function ordQ(L,k){const s=parseSent(L.sents[k]);if(s.zh.length<2)return null;let sh=shuffle(s.zh.map((t,i)=>i));let tries=0;while(sh.every((v,i)=>v===i)&&tries++<9)sh=shuffle(sh);
 return {w:null,type:'ord',s,sh,reveal:sentReveal(s.full,s.pyAll,s.th)}}
function matQ(ws){const seen=new Set(),ps=shuffle(ws).filter(w=>!seen.has(w.th)&&seen.add(w.th)).slice(0,4);return {w:ps[0],type:'mat',ps,right:shuffle(ps.map((_,i)=>i)),reveal:`<div class="ans">${ps.map(w=>`<div><span class="zh" style="font-size:18px">${w.zh}</span> <span style="font-size:13px">${pyHtml(w.py)}</span> = ${w.th}</div>`).join('')}</div>`}}

/* ----- สร้างขั้นตอนของแต่ละรอบ ----- */
function learnedPool(u){const L=lessonBy(u.lesson);return uniqW([...L.words,...lvUpTo(L.id).flatMap(l=>l.words),...gameWords().filter(w=>w.lv===L.lv)])}
function unitSteps(u){const L=lessonBy(u.lesson),pool=learnedPool(u),ws=u.words,steps=[];const Q=q=>q&&steps.push({k:'q',q});
 if(u.part===0)steps.push({k:'story',L,u});
 {const pf=picFlip(L,u);if(pf)steps.push(pf)}
 [ws.slice(0,4),ws.slice(4)].forEach((h,hi)=>{h.forEach(w=>steps.push({k:'c',w}));const sh=shuffle(h);
  /* เลือกรูปแบบต่อคำ: คำที่มีรูปใช้โจทย์รูป (ฟังเลือกรูป / ดูรูปเลือกคำจีน) แทนข้อเดิมบางข้อ · ข้อเดิม (ไทย→จีน, วรรณยุกต์) ยังอยู่ทุกรอบ */
  const ims=sh.filter(picHas),pa=ims[0],pb=ims[1],q2=shuffle(sh.filter(x=>x!==pa&&x!==pb));
  const sw=[pb||q2.shift()||sh[0],pa||q2.shift()||sh[1],q2.shift()||sh[2],q2.shift()||sh[3]];
  Q(pb?picQ(pb,'aud2pic',pool):makeQ(sw[0],'audio',pool));Q(pa?picQ(pa,'pic2zh',pool):makeQ(sw[1],'zh2th',pool));Q(makeQ(sw[2],'th2zh',pool));
  const tq=sh.map(toneQ).find(Boolean);Q(tq||makeQ(sw[3],'zh2th',pool));
  if(hi===1&&u.part===1){steps.push({k:'dlg',L});Q(replyQ(L))}});
 Q(ws.filter(picHas).length>=3?picMat(ws):matQ(ws));
 {const pw=shuffle(ws.filter(w=>picHas(w)&&w.py.split(/[| ]/).length<=3));if(pw.length>=2)Q(picPyQ(pw[0],pool))}
 const b=u.part*3;
 if(u.part===0){Q(ordQ(L,b));Q(fillQ(L,b+1,L.id));Q(ordQ(L,b+2))}else{Q(ordQ(L,b));Q(fillQ(L,b+1,L.id));Q(fillQ(L,b+2,L.id))}
 return steps}

/* ----- การ์ดคำ / เรื่องเล่า / บทสนทนา ----- */
function cardHtml(w,n,t){const pc=picCard(w);const thH=`<div style="font-size:27px;font-weight:600;margin-top:8px;padding:0 20px">${w.th}</div>`;
 return `<div class="center"><div class="cap" style="letter-spacing:1.5px">คำใหม่ ${n}/${t}</div>${pc?pc.top:art('word',w.zh,'','wart')}<div class="bigzh zh" style="font-size:${pc?(w.zh.length>3?60:w.zh.length>2?72:w.zh.length>1?92:100):(w.zh.length>3?70:w.zh.length>2?84:w.zh.length>1?116:130)}px">${w.zh}</div>
 <div style="font-size:30px;font-weight:500;margin-top:4px">${pyHtml(w.py)}</div>${window.prWordTag?prWordTag(w):''}${pc&&pc.hide?`<button class="pic-th press" data-sa="thai" data-th="${w.th.replace(/"/g,'&quot;')}"><span>👁️</span> แตะดูคำไทย <small>ลองเดาจากรูปก่อน</small></button>`:thH}
 <button class="audio press" aria-label="ฟังเสียง" data-act="audio" data-t="${w.zh}" style="margin-top:14px">${SPK}</button>
 <div class="hint"><span class="hb">อ่านแบบไทย</span><b>${w.h}</b><span class="cap">(ใกล้เคียง · ฟังเสียงจริงอีกที)</span></div>${stkBtn(w.zh)}</div>
 <div class="mnemo"><span class="mi">💡</span><span><b>ตัวช่วยจำ:</b> ${w.mn}</span></div>
 <div class="card exc" style="margin-top:16px"><div style="position:absolute;right:6px;top:-70px;width:78px;height:78px">${M('teach')}</div>
 <div class="zh" style="font-size:22px;line-height:1.35">${zhHtml(w.ex,w.exPy)}</div><div style="font-size:13.5px;margin-top:3px;font-weight:500">${pyHtml(w.exPy)}</div><div style="font-size:15.5px;margin-top:5px;color:var(--sub2)">${w.exTh}</div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">${spkBtn(w.ex,'','ฟังประโยค')}<button class="cap press" data-sa="rep" data-z="${w.zh}">แจ้งข้อผิด</button></div></div>`}
function storyHtml(L,u){const ch=CHAPTERS.find(c=>c.id===L.chapter);const cm=CLASSMATES.find(c=>c.by==='lesson:'+L.id);
 return `<div class="center"><div class="cap" style="letter-spacing:1px">${ch.emoji} ตอน ${ch.id} · ${ch.th}</div><div style="width:230px;height:230px;margin:6px auto 0" class="pop">${M('story')}</div>
 <div class="large" style="padding:6px 0 0">บทที่ ${L.id} · ${L.th}</div><div class="zh" style="font-size:22px;margin-top:2px;color:var(--sub2)">${L.zh}</div></div>
 <div class="card pad2 mt16" style="font-size:16px;line-height:1.55">${L.story}</div>
 ${cm?`<div class="card mt12" style="padding:12px 16px;display:flex;align-items:center;gap:12px"><span class="sil">${cmImg(cm,false)}</span><span style="flex:1;font-size:14px;color:var(--sub2)">จบบทนี้แล้วจะได้เจอเพื่อนใหม่ <b style="color:var(--ink)">${isDone(L.id)||cmUnlocked(cm)?cm.n:'???'}</b></span></div>`:''}
 <p class="cap center mt12">รอบนี้ ${u.words.length} คำ · ประมาณ 3 นาที</p>`}
const cmImg=(cm,on=true)=>`<img src="assets/friends/${cm.img}.webp" alt="" draggable="false" class="${on?'':'silh'}">`;
function dlgHtml(L){const cm=CLASSMATES.find(c=>c.by==='lesson:'+L.id);
 return `<div class="center"><div class="cap">บทสนทนาสั้น ๆ · แตะฟองเพื่อฟัง</div></div><div class="dlgwrap">${L.dlg.map(d=>`<div class="dl ${d[0]}"><span class="dav">${d[0]==='t'?M('teacher'):cm?cmImg(cm):M('student')}</span><button class="dbub press" data-act="audio" data-t="${d[1]}" data-r="${d[0]}"><span class="zh dz">${zhHtml(d[1],d[2])}</span><span class="dp">${pyHtml(d[2])}</span><span class="dt">${d[3]}</span></button></div>`).join('')}</div>
 <div class="center mt12"><button class="pill sm ghost press" style="width:auto;display:inline-flex;padding:0 22px;flex-direction:row;gap:8px" data-sa="dlgall"><span style="width:18px;display:flex">${SPK}</span>ฟังทั้งบทสนทนา</button></div>`}

/* ----- เอนจินบทเรียน ----- */
const sessNav=`<div class="seshnav"><button class="x" data-sa="quit" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i id="pg" style="width:0"></i></div><div class="cap" id="pc" style="font-weight:600;color:var(--red);min-width:40px;text-align:right"></div></div>`;
const sessExtra='<div class="dock" id="dock"></div><div class="fb" id="fb"></div>';
function session(el,steps,cb,{review=false,place=false}={}){let i=0,correct=0,run=0,locked=false,wrong=[],log=[],retries=0,reasked=[];
 const stage=$('#stage',el),dock=$('#dock',el),fb=$('#fb',el),pg=$('#pg',el),pc=$('#pc',el),nCards=steps.filter(s=>s.k==='c').length;let cardN=0,qTotal=steps.filter(s=>s.k==='q').length,cur=null;
 const mas=pose=>{const m=$('#qm',stage);if(m)m.innerHTML=M(pose)};
 window.__cnCur=()=>({s:cur,left:steps.length-i,locked,ord:ordState});
 function show(){fb.classList.remove('show');locked=false;const s=steps[i];cur=s;pg.style.width=(i/steps.length*100)+'%';pc.textContent=(i+1)+' / '+steps.length;dock.innerHTML='';
  if(s.k==='c'){cardN++;stage.innerHTML=cardHtml(s.w,cardN,nCards);dock.innerHTML=`<button class="pill row1 press" data-sa="next">ต่อไป</button>`;setTimeout(()=>speak(s.w.zh),400)}
  else if(s.k==='pflip'){stage.innerHTML=pflipHtml(s.ws);dock.innerHTML=`<button class="pill row1 press" data-sa="next">ต่อไป</button>`}
  else if(s.k==='story'){stage.innerHTML=storyHtml(s.L,s.u);dock.innerHTML=`<button class="pill row1 press" data-sa="next">ลุยเลย!</button>`}
  else if(s.k==='dlg'){stage.innerHTML=dlgHtml(s.L);dock.innerHTML=`<button class="pill row1 press" data-sa="next">ต่อไป · ลองตอบเอง</button>`}
  else{const q=s.q;const tag=s.retry?'<div class="retag">ทวนข้อที่พลาด</div>':'';const m=`<div class="qm" id="qm">${M('think')}</div>`;
   if(q.type==='ord'){stage.innerHTML=tag+m+ordHtml(q);ordState=[];dock.innerHTML=`<button class="pill row1 press" data-sa="ordcheck" disabled>ตรวจคำตอบ</button>`}
   else if(q.type==='mat'){stage.innerHTML=tag+m+matHtml(q);matSel=null;matDone=0;matErr=0}
   else{stage.innerHTML=tag+m+qHtml(q);const a=$('[data-auto]',stage);if(a)setTimeout(()=>speak(q.w.zh,a),350)}}
  stage.classList.remove('fade-in');void stage.offsetWidth;stage.classList.add('fade-in');$('.scroller',el).scrollTop=0}
 let ended=false;function next(){if(ended)return;i++;if(i>=steps.length){ended=true;pg.style.width='100%';setTimeout(()=>cb({correct,total:qTotal,wrong,log,reasked}),250)}else show()}
 function resolve(ok,q,btn){if(locked)return;locked=true;const retry=!!cur.retry;
  if(!retry){log.push(ok);if(ok)correct++;if(!place){if(ok)S.qOk++;S.qAll++;bumpCnt(ok?'qok':'qbad',1);if(ok&&q.w)srsGrade(q.w,true,1)}}
  if(ok){run++;vib(12);if(review&&q.w)fixMistake(q.w);if(!retry&&!place)floatXp('+10 XP',btn)}else{run=0;vib([30,40,30]);if(q.w&&!place)addMistake(q.w);wrong.push(q.w?q.w.zh:(q.lbl||'ประโยค'));
   if(!retry&&!place&&retries<4&&q.w&&q.type!=='mat'&&!review){retries++;reasked.push(q.w.zh);const other={zh2th:'th2zh',th2zh:'zh2th',audio:'zh2th',tone:'audio'}[q.type]||'zh2th';steps.push({k:'q',retry:1,q:makeQ(q.w,other,learnedPool({lesson:q.w.lesson}))})}
   else if(!retry&&!place&&retries<4&&q.rq){retries++;reasked.push(q.w?q.w.zh:(q.lbl||'ประโยค'));steps.push(Object.assign(q.rq(),{retry:1}))}}
  mas(ok?(run>=3?'thumbs':'correct'):'wrong');
  const w=q.w;let rev='';if(q.reveal)rev=typeof q.reveal==='function'?q.reveal(ok,q):q.reveal;else if(!ok&&w)rev=`<div class="ans"><span class="zh" style="font-size:20px">${w.zh}</span> &nbsp;${pyHtml(w.py)} &nbsp;= <b>${w.th}</b></div>`;
  const pose=ok?(run>=3?'thumbs':'correct'):'wrong';
  fb.innerHTML=`<div class="grabber"></div><div class="fh"><div class="t"><b style="color:${ok?'var(--ok)':'var(--warn)'}">${ok?(run>=3?`ติดต่อกัน ${run} ข้อแล้ว! 🔥`:'ถูกต้อง!'):'ยังไม่ถูก ไม่เป็นไรนะ'}</b><small>${ok?`${MASCOT_NAME}ภูมิใจ${retry||place?'':' · +10 XP'}`:MASCOT_NAME+(retry?'ลองอีกที ครั้งหน้าจะจำได้':'จะพาทวนข้อนี้อีกรอบ')}</small></div><div style="width:84px;height:84px">${M(pose)}</div></div>${rev}
  <button class="pill row1 press ${ok?'ok':'warn'}" style="height:52px;border-radius:26px;margin-top:14px" data-sa="next">ต่อไป</button>`;
  setTimeout(()=>fb.classList.add('show'),250)}
 function answer(btn){if(locked)return;const q=cur.q,k=+btn.dataset.i,ok=k===q.ans;q.picked=k;const os=$$('.opt',stage);
  os.forEach((o,j)=>{if(j===q.ans){o.classList.add('ok');$('.k',o).innerHTML=CHECK}else if(j===k)o.classList.add('bad');else o.classList.add('dim')});resolve(ok,q,btn)}
 /* เรียงคำ */
 let ordState=[];
 function ordHtml(q){return `<div class="center"><div class="cap" style="font-size:14px">เรียงคำให้เป็นประโยค</div><div style="font-size:23px;font-weight:700;margin:10px 20px 4px">${q.s.th}</div></div><div class="ordans" id="oa"></div><div class="ordpool" id="op">${q.sh.map(ix=>`<button class="chipw press" data-ox="${ix}"><span class="zh">${strip(q.s.zh[ix])||q.s.zh[ix]}</span><small>${pyPlain(strip(q.s.py[ix]||''))}</small></button>`).join('')}</div>`}
 function ordRefresh(){const q=cur.q,oa=$('#oa',stage),op=$('#op',stage);oa.innerHTML=ordState.map(ix=>`<button class="chipw on press" data-ox="${ix}"><span class="zh">${strip(q.s.zh[ix])||q.s.zh[ix]}</span><small>${pyPlain(strip(q.s.py[ix]||''))}</small></button>`).join('');
  $$('.chipw',op).forEach(b=>b.classList.toggle('used',ordState.includes(+b.dataset.ox)));const d=$('[data-sa=ordcheck]',dock);if(d)d.disabled=ordState.length!==q.s.zh.length}
 /* จับคู่ */
 let matSel=null,matDone=0,matErr=0;
 function matHtml(q){if(q.pics)return `<div class="center"><div class="cap" style="font-size:14px">จับคู่รูปกับคำจีน</div></div><div class="matg pmat"><div id="ml">${q.ps.map((w,k)=>`<button class="mcell pmc press" data-ml="${k}" aria-label="รูป ${k+1}">${art('word',w.zh,'','pic-m')}${picKin(w)}</button>`).join('')}</div><div id="mr">${q.right.map(k=>`<button class="mcell zh press" data-mr="${k}"><span style="font-size:24px">${q.ps[k].zh}</span><small>${pyPlain(q.ps[k].py)}</small></button>`).join('')}</div></div>`;
 return `<div class="center"><div class="cap" style="font-size:14px">จับคู่คำจีนกับความหมาย</div></div><div class="matg"><div id="ml">${q.ps.map((w,k)=>`<button class="mcell zh press" data-ml="${k}"><span style="font-size:24px">${w.zh}</span><small>${pyPlain(w.py)}</small></button>`).join('')}</div><div id="mr">${q.right.map(k=>`<button class="mcell th press" data-mr="${k}"><span>${q.ps[k].th}</span></button>`).join('')}</div></div>`}
 function matTap(t){if(locked)return;const q=cur.q;
  if(t.dataset.ml!==undefined){if(t.classList.contains('ok'))return;$$('[data-ml]',stage).forEach(x=>x.classList.remove('sel'));t.classList.add('sel');matSel=t.dataset.ml;speak(q.ps[+matSel].zh)}
  else if(matSel!==null&&!t.classList.contains('ok')){const L=$(`[data-ml="${matSel}"]`,stage);if(t.dataset.mr===matSel){L.classList.remove('sel');L.classList.add('ok');t.classList.add('ok');matSel=null;matDone++;vib(10);if(matDone===q.ps.length)setTimeout(()=>resolve(matErr<=1,q,t),350)}
   else{matErr++;addMistake(q.ps[+matSel]);t.classList.add('bad');L.classList.add('bad');vib([25,30,25]);setTimeout(()=>{t.classList.remove('bad');L.classList.remove('bad','sel');matSel=null},420)}}}
 el.addEventListener('click',e=>{const t=e.target.closest('[data-sa],.opt,.chipw,.mcell');if(!t||!el.contains(t))return;
  if(t.classList.contains('opt')){answer(t);return}
  if(t.classList.contains('mcell')){matTap(t);return}
  if(t.classList.contains('chipw')){if(locked||cur.q.type!=='ord')return;const ix=+t.dataset.ox;vib(6);if(ordState.includes(ix))ordState=ordState.filter(x=>x!==ix);else ordState.push(ix);ordRefresh();return}
  const a=t.dataset.sa;if(a==='next'){vib(8);next()}else if(a==='flip'){if(!t.classList.contains('on')){t.classList.add('on');speak(t.dataset.z);vib(6)}else speak(t.dataset.z)}else if(a==='thai'){t.outerHTML=`<div class="pic-thr">${t.dataset.th}</div>`}else if(a==='rep')reportSheet(t.dataset.z);else if(a==='quit')quitSheet();
  else if(a==='dlgall'){const L=cur.L;speakSeq(L.dlg.map(d=>({t:d[1],r:d[0]})))}
  else if(a==='ordcheck'){const q=cur.q;const ok=ordState.every((ix,k)=>ix===k);$$('.chipw',$('#oa',stage)).forEach(b=>b.classList.add(ok?'okc':'badc'));resolve(ok,q,t)}});
 show()}
function quitSheet(){openSheet(`<div class="center" style="padding:0 24px"><div style="width:120px;height:120px;margin:0 auto">${M('sleepy')}</div><div class="h2 mt8">ออกจากบทเรียนนี้?</div><p style="color:var(--sub2);margin:6px 0 18px;font-size:15px">ความคืบหน้าในรอบนี้จะไม่ถูกบันทึก</p><button class="pill sm press" data-act="closesheet">เรียนต่อ</button><button class="pill sm ghost press mt12" id="qq">ออก</button></div>`,{onMount:sh=>$('#qq',sh).onclick=()=>{closeSheet();stopAudio();pop()}})}
function reportSheet(z){openSheet(`<div style="padding:0 20px"><div class="h2">แจ้งข้อผิดในคำว่า ${z}</div><div class="group mt12" style="margin:12px 0 0">${['พินอินไม่ถูก','คำแปลไม่ถูก','ประโยคตัวอย่างแปลก','เสียงอ่านไม่ชัด','อื่น ๆ'].map(t=>`<button class="row noic press" data-rp>${`<span class="tx"><b style="font-weight:500">${t}</b></span>`}</button>`).join('')}</div><p class="cap mt12 center">ตัวอย่างทดลอง — ยังไม่ได้ส่งถึงใครจริง</p></div>`,{onMount:sh=>$$('[data-rp]',sh).forEach(b=>b.onclick=()=>{closeSheet();toast('ขอบคุณที่แจ้ง! (จำลอง)')})})}

/* ----- เรียนรอบ (unit) ----- */
SC.lesson=({uid})=>{const u=unitBy(uid);
 return {nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){session(el,unitSteps(u),res=>finishUnit(u,res))}}};
function finishUnit(u,res){const first=!unitDone(u.id);const ratio=res.correct/Math.max(1,res.total);const stars=ratio>=.9?3:ratio>=.65?2:1;const L=lessonBy(u.lesson);
 let xp=6+Math.round(res.correct*1.4)+(ratio>=.9?4:0),coins=5+res.correct*2;if(!first){xp=Math.round(xp/2);coins=Math.round(coins/2)}
 const wasLessonDone=isDone(L.id);if(first)S.parts.push(u.id);S.stars[u.id]=Math.max(S.stars[u.id]||0,stars);
 const wasFirstToday=S.lastDay!==today();xp=evX(xp);coins=evC(coins);addCoins(coins,true);addXp(xp,null,true);save();bumpCnt('unit',1);
 const newCm=!wasLessonDone&&isDone(L.id)?CLASSMATES.find(c=>c.by==='lesson:'+L.id):null;if(newCm&&!S.seenCm.includes(newCm.id)){S.seenCm.push(newCm.id);save()}
 const nu=nextUnit();buddyTick();
 replace('complete',{u,L,res,xp,coins,stars,first,newWords:first?u.words.length:0,streakNew:wasFirstToday,newCm,nu,evMul:eventXpNote()})}
SC.complete=({u,L,res,xp,coins,stars,first,newWords,streakNew,newCm,nu,evMul})=>({nav:'<header class="nav"></header>',noRefresh:true,
 body:`<div class="center" style="padding:calc(var(--st) + 24px) 20px 0"><div class="pop" style="width:240px;height:220px;margin:0 auto">${M(stars>=3?'levelup':'cheer')}</div>
 <div class="cap mt8">บทที่ ${L.id} · ${L.th} · รอบ ${u.part+1}/2</div><div class="large" style="padding:2px 0">${first?'จบรอบนี้แล้ว!':'ทบทวนเรียบร้อย!'}</div>
 <div style="font-size:34px;letter-spacing:6px;margin-top:4px">${[1,2,3].map(n=>`<span class="pop" style="display:inline-block;animation-delay:${.2+n*.15}s;filter:${n<=stars?'none':'grayscale(1) opacity(.3)'}">⭐</span>`).join('')}</div></div>
 ${newCm?`<div class="card cmreveal mt16 pop" style="animation-delay:.5s"><div class="cmimg">${cmImg(newCm)}</div><div style="flex:1"><div class="cap" style="color:${newCm.c};font-weight:700">เพื่อนใหม่ในห้อง!</div><b style="font-size:19px">${newCm.n}</b> <span class="zh">${newCm.zh}</span><div style="font-size:13.5px;color:var(--sub2);margin-top:3px">“${newCm.line}”</div></div></div>`:''}
 <div class="stat mt16 fade-in" style="animation-delay:.3s"><div><b style="color:var(--red)">+${xp}</b><small>XP</small></div><div><b style="color:#B07A12">+${coins}</b><small>เหรียญ</small></div><div><b>${res.correct}/${res.total}</b><small>ตอบถูก</small></div></div>
 ${evMul?`<div class="banner mt12" style="background:#FDF3E6;color:#8A5A12">${evMul}</div>`:''}
 <div class="group mt16 fade-in" style="animation-delay:.4s">
  ${ROW('#FDECEC','🔥',`สตรีค ${curStreak()} วัน`,streakNew?'วันนี้นับเป็นวันเรียนแล้ว':'ต่อเนื่องดีมาก','')}
  ${newWords?ROW('#E7F8EE','🎮',`ปลดล็อกคำในเกม +${newWords} คำ`,u.words.map(w=>w.zh).join(' · '),'', 'style="cursor:default"'):''}
  ${buddyDoneRow()}
  ${res.wrong.length?ROW('#FDF3E6','📝',`ข้อที่พลาด ${res.wrong.length} ข้อ`,'เพิ่มในรายการทบทวนแล้ว',CHEV,'data-go="review"'):''}</div>
 <div class="pad mt16"><button class="pill sm linebtn row1 press" data-act="sharedone">ท้าเพื่อนใน LINE ด้วยผลนี้</button></div>
 <p class="cap center mt12"><span class="demo">ตัวอย่างทดลอง</span></p>`,
 extra:`<div class="dock">${nu&&first?`<button class="pill press" data-act="finishgo" data-to="next" data-u="${nu.id}"><b>เรียนรอบถัดไป</b><small>บทที่ ${nu.lesson} · รอบ ${nu.part+1}</small></button>`:`<button class="pill press" data-act="finishgo" data-to="games"><b>เล่นเกมคำใหม่</b><small>ใช้คำที่เพิ่งเรียนเก็บเหรียญ</small></button>`}<button class="pill sm ghost press mt12" data-act="finishgo" data-to="home">กลับหน้าหลัก</button></div>`,
 mount(el){confetti(newCm?150:110);vib([20,30,20,30,40]);if(newCm)setTimeout(()=>speak(newCm.say,null,''),900);
  const b=$('[data-act=sharedone]',el);if(b)b.onclick=()=>shareSheet('result',{kind:'unit',text:`จบ ${L.th} รอบ ${u.part+1} ได้ ${stars} ดาว`,stars,L,u,cm:newCm})}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act=finishgo]');if(!t)return;const to=t.dataset.to;vib(8);if(to==='next'){mountRoot('book',false);setTimeout(()=>push('lesson',{uid:t.dataset.u}),30);return}mountRoot(to==='games'?'game':to==='path'?'book':'home')});

/* ----- ทบทวน ----- */
SC.review=()=>{const ws=reviewWords();return {title:'ทบทวนตามรอบ',body:`<div class="large">ทบทวนตามรอบ</div>`+(ws.length?`
 <p class="cap" style="padding:4px 20px 14px">มี ${ws.length} คำถึงรอบทบทวน${reviewSeed().length?` (รวมคำแนะนำของระดับ ${curLv()} ที่ยังไม่เคยทวน)`:''} · ตอบถูกแล้วจะถูกเลื่อนไปทวนอีกครั้งห่างขึ้น (1→2→4→8→16 วัน) · ตอบพลาดจะกลับมาทวนวันนี้</p><div class="group">${ws.map(w=>`<div class="row noic" style="min-height:68px"><span class="tx"><b><span class="zh" style="font-size:22px">${w.zh}</span> <span style="font-size:14px;font-weight:500">${pyHtml(w.py)}</span></b><small>${w.th} · ${S.mistakes[w.zh]?'พลาด '+S.mistakes[w.zh]+' ครั้ง':S.srs&&S.srs[w.zh]?'ทวนรอบ '+srsBox(w)+'/5':'คำแนะนำของระดับ '+(w.lv||curLv())}</small></span>${stkBtn(w.zh,"mini")}<button class="audio press" aria-label="ฟังเสียง" style="width:42px;height:42px;margin:0" data-act="audio" data-t="${w.zh}"><span style="width:20px;display:flex">${SPK}</span></button></div>`).join('')}</div>
 <div class="dock"><button class="pill press" data-act="reviewgo"><b>ฝึกทบทวน</b><small>${Math.min(6,ws.length)} ข้อ</small></button></div>`:
 `<div class="empty" style="padding-top:50px"><div style="width:200px;height:200px">${M('empty')}</div><b>วันนี้ยังไม่มีคำที่ถึงรอบทบทวน</b><span>เยี่ยมมาก! คำที่เรียนแล้วจะกลับมาทวนตามรอบ (พรุ่งนี้ 2 วัน 4 วัน…) และคำที่พลาดจะมาอยู่ที่นี่</span></div>`)}};
document.addEventListener('click',e=>{if(e.target.closest('[data-act=reviewgo]'))push('rsession')});
SC.rsession=()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},mount(el){
 const ws=shuffle(reviewWords()).slice(0,6);if(!ws.length){pop();return}const types=['zh2th','th2zh','audio'];
 session(el,ws.map((w,i)=>({k:'q',q:(picHas(w)&&i%2===0&&picQ(w,i%4===0?'pic2zh':'aud2pic',gw4()))||makeQ(w,types[i%3],gw4())})),res=>{const xp=res.correct*8;addXp(xp);addCoins(res.correct*2);replace('result',{title:'ทบทวนเสร็จแล้ว',mascot:res.correct>=res.total*.6?'correct':'wrong',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:res.correct*2,stats:[['ตอบถูก',res.correct+'/'+res.total],['ถึงรอบทบทวน',reviewWords().length]],back:'review'})},{review:true})}});

/* ----- แผนที่การเดินทาง ----- */
function nodeHtml(u,cur){const done=unitDone(u.id),open=unitOpen(u.id),isCur=cur&&cur.id===u.id;
 return `<button class="jn press" data-go="unit" data-id="${u.id}"><div class="nd ${done?'done':isCur?'cur':open?'':'lock'}">${done?CHECK:open?(u.part+1):LOCK}</div>${isCur?`<div class="jllama">${M('wave')}</div>`:''}<small>${done?'⭐'.repeat(S.stars[u.id]||1):'รอบ '+(u.part+1)}</small></button>`}
function cmNode(L){const cm=CLASSMATES.find(c=>c.by==='lesson:'+L.id);if(!cm)return '';const on=cmUnlocked(cm);return `<button class="jn press" data-go="cm" data-id="${cm.id}"><div class="nd cmn ${on?'on':''}" style="${on?`border-color:${cm.c}`:''}">${cmImg(cm,on)}</div><small>${on?cm.n:'เพื่อนใหม่ ?'}</small></button>`}
/* SC.path อยู่ใน levels.js (แผนที่ต่อระดับ HSK) */
function unitSheet(id){const u=unitBy(id),L=lessonBy(u.lesson),done=unitDone(id),open=unitOpen(id);
 openSheet(`<div style="padding:0 20px"><div class="cap">บทที่ ${L.id} · รอบ ${u.part+1}/2</div><div style="font-size:24px;font-weight:700">${L.th} <span class="zh" style="font-weight:400">${L.zh}</span></div>
 <div class="group mt12" style="margin:14px 0 0">${u.words.map(w=>`<div class="row noic" style="min-height:52px"><span class="tx"><b style="font-weight:500"><span class="zh" style="font-size:20px">${w.zh}</span> &nbsp;<span style="font-size:13px">${pyHtml(w.py)}</span></b></span><span class="val">${open?w.th:'?'}</span>${open?stkBtn(w.zh,"mini"):""}</div>`).join('')}</div>
 ${open?`<button class="pill row1 press mt16" id="ls">${done?'เรียนทบทวนอีกครั้ง':'เริ่มเรียน'}</button>${done&&typeof SC.shrun==='function'?`<button class="pill sm ghost press mt12" data-go="shrun" data-l="${L.id}">🎧 ฝึกพูดตาม (ชาโดว์อิ้ง) บทนี้</button>`:''}`:`<div class="banner mt16" style="background:#F2ECE4;color:var(--sub2);text-align:center">เรียนรอบก่อนหน้าให้จบก่อน เพื่อปลดล็อกรอบนี้</div>`}</div>`,{onMount:sh=>{const b=$('#ls',sh);if(b)b.onclick=()=>{closeSheet();setTimeout(()=>push('lesson',{uid:id}),120)}}})}
