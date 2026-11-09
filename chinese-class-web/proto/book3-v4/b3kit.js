/* เล่ม 3 (สร้างด้วย mkkit.py) · ตัวช่วยสร้างการ์ดคำ (ใช้ wcard/syl/rec เดิมของเล่ม 1 ทั้งหมด ไม่เพิ่มรูปแบบหน้าใหม่)
   W(zh,py,th,{s:'qǐng wèn',c:['请','问'],sl:[1]}) · s = พยางค์ตามเสียงจริง (รวมเสียงที่เปลี่ยนของ 一 不) · c = ตัวอักษรของแต่ละพยางค์ (ค่าเริ่มต้นแยกทีละตัว)
   sl = พยางค์ที่ต้องตัดจากเสียงอ่านทั้งคำ (อักษรหลายเสียงอ่าน) · ภาพ: ใช้ภาพ -v2 เป็นภาพหลักสำหรับคำที่วาดใหม่ให้ชัดขึ้น */
const B3V2=new Set(["一会儿见", "上网", "不好意思", "不客气", "不用", "为", "习惯", "买", "买单", "介绍", "休息", "会", "住", "你好", "借", "做", "健康", "关", "关心", "兴趣", "再见", "写", "冷", "准备", "出", "别", "努力", "医院", "千", "卖", "参加", "发烧", "叫", "可乐", "可以", "右边", "同意", "听", "告诉", "哪儿", "唱歌", "商店", "啤酒", "喂", "喜欢", "喝", "回", "回答", "坐", "复习", "外带", "大", "奇怪", "好吃", "姑姑", "学习", "学校", "完", "完成", "害怕", "家", "对不起", "小", "工作", "左边", "希望", "带", "帮助", "帮忙", "开", "往", "忙", "快", "快乐", "想", "感冒", "愿意", "懂", "打电话", "打篮球", "找", "担心", "换", "接", "搬", "教", "敢", "旅游", "早上好", "明天见", "明白", "晚", "晚上好", "晚安", "有", "来", "欢迎", "正在", "没关系", "洗", "洗澡", "渴", "游泳", "满意", "漂亮", "激动", "热情", "照顾", "爱", "爱好", "玩", "珍珠", "甜", "生气", "生病", "用", "画", "疼", "瘦", "百", "相信", "看", "看见", "着急", "睡觉", "知道", "短", "离", "穿", "突然", "笑", "等", "糖", "累", "终于", "经过", "给", "聪明", "胖", "能", "舅舅", "行李", "表演", "见面", "觉得", "认识", "让", "讲", "试", "说", "请", "请问", "读", "谢谢", "走", "起床", "跑", "跑步", "跟", "跳", "跳舞", "踢", "运动", "近", "这", "进", "迟到", "迷路", "送", "那", "重", "锻炼", "长", "问", "问题", "难", "难过", "需要", "饭店", "饿", "骑", "高兴", "麻烦你"]);
const B3CLEAR=new Set(["离", "近", "左边", "右边", "百", "千", "长", "饭店", "短", "行李"]);
const TN=s=>/[āēīōūǖ]/.test(s)?1:/[áéíóúǘ]/.test(s)?2:/[ǎěǐǒǔǚ]/.test(s)?3:/[àèìòùǜ]/.test(s)?4:0;
const TCAP={0:'เสียงเบา',1:'เสียง 1 สูงเรียบ',2:'เสียง 2 ขึ้น',3:'เสียง 3 ลงแล้วขึ้น',4:'เสียง 4 ลงสั้น'};
function W(zh,py,th,o={}){const x=w(zh,py,th,o.img?{img:o.img}:{});x.s=(o.s||py).split(/\s+/);x.c=o.c||[...zh];x.sl=o.sl||[];
 if(!o.img&&B3CLEAR.has(zh))x.img=A2(zh);x.v2=B3V2.has(zh)?A2(zh):x.img;if(!THL[x.v2])THL[x.v2]=th;if(o.nosk)x.nosk=1;return x}
/* ภาพที่ไม่มีลามะ (ใช้ในตัวเลือกภาพและการ์ดสถานการณ์ ที่อาจมีลามะตัวอื่นอยู่บนจอแล้ว) */
const NL=x=>x.v2||x.img;
/* การ์ดคำ + แตะทีละพยางค์ */
function WC(x,no,of,o={}){const S=x.s,T=S.map(TN),n=S.length;
 const aid=n===1?{parts:[S[0],T[0]],cap:TCAP[T[0]]}:{parts:S.flatMap((s,i)=>[s,T[i]]),cap:T.map(t=>t?'เสียง '+t:'เบา').join(' + ')};
 const st=[wcard({no,of,cap:o.cap,w:x,aid:o.aid||aid,hint:o.hint,sk:x.nosk?undefined:'fs:'+x.zh,use:o.use,ex:o.ex,tag:o.tag})];
 if(n>1&&!o.nosyl){const chars=S.map((s,i)=>{const t=T[i];const c={zh:x.c[i],py:s,t};if(x.sl.includes(i))c.k=`sy:${x.zh}#${i}/${n}`;else if(t)c.k='sy:'+x.c[i];return c});
  st.push(syl({n:`คำที่ ${no}/${of}`,w:x,chars,done:S.map((s,i)=>T[i]?s:s+' เบา').join(' + ')+' = '+x.py}))}
 return st}
/* อัดเสียงเทียบ 2 คำ: คำที่ 2 ใช้ภาพไม่มีลามะ */
function RC(n,ws){return rec({n,ws:ws.map((x,i)=>i?Object.assign({},x,{img:NL(x)}):x)})}
/* ตัวละครประจำเล่ม (ต่อจากเล่ม 1): คุณ = 玛莉 มะลิ · 王明 เพื่อนผู้ชาย · 李娜 เพื่อนผู้หญิง */
Object.assign(WHO,{f:{n:'หวังหมิง',img:ART('男孩')},g:{n:'หลี่น่า',img:ART('女孩')}});

/* เล่ม 3: กระจายตำแหน่งคำตอบที่ถูก (ข้อมูลบทเรียนเขียนคำตอบไว้ตัวเลือกแรก ตัวช่วยนี้ย้ายไปตำแหน่งที่ใช้น้อยที่สุดในบท
   เลือกตำแหน่งเท่ากันด้วย seed จากเนื้อหาข้อ ผลคงที่ทุกครั้ง) · ตัวเลือกใน reply ใช้เสียงมะลิ (-f) ทุกตัว · ไม่แก้ engine.js */
const B3N={};
function b3h(s){let h=2166136261;for(const c of String(s)){h^=c.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0}
function b3bal(o){if(!o||!Array.isArray(o.opts)||o.opts.length<2||typeof o.ans!=='number')return o;
 const n=o.opts.length,h=b3h(JSON.stringify([o.k||'',o.q||'',o.s||'',o.opts]));let best=[],m=1e9;
 for(let i=0;i<n;i++){const c=B3N[i]||0;if(c<m){m=c;best=[i]}else if(c===m)best.push(i)}
 const t=best[h%best.length];B3N[t]=(B3N[t]||0)+1;
 const cor=o.opts[o.ans],rest=o.opts.filter((_,i)=>i!==o.ans),r=(h>>>8)%Math.max(1,rest.length),rr=rest.slice(r).concat(rest.slice(0,r));
 return Object.assign({},o,{opts:[...rr.slice(0,t),cor,...rr.slice(t)],ans:t})}
const b3f=x=>x&&typeof x.k==='string'&&/-[mgt]$/.test(x.k)?Object.assign({},x,{k:x.k.replace(/-([mgt])$/,'$1-f')}):x;
let B3IN=0;const B3ASK=ask,B3BLANK=blank,B3TF=tf,B3REPLY=reply,B3POINT=point;
ask=o=>B3IN?B3ASK(o):B3ASK(b3bal(o));
blank=o=>{const b=b3bal(o);B3IN++;try{return B3BLANK(b)}finally{B3IN--}};
tf=o=>{B3IN++;try{return B3TF(o)}finally{B3IN--}};
reply=o=>B3REPLY(b3bal(Object.assign({},o,{opts:(o.opts||[]).map(b3f)})));
/* แตะภาพ: สลับลำดับรอบด้วย seed ไม่ให้คำตอบเรียง 0 1 2 3 */
point=o=>{const R=(o.rounds||[]).slice(),h=b3h(JSON.stringify(R.map(r=>r.k)));
 for(let i=R.length-1;i>0;i--){const j=b3h(h+':'+i)%(i+1);[R[i],R[j]]=[R[j],R[i]]}
 if(R.length>1&&R.every((r,i)=>i===0||R[i-1].ans<r.ans))R.push(R.shift());
 return B3POINT(Object.assign({},o,{rounds:R}))};
