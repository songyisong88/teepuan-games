/* service worker เล็กๆ — เก็บเฉพาะข้อมูลลำดับขีด (data/stroke/*.json) และตัวตรวจขีด (vendor/hanzi-writer.min.js) ไว้ใช้ออฟไลน์
   ไฟล์อื่นของแอปไม่ถูกแคช (ผ่านไปที่เครือข่ายตามปกติ) เพื่อไม่ให้ค้างเวอร์ชันเก่า */
const CACHE='lama-stk-v1';
/* sw-rev: 2 — เปลี่ยนเลขนี้เมื่ออยากให้ตัวอัปเดตของ service worker ทำงาน (skipWaiting + clients.claim อยู่แล้ว ไฟล์แอปไม่ถูกแคชโดย SW) */
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('lama-stk-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(!/\/data\/stroke\/[0-9a-f]+\.json$/.test(u.pathname)&&!/\/vendor\/hanzi-writer\.min\.js$/.test(u.pathname))return;
 e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}))))});
