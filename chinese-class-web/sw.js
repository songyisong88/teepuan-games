/* service worker: caches stroke data, hanzi-writer and webp art for offline use. App html/css/js are never cached (no stale versions). */
const CACHE='lama-stk-v1';
const ART='lama-art-v1';/* webp art/mascot/pinroom: cache first, refresh in background */
/* sw-rev: 3 — เปลี่ยนเลขนี้เมื่ออยากให้ตัวอัปเดตของ service worker ทำงาน (skipWaiting + clients.claim อยู่แล้ว ไฟล์แอปไม่ถูกแคชโดย SW) */
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>(k.startsWith('lama-stk-')&&k!==CACHE)||(k.startsWith('lama-art-')&&k!==ART)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(/\/assets\/(art|mascot|pinroom|friends)\/.+\.webp$/.test(u.pathname)){e.respondWith(caches.open(ART).then(c=>c.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>hit||Response.error());return hit||net})));return}
 if(!/\/data\/stroke\/[0-9a-f]+\.json$/.test(u.pathname)&&!/\/vendor\/hanzi-writer\.min\.js$/.test(u.pathname))return;
 e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}))))});
