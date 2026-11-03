/* ชั้นหนังสือ (แท็บบทเรียน) แบบ C2 v3 — ซ้งอี้อนุมัติ 3 พ.ย. 2026
   เล่ม 0 ก้าวแรก = ตอนเสียงก่อนเริ่มของระดับ 1 · เล่ม 1 = ระดับ 1 ตอน 1 ขึ้นไป · เล่ม 2–5 = ระดับ 2–5
   ข้อมูลบท/ความคืบหน้ามาจาก CHAPTERS / LESSONS / UNITS / unitDone() เดิมทั้งหมด ไม่เพิ่มหรือแก้ข้อมูลบทเรียน
   แถบบนสุดของแท็บ (lc-navb) คงเดิม */
(function(){
const BT=['ก้าวแรก','พื้นฐาน','ชีวิตประจำวัน','สื่อสารคล่อง','คุยหัวข้อกว้าง','อ่านเขียนจริงจัง'];
const BZ=[['第一步','dì-yī bù'],['基础','jīchǔ'],['日常生活','rìcháng shēnghuó'],['流利交流','liúlì jiāoliú'],['广泛话题','guǎngfàn huàtí'],['深度读写','shēndù dúxiě']];
const BD=['เริ่มจากเสียงและพินอิน แล้วฝึกทักทาย แนะนำตัว นับเลข ถามราคา และสั่งเครื่องดื่ม',
'ทักทาย แนะนำตัว นับเลข พูดเรื่องครอบครัว อาหาร การเดินทาง วันเวลา และอากาศด้วยประโยคสั้น',
'ทักทายตามเวลา ถามทาง สั่งอาหาร เล่างานอดิเรก บอกสีเสื้อผ้า เปรียบเทียบ และให้เหตุผลสั้น ๆ',
'สั่งเครื่องดื่ม พูดเรื่องสุขภาพ การเดินทาง ที่ทำงาน โรงเรียน และเทศกาล พร้อมบอกความรู้สึก',
'คุยเรื่องงาน กีฬา การท่องเที่ยว บ้านเช่า ข่าว และสังคม พร้อมแสดงความเห็นและเหตุผล',
'อ่านและเขียนเรื่องธุรกิจ เทคโนโลยี การแพทย์ การทูต และสำนวนจีน พร้อมฝึกปราศรัยและโต้วาที'];
const BS=['พินอินและคำแรก','ทักทาย นับเลข','เดินทาง ซื้อของ','สุขภาพ งาน เทศกาล','งาน ข่าว ความเห็น','ธุรกิจ สำนวนจีน'];
const SAY=[[['你好！','nǐ hǎo!','สวัสดี'],['这个多少钱？','zhège duōshao qián?','อันนี้เท่าไร'],['我想喝茶。','wǒ xiǎng hē chá.','ฉันอยากดื่มชา']],
[['你叫什么名字？','nǐ jiào shénme míngzi?','คุณชื่ออะไร'],['今天星期几？','jīntiān xīngqī jǐ?','วันนี้วันอะไร'],['你怎么去北京？','nǐ zěnme qù Běijīng?','คุณไปปักกิ่งอย่างไร']],
[['你要什么颜色？','nǐ yào shénme yánsè?','คุณเอาสีอะไร'],['机场离这儿远吗？','jīchǎng lí zhèr yuǎn ma?','สนามบินไกลจากที่นี่ไหม'],['我喜欢游泳和跑步。','wǒ xǐhuan yóuyǒng hé pǎobù.','ฉันชอบว่ายน้ำและวิ่ง']],
[['我头疼，我感冒了。','wǒ tóu téng, wǒ gǎnmào le.','ฉันปวดหัว ฉันเป็นหวัด'],['你喝茶还是喝咖啡？','nǐ hē chá háishi hē kāfēi?','คุณจะดื่มชาหรือกาแฟ'],['我打算去看电影。','wǒ dǎsuàn qù kàn diànyǐng.','ฉันวางแผนจะไปดูภาพยนตร์']],
[['可以刷卡吗？','kěyǐ shuākǎ ma?','รูดบัตรได้ไหม'],['你同意他的观点吗？','nǐ tóngyì tā de guāndiǎn ma?','คุณเห็นด้วยกับมุมมองของเขาไหม'],['附近有便利店吗？','fùjìn yǒu biànlìdiàn ma?','แถวนี้มีร้านสะดวกซื้อไหม']],
[['这个价格合理吗？','zhège jiàgé hélǐ ma?','ราคานี้สมเหตุสมผลไหม'],['不要紧，不必着急。','búyàojǐn, búbì zháojí.','ไม่เป็นไร ไม่จำเป็นต้องรีบ'],['他的结论有逻辑吗？','tā de jiélùn yǒu luójí ma?','ข้อสรุปของเขามีตรรกะไหม']]];
const CP=[['你好！','nǐ hǎo!','สวัสดี'],['我去学校。','wǒ qù xuéxiào.','ฉันไปโรงเรียน'],['我坐地铁去。','wǒ zuò dìtiě qù.','ฉันนั่งรถไฟใต้ดินไป'],['离这儿远吗？','lí zhèr yuǎn ma?','ไกลจากที่นี่ไหม'],['我喜欢大自然。','wǒ xǐhuan dàzìrán.','ฉันชอบธรรมชาติ'],['欢迎光临！','huānyíng guānglín!','ยินดีต้อนรับ']];
const SEAL=['#B8322A','#A8452B','#9E2F3A','#2F6B4F','#5B4A8C','#A0412D'];
const BC=[{c:'#E8892B',soft:'#FDF0E1',d:'#A85A12'},{c:'#2E9E5B',soft:'#E6F5EC',d:'#1C6B3C'},{c:'#159A9C',soft:'#E2F4F4',d:'#0D6668'},{c:'#2F6FDB',soft:'#E5EDFB',d:'#1B4796'},{c:'#7A4FD6',soft:'#EFE9FB',d:'#4E2C99'},{c:'#C8325E',soft:'#FBE8EE',d:'#8A1C3D'}];
const NB=6,ZF="'Noto Serif SC','Noto Serif CJK SC',serif";
const SY={lock:'<path d="M17 9h-1V7a4 4 0 00-8 0v2H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2zm-7-2a2 2 0 014 0v2h-4V7z" fill="C"/>',
check:'<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="C"/>',play:'<path d="M8 5v14l11-7z" fill="C"/>',
flag:'<path d="M5 3v18M5 4h11l-2 4 2 4H5" stroke="C" stroke-width="2" fill="C" stroke-linejoin="round"/>',
book:'<path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-6a3 3 0 00-1 .2V20a2 2 0 012-2h5z" fill="C"/>',
target:'<circle cx="12" cy="12" r="9" fill="none" stroke="C" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="C" stroke-width="2"/><circle cx="12" cy="12" r="1.8" fill="C"/>'};
const ic=(n,c,s)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" style="flex:none" aria-hidden="true">${SY[n].replace(/="C"/g,'="'+c+'"')}</svg>`;
const BACKSV='<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="#27211E" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const f1=x=>(+x).toFixed(1);
const ipad=()=>matchMedia('(min-width:700px) and (pointer:coarse)').matches;

/* ---------- ข้อมูลเล่มจากหลักสูตรจริง ---------- */
const bkLv=k=>k===0?1:k;
function bkUnits(k){const n=bkLv(k);return CHAPTERS.filter(c=>c.lv===n&&(k===0?c.ep===0:k===1?c.ep!==0:true)).map(c=>({ch:c,ls:LESSONS.filter(l=>l.chapter===c.id)})).filter(u=>u.ls.length)}
const lUnits=L=>UNITS.filter(u=>u.lesson===L.id);
const lDone=L=>{const us=lUnits(L);return us.length>0&&us.every(u=>unitDone(u.id))};
const lUid=L=>{const us=lUnits(L);const u=us.find(x=>!unitDone(x.id))||us[0];return u&&u.id};
function info(k){const U=bkUnits(k);let n=0,d=0,ci=-1,j=0,ud=0;const ws=new Set();
 U.forEach((u,i)=>{u.done=u.ls.map(lDone);u.nd=u.done.filter(Boolean).length;n+=u.ls.length;d+=u.nd;u.ls.forEach(L=>(L.words||[]).forEach(w=>ws.add(w.zh)));
  lUnits?0:0;if(ci<0&&u.nd<u.ls.length){ci=i;j=u.done.indexOf(false)}});
 U.forEach(u=>u.ls.forEach(L=>lUnits(L).forEach(x=>{if(unitDone(x.id))ud++})));
 return {k,U,n,d,ci,j,words:ws.size,pct:n?Math.round(100*d/n):0,complete:n>0&&d===n,fresh:d===0&&ud===0,any:ud>0}}
function curBook(){const lv=curLv();if(lv<=1){const a=info(0),b=info(1);return (a.complete||b.any)?1:0}return Math.min(5,lv)}
function bstate(k,cb){const I=info(k);if(I.complete)return 'done';if(k<=cb||I.any)return 'open';if(k>0&&info(k-1).complete)return 'open';return 'lock'}
const sub=k=>k===0?'เริ่มจากศูนย์':`ระดับ ${k} · HSK ${k}`;
const sub1=k=>k===0?'เริ่มจากศูนย์':`ระดับ ${k}`;
const meta=I=>`${I.U.length} หน่วย${I.words?` · ${I.words.toLocaleString('en-US')} คำ`:''}`;
const curL=I=>I.ci<0?null:I.U[I.ci].ls[I.j];
const dsc=k=>BD[k].split(' ').map(w=>`<span style="white-space:nowrap">${w}</span>`).join(' ');
const zht=(k,fs=17,pf=12)=>`<div class="bs-zht"><span style="font:600 ${fs}px ${ZF};color:#3A302A">${BZ[k][0]}</span><span style="font:500 ${pf}px Inter;color:var(--sub)">${BZ[k][1]}</span></div>`;
const says=(k,n=2)=>`<div class="bs-says">${SAY[k].slice(0,n).map(([z,p,t])=>`<div class="bs-say"><div class="z" lang="zh">${z}</div><div class="p">${p}</div><div class="t">${t}</div></div>`).join('')}</div>`;
const bar=(p,col,h=6)=>`<span class="bs-pbar" style="height:${h}px"><s style="width:${p}%;background:${col}"></s></span>`;
const pctline=(p,l)=>`<div class="bs-pl"><span style="flex:1">${bar(p,l.c,6)}</span><span class="n" style="color:${l.d}">${p}%</span></div>`;

/* ---------- ปก: ภาพ + ข้อความจริงซ้อนทับ (ตราชื่อเล่ม + กล่องคำพูด) ---------- */
function covov(k,w,badge){if(w<60)return '';let u=w/100;const full=w>=115;if(u>1.3)u=1.3+(u-1.3)*.55;const fs=Math.max(9.5,10.6*u);
 const seal=`<span class="bs-seal" lang="zh" style="left:${f1(8.2*u)}px;top:${f1(7*u)}px;font:700 ${f1(fs)}px/1.08 ${ZF};letter-spacing:${f1(.6*u)}px;background:${SEAL[k]};padding:${f1(3.4*u)}px ${f1(2.4*u)}px;border-radius:${f1(2.2*u)}px;box-shadow:0 0 0 ${f1(.9*u)}px rgba(255,248,238,.9),0 0 0 ${f1(1.5*u)}px ${SEAL[k]},0 ${f1(1.5*u)}px ${f1(4*u)}px rgba(0,0,0,.18)">${BZ[k][0]}</span>`;
 if(w<80)return seal;let [zh,py,th]=CP[k];const top=badge?40:7*u;let zf=Math.max(9.2,(full?9.2:9.0)*u);if(!full)zh=zh.replace(/。$/,'');
 const sealw=fs+2*2.4*u+2*1.5*u,avail=w-4.5*u-8.2*u-sealw-3*u,padx=(full?5:3.8)*u;const len=s=>[...s].length;
 if(len(zh)*zf+2*padx>avail)zh=zh.replace(/。$/,'');if(len(zh)*zf+2*padx>avail)zf=(avail-2*padx)/len(zh);
 let inner=`<div lang="zh" style="font:600 ${f1(zf)}px/1.25 ${ZF};color:#27211E">${zh}</div>`;
 if(full)inner+=`<div style="font:500 ${f1(5.9*u)}px/1.3 Inter;color:#6B5E55;margin-top:${f1(.6*u)}px">${py}</div><div style="font:500 ${f1(6.4*u)}px/1.35 'IBM Plex Sans Thai',sans-serif;color:#4A3F38">${th}</div>`;
 const tail=`<span class="bs-tail" style="right:${f1(14*u)}px;bottom:${f1(-3.2*u)}px;width:${f1(7*u)}px;height:${f1(7*u)}px;border-radius:0 0 ${f1(1.4*u)}px 0"></span>`;
 return seal+`<span class="bs-bub" style="right:${f1(4.5*u)}px;top:${f1(top)}px;border-radius:${f1(5.5*u)}px;padding:${f1((full?3.6:2.6)*u)}px ${f1(padx)}px ${f1((full?3.8:3)*u)}px;box-shadow:0 ${f1(1.5*u)}px ${f1(5*u)}px rgba(40,25,15,.16)">${tail}<span style="position:relative">${inner}</span></span>`}
function book(k,w,h,r=10,st){const mk=st==='lock'||st==='done';let o=covov(k,w,mk);
 if(st==='lock')o+=`<span class="bs-lk">${ic('lock',BC[k].d,14)}</span>`;else if(st==='done')o+=`<span class="bs-chk">${ic('check','#2E8B57',15)}</span>`;
 return `<div class="bs-bk" data-bk="${k}" style="width:${w}px;height:${h}px"><img class="bs-cov" src="assets/art/books/b${k}.webp" alt="" decoding="async" style="width:${w}px;height:${h}px;border-radius:${r}px"><span class="bs-sp" style="border-radius:${r}px 0 0 ${r}px"></span>${o}</div>`}

/* ---------- หน้าชั้นหนังสือ ---------- */
function ctaTxt(I){const L=curL(I);if(I.complete)return I.k<5?`เปิดเล่ม${BT[I.k+1]}`:'ทบทวนเล่มนี้';if(I.fresh)return 'เริ่มเรียน';return L&&L.kind==='gate'?'เรียนต่อ · ด่านทบทวน':`เรียนต่อ · บทที่ ${I.j+1}`}
function heroBottom(I,big){const l=BC[I.k];if(I.complete)return `<div class="bs-mt" style="margin-bottom:6px">เรียนจบแล้ว ${I.U.length} หน่วย</div>${pctline(100,l)}`;
 const u=I.U[I.ci];if(I.fresh)return `<div class="bs-mt" style="margin-bottom:2px">หน่วยแรก</div><div class="bs-b bs-clamp2" style="font-size:${big?18:15}px;line-height:1.35">${u.ch.th}</div>`;
 return `<div class="bs-mt bs-clamp2" style="margin-bottom:${big?8:6}px;white-space:normal${big?';font-size:14px':''}">หน่วย ${I.ci+1} ${u.ch.th}</div>${pctline(I.pct,l)}`}
const lab=I=>I.complete?'เรียนจบแล้ว':I.fresh?(I.k===0?'เล่มแรกของคุณ':'เล่มใหม่'):'กำลังเรียน';
function hero(I){const k=I.k,l=BC[k];
 return `<div class="bs-hero press" data-bs="open" data-k="${k}" role="button" aria-label="เปิดเล่ม${BT[k]}"><div style="display:flex;gap:16px">${book(k,124,166,10)}
<div style="flex:1;display:flex;flex-direction:column;min-width:0"><div class="bs-mt" style="color:${l.d};font-weight:700">${lab(I)}</div><div class="bs-b" style="font-size:21px;line-height:1.3">${BT[k]}</div>${zht(k)}<div class="bs-mt" style="margin-top:1px">${sub(k)} · ${I.U.length} หน่วย</div>
<div style="margin-top:auto">${heroBottom(I)}</div></div></div>
<div class="bs-hdesc"><div class="bs-clamp2" style="font-size:13.5px;line-height:1.5;color:#4A3F38">${dsc(k)}</div><div class="bs-mt" style="margin-top:4px">${I.n} บท${I.words?` · ${I.words.toLocaleString('en-US')} คำ`:''} · บทละประมาณ 5 นาที</div></div></div>`}
function rowitem(k,cb,w=104,h=139){const st=bstate(k,cb);
 const s=st==='done'?'<div class="bs-mt" style="font-size:12px;color:var(--ok);font-weight:700">เรียนจบแล้ว</div>':`<div class="bs-mt" style="font-size:12px">${sub1(k)}</div>`;
 return `<button class="bs-ri press" data-bs="book" data-k="${k}" style="width:${w}px" aria-label="${BT[k]}${st==='lock'?' ยังไม่เปิด':''}">${book(k,w,h,8,st)}<div class="bs-ttl">${BT[k]}</div>${s}<div class="bs-mt bs-short">${BS[k]}</div></button>`}
const soon=(st='')=>`<div class="bs-soon" style="${st}">${ic('book','#B5A99D',20)}ระดับ 6 ขึ้นไป กำลังจัดทำ</div>`;
function more(){const n=curLv(),L=levelBy(n),rv=reviewWords().length;
 return `<div class="sec">เพิ่มเติม</div><div class="group lc-more">${ROW('#FDF3E6','📝','ทบทวนตามรอบ',rv?rv+' คำถึงรอบทบทวน':'วันนี้ยังไม่มีคำค้าง',undefined,'data-go="review"')}
 ${ROW(L.bg,L.em,'เปลี่ยนระดับ',`ตอนนี้ ${L.name} · ${L.th} · ${LVSTAT(n)}`,undefined,'data-go="levels"')}
 ${ROW('#EAF1FB','🧭','ทดสอบวัดระดับ',S.placeRes?`ผลล่าสุด ≈ ${S.placeRes.est?'ระดับ '+S.placeRes.est:'ก่อนระดับ 1'} · ทำใหม่ได้`:'ไม่แน่ใจว่าควรเริ่มตรงไหน? ลอง 12–20 ข้อ',undefined,'data-go="placement"')}
 ${ROW('#E7F8EE','🎒','ห้องเรียนของฉัน',CLASSMATES.filter(cmUnlocked).length+'/'+CLASSMATES.length+' ตัวละคร',undefined,'data-go="classroom"')}</div>${DEMO}`}
function homeBody(){const cb=curBook(),I=info(cb),others=[0,1,2,3,4,5].filter(x=>x!==cb),hd=cb===0?'เล่มถัดไป':'เล่มอื่นในชุด';
 if(ipad()){const k=cb,l=BC[k];
  return `<div class="bs-ip"><div class="bs-hero bs-hero-ip press" data-bs="open" data-k="${k}" role="button" aria-label="เปิดเล่ม${BT[k]}">${book(k,204,272,12)}
<div style="flex:1;display:flex;flex-direction:column;min-width:0;padding-top:4px"><div class="bs-mt" style="color:${l.d};font-weight:700;font-size:14px">${lab(I)}</div><div class="bs-b" style="font-size:32px;line-height:1.3">${BT[k]}</div>${zht(k,22,14)}<div class="bs-mt" style="font-size:14px;margin-top:2px">${sub(k)} · ${meta(I)} · ${I.n} บท</div>
<div style="font-size:15px;line-height:1.55;color:#4A3F38;margin-top:12px">${dsc(k)}</div>
<div style="margin-top:auto">${heroBottom(I,true)}<button class="bs-cta press" data-bs="cont" data-k="${k}" style="margin-top:18px;height:50px;font-size:16px;width:100%">${ic('play','#fff',16)}${ctaTxt(I)}</button></div></div></div>
<div class="bs-hrow" style="margin-top:44px"><h2 class="bs-sec" style="font-size:17px">${hd}</h2><button class="bs-mt bs-all press" data-bs="all" style="font-size:14px">ดูทั้งหมด</button></div>
<div class="bs-iprow">${others.map(x=>rowitem(x,cb,132,176)).join('')}</div>
${soon('margin-top:40px')}
<div style="margin-top:36px"><h2 class="bs-sec" style="font-size:17px">เมื่อจบเล่ม${BT[k]} คุณจะพูดได้ เช่น</h2><div style="margin-top:14px">${says(k,3)}</div></div>
<div class="bs-more">${more()}</div></div>`}
 return `<div style="padding:6px 20px 0">${hero(I)}<button class="bs-cta press" data-bs="cont" data-k="${cb}" style="margin-top:14px">${ic('play','#fff',15)}${ctaTxt(I)}</button>
<div class="bs-hrow" style="margin-top:24px"><h2 class="bs-sec">${hd}</h2><button class="bs-mt bs-all press" data-bs="all">ดูทั้งหมด</button></div></div>
<div class="bs-row" role="list">${others.map(x=>rowitem(x,cb)).join('')}</div>
<div style="padding:22px 20px 0">${soon()}</div><div class="bs-more" style="padding:0 0 0">${more()}</div>`}

const pathNav=()=>{const cur=nextUnit();const hello=!S.parts.length?'เริ่มกันเลย':cur?'ไปต่อกันเลย':'เรียนครบแล้ว';const ch=chips().replace(lvBadge(),'');
 return `<header class="nav lc-navb"><div class="nav-l lc-hello">${M('wave')}<span>${hello}</span></div><div class="nav-t">บทเรียน</div><div class="nav-r">${ch}</div></header>`};
SC.path=()=>({title:'บทเรียน',nav:pathNav(),body:`<h1 class="sr-only">บทเรียน</h1>${dvCard()}<div class="bsf">${homeBody()}</div>`,
 mount(el){el.classList.add('bs-root');checkDone()}});

/* จบเล่มครั้งแรก → หน้าจบเล่ม (ครั้งเดียวต่อเล่ม · เล่มที่จบไว้ก่อนมีชั้นหนังสือไม่แสดงย้อนหลัง) */
function checkDone(){try{S.tipSeen=S.tipSeen||{};const t=S.tipSeen;let ch=false;
 if(!t.bsInit){for(let k=0;k<NB;k++)if(info(k).complete)t['bsDone'+k]=1;t.bsInit=1;save();return}
 for(let k=0;k<NB;k++){if(!t['bsDone'+k]&&info(k).complete){t['bsDone'+k]=1;ch=true;save();setTimeout(()=>{if(stack.length===1&&curTab==='book'&&!document.querySelector('#sheetLayer.on'))push('shelfdone',{k})},380);break}}}catch(e){console.warn(e)}}

/* ---------- เปิดเล่ม ---------- */
function lessonRows(k,u){const l=BC[k];const first=u.done.indexOf(false);
 return u.ls.map((L,i)=>{const gate=L.kind==='gate',dn=u.done[i],cur=i===first;let d,s='',r='';
  if(dn)d=`<span class="d" style="background:${l.soft}">${ic('check',l.c,14)}</span>`;
  else if(cur){d=`<span class="d" style="background:var(--red)">${ic('play','#fff',12)}</span>`;s='font-weight:700;color:var(--red)'}
  else if(gate){d=`<span class="d" style="background:#F3EDE4">${ic('flag','#A99C90',13)}</span>`;s='color:#6E625A'}
  else{d=`<span class="d" style="background:#F3EDE4;color:#A99C90">${i+1}</span>`;s='color:#8C8077'}
  if(gate&&!dn)r='<span class="r">ไม่จับเวลา</span>';
  return `<button class="bs-lrow press" data-bs="lesson" data-u="${lUid(L)}" style="${s}">${d}<span class="nm">${gate?L.th:`บทที่ ${i+1} ${L.th}`}</span>${r}</button>`}).join('')}
function unitsList(I){const k=I.k,l=BC[k],U=I.U,ci=I.ci<0?U.length:I.ci;let out='',start=0;
 const drow=(u,i)=>`<button class="bs-urow press" data-bs="uexp" data-i="${i}"><span class="no" style="background:${l.soft}">${ic('check',l.c,16)}</span><b>หน่วย ${i+1} ${u.ch.th}</b><span class="c">${u.nd}/${u.ls.length} บท</span></button><div class="bs-uls" data-ul="${i}" hidden>${lessonRows(k,u)}</div>`;
 if(ci>4&&ci<U.length){out+=`<button class="bs-urow press" data-bs="uall"><span class="no" style="background:${l.soft}">${ic('check',l.c,16)}</span><b>เรียนจบแล้ว ${ci-1} หน่วย</b><span class="c">ดูทั้งหมด</span></button><div class="bs-uhid" hidden>${U.slice(0,ci-1).map(drow).join('')}</div>`;start=ci-1}
 for(let i=start;i<U.length;i++){const u=U[i],n=u.ls.length;
  if(i<ci||u.nd===n)out+=drow(u,i);
  else if(i===ci){const fi=u.done.indexOf(false),L=u.ls[fi],ng=u.ls.filter(x=>x.kind!=='gate').length,hg=u.ls.some(x=>x.kind==='gate');
   const btn=L.kind==='gate'?'เริ่มด่านทบทวน':fi===0&&!u.nd?'เริ่มบทที่ 1':`เรียนบทที่ ${fi+1} ต่อ`;
   out+=`<div class="bs-ucard" style="border-color:${l.c}"><div class="bs-uch"><span class="n" style="background:${l.c}">${i+1}</span><div style="flex:1;min-width:0"><div class="bs-t12 bs-b" style="color:${l.d}">กำลังเรียน · ${ng} บท${hg?' และด่านทบทวน':''}</div><div class="bs-b" style="font-size:16px;line-height:1.35">หน่วย ${i+1} ${u.ch.th}</div></div><span class="bs-t12 bs-b" style="color:${l.d};font-family:Inter;padding-top:2px">${u.nd}/${n}</span></div>
<div style="margin-top:6px">${lessonRows(k,u)}</div><button class="bs-cta press" data-bs="cont" data-k="${k}" style="margin-top:8px;width:100%">${ic('play','#fff',15)}${btn}</button></div>`}
  else out+=`<button class="bs-urow press bs-ulock" data-bs="ulock"><span class="no" style="background:#F3EDE4">${ic('lock','#B5A99D',13)}</span><b>หน่วย ${i+1} ${u.ch.th}</b><span class="c" style="color:#B0A498">${u.nd?u.nd+'/':''}${n} บท</span></button>`}
 const nx=k<5?`เปิดเล่ม${BT[k+1]}`:'ปิดท้ายทั้งชุด';
 out+=`<div class="bs-end"><span class="no">${ic('target','#A99C90',16)}</span><div style="flex:1"><div class="bs-b" style="font-size:14.5px;color:#6E625A">ด่านปิดเล่ม</div><div class="bs-mt" style="white-space:normal">ทบทวนรวมทั้งเล่ม ไม่จับเวลา ผ่านแล้ว${nx}</div></div></div>`;
 return out}
SC.shelfbook=({k})=>{const I=info(k),l=BC[k];
 return {title:'',nav:'',noRefresh:false,
 extra:`<div class="bs-ohdw"><button class="bs-back press" data-act="back" aria-label="กลับ">${BACKSV}</button><div class="bs-ohd">${book(k,96,128,8)}
<div style="flex:1;min-width:0"><div class="bs-mt" style="color:${l.d};font-weight:700">${sub(k)}</div><div class="bs-b" style="font-size:22px;line-height:1.3">${BT[k]}</div>${zht(k)}<div class="bs-mt">${meta(I)} · ${I.n} บท</div><div style="margin-top:8px">${pctline(I.pct,l)}</div></div></div><div class="bs-odiv"></div></div><div class="bs-fade"></div>`,
 body:`<div class="bsf bs-col"><div class="bs-intro"><div class="bs-clamp2" style="font-size:13.5px;line-height:1.5;color:#4A3F38">${dsc(k)}</div><div class="bs-mt" style="margin:9px 0 6px;font-weight:700;color:${l.d}">เมื่อจบเล่มนี้ คุณจะพูดได้ เช่น</div>${says(k)}</div>${unitsList(I)}</div>`,
 mount(el){el.classList.add('bs-open');el.style.setProperty('--bs-soft',l.soft)}}};

/* ---------- หนังสือทั้งชุด ---------- */
SC.shelfall=()=>{const cb=curBook();let nd=0;const cells=[0,1,2,3,4,5].map(k=>{const st=bstate(k,cb),I=info(k);if(st==='done')nd++;
  const s=st==='done'?'<div class="bs-mt" style="color:var(--ok);font-weight:700">เรียนจบแล้ว</div>':k===cb?`<div style="margin-top:6px">${pctline(I.pct,BC[k])}</div>`:`<div class="bs-mt">${I.U.length} หน่วย</div>`;
  return `<button class="bs-ri press" data-bs="book" data-k="${k}" style="width:104px">${book(k,104,139,8,st)}<div class="bs-ttl">${BT[k]}</div><div class="bs-mt" style="font-size:12px">${sub1(k)}</div>${s}</button>`}).join('');
 return {title:'',nav:'',extra:`<div class="bs-allh"><button class="bs-back press" data-act="back" aria-label="กลับ">${BACKSV}</button><h1>หนังสือทั้งชุด</h1></div>`,
 body:`<div class="bsf bs-col" style="padding:0 20px"><div class="bs-mt" style="margin-bottom:14px;white-space:normal">เรียนจบแล้ว ${nd} จาก 6 เล่ม · เปิดเล่มถัดไปได้เมื่อเรียนจบเล่มก่อนหน้า</div><div class="bs-grid">${cells}</div>${soon('margin-top:24px')}</div>`,
 mount(el){el.classList.add('bs-allp')}}};

/* ---------- แผ่นเล่มที่ยังล็อก ---------- */
function lockSheet(k){const cb=curBook(),l=BC[k],p=k-1,P=BC[p],I=info(k),C=info(cb);
 const way1=p===cb?`เหลืออีก ${C.n-C.d} บทในเล่ม${BT[p]}`:`ขณะนี้คุณเรียนอยู่ที่${cb?' ระดับ '+cb:'เริ่มจากศูนย์'} ${BT[cb]}`;
 const prev=sub1(p)+' '+BT[p];
 openSheet(`<div class="bsf bs-sh"><div style="display:flex;gap:14px;align-items:flex-start">${book(k,66,88,7)}<div style="flex:1;padding-top:4px"><div class="bs-mt" style="color:${l.d};font-weight:700">${sub(k)} · ${I.U.length} หน่วย</div><div class="bs-b" style="font-size:20px;line-height:1.3">${BT[k]}</div>${zht(k,15,11.5)}<div class="bs-mt" style="margin-top:2px">เล่มนี้ยังไม่เปิดให้เรียน</div></div></div>
<p class="bs-shp">เล่มนี้จะเปิดเมื่อคุณเรียนจบ${prev} หรือผ่านแบบทดสอบวัดระดับ เลือกได้ทั้งสองวิธี</p>
<div class="bs-way"><span class="n" style="background:${P.soft}">${ic('book',P.c,17)}</span><div style="flex:1"><div class="bs-b" style="font-size:14.5px">เรียนตามลำดับจนจบ${prev}</div><div class="bs-mt" style="white-space:normal">${way1}</div></div></div>
<div class="bs-way"><span class="n" style="background:#F3EDE4">${ic('target','#8C7B6E',17)}</span><div style="flex:1"><div class="bs-b" style="font-size:14.5px">ทำแบบทดสอบวัดระดับ</div><div class="bs-mt" style="white-space:normal">ประมาณ 12–20 ข้อ หากผ่าน เล่มนี้จะเปิดทันที ความคืบหน้าเดิมไม่หายไป</div></div></div>
<button class="bs-cta press" id="bsCont" style="margin-top:12px;width:100%">${ic('play','#fff',15)}เรียนเล่มปัจจุบันต่อ</button><button class="bs-cta2 press" id="bsPlace" style="margin-top:10px;width:100%">ทำแบบทดสอบวัดระดับ</button></div>`,
 {onMount:sh=>{sh.querySelector('#bsCont').onclick=()=>{closeSheet();setTimeout(()=>start(cb),160)};sh.querySelector('#bsPlace').onclick=()=>{closeSheet();setTimeout(()=>push('placeintro'),160)}}})}

/* ---------- จบเล่ม ---------- */
SC.shelfdone=({k})=>{const I=info(k),l=BC[k],nx=k<5?k+1:null,n=nx!=null?BC[nx]:null,N=nx!=null?info(nx):null;
 return {title:'',nav:pathNav(),noRefresh:true,
 body:`<div class="bsf bs-col bs-done"><div style="padding:22px 24px 0;text-align:center"><div style="position:relative;width:150px;margin:0 auto">${book(k,150,200,12)}<span class="bs-dchk">${ic('check','#2E8B57',24)}</span></div>
<div class="bs-mt" style="margin-top:22px;color:${l.d};font-weight:700">เรียนจบเล่มแล้ว</div><div class="bs-b" style="font-size:24px;line-height:1.3">${BT[k]}</div><div style="display:flex;justify-content:center">${zht(k)}</div>
<div class="bs-mt" style="margin-top:4px">${I.U.length} หน่วย · ${I.n} บท${I.words?` · ${I.words.toLocaleString('en-US')} คำ`:''}</div>
<p style="font-size:14px;line-height:1.55;color:#4A3F38;margin:12px 6px 0">คำที่เรียนจากเล่มนี้ยังอยู่ในคลังคำ และจะกลับมาให้ทบทวนตามรอบ</p></div>
${nx!=null?`<div class="bs-nextc">${book(nx,54,72,6)}<div style="flex:1"><div class="bs-mt" style="color:${n.d};font-weight:700">เล่มถัดไปเปิดแล้ว</div><div class="bs-b" style="font-size:16px;line-height:1.3">${BT[nx]}</div><div class="bs-mt">${sub(nx)} · ${N.U.length} หน่วย</div></div></div>`:''}
<div style="padding:18px 20px 0">${nx!=null?`<button class="bs-cta press" data-bs="opennext" data-k="${nx}" style="width:100%">${ic('play','#fff',15)}เปิดเล่ม${BT[nx]}</button>`:''}<button class="bs-cta2 press" data-act="back" style="margin-top:10px;width:100%">กลับไปที่ชั้นหนังสือ</button></div></div>`,
 mount(el){el.classList.add('bs-donep');el.style.setProperty('--bs-soft',l.soft)}}};

/* ---------- การกระทำ ---------- */
function start(k){const I=info(k);let L=curL(I);if(!L){if(k<5&&I.complete)return openNext(k+1);L=I.U[0]&&I.U[0].ls[0]}if(!L)return;const uid=lUid(L);if(!uid)return;
 const lv=bkLv(k);if(lv!==curLv())setLevel(lv,undefined,true);push('lesson',{uid})}
function openNext(k){const lv=bkLv(k);if(lv!==curLv())setLevel(lv,undefined,true);mountRoot('book',false);setTimeout(()=>openBook(k,null),60)}
function openBook(k,src){const s=push('shelfbook',{k});if(!s||!src||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 try{const el=s.el,prev=stack[stack.length-2],fr=$('#frame').getBoundingClientRect();const a=src.getBoundingClientRect();
  el.style.transition='none';el.style.transform='none';if(prev){prev.el.style.transition='none';prev.el.style.transform='none'}
  const tgt=el.querySelector('.bs-ohd .bs-bk');const b=tgt.getBoundingClientRect();
  const fly=src.cloneNode(true);fly.classList.add('bs-fly');fly.style.left=(a.left-fr.left)+'px';fly.style.top=(a.top-fr.top)+'px';$('#frame').appendChild(fly);tgt.style.visibility='hidden';
  const sx=b.width/a.width,E='cubic-bezier(.4,0,.2,1)';
  anim(el,[{opacity:0},{opacity:1}],{duration:520,easing:'ease-out',fill:'none',delay:60});
  if(prev)anim(prev.el,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(-6px)'}],{duration:480,easing:E,fill:'none'});
  const an=anim(fly,[{transform:'translate(0,0) scale(1)'},{transform:`translate(${b.left-a.left}px,${b.top-a.top}px) scale(${sx})`}],{duration:620,easing:E,fill:'forwards'});
  const end=()=>{fly.remove();tgt.style.visibility='';if(prev){prev.el.style.transform='';void prev.el.offsetWidth;prev.el.style.transition=''}el.style.transition=''};
  an.onfinish=end;setTimeout(()=>{if(fly.isConnected)end()},900)}catch(e){console.warn(e)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-bs]');if(!t||!$('#frame').contains(t))return;const k=+t.dataset.k,a=t.dataset.bs;try{vib(6)}catch(_){}
 switch(a){
  case 'open':return openBook(k,t.querySelector('.bs-bk'));
  case 'book':{const cb=curBook();if(bstate(k,cb)==='lock')return lockSheet(k);return openBook(k,t.querySelector('.bs-bk'))}
  case 'cont':return start(k);
  case 'all':return push('shelfall');
  case 'lesson':if(t.dataset.u)return unitSheet(t.dataset.u);return;
  case 'uexp':{const p=t.parentNode.querySelector(`[data-ul="${t.dataset.i}"]`);if(p)p.hidden=!p.hidden;return}
  case 'uall':{const p=t.nextElementSibling;if(p){p.hidden=false;t.remove()}return}
  case 'ulock':return toast('เรียนหน่วยก่อนหน้าให้จบก่อน');
  case 'opennext':return openNext(k);
 }});
/* หมุนจอ/เปลี่ยนขนาดข้ามโหมดแท็บเล็ต: วาดชั้นหนังสือใหม่ */
try{const mq=matchMedia('(min-width:700px) and (pointer:coarse)');const f=()=>{if(stack[0]&&stack[0].name==='path'&&stack.length===1)refresh()};mq.addEventListener?mq.addEventListener('change',f):mq.addListener(f)}catch(e){}
window.SHELF={info,curBook,bstate,bkUnits};
})();
