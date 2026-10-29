/* แกนหลัก: นำทาง (push/pop), sheet, toast, เอฟเฟกต์, ไอคอน, หน้าแท็บ */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const vib=ms=>{try{const ua=navigator.userActivation;if(ua&&!ua.hasBeenActive)return;navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};
const IC={
 home:'<path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/>',
 book:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',
 game:'<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M8 10.5v4M6 12.5h4"/><circle cx="15.5" cy="11.5" r=".6"/><circle cx="17.8" cy="13.5" r=".6"/>',
 rank:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5.5H5v1.5a3 3 0 0 0 3 3M16 5.5h3v1.5a3 3 0 0 1-3 3"/><path d="M12 13v4.5M8.5 20.5h7M10 17.5h4"/>',
 know:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/><path d="M12 7v3l1.6 1.6"/>',
 me:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c0-4 3.3-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/>'};
const TABS=[['home','หน้าหลัก'],['book','บทเรียน'],['know','แหล่งความรู้'],['game','เกม'],['me','ฉัน']];
const svg=(p,w=22,extra='')=>`<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const SPK=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/></svg>`;
const FLAME=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c.5 4 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2 1-3.5 2-4.5 0 2 .8 3 2 3.2C10 9.5 10.500 6 12 3z"/></svg>`;
const COIN=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M9.5 10h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" stroke-width="1.5"/></svg>`;
const CHECK=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const LOCK=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;
const CHEV=`<svg class="chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>`;
const BACKI=`<svg viewBox="0 0 14 22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2L3 11l8 9"/></svg>`;
const chips=()=>`${lvBadge()}<span class="chip press" data-go="streak">${'<span style="display:flex">'+FLAME.replace('<svg','<svg width="16" height="16"')+'</span>'}<span id="cs">${curStreak()}</span></span><span class="chip coin press" data-go="shop"><span style="display:flex">${COIN.replace('<svg','<svg width="16" height="16"')}</span><span id="cc">${S.coins}</span></span>`;
const M=(n,cls='')=>`<img class="mas ${cls}" loading="lazy" decoding="async" src="assets/mascot/${n}.webp" alt="" draggable="false" onerror="this.onerror=null;this.src='assets/mascot/wave.webp'">`;
/* ช่องภาพประกอบ: ใช้รูปเมื่อมีทะเบียนใน assets/art/index.js ไม่งั้นถอยไปอีโมจิ (หรือไม่แสดง) */
function art(kind,id,emoji,cls,alt){const k=kind+'/'+id,on=window.ART_IDX&&window.ART_IDX[k];if(!on)return emoji?`<span class="art ${cls||''}">${emoji}</span>`:'';return `<span class="art has ${cls||''}"><img src="assets/art/${kind}/${encodeURIComponent(id)}.webp" alt="${(alt||'').replace(/"/g,'&quot;')}" loading="lazy" decoding="async" draggable="false" onerror="this.parentNode.classList.remove('has');this.outerHTML='${emoji||''}'"></span>`}
function llama(pose,size,{acc=false,cls='',style=''}={}){let a='';if(acc){for(const slot of ['hat','face']){const id=S.eq[slot];const it=SHOP.find(s=>s.id===id);if(it){const p=ACC[slot];a+=`<span class="acc" style="left:${p.left};top:${p.top};font-size:${Math.round(size*p.size)}px">${it.e}</span>`}}}
 return `<div class="llama ${cls}" style="width:${size}px;height:${size}px;${style}">${M(pose)}${a}</div>`}

/* ---------- เสียง (speechSynthesis zh-CN) ---------- */
let zhVoice=null;
function pickVoice(){try{const vs=speechSynthesis.getVoices();zhVoice=vs.find(v=>/zh[-_]CN/i.test(v.lang))||vs.find(v=>/^zh/i.test(v.lang))||null}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
/* เสียง: mp3 จริง (สร้างจากเสียงสังเคราะห์) ถ้าไม่มีไฟล์/เล่นไม่ได้ ค่อยถอยไปใช้เสียงอ่านของเบราว์เซอร์ */
let curAudio=null,seqTok=0;
const audioUrl=(t,role)=>{const h=window.AUDIO_INDEX&&AUDIO_INDEX[(role==='f'?'f|':'')+t];return h?'audio/'+h+'.mp3':null};
function stopAudio(){seqTok++;try{curAudio&&curAudio.pause()}catch(e){}curAudio=null;try{speechSynthesis.cancel()}catch(e){}}
function playOne(t,role,done){const tts=()=>{try{const u=new SpeechSynthesisUtterance(t);u.lang='zh-CN';u.rate=.8;if(role==='f')u.pitch=1.25;if(zhVoice)u.voice=zhVoice;u.onend=u.onerror=()=>done&&done();speechSynthesis.speak(u)}catch(e){done&&done()}};
 const url=audioUrl(t,role);if(!url){tts();return}let fell=false;const fb=()=>{if(!fell){fell=true;tts()}};
 try{const a=new Audio(url);curAudio=a;a.onended=()=>done&&done();a.onerror=fb;const p=a.play();if(p&&p.catch)p.catch(fb)}catch(e){fb()}}
function speak(t,btn,role,done){vib(8);if(btn){btn.classList.remove('playing');void btn.offsetWidth;btn.classList.add('playing')}stopAudio();try{bumpCnt('audio',1)}catch(e){}playOne(t,role||(btn&&btn.dataset&&btn.dataset.r)||'',done)}
function speakSeq(items){stopAudio();const tok=seqTok;let i=0;const step=()=>{if(tok!==seqTok||i>=items.length)return;const it=items[i++];playOne(it.t,it.r,()=>setTimeout(step,250))};step()}

/* ---------- toast / xp / confetti ---------- */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2300)}
function floatXp(txt,el){const f=$('#frame'),fr=f.getBoundingClientRect();const r=el?el.getBoundingClientRect():{left:fr.left+fr.width/2,top:fr.top+fr.height/2,width:0,height:0};
 const d=document.createElement('div');d.className='xpf';d.textContent=txt;d.style.left=(r.left-fr.left+r.width/2-24)+'px';d.style.top=(r.top-fr.top+r.height/2-10)+'px';f.appendChild(d);setTimeout(()=>d.remove(),1200)}
let fxRun=false;
function confetti(n=90){const cv=$('#fx'),f=$('#frame');cv.width=f.clientWidth;cv.height=f.clientHeight;const c=cv.getContext('2d');
 const cols=['#C8102E','#27211E','#E8B64A','#5E9B7A','#fff','#C9774A'];
 const ps=Array.from({length:n},()=>({x:cv.width/2+(Math.random()-.5)*60,y:cv.height*.38,vx:(Math.random()-.5)*11,vy:-Math.random()*13-3,r:Math.random()*6.28,vr:(Math.random()-.5)*.4,s:5+Math.random()*6,c:cols[Math.random()*cols.length|0]}));
 let k=0;fxRun=true;(function step(){c.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);c.restore()});if(++k<130)requestAnimationFrame(step);else c.clearRect(0,0,cv.width,cv.height)})()}
function bumpChips(){['cs','cc'].forEach(id=>{$$('#'+id).forEach(e=>{e.textContent=id==='cs'?curStreak():S.coins;e.parentElement.classList.remove('bump');void e.offsetWidth;e.parentElement.classList.add('bump')})})}

/* ---------- ให้รางวัล ---------- */
function addXp(n,el,pre){if(n<=0)return false;if(!pre)n=evX(n);S.xp+=n;S.xpDay[today()]=dayXp()+n;const first=touchStreak();save();if(el)floatXp('+'+n+' XP',el);if(first){setTimeout(()=>{toast('🔥 สตรีควันที่ '+S.streak+' แล้ว!');vib([20,40,20])},400)}try{buddyTick()}catch(e){}try{badgeSoon()}catch(e){}return first}
function addCoins(n,pre){if(n>0&&!pre)n=evC(n);S.coins+=n;S.coinsEarned+=Math.max(0,n);save();bumpChips()}

/* ---------- นำทาง ---------- */
let stack=[],curTab='home',tabScroll={};
const SC={};
const frame=()=>$('#frame');
function navHtml(r,root){return `<header class="nav"><div class="nav-l">${root?'':`<button class="back" data-act="back">${BACKI}<span>${r.backLabel||'กลับ'}</span></button>`}</div><div class="nav-t">${r.title||''}</div><div class="nav-r">${r.right===undefined?(root?chips():''):r.right}</div></header>`}
function build(name,params,root){const def=SC[name];if(!def)throw new Error('no screen '+name);const r=def(params||{});const el=document.createElement('section');el.className='screen '+(root?'root':'pushed');el.dataset.name=name;
 el.innerHTML=(r.nav!==undefined?r.nav:navHtml(r,root))+`<div class="scroller">${r.body}</div>${r.extra||''}`;
 const sc=$('.scroller',el);sc.addEventListener('scroll',()=>el.classList.toggle('collapsed',sc.scrollTop>(r.collapseAt||34)),{passive:true});
 return {el,name,params:params||{},r}}
const anim=(el,k,o)=>el.animate(k,Object.assign({duration:430,easing:'cubic-bezier(.32,.72,0,1)',fill:'both'},o));
function mountRoot(tab,fade=true){const names={home:'home',book:'path',know:'know',game:'games',rank:'rank',me:'me'};
 if(stack[0]){const sc=$('.scroller',stack[0].el);tabScroll[curTab]=sc?sc.scrollTop:0;}
 stack.forEach(s=>{try{s.r.unmount&&s.r.unmount()}catch(e){}});stack.forEach(s=>s.el.remove());stack=[];$$('#stack>.screen').forEach(e=>e.remove());
 curTab=tab;const s=build(names[tab],{},true);$('#stack').appendChild(s.el);stack=[s];
 $('.scroller',s.el).scrollTop=tabScroll[tab]||0;if(fade)anim(s.el,[{opacity:.0},{opacity:1}],{duration:200,easing:'ease-out',fill:'none'});
 $$('.tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===tab));s.r.mount&&s.r.mount(s.el);$('#tabbar').style.display='flex'}
/* ---- การเปลี่ยนหน้าแบบ iOS: สถานะมาจากตำแหน่งใน stack (class .under/.deep) + CSS transition เท่านั้น
   ไม่ใช้ WAAPI fill:both ค้างบน element (สาเหตุเดิมของหน้าค้างเลื่อนซ้าย/ซ้อนทับเมื่อกดกลับถี่ ๆ) ---- */
const NAV_MS=430;
/* iOS Safari: scrollIntoView/focus เลื่อน overflow:hidden ของ #frame ได้ ทำให้ทั้งแอปเลื่อนซ้าย/ขวา → รีเซ็ตกลับ 0 เสมอ */
(function(){const fix=()=>{const f=document.getElementById('frame');if(f&&(f.scrollLeft||f.scrollTop)){f.scrollLeft=0;f.scrollTop=0}const r=document.scrollingElement;if(r&&(r.scrollLeft||r.scrollTop)){r.scrollLeft=0;r.scrollTop=0}};
 document.addEventListener('scroll',fix,{capture:true,passive:true});window.addEventListener('resize',fix);window.addEventListener('orientationchange',fix);
 document.addEventListener('focusout',()=>setTimeout(fix,60),true)})();
function syncStack(){stack.forEach((s,i)=>{const d=stack.length-1-i;s.el.classList.toggle('under',d===1);s.el.classList.toggle('deep',d>1);s.el.classList.remove('leaving');if(d>0){s.el.setAttribute('aria-hidden','true');s.el.inert=true}else{s.el.removeAttribute('aria-hidden');s.el.inert=false}});
 $$('#stack>.screen').forEach(e=>{if(!stack.some(s=>s.el===e)&&!e.classList.contains('leaving'))e.remove()})}
function leaveEl(el,tf){el.classList.add('leaving');el.inert=true;el.style.transition='';void el.offsetWidth;if(tf)el.style.transform=tf;let done=false;const rem=()=>{if(done)return;done=true;el.remove()};el.addEventListener('transitionend',e=>{if(e.target===el&&e.propertyName==='transform')rem()});setTimeout(rem,NAV_MS+140)}
function push(name,params){const s=build(name,params,false);const el=s.el;el.style.transition='none';el.style.transform='translateX(100%)';$('#stack').appendChild(el);stack.push(s);vib(6);
 void el.offsetWidth;el.style.transition='';el.style.transform='';syncStack();s.r.mount&&s.r.mount(el);return s}
function pop(){if(stack.length<2)return;const top=stack.pop(),prev=stack[stack.length-1];try{top.r.unmount&&top.r.unmount()}catch(e){}
 leaveEl(top.el,'translateX(100%)');syncStack();
 if(prev.r.onShow)prev.r.onShow(prev.el);else refresh()}
function replace(name,params){const old=stack.pop();try{old.r.unmount&&old.r.unmount()}catch(e){}const s=build(name,params,false);s.el.style.zIndex=11;$('#stack').appendChild(s.el);stack.push(s);
 anim(s.el,[{opacity:0,transform:'translateY(24px) scale(.98)'},{opacity:1,transform:'none'}],{duration:480,fill:'none'});leaveEl(old.el,'');syncStack();s.r.mount&&s.r.mount(s.el);return s}
function popToRoot(){while(stack.length>2)stack.pop().el.remove();pop()}
/* swipe-back จากขอบซ้าย: หน้าตามนิ้ว หน้าล่างขยับ parallax ปล่อยแล้วตัดสินด้วยระยะ/ความเร็ว */
(function(){let g=null;const EDGE=26;
 const frame=()=>document.getElementById('frame');
 document.addEventListener('touchstart',e=>{g=null;if(stack.length<2||e.touches.length!==1)return;if(document.querySelector('#sheetLayer.on,.welcome,.onb'))return;if(!stack[stack.length-1].el.querySelector('[data-act=back]'))return;const fr=frame().getBoundingClientRect(),t=e.touches[0];if(t.clientX-fr.left>EDGE||t.clientX<fr.left)return;
  g={x:t.clientX,y:t.clientY,t:Date.now(),w:fr.width,mode:null,dx:0,top:stack[stack.length-1],prev:stack[stack.length-2],lx:t.clientX,lt:Date.now(),v:0}},{passive:true,capture:true});
 document.addEventListener('touchmove',e=>{if(!g)return;const t=e.touches[0],dx=t.clientX-g.x,dy=t.clientY-g.y;
  if(!g.mode){if(Math.abs(dx)<7&&Math.abs(dy)<7)return;if(dx>0&&Math.abs(dx)>Math.abs(dy)*1.2){g.mode='x';g.top.el.style.transition='none';g.prev.el.style.transition='none'}else{g=null;return}}
  e.preventDefault();const now=Date.now();if(now>g.lt){g.v=(t.clientX-g.lx)/(now-g.lt)}g.lx=t.clientX;g.lt=now;
  const x=Math.max(0,dx),p=Math.min(1,x/g.w);g.dx=x;g.top.el.style.transform='translateX('+x+'px)';g.prev.el.style.transform='translateX('+(-26*(1-p))+'%)';g.prev.el.style.setProperty('--dim',(.1*(1-p)).toFixed(3))},{passive:false,capture:true});
 const end=()=>{if(!g||g.mode!=='x'){g=null;return}const o=g;g=null;const p=o.dx/o.w,go=p>.4||(o.v>.45&&o.dx>24);
  o.top.el.style.transition='';o.prev.el.style.transition='';void o.top.el.offsetWidth;
  o.prev.el.style.transform='';o.prev.el.style.removeProperty('--dim');
  if(go){vib(6);pop()}else{o.top.el.style.transform=''}};
 document.addEventListener('touchend',end,{passive:true,capture:true});document.addEventListener('touchcancel',end,{passive:true,capture:true});
 document.addEventListener('touchstart',()=>{},{passive:true})/* ให้ :active ทำงานบน iOS Safari ทันที */})();
function refresh(){const t=stack[stack.length-1];if(!t||!SC[t.name]||t.r.noRefresh)return;const r=SC[t.name](t.params);const sc=$('.scroller',t.el);const y=sc.scrollTop;sc.style.scrollBehavior='auto';sc.innerHTML=r.body;sc.scrollTop=y;sc.style.scrollBehavior='';
 const n=$('.nav',t.el);if(n&&r.nav===undefined){const rt=$('.nav-r',n);if(rt)rt.innerHTML=r.right===undefined?(stack.length===1?chips():''):r.right}t.r=r;r.mount&&r.mount(t.el)}

/* ---------- sheet ---------- */
let sheetOpen=null;
function openSheet(html,{onMount,onClose,title}={}){closeSheet(true);const L=$('#sheetLayer');L.innerHTML=`<div class="bd" data-act="closesheet"></div><div class="sheet"><div class="sh-head"><div class="grabber"></div>${title?`<div class="sh-t" style="padding-left:0">${title}</div>`:''}</div><div class="sh-body">${html}</div></div>`;
 L.classList.add('on');const sh=$('.sheet',L);requestAnimationFrame(()=>requestAnimationFrame(()=>sh.classList.add('show')));sheetOpen={onClose};vib(8);
 /* ลากลงเพื่อปิด: จับที่หัวชีท หรือที่เนื้อหาเมื่อเลื่อนอยู่บนสุด; ชีทตามนิ้ว พื้นหลังจางตาม; ปล่อยแล้วดูระยะ/ความเร็ว */
 const bd=$('.bd',L);let y0=null,dy=0,t0=0,v=0,ly=0,lt=0,src=null,on=false;const body=$('.sh-body',sh);
 const begin=(y,from)=>{y0=y;dy=0;v=0;ly=y;lt=Date.now();src=from;on=false};
 const move=(y,e)=>{if(y0===null)return;const d=y-y0;if(!on){if(src==='body'){if(d<=6||body.scrollTop>0){if(body.scrollTop>0)y0=y;return}}on=true;sh.classList.add('drag');bd.style.transition='none'}
  if(e&&e.cancelable)e.preventDefault();const now=Date.now();if(now>lt)v=(y-ly)/(now-lt);ly=y;lt=now;dy=Math.max(0,d)*(d>0?1:0);sh.style.transform='translateY('+dy+'px)';bd.style.opacity=Math.max(0,1-dy/Math.max(sh.offsetHeight,1)).toFixed(3)};
 const up=()=>{if(y0===null)return;const was=on;y0=null;on=false;if(!was)return;sh.classList.remove('drag');bd.style.transition='';const close=dy>Math.min(120,sh.offsetHeight*.3)||(v>.5&&dy>20);sh.style.transform='';bd.style.opacity='';if(close)closeSheet()};
 const hd=$('.sh-head',sh);
 hd.addEventListener('pointerdown',e=>{begin(e.clientY,'head');on=true;sh.classList.add('drag');bd.style.transition='none';try{hd.setPointerCapture(e.pointerId)}catch(_){}});
 hd.addEventListener('pointermove',e=>move(e.clientY,e));hd.addEventListener('pointerup',up);hd.addEventListener('pointercancel',up);
 body.addEventListener('touchstart',e=>{if(e.touches.length===1)begin(e.touches[0].clientY,'body')},{passive:true});
 body.addEventListener('touchmove',e=>move(e.touches[0].clientY,e),{passive:false});body.addEventListener('touchend',up,{passive:true});body.addEventListener('touchcancel',up,{passive:true});
 onMount&&onMount(sh);return sh}
function closeSheet(instant){const L=$('#sheetLayer');if(!sheetOpen&&!L.classList.contains('on'))return;const sh=$('.sheet',L);const cb=sheetOpen&&sheetOpen.onClose;sheetOpen=null;
 if(instant||!sh){L.classList.remove('on');L.innerHTML='';}else{sh.classList.remove('show');L.classList.remove('on');setTimeout(()=>{if(!L.classList.contains('on'))L.innerHTML=''},520)}cb&&cb()}

/* ---------- หน้าเริ่มต้น + LINE ---------- */
function welcome(){const w=document.createElement('div');w.className='welcome';const fromLine=new URLSearchParams(location.search).get('from')==='line';
 w.innerHTML=`<div style="position:absolute;top:calc(var(--st) + 18px);right:20px"><span class="demo">ตัวอย่างทดลอง</span></div>
 <div class="fade-in" style="width:280px;height:280px;margin-bottom:6px">${M('wave','float')}</div>
 <div class="cap">${BRAND_NAME} · ${MASCOT_NAME}พาเรียน</div><div class="big">เรียนจีนวันละนิด<br>เก่งได้ทุกวัน</div>
 <p style="color:var(--sub2);margin:10px 0 22px;font-size:15px">เรียน เล่นเกม ท้าเพื่อน ในที่เดียว${fromLine?'<br><b style="color:#0B7A3B">✓ เปิดจาก LINE OA (จำลอง) — เข้าสู่ระบบให้แล้ว</b>':''}</p>
 <button class="pill row1 linebtn press" data-act="welcome" data-v="line">${fromLine?'เริ่มเรียนเลย':'เข้าสู่ระบบด้วย LINE (จำลอง)'}</button>
 <button class="pill ghost row1 press mt12" style="height:52px" data-act="welcome" data-v="guest">ลองใช้ก่อน ไม่ต้องล็อกอิน</button>
 <p class="cap mt12">นี่คือต้นแบบ ไม่มีบัญชีจริงและไม่มีการชำระเงิน<br><a href="privacy.html" target="_blank" rel="noopener" style="text-decoration:underline">ความเป็นส่วนตัว</a> · <a href="terms.html" target="_blank" rel="noopener" style="text-decoration:underline">ข้อกำหนด</a> (ร่างตัวอย่าง)</p>`;
 $('#frame').appendChild(w)}

/* ---------- ตัวจัดการคลิก ---------- */
function go(what,el){switch(what){
 case 'streak':return streakSheet();
 case 'shop':return push('shop');
 case 'review':return push('review');
 case 'plans':return push('plans');
 case 'games':return mountRoot('game');
 case 'path':return mountRoot('book');
 case 'rank':return push('rank');
 case 'chest':return push('chest');
 case 'invite':return shareSheet('invite');
 case 'challenge':return pickFriend();
 case 'group':return push('group',{i:+el.dataset.i||0});
 case 'lineentry':return location.href='line.html';
 case 'unit':return unitSheet(el.dataset.id);
 case 'play':return playGame(el.dataset.g);
 default:if(window.GOX&&GOX[what])return GOX[what](el);console.warn('go?',what)
}}
function playGame(g){if(!gamesOpen()){toast('เรียนบทที่ 1 ให้จบก่อนเพื่อปลดล็อกเกม');return}if(g==='duel')return pickFriend();push('game_'+g)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-go],[data-act]');if(!t||!$('#frame').contains(t))return;
 if(t.dataset.go){vib(6);go(t.dataset.go,t);return}
 const a=t.dataset.act;switch(a){
  case 'back':vib(6);pop();break;
  case 'closesheet':closeSheet();break;
  case 'tab':if(t.dataset.tab!==curTab||stack.length>1){vib(6);mountRoot(t.dataset.tab,true)}else{const sc=$('.scroller',stack[0].el);sc.scrollTo({top:0})}break;
  case 'welcome':S.seenWelcome=true;if(t.dataset.v==='line'&&!S.from){S.from='line'}save();vib(10);{const w=$('.welcome');anim(w,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(-30px)'}],{duration:400});setTimeout(()=>{w.remove();if(!S.seenOnboard)push('onboard')},400)}break;
  case 'audio':speak(t.dataset.t,t,t.dataset.r);break;
 }});

/* ---------- เริ่มระบบ ---------- */
function boot(){
 $('#tabbar').innerHTML=TABS.map(([k,l])=>`<button class="tab" data-act="tab" data-tab="${k}">${svg(IC[k],25)}<span>${l}</span></button>`).join('');
 $('#tabbar svg').closest('.tab');$$('#tabbar svg').forEach(s=>{s.setAttribute('width',25);s.style.fill='none'});
 mountRoot('home',false);try{dailyCheck()}catch(e){console.error(e)}if(!S.seenWelcome||new URLSearchParams(location.search).get('from')==='line'&&!S.from)welcome();
}
window.addEventListener('error',e=>console.error('ERR',e.message));
