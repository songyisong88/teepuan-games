/* ข้อมูลบทเรียน + สถานะ (localStorage) — ตัวอย่างทดลอง */
const LESSONS=[
{id:1,th:'สวัสดี',zh:'你好',words:[
 {zh:'你好',py:'nǐ hǎo',th:'สวัสดี',ex:'老师，你好！',exPy:'Lǎo|shī, nǐ hǎo!',exTh:'สวัสดีค่ะคุณครู'},
 {zh:'您好',py:'nín hǎo',th:'สวัสดี (สุภาพ)',ex:'老师，您好！',exPy:'Lǎo|shī, nín hǎo!',exTh:'สวัสดีครับ/ค่ะ คุณครู (สุภาพ)'},
 {zh:'老师',py:'lǎo|shī',th:'ครู',ex:'我的老师很好。',exPy:'Wǒ de lǎo|shī hěn hǎo.',exTh:'ครูของฉันดีมาก'},
 {zh:'朋友',py:'péng|you',th:'เพื่อน',ex:'他是我的朋友。',exPy:'Tā shì wǒ de péng|you.',exTh:'เขาเป็นเพื่อนของฉัน'}]},
{id:2,th:'ขอบคุณ ขอโทษ',zh:'谢谢',words:[
 {zh:'谢谢',py:'xiè|xie',th:'ขอบคุณ',ex:'谢谢你的茶。',exPy:'Xiè|xie nǐ de chá.',exTh:'ขอบคุณสำหรับชานะ'},
 {zh:'不客气',py:'bú kè|qi',th:'ไม่ต้องเกรงใจ / ยินดี',ex:'不客气，请喝茶。',exPy:'Bú kè|qi, qǐng hē chá.',exTh:'ไม่ต้องเกรงใจ เชิญดื่มชา'},
 {zh:'对不起',py:'duì|bu|qǐ',th:'ขอโทษ',ex:'对不起，我不知道。',exPy:'Duì|bu|qǐ, wǒ bù zhī|dào.',exTh:'ขอโทษ ฉันไม่รู้'},
 {zh:'没关系',py:'méi guān|xi',th:'ไม่เป็นไร',ex:'没关系，明天再来。',exPy:'Méi guān|xi, míng|tiān zài lái.',exTh:'ไม่เป็นไร พรุ่งนี้มาใหม่'}]},
{id:3,th:'ลาก่อน เจอกัน',zh:'再见',words:[
 {zh:'再见',py:'zài|jiàn',th:'ลาก่อน',ex:'老师，再见！',exPy:'Lǎo|shī, zài|jiàn!',exTh:'ลาก่อนค่ะคุณครู'},
 {zh:'明天',py:'míng|tiān',th:'พรุ่งนี้',ex:'我明天来。',exPy:'Wǒ míng|tiān lái.',exTh:'พรุ่งนี้ฉันมา'},
 {zh:'明天见',py:'míng|tiān jiàn',th:'เจอกันพรุ่งนี้',ex:'再见，明天见！',exPy:'Zài|jiàn, míng|tiān jiàn!',exTh:'ลาก่อน เจอกันพรุ่งนี้!'},
 {zh:'晚上好',py:'wǎn|shang hǎo',th:'สวัสดีตอนเย็น/ค่ำ',ex:'老师，晚上好！',exPy:'Lǎo|shī, wǎn|shang hǎo!',exTh:'สวัสดีตอนเย็นค่ะคุณครู'}]},
{id:4,th:'แนะนำตัว',zh:'我叫',words:[
 {zh:'我',py:'wǒ',th:'ฉัน / ผม',ex:'我是学生。',exPy:'Wǒ shì xué|sheng.',exTh:'ฉันเป็นนักเรียน'},
 {zh:'叫',py:'jiào',th:'ชื่อ / เรียกว่า',ex:'我叫小明。',exPy:'Wǒ jiào Xiǎo Míng.',exTh:'ฉันชื่อเสี่ยวหมิง'},
 {zh:'什么',py:'shén|me',th:'อะไร',ex:'这是什么？',exPy:'Zhè shì shén|me?',exTh:'นี่คืออะไร'},
 {zh:'名字',py:'míng|zi',th:'ชื่อ',ex:'你叫什么名字？',exPy:'Nǐ jiào shén|me míng|zi?',exTh:'คุณชื่ออะไร'}]},
{id:5,th:'นับ 1–5',zh:'一二三',words:[
 {zh:'一',py:'yī',th:'หนึ่ง',ex:'一，二，三，开始！',exPy:'Yī, èr, sān, kāi|shǐ!',exTh:'หนึ่ง สอง สาม เริ่ม!'},
 {zh:'二',py:'èr',th:'สอง',ex:'今天二号。',exPy:'Jīn|tiān èr hào.',exTh:'วันนี้วันที่สอง'},
 {zh:'三',py:'sān',th:'สาม',ex:'我有三个朋友。',exPy:'Wǒ yǒu sān ge péng|you.',exTh:'ฉันมีเพื่อนสามคน'},
 {zh:'五',py:'wǔ',th:'ห้า',ex:'五点见。',exPy:'Wǔ diǎn jiàn.',exTh:'เจอกันห้าโมง'}]}
];
LESSONS.forEach(l=>l.words.forEach(w=>w.lesson=l.id));
const ALLW=LESSONS.flatMap(l=>l.words);
const wordBy=zh=>ALLW.find(w=>w.zh===zh);

/* วรรณยุกต์ → สี */
const TONES={'ā':1,'ē':1,'ī':1,'ō':1,'ū':1,'ǖ':1,'á':2,'é':2,'í':2,'ó':2,'ú':2,'ǘ':2,'ǎ':3,'ě':3,'ǐ':3,'ǒ':3,'ǔ':3,'ǚ':3,'à':4,'è':4,'ì':4,'ò':4,'ù':4,'ǜ':4};
function toneOf(s){for(const c of s.toLowerCase())if(TONES[c])return TONES[c];return 5}
function pyHtml(str){let o='',m,re=/([^| ]+)([| ]?)/g;while((m=re.exec(str))){const s=m[1];o+=`<span class="t${toneOf(s)}">${s}</span>`+(m[2]===' '?' ':'')}return o}
function pyPlain(str){return str.replace(/\|/g,'')}
function zhHtml(zh,py){const sy=py.split(/[| ]/).filter(Boolean);let i=0,o='';for(const c of zh){if(/[，。！？、]/.test(c)){o+=c;continue}const s=sy[i++]||'';o+=`<span class="t${toneOf(s)}">${c}</span>`}return o}

/* สถานะ */
const KEY='lama-cn-web-demo-v1';
const defState=()=>({name:'มินท์',xp:0,coins:20,streak:0,lastDay:-99,xpDay:{},shift:0,goal:20,done:[],stars:{},mistakes:{},coinsEarned:0,
 chestDay:-99,spinDay:-99,own:['flower'],eq:{hat:null,face:null},invited:0,inviteCode:'LAMA-'+Math.random().toString(36).slice(2,6).toUpperCase(),
 remind:true,plan:'free',seenWelcome:false,gameBest:{catch:0,speed:0,mem:0},duelWins:0,from:'',lostShown:-99,boss:{hp:260,max:260,day:-99},bossWins:0});
let S;
try{S=Object.assign(defState(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){S=defState()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5)+S.shift;
const dayXp=(d=today())=>S.xpDay[d]||0;
const curStreak=()=>S.lastDay>=today()-1?S.streak:0;
const weekXp=()=>{let t=today(),s=0;for(let i=0;i<7;i++)s+=dayXp(t-i);return s};
const level=()=>Math.floor(S.xp/100)+1;
function touchStreak(){const t=today();if(S.lastDay===t)return false;S.streak=S.lastDay===t-1?S.streak+1:1;S.lastDay=t;return true}
const isDone=id=>S.done.includes(id);
const gameWords=()=>LESSONS.filter(l=>isDone(l.id)).flatMap(l=>l.words);
const nextLesson=()=>LESSONS.find(l=>!isDone(l.id))||null;
function addMistake(w){S.mistakes[w.zh]=(S.mistakes[w.zh]||0)+1;save()}
function fixMistake(w){if(S.mistakes[w.zh]){S.mistakes[w.zh]--;if(S.mistakes[w.zh]<=0)delete S.mistakes[w.zh];save()}}
const mistakeWords=()=>Object.keys(S.mistakes).map(wordBy).filter(Boolean);

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
