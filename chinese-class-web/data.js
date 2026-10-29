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
const dn=()=>{const n=(typeof S!=='undefined'&&S&&S.name||'').trim();return n&&n!=='มินท์'?n:''};/* ชื่อผู้เรียน: ว่างได้ (ค่าเดิม 'มินท์' ถือว่ายังไม่ได้ตั้ง) */
const defState=()=>({stk:{rec:[],fav:[],done:{},mode:'guide',days:0,last:-99,n:0},name:'',xp:0,coins:20,streak:0,lastDay:-99,xpDay:{},shift:0,goal:20,parts:[],stars:{},mistakes:{},srs:{},coinsEarned:0,
 chestDay:-99,spinDay:-99,own:['flower'],eq:{hat:null,face:null},invited:0,inviteCode:'LAMA-'+Math.random().toString(36).slice(2,6).toUpperCase(),
 remind:true,remindAt:'เย็น',plan:'free',seenWelcome:false,seenOnboard:false,interest:'',placed:0,level:1,assume:0,lvPicked:false,placeRes:null,placeHist:[],gameBest:{catch:0,speed:0,mem:0},duelWins:0,from:'',lostShown:-99,boss:{hp:260,max:260,day:-99},bossWins:0,
 freezes:1,buddy:null,cnt:{day:-99},mis:{day:-99,got:[]},evDay:-99,evId:'',evGot:-99,comebackDay:-99,freezeUsed:-99,inviteGot:[],
 seenCm:[],tutorN:0,studyN:0,qOk:0,qAll:0,words:{},recapDay:-99,gqDay:-99,tipSeen:{},lg:{tier:0,wk:-1},life:{},badges:{},bestStreak:0,dv:3,dvNote:0});
let S;
let _raw={};try{_raw=JSON.parse(localStorage.getItem(KEY)||'{}')||{};S=Object.assign(defState(),_raw)}catch(e){S=defState()}
/* ย้ายข้อมูลเมื่อจัดระดับบทเรียนใหม่ตาม HSK 2.0 (dv=2): id บท/รอบเดิมไม่เปลี่ยน ความคืบหน้าอยู่ครบ — แค่แจ้งผู้เรียนเดิมครั้งเดียว และถือผลทดสอบเก่าว่าเก่าแล้ว */
if((_raw.dv||0)<2){S.dvNote=Object.keys(_raw).length&&(_raw.parts||[]).length?1:0;S.dv=2;if(S.placeRes&&typeof S.placeRes==='object')S.placeRes.stale=1;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5)+S.shift;
const dayXp=(d=today())=>S.xpDay[d]||0;
const curStreak=()=>S.lastDay>=today()-1?S.streak:0;
const weekXp=()=>{let t=today(),s=0;for(let i=0;i<7;i++)s+=dayXp(t-i);return s};
const level=()=>Math.floor(S.xp/100)+1;
function touchStreak(){const t=today();if(S.lastDay===t)return false;S.streak=S.lastDay===t-1?S.streak+1:1;S.lastDay=t;S.bestStreak=Math.max(S.bestStreak||0,S.streak);return true}
/* หน่วยเรียน: 1 บท = 2 รอบ (a = คำ 1–8, b = คำ 9–16 + บทสนทนา) · ลำดับเรียนนับแยกตามระดับ HSK */
/* ระดับ 1 โครงใหม่ (L.v3): 1 บท = 1 รอบ (id+'a') · บทเสียง/ด่านทบทวนไม่มีคำใหม่ */
const UNITS=LESSONS.flatMap(L=>L.v3?[{id:L.id+'a',lesson:L.id,lv:L.lv,part:0,words:L.words,v3:1,kind:L.kind}]:[{id:L.id+'a',lesson:L.id,lv:L.lv,part:0,words:L.words.slice(0,8)},{id:L.id+'b',lesson:L.id,lv:L.lv,part:1,words:L.words.slice(8)}]);
/* ป้ายบท: ระดับ 1 ใหม่ใช้รหัสตอน-บท (เช่น 1-3) · ระดับอื่นใช้เลขบทเดิม */
const lno=L=>L?(L.code?L.code:L.chapter===1200?'ส'+(L.id-1200):L.id):'';
const lnoTxt=L=>L&&L.code?(L.kind==='gate'?'ด่านทบทวน ตอน '+L.code.split('-')[0]:'บท '+L.code):L&&L.chapter===1200?'บทเสริม '+(L.id-1200):'บทที่ '+(L?L.id:'');
const uTxt=u=>{const L=lessonBy(u.lesson);return L&&L.v3?lnoTxt(L):`บทที่ ${u.lesson} · รอบ ${u.part+1}/2`};
const unitBy=id=>UNITS.find(u=>u.id===id);
const lessonBy=id=>LESSONS.find(l=>l.id===id);
const unitDone=id=>S.parts.includes(id);
const isDone=lid=>{const L=lessonBy(lid);return unitDone(lid+'a')&&(L&&L.v3?true:unitDone(lid+'b'))};
const curLv=()=>LEVELS.some(l=>l.id===S.level)?S.level:1;
const lvUnits=n=>UNITS.filter(u=>u.lv===n);
const lvLessons=n=>LESSONS.filter(l=>l.lv===n);
/* บทของระดับเดียวกันที่อยู่ก่อนหรือเท่ากับบทนี้ ตามลำดับในระดับ (ไม่ใช่ตามเลข id — บทถูกจัดระดับใหม่แล้ว) */
const lvUpTo=id=>{const l=LESSONS.find(x=>x.id===id),a=lvLessons(l?l.lv:1),k=a.findIndex(x=>x.id===id);return a.slice(0,k+1)};
const lvWords=n=>lvLessons(n).reduce((a,l)=>a+l.words.length,0);
/* สถานะของระดับ: มีกี่บท กี่คำ เทียบเป้าหมาย HSK ทำไปกี่รอบ */
function lvInfo(n){const L=levelBy(n),us=lvUnits(n),w=lvWords(n),dn=us.filter(u=>unitDone(u.id)).length;
 return {L,lessons:lvLessons(n).length,words:w,target:L.target,units:us.length,done:dn,pct:us.length?dn/us.length:0,complete:w>=L.target,empty:!us.length}}
const nextUnit=(n=curLv())=>lvUnits(n).find(u=>!unitDone(u.id))||null;
const nextLesson=()=>{const u=nextUnit();return u?lessonBy(u.lesson):null};
const unitOpen=id=>{const u=unitBy(id),us=lvUnits(u.lv),k=us.findIndex(x=>x.id===id);return k<=0||unitDone(us[k-1].id)||us.slice(k).some(x=>unitDone(x.id))};
const doneUnitCount=()=>S.parts.length;
/* คำที่ถือว่า “รู้แล้ว” = คำจากรอบที่เรียนจบ + คำจากระดับต่ำกว่าที่ผู้เรียนบอกว่ารู้แล้ว (S.assume) */
const uniqW=ws=>{const m=new Set();return ws.filter(w=>!m.has(w.zh)&&m.add(w.zh))};
const gameWords=()=>uniqW([...UNITS.filter(u=>unitDone(u.id)||u.lv<=S.assume).flatMap(u=>u.words)]);
/* ===== ระดับที่เลือก/ผลทดสอบ ขับเคลื่อนทุกหน้า =====
   lvDriven = ผู้ใช้เลือกระดับเองหรือรับผลทดสอบ (ระดับ>1 หรือบอกว่ารู้ระดับก่อนหน้า) แม้ยังไม่เรียนบทไหนจบ
   lvWindow = บทของระดับปัจจุบันตั้งแต่ต้นจนถึงบทถัดไปที่ยังไม่จบ +2 บท (คำที่ "พอดีระดับ" ตอนนี้)
   gw4()    = คลังคำสำหรับเกม/ทบทวน/ติวเตอร์/ท้าเพื่อน: คำในหน้าต่างระดับ + คำที่เรียนจบ + คำระดับ n-1 ที่ถือว่ารู้ (สุ่มคงที่รายวัน ไม่เกินจำนวนคำระดับ n) */
const lvDriven=()=>!!(S.lvPicked||S.placed)&&(curLv()>1||(S.assume||0)>0);
const lvWindow=()=>{const n=curLv(),ls=lvLessons(n);if(!ls.length)return [];const nu=nextUnit(n);const k=nu?Math.max(0,ls.findIndex(l=>l.id===nu.lesson)):ls.length;return ls.slice(0,Math.min(ls.length,k+3))};
const lvAllWords=(n=curLv())=>uniqW(lvLessons(n).flatMap(l=>l.words));
const seedHash=s=>{let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return h};
const seedPick=(arr,n,salt)=>arr.map(w=>[seedHash(w.zh+'|'+(salt||today())),w]).sort((a,b)=>a[0]-b[0]).slice(0,n).map(x=>x[1]);
const doneWords=()=>uniqW(UNITS.filter(u=>unitDone(u.id)).flatMap(u=>u.words));
function lvPoolW(){const n=curLv(),win=uniqW(lvWindow().flatMap(l=>l.words)),done=doneWords(),near=gameWords().filter(w=>w.lv>=n-1&&!win.some(x=>x.zh===w.zh));
 return uniqW([...win,...done,...seedPick(near,Math.max(8,win.length))])}
const gw4=()=>{const g=gameWords();if(lvDriven()){const p=lvPoolW();if(p.length>=4)return p}return g.length>=4?g:uniqW([...g,...lvLessons(curLv()).flatMap(l=>l.words).slice(0,10)])};
const gamesOpen=()=>gameWords().length>=4||(lvDriven()&&gw4().length>=4);
/* บทที่ใช้กับติวเตอร์/ฉากสนทนา/ประโยคตัวอย่าง: บทที่จบแล้ว + บทในหน้าต่างระดับ */
const lvLessonPool=()=>{const done=LESSONS.filter(l=>isDone(l.id));if(!lvDriven())return done.length?done:[LESSONS.find(l=>l.sents&&l.sents.length&&l.dlg&&l.dlg.length)];const n=curLv();const m=new Map();[...lvWindow(),...done.filter(l=>l.lv>=n-1)].forEach(l=>m.set(l.id,l));return [...m.values()]};
const learnedCount=()=>gameWords().length;
const lvBadge=()=>`<span class="chip lvchip press" data-go="levels" aria-label="ระดับของฉัน">ระดับ ${curLv()}</span>`;
function addMistake(w){if(!w)return;S.mistakes[w.zh]=(S.mistakes[w.zh]||0)+1;srsGrade(w,false,1);save()}
function fixMistake(w){if(w&&S.mistakes[w.zh]){S.mistakes[w.zh]--;if(S.mistakes[w.zh]<=0)delete S.mistakes[w.zh];save()}}
const mistakeWords=()=>Object.keys(S.mistakes).map(wordBy).filter(Boolean);
/* ทบทวนแบบเว้นช่วง (Leitner 5 กล่อง): ตอบถูก → กล่องสูงขึ้น ทบทวนห่างขึ้น 1→2→4→8→16 วัน · ตอบผิด → กลับกล่อง 0 ทบทวนวันนี้ */
const SRS_INT=[0,1,2,4,8,16];
function srsGrade(w,ok,quiet){if(!w||!w.zh)return;if(!S.srs)S.srs={};const r=S.srs[w.zh]||{b:0,d:0};if(ok&&r.b>0&&r.d>today())return;r.b=ok?Math.min(5,r.b+1):0;r.d=today()+SRS_INT[r.b];S.srs[w.zh]=r;if(!quiet)save()}
const srsDue=()=>Object.keys(S.srs||{}).filter(z=>S.srs[z].d<=today()).map(wordBy).filter(Boolean);
const reviewReal=()=>uniqW([...mistakeWords(),...srsDue()]);
/* ผู้ใช้ที่เลือกระดับแล้วแต่ยังไม่มีคำค้าง: เติมคำแนะนำของระดับ (สุ่มคงที่รายวัน) ให้ทบทวนได้ทันที */
const reviewSeed=()=>{if(!lvDriven())return [];const r=reviewReal();if(r.length>=6)return [];const have=new Set(r.map(w=>w.zh));const n=curLv();const pool=gw4().filter(w=>!have.has(w.zh)&&w.lv>=n);return seedPick(pool.length>=6-r.length?pool:gw4().filter(w=>!have.has(w.zh)),6-r.length,'rv'+today())};
const reviewWords=()=>uniqW([...reviewReal(),...reviewSeed()]);
const srsBox=w=>(S.srs&&S.srs[w.zh]?S.srs[w.zh].b:0);
const cmUnlocked=c=>c.by==='duel'?S.duelWins>0:(isDone(+c.by.split(':')[1])||!!(c.old&&unitDone(c.old+'a')&&unitDone(c.old+'b')));
/* ย้ายความคืบหน้าระดับ 1 เดิม → ระดับ 1 ใหม่ (dv=3): รอบเดิมยังอยู่ใน S.parts ไม่หาย · XP/เหรียญไม่ถูกแตะ
   บทใหม่ที่คำทุกคำเคยเรียนจบในรอบเดิมแล้ว ถือว่าจบ (2 ดาว) · เคยเรียนระดับ 1 = ผ่านตอนเสียงแล้ว · บทครบทั้งตอน = ผ่านด่านทบทวน
   ทำทุกครั้งที่เปิด (เผื่อความคืบหน้าเดิมเพิ่งซิงก์มาจากอุปกรณ์อื่น) */
function migrateL1(){if(typeof OLD_L1==='undefined')return 0;const ow=new Set();Object.keys(OLD_L1).forEach(u=>{if(S.parts.includes(u))OLD_L1[u].forEach(z=>ow.add(z))});if(!ow.size)return 0;
 const add=[],has=z=>ow.has(z);
 UNITS.forEach(u=>{const L=lessonBy(u.lesson);if(unitDone(u.id))return;
  if(u.v3&&u.kind==='snd')add.push(u.id);else if(u.v3&&u.kind==='lex'&&u.words.every(w=>has(w.zh)))add.push(u.id);else if(L.chapter===1200&&u.words.length&&u.words.every(w=>has(w.zh)))add.push(u.id)});
 add.forEach(id=>{S.parts.push(id);S.stars[id]=S.stars[id]||2});
 const g=[];LESSONS.filter(l=>l.v3&&l.kind==='gate'&&!unitDone(l.id+'a')).forEach(l=>{if(LESSONS.filter(x=>x.chapter===l.chapter&&x.kind==='lex').every(x=>unitDone(x.id+'a')))g.push(l.id+'a')});
 g.forEach(id=>{S.parts.push(id);S.stars[id]=S.stars[id]||2});return add.length+g.length}
{const n=migrateL1();if((_raw.dv||0)<3){if(n||(_raw.parts||[]).length)S.dvNote=3;S.dv=3}if(n||(_raw.dv||0)<3)save()}

/* ข้อมูลจำลอง */
const FRIENDS=[{n:'พี่ต้น',c:'#A25F3A',s:12},{n:'น้องมะลิ',c:'#4B7D61',s:5},{n:'แพรว',c:'#4C72A7',s:21},{n:'โอ๊ต',c:'#8D62AB',s:3},{n:'ฟ้า',c:'#B25567',s:8}];
const GROUPS=[{n:'ห้องจีนมือใหม่ 🐑',cnt:12,c:'#C8102E'},{n:'ทีมติวระดับ 1',cnt:8,c:'#27211E'}];
const LEAGUE=[['ฟ้าใส',212],['พี่ต้น',186],['แพรว',171],['โอ๊ต',150],['มะลิ',139],['เจ๋ง',121],['น้ำหวาน',108],['ภูมิ',96],['ปอนด์',88],['แพท',75],['ใบเตย',62],['กาย',51],['นุ่น',44],['เกม',30],['บีม',22]];
const SHOP=[
 {id:'flower',e:'🌸',n:'ดอกไม้ทัดหู',p:0,slot:'hat'},
 {id:'cap',e:'🎓',n:'หมวกบัณฑิต',p:60,slot:'hat'},
 {id:'crown',e:'👑',n:'มงกุฎทอง',p:200,slot:'hat'},
 {id:'bow',e:'🎀',n:'โบว์แดง',p:40,slot:'hat'},
 {id:'shades',e:'🕶️',n:'แว่นกันแดด',p:90,slot:'face'},
 {id:'glasses',e:'👓',n:'แว่นตากลม',p:70,slot:'face'}];
const ACC={hat:{left:'35%',top:'-1%',size:.2},face:{left:'39%',top:'17%',size:.17}};
