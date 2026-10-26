/* ทหารของเล่นพิทักษ์ห้องหนู · Toy Soldiers of the Playroom · Kairon Arcade — original code. */
(function(){'use strict';
var META={
 "h_bear": {
  "w": 257,
  "h": 330,
  "lid": "#d68b3f",
  "eyes": [
   [
    107,
    134,
    9,
    10
   ],
   [
    152,
    133,
    9,
    10
   ]
  ]
 },
 "h_robot": {
  "w": 216,
  "h": 330,
  "lid": "#a9611e",
  "eyes": [
   [
    85,
    79,
    11,
    11
   ],
   [
    117,
    76,
    11,
    11
   ]
  ]
 },
 "h_trumpet": {
  "w": 233,
  "h": 330,
  "lid": "#cc7f48",
  "eyes": [
   [
    85,
    100,
    5,
    7
   ],
   [
    113,
    98,
    5,
    7
   ]
  ]
 },
 "m_red": {
  "w": 250,
  "h": 202,
  "lid": "#bd100b",
  "eyes": [
   [
    103,
    79,
    12,
    13
   ],
   [
    145,
    79,
    12,
    13
   ]
  ]
 },
 "m_blue": {
  "w": 250,
  "h": 222,
  "lid": "#2c6695",
  "eyes": [
   [
    94,
    91,
    19,
    18
   ],
   [
    148,
    91,
    19,
    18
   ]
  ]
 },
 "m_green": {
  "w": 250,
  "h": 223,
  "lid": "#74871c",
  "eyes": [
   [
    92,
    93,
    19,
    17
   ],
   [
    155,
    93,
    19,
    17
   ]
  ]
 },
 "boss1": {
  "w": 480,
  "h": 428,
  "lid": "#c82211",
  "eyes": [
   [
    203,
    138,
    25,
    21
   ],
   [
    272,
    138,
    25,
    21
   ]
  ]
 },
 "boss2": {
  "w": 480,
  "h": 457
 },
 "boss3": {
  "w": 480,
  "h": 427,
  "lid": "#4f6d0e",
  "eyes": [
   [
    188,
    146,
    27,
    26
   ],
   [
    278,
    146,
    27,
    26
   ]
  ]
 },
 "boss4": {
  "w": 480,
  "h": 452,
  "lid": "#5b2f7a",
  "eyes": [
   [
    185,
    152,
    29,
    26
   ],
   [
    292,
    152,
    29,
    26
   ]
  ]
 },
 "boss5": {
  "w": 520,
  "h": 462,
  "lid": "#8a0504",
  "eyes": [
   [
    205,
    140,
    25,
    21
   ],
   [
    306,
    140,
    25,
    21
   ]
  ]
 },
 "bk0": {
  "w": 163,
  "h": 192
 },
 "bk1": {
  "w": 177,
  "h": 258
 },
 "bk2": {
  "w": 145,
  "h": 300
 },
 "bk3": {
  "w": 130,
  "h": 300
 },
 "bk4": {
  "w": 271,
  "h": 251
 },
 "bk5": {
  "w": 152,
  "h": 300
 },
 "gf0": {
  "w": 265,
  "h": 300
 },
 "gf1": {
  "w": 267,
  "h": 300
 },
 "gf2": {
  "w": 219,
  "h": 300
 },
 "gf3": {
  "w": 189,
  "h": 300
 },
 "gf4": {
  "w": 265,
  "h": 300
 },
 "gf5": {
  "w": 220,
  "h": 300
 },
 "i_rapid": {
  "w": 82,
  "h": 128
 },
 "i_spread": {
  "w": 128,
  "h": 127
 },
 "i_big": {
  "w": 48,
  "h": 128
 },
 "i_coin": {
  "w": 127,
  "h": 128
 },
 "i_heart": {
  "w": 128,
  "h": 115
 },
 "i_bomb": {
  "w": 104,
  "h": 128
 },
 "i_shield": {
  "w": 108,
  "h": 128
 },
 "i_star": {
  "w": 128,
  "h": 124
 },
 "i_clock": {
  "w": 127,
  "h": 128
 }
};
var VER=1,SKEY='kairon_toysoldier_save';
var FW=540,LH=960;
var SOUNDS=['btn','shoot','bhit','burst','coin','pickup','recruit','power','gate','gatebad','heal','hurt','die','lost','roar','bossdie','bomb','wave','golden','warn','train','win','lose','buy','nope','music','v_hello','v_go','v_tut','v_new','v_big','v_boss','v_win','v_lose','v_golden','v_bomb','v_upgrade','v_final','v_weak','v_low','v_coins'];
var ART=['h_bear','h_robot','h_trumpet','m_red','m_blue','m_green','boss1','boss2','boss3','boss4','boss5','bk0','bk1','bk2','bk3','bk4','bk5','gf0','gf1','gf2','gf3','gf4','gf5','i_rapid','i_spread','i_big','i_coin','i_heart','i_bomb','i_shield','i_star','i_clock','bg1','bg2','bg3','bg4','bg5','floor1','floor2','floor3','floor4','floor5'];
var FLASH=['m_red','m_blue','m_green','boss1','boss2','boss3','boss4','boss5','bk0','bk1','bk2','bk3','bk4','bk5','gf0','gf1','gf2','gf3','gf4','gf5','h_bear','h_robot','h_trumpet'];
var $=function(i){return document.getElementById(i);};
var IM={},FL={},loaded=0;
var Q=(function(){var o={},s=location.search.replace(/^\?/,'').split('&');s.forEach(function(p){if(!p)return;var k=p.split('=');o[k[0]]=decodeURIComponent(k[1]||'1');});return o;})();
/* ---------- text ---------- */
var TX={
 title:'ทหารของเล่น',title2:'พิทักษ์ห้องหนู',sub:'ลากนิ้ว พาทีมทหารไม้ลุยห้องนอน!',tapStart:'แตะเพื่อเริ่ม',loading:'กำลังโหลด',
 play:'เล่น',shop:'ร้านอัปเกรด',back:'กลับ',level:'ด่าน',resume:'เล่นต่อ',restart:'เริ่มใหม่',menu:'หน้าหลัก',sound:'เสียง',on:'เปิด',off:'ปิด',paused:'พักเกม',
 win:'ผ่านด่านแล้ว!',lose:'ทีมแพ้แล้ว',next:'ด่านต่อไป',retry:'เล่นอีกครั้ง',coins:'เหรียญ',buy:'ซื้อ',max:'สูงสุด',lvl:'เลเวล',
 adFree:'ดูโฆษณาจำลอง รับเหรียญ +100',adX2:'ดูโฆษณาจำลอง รับเหรียญ x2',adRev:'ดูโฆษณาจำลอง สู้ต่อด้วยทหาร 5 ตัว',noThanks:'ไม่ล่ะ',adTitle:'โฆษณาจำลอง (ทดสอบ)',adHint:'หน้าจอทดสอบ ไม่ใช่โฆษณาจริง',adNone:'ตอนนี้ยังดูไม่ได้ รอสักครู่นะ',adDone:'ได้รับรางวัลแล้ว!',adEarly:'ปิดก่อนจบ ไม่ได้รางวัล',
 t1:'ลากนิ้วซ้าย-ขวา พาทีมเดิน ทีมยิงเองเลย!',t2:'ยิงกล่องให้เลขเหลือ 0 กล่องจะแตก แล้วมีของรางวัลตกออกมา',t3:'วิ่งผ่านประตู x2 +3 ทีมจะใหญ่ขึ้น แล้วไปสู้บอสท้ายด่าน!',tnext:'ต่อไป',tgo:'เริ่มเลย!',
 go:'ลุยเลย!',boss:'บอสมาแล้ว!',trainW:'ระวังรถไฟ!',ballW:'ระวังลูกบอล!',goldW:'กล่องทองคำ!',weak:'ยิงจุดเรืองแสง!',
 gotRecruit:'เพื่อนใหม่!',gotRapid:'ยิงรัวขึ้น!',gotSpread:'ยิงกระจาย!',gotBig:'ดาร์ทใหญ่ขึ้น!',gotCoin:'เหรียญ',gotHeart:'ฟื้นทีม!',gotBomb:'ตูม!',
 stars:'ดาว',earned:'เหรียญที่ได้',bonus:'โบนัสผ่านด่าน',left:'ทหารที่เหลือ',
 up:{bear:['หมีอัศวิน','เกราะหนา ทนขึ้น'],robot:['หุ่นยนต์ไม้','ยิงรัวขึ้น'],trump:['ทหารเป่าแตร','คลื่นเสียงแรงขึ้น'],squad:['ทีมเริ่มต้น','เริ่มด้วยทหารมากขึ้น']},
 lv:['พรมห้องนอน','ใต้เตียงมืดๆ','มุมรถไฟของเล่น','ชั้นหนังสือ','ห้องนอนยามค่ำ'],
 bn:['ยักษ์ขนแดง','ราชาตาเดียว','เจ้าหนามเขียว','หมึกม่วงจอมซน','มังกรตุ๊กตายักษ์'],
 clear:'ผ่านครบทุกด่านแล้ว! เก่งที่สุด!'
};
/* ---------- save ---------- */
function defSave(){return {v:VER,coins:0,maxLv:1,stars:{},up:{bear:0,robot:0,trump:0,squad:0},mute:false,tut:false,ads:{day:'',n:0,last:0},plays:0};}
function merge(d,s){for(var k in d){if(s[k]===undefined)s[k]=d[k];else if(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k]))s[k]=merge(d[k],s[k]);}return s;}
function loadSave(){var s=null;try{s=JSON.parse(localStorage.getItem(SKEY));}catch(e){}if(!s||typeof s!=='object')return defSave();s.v=VER;return merge(defSave(),s);}
var SAVE=loadSave();
function save(){try{localStorage.setItem(SKEY,JSON.stringify(SAVE));}catch(e){}}
/* ---------- audio ---------- */
var AC=null,BUF={},master=null,musicNode=null,musicGain=null,lastPlay={},voicePlaying=0;
function audioInit(){if(AC){if(AC.state==='suspended')AC.resume();return;}
 try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
 master=AC.createGain();master.gain.value=SAVE.mute?0:1;master.connect(AC.destination);
 SOUNDS.forEach(function(n){fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;if(n==='music')startMusic();}).catch(function(){});});}
function startMusic(){if(!AC||!BUF.music||musicNode)return;var s=AC.createBufferSource();s.buffer=BUF.music;s.loop=true;musicGain=AC.createGain();musicGain.gain.value=.3;s.connect(musicGain);musicGain.connect(master);s.start();musicNode=s;}
function musicVol(v){if(musicGain)musicGain.gain.value=v;}
function sfx(n,vol,rate,gap){if(!AC||!BUF[n]||SAVE.mute)return;var now=AC.currentTime;if(lastPlay[n]&&now-lastPlay[n]<(gap||.045))return;lastPlay[n]=now;var s=AC.createBufferSource();s.buffer=BUF[n];if(rate)s.playbackRate.value=rate;var g=AC.createGain();g.gain.value=vol==null?.8:vol;s.connect(g);g.connect(master);s.start();}
function say(n,force){if(!AC||!BUF['v_'+n]||SAVE.mute)return;var now=AC.currentTime;if(!force&&now<voicePlaying)return;var b=BUF['v_'+n];voicePlaying=now+b.duration+.3;var s=AC.createBufferSource();s.buffer=b;var g=AC.createGain();g.gain.value=1;s.connect(g);g.connect(master);s.start();}
function setMute(m){SAVE.mute=m;save();if(master)master.gain.value=m?0:1;document.querySelectorAll('.sndb').forEach(function(b){b.classList.toggle('off',m);});}
/* ---------- helpers ---------- */
var rnd=Math.random;function rr(a,b){return a+rnd()*(b-a);}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function lerp(a,b,t){return a+(b-a)*t;}
function mul32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var W=390,H=844,DPR=1,SC=1,cv=$('scene'),cx=cv.getContext('2d'),gameEl=$('game');
function layout(){var iw=window.innerWidth,ih=window.innerHeight;W=Math.min(iw,Math.floor(ih*0.5625));H=ih;gameEl.style.width=W+'px';gameEl.style.height=H+'px';document.documentElement.style.fontSize=(W/39)+'px';DPR=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);SC=W/FW;LH=H/SC;}
/* ---------- assets ---------- */
function loadArt(done){var n=ART.length;ART.forEach(function(k){var im=new Image();im.onload=function(){IM[k]=im;if(FLASH.indexOf(k)>=0){var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);FL[k]=c;}if(++loaded===n)done();var p=$('loadp');if(p)p.style.width=(loaded/n*100)+'%';};im.onerror=function(){if(++loaded===n)done();};im.src='art/'+k+'.webp';});}
/* sprite draw: anchor bottom-centre. o:{sx,sy,rot,flash,blink,alpha,flip,piv} */
function spr(k,x,y,h,o){var im=IM[k];if(!im)return;o=o||{};var sc=h/im.height,w=im.width*sc,sx=(o.sx||1),sy=(o.sy||1);
 cx.save();cx.translate(x,y);if(o.rot)cx.rotate(o.rot);cx.scale((o.flip?-1:1)*sx,sy);if(o.alpha!=null)cx.globalAlpha=o.alpha;
 cx.drawImage(im,-w/2,-h,w,h);
 var m=META[k];
 if(o.blink&&m&&m.eyes){cx.fillStyle=m.lid;cx.strokeStyle='rgba(40,20,10,.85)';cx.lineCap='round';m.eyes.forEach(function(e){var ex=(e[0]-im.width/2)*sc,ey=(e[1]-im.height)*sc,rx=e[2]*sc*1.2,ry=e[3]*sc*1.25;cx.beginPath();cx.ellipse(ex,ey,rx,ry,0,0,6.3);cx.fill();cx.lineWidth=Math.max(1.2,rx*.28);cx.beginPath();cx.arc(ex,ey-ry*.1,rx*.8,.15*Math.PI,.85*Math.PI);cx.stroke();});}
 if(o.flash&&FL[k]){cx.globalAlpha=o.flash*(o.alpha==null?1:o.alpha);cx.drawImage(FL[k],-w/2,-h,w,h);}
 cx.restore();}
function txt(s,x,y,sz,fill,stroke,al){cx.font='800 '+sz+'px Kanit,sans-serif';cx.textAlign=al||'center';cx.textBaseline='middle';cx.lineJoin='round';if(stroke){cx.lineWidth=sz*.22;cx.strokeStyle=stroke;cx.strokeText(s,x,y);}cx.fillStyle=fill;cx.fillText(s,x,y);}
/* ---------- levels ---------- */
var LV=[
 {bg:1,hz:.335,fa:.42,len:42,spd:128,gap:3.3,hp0:7,mons:['red'],bossHp:700,boss:1,bh:300,train:false},
 {bg:2,hz:.37,fa:.5,len:48,spd:134,gap:3.1,hp0:9,mons:['red','blue'],bossHp:1100,boss:2,bh:320,train:false},
 {bg:3,hz:.31,fa:.38,len:54,spd:140,gap:3.0,hp0:11,mons:['red','blue','green'],bossHp:1700,boss:3,bh:320,train:true},
 {bg:4,hz:.335,fa:.45,len:60,spd:146,gap:2.9,hp0:13,mons:['blue','green','red'],bossHp:2400,boss:4,bh:340,train:true},
 {bg:5,hz:.365,fa:.4,len:66,spd:152,gap:2.8,hp0:15,mons:['red','blue','green'],bossHp:2800,boss:5,bh:360,train:true}
];
var MT={red:{img:'m_red',hp:4,sp:70,dmg:1,h:84,w:.95},blue:{img:'m_blue',hp:10,sp:52,dmg:2,h:92,w:1},green:{img:'m_green',hp:24,sp:40,dmg:2,h:100,w:1.05}};
var HT={bear:{img:'h_bear',h:104,iv:.62},robot:{img:'h_robot',h:108,iv:.2},trump:{img:'h_trumpet',h:108,iv:1.2}};
var BREW=['recruit','recruit','recruit','coin','coin','coin','rapid','spread','big','heart','bomb'];
var SY=730,HZ=320,CAP=24;
function S(y){return clamp(.42+.58*(y-HZ)/(SY-HZ),.3,1.4);}
function geo(){SY=LH-235;HZ=(G?G.cfg:LV[0]).hz*LH;}
/* ---------- script (deterministic per level) ---------- */
function genScript(L){var cfg=LV[L-1],r=mul32(L*7919+13),ev=[],t=2.4,n=Math.floor((cfg.len-5)/cfg.gap),last='',rep=0;
 function pick(a){return a[Math.floor(r()*a.length)];}
 function rew(hp){var k=pick(BREW);return k;}
 function blockRow(tt,cnt,p,mixed){var lanes=cnt===1?[(r()-.5)*240]:cnt===2?[-135,135]:[-170,0,170];lanes.forEach(function(ox){
   var hp=Math.round((cfg.hp0+L*2.5)*(.7+p*1.0)*(.8+r()*.5));if(mixed)hp=Math.round(hp*.8);
   var gift=r()<.4;ev.push({t:tt,k:'blk',spr:gift?pick(['gf0','gf1','gf2','gf3','gf5']):pick(['bk0','bk1','bk2','bk3','bk4','bk5']),ox:ox+(r()-.5)*20,hp:Math.max(4,hp),rew:rew(hp)});});}
 function monRow(tt,p){var c=3+L+Math.floor(p*4);for(var i=0;i<c;i++){var ty=pick(cfg.mons);if(ty==='green'&&p<.3)ty='blue';if(ty==='blue'&&L===1)ty='red';ev.push({t:tt+i*.35+r()*.25,k:'mon',ty:ty,ox:(r()-.5)*420,sc:1+p*.5});}}
 var gpool=[[['+',3],['x',2]],[['+',4],['+',2]],[['x',2],['-',2]],[['+',5],['-',3]],[['x',2],['+',3]]];
 ev.push({t:2.2,k:'gate',ops:[['+',3],['x',2]]});t=2.2+cfg.gap;
 for(var i=1;i<n;i++){var p=i/n,kind;
  if(i===1||i===2)kind='blk';else{var q=r();kind=q<.38?'blk':q<.56?'gate':q<.82?'mon':'mix';if(kind===last&&++rep>1){kind=kind==='blk'?'mon':'blk';rep=0;}}
  if(kind!==last)rep=0;last=kind;
  if(kind==='blk')blockRow(t,1+(r()<.6)+(r()<.4),p,false);
  else if(kind==='gate'){var g=pick(gpool).slice();if(r()<.5)g.reverse();ev.push({t:t,k:'gate',ops:g});}
  else if(kind==='mon')monRow(t,p);
  else{blockRow(t,1+(r()<.5),p,true);monRow(t+.8,p*.8);}
  if(i===Math.floor(n*.3))ev.push({t:t+1.4,k:'ball'});
  if(i===Math.floor(n*.5))ev.push({t:t+1.2,k:'gold'});
  if(cfg.train&&i===Math.floor(n*.62))ev.push({t:t+.6,k:'train'});
  if(i===Math.floor(n*.75)&&L>=2)ev.push({t:t+.8,k:'ball'});
  if(cfg.train&&L>=4&&i===Math.floor(n*.88))ev.push({t:t+.6,k:'train'});
  t+=cfg.gap*(kind==='mon'?.85:1);}
 ev.sort(function(a,b){return a.t-b.t;});return ev;}
/* ---------- run state ---------- */
var G=null,idc=1;
function upv(k){return SAVE.up[k]||0;}
function pickType(){var c={bear:0,robot:0,trump:0};G.M.forEach(function(m){c[m.t]++;});var a=[];['bear','robot','trump'].forEach(function(k){var w=k==='robot'?4:3;if(c[k]===0)w+=6;for(var i=0;i<w;i++)a.push(k);});return a[Math.floor(rnd()*a.length)];}
function mkMember(t,x,y){var hp=t==='bear'?3+upv('bear'):1;return {t:t,x:x,y:y,tx:x,ty:y,hp:hp,mhp:hp,ph:rnd()*6.28,cd:rnd()*.5,bl:rr(1,4),blt:0,fl:0,pop:1,sq:0};}
function newRun(L,opts){opts=opts||{};var cfg=LV[L-1];G={L:L,cfg:cfg,t:0,scroll:0,ev:genScript(L),ei:0,state:'play',M:[],lx:0,tgt:0,
 blocks:[],mons:[],gates:[],items:[],balls:[],trains:[],bul:[],parts:[],flo:[],zones:[],ghosts:[],boss:null,
 pw:{rapid:0,spread:0,big:0},coins:0,peak:0,shake:0,hurt:0,paused:false,over:false,fin:0,bossT:0,revived:false,popN:0,lowSaid:false,lost:0,kills:0,spd:cfg.spd,bossAt:cfg.len,warnT:0};
 geo();G.decor=[];var dr=mul32(L*31+5),dk=['bk0','bk1','bk2','bk3','bk4','bk5','gf0','gf1','gf2','gf3','gf5'];for(var di=0;di<12;di++)G.decor.push({s:dk[Math.floor(dr()*dk.length)],x:(di%2?1:-1)*(300+dr()*60),d:di*((LH-HZ+160)/12),h:70+dr()*30});var n0=3+upv('squad');if(Q.squad)n0=+Q.squad;var order=['bear','robot','trump','robot','bear','trump','robot'];
 for(var i=0;i<n0;i++)G.M.push(mkMember(order[i%order.length],0,SY+20));
 G.peak=G.M.length;slotMembers(true);if(Q.pw){G.pw.rapid=2;G.pw.spread=1;G.pw.big=1;}
 if(Q.boss){G.t=G.bossAt-.2;G.ei=G.ev.length;}
 $('lvn').textContent=L;$('progboss').src='art/boss'+cfg.boss+'.webp';$('bossbox').classList.add('hidden');$('progfill').style.width='0%';$('coins').textContent=SAVE.coins;
 return G;}
function sortedM(){var o={bear:0,trump:1,robot:2};return G.M.slice().sort(function(a,b){return o[a.t]-o[b.t];});}
function formation(){var n=G.M.length,cols=clamp(Math.ceil(Math.sqrt(n*1.15)),1,8),rows=Math.ceil(n/cols),sx=Math.min(54,320/cols),sy=Math.min(40,190/Math.max(rows,1));return {n:n,cols:cols,rows:rows,sx:sx,sy:sy,hw:(cols-1)/2*sx+34};}
function slotMembers(snap){var f=formation(),o=sortedM();G.form=f;
 for(var i=0;i<o.length;i++){var row=Math.floor(i/f.cols),j=i%f.cols,rc=Math.min(f.cols,f.n-row*f.cols);var m=o[i];m.tx=G.lx+(j-(rc-1)/2)*f.sx+(row%2?f.sx*.2:0);m.ty=SY+row*f.sy;if(snap){m.x=m.tx;m.y=m.ty;}}}
function hsc(){return clamp(1.04-G.M.length*.012,.6,1);}
/* ---------- effects ---------- */
function pt(o){if(G.parts.length<420)G.parts.push(o);return o;}
function burstBits(x,y,n,cols,sz){for(var i=0;i<n;i++){var a=rr(-3.1,0),v=rr(120,420);pt({k:'bit',x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,rot:rnd()*6,vr:rr(-9,9),life:rr(.5,.9),max:.9,c:cols[i%cols.length],s:sz*rr(.6,1.2)});}}
function sparkles(x,y,n,c){for(var i=0;i<n;i++){var a=rnd()*6.28,v=rr(60,240);pt({k:'spk',x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rr(.4,.8),max:.8,c:c||'#ffe14a',s:rr(5,10)});}}
function ring(x,y,c,r1){pt({k:'ring',x:x,y:y,life:.45,max:.45,c:c||'#fff',r:r1||70});}
function puff(x,y,c){for(var i=0;i<6;i++){var a=rnd()*6.28;pt({k:'puff',x:x,y:y,vx:Math.cos(a)*70,vy:Math.sin(a)*70-30,life:.4,max:.4,c:c||'#fff',s:rr(10,18)});}}
function floater(s,x,y,c,sz){G.flo.push({s:s,x:x,y:y,life:1.1,max:1.1,c:c||'#fff',sz:sz||30});}
function banner(s,boss){var b=$('banner');$('banner-t').textContent=s;b.classList.toggle('boss',!!boss);b.classList.remove('hidden');var bt=$('banner-t');bt.style.animation='none';void bt.offsetWidth;bt.style.animation='';clearTimeout(banner.h);banner.h=setTimeout(function(){b.classList.add('hidden');},boss?2200:1500);}
function shake(v){G.shake=Math.max(G.shake,v);}
/* ---------- squad ops ---------- */
function addMember(t,silent){if(G.M.length>=CAP)return null;var f=G.form,m=mkMember(t||pickType(),G.lx,SY+(f?f.rows*f.sy:0)+10);m.pop=0;G.M.push(m);G.peak=Math.max(G.peak,G.M.length);slotMembers(false);if(!silent){sparkles(270+m.tx,m.ty-40,8,'#8be0ff');}return m;}
function killMember(m,fromX,fromY){var i=G.M.indexOf(m);if(i<0)return;G.M.splice(i,1);G.lost++;G.ghosts.push({t:m.t,x:m.x,y:m.y,vx:rr(-120,120),vy:-300,rot:0,vr:rr(-8,8),life:.9});puff(270+m.x,m.y-30,'#fff');slotMembers(false);}
function hurtSquad(n,nearX,nearY,src){if(Q.god||G.state==='won'||G.state==='bossdie')return;if(n<=0)return;
 for(var k=0;k<n&&G.M.length;k++){var best=null,bd=1e9;
  for(var i=0;i<G.M.length;i++){var m=G.M[i];var d=Math.abs(m.x-nearX)*.7+Math.abs(m.y-nearY)*.6-(m.t==='bear'?60:0);if(d<bd){bd=d;best=m;}}
  if(!best)break;if(best.t==='bear'&&best.hp>1){best.hp--;best.fl=.25;best.sq=.3;sfx('hurt',.5,1.3,.1);floater('โล่!',270+best.x,best.y-100,'#9fe0ff',24);}else killMember(best);}
 G.hurt=.35;shake(7);sfx('lost',.7,1,.12);if(G.M.length&&G.M.length<=2&&!G.lowSaid){G.lowSaid=true;say('low');}
 if(!G.M.length&&G.state!=='lost'){G.state='lost';G.fin=0;sfx('lose',.8);}}
function applyGate(op,v){var n=G.M.length,x=270+G.lx;
 if(op==='+'){v=Math.floor(v);var a=Math.min(v,CAP-n);for(var i=0;i<a;i++)addMember(null,true);if(a>0){sfx('gate',.7);floater('+'+a,x,SY-140,'#8be0ff',44);sparkles(x,SY-60,14,'#8be0ff');say(a>=3?'big':'new');}else floater('เต็มแล้ว',x,SY-140,'#fff',30);}
 else if(op==='x'){var a=Math.min(n*(v-1),CAP-n);for(var i=0;i<a;i++)addMember(null,true);sfx('gate',.8);floater('x'+v,x,SY-140,'#9dff8a',50);sparkles(x,SY-60,18,'#9dff8a');if(a>0)say('big');}
 else{var a=Math.min(v,Math.max(0,n-1));for(var i=0;i<a;i++){var o=sortedM();killMember(o[o.length-1]);}sfx('gatebad',.8);floater('-'+v,x,SY-140,'#ff6b6b',44);G.hurt=.25;if(n-a<=0){}}
 slotMembers(false);}
/* ---------- spawning ---------- */
function mkBlock(e){var sp=e.spr,im=IM[sp],h=sp[0]==='g'?104:116,w=im?im.width/im.height*h:h;return {spr:sp,ox:e.ox,y:HZ-6,h:h,w:w,hp:e.hp,mhp:e.hp,rew:e.rew,fl:0,sq:0,gold:!!e.gold,id:idc++,ph:rnd()*6};}
function spawnEv(e){
 if(e.k==='blk')G.blocks.push(mkBlock(e));
 else if(e.k==='gold'){var b=mkBlock({spr:'gf4',ox:rr(-120,120),hp:Math.round(18+G.L*14),rew:'gold',gold:true});b.h=118;b.w=IM.gf4?IM.gf4.width/IM.gf4.height*118:118;G.blocks.push(b);banner(TX.goldW);sfx('golden',.6);}
 else if(e.k==='mon'){var d=MT[e.ty],hp=Math.round(d.hp*(1+.3*(G.L-1))*(e.sc||1));G.mons.push({t:e.ty,d:d,ox:e.ox,y:HZ-4,hp:hp,mhp:hp,fl:0,sq:0,ph:rnd()*6,bl:rr(1,3),blt:0,id:idc++,sp:d.sp*(1+.07*G.L)});}
 else if(e.k==='gate'){G.gates.push({y:HZ-10,ops:e.ops.map(function(o){return {op:o[0],v:o[1],base:o[1],hits:0};}),used:false,fade:1});}
 else if(e.k==='ball'){G.balls.push({x:rr(-150,150),y:HZ,vx:(rnd()<.5?-1:1)*(120+G.L*14),vy:G.spd+90,r:34,rot:0,warn:1.2,cd:0});banner(TX.ballW);sfx('warn',.5);}
 else if(e.k==='train'){G.trains.push({ox:rr(-150,150),y:HZ,state:'warn',t:0,dur:1.7});banner(TX.trainW);sfx('warn',.6);}
}
function dropReward(b){var x=b.ox,y=b.y;var k=b.rew;if(!k||k==='none')return;
 if(k==='gold'){for(var i=0;i<4;i++)G.items.push({t:'recruit',sub:pickType(),ox:x+(i-1.5)*40,y:y-i*8,life:9,ph:rnd()*6});for(var i=0;i<6;i++)G.items.push({t:'coin',ox:x+rr(-90,90),y:y-rr(0,50),life:9,ph:rnd()*6});G.items.push({t:['rapid','spread','big'][Math.floor(rnd()*3)],ox:x,y:y-30,life:9,ph:0});say('golden');return;}
 if(k==='recruit'){var c=1+(b.mhp>=30?1:0);for(var i=0;i<c;i++)G.items.push({t:'recruit',sub:pickType(),ox:x+i*34-(c-1)*17,y:y,life:9,ph:rnd()*6});return;}
 if(k==='coin'){for(var i=0;i<3;i++)G.items.push({t:'coin',ox:x+(i-1)*34,y:y-i*6,life:9,ph:rnd()*6});return;}
 G.items.push({t:k,ox:x,y:y,life:9,ph:rnd()*6});}
function damageBlock(b,d){b.hp-=d;b.fl=.12;b.sq=.14;sfx('bhit',.35,rr(.9,1.2),.06);
 if(b.hp<=0&&!b.dead){b.dead=true;sfx('burst',.8);var cols=b.spr.charAt(0)==='g'?['#e8453c','#ffc933','#2f7de1','#35a853']:['#e8453c','#2f7de1','#ffc933','#35a853'];burstBits(270+b.ox*S(b.y),b.y-30*S(b.y),14,cols,10);ring(270+b.ox*S(b.y),b.y-40,'#fff',60);shake(3);dropReward(b);G.kills++;}}
function damageMon(m,d){m.hp-=d;m.fl=.1;m.sq=.15;if(m.hp<=0&&!m.dead){m.dead=true;G.kills++;sfx('die',.5,rr(.9,1.2),.05);var X=270+m.ox*S(m.y);puff(X,m.y-30,'#fff');burstBits(X,m.y-30,5,['#ffc933','#fff'],7);if(rnd()<.18)G.items.push({t:'coin',ox:m.ox,y:m.y,life:7,ph:0});}}
/* ---------- boss ---------- */
function bossCfg(){var c=G.cfg,hp=c.bossHp;return {id:c.boss,hp:hp,mhp:hp,ox:0,y:HZ-30,state:'enter',t:0,h:c.bh,ph:0,atk:3,atkT:0,cur:null,fl:0,sq:0,bl:2,blt:0,sp:0,spotT:0,spot:0,dying:0,lunge:null,sw:0};}
function bossSpr(){return IM['boss'+G.boss.id];}
function bossBox(){var b=G.boss,s=S(b.y),h=b.h*s,im=bossSpr(),w=im?im.width/im.height*h:h;return {x:270+b.ox*s,y:b.y,h:h,w:w,s:s};}
var SPOTS=[[.5,.62],[.5,.24],[.9,.33],[.1,.33]];
function spawnMinions(n,ty){var b=G.boss;for(var i=0;i<n;i++){var d=MT[ty],hp=Math.round(d.hp*(1+.3*(G.L-1)));G.mons.push({t:ty,d:d,ox:clamp(b.ox+rr(-90,90),-220,220),y:b.y-10-rr(0,20),hp:hp,mhp:hp,fl:0,sq:0,ph:rnd()*6,bl:2,blt:0,id:idc++,sp:d.sp*1.3});}}
function bossAttack(){var b=G.boss,L=G.L,r=rnd(),hpf=b.hp/b.mhp;b.atkT=Math.max(1.6,3.8-L*.25-(1-hpf)*1.2);var id=b.id;
 var opts=['stomp','minions'];if(id>=3)opts.push('lunge');if(id>=4)opts.push('stomp2');if(id===5){opts=['breath','minions','stomp','lunge'];if(hpf<.66)opts.push('breath');}
 var a=opts[Math.floor(rnd()*opts.length)];var lx=270+G.lx;
 if(a==='stomp'||a==='stomp2'){var n=a==='stomp2'?2:1;for(var i=0;i<n;i++)G.zones.push({k:'stomp',x:i===0?G.lx+rr(-30,30):clamp(G.lx+rr(-200,200),-215,215),y:SY+20,r:95,t:0,dur:1.15+i*.25});b.sq=.35;sfx('warn',.4,1.4);}
 else if(a==='minions'){spawnMinions(2+Math.floor(L/2),G.cfg.mons[Math.floor(rnd()*G.cfg.mons.length)]);b.sq=.4;sfx('roar',.35,1.5);}
 else if(a==='lunge'){var x=clamp(G.lx+rr(-40,40),-200,200);G.zones.push({k:'lane',x:x,w:150,t:0,dur:1.3});b.lunge={x:x,t:0};sfx('warn',.5);}
 else if(a==='breath'){var ls=hpf<.33?3:hpf<.66?2:1,px=[];for(var i=0;i<ls;i++){var fx=i===0?clamp(G.lx+rr(-30,30),-210,210):rr(-210,210);if(i>0&&px.some(function(q){return Math.abs(q-fx)<150;}))fx=clamp(px[0]+(px[0]>0?-1:1)*rr(160,260),-215,215);px.push(fx);G.zones.push({k:'fire',x:fx,w:100,t:0,dur:1.4,ticks:0});}sfx('roar',.5,1.2);}}
/* ---------- update ---------- */
function hitMember(m){if(Q.god)return;if(m.t==='bear'&&m.hp>1){m.hp--;m.fl=.25;m.sq=.3;sfx('hurt',.5,1.3,.1);floater('โล่!',270+m.x,m.y-100,'#9fe0ff',24);}else killMember(m);}
function afterHurt(){G.hurt=.35;shake(8);sfx('lost',.7,1,.12);if(G.M.length&&G.M.length<=2&&!G.lowSaid){G.lowSaid=true;say('low');}if(!G.M.length&&G.state!=='lost'){G.state='lost';G.fin=0;sfx('lose',.8);}}
function intervalOf(m){var iv=HT[m.t].iv;if(m.t==='robot')iv*=Math.pow(.92,upv('robot'));return iv*Math.pow(.86,G.pw.rapid);}
function fireMember(m){var hs=hsc(),y=m.y-HT[m.t].h*hs*.7,bg=1+.45*G.pw.big,r=5*(1+.25*G.pw.big);
 if(m.t==='trump'){G.bul.push({wave:true,x:m.x,y:y,vy:-400,w:60,dmg:3*(1+.28*upv('trump'))*(1+.2*G.pw.big),hit:[],life:1.8});sfx('wave',.25,rr(.95,1.1),.12);m.sq=.2;return;}
 var d=(m.t==='bear'?1.3:1)*bg;G.bul.push({x:m.x,y:y,vx:0,vy:-880,dmg:d,r:r});
 for(var k=1;k<=G.pw.spread;k++){G.bul.push({x:m.x,y:y,vx:-k*80,vy:-860,dmg:d*.6,r:r*.85});G.bul.push({x:m.x,y:y,vx:k*80,vy:-860,dmg:d*.6,r:r*.85});}
 m.sq=.12;sfx('shoot',.16,rr(.9,1.3),.06);}
function targetHit(b,x,y,hw,hh){return Math.abs(b.x-x)<hw+(b.r||0)&&Math.abs(b.y-y)<hh+(b.r||0);}
function bulletHit(b){var i,s;
 if(G.boss){var bb=bossBox();var ex=b.x+270-bb.x,ey=b.y-(bb.y-bb.h*.5);if(G.boss.state!=='dying'&&(ex*ex)/((bb.w*.4)*(bb.w*.4))+(ey*ey)/((bb.h*.46)*(bb.h*.46))<1){hitBoss(b.dmg,b.x+270,b.y,bb);return true;}}
 for(i=0;i<G.blocks.length;i++){var k=G.blocks[i];if(k.dead)continue;s=S(k.y);if(Math.abs(b.x-k.ox*s)<k.w*s*.46+b.r&&b.y<k.y&&b.y>k.y-k.h*s-4){damageBlock(k,b.dmg);return true;}}
 for(i=0;i<G.mons.length;i++){var m=G.mons[i];if(m.dead)continue;s=S(m.y);var hh=m.d.h*s;if(Math.abs(b.x-m.ox*s)<hh*.42*m.d.w+b.r&&Math.abs(b.y-(m.y-hh*.5))<hh*.55){damageMon(m,b.dmg);return true;}}
 for(i=0;i<G.gates.length;i++){var g=G.gates[i];s=S(g.y);if(b.y<g.y&&b.y>g.y-100*s){var pi=b.x<0?0:1,o=g.ops[pi];if(o.op!=='-'&&!g.used){o.hits++;o.v=o.base+(o.op==='x'?0:Math.min(3,Math.floor(o.hits/7)));sfx('bhit',.2,1.6,.08);return true;}}}
 return false;}
function waveHit(b){var i,s;b.w=Math.min(230,b.w+260*(1/60));
 function once(o){return b.hit.indexOf(o)>=0;}
 for(i=0;i<G.blocks.length;i++){var k=G.blocks[i];if(k.dead||once(k))continue;s=S(k.y);if(Math.abs(b.x-k.ox*s)<k.w*s*.46+b.w/2&&Math.abs(b.y-(k.y-k.h*s*.5))<k.h*s*.55){b.hit.push(k);damageBlock(k,b.dmg*1.6);}}
 for(i=0;i<G.mons.length;i++){var m=G.mons[i];if(m.dead||once(m))continue;s=S(m.y);var hh=m.d.h*s;if(Math.abs(b.x-m.ox*s)<hh*.4+b.w/2&&Math.abs(b.y-(m.y-hh*.5))<hh*.6){b.hit.push(m);damageMon(m,b.dmg*1.5);}}
 if(G.boss&&!once(G.boss)&&G.boss.state!=='dying'){var bb=bossBox();if(Math.abs(b.x+270-bb.x)<bb.w*.42+b.w/2&&Math.abs(b.y-(bb.y-bb.h*.5))<bb.h*.5){b.hit.push(G.boss);hitBoss(b.dmg,b.x+270,b.y,bb,true);}}}
function hitBoss(d,px,py,bb,wv){var b=G.boss;if(b.state==='dying')return;var mul=1;
 if(b.id===5){var sp=SPOTS[b.spot],sx=bb.x-bb.w/2+sp[0]*bb.w,sy=bb.y-bb.h+sp[1]*bb.h,dd=Math.hypot(px-sx,py-sy);var dxs=Math.abs(px-sx);mul=(dxs<bb.h*.17||wv&&dxs<bb.h*.3)?3:.4;if(mul>1&&rnd()<.5)sparkles(px,py,3,'#fff6a0');}
 b.hp-=d*mul;b.fl=.1;if(rnd()<.35)sfx('bhit',.3,.7,.07);
 if(b.id===5){var hf=b.hp/b.mhp;if(hf<.66&&b.ph<1){b.ph=1;bossPhase();}if(hf<.33&&b.ph<2){b.ph=2;bossPhase();}}
 if(b.hp<=0){b.hp=0;G.state='bossdie';b.state='dying';b.dying=0;G.zones.length=0;b.lunge=null;sfx('bossdie',.9);musicVol(.12);}}
function bossPhase(){var b=G.boss;banner('บอสโมโห!',true);sfx('roar',.7);shake(10);spawnMinions(3,'blue');b.atkT=.8;b.sq=.5;}
function bomb(){sfx('bomb',1);shake(14);G.flash=.5;ring(270,SY-250,'#ffb347',300);for(var i=0;i<G.mons.length;i++)damageMon(G.mons[i],999);for(i=0;i<G.blocks.length;i++){if(!G.blocks[i].dead)damageBlock(G.blocks[i],60);}if(G.boss&&G.boss.state!=='dying'){hitBoss(G.boss.mhp*.06,270,SY-250,bossBox());}say('bomb');}
function collect(it){var x=270+it.ox*S(it.y),y=it.y;it.got=true;
 switch(it.t){
 case 'recruit':if(G.M.length>=CAP){floater('เต็มแล้ว',x,y-40,'#fff',24);break;}var m=addMember(it.sub);sfx('recruit',.7);floater(TX.gotRecruit,x,y-60,'#8be0ff',32);sparkles(x,y-30,12,'#8be0ff');if(rnd()<.5)say('new');break;
 case 'rapid':G.pw.rapid=Math.min(5,G.pw.rapid+1);sfx('power',.8);floater(TX.gotRapid,x,y-60,'#ffd84a',32);sparkles(x,y-30,12);break;
 case 'spread':G.pw.spread=Math.min(3,G.pw.spread+1);sfx('power',.8);floater(TX.gotSpread,x,y-60,'#ffd84a',32);sparkles(x,y-30,12);break;
 case 'big':G.pw.big=Math.min(4,G.pw.big+1);sfx('power',.8);floater(TX.gotBig,x,y-60,'#ffd84a',32);sparkles(x,y-30,12);break;
 case 'coin':G.coins+=5;sfx('coin',.6,rr(.95,1.2),.04);floater('+5',x,y-40,'#ffe14a',26);break;
 case 'heart':sfx('heal',.7);floater(TX.gotHeart,x,y-60,'#ff8a9a',32);G.M.forEach(function(m){if(m.t==='bear')m.hp=m.mhp;});addMember(null);addMember(null);sparkles(x,y-30,14,'#ff8a9a');break;
 case 'bomb':bomb();floater(TX.gotBomb,x,y-60,'#ffb347',36);break;}
 $('coins').textContent=SAVE.coins+G.coins;}
function update(dt){if(!G||G.paused)return;var i,j,s;
 G.scroll+=G.spd*dt*(G.state==='bossdie'||G.state==='won'?.35:1);
 if(G.state==='play'){G.t+=dt;while(G.ei<G.ev.length&&G.ev[G.ei].t<=G.t){spawnEv(G.ev[G.ei]);G.ei++;}
  if(G.t>=G.bossAt&&G.ei>=G.ev.length){G.state='boss';G.boss=bossCfg();$('bossbox').classList.remove('hidden');$('bossname').textContent=TX.bn[G.cfg.boss-1];$('bossfill').style.width='100%';banner(TX.boss,true);sfx('roar',.8);say('boss');shake(6);musicVol(.2);G.bossT=0;}}
 else if(G.state==='lost'||G.state==='won'){G.fin+=dt;}
 var pf=G.state==='play'?Math.min(1,G.t/G.bossAt):1;$('progfill').style.width=(pf*100)+'%';
 /* squad */
 var lim=Math.max(40,270-G.form.hw-8);G.tgt=clamp(G.tgt,-lim,lim);if(G.state!=='lost')G.lx+=(G.tgt-G.lx)*Math.min(1,dt*13);
 slotMembers(false);var active=G.state!=='lost';
 for(i=0;i<G.M.length;i++){var m=G.M[i];m.x+=(m.tx-m.x)*Math.min(1,dt*11);m.y+=(m.ty-m.y)*Math.min(1,dt*11);m.pop=Math.min(1,m.pop+dt*4);if(m.fl>0)m.fl-=dt;if(m.sq>0)m.sq-=dt;
  m.bl-=dt;if(m.bl<0){m.blt=.14;m.bl=rr(2,5);}if(m.blt>0)m.blt-=dt;
  if(active&&G.state!=='won'){m.cd-=dt;if(m.cd<=0){fireMember(m);m.cd+=intervalOf(m)*rr(.9,1.1);if(m.cd<0)m.cd=0;}}}
 /* bullets */
 for(i=G.bul.length-1;i>=0;i--){var b=G.bul[i];b.y+=b.vy*dt;if(b.vx)b.x+=b.vx*dt;b.life=(b.life||9)-dt;
  if(b.wave){waveHit(b);if(b.y<HZ-80||b.life<=0)G.bul.splice(i,1);continue;}
  if(b.y<HZ-80||b.life<=0||Math.abs(b.x)>330){G.bul.splice(i,1);continue;}
  if(bulletHit(b)){pt({k:'spk',x:b.x+270,y:b.y,vx:rr(-80,80),vy:rr(-120,-20),life:.25,max:.25,c:'#fff3a0',s:6});G.bul.splice(i,1);}}
 /* blocks */
 for(i=G.blocks.length-1;i>=0;i--){var k=G.blocks[i];k.y+=G.spd*dt;if(k.fl>0)k.fl-=dt;if(k.sq>0)k.sq-=dt;
  if(k.dead){G.blocks.splice(i,1);continue;}
  if(k.y>SY-30&&G.state!=='bossdie'&&G.state!=='won'){k.dead=true;var X=270+k.ox,dmg=Math.min(5,1+Math.floor(k.hp/12));burstBits(X,k.y-40,10,['#e8453c','#2f7de1','#ffc933'],10);sfx('burst',.7);for(j=0;j<dmg;j++)hurtSquad(1,k.ox,k.y);G.blocks.splice(i,1);continue;}
  if(k.y>LH+120)G.blocks.splice(i,1);}
 /* monsters */
 for(i=G.mons.length-1;i>=0;i--){var m=G.mons[i];if(m.dead){G.mons.splice(i,1);continue;}if(m.fl>0)m.fl-=dt;if(m.sq>0)m.sq-=dt;m.bl-=dt;if(m.bl<0){m.blt=.14;m.bl=rr(1.5,4);}if(m.blt>0)m.blt-=dt;
  m.y+=(m.sp+G.spd*.5)*dt;var dx=G.lx-m.ox;m.ox+=clamp(dx,-1,1)*Math.min(Math.abs(dx),(30+8*G.L)*dt);s=S(m.y);
  if(m.y>SY-70&&active){var X=m.ox*s,hit=null;for(j=0;j<G.M.length;j++){var q=G.M[j];if(Math.abs(q.x-X)<40&&Math.abs(q.y-m.y)<34){hit=q;break;}}
   if(hit){m.dead=true;puff(270+X,m.y-30,'#fff');burstBits(270+X,m.y-30,6,['#e8453c','#fff'],8);sfx('die',.5,.8);for(j=0;j<m.d.dmg;j++){if(!G.M.length)break;var t2=null,bd=1e9;G.M.forEach(function(q2){var d2=Math.abs(q2.x-X)+Math.abs(q2.y-m.y)-(q2.t==='bear'?50:0);if(d2<bd){bd=d2;t2=q2;}});if(t2)hitMember(t2);}afterHurt();continue;}}
  if(m.y>LH+100)G.mons.splice(i,1);}
 /* gates */
 for(i=G.gates.length-1;i>=0;i--){var g=G.gates[i];g.y+=G.spd*dt;if(!g.used&&g.y>=SY-24&&G.state!=='lost'){g.used=true;var o=g.ops[G.lx<0?0:1];g.pick=G.lx<0?0:1;applyGate(o.op,o.v);}if(g.used)g.fade=Math.max(0,g.fade-dt*1.6);if(g.y>LH+120)G.gates.splice(i,1);}
 /* items */
 for(i=G.items.length-1;i>=0;i--){var it=G.items[i];it.y+=G.spd*.85*dt;var dxl=G.lx-it.ox;if(it.y>SY-230&&it.y<SY+30)it.ox+=clamp(dxl,-1,1)*Math.min(Math.abs(dxl),110*dt);
  var X=it.ox*S(it.y);if(!it.got&&active){for(j=0;j<G.M.length;j++){var q=G.M[j];if(Math.abs(q.x-X)<46&&Math.abs(q.y-it.y)<70){collect(it);break;}}}
  if(it.got||it.y>LH+60)G.items.splice(i,1);}
 /* balls */
 for(i=G.balls.length-1;i>=0;i--){var bl=G.balls[i];bl.rot+=dt*4*(bl.vx>0?1:-1);if(bl.cd>0)bl.cd-=dt;
  if(bl.warn>0){bl.warn-=dt;bl.y=HZ+10;continue;}
  bl.x+=bl.vx*dt;bl.y+=bl.vy*dt;if(Math.abs(bl.x)>235){bl.x=clamp(bl.x,-235,235);bl.vx*=-1;}
  s=S(bl.y);if(bl.cd<=0&&active&&G.state!=='won'){for(j=0;j<G.M.length;j++){var q=G.M[j];if(Math.hypot(q.x-bl.x*s,q.y-(bl.y-bl.r*s))<bl.r*s+26){bl.cd=1.2;var near=[],xx=q.x,yy=q.y;for(var n=0;n<2&&G.M.length;n++){var t2=null,bd=1e9;G.M.forEach(function(q2){var d2=Math.abs(q2.x-xx)+Math.abs(q2.y-yy);if(d2<bd){bd=d2;t2=q2;}});if(t2)hitMember(t2);}afterHurt();sfx('bhit',.6,.6);break;}}}
  if(bl.y>LH+100)G.balls.splice(i,1);}
 /* trains */
 for(i=G.trains.length-1;i>=0;i--){var tr=G.trains[i];tr.t+=dt;
  if(tr.state==='warn'&&tr.t>=tr.dur){tr.state='go';tr.y=HZ;sfx('train',.7);}
  if(tr.state==='go'){tr.y+=1050*dt;s=S(tr.y);
   for(j=G.blocks.length-1;j>=0;j--){var k=G.blocks[j];if(!k.dead&&Math.abs(k.ox-tr.ox)<95&&Math.abs(k.y-tr.y)<70)damageBlock(k,9999);}
   G.mons.forEach(function(m){if(!m.dead&&Math.abs(m.ox-tr.ox)<95&&Math.abs(m.y-tr.y)<70)damageMon(m,9999);});
   if(active&&G.state!=='won'){var anyT=false;G.M.slice().forEach(function(q){if(q.trainHit!==tr&&Math.abs(q.x-tr.ox*S(q.y))<80&&Math.abs(q.y-tr.y)<60){q.trainHit=tr;hitMember(q);anyT=true;}});if(anyT)afterHurt();}
   if(tr.y>LH+400)G.trains.splice(i,1);}}
 /* zones */
 for(i=G.zones.length-1;i>=0;i--){var z=G.zones[i];z.t+=dt;
  if(z.k==='stomp'&&!z.done&&z.t>=z.dur){z.done=true;shake(11);sfx('bomb',.55,1.5);ring(270+z.x,z.y,'#ffe14a',z.r*1.5);burstBits(270+z.x,z.y,10,['#fff','#ffc933'],9);var any=false;G.M.slice().forEach(function(q){if(Math.hypot(q.x-z.x,(q.y-z.y)*1.4)<z.r){hitMember(q);any=true;}});if(any)afterHurt();}
  else if(z.k==='lane'&&!z.done&&z.t>=z.dur){z.done=true;shake(12);sfx('bomb',.6,1.3);var any=false;G.M.slice().forEach(function(q){if(Math.abs(q.x-z.x)<z.w/2){hitMember(q);any=true;}});if(any)afterHurt();}
  else if(z.k==='fire'&&z.t>=z.dur&&z.ticks<1&&z.t>=z.dur){z.ticks++;if(z.ticks===1)sfx('bomb',.5,1.8);var any=false;G.M.slice().forEach(function(q){if(Math.abs(q.x-z.x)<z.w/2){hitMember(q);any=true;}});if(any)afterHurt();}
  if(z.t>z.dur+.8)G.zones.splice(i,1);}
 /* boss */
 var b=G.boss;if(b){b.t+=dt;if(b.fl>0)b.fl-=dt;if(b.sq>0)b.sq-=dt;b.bl-=dt;if(b.bl<0){b.blt=.16;b.bl=rr(1.5,3.5);}if(b.blt>0)b.blt-=dt;
  var by=HZ+(SY-HZ)*.54;
  if(b.state==='enter'){b.y=lerp(HZ-30,by,Math.min(1,b.t/2.4));if(b.t>=2.4){b.state='fight';b.atkT=1.4;if(b.id===5){banner(TX.weak,false);say('weak');}}}
  else if(b.state==='fight'){var amp=b.id%2?80:110;var tx=b.lunge?b.lunge.x:Math.sin(b.t*(.55+.08*b.id))*amp;b.ox+=(tx-b.ox)*Math.min(1,dt*(b.lunge?7:2.5));
   b.y=by+(b.lunge?(function(){var zz=null;G.zones.forEach(function(z){if(z.k==='lane')zz=z;});if(!zz){b.lunge=null;return 0;}var u=clamp((zz.t-(zz.dur-.55))/1.1,0,1);return Math.sin(u*Math.PI)*(SY-by-40);})():0)+Math.sin(b.t*2)*4;
   if(b.id===5){b.spotT+=dt;if(b.spotT>4.2-b.ph*.8){b.spotT=0;b.spot=(b.spot+1+Math.floor(rnd()*3))%4;sparkles(0,0,0);}}
   b.atkT-=dt;if(b.atkT<=0&&G.zones.length<3&&active)bossAttack();}
  else if(b.state==='dying'){b.dying+=dt;b.ox+=Math.sin(b.dying*40)*2;if(rnd()<.4){var bb=bossBox();burstBits(bb.x+rr(-bb.w*.3,bb.w*.3),bb.y-rr(0,bb.h),3,['#ffc933','#e8453c','#fff'],9);}
   if(b.dying>1.7){G.state='won';G.fin=0;var bb=bossBox();burstBits(bb.x,bb.y-bb.h*.5,30,['#e8453c','#2f7de1','#ffc933','#35a853','#fff'],14);ring(bb.x,bb.y-bb.h*.5,'#fff',220);sfx('burst',.9);sfx('win',.8);shake(12);G.mons.forEach(function(m){damageMon(m,999);});G.boss=null;var bn=40+G.L*25;G.coins+=bn;floater('+'+bn+' เหรียญ',270,HZ+120,'#ffe14a',40);for(var q=0;q<14;q++)pt({k:'coin',x:270+rr(-80,80),y:HZ+80,vx:rr(-120,120),vy:rr(-420,-200),life:1.4,max:1.4});say(G.L===5?'final':'win');musicVol(.3);$('bossbox').classList.add('hidden');}}
  if(G.boss){$('bossfill').style.width=(100*G.boss.hp/G.boss.mhp)+'%';}}
 if(G.state==='won'&&G.fin>1.6&&!G.over)endRun(true);
 if(G.state==='lost'&&G.fin>1.1&&!G.over)endRun(false);
 /* fx */
 for(i=G.parts.length-1;i>=0;i--){var p=G.parts[i];p.life-=dt;if(p.life<=0){G.parts.splice(i,1);continue;}if(p.vx!==undefined){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.k==='bit'||p.k==='coin')p.vy+=900*dt;if(p.rot!==undefined)p.rot+=p.vr*dt;}}
 for(i=G.flo.length-1;i>=0;i--){var f=G.flo[i];f.life-=dt;f.y-=36*dt;if(f.life<=0)G.flo.splice(i,1);}
 for(i=G.ghosts.length-1;i>=0;i--){var gh=G.ghosts[i];gh.life-=dt;gh.x+=gh.vx*dt;gh.y+=gh.vy*dt;gh.vy+=900*dt;gh.rot+=gh.vr*dt;if(gh.life<=0)G.ghosts.splice(i,1);}
 if(G.shake>0)G.shake=Math.max(0,G.shake-dt*28);if(G.hurt>0)G.hurt-=dt;if(G.flash>0)G.flash-=dt;
 var ct=''+(SAVE.coins+G.coins);if(G.ct!==ct){G.ct=ct;$('coins').textContent=ct;}
 if(G.popN!==G.M.length){G.popN=G.M.length;G.popT=.25;}if(G.popT>0)G.popT-=dt;}
/* ---------- render ---------- */
var T=0;
function rrect(x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath();}
function shadow(x,y,w,a){cx.fillStyle='rgba(20,15,40,'+(a||.3)+')';cx.beginPath();cx.ellipse(x,y,w,w*.28,0,0,6.3);cx.fill();}
function drawBG(n,hzF,fa,scroll){var im=IM['bg'+n];if(im){var sc=Math.max(FW/im.width,LH/im.height),w=im.width*sc,h=im.height*sc;cx.drawImage(im,(FW-w)/2,(LH-h)/2,w,h);}else{cx.fillStyle='#2a3a78';cx.fillRect(0,0,FW,LH);}
 var fl=IM['floor'+n];if(fl){var y0=hzF*LH+LH*.05,ts=270,off=((scroll||0)*.9)%ts;cx.save();cx.beginPath();cx.rect(0,y0,FW,LH-y0);cx.clip();cx.globalAlpha=fa;
  for(var yy=y0-ts+off;yy<LH;yy+=ts)for(var xx=0;xx<FW;xx+=ts)cx.drawImage(fl,xx,yy,ts+1,ts+1);cx.restore();
  var g=cx.createLinearGradient(0,y0,0,y0+40);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0)');}}
function drawRoad(){var s0=S(HZ),s1=S(LH+40),hw=232;cx.save();
 cx.beginPath();cx.moveTo(270-hw*s0,HZ);cx.lineTo(270+hw*s0,HZ);cx.lineTo(270+hw*s1,LH+40);cx.lineTo(270-hw*s1,LH+40);cx.closePath();
 var g=cx.createLinearGradient(0,HZ,0,LH);g.addColorStop(0,'rgba(255,255,255,.04)');g.addColorStop(1,'rgba(255,255,255,.14)');cx.fillStyle=g;cx.fill();
 cx.strokeStyle='rgba(255,246,220,.55)';cx.lineWidth=3;cx.setLineDash([9,7]);
 [-1,1].forEach(function(sd){cx.beginPath();cx.moveTo(270+sd*(hw-8)*s0,HZ);cx.lineTo(270+sd*(hw-8)*s1,LH+40);cx.stroke();});cx.setLineDash([]);
 var per=110,sc=G?G.scroll:T*130;
 for(var yy=HZ+(sc%per)-per;yy<LH+10;yy+=per){var y1=Math.max(HZ,yy),y2=yy+54;if(y2<=HZ)continue;var a1=S(y1),a2=S(y2);
  [-82,82].forEach(function(ox){cx.beginPath();cx.moveTo(270+ox*a1-5*a1,y1);cx.lineTo(270+ox*a1+5*a1,y1);cx.lineTo(270+ox*a2+5*a2,y2);cx.lineTo(270+ox*a2-5*a2,y2);cx.closePath();cx.fillStyle='#ffd23a';cx.fill();cx.strokeStyle='rgba(120,70,0,.35)';cx.lineWidth=1;cx.stroke();});}
 cx.restore();
 if(G){var span=LH-HZ+160;for(var i=0;i<G.decor.length;i++){var d=G.decor[i],yy=HZ+((d.d+G.scroll*.92)%span)-30;if(yy<HZ)continue;var s=S(yy);spr(d.s,270+d.x*s,yy,d.h*s,{alpha:.95});}}}
function drawLabel(x,y,s,sz,bg,fg){cx.font='800 '+sz+'px Kanit,sans-serif';var w=Math.max(sz*1.6,cx.measureText(s).width+sz*.9),h=sz*1.18;rrect(x-w/2,y-h/2,w,h,h*.45);cx.fillStyle=bg||'#fff';cx.fill();cx.lineWidth=Math.max(2,sz*.1);cx.strokeStyle='#1d2f6f';cx.stroke();txt(s,x,y+sz*.04,sz,fg||'#1d2f6f');}
function iconFor(t){return {rapid:'i_rapid',spread:'i_spread',big:'i_big',coin:'i_coin',heart:'i_heart',bomb:'i_bomb'}[t];}
function drawBlock(k){var s=S(k.y),X=270+k.ox*s,h=k.h*s,sq=k.sq>0?k.sq/.14:0,bob=k.gold?Math.sin(T*3+k.ph)*4*s:0;
 shadow(X,k.y,k.w*s*.5,.28);
 if(k.gold){var g=cx.createRadialGradient(X,k.y-h*.5,5,X,k.y-h*.5,h*.9);g.addColorStop(0,'rgba(255,230,120,.75)');g.addColorStop(1,'rgba(255,230,120,0)');cx.fillStyle=g;cx.fillRect(X-h,k.y-h*1.5,h*2,h*2);}
 spr(k.spr,X,k.y-bob,h,{sx:1+.09*sq,sy:1-.12*sq,flash:k.fl>0?.65:0});
 var by=k.y-bob-h*.46,num=Math.ceil(k.hp);drawLabel(X,by,''+num,Math.max(16,34*s),'#fff','#1d2f6f');
 var ik=null;if(k.rew&&k.rew!=='gold'&&k.rew!=='none'){if(k.rew==='recruit'){spr('h_bear',X,k.y-h-4*s+Math.sin(T*4+k.ph)*3,40*s);}else if(IM[iconFor(k.rew)]){var im=IM[iconFor(k.rew)],ih=36*s;cx.drawImage(im,X-ih*im.width/im.height/2,k.y-bob-h-ih-4*s+Math.sin(T*4+k.ph)*3,ih*im.width/im.height,ih);}}}
function drawMon(m){var s=S(m.y),X=270+m.ox*s,h=m.d.h*s,u=Math.abs(Math.sin(T*7+m.ph));shadow(X,m.y,h*.38*m.d.w,.3);
 spr(m.d.img,X,m.y-u*9*s,h,{rot:Math.sin(T*5+m.ph)*.07,sx:1+.05*(1-u)+(m.sq>0?.1:0),sy:1-.04*(1-u)-(m.sq>0?.1:0),flash:m.fl>0?.7:0,blink:m.blt>0});
 if(m.hp<m.mhp){var w=46*s;cx.fillStyle='rgba(20,20,50,.6)';rrect(X-w/2,m.y-h-8*s,w,6*s,3*s);cx.fill();cx.fillStyle='#ff6b4a';rrect(X-w/2+1,m.y-h-7*s,Math.max(2,(w-2)*m.hp/m.mhp),4*s,2*s);cx.fill();}}
function drawItem(it){var s=S(it.y),X=270+it.ox*s,y=it.y-Math.abs(Math.sin(T*4+it.ph))*8*s,sz=54*s,pu=1+.08*Math.sin(T*6+it.ph);
 var g=cx.createRadialGradient(X,y-sz*.5,2,X,y-sz*.5,sz*.9);g.addColorStop(0,'rgba(255,255,255,.7)');g.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=g;cx.beginPath();cx.arc(X,y-sz*.5,sz*.9,0,6.3);cx.fill();
 shadow(X,it.y,sz*.4,.22);
 if(it.t==='recruit'){spr(HT[it.sub].img,X,y,sz*1.5*pu);cx.fillStyle='#2db34a';cx.beginPath();cx.arc(X+sz*.4,y-sz*1.25,sz*.2,0,6.3);cx.fill();txt('+',X+sz*.4,y-sz*1.25,sz*.3,'#fff','#12602a');}
 else{var im=IM[iconFor(it.t)];if(im){var h=sz*pu,w=h*im.width/im.height;cx.drawImage(im,X-w/2,y-h-2,w,h);}}}
var GC={'+':['#2f7de1','#1b4fa6'],'x':['#2db34a','#157a2c'],'-':['#e8453c','#a3211a']};
function drawGate(g){var s=S(g.y),hgt=124*s;cx.save();for(var p=0;p<2;p++){var o=g.ops[p],c=GC[o.op],x0=p?270+8*s:270-244*s,x1=p?270+244*s:270-8*s,al=g.used?(g.pick===p?g.fade:g.fade*.4):1;if(al<=0)continue;cx.globalAlpha=al;
  var gr=cx.createLinearGradient(0,g.y-hgt,0,g.y);gr.addColorStop(0,c[0]+'cc');gr.addColorStop(1,c[0]+'33');cx.fillStyle=gr;cx.fillRect(x0,g.y-hgt,x1-x0,hgt);
  cx.fillStyle=c[1];cx.fillRect(x0-5*s,g.y-hgt-4*s,10*s,hgt+4*s);cx.fillRect(x1-5*s,g.y-hgt-4*s,10*s,hgt+4*s);
  rrect(x0-6*s,g.y-hgt-18*s,x1-x0+12*s,34*s,12*s);var tg=cx.createLinearGradient(0,g.y-hgt-18*s,0,g.y-hgt+16*s);tg.addColorStop(0,c[0]);tg.addColorStop(1,c[1]);cx.fillStyle=tg;cx.fill();cx.lineWidth=2.5*s;cx.strokeStyle='#fff';cx.stroke();
  txt((o.op==='x'?'x':o.op)+o.v,(x0+x1)/2,g.y-hgt*.5+4*s,Math.max(22,66*s),'#fff','#10204f');
  cx.globalAlpha=al*.6;txt(o.op==='-'?'ลดทีม':'ทีมใหญ่ขึ้น',(x0+x1)/2,g.y-hgt-1*s,Math.max(10,15*s),'#fff');}
 cx.restore();}
function drawBall(bl){var s=S(bl.y);if(bl.warn>0){var X=270+bl.x*s;if(Math.floor(T*6)%2){cx.fillStyle='#ffd23a';cx.beginPath();cx.moveTo(X,HZ+8);cx.lineTo(X+26,HZ+56);cx.lineTo(X-26,HZ+56);cx.closePath();cx.fill();cx.lineWidth=3;cx.strokeStyle='#e8453c';cx.stroke();txt('!',X,HZ+42,28,'#e8453c');}return;}
 var X=270+bl.x*s,r=bl.r*s,Y=bl.y-r;shadow(X,bl.y,r*.9,.3);cx.save();cx.translate(X,Y+Math.abs(Math.sin(T*5))*-6*s);cx.beginPath();cx.arc(0,0,r,0,6.3);cx.clip();
 var cols=['#e8453c','#fff','#2f7de1','#fff','#ffc933','#fff'];for(var i=0;i<6;i++){cx.beginPath();cx.moveTo(0,0);cx.arc(0,0,r*1.2,bl.rot+i*1.0472,bl.rot+(i+1)*1.0472);cx.closePath();cx.fillStyle=cols[i];cx.fill();}
 var g=cx.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r*1.1);g.addColorStop(0,'rgba(255,255,255,.6)');g.addColorStop(.5,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,40,.35)');cx.fillStyle=g;cx.fillRect(-r,-r,r*2,r*2);cx.restore();
 cx.beginPath();cx.arc(X,Y+Math.abs(Math.sin(T*5))*-6*s,r,0,6.3);cx.lineWidth=3;cx.strokeStyle='#1d2f6f';cx.stroke();}
function drawTrainLane(tr){var s0=S(HZ),s1=S(LH+40),hw=88,warn=tr.state==='warn',a=warn?.22+.14*Math.sin(T*14):.12;cx.save();cx.beginPath();cx.moveTo(270+(tr.ox-hw)*s0,HZ);cx.lineTo(270+(tr.ox+hw)*s0,HZ);cx.lineTo(270+(tr.ox+hw)*s1,LH+40);cx.lineTo(270+(tr.ox-hw)*s1,LH+40);cx.closePath();cx.fillStyle='rgba(232,69,60,'+a+')';cx.fill();
 cx.strokeStyle='rgba(70,55,50,.8)';cx.lineWidth=3;[-30,30].forEach(function(o){cx.beginPath();cx.moveTo(270+(tr.ox+o)*s0,HZ);cx.lineTo(270+(tr.ox+o)*s1,LH+40);cx.stroke();});
 cx.strokeStyle='rgba(120,80,40,.75)';cx.lineWidth=4;for(var yy=HZ+((G.scroll)%46);yy<LH+40;yy+=46){var s=S(yy);cx.beginPath();cx.moveTo(270+(tr.ox-42)*s,yy);cx.lineTo(270+(tr.ox+42)*s,yy);cx.stroke();}
 if(warn&&Math.floor(T*6)%2){[HZ+40,SY-70].forEach(function(yy){var X=270+tr.ox*S(yy);cx.fillStyle='#ffd23a';cx.beginPath();cx.moveTo(X,yy-30);cx.lineTo(X+24,yy+12);cx.lineTo(X-24,yy+12);cx.closePath();cx.fill();cx.lineWidth=3;cx.strokeStyle='#e8453c';cx.stroke();txt('!',X,yy+2,26,'#e8453c');});}cx.restore();}
function drawTrain(tr){if(tr.state!=='go')return;var s=S(tr.y),X=270+tr.ox*s;
 var cars=[['#2f7de1',3],['#ffc933',2],['#35a853',1]];cars.forEach(function(c,i){var cy=tr.y-(c[1])*92*s,cs=S(cy),cX=270+tr.ox*cs,w=118*cs,h=78*cs;if(cy<HZ-40)return;shadow(cX,cy,w*.5,.25);rrect(cX-w/2,cy-h,w,h,10*cs);var g=cx.createLinearGradient(0,cy-h,0,cy);g.addColorStop(0,c[0]);g.addColorStop(1,'rgba(20,20,60,.7)');cx.fillStyle=c[0];cx.fill();cx.fillStyle=g;cx.globalAlpha=.35;cx.fill();cx.globalAlpha=1;cx.lineWidth=3;cx.strokeStyle='#1d2f6f';cx.stroke();
  cx.fillStyle='#fff';rrect(cX-w*.36,cy-h*.78,w*.72,h*.3,6*cs);cx.fill();});
 var w=150*s,h=120*s;shadow(X,tr.y,w*.55,.3);rrect(X-w/2,tr.y-h,w,h,16*s);cx.fillStyle='#e8453c';cx.fill();cx.lineWidth=3.5;cx.strokeStyle='#1d2f6f';cx.stroke();
 cx.fillStyle='#ffc933';rrect(X-w/2,tr.y-h*.36,w,h*.2,6*s);cx.fill();cx.fillStyle='#2f7de1';rrect(X-w*.34,tr.y-h*1.24,w*.68,h*.3,8*s);cx.fill();cx.stroke();cx.fillStyle='#fff';rrect(X-w*.26,tr.y-h*.92,w*.52,h*.34,8*s);cx.fill();cx.stroke();
 cx.fillStyle='#fff7b0';cx.beginPath();cx.arc(X,tr.y-h*.72,h*.12,0,6.3);cx.fill();cx.stroke();cx.fillStyle='#1d2f6f';[-.3,.3].forEach(function(o){cx.beginPath();cx.arc(X+o*w,tr.y-h*.08,h*.12,0,6.3);cx.fill();});}
function drawZone(z){cx.save();
 if(z.k==='stomp'){var u=Math.min(1,z.t/z.dur),X=270+z.x,Y=z.y;cx.globalAlpha=z.done?Math.max(0,1-(z.t-z.dur)/.5):1;cx.fillStyle='rgba(232,69,60,'+(.16+.2*u)+')';cx.beginPath();cx.ellipse(X,Y,z.r,z.r*.5,0,0,6.3);cx.fill();cx.strokeStyle='rgba(232,69,60,.9)';cx.lineWidth=4;cx.setLineDash([10,7]);cx.stroke();cx.setLineDash([]);cx.fillStyle='rgba(255,90,70,.45)';cx.beginPath();cx.ellipse(X,Y,z.r*u,z.r*.5*u,0,0,6.3);cx.fill();if(!z.done&&Math.floor(T*8)%2)txt('!',X,Y-4,34,'#fff','#e8453c');}
 else if(z.k==='lane'||z.k==='fire'){var u=Math.min(1,z.t/z.dur),s0=S(HZ),s1=S(LH+40),hw=z.w/2,on=z.t>=z.dur;cx.globalAlpha=on?Math.max(0,1-(z.t-z.dur)/.7):1;
  cx.beginPath();cx.moveTo(270+(z.x-hw)*s0,HZ);cx.lineTo(270+(z.x+hw)*s0,HZ);cx.lineTo(270+(z.x+hw)*s1,LH+40);cx.lineTo(270+(z.x-hw)*s1,LH+40);cx.closePath();
  if(on&&z.k==='fire'){var g=cx.createLinearGradient(0,HZ,0,LH);g.addColorStop(0,'rgba(255,120,30,.85)');g.addColorStop(1,'rgba(255,220,80,.95)');cx.fillStyle=g;}else cx.fillStyle='rgba(232,69,60,'+(.14+.18*u+(z.k==='fire'?0:0))+')';cx.fill();
  if(!on){cx.strokeStyle='rgba(232,69,60,.8)';cx.lineWidth=3;cx.setLineDash([12,8]);cx.stroke();cx.setLineDash([]);if(Math.floor(T*8)%2){var X=270+z.x*S(SY-80);txt('!',X,SY-80,40,'#fff','#e8453c');}}
  else if(z.k==='fire'){for(var i=0;i<14;i++){var yy=HZ+(LH-HZ)*((i*.073+T*1.8)%1),X=270+(z.x+Math.sin(i*3+T*20)*hw*.5)*S(yy);cx.fillStyle=i%2?'#ffe14a':'#ff8a2a';cx.beginPath();cx.arc(X,yy,26*S(yy),0,6.3);cx.fill();}}}
 cx.restore();}
function drawMember(m,i){var hs=hsc(),d=HT[m.t],h=d.h*hs,u=Math.sin(T*10+m.ph),ab=Math.abs(u),pop=m.pop<1?1+Math.sin(m.pop*3.14)*.35:1,X=270+m.x,Y=m.y-ab*6*hs;
 shadow(X,m.y+2,h*.26,.3);var rc=m.sq>0?1:0;
 spr(d.img,X,Y+rc*2,h*Math.min(1,.4+m.pop*.6),{rot:u*.05,sx:(1+.05*(1-ab)+rc*.08)*pop,sy:(1-.04*(1-ab)-rc*.08)*pop,flash:m.fl>0?.7:0,blink:m.blt>0||m.fl>0});
 if(m.t==='bear'&&m.mhp>1){for(var q=0;q<m.mhp;q++){cx.fillStyle=q<m.hp?'#4ab6ff':'rgba(40,40,80,.45)';cx.beginPath();cx.arc(X-(m.mhp-1)*4+q*8,m.y+8,2.8,0,6.3);cx.fill();}}}
function drawBullet(b){if(b.wave){var al=clamp(b.life*1.5,0,1)*.9;cx.save();cx.globalAlpha=al;cx.lineCap='round';for(var i=0;i<3;i++){cx.beginPath();cx.arc(270+b.x,b.y+b.w*.45+i*16,b.w*.5+i*16,Math.PI*1.18,Math.PI*1.82);cx.strokeStyle=i===0?'#fff8c4':'#ffc933';cx.lineWidth=9-i*2;cx.stroke();}txt('♪',270+b.x-b.w*.38,b.y-6,22,'#ffe14a','#a86a00');txt('♪',270+b.x+b.w*.38,b.y-6,22,'#ffe14a','#a86a00');cx.restore();return;}
 var X=270+b.x,r=b.r,a=Math.atan2(b.vy,b.vx||0.001)+Math.PI/2;cx.save();cx.translate(X,b.y);cx.rotate(a-Math.PI);cx.fillStyle='rgba(255,220,80,.35)';cx.beginPath();cx.ellipse(0,r*2.2,r*.7,r*2.4,0,0,6.3);cx.fill();rrect(-r*.75,-r*1.5,r*1.5,r*3,r*.75);cx.fillStyle='#ff7a1a';cx.fill();cx.fillStyle='#ffd23a';rrect(-r*.75,-r*1.5,r*1.5,r*1.2,r*.6);cx.fill();cx.fillStyle='rgba(255,255,255,.7)';cx.fillRect(-r*.35,-r*1.1,r*.3,r*1.6);cx.restore();}
function drawBoss(){var b=G.boss,bb=bossBox(),s=bb.s,u=Math.sin(b.t*2.3),sq=b.sq>0?b.sq:0,dy=0;
 shadow(bb.x,b.y+4,bb.w*.45,.35);var al=b.state==='dying'?(Math.floor(T*20)%2?.6:1):1;
 spr('boss'+b.id,bb.x,b.y-Math.abs(u)*5*s,bb.h,{sx:1+.012*u+sq*.14,sy:1-.012*u-sq*.14,flash:b.fl>0||b.state==='dying'&&Math.floor(T*14)%2?.7:0,blink:b.blt>0,alpha:al});
 if(b.id===5&&b.state==='fight'){var sp=SPOTS[b.spot],sx=bb.x-bb.w/2+sp[0]*bb.w,sy=bb.y-bb.h+sp[1]*bb.h,pr=bb.h*.1*(1+.18*Math.sin(T*9));var g=cx.createRadialGradient(sx,sy,2,sx,sy,pr*1.7);g.addColorStop(0,'rgba(255,255,170,.95)');g.addColorStop(.5,'rgba(255,220,60,.55)');g.addColorStop(1,'rgba(255,200,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(sx,sy,pr*1.7,0,6.3);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=3;cx.beginPath();cx.arc(sx,sy,pr,0,6.3);cx.stroke();cx.beginPath();cx.moveTo(sx-pr*1.3,sy);cx.lineTo(sx+pr*1.3,sy);cx.moveTo(sx,sy-pr*1.3);cx.lineTo(sx,sy+pr*1.3);cx.stroke();}}
function drawPart(p){var a=clamp(p.life/(p.max*.5),0,1),X=p.x,Y=p.y;cx.globalAlpha=a;
 if(p.k==='bit'){cx.save();cx.translate(X,Y);cx.rotate(p.rot);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s);cx.fillStyle='rgba(255,255,255,.4)';cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.35);cx.restore();}
 else if(p.k==='spk'){cx.fillStyle=p.c;cx.beginPath();for(var i=0;i<8;i++){var r=i%2?p.s*.35:p.s,an=i*Math.PI/4;cx.lineTo(X+Math.cos(an)*r,Y+Math.sin(an)*r);}cx.closePath();cx.fill();}
 else if(p.k==='ring'){var u=1-p.life/p.max;cx.strokeStyle=p.c;cx.lineWidth=6*(1-u)+1;cx.beginPath();cx.ellipse(X,Y,p.r*u+8,(p.r*u+8)*.6,0,0,6.3);cx.stroke();}
 else if(p.k==='puff'){cx.fillStyle=p.c;cx.beginPath();cx.arc(X,Y,p.s*(1.4-a*.4),0,6.3);cx.fill();}
 else if(p.k==='coin'){var im=IM.i_coin;if(im){var h=30,w=h*Math.abs(Math.cos(T*8+p.x));cx.drawImage(im,X-w/2,Y-h/2,Math.max(4,w),h);}}
 cx.globalAlpha=1;}
function drawWorld(){var cfg=G.cfg,sh=G.shake;cx.save();if(sh>0)cx.translate(rr(-sh,sh)*.6,rr(-sh,sh)*.6);
 drawBG(cfg.bg,cfg.hz,cfg.fa,G.scroll);drawRoad();
 G.trains.forEach(drawTrainLane);G.zones.forEach(drawZone);G.gates.forEach(drawGate);
 var L=[];G.blocks.forEach(function(o){L.push([o.y,drawBlock,o]);});G.mons.forEach(function(o){L.push([o.y,drawMon,o]);});G.items.forEach(function(o){L.push([o.y,drawItem,o]);});G.balls.forEach(function(o){L.push([o.y,drawBall,o]);});G.trains.forEach(function(o){if(o.state==='go')L.push([o.y,drawTrain,o]);});if(G.boss)L.push([G.boss.y,drawBoss,null]);
 L.sort(function(a,b){return a[0]-b[0];});L.forEach(function(e){e[1](e[2]);});
 G.ghosts.forEach(function(g){spr(HT[g.t].img,270+g.x,g.y,HT[g.t].h*hsc(),{rot:g.rot,alpha:clamp(g.life/.5,0,1)});});
 var ms=G.M.slice().sort(function(a,b){return a.y-b.y;});ms.forEach(drawMember);
 G.bul.forEach(drawBullet);
 if(G.M.length&&G.state!=='lost'){var f=G.form,py=SY-HT.robot.h*hsc()-24,sc=1+(G.popT>0?G.popT*1.4:0);cx.save();cx.translate(270+G.lx,py);cx.scale(sc,sc);drawLabel(0,0,'x'+G.M.length,30,'#2f7de1','#fff');cx.restore();}
 G.parts.forEach(drawPart);
 G.flo.forEach(function(f){cx.globalAlpha=clamp(f.life/.4,0,1);txt(f.s,f.x,f.y,f.sz,f.c,'#10204f');cx.globalAlpha=1;});
 cx.restore();
 if(G.hurt>0){var g=cx.createRadialGradient(270,LH/2,LH*.25,270,LH/2,LH*.7);g.addColorStop(0,'rgba(255,40,40,0)');g.addColorStop(1,'rgba(255,40,40,'+clamp(G.hurt*1.4,0,.5)+')');cx.fillStyle=g;cx.fillRect(0,0,FW,LH);}
 if(G.flash>0){cx.fillStyle='rgba(255,255,255,'+clamp(G.flash*1.5,0,.7)+')';cx.fillRect(0,0,FW,LH);}}
var LOB=null;
function drawLobby(){drawBG(1,LV[0].hz,.42,T*60);var hs=[['h_robot',140,.3],['h_bear',270,0],['h_trumpet',400,.6]];var by=LH*.5;
 hs.forEach(function(h,i){var u=Math.sin(T*6+i*1.2),ab=Math.abs(u),sz=h[0]==='h_bear'?210:195;shadow(h[1],by+4,sz*.22,.3);var bl=(Math.floor(T*.7+i*2)%4===0&&(T*.7+i*2)%1<.14);spr(h[0],h[1],by-ab*10,sz,{sx:1+.04*(1-ab),sy:1-.03*(1-ab),blink:bl,rot:u*.03});});}
function render(){cx.setTransform(DPR*SC,0,0,DPR*SC,0,0);cx.clearRect(0,0,FW,LH);cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality='high';if(G&&inRun)drawWorld();else drawLobby();}
/* ---------- UI ---------- */
var inRun=false,selLv=1,adSt=null,keys={};
var IMGp=function(k,c){return '<img class="'+(c||'')+'" src="art/'+k+'.webp" alt="">';};
function toast(s){var e=$('toast');e.textContent=s;e.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(function(){e.classList.remove('show');},2200);}
function openSheet(html,cls){$('sheet').className=cls||'';$('sheet').innerHTML=html;$('modal').classList.remove('hidden');}
function closeSheet(){$('modal').classList.add('hidden');$('sheet').innerHTML='';}
function setScreen(html){$('screen').innerHTML=html;$('screen').classList.toggle('hidden',!html);}
function starsHtml(n){var h='';for(var i=0;i<3;i++)h+='<img class="'+(i<n?'':'off')+'" style="animation-delay:'+(.15+i*.2)+'s" src="art/i_star.webp" alt="">';return h;}
/* ads (mock) */
var AD_CAP=6,AD_CD=45000;
function adOK(){if(!window.DDAds||!DDAds.ready())return false;var a=SAVE.ads,d=new Date().toDateString();if(a.day!==d){a.day=d;a.n=0;}if(a.n>=AD_CAP)return false;if(!window.__noAdCd&&Date.now()-a.last<AD_CD)return false;return true;}
function runAd(rewardTxt,cb){if(!adOK()){toast(TX.adNone);return;}SAVE.ads.n++;save();var el=$('ad');el.classList.remove('hidden');
 el.innerHTML='<button class="x" data-act="adx">✕</button><div class="lbl">'+TX.adTitle+'</div><div class="rewl">'+rewardTxt+'</div><div class="mock"><canvas></canvas><span>Kairon Arcade</span></div><div class="bar"><i></i></div><div class="lbl">'+TX.adHint+'</div>';
 adSt={t:0,dur:window.__adDur||5,cb:cb,done:false,wp:G?G.paused:false};if(G)G.paused=true;}
function endAd(){var wp=adSt.wp;SAVE.ads.last=Date.now();save();$('ad').classList.add('hidden');if(G)G.paused=wp;adSt=null;}
function tickAd(dt){if(!adSt||adSt.done)return;adSt.t+=dt;var u=Math.min(1,adSt.t/adSt.dur),bar=$('ad').querySelector('.bar i');if(bar)bar.style.width=(u*100)+'%';
 var c=$('ad').querySelector('canvas');if(c){var w=c.clientWidth,h=c.clientHeight;if(c.width!==w){c.width=w;c.height=h;}var g=c.getContext('2d'),sv=cx;cx=g;g.clearRect(0,0,w,h);['h_robot','h_bear','h_trumpet'].forEach(function(k,i){var u2=Math.sin(adSt.t*6+i);spr(k,w*(.2+.3*i),h*.94-Math.abs(u2)*h*.08,h*.62,{sy:1+.03*u2,blink:Math.floor(adSt.t*1.5+i)%3===0&&(adSt.t*1.5+i)%1<.14});});cx=sv;}
 if(u>=1){adSt.done=true;var cb=adSt.cb;endAd();sfx('coin');toast(TX.adDone);if(cb)cb();}}
function closeAd(){if(!adSt)return;var early=!adSt.done;endAd();if(early){sfx('nope');toast(TX.adEarly);}}
/* upgrades */
var UPD={bear:{base:60,img:'h_bear'},robot:{base:80,img:'h_robot'},trump:{base:70,img:'h_trumpet'},squad:{base:120,img:'i_star'}};
function upMax(k){return k==='squad'?3:5;}
function upCost(k){return Math.round(UPD[k].base*(1+upv(k)*1.1)/10)*10;}
function coinPill(){return '<div class="pill coinpill">'+IMGp('i_coin')+'<b>'+SAVE.coins+'</b></div>';}
/* home */
function showHome(){inRun=false;G=null;geo();$('hud').classList.add('hidden');$('bossbox').classList.add('hidden');$('banner').classList.add('hidden');closeSheet();selLv=Math.min(selLv,SAVE.maxLv);
 var nodes='';for(var i=1;i<=5;i++){var lock=i>SAVE.maxLv,st=SAVE.stars[i]||0;nodes+='<button class="node'+(lock?' lock':'')+(i===selLv?' sel':'')+'" data-act="lv" data-n="'+i+'"'+(lock?' disabled':'')+'><b>'+(lock?'🔒':i)+'</b><span class="ns">'+(st?'★'.repeat(st)+'<i>'+'★'.repeat(3-st)+'</i>':'')+'</span></button>';}
 setScreen('<div class="home"><div class="topbar">'+coinPill()+'<button class="round sndb'+(SAVE.mute?' off':'')+'" data-act="snd" aria-label="sound"></button></div>'+
 '<div class="ttl"><div class="t1">'+TX.title+'</div><div class="t2">'+TX.title2+'</div><div class="tsub">'+TX.sub+'</div></div>'+
 '<div class="homebot"><div class="nodes">'+nodes+'</div><div class="lvname">'+TX.level+' '+selLv+' · '+TX.lv[selLv-1]+'</div>'+
 '<button class="btn yellow big" data-act="play">'+TX.play+' '+TX.level+' '+selLv+'</button>'+
 '<div class="row2"><button class="btn blue" data-act="shop">'+TX.shop+'</button><button class="btn green" data-act="adfree">'+TX.adFree+'</button></div>'+
 '<div class="brand">'+'<img src="logo.png" alt="">'+'Kairon Arcade · ห้องเกม ไครอน</div></div></div>');}
function showShop(){var cards='';['bear','robot','trump','squad'].forEach(function(k){var lv=upv(k),mx=upMax(k),u=TX.up[k],pips='';for(var i=0;i<mx;i++)pips+='<i class="'+(i<lv?'on':'')+'"></i>';var c=upCost(k),can=SAVE.coins>=c;
 cards+='<div class="card"><div class="ci">'+IMGp(UPD[k].img)+'</div><div class="cm"><b>'+u[0]+'</b><span>'+u[1]+'</span><div class="pips">'+pips+'</div></div>'+(lv>=mx?'<div class="maxed">'+TX.max+'</div>':'<button class="btn '+(can?'yellow':'dis')+' buy" data-act="buy" data-k="'+k+'">'+IMGp('i_coin')+c+'</button>')+'</div>';});
 setScreen('<div class="shop"><div class="topbar"><button class="round" data-act="home" aria-label="back">‹</button><div class="shtitle">'+TX.shop+'</div>'+coinPill()+'</div><div class="cards">'+cards+'</div><button class="btn blue big" data-act="home">'+TX.back+'</button></div>');}
function buy(k){var c=upCost(k);if(upv(k)>=upMax(k))return;if(SAVE.coins<c){sfx('nope');toast('เหรียญไม่พอ');return;}SAVE.coins-=c;SAVE.up[k]++;save();sfx('buy');say('upgrade');showShop();}
/* run flow */
function startRun(L){audioInit();sfx('btn');newRun(L);inRun=true;setScreen('');closeSheet();$('hud').classList.remove('hidden');musicVol(.3);SAVE.plays++;save();
 if(!SAVE.tut&&L===1&&!Q.notut){G.paused=true;showTutorial(1);}else{banner(TX.lv[L-1]);say('go');}}
function showTutorial(n){var imgs={1:'<div class="tut1">'+IMGp('h_robot')+IMGp('h_bear')+IMGp('h_trumpet')+'<div class="hand"></div></div>',2:'<div class="tut1 t2">'+IMGp('bk2')+IMGp('i_coin')+IMGp('i_rapid')+'</div>',3:'<div class="tut1 t3"><div class="gt">x2</div><div class="gt g2">+3</div>'+IMGp('boss1')+'</div>'};
 var dots='';for(var i=1;i<=3;i++)dots+='<i class="'+(i===n?'on':'')+'"></i>';
 openSheet('<div class="tut">'+imgs[n]+'<p>'+TX['t'+n]+'</p><div class="dots">'+dots+'</div><button class="btn yellow big" data-act="tutnext" data-n="'+n+'">'+(n<3?TX.tnext:TX.go)+'</button></div>','tutsheet');if(n===1)say('tut');}
function showPause(){if(!G||G.over||adSt)return;G.paused=true;sfx('btn');openSheet('<h2>'+TX.paused+'</h2><button class="btn yellow big" data-act="resume">'+TX.resume+'</button><button class="btn blue big" data-act="restart">'+TX.restart+'</button><button class="btn big sndb'+(SAVE.mute?' off':'')+'" data-act="snd2"><span class="sl">'+TX.sound+'</span></button><button class="btn dark big" data-act="home">'+TX.menu+'</button>');}
function endRun(win){G.over=true;var L=G.L;
 if(win){var ratio=G.M.length/Math.max(1,G.peak),stars=ratio>=.7?3:ratio>=.35?2:1,bonus=30*L,total=G.coins+bonus;SAVE.coins+=total;if(L>=SAVE.maxLv&&L<5)SAVE.maxLv=L+1;SAVE.stars[L]=Math.max(SAVE.stars[L]||0,stars);if(selLv<=L&&L<5)selLv=L+1;save();G.total=total;
  musicVol(.3);var last=L===5,firstClear=false;
  openSheet('<h2>'+TX.win+'</h2><div class="stars">'+starsHtml(stars)+'</div><div class="lines"><div>'+TX.earned+' <b>+'+G.coins+'</b></div><div>'+TX.bonus+' <b>+'+bonus+'</b></div><div class="tot">'+IMGp('i_coin')+'<b>+'+total+'</b></div><div class="sm">'+TX.left+' '+G.M.length+'</div></div>'+(last?'<p class="clr">'+TX.clear+'</p>':'')+
   '<button class="btn green big" data-act="adx2" id="btn-adx2">'+TX.adX2+'</button>'+(last?'':'<button class="btn yellow big" data-act="nextlv">'+TX.next+'</button>')+'<button class="btn blue big" data-act="shop">'+TX.shop+'</button><button class="btn dark big" data-act="home">'+TX.menu+'</button>','win');
  if(!adOK())$('btn-adx2').classList.add('hidden');}
 else{var keep=Math.floor(G.coins/2);SAVE.coins+=keep;save();G.keep=keep;say('lose');
  openSheet('<h2>'+TX.lose+'</h2><div class="lines"><div class="tot">'+IMGp('i_coin')+'<b>+'+keep+'</b></div></div>'+(G.revived?'':'<button class="btn green big" data-act="revive" id="btn-rev">'+TX.adRev+'</button>')+'<button class="btn yellow big" data-act="retry">'+TX.retry+'</button><button class="btn dark big" data-act="home">'+TX.menu+'</button>','lose');
  if(!G.revived&&!adOK())$('btn-rev').classList.add('hidden');}}
function revive(){G.revived=true;G.over=false;G.fin=0;G.state=G.boss?'boss':'play';G.lowSaid=false;for(var i=0;i<5;i++)addMember(null,true);G.mons.length=0;G.zones.length=0;G.blocks=G.blocks.filter(function(b){return b.y<SY-320;});G.balls.length=0;G.trains.length=0;slotMembers(true);closeSheet();G.paused=false;banner(TX.go);}
/* clicks */
$('game').addEventListener('click',function(ev){var b=ev.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;audioInit();if(a!=='buy')sfx('btn',.5);
 switch(a){
 case 'lv':selLv=+b.dataset.n;showHome();break;
 case 'play':startRun(selLv);break;
 case 'shop':closeSheet();showShop();if(G&&G.over){}inRun=false;$('hud').classList.add('hidden');break;
 case 'buy':buy(b.dataset.k);break;
 case 'home':showHome();break;
 case 'snd':setMute(!SAVE.mute);break;
 case 'snd2':setMute(!SAVE.mute);break;
 case 'adfree':runAd('+100 '+TX.coins,function(){SAVE.coins+=100;save();say('coins');showHome();});break;
 case 'tutnext':var n=+b.dataset.n;if(n<3)showTutorial(n+1);else{SAVE.tut=true;save();closeSheet();G.paused=false;banner(TX.lv[G.L-1]);say('go',true);}break;
 case 'resume':closeSheet();G.paused=false;break;
 case 'restart':case 'retry':startRun(G?G.L:selLv);break;
 case 'nextlv':startRun(Math.min(5,selLv));break;
 case 'adx2':runAd(TX.adX2.replace('ดูโฆษณาจำลอง ',''),function(){SAVE.coins+=G.total;save();$('btn-adx2').classList.add('hidden');toast('+'+G.total+' '+TX.coins);sfx('coin');});break;
 case 'revive':runAd('ทหาร 5 ตัว',function(){revive();});break;
 case 'adx':closeAd();break;
 case 'pause':showPause();break;
 }});
$('btn-pause').addEventListener('click',function(){audioInit();showPause();});
$('btn-snd').addEventListener('click',function(){audioInit();setMute(!SAVE.mute);});
/* input */
var drag=null;
function ptr(ev){return ev.clientX;}
cv.addEventListener('pointerdown',function(ev){audioInit();if(!G||!inRun||G.paused)return;drag={id:ev.pointerId,x:ev.clientX};try{cv.setPointerCapture(ev.pointerId);}catch(e){}ev.preventDefault();});
cv.addEventListener('pointermove',function(ev){if(!drag||drag.id!==ev.pointerId||!G)return;var dx=(ev.clientX-drag.x)/SC*1.35;drag.x=ev.clientX;G.tgt+=dx;ev.preventDefault();});
function dend(ev){if(drag&&drag.id===ev.pointerId)drag=null;}
cv.addEventListener('pointerup',dend);cv.addEventListener('pointercancel',dend);
window.addEventListener('keydown',function(e){keys[e.key]=true;if(e.key==='Escape'||e.key==='p'){if(G&&inRun&&!G.over){if(G.paused&&!adSt)$('sheet').querySelector('[data-act=resume]')&&(closeSheet(),G.paused=false);else showPause();}}});
window.addEventListener('keyup',function(e){keys[e.key]=false;});
document.addEventListener('visibilitychange',function(){if(document.hidden&&G&&inRun&&!G.over&&!G.paused&&!adSt)showPause();});
window.addEventListener('resize',function(){layout();geo();});
/* loop */
var last=0;
function frame(now){requestAnimationFrame(frame);var dt=Math.min(.05,(now-last)/1000||0);last=now;T=now/1000;
 if(G&&inRun&&!G.paused){var kx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0);if(kx)G.tgt+=kx*520*dt;}
 if(inRun)update(dt);tickAd(dt);render();}
/* init */
function init(){layout();geo();document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=TX[e.dataset.t];});
 var fonts=document.fonts&&document.fonts.load?Promise.all([document.fonts.load('800 24px Kanit','ทหารของเล่น 0123'),document.fonts.load('600 24px Kanit','ทหาร')]):Promise.resolve();
 loadArt(function(){fonts.catch(function(){}).then(function(){$('loadp').parentNode.parentNode.classList.add('hidden');var b=$('btn-start');b.classList.remove('hidden');
    b.addEventListener('click',function(){audioInit();sfx('btn');$('splash').classList.add('gone');setTimeout(function(){$('splash').classList.add('hidden');},400);
   if(Q.level){setTimeout(function(){startRun(clamp(+Q.level||1,1,5));},50);}else{showHome();say('hello');}});
  if(Q.level){}});});
 setMute(SAVE.mute);requestAnimationFrame(frame);}
init();
})();
