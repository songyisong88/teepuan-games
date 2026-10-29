/* หน้าหลักแบบใหม่ (ตามภาพร่าง home-redesign): หัวเล็ก · การ์ดเรียนต่อ · ไทล์ 4 ช่อง · ภารกิจย่อ · ตัวอักษรประจำวัน · LINE (จำลอง) · ดูเพิ่มเติม
   ข้อมูลทั้งหมดมาจากสถานะจริงของแอป ไม่มีตัวเลขสมมติ */
const hmPct=nu=>{if(!nu)return 0;const us=UNITS.filter(u=>u.lesson===nu.lesson);return Math.round(us.filter(u=>unitDone(u.id)).length/us.length*100)};
function hmRing(p){const C=2*Math.PI*44;return `<div class="hm-ring" role="img" aria-label="${p}% ของบทนี้"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="8"/><circle cx="50" cy="50" r="44" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(C*p/100).toFixed(1)} 999" transform="rotate(-90 50 50)"/></svg><div><b>${p}%</b><small>ของบทนี้</small></div></div>`}
/* การ์ดเริ่มต้นสำหรับคนใหม่ (ยังไม่เคยเรียนจบรอบใด): 3 ขั้นสั้น ๆ + กำลังใจจากมาสคอต ไม่มีตัวเลขสมมติ */
const HM_CHEER=['ไม่ต้องรู้ภาษาจีนมาก่อนก็เริ่มได้ ค่อย ๆ ไปทีละนิด','วันละไม่กี่นาทีก็พอ ผิดได้ ลองใหม่ได้ ไม่ต้องรีบ','เริ่มจากดูรูปกับฟังเสียง ไม่ต้องจำทั้งหมดในวันเดียว'];
function hmStart(){if(S.parts.length||!nextUnit())return '';const nu=nextUnit(),L=lessonBy(nu.lesson),w=(nu.words||L.words).find(x=>picHas(x))||null,cheer=HM_CHEER[today()%HM_CHEER.length];
 const st=(n,pic,t,s,go,attr)=>`<button class="hm-st press" data-go="${go}" ${attr||''}><span class="n">${n}</span><span class="pc">${pic}</span><span class="tx"><b>${t}</b><small>${s}</small></span></button>`;
 return `<div class="hm-start"><div class="hm-sh"><b>เริ่มต้นใน 3 ขั้น</b><span>${MASCOT_NAME}: ${cheer}</span></div>
  ${st(1,w?art('word',w.zh,'','pic-mini sm'):'📖','ดูรูป ฟังเสียง ตอบสั้น ๆ','บทแรก: '+L.th+' · ใช้เวลาราว 3 นาที','unit','data-id="'+nu.id+'"')}
  ${st(2,'<span class="zh" style="font-size:26px;color:#D9822B">亻</span>','ลำดับขีด','ดูขีดเคลื่อนไหวแล้วลองเขียนตาม ลองกี่ครั้งก็ได้','strokes')}
  ${st(3,'🔤','ฝึกฟังวรรณยุกต์','ด่านเล็ก ๆ เหมาะกับคนที่ยังไม่เคยเรียน','pinlv','data-n="'+(typeof prRec==='function'?(prRec()||1):1)+'"')}</div>`}
function hmContinue(goal,xp){const nu=nextUnit(),n=curLv(),started=S.parts.length>0;
 if(!nu)return `<div class="hm-cont end"><div style="padding:16px 14px 14px">${levelEndCta()}</div></div>`;
 const L=lessonBy(nu.lesson),ch=CHAPTERS.find(c=>c.id===L.chapter),us=UNITS.filter(u=>u.lesson===L.id),p=hmPct(nu);
 return `<div class="hm-cont"><span class="hm-wm zh" aria-hidden="true">${[...L.zh][0]}</span>
  <div class="hm-ct">${hmRing(p)}<div class="hm-tx"><div class="k">${started?'เรียนต่อ':'เริ่มเรียน'} · ระดับ ${n}</div><b>${L.th}</b><div class="zz"><span class="zh">${L.zh}</span> · ${lnoTxt(L)}</div><div class="zs">${ch?ch.th+' · ':''}${L.v3?'':'รอบ '+(nu.part+1)+' จาก '+us.length}</div></div></div>
  <button class="hm-go press" data-go="unit" data-id="${nu.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>${started?'เรียนต่อ':'เริ่มเรียน'}</button>
  <div class="hm-xp"><span>เป้าวันนี้ ${Math.min(xp,999)}/${goal} XP</span><i><b style="width:${Math.min(100,xp/goal*100)}%"></b></i></div></div>`}
function hmTiles(){const gw=gamesOpen()?gw4().length:0,rvw=reviewWords(),rv=rvw.length,rvp=rvw.find(w=>picHas(w));
 const T=(bg,ic,t,s,go,badge)=>`<button class="hm-tile press" data-go="${go}">${badge?`<i class="bd">${badge}</i>`:''}<span class="ti" style="background:${bg}">${ic}</span><b>${t}</b><small>${s}</small></button>`;
 return `<div class="hm-tiles">${T('#FBE3E0',M('brush'),'ลำดับขีด',STK_SET.size.toLocaleString('en-US')+' ตัว','strokes')}${T('#FDF0DA',`<span class="zh" style="font-size:30px;color:#D9822B">亻</span>`,'อักษรข้าง','48 ตัวข้าง','radhome')}${T('#E7EEFA','<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2B5B94" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M8 10.5v4M6 12.5h4"/><circle cx="15.5" cy="11.5" r=".8" fill="#2B5B94"/><circle cx="17.8" cy="13.5" r=".8" fill="#2B5B94"/></svg>','เกม',gw?gw+' คำ':'🔒 ล็อกอยู่','games')}${T('#F8E9E4',rvp?art('word',rvp.zh,'','hm-rvp'):'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C8102E" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/><path d="M12 8v4.5l3 1.8"/></svg>','ทบทวน',rv?rv+' คำถึงรอบ':'ยังไม่ถึงรอบ','review',rv?(rv>99?'99+':rv):'')}</div>`}
function hmMissions(){const ms=misState(),list=todayMis(),nGot=ms.got.length,all=list.every(m=>ms.got.includes(m.id));
 return `<div class="hm-sec"><h3>ภารกิจวันนี้</h3><span>${nGot}/3 · ${all?'รับโบนัสแล้ว ✓':'ครบสามได้ +25 🪙'}</span></div><div class="group hm-mis">${list.map(m=>{const c=Math.min(m.n,cntOf(m.k)),done=c>=m.n,got=ms.got.includes(m.id);
  return `<div class="hm-mr"><span class="me">${misIc(m)}</span><b class="${got?'dn':''}">${m.t}</b>${got?'<span class="ok">✓ รับแล้ว</span>':done?`<button class="chip coin press" data-go="mclaim" data-id="${m.id}">รับ 🪙10</button>`:`<i class="pb"><u style="width:${c/m.n*100}%"></u></i><span class="ct">${c}/${m.n}</span>`}</div>`}).join('')}</div>`}
function hmDaily(){const h=typeof stkHomeCard==='function'?stkHomeCard():'';if(!h)return '';return `<div class="hm-sec"><h3>ตัวอักษรประจำวัน</h3><button class="lk press" data-go="strokes">ลำดับขีด</button></div><div class="hm-daily">${h}${typeof stkHomeSearch==='function'?'<div style="margin-top:10px">'+stkHomeSearch()+'</div>':''}</div>`}
function hmLine(){return `<div class="hm-sec"><h3>เรียนกับเพื่อนใน LINE</h3><span class="hm-sim">จำลอง</span></div><div class="hm-line">
  <button class="press" data-go="challenge" style="background:#EAF6EF"><span class="hm-sim">จำลอง</span>${M('duel')}<b>ท้าเพื่อน</b><small>ดวลศัพท์ 5 ข้อ ส่งการ์ดผลลง LINE</small></button>
  <button class="press" data-go="study" style="background:#FDF1E1"><span class="hm-sim">จำลอง</span>${M('tea')}<b>เรียนพร้อมกัน</b><small>จับเวลา 10–15 นาที มีเพื่อนในห้องนั่งเรียนด้วย</small></button></div>
  <div class="hm-note"><span class="lg">L</span>เพื่อน คะแนนเพื่อน และการทำใน LINE ยังเป็นตัวอย่างจำลอง ไม่ใช่ข้อมูลจริง</div>`}
function hmMore(){const gw=gamesOpen()?gw4().length:0,cdone=S.chestDay===today();
 const items=[['#FDF3E6','🎁','หีบประจำวัน',cdone?'รับแล้ววันนี้':'พร้อมเปิด รับเหรียญฟรี','chest',''],['#E7F8EE',M('teach'),'ถามน้องลามา','อธิบายคำ · ซ้อมคุย (ติวเตอร์จำลอง)','tutor',''],['#FDECEC',M('speaking'),'ฝึกพูด','พูดตามน้องลามา (คะแนนจำลอง)','play','speak'],['#EAF1FB',M('listening'),'ฝึกฟัง','ฟังแล้วเลือกความหมาย','play','listen'],['#FBE9E4','🔤','ห้องพินอิน',prDoneN()+'/12 ด่าน · เรียนอ่านพินอินจากศูนย์','pinroom',''],['#F2ECFA',M('write'),'วรรณยุกต์','เทียบกับเสียงสูงต่ำของไทย','tones',''],['#FDF3E6','🧪','ห้องฝึกพิเศษ','นิทาน · เทียบคำ · พูดตาม · ข้อสอบจำลอง','labs',''],['#F2ECFA','🏫','ห้องเรียนกลุ่ม','ควิซประจำวัน · อันดับห้อง (จำลอง)','group','0'],['#EAF1FB','📊','สรุปสัปดาห์','การ์ดสรุปไว้แชร์ใน LINE','recap',''],['#FDECEC','💌','ชวนเพื่อน','เพื่อนเข้าห้อง ได้ทั้งคู่ (จำลอง)','invite','']];
 const at=(g,x)=>g==='play'?`data-go="play" data-g="${x}"`:g==='group'?`data-go="group" data-i="0"`:`data-go="${g}"`;
 const ico=i=>/^<img/.test(i)?i:`<span class="e">${i}</span>`;
 return `<details class="hm-more card" id="hmMore"><summary><div><b>ดูเพิ่มเติม</b><small>อีก ${items.length} อย่างที่เก็บไว้ไม่ให้หน้าหลักโล่ง</small></div><span class="cv" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
  <div class="pv" aria-hidden="true">${items.slice(0,6).map(i=>`<span><span class="ib" style="background:${i[0]}">${ico(i[1])}</span><small>${i[2]}</small></span>`).join('')}</div></summary>
  <div class="hm-mg">${items.map(i=>`<button class="hm-mi press" ${at(i[4],i[5])}><span class="ib" style="background:${i[0]}">${ico(i[1])}</span><span class="tx"><b>${i[2]}</b><small>${i[3]}</small></span></button>`).join('')}</div>
  <div class="hm-ex">${eventCard()}${typeof weeklyCard==='function'?weeklyCard():''}${buddyCard()}</div></details>`}
/* ===== หน้าหลักแบบ G (กิจกรรมประจำสัปดาห์) — อนุมัติแล้ว
   ลำดับ: แบนเนอร์กิจกรรม · เรียนต่อ + ทางลัด · วงล้อคำประจำวัน · ปฏิทินการเรียน · คะแนนสัปดาห์นี้ · คำที่ควรทบทวน · อ่านเรื่องสั้น
   สถานะใหม่เก็บใน localStorage 'lama-homeg' (อยู่ในไฟล์สำรองของ backup.js เพราะขึ้นต้นด้วย lama-) */
const HG_KEY='lama-homeg';
function hgS(){if(!window._hg){let o={};try{o=JSON.parse(localStorage.getItem(HG_KEY)||'{}')||{}}catch(e){}window._hg=Object.assign({spin:{d:-99,zh:''},got:[],evc:-99},o);if(!Array.isArray(_hg.got))_hg.got=[]}return window._hg}
function hgSave(){try{localStorage.setItem(HG_KEY,JSON.stringify(hgS()))}catch(e){}}
const hgDate=n=>new Date(n*864e5);/* เลขวันของแอป (today()) → วันที่ (อ่านด้วย getUTC*) */
const hgDow=n=>(hgDate(n).getUTCDay()+6)%7;/* 0=จันทร์ … 6=อาทิตย์ */
const hgWeek=()=>{const t=today();return t-hgDow(t)};/* เลขวันของวันจันทร์สัปดาห์นี้ */
const HG_PLAY='<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
const HG_EV=[
 {t:'สัปดาห์ไหว้พระจันทร์',p:'月亮',g:'#3A4C8F,#22295A,#171C40',r:'#22295A'},
 {t:'สัปดาห์ชาจีน',p:'茶',g:'#2F7A72,#1C4D48,#123533',r:'#1C4D48'},
 {t:'สัปดาห์กำแพงเมืองจีน',p:'长城',g:'#5C6E3A,#3A4A24,#262F17',r:'#3A4A24'},
 {t:'สัปดาห์อั่งเปา',p:'红包',g:'#9A2E40,#64182A,#40101B',r:'#64182A'},
 {t:'สัปดาห์แพนด้า',p:'熊猫',g:'#45607A,#2A3D52,#1A2838',r:'#2A3D52'}];
const hgEvent=()=>HG_EV[Math.floor(hgWeek()/7)%HG_EV.length];
const hgLit=()=>{const w=hgWeek();return [0,1,2,3,4,5,6].map(i=>dayXp(w+i)>0)};
function hgLan(on){const c=on?['#F2C14E','#E8412B','rgba(120,20,10,.35)']:['rgba(255,255,255,.3)','rgba(255,255,255,.18)','rgba(255,255,255,.12)'];
 return `<span class="hg-lan${on?' on':''}"><svg viewBox="0 0 30 38" aria-hidden="true">${on?'<ellipse cx="15" cy="21" rx="14" ry="15" fill="#FFB347" opacity=".28"/>':''}<path d="M15 1v4" stroke="${c[0]}" stroke-width="1.5"/><rect x="9" y="5" width="12" height="3" rx="1" fill="${c[0]}"/><ellipse cx="15" cy="19" rx="11" ry="11" fill="${c[1]}"/><path d="M15 8v22M9 10c-3 6-3 12 0 18M21 10c3 6 3 12 0 18" stroke="${c[2]}" stroke-width="1" fill="none"/><rect x="9" y="29" width="12" height="3" rx="1" fill="${c[0]}"/><path d="M15 32v5" stroke="${c[0]}" stroke-width="1.5"/></svg></span>`}
function hgEventCard(){const E=hgEvent(),lit=hgLit(),n=lit.filter(Boolean).length,left=6-hgDow(today()),g=E.g.split(','),claimed=hgS().evc===hgWeek(),nu=nextUnit();
 const st=[[30,18,.8],[120,30,.5],[190,14,.7],[160,70,.4],[240,160,.5],[80,60,.3],[220,90,.6]].map(a=>`<i style="left:${a[0]}px;top:${a[1]}px;opacity:${a[2]}"></i>`).join('');
 const btn=n>=7&&!claimed?`<button class="hg-evb press" data-go="hgevclaim">รับ 50 เหรียญ</button>`:`<button class="hg-evb press" ${nu?`data-go="unit" data-id="${nu.id}"`:'data-go="review"'}>${HG_PLAY} ร่วมกิจกรรม</button>`;
 return `<section class="hg-event" id="hgEvent" style="background:radial-gradient(120% 90% at 85% 0%,${g[0]} 0%,${g[1]} 55%,${g[2]} 100%)" aria-label="กิจกรรมประจำสัปดาห์">
  <div class="hg-stars" aria-hidden="true">${st}</div><div class="hg-moon">${art('word',E.p,'','hg-mart')}</div>
  <span class="hg-evpill">กิจกรรมประจำสัปดาห์ · ${left?'เหลือ '+left+' วัน':'วันสุดท้าย'}</span>
  <h2>${E.t}</h2><p>เรียนหรือทบทวนวันละครั้ง จุดโคมให้ครบ 7 ดวง</p>
  <div class="hg-lans" role="img" aria-label="จุดแล้ว ${n} จาก 7 ดวง">${lit.map(hgLan).join('')}</div>
  <div class="hg-evft"><small>${claimed?'ครบ 7 ดวง รับรางวัลแล้ว':n>=7?'ครบ 7 ดวงแล้ว':`จุดแล้ว ${n} จาก 7 ดวง`}</small>${btn}</div></section>`}
function hgQuick(){const nu=nextUnit(),started=S.parts.length>0,rv=reviewWords().length,go=gamesOpen();let a;
 if(nu){const L=lessonBy(nu.lesson),ws=[...(nu.words&&nu.words.length?nu.words:(L.words||[])),...(nu.words&&nu.words.length||(L.words||[]).length?[]:[...reviewWords(),...gameWords()])].filter(w=>w&&w.zh).slice(0,3),p=hmPct(nu);
  a=`<button class="hg-qa press" data-go="unit" data-id="${nu.id}"><span class="wm zh" aria-hidden="true">${[...L.zh][0]}</span><small>${started?'เรียนต่อ':'เริ่มเรียน'} · ${lnoTxt(L)}</small><b>${L.th}</b>
   <span class="pics">${ws.map(w=>picHas(w)?art('word',w.zh,'','hg-qp'):`<span class="hg-qp zt"><span class="zh">${[...w.zh][0]}</span></span>`).join('')}</span>
   <span class="bar" role="img" aria-label="${p}% ของบทนี้"><i style="width:${p}%"></i></span><span class="go">${HG_PLAY} ${started?'เรียนต่อ':'เริ่มเรียน'}</span></button>`}
 else a=`<div class="hg-qa end"><small>ระดับ ${curLv()}</small><b>เรียนครบทุกบทที่มีแล้ว</b><button class="go press" data-go="levels">เลือกระดับ</button></div>`;
 return `<div class="hg-quick">${a}<div class="hg-qs"><button class="hg-qb press" data-go="review" style="background:#E8F1FB"><b>${rv?'ทบทวน '+rv+' คำ':'ทบทวนคำ'}</b><small>${rv?'ราว '+Math.max(1,Math.ceil(rv*.4))+' นาที':'ยังไม่มีคำค้าง'}</small>${M('think')}</button>
  <button class="hg-qb press" data-go="play" data-g="speed" style="background:#EEF7F1"><b>รอบเร็ว</b><small>${go?'60 วินาที':'เปิดหลังจบบทที่ 1'}</small>${M('timer')}</button></div></div>`}
/* วงล้อคำประจำวัน: ตามบทที่เรียนถึง — คำของบทจนถึงบทที่กำลังเรียนที่ยังไม่ได้ก่อน → คำที่เรียนแล้ว (ยังไม่ได้จากวงล้อ) → คำที่เรียนแล้ว → คำของบทแรก ๆ
   ไม่เอาคำของบทอนาคตหรือระดับถัดไป (คำที่หมุนได้เข้าไปอยู่ในรอบทบทวน จึงต้องเป็นคำที่เรียนถึงแล้วเท่านั้น) */
function hgPool(){const t=today(),n=curLv(),k=hgS(),got=new Set(k.got.map(g=>g.zh)),own=new Set([...gameWords().map(w=>w.zh),...Object.keys(S.srs||{}),...got]);
 const ok=w=>w&&picHas(w)&&audioUrl(w.zh)&&w.th;
 const soFar=uniqW(lvSoFar(n).flatMap(l=>l.words)).filter(ok),taught=gameWords().filter(ok);
 const tiers=[soFar.filter(w=>!own.has(w.zh)),taught.filter(w=>!got.has(w.zh)),taught,soFar,lvStarter(n,12).filter(ok)];
 let P=[];for(const tr of tiers){if(P.length>=6)break;const have=new Set(P.map(w=>w.zh));P=P.concat(seedPick(uniqW(tr).filter(w=>!have.has(w.zh)),6-P.length,'hgspin'+t))}
 return P.slice(0,6)}
const HG_SEG=['#FBE3E0','#FDF0DA','#EEF7F1','#E8F1FB','#F6F1FB','#FFF6E4'];
function hgWheelSvg(ws){const C=88,R=88,pt=a=>[C+R*Math.sin(a*Math.PI/180),C-R*Math.cos(a*Math.PI/180)].map(v=>v.toFixed(1));let seg='',defs='';
 ws.forEach((w,i)=>{const a0=i*60-30,a1=i*60+30,p0=pt(a0),p1=pt(a1),cx=(C+56*Math.sin(i*Math.PI/3)).toFixed(1),cy=(C-56*Math.cos(i*Math.PI/3)).toFixed(1);
  defs+=`<clipPath id="hgc${i}"><circle cx="${cx}" cy="${cy}" r="21"/></clipPath>`;
  seg+=`<path d="M${C} ${C}L${p0[0]} ${p0[1]}A${R} ${R} 0 0 1 ${p1[0]} ${p1[1]}Z" fill="${HG_SEG[i%6]}" stroke="#fff" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="23" fill="#fff"/><image href="assets/art/word/${encodeURIComponent(w.zh)}.webp" x="${cx-21}" y="${cy-21}" width="42" height="42" clip-path="url(#hgc${i})" preserveAspectRatio="xMidYMid slice"/>`});
 let dots='';for(let i=0;i<12;i++){const a=i*30*Math.PI/180;dots+=`<circle cx="${(C+84*Math.sin(a)).toFixed(1)}" cy="${(C-84*Math.cos(a)).toFixed(1)}" r="2.2" fill="#F2C14E"/>`}
 return `<svg width="176" height="176" viewBox="0 0 176 176" aria-hidden="true"><defs>${defs}</defs><circle cx="88" cy="88" r="88" fill="#C8102E"/><g>${seg}</g>${dots}</svg>`}
const hgWord=w=>`${picHas(w)?art('word',w.zh,'','hg-rpic',w.th):''}<div class="hg-rz zh">${w.zh}</div><div class="hg-rpy">${(w.py||'').replace(/\|/g,'')}</div><div class="hg-rth">${w.th}</div>`;
function hgSpinCard(){const k=hgS(),t=today(),done=k.spin.d===t,ws=done&&k.spin.ws?k.spin.ws.map(wordBy).filter(Boolean):hgPool(),w=done?wordBy(k.spin.zh):null,idx=w?Math.max(0,ws.findIndex(x=>x.zh===w.zh)):0;
 if(ws.length<6&&!done)return `<div class="card hg-spin"><div class="hg-stx"><b>วงล้อคำประจำวัน</b><small>ตอนนี้ได้คำใหม่ครบทุกคำที่มีรูปและเสียงแล้ว</small></div></div>`;
 const rot=done?-idx*60:0;
 return `<div class="card hg-spin" id="hgSpin"><div class="hg-wh"><span class="hg-ptr" aria-hidden="true"></span><div class="hg-rot" id="hgRot" style="transform:rotate(${rot}deg)">${hgWheelSvg(ws)}</div><button class="hg-hub press" id="hgHub" aria-label="หมุนวงล้อ" ${done?'disabled':''}>${HG_PLAY}</button></div>
  <div class="hg-stx">${done&&w?`<div class="hg-got"><b class="zh">${w.zh}</b><span>${(w.py||'').replace(/\|/g,'')}</span><small>${w.th}</small></div><small>วันนี้ได้คำนี้แล้ว อยู่ในคำที่ควรทบทวน หมุนใหม่ได้พรุ่งนี้</small><div class="hg-srow"><button class="hg-say press" data-go="hgsay" data-z="${w.zh}" aria-label="ฟังเสียง ${w.zh}">${SPK}</button><button class="hg-sbtn ghost press" data-go="hgres">ดูคำนี้</button></div>`
   :`<b>หมุนวันละครั้ง รับคำใหม่ 1 คำ</b><small>คำที่ได้จะเข้าไปอยู่ในคำที่ควรทบทวน และได้ 10 เหรียญ</small><button class="hg-sbtn press" id="hgGo">หมุนวงล้อ</button>`}</div></div>`}
function hgResult(w,fresh){openSheet(`<div class="hg-res">${hgWord(w)}<button class="hg-say lg press" id="hgRs" aria-label="ฟังเสียง ${w.zh}">${SPK}</button>
  <p class="cap">${fresh?'เพิ่มเข้าคำที่ควรทบทวนแล้ว · ได้ 10 เหรียญ':'คำนี้อยู่ในคำที่ควรทบทวน'}</p><button class="pill row1 press mt12" data-go="hgrev">ไปทบทวนคำ</button></div>`,
  {title:fresh?'ได้คำใหม่':'คำของวันนี้',onMount(sh){const b=$('#hgRs',sh);b.onclick=()=>speak(w.zh,b);setTimeout(()=>speak(w.zh,b),350)}})}
function hgSpin(el){const k=hgS(),t=today();if(k.spin.d===t)return;const ws=hgPool();if(ws.length<6)return;const i=Math.random()*6|0,w=ws[i];
 k.spin={d:t,zh:w.zh,ws:ws.map(x=>x.zh)};if(!k.got.some(g=>g.zh===w.zh))k.got.unshift({zh:w.zh,d:t});k.got=k.got.slice(0,200);hgSave();
 srsGrade(w,false,1);addCoins(10);save();vib(30);
 $$('#hgGo,#hgHub',el).forEach(b=>b.disabled=true);const r=$('#hgRot',el),fin=()=>{bumpChips();refresh();confetti(50);hgResult(w,true)};
 if(r&&!matchMedia('(prefers-reduced-motion: reduce)').matches){r.style.transition='transform 3.2s cubic-bezier(.12,.7,.15,1)';requestAnimationFrame(()=>{r.style.transform=`rotate(${360*5-i*60}deg)`});setTimeout(fin,3300)}else fin()}
function hgCal(){const t=today(),d0=hgDate(t),dom=d0.getUTCDate(),first=t-dom+1,dim=new Date(Date.UTC(d0.getUTCFullYear(),d0.getUTCMonth()+1,0)).getUTCDate(),cs=curStreak(),lo=S.lastDay-cs+1;
 let cells='',month=0;for(let i=0;i<hgDow(first);i++)cells+='<span class="c e"></span>';
 for(let j=0;j<dim;j++){const n=first+j,on=dayXp(n)>0;if(on)month++;const run=on&&cs>0&&n>=lo&&n<=S.lastDay;
  cells+=`<span class="c${n>t?' fu':run?' on2':on?' on':''}${n===t?' td':''}">${j+1}</span>`}
 const mn=d0.toLocaleDateString('th-TH',{month:'long',timeZone:'UTC'})+' '+(d0.getUTCFullYear()+543);
 return {mn,html:`<div class="card hg-cal" id="hgCal"><div class="hg-cst"><div><small>ต่อเนื่องตอนนี้</small><b>${FLAME.replace('<svg','<svg width="16" height="16"')} ${cs} วัน</b></div><div><small>ต่อเนื่องสูงสุด</small><b>${Math.max(S.bestStreak||0,cs)} วัน</b></div><div><small>เดือนนี้</small><b>${month} วัน</b></div></div>
  <div class="hg-gr" role="grid" aria-label="ปฏิทินการเรียน ${mn}">${['จ','อ','พ','พฤ','ศ','ส','อา'].map(x=>`<span class="wd">${x}</span>`).join('')}${cells}</div>
  <div class="hg-leg"><span><i class="on"></i>วันที่เรียน</span><span><i class="on2"></i>ต่อเนื่องตอนนี้</span><span><i class="td"></i>วันนี้</span></div></div>`}}
function hgRank(){const w=hgWeek();let pts=0;for(let i=0;i<7;i++)pts+=dayXp(w+i);const nm=dn()||'คุณ';
 const pd=(c,r)=>`<div class="hg-pd ${c}"><div class="ava" aria-hidden="true"></div><div class="nm">ยังว่าง</div><div class="pt">รอเปิดห้องเรียน</div><div class="bl">${r}</div></div>`;
 return `<div class="card hg-lb" id="hgRank"><div class="hg-pod" aria-label="อันดับ 1 ถึง 3 ยังว่าง">${pd('p2',2)}${pd('p1',1)}${pd('p3',3)}</div>
  <div class="hg-me"><span class="rk">–</span><span class="ava">${M('student')}</span><div class="tx"><b>${nm}</b><small>คะแนนสัปดาห์นี้ของคุณ (XP ตั้งแต่วันจันทร์)</small></div><span class="pt">${pts.toLocaleString('en-US')}</span></div>
  <p class="hg-note">อันดับห้องเรียนจะแสดงเมื่อมีระบบบัญชีห้องเรียน ตอนนี้ยังไม่มีข้อมูลผู้เรียนคนอื่น จึงแสดงเฉพาะคะแนนของคุณ</p></div>`}
function hgReview(){const ws=reviewWords();const P=[...ws.filter(picHas),...ws.filter(w=>!picHas(w))].slice(0,4);
 if(!P.length)return `<div class="card hg-empty">ยังไม่มีคำที่ต้องทบทวน หมุนวงล้อหรือเรียนบทใหม่เพื่อเพิ่มคำ</div>`;
 return `<div class="hg-grid2">${P.map(w=>`<div class="card hg-wc">${picHas(w)?art('word',w.zh,'','hg-wpic',w.th):`<span class="hg-wpic zt"><span class="zh">${w.zh}</span></span>`}<div class="z zh">${w.zh}</div><div class="py">${(w.py||'').replace(/\|/g,'')}</div><div class="th">${w.th}</div><button class="hg-say press" data-go="hgsay" data-z="${w.zh}" aria-label="ฟังเสียง ${w.zh}">${SPK}</button></div>`).join('')}</div>`}
const HG_STOP=new Set(['我','你','他','她','是','的','了','有','在','和','也','不','很','这','那','个','人','我们','他们','你们','一','二','三','四','五','六','七','八','九','十','吗','呢','吧','好','叫','去','说','看','想','要']);
function hgCover(s,used){const ts=[];s.s.forEach(x=>x.t.forEach(t=>ts.push(t)));const ok=t=>window.ART_IDX&&ART_IDX['word/'+t]&&!used.has(t);return ts.find(t=>ok(t)&&!HG_STOP.has(t))||ts.find(ok)||s.pic||''}
function hgStories(){const LB=(window.LABS&&LABS.stories||[]).filter(s=>s.k!=='a');if(!LB.length)return '';const n=curLv();let L=LB.filter(s=>s.lv===n);if(L.length<2)L=LB.filter(s=>s.lv<=n+1);
 const cv=s=>typeof lbCover==='function'?lbCover(s).ratio>=(typeof LB_UNLOCK==='number'?LB_UNLOCK:.6):true,open=L.filter(cv),ev=(open.length?open:L)[Math.floor(hgWeek()/7)%(open.length||L.length)];
 const list=[ev,...L.filter(s=>s!==ev)].slice(0,5),used=new Set();
 return `<div class="hg-shelf">${list.map((s,i)=>{const c=hgCover(s,used);used.add(c);const o=cv(s),m=Math.max(2,Math.round(s.s.length/3));
  return `<button class="hg-story press${o?'':' lk'}" data-go="hgstory" data-id="${s.id}" data-o="${o?1:0}">${c&&ART_IDX['word/'+c]?`<img src="assets/art/word/${encodeURIComponent(c)}.webp" alt="" loading="lazy" decoding="async" draggable="false">`:''}${i===0?'<span class="ribbon" style="background:'+hgEvent().r+'">เรื่องประจำกิจกรรม</span>':''}<span class="ov"><b>${s.th}</b><small>ระดับ ${s.lv} · ${o?'อ่าน '+m+' นาที':'ต้องรู้คำมากขึ้นก่อน'}</small></span></button>`}).join('')}</div>`}
Object.assign(window.GOX=window.GOX||{},{
 hgsay:el=>speak(el.dataset.z,el),
 hgrev:()=>{closeSheet();push('review')},
 hgres:()=>{const w=wordBy(hgS().spin.zh);if(w)hgResult(w,false)},
 hggot:()=>{const G=hgS().got.map(g=>wordBy(g.zh)).filter(Boolean);openSheet(G.length?`<div class="hg-gotl">${G.map(w=>`<div class="hg-gl">${picHas(w)?art('word',w.zh,'','hg-glp'):''}<div class="tx"><b class="zh">${w.zh}</b><span>${(w.py||'').replace(/\|/g,'')}</span><small>${w.th}</small></div><button class="hg-say press" data-go="hgsay" data-z="${w.zh}" aria-label="ฟังเสียง ${w.zh}">${SPK}</button></div>`).join('')}</div>`:'<p class="cap center" style="padding:10px 20px 20px">ยังไม่มีคำจากวงล้อ หมุนได้วันละครั้งที่หน้าหลัก</p>',{title:'คำที่ได้จากวงล้อ'})},
 hgevclaim:el=>{const k=hgS(),w=hgWeek();if(k.evc===w||hgLit().filter(Boolean).length<7)return;k.evc=w;hgSave();addCoins(50);save();bumpChips();confetti(70);toast('ได้ 50 เหรียญจากกิจกรรมประจำสัปดาห์');refresh()},
 hgstory:el=>{if(el.dataset.o!=='1'){toast('เรียนคำในระดับนี้ให้มากกว่านี้ก่อน แล้วเรื่องนี้จะเปิด');vib([12,30,12]);return}push('reader',{id:el.dataset.id})}});
SC.home=()=>{const nm=dn(),cal=hgCal();
 const sec=(h,lk,go)=>`<div class="hg-sec"><h3>${h}</h3>${lk?go?`<button class="lk press" data-go="${go}">${lk}</button>`:`<span class="lk">${lk}</span>`:''}</div>`;
 return {title:BRAND_NAME,body:`${S.from==='line'?'<div class="banner fade-in" style="margin-top:2px">✓ เปิดจาก LINE OA (จำลอง) · เข้าสู่ระบบให้แล้ว</div>':''}
 <div class="hg-hello"><div class="cap">${dateTxt()}</div><h1 class="hg-h1">${nm?'สวัสดี '+nm:'สวัสดี'}</h1></div>
 ${hgEventCard()}${hgQuick()}
 ${sec('วงล้อคำประจำวัน','คำที่ได้แล้ว','hggot')}${hgSpinCard()}
 ${sec('ปฏิทินการเรียน',cal.mn)}${cal.html}
 ${sec('คะแนนสัปดาห์นี้','')}${hgRank()}
 ${sec('คำที่ควรทบทวน','ทบทวนทั้งหมด','review')}${hgReview()}
 ${sec('อ่านเรื่องสั้น','ดูทั้งหมด','readers')}${hgStories()}<div style="height:8px"></div>${DEMO}`,
 mount(el){const g=$('#hgGo',el),h=$('#hgHub',el);[g,h].forEach(b=>b&&(b.onclick=e=>{e.stopPropagation();hgSpin(el)}))}}};
