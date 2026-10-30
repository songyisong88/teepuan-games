/* เมนูล่าง 6 ปุ่มแบบ G3 "สติกเกอร์" (ซ้งอี้อนุมัติ 31 ต.ค. 2026: "เมนู 6 ปุ่มเอา G3 สติกเกอร์")
   วันนี้ | บทเรียน | ห้องเกม | ฝึกฝน | คลังความรู้ | ฉัน  · การจัดกลุ่มตาม nav-redesign/round4/GROUPING.md
   • แท็บเดิม 'game' → 'arcade' (ลิงก์ ?go=games / game-<id> ยังใช้ได้) · ทุกฟีเจอร์มีบ้านเดียว
   • ป้ายบนปุ่มใช้ข้อมูลจริงเท่านั้น ถ้าเป็นศูนย์ไม่แสดง · prefers-reduced-motion: เปลี่ยนสถานะทันที ไม่มีแอนิเมชัน */
window.GOX=window.GOX||{};
(function(){
const N6_ORDER=['home','book','arcade','prac','know','me'];
const N6_LABEL={home:'วันนี้',book:'บทเรียน',arcade:'ห้องเกม',prac:'ฝึกฝน',know:'คลังความรู้',me:'ฉัน'};
const N6_COL={home:['#FF9500','#FFE0A8','#B35C00'],book:['#F0384F','#FFD0D7','#A3182B'],arcade:['#8C4BFF','#E2D2FF','#5321B5'],prac:['#14B26A','#C3F0D8','#0A7545'],know:['#2D8CFF','#CCE2FF','#1559B3'],me:['#FF5C9A','#FFD3E4','#B3285E']};
const N6_ROT={home:-7,book:5,arcade:-4,prac:7,know:-5,me:6};
const N6_ALIAS={game:'arcade',games:'arcade',today:'home',lessons:'book',path:'book',practice:'prac'};
const N6_SCR={home:'home',book:'path',know:'know',arcade:'arcade',prac:'prac',rank:'rank',me:'me'};
const TI={
 home:'<path class="r" d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8"/><circle class="a" cx="12" cy="12" r="5.6"/><circle class="w" cx="10.2" cy="10.2" r="1.6" opacity=".75"/>',
 book:'<ellipse class="b" cx="12" cy="20.6" rx="7.5" ry="1.9"/><path class="a" d="M12 2.4a6 6 0 0 1 6 6c0 4.3-6 10.2-6 10.2S6 12.7 6 8.4a6 6 0 0 1 6-6z"/><circle class="w" cx="12" cy="8.4" r="2.4"/>',
 arcade:'<path class="a" d="M7 7.2h10a5.2 5.2 0 0 1 5.1 6.3l-.9 4.1a2.7 2.7 0 0 1-4.6 1.3l-2-2.3H9.4l-2 2.3a2.7 2.7 0 0 1-4.6-1.3l-.9-4.1A5.2 5.2 0 0 1 7 7.2z"/><rect class="w" x="5.4" y="11.2" width="4.8" height="1.6" rx=".6"/><rect class="w" x="7" y="9.6" width="1.6" height="4.8" rx=".6"/><circle class="w" cx="16.2" cy="10.6" r="1.25"/><circle class="b" cx="18.4" cy="13" r="1.25"/><path class="b" d="M12 1.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
 prac:'<circle class="a" cx="11" cy="13" r="9"/><circle class="w" cx="11" cy="13" r="6.2"/><circle class="a" cx="11" cy="13" r="3.4"/><circle class="w" cx="11" cy="13" r="1.1"/><path class="k" style="stroke:var(--ie)" d="M11 13 20.2 3.8"/><path class="b" d="M18.4 2.2l1.8 1.6 1.6 1.8-2.6.5z"/>',
 know:'<rect class="a" x="3.4" y="6" width="4.6" height="14" rx="1.1"/><rect class="b" x="8.9" y="3.6" width="4.6" height="16.4" rx="1.1"/><path class="a" d="m14.3 6.6 3.9-1.1 3.6 13.9-3.9 1z" opacity=".8"/><path class="wl" d="M3.4 9h4.6M3.4 17h4.6M14.9 8.9l3.9-1"/><path class="k" style="stroke:var(--ie)" d="M2.4 20.6h19.2"/>',
 me:'<path class="a" d="M8.4 8 7.2 2.6l3.2 3.8zM15.6 8l1.2-5.4-3.2 3.8z"/><path class="a" d="M7.2 9c0-1.7 2.2-2.8 4.8-2.8s4.8 1.1 4.8 2.8v4.4c0 1.5-.6 2.4-1.4 3.1v4.8H8.6v-4.8c-.8-.7-1.4-1.6-1.4-3.1z"/><ellipse class="w" cx="12" cy="14.4" rx="2.9" ry="2.1"/><circle class="e" cx="9.9" cy="10.7" r="1"/><circle class="e" cx="14.1" cy="10.7" r="1"/><path class="k" style="stroke:var(--ie);stroke-width:1.3" d="M11.2 14h1.6M12 14v1"/>'};
const STAR=(c,s)=>`<svg width="${s}" height="${s}" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" fill="${c}"/></svg>`;
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const n6tab=t=>N6_ALIAS[t]||t;
window.n6tab=n6tab;

/* ---------- แถบเมนู ---------- */
function n6defs(){if(document.getElementById('n6defs'))return;const d=document.createElement('div');d.id='n6defs';d.setAttribute('aria-hidden','true');
 d.innerHTML='<svg width="0" height="0" style="position:absolute"><defs><filter id="n6stk" x="-30%" y="-30%" width="160%" height="160%"><feMorphology in="SourceAlpha" operator="dilate" radius="2.2" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="wh"/><feGaussianBlur in="d" stdDeviation="1.2" result="bl"/><feOffset in="bl" dy="1.6" result="of"/><feFlood flood-color="#3a2a20" flood-opacity=".28"/><feComposite in2="of" operator="in" result="sh"/><feMerge><feMergeNode in="sh"/><feMergeNode in="wh"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>';
 document.body.appendChild(d)}
function n6bar(){const tb=document.getElementById('tabbar');if(!tb)return;if(tb.dataset.n6)return;n6defs();tb.dataset.n6='1';tb.classList.add('n6bar');
 tb.innerHTML=N6_ORDER.map(k=>{const c=N6_COL[k];return `<button class="tab" data-act="tab" data-tab="${k}" aria-label="${N6_LABEL[k]}" style="--c:${c[0]};--c2:${c[1]};--cd:${c[2]};--rot:${N6_ROT[k]}deg"><i class="pap" aria-hidden="true"></i>${'<i class="zl" aria-hidden="true"></i>'.repeat(5)}<span class="stw"><svg class="ti" viewBox="0 0 24 24" aria-hidden="true">${TI[k]}</svg>${k==='arcade'?`<i class="ms" aria-hidden="true">${STAR('#FFC93D',13)}</i>`:''}</span><span class="lbl">${N6_LABEL[k]}</span><span class="n6b" hidden></span></button>`}).join('')}
const T=k=>document.querySelector(`#tabbar .tab[data-tab="${k}"]`);
function slap(k,prev){const tn=T(k),to=prev&&T(prev);if(!tn||RM()||!tn.animate)return;
 const ti=tn.querySelector('svg.ti'),E='cubic-bezier(.22,1,.36,1)';
 ti.animate([{transform:'translateY(-10px) scale(1.8) rotate(-20deg)',opacity:0},{opacity:.88,offset:.18},{transform:'scale(.88) rotate(4deg)',offset:.5},{transform:'scale(1.16) rotate(-2deg)',offset:.72},{transform:'scale(1.1)',opacity:1}],{duration:580,easing:'ease-out'});
 tn.querySelector('.pap').animate([{opacity:0,transform:'rotate(-5deg) scale(.3)'},{opacity:0,offset:.4},{opacity:1,transform:'rotate(-12deg) scale(1.1)',offset:.65},{opacity:1,transform:'rotate(-5deg)'}],{duration:580,easing:'ease-out'});
 const zl=[...tn.querySelectorAll('.zl')];zl.forEach((e,i)=>{const r=-180*(.15+.7*i/(zl.length-1))+90;
  e.animate([{opacity:0,transform:`rotate(${r}deg) translateY(-14px) scaleY(.4)`},{opacity:0,offset:.45},{opacity:1,transform:`rotate(${r}deg) translateY(-24px) scaleY(1)`,offset:.62},{opacity:0,transform:`rotate(${r}deg) translateY(-30px) scaleY(.5)`}],{duration:620,easing:'ease-out'})});
 const ms=tn.querySelector('.ms');if(ms)ms.animate([{transform:'rotate(-10deg) scale(0)'},{transform:'rotate(-10deg) scale(0)',offset:.45},{transform:'rotate(200deg) scale(1.5)',offset:.75},{transform:'rotate(350deg) scale(1)'}],{duration:900,easing:'ease-out'});
 if(to&&to!==tn){const oi=to.querySelector('svg.ti');oi.animate([{transform:'scale(1.1)',filter:'url(#n6stk)'},{transform:`rotate(${N6_ROT[prev]}deg) scale(.86)`,filter:'url(#n6stk) saturate(.55)'}],{duration:300,easing:E})}
 tn.querySelector('.lbl').animate([{transform:'scale(.8)'},{transform:'scale(1.12)',offset:.6},{transform:'none'}],{duration:420,delay:200,fill:'backwards'})}

/* ---------- ป้ายบนปุ่ม (ข้อมูลจริง · ศูนย์ = ซ่อน) ---------- */
const N6K='lama-nav6';
const n6st=()=>{try{return JSON.parse(localStorage.getItem(N6K)||'{}')}catch(e){return {}}};
const n6save=o=>{try{localStorage.setItem(N6K,JSON.stringify(o))}catch(e){}};
/* เหรียญตราใหม่ที่ยังไม่ได้เปิดดู: เริ่มนับจากตอนที่เปิดใช้เมนูนี้ครั้งแรก (เหรียญเดิมถือว่าเห็นแล้ว) */
function newBadges(){const got=Object.keys((S&&S.badges)||{});const o=n6st();if(!o.bseen){o.bseen=got;n6save(o);return 0}return got.filter(id=>o.bseen.indexOf(id)<0).length}
function seeBadges(){const o=n6st();o.bseen=Object.keys((S&&S.badges)||{});n6save(o)}
const gamesToday=()=>S.cnt&&S.cnt.day===today()?(S.cnt.game||0):0;
function n6badges(){const set=(k,v)=>{const b=T(k)&&T(k).querySelector('.n6b');if(!b)return;if(!v){b.hidden=true;return}b.hidden=false;
  if(v===true){b.className='n6b dot';b.textContent='';b.setAttribute('aria-label','มีรายการใหม่')}else{b.className='n6b';b.textContent=v>99?'99+':String(v);b.setAttribute('aria-label',v+' รายการ')}};
 let rv=0;try{rv=reviewWords().length}catch(e){}
 const chest=S.chestDay!==today();
 set('home',rv||(chest?true:0));
 let gp=false;try{gp=gamesOpen()&&gamesToday()===0}catch(e){}
 set('arcade',gp);
 let nb=0;try{nb=newBadges()}catch(e){}
 set('me',nb>0)}
let bq=0;const n6badgesSoon=()=>{if(bq)return;bq=requestAnimationFrame(()=>{bq=0;try{n6badges()}catch(e){}})};
window.n6badges=n6badgesSoon;

/* ---------- mountRoot ใหม่: รองรับ 6 แท็บ + ชื่อแท็บเดิม ---------- */
mountRoot=function(tab,fade=true){tab=n6tab(tab);if(!N6_SCR[tab])tab='home';n6bar();const prev=curTab;
 if(stack[0]){const sc=$('.scroller',stack[0].el);tabScroll[curTab]=sc?sc.scrollTop:0;}
 stack.forEach(s=>{try{s.r.unmount&&s.r.unmount()}catch(e){}});stack.forEach(s=>s.el.remove());stack=[];$$('#stack>.screen').forEach(e=>e.remove());
 curTab=tab;const s=build(N6_SCR[tab],{},true);$('#stack').appendChild(s.el);stack=[s];
 $('.scroller',s.el).scrollTop=tabScroll[tab]||0;if(fade&&!RM())anim(s.el,[{opacity:.0},{opacity:1}],{duration:200,easing:'ease-out',fill:'none'});
 $$('#tabbar .tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===tab));s.r.mount&&s.r.mount(s.el);$('#tabbar').style.display='flex';
 if(prev!==tab&&mountRoot.ready)slap(tab,prev);mountRoot.ready=true;n6badgesSoon()};

/* ---------- ไอคอนเส้น (หน้าห้องเกม/ฝึกฝน) ---------- */
const ICO={play:'<path d="M8 5.5v13l10-6.5z" fill="currentColor"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 net:'<path d="M5 4h14l-3 9H8z"/><path d="M12 13v7M9 20h6"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
 timer:'<circle cx="12" cy="13.5" r="7"/><path d="M12 13.5V10M10 3h4"/>',duel:'<path d="M5 19 15 9M15 9l2-5 2 2-5 2M19 19 9 9M9 9 7 4 5 6l5 2"/>',
 boss:'<path d="M6 13a6 6 0 1 1 12 0v1H6z"/><path d="M7 14c-1 3-3 4-4 4M10 14c0 3-1 5-2 6M14 14c0 3 1 5 2 6M17 14c1 3 3 4 4 4"/><circle cx="10" cy="10" r=".8" fill="currentColor"/><circle cx="14" cy="10" r=".8" fill="currentColor"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/>',ear:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/>',
 team:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19a5 5 0 0 1 10 0M11 19a5 5 0 0 1 10 0"/>',relay:'<path d="M4 18 16 6l3 3L7 21z"/><path d="M14 4l6 6"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',article:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 wave:'<path d="M3 12h2l2-5 3 10 3-14 3 12 2-3h3"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
 exam:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8.5 9 1.5 1.5L13 7.5M8.5 15h7"/>',pair:'<rect x="3" y="6" width="8" height="12" rx="2"/><rect x="13" y="6" width="8" height="12" rx="2"/><path d="M11 12h2"/>',
 chest:'<rect x="3.5" y="9" width="17" height="11" rx="2"/><path d="M3.5 9a8.5 5 0 0 1 17 0M10 13h4v3h-4z"/>',chev:'<path d="m9 6 6 6-6 6"/>'};
const sv=(k,c,s,w)=>`<svg width="${s||22}" height="${s||22}" viewBox="0 0 24 24" fill="none" stroke="${c||'currentColor'}" stroke-width="${w||1.9}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[k]}</svg>`;

/* ---------- หน้าห้องเกม ---------- */
const SOLO=[['catch','จับคำ','net','#4F9BFF','#2D6FE8','คำจีนร่วงลงมา แตะคำที่ถูกให้ทัน'],['mem','จับคู่<br>ความจำ','grid','#A77BFF','#7B4AE8','พลิกการ์ดจับคู่ตัวจีนกับคำไทย'],
 ['speed','รอบเร็ว<br>60 วินาที','timer','#FF7A59','#F0384F','ตอบให้ได้มากที่สุดภายใน 1 นาที<br>ถูกติดกันได้คอมโบ'],['speak','ฝึกพูด','mic','#FFC23D','#F59300','พูดตาม'+(typeof MASCOT_NAME!=='undefined'?MASCOT_NAME:'')+' แล้วดูคะแนน (คะแนนจำลอง)'],['listen','ฝึกฟัง','ear','#2DD4BF','#0FA38E','ฟังเสียงแล้วเลือกความหมายที่ถูก']];
const DUO=[['duel','ดวลเพื่อน','duel','#34D27B','#14A85A','ท้าเพื่อนแข่ง 5 ข้อ','data-go="play" data-g="duel"'],['boss','บอสหมึกยักษ์','boss','#9F6BFF','#6A2BD9','ทั้งห้องช่วยกันตีบอส','data-go="play" data-g="boss"'],
 ['team','ทีมชนทีม','team','#FF6B6B','#E23A4E','3 คนชน 3 คน · 6 รอบ','data-go="n6team" data-m="team"'],['relay','วิ่งผลัดคำศัพท์','relay','#FFD23D','#E8A500','ส่งไม้ต่อ มี 3 หัวใจ','data-go="n6team" data-m="relay"']];
const HERO={catch:['#2563EB','#4F46E5','#0EA5E9'],mem:['#6D28D9','#7C3AED','#C026D3'],speed:['#6D28D9','#A21CAF','#DB2777'],speak:['#C2410C','#EA580C','#F59E0B'],listen:['#0F766E','#0D9488','#06B6D4'],
 duel:['#15803D','#16A34A','#22C55E'],boss:['#5B21B6','#6D28D9','#9333EA'],team:['#BE123C','#E11D48','#F97316'],relay:['#B45309','#D97706','#EAB308']};
const HZ=`<svg class="n6hz" width="118" height="112" viewBox="0 0 118 112" aria-hidden="true"><g transform="translate(8 6)"><circle cx="52" cy="58" r="40" fill="#fff" opacity=".16"/><rect x="44" y="6" width="16" height="10" rx="3" fill="#FFD84D"/><rect x="40" y="12" width="24" height="6" rx="3" fill="#FFB020"/><circle cx="52" cy="58" r="34" fill="#fff"/><circle cx="52" cy="58" r="34" fill="none" stroke="#FFD84D" stroke-width="6"/><path d="M52 58V34A24 24 0 0 1 75 52z" fill="#FFE7F3"/><path d="M52 58 52 36" stroke="#6D28D9" stroke-width="4" stroke-linecap="round"/><path d="M52 58 66 66" stroke="#DB2777" stroke-width="4" stroke-linecap="round"/><circle cx="52" cy="58" r="4" fill="#6D28D9"/><path d="M88 20 78 40h9l-6 18 16-24h-9l6-14z" fill="#FFD84D" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M10 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff"/><path d="M96 76l1.4 3.6 3.6 1.4-3.6 1.4L96 86l-1.4-3.6L91 81l3.6-1.4z" fill="#FFD84D"/></g></svg>`;
const heroArt=(k,c)=>k==='speed'?HZ:`<span class="n6hzi" aria-hidden="true"><span class="n6hzc">${sv(k==='team'||k==='relay'||k==='duel'||k==='boss'?k:({catch:'net',mem:'grid',speak:'mic',listen:'ear'}[k]),'#fff',56,1.8)}</span>${STAR('#FFD84D',16).replace('<svg','<svg class="s1"')}${STAR('#fff',11).replace('<svg','<svg class="s2"')}</span>`;
const featured=()=>{const all=[...SOLO.map(x=>x[0]),'duel','boss','team','relay'];return all[((today()%all.length)+all.length)%all.length]};
SC.arcade=()=>{const lock=!gamesOpen(),b=S.gameBest||{},n=gameWords().length,gt=gamesToday();
 const f=featured(),fs=SOLO.find(x=>x[0]===f),fd=DUO.find(x=>x[0]===f),h=['#6D28D9','#A21CAF','#DB2777'];
 const fname=(fs?fs[1]:fd[1]).replace('<br>',' '),fdesc=fs?fs[5]:fd[5]+'<br>ผู้เล่นอื่นเป็นแบบจำลอง';
 const fbest=b[f]>0?`สถิติดีที่สุด ${b[f]} คะแนน`:(f in b?'ยังไม่มีสถิติ ลองเล่นรอบแรก':'เล่นได้ทันที');
 const fgo=fs?`data-go="play" data-g="${f}"`:fd[6];
 const hero=lock?`<div class="n6hero lk" style="background:linear-gradient(135deg,#6D28D9 0%,#A21CAF 55%,#DB2777 100%)"><div class="k">ห้องเกมยังล็อกอยู่</div><div class="t">เรียนบทที่ 1 ให้จบก่อน</div><div class="d">เกมทุกเกมใช้คำที่เรียนจบแล้ว<br>จบบทที่ 1 แล้วเล่นได้ทั้ง 9 เกม</div><div class="ft"><button class="n6btn press" data-go="path" style="color:#7C2BD9">ไปเรียนเลย</button></div>${HZ}</div>`
  :`<div class="n6hero" style="background:linear-gradient(135deg,${h[0]} 0%,${h[1]} 55%,${h[2]} 100%)"><div class="k">เกมแนะนำวันนี้</div><div class="t">${fname}</div><div class="d">${fdesc}</div><div class="ft"><button class="n6btn press" ${fgo} style="color:#7C2BD9">${sv('play','#7C2BD9',14)}เล่นเลย</button><span class="best">${fbest}</span></div>${heroArt(f,h)}</div>`;
 const tile=x=>`<button class="n6gm press${lock?' lk':''}" data-go="play" data-g="${x[0]}" aria-label="${x[1].replace('<br>',' ')}"><span class="n6gt" style="background:linear-gradient(150deg,${x[3]},${x[4]});box-shadow:inset 0 -4px 0 rgba(0,0,0,.16),inset 0 2px 0 rgba(255,255,255,.35),0 5px 10px ${x[4]}55"><i class="gl"></i>${sv(x[2],'#fff',28,2.1)}${lock?`<i class="n6lk">${sv('lock','#fff',13,2.4)}</i>`:''}</span><span class="gn">${x[1]}</span></button>`;
 const card=x=>`<button class="card n6gc press${lock?' lk':''}" ${x[6]}><span class="n6gt sm" style="background:linear-gradient(150deg,${x[3]},${x[4]});box-shadow:inset 0 -3px 0 rgba(0,0,0,.16),inset 0 2px 0 rgba(255,255,255,.35)"><i class="gl"></i>${sv(x[2],'#fff',24,2.1)}</span><span class="gx"><b>${x[1]}</b><small>${x[5]}</small></span></button>`;
 const K=[['แยกใส่ตะกร้า','ลักษณนาม · 60 วินาที','只','#C8102E','data-go="mwsort"'],['ประกอบร่าง','อักษรข้าง · ลากชิ้นส่วน','氵','#2E8B57','data-go="radplay" data-g="build"'],['นักสืบตัวข้าง','อักษรข้าง · เดาความหมาย','亻','#3D6FB6','data-go="radplay" data-g="det"'],['ท้า 60 วินาที','อักษรข้าง · ตอบให้มากที่สุด','口','#D9822B','data-go="radplay" data-g="blitz"']];
 return {title:'ห้องเกม',body:`<div class="large">ห้องเกม</div><p class="cap n6sub">${lock?'9 เกม · เปิดเมื่อเรียนบทที่ 1 จบ':`9 เกม จากคำที่เรียนแล้ว ${n} คำ`}</p>
 ${hero}
 <div class="n6sec"><b>เล่นคนเดียว</b><i>${gt?`วันนี้เล่นแล้ว ${gt} รอบ`:'5 เกม'}</i></div>
 <div class="n6g5">${SOLO.map(tile).join('')}</div>
 <div class="n6sec"><b>เล่นกับเพื่อน</b><i>4 เกม · ผู้เล่นอื่นเป็นแบบจำลอง</i></div>
 <div class="n6g2">${DUO.map(card).join('')}</div>
 <div class="n6sec"><b>เกมในคลังความรู้</b><i>เกมจากห้องลักษณนามและอักษรข้าง</i></div>
 <div class="n6krow">${K.map(x=>`<button class="card n6kg press" ${x[4]}><span class="zh n6zc" style="background:${x[3]}">${x[2]}</span><span><b>${x[0]}</b><small>${x[1]}</small></span></button>`).join('')}</div>
 <p class="cap center" style="padding:18px 30px 0">คำในเกมมาจากบทที่เรียนจบแล้วเท่านั้น · ข้อที่พลาดจะไปอยู่ในรายการทบทวน</p>${typeof DEMO!=='undefined'?DEMO:''}`}};
GOX.n6team=el=>{if(!gamesOpen()){toast('เรียนบทที่ 1 ให้จบก่อนเพื่อปลดล็อกเกม');return}push('teamquiz',{m:el.dataset.m})};

/* ---------- หน้าฝึกฝน ---------- */
const prow=(k,bg,fg,t,sub,go,{lock,bar}={})=>`<button class="row press n6pr" ${go}><span class="ic" style="background:${lock?'#F1EEF0':bg};color:${lock?'#8C837C':fg}">${sv(k,lock?'#8C837C':fg,22,1.9)}</span><span class="tx"><b>${t}</b><small>${sub}</small>${bar!=null?`<span class="n6bar2"><i style="width:${Math.round(Math.min(1,bar)*100)}%"></i></span>`:''}</span>${lock?`<span class="n6rl">${sv('lock','#B9B0A6',18,2)}</span>`:CHEV}</button>`;
function readInfo(SS){const cv=SS.map(s=>lbCover(s));const open=cv.filter(c=>c.ratio>=LB_UNLOCK).length;const best=cv.slice().sort((a,b)=>b.ratio-a.ratio)[0]||{k:0,n:0,ratio:0};return {open,total:SS.length,best}}
SC.prac=()=>{const n=gameWords().length,d=lbDone();const st=readInfo(LB_ST),ar=readInfo(LB_AR);
 const rsub=(x,u,rd)=>x.open?`เปิดแล้ว ${x.open} จาก ${x.total} ${u}${rd?` · อ่านแล้ว ${rd}`:''}`:`${u}แรกเปิดเมื่อรู้คำ ${Math.round(LB_UNLOCK*100)}% · ตอนนี้ ${x.best.k}/${x.best.n}`;
 const sh=lbShadowLessons().length;
 let pk=0;try{const kn=lbKnown();pk=LB.pairs.filter(p=>lbPairOpen(p,kn)).length}catch(e){}
 const mk=(LB.mock||[]).length;
 const sec=(h,a,t)=>`<div class="n6sec"><b>${h}</b><i>เปิดแล้ว ${a} จาก ${t}</i></div>`;
 return {title:'ฝึกฝน',body:`<div class="large">ฝึกฝน</div><p class="cap n6sub">อ่าน ฟัง พูด และเตรียมสอบ จากคำที่เรียนแล้ว ${n} คำ</p>
 ${sec('อ่าน',st.open+ar.open,st.total+ar.total)}<div class="group">
  ${prow('book','#F1ECFA','#7B4AE8','นิทานอ่านเอง <span class="n6pill">'+st.total+' เรื่อง</span>',rsub(st,'เรื่อง',d.rd),'data-go="readers"',{lock:!st.open,bar:st.open?null:st.best.ratio/LB_UNLOCK})}
  ${prow('article','#E6F4F1','#0F8A6A','บทความสั้น <span class="n6pill">'+ar.total+' บท</span>',rsub(ar,'บท',d.ar),'data-go="articles"',{lock:!ar.open,bar:ar.open?null:ar.best.ratio/LB_UNLOCK})}</div>
 ${sec('ฟังและพูด',(sh?1:0)+2,3)}<div class="group">
  ${prow('wave','#E7F8EE','#14A85A','ชาโดว์อิ้ง',sh?`ฟังประโยคแล้วพูดตาม · เปิดแล้ว ${sh} บท`:'เปิดเมื่อเรียนรอบแรกของบทที่ 1 จบ','data-go="shadow"',{lock:!sh})}
  ${prow('chat','#EAF1FB','#2D6FE8','ติวเตอร์จำลอง','ถาม'+(typeof MASCOT_NAME!=='undefined'?MASCOT_NAME:'')+' อธิบายคำ · ซ้อมคุย · แก้ประโยค','data-go="tutor"')}
  ${prow('clock','#FDF3E6','#C07A00','ห้องอ่านหนังสือ','จับเวลา 5, 10 หรือ 15 นาที · ได้เหรียญตามเวลาที่อ่าน','data-go="study"')}</div>
 ${sec('เตรียมสอบ',1+(pk?1:0),2)}<div class="group">
  ${prow('exam','#FCE9EF','#D0336A','ข้อสอบจำลอง',`คลัง ${mk} ข้อ · ครั้งละ ${MOCK_N} ข้อ ${Math.round(MOCK_SEC/60)} นาที`,'data-go="mocklab"')}
  ${prow('pair','#EAF1FB','#3D6FB6','เทียบคำใกล้เคียง',pk?`เปิดแล้ว ${pk} จาก ${LB.pairs.length} คู่`:`${LB.pairs.length} คู่ · เปิดเมื่อรู้คำทั้งสองคำของคู่`,'data-go="pairs"',{lock:!pk})}</div>
 <div style="height:10px"></div>${typeof DEMO!=='undefined'?DEMO:''}`}};
/* ห้องฝึกพิเศษเดิม → แท็บฝึกฝน (หน้า labs เดิมยังเปิดได้ด้วย push('labs') แต่ไม่มีทางเข้าซ้ำ) */
GOX.labs=()=>mountRoot('prac');
GOX.arcade=()=>mountRoot('arcade');GOX.prac=()=>mountRoot('prac');

/* ---------- คลังความรู้: ย้าย อ่าน/ฟัง/ข้อสอบ/เทียบคำ ไปแท็บฝึกฝน (บ้านเดียว) ---------- */
const MOVED=['นิทานอ่านเอง','บทความสั้น','ฟังแล้วพูดตาม','เทียบคำใกล้เคียง','ข้อสอบจำลอง'];
if(typeof KN_CATS!=='undefined'){KN_CATS.forEach(c=>{c[2]=c[2].filter(t=>MOVED.indexOf(t)<0)});
 KN_CATS.forEach(c=>{if(c[0]==='อ่านและฟัง'){c[0]='หนังสือเรียน';c[1]='เสียงประกอบหนังสือเรียน เปิดฟังตามบท'}if(c[0]==='คำศัพท์และแบบทดสอบ'){c[0]='คำศัพท์';c[1]='ลักษณนามและสมุดคำของฉัน';c.nb=1}});
 /* สลับให้หมวดคำศัพท์ (มีสมุดคำ) มาก่อนหนังสือเรียน */
 const a=KN_CATS.findIndex(c=>c[0]==='หนังสือเรียน'),b=KN_CATS.findIndex(c=>c[0]==='คำศัพท์');if(a>=0&&b>a){const t=KN_CATS[a];KN_CATS[a]=KN_CATS[b];KN_CATS[b]=t}
 for(let i=KN_CATS.length-1;i>=0;i--)if(!KN_CATS[i][2].length)KN_CATS.splice(i,1);
 SC.know=()=>{const I=knItems();return {title:'คลังความรู้',body:`<div class="kn-hd"><h1>คลังความรู้</h1><p>อ่าน ฟัง ฝึก ได้ทุกเมื่อ</p></div>
 ${KN_CATS.map(([h,sub,ts],i)=>`<div class="kn-sec"><div><h3>${h}</h3><small>${sub}</small></div><button class="lk press" data-go="kncat" data-i="${i}">ดูทั้งหมด</button></div>${KN_CATS[i].nb&&window.nbEntry?nbEntry():''}<div class="kn-rowx">${ts.map(t=>knCard(I[t])).join('')}</div>`).join('')}${DEMO}`}}}

/* ---------- วันนี้: หีบรางวัลประจำวัน (ย้ายมาจากแท็บเกมเดิม) ---------- */
const _home=SC.home;
SC.home=p=>{const r=_home(p);const got=S.chestDay===today();
 const card=`<div class="hg-sec"><h3>หีบรางวัลประจำวัน</h3></div><button class="card n6chest press" data-go="chest"><span class="ic" style="background:#E7F8EE;color:#14A85A">${sv('chest','#14A85A',26,1.9)}</span><span class="tx"><b>${got?'วันนี้เปิดหีบแล้ว':'หีบวันนี้พร้อมเปิด'}</b><small>${got?'พรุ่งนี้มาเปิดใหม่ได้อีกครั้ง':'เปิดได้วันละ 1 ครั้ง · ลุ้นเหรียญ 15–60 หรือ XP โบนัส'}</small></span>${got?`<span class="n6done">${sv('chev','#B9B0A6',18,2)}</span>`:'<span class="n6open">เปิดหีบ</span>'}</button>`;
 const at=r.body.indexOf('<div class="hg-sec"><h3>ปฏิทินการเรียน');r.body=at>=0?r.body.slice(0,at)+card+r.body.slice(at):r.body+card;return r};

/* ---------- ฉัน: เอารายการที่ย้ายไปแท็บอื่นออก (ทบทวน→วันนี้ · ห้องฝึกพิเศษ/ติวเตอร์/ห้องอ่าน→ฝึกฝน · วรรณยุกต์→คลังความรู้) ---------- */
function wrapMe(){const _me=SC.me;if(!_me||_me.__n6)return;SC.me=p=>{const r=_me(p);['labs','tutor','study','review','tones'].forEach(g=>{r.body=r.body.replace(new RegExp(`<button class="row press" data-go="${g}">[\\s\\S]*?</button>`),'')});return r};SC.me.__n6=1}
wrapMe();
const _bd=SC.badges;if(_bd)SC.badges=p=>{const r=_bd(p);const m=r.mount;r.mount=function(el){seeBadges();n6badgesSoon();return m&&m.apply(this,arguments)};return r};

document.addEventListener('DOMContentLoaded',()=>{n6bar();$$('#tabbar .tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===curTab));n6badgesSoon();
 const st=document.getElementById('stack');if(st)new MutationObserver(n6badgesSoon).observe(st,{childList:true})});
})();
