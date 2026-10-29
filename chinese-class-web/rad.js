/* อักษรข้าง — เส้นทางตัวข้าง/ส่วนประกอบ (แยกจากบทเรียน ไม่ผูกกับการปลดล็อกบท ไม่มีลิงก์ย้อนจากบทเรียน)
   ข้อมูล: data/rad/rad.js สร้างจาก Make Me a Hanzi (LGPL-3) ผ่านชั้นแก้ไขของเรา · ชื่อไทย/ตัวช่วยจำ/ชื่อการ์ดเป็น "ร่าง รอครูตรวจ"
   ลำดับขีดสำหรับระบายสีส่วนประกอบ: hanzi-writer-data (Arphic) — ดู data/stroke/NOTICE.md */
const RAD_DRAFT='ร่าง รอครูตรวจ';
/* รูปประกอบตัวข้าง (เฟส 5): ใช้รูปคำศัพท์ที่มีอยู่ (data/rad/pic.js) สื่อความหมาย · ไม่มีรูป = ไม่แสดงอะไร */
const radPicK=p=>p[2]||'word';
const radPic=id=>{const p=typeof RAD_PIC!=='undefined'&&RAD_PIC[id];return p&&window.ART_IDX&&ART_IDX[radPicK(p)+'/'+p[0]]?p:null};
const radPicImg=(id,cls)=>{const p=radPic(id);return p?art(radPicK(p),p[0],'',cls||'',p[1]):''};
const RADI={};RAD.forEach(r=>RADI[r.id]=r);
const RAD_CORE=RAD.filter(r=>!r.bonus);
const RAD_OR='#D9822B',RAD_BL='#3A64A8';
const radDefault=()=>({done:{},cards:{},known:{},coin:{d:-99,n:0},daily:{d:-99,ok:0,n:0},blitz:{best:0,runs:0,hist:[]},det:{n:0,ok:0},built:0,zones:{},ch:[],lv:[],tip:0,tab:'path'});
function radS(){if(!S.rad||typeof S.rad!=='object')S.rad=radDefault();const k=S.rad;const d=radDefault();for(const x in d)if(k[x]===undefined)k[x]=d[x];return k}
const radEsc=s=>String(s==null?'':s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
/* ---- ข้อมูลตัวอักษร ---- */
let _radG=null;
function radG(c){if(!_radG){_radG={};for(const w of ALLW){for(const ch of stkHan(w.zh)){const cur=_radG[ch];const single=w.zh===ch;
  const better=!cur||(single&&!cur.single)||(single===cur.single&&(w.zh.length<cur.w.length||(w.zh.length===cur.w.length&&w.lv<cur.lv)));
  if(better)_radG[ch]={w:w.zh,th:w.th,py:w.py,single,lv:w.lv,lesson:w.lesson,e:w}}}}return _radG[c]||null}
const RAD_FULL={"友": "yǒu", "生": "shēng", "姐": "jiě", "欢": "huān", "服": "fú", "宜": "yí", "候": "hòu", "识": "shí", "思": "sī", "诉": "sù", "情": "qíng", "夫": "fū", "睛": "jīng", "息": "xī", "楚": "chǔ", "务": "wù", "边": "biān", "李": "lǐ", "阳": "yáng", "士": "shì", "净": "jìng", "泼": "pō", "匙": "chí", "户": "hù", "拾": "shí", "嗽": "sòu", "量": "liàng", "寸": "cùn", "牌": "pái", "腐": "fǔ", "篷": "péng", "璃": "lí", "尚": "shàng", "傅": "fù", "巴": "bā", "筝": "zhēng", "矩": "jǔ", "置": "zhì", "糊": "hú"};/* เสียงเต็มของตัวเดี่ยว ตรวจกับ Unihan kMandarin + pypinyin · เสียงเบาจริง (们 吗 的 子 么 了 着 呀 啊 地 呢 吧) คงเดิม */
function radPy(c){if(RAD_FULL[c])return RAD_FULL[c];const g=radG(c);if(g){if(g.single)return g.py;const cs=stkHan(g.w);const sy=(g.py||'').split(/[ |]+/).filter(Boolean);if(sy.length===cs.length){const i=cs.indexOf(c);if(i>=0)return sy[i]}}const r=RAD_CH[c];return r?r[7]:(RAD_PY[c]||'')}
/* ความหมายระดับตัวอักษร (report5 M5) — ตัวที่ไม่มีคำเดี่ยวในบทเรียน เดิมใช้ความหมายของทั้งคำ (ร่าง รอครูตรวจ) */
const RAD_GL1={'超':'ข้าม · เกิน','打':'ตี · ทำ','感':'รู้สึก','酒':'เหล้า · สุรา','车':'รถ','国':'ประเทศ','米':'ข้าว · เมตร'};
function radGl(c){const g=radG(c);if(RAD_GL1[c]&&!(g&&g.single))return RAD_GL1[c];if(!g)return '';return g.th}
function radGlNote(c){const g=radG(c);return g&&!g.single?(RAD_GL1[c]?`เจอในคำ ${g.w}`:`ความหมายของคำ ${g.w}`):''}
const radLvOf=c=>{const g=radG(c);return g?g.lv:0};
const radTone=p=>toneOf(p||'')
function radLessonNo(c){const g=radG(c);return g?g.lesson:null}
/* ตัวอักษรในครอบครัว: ตัวอย่างที่คัดไว้ก่อน แล้วตามด้วยตัวที่ตัวข้างบอกความหมาย แล้วตัวที่ใช้เป็นรูปร่าง */
function radMembers(r){const m=RAD_MEM[r.id]||{s:[],w:[]};const sem=[...new Set([...r.ex.filter(c=>m.s.includes(c)||m.w.includes(c)),...m.s])];
 const lvs=c=>radLvOf(c)||9;const ex=new Set(r.ex);const rest=sem.filter(c=>!ex.has(c)).sort((a,b)=>lvs(a)-lvs(b));
 const head=sem.filter(c=>ex.has(c));const weak=m.w.filter(c=>!sem.includes(c)).sort((a,b)=>lvs(a)-lvs(b));return {sem:[...head,...rest],weak,all:m.s.length+m.w.length}}
const radKind=c=>{const r=RAD_CH[c];return r?r[1]:'-'};
/* สีส่วนประกอบจากลำดับขีด */
const RAD_SVG={};
function radSvgOf(d,idx){const set=new Set(idx||[]);return `<svg viewBox="0 0 1024 1024" aria-hidden="true"><g transform="translate(0,900) scale(1,-1)">${d.strokes.map((p,i)=>`<path d="${p}" fill="${set.has(i)?RAD_OR:'currentColor'}"/>`).join('')}</g></svg>`}
let _radIO=null,_radQ=[],_radBusy=0;
function radPump(){while(_radBusy<5&&_radQ.length){const el=_radQ.shift();const c=el.dataset.c;if(!el.isConnected||el.dataset.done)continue;_radBusy++;
  stkLoad(c).then(d=>{if(d&&!d.err&&el.isConnected){const idx=(el.dataset.ss||'').split(',').filter(x=>x!=='').map(Number);el.innerHTML=radSvgOf(d,idx);el.dataset.done=1;el.classList.add('svg')}}).finally(()=>{_radBusy--;radPump()})}}
function radColorize(root){const els=[...root.querySelectorAll('.rd-g[data-c]:not([data-done])')];if(!els.length)return;
 if(!('IntersectionObserver' in window)){els.forEach(e=>_radQ.push(e));radPump();return}
 const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){io.unobserve(en.target);_radQ.push(en.target)}});radPump()},{root:root.closest('.scroller')||null,rootMargin:'200px'});els.forEach(e=>io.observe(e))}
const radGlyph=(c,ss,cls='')=>`<span class="rd-g ${cls}" data-c="${c}" ${ss&&ss.length?`data-ss="${ss.join(',')}"`:''}><span class="zh">${c}</span></span>`;
/* ---- สถานะเส้นทาง ---- */
const radDone=id=>!!radS().done[id];
const radCur=()=>RAD.find(r=>!radDone(r.id))||null;
const radCoreDone=()=>RAD_CORE.filter(r=>radDone(r.id)).length;
function radCharsDone(){const s=new Set();RAD.forEach(r=>{if(radDone(r.id))(RAD_MEM[r.id].s||[]).forEach(c=>s.add(c))});return s.size}
function radZone(z){return RAD.filter(r=>r.z===z)}
function radLvPool(){const k=radS();const a=k.lv&&k.lv.length?k.lv:[1,2,3,4,5].filter(x=>x<=curLv());return new Set(a.length?a:[1])}
const radTrustTxt=t=>({3:['ความหมายตรงชัด (กว้าง ๆ)','ok'],2:['บอกความหมายได้บางส่วน','mid'],1:['ใช้เป็นรูปร่างมากกว่าความหมาย','lo']}[t]);
/* รางวัล (เหรียญจำกัดวันละ 60 · ไม่มีกาชา) */
const RAD_CAP=60;
function radCoin(n){const k=radS();if(k.coin.d!==today())k.coin={d:today(),n:0};const g=Math.max(0,Math.min(n,RAD_CAP-k.coin.n));k.coin.n+=g;if(g)addCoins(g);else save();return g}
const radCoinLeft=()=>{const k=radS();return k.coin.d!==today()?RAD_CAP:Math.max(0,RAD_CAP-k.coin.n)};
/* ผ่านครอบครัว: ได้การ์ด เหรียญ XP และเช็คชุดของเขต */
function radComplete(id,o){o=o||{};const k=radS(),r=RADI[id];const stars=o.stars||1;const first=!k.done[id];
 const rar=stars>=3?3:stars===2?2:1;let newCard=false,up=false,zoneSet=null,coins=0,xp=0;
 if(first){k.done[id]={t:today(),s:stars,skip:o.skip?1:0}}else if(stars>(k.done[id].s||0)){k.done[id].s=stars}
 if(!o.skip){const c=k.cards[id];if(!c){k.cards[id]={r:rar,t:today()};newCard=true}else if(rar>c.r){c.r=rar;up=true}
  if(first){coins=radCoin(10);xp=15;addXp(15)}else{xp=3;addXp(3)}}
 let zdone=false;if(first){const zs=radZone(r.z).filter(x=>!x.bonus||r.bonus);zdone=zs.length&&zs.every(x=>radDone(x.id))&&!k.zones[r.z]}
 if(zdone){k.zones[r.z]=today();zoneSet=r.z;coins+=radCoin(30)}
 save();return {first,newCard,up,coins,xp,zoneSet,rar}}
/* ---------- ไอคอน/ชิ้นส่วน UI ---------- */
const radBadge=n=>`<i class="rd-lv">ระดับ ${n}</i>`;
const radMini=(r,cls='')=>`<span class="rd-mini ${cls}"><span class="zh">${r.id}</span></span>`;
const radStars=n=>'★'.repeat(n)+'☆'.repeat(3-n);
function radLessonsFor(r,max=8){const m=RAD_MEM[r.id];const set=new Set([...m.s,...r.ex]);const out=[];const seen=new Set();
 for(const w of ALLW){if(seen.has(w.zh))continue;const cs=stkHan(w.zh);if(!cs.length||cs.length>3)continue;if(cs.some(c=>set.has(c))){seen.add(w.zh);out.push(w)}}
 const lv=radLvPool(),dn=w=>isDone(w.lesson)?0:1;out.sort((a,b)=>dn(a)-dn(b)||(lv.has(a.lv)?0:1)-(lv.has(b.lv)?0:1)||a.lv-b.lv||(a.zh.length-b.zh.length));return out.slice(0,max)}
/* ---------- แท็บ "อักษรข้าง" ---------- */
SC.rad=()=>{const k=radS();const tab=k.tab||'path';
 const seg=`<div class="seg rd-seg" role="group" aria-label="มุมมอง">${[['path','เส้นทาง'],['prac','ฝึก'],['col','การ์ด']].map(([v,l])=>`<button data-go="radtab" data-t="${v}" class="${tab===v?'on':''}">${l}</button>`).join('')}</div>`;
 const head=`<div class="rd-head"><div class="rd-kick">เส้นทางแยกจากบทเรียน</div><div class="large" style="padding:0">อักษรข้าง</div></div>`;
 return {title:'อักษรข้าง',backLabel:'แหล่งความรู้',body:`${head}${seg}${tab==='path'?radPathHtml():tab==='prac'?radPracHtml():radColHtml()}`,mount(el){radColorize(el);if(tab==='path'){const c=$('.rd-node.cur',el);if(c&&!el.dataset.sc){el.dataset.sc=1;const sc=$('.scroller',el);setTimeout(()=>{const y=c.getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-sc.clientHeight*.38;if(y>200)sc.scrollTo({top:y,behavior:'smooth'})},250)}}
   if(tab==='col')radColMount(el)}}};
Object.assign(window.GOX=window.GOX||{},{radtab(el){const k=radS();k.tab=el.dataset.t;save();refresh()}});
/* ---- มุมมองเส้นทาง ---- */
function radPathHtml(){const k=radS();const cur=radCur();const zc=cur?cur.z:4;const zr=radZone(zc);const zd=zr.filter(r=>radDone(r.id)).length;
 const coreN=radCoreDone();const pct=Math.round(coreN/RAD_CORE.length*100);
 const sum=`<div class="rd-sum card"><div class="rd-sum-t"><span class="rd-zno">${zc+1}</span><div><b>${cur&&cur.bonus||zc===4?'เขตโบนัส':'เขต '+(zc+1)} · ${RAD_Z[zc].n}</b><small>ตัวข้าง ${coreN} / ${RAD_CORE.length} · ตัวอักษรที่ผ่านแล้ว ${radCharsDone()} ตัว</small></div><span class="rd-pct">${pct}%</span></div>
  <div class="rd-bar"><i style="width:${Math.max(2,pct)}%"></i></div><p class="rd-free">ไม่ล็อก — แตะข้ามไปตัวไหนก่อนก็ได้ · เรียนก่อนหรือหลังบทเรียนก็ได้</p></div>`;
 let h=sum;const m=radDailyHtml();h+=m;
 RAD_Z.forEach((z,zi)=>{const rs=radZone(zi);const dn=rs.filter(r=>radDone(r.id)).length;const claimed=k.zones[zi];
  h+=`<div class="rd-zhead"><span class="rd-zi">${z.em}</span><div><b>เขต ${zi+1} · ${z.n}</b><small>${z.sub}</small></div><span class="rd-zc ${dn===rs.length?'ok':''}">${dn}/${rs.length}${claimed?' ✓':''}</span></div>`;
  h+=radNodesHtml(rs,cur)});
 h+=`<p class="cap" style="padding:14px 24px 0;line-height:1.5">ชื่อไทยและตัวช่วยจำทั้งหมดเป็น${RAD_DRAFT} · ข้อมูลส่วนประกอบจาก Make Me a Hanzi (LGPL-3) · <button class="rd-lnk" data-go="radcredits">ที่มาและเครดิต</button></p>`;
 return h}
function radNodesHtml(rs,cur){const RH=104,CH=176;let y=44;const pts=rs.map((r,i)=>{const isCur=cur&&cur.id===r.id;const x=50+30*Math.sin(i*1.15+(rs[0].z%2)*.8);if(isCur)y+=(i===0?76:46);const p={r,x,y:y,cur:isCur};y+=isCur?CH:RH;return p});
 const H=y+16;let svg='';for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];const done=radDone(a.r.id);const dy=(b.y-a.y)/2;
  svg+=`<path d="M${a.x.toFixed(1)} ${a.y} C${a.x.toFixed(1)} ${(a.y+dy).toFixed(0)} ${b.x.toFixed(1)} ${(b.y-dy).toFixed(0)} ${b.x.toFixed(1)} ${b.y}" class="${done?'dn':''}"/>`}
 const nodes=pts.map(p=>{const r=p.r,d=radDone(r.id);const st=d?'done':p.cur?'cur':'later';const side=p.x<50?'r':'l';
  let extra='';if(p.cur){const ls=radLessonsFor(r,3);const nos=[...new Set(ls.map(w=>w.lesson))].slice(0,3);
   extra=`<img class="rd-mas ${side}" src="assets/mascot/${r.pose||'wave'}.webp" alt="" draggable="false" style="top:${p.y-62}px"><button class="rd-start ${side}" data-go="radfam" data-id="${r.id}" style="top:${p.y-96}px">เริ่มเลย · 3 นาที</button>
   <div class="rd-info" style="top:${p.y+62}px"><span>เจอในบทเรียน:</span> ${ls.map(w=>`<b class="zh">${w.zh}</b>`).join(' · ')||'—'}${nos.length?` → ${nos.map(n=>lnoTxt(lessonBy(n))).join(', ')}`:''}</div>`}
  const done_n=(RAD_MEM[r.id].s||[]).length;
  return `<div class="rd-node ${st}" style="left:${p.x.toFixed(1)}%;top:${p.y}px"><button class="rd-c" data-go="radfam" data-id="${r.id}" aria-label="${r.th} ${r.id} ${d?'เรียนแล้ว':p.cur?'ตัวถัดไป':''}"><span class="zh">${r.id}</span>${d?`<i class="ck">${CHECK}</i>`:''}</button><span class="rd-nl"><b>${r.th}</b>${r.bonus?'<em>โบนัส</em>':''}</span></div>${extra}`}).join('');
 return `<div class="rd-path" style="height:${H}px"><svg viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true">${svg}</svg>${nodes}</div>`}
/* ---------- หน้าครอบครัวตัวข้าง ---------- */
SC.radfam=({id,all,lv})=>{const r=RADI[id]||(radCur&&radCur())||RAD[0];id=r.id;const rdN={b:radGenBuild([id],8,'fam').length,d:radGenDet([id],8).length};const k=radS();const mem=radMembers(r);const done=radDone(id);
 const [tt,tc]=radTrustTxt(r.tr);const pool=lv||0;
 const lvOk=c=>!pool||radLvOf(c)===pool;const sem=mem.sem.filter(lvOk);const show=all?sem:sem.slice(0,8);const ps=r.f.concat([r.id]);
 const card=c=>{const info=RAD_CH[c];const ss=info?(info[6][r.id]||[]):[];const py=radPy(c);const n=radGlNote(c);
  return `<button class="rd-fc press" data-go="radchar" data-c="${c}" data-r="${r.id}">${radGlyph(c,ss)}<span class="py">${py?pyHtml(py):''}</span><span class="th">${radEsc(radGl(c))}</span><span class="meta">${radLvOf(c)?radBadge(radLvOf(c)):''}${n?`<small>${n}</small>`:''}</span></button>`};
 const ws=radLessonsFor(r,8);
 const lvs=[...new Set(mem.sem.map(radLvOf).filter(Boolean))].sort();
 const filt=lvs.length>1?`<div class="rd-lvf" role="group" aria-label="กรองตามระดับ"><button class="${!pool?'on':''}" data-go="radfam2" data-id="${id}" data-lv="0">ทุกระดับ</button>${lvs.map(n=>`<button class="${pool===n?'on':''}" data-go="radfam2" data-id="${id}" data-lv="${n}">ระดับ ${n}</button>`).join('')}</div>`:'';
 const body=`<div class="rd-fh card"><div class="rd-ftile"><span class="zh">${r.id}</span></div><div class="rd-fht"><div class="rd-kick2">ตัวข้างที่ ${r.no>48?'โบนัส '+(r.no-48):r.no} · อักษรข้าง</div><div class="rd-fth">${r.th}</div><div class="rd-fpy">อ่านว่า <b>${pyHtml(r.py)}</b>${r.or_?` · ${r.or_}`:''}</div><span class="rd-trust ${tc}">● ${tt}</span>${typeof stkBtn==='function'?stkBtn(r.id,'rd-stkb','ดูลำดับขีด <span class="zh">'+r.id+'</span>'):''}</div></div>
 <div class="rd-mn"><div class="rm">${M(r.pose||'think')}</div><div class="rd-bub"><b>ตัวช่วยจำ:</b> ${radEsc(r.mn)}<div class="note">ตัวช่วยจำ ไม่ใช่ที่มาจริง · ${RAD_DRAFT}</div></div></div>
 ${(p=>p?`<div class="rd-pic card">${radPicImg(r.id,'rdp')}<div class="t"><small>ภาพสื่อความหมาย</small><b><span class="zh">${p[0]}</span> · ${radEsc(p[1])}</b><div class="note">${p[3]?radEsc(p[3]):`รูปบอกความหมายของ ${r.id} (${radEsc(r.mean)}) ไม่ใช่ที่มาของรูปอักษร`}</div></div></div>`:'')(radPic(r.id))}
 <div class="rd-sech"><b>ครอบครัว ${r.id} · ${mem.sem.length} ตัว</b><small><span class="dot"></span> สีส้ม = ความหมาย</small></div>${filt}
 <div class="rd-fgrid">${show.map(card).join('')||`<p class="cap" style="grid-column:1/-1;padding:6px 4px">ไม่มีตัวอักษรระดับนี้ในครอบครัวนี้</p>`}</div>
 ${sem.length>8&&!all?`<button class="rd-more press" data-go="radfam2" data-id="${id}" data-all="1" data-lv="${pool}">ดูทั้งหมด ${sem.length} ตัว</button>`:''}
 ${mem.weak.length?`<div class="rd-weak"><b>ตัวที่ใช้ ${r.id} เป็นแค่รูปร่าง (${mem.weak.length})</b><p>ตัวเหล่านี้มี ${r.id} อยู่ แต่ไม่ได้บอกความหมาย อย่าใช้เดา</p><div class="rd-wc">${mem.weak.slice(0,18).map(c=>`<button class="rd-wchip zh" data-go="radchar" data-c="${c}" data-r="${r.id}">${c}</button>`).join('')}</div></div>`:''}
 ${ws.length?`<div class="rd-sech" style="margin-top:20px"><b>เจอคำเหล่านี้ในบทเรียน</b><small>ลิงก์ไปบทเรียนเดิม</small></div><div class="rd-words">${ws.map(w=>`<button class="rd-wd press" data-go="unit" data-id="${w.lesson}a"><span class="zh">${zhHtml(w.zh,w.py)}</span><span class="t">${radEsc(w.th)}</span><span class="l">${lnoTxt(lessonBy(w.lesson))} ›</span></button>`).join('')}</div>`:''}
 <div style="padding:18px 20px 0;display:flex;flex-direction:column;gap:10px">${rdN.d>=3?(()=>{const di=radDetInfo([id],8);return di.ok?`<button class="rd-alt press" data-go="raddet" data-id="${id}">ลองเป็นนักสืบ ${r.id}</button>`:`<p class="cap" style="margin:0;line-height:1.5">นักสืบ ${r.id}: ${radDetLockNote(di)}</p>`})():''}${done?'':`<button class="rd-skip press" data-go="radskip" data-id="${id}">รู้จักตัวนี้แล้ว? ข้ามได้ ไม่ต้องเล่น</button>`}</div>
 <p class="cap" style="padding:14px 24px 0;line-height:1.5">${RAD_DRAFT} · ครอบครัวนี้รวมเฉพาะตัวอักษรที่อยู่ในบทเรียนของเรา · ข้อมูลส่วนประกอบจาก Make Me a Hanzi (LGPL-3) ผ่านชั้นแก้ไขของเรา</p><div style="height:120px"></div>`;
 return {title:r.th,backLabel:'อักษรข้าง',noRefresh:true,right:`<button class="rd-spk press" data-act="audio" data-t="${radEsc(r.ex[0]||r.id)}" aria-label="ฟังตัวอย่าง ${radEsc(r.ex[0]||'')}">${SPK}</button>`,body,
  extra:`<div class="dock"><button class="pill press" data-go="radbuild" data-id="${id}"><b>${done?'เล่นประกอบร่างอีกครั้ง':'ลองประกอบร่าง '+r.id+' + ?'}</b><small>${rdN.b} ข้อ · ใช้เวลาราว ${Math.max(1,Math.round(rdN.b*22/60))} นาที</small></button></div>`,
  mount(el){radColorize(el)}}};
Object.assign(window.GOX,{
 radfam(el){push('radfam',{id:el.dataset.id})},
 radstk(el){stkOpen(el.dataset.c)},
 radfam2(el){const t=stack[stack.length-1];const id=el.dataset.id;replace('radfam',{id,all:!!el.dataset.all,lv:+el.dataset.lv||0})},
 radchar(el){radCharSheet(el.dataset.c,el.dataset.r)},
 radbuild(el){push('radbuild',{ids:[el.dataset.id],mode:'fam'})},
 raddet(el){push('raddet',{ids:[el.dataset.id],mode:'fam'})},
 radskip(el){const r=RADI[el.dataset.id];openSheet(`<div style="padding:0 20px 8px"><div class="h2" style="text-align:center">ข้าม ${r.id} ${r.th}?</div><p class="cap center" style="margin-top:6px">จะนับว่าผ่านแล้ว แต่ยังไม่ได้การ์ดและเหรียญของตัวนี้ · กลับมาเล่นเมื่อไรก็ได้</p><div style="padding:16px 0 4px;display:flex;flex-direction:column;gap:10px"><button class="pill row1 press" id="skok">ข้ามตัวนี้</button><button class="pill row1 ghost press" data-act="closesheet">ยังไม่ข้าม</button></div></div>`,{onMount:sh=>{$('#skok',sh).onclick=()=>{radComplete(r.id,{skip:1,stars:1});closeSheet();toast('ข้าม '+r.id+' แล้ว');pop()}}})},
 radcredits(){push('radcredits')}});
/* ---------- แผ่นรายละเอียดตัวอักษร ---------- */
function radCharSheet(c,rid){const info=RAD_CH[c];const g=radG(c);const py=radPy(c);const r=rid&&RADI[rid];const ss=info&&r?(info[6][rid]||[]):[];
 const ty={p:'ส่วนหนึ่งบอกความหมาย อีกส่วนบอกเสียง',i:'สองส่วนรวมกันเป็นความหมาย',g:'ภาพวาดของสิ่งนั้น','-':''}[info?info[1]:'-'];
 const ph=info&&info[1]==='p'&&info[3]?{c:info[3],py:info[4],m:info[5]}:null;
 const mt={2:['ok','อ่านเหมือนตัวเต็มเป๊ะ'],1:['mid','พยางค์ตรง วรรณยุกต์ต่าง'],0:['lo','เสียงไม่ตรง'],'-1':['','ไม่ทราบ']};
 const ws=ALLW.filter(w=>w.zh.includes(c)).map((w,i)=>[w,i]).sort((a,b)=>(isDone(a[0].lesson)?0:1)-(isDone(b[0].lesson)?0:1)||a[1]-b[1]).map(x=>x[0]).slice(0,4);
 openSheet(`<div class="rd-sheet"><div class="rd-sbig">${radGlyph(c,ss)}</div><div class="rd-spy">${py?pyHtml(py):''}</div><div class="rd-sth">${radEsc(radGl(c))}${radGlNote(c)?` <small>${radGlNote(c)}</small>`:''}</div>
 ${info?`<div class="rd-split"><b>แยกส่วน</b><div class="rd-sp">${(()=>{const raw=[...info[0]],bad=raw.includes('？'),xs=bad?raw.filter(x=>x!=='？'&&!/[⿰-⿻]/.test(x)):raw;return (xs.length?xs:[]).map(x=>/[⿰-⿻]/.test(x)?`<i class="op">${x}</i>`:`<span class="${r&&r.f.includes(x)?'o':ph&&x===ph.c?'b':''}"><span class="zh">${x}</span><small>${RAD_PY[x]?pyHtml(RAD_PY[x]):''}</small></span>`).join('')+(bad?`<span class="rd-unk">${xs.length?'ส่วนที่เหลือ':'ส่วนนี้'}แยกต่อไม่ได้ในข้อมูลของเรา</span>`:'')})()}</div>
 ${ty?`<p>${ty}${ph?` · ส่วนเสียง <b class="zh">${ph.c}</b> ${ph.py?pyHtml(ph.py):''} <span class="rd-mt ${mt[ph.m][0]}">${mt[ph.m][1]}</span>`:''}</p>`:''}</div>`:''}
 ${ws.length?`<div class="rd-split"><b>เจอในบทเรียน</b><div class="rd-words sm">${ws.map(w=>`<button class="rd-wd press" data-go="unit" data-id="${w.lesson}a"><span class="zh">${zhHtml(w.zh,w.py)}</span><span class="t">${radEsc(w.th)}</span><span class="l">${lnoTxt(lessonBy(w.lesson))} ›</span></button>`).join('')}</div></div>`:''}
 <div style="padding:12px 20px 4px;display:flex;gap:10px"><button class="pill sm ghost press" style="flex:1" id="rcs">${SPK.replace('<svg','<svg width="18" height="18"')} ฟัง</button><button class="pill sm press" style="flex:1" id="rco">ดูลำดับขีด</button></div></div>`,{onMount:sh=>{radColorize(sh);$('#rcs',sh).onclick=e=>speak(g?g.w:c,e.currentTarget);$('#rco',sh).onclick=()=>stkOpen(c)}})}
/* ---------- เครดิต ---------- */
SC.radcredits=()=>({title:'ที่มาของข้อมูล',backLabel:'กลับ',right:'',body:`<div class="large">ที่มาของข้อมูล</div>
 <div class="card pad2 mt12" style="padding:16px 18px;line-height:1.6;font-size:15px"><b>การแยกส่วนประกอบตัวอักษร</b><br>Make Me a Hanzi (Shaunak Kishore และผู้ร่วมพัฒนา) สัญญา LGPL-3 — ตารางโครงสร้างตัวอักษร ส่วนความหมาย/ส่วนเสียง และลำดับขีด เรานำมาผ่านชั้นแก้ไขของเรา (<code>tools/rad-build/fixes.json</code>) ก่อนใช้ ไม่ได้ใช้ตรง ๆ ทั้งหมด</div>
 <div class="card pad2 mt12" style="padding:16px 18px;line-height:1.6;font-size:15px"><b>สีส้มบนตัวอักษร</b><br>มาจากข้อมูลลำดับขีดของ hanzi-writer-data (Arphic Public License) จับคู่กับการแยกส่วนของ Make Me a Hanzi</div>
 <div class="card pad2 mt12" style="padding:16px 18px;line-height:1.6;font-size:15px"><b>ที่เรายังไม่แน่ใจ</b><br>ชื่อไทย ตัวช่วยจำ ชื่อการ์ดและชุดลามะทั้งหมดเป็น${RAD_DRAFT} · ตัวช่วยจำคือเรื่องเล่าให้จำง่าย ไม่ใช่ที่มาทางประวัติศาสตร์ · ส่วนบอกเสียงเดาได้เฉพาะบางครอบครัว (ในแอป ${radPhStat().ex}% อ่านตรงเป๊ะ · ${radPhStat().sy}% ตรงพยางค์ถ้าไม่นับวรรณยุกต์ จากตัวที่มีส่วนเสียง ${radPhStat().n} ตัว)</div>
 <p class="cap" style="padding:12px 24px 0;line-height:1.5">เอกสารสัญญาและประกาศฉบับเต็มอยู่ในโฟลเดอร์ data/rad ของโค้ดบนเว็บนี้ (<a href="data/rad/LGPL-3.0.txt" target="_blank" rel="noopener">LGPL-3.0</a> · <a href="data/rad/NOTICE.md" target="_blank" rel="noopener">NOTICE</a> · <a href="data/rad/MMAH-COPYING.txt" target="_blank" rel="noopener">MMAH-COPYING</a>) · ดูเพิ่มที่ <a href="terms.html" style="color:var(--red)">เงื่อนไขการใช้งาน</a></p><div style="height:40px"></div>`});
function radPhStat(){if(radPhStat.c)return radPhStat.c;let n=0,ex=0,sy=0;for(const k in RAD_CH){const v=RAD_CH[k];if(v[1]==='p'&&v[3]&&v[5]>=0){n++;if(v[5]===2){ex++;sy++}else if(v[5]===1)sy++}}return radPhStat.c={n,ex:Math.round(ex/n*100),sy:Math.round(sy/n*100)}}
/* ฟอนต์สำรองของตัวข้างรูปย่อ (CJK Radicals Supplement): ถ้าเครื่องไม่มีฟอนต์จะเห็นเป็นกล่องว่าง — ตรวจครั้งเดียว แล้วสลับเป็นรูปเต็มที่หน้าตาใกล้เคียงเฉพาะที่หายไป */
(function radGlyphFallback(){const MAP={'⺮':'竹','⺾':'艹','⺿':'艹','⻌':'辶','⻍':'辶','⻊':'足','⻗':'雨','⺗':'心','⺼':'月','⻏':'阝','⻖':'阝','⺈':'刀','⺊':'卜','⺌':'小','⺤':'爪','⺧':'牛','⺹':'耂','⺭':'礻','⻂':'衤','⺢':'水','⺕':'彐','⻁':'虍','⺘':'扌','⺡':'氵','⺨':'犭','⺖':'忄','⺫':'目','⺪':'攵','⺝':'月','⻎':'辶','⻢':'马','⻔':'门','⻥':'鱼','⻦':'鸟'};
 const run=()=>{try{const cv=document.createElement('canvas');cv.width=cv.height=48;const c=cv.getContext('2d',{willReadFrequently:true});c.font='36px "Noto Serif SC","Noto Serif CJK SC","Songti SC",serif';
  const sig=ch=>{c.clearRect(0,0,48,48);c.fillStyle='#000';c.fillText(ch,4,38);const d=c.getImageData(0,0,48,48).data;let h='';for(let i=3;i<d.length;i+=4*7)h+=d[i]>40?'1':'0';return h};
  const ref=sig('\uE0FF'),ref2=sig('\u{10FFFE}');const miss={};for(const ch in MAP){const s=sig(ch);if(s===ref||s===ref2||!/1/.test(s))miss[ch]=MAP[ch]}
  const keys=Object.keys(miss);if(!keys.length)return;window.RAD_GLYPH_MISSING=keys;const re=new RegExp('['+keys.join('')+']','g');
  const fix=n=>{if(n.nodeType===3){if(re.test(n.nodeValue)){re.lastIndex=0;n.nodeValue=n.nodeValue.replace(re,m=>miss[m])}re.lastIndex=0}else if(n.nodeType===1)for(const k of n.childNodes)fix(k)};
  const root=document.getElementById('frame');fix(root);new MutationObserver(ms=>{for(const m of ms){m.addedNodes.forEach(fix);if(m.type==='characterData')fix(m.target)}}).observe(root,{childList:true,subtree:true,characterData:true})}catch(e){}};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(run,300))})();
