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
 seenCm:[],tutorN:0,studyN:0,qOk:0,qAll:0,words:{},recapDay:-99,gqDay:-99,tipSeen:{},lg:{tier:0,wk:-1},life:{},badges:{},bestStreak:0,dv:4,dvNote:0,kw:[]});
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
const lnoTxt=L=>L&&L.code?(L.kind==='gate'?'ตอน '+L.code.split('-')[0]:'บท '+L.code):L&&L.chapter===1200?'บทเสริม '+(L.id-1200):'บทที่ '+(L?L.id:'');
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
const kwWords=()=>(S.kw||[]).map(wordBy).filter(Boolean);
const gameWords=()=>uniqW([...UNITS.filter(u=>unitDone(u.id)||u.lv<=S.assume).flatMap(u=>u.words),...kwWords()]);
/* ===== ระดับที่เลือก/ผลทดสอบ ขับเคลื่อนทุกหน้า =====
   หลักลำดับการสอน: สอนคำก่อน → ฝึกด้วยคำที่สอนแล้วเท่านั้น → ทบทวนเฉพาะคำของบทที่ผ่านมาแล้ว (บทก่อนหน้าได้ บทอนาคตไม่ได้)
   lvDriven = ผู้ใช้เลือกระดับเองหรือรับผลทดสอบ (ระดับ>1 หรือบอกว่ารู้ระดับก่อนหน้า) แม้ยังไม่เรียนบทไหนจบ
   lvSoFar  = บทของระดับปัจจุบันตั้งแต่บทแรกจนถึง "บทที่กำลังเรียน" (บทถัดไปที่ยังไม่จบ) — ไม่มีบทอนาคต
   lvWindow = เท่ากับ lvSoFar (เดิมเผื่อไปข้างหน้า +2 บท ทำให้เกม/ทบทวนดึงคำบทอนาคต — แก้แล้ว)
   gw4()    = คลังคำสำหรับเกม/ทบทวน/ติวเตอร์/ท้าเพื่อน: คำที่เรียนจบ + คำระดับ n-1 ที่ถือว่ารู้ (สุ่มคงที่รายวัน)
              ผู้เรียนใหม่ที่ยังไม่มีคำ: ใช้คำของบทแรก ๆ จนถึงบทที่กำลังเรียน (lvFallback) */
const lvDriven=()=>!!(S.lvPicked||S.placed)&&(curLv()>1||(S.assume||0)>0);
const lvCurIdx=(n=curLv())=>{const ls=lvLessons(n),nu=nextUnit(n);return nu?Math.max(0,ls.findIndex(l=>l.id===nu.lesson)):ls.length-1};
const lvSoFar=(n=curLv())=>lvLessons(n).slice(0,lvCurIdx(n)+1);
const lvWindow=()=>lvSoFar();
const lvAllWords=(n=curLv())=>uniqW(lvLessons(n).flatMap(l=>l.words));
/* คำเริ่มต้นของระดับ: คำของบทแรก ๆ ตามลำดับ จนได้อย่างน้อย min คำ */
const lvStarter=(n=curLv(),min=4)=>{const out=[];for(const l of lvLessons(n)){if(uniqW(out).length>=min)break;out.push(...l.words)}return uniqW(out)};
/* คลังสำรองเมื่อคำที่เรียนแล้วยังไม่พอ: คำที่เรียนแล้ว → คำของบทจนถึงบทที่กำลังเรียน → คำของบทแรก ๆ (ไม่กระโดดไปบทอนาคตไกล ๆ หรือระดับอื่น) */
const lvFallback=(min=4)=>{const g=gameWords();if(g.length>=min)return g;const s=uniqW([...g,...lvSoFar().flatMap(l=>l.words)]);return s.length>=min?s:uniqW([...s,...lvStarter(curLv(),min)])};
const seedHash=s=>{let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return h};
const seedPick=(arr,n,salt)=>arr.map(w=>[seedHash(w.zh+'|'+(salt||today())),w]).sort((a,b)=>a[0]-b[0]).slice(0,n).map(x=>x[1]);
const doneWords=()=>uniqW([...UNITS.filter(u=>unitDone(u.id)).flatMap(u=>u.words),...kwWords()]);
/* คำพอดีระดับ: คำที่เรียนจบในระดับนี้ก่อน + คำที่เรียนจบอื่น ๆ + คำระดับ n-1 ที่ถือว่ารู้ (สุ่มคงที่รายวัน) — ไม่มีคำบทที่ยังไม่เรียน */
function lvPoolW(){const n=curLv(),done=doneWords(),cur=done.filter(w=>w.lv===n),near=gameWords().filter(w=>w.lv>=n-1&&w.lv<n&&!done.some(x=>x.zh===w.zh));
 return uniqW([...cur,...done,...seedPick(near,Math.max(8,cur.length))])}
const gw4=()=>{const g=gameWords();if(g.length<4)return lvFallback(4);if(lvDriven()){const p=lvPoolW();if(p.length>=4)return p}return g};
const gamesOpen=()=>gameWords().length>=4||(lvDriven()&&gw4().length>=4);
/* บทที่ใช้กับติวเตอร์/ฉากสนทนา/ประโยคตัวอย่าง: บทที่จบแล้ว (+ บทระดับก่อนหน้าที่บอกว่ารู้แล้ว) · ยังไม่มี = บทจนถึงบทที่กำลังเรียน */
const lvLessonPool=()=>{const done=LESSONS.filter(l=>isDone(l.id));const n=curLv();const has=l=>l.sents&&l.sents.length&&l.dlg&&l.dlg.length;
 if(!lvDriven()){if(done.length)return done;const s=lvSoFar(n).filter(has);return s.length?s:[LESSONS.find(has)]}
 const m=new Map();[...done.filter(l=>l.lv>=n-1),...LESSONS.filter(l=>l.lv<n&&l.lv>=n-1&&l.lv<=(S.assume||0))].forEach(l=>m.set(l.id,l));
 if(!m.size)lvSoFar(n).forEach(l=>m.set(l.id,l));return [...m.values()]};
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
const OLD_V4={"1014a":["人","学生","同学","朋友","医生"],"1016a":["很","高兴","认识","中国","北京"],"1023a":["几","个","岁","多少"],"1034a":["那","的","谁","东西","本"],"1042a":["水果","苹果","喜欢","想","爱"],"1053a":["在","哪","里","住"],"1055a":["买","钱","块","衣服","先生","小姐"],"1056a":["大","小","太","了","漂亮","些"],"1063a":["点","分钟","上午","中午","下午"],"1073a":["工作","睡觉","电影","打电话","喂"],"1074a":["学习","看见","呢"],"20101a":["请问","不好意思","麻烦你","可以","对","知道"],"20102a":["介绍","姓","大家","男人","女人"],"20103a":["妻子","丈夫","第一","号","去年"],"20104a":["百","千","打篮球","次","课"],"20105a":["进","身体","欢迎","服务员","左边"],"20106a":["右边","希望","阴","懂","船"],"20201a":["早上好","晚上好","晚安","明天见","一会儿见","早上"],"20202a":["晚上","起床","也","吧","一点儿"],"20203a":["好吃","贵","便宜","饭店","哪儿","雨"],"20204a":["半","泰国","今年","休息","错","可能"],"20303a":["快乐","一起","长","教室","报纸"],"20402a":["走","到","离","远","近","骑"],"20403a":["自行车","机场","旅游","快","最","高"],"20601a":["觉得","运动","跑步","游泳","唱歌","音乐"],"20602a":["跳舞","篮球","踢","玩","游戏","手机"],"20603a":["小时","时间","照片","每天","经常","已经"],"20604a":["然后","开始","早饭","午饭","晚饭","出"],"20605a":["洗","上班","下班","周末","药","要"],"20606a":["比","非常","慢","还","旁边","公司"],"20607a":["帮助","准备","忙","雪","外"],"20608a":["每","得","房间","门","笑"],"20701a":["颜色","红","白","黑","真","蓝"],"20702a":["两","鞋","送","您","穿"],"20704a":["给","考试","晴","张","手表"],"20801a":["因为","所以","就","让","别","告诉"],"20802a":["回答","意思","事情","它","着","正在"],"20803a":["为","向","从","题","眼睛"],"20804a":["生病","累","问题","但是","问"],"30103a":["着急","见面","把","被","跟","经过"],"30402a":["容易","难","聪明","努力","裤子","帽子","包"],"30502a":["不用","一共","打包","买单"],"30601a":["对面","外面","附近","往","中间","一直"],"30602a":["东","迷路","公园","银行","超市","地图"],"30802a":["久","梦","变成","认为","难忘","当时"],"30902a":["太阳","星星","低","花","树","草","极"],"30905a":["越","刻","分","鸟","爬山","练习","舒服"],"31102a":["字典","年级","校长","图书馆","放学","护士","牙"],"31202a":["冰箱","离开","打扫","整理","乱","安静","方便"],"31301a":["南","西","黄","绿","旧","老","口"],"31401a":["表示","别人","词语","了解","其他","水平"],"40301a":["亚洲","美国","国际","法国","德国","外国"],"40401a":["床","台灯","笔","本子","闹钟","躺","醒"],"41201a":["汽车","方向","加油站","停车场","高速公路","距离","刹车","方向盘"],"41401a":["自然","植物","森林","河流","海洋","山","长江","阳光"],"41402a":["温暖","狮子","彩虹","湿润","野生","风","美丽","民族"],"41505a":["等","交流","规定","性别","抱","行"],"41801a":["按照","包括","本来","到底","可是"],"50101a":["相机","短信","电话","充电","耳机","键盘","鼠标"],"50202a":["跑","跳","摔","追","躲","抓"],"50301a":["书店","钢笔","纸","剪刀","胶水","信封"],"50401a":["菜市场","土豆","橙子","斤","熟","黄瓜"],"50701a":["行李","酒店","预订","取消","到达","景点"],"52601a":["海边","沙滩","海","浪","贝壳","太阳镜","游泳衣","螃蟹"]},OLD_V4L2=["20101a","20102a","20103a","20104a","20105a","20106a","20199a","20201a","20202a","20203a","20204a","20299a","20301a","20302a","20303a","20399a","20401a","20402a","20403a","20499a","20501a","20502a","20503a","20599a","20601a","20602a","20603a","20604a","20605a","20606a","20607a","20608a","20699a","20701a","20702a","20703a","20704a","20799a","20801a","20802a","20803a","20804a","20899a"];
/* ย้ายความคืบหน้าเมื่อปรับลำดับคำ (dv=4): คำพื้นฐานบางคำย้ายเข้าระดับ 1 และบทระดับ 2 จัดกลุ่มใหม่ (id บทระดับ 2 เลื่อนตามตำแหน่ง)
   OLD_V4 = คำเดิมของรอบที่เนื้อหาเปลี่ยน · OLD_V4L2 = id รอบระดับ 2 เดิมทั้งหมด
   หลัก: ไม่ลบอะไรจาก parts/stars/srs · บทใหม่ที่คำทุกคำเคยเรียนแล้ว = จบ · จำนวนรอบระดับ 2 ที่จบต้องไม่น้อยกว่าเดิม (เติมตามลำดับ)
   ด่านทบทวนที่บททั้งตอนจบแล้ว = จบ · คำใหม่ในบทที่นับว่าจบ → เข้ารอบทบทวนวันนี้ · คำที่เคยเรียนแต่ย้ายไปบทที่ยังไม่จบ → เก็บใน kw (ยังอยู่ในคลังคำ)
   รับออบเจกต์สถานะ (ใช้กับสถานะจากคลาวด์ที่ยังไม่ย้ายได้ด้วย) */
function migrate4(st){st.parts=st.parts||[];st.stars=st.stars||{};st.srs=st.srs||{};
 const P=new Set(st.parts),ow=new Set(st.kw||[]),done=id=>st.parts.includes(id),wz=id=>OLD_V4[id]||(unitBy(id)?unitBy(id).words.map(w=>w.zh):[]);
 P.forEach(id=>wz(id).forEach(z=>ow.add(z)));
 if(!ow.size&&!P.size)return 0;
 const st0=z=>{let m=0;P.forEach(id=>{if(wz(id).includes(z))m=Math.max(m,st.stars[id]||0)});return m};
 const add=[],mark=u=>{st.parts.push(u.id);add.push(u.id);let s=0;u.words.forEach(w=>s=Math.max(s,st0(w.zh)));st.stars[u.id]=Math.max(st.stars[u.id]||0,s||2)};
 UNITS.forEach(u=>{if(!done(u.id)&&u.kind==='lex'&&u.words.length&&u.words.every(w=>ow.has(w.zh)))mark(u)});
 const gates=()=>LESSONS.filter(l=>l.v3&&l.kind==='gate'&&!done(l.id+'a')).forEach(l=>{if(LESSONS.filter(x=>x.chapter===l.chapter&&x.kind==='lex').every(x=>done(x.id+'a')))mark(unitBy(l.id+'a'))});
 gates();
 const was=OLD_V4L2.filter(id=>P.has(id)).length,us=lvUnits(2);let k=us.filter(u=>done(u.id)).length;
 for(const u of us){if(k>=was)break;if(!done(u.id)){mark(u);k++}}
 gates();
 const t=today(),have=new Set();
 UNITS.filter(u=>done(u.id)).forEach(u=>u.words.forEach(w=>{have.add(w.zh);if(!ow.has(w.zh)&&!st.srs[w.zh])st.srs[w.zh]={b:0,d:t}}));
 st.kw=[...ow].filter(z=>!have.has(z)&&wordBy(z));
 st.dv=4;return add.length+1}
{const r=_raw.dv||0;if(r>=3&&r<4&&(_raw.parts||[]).length){migrate4(S);S.dvNote=4}if(S.dv<4){S.dv=4;save()}else if(r>=3&&r<4)save()}

/* ข้อมูลจำลอง */
const FRIENDS=[{n:'พี่ต้น',c:'#A25F3A',s:12},{n:'น้องมะลิ',c:'#4B7D61',s:5},{n:'แพรว',c:'#4C72A7',s:21},{n:'โอ๊ต',c:'#8D62AB',s:3},{n:'ฟ้า',c:'#B25567',s:8}];
const GROUPS=[{n:'ห้องจีนมือใหม่',cnt:12,c:'#C8102E'},{n:'ทีมติวระดับ 1',cnt:8,c:'#27211E'}];
const LEAGUE=[['ฟ้าใส',212],['พี่ต้น',186],['แพรว',171],['โอ๊ต',150],['มะลิ',139],['เจ๋ง',121],['น้ำหวาน',108],['ภูมิ',96],['ปอนด์',88],['แพท',75],['ใบเตย',62],['กาย',51],['นุ่น',44],['เกม',30],['บีม',22]];
const SHOP=[
 {id:'flower',e:'🌸',n:'ดอกไม้ทัดหู',p:0,slot:'hat'},
 {id:'cap',e:'🎓',n:'หมวกบัณฑิต',p:60,slot:'hat'},
 {id:'crown',e:'👑',n:'มงกุฎทอง',p:200,slot:'hat'},
 {id:'bow',e:'🎀',n:'โบว์แดง',p:40,slot:'hat'},
 {id:'shades',e:'🕶️',n:'แว่นกันแดด',p:90,slot:'face'},
 {id:'glasses',e:'👓',n:'แว่นตากลม',p:70,slot:'face'}];
const ACC={hat:{left:'35%',top:'-1%',size:.2},face:{left:'39%',top:'17%',size:.17}};
