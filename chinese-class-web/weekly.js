/* ───── สัปดาห์ธีม · สมุดแสตมป์ 7 วัน · ภารกิจสัปดาห์ (คำนวณจากสถานะในเครื่อง ไม่มีเซิร์ฟเวอร์) ───── */
window.GOX=window.GOX||{};
(function(){
const THEMES=[
 {em:'🧧',n:'สัปดาห์อั่งเปา',c:'#C8102E',bg:'#FDECEC',tag:'คำมงคลต้อนรับโชคดี',fact:'恭喜发财 (gōngxǐ fācái) อวยพรให้ร่ำรวย — คำทักทายยอดฮิตตรุษจีน',pose:'celebrate'},
 {em:'🍵',n:'สัปดาห์จิบชา',c:'#5E9B7A',bg:'#E8F4EC',tag:'ชา ขนม และมื้ออร่อย',fact:'คนจีนเชิญชาแทนคำขอบคุณ — เคาะนิ้ว 2 ทีบนโต๊ะแปลว่า "ขอบคุณ"',pose:'tea'},
 {em:'🛍️',n:'สัปดาห์ตลาดนัด',c:'#D98A2B',bg:'#FDF1DE',tag:'ต่อราคาและนับเงินให้คล่อง',fact:'便宜一点儿 (piányi yìdiǎnr) = ลดหน่อยได้ไหม — ประโยคทองในตลาด',pose:'wave'},
 {em:'✈️',n:'สัปดาห์ออกเดินทาง',c:'#5B86C4',bg:'#EAF1FB',tag:'ถามทางและจองตั๋ว',fact:'คำว่า 一路平安 (yílù píng\'ān) แปลว่า เดินทางปลอดภัย',pose:'buddy'},
 {em:'🐼',n:'สัปดาห์สัตว์โลก',c:'#4A4A4A',bg:'#F0EEEA',tag:'แพนด้าและเพื่อนสัตว์',fact:'แพนด้าภาษาจีนคือ 熊猫 (xióngmāo) แปลตรงๆ ว่า "หมีแมว"',pose:'think'},
 {em:'👨‍👩‍👧',n:'สัปดาห์ครอบครัว',c:'#D1647A',bg:'#FCEDF0',tag:'เรียกญาติให้ถูก',fact:'จีนแยกคำเรียกพี่/น้อง ฝั่งพ่อ-ฝั่งแม่ ละเอียดกว่าไทยมาก',pose:'correct'},
 {em:'🌤️',n:'สัปดาห์อากาศดี',c:'#3F9BB5',bg:'#E6F4F8',tag:'ฟ้า ฝน และฤดูกาล',fact:'天气 (tiānqì) = ท้องฟ้า + ลมฟ้า → ใช้พูดถึงสภาพอากาศ',pose:'wave'},
 {em:'🔎',n:'สัปดาห์นักสืบอักษร',c:'#7B4BC4',bg:'#F1EBFA',tag:'ส่วนประกอบของตัวอักษร',fact:'好 (hǎo) = 女 ผู้หญิง + 子 เด็ก → "ดี" คือแม่กับลูกอยู่ด้วยกัน',pose:'think'}];
const SETS=[
 [{id:'d',k:'days',n:4,t:'มาเรียนให้ครบ 4 วัน',em:'📅'},{id:'q',k:'qok',n:60,t:'ตอบถูกสะสม 60 ข้อ',em:'✅'},{id:'g',k:'game',n:4,t:'เล่นเกม 4 ครั้ง',em:'🎮'}],
 [{id:'d',k:'days',n:5,t:'มาเรียนให้ครบ 5 วัน',em:'📅'},{id:'u',k:'unit',n:6,t:'เรียนจบ 6 รอบ',em:'📖'},{id:'s',k:'social',n:3,t:'ส่งกำลังใจหรือเล่นกลุ่ม 3 ครั้ง',em:'💚'}],
 [{id:'d',k:'days',n:3,t:'มาเรียนให้ครบ 3 วัน',em:'📅'},{id:'q',k:'qok',n:40,t:'ตอบถูกสะสม 40 ข้อ',em:'✅'},{id:'t',k:'team',n:2,t:'เล่นทีมชนทีมหรือวิ่งผลัด 2 ครั้ง',em:'🧩'}]];
const STAMPS=[[3,'+15 🪙',s=>addCoins(15,true)],[5,'+30 🪙',s=>addCoins(30,true)],[7,'+1 🧊 +50 🪙',s=>{S.freezes=Math.min(2,S.freezes+1);addCoins(50,true)}]];
const CHEST={xp:30,coins:50};
const lf=k=>(S.life&&S.life[k])||0;
const snap=()=>({unit:lf('unit'),qok:lf('qok'),game:lf('game'),social:lf('social'),team:lf('teamq')+lf('relay')});
window.wkTheme=()=>THEMES[wkIdx()%THEMES.length];
function wq(){const w=wkIdx();if(!S.wq||S.wq.wk!==w){const prev=S.wq;S.wq={wk:w,base:snap(),got:false,mg:[]};if(!S.stickers)S.stickers=[];save()}
 if(!S.stickers)S.stickers=[];return S.wq}
const tasks=()=>SETS[wkIdx()%SETS.length];
const stampDays=()=>{const t=today(),a=wkStart(t),out=[];for(let d=a;d<a+7;d++)out.push(d<=t&&dayXp(d)>0);return out};
const prog=k=>{const q=wq();if(k==='days')return stampDays().filter(Boolean).length;const n=snap();return Math.max(0,(n[k]||0)-(q.base[k]||0))};
function wkState(){const q=wq(),ts=tasks().map(t=>({...t,c:Math.min(t.n,prog(t.k))})),all=ts.every(t=>t.c>=t.n);return {q,ts,all,st:stampDays()}}
window.weeklyCard=function(){const th=wkTheme(),{q,ts,all,st}=wkState(),nd=ts.filter(t=>t.c>=t.n).length,n=st.filter(Boolean).length;
 const rdy=all&&!q.got||STAMPS.some(([k])=>n>=k&&!q.mg.includes(k));
 return `<div class="sec">ธีมสัปดาห์นี้</div><div class="pad"><button class="card pad2 press wkc" data-go="weekly" style="background:${th.bg};width:100%;text-align:left">
  <div style="display:flex;align-items:center;gap:12px"><span style="font-size:34px">${th.em}</span><span style="flex:1"><b style="font-size:17px">${th.n}</b><small style="display:block;color:var(--sub2);font-size:13px">${th.tag}</small></span>${rdy?'<span class="chip coin">รับรางวัล</span>':`<span class="cap" style="font-weight:600">${nd}/3</span>`}</div>
  <div class="wkst">${st.map((on,i)=>`<i class="${on?'on':''}" style="${on?`background:${th.c}`:''}">${on?th.em:['จ','อ','พ','พฤ','ศ','ส','อา'][i]}</i>`).join('')}</div></button></div>`};
GOX.weekly=()=>{const th=wkTheme(),{q,ts,all,st}=wkState(),n=st.filter(Boolean).length,stk=S.stickers||[];
 const row=t=>`<div class="row noic mis" style="min-height:58px"><span class="mem">${t.em}</span><span class="tx"><b style="font-weight:500">${t.t}</b><div class="prog" style="height:5px;margin-top:7px"><i style="width:${t.c/t.n*100}%;background:${th.c}"></i></div></span><span class="val" style="margin-left:10px">${t.c}/${t.n}</span></div>`;
 openSheet(`<div class="center" style="padding:0 20px"><div style="width:120px;height:120px;margin:0 auto">${M(th.pose)}</div><div class="cap" style="color:${th.c};font-weight:700">${th.em} ธีมสัปดาห์</div><div class="h2">${th.n}</div>
  <p style="font-size:14px;color:var(--sub2);margin:6px 0 12px">💡 ${th.fact}</p></div>
  <div class="sec" style="padding-top:4px">สมุดแสตมป์ ${n}/7 วัน</div><div class="pad"><div class="wkst big">${st.map((on,i)=>`<i class="${on?'on':''}" style="${on?`background:${th.c}`:''}">${on?th.em:['จ','อ','พ','พฤ','ศ','ส','อา'][i]}</i>`).join('')}</div>
  <div class="wkms">${STAMPS.map(([k,l])=>{const got=q.mg.includes(k),can=n>=k&&!got;return `<button class="wkm ${got?'got':can?'can':''}" ${can?`data-sa="wms" data-n="${k}"`:'disabled'}><b>${k} วัน</b><small>${got?'รับแล้ว ✓':l}</small></button>`}).join('')}</div></div>
  <div class="sec">ภารกิจสัปดาห์</div><div class="group">${ts.map(row).join('')}</div>
  <div class="pad mt12"><button class="pill sm ${all&&!q.got?'':'ghost'} press" ${all&&!q.got?'data-sa="wchest"':'disabled'}>${q.got?'เปิดกล่องแล้ว ✓':all?`เปิดกล่องรางวัล +${CHEST.xp} XP +${CHEST.coins} เหรียญ + สติกเกอร์`:'ทำครบ 3 ภารกิจเพื่อเปิดกล่องรางวัล'}</button></div>
  <div class="sec">สติกเกอร์ที่สะสม (${stk.length})</div><div class="pad" style="display:flex;gap:8px;flex-wrap:wrap;padding-bottom:6px">${stk.length?stk.map(s=>`<span class="wks">${s}</span>`).join(''):'<span class="cap">ยังไม่มี — เปิดกล่องรางวัลสัปดาห์แรกเพื่อรับ</span>'}</div>
  <p class="cap center" style="padding:10px 28px 4px">คำนวณจากการเรียนในเครื่องนี้ · สัปดาห์เริ่มวันจันทร์ · ไม่มีเซิร์ฟเวอร์จริง</p>`,
  {onMount:sh=>{sh.addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b||b.disabled)return;
   if(b.dataset.sa==='wms'){const k=+b.dataset.n,m=STAMPS.find(x=>x[0]===k);if(!wq().mg.includes(k)){wq().mg.push(k);m[2]();save();bumpChips();vib(15);toast('รับรางวัลแสตมป์ '+k+' วัน '+m[1]);closeSheet(true);setTimeout(GOX.weekly,350);refresh()}}
   if(b.dataset.sa==='wchest'){const q=wq();if(q.got)return;q.got=true;S.stickers.push(th.em);addXp(CHEST.xp,null,1);addCoins(CHEST.coins,true);save();bumpChips();vib([20,30,20]);confetti(70);toast('เปิดกล่องแล้ว! ได้สติกเกอร์ '+th.em);closeSheet(true);setTimeout(GOX.weekly,350);refresh()}})}})};
})();
