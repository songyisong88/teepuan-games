/* เรียนด้วยรูป "ดูรูปแล้วเลือกคำ" — ขั้นสอนใหม่ในบทเรียน (unitSteps) ไม่ใช่เกม
   เลือกรูปแบบ "ต่อคำ": มีรูป → โจทย์รูป · ไม่มีรูปแต่จับต้องได้ → อีโมจิ + ป้าย "อีโมจิชั่วคราว" · นามธรรม → สอนด้วยประโยคเหมือนเดิม */
/* การ์ดเฉลยแบบมีรูป (ซ้งอี้อนุมัติ 29 ต.ค.): รูปด้านบน · ตัวจีน / พินอิน / = คำไทย บรรทัดละอย่าง · ปุ่มลำโพงใหญ่มุมขวาบน · ไม่มีรูป → ข้อความ + ลำโพง
   o={pic,zh,zhH,py,th,pk,t} — pic: html รูป (ใช้คลาส pic-big) · zhH: ตัวจีนแบบลงสี (ถ้ามี) · pk: บรรทัด "คุณเลือก…" · t: ข้อความที่ให้อ่านออกเสียง */
const revCard=o=>{const t=o.t||o.zh;return `<div class="ans pic-rev2${o.pic?'':' nopic'}">${o.pic?`<span class="pr-pic">${o.pic}</span>`:''}<button class="pr-spk press" data-act="audio" data-t="${t}" aria-label="ฟัง ${t}">${SPK}<span>ฟัง</span></button><div class="pr-tx"><div class="pr-zh zh">${o.zhH||o.zh}</div><div class="pr-py">${pyHtml(o.py)}</div><div class="pr-th">= <b>${o.th}</b></div>${o.pk?`<div class="pr-pk">${o.pk}</div>`:''}</div></div>`};
const picHas=w=>!!(w&&window.ART_IDX&&ART_IDX['word/'+w.zh]);
/* ภาพคน (ญาติ/อาชีพ/ตำแหน่ง) แยกยากถ้าไม่มีคำกำกับ → ติดป้ายคำไทยทุกที่ที่แสดงภาพ (การ์ด/โจทย์/ไทล์/จับคู่) */
const PIC_KIN=new Set(['哥哥','姐姐','弟弟','妹妹','爷爷','奶奶','爸爸','妈妈','儿子','女儿','孩子','男孩','女孩','老人','一家人','妻子','丈夫','阿姨','叔叔','老师','学生','同学','朋友','医生','先生','小姐','人','经理','校长','护士','服务员','房东','邻居','运动员','空姐','歌手','保安','警察','售货员','司机','冠军','记者','律师','厨师','工程师','会计','裁判','农民','画家','理发师','和尚','宇航员','王子','公主','皇后','皇帝','工人','秘书','兽医']);
/* ภาพที่อ่านยากถ้าไม่มีคำกำกับ → ไม่ใช้เป็นตัวหลอกในโจทย์ "ฟังแล้วเลือกรูป" (ยังใช้เป็นคำตอบ/มีป้ายได้) */
const PIC_HARD=new Set(['电梯','售货员','大','小','快乐','面条','鱼','下雪','头','散步','犹豫','感激','想念','佩服','自豪','道歉','点头','摇','举','挥','伸','指','哈欠','湖','河','草原','汗']);
/* กลุ่มคำที่ภาพคล้าย/ความหมายใกล้กัน → ไม่ใช้เป็นตัวหลอกของกันและกัน (ภาพแยกยาก) */
const PIC_SIM=[['孩子','男孩','女孩','儿子','女儿','弟弟','妹妹','哥哥','姐姐','一家人'],['爷爷','奶奶','老人','爸爸','妈妈'],['妻子','丈夫','太太','先生','小姐','妈妈','爸爸','阿姨','叔叔','姐姐'],['人','老人','男孩','女孩','孩子','朋友','同学','邻居','服务员','经理','校长'],['足球','网球','羽毛球','乒乓球','运动员','冠军','裁判'],['兴奋','紧张','着急','孤单','无聊','得意','吃惊','不耐烦','委屈','失望','好奇','勇敢','害羞','懒','困','笑','哭'],['发烧','咳嗽','打针','吃药','受伤','打喷嚏','健身'],['炒','蒸','做饭','洗碗','饺子','包子','粽子','火锅','烤鸭'],['高铁','汽车','船','飞船','摩天轮','过山车'],['山','森林','岛','桥','爬山','叶子','彩虹'],['窗户','门','窗帘'],['滑梯','秋千','过山车','摩天轮'],['和尚','老师','医生','警察','保安'],['鸟','蜜蜂','蛇','龙'],['饭店','饭馆'],['苹果','水果','西瓜'],['鸡','鸡蛋','肉','羊肉'],['茶','奶茶','咖啡','茶叶','绿茶','红茶','珍珠','吸管'],['牛奶','奶茶','果汁','可乐','啤酒','水','汤'],['早饭','午饭','晚饭','米饭','菜','面条','面包','盘子','碗'],['医生','医院','护士','药','药店','看病','生病'],['学校','学生','教室','图书馆','黑板','课本','字典','书','书包'],['累','睡觉','生病','休息'],['生气','难过','害怕'],['电话','手机'],['雨','云','下雪','下雨','雪','晴天','阴天','太阳'],['月','星星','太阳'],['出租车','公共汽车','火车','自行车','飞机','地铁','火车站','机场','路','堵车'],['热','冷','夏天','冬天'],['春天','夏天','秋天','冬天'],['头','脸','头发','嘴','牙','鼻子','眼睛','耳朵'],['脚','腿','肚子','手'],['照片','照相机','电影','地图','票','菜单'],['走','迷路','跑步','玩','打篮球','踢','骑','篮球'],['洗','刷','洗澡'],['点菜','买单','吃','喝'],['拿','教','关','打扫','搬家','上网','穿'],['楼','家','厨房','房东','搬家'],['公园','银行','超市','商店','药店','饭店'],['游戏','音乐','唱歌','跳舞','电脑','电视'],['行李箱','书包','裤子','衣服','鞋','帽子','伞'],['猫','狗','鱼','蝴蝶'],['花','树','草','春天'],['愤怒','犹豫','倒霉','幸运','胆小鬼','感激','自豪','佩服','想念','道歉','晕','汗','臭','发抖','傻'],['午睡','哈欠','失眠','熬夜','冥想','睡觉','累','休息','睡袋'],['摇','举','挥','伸','指','点头','哈欠','拉','推','敲','拿'],['吹','尝','闻','咬','喊','吃','喝'],['逛','散步','逃','走','跑步','滑冰','划船','滑板'],['洗衣服','拖地','擦','挂','打扮','洗','刷','扫'],['卡车','摩托车','汽车','自行车','出租车','公共汽车','火车','滑板'],['围棋','下棋','扑克','魔术','游戏'],['排球','足球','篮球','网球','羽毛球','乒乓球','进球'],['湖','河','沙漠','草原','山','森林','岛','海','桥'],['体育馆','工厂','宫殿','加油站','阳台','学校','银行','机场'],['王子','公主','皇后','皇帝','工人','秘书','兽医','医生','老师','警察','司机'],['桃','梨','桔子','苹果','水果','西瓜'],['木头','石头','黄金','硬币','竹子'],['叉子','勺子','筷子','碗','盘子'],['壶','盆','瓶子','杯子','袋子','盒子','包裹','笼子','抽屉','花盆','盆栽'],['毛巾','肥皂','牙膏','盆','洗衣服'],['外套','衬衫','裙子','牛仔裤','袜子','皮鞋','腰带','拉链','扣子','裤子','衣服','鞋','帽子','戴'],['豆浆','油条','馒头','煎饼','小笼包','烧饼','包子','饼干','面包','饮料','矿泉水','牛奶','果汁'],['笔','本子','尺子','书','课本','字典'],['狼','松鼠','鸽子','虫子','宠物','猫','狗','鸟','蝴蝶'],['竹子','花盆','盆栽','小麦','树','花','草'],['电池','充电器','麦克风','手电筒','无人机','机器人'],['闪电','太阳能','太阳','云','雨','下雨'],['被子','睡袋','地毯','毛巾'],['锁','盒子','包裹','袋子'],['男人','女人','儿童','姑娘','孩子','男孩','女孩','老人','新郎','新娘','病人','国王','士兵','英雄','老板','教练','导游','游客','导演','小偷','明星'],['光头','辫子','卷发','胡子','假发','头发','吹风机','梳子'],['新郎','新娘','求婚','戒指','派对'],['春','夏','秋','冬','春天','夏天','秋天','冬天','晴','阴'],['晴','阴','下雨','冰雹','风','天空','日落','月亮','云','雨','太阳','银河','闪电','火星','星星'],['冻','融化','冰雹','雪','下雪','冰淇淋'],['纸','布','棉花','文件','信','复印','橡皮','钢笔','文具','胶带','胶水','夹子','笔','本子','尺子'],['光盘','磁带','电台','广播','麦克风','耳机','音乐'],['屏幕','鼠标','电脑','键盘','相机','照相机','三脚架','自拍','电视'],['火柴','烧香','蜡烛','鞭炮','篝火','佛像','寺庙','合十'],['电线','插座','开关','水管','零件','工具','灭火器'],['快递','外卖','救护车','卡车','摩托车','车厢','方向盘','驾驶','红绿灯'],['秤','法律','体重'],['洞','山','山顶','森林','台阶'],['包','塑料袋','行李','行李箱','书包','背包','袋子','垃圾','罐头','货架'],['土豆','白菜','黄瓜','辣椒','西红柿','玉米','蔬菜','花生','粮食'],['葡萄','芒果','香蕉','苹果','水果','梨','桃','桔子','西瓜'],['煎','蘸','锅','烧烤','炒','蒸','豆腐','点心','月饼','盐','糖'],['戒指','项链','太阳镜','手表','耳机','围巾'],['游泳圈','游泳衣','太阳镜','贝壳','冲浪','潜水','游泳','海'],['露营','野餐','度假','旅游','帐篷','篝火','冲浪','潜水'],['手指','舌头','肺','骨头','尾巴','翅膀','肌肉','伤口','输液','头疼','感冒','痒','疫苗','病毒','病人'],['病毒','疫苗','实验','输液','肺'],['听','写','学习','绘画','工作','演讲','毕业'],['买','卖','送','找','递','存钱'],['坐','躺','蹲','起床','睡觉'],['跑','运动','拉伸','放松','太极','功夫','快','慢'],['胖','瘦','重','轻'],['切','砍','摘','捡','栽','浇','扫地','搬','脱','披','扔','撕','撞'],['抱','拥抱','爱','爱心','求婚'],['高兴','伤心','快乐','难过','生气','聪明','饱'],['打电话','电话','手机','广播','电台'],['公司','城市','舞台','表演','京剧','掌声','明星','歌手'],['城墙','园林','小桥','长城','宫殿','塔','寺庙','桥'],['栽','发芽','收获','根','浇','花','树','粮食'],['时间','闹钟','生日','派对','蛋糕']];
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
 /* ลำดับ: คำในคลังบทนี้/คำที่เรียนแล้ว → คำระดับไม่สูงกว่าโจทย์ → ที่เหลือ (เดิมเรียงแค่ระดับ ทำให้คำบทอนาคตในระดับเดียวกันโผล่) */
 const inP=new Set(pool.map(x=>x.zh)),tg=x=>inP.has(x.zh)||isDone(x.lesson)||(x.lv||1)<=(S.assume||0);
 const kn=new Set(lvSoFar().flatMap(l=>l.words||[]).map(x=>x.zh));
 const lvOk=x=>(x.lv||1)<=(w.lv||1),tier=x=>tg(x)?0:kn.has(x.zh)?1:lvOk(x)?2:3;
 const r=[0,1,2,3].flatMap(t=>[...same.filter(x=>tier(x)===t),...oth.filter(x=>tier(x)===t)]);
 /* L2: ไม่เอาตัวเลือกที่พินอินไม่นับวรรณยุกต์ซ้ำ หรือคำไทยหลักซ้ำกับโจทย์/ตัวเลือกอื่น (ฟังไม่ออก/อ่านไทยซ้ำ) */
 const pk=x=>String(x.py||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-züv]/gi,'').toLowerCase(),tk=x=>picLab(x);
 const seenP=new Set([pk(w)]),seenT=new Set([tk(w)]),out=[];
 for(const x of r){if(out.length>=n)break;if(seenP.has(pk(x))||seenT.has(tk(x)))continue;seenP.add(pk(x));seenT.add(tk(x));out.push(x)}
 return out.length>=n?out:[...out,...r.filter(x=>!out.includes(x))].slice(0,n)}
function picQ(w,type,pool){const o=picDist(w,pool,3,type==='aud2pic');if(o.length<3)return makeQ(w,'zh2th',pool);const opts=shuffle([w,...o]);
 return {w,type,pic:true,opts,ans:opts.findIndex(x=>x.zh===w.zh),
  reveal:(ok,qq)=>{const pk=!ok&&qq&&qq.picked!=null?qq.opts[qq.picked]:null;
   return revCard({pic:art('word',w.zh,'','pic-big'),zh:w.zh,py:w.py,th:w.th,pk:pk?`${type==='pic2zh'?'คุณเลือก':'คุณเลือกรูป'}: <span class="zh">${pk.zh}</span> ${pyPlain(pk.py)} = ${pk.th}`:''})}}}
function picMat(ws){const seen=new Set(),ps=shuffle(ws.filter(picHas)).filter(w=>!seen.has(w.th)&&seen.add(w.th)).reduce((acc,w)=>acc.length<4&&!acc.some(x=>picSim(x.zh,w.zh))?[...acc,w]:acc,[]);
 return {w:ps[0],type:'mat',pics:true,ps,right:shuffle(ps.map((_,i)=>i)),reveal:()=>`<div class="ans">${ps.map(w=>`<div class="pic-rv1">${art('word',w.zh,'','pic-mini sm')}<span class="zh" style="font-size:19px">${w.zh}</span> <span style="font-size:13px">${pyHtml(w.py)}</span> = ${w.th}</div>`).join('')}</div>`}}
function picQHtml(q){const w=q.w;
 if(q.type==='pic2zh')return `<div class="center"><div class="cap" style="font-size:14px">ภาพนี้คือคำจีนคำไหน</div><div class="pic-card">${art('word',w.zh,'','pic-big','รูปโจทย์ (ให้เดาคำ)')}${picKin(w)}</div></div>
  <div class="group opts mt20" style="margin-top:18px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span class="zh" style="font-size:26px">${o.zh}</span><span class="pyr">${pyPlain(o.py)}</span></button>`).join('')}</div>`;
 if(q.type==='pic2py')return `<div class="center"><div class="cap" style="font-size:14px">ภาพนี้อ่านว่าอย่างไร (พินอิน)</div><div class="pic-card">${art('word',w.zh,'','pic-big','รูปโจทย์ (ให้เดาคำ)')}${picKin(w)}</div></div>
  <div class="group opts mt20" style="margin-top:18px">${q.opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span><span style="font-size:23px;font-weight:500">${pyPlain(o.py)}</span></button>`).join('')}</div>`;
 return `<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกรูปที่ตรงกัน</div><button class="audio press" aria-label="ฟังเสียง" style="width:84px;height:84px;margin-top:10px" data-act="audio" data-t="${w.zh}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง · ไม่มีตัวอักษรให้เดา</div></div>
  <div class="pgrid">${q.opts.map((o,i)=>`<button class="opt ptile press" data-i="${i}" aria-label="รูปที่ ${LET[i]}"><span class="k">${LET[i]}</span>${art('word',o.zh,'','pic-t')}${picKin(o)}</button>`).join('')}</div>`}

/* ดูรูป → เลือกพินอิน (ขั้นสอนเสริม): ตัวหลอกเป็นคำหมวดเดียวกัน พินอินต้องไม่ซ้ำกัน */
function picPyQ(w,pool){const key=x=>pyPlain(x.py),seen=new Set([key(w)]);
 let o=picDist(w,pool,40,true).filter(x=>!seen.has(key(x))&&seen.add(key(x))).slice(0,3);if(o.length<3)return null;
 const opts=shuffle([w,...o]);
 return {w,type:'pic2py',pic:true,opts,ans:opts.findIndex(x=>x.zh===w.zh),
  reveal:(ok,qq)=>{const pk=!ok&&qq&&qq.picked!=null?qq.opts[qq.picked]:null;
   return revCard({pic:art('word',w.zh,'','pic-big'),zh:w.zh,py:w.py,th:w.th,pk:pk?`คุณเลือก: ${pyPlain(pk.py)} (<span class="zh">${pk.zh}</span> = ${pk.th})`:''})}}}
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
 if(picHas(w)){const hide=!PIC_KIN.has(w.zh),im=art('word',w.zh,'','pic-big','รูปของคำว่า '+picLab(w));
  return {top:hide?`<button class="pic-card hero tap press" data-sa="thai" data-th="${w.th.replace(/"/g,'&quot;')}" aria-label="แตะรูปเพื่อดูคำไทย">${im}<span class="pic-tapchip" aria-hidden="true">แตะรูป · ดูคำไทย</span></button>`:`<div class="pic-card hero">${im}${picKin(w)}</div>`,hide};}
 const e=picEmo(w);if(e)return {top:`<div class="pic-card emo"><span class="pe">${e}</span><span class="pic-badge">อีโมจิชั่วคราว</span></div>`,hide:false};
 return null}
const picCount=L=>L.words.filter(picHas).length;
const picChip=L=>{const n=picCount(L);if(!n)return '';const h=L.words.slice(0,8).filter(picHas).length,t=n-h;
 const where=t===0?' · รอบ 1':h===0?' · รอบ 2':'';
 return `<span class="pic-chip" title="บทนี้มีรูปประกอบ">🖼️ มีรูป ${n}/${L.words.length} คำ${where}</span>`};
