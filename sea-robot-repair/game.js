/* อู่ซ่อมหุ่นยนต์ใต้ทะเล / Deep Sea Robot Repair — Kairon Arcade. Original code. Painted art generated for this game (src/art); faces, blinking and all motion are drawn live in code. */
(function(){'use strict';
var $=function(i){return document.getElementById(i);};
// ---------- text ----------
var T={th:{title:'อู่ซ่อมหุ่นยนต์ใต้ทะเล',sub:'ซ่อมหุ่นยนต์ ขยายอู่ลงสู่ทะเลลึก',tapStart:'แตะเพื่อเริ่ม',nUpg:'อัปเกรด',nFloor:'ชั้นอู่',nRegs:'ลูกค้า',
 f1:'ชั้น 1 · ทะเลตื้น',f2:'ชั้น 2 · แนวปะการัง',f3:'ชั้น 3 · ถ้ำแมงกะพรุน',f4:'ชั้น 4 · เมืองลับก้นทะเล',
 f1d:'อู่เล็กจากซากเรือเก่า',f2d:'ลูกค้าใหม่ ม้าน้ำกับปลาปักเป้า สายไฟ 4 สี ค่าซ่อมสูงขึ้น',f3d:'เร็วๆ นี้',f4d:'เร็วๆ นี้',
 here:'อยู่ที่นี่',go:'ไปเลย',soon:'เร็วๆ นี้',unlock:'เปิด',
 tTap:'แตะหุ่นยนต์ที่รออยู่ เพื่อเริ่มซ่อม',tPart:'ลากชิ้นส่วนที่ตรงกันใส่ช่อง',tBolt:'วนนิ้วตามเข็มนาฬิกา เพื่อขันน็อต',tWire:'ลากสายไฟไปช่องสีเดียวกัน',tScrub:'ถูไปมา ขัดเพรียงออกให้หมด',
 tDone:'เก่งมาก! ซ่อมต่อไปเรื่อยๆ เก็บเงินไว้อัปเกรดและเปิดชั้นแนวปะการัง',
 kPart:'ใส่ชิ้นส่วน',kBolt:'ขันน็อต',kWire:'ต่อสายไฟ',kScrub:'ขัดเพรียง',
 resT:'ซ่อมเสร็จ!',pay:'ค่าซ่อม',tipL:'ทิป',total:'รวม',collect:'รับเงิน',noThanks:'ไม่เป็นไร',watch:'ดูโฆษณา',
 offX2:'ดูโฆษณาสั้นๆ เพื่อรับทิป x2 (+{n})',offTime:'ดูโฆษณาสั้นๆ เพื่อรับเวลาเพิ่ม +10 วินาที',offRare:'ดูโฆษณาสั้นๆ เพื่อรับชิ้นส่วนหายาก 1 ชิ้น (ซ่อมงานไหนก็ได้เสร็จทันที 1 ขั้น)',offWel:'ดูโฆษณาสั้นๆ เพื่อรับเงินเป็น x2 (+{n})',
 rewardT:'รางวัล',rareBtn:'ชิ้นส่วนหายาก',useRare:'ใช้ชิ้นส่วนหายาก ({n})',timeBtn:'+10 วิ',
 adLabel:'โฆษณา',adTest:'โหมดทดสอบโฆษณา',adWait:'รอสักครู่…',adDone:'ดูจบแล้ว!',claim:'รับรางวัล',adEarly:'ปิดก่อนจบ ไม่ได้รางวัลนะ',adNone:'ยังไม่มีโฆษณาตอนนี้',
 upT:'อัปเกรดอู่',upTool:'เครื่องมือเร็วขึ้น',upToolD:'เวลาซ่อมมากขึ้น ขันน็อตไวขึ้น ขัดได้กว้างขึ้น',upBench:'โต๊ะซ่อมตัวที่ 2',upBenchD:'ลูกค้ารอได้มากขึ้น และมีที่ให้ผู้ช่วยทำงาน',
 upHelp:'จ้างหุ่นผู้ช่วย "ป๊อบ"',upHelpD:'ซ่อมงานง่ายให้อัตโนมัติ และหาเงินให้ตอนปิดเกม',upHelpL:'ผู้ช่วยทำงานไวขึ้น',upHelpLD:'ซ่อมเร็วขึ้น เงินตอนปิดเกมมากขึ้น',
 needBench:'ต้องมีโต๊ะตัวที่ 2 ก่อน',max:'สูงสุด',lv:'ระดับ {n}',owned:'มีแล้ว',
 regT:'ลูกค้าประจำ',regD:'หุ่นที่กลับมาซ่อมซ้ำจะจำเราได้ และให้ทิปเพิ่ม',regNone:'ยังไม่มีลูกค้าประจำ ซ่อมให้ดีๆ แล้วเขาจะกลับมา',visits:'มาแล้ว {n} ครั้ง',
 rush:'กระแสน้ำพาลูกค้ามาเยอะ!',vip:'หุ่นวีไอพีสีทองมาแล้ว!',left:'ลูกค้ารอนานจนกลับไปแล้ว',regular:'ลูกค้าประจำ',remember:'จำฉันได้ไหม?',
 welT:'ยินดีต้อนรับกลับ!',welD:'ตอนพี่ไม่อยู่ อู่เก็บเงินไว้ให้',welCap:'(เก็บได้สูงสุด 3 ชั่วโมง)',
 noMoney:'เงินยังไม่พอ',unlocked:'เปิดชั้นแนวปะการังแล้ว!',busy:'กำลังซ่อมอยู่',benchBusy:'โต๊ะไม่ว่าง',timeUp:'หมดเวลาแล้ว ซ่อมให้เสร็จนะ',
 p_cheery:'ร่าเริง',p_grumpy:'ขี้บ่น',p_shy:'ขี้อาย',close:'ปิด',moved:'ย้ายไป{f}แล้ว',
 n_fish:['บี๊บบี้','ฟินฟิน','ครีบทอง'],n_crab:['ก้ามโต','ปูจิ๋ว','แก๊กแก๊ก'],n_turtle:['คุณตาเต่า','เต่าทอง','ช้าช้า'],n_horse:['ม้าน้ำซิป','หางม้วน'],n_puffer:['ปักเป้าป่อง','ตุ๊บป่อง'],n_octo:['ท่านหมึกทอง']},
en:{title:'Deep Sea Robot Repair',sub:'Fix robots, grow your garage into the deep',tapStart:'Tap to start',nUpg:'Upgrades',nFloor:'Floors',nRegs:'Regulars',
 f1:'Floor 1 · Shallows',f2:'Floor 2 · Coral Reef',f3:'Floor 3 · Jellyfish Cave',f4:'Floor 4 · Sunken City',
 f1d:'A tiny garage in an old boat hull',f2d:'New customers: seahorses and pufferfish, 4-colour wires, bigger pay',f3d:'Coming soon',f4d:'Coming soon',
 here:'You are here',go:'Go',soon:'Soon',unlock:'Open',
 tTap:'Tap a waiting robot to start a repair',tPart:'Drag the matching part into the slot',tBolt:'Circle your finger clockwise to turn the bolt',tWire:'Drag each wire to the socket of the same colour',tScrub:'Rub back and forth to scrub off the barnacles',
 tDone:'Great! Keep fixing, save coins for upgrades and to open the Coral Reef',
 kPart:'Fit part',kBolt:'Turn bolt',kWire:'Connect wires',kScrub:'Scrub',
 resT:'Fixed!',pay:'Repair pay',tipL:'Tip',total:'Total',collect:'Collect',noThanks:'No thanks',watch:'Watch ad',
 offX2:'Watch a short ad to double your tip (+{n})',offTime:'Watch a short ad for +10 seconds',offRare:'Watch a short ad for 1 rare part (instantly finishes one repair step)',offWel:'Watch a short ad to double it (+{n})',
 rewardT:'Reward',rareBtn:'Rare part',useRare:'Use rare part ({n})',timeBtn:'+10 s',
 adLabel:'Ad',adTest:'Test ad mode',adWait:'Please wait…',adDone:'Finished!',claim:'Claim reward',adEarly:'Closed early, no reward',adNone:'No ad available right now',
 upT:'Garage upgrades',upTool:'Faster tools',upToolD:'More repair time, quicker bolts, wider scrubbing',upBench:'Second workbench',upBenchD:'More waiting space and a bench for a helper',
 upHelp:'Hire helper bot "Pop"',upHelpD:'Fixes easy jobs by itself and earns while you are away',upHelpL:'Faster helper',upHelpLD:'Fixes faster, earns more while away',
 needBench:'Needs the second workbench',max:'Max',lv:'Level {n}',owned:'Owned',
 regT:'Regulars',regD:'Robots who come back remember you and tip more',regNone:'No regulars yet. Fix robots well and they will come back',visits:'Visited {n} times',
 rush:'A current brings a rush of customers!',vip:'A golden VIP robot is here!',left:'A customer waited too long and left',regular:'Regular',remember:'Remember me?',
 welT:'Welcome back!',welD:'While you were away, the garage earned',welCap:'(stores up to 3 hours)',
 noMoney:'Not enough coins',unlocked:'Coral Reef is open!',busy:'Already repairing',benchBusy:'Bench is busy',timeUp:'Time is up, finish the repair',
 p_cheery:'Cheery',p_grumpy:'Grumpy',p_shy:'Shy',close:'Close',moved:'Moved to {f}',
 n_fish:['Beepy','Finfin','Goldfin'],n_crab:['Clanky','Pinchy','Clicky'],n_turtle:['Grandpa Shell','Shelly','Slowpoke'],n_horse:['Zippy','Curly'],n_puffer:['Puffy','Bloop'],n_octo:['Lord Goldie']}};
var lang='th';
function t(k,v){var s=(T[lang][k]!=null?T[lang][k]:T.th[k]);if(s==null)return k;if(v)for(var x in v)s=String(s).replace('{'+x+'}',v[x]);return s;}
// ---------- save (versioned) ----------
var SAVE_KEY='kairon_sea_repair',SAVE_V=1;
function fresh(){return {v:SAVE_V,coins:0,floor:1,floors:[1],tool:0,bench:1,helper:0,rare:0,fixed:0,regs:{},tut:0,seen:{},ad:{day:'',count:0,last:0,rare:0},last:Date.now(),lang:'th',mute:false,created:Date.now()};}
var MIGRATE={/* 1:function(s){...s.v=2;} — future stages add steps here */};
function load(){var s=null;try{s=JSON.parse(localStorage.getItem(SAVE_KEY));}catch(e){}
  if(!s||typeof s!=='object')return fresh();
  while(s.v<SAVE_V&&MIGRATE[s.v])MIGRATE[s.v](s);
  var f=fresh();for(var k in f)if(s[k]==null)s[k]=f[k];for(k in f.ad)if(s.ad[k]==null)s.ad[k]=f.ad[k];return s;}
var S=load();lang=S.lang||'th';
function save(){S.last=Date.now();try{localStorage.setItem(SAVE_KEY,JSON.stringify(S));}catch(e){}}
// ---------- audio (WebAudio) ----------
var SOUNDS=['tap','pop','snap','ratchet','zap','scrub','fixed','coin','tip','star','nope','arrive','rush','vip','unlock','upgrade','pout','blink','happy','tick','music',
 'v_hello','v_tap','v_part','v_bolt','v_wire','v_scrub','v_perfect','v_good','v_slow','v_rush','v_vip','v_unlock','v_welcome','v_helper','v_upgrade','v_regular','v_x2','v_left','v_bench','v_a_thanks','v_a_help','v_a_hmph','v_a_wow'];
var AC=null,BUF={},master=null,musicG=null,musicSrc=null,voiceBusyUntil=0,lastSay={};
function audioInit(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
  master=AC.createGain();master.connect(AC.destination);musicG=AC.createGain();musicG.gain.value=0.32;musicG.connect(master);setMute();
  SOUNDS.forEach(function(n){fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;if(n==='music')startMusic();}).catch(function(){});});}
function audioUnlock(){audioInit();if(AC&&AC.state==='suspended')AC.resume();}
function setMute(){if(master)master.gain.value=S.mute?0:1;$('mute-ico').setAttribute('d',S.mute?'M3 9v6h4l5 5V4L7 9zm13.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z':'M3 9v6h4l5 5V4L7 9zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z');}
function play(n,o){if(!AC||!BUF[n])return;o=o||{};var s=AC.createBufferSource();s.buffer=BUF[n];s.playbackRate.value=o.rate||1;var g=AC.createGain();g.gain.value=o.vol==null?0.8:o.vol;s.connect(g);g.connect(master);s.start();return s;}
function startMusic(){if(musicSrc||!BUF.music)return;musicSrc=AC.createBufferSource();musicSrc.buffer=BUF.music;musicSrc.loop=true;musicSrc.connect(musicG);musicSrc.start();}
function musicRate(r){if(musicSrc)musicSrc.playbackRate.setTargetAtTime(r,AC.currentTime,0.4);}
function say(k,force){var n='v_'+k;if(!AC||!BUF[n])return;var tn=AC.currentTime;if(!force&&tn<voiceBusyUntil)return;if(!force&&lastSay[k]&&tn-lastSay[k]<8)return;
  lastSay[k]=tn;voiceBusyUntil=tn+BUF[n].duration+0.2;if(lang==='th')play(n,{vol:1});else play('happy',{vol:0.45});}
// ---------- canvas & layout ----------
var cv=$('scene'),cx=cv.getContext('2d'),W=390,H=844,DPR=1,U=39,TM=0;
function resize(){var g=$('game');W=g.clientWidth;H=g.clientHeight;DPR=Math.min(2.5,window.devicePixelRatio||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);U=Math.min(W,H*0.55)/10;layout();}
window.addEventListener('resize',resize);
var SLOTS=[],BENCH=[],MUK={x:0,y:0},P={x:0,y:0,w:0,h:0};
function layout(){
  var qy=H*0.31,qy2=H*0.42;
  SLOTS=[{x:W*0.2,y:qy},{x:W*0.5,y:qy-U*0.4},{x:W*0.8,y:qy},{x:W*0.3,y:qy2},{x:W*0.7,y:qy2}];
  BENCH=[{x:S.bench>1?W*0.34:W*0.5,y:H*0.66},{x:W*0.78,y:H*0.70}];
  MUK={x:BENCH[0].x+U*(S.bench>1?-2.3:2.6),y:H*0.64};if(MUK.x<U*1.3)MUK.x=U*1.3;
  P={x:W*0.05,y:H*0.36,w:W*0.9,h:H*0.47};
  if(R)layoutTask();
}
// ---------- drawing helpers ----------
function rr(x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath();}
function circ(x,y,r){cx.beginPath();cx.arc(x,y,r,0,Math.PI*2);}
function lg(x0,y0,x1,y1,st){var g=cx.createLinearGradient(x0,y0,x1,y1);for(var i=0;i<st.length;i+=2)g.addColorStop(st[i],st[i+1]);return g;}
function rg(x,y,r0,r1,st){var g=cx.createRadialGradient(x,y,r0,x,y,r1);for(var i=0;i<st.length;i+=2)g.addColorStop(st[i],st[i+1]);return g;}
function glow(c,b){cx.shadowColor=c;cx.shadowBlur=b;}
function noGlow(){cx.shadowBlur=0;}
function txt(s,x,y,sz,col,al,wt){cx.font=(wt||600)+' '+sz+'px Kanit, system-ui, sans-serif';cx.fillStyle=col||'#f4fbff';cx.textAlign=al||'center';cx.textBaseline='middle';cx.fillText(s,x,y);}
// ---------- painted art (lazy-loaded webp); vector drawing below stays as fallback ----------
var SCR={"fish":[0.026,0.271,0.342,0.517],"crab":[0.282,0.185,0.429,0.439],"turtle":[0.055,0.36,0.27,0.29],"horse":[0.186,0.2,0.298,0.108],"puffer":[0.05,0.301,0.355,0.373],"octo":[0.294,0.35,0.406,0.205],"helper":[0.338,0.445,0.373,0.311]};
var IMG={};
function img(n){var i=IMG[n];if(!i){i=IMG[n]=new Image();i.decoding='async';i.src='art/'+n+'.webp?v=b0c94802';}return i.complete&&i.naturalWidth>0?i:null;}
function preload(l){l.forEach(img);}
preload(['bg1','muk','fish','crab','turtle','bench','muk_wave','panel','gear','chip','bulb','fin','bolt','sock','barn','barn2']);
function preload2(){preload(['bg2','horse','puffer']);}
setTimeout(function(){preload(['helper','octo']);if(S.floors.indexOf(2)>=0)preload2();},1800);
function dimg(im,x,y,w,h){cx.drawImage(im,x,y,w,h);}
var faceGlass=0;
// ---------- background ----------
var bubbles=[],weeds=[],motes=[];
for(var i=0;i<26;i++)bubbles.push({x:Math.random(),y:Math.random(),r:1+Math.random()*3,s:0.02+Math.random()*0.05,w:Math.random()*6});
for(i=0;i<9;i++)weeds.push({x:Math.random(),h:0.08+Math.random()*0.12,p:Math.random()*6,c:i%3});
for(i=0;i<30;i++)motes.push({x:Math.random(),y:Math.random(),p:Math.random()*6});
var FLOORCOL={1:['#0f5a78','#0a3358','#08213f'],2:['#1b6f8c','#24406e','#1a1d4a']};
function rays(al){cx.save();cx.globalCompositeOperation='lighter';
  for(var i=0;i<5;i++){var x=W*(0.1+i*0.22)+Math.sin(TM*0.3+i)*U*0.6;cx.fillStyle=lg(0,0,0,H*0.7,[0,'rgba(160,255,240,'+(0.10*al)+')',1,'rgba(160,255,240,0)']);
    cx.beginPath();cx.moveTo(x-U*0.4,0);cx.lineTo(x+U*0.5,0);cx.lineTo(x+U*1.8,H*0.75);cx.lineTo(x-U*0.2,H*0.75);cx.fill();}
  cx.restore();}
function drawBG(){
  var bi=img(S.floor===2?'bg2':'bg1');if(S.floor===2&&!bi)preload2();
  if(bi){var sc=Math.max(W/bi.width,H/bi.height),dw=bi.width*sc,dh=bi.height*sc;dimg(bi,(W-dw)/2,(H-dh)*0.6,dw,dh);
    rays(0.55);
    // breathing glow on the coral / lantern + drifting plankton
    cx.save();cx.globalCompositeOperation='lighter';var gl=0.06+0.04*Math.sin(TM*1.7);
    cx.fillStyle=rg(W*0.5,H*0.2,0,U*3,[0,'rgba(255,214,120,'+gl+')',1,'rgba(255,214,120,0)']);circ(W*0.5,H*0.2,U*3);cx.fill();
    for(var j=0;j<3;j++){var gx=W*[0.08,0.92,0.5][j],gy=H*[0.86,0.84,0.95][j],ga=0.07+0.05*Math.sin(TM*2+j*2);cx.fillStyle=rg(gx,gy,0,U*2.2,[0,'rgba(120,255,240,'+ga+')',1,'rgba(120,255,240,0)']);circ(gx,gy,U*2.2);cx.fill();}
    cx.restore();
    cx.fillStyle=lg(0,H*0.86,0,H,[0,'rgba(4,14,34,0)',1,'rgba(4,14,34,.45)']);cx.fillRect(0,H*0.86,W,H*0.14);
    motes.forEach(function(m){var a=0.25+0.3*Math.sin(TM*2+m.p*3);cx.fillStyle='rgba(200,255,250,'+a.toFixed(2)+')';circ(m.x*W+Math.sin(TM*0.5+m.p)*8,((m.y-TM*0.01)%1+1)%1*H,1.4);cx.fill();});
    return;}
  var c=FLOORCOL[S.floor]||FLOORCOL[1];cx.fillStyle=lg(0,0,0,H,[0,c[0],0.55,c[1],1,c[2]]);cx.fillRect(0,0,W,H);
  // light rays
  cx.save();cx.globalCompositeOperation='lighter';
  for(var i=0;i<5;i++){var x=W*(0.1+i*0.22)+Math.sin(TM*0.3+i)*U*0.6;cx.fillStyle=lg(0,0,0,H*0.7,[0,'rgba(160,255,240,0.10)',1,'rgba(160,255,240,0)']);
    cx.beginPath();cx.moveTo(x-U*0.4,0);cx.lineTo(x+U*0.5,0);cx.lineTo(x+U*1.8,H*0.75);cx.lineTo(x-U*0.2,H*0.75);cx.fill();}
  cx.restore();
  if(S.floor===1)drawHull();else drawCoral();
  // sand floor
  var fy=H*0.74;cx.fillStyle=lg(0,fy,0,H,[0,S.floor===1?'#3c6a73':'#4a4f7c',1,S.floor===1?'#1d3a48':'#232650']);
  cx.beginPath();cx.moveTo(0,fy);for(var x=0;x<=W;x+=W/8)cx.quadraticCurveTo(x+W/16,fy-U*0.25*Math.sin(x),x+W/8,fy);cx.lineTo(W,H);cx.lineTo(0,H);cx.fill();
  // pebbles
  for(i=0;i<12;i++){cx.fillStyle='rgba(10,30,50,0.35)';circ((i*97%100)/100*W,fy+U*0.6+(i*53%40)/40*(H-fy-U),U*(0.12+(i%3)*0.06));cx.fill();}
  // seaweed + glowing coral tufts
  weeds.forEach(function(w){var bx=w.x*W,by=H*0.8,h=w.h*H;cx.strokeStyle=w.c===0?'#2fae7a':w.c===1?'#1f8f8a':'#46c08e';cx.lineWidth=U*0.18;cx.lineCap='round';
    cx.beginPath();cx.moveTo(bx,by);for(var k=1;k<=6;k++){var yy=by-h*k/6;cx.lineTo(bx+Math.sin(TM*1.2+w.p+k*0.7)*U*0.25*k/6,yy);}cx.stroke();});
  for(i=0;i<6;i++){var gx=W*(0.05+i*0.18),gy=H*0.81+(i%2)*U*0.4,col=['#58f2ff','#b07cff','#5cffb6'][i%3];glow(col,U*0.5);cx.fillStyle=col;
    for(var k=0;k<4;k++){circ(gx+(k-1.5)*U*0.2,gy-U*(0.2+0.25*Math.abs(Math.sin(k+i)))+Math.sin(TM*2+k+i)*1.5,U*0.09);cx.fill();}noGlow();}
  // motes
  cx.fillStyle='rgba(200,255,250,0.35)';motes.forEach(function(m){circ(m.x*W+Math.sin(TM*0.5+m.p)*8,((m.y-TM*0.01)%1+1)%1*H,1.2);cx.fill();});
}
function drawBubbles(){cx.strokeStyle='rgba(200,255,250,0.55)';cx.lineWidth=1;bubbles.forEach(function(b){var y=((b.y-TM*b.s)%1+1)%1*H,x=b.x*W+Math.sin(TM*2+b.w)*4;circ(x,y,b.r*U/30);cx.stroke();});}
function drawHull(){
  // old boat hull wall behind the stall
  var x0=-U*0.5,x1=W+U*0.5,y0=H*0.12,y1=H*0.6;cx.fillStyle=lg(0,y0,0,y1,[0,'#4a3a2e',1,'#2a2a30']);
  cx.beginPath();cx.moveTo(x0,y1);cx.quadraticCurveTo(W*0.5,y0-U*1.5,x1,y1);cx.closePath();cx.fill();
  cx.strokeStyle='rgba(20,15,12,0.5)';cx.lineWidth=2;for(var i=1;i<6;i++){var yy=y1-(y1-y0)*i/6;cx.beginPath();cx.moveTo(x0+i*U*0.8,yy);cx.quadraticCurveTo(W*0.5,yy-U*1.3*(i/6)-U*0.2,x1-i*U*0.8,yy);cx.stroke();}
  // portholes with teal glow
  [[0.22,0.33],[0.5,0.26],[0.78,0.33]].forEach(function(p){var px=W*p[0],py=H*p[1]-U*0.1;cx.fillStyle='#b8862e';circ(px,py,U*0.72);cx.fill();cx.fillStyle=rg(px,py,0,U*0.6,[0,'#7ff3e6',1,'#0d4b66']);circ(px,py,U*0.55);cx.fill();});
  // shelves with jars
  cx.fillStyle='#5b4330';cx.fillRect(W*0.03,H*0.47,W*0.24,U*0.15);cx.fillRect(W*0.73,H*0.47,W*0.24,U*0.15);
  for(i=0;i<3;i++){var jx=W*(0.07+i*0.08),jx2=W*(0.77+i*0.08);[jx,jx2].forEach(function(x,j){cx.fillStyle=(i+j)%2?'#2b8f9a':'#2c5f88';rr(x-U*0.25,H*0.47-U*0.6,U*0.5,U*0.6,U*0.12);cx.fill();glow('#7ff3e6',8);cx.fillStyle='rgba(127,243,230,.7)';circ(x,H*0.47-U*0.3,U*0.1);cx.fill();noGlow();});}
  // lantern
  var lx=W*0.5+Math.sin(TM*0.8)*U*0.15,ly=H*0.17;cx.strokeStyle='#2a1e14';cx.lineWidth=2;cx.beginPath();cx.moveTo(W*0.5,H*0.08);cx.lineTo(lx,ly-U*0.4);cx.stroke();
  cx.fillStyle=rg(lx,ly,0,U*2.4,[0,'rgba(255,210,74,0.35)',1,'rgba(255,210,74,0)']);circ(lx,ly,U*2.4);cx.fill();
  cx.fillStyle='#8a6424';rr(lx-U*0.35,ly-U*0.45,U*0.7,U*0.9,U*0.15);cx.fill();cx.fillStyle='#ffe68a';glow('#ffd24a',20);rr(lx-U*0.22,ly-U*0.3,U*0.44,U*0.6,U*0.1);cx.fill();noGlow();
}
function drawCoral(){
  // coral reef garage: arch of coral with glowing anemones
  var y1=H*0.6;cx.fillStyle=lg(0,H*0.15,0,y1,[0,'#3a2a6a',1,'#22305a']);cx.beginPath();cx.moveTo(-U,y1);cx.quadraticCurveTo(W*0.5,H*0.02,W+U,y1);cx.closePath();cx.fill();
  for(var i=0;i<9;i++){var bx=W*(i/8),by=y1+U*0.2,col=['#ff8fb8','#b07cff','#ffb36b','#5cffd0'][i%4],h=U*(1.6+(i*37%10)/5);
    cx.strokeStyle=col;cx.lineWidth=U*0.22;cx.lineCap='round';
    for(var b=-1;b<=1;b++){cx.beginPath();cx.moveTo(bx,by);cx.quadraticCurveTo(bx+b*U*0.6,by-h*0.5,bx+b*U*0.9+Math.sin(TM+i+b)*U*0.08,by-h);cx.stroke();
      glow(col,10);cx.fillStyle=col;circ(bx+b*U*0.9+Math.sin(TM+i+b)*U*0.08,by-h,U*0.14);cx.fill();noGlow();}}
  // fish school silhouettes
  cx.fillStyle='rgba(127,243,230,0.25)';for(i=0;i<7;i++){var fx=((TM*0.04+i*0.13)%1.2-0.1)*W,fy=H*0.14+Math.sin(i*1.7+TM)*U*0.6+i*U*0.15;
    cx.beginPath();cx.ellipse(fx,fy,U*0.25,U*0.1,0,0,Math.PI*2);cx.fill();cx.beginPath();cx.moveTo(fx-U*0.22,fy);cx.lineTo(fx-U*0.4,fy-U*0.1);cx.lineTo(fx-U*0.4,fy+U*0.1);cx.fill();}
  var lx=W*0.5,ly=H*0.17;cx.fillStyle=rg(lx,ly,0,U*2.6,[0,'rgba(127,243,230,0.3)',1,'rgba(127,243,230,0)']);circ(lx,ly,U*2.6);cx.fill();
  cx.fillStyle='#ffe68a';glow('#7ff3e6',24);circ(lx,ly,U*0.4);cx.fill();noGlow();
}
function drawBench(b,i){
  var x=b.x,y=b.y,w=U*3.4,h=U*0.9,bi=img('bench');
  if(bi){var bw=U*4.2,bh=bw*bi.height/bi.width;cx.fillStyle='rgba(0,8,20,0.32)';cx.beginPath();cx.ellipse(x,y+bh*0.62,bw*0.48,U*0.3,0,0,Math.PI*2);cx.fill();
    dimg(bi,x-bw/2,y-bh*0.3,bw,bh);
    if(i===1){cx.fillStyle='#ffd24a';circ(x+bw*0.36,y+bh*0.08,U*0.24);cx.fill();txt('2',x+bw*0.36,y+bh*0.08,U*0.3,'#0c1b3d','center',800);}return;}
  cx.fillStyle='rgba(0,0,0,0.25)';cx.beginPath();cx.ellipse(x,y+h*1.6,w*0.6,U*0.3,0,0,Math.PI*2);cx.fill();
  cx.fillStyle=lg(0,y,0,y+h*1.5,[0,'#8a6424',1,'#5b3f17']);rr(x-w/2+U*0.1,y+h*0.3,w-U*0.2,h*1.2,U*0.2);cx.fill();
  cx.fillStyle='#ffd24a';rr(x-w/2+U*0.4,y+h*0.65,U*0.6,U*0.25,U*0.08);cx.fill();rr(x+w/2-U*1.0,y+h*0.65,U*0.6,U*0.25,U*0.08);cx.fill();
  cx.fillStyle=lg(0,y-h*0.2,0,y+h*0.5,[0,'#3fc6c0',1,'#1d7f8a']);rr(x-w/2,y-h*0.2,w,h*0.7,U*0.3);cx.fill();
  cx.strokeStyle='#ffd24a';cx.lineWidth=2;rr(x-w/2,y-h*0.2,w,h*0.7,U*0.3);cx.stroke();
  if(i===1){txt('2',x+w/2-U*0.35,y+h*0.1,U*0.32,'#0c1b3d','center',800);}
}
// ---------- living characters (drawn in code) ----------
// face on a dark glowing screen; expr: idle|happy|annoyed|sad|wow|worried|love
function face(x,y,w,h,expr,blink,ec,look){
  if(!faceGlass){cx.fillStyle='#0b1830';rr(x-w/2,y-h/2,w,h,h*0.35);cx.fill();cx.strokeStyle='rgba(127,243,230,0.35)';cx.lineWidth=1.5;cx.stroke();}
  else{cx.fillStyle='rgba(6,16,36,.55)';rr(x-w/2,y-h/2,w,h,h*0.3);cx.fill();}
  var e=ec||'#6ff7ff',ex=w*0.22,ey=y-h*0.06,er=h*0.17,lk=(look||0)*w*0.05;glow(e,10);cx.fillStyle=e;cx.strokeStyle=e;cx.lineWidth=Math.max(2,h*0.08);cx.lineCap='round';
  [-1,1].forEach(function(s){var px=x+s*ex+lk;
    if(blink>0.5||expr==='happy'||expr==='love'){cx.beginPath();if(blink>0.5&&expr!=='happy'&&expr!=='love'){cx.moveTo(px-er,ey);cx.lineTo(px+er,ey);}else cx.arc(px,ey+er*0.4,er,Math.PI*1.15,Math.PI*1.85);cx.stroke();}
    else if(expr==='wow'){circ(px,ey,er*1.15);cx.fill();cx.fillStyle='#0b1830';circ(px+er*0.35,ey-er*0.4,er*0.35);cx.fill();cx.fillStyle=e;}
    else{rr(px-er*0.75,ey-er*1.1,er*1.5,er*2.2,er*0.7);cx.fill();cx.fillStyle='#0b1830';circ(px+er*0.25,ey-er*0.5,er*0.3);cx.fill();cx.fillStyle=e;
      if(expr==='annoyed'){cx.beginPath();cx.moveTo(px-er*1.1,ey-er*1.6+(s>0?-er*0.5:er*0.5)*-1);cx.lineTo(px+er*1.1,ey-er*1.6+(s>0?er*0.5:-er*0.5)*-1);cx.stroke();}
      if(expr==='sad'||expr==='worried'){cx.beginPath();cx.moveTo(px-er*1.0,ey-er*1.5+(s>0?er*0.4:-er*0.4)*-1);cx.lineTo(px+er*1.0,ey-er*1.5+(s>0?-er*0.4:er*0.4)*-1);cx.stroke();}}});
  cx.beginPath();var my=y+h*0.26;
  if(expr==='happy'||expr==='love')cx.arc(x,my-h*0.05,h*0.13,0.15*Math.PI,0.85*Math.PI);
  else if(expr==='wow'){cx.arc(x,my,h*0.07,0,Math.PI*2);}
  else if(expr==='annoyed'){cx.moveTo(x-h*0.12,my);cx.lineTo(x+h*0.12,my);}
  else if(expr==='sad'||expr==='worried')cx.arc(x,my+h*0.1,h*0.11,1.15*Math.PI,1.85*Math.PI);
  else cx.arc(x,my-h*0.04,h*0.08,0.2*Math.PI,0.8*Math.PI);
  cx.stroke();noGlow();
  if(expr==='love'){cx.fillStyle='#ff9ecf';[-1,1].forEach(function(s){circ(x+s*w*0.36,y+h*0.16,h*0.08);cx.fill();});}
}
var ROBO={fish:{body:'#e8f4f6',acc:'#3fb6c8',f:1},crab:{body:'#3fa6a8',acc:'#2a7f86',f:1},turtle:{body:'#5d8f8a',acc:'#2f6b5a',f:1},horse:{body:'#f0b84a',acc:'#2fa3b8',f:2},puffer:{body:'#f6e27a',acc:'#e0a63a',f:2},octo:{body:'#ffd24a',acc:'#c98d12',f:0}};
// sprite size in U (longest side) and centre offset; animated pieces: wag=[tail start x, pivot y, amp]
var RART={fish:{u:3.3,oy:0,wag:[0.79,0.55,0.32]},crab:{u:3.2,oy:0.05,shuffle:1},turtle:{u:3.3,oy:0.05,paddle:1},horse:{u:3.3,oy:-0.05,tall:1,sway:1},puffer:{u:3.0,oy:0,wag:[0.86,0.5,0.4],puff:1},octo:{u:3.5,oy:-0.1,tall:1,tent:0.58}};
function drawRobotArt(c,x,y,s,im){
  var A=RART[c.type],tt=TM+c.seed,ex=c.expr||'idle',bl=c.blink||0,lk=Math.sin(tt*0.7)*0.8,ec=c.vip?'#fff2a8':null;
  var dw,dh;if(A.tall){dh=U*A.u;dw=dh*im.width/im.height;}else{dw=U*A.u;dh=dw*im.height/im.width;}
  var bob=Math.sin(tt*2.2)*U*0.08*s;cx.save();cx.translate(x+(A.shuffle?Math.sin(tt*2.6)*U*0.08*s:0),y);cx.scale(s*(c.flip||1),s);
  cx.fillStyle='rgba(0,10,25,.22)';cx.beginPath();cx.ellipse(0,A.oy*U+dh*0.5+U*0.12,dw*0.32,U*0.12,0,0,Math.PI*2);cx.fill();
  cx.translate(0,bob);if(c.hop)cx.translate(0,-Math.abs(Math.sin(c.hop*12))*U*0.3);
  var sq=Math.sin(tt*4.4)*0.025+(c.hop?Math.sin(c.hop*24)*0.05:0),tl=Math.sin(tt*1.3)*(A.sway?0.09:0.045);if(A.puff)sq+=Math.sin(tt*1.6)*0.03;
  cx.translate(0,A.oy*U+dh*0.5);cx.rotate(tl);cx.scale(1+sq,1-sq);cx.translate(0,-dh*0.5);
  var x0=-dw/2,y0=-dh/2;
  if(A.wag){var fx=x0+A.wag[0]*dw,py=y0+A.wag[1]*dh;
    cx.save();cx.beginPath();cx.rect(x0-2,y0-2,A.wag[0]*dw+dw*0.03+2,dh+4);cx.clip();dimg(im,x0,y0,dw,dh);cx.restore();
    cx.save();cx.translate(fx,py);cx.rotate(Math.sin(tt*6)*A.wag[2]);cx.translate(-fx,-py);cx.beginPath();cx.rect(fx,y0-dh*0.2,dw,dh*1.4);cx.clip();dimg(im,x0,y0,dw,dh);cx.restore();}
  else if(A.tent){var ty=A.tent,n=9,sh=(1-ty)/n;cx.save();cx.beginPath();cx.rect(x0-dw,y0-2,dw*3,ty*dh+3);cx.clip();dimg(im,x0,y0,dw,dh);cx.restore();
    for(var i=0;i<n;i++){var f=(i+1)/n,ox=Math.sin(tt*3-i*0.55)*U*0.12*f;cx.save();cx.beginPath();cx.rect(x0-dw,y0+(ty+sh*i)*dh-0.5,dw*3,sh*dh+1.2);cx.clip();dimg(im,x0+ox,y0,dw,dh);cx.restore();}}
  else if(A.paddle){var hb=Math.sin(tt*1.5)*dh*0.03;dimg(im,x0,y0,dw,dh);}
  else dimg(im,x0,y0,dw,dh);
  var r=SCR[c.type];if(r){faceGlass=1;face(x0+(r[0]+r[2]/2)*dw,y0+(r[1]+r[3]/2)*dh,r[2]*dw*0.9,Math.max(r[3]*dh*0.9,U*0.42),ex,bl,ec,lk);faceGlass=0;}
  if(c.vip){for(var k=0;k<3;k++){var sa=tt*2+k*2.1;cx.fillStyle='rgba(255,240,170,'+(0.5+0.5*Math.sin(sa*3)).toFixed(2)+')';circ(Math.cos(sa)*dw*0.55,Math.sin(sa)*dh*0.35,U*0.07);cx.fill();}}
  cx.restore();
}
function drawRobot(c,x,y,s){
  var im=img(c.type);if(im&&RART[c.type])return drawRobotArt(c,x,y,s,im);
  var k=ROBO[c.type],b=c.vip?'#ffd24a':k.body,a=c.vip?'#c98d12':k.acc,tt=TM+c.seed,ec=c.vip?'#fff2a8':null;
  var bob=Math.sin(tt*2.2)*U*0.08*s;y+=bob;cx.save();cx.translate(x,y);cx.scale(s*(c.flip||1),s);
  var u=U,ex=c.expr||'idle',bl=c.blink||0,lk=Math.sin(tt*0.7)*0.8;
  if(c.hop){cx.translate(0,-Math.abs(Math.sin(c.hop*12))*u*0.3);}
  cx.lineJoin='round';
  if(c.type==='fish'){var wag=Math.sin(tt*6)*0.35;
    cx.fillStyle=a;cx.save();cx.translate(u*1.0,0);cx.rotate(wag);cx.beginPath();cx.moveTo(0,0);cx.lineTo(u*0.8,-u*0.55);cx.quadraticCurveTo(u*0.6,0,u*0.8,u*0.55);cx.closePath();cx.fill();cx.restore();
    cx.beginPath();cx.moveTo(-u*0.2,-u*0.7);cx.quadraticCurveTo(u*0.2,-u*1.2,u*0.6,-u*0.6);cx.fill();
    cx.fillStyle=lg(0,-u*0.8,0,u*0.8,[0,'#ffffff',1,b]);cx.beginPath();cx.ellipse(0,0,u*1.25,u*0.85,0,0,Math.PI*2);cx.fill();
    cx.strokeStyle=a;cx.lineWidth=3;cx.beginPath();cx.ellipse(0,0,u*1.25,u*0.85,0,0,Math.PI*2);cx.stroke();
    cx.fillStyle=a;cx.save();cx.rotate(Math.sin(tt*4)*0.3);cx.beginPath();cx.ellipse(u*0.1,u*0.55,u*0.35,u*0.15,0.5,0,Math.PI*2);cx.fill();cx.restore();
    face(-u*0.45,-u*0.05,u*1.05,u*0.8,ex,bl,ec,lk);
  }else if(c.type==='crab'){var sn=Math.sin(tt*5);
    cx.strokeStyle=a;cx.lineWidth=u*0.14;cx.lineCap='round';
    for(var i=0;i<3;i++)[-1,1].forEach(function(sd){cx.beginPath();cx.moveTo(sd*u*0.6,u*0.3);cx.lineTo(sd*u*(1.0+i*0.15),u*(0.5+i*0.1)+Math.sin(tt*6+i)*u*0.05);cx.lineTo(sd*u*(1.1+i*0.15),u*(0.85+i*0.05));cx.stroke();});
    [-1,1].forEach(function(sd){cx.save();cx.translate(sd*u*1.15,-u*0.35);cx.rotate(sd*(0.3+sn*0.15));cx.fillStyle=b;cx.beginPath();cx.ellipse(0,0,u*0.38,u*0.3,0,0,Math.PI*2);cx.fill();
      cx.fillStyle='#0b1830';cx.beginPath();cx.moveTo(sd*u*0.05,0);cx.lineTo(sd*u*0.4,-u*0.12-Math.abs(sn)*u*0.08);cx.lineTo(sd*u*0.4,u*0.1);cx.fill();cx.restore();});
    cx.fillStyle=lg(0,-u*0.9,0,u*0.6,[0,'#6fd6d0',1,b]);cx.beginPath();cx.ellipse(0,0,u*0.95,u*0.75,0,Math.PI,0);cx.lineTo(u*0.95,u*0.3);cx.quadraticCurveTo(0,u*0.7,-u*0.95,u*0.3);cx.fill();
    cx.fillStyle='#ffd24a';circ(-u*0.85,-u*0.05,u*0.12);cx.fill();circ(u*0.85,-u*0.05,u*0.12);cx.fill();
    face(0,-u*0.1,u*1.2,u*0.72,ex,bl,ec,lk);
  }else if(c.type==='turtle'){var hd=Math.sin(tt*1.5)*u*0.08;
    cx.fillStyle=a;[-1,1].forEach(function(sd){cx.save();cx.translate(sd*u*1.0,u*0.35);cx.rotate(sd*(0.4+Math.sin(tt*3)*0.25));cx.beginPath();cx.ellipse(sd*u*0.2,0,u*0.45,u*0.17,0,0,Math.PI*2);cx.fill();cx.restore();});
    cx.fillStyle=lg(0,-u,0,u*0.5,[0,'#4f8a5a',1,'#2c5a3c']);cx.beginPath();cx.ellipse(0,0,u*1.25,u*0.95,0,Math.PI,0);cx.quadraticCurveTo(0,u*0.6,-u*1.25,0);cx.fill();
    cx.strokeStyle='#c99a35';cx.lineWidth=3;cx.stroke();cx.strokeStyle='rgba(20,50,30,0.6)';cx.lineWidth=2;
    for(i=-1;i<=1;i++){cx.beginPath();for(var j=0;j<6;j++){var an=j/6*Math.PI*2;cx.lineTo(i*u*0.62+Math.cos(an)*u*0.3,-u*0.45+Math.sin(an)*u*0.25);}cx.closePath();cx.stroke();}
    cx.fillStyle=b;cx.beginPath();cx.ellipse(-u*0.95,-u*0.15+hd,u*0.6,u*0.5,0,0,Math.PI*2);cx.fill();
    face(-u*1.0,-u*0.15+hd,u*0.85,u*0.6,ex,bl,ec,lk);
  }else if(c.type==='horse'){
    cx.strokeStyle=b;cx.lineWidth=u*0.3;cx.lineCap='round';cx.beginPath();cx.moveTo(0,u*0.4);cx.quadraticCurveTo(u*0.5,u*1.1,u*0.1,u*1.25);cx.quadraticCurveTo(-u*0.2,u*1.1,u*0.05,u*0.95);cx.stroke();
    cx.fillStyle=a;for(i=0;i<4;i++){cx.beginPath();cx.moveTo(u*0.45,-u*0.6+i*u*0.3);cx.lineTo(u*0.8+Math.sin(tt*4+i)*u*0.08,-u*0.5+i*u*0.3);cx.lineTo(u*0.45,-u*0.4+i*u*0.3);cx.fill();}
    cx.fillStyle=lg(0,-u,0,u*0.6,[0,'#ffe08a',1,b]);rr(-u*0.55,-u*0.75,u*1.1,u*1.35,u*0.5);cx.fill();
    cx.fillStyle=b;rr(-u*1.0,-u*0.95,u*0.7,u*0.35,u*0.17);cx.fill();
    face(-u*0.05,-u*0.25,u*0.85,u*0.65,ex,bl,ec,lk);
  }else if(c.type==='puffer'){var pf=1+Math.sin(tt*1.6)*0.05;
    cx.fillStyle=a;for(i=0;i<12;i++){var an=i/12*Math.PI*2;cx.beginPath();cx.moveTo(Math.cos(an-0.12)*u*0.9*pf,Math.sin(an-0.12)*u*0.9*pf);cx.lineTo(Math.cos(an)*u*1.2*pf,Math.sin(an)*u*1.2*pf);cx.lineTo(Math.cos(an+0.12)*u*0.9*pf,Math.sin(an+0.12)*u*0.9*pf);cx.fill();}
    cx.fillStyle=rg(-u*0.3,-u*0.3,u*0.1,u*1.1,[0,'#fff6c0',1,b]);circ(0,0,u*0.95*pf);cx.fill();
    cx.fillStyle='#2fa3b8';cx.save();cx.translate(u*0.95,0);cx.rotate(Math.sin(tt*7)*0.4);cx.beginPath();cx.moveTo(0,0);cx.lineTo(u*0.4,-u*0.3);cx.lineTo(u*0.4,u*0.3);cx.fill();cx.restore();
    face(-u*0.15,-u*0.05,u*1.0,u*0.72,ex,bl,ec,lk);
  }else{ // golden VIP octopus
    cx.strokeStyle=b;cx.lineWidth=u*0.22;cx.lineCap='round';
    for(i=0;i<6;i++){var bx=-u*0.75+i*u*0.3;cx.beginPath();cx.moveTo(bx,u*0.3);cx.quadraticCurveTo(bx+Math.sin(tt*3+i)*u*0.4,u*0.85,bx+Math.sin(tt*3+i+1)*u*0.3,u*1.25);cx.stroke();}
    cx.fillStyle=rg(-u*0.3,-u*0.6,u*0.1,u*1.3,[0,'#fff3b0',1,'#e5a920']);cx.beginPath();cx.ellipse(0,-u*0.2,u*1.0,u*0.95,0,0,Math.PI*2);cx.fill();
    cx.fillStyle='#ffe68a';glow('#ffd24a',14);cx.beginPath();cx.moveTo(-u*0.5,-u*1.05);cx.lineTo(-u*0.5,-u*1.45);cx.lineTo(-u*0.25,-u*1.2);cx.lineTo(0,-u*1.55);cx.lineTo(u*0.25,-u*1.2);cx.lineTo(u*0.5,-u*1.45);cx.lineTo(u*0.5,-u*1.05);cx.closePath();cx.fill();noGlow();
    face(0,-u*0.15,u*1.25,u*0.8,ex,bl,ec,lk);
    for(i=0;i<3;i++){var sa=tt*2+i*2.1;cx.fillStyle='rgba(255,240,170,'+(0.5+0.5*Math.sin(sa*3))+')';circ(Math.cos(sa)*u*1.4,Math.sin(sa)*u*0.9-u*0.2,u*0.07);cx.fill();}
  }
  cx.restore();
}
function drawHand(x,y,press){ // tutorial pointer glove
  cx.save();cx.translate(x,y);var s=U/40*(press?0.9:1);cx.scale(s,s);cx.rotate(-0.35);glow('rgba(0,0,0,.5)',8);
  cx.fillStyle='#ffffff';cx.strokeStyle='#0c1b3d';cx.lineWidth=3;
  rr(-7,0,14,34,7);cx.fill();cx.stroke();rr(-16,22,36,30,12);cx.fill();cx.stroke();noGlow();
  if(press){cx.strokeStyle='rgba(255,210,74,.9)';cx.lineWidth=3;circ(0,0,14+Math.sin(TM*10)*3);cx.stroke();}
  cx.restore();
}
var MUKART={muk:{hx:0.628,eyes:[[0.494,0.283],[0.667,0.276]]},muk_wave:{hx:0.549}};
function drawMuk(x,y,s){ // mechanic Muk in a brass diving helmet
  var wv=mukWave>0,mi=(wv&&img('muk_wave'))||img('muk');
  if(mi){var u=U*s,dh=u*3.6,dw=dh*mi.width/mi.height,M=MUKART[mi===IMG.muk_wave?'muk_wave':'muk'],br=Math.sin(TM*2)*0.018;
    cx.save();cx.translate(x,y+u*1.75);cx.fillStyle='rgba(0,8,20,.3)';cx.beginPath();cx.ellipse(0,0,u*0.9,u*0.2,0,0,Math.PI*2);cx.fill();
    cx.rotate(wv?Math.sin(TM*9)*0.05:Math.sin(TM*0.9)*0.02);cx.scale(1-br,1+br);if(wv)cx.translate(0,-Math.abs(Math.sin(TM*9))*u*0.08);
    dimg(mi,-dw*M.hx,-dh,dw,dh);
    if(!wv&&mukBlink>0){M.eyes.forEach(function(e){var ex=-dw*M.hx+e[0]*dw,ey=-dh+e[1]*dh;cx.fillStyle='#f4b57c';cx.beginPath();cx.ellipse(ex,ey,dw*0.06,dh*0.036,0,0,Math.PI*2);cx.fill();
      cx.strokeStyle='#3a2418';cx.lineWidth=Math.max(1.5,u*0.05);cx.lineCap='round';cx.beginPath();cx.arc(ex,ey-dh*0.012,dw*0.05,0.2*Math.PI,0.8*Math.PI);cx.stroke();});}
    cx.restore();return;}
  var u=U*s,br=Math.sin(TM*2)*u*0.03,wave=mukWave>0?Math.sin(TM*14)*0.6:0;cx.save();cx.translate(x,y+br);
  cx.fillStyle='#1d6f78';rr(-u*0.55,u*0.2,u*1.1,u*1.25,u*0.35);cx.fill();cx.fillStyle='#ffd24a';rr(-u*0.55,u*0.85,u*1.1,u*0.15,u*0.05);cx.fill();
  cx.fillStyle='#e8a83a';[-1,1].forEach(function(sd){cx.save();cx.translate(sd*u*0.55,u*0.35);cx.rotate(sd*(0.3+(sd>0?wave:0))-(sd>0&&mukWave>0?1.6:0));rr(-u*0.13,0,u*0.26,u*0.75,u*0.13);cx.fill();cx.restore();});
  cx.fillStyle='#1d4f5a';rr(-u*0.45,u*1.35,u*0.35,u*0.4,u*0.1);cx.fill();rr(u*0.1,u*1.35,u*0.35,u*0.4,u*0.1);cx.fill();
  cx.fillStyle='#b8862e';circ(0,-u*0.3,u*0.72);cx.fill();
  cx.fillStyle=rg(-u*0.2,-u*0.5,u*0.05,u*0.7,[0,'rgba(200,255,250,0.45)',1,'rgba(60,140,170,0.35)']);circ(0,-u*0.3,u*0.6);cx.fill();
  cx.fillStyle='#f6d2b0';circ(0,-u*0.25,u*0.38);cx.fill();cx.fillStyle='#16324a';cx.beginPath();cx.arc(0,-u*0.35,u*0.4,Math.PI*1.05,Math.PI*1.95);cx.fill();
  var bl=mukBlink>0;cx.fillStyle='#16324a';[-1,1].forEach(function(sd){if(bl)cx.fillRect(sd*u*0.14-u*0.06,-u*0.22,u*0.12,u*0.025);else{circ(sd*u*0.14,-u*0.2,u*0.06);cx.fill();}});
  cx.strokeStyle='#c46a4a';cx.lineWidth=2;cx.beginPath();cx.arc(0,-u*0.1,u*0.08,0.15*Math.PI,0.85*Math.PI);cx.stroke();
  cx.strokeStyle='#ffe68a';cx.lineWidth=3;circ(0,-u*0.3,u*0.6);cx.stroke();
  cx.restore();
}
function drawHelper(x,y,working){var u=U*0.85,b=Math.sin(TM*3)*u*0.1,hi=img('helper');
  if(hi){var dw=u*2.3,dh=dw*hi.height/hi.width,x0=-dw/2,y0=-dh/2,cut=0.2;cx.save();cx.translate(x,y+b);cx.rotate(working?Math.sin(TM*14)*0.06:Math.sin(TM*1.5)*0.05);
    cx.save();cx.beginPath();cx.rect(x0-2,y0+dh*cut,dw+4,dh);cx.clip();dimg(hi,x0,y0,dw,dh);cx.restore();
    cx.save();cx.beginPath();cx.rect(x0-2,y0-2,dw+4,dh*cut+2.5);cx.clip();cx.scale(0.25+0.75*Math.abs(Math.cos(TM*16)),1);dimg(hi,x0,y0,dw,dh);cx.restore();
    var r=SCR.helper;faceGlass=1;face(x0+(r[0]+r[2]/2)*dw,y0+(r[1]+r[3]/2)*dh,r[2]*dw*0.9,r[3]*dh*0.9,working?'happy':'idle',helperBlink>0?1:0,'#ffe68a',0);faceGlass=0;
    cx.restore();return;}
  cx.save();cx.translate(x,y+b);
  cx.strokeStyle='#ffd24a';cx.lineWidth=3;cx.beginPath();cx.moveTo(0,-u*0.75);cx.lineTo(0,-u*1.05);cx.stroke();
  cx.fillStyle='#ffd24a';cx.save();cx.translate(0,-u*1.1);cx.scale(Math.cos(TM*18),1);rr(-u*0.45,-u*0.06,u*0.9,u*0.12,u*0.06);cx.fill();cx.restore();
  cx.fillStyle=lg(0,-u*0.8,0,u*0.6,[0,'#8ff0ff',1,'#2a8fb0']);circ(0,0,u*0.75);cx.fill();
  face(0,-u*0.05,u*0.95,u*0.6,working?'happy':'idle',helperBlink>0?1:0,'#ffe68a',0);
  if(working){cx.strokeStyle='#c0d6e0';cx.lineWidth=u*0.12;cx.lineCap='round';cx.save();cx.translate(-u*0.75,u*0.2);cx.rotate(Math.sin(TM*14)*0.5);cx.beginPath();cx.moveTo(0,0);cx.lineTo(-u*0.45,u*0.25);cx.stroke();cx.restore();}
  cx.restore();}
var mukWave=0,mukBlink=0,helperBlink=0;
// ---------- icons ----------
function gearPath(x,y,r,teeth,broken){cx.beginPath();var n=teeth||8;for(var i=0;i<n*2;i++){var a=i/(n*2)*Math.PI*2,rr2=i%2?r*0.78:r;if(broken&&i>n*1.2&&i<n*1.6)rr2=r*0.6;cx.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2);}cx.closePath();}
function drawPart(kind,x,y,r,mode){ // mode: 0 solid, 1 slot outline, 2 broken icon
  var pi=mode!==2&&img(kind);if(pi){var ps=r*2.15/Math.max(pi.width,pi.height);cx.save();if(mode===1)cx.globalAlpha=0.28;else{glow('rgba(0,0,0,.45)',6);}
    dimg(pi,x-pi.width*ps/2,y-pi.height*ps/2,pi.width*ps,pi.height*ps);cx.restore();if(mode===0)return;}
  cx.save();var gold=lg(x,y-r,x,y+r,[0,'#ffe68a',1,'#c98d12']),teal=lg(x,y-r,x,y+r,[0,'#9ff8ff',1,'#2a8fb0']);
  if(mode===1){cx.setLineDash([6,5]);cx.strokeStyle='rgba(127,243,230,.9)';cx.lineWidth=3;glow('#7ff3e6',12);}
  function fin(){if(mode===1)cx.stroke();else{cx.fill();cx.strokeStyle='rgba(12,27,61,.6)';cx.lineWidth=2;cx.stroke();}}
  if(kind==='gear'){cx.fillStyle=gold;gearPath(x,y,r,8,mode===2);fin();if(mode!==1){cx.fillStyle='#0b1830';circ(x,y,r*0.3);cx.fill();}}
  else if(kind==='chip'){cx.fillStyle=teal;if(mode!==1){cx.fillStyle='#c0d6e0';for(var i=-1;i<=1;i++){cx.fillRect(x-r*1.05,y+i*r*0.45-r*0.08,r*0.3,r*0.16);cx.fillRect(x+r*0.75,y+i*r*0.45-r*0.08,r*0.3,r*0.16);}cx.fillStyle=teal;}rr(x-r*0.78,y-r*0.78,r*1.56,r*1.56,r*0.2);fin();if(mode!==1){cx.fillStyle='#0b1830';rr(x-r*0.35,y-r*0.35,r*0.7,r*0.7,r*0.1);cx.fill();}}
  else if(kind==='bulb'){cx.fillStyle=mode===1?'transparent':rg(x,y-r*0.2,0,r,[0,'#fffbe0',1,'#ffd24a']);if(mode===0)glow('#ffd24a',14);cx.beginPath();cx.arc(x,y-r*0.2,r*0.7,Math.PI*0.8,Math.PI*2.2);cx.lineTo(x+r*0.35,y+r*0.75);cx.lineTo(x-r*0.35,y+r*0.75);cx.closePath();fin();noGlow();if(mode!==1){cx.fillStyle='#8aa0b0';cx.fillRect(x-r*0.35,y+r*0.55,r*0.7,r*0.35);}}
  else if(kind==='fin'){cx.fillStyle=teal;cx.beginPath();for(var j=0;j<3;j++){var a=j/3*Math.PI*2-Math.PI/2;cx.moveTo(x,y);cx.ellipse(x+Math.cos(a)*r*0.5,y+Math.sin(a)*r*0.5,r*0.52,r*0.24,a,0,Math.PI*2);}fin();if(mode!==1){cx.fillStyle='#ffd24a';circ(x,y,r*0.2);cx.fill();}}
  cx.restore();
}
function drawIcon(k,x,y,r){var ii=k==='bolt'?img('bolt'):k==='scrub'?img('barn'):null;if(ii){var is=r*2.2/Math.max(ii.width,ii.height);dimg(ii,x-ii.width*is/2,y-ii.height*is/2,ii.width*is,ii.height*is);return;}
  cx.save();
  if(k==='part'){drawPart('gear',x,y,r,2);cx.strokeStyle='#0b1830';cx.lineWidth=2;cx.beginPath();cx.moveTo(x+r*0.1,y-r);cx.lineTo(x-r*0.1,y-r*0.2);cx.lineTo(x+r*0.15,y+r*0.2);cx.stroke();}
  else if(k==='bolt'){cx.fillStyle=lg(x,y-r,x,y+r,[0,'#ffe68a',1,'#c98d12']);cx.beginPath();for(var i=0;i<6;i++){var a=i/6*Math.PI*2;cx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}cx.closePath();cx.fill();cx.strokeStyle='#0b1830';cx.lineWidth=2;cx.beginPath();cx.arc(x,y,r*0.45,0.3,5.5);cx.stroke();}
  else if(k==='wire'){cx.lineWidth=r*0.35;cx.lineCap='round';cx.strokeStyle='#3fe0e0';cx.beginPath();cx.moveTo(x-r,y+r*0.5);cx.quadraticCurveTo(x-r*0.2,y-r,x,y);cx.stroke();cx.strokeStyle='#ff7ad1';cx.beginPath();cx.moveTo(x+r,y-r*0.5);cx.quadraticCurveTo(x+r*0.2,y+r,x+r*0.1,y+r*0.1);cx.stroke();cx.fillStyle='#ffd24a';glow('#ffd24a',8);circ(x+r*0.05,y+r*0.05,r*0.22);cx.fill();noGlow();}
  else if(k==='scrub'){for(var j=0;j<5;j++){cx.fillStyle=j%2?'#8a6a3a':'#5a7a4a';circ(x+Math.cos(j*1.3)*r*0.55,y+Math.sin(j*1.3)*r*0.5,r*(0.32+0.1*(j%2)));cx.fill();cx.fillStyle='#2a2a20';circ(x+Math.cos(j*1.3)*r*0.55,y+Math.sin(j*1.3)*r*0.5-r*0.05,r*0.1);cx.fill();}}
  cx.restore();}
// ---------- particles / floaters ----------
var parts=[],floats=[];
function burst(x,y,n,col,sp){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,v=(0.4+Math.random())*(sp||U*3);parts.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-U,life:0.6+Math.random()*0.5,col:col||'#ffd24a',r:U*(0.05+Math.random()*0.08)});}}
function bubbleBurst(x,y,n){for(var i=0;i<n;i++)parts.push({x:x+(Math.random()-0.5)*U,y:y,vx:(Math.random()-0.5)*U,vy:-U*(1+Math.random()*2),life:0.8+Math.random()*0.6,col:'bub',r:U*(0.06+Math.random()*0.1)});}
function floatTxt(x,y,s){floats.push({x:x,y:y,s:s,life:1.3});}
function updFx(dt){parts.forEach(function(p){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.col==='bub'?-U*0.5:U*3)*dt;p.life-=dt;});parts=parts.filter(function(p){return p.life>0;});
  floats.forEach(function(f){f.y-=U*1.2*dt;f.life-=dt;});floats=floats.filter(function(f){return f.life>0;});}
function drawFx(){parts.forEach(function(p){cx.globalAlpha=Math.min(1,p.life*2);if(p.col==='bub'){cx.strokeStyle='rgba(200,255,250,.8)';cx.lineWidth=1.5;circ(p.x,p.y,p.r);cx.stroke();}else{cx.fillStyle=p.col;circ(p.x,p.y,p.r);cx.fill();}});cx.globalAlpha=1;
  floats.forEach(function(f){cx.globalAlpha=Math.min(1,f.life*1.5);cx.lineWidth=4;cx.strokeStyle='#0c1b3d';cx.font='800 '+Math.round(U*0.5)+'px Kanit, sans-serif';cx.textAlign='center';cx.strokeText(f.s,f.x,f.y);txt(f.s,f.x,f.y,Math.round(U*0.5),'#ffe68a','center',800);});cx.globalAlpha=1;}
// ---------- customers ----------
var custs=[],cid=0,spawnT=1.2,rushT=70,rushOn=0,rushLeft=0,rushSpawnT=0,vipCD=60,R=null,helperJob=null,toastT=0;
var POOL={1:['fish','crab','turtle'],2:['fish','crab','turtle','horse','puffer','horse','puffer']};
var PREF={fish:['part','wire','bolt'],crab:['bolt','scrub','part'],turtle:['scrub','part','bolt'],horse:['wire','bolt','part'],puffer:['scrub','wire','bolt'],octo:['part','bolt','wire','scrub']};
var TUTSEQ=[['fish',['part']],['crab',['bolt']],['turtle',['scrub']],['fish',['wire']]];
function floorMul(){return S.floor===2?1.8:1;}
function maxQ(){return rushOn>0?5:3+(S.bench>1?1:0);}
function freeSlot(){var used={};custs.forEach(function(c){if(c.slot!=null&&(c.state==='in'||c.state==='queue'))used[c.slot]=1;});for(var i=0;i<maxQ();i++)if(!used[i])return i;return -1;}
function qCount(){return custs.filter(function(c){return c.state==='in'||c.state==='queue';}).length;}
function spawn(forceVip){
  var sl=freeSlot();if(sl<0)return null;var type,tasks,vip=false,seq=S.fixed+qCount()+(R?1:0)+(helperJob?1:0);
  if(S.fixed<TUTSEQ.length&&seq<TUTSEQ.length&&!forceVip){type=TUTSEQ[seq][0];tasks=TUTSEQ[seq][1].slice();}
  else{
    if(forceVip||(S.fixed>=4&&vipCD<=0&&Math.random()<0.3)){vip=true;type='octo';vipCD=110;}
    else{var pool=POOL[S.floor];type=pool[Math.floor(Math.random()*pool.length)];}
    var n=vip?3:(type==='horse'||type==='puffer')?2:(S.fixed<5?1:(Math.random()<0.55?1:2));
    tasks=shuffle(PREF[type].slice()).slice(0,n);
  }
  var names=T.th['n_'+(type==='octo'?'octo':type)],idx=Math.floor(Math.random()*names.length),key=type+':'+idx,reg=S.regs[key];
  var pers=['cheery','grumpy','shy'][(idx+type.length)%3],pm=pers==='cheery'?1.2:pers==='grumpy'?0.8:1;
  var sx=sl%2?W+U*2:-U*2,s=SLOTS[sl];
  var c={id:++cid,type:type,key:key,idx:idx,pers:pers,tasks:tasks,vip:vip,rush:rushOn>0,regular:!!reg,seed:Math.random()*10,x:sx,y:s.y+U*0.5,tx:s.x,ty:s.y,slot:sl,state:'in',
    patMax:(rushOn>0?30:45)*pm*(S.tut<2?3:1),expr:'worried',blink:0,nb:1+Math.random()*3,hop:0,flip:1,greet:3};
  c.pat=c.patMax;custs.push(c);play('arrive',{vol:0.5});bubbleBurst(sx,c.y,6);mukWave=1.2;
  if(vip){banner(t('vip'));play('vip');say('vip',1);}else if(reg)setTimeout(function(){say('regular');},500);else if(Math.random()<0.4)setTimeout(function(){say('a_help');},400);
  return c;
}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;}
function cname(c){var n=T[lang]['n_'+c.type]||T.th['n_'+c.type];return n[c.idx%n.length];}
function basePay(c){return Math.round((10+6*c.tasks.length)*floorMul()*(c.vip?3:1));}
function startRush(){rushOn=14;rushLeft=4;rushSpawnT=0.3;banner(t('rush'));play('rush');say('rush',1);musicRate(1.12);}
function updCusts(dt,paused){
  if(!paused&&!R||(!paused&&R)){
    spawnT-=dt;vipCD-=dt;
    if(S.tut>=2&&S.fixed>=3){rushT-=dt;if(rushT<=0&&rushOn<=0){startRush();rushT=80+Math.random()*30;}}
    if(rushOn>0){rushOn-=dt;rushSpawnT-=dt;if(rushSpawnT<=0&&rushLeft>0){if(spawn())rushLeft--;rushSpawnT=1.1;}if(rushOn<=0)musicRate(1);}
    if(spawnT<=0){var limit=S.tut<2?1:maxQ();if(qCount()<limit)spawn();spawnT=S.tut<2?1:6+Math.random()*5;}
  }
  custs.forEach(function(c){
    var k=Math.min(1,dt*(c.state==='out'?1.6:2.6));c.x+=(c.tx-c.x)*k;c.y+=(c.ty-c.y)*k;
    if(Math.abs(c.tx-c.x)>4&&c.type!=='crab'&&c.type!=='octo')c.flip=c.tx>c.x?-1:1;
    c.nb-=dt;if(c.nb<=0){c.blink=0.13;c.nb=2+Math.random()*3.5;}if(c.blink>0)c.blink-=dt;
    if(c.hop>0)c.hop-=dt;if(c.greet>0)c.greet-=dt;if(c.exprT>0){c.exprT-=dt;}
    if(c.state==='in'&&Math.abs(c.tx-c.x)<6){c.state='queue';}
    if(c.state==='queue'||c.state==='in'){
      if(!paused&&!(S.tut<2))c.pat-=dt*(R&&R.c!==c?0.6:1);
      var f=c.pat/c.patMax;if(!(c.exprT>0))c.expr=f>0.5?(c.pers==='cheery'&&Math.sin(TM*0.8+c.seed)>0.3?'happy':'idle'):f>0.25?'worried':'annoyed';
      if(c.pers==='cheery'&&Math.random()<dt*0.15&&f>0.5)c.hop=0.25;
      if(c.pat<=0){leave(c,false);}
    }
    if(c.state==='out'&&(c.x<-U*2.5||c.x>W+U*2.5||Math.abs(c.tx-c.x)<5))c.state='gone';
  });
  custs=custs.filter(function(c){return c.state!=='gone';});
  // helper bot
  if(S.helper>0&&S.bench>1&&!paused){
    if(!helperJob){var cand=custs.filter(function(c){return c.state==='queue'&&c.tasks.length===1&&!c.vip&&(S.tut>=2);})[0];
      if(cand){helperJob={c:cand,t:0,need:7/(1+0.3*(S.helper-1))};cand.state='helper';cand.slot=null;cand.tx=BENCH[1].x;cand.ty=BENCH[1].y-U*1.1;cand.expr='wow';cand.exprT=1;}}
    else{helperJob.t+=dt;if(Math.random()<dt*6)burst(BENCH[1].x+(Math.random()-0.5)*U,BENCH[1].y-U*0.8,2,'#ffe68a',U*1.5);
      if(Math.random()<dt*3)play('ratchet',{vol:0.18});
      if(helperJob.t>=helperJob.need){var hc=helperJob.c,p=basePay(hc);addCoins(p);floatTxt(hc.x,hc.y-U,'+'+p);play('coin',{vol:0.5});S.fixed++;remember(hc,2);hc.expr='happy';hc.exprT=3;hc.hop=0.6;leave(hc,true);helperJob=null;save();}}
  }
}
function leave(c,happy){c.state='out';c.slot=null;c.tx=c.x<W/2?-U*3:W+U*3;c.ty=c.y-U*0.5;
  if(!happy){c.expr='annoyed';c.exprT=5;play('pout');if(toastT<=0){toast(t('left'));say('left');toastT=6;}}else{bubbleBurst(c.x,c.y,8);}}
function remember(c,stars){var r=S.regs[c.key]||{n:0,best:0};r.n++;r.best=Math.max(r.best,stars);r.type=c.type;r.idx=c.idx;S.regs[c.key]=r;}
function drawCustomer(c){
  var s=c.state==='helper'?0.8:0.85;drawRobot(c,c.x,c.y,s);
  if(c.state==='queue'||c.state==='in'){
    // thought bubble with problems
    var bx=c.x+U*0.6,by=c.y-U*1.75,n=c.tasks.length,bw=U*(0.9+0.85*n),bh=U*1.0;
    cx.fillStyle='rgba(240,250,255,.95)';circ(c.x+U*0.35,c.y-U*0.95,U*0.1);cx.fill();circ(c.x+U*0.45,c.y-U*1.15,U*0.14);cx.fill();
    rr(bx-bw/2,by-bh/2,bw,bh,bh/2);cx.fill();
    c.tasks.forEach(function(k,i){drawIcon(k,bx-(n-1)*U*0.42+i*U*0.84,by,U*0.32);});
    var f=Math.max(0,c.pat/c.patMax),pw=U*1.8,py=c.y+U*1.1;cx.fillStyle='rgba(6,18,42,.75)';rr(c.x-pw/2,py,pw,U*0.2,U*0.1);cx.fill();
    cx.fillStyle=f>0.5?'#5cffd0':f>0.25?'#ffd24a':'#ffa04a';rr(c.x-pw/2+1,py+1,(pw-2)*f,U*0.2-2,U*0.09);cx.fill();
    if(c.regular){cx.fillStyle='#ff9ecf';var hx=c.x-U*1.0,hy=c.y-U*0.9;cx.beginPath();cx.moveTo(hx,hy+U*0.15);cx.bezierCurveTo(hx-U*0.3,hy-U*0.05,hx-U*0.1,hy-U*0.3,hx,hy-U*0.12);cx.bezierCurveTo(hx+U*0.1,hy-U*0.3,hx+U*0.3,hy-U*0.05,hx,hy+U*0.15);cx.fill();
      if(c.greet>0){txt(t('remember'),c.x,c.y+U*1.6,Math.round(U*0.32),'#f4fbff','center',600);}}
    if(S.tut===0&&custs.indexOf(c)===0&&!R)drawHand(c.x+U*0.3,c.y+U*0.3+Math.sin(TM*6)*U*0.15,Math.sin(TM*6)>0.5);
  }
  if(c.state==='helper'&&helperJob&&helperJob.c===c){var pr=helperJob.t/helperJob.need;cx.strokeStyle='rgba(6,18,42,.6)';cx.lineWidth=U*0.18;circ(c.x,c.y-U*1.4,U*0.4);cx.stroke();
    cx.strokeStyle='#ffd24a';cx.beginPath();cx.arc(c.x,c.y-U*1.4,U*0.4,-Math.PI/2,-Math.PI/2+pr*Math.PI*2);cx.stroke();}
}
// ---------- repair minigames ----------
var WCOL=['#ffd24a','#3fe0e0','#ff7ad1','#8cff6a'],PARTS=['gear','chip','bulb','fin'],TLIM={part:7,bolt:8,wire:4,scrub:9};
function makeTask(k,c){
  if(k==='part'){var need=PARTS[Math.floor(Math.random()*4)],o=shuffle(PARTS.filter(function(p){return p!==need;})).slice(0,2);o.push(need);
    return {k:k,need:need,opts:shuffle(o).map(function(p){return {p:p,x:0,y:0,hx:0,hy:0};}),drag:null,placed:0};}
  if(k==='bolt')return {k:k,need:Math.max(1.2,2.4-0.22*S.tool)*Math.PI*2,ang:0,prev:null,click:0};
  if(k==='wire'){var n=(S.floor===2||c.type==='horse'||c.type==='puffer'||c.vip)?4:3;return {k:k,n:n,sock:shuffle(Array.from({length:n},function(_,i){return i;})),conn:[],drag:null};}
  if(k==='scrub'){var GX=9,GY=6,g=[];for(var i=0;i<GX*GY;i++)g.push(Math.random()<0.85?2:0);return {k:k,GX:GX,GY:GY,g:g,tot:g.filter(Boolean).length,last:{},snd:0};}
}
function startRepair(c){
  c.state='bench';c.slot=null;c.tx=BENCH[0].x;c.ty=BENCH[0].y-U*1.1;c.expr='worried';
  var tasks=c.tasks.map(function(k){return makeTask(k,c);}),lim=0;
  tasks.forEach(function(tk){lim+=tk.k==='wire'?TLIM.wire+2*tk.n:TLIM[tk.k];});
  R={c:c,tasks:tasks,ti:0,limit:lim*(1+0.1*S.tool)*(c.vip?0.9:1)*(S.fixed<4?1.6:1),left:0,mist:0,timeUp:false,extra:false,done:0,demo:0,open:0.5,flash:0};
  R.left=R.limit;layoutTask();play('pop');taskIntro();$('rbtns').classList.remove('hidden');uiRepair();
}
function cur(){return R&&R.tasks[R.ti];}
function taskIntro(){var tk=cur();if(!tk)return;var key={part:'tPart',bolt:'tBolt',wire:'tWire',scrub:'tScrub'}[tk.k];R.demo=0;
  if(!S.seen[tk.k]){showTip(t(key));say(tk.k,1);}else hideTip();}
function layoutTask(){var tk=cur();if(!tk)return;var cxp=P.x+P.w/2;
  if(tk.k==='part'){tk.sx=cxp;tk.sy=P.y+P.h*0.36;tk.opts.forEach(function(o,i){o.hx=P.x+P.w*(0.2+0.3*i);o.hy=P.y+P.h*0.8;if(!o.drag&&!o.placed){o.x=o.hx;o.y=o.hy;}});}
  if(tk.k==='bolt'){tk.bx=cxp;tk.by=P.y+P.h*0.52;}
  if(tk.k==='wire'){tk.L=[];tk.Rr=[];for(var i=0;i<tk.n;i++){var y=P.y+P.h*(0.22+0.62*i/(tk.n-1));tk.L.push({x:P.x+P.w*0.16,y:y});tk.Rr.push({x:P.x+P.w*0.84,y:y});}}
  if(tk.k==='scrub'){tk.px=P.x+P.w*0.1;tk.py=P.y+P.h*0.16;tk.pw=P.w*0.8;tk.ph=P.h*0.74;}
}
function taskDone(){var tk=cur();S.seen[tk.k]=1;hideTip();play('fixed',{vol:0.6});burst(P.x+P.w/2,P.y+P.h*0.5,18,'#7ff3e6');R.c.expr='wow';R.c.exprT=0.8;R.ti++;R.flash=0.4;
  if(R.ti>=R.tasks.length){finishRepair();}else{layoutTask();setTimeout(function(){if(R){layoutTask();taskIntro();}},350);}save();}
function mistake(x,y){R.mist++;play('nope');burst(x,y,8,'#ffa04a',U*2);R.c.expr='annoyed';R.c.exprT=0.8;if(navigator.vibrate)try{navigator.vibrate(30);}catch(e){}}
function finishRepair(){
  R.done=1;var c=R.c,r=R.left/R.limit,m=R.mist,stars=R.timeUp?1:(r>=0.35&&m===0)?3:(r>0.1&&m<=2)?2:1;
  c.expr=stars===3?'love':'happy';c.exprT=9;c.hop=0.8;play('happy');setTimeout(function(){say(stars===3?'a_wow':'a_thanks',1);},300);
  var base=basePay(c),tip=Math.round(base*[0,0,0.5,1][stars]*(c.rush?1.5:1)*(c.regular?1.2:1)*(c.pers==='grumpy'&&stars===3?1.2:1));
  R.res={stars:stars,base:base,tip:tip};$('rbtns').classList.add('hidden');
  setTimeout(function(){showResult();say(stars===3?'perfect':stars===2?'good':'slow');},900);
}
function endRepair(){var c=R.c;remember(c,R.res.stars);S.fixed++;leave(c,true);R=null;hideTip();
  if(S.tut===0){S.tut=1;showTip(t('tDone'));tutHandUpg=5;setTimeout(function(){if(S.tut===1){S.tut=2;hideTip();save();}},5500);}save();uiDots();}
var tutHandUpg=0;
function useRare(){var tk=cur();if(!R||R.done||!tk||S.rare<=0)return;S.rare--;play('vip',{vol:0.6});burst(P.x+P.w/2,P.y+P.h/2,24,'#ffe68a');taskDone();uiRepair();}
// input
var ptr={down:false,x:0,y:0,id:null};
function pt(e){var b=cv.getBoundingClientRect();return {x:(e.clientX-b.left)*W/b.width,y:(e.clientY-b.top)*H/b.height};}
function d2(a,b,c,d){return Math.hypot(a-c,b-d);}
cv.addEventListener('pointerdown',function(e){audioUnlock();if(isPaused())return;var p=pt(e);ptr.down=true;ptr.x=p.x;ptr.y=p.y;try{cv.setPointerCapture(e.pointerId);}catch(_){}
  if(R&&!R.done)return rDown(p);if(!R)shopTap(p);});
cv.addEventListener('pointermove',function(e){if(!ptr.down||!R||R.done)return;var p=pt(e);rMove(p);ptr.x=p.x;ptr.y=p.y;});
function up(e){if(!ptr.down)return;ptr.down=false;if(R&&!R.done)rUp(pt(e));}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
function shopTap(p){var best=null,bd=U*1.5;custs.forEach(function(c){if(c.state!=='queue'&&c.state!=='in')return;var d=d2(p.x,p.y,c.x,c.y-U*0.3);if(d<bd){bd=d;best=c;}});
  if(best){play('tap');startRepair(best);return;}
  if(d2(p.x,p.y,MUK.x,MUK.y)<U*1.2){mukWave=1;play('happy',{vol:0.5});}}
function rDown(p){var tk=cur();if(!tk)return;
  if(tk.k==='part'){tk.opts.forEach(function(o){if(!o.placed&&d2(p.x,p.y,o.x,o.y)<U*1.0)tk.drag=o;});if(tk.drag)play('tap',{vol:0.5});}
  if(tk.k==='bolt'){tk.prev=Math.atan2(p.y-tk.by,p.x-tk.bx);}
  if(tk.k==='wire'){for(var i=0;i<tk.n;i++)if(tk.conn.indexOf(i)<0&&d2(p.x,p.y,tk.L[i].x,tk.L[i].y)<U*0.9){tk.drag={i:i,x:p.x,y:p.y};play('tap',{vol:0.5});}}
  if(tk.k==='scrub')scrubAt(p);}
function rMove(p){var tk=cur();if(!tk)return;
  if(tk.k==='part'&&tk.drag){tk.drag.x=p.x;tk.drag.y=p.y;}
  if(tk.k==='bolt'&&tk.prev!=null&&d2(p.x,p.y,tk.bx,tk.by)>U*0.4){var a=Math.atan2(p.y-tk.by,p.x-tk.bx),d=a-tk.prev;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;tk.prev=a;
    if(d>0){tk.ang+=d;tk.click+=d;if(tk.click>0.6){tk.click=0;play('ratchet',{vol:0.5,rate:0.9+tk.ang/tk.need*0.4});bubbleBurst(tk.bx,tk.by,1);}if(tk.ang>=tk.need){tk.prev=null;taskDone();}}}
  if(tk.k==='wire'&&tk.drag){tk.drag.x=p.x;tk.drag.y=p.y;}
  if(tk.k==='scrub')scrubAt(p);}
function rUp(p){var tk=cur();if(!tk)return;
  if(tk.k==='part'&&tk.drag){var o=tk.drag;tk.drag=null;if(d2(o.x,o.y,tk.sx,tk.sy)<U*1.3){if(o.p===tk.need){o.placed=1;o.x=tk.sx;o.y=tk.sy;play('snap');burst(tk.sx,tk.sy,12,'#ffe68a');setTimeout(taskDone,300);}else{mistake(tk.sx,tk.sy);o.x=o.hx;o.y=o.hy;}}else{o.x=o.hx;o.y=o.hy;}}
  if(tk.k==='bolt')tk.prev=null;
  if(tk.k==='wire'&&tk.drag){var dr=tk.drag;tk.drag=null;for(var j=0;j<tk.n;j++){var s=tk.Rr[j];if(d2(p.x,p.y,s.x,s.y)<U*0.95){if(tk.sock[j]===dr.i){tk.conn.push(dr.i);play('zap',{vol:0.6});burst(s.x,s.y,10,WCOL[dr.i]);if(tk.conn.length>=tk.n)setTimeout(taskDone,250);}else mistake(s.x,s.y);return;}}}}
function scrubAt(p){var tk=cur(),cw=tk.pw/tk.GX,ch=tk.ph/tk.GY,rad=U*(0.75+0.1*S.tool),now=TM,hit=false;
  for(var i=0;i<tk.g.length;i++){if(!tk.g[i])continue;var gx=tk.px+(i%tk.GX+0.5)*cw,gy=tk.py+(Math.floor(i/tk.GX)+0.5)*ch;
    if(d2(p.x,p.y,gx,gy)<rad&&(!tk.last[i]||now-tk.last[i]>0.07)){tk.g[i]--;tk.last[i]=now;hit=true;if(!tk.g[i]&&Math.random()<0.5)bubbleBurst(gx,gy,2);}}
  if(hit&&now-tk.snd>0.12){tk.snd=now;play('scrub',{vol:0.45,rate:0.9+Math.random()*0.3});}
  var left=0;tk.g.forEach(function(v){if(v)left++;});tk.left=left;if(left<=tk.tot*0.06&&!tk.fin){tk.fin=1;for(i=0;i<tk.g.length;i++)tk.g[i]=0;taskDone();}}
// repair drawing
function drawRepair(){
  cx.fillStyle='rgba(3,10,26,'+Math.min(0.72,(0.5-R.open+0.5)*0.72)+')';cx.fillRect(0,0,W,H);
  var c=R.c;drawRobot(c,W*0.42,H*0.205,1.55);
  // timer ring
  var tx=W-U*1.35,ty=H*0.2,tr=U*0.85,f=Math.max(0,R.left/R.limit);cx.fillStyle='rgba(6,18,42,.85)';circ(tx,ty,tr+U*0.2);cx.fill();
  cx.lineWidth=U*0.22;cx.strokeStyle='rgba(127,243,230,.2)';circ(tx,ty,tr);cx.stroke();cx.strokeStyle=f>0.5?'#5cffd0':f>0.25?'#ffd24a':'#ffa04a';cx.lineCap='round';
  cx.beginPath();cx.arc(tx,ty,tr,-Math.PI/2,-Math.PI/2+f*Math.PI*2);cx.stroke();txt(Math.ceil(R.left)+'',tx,ty,Math.round(U*0.55),'#f4fbff','center',800);
  // panel
  var pni=img('panel'),i;
  if(pni){glow('rgba(0,0,0,.6)',18);dimg(pni,P.x-P.w*0.03,P.y-P.h*0.03,P.w*1.06,P.h*1.06);noGlow();}
  else{cx.fillStyle=lg(0,P.y,0,P.y+P.h,[0,'#2a3a52',1,'#161f33']);rr(P.x,P.y,P.w,P.h,U*0.6);cx.fill();cx.strokeStyle='#c99a35';cx.lineWidth=U*0.12;rr(P.x+U*0.15,P.y+U*0.15,P.w-U*0.3,P.h-U*0.3,U*0.5);cx.stroke();
  for(i=0;i<4;i++){cx.fillStyle='#8aa0b0';circ(P.x+(i%2?P.w-U*0.45:U*0.45),P.y+(i<2?U*0.45:P.h-U*0.45),U*0.12);cx.fill();}}
  if(R.flash>0){cx.fillStyle='rgba(127,243,230,'+R.flash+')';rr(P.x,P.y,P.w,P.h,U*0.6);cx.fill();}
  // step chip
  var tk=cur();
  for(i=0;i<R.tasks.length;i++){cx.fillStyle=i<R.ti?'#5cffd0':i===R.ti?'#ffd24a':'rgba(255,255,255,.25)';circ(P.x+P.w/2+(i-(R.tasks.length-1)/2)*U*0.45,P.y-U*0.35,U*0.13);cx.fill();}
  if(!tk){return;}
  txt(t({part:'kPart',bolt:'kBolt',wire:'kWire',scrub:'kScrub'}[tk.k]),P.x+P.w/2,P.y+P.h*0.125,Math.round(U*0.42),'#f4fbff','center',800);
  var demo=!S.seen[tk.k],ph=(TM*0.6)%1;
  if(tk.k==='part'){drawPart(tk.need,tk.sx,tk.sy,U*1.0,1);if(!tk.drag&&!tk.opts.some(function(o){return o.placed;})){glow('#7ff3e6',20);}
    cx.fillStyle='rgba(127,243,230,.08)';circ(tk.sx,tk.sy,U*1.35);cx.fill();noGlow();
    tk.opts.forEach(function(o){cx.fillStyle='rgba(6,18,42,.6)';circ(o.hx,o.hy,U*0.95);cx.fill();});
    tk.opts.forEach(function(o){if(o!==tk.drag)drawPart(o.p,o.x,o.y,U*0.75,0);});if(tk.drag)drawPart(tk.drag.p,tk.drag.x,tk.drag.y,U*0.85,0);
    if(demo&&!tk.drag){var o=tk.opts.filter(function(q){return q.p===tk.need;})[0],e=Math.min(1,ph*1.4);drawHand(o.hx+(tk.sx-o.hx)*e,o.hy+(tk.sy-o.hy)*e,ph<0.75);}}
  if(tk.k==='bolt'){var pr=tk.ang/tk.need;cx.strokeStyle='rgba(127,243,230,.25)';cx.lineWidth=U*0.5;circ(tk.bx,tk.by,U*2.3);cx.stroke();
    cx.strokeStyle='#ffd24a';cx.lineWidth=U*0.18;cx.beginPath();cx.arc(tk.bx,tk.by,U*2.3,-Math.PI/2,-Math.PI/2+Math.min(1,pr)*Math.PI*2);cx.stroke();
    for(i=0;i<3;i++){var aa=TM*1.5+i*2.09;cx.fillStyle='rgba(255,210,74,.8)';cx.save();cx.translate(tk.bx+Math.cos(aa)*U*2.3,tk.by+Math.sin(aa)*U*2.3);cx.rotate(aa+Math.PI/2);cx.beginPath();cx.moveTo(U*0.2,0);cx.lineTo(-U*0.15,-U*0.15);cx.lineTo(-U*0.15,U*0.15);cx.fill();cx.restore();}
    var ski=img('sock'),bti=img('bolt'),bs=U*(0.95-0.15*pr);
    if(ski&&bti){dimg(ski,tk.bx-U*1.45,tk.by-U*1.45,U*2.9,U*2.9);cx.save();cx.translate(tk.bx,tk.by);cx.rotate(tk.ang);var bw2=bs*2.3,bh2=bw2*bti.height/bti.width;glow('rgba(0,0,0,.5)',8);dimg(bti,-bw2/2,-bh2/2,bw2,bh2);noGlow();cx.restore();}
    else{
    cx.fillStyle='#3a4a62';circ(tk.bx,tk.by,U*1.25);cx.fill();cx.save();cx.translate(tk.bx,tk.by);cx.rotate(tk.ang);
    cx.fillStyle=lg(0,-bs,0,bs,[0,'#ffe68a',1,'#c98d12']);cx.beginPath();for(i=0;i<6;i++){var a=i/6*Math.PI*2;cx.lineTo(Math.cos(a)*bs,Math.sin(a)*bs);}cx.closePath();cx.fill();cx.strokeStyle='#8a6424';cx.lineWidth=2;cx.stroke();
    cx.fillStyle='#8a6424';rr(-bs*0.15,-bs*0.6,bs*0.3,bs*1.2,3);cx.fill();cx.restore();}
    if(demo){var ha=TM*3;drawHand(tk.bx+Math.cos(ha)*U*2.3,tk.by+Math.sin(ha)*U*2.3,true);}}
  if(tk.k==='wire'){for(i=0;i<tk.n;i++){var L=tk.L[i],Rr=tk.Rr[i];
      var ws=img('sock');if(ws){dimg(ws,Rr.x-U*0.62,Rr.y-U*0.62,U*1.24,U*1.24);cx.fillStyle='#0b1830';circ(Rr.x,Rr.y,U*0.3);cx.fill();cx.strokeStyle=WCOL[tk.sock[i]];cx.lineWidth=U*0.12;glow(WCOL[tk.sock[i]],8);circ(Rr.x,Rr.y,U*0.3);cx.stroke();noGlow();}
      else{cx.fillStyle='#0b1830';circ(Rr.x,Rr.y,U*0.5);cx.fill();cx.strokeStyle=WCOL[tk.sock[i]];cx.lineWidth=U*0.16;circ(Rr.x,Rr.y,U*0.42);cx.stroke();}
      cx.fillStyle='#8aa0b0';rr(L.x-U*0.8,L.y-U*0.12,U*0.5,U*0.24,4);cx.fill();}
    tk.conn.forEach(function(ci){var j=tk.sock.indexOf(ci);wireLine(tk.L[ci],tk.Rr[j],WCOL[ci],true);});
    for(i=0;i<tk.n;i++){if(tk.conn.indexOf(i)>=0)continue;var dr=tk.drag&&tk.drag.i===i;if(dr)wireLine(tk.L[i],tk.drag,WCOL[i],false);
      cx.fillStyle=WCOL[i];glow(WCOL[i],dr?16:6);circ(dr?tk.drag.x:tk.L[i].x,dr?tk.drag.y:tk.L[i].y,U*0.34);cx.fill();noGlow();}
    if(demo&&!tk.drag){var di=[0,1,2,3].filter(function(q){return q<tk.n&&tk.conn.indexOf(q)<0;})[0];if(di!=null){var dj=tk.sock.indexOf(di),e2=Math.min(1,ph*1.4);drawHand(tk.L[di].x+(tk.Rr[dj].x-tk.L[di].x)*e2,tk.L[di].y+(tk.Rr[dj].y-tk.L[di].y)*e2,ph<0.75);}}}
  if(tk.k==='scrub'){cx.fillStyle=lg(tk.px,tk.py,tk.px+tk.pw,tk.py+tk.ph,[0,'#d8eef2',0.5,'#9cc4cf',1,'#5f8ea0']);rr(tk.px,tk.py,tk.pw,tk.ph,U*0.4);cx.fill();cx.strokeStyle='#c99a35';cx.lineWidth=U*0.08;cx.stroke();for(var rv=0;rv<4;rv++){cx.fillStyle='#8a6424';circ(tk.px+(rv%2?tk.pw-U*0.3:U*0.3),tk.py+(rv<2?U*0.3:tk.ph-U*0.3),U*0.09);cx.fill();}
    cx.strokeStyle='rgba(255,255,255,.15)';cx.lineWidth=2;for(i=1;i<4;i++){cx.beginPath();cx.moveTo(tk.px+tk.pw*i/4,tk.py+U*0.2);cx.lineTo(tk.px+tk.pw*i/4-U*0.6,tk.py+tk.ph-U*0.2);cx.stroke();}
    var cw=tk.pw/tk.GX,ch=tk.ph/tk.GY;for(i=0;i<tk.g.length;i++){if(!tk.g[i])continue;var gx=tk.px+(i%tk.GX+0.5)*cw,gy=tk.py+(Math.floor(i/tk.GX)+0.5)*ch,rs=Math.min(cw,ch)*(tk.g[i]>1?0.62:0.4);
      var bni=img(tk.g[i]>1?'barn':'barn2');if(bni){var bsz=rs*1.75;cx.save();cx.translate(gx,gy);cx.rotate(i*1.7);dimg(bni,-bsz/2,-bsz/2,bsz,bsz*bni.height/bni.width);cx.restore();continue;}
      for(var b=0;b<3;b++){var ox=Math.cos(i*2.3+b*2.1)*rs*0.45,oy=Math.sin(i*1.7+b*2.1)*rs*0.45;cx.fillStyle=(i+b)%3===0?'#8a6a3a':(i+b)%3===1?'#5a7a4a':'#a08a5a';circ(gx+ox,gy+oy,rs*0.55);cx.fill();cx.fillStyle='rgba(20,20,15,.7)';circ(gx+ox,gy+oy-rs*0.1,rs*0.16);cx.fill();}}
    if(demo){var zx=tk.px+tk.pw*(0.25+0.5*(0.5+0.5*Math.sin(TM*5))),zy=tk.py+tk.ph*(0.35+0.3*Math.sin(TM*1.3));drawHand(zx,zy,true);}
    if(ptr.down){cx.strokeStyle='rgba(127,243,230,.5)';cx.lineWidth=2;circ(ptr.x,ptr.y,U*(0.75+0.1*S.tool));cx.stroke();}}
}
function wireLine(a,b,col,done){cx.strokeStyle='#0b1830';cx.lineWidth=U*0.3;cx.lineCap='round';cx.beginPath();cx.moveTo(a.x,a.y);cx.bezierCurveTo(a.x+U*1.5,a.y,b.x-U*1.5,b.y,b.x,b.y);cx.stroke();
  cx.strokeStyle=col;cx.lineWidth=U*0.2;if(done)glow(col,8);cx.stroke();noGlow();}
// ---------- UI ----------
function toast(s){var e=$('toast');e.textContent=s;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on');},2200);}
function banner(s){$('banner-t').textContent=s;$('banner').classList.remove('hidden');clearTimeout(banner.t);banner.t=setTimeout(function(){$('banner').classList.add('hidden');},2600);}
function showTip(s){var e=$('tip');e.textContent=s;e.classList.remove('hidden');}
function hideTip(){$('tip').classList.add('hidden');}
var shownCoins=Math.round(S.coins);$('coins').textContent=shownCoins;
function addCoins(n){S.coins+=n;uiDots();}
function hud(){var d=Math.round(S.coins);if(shownCoins!==d){shownCoins+=Math.sign(d-shownCoins)*Math.max(1,Math.ceil(Math.abs(d-shownCoins)*0.2));$('coins').textContent=shownCoins;}
  $('floorname').textContent=t('f'+S.floor);}
function applyLang(){document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t);});$('btn-lang').textContent=lang==='th'?'EN':'TH';document.documentElement.lang=lang;$('adbtn-t').textContent=t('rareBtn');uiRepair();}
function isPaused(){return !$('modal').classList.contains('hidden')||adOpen||!$('splash').classList.contains('hidden');}
function openModal(html,center){$('sheet').innerHTML=html;$('modal').classList.toggle('center',!!center);$('modal').classList.remove('hidden');}
function closeModal(){$('modal').classList.add('hidden');$('sheet').innerHTML='';}
var STAR='<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.7 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z" fill="#ffd24a" stroke="#0c1b3d" stroke-width="1"/></svg>',STAR0=STAR.replace('#ffd24a','#3a4a6a');
var ICO={tool:'<svg viewBox="0 0 24 24"><path d="M22 6.5l-3.6 3.6-2.5-.4-.4-2.5L19.1 3.6A6 6 0 0 0 11.6 11L3 19.6 4.4 21l8.6-8.6a6 6 0 0 0 9-5.9z"/></svg>',
 bench:'<svg viewBox="0 0 24 24"><path d="M2 8h20v4H2zM4 12h3v8H4zM17 12h3v8h-3z"/></svg>',helper:'<svg viewBox="0 0 24 24"><path d="M11 1h2v3h-2zM5 4h14v2H5zM12 7a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm-3 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z"/></svg>'};
function costs(){return {tool:S.tool>=5?null:Math.round(40*Math.pow(1.9,S.tool)),bench:S.bench>1?null:150,helper:S.helper>0?null:260,helperL:S.helper<1||S.helper>=4?null:Math.round(300*Math.pow(2,S.helper-1)),floor2:600};}
function row(ic,title,desc,btn){return '<div class="row"><div class="ic">'+ic+'</div><div class="tx"><b>'+title+'</b>'+desc+'</div>'+btn+'</div>';}
function buyBtn(k,c,extra){if(c==null)return '<span class="tag">'+(extra||t('max'))+'</span>';return '<button class="buy" data-buy="'+k+'"'+(S.coins<c?' disabled':'')+'>'+c+'</button>';}
function panel(p){play('tap');var co=costs(),h='';
  if(p==='upg'){h='<h2>'+t('upT')+'</h2>'+row(ICO.tool,t('upTool')+' · '+t('lv',{n:S.tool}),t('upToolD'),buyBtn('tool',co.tool))+row(ICO.bench,t('upBench'),t('upBenchD'),buyBtn('bench',co.bench,t('owned')))+
    row(ICO.helper,t('upHelp'),S.bench>1?t('upHelpD'):t('needBench'),S.bench>1?buyBtn('helper',co.helper,t('owned')):'<span class="tag">—</span>')+(S.helper>0?row(ICO.helper,t('upHelpL')+' · '+t('lv',{n:S.helper}),t('upHelpLD'),buyBtn('helperL',co.helperL)):'');}
  if(p==='floors'){h='<h2>'+t('nFloor')+'</h2>';[1,2,3,4].forEach(function(f){var un=S.floors.indexOf(f)>=0,b;
      if(f>2)b='<span class="tag">'+t('soon')+'</span>';else if(S.floor===f)b='<span class="tag">'+t('here')+'</span>';else if(un)b='<button class="buy" data-go="'+f+'">'+t('go')+'</button>';else b='<button class="buy" data-buy="floor2"'+(S.coins<co.floor2?' disabled':'')+'>'+t('unlock')+' '+co.floor2+'</button>';
      h+='<div class="floor f'+f+(f>2||!un&&f>1?' lock':'')+'"><div class="tx"><b>'+t('f'+f)+'</b>'+t('f'+f+'d')+'</div>'+b+'</div>';});}
  if(p==='regs'){h='<h2>'+t('regT')+'</h2><p>'+t('regD')+'</p>';var ks=Object.keys(S.regs).sort(function(a,b){return S.regs[b].n-S.regs[a].n;});
    if(!ks.length)h+='<p>'+t('regNone')+'</p>';ks.slice(0,30).forEach(function(k){var r=S.regs[k],n=cname({type:r.type,idx:r.idx});h+=row(ICO.heart,n,t('visits',{n:r.n})+' · '+'★'.repeat(r.best),'<span class="tag">'+(r.n>=2?t('regular'):'')+'</span>');});}
  h+='<div class="btns"><button class="b-no" data-close="1">'+t('close')+'</button></div>';openModal(h);}
$('bar').addEventListener('click',function(e){var b=e.target.closest('.nb');if(!b||R||!$('splash').classList.contains('hidden'))return;audioUnlock();panel(b.dataset.p);if(tutHandUpg>0)tutHandUpg=0;});
$('sheet').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;audioUnlock();
  if(b.dataset.close){play('tap');closeModal();return;}
  if(b.dataset.buy){var k=b.dataset.buy,c=costs()[k];if(c==null)return;if(S.coins<c){play('nope');toast(t('noMoney'));return;}S.coins-=c;
    if(k==='tool'){S.tool++;say('upgrade',1);}if(k==='bench'){S.bench=2;layout();say('bench',1);}if(k==='helper'){S.helper=1;say('helper',1);}if(k==='helperL'){S.helper++;say('upgrade',1);}
    if(k==='floor2'){S.floors.push(2);play('unlock');say('unlock',1);banner(t('unlocked'));goFloor(2);closeModal();save();uiDots();return;}
    play('upgrade');burst(W/2,H*0.5,20,'#ffe68a');save();uiDots();panel(k==='floor2'?'floors':'upg');return;}
  if(b.dataset.go){goFloor(+b.dataset.go);closeModal();return;}
  if(b.dataset.res){resolveResult(b.dataset.res);return;}
  if(b.dataset.ad){var cb=adCb;adCb=null;closeModal();if(cb)cb(b.dataset.ad==='yes');return;}
  if(b.dataset.wel){welcomeDone(b.dataset.wel);return;}});
function goFloor(f){if(R)return;if(f===2)preload2();S.floor=f;custs.forEach(function(c){if(c.state!=='out')leave(c,true);});helperJob=null;spawnT=1;play('arrive');bubbleBurst(W/2,H*0.5,30);toast(t('moved',{f:t('f'+f)}));save();}
function uiDots(){var co=costs(),any=['tool','bench','helper','helperL'].some(function(k){return co[k]!=null&&S.coins>=co[k]&&(k!=='helper'||S.bench>1);});
  document.querySelector('[data-p=upg]').classList.toggle('has',any);document.querySelector('[data-p=floors]').classList.toggle('has',S.floors.indexOf(2)<0&&S.coins>=co.floor2);}
function uiRepair(){$('b-rare').classList.toggle('hidden',!(R&&!R.done&&S.rare>0));$('rare-t').textContent=t('useRare',{n:S.rare});$('time-t').textContent=t('timeBtn');}
$('b-rare').addEventListener('click',function(){audioUnlock();useRare();});
$('b-time').addEventListener('click',function(){audioUnlock();if(!R||R.extra)return;adOffer(t('offTime'),function(){if(R&&!R.done){R.extra=true;R.left+=10;R.timeUp=false;R.limit=Math.max(R.limit,R.left);play('upgrade');toast('+10');}});});
$('adbtn').addEventListener('click',function(){audioUnlock();if(R)return;adOffer(t('offRare'),function(){S.rare++;S.ad.rare++;play('vip');toast(t('rareBtn')+' +1');save();});});
$('btn-mute').addEventListener('click',function(){audioUnlock();S.mute=!S.mute;setMute();save();});
$('btn-lang').addEventListener('click',function(){audioUnlock();play('tap');lang=S.lang=lang==='th'?'en':'th';applyLang();save();});
// result card
function showResult(){var r=R.res,c=R.c,h='<h2>'+t('resT')+'</h2><div class="stars">'+[1,2,3].map(function(i){return i<=r.stars?STAR:STAR0;}).join('')+'</div>'+
  '<p>'+cname(c)+(c.regular?' · '+t('regular'):'')+(c.vip?' · VIP':'')+'</p>'+
  '<div class="row"><div class="tx">'+t('pay')+'</div><b>'+r.base+'</b></div><div class="row"><div class="tx">'+t('tipL')+'</div><b>'+r.tip+'</b></div><div class="big">+'+(r.base+r.tip)+'</div>';
  if(r.tip>0&&adAvailable())h+='<div class="offer"><p>'+t('offX2',{n:r.tip})+'</p><div class="btns"><button class="b-yes" data-res="ad">'+t('watch')+'</button><button class="b-no" data-res="no">'+t('noThanks')+'</button></div></div>';
  else h+='<div class="btns"><button class="b-yes" data-res="no">'+t('collect')+'</button></div>';
  openModal(h,true);play('star');}
function resolveResult(k){if(!R||!R.res)return;var r=R.res;closeModal();
  function pay(mult){var n=r.base+r.tip*mult;addCoins(n);floatTxt(R.c.x,R.c.y-U*1.2,'+'+n);play('tip');burst(R.c.x,R.c.y,16,'#ffd24a');endRepair();}
  if(k==='ad'){startAd(function(ok){if(ok){say('x2',1);pay(2);}else pay(1);});}else pay(1);}
// ---------- rewarded ads (opt-in, mock adapter; reward stated first; caps + cooldown; early close = nothing) ----------
var Ads=window.SRRAds||{name:'none',ready:function(){return false;}},AD={cap:12,cooldown:45,watch:5,rareCap:3},adOpen=null,adCb=null,urlNoAds=/[?&]noads/.test(location.search);
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function adAvailable(){if(urlNoAds||!(Ads.ready&&Ads.ready()))return false;if(S.ad.day!==today()){S.ad.day=today();S.ad.count=0;S.ad.rare=0;}
  return S.ad.count<AD.cap&&Date.now()-S.ad.last>=AD.cooldown*1000;}
function adOffer(text,grant){if(!adAvailable()){toast(t('adNone'));return;}play('tap');
  adCb=function(yes){if(yes)startAd(function(ok){if(ok)grant();});};
  openModal('<h2>'+t('rewardT')+'</h2><p>'+text+'</p><div class="btns"><button class="b-yes" data-ad="yes">'+t('watch')+'</button><button class="b-no" data-ad="no">'+t('noThanks')+'</button></div>',true);}
function startAd(done){if(!adAvailable()){toast(t('adNone'));done(false);return;}S.ad.count++;S.ad.last=Date.now();save();if(master)master.gain.value=0;
  adOpen={t0:performance.now(),w:AD.watch,done:false,cb:done};renderAd();adTick();$('ad').classList.remove('hidden');}
function renderAd(){var left=Math.max(0,Math.ceil(adOpen.w-(performance.now()-adOpen.t0)/1000));
  $('ad').innerHTML='<button class="adx" data-a="close">×</button><div class="adl">'+t('adLabel')+' · '+t('adTest')+'</div><img src="logo.png" alt=""><div class="adt">Kairon Arcade</div>'+
   (adOpen.done?'<div class="adt">'+t('adDone')+'</div><div class="btns" style="width:80%"><button class="b-yes" data-a="claim">'+t('claim')+'</button></div>':'<div class="adc" id="adc">'+left+'</div><div class="adl">'+t('adWait')+'</div>');}
function adTick(){if(!adOpen)return;var left=Math.ceil(adOpen.w-(performance.now()-adOpen.t0)/1000);if(left<=0&&!adOpen.done){adOpen.done=true;renderAd();return;}if(!adOpen.done){var c=$('adc');if(c)c.textContent=left;}setTimeout(adTick,200);}
$('ad').addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b||!adOpen)return;var ok=adOpen.done,cb=adOpen.cb;adOpen=null;$('ad').classList.add('hidden');setMute();
  if(!ok)toast(t('adEarly'));cb(ok);uiDots();});
// ---------- offline earnings ----------
var welAmt=0;
function offlineRate(){return (S.helper>0?5+4*(S.helper-1):1)*(S.floors.indexOf(2)>=0?1.8:1);}
function checkOffline(){var away=(Date.now()-(S.last||Date.now()))/60000;if(away<2||S.fixed<1)return false;away=Math.min(180,away);welAmt=Math.floor(away*offlineRate());if(welAmt<5)return false;
  var h='<h2>'+t('welT')+'</h2><p>'+t('welD')+'</p><div class="big">+'+welAmt+'</div><p>'+t('welCap')+'</p>';
  if(adAvailable())h+='<div class="offer"><p>'+t('offWel',{n:welAmt})+'</p><div class="btns"><button class="b-yes" data-wel="ad">'+t('watch')+'</button><button class="b-no" data-wel="no">'+t('noThanks')+'</button></div></div>';
  else h+='<div class="btns"><button class="b-yes" data-wel="no">'+t('collect')+'</button></div>';
  openModal(h,true);setTimeout(function(){say('welcome',1);},400);return true;}
function welcomeDone(k){closeModal();function pay(m){addCoins(welAmt*m);floatTxt(W/2,H*0.45,'+'+welAmt*m);play('tip');burst(W/2,H*0.45,20,'#ffd24a');welAmt=0;save();}
  if(k==='ad')startAd(function(ok){if(ok){say('x2',1);pay(2);}else pay(1);});else pay(1);}
// ---------- main loop ----------
var last=performance.now(),saveT=0;
function frame(now){var dt=Math.min(0.05,(now-last)/1000);last=now;TM+=dt;var paused=isPaused();
  if(!$('splash').classList.contains('hidden')){drawSplash();requestAnimationFrame(frame);return;}
  if(toastT>0)toastT-=dt;if(mukWave>0)mukWave-=dt;else if(!R&&Math.random()<dt/9)mukWave=1.1;mukBlink-=dt;if(mukBlink<-3)mukBlink=0.12;helperBlink-=dt;if(helperBlink<-2.5)helperBlink=0.12;if(tutHandUpg>0)tutHandUpg-=dt;
  updCusts(dt,paused);updFx(dt);
  if(R){if(R.open>0)R.open-=dt*2;if(R.flash>0)R.flash-=dt;if(!paused&&!R.done){R.left-=dt;if(R.left<=0&&!R.timeUp){R.left=0;R.timeUp=true;R.c.expr='annoyed';R.c.exprT=99;play('pout');say('a_hmph',1);toast(t('timeUp'));}
      if(R.left<5&&R.left>0&&Math.floor(R.left*2)!==Math.floor((R.left+dt)*2))play('tick',{vol:0.4});}
    $('b-time').classList.toggle('hidden',!(!R.done&&!R.extra&&R.left<R.limit*0.35&&adAvailable()));}
  else $('b-time').classList.add('hidden');
  $('adbtn').classList.toggle('hidden',!(!R&&S.tut>=2&&adAvailable()&&S.ad.rare<AD.rareCap));
  $('bar').style.visibility=R?'hidden':'visible';
  saveT+=dt;if(saveT>5){saveT=0;save();}
  hud();draw();requestAnimationFrame(frame);}
function draw(){cx.setTransform(DPR,0,0,DPR,0,0);drawBG();
  drawBench(BENCH[0],0);if(S.bench>1){drawBench(BENCH[1],1);if(S.helper>0)drawHelper(BENCH[1].x+U*1.3,BENCH[1].y-U*1.7,!!helperJob);}
  drawMuk(MUK.x,MUK.y,1);
  custs.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(c){if(!R||R.c!==c)drawCustomer(c);});
  if(rushOn>0){cx.fillStyle='rgba(127,243,230,.10)';for(var i=0;i<6;i++){var y=H*(0.2+i*0.1)+Math.sin(TM*2+i)*U*0.3;cx.fillRect(((TM*1.5+i*0.3)%1.4-0.2)*W,y,U*3,U*0.08);}}
  drawBubbles();
  if(R)drawRepair();
  drawFx();
  if(tutHandUpg>0&&!R){var b=document.querySelector('[data-p=upg]').getBoundingClientRect(),g=cv.getBoundingClientRect();drawHand(b.left-g.left+b.width/2,b.top-g.top-U*0.2+Math.sin(TM*6)*U*0.2,Math.sin(TM*6)>0.5);}
}
// splash: Muk and a robot fish drawn in code
var spc=$('spc'),spx=spc.getContext('2d'),spFish={type:'fish',seed:1,expr:'happy',blink:0,flip:1};
function drawSplash(){var oc=cx,oU=U;cx=spx;U=34;spx.setTransform(1,0,0,1,0,0);spx.clearRect(0,0,440,340);
  cx.fillStyle=rg(220,180,10,200,[0,'rgba(127,243,230,.25)',1,'rgba(127,243,230,0)']);circ(220,180,200);cx.fill();
  spFish.expr=Math.sin(TM*1.3)>0.6?'love':'happy';spFish.blink=(TM%3)<0.12?1:0;drawRobot(spFish,295,165,1.75);drawMuk(112,148,1.45);drawBubbles2();cx=oc;U=oU;}
function drawBubbles2(){cx.strokeStyle='rgba(200,255,250,.6)';cx.lineWidth=2;for(var i=0;i<8;i++){var y=340-((TM*40+i*47)%340);circ(60+i*45+Math.sin(TM*2+i)*6,y,4+i%3*2);cx.stroke();}}
function begin(){if($('splash').classList.contains('hidden'))return;audioUnlock();$('splash').classList.add('hidden');play('pop');
  setTimeout(function(){if(!checkOffline()&&S.fixed===0){say('hello',1);setTimeout(function(){if(S.tut===0)showTip(t('tTap'));},200);}else if(S.tut===0)showTip(t('tTap'));},300);}
$('splash').addEventListener('pointerdown',begin);
document.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')begin();});
document.addEventListener('visibilitychange',function(){if(document.hidden){save();if(AC)AC.suspend();}else if(AC)AC.resume();});
window.addEventListener('pagehide',save);
resize();applyLang();setMute();uiDots();requestAnimationFrame(frame);
})();
