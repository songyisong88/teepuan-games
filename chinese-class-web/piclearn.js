/* เรียนด้วยรูป "ดูรูปแล้วเลือกคำ" — ขั้นสอนใหม่ในบทเรียน (unitSteps) ไม่ใช่เกม
   เลือกรูปแบบ "ต่อคำ": มีรูป → โจทย์รูป · ไม่มีรูปแต่จับต้องได้ → อีโมจิ + ป้าย "อีโมจิชั่วคราว" · นามธรรม → สอนด้วยประโยคเหมือนเดิม */
const picHas=w=>!!(w&&window.ART_IDX&&ART_IDX['word/'+w.zh]);
const PIC_KIN=new Set(['哥哥','姐姐','弟弟','妹妹','爷爷','奶奶','儿子','女儿']); /* ภาพญาติแยกยาก → ติดป้ายคำไทยกำกับเสมอ */
const PIC_SIM=[['饭店','饭馆'],['苹果','水果'],['鸡','鸡蛋'],['茶','奶茶','咖啡'],['牛奶','奶茶'],['医生','医院'],['学校','学生'],['同学','朋友','学生','老师','先生'],['书','书包'],['累','睡觉','生病'],['生气','难过','害怕'],['电话','手机'],['雨','云'],['月','星星','太阳'],['出租车','公共汽车','火车','自行车','飞机'],['热','冷']];
const picSim=(a,b)=>PIC_SIM.some(g=>g.includes(a)&&g.includes(b));
/* อีโมจิชั่วคราว สำหรับคำจับต้องได้ที่ยังไม่มีรูป */
const PIC_EMO={'肉':'🥩','羊肉':'🍖','手机':'📱','照片':'🖼️','火车站':'🚉','机场':'✈️','地铁':'🚇','票':'🎫','地图':'🗺️','银行':'🏦','公园':'🌳','超市':'🛒','厨房':'🍳','冰箱':'🧊','裤子':'👖','包':'👜','盘子':'🍽️','面包':'🍞','照相机':'📷','啤酒':'🍺','可乐':'🥤','果汁':'🧃','菜单':'📋','碗':'🥣','脚':'🦶','牙':'🦷','嘴':'👄','腿':'🦵','鼻子':'👃','头发':'💇','脸':'🙂','头':'🗣️','雪':'❄️','草':'🌱','黑板':'🧑‍🏫','教室':'🏫','图书馆':'📚','护士':'🧑‍⚕️','药店':'💊','洗手间':'🚻','字典':'📖','课本':'📕','公司':'🏢','办公室':'🖥️','冬天':'⛄','夏天':'☀️','春天':'🌸','秋天':'🍂','红':'🟥','白':'⬜','黑':'⬛','蓝':'🟦','黄':'🟨','绿':'🟩','游戏':'🎮','音乐':'🎵','时间':'⏰','生日':'🎂','下雨':'🌧️','天气':'⛅'};
const picEmo=w=>!picHas(w)&&PIC_EMO[w.zh]||'';
const picT=w=>(window.PIC_TYPE&&PIC_TYPE[w.zh])||'n';
const picKin=w=>PIC_KIN.has(w.zh)?`<span class="plab">${w.th}</span>`:'';
let _picAll=null;const picAll=()=>_picAll||(_picAll=LESSONS.flatMap(L=>L.words.filter(picHas)));
/* ตัวหลอก: หมวดเดียวกัน (นาม/กริยา/คุณศัพท์) · ไม่ใช่คำพ้อง/คำที่ภาพแยกยาก · เรียงตามความใกล้ระดับของคำ */
function picDist(w,pool,n,needImg){
 const ok=x=>x.zh!==w.zh&&x.th!==w.th&&!picSim(w.zh,x.zh)&&(!needImg||picHas(x));
 const base=uniqW([...pool.filter(ok),...picAll().filter(ok)]);
 const same=shuffle(base.filter(x=>picT(x)===picT(w))),oth=shuffle(base.filter(x=>picT(x)!==picT(w)));
 const lvOk=x=>(x.lv||1)<=(w.lv||1);
 const r=[...same.filter(lvOk),...same.filter(x=>!lvOk(x)),...oth];
 return r.slice(0,n)}
function picQ(w,type,pool){const o=picDist(w,pool,3,type==='aud2pic');if(o.length<3)return makeQ(w,'zh2th',pool);const opts=shuffle([w,...o]);
 return {w,type,pic:true,opts,ans:opts.findIndex(x=>x.zh===w.zh),
  reveal:(ok,qq)=>{const pk=!ok&&qq&&qq.picked!=null?qq.opts[qq.picked]:null;
   return `<div class="ans pic-rev">${art('word',w.zh,'','pic-mini')}<div class="tx"><span class="zh" style="font-size:24px">${w.zh}</span> ${pyHtml(w.py)}<div style="margin-top:2px">= <b>${w.th}</b></div>${pk?`<div class="pk">${type==='pic2zh'?'คุณเลือก':'คุณเลือกรูป'}: <span class="zh">${pk.zh}</span> ${pyPlain(pk.py)} = ${pk.th}</div>`:''}</div>${spkBtn(w.zh,'','ฟัง')}</div>`}}}
function picMat(ws){const seen=new Set(),ps=shuffle(ws.filter(picHas)).filter(w=>!seen.has(w.th)&&seen.add(w.th)).slice(0,4);
 return {w:ps[0],type:'mat',pics:true,ps,right:shuffle(ps.map((_,i)=>i)),reveal:()=>`<div class="ans">${ps.map(w=>`<div class="pic-rv1">${art('word',w.zh,'','pic-mini sm')}<span class="zh" style="font-size:19px">${w.zh}</span> <span style="font-size:13px">${pyHtml(w.py)}</span> = ${w.th}</div>`).join('')}</div>`}}
function picQHtml(q){const w=q.w;
 if(q.type==='pic2zh')return `<div class="center"><div class="cap" style="font-size:14px">ภาพนี้คือคำจีนคำไหน</div><div class="pic-card">${art('word',w.zh,'','pic-big')}${picKin(w)}</div></div>
  <div class="group opts mt20" style="margin-top:18px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span class="zh" style="font-size:26px">${o.zh}</span><span class="pyr">${pyPlain(o.py)}</span></button>`).join('')}</div>`;
 return `<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกรูปที่ตรงกัน</div><button class="audio press" aria-label="ฟังเสียง" style="width:84px;height:84px;margin-top:10px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง · ไม่มีตัวอักษรให้เดา</div></div>
  <div class="pgrid">${q.opts.map((o,i)=>`<button class="opt ptile press" data-i="${i}" aria-label="รูปที่ ${LET[i]}"><span class="k">${LET[i]}</span>${art('word',o.zh,'','pic-t')}${picKin(o)}</button>`).join('')}</div>`}
/* การ์ดคำใหม่แบบมีรูป / อีโมจิชั่วคราว — คืน {top, th} หรือ null */
function picCard(w){
 if(picHas(w))return {top:`<div class="pic-card hero">${art('word',w.zh,'','pic-big')}${picKin(w)}</div>`,hide:!PIC_KIN.has(w.zh)};
 const e=picEmo(w);if(e)return {top:`<div class="pic-card emo"><span class="pe">${e}</span><span class="pic-badge">อีโมจิชั่วคราว</span></div>`,hide:false};
 return null}
const picCount=L=>L.words.filter(picHas).length;
const picChip=L=>{const n=picCount(L);return n?`<span class="pic-chip" title="บทนี้มีรูปประกอบ">🖼️ มีรูป ${n}/${L.words.length} คำ</span>`:''};
