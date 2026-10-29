/* ลีกประจำสัปดาห์ (จำลอง): 6 ลีก · 5 อันดับแรกเลื่อนขึ้น · 3 อันดับสุดท้ายตกลีก · เปลี่ยนรอบทุกวันจันทร์
   คู่แข่งและ XP ของคู่แข่งคำนวณจากสูตรตายตัว (ไม่มีผู้เล่นจริง/ไม่มี backend) — ของจริงต้องมีเซิร์ฟเวอร์จัดกลุ่มผู้เล่น */
const LG_TIERS=[{n:'บรอนซ์',e:'🥉',c:'#B8794A',t:'#8F5A30'},{n:'เงิน',e:'🥈',c:'#8E98A5',t:'#566474'},{n:'ทอง',e:'🥇',c:'#D9A21B',t:'#7F5C05'},{n:'แซฟไฟร์',e:'💠',c:'#3F7FD0',t:'#2A62B0'},{n:'รูบี้',e:'❤️',c:'#C8102E',t:'#C8102E'},{n:'เพชร',e:'💎',c:'#2AA5B8',t:'#1F7E8D'}];
const LG_UP=5,LG_DOWN=3;
const wkStart=(t=today())=>t-((t+3)%7);
const wkIdx=(t=today())=>Math.floor((wkStart(t)+3)/7);
const lgTier=()=>Math.min(LG_TIERS.length-1,Math.max(0,(S.lg&&S.lg.tier)||0));
function lgMeXp(ws){let s=0;for(let i=0;i<7;i++)s+=dayXp(ws+i);return s}
function lgRivals(wk,tier){const pace=i=>{const h=hash(i*31+tier*7+3,wk);return Math.round((14+tier*8)*(.4+h/100*1.35))};
 return LEAGUE.map(x=>x[0]).slice(0,14).map((n,i)=>({n,i,full:pace(i)*7+hash(i+5,wk)%9,pace:pace(i)}))}
function lgBoard(){const t=today(),ws=wkStart(t),wk=wkIdx(t),tier=lgTier(),el=(t-ws)+new Date().getHours()/24;
 const rows=lgRivals(wk,tier).map(r=>({n:r.n,xp:Math.round(r.pace*Math.min(7,el+.3)*(.8+hash(r.i*13+1,t)/100*.4))}));
 const me={n:'คุณ',xp:lgMeXp(ws),me:1};rows.push(me);rows.sort((a,b)=>b.xp-a.xp||(a.me?-1:1));return {rows,me,pos:rows.indexOf(me)+1,daysLeft:7-(t-ws),tier}}
function lgFinal(wk,tier,meXp){const rows=lgRivals(wk,tier).map(r=>({xp:r.full}));const me={xp:meXp,me:1};rows.push(me);rows.sort((a,b)=>b.xp-a.xp||(a.me?-1:1));return rows.indexOf(me)+1}
function leagueRows(){const b=lgBoard();let o='';
 b.rows.forEach((p,i)=>{if(i===0)o+=`<div class="zone">▲ ${LG_UP} อันดับแรกเลื่อนขึ้นลีกถัดไป</div>`;if(i===b.rows.length-LG_DOWN)o+=`<div class="zone d">▼ ${LG_DOWN} อันดับสุดท้ายตกลีก</div>`;
  o+=`<div class="lrow ${p.me?'me':''}"><span class="rk">${i+1}</span>${p.me?`<span class="av" style="background:var(--red)">ฉ</span>`:avatar(p.n,AVC[(p.n.charCodeAt(0))%6])}<span style="flex:1;font-weight:${p.me?700:500}">${p.me?'คุณ':p.n}</span><span class="val" style="font-weight:600;color:var(--ink)">${p.xp} XP</span></div>`});return o}
function leagueHead(){const b=lgBoard(),T=LG_TIERS[b.tier],n=b.rows.length,safe=b.pos<=LG_UP,danger=b.pos>n-LG_DOWN;
 const cut=b.rows[LG_UP-1],ahead=b.rows[b.pos-2];
 const msg=safe?`อยู่ในโซนเลื่อนขึ้น รักษาอันดับไว้ถึงวันอาทิตย์`:danger?`อยู่ในโซนตกลีก — เก็บอีก ${Math.max(1,b.rows[n-LG_DOWN-1].xp-b.me.xp+1)} XP เพื่อหนีขึ้นมา`:`ต้องการอีก ${Math.max(1,cut.xp-b.me.xp+1)} XP เพื่อเข้า ${LG_UP} อันดับแรก`;
 return `<div class="card pad2 mt16" style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div style="flex:1"><div class="cap" style="color:${T.t||T.c};font-weight:700">${T.e} ลีก${T.n} · เหลืออีก ${b.daysLeft} วัน</div><b style="font-size:18px">อันดับ ${b.pos} · ${b.me.xp} XP</b><div class="cap mt8">${msg}</div></div><div style="width:96px;height:96px;flex:none">${M(safe?'trophy':'think')}</div></div>
 <div class="lgtiers" aria-label="ลีกทั้งหมด">${LG_TIERS.map((x,i)=>`<span class="${i===b.tier?'on':''} ${i<b.tier?'past':''}" style="${i===b.tier?'border-color:'+x.c:''}" title="${x.n}">${x.e}</span>`).join('')}</div>`}
const lgBadge=()=>{const T=LG_TIERS[lgTier()];return T.e+' '+T.n};
/* เปลี่ยนสัปดาห์: สรุปผล เลื่อน/ตกลีก */
function leagueRoll(){if(!S.lg)S.lg={tier:0,wk:-1};const cw=wkIdx();
 if(S.lg.wk<0){S.lg.wk=cw;save();return}
 if(S.lg.wk>=cw||!S.parts.length)return;
 if($('.sheet'))return setTimeout(leagueRoll,1500);
 const pw=S.lg.wk,ps=pw*7-3,meXp=lgMeXp(ps),tier=lgTier(),n=15;
 const missed=cw-pw>1;const pos=missed?(meXp>0?lgFinal(pw,tier,meXp):n):lgFinal(pw,tier,meXp);
 let out='stay',nt=tier;if(meXp<=0&&tier>0){out='down';nt=tier-1}else if(pos<=LG_UP&&meXp>0&&tier<LG_TIERS.length-1){out='up';nt=tier+1}else if(pos>n-LG_DOWN&&tier>0){out='down';nt=tier-1}
 const coins=out==='up'?40+tier*15:out==='stay'?10:0;
 S.lg.tier=nt;S.lg.wk=cw;S.lg.last={wk:pw,pos,xp:meXp,out,from:tier,to:nt};if(coins)S.coins+=coins;S.coinsEarned+=coins;save();bumpChips();
 const T=LG_TIERS[nt];
 openSheet(`<div class="center" style="padding:0 24px"><div class="pop" style="width:170px;height:170px;margin:0 auto">${M(out==='up'?'celebrate':out==='down'?'tired':'correct')}</div>
  <div class="cap" style="font-weight:700;color:var(--red)">ผลลีกสัปดาห์ที่แล้ว (จำลอง)</div>
  <div class="h2">${out==='up'?'เลื่อนขึ้น! '+T.e+' ลีก'+T.n:out==='down'?'ตกมาที่ '+T.e+' ลีก'+T.n:'อยู่ต่อที่ '+T.e+' ลีก'+T.n}</div>
  <p style="color:var(--sub2);margin:6px 0 4px;font-size:15px">คุณได้อันดับ ${pos} จาก ${n} ด้วย ${meXp} XP${meXp<=0?' (ไม่ได้เรียนเลยทั้งสัปดาห์)':''}</p>
  <p style="font-size:14.5px;font-weight:600;margin:0 0 14px">${coins?'รางวัล +'+coins+' 🪙':'สัปดาห์นี้เก็บ XP ให้ติด 5 อันดับแรก ก็กลับขึ้นได้'}</p>
  <button class="pill sm press" data-act="closesheet">เริ่มสัปดาห์ใหม่</button><p class="cap mt12"><span class="demo">ตัวอย่างทดลอง</span> คู่แข่งเป็นข้อมูลสมมติ</p></div>`,{onClose:()=>{if(out==='up')confetti(80);refresh()}});
 if(typeof badgeCheck==='function')setTimeout(badgeCheck,1200)}
