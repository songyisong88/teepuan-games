/* แท็บ "แหล่งความรู้": รวมทุกส่วนที่ให้ความรู้นอกจากบทเรียน เป็นปุ่มรูปใหญ่ 2 คอลัมน์ ตัวหนังสือน้อย
   ทุกการ์ดพาไปฟีเจอร์จริงที่มีอยู่แล้ว · ไม่แสดงป้ายตัวเลขบนการ์ด (ซ้งอี้ขอเอาออก) · ไม่มีเกม (เกมอยู่แท็บเกม) */
function goRad(t){const k=radS();if(t)k.tab=t;save();mountRoot('know',false);push('rad')}
function knCards(){const n=x=>(+x||0).toLocaleString('en-US');const LBx=window.LABS||{stories:[],pairs:[],mock:[]};
 const st=(LBx.stories||[]).filter(s=>s.k!=='a').length,ar=(LBx.stories||[]).filter(s=>s.k==='a').length,pd=typeof prDoneN==='function'?prDoneN():0;
 const img=(src,cls='',sty='')=>`<img class="kn-i ${cls}" src="${src}" alt="" draggable="false" loading="lazy" decoding="async"${sty?` style="${sty}"`:''}>`;
 const pic=(kind,id,em,sty)=>`<span class="kn-pic"${sty?` style="${sty}"`:''}>${art(kind,id,em,'kn-art zh')}</span>`;
 const zc=(t,bg,sz,sty)=>`<span class="zh kn-zc" style="background:${bg};width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.6)}px;${sty||''}">${t}</span>`;
 return [
  ['ห้องพินอิน','#EAF1FB',img('assets/pinroom/scene-welcome-gate.webp'),pd?pd+'/12':'12','data-go="pinroom"','ด่านพินอิน 12 ด่าน'],
  ['เช็กพินอิน','#FDF3E6',img('assets/pinroom/extra-paper-test-bp.webp'),'12','data-go="pincheck"','12 ข้อ'],
  ['วรรณยุกต์','#FCE9EF',img('assets/pinroom/tone3-dip-rise.webp'),'','data-go="tones"',''],
  ['ลำดับขีด','#FBEDEA',`<span class="kn-row">${img('assets/icons/stk-zi.svg','kn-sq')}${M('write','kn-m2')}</span>`,typeof STK_SET!=='undefined'?n(STK_SET.size):'','data-go="strokes"','ตัวอักษร'],
  ['อักษรข้าง','#EAF4EC',`<span class="kn-row">${pic('word','水','水')}${zc('氵','#2E8B57',36,'margin:-22px 0 0 -12px')}</span>`,'','data-go="knrad"',''],
  ['คลังการ์ด','#FFF4D6',`<span class="kn-row kn-fan">${pic('word','树','树','transform:rotate(-9deg)')}${pic('rad','田','田','transform:rotate(8deg);margin-left:-14px')}</span>`,'','data-go="knrad" data-t="col"',''],
  ['บทความสั้น','#E6F4F1',pic('word','茶','茶'),ar?n(ar):'','data-go="articles"','บทความ'],
  ['นิทานอ่านเอง','#F1ECFA',M('story','kn-m'),st?n(st):'','data-go="readers"','เรื่อง'],
  ['เทียบคำใกล้เคียง','#EAF1FB',`<span class="kn-row">${zc('买','#3D6FB6',46)}${zc('卖','#C8102E',46,'margin-left:6px')}</span>`,(LBx.pairs||[]).length?n(LBx.pairs.length):'','data-go="pairs"','คู่'],
  ['ส่วนประกอบ','#FDF3E6',`<span class="kn-row">${zc('女','#E08A2E',34)}<i class="kn-op">+</i>${zc('子','#E08A2E',34)}<i class="kn-op">=</i>${zc('好','#fff',44,'color:var(--text);box-shadow:0 2px 6px rgba(60,40,30,.12)')}</span>`,'','data-go="comps"',''],
  ['ฟังแล้วพูดตาม','#EAF4EC',img('assets/pinroom/extra-listening-headphones.webp'),'','data-go="shadow"',''],
  ['ข้อสอบจำลอง','#FCE9EF',M('timer','kn-m'),(LBx.mock||[]).length?n(LBx.mock.length):'','data-go="mocklab"','ข้อในคลัง'],
  ['ลักษณนาม','#FFF4D6',`<span class="kn-row">${zc('只','#C8102E',40)}${pic('word','猫','猫','margin-left:4px')}</span>`,'','data-go="mwroom"',''],
  ['ห้องเรียนคู่หนังสือ','#FBE3E0',img('assets/mascot/teach.webp'),'','data-go="bookroom"','']]}
/* คำโปรยใต้ชื่อการ์ด บรรทัดเดียว (ซ้งอี้อนุมัติแล้ว ตามแบบร่าง v5) · เช็กพินอินใช้ 12 ข้อตามจำนวนข้อจริงในแอป (แบบร่างเขียน 8) */
const KN_DESC={'ห้องเรียนคู่หนังสือ':'เสียงประกอบหนังสือ 32 บท','ห้องพินอิน':'ฝึกพินอินพื้นฐาน 12 ด่าน','เช็กพินอิน':'ทดสอบพินอิน 12 ข้อ','วรรณยุกต์':'ฝึกฟังแยก 4 วรรณยุกต์','ลำดับขีด':'ดูลำดับขีดและฝึกเขียนตาม',
 'อักษรข้าง':'เรียนความหมายตัวข้าง','คลังการ์ด':'สะสมการ์ดอักษรข้าง','บทความสั้น':'อ่านบทความสั้น 5 ระดับ','นิทานอ่านเอง':'อ่านนิทานพร้อมคำแปล',
 'เทียบคำใกล้เคียง':'เปรียบเทียบคำที่มักสับสน','ส่วนประกอบ':'แยกส่วนประกอบตัวอักษร','ฟังแล้วพูดตาม':'ฝึกฟังและพูดตามประโยค','ข้อสอบจำลอง':'ทดสอบ 10 ข้อแบบจับเวลา','ลักษณนาม':'คำบอกหน่วย ใช้หลังตัวเลข'};
SC.know=()=>({title:'แหล่งความรู้',body:`<div class="kn-hd"><h1>แหล่งความรู้</h1><p>อ่าน ฟัง ฝึก ได้ทุกเมื่อ</p></div>${typeof hbHubHtml==='function'?hbHubHtml():''}
 <div class="kn-grid"${typeof hbHubHtml==='function'?' style="margin-top:10px"':''}>${knCards().map(([t,bg,ic,bd,at,u])=>`<button class="kn-t press" style="background:${bg}" ${at} aria-label="${t}"><span class="kn-v">${ic}</span><span class="kn-l">${t}</span>${KN_DESC[t]?`<span class="kn-d">${KN_DESC[t]}</span>`:''}</button>`).join('')}</div>${DEMO}`});
Object.assign(window.GOX=window.GOX||{},{knrad(el){const k=radS();k.tab=el.dataset.t||(k.tab==='col'?'path':k.tab||'path');save();push('rad')},radopen(){push('rad')}});
