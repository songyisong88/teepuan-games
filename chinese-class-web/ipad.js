/* iPad / แท็บเล็ต — ทำงานเฉพาะจอ (min-width:700px) and (pointer:coarse) เท่านั้น (คู่กับ ipad.css) มือถือไม่แตะ DOM เลย
   • หน้าแรก: ห่อการ์ด (ยกเว้นหัวทักทาย) ใน .ipcols เพื่อจัดสองคอลัมน์
   • ห้องคำศัพท์: ใส่รายการคลังคำน่ารู้ไว้ช่องซ้าย (.ipl) แตะเพื่อเปลี่ยนห้องด้วย replace() เดิม */
(function(){const mq=matchMedia('(min-width:700px) and (pointer:coarse)');let mo=null;
 function home(){document.querySelectorAll('#stack .screen[data-name=home] .scroller').forEach(sc=>{if(sc.querySelector(':scope>.ipcols'))return;
  const kids=[...sc.children].filter(c=>!c.classList.contains('hg-hello')&&!c.classList.contains('dock'));if(!kids.length)return;
  const w=document.createElement('div');w.className='ipcols';kids[0].before(w);kids.forEach(k=>w.appendChild(k))})}
 function hub(){document.querySelectorAll('#stack .screen[data-name=hubcol]').forEach(el=>{if(el.querySelector(':scope>.ipl'))return;if(typeof SC==='undefined'||!SC.huball)return;
  const s=(typeof stack!=='undefined'&&stack.find(x=>x.el===el))||null;const cur=s&&s.params&&s.params.c;
  const t=document.createElement('div');t.innerHTML=SC.huball().body;const g=t.querySelector('.hb-grp');if(!g)return;
  g.querySelectorAll('[data-go]').forEach(r=>{r.dataset.ipc=r.dataset.c;r.removeAttribute('data-go');if(r.dataset.c===cur){r.classList.add('on');r.setAttribute('aria-current','true')}});
  const a=document.createElement('aside');a.className='ipl';a.setAttribute('aria-label','คลังคำน่ารู้');a.innerHTML='<h2>คลังคำน่ารู้</h2><small>แตะชุดเพื่อเปิดห้องคำศัพท์</small>';a.appendChild(g);
  a.addEventListener('click',e=>{const r=e.target.closest('[data-ipc]');if(!r)return;e.stopPropagation();if(r.dataset.ipc===cur)return;const top=stack[stack.length-1];if(!top||top.el!==el)return;try{vib(6)}catch(_){}replace('hubcol',{c:r.dataset.ipc})});
  el.appendChild(a);const on=g.querySelector('.on');if(on)requestAnimationFrame(()=>{a.scrollTop=Math.max(0,on.offsetTop-a.clientHeight/3)})})}
 function fix(){home();hub()}
 function start(){if(mo)return;const st=document.getElementById('stack');if(!st)return;fix();mo=new MutationObserver(fix);mo.observe(st,{childList:true,subtree:true})}
 function go(){if(mq.matches)start()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
 (mq.addEventListener?mq.addEventListener('change',go):mq.addListener(go))})();
