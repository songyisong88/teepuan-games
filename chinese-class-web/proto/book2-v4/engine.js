/* สำเนาสำหรับเล่ม 2 (proto/book2-v4) · เปลี่ยนเฉพาะชื่อหน้าและป้ายทบทวน · เครื่องมือบทเรียนเล่ม 1 (v4 · บทเรียนแบบสถานการณ์) · สำเนาจากเล่ม 0 แยกไว้เฉพาะ proto/book1-v4 · ขยายจากวิธีสอนใน L02 (mine.html) · ใช้ CSS/ส่วนประกอบเดิมของแอป */
const B0T=[null,'ภาษาจีนคืออะไร','วรรณยุกต์ 4 เสียง','สระ a o e','สระ i u ü','b p m f · d t n l','g k h · j q x','zh ch sh r','z c s','ต่อเสียงเป็นพยางค์','สระผสม','เสียงขึ้นจมูก -n / -ng','กติกาพิเศษ','อ่านพยางค์ที่ไม่เคยเห็น'];
const ART=zh=>`../../assets/art/word/${zh}.webp`;
/* คำแปลไทยใต้ภาพ (ซ้งอี้ขอ 4 พ.ย. 2026) · ดึงจากคำที่ประกาศด้วย w() + คำที่ใช้ภาพอย่างเดียว */
const THL={'八':'แปด','饿':'หิว','兔子':'กระต่าย','女孩':'เด็กผู้หญิง','大象':'ช้าง','太阳':'พระอาทิตย์','西瓜':'แตงโม','鸡':'ไก่','十':'สิบ','四':'สี่','牛':'วัว','鸟':'นก','妈妈':'แม่','马':'ม้า'};
const w=(zh,py,th,o={})=>{const x=Object.assign({zh,py,th,img:ART(zh),k:'w:'+zh},o);if(th&&!THL[x.img])THL[x.img]=th;return x};
const thOf=x=>{if(!x)return '';if(typeof x==='object'&&x.th)return x.th;const u=typeof x==='string'?x:x.img;if(!u)return '';if(THL[u])return THL[u];const m=decodeURIComponent(u).match(/\/word\/([^/]+)\.webp$/);return m&&THL[m[1]]||''};
const thLab=x=>{const t=thOf(x);return t?`<span class="v4lab">${t}</span>`:''};
const MIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>`;
const pic=(x,c='mpic',lab)=>{const d=`<div class="${c}"><img src="${x.img||x}" alt="${thOf(x)}" draggable="false"></div>`;return lab&&thOf(x)?`<div class="v4fig">${d}${thLab(x)}</div>`:d};
const tag=(n,s)=>`<div class="center"><div class="cap">${n?n+' · ':''}${s}</div></div>`;
const QZ=(i,n)=>`ทดสอบท้ายบท ${i}/${n} · ไม่มีตัวช่วยภาษาไทย`;
const TITLES=[null,'ทักทาย ขอโทษ บอกลา','ฉัน คุณ เขา เธอ','ชื่ออะไร','ยินดีที่ได้รู้จัก','ทบทวนหน่วยที่ 1','นับ 0 ถึง 10','อายุเท่าไร มีกี่คน','ราคาเท่าไร','ทบทวนหน่วยที่ 2','ครอบครัวของฉัน','ในบ้านมีอะไร','เชิญนั่ง ดื่มอะไรดี','ทบทวนหน่วยที่ 3','กินอะไรดี','ชอบไหม อร่อยไหม','ทบทวนหน่วยที่ 4','ไปไหน อยู่ไหน','ไปอย่างไร','ซื้อเสื้อผ้า','ทบทวนหน่วยที่ 5','วันนี้ พรุ่งนี้ อากาศ','วันที่เท่าไร กี่โมง','ทบทวนหน่วยที่ 6','หนึ่งวันของฉัน','เรียนภาษาจีน','ทบทวนหน่วยที่ 7'];
const RV=n=>typeof n==='string'?n:`ทบทวนเล่ม 0 · บท 0-${n} ${B0T[n]}`;
let G=null;
const quiet=()=>TOPW.__quiet||SHOT!=null;
const here=st=>+document.body.dataset.step===E.i&&$('#stage')===st;
async function seq(keys,st,gap=280){const i0=E.i;for(const k of keys){if(E.i!==i0)return;const ms=play(k);animAid(st,ms,k);await wait(ms+gap)}}

/* ---------- ภาพช่วย: รูปปาก · กระดาษกับลม · จมูก · สระเลื่อน · ส่วนประกอบพยางค์ ---------- */
const MO={a:{w:34,h:26,tt:1,tg:'low',lab:'อ้าปากกว้าง'},o:{w:20,h:20,rd:1,tg:'low',lab:'ห่อปากกลม'},e:{w:30,h:12,tt:1,tg:'mid',lab:'อ้าปากครึ่งเดียว'},
 i:{w:42,h:7,tt:1,bt:1,lab:'ฉีกปากยิ้ม'},u:{w:11,h:10,rd:2,lab:'ห่อปากยื่น'},v:{w:11,h:9,rd:2,tg:'hi',lab:'อี + ห่อปาก'},
 m:{w:40,h:0,lab:'ปิดปาก'},f:{w:34,h:9,tt:1,bite:1,lab:'ฟันบนแตะริมฝีปากล่าง'},tip:{w:30,h:12,tt:1,tg:'tip',lab:'ปลายลิ้นแตะหลังฟันบน'},
 back:{w:28,h:16,tt:1,tg:'back',lab:'โคนลิ้นยกขึ้น'},smile:{w:40,h:8,tt:1,bt:1,tg:'flat',lab:'ยิ้ม ลิ้นแตะฟันล่าง'},
 curl:{w:24,h:14,rd:1,tt:1,tg:'curl',lab:'ม้วนปลายลิ้นขึ้น'},flat:{w:38,h:5,tt:1,bt:1,lab:'ฟันชิด ลิ้นแบน'}};
let MID=0;
function mouth(m,cls='mouth',size=120){const o=MO[m],id='mc'+(++MID),c=60,cy=45;
 if(!o.h)return `<svg class="${cls}" viewBox="0 0 120 90" width="${size}"><ellipse cx="60" cy="45" rx="46" ry="13" fill="#E79A93"/><path d="M18 45 Q60 50 102 45" stroke="#9C4A46" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
 const lip=o.rd===2?9:o.rd?7:5;
 let s=`<svg class="${cls}" viewBox="0 0 120 90" width="${size}"><defs><clipPath id="${id}"><ellipse cx="${c}" cy="${cy}" rx="${o.w}" ry="${o.h}"/></clipPath></defs>
 <ellipse cx="${c}" cy="${cy}" rx="${o.w+lip}" ry="${o.h+lip}" fill="#E79A93"/><ellipse cx="${c}" cy="${cy}" rx="${o.w}" ry="${o.h}" fill="#6B2F2F"/><g clip-path="url(#${id})">`;
 const tg=o.tg;
 if(tg==='low')s+=`<ellipse cx="${c}" cy="${cy+o.h*.72}" rx="${o.w*.72}" ry="${o.h*.42}" fill="#E0707A"/>`;
 if(tg==='mid')s+=`<ellipse cx="${c}" cy="${cy+o.h*.55}" rx="${o.w*.75}" ry="${o.h*.55}" fill="#E0707A"/>`;
 if(tg==='hi')s+=`<ellipse cx="${c}" cy="${cy+o.h*.25}" rx="${o.w*.8}" ry="${o.h*.6}" fill="#E0707A"/>`;
 if(tg==='tip')s+=`<path d="M${c-o.w} ${cy+o.h} Q${c-o.w*.5} ${cy-o.h*.1} ${c} ${cy-o.h*.55} Q${c+o.w*.5} ${cy-o.h*.1} ${c+o.w} ${cy+o.h}Z" fill="#E0707A"/>`;
 if(tg==='back')s+=`<ellipse cx="${c}" cy="${cy+o.h*.8}" rx="${o.w*.8}" ry="${o.h*.35}" fill="#E0707A"/><ellipse cx="${c}" cy="${cy-o.h*.05}" rx="${o.w*.45}" ry="${o.h*.35}" fill="#B9545F"/>`;
 if(tg==='curl')s+=`<ellipse cx="${c}" cy="${cy+o.h*.75}" rx="${o.w*.8}" ry="${o.h*.45}" fill="#E0707A"/><path d="M${c-5} ${cy+o.h*.4} Q${c} ${cy-o.h*.6} ${c+6} ${cy-o.h*.1}" stroke="#F08A93" stroke-width="5" fill="none" stroke-linecap="round"/>`;
 if(tg==='flat')s+=`<ellipse cx="${c}" cy="${cy+o.h*.9}" rx="${o.w*.8}" ry="${o.h*.5}" fill="#E0707A"/>`;
 if(o.tt)s+=`<rect x="${c-o.w}" y="${cy-o.h-1}" width="${o.w*2}" height="${Math.max(4,Math.min(9,o.h*.55))}" fill="#fff"/>`;
 if(o.bt)s+=`<rect x="${c-o.w}" y="${cy+o.h-Math.max(3,Math.min(7,o.h*.45))+1}" width="${o.w*2}" height="${Math.max(3,Math.min(7,o.h*.45))}" fill="#F4EFEA"/>`;
 s+=`</g>`;
 if(o.bite)s+=`<rect x="${c-o.w*.6}" y="${cy-o.h+1}" width="${o.w*1.2}" height="${o.h+6}" rx="2" fill="#fff" stroke="#E5DDD5"/>`;
 if(o.rd===2)s+=`<path d="M${c-o.w-lip-10} ${cy} h-8 M${c+o.w+lip+10} ${cy} h8" stroke="#C9BBAA" stroke-width="3" stroke-linecap="round"/>`;
 return s+`</svg>`}
function airSvg(p,still){return `<svg class="air ${p?'puff':'nopuff'} ${still&&p?'still':''} big" viewBox="0 0 160 100">
 <ellipse cx="30" cy="52" rx="12" ry="8" fill="#E79A93"/><path d="M20 52 Q30 55 40 52" stroke="#9C4A46" stroke-width="2" fill="none"/>
 <g class="wind" stroke="#9CB8DA" stroke-width="3" fill="none" stroke-linecap="round"><path d="M50 44 q14 -5 28 0"/><path d="M52 54 q16 -4 32 0"/><path d="M50 64 q14 4 28 0"/></g>
 <line x1="92" y1="14" x2="132" y2="14" stroke="#B9A58A" stroke-width="5" stroke-linecap="round"/>
 <rect class="strip" x="104" y="15" width="16" height="66" rx="3" fill="#FFF6D8" stroke="#D9C9A8" stroke-width="1.5"/></svg>`}
function nasSvg(k){const n=k==='n';return `<svg class="nas big" viewBox="0 0 160 110">
 <path d="M14 58 Q70 18 146 56" stroke="#C9BBAA" stroke-width="6" fill="none" stroke-linecap="round"/>
 <path class="flow" d="M138 50 Q140 30 120 18 L40 14" stroke="#3A64A8" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="7 6"/><path class="flow" d="M46 8 L36 14 L46 20" stroke="#3A64A8" stroke-width="4" fill="none" stroke-linecap="round"/>
 <path d="${n?'M10 98 Q16 62 30 58 Q50 60 80 78 Q120 92 150 96':'M10 98 Q60 96 96 66 Q118 50 136 56 Q146 70 150 96'}" fill="#E0707A"/>
 <circle cx="${n?30:126}" cy="${n?55:52}" r="7" fill="none" stroke="#C8102E" stroke-width="3"/></svg>`}
function glide(parts){return `<div class="glide">${parts.map((p,i)=>`${i?'<i>→</i>':''}<b data-g="${i}">${p}</b>`).join('')}</div>`}
function partsH(ps){return `<div class="parts">${ps.map((p,i)=>`${i?'<i>+</i>':''}<span>${typeof p==='number'?(p?contour(p):'<small style="font-size:14px">เบา</small>'):p}</span>`).join('')}</div>`}
function aidHtml(a){if(!a)return '';let h='',cap=a.cap||'';
 if(a.tone){h=`<div class="l1tbig tc${a.tone}" style="width:200px;height:110px;margin:0 auto">${contour(a.tone,{hide:1,dot:1,guide:1})}</div>`;cap=cap||`เสียง ${a.tone} · ${TONE[a.tone].ds}`}
 if(a.mouth){h=mouth(a.mouth,'mouth',150);cap=cap||MO[a.mouth].lab}
 if(a.air!=null){h=airSvg(a.air,a.still).replace('big','mth2');cap=cap||(a.air?'มีลมพุ่งออกมา กระดาษจะปลิว':'ไม่มีลม กระดาษนิ่ง')}
 if(a.nasal){h=nasSvg(a.nasal).replace('big','mth2');cap=cap||(a.nasal==='n'?'ปลายลิ้นแตะหลังฟันบน แล้วปล่อยเสียงออกจมูก':'โคนลิ้นยกขึ้นแตะด้านใน แล้วปล่อยเสียงออกจมูก')}
 if(a.glide)h=glide(a.glide);
 if(a.parts)h=partsH(a.parts);
 if(a.rule)h=`<div class="rule"><s>${a.rule[0]}</s><i>→</i><b>${a.rule[1]}</b></div>`;
 if(a.html)h=a.html;
 return `<div class="maid">${h}${cap?`<div class="cap">${cap}</div>`:''}</div>`}
function animAid(st,ms,k){if(!st)return;const a=$('.maid',st)||st;
 const air=$('.air',a);if(air&&!air.closest('.mpair')){air.classList.remove('go');void air.getBBox();air.classList.add('go');setTimeout(()=>air.classList.remove('go'),1300)}
 const nas=$('.nas',a);if(nas&&!nas.closest('.mpair')){nas.classList.remove('go');void nas.getBBox();nas.classList.add('go')}
 const sv=$('.l1tbig svg',a);if(sv&&!(k||'').startsWith('w:'))drawLine(sv,720,sndOn(k||''));else if(sv)drawLine(sv,720,190);
 const g=$$('.glide b',a);if(g.length){const per=Math.max(220,(ms-300)/g.length);g.forEach((b,i)=>setTimeout(()=>{g.forEach(x=>x.classList.remove('on'));b.classList.add('on')},200+per*i));setTimeout(()=>g.forEach(x=>x.classList.remove('on')),200+per*g.length+300)}}

/* ---------- ขั้นตอนแบบต่าง ๆ ---------- */
/* เปิดบท: เป้าหมาย + คำถามเดาให้ชนะภายใน 30 วินาที */
function goalBar(){const g=G.goal;return `<div class="mgoal"><div><b>จบบทนี้ คุณจะ${g.do}</b><small>${g.sub}</small></div><span class="tm">ประมาณ ${g.min} นาที</span></div>`}
function hook(o){const cards=o.cards;return {kind:'q',ans:o.ans,auto:cards?cards[0]:o.k,
 html:()=>`${goalBar()}<div class="center"><div class="mhook">${o.q}</div>${o.pic?pic(o.pic,'mpic',!(thOf(o.pic)&&String(o.q).includes(thOf(o.pic)))):''}${o.k?`<button class="audio press" style="width:76px;height:76px;margin-top:10px" data-play="${o.k}">${SPK}</button>`:''}${o.show?o.show:''}</div>
 ${cards?`<div class="msnd">${cards.map((k,i)=>`<div class="v4card"><span class="k">เสียง ${'AB'[i]}</span><button class="audio press" data-play="${k}">${SPK}</button></div>`).join('')}</div>
 <div class="pgrid v4two mab">${cards.map((k,i)=>`<button class="opt press" data-i="${i}">เสียง ${'AB'[i]}</button>`).join('')}</div>`:optsHtml(o)}`,
 show:st=>{if(quiet())return;setTimeout(async()=>{const i0=E.i;if(cards){const b=$$('.msnd .audio',st);bump(b[0]);await wait(play(cards[0])+250);if(E.i!==i0)return;bump(b[1]);play(cards[1])}else if(o.k){bump($('[data-play]',st));play(o.k)}},500)},
 fb:()=>o.fb,solve:()=>answer(o.ans),demo:async d=>{if(d==='ok')answer(o.ans);if(d==='bad')answer(o.ans?0:1);await wait(500)}}}
function optsHtml(o){const nt=o.noTh,n=o.opts.length,cl=n===2?'v4two':n===3?'v4three':'';
 return `<div class="pgrid ${cl}">${o.opts.map((x,i)=>{
  if(typeof x==='string')return `<button class="opt mtxt press" data-i="${i}">${x}</button>`;
  if(x.mouth)return `<button class="opt mmo press" data-i="${i}"><span class="k">${'ABCD'[i]}</span>${mouth(x.mouth,'')}${x.lab?`<span class="l1tl">${x.lab}</span>`:''}</button>`;
  if(x.tone!=null)return `<button class="opt ptile press tc${x.tone}" data-i="${i}"><span class="k">${'ABCD'[i]}</span>${contour(x.tone,{cls:'pic-t'})}<span class="l1tl">${x.lab||''}</span></button>`;
  if(x.sign)return `<button class="opt msg press" data-i="${i}"><span class="sign ${x.col||'g'}"><span class="zh">${x.sign}</span>${x.py?`<span class="py">${x.py}</span>`:''}</span></button>`;
  return `<button class="opt ptile press" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span class="pic-t"><img src="${x.img}" alt=""></span>${x.lab?`<span class="plab">${x.lab}</span>`:''}${nt?'':thLab(x.img)}</button>`}).join('')}</div>`}
/* คำถามทั่วไป: ข้อความ / ภาพ / รูปปาก / เส้นเสียง / ป้าย · ตอบผิด = เฉลยแล้วทำข้อเดิม */
function ask(o){if(o.noTh==null)o.noTh=/ไม่มีตัวช่วยภาษาไทย|ด่านปิดเล่ม/.test(o.tag||'');return {kind:'q',ans:o.ans,auto:o.k,
 html:()=>`<div class="qm" id="qm">${mas('think')}</div><div class="center">${o.rv?`<span class="mrevtag">${RV(o.rv)}</span>`:`<div class="cap v4tag">${o.tag||''}</div>`}
  <div class="${o.rv||o.big?'mhook':'cap'}" style="${o.rv||o.big?'font-size:18px':'font-size:14px;margin-top:2px'}">${o.q}</div>
  ${o.pic?pic(o.pic,'mpic',!o.noTh):''}${o.show||''}${o.k?`<button class="audio press" style="width:${o.pic?70:84}px;height:${o.pic?70:84}px;margin-top:10px" data-play="${o.k}">${SPK}</button>${o.pic?'':'<div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>'}`:''}</div>
  ${optsHtml(o)}${o.rv?'<p class="mrevnote">คำถามทบทวนจากบทก่อน จะแทรกมาเป็นระยะ เพื่อไม่ให้ลืม</p>':''}`,
 show:st=>{if(o.k)setTimeout(()=>{if(!quiet()&&E.steps[E.i].auto===o.k&&here(st)){bump($('[data-play]',st));play(o.k)}},450)},
 fb:()=>o.fb,solve:()=>answer(o.ans),demo:async d=>{if(d==='ok')answer(o.ans);if(d==='bad')answer(o.ans===0?1:0);await wait(600)}}}
/* หน้าอธิบายสั้น ๆ */
function teach(o){return {kind:'teach',html:()=>`<div class="center l1snd">${o.cap?`<div class="cap">${o.cap}</div>`:''}<div class="large" style="padding:4px 0 0;font-size:24px">${o.title}</div>${o.text?`<p class="l1p v4fit">${o.text}</p>`:''}</div>${o.html||''}${o.note?`<p class="mrevnote">${o.note}</p>`:''}`,
 show:st=>{if(o.auto&&!quiet())setTimeout(()=>{if(here(st))seq(o.auto,st)},600);if(o.init)o.init(st)},lock:o.lock,solve:o.solve,demo:async d=>{if(o.demo)await o.demo(d);await wait(200)}}}
/* ช่วงของบทยาว */
function part(o){return {kind:'teach',btn:'เริ่มช่วงนี้',html:()=>`<div class="mpart"><span class="n">${o.lab||`ช่วงที่ ${o.no}/${o.of}`}</span><h2>${o.title}</h2>
 <div class="chips">${o.chips.map(c=>`<span>${c}</span>`).join('')}</div><p>${o.note||''}</p><div class="road">${[...Array(o.of>1?o.of:0)].map((_,i)=>`<i class="${i<o.no?'on':''}"></i>`).join('')}</div></div>`}}
/* หน้า ก · คำจริง + ภาพ + ภาพช่วย + เทียบเสียงไทย (ข้อความเท่านั้น) */
function word(o){const x=o.w,long=x.zh.length>2;return {kind:'teach',html:()=>`${tag(o.n,o.cap||'ฟังคำจริง')}
 <div class="mword">${pic(x,"mpic",1)}<div><div class="zh ${long?'sm':''}">${x.zh}</div><div class="py ${long||x.py.length>7?'sm':''}">${(o.py||x.py).replace(/\[(.+?)\]/g,'<span class="hl">$1</span>')}</div><div class="mn">= ${x.th}</div></div></div>
 ${aidHtml(o.aid)}${o.hint?`<div class="mhint"><span class="cap">${o.hcap||'เทียบเสียงไทย · ลองพูดเบา ๆ'}</span><br>${o.hint}</div>`:''}
 <div class="mbtns">${o.sk?`<button class="mbtn2 press" data-play="${o.sk}">${SPK}เสียง ${o.sl}</button>`:''}<button class="mbtn2 press" data-play="${x.k}">${SPK}ฟังคำ</button></div>`,
 onPlay:b=>{bump(b);const k=b.dataset.play;animAid($('#stage'),play(k),k)},
 show:st=>{if(quiet())return;setTimeout(()=>{if(here(st))seq(o.sk?[o.sk,x.k]:[x.k],st,450)},500)},
 demo:async d=>{if(d==='anim'){animAid($('#stage'),1400,o.sk||x.k);await wait(o.aid&&o.aid.glide?900:350)}else await wait(200)}}}
/* ขั้น ข · ลงมือ: แตะรูปปากที่ตรงกับเสียง (เป็นคำถาม) */
const mouthQ=o=>ask(Object.assign({q:o.q||'ฟังเสียง แล้วแตะรูปปากที่ตรงกัน',opts:o.opts.map(m=>({mouth:m[0],lab:m[1]}))},o,{opts:o.opts.map(m=>({mouth:m[0],lab:m[1]}))}));
/* ขั้น ข · ลงมือ: แตะคู่เสียงให้ครบ แล้วดูภาพเคลื่อนไหว (ลม / จมูก / ปาก) */
function pair(o){return {kind:'teach',lock:true,html:()=>`${tag(o.n,'ลองเอง')}<div class="center l1snd"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text}</p></div>
 <div class="mpair">${o.items.map((it,i)=>`<button class="press" data-pp="${i}">${it.air!=null?airSvg(it.air):it.nasal?nasSvg(it.nasal):mouth(it.mouth,'big')}<span class="py">${it.py}</span>${it.zh?`<span class="zh">${it.zh}</span>`:''}<small>${it.sub}</small><span class="chk"></span></button>`).join('')}</div>
 <div class="center"><div class="v4ok v4need" style="margin-top:12px">${o.need||'แตะให้ครบทั้ง 2 ปุ่ม'}</div></div>`,
 show:st=>{const seen=new Set();$('.mpair',st).addEventListener('click',e=>{const b=e.target.closest('[data-pp]');if(!b)return;const i=+b.dataset.pp,it=o.items[i];
  bump(b);play(it.k);const a=$('.air,.nas',b);if(a){a.classList.remove('go');void a.getBBox();a.classList.add('go');setTimeout(()=>a.classList.remove('go'),1300)}
  seen.add(i);b.classList.add('done');$('.chk',b).textContent='ฟังแล้ว';
  if(seen.size===o.items.length){const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent=o.done||'ดีมาก สังเกตความต่างได้แล้ว';unlock()}})},
 solve:async()=>{for(const b of $$('#stage [data-pp]')){b.click();await wait(150)}},
 demo:async d=>{if(d==='done'){const b=$$('#stage [data-pp]');b[0].click();await wait(200);b[1].click();await wait(250)}else await wait(200)}}}
/* ขั้น ข · ลงมือ: ต่อพยางค์ทีละชิ้น */
function shuf(a,seed){let h=7;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const r=a.slice();for(let i=r.length-1;i>0;i--){h=(h*1103515245+12345)>>>0;const j=h%(i+1);[r[i],r[j]]=[r[j],r[i]]}if(r.length>1&&r.every((x,i)=>x===a[i]))r.push(r.shift());return r}
function tileH(p){return typeof p==='number'?(p?contour(p):'<span style="font-size:16px">เบา</span>'):p}
function build(o){const S=o.syl,labs=o.labs||['พยัญชนะ','สระ','วรรณยุกต์'];let B;
 const tilesFor=si=>{const t=(o.tiles&&o.tiles[si])||[...S[si],...(o.extra||[])];return t};
 return {kind:'teach',lock:true,html:()=>`${tag(o.n,o.cap||'ลองต่อเอง')}
 <div class="mword" style="justify-content:center">${o.w.img&&!o.noPic?pic(o.w,'mpic'):''}<div>${o.hideZh?'':`<div class="zh sm">${o.w.zh}</div>`}<div class="mn">${o.hideTh?'':'= '+o.w.th}</div></div></div>
 <div class="center"><p class="l1p v4fit" style="margin-top:8px">${o.prompt||'แตะชิ้นส่วนเรียงตามลำดับ'}</p></div>
 <div class="bslots">${S.map((sy,si)=>`<div class="bsyl ${si===0?'cur':''}" data-s="${si}">${sy.map((p,pi)=>`<div><div class="bslot" data-sl="${pi}"></div><div class="blab">${o.noLab?'':(sy.length===2&&o.labs2?o.labs2[pi]:labs[pi]||'')}</div></div>`).join('')}</div>`).join('')}</div>
 <div class="btiles"></div><div class="center bres"></div>`,
 show:st=>{B={s:0,p:0};const T=$('.btiles',st);
  const draw=()=>{const ts=tilesFor(B.s).map((p,i)=>({p,i}));const sorted=shuf(ts,(o.res||'')+B.s);T.innerHTML=sorted.map(({p,i})=>`<button class="btile press" data-t="${i}">${tileH(p)}</button>`).join('')};
  draw();
  T.addEventListener('click',async e=>{const b=e.target.closest('[data-t]');if(!b||B.done)return;const p=tilesFor(B.s)[+b.dataset.t],need=S[B.s][B.p];
   $$('.btile',T).forEach(x=>x.classList.remove('hint'));
   if(p!==need){b.classList.remove('no');void b.offsetWidth;b.classList.add('no');const c=$$('.btile',T).find(x=>tilesFor(B.s)[+x.dataset.t]===need&&!x.classList.contains('used'));if(c)c.classList.add('hint');return}
   b.classList.add('used');const sl=$(`.bsyl[data-s="${B.s}"] [data-sl="${B.p}"]`,st);sl.innerHTML=tileH(p);sl.classList.add('f');B.p++;
   if(B.p>=S[B.s].length){const sy=$(`.bsyl[data-s="${B.s}"]`,st);if(o.sylK&&o.sylK[B.s])play(o.sylK[B.s]);B.s++;B.p=0;sy.classList.remove('cur');
    if(B.s>=S.length){B.done=1;T.innerHTML='';$('.bres',st).innerHTML=`<div class="py">${o.res}</div><button class="mbtn2 press" style="margin:8px auto 0" data-play="${o.w.k}">${SPK}ฟังคำ</button>`;await wait(o.sylK?700:150);play(o.w.k);unlock()}
    else{$(`.bsyl[data-s="${B.s}"]`,st).classList.add('cur');draw()}}})},
 solve:async()=>{for(let g=0;g<40&&!B.done;g++){const need=S[B.s][B.p];const c=$$('#stage .btile').find(x=>tilesFor(B.s)[+x.dataset.t]===need&&!x.classList.contains('used'));c.click();await wait(60)}},
 demo:async d=>{if(d==='half'){const need=S[0][0];$$('#stage .btile').find(x=>tilesFor(0)[+x.dataset.t]===need).click();await wait(100);const bad=$$('#stage .btile').find(x=>tilesFor(0)[+x.dataset.t]!==S[0][1]&&!x.classList.contains('used'));if(bad)bad.click();await wait(150)}
  if(d==='done'){await E.steps[E.i].solve();await wait(200)}}}}
/* ขั้น ข · ลงมือ: แตะตัวจีนทีละตัว */
function split(o){return {kind:'teach',lock:true,html:()=>`${tag(o.n,'ลองเอง')}<div class="center l1snd"><div class="large" style="padding:2px 0 0;font-size:22px">${o.title}</div><p class="l1p v4fit">${o.text}</p></div>
 ${o.w?`<div class="center">${pic(o.w,'mpic',1)}</div>`:''}<div class="msplit">${o.chars.map((c,i)=>`<button class="press" data-cc="${i}"><span class="zh">${c.zh}</span><span class="py q">?</span></button>`).join('')}</div>
 <div class="center"><div class="v4ok v4need" style="margin-top:12px">แตะให้ครบทุกตัว</div></div>`,
 show:st=>{const seen=new Set();$('.msplit',st).addEventListener('click',async e=>{const b=e.target.closest('[data-cc]');if(!b)return;const i=+b.dataset.cc,c=o.chars[i];bump(b);play(c.k);
  const p=$('.py',b);p.textContent=c.py;p.classList.remove('q');b.classList.add('done');seen.add(i);
  if(seen.size===o.chars.length){const ok=$('.v4ok',st);ok.classList.add('on');ok.textContent=o.done;await wait(900);if(o.w&&here(st))play(o.w.k);unlock()}})},
 solve:async()=>{for(const b of $$('#stage [data-cc]')){b.click();await wait(100)}},
 demo:async d=>{if(d==='half'){$('#stage [data-cc]').click();await wait(200)}if(d==='done'){await E.steps[E.i].solve();await wait(300)}}}}
/* ขั้น ค · อัดเสียงตัวเอง แล้วฟังเทียบกับเสียงจีน (ไม่มีการให้คะแนน) */
const REC={url:null,mr:null,chunks:[],stream:null};
function recUI(st,state,msg){const s=$('.mrec .st',st);if(s)s.textContent=msg||'';$$('.mcmp button',st).forEach(b=>b.classList.toggle('off',state!=='ready'))}
async function recStart(st){try{REC.stream=REC.stream||await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){recUI(st,'none','ไม่สามารถใช้ไมโครโฟนได้ กด "ต่อไป" เพื่อเรียนต่อ');return}
 REC.chunks=[];REC.mr=new MediaRecorder(REC.stream);REC.mr.ondataavailable=e=>REC.chunks.push(e.data);
 REC.mr.onstop=()=>{if(REC.url)URL.revokeObjectURL(REC.url);REC.url=URL.createObjectURL(new Blob(REC.chunks,{type:REC.mr.mimeType}));recUI(st,'ready','อัดเสียงแล้ว ลองฟังเทียบกัน')};
 REC.mr.start();$('.hold',st).classList.add('on');recUI(st,'rec','กำลังอัดเสียง… ปล่อยนิ้วเมื่อพูดจบ')}
function recStop(st){$('.hold',st).classList.remove('on');if(REC.mr&&REC.mr.state==='recording')REC.mr.stop()}
function playMe(){return new Promise(r=>{if(!REC.url)return r();const a=new Audio(REC.url);a.onended=r;a.onerror=r;a.play().catch(r)})}
function rec(o){const ws=o.ws||[o.w],keys=o.keys||ws.map(x=>x.k);return {kind:'teach',html:()=>`${tag(o.n,'อัดเสียงแล้วฟังเทียบ')}
 ${ws.length===1?`<div class="mword" style="justify-content:center">${pic(ws[0])}<div><div class="zh ${ws[0].zh.length>2?'sm':''}">${ws[0].zh}</div><div class="py ${ws[0].py.length>7?'sm':''}">${ws[0].py}</div><div class="mn">= ${ws[0].th}</div></div></div>`
 :`<div class="mcards3">${ws.map(x=>`<div class="c"><img src="${x.img}" alt=""><span class="zh">${x.zh}</span><span class="py">${x.py}</span>${thLab(x)}</div>`).join('')}</div>`}
 <div class="mrec"><button class="hold" aria-label="กดค้างเพื่ออัดเสียง">${MIC}<span>กดค้าง<br>แล้วพูด</span></button><div class="st">กดปุ่มค้างไว้ พูดว่า ${o.say||ws.map(x=>x.py).join(' · ')} แล้วปล่อย</div></div>
 <div class="mcmp"><button class="me off" data-r="me">${SPK}เสียงของคุณ</button><button class="cn off" data-r="cn">${SPK}เสียงจีน</button><button class="alt off" data-r="alt">ฟังสลับกัน 2 รอบ</button></div>`,
 show:st=>{const h=$('.hold',st);h.addEventListener('pointerdown',e=>{e.preventDefault();recStart(st)});['pointerup','pointerleave','pointercancel'].forEach(ev=>h.addEventListener(ev,()=>recStop(st)));
  h.addEventListener('contextmenu',e=>e.preventDefault());
  $('.mcmp',st).addEventListener('click',async e=>{const b=e.target.closest('[data-r]');if(!b)return;const k=b.dataset.r,me=$('.me',st),cn=$('.cn',st);
   const pc=async()=>{cn.classList.add('playing');for(const x of keys)await wait(play(x)+200);cn.classList.remove('playing')};const pm=async()=>{me.classList.add('playing');await playMe();me.classList.remove('playing')};
   if(k==='me')pm();else if(k==='cn')pc();else{for(let i=0;i<2;i++){await pc();await wait(250);await pm();await wait(250)}}})},
 demo:async d=>{if(d==='done'){const st=$('#stage');recUI(st,'ready','อัดเสียงแล้ว ลองฟังเทียบกัน');$('.cn',st).classList.add('playing')}await wait(200)}}}
/* ตอนจบ: ส่งมอบเป้าหมายของบท */
function fin(o){return {kind:'teach',btn:o.btn||'จบบทเรียน',html:()=>`<div class="center l1snd"><div class="cap">เป้าหมายของบทนี้</div><div class="large" style="padding:2px 0 0;font-size:24px">${o.title}</div></div>
 ${o.scene?`<div class="mscene"><img src="${o.scene}" alt=""></div>`:''}${o.pics?`<div class="mscene2 ${o.pics.length===1?'one':''}">${o.pics.map(p=>pic(p,'mpic',1)).join('')}</div>`:''}
 ${o.html||''}${o.signs?`<div class="signs">${o.signs.map(s=>`<button class="sign ${s.col} press" data-play="${s.k}"><span class="zh">${s.zh}</span><span class="py">${s.py}</span></button>`).join('')}</div>`:''}
 ${o.chips?`<div class="msent ${o.chips.length>3?'wrap':''}">${o.chips.map(c=>`<button class="press ${c.t?'tc'+c.t:''} ${o.chips.length>3?'mx':''}" data-play="${c.k}"><span class="zh">${c.zh}</span><span class="py">${c.py}</span><small>${c.th}</small></button>`).join('')}</div>`:''}
 <div class="center">${o.th?`<div class="mth">${o.th}</div>`:''}<p class="mrevnote" style="margin-top:4px">${o.note||'แตะแต่ละคำเพื่อฟัง'}</p>
 ${o.k?`<button class="audio lg press" data-play="${o.k}">${SPK}<span>${o.kl||'ฟังทั้งประโยค'}</span></button>`:''}</div>`,
 show:st=>setTimeout(()=>{if(!quiet()&&o.k&&here(st)){bump($('.audio',st));play(o.k)}},600)}}
function LESSON(L){G=L;document.title=`ต้นแบบ · เล่ม 2 · ${L.code||''} ${L.title||''}`;start(L.steps)}
