/* ข้อมูลบทเรียน + สถานะ (localStorage) — ตัวอย่างทดลอง */
/* เนื้อหา LESSONS / CHAPTERS / LEVELS / CLASSMATES / TONE_GUIDE อยู่ใน data/common.js และ data/hskN.js */
LESSONS.forEach(l=>{l.lv=(CHAPTERS.find(c=>c.id===l.chapter)||{lv:1}).lv;l.words.forEach(w=>{w.lesson=l.id;w.lv=l.lv})});
const ALLW=LESSONS.flatMap(l=>l.words);
const wordBy=zh=>ALLW.find(w=>w.zh===zh);

/* วรรณยุกต์ → สี */
const TONES={'ā':1,'ē':1,'ī':1,'ō':1,'ū':1,'ǖ':1,'á':2,'é':2,'í':2,'ó':2,'ú':2,'ǘ':2,'ǎ':3,'ě':3,'ǐ':3,'ǒ':3,'ǔ':3,'ǚ':3,'à':4,'è':4,'ì':4,'ò':4,'ù':4,'ǜ':4};
function toneOf(s){for(const c of s.toLowerCase())if(TONES[c])return TONES[c];return 5}
function pyHtml(str){let o='',m,re=/([^| ]+)([| ]?)/g;while((m=re.exec(str))){const s=m[1];o+=`<span class="t${toneOf(s)}">${s}</span>`+(m[2]===' '?' ':'')}return o}
function pyPlain(str){return str.replace(/\|/g,'')}
function zhHtml(zh,py){const sy=py.split(/[| ]/).filter(Boolean);let i=0,o='';for(const c of zh){if(/[，。！？、]/.test(c)){o+=c;continue}const s=sy[i++]||'';o+=`<span class="t${toneOf(s)}">${c}</span>`}return o}

/* สถานะ */
const KEY='lama-cn-web-demo-v2';
const defState=()=>({name:'มินท์',xp:0,coins:20,streak:0,lastDay:-99,xpDay:{},shift:0,goal:20,parts:[],stars:{},mistakes:{},coinsEarned:0,
 chestDay:-99,spinDay:-99,own:['flower'],eq:{hat:null,face:null},invited:0,inviteCode:'LAMA-'+Math.random().toString(36).slice(2,6).toUpperCase(),
 remind:true,remindAt:'เย็น',plan:'free',seenWelcome:false,seenOnboard:false,interest:'',placed:0,level:1,assume:0,lvPicked:false,placeRes:null,placeHist:[],gameBest:{catch:0,speed:0,mem:0},duelWins:0,from:'',lostShown:-99,boss:{hp:260,max:260,day:-99},bossWins:0,
 freezes:1,buddy:null,cnt:{day:-99},mis:{day:-99,got:[]},evDay:-99,evId:'',evGot:-99,comebackDay:-99,freezeUsed:-99,inviteGot:[],
 seenCm:[],tutorN:0,studyN:0,qOk:0,qAll:0,words:{},recapDay:-99,gqDay:-99,tipSeen:{}});
let S;
try{S=Object.assign(defState(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){S=defState()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5)+S.shift;
const dayXp=(d=today())=>S.xpDay[d]||0;
const curStreak=()=>S.lastDay>=today()-1?S.streak:0;
const weekXp=()=>{let t=today(),s=0;for(let i=0;i<7;i++)s+=dayXp(t-i);return s};
const level=()=>Math.floor(S.xp/100)+1;
function touchStreak(){const t=today();if(S.lastDay===t)return false;S.streak=S.lastDay===t-1?S.streak+1:1;S.lastDay=t;return true}
/* หน่วยเรียน: 1 บท = 2 รอบ (a = คำ 1–8, b = คำ 9–16 + บทสนทนา) · ลำดับเรียนนับแยกตามระดับ HSK */
const UNITS=LESSONS.flatMap(L=>[{id:L.id+'a',lesson:L.id,lv:L.lv,part:0,words:L.words.slice(0,8)},{id:L.id+'b',lesson:L.id,lv:L.lv,part:1,words:L.words.slice(8)}]);
const unitBy=id=>UNITS.find(u=>u.id===id);
const lessonBy=id=>LESSONS.find(l=>l.id===id);
const unitDone=id=>S.parts.includes(id);
const isDone=lid=>unitDone(lid+'a')&&unitDone(lid+'b');
const curLv=()=>LEVELS.some(l=>l.id===S.level)?S.level:1;
const lvUnits=n=>UNITS.filter(u=>u.lv===n);
const lvLessons=n=>LESSONS.filter(l=>l.lv===n);
const lvWords=n=>lvLessons(n).reduce((a,l)=>a+l.words.length,0);
/* สถานะของระดับ: มีกี่บท กี่คำ เทียบเป้าหมาย HSK ทำไปกี่รอบ */
function lvInfo(n){const L=levelBy(n),us=lvUnits(n),w=lvWords(n),dn=us.filter(u=>unitDone(u.id)).length;
 return {L,lessons:lvLessons(n).length,words:w,target:L.target,units:us.length,done:dn,pct:us.length?dn/us.length:0,complete:w>=L.target,empty:!us.length}}
const nextUnit=(n=curLv())=>lvUnits(n).find(u=>!unitDone(u.id))||null;
const nextLesson=()=>{const u=nextUnit();return u?lessonBy(u.lesson):null};
const unitOpen=id=>{const u=unitBy(id),us=lvUnits(u.lv),k=us.findIndex(x=>x.id===id);return k<=0||unitDone(us[k-1].id)};
const doneUnitCount=()=>S.parts.length;
/* คำที่ถือว่า “รู้แล้ว” = คำจากรอบที่เรียนจบ + คำจากระดับต่ำกว่าที่ผู้เรียนบอกว่ารู้แล้ว (S.assume) */
const uniqW=ws=>{const m=new Set();return ws.filter(w=>!m.has(w.zh)&&m.add(w.zh))};
const gameWords=()=>uniqW([...UNITS.filter(u=>unitDone(u.id)||u.lv<=S.assume).flatMap(u=>u.words)]);
const gw4=()=>{const g=gameWords();return g.length>=4?g:uniqW([...g,...(lvLessons(curLv())[0]||LESSONS[0]).words])};
const learnedCount=()=>gameWords().length;
const lvBadge=()=>`<span class="chip lvchip press" data-go="levels" aria-label="ระดับของฉัน">${levelBy(curLv()).name}</span>`;
function addMistake(w){if(!w)return;S.mistakes[w.zh]=(S.mistakes[w.zh]||0)+1;save()}
function fixMistake(w){if(w&&S.mistakes[w.zh]){S.mistakes[w.zh]--;if(S.mistakes[w.zh]<=0)delete S.mistakes[w.zh];save()}}
const mistakeWords=()=>Object.keys(S.mistakes).map(wordBy).filter(Boolean);
const cmUnlocked=c=>c.by==='duel'?S.duelWins>0:isDone(+c.by.split(':')[1]);

/* ข้อมูลจำลอง */
const FRIENDS=[{n:'พี่ต้น',c:'#C9774A',s:12},{n:'น้องมะลิ',c:'#5E9B7A',s:5},{n:'แพรว',c:'#5B86C4',s:21},{n:'โอ๊ต',c:'#9568B5',s:3},{n:'ฟ้า',c:'#D1647A',s:8}];
const GROUPS=[{n:'ห้องจีนมือใหม่ 🐑',cnt:12,c:'#C8102E'},{n:'ทีมติว HSK 1',cnt:8,c:'#27211E'}];
const LEAGUE=[['ฟ้าใส',212],['พี่ต้น',186],['แพรว',171],['โอ๊ต',150],['มะลิ',139],['เจ๋ง',121],['น้ำหวาน',108],['ภูมิ',96],['ปอนด์',88],['แพท',75],['ใบเตย',62],['กาย',51],['นุ่น',44],['เกม',30],['บีม',22]];
const SHOP=[
 {id:'flower',e:'🌸',n:'ดอกไม้ทัดหู',p:0,slot:'hat'},
 {id:'cap',e:'🎓',n:'หมวกบัณฑิต',p:60,slot:'hat'},
 {id:'crown',e:'👑',n:'มงกุฎทอง',p:200,slot:'hat'},
 {id:'bow',e:'🎀',n:'โบว์แดง',p:40,slot:'hat'},
 {id:'shades',e:'🕶️',n:'แว่นกันแดด',p:90,slot:'face'},
 {id:'glasses',e:'👓',n:'แว่นตากลม',p:70,slot:'face'}];
const ACC={hat:{left:'35%',top:'-1%',size:.2},face:{left:'39%',top:'17%',size:.17}};
