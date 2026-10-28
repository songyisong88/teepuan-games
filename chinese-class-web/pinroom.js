/* ห้องพินอิน (เฟส 1) — หน้าที่ดันเข้ามา: แผนที่ 12 ด่าน · ฟังเลือก · ต่อเสียง · วรรณยุกต์
   เสียง: ใช้คลิปที่มีอยู่ในแอปเท่านั้น (AUDIO_INDEX → data-act="audio") ไม่มีคลิปของตัวอักษรเดี่ยว ๆ (b p m … ü)
   จึงให้ฟัง "จากคำจริง" แทน · ตารางพยางค์สร้างจาก tools/pinyin-build/build_pinyin.py */
const PR_SY=(window.PIN_SYL||[]).map(r=>({c:r[0],py:r[1],i:r[2],f:r[3],t:r[4]}));
const prSy=(i,f,t)=>PR_SY.find(s=>s.i===i&&s.f===f&&(t==null||s.t===t));
const prAll=(i,f)=>PR_SY.filter(s=>s.i===i&&s.f===f&&s.t<5);
const prSt=()=>{S.pin=S.pin||{done:{},weak:{}};S.pin.done=S.pin.done||{};S.pin.weak=S.pin.weak||{};return S.pin};
const prDone=n=>!!prSt().done[n];
const prDoneN=()=>Object.keys(prSt().done).length;
const prRec=()=>{for(let n=1;n<=12;n++)if(!prDone(n))return n;return 0};
const PR_ZONES={A:['ปูพื้นเสียง','ด่าน 1–6'],B:['ผสมเสียง','ด่าน 7–8'],C:['ตัวยากของคนไทย','ด่าน 9–10'],D:['ใช้จริง','ด่าน 11–12']};
const PR_LV=[
 {n:1,z:'A',t:'พินอินคืออะไร',s:'ต้น + ท้าย + เสียง',min:4},
 {n:2,z:'A',t:'สระเดี่ยว',s:'a o e i u ü',min:5},
 {n:3,z:'A',t:'b p m f',s:'ริมฝีปาก · พ่นลม/ไม่พ่น',ini:['b','p','m','f'],min:6},
 {n:4,z:'A',t:'d t n l',s:'ปลายลิ้น',ini:['d','t','n','l'],min:6},
 {n:5,z:'A',t:'g k h',s:'โคนลิ้น',ini:['g','k','h'],min:5},
 {n:6,z:'A',t:'วรรณยุกต์ 4 เสียง',s:'+ เสียงเบา',min:6},
 {n:7,z:'B',t:'ผสมเสียงแรก',s:'ai ei ao ou',fin:['a','ai','ei','ao','ou'],min:6},
 {n:8,z:'B',t:'สระ + ตัวสะกด',s:'an en in ang eng ing ong',fin:['an','en','in','ang','eng','ing','ong'],min:6},
 {n:9,z:'C',t:'j q x',s:'ลิ้นแบน ยิ้มกว้าง',ini:['j','q','x'],min:5},
 {n:10,z:'C',t:'z c s · zh ch sh r',s:'ลิ้นราบ vs ม้วนลิ้น',ini:['z','c','s','zh','ch','sh','r'],min:7},
 {n:11,z:'D',t:'กฎการเขียนพินอิน',s:'y/w · ü · iu ui un · วางเครื่องหมาย',min:5},
 {n:12,z:'D',t:'เสียงเปลี่ยนที่เจอบ่อย',s:'3+3 · 不 · 一 · เสียงเบา',min:5}
];
const prLv=n=>PR_LV[n-1];
/* ----- ตัวอย่างคำ (ต้องมีคลิปจริง · test ตรวจ) · [ตัวอักษร, ความหมาย] ----- */
const PR_EX={
 b:[['八','แปด'],['不','ไม่']],p:[['破','แตก/พัง'],['披','คลุม']],m:[['妈','แม่'],['马','ม้า']],f:[['发','ส่ง/ออก']],
 d:[['大','ใหญ่'],['都','ทั้งหมด']],t:[['他','เขา'],['太','มาก']],n:[['你','คุณ'],['拿','ถือ']],l:[['来','มา'],['老','แก่']],
 g:[['高','สูง'],['个','ลักษณนาม']],k:[['开','เปิด'],['看','ดู']],h:[['好','ดี'],['喝','ดื่ม']],
 j:[['家','บ้าน'],['九','เก้า']],q:[['七','เจ็ด'],['去','ไป']],x:[['西','ตะวันตก'],['小','เล็ก']],
 z:[['字','ตัวอักษร'],['做','ทำ']],c:[['菜','ผัก/อาหาร'],['草','หญ้า']],s:[['三','สาม'],['四','สี่']],
 zh:[['纸','กระดาษ'],['直','ตรง']],ch:[['吃','กิน'],['出','ออก']],sh:[['是','เป็น'],['书','หนังสือ']],r:[['日','วัน'],['热','ร้อน'],['人','คน']],
 ai:[['来','มา'],['白','ขาว']],ei:[['没','ไม่มี']],ao:[['好','ดี'],['高','สูง']],ou:[['都','ทั้งหมด'],['手','มือ']],
 an:[['三','สาม'],['看','ดู']],en:[['门','ประตู'],['人','คน']],in:[['信','จดหมาย']],ang:[['忙','ยุ่ง'],['方','ทิศ']],eng:[['能','สามารถ']],ing:[['请','เชิญ']],ong:[['红','แดง']]
};
const PR_ML={b:'ใกล้ ป · ไม่พ่นลม',p:'ใกล้ พ · พ่นลม',m:'เหมือน ม',f:'เหมือน ฟ',d:'ใกล้ ต · ไม่พ่นลม',t:'ใกล้ ท · พ่นลม',n:'เหมือน น',l:'เหมือน ล',g:'ใกล้ ก · ไม่พ่นลม',k:'ใกล้ ค/ข · พ่นลม',h:'ใกล้ ฮ · เสียดลำคอ',
 j:'ใกล้ จ · ลิ้นแบน ยิ้มกว้าง',q:'ใกล้ ฉ/ช · พ่นลม ลิ้นแบน',x:'ใกล้ ซ/ชิ · ลิ้นแบน ยิ้มกว้าง',z:'ts · ไม่พ่นลม',c:'ts · พ่นลม',s:'ใกล้ ซ',zh:'ม้วนลิ้น · ใกล้ จ',ch:'ม้วนลิ้น · พ่นลม',sh:'ม้วนลิ้น · ใกล้ ช/ซ',r:'ม้วนลิ้น · ใกล้ ร/ซ',
 a:'อา',o:'ออ (ปากกลม)',e:'เออ (ไม่ใช่ เอ)',i:'อี',u:'อู',ü:'อี แต่ห่อปาก',er:'เออ + ม้วนลิ้น',
 ai:'อาย',ei:'เอย',ao:'อาว',ou:'โอว',an:'อัน',en:'เอิน',in:'อิน',ang:'อาง',eng:'เอิง',ing:'อิง',ong:'อุง'};
const PR_WARN={b:'ไม่ใช่ บ ก้อง — ออกเสียงเบา ๆ แบบ ป',d:'ไม่ใช่ ด ก้อง — ใกล้ ต',g:'ไม่ใช่ ก ในภาษาอังกฤษ g — เบา ๆ แบบ ก',
 p:'คู่กับ b: p ต้องพ่นลม ถือกระดาษหน้าปากแล้วกระดาษจะสั่น',t:'คู่กับ d: t พ่นลมแรง',k:'คู่กับ g: k พ่นลมแรง',
 j:'ไม่ใช่ "เจ" แบบอังกฤษ — ลิ้นแบน ปลายลิ้นแตะฟันล่าง ยิ้มกว้าง',q:'คู่พ่นลมของ j',x:'ลิ้นแบนเหมือน j แต่ปล่อยลมเสียดแทรก',
 z:'ไม่ใช่ ซ — ต้องมี "ท" นำหน้าเบา ๆ (ts)',c:'คู่พ่นลมของ z',s:'ลิ้นราบ ไม่ม้วน',zh:'ปลายลิ้นยกขึ้นเล็กน้อย ไม่ใช่ z',ch:'คู่พ่นลมของ zh',sh:'ปลายลิ้นยกเล็กน้อย ไม่ใช่ s',r:'ไม่ใช่ ร รัว — ลิ้นยกค้างแล้วเสียดแทรกเบา ๆ',
 e:'ไม่ใช่ "เอ" — ปากแบะเล็กน้อย โคนลิ้นถอย',ü:'ไม่ใช่ "อู" — ทำปากห่อแล้วออกเสียง "อี"',o:'ในคลิป 摸 มีเสียง m นำหน้า — ฟังส่วนท้าย "o"',
 an:'ท้ายพยางค์ปิดด้วย น (ปลายลิ้นแตะเหงือก)',ang:'ท้ายพยางค์ปิดด้วย ง (โคนลิ้นยก) — ฟังคู่ an/ang ให้ออก'};
/* ----- ตัวอย่างจากตาราง (มีคลิปจริงเท่านั้น) ----- */
function prEx(k,iniMode){const out=[];(PR_EX[k]||[]).forEach(([c,g])=>{const s=PR_SY.find(x=>x.c===c);if(s&&AUDIO_INDEX[c])out.push({c,py:s.py,g})});
 if(!out.length){PR_SY.filter(s=>(iniMode?s.i===k:s.f===k)&&s.t<5&&AUDIO_INDEX[s.c]).slice(0,2).forEach(s=>out.push({c:s.c,py:s.py,g:''}))}return out}
const prHonest=`<div class="pr-honest"><b>เรื่องเสียง:</b> เสียงในห้องนี้เป็นเสียงสังเคราะห์จากคลิปที่มีในแอปอยู่แล้ว (ไม่ใช่เสียงคนจริง) · ยังไม่มีคลิปของตัวอักษรเดี่ยว ๆ (เช่น b, p, ü) จึงให้ฟัง<b>จากคำจริง</b>แทน · ชุดเสียงใหม่จะมาทีหลัง</div>`;
/* ภาพจาก PIXEL (webp โปร่งใส) — ถ้าโหลดไม่ได้ถอยไปใช้ตัวการ์ตูนเดิม */
const prImg=(n,cls,fb)=>`<img class="pr-img ${cls||''}" src="assets/pinroom/${n}.webp" alt="" loading="lazy" decoding="async" draggable="false" onerror="this.outerHTML=window.__prFb?window.__prFb('${fb||'student'}'):''">`;
window.__prFb=p=>M(p);
const PR_POSE={b:'lips-bpmf',p:'lips-bpmf',m:'lips-bpmf',f:'lips-bpmf',d:'tip-dtnl',t:'tip-dtnl',n:'tip-dtnl',l:'tip-dtnl',g:'back-gkh',k:'back-gkh',h:'back-gkh',j:'flat-jqx',q:'flat-jqx',x:'flat-jqx',z:'straight-zcs',c:'straight-zcs',s:'straight-zcs',zh:'curl-zhchshr',ch:'curl-zhchshr',sh:'curl-zhchshr',r:'curl-zhchshr','ü':'round-u'};
const PR_POSE_CAP={'lips-bpmf':'ริมฝีปาก','tip-dtnl':'ปลายลิ้น','back-gkh':'โคนลิ้น','flat-jqx':'ลิ้นแบน ยิ้มกว้าง','straight-zcs':'ลิ้นตรง','curl-zhchshr':'ม้วนปลายลิ้น','round-u':'ปากกลมจู๋'};
const PR_MOUTH={a:['extra-mouth-open-a','ปากอ้ากว้าง'],o:['extra-mouth-round-o','ปากกลม'],e:['extra-mouth-smile-e','ปากยิ้มกว้าง']};
const prPose=k=>{const n=PR_POSE[k];if(n)return [`pose-${n}`,PR_POSE_CAP[n]];const m=PR_MOUTH[k];return m?[m[0],m[1]]:null};
const prPic=k=>{const p=prPose(k);return p?`<figure class="pr-pic">${prImg(p[0],'','teach')}<figcaption>${p[1]}<small>ภาพประกอบอย่างง่าย (ไม่ใช่ภาพกายวิภาคจริง)</small></figcaption></figure>`:''};
const prDraft=`<span class="pr-draft">ร่าง · รอครูตรวจ</span>`;
const prSpk=(c,label)=>`<button class="pr-spk press" data-act="audio" data-t="${c}" aria-label="ฟัง ${label||c}">${SPK}</button>`;
const prWord=e=>`<div class="pr-wl"><span class="z zh">${e.c}</span><div class="sp1"><div class="p">${pyHtml(e.py)}</div>${e.g?`<div class="m">${e.g}</div>`:''}</div>${prSpk(e.c,e.py)}</div>`;
function prLetter(k,iniMode,big){const ex=prEx(k,iniMode);const w=PR_WARN[k];
 return `<div class="pr-card"><div class="pr-let"><div class="big pys">${big||k}</div><div class="tt"><b>${PR_ML[k]||''}</b><small>เทียบเสียงไทย ${prDraft}</small></div></div>${prPic(k)}${w?`<div class="pr-callout"><span>⚠️</span><span>${w}</span></div>`:''}<div class="pr-ex"><div class="cap" style="font-size:12px;padding:8px 0 2px">ฟังจากคำจริง</div>${ex.map(prWord).join('')}</div></div>`}
function prToneCards(){const T=[[1,'妈','แม่','สูงนิ่ง','tone1-high-flat'],[2,'麻','ป่าน','ไต่ขึ้น','tone2-rising'],[3,'马','ม้า','ลงต่ำแล้วขึ้น','tone3-dip-rise'],[4,'骂','ด่า','ตกลงเร็ว','tone4-falling']];
 return `<div class="pr-tc">${T.map(([t,c,g,d,im])=>{const s=PR_SY.find(x=>x.c===c);return `<button class="pr-tcard press" data-act="audio" data-t="${c}" aria-label="ฟัง ${s.py}">${prImg(im,'tpic','teach')}<span class="py">${pyHtml(s.py)}</span><span class="th">${c} ${g}</span><span class="th">เสียง ${t} · ${d}</span>${tlSvg([t],{h:44,w:56,sw:4})}</button>`}).join('')}</div>
 <div class="pr-card"><div class="pr-let">${prImg('tone5-neutral-light','tpic5','teach')}<div class="tt"><h3 style="margin:0">เสียงเบา · ma</h3><p style="margin:4px 0 0">บางพยางค์ไม่มีเครื่องหมายเสียง เช่น 吗 ma (คำลงท้ายคำถาม) — เบาและสั้น ลอยตามหลังพยางค์ก่อนหน้า</p></div></div><div class="pr-ex">${prWord({c:'吗',py:'ma',g:'ไหม (ท้ายคำถาม)'})}</div></div>
 <div class="pr-card"><h3>เทียบกับเสียงวรรณยุกต์ไทย ${prDraft}</h3><p>ไทยมี 5 เสียง จีนมี 4 + เสียงเบา และเส้นเสียงไม่เหมือนกัน — อย่าแปลง 1:1 ฟังคลิปแล้วเทียบด้วยตัวเอง · ดูหน้าวรรณยุกต์ฉบับเต็มได้ที่ปุ่มด้านล่าง</p><button class="pill sm ghost press mt12" data-go="tones">เปิดหน้าวรรณยุกต์ฉบับเต็ม</button></div>`}
/* ----- เนื้อหาสอนต่อด่าน ----- */
function prTeach(n){const L=prLv(n);let h='';
 if(n===1){const s=prSy('b','a',1);
  h=`<div class="pr-hero">${prImg('scene-welcome-gate','','wave')}</div><div class="pr-card"><h3>พินอิน = ตัวช่วยอ่านเสียงจีน</h3><p>ตัวจีนไม่บอกเสียง พินอินคือตัวอักษรโรมันที่บอกเสียงของตัวจีน <b>ไม่ใช่</b>การอ่านแบบภาษาอังกฤษ</p>
   <div class="pr-fold"><span class="pr-tile ini">b</span><span class="pl">+</span><span class="pr-tile fin">a</span><span class="pl">+</span><span class="pr-tile tn">ˉ</span><span class="pl">→</span><span class="pys">${pyHtml('bā')}</span><span class="zh">八</span></div>
   <p style="text-align:center">ต้น (พยัญชนะ) + ท้าย (สระ) + เสียงสูงต่ำ</p><div class="pr-ex">${prWord({c:'八',py:'bā',g:'แปด'})}</div></div>
  <div class="pr-card"><h3>3 ส่วนของทุกพยางค์</h3><p><b style="color:#A3281A">ต้น</b> พยัญชนะต้น (บางพยางค์ไม่มี เช่น <span class="pys">ài</span>) · <b style="color:#2B5B94">ท้าย</b> สระ/ตัวสะกด · <b style="color:#6B3F94">เสียง</b> 4 เสียง + เสียงเบา เขียนเป็นเครื่องหมายเหนือสระ ˉ ˊ ˇ ˋ</p></div>
  <div class="pr-card"><div class="pr-let">${prImg('extra-listening-headphones','mini','listening')}<div class="tt"><h3 style="margin:0">ลองฟังคำจริง</h3></div></div><p>ยังไม่ต้องจำ แค่ฟังและมองตัวพินอินตามไปก่อน</p><div class="pr-ex">${[['你好','nǐ hǎo','สวัสดี'],['谢谢','xiè xie','ขอบคุณ'],['再见','zài jiàn','ลาก่อน']].map(([c,py,g])=>prWord({c,py,g})).join('')}</div></div>`}
 else if(n===2){h=['a','o','e','i','u','ü'].map(v=>{const c={a:'啊',o:'摸',e:'饿',i:'一',u:'五','ü':'雨'}[v];const s=PR_SY.find(x=>x.c===c);
   return `<div class="pr-card"><div class="pr-let"><div class="big pys">${v}</div><div class="tt"><b>${PR_ML[v]}</b><small>เทียบเสียงไทย ${prDraft}</small></div></div>${prPic(v)}${PR_WARN[v]?`<div class="pr-callout"><span>⚠️</span><span>${PR_WARN[v]}</span></div>`:''}<div class="pr-ex">${prWord({c,py:s.py,g:''})}</div></div>`}).join('')
   +`<div class="pr-card"><div class="pr-let"><div class="big pys">er</div><div class="tt"><b>${PR_ML.er}</b><small>พบน้อย แต่เจอใน 二 èr (สอง) และ 女儿 nǚ'ér ${prDraft}</small></div></div><div class="pr-ex">${prWord({c:'二',py:'èr',g:'สอง'})}</div></div>`}
 else if(n===6){h=`<div class="pr-card"><h3>พยางค์เดียว ฟัง 4 เสียง</h3><p>พยางค์ <b>ma</b> เปลี่ยนความหมายตามเสียงสูงต่ำ — แตะแต่ละใบเพื่อฟัง</p></div>`+prToneCards()}
 else if(n===11){const R=[['y / w ต้นพยางค์','i, u, ü เดี่ยว ๆ ต้นพยางค์เขียนเป็น yi, wu, yu','一 yī · 五 wǔ · 雨 yǔ'],['ü หลัง j q x','ใช้ u ธรรมดา (ไม่ต้องมีจุดสองจุด) แต่ออกเสียงเป็น ü','去 qù · 九 jiǔ'],['iu / ui / un','เขียนย่อจาก iou, uei, uen เมื่อมีพยัญชนะนำ','六 liù · 水 shuǐ'],['วางเครื่องหมายเสียง','วางที่ a ก่อน → ถ้าไม่มี a วางที่ o หรือ e → ถ้า iu/ui วางที่ตัวหลัง','好 hǎo · 水 shuǐ · 六 liù'],['จุดคั่น (apostrophe)','ใช้คั่นเมื่ออ่านผิดพยางค์ได้ เช่น xi’an (西安) ต่างจาก xian','西安 xī’ān']];
  h=R.map(([t,d,e])=>`<div class="pr-card"><h3>${t}</h3><p>${d}</p><p><b>${e}</b></p></div>`).join('')+`<div class="pr-card"><h3>ฟังจากคำจริง</h3><div class="pr-ex">${[['一','yī','หนึ่ง'],['去','qù','ไป'],['六','liù','หก'],['水','shuǐ','น้ำ']].map(([c,py,g])=>prWord({c,py,g})).join('')}</div></div><div class="pr-fold" style="margin-top:8px">${prDraft}</div>`}
 else if(n===12){const R=[['3 + 3 → 2 + 3','เสียง 3 สองพยางค์ติดกัน พยางค์แรกพูดเป็นเสียง 2','你好 เขียน nǐ hǎo แต่พูด ní hǎo'],['不 bù → bú','ก่อนเสียง 4 เปลี่ยนเป็น bú','不是 bú shì · 不要 bú yào'],['一 yī → yí / yì','ก่อนเสียง 4 เป็น yí · ก่อนเสียง 1–3 เป็น yì','一个 yí ge · 一天 yì tiān'],['เสียงเบา','พยางค์ซ้ำท้ายหรือคำลงท้ายมักเบา','谢谢 xiè xie · 妈妈 mā ma']];
  h=R.map(([t,d,e])=>`<div class="pr-card"><h3>${t}</h3><p>${d}</p><p><b>${e}</b></p></div>`).join('')+`<div class="pr-card"><h3>ฟังจากคำจริง</h3><p>คลิปเป็นเสียงสังเคราะห์ ฟังแล้วเทียบกับกฎด้วยตัวเอง</p><div class="pr-ex">${[['你好','nǐ hǎo','สวัสดี'],['不是','bú shì','ไม่ใช่'],['谢谢','xiè xie','ขอบคุณ'],['妈妈','mā ma','แม่']].map(([c,py,g])=>prWord({c,py,g})).join('')}</div></div>`}
 else if(L.ini){h=L.ini.map(k=>prLetter(k,true)).join('');
   if(n===3||n===4||n===5||n===9||n===10)h+=`<div class="pr-card">${n===3?`<div class="pr-let">${prImg('extra-paper-test-bp','mini','think')}<div class="tt"><h3 style="margin:0">คู่พ่นลม / ไม่พ่นลม</h3></div></div>`:'<h3>คู่พ่นลม / ไม่พ่นลม</h3>'}<p>${n===3?'b ↔ p':n===4?'d ↔ t':n===5?'g ↔ k':n===9?'j ↔ q':'z ↔ c · zh ↔ ch'} ต่างกันที่ลมจากปาก — ลองถือกระดาษไว้หน้าปาก ตัวพ่นลมจะทำให้กระดาษสั่น ${prDraft}</p></div>`}
 else if(L.fin){h=L.fin.filter(k=>k!=='a').map(k=>prLetter(k,false)).join('')}
 return h}
/* ----- ข้อฝึก ----- */
const prPlain=s=>s.i+s.f;
const prPickTarget=(arr,used)=>{const f=arr.filter(s=>!used.has(s.c));const a=f.length?f:arr;return a[Math.random()*a.length|0]};
function prListenGroups(L,mode,n){ /* mode 'ini' = ท้ายเหมือนกัน ต้นต่างกัน · 'fin' = ต้นเหมือนกัน ท้ายต่างกัน */
 const groups=[];
 if(mode==='ini'){const fins=[...new Set(PR_SY.map(s=>s.f))];fins.forEach(f=>{const c=L.ini.filter(i=>prAll(i,f).length);if(c.length>=Math.min(3,L.ini.length))groups.push({key:f,opts:c.map(i=>({lab:i+f,s:prAll(i,f)}))})})}
 else{const inis=[...new Set(PR_SY.filter(s=>s.i).map(s=>s.i))];inis.forEach(i=>{const c=L.fin.filter(f=>prAll(i,f).length);if(c.length>=3)groups.push({key:i,opts:c.map(f=>({lab:i+f,s:prAll(i,f)}))})})}
 const out=[],used=new Set();let g=shuffle(groups);if(!g.length)return out;
 for(let k=0;k<n*3&&out.length<n;k++){const gr=g[k%g.length];const tgt=gr.opts[Math.random()*gr.opts.length|0];const s=prPickTarget(tgt.s,used);used.add(s.c);
  const others=shuffle(gr.opts.filter(o=>o!==tgt)).slice(0,3);const opts=shuffle([tgt,...others]).map(o=>o.lab);
  out.push({k:'listen',say:s.c,ans:tgt.lab,opts,q:'ฟังแล้วเลือกพยางค์ที่ได้ยิน',rev:`${s.c} ${pyHtml(s.py)}`,hit:s,pair:others.map(o=>[tgt.lab,o.lab])})}
 return out}
function prBlendQ(L,n){const IN=['b','p','m','f','d','t','n','l','g','k','h','z','c','s','zh','ch','sh','r'];
 const fins=L.fin||['a','ai','ei','ao','ou','i','u','an','en','ang'];const inis=(L.ini||IN).filter(i=>IN.includes(i));
 const pool=PR_SY.filter(s=>IN.includes(s.i)&&inis.concat(L.fin?IN:[]).includes(s.i)&&fins.includes(s.f)&&s.t<5&&AUDIO_INDEX[s.c]);
 const out=[],used=new Set();shuffle(pool).forEach(s=>{if(out.length>=n||used.has(s.c))return;used.add(s.c);
  const pi=L.ini||[...new Set(pool.map(x=>x.i))];const pf=[...new Set(pool.map(x=>x.f))];
  const ti=shuffle([s.i,...shuffle(pi.filter(x=>x!==s.i)).slice(0,4)]).slice(0,5),tf=shuffle([s.f,...shuffle(pf.filter(x=>x!==s.f)).slice(0,3)]);
  const ti2=ti.includes(s.i)?ti:shuffle([s.i,...ti.slice(0,4)]);const tf2=tf.includes(s.f)?tf:shuffle([s.f,...tf.slice(0,3)]);
  out.push({k:'blend',say:s.c,s,ti:ti2,tf:tf2,rev:`${s.c} ${pyHtml(s.py)}`})});return out}
function prToneQ(n){const g={};PR_SY.filter(s=>s.t<5&&s.i&&AUDIO_INDEX[s.c]).forEach(s=>{(g[s.i+'|'+s.f]=g[s.i+'|'+s.f]||[]).push(s)});
 const ok=Object.values(g).filter(a=>new Set(a.map(s=>s.t)).size>=3).map(a=>{const m={};a.forEach(s=>{if(!m[s.t])m[s.t]=s});return Object.values(m)});
 const out=[];shuffle(ok).slice(0,n).forEach(a=>{const tgt=a[Math.random()*a.length|0];const opts=a.slice().sort((x,y)=>x.t-y.t);
  out.push({k:'listen',say:tgt.c,ans:tgt.py,opts:opts.map(s=>s.py),mark:true,q:'ฟังเสียงสูงต่ำ แล้วเลือกพินอินที่ถูก',rev:`${tgt.c} ${pyHtml(tgt.py)}`,pair:opts.filter(s=>s!==tgt).map(s=>['เสียง'+tgt.t,'เสียง'+s.t])})});return out}
const PR_V={a:'啊',o:'摸',e:'饿',i:'一',u:'五','ü':'雨'};
function prVowelQ(){return shuffle(Object.keys(PR_V)).map(v=>{const s=PR_SY.find(x=>x.c===PR_V[v]);return {k:'listen',say:s.c,ans:v,opts:shuffle([v,...shuffle(Object.keys(PR_V).filter(x=>x!==v)).slice(0,3)]),q:'ฟังแล้วเลือกสระที่ได้ยิน'+(v==='o'?' (คลิป 摸 มี m นำหน้า)':''),rev:`${s.c} ${pyHtml(s.py)} → <b>${v}</b>`,pair:[[v,'?']]}})}
function prQs(n){const L=prLv(n);let q=[];
 if(n===1)q=[{k:'listen',say:'你好',ans:'nǐ hǎo',opts:['nǐ hǎo','xiè xie','zài jiàn'],mark:true,q:'ฟังคำนี้ แล้วเลือกพินอินที่ตรงกัน',rev:'你好 nǐ hǎo = สวัสดี',pair:[]},
  {k:'listen',say:'谢谢',ans:'xiè xie',opts:['zài jiàn','xiè xie','nǐ hǎo'],mark:true,q:'ฟังคำนี้ แล้วเลือกพินอินที่ตรงกัน',rev:'谢谢 xiè xie = ขอบคุณ',pair:[]},
  {k:'listen',say:'再见',ans:'zài jiàn',opts:['xiè xie','zài jiàn','nǐ hǎo'],mark:true,q:'ฟังคำนี้ แล้วเลือกพินอินที่ตรงกัน',rev:'再见 zài jiàn = ลาก่อน',pair:[]},
  {k:'know',q:'พยางค์ bā แบ่งเป็นกี่ส่วน อะไรบ้าง?',opts:['ต้น b + ท้าย a + เสียง 1','ต้น ba + เสียง 1','มีแค่ตัวอักษร 2 ตัว ไม่มีเสียง'],ans:0,rev:'ต้น b + ท้าย a + เสียง 1 (ˉ)'},
  {k:'know',q:'ˉ ˊ ˇ ˋ คืออะไร?',opts:['เครื่องหมายเสียงสูงต่ำ','ตัวสะกด','เครื่องหมายแยกคำ'],ans:0,rev:'เครื่องหมายวรรณยุกต์ เสียง 1 2 3 4'}];
 else if(n===2)q=prVowelQ();
 else if(n===6)q=prToneQ(6);
 else if(n===11)q=[
  {k:'listen',say:'一',ans:'yi',opts:['yi','i','ji'],q:'ฟัง 一 แล้วเลือกตัวเขียนพินอิน',rev:'i เดี่ยว ๆ ต้นพยางค์เขียนเป็น <b>yi</b>',pair:[]},
  {k:'listen',say:'五',ans:'wu',opts:['wu','u','vu'],q:'ฟัง 五 แล้วเลือกตัวเขียนพินอิน',rev:'u เดี่ยว ๆ ต้นพยางค์เขียนเป็น <b>wu</b>',pair:[]},
  {k:'listen',say:'雨',ans:'yu',opts:['yu','ü','u'],q:'ฟัง 雨 แล้วเลือกตัวเขียนพินอิน',rev:'ü ต้นพยางค์เขียนเป็น <b>yu</b>',pair:[]},
  {k:'listen',say:'去',ans:'qu',opts:['qu','qü','qiu'],q:'ฟัง 去 แล้วเลือกตัวเขียนพินอิน',rev:'หลัง j q x เขียน <b>u</b> แต่ออกเสียงเป็น ü',pair:[]},
  {k:'listen',say:'六',ans:'liu',opts:['liu','liou','lu'],q:'ฟัง 六 แล้วเลือกตัวเขียนพินอิน',rev:'iou ย่อเป็น <b>iu</b> เมื่อมีพยัญชนะนำ',pair:[]},
  {k:'listen',say:'水',ans:'shuǐ',opts:['shuǐ','shǔi','shuì'],mark:true,q:'ฟัง 水 แล้วเลือกพินอินที่วางเครื่องหมายเสียงถูก',rev:'ui/iu วางเครื่องหมายที่ตัวหลัง → <b>shuǐ</b>',pair:[]}];
 else if(n===12)q=[
  {k:'listen',say:'你好',ans:'ní hǎo',opts:['nǐ hǎo','ní hǎo','nī hǎo'],mark:true,q:'3 + 3 ติดกัน — พูดจริงเป็นแบบไหน? (เขียน nǐ hǎo)',rev:'พยางค์แรกเป็นเสียง 2 → <b>ní hǎo</b> · คลิปสังเคราะห์อาจไม่ตรงกฎ ฟังเทียบเอง',pair:[]},
  {k:'listen',say:'不是',ans:'bú shì',opts:['bù shì','bú shì','bū shì'],mark:true,q:'不 ก่อนเสียง 4 พูดเป็น?',rev:'不 + เสียง 4 → <b>bú shì</b>',pair:[]},
  {k:'listen',say:'谢谢',ans:'xiè xie',opts:['xiè xiè','xiè xie','xiè xiē'],mark:true,q:'พยางค์ซ้ำท้ายคำนี้เขียนอย่างไร?',rev:'พยางค์ที่สองเป็นเสียงเบา → <b>xiè xie</b>',pair:[]},
  {k:'listen',say:'对不起',ans:'duì bu qǐ',opts:['duì bù qǐ','duì bu qǐ','duì bú qǐ'],mark:true,q:'不 อยู่กลางคำนี้ เป็นเสียงอะไร?',rev:'不 กลางคำเป็นเสียงเบา → <b>duì bu qǐ</b>',pair:[]},
  {k:'know',q:'一个 (หนึ่งอัน) ออกเสียงเป็น?',opts:['yī gè','yí gè','yì gè'],ans:1,rev:'一 + เสียง 4 → <b>yí gè</b> (ในตำราเขียน yí ge)'}];
 else {const l=prListenGroups(L,L.ini?'ini':'fin',L.fin?3:6);const b=prBlendQ(L,L.fin?5:2);q=[...l,...b]}
 return q}
/* ----- หน้าจอ ----- */
const PR_NAV=`<div class="seshnav"><button class="x" data-pq="1" aria-label="ปิด">×</button><div class="prog" style="flex:1"><i id="pg" style="width:0"></i></div><div class="cap" id="pc" style="font-weight:600;color:var(--red);min-width:40px;text-align:right"></div></div>`;
function prMinsLeft(){let m=0;PR_LV.forEach(l=>{if(!prDone(l.n))m+=l.min});return m}
SC.pinroom=()=>{const done=prDoneN(),rec=prRec();let rows='',zone='';
 PR_LV.forEach((l,i)=>{if(l.z!==zone){zone=l.z;rows+=`<div class="pr-zone"><span>${PR_ZONES[zone][0]} · ${PR_ZONES[zone][1]}</span></div>`}
  const st=prDone(l.n)?'ok':l.n===rec?'cur':'';const pos=['l','c','r','c'][i%4];
  rows+=`<div class="pr-row ${pos}"><button class="pr-nd ${st} press" data-go="pinlv" data-n="${l.n}" aria-label="ด่าน ${l.n} ${l.t}"><span class="n">${st==='ok'?'✓':l.n}</span><span class="t">${l.n===rec?'<span class="pr-rec">แนะนำ</span>':''}<b>${l.t}</b><small>${l.n===rec?'เริ่มเลย · '+l.min+' นาที':l.s}</small></span></button></div>`});
 const bar=PR_LV.map(l=>`<i class="${prDone(l.n)?'ok':l.n===rec?'cur':''}"></i>`).join('');
 return {title:'ห้องพินอิน',body:`<div class="large">ห้องพินอิน</div><p class="cap" style="padding:0 24px;line-height:1.5">เริ่มจากศูนย์ ฟังและอ่านออกเสียงจีนได้ใน 12 ด่าน · ไม่ล็อก เปิดด่านไหนก่อนก็ได้</p>
  <div class="pr-hero sm">${prImg('scene-welcome-gate','','wave')}</div><div class="pr-head"><div class="pm">${M('student')}</div><div><b>เรียนไปแล้ว ${done} จาก 12 ด่าน</b><small>${done>=12?'ครบแล้ว! ไปเรียนบทที่ 1 ได้เลย':'เหลือประมาณ '+prMinsLeft()+' นาที · ด่านละ 4–7 นาที'}</small></div></div>
  <div class="pr-zbar">${bar}</div><div class="pr-zl">${Object.values(PR_ZONES).map(z=>`<span style="flex:${z[1].includes('1–6')?6:2}">${z[0]}</span>`).join('')}</div>
  ${prHonest}<div class="pr-path">${rows}</div>`,
  extra:rec?`<div class="dock"><button class="pill press" data-go="pinlv" data-n="${rec}"><b>ไปด่าน ${rec} · ${prLv(rec).t}</b><small>${prLv(rec).min} นาที</small></button></div>`:`<div class="dock"><button class="pill press" data-act="pinbook"><b>เริ่มบทที่ 1</b><small>ไปที่แท็บบทเรียน</small></button></div>`}};
SC.pinlv=({n}={})=>{n=+n||1;const L=prLv(n);
 return {title:'ด่าน '+n,body:`<div style="padding:4px 24px 0"><span class="pr-draft" style="background:#EFE8DE;color:var(--sub2);border-color:#E0D5C8">${PR_ZONES[L.z][0]} · ด่าน ${n}/12</span></div><div class="large" style="padding-top:8px">${L.t}</div><p class="cap" style="padding:0 24px">${L.s} · ${L.min} นาที</p>${n===1?prHonest:''}${prTeach(n)}<div style="height:150px"></div>`,
  extra:`<div class="dock"><button class="pill press" data-go="pinplay" data-n="${n}"><b>เริ่มฝึก</b><small>ฟัง เลือก และต่อเสียง · ${prQs(n).length} ข้อ</small></button></div>`}};
SC.pinplay=({n}={})=>{n=+n||1;
 return {nav:PR_NAV,noRefresh:true,body:'<div class="stage pr-st" id="stage"></div>',extra:'<div class="dock" id="dock"></div>',unmount(){stopAudio()},
  mount(el){const qs=prQs(n),stage=$('#stage',el),dock=$('#dock',el),pg=$('#pg',el),pc=$('#pc',el);let i=0,right=0,locked=false;const weak={},heard=[];
   if(!qs.length){stage.innerHTML='<div class="pr-q"><p class="cap">ยังสร้างข้อฝึกของด่านนี้ไม่ได้</p></div>';return}
   el.addEventListener('click',e=>{if(e.target.closest('[data-pq]')){openSheet(`<div class="center" style="padding:0 24px"><div style="width:120px;height:120px;margin:0 auto">${M('sleepy')}</div><div class="h2 mt8">ออกจากด่านนี้?</div><p style="color:var(--sub2);margin:6px 0 18px;font-size:15px">คะแนนที่ทำไปจะไม่ถูกบันทึก</p><button class="pill press" data-act="closesheet"><b>อยู่ต่อ</b></button><button class="pill sm ghost press mt12" id="prLeave">ออก</button></div>`,{onMount(){const b=$('#prLeave');if(b)b.onclick=()=>{closeSheet();pop()}}})}});
   const next=()=>{i++;if(i>=qs.length)finish();else show()};
   const nextBtn=(ok)=>{dock.innerHTML=`<button class="pill press" id="prNext"><b>${i+1>=qs.length?'ดูผล':'ต่อไป'}</b></button>`;$('#prNext',dock).onclick=next};
   function note(s){if(s&&s.c&&!heard.find(h=>h.c===s.c))heard.push(s)}
   function show(){locked=false;const q=qs[i];window.__prq=q;pg.style.width=(i/qs.length*100)+'%';pc.textContent=(i+1)+' / '+qs.length;dock.innerHTML='';
    if(q.k==='blend')return showBlend(q);
    const spk=q.say?`<button class="pr-big press" data-act="audio" data-t="${q.say}" data-auto aria-label="ฟังอีกครั้ง">${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`:'';
    stage.innerHTML=`<div class="pr-q"><div class="cap">${q.q}</div>${spk}</div><div class="pr-opts">${(q.opts||[]).map((o,k)=>`<button class="pr-opt press" data-k="${k}">${q.mark?pyHtml(o):o}</button>`).join('')}</div><div id="prfb"></div>`;
    if(q.say)setTimeout(()=>{const b=$('.pr-big',stage);if(b&&!locked)speak(q.say,b)},250);
    $$('.pr-opt',stage).forEach(b=>b.onclick=()=>{if(locked)return;locked=true;const k=+b.dataset.k;const ok=q.k==='know'?k===q.ans:q.opts[k]===q.ans;
     $$('.pr-opt',stage).forEach((x,j)=>{x.disabled=true;const good=q.k==='know'?j===q.ans:q.opts[j]===q.ans;if(good)x.classList.add('ok');else if(j===k)x.classList.add('no')});
     if(ok){right++;vib(10);if(q.hit)note(q.hit)}else{vib([20,30,20]);(q.pair||[]).slice(0,1).forEach(p=>{const key=p.join(' ↔ ');weak[key]=(weak[key]||0)+1})}
     $('#prfb',stage).innerHTML=`<div class="pr-fb ${ok?'ok':'no'}"><b>${ok?'ถูกต้อง!':'ยังไม่ใช่'}</b><br>${q.rev||''}</div>`;nextBtn(ok)})}
   function showBlend(q){const sel={i:null,f:null,t:null};const s=q.s;
    const nk=()=>!sel.i?'i':!sel.f?'f':!sel.t?'t':null;
    const tm=['ˉ','ˊ','ˇ','ˋ','·'];
    function draw(){const slot=(k,l,cls)=>`<button class="pr-slot ${sel[k]!==null?'f '+cls:''} ${nk()===k?'act':''}" data-clr="${k}" aria-label="${l}"><span class="v pys">${sel[k]===null?'?':k==='t'?(sel.t===5?'·':tm[sel.t-1]):sel[k]}</span><span>${l}</span></button>`;
     stage.innerHTML=`<div class="pr-q"><div class="cap">ฟังแล้วต่อเสียงให้ตรงกัน</div><button class="pr-big press" data-act="audio" data-t="${q.say}" data-auto aria-label="ฟังอีกครั้ง">${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div></div>
      <div class="pr-slots">${slot('i','ต้น','i')}<span class="plus">+</span>${slot('f','ท้าย','n')}<span class="plus">+</span>${slot('t','เสียง','t')}</div>
      <div class="pr-lbl">พยัญชนะต้น</div><div class="pr-tiles">${q.ti.map(x=>`<button class="pr-tile ini press ${sel.i===x?'used':''}" data-p="i" data-v="${x}">${x}</button>`).join('')}</div>
      <div class="pr-lbl">สระท้าย</div><div class="pr-tiles">${q.tf.map(x=>`<button class="pr-tile fin press ${sel.f===x?'used':''}" data-p="f" data-v="${x}">${x}</button>`).join('')}</div>
      <div class="pr-lbl">เสียงวรรณยุกต์</div><div class="pr-tiles">${[1,2,3,4,5].map(x=>`<button class="pr-tile tn press ${sel.t===x?'used':''}" data-p="t" data-v="${x}" aria-label="${x===5?'เสียงเบา':'เสียง '+x}">${tm[x-1]}</button>`).join('')}</div><div id="prfb"></div>`;
     $$('.pr-tile',stage).forEach(b=>b.onclick=()=>{if(locked)return;sel[b.dataset.p]=b.dataset.p==='t'?+b.dataset.v:b.dataset.v;vib(6);draw();chk()});
     $$('.pr-slot',stage).forEach(b=>b.onclick=()=>{if(locked)return;sel[b.dataset.clr]=null;draw();chk()})}
    function chk(){if(nk()){dock.innerHTML=`<button class="pill press" disabled style="opacity:.5"><b>ตรวจคำตอบ</b></button>`;return}
     dock.innerHTML=`<button class="pill press" id="prChk"><b>ตรวจคำตอบ</b></button>`;$('#prChk',dock).onclick=()=>{locked=true;const ok=sel.i===s.i&&sel.f===s.f&&sel.t===s.t;
      if(ok){right++;vib(10);note(s)}else{vib([20,30,20]);const k=(sel.i!==s.i?s.i+' ↔ '+sel.i:sel.f!==s.f?s.f+' ↔ '+sel.f:'เสียง'+s.t+' ↔ เสียง'+sel.t);weak[k]=(weak[k]||0)+1}
      $$('.pr-tile,.pr-slot',stage).forEach(b=>b.disabled=true);
      $('#prfb',stage).innerHTML=`<div class="pr-fb ${ok?'ok':'no'}"><b>${ok?'ต่อเสียงถูก!':'ยังไม่ใช่'}</b><br>คำตอบ: <b>${s.i||'∅'}</b> + <b>${s.f}</b> + เสียง ${s.t} → ${q.rev}</div>`;nextBtn(ok)}}
    draw();chk();setTimeout(()=>{const b=$('.pr-big',stage);if(b&&!locked)speak(q.say,b)},250)}
   function finish(){const first=!prDone(n),acc=right/qs.length;stopAudio();const st=prSt();
    const pass=acc>=.6;if(pass)st.done[n]=1;Object.keys(weak).forEach(k=>st.weak[k]=(st.weak[k]||0)+weak[k]);
    const xp=8+right*2;addXp(xp);const coins=pass&&first?12:0;if(coins)addCoins(coins);save();replace('pinres',{n,right,total:qs.length,xp,coins,pass,heard:heard.slice(0,6).map(h=>h.c).join(''),weak:JSON.stringify(Object.entries(weak).sort((a,b)=>b[1]-a[1]).slice(0,2))})}
   show()}}};
SC.pinres=p=>{const n=+p.n,right=+p.right,total=+p.total,pass=p.pass===true||p.pass==='true';const weak=JSON.parse(p.weak||'[]');const rec=prRec();
 const heard=[...(p.heard||'')].map(c=>PR_SY.find(s=>s.c===c)).filter(Boolean);
 setTimeout(()=>{if(pass)confetti(n===12?120:70)},300);
 return {nav:'<header class="nav"></header>',noRefresh:true,body:`<div class="pr-res"><div class="pm">${prImg(pass?(n===12?'scene-reward-trophy':'scene-stage-clear'):'scene-try-again','',pass?'cheer':'think')}</div><div class="large" style="padding:6px 0 0">${pass?'ผ่านด่าน '+n+' แล้ว!':'เกือบแล้ว!'}</div><p class="cap">ตอบถูก ${right} จาก ${total} ข้อ${pass?'':' · ต้องถูก 60% ขึ้นไปจึงจะนับว่าผ่าน'}</p>
  <div class="pr-stats"><div><b>+${p.xp}</b><small>XP</small></div><div><b>${+p.coins>0?'+'+p.coins:'—'}</b><small>${+p.coins>0?'เหรียญ':'เหรียญ (รอบแรกที่ผ่าน)'}</small></div><div><b>${prDoneN()}/12</b><small>ด่านที่ผ่าน</small></div></div>
  ${heard.length?`<div class="cap" style="text-align:left;margin-top:16px;font-size:13px">คำที่ตอบถูกในด่านนี้ — แตะเพื่อฟัง</div><div class="pr-chips">${heard.map(s=>`<button class="pr-chip press" data-act="audio" data-t="${s.c}"><span class="z zh">${s.c}</span><small>${pyHtml(s.py)}</small></button>`).join('')}</div>`:''}
  ${weak.length?`<div class="pr-callout" style="text-align:left;margin-top:14px"><span>🎯</span><span><b>ยังพลาดบ่อย:</b> ${weak.map(w=>w[0]).join(' · ')} — ลองฟังอีกรอบ</span></div>`:''}</div>`,
  extra:`<div class="dock">${pass&&rec&&rec!==n?`<button class="pill press" data-go="pinlv" data-n="${rec}"><b>ไปด่าน ${rec} · ${prLv(rec).t}</b></button>`:pass&&!rec?`<button class="pill press" data-act="pinbook"><b>เริ่มบทที่ 1</b></button>`:`<button class="pill press" data-go="pinplay" data-n="${n}"><b>ลองอีกครั้ง</b></button>`}<button class="pill sm ghost press mt12" data-act="pinmap">กลับไปแผนที่ห้องพินอิน</button></div>`}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-act="pinbook"],[data-act="pinmap"]');if(!t)return;
 if(t.dataset.act==='pinbook')mountRoot('book');else{try{replace('pinroom')}catch(_){push('pinroom')}}},true);
/* ----- ทางเข้า: การ์ดหน้าแรก (คนเริ่มจากศูนย์) + แถวในรายการบท ----- */
const prFromZero=()=>curLv()===1&&(S.parts||[]).length<2&&prDoneN()<12;
function pinHomeCard(){if(!prFromZero())return '';const done=prDoneN(),rec=prRec()||1;const l=prLv(rec);
 return `<div class="pr-hc fade-in"><div class="top"><div class="pm">${prImg('extra-listening-headphones','','student')}</div><div><span class="pr-draft" style="background:#FBE9E4;color:#A3281A;border-color:#F1D5CB">สำหรับคนที่เริ่มจากศูนย์</span><b class="t" style="margin-top:4px">ห้องพินอิน</b><small>เรียนอ่านพินอินก่อนเริ่มบท: ต้น + ท้าย + เสียง · 12 ด่านสั้น ๆ</small></div></div>
  <div class="bl"><span class="pr-tile ini">b</span><span class="plus" style="color:#B7AA9D">+</span><span class="pr-tile fin">a</span><span style="color:#B7AA9D">→</span><span class="pys" style="font-size:22px;font-weight:700">${pyHtml('bā')}</span><span class="zh" style="font-size:22px">八</span></div>
  <button class="pill go press" data-go="pinlv" data-n="${rec}"><b>${done?'ไปต่อด่าน '+rec+' · '+l.t:'เริ่มด่านที่ 1 · พินอินคืออะไร'}</b><small>${l.min} นาที${done?' · เรียนแล้ว '+done+'/12':''}</small></button>
  <button class="pill sm ghost press mt12" data-go="pinroom">ดูแผนที่ 12 ด่าน</button></div>`}
function pinBookRow(){const d=prDoneN();return `<div class="group" style="margin-top:12px">${ROW('#FBE9E4','🔤','ด่าน 0 · ห้องพินอิน',d>=12?'เรียนครบ 12 ด่านแล้ว':'เรียนอ่านพินอินก่อนบทที่ 1 · '+d+'/12 ด่าน',undefined,'data-go="pinroom"')}</div>`}

Object.assign(window.GOX=window.GOX||{},{
 pinroom(){push('pinroom',{})},
 pinlv(el){const p={n:+el.dataset.n||1};if(stack[stack.length-1]&&stack[stack.length-1].name==='pinres')replace('pinlv',p);else push('pinlv',p)},
 pinplay(el){const p={n:+el.dataset.n||1};if(stack[stack.length-1]&&stack[stack.length-1].name==='pinres')replace('pinplay',p);else push('pinplay',p)},
 lvzero_pin(){push('pinlv',{n:1})}});
