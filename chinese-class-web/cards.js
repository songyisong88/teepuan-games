/* การ์ดแชร์สไตล์ LINE Flex (วาดเป็นรูปจริงด้วย canvas) + หน้าจอเลือกเพื่อนจำลอง + Web Share จริง */
const LINK=()=>location.origin+location.pathname+'?from=share&ref='+S.inviteCode;
const imgCache={};
function loadImg(src){return imgCache[src]||(imgCache[src]=new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src}))}
function wrapTxt(c,t,x,y,w,lh,max=3){let toks;try{toks=typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter('th',{granularity:'word'}).segment(t)].map(s=>s.segment):[...t]}catch(e){toks=[...t]}
 let line='',lines=[];const put=tk=>{const test=line+tk;if(c.measureText(test).width>w&&line.trim()){lines.push(line.trimEnd());line=tk.trimStart()}else line=test};
 for(const tk of toks){if(c.measureText(tk).width>w){for(const ch of [...tk])put(ch)}else put(tk)}lines.push(line.trimEnd());lines=lines.slice(0,max);lines.forEach((l,i)=>c.fillText(l,x,y+i*lh));return lines.length*lh}
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
/* spec: {badge,title,sub,mascot|friend,tint,accent,stats:[[big,small]],cta} */
const CARD_THEMES={soft:{n:'นุ่ม',bg:'#fff',g0:null,g1:'#fff',t:'#27211E',s:'#6E6259',sb:'#F8F3EC',sl:'#8A7F76',f:'#A8A09A',line:'rgba(60,40,30,.10)'},
 ink:{n:'หมึก',bg:'#27211E',g0:'#3D322C',g1:'#27211E',t:'#FFFFFF',s:'#D8CFC6',sb:'#3A302B',sl:'#B8ADA3',f:'#8F847A',line:'rgba(255,255,255,.12)',ac:'#FF6B7E'},
 red:{n:'เทศกาล',bg:'#C8102E',g0:'#E8304B',g1:'#C8102E',t:'#FFFFFF',s:'#FFE3E6',sb:'rgba(255,255,255,.16)',sl:'#FFE3E6',f:'#FFC9CF',line:'rgba(0,0,0,.12)',ac:'#FFFFFF'}};
async function renderCard(sp,theme){const TH=CARD_THEMES[theme]||CARD_THEMES.soft;try{await Promise.all([document.fonts.load('700 40px "IBM Plex Sans Thai"'),document.fonts.load('500 30px "IBM Plex Sans Thai"')])}catch(e){}
 const W=900,hasS=sp.stats&&sp.stats.length,H=(hasS?980:860)+(sp.glyph?330:0),cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');const F='"IBM Plex Sans Thai","Noto Sans Thai",sans-serif';
 c.fillStyle=TH.bg;rr(c,0,0,W,H,56);c.fill();c.save();rr(c,0,0,W,H,56);c.clip();
 const g=c.createLinearGradient(0,0,0,470);g.addColorStop(0,TH.g0||sp.tint||'#FCEFEF');g.addColorStop(1,TH.g1);c.fillStyle=g;c.fillRect(0,0,W,470);
 c.fillStyle=TH.ac||sp.accent||'#C8102E';rr(c,48,48,Math.max(150,c.measureText(sp.badge||'').width),56,28);c.font=`600 28px ${F}`;const bw=c.measureText(sp.badge||BRAND_NAME).width+48;c.beginPath();rr(c,48,48,bw,56,28);c.fill();c.fillStyle=theme==='red'?'#C8102E':theme==='ink'?'#27211E':'#fff';c.textBaseline='middle';c.fillText(sp.badge||BRAND_NAME,72,77);
 const im=await loadImg(sp.friend?`assets/friends/${sp.friend}.webp`:`assets/mascot/${sp.mascot||'wave'}.webp`);let iw=0,ih=0;if(im){const s=400,r=im.width/im.height;iw=s;ih=s/r;if(ih>s){ih=s;iw=s*r}}
 const tw=im?Math.max(330,W-56-iw-50):780;c.textBaseline='alphabetic';c.fillStyle=TH.t;c.font=`700 56px ${F}`;const th=wrapTxt(c,sp.title,56,200,tw,72,3);c.fillStyle=TH.s;c.font=`500 30px ${F}`;wrapTxt(c,sp.sub||'',56,200+th+14,tw,42,3);
 if(im)c.drawImage(im,W-iw-30,490-ih,iw,ih);
 let y=500;if(hasS){const n=sp.stats.length,cw=(W-96-(n-1)*20)/n;sp.stats.forEach((s,i)=>{const x=48+i*(cw+20);c.fillStyle=TH.sb;rr(c,x,y,cw,150,28);c.fill();c.fillStyle=TH.ac||sp.accent||'#C8102E';c.font=`700 56px ${F}`;c.textAlign='center';c.fillText(s[0],x+cw/2,y+78);c.fillStyle=TH.sl;c.font=`500 26px ${F}`;c.fillText(s[1],x+cw/2,y+120);c.textAlign='left'});y+=190}
 if(sp.glyph){await(sp.glyph.rad?radDrawCard:stkDrawCard)(c,sp.glyph,48,y,W-96,300,TH,F);y+=330}
 c.fillStyle='#06C755';rr(c,48,y+10,W-96,110,55);c.fill();c.fillStyle='#fff';c.font=`700 38px ${F}`;c.textAlign='center';c.textBaseline='middle';c.fillText(sp.ctaLabel||'เปิดดู',W/2,y+66);
 c.textAlign='left';c.fillStyle=TH.f;c.font=`500 24px ${F}`;c.textBaseline='alphabetic';c.fillText(BRAND_NAME+' · ตัวอย่างทดลอง',56,H-44);c.textAlign='right';c.fillText(LINK().replace(/^https?:\/\//,'').slice(0,34)+'…',W-56,H-44);c.restore();
 c.strokeStyle=TH.line;c.lineWidth=2;rr(c,1,1,W-2,H-2,56);c.stroke();return cv}
function cardSpec(kind,d){d=d||{};const base={
 invite:{badge:'ชวนเพื่อน',title:'มาเรียนจีนด้วยกันนะ!',sub:`ใช้รหัส ${S.inviteCode} เพื่อนเข้าห้อง เราได้เหรียญทั้งคู่`,mascot:'wave',tint:'#FCEFEF',cta:'LINE',ctaTxt:'เข้าร่วม'},
 challenge:{badge:'คำท้า',title:'ท้าดวลศัพท์จีนกับฉัน!',sub:`ฉันสตรีค ${curStreak()} วันแล้ว ลองชนะฉันดูสิ`,mascot:'duel',tint:'#FDF3E6',stats:[[curStreak()+'','วันสตรีค'],[gameWords().length+'','คำที่เรียน']],cta:'LINE',ctaTxt:'รับคำท้า'},
 win:{badge:'ผลดวล',title:'ฉันชนะดวลศัพท์จีน!',sub:d.text||'',mascot:'celebrate',tint:'#E7F8EE',accent:'#2E8B57',cta:'LINE'},
 lose:{badge:'ผลดวล',title:'แพ้นิดเดียว ขอล้างตา!',sub:d.text||'',mascot:'wrong',tint:'#FDF3E6',cta:'LINE'},
 lab:{badge:'ห้องฝึกพิเศษ',title:d.text||'ฝึกจีนกับลามา',sub:d.sub||'',mascot:d.mascot||'celebrate',tint:'#E7F8EE',accent:'#2E8B57',cta:'LINE'},
 score:{badge:'ผลเกม',title:'ผลเกมศัพท์จีนของฉัน',sub:d.text||'',mascot:'trophy',tint:'#FCEFEF',cta:'LINE'},
 unit:{badge:'จบบทเรียน',title:d.text||'เรียนจบแล้ว!',sub:'วันนี้เรียนจีนไปอีกนิด สนุกกว่าที่คิด',mascot:'levelup',tint:'#EAF1FB',stats:[['⭐'.repeat(d.stars||1),'ดาวที่ได้'],[curStreak()+'','วันสตรีค']],cta:'LINE'},
 nudge:{badge:'ส่งกำลังใจ',title:`${d.to||'เพื่อน'} วันนี้เรียนหรือยัง?`,sub:d.msg||`สตรีคคู่ของเรา ${buddyStreak()} วันแล้ว อย่าให้ขาดนะ!`,mascot:'cheer',tint:'#F2ECFA',accent:'#7A4FB0',cta:'LINE'},
 streak:{badge:'สตรีค',title:`สตรีค ${curStreak()} วันแล้ว!`,sub:'เรียนทุกวันไม่ขาดเลย',mascot:'streak',tint:'#FDECEC',cta:'LINE'},
 recap:d.recap,
 badge:{badge:'เหรียญตรา',title:d.b?d.b.em+' '+d.b.n:'เหรียญตราใหม่',sub:d.b?d.b.d:'',mascot:'trophy',tint:'#FDF3E6',stats:[[badgeN()+'/'+BADGES.length,'เหรียญที่ได้'],[titleNow(),'ฉายา']],cta:'LINE',ctaTxt:'ลองเล่นด้วยกัน'},
 strokes:{badge:'ลำดับขีด',title:d.text||'ฉันเขียนตัวจีนตามลำดับขีดได้แล้ว',sub:d.sub||'',mascot:'celebrate',tint:'#FCEFEF',stats:d.stats,glyph:d.glyph,cta:'LINE',ctaTxt:'ลองเขียนด้วยกัน'},
 radres:{badge:'อักษรข้าง',title:d.text||'ฉันเล่นเกมตัวข้างมา',sub:d.sub||'',mascot:'celebrate',tint:'#FDF3E6',accent:'#D9822B',stats:d.stats,cta:'LINE',ctaTxt:'ลองเล่น'},
 radcard:{badge:'การ์ดตัวข้าง',title:d.id&&RADI[d.id]?'ฉันได้การ์ด “'+RADI[d.id].card+'”':'การ์ดตัวข้าง',sub:d.id&&RADI[d.id]?'มาสะสมการ์ดตัวข้างกับลามะด้วยกัน (ชุดจำลอง)':'',mascot:d.id&&RADI[d.id]?RADI[d.id].pose:'wave',tint:'#FDF3E6',accent:'#D9822B',glyph:d.id?{rad:true,id:d.id}:null,cta:'LINE',ctaTxt:'สะสมด้วยกัน'},
 radchal:{badge:'คำท้า 60 วินาที',title:d.score?`ท้าตอบตัวข้าง! ฉันได้ ${d.score} ข้อ`:'ท้าตอบตัวข้างใน 60 วินาที',sub:d.sub||'ชนะฉันให้ได้ใน 60 วินาที',mascot:'duel',tint:'#EAF1FB',accent:'#3A64A8',stats:[[d.score||0,'คะแนนของฉัน'],['60','วินาที']],cta:'LINE',ctaTxt:'รับคำท้า'},
 classwar:{badge:'ห้องต่อห้อง',title:d.text||'มาแข่งห้องเรียนกัน!',sub:d.sub||'',mascot:'duel',tint:'#FDF3E6',stats:d.stats,cta:'LINE',ctaTxt:'เข้าห้อง'},
 cm:{badge:'เพื่อนใหม่ในห้อง',title:`ฉันได้เจอ${d.cm?d.cm.n:'เพื่อนใหม่'}แล้ว!`,sub:d.cm?`“${d.cm.line}”`:'',friend:d.cm&&d.cm.img,tint:'#E7F8EE',accent:d.cm&&d.cm.c,cta:'LINE'},
 placement:{badge:'ทดสอบวัดระดับ',title:d.text||'ผลทดสอบของฉัน',sub:d.sub||'',mascot:d.mascot||'student',tint:'#EAF1FB',stats:d.stats,cta:'LINE'}}[kind]||{badge:BRAND_NAME,title:d.text||'เรียนจีนด้วยกัน',mascot:'wave',cta:'LINE'};
 base.ctaLabel=base.ctaTxt||({invite:'เข้าร่วม',challenge:'รับคำท้า'}[kind])||'ลองเล่นด้วยกัน';base.cta=base.cta==='LINE'?'LINE':base.cta;return base}
async function cardBlob(cv){return new Promise(r=>cv.toBlob(r,'image/png'))}
function shareSheet(kind,data={}){const sp=cardSpec(kind==='result'?(data.kind||'score'):kind,data);const spr=sp;
 const rows=[...FRIENDS.map(f=>({n:f.n,c:f.c,sub:'เพื่อน'})),...GROUPS.map(g=>({n:g.n,c:g.c,sub:g.cnt+' คน · กลุ่ม'}))];
 openSheet(`<div style="padding:0 20px 0"><div class="h2" style="text-align:center">ส่งการ์ดไปที่ LINE</div><p class="cap center">การ์ดนี้วาดเป็นรูปจริง · ปุ่มเลือกเพื่อนด้านล่างเป็นหน้าจำลอง</p></div>
 <div class="cardprev mt8" id="cp"><div class="cpl">กำลังสร้างการ์ด…</div></div>
 <div class="themes" id="th" role="group" aria-label="สไตล์การ์ด">${Object.keys(CARD_THEMES).map(k=>`<button class="chip press ${(S.cardTheme||'soft')===k?'on':''}" data-th="${k}">${CARD_THEMES[k].n}</button>`).join('')}</div>
 <div style="padding:12px 20px 0;display:flex;gap:10px"><button class="pill sm ghost press" id="ws" style="flex:1;font-size:14.5px">แชร์จริง (เมนูแชร์)</button><button class="pill sm ghost press" id="cl" style="flex:1;font-size:14.5px">คัดลอกลิงก์</button></div>
 <p class="cap mt8 center" style="padding:0 24px">ปุ่มแชร์จริงใช้เมนูแชร์ของมือถือ (ส่งเข้า LINE ได้) · ใน LINE จริงจะใช้ LIFF shareTargetPicker ส่งการ์ด Flex</p>
 <div class="search mt12">🔍 <span>ค้นหาเพื่อนหรือกลุ่ม (จำลอง)</span></div>
 <div class="group" style="margin-top:4px">${rows.map((r,i)=>`<button class="pickrow" data-p="${i}">${avatar(r.n,r.c)}<span style="flex:1"><b style="font-weight:600">${r.n}</b><br><small class="cap">${r.sub}</small></span><span class="ck">${CHECK}</span></button>`).join('')}</div>
 <div style="padding:16px 20px 0"><button class="pill row1 linebtn press" id="snd" disabled>ส่ง</button></div>`,
 {onMount:async sh=>{const sel=new Set();const b=$('#snd',sh);let blob=null,cv=null;
  const draw=()=>renderCard(spr,S.cardTheme||'soft').then(async c=>{cv=c;blob=await cardBlob(c);const p=$('#cp',sh);if(p){p.innerHTML='';c.style.cssText='width:100%;height:auto;display:block;border-radius:22px;box-shadow:0 8px 30px rgba(60,40,30,.14)';p.appendChild(c)}});draw();
  $$('[data-th]',sh).forEach(t=>t.onclick=()=>{S.cardTheme=t.dataset.th;save();$$('[data-th]',sh).forEach(x=>x.classList.toggle('on',x===t));blob=null;draw();vib(6)});
  $$('[data-p]',sh).forEach(r=>r.onclick=()=>{const i=+r.dataset.p;sel.has(i)?sel.delete(i):sel.add(i);r.classList.toggle('on');vib(6);b.disabled=!sel.size;b.textContent=sel.size?`ส่ง (${sel.size})`:'ส่ง'});
  $('#cl',sh).onclick=async()=>{try{await navigator.clipboard.writeText(LINK());toast('คัดลอกลิงก์แล้ว')}catch(e){toast(LINK())}};
  $('#ws',sh).onclick=async()=>{if(!blob){toast('รอสักครู่ กำลังสร้างการ์ด');return}const file=new File([blob],'lama-card.png',{type:'image/png'});const txt=`${sp.title} ${sp.sub||''}`.trim();
   try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:txt,url:LINK()});bumpCnt('social',1);return}if(navigator.share){await navigator.share({text:txt,url:LINK()});bumpCnt('social',1);return}}catch(e){if(e&&e.name==='AbortError')return}
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='lama-card.png';a.click();toast('เบราว์เซอร์นี้ไม่มีเมนูแชร์ · บันทึกรูปการ์ดให้แล้ว')};
  b.onclick=()=>{const n=sel.size;closeSheet();vib([15,30,15]);bumpCnt('social',1);toast(`✓ ส่งแล้ว ${n} ห้อง (จำลอง)`);if(kind==='invite')inviteGain(n);if(kind==='nudge'&&S.buddy){S.buddy.nudgeDay=today();save();buddyTick();setTimeout(refresh,50)}}}})}
/* รางวัลชวนเพื่อน (จำลอง: เพื่อนกดลิงก์แล้ว ได้เหรียญทั้งคู่) */
const INV_MS=[[1,'ชวนครบ 1 คน','+50 🪙',s=>addCoins(50,true)],[3,'ชวนครบ 3 คน','+1 🧊 +100 🪙',s=>{S.freezes=Math.min(2,S.freezes+1);addCoins(100,true)}],[5,'ชวนครบ 5 คน','👑 มงกุฎทอง',s=>{if(!S.own.includes('crown'))S.own.push('crown')}]];
function inviteGain(n){const before=S.invited;S.invited+=n;save();setTimeout(()=>{toast('🎟️ มีเพื่อนกดลิงก์เข้ามาแล้ว! (จำลอง)');INV_MS.forEach(m=>{if(before<m[0]&&S.invited>=m[0]&&!S.inviteGot.includes(m[0])){S.inviteGot.push(m[0]);m[3]();save();bumpChips();setTimeout(()=>{confetti(80);toast(`🎁 ${m[1]}: ${m[2]}`)},1800)}})},2400)}
