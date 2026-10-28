/* เรียนด้วยรูป "ดูรูปแล้วเลือกคำ" — ขั้นสอนใหม่ในบทเรียน (unitSteps) ไม่ใช่เกม
   เลือกรูปแบบ "ต่อคำ": มีรูป → โจทย์รูป · ไม่มีรูปแต่จับต้องได้ → อีโมจิ + ป้าย "อีโมจิชั่วคราว" · นามธรรม → สอนด้วยประโยคเหมือนเดิม */
const picHas=w=>!!(w&&window.ART_IDX&&ART_IDX['word/'+w.zh]);
/* ภาพคน (ญาติ/อาชีพ/ตำแหน่ง) แยกยากถ้าไม่มีคำกำกับ → ติดป้ายคำไทยทุกที่ที่แสดงภาพ (การ์ด/โจทย์/ไทล์/จับคู่) */
const PIC_KIN=new Set(['哥哥','姐姐','弟弟','妹妹','爷爷','奶奶','爸爸','妈妈','儿子','女儿','孩子','男孩','女孩','老人','一家人','妻子','丈夫','阿姨','叔叔','老师','学生','同学','朋友','医生','先生','小姐','人','经理','校长','护士','服务员','房东','邻居','运动员','空姐','歌手','保安','警察','售货员','司机','冠军','记者','律师','厨师','工程师','会计','裁判','农民','画家','理发师','和尚','宇航员']);
/* ภาพที่อ่านยากถ้าไม่มีคำกำกับ → ไม่ใช้เป็นตัวหลอกในโจทย์ "ฟังแล้วเลือกรูป" (ยังใช้เป็นคำตอบ/มีป้ายได้) */
const PIC_HARD=new Set(['电梯','售货员','大','小','快乐','面条','鱼','下雪','头']);
/* กลุ่มคำที่ภาพคล้าย/ความหมายใกล้กัน → ไม่ใช้เป็นตัวหลอกของกันและกัน (ภาพแยกยาก) */
const PIC_SIM=[['孩子','男孩','女孩','儿子','女儿','弟弟','妹妹','哥哥','姐姐','一家人'],['爷爷','奶奶','老人','爸爸','妈妈'],['妻子','丈夫','太太','先生','小姐','妈妈','爸爸','阿姨','叔叔','姐姐'],['人','老人','男孩','女孩','孩子','朋友','同学','邻居','服务员','经理','校长'],['足球','网球','羽毛球','乒乓球','运动员','冠军','裁判'],['兴奋','紧张','着急','孤单','无聊','得意','吃惊','不耐烦','委屈','失望','好奇','勇敢','害羞','懒','困','笑','哭'],['发烧','咳嗽','打针','吃药','受伤','打喷嚏','健身'],['炒','蒸','做饭','洗碗','饺子','包子','粽子','火锅','烤鸭'],['高铁','汽车','船','飞船','摩天轮','过山车'],['山','森林','岛','桥','爬山','叶子','彩虹'],['窗户','门','窗帘'],['滑梯','秋千','过山车','摩天轮'],['和尚','老师','医生','警察','保安'],['鸟','蜜蜂','蛇','龙'],['饭店','饭馆'],['苹果','水果','西瓜'],['鸡','鸡蛋','肉','羊肉'],['茶','奶茶','咖啡','茶叶','绿茶','红茶','珍珠','吸管'],['牛奶','奶茶','果汁','可乐','啤酒','水','汤'],['早饭','午饭','晚饭','米饭','菜','面条','面包','盘子','碗'],['医生','医院','护士','药','药店','看病','生病'],['学校','学生','教室','图书馆','黑板','课本','字典','书','书包'],['累','睡觉','生病','休息'],['生气','难过','害怕'],['电话','手机'],['雨','云','下雪','下雨','雪','晴天','阴天','太阳'],['月','星星','太阳'],['出租车','公共汽车','火车','自行车','飞机','地铁','火车站','机场','路','堵车'],['热','冷','夏天','冬天'],['春天','夏天','秋天','冬天'],['头','脸','头发','嘴','牙','鼻子','眼睛','耳朵'],['脚','腿','肚子','手'],['照片','照相机','电影','地图','票','菜单'],['走','迷路','跑步','玩','打篮球','踢','骑','篮球'],['洗','刷','洗澡'],['点菜','买单','吃','喝'],['拿','教','关','打扫','搬家','上网','穿'],['楼','家','厨房','房东','搬家'],['公园','银行','超市','商店','药店','饭店'],['游戏','音乐','唱歌','跳舞','电脑','电视'],['行李箱','书包','裤子','衣服','鞋','帽子','伞'],['猫','狗','鱼','蝴蝶'],['花','树','草','春天']];
const picSim=(a,b)=>a!==b&&(PIC_SIM.some(g=>g.includes(a)&&g.includes(b))||a.includes(b)||b.includes(a));
/* อีโมจิชั่วคราว สำหรับคำจับต้องได้ที่ยังไม่มีรูป */
const PIC_EMO={'肉':'🥩','羊肉':'🍖','手机':'📱','照片':'🖼️','火车站':'🚉','机场':'✈️','地铁':'🚇','票':'🎫','地图':'🗺️','银行':'🏦','公园':'🌳','超市':'🛒','厨房':'🍳','冰箱':'🧊','裤子':'👖','包':'👜','盘子':'🍽️','面包':'🍞','照相机':'📷','啤酒':'🍺','可乐':'🥤','果汁':'🧃','菜单':'📋','碗':'🥣','脚':'🦶','牙':'🦷','嘴':'👄','腿':'🦵','鼻子':'👃','头发':'💇','脸':'🙂','头':'🗣️','雪':'❄️','草':'🌱','黑板':'🧑‍🏫','教室':'🏫','图书馆':'📚','护士':'🧑‍⚕️','药店':'💊','洗手间':'🚻','字典':'📖','课本':'📕','公司':'🏢','办公室':'🖥️','冬天':'⛄','夏天':'☀️','春天':'🌸','秋天':'🍂','红':'🟥','白':'⬜','黑':'⬛','蓝':'🟦','黄':'🟨','绿':'🟩','游戏':'🎮','音乐':'🎵','时间':'⏰','生日':'🎂','下雨':'🌧️','天气':'⛅'};
const picEmo=w=>!picHas(w)&&PIC_EMO[w.zh]||'';
const picT=w=>(window.PIC_TYPE&&PIC_TYPE[w.zh])||'x'; /* x = ไม่มีรูป/ไม่ทราบหมวด → ไม่ใช้เป็นตัวหลอกหมวดเดียวกัน */
const picLab=w=>w.th.split(/ \/ | \(/)[0];
const picKin=w=>PIC_KIN.has(w.zh)?`<span class="plab">${picLab(w)}</span>`:'';
let _picAll=null;const picAll=()=>_picAll||(_picAll=LESSONS.flatMap(L=>L.words.filter(picHas)));
/* ตัวหลอก: หมวดเดียวกัน (นาม/กริยา/คุณศัพท์) · ไม่ใช่คำพ้อง/คำที่ภาพแยกยาก · เรียงตามความใกล้ระดับของคำ */
function picDist(w,pool,n,needImg){
 const ok=x=>x.zh!==w.zh&&x.th!==w.th&&!picSim(w.zh,x.zh)&&(!needImg||(picHas(x)&&!PIC_HARD.has(x.zh)));
 const base=uniqW([...pool.filter(ok),...picAll().filter(ok)]);
 const same=shuffle(base.filter(x=>picT(x)===picT(w))),oth=shuffle(base.filter(x=>picT(x)!==picT(w)));
 const lvOk=x=>(x.lv||1)<=(w.lv||1);
 const r=[...same.filter(lvOk),...oth.filter(lvOk),...same.filter(x=>!lvOk(x)),...oth.filter(x=>!lvOk(x))];
 /* L2: ไม่เอาตัวเลือกที่พินอินไม่นับวรรณยุกต์ซ้ำ หรือคำไทยหลักซ้ำกับโจทย์/ตัวเลือกอื่น (ฟังไม่ออก/อ่านไทยซ้ำ) */
 const pk=x=>String(x.py||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-züv]/gi,'').toLowerCase(),tk=x=>picLab(x);
 const seenP=new Set([pk(w)]),seenT=new Set([tk(w)]),out=[];
 for(const x of r){if(out.length>=n)break;if(seenP.has(pk(x))||seenT.has(tk(x)))continue;seenP.add(pk(x));seenT.add(tk(x));out.push(x)}
 return out.length>=n?out:[...out,...r.filter(x=>!out.includes(x))].slice(0,n)}
function picQ(w,type,pool){const o=picDist(w,pool,3,type==='aud2pic');if(o.length<3)return makeQ(w,'zh2th',pool);const opts=shuffle([w,...o]);
 return {w,type,pic:true,opts,ans:opts.findIndex(x=>x.zh===w.zh),
  reveal:(ok,qq)=>{const pk=!ok&&qq&&qq.picked!=null?qq.opts[qq.picked]:null;
   return `<div class="ans pic-rev">${art('word',w.zh,'','pic-mini')}<div class="tx"><span class="zh" style="font-size:24px">${w.zh}</span> ${pyHtml(w.py)}<div style="margin-top:2px">= <b>${w.th}</b></div>${pk?`<div class="pk">${type==='pic2zh'?'คุณเลือก':'คุณเลือกรูป'}: <span class="zh">${pk.zh}</span> ${pyPlain(pk.py)} = ${pk.th}</div>`:''}</div>${spkBtn(w.zh,'','ฟัง')}</div>`}}}
function picMat(ws){const seen=new Set(),ps=shuffle(ws.filter(picHas)).filter(w=>!seen.has(w.th)&&seen.add(w.th)).reduce((acc,w)=>acc.length<4&&!acc.some(x=>picSim(x.zh,w.zh))?[...acc,w]:acc,[]);
 return {w:ps[0],type:'mat',pics:true,ps,right:shuffle(ps.map((_,i)=>i)),reveal:()=>`<div class="ans">${ps.map(w=>`<div class="pic-rv1">${art('word',w.zh,'','pic-mini sm')}<span class="zh" style="font-size:19px">${w.zh}</span> <span style="font-size:13px">${pyHtml(w.py)}</span> = ${w.th}</div>`).join('')}</div>`}}
function picQHtml(q){const w=q.w;
 if(q.type==='pic2zh')return `<div class="center"><div class="cap" style="font-size:14px">ภาพนี้คือคำจีนคำไหน</div><div class="pic-card">${art('word',w.zh,'','pic-big')}${picKin(w)}</div></div>
  <div class="group opts mt20" style="margin-top:18px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span class="zh" style="font-size:26px">${o.zh}</span><span class="pyr">${pyPlain(o.py)}</span></button>`).join('')}</div>`;
 if(q.type==='pic2py')return `<div class="center"><div class="cap" style="font-size:14px">ภาพนี้อ่านว่าอย่างไร (พินอิน)</div><div class="pic-card">${art('word',w.zh,'','pic-big')}${picKin(w)}</div></div>
  <div class="group opts mt20" style="margin-top:18px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span style="font-size:23px;font-weight:500">${pyPlain(o.py)}</span></button>`).join('')}</div>`;
 return `<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกรูปที่ตรงกัน</div><button class="audio press" aria-label="ฟังเสียง" style="width:84px;height:84px;margin-top:10px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง · ไม่มีตัวอักษรให้เดา</div></div>
  <div class="pgrid">${q.opts.map((o,i)=>`<button class="opt ptile press" data-i="${i}" aria-label="รูปที่ ${LET[i]}"><span class="k">${LET[i]}</span>${art('word',o.zh,'','pic-t')}${picKin(o)}</button>`).join('')}</div>`}

/* ดูรูป → เลือกพินอิน (ขั้นสอนเสริม): ตัวหลอกเป็นคำหมวดเดียวกัน พินอินต้องไม่ซ้ำกัน */
function picPyQ(w,pool){const key=x=>pyPlain(x.py),seen=new Set([key(w)]);
 let o=picDist(w,pool,40,true).filter(x=>!seen.has(key(x))&&seen.add(key(x))).slice(0,3);if(o.length<3)return null;
 const opts=shuffle([w,...o]);
 return {w,type:'pic2py',pic:true,opts,ans:opts.findIndex(x=>x.zh===w.zh),
  reveal:(ok,qq)=>{const pk=!ok&&qq&&qq.picked!=null?qq.opts[qq.picked]:null;
   return `<div class="ans pic-rev">${art('word',w.zh,'','pic-mini')}<div class="tx"><span class="zh" style="font-size:24px">${w.zh}</span> ${pyHtml(w.py)}<div style="margin-top:2px">= <b>${w.th}</b></div>${pk?`<div class="pk">คุณเลือก: ${pyPlain(pk.py)} (<span class="zh">${pk.zh}</span> = ${pk.th})</div>`:''}</div>${spkBtn(w.zh,'','ฟัง')}</div>`}}}
/* การ์ดทบทวนรูป: พลิกดูคำจากบทก่อนหน้าที่เรียนจบแล้ว (ไม่ให้คะแนน — ทวนความจำเฉย ๆ) */
function picFlip(L,u){const cur=new Set(u.words.map(w=>w.zh)),seen=new Set();
 const cand=picAll().filter(w=>w.lesson!==L.id&&!cur.has(w.zh)&&isDone(w.lesson)&&(w.lv||1)<=(L.lv||1)&&!seen.has(w.th)&&seen.add(w.th));
 if(cand.length<3)return null;
 const mis=cand.filter(w=>S.mistakes&&S.mistakes[w.zh]);
 const ws=uniqW([...shuffle(mis),...shuffle(cand)]).slice(0,4);return {k:'pflip',ws}}
function pflipHtml(ws){return `<div class="center"><div class="cap" style="font-size:14px;letter-spacing:1px">ทบทวนด้วยรูป · จากบทที่เรียนแล้ว</div><div class="h2" style="margin:6px 20px 0;font-size:19px">นึกคำจีนจากรูป แล้วแตะเช็กคำตอบ</div></div>
 <div class="pgrid pflips">${ws.map(w=>`<button class="pflip press" data-sa="flip" data-z="${w.zh}" aria-label="การ์ดรูป แตะเพื่อดูคำตอบ"><span class="pf-f">${art('word',w.zh,'','pic-t')}${picKin(w)}<span class="pf-h">แตะดูคำตอบ</span></span><span class="pf-b"><span class="zh" style="font-size:40px">${w.zh}</span><span class="pf-py">${pyPlain(w.py)}</span><span class="pf-th">${w.th}</span><span class="pf-sp">${SPK} ฟังอีกครั้ง</span></span></button>`).join('')}</div>
 <p class="cap center" style="margin:12px 20px 0">ทวนเฉย ๆ ไม่มีคะแนน · คำไหนนึกไม่ออก ไม่ต้องกังวล จะเจอในข้อฝึกต่อไป</p>`}
/* การ์ดคำใหม่แบบมีรูป / อีโมจิชั่วคราว — คืน {top, th} หรือ null */
function picCard(w){
 if(picHas(w))return {top:`<div class="pic-card hero">${art('word',w.zh,'','pic-big')}${picKin(w)}</div>`,hide:!PIC_KIN.has(w.zh)};
 const e=picEmo(w);if(e)return {top:`<div class="pic-card emo"><span class="pe">${e}</span><span class="pic-badge">อีโมจิชั่วคราว</span></div>`,hide:false};
 return null}
const picCount=L=>L.words.filter(picHas).length;
const picChip=L=>{const n=picCount(L);if(!n)return '';const h=L.words.slice(0,8).filter(picHas).length,t=n-h;
 const where=t===0?' · รอบ 1':h===0?' · รอบ 2':'';
 return `<span class="pic-chip" title="บทนี้มีรูปประกอบ">🖼️ มีรูป ${n}/${L.words.length} คำ${where}</span>`};
