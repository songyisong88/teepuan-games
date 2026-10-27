/* Brick Arena · ศึกอิฐอารีนา · Kairon Arcade — original code, original art. */
(function(){'use strict';
var META={"h1": {"idle": [226, 253, 0.448], "blink": [224, 251, 0.455], "atk": [241, 253, 0.422]}, "h2": {"idle": [170, 301, 0.372], "blink": [160, 300, 0.394], "atk": [260, 293, 0.796]}, "h3": {"idle": [224, 257, 0.493], "blink": [218, 258, 0.498], "atk": [253, 255, 0.452]}, "h4": {"idle": [203, 287, 0.565], "blink": [196, 286, 0.554], "atk": [232, 286, 0.37]}, "h5": {"idle": [167, 265, 0.504], "blink": [162, 265, 0.503], "atk": [209, 265, 0.347]}, "h6": {"idle": [206, 287, 0.533], "blink": [204, 286, 0.536], "atk": [289, 295, 0.38]}, "h7": {"idle": [217, 243, 0.524], "blink": [211, 238, 0.52], "atk": [254, 236, 0.433]}, "h8": {"idle": [194, 286, 0.61], "blink": [190, 287, 0.594], "atk": [185, 343, 0.497]}, "h9": {"idle": [206, 299, 0.499], "blink": [203, 299, 0.5], "atk": [251, 304, 0.483]}, "h10": {"idle": [241, 272, 0.504], "blink": [232, 269, 0.505], "atk": [257, 278, 0.479]}, "e1_1": [270, 300, 0.533], "e1_2": [244, 300, 0.627], "e1_3": [265, 300, 0.504], "e1_4": [300, 248, 0.458], "e2_1": [280, 300, 0.459], "e2_2": [292, 300, 0.495], "e2_3": [194, 300, 0.507], "e2_4": [203, 300, 0.499], "e3_1": [227, 300, 0.601], "e3_2": [220, 300, 0.636], "e3_3": [273, 300, 0.48], "e3_4": [213, 300, 0.559], "e4_1": [300, 259, 0.528], "e4_2": [300, 254, 0.5], "e4_3": [300, 232, 0.474], "e4_4": [258, 269, 0.543], "e5_1": [262, 300, 0.504], "e5_2": [240, 300, 0.579], "e5_3": [256, 300, 0.436], "e5_4": [209, 300, 0.562], "b1": [560, 448, 0.582], "b2": [560, 466, 0.576], "b3": [446, 560, 0.429], "b4": [560, 416, 0.51], "b5": [560, 370, 0.593], "i_coin": [153, 160], "i_gem": [160, 155], "i_energy": [104, 160], "i_star": [160, 158], "i_soul": [116, 160], "i_exp": [105, 160], "i_ticket": [160, 119], "i_chest1": [160, 147], "i_chest2": [160, 144], "g_helm": [128, 160], "g_armor": [160, 146], "g_boots": [160, 138], "g_sword": [145, 160], "g_ring": [140, 160], "g_amulet": [121, 160], "i_scroll": [160, 120], "s_slash": [128, 126], "s_arrow": [128, 127], "s_bomb": [128, 127], "s_bolt": [128, 127], "s_heal": [128, 128], "s_shield": [128, 128], "s_stun": [128, 128], "s_summon": [128, 127], "s_buff": [128, 128], "s_ice": [127, 128], "s_punch": [127, 128], "s_heart": [127, 128], "h11": {"idle": [247, 275, 0.468], "blink": [241, 268, 0.46], "atk": [248, 314, 0.41]}, "h12": {"idle": [251, 319, 0.456], "blink": [239, 314, 0.469], "atk": [269, 316, 0.512]}, "h13": {"idle": [238, 254, 0.343], "blink": [221, 253, 0.359], "atk": [283, 253, 0.263]}, "h14": {"idle": [240, 199, 0.509], "blink": [230, 202, 0.514], "atk": [265, 208, 0.498]}, "h15": {"idle": [235, 322, 0.513], "blink": [229, 316, 0.522], "atk": [254, 310, 0.447]}, "h16": {"idle": [186, 355, 0.38], "blink": [184, 353, 0.382], "atk": [259, 338, 0.418]}, "h17": {"idle": [253, 265, 0.505], "blink": [240, 262, 0.502], "atk": [258, 242, 0.471]}, "h18": {"idle": [216, 266, 0.484], "blink": [203, 264, 0.463], "atk": [282, 264, 0.331]}, "h19": {"idle": [229, 250, 0.485], "blink": [221, 247, 0.489], "atk": [280, 260, 0.385]}, "h20": {"idle": [251, 283, 0.495], "blink": [241, 282, 0.498], "atk": [262, 284, 0.509]}, "e6_1": [215, 300, 0.566], "e6_2": [259, 300, 0.626], "e6_3": [250, 300, 0.504], "e6_4": [244, 257, 0.356], "e7_1": [223, 300, 0.504], "e7_2": [201, 300, 0.574], "e7_3": [249, 300, 0.506], "e7_4": [264, 300, 0.612], "e8_1": [247, 300, 0.606], "e8_2": [215, 300, 0.581], "e8_3": [259, 300, 0.522], "e8_4": [292, 249, 0.455], "e9_1": [242, 300, 0.622], "e9_2": [288, 212, 0.414], "e9_3": [235, 300, 0.502], "e9_4": [266, 256, 0.439], "e10_1": [218, 300, 0.608], "e10_2": [253, 300, 0.757], "e10_3": [300, 294, 0.554], "e10_4": [242, 300, 0.496], "e11_1": [237, 300, 0.634], "e11_2": [295, 237, 0.219], "e11_3": [255, 300, 0.496], "e11_4": [244, 264, 0.305], "b6": [560, 405, 0.586], "b7": [560, 488, 0.627], "b8": [560, 447, 0.507], "b9": [560, 536, 0.521], "b10": [560, 489, 0.528], "b11": [560, 441, 0.515], "i_scale": [139, 160], "i_medal": [155, 160], "i_raidcoin": [154, 160], "i_mail": [160, 135], "i_cal": [146, 160], "i_crown": [160, 137], "i_crystal": [124, 160], "i_key": [112, 160], "i_frag": [117, 160], "i_wagon": [160, 159], "i_cup": [145, 160], "i_friend": [158, 160], "i_rscroll": [160, 129], "i_bag": [149, 160], "i_potion": [105, 160], "i_gold": [160, 122], "s_fire": [128, 126], "s_poison": [128, 127], "s_web": [128, 127], "s_wind": [128, 127], "s_light": [128, 127], "s_dark": [128, 127], "s_katana": [128, 128], "s_bell": [128, 127], "s_leaf": [127, 128], "s_star": [128, 128], "s_gun": [127, 128], "s_wave": [128, 127], "b12": [515, 560, 0.498]};
var NHERO=20,NZONE=11;var VER=1,SKEY='kairon_brickarena_save';
var FW=390,LH=844;
var SOUNDS=['btn','back','hit','hit2','crit','slash','arrow','magic','boom','bomb','zap','freeze','heal','shield','buff','stun','summon','crumble','death','ultready','cutin','coin','gem','chest','pop','rare','levelup','star','equip','fuse','upgrade','nope','tick','warn','roar','bossdie','wave','fight','win','lose','ad','mus_hub','mus_battle','mus_battle2','mus_boss','mus_boss2',
 'v_hello','v_start','v_u1','v_u2','v_u3','v_u4','v_u5','v_u6','v_u7','v_u8','v_u9','v_u10','v_ready','v_win','v_lose','v_boss','v_boss2','v_wave','v_combo','v_crit','v_down','v_star3','v_levelup','v_fuse','v_awaken','v_gacha','v_rare','v_hero','v_energy','v_tap1','v_tap2','v_tap3','v_sweep','v_surv','v_u11','v_u12','v_u13','v_u14','v_u15','v_u16','v_u17','v_u18','v_u19','v_u20','v_arena','v_raid','v_dungeon','v_login','v_quest','v_claim','v_rank','v_last','v_nm'];
var LAZY={};(function(){for(var h=1;h<=20;h++)for(var k=1;k<=3;k++)LAZY['v_t'+h+'_'+k]=1;})();
var $=function(i){return document.getElementById(i);};
var Q=(function(){var o={},s=location.search.replace(/^\?/,'').split('&');s.forEach(function(p){if(!p)return;var k=p.split('=');o[k[0]]=decodeURIComponent(k[1]||'1');});return o;})();
/* ---------- helpers ---------- */
var rnd=Math.random;function rr(a,b){return a+rnd()*(b-a);}
function ri(a,b){return Math.floor(a+rnd()*(b-a+1));}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function pick(a){return a[Math.floor(rnd()*a.length)];}
function lerp(a,b,t){return a+(b-a)*t;}
function fmt(n){n=Math.round(n);if(n>=1e6)return (n/1e6).toFixed(1)+'M';if(n>=1e4)return (n/1e3).toFixed(1)+'K';return String(n);}
function fmtN(n){return Math.round(n).toLocaleString('en-US');}
function mmss(s){s=Math.max(0,Math.ceil(s));var m=Math.floor(s/60);return m+':'+(s%60<10?'0':'')+(s%60);}
var NOW=function(){return Date.now();};
if(Q.t)NOW=function(){return Number(Q.t);}; // test: fixed clock
/* ---------- save ---------- */
function defHero(own){return {own:own?1:0,lv:1,exp:0,star:1,frag:0,grade:1,gear:[0,0,0,0,0,0],fuse:{hp:0,atk:0,def:0,mdef:0,as:0,crit:0},sk:[1,1,1,1],awk:0,awm:[0,0,0],af:0,trial:0};}
function defSave(){var H={};for(var i=1;i<=NHERO;i++)H[i]=defHero(i<=5);
 return {v:VER,coins:2500,gems:60,energy:60,enT:0,plv:1,pexp:0,tickets:8,potS:6,potL:0,bag:{},heroes:H,team:[1,2,3,4,5],
  camp:{n:{},h:{}},daily:{day:'',heroic:{},freeCoin:0,freeGem:0,fgT:0,surv:0,adN:0,feast:{noon:0,eve:0},tutAd:0},
  surv:{act:0,stage:0,units:null,team:null,chests:0,best:0},auto:{},mute:false,tut:{battle:0,ult:0},pity:{c:0,g:0},stats:{battles:0,wins:0,kills:0,ults:0,pulls:0},lastZone:1,mode:'n',lastLv:1};}
function merge(d,s){for(var k in d){if(s[k]===undefined)s[k]=d[k];else if(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k]))s[k]=merge(d[k],s[k]);}return s;}
function loadSave(){var s=null;try{s=JSON.parse(localStorage.getItem(SKEY));}catch(e){}if(!s||typeof s!=='object')return defSave();s.v=VER;return merge(defSave(),s);}
var SAVE=loadSave();
function save(){try{localStorage.setItem(SKEY,JSON.stringify(SAVE));}catch(e){}}
/* ---------- audio ---------- */
var AC=null,BUF={},master=null,lastPlay={},voicePlaying=0,MUS={name:'',a:null,b:null,ga:0,gb:0,wantB:0,curB:0,vol:.34};
function audioInit(){if(AC){if(AC.state==='suspended')AC.resume();return;}
 try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
 master=AC.createGain();master.gain.value=SAVE.mute?0:1;master.connect(AC.destination);
 SOUNDS.forEach(function(n){fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;if(MUS.want&&n.indexOf('mus_'+MUS.want)===0)music(MUS.want,MUS.wantB,true);}).catch(function(){});});}
function music(name,layer2,force){MUS.want=name;MUS.wantB=layer2?1:0;if(!AC)return;
 if(MUS.name===name&&!force){return;}
 var base=BUF['mus_'+name];if(!base)return;var t=AC.currentTime+.05;
 if(MUS.a){var oa=MUS.a,og=MUS.ga;og.gain.cancelScheduledValues(0);og.gain.setTargetAtTime(0,AC.currentTime,.25);try{oa.stop(AC.currentTime+1.2);}catch(e){}if(MUS.b){MUS.gb.gain.setTargetAtTime(0,AC.currentTime,.25);try{MUS.b.stop(AC.currentTime+1.2);}catch(e){}}}
 function mk(b,g){var s=AC.createBufferSource();s.buffer=b;s.loop=true;var gn=AC.createGain();gn.gain.value=g;s.connect(gn);gn.connect(master);s.start(t);return [s,gn];}
 var a=mk(base,0),b2=BUF['mus_'+name+'2']?mk(BUF['mus_'+name+'2'],0):null;
 a[1].gain.setTargetAtTime(MUS.vol,AC.currentTime+.05,.3);
 MUS.name=name;MUS.a=a[0];MUS.ga=a[1];MUS.b=b2?b2[0]:null;MUS.gb=b2?b2[1]:null;MUS.curB=-1;}
function musicLayer(on){MUS.wantB=on?1:0;if(MUS.gb&&MUS.curB!==MUS.wantB){MUS.curB=MUS.wantB;MUS.gb.gain.setTargetAtTime(MUS.wantB?MUS.vol*.9:0,AC.currentTime,.5);}}
function sfx(n,vol,rate,gap){if(!AC||!BUF[n]||SAVE.mute)return;var now=AC.currentTime;if(lastPlay[n]&&now-lastPlay[n]<(gap==null?.04:gap))return;lastPlay[n]=now;var s=AC.createBufferSource();s.buffer=BUF[n];if(rate)s.playbackRate.value=rate;var g=AC.createGain();g.gain.value=vol==null?.8:vol;s.connect(g);g.connect(master);s.start();}
function lazySnd(n){if(!AC||BUF[n]||LAZY[n]===2)return;LAZY[n]=2;fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){AC.decodeAudioData(b,ok,no);});}).then(function(d){BUF[n]=d;}).catch(function(){});}
function say(n,force){if(!AC||SAVE.mute)return false;if(!BUF['v_'+n]){if(LAZY['v_'+n])lazySnd('v_'+n);return false;}var now=AC.currentTime;if(!force&&now<voicePlaying)return false;var b=BUF['v_'+n];voicePlaying=now+b.duration+.2;var s=AC.createBufferSource();s.buffer=b;var g=AC.createGain();g.gain.value=1.1;s.connect(g);g.connect(master);s.start();return true;}
function setMute(m){SAVE.mute=m;save();if(master)master.gain.value=m?0:1;document.querySelectorAll('.sndb').forEach(function(b){b.classList.toggle('off',m);});}
/* ---------- assets ---------- */
var IM={},loaded=0,toLoad=[];
function artList(){var a=['title','logo_'];for(var i=1;i<=NHERO;i++){a.push('h'+i+'_idle','h'+i+'_blink','h'+i+'_atk','p'+i);}
 a.push('b12');for(var z=1;z<=NZONE;z++){a.push('bg'+z,'b'+z);for(var j=1;j<=4;j++)a.push('e'+z+'_'+j);}
 ['coin','gem','energy','star','soul','exp','ticket','chest1','chest2','scroll','scale','medal','raidcoin','mail','cal','crown','crystal','key','frag','wagon','cup','friend','rscroll','bag','potion','gold'].forEach(function(n){a.push('i_'+n);});
 ['helm','armor','boots','sword','ring','amulet'].forEach(function(n){a.push('g_'+n);});
 ['slash','arrow','bomb','bolt','heal','shield','stun','summon','buff','ice','punch','heart','fire','poison','web','wind','light','dark','katana','bell','leaf','star','gun','wave'].forEach(function(n){a.push('s_'+n);});return a.filter(function(n){return n!=='logo_';});}
function loadArt(done,prog){var L=artList();var n=0;L.forEach(function(k){var im=new Image();im.onload=im.onerror=function(){n++;if(prog)prog(n/L.length);if(n>=L.length)done();};im.src='art/'+k+'.webp';IM[k]=im;});}
/* ---------- layout ---------- */
var W=390,H=844,SC=1,DPR=1,cv,cx,gameEl;
function layout(){var iw=window.innerWidth,ih=window.innerHeight;W=Math.min(iw,Math.floor(ih*0.5625));H=ih;gameEl.style.width=W+'px';gameEl.style.height=H+'px';document.documentElement.style.fontSize=(W/39)+'px';DPR=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);SC=W/FW;LH=H/SC;}
/* ---------- data ---------- */
var CLS={tank:{n:'แทงค์',c:'#4aa8f4'},dmg:{n:'สายดาเมจ',c:'#ff6a4a'},ctl:{n:'สายควบคุม',c:'#b36cf0'},sup:{n:'สายซัพพอร์ต',c:'#5fd36b'}};
var SYM={G:{n:'ผู้พิทักษ์',c:'#4aa8f4',d:'พลังชีวิต +12% เกราะ +12%',a:{hp:.12,def:.12,mdef:.12}},M:{n:'จอมเวท',c:'#b36cf0',d:'พลังโจมตี +15%',a:{atk:.15}},S:{n:'สายว่องไว',c:'#5fd36b',d:'ตีเร็ว +12% คริ +8%',a:{as:.12,crit:.08}},T:{n:'ช่างกล',c:'#ff9a2a',d:'พลังโจมตี +12% เกราะ +8%',a:{atk:.12,def:.08}},W:{n:'สหายสัตว์',c:'#c98a4a',d:'พลังชีวิต +10% โจมตี +10%',a:{hp:.1,atk:.1}}};
var GRADES=[null,{n:'ขาว',c:'#e8ecf4'},{n:'เขียว',c:'#5fd36b'},{n:'น้ำเงิน',c:'#4aa8f4'},{n:'ม่วง',c:'#b36cf0'},{n:'ส้ม',c:'#ffab1c'}];
var SLOTS=[{n:'หมวก',ic:'g_helm'},{n:'เกราะ',ic:'g_armor'},{n:'รองเท้า',ic:'g_boots'},{n:'ดาบ',ic:'g_sword'},{n:'แหวน',ic:'g_ring'},{n:'สร้อย',ic:'g_amulet'}];
var TIERM=[0,1,1.9,3.4,5.8];
/* skill kinds: dmg heal shield buff debuff taunt power revive  | tgt: one all row rand weak splash low self */
var HEROES=[null,
{id:1,n:'ลีโอ',t:'อัศวินสิงห์แดง',cls:'tank',line:0,dt:'p',melee:1,col:'#e8453c',sym:['G','T'],lead:'G',hp:900,atk:38,def:30,mdef:18,as:1.5,crit:.05,
 sk:[{n:'ค้อนอิฐทุบพื้น',ic:'s_punch',k:'dmg',tgt:'all',c:1.5,st:{stun:1.4},fx:'punch',sf:'boom',v:1},
     {n:'โล่สิงห์',ic:'s_shield',cd:9,k:'shield',tgt:'self',c:3.2,dur:7,fx:'shield',sf:'shield'},
     {n:'ยั่วโมโห',ic:'s_stun',cd:14,k:'taunt',tgt:'self',dur:5,red:.35,fx:'buff',sf:'buff'},
     {n:'ธงกองทัพ',ic:'s_buff',cd:16,k:'buff',tgt:'all',stat:'def',pct:.28,dur:9,fx:'buff',sf:'buff'}],
 awk:{n:'ใจสิงห์',d:'สะท้อนความเสียหาย 18% กลับไปหาศัตรู',p:'thorn'},voice:'u1'},
{id:2,n:'มิว',t:'นินจาแมวดำ',cls:'dmg',line:1,dt:'p',melee:1,col:'#6a5acd',sym:['S','W'],lead:'S',hp:520,atk:62,def:12,mdef:10,as:1.0,crit:.12,
 sk:[{n:'คุไนสายฟ้า',ic:'s_slash',k:'dmg',tgt:'rand',h:6,iv:.12,c:.72,fx:'slash',sf:'slash',v:1},
     {n:'ฟันเงา',ic:'s_slash',cd:5,k:'dmg',tgt:'weak',c:1.7,fx:'slash',sf:'slash'},
     {n:'ควันหายตัว',ic:'s_buff',cd:12,k:'buff',tgt:'self',stat:'as',pct:.45,dur:7,fx:'buff',sf:'buff'},
     {n:'ลอบสังหาร',ic:'s_punch',cd:15,k:'dmg',tgt:'weak',c:3.4,pierce:.5,fx:'slash',sf:'crit'}],
 awk:{n:'เงาไร้สุ้มเสียง',d:'ฮีลตัวเอง 10% ของความเสียหายที่ทำ',p:'ls'},voice:'u2'},
{id:3,n:'จี๊ด',t:'นักบินจรวด',cls:'dmg',line:2,dt:'p',melee:0,col:'#ff9a2a',sym:['S','T'],lead:null,hp:430,atk:66,def:8,mdef:8,as:1.35,crit:.08,
 sk:[{n:'จรวดมหาประลัย',ic:'s_bomb',k:'dmg',tgt:'all',c:2.0,st:{burn:[.25,3]},fx:'bomb',sf:'bomb',v:1},
     {n:'ยิงรัว',ic:'s_bolt',cd:6,k:'dmg',tgt:'one',h:3,iv:.14,c:.62,fx:'bolt',sf:'arrow'},
     {n:'ระเบิดควัน',ic:'s_ice',cd:12,k:'dmg',tgt:'all',c:.6,st:{slow:4},fx:'bomb',sf:'boom'},
     {n:'โหมดเทอร์โบ',ic:'s_buff',cd:16,k:'buff',tgt:'self',stat:'atk',pct:.45,dur:8,fx:'buff',sf:'buff'}],
 awk:{n:'นักบินไร้เทียมทาน',d:'พลังเพิ่มเร็วขึ้น 35%',p:'pw'},voice:'u3'},
{id:4,n:'อ๊บอ๊บ',t:'พ่อมดกบ',cls:'ctl',line:1,dt:'m',melee:0,col:'#3aa86a',sym:['M'],lead:'M',hp:450,atk:58,def:8,mdef:14,as:1.4,crit:.06,
 sk:[{n:'พายุคริสตัลน้ำแข็ง',ic:'s_ice',k:'dmg',tgt:'all',c:1.25,st:{frz:2.6},fx:'ice',sf:'freeze',v:1},
     {n:'ลูกบอลเมือก',ic:'s_summon',cd:5,k:'dmg',tgt:'one',c:1.4,st:{slow:3.5},fx:'magic',sf:'magic'},
     {n:'คาถาหลับใหล',ic:'s_stun',cd:12,k:'dmg',tgt:'rand',h:2,iv:.2,c:.5,st:{stun:2.6},fx:'magic',sf:'zap'},
     {n:'เสียงอ๊บสะกด',ic:'s_heart',cd:16,k:'debuff',tgt:'all',stat:'atk',pct:.25,dur:7,st:{sil:3.5},fx:'magic',sf:'magic'}],
 awk:{n:'ราชากบเวทมนตร์',d:'ความเสียหายคริติคอล +40%',p:'cd'},voice:'u4'},
{id:5,n:'หมอฮาร์ท',t:'หุ่นยนต์หมอ',cls:'sup',line:2,dt:'m',melee:0,col:'#ff7aa8',sym:['G','T'],lead:null,hp:500,atk:40,def:10,mdef:16,as:1.5,crit:.04,
 sk:[{n:'ฮีลทั้งทีม',ic:'s_heal',k:'heal',tgt:'all',c:2.6,cleanse:1,fx:'heal',sf:'heal',v:1},
     {n:'ยาเม็ดซ่อมบำรุง',ic:'s_heart',cd:6,k:'heal',tgt:'low',c:1.9,fx:'heal',sf:'heal'},
     {n:'โล่นาโน',ic:'s_shield',cd:14,k:'shield',tgt:'all',c:1.5,dur:8,fx:'shield',sf:'shield'},
     {n:'ชาร์จพลัง',ic:'s_bolt',cd:18,k:'power',tgt:'all',amt:160,fx:'buff',sf:'buff'}],
 awk:{n:'เครื่องซ่อมอัจฉริยะ',d:'ฮีลแรงขึ้น 25% และฟื้นเองเมื่อล้ม (1 ครั้ง)',p:'rev'},voice:'u5'},
{id:6,n:'ฮูก้า',t:'นกฮูกนักธนู',cls:'dmg',line:2,dt:'p',melee:0,col:'#a88a4a',sym:['M','S'],lead:null,hp:440,atk:60,def:9,mdef:11,as:1.1,crit:.14,
 sk:[{n:'ธนูห่าฝน',ic:'s_arrow',k:'dmg',tgt:'rand',h:9,iv:.1,c:.56,fx:'arrow',sf:'arrow',v:1},
     {n:'ลูกศรทะลวง',ic:'s_arrow',cd:5,k:'dmg',tgt:'one',c:1.6,pierce:.45,fx:'arrow',sf:'arrow'},
     {n:'ตาเหยี่ยว',ic:'s_buff',cd:13,k:'buff',tgt:'self',stat:'crit',pct:.3,dur:8,fx:'buff',sf:'buff'},
     {n:'ลูกศรพัน',ic:'s_arrow',cd:14,k:'dmg',tgt:'all',c:.95,fx:'arrow',sf:'arrow'}],
 awk:{n:'ตาทิพย์ราตรี',d:'ความเสียหายคริติคอล +40%',p:'cd'},voice:'u6'},
{id:7,n:'ลุงบอมบ์',t:'ช่างระเบิดแคระ',cls:'dmg',line:1,dt:'p',melee:0,col:'#d9602a',sym:['T'],lead:'T',hp:620,atk:54,def:14,mdef:10,as:1.6,crit:.06,
 sk:[{n:'ระเบิดลูกใหญ่',ic:'s_bomb',k:'dmg',tgt:'all',c:2.3,st:{stun:.9},fx:'bomb',sf:'bomb',v:1},
     {n:'ลูกระเบิดกลิ้ง',ic:'s_bomb',cd:5,k:'dmg',tgt:'splash',c:1.25,fx:'bomb',sf:'boom'},
     {n:'ระเบิดเพลิง',ic:'s_summon',cd:13,k:'dmg',tgt:'all',c:.5,st:{burn:[.3,4]},fx:'bomb',sf:'boom'},
     {n:'เหล็กหนักๆ',ic:'s_punch',cd:16,k:'debuff',tgt:'all',stat:'def',pct:.3,dur:8,fx:'punch',sf:'boom'}],
 awk:{n:'ช่างระเบิดผู้ยิ่งใหญ่',d:'ฮีลตัวเอง 10% ของความเสียหายที่ทำ',p:'ls'},voice:'u7'},
{id:8,n:'ลูน่า',t:'กระต่ายนักบวช',cls:'sup',line:2,dt:'m',melee:0,col:'#e8a8ff',sym:['M','W'],lead:null,hp:480,atk:40,def:9,mdef:16,as:1.5,crit:.04,
 sk:[{n:'แสงรุ่งอรุณ',ic:'s_heart',k:'heal',tgt:'all',c:1.8,revive:.45,fx:'heal',sf:'heal',v:1},
     {n:'ลูกแสงรักษา',ic:'s_heal',cd:5,k:'heal',tgt:'low',c:1.6,fx:'heal',sf:'heal'},
     {n:'ขนปุยป้องกัน',ic:'s_shield',cd:14,k:'buff',tgt:'all',stat:'def',pct:.25,dur:9,fx:'buff',sf:'buff'},
     {n:'พรจันทรา',ic:'s_buff',cd:16,k:'buff',tgt:'all',stat:'atk',pct:.22,dur:9,fx:'buff',sf:'buff'}],
 awk:{n:'พรแห่งจันทร์เต็มดวง',d:'พลังเพิ่มเร็วขึ้น 35%',p:'pw'},voice:'u8'},
{id:9,n:'ดรีมมี่',t:'นักเป่าขลุ่ยเรียกมังกร',cls:'ctl',line:1,dt:'m',melee:0,col:'#4acfe0',sym:['M','W'],lead:null,hp:470,atk:52,def:9,mdef:14,as:1.35,crit:.06,
 sk:[{n:'มังกรน้อยพ่นไฟ',ic:'s_summon',k:'dmg',tgt:'rand',h:7,iv:.16,c:.58,st:{burn:[.15,3]},fx:'fire',sf:'bomb',v:1},
     {n:'เพลงขลุ่ยหน่วง',ic:'s_heart',cd:8,k:'dmg',tgt:'all',c:.45,st:{slow:4},fx:'magic',sf:'magic'},
     {n:'เพลงกล่อมนอน',ic:'s_stun',cd:12,k:'dmg',tgt:'one',c:.4,st:{stun:3.2},fx:'magic',sf:'zap'},
     {n:'ทำนองเร่งใจ',ic:'s_buff',cd:16,k:'buff',tgt:'all',stat:'as',pct:.28,dur:9,fx:'buff',sf:'buff'}],
 awk:{n:'มังกรน้อยผู้ภักดี',d:'ฟื้นเองเมื่อล้ม (1 ครั้ง)',p:'rev'},voice:'u9'},
{id:10,n:'บุ๊ง',t:'หมีนักสู้',cls:'tank',line:0,dt:'p',melee:1,col:'#c98a4a',sym:['G','W'],lead:'W',hp:960,atk:40,def:32,mdef:20,as:1.4,crit:.05,
 sk:[{n:'หมัดเหล็กกระแทก',ic:'s_punch',k:'dmg',tgt:'one',c:3.8,st:{stun:2.2},fx:'punch',sf:'boom',v:1},
     {n:'ตบกระชาก',ic:'s_slash',cd:6,k:'dmg',tgt:'row',c:1.0,fx:'punch',sf:'hit2'},
     {n:'ผิวหนาหมี',ic:'s_shield',cd:12,k:'shield',tgt:'self',c:3.0,dur:8,fx:'shield',sf:'shield'},
     {n:'คำรามสั่นสะเทือน',ic:'s_stun',cd:17,k:'dmg',tgt:'all',c:.6,st:{stun:1.2},debuff:{stat:'atk',pct:.2,dur:6},fx:'punch',sf:'roar'}],
 awk:{n:'ราชาหมีผู้ไม่ยอมแพ้',d:'พลังชีวิตฟื้นเองช้าๆ ระหว่างสู้',p:'regen'},voice:'u10'}];
var HQUIP={ /* awakening challenge per class */tank:{k:'taken',n:'รับความเสียหายรวม',v:5000},dmg:{k:'dealt',n:'ทำความเสียหายรวม',v:14000},ctl:{k:'stuns',n:'ควบคุมศัตรู (มึน/แช่แข็ง) ',v:14},sup:{k:'healed',n:'ฮีลเพื่อนรวม',v:4000}};
var STARCOST=[0,10,20,40,80];
var UNLOCKFRAG=25;
/* gear stats per tier multiplier */
function gearStat(slot,tier){var m=TIERM[tier]||0;
 switch(slot){case 0:return {hp:100*m};case 1:return {def:7*m,mdef:4*m};case 2:return {mdef:7*m,def:3*m,as:.015*m};case 3:return {atk:9*m};case 4:return {crit:.018*m,atk:3*m};default:return {hp:60*m,atk:3*m};}}
/* ---------- enemies ---------- */
var ARCH={melee:{hp:1,atk:1,def:1,as:1.6,row:0,m:1},tank:{hp:1.9,atk:.65,def:1.8,as:2.0,row:0,m:1},ranged:{hp:.7,atk:1.2,def:.6,as:1.7,row:2,m:0},fast:{hp:.72,atk:.9,def:.7,as:1.0,row:1,m:1}};
var ZONES=[null,
{n:'สุสานอิฐกระดูก',s:'ทุ่งกระดูกยามเย็น',c:'#c9b48a'},{n:'ชายหาดปูยักษ์',s:'คลื่นบล็อกสีฟ้า',c:'#4aa8f4'},{n:'ปราสาทอิฐมืด',s:'เงาในหอคอย',c:'#8a7ab8'},{n:'หุบเขาไดโนบล็อก',s:'เสียงคำรามก้องหุบ',c:'#6bbf4a'},{n:'ภูเขาไฟมังกร',s:'ลาวาร้อนระอุ',c:'#ff6a2a'}];
var ENM=[null,
[{n:'โครงกระดูกนักดาบ',a:'melee',t:'p'},{n:'โครงกระดูกนักธนู',a:'ranged',t:'p'},{n:'โกเลมหิน',a:'tank',t:'p',sk:{n:'กระแทกพื้น',k:'stun1',c:1.4,cast:1.3,cd:7,stun:1.2}},{n:'ค้างคาวอิฐ',a:'fast',t:'p'}],
[{n:'ปูแดงก้ามโต',a:'tank',t:'p',sk:{n:'หนีบ',k:'single',c:1.7,cast:1.2,cd:7}},{n:'ปักเป้าหนาม',a:'ranged',t:'p'},{n:'แมงกะพรุนม่วง',a:'ranged',t:'m',sk:{n:'ช็อตไฟฟ้า',k:'stun1',c:1.0,cast:1.2,cd:8,stun:1.4}},{n:'ฉลามน้อย',a:'fast',t:'p'}],
[{n:'อัศวินดำ',a:'melee',t:'p',sk:{n:'พลังมืด',k:'selfbuff',pct:.35,dur:6,cast:1.0,cd:11}},{n:'ผีถือตะเกียง',a:'ranged',t:'m'},{n:'การ์กอยล์',a:'tank',t:'p'},{n:'พ่อมดกะโหลก',a:'ranged',t:'m',sk:{n:'ฮีลพวก',k:'healally',c:.35,cast:1.4,cd:9}}],
[{n:'ราปเตอร์เขียว',a:'fast',t:'p'},{n:'ไทรเซราท็อปส์',a:'tank',t:'p',sk:{n:'พุ่งชน',k:'single',c:2.0,cast:1.4,cd:8}},{n:'เทอโรแดคทิลแดง',a:'ranged',t:'p'},{n:'ทีเร็กซ์จิ๋ว',a:'melee',t:'p',sk:{n:'กัดแรง',k:'single',c:1.8,cast:1.1,cd:7}}],
[{n:'โกเลมลาวา',a:'tank',t:'p',sk:{n:'กระแทกลาวา',k:'stun1',c:1.4,cast:1.3,cd:8,stun:1.2}},{n:'ปีศาจไฟจิ๋ว',a:'ranged',t:'m',sk:{n:'ลูกไฟ',k:'single',c:1.6,cast:1.1,cd:6,burn:1}},{n:'งูแมกมา',a:'melee',t:'m',sk:{n:'พ่นไฟ',k:'row',c:1.1,cast:1.3,cd:8,burn:1}},{n:'อัศวินปีศาจ',a:'melee',t:'p',sk:{n:'ฟันปีศาจ',k:'single',c:2.0,cast:1.2,cd:7}}]];
var BOSSES=[null,
{n:'เร็กซ์กระดูกยักษ์',t:'p',as:2.2,sc:.5,mh:15,ma:1.35,md:1.4,ab:[{n:'กัดทำลาย',k:'single',c:2.2,cast:1.2,cd:5},{n:'กวาดหาง',k:'row',c:1.4,cast:1.5,cd:7}],
 ph:[{hp:.66,ev:'summon',add:[1,2],say:'กระดูกฟื้นคืนชีพ!'},{hp:.33,ev:'enrage',pct:.35,ab:{n:'กระทืบพื้น',k:'all',c:1.0,cast:1.7,cd:9,stun:.8},say:'เร็กซ์คลั่ง!'}]},
{n:'ราชาปูอิฐ',t:'p',as:2.2,sc:.5,mh:15,ma:1.3,md:1.5,ab:[{n:'หนีบอัมพาต',k:'stun1',c:2.0,cast:1.2,cd:6,stun:1.3},{n:'พ่นฟองยักษ์',k:'all',c:.85,cast:1.6,cd:8,m:1}],
 ph:[{hp:.66,ev:'shield',pct:.2,say:'เกราะฟองสบู่!'},{hp:.33,ev:'summon',add:[1,1,4],enr:.3,say:'เหล่าปูมาช่วย!'}]},
{n:'ราชาอัศวินดำ',t:'p',as:2.0,sc:.5,mh:16,ma:1.35,md:1.4,ab:[{n:'คลื่นดาบ',k:'row',c:1.6,cast:1.3,cd:6},{n:'ฟันทมิฬ',k:'single',c:2.7,cast:1.5,cd:8}],
 ph:[{hp:.66,ev:'summon',add:[1,1],say:'ทหารดำจงมา!'},{hp:.33,ev:'silence',dur:4,enr:.35,say:'ความมืดกลืนพลัง!'}]},
{n:'เร็กซ์เขียวคลั่ง',t:'p',as:2.0,sc:.5,mh:16,ma:1.4,md:1.4,ab:[{n:'กัดขาด',k:'single',c:2.4,cast:1.2,cd:5},{n:'กระทืบสั่นดิน',k:'all',c:1.1,cast:1.7,cd:9,stun:.8}],
 ph:[{hp:.66,ev:'enrage',pct:.25,say:'คำรามก้องหุบเขา!'},{hp:.33,ev:'summon',add:[1,1,1],enr:.25,say:'ฝูงราปเตอร์!'}]},
{n:'มังกรเพลิงอิฐ',t:'m',as:1.9,sc:.52,mh:17,ma:1.4,md:1.4,ab:[{n:'พ่นไฟ',k:'row',c:1.7,cast:1.3,cd:6,burn:1,m:1},{n:'ปีกลมกระหน่ำ',k:'all',c:.8,cast:1.6,cd:8,stun:.8}],
 ph:[{hp:.66,ev:'shield',pct:.15,ab:{n:'อุกกาบาต',k:'meteor',c:1.5,cast:1.9,cd:11,m:1},say:'ฝนอุกกาบาต!'},{hp:.33,ev:'summon',add:[2,2],enr:.35,say:'ปีศาจไฟมาแล้ว!'}]}];
/* ---------- campaign ---------- */
var SNAMES=['ทางเข้า','ลานกว้าง','ทางแคบ','ป่าอิฐ','ถ้ำลึก','รังบอส'];
function stageN(z,s){return (z-1)*6+s;}
var STAGE_CACHE={};
function seedRnd(seed){var x=seed*9301+49297;return function(){x=(x*9301+49297)%233280;return x/233280;};}
function stageDef(z,s,heroic){var key=z+'_'+s+(heroic?'h':'n');if(STAGE_CACHE[key])return STAGE_CACHE[key];
 var n=stageN(z,s),R=seedRnd(n*7+(heroic?3:1)),boss=s===6,nw=s>=3?3:2,waves=[];
 var lvl=Math.max(1,Math.round(n*.75+.5))+(heroic?6:0);
 for(var w=0;w<nw;w++){var cnt=clamp(2+Math.floor((n+w*2)/6),2,5);if(w===nw-1&&boss)cnt=clamp(cnt-1,2,4);var arr=[];
  for(var i=0;i<cnt;i++){var j=Math.floor(R()*4);if(i===0&&R()<.6)j=[0,2,3][Math.floor(R()*3)];arr.push({j:j});}
  if(w===nw-1&&(s===3||s===5)&&!boss){arr[0]={j:arr[0].j,elite:1};}
  waves.push(arr);}
 if(boss)waves[nw-1].unshift({boss:1});
 var cost=5+Math.floor((n-1)/6);if(heroic)cost*=2;
 var tl=55+nw*28+(boss?45:0);
 var d={z:z,s:s,n:n,heroic:!!heroic,boss:boss,waves:waves,lvl:lvl,cost:cost,tl:tl,name:SNAMES[s-1],feat:((n-1)%NHERO)+1,mult:heroic?1.35:1,
  coins:Math.round((70+n*28)*(heroic?2:1)),hxp:Math.round((50+n*16)*(heroic?1.6:1)),tier:clamp(Math.ceil(z*.7)+(heroic?1:0),1,4)};
 STAGE_CACHE[key]=d;return d;}
var HEROIC_PLV=6,SURV_PLV=8,SWEEP_PLV=1,AWAKEN_LV=12;
/* ---------- data 2: heroes 11-20, zones 6-11, raid boss ---------- */
SYM.Y={n:'เกราะสัมฤทธิ์',c:'#9bb83a',d:'พลังชีวิต +10% เกราะกาย +15%',a:{hp:.1,def:.15}};
SYM.L={n:'จอมโจร',c:'#ffb02a',d:'โจมตี +10% คริ +10%',a:{atk:.1,crit:.1}};
SYM.F={n:'เปลวเพลิง',c:'#ff6a2a',d:'โจมตี +14% คริ +6%',a:{atk:.14,crit:.06}};
SYM.N={n:'นักดัก',c:'#6adf5a',d:'โจมตี +10% ตีเร็ว +10%',a:{atk:.1,as:.1}};
SYM.H={n:'ศักดิ์สิทธิ์',c:'#ffe27a',d:'พลังชีวิต +14% เกราะเวท +16%',a:{hp:.14,mdef:.16}};
SYM.B={n:'บูชิโด',c:'#e8453c',d:'โจมตี +12% ตีเร็ว +8% คริ +4%',a:{atk:.12,as:.08,crit:.04}};
SYM.R={n:'หินผา',c:'#8fa08a',d:'พลังชีวิต +16% เกราะเวท +12%',a:{hp:.16,mdef:.12}};
SYM.P={n:'พลปืน',c:'#ff8a8a',d:'โจมตี +14% คริ +10%',a:{atk:.14,crit:.1}};
SYM.J={n:'ราชวงศ์',c:'#9a7aff',d:'พลังชีวิต +8% โจมตี +8% ตีเร็ว +8%',a:{hp:.08,atk:.08,as:.08}};
SYM.V={n:'นักสู้ประชิด',c:'#b0b8c8',d:'พลังชีวิต +10% โจมตี +12%',a:{hp:.1,atk:.12}};
var AWKD={thorn:'สะท้อนความเสียหาย 18% กลับไปหาศัตรู',ls:'ฮีลตัวเอง 10% ของความเสียหายที่ทำ',pw:'พลังเพิ่มเร็วขึ้น 35%',cd:'ความเสียหายคริติคอล +40%',rev:'ฟื้นเองเมื่อล้ม (1 ครั้ง)',regen:'พลังชีวิตฟื้นเองช้าๆ ระหว่างสู้'};
function newHero(o){var p=o.p;o.awk={n:o.an,d:AWKD[p],p:p};delete o.an;delete o.p;return o;}
/* skill extras: st.bleed/poison:[coef,dur] st.blind:dur | exe lsp rev(dmg) shd(heal) | tgt back/front | buff stat dr/regen */
[
{id:11,n:'ทอร์โต้',t:'เต่าโล่เกราะสัมฤทธิ์',cls:'tank',line:0,dt:'p',melee:1,col:'#8fb23a',sym:['G','Y'],lead:'Y',hp:1020,atk:34,def:36,mdef:22,as:1.7,crit:.04,
 sk:[{n:'โล่ยักษ์ถล่มแนวหน้า',ic:'s_punch',k:'dmg',tgt:'front',c:2.6,st:{stun:1.6},fx:'punch',sf:'boom',v:1},
     {n:'กระแทกโล่',ic:'s_shield',cd:6,k:'dmg',tgt:'one',c:1.5,st:{slow:3},fx:'punch',sf:'hit2'},
     {n:'ซุกในกระดอง',ic:'s_shield',cd:11,k:'buff',tgt:'self',stat:'dr',pct:.5,dur:6,fx:'buff',sf:'shield'},
     {n:'กำแพงโล่ทอง',ic:'s_shield',cd:16,k:'shield',tgt:'all',c:1.2,dur:7,fx:'shield',sf:'shield'}],
 p:'regen',an:'กระดองไม่มีวันแตก',voice:'u11',shout:'ฮึบ! กำแพงเต่ามาแล้ว!',tapt:['ช้าๆ แต่แน่นนะ','ข้ากันให้เอง','กระดองหนักกว่าที่คิดนะ']},
{id:12,n:'ฟ็อกซี่',t:'จิ้งจอกจอมโจรกุญแจทอง',cls:'dmg',line:1,dt:'p',melee:1,col:'#e8a02a',sym:['S','L'],lead:'L',hp:520,atk:63,def:12,mdef:10,as:1.0,crit:.16,
 sk:[{n:'กุญแจพิฆาตโจร',ic:'s_katana',k:'dmg',tgt:'weak',h:4,iv:.14,c:.98,exe:.6,fx:'katana',sf:'slash',v:1},
     {n:'ฟันลวงตา',ic:'s_slash',cd:5,k:'dmg',tgt:'weak',c:1.5,st:{bleed:[.22,3]},fx:'slash',sf:'slash'},
     {n:'ควันลวงตา',ic:'s_dark',cd:12,k:'dmg',tgt:'all',c:.3,st:{blind:4.5},fx:'dark',sf:'zap'},
     {n:'ปล้นพลังไม้ตาย',ic:'s_bolt',cd:18,k:'power',tgt:'self',amt:420,fx:'buff',sf:'buff'}],
 p:'ls',an:'หางแห่งโจรผู้ฉลาด',voice:'u12',shout:'ของนี้ฉันขอยืมนะ!',tapt:['อย่ามองกระเป๋าฉันนะ','เหรียญอยู่ไหนน้า','ฮิๆ ล็อกไม่อยู่หรอก']},
{id:13,n:'ฟีนิกซ์โนะ',t:'นกฟีนิกซ์จอมเวทเพลิง',cls:'dmg',line:2,dt:'m',melee:0,bt:'fire',col:'#ff7a1a',sym:['M','F'],lead:'F',hp:440,atk:64,def:8,mdef:14,as:1.4,crit:.08,
 sk:[{n:'เกิดใหม่จากเถ้าถ่าน',ic:'s_fire',k:'dmg',tgt:'all',c:1.75,st:{burn:[.3,4]},rev:.3,fx:'fire',sf:'bomb',v:1},
     {n:'ลูกไฟพุ่ง',ic:'s_fire',cd:5,k:'dmg',tgt:'one',c:1.5,st:{burn:[.2,3]},fx:'fireball',sf:'magic'},
     {n:'ปีกเพลิงกวาด',ic:'s_wind',cd:12,k:'dmg',tgt:'row',c:1.15,st:{burn:[.2,3]},fx:'wind',sf:'boom'},
     {n:'ขนนกบำบัด',ic:'s_heal',cd:17,k:'heal',tgt:'low',c:2.0,fx:'heal',sf:'heal'}],
 p:'rev',an:'ไฟที่ไม่มีวันดับ',voice:'u13',shout:'ลุกโชนเถอะ!',tapt:['อุ่นๆ ใช่ไหม?','ระวังขนนะ ร้อน','ไฟนี้ไม่ใช่ของเล่น']},
{id:14,n:'เว็บบี้',t:'แมงมุมนักดักกับดัก',cls:'ctl',line:2,dt:'p',melee:0,bt:'web',col:'#6adf5a',sym:['T','N'],lead:'N',hp:460,atk:54,def:9,mdef:11,as:1.4,crit:.07,
 sk:[{n:'ใยแมงมุมยักษ์',ic:'s_web',k:'dmg',tgt:'all',c:1.1,st:{slow:5,stun:1.4},fx:'web',sf:'freeze',v:1},
     {n:'พ่นใยพันตัว',ic:'s_web',cd:6,k:'dmg',tgt:'one',c:1.2,st:{stun:2.0},fx:'web',sf:'zap'},
     {n:'พิษงูหนอน',ic:'s_poison',cd:12,k:'dmg',tgt:'rand',h:3,iv:.16,c:.4,st:{poison:[.18,5]},fx:'poison',sf:'magic'},
     {n:'ดักจับจุดอ่อน',ic:'s_web',cd:16,k:'debuff',tgt:'all',stat:'def',pct:.3,dur:8,fx:'web',sf:'magic'}],
 p:'cd',an:'ใยแห่งโชคชะตา',voice:'u14',shout:'ติดกับดักแล้วล่ะ!',tapt:['แปดขา ก็ยังกอดไม่พอ','อย่าเดินเข้ามานะ','ฉันถักเก่งนะ']},
{id:15,n:'เซราฟี',t:'นางฟ้าระฆังศักดิ์สิทธิ์',cls:'sup',line:2,dt:'m',melee:0,bt:'light',col:'#ffe27a',sym:['M','H'],lead:'H',hp:490,atk:42,def:9,mdef:18,as:1.5,crit:.04,
 sk:[{n:'ระฆังสวรรค์ก้องฟ้า',ic:'s_bell',k:'heal',tgt:'all',c:1.7,cleanse:1,shd:.9,fx:'light',sf:'heal',v:1},
     {n:'เสียงระฆังเบาๆ',ic:'s_heal',cd:5,k:'heal',tgt:'low',c:1.8,fx:'heal',sf:'heal'},
     {n:'ปีกคุ้มกัน',ic:'s_light',cd:13,k:'buff',tgt:'all',stat:'dr',pct:.25,dur:8,fx:'buff',sf:'buff'},
     {n:'ตัดสินบาป',ic:'s_bell',cd:17,k:'dmg',tgt:'all',c:.75,st:{sil:2.5},fx:'bell',sf:'magic'}],
 p:'pw',an:'เสียงระฆังแห่งพร',voice:'u15',shout:'แสงสวรรค์จงคุ้มครอง!',tapt:['ขอพรให้ทุกคนนะคะ','ติ๋ง... ได้ยินไหม?','อย่าลืมพักด้วยนะ']},
{id:16,n:'คาเซะ',t:'หมาป่าซามูไรลมกรด',cls:'dmg',line:1,dt:'p',melee:1,col:'#e8e8f0',sym:['S','B'],lead:'B',hp:560,atk:66,def:12,mdef:10,as:1.0,crit:.16,
 sk:[{n:'อัสดงฟันพันครั้ง',ic:'s_katana',k:'dmg',tgt:'rand',h:10,iv:.08,c:.5,fx:'katana',sf:'slash',v:1},
     {n:'ฟันวายุ',ic:'s_wind',cd:5,k:'dmg',tgt:'row',c:1.3,fx:'wind',sf:'slash'},
     {n:'ตั้งท่าเพ่งสมาธิ',ic:'s_buff',cd:12,k:'buff',tgt:'self',stat:'atk',pct:.5,dur:7,fx:'buff',sf:'buff'},
     {n:'ใบมีดลมสังหารแถวหลัง',ic:'s_wind',cd:15,k:'dmg',tgt:'back',c:2.5,fx:'wind',sf:'crit'}],
 p:'ls',an:'ใจนักดาบผู้เงียบสงบ',voice:'u16',shout:'ดาบนี้... ไม่มีวันพลาด!',tapt:['เงียบๆ ก็ดีนะ','ดาบต้องหมั่นลับ','ลมเปลี่ยนทิศแล้ว']},
{id:17,n:'มอสซี่',t:'โกเลมหินดอกซากุระ',cls:'tank',line:0,dt:'p',melee:1,col:'#8fa08a',sym:['G','R'],lead:'R',hp:1100,atk:30,def:40,mdef:26,as:1.8,crit:.03,
 sk:[{n:'แผ่นดินสะท้านซากุระ',ic:'s_leaf',k:'dmg',tgt:'all',c:1.3,st:{stun:1.5},shd:1,fx:'punch',sf:'boom',v:1},
     {n:'หินกระแทกพื้น',ic:'s_punch',cd:6,k:'dmg',tgt:'one',c:1.4,st:{slow:3},fx:'punch',sf:'hit2'},
     {n:'ดอกไม้ฟื้นฟู',ic:'s_leaf',cd:14,k:'buff',tgt:'all',stat:'regen',pct:.03,dur:10,fx:'leaf',sf:'heal'},
     {n:'ยั่วด้วยกลีบดอก',ic:'s_stun',cd:16,k:'taunt',tgt:'self',dur:6,red:.4,fx:'buff',sf:'roar'}],
 p:'regen',an:'รากหยั่งลึกถึงใจ',voice:'u17',shout:'ตื่นเถอะ ภูผา!',tapt:['...ซากุระบานแล้ว','หนักแต่ใจดีนะ','รออีกหน่อย ขอหลับ']},
{id:18,n:'แพนดี้',t:'แพนด้าพลปืนลูกซอง',cls:'dmg',line:2,dt:'p',melee:0,bt:'gun',col:'#d8d8d8',sym:['P','L'],lead:'P',hp:450,atk:68,def:8,mdef:8,as:1.3,crit:.15,
 sk:[{n:'ลูกซองพันธุ์ไผ่',ic:'s_gun',k:'dmg',tgt:'all',c:1.7,pierce:.3,fx:'gun',sf:'bomb',v:1},
     {n:'ยิงเร็วสามนัด',ic:'s_gun',cd:5,k:'dmg',tgt:'one',h:3,iv:.12,c:.64,fx:'gun',sf:'arrow'},
     {n:'ยิงทะลวงเกราะ',ic:'s_gun',cd:12,k:'dmg',tgt:'weak',c:2.3,pierce:.6,fx:'gun',sf:'crit'},
     {n:'ลั่นไกรัวเร็ว',ic:'s_buff',cd:16,k:'buff',tgt:'self',stat:'as',pct:.55,dur:7,fx:'buff',sf:'buff'}],
 p:'cd',an:'ตาเล็งแม่นระดับตำนาน',voice:'u18',shout:'ปัง ปัง ปัง!',tapt:['กินไผ่ก่อนยิงนะ','ปืนหนักกว่าที่คิด','ง่วงจัง... แต่ยิงได้']},
{id:19,n:'เจลลี่คิง',t:'ราชาเยลลี่มงกุฎทอง',cls:'ctl',line:1,dt:'m',melee:0,bt:'wave',col:'#8a6aff',sym:['M','J'],lead:'J',hp:520,atk:52,def:10,mdef:14,as:1.4,crit:.06,
 sk:[{n:'ลูกเยลลี่ยักษ์แช่แข็ง',ic:'s_wave',k:'dmg',tgt:'all',c:1.4,st:{frz:2.2},fx:'wave',sf:'freeze',v:1},
     {n:'เจลเหนียวหนึบ',ic:'s_wave',cd:6,k:'dmg',tgt:'one',c:1.3,st:{slow:4},fx:'wave',sf:'magic'},
     {n:'พระราชโองการ',ic:'s_star',cd:12,k:'debuff',tgt:'all',stat:'atk',pct:.3,dur:8,fx:'star',sf:'magic'},
     {n:'เรียกพลเยลลี่',ic:'s_summon',cd:16,k:'dmg',tgt:'rand',h:6,iv:.14,c:.5,st:{slow:2},fx:'wave',sf:'pop'}],
 p:'rev',an:'บัลลังก์ที่ไม่มีวันล้ม',voice:'u19',shout:'ข้าคือราชา... เยลลี่!',tapt:['ข้าเด้งดึ๋งๆ นะ','มงกุฎข้าเงาไหม?','ใครกล้าแตะข้า!']},
{id:20,n:'ไรโน่',t:'แรดนักสู้ขวิดมหากาฬ',cls:'dmg',line:0,dt:'p',melee:1,col:'#7e8aa0',sym:['W','V'],lead:'V',hp:880,atk:58,def:26,mdef:16,as:1.3,crit:.07,
 sk:[{n:'ขวิดทะลวงฟ้า',ic:'s_punch',k:'dmg',tgt:'splash',c:3.0,st:{stun:1.5},fx:'punch',sf:'boom',v:1},
     {n:'พุ่งชนแนวหน้า',ic:'s_punch',cd:5,k:'dmg',tgt:'front',c:1.3,st:{stun:.8},fx:'punch',sf:'hit2'},
     {n:'คำรามปลุกใจ',ic:'s_buff',cd:13,k:'buff',tgt:'all',stat:'atk',pct:.22,dur:8,fx:'buff',sf:'roar'},
     {n:'ปะทะดุเดือด',ic:'s_punch',cd:15,k:'dmg',tgt:'one',c:2.7,lsp:.35,fx:'punch',sf:'crit'}],
 p:'thorn',an:'เขาแกร่งดั่งเหล็ก',voice:'u20',shout:'หลีกไป! แรดมาแล้ว!',tapt:['เขาไว้ใช้ขวิดนะ','ไม่ต้องเกรงใจ ฉันทนอยู่','กินข้าวก่อนสู้!']}
].forEach(function(o){HEROES[o.id]=newHero(o);});
/* old heroes: shout + tap lines, basic attack type */
[null,['เสียงคำรามแห่งสิงห์!',null],['เงาจะกลืนเจ้า!'],['จรวดมหาประลัย!'],['พายุคริสตัล!'],['ฮีลสุดกำลัง!'],['ธนูห่าฝน!'],['ตู้มมม!'],['แสงรุ่งอรุณ!'],['มังกรน้อย พุ่งไป!'],['หมัดหมีแตกแน่!']].forEach(function(a,i){if(i&&HEROES[i])HEROES[i].shout=a[0];});
HEROES[3].bt='bolt';HEROES[6].bt='arrow';HEROES[7].bt='bomb';
/* ---------- zones 6-11 ---------- */
ZONES.push(
{n:'ทุ่งหิมะเยือกแข็ง',s:'ลมหนาวก้องทุ่ง',c:'#9fdcff'},{n:'หนองบึงพิษ',s:'หมอกเขียวเหม็นเปรี้ยว',c:'#7fbf4a'},{n:'ทะเลทรายฟาโรห์',s:'สุสานใต้ผืนทราย',c:'#e8c06a'},{n:'โรงงานกลไกฟ้า',s:'ไอน้ำและเฟืองหมุน',c:'#b0b8c8'},{n:'เรือผีสิงทะเลหมอก',s:'เสียงปืนใหญ่จากอดีต',c:'#6ab8c8'},{n:'สถานีอวกาศอิฐดาว',s:'ดวงดาวเรียงรายรอบตัว',c:'#b36cf0'});
ENM.push(
[{n:'มนุษย์หิมะทหารกล้า',a:'melee',t:'p'},{n:'เพนกวินนักธนู',a:'ranged',t:'p'},{n:'เยตีหิมะยักษ์',a:'tank',t:'p',sk:{n:'กระแทกน้ำแข็ง',k:'stun1',c:1.4,cast:1.3,cd:7,stun:1.3}},{n:'จิ้งจอกวิญญาณหิมะ',a:'fast',t:'m',sk:{n:'ลมหนาวเฉียด',k:'single',c:1.4,cast:1.0,cd:7,slow:1}}],
[{n:'กบพิษพ่นเมือก',a:'ranged',t:'m',sk:{n:'พ่นพิษ',k:'single',c:1.4,cast:1.1,cd:6,poison:1}},{n:'เห็ดหมอผี',a:'ranged',t:'m',sk:{n:'สปอร์ฮีล',k:'healally',c:.35,cast:1.4,cd:9}},{n:'จระเข้หนองน้ำ',a:'tank',t:'p',sk:{n:'งับแรง',k:'single',c:1.9,cast:1.3,cd:8}},{n:'งูเขียวพิษ',a:'fast',t:'p',sk:{n:'กัดพิษ',k:'single',c:1.2,cast:.9,cd:6,poison:1}}],
[{n:'มัมมี่ผ้าพัน',a:'melee',t:'p',sk:{n:'คำสาปผ้าพัน',k:'selfbuff',pct:.35,dur:6,cast:1.0,cd:11}},{n:'นักบวชหมาจิ้งจอก',a:'ranged',t:'m',sk:{n:'ฮีลพวก',k:'healally',c:.35,cast:1.4,cd:9}},{n:'แมงป่องยักษ์',a:'tank',t:'p',sk:{n:'หางพิษ',k:'stun1',c:1.4,cast:1.2,cd:7,stun:1.1,poison:1}},{n:'ด้วงสการับ',a:'fast',t:'p'}],
[{n:'หุ่นเหล็กทหารยาม',a:'melee',t:'p',sk:{n:'โหมดเร่งเครื่อง',k:'selfbuff',pct:.35,dur:6,cast:1.0,cd:11}},{n:'โดรนใบพัดยิงเลเซอร์',a:'ranged',t:'p',sk:{n:'ยิงกราด',k:'row',c:1.0,cast:1.3,cd:8}},{n:'โกเลมหม้อน้ำ',a:'tank',t:'p',sk:{n:'ไอร้อนพุ่ง',k:'stun1',c:1.3,cast:1.3,cd:8,stun:1.1,burn:1}},{n:'ต่อกลไก',a:'fast',t:'p',sk:{n:'ต่อยเร็ว',k:'single',c:1.3,cast:.9,cd:6}}],
[{n:'โครงกระดูกโจรสลัด',a:'melee',t:'p',sk:{n:'ฟันดาบโจรสลัด',k:'single',c:1.7,cast:1.1,cd:7}},{n:'นกแก้วผีมือปืน',a:'ranged',t:'p',sk:{n:'ยิงปืนคู่',k:'single',c:1.6,cast:1.0,cd:6}},{n:'ปูปืนใหญ่',a:'tank',t:'p',sk:{n:'ลูกปืนใหญ่',k:'row',c:1.0,cast:1.5,cd:9}},{n:'หมึกผีสิง',a:'fast',t:'m',sk:{n:'พ่นหมึกดำ',k:'single',c:1.0,cast:1.0,cd:7,blind:1}}],
[{n:'มนุษย์ต่างดาวทหาร',a:'melee',t:'p'},{n:'จานบินเลเซอร์',a:'ranged',t:'m',sk:{n:'ลำแสงกราด',k:'row',c:1.1,cast:1.3,cd:8}},{n:'สัตว์ผลึกอุกกาบาต',a:'tank',t:'p',sk:{n:'ทุบผลึก',k:'stun1',c:1.4,cast:1.3,cd:7,stun:1.2}},{n:'ดาวหางจิ๋ว',a:'fast',t:'m',sk:{n:'หางเพลิงดาว',k:'single',c:1.5,cast:1.0,cd:6,burn:1}}]);
BOSSES.push(
{n:'แมมมอธน้ำแข็งยักษ์',t:'p',as:2.3,sc:.5,mh:16,ma:1.4,md:1.5,ab:[{n:'กระแทกงา',k:'single',c:2.4,cast:1.3,cd:5},{n:'พายุหิมะ',k:'all',c:.9,cast:1.7,cd:9,slow:1,m:1}],
 ph:[{hp:.66,ev:'shield',pct:.2,say:'เกราะน้ำแข็ง!'},{hp:.33,ev:'summon',add:[1,2,4],enr:.3,say:'ฝูงหิมะมาช่วย!'}]},
{n:'ราชากบหนองพิษ',t:'m',as:2.0,sc:.5,mh:16,ma:1.4,md:1.4,ab:[{n:'ลิ้นฟาดมึน',k:'stun1',c:2.1,cast:1.2,cd:6,stun:1.1},{n:'ฝนพิษ',k:'all',c:.85,cast:1.6,cd:8,m:1,poison:1}],
 ph:[{hp:.66,ev:'summon',add:[1,2],say:'เห็ดเต็มหนองเลย!'},{hp:.33,ev:'enrage',pct:.3,ab:{n:'กลืนกิน',k:'single',c:3.2,cast:1.8,cd:10},say:'ราชากบคลั่ง!'}]},
{n:'ฟาโรห์สฟิงซ์แมงป่อง',t:'p',as:2.0,sc:.5,mh:17,ma:1.4,md:1.5,ab:[{n:'หางพิษ',k:'single',c:2.4,cast:1.2,cd:5,poison:1},{n:'พายุทราย',k:'all',c:.9,cast:1.6,cd:9,m:1,blind:1}],
 ph:[{hp:.66,ev:'silence',dur:3,enr:.3,say:'คำสาปฟาโรห์!'},{hp:.33,ev:'summon',add:[1,1,4],say:'มัมมี่ผุดจากทราย!'}]},
{n:'หุ่นไอน้ำยักษ์',t:'p',as:2.1,sc:.5,mh:17,ma:1.45,md:1.5,ab:[{n:'หมัดเหล็ก',k:'stun1',c:2.2,cast:1.3,cd:6,stun:1.3},{n:'ไอน้ำพุ่ง',k:'row',c:1.6,cast:1.4,cd:7,burn:1}],
 ph:[{hp:.66,ev:'shield',pct:.25,ab:{n:'ปืนใหญ่ไอน้ำ',k:'meteor',c:1.4,cast:1.9,cd:11},say:'ปืนใหญ่พร้อมยิง!'},{hp:.33,ev:'enrage',pct:.4,say:'ระบบโอเวอร์โหลด!'}]},
{n:'กัปตันคราเคนผีสิง',t:'m',as:2.0,sc:.52,mh:18,ma:1.45,md:1.4,ab:[{n:'หนวดฟาดกวาด',k:'row',c:1.5,cast:1.3,cd:6},{n:'ปืนใหญ่ผี',k:'meteor',c:1.4,cast:1.9,cd:10,m:1}],
 ph:[{hp:.66,ev:'summon',add:[1,2],say:'ลูกเรือผีมาแล้ว!'},{hp:.33,ev:'silence',dur:4,enr:.35,say:'หมอกผีกลืนพลัง!'}]},
{n:'มังกรดาวจักรวาล',t:'m',as:1.9,sc:.52,mh:19,ma:1.5,md:1.5,ab:[{n:'ลมหายใจดวงดาว',k:'row',c:1.8,cast:1.3,cd:6,burn:1,m:1},{n:'ฝนดาวตก',k:'meteor',c:1.5,cast:1.9,cd:10,m:1},{n:'คลื่นแรงโน้มถ่วง',k:'all',c:.9,cast:1.7,cd:10,stun:.8,m:1}],
 ph:[{hp:.66,ev:'shield',pct:.2,say:'เกราะดวงดาว!'},{hp:.33,ev:'summon',add:[2,2,3],enr:.4,say:'ดาวตกเรียกพวก!'}]},
{n:'ไททันลาวาอิฐแดง',t:'p',as:2.0,sc:.58,mh:20,ma:1.5,md:1.5,ab:[{n:'ทุบพื้นลาวา',k:'all',c:1.0,cast:1.7,cd:8,stun:.8,burn:1},{n:'กำปั้นไททัน',k:'single',c:2.8,cast:1.3,cd:5},{n:'คลื่นความร้อน',k:'row',c:1.7,cast:1.4,cd:7,burn:1}],
 ph:[{hp:.75,ev:'enrage',pct:.2,say:'ไททันตื่นแล้ว!'},{hp:.5,ev:'summon',add:[1,2,3],enr:.2,say:'ลูกน้องลาวา!'},{hp:.25,ev:'enrage',pct:.4,ab:{n:'อุกกาบาตเพลิง',k:'meteor',c:1.6,cast:1.9,cd:10},say:'ไททันคลั่ง!'}]});
/* ---------- meta: stats, progression, economy ---------- */
var MAXPLV=60,ENREGEN=360000;
function hx(id){return SAVE.heroes[id];}
function heroMult(h){return (1+.12*(h.lv-1))*(1+.16*(h.star-1))*(1+.24*(h.grade-1));}
function auraSet(team){var o={};team.forEach(function(id){var d=HEROES[id],h=hx(id);if(d&&d.lead&&h.awk)o[d.lead]=1;});return o;}
function heroStats(id,team){var d=HEROES[id],h=hx(id),m=heroMult(h);
 var s={hp:d.hp*m,atk:d.atk*m,def:d.def*m,mdef:d.mdef*m,as:0,crit:d.crit,cdm:1.6};
 for(var i=0;i<6;i++){var t=h.gear[i];if(t){var g=gearStat(i,t);s.hp+=g.hp||0;s.atk+=g.atk||0;s.def+=g.def||0;s.mdef+=g.mdef||0;s.as+=g.as||0;s.crit+=g.crit||0;}}
 s.hp+=h.fuse.hp;s.atk+=h.fuse.atk;s.def+=h.fuse.def;s.mdef+=h.fuse.mdef;s.as+=h.fuse.as;s.crit+=h.fuse.crit;
 s.asm=1+s.as;s.as=d.as/s.asm;
 if(team){var A=auraSet(team);d.sym.forEach(function(sy){if(A[sy]){var a=SYM[sy].a;if(a.hp)s.hp*=1+a.hp;if(a.atk)s.atk*=1+a.atk;if(a.def){s.def*=1+a.def;}if(a.mdef)s.mdef*=1+a.mdef;if(a.as)s.as/=1+a.as;if(a.crit)s.crit+=a.crit;}});}
 if(h.awk&&d.awk.p==='cd')s.cdm+=.4;
 return s;}
function heroPower(id,team){var s=heroStats(id,team);return Math.round(s.hp/6+s.atk*2.6/s.as*1.1+s.def*1.5+s.mdef);}
function needHeroExp(lv){return Math.round(36*Math.pow(lv,1.45));}
function needPExp(l){return 30+10*l;}
function addHeroExp(id,x){var h=hx(id),up=0;if(!h.own)return 0;while(x>0&&h.lv<SAVE.plv&&h.lv<MAXPLV){var need=needHeroExp(h.lv)-h.exp;if(x>=need){x-=need;h.lv++;h.exp=0;up++;}else{h.exp+=x;x=0;}}
 if(h.lv>=SAVE.plv)h.exp=Math.min(h.exp,needHeroExp(h.lv)-1);return up;}
function addPExp(x){var up=0;while(x>0&&SAVE.plv<MAXPLV){var need=needPExp(SAVE.plv)-SAVE.pexp;if(x>=need){x-=need;SAVE.plv++;SAVE.pexp=0;up++;}else{SAVE.pexp+=x;x=0;}}
 if(up){SAVE.energy=Math.max(SAVE.energy,maxEnergy());SAVE.enT=NOW();}return up;}
/* ---------- energy / daily ---------- */
function maxEnergy(){return Math.min(120,60+2*(SAVE.plv-1));}
function tickEnergy(){var m=maxEnergy(),n=NOW();if(SAVE.energy>=m){SAVE.enT=n;return;}var g=Math.floor((n-SAVE.enT)/ENREGEN);if(g>0){SAVE.energy=Math.min(m,SAVE.energy+g);SAVE.enT=SAVE.energy>=m?n:SAVE.enT+g*ENREGEN;}}
function spendEnergy(c){tickEnergy();if(SAVE.energy<c)return false;if(SAVE.energy>=maxEnergy())SAVE.enT=NOW();SAVE.energy-=c;return true;}
function addEnergy(c){tickEnergy();SAVE.energy+=c;if(SAVE.energy>=maxEnergy()&&c<=0)SAVE.enT=NOW();}
function nextEnergyIn(){var m=maxEnergy();if(SAVE.energy>=m)return 0;return Math.max(0,ENREGEN-(NOW()-SAVE.enT))/1000;}
function dayKey(){var d=new Date(NOW()-5*3600000);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function checkDaily(){var k=dayKey();if(SAVE.daily.day!==k){var D=SAVE.daily;D.day=k;D.heroic={};D.freeCoin=0;D.surv=0;D.adN=0;D.feast={noon:0,eve:0};SAVE.surv.act=0;SAVE.surv.stage=0;SAVE.surv.units=null;save();}}
function feastSlot(){var h=new Date(NOW()).getHours();if(h>=12&&h<14)return 'noon';if(h>=18&&h<20)return 'eve';return null;}
function feastAvail(){var s=feastSlot();return s&&!SAVE.daily.feast[s]?s:null;}
function claimFeast(){var s=feastAvail();if(!s)return false;SAVE.daily.feast[s]=1;addEnergy(60);save();return true;}
/* ---------- rewards ---------- */
function grant(r){var out=[];
 if(r.coins){SAVE.coins+=r.coins;}if(r.gems){SAVE.gems+=r.gems;}if(r.potS)SAVE.potS+=r.potS;if(r.potL)SAVE.potL+=r.potL;if(r.tickets)SAVE.tickets+=r.tickets;if(r.energy)addEnergy(r.energy);
 if(r.frag)for(var k in r.frag)hx(k).frag+=r.frag[k];
 if(r.af)for(var a in r.af)hx(a).af+=r.af[a];
 if(r.gear)for(var g in r.gear)SAVE.bag[g]=(SAVE.bag[g]||0)+r.gear[g];
 save();}
function addTo(o,k,v){o[k]=(o[k]||0)+v;}
function rollDrops(stg,mult){var r={coins:0,frag:{},gear:{},af:{},potS:0};mult=mult||1;
 var ng=1+(rnd()<.5?1:0);for(var i=0;i<ng;i++){var t=stg.tier;if(rnd()<.3)t=Math.max(1,t-1);addTo(r.gear,'g'+ri(0,5)+'_'+t,1);}
 if(stg.heroic){addTo(r.frag,stg.feat,ri(3,5));if(rnd()<.75)addTo(r.af,stg.feat,ri(1,2));if(rnd()<.4)addTo(r.frag,ri(1,NHERO),ri(1,3));}
 else{if(rnd()<.7)addTo(r.frag,stg.feat,ri(1,3));if(rnd()<.2)addTo(r.frag,ri(1,NHERO),1);}
 if(rnd()<.35)r.potS+=ri(1,2);
 return r;}
function mergeRew(a,b){['coins','gems','potS','potL','tickets','pexp','hxp'].forEach(function(k){if(b[k])a[k]=(a[k]||0)+b[k];});['frag','gear','af'].forEach(function(k){if(b[k]){a[k]=a[k]||{};for(var x in b[k])a[k][x]=(a[k][x]||0)+b[k][x];}});return a;}
/* ---------- hero upgrades ---------- */
function useExpItem(id,kind){var h=hx(id);if(h.lv>=SAVE.plv||h.lv>=MAXPLV)return 'cap';if(kind==='S'){if(SAVE.potS<1)return 'none';SAVE.potS--;addHeroExp(id,100);}else{if(SAVE.potL<1)return 'none';SAVE.potL--;addHeroExp(id,500);}save();return 'ok';}
function unlockHero(id){var h=hx(id);if(h.own||h.frag<UNLOCKFRAG)return false;h.frag-=UNLOCKFRAG;h.own=1;h.lv=Math.min(SAVE.plv,Math.max(1,SAVE.plv-2));h.exp=0;save();return true;}
function starCost(id){var h=hx(id);return h.star>=5?null:{f:STARCOST[h.star],c:300*h.star*h.star};}
function starUp(id){var h=hx(id),c=starCost(id);if(!c||h.frag<c.f||SAVE.coins<c.c)return false;h.frag-=c.f;SAVE.coins-=c.c;h.star++;save();return true;}
function equipSlot(id,slot){var h=hx(id),k='g'+slot+'_'+h.grade;if(h.gear[slot]||!SAVE.bag[k])return false;SAVE.bag[k]--;h.gear[slot]=h.grade;return true;}
function equipAll(id){var n=0;for(var i=0;i<6;i++)if(equipSlot(id,i))n++;if(n)save();return n;}
function canFuse(id){var h=hx(id);if(h.grade>=5)return false;for(var i=0;i<6;i++)if(h.gear[i]!==h.grade)return false;return true;}
function fuseCost(id){return 600*hx(id).grade*hx(id).grade;}
function fuseHero(id){var h=hx(id);if(!canFuse(id)||SAVE.coins<fuseCost(id))return false;SAVE.coins-=fuseCost(id);
 for(var i=0;i<6;i++){var g=gearStat(i,h.gear[i]);for(var k in g)h.fuse[k]+=g[k]*.55;h.gear[i]=0;}
 h.grade++;save();return true;}
function craftCost(t){return 400*t;}
function craft(slot,t){var k='g'+slot+'_'+t;if(t>=4||(SAVE.bag[k]||0)<3||SAVE.coins<craftCost(t))return false;SAVE.bag[k]-=3;SAVE.coins-=craftCost(t);var n='g'+slot+'_'+(t+1);SAVE.bag[n]=(SAVE.bag[n]||0)+1;save();return true;}
function skUnlocked(id,i){return hx(id).grade>=(i===0?1:i+1);}
function skCap(id,i){var lv=hx(id).lv;return i<2?lv:Math.max(1,lv-(i===2?20:40));}
function skCost(id,i){var l=hx(id).sk[i];return Math.round(70*Math.pow(l,1.5)*(1+i*.35));}
function skUp(id,i){var h=hx(id);if(SAVE.plv<7||!skUnlocked(id,i)||h.sk[i]>=skCap(id,i)||h.sk[i]>=MAXPLV)return 'no';var c=skCost(id,i);if(SAVE.coins<c)return 'coin';SAVE.coins-=c;h.sk[i]++;save();return 'ok';}
function skMul(l){return 1+.07*(l-1);}
/* awakening */
var AF_NEED=12,TRIAL_NEED=3;
function awmState(id){var h=hx(id),d=HEROES[id],q=HQUIP[d.cls];return [h.af>=AF_NEED,h.trial>=TRIAL_NEED,!!h.awm[2]];}
function canAwaken(id){var h=hx(id),s=awmState(id);return h.lv>=AWAKEN_LV&&!h.awk&&s[0]&&s[1]&&s[2];}
function doAwaken(id){if(!canAwaken(id))return false;var h=hx(id);h.af-=AF_NEED;h.awk=1;save();return true;}
function awakenable(id){var h=hx(id);return h.own&&h.lv>=AWAKEN_LV;}
/* team */
function teamValid(){return SAVE.team.filter(function(id){return hx(id)&&hx(id).own;});}
function fixTeam(){var t=teamValid().slice(0,5);var own=[];for(var i=1;i<=NHERO;i++)if(hx(i).own)own.push(i);for(var j=0;j<own.length&&t.length<5;j++)if(t.indexOf(own[j])<0)t.push(own[j]);SAVE.team=t;return t;}
function teamPower(){var t=fixTeam(),p=0;t.forEach(function(id){p+=heroPower(id,t);});return p;}
/* stage progress */
function stageRec(z,s,heroic){var m=heroic?SAVE.camp.h:SAVE.camp.n,k=z+'_'+s;return m[k]||(m[k]={st:0,cl:0});}
function stageUnlocked(z,s,heroic){if(heroic){if(SAVE.plv<HEROIC_PLV)return false;return stageRec(z,s,false).st>0&&(s===1&&z===1?true:prevCleared(z,s,true));}return prevCleared(z,s,false);}
function prevCleared(z,s,heroic){if(z===1&&s===1)return true;var pz=z,ps=s-1;if(ps<1){pz=z-1;ps=6;}if(pz<1)return true;return stageRec(pz,ps,heroic).st>0;}
function totalStars(heroic){var t=0,m=heroic?SAVE.camp.h:SAVE.camp.n;for(var k in m)t+=m[k].st;return t;}
function nextStage(){for(var z=1;z<=NZONE;z++)for(var s=1;s<=6;s++)if(stageRec(z,s,false).st===0)return [z,s];return [NZONE,6];}
/* ---------- battle simulation ---------- */
var B=null,GEO={mid:400,kf:1};
var ROWOFF=[62,138,208],PERSP=[1.05,.96,.88];
function geom(){var top=74,bot=LH-158;GEO.mid=(top+bot)/2+10;GEO.kf=clamp((bot-top)/620,.76,1.06);}
function unitY(u){return GEO.mid+u.ro*GEO.kf;}
var TUNE={hp:1.5,atk:1.15,zh:.9,za:.7,bh:1,ba:1,zh2:1.5,za2:1.1};
function zfH(z){z=Math.min(z,NZONE);return 1+TUNE.zh*(Math.min(z,5)-1)+TUNE.zh2*Math.max(0,z-5);}
function zfA(z){z=Math.min(z,NZONE);return 1+TUNE.za*(Math.min(z,5)-1)+TUNE.za2*Math.max(0,z-5);}
function eStatBase(L){return (1+.12*(L-1));}
function mkUnit(side){return {meta_h:function(){var m=this.meta;return (m.idle?m.idle[1]:m[1])*this.k*GEO.kf;},side:side,alive:true,hp:1,mhp:1,pw:0,sh:0,shT:0,st:{stun:0,frz:0,slow:0,sil:0,taunt:0,blind:0},buffs:[],burn:[],skcd:[0,0,0],cast:null,ct:0,at:0,hurt:0,dead:0,lg:0,cd:rr(.2,1),tgt:null,kx:0,ph:rnd()*6.28,blink:rr(1,4),em:null,emT:0,drop:0,inv:0,red:0,tauntT:0,pwm:1,k:.4,ud:0,hits:0};}
function mkAlly(id,team,carry){var d=HEROES[id],h=hx(id),s=heroStats(id,team),u=mkUnit('a');
 u.hid=id;u.d=d;u.name=d.n;u.lvl=h.lv;u.row=d.line;u.ro=ROWOFF[d.line];u.mhp=s.hp;u.hp=s.hp;u.atk=s.atk;u.def=s.def;u.mdef=s.mdef;u.as=s.as;u.crit=s.crit;u.cdm=s.cdm;u.dt=d.dt;u.melee=!!d.melee;
 u.sk=h.sk.slice();u.unl=[1,h.grade>=2,h.grade>=3,h.grade>=4];u.awk=h.awk?d.awk.p:null;u.revUsed=0;u.pwm=u.awk==='pw'?1.35:1;
 u.skcd=[rr(2,5)*(.5),rr(3,7)*.6,rr(4,9)*.6];u.k=.44*PERSP[d.line];u.meta=META['h'+id];
 if(carry){u.hp=Math.max(1,carry.hp);u.pw=carry.pw;if(carry.dead){u.alive=false;u.hp=0;u.dead=9;}}
 return u;}
function mkEnemy(stg,spec,zone){var u=mkUnit('e'),L=stg.lvl,m=eStatBase(L)*(stg.mult||1),mh=m*TUNE.hp*zfH(zone),ma=m*TUNE.atk*zfA(zone);
 if(spec.boss){var bd=BOSSES[zone];u.boss=true;u.bd=bd;u.name=bd.n;u.lvl=L+1;u.row=1;u.ro=-ROWOFF[1]*.85;u.mhp=300*bd.mh*mh*TUNE.bh;u.atk=26*bd.ma*ma*TUNE.ba;u.def=10*bd.md*m;u.mdef=10*bd.md*m;u.as=bd.as;u.dt=bd.t;u.melee=bd.t==='p';u.k=bd.sc;u.meta=META['b'+zone];u.img='b'+zone;
  u.abs=bd.ab.map(function(a){return {a:a,cd:rr(1.5,3.5)};});u.phs=bd.ph.map(function(p){return {p:p,done:0};});u.cd=3;}
 else{var ed=ENM[zone][spec.j],ar=ARCH[ed.a];u.ed=ed;u.name=ed.n;u.lvl=L;u.row=ar.row;u.ro=-ROWOFF[ar.row];u.mhp=300*ar.hp*mh;u.atk=26*ar.atk*ma;u.def=10*ar.def*m;u.mdef=10*ar.def*m;u.as=ar.as;u.dt=ed.t;u.melee=!!ar.m;u.k=(ed.a==='tank'?.38:ed.a==='fast'?.31:.34)*PERSP[ar.row];u.meta=META['e'+zone+'_'+(spec.j+1)];u.img='e'+zone+'_'+(spec.j+1);
  if(ed.sk)u.abs=[{a:ed.sk,cd:rr(2,5)}];
  if(spec.elite){u.elite=true;u.mhp*=2.2;u.atk*=1.3;u.k*=1.22;u.name='ผู้นำ'+u.name;}}
 u.hp=u.mhp;u.crit=.05;u.cdm=1.5;u.cd=rr(.5,u.as);u.drop=.7+rnd()*.3;u.ezone=zone;return u;}
function aliveOf(side){var o=[];for(var i=0;i<B.us.length;i++){var u=B.us[i];if(u.alive&&u.side===side)o.push(u);}return o;}
function layoutSide(side){var rows=[[],[],[]];B.us.forEach(function(u){if(u.side===side&&(u.alive||side==='a'))rows[u.row].push(u);});
 rows.forEach(function(r){var n=r.length;r.forEach(function(u,i){var w=n>3?Math.min(100,250/(n-1)):120;var x=n===1?195:195+(i-(n-1)/2)*(n===2?140:w);if(n===1&&side==='a'&&u.row===0)x=195;u.x=x;u.hx=x;});});}
function startBattle(opt){ // opt: stg, mode, team, carry
 geom();var team=opt.team.slice();var stg=opt.stg;
 B={stg:stg,mode:opt.mode||'camp',us:[],ev:[],pr:[],t:0,wave:-1,nw:stg.waves.length,state:'intro',sT:0,hs:0,shake:0,cut:null,speed:1,auto:!!opt.auto,combo:0,comboT:0,maxCombo:0,pause:false,
  st:{dealt:0,taken:0,healed:0,stuns:0,ults:0,kills:0,bossLast:false,deaths:0},res:null,fx:[],flo:[],part:[],mk:[],team:team,opt:opt,zone:stg.z,boss:null,msg:[],ultQ:0,walk:0,shk:{x:0,y:0},flash:0,bar:null,cdAuto:0,tutT:0};
 team.forEach(function(id){var c=opt.carry&&opt.carry[id];B.us.push(mkAlly(id,team,c));});
 layoutSide('a');B.us.forEach(function(u){u.x=u.hx;});
 nextWave();return B;}
function nextWave(){B.wave++;var w=B.stg.waves[B.wave];B.us=B.us.filter(function(u){return u.side==='a'||u.alive||u.dead<.1;});
 w.forEach(function(sp){var u=mkEnemy(B.stg,sp,B.stg.z);B.us.push(u);if(u.boss)B.boss=u;});layoutSide('e');B.us.forEach(function(u){if(u.side==='e'){u.x=u.hx;}});
 B.state='intro';B.sT=0;B.msg.push(1);
 var isB=!!B.us.filter(function(u){return u.boss&&u.alive;}).length;
 if(isB){bannerShow('ระวัง! บอสมาแล้ว','',true);sfx('warn',.9);say('boss');music('boss',1);B.bossSeg=true;}
 else{bannerShow('รอบที่ '+(B.wave+1)+' / '+B.nw,'',false);sfx('wave',.8);if(B.wave>0)say('wave');}}
/* ---------- stats ---------- */
function gs(u,stat){var s=u[stat],p=0;for(var i=0;i<u.buffs.length;i++)if(u.buffs[i].stat===stat)p+=u.buffs[i].pct;return stat==='crit'?u.crit+p:s*Math.max(.2,1+p);}
function speedM(u){var p=0;for(var i=0;i<u.buffs.length;i++)if(u.buffs[i].stat==='as')p+=u.buffs[i].pct;return Math.max(.3,1+p)*(u.st.slow>0?.6:1);}
function stunned(u){return u.st.stun>0||u.st.frz>0;}
function gainPw(u,x){if(u.side!=='a'||!u.alive)return;var was=u.pw;u.pw=Math.min(1000,u.pw+x*u.pwm);if(was<1000&&u.pw>=1000){sfx('ultready',.7);u.em='!';u.emT=1.4;if(!B.rdyS||B.rdyS<B.t-4){B.rdyS=B.t;say('ready');}}}
/* ---------- damage ---------- */
function dealDamage(src,tgt,coef,o){o=o||{};if(!tgt.alive||tgt.inv>0&&!o.dot)return 0;
 var type=o.type||src.dt,atk=gs(src,'atk')*coef,dmg=atk*rr(.93,1.07);
 var df=(type==='m'?tgt.mdef:tgt.def)*Math.max(.1,1+bsum(tgt,'def'))*(1-(o.pierce||0));var red=df/(df+60+6*src.lvl);if(o.dot)red*=.4;dmg*=1-red;
 var crit=false;if(!o.nocrit&&!o.dot&&rnd()<gs(src,'crit')){crit=true;dmg*=src.cdm;}
 if(tgt.st.frz>0)dmg*=1.15;if(tgt.tauntT>0)dmg*=1-tgt.red;if(o.exe&&tgt.hp<tgt.mhp*.35)dmg*=1+o.exe;var dr=bsum(tgt,'dr');if(dr>0)dmg*=1-Math.min(.75,dr);
 if(src.side==='a'){dmg*=1+Math.min(.2,B.combo*.004);}
 else if(tgt.side==='a'&&B.opt.eMul)dmg*=B.opt.eMul;
 dmg=Math.max(1,Math.round(dmg));var real=dmg;
 if(tgt.sh>0){var ab=Math.min(tgt.sh,dmg);tgt.sh-=ab;dmg-=ab;if(tgt.sh<=0)tgt.shT=0;}
 tgt.hp-=dmg;tgt.hurt=.18;tgt.kx=(src.x<tgt.x?1:-1)*(o.big?9:5);
 if(!o.dot){tgt.ud=0;}
 var yy=unitY(tgt)-tgt.meta_h()*.62;
 floater(tgt.x+rr(-10,10),yy,real,src.side==='a'?(crit?'crit':(o.big?'big':'dmg')):'foe',o);
 if(src.side==='a'){src.dl=(src.dl||0)+real;B.st.dealt+=real;B.combo++;B.comboT=2.6;if(B.combo>B.maxCombo)B.maxCombo=B.combo;gainPw(src,o.skill?9:24);
  if(src.awk==='ls'&&!o.dot)healUnit(src,real*.1,true);
  if(o.lsp)healUnit(src,real*o.lsp,false);
  if(crit){sfx('crit',.7,rr(.95,1.1),.05);B.hs=Math.max(B.hs,.05);if(rnd()<.25)say('crit');}
  else sfx(o.skill?'hit2':'hit',.5,rr(.9,1.15),.05);
  if(B.combo===10||B.combo===30||B.combo===60){say('combo');}}
 else{tgt.tk=(tgt.tk||0)+real;B.st.taken+=real;sfx('hit',.35,rr(.7,.9),.06);gainPw(tgt,clamp(14+380*real/tgt.mhp,10,100));
  }
 if(tgt.awk==='thorn'&&!o.dot&&src.alive&&tgt.side==='a'){var rf=Math.max(1,Math.round(real*.18));src.hp-=rf;floater(src.x,unitY(src)-src.meta_h()*.5,rf,'dmg',{});if(src.hp<=0)killUnit(tgt,src);}
 chipFx(tgt,crit||o.big);
 if(tgt.hp<=0){killUnit(src,tgt);}
 else if(tgt.boss)checkPhase(tgt);
 return real;}
function bsum(u,stat){var p=0;for(var i=0;i<u.buffs.length;i++)if(u.buffs[i].stat===stat)p+=u.buffs[i].pct;return p;}
function healUnit(u,amt,quiet,src){if(!u.alive)return;amt=Math.round(amt);var a=Math.min(amt,u.mhp-u.hp);if(a<=0)return;u.hp+=a;if(u.side==='a')B.st.healed+=a;if(src)src.hl=(src.hl||0)+a;if(!quiet||a>u.mhp*.04)floater(u.x,unitY(u)-u.meta_h()*.7,a,'heal',{});}
function killUnit(src,u){if(!u.alive)return;
 if(u.side==='a'&&u.awk==='rev'&&!u.revUsed){u.revUsed=1;u.hp=u.mhp*.35;u.inv=1;floater(u.x,unitY(u)-u.meta_h(),'ฟื้นคืนชีพ!','heal',{});sfx('heal',.8);ringFx(u.x,unitY(u)-30,'#7dffb0');return;}
 u.alive=false;u.hp=0;u.dead=1;u.cast=null;u.cd=0;
 if(u.side==='a'){B.st.deaths++;sfx('death',.8);u.em='x';u.emT=2;say('down');chainBoom(u,10);B.shake=Math.max(B.shake,6);}
 else{B.st.kills++;SAVE.stats.kills++;sfx(u.boss?'bossdie':'crumble',u.boss?1:.7,rr(.9,1.1),.03);chainBoom(u,u.boss?34:u.elite?18:11);
  if(src&&src.side==='a'){gainPw(src,300);floater(src.x,unitY(src)-src.meta_h()*.9,'+โบนัสพลัง','pw',{});if(u.boss)B.st.bossLast=true;}
  if(u.boss){B.shake=16;B.hs=.25;B.slowT=1.2;var all=aliveOf('e');all.forEach(function(e){e.hp=0;e.alive=false;e.dead=1;chainBoom(e,8);});}
  else B.shake=Math.max(B.shake,u.elite?8:3);}
}
function dotTick(u,dt){if(!u.burn.length)return;var tot=0;for(var i=u.burn.length-1;i>=0;i--){var b=u.burn[i];b.t-=dt;b.acc+=dt;if(b.acc>=.5){b.acc-=.5;var d=Math.max(1,Math.round(b.dps*.5*rr(.95,1.05)));
  u.hp-=d;u.hurt=.08;floater(u.x+rr(-8,8),unitY(u)-u.meta_h()*.6,d,b.kd==='poison'?'pois':b.kd==='bleed'?'bleed':'burn',{});if(b.kd&&rnd()<.5)dotPart(u,b.kd);if(b.src&&b.src.side==='a'){B.st.dealt+=d;gainPw(b.src,3);}
  if(u.hp<=0){killUnit(b.src,u);return;}}if(b.t<=0)u.burn.splice(i,1);}}
function applySt(src,tgt,st){if(!tgt.alive||!st)return;var bs=tgt.boss?.35:1;if(src.side==='a'&&(st.stun||st.frz))src.sn=(src.sn||0)+1;
 if(st.stun&&tgt.inv<=0){tgt.st.stun=Math.max(tgt.st.stun,st.stun*bs);B.st.stuns++;tgt.cast&&interrupt(tgt);ringFx(tgt.x,unitY(tgt)-tgt.meta_h(),'#ffe27a',true);}
 if(st.frz){tgt.st.frz=Math.max(tgt.st.frz,st.frz*bs);B.st.stuns++;tgt.cast&&interrupt(tgt);iceFx(tgt);}
 if(st.slow)tgt.st.slow=Math.max(tgt.st.slow,st.slow);
 if(st.sil)tgt.st.sil=Math.max(tgt.st.sil,st.sil);
 if(st.burn)tgt.burn.push({dps:src.atk*st.burn[0],t:st.burn[1],acc:0,src:src,kd:'burn'});
 if(st.poison)tgt.burn.push({dps:src.atk*st.poison[0],t:st.poison[1],acc:0,src:src,kd:'poison'});
 if(st.bleed)tgt.burn.push({dps:src.atk*st.bleed[0],t:st.bleed[1],acc:0,src:src,kd:'bleed'});
 if(st.blind)tgt.st.blind=Math.max(tgt.st.blind,st.blind);}
function interrupt(u){if(!u.cast)return;u.cast=null;u.cd=Math.max(u.cd,.8);if(u.abs&&u.abs[u.castI])u.abs[u.castI].cd=Math.max(u.abs[u.castI].cd,3);floater(u.x,unitY(u)-u.meta_h()*1.05,'ขัดจังหวะ!','crit',{small:1});sfx('stun',.6);B.mk=B.mk.filter(function(m){return m.u!==u;});}
/* ---------- targeting ---------- */
function frontRow(side){var best=9,l=aliveOf(side);l.forEach(function(u){if(u.row<best)best=u.row;});return l.filter(function(u){return u.row===best;});}
function pickTarget(u){var foes=aliveOf(u.side==='a'?'e':'a');if(!foes.length)return null;
 if(u.side==='e'){var tn=foes.filter(function(f){return f.tauntT>0;});if(tn.length)return pick(tn);}
 if(u.melee){var fr=frontRow(u.side==='a'?'e':'a');return pick(fr);}
 var a=pick(foes),b=pick(foes);return a.hp/a.mhp<b.hp/b.mhp?a:b;}
function enemiesOf(u){return aliveOf(u.side==='a'?'e':'a');}
function alliesOf(u){return aliveOf(u.side);}
/* ---------- basic attack ---------- */
function doAttack(u){if(!u.tgt||!u.tgt.alive||(u.side==='e'&&u.tgt.tauntT<=0&&aliveOf('a').some(function(a){return a.tauntT>0;})))u.tgt=pickTarget(u);if(!u.tgt)return;
 var t=u.tgt;u.at=.34;u.atT0=.34;u.cd=u.as*rr(.92,1.08);
 if(u.st.blind>0&&rnd()<.55){u.at=.34;u.atT0=.34;u.cd=u.as*rr(.92,1.08);floater(t.x,unitY(t)-t.meta_h()*.7,'พลาด!','pw',{small:1});return;}
 if(u.melee){u.lgTo=t;at(.13,function(){if(!u.alive||stunned(u))return;if(!t.alive){return;}dealDamage(u,t,1,{});if(u.side==='a'&&u.hid)sfx(u.hid===2?'slash':'hit',.4,rr(.9,1.2),.05);slashFx(t,u);});}
 else{var ktype=u.side==='a'?(u.d.bt||'magic'):(u.boss?'fire':'magic');
  if(u.side==='e'&&u.dt==='p')ktype='arrow';
  at(.12,function(){if(!u.alive||stunned(u))return;projectile(u,t,ktype,function(){if(t.alive)dealDamage(u,t,1,{});else{var n=pickTarget(u);if(n)dealDamage(u,n,1,{});}});});sfx(ktype==='arrow'||ktype==='gun'?'arrow':ktype==='bomb'?'boom':'magic',.25,rr(.9,1.2),.06);}}
function at(t,fn){B.ev.push({t:t,fn:fn});}
/* ---------- ally skills ---------- */
function skillTargets(u,sk){var en=enemiesOf(u),al=alliesOf(u);
 switch(sk.tgt){case 'all':return sk.k==='dmg'||sk.k==='debuff'?en:al;
  case 'one':return u.tgt&&u.tgt.alive?[u.tgt]:(en.length?[pick(en)]:[]);
  case 'weak':{var m=null;en.forEach(function(e){if(!m||e.hp<m.hp)m=e;});return m?[m]:[];}
  case 'rand':return en;
  case 'row':{var t=u.tgt&&u.tgt.alive?u.tgt:null;if(!t&&en.length)t=pick(en);return t?en.filter(function(e){return e.row===t.row;}):[];}
  case 'splash':{var t2=u.tgt&&u.tgt.alive?u.tgt:(en.length?pick(en):null);return t2?[t2].concat(en.filter(function(e){return e!==t2&&Math.abs(e.x-t2.x)<130&&e.row===t2.row;})):[];}
  case 'low':{var l=null;al.forEach(function(a){if(!l||a.hp/a.mhp<l.hp/l.mhp)l=a;});return l?[l]:[];}
  case 'front':return frontRow(u.side==='a'?'e':'a');
  case 'back':{var bk=-1;en.forEach(function(e){if(e.row>bk)bk=e.row;});return en.filter(function(e){return e.row===bk;});}
  case 'self':return [u];}
 return [];}
function skillReady(u,i){var sk=u.d.sk[i];if(!u.unl[i]||stunned(u)||u.st.sil>0||u.at>.05||u.casting>0)return false;
 if(!enemiesOf(u).length)return false;
 if(sk.k==='heal'){var low=alliesOf(u).some(function(a){return a.hp/a.mhp<.78;});if(!low)return false;}
 if(sk.k==='shield'&&sk.tgt==='self'&&u.sh>u.mhp*.15)return false;
 return true;}
function castSkill(u,i,ult){var sk=u.d.sk[i],lv=u.sk[i],mul=skMul(lv),en=enemiesOf(u);if(!en.length&&sk.k==='dmg')return;
 u.casting=.5;u.at=.5;u.atT0=.5;u.glow=.5;B.st.ults+=ult?1:0;
 var hits=sk.h||1,iv=sk.iv||0,ty=sk.k==='dmg'?(sk.tgt==='all'||true?u.dt:u.dt):u.dt;
 sfx(sk.sf||'magic',ult?.9:.6,1,.1);
 if(sk.k==='dmg'){var base=sk.c*mul;
  var fixed=(sk.tgt==='all'||sk.tgt==='row'||sk.tgt==='splash'||sk.tgt==='one'||sk.tgt==='weak'||sk.tgt==='front'||sk.tgt==='back')?skillTargets(u,sk):null;
  for(var h=0;h<hits;h++)(function(h){at(.18+h*iv,function(){if(!u.alive&&!ult&&false)return;var ts=fixed?fixed.filter(function(t){return t.alive;}):(function(){var e=enemiesOf(u);return e.length?[pick(e)]:[];})();
   ts.forEach(function(t,ti){var d=function(){if(!t.alive){return;}dealDamage(u,t,base,{skill:1,pierce:sk.pierce,big:ult,type:u.dt,exe:sk.exe,lsp:sk.lsp});if(h===hits-1||sk.tgt==='all'||hits===1)applySt(u,t,sk.st);
     if(sk.debuff&&h===hits-1)addBuff(t,sk.debuff.stat,-sk.debuff.pct,sk.debuff.dur);};
    var dly=sk.tgt==='all'?ti*.04:0;skillVis(u,t,sk,ult,d,dly);});});})(h);
  if(ult)at(.18,function(){B.shake=Math.max(B.shake,ult?10:4);});
  if(sk.shd)at(.3,function(){if(u.alive){u.sh=Math.max(u.sh,u.mhp*.22*sk.shd);u.shT=8;u.shMax=u.sh;shieldFx(u);}});
  if(sk.rev)at(.5,function(){var dd=B.us.filter(function(a){return a.side==='a'&&!a.alive;});if(dd.length){var r=dd[0];r.alive=true;r.hp=r.mhp*sk.rev;r.dead=0;r.inv=1;r.pw=Math.max(r.pw,300);ringFx(r.x,unitY(r),'#ffb04a');floater(r.x,unitY(r)-r.meta_h(),'ฟื้นคืนชีพ!','heal',{});sfx('heal',.7);}});}
 else if(sk.k==='heal'){at(.2,function(){var al=skillTargets(u,sk);var m=sk.c*mul*(u.awk==='rev'?1.25:1);
  if(sk.revive){var dead=B.us.filter(function(a){return a.side==='a'&&!a.alive;});if(dead.length){var r=dead[0];r.alive=true;r.hp=r.mhp*sk.revive;r.dead=0;r.inv=1;r.pw=Math.max(r.pw,300);ringFx(r.x,unitY(r),'#fff4a8');floater(r.x,unitY(r)-r.meta_h(),'ฟื้นคืนชีพ!','heal',{});al=alliesOf(u);m*=.5;}}
  al.forEach(function(t,ti){healUnit(t,u.atk*m,false,u);if(sk.cleanse){t.st.stun=0;t.st.frz=0;t.st.sil=0;t.burn.length=0;t.st.blind=0;}if(sk.shd){t.sh=Math.max(t.sh,u.atk*m*sk.shd*.6);t.shT=7;t.shMax=t.sh;shieldFx(t);}healFx(t,ti*.05);});sfx('heal',.7);});}
 else if(sk.k==='shield'){at(.2,function(){skillTargets(u,sk).forEach(function(t,ti){var a=u.atk*sk.c*mul;t.sh=Math.max(t.sh,a);t.shT=sk.dur;t.shMax=a;shieldFx(t);});sfx('shield',.7);});}
 else if(sk.k==='buff'){at(.2,function(){skillTargets(u,sk).forEach(function(t){addBuff(t,sk.stat,sk.pct*(1+(mul-1)*.5),sk.dur);buffFx(t,sk.stat);});sfx('buff',.6);});}
 else if(sk.k==='debuff'){at(.2,function(){skillTargets(u,sk).forEach(function(t,ti){addBuff(t,sk.stat,-sk.pct,sk.dur);if(sk.st)applySt(u,t,sk.st);skillVis(u,t,sk,false,function(){},ti*.03);});});}
 else if(sk.k==='taunt'){at(.15,function(){u.tauntT=sk.dur;u.red=sk.red;buffFx(u,'def');ringFx(u.x,unitY(u)-30,'#ff6a4a');floater(u.x,unitY(u)-u.meta_h(),'ยั่วโมโห!','crit',{small:1});sfx('roar',.5);});}
 else if(sk.k==='power'){at(.2,function(){(sk.tgt==='self'?[u]:alliesOf(u)).forEach(function(t){gainPw(t,sk.amt);buffFx(t,'pw');});sfx('buff',.6);});}
 if(ult){say(u.d.voice);}
}
function addBuff(u,stat,pct,dur){for(var i=0;i<u.buffs.length;i++){var b=u.buffs[i];if(b.stat===stat&&Math.sign(b.pct)===Math.sign(pct)){b.t=Math.max(b.t,dur);b.pct=Math.abs(pct)>Math.abs(b.pct)?pct:b.pct;return;}}u.buffs.push({stat:stat,pct:pct,t:dur});}
/* ---------- ultimate tap ---------- */
function tapUlt(idx){if(!B||B.state!=='fight'||B.cut)return false;var u=B.us.filter(function(x){return x.side==='a';})[idx];if(!u||!u.alive||u.pw<1000)return false;
 if(stunned(u)||u.st.sil>0){sfx('nope',.6);return false;}
 u.pw=0;B.cut={u:u,t:0,dur:.95};sfx('cutin',.9);ultCutShow(u);SAVE.stats.ults++;return true;}
function resolveUlt(u){castSkill(u,0,true);B.flash=.35;B.hs=.1;}
/* ---------- enemy abilities ---------- */
function startCast(u,idx){var ab=u.abs[idx],a=ab.a,al=aliveOf('a');if(!al.length)return;var tg=[];
 switch(a.k){case 'single':case 'stun1':{var t=pickTarget({side:'e',melee:u.boss||u.melee&&false?0:1,x:u.x});tg=[t||pick(al)];break;}
  case 'row':{var t0=pick(al);tg=al.filter(function(x){return x.row===t0.row;});break;}
  case 'all':tg=al;break;
  case 'meteor':{for(var i=0;i<3;i++)tg.push(pick(al));break;}
  default:tg=[];}
 u.cast={ab:ab,a:a,t:a.cast,tot:a.cast,tg:tg};u.castI=idx;ab.cd=a.cd*rr(.95,1.1);u.cd=Math.max(u.cd,a.cast+.3);
 tg.forEach(function(t){B.mk.push({u:u,t:t});});
 if(u.boss||a.cast>=1.4)sfx('warn',.35,1.3);}
function fireCast(u){var c=u.cast,a=c.a;u.cast=null;B.mk=B.mk.filter(function(m){return m.u!==u;});u.at=.4;u.atT0=.4;
 var typ=a.m?'m':u.dt;
 switch(a.k){case 'single':case 'stun1':case 'row':case 'all':case 'meteor':
  c.tg.forEach(function(t,i){at(i*(a.k==='meteor'?.25:.05),function(){if(!t.alive)return;if(a.k==='meteor'){bombFx(t.x,unitY(t),1.2);}else slashFx(t,u,true);
   dealDamage(u,t,a.c,{type:typ,big:1});if(a.stun)applySt(u,t,{stun:a.stun});if(a.burn)applySt(u,t,{burn:[.12,3]});if(a.poison)applySt(u,t,{poison:[.1,4]});if(a.blind)applySt(u,t,{blind:3.5});if(a.slow)applySt(u,t,{slow:3});});});
  B.shake=Math.max(B.shake,u.boss?9:4);sfx(u.boss?'boom':'hit2',.8);break;
 case 'selfbuff':addBuff(u,'atk',a.pct,a.dur);buffFx(u,'atk');sfx('buff',.5);break;
 case 'healally':{var l=null;aliveOf('e').forEach(function(e){if(!l||e.hp/e.mhp<l.hp/l.mhp)l=e;});if(l){healUnit(l,l.mhp*a.c,false);healFx(l,0);}sfx('heal',.5);break;}}
 u.cd=Math.max(u.cd,.6);}
function checkPhase(u){if(!u.phs||u.inv>0)return;for(var i=0;i<u.phs.length;i++){var p=u.phs[i];if(!p.done&&u.hp/u.mhp<=p.p.hp){p.done=1;bossPhase(u,p.p);break;}}}
function bossPhase(u,p){u.cast=null;B.mk=B.mk.filter(function(m){return m.u!==u;});u.inv=1.3;u.roar=1.3;B.shake=14;B.hs=.1;sfx('roar',1);say('boss2');bannerShow(p.say||'บอสโกรธแล้ว!','ช่วงที่ '+(B.phIdx=(B.phIdx||1)+1),true);
 if(p.ev==='enrage'){addBuff(u,'atk',p.pct,999);u.as*=.85;}
 if(p.ab)u.abs.push({a:p.ab,cd:3});
 if(p.ev==='shield'){u.sh=u.mhp*p.pct;u.shMax=u.sh;u.shT=40;shieldFx(u);}
 if(p.ev==='silence'){aliveOf('a').forEach(function(a){a.st.sil=p.dur;});if(p.enr){addBuff(u,'atk',p.enr,999);}floater(u.x,unitY(u)-u.meta_h(),'ปิดผนึกพลัง!','crit',{});}
 if(p.enr&&p.ev!=='silence')addBuff(u,'atk',p.enr,999);
 if(p.ev==='summon'){var z=Math.min(B.stg.z,NZONE);p.add.forEach(function(j,ii){at(.5+ii*.3,function(){var e=mkEnemy(B.stg,{j:j-1},z);e.drop=.6;B.us.push(e);layoutSide('e');e.x=e.hx;e.hx=e.hx;bannerFx(e);});});}
 at(1.3,function(){u.roar=0;});}
/* ---------- battle step ---------- */
function stepUnit(u,dt){
 if(u.hurt>0)u.hurt-=dt;if(u.at>0)u.at-=dt;if(u.casting>0)u.casting-=dt;if(u.glow>0)u.glow-=dt;if(u.inv>0)u.inv-=dt;if(u.emT>0)u.emT-=dt;
 u.kx*=Math.pow(.0005,dt);u.blink-=dt;if(u.blink<-.13)u.blink=rr(2.2,5);
 if(u.drop>0)u.drop-=dt;
 if(!u.alive){if(u.dead>0&&u.side==='e')u.dead-=dt*1.6;return;}
 for(var k in u.st)if(u.st[k]>0)u.st[k]=Math.max(0,u.st[k]-dt);
 if(u.tauntT>0)u.tauntT-=dt;
 for(var i=u.buffs.length-1;i>=0;i--){u.buffs[i].t-=dt;if(u.buffs[i].t<=0)u.buffs.splice(i,1);}
 if(u.shT>0){u.shT-=dt;if(u.shT<=0)u.sh=0;}
 dotTick(u,dt);if(!u.alive)return;
 if(u.awk==='regen'&&B.state==='fight')u.hp=Math.min(u.mhp,u.hp+u.mhp*.008*dt);
 var rgb=bsum(u,'regen');if(rgb>0&&B.state==='fight'&&u.hp<u.mhp){u.hp=Math.min(u.mhp,u.hp+u.mhp*rgb*dt);u.rgT=(u.rgT||0)-dt;if(u.rgT<=0){u.rgT=.5;regenFx(u);}}
 if(u.state==='x')return;
 if(B.state!=='fight')return;
 if(stunned(u)){if(u.cast)interrupt(u);return;}
 if(u.roar>0){u.roar-=dt;return;}
 if(u.cast){u.cast.t-=dt;if(u.cast.t<=0)fireCast(u);return;}
 var spd=speedM(u);
 if(u.side==='a'){for(var s=0;s<3;s++){u.skcd[s]-=dt;if(u.skcd[s]<=0){if(skillReady(u,s+1)){castSkill(u,s+1,false);u.skcd[s]=u.d.sk[s+1].cd*rr(.95,1.05);u.cd=Math.max(u.cd,.3);}else u.skcd[s]=.7;}}}
 else if(u.abs){for(var a=0;a<u.abs.length;a++){var ab=u.abs[a];ab.cd-=dt;}
  if(u.cd<=.4){var rdy=[];for(a=0;a<u.abs.length;a++)if(u.abs[a].cd<=0)rdy.push(a);if(rdy.length){startCast(u,pick(rdy));return;}}}
 u.cd-=dt*spd;
 if(u.cd<=0&&u.at<=0&&!(u.casting>0)){doAttack(u);}
}
function stepBattle(dt){if(!B||B.pause)return;
 stepFx(dt);
 if(B.cut){B.cut.t+=dt;if(B.cut.t>=B.cut.dur){var cu=B.cut.u;B.cut=null;ultCutHide();resolveUlt(cu);}return;}
 if(B.flash>0)B.flash-=dt;if(B.shake>0)B.shake=Math.max(0,B.shake-dt*30);
 var sdt=dt;if(B.hs>0){B.hs-=dt;sdt=dt*.05;}else if(B.slowT>0){B.slowT-=dt;sdt=dt*.3;}
 for(var i=B.ev.length-1;i>=0;i--){var e=B.ev[i];e.t-=sdt;if(e.t<=0){B.ev.splice(i,1);e.fn();}}
 B.sT+=sdt;
 var us=B.us;for(i=0;i<us.length;i++)stepUnit(us[i],sdt);
 stepProj(sdt);
 if(B.comboT>0){B.comboT-=sdt;if(B.comboT<=0)B.combo=0;}
 if(B.state==='intro'){var need=B.bossSeg?2.4:1.0;if(B.sT>=need){B.state='fight';B.sT=0;B.bossSeg=false;if(B.wave===0){sfx('fight',.7);say('start');}}}
 else if(B.state==='fight'){B.t+=sdt;
  if(B.auto&&!B.cut){var al=us.filter(function(x){return x.side==='a';});for(var j=0;j<al.length;j++){var u=al[j];if(u.alive&&u.pw>=1000&&!stunned(u)&&u.st.sil<=0){tapUlt(j);break;}}}
  var en=aliveOf('e'),ally=aliveOf('a');
  if(!ally.length){B.state='lose';B.sT=0;sfx('lose',.8);say('lose');B.slowT=.8;}
  else if(!en.length){
    if(B.wave+1<B.nw){B.state='between';B.sT=0;B.bt=0;}
    else{B.state='win';B.sT=0;sfx('win',.9);say('win');ally.forEach(function(a){a.em='star';a.emT=3;});music('hub',0);}}
  else {musicLayer(B.stg.boss||B.wave>=B.nw-1);}
 }
 else if(B.state==='between'){if(B.bt===0&&B.sT>.5){B.bt=1;aliveOf('a').forEach(function(a){healUnit(a,a.mhp*.2,false);a.pw=Math.min(1000,a.pw+250);if(a.pw>=1000)sfx('ultready',.5);a.buffs=[];a.st.stun=a.st.frz=a.st.slow=a.st.sil=a.st.blind=0;a.burn.length=0;a.tauntT=0;a.sh=0;});sfx('heal',.5);B.pr.length=0;}
  if(B.sT>1.9){nextWave();}}
 else if(B.state==='win'){if(B.sT>1.7&&!B.res)finishBattle(true);}
 else if(B.state==='lose'){if(B.sT>1.6&&!B.res)finishBattle(false);}
}
function finishBattle(win){var d=B.st;var tl=B.stg.tl;var stars=[win,win&&d.deaths===0,win&&B.t<=tl];
 B.res={win:win,stars:stars,n:stars.filter(Boolean).length,time:B.t,deaths:d.deaths,st:d,maxCombo:B.maxCombo,wave:B.wave};
 if(B.opt.onEnd)B.opt.onEnd(B.res);}
/* ---------- fx ---------- */
function unitCols(u){if(u.side==='a'){var c=u.d.col;return [c,'#ffffff','#ffd23a',shade(c,-40)];}var zc=[null,['#e8dcc0','#b8a888','#8a7a60','#ffd23a'],['#e8452c','#3a78d8','#b36cf0','#ffc933'],['#3a3a48','#8a8aa0','#6a4ac8','#ffffff'],['#6bbf4a','#a8e060','#8a5a30','#ff8a4a'],['#ff5a1a','#ffab1c','#3a2a28','#ff3a2a'],['#f4f8ff','#9fdcff','#ff8a2a','#4a6a9a'],['#7fbf4a','#c8a85a','#6a4a8a','#e8e880'],['#e8c06a','#c89a3a','#4a8a7a','#fff4b0'],['#b0b8c8','#c8783a','#ffd23a','#5a6a7a'],['#8a9aa8','#4ab8c8','#e8e8e8','#c85a3a'],['#b36cf0','#6ad8ff','#ffe27a','#ffffff'],['#ff5a1a','#ffab1c','#5a2a28','#ffd23a']];return zc[u.ezone||1]||zc[5];}
function shade(hex,d){var n=parseInt(hex.slice(1),16),r=clamp((n>>16)+d,0,255),g=clamp(((n>>8)&255)+d,0,255),b=clamp((n&255)+d,0,255);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
function brick(x,y,vx,vy,c,sz){B.part.push({x:x,y:y,vx:vx,vy:vy,r:rnd()*6,vr:rr(-12,12),c:c,sz:sz||rr(5,10),t:0,life:rr(.7,1.3),k:'b'});}
function chipFx(u,big){var cs=unitCols(u),n=big?7:3,y=unitY(u)-u.meta_h()*.5;if(B.part.length>260)return;for(var i=0;i<n;i++)brick(u.x+rr(-14,14),y+rr(-20,20),rr(-110,110)*(big?1.4:1),rr(-190,-50),pick(cs),big?rr(6,11):rr(4,8));}
function floater(x,y,val,kind,o){if(!B||B.flo.length>40)return;var t=typeof val==='number'?fmtN(val):val;B.flo.push({x:x,y:y,t:0,life:kind==='crit'?1.0:.8,txt:t,k:kind,vy:kind==='crit'||kind==='big'?-70:-55,s:o&&o.small?.8:1});}
function ringFx(x,y,c,star){if(!B)return;B.fx.push({k:'ring',x:x,y:y,t:0,life:.45,c:c,star:star});}
function flashFx(x,y,r,c){B.fx.push({k:'flash',x:x,y:y,t:0,life:.25,r:r,c:c||'#fff4b0'});}
function bombFx(x,y,s){s=s||1;flashFx(x,y,70*s);ringFx(x,y,'#ffb23a');for(var i=0;i<12*s;i++){var a=rnd()*6.28,v=rr(80,260)*s;brick(x,y,Math.cos(a)*v,Math.sin(a)*v-140,pick(['#ff7a1a','#ffd23a','#e8453c','#ffffff']),rr(5,10));}B.shake=Math.max(B.shake,5*s);}
function chainBoom(u,n){var cs=unitCols(u),cx0=u.x,cy0=unitY(u)-u.meta_h()*.45,hh=u.meta_h(),ww=hh*.7;
 for(var i=0;i<n;i++)(function(i){at(i*(u.boss?.07:.045),function(){var x=cx0+rr(-ww/2,ww/2),y=cy0+rr(-hh/2,hh/2);flashFx(x,y,rr(20,u.boss?50:34),pick(['#fff4b0','#ffd23a','#ffffff']));
  for(var j=0;j<(u.boss?5:3);j++)brick(x,y,rr(-200,200),rr(-300,-60),pick(cs),rr(6,12));if(i%2===0)B.fx.push({k:'ring',x:x,y:y,t:0,life:.35,c:pick(cs)});});});
 if(B.flo)B.shake=Math.max(B.shake,u.boss?14:5);}
function slashFx(t,src,big){B.fx.push({k:'slash',x:t.x+rr(-6,6),y:unitY(t)-t.meta_h()*.5,t:0,life:.22,a:rr(-.7,.7)+(src&&src.side==='e'?3.14:0),big:big});}
function iceFx(t){var y=unitY(t)-t.meta_h()*.5;B.fx.push({k:'ice',x:t.x,y:y,t:0,life:.6});for(var i=0;i<6;i++)brick(t.x+rr(-16,16),y+rr(-24,24),rr(-80,80),rr(-120,-20),pick(['#bfe8ff','#7fd0ff','#ffffff']),rr(4,8));}
function healFx(t,dl){var y=unitY(t);for(var i=0;i<8;i++){B.part.push({x:t.x+rr(-20,20),y:y-rr(0,t.meta_h()*.6),vx:0,vy:rr(-60,-110),r:0,vr:0,c:'#8dffa8',sz:rr(3,6),t:-(dl||0),life:.9,k:'s'});}ringFx(t.x,y-10,'#7dffb0');}
function shieldFx(t){B.fx.push({k:'ring',x:t.x,y:unitY(t)-t.meta_h()*.4,t:0,life:.5,c:'#7fd0ff'});}
function buffFx(t,stat){var c=stat==='def'?'#7fd0ff':stat==='pw'?'#ffd23a':stat==='as'?'#8dffa8':stat==='crit'?'#ff9a4a':'#ff7a6a';var y=unitY(t);for(var i=0;i<6;i++)B.part.push({x:t.x+rr(-18,18),y:y-rr(0,t.meta_h()*.5),vx:0,vy:rr(-70,-120),r:0,vr:0,c:c,sz:rr(4,7),t:-(i*.04),life:.8,k:'a'});}
function bannerFx(e){B.fx.push({k:'ring',x:e.x,y:unitY(e),t:0,life:.5,c:'#ffffff'});}
function projectile(u,t,kind,fn,from){var sy=from?from.y:unitY(u)-u.meta_h()*.55;B.pr.push({x:from?from.x:u.x,y:sy,t:t,kind:kind,fn:fn,sp:kind==='arrow'||kind==='bolt'||kind==='gun'?(kind==='gun'?1100:680):kind==='bomb'?360:kind==='wave'?380:480,life:2,ang:0,src:u});}
function stepProj(dt){for(var i=B.pr.length-1;i>=0;i--){var p=B.pr[i];p.life-=dt;var tx=p.t.x,ty=unitY(p.t)-p.t.meta_h()*.5;var dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy),st=p.sp*dt;p.ang=Math.atan2(dy,dx);
  if(d<=st+6||p.life<=0){B.pr.splice(i,1);p.fn();if(p.kind==='bomb')bombFx(tx,ty,.7);else if(p.kind==='magic')flashFx(tx,ty,26,'#e8c8ff');else hitPop(p.kind,tx,ty);continue;}
  p.x+=dx/d*st;p.y+=dy/d*st;if(rnd()<.6)B.part.push({x:p.x,y:p.y,vx:rr(-20,20),vy:rr(-20,20),r:0,vr:0,c:PC[p.kind]||(p.kind==='magic'?'#d8a8ff':p.kind==='bomb'?'#ffb23a':'#fff6c0'),sz:rr(2,4),t:0,life:.3,k:'s'});}}
function skillVis(u,t,sk,ult,fn,dl){dl=dl||0;var f=sk.fx,y=unitY(t)-t.meta_h()*.5;
 if(f==='arrow'||f==='bolt'||f==='magic'){at(dl,function(){projectile(u,t,f,fn);});}
 else if(f==='bomb'||f==='fire'){at(dl,function(){var sx=t.x+rr(-30,30),sy0=-30;var p={x:sx,y:sy0};B.pr.push({x:sx,y:sy0,t:t,kind:'bomb',fn:fn,sp:900,life:2,ang:0,src:u});});}
 else if(f==='fireball'||f==='web'&&sk.k==='dmg'&&sk.tgt==='one'||f==='gun'||f==='wave'&&sk.tgt==='one'){at(dl,function(){projectile(u,t,f==='fireball'?'fire':f,fn);});}
 else if(AREA[f]){at(dl+.05,function(){areaFx(f,t,u,ult);fn();});}
 else if(f==='ice'){at(dl+.05,function(){iceFx(t);fn();});}
 else if(f==='punch'){at(dl+.05,function(){slashFx(t,u,true);B.fx.push({k:'burst',x:t.x,y:y,t:0,life:.3});for(var i=0;i<6;i++)brick(t.x,y,rr(-160,160),rr(-200,-40),pick(unitCols(u)),rr(6,10));fn();});}
 else{at(dl+.04,function(){slashFx(t,u,ult);fn();});}}
/* step */
function stepFx(dt){if(!B)return;var i,p;
 for(i=B.part.length-1;i>=0;i--){p=B.part[i];p.t+=dt;if(p.t<0)continue;if(p.t>p.life){B.part.splice(i,1);continue;}
  if(p.k==='b'){p.vy+=620*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;var gy=p.gy||0;}
  else{p.x+=p.vx*dt;p.y+=p.vy*dt;}}
 for(i=B.fx.length-1;i>=0;i--){p=B.fx[i];p.t+=dt;if(p.t>p.life)B.fx.splice(i,1);}
 for(i=B.flo.length-1;i>=0;i--){p=B.flo[i];p.t+=dt;p.y+=p.vy*dt;p.vy*=Math.pow(.2,dt);if(p.t>p.life)B.flo.splice(i,1);}}
/* ---------- DOM fx: banner, cut-in ---------- */
var bnT=0;
function bannerShow(t,sub,boss){var b=$('banner');if(!b)return;$('banner-t').textContent=t;$('banner-s').textContent=sub||'';b.className=boss?'boss':'';b.classList.remove('hidden');void b.offsetWidth;b.style.animation='none';void b.offsetWidth;b.style.animation='';clearTimeout(bnT);bnT=setTimeout(function(){b.classList.add('hidden');},boss?1900:1300);}
function ultCutShow(u){var c=$('cutin');if(!c)return;var h=u.hid;c.style.setProperty('--hc',u.d.col);$('cut-img').src='art/h'+h+'_atk.webp';$('cut-name').textContent=u.d.sk[0].n;$('cut-hero').textContent=u.d.n;c.className='';void c.offsetWidth;c.className='on';}
function ultCutHide(){var c=$('cutin');if(c)c.className='hidden';}

function dotPart(u,kd){var c=kd==='poison'?'#7be84a':'#e8302a';B.part.push({x:u.x+rr(-12,12),y:unitY(u)-rr(5,u.meta_h()*.7),vx:rr(-10,10),vy:kd==='poison'?-40:30,r:0,vr:0,c:c,sz:rr(3,5),t:0,life:.6,k:'a'});}
function regenFx(u){B.part.push({x:u.x+rr(-14,14),y:unitY(u)-rr(0,u.meta_h()*.5),vx:0,vy:-50,r:0,vr:0,c:'#7dff9a',sz:rr(3,5),t:0,life:.7,k:'a'});}

/* ---- skill-specific area effects ---- */
var PC={fire:'#ff9a2a',web:'#e8ffe0',light:'#fff4a8',gun:'#ffe27a',wave:'#b8a0ff',star:'#ffe27a',poison:'#9aff5a',wind:'#c8ffe8',dark:'#a060e0',leaf:'#9aff8a'};
var AREA={wind:1,katana:1,light:1,bell:1,web:1,poison:1,dark:1,star:1,wave:1,leaf:1,gun:1,fire:1};
function areaFx(type,t,u,ult){var y=unitY(t)-t.meta_h()*.45,n=ult?1.4:1;B.fx.push({k:'a2',ty:type,x:t.x,y:y,t:0,life:type==='katana'?.4:.65,s:n,sd:rnd()*6.28,ox:u.x});
 var c=PC[type]||'#fff',cnt=ult?10:6;
 if(type==='wind'||type==='leaf'||type==='poison'||type==='star'||type==='wave'||type==='dark'||type==='light'||type==='bell')for(var i=0;i<cnt;i++){var a=rnd()*6.28,v=rr(40,150);B.part.push({x:t.x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,r:0,vr:0,c:c,sz:rr(3,6),t:0,life:rr(.4,.8),k:'s'});}
 if(type==='katana'){for(var j=0;j<6;j++)B.part.push({x:t.x,y:y,vx:rr(-200,200),vy:rr(-200,60),r:0,vr:0,c:j%2?'#fff':'#ff6a6a',sz:rr(2,4),t:0,life:.35,k:'s'});}
 if(type==='fire'){bombFx(t.x,y,.8);}
 B.shake=Math.max(B.shake,ult?7:3);}
function hitPop(kind,x,y){if(kind==='fire'){bombFx(x,y,.6);return;}var c=PC[kind]||'#fff';flashFx(x,y,kind==='gun'?18:26,c);for(var i=0;i<5;i++)B.part.push({x:x,y:y,vx:rr(-120,120),vy:rr(-120,40),r:0,vr:0,c:c,sz:rr(2,4),t:0,life:.35,k:'s'});}
/* ---------- render ---------- */
var TT=0,SIL={};
function sil(im,key,col){var k=key+col;if(SIL[k])return SIL[k];if(!im||!im.width)return null;var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,c.width,c.height);SIL[k]=c;return c;}
function coverBg(im,dark){if(!im||!im.width){cx.fillStyle='#2a3a5a';cx.fillRect(0,0,FW,LH);return;}var s=Math.max(FW/im.width,LH/im.height),w=im.width*s,h=im.height*s;cx.drawImage(im,(FW-w)/2,(LH-h)/2,w,h);if(dark){cx.fillStyle='rgba(10,12,30,'+dark+')';cx.fillRect(0,0,FW,LH);}}
function txt(s,x,y,sz,fill,stroke,al){cx.font='700 '+sz+'px Kanit,sans-serif';cx.textAlign=al||'center';cx.textBaseline='middle';cx.lineJoin='round';if(stroke){cx.lineWidth=Math.max(3,sz*.28);cx.strokeStyle=stroke;cx.strokeText(s,x,y);}cx.fillStyle=fill;cx.fillText(s,x,y);}
function rrect(x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath();}
function begin(){cx.setTransform(DPR*SC,0,0,DPR*SC,0,0);cx.clearRect(0,0,FW,LH);}
function uSprite(u){if(u.hid){var st=(u.at>0&&u.alive)?'atk':((u.blink<0&&u.alive)?'blink':'idle');return {im:IM['h'+u.hid+'_'+st],m:u.meta[st],key:'h'+u.hid+st};}return {im:IM[u.img],m:u.meta,key:u.img};}
function drawUnit(u){var sp=uSprite(u),im=sp.im;if(!im||!im.width)return;var k=u.k*GEO.kf,m=sp.m,w=m[0]*k,h=m[1]*k,x=u.x+u.kx,y=unitY(u);
 var br=u.alive?Math.sin(TT*2.6+u.ph):0,sy=1+.022*br,sx=1-.012*br,al=1;
 if(u.drop>0){var d=u.drop/1;y-=Math.pow(Math.min(1,d),2)*260;al=Math.min(1,(1-u.drop)*3+.2);}
 if(u.roar>0){var rj=Math.sin(TT*60)*2;x+=rj;sy=1.05;}
 if(u.at>0&&u.melee&&u.lgTo&&u.alive){var p=1-u.at/u.atT0,s=Math.sin(Math.PI*clamp(p,0,1)),tx=u.lgTo.x-x,ty=unitY(u.lgTo)-y;var cap=u.boss?36:u.side==='a'?70:55;var dd=Math.hypot(tx,ty)||1,mv=Math.min(cap,dd*.55)*s;x+=tx/dd*mv;y+=ty/dd*mv;}
 if(u.hid&&u.pw>=1000&&u.alive){var pl=.5+.5*Math.sin(TT*8);cx.fillStyle='rgba(255,220,60,'+(.25+.25*pl)+')';cx.beginPath();cx.ellipse(x,y,36+6*pl,13+2*pl,0,0,6.3);cx.fill();}
 cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(x,y,w*.3,h*.07,0,0,6.3);cx.fill();
 if(u.glow>0&&u.alive){var gr=cx.createRadialGradient(x,y-h*.5,5,x,y-h*.5,h*.8);var a=u.glow/.5;gr.addColorStop(0,'rgba(255,240,150,'+(.7*a)+')');gr.addColorStop(1,'rgba(255,200,60,0)');cx.fillStyle=gr;cx.fillRect(x-h,y-h*1.4,h*2,h*1.8);}
 var dead=!u.alive;if(dead&&u.side==='e'){al*=clamp(u.dead,0,1);sy*=.6+.4*clamp(u.dead,0,1);}if(dead&&u.side==='a')al*=.38;
 if(u.inv>0&&u.alive&&Math.floor(TT*14)%2)al*=.6;
 cx.save();cx.globalAlpha=al;cx.translate(x,y);cx.scale(sx*((u.ezone===4&&u.side==='e'&&u.x<195)?-1:1),sy);var ax=m[2];cx.drawImage(im,-ax*w,-h,w,h);
 if(u.hurt>0&&u.alive){var s2=sil(im,sp.key,'#ffffff');if(s2){cx.globalAlpha=al*clamp(u.hurt/.18,0,1)*.85;cx.drawImage(s2,-ax*w,-h,w,h);}}
 if(u.st.frz>0&&u.alive){var s3=sil(im,sp.key,'#9fdcff');if(s3){cx.globalAlpha=al*.6;cx.drawImage(s3,-ax*w,-h,w,h);}}
 cx.restore();
 if(!u.alive){if(u.side==='a'){txt('✕',x,y-h*.5,26,'#fff','#000');}return;}
 var by=y-h-8;
 if(u.sh>0){cx.strokeStyle='rgba(120,210,255,.8)';cx.fillStyle='rgba(120,210,255,.18)';cx.lineWidth=2;cx.beginPath();cx.ellipse(x,y-h*.5,w*.45,h*.58,0,0,6.3);cx.fill();cx.stroke();}
 if(!u.boss){var bw=u.side==='a'?46:40;cx.fillStyle='rgba(0,0,0,.6)';rrect(x-bw/2-1,by-1,bw+2,8,3);cx.fill();cx.fillStyle=u.side==='a'?'#5fe06a':'#ff5a4a';var f=clamp(u.hp/u.mhp,0,1);if(f>0){rrect(x-bw/2,by,bw*f,6,3);cx.fill();}
  if(u.sh>0){cx.fillStyle='#8fe0ff';rrect(x-bw/2,by,bw*clamp(u.sh/u.mhp,0,1),6,3);cx.fill();}
  if(u.side==='a'){cx.fillStyle='rgba(0,0,0,.55)';cx.fillRect(x-bw/2,by+8,bw,3);cx.fillStyle=u.pw>=1000?'#ffe040':'#ffb020';cx.fillRect(x-bw/2,by+8,bw*u.pw/1000,3);}
  else if(u.elite)txt('★',x-bw/2-8,by+3,12,'#ffd23a','#000');
  txt(u.lvl,x-bw/2-7,by+3,10,'#fff','#000');by-=2;}
 if(u.cast){var cp=1-u.cast.t/u.cast.tot,cw=60;cx.fillStyle='rgba(0,0,0,.7)';rrect(x-cw/2-1,by-12,cw+2,9,4);cx.fill();cx.fillStyle='#ff8a2a';rrect(x-cw/2,by-11,cw*cp,7,3);cx.fill();txt(u.cast.a.n,x,by-21,11,'#fff','#000');by-=26;}
 if(u.st.stun>0){for(var i=0;i<3;i++){var an=TT*5+i*2.1;txt('★',x+Math.cos(an)*18,by-6+Math.sin(an)*5,13,'#ffe040','#000');}}
 else if(u.st.slow>0)txt('❄',x,by-8,14,'#8fd8ff','#003');
 if(u.st.sil>0)txt('🔇',x+16,by-6,13,'#fff');
 if(u.tauntT>0)txt('!',x-18,by-6,16,'#ff4a2a','#fff');
 if(u.burn.length){var bk=u.burn[0].kd;txt(bk==='poison'?'☠':bk==='bleed'?'🩸':'🔥',x+18,by-4,13,bk==='poison'?'#9aff5a':'#fff');}
 if(u.st.blind>0)txt('👁',x-18,by-20,12,'#fff');
 if(u.emT>0&&u.em){var ee=u.em,ey=by-14-Math.sin(TT*6)*2;cx.save();cx.translate(x+(u.boss?0:18),ey);var sc2=Math.min(1,(u.emT>1?1:u.emT));cx.scale(sc2,sc2);cx.fillStyle='#fff';cx.strokeStyle='#222';cx.lineWidth=2;rrect(-11,-11,22,22,7);cx.fill();cx.stroke();
  if(ee==='!')txt('!',0,1,16,'#ff3a2a');else if(ee==='x')txt('…',0,0,16,'#444');else if(ee==='star')txt('★',0,1,15,'#ffb020');else if(ee==='heart')txt('♥',0,1,15,'#ff5a8a');cx.restore();}
}
function drawBattle(){begin();var ox=0,oy=0;if(B.shake>0){ox=rr(-B.shake,B.shake);oy=rr(-B.shake,B.shake);}cx.save();cx.translate(ox,oy);
 coverBg(IM['bg'+(B.stg.bg||B.stg.z)],B.boss&&B.boss.alive?.18:.04);
 var us=B.us.slice().sort(function(a,b){return unitY(a)-unitY(b);});
 B.mk.forEach(function(m){if(!m.t.alive)return;var y=unitY(m.t),pl=.5+.5*Math.sin(TT*14);cx.strokeStyle='rgba(255,60,40,'+(.6+.4*pl)+')';cx.fillStyle='rgba(255,40,30,'+(.18+.15*pl)+')';cx.lineWidth=3;cx.beginPath();cx.ellipse(m.t.x,y,38,14,0,0,6.3);cx.fill();cx.stroke();txt('!',m.t.x,y-m.t.meta_h()-14,22,'#ff3a2a','#fff');});
 us.forEach(drawUnit);
 B.pr.forEach(function(p){cx.save();cx.translate(p.x,p.y);if(p.kind==='arrow'){cx.rotate(p.ang);cx.fillStyle='#8a5a30';cx.fillRect(-14,-1.5,22,3);cx.fillStyle='#fff';cx.beginPath();cx.moveTo(14,0);cx.lineTo(7,-5);cx.lineTo(7,5);cx.fill();}
  else if(p.kind==='bolt'){cx.rotate(p.ang);cx.fillStyle='#ffee80';cx.fillRect(-12,-3,24,6);cx.fillStyle='#fff';cx.fillRect(-4,-1.5,14,3);}
  else if(p.kind==='bomb'){cx.fillStyle='#2a2a30';cx.beginPath();cx.arc(0,0,9,0,6.3);cx.fill();cx.fillStyle='#ffb23a';cx.beginPath();cx.arc(4,-8,4+Math.sin(TT*30)*1.5,0,6.3);cx.fill();}
  else if(p.kind==='gun'){cx.rotate(p.ang);cx.fillStyle='#ffe27a';cx.fillRect(-18,-1.5,26,3);cx.fillStyle='#fff';cx.fillRect(-2,-1,12,2);}
  else{var pcc=PC[p.kind]||'#d8a8ff',gr=cx.createRadialGradient(0,0,2,0,0,p.kind==='fire'?18:14);gr.addColorStop(0,'#fff');gr.addColorStop(.4,pcc);gr.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gr;cx.fillRect(-18,-18,36,36);}
  cx.restore();});
 B.fx.forEach(drawFx);
 B.part.forEach(function(p){if(p.t<0)return;var a=clamp(1-p.t/p.life,0,1);cx.save();cx.globalAlpha=Math.min(1,a*1.6);cx.translate(p.x,p.y);
  if(p.k==='b'){cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.sz/2,-p.sz/3,p.sz,p.sz*.66);cx.fillStyle='rgba(255,255,255,.35)';cx.fillRect(-p.sz*.2,-p.sz*.5,p.sz*.4,p.sz*.2);cx.strokeStyle='rgba(0,0,0,.4)';cx.lineWidth=1;cx.strokeRect(-p.sz/2,-p.sz/3,p.sz,p.sz*.66);}
  else if(p.k==='a'){cx.fillStyle=p.c;cx.beginPath();cx.moveTo(0,-p.sz);cx.lineTo(p.sz,p.sz*.4);cx.lineTo(-p.sz,p.sz*.4);cx.fill();}
  else{cx.fillStyle=p.c;cx.beginPath();cx.arc(0,0,p.sz*(.6+.4*a),0,6.3);cx.fill();}cx.restore();});
 B.flo.forEach(function(f){var a=clamp(1-(f.t/f.life-.6)/.4,0,1),sc=f.k==='crit'?(1+Math.max(0,.5-f.t*2)):f.k==='big'?1.2:1;cx.globalAlpha=a;var sz=(f.k==='crit'?24:f.k==='big'?20:f.k==='foe'?15:f.k==='pw'?12:16)*sc*f.s;
  var col=f.k==='crit'?'#ffe040':f.k==='heal'?'#7dff9a':f.k==='burn'?'#ff9a3a':f.k==='pois'?'#9aff5a':f.k==='bleed'?'#ff5a6a':f.k==='foe'?'#ff6a5a':f.k==='pw'?'#ffe880':'#ffffff';txt((f.k==='heal'?'+':'')+f.txt,f.x,f.y,sz,col,'#1a1a2a');cx.globalAlpha=1;});
 cx.restore();
 if(B.flash>0){cx.fillStyle='rgba(255,255,255,'+(B.flash/.35*.55)+')';cx.fillRect(0,0,FW,LH);}
}
function drawFx(p){var a=clamp(p.t/p.life,0,1),ia=1-a;cx.save();cx.translate(p.x,p.y);
 if(p.k==='ring'){cx.strokeStyle=p.c;cx.globalAlpha=ia;cx.lineWidth=4*ia+1;cx.beginPath();cx.arc(0,0,10+a*50,0,6.3);cx.stroke();if(p.star){txt('★',0,-a*30,18,'#ffe040','#000');}}
 else if(p.k==='flash'){var g=cx.createRadialGradient(0,0,0,0,0,p.r*(.5+a));g.addColorStop(0,p.c);g.addColorStop(1,'rgba(255,200,80,0)');cx.globalAlpha=ia;cx.fillStyle=g;cx.beginPath();cx.arc(0,0,p.r*(.5+a),0,6.3);cx.fill();}
 else if(p.k==='slash'){cx.rotate(p.a);cx.globalAlpha=ia;cx.strokeStyle='#fff';cx.lineCap='round';cx.lineWidth=(p.big?9:5)*ia+1;cx.beginPath();cx.arc(0,0,(p.big?34:24),-1.2+a*.6,.6+a*.9);cx.stroke();cx.strokeStyle='rgba(255,230,120,.8)';cx.lineWidth=2;cx.beginPath();cx.arc(0,0,(p.big?42:30),-1+a*.6,.5+a*.9);cx.stroke();}
 else if(p.k==='burst'){cx.globalAlpha=ia;cx.fillStyle='#fff4b0';for(var i=0;i<8;i++){cx.rotate(.785);cx.beginPath();cx.moveTo(10+a*8,0);cx.lineTo(30+a*26,-4*ia);cx.lineTo(30+a*26,4*ia);cx.fill();}}
 else if(p.k==='a2')drawA2(p,a,ia);
 else if(p.k==='ice'){cx.globalAlpha=ia*1.2;cx.fillStyle='#bfe8ff';cx.strokeStyle='#fff';cx.lineWidth=2;for(var j=0;j<5;j++){cx.save();cx.rotate(j*1.26+.3);cx.translate(0,-24-a*6);cx.beginPath();cx.moveTo(0,-14);cx.lineTo(7,4);cx.lineTo(-7,4);cx.closePath();cx.fill();cx.stroke();cx.restore();}}
 cx.restore();}
/* ---------- hub scene ---------- */
var HUB={hop:{},bub:null,t:0};
function hubPos(i,n){var xs=[62,128,195,262,328],ys=[0,-24,8,-24,0];return {x:xs[i],y:LH-248+ys[i]};}
function drawHub(){begin();coverBg(IM.title,.0);var team=fixTeam();
 team.forEach(function(id,i){var p=hubPos(i),d=HEROES[id],m=META['h'+id],k=.5,hop=HUB.hop[id]||0,hp=hop>0?Math.sin(Math.PI*(1-hop))*34:0;var blink=((TT+i*1.3)%4.2)<.13,st=hop>0?'atk':(blink?'blink':'idle'),im=IM['h'+id+'_'+st],mm=m[st];if(!im||!im.width)return;
  var w=mm[0]*k,h=mm[1]*k,br=Math.sin(TT*2.4+i*1.7),x=p.x,y=p.y-hp;cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(p.x,p.y,w*.32,h*.07,0,0,6.3);cx.fill();
  cx.save();cx.translate(x,y);cx.scale(1-.012*br,1+.024*br);cx.drawImage(im,-mm[2]*w,-h,w,h);cx.restore();});
 if(HUB.bub){var b=HUB.bub;b.t-=1/60;if(b.t<=0)HUB.bub=null;else{var team2=fixTeam(),idx=team2.indexOf(b.id),p2=hubPos(idx<0?0:idx),hh=META['h'+b.id].idle[1]*.5,bx=clamp(p2.x,95,295),by=p2.y-hh-34;cx.font='600 14px Kanit';var tw=cx.measureText(b.txt).width+22;
   cx.fillStyle='#fff';cx.strokeStyle='#243';cx.lineWidth=3;rrect(bx-tw/2,by-18,tw,34,14);cx.fill();cx.stroke();cx.beginPath();cx.moveTo(p2.x-6,by+15);cx.lineTo(p2.x,by+26);cx.lineTo(p2.x+8,by+15);cx.fill();txt(b.txt,bx,by,14,'#243','');}}
}
function hubTap(px,py){var team=fixTeam();for(var i=team.length-1;i>=0;i--){var p=hubPos(i),id=team[i],h=META['h'+id].idle[1]*.5,w=META['h'+id].idle[0]*.5;if(Math.abs(px-p.x)<w*.5&&py<p.y+10&&py>p.y-h-10){heroTalk(id);return true;}}return false;}

function drawA2(p,a,ia){var s=p.s,ty=p.ty;cx.globalAlpha=ia;cx.lineCap='round';
 if(ty==='wind'){cx.strokeStyle='#d8fff0';for(var i=0;i<3;i++){cx.lineWidth=(4-i)*ia+1;cx.beginPath();cx.arc(0,0,14+a*36+i*9,-.8+i*.5+a*3,.9+i*.5+a*3);cx.stroke();}}
 else if(ty==='katana'){cx.rotate(p.sd);cx.strokeStyle='#fff';cx.lineWidth=4*ia+1;for(var j=0;j<3;j++){cx.beginPath();cx.moveTo(-40*s+j*8,-30+j*22-a*8);cx.lineTo(40*s+j*8,26+j*22-a*8);cx.stroke();}cx.strokeStyle='#ff4a4a';cx.lineWidth=2;cx.beginPath();cx.moveTo(-34,-24);cx.lineTo(44,30);cx.stroke();}
 else if(ty==='light'){var g=cx.createLinearGradient(0,-260,0,40);g.addColorStop(0,'rgba(255,244,168,0)');g.addColorStop(.7,'rgba(255,244,168,.9)');g.addColorStop(1,'rgba(255,255,255,1)');cx.fillStyle=g;cx.globalAlpha=ia*(a<.2?a/.2:1);var w=(22+a*10)*s;cx.fillRect(-w/2,-260,w,300);cx.fillStyle='#fff';cx.fillRect(-w/5,-260,w/2.5,300);}
 else if(ty==='bell'){cx.strokeStyle='#ffe27a';for(var k=0;k<3;k++){cx.lineWidth=3*ia+1;cx.beginPath();cx.arc(0,0,10+(a*55+k*14)%70,0,6.3);cx.stroke();}txt('♪',-16,-20-a*40,18,'#fff4a8','#a07a1a');txt('♫',16,-10-a*34,16,'#fff4a8','#a07a1a');}
 else if(ty==='web'){cx.strokeStyle='#eaffea';cx.lineWidth=2;var R=30+a*10;for(var q=0;q<8;q++){cx.beginPath();cx.moveTo(0,0);cx.lineTo(Math.cos(q*.785)*R,Math.sin(q*.785)*R);cx.stroke();}for(var r=1;r<4;r++){cx.beginPath();for(var q2=0;q2<8;q2++){var xx=Math.cos(q2*.785)*R*r/3,yy=Math.sin(q2*.785)*R*r/3;q2?cx.lineTo(xx,yy):cx.moveTo(xx,yy);}cx.closePath();cx.stroke();}}
 else if(ty==='poison'){cx.fillStyle='#7be84a';for(var b=0;b<6;b++){var bx=Math.sin(p.sd+b*1.9)*20,by2=-a*50-b*6+10;cx.beginPath();cx.arc(bx,by2,4+b%3*2,0,6.3);cx.fill();}txt('☠',0,-26-a*14,20,'#caff9a','#1a3a0a');}
 else if(ty==='dark'){cx.fillStyle='rgba(90,40,150,.75)';for(var d=0;d<5;d++){cx.beginPath();cx.arc(Math.cos(p.sd+d*1.3+a*3)*(16+a*22),Math.sin(p.sd+d*1.3+a*3)*(10+a*14),12+d*2,0,6.3);cx.fill();}}
 else if(ty==='star'){for(var m=0;m<3;m++){var sy=-120+a*120+m*14,sx=-30+m*30;txt('★',sx+(1-a)*40,sy,18+m*2,'#ffe27a','#8a5a00');}cx.strokeStyle='#fff';cx.lineWidth=2;}
 else if(ty==='wave'){cx.fillStyle='rgba(150,120,255,.55)';cx.strokeStyle='#e0d4ff';cx.lineWidth=3;cx.beginPath();cx.ellipse(0,10,(12+a*48)*s,(8+a*26)*s,0,0,6.3);cx.fill();cx.stroke();}
 else if(ty==='leaf'){for(var l=0;l<6;l++){var la=p.sd+l*1.05+a*2.5,lr=12+a*40;txt('🌸',Math.cos(la)*lr,Math.sin(la)*lr*.6-a*20,14,'#fff');}}
 else if(ty==='gun'){cx.fillStyle='#fff6c0';cx.beginPath();cx.arc(0,0,(8+a*14)*s,0,6.3);cx.fill();cx.strokeStyle='#ffb23a';cx.lineWidth=3;for(var g2=0;g2<6;g2++){cx.beginPath();cx.moveTo(Math.cos(g2*1.05)*8,Math.sin(g2*1.05)*8);cx.lineTo(Math.cos(g2*1.05)*(18+a*24),Math.sin(g2*1.05)*(18+a*24));cx.stroke();}}
}
/* ---------- UI core ---------- */
var ACT={},cur='',curArg=null,tickN=0;
function I(n,c){return '<img class="ic '+(c||'')+'" src="art/i_'+n+'.webp" alt="">';}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function stars(n,max,cls){var s='';for(var i=0;i<(max||3);i++)s+='<i class="st'+(i<n?' on':'')+'"></i>';return '<span class="stars '+(cls||'')+'">'+s+'</span>';}
function toast(t,ms){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on');},ms||1800);}
function modal(html,cls){$('sheet').innerHTML=html;$('sheet').className=cls||'';$('modal').classList.remove('hidden');}
function closeModal(){$('modal').classList.add('hidden');$('sheet').innerHTML='';}
function mopen(){return !$('modal').classList.contains('hidden');}
function setScreen(html,cls){var s=$('screen');s.innerHTML=html;s.className=cls||'';}
function topUpdate(){tickEnergy();var mx=maxEnergy();$('t-plv').textContent=SAVE.plv;$('t-xp').style.width=(SAVE.pexp/needPExp(SAVE.plv)*100)+'%';$('t-coin').textContent=fmt(SAVE.coins);$('t-gem').textContent=fmt(SAVE.gems);$('t-en').textContent=SAVE.energy+'/'+mx;var n=nextEnergyIn();$('t-ent').textContent=n>0?mmss(n):'เต็ม';}
function showMenuChrome(on){document.body.classList.toggle('menu',on);$('top').classList.toggle('hidden',!on);$('nav').classList.toggle('hidden',!on);$('hud').classList.toggle('hidden',on);}
function go(name,arg){cur=name;curArg=arg;closeModal();hubOn=name==='hub';showMenuChrome(true);if(SCR[name])SCR[name](arg);document.querySelectorAll('#nav button').forEach(function(b){b.classList.toggle('on',b.dataset.a===(name==='hero'?'heroes':name));});topUpdate();var sc=$('screen');sc.scrollTop=0;}
function refresh(){if(SCR[cur])SCR[cur](curArg);topUpdate();}
var SCR={},hubOn=true;
/* ---------- hub ---------- */
function hubBadge(){var d=SAVE.daily;return {feast:!!feastAvail(),free:d.freeCoin<5||NOW()-d.fgT>=48*3600000};}
SCR.hub=function(){music('hub',0);fixTeam().forEach(function(id){for(var k=1;k<=3;k++)lazySnd('v_t'+id+'_'+k);});var n=nextStage(),bd=hubBadge(),z=n[0],s=n[1],sd=stageDef(z,s,false),t=fixTeam();
 setScreen('<div class="hubov"><div class="hub-side"><button class="sq" data-act="bag">'+I('chest1')+'<span>กระเป๋า</span></button><button class="sq'+(bd.feast?' dot':'')+'" data-act="feast">'+I('energy')+'<span>งานเลี้ยง</span></button><button class="sq" data-act="ads">'+I('ticket')+'<span>ดูโฆษณา</span></button><button class="sq" data-act="settings"><b class="gear">⚙</b><span>ตั้งค่า</span></button></div>'+
  '<div class="hub-title"><img src="logo.png" alt=""><div><b>Brick Arena</b><small>สนามรบก้อนอิฐ</small></div></div>'+
  '<div class="hub-bot"><div class="powr">พลังทีม <b>'+fmtN(teamPower())+'</b> <button class="mini" data-act="team">จัดทีม</button></div><button class="btn yellow big" data-act="next"><span>ลุยด่าน '+z+'-'+s+'</span><small>'+esc(ZONES[z].n)+' · '+I('energy','s')+sd.cost+'</small></button></div></div>','hubscr');};
ACT.next=function(){var n=nextStage();openStage(n[0],n[1],false);};
/* ---------- map ---------- */
SCR.map=function(){var z=SAVE.lastZone||1,hm=SAVE.mode==='h';if(hm&&SAVE.plv<HEROIC_PLV){hm=false;SAVE.mode='n';}
 var tabs='';for(var i=1;i<=NZONE;i++){var ok=i===1||stageRec(i-1,6,hm).st>0;tabs+='<button class="ztab'+(i===z?' on':'')+(ok?'':' lock')+'" data-act="zone" data-a="'+i+'">'+(ok?i:'🔒')+'</button>';}
 var nodes='',pos=[[8,0],[25,1],[11,2],[26,3],[12,4],[20,5]];
 for(var s=1;s<=6;s++){var un=stageUnlocked(z,s,hm),r=stageRec(z,s,hm),cl=r.st>0,p=pos[s-1],boss=s===6,cur_=un&&!cl;
  nodes+='<button class="node'+(un?'':' lock')+(cl?' clr':'')+(boss?' boss':'')+(cur_?' cur':'')+'" style="left:'+p[0]+'rem;top:'+(p[1]*8.6+1)+'rem" data-act="stage" data-a="'+z+'_'+s+'">'+(un?(boss?'<em>👑</em>':'<b>'+s+'</b>'):'<em>🔒</em>')+stars(r.st,3,'sm')+'</button>';}
 var lines='<svg class="path" viewBox="0 0 390 560" preserveAspectRatio="none"><polyline points="'+pos.map(function(p){return (p[0]*10+36)+','+(p[1]*86+46);}).join(' ')+'" /></svg>';
 setScreen('<div class="mapscr" style="background-image:url(art/bg'+z+'.webp)"><div class="mapov"></div><div class="maphead"><div class="seg"><button class="'+(hm?'':'on')+'" data-act="mode" data-a="n">ปกติ</button><button class="'+(hm?'on':'')+(SAVE.plv<HEROIC_PLV?' lock':'')+'" data-act="mode" data-a="h">ฮีโร่ริก'+(SAVE.plv<HEROIC_PLV?' 🔒Lv'+HEROIC_PLV:'')+'</button></div><div class="zn">โซน '+z+' · '+esc(ZONES[z].n)+'</div><div class="ztabs">'+tabs+'</div></div><div class="nodes">'+lines+nodes+'</div></div>','');};
ACT.zone=function(el){var z=+el.dataset.a;if(z>1&&stageRec(z-1,6,SAVE.mode==='h').st<1){toast('ต้องผ่านบอสโซนก่อนหน้าก่อน');return;}SAVE.lastZone=z;SCR.map();};
ACT.mode=function(el){if(el.dataset.a==='h'&&SAVE.plv<HEROIC_PLV){toast('ต้องเลเวลปาร์ตี้ '+HEROIC_PLV+' ก่อน');return;}SAVE.mode=el.dataset.a;SCR.map();};
ACT.stage=function(el){var p=el.dataset.a.split('_');var h=SAVE.mode==='h';if(!stageUnlocked(+p[0],+p[1],h)){toast(h?'ต้องผ่านด่านปกติและด่านก่อนหน้า':'ต้องผ่านด่านก่อนหน้าก่อน');return;}openStage(+p[0],+p[1],h);};
function heroicLeft(z,s){var k=z+'_'+s;return 3-(SAVE.daily.heroic[k]||0);}
function openStage(z,s,h){var sd=stageDef(z,s,h),r=stageRec(z,s,h),t=fixTeam(),f=sd.feat,cs=[r.st>0,r.st>=2,r.st>=3];
 var recP=Math.round(sd.lvl*30*(h?1.2:1)+t.length*10);
 var cond=['ชนะศึก','ไม่มีฮีโร่ล้มเลย','ชนะภายใน '+mmss(sd.tl)];
 var cl=cond.map(function(c,i){return '<li class="'+(r.st>i?'ok':'')+'"><i class="st'+(r.st>i?' on':'')+'"></i>'+c+'</li>';}).join('');
 var three=r.st>=3,auto=!!SAVE.auto[z+(h?'h':'n')+s];
 var lim=h?'<div class="lim">เหลือสิทธิ์วันนี้ '+heroicLeft(z,s)+'/3</div>':'';
 modal('<div class="stg"><button class="x" data-act="close">✕</button><h2>'+(h?'<em class="hr">ฮีโร่ริก</em> ':'')+z+'-'+s+' '+esc(sd.name)+(sd.boss?' 👑':'')+'</h2><div class="sub">'+esc(ZONES[z].n)+' · ศัตรูเลเวล '+sd.lvl+' · '+sd.waves.length+' รอบ</div>'+
  '<ul class="cond">'+cl+'</ul>'+lim+'<div class="drops"><span>ได้รับ</span><div>'+I('coin','s')+'<b>'+fmt(sd.coins)+'</b></div><div><img class="ic s" src="art/p'+f+'.webp" alt=""><b>เศษ '+esc(HEROES[f].n)+'</b></div><div><img class="ic s" src="art/g_helm.webp" alt=""><b>ของ T'+sd.tier+'</b></div>'+(h?'<div>'+I('scroll','s')+'<b>ม้วนตื่นรู้</b></div>':'')+'</div>'+
  '<div class="teamrow">'+t.map(function(id){return '<img src="art/p'+id+'.webp" alt="">';}).join('')+'<button class="mini" data-act="team" data-a="'+z+'_'+s+'_'+(h?1:0)+'">จัดทีม</button></div>'+
  '<div class="row"><label class="chk'+(three?'':' lock')+'"><input type="checkbox" id="chk-auto" '+(auto&&three?'checked':'')+(three?'':' disabled')+'> ต่อสู้อัตโนมัติ'+(three?'':' 🔒')+'</label><span class="en">'+I('energy','s')+sd.cost+'</span></div>'+
  '<div class="btns"><button class="btn yellow" data-act="fight" data-a="'+z+'_'+s+'_'+(h?1:0)+'">ลุย!</button>'+
  '<button class="btn blue'+(three?'':' dis')+'" data-act="sweep" data-a="'+z+'_'+s+'_'+(h?1:0)+'_1">กวาด ×1</button><button class="btn blue'+(three?'':' dis')+'" data-act="sweep" data-a="'+z+'_'+s+'_'+(h?1:0)+'_5">กวาด ×5</button></div>'+
  '<div class="hint">'+(three?'ใช้บัตรกวาดล้าง '+I('ticket','s')+SAVE.tickets+' ใบ (ไม่ได้ EXP ฮีโร่ แต่ได้ยาเลเวล)':'ได้ 3 ดาวก่อน จึงจะกวาดล้างและต่อสู้อัตโนมัติได้')+'</div></div>');}
ACT.close=function(){closeModal();};
ACT.fight=function(el){var p=el.dataset.a.split('_'),z=+p[0],s=+p[1],h=!!+p[2],sd=stageDef(z,s,h);
 var a=$('chk-auto');var au=a&&a.checked&&stageRec(z,s,h).st>=3;SAVE.auto[z+(h?'h':'n')+s]=au?1:0;
 if(h&&heroicLeft(z,s)<=0){toast('สิทธิ์ฮีโร่ริกวันนี้หมดแล้ว');return;}
 if(!spendEnergy(sd.cost)){energyModal();return;}if(h){SAVE.daily.heroic[z+'_'+s]=(SAVE.daily.heroic[z+'_'+s]||0)+1;}save();topUpdate();
 beginBattle({stg:sd,mode:'camp',auto:au,team:fixTeam(),onEnd:function(r){campEnd(sd,r);}});};
function beginBattle(opt){closeModal();SAVE.stats.battles++;audioInit();showMenuChrome(false);hubOn=false;$('screen').innerHTML='';$('screen').className='';
 opt.eMul=opt.eMul||1;startBattle(opt);hudBuild();$('cutin').className='hidden';cur='battle';music(B.stg.boss?'boss':'battle',0);say(B.stg.boss?'boss':'start');}
function campEnd(sd,r){SAVE.stats.battles;var rec=stageRec(sd.z,sd.s,sd.heroic),first=rec.st===0,old=rec.st,rew={};
 if(r.win){SAVE.stats.wins++;rec.st=Math.max(rec.st,r.n);rec.cl++;rew=campReward(sd,first,old,r.n,true,false);rew.stars=r.n;}
 save();showResult(sd,r,rew);}
function campReward(sd,first,old,n,full,sweep){var rew=rollDrops(sd);rew.coins=sd.coins;rew.pexp=sd.cost*4;if(!sweep)rew.hxp=sd.hxp;
 if(sweep){rew.potS=(rew.potS||0)+ri(1,3);}
 if(first)rew.gems=(rew.gems||0)+10;if(n>=3&&old<3)rew.gems=(rew.gems||0)+(sd.heroic?20:10);
 if(sd.boss&&first&&!sd.heroic){rew.tickets=3;}
 return rew;}
function applyReward(rew,team){var lv=[];grant(rew);var up=addPExp(rew.pexp||0);if(rew.hxp&&team)team.forEach(function(id){var u=addHeroExp(id,rew.hxp);if(u)lv.push(id);});save();return {plv:up,lv:lv};}
function rewHtml(rew){var o='';if(rew.coins)o+='<div class="rw">'+I('coin')+'<b>'+fmtN(rew.coins)+'</b></div>';if(rew.gems)o+='<div class="rw">'+I('gem')+'<b>'+rew.gems+'</b></div>';if(rew.pexp)o+='<div class="rw">'+I('exp')+'<b>'+rew.pexp+'</b><small>EXP ปาร์ตี้</small></div>';
 if(rew.hxp)o+='<div class="rw">'+I('exp')+'<b>'+rew.hxp+'</b><small>EXP ฮีโร่</small></div>';if(rew.potS)o+='<div class="rw">'+I('exp')+'<b>×'+rew.potS+'</b><small>ยาเลเวล</small></div>';if(rew.potL)o+='<div class="rw">'+I('exp')+'<b>×'+rew.potL+'</b><small>ยาใหญ่</small></div>';if(rew.tickets)o+='<div class="rw">'+I('ticket')+'<b>×'+rew.tickets+'</b></div>';
 for(var k in rew.frag||{})o+='<div class="rw"><img class="ic" src="art/p'+k+'.webp" alt=""><b>×'+rew.frag[k]+'</b><small>เศษ</small></div>';
 for(var a in rew.af||{})o+='<div class="rw">'+I('scroll')+'<b>×'+rew.af[a]+'</b><small>ม้วน '+esc(HEROES[a].n)+'</small></div>';
 for(var g in rew.gear||{}){var p=g.slice(1).split('_');o+='<div class="rw"><img class="ic gt'+p[1]+'" src="art/'+SLOTS[+p[0]].ic+'.webp" alt=""><b>×'+rew.gear[g]+'</b><small>'+SLOTS[+p[0]].n+' T'+p[1]+'</small></div>';}return o;}
function showResult(sd,r,rew){hudHide();var team=B.team;
 if(r.win){sfx('star',.8);var lvl=applyReward(rew,team);if(r.n>=3)say('star3');
  awakenProgress(r);
  var nx=nextAfter(sd);
  modal('<div class="res win"><h2>ชนะแล้ว!</h2><div class="bigst">'+stars(r.n,3,'big')+'</div><ul class="cond">'+['ชนะศึก','ไม่มีฮีโร่ล้มเลย','ชนะภายใน '+mmss(sd.tl)].map(function(c,i){return '<li class="'+(r.stars[i]?'ok':'')+'"><i class="st'+(r.stars[i]?' on':'')+'"></i>'+c+'</li>';}).join('')+'</ul>'+
   '<div class="rws">'+rewHtml(rew)+'</div>'+(lvl.plv?'<div class="lvup">🎉 เลเวลปาร์ตี้ขึ้นเป็น '+SAVE.plv+'!</div>':'')+(lvl.lv.length?'<div class="lvup">⬆ ฮีโร่เลเวลอัพ: '+lvl.lv.map(function(i){return HEROES[i].n;}).join(', ')+'</div>':'')+
   '<div class="btns"><button class="btn" data-act="home">กลับ</button><button class="btn yellow" data-act="again" data-a="'+sd.z+'_'+sd.s+'_'+(sd.heroic?1:0)+'">อีกครั้ง</button>'+(nx?'<button class="btn green" data-act="stage2" data-a="'+nx+'">ด่านต่อไป</button>':'')+'</div></div>','');
  if(lvl.plv)say('levelup');}
 else{sfx('lose',.6);modal('<div class="res lose"><h2>แพ้แล้ว…</h2><div class="tips"><b>ลองแบบนี้นะ</b><ul><li>อัพเลเวลฮีโร่และใส่ของให้ครบ 6 ช่อง</li><li>กดไม้ตายให้ถูกจังหวะ ใช้คุมก่อนบอสร่ายสกิล</li><li>จัดทีมให้มีแทงค์ ซัพ และสายคุม</li></ul></div><div class="btns"><button class="btn" data-act="home">กลับ</button><button class="btn" data-act="heroes2">อัพฮีโร่</button><button class="btn yellow" data-act="again" data-a="'+sd.z+'_'+sd.s+'_'+(sd.heroic?1:0)+'">ลองอีกครั้ง</button></div></div>','');}
 }
function nextAfter(sd){var z=sd.z,s=sd.s+1;if(s>6){z++;s=1;}if(z>NZONE)return null;return stageUnlocked(z,s,sd.heroic)?z+'_'+s+'_'+(sd.heroic?1:0):null;}
function endBattle(){B=null;hubOn=true;ultCutHide();$('hud').classList.add('hidden');}
ACT.home=function(){endBattle();go('map');};
ACT.heroes2=function(){endBattle();go('heroes');};
ACT.again=function(el){endBattle();go('map');var p=el.dataset.a.split('_');openStage(+p[0],+p[1],!!+p[2]);setTimeout(function(){var b=document.querySelector('[data-act=fight]');if(b)b.click();},0);};
ACT.stage2=function(el){endBattle();go('map');var p=el.dataset.a.split('_');SAVE.lastZone=+p[0];SCR.map();openStage(+p[0],+p[1],!!+p[2]);};
function awakenProgress(r){var st=r.st;B.team.forEach(function(id){var h=hx(id),d=HEROES[id];if(h.awk||h.awm[2]||h.lv<AWAKEN_LV)return;var q=HQUIP[d.cls],u=B.us.filter(function(x){return x.hid===id;})[0];
  if(!u)return;var v=q.k==='taken'?u.tk:q.k==='dealt'?u.dl:q.k==='stuns'?u.sn:u.hl;h.awp=Math.max(h.awp||0,v||0);if((v||0)>=q.v)h.awm[2]=1;});}
/* ---------- sweep ---------- */
ACT.sweep=function(el){var p=el.dataset.a.split('_'),z=+p[0],s=+p[1],h=!!+p[2],n=+p[3],sd=stageDef(z,s,h),r=stageRec(z,s,h);
 if(r.st<3){toast('ต้องได้ 3 ดาวก่อน');return;}
 if(h){var left=heroicLeft(z,s);if(left<=0){toast('สิทธิ์ฮีโร่ริกวันนี้หมดแล้ว');return;}n=Math.min(n,left);}
 if(SAVE.tickets<n){toast('บัตรกวาดล้างไม่พอ ('+SAVE.tickets+')');return;}
 var done=0,tot={};for(var i=0;i<n;i++){if(!spendEnergy(sd.cost)){break;}SAVE.tickets--;done++;if(h)SAVE.daily.heroic[z+'_'+s]=(SAVE.daily.heroic[z+'_'+s]||0)+1;mergeRew(tot,campReward(sd,false,3,3,true,true));}
 if(!done){energyModal();return;}applyReward(tot,null);save();topUpdate();sfx('win',.6);say('sweep');
 modal('<div class="res win"><h2>กวาดล้าง ×'+done+'</h2><div class="rws">'+rewHtml(tot)+'</div><div class="hint">กวาดล้างไม่ได้ EXP ฮีโร่ แต่ได้ยาเลเวล</div><div class="btns"><button class="btn yellow" data-act="close">ตกลง</button></div></div>');refreshTop();};
function refreshTop(){topUpdate();}
/* ---------- team ---------- */
var teamSel=[],teamCtx=null;
ACT.team=function(el){teamCtx=el&&el.dataset.a||null;teamSel=fixTeam().slice();teamModal();};
function teamModal(){var own=[];for(var i=1;i<=NHERO;i++)if(hx(i).own)own.push(i);
 var cnt={tank:0,dmg:0,ctl:0,sup:0},sy={};teamSel.forEach(function(id){var d=HEROES[id];cnt[d.cls]++;d.sym.forEach(function(x){sy[x]=(sy[x]||0)+1;});});
 var aur=auraSet(teamSel),as=Object.keys(aur).map(function(k){return SYM[k].n;});
 modal('<div class="tm"><button class="x" data-act="tmdone">✕</button><h2>จัดทีม ('+teamSel.length+'/5)</h2><div class="tmcomp">'+['tank','dmg','ctl','sup'].map(function(c){return '<span style="color:'+CLS[c].c+'">'+CLS[c].n+' '+cnt[c]+'</span>';}).join('')+'</div>'+(as.length?'<div class="aur">ออร่าผู้นำ: '+as.join(', ')+'</div>':'')+
  '<div class="tmgrid">'+own.map(function(id){var d=HEROES[id],h=hx(id),on=teamSel.indexOf(id)>=0;return '<button class="tcard'+(on?' on':'')+'" data-act="tmpick" data-a="'+id+'" style="--c:'+CLS[d.cls].c+'"><img src="art/p'+id+'.webp" alt=""><b>'+esc(d.n)+'</b><small>Lv'+h.lv+' · '+CLS[d.cls].n+'</small><span class="lines">'+['หน้า','กลาง','หลัง'][d.line]+'</span>'+d.sym.map(function(x){return '<i class="sym" style="background:'+SYM[x].c+'">'+x+'</i>';}).join('')+'</button>';}).join('')+'</div>'+
  '<div class="btns"><button class="btn yellow" data-act="tmdone">ตกลง</button></div></div>');}
ACT.tmpick=function(el){var id=+el.dataset.a,i=teamSel.indexOf(id);if(i>=0){if(teamSel.length<=1){toast('ต้องมีอย่างน้อย 1 ตัว');return;}teamSel.splice(i,1);}else{if(teamSel.length>=5){toast('ทีมเต็ม 5 ตัวแล้ว');return;}teamSel.push(id);}sfx('btn',.5);teamModal();};
ACT.tmdone=function(){SAVE.team=teamSel.slice();save();closeModal();if(teamCtx&&teamCtx.indexOf('_')>0){var p=teamCtx.split('_');openStage(+p[0],+p[1],!!+p[2]);}else refresh();};
/* ---------- energy / ads ---------- */
function energyModal(){tickEnergy();var left=5-SAVE.daily.adN;modal('<div class="en"><button class="x" data-act="close">✕</button><h2>พลังงานไม่พอ</h2><div class="enbig">'+I('energy','l')+'<b>'+SAVE.energy+'/'+maxEnergy()+'</b></div><div class="sub">ฟื้น 1 หน่วยทุก 6 นาที · ถัดไปอีก '+mmss(nextEnergyIn())+'</div>'+
 '<div class="btns v"><button class="btn green'+(left>0?'':' dis')+'" data-act="adE">ดูโฆษณา +30 พลังงาน <small>(เหลือ '+Math.max(0,left)+'/5 วันนี้)</small></button><button class="btn blue" data-act="gemE">'+I('gem','s')+' 20 เพชร → +30 พลังงาน</button>'+(feastAvail()?'<button class="btn yellow" data-act="feast">รับงานเลี้ยง +60</button>':'<div class="hint">งานเลี้ยงฟรี +60 พลังงาน: 12:00–14:00 และ 18:00–20:00</div>')+'</div></div>');}
ACT.gemE=function(){if(SAVE.gems<20){toast('เพชรไม่พอ');return;}SAVE.gems-=20;addEnergy(30);save();topUpdate();sfx('buff',.7);toast('ได้พลังงาน +30');closeModal();};
ACT.adE=function(){watchAd(function(){addEnergy(30);toast('ได้พลังงาน +30');},'พลังงาน +30');};
ACT.feast=function(){if(claimFeast()){sfx('win',.6);say('energy');toast('รับงานเลี้ยง +60 พลังงาน!');topUpdate();if(cur==='hub')SCR.hub();closeModal();}else{modal('<div class="en"><button class="x" data-act="close">✕</button><h2>งานเลี้ยงของไครอน</h2><div class="sub">รับพลังงานฟรี +60 ได้วันละ 2 ครั้ง<br>ช่วง 12:00–14:00 และ 18:00–20:00</div><div class="btns"><button class="btn yellow" data-act="close">ตกลง</button></div></div>');}};
ACT.ads=function(){var left=5-SAVE.daily.adN;modal('<div class="en"><button class="x" data-act="close">✕</button><h2>ดูโฆษณาฟรี</h2><div class="sub">โฆษณาทดสอบ · เหลือ '+Math.max(0,left)+'/5 ครั้งวันนี้</div><div class="btns v"><button class="btn green'+(left>0?'':' dis')+'" data-act="adE">'+I('energy','s')+' พลังงาน +30</button><button class="btn green'+(left>0?'':' dis')+'" data-act="adC">'+I('coin','s')+' เหรียญ +500</button><button class="btn green'+(left>0?'':' dis')+'" data-act="adG">'+I('gem','s')+' เพชร +10</button></div></div>');};
ACT.adC=function(){watchAd(function(){SAVE.coins+=500;toast('ได้เหรียญ +500');},'เหรียญ +500');};
ACT.adG=function(){watchAd(function(){SAVE.gems+=10;toast('ได้เพชร +10');},'เพชร +10');};
function watchAd(grantFn,label){if(SAVE.daily.adN>=5){toast('ดูโฆษณาครบ 5 ครั้งของวันนี้แล้ว');return;}
 var a=$('ad');a.classList.remove('hidden');var n=3;a.innerHTML='<div class="adbox"><small>โฆษณาตัวอย่าง (ทดสอบ)</small><div class="adart">'+I('chest1','l')+'<b>Kairon Arcade</b></div><div class="adt">รางวัล: '+label+'</div><button class="btn dis" id="adx">รออีก <span id="adn">3</span> วิ</button></div>';
 var iv=setInterval(function(){n--;if(n>0){$('adn').textContent=n;return;}clearInterval(iv);var b=$('adx');b.className='btn yellow';b.textContent='รับรางวัล';b.onclick=function(){a.classList.add('hidden');a.innerHTML='';SAVE.daily.adN++;grantFn();save();topUpdate();closeModal();if(cur==='hub')SCR.hub();};},1000);}
/* ---------- battle HUD ---------- */
var hudC=[];
function hudBuild(){var al=B.us.filter(function(u){return u.side==='a';});hudC=[];
 $('ports').innerHTML=al.map(function(u,i){return '<button class="port" data-act="ult" data-a="'+i+'" style="--c:'+u.d.col+'"><img src="art/p'+u.hid+'.webp" alt=""><i class="ring"></i><span class="hpb"><u></u></span><em class="rdy">แตะ!</em><b class="lv">'+u.lvl+'</b><span class="cls" style="background:'+CLS[u.d.cls].c+'"></span></button>';}).join('');
 $('hud').classList.remove('hidden');$('bossbox').classList.add('hidden');$('btn-spd').textContent='x'+B.speed;$('btn-auto').classList.toggle('on',B.auto);$('btn-auto').classList.toggle('lock',!autoOK());$('hint-ult').classList.add('hidden');}
function autoOK(){return B&&B.stg&&(B.mode==='surv'||stageRec(B.stg.z,B.stg.s,B.stg.heroic).st>=3);}
function hudHide(){$('hud').classList.add('hidden');}
function hudTick(){if(!B)return;var al=B.us.filter(function(u){return u.side==='a';}),ps=$('ports').children,anyR=false;
 for(var i=0;i<al.length&&i<ps.length;i++){var u=al[i],p=ps[i],pw=Math.round(u.pw/10),hp=Math.round(u.hp/u.mhp*100),k=pw+'_'+hp+'_'+(u.alive?1:0)+(stunned(u)?1:0)+(u.st.sil>0?1:0);if(hudC[i]===k)continue;hudC[i]=k;
  p.style.setProperty('--p',pw/100*360+'deg');p.firstChild.nextSibling.nextSibling.firstChild.style.width=hp+'%';p.classList.toggle('full',u.alive&&pw>=100);p.classList.toggle('dead',!u.alive);p.classList.toggle('stun',u.alive&&(stunned(u)||u.st.sil>0));}
 al.forEach(function(u){if(u.alive&&u.pw>=1000)anyR=true;});
 var ht=$('hint-ult');if(!SAVE.tut.ult&&anyR&&B.state==='fight')ht.classList.remove('hidden');else ht.classList.add('hidden');
 $('h-wave').textContent=(B.wave+1)+'/'+B.nw;$('h-time').textContent=mmss(B.t);var cb=$('combo');if(B.combo>=3){cb.className='on';cb.innerHTML='<small>คอมโบ</small><b>'+B.combo+'</b>';}else cb.className='';
 var bs=B.us.filter(function(u){return u.boss;})[0];if(bs){var bb=$('bossbox');bb.classList.remove('hidden');$('boss-n').textContent=bs.name;$('boss-f').style.width=Math.max(0,bs.hp/bs.mhp*100)+'%';$('boss-s').style.width=Math.max(0,bs.sh/bs.mhp*100)+'%';}else $('bossbox').classList.add('hidden');}
ACT.ult=function(el){if(!B)return;if(tapUlt(+el.dataset.a)){SAVE.tut.ult=1;}else{var u=B.us.filter(function(x){return x.side==='a';})[+el.dataset.a];if(u&&u.alive&&u.pw<1000)toast('พลังยังไม่เต็ม',700);}};
ACT.spd=function(){if(!B)return;B.speed=B.speed===1?2:1;$('btn-spd').textContent='x'+B.speed;sfx('btn',.5);};
ACT.auto=function(){if(!B)return;if(!autoOK()){toast('ต้องได้ 3 ดาวในด่านนี้ก่อนจึงจะออโต้ได้');return;}B.auto=!B.auto;$('btn-auto').classList.toggle('on',B.auto);sfx('btn',.5);};
ACT.pause=function(){if(!B||B.res||B.state==='win'||B.state==='lose')return;B.pause=true;modal('<div class="en"><h2>พักการต่อสู้</h2><div class="btns v"><button class="btn yellow" data-act="resume">เล่นต่อ</button><button class="btn" data-act="mute2">'+(SAVE.mute?'🔇 เปิดเสียง':'🔊 ปิดเสียง')+'</button><button class="btn red" data-act="quit">ยอมแพ้ ออกจากด่าน</button></div></div>');};
ACT.resume=function(){if(B)B.pause=false;closeModal();};
ACT.mute2=function(){setMute(!SAVE.mute);ACT.pause&&(B.pause=false,ACT.pause());};
ACT.quit=function(){var o=B&&B.opt;endBattle();if(o&&o.onQuit)o.onQuit();else go('map');};
/* ---------- heroes ---------- */
var heroTab='lv';
function alertHero(id){var h=hx(id);if(!h.own)return h.frag>=UNLOCKFRAG;if(canFuse(id)&&SAVE.coins>=fuseCost(id))return true;if(h.lv<SAVE.plv&&(SAVE.potS>0||SAVE.potL>0))return true;var sc=starCost(id);if(sc&&h.frag>=sc.f&&SAVE.coins>=sc.c)return true;for(var i=0;i<6;i++)if(!h.gear[i]&&(SAVE.bag['g'+i+'_'+h.grade]||0)>0)return true;if(canAwaken(id))return true;return false;}
SCR.heroes=function(){var t=fixTeam(),o='';for(var i=1;i<=NHERO;i++){var d=HEROES[i],h=hx(i),own=h.own;
  o+='<button class="hcard'+(own?'':' lockd')+(alertHero(i)?' dot':'')+'" data-act="hero" data-a="'+i+'" style="--c:'+CLS[d.cls].c+';--g:'+GRADES[h.grade].c+'"><div class="pimg"><img src="art/p'+i+'.webp" alt="">'+(t.indexOf(i)>=0?'<em class="ont">ทีม</em>':'')+'</div><b>'+esc(d.n)+'</b><small>'+CLS[d.cls].n+'</small>'+(own?'<span class="lvt">Lv '+h.lv+'</span>'+stars(h.star,5,'sm'):'<div class="frg"><i style="width:'+Math.min(100,h.frag/UNLOCKFRAG*100)+'%"></i><span>'+h.frag+'/'+UNLOCKFRAG+'</span></div>')+'</button>';}
 setScreen('<div class="pgh"><h2>ฮีโร่ของฉัน</h2><button class="mini" data-act="team">จัดทีม</button></div><div class="hgrid">'+o+'</div>','pg');};
ACT.hero=function(el){var id=+el.dataset.a,h=hx(id);if(!h.own){if(h.frag>=UNLOCKFRAG){if(unlockHero(id)){sfx('rare',.8);say('hero');toast('ปลดล็อก '+HEROES[id].n+'!');revealHero(id);}return;}}go('hero',id);};
function revealHero(id){modal('<div class="res win"><h2>ได้ฮีโร่ใหม่!</h2><img class="rhero" src="art/h'+id+'_idle.webp" alt=""><b class="rn">'+esc(HEROES[id].n)+'</b><div class="sub">'+esc(HEROES[id].t)+'</div><div class="btns"><button class="btn yellow" data-act="hero2" data-a="'+id+'">ดูฮีโร่</button></div></div>');}
ACT.hero2=function(el){go('hero',+el.dataset.a);};
function statRows(id){var t=fixTeam(),s=heroStats(id,t.indexOf(id)>=0?t:null);return [['พลังชีวิต',fmtN(s.hp)],['โจมตี',fmtN(s.atk)],['เกราะกายภาพ',fmtN(s.def)],['เกราะเวท',fmtN(s.mdef)],['ความเร็วโจมตี','ทุก '+s.as.toFixed(2)+' วิ'],['คริติคอล',Math.round(s.crit*100)+'%'],['พลังรบ',fmtN(heroPower(id,t))]];}
SCR.hero=function(id){var d=HEROES[id],h=hx(id),sy=d.sym.map(function(x){return '<i class="sym" style="background:'+SYM[x].c+'" title="'+SYM[x].n+'">'+x+'</i>';}).join('');
 var tabs=[['lv','เลเวล'],['star','ดาว'],['gear','เกรด/ของ'],['skill','สกิล'],['awk','ตื่นรู้']].map(function(t){return '<button class="'+(heroTab===t[0]?'on':'')+'" data-act="htab" data-a="'+t[0]+'">'+t[1]+'</button>';}).join('');
 var body=heroBody(id);
 setScreen('<div class="hd" style="--c:'+CLS[d.cls].c+';--g:'+GRADES[h.grade].c+'"><div class="hdbar"><button class="mini" data-act="heroes2b">‹ กลับ</button><b>'+esc(d.n)+'</b><span><button class="mini" data-act="hnav" data-a="-1">◀</button><button class="mini" data-act="hnav" data-a="1">▶</button></span></div>'+
  '<div class="hdtop"><div class="hdimg"><img src="art/h'+id+'_idle.webp" alt=""></div><div class="hdinfo"><div class="tt">'+esc(d.t)+'</div><div class="chips"><span class="chip" style="background:'+CLS[d.cls].c+'">'+CLS[d.cls].n+'</span><span class="chip" style="background:'+(d.dt==='p'?'#c8743a':'#7a5ad8')+'">'+(d.dt==='p'?'กายภาพ':'เวท')+'</span><span class="chip">แถว'+['หน้า','กลาง','หลัง'][d.line]+'</span></div><div class="gr" style="color:'+GRADES[h.grade].c+'">เกรด'+GRADES[h.grade].n+' '+stars(h.star,5,'sm')+'</div><div class="syms">'+sy+(h.awk&&d.lead?'<em>ผู้นำ '+d.lead+'</em>':'')+'</div>'+
  '<div class="lvl">Lv <b>'+h.lv+'</b> / '+SAVE.plv+'<div class="bar"><i style="width:'+(h.exp/needHeroExp(h.lv)*100)+'%"></i></div></div></div></div>'+
  '<div class="stats">'+statRows(id).map(function(r){return '<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join('')+'</div>'+
  '<div class="tabs">'+tabs+'</div><div class="tbody">'+body+'</div></div>','pg');};
ACT.heroes2b=function(){go('heroes');};
ACT.hnav=function(el){var id=curArg+ +el.dataset.a;if(id<1)id=NHERO;if(id>NHERO)id=1;if(!hx(id).own){go('hero',id);toast('ยังไม่ได้ปลดล็อก');return;}go('hero',id);};
ACT.htab=function(el){heroTab=el.dataset.a;sfx('btn',.4);SCR.hero(curArg);};
function heroBody(id){var d=HEROES[id],h=hx(id),o='';
 if(heroTab==='lv'){var cap=h.lv>=SAVE.plv;o+='<div class="sec"><div class="sub">เลเวลฮีโร่สูงสุดไม่เกินเลเวลปาร์ตี้ ('+SAVE.plv+')'+(cap?' · <b class="warn">ถึงเพดานแล้ว!</b>':'')+'</div><div class="itms"><div class="itm">'+I('exp')+'<b>ยาเลเวล ×'+SAVE.potS+'</b><small>+100 EXP</small><button class="btn blue sm'+(SAVE.potS&&!cap?'':' dis')+'" data-act="pot" data-a="S">ใช้</button></div><div class="itm">'+I('exp','xl')+'<b>ยาใหญ่ ×'+SAVE.potL+'</b><small>+500 EXP</small><button class="btn blue sm'+(SAVE.potL&&!cap?'':' dis')+'" data-act="pot" data-a="L">ใช้</button></div></div><button class="btn yellow wide'+(SAVE.potS&&!cap?'':' dis')+'" data-act="pot" data-a="S10">ใช้ยาเลเวลทั้งหมด</button><div class="hint">ด่านที่กวาดล้างจะไม่ได้ EXP ฮีโร่ แต่ได้ยาเลเวล</div></div>';}
 else if(heroTab==='star'){var sc=starCost(id);o+='<div class="sec"><div class="starbig">'+stars(h.star,5,'big')+'</div><div class="sub">เศษวิญญาณของ '+esc(d.n)+'</div><div class="frg big"><i style="width:'+(sc?Math.min(100,h.frag/sc.f*100):100)+'%"></i><span>'+h.frag+(sc?'/'+sc.f:'')+'</span></div>'+(sc?'<button class="btn yellow wide'+(h.frag>=sc.f&&SAVE.coins>=sc.c?'':' dis')+'" data-act="starup">เพิ่มดาว · '+I('coin','s')+fmtN(sc.c)+'</button><div class="hint">ดาวเพิ่ม พลังรวมของฮีโร่ +16% ต่อดาว</div>':'<div class="hint">ดาวเต็ม 5 ดวงแล้ว!</div>')+'</div>';}
 else if(heroTab==='gear'){var gs='';for(var i=0;i<6;i++){var t=h.gear[i],nb=SAVE.bag['g'+i+'_'+h.grade]||0;gs+='<button class="slot'+(t?' on gt'+t:'')+'" data-act="equip" data-a="'+i+'"><img src="art/'+SLOTS[i].ic+'.webp" alt="" style="opacity:'+(t?1:.3)+'"><small>'+SLOTS[i].n+'</small>'+(t?'':'<em>'+(nb?'ใส่ได้ ×'+nb:'ว่าง')+'</em>')+'</button>';}
  var ng=h.grade<5;o+='<div class="sec"><div class="sub">ใส่ของเกรด<b style="color:'+GRADES[h.grade].c+'"> '+GRADES[h.grade].n+'</b> ให้ครบ 6 ช่อง แล้วหลอมรวมเพื่อเลื่อนเกรด</div><div class="slots">'+gs+'</div><div class="btns"><button class="btn blue" data-act="equipall">ใส่ทั้งหมด</button><button class="btn" data-act="bag">กระเป๋า/ผสานของ</button></div>'+
  (ng?'<button class="btn yellow wide'+(canFuse(id)&&SAVE.coins>=fuseCost(id)?'':' dis')+'" data-act="fuse">หลอมรวม (Fuse) → เกรด'+GRADES[h.grade+1].n+' · '+I('coin','s')+fmtN(fuseCost(id))+'</button><div class="hint">'+(canFuse(id)?'ใส่ครบแล้ว! หลอมรวมได้เลย':'ต้องใส่ของเกรด'+GRADES[h.grade].n+' ครบทั้ง 6 ช่อง · ปลดล็อกสกิลใหม่ที่เขียว/น้ำเงิน/ม่วง')+'</div>':'<div class="hint">เกรดสูงสุดแล้ว!</div>')+'</div>';}
 else if(heroTab==='skill'){o+='<div class="sec">';for(var s=0;s<4;s++){var sk=d.sk[s],un=skUnlocked(id,s),lv=h.sk[s],cap=skCap(id,s),cost=skCost(id,s),can=SAVE.plv>=7&&un&&lv<cap;
   o+='<div class="skr'+(un?'':' lockd')+'"><img src="art/'+sk.ic+'.webp" alt=""><div class="skt"><b>'+(s===0?'<em class="ult">ไม้ตาย</em> ':'')+esc(sk.n)+' <small>Lv '+lv+(un?'/'+cap:'')+'</small></b><span>'+skDesc(sk,h.sk[s])+'</span></div>'+(un?'<button class="btn yellow sm'+(can?'':' dis')+'" data-act="skup" data-a="'+s+'">'+(SAVE.plv<7?'🔒Lv7':lv>=cap?'MAX':'<small>'+I('coin','xs')+fmtN(cost)+'</small>')+'</button>':'<em class="need">เกรด'+GRADES[s+1].n+'</em>')+'</div>';}
  o+=(SAVE.plv<7?'<div class="hint">อัพสกิลได้เมื่อเลเวลปาร์ตี้ ถึง 7</div>':'<div class="hint">สกิล 3 ≤ เลเวลฮีโร่−20 · สกิล 4 ≤ เลเวลฮีโร่−40</div>')+'</div>';}
 else{var st=awmState(id),q=HQUIP[d.cls],can=canAwaken(id);
  if(h.awk)o+='<div class="sec"><div class="awkdone">✦ ตื่นรู้แล้ว</div><div class="awk"><b>'+esc(d.awk.n)+'</b><span>'+esc(d.awk.d)+'</span></div>'+(d.lead?'<div class="awk"><b>ออร่าผู้นำ ('+d.lead+' · '+SYM[d.lead].n+')</b><span>'+SYM[d.lead].d+' ให้ฮีโร่ในทีมที่มีสัญลักษณ์เดียวกัน</span></div>':'')+'</div>';
  else o+='<div class="sec"><div class="sub">ตื่นรู้ได้ที่เลเวล '+AWAKEN_LV+' ต้องทำ 3 ภารกิจ</div>'+
   '<div class="awm'+(st[0]?' ok':'')+'"><i></i><span>ม้วนตื่นรู้ (ได้จากด่านฮีโร่ริก) '+h.af+'/'+AF_NEED+'</span></div>'+
   '<div class="awm'+(st[1]?' ok':'')+'"><i></i><span>ด่านทดสอบฮีโร่ ชนะ '+Math.min(h.trial,TRIAL_NEED)+'/'+TRIAL_NEED+'</span><button class="btn blue sm'+(h.lv>=AWAKEN_LV?'':' dis')+'" data-act="trial">ท้าทาย</button></div>'+
   '<div class="awm'+(st[2]?' ok':'')+'"><i></i><span>'+q.n+' '+fmtN(Math.min(h.awp||0,q.v))+'/'+fmtN(q.v)+' ในศึกเดียว (ชนะด่านปกติ)</span></div>'+
   '<button class="btn yellow wide'+(can?'':' dis')+'" data-act="awaken">ตื่นรู้!</button><div class="hint">รางวัล: '+esc(d.awk.n)+' — '+esc(d.awk.d)+(d.lead?' และได้ออร่าผู้นำ '+d.lead:'')+'</div></div>';}
 return o;}
function skDesc(sk,lv){var m=skMul(lv),c=Math.round((sk.c||0)*m*100);var s='';
 if(sk.k==='dmg')s='ดาเมจ '+c+'%'+(sk.h>1?' ×'+sk.h:'')+(sk.tgt==='all'?' ใส่ศัตรูทุกตัว':sk.tgt==='row'?' ทั้งแถว':sk.tgt==='rand'?' สุ่ม':sk.tgt==='weak'?' ตัวเลือดน้อยสุด':sk.tgt==='splash'?' ระเบิดวงกว้าง':'');
 else if(sk.k==='heal')s='ฮีล '+c+'%'+(sk.tgt==='all'?' ทั้งทีม':sk.tgt==='low'?' คนเลือดน้อยสุด':'')+(sk.cleanse?' ล้างสถานะ':'')+(sk.revive?' ชุบคนล้ม':'');
 else if(sk.k==='shield')s='โล่ '+c+'% '+sk.dur+' วิ'+(sk.tgt==='all'?' ทั้งทีม':'');
 else if(sk.k==='buff')s=({atk:'พลังโจมตี',def:'เกราะ',as:'ความเร็วโจมตี',crit:'คริติคอล'}[sk.stat]||sk.stat)+' +'+Math.round(sk.pct*100)+'% '+sk.dur+' วิ'+(sk.tgt==='all'?' ทั้งทีม':'');
 else if(sk.k==='debuff')s='ลดพลังโจมตีศัตรู '+Math.round(sk.pct*100)+'%';
 else if(sk.k==='taunt')s='ยั่วศัตรู '+sk.dur+' วิ ลดดาเมจรับ '+Math.round(sk.red*100)+'%';
 else if(sk.k==='power')s='เพิ่มพลังไม้ตายทั้งทีม +'+sk.amt/10+'%';
 if(sk.st){if(sk.st.stun)s+=' · มึน '+sk.st.stun+' วิ';if(sk.st.frz)s+=' · แช่แข็ง '+sk.st.frz+' วิ';if(sk.st.slow)s+=' · ช้าลง';if(sk.st.burn)s+=' · ไหม้';if(sk.st.sil)s+=' · ผนึกสกิล '+sk.st.sil+' วิ';}
 if(sk.cd)s+=' · คูลดาวน์ '+sk.cd+' วิ';return s;}
ACT.pot=function(el){var id=curArg,k=el.dataset.a,n=0;if(k==='S10'){while(useExpItem(id,'S')==='ok')n++;}else{if(useExpItem(id,k)==='ok')n=1;}if(n){sfx('buff',.6);toast('เลเวลฮีโร่: '+hx(id).lv);}else toast('ใช้ไม่ได้ (ถึงเพดานหรือไม่มียา)');refresh();};
ACT.starup=function(){if(starUp(curArg)){sfx('star',.8);say('levelup');toast('ดาวเพิ่มแล้ว!');}else toast('เศษหรือเหรียญไม่พอ');refresh();};
ACT.equip=function(el){if(equipSlot(curArg,+el.dataset.a)){sfx('btn',.6);save();}else toast('ไม่มีของที่ใส่ได้ — หาได้จากด่าน กาชา และผสานของ');refresh();};
ACT.equipall=function(){var n=equipAll(curArg);if(n){sfx('buff',.7);toast('ใส่ของ '+n+' ชิ้น');}else toast('ไม่มีของที่ใส่ได้');refresh();};
ACT.fuse=function(){if(fuseHero(curArg)){sfx('win',.8);say('fuse');toast('หลอมรวมสำเร็จ! เกรด'+GRADES[hx(curArg).grade].n);bannerShow('เกรดอัพ!',HEROES[curArg].n+' → เกรด'+GRADES[hx(curArg).grade].n,false);}else toast('ยังหลอมไม่ได้');refresh();};
ACT.skup=function(el){var r=skUp(curArg,+el.dataset.a);if(r==='ok'){sfx('buff',.6);}else if(r==='coin')toast('เหรียญไม่พอ');else toast('อัพไม่ได้');refresh();};
ACT.awaken=function(){if(doAwaken(curArg)){sfx('win',.9);say('awaken');bannerShow('ตื่นรู้!',HEROES[curArg].n,true);B&&0;}else toast('ยังตื่นรู้ไม่ได้');refresh();};
function trialStage(id){var h=hx(id),L=h.lv+1,r=[];var z=clamp(Math.ceil(h.lv/6),1,NZONE);var waves=[[{j:0},{j:1},{j:2}],[{j:3},{j:2},{j:0},{j:1}],[{j:2,elite:1},{j:3},{j:1}]];
 return {z:z,s:0,n:0,heroic:false,boss:false,waves:waves,lvl:L,cost:8,tl:999,tier:2,name:'ด่านทดสอบ',mult:1,coins:300,hxp:0,feat:id,trial:id};}
ACT.trial=function(){var id=curArg,h=hx(id);if(h.lv<AWAKEN_LV){toast('ต้องเลเวล '+AWAKEN_LV+' ก่อน');return;}if(!spendEnergy(8)){energyModal();return;}save();
 var t=fixTeam().slice();if(t.indexOf(id)<0){t[t.length-1>=4?4:t.length]=id;t=t.slice(0,5);}var sd=trialStage(id);
 beginBattle({stg:sd,mode:'trial',team:t,auto:false,onQuit:function(){go('hero',id);},onEnd:function(r){trialEnd(id,sd,r);}});};
function trialEnd(id,sd,r){hudHide();var h=hx(id);if(r.win){h.trial=Math.min(TRIAL_NEED,(h.trial||0)+1);SAVE.coins+=300;save();modal('<div class="res win"><h2>ผ่านด่านทดสอบ!</h2><div class="sub">'+esc(HEROES[id].n)+' ชนะ '+h.trial+'/'+TRIAL_NEED+'</div><div class="rws">'+rewHtml({coins:300})+'</div><div class="btns"><button class="btn yellow" data-act="trialback">ตกลง</button></div></div>');}
 else modal('<div class="res lose"><h2>ยังไม่ผ่าน</h2><div class="btns"><button class="btn yellow" data-act="trialback">กลับ</button></div></div>');}
ACT.trialback=function(){var id=B&&B.stg.trial||curArg;endBattle();go('hero',id);};
/* ---------- bag / crafting ---------- */
ACT.bag=function(){var o='',any=false;for(var t=1;t<=4;t++)for(var s=0;s<6;s++){var n=SAVE.bag['g'+s+'_'+t]||0;if(!n)continue;any=true;o+='<div class="bgi gt'+t+'"><img src="art/'+SLOTS[s].ic+'.webp" alt=""><b>×'+n+'</b><small>'+SLOTS[s].n+' T'+t+' · '+GRADES[t].n+'</small>'+(t<4?'<button class="btn blue xs'+(n>=3&&SAVE.coins>=craftCost(t)?'':' dis')+'" data-act="craft" data-a="'+s+'_'+t+'">ผสาน 3→1 <small>'+I('coin','xs')+craftCost(t)+'</small></button>':'')+'</div>';}
 modal('<div class="bagm"><button class="x" data-act="close">✕</button><h2>กระเป๋า</h2><div class="bagtop"><span>'+I('exp','s')+' ยาเล็ก '+SAVE.potS+'</span><span>'+I('exp','s')+' ยาใหญ่ '+SAVE.potL+'</span><span>'+I('ticket','s')+' บัตรกวาด '+SAVE.tickets+'</span></div><div class="bggrid">'+(any?o:'<div class="empty">ยังไม่มีของ — ไปลุยด่านหรือเปิดกาชาได้เลย!</div>')+'</div><div class="hint">ผสานของชิ้นเดียวกัน 3 ชิ้น เป็นชิ้นเกรดสูงขึ้น 1 ชิ้น</div></div>');};
ACT.craft=function(el){var p=el.dataset.a.split('_');if(craft(+p[0],+p[1])){sfx('buff',.7);toast('ผสานสำเร็จ!');}else toast('ของหรือเหรียญไม่พอ');topUpdate();ACT.bag();if(cur==='hero')SCR.hero(curArg);};
/* ---------- gacha ---------- */
var COIN_P=600,GEM_P=30,gachaTab='c';
function gdef(kind){return kind==='c'?{p:COIN_P,cur:'coins',ic:'chest1',n:'หีบเหรียญ',d:'เศษฮีโร่ ของเกรดต่ำ ยาเลเวล'}:{p:GEM_P,cur:'gems',ic:'chest2',n:'หีบเพชร',d:'เศษฮีโร่เยอะ ของเกรดสูง ยาใหญ่ บัตรกวาด'};}
function pickHero(){var w=[],t=0;for(var i=1;i<=NHERO;i++){var x=hx(i).own?1:1.6;w.push(x);t+=x;}var r=rnd()*t;for(i=0;i<NHERO;i++){r-=w[i];if(r<=0)return i+1;}return 1;}
function pullOne(kind,rare){var r={},x=rnd();
 if(kind==='c'){if(rare){addTo(r.frag=r.frag||{},pickHero(),ri(6,9));return {r:r,rar:2};}
  if(x<.30){addTo(r.frag=r.frag||{},pickHero(),ri(2,4));return {r:r,rar:1};}
  if(x<.58){addTo(r.gear=r.gear||{},'g'+ri(0,5)+'_1',1);return {r:r,rar:0};}
  if(x<.68){addTo(r.gear=r.gear||{},'g'+ri(0,5)+'_2',1);return {r:r,rar:1};}
  if(x<.84){r.potS=ri(2,4);return {r:r,rar:0};}
  r.coins=ri(300,800);return {r:r,rar:0};}
 else{if(rare){if(rnd()<.5){addTo(r.frag=r.frag||{},pickHero(),ri(12,20));}else{addTo(r.gear=r.gear||{},'g'+ri(0,5)+'_4',1);}return {r:r,rar:2};}
  if(x<.42){addTo(r.frag=r.frag||{},pickHero(),ri(4,8));return {r:r,rar:1};}
  if(x<.64){addTo(r.gear=r.gear||{},'g'+ri(0,5)+'_3',1);return {r:r,rar:1};}
  if(x<.80){r.potL=ri(1,2);return {r:r,rar:1};}
  if(x<.90){r.tickets=ri(1,3);return {r:r,rar:0};}
  if(x<.95){addTo(r.gear=r.gear||{},'g'+ri(0,5)+'_4',1);return {r:r,rar:2};}
  addTo(r.frag=r.frag||{},pickHero(),ri(12,20));return {r:r,rar:2};}}
SCR.gacha=function(){var D=SAVE.daily,fc=5-D.freeCoin,fgIn=48*3600000-(NOW()-D.fgT),fg=fgIn<=0;
 var card=function(k){var g=gdef(k),free=k==='c'?fc>0:fg;return '<div class="gcard '+k+'"><img class="gimg" src="art/i_'+g.ic+'.webp" alt=""><h3>'+g.n+'</h3><small>'+g.d+'</small>'+
  '<div class="btns"><button class="btn '+(free?'green':'yellow')+'" data-act="pull" data-a="'+k+'_1">'+(free?'ฟรี!':'×1 · '+I(g.cur==='coins'?'coin':'gem','s')+g.p)+'</button><button class="btn yellow" data-act="pull" data-a="'+k+'_10">×10 · '+I(g.cur==='coins'?'coin':'gem','s')+(g.p*9)+'</button></div><div class="hint">'+(k==='c'?'ฟรีวันละ 5 ครั้ง (เหลือ '+Math.max(0,fc)+')':(fg?'ฟรี 1 ครั้งตอนนี้!':'ฟรีอีกครั้งใน '+Math.floor(fgIn/3600000)+' ชม.'))+' · ×10 ได้ของหายากอย่างน้อย 1 ชิ้น</div></div>';};
 setScreen('<div class="pgh"><h2>กาชา</h2><small>ใช้เหรียญ/เพชรในเกมเท่านั้น</small></div><div class="gachaw">'+card('c')+card('g')+'</div>','pg');};
ACT.pull=function(el){var p=el.dataset.a.split('_'),k=p[0],n=+p[1],g=gdef(k),D=SAVE.daily,free=false,cost=n===1?g.p:g.p*9;
 if(n===1){if(k==='c'&&D.freeCoin<5){free=true;}if(k==='g'&&NOW()-D.fgT>=48*3600000){free=true;}}
 if(!free&&SAVE[g.cur]<cost){toast((g.cur==='coins'?'เหรียญ':'เพชร')+'ไม่พอ');return;}
 if(free){if(k==='c')D.freeCoin++;else D.fgT=NOW();}else SAVE[g.cur]-=cost;
 var items=[],tot={},hasRare=false,pk=k==='c'?'c':'g';
 for(var i=0;i<n;i++){SAVE.pity[pk]++;var rare=SAVE.pity[pk]>=10||(n===10&&i===9&&!hasRare);var it=pullOne(k,rare);if(it.rar===2){hasRare=true;SAVE.pity[pk]=0;}items.push(it);mergeRew(tot,it.r);}
 SAVE.stats.pulls+=n;grant(tot);save();topUpdate();
 var cards=items.map(function(it,i){return '<div class="gc r'+it.rar+'" style="animation-delay:'+(i*.14)+'s">'+rewHtml(it.r)+'</div>';}).join('');
 sfx(hasRare?'rare':'gacha',.8);say(hasRare?'rare':'gacha');
 modal('<div class="gres"><h2>'+g.n+' ×'+n+'</h2><div class="gcs n'+n+'">'+cards+'</div><div class="btns"><button class="btn yellow" data-act="gdone">ตกลง</button></div></div>');};
ACT.gdone=function(){closeModal();SCR.gacha();};
/* ---------- survival ---------- */
function survStage(k){var z=clamp(Math.ceil(k/3),1,5),boss=k%5===0,R=seedRnd(k*13+5),waves=[],nw=k>=6?2:1;
 for(var w=0;w<nw;w++){var cnt=clamp(2+Math.floor((k+w*3)/4),3,5),arr=[];for(var i=0;i<cnt;i++)arr.push({j:Math.floor(R()*4)});if(k%5===4&&w===nw-1)arr[0].elite=1;waves.push(arr);}
 if(boss){waves=[[{boss:1},{j:Math.floor(R()*4)},{j:Math.floor(R()*4)}]];}
 return {z:z,s:k,n:k,heroic:false,boss:boss,waves:waves,lvl:Math.round(SAVE.plv*.75+k*1.3+1),cost:0,tl:999,tier:clamp(Math.ceil(k/4),1,4),name:'ด่านรอด '+k,mult:1+k*.025,coins:0,hxp:0,feat:1,surv:k};}
SCR.surv=function(){var S=SAVE.surv,D=SAVE.daily;if(SAVE.plv<SURV_PLV){setScreen('<div class="pgh"><h2>ลุยรอด</h2></div><div class="lockbox"><b style="font-size:3rem">🔒</b><p>ปลดล็อกที่เลเวลปาร์ตี้ '+SURV_PLV+'</p><small>ตอนนี้เลเวล '+SAVE.plv+'</small></div>','pg');return;}
 var path='';for(var k=1;k<=15;k++){var st=S.act?(k<S.stage?'clr':k===S.stage?'cur':''):'';path+='<div class="sn '+st+((k%5===0)?' bs':'')+'">'+(k%5===0?'👑':k)+'</div>';}
 var tm=S.act?S.team:fixTeam(),un=S.units||{};
 var tc=tm.map(function(id){var u=un[id],d=HEROES[id],h=hx(id),mx=heroStats(id,tm).hp,f=u?(u.dead?0:u.hp/mx):1;return '<div class="stm'+(u&&u.dead?' dead':'')+'"><img src="art/p'+id+'.webp" alt=""><span class="hpb"><u style="width:'+Math.round(f*100)+'%"></u></span></div>';}).join('');
 var btn=S.act?'<button class="btn yellow big" data-act="survgo">ต่อสู้ด่าน '+S.stage+'</button><button class="btn red sm" data-act="survend">ยอมแพ้รอบนี้</button>':(D.surv<1?'<button class="btn yellow big" data-act="survstart">เริ่มรอบใหม่</button>':'<div class="hint">วันนี้เล่นครบแล้ว · รีเซ็ตตี 5</div>');
 setScreen('<div class="pgh"><h2>ลุยรอด</h2><small>สถิติสูงสุด: ด่าน '+(S.best||0)+'/15</small></div><div class="survb"><div class="sub">15 ด่านติด! พลังชีวิตและพลังไม้ตายยกต่อไปทุกด่าน ฮีโร่ที่ล้มจะไม่ฟื้น · ชนะแต่ละด่านได้หีบรางวัล · บอสทุกด่านที่ 5</div><div class="spath">'+path+'</div><div class="stmrow">'+tc+'</div><div class="chs">หีบที่ได้ในรอบนี้: <b>'+(S.chests||0)+'</b></div>'+btn+'</div>','pg');};
ACT.survstart=function(){var D=SAVE.daily;if(D.surv>=1){toast('วันนี้เล่นครบแล้ว');return;}D.surv++;SAVE.surv={act:1,stage:1,units:null,team:fixTeam().slice(),chests:0,best:SAVE.surv.best||0};save();SCR.surv();};
ACT.survend=function(){SAVE.surv.act=0;SAVE.surv.units=null;save();SCR.surv();};
ACT.survgo=function(){var S=SAVE.surv,k=S.stage,sd=survStage(k);beginBattle({stg:sd,mode:'surv',auto:false,team:S.team.slice(),carry:S.units,eMul:.9,onQuit:function(){go('surv');},onEnd:function(r){survEnd(k,sd,r);}});};
function survEnd(k,sd,r){hudHide();var S=SAVE.surv;S.units={};B.us.forEach(function(u){if(u.side==='a')S.units[u.hid]={hp:Math.max(1,u.hp),pw:u.pw,dead:!u.alive};});
 if(r.win){var rew={coins:120+k*40,potS:ri(1,3),gear:{},frag:{}};addTo(rew.gear,'g'+ri(0,5)+'_'+sd.tier,1);addTo(rew.frag,pickHero(),ri(1,3)+(sd.boss?3:0));if(sd.boss)rew.gems=10+k*2;rew.pexp=8+k*2;
  S.chests++;S.best=Math.max(S.best||0,k);S.stage++;var done=S.stage>15;if(done){rew.gems=(rew.gems||0)+50;S.act=0;S.units=null;}
  applyReward(rew,null);save();sfx('rare',.7);
  modal('<div class="res win"><h2>'+(done?'ผ่านครบ 15 ด่าน! 🏆':'ชนะด่าน '+k+'!')+'</h2><div class="chestb">'+I('chest2','xl')+'</div><div class="rws">'+rewHtml(rew)+'</div><div class="btns"><button class="btn yellow" data-act="survback">'+(done?'ตกลง':'ไปต่อ')+'</button></div></div>');}
 else{S.best=Math.max(S.best||0,k-1);S.act=0;S.units=null;save();modal('<div class="res lose"><h2>จบรอบลุยรอด</h2><div class="sub">ไปได้ถึงด่าน '+k+' · สถิติ '+S.best+'/15</div><div class="btns"><button class="btn yellow" data-act="survback">ตกลง</button></div></div>');}}
ACT.survback=function(){endBattle();go('surv');};
/* ---------- settings ---------- */
ACT.settings=function(){modal('<div class="en"><button class="x" data-act="close">✕</button><h2>ตั้งค่า</h2><div class="btns v"><button class="btn" data-act="mute3">'+(SAVE.mute?'🔇 เสียง: ปิด':'🔊 เสียง: เปิด')+'</button><button class="btn" data-act="credits">เครดิต</button><button class="btn red" data-act="reset">ลบเซฟ เริ่มใหม่</button></div><div class="hint">Brick Arena v1 · Kairon Arcade<br>ข้อมูลเก็บไว้ในเครื่องนี้เท่านั้น</div></div>');};
ACT.mute3=function(){setMute(!SAVE.mute);ACT.settings();};
ACT.credits=function(){modal('<div class="en"><button class="x" data-act="close">✕</button><h2>เครดิต</h2><div class="cred">เกม: Kairon Arcade · ห้องเกม ไครอน<br>ภาพ ตัวละคร และเนื้อหาเป็นงานต้นฉบับ<br>เสียงพากย์: VachanaTTS (MIT) · ฟอนต์ Kanit (OFL)<br>เกมนี้เป็นเกมต้นฉบับ ไม่เกี่ยวข้องกับเกมหรือบริษัทอื่น</div></div>');};
ACT.reset=function(){modal('<div class="en"><h2>ลบเซฟจริงไหม?</h2><div class="sub">ความคืบหน้าทั้งหมดจะหายไป</div><div class="btns"><button class="btn" data-act="close">ไม่ลบ</button><button class="btn red" data-act="reset2">ลบเลย</button></div></div>');};
ACT.reset2=function(){try{localStorage.removeItem(SKEY);}catch(e){}location.reload();};
/* ---------- hub talk ---------- */
var SAYS={1:['ข้าจะปกป้องทุกคนเอง!','สิงห์ไม่หนีหรอกนะ!','อิฐแน่นๆ ไม่มีวันพัง'],2:['เหมียว~ ลอบเงียบๆ','อย่ามองฉันสิ ขนลุก!','ฉันเร็วกว่าเงาอีกนะ'],3:['จรวดพร้อมแล้ว!','ขอบินสูงๆ หน่อยนะ','สามสองหนึ่ง ปล่อย!'],4:['อ๊บ อ๊บ!','คาถาน้ำแข็งเย็นฉ่ำ~','อย่าจับฉันนะ ลื่นนะ'],5:['เดี๋ยวซ่อมให้นะ','ระบบพร้อมทำงาน!','ใครเจ็บตรงไหน?'],6:['ฮู้~ ฮู้~','เล็งให้แม่นแล้วปล่อย','ตาฉันไวกว่าใคร'],7:['ตู้ม! ชอบเสียงนี้จริงๆ','อย่าเอาไฟมาใกล้นะ','ระเบิดใหม่ล่าสุด!'],8:['ขอพรให้ทุกคนนะ','ฮึบ! อย่าล้มนะ','แครอทมงคล~'],9:['ปี๊~ ปี๊~ มังกรมาแล้ว','เสียงขลุ่ยไพเราะไหม?','มังกรน้อยหิวแล้ว'],10:['ฮึบ! หมีสู้ตาย!','กอดหมีสักทีไหม','ใครกล้ามาลองดี!']};
function heroTalk(id){audioInit();HUB.hop[id]=1;var L=SAYS[id]||HEROES[id].tapt,k=ri(0,L.length-1);HUB.bub={id:id,txt:L[k],t:2.4};if(!say('t'+id+'_'+(k+1),true))say('tap'+ri(1,3),true);lazySnd('v_t'+id+'_'+(((k+1)%3)+1));sfx('btn',.4);}
/* ---------- splash / nav ---------- */
var TXT={title:'BRICK',title2:'ARENA',sub:'สนามรบก้อนอิฐ · เกมต่อสู้อัตโนมัติ',loading:'กำลังโหลด…',tapStart:'แตะเพื่อเริ่ม'};
function introModal(){modal('<div class="en"><h2>ยินดีต้อนรับสู่ Brick Arena!</h2><ul class="tutl"><li>ทีม 5 ตัวสู้กันเอง <b>อัตโนมัติ</b></li><li><b>แตะรูปฮีโร่</b> ตอนวงพลังเต็ม เพื่อปล่อยไม้ตาย</li><li>สกิล 2–4 ใช้เองอัตโนมัติ เมื่อเกรดสูงขึ้น</li><li>อัพเลเวล ใส่ของ เพิ่มดาว แล้วลุยด่านต่อ!</li><li>ได้ 3 ดาว จึงกวาดล้างและออโต้ได้</li></ul><div class="btns"><button class="btn yellow" data-act="introok">เข้าใจแล้ว!</button></div></div>');}
ACT.introok=function(){SAVE.tut.intro=1;save();closeModal();};
ACT.nav=function(el){sfx('btn',.5);go(el.dataset.a);};
ACT.enmodal=function(){energyModal();};
/* ---------- main ---------- */
function startGame(){showMenuChrome(true);go('hub');}
function frame(ts){requestAnimationFrame(frame);var dt=Math.min(.1,(ts-(frame.l||ts))/1000);frame.l=ts;TT+=dt;
 if(B){if(!B.pause){var n=B.speed;frame.acc=(frame.acc||0)+dt*n;var c=0;while(frame.acc>=1/60&&c<8){stepBattle(1/60);frame.acc-=1/60;c++;}if(c>=8)frame.acc=0;}drawBattle();hudTick();}
 else if(hubOn&&cur==='hub'){for(var k in HUB.hop)if(HUB.hop[k]>0)HUB.hop[k]=Math.max(0,HUB.hop[k]-dt*2.2);drawHub();}
 else if(cv){cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);}
 tickN+=dt;if(tickN>=1){tickN=0;if(!B)topUpdate();}}
function init(){cv=$('scene');cx=cv.getContext('2d');gameEl=$('game');layout();window.addEventListener('resize',function(){layout();geom();});
 document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=TXT[e.dataset.t]||'';});
 checkDaily();fixTeam();
 document.addEventListener('visibilitychange',function(){if(document.hidden&&B&&!B.pause&&B.state==='fight'&&!B.res)ACT.pause();});
 gameEl.addEventListener('click',function(e){var t=e.target.closest('[data-act]');if(t&&ACT[t.dataset.act]){if(!/^(ult|spd|auto|pull)$/.test(t.dataset.act))sfx('btn',.4);audioInit();ACT[t.dataset.act](t);return;}});
 cv.addEventListener('pointerdown',function(e){if(!hubOn||cur!=='hub'||mopen())return;var r=cv.getBoundingClientRect();hubTap((e.clientX-r.left)/SC,(e.clientY-r.top)/SC);});
 $('btn-start').addEventListener('click',function(){audioInit();music('hub',0);say('hello');$('splash').classList.add('gone');setTimeout(function(){$('splash').style.display='none';},500);startGame();if(!SAVE.tut.intro)setTimeout(introModal,500);});
 loadArt(function(){$('loadp').style.width='100%';$('btn-start').classList.remove('hidden');document.querySelector('.loadbox').classList.add('hidden');if(Q.skip){$('btn-start').click();}},function(p){$('loadp').style.width=(p*100)+'%';});
 requestAnimationFrame(frame);}
init();
})();
