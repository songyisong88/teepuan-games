/* ล็อกหน้าจอให้นิ่งแบบแอป (ซ้งอี้ขอ 30 ต.ค.): ห้ามซูมด้วยนิ้ว / แตะสองครั้งซูม / iOS ซูมตอนแตะช่องพิมพ์ · ไม่มีเมนูกดค้างที่รูป
   iOS Safari และเบราว์เซอร์ใน LINE ไม่สน user-scalable=no จึงต้องกัน gesture* และ touchmove สองนิ้วด้วย JS */
(function(){
 if(window.__lamaNoZoom)return;window.__lamaNoZoom=1;
 var d=document,VP='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
 var m=d.querySelector('meta[name="viewport"]');
 if(!m){m=d.createElement('meta');m.name='viewport';(d.head||d.documentElement).appendChild(m)}
 if(m.getAttribute('content')!==VP)m.setAttribute('content',VP);
 var pd=function(e){if(e.cancelable)e.preventDefault()},act={passive:false};
 ['gesturestart','gesturechange','gestureend'].forEach(function(t){d.addEventListener(t,pd,act)});
 d.addEventListener('touchmove',function(e){if(e.touches&&e.touches.length>1)pd(e)},act);
 /* แตะสองครั้งเร็ว ๆ บนพื้นที่ที่ไม่ใช่ปุ่ม: กันซูม แล้วส่ง click ให้เองเพื่อให้ยังกดได้ตามปกติ */
 var INTER='a,button,input,select,textarea,label,summary,[role="button"],[data-act],[data-go],[data-sa],.press,[contenteditable]';
 var last=0;
 d.addEventListener('touchend',function(e){var now=Date.now(),quick=now-last<320;last=now;
  if(!quick||e.defaultPrevented||!e.cancelable||!e.changedTouches||e.changedTouches.length!==1)return;
  var t=e.target;if(t&&t.closest&&t.closest(INTER))return;
  e.preventDefault();var p=e.changedTouches[0];
  if(t&&t.dispatchEvent)t.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window,clientX:p.clientX,clientY:p.clientY,screenX:p.screenX,screenY:p.screenY}))},act);
 d.addEventListener('dblclick',pd,act);
 /* ไม่ให้เมนูกดค้าง/ลากรูปออก */
 d.addEventListener('contextmenu',function(e){var t=e.target;if(t&&t.closest&&!t.closest('input,textarea,[contenteditable]'))pd(e)},act);
 d.addEventListener('dragstart',function(e){if(e.target&&e.target.tagName==='IMG')pd(e)},act);
})();
