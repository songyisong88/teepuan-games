/* อแดปเตอร์ Supabase สำหรับ sync.js — เรียก Edge Function `line-sync` (โค้ดใน sync/supabase/functions/line-sync)
   anon key เป็นค่าสาธารณะ ส่งไว้เผื่อเปิด verify_jwt · ตัวตนผู้ใช้มาจาก session ที่ฟังก์ชันเซ็นหลังตรวจ LINE ID token แล้วเท่านั้น */
(function(){
const C=window.LAMA_SYNC_CONFIG||{};
const ok=v=>typeof v==='string'&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(v.trim());
const url=()=>C.SUPABASE_URL.replace(/\/$/,'')+'/functions/v1/'+(C.SUPABASE_FN||'line-sync');
async function call(op,body,ses,opt){
 const h={'Content-Type':'application/json'};if(C.SUPABASE_ANON_KEY){h.apikey=C.SUPABASE_ANON_KEY;h.Authorization='Bearer '+C.SUPABASE_ANON_KEY}
 if(ses)h['x-lama-session']=ses;
 const r=await fetch(url(),{method:'POST',headers:h,body:JSON.stringify(Object.assign({op},body||{})),keepalive:!!(opt&&opt.keepalive),credentials:'omit'});
 let j={};try{j=await r.json()}catch(e){}
 if(r.status===409)return Object.assign({conflict:true},j);
 if(!r.ok){const e=new Error(j.error||('เซิร์ฟเวอร์ตอบ '+r.status));e.status=r.status;throw e}return j}
const A={configured:()=>ok(C.SUPABASE_URL||''),
 login:idToken=>call('login',{idToken}),
 pull:ses=>call('pull',{},ses).then(j=>j.state?j:null),
 push:(ses,b,opt)=>call('push',b,ses,opt).then(j=>j.conflict?j:{ok:true,rev:j.rev}),
 remove:ses=>call('delete',{},ses)};
(window.LAMA_SYNC_ADAPTERS=window.LAMA_SYNC_ADAPTERS||{}).supabase=A;
})();
