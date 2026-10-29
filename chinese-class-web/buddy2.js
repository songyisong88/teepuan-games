/* บัดดี้ขั้นต่อไป: เป้าหมายร่วมรายสัปดาห์ + เลือกข้อความให้กำลังใจ (เพื่อน/ผลลัพธ์ของเพื่อนเป็นการจำลอง) */
(function(){
const BC_TARGET=200;
const BMSG=[['🔥','ไฟสตรีคของเรากำลังลุกเลย อย่าให้ดับนะ'],['⏰','วันนี้ขอแค่ 5 นาทีก็พอ มาเรียนด้วยกันนะ'],['🎉','ทำได้ดี ขอให้เรียนต่อเนื่องแบบนี้'],['🍵','เหนื่อยก็พักก่อน เดี๋ยวพรุ่งนี้ค่อยลุยด้วยกัน'],['🥇','สัปดาห์นี้เราต้องไปถึงเป้าด้วยกันให้ได้'],['🤝','มีเธอเป็นบัดดี้ เรียนจีนสนุกขึ้นเยอะเลย']];
const bxp=d=>{const b=S.buddy;return b&&buddyDone(d)?15+hash(b.n,d+7)%21:0};
function bcState(){const b=S.buddy,t=today(),ws=wkStart(t),from=Math.max(ws,b.since||ws);let me=0,fr=0;
 for(let d=from;d<=t;d++){me+=dayXp(d);fr+=bxp(d)}
 const w=wkIdx(t);if(!S.bc||S.bc.wk!==w)S.bc={wk:w,got:0,sent:(S.bc&&S.bc.sent)||0};
 return {me,fr,tot:me+fr,pct:Math.min(1,(me+fr)/BC_TARGET)}}
function bcHtml(){const b=S.buddy,f=FRIENDS[b.n],s=bcState(),done=s.tot>=BC_TARGET,got=S.bc.got;
 return `<div class="sec">เป้าหมายร่วมของสัปดาห์</div><div class="card pad2 fade-in" style="margin:0 16px">
 <div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:17px">ครบ ${BC_TARGET} XP ด้วยกัน</b><span class="cap">${Math.min(s.tot,999)} / ${BC_TARGET}</span></div>
 <div class="bcbar" role="progressbar" aria-valuenow="${Math.min(s.tot,BC_TARGET)}" aria-valuemin="0" aria-valuemax="${BC_TARGET}"><i style="width:${(s.pct*100).toFixed(0)}%"></i></div>
 <div class="cap" style="margin-top:8px;display:flex;justify-content:space-between"><span>คุณ ${s.me} XP</span><span>${f.n} ${s.fr} XP (จำลอง)</span></div>
 ${done?(got?'<div class="cap center mt8" style="color:#2E8B57;font-weight:700">รับรางวัลแล้ว ✓</div>':'<button class="pill sm mt8 press" data-go="bcclaim" style="width:100%">รับรางวัลคู่หู +50 เหรียญ</button>'):`<div class="cap mt8">อีก ${BC_TARGET-s.tot} XP ถึงรางวัล · รีเซ็ตทุกวันจันทร์</div>`}</div>
 <div class="sec">ส่งกำลังใจแบบเลือกข้อความ</div><div class="group">${BMSG.map((m,i)=>ROW('#F2ECFA',m[0],m[1],'แตะเพื่อสร้างการ์ดส่งเข้า LINE',CHEV,`data-go="bmsg" data-i="${i}"`)).join('')}</div>
 <p class="cap center mt8" style="padding:0 30px">ส่งกำลังใจแล้ว ${S.bc.sent||0} ครั้ง · ในหน้านี้เป็นการสร้างการ์ด/คัดลอก ไม่ได้ส่งหาเพื่อนจริงอัตโนมัติ</p>`}
const _b=SC.buddy;
SC.buddy=(p)=>{const r=_b(p);if(S.buddy&&r&&r.body)r.body+=bcHtml();return r};
GOX.bmsg=el=>{const b=S.buddy;if(!b)return;const i=+el.dataset.i,f=FRIENDS[b.n];bcState();S.bc.sent=(S.bc.sent||0)+1;save();bumpCnt('social',1);shareSheet('nudge',{to:f.n,msg:BMSG[i][1]})};
GOX.bcclaim=()=>{if(!S.buddy)return;const s=bcState();if(s.tot<BC_TARGET||S.bc.got)return;S.bc.got=1;addCoins(50,true);save();vib([15,30,15]);confetti(70);toast('รางวัลคู่หู +50 เหรียญ');refresh()};
})();
