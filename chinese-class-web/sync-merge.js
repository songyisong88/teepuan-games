/* รวมความคืบหน้า 2 ชุด (เครื่องนี้ + คลาวด์) แบบไม่ทำข้อมูลหาย — ฟังก์ชันบริสุทธิ์ ใช้ได้ทั้งในเบราว์เซอร์และ Node (ทดสอบ)
   หลัก: ตัวเลข → ค่ามากกว่า · อาร์เรย์ → รวมไม่ซ้ำ · ออบเจกต์ → รวมทีละคีย์ · boolean → true ชนะ · ข้อความ/ค่าอื่น → ฝั่งที่แก้ล่าสุด
   เหรียญใช้สมุดต่อเครื่อง (coinLog) ถ้ามี — กันเหรียญที่ใช้ไปแล้วเด้งกลับ
   ข้อยกเว้นเฉพาะคีย์ (ดู RULES) เช่น สตรีคยึดฝั่งที่เรียนล่าสุด, ออบเจกต์ที่มี day/wk ยึดฝั่งที่ใหม่กว่า, การตั้งค่ายึดฝั่งที่แก้ล่าสุด */
(function(root){
const isObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const clone=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v));
/* การตั้งค่า/ตัวเลือกของผู้ใช้ → ยึดฝั่งที่แก้ล่าสุดทั้งก้อน (ไม่ใช่ max) */
const NEWER=new Set(['name','goal','remind','remindAt','plan','interest','level','lvPicked','eq','buddy','placeRes','from','cardTheme','shift','dvNote','assume','mode']);
/* ค่าตัวตนที่ควรคงที่ข้ามเครื่อง → ยึดคลาวด์ (บัญชีเดิม) */
const KEEP_CLOUD=new Set(['inviteCode']);
function unionArr(a,b,newerFirst){const out=[],seen=new Set();for(const v of (newerFirst?[...b,...a]:[...a,...b])){const k=typeof v==='object'?JSON.stringify(v):typeof v+':'+v;if(!seen.has(k)){seen.add(k);out.push(clone(v))}}return out}
/* m(a=เครื่องนี้, b=คลาวด์, aNewer=เครื่องนี้แก้ล่าสุดหรือไม่, key, path) */
function m(a,b,aNewer,key,path){
 if(a===undefined)return clone(b);if(b===undefined)return clone(a);
 const newer=aNewer?a:b;
 if(KEEP_CLOUD.has(key))return clone(b);
 if(NEWER.has(key)&&path.length<=2)return clone(newer);
 if(typeof a==='number'&&typeof b==='number')return Math.max(a,b);
 if(typeof a==='boolean'&&typeof b==='boolean')return a||b;
 if(Array.isArray(a)&&Array.isArray(b)){
  const u=unionArr(a,b,!aNewer);
  if(key==='rec')return u.slice(0,Math.max(a.length,b.length,12)); /* รายการล่าสุด: จำกัดความยาว */
  return u}
 if(isObj(a)&&isObj(b)){
  /* ออบเจกต์รายวัน/รายสัปดาห์ (cnt, mis, boss, lg …): ฝั่งที่ day/wk ใหม่กว่าชนะทั้งก้อน */
  for(const f of ['day','wk']){if(typeof a[f]==='number'&&typeof b[f]==='number'&&a[f]!==b[f])return clone(a[f]>b[f]?a:b)}
  const o={};for(const k of new Set([...Object.keys(a),...Object.keys(b)]))o[k]=m(a[k],b[k],aNewer,k,path.concat(k));
  if(key==='boss'&&typeof a.hp==='number'&&typeof b.hp==='number')o.hp=Math.min(a.hp,b.hp); /* วันเดียวกัน: เลือดบอสที่ตีไปมากกว่า */
  return o}
 return clone(newer)}
/* local/cloud = ออบเจกต์ S ทั้งก้อน · tLocal/tCloud = เวลาแก้ล่าสุด (ms) */
function mergeState(local,cloud,tLocal,tCloud){
 local=isObj(local)?local:{};cloud=isObj(cloud)?cloud:{};
 const aNewer=(tLocal||0)>=(tCloud||0);
 const o=m(local,cloud,aNewer,'',[]);
 /* สตรีค: ยึดฝั่งที่เรียนวันล่าสุด (lastDay มากกว่า) วันเดียวกันใช้สตรีคที่ยาวกว่า */
 const la=local.lastDay,lb=cloud.lastDay;
 if(typeof la==='number'&&typeof lb==='number'){
  if(la!==lb){const w=la>lb?local:cloud;o.lastDay=w.lastDay;o.streak=w.streak}
  else{o.lastDay=la;o.streak=Math.max(local.streak||0,cloud.streak||0)}
  o.bestStreak=Math.max(o.bestStreak||0,o.streak||0,local.streak||0,cloud.streak||0)}
 /* เหรียญ: ถ้ามีสมุดเหรียญ (coinLog) ฝั่งใดฝั่งหนึ่ง → base ใช้ค่ามาก, ตัวนับ e/s ต่อเครื่องใช้ค่ามาก (เพิ่มอย่างเดียว)
    แล้วคำนวณ coins = base + Σ(e−s) · ฝั่งที่ยังไม่มีสมุดถือว่า base = เหรียญที่มีอยู่ */
 if(isObj(local.coinLog)||isObj(cloud.coinLog)){
  const lg=x=>isObj(x.coinLog)?x.coinLog:{base:typeof x.coins==='number'?x.coins:0,d:{}};
  const A=lg(local),B=lg(cloud),d={};
  for(const k of new Set([...Object.keys(A.d||{}),...Object.keys(B.d||{})])){const x=(A.d||{})[k]||{},y=(B.d||{})[k]||{};d[k]={e:Math.max(x.e||0,y.e||0),s:Math.max(x.s||0,y.s||0)}}
  const base=Math.max(A.base||0,B.base||0);let c=base;for(const k in d)c+=d[k].e-d[k].s;
  o.coinLog={base,d};o.coins=Math.max(0,c)}
 return o}
const api={mergeState,_m:m};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LamaMerge=api;
})(typeof window!=='undefined'?window:globalThis);
