/* ศึกพิทักษ์อาณาจักรขนมไทย · Thai Dessert Kingdom Defense · Kairon Arcade — original code. */
(function(){'use strict';
var VER=1,SKEY='kairon_ddd_save';
var FW=540,FH=960;
var SOUNDS=['tap','place','swing','arrow','magic','heal','hit','die','coin','gem','leak','skill','freeze','crow','boss','star','upgrade','sell','nope','ready','tick','unlock','lose','music','v_hello','v_tdrag','v_tcoin','v_tskill','v_wave','v_crows','v_boss','v_win','v_lose','v_star','v_upgrade','v_place','v_new','v_unlock','v_revive','v_x2','v_knight','v_mage','v_archer','v_ninja','v_healer','v_witch','v_low'];
var ART=['h_knight','h_mage','h_archer','h_ninja','h_healer','h_witch','e_ant','e_fast','e_tank','e_crow','e_queen','pad','cake','jelly','bun','cookie','coin','gem','star','heart','i_fire','i_ice','i_heart','i_wind','i_heal','i_meteor','i_shield','i_lotus','i_whirl','map_a','map_b','map_c'];
// face anchors in sprite px: [cx, eyeY, halfSpacing, eyeR]
var ANC={"h_knight":[148,118,22,6],"h_mage":[144,132,15,5],"h_archer":[122,105,12,4.5],"h_ninja":[141,105,17,5.5],"h_healer":[85,115,17,5],"h_witch":[115,141,20,5.5],"e_ant":[112,80,20,9],"e_fast":[143,98,16,8],"e_tank":[112,120,14,7],"e_queen":[149,107,28,12],"e_crow":[174,60,0,0]};
var $=function(i){return document.getElementById(i);};
var IM={};
/* ---------- data ---------- */
var HORDER=['knight','mage','archer','ninja','healer','witch'];
var HERO={
 knight:{col:'#f4a6a4',cost:60,range:58,dmg:16,cd:.7,air:false,sk:'i_shield',skcd:15,h:84,icons:['i_shield','i_fire','i_heart']},
 mage:{col:'#fbd35e',cost:80,range:140,dmg:30,cd:1.5,air:true,sk:'i_meteor',skcd:20,h:90,icons:['i_meteor','i_fire','i_shield']},
 archer:{col:'#a9dcc0',cost:70,range:178,dmg:9,cd:.55,air:true,sk:'i_wind',skcd:16,h:84,icons:['i_wind','i_fire','i_heart']},
 ninja:{col:'#9fd8cf',cost:90,range:84,dmg:10,cd:.38,air:false,sk:'i_whirl',skcd:14,h:84,icons:['i_whirl','i_wind','i_shield']},
 healer:{col:'#ffc78f',cost:75,range:100,dmg:5,cd:1.2,air:true,sk:'i_heal',skcd:24,h:84,icons:['i_heal','i_heart','i_shield']},
 witch:{col:'#b9a5ea',cost:100,range:130,dmg:7,cd:1.0,air:true,sk:'i_ice',skcd:22,h:92,icons:['i_lotus','i_meteor','i_shield']}
};
var UNL={ninja:{stars:4,gems:60,offerAt:2},healer:{stars:10,gems:110,offerAt:4},witch:{stars:16,gems:160,offerAt:6}};
var ETYPE={
 ant:{img:'e_ant',hp:38,sp:34,dmg:1,rew:5,h:52},
 fast:{img:'e_fast',hp:24,sp:62,dmg:1,rew:6,h:50},
 tank:{img:'e_tank',hp:135,sp:23,dmg:2,rew:12,h:62},
 crow:{img:'e_crow',hp:46,sp:58,dmg:2,rew:9,h:48,fly:true},
 queen:{img:'e_queen',hp:1500,sp:15,dmg:12,rew:90,h:118,boss:true}
};
var LOOT=['cake','jelly','bun','cookie'];
var MAPSEQ=['a','b','c','a','b','c','a','b','c','a'];
var NLV=10;
function nWaves(L){return [3,3,4,4,5,5,5,6,6,6][L-1];}
var PATHS_RAW={"a":[[320,1005],[327,979],[363,954],[384,915],[394,872],[372,840],[370,795],[337,772],[305,744],[317,708],[338,670],[364,635],[404,614],[433,583],[459,548],[467,504],[425,502],[387,509],[344,516],[312,487],[288,449],[298,406],[330,382],[364,354],[372,350]],"b":[[505,1262],[471,1234],[454,1193],[415,1174],[373,1162],[351,1128],[350,1083],[362,1041],[392,1009],[415,972],[429,930],[449,890],[453,851],[417,823],[376,807],[344,777],[365,739],[394,705],[424,672],[440,633],[458,593],[440,554],[401,532],[359,516],[318,498],[283,471],[284,432],[319,403],[358,384],[372,350]],"c":[[265,1005],[260,974],[301,960],[343,947],[384,929],[426,915],[445,877],[466,842],[466,804],[464,768],[420,768],[389,742],[352,731],[308,728],[267,717],[265,679],[300,651],[341,633],[378,610],[417,603],[451,575],[441,534],[401,517],[362,510],[320,500],[281,476],[268,440],[302,411],[343,396],[368,368],[372,350]]};
var PADS_RAW={"a":[[268,868],[199,684],[511,724],[511,408],[226,550],[420,1000]],"b":[[270,987],[557,883],[242,754],[530,694],[553,545],[177,459]],"c":[[530,944],[329,833],[164,683],[555,553],[188,492],[420,640]]};
var CASTLE={x:292,y:240};
/* ---------- i18n ---------- */
var TX={th:{
 title:'ศึกพิทักษ์อาณาจักรขนมไทย',sub:'ปกป้องปราสาทเค้กจากมดและอีกา!',tapStart:'แตะเพื่อเริ่ม',loading:'กำลังโหลด…',
 heroes:'ฮีโร่',play:'เล่น',back:'กลับ',menu:'เมนู',retry:'เล่นใหม่',next:'ด่านถัดไป',resume:'เล่นต่อ',ok:'ตกลง',start:'เริ่มด่าน!',
 level:'ด่าน',wave:'คลื่น',gems:'เพชร',stars:'ดาว',sound:'เสียง',on:'เปิด',off:'ปิด',lang:'ภาษา',
 map:'แผนที่ผจญภัย',collection:'คอลเลกชันฮีโร่',team:'ทีมออกรบ (เลือกได้ 4 ตัว)',inTeam:'ในทีม',addTeam:'เข้าทีม',max:'สูงสุด',lv:'เลเวล',
 unlock:'ปลดล็อก',locked:'ยังล็อก',starsProg:'ดาวสะสม',
 win:'ชนะแล้ว!',lose:'ปราสาทแย่แล้ว',paused:'พักเกม',quit:'ออกจากด่าน',
 reward:'รางวัล',
 adWatch:'ดูโฆษณา',noThanks:'ไม่เป็นไร',adTitle:'โฆษณาตัวอย่าง (ทดลอง)',adHint:'ดูจนจบเพื่อรับรางวัล',adDone:'ได้รับรางวัลแล้ว!',adEarly:'ปิดก่อนจบ ไม่ได้รับรางวัลนะ',adNone:'ตอนนี้ยังไม่มีโฆษณา',
 adx2:'ดูโฆษณา 1 ครั้ง = เพชรเพิ่มอีก +{n}',adRev:'ดูโฆษณา 1 ครั้ง = ฟื้นปราสาท 50% สู้ต่อได้ทันที',adTry:'ดูโฆษณา 1 ครั้ง = ลองใช้ {h} ฟรี 1 ด่าน',
 trial:'ลองใช้',newhero:'ฮีโร่ใหม่!',unlocked:'ปลดล็อกแล้ว!',trialNext:'พร้อมลองในด่านถัดไป!',
 coinShort:'เหรียญไม่พอ',noPad:'วางบนแท่นว่างข้างทางนะ',gemShort:'เพชรไม่พอ',teamFull:'ทีมเต็มแล้ว (4 ตัว)',teamMin:'ต้องมีในทีมอย่างน้อย 1 ตัว',
 upg:'อัปเกรด',sell:'ขาย',skill:'สกิล',call:'เรียกคลื่นถัดไป',
 w1:'คลื่นที่ {n}!',wlast:'คลื่นสุดท้าย!',crows:'ฝูงอีกามาแล้ว!',boss:'ราชินีมดมาแล้ว!',
 tdrag:'ลากฮีโร่จากการ์ดด้านล่าง ไปวางบนแท่นข้างทางเดิน',tcoin:'แตะเหรียญที่ตกลงมา เพื่อเก็บไว้ซื้อฮีโร่เพิ่ม!',tskill:'แตะไอคอนสกิลเหนือหัวฮีโร่ เพื่อใช้พลังพิเศษ!',tupg:'แตะฮีโร่ เพื่ออัปเกรดหรือขาย',
 gained:'ได้รับ',firstBonus:'โบนัสผ่านครั้งแรก',tapPad:'แตะแท่นว่างเพื่อวางฮีโร่',
 lockedSlot:'ปลดล็อกฮีโร่เพิ่มเพื่อเปิดช่องนี้',noAdsLeft:'โฆษณาวันนี้ครบแล้ว',
 about:'ศึกพิทักษ์อาณาจักรขนมไทย · Kairon Arcade',
 skname:{knight:'โล่กระแทก สลบศัตรู',mage:'ดาวตกทองหยิบ',archer:'ฝนธนูรัวเร็ว',ninja:'วนลอดช่องหมุนฟัน',healer:'ข้าวเหนียวฟื้นปราสาท',witch:'อัญชันแช่แข็งทุกตัว'},
 hname:{knight:'อัศวินขนมครก',mage:'จอมเวทย์ทองหยิบ',archer:'พลธนูมะพร้าว',ninja:'นินจาลอดช่อง',healer:'หมอข้าวเหนียวมะม่วง',witch:'แม่มดดอกอัญชัน'},
 hrole:{knight:'หน้าด่านฟาดไว ตีได้รอบๆ',mage:'ยิงลูกไฟไกล ระเบิดเป็นวง',archer:'ยิงไกลมาก ตีอีกาได้',ninja:'ฟันรัวเร็ว ตีมดบนพื้น',healer:'เร่งเพื่อนๆ และฟื้นปราสาท',witch:'ทำให้ศัตรูช้าลง'}
},en:{
 title:'Thai Dessert Kingdom Defense',sub:'Protect the cake castle from ants and crows!',tapStart:'Tap to start',loading:'Loading…',
 heroes:'Heroes',play:'Play',back:'Back',menu:'Menu',retry:'Retry',next:'Next level',resume:'Resume',ok:'OK',start:'Start!',
 level:'Level',wave:'Wave',gems:'Gems',stars:'Stars',sound:'Sound',on:'On',off:'Off',lang:'Language',
 map:'Adventure map',collection:'Hero collection',team:'Battle team (pick up to 4)',inTeam:'In team',addTeam:'Add',max:'MAX',lv:'Lv',
 unlock:'Unlock',locked:'Locked',starsProg:'Stars',
 win:'Victory!',lose:'The castle is in trouble',paused:'Paused',quit:'Leave level',
 reward:'Reward',
 adWatch:'Watch ad',noThanks:'No thanks',adTitle:'Sample ad (test)',adHint:'Watch to the end to get the reward',adDone:'Reward received!',adEarly:'Closed early — no reward',adNone:'No ad available right now',
 adx2:'Watch 1 ad = +{n} extra gems',adRev:'Watch 1 ad = revive the castle at 50% and keep fighting',adTry:'Watch 1 ad = try {h} free for 1 level',
 trial:'Trial',newhero:'New hero!',unlocked:'Unlocked!',trialNext:'Ready to try in the next level!',
 coinShort:'Not enough coins',noPad:'Drop it on an empty pad beside the path',gemShort:'Not enough gems',teamFull:'Team is full (4)',teamMin:'Keep at least 1 hero in the team',
 upg:'Upgrade',sell:'Sell',skill:'Skill',call:'Call next wave',
 w1:'Wave {n}!',wlast:'Final wave!',crows:'Crow swarm incoming!',boss:'The Ant Queen arrives!',
 tdrag:'Drag a hero card from below onto a pad beside the path',tcoin:'Tap the falling coins to collect them and buy more heroes!',tskill:'Tap the skill icon above a hero to use its special power!',tupg:'Tap a hero to upgrade or sell',
 gained:'Gained',firstBonus:'First clear bonus',tapPad:'Tap an empty pad to place the hero',
 lockedSlot:'Unlock more heroes to open this slot',noAdsLeft:'No more ads today',
 about:'Thai Dessert Kingdom Defense · Kairon Arcade',
 skname:{knight:'Shield Bash — stuns foes',mage:'Golden Meteor',archer:'Rapid Arrow Rain',ninja:'Whirl Slash',healer:'Sticky-rice castle heal',witch:'Butterfly-pea Deep Freeze'},
 hname:{knight:'Khanom Krok Knight',mage:'Thong Yip Mage',archer:'Coconut Archer',ninja:'Lod Chong Ninja',healer:'Mango Sticky Rice Healer',witch:'Butterfly Pea Witch'},
 hrole:{knight:'Front-line, hits an area',mage:'Long-range exploding fireballs',archer:'Very long range, hits crows',ninja:'Rapid slashes on ground ants',healer:'Speeds up allies, heals the castle',witch:'Slows enemies down'}
}};
/* ---------- save (versioned, additive migrations only) ---------- */
function defSave(){return {v:VER,gems:30,stars:{},unlocked:{knight:1,mage:1,archer:1},lv:{knight:1,mage:1,archer:1,ninja:1,healer:1,witch:1},team:['knight','mage','archer'],lang:'th',mute:false,tutDone:false,offered:{},trial:null,ads:{day:'',n:0,last:0},revived:0};}
var MIGRATE={/* MIGRATE[n]=function(save){...return save} upgrades version n -> n+1; add fields only, never remove */};
function merge(d,s){for(var k in s){if(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k])&&s[k]&&typeof s[k]==='object')merge(d[k],s[k]);else d[k]=s[k];}return d;}
function loadSave(){var s=null;try{s=JSON.parse(localStorage.getItem(SKEY));}catch(e){}var d=defSave();if(!s||typeof s!=='object')return d;var v=s.v||1;while(v<VER){if(MIGRATE[v])s=MIGRATE[v](s);v++;}s.v=VER;var m=merge(d,s);if(!Array.isArray(m.team)||!m.team.length)m.team=['knight','mage','archer'];m.team=m.team.filter(function(h){return m.unlocked[h];}).slice(0,4);if(!m.team.length)m.team=['knight'];return m;}
var SAVE=loadSave();
function save(){try{localStorage.setItem(SKEY,JSON.stringify(SAVE));}catch(e){}}
function t(k,r){var s=(TX[SAVE.lang]||TX.th)[k];if(s===undefined)s=TX.th[k];if(s===undefined)return k;if(r)for(var x in r)s=s.replace('{'+x+'}',r[x]);return s;}
function hname(id){return (TX[SAVE.lang]||TX.th).hname[id];}
function totalStars(){var n=0;for(var k in SAVE.stars)n+=SAVE.stars[k];return n;}
function maxCleared(){var m=0;for(var k in SAVE.stars)if(SAVE.stars[k]>0)m=Math.max(m,+k);return m;}
/* ---------- audio ---------- */
var AC=null,BUF={},master=null,musicNode=null,lastPlay={},lastVoice=0,voicePlaying=0;
function audioInit(){if(AC){if(AC.state==='suspended')AC.resume();return;}
 try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
 master=AC.createGain();master.gain.value=SAVE.mute?0:1;master.connect(AC.destination);
 SOUNDS.forEach(function(n){fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;if(n==='music')startMusic();}).catch(function(){});});}
function startMusic(){if(!AC||!BUF.music||musicNode)return;var s=AC.createBufferSource();s.buffer=BUF.music;s.loop=true;var g=AC.createGain();g.gain.value=.3;s.connect(g);g.connect(master);s.start();musicNode=s;}
function sfx(n,vol,rate){if(!AC||!BUF[n]||SAVE.mute)return;var now=AC.currentTime;if(lastPlay[n]&&now-lastPlay[n]<.045)return;lastPlay[n]=now;var s=AC.createBufferSource();s.buffer=BUF[n];if(rate)s.playbackRate.value=rate;var g=AC.createGain();g.gain.value=vol==null?.8:vol;s.connect(g);g.connect(master);s.start();}
function say(n,force){if(!AC||!BUF['v_'+n]||SAVE.mute)return;var now=AC.currentTime;if(!force&&now<voicePlaying)return;var b=BUF['v_'+n];voicePlaying=now+b.duration+.25;var s=AC.createBufferSource();s.buffer=b;var g=AC.createGain();g.gain.value=1;s.connect(g);g.connect(master);s.start();}
function setMute(m){SAVE.mute=m;save();if(master)master.gain.value=m?0:1;}
/* ---------- helpers ---------- */
var rnd=Math.random;function rr(a,b){return a+rnd()*(b-a);}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function dist(ax,ay,bx,by){var dx=ax-bx,dy=ay-by;return Math.sqrt(dx*dx+dy*dy);}
var W=390,H=844,DPR=1,SC=1,OX=0,OY=0;
var cv=$('scene'),cx=cv.getContext('2d');
var gameEl=$('game');
function layout(){var iw=window.innerWidth,ih=window.innerHeight;W=Math.min(iw,Math.floor(ih*0.5625));H=ih;gameEl.style.width=W+'px';gameEl.style.height=H+'px';document.documentElement.style.fontSize=(W/39)+'px';DPR=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);SC=Math.max(W/FW,H/FH);OX=(W-FW*SC)/2;OY=(H-FH*SC)/2;}
function toast(m){var e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on');},1900);}
function banner(txt,boss){var b=$('banner');b.classList.remove('hidden');b.className=boss?'boss':'';var n=document.createElement('b');n.id='banner-t';n.textContent=txt;b.innerHTML='';b.appendChild(n);clearTimeout(banner.t);banner.t=setTimeout(function(){b.classList.add('hidden');},2000);}
function lockSvg(){return '<svg viewBox="0 0 40 48"><path d="M10 20v-6a10 10 0 0 1 20 0v6" fill="none" stroke="#9b9298" stroke-width="5" stroke-linecap="round"/><rect x="5" y="19" width="30" height="24" rx="6" fill="#bdb4ba"/><circle cx="20" cy="29" r="3.4" fill="#6f666c"/><rect x="18.4" y="30" width="3.2" height="7" rx="1.4" fill="#6f666c"/></svg>';}
/* ---------- assets ---------- */
var FLASH={},ICE={};
function loadArt(done){var n=0;ART.forEach(function(k){var im=new Image();im.onload=im.onerror=function(){if(++n===ART.length){mkTints();done();}};im.src='art/'+k+'.webp';IM[k]=im;});}
function tintOf(im,col){var c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;var g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,c.width,c.height);return c;}
function mkTints(){['e_ant','e_fast','e_tank','e_crow','e_queen','h_knight','h_mage','h_archer','h_ninja','h_healer','h_witch'].forEach(function(k){if(!IM[k]||!IM[k].naturalWidth)return;FLASH[k]=tintOf(IM[k],'#ffffff');if(k[0]==='e')ICE[k]=tintOf(IM[k],'#9fe0ff');});}
/* ---------- character drawing (painted sprite + live face) ---------- */
// o: {t,seed,blink(0..1 closed),mood:'smile'|'fight'|'happy'|'hurt'|'angry'|'dizzy',sx,sy,lean,flash,ice,flip,look:[dx,dy]}
function drawChar(g,key,x,y,h,o){var im=IM[key];if(!im||!im.naturalWidth)return;var iw=im.naturalWidth,ih=im.naturalHeight,k=h/ih;var an=ANC[key];
 g.save();g.translate(x,y);if(o.lean)g.rotate(o.lean);var sx=o.sx||1,sy=o.sy||1;if(o.flip)sx=-sx;g.scale(sx,sy);
 g.drawImage(im,-iw*k/2,-h,iw*k,h);
 if(o.ice&&ICE[key]){g.globalAlpha=.42;g.drawImage(ICE[key],-iw*k/2,-h,iw*k,h);g.globalAlpha=1;}
 if(an&&an[3]>0)drawFace(g,key,an,iw,ih,k,o);
 if(o.flash>0&&FLASH[key]){g.globalAlpha=Math.min(1,o.flash*6);g.drawImage(FLASH[key],-iw*k/2,-h,iw*k,h);g.globalAlpha=1;}
 g.restore();}
function drawFace(g,key,an,iw,ih,k,o){var ex=(an[0]-iw/2)*k,ey=(an[1]-ih)*k,sp=an[2]*k,r=an[3]*k,bl=o.blink||0,mood=o.mood||'smile',enemy=key[0]==='e';
 var look=o.look||[0,0];
 if(!enemy){// painted-clay hero: glossy dark eyes + blush + mouth
  g.fillStyle='rgba(255,130,150,.38)';[-1,1].forEach(function(s){g.beginPath();g.ellipse(ex+s*(sp+r*.95),ey+r*1.7,r*1.15,r*.7,0,0,6.3);g.fill();});
  [-1,1].forEach(function(s){var X=ex+s*sp;
   if(mood==='happy'){g.strokeStyle='#4a2b2f';g.lineWidth=Math.max(1.2,r*.55);g.lineCap='round';g.beginPath();g.arc(X,ey+r*.35,r*.85,Math.PI*1.12,Math.PI*1.88);g.stroke();}
   else if(mood==='hurt'){g.strokeStyle='#4a2b2f';g.lineWidth=Math.max(1.2,r*.5);g.lineCap='round';g.beginPath();g.moveTo(X-s*r*.8,ey-r*.8);g.lineTo(X+s*r*.6,ey);g.lineTo(X-s*r*.8,ey+r*.8);g.stroke();}
   else if(bl>.6){g.strokeStyle='#4a2b2f';g.lineWidth=Math.max(1.2,r*.5);g.lineCap='round';g.beginPath();g.moveTo(X-r*.8,ey);g.quadraticCurveTo(X,ey+r*.55,X+r*.8,ey);g.stroke();}
   else{var ry=r*1.2*(1-bl*.9);g.fillStyle='#3b2330';g.beginPath();g.ellipse(X+look[0]*r*.25,ey+look[1]*r*.2,r*.92,ry,0,0,6.3);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(X+look[0]*r*.25-r*.3,ey+look[1]*r*.2-ry*.35,r*.34*(1-bl*.7),0,6.3);g.fill();g.beginPath();g.arc(X+look[0]*r*.25+r*.3,ey+look[1]*r*.2+ry*.3,r*.16,0,6.3);g.fill();}
   if(mood==='fight'&&bl<.5){g.strokeStyle='#4a2b2f';g.lineWidth=Math.max(1,r*.4);g.lineCap='round';g.beginPath();g.moveTo(X-s*r*1.2,ey-r*1.9);g.lineTo(X+s*r*.7,ey-r*1.45);g.stroke();}
  });
  var my=ey+r*2.7;g.strokeStyle='#8a3d44';g.fillStyle='#8a3d44';g.lineWidth=Math.max(1,r*.38);g.lineCap='round';
  if(mood==='fight'||mood==='happy'){g.beginPath();g.ellipse(ex,my,r*.8,r*(mood==='fight'?.95:.7),0,0,6.3);g.fill();g.fillStyle='#ff8d9c';g.beginPath();g.ellipse(ex,my+r*.35,r*.5,r*.3,0,0,6.3);g.fill();}
  else if(mood==='hurt'){g.beginPath();g.moveTo(ex-r*.7,my+r*.2);g.quadraticCurveTo(ex,my-r*.5,ex+r*.7,my+r*.2);g.stroke();}
  else{g.beginPath();g.moveTo(ex-r*.8,my-r*.1);g.quadraticCurveTo(ex,my+r*.8,ex+r*.8,my-r*.1);g.stroke();}
 }else{// funny enemy: big white eyes with pupils + angry brows
  [-1,1].forEach(function(s){var X=ex+s*sp;
   if(mood==='dizzy'){g.strokeStyle='#3a2230';g.lineWidth=Math.max(1.4,r*.35);g.beginPath();for(var a=0;a<12;a++){var rad=a*r*.075,an2=a*.9+(o.t||0)*8;g.lineTo(X+Math.cos(an2)*rad,ey+Math.sin(an2)*rad);}g.stroke();return;}
   g.fillStyle='#fffdf6';g.beginPath();g.ellipse(X,ey,r*1.0,r*(1.1*(1-bl*.85)),0,0,6.3);g.fill();g.strokeStyle='rgba(60,30,40,.55)';g.lineWidth=Math.max(1,r*.18);g.stroke();
   if(bl<.6){g.fillStyle='#2b1824';g.beginPath();g.arc(X+look[0]*r*.38,ey+look[1]*r*.4,r*.52,0,6.3);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(X+look[0]*r*.38-r*.15,ey+look[1]*r*.4-r*.18,r*.17,0,6.3);g.fill();}
   g.strokeStyle='#3a2230';g.lineWidth=Math.max(1.5,r*.32);g.lineCap='round';g.beginPath();var lift=mood==='hurt'?-.5:.35;g.moveTo(X-s*r*1.0,ey-r*(1.2+(mood==='hurt'?.5:0)));g.lineTo(X+s*r*.9,ey-r*(1.2+(mood==='hurt'?.5:0)+lift*(mood==='hurt'?-1:1)));g.stroke();
  });
  if(key!=='e_queen'||true){g.strokeStyle='#3a2230';g.fillStyle='#4a1f2c';g.lineWidth=Math.max(1,r*.28);var my2=ey+r*2.2;if(mood==='hurt'){g.beginPath();g.ellipse(ex,my2,r*.5,r*.6,0,0,6.3);g.fill();}else{g.beginPath();g.moveTo(ex-r*.7,my2);g.quadraticCurveTo(ex,my2-r*.55,ex+r*.7,my2);g.stroke();}}
 }}
/* ---------- level/path setup ---------- */
function smoothPath(raw,sc){var p=raw.map(function(q){return [q[0]*sc,q[1]*sc];});var a=p[0],b=p[1];var dx=a[0]-b[0],dy=a[1]-b[1],l=Math.sqrt(dx*dx+dy*dy)||1;p.unshift([a[0]+dx/l*90,a[1]+dy/l*90]);
 var out=[],n=p.length;for(var i=0;i<n-1;i++){var p0=p[Math.max(0,i-1)],p1=p[i],p2=p[i+1],p3=p[Math.min(n-1,i+2)];for(var s=0;s<10;s++){var u=s/10,u2=u*u,u3=u2*u;out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*u+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*u2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*u3),.5*((2*p1[1])+(-p0[1]+p2[1])*u+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*u2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*u3)]);}}
 out.push(p[n-1]);var cum=[0];for(i=1;i<out.length;i++)cum.push(cum[i-1]+dist(out[i][0],out[i][1],out[i-1][0],out[i-1][1]));return {pts:out,cum:cum,len:cum[cum.length-1]};}
function posAt(P,s){s=clamp(s,0,P.len);var lo=0,hi=P.cum.length-1;while(hi-lo>1){var m=(lo+hi)>>1;if(P.cum[m]<=s)lo=m;else hi=m;}var a=P.pts[lo],b=P.pts[hi],d=P.cum[hi]-P.cum[lo]||1,u=(s-P.cum[lo])/d;return [a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,Math.atan2(b[1]-a[1],b[0]-a[0])];}
var PATHC={};function getPath(k){return PATHC[k]||(PATHC[k]=smoothPath(PATHS_RAW[k],.75));}
function padsOf(k){return PADS_RAW[k].map(function(p){return {x:p[0]*.75,y:p[1]*.75,hero:null};}).filter(function(p){var P=getPath(k),m=1e9;for(var i=0;i<P.pts.length;i+=3)m=Math.min(m,dist(p.x,p.y,P.pts[i][0],P.pts[i][1]));p.pd=m;return m>26&&p.y<780;});}
/* ---------- waves ---------- */
function genWave(L,w,N){var q=[],i,cnt=4+Math.floor(L*.7)+w*2,gap=Math.max(.55,1.15-L*.045);var last=w===N-1,bossLv=(L===NLV);
 for(i=0;i<cnt;i++){var ty='ant';if(L>=2&&i%3===2)ty='fast';if(L>=3&&w>=1&&i%5===4)ty='tank';q.push({t:i*gap+.5,type:ty});}
 var T=cnt*gap;
 if(L>=3&&w===Math.ceil(N/2)-1&&!last||(L>=3&&bossLv&&w===2)){var nc=4+L;for(i=0;i<nc;i++)q.push({t:T*.35+i*.45,type:'crow'});q.crows=true;}
 if(bossLv&&last){q.push({t:3,type:'queen'});for(i=0;i<8;i++)q.push({t:6+i*1.6,type:i%3===2?'tank':'ant'});q.boss=true;}
 q.sort(function(a,b){return a.t-b.t;});return q;}
/* ---------- battle state ---------- */
var B=null;
function teamFor(){var tm=SAVE.team.slice();if(SAVE.trial&&SAVE.trial.used&&!SAVE.unlocked[SAVE.trial.hero]&&tm.indexOf(SAVE.trial.hero)<0){tm=tm.slice(0,3);tm.push(SAVE.trial.hero);}return tm;}
function startBattle(L,trialHero){
 var m=MAPSEQ[L-1],P=getPath(m);var team=SAVE.team.slice();var trial=null;
 if(trialHero&&!SAVE.unlocked[trialHero]){team=team.slice(0,3);team.push(trialHero);trial=trialHero;}
 B={L:L,map:m,P:P,pads:padsOf(m),team:team,trial:trial,coins:L===1?110:135+L*6,hp:25,maxhp:25,t:0,wave:-1,N:nWaves(L),phase:'prep',prep:L===1?3600:7,spawnQ:[],wt:0,enemies:[],heroes:[],proj:[],fx:[],nums:[],drops:[],paused:false,over:false,speed:1,sel:null,drag:null,selCard:null,inc:0,shake:0,leaks:0,revived:false,gemsGot:0,kills:0,shownLow:false,tut:{step:SAVE.tutDone||L!==1?9:0,coinShown:false,skillShown:false,placed:0},placedOnce:{},elapsed:0,ghost:null,castleHit:0,cheer:0,bossWave:false};
 B.padBest=0;var bc=-1;B.pads.forEach(function(p,i){var c=0;for(var j=0;j<P.pts.length;j+=2)if(dist(p.x,p.y,P.pts[j][0],P.pts[j][1])<120)c++;p.cov=c;if(c>bc){bc=c;B.padBest=i;}});
 if(trial){SAVE.trial=null;save();}
 showScreen(null);$('hud').classList.remove('hidden');$('tray').classList.remove('hidden');renderTray();updateHud();$('btn-speed').textContent='x1';
 banner(t('level')+' '+L);sfx('ready');setTimeout(function(){if(B&&B.L===L&&B.t<3)say(L===1?'tdrag':'wave');},900);
}
function heroStats(h){var d=HERO[h.id],m=1+.22*((SAVE.lv[h.id]||1)-1),b=[1,1.55,2.2][h.lv-1];return {dmg:d.dmg*m*b,range:d.range*(1+.06*(h.lv-1)),cd:d.cd/(1+.1*(h.lv-1)),m:m*b};}
function upCost(h){return Math.round(HERO[h.id].cost*(h.lv===1?.7:1.1));}
function placeHero(id,pad,free){var d=HERO[id];if(pad.hero)return false;if(!free){if(B.coins<d.cost){sfx('nope');toast(t('coinShort'));return false;}B.coins-=d.cost;}
 var h={id:id,pad:pad,x:pad.x,y:pad.y,lv:1,cd:.4,state:'idle',wt:0,rel:0,seed:rnd()*10,nextBlink:rr(1.5,4),blink:0,bt:0,sk:d.skcd*.45,buff:0,rapid:0,cheer:0,pop:1,mood:'smile',moodT:0,tgt:null,dirx:0,hurt:0};
 pad.hero=h;B.heroes.push(h);sfx('place');puff(h.x,h.y,8,'#fff');spark(h.x,h.y-30,8);
 if(!B.placedOnce[id]){B.placedOnce[id]=1;say(id);}else if(rnd()<.25)say('place');
 B.tut.placed++;if(B.tut.step===0){B.tut.step=1;hideTip();if(B.phase==='prep')B.prep=Math.min(B.prep,3);}renderTray();updateHud();return true;}
function removeHero(h){h.pad.hero=null;B.heroes.splice(B.heroes.indexOf(h),1);}
function spawnEnemy(type){var d=ETYPE[type],L=B.L;var hpm=1+.09*(L-1)+.04*Math.max(0,B.wave);var e={type:type,d:d,hp:d.hp*hpm*(d.boss?1+.0*L:1),maxhp:d.hp*hpm,s:0,sp:d.sp*(1+.015*L)*(type==='fast'?1:rr(.92,1.08)),slow:0,slowAmt:0,stun:0,flash:0,hurt:0,phase:rnd()*6,x:0,y:0,rot:0,loot:LOOT[(rnd()*4)|0],dead:false,dying:0,sumT:4,blink:0,nextBlink:rr(1,3),seed:rnd()*10,fly:!!d.fly,p:0,wob:rnd()*6};
 if(e.fly){var left=rnd()<.5;e.sx=left?-30:FW+30;e.sy=rr(520,760);e.ex=CASTLE.x;e.ey=CASTLE.y+20;e.cxp=(e.sx+e.ex)/2+(left?-1:1)*rr(40,130);e.cyp=(e.sy+e.ey)/2-rr(30,140);var len=dist(e.sx,e.sy,e.ex,e.ey)*1.08;e.flen=len;e.x=e.sx;e.y=e.sy;sfx('crow');}
 else{var p=posAt(B.P,0);e.x=p[0];e.y=p[1];}
 B.enemies.push(e);return e;}
function dmgEnemy(e,d,o){if(e.dead)return;o=o||{};e.hp-=d;e.flash=.14;e.hurt=.2;if(o.slow){e.slow=Math.max(e.slow,o.slow);e.slowAmt=Math.max(e.slowAmt,o.amt||.45);}if(o.stun)e.stun=Math.max(e.stun,o.stun);
 addNum(e.x+rr(-8,8),e.y-e.d.h*.8,Math.round(d),o.crit?1.4:1);sfx('hit',.5,rr(.9,1.15));
 if(e.hp<=0)killEnemy(e);}
function killEnemy(e){if(e.dead)return;e.dead=true;e.dying=.01;B.kills++;sfx('die',.6,rr(.9,1.2));puff(e.x,e.y-12,10,'#fff');
 B.fx.push({k:'loot',img:e.loot,x:e.x,y:e.y-20,vx:rr(-30,30),vy:-120,t:0,life:.9});
 var n=e.type==='queen'?9:1;for(var i=0;i<n;i++)B.drops.push({x:e.x+(n>1?rr(-40,40):0),y:e.y-8,vy:-90-rnd()*40,val:Math.round(e.d.rew/n*(1.1+.04*B.L)),t:0,life:5,y0:e.y+(n>1?rr(-20,20):0)});
 if(e.type==='queen'){shake(14);}
 if(B.tut.step===1&&!B.tut.coinShown){B.tut.coinShown=true;showTip(t('tcoin'));say('tcoin');B.tut.step=2;}}
function leak(e){e.dead=true;e.dying=.01;e.leaked=true;B.hp-=e.d.dmg;B.leaks+=e.d.dmg;B.castleHit=.5;shake(8);sfx('leak');puff(CASTLE.x+10,CASTLE.y+36,10,'#ffb3c0');addNum(CASTLE.x+10,CASTLE.y+10,-e.d.dmg,1.2,'#ff8aa0');updateHud();
 if(B.hp/B.maxhp<.35&&!B.shownLow){B.shownLow=true;say('low');}
 if(B.hp<=0){B.hp=0;updateHud();loseBattle();}}
function addNum(x,y,v,sz,col){B.nums.push({x:x,y:y,v:v,t:0,sz:sz||1,col:col});}
function puff(x,y,n,col){for(var i=0;i<n;i++)B.fx.push({k:'puff',x:x+rr(-8,8),y:y+rr(-6,6),vx:rr(-40,40),vy:rr(-60,-10),t:0,life:rr(.35,.6),r:rr(3,7),col:col});}
function spark(x,y,n){for(var i=0;i<n;i++)B.fx.push({k:'spark',x:x+rr(-14,14),y:y+rr(-14,14),vx:rr(-50,50),vy:rr(-70,-10),t:0,life:rr(.5,.9),r:rr(3,6)});}
function shake(v){B.shake=Math.max(B.shake,v);}
function heroTarget(h,st){var best=null,bs=-1;for(var i=0;i<B.enemies.length;i++){var e=B.enemies[i];if(e.dead)continue;if(e.fly&&!HERO[h.id].air)continue;if(e.type!=='crow'&&e.s<=0)continue;var d=dist(h.x,h.y,e.x,e.y);if(d>st.range+(e.d.h*.2))continue;var sc=e.fly?(e.p*1000):e.s;if(sc>bs){bs=sc;best=e;}}return best;}
function auraMul(h){var m=1;if(h.buff>0)m+=.4;if(h.rapid>0)m+=1.2;B.heroes.forEach(function(o){if(o.id==='healer'&&o!==h&&dist(o.x,o.y,h.x,h.y)<130)m+=.25;});return m;}
function fireHero(h,e,st){var id=h.id,dm=st.dmg;sfxFor(id);
 if(id==='knight'){B.fx.push({k:'slash',x:e.x,y:e.y-18,t:0,life:.28,a:Math.atan2(e.y-h.y,e.x-h.x)});B.enemies.forEach(function(o){if(!o.dead&&!o.fly&&dist(o.x,o.y,e.x,e.y)<44)dmgEnemy(o,dm*(o===e?1:.6));});}
 else if(id==='ninja'){var crit=rnd()<.2;B.fx.push({k:'slash',x:e.x,y:e.y-18,t:0,life:.22,a:rr(-1,1),ninja:1});dmgEnemy(e,dm*(crit?2:1),{crit:crit});var o2=null;B.enemies.forEach(function(o){if(o!==e&&!o.dead&&!o.fly&&dist(o.x,o.y,e.x,e.y)<50)o2=o;});if(o2)dmgEnemy(o2,dm*.6);}
 else B.proj.push({id:id,x:h.x,y:h.y-HERO[id].h*.6,tx:e.x,ty:e.y-e.d.h*.5,tg:e,dmg:dm,sp:id==='archer'?460:id==='mage'?270:240,sp2:0,t:0,from:h});}
function sfxFor(id){if(id==='knight'||id==='ninja')sfx('swing',.7,rr(.95,1.1));else if(id==='archer')sfx('arrow',.7,rr(.95,1.1));else if(id==='healer')sfx('heal',.35,rr(1,1.3));else sfx('magic',.6,rr(.95,1.1));}
function hitProj(p){var e=p.tg,d=p.dmg;
 if(p.id==='mage'){B.fx.push({k:'boom',x:p.tx,y:p.ty+6,t:0,life:.4,r:40});sfx('magic',.5,.8);B.enemies.forEach(function(o){if(!o.dead&&(!!o.fly===!!e.fly)&&dist(o.x,o.y,p.tx,p.ty)<42)dmgEnemy(o,d*(o===e?1:.65));});}
 else if(p.id==='witch'){B.fx.push({k:'frost',x:p.tx,y:p.ty,t:0,life:.4});if(e&&!e.dead)dmgEnemy(e,d,{slow:2.4,amt:.5});else{}}
 else if(p.id==='healer'){B.fx.push({k:'heartpop',x:p.tx,y:p.ty,t:0,life:.5});if(e&&!e.dead)dmgEnemy(e,d);}
 else{if(e&&!e.dead)dmgEnemy(e,d);}}
function useSkill(h){if(!B||h.sk>0||B.over)return;var d=HERO[h.id],st=heroStats(h);h.sk=d.skcd;h.mood='happy';h.moodT=1.2;h.pop=1.5;sfx('skill');say(h.id,true);h.rel=.35;B.tut.skillUsed=true;if(B.tut.step===3){B.tut.step=9;hideTip();SAVE.tutDone=true;save();}
 var m=st.m;
 if(h.id==='knight'){B.fx.push({k:'ring',x:h.x,y:h.y,t:0,life:.5,r:130,col:'#ffd27a'});B.enemies.forEach(function(e){if(!e.dead&&!e.fly&&dist(e.x,e.y,h.x,h.y)<130)dmgEnemy(e,38*m,{stun:1.8});});shake(5);}
 else if(h.id==='mage'){var best=null,bc=-1;B.enemies.forEach(function(e){if(e.dead||e.s<=0&&!e.fly)return;var c=0;B.enemies.forEach(function(o){if(!o.dead&&dist(o.x,o.y,e.x,e.y)<70)c++;});if(c>bc){bc=c;best=e;}});if(best){for(var i=0;i<3;i++)B.fx.push({k:'meteor',x:best.x+rr(-26,26),y:best.y,t:-i*.22,life:.55,m:m,done:false});}else h.sk=2;}
 else if(h.id==='archer'){h.rapid=6;B.fx.push({k:'ring',x:h.x,y:h.y,t:0,life:.5,r:60,col:'#aef0c4'});}
 else if(h.id==='ninja'){B.fx.push({k:'whirl',x:h.x,y:h.y,t:0,life:1.4,m:m,hits:0});}
 else if(h.id==='healer'){B.hp=Math.min(B.maxhp,B.hp+6);updateHud();B.heroes.forEach(function(o){o.buff=6;});B.fx.push({k:'ring',x:h.x,y:h.y,t:0,life:.7,r:140,col:'#ffd3a0'});for(var j=0;j<8;j++)B.fx.push({k:'heartpop',x:CASTLE.x+rr(-30,50),y:CASTLE.y+rr(10,60),t:-j*.08,life:.6});sfx('heal');}
 else if(h.id==='witch'){B.enemies.forEach(function(e){if(!e.dead)dmgEnemy(e,16*m,{stun:3});});B.fx.push({k:'ring',x:h.x,y:h.y,t:0,life:.8,r:300,col:'#bfe8ff'});B.fx.push({k:'snow',t:0,life:3});sfx('freeze');}
 renderTray();}
/* ---------- simulation ---------- */
function startWave(){var b=B;b.wave++;b.phase='run';b.wt=0;b.spawnQ=genWave(b.L,b.wave,b.N);b.curCrows=!!b.spawnQ.crows;b.bossWave=!!b.spawnQ.boss;b.prep=0;
 var last=b.wave===b.N-1;sfx('ready');
 if(b.bossWave){banner(t('boss'),true);sfx('boss');say('boss',true);}
 else if(b.curCrows){banner(t('crows'));say('crows',true);}
 else{banner(last?t('wlast'):t('w1',{n:b.wave+1}));if(b.wave===0||rnd()<.3)say('wave');}
 updateHud();}
function step(dt){var b=B;if(!b||b.paused||b.over)return;dt*=b.speed;var n=Math.ceil(dt/.05),i;for(i=0;i<n;i++)step1(dt/n);}
function step1(dt){var b=B,i,e,h;b.t+=dt;b.elapsed+=dt;if(b.shake>0)b.shake=Math.max(0,b.shake-dt*30);if(b.castleHit>0)b.castleHit-=dt;
 // passive coins
 b.inc+=dt;if(b.inc>=2.5){b.inc=0;b.coins+=3;refreshUI();}
 // waves
 var gate=(b.L===1&&b.tut.step===0);
 if(b.phase==='prep'&&!gate){b.prep-=dt;var cl=$('btn-call');if(b.wave+1<b.N){cl.classList.remove('hidden');cl.textContent='▶ '+t('call')+' ('+Math.max(0,Math.ceil(b.prep))+')';}else cl.classList.add('hidden');if(b.prep<=0){cl.classList.add('hidden');startWave();}}
 else if(b.phase==='run'){b.wt+=dt;while(b.spawnQ.length&&b.spawnQ[0].t<=b.wt){var q=b.spawnQ.shift();spawnEnemy(q.type);}
  if(!b.spawnQ.length&&!b.enemies.some(function(x){return !x.dead;})){b.done=(b.done||0)+1;if(b.wave+1>=b.N){winBattle();return;}b.phase='prep';b.prep=6;b.coins+=12;addNum(FW/2,500,'+12',1.2,'#e0a020');sfx('star');b.heroes.forEach(function(x){x.mood='happy';x.moodT=1.6;x.pop=1.2;});refreshUI();updateHud();}}
 // enemies
 for(i=b.enemies.length-1;i>=0;i--){e=b.enemies[i];e.phase+=dt*(e.type==='fast'?13:e.type==='tank'?6:e.fly?0:9);e.wob+=dt;if(e.flash>0)e.flash-=dt;if(e.hurt>0)e.hurt-=dt;e.nextBlink-=dt;if(e.nextBlink<=0){e.nextBlink=rr(1.2,3.5);e.bt=.13;}if(e.bt>0){e.bt-=dt;e.blink=Math.sin((1-Math.max(0,e.bt)/.13)*Math.PI);}else e.blink=0;
  if(e.dead){e.dying+=dt;if(e.dying>.45)b.enemies.splice(i,1);continue;}
  if(e.slow>0)e.slow-=dt;else e.slowAmt=0;
  if(e.stun>0){e.stun-=dt;continue;}
  var sp=e.sp*(1-(e.slow>0?e.slowAmt:0));
  if(e.fly){e.p+=sp*dt/e.flen;var u=Math.min(1,e.p),v=1-u;var nx=v*v*e.sx+2*v*u*e.cxp+u*u*e.ex,ny=v*v*e.sy+2*v*u*e.cyp+u*u*e.ey;e.vx=nx-e.x;e.x=nx;e.y=ny;if(e.p>=1)leak(e);}
  else{e.s+=sp*dt;var p=posAt(b.P,e.s);e.vx=p[0]-e.x;e.x=p[0];e.y=p[1];e.rot=p[2];if(e.s>=b.P.len)leak(e);
   if(e.type==='queen'){e.sumT-=dt;if(e.sumT<=0){e.sumT=4.5;var a=spawnEnemy('ant');a.s=Math.max(0,e.s-14);var pp=posAt(b.P,a.s);a.x=pp[0];a.y=pp[1];puff(e.x,e.y,8,'#ffd0d8');sfx('crow',.5,.8);}}}}
 // heroes
 for(i=0;i<b.heroes.length;i++){h=b.heroes[i];var st=heroStats(h),d=HERO[h.id];
  h.cd-=dt*auraMul(h);if(h.sk>0){h.sk-=dt;if(h.sk<=0){h.sk=0;sfx('ready',.5);if(b.tut.step===3&&!b.tut.skillShown){b.tut.skillShown=true;showTip(t('tskill'));say('tskill');}renderTray();}}
  if(h.buff>0)h.buff-=dt;if(h.rapid>0)h.rapid-=dt;if(h.rel>0)h.rel-=dt;if(h.pop>1)h.pop=Math.max(1,h.pop-dt*1.6);if(h.moodT>0){h.moodT-=dt;if(h.moodT<=0)h.mood='smile';}if(h.hurt>0)h.hurt-=dt;
  h.nextBlink-=dt;if(h.nextBlink<=0){h.nextBlink=rr(2,5);h.bt=.14;}if(h.bt>0){h.bt-=dt;h.blink=Math.sin((1-Math.max(0,h.bt)/.14)*Math.PI);}else h.blink=0;
  if(h.state==='wind'){h.wt-=dt;if(h.wt<=0){h.state='idle';var tg=h.tgt;if(tg&&!tg.dead){fireHero(h,tg,st);h.rel=.25;}}}
  else if(h.cd<=0){var tg2=heroTarget(h,st);if(tg2){h.state='wind';h.wt=(h.id==='knight'||h.id==='ninja')?.1:.13;h.tgt=tg2;h.cd=st.cd;h.dirx=tg2.x>=h.x?1:-1;}else h.cd=0;}
 }
 // projectiles
 for(i=b.proj.length-1;i>=0;i--){var p2=b.proj[i];p2.t+=dt;if(p2.tg&&!p2.tg.dead){p2.tx=p2.tg.x;p2.ty=p2.tg.y-p2.tg.d.h*.5;}var dx=p2.tx-p2.x,dy=p2.ty-p2.y,dd=Math.sqrt(dx*dx+dy*dy),mv=p2.sp*dt;p2.ang=Math.atan2(dy,dx);if(dd<=mv+4||p2.t>3){hitProj(p2);b.proj.splice(i,1);}else{p2.x+=dx/dd*mv;p2.y+=dy/dd*mv;}}
 // fx
 for(i=b.fx.length-1;i>=0;i--){var f=b.fx[i];f.t+=dt;if(f.t<0)continue;
  if(f.k==='puff'||f.k==='spark'||f.k==='loot'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=(f.k==='loot'?340:60)*dt;}
  if(f.k==='meteor'&&!f.done&&f.t>=.3){f.done=true;sfx('magic',.7,.7);shake(5);B.fx.push({k:'boom',x:f.x,y:f.y,t:0,life:.5,r:62});b.enemies.forEach(function(o){if(!o.dead&&dist(o.x,o.y,f.x,f.y)<62)dmgEnemy(o,95*f.m);});}
  if(f.k==='whirl'){f.x=f.x;var hit=Math.floor(f.t/.2);if(hit>f.hits&&hit<=7){f.hits=hit;sfx('swing',.5,1.2);b.enemies.forEach(function(o){if(!o.dead&&!o.fly&&dist(o.x,o.y,f.x,f.y)<100)dmgEnemy(o,16*f.m);});}}
  if(f.t>=f.life)b.fx.splice(i,1);}
 for(i=b.nums.length-1;i>=0;i--){b.nums[i].t+=dt;if(b.nums[i].t>.9)b.nums.splice(i,1);}
 for(i=b.drops.length-1;i>=0;i--){var dr=b.drops[i];dr.t+=dt;dr.vy+=420*dt;dr.y+=dr.vy*dt;var gy=dr.y0||dr.y;if(dr.y>gy&&dr.vy>0){dr.y=gy;dr.vy*=-.35;if(Math.abs(dr.vy)<30)dr.vy=0;}if(dr.t>dr.life){b.coins+=Math.ceil(dr.val*.5);addNum(dr.x,dr.y-10,'+'+Math.ceil(dr.val*.5),.9,'#e0a020');b.drops.splice(i,1);refreshUI();}}
}
function collectDrop(i){var d=B.drops[i];B.coins+=d.val;addNum(d.x,d.y-14,'+'+d.val,1.1,'#e0a020');spark(d.x,d.y-8,5);sfx('coin',.7,rr(.95,1.2));B.drops.splice(i,1);$('coinpill').classList.remove('bump');void $('coinpill').offsetWidth;$('coinpill').classList.add('bump');if(B.tut.step===2){B.tut.step=3;hideTip();}refreshUI();}
function winBattle(){var b=B;if(b.over)return;b.over=true;sfx('star');$('btn-call').classList.add('hidden');hideTip();$('hpanel').classList.add('hidden');
 var frac=b.hp/b.maxhp,stars=frac>=.9?3:frac>=.5?2:1;var prev=SAVE.stars[b.L]||0;var first=prev===0;var gems=6+stars*3+(first?10:0);b.winGems=gems;b.winStars=stars;b.first=first;SAVE.gems+=gems;SAVE.stars[b.L]=Math.max(prev,stars);
 var cel=[];Object.keys(UNL).forEach(function(k){if(!SAVE.unlocked[k]&&totalStars()>=UNL[k].stars){SAVE.unlocked[k]=1;cel.push(k);}});b.cel=cel;
 var off=null;Object.keys(UNL).forEach(function(k){if(!off&&!SAVE.unlocked[k]&&b.L>=UNL[k].offerAt&&!(SAVE.offered[k]>=2)&&cel.indexOf(k)<0)off=k;});b.offer=off;save();
 b.heroes.forEach(function(x){x.mood='happy';x.moodT=9;x.pop=1.4;});
 setTimeout(function(){if(B!==b)return;say('win',true);showWin();},900);}
function loseBattle(){var b=B;if(b.over)return;b.over=true;sfx('lose');hideTip();$('btn-call').classList.add('hidden');$('hpanel').classList.add('hidden');setTimeout(function(){if(B===b){say('lose',true);showLose();}},600);}
/* ---------- rendering ---------- */
var NOWT=0;
function shadow(g,x,y,w,a){g.fillStyle='rgba(70,45,35,'+(a||.22)+')';g.beginPath();g.ellipse(x,y,w,w*.32,0,0,6.3);g.fill();}
function drawPads(g,t){var b=B,act=b.drag&&(b.drag.kind==='card'||b.drag.kind==='hero')&&b.drag.moved||b.selCard;var near=b.ghostPad;
 b.pads.forEach(function(p,i){var im=IM.pad,w=104,h=w*im.naturalHeight/im.naturalWidth;g.drawImage(im,p.x-w/2,p.y-h*.56,w,h);
  if(!p.hero&&(act||(b.tut.step===0&&i===b.padBest))){var pulse=.5+.5*Math.sin(t*6+i);g.strokeStyle=(near===p)?'rgba(255,255,255,1)':'rgba(255,255,255,'+(.55+.3*pulse)+')';g.lineWidth=near===p?5:3;g.setLineDash([7,6]);g.beginPath();g.ellipse(p.x,p.y,w*.46+(near===p?4:0),w*.16+(near===p?2:0),0,0,6.3);g.stroke();g.setLineDash([]);}
 });}
function drawHeroObj(g,h,t){var d=HERO[h.id],br=Math.sin(t*2.3+h.seed),sy=1+.028*br,sx=1-.014*br,lean=0,ox=0,oy=0,mood=h.mood;
 var melee=h.id==='knight'||h.id==='ninja';
 if(h.state==='wind'){var u=1-Math.max(0,h.wt)/(melee?.1:.13);sy=1-.11*u;sx=1+.09*u;lean=-h.dirx*.13*u;mood='fight';}
 else if(h.rel>0){var u2=Math.min(1,h.rel/.25);sy=1+.15*u2;sx=1-.09*u2;lean=h.dirx*.11*u2;ox=h.dirx*(melee?11:4)*u2;mood='fight';}
 var pop=h.pop>1?1+(h.pop-1)*Math.sin(Math.min(1,(h.pop-1)*2)*Math.PI*.5):1;sx*=pop;sy*=pop;
 var hh=d.h*(1+.05*(h.lv-1));
 shadow(g,h.x,h.y+2,26,.25);
 if(h.buff>0){g.fillStyle='rgba(255,220,140,.35)';g.beginPath();g.ellipse(h.x,h.y,34,11,0,0,6.3);g.fill();}
 if(h.rapid>0){g.strokeStyle='rgba(160,240,190,.8)';g.lineWidth=3;g.beginPath();g.ellipse(h.x,h.y,36+2*Math.sin(t*14),12,0,0,6.3);g.stroke();}
 var look=[0,0];if(h.tgt&&!h.tgt.dead){look=[clamp((h.tgt.x-h.x)/30,-1,1),clamp((h.tgt.y-h.y)/30,-1,1)];}
 drawChar(g,'h_'+h.id,h.x+ox,h.y+2+oy,hh,{blink:h.blink,mood:mood,sx:sx,sy:sy,lean:lean,look:look,t:t});
 // level stars
 for(var i=0;i<h.lv;i++){var sx2=h.x+(i-(h.lv-1)/2)*13;g.drawImage(IM.star,sx2-6,h.y+10,12,12);}
}
function drawBadge(g,h,t){var d=HERO[h.id],bx=h.x,by=h.y-d.h*(1+.05*(h.lv-1))-20,r=16;var rd=h.sk<=0;if(rd)by+=Math.sin(t*7+h.seed)*2.5;
 g.save();g.translate(bx,by);g.fillStyle=rd?'#fff3c4':'rgba(255,243,223,.92)';g.beginPath();g.arc(0,0,r+3,0,6.3);g.fill();
 if(rd){g.strokeStyle='rgba(255,255,255,'+(.6+.4*Math.sin(t*8))+')';g.lineWidth=3;g.beginPath();g.arc(0,0,r+6,0,6.3);g.stroke();}
 g.drawImage(IM[d.sk],-r,-r,r*2,r*2);
 if(!rd){g.fillStyle='rgba(80,50,40,.55)';g.beginPath();g.moveTo(0,0);g.arc(0,0,r+1,-Math.PI/2,-Math.PI/2+Math.PI*2*(h.sk/d.skcd));g.closePath();g.fill();g.fillStyle='#fff';g.font='700 13px Kanit,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(Math.ceil(h.sk),0,1);}
 g.restore();}
function drawEnemyObj(g,e,t){var d=e.d,u=e.dying>0?Math.min(1,e.dying/.4):0;if(u>=1)return;var bob=0,rot=0,sx=1,sy=1,flip=false;
 if(e.fly){var fl=Math.sin(t*17+e.seed);sy=1+.14*fl;sx=1-.05*fl;rot=clamp((e.vx||0)/6,-.3,.3)*.5+Math.sin(t*5+e.seed)*.05;flip=(e.vx||0)<0;bob=Math.sin(t*5+e.seed)*3;}
 else{var ph=e.phase;bob=-Math.abs(Math.sin(ph))*3.4;rot=Math.sin(ph)*.09;sy=1+Math.abs(Math.sin(ph))*.05;sx=1-Math.abs(Math.sin(ph))*.03;if(e.type==='queen'){rot*=.5;bob*=1.3;}}
 if(e.hurt>0){var hu=e.hurt/.2;sy*=1-.16*hu;sx*=1+.12*hu;}
 var mood=e.stun>0?'dizzy':e.hurt>0?'hurt':'angry';
 var alpha=1-u;if(u>0){sx*=1+u*.3;sy*=1-u*.6;rot+=u*1.2;}
 g.save();g.globalAlpha=alpha;
 if(!e.fly)shadow(g,e.x,e.y+4,d.h*.38,.22);else shadow(g,e.x,e.y+d.h*.8,d.h*.45,.14);
 var look=e.fly?[0,0]:[Math.cos(e.rot||0)*.5,Math.max(-1,Math.sin(e.rot||0))*.6];
 var py=e.y+(e.fly?0:4)+bob;
 drawChar(g,d.img,e.x,py,d.h,{blink:e.blink,mood:mood,sx:sx,sy:sy,lean:rot,flip:flip,flash:e.flash,ice:e.slow>0||e.stun>0,look:look,t:t});
 if(!e.fly&&!d.boss){var li=IM[e.loot],ls=22;g.save();g.translate(e.x+d.h*.2,py-d.h*.72+Math.sin(e.phase*2)*1.5);g.rotate(rot*2+.2);g.drawImage(li,-ls/2,-ls/2,ls,ls);g.restore();}
 if(e.fly){var li2=IM[e.loot];g.save();g.translate(e.x+(flip?-1:1)*8,py+d.h*.5);g.rotate(Math.sin(t*5)*.2);g.drawImage(li2,-11,-11,22,22);g.restore();}
 if(e.stun>0){for(var i=0;i<3;i++){var a=t*5+i*2.09;g.drawImage(IM.star,e.x+Math.cos(a)*d.h*.3-6,py-d.h*1.0+Math.sin(a)*4-6,12,12);}}
 g.restore();
 if(e.hp<e.maxhp&&u===0){var bw=d.boss?70:26,bx=e.x-bw/2,by=py-d.h-(e.fly?4:2)-(d.boss?6:0);g.fillStyle='rgba(255,243,223,.95)';rr2(g,bx-1.5,by-1.5,bw+3,7,3.5);g.fill();g.fillStyle=e.hp/e.maxhp>.5?'#7cc4a0':'#f0907a';rr2(g,bx,by,bw*Math.max(0,e.hp/e.maxhp),4,2);g.fill();}}
function rr2(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}
function drawProj(g,p,t){if(p.id==='archer'){g.save();g.translate(p.x,p.y);g.rotate(p.ang);g.strokeStyle='#8a5a3a';g.lineWidth=2.5;g.beginPath();g.moveTo(-14,0);g.lineTo(6,0);g.stroke();g.fillStyle='#e8d8b8';g.beginPath();g.moveTo(10,0);g.lineTo(4,-3.5);g.lineTo(4,3.5);g.fill();g.fillStyle='#a9dcc0';g.beginPath();g.moveTo(-14,0);g.lineTo(-18,-3);g.lineTo(-11,0);g.lineTo(-18,3);g.fill();g.restore();}
 else if(p.id==='mage'){var s=14+Math.sin(t*20)*2;g.globalAlpha=.4;g.fillStyle='#ffd27a';g.beginPath();g.arc(p.x,p.y,s*1.2,0,6.3);g.fill();g.globalAlpha=1;g.drawImage(IM.star,p.x-s/2,p.y-s/2,s,s);}
 else if(p.id==='witch'){g.fillStyle='rgba(180,220,255,.5)';g.beginPath();g.arc(p.x,p.y,11,0,6.3);g.fill();g.fillStyle='#d8c8ff';g.beginPath();g.arc(p.x,p.y,6,0,6.3);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(p.x-2,p.y-2,2.2,0,6.3);g.fill();}
 else{var s2=13+Math.sin(t*14)*1.5;g.drawImage(IM.heart,p.x-s2/2,p.y-s2/2,s2,s2);}}
function drawFx(g,f,t){if(f.t<0)return;var u=f.t/f.life;
 if(f.k==='puff'){g.globalAlpha=1-u;g.fillStyle=f.col||'#fff';g.beginPath();g.arc(f.x,f.y,f.r*(1+u),0,6.3);g.fill();g.globalAlpha=1;}
 else if(f.k==='spark'){g.globalAlpha=1-u;g.drawImage(IM.star,f.x-f.r,f.y-f.r,f.r*2,f.r*2);g.globalAlpha=1;}
 else if(f.k==='loot'){g.globalAlpha=1-u*u;g.save();g.translate(f.x,f.y);g.rotate(f.t*6);g.drawImage(IM[f.img],-11,-11,22,22);g.restore();g.globalAlpha=1;}
 else if(f.k==='slash'){g.save();g.translate(f.x,f.y);g.rotate(f.a);g.globalAlpha=1-u;g.strokeStyle=f.ninja?'#bfeee0':'#fff';g.lineWidth=5*(1-u)+1;g.lineCap='round';g.beginPath();g.arc(0,0,20+u*8,-1.1,1.1);g.stroke();g.restore();g.globalAlpha=1;}
 else if(f.k==='boom'){g.globalAlpha=(1-u)*.8;g.fillStyle='#ffd88a';g.beginPath();g.arc(f.x,f.y,f.r*(.4+u*.8),0,6.3);g.fill();g.strokeStyle='#fff';g.lineWidth=4*(1-u);g.beginPath();g.arc(f.x,f.y,f.r*(.5+u),0,6.3);g.stroke();g.globalAlpha=1;}
 else if(f.k==='frost'){g.globalAlpha=1-u;g.strokeStyle='#bfe8ff';g.lineWidth=3;for(var i=0;i<6;i++){var a=i*1.047+u;g.beginPath();g.moveTo(f.x+Math.cos(a)*4,f.y+Math.sin(a)*4);g.lineTo(f.x+Math.cos(a)*(10+u*8),f.y+Math.sin(a)*(10+u*8));g.stroke();}g.globalAlpha=1;}
 else if(f.k==='heartpop'){g.globalAlpha=1-u;var s=14+u*6;g.drawImage(IM.heart,f.x-s/2,f.y-u*26-s/2,s,s);g.globalAlpha=1;}
 else if(f.k==='ring'){g.globalAlpha=(1-u)*.8;g.strokeStyle=f.col;g.lineWidth=6*(1-u)+1;g.beginPath();g.ellipse(f.x,f.y,f.r*u,f.r*u*.45,0,0,6.3);g.stroke();g.globalAlpha=1;}
 else if(f.k==='meteor'){if(f.t<.3){var uu=f.t/.3;g.save();g.translate(f.x-80*(1-uu),f.y-300*(1-uu));g.globalAlpha=.9;g.drawImage(IM.i_meteor,-22,-22,44,44);g.restore();g.fillStyle='rgba(255,200,120,'+(.25+.3*uu)+')';g.beginPath();g.ellipse(f.x,f.y,50*uu,16*uu,0,0,6.3);g.fill();}}
 else if(f.k==='whirl'){g.save();g.translate(f.x,f.y-24);g.rotate(f.t*14);g.globalAlpha=Math.min(1,(1-u)*1.5);g.drawImage(IM.i_whirl,-100,-100,200,200);g.restore();g.globalAlpha=1;}
 else if(f.k==='snow'){g.fillStyle='rgba(220,240,255,'+(.2*(1-u))+')';g.fillRect(0,0,FW,FH);for(var j=0;j<24;j++){var sx=(j*97+f.t*20)%FW,sy=(j*61+f.t*80)%FH;g.fillStyle='rgba(255,255,255,.8)';g.beginPath();g.arc(sx,sy,2+j%3,0,6.3);g.fill();}}
}
function drawNums(g){B.nums.forEach(function(n){var u=n.t/.9,y=n.y-u*34,sc=n.sz*(1+Math.max(0,.3-n.t*2)),a=u<.7?1:1-(u-.7)/.3;var txt=typeof n.v==='number'?(n.v<0?String(n.v):String(n.v)):String(n.v);
 g.save();g.globalAlpha=a;g.translate(n.x,y);g.scale(sc,sc);g.font='800 19px Kanit,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=5;g.lineJoin='round';g.strokeStyle='#fff7ea';g.strokeText(txt,0,0);g.fillStyle=n.col||'#ff6f8f';g.fillText(txt,0,0);g.restore();});}
function drawBattle(t){var g=cx,b=B;g.setTransform(DPR,0,0,DPR,0,0);g.clearRect(0,0,W,H);g.save();
 var sh=b.shake>0?[rr(-1,1)*b.shake*.5,rr(-1,1)*b.shake*.5]:[0,0];g.translate(OX+sh[0],OY+sh[1]);g.scale(SC,SC);
 g.drawImage(IM['map_'+b.map],0,0,FW,FH);
 if(b.castleHit>0){g.fillStyle='rgba(255,140,170,'+(b.castleHit*.5)+')';g.beginPath();g.ellipse(CASTLE.x,CASTLE.y+30,110,60,0,0,6.3);g.fill();}
 drawPads(g,t);
 var list=[];b.heroes.forEach(function(h){list.push({y:h.y,f:function(){drawHeroObj(g,h,t);}});});
 b.enemies.forEach(function(e){if(!e.fly)list.push({y:e.y,f:function(){drawEnemyObj(g,e,t);}});});
 list.sort(function(a,c){return a.y-c.y;});list.forEach(function(o){o.f();});
 b.drops.forEach(function(d){var s=26+Math.sin(t*8+d.x)*2;g.fillStyle='rgba(255,230,140,.35)';g.beginPath();g.arc(d.x,d.y-12,s*.75,0,6.3);g.fill();g.drawImage(IM.coin,d.x-s/2,d.y-s+Math.sin(t*6+d.x)*2,s,s);});
 b.enemies.forEach(function(e){if(e.fly)drawEnemyObj(g,e,t);});
 b.proj.forEach(function(p){drawProj(g,p,t);});
 b.fx.forEach(function(f){drawFx(g,f,t);});
 if(b.sel){var h=b.sel,st=heroStats(h);g.strokeStyle='rgba(255,255,255,.9)';g.fillStyle='rgba(255,255,255,.14)';g.lineWidth=3;g.setLineDash([8,6]);g.beginPath();g.ellipse(h.x,h.y,st.range,st.range*.78,0,0,6.3);g.fill();g.stroke();g.setLineDash([]);}
 b.heroes.forEach(function(h){drawBadge(g,h,t);});
 // ghost
 var dg=b.drag;if(dg&&dg.moved&&dg.gx!=null){var id=dg.kind==='card'?dg.id:dg.h.id,d=HERO[id];var ok=b.ghostPad&&(dg.kind==='hero'||b.coins>=d.cost);var gx=b.ghostPad?b.ghostPad.x:dg.gx,gy=b.ghostPad?b.ghostPad.y:dg.gy;
  g.globalAlpha=.9;if(b.ghostPad){g.strokeStyle=ok?'#fff':'#f5a0a8';g.lineWidth=3;g.beginPath();g.ellipse(gx,gy,48,18,0,0,6.3);g.stroke();}
  var rg=d.range*(dg.kind==='hero'?(1+.06*(dg.h.lv-1)):1);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.setLineDash([6,6]);g.beginPath();g.ellipse(gx,gy,rg,rg*.78,0,0,6.3);g.stroke();g.setLineDash([]);
  drawChar(g,'h_'+id,dg.gx,dg.gy+2,d.h*1.05,{mood:'fight',blink:0,sy:1+.03*Math.sin(t*10),t:t});g.globalAlpha=1;}
 drawNums(g);
 g.restore();}
var lastTS=0;
function frame(ts){requestAnimationFrame(frame);var dt=Math.min(.1,(ts-lastTS)/1000||0);lastTS=ts;NOWT=ts/1000;
 if(B){step(dt);drawBattle(NOWT);if(B.sel)positionPanel();}
 tickPCs(NOWT,dt);tickAd(dt);}
/* animated portrait canvases (DOM) */
var pcState={};
function tickPCs(t){var list=document.querySelectorAll('canvas.pc');for(var i=0;i<list.length;i++){var c=list[i],id=c.dataset.h;if(!id||!IM['h_'+id])continue;var w=c.clientWidth,h=c.clientHeight;if(!w||!h)continue;var dp=Math.min(2,window.devicePixelRatio||1);if(c.width!==Math.round(w*dp)||c.height!==Math.round(h*dp)){c.width=Math.round(w*dp);c.height=Math.round(h*dp);}
  var g=c.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,c.width,c.height);g.setTransform(dp,0,0,dp,0,0);
  var seed=(id.charCodeAt(0)+i*3)%10,br=Math.sin(t*2.3+seed),cyc=(t+seed)%4.2,blink=cyc<.14?Math.sin(cyc/.14*Math.PI):0;
  var mood=c.dataset.mood||'smile';if(mood==='smile'&&!c.dataset.sil){var cy2=(t*.5+seed)%6;if(cy2<.9)mood='happy';}
  var hh=h*(c.dataset.fill?+c.dataset.fill:.9);var hop=c.dataset.mood==='happy'?Math.abs(Math.sin(t*3))*h*.03:0;
  var sy=1+.03*br;
  var ox=0;drawChar(g,'h_'+id,w/2+ox,h*.97-hop,hh,{blink:blink,mood:mood,sx:1-.015*br,sy:sy,t:t});
  var sp=c.dataset.spark;if(sp){for(var k=0;k<6;k++){var a=t*1.3+k*1.05,r=.35+.1*Math.sin(t*2+k);g.globalAlpha=.5+.5*Math.sin(t*3+k);g.drawImage(IM.star,w/2+Math.cos(a)*w*r-7,h*.5+Math.sin(a*1.3)*h*.38-7,14,14);}g.globalAlpha=1;}
 }}
/* ---------- HUD / tray / panel ---------- */
function updateHud(){if(!B)return;$('coins').textContent=B.coins;$('wn').textContent=Math.max(1,Math.min(B.N,B.wave+1));var dots=$('dots'),h='';for(var i=0;i<B.N;i++){var on=i<(B.done||0);h+='<i class="'+(on?'on':(i===B.wave&&B.phase==='run'?'cur':''))+'"></i>';}if(dots.dataset.s!==h){dots.innerHTML=h;dots.dataset.s=h;}$('hpfill').style.width=Math.max(0,B.hp/B.maxhp*100)+'%';}
var traySig='';
function renderTray(){if(!B)return;var tr=$('tray'),sig=B.team.join(',')+'|'+B.trial;if(sig!==traySig||!tr.children.length){traySig=sig;var h='';for(var i=0;i<4;i++){var id=B.team[i];if(!id){h+='<div class="card locked" title="'+t('lockedSlot')+'">'+lockSvg()+'</div>';continue;}var d=HERO[id];h+='<div class="card" data-h="'+id+'" style="--c:'+d.col+'"><canvas class="pc" data-h="'+id+'"></canvas>'+(id===B.trial?'<span class="tag">'+t('trial')+'</span>':'')+'<div class="cost"><img src="art/coin.webp" alt="">'+d.cost+'</div></div>';}tr.innerHTML=h;}
 [].forEach.call(tr.querySelectorAll('.card[data-h]'),function(c){var id=c.dataset.h,d=HERO[id];c.classList.toggle('poor',B.coins<d.cost);c.classList.toggle('sel',B.selCard===id);c.classList.toggle('glow',B.tut.step===0&&id===B.team[0]);});}
function refreshUI(){updateHud();renderTray();if(B&&B.sel)refreshPanel();}
function showTip(m){var e=$('tip');e.textContent=m;e.classList.remove('hidden');}
function hideTip(){$('tip').classList.add('hidden');}
function refreshPanel(){var h=B&&B.sel,p=$('hpanel');if(!h){p.classList.add('hidden');return;}var up=upCost(h),max=h.lv>=3,can=B.coins>=up;
 p.innerHTML='<div class="hn">'+hname(h.id)+' · '+t('lv')+' '+h.lv+'</div><div class="row"><button class="btn sm purple'+((max||!can)?' dis':'')+'" data-act="hup">'+(max?t('max'):'⬆ '+t('upg')+' <img src="art/coin.webp" alt="">'+up)+'</button><button class="btn sm pink" data-act="hsell">'+t('sell')+' <img src="art/coin.webp" alt="">'+Math.round(HERO[h.id].cost*.6*(h.lv===1?1:h.lv===2?1.7:2.6))+'</button></div>';p.classList.remove('hidden');positionPanel();}
function positionPanel(){var h=B&&B.sel,p=$('hpanel');if(!h)return;var d=HERO[h.id];var px=OX+h.x*SC,py=OY+(h.y-d.h*(1+.05*(h.lv-1))-42)*SC;if(py<86){py=OY+(h.y+28)*SC;p.style.transform='translate(-50%,0)';}else p.style.transform='translate(-50%,-100%)';px=clamp(px,92,W-92);p.style.left=px+'px';p.style.top=py+'px';}
function selectHero(h){B.sel=h;B.selCard=null;if(h)refreshPanel();else $('hpanel').classList.add('hidden');renderTray();}
/* ---------- input ---------- */
function toL(ev){var r=cv.getBoundingClientRect();return [(ev.clientX-r.left-OX)/SC,(ev.clientY-r.top-OY)/SC];}
function nearestPad(x,y,free,rad){var best=null,bd=rad;B.pads.forEach(function(p){if(free&&p.hero)return;var d=dist(x,y,p.x,p.y);if(d<bd){bd=d;best=p;}});return best;}
function hitHero(x,y){var best=null,bd=1e9;B.heroes.forEach(function(h){var d=HERO[h.id],hh=d.h;if(x>h.x-34&&x<h.x+34&&y>h.y-hh&&y<h.y+16){var dd=Math.abs(y-(h.y-hh*.4));if(dd<bd){bd=dd;best=h;}}});return best;}
cv.addEventListener('pointerdown',function(ev){if(!B||B.paused||B.over)return;audioInit();var p=toL(ev),x=p[0],y=p[1],i;
 for(i=B.drops.length-1;i>=0;i--){if(dist(x,y,B.drops[i].x,B.drops[i].y-12)<30){collectDrop(i);return;}}
 for(i=0;i<B.heroes.length;i++){var h=B.heroes[i],d=HERO[h.id],bx=h.x,by=h.y-d.h*(1+.05*(h.lv-1))-20;if(dist(x,y,bx,by)<24){if(h.sk<=0)useSkill(h);else{sfx('nope',.4);}return;}}
 var hh=hitHero(x,y);if(hh){B.drag={kind:'hero',h:hh,sx:ev.clientX,sy:ev.clientY,moved:false,gx:x,gy:y};return;}
 if(B.selCard){var pad=nearestPad(x,y,true,52);if(pad){tryPlace(B.selCard,pad);B.selCard=null;renderTray();}return;}
 if(B.sel)selectHero(null);});
$('tray').addEventListener('pointerdown',function(ev){if(!B||B.paused||B.over)return;audioInit();var c=ev.target.closest('.card[data-h]');if(!c)return;ev.preventDefault();var p=toL(ev);B.drag={kind:'card',id:c.dataset.h,sx:ev.clientX,sy:ev.clientY,moved:false,gx:p[0],gy:p[1]};if(B.sel)selectHero(null);});
window.addEventListener('pointermove',function(ev){if(!B||!B.drag)return;var dg=B.drag;var p=toL(ev);if(!dg.moved&&dist(ev.clientX,ev.clientY,dg.sx,dg.sy)>9){dg.moved=true;if(dg.kind==='hero'){selectHero(null);}else B.selCard=null;}
 if(dg.moved){dg.gx=p[0];dg.gy=p[1]-(dg.kind==='card'?34:10);B.ghostPad=nearestPad(dg.gx,dg.gy,true,70);}});
function endDrag(ev,cancel){if(!B||!B.drag)return;var dg=B.drag;B.drag=null;var pad=B.ghostPad;B.ghostPad=null;
 if(cancel)return;
 if(dg.kind==='card'){if(!dg.moved){B.selCard=(B.selCard===dg.id)?null:dg.id;if(B.selCard){sfx('tap');if(B.tut.step===0)toast(t('tapPad'));}renderTray();return;}if(pad)tryPlace(dg.id,pad);else if(dg.gy<760||true){if(ev&&ev.clientY!=null&&ev.target&&ev.target.closest&&ev.target.closest('#tray')){}else if(dg.moved)toast(t('noPad'));}renderTray();}
 else{if(!dg.moved){if(B.sel===dg.h)selectHero(null);else{selectHero(dg.h);sfx('tap');}return;}
  if(pad&&pad!==dg.h.pad){dg.h.pad.hero=null;pad.hero=dg.h;dg.h.pad=pad;dg.h.x=pad.x;dg.h.y=pad.y;dg.h.pop=1.5;sfx('place');puff(pad.x,pad.y,6,'#fff');}}}
window.addEventListener('pointerup',function(ev){endDrag(ev,false);});window.addEventListener('pointercancel',function(ev){endDrag(ev,true);});
function tryPlace(id,pad){if(placeHero(id,pad,false)){B.selCard=null;}}
/* ---------- ads (mock) ---------- */
var AD_CAP=6,AD_CD=45000,adSt=null;
function adOK(){if(!window.DDAds||!DDAds.ready())return false;var a=SAVE.ads,d=new Date().toDateString();if(a.day!==d){a.day=d;a.n=0;}if(a.n>=AD_CAP)return false;if(!window.__noAdCd&&Date.now()-a.last<AD_CD)return false;return true;}
function runAd(rewardTxt,cb){if(!adOK()){toast(t('adNone'));return;}SAVE.ads.n++;save();var el=$('ad');el.classList.remove('hidden');el.innerHTML='<button class="x" data-act="adx">✕</button><div class="lbl">'+t('adTitle')+'</div><div class="rewl">'+rewardTxt+'</div><div class="mock"><canvas></canvas><span>Kairon Arcade</span></div><div class="bar"><i></i></div><div class="lbl">'+t('adHint')+'</div>';adSt={t:0,dur:window.__adDur||5,cb:cb,done:false,wp:B?B.paused:false};if(B)B.paused=true;}
function tickAd(dt){if(!adSt||adSt.done)return;adSt.t+=dt;var u=Math.min(1,adSt.t/adSt.dur);var bar=$('ad').querySelector('.bar i');if(bar)bar.style.width=(u*100)+'%';
 var c=$('ad').querySelector('canvas');if(c){var w=c.clientWidth,h=c.clientHeight;if(c.width!==w){c.width=w;c.height=h;}var g=c.getContext('2d');g.clearRect(0,0,w,h);var ids=['knight','mage','archer'];ids.forEach(function(id,i){var bx=w*(.2+.3*i),y=h*.92-Math.abs(Math.sin(adSt.t*4+i))*h*.1;drawChar(g,'h_'+id,bx,y,h*.6,{mood:'happy',t:adSt.t,sy:1+.03*Math.sin(adSt.t*6+i)});});}
 if(u>=1){adSt.done=true;var cb=adSt.cb;SAVE.ads.last=Date.now();save();$('ad').classList.add('hidden');if(B)B.paused=adSt.wp;adSt=null;sfx('star');toast(t('adDone'));if(cb)cb();}}
function closeAd(){if(!adSt)return;var early=!adSt.done;SAVE.ads.last=Date.now();save();$('ad').classList.add('hidden');if(B)B.paused=adSt.wp;adSt=null;if(early){sfx('nope');toast(t('adEarly'));}}
/* ---------- modal ---------- */
function openSheet(html,cls){var m=$('modal');$('sheet').className=cls||'';$('sheet').innerHTML=html;m.classList.remove('hidden');}
function closeSheet(){$('modal').classList.add('hidden');$('sheet').innerHTML='';}
function starsHtml(n,total){var h='';for(var i=0;i<(total||3);i++)h+='<img class="'+(i<n?'':'off')+'" style="animation-delay:'+(.15+i*.2)+'s" src="art/star.webp" alt="">';return h;}
var PLAYSVG='<svg viewBox="0 0 24 24"><path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 4v8l6-4z"/></svg>';
function showWin(){var b=B;var h='<h2>'+t('win')+'</h2><div class="stars">'+starsHtml(b.winStars)+'</div><div class="gemline"><img src="art/gem.webp" alt="">+<span id="wgem">'+b.winGems+'</span></div>'+(b.first?'<p>'+t('firstBonus')+'</p>':'');
 var canAd=adOK();if(canAd){h+='<div id="adrow"><div class="rew">'+t('adx2',{n:b.winGems})+'</div><div class="row"><button class="btn purple" data-act="winad">'+PLAYSVG+t('adWatch')+'</button><button class="btn rose" data-act="winno">'+t('noThanks')+'</button></div></div>';}
 h+='<div class="row"><button class="btn mint" data-act="wmenu">'+t('menu')+'</button>'+(b.L<NLV?'<button class="btn pink" data-act="wnext">'+t('next')+'</button>':'<button class="btn pink" data-act="wretry">'+t('retry')+'</button>')+'</div>';openSheet(h);sfx('upgrade',.6);}
function showLose(){var b=B;var h='<h2>'+t('lose')+'</h2><p>'+t('level')+' '+b.L+' · '+t('wave')+' '+(b.wave+1)+'/'+b.N+'</p>';
 if(adOK()&&!b.revived){h+='<div id="adrow"><div class="rew">'+t('adRev')+'</div><div class="row"><button class="btn purple" data-act="revad">'+PLAYSVG+t('adWatch')+'</button><button class="btn rose" data-act="revno">'+t('noThanks')+'</button></div></div>';}
 h+='<div class="row"><button class="btn mint" data-act="lmenu">'+t('menu')+'</button><button class="btn pink" data-act="lretry">'+t('retry')+'</button></div>';openSheet(h);}
function showPause(){if(!B||B.over)return;B.paused=true;openSheet('<h2>'+t('paused')+'</h2><div class="row"><button class="btn mint" data-act="presume">'+t('resume')+'</button><button class="btn" data-act="pmute">'+t('sound')+': '+(SAVE.mute?t('off'):t('on'))+'</button></div><div class="row"><button class="btn pink" data-act="pretry">'+t('retry')+'</button><button class="btn rose" data-act="pquit">'+t('quit')+'</button></div><div class="row"><button class="btn sm" data-act="plang">'+t('lang')+': '+(SAVE.lang==='th'?'ไทย → EN':'EN → ไทย')+'</button></div>');}
function leaveBattle(){B=null;closeSheet();$('hud').classList.add('hidden');$('tray').classList.add('hidden');hideTip();$('hpanel').classList.add('hidden');$('btn-call').classList.add('hidden');traySig='';cx.clearRect(0,0,cv.width,cv.height);}
/* ---------- screens ---------- */
function muteSvg(){return SAVE.mute?'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16 9l5 6M21 9l-5 6" stroke="#e8707a" stroke-width="2" fill="#e8707a"/></svg>':'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13" stroke="#e8707a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';}
function topbar(back){return '<div class="topbar">'+(back?'<button class="round sm" data-act="back"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="#e8707a" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>':'')+'<div class="pill"><img src="art/gem.webp" alt="">'+SAVE.gems+'</div><div class="pill"><img src="art/star.webp" alt="">'+totalStars()+'</div><div class="sp"></div><button class="round sm" data-act="mute">'+muteSvg()+'</button><button class="round sm" data-act="lang">'+(SAVE.lang==='th'?'EN':'ไทย')+'</button></div>';}
function showScreen(name,arg){var s=$('screen');s.innerHTML='';s.dataset.n=name||'';if(!name)return;closeSheet();
 if(name==='menu'){var pos=[[26,92],[58,86],[74,74],[48,66],[24,58],[40,48],[70,42],[52,32],[28,24],[62,10]];var mc=maxCleared();var h='<div class="scr menu">'+topbar(false)+'<div class="ttl"><b>'+t('map')+'</b></div><div class="lvmap"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline fill="none" stroke="#fff3df" stroke-width="2.2" stroke-dasharray="1.5 2" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:5px" points="'+pos.map(function(p){return p[0]+','+p[1];}).join(' ')+'"/></svg>';
  for(var i=0;i<NLV;i++){var L=i+1,lock=L>mc+1,cur=L===mc+1,st=SAVE.stars[L]||0;h+='<button class="node'+(lock?' lock':'')+(cur?' cur':'')+(L===NLV?' boss':'')+'" style="left:'+pos[i][0]+'%;top:'+pos[i][1]+'%" data-act="lv" data-l="'+L+'">'+(L===NLV?'<img class="q" src="art/e_queen.webp" alt="">':'')+(lock?lockSvg().replace('<svg','<svg style="width:2.6rem"'):L)+(st?'<span class="st">'+starsHtml(st).replace(/ style="[^"]*"/g,'').replace(/animation-delay/g,'')+'</span>':'')+'</button>';}
  h+='</div><div class="bnav"><button class="btn big pink" data-act="col">'+t('heroes')+'</button></div><div class="brandline">Kairon Arcade</div></div>';s.innerHTML=h;}
 else if(name==='col'){var h2='<div class="scr col">'+topbar(true)+'<div class="ttl"><b>'+t('collection')+'</b></div><div class="grid" id="grid">';
  HORDER.forEach(function(id){var d=HERO[id],un=SAVE.unlocked[id],lv=SAVE.lv[id]||1,inT=SAVE.team.indexOf(id)>=0;var ucost=[20,45][lv-1];
   h2+='<div class="hc'+(un?'':' lk')+'" style="--c:'+d.col+'">'+(un&&inT?'<div class="tm"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>':'')+'<div class="pw"><canvas class="pc" data-h="'+id+'"></canvas></div><div class="hn">'+hname(id)+'</div><div class="hr">'+(TX[SAVE.lang].hrole[id])+'</div><div class="sk"><img src="art/'+d.sk+'.webp" alt=""><span>'+TX[SAVE.lang].skname[id]+'</span></div>';
   if(un){h2+='<div class="pips">'+t('lv')+' '+lv+' <i class="on"></i><i class="'+(lv>=2?'on':'')+'"></i><i class="'+(lv>=3?'on':'')+'"></i></div><div class="bt"><button class="btn '+(inT?'mint':'')+'" data-act="team" data-h="'+id+'">'+(inT?'✓ '+t('inTeam'):t('addTeam'))+'</button>'+(lv>=3?'<button class="btn dis">'+t('max')+'</button>':'<button class="btn purple'+(SAVE.gems<ucost?' dis':'')+'" data-act="hupg" data-h="'+id+'"><img src="art/gem.webp" alt="">'+ucost+'</button>')+'</div>';}
   else{var u2=UNL[id];h2+='<div class="prog">'+t('starsProg')+' '+Math.min(totalStars(),u2.stars)+'/'+u2.stars+'</div><div class="bt"><button class="btn purple'+(SAVE.gems<u2.gems?' dis':'')+'" data-act="buyh" data-h="'+id+'"><img src="art/gem.webp" alt="">'+t('unlock')+' '+u2.gems+'</button></div>';}
   h2+='</div>';});
  h2+='</div><div class="bnav"><button class="btn big mint" data-act="back">'+t('back')+'</button></div><div class="brandline">Kairon Arcade</div></div>';var gt=$('grid')?$('grid').scrollTop:0;s.innerHTML=h2;if(arg&&arg.keep)$('grid').scrollTop=arg.keep;}
 else if(name==='unl'){var id2=arg.id,mode=arg.mode,d2=HERO[id2],u3=UNL[id2];var tot=totalStars();var pct=mode==='got'?1:clamp(tot/u3.stars,0,1);var rar={knight:3,mage:3,archer:3,ninja:4,healer:4,witch:5}[id2];
  var locked=HORDER.filter(function(k){return !SAVE.unlocked[k]||k===id2;});var row=[id2].concat(HORDER.filter(function(k){return k!==id2&&!SAVE.unlocked[k];}));var cells='';for(var c=0;c<4;c++){var kk=row[c];cells+='<div class="'+(c===0&&mode==='offer'?'new':'')+'">'+(c===0&&mode==='offer'?'<span class="nw">★ NEW</span>':'')+(kk?'<canvas class="pc" data-h="'+kk+'"></canvas>':'<canvas class="pc" data-h="'+HORDER[(c+2)%6]+'" style="opacity:.5"></canvas>')+'<span class="lk">'+lockSvg()+'</span></div>';}
  var rew=mode==='got'?t('unlocked')+' '+t('trialNext').replace(/.*/,''):t('adTry',{h:hname(id2)});
  var canAd=adOK();var btns;
  if(mode==='got')btns='<button class="btn big mint" data-act="ucont">'+t('ok')+'</button>';
  else if(canAd)btns='<button class="btn sq purple" data-act="uwatch">'+PLAYSVG+'<small style="font-size:1.3rem">'+t('adWatch')+'</small></button><button class="btn sq rose" data-act="uno"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/></svg><small style="font-size:1.3rem">'+t('noThanks')+'</small></button>';
  else btns='<button class="btn big mint" data-act="uno">'+t('ok')+'</button>';
  var h3='<div class="scr unl"><div class="ustars">'+starsHtml(rar,5)+'</div><div class="uname"><b>'+hname(id2)+'</b></div><div class="urew"><span>'+(mode==='got'?t('newhero')+' '+t('unlocked'):rew)+'</span></div><div class="uhero"><canvas class="pc" data-h="'+id2+'" data-mood="happy" data-spark="1" data-fill=".96"></canvas></div><div class="uskills">'+d2.icons.map(function(ic){return '<div><img src="art/'+ic+'.webp" alt=""></div>';}).join('')+'</div>'
   +'<div class="uslider"><div class="tr"><div class="fl" style="width:'+(pct*100)+'%"></div></div>'+[0,33,66,100].map(function(p){return '<div class="dt'+(pct*100>=p-1?' on':'')+'" style="left:'+p+'%;top:1.1rem"></div>';}).join('')+'<img src="art/star.webp" style="left:'+(pct*100)+'%" alt=""><div class="cap">'+t('starsProg')+' '+Math.min(tot,u3.stars)+'/'+u3.stars+'</div></div><div class="ubtn">'+btns+'</div><div class="urow">'+cells+'</div></div>';
  s.innerHTML=h3;sfx('unlock');if(mode==='got')say('unlock',true);else say('new',true);}
}
function goMenu(){showScreen('menu');}
var afterUnl=null;
function afterWin(dest){var b=B;var cel=b.cel||[];function next(){leaveBattle();if(dest==='next'){openBrief(Math.min(NLV,b.L+1));}else if(dest==='retry'){openBrief(b.L);}else goMenu();}
 function chain(){if(cel.length){var id=cel.shift();afterUnl=chain;showScreen('unl',{id:id,mode:'got'});}else if(b.offer){var o=b.offer;b.offer=null;SAVE.offered[o]=(SAVE.offered[o]||0)+1;save();afterUnl=chain;showScreen('unl',{id:o,mode:'offer'});}else{afterUnl=null;showScreen(null);next();}}
 closeSheet();chain();}
function openBrief(L){showScreen('menu');var tm=SAVE.team.slice(),tr=SAVE.trial&&SAVE.trial.hero;if(tr&&!SAVE.unlocked[tr]){tm=tm.slice(0,3);tm.push(tr);}
 var h='<div class="brief"><h2>'+t('level')+' '+L+'</h2><p>'+nWaves(L)+' '+t('wave')+(L===NLV?' · 👑 '+t('boss'):'')+'</p><div class="row3">'+tm.map(function(id){return '<div class="mini" style="--c:'+HERO[id].col+'"><canvas class="pc" data-h="'+id+'"></canvas>'+(id===tr&&!SAVE.unlocked[id]?'<span class="tag">'+t('trial')+'</span>':'')+'</div>';}).join('')+'</div><div class="row"><button class="btn mint" data-act="bstart" data-l="'+L+'">'+t('start')+'</button><button class="btn" data-act="bback">'+t('back')+'</button></div></div>';openSheet(h,'brief');}
/* ---------- actions ---------- */
function applyLang(){document.documentElement.lang=SAVE.lang;[].forEach.call(document.querySelectorAll('[data-t]'),function(e){e.textContent=t(e.dataset.t);});document.title=t('title')+' · Kairon Arcade';}
function startLevel(L){var tr=SAVE.trial&&SAVE.trial.hero;closeSheet();startBattle(L,tr);if(B.tut.step===0){showTip(t('tdrag'));}}
function reviveNow(){var b=B;b.revived=true;b.over=false;b.hp=Math.round(b.maxhp*.5);b.enemies.forEach(function(e){if(!e.dead){e.stun=Math.max(e.stun,3);if(!e.fly)e.s=Math.max(0,e.s-160);}});b.fx.push({k:'ring',x:CASTLE.x,y:CASTLE.y+30,t:0,life:.8,r:260,col:'#ffe0a0'});closeSheet();b.paused=false;updateHud();sfx('heal');say('revive',true);b.heroes.forEach(function(h){h.pop=1.4;h.mood='happy';h.moodT=1.5;});}
function act(a,el){audioInit();var L=el&&el.dataset&&+el.dataset.l,hid=el&&el.dataset&&el.dataset.h;
 if(a!=='x')sfx('tap',.5);
 switch(a){
 case 'mute':setMute(!SAVE.mute);if(!SAVE.mute)startMusic();refreshScreen();break;
 case 'lang':SAVE.lang=SAVE.lang==='th'?'en':'th';save();applyLang();refreshScreen();break;
 case 'lv':if(L>maxCleared()+1){toast(t('locked'));sfx('nope');}else openBrief(L);break;
 case 'bstart':startLevel(L);break;
 case 'bback':closeSheet();break;
 case 'col':showScreen('col');break;
 case 'back':showScreen('menu');break;
 case 'team':{var i=SAVE.team.indexOf(hid);if(i>=0){if(SAVE.team.length<=1)toast(t('teamMin'));else SAVE.team.splice(i,1);}else{if(SAVE.team.length>=4)toast(t('teamFull'));else{SAVE.team.push(hid);say(hid,true);}}save();showScreen('col',{keep:$('grid')&&$('grid').scrollTop});break;}
 case 'hupg':{var lv=SAVE.lv[hid]||1,c=[20,45][lv-1];if(SAVE.gems<c){toast(t('gemShort'));sfx('nope');}else{SAVE.gems-=c;SAVE.lv[hid]=lv+1;save();sfx('upgrade');say('upgrade',true);showScreen('col',{keep:$('grid').scrollTop});}break;}
 case 'buyh':{var u=UNL[hid];if(totalStars()<u.stars){toast(t('starsProg')+' '+totalStars()+'/'+u.stars);sfx('nope');}else if(SAVE.gems<u.gems){toast(t('gemShort'));sfx('nope');}else{SAVE.gems-=u.gems;SAVE.unlocked[hid]=1;save();afterUnl=function(){afterUnl=null;showScreen('col');};showScreen('unl',{id:hid,mode:'got'});}break;}
 case 'hup':{var h=B.sel;if(!h)break;if(h.lv>=3)break;var c2=upCost(h);if(B.coins<c2){toast(t('coinShort'));sfx('nope');break;}B.coins-=c2;h.lv++;h.pop=1.7;sfx('upgrade');spark(h.x,h.y-40,10);puff(h.x,h.y,8,'#ffe9a0');if(rnd()<.5)say('upgrade');refreshUI();break;}
 case 'hsell':{var h2=B.sel;if(!h2)break;var v=Math.round(HERO[h2.id].cost*.6*(h2.lv===1?1:h2.lv===2?1.7:2.6));B.coins+=v;sfx('sell');puff(h2.x,h2.y-20,8,'#ffe9a0');removeHero(h2);selectHero(null);refreshUI();break;}
 case 'adx':closeAd();break;
 case 'winad':runAd(t('adx2',{n:B.winGems}),function(){SAVE.gems+=B.winGems;save();var r=$('adrow');if(r)r.remove();var g=$('wgem');if(g)g.textContent=B.winGems*2;sfx('gem');say('x2',true);});break;
 case 'winno':{var r2=$('adrow');if(r2)r2.remove();break;}
 case 'wmenu':afterWin('menu');break;case 'wnext':afterWin('next');break;case 'wretry':afterWin('retry');break;
 case 'lmenu':leaveBattle();goMenu();break;
 case 'lretry':{var l2=B.L;leaveBattle();openBrief(l2);break;}
 case 'revad':runAd(t('adRev'),function(){reviveNow();});break;
 case 'revno':{var r3=$('adrow');if(r3)r3.remove();break;}
 case 'presume':closeSheet();if(B)B.paused=false;break;
 case 'pmute':setMute(!SAVE.mute);if(!SAVE.mute)startMusic();showPause();break;
 case 'plang':SAVE.lang=SAVE.lang==='th'?'en':'th';save();applyLang();showPause();renderTray();break;
 case 'pretry':{var l3=B.L;leaveBattle();startLevel(l3);break;}
 case 'pquit':leaveBattle();goMenu();break;
 case 'uwatch':{var o=$('screen').querySelector('.uhero canvas').dataset.h;runAd(t('adTry',{h:hname(o)}),function(){SAVE.trial={hero:o};save();toast(t('trialNext'));var f=afterUnl;afterUnl=null;(f||goMenu)();});break;}
 case 'uno':case 'ucont':{var f2=afterUnl;afterUnl=null;(f2||goMenu)();break;}
 }}
function refreshScreen(){var n=$('screen').dataset.n;if(n==='menu')showScreen('menu');else if(n==='col')showScreen('col',{keep:$('grid')&&$('grid').scrollTop});else if(!B){}if(B)updateHud();}
document.addEventListener('click',function(ev){var el=ev.target.closest('[data-act]');if(!el||el.classList.contains('dis'))return;act(el.dataset.act,el);});
$('btn-pause').addEventListener('click',function(){audioInit();sfx('tap',.5);showPause();});
$('btn-speed').addEventListener('click',function(){if(!B)return;B.speed=B.speed>=3?1:B.speed+1;this.textContent='x'+B.speed;sfx('tap',.5);});
$('btn-call').addEventListener('click',function(){if(B&&B.phase==='prep'){B.prep=0;}});
$('btn-start').addEventListener('click',function(){audioInit();var s=$('splash');s.classList.add('out');setTimeout(function(){s.classList.add('hidden');},400);goMenu();setTimeout(function(){say('hello',true);},700);});
window.addEventListener('resize',function(){layout();if(B&&B.sel)positionPanel();});
window.addEventListener('orientationchange',function(){setTimeout(layout,150);});
document.addEventListener('visibilitychange',function(){if(document.hidden&&B&&!B.over&&!B.paused&&!adSt){showPause();}});
/* extra tutorial/low-hp logic in loop */
setInterval(function(){if(!B||B.over||B.paused)return;if(B.tut.step===3&&!B.tut.skillShown&&B.heroes.some(function(h){return h.sk<=0;})){B.tut.skillShown=true;showTip(t('tskill'));say('tskill',true);}
 if(B.tut.step===2&&B.t>40&&!B.tut.coinAuto){}},500);
/* ---------- init ---------- */
layout();applyLang();
loadArt(function(){document.body.classList.add('ready');requestAnimationFrame(frame);});
})();
