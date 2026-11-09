/* เล่ม 2 · ตัวช่วยสร้างการ์ดคำ (ใช้ wcard/syl/rec เดิมของเล่ม 1 ทั้งหมด ไม่เพิ่มรูปแบบหน้าใหม่)
   W(zh,py,th,{s:'qǐng wèn',c:['请','问'],sl:[1]}) · s = พยางค์ตามเสียงจริง (รวมเสียงที่เปลี่ยนของ 一 不) · c = ตัวอักษรของแต่ละพยางค์ (ค่าเริ่มต้นแยกทีละตัว)
   sl = พยางค์ที่ต้องตัดจากเสียงอ่านทั้งคำ (อักษรหลายเสียงอ่าน) · ภาพ: ใช้ภาพ -v2 เป็นภาพหลักสำหรับคำที่วาดใหม่ให้ชัดขึ้น */
const B2V2=new Set(['请问','不好意思','麻烦你','可以','知道','介绍','进','欢迎','希望','早上好','晚上好','晚安','明天见','一会儿见','快乐','骑','走','旅游','离','近','左边','右边','甜','卖','百','千','完','饭店','运动','跑','跑步','游泳','打篮球','踢','觉得','唱歌','跳','跳舞','玩','洗','出','帮助','准备','忙','休息','笑','穿','找','试','送','给','长','快','生病','累','问','回答','问题','懂','告诉','正在','为','让','别']);
const B2CLEAR=new Set(['离','近','左边','右边','百','千','长','饭店']);
const TN=s=>/[āēīōūǖ]/.test(s)?1:/[áéíóúǘ]/.test(s)?2:/[ǎěǐǒǔǚ]/.test(s)?3:/[àèìòùǜ]/.test(s)?4:0;
const TCAP={0:'เสียงเบา',1:'เสียง 1 สูงเรียบ',2:'เสียง 2 ขึ้น',3:'เสียง 3 ลงแล้วขึ้น',4:'เสียง 4 ลงสั้น'};
function W(zh,py,th,o={}){const x=w(zh,py,th,o.img?{img:o.img}:{});x.s=(o.s||py).split(/\s+/);x.c=o.c||[...zh];x.sl=o.sl||[];
 if(!o.img&&B2CLEAR.has(zh))x.img=A2(zh);x.v2=B2V2.has(zh)?A2(zh):x.img;if(!THL[x.v2])THL[x.v2]=th;if(o.nosk)x.nosk=1;return x}
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
