/* ตลาดน้ำอวกาศ / Star River Market — Kairon Arcade. Stage 1. Original code. */
(function(){
'use strict';
// zoom guard: shared ../no-zoom.js (Kairon Arcade). Only long-press menu blocked here.
document.addEventListener('contextmenu',function(e){e.preventDefault();});

// ---------- i18n ----------
var T={
 th:{title:'ตลาดน้ำอวกาศ',subtitle:'พายเรือขายของให้มนุษย์ต่างดาว',tapStart:'แตะเพื่อเริ่ม',boat:'อัปเกรดเรือ',staff:'ลูกจ้าง',goods:'สินค้า',map:'แผนที่ดาว',
  fruit:'ผลไม้เรืองแสง',candy:'ลูกอมดาว',jelly:'เยลลี่เนบิวลา',crystal:'คริสตัลจักรวาล',
  lv:'เลเวล',price:'ราคา',each:'/ชิ้น',unlock:'ปลดล็อก',upgrade:'อัปเกรด',max:'สูงสุด',hire:'จ้าง',
  boatName:'เรือไม้ดวงดาว',boatDesc:'รายได้ x{m} · ลูกค้าพร้อมกัน {s} ราย · ลูกค้ามาเร็วขึ้น',
  staff1:'น้องพาย',staff2:'น้องแจว',staffDesc:'ขายให้ลูกค้าเองทุก {t} วินาที',staffHireDesc:'จ้างแล้วขายเองอัตโนมัติ แม้ตอนปิดเกม',
  goodsDesc:'ขายได้ {p} เหรียญ',goodsLockDesc:'ปลดล็อกแล้วลูกค้าจะเริ่มสั่ง',
  planet1:'ดาวบ้านเกิด',planet1d:'ดาวแรกของการค้าขาย',here:'อยู่ที่นี่',planet2:'ดาวลูกกวาด',planet2d:'ชาวดาวนี้ชอบของหวานมาก',soon:'เร็วๆ นี้',
  mapNote:'ดาวใหม่จะมาในอัปเดตถัดไป ความคืบหน้าของพี่จะเก็บไว้ครบ',
  adOfferT:'รับรายได้ x2 นาน 2 นาที',adOfferD:'ดูโฆษณาสั้นๆ ประมาณ 5 วินาที แล้วรับรายได้สองเท่าทันที',watch:'ดูโฆษณา',noThanks:'ไม่เป็นไร',
  adLabel:'โฆษณาตัวอย่าง (ทดสอบ)',adWait:'รอสักครู่ แล้วรับรางวัล',adDone:'รับรางวัลได้แล้ว',claim:'รับรางวัล',adEarly:'ปิดก่อนจบ จึงยังไม่ได้รับรางวัล',
  wbT:'ยินดีต้อนรับกลับมา!',wbD:'ระหว่างที่พี่ไม่อยู่ ลูกจ้างขายของได้',wbClaim:'รับเลย',wbX2:'ดูโฆษณา รับ x2',wbAdD:'ดูโฆษณาสั้นๆ แล้วรับเงินก้อนนี้เป็นสองเท่า',
  noCoins:'เหรียญยังไม่พอ',noCustomer:'ยังไม่มีลูกค้า รอแป๊บนะ',levelUp:'เลเวลอัป! ได้ดาว +{g}',gemSoon:'ดาวใช้ได้ในอัปเดตถัดไป',
  adLimit:'วันนี้ดูครบแล้ว พรุ่งนี้มาใหม่นะ',boostOn:'รายได้ x2 แล้ว!',welcomeHire:'จ้างลูกจ้าง เพื่อให้ร้านขายเองตอนปิดเกม',minutes:'{m} นาที',
  mute:'เสียง',sold:'ขายแล้ว'},
 en:{title:'Star River Market',subtitle:'Paddle and sell goods to cute aliens',tapStart:'Tap to start',boat:'Boat',staff:'Staff',goods:'Goods',map:'Map',
  fruit:'Glow Fruit',candy:'Star Candy',jelly:'Nebula Jelly',crystal:'Cosmic Crystal',
  lv:'Lv',price:'Price',each:'/each',unlock:'Unlock',upgrade:'Upgrade',max:'MAX',hire:'Hire',
  boatName:'Starwood Boat',boatDesc:'Income x{m} · {s} customers at once · faster customers',
  staff1:'Paddle Pal',staff2:'Oar Buddy',staffDesc:'Sells by itself every {t}s',staffHireDesc:'Sells automatically, even while the game is closed',
  goodsDesc:'Sells for {p} coins',goodsLockDesc:'Unlock it and customers start ordering',
  planet1:'Home Star',planet1d:'Your very first market',here:'You are here',planet2:'Candy Planet',planet2d:'Folks here love sweets',soon:'Coming soon',
  mapNote:'New planets arrive in the next update. Your progress is kept.',
  adOfferT:'Get x2 income for 2 minutes',adOfferD:'Watch a short ad (about 5 seconds) to double your income right away',watch:'Watch',noThanks:'No thanks',
  adLabel:'Sample ad (test)',adWait:'Please wait for your reward',adDone:'Reward ready',claim:'Claim',adEarly:'Closed early, so no reward this time',
  wbT:'Welcome back!',wbD:'While you were away your staff sold',wbClaim:'Collect',wbX2:'Watch ad for x2',wbAdD:'Watch a short ad to double this amount',
  noCoins:'Not enough coins',noCustomer:'No customers yet, hang on',levelUp:'Level up! +{g} stars',gemSoon:'Stars can be spent in the next update',
  adLimit:'Daily limit reached, come back tomorrow',boostOn:'Income x2!',welcomeHire:'Hire staff so the shop sells while you are away',minutes:'{m} min',
  mute:'Sound',sold:'Sold'}
};
function t(k,v){var s=(T[S.lang]||T.th)[k]||k;if(v)for(var x in v)s=s.replace('{'+x+'}',v[x]);return s;}

// ---------- config ----------
var GOODS=[
 {id:'fruit',  base:2,   unlock:0,    up:8,    img:'g_fruit'},
 {id:'candy',  base:12,  unlock:120,  up:60,   img:'g_candy'},
 {id:'jelly',  base:70,  unlock:1200, up:500,  img:'g_jelly'},
 {id:'crystal',base:400, unlock:9000, up:3500, img:'g_crystal'}
];
var GOOD_MAX=50, BOAT_MAX=20, STAFF_MAX=15;
var STAFF=[{id:'s1',hire:40,name:'staff1'},{id:'s2',hire:1500,name:'staff2'}];
var AD={cap:8,cooldown:180,boost:120,watch:5};
var OFFLINE_CAP=3*3600;
var SAVE_KEY='kairon.starriver.save', SAVE_VERSION=1;

function goodPrice(g,lv){var m=1;if(lv>=10)m*=2;if(lv>=25)m*=2;if(lv>=50)m*=2;return Math.round(g.base*lv*m);}
function goodUpCost(g,lv){return Math.round(g.up*Math.pow(1.17,lv-1));}
function boatMult(lv){return 1+0.15*(lv-1);}
function boatSlots(lv){return Math.min(4,2+Math.floor(lv/3));}
function spawnEvery(lv){return Math.max(0.9,3.0*Math.pow(0.92,lv-1));}
function boatCost(lv){return Math.round(50*Math.pow(1.6,lv-1));}
function staffEvery(lv){return 4/(1+0.2*(lv-1));}
function staffUpCost(s,lv){return Math.round(s.hire*0.9*Math.pow(1.4,lv));}
function xpNeed(n){return Math.round(100*Math.pow(1.8,n-1));}

// ---------- state + save/migrate ----------
function fresh(){return {v:SAVE_VERSION,coins:0,gems:0,lvl:1,xp:0,planet:1,boat:1,
  goods:{fruit:1,candy:0,jelly:0,crystal:0},staff:[0,0],
  ad:{day:'',count:0,last:0,boostUntil:0},stats:{sold:0,earned:0},
  lang:'th',mute:false,lastSeen:Date.now(),created:Date.now()};}
// Every future stage adds a step here. Old saves are upgraded, never wiped.
function migrate(d){
  if(!d||typeof d!=='object')return fresh();
  if(!d.v){d.v=1;}
  // if(d.v===1){ d.planets={...}; d.v=2; }   <- stage 2 goes here
  var f=fresh();
  for(var k in f){if(d[k]===undefined)d[k]=f[k];}
  for(var g in f.goods){if(d.goods[g]===undefined)d.goods[g]=f.goods[g];}
  for(var a in f.ad){if(d.ad[a]===undefined)d.ad[a]=f.ad[a];}
  while(d.staff.length<STAFF.length)d.staff.push(0);
  d.v=SAVE_VERSION;return d;
}
function load(){try{var r=localStorage.getItem(SAVE_KEY);return migrate(r?JSON.parse(r):null);}catch(e){return fresh();}}
function save(){S.lastSeen=Date.now();try{localStorage.setItem(SAVE_KEY,JSON.stringify(S));}catch(e){}}
var S=load();
var urlNoAds=/[?&]noads=1/.test(location.search);

// ---------- audio ----------
var A={ctx:null,master:null,music:null,sfx:null,voice:null,buf:{},musicSrc:null,ready:false,lastVoice:0};
var SOUNDS=['tap','coin','sell','upgrade','ufo','unlock','nope','popup','music',
 'v_hello','v_sold','v_thanks','v_upgrade','v_hire','v_welcome','v_unlock','v_x2','v_a_wow','v_a_yum','v_a_want','v_a_yay','v_a_cute'];
function audioInit(){
  if(A.ctx)return;
  var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  A.ctx=new C();A.master=A.ctx.createGain();A.master.connect(A.ctx.destination);
  A.music=A.ctx.createGain();A.music.gain.value=0.32;A.music.connect(A.master);
  A.sfx=A.ctx.createGain();A.sfx.gain.value=0.8;A.sfx.connect(A.master);
  A.voice=A.ctx.createGain();A.voice.gain.value=1.0;A.voice.connect(A.master);
  A.master.gain.value=S.mute?0:1;
  var left=SOUNDS.length;
  SOUNDS.forEach(function(n){
    fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(ab){
      return new Promise(function(res,rej){A.ctx.decodeAudioData(ab,res,rej);});
    }).then(function(b){A.buf[n]=b;if(n==='music')startMusic();}).catch(function(){}).then(function(){if(--left===0)A.ready=true;});
  });
}
function audioUnlock(){
  audioInit();if(!A.ctx)return;
  if(A.ctx.state!=='running'){A.ctx.resume();}
  // iOS: play a silent buffer inside the gesture
  try{var b=A.ctx.createBuffer(1,1,22050),s=A.ctx.createBufferSource();s.buffer=b;s.connect(A.ctx.destination);s.start(0);}catch(e){}
  startMusic();
}
function startMusic(){
  if(!A.ctx||A.musicSrc||!A.buf.music||A.ctx.state!=='running')return;
  var s=A.ctx.createBufferSource();s.buffer=A.buf.music;s.loop=true;s.connect(A.music);s.start(0);A.musicSrc=s;
}
function play(n,o){
  o=o||{};if(!A.ctx||!A.buf[n]||A.ctx.state!=='running')return;
  var s=A.ctx.createBufferSource();s.buffer=A.buf[n];
  if(o.rate)s.playbackRate.value=o.rate;
  var g=A.ctx.createGain();g.gain.value=o.vol==null?1:o.vol;s.connect(g);g.connect(n.charAt(0)==='v'&&n.charAt(1)==='_'?A.voice:A.sfx);s.start(0);
}
function say(n,minGap){var now=performance.now();if(now-A.lastVoice<(minGap||1600))return;A.lastVoice=now;play('v_'+n);}
function setMute(m){S.mute=m;if(A.master)A.master.gain.setTargetAtTime(m?0:1,A.ctx.currentTime,0.03);drawMuteIcon();save();}
function drawMuteIcon(){document.getElementById('mute-ico').setAttribute('d',S.mute?
 'M3 9v6h4l5 5V4L7 9H3zm13.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z':
 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z');}
document.addEventListener('visibilitychange',function(){
  if(!A.ctx)return;
  if(document.hidden){A.ctx.suspend();save();}else if(!splashOn){A.ctx.resume();}
});

// ---------- images ----------
var IMG={},IMGS=['bg','boat','staff','alien_blue','alien_green','alien_pink','stall','g_fruit','g_candy','g_jelly','g_crystal','coin','gem'];
var imgLeft=IMGS.length;
IMGS.forEach(function(n){var i=new Image();i.onload=i.onerror=function(){imgLeft--;};i.src='assets/'+n+'.webp';IMG[n]=i;});

// ---------- canvas ----------
var cv=document.getElementById('scene'),cx=cv.getContext('2d'),W=0,H=0,DPR=1;
var game=document.getElementById('game');
function resize(){
  var r=game.getBoundingClientRect();W=r.width;H=r.height;DPR=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);cx.setTransform(DPR,0,0,DPR,0,0);
  layout();
}
window.addEventListener('resize',resize);
// background "cover" transform: bg image is 720x1280 (9:16)
var BG={s:1,ox:0,oy:0};
function bgPt(u,v){return {x:BG.ox+u*720*BG.s,y:BG.oy+v*1280*BG.s};}
// river centre line in bg UV + half-width
var RIVER=[[.50,.20,.012],[.53,.26,.03],[.47,.32,.05],[.53,.40,.07],[.50,.50,.09],[.53,.60,.12],[.46,.72,.16],[.36,.86,.21],[.26,1.02,.26]];
function riverAt(p){ // p 0..1
  var n=RIVER.length-1,f=p*n,i=Math.min(n-1,Math.floor(f)),k=f-i;
  var a=RIVER[Math.max(0,i-1)],b=RIVER[i],c=RIVER[i+1],d=RIVER[Math.min(n,i+2)];
  function cr(j){var t2=k*k,t3=t2*k;return 0.5*((2*b[j])+(-a[j]+c[j])*k+(2*a[j]-5*b[j]+4*c[j]-d[j])*t2+(-a[j]+3*b[j]-3*c[j]+d[j])*t3);}
  return [cr(0),cr(1),cr(2)];
}
var L={}; // layout in px
var SLOTS=[[.18,.355],[.83,.385],[.85,.565],[.52,.255]];
function layout(){
  BG.s=Math.max(W/720,H/1280);BG.ox=(W-720*BG.s)/2;BG.oy=(H-1280*BG.s)/2;
  var bw=Math.min(W*0.80,H*0.45);
  L.boat={x:W*0.44,y:H*0.615,w:bw,h:bw*413/560};
  L.stalls=[{x:W*0.20,y:H*0.205,w:W*0.40},{x:W*0.80,y:H*0.215,w:W*0.38},{x:W*0.53,y:H*0.155,w:W*0.17}];
  L.slots=SLOTS.map(function(s,i){return {x:W*s[0],y:H*s[1],w:(i===3?W*0.20:W*0.27)};});
  L.staff=[{x:W*0.70,y:H*0.30,w:W*0.22},{x:W*0.30,y:H*0.30,w:W*0.22}];
  var cb=document.getElementById('pill-coin').getBoundingClientRect(),gr=game.getBoundingClientRect();
  L.coinTarget={x:cb.left-gr.left+20,y:cb.top-gr.top+20};
}

// ---------- world objects ----------
var stars=[],flow=[],fx=[],floats=[],aliens=[null,null,null,null],spawnT=1.2,staffT=[0,0],time=0;
for(var i=0;i<110;i++)stars.push({x:Math.random(),y:Math.random()*0.8,r:Math.random()*1.6+0.4,p:Math.random()*6.28,s:Math.random()*2+1});
for(i=0;i<170;i++)flow.push(newFlow(Math.random()));
function newFlow(p){return {p:p,o:(Math.random()*2-1),sp:0.025+Math.random()*0.035,r:Math.random()*1.8+0.6,h:Math.random()};}
var ALIENS=[{img:'alien_blue',w:1},{img:'alien_green',w:1},{img:'alien_pink',w:1}];

function unlockedGoods(){return GOODS.filter(function(g){return S.goods[g.id]>0;});}
function pickGood(){
  var u=unlockedGoods(),tot=0,ws=u.map(function(g,i){var w=1+i*0.8;tot+=w;return w;}),r=Math.random()*tot;
  for(var i=0;i<u.length;i++){r-=ws[i];if(r<=0)return u[i];}return u[0];
}
function spawnAlien(){
  var n=boatSlots(S.boat),free=[];
  for(var i=0;i<n;i++)if(!aliens[i])free.push(i);
  if(!free.length)return;
  var i2=free[Math.floor(Math.random()*free.length)],a=ALIENS[Math.floor(Math.random()*ALIENS.length)];
  aliens[i2]={slot:i2,img:a.img,good:pickGood(),t:0,state:'in',pat:16,ph:Math.random()*6,born:time};
  play('ufo',{vol:0.6,rate:0.9+Math.random()*0.25});
}
function oldestAlien(){var b=null;aliens.forEach(function(a){if(a&&a.state==='wait'&&(!b||a.born<b.born))b=a;});return b;}
function boosted(){return Date.now()<S.ad.boostUntil;}
function sellTo(a,byStaff){
  if(!a||a.state!=='wait')return;
  var g=a.good,lv=S.goods[g.id];
  var amt=Math.max(1,Math.round(goodPrice(g,lv)*boatMult(S.boat)*(boosted()?2:1)));
  a.state='out';a.t=0;a.happy=true;
  var p=alienPos(a);
  addCoins(amt);S.stats.sold++;
  coinBurst(p.x,p.y-10,Math.min(7,3+Math.floor(Math.log10(amt+1)*1.5)));
  floats.push({x:p.x,y:p.y-p.w*0.45,txt:'+'+fmt(amt),t:0,big:!byStaff});
  play(byStaff?'coin':'sell',{vol:byStaff?0.5:0.9});
  if(!byStaff){var r=Math.random();if(S.stats.sold<=1||r<0.22)say('sold',2500);else if(r<0.4)say('thanks',2500);else if(r<0.55)say(['a_yum','a_yay','a_cute'][Math.floor(Math.random()*3)],2500);}
}
function addCoins(n){
  S.coins+=n;S.stats.earned+=n;S.xp+=n;
  while(S.xp>=xpNeed(S.lvl)){S.xp-=xpNeed(S.lvl);S.lvl++;var g=3+Math.floor(S.lvl/3);S.gems+=g;toast(t('levelUp',{g:g}));play('unlock');sparkle(W/2,H*0.4,40);}
  hudDirty=true;
}
function alienPos(a){
  var s=L.slots[a.slot],bob=Math.sin(time*2+a.ph)*6,x=s.x,y=s.y+bob;
  if(a.state==='in'){var k=ease(Math.min(1,a.t/0.8));x+=(1-k)*(s.x<W/2?-W*0.5:W*0.5);y-=(1-k)*H*0.15;}
  if(a.state==='out'){var k2=ease(Math.min(1,a.t/0.9));y-=k2*H*0.35;x+=k2*(s.x<W/2?-W*0.2:W*0.2);}
  return {x:x,y:y,w:s.w};
}
function ease(k){return 1-Math.pow(1-k,3);}

// ---------- effects ----------
function coinBurst(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,sp=120+Math.random()*160;
  fx.push({k:'coin',x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-180,t:0,d:0.35+Math.random()*0.15,fly:false,sx:0,sy:0});}}
function sparkle(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,sp=40+Math.random()*220;
  fx.push({k:'spk',x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,t:0,d:0.6+Math.random()*0.6,c:Math.random()});}}
var coinPulse=0;

// ---------- input ----------
var splashOn=true;
cv.addEventListener('pointerdown',function(e){
  if(splashOn)return;
  audioUnlock();
  var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  // aliens first
  for(var i=0;i<aliens.length;i++){var a=aliens[i];if(!a||a.state!=='wait')continue;var p=alienPos(a);
    if(Math.abs(x-p.x)<p.w*0.55&&Math.abs(y-(p.y-p.w*0.2))<p.w*0.65){sellTo(a);return;}}
  var b=L.boat;
  if(Math.abs(x-b.x)<b.w*0.45&&Math.abs(y-b.y)<b.h*0.45){
    boatSquash=1;play('tap',{vol:0.7});
    var o=oldestAlien();if(o)sellTo(o);else{toast(t('noCustomer'));}
    return;
  }
  play('tap',{vol:0.35});sparkle(x,y,6);
});
var boatSquash=0;

// ---------- main loop ----------
var lastT=performance.now(),hudDirty=true,saveT=0;
function frame(now){
  var dt=Math.min(0.05,(now-lastT)/1000);lastT=now;time+=dt;
  if(!splashOn)update(dt);
  draw(dt);
  requestAnimationFrame(frame);
}
function update(dt){
  spawnT-=dt;if(spawnT<=0){spawnAlien();spawnT=spawnEvery(S.boat)*(0.7+Math.random()*0.6);}
  else if(!aliens.some(function(a){return a&&a.state!=='out';})&&spawnT>0.7)spawnT=0.7; // never leave the river empty for long
  aliens.forEach(function(a,i){if(!a)return;a.t+=dt;
    if(a.state==='in'&&a.t>0.8){a.state='wait';a.t=0;if(Math.random()<0.25)say(Math.random()<0.5?'a_want':'a_wow',3000);}
    else if(a.state==='wait'&&a.t>a.pat){a.state='out';a.t=0;a.happy=false;}
    else if(a.state==='out'&&a.t>0.9){aliens[i]=null;}
  });
  for(var s=0;s<STAFF.length;s++){if(!S.staff[s])continue;staffT[s]+=dt;
    if(staffT[s]>=staffEvery(S.staff[s])){var o=oldestAlien();if(o){staffT[s]=0;sellTo(o,true);staffHop[s]=1;}}}
  if(boatSquash>0)boatSquash=Math.max(0,boatSquash-dt*4);
  for(s=0;s<2;s++)if(staffHop[s]>0)staffHop[s]=Math.max(0,staffHop[s]-dt*2.5);
  saveT+=dt;if(saveT>5){saveT=0;save();}
  if(hudDirty){updateHud();hudDirty=false;}
  updateBoostUi();
}
var staffHop=[0,0];
function drawImg(n,x,y,w,ax,ay,rot,alpha,flip){
  var im=IMG[n];if(!im||!im.complete||!im.naturalWidth)return;
  var h=w*im.naturalHeight/im.naturalWidth;cx.save();cx.translate(x,y);if(rot)cx.rotate(rot);if(flip)cx.scale(-1,1);
  if(alpha!=null)cx.globalAlpha=alpha;cx.drawImage(im,-w*(ax==null?.5:ax),-h*(ay==null?.5:ay),w,h);cx.restore();
}
function draw(dt){
  cx.clearRect(0,0,W,H);
  var bg=IMG.bg;if(bg.complete&&bg.naturalWidth)cx.drawImage(bg,BG.ox,BG.oy,720*BG.s,1280*BG.s);else{cx.fillStyle='#120f45';cx.fillRect(0,0,W,H);}
  // twinkles
  cx.save();cx.globalCompositeOperation='lighter';
  stars.forEach(function(s){var a=0.25+0.75*Math.max(0,Math.sin(time*s.s+s.p));cx.globalAlpha=a;cx.fillStyle='#fff';
    var x=s.x*W,y=s.y*H;cx.beginPath();cx.arc(x,y,s.r,0,6.283);cx.fill();
    if(s.r>1.6&&a>0.8){cx.globalAlpha=a*0.6;cx.fillRect(x-s.r*3,y-0.5,s.r*6,1);cx.fillRect(x-0.5,y-s.r*3,1,s.r*6);}});
  // river glow + flowing particles
  flow.forEach(function(f){f.p+=f.sp*dt;if(f.p>1)Object.assign(f,newFlow(0));
    var r=riverAt(f.p),q=bgPt(r[0]+f.o*r[2],r[1]),sz=f.r*(0.6+f.p*1.2);
    var al=Math.min(1,f.p*8)*(0.5+0.5*Math.sin(time*3+f.h*20));
    cx.globalAlpha=al*0.9;cx.fillStyle=f.h<0.33?'#c9b6ff':(f.h<0.66?'#8fd0ff':'#ffffff');
    cx.beginPath();cx.arc(q.x,q.y,sz,0,6.283);cx.fill();
    cx.globalAlpha=al*0.25;cx.beginPath();cx.arc(q.x,q.y,sz*3,0,6.283);cx.fill();});
  cx.restore();
  // stalls (back), with lantern glow
  [2,0,1].forEach(function(i){var s=L.stalls[i],by=Math.sin(time*0.8+i*2)*4;
    drawImg('stall',s.x,s.y+by,s.w,.5,.5);
    var gl=0.35+0.15*Math.sin(time*3+i);cx.save();cx.globalCompositeOperation='lighter';
    var g=cx.createRadialGradient(s.x,s.y+by-s.w*0.12,0,s.x,s.y+by-s.w*0.12,s.w*0.55);g.addColorStop(0,'rgba(255,190,90,'+gl*0.5+')');g.addColorStop(1,'rgba(255,150,60,0)');
    cx.fillStyle=g;cx.fillRect(s.x-s.w,s.y+by-s.w,s.w*2,s.w*2);cx.restore();});
  // staff canoes
  for(var s=0;s<STAFF.length;s++){if(!S.staff[s])continue;var p=L.staff[s],hop=Math.sin(staffHop[s]*Math.PI)*10;
    drawImg('staff',p.x+Math.sin(time*0.7+s)*6,p.y+Math.sin(time*1.8+s)*3-hop,p.w,.5,.5,Math.sin(time*1.5+s)*0.04,1,s===1);}
  // aliens behind boat (top slot) then boat then others
  var order=[3,0,1,2];
  order.forEach(function(i){if(i===3)drawAlien(aliens[i]);});
  drawBoat();
  order.forEach(function(i){if(i!==3)drawAlien(aliens[i]);});
  // fx
  var tgt=L.coinTarget;
  for(var k=fx.length-1;k>=0;k--){var f=fx[k];f.t+=dt;
    if(f.k==='coin'){
      if(!f.fly){f.vy+=600*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.96;if(f.t>f.d){f.fly=true;f.t=0;f.sx=f.x;f.sy=f.y;}
        drawImg('coin',f.x,f.y,22,.5,.5,f.t*8);}
      else{var q=Math.min(1,f.t/0.55),e=q*q*(3-2*q),mx=(f.sx+tgt.x)/2+(f.sx<W/2?-60:60),my=Math.min(f.sy,tgt.y)-80;
        var x=(1-e)*(1-e)*f.sx+2*(1-e)*e*mx+e*e*tgt.x,y=(1-e)*(1-e)*f.sy+2*(1-e)*e*my+e*e*tgt.y;
        drawImg('coin',x,y,22-8*e,.5,.5,f.t*10);
        if(q>=1){fx.splice(k,1);coinPulse=1;if(Math.random()<0.5)play('coin',{vol:0.25,rate:1+Math.random()*0.3});}}
    }else{f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.95;f.vy*=0.95;var al=1-f.t/f.d;if(al<=0){fx.splice(k,1);continue;}
      cx.save();cx.globalCompositeOperation='lighter';cx.globalAlpha=al;cx.fillStyle=f.c<0.5?'#ffe38a':'#d8c4ff';
      star5(f.x,f.y,3+4*al);cx.restore();}
  }
  if(coinPulse>0){coinPulse=Math.max(0,coinPulse-dt*4);document.getElementById('pill-coin').style.transform='scale('+(1+coinPulse*0.08)+')';}
  // floating numbers (single colour yellow with navy outline)
  cx.textAlign='center';cx.textBaseline='middle';
  for(k=floats.length-1;k>=0;k--){var fl=floats[k];fl.t+=dt;if(fl.t>1.1){floats.splice(k,1);continue;}
    var sc=fl.t<0.15?0.6+fl.t/0.15*0.5:1.1-Math.min(0.1,(fl.t-0.15));cx.globalAlpha=fl.t>0.8?(1.1-fl.t)/0.3:1;
    cx.font='800 '+Math.round((fl.big?26:20)*sc)+'px Kanit,sans-serif';cx.lineWidth=5;cx.strokeStyle='#121c4a';cx.lineJoin='round';
    cx.strokeText(fl.txt,fl.x,fl.y-fl.t*50);cx.fillStyle='#ffd24a';cx.fillText(fl.txt,fl.x,fl.y-fl.t*50);cx.globalAlpha=1;}
}
function star5(x,y,r){cx.beginPath();for(var i=0;i<10;i++){var a=i*Math.PI/5-Math.PI/2,rr=i%2?r*0.45:r;cx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}cx.closePath();cx.fill();}
function drawBoat(){
  var b=L.boat,bob=Math.sin(time*1.6)*5,rot=Math.sin(time*1.1)*0.025,sq=Math.sin(boatSquash*Math.PI)*0.06;
  // glow on river under boat
  cx.save();cx.globalCompositeOperation='lighter';var g=cx.createRadialGradient(b.x,b.y+b.h*0.32,0,b.x,b.y+b.h*0.32,b.w*0.6);
  g.addColorStop(0,'rgba(170,140,255,0.35)');g.addColorStop(1,'rgba(120,100,255,0)');cx.fillStyle=g;cx.fillRect(b.x-b.w,b.y-b.h,b.w*2,b.h*2);
  // ripples
  for(var i=0;i<3;i++){var k=((time*0.6+i/3)%1);cx.globalAlpha=(1-k)*0.5;cx.strokeStyle='#cbbcff';cx.lineWidth=2;
    cx.beginPath();cx.ellipse(b.x,b.y+b.h*0.36,b.w*(0.35+k*0.3),b.h*(0.06+k*0.06),0,0,6.283);cx.stroke();}
  cx.restore();
  var im=IMG.boat;if(!im.naturalWidth)return;
  cx.save();cx.translate(b.x,b.y+bob);cx.rotate(rot);cx.scale(1+sq,1-sq);cx.drawImage(im,-b.w/2,-b.h/2,b.w,b.h);cx.restore();
  // lantern glow (bow lantern sits at ~13%,70% of sprite)
  cx.save();cx.globalCompositeOperation='lighter';var lx=b.x-b.w*0.36,ly=b.y+bob+b.h*0.2,gl=0.5+0.2*Math.sin(time*5);
  var g2=cx.createRadialGradient(lx,ly,0,lx,ly,b.w*0.16);g2.addColorStop(0,'rgba(255,200,110,'+gl+')');g2.addColorStop(1,'rgba(255,160,60,0)');
  cx.fillStyle=g2;cx.fillRect(lx-b.w*0.2,ly-b.w*0.2,b.w*0.4,b.w*0.4);cx.restore();
}
function drawAlien(a){
  if(!a)return;var p=alienPos(a),al=a.state==='out'?1-Math.min(1,a.t/0.9):1;
  // beam glow under ufo
  cx.save();cx.globalCompositeOperation='lighter';cx.globalAlpha=0.35*al;var g=cx.createRadialGradient(p.x,p.y+p.w*0.3,0,p.x,p.y+p.w*0.3,p.w*0.5);
  g.addColorStop(0,'rgba(120,230,255,0.8)');g.addColorStop(1,'rgba(120,230,255,0)');cx.fillStyle=g;cx.fillRect(p.x-p.w,p.y-p.w*0.2,p.w*2,p.w);cx.restore();
  drawImg(a.img,p.x,p.y,p.w,.5,.6,Math.sin(time*2.2+a.ph)*0.05,al);
  if(a.state==='wait'){
    // speech bubble with item + patience ring
    var bx=p.x,by=p.y-p.w*0.95,r=p.w*0.30,pop=Math.min(1,a.t/0.25);r*=0.6+0.4*ease(pop);
    if(bx-r<6)bx=r+6;if(bx+r>W-6)bx=W-6-r;
    cx.save();cx.fillStyle='#fffaf0';cx.shadowColor='rgba(0,0,0,.35)';cx.shadowBlur=10;cx.beginPath();cx.arc(bx,by,r,0,6.283);cx.fill();
    cx.beginPath();cx.moveTo(bx-r*0.25,by+r*0.85);cx.lineTo(p.x,by+r*1.35);cx.lineTo(bx+r*0.25,by+r*0.85);cx.fill();cx.restore();
    var left=1-a.t/a.pat;cx.strokeStyle='#ffd24a';cx.lineWidth=4;cx.lineCap='round';cx.beginPath();cx.arc(bx,by,r+3,-Math.PI/2,-Math.PI/2+left*6.283);cx.stroke();
    drawImg(a.good.img,bx,by+Math.sin(time*4)*1.5,r*1.35,.5,.5);
  }else if(a.state==='out'&&a.happy){
    cx.save();cx.globalAlpha=al;cx.fillStyle='#ffd24a';var hy=p.y-p.w*0.8-a.t*30;heart(p.x+p.w*0.25,hy,9);heart(p.x-p.w*0.2,hy+12,6);cx.restore();
  }
}
function heart(x,y,s){cx.beginPath();cx.moveTo(x,y+s*0.8);cx.bezierCurveTo(x-s*1.4,y-s*0.2,x-s*0.6,y-s*1.3,x,y-s*0.4);cx.bezierCurveTo(x+s*0.6,y-s*1.3,x+s*1.4,y-s*0.2,x,y+s*0.8);cx.fill();}

// ---------- HUD ----------
function fmt(n){n=Math.floor(n);if(n<1000)return ''+n;var u=['K','M','B','T','Qa','Qi'],i=-1;while(n>=1000&&i<u.length-1){n/=1000;i++;}return (n>=100?n.toFixed(0):n>=10?n.toFixed(1):n.toFixed(2)).replace(/\.0+$/,'')+u[i];}
var $=function(id){return document.getElementById(id);};
function updateHud(){
  $('coins').textContent=fmt(S.coins);$('gems').textContent=fmt(S.gems);$('lvl').textContent='Lv. '+S.lvl;
  $('xpfill').style.width=Math.min(100,S.xp/xpNeed(S.lvl)*100)+'%';
  var can={boat:S.boat<BOAT_MAX&&S.coins>=boatCost(S.boat),
    staff:STAFF.some(function(s,i){var lv=S.staff[i];return lv===0?S.coins>=s.hire:(lv<STAFF_MAX&&S.coins>=staffUpCost(s,lv));}),
    goods:GOODS.some(function(g){var lv=S.goods[g.id];return lv===0?(g.unlock>0&&S.coins>=g.unlock):(lv<GOOD_MAX&&S.coins>=goodUpCost(g,lv));}),map:false};
  document.querySelectorAll('.nb').forEach(function(b){b.classList.toggle('can',!!can[b.dataset.p]);});
  if(openPanel&&openPanel!=='map'&&openPanel.charAt(0)!=='_')renderPanel(openPanel,true);
}
function applyLang(){
  document.documentElement.lang=S.lang;
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t);});
  $('btn-lang').textContent=S.lang==='th'?'EN':'ไทย';
  document.title=t('title')+' · Kairon Arcade';
  if(openPanel)renderPanel(openPanel);   // popups redraw on language change
  if(adOpen)renderAd();
}
var toastT=0;
function toast(s){var e=$('toast');e.textContent=s;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on');},1600);}

// ---------- panels ----------
var openPanel=null,panelCtx=null;
function open(p,ctx){openPanel=p;panelCtx=ctx||null;var m=$('modal');m.classList.remove('hidden');m.classList.toggle('center',p.charAt(0)==='_');renderPanel(p);play('popup',{vol:0.6});}
function close(){openPanel=null;panelCtx=null;$('modal').classList.add('hidden');}
$('modal').addEventListener('pointerdown',function(e){if(e.target.id==='modal'&&openPanel&&openPanel!=='_welcome')close();});
function head(title){return '<div class="sh-h"><h2>'+title+'</h2><button class="x" data-a="close">×</button></div>';}
function buyBtn(cost,label,act,arg,maxed){
  if(maxed)return '<button class="buy max">'+t('max')+'</button>';
  return '<button class="buy'+(S.coins<cost?' off':'')+'" data-a="'+act+'" data-i="'+arg+'">'+(label?label+' ':'')+'<img src="assets/coin.webp" alt="">'+fmt(cost)+'</button>';
}
function renderPanel(p,soft){
  var h='',sh=$('sheet');
  if(p==='boat'){
    var lv=S.boat;h=head(t('boat'))+'<div class="row"><img class="ic" src="assets/i_boat.webp" alt=""><div class="mid"><div class="nm">'+t('boatName')+' · '+t('lv')+' '+lv+'</div><div class="ds">'+
      t('boatDesc',{m:boatMult(lv).toFixed(2).replace(/0$/,''),s:boatSlots(lv)})+'</div></div>'+buyBtn(boatCost(lv),'','boat',0,lv>=BOAT_MAX)+'</div>';
  }else if(p==='staff'){
    h=head(t('staff'));
    STAFF.forEach(function(s,i){var lv=S.staff[i];
      h+='<div class="row'+(lv?'':' locked')+'"><img class="ic" src="assets/i_staff.webp" alt=""><div class="mid"><div class="nm">'+t(s.name)+(lv?' · '+t('lv')+' '+lv:'')+'</div><div class="ds">'+
      (lv?t('staffDesc',{t:staffEvery(lv).toFixed(1)}):t('staffHireDesc'))+'</div></div>'+
      (lv?buyBtn(staffUpCost(s,lv),'','staff',i,lv>=STAFF_MAX):buyBtn(s.hire,t('hire'),'staff',i))+'</div>';});
  }else if(p==='goods'){
    h=head(t('goods'));
    GOODS.forEach(function(g){var lv=S.goods[g.id];
      h+='<div class="row'+(lv?'':' locked')+'"><img class="ic" src="assets/'+g.img+'.webp" alt=""><div class="mid"><div class="nm">'+t(g.id)+(lv?' · '+t('lv')+' '+lv:'')+'</div><div class="ds">'+
      (lv?t('goodsDesc',{p:fmt(goodPrice(g,lv)*boatMult(S.boat))}):t('goodsLockDesc'))+'</div></div>'+
      (lv?buyBtn(goodUpCost(g,lv),'','good',g.id,lv>=GOOD_MAX):buyBtn(g.unlock,t('unlock'),'good',g.id))+'</div>';});
  }else if(p==='map'){
    h=head(t('map'))+'<div class="planet"><div class="pl"><img class="p" src="assets/i_map.webp" alt=""></div><div><div class="nm" style="font-weight:800;font-size:18px">'+t('planet1')+'</div><div class="ds" style="font-size:14px;opacity:.8">'+t('planet1d')+'</div><span class="tag">'+t('here')+'</span></div></div>'+
      '<div class="planet lock"><div class="pl"><img class="p" src="assets/i_map.webp" alt=""><img class="lk" src="assets/lock.webp" alt=""></div><div><div class="nm" style="font-weight:800;font-size:18px">'+t('planet2')+'</div><div class="ds" style="font-size:14px;opacity:.8">'+t('planet2d')+'</div><span class="tag">'+t('soon')+'</span></div></div>'+
      '<div class="ds" style="font-size:13px;opacity:.75;text-align:center;margin-top:4px">'+t('mapNote')+'</div><div class="ds" style="font-size:12px;opacity:.6;text-align:center;margin-top:10px">Kairon Arcade</div>';
  }else if(p==='_adoffer'){
    h='<img class="pop-ic" src="assets/tv.webp" alt=""><div class="pop-t">'+t('adOfferT')+'</div><div class="pop-d">'+t('adOfferD')+'</div>'+
      '<div class="btns"><button class="b-yes" data-a="adwatch" data-i="boost">'+t('watch')+'</button><button class="b-no" data-a="close">'+t('noThanks')+'</button></div>';
  }else if(p==='_welcome'){
    var amt=panelCtx.amt,can=adAvailable();
    h='<img class="pop-ic" src="assets/i_staff.webp" alt=""><div class="pop-t">'+t('wbT')+'</div><div class="pop-d">'+t('wbD')+' ('+t('minutes',{m:Math.round(panelCtx.secs/60)})+')</div>'+
      '<div class="pop-big"><img src="assets/coin.webp" alt="" style="width:30px;vertical-align:-4px"> '+fmt(amt)+'</div>'+
      (can?'<div class="pop-d" style="font-size:14px;margin-bottom:10px">'+t('wbAdD')+' <b>'+fmt(amt*2)+'</b></div><div class="btns"><button class="b-yes" data-a="adwatch" data-i="welcome">'+t('wbX2')+'</button><button class="b-no" data-a="wbclaim">'+t('wbClaim')+'</button></div>'
          :'<div class="btns"><button class="b-yes" data-a="wbclaim">'+t('wbClaim')+'</button></div>');
  }
  var st=sh.scrollTop;sh.innerHTML=h;if(soft)sh.scrollTop=st;
}
$('sheet').addEventListener('click',function(e){
  var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,i=b.dataset.i;audioUnlock();
  if(a==='close'){play('tap',{vol:0.5});close();return;}
  if(a==='boat'){var c=boatCost(S.boat);if(S.boat>=BOAT_MAX)return;if(!spend(c))return;S.boat++;play('upgrade');say('upgrade',800);sparkle(L.boat.x,L.boat.y,30);boatSquash=1;}
  else if(a==='staff'){var s=STAFF[+i],lv=S.staff[+i],c2=lv?staffUpCost(s,lv):s.hire;if(lv>=STAFF_MAX)return;if(!spend(c2))return;S.staff[+i]++;
    if(!lv){play('unlock');say('hire',800);}else{play('upgrade');say('upgrade',800);}var sp=L.staff[+i];sparkle(sp.x,sp.y,24);}
  else if(a==='good'){var g=GOODS.filter(function(x){return x.id===i;})[0],lv2=S.goods[i],c3=lv2?goodUpCost(g,lv2):g.unlock;if(lv2>=GOOD_MAX)return;if(!spend(c3))return;S.goods[i]++;
    if(!lv2){play('unlock');say('unlock',800);}else{play('upgrade');if(Math.random()<0.5)say('upgrade',1500);}sparkle(W/2,H*0.5,20);}
  else if(a==='adwatch'){var kind=i;adReturnCtx=panelCtx;close();startAd(kind);return;}
  else if(a==='wbclaim'){addCoins(panelCtx.amt);welcomeAmt=0;coinBurst(W/2,H*0.5,10);play('sell');close();save();return;}
  save();hudDirty=true;updateHud();renderPanel(openPanel,true);
});
function spend(c){if(S.coins<c){play('nope');toast(t('noCoins'));return false;}S.coins-=c;return true;}
document.querySelectorAll('.nb').forEach(function(b){b.addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});open(b.dataset.p);});});
$('btn-mute').addEventListener('click',function(){audioUnlock();setMute(!S.mute);if(!S.mute)play('tap');});
$('btn-lang').addEventListener('click',function(){S.lang=S.lang==='th'?'en':'th';play('tap',{vol:0.6});applyLang();save();});
$('gems').parentNode.addEventListener('click',function(){toast(t('gemSoon'));});
$('coin-plus').addEventListener('click',function(){audioUnlock();if(adAvailable())open('_adoffer');else toast(t('adLimit'));});
$('tv').addEventListener('click',function(){audioUnlock();play('tap');open('_adoffer');});

// ---------- rewarded ads (mock; real SDK plugs in here) ----------
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function adSdkReady(){return !urlNoAds;}  // real SDK: return sdk.isRewardedReady()
function adAvailable(){
  if(!adSdkReady())return false;
  if(S.ad.day!==today()){S.ad.day=today();S.ad.count=0;}
  if(S.ad.count>=AD.cap)return false;
  if(Date.now()-S.ad.last<AD.cooldown*1000)return false;
  return true;
}
var adOpen=null,adReturnCtx=null;
function startAd(kind){
  if(!adAvailable()){toast(t('adLimit'));return;}
  adOpen={kind:kind,t0:performance.now(),done:false};
  if(A.ctx)A.master.gain.setTargetAtTime(0,A.ctx.currentTime,0.05);
  $('ad').classList.remove('hidden');renderAd();adTick();
}
function adTick(){if(!adOpen)return;var left=Math.ceil(AD.watch-(performance.now()-adOpen.t0)/1000);
  if(left<=0&&!adOpen.done){adOpen.done=true;renderAd();return;}if(!adOpen.done){var c=$('adc');if(c)c.textContent=left;}setTimeout(adTick,200);}
function renderAd(){
  var e=$('ad'),left=Math.max(0,Math.ceil(AD.watch-(performance.now()-adOpen.t0)/1000));
  e.innerHTML='<button class="adx" data-a="adclose">×</button><div class="adl">'+t('adLabel')+'</div><img src="assets/tv.webp" alt=""><div class="adt">'+t('title')+'</div>'+
   (adOpen.done?'<div class="adt">'+t('adDone')+'</div><div class="btns" style="width:80%"><button class="b-yes" data-a="adclaim">'+t('claim')+'</button></div>'
     :'<div class="adc" id="adc">'+left+'</div><div class="adl">'+t('adWait')+'</div>');
}
$('ad').addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b||!adOpen)return;
  var k=adOpen.kind,ok=b.dataset.a==='adclaim'&&adOpen.done;
  if(b.dataset.a==='adclose'&&adOpen.done)ok=true; // finished: closing still grants
  $('ad').classList.add('hidden');var ctx=adReturnCtx;adReturnCtx=null;adOpen=null;
  if(A.ctx)A.master.gain.setTargetAtTime(S.mute?0:1,A.ctx.currentTime,0.05);
  if(!ok){toast(t('adEarly'));if(k==='welcome'&&ctx)open('_welcome',ctx);return;}
  S.ad.count++;S.ad.last=Date.now();
  if(k==='boost'){S.ad.boostUntil=Date.now()+AD.boost*1000;toast(t('boostOn'));say('x2',0);play('upgrade');sparkle(W/2,H*0.45,40);}
  else if(k==='welcome'&&welcomeAmt){addCoins(welcomeAmt*2);coinBurst(W/2,H*0.5,14);play('sell');say('x2',0);welcomeAmt=0;}
  save();hudDirty=true;
});
var welcomeAmt=0;
function updateBoostUi(){
  var b=boosted();$('boost').classList.toggle('hidden',!b);
  if(b){var s=Math.ceil((S.ad.boostUntil-Date.now())/1000);$('boost-t').textContent='x2 '+Math.floor(s/60)+':'+('0'+s%60).slice(-2);}
  $('tv').classList.toggle('hidden',b||!adAvailable());
}

// ---------- offline earnings ----------
function staffRatePerSec(){
  var u=unlockedGoods();if(!u.length)return 0;
  var avg=u.reduce(function(s,g){return s+goodPrice(g,S.goods[g.id]);},0)/u.length*boatMult(S.boat);
  var r=0;for(var i=0;i<STAFF.length;i++)if(S.staff[i])r+=1/staffEvery(S.staff[i]);
  return Math.min(r,1/spawnEvery(S.boat))*avg;
}
function checkOffline(){
  var secs=Math.min(OFFLINE_CAP,Math.max(0,(Date.now()-S.lastSeen)/1000));
  if(secs<60)return false;
  var amt=Math.floor(staffRatePerSec()*secs);
  if(amt<1){return false;}
  welcomeAmt=amt;open('_welcome',{amt:amt,secs:secs});say('welcome',0);return true;
}

// ---------- boot ----------
resize();applyLang();drawMuteIcon();updateHud();
requestAnimationFrame(frame);
var offlineShown=false;
$('splash').addEventListener('pointerdown',function(){
  if(!splashOn)return;splashOn=false;audioUnlock();
  $('splash').classList.add('out');setTimeout(function(){$('splash').style.display='none';},500);
  setTimeout(function(){layout();offlineShown=checkOffline();if(!offlineShown)say('hello',0);},250);
  spawnT=0.6;
});
window.addEventListener('pagehide',save);
})();
