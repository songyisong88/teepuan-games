/* สาวโจรสลัดเรือเหาะ · Sky Pirate Girls · Kairon Arcade — original code. */
(function(){'use strict';
var META={"b_bomb": [155, 260], "b_elec": [160, 260], "b_gold": [184, 260], "b_ice": [152, 260], "b_plain": [163, 260], "b_red": [163, 260], "bat_dn": [300, 150], "bat_up": [300, 151], "bl_blue": [203, 240], "bl_cream": [204, 240], "bl_gold": [200, 240], "bl_green": [202, 240], "bl_purple": [197, 240], "bl_red": [204, 240], "boss1": [566, 849], "boss2": [773, 806], "c_big": [181, 300], "c_gat": [164, 300], "c_magic": [174, 300], "captain": [332, 440], "cl1": [311, 170], "cl2": [284, 168], "cl3": [271, 168], "cl4": [296, 139], "cl5": [310, 175], "cl6": [257, 140], "cl7": [273, 149], "cl8": [266, 129], "deck": [760, 488], "deck_front": [760, 195], "es_bomber": [138, 380], "es_gun": [182, 380], "es_scout": [165, 380], "gull_dn": [300, 186], "gull_up": [300, 190], "h_bar": [560, 184], "h_coin": [560, 146], "h_compass": [199, 220], "h_ring": [214, 220], "i_cannon": [170, 162], "i_coin": [166, 170], "i_crew": [170, 147], "i_gem": [170, 164], "i_heart": [150, 170], "i_hole": [170, 151], "i_parrot": [170, 162], "i_star": [170, 165], "i_storm": [166, 170], "is1": [282, 342], "is2": [288, 313], "is3": [286, 345], "is4": [288, 282], "k_gift": [176, 200], "k_gold": [184, 200], "k_heal": [173, 200], "k_plain": [185, 200], "k_star": [168, 200], "k_steel": [181, 200], "mechanic": [338, 440], "p_captain_fierce": [254, 300], "p_captain_happy": [255, 300], "p_captain_scared": [246, 300], "p_mechanic_fierce": [210, 300], "p_mechanic_happy": [206, 300], "p_mechanic_scared": [199, 300], "p_pink_fierce": [250, 300], "p_pink_happy": [251, 300], "p_pink_scared": [248, 300], "pa_dn": [300, 279], "pa_perch": [190, 300], "pa_up": [284, 300], "pink": [320, 440], "sky1": [540, 960], "sky2": [540, 960], "sky3": [540, 960], "sky4": [540, 960], "sky5": [540, 960], "sky6": [540, 960], "tent1": [132, 560], "tent2": [150, 560], "tent3": [145, 560], "title": [720, 1280]};
var VER=1,SKEY='kairon_skypirate_save';
var FW=540,LH=960;
var SOUNDS=['btn','cannon','bolt','magic','hit','crit','burst','chain','bomb','zap','thunder','storm','hole','parrot','squawk','pickup','coin','crew','power','heal','hurt','ehit','eshot','roar','bossdie','freeze','fever','ready','warn','wave','gold','wind','win','lose','buy','nope','tick','combo','music','music2',
 'v_hello','v_go','v_cap_combo','v_cap_fire','v_mec_combo','v_mec_fix','v_pnk_combo','v_pnk_crit','v_combo5','v_combo10','v_combo20','v_fever','v_storm','v_hole','v_parrot','v_hurt1','v_hurt2','v_low','v_boss1','v_boss2','v_weak','v_win','v_final','v_lose','v_tut','v_gold','v_coins','v_upgrade','v_crew','v_bomb','v_ice','v_storm_in','v_treasure'];
var ART=['b_plain','b_gold','b_red','b_elec','b_ice','b_bomb','k_plain','k_gold','k_gift','k_steel','k_heal','k_star','bl_cream','bl_red','bl_blue','bl_green','bl_purple','bl_gold','c_big','c_gat','c_magic','captain','mechanic','pink','deck','deck_front',
 'p_captain_happy','p_captain_scared','p_captain_fierce','p_mechanic_happy','p_mechanic_scared','p_mechanic_fierce','p_pink_happy','p_pink_scared','p_pink_fierce','pa_up','pa_dn','pa_perch','gull_up','gull_dn','bat_up','bat_dn','es_scout','es_gun','es_bomber','boss1','boss2','tent1','tent2','tent3',
 'i_coin','i_heart','i_crew','i_cannon','i_storm','i_hole','i_parrot','i_gem','i_star','cl1','cl2','cl3','cl4','cl5','cl6','cl7','cl8','is1','is2','is3','is4','sky1','sky2','sky3','sky4','sky5','sky6'];
var FLASH=['b_plain','b_gold','b_red','b_elec','b_ice','b_bomb','k_plain','k_gold','k_gift','k_steel','k_heal','k_star','gull_up','gull_dn','bat_up','bat_dn','es_scout','es_gun','es_bomber','boss1','boss2','bl_gold'];
var $=function(i){return document.getElementById(i);};
var IM={},FL={},ICE={},loaded=0;
var Q=(function(){var o={},s=location.search.replace(/^\?/,'').split('&');s.forEach(function(p){if(!p)return;var k=p.split('=');o[k[0]]=decodeURIComponent(k[1]||'1');});return o;})();
/* ---------- text (Thai) ---------- */
var TX={
 title:'สาวโจรสลัด',title2:'เรือเหาะ',sub:'ลากเรือ ยิงถังเลข ระเบิดสนั่นฟ้า!',tapStart:'แตะเพื่อออกเรือ',loading:'กำลังโหลด',
 play:'ออกเรือ',shop:'ร้านอัปเกรด',back:'กลับ',level:'ด่าน',resume:'เล่นต่อ',restart:'เริ่มใหม่',menu:'หน้าหลัก',sound:'เสียง',paused:'พักเกม',
 win:'ผ่านด่านแล้ว!',lose:'เรือแย่แล้ว',next:'ด่านต่อไป',retry:'เล่นอีกครั้ง',coins:'เหรียญ',max:'สูงสุด',
 adFree:'ดูโฆษณาจำลอง รับเหรียญ +150',adX2:'ดูโฆษณาจำลอง รับเหรียญ x2',adRev:'ดูโฆษณาจำลอง ซ่อมเรือ',noThanks:'ไม่ล่ะ',adTitle:'โฆษณาจำลอง (ทดสอบ)',adHint:'หน้าจอทดสอบ ไม่ใช่โฆษณาจริง',adNone:'ตอนนี้ยังดูไม่ได้ รอสักครู่นะ',adDone:'ได้รับรางวัลแล้ว!',adEarly:'ปิดก่อนจบ ไม่ได้รางวัล',
 t1:'ลากนิ้วซ้าย-ขวา พาเรือบิน ปืนยิงเอง!',t2:'ยิงถังให้เลขเหลือ 0 ถังจะแตก ของรางวัลตกลงมา เก็บให้ได้!',t3:'คอมโบเต็ม กดสกิลสามปุ่ม พายุ หลุมดำ นกแก้ว!',tnext:'ต่อไป',tgo:'ออกเรือเลย!',
 go:'ออกเรือ!',boss:'บอสมาแล้ว!',weak:'ยิงจุดเรืองแสง!',fever:'ไฟลุก!',treasure:'ลูกโป่งสมบัติ!',storm:'พายุมาแล้ว!',wind:'ลมแรง!',
 earned:'เหรียญที่ได้',bonus:'โบนัสผ่านด่าน',hpleft:'ความแข็งแรงเรือ',best:'คอมโบสูงสุด',
 up:{pw:['ปืนใหญ่ของกัปตัน','ยิงแรงขึ้น'],rf:['ป้อมประแจของฟ้า','ยิงรัวขึ้น'],hp:['ตัวเรือเสริมเกราะ','เลือดเรือมากขึ้น'],sk:['ลิ้นชักของพิ้งค์','สกิลชาร์จไวขึ้น'],cr:['ลูกเรือตั้งต้น','เริ่มด่านมีลูกเรือเพิ่ม']},
 lv:['ฟ้าใสสบาย','เมฆทองยามบ่าย','เกาะลอยฟ้า','เรือผีกะโหลก','ฟ้าเริ่มคำราม','ลูกโป่งสมบัติ','คืนพายุออโรรา','อสูรหมึกยักษ์'],
 bn:['เรือกะโหลกยักษ์','อสูรหมึกพายุ'],
 clear:'ผ่านครบทุกด่านแล้ว! สุดยอดสาวโจรสลัด!',
 g:{cap:'ดาว',mec:'ฟ้า',pnk:'พิ้งค์'}
};
/* ---------- save ---------- */
function defSave(){return {v:VER,coins:0,maxLv:1,stars:{},up:{pw:0,rf:0,hp:0,sk:0,cr:0},mute:false,tut:false,ads:{day:'',n:0,last:0},plays:0,best:0};}
function merge(d,s){for(var k in d){if(s[k]===undefined)s[k]=d[k];else if(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k]))s[k]=merge(d[k],s[k]);}return s;}
function loadSave(){var s=null;try{s=JSON.parse(localStorage.getItem(SKEY));}catch(e){}if(!s||typeof s!=='object')return defSave();s.v=VER;return merge(defSave(),s);}
var SAVE=loadSave();
function save(){try{localStorage.setItem(SKEY,JSON.stringify(SAVE));}catch(e){}}
/* ---------- audio ---------- */
var AC=null,BUF={},master=null,musicNode=null,music2Node=null,musicGain=null,music2Gain=null,lastPlay={},voicePlaying=0,m2target=0,m2cur=0;
function audioInit(){if(AC){if(AC.state==='suspended')AC.resume();return;}
 try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
 master=AC.createGain();master.gain.value=SAVE.mute?0:1;master.connect(AC.destination);
 var cnt=0;SOUNDS.forEach(function(n){fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;if(BUF.music&&BUF.music2)startMusic();}).catch(function(){});});}
function startMusic(){if(!AC||!BUF.music||!BUF.music2||musicNode)return;var t=AC.currentTime+.05;
 function mk(b,g){var s=AC.createBufferSource();s.buffer=b;s.loop=true;var gn=AC.createGain();gn.gain.value=g;s.connect(gn);gn.connect(master);s.start(t);return [s,gn];}
 var a=mk(BUF.music,.3),b=mk(BUF.music2,0);musicNode=a[0];musicGain=a[1];music2Node=b[0];music2Gain=b[1];}
var mbase=.3;
function musicVol(v){mbase=v;if(musicGain)musicGain.gain.value=v;}
function music2(v){m2target=v;}
function tickMusic(dt){if(!music2Gain)return;m2cur+=(m2target-m2cur)*Math.min(1,dt*1.8);music2Gain.gain.value=m2cur;}
function sfx(n,vol,rate,gap){if(!AC||!BUF[n]||SAVE.mute)return;var now=AC.currentTime;if(lastPlay[n]&&now-lastPlay[n]<(gap==null?.04:gap))return;lastPlay[n]=now;var s=AC.createBufferSource();s.buffer=BUF[n];if(rate)s.playbackRate.value=rate;var g=AC.createGain();g.gain.value=vol==null?.8:vol;s.connect(g);g.connect(master);s.start();}
function say(n,force){if(!AC||!BUF['v_'+n]||SAVE.mute)return false;var now=AC.currentTime;if(!force&&now<voicePlaying)return false;var b=BUF['v_'+n];voicePlaying=now+b.duration+.25;var s=AC.createBufferSource();s.buffer=b;var g=AC.createGain();g.gain.value=1;s.connect(g);g.connect(master);s.start();return true;}
function setMute(m){SAVE.mute=m;save();if(master)master.gain.value=m?0:1;document.querySelectorAll('.sndb').forEach(function(b){b.classList.toggle('off',m);});}
/* ---------- helpers ---------- */
var rnd=Math.random;function rr(a,b){return a+rnd()*(b-a);}
function ri(a,b){return Math.floor(a+rnd()*(b-a+1));}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function lerp(a,b,t){return a+(b-a)*t;}
function pick(a){return a[Math.floor(rnd()*a.length)];}
var W=390,H=844,DPR=1,SC=1,cv=$('scene'),cx=cv.getContext('2d'),gameEl=$('game');
function layout(){var iw=window.innerWidth,ih=window.innerHeight;W=Math.min(iw,Math.floor(ih*0.5625));H=ih;gameEl.style.width=W+'px';gameEl.style.height=H+'px';document.documentElement.style.fontSize=(W/39)+'px';DPR=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);SC=W/FW;LH=H/SC;}
/* ---------- assets ---------- */
function tintCanvas(im,col,a){var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-atop';g.globalAlpha=a==null?1:a;g.fillStyle=col;g.fillRect(0,0,c.width,c.height);return c;}
function loadArt(done){var n=ART.length;ART.forEach(function(k){var im=new Image();im.onload=function(){IM[k]=im;if(FLASH.indexOf(k)>=0){FL[k]=tintCanvas(im,'#fff',1);}if(++loaded===n)done();var p=$('loadp');if(p)p.style.width=(loaded/n*100)+'%';};im.onerror=function(){if(++loaded===n)done();};im.src='art/'+k+'.webp';});}
function iceOf(k){if(ICE[k])return ICE[k];var im=IM[k];if(!im)return null;var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(120,210,255,.55)';g.fillRect(0,0,c.width,c.height);ICE[k]=c;return c;}
/* centre-anchored sprite. o:{w,ax,ay,sx,sy,rot,flash,ice,alpha,flip} ; h is height unless o.w */
function dr(k,x,y,h,o){var im=IM[k];if(!im)return;o=o||{};var sc=o.w?o.w/im.width:h/im.height,w=im.width*sc,hh=im.height*sc,ax=o.ax==null?.5:o.ax,ay=o.ay==null?.5:o.ay;
 cx.save();cx.translate(x,y);if(o.rot)cx.rotate(o.rot);if(o.sx!=null||o.sy!=null||o.flip)cx.scale((o.flip?-1:1)*(o.sx==null?1:o.sx),o.sy==null?1:o.sy);if(o.alpha!=null)cx.globalAlpha=o.alpha;
 cx.drawImage(o.ice&&iceOf(k)?iceOf(k):im,-w*ax,-hh*ay,w,hh);
 if(o.flash&&FL[k]){cx.globalAlpha=o.flash*(o.alpha==null?1:o.alpha);cx.drawImage(FL[k],-w*ax,-hh*ay,w,hh);}
 cx.restore();}
function txt(s,x,y,sz,fill,stroke,al,sw){cx.font='800 '+sz+'px Kanit,sans-serif';cx.textAlign=al||'center';cx.textBaseline='middle';cx.lineJoin='round';if(stroke){cx.lineWidth=sz*(sw||.22);cx.strokeStyle=stroke;cx.strokeText(s,x,y);}cx.fillStyle=fill;cx.fillText(s,x,y);}
/* ---------- data ---------- */
var LV=[
 {sky:[1],dur:48,num:[4,10],int:[2.6,1.7],w:{plain:1,gold:.06},crate:.14,gull:8,evt:[]},
 {sky:[1,2],dur:55,num:[7,16],int:[2.4,1.5],w:{plain:1,gold:.09,red:.22},crate:.18,gull:6,evt:[{t:26,k:'wind',d:7},{t:42,k:'treasure'}]},
 {sky:[6,1],dur:60,num:[9,22],int:[2.3,1.4],w:{plain:1,gold:.08,red:.2,elec:.16,ice:.16},crate:.2,gull:7,bat:14,evt:[{t:20,k:'wind',d:7},{t:44,k:'treasure'}]},
 {sky:[2,3],dur:46,num:[12,28],int:[2.2,1.4],w:{plain:1,gold:.08,red:.22,elec:.15,ice:.12,bomb:.07},crate:.2,bat:10,scout:20,evt:[{t:24,k:'wind',d:7}],boss:1},
 {sky:[3,4],dur:62,num:[16,36],int:[2.1,1.25],w:{plain:1,gold:.08,red:.2,elec:.16,ice:.12,bomb:.1},crate:.22,bat:11,scout:15,gun:30,evt:[{t:22,k:'storm',d:20},{t:52,k:'treasure'}]},
 {sky:[3,4],dur:64,num:[20,44],int:[2.0,1.2],w:{plain:1,gold:.1,red:.2,elec:.16,ice:.12,bomb:.1},crate:.22,bat:10,scout:14,gun:22,evt:[{t:14,k:'treasure'},{t:30,k:'wind',d:8},{t:40,k:'treasure'},{t:52,k:'storm',d:10}]},
 {sky:[4,5],dur:68,num:[24,54],int:[1.9,1.15],w:{plain:1,gold:.1,red:.22,elec:.18,ice:.12,bomb:.12},crate:.22,bat:9,scout:12,gun:18,bomber:26,evt:[{t:16,k:'storm',d:24},{t:46,k:'treasure'},{t:52,k:'storm',d:12}]},
 {sky:[5,4],dur:44,num:[28,60],int:[1.9,1.2],w:{plain:1,gold:.1,red:.22,elec:.18,ice:.12,bomb:.12},crate:.2,bat:9,scout:14,gun:20,evt:[{t:14,k:'storm',d:18}],boss:2}
];
var UPD={pw:{base:70,img:'i_cannon',mx:8},rf:{base:80,img:'i_star',mx:8},hp:{base:90,img:'i_heart',mx:5},sk:{base:100,img:'i_gem',mx:6},cr:{base:130,img:'i_crew',mx:4}};
function upv(k){return SAVE.up[k]||0;}
function upMax(k){return UPD[k].mx;}
function upCost(k){return Math.round(UPD[k].base*(1+upv(k)*.8)/10)*10;}
/* barrel kinds: sprite, hit half-width, rewards */
var BK={plain:{s:'b_plain',lab:'#5a2b00'},gold:{s:'b_gold',lab:'#5a2b00'},red:{s:'b_red',lab:'#5a0a00'},elec:{s:'b_elec',lab:'#0a2a5a'},ice:{s:'b_ice',lab:'#0a3a5a'},bomb:{s:'b_bomb',lab:'#5a0a00'}};
var CK={k_plain:'k_plain',k_gold:'k_gold',k_gift:'k_gift',k_steel:'k_steel',k_heal:'k_heal',k_star:'k_star'};
var BALLOONS=['bl_cream','bl_red','bl_blue','bl_green','bl_purple'];
/* girls and voice lines: key -> [girl, text, emotion] */
var GIRL={cap:{n:'cap',img:'p_captain_',col:'#ff7a4a'},mec:{n:'mec',img:'p_mechanic_',col:'#4ab0ff'},pnk:{n:'pnk',img:'p_pink_',col:'#ff7ac8'}};
var LINES={
 hello:['cap','สาวโจรสลัด ออกบินแล้ว!','happy'],go:['cap','ออกเรือ!','fierce'],
 cap_combo:['cap','เยี่ยมไปเลย!','happy'],cap_fire:['cap','ปืนใหญ่ จัดไป!','fierce'],mec_combo:['mec','เร็วเข้า เร็วเข้า!','happy'],mec_fix:['mec','ซ่อมเสร็จแล้ว!','happy'],
 pnk_combo:['pnk','โชคดีสุดๆ!','happy'],pnk_crit:['pnk','เวทมนตร์พุ่งชน!','happy'],combo5:['cap','คอมโบ 5!','happy'],combo10:['mec','คอมโบ 10 สุดยอด!','happy'],combo20:['pnk','อลังการมาก!','happy'],
 fever:['cap','โหมดไฟลุก!','fierce'],storm:['pnk','พายุฟ้าผ่า!','fierce'],hole:['mec','หลุมดำ ดูดเลย!','fierce'],parrot:['pnk','นกแก้วบุกเลย!','fierce'],
 hurt1:['mec','โอ๊ย!','scared'],hurt2:['pnk','กรี๊ด! เรือโดนยิง!','scared'],low:['cap','เรือจะแย่แล้ว ระวังนะ!','scared'],
 boss1:['cap','ระวัง! เรือโจรสลัดยักษ์!','fierce'],boss2:['mec','อสูรหมึกยักษ์มาแล้ว!','scared'],weak:['pnk','ยิงจุดที่เรืองแสงเลย!','fierce'],
 win:['cap','ชนะแล้ว เก่งมากเลย!','happy'],final:['pnk','ชนะอสูรหมึกแล้ว เจ๋งที่สุด!','happy'],lose:['mec','โอ๊ะ ลองใหม่อีกทีนะ','scared'],tut:['cap','ลากนิ้วซ้ายขวา พาเรือบิน!','happy'],
 gold:['pnk','ถังทองคำ!','happy'],coins:['pnk','เหรียญเพียบเลย!','happy'],upgrade:['mec','อัปเกรดแล้ว!','happy'],crew:['cap','ลูกเรือใหม่มาแล้ว!','happy'],bomb:['mec','ตูม! ตูมสนั่น!','fierce'],ice:['pnk','หนาวจัง!','scared'],storm_in:['cap','พายุมาแล้ว หลบนะ!','scared'],treasure:['pnk','ลูกโป่งสมบัติ!','happy']
};
var SKD=[{cd:22,cost:100,key:'storm'},{cd:30,cost:100,key:'hole'},{cd:26,cost:100,key:'parrot'}];
/* ---------- fx: glow sprites, particles, floaters, bolts, camera ---------- */
var GLOWC={y:'#ffd966',o:'#ff8a2a',r:'#ff3b2e',b:'#4fc3ff',c:'#b8f0ff',p:'#c05bff',k:'#ff7ac8',g:'#7dff7d',w:'#ffffff',gd:'#ffc933'};
var GL={},SMK={};
function mkGlow(col){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d');var gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'#fff');gr.addColorStop(.18,col);gr.addColorStop(.55,col+'88');gr.addColorStop(1,col+'00');g.fillStyle=gr;g.fillRect(0,0,64,64);return c;}
function mkSmoke(l){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d');var gr=g.createRadialGradient(32,32,2,32,32,31);gr.addColorStop(0,'rgba('+l+','+l+','+l+',.95)');gr.addColorStop(.6,'rgba('+l+','+l+','+l+',.5)');gr.addColorStop(1,'rgba('+l+','+l+','+l+',0)');g.fillStyle=gr;g.fillRect(0,0,64,64);return c;}
function initFx(){for(var k in GLOWC)GL[k]=mkGlow(GLOWC[k]);SMK.d=mkSmoke(70);SMK.l=mkSmoke(235);SMK.m=mkSmoke(150);}
var RAIN=['r','o','y','g','c','b','p','k'];
var P=[],MAXP=900,FT=[],BO=[];
var CAM={tr:0,sx:0,sy:0,zoom:1,zt:0,zv:0,vig:0,vigc:'255,40,30',flash:0,flashc:'255,255,255'};
function pt(o){if(P.length>=MAXP*(G?G.q:1))return null;P.push(o);return o;}
/* t:0 glow,1 spark,2 smoke,3 debris,4 ring,5 confetti,6 coin,7 rain,8 feather */
function glow(x,y,s,c,life,vx,vy,g,add){return pt({t:0,x:x,y:y,s:s,c:c,life:life,max:life,vx:vx||0,vy:vy||0,g:g||0,ds:add||0});}
function sparks(x,y,n,c,sp,life){n=Math.ceil(n*(G?G.q:1));for(var i=0;i<n;i++){var a=rnd()*6.283,v=rr(.3,1)*sp;pt({t:1,x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:400,life:(life||.5)*rr(.6,1.2),max:(life||.5),c:c||'#ffe9a0',w:rr(1.5,3.2)});}}
function puff(x,y,n,sz,tone,sp){n=Math.ceil(n*(G?G.q:1));for(var i=0;i<n;i++){var a=rnd()*6.283,v=rr(.1,1)*(sp||60);pt({t:2,x:x+rr(-6,6),y:y+rr(-6,6),vx:Math.cos(a)*v,vy:Math.sin(a)*v-10,s:sz*rr(.6,1.1),ds:sz*rr(.8,1.6),life:rr(.5,1),max:1,k:tone||'m',rot:0});}}
function debris(x,y,n,cols,sp){n=Math.ceil(n*(G?G.q:1));cols=cols||['#8a4f22','#b8742f','#5a2f10'];for(var i=0;i<n;i++){var a=rr(-3.1,0)-0.1,v=rr(.3,1)*sp;pt({t:3,x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:700,r:rnd()*6,vr:rr(-12,12),w:rr(4,10),h:rr(3,7),life:rr(.6,1.2),max:1,c:pick(cols)});}}
function ring(x,y,r0,r1,c,life,w){return pt({t:4,x:x,y:y,r:r0,r1:r1,life:life||.4,max:life||.4,c:c||'#fff',w:w||5});}
function confetti(x,y,n,sp){n=Math.ceil(n*(G?G.q:1));var cs=['#ff4a4a','#ffd23a','#4ac0ff','#7dff7d','#ff7ac8','#fff'];for(var i=0;i<n;i++){var a=rr(-2.9,-.25),v=rr(.4,1)*sp;pt({t:5,x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:380,r:rnd()*6,vr:rr(-9,9),w:rr(5,9),h:rr(8,14),life:rr(1.6,2.8),max:2.6,c:pick(cs),ph:rnd()*6});}}
function coinfx(x,y,n,sp){n=Math.ceil(n*(G?G.q:1));for(var i=0;i<n;i++){var a=rr(-2.6,-.55),v=rr(.5,1)*sp;pt({t:6,x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:900,ph:rnd()*6,life:rr(.9,1.5),max:1.2,bounce:1});}}
function feather(x,y,n,c){for(var i=0;i<n;i++){pt({t:8,x:x,y:y,vx:rr(-80,80),vy:rr(-80,20),g:60,r:rnd()*6,vr:rr(-6,6),life:rr(.5,1),max:1,c:c});}}
function boom(x,y,s,o){o=o||{};var q=G?G.q:1;
 glow(x,y,s*2.4,o.c||'y',.28,0,0,s*5);glow(x,y,s*1.4,'w',.16,0,0,s*2);ring(x,y,s*.2,s*1.5,o.ring||'#ffd27a',.4,s*.09);if(s>90)ring(x,y,s*.1,s*2.1,'#fff',.55,s*.05);
 sparks(x,y,Math.round(s*.28),o.sp||'#ffe9a0',s*5,.55);puff(x,y,Math.round(s*.1),s*.6,'d',s*1.4);if(!o.nodeb)debris(x,y,Math.round(s*.1),o.deb,s*5.5);}
function fl(x,y,s,col,sz,crit){var f=null;for(var i=0;i<FT.length;i++)if(FT[i].t<=0){f=FT[i];break;}if(!f){if(FT.length>48)return;f={};FT.push(f);}f.x=x+rr(-6,6);f.y=y;f.s=s;f.col=col||'#fff';f.sz=sz||26;f.t=crit?1.0:.7;f.m=f.t;f.crit=!!crit;f.vx=rr(-18,18);}
function bolt(x1,y1,x2,y2,w,col,life,jit,wob){var pts=[[x1,y1]],n=Math.max(3,Math.ceil(Math.hypot(x2-x1,y2-y1)/(wob||38))),dx=(x2-x1)/n,dy=(y2-y1)/n;for(var i=1;i<n;i++)pts.push([x1+dx*i+rr(-1,1)*(jit||26),y1+dy*i+rr(-1,1)*(jit||26)*.5]);pts.push([x2,y2]);BO.push({p:pts,life:life||.22,max:life||.22,w:w||5,c:col||'#9fe0ff'});if(BO.length>40)BO.shift();}
function shake(a){CAM.tr=Math.min(1,CAM.tr+a);}
function zoomPunch(z){CAM.zv=Math.max(CAM.zv,z);}
function vig(c,a){CAM.vigc=c||'255,40,30';CAM.vig=Math.max(CAM.vig,a==null?.7:a);}
function whiteflash(a,c){CAM.flash=Math.max(CAM.flash,a);CAM.flashc=c||'255,255,255';}
function stepFx(dt){
 for(var i=P.length-1;i>=0;i--){var p=P[i];p.life-=dt;if(p.life<=0){P[i]=P[P.length-1];P.pop();continue;}
  p.x+=(p.vx||0)*dt;p.y+=(p.vy||0)*dt;if(p.g)p.vy+=p.g*dt;
  if(p.t===0){p.s+=p.ds*dt;}else if(p.t===2){p.s+=p.ds*dt;p.vx*=.97;p.vy*=.97;}else if(p.t===3||p.t===5||p.t===8){p.r+=p.vr*dt;if(p.t===5||p.t===8){p.vx*=.985;if(p.vy>90)p.vy=90;}}
  else if(p.t===6){if(p.vy>0&&p.y>LH-90&&p.bounce>0){p.vy*=-.5;p.bounce--;}}else if(p.t===4){}
 }
 for(i=FT.length-1;i>=0;i--){var f=FT[i];if(f.t>0){f.t-=dt;f.y-=(f.crit?55:70)*dt;f.x+=f.vx*dt;}}
 for(i=BO.length-1;i>=0;i--){BO[i].life-=dt;if(BO[i].life<=0)BO.splice(i,1);}
 CAM.tr=Math.max(0,CAM.tr-dt*1.6);CAM.vig=Math.max(0,CAM.vig-dt*1.6);CAM.flash=Math.max(0,CAM.flash-dt*2.6);
 CAM.zv+=(0-CAM.zv)*Math.min(1,dt*8);
}
/* ---------- game state ---------- */
var G=null,inRun=false,selLv=1,adSt=null;
function shipY(){return LH-300;}
function pw2(){return 1;}
function newRun(L){var lv=LV[L-1],hpm=5+upv('hp');
 G={L:L,lv:lv,t:0,ts:1,paused:false,over:0,q:1,auto:false,
  ship:{x:270,y:shipY(),vx:0,tx:270,hp:hpm,hpmax:hpm,inv:0,wind:0,tilt:0},
  tg:[],sh:[],eb:[],it:[],pars:[],dl:[],hole:null,bossObj:null,
  crew:1+upv('cr'),pw:0,rf:0,
  combo:0,mult:1,ct:0,maxCombo:0,tier:0,fever:0,feverOn:0,feverEnd:0,
  skc:[30,10,20],skready:[0,0,0],
  coins:0,coinsShown:0,kills:0,hurts:0,
  spawnT:1.2,gullT:5,batT:rr(8,12),scoutT:12,gunT:18,bomberT:20,evi:0,
  storm:0,stormT:0,stormV:0,strikes:[],strikeT:2,wind:{t:0,dur:0,dir:1},
  phase:'run',cine:0,hs:0,slow:0,chain:0,chainT:0,talkCd:0,
  fire:{cap:.3,mec:.1,pnk:.5},rec:{cap:0,mec:0,pnk:0},emo:{k:'',t:0},blink:{cap:2,mec:3,pnk:4},blinkT:{cap:2,mec:3,pnk:4},
  boost:3,hurtT:0,sky:0,skyB:0,skyMix:0,mood:0,clouds:[],isl:[],lines:[],introT:0,endT:0,bossIn:false,tipT:0,
  hpFlash:0,shown:{}};
 for(var i=0;i<14;i++)G.clouds.push(newCloud(rr(0,LH),i));
 for(i=0;i<3;i++)G.isl.push({k:'is'+(1+i%4),x:rr(60,480),y:rr(-100,LH),s:rr(.7,1.1)});
 P.length=0;FT.length=0;BO.length=0;
 G.sky=lv.sky[0];G.skyB=lv.sky[lv.sky.length-1];
 for(i=0;i<3;i++)spawnBarrel('plain',Math.round(lv.num[0]*rr(.9,1.2)),[130,270,410][i]+rr(-20,20),[90,190,60][i]+rr(0,60),null);
 hudHearts();updSkillUI();}
function newCloud(y,i){var d=Math.random();return {k:'cl'+(1+Math.floor(rnd()*8)),x:rr(-40,580),y:y,z:d,s:rr(.8,1.5)*(0.6+d*.8)};}
/* ---------- targets ---------- */
function wpick(w){var s=0,k;for(k in w)s+=w[k];var r=rnd()*s;for(k in w){r-=w[k];if(r<=0)return k;}return 'plain';}
function mid(t){return t.y+(t.top+t.bot)/2;}
function mkT(o){o.dead=0;o.flash=0;o.sq=0;o.frz=0;o.ph=rnd()*6.28;o.age=0;o.max=o.hp;G.tg.push(o);return o;}
function spawnBarrel(type,num,x,y,vy){var gold=type==='gold';return mkT({k:'bar',type:type,hp:num,x:x,y:y==null?-210:y,vy:vy||rr(80,104),hw:40,top:-150,bot:52,bl:pick(BALLOONS),sway:gold?34:rr(4,14),gold:gold,spin:rr(-1,1)});}
function spawnCrate(type,num,x,y){return mkT({k:'crt',type:type,hp:num,x:x,y:y==null?-210:y,vy:rr(74,92),hw:38,top:-150,bot:46,bl:pick(BALLOONS),sway:rr(4,12)});}
function spawnGroup(){var lv=G.lv,pr=clamp(G.t/lv.dur,0,1),n=rnd()<.4+pr*.35?2:1;if(pr>.7&&rnd()<.25)n=3;
 var used=[];for(var i=0;i<n;i++){var x,tries=0;do{x=rr(70,470);tries++;}while(tries<10&&used.some(function(u){return Math.abs(u-x)<140;}));used.push(x);
  var base=lv.num[0]+(lv.num[1]-lv.num[0])*pr*rr(.5,1.1);base*=[4,3.9,3.8,3.8,4.6,5.4,6.2,6.2][G.L-1]||4;if(G.phase==='boss')base*=.8;base=Math.max(3,Math.round(base));
  if(rnd()<lv.crate){var cw=rnd();var ct=cw<.2?'k_gift':cw<.4?'k_steel':cw<.55?'k_heal':cw<.7?'k_star':cw<.85?'k_gold':'k_plain';var cn=ct==='k_steel'?base*1.6:ct==='k_gold'?base*1.2:base;spawnCrate(ct,Math.round(cn),x);continue;}
  var ty=wpick(lv.w);if(G.phase==='boss'&&(ty==='bomb'))ty='plain';var num=base;if(ty==='gold')num=Math.round(base*.8);if(ty==='bomb')num=Math.round(base*.7);if(ty==='red')num=Math.round(base*.85);
  spawnBarrel(ty,Math.max(2,num),x,null,ty==='gold'?rr(100,125):ty==='bomb'?rr(100,118):null);}}
function spawnGulls(){var dir=rnd()<.5?1:-1,y=rr(160,520),n=ri(3,5);for(var i=0;i<n;i++){mkT({k:'gull',hp:2+Math.floor(G.L/3),x:dir>0?-60-i*50:600+i*50,y:y+i*26*(i%2?1:-1)+rr(-10,10),vx:dir*rr(140,170),hw:34,top:-26,bot:26,dir:dir,wob:rr(0,6)});}}
function spawnBat(){var x=rr(90,450);mkT({k:'bat',hp:5+Math.round(G.L*1.6),x:x,y:-60,vx:0,hw:32,top:-24,bot:24,sh:rr(1.2,2.4),stay:rr(7,10),bx:x,wob:rr(0,6)});}
function spawnShip(kind){var x=rr(120,420),hp,ty;if(kind==='scout'){hp=34+G.L*9;}else if(kind==='gun'){hp=70+G.L*14;}else{hp=55+G.L*10;}
 mkT({k:kind,hp:hp,x:x,y:-120,hw:kind==='gun'?56:44,top:-62,bot:62,sh:rr(1.6,2.6),stay:kind==='bomber'?16:rr(11,15),bx:x,wob:rr(0,6),vx:rr(-30,30),ty:kind==='bomber'?150:rr(180,300)});}
function spawnTreasure(){say('treasure');talk('treasure',1);banner(TX.treasure);sfx('wave',.8);var n=12,dir=rnd()<.5?1:-1;for(var i=0;i<n;i++){mkT({k:'tb',hp:1+Math.floor(G.L/4),x:dir>0?-40-i*58:580+i*58,y:rr(90,170)+Math.sin(i*.9)*60,vx:dir*rr(96,112),vy:rr(14,26),hw:36,top:-62,bot:60,ph0:i*.7,coins:12});}}
/* ---------- fire ---------- */
var MUZ={cap:{x:0,y:-80},mec:{x:-82,y:-58},pnk:{x:82,y:-58}};
function dmgMul(){return (1+.12*upv('pw')+.17*G.pw)*(G.feverOn>0?1.25:1)*(1+.05*(G.crew-1));}
function rateMul(){return (G.feverOn>0?2:1)*Math.pow(1.065,G.rf+upv('rf'));}
function nearestAhead(x,y,cone){var best=null,bd=1e9;for(var i=0;i<G.tg.length;i++){var t=G.tg[i];if(t.dead||t.k==='boss')continue;var ty=mid(t);if(t.y<-120)continue;var dy=y-ty;if(dy<30)continue;var dx=t.x-x;if(Math.abs(dx)/dy>cone)continue;var d=dx*dx+dy*dy*.6;if(d<bd){bd=d;best=t;}}
 var b=G.bossObj;if(b&&!b.dead&&b.in){var by=b.y+40,dy2=y-by;if(dy2>30&&Math.abs(b.x-x)/dy2<cone*1.4){best=best&&bd<dy2*dy2?best:{x:b.x,y:by,top:0,bot:0};}}
 return best;}
function shoot(kind,x,y,ang,dmg,spd,extra){var s={k:kind,x:x,y:y,vx:Math.sin(ang)*spd,vy:-Math.cos(ang)*spd,dmg:dmg,life:1.8,r:kind==='ball'?16:kind==='bolt'?8:12,hit:0,tr:0,crit:0,hom:0};if(extra)for(var k in extra)s[k]=extra[k];G.sh.push(s);return s;}
function fireAll(dt){var sh=G.ship,rm=rateMul(),dm=dmgMul(),f=G.fire,cr=G.crew;
 f.cap-=dt;if(f.cap<=0){f.cap=.85/rm;G.rec.cap=1;var mx=sh.x+MUZ.cap.x,my=sh.y+MUZ.cap.y+Math.sin(G.t*2)*3,tg=nearestAhead(mx,my,.5),a=tg?clamp(Math.atan2(tg.x-mx,my-mid(tg)),-.4,.4):0,cnt=1+(G.pw>=3?1:0)+(G.pw>=5?1:0),sp=.16;
  for(var i=0;i<cnt;i++){var aa=a+(i-(cnt-1)/2)*sp;shoot('ball',mx,my,aa,6*dm,740,{big:1});}
  boom(mx,my-8,26,{c:'o',nodeb:1,ring:'#ffd27a'});glow(mx,my,90,'y',.1,0,0,0);puff(mx,my-10,2,24,'m',50);sfx('cannon',.55,1+rr(-.05,.08)+(G.feverOn>0?.12:0),.07);shake(.05);G.skc.forEach(function(){});}
 f.mec-=dt;if(f.mec<=0){f.mec=.17/rm;G.rec.mec=1;var n=1+Math.floor((cr-1)/3),mx2=sh.x+MUZ.mec.x,my2=sh.y+MUZ.mec.y;G.mflip=!G.mflip;
  for(i=0;i<n;i++){var tg2=nearestAhead(mx2,my2,.4),a2=tg2?clamp(Math.atan2(tg2.x-mx2,my2-mid(tg2)),-.3,.3):0;a2+=rr(-.05,.05)+(i-(n-1)/2)*.1;shoot('bolt',mx2+(G.mflip?7:-7),my2,a2,1.7*dm,940);}
  glow(mx2,my2,34,'y',.07,0,0,0);sfx('bolt',.28,1+rr(-.1,.1),.05);}
 f.pnk-=dt;if(f.pnk<=0){f.pnk=.62/rm;G.rec.pnk=1;var n3=1+Math.floor((cr-1)/4),mx3=sh.x+MUZ.pnk.x,my3=sh.y+MUZ.pnk.y;
  for(i=0;i<n3;i++){var crit=rnd()<(G.feverOn>0?.4:.2);var m=shoot('magic',mx3,my3,rr(-.5,.5)+(i-(n3-1)/2)*.4,2.8*dm*(crit?3:1),520,{hom:7,crit:crit,life:2.2});}
  glow(mx3,my3,50,'k',.12,0,0,0);sparks(mx3,my3,5,'#ff9ae0',160,.4);sfx('magic',.3,1+rr(-.1,.15),.08);}}
function stepShots(dt){var sh=G.sh;for(var i=sh.length-1;i>=0;i--){var s=sh[i];s.life-=dt;
  if(s.hom){var tg=nearestAhead(s.x,s.y,5);var ox=s.vx,oy=s.vy;if(tg){var ang=Math.atan2(tg.x-s.x,s.y-mid(tg)),cur=Math.atan2(s.vx,-s.vy),df=ang-cur;while(df>3.14)df-=6.28;while(df<-3.14)df+=6.28;cur+=clamp(df,-s.hom*dt,s.hom*dt);var sp=Math.hypot(s.vx,s.vy);s.vx=Math.sin(cur)*sp;s.vy=-Math.cos(cur)*sp;}}
  s.x+=s.vx*dt;s.y+=s.vy*dt;
  s.tr-=dt;
  if(s.tr<=0){s.tr=s.k==='ball'?.018:.03;if(G.combo>=25&&s.k!=='bolt'){var c=RAIN[(Math.floor(G.t*30)+i)%RAIN.length];glow(s.x,s.y,s.k==='ball'?44:30,c,.45,0,0,-40);}else if(s.k==='ball'){glow(s.x,s.y,34,'o',.28,0,0,-60);puff(s.x,s.y+8,1,14,'m',10);}else if(s.k==='magic')glow(s.x,s.y,24,s.crit?'y':'k',.3,rr(-20,20),rr(0,30),-40);else glow(s.x,s.y,14,'y',.14,0,0,-30);}
  if(s.life<=0||s.y<-60||s.x<-40||s.x>580){sh[i]=sh[sh.length-1];sh.pop();continue;}
  var hit=null;for(var j=0;j<G.tg.length;j++){var t=G.tg[j];if(t.dead||t.k==='boss')continue;var bx=t.hw+s.r*.6;if(Math.abs(s.x-t.x)<bx&&s.y>t.y+t.top-s.r*.5&&s.y<t.y+t.bot+s.r*.5){hit=t;break;}}
  var b=G.bossObj;if(!hit&&b&&b.in&&!b.dead&&Math.abs(s.x-b.x)<b.hw&&s.y>b.y-b.hh&&s.y<b.y+b.hh)hit=b;
  if(hit){hitBy(s,hit);sh[i]=sh[sh.length-1];sh.pop();}}}
function hitBy(s,t){var dmg=s.dmg;
 if(s.k==='ball'){boom(s.x,s.y,40,{c:'o',nodeb:1});aoe(s.x,s.y,52,dmg*.35,t,1);sfx('hit',.5,.9+rr(0,.2),.03);hitStopSet(.025);shake(.1);}
 else if(s.k==='bolt'){sparks(s.x,s.y,4,'#fff3b0',220,.25);glow(s.x,s.y,28,'y',.1,0,0,0);sfx('hit',.25,1.2+rr(0,.4),.03);}
 else{sparks(s.x,s.y,9,s.crit?'#ffe27a':'#ff9ae0',280,.4);glow(s.x,s.y,s.crit?90:48,s.crit?'y':'k',.2,0,0,s.crit?120:40);ring(s.x,s.y,6,s.crit?60:30,s.crit?'#ffe27a':'#ff7ac8',.3,3);sfx(s.crit?'crit':'hit',.4,1+rr(0,.3),.03);if(s.crit){hitStopSet(.04);shake(.12);if(rnd()<.25)talk('pnk_crit');}}
 damage(t,dmg,{crit:s.crit,big:s.k==='ball',x:s.x,y:s.y});}
function hitStopSet(t){if(G.hs<t)G.hs=t;}
function aoe(x,y,r,dmg,skip,nocombo){for(var i=0;i<G.tg.length;i++){var t=G.tg[i];if(t.dead||t===skip||t.k==='boss')continue;var dx=t.x-x,dy=mid(t)-y;if(dx*dx+dy*dy<(r+t.hw)*(r+t.hw))damage(t,dmg,{noc:nocombo,small:1});}}
/* ---------- damage / kill ---------- */
function damage(t,dmg,o){o=o||{};if(t.dead)return;
 if(t.k==='boss'){bossDamage(t,dmg,o);return;}
 if(t.invuln)return;
 t.hp-=dmg;t.flash=.12;t.sq=.3;if(t.frz>0)t.frz-=.15;
 var dispv=Math.max(1,Math.round(dmg));var fy=t.y+t.top-4;
 if(!o.small||dmg>=3)fl(t.x,fy,dispv,o.crit?'#ffe27a':G.feverOn>0?'#ffc933':'#fff',o.crit?44:o.big?32:dmg>=8?34:24,o.crit||dmg>=20);
 if(!o.noc)hitCombo(1);
 G.fever=Math.min(100,G.fever+.12);chargeSk(.16+Math.min(.14,G.combo*.002));
 if(t.hp<=0)kill(t);else{if(t.k!=='bar'&&t.k!=='crt')sfx('ehit',.3,1,.05);}}
function hitCombo(n){G.combo+=n;G.ct=G.feverOn>0?3.4:2.1;if(G.combo>G.maxCombo)G.maxCombo=G.combo;var tiers=[5,10,20,35,50,75,100],ti=0;while(ti<tiers.length&&G.combo>=tiers[ti])ti++;
 if(ti>G.tier){G.tier=ti;comboTier(ti,tiers[ti-1]);}
 var m=1+Math.floor(G.combo/15)*.25;G.mult=Math.min(3,m);sfx('tick',.18,1+Math.min(1,G.combo/60),.05);comboBump=1;}
var comboBump=0;
function comboTier(ti,n){var labs=['','เริ่มแล้ว!','เยี่ยม!','สุดยอด!','อลังการ!','บ้าไปแล้ว!','ตำนาน!','ทะลุฟ้า!'];
 G.big={t:1.2,tx:labs[ti]||'สุดยอด!',c:ti};sfx('combo',.55,Math.pow(1.0595,Math.min(14,ti*2)),0);zoomPunch(.03+ti*.006);shake(.08+ti*.03);whiteflash(.08+ti*.02,'255,230,150');
 var cs=[0,'#ffd966','#ffb040','#ff7a3a','#ff4a8a','#c05bff','#4ac0ff','#fff'];var sx=G.ship.x;for(var k=0;k<ti*3;k++)glow(sx+rr(-120,120),G.ship.y-rr(120,260),rr(40,90),RAIN[ri(0,7)],.5,rr(-40,40),rr(-200,-80),-40);
 if(n===5)talk('combo5');else if(n===10)talk('combo10');else if(n===20)talk('combo20');else if(n>=35)talk(pick(['cap_combo','mec_combo','pnk_combo']));}
function chargeSk(a){for(var i=0;i<3;i++)if(G.skc[i]<100){G.skc[i]=Math.min(100,G.skc[i]+a);}}
function addCoins(n){G.coins+=Math.round(n);
}
function dropItem(x,y,type,vx){G.it.push({k:type,x:x,y:y,vx:vx==null?rr(-70,70):vx,vy:rr(-220,-120),ph:rnd()*6,age:0});}
function rollDrops(t,rich){var r=rnd(),x=t.x,y=t.y;var lvlf=G.L;
 var nc=Math.max(2,Math.round(Math.min(10,t.max*.35)));for(var i=0;i<Math.min(3,nc);i++)dropItem(x,y,'i_coin');
 var chance=rich?1:.32;if(rnd()<chance){var w=rnd();var it=w<.26?'i_cannon':w<.5?'i_crew':w<.7?'i_star':w<.88?'i_gem':'i_heart';if(it==='i_heart'&&G.ship.hp>=G.ship.hpmax&&rnd()<.6)it='i_gem';if(it==='i_crew'&&G.crew>=8)it='i_gem';if(it==='i_cannon'&&G.pw>=6)it='i_star';dropItem(x,y,it);}}
function kill(t){if(t.dead)return;if(!t.k){console.error('KILLNOK '+JSON.stringify(t));t.dead=1;return;}t.dead=1;G.kills++;var x=t.x,y=mid(t);var q=G.q;
 G.fever=Math.min(100,G.fever+(t.k==='bar'?4:3)+Math.min(3,G.combo/20));chargeSk(4);chainNote(x,y);
 if(t.k==='bar'||t.k==='crt'){
  sfx('burst',.8,rr(.9,1.1),.03);balloonPop(t);var big=t.max>=30;
  var type=t.type;
  if(type==='red'){redBoom(x,y);}else if(type==='elec'){elecArc(x,y,t);}else if(type==='ice'){iceBurst(x,y);}else if(type==='bomb'){bombBoom(x,y);}
  else if(type==='gold'||type==='k_gold'){boom(x,y,90,{c:'gd',sp:'#ffe27a',deb:['#ffc933','#fff2a0','#e0a020']});coinfx(x,y,26,520);sfx('gold',.7);talk('gold');shake(.2);rollDrops(t,1);dropItem(x,y,'i_coin');dropItem(x,y,'i_coin');addCoins(t.max*.3);whiteflash(.15,'255,230,120');}
  else{boom(x,y,big?96:72,{c:'o'});if(type==='k_gift'){rollDrops(t,1);rollDrops(t,1);confetti(x,y,22,360);sfx('pickup',.6);}else if(type==='k_steel'){rollDrops(t,1);sparks(x,y,20,'#cfe6ff',420,.5);dropItem(x,y,'i_crew');}else if(type==='k_heal'){dropItem(x,y,'i_heart');rollDrops(t,0);}else if(type==='k_star'){dropItem(x,y,'i_gem');dropItem(x,y,'i_star');}else rollDrops(t,0);shake(big?.3:.14);}
  if(type!=='gold'&&type!=='k_gold')addCoins(t.max*.009*G.mult);
  coinfx(x,y,Math.min(10,3+Math.round(t.max/8)),380);
  fl(x,t.y+t.top-34,'+'+Math.round(t.max*.009*G.mult),'#ffd23a',26,0);
  zoomPunch(.012);}
 else{ // enemies
  var sz=t.k==='gull'?40:t.k==='bat'?48:t.k==='tb'?60:96;if(t.k==='gull'){feather(x,y,10,'#fff');sfx('squawk',.5,1+rr(0,.3),.05);}else if(t.k==='bat'){feather(x,y,8,'#7a3aa0');}
  if(t.k==='tb'){boom(x,y,50,{c:'gd',nodeb:1});coinfx(x,y,12,480);addCoins(t.coins*G.mult*.5);sfx('coin',.7,1+rr(0,.5),.03);for(var i=0;i<3;i++)dropItem(x,y,'i_coin');balloonPop(t);}
  else{boom(x,y,sz,{c:'o'});sfx('burst',.8,.9,.05);addCoins((t.max||4)*.15);coinfx(x,y,t.k==='gull'||t.k==='bat'?3:10,420);rollDrops({x:x,y:y,max:t.max},t.k!=='gull'&&t.k!=='bat');if(t.k.length>4||t.k==='gun'){shake(.35);hitStopSet(.05);}}
  if(t.k==='bomber'||t.k==='scout'||t.k==='gun'){puff(x,y,8,60,'d',160);}
 }}
function chainNote(x,y){G.chainT=.7;G.chain++;if(G.chain>=5&&G.slow<=0){G.slow=.7;G.big={t:1.1,tx:'ลูกโซ่ x'+G.chain,c:5};zoomPunch(.06);say('bomb');}}
function balloonPop(t){var col=['#e8d8b0','#e84a3a','#3a78e0','#38b04a','#8a4ac8'][BALLOONS.indexOf(t.bl)]||'#fff';for(var i=0;i<10;i++){pt({t:5,x:t.x+rr(-30,30),y:t.y+t.top+30+rr(-30,20),vx:rr(-140,140),vy:rr(-160,40),g:250,r:rnd()*6,vr:rr(-8,8),w:rr(8,15),h:rr(6,12),life:rr(.7,1.3),max:1,c:col,ph:rnd()*6});}ring(t.x,t.y+t.top+30,10,70,'#fff',.25,3);}
function delay(t,fn){G.dl.push({t:t,fn:fn});}
function redBoom(x,y){boom(x,y,125,{c:'r',ring:'#ff7a4a',sp:'#ffb070'});shake(.5);hitStopSet(.07);sfx('chain',.9);zoomPunch(.04);flashRing(x,y,150,'#ff5a3a');
 var vict=G.tg.filter(function(t){return !t.dead&&t.k!=='boss'&&(t.x-x)*(t.x-x)+(mid(t)-y)*(mid(t)-y)<(150+t.hw)*(150+t.hw);});vict.forEach(function(t,i){delay(.08+i*.06,function(){if(!t.dead){damage(t,Math.max(10,t.max*.6+10),{small:1});boom(t.x,mid(t),40,{c:'r',nodeb:1});}});});
 bossSplash(x,y,150,40+G.L*8);}
function flashRing(x,y,r,c){ring(x,y,10,r,c,.45,8);ring(x,y,10,r*.7,'#fff',.3,4);}
function elecArc(x,y,src){sfx('zap',.8);boom(x,y,70,{c:'b',ring:'#8fd8ff',sp:'#bff0ff'});var vict=G.tg.filter(function(t){return !t.dead&&t!==src&&t.k!=='boss';}).sort(function(a,b){return (a.x-x)*(a.x-x)+(mid(a)-y)*(mid(a)-y)-((b.x-x)*(b.x-x)+(mid(b)-y)*(mid(b)-y));}).slice(0,4);
 var px=x,py=y;vict.forEach(function(t,i){var sx=px,sy=py,tx=t.x,ty=mid(t);delay(.05+i*.07,function(){bolt(sx,sy,tx,ty,6,'#9fe0ff',.28,22);glow(tx,ty,90,'b',.2,0,0,60);sfx('zap',.4,1+i*.1,.02);if(!t.dead)damage(t,14+G.L*4,{small:1});});px=tx;py=ty;});
 var b=G.bossObj;if(b&&b.in&&!b.dead){bolt(x,y,b.x,b.y,7,'#9fe0ff',.3,26);bossDamage(b,18+G.L*3,{});}shake(.25);}
function iceBurst(x,y){sfx('freeze',.8);talk('ice');ring(x,y,10,200,'#bff0ff',.55,10);glow(x,y,260,'c',.4,0,0,100);sparks(x,y,26,'#d8f6ff',420,.6);boom(x,y,50,{c:'c',nodeb:1});
 G.tg.forEach(function(t){if(!t.dead&&t.k!=='boss'&&(t.x-x)*(t.x-x)+(mid(t)-y)*(mid(t)-y)<(200+t.hw)*(200+t.hw)){t.frz=3.2;sparks(t.x,mid(t),6,'#bff0ff',160,.5);}});
 G.eb=G.eb.filter(function(b){return !((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y)<200*200);});}
function bombBoom(x,y){boom(x,y,170,{c:'o',ring:'#ffb040'});ring(x,y,10,260,'#fff',.5,10);shake(.9);hitStopSet(.1);whiteflash(.4,'255,200,120');sfx('bomb',1);zoomPunch(.08);talk('bomb');
 G.tg.forEach(function(t,i){if(!t.dead&&t.k!=='boss'&&(t.x-x)*(t.x-x)+(mid(t)-y)*(mid(t)-y)<(250+t.hw)*(250+t.hw)){delay(.05+(i%6)*.05,function(){if(!t.dead){damage(t,30+G.L*10,{small:1});}});}});
 G.eb=G.eb.filter(function(b){return !((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y)<260*260);});bossSplash(x,y,250,60+G.L*12);}
function bossSplash(x,y,r,d){var b=G.bossObj;if(b&&b.in&&!b.dead){var dx=b.x-x,dy=b.y-y;if(dx*dx+dy*dy<(r+b.hw)*(r+b.hw))bossDamage(b,d,{});}}
/* ---------- enemy bullets / hurt ---------- */
function ebul(x,y,tx,ty,sp,kind,ang0){var a=Math.atan2(tx-x,ty-y);if(ang0!=null)a=ang0;G.eb.push({x:x,y:y,vx:Math.sin(a)*sp,vy:Math.cos(a)*sp,k:kind||0,r:kind===1?16:11,age:0});}
function hurt(d,x,y){var s=G.ship;if(s.inv>0||G.over)return;s.hp-=d;s.inv=1.4;G.hurts++;G.combo=Math.floor(G.combo*.35);G.tier=0;G.hurtT=.9;G.emo={k:'scared',t:1.6};
 shake(.8);vig('255,40,30',.85);sfx('hurt',.9);sparks(x==null?s.x:x,y==null?s.y-100:y,24,'#ffb070',420,.5);hitStopSet(.07);zoomPunch(.05);hudHearts();
 if(s.hp<=0){loseRun();return;}
 if(s.hp<=2&&!G.lowSaid){G.lowSaid=1;talk('low',1);}else talk(rnd()<.5?'hurt1':'hurt2',1);fl(s.x,s.y-250,'-'+d,'#ff5a4a',40,1);}
/* ---------- items ---------- */
function stepItems(dt){var s=G.ship,mx=s.x,my=s.y-130;for(var i=G.it.length-1;i>=0;i--){var it=G.it[i];it.age+=dt;it.x+=it.vx*dt;it.y+=it.vy*dt;it.vx*=.985;
  if(it.vy<80)it.vy+=520*dt;else it.vy=Math.min(it.vy+200*dt,96);if(it.vy>96&&it.age>1)it.vy=96;
  var dx=mx-it.x,dy=my-it.y,d=Math.sqrt(dx*dx+dy*dy);if(it.age>.4&&d<230){var a=900*dt*(1-d/260+.5);it.vx+=dx/d*a*3;it.vy+=dy/d*a*3;it.x+=dx/d*260*dt;it.y+=dy/d*260*dt;}
  if(it.age%.12<dt&&rnd()<.7)glow(it.x,it.y,18,it.k==='i_coin'?'gd':'w',.3,0,0,-30);
  if(d<62&&it.age>.2){pickup(it);G.it.splice(i,1);continue;}
  if(it.y>LH+60||it.age>20)G.it.splice(i,1);}}
var coinStreak=0,coinT=0;
function pickup(it){var s=G.ship;var k=it.k;glow(it.x,it.y,80,'w',.25,0,0,60);ring(it.x,it.y,6,48,'#ffe27a',.3,3);
 if(k==='i_coin'){addCoins(Math.max(1,G.mult*.8));coinStreak=coinT>0?coinStreak+1:0;coinT=.4;sfx('coin',.5,Math.pow(1.06,Math.min(10,coinStreak)),.02);sparks(it.x,it.y,4,'#ffe27a',160,.3);}
 else if(k==='i_gem'){for(var i=0;i<3;i++)G.skc[i]=Math.min(100,G.skc[i]+36);sfx('power',.7);pk('ชาร์จสกิล!','#7ae0ff');sparks(it.x,it.y,14,'#9fe0ff',300,.5);}
 else if(k==='i_heart'){if(s.hp<s.hpmax){s.hp++;hudHearts();}sfx('heal',.8);pk('ซ่อมเรือ +1','#6dff8a');talk('mec_fix');sparks(it.x,it.y,14,'#9dffa8',300,.5);}
 else if(k==='i_crew'){if(G.crew<8){G.crew++;G.emo={k:'happy',t:1.4};}sfx('crew',.8);pk('ลูกเรือเพิ่ม!','#ffd23a');talk('crew');confetti(s.x,s.y-200,12,260);}
 else if(k==='i_cannon'){if(G.pw<6)G.pw++;sfx('power',.8,1.2);pk('ปืนแรงขึ้น!','#ff9a4a');sparks(it.x,it.y,14,'#ffb070',300,.5);}
 else if(k==='i_star'){if(G.rf<6)G.rf++;G.fever=Math.min(100,G.fever+14);sfx('power',.8,1.4);pk('ยิงรัวขึ้น!','#ffe27a');sparks(it.x,it.y,14,'#fff0a0',300,.5);}
 hudCoins();}
/* ---------- skills ---------- */
function useSkill(i){if(!G||G.over||G.paused||G.cine>0||G.skc[i]<100)return;G.skc[i]=0;G.skfx=i;G.emo={k:'fierce',t:1.2};
 var s=G.ship,b=G.bossObj;
 if(i===0){sfx('storm',1);sfx('thunder',.9);talk('storm',1);whiteflash(.9,'210,230,255');shake(.9);zoomPunch(.07);vig('150,200,255',.5);
  var list=G.tg.filter(function(t){return !t.dead&&t.k!=='boss'&&t.y>-100;}).sort(function(a,b){return b.y-a.y;});
  list.slice(0,16).forEach(function(t,k){delay(.07*k,function(){var tx=t.x,ty=mid(t);bolt(tx+rr(-40,40),-20,tx,ty,9,'#bfe6ff',.35,34,46);glow(tx,ty,140,'b',.3,0,0,100);sparks(tx,ty,10,'#e0f4ff',360,.4);sfx('zap',.5,1+rr(-.1,.2),.02);if(!t.dead)damage(t,60+G.L*14,{small:1});shake(.2);});});
  if(b&&b.in&&!b.dead){for(var k=0;k<4;k++)(function(k){delay(.15+k*.2,function(){var bx=b.x+rr(-90,90),by=b.y+rr(-80,100);bolt(bx+rr(-30,30),-20,bx,by,10,'#bfe6ff',.4,34,46);glow(bx,by,200,'b',.35,0,0,120);sfx('zap',.6,1,.02);bossDamage(b,70+G.L*8,{x:bx,y:by});shake(.3);});})(k);}
  for(k=0;k<5;k++)(function(k){delay(.1+k*.14,function(){var x=rr(30,510);bolt(x,-20,x+rr(-40,40),rr(300,LH-200),6,'#9fe0ff',.28,30,50);});})(k);
  G.eb.forEach(function(e){sparks(e.x,e.y,6,'#bfe6ff',200,.4);});G.eb.length=0;}
 else if(i===1){sfx('hole',1);talk('hole',1);G.hole={x:clamp(s.x,120,420),y:Math.max(260,s.y-520),t:0,dur:2.9};shake(.3);vig('160,60,255',.5);whiteflash(.15,'160,80,255');}
 else{sfx('parrot',1);sfx('squawk',.8);talk('parrot',1);for(var p=0;p<8;p++){G.pars.push({x:s.x+rr(-40,40),y:s.y-190,vx:rr(-240,240),vy:rr(-420,-160),life:6.2,cd:0,ph:rnd()*6,tg:null,a:0});}glow(s.x,s.y-190,160,'y',.3,0,0,200);whiteflash(.2,'255,230,150');}
 updSkillUI();}
function stepSkills(dt){
 for(var i=0;i<3;i++){var cd=SKD[i].cd*Math.pow(.92,upv('sk'));var was=G.skc[i];if(G.skc[i]<100){G.skc[i]=Math.min(100,G.skc[i]+dt*100/cd);if(was<100&&G.skc[i]>=100){sfx('ready',.6,1+i*.12);G.skready[i]=1;}}}
 var h=G.hole;if(h){h.t+=dt;var f=Math.min(1,h.t/.4);
  G.tg.forEach(function(t){if(t.dead||t.k==='boss')return;var dx=h.x-t.x,dy=h.y-mid(t),d=Math.sqrt(dx*dx+dy*dy)+1;var pull=(900/(1+d/240))*dt*f;t.x+=dx/d*pull*1.2;t.y+=dy/d*pull;t.frz=0;t.vx=(t.vx||0)*.9;if(t.bx!==undefined)t.bx=t.x;if(t.k==='bar'||t.k==='crt'){t.age+=dt*2;}if(t.k==='gull'||t.k==='tb'){t.y+=dy/d*pull;}});
  G.it.forEach(function(it){var dx=h.x-it.x,dy=h.y-it.y,d=Math.sqrt(dx*dx+dy*dy)+1;it.x+=dx/d*300*dt;it.y+=dy/d*300*dt;});
  G.eb=G.eb.filter(function(e){var dx=h.x-e.x,dy=h.y-e.y,d=Math.sqrt(dx*dx+dy*dy);if(d<60){sparks(e.x,e.y,5,'#c08aff',200,.3);return false;}e.x+=dx/d*260*dt;e.y+=dy/d*260*dt;return true;});
  if(rnd()<.8){var a=rnd()*6.28,r=rr(120,260);pt({t:0,x:h.x+Math.cos(a)*r,y:h.y+Math.sin(a)*r,s:20,ds:-20,c:'p',life:.35,max:.35,vx:-Math.cos(a)*r*2.6,vy:-Math.sin(a)*r*2.6,g:0});}
  if(G.t%.05<dt)G.tg.forEach(function(t){if(!t.dead&&t.k!=='boss'&&Math.abs(t.x-h.x)<50&&Math.abs(mid(t)-h.y)<50)damage(t,10+G.L*2,{small:1,noc:1});});
  var b=G.bossObj;if(b&&b.in&&!b.dead&&Math.abs(b.x-h.x)<300&&G.t%.35<dt)bossDamage(b,10+G.L*2,{x:b.x,y:b.y});
  if(h.t>=h.dur){var hx=h.x,hy=h.y;G.hole=null;boom(hx,hy,190,{c:'p',ring:'#c08aff',sp:'#e0c0ff'});ring(hx,hy,10,320,'#fff',.6,10);flashRing(hx,hy,330,'#9a4aff');shake(1);hitStopSet(.12);whiteflash(.5,'200,150,255');sfx('bomb',1);sfx('burst',.8);zoomPunch(.09);G.slow=.7;
   G.tg.forEach(function(t,j){if(!t.dead&&t.k!=='boss'&&(t.x-hx)*(t.x-hx)+(mid(t)-hy)*(mid(t)-hy)<(320+t.hw)*(320+t.hw))damage(t,90+G.L*16,{small:1});});if(b&&b.in&&!b.dead&&Math.abs(b.x-hx)<340)bossDamage(b,160+G.L*16,{x:hx,y:hy});}}
 for(i=G.pars.length-1;i>=0;i--){var p=G.pars[i];p.life-=dt;p.cd-=dt;p.ph+=dt*14;if(p.life<=0){G.pars.splice(i,1);feather(p.x,p.y,6,'#e84a3a');continue;}
  if(!p.tg||p.tg.dead||(p.tg.k!=='boss'&&!G.tg.includes(p.tg))){p.tg=null;var bd=1e9;G.tg.forEach(function(t){if(t.dead||t.y<-80)return;var d=(t.x-p.x)*(t.x-p.x)+(mid(t)-p.y)*(mid(t)-p.y)+rnd()*40000;if(d<bd){bd=d;p.tg=t;}});if(!p.tg&&G.bossObj&&G.bossObj.in&&!G.bossObj.dead)p.tg=G.bossObj;}
  var tx,ty;if(p.tg){tx=p.tg.x;ty=p.tg.k==='boss'?p.tg.y:mid(p.tg);}else{tx=G.ship.x+Math.cos(p.ph*.2+i)*120;ty=G.ship.y-300+Math.sin(p.ph*.25+i)*50;}
  var dx=tx-p.x,dy=ty-p.y,d=Math.sqrt(dx*dx+dy*dy)+1,sp=Math.hypot(p.vx,p.vy),want=520;var ax=dx/d*want,ay=dy/d*want;p.vx+=(ax-p.vx)*Math.min(1,dt*5);p.vy+=(ay-p.vy)*Math.min(1,dt*5);p.x+=p.vx*dt;p.y+=p.vy*dt;
  if(rnd()<.6)glow(p.x,p.y,22,'o',.35,0,0,-30);if(rnd()<.2)feather(p.x,p.y,1,'#ff5a4a');
  if(p.tg&&d<(p.tg.k==='boss'?p.tg.hw*.8:(p.tg.hw||30))&&p.cd<=0){p.cd=.28;sparks(p.x,p.y,6,'#ffd0a0',260,.3);sfx('hit',.3,1.4,.04);var dm=14+G.L*3;if(p.tg.k==='boss')bossDamage(p.tg,3+G.L*.7,{x:p.x,y:p.y});else damage(p.tg,dm,{small:1});p.vx=-p.vx*.5+rr(-200,200);p.vy=-p.vy*.5-120;}}
 }
/* ---------- fever / combo ---------- */
function stepCombo(dt){if(G.combo>0){G.ct-=dt;if(G.ct<=0){G.combo=0;G.tier=0;G.mult=1;}}
 if(coinT>0)coinT-=dt;if(comboBump>0)comboBump-=dt*5;if(G.chainT>0){G.chainT-=dt;if(G.chainT<=0)G.chain=0;}
 if(G.feverOn>0){G.feverOn-=dt;G.fever=Math.max(0,G.feverOn/10*100);if(rnd()<.8)glow(rr(0,540),LH+10,rr(30,70),'gd',.9,rr(-20,20),rr(-380,-200),-20);if(G.feverOn<=0){G.feverOn=0;G.fever=0;music2(G.boss?.7:0);hudFever();}}
 else if(G.fever>=100){startFever();}}
function startFever(){G.feverOn=10;G.fever=100;sfx('fever',.9);talk('fever',1);banner(TX.fever,'ยิงเร็วx2 · ทองคำ!');music2(1);whiteflash(.5,'255,200,80');shake(.6);zoomPunch(.08);G.emo={k:'fierce',t:2};ring(G.ship.x,G.ship.y-150,20,420,'#ffd966',.7,12);G.slow=.4;}
/* ---------- targets update ---------- */
function stepTargets(dt){var s=G.ship,wv=G.wind.t>0?G.wind.dir*(G.wind.t>G.wind.dur-.8?(G.wind.dur-G.wind.t)/.8:Math.min(1,G.wind.t/.8)):0;
 for(var i=G.tg.length-1;i>=0;i--){var t=G.tg[i];if(t.dead){G.tg.splice(i,1);continue;}
  t.age+=dt;t.flash=Math.max(0,t.flash-dt);t.sq=Math.max(0,t.sq-dt*2.5);var f=t.frz>0;if(f){t.frz-=dt;if(rnd()<.1)sparks(t.x+rr(-30,30),t.y+rr(-100,40),1,'#d8f6ff',60,.4);}
  var k=t.k;
  if(k==='bar'||k==='crt'){if(!f){t.y+=t.vy*dt;t.x+=Math.cos(t.age*1.5+t.ph)*t.sway*dt*1.5+wv*60*dt;}
   if(t.y+t.bot>s.y-120&&Math.abs(t.x-s.x)<120&&t.y>s.y-300){t.dead=1;var tp=t.type;boom(t.x,t.y,tp==='bomb'?150:70,{c:'r'});sfx(tp==='bomb'?'bomb':'hurt',.7);balloonPop(t);if(tp==='bomb'){bombBoom(t.x,t.y);hurt(2);}else hurt(1,t.x,t.y);continue;}
   if(t.y>LH+250){t.dead=1;}}
  else if(k==='gull'){t.x+=t.vx*dt;t.y+=Math.sin(t.age*3+t.wob)*30*dt;if((t.dir>0&&t.x>620)||(t.dir<0&&t.x<-80))t.dead=1;}
  else if(k==='tb'){if(!f){t.x+=t.vx*dt;t.y+=t.vy*dt;}t.yo=Math.sin(t.age*2+t.ph0)*22;if(t.x>640||t.x<-100||t.y>LH)t.dead=1;}
  else if(k==='bat'||k==='scout'||k==='gun'||k==='bomber'){
   var ty=t.ty||(k==='bat'?200+(t.bx%90):200);
   if(!f){if(t.age<t.stay){t.y+=(ty-t.y)*Math.min(1,dt*1.6)+Math.sin(t.age*2.3+t.wob)*14*dt;t.x=clamp(t.bx+Math.sin(t.age*(k==='bat'?1.6:.9)+t.wob)*(k==='bat'?80:100),50,490);
    t.sh-=dt;if(t.sh<=0){shootEnemy(t);}}else{t.y-=120*dt;if(t.y<-140)t.dead=1;}}}
 }}
function shootEnemy(t){var s=G.ship,k=t.k,x=t.x,y=t.y+30,sx=s.x,sy=s.y-110;glow(x,y,70,'o',.2,0,0,0);sfx('eshot',.5,1,.05);
 if(k==='bat'){t.sh=rr(2.2,3);ebul(x,y,sx,sy,230,0);}
 else if(k==='scout'){t.sh=rr(2.0,2.8);ebul(x,y,sx,sy,260,0);}
 else if(k==='gun'){t.sh=rr(2.6,3.2);var a=Math.atan2(sx-x,sy-y);for(var i=-1;i<=1;i++)ebul(x,y,0,0,250,0,a+i*.22);}
 else{t.sh=rr(1.6,2.2);G.eb.push({x:x,y:y,vx:rr(-20,20),vy:150,k:1,r:16,age:0});}}
function stepBullets(dt){var s=G.ship;for(var i=G.eb.length-1;i>=0;i--){var e=G.eb[i];if(!e)continue;e.age+=dt;if(e.k===3){e.warn-=dt;if(e.warn>0)continue;if(!e.struck){e.struck=1;bolt(e.x,-20,e.x,s.y+30,12,'#fff3a0',.4,16,40);boom(e.x,s.y,60,{c:'y',nodeb:1});whiteflash(.18,'255,255,220');shake(.5);sfx('thunder',.8,1,.1);if(Math.abs(e.x-s.x)<46)hurt(1,e.x,s.y-100);}else{e.life-=dt;if(e.life<=0)G.eb.splice(i,1);}continue;}
  if(e.k===4){e.warn-=dt;if(e.warn>0)continue;if(!e.struck){e.struck=1;e.life=.4;shake(.6);sfx('thunder',.9,.7,.1);boom(e.x,LH-120,90,{c:'p',nodeb:1});}e.life-=dt;if(Math.abs(e.x-s.x)<60)hurt(1,e.x,s.y-100);if(e.life<=0)G.eb.splice(i,1);continue;}
  e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.k===1){e.vy+=60*dt;}
  if(rnd()<.5)glow(e.x,e.y,e.k===1?26:20,e.k===2?'p':e.k===1?'r':'o',.3,0,0,-30);
  var hitS=Math.abs(e.x-s.x)<(e.k===1?130:118)&&e.y>s.y-150&&e.y<s.y+30;
  if(hitS){G.eb.splice(i,1);if(e.k===1){boom(e.x,e.y,110,{c:'o'});sfx('bomb',.6);hurt(1,e.x,e.y);}else{sparks(e.x,e.y,10,'#ffd0a0',300,.4);hurt(1,e.x,e.y);}continue;}
  if(e.k===1&&e.y>LH-130){boom(e.x,e.y,70,{c:'o'});sfx('bomb',.35,1.3,.1);G.eb.splice(i,1);continue;}
  if(e.y>LH+40||e.y<-80||e.x<-60||e.x>600)G.eb.splice(i,1);}}
/* ---------- director ---------- */
function stepDirector(dt){var lv=G.lv;if(G.phase==='run'||G.phase==='boss'){
  G.spawnT-=dt;if(G.spawnT<=0&&(G.phase==='run'||G.tg.filter(function(t){return t.k==='bar'||t.k==='crt';}).length<3)){var pr=clamp(G.t/lv.dur,0,1);G.spawnT=lerp(lv.int[0],lv.int[1],pr)*.68*rr(.85,1.15)*(G.phase==='boss'?3:1);spawnGroup();}}
 if(G.phase!=='run')return;
 G.gullT-=dt;if(lv.gull&&G.gullT<=0){G.gullT=lv.gull*rr(.8,1.3);spawnGulls();}
 G.batT-=dt;if(lv.bat&&G.t>lv.bat&&G.batT<=0){G.batT=rr(8,13);spawnBat();}
 G.scoutT-=dt;if(lv.scout&&G.t>lv.scout&&G.scoutT<=0){G.scoutT=rr(14,20);spawnShip('scout');}
 G.gunT-=dt;if(lv.gun&&G.t>lv.gun&&G.gunT<=0){G.gunT=rr(18,26);spawnShip('gun');}
 G.bomberT-=dt;if(lv.bomber&&G.t>lv.bomber&&G.bomberT<=0){G.bomberT=rr(18,24);spawnShip('bomber');}
 while(G.evi<lv.evt.length&&G.t>=lv.evt[G.evi].t){var e=lv.evt[G.evi++];
  if(e.k==='wind'){G.wind={t:e.d,dur:e.d,dir:rnd()<.5?-1:1};banner(TX.wind);sfx('wind',.9);}
  else if(e.k==='storm'){G.storm=e.d;G.stormT=e.d;banner(TX.storm);talk('storm_in',1);sfx('thunder',.7,.8);}
  else if(e.k==='treasure')spawnTreasure();}
 if(G.t>=lv.dur&&!lv.boss){levelWin();}
 else if(G.t>=lv.dur&&lv.boss&&!G.bossIn){G.bossIn=true;startBoss(lv.boss);}}
function stepStorm(dt){if(G.stormT>0){G.stormT-=dt;G.stormV=Math.min(1,G.stormV+dt*.7);G.strikeT-=dt;if(G.strikeT<=0){G.strikeT=rr(2.2,3.2);var x=rnd()<.65?clamp(G.ship.x+rr(-120,120),40,500):rr(40,500);G.eb.push({x:x,y:0,vx:0,vy:0,k:3,warn:.95,life:.35,r:20,age:0});sfx('warn',.4,1.4,.3);}}
 else if(G.bossObj&&G.bossObj.stormy){G.stormV=Math.min(1,G.stormV+dt*.5);}else G.stormV=Math.max(0,G.stormV-dt*.5);
 if(G.stormV>0.05&&G.t%.03<dt&&P.length<MAXP*.8){pt({t:7,x:rr(-40,600),y:-20,vx:-90,vy:rr(900,1200),life:.9,max:.9,len:rr(18,32)});if(G.q>.7)pt({t:7,x:rr(-40,600),y:-20,vx:-90,vy:rr(900,1200),life:.9,max:.9,len:rr(18,32)});}
 if(G.stormV>.4&&rnd()<dt*.5){whiteflash(.25*G.stormV,'220,230,255');bolt(rr(40,500),-20,rr(40,500),rr(300,700),5,'#e8f4ff',.25,40,50);sfx('thunder',.35,1,.5);}
 if(G.wind.t>0){G.wind.t-=dt;G.ship.x+=G.wind.dir*(G.wind.t>.8?95:95*G.wind.t/.8)*dt;if(rnd()<.7)pt({t:7,x:G.wind.dir>0?-30:570,y:rr(0,LH),vx:G.wind.dir*rr(1100,1600),vy:rr(-20,20),life:.5,max:.5,len:rr(60,120),wind:1});}}
/* ---------- progress / end ---------- */
function levelWin(){if(G.over)return;G.over='win';G.endT=0;say('win',true);sfx('win',.9);
 G.tg.forEach(function(t,i){if(t.dead)return;delay(.05+i*.07,function(){if(!t.dead){boom(t.x,mid(t),60,{c:'gd',nodeb:1});coinfx(t.x,mid(t),5,380);addCoins(3);t.dead=1;sfx('burst',.4,1+i*.02,.03);}});});
 G.eb.length=0;confetti(270,LH*.45,60,700);confetti(100,LH*.6,30,600);confetti(440,LH*.6,30,600);G.slow=.8;G.emo={k:'happy',t:5};}
function loseRun(){if(G.over)return;G.over='lose';G.endT=0;var s=G.ship;boom(s.x,s.y-100,150,{c:'o'});boom(s.x-70,s.y-60,90,{c:'r'});shake(1);G.slow=1.4;sfx('lose',.9);sfx('bomb',1);G.emo={k:'scared',t:5};say('lose',true);G.eb.length=0;
 for(var i=0;i<6;i++)delay(.15*i,function(){boom(s.x+rr(-120,120),s.y+rr(-160,0),rr(50,90),{c:'o'});});}
/* ---------- bosses ---------- */
function startBoss(id){G.phase='boss';G.cine=3.0;var hp=id===1?11000:24000;
 var b={k:'boss',id:id,hp:hp,max:hp,x:270,y:id===1?-340:-400,ty:id===1?345:315,hw:id===1?135:165,hh:id===1?195:190,ph:1,age:0,flash:0,weak:0,weakT:7,in:false,dead:0,inv:0,t1:2.2,t2:3.4,t3:5.5,t4:9,spin:0,stormy:id===2,recoil:[0,0,0],name:TX.bn[id-1]};
 if(id===2){b.tn=[{bx:70,x:70,cx:70,st:0,t:0,k:'tent1'},{bx:470,x:470,cx:470,st:0,t:0,k:'tent3'},{bx:170,x:170,cx:170,st:0,t:0,k:'tent2',off:1},{bx:370,x:370,cx:370,st:0,t:0,k:'tent1',off:1}];}
 G.bossObj=b;sfx('roar',1);say(id===1?'boss1':'boss2',true);talk(id===1?'boss1':'boss2',1);G.emo={k:'fierce',t:3};music2(1);shake(.6);
 showBossBox(b);banner(TX.boss,b.name,2.6);}
function bossDamage(b,dmg,o){if(!b||!b.in||b.dead||b.inv>0)return;o=o||{};var m=b.weak>0?2.5:1,d=dmg*m;b.hp-=d;
b.flash=.09;var px=o.x==null?b.x+rr(-60,60):o.x,py=o.y==null?b.y:o.y;
 fl(px,py-40,Math.round(d),b.weak>0?'#ffe27a':'#fff',b.weak>0?42:d>=30?38:26,d>=30||b.weak>0);
 if(!o.noc)hitCombo(1);G.fever=Math.min(100,G.fever+.18);chargeSk(.3);if(b.weak>0&&rnd()<.5)sparks(px,py,4,'#ffe27a',260,.3);
 hudBoss();if(b.hp<=0)bossDie(b);}
function bossDie(b){if(b.dead)return;b.dead=1;b.hp=0;G.phase='bossdie';G.bossT=0;G.eb.length=0;G.ship.inv=99;G.slow=1.8;shake(1);sfx('bossdie',1);say(b.id===1?'win':'final',true);G.emo={k:'happy',t:6};hudBoss();
 G.tg.forEach(function(t){if(!t.dead&&t.k!=='boss'){boom(t.x,mid(t),50,{c:'o',nodeb:1});t.dead=1;}});}
function stepBossDeath(dt){var b=G.bossObj;G.bossT+=dt;b.shk=1;if(b.dead&&!b.gone){if(G.bossT<2.0&&G.t%.1<dt*1.5){boom(b.x+rr(-b.hw,b.hw),b.y+rr(-b.hh,b.hh),rr(50,100),{c:pick(['o','r','y'])});shake(.5);sfx('burst',.5,rr(.6,1.1),.06);}
  if(G.bossT>=2.0){b.gone=1;boom(b.x,b.y,300,{c:'gd',ring:'#ffe27a'});ring(b.x,b.y,20,600,'#fff',.8,14);whiteflash(1,'255,240,200');shake(1);confetti(b.x,b.y,90,900);coinfx(b.x,b.y,50,820);sfx('win',.8);sfx('coin',.8);addCoins(150+G.L*30);for(var i=0;i<8;i++)dropItem(b.x,b.y,'i_coin');G.slow=.5;}}
 if(G.bossT>=3.1&&G.over!=='win'){G.phase='end';levelWin();}}
function phaseUp(b,ph){b.ph=ph;b.inv=1.1;G.eb.length=0;sfx('roar',.9,1+ph*.08);shake(.9);whiteflash(.35,'255,120,60');zoomPunch(.06);vig('255,80,40',.5);banner(ph===2?'บอสโกรธแล้ว!':'บอสคลั่งสุดๆ!','',1.8);b.t1=2;b.t2=3;b.t3=4;ring(b.x,b.y,30,500,'#ff7a4a',.6,12);talk(rnd()<.5?'weak':'boss1',1);}
function stepBoss(dt){var b=G.bossObj;if(!b)return;b.age+=dt;b.flash=Math.max(0,b.flash-dt);b.inv=Math.max(0,b.inv-dt);
 for(var i=0;i<3;i++)b.recoil[i]=Math.max(0,b.recoil[i]-dt*4);
 if(b.dead){if(G.phase==='bossdie')stepBossDeath(dt);return;}
 if(!b.in){b.y+=(b.ty-b.y)*Math.min(1,dt*1.25);if(Math.abs(b.ty-b.y)<8){b.in=true;b.y=b.ty;}return;}
 if(G.cine>0)return;
 var pct=b.hp/b.max,ph=pct>.66?1:pct>.33?2:3;if(ph>b.ph)phaseUp(b,ph);
 b.weakT-=dt;if(b.weak>0){b.weak-=dt;if(b.weak<=0){b.weak=0;b.weakT=rr(7,9)-b.ph;}}else if(b.weakT<=0){b.weak=3.6;sfx('ready',.7,1.3);banner(TX.weak,'',1.6);if(!b.weakSaid){b.weakSaid=1;talk('weak',1);}}
 if(b.id===1)bossOne(b,dt);else bossTwo(b,dt);}
function bossOne(b,dt){var sp=.55+b.ph*.2,s=G.ship;b.x=270+Math.sin(b.age*sp)*(110+b.ph*12);b.y=b.ty+Math.sin(b.age*1.3)*10;
 var ports=[[-105,70],[105,70],[0,175]];
 b.t1-=dt;if(b.t1<=0){b.t1=[0,2.6,2.2,1.8][b.ph];var mx=b.x,my=b.y+175;glow(mx,my,110,'r',.45,0,0,0);b.recoil[2]=1;(function(mx,my){delay(.4,function(){if(b.dead)return;var a=Math.atan2(s.x-mx,s.y-110-my);for(var i=-1;i<=1;i++)ebul(mx,my,0,0,255+b.ph*20,0,a+i*.17);glow(mx,my,140,'o',.2,0,0,0);boom(mx,my,34,{c:'o',nodeb:1});sfx('eshot',.7,.7,.05);shake(.12);});})(mx,my);}
 b.t2-=dt;if(b.t2<=0){b.t2=[0,4.2,3.4,3.0][b.ph];var n=[0,5,7,9][b.ph];b.recoil[0]=b.recoil[1]=1;ports.slice(0,2).forEach(function(p,pi){glow(b.x+p[0],b.y+p[1],90,'r',.4,0,0,0);});delay(.45,function(){if(b.dead)return;ports.slice(0,2).forEach(function(p,pi){for(var i=0;i<n;i++){var a=(i-(n-1)/2)*.15+(pi?.15:-.15)+.0;ebul(b.x+p[0],b.y+p[1],0,0,185,0,a+.0);}boom(b.x+p[0],b.y+p[1],32,{c:'o',nodeb:1});});sfx('eshot',.7,.6,.05);shake(.14);});}
 if(b.ph>=2){b.t3-=dt;if(b.t3<=0){b.t3=b.ph===2?6:4.8;var nb=b.ph===2?3:5;sfx('warn',.6);for(var i=0;i<nb;i++)(function(i){delay(.15*i,function(){if(b.dead)return;var x=clamp(rr(60,480)+(i===0?(s.x-270)*.5:0),50,490);G.eb.push({x:x,y:b.y+150,vx:rr(-30,30),vy:rr(150,220),k:1,r:16,age:0});sfx('eshot',.3,.8,.05);});})(i);}}
 if(b.ph>=3){b.t4-=dt;if(b.t4<=0){b.t4=10;spawnShip('scout');sfx('wave',.6);}
  b.spin+=dt;if(b.spin>.3){b.spin=0;var a=b.age*2.1;ebul(b.x,b.y+100,0,0,200,2,Math.PI*.5+Math.sin(a)*1.0);}}}
function bossTwo(b,dt){var s=G.ship;b.x=270+Math.sin(b.age*.5)*70;b.y=b.ty+Math.sin(b.age*1.1)*14;var ph=b.ph;
 b.t1-=dt;if(b.t1<=0){b.t1=[0,2.7,2.3,1.9][ph];var mx=b.x,my=b.y+90;glow(mx,my,140,'p',.45,0,0,0);delay(.4,function(){if(b.dead)return;var a=Math.atan2(s.x-mx,s.y-110-my),n=ph===1?3:5;for(var i=0;i<n;i++)ebul(mx,my,0,0,235,2,a+(i-(n-1)/2)*.2);boom(mx,my,36,{c:'p',nodeb:1});sfx('eshot',.7,.6,.05);shake(.12);});}
 b.t2-=dt;var nrate=[0,4.2,3.2,2.5][ph];if(b.t2<=0){b.t2=nrate;var free=b.tn.filter(function(t,i){return t.st===0&&(i<2||ph>=2);});if(free.length){var tn=pick(free);tn.st=1;tn.t=ph===3?.8:.95;tn.cx=clamp(s.x+rr(-40,40),70,470);sfx('warn',.7,.8,.1);}}
 b.tn.forEach(function(tn,i){tn.t-=dt;
  if(tn.st===0){tn.x+=(tn.bx-tn.x)*Math.min(1,dt*3);}
  else if(tn.st===1){tn.x+=(tn.cx-tn.x)*Math.min(1,dt*7);if(tn.t<=0){tn.st=2;tn.t=.45;shake(.9);sfx('thunder',.9,.6,.05);hitStopSet(.04);zoomPunch(.04);}}
  else if(tn.st===2){tn.x=tn.cx;if(Math.abs(s.x-tn.cx)<56&&G.t>0)hurt(1,tn.cx,s.y-100);if(!tn.hitfx){tn.hitfx=1;boom(tn.cx,LH-140,110,{c:'p',nodeb:1});puff(tn.cx,LH-140,10,80,'l',200);ring(tn.cx,LH-140,10,200,'#fff',.4,6);}if(tn.t<=0){tn.st=3;tn.t=.7;tn.hitfx=0;}}
  else if(tn.st===3){if(tn.t<=0){tn.st=0;}}});
 if(ph>=2){b.t3-=dt;if(b.t3<=0){b.t3=[0,0,3.4,2.5][ph];var x=rnd()<.6?clamp(s.x+rr(-90,90),40,500):rr(40,500);G.eb.push({x:x,y:0,vx:0,vy:0,k:3,warn:.9,life:.35,r:20,age:0});sfx('warn',.4,1.4,.2);}}
 if(ph>=3){b.t4-=dt;if(b.t4<=0){b.t4=5.5;sfx('warn',.6);for(var i=0;i<4;i++)(function(i){delay(.2*i,function(){if(b.dead)return;G.eb.push({x:rr(60,480),y:b.y+130,vx:rr(-25,25),vy:rr(150,210),k:1,r:16,age:0});});})(i);}
  b.spin+=dt;if(b.spin>.55){b.spin=0;var n=10,gap=ri(0,n-1);for(i=0;i<n;i++){if(i===gap||i===(gap+1)%n)continue;ebul(b.x,b.y+90,0,0,175,2,i/n*6.283+b.age);}}}}
/* ---------- render ---------- */
var BALCOL={bl_cream:0,bl_red:1,bl_blue:2,bl_green:3,bl_purple:4};
function drawCover(k,a){var im=IM[k];if(!im)return;var s=Math.max(FW/im.width,LH/im.height),w=im.width*s,h=im.height*s;cx.globalAlpha=a;cx.drawImage(im,(FW-w)/2,(LH-h)/2,w,h);cx.globalAlpha=1;}
function drawSky(){var lv=G.lv,pr=clamp(G.t/lv.dur,0,1),a=lv.sky[0],b=lv.sky[lv.sky.length-1],mix=a===b?0:clamp((pr-.3)/.45,0,1);
 if(G.bossObj&&lv.boss===2&&a!==b)mix=1;drawCover('sky'+a,1);if(mix>0)drawCover('sky'+b,mix);
 if(G.stormV>0){cx.fillStyle='rgba(18,24,52,'+(.55*G.stormV)+')';cx.fillRect(0,0,FW,LH);}}
function drawBg(dt,sp){
 var boost=G.feverOn>0?1:0;
 for(var i=0;i<G.isl.length;i++){var o=G.isl[i];o.y+=(26+boost*30)*dt*(1+sp);if(o.y>LH+260){o.y=-260;o.x=rr(40,500);o.k='is'+ri(1,4);}dr(o.k,o.x,o.y,0,{w:230*o.s,alpha:.92});}
 for(i=0;i<G.clouds.length;i++){var c=G.clouds[i];c.y+=(34+c.z*150)*dt*(1+boost*.8+sp*1.5);if(c.y>LH+160){c.y=-180;c.x=rr(-40,580);c.k='cl'+ri(1,8);}}
 for(i=0;i<G.clouds.length;i++){c=G.clouds[i];if(c.z<.5)dr(c.k,c.x,c.y,0,{w:420*c.s*.6,alpha:.35+c.z*.8});}
 if(G.stormV>0){cx.fillStyle='rgba(18,24,52,'+(.25*G.stormV)+')';cx.fillRect(0,0,FW,LH);}
 return;}
function drawFront(){for(var i=0;i<G.clouds.length;i++){var c=G.clouds[i];if(c.z>=.5){var d=Math.hypot(c.x-G.ship.x,(c.y-G.ship.y+60)*.8),f=clamp((d-170)/300,0,1);dr(c.k,c.x,c.y,0,{w:420*c.s*.62,alpha:(.4+c.z*.3)*f});}}}
function speedLines(){var sp=Math.max(G.feverOn>0?.8:0,Math.min(1,Math.abs(G.ship.vx)/500),G.cine>0?.6:0);if(sp<.15)return;cx.globalCompositeOperation='lighter';cx.strokeStyle=G.feverOn>0?'#ffe9a0':'#fff';cx.lineWidth=2;cx.globalAlpha=.35*sp;cx.beginPath();for(var i=0;i<16;i++){var x=((i*97+G.t*0)%FW),ph=(G.t*(2+i%3)+i*.37)%1,y=ph*LH*1.2-100;x=(i*53+17)%FW;cx.moveTo(x,y);cx.lineTo(x,y+90+i%4*30);}cx.stroke();cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
function drawTarget(t){var k=t.k,x=t.x,y=t.y,fl=t.flash>0?clamp(t.flash/.12,0,1)*.85:0,ice=t.frz>0;
 if(k==='bar'||k==='crt'){
  var isB=k==='bar',spr=isB?BK[t.type].s:t.type,bl=t.type==='gold'||t.type==='k_gold'?'bl_gold':t.bl,sq=1+Math.sin(t.sq*12)*.12*t.sq*3,bob=Math.sin(t.age*2+t.ph)*5,by=y+bob;
  var h=isB?112:98;
  // aura
  if(t.type==='gold'||t.type==='k_gold'){cx.globalCompositeOperation='lighter';cx.globalAlpha=.55+Math.sin(t.age*5)*.2;cx.drawImage(GL.gd,x-110,by-100,220,220);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';if(rnd()<.25)glow(x+rr(-40,40),by+rr(-120,30),14,'y',.5,0,rr(-30,-60),-20);}
  else if(t.type==='red'||t.type==='bomb'){cx.globalCompositeOperation='lighter';cx.globalAlpha=.25+.2*Math.abs(Math.sin(t.age*5));cx.drawImage(GL.r,x-95,by-95,190,190);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
  else if(t.type==='elec'&&rnd()<.14){bolt(x+rr(-40,40),by+rr(-50,50),x+rr(-70,70),by+rr(-70,70),3,'#b8ecff',.1,10,18);}
  else if(t.type==='ice'){cx.globalCompositeOperation='lighter';cx.globalAlpha=.3;cx.drawImage(GL.c,x-90,by-90,180,180);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
  // balloon + ropes
  var bh=122,bcy=by-56-34-bh/2+4;
  cx.strokeStyle='#d8c08a';cx.lineWidth=2.2;cx.beginPath();cx.moveTo(x-22,bcy+bh/2-6);cx.lineTo(x-2,by-58);cx.moveTo(x+22,bcy+bh/2-6);cx.lineTo(x+2,by-58);cx.stroke();
  dr(bl,x,bcy,bh,{rot:Math.sin(t.age*1.5+t.ph)*.05,flash:fl,ice:ice,sy:1-.04*Math.sin(t.age*3)});
  dr(spr,x,by,h*sq,{sx:1+(1-sq)*.6,flash:fl,ice:ice,ay:.5});
  var n=Math.ceil(t.hp),col=isB?BK[t.type].lab:'#5a2b00';var ns=n>=100?24:n>=10?31:36;txt(String(n),x,by+3+(isB?4:2),ns*(1+(1-sq)*2),'#4a2200','#fff3d0',null,.2);
  if(t.type==='bomb'){cx.globalCompositeOperation='lighter';glow2(x+22,by-62,'y',16+Math.sin(t.age*20)*5);cx.globalCompositeOperation='source-over';}
  if(ice){cx.fillStyle='rgba(180,235,255,.28)';cx.fillRect(x-48,by-60,96,120);}
 }
 else if(k==='gull'){var up=Math.sin(t.age*16+t.wob)>0;dr(up?'gull_up':'gull_dn',x,y+t.wob*0,0,{w:90,flip:t.dir<0,flash:fl,ice:ice});}
 else if(k==='bat'){var up2=Math.sin(t.age*14+t.wob)>0;dr(up2?'bat_up':'bat_dn',x,y,0,{w:96,flash:fl,ice:ice,rot:Math.sin(t.age*3)*.1});dr('i_star',x,y-4,0,{w:0,alpha:0});if(t.sh<.5){glow2(x,y+20,'r',40*(1-t.sh/.5)+10);}}
 else if(k==='scout'||k==='gun'||k==='bomber'){var key=k==='scout'?'es_scout':k==='gun'?'es_gun':'es_bomber',hh=k==='scout'?150:k==='gun'?190:170;dr(key,x,y,hh,{flash:fl,ice:ice,rot:Math.sin(t.age*1.3+t.wob)*.05});if(t.sh<.5)glow2(x,y+hh*.35,'r',50*(1-t.sh/.5)+10);
  var pr=t.hp/t.max;if(pr<1){cx.fillStyle='rgba(0,0,0,.5)';cx.fillRect(x-30,y-hh/2-12,60,6);cx.fillStyle=pr>.4?'#7dff7d':'#ff6a4a';cx.fillRect(x-29,y-hh/2-11,58*pr,4);}}
 else if(k==='tb'){var yy=y+(t.yo||0);cx.strokeStyle='#d8c08a';cx.lineWidth=2;cx.beginPath();cx.moveTo(x-14,yy+30);cx.lineTo(x,yy+58);cx.moveTo(x+14,yy+30);cx.lineTo(x,yy+58);cx.stroke();dr('bl_gold',x,yy,100,{flash:fl,ice:ice});dr('i_coin',x,yy+68,0,{w:36});if(rnd()<.06)glow(x+rr(-20,20),yy+rr(-30,30),14,'y',.4,0,-20,-20);}
}
function glow2(x,y,c,s){cx.drawImage(GL[c],x-s,y-s,s*2,s*2);}
/* ---------- ship ---------- */
var DK={w:440},SHK=.84;
function drawShip(){var s=G.ship,t=G.t,bob=Math.sin(t*2.1)*4,x=s.x,y=s.y+bob;
 var inv=s.inv>0&&s.inv<5&&Math.floor(s.inv*14)%2===0&&G.over!=='lose';
 cx.save();cx.translate(x,y+60);cx.rotate(s.tilt);cx.scale(SHK,SHK);cx.translate(-x,-(y+60));
 if(G.feverOn>0){cx.globalCompositeOperation='lighter';cx.globalAlpha=.5+.2*Math.sin(t*10);cx.drawImage(GL.gd,x-330,y-280,660,520);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
 if(G.over==='lose'){cx.translate(0,G.endT*60);cx.rotate(G.endT*.1);}
 if(inv)cx.globalAlpha=.45;
 dr('deck',x,y,0,{w:DK.w});
 var gy=y+14;
 var cap=G.fire.cap,gh=G.emo.t>0?G.emo.k:'';
 drawGirl('mechanic',x-138,gy,178,'mec');drawGirl('pink',x+138,gy,172,'pnk');drawGirl('captain',x,gy-6,196,'cap');
 // cannons (in front of girls)
 cannon('c_gat',x-86,y+30,104,G.rec.mec);cannon('c_big',x,y+34,128,G.rec.cap);cannon('c_magic',x+86,y+30,104,G.rec.pnk);
 var dh=IM.deck_front?IM.deck_front.height*DK.w/IM.deck_front.width:0;
 dr('deck_front',x,y-141*(DK.w/440)+0.6*(488*DK.w/760),0,{w:DK.w,ay:0});
 cx.globalAlpha=1;cx.restore();
 if(s.hp<=2&&G.over!==('lose')&&rnd()<.3)puff(x+rr(-80,80),y+rr(-20,60),1,30,'d',30);
 // thrusters
 if(rnd()<.8){glow(x-70,y+150,rr(30,46),'o',.2,rr(-10,10),rr(80,140),-60);glow(x+70,y+150,rr(30,46),'o',.2,rr(-10,10),rr(80,140),-60);}
}
function cannon(k,x,by,h,rec){var im=IM[k];if(!im)return;var w=im.width*h/im.height;cx.save();cx.translate(x,by);cx.drawImage(im,-w/2,-h+rec*9,w,h);if(rec>.6){cx.globalCompositeOperation='lighter';cx.globalAlpha=(rec-.6)*2.2;cx.drawImage(GL.y,-60,-h-52,120,120);}cx.restore();}
var EYES={captain:[[172,134,12,15],[222,143,12,15]],mechanic:[[157,158,13,15],[211,153,13,15]],pink:[[185,148,11,14]]};
var SKINC={captain:'#f6c9a6',mechanic:'#f8d2b4',pink:'#f9cfb2'};
function drawGirl(name,x,by,h,who){var im=IM[name];if(!im)return;var t=G.t,sc=h/im.height,w=im.width*sc;
 var em=G.emo,hap=em.t>0&&em.k==='happy',sc2=em.t>0&&em.k==='scared',fi=em.t>0&&em.k==='fierce';
 var ph=who==='cap'?0:who==='mec'?1.7:3.1,bob=Math.sin(t*2.4+ph)*2.5,sq=1+Math.sin(t*2.4+ph)*.012;
 var jig=sc2?Math.sin(t*50)*2.5:0;if(hap||G.combo>=10)bob-=Math.abs(Math.sin(t*7+ph))*(G.combo>=25?9:5);
 var lean=fi?-.03:0;
 cx.save();cx.translate(x+jig,by+bob);cx.rotate(lean+Math.sin(t*1.7+ph)*.012);cx.scale(1,sq);cx.drawImage(im,-w/2,-h,w,h);
 // blink
 var bl=G.blinkT[who];if(bl<0&&bl>-.14){var ey=EYES[name];cx.fillStyle=SKINC[name];for(var i=0;i<ey.length;i++){var e=ey[i];cx.fillRect(-w/2+e[0]*sc,-h+e[1]*sc,e[2]*sc,e[3]*sc*.8);}}
 cx.restore();
 var hx=x,hy=by-h*.8+bob;
 if(sc2){cx.fillStyle='#8fd8ff';var sy=hy+Math.sin(t*6)*3;cx.beginPath();cx.ellipse(hx+34,sy,5,8,.3,0,6.3);cx.fill();txt('!!',hx-30,hy-34+Math.sin(t*20)*2,24,'#ff4a4a','#fff',null,.25);}
 if(hap||G.combo>=25){cx.globalCompositeOperation='lighter';var a=t*3+ph;glow2(hx+Math.cos(a)*48,hy-20+Math.sin(a*1.3)*20,'y',9+Math.sin(t*9)*3);glow2(hx+Math.cos(a+3)*48,hy-20+Math.sin(a*1.3+3)*20,'k',8);cx.globalCompositeOperation='source-over';}
 if(fi){cx.globalCompositeOperation='lighter';cx.globalAlpha=.4+Math.sin(t*12)*.2;glow2(hx,hy+20,'o',70);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}}
function drawBoss(){var b=G.bossObj;if(!b||b.gone)return;var fl=b.flash>0?.8:(b.inv>0?.4*Math.abs(Math.sin(G.t*30)):0),sh=b.shk?rr(-4,4):0,x=b.x+sh,y=b.y+(b.shk?rr(-4,4):0);
 if(b.id===1){
  if(b.dead){cx.globalAlpha=Math.max(0,1-Math.max(0,G.bossT-1.4)*1.6);}
  dr('boss1',x,y,420,{flash:fl,rot:Math.sin(b.age*.9)*.03});
  var ports=[[-105,70],[105,70],[0,175]];for(var i=0;i<3;i++){var p=ports[i];dr('c_big',x+p[0],y+p[1]-b.recoil[i]*10,i===2?60:50,{rot:Math.PI,ay:.35});}
  if(b.weak>0){var a=.55+.35*Math.sin(G.t*14);cx.globalCompositeOperation='lighter';cx.globalAlpha=a;glow2(x,y+120,'gd',120);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';cx.strokeStyle='#ffe27a';cx.lineWidth=4;cx.beginPath();cx.arc(x,y+120,50+Math.sin(G.t*10)*6,0,6.3);cx.stroke();txt('x2.5',x,y+120,26,'#fff','#c06000');}
  cx.globalAlpha=1;
 }else{
  if(b.dead){cx.globalAlpha=Math.max(0,1-Math.max(0,G.bossT-1.4)*1.6);}
  // tentacles behind head
  b.tn.forEach(function(tn,i){var len=tn.st===2?LH-120:tn.st===1?460+Math.sin(G.t*20)*14:tn.st===3?lerp(LH-120,420,1-tn.t/.7):380+Math.sin(G.t*1.7+i)*26;var sw=tn.st===0?Math.sin(G.t*1.4+i*1.7)*.07:0;
   if(tn.st===1){cx.fillStyle='rgba(255,60,60,'+(.18+.12*Math.sin(G.t*24))+')';cx.fillRect(tn.cx-52,0,104,LH);cx.strokeStyle='rgba(255,120,100,.8)';cx.lineWidth=3;cx.strokeRect(tn.cx-52,0,104,LH);}
   dr(tn.k,tn.x,tn.off?30:10,len,{ay:0,rot:sw,flash:fl*.5,w:tn.st===2?170:140});});
  dr('boss2',x,y,380,{flash:fl,rot:Math.sin(b.age*.8)*.02});
  if(b.weak>0){var a2=.5+.4*Math.sin(G.t*14);cx.globalCompositeOperation='lighter';cx.globalAlpha=a2;glow2(x-62,y-30,'gd',72);glow2(x+62,y-30,'gd',72);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';txt('x2.5',x,y+30,28,'#fff','#c06000');}
  if(b.ph>=2&&!b.dead&&rnd()<.15)bolt(x+rr(-120,120),y-150,x+rr(-160,160),y+rr(-60,100),3,'#d8b0ff',.12,12,22);
  cx.globalAlpha=1;}}
function drawItem(it){var k=it.k,sz=k==='i_coin'?40:56,bob=Math.sin(it.age*6+it.ph)*3;cx.globalCompositeOperation='lighter';cx.globalAlpha=.55;glow2(it.x,it.y,k==='i_coin'?'gd':k==='i_gem'?'c':k==='i_heart'?'r':k==='i_crew'?'k':'y',sz*.85);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';
 dr(k,it.x,it.y+bob,sz,{rot:k==='i_coin'?0:Math.sin(it.age*4+it.ph)*.15,sx:k==='i_coin'?Math.cos(it.age*8+it.ph):1});}
function drawShots(){cx.globalCompositeOperation='lighter';for(var i=0;i<G.sh.length;i++){var s=G.sh[i];
  if(s.k==='ball'){glow2(s.x,s.y,'o',34);glow2(s.x,s.y,'y',17);}
  else if(s.k==='bolt'){cx.strokeStyle='#ffe27a';cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.moveTo(s.x,s.y);cx.lineTo(s.x-s.vx*.025,s.y-s.vy*.025);cx.stroke();cx.strokeStyle='#fff';cx.lineWidth=2;cx.stroke();}
  else{glow2(s.x,s.y,s.crit?'y':'k',s.crit?30:22);glow2(s.x,s.y,'w',s.crit?12:8);}}
 cx.globalCompositeOperation='source-over';
 for(i=0;i<G.sh.length;i++){s=G.sh[i];if(s.k==='ball'){var im=IM.c_big;cx.fillStyle='#2a2a38';cx.beginPath();cx.arc(s.x,s.y,9,0,6.3);cx.fill();cx.fillStyle='#8a8aa8';cx.beginPath();cx.arc(s.x-2.5,s.y-2.5,3.5,0,6.3);cx.fill();}}}
function drawEnemyBullets(){for(var i=0;i<G.eb.length;i++){var e=G.eb[i];
  if(e.k===3||e.k===4){if(e.warn>0){var a=.2+.2*Math.sin(G.t*30);cx.fillStyle=e.k===3?'rgba(255,240,120,'+a+')':'rgba(200,120,255,'+a+')';cx.fillRect(e.x-(e.k===3?22:40),0,e.k===3?44:80,LH);cx.strokeStyle=e.k===3?'rgba(255,255,160,.9)':'rgba(220,160,255,.9)';cx.lineWidth=3;cx.setLineDash([14,10]);cx.beginPath();cx.moveTo(e.x,0);cx.lineTo(e.x,LH);cx.stroke();cx.setLineDash([]);txt('!',e.x,G.ship.y-250,44,'#ff4a4a','#fff');}continue;}
  if(e.k===1){cx.fillStyle='#2b2b3a';cx.beginPath();cx.arc(e.x,e.y,15,0,6.3);cx.fill();cx.fillStyle='#4a4a5c';cx.beginPath();cx.arc(e.x-4,e.y-4,6,0,6.3);cx.fill();cx.globalCompositeOperation='lighter';glow2(e.x,e.y-16,'y',12+Math.sin(G.t*40)*4);glow2(e.x,e.y,'r',30);cx.globalCompositeOperation='source-over';}
  else{cx.globalCompositeOperation='lighter';glow2(e.x,e.y,e.k===2?'p':'r',28);glow2(e.x,e.y,'w',10);cx.globalCompositeOperation='source-over';cx.strokeStyle=e.k===2?'#d8a0ff':'#ffd0a0';cx.lineWidth=2;cx.beginPath();cx.arc(e.x,e.y,9,0,6.3);cx.stroke();}}}
function drawParrots(){for(var i=0;i<G.pars.length;i++){var p=G.pars[i],ang=Math.atan2(p.vx,-p.vy);var up=Math.sin(p.ph)>0;dr(up?'pa_up':'pa_dn',p.x,p.y,0,{w:72,rot:ang*.5});}}
function drawHole(){var h=G.hole;if(!h)return;var f=Math.min(1,h.t/.4),t=G.t;cx.save();cx.translate(h.x,h.y);
 cx.globalCompositeOperation='lighter';cx.globalAlpha=.8*f;glow2(0,0,'p',230*f);cx.globalAlpha=1;
 for(var i=0;i<5;i++){cx.rotate(t*3+i);cx.strokeStyle='rgba(190,130,255,'+(.5-i*.07)+')';cx.lineWidth=5-i*.6;cx.beginPath();cx.arc(0,0,(100+i*34)*f,0,4.2);cx.stroke();}
 cx.globalCompositeOperation='source-over';cx.fillStyle='#07020f';cx.beginPath();cx.arc(0,0,64*f*(1+Math.sin(t*20)*.04),0,6.3);cx.fill();cx.strokeStyle='#e0b8ff';cx.lineWidth=4;cx.stroke();cx.restore();}
function drawParticles(){var i,p,a;
 for(i=0;i<P.length;i++){p=P[i];a=p.life/p.max;
  if(p.t===2){cx.globalAlpha=Math.min(.8,a*1.2);var sm=SMK[p.k];cx.drawImage(sm,p.x-p.s,p.y-p.s,p.s*2,p.s*2);}
  else if(p.t===3||p.t===5){cx.globalAlpha=Math.min(1,a*2);cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;if(p.t===5)cx.scale(1,Math.cos(p.ph+G.t*9));cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();}
  else if(p.t===6){cx.globalAlpha=Math.min(1,a*3);var im=IM.i_coin;if(im){var sz=32,sx=Math.cos(p.ph+(p.max-p.life)*9);cx.drawImage(im,p.x-sz/2*Math.abs(sx),p.y-sz/2,sz*Math.abs(sx),sz);}}
  else if(p.t===8){cx.globalAlpha=Math.min(1,a*2);cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.beginPath();cx.ellipse(0,0,7,2.6,0,0,6.3);cx.fill();cx.restore();}}
 cx.globalAlpha=1;cx.globalCompositeOperation='lighter';
 for(i=0;i<P.length;i++){p=P[i];a=p.life/p.max;
  if(p.t===0){cx.globalAlpha=Math.min(1,a*1.4);var s=Math.max(2,p.s);cx.drawImage(GL[p.c]||GL.y,p.x-s/2,p.y-s/2,s,s);}
  else if(p.t===1){cx.globalAlpha=Math.min(1,a*2);cx.strokeStyle=p.c;cx.lineWidth=p.w;cx.lineCap='round';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*.045,p.y-p.vy*.045);cx.stroke();}
  else if(p.t===4){var q=1-a,r=p.r+(p.r1-p.r)*(1-(1-q)*(1-q));cx.globalAlpha=a;cx.strokeStyle=p.c;cx.lineWidth=Math.max(1,p.w*a);cx.beginPath();cx.arc(p.x,p.y,r,0,6.3);cx.stroke();}
  else if(p.t===7){cx.globalAlpha=p.wind?a*.5:.4;cx.strokeStyle=p.wind?'#fff':'#bcd8ff';cx.lineWidth=p.wind?2.5:1.5;var l=Math.hypot(p.vx,p.vy);cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx/l*p.len,p.y-p.vy/l*p.len);cx.stroke();}}
 cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
function drawBolts(){cx.globalCompositeOperation='lighter';cx.lineJoin='round';cx.lineCap='round';for(var i=0;i<BO.length;i++){var b=BO[i],a=b.life/b.max;cx.beginPath();cx.moveTo(b.p[0][0],b.p[0][1]);for(var j=1;j<b.p.length;j++)cx.lineTo(b.p[j][0],b.p[j][1]);
  cx.globalAlpha=a*.3;cx.strokeStyle=b.c;cx.lineWidth=b.w*3.2;cx.stroke();cx.globalAlpha=a*.8;cx.lineWidth=b.w*1.4;cx.stroke();cx.globalAlpha=a;cx.strokeStyle='#fff';cx.lineWidth=b.w*.5;cx.stroke();}
 cx.globalAlpha=1;cx.globalCompositeOperation='source-over';}
function drawFloaters(){for(var i=0;i<FT.length;i++){var f=FT[i];if(f.t<=0)continue;var a=f.t/f.m,pop=1+Math.max(0,(a-.8)*5)*.5;cx.globalAlpha=Math.min(1,a*2.2);txt(String(f.s),f.x,f.y,f.sz*pop,f.col,f.crit?'#8a2a00':'#3a2000',null,.2);}cx.globalAlpha=1;}
var TIERC=['#fff','#ffe27a','#ffb040','#ff8040','#ff5a7a','#d070ff','#58c8ff','#fff'];
function drawCombo(){if(G.combo<2)return;var c=G.combo,ti=G.tier,bump=1+Math.max(0,comboBump)*.35,x=FW-24,y=LH*.42,col=TIERC[Math.min(ti+1,7)];
 cx.save();cx.translate(x,y);cx.scale(bump,bump);cx.rotate(.05);txt('คอมโบ',0,-40,22,'#fff','#2a1a4a','right',.25);var rb=ti>=3;
 if(rb){var g=cx.createLinearGradient(-110,-30,0,30);g.addColorStop(0,'#ff5a5a');g.addColorStop(.25,'#ffd23a');g.addColorStop(.5,'#6dff8a');g.addColorStop(.75,'#4ac0ff');g.addColorStop(1,'#d070ff');col=g;}
 txt(String(c),0,4,Math.min(88,58+Math.min(30,c*.4)),col,'#2a1a4a','right',.16);txt('x'+G.mult.toFixed(G.mult%1?2:1).replace(/\.?0+$/,''),0,52,28,'#ffd23a','#2a1a4a','right',.22);
 cx.fillStyle='rgba(0,0,0,.5)';cx.fillRect(-110,72,110,8);cx.fillStyle='#ffd23a';cx.fillRect(-109,73,108*clamp(G.ct/(G.feverOn>0?3.4:2.1),0,1),6);cx.restore();}
function drawOverlay(){var t=G.t;
 if(G.feverOn>0){var a=.22+.1*Math.sin(t*9),g=cx.createRadialGradient(FW/2,LH/2,LH*.3,FW/2,LH/2,LH*.72);g.addColorStop(0,'rgba(255,190,40,0)');g.addColorStop(1,'rgba(255,170,20,'+a*2+')');cx.fillStyle=g;cx.fillRect(0,0,FW,LH);}
 var v=CAM.vig;if(G.ship.hp<=1&&!G.over)v=Math.max(v,.25+.15*Math.sin(t*8));
 if(v>0.01){var c=G.ship.hp<=1&&CAM.vig<.1?'255,30,30':CAM.vigc,g2=cx.createRadialGradient(FW/2,LH/2,LH*.25,FW/2,LH/2,LH*.7);g2.addColorStop(0,'rgba('+c+',0)');g2.addColorStop(1,'rgba('+c+','+Math.min(.9,v)+')');cx.fillStyle=g2;cx.fillRect(0,0,FW,LH);}
 if(CAM.flash>.01){cx.fillStyle='rgba('+CAM.flashc+','+Math.min(1,CAM.flash)+')';cx.fillRect(0,0,FW,LH);}
 var b=G.big;if(b&&b.t>0){var m=b.boss?2.2:1.2,u=b.t/m,sc=1+Math.max(0,(u-.85))*3.2,al=Math.min(1,u*3);cx.globalAlpha=al;cx.save();cx.translate(FW/2-60,LH*.5);cx.rotate(-.04);cx.scale(sc,sc);txt(b.tx,0,0,b.tx.length>9?44:58,TIERC[Math.min(b.c,7)]||'#ffd23a','#2a1a4a','center',.2);cx.restore();cx.globalAlpha=1;}}
function draw(dt){
 cx.setTransform(DPR*SC,0,0,DPR*SC,0,0);
 var sh=CAM.tr*CAM.tr,sx=rr(-1,1)*sh*20,sy=rr(-1,1)*sh*20,z=1+CAM.zv;
 cx.save();cx.translate(FW/2+sx,LH*.6+sy);cx.scale(z,z);cx.translate(-FW/2,-LH*.6);
 drawSky();drawBg(dt,0);speedLines();
 var i;for(i=0;i<G.tg.length;i++)if(G.tg[i].k==='tb'||G.tg[i].k==='gull')drawTarget(G.tg[i]);
 drawBoss();
 for(i=0;i<G.tg.length;i++)if(G.tg[i].k!=='tb'&&G.tg[i].k!=='gull')drawTarget(G.tg[i]);
 for(i=0;i<G.it.length;i++)drawItem(G.it[i]);
 drawShip();drawShots();drawEnemyBullets();drawHole();drawParrots();drawFront();drawParticles();drawBolts();drawFloaters();
 cx.restore();drawCombo();drawOverlay();
 if(G.stormV>.1){}
}
/* ---------- UI ---------- */
var keys={};
var IMGp=function(k,c){return '<img class="'+(c||'')+'" src="art/'+k+'.webp" alt="">';};
function toast(s){var e=$('toast');e.textContent=s;e.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(function(){e.classList.remove('show');},2200);}
function openSheet(html,cls){$('sheet').className=cls||'';$('sheet').innerHTML=html;$('modal').classList.remove('hidden');}
function closeSheet(){$('modal').classList.add('hidden');$('sheet').innerHTML='';}
function setScreen(html){$('screen').innerHTML=html;$('screen').classList.toggle('hidden',!html);}
function starsHtml(n){var h='';for(var i=0;i<3;i++)h+='<img class="'+(i<n?'':'off')+'" style="animation-delay:'+(.15+i*.2)+'s" src="art/i_star.webp" alt="">';return h;}
function banner(t,s,dur){var b=$('banner');$('banner-t').textContent=t;$('banner-s').textContent=s||'';b.classList.remove('hidden');b.classList.toggle('boss',t===TX.boss);var bt=$('banner-t');bt.style.animation='none';void bt.offsetWidth;bt.style.animation='';clearTimeout(banner.h);banner.h=setTimeout(function(){b.classList.add('hidden');},(dur||1.7)*1000);}
var pkT=0;function pk(t,c){var e=$('pk');if(!e){e=document.createElement('div');e.id='pk';$('hud').appendChild(e);}e.textContent=t;e.style.color=c||'#fff';e.style.top=(G&&G.phase==='boss'?22.6:17.6)+'rem';e.classList.remove('show');void e.offsetWidth;e.classList.add('show');pkT=1.2;}
function talk(key,force){if(!G)return;var L=LINES[key];if(!L)return;if(!force&&G.talkCd>0)return;G.talkCd=3.2;say(key,force);var gi=GIRL[L[0]];
 $('talkimg').src='art/'+gi.img+L[2]+'.webp';$('talkname').textContent=TX.g[L[0]];$('talktx').textContent=L[1];var t=$('talk');t.classList.remove('hidden');t.style.animation='none';void t.offsetWidth;t.style.animation='';clearTimeout(talk.h);talk.h=setTimeout(function(){t.classList.add('hidden');},2600);
 G.emo={k:L[2],t:1.6};}
function hudHearts(){if(!G)return;var h='',s=G.ship;for(var i=0;i<s.hpmax;i++)h+='<img class="'+(i<s.hp?'':'off')+'" src="art/i_heart.webp" alt="">';$('hearts').innerHTML=h;}
var lastCoinTxt='';
function hudCoins(){}
function hudFever(){$('feverfill').style.width=(G.fever)+'%';$('fever').classList.toggle('on',G.feverOn>0);}
function showBossBox(b){$('bossbox').classList.remove('hidden');$('bossname').textContent=b.name;$('bossfill').style.width='100%';$('progboss').src='art/boss'+b.id+'.webp';}
function hudBoss(){var b=G.bossObj;if(b)$('bossfill').style.width=(clamp(b.hp/b.max,0,1)*100)+'%';}
function updSkillUI(){if(!G)return;for(var i=0;i<3;i++){var e=$('sk'+i),r=G.skc[i]>=100;e.style.setProperty('--p',(G.skc[i]/100).toFixed(3));if(e.classList.contains('ready')!==r)e.classList.toggle('ready',r);}}
function hudTick(dt){if(!G)return;if(pkT>0){pkT-=dt;if(pkT<=0){var pe=$('pk');if(pe)pe.classList.remove('show');}}if(G.coinsShown<G.coins){G.coinsShown=Math.min(G.coins,G.coinsShown+Math.max(1,(G.coins-G.coinsShown)*Math.min(1,dt*8)));}var ct=String(Math.round(G.coinsShown+SAVE.coins));if(ct!==lastCoinTxt){lastCoinTxt=ct;$('coins').textContent=ct;}
 $('lvn').textContent=G.L;var pr=G.bossObj?1:clamp(G.t/G.lv.dur,0,1);$('progfill').style.width=(pr*100)+'%';$('progboss').style.display=G.lv.boss?'':'none';hudFever();updSkillUI();}
/* ads (mock) */
var AD_CAP=6,AD_CD=45000;
function adOK(){if(!window.DDAds||!DDAds.ready())return false;var a=SAVE.ads,d=new Date().toDateString();if(a.day!==d){a.day=d;a.n=0;}if(a.n>=AD_CAP)return false;if(!window.__noAdCd&&Date.now()-a.last<AD_CD)return false;return true;}
function runAd(rewardTxt,cb){if(!adOK()){toast(TX.adNone);return;}SAVE.ads.n++;save();var el=$('ad');el.classList.remove('hidden');
 el.innerHTML='<button class="x" data-act="adx">✕</button><div class="lbl">'+TX.adTitle+'</div><div class="rewl">'+rewardTxt+'</div><div class="mock"><canvas></canvas><span>Kairon Arcade</span></div><div class="bar"><i></i></div><div class="lbl">'+TX.adHint+'</div>';
 adSt={t:0,dur:window.__adDur||5,cb:cb,done:false,wp:G?G.paused:false};if(G)G.paused=true;}
function endAd(){var wp=adSt.wp;SAVE.ads.last=Date.now();save();$('ad').classList.add('hidden');if(G)G.paused=wp;adSt=null;}
function tickAd(dt){if(!adSt||adSt.done)return;adSt.t+=dt;var u=Math.min(1,adSt.t/adSt.dur),bar=$('ad').querySelector('.bar i');if(bar)bar.style.width=(u*100)+'%';
 var c=$('ad').querySelector('canvas');if(c){var w=c.clientWidth,h=c.clientHeight;if(c.width!==w){c.width=w;c.height=h;}var g=c.getContext('2d'),sv=cx;cx=g;g.clearRect(0,0,w,h);['captain','mechanic','pink'].forEach(function(k,i){var u2=Math.sin(adSt.t*6+i),im=IM[k];if(im)dr(k,w*(.22+.28*i),h*1.02-Math.abs(u2)*h*.06,h*.85,{ay:1});});cx=sv;}
 if(u>=1){adSt.done=true;var cb=adSt.cb;endAd();sfx('coin');toast(TX.adDone);if(cb)cb();}}
function closeAd(){if(!adSt)return;var early=!adSt.done;endAd();if(early){sfx('nope');toast(TX.adEarly);}}
/* home */
function coinPill(){return '<div class="plate">'+IMGp('i_coin')+'<b>'+SAVE.coins+'</b></div>';}
function showHome(){inRun=false;G=null;$('hud').classList.add('hidden');$('bossbox').classList.add('hidden');$('banner').classList.add('hidden');$('talk').classList.add('hidden');$('letter').classList.add('hidden');closeSheet();selLv=Math.min(selLv,SAVE.maxLv);musicVol(.3);music2(0);
 var nodes='';for(var i=1;i<=8;i++){var lock=i>SAVE.maxLv,st=SAVE.stars[i]||0;nodes+='<button class="node'+(lock?' lock':'')+(i===selLv?' sel':'')+'" data-act="lv" data-n="'+i+'"'+(lock?' disabled':'')+'><b>'+(lock?'🔒':i)+'</b><span class="ns">'+(st?'★'.repeat(st)+'<i>'+'★'.repeat(3-st)+'</i>':'')+'</span></button>';}
 setScreen('<div class="home"><div class="topbar">'+coinPill()+'<button class="round sndb'+(SAVE.mute?' off':'')+'" data-act="snd" aria-label="sound"></button></div>'+
 '<div class="ttl"><div class="t1">'+TX.title+'</div><div class="t2">'+TX.title2+'</div><div class="tsub">'+TX.sub+'</div></div>'+
 '<div class="homebot"><div class="nodes">'+nodes+'</div><div class="lvname">'+TX.level+' '+selLv+' · '+TX.lv[selLv-1]+(selLv===4||selLv===8?' ★บอส':'')+'</div>'+
 '<button class="btn yellow big" data-act="play">'+TX.play+' '+TX.level+' '+selLv+'</button>'+
 '<div class="row2"><button class="btn dark" data-act="shop">'+TX.shop+'</button><button class="btn green" data-act="adfree">'+TX.adFree+'</button></div>'+
 '<div class="brand"><img src="logo.png" alt="">Kairon Arcade · ห้องเกม ไครอน</div></div></div>');}
function showShop(){var cards='';['pw','rf','hp','sk','cr'].forEach(function(k){var lv=upv(k),mx=upMax(k),u=TX.up[k],pips='';for(var i=0;i<mx;i++)pips+='<i class="'+(i<lv?'on':'')+'"></i>';var c=upCost(k),can=SAVE.coins>=c;
 cards+='<div class="card"><div class="ci">'+IMGp(UPD[k].img)+'</div><div class="cm"><b>'+u[0]+'</b><span>'+u[1]+'</span><div class="pips">'+pips+'</div></div>'+(lv>=mx?'<div class="maxed">'+TX.max+'</div>':'<button class="btn '+(can?'yellow':'dis')+' buy" data-act="buy" data-k="'+k+'">'+IMGp('i_coin')+c+'</button>')+'</div>';});
 inRun=false;setScreen('<div class="shop"><div class="topbar"><button class="round" data-act="home" aria-label="back">‹</button><div class="shtitle">'+TX.shop+'</div>'+coinPill()+'</div><div class="cards">'+cards+'</div><button class="btn dark big" data-act="home">'+TX.back+'</button></div>');}
function buy(k){var c=upCost(k);if(upv(k)>=upMax(k))return;if(SAVE.coins<c){sfx('nope');toast('เหรียญไม่พอ');return;}SAVE.coins-=c;SAVE.up[k]++;save();sfx('buy');say('upgrade',true);showShop();}
/* run flow */
function startRun(L){audioInit();sfx('btn');lastCoinTxt='';newRun(L);inRun=true;setScreen('');closeSheet();$('hud').classList.remove('hidden');$('bossbox').classList.add('hidden');$('talk').classList.add('hidden');$('letter').classList.add('hidden');musicVol(.3);music2(0);SAVE.plays++;save();
 if(!SAVE.tut&&L===1){G.paused=true;showTutorial(1);}else{banner(TX.level+' '+L,TX.lv[L-1]);say('go',true);}}
function showTutorial(n){var imgs={
 1:'<div class="tut1"><div class="rnd">'+IMGp('p_captain_happy')+'</div><div class="rnd">'+IMGp('p_mechanic_happy')+'</div><div class="rnd">'+IMGp('p_pink_happy')+'</div><div class="bar"></div><div class="hand"></div></div>',
 2:'<div class="tut1">'+IMGp('b_plain')+IMGp('i_coin')+IMGp('i_cannon')+'</div>',
 3:'<div class="tut1"><div class="sks"><i>'+IMGp('i_storm')+'</i><i>'+IMGp('i_hole')+'</i><i>'+IMGp('i_parrot')+'</i></div></div>'};
 var dots='';for(var i=1;i<=3;i++)dots+='<i class="'+(i===n?'on':'')+'"></i>';
 openSheet('<div class="tut">'+imgs[n]+'<p>'+TX['t'+n]+'</p><div class="dots">'+dots+'</div><button class="btn yellow big" data-act="tutnext" data-n="'+n+'">'+(n<3?TX.tnext:TX.tgo)+'</button></div>','tutsheet');if(n===1)say('tut',true);}
function showPause(){if(!G||G.over||adSt||!inRun)return;G.paused=true;sfx('btn');openSheet('<h2>'+TX.paused+'</h2><div class="pausebtns"><button class="btn yellow big" data-act="resume">'+TX.resume+'</button><button class="btn dark big" data-act="restart">'+TX.restart+'</button><button class="btn big sndb'+(SAVE.mute?' off':'')+'" data-act="snd2"><span class="sl">'+TX.sound+'</span></button><button class="btn dark big" data-act="home">'+TX.menu+'</button></div>');}
function showResults(){if(G.resShown)return;G.resShown=1;var L=G.L,win=G.over==='win';
 if(win){var hp=G.ship.hp/G.ship.hpmax,stars=G.hurts===0?3:hp>=.5?2:1,bonus=60+L*40+stars*30,total=Math.round(G.coins)+bonus;SAVE.coins+=total;if(L>=SAVE.maxLv&&L<8)SAVE.maxLv=L+1;SAVE.stars[L]=Math.max(SAVE.stars[L]||0,stars);if(selLv<=L&&L<8)selLv=L+1;if(G.maxCombo>SAVE.best)SAVE.best=G.maxCombo;save();G.total=total;
  musicVol(.3);music2(0);var last=L===8;sfx('win',.7);
  openSheet('<h2>'+TX.win+'</h2><div class="stars">'+starsHtml(stars)+'</div><div class="lines"><div>'+TX.earned+' <b>+'+Math.round(G.coins)+'</b></div><div>'+TX.bonus+' <b>+'+bonus+'</b></div><div class="tot">'+IMGp('i_coin')+'<b id="totn">+0</b></div><div class="sm">'+TX.best+' '+G.maxCombo+'</div></div>'+(last?'<p class="clr">'+TX.clear+'</p>':'')+
   '<button class="btn green big" data-act="adx2" id="btn-adx2">'+TX.adX2+'</button>'+(last?'':'<button class="btn yellow big" data-act="nextlv">'+TX.next+' '+TX.level+' '+(L+1)+'</button>')+'<button class="btn dark big" data-act="shop">'+TX.shop+'</button><button class="btn dark big" data-act="home">'+TX.menu+'</button>','win');
  if(!adOK())$('btn-adx2').classList.add('hidden');countUp($('totn'),total);}
 else{var keep=Math.floor(G.coins/2);SAVE.coins+=keep;save();G.keep=keep;
  openSheet('<h2>'+TX.lose+'</h2><div class="lines"><div class="tot">'+IMGp('i_coin')+'<b>+'+keep+'</b></div></div>'+(G.revived?'':'<button class="btn green big" data-act="revive" id="btn-rev">'+TX.adRev+'</button>')+'<button class="btn yellow big" data-act="retry">'+TX.retry+'</button><button class="btn dark big" data-act="shop">'+TX.shop+'</button><button class="btn dark big" data-act="home">'+TX.menu+'</button>','lose');
  if(!G.revived&&!adOK())$('btn-rev').classList.add('hidden');}}
function countUp(el,n){var t0=performance.now();(function f(){var u=Math.min(1,(performance.now()-t0)/900);el.textContent='+'+Math.round(n*(1-Math.pow(1-u,3)));if(u<1)requestAnimationFrame(f);})();}
function revive(){G.revived=true;G.over=0;G.resShown=0;G.endT=0;G.ship.hp=G.ship.hpmax;G.ship.inv=3;G.eb.length=0;G.lowSaid=0;G.tg.forEach(function(t){if(!t.dead&&(t.k==='bar'||t.k==='crt'||t.k==='bomb')&&t.y>G.ship.y-500)t.dead=1;});hudHearts();closeSheet();G.paused=false;G.slow=0;banner(TX.go);say('go',true);}
$('game').addEventListener('click',function(ev){var b=ev.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;audioInit();if(a!=='buy')sfx('btn',.5);
 switch(a){
 case 'lv':selLv=+b.dataset.n;showHome();break;
 case 'play':startRun(selLv);break;
 case 'shop':closeSheet();G=null;$('hud').classList.add('hidden');showShop();break;
 case 'buy':buy(b.dataset.k);break;
 case 'home':showHome();break;
 case 'snd':setMute(!SAVE.mute);break;
 case 'snd2':setMute(!SAVE.mute);break;
 case 'adfree':runAd('+150 '+TX.coins,function(){SAVE.coins+=150;save();say('coins',true);showHome();});break;
 case 'tutnext':var n=+b.dataset.n;if(n<3)showTutorial(n+1);else{SAVE.tut=true;save();closeSheet();G.paused=false;banner(TX.level+' 1',TX.lv[0]);say('go',true);}break;
 case 'resume':closeSheet();G.paused=false;break;
 case 'restart':case 'retry':startRun(G?G.L:selLv);break;
 case 'nextlv':startRun(Math.min(8,selLv));break;
 case 'adx2':runAd(TX.adX2.replace('ดูโฆษณาจำลอง ',''),function(){SAVE.coins+=G.total;save();$('btn-adx2').classList.add('hidden');toast('+'+G.total+' '+TX.coins);sfx('coin');});break;
 case 'revive':runAd('ซ่อมเรือเต็มลำ',function(){revive();});break;
 case 'adx':closeAd();break;
 case 'pause':showPause();break;
 }});
$('btn-pause').addEventListener('click',function(){audioInit();showPause();});
[0,1,2].forEach(function(i){$('sk'+i).addEventListener('pointerdown',function(ev){ev.preventDefault();ev.stopPropagation();audioInit();if(G&&inRun&&!G.paused){if(G.skc[i]>=100)useSkill(i);else{sfx('nope',.4);}}});});
/* input */
var drag=null;
cv.addEventListener('pointerdown',function(ev){audioInit();if(!G||!inRun||G.paused)return;drag={id:ev.pointerId,x:ev.clientX};try{cv.setPointerCapture(ev.pointerId);}catch(e){}ev.preventDefault();});
cv.addEventListener('pointermove',function(ev){if(!drag||drag.id!==ev.pointerId||!G)return;var dx=(ev.clientX-drag.x)/SC*1.4;drag.x=ev.clientX;G.ship.tx=clamp(G.ship.tx+dx,185,355);ev.preventDefault();});
function dend(ev){if(drag&&drag.id===ev.pointerId)drag=null;}
cv.addEventListener('pointerup',dend);cv.addEventListener('pointercancel',dend);
window.addEventListener('keydown',function(e){keys[e.key]=true;if(G&&inRun&&!G.paused){if(e.key==='1')useSkill(0);if(e.key==='2')useSkill(1);if(e.key==='3')useSkill(2);}if(e.key==='Escape'||e.key==='p'){if(G&&inRun&&!G.over){if(G.paused&&!adSt){if($('sheet').querySelector('[data-act=resume]')){closeSheet();G.paused=false;}}else showPause();}}});
window.addEventListener('keyup',function(e){keys[e.key]=false;});
document.addEventListener('visibilitychange',function(){if(document.hidden&&G&&inRun&&!G.over&&!G.paused&&!adSt)showPause();});
window.addEventListener('resize',function(){layout();if(G)G.ship.y=shipY();});
/* ---------- main loop ---------- */
function stepGame(dt,rdt){
 var s=G.ship,kx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0);if(kx)s.tx=clamp(s.tx+kx*480*dt,185,355);
  var nx=s.x+clamp((s.tx-s.x)*11,-780,780)*dt;s.vx=(nx-s.x)/Math.max(dt,.0001);if(dt<=0)s.vx=0;s.x=clamp(nx,70,470);s.tilt+=((clamp(s.vx/900,-.5,.5))-s.tilt)*Math.min(1,dt*9);
 if(s.inv>0)s.inv-=dt;if(G.hurtT>0)G.hurtT-=dt;
 if(G.cine>0){G.cine-=dt;if(G.cine<0)G.cine=0;}
 if(!G.over){G.t+=dt;if(G.cine<=0&&G.phase!=='bossdie')fireAll(dt);}
 G.talkCd-=rdt;
 stepShots(dt);stepTargets(dt);stepBullets(dt);stepItems(dt);stepSkills(dt);stepCombo(dt);
 if(!G.over)stepDirector(dt);stepStorm(dt);
 if(G.bossObj){if(G.phase==='bossdie')stepBossDeath(dt);else stepBoss(dt);hudBoss();}
 for(var i=G.dl.length-1;i>=0;i--){var d=G.dl[i];d.t-=dt;if(d.t<=0){G.dl.splice(i,1);d.fn();}}
 if(G.emo.t>0)G.emo.t-=dt;
 for(var k in G.blinkT){G.blinkT[k]-=dt;if(G.blinkT[k]<-.14)G.blinkT[k]=rr(2,5);}
 if(G.big&&G.big.t>0)G.big.t-=dt;
 if(G.lv.boss&&G.phase==='boss'||G.phase==='bossdie')music2(1);
 if(!G.lowSaid&&s.hp<=1&&!G.over){G.lowSaid=1;talk('low');}
 stepFx(dt);
 if(G.over){G.endT+=rdt;if(G.endT>(G.over==='win'?2.8:2.2)&&!G.resShown&&G.slow<=0)showResults();}
}
function update(rdt){
 if(!G||!inRun||G.paused)return;
 var ts=1;if(G.hs>0){G.hs-=rdt;ts=.04;}else if(G.slow>0){G.slow-=rdt;ts=G.over==='lose'?.4:.3;}
 stepGame(rdt*ts,rdt);
 }
var last=0,ftAvg=16,qT=0;
function frame(now){requestAnimationFrame(frame);var rdt=Math.min(.05,(now-last)/1000||0);last=now;
 if(rdt>0){ftAvg+=(rdt*1000-ftAvg)*.05;}
  update(rdt);
 tickAd(rdt);
 if(G&&inRun){hudTick(rdt);tickMusic(rdt);qT+=rdt;if(qT>1.5){qT=0;if(ftAvg>24&&G.q>.45)G.q=Math.max(.45,G.q-.15);else if(ftAvg<15&&G.q<1)G.q=Math.min(1,G.q+.1);MAXP=Math.round(900*G.q);}draw(G.paused?0:rdt);}
 else if(G===null){drawIdle(rdt);}
 else tickMusic(rdt);}
var idleT=0;
function drawIdle(dt){idleT+=dt;cx.setTransform(DPR*SC,0,0,DPR*SC,0,0);cx.clearRect(0,0,FW,LH);tickMusic(dt);}
/* init */
function init(){layout();initFx();document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=TX[e.dataset.t];});
 var fonts=document.fonts&&document.fonts.load?Promise.all([document.fonts.load('800 24px Kanit','สาวโจรสลัด 0123'),document.fonts.load('600 24px Kanit','ทหาร')]):Promise.resolve();
 loadArt(function(){fonts.catch(function(){}).then(function(){$('loadp').parentNode.parentNode.classList.add('hidden');var b=$('btn-start');b.classList.remove('hidden');
   b.addEventListener('click',function(){audioInit();sfx('btn');$('splash').classList.add('gone');setTimeout(function(){$('splash').classList.add('hidden');},400);
    if(Q.level){setTimeout(function(){startRun(clamp(+Q.level||1,1,8));},50);}else{showHome();setTimeout(function(){say('hello',true);},300);}});});});
 setMute(SAVE.mute);requestAnimationFrame(frame);}
init();
})();
