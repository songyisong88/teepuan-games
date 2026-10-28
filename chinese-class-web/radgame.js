/* เกมในเส้นทาง "เรียนตัวอักษร": ประกอบร่าง (ลากชิ้นส่วน) · นักสืบตัวข้าง (มีมาตรความเชื่อถือ) · ท้า 60 วินาที · ตัวข้างวันนี้
   ตัวเลือกลวงกรองด้วยตารางคู่ส่วนประกอบของ MMAH ทั้งชุด (RAD_PAIRS ~9.5 พันตัว ลองทั้งสองลำดับ) ไม่ให้ประกอบเป็นตัวอักษรจริง · ข้อความไทยเป็น "ร่าง รอครูตรวจ" */
const RFORM={};RAD.forEach(r=>[r.id,...r.f].forEach(f=>{if(!RFORM[f])RFORM[f]=r}));
const RAD_DECS=new Set(Object.values(RAD_CH).map(v=>v[0]));
const RAD_PR=new Set(RAD_PAIRS.split(' '));
const radShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const radSplit=c=>{const v=RAD_CH[c];if(!v)return null;const m=v[0].match(/^([⿰⿱⿸⿺⿵⿷⿶⿹⿴])(.)(.)$/u);return m?{op:m[1],a:m[2],b:m[3]}:null};
const radOkPiece=p=>{if(!p||p.length!==1)return false;const cp=p.codePointAt(0);return (cp>=0x3400&&cp<=0x9FFF)||p==='⺮'};
let _radCommon=null;
function radCommon(){if(_radCommon)return _radCommon;const f={};for(const c in RAD_CH){const s=radSplit(c);if(!s)continue;[s.a,s.b].forEach(p=>{if(radOkPiece(p))f[p]=(f[p]||0)+1})}
 return _radCommon=Object.keys(f).sort((a,b)=>f[b]-f[a]).slice(0,170)}
const radLabel=p=>{const r=RFORM[p];if(r)return r.th;return RAD_PY[p]?pyHtml(RAD_PY[p]):''};
const radFmtT=s=>Math.floor(s/60)+':'+String(Math.max(0,s%60)).padStart(2,'0');
function radLearnedSet(){const s=new Set();UNITS.forEach(u=>{if(unitDone(u.id))u.words.forEach(w=>stkHan(w.zh).forEach(c=>s.add(c)))});return s}
function radPickIds(max=6){const k=radS();let ids=RAD.filter(r=>radDone(r.id)).map(r=>r.id);const cur=radCur();if(cur&&!ids.includes(cur.id))ids.push(cur.id);if(ids.length<3)ids=ids.concat(radZone(0).map(r=>r.id).filter(i=>!ids.includes(i)).slice(0,4-ids.length));return radShuf(ids).slice(0,max)}
/* ---------- สร้างโจทย์ประกอบร่าง ---------- */
function radGenBuild(ids,n,mode){const pool=radLvPool();let cands=[];const seen=new Set();
 ids.forEach(id=>{const r=RADI[id];radMembers(r).sem.forEach(c=>{if(seen.has(c))return;const sp=radSplit(c);if(!sp||sp.a===sp.b||!radOkPiece(sp.a)||!radOkPiece(sp.b)||!radG(c))return;
  const side=r.f.includes(sp.a)?'a':r.f.includes(sp.b)?'b':null;if(!side)return;seen.add(c);cands.push({c,r,sp,side})})});
 const pref=radShuf(cands.filter(x=>pool.has(radLvOf(x.c)))),rest=radShuf(cands.filter(x=>!pool.has(radLvOf(x.c))));
 const take=(pref.length>=Math.min(n,4)?pref.concat(rest):radShuf(cands)).slice(0,n);
 return take.map(x=>{const flip=mode!=='fam'&&Math.random()<.3;const other=x.side==='a'?'b':'a';const knownSide=flip?other:x.side;const missSide=flip?x.side:other;
  const known=x.sp[knownSide],miss=x.sp[missSide];const v=RAD_CH[x.c];const missRad=flip;
  const q={c:x.c,r:x.r,op:x.sp.op,knownSide,missSide,known,miss,missRad,type:v[1],ph:v[3],py:radPy(x.c),gl:radGl(x.c),note:radGlNote(x.c)};
  q.opts=radShuf([miss,...radDistract(q)]);return q})}
function radDistract(q){const out=[];const bad=new Set([q.miss,q.known]);const real=p=>RAD_DECS.has(q.op+(q.missSide==='a'?p+q.known:q.known+p))||RAD_PR.has(p+q.known)||RAD_PR.has(q.known+p);let pool;
 if(q.missRad){pool=radShuf(RAD.filter(x=>x.id!==q.r.id&&!q.r.f.includes(x.id)).map(x=>x.id))}
 else{const fam=[];radMembers(q.r).sem.forEach(c=>{const s=radSplit(c);if(s&&s.a!==s.b){const o=q.r.f.includes(s.a)?s.b:q.r.f.includes(s.b)?s.a:null;if(o&&radOkPiece(o))fam.push(o)}});pool=[...radShuf([...new Set(fam)]).slice(0,6),...radShuf(radCommon())]}
 for(const p of pool){if(out.length>=3)break;if(bad.has(p)||real(p)||out.includes(p))continue;if(q.r.f.includes(p)&&!q.missRad)continue;out.push(p)}return out}
/* ---------- สร้างโจทย์นักสืบ ---------- */
let _radSingles=null;
const radSingles=()=>_radSingles||(_radSingles=ALLW.filter(w=>stkHan(w.zh).length===1&&w.zh.length===1&&RAD_CH[w.zh]));
function radGenDet(ids,n){const pool=radLvPool(),learned=radLearnedSet();const seen=new Set();let cands=[];
 ids.forEach(id=>{const r=RADI[id];radMembers(r).sem.forEach(c=>{if(seen.has(c))return;const g=radG(c);const v=RAD_CH[c];if(!g||!g.single||!v||v[1]==='g')return;
  const inSem=r.f.includes(v[2])||RAD_MEM[id].s.includes(c);if(!inSem)return;seen.add(c);cands.push({c,r,g,v,un:!learned.has(c)})})});
 const score=x=>(pool.has(x.g.lv)?2:0)+(x.un?1:0)+Math.random();cands.sort((a,b)=>score(b)-score(a));cands=cands.slice(0,n);
 const sing=radSingles();
 return radShuf(cands).map(x=>{const own=new Set(RAD_MEM[x.r.id].s);const dis=radShuf(sing.filter(w=>!own.has(w.zh)&&w.th!==x.g.th&&!w.th.includes(x.g.th.split(/[ \/(]/)[0])&&!x.g.th.includes(w.th.split(/[ \/(]/)[0]))).map(w=>w.th);
  const seenT=new Set([x.g.th]);const ds=[];for(const t of dis){if(ds.length>=3)break;if(seenT.has(t))continue;seenT.add(t);ds.push(t)}
  return {c:x.c,r:x.r,v:x.v,g:x.g,un:x.un,py:radPy(x.c),ans:x.g.th,opts:radShuf([x.g.th,...ds])}})}
/* ---------- ส่วนนำทางของเกม ---------- */
const radGNav=()=>`<header class="nav rd-gn"><div class="nav-l"><button class="rd-x" data-act="back" aria-label="ปิดเกม">✕</button></div><div class="nav-t"><div class="rd-prog" role="progressbar" aria-label="ความคืบหน้า"><i id="rgp" style="width:0%"></i></div></div><div class="nav-r"><span class="chip coin rd-cp" aria-label="เหรียญที่ได้รอบนี้">${COIN.replace('<svg','<svg width="16" height="16"')} +<b id="rgc">0</b></span></div></header>`;
const radEmpty=(t)=>`<div class="rd-empty">${M('empty')}<div class="h2" style="padding:0">${t}</div><p class="cap" style="margin:8px 20px 0;font-size:14.5px;color:var(--sub2)">ลองเลือกตัวข้างอื่น หรือเปลี่ยนตัวกรองระดับในแท็บ “ฝึก”</p><button class="pill sm press" style="margin:16px 30px 0;width:auto;padding:0 28px" data-act="back">กลับ</button></div>`;
/* ---------- เกมประกอบร่าง ---------- */
function radLayout(q,fill,ok){const piece=(p,cls)=>`<span class="rd-pt ${cls}"><span class="zh">${p}</span></span>`;
 const kc=q.missRad?'bl':'or';const known=piece(q.known,'k '+kc);const slot=`<span class="rd-pt slot ${q.missRad?'or':'bl'} ${fill?'fill '+(ok?'ok':'bad'):''}" id="rgs" aria-label="ช่องวางชิ้นส่วน">${fill?`<span class="zh">${fill}</span>`:'<small>ลากชิ้นมาวางที่นี่</small>'}</span>`;
 const A=q.knownSide==='a'?known:slot,B=q.knownSide==='b'?known:slot;
 if(q.op==='⿰')return `<div class="rd-lay lr">${A}<i class="pl">+</i>${B}</div>`;
 if(q.op==='⿱')return `<div class="rd-lay tb">${A}<i class="pl">+</i>${B}</div>`;
 const outerIsKnown=q.knownSide==='a';const o=outerIsKnown?known.replace('rd-pt','rd-pt big'):slot.replace('rd-pt','rd-pt big');const inn=outerIsKnown?slot:known;
 return `<div class="rd-enc op${q.op.codePointAt(0).toString(16)}">${o}<span class="in">${inn}</span></div>`}
function radBuildHint(q){if(q.missRad){const r=RFORM[q.miss];return `ส่วนที่ขาดคือตัวข้างที่บอกความหมาย${r?` — “${r.th}”`:''} · ตัวนี้แปลว่า ${radEsc(q.gl)}`}
 if(RAD_PY[q.miss])return `ส่วนที่ขาด${q.type==='p'&&q.ph===q.miss?'บอกเสียง':''} อ่านว่า <b>${pyHtml(RAD_PY[q.miss])}</b> ${q.type==='p'&&q.ph===q.miss?'· ใกล้เคียงกับเสียงของตัวนี้':''}`;return 'ลองดูว่าตัวข้างบอกความหมายอะไร แล้วเลือกชิ้นที่เข้ากัน'}
SC.radbuild=(p)=>{const ids=p.ids&&p.ids.length?p.ids:radPickIds();const mode=p.mode||'mix';const n=p.n||8;const qs=radGenBuild(ids,n,mode);
 return {title:'',noRefresh:true,nav:radGNav(),body:qs.length?'<div class="rd-game" id="rbg"></div><p class="rd-draft">ข้อความไทยในเกมเป็นร่าง รอครูตรวจ</p>':radEmpty('ครอบครัวนี้ยังไม่มีตัวประกอบสองชิ้นให้เล่น'),extra:'',
 mount(el){if(!qs.length)return;const g=$('#rbg',el);const N=qs.length;let i=0,combo=0,best=0,right=0,first=0,hinted=0,done=false,locked=false,left=N*22,tm=null;const rs=qs.map(()=>({t:0,h:0,ok:0}));const learnedC=new Set();
  const upd=()=>{const pg=$('#rgp',el);if(pg)pg.style.width=(i/N*100)+'%';const c=$('#rgc',el);if(c)c.textContent=Math.min(first*2,radCoinLeft())};
  tm=setInterval(()=>{if(!el.isConnected){clearInterval(tm);return}left--;const t=$('#rgt',el);if(t)t.textContent=radFmtT(left);if(left<=0){clearInterval(tm);finish(true)}},1000);
  el._stop=()=>clearInterval(tm);
  const draw=()=>{const q=qs[i];done=false;locked=false;const showLab=mode==='fam';const showHint=mode==='fam'&&!q.missRad&&q.type==='p'&&q.ph===q.miss;
   g.innerHTML=`<div class="rd-prompt card"><div class="rm">${M('teach')}</div><div class="t"><small>ประกอบร่างตัวอักษร · ${i+1}/${N}</small><b>${radEsc(q.gl)}</b>${q.note?`<em>${q.note}</em>`:''}<span class="py">${q.py?pyHtml(q.py):''}</span></div><button class="rd-spk press" data-act="audio" data-t="${q.c}" aria-label="ฟังเสียง">${SPK}</button></div>
   <div class="rd-buildc card" id="rgb">${radLayout(q)}</div>
   <div class="rd-hintb ${showHint?'on':''}" id="rgh" role="status">${showHint?'💡 ลองฟังเสียง… '+radBuildHint(q):''}</div>
   <div class="rd-trayh">ชิ้นส่วนของคุณ</div><div class="rd-tray" id="rgt2">${q.opts.map(p=>`<button class="rd-tile press" data-p="${p}" aria-label="ชิ้นส่วน ${p}"><span class="zh">${p}</span><small>${showLab?radLabel(p):''}</small></button>`).join('')}</div>
   <div class="rd-foot"><span>${combo>=2?'🔥 ':''}ตอบถูกติดกัน ×${combo}</span><span>เหลือเวลา <b id="rgt">${radFmtT(left)}</b></span></div>
   <button class="rd-ghostb press" id="rgbh">ขอใบ้ (−3 เหรียญ)</button><div style="height:30px"></div>`;
   $('#rgbh',el).onclick=hint;upd()};
  const hint=()=>{if(done)return;const q=qs[i];if(S.coins<3){toast('เหรียญไม่พอ (ต้องใช้ 3 เหรียญ)');return}S.coins-=3;save();bumpChips();rs[i].h=1;hinted++;combo=0;const h=$('#rgh',el);h.classList.add('on');h.innerHTML='💡 '+radBuildHint(q);const t=$(`.rd-tile[data-p="${q.miss}"]`,el);if(t)t.classList.add('glow');$('#rgbh',el).disabled=true;vib(8)};
  const reveal=(okFlag)=>{const q=qs[i];done=true;const gd=$('#rgb',el);gd.innerHTML=radLayout(q,q.miss,okFlag);const rm=$('.rd-prompt .rm',el);rm.innerHTML=M(okFlag?'celebrate':'think');
   const sem=q.r;const mk=(p)=>RFORM[p]?`${p} (${RFORM[p].th})`:`${p}${RAD_PY[p]?' '+RAD_PY[p]:''}`;
   const full=RAD_CH[q.c];const s=full&&full[6][q.r.id]||[];
   $('#rgh',el).className='rd-hintb on res '+(okFlag?'ok':'bad');$('#rgh',el).innerHTML=`${okFlag?'✓ ถูกต้อง!':'ไม่เป็นไร ลองจำไว้นะ'} <span class="zh big">${radGlyph(q.c,s)}</span> ${mk(q.known)} + ${mk(q.miss)} = <b>${q.c}</b> ${q.py?pyHtml(q.py):''}`;radColorize(g);
   $('#rgt2',el).outerHTML=`<div class="rd-nextw"><button class="pill row1 press" id="rgn">${i+1>=N?'ดูผล':'ข้อต่อไป'}</button></div>`;$('#rgbh',el).style.display='none';$('#rgn',el).onclick=()=>{i++;if(i>=N)finish(false);else draw()};
   if(okFlag&&!learnedC.has(q.c))learnedC.add(q.c);vib(okFlag?[12,30,12]:[30])};
  const submit=(piece,tile)=>{if(done||locked)return;const q=qs[i],r0=rs[i];r0.t++;
   if(piece===q.miss){right++;if(r0.t===1&&!r0.h){first++;combo++;best=Math.max(best,combo);r0.ok=1}else combo=0;upd();reveal(true);if(r0.t===1&&!r0.h){const sc=$('#rgc',el);if(sc)floatXp('+2',sc)}}
   else{combo=0;vib([30,40,30]);if(tile){tile.classList.add('bad');tile.disabled=true}const s=$('#rgs',el);if(s){s.classList.remove('shake');void s.offsetWidth;s.classList.add('shake')}
    const h=$('#rgh',el);h.classList.add('on');h.innerHTML='ยังไม่ใช่ · '+radBuildHint(q);
    if(r0.t>=2){const t=$(`.rd-tile[data-p="${q.miss}"]`,el);if(t)t.classList.add('glow')}
    if(r0.t>=3)reveal(false)}};
  /* ลากหรือแตะ */
  g.addEventListener('pointerdown',e=>{const t=e.target.closest('.rd-tile');if(!t||done||t.disabled||e.button>0)return;e.preventDefault();const sx=e.clientX,sy=e.clientY;let moved=false,gh=null;
   try{t.setPointerCapture(e.pointerId)}catch(_){}
   const slot=()=>$('#rgs',el);const over=(x,y)=>{const s=slot();if(!s)return false;const r=s.getBoundingClientRect();return x>r.left-22&&x<r.right+22&&y>r.top-22&&y<r.bottom+22};
   const mv=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(!moved&&Math.hypot(dx,dy)>8){moved=true;const rc=t.getBoundingClientRect();gh=document.createElement('div');gh.className='rd-ghost';gh.innerHTML=`<span class="zh">${t.dataset.p}</span>`;gh.style.cssText=`left:${rc.left}px;top:${rc.top}px;width:${rc.width}px;height:${rc.height-14}px`;document.body.appendChild(gh);t.classList.add('lift')}
    if(moved){gh.style.transform=`translate(${dx}px,${dy-10}px) scale(1.12)`;const s=slot();if(s)s.classList.toggle('hot',over(ev.clientX,ev.clientY))}};
   const up=ev=>{t.removeEventListener('pointermove',mv);t.removeEventListener('pointerup',up);t.removeEventListener('pointercancel',up);const s=slot();if(s)s.classList.remove('hot');
    if(gh){gh.remove();t.classList.remove('lift')}
    if(ev.type==='pointercancel')return;
    if(!moved){submit(t.dataset.p,t)}else if(over(ev.clientX,ev.clientY)){submit(t.dataset.p,t)}};
   t.addEventListener('pointermove',mv);t.addEventListener('pointerup',up);t.addEventListener('pointercancel',up)});
  g.addEventListener('click',e=>{const t=e.target.closest('.rd-tile');if(t&&e.detail===0&&!done)submit(t.dataset.p,t)});
  const finish=(timeout)=>{clearInterval(tm);const stars=first/N>=.85?3:first/N>=.6?2:1;const k=radS();k.built+=1;qs.forEach((q,ix)=>{if(rs[ix].ok)k.known[q.c]=(k.known[q.c]||0)+1});
   let coins=radCoin(first*2+(stars===3?3:0));let xp=Math.max(2,first*2);let cr=null;
   if(mode==='fam'&&ids.length===1){cr=radComplete(ids[0],{stars});coins+=cr.coins;xp+=cr.xp}else{addXp(xp)}save();
   replace('radres',{kind:'build',id:mode==='fam'?ids[0]:null,stars,title:timeout?'หมดเวลาแล้ว!':'ประกอบร่างจบแล้ว!',sub:`ถูกตั้งแต่ครั้งแรก ${first} / ${N} ข้อ`,stats:[[first+'/'+N,'ถูกครั้งแรก'],['×'+best,'ติดกันสูงสุด'],[hinted,'ครั้งที่ขอใบ้']],coins,xp,cr,again:{n:'radbuild',p:{ids,mode,n}},share:{t:`ฉันประกอบร่างตัวอักษรถูก ${first}/${N} ข้อ`,s:'เรียนตัวอักษรกับลามะ'}})};
  draw()},unmount(){}}};
/* ---------- นักสืบตัวข้าง ---------- */
const radMeter=(label,v,note)=>`<div class="rd-met"><div class="top"><b>${label}</b><span>${note||''}</span></div><div class="bar"><i style="left:${Math.round(v*100)}%"></i></div><div class="sc"><span>เดาไม่ได้</span><span>ค่อนข้างแน่</span><span>เชื่อได้</span></div></div>`;
let _radPhF=null;
function radPhFam(ph){if(!_radPhF){_radPhF={};for(const c in RAD_CH){const v=RAD_CH[c];if(v[1]==='p'&&v[3]&&v[5]>=0){const o=_radPhF[v[3]]||(_radPhF[v[3]]={n:0,ex:0,sy:0,bad:null});o.n++;if(v[5]===2){o.ex++;o.sy++}else if(v[5]===1)o.sy++;else if(!o.bad)o.bad=c}}}return _radPhF[ph]||null}
function radCounter(){if(radCounter.c)return radCounter.c;const pick=['姐','妈','请','清','情'];for(const c of pick){const v=RAD_CH[c];if(v&&v[1]==='p'&&v[5]===0)return radCounter.c={c,py:radPy(c),ph:v[3],pp:v[4]}}for(const c in RAD_CH){const v=RAD_CH[c];if(v[1]==='p'&&v[5]===0&&radG(c)&&radG(c).single)return radCounter.c={c,py:radPy(c),ph:v[3],pp:v[4]}}return radCounter.c={c:'',py:'',ph:'',pp:''}}
function radDetFeed(q,okFlag){const r=q.r,v=q.v;const semV=r.tr===3?.88:r.tr===2?.6:.3;const sem=`<span class="o">${v[2]||r.id}</span> บอกความหมาย (${radEsc(r.th)}) — ${radTrustTxt(r.tr)[0]}`;
 let snd='';let mt=v[5];if(v[1]==='p'&&v[3]){const f=radPhFam(v[3]);const sv=mt===2?.92:mt===1?.6:mt===0?.14:.4;
  snd=radMeter('เชื่อถือเสียงได้แค่ไหน',sv,`${v[3]} ${v[4]?pyHtml(v[4]):''} → ตัวนี้ ${q.py?pyHtml(q.py):''}`)+(f&&f.n>1?`<p class="mn">ส่วนเสียง ${v[3]} ในแอป: ${f.n} ตัว อ่านเหมือนกันเป๊ะ ${f.ex} ตัว</p>`:'')}
 const ce=radCounter();
 return `<div class="rd-feed card ${okFlag?'ok':'bad'}"><div class="fh"><div class="rm">${M(okFlag?'celebrate':'think')}</div><div><b>${okFlag?'เก่งมาก!':'ใกล้แล้ว!'}</b><span>${q.c} แปลว่า <b>${radEsc(q.ans)}</b></span></div></div>
 <p class="fx">${sem}${v[1]==='p'&&v[3]?` · <span class="b">${v[3]}</span> ใบ้เสียง ${v[4]?pyHtml(v[4]):''}`:''}</p>
 ${radMeter('เชื่อถือความหมายได้แค่ไหน',semV,radEsc(r.id)+' · '+radTrustTxt(r.tr)[0])}${snd}
 <p class="warn">⚠ ตัวบางพวกเสียงไม่ตรง${ce.c?` เช่น ${ce.c} ${pyHtml(ce.py)} (${ce.ph} ${pyHtml(ce.pp)})`:''} — ใช้ส่วนเสียงเป็นเบาะแส ไม่ใช่คำตอบ</p></div>`}
SC.raddet=(p)=>{const ids=p.ids&&p.ids.length?p.ids:radPickIds();const n=p.n||8;const qs=radGenDet(ids,n);
 if(p.mode==='daily'&&qs.length<n){const have=new Set(qs.map(x=>x.c));radGenDet(radShuf(RAD_CORE.map(r=>r.id)).slice(0,10),n).forEach(x=>{if(qs.length<n&&!have.has(x.c)){have.add(x.c);qs.push(x)}});radShuf(qs)}
 return {title:'',noRefresh:true,nav:radGNav(),body:qs.length>=3?'<div class="rd-game" id="rdg"></div><p class="rd-draft">ข้อความไทยในเกมเป็นร่าง รอครูตรวจ</p>':radEmpty('ตัวอักษรเดี่ยวของครอบครัวนี้ยังน้อยเกินไปสำหรับนักสืบ'),
 mount(el){if(qs.length<3)return;const g=$('#rdg',el);const N=qs.length;let i=0,right=0,combo=0,best=0,first=0;
  const upd=()=>{$('#rgp',el).style.width=(i/N*100)+'%';$('#rgc',el).textContent=Math.min(first*2,radCoinLeft())};
  const draw=()=>{const q=qs[i];const sem=q.v[2]||q.r.id;const ph=q.v[1]==='p'&&q.v[3]?q.v[3]:'';
   const ss=q.v[6][q.r.id]||[];
   g.innerHTML=`<div class="rd-dt"><b>นักสืบตัวข้าง</b><small>${q.un?'ตัวที่ยังไม่เคยเรียน':'ตัวที่เรียนแล้ว'} · ${i+1}/${N}</small></div>
   <div class="rd-q">ตัวนี้น่าจะแปลว่าอะไร?</div>
   <div class="rd-big card">${radGlyph(q.c,ss,'xl')}<div class="clues"><span class="cl o"><b class="zh">${sem}</b> เบาะแส 1 · ${radEsc(q.r.th)}</span>${ph?`<span class="cl b"><b class="zh">${ph}</b> เบาะแส 2 · เสียงคล้าย ${q.v[4]?pyHtml(q.v[4]):''}</span>`:`<span class="cl n">ชิ้นอื่นไม่ได้บอกเสียง</span>`}</div><div class="py">${q.py?pyHtml(q.py):''}<button class="rd-spk sm press" data-act="audio" data-t="${q.c}" aria-label="ฟังเสียง">${SPK}</button></div></div>
   <div class="rd-opts" id="rdo">${q.opts.map((o,k)=>`<button class="rd-opt press" data-o="${radEsc(o)}">${radEsc(o)}</button>`).join('')}</div><div id="rdf"></div>`;radColorize(g);
   $$('.rd-opt',g).forEach(b=>b.onclick=()=>pick(b))};
  const pick=(b)=>{const q=qs[i];if(g.dataset.l===String(i))return;g.dataset.l=i;const okFlag=b.dataset.o===q.ans;const k=radS();k.det.n++;
   $$('.rd-opt',g).forEach(x=>{x.disabled=true;if(x.dataset.o===q.ans)x.classList.add('ok');else if(x===b)x.classList.add('bad')});
   if(okFlag){right++;first++;combo++;best=Math.max(best,combo);k.det.ok++;k.known[q.c]=(k.known[q.c]||0)+1;vib([12,30,12])}else{combo=0;vib([30])}save();upd();
   const f=$('#rdf',g);f.innerHTML=radDetFeed(q,okFlag)+`<div class="rd-nextw" style="padding:12px 0 0"><button class="pill row1 press" id="rdn">${i+1>=N?'ดูผล':'ข้อต่อไป'}</button></div><div style="height:30px"></div>`;
   f.scrollIntoView({block:'nearest',behavior:'smooth'});$('#rdn',g).onclick=()=>{i++;if(i>=N)finish();else draw()}};
  const finish=()=>{const stars=right/N>=.85?3:right/N>=.6?2:1;let coins=radCoin(right*2+(stars===3?3:0));const xp=Math.max(2,right*2);addXp(xp);
   if(p.mode==='daily'){const k=radS();if(k.daily.d!==today()){k.daily={d:today(),ok:right,n:(k.daily.n||0)+1};coins+=radCoin(5);addXp(10);save()}}
   replace('radres',{kind:'det',stars,title:'ไขคดีเสร็จแล้ว!',sub:`ตอบถูก ${right} / ${N} ข้อ`,stats:[[right+'/'+N,'ตอบถูก'],['×'+best,'ติดกันสูงสุด'],[radS().det.ok,'คดีที่ไขได้ทั้งหมด']],coins,xp,again:{n:'raddet',p:{ids,mode:p.mode,n}},share:{t:`ฉันเป็นนักสืบตัวข้าง ไขได้ ${right}/${N} ข้อ`,s:'ดูเบาะแสความหมายกับเสียงในตัวอักษร'}})};
  draw()}}};
/* ---------- ท้า 60 วินาที: ตัวนี้อยู่ครอบครัวไหน ---------- */
function radBlitzPool(){const ids=new Set(radPickIds(12));RAD.filter(r=>radDone(r.id)).forEach(r=>ids.add(r.id));const out=[];ids.forEach(id=>{const r=RADI[id];(RAD_MEM[id].s||[]).forEach(c=>{if(radG(c)&&c!==r.id&&!(RAD_CH[c]&&RAD_CH[c][6]&&Object.keys(RAD_CH[c][6]).length>1&&false))out.push({c,r})})});return out}
SC.radblitz=(p)=>{const pool=radBlitzPool();const ch=p.ch||0;
 return {title:'',noRefresh:true,nav:`<header class="nav rd-gn"><div class="nav-l"><button class="rd-x" data-act="back" aria-label="ปิดเกม">✕</button></div><div class="nav-t"><div class="rd-prog" role="progressbar" aria-label="เวลาที่เหลือ"><i id="rgp" style="width:100%;transition:width 1s linear"></i></div></div><div class="nav-r"><span class="chip rd-cp">คะแนน <b id="rgc">0</b></span></div></header>`,
 body:pool.length<4?radEmpty('ยังมีตัวอักษรไม่พอให้เล่น'):`<div class="rd-game" id="rbl"></div><p class="rd-draft">ข้อความไทยในเกมเป็นร่าง รอครูตรวจ</p>`,
 mount(el){if(pool.length<4)return;const g=$('#rbl',el);const T=60;let left=T,score=0,combo=0,best=0,tot=0,run=true,q=null,tm=null,cd=3;const seen=[];
  const next=()=>{let x;for(let k=0;k<20;k++){x=pool[Math.floor(Math.random()*pool.length)];if(!seen.includes(x.c))break}seen.push(x.c);if(seen.length>12)seen.shift();
   const own=new Set(Object.keys(RAD_CH[x.c]?RAD_CH[x.c][6]:{}));const dis=radShuf(RAD_CORE.filter(r=>!own.has(r.id)&&r.id!==x.r.id&&!x.r.f.includes(r.id)&&!(RAD_MEM[r.id].s||[]).includes(x.c))).slice(0,3);
   q={c:x.c,r:x.r,opts:radShuf([x.r,...dis])};
   g.innerHTML=`<div class="rd-bl-top"><span>⏱ <b id="rbt">${left}</b> วิ</span><span>${combo>=3?'🔥 ':''}ติดกัน ×${combo}</span></div><div class="rd-q" style="margin-top:6px">ตัวนี้อยู่ครอบครัวตัวข้างไหน?</div>
   <div class="rd-big card bl"><span class="rd-g xl"><span class="zh">${q.c}</span></span><div class="py">${radPy(q.c)?pyHtml(radPy(q.c)):''}</div><small>${radEsc(radGl(q.c))}</small></div>
   <div class="rd-bopts">${q.opts.map(r=>`<button class="rd-bo press" data-id="${r.id}" aria-label="${r.th}"><span class="zh">${r.id}</span><small>${r.th}</small></button>`).join('')}</div>`;
   $$('.rd-bo',g).forEach(b=>b.onclick=()=>ans(b))};
  const ans=(b)=>{if(!run||b.disabled)return;tot++;const ok=b.dataset.id===q.r.id;$$('.rd-bo',g).forEach(x=>x.disabled=true);
   if(ok){score++;combo++;best=Math.max(best,combo);b.classList.add('ok');vib(8)}else{combo=0;b.classList.add('bad');const c=$(`.rd-bo[data-id="${q.r.id}"]`,g);if(c)c.classList.add('ok');vib([25,30])}
   $('#rgc',el).textContent=score;setTimeout(()=>{if(run)next()},ok?260:700)};
  const tick=()=>{if(!el.isConnected){clearInterval(tm);return}if(cd>0){return}left--;const t=$('#rbt',el);if(t)t.textContent=Math.max(0,left);$('#rgp',el).style.width=(left/T*100)+'%';if(left<=0){run=false;clearInterval(tm);finish()}};
  const start=()=>{g.innerHTML=`<div class="rd-cd"><div class="rm">${M('timer')}</div><b id="rcd">3</b><small>พร้อมนะ… ท้าตัวเอง 60 วินาที${ch?` · คะแนนที่ต้องชนะ ${ch}`:''}</small></div>`;
   const c=setInterval(()=>{if(!el.isConnected){clearInterval(c);return}cd--;const e=$('#rcd',el);if(cd<=0){clearInterval(c);cd=0;next();tm=setInterval(tick,1000)}else if(e)e.textContent=cd},800)};
  const finish=()=>{const k=radS();const old=k.blitz.best;k.blitz.runs++;const nb=score>old;if(nb)k.blitz.best=score;k.blitz.hist=[{d:today(),s:score},...k.blitz.hist].slice(0,10);
   const stars=score>=18?3:score>=10?2:1;const coins=radCoin(Math.min(15,Math.floor(score/2)));const xp=Math.max(3,Math.min(30,score));addXp(xp);save();
   replace('radres',{kind:'blitz',stars,title:nb&&old?'สถิติใหม่!':'หมดเวลาแล้ว!',sub:`${score} ข้อใน 60 วินาที${ch?(score>ch?` · ชนะคำท้า ${ch} 🎉`:score===ch?' · เสมอกับคำท้า':` · แพ้คำท้า ${ch} นิดเดียว`):''}`,stats:[[score,'คะแนน'],[k.blitz.best,'สถิติสูงสุด'],['×'+best,'ติดกันสูงสุด']],coins,xp,again:{n:'radblitz',p:{ch}},share:{t:`ฉันตอบตัวข้างได้ ${score} ข้อใน 60 วินาที`,s:'มาท้าฉันดู!',blitz:score}})};
  start()}}};
/* ---------- หน้าผลลัพธ์ (ใช้ร่วม) ---------- */
SC.radres=(r)=>{r=Object.assign({kind:'build',stars:1,title:'เรียบร้อย',sub:'',stats:[],coins:0,xp:0},r||{});r.stats=r.stats||[];const pose=r.stars>=3?'celebrate':r.stars===2?'cheer':'thumbs';const id=r.id,rd=id&&RADI[id];const cardNew=r.cr&&(r.cr.newCard||r.cr.up);const nx=r.kind==='build'&&rd?radCur():null;
 return {title:'ผลลัพธ์',backLabel:'เรียนตัวอักษร',noRefresh:true,right:'',nav:'<header class="nav"><div class="nav-l"></div><div class="nav-t"></div><div class="nav-r"><button class="rd-done press" data-act="radexit">เสร็จ</button></div></header>',
  body:`<div class="stk-res rd-res"><div class="stk-burst"></div><div class="rm pop">${M(pose)}</div><div class="large center" style="padding:6px 20px 0">${r.title}</div><div class="stk-bigstars" aria-label="${r.stars} ดาว">${radStars(r.stars)}</div>
  <p class="cap center" style="font-size:14.5px;color:var(--sub2)">${r.sub}</p><p class="rd-draft">ข้อความไทยเป็นร่าง รอครูตรวจ</p>
  <div class="stk-tiles res">${r.stats.map(s=>`<div><b>${s[0]}</b><small>${s[1]}</small></div>`).join('')}</div>
  <div class="rd-rw"><span>+${r.xp} XP</span><span>${COIN.replace('<svg','<svg width="15" height="15"')} +${r.coins} เหรียญ</span>${radCoinLeft()===0?'<em>ถึงเพดานเหรียญวันนี้แล้ว (60/วัน)</em>':''}</div>
  ${cardNew?`<div class="rd-newc">${radCardHtml(id,{big:1,fresh:1})}<p class="cap center" style="margin-top:8px">${r.cr.up?'การ์ดอัปเกรดแล้ว!':'ได้การ์ดใหม่เข้าคอลเลกชัน!'}</p></div>`:''}
  ${r.cr&&r.cr.zoneSet!=null?`<div class="rd-zset card">${RAD_Z[r.cr.zoneSet].em} <b>ครบเขต ${r.cr.zoneSet+1}!</b> ได้ชุดลามะ “${RAD_Z[r.cr.zoneSet].n}” (ชุดจำลอง · ${RAD_DRAFT}) +30 เหรียญ</div>`:''}
  <div style="padding:16px 20px 0;display:flex;flex-direction:column;gap:10px"><button class="pill row1 linebtn press" id="rshare"><span style="display:inline-flex;margin-right:8px">${svg('<path d="M21 11.5C21 7.4 16.97 4 12 4S3 7.4 3 11.5c0 3.6 3.2 6.6 7.5 7.4.3.1.7.2.8.5.1.3.1.7 0 1l-.1.8c0 .3-.2 1.1 1 .6 1.2-.5 6.4-3.8 8.7-6.5 1.6-1.7 2.1-3.4 2.1-3.8z"/>',20)}</span>${r.share&&r.share.blitz!=null?'ท้าเพื่อนใน LINE':cardNew?'แชร์การ์ดไป LINE':'แชร์ผลไป LINE'}</button>
  ${nx?`<button class="pill row1 press" id="rnext">ตัวข้างถัดไป: ${nx.id} ${nx.th}</button>`:''}</div>
  <div class="stk-links"><button class="press" id="ragain">เล่นอีกครั้ง</button><button class="press" id="rcol">ดูการ์ดของฉัน</button></div><div style="height:40px"></div></div>`,
  mount(el){confetti(r.stars>=3?110:70);
   $('#rshare',el).onclick=()=>{if(r.share&&r.share.blitz!=null)return shareSheet('radchal',{score:r.share.blitz,text:r.share.t,sub:r.share.s});if(cardNew)return shareSheet('radcard',{id});shareSheet('radres',{text:r.share?r.share.t:r.title,sub:r.share?r.share.s:'',stats:r.stats.slice(0,3)})};
   $('#ragain',el).onclick=()=>replace(r.again.n,r.again.p);
   $('#rcol',el).onclick=()=>{const k=radS();k.tab='col';save();mountRoot('rad')};
   const nb=$('#rnext',el);if(nb)nb.onclick=()=>{popToRoot();push('radfam',{id:nx.id})}}}};
Object.assign(window.GOX,{radexit(){mountRoot('rad')}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act="radexit"]');if(t&&$('#frame').contains(t)){vib(6);mountRoot('rad')}});
