/* ลิงก์ตรง (deep link) จากหนังสือ / LINE — อ่าน ?go= ตอนเปิดแอป
   go=lesson-<ระดับ>-<ลำดับบท>  เช่น lesson-1-05 = ระดับ 1 บทที่ 5 (นับตามลำดับบนแผนที่ รวมบทเสียงตอน 0 และด่านทบทวน)
   go=lesson-<รหัสบท>          เช่น lesson-1014 หรือ lesson-1014a (รหัสบท/รหัสรอบของแอป)
   go=game-<id>                catch mem speed duel speak listen boss pairs comp build det blitz
   go=book&ch=<เลขบท>         เช่น ?go=book&ch=9 → ห้องเรียนคู่หนังสือ บทที่ 9 (1–32) · ch=s1..s5 นิทานท้ายภาค · ch=q1..q5 แบบทดสอบย่อยภาค · ไม่มี ch/ค่าผิด → หน้าแรกของห้อง
   go=word-<คำจีน>             เช่น word-%E4%BD%A0%E5%A5%BD (你好) → หน้าคำ (ลำดับขีด เสียง ความหมาย)
   from=book                   นับครั้งที่เปิดจากหนังสือไว้ในเครื่องเท่านั้น (localStorage lama-from-book) ไม่ส่งออกไปไหน
   ค่าที่ไม่รู้จัก → อยู่หน้าหลักตามปกติ เงียบ ๆ · ใช้ร่วมกับ ?beta=line และ ?from=line ได้ · อ่านจาก liff.state ด้วย */
(function(){
 function q(k){try{const u=new URLSearchParams(location.search);let v=u.get(k);if(v==null&&u.get('liff.state')){const ls=u.get('liff.state'),i=ls.indexOf('?');v=new URLSearchParams(i>=0?ls.slice(i+1):ls).get(k)}return v}catch(e){return null}}
 const DL_GAMES=['catch','mem','speed','duel','speak','listen','boss','pairs','comp','build','det','blitz'];
 function lvLessons(n){const ch=CHAPTERS.filter(c=>c.lv===n).map(c=>c.id);return LESSONS.filter(l=>l.lv===n).sort((a,b)=>ch.indexOf(a.chapter)-ch.indexOf(b.chapter))}
 function lessonFor(s){let m=/^(\d)-0*(\d{1,3})$/.exec(s);if(m){const ls=lvLessons(+m[1]);return ls[+m[2]-1]||null}
  m=/^(\d+)([a-z])?$/.exec(s);if(m){if(m[2]){const u=unitBy(s);return u?{L:lessonBy(u.lesson),uid:s}:null}return lessonBy(+m[1])||null}return null}
 function resolve(go){if(!go)return null;go=String(go).trim();let m;
  if(/^book$/i.test(go)){if(typeof window.bookDeepLink!=='function')return null;return window.bookDeepLink(String(q('ch')||'').trim().toLowerCase())}
  if((m=/^lesson-(.+)$/i.exec(go))){const r=lessonFor(m[1].toLowerCase());if(!r)return null;const L=r.L||r;const us=UNITS.filter(u=>u.lesson===L.id);if(!us.length)return null;
   const uid=r.uid||(us.find(u=>!unitDone(u.id))||us[us.length-1]).id;return()=>{mountRoot('book',false);setTimeout(()=>unitSheet(uid),250)}}
  if((m=/^game-([a-z]+)$/i.exec(go))){const g=m[1].toLowerCase();if(!DL_GAMES.includes(g))return null;
   return()=>{mountRoot('game',false);if(!gamesOpen()&&['build','det','blitz'].indexOf(g)<0)return;setTimeout(()=>{if(['build','det','blitz'].includes(g))GOX.radplay({dataset:{g}});else playGame(g)},250)}}
  if((m=/^word-(.+)$/i.exec(go))){let w=m[1];try{w=decodeURIComponent(w)}catch(e){}w=w.trim();if(!wordBy(w))return null;return()=>push('stroke',{w})}
  return null}
 function fromBook(){if(q('from')!=='book')return;try{const k='lama-from-book',n=(+localStorage.getItem(k)||0)+1;localStorage.setItem(k,String(n))}catch(e){}}
 function run(){fromBook();let fn=null;try{fn=resolve(q('go'))}catch(e){fn=null}if(!fn)return;
  const ready=()=>!document.querySelector('.welcome')&&S.seenWelcome&&S.seenOnboard&&!window.__obRun;
  const go=()=>{try{fn()}catch(e){console.warn('deeplink',e)}};
  if(ready())return go();
  /* ผู้ใช้ใหม่: ให้ผ่านหน้าต้อนรับ/ปฐมนิเทศตามปกติก่อน แล้วค่อยพาไปตามลิงก์ */
  let t=0;const iv=setInterval(()=>{if(++t>3600)return clearInterval(iv);if(ready()){clearInterval(iv);setTimeout(go,900)}},500)}
 window.dlResolve=resolve;
 document.addEventListener('DOMContentLoaded',()=>setTimeout(run,0));
})();
