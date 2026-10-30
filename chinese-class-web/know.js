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
/* หน้าแหล่งความรู้แบบแถวปัดข้าง (ซ้งอี้อนุมัติแบบ V1 30 ต.ค. 2026 · ไม่มีแบนเนอร์คำประจำสัปดาห์)
   6 หมวด เรียงตามลำดับการเรียน · การ์ดขาวใหญ่: รูปปก ชื่อ คำอธิบาย 1–2 บรรทัด ป้ายจำนวน · ทุกการ์ดพาไปที่เดิม · "ดูทั้งหมด" เปิดหน้ารวมของหมวด */
const KN_CATS=[
 ['พินอินและเสียง','เริ่มจากตรงนี้ ฟังและออกเสียงให้ถูก',['ห้องพินอิน','เช็กพินอิน','วรรณยุกต์','พูดผิดชีวิตเปลี่ยน']],
 ['ตัวอักษรจีน','เขียน จำ และเข้าใจที่มาของตัวอักษร',['ลำดับขีด','อักษรข้าง','ส่วนประกอบ','คลังการ์ด']],
 ['คำฮิตและแสลง','คำที่คนจีนใช้จริงในชีวิตประจำวัน',['คำฮิตติดปาก','ตัวเลขแสลง','ศัพท์โซเชียลจีน']],
 ['ใช้ได้จริงในชีวิต','สั่งอาหาร บอกรัก และอวยพรตามเทศกาล',['สั่งชานม','อาหารไทยในภาษาจีน','คำบอกรัก','คำอวยพรเทศกาล']],
 ['อ่านและฟัง','ฝึกอ่าน ฟัง และพูดตามระดับของตัวเอง',['นิทานอ่านเอง','บทความสั้น','ฟังแล้วพูดตาม','ห้องเรียนคู่หนังสือ']],
 ['คำศัพท์และแบบทดสอบ','แยกคำที่สับสน และวัดผลการเรียน',['เทียบคำใกล้เคียง','ลักษณนาม','ข้อสอบจำลอง']]];
const KN_TXT={'ห้องพินอิน':'ปูพื้นพยัญชนะ สระ และวรรณยุกต์ {ทีละด่าน}','เช็กพินอิน':'ฟังเสียงแล้ว{เลือกพินอินที่ถูก} วัดความพร้อม','วรรณยุกต์':'ฝึกฟังและแยกเสียงวรรณยุกต์{ทั้ง 4 เสียง}',
 'ลำดับขีด':'ดูลำดับขีดและฝึกเขียนตาม{ทีละขีด}','อักษรข้าง':'เรียนความหมายตัวข้าง ช่วยเดาความหมายของตัวอักษร','ส่วนประกอบ':'แยกตัวอักษรเป็นส่วน เช่น 女 กับ 子 รวมเป็น 好','คลังการ์ด':'สะสมการ์ดอักษรข้างที่เรียนผ่านแล้ว',
 'บทความสั้น':'อ่านบทความสั้น {5 ระดับ} พร้อมคำแปล','นิทานอ่านเอง':'อ่านนิทานตามระดับ พร้อมเสียงและคำแปล','ฟังแล้วพูดตาม':'ฟังประโยคแล้วพูดตาม ฝึกสำเนียงให้เป็นธรรมชาติ','ห้องเรียนคู่หนังสือ':'เสียงประกอบหนังสือเรียน เปิดฟังตามบท',
 'เทียบคำใกล้เคียง':'เปรียบเทียบคำ{ที่มักสับสน} เช่น 买 กับ 卖','ลักษณนาม':'คำบอกหน่วยที่ใช้หลังตัวเลข เช่น 一只猫','ข้อสอบจำลอง':'ทำแบบทดสอบ 10 ข้อแบบจับเวลา',
 'คำฮิตติดปาก':'คำสั้นที่คนจีน{พูดทุกวัน} เช่น 没事 好的','ตัวเลขแสลง':'ตัวเลขที่มี{ความหมายแฝง} เช่น 520 และ 88','ศัพท์โซเชียลจีน':'คำที่วัยรุ่นจีนใช้ในโซเชียล สำหรับอ่านเล่น',
 'สั่งชานม':'สั่งหวานน้อย {น้ำแข็งน้อย} ได้ด้วยตัวเอง','อาหารไทยในภาษาจีน':'ชื่ออาหารไทยที่แนะนำ{ให้คนจีนรู้จักได้}','คำบอกรัก':'ประโยคบอกความรู้สึกที่{ใช้ได้จริง}','คำอวยพรเทศกาล':'คำอวยพรตรุษจีน {วันเกิด} และไหว้พระจันทร์','พูดผิดชีวิตเปลี่ยน':'คำที่วรรณยุกต์ต่างกันแล้ว{ความหมายเปลี่ยน}'};
/* รวมการ์ดทุกใบ: ห้องฝึก (knCards) + ชุดคำ (hub.js) → {t,bg,ic,at,n(ป้ายจำนวน),lv} */
function knItems(){const n=x=>(+x||0).toLocaleString('en-US');const L=window.LABS||{};const st=(L.stories||[]).filter(s=>s.k!=='a').length,ar=(L.stories||[]).filter(s=>s.k==='a').length;
 const cnt={'ห้องพินอิน':'12 ด่าน','เช็กพินอิน':'12 ข้อ','วรรณยุกต์':'4 เสียง','ลำดับขีด':typeof STK_SET!=='undefined'&&STK_SET.size?n(STK_SET.size)+' ตัวอักษร':'',
  'อักษรข้าง':typeof RAD_CORE!=='undefined'&&RAD_CORE.length?RAD_CORE.length+' ตัวข้าง':'','ส่วนประกอบ':typeof LB!=='undefined'&&LB.comp&&LB.comp.c?LB.comp.c.length+' ส่วนที่เจอบ่อย':'',
  'บทความสั้น':ar?ar+' บทความ':'','นิทานอ่านเอง':st?st+' เรื่อง':'','ห้องเรียนคู่หนังสือ':'32 บท','เทียบคำใกล้เคียง':(L.pairs||[]).length?n(L.pairs.length)+' คู่':'',
  'ลักษณนาม':typeof MW!=='undefined'&&MW.length?MW.length+' คำ':'','ข้อสอบจำลอง':(L.mock||[]).length?'คลัง '+n(L.mock.length)+' ข้อ':''};
 const o={};knCards().forEach(([t,bg,ic,bd,at])=>o[t]={t,bg,ic,at,n:cnt[t]||''});
 if(typeof HB_ORDER!=='undefined')HB_ORDER.map(hbSet).filter(Boolean).forEach(s=>o[s.t]={t:s.t,bg:s.bg,ic:(HB_VIS[s.id]||(()=>''))(),at:`data-go="hubcol" data-c="${s.id}"`,n:s.items.length+' คำ',lv:s.browse?'อ่านเล่น':'ระดับ '+s.lv});
 return o}
function knCard(x,cls){if(!x)return '';const ic=String(x.ic).replace(/ loading="lazy"/g,'');
 return `<button class="kn-c press${cls||''}" ${x.at} aria-label="${x.t}">${x.lv?`<span class="kn-lv">${x.lv}</span>`:''}<span class="kn-cov" style="background:${x.bg}">${ic}</span><b class="kn-ct">${x.t}</b><span class="kn-cd">${(KN_TXT[x.t]||'').replace(/\{([^}]+)\}/g,'<span class="nw">$1</span>')}</span>${x.n?`<span class="kn-cn">${x.n}</span>`:''}</button>`}
SC.know=()=>{const I=knItems();return {title:'แหล่งความรู้',body:`<div class="kn-hd"><h1>แหล่งความรู้</h1><p>อ่าน ฟัง ฝึก ได้ทุกเมื่อ</p></div>
 ${KN_CATS.map(([h,sub,ts],i)=>`<div class="kn-sec"><div><h3>${h}</h3><small>${sub}</small></div><button class="lk press" data-go="kncat" data-i="${i}">ดูทั้งหมด</button></div>${h==='คำศัพท์และแบบทดสอบ'&&window.nbEntry?nbEntry():''}<div class="kn-rowx">${ts.map(t=>knCard(I[t])).join('')}</div>`).join('')}${DEMO}`}};
/* ดูทั้งหมด: หน้ารวมการ์ดของหมวด 2 คอลัมน์ */
SC.kncat=p=>{const c=KN_CATS[+p.i]||KN_CATS[0];const I=knItems();return {title:c[0],noRefresh:true,body:`<div class="large">${c[0]}</div><p class="cap" style="padding:8px 24px 0;line-height:1.55">${c[1]} · ${c[2].length} รายการ</p>
 <div class="kn-all">${c[2].map(t=>knCard(I[t],' sm')).join('')}</div><div style="height:30px"></div>`}};
Object.assign(window.GOX=window.GOX||{},{kncat(el){push('kncat',{i:+el.dataset.i||0})},knrad(el){const k=radS();k.tab=el.dataset.t||(k.tab==='col'?'path':k.tab||'path');save();push('rad')},radopen(){push('rad')}});
