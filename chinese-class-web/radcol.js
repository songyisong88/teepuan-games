/* เรียนตัวอักษร — ฝึก · การ์ด · ชุดลามะ · เพื่อนท้า (LINE) · การ์ดบนหน้าหลัก
   การ์ด/ชุด/เพื่อนท้าเป็นของจำลองทั้งหมด (ไม่มีกาชา ไม่มีการสุ่ม ไม่ขายของ) · ชื่อการ์ดเป็น "ร่าง รอครูตรวจ" */
let radSel=null,radSub='c';
const RAD_RAR={1:'ธรรมดา',2:'เงา',3:'ทอง'};
function radKnown(id){const m=RAD_MEM[id];const k=radS().known;const all=(m.s||[]);return {n:all.filter(c=>k[c]).length,t:all.length}}
function radCardHtml(id,o){o=o||{};const r=RADI[id];const c=radS().cards[id];
 if(!c)return `<div class="rd-card lock ${o.big?'big':''} ${o.mini?'mini':''}"><div class="rc-glyph zh">?</div><div class="rc-name">ยังไม่ได้การ์ด</div><div class="rc-sub">${r.id} ${r.th}</div></div>`;
 if(o.mini)return `<div class="rd-card r${c.r} mini"><div class="rc-glyph zh">${r.id}</div></div>`;
 const kn=radKnown(id);const ex=radMembers(r).sem.slice(0,6);
 return `<div class="rd-card r${c.r} ${o.big?'big':''}"><div class="rc-top"><span class="rc-r" aria-label="การ์ด${RAD_RAR[c.r]}">${radStars(c.r)}</span>${o.fresh?'<i class="new">การ์ดใหม่!</i>':''}</div>
  <div class="rc-hero"><div class="rc-glyph zh">${r.id}</div><img class="rc-mas" src="assets/mascot/${r.pose||'wave'}.webp" alt="" draggable="false"><span class="rc-em" aria-hidden="true">${r.em}</span></div>
  <div class="rc-name">${r.card}</div><div class="rc-sub">ตัวข้าง ${r.id} · ${r.th} · ${pyHtml(r.py)}</div><span class="rc-sim">ชุดจำลอง · ${RAD_DRAFT}</span>
  <div class="rc-mem">${ex.map(x=>`<span class="zh">${x}</span>`).join('')}</div><div class="rc-know">จำได้ ${kn.n}/${kn.t} ตัว</div></div>`}
/* ---------- ตัวข้างวันนี้ ---------- */
const radDailyId=()=>RAD_CORE[(today()*5+3)%RAD_CORE.length].id;
function radDailyHtml(){const k=radS();const id=radDailyId(),r=RADI[id];const done=k.daily.d===today();
 return `<button class="rd-daily press" data-go="raddaily" aria-label="ตัวข้างวันนี้ ${r.th}"><span class="g zh">${r.id}</span><span class="t"><small>ตัวข้างวันนี้ · ${new Date(today()*864e5).getUTCDate()}/${new Date(today()*864e5).getUTCMonth()+1}</small><b>${r.th} <span>${pyHtml(r.py)}</span></b><small>${done?'เล่นแล้ววันนี้ ✓ — เล่นซ้ำเพื่อฝึกได้':'นักสืบ 5 ข้อ · ได้เหรียญเพิ่ม 5'}</small></span><span class="go">${done?'ฝึกซ้ำ':'เล่น'}</span></button>`}
/* ---------- แท็บ "ฝึก" ---------- */
function radPracHtml(){const k=radS();const pool=radLvPool();const auto=!(k.lv&&k.lv.length);const done=RAD.filter(r=>radDone(r.id)).length;
 const lvBtn=n=>`<button class="${pool.has(n)&&!auto?'on':''}" data-go="radlv" data-n="${n}" aria-pressed="${pool.has(n)&&!auto}">ระดับ ${n}</button>`;
 const G=(bg,em,t,sub,go,extra='')=>`<button class="card gcard press rd-gc" data-go="${go}" ${extra}><span class="gi" style="background:${bg}">${em}</span><span style="flex:1"><b>${t}</b><small>${sub}</small></span>${CHEV}</button>`;
 const dbl=k.blitz.best;
 return `${radDailyHtml()}
 <div class="rd-lvbox card"><div class="t"><b>เลือกระดับตัวอักษรที่จะเจอในเกม</b><small>${auto?`ตอนนี้: ตามระดับของฉัน (ถึงระดับ ${curLv()})`:`ตอนนี้: ${[...pool].sort().map(n=>'ระดับ '+n).join(', ')}`}</small></div><div class="rd-lvf" role="group" aria-label="ระดับ"><button class="${auto?'on':''}" data-go="radlv" data-n="0" aria-pressed="${auto}">ตามระดับของฉัน</button>${[1,2,3,4,5].map(lvBtn).join('')}</div></div>
 <div class="sec">เกมตัวข้าง</div>
 ${G('#FDF3E6','🧩','ประกอบร่าง','ลากชิ้นส่วนมาวางให้ครบตัวอักษร · '+(done?`จากตัวข้างที่เรียนแล้ว ${done} ตัว`:'เริ่มจากเขต 1'),'radplay','data-g="build"')}
 ${G('#EAF1FB','🔎','นักสืบตัวข้าง','ใช้เบาะแสความหมาย + เสียง เดาคำแปลของตัวที่ไม่เคยเห็น','radplay','data-g="det"')}
 ${G('#FDECEC','⚡','ท้า 60 วินาที','ตัวนี้อยู่ครอบครัวไหน? ตอบให้ได้มากที่สุด'+(dbl?` · สถิติ ${dbl}`:''),'radplay','data-g="blitz"')}
 <p class="cap" style="padding:12px 24px 0;line-height:1.5">เหรียญจากเกมตัวข้างได้วันละไม่เกิน ${RAD_CAP} เหรียญ (วันนี้เหลือ ${radCoinLeft()}) · ไม่มีการสุ่มกาชา</p>
 <div class="stat mt12" style="margin:16px 20px 0"><div><b>${k.built}</b><small>รอบประกอบร่าง</small></div><div><b>${k.det.ok}/${k.det.n}</b><small>นักสืบถูก/ทั้งหมด</small></div><div><b>${Object.keys(k.known).length}</b><small>ตัวอักษรที่ตอบถูก</small></div></div>`}
Object.assign(window.GOX,{
 radlv(el){const k=radS();const n=+el.dataset.n;if(!n){k.lv=[]}else{const s=new Set(k.lv||[]);s.has(n)?s.delete(n):s.add(n);k.lv=[...s].sort()}save();refresh()},
 radplay(el){const g=el.dataset.g;if(g==='build')push('radbuild',{ids:radPickIds(),mode:'mix'});else if(g==='det')push('raddet',{ids:radPickIds(8),mode:'mix'});else push('radblitz',{})},
 raddaily(){const id=radDailyId();push('raddet',{ids:[id],mode:'daily',n:5})},
 radsel(el){radSel=el.dataset.id;refresh()},
 radsub(el){radSub=el.dataset.s;refresh()},
 radcshare(el){shareSheet('radcard',{id:el.dataset.id})},
 radcchal(){const k=radS();shareSheet('radchal',{score:k.blitz.best||0,text:'ท้าตอบตัวข้างใน 60 วินาที',sub:'มาลองชนะฉัน'})},
 radcfr(el){push('radblitz',{ch:+el.dataset.s})},
 radgo(el){push('radfam',{id:el.dataset.id})}});
/* ---------- แท็บ "การ์ด" ---------- */
function radFriendScore(f){let h=0;for(const ch of f.n)h=(h*31+ch.charCodeAt(0))>>>0;return 8+((h+today())%17)}
function radColHtml(){const k=radS();const have=RAD.filter(r=>k.cards[r.id]);const coreHave=RAD_CORE.filter(r=>k.cards[r.id]).length;
 const sub=['c','การ์ด','s','ชุดลามะ','f','เพื่อนท้า'];const tabs=`<div class="rd-sub" role="group">${[['c','การ์ด'],['s','ชุดลามะ'],['f','เพื่อนท้า']].map(([v,l])=>`<button data-go="radsub" data-s="${v}" class="${radSub===v?'on':''}">${l}</button>`).join('')}</div>`;
 const head=`<div class="rd-colh"><div><b>คอลเลกชันของฉัน</b><small>การ์ดตัวข้าง ${coreHave} / ${RAD_CORE.length}${have.length>coreHave?` · โบนัส ${have.length-coreHave}`:''}</small></div></div>`;
 if(radSub==='s')return head+tabs+radSetsHtml(k);if(radSub==='f')return head+tabs+radFriendsHtml(k);
 const sel=radSel&&RADI[radSel]?radSel:(have.length?[...have].sort((a,b)=>(k.cards[b.id].t-k.cards[a.id].t))[0].id:RAD[0].id);const r=RADI[sel];const has=!!k.cards[sel];
 const fresh=has&&k.cards[sel].t===today()&&sel===(radSel||sel)&&!radSel;
 return `${head}${tabs}<div class="rd-feat">${radCardHtml(sel,{big:1,fresh})}</div>
 ${has?`<div class="rd-acts"><button class="pill row1 linebtn press" data-go="radcshare" data-id="${sel}"><span style="display:inline-flex;margin-right:6px">${svg('<path d="M21 11.5C21 7.4 16.97 4 12 4S3 7.4 3 11.5c0 3.6 3.2 6.6 7.5 7.4.3.1.7.2.8.5.1.3.1.7 0 1l-.1.8c0 .3-.2 1.1 1 .6 1.2-.5 6.4-3.8 8.7-6.5 1.6-1.7 2.1-3.4 2.1-3.8z"/>',19)}</span>แชร์การ์ดไป LINE</button><button class="pill row1 press" data-go="radcchal">ท้าเพื่อน 60 วิ</button></div>
  <div class="rd-line"><span class="lg">LINE</span><div class="bb"><b>${radEsc(S.name)}</b> ส่งการ์ด “${r.card}”<br><small>ตัวข้าง ${r.id} ${r.th} · ฉันจำได้ ${radKnown(sel).n}/${radKnown(sel).t} ตัว มาเล่นด้วยกัน!</small></div></div>`
 :`<div class="rd-acts"><button class="pill row1 press" data-go="radgo" data-id="${sel}">ไปเรียน ${r.id} เพื่อรับการ์ด</button></div>`}
 <div class="rd-sech" style="margin-top:20px"><b>ทั้งหมดในหมู่บ้านลามะ</b><small>แตะเพื่อเลือก</small></div>
 <div class="rd-strip" role="list">${RAD.map(x=>`<button class="rd-ct ${k.cards[x.id]?'have':''} ${x.id===sel?'sel':''}" data-go="radsel" data-id="${x.id}" role="listitem" aria-label="${x.th} ${k.cards[x.id]?'ได้แล้ว':'ยังไม่ได้'}">${radCardHtml(x.id,{mini:1})}${x.bonus?'<em>โบนัส</em>':''}</button>`).join('')}</div>
 <p class="cap" style="padding:10px 24px 0;line-height:1.5">การ์ดได้จากการผ่านครอบครัวตัวข้าง (ไม่มีกาชา) · ผ่านด้วยดาวมากกว่าจะอัปเกรดเป็นการ์ดเงา/ทอง · การ์ดและชื่อการ์ดทั้งหมดเป็น${RAD_DRAFT}</p><div style="height:20px"></div>`}
function radSetsHtml(k){return `<div class="rd-sets">${RAD_Z.map((z,zi)=>{const rs=radZone(zi);const dn=rs.filter(r=>radDone(r.id)).length;const got=!!k.zones[zi];
  return `<div class="card rd-set ${got?'got':''}"><span class="sg">${z.em}</span><div class="st"><b>ชุด ${z.n}</b><small>${got?'ได้ชุดแล้ว ✓':`ผ่านครบ ${rs.length} ตัวข้างของเขต ${zi+1} เพื่อรับชุด`}</small><div class="rd-bar"><i style="width:${Math.round(dn/rs.length*100)}%"></i></div><small>${dn}/${rs.length} · ${rs.map(r=>r.id).join(' ')}</small></div><span class="sim">ชุดจำลอง</span></div>`}).join('')}</div>
  <p class="cap" style="padding:10px 24px 0;line-height:1.5">ชุดลามะเป็นของสะสมจำลอง (ยังไม่ได้ใส่ให้ลามะ) · ครบชุดได้ +30 เหรียญครั้งเดียว · ชื่อชุดเป็น${RAD_DRAFT}</p>`}
function radFriendsHtml(k){const best=k.blitz.best;
 return `<div class="rd-fr card"><div class="rm">${M('duel')}</div><div class="t"><b>ท้าเพื่อนใน LINE</b><small>${best?`สถิติของฉัน ${best} ข้อใน 60 วินาที`:'ลองเล่น 60 วินาทีก่อน แล้วค่อยท้าเพื่อน'}</small></div></div>
 <div style="padding:12px 20px 0;display:flex;gap:10px"><button class="pill row1 press" data-go="radplay" data-g="blitz">เล่น 60 วิ</button><button class="pill row1 linebtn press" data-go="radcchal">ส่งคำท้า</button></div>
 <div class="rd-sech" style="margin-top:20px"><b>เพื่อนที่ท้าฉัน</b><small>จำลอง</small></div>
 <div class="group">${FRIENDS.slice(0,4).map(f=>{const s=radFriendScore(f);return `<button class="pickrow press" data-go="radcfr" data-s="${s}">${avatar(f.n,f.c)}<span style="flex:1"><b style="font-weight:600">${f.n}</b><br><small class="cap">ได้ ${s} ข้อ ใน 60 วินาที (ข้อมูลจำลอง)</small></span><span class="rd-tobtn">ท้ากลับ</span></button>`}).join('')}</div>
 ${k.blitz.hist.length?`<div class="rd-sech" style="margin-top:20px"><b>รอบล่าสุดของฉัน</b></div><div class="rd-hist">${k.blitz.hist.slice(0,8).map(h=>`<span><b>${h.s}</b><small>${new Date(h.d*864e5).getUTCDate()}/${new Date(h.d*864e5).getUTCMonth()+1}</small></span>`).join('')}</div>`:''}
 <p class="cap" style="padding:12px 24px 0;line-height:1.5">เพื่อนและคะแนนของเพื่อนเป็นข้อมูลจำลอง · ในแอปจริงจะส่งคำท้าผ่าน LINE (LIFF shareTargetPicker) และเก็บคะแนนที่เซิร์ฟเวอร์</p>`}
function radColMount(el){radColorize(el)}
/* ---------- การ์ดบนหน้าหลัก ---------- */
function radHomeCard(){const k=radS();const n=radCoreDone();const cur=radCur();const ids=['亻','口','女','讠','木'];
 return `<button class="rd-home press" data-go="radhome" aria-label="ไปเรียนตัวอักษร"><div class="rh-t"><b>รู้จักตัวข้าง แล้วจำตัวจีนง่ายขึ้น</b><small>เรียนตัวข้างทีละตัว 3 นาที · แยกจากบทเรียน</small></div>
 <div class="rh-tiles">${ids.map(i=>`<span class="zh">${i}</span>`).join('')}<span class="more">${n}/${RAD_CORE.length}</span></div><span class="rh-btn">${n?'เรียนต่อ'+(cur?' · '+cur.id+' '+cur.th:''):'ไปเริ่มเรียนตัวอักษร (3 นาที)'}</span></button>`}
Object.assign(window.GOX,{radhome(){mountRoot('rad')}});
/* ---------- การ์ดแชร์ LINE (วาดด้วย canvas) ---------- */
async function radDrawCard(c,g,x,y,w,h,TH,F){const r=RADI[g.id];c.save();c.fillStyle=TH.sb;rr(c,x,y,w,h,32);c.fill();
 const s=h-48,tx=x+24,ty=y+24;c.fillStyle='rgba(217,130,43,.16)';rr(c,tx,ty,s,s,30);c.fill();c.strokeStyle='rgba(217,130,43,.55)';c.lineWidth=3;c.setLineDash([10,8]);rr(c,tx+6,ty+6,s-12,s-12,26);c.stroke();c.setLineDash([]);
 c.fillStyle='#D9822B';c.textAlign='center';c.textBaseline='middle';c.font='700 170px "Noto Serif SC","Noto Serif CJK SC","Songti SC",serif';c.fillText(r.id,tx+s/2,ty+s/2+10,s-30);
 const nx=tx+s+28,nw=x+w-nx-24;c.textAlign='left';c.textBaseline='alphabetic';c.fillStyle=TH.t;c.font=`700 40px ${F}`;wrapTxt(c,r.card,nx,y+72,nw,48,1);
 c.fillStyle=TH.sl;c.font=`500 27px ${F}`;c.fillText(`ตัวข้าง ${r.id} · ${r.th} · ${(r.py||'').replace(/\|/g,'')}`,nx,y+116,nw);
 const ex=radMembers(r).sem.slice(0,4);const cs=Math.min(82,Math.floor((nw-3*12)/4));ex.forEach((e,i)=>{const ex0=nx+i*(cs+12);c.fillStyle='#fff';rr(c,ex0,y+138,cs,cs,18);c.fill();c.strokeStyle='rgba(217,130,43,.4)';c.lineWidth=2;c.stroke();c.fillStyle='#27211E';c.textAlign='center';c.textBaseline='middle';c.font=`400 ${Math.round(cs*.62)}px "Noto Serif SC","Noto Serif CJK SC","Songti SC",serif`;c.fillText(e,ex0+cs/2,y+138+cs/2+4)});
 c.textAlign='left';c.textBaseline='alphabetic';const cd=radS().cards[g.id];const rar=cd?cd.r:1;c.font=`600 34px ${F}`;c.fillStyle=TH.ac||'#D9822B';c.fillText('★'.repeat(rar)+'☆'.repeat(3-rar),nx,y+h-26);c.font=`500 24px ${F}`;c.fillStyle=TH.sl;c.textAlign='right';c.fillText('ชุดจำลอง · '+RAD_DRAFT,x+w-24,y+h-26);c.textAlign='left';c.restore()}
