/* เขียนทีละขีด — ดูลำดับขีดเคลื่อนไหว + ลากนิ้วฝึกเขียนตรวจทีละขีด
   ข้อมูล: data/stroke/*.json (hanzi-writer-data 2.0.1 + Make Me a Hanzi, Arphic Public License · ดัดแปลงแล้ว ดู data/stroke/NOTICE.md)
   ตัวตรวจขีดตอนฝึก: Hanzi Writer 3.7.3 (MIT) โหลดเมื่อเข้าหน้าฝึกเท่านั้น · ชื่อขีดภาษาไทยเป็นร่าง รอครูตรวจ */
const STK_RAD='#D9822B',STK_RED='#C8102E',STK_INK='#27211E',STK_GHOST='rgba(60,40,30,.13)';
const STK_SET=new Set(STK_COV),STK_CNT={};
[...STK_COV].forEach((c,i)=>{STK_CNT[c]=parseInt(STK_SC[i],36)});
const STK_DRAFT='ร่าง รอครูตรวจ';
const stkHex=c=>c.codePointAt(0).toString(16);
const stkIsHan=c=>/\p{Script=Han}/u.test(c);
const stkHan=s=>[...(s||'')].filter(stkIsHan);
const stkDefault=()=>({rec:[],fav:[],done:{},mode:'guide',days:0,last:-99,n:0});
function stkS(){if(!S.stk||typeof S.stk!=='object')S.stk=stkDefault();const k=S.stk;for(const x in stkDefault())if(k[x]===undefined)k[x]=stkDefault()[x];return k}
/* ---- โหลดข้อมูลทีละตัว (cache ในหน่วยความจำ + service worker) ---- */
const STK_CACHE={},STK_DATA={};
function stkLoad(c){if(STK_CACHE[c])return STK_CACHE[c];
 if(!STK_SET.has(c))return STK_CACHE[c]=Promise.resolve({err:'nodata',c});
 const p=fetch('data/stroke/'+stkHex(c)+'.json').then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(d=>{d.c=c;STK_DATA[c]=d;return d}).catch(()=>{delete STK_CACHE[c];return {err:'net',c}});
 return STK_CACHE[c]=p}
const stkLoadAll=cs=>Promise.all(cs.map(stkLoad));
/* ---- ข้อมูลคำ/ตัวอักษรจากบทเรียน ---- */
const stkNorm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ü/g,'v').toLowerCase().replace(/[^a-z0-9\u0e00-\u0e7f]/g,'');
function stkWord(w){const e=wordBy(w);const cs=stkHan(w);let syl=e?e.py.split(/[ |]+/).filter(Boolean):[],th=[];
 if(e&&e.h)th=e.h.split(/[ |]+/).filter(Boolean);
 const py=cs.map((c,i)=>syl.length===cs.length?syl[i]:(cs.length===1&&e?e.py:null));
 const rd=cs.map((c,i)=>th.length===cs.length?th[i]:(cs.length===1&&e?e.h:null));
 return {w,e,cs,py,rd}}
function stkInChars(c){const out=[];for(const l of LESSONS){for(const w of l.words){if(w.zh.length>1&&w.zh.includes(c)){out.push(w);if(out.length>=3)return out}}}return out}
function stkTypeOf(d,i){return d&&d.n?STK_T[d.n[i]]:null}
const stkGloss=c=>STK_GLOSS[c]||(wordBy(c)?wordBy(c).th.split(/[\/(]/)[0].trim():'');
/* ---- เรขาคณิต ---- */
function stkItems(datas){const items=[];datas.forEach((d,ci)=>{d.strokes.forEach((p,si)=>{const m=d.medians[si];let L=0;for(let j=1;j<m.length;j++)L+=Math.hypot(m[j][0]-m[j-1][0],m[j][1]-m[j-1][1]);
 const role=d.k&&d.cp&&d.cp[d.k[si]]?d.cp[d.k[si]][1]:null;items.push({ci,si,gi:items.length,d:p,m,L:Math.max(L,40),off:ci*1024,role,t:stkTypeOf(d,si)})})});
 /* ตำแหน่งเลขขีด: ถอยออกจากจุดเริ่มตามทิศเส้น แล้วผลักไม่ให้ซ้อนกัน */
 items.forEach(it=>{const a=it.m[0],b=it.m[Math.min(2,it.m.length-1)];let dx=a[0]-b[0],dy=a[1]-b[1];const n=Math.hypot(dx,dy)||1;dx/=n;dy/=n;
  it.bx=Math.min(1024-34,Math.max(34,a[0]+dx*62))+it.off;it.by=Math.min(1024-34,Math.max(34,900-(a[1]+dy*62)))});
 for(let k=0;k<30;k++){let moved=false;for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const A=items[i],B=items[j];if(A.ci!==B.ci)continue;const dx=B.bx-A.bx,dy=B.by-A.by,dd=Math.hypot(dx,dy);if(dd<84){const f=(84-dd)/2/(dd||1);const ux=dd?dx:1,uy=dd?dy:0;A.bx-=ux*f;A.by-=uy*f;B.bx+=ux*f;B.by+=uy*f;moved=true}}if(!moved)break}
 items.forEach(it=>{it.bx=Math.min(1024-34,Math.max(34,it.bx-it.off))+it.off;it.by=Math.min(990,Math.max(34,it.by))});
 return items}
const stkMed=(m,ext=36)=>{const p=m.map(q=>[q[0],900-q[1]]);if(p.length<2)return 'M'+p[0].join(' ');const f=(a,b)=>{const dx=a[0]-b[0],dy=a[1]-b[1],n=Math.hypot(dx,dy)||1;return [a[0]+dx/n*ext,a[1]+dy/n*ext]};
 const s=f(p[0],p[1]),e=f(p[p.length-1],p[p.length-2]);return 'M'+[s,...p,e].map(q=>q[0].toFixed(0)+' '+q[1].toFixed(0)).join('L')};
const stkRoleCol=(it,colored)=>colored&&it.role==='r'?STK_RAD:STK_INK;
function stkGridSvg(n){let g='';for(let i=0;i<n;i++){const o=i*1024;g+=`<rect x="${o+36}" y="36" width="952" height="952" rx="30" fill="none" stroke="rgba(200,16,46,.30)" stroke-width="3" vector-effect="non-scaling-stroke"/><path d="M${o+36} 36L${o+988} 988M${o+988} 36L${o+36} 988M${o+512} 36V988M${o+36} 512H${o+988}" stroke="rgba(200,16,46,.17)" stroke-width="2" stroke-dasharray="14 12" vector-effect="non-scaling-stroke" fill="none"/>`}return g}
const stkPad=(n,x,y,r,t,col,cls='')=>`<g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="#fff" stroke-width="7"/><text x="${x}" y="${y+r*.36}" text-anchor="middle" font-size="${r*1.08}" font-weight="700" fill="#fff" font-family="'IBM Plex Sans Thai',system-ui,sans-serif">${t}</text></g>`;
/* ภาพเล็กของขั้นตอนที่ i (ตัวเต็มจางๆ + ขีดที่เขียนแล้ว + ขีดปัจจุบันสีแดง) */
function stkMini(item,i,items,id){const cur=items[i];const g=items.filter(x=>x.ci===cur.ci);
 return `<svg viewBox="0 0 1024 1024" aria-hidden="true">${g.map(x=>`<path d="${x.d}" fill="${STK_GHOST}" transform="translate(0,900) scale(1,-1)"/>`).join('')}${g.filter(x=>x.si<=cur.si).map(x=>`<path d="${x.d}" fill="${x.si===cur.si?STK_RED:(x.role==='r'?STK_RAD:STK_INK)}" transform="translate(0,900) scale(1,-1)"/>`).join('')}</svg>`}
const stkStars=(mis,n)=>mis===0?3:mis<=Math.max(1,Math.ceil(n/4))?2:1;
const stkStarTxt=n=>'⭐'.repeat(n)+'☆'.repeat(3-n);
/* ปุ่มเข้าจากการ์ดคำศัพท์ทุกที่ */
function stkBtn(zh,cls=''){if(!stkHan(zh).length)return '';return `<button class="stk-btn press ${cls}" data-stk="${zh}" aria-label="ดูลำดับขีด ${zh}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.2-4.2L16.6 4.4a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8z"/><path d="M14.5 6.5l3 3"/></svg><span>ดูลำดับขีด</span></button>`}
function stkOpen(w){if(!stkHan(w).length)return;closeSheet(true);push('stroke',{w})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-stk]');if(!b||!$('#frame').contains(b))return;e.preventDefault();e.stopPropagation();stkOpen(b.dataset.stk)},true);
function stkRecent(w){const k=stkS();k.rec=[w,...k.rec.filter(x=>x!==w)].slice(0,8);save()}
/* ---- service worker: เก็บ JSON ที่เคยเปิดไว้ใช้ออฟไลน์ ---- */
if('serviceWorker' in navigator&&location.protocol!=='file:')addEventListener('load',()=>{try{navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}});
/* ================= ตัวเล่นภาพเคลื่อนไหวลำดับขีด ================= */
function stkSvgHtml(items,nch,{id,big}){const n=items.length;const vb=`0 0 ${nch*1024} 1024`;
 const masks=items.map((it,i)=>{const Lm=Math.round(it.L+90);return `<mask id="${id}m${i}" maskUnits="userSpaceOnUse" x="${it.off-200}" y="-200" width="${1424}" height="1424"><path class="mk" d="${stkMed(it.m)}" transform="translate(${it.off},0)" fill="none" stroke="#fff" stroke-width="190" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${Lm} ${Lm}" stroke-dashoffset="0"/></mask>`}).join('');
 return `<svg class="stk-svg" viewBox="${vb}" style="aspect-ratio:${nch}/1" role="img" aria-label="ลำดับขีด"><defs>${masks}</defs>${stkGridSvg(nch)}
 <g class="ghost">${items.map(it=>`<path d="${it.d}" fill="${STK_GHOST}" transform="translate(${it.off},900) scale(1,-1)"/>`).join('')}</g>
 <g class="inks">${items.map((it,i)=>`<g mask="url(#${id}m${i})"><path class="ink-i" d="${it.d}" fill="${STK_INK}" style="opacity:0" transform="translate(${it.off},900) scale(1,-1)"/></g>`).join('')}</g>
 <g class="numsg">${items.map((it,i)=>stkPad(i+1,it.bx,it.by,n>20?30:big?46:38,i+1,STK_INK,'num')).join('')}</g></svg>`}
function stkAnimator(root,items,cb){const n=items.length;const st={done:0,anim:-1,p:0,hl:-1,playing:false,speed:1,loop:false,nums:true,colors:true,ending:0};
 const ink=[...root.querySelectorAll('.ink-i')],mk=[...root.querySelectorAll('.mk')],nums=[...root.querySelectorAll('.num')];let raf=0,last=0,gap=0;
 function paint(){items.forEach((it,i)=>{const el=ink[i],m=mk[i];const full=i<st.done,isA=i===st.anim;
  el.style.opacity=(full||(isA&&st.p>0.01))?1:0;const Lm=Math.round(it.L+90);m.setAttribute('stroke-dashoffset',isA?Lm*(1-st.p):0);
  el.setAttribute('fill',i===st.hl?STK_RED:stkRoleCol(it,st.colors));
  const nm=nums[i];nm.style.display=(st.nums&&i<=Math.max(st.anim,st.done-1))?'':'none';nm.firstChild.setAttribute('fill',i===st.hl?STK_RED:STK_INK)});cb&&cb(st)}
 function startNext(){if(st.done>=n){finish();return}st.anim=st.done;st.p=0;st.hl=st.anim}
 function finish(){st.hl=-1;st.anim=-1;if(st.loop){st.ending=1;gap=1200}else st.playing=false}
 function tick(ts){const dt=Math.min(64,ts-last);last=ts;if(!st.playing){raf=0;paint();return}
  if(st.anim>=0){const dur=(260+items[st.anim].L*.9)/st.speed;st.p+=dt/dur;if(st.p>=1){st.p=1;st.done=st.anim+1;st.hl=st.anim;st.anim=-1;gap=320/st.speed;if(st.done>=n)finish()}}
  else if(gap>0){gap-=dt;if(gap<=0){if(st.ending){st.ending=0;st.done=0;st.hl=-1}startNext()}}
  paint();raf=requestAnimationFrame(tick)}
 const run=()=>{if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}};
 const api={st,paint,
  play(){if(st.done>=n&&st.anim<0){st.done=0;st.hl=-1}st.playing=true;st.ending=0;if(st.anim<0)startNext();run();paint()},
  pause(){st.playing=false;if(st.anim>=0&&st.p<1){}paint()},
  toggle(){st.playing?api.pause():api.play()},
  jump(k){st.playing=false;st.anim=-1;st.p=0;st.done=Math.max(0,Math.min(n,k));st.hl=st.done-1;paint()},
  prev(){const k=st.anim>=0?st.anim:st.done;api.jump(Math.max(0,k-1))},
  next(){const k=st.anim>=0?st.anim+1:st.done;api.jump(Math.min(n,k+1))},
  setSpeed(v){st.speed=v;paint()},stop(){st.playing=false;if(raf)cancelAnimationFrame(raf);raf=0}};
 paint();return api}
/* ================= หน้าดูลำดับขีด ================= */
const STK_LIVE={alive:false,anim:null};
const STK_DEMO_NOTE='ชื่อขีดภาษาไทยเป็นร่าง รอครูตรวจ';
SC.stroke=(p)=>{const w=p.w,info=stkWord(w);const k=stkS();
 return {noRefresh:true,nav:`<header class="nav stk-vnav"><div class="nav-l"><button class="back" data-act="back">${BACKI}<span>${p.backLabel||'กลับ'}</span></button></div><div class="nav-t"></div><div class="nav-r"><button class="stk-star press" id="stkfav" aria-label="บันทึกเป็นรายการโปรด" aria-pressed="${k.fav.includes(w)}"></button></div></header>`,
  body:`<div class="stk-v" id="stkv" data-w="${w}"><div class="stk-load"><div class="stk-sk" style="height:76px"></div><div class="stk-sk" style="height:300px;margin-top:14px"></div><div class="stk-sk" style="height:150px;margin-top:14px"></div></div></div>`,
  extra:`<div class="stk-cta" id="stkcta" style="display:none"><button class="pill row1 press" id="stkprac"></button></div>`,
  unmount(){STK_LIVE.alive=false;STK_LIVE.anim&&STK_LIVE.anim.stop()},
  mount(el){const root=$('#stkv',el);let alive=true;STK_LIVE.alive=true;
   const fav=$('#stkfav',el),paintFav=()=>{const on=stkS().fav.includes(w);fav.innerHTML=svg(on?'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z" fill="currentColor"/>':'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z"/>',22);fav.setAttribute('aria-pressed',on);fav.setAttribute('aria-label',on?'เอาออกจากรายการโปรด':'บันทึกเป็นรายการโปรด')};paintFav();
   fav.onclick=()=>{const k=stkS();k.fav=k.fav.includes(w)?k.fav.filter(x=>x!==w):[w,...k.fav].slice(0,40);save();paintFav();vib(8);toast(k.fav.includes(w)?'บันทึก “'+w+'” แล้ว (ดูในหน้าเขียนทีละขีด)':'เอาออกแล้ว')};
   if(!info.cs.length){root.innerHTML=stkEmpty(w,'ไม่มีตัวอักษรจีนให้ดูลำดับขีด');return}
   stkRecent(w);
   stkLoadAll(info.cs).then(datas=>{if(!alive)return;
    if(datas.some(d=>d.err==='net')){root.innerHTML=stkNetErr();$('#stkretry',root).onclick=()=>{el.querySelector('.stk-cta').style.display='none';SC.stroke(p).mount(el)};return}
    const ok=datas.filter(d=>!d.err);if(!ok.length){root.innerHTML=stkEmpty(w,'ยังไม่มีข้อมูลลำดับขีดของคำนี้');return}
    stkViewer(el,root,info,datas,p,x=>{STK_LIVE.anim=x})})}}};
function stkEmpty(w,msg){const miss=stkHan(w).filter(c=>!STK_SET.has(c));return `<div class="stk-empty"><div class="stk-em-mas">${M('notfound')}</div><div class="stk-em-z zh" aria-hidden="true">${miss.length?miss.join(''):w}</div><div class="h2" style="padding:0;margin-top:6px">ยังไม่มีข้อมูล</div><p class="cap" style="margin:8px 6px 0;font-size:14.5px;color:var(--sub2)">${msg}${miss.length?` — “${miss.join('')}” ไม่มีในแหล่งข้อมูลเปิดที่เราใช้ (${STK_COV.length.toLocaleString('en-US')} ตัว)`:''}<br>แอปจะไม่เดาเส้นขีดเอง เพื่อไม่ให้สอนผิด</p><button class="pill sm ghost press" data-act="back" style="margin:18px auto 0;max-width:220px">กลับไปค้นหา</button></div>`}
function stkNetErr(){return `<div class="stk-empty"><div class="stk-em-mas">${M('tired')}</div><div class="h2" style="padding:0">โหลดข้อมูลขีดไม่สำเร็จ</div><p class="cap" style="margin:8px 6px 0;font-size:14.5px;color:var(--sub2)">อาจออฟไลน์อยู่ · ตัวที่เคยเปิดแล้วจะอ่านจากเครื่องได้</p><button class="pill sm press" id="stkretry" style="margin:16px auto 0;max-width:220px">ลองใหม่</button></div>`}
function stkViewer(el,root,info,datas,p,setAnim){const w=info.w,nc=datas.length;const k0=p.ci!=null?p.ci:(nc>1?nc:0);let tab=Math.min(k0,nc);let anim=null;const e=info.e;
 const lessonOf=e&&LESSONS.find(l=>l.id===e.lesson);
 const total=datas.reduce((a,d)=>a+(d.strokes?d.strokes.length:0),0);
 function draw(){if(anim){anim.stop();anim=null}const isAll=tab===nc;const sel=isAll?datas:[datas[tab]];const d1=isAll?null:datas[tab];
  const pyS=isAll?(info.py.some(x=>!x)?(e?e.py.replace(/\|/g,''):''):info.py.join(' ')):(info.py[tab]||(d1.py&&d1.py[0])||'');
  const tabs=nc>1?`<div class="seg stk-tabs" role="tablist" aria-label="เลือกตัวอักษรในคำ">${datas.map((d,i)=>`<button role="tab" aria-selected="${tab===i}" class="${tab===i?'on':''}" data-t="${i}"><span class="zh">${info.cs[i]}</span><small>${d.err?'ไม่มีข้อมูล':d.strokes.length+' ขีด'}</small></button>`).join('')}<button role="tab" aria-selected="${isAll}" class="${isAll?'on':''}" data-t="${nc}"><span>ทั้งคำ</span><small>${total} ขีด</small></button></div>`:'';
  const ent=(isAll?datas.every(d=>!d.err):!d1.err);
  let main='';
  if(!ent){const c=info.cs[tab];main=stkEmpty(c,'ยังไม่มีข้อมูลลำดับขีดของตัวนี้')}
  else{
   const okd=sel.filter(d=>!d.err);const items=stkItems(okd);const id='sa'+Date.now()%1e5;
   const hasComp=items.some(it=>it.role==='r');
   const side=isAll?'':`<div class="stk-side"><div class="sd-l">เสียงอ่าน</div><div class="sd-v"><b class="py">${pyHtml(info.py[tab]||'')}</b>${info.rd[tab]?` · <span>${info.rd[tab]}</span>`:''}</div>
     <div class="sd-l">ความหมาย</div><div class="sd-v">${stkMeaning(info,tab)}</div>
     ${d1.cp?`<div class="sd-l">ส่วนประกอบ</div><div class="sd-c">${d1.cp.map(([c,r])=>`<span class="stk-comp ${r==='r'?'rad':''}"><i class="zh">${c}</i><b>${stkGloss(c)||'<small>ส่วนประกอบ</small>'}${r==='r'?' · ราก':r==='p'?' · ออกเสียง':''}</b></span>`).join('')}</div>`:''}</div>`;
   main=`<div class="card stk-card"><div class="stk-cv ${nc>1&&!isAll?'side':''}">${stkSvgHtml(items,okd.length,{id,big:nc>1&&!isAll})}${isAll?'':side}</div>
    <div class="stk-cap" id="stkcap"></div></div>
    <div class="card stk-ctl"><div class="stk-bar" id="stkbar" role="group" aria-label="ความคืบหน้าของขีด">${items.map((it,i)=>`<button class="sg" data-j="${i+1}" aria-label="ไปที่ขีดที่ ${i+1}"><i><b></b></i></button>`).join('')}</div>
    <div class="stk-st"><span id="stkl">ขีด 0 จาก ${items.length}</span><span id="stkr"></span></div>
    <div class="stk-btns"><button class="stk-rb press" id="bprev" aria-label="ขีดก่อนหน้า"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 5h2v14H6zM9.5 12L19 5v14z"/></svg></button><button class="stk-play press" id="bplay" aria-label="เล่น"></button><button class="stk-rb press" id="bnext" aria-label="ขีดถัดไป"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M16 5h2v14h-2zM14.5 12L5 5v14z"/></svg></button></div>
    <div class="stk-spd"><span>ความเร็ว</span><div class="seg" role="group" aria-label="ความเร็ว">${[.5,1,2].map(v=>`<button data-sp="${v}" class="${v===1?'on':''}">${v}×</button>`).join('')}</div></div></div>
    <div class="stk-chips"><button class="stk-tg on press" data-tg="nums" aria-pressed="true"><i>✓</i> เลขขีด</button>${hasComp?`<button class="stk-tg on press" data-tg="colors" aria-pressed="true"><i>✓</i> แยกสีส่วนประกอบ</button>`:''}<button class="stk-tg press" data-tg="loop" aria-pressed="false"><i></i> วนซ้ำ</button></div>
    <div class="sec stk-sec">ลำดับขีด${isAll?'ของทั้งคำ':'ของ <span class="zh">'+info.cs[tab]+'</span>'} · แตะดูทีละขีด</div>
    <div class="stk-rail" id="stkrail">${items.map((it,i)=>`<button class="stk-step press" data-j="${i+1}" aria-label="ขีดที่ ${i+1} ${it.t?it.t[2]:''}"><span class="n">${i+1}</span>${stkMini(it,i,items)}<span class="nm">${it.t?it.t[2]:'ขีดที่ '+(i+1)}</span></button>`).join('')}</div>
    ${stkMnemo(info,tab,isAll,d1)}`;
   setTimeout(()=>wire(items),0)}
  const mean=e?e.th:'';
  root.innerHTML=`<div class="stk-head"><div class="stk-hz zh" style="font-size:${w.length>3?28:w.length>1?44:56}px">${w}</div><div class="stk-hm"><div class="py">${isAll?(info.py.some(x=>!x)?pyHtml(e?e.py:''):pyHtml(info.py.join(' '))):pyHtml(pyS)}</div><div class="th">${mean||(isAll?'':'')}</div><div class="meta">${e?'ระดับ '+e.lv+' · ':'ไม่อยู่ในบทเรียน · '}${total} ขีด${lessonOf?` · บทที่ ${lessonOf.id} “${lessonOf.th}”`:''}</div></div><button class="stk-spk press" data-act="audio" data-t="${w}" aria-label="ฟังเสียง ${w}">${SPK}</button></div>${tabs}${main}`;
  const cta=$('#stkcta',el),pr=$('#stkprac',el);cta.style.display=ent?'':'none';const lab=isAll?(nc>1?`ฝึกเขียนทั้งคำ ${w}`:'ฝึกเขียนตามขีด'):(nc>1?`ฝึกเขียน ${info.cs[tab]}`:'ฝึกเขียนตามขีด');
  pr.innerHTML=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.2-4.2L16.6 4.4a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8z"/></svg><span>${lab}</span>`;
  pr.onclick=()=>{anim&&anim.pause();push('strokeprac',{w,only:isAll?-1:tab})};
  $$('.stk-tabs [data-t]',root).forEach(b=>b.onclick=()=>{tab=+b.dataset.t;vib(6);draw()});
}
 function wire(items){const svgEl=$('.stk-svg',root);if(!svgEl)return;anim=stkAnimator(svgEl,items,s=>upd(s,items));setAnim(anim);
  const play=$('#bplay',root);$('#bprev',root).onclick=()=>{vib(5);anim.prev()};$('#bnext',root).onclick=()=>{vib(5);anim.next()};play.onclick=()=>{vib(6);anim.toggle()};
  $$('[data-sp]',root).forEach(b=>b.onclick=()=>{$$('[data-sp]',root).forEach(x=>x.classList.toggle('on',x===b));anim.setSpeed(+b.dataset.sp);vib(5)});
  $$('[data-tg]',root).forEach(b=>b.onclick=()=>{const on=!b.classList.contains('on');b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.firstElementChild.textContent=on?'✓':'';anim.st[b.dataset.tg]=on;anim.paint();vib(5)});
  $$('[data-j]',root).forEach(b=>b.onclick=()=>{anim&&anim.jump(+b.dataset.j);vib(5)});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)anim.play();else anim.jump(items.length)}
 function upd(s,items){const n=items.length;const shown=s.anim>=0?s.anim+1:s.done;const cur=s.anim>=0?s.anim:s.done-1;
  const bar=$('#stkbar',root);if(!bar)return;[...bar.children].forEach((b,i)=>{const bb=b.querySelector('b');const full=i<s.done,isA=i===s.anim;b.classList.toggle('on',full);b.classList.toggle('cur',isA);bb.style.width=full?'100%':isA?Math.round(s.p*100)+'%':'0%'});
  $('#stkl',root).textContent=`ขีด ${shown} จาก ${n}`;$('#stkr',root).textContent=s.playing?(s.anim>=0?'กำลังเขียน…':'…'):s.done>=n?'ครบแล้ว':s.done===0?'พร้อมเริ่ม':'หยุดชั่วคราว';
  const pl=$('#bplay',root);const pp=s.playing;pl.setAttribute('aria-label',pp?'หยุดชั่วคราว':'เล่น');pl.innerHTML=pp?'<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>':'<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2z"/></svg>';
  const it=items[Math.max(0,Math.min(n-1,cur))];const cap=$('#stkcap',root);
  if(cur<0)cap.innerHTML=`<div class="stk-cn idle">▶</div><div class="stk-ct"><b>กดเล่นเพื่อดูขีดแรก</b><small>แตะเลขในแถบด้านล่างเพื่อกระโดดไปขีดที่ต้องการ</small></div>`;
  else cap.innerHTML=`<div class="stk-cn">${cur+1}</div><div class="stk-ct"><b>${it.t?`<span class="zh">${it.t[0]}</span> · ${it.t[2]} <small>${it.t[1]}</small>`:'ขีดที่ '+(cur+1)}</b><small>${it.t?it.t[3]+' <i class="stk-draft" title="ชื่อขีดภาษาไทยเป็นร่าง รอครูตรวจ">'+STK_DRAFT+'</i>':'ยังไม่มีชื่อขีดในข้อมูล'}</small></div>`;
  const cps=[...new Set(items.map(x=>x.role))];const lg=$('.stk-legend',root)}
 draw()}
function stkMeaning(info,i){const c=info.cs[i];const own=wordBy(c);if(own)return `<b>${own.th}</b>`;const e=info.e;if(info.cs.length===1&&e)return `<b>${e.th}</b>`;const ins=stkInChars(c);return ins.length?`<small>ดูในคำ</small> <b class="zh">${ins[0].zh}</b> <small>${ins[0].th}</small>`:`<small>ไม่อยู่ในบทเรียนเดี่ยวๆ</small>`}
function stkMnemo(info,tab,isAll,d1){if(isAll||!d1||!d1.cp||d1.cp.length<2)return '';const g=d1.cp.map(([c])=>[c,stkGloss(c)]);const f=g.filter(x=>x[1]).length;if(!f)return '';
 const mn=wordBy(info.cs[tab]);const line=g.map(([c,t])=>`<span class="zh">${c}</span>${t?` (${t})`:''}`).join(' + ');
 return `<div class="stk-mn card"><div class="mas">${M('think')}</div><div><div class="cap">สูตรจำ · <i class="stk-draft">${STK_DRAFT}</i></div><div class="f">${line}</div>${mn&&mn.mn?`<div class="s">${mn.mn}</div>`:''}</div></div>`}
/* ================= หน้าค้นหา ================= */
const stkMonth=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
function stkSearch(q,mode){q=q.trim();if(!q)return [];const han=/\p{Script=Han}/u.test(q),thai=/[\u0e00-\u0e7f]/.test(q);const nq=stkNorm(q).replace(/[0-9]/g,'');const ql=q.toLowerCase();let rows=[];
 for(const e of ALLW){let sc=0;
  if(han&&(mode==='all'||mode==='zh')){if(e.zh===q)sc=100;else if(e.zh.startsWith(q))sc=80;else if(e.zh.includes(q))sc=60}
  if(!han&&!thai&&nq&&(mode==='all'||mode==='py')){const p=stkNorm(e.py).replace(/[0-9]/g,'');if(p===nq)sc=Math.max(sc,95);else if(p.startsWith(nq))sc=Math.max(sc,70);else if(p.includes(nq))sc=Math.max(sc,40)}
  if(!han&&(mode==='all'||mode==='th')){const t=e.th.toLowerCase(),h=(e.h||'').toLowerCase();if(t===ql||h===ql)sc=Math.max(sc,96);else if(t.startsWith(ql)||h.startsWith(ql))sc=Math.max(sc,75);else if(t.includes(ql)||h.includes(ql))sc=Math.max(sc,45)}
  if(sc&&stkHan(e.zh).length)rows.push({e,sc})}
 const seen=new Set();rows=rows.sort((a,b)=>b.sc-a.sc||a.e.zh.length-b.e.zh.length||a.e.lv-b.e.lv).filter(r=>!seen.has(r.e.zh)&&seen.add(r.e.zh)).slice(0,40);
 const out=rows.map(r=>({w:r.e.zh,e:r.e}));
 if(han&&(mode==='all'||mode==='zh')){const hq=stkHan(q).join('');if(hq&&hq.length<=8&&!out.some(r=>r.w===hq)){out.push({w:hq,e:null,free:true})}}
 return out}
const stkInfoLine=w=>{const cs=stkHan(w);const miss=cs.filter(c=>!STK_SET.has(c));const n=cs.reduce((a,c)=>a+(STK_CNT[c]||0),0);return miss.length===cs.length?'ยังไม่มีข้อมูล':`${cs.length} ตัว · ${n} ขีด${miss.length?` · ${miss.length} ตัวยังไม่มีข้อมูล`:''}`};
function stkRow(r){const w=r.w,e=r.e;const fs=w.length>3?18:w.length>2?22:w.length>1?28:38;const cs=stkHan(w),miss=cs.filter(c=>!STK_SET.has(c)).length;
 return `<button class="stk-row press" data-stk="${w}" aria-label="ดูลำดับขีด ${w}"><span class="gl zh" style="font-size:${fs}px">${w}</span><span class="tx"><b><span class="zh">${w}</span>${e?` <span class="py">${pyHtml(e.py)}</span>`:''}</b><span class="th">${e?e.th:'คำที่คุณพิมพ์ · ไม่อยู่ในบทเรียน (ค้นด้วยภาษาไทยไม่ได้)'}</span><small class="${miss?'bad':''}">${stkInfoLine(w)}${e?` · <i class="lv">ระดับ ${e.lv}</i>`:''}</small></span><span class="pc" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.2-4.2L16.6 4.4a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8z"/></svg></span></button>`}
function stkDaily(){const lv=curLv();const P0=ALLW.filter(e=>e.lv===lv&&stkHan(e.zh).length===1&&e.zh.length===1&&stkHan(e.zh).every(c=>STK_SET.has(c)));const pool=P0.length>=5?P0:ALLW.filter(e=>e.lv<=lv&&stkHan(e.zh).length&&stkHan(e.zh).length===1&&e.zh.length===1&&stkHan(e.zh).every(c=>STK_SET.has(c)));if(!pool.length)return null;return pool[(today()*7919)%pool.length]}
function stkAppChars(){const s=new Set();ALLW.forEach(e=>stkHan(e.zh).forEach(c=>s.add(c)));LESSONS.forEach(l=>l.words.forEach(e=>stkHan(e.ex||'').forEach(c=>s.add(c))));return [...s].filter(c=>STK_SET.has(c))}
function stkHomeSearch(){const n='';return `<button class="stk-hs press" data-go="stkfocus" aria-label="เขียนทีละขีด ค้นหาคำหรือตัวอักษร"><span class="m">${M('brush')}</span><span class="t"><b>เขียนทีละขีด <i>ใหม่</i></b><small>ดูลำดับขีดเคลื่อนไหว · ลากนิ้วฝึกเขียน</small><span class="f"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>พิมพ์คำหรือตัวจีน เช่น 谢谢 · 你好</span></span></button>`}
function stkHomeCard(){const dw=stkDaily();if(!dw)return '';const k=stkS();return `<div class="cap stk-hmlab">ตัวอักษรประจำวัน · เขียนทีละขีด</div><button class="stk-daily hm press" data-stk="${dw.zh}" aria-label="ดูลำดับขีด ${dw.zh}"><span class="g zh ${typeof picHas==='function'&&picHas(dw)?'wp':''}">${typeof picHas==='function'&&picHas(dw)?art('word',dw.zh,'','stk-pic')+'<i class="zh">'+dw.zh+'</i>':dw.zh}</span><span class="t"><b>${pyHtml(dw.py)}</b><span>${dw.th}</span><small>${stkInfoLine(dw.zh)}${k.n?' · เขียนผ่านแล้ว '+k.n+' ตัว':''}</small></span><span class="go">ดูเลย</span></button>`}
function stkEntry(){const k=stkS();return `<button class="stk-entry press" data-go="strokes"><span class="m">${M('brush')}</span><span class="t"><b>เขียนทีละขีด</b><small>ดูลำดับขีดเคลื่อนไหว · ลากนิ้วฝึกเขียน · ${STK_COV.length.toLocaleString('en-US')} ตัวอักษร</small></span>${CHEV}</button>`}
Object.assign(window.GOX=window.GOX||{},{strokes(){push('strokes',{})},stkfocus(){push('strokes',{focus:1})}});
SC.strokes=(p)=>{p=p||{};const k=stkS();const dw=stkDaily();const dt=new Date(today()*864e5);
 return {title:'เขียนทีละขีด',noRefresh:true,body:`<div class="stk-top"><div class="stk-tm">${M('brush')}</div><div><div class="large" style="padding:0">เขียนทีละขีด</div><p class="stk-sub">ค้นคำหรือตัวอักษรจีน แล้วดูลำดับขีดเคลื่อนไหว ฝึกลากนิ้วเขียนตาม</p></div></div>
 <div class="stk-sbar"><label class="stk-sf"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg><input id="stkq" type="search" enterkeyhint="search" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="ค้นหา 汉字 · พินอิน · ภาษาไทย" aria-label="ค้นหาคำหรือตัวอักษร"><button class="x" id="stkx" aria-label="ล้างคำค้น" hidden>✕</button></label><button class="stk-cancel" id="stkc" hidden>ยกเลิก</button></div>
 <div class="seg stk-seg" role="group" aria-label="ค้นด้วย" id="stkseg">${[['all','ทั้งหมด'],['zh','汉字'],['py','พินอิน'],['th','ไทย']].map((x,i)=>`<button data-m="${x[0]}" class="${i?'':'on'} ${x[0]==='zh'?'zh':''}">${x[1]}</button>`).join('')}</div>
 <div id="stkres"></div><div id="stkhome">${stkHomeHtml(k,dw,dt)}</div>`,
  mount(el){const q=$('#stkq',el),res=$('#stkres',el),hm=$('#stkhome',el),x=$('#stkx',el),cc=$('#stkc',el);let mode='all';if(p.focus)setTimeout(()=>{try{q.focus()}catch(e){}},420);
   const run=()=>{const v=q.value;x.hidden=cc.hidden=!v;if(!v){res.innerHTML='';hm.style.display='';return}hm.style.display='none';const rows=stkSearch(v,mode);
    res.innerHTML=rows.length?`<div class="sec stk-sec" style="margin-top:14px">${rows.length} ผลลัพธ์${rows.length>=40?' (แสดง 40 รายการแรก)':''}</div><div class="stk-list">${rows.map(stkRow).join('')}</div>`:`<div class="stk-empty" style="margin-top:20px">${M('empty')}<div class="h2" style="padding:0">ไม่พบ “${v.replace(/[<>&]/g,'')}”</div><p class="cap" style="margin:8px 10px 0;font-size:14.5px;color:var(--sub2)">ค้นภาษาไทยได้เฉพาะคำที่อยู่ในบทเรียนของเรา · อยากดูตัวอื่น ลองพิมพ์ตัวจีน (汉字) ตรงๆ ได้เลย</p></div>`};
   q.oninput=run;x.onclick=()=>{q.value='';run();q.focus()};cc.onclick=()=>{q.value='';run();q.blur()};
   q.onkeydown=ev=>{if(ev.key==='Enter'){const h=stkHan(q.value);if(h.length&&!stkSearch(q.value,'zh').length)return;const f=res.querySelector('.stk-row');if(f&&/\p{Script=Han}/u.test(q.value))f.click();q.blur()}};
   $$('#stkseg [data-m]',el).forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('#stkseg [data-m]',el).forEach(y=>y.classList.toggle('on',y===b));run();vib(5)});
   $$('[data-sug]',el).forEach(b=>b.onclick=()=>{stkOpen(b.dataset.sug)});
   const off=$('#stkoff',el);if(off)off.onclick=()=>stkOffline(off)}}};
function stkHomeHtml(k,dw,dt){const chip=w=>`<button class="stk-chipw press zh" data-stk="${w}" aria-label="ดูลำดับขีด ${w}">${w}</button>`;
 const sug=ALLW.filter(e=>e.lv===curLv()&&stkHan(e.zh).length<=2&&stkHan(e.zh).length>0).slice(0,12).map(e=>e.zh);
 return `${k.rec.length?`<div class="sec stk-sec">ค้นหาล่าสุด</div><div class="stk-chips2">${k.rec.map(chip).join('')}</div>`:''}
 ${k.fav.length?`<div class="sec stk-sec">★ ที่บันทึกไว้</div><div class="stk-chips2">${k.fav.map(chip).join('')}</div>`:''}
 ${dw?`<div class="sec stk-sec">ตัวอักษรประจำวัน · วันที่ ${dt.getUTCDate()} ${stkMonth[dt.getUTCMonth()]}</div><button class="stk-daily press" data-stk="${dw.zh}"><span class="g zh">${dw.zh}</span><span class="t"><b>${pyHtml(dw.py)}</b><span>${dw.th}</span><small>${stkInfoLine(dw.zh)} · ระดับ ${dw.lv}</small></span><span class="go">ดูเลย</span></button>`:''}
 <div class="sec stk-sec">ลองดูคำในระดับ ${curLv()}</div><div class="stk-chips2">${sug.map(chip).join('')}</div>
 ${k.n?`<div class="stk-stat card"><div><b>${k.n}</b><small>ตัวที่เขียนผ่านแล้ว</small></div><div><b>${k.days||0}</b><small>วันเขียนต่อเนื่อง</small></div><div><b>${Object.keys(k.done).length}</b><small>คำที่ฝึกแล้ว</small></div></div>`:''}
 <div class="group mt16">${ROW('#EAF1FB','💾','เก็บตัวอักษรไว้ใช้ออฟไลน์','ดาวน์โหลดทุกตัวในบทเรียน (≈ 5 MB)'+(k.off?' · เก็บแล้ว':''),'<span class="cap" id="stkoffs"></span>','id="stkoff"')}
 ${ROW('#FDF3E6','ℹ️','ที่มาของข้อมูลและเครดิต','Arphic · Make Me a Hanzi · Hanzi Writer','', 'data-go="stkcredits"')}</div>
 <p class="cap" style="padding:10px 24px 0;line-height:1.5">ข้อมูลจาก hanzi-writer-data ${STK_COV.length.toLocaleString('en-US')} ตัว (ตัวย่อตามตารางมาตรฐาน ตัวเต็มที่ใช้บ่อย และตัวข้าง/ส่วนประกอบ · ตัวอักษรทุกตัวในบทเรียนมีครบ · ตัวที่ไม่มีในแหล่งเปิดจะแสดง “ยังไม่มีข้อมูล” ไม่เดาเอง) · ชื่อขีดภาษาไทยเป็นร่าง รอครูตรวจ · ค้นด้วยภาษาไทยได้เฉพาะคำที่อยู่ในบทเรียน</p>`}
async function stkOffline(b){const k=stkS();const cs=stkAppChars();const st=$('#stkoffs');if(b.dataset.busy)return;b.dataset.busy=1;let i=0,fail=0;const t0=Date.now();
 const worker=async()=>{while(i<cs.length){const c=cs[i++];const d=await stkLoad(c);if(d.err)fail++;if(st)st.textContent=Math.round(i/cs.length*100)+'%'}};
 await Promise.all([worker(),worker(),worker(),worker()]);b.dataset.busy='';
 if(fail)toast('โหลดไม่ครบ '+fail+' ตัว · ลองใหม่เมื่อออนไลน์');else{k.off=Date.now();save();toast('เก็บ '+cs.length+' ตัวไว้ในเครื่องแล้ว ✓')}if(st)st.textContent=fail?'':'✓'}
Object.assign(window.GOX,{stkcredits(){push('stkcredits',{})}});
SC.stkcredits=()=>({title:'ที่มาของข้อมูลลำดับขีด',body:`<div class="large">ที่มาและเครดิต</div>
 <div class="card pad2" style="margin:0 20px 12px;font-size:14.5px;line-height:1.55"><b>เขียนทีละขีด</b> ใช้ข้อมูลเปิดต่อไปนี้ — เราดัดแปลงรูปแบบไฟล์และเพิ่มข้อมูลของเราเอง จึงขอแจ้งไว้ชัดเจนตามสัญญาอนุญาตของแต่ละแหล่ง</div>
 ${[['hanzi-writer-data 2.0.1','David Chanin · เส้นขีดและเส้นกลางขีดของ '+STK_COV.length.toLocaleString('en-US')+' ตัว','Arphic Public License (ข้อมูลฟอนต์ © 1999 Arphic Technology Co., Ltd.)'],
 ['Make Me a Hanzi','Shaunak Kishore · การแยกส่วนประกอบ รากอักษร พินอิน','Arphic Public License + LGPL-3 (โค้ด)'],
 ['Hanzi Writer 3.7.3','David Chanin · ตรวจเส้นที่ลากตอนฝึกเขียน','MIT'],
 ['cnchar-order','theajack · ชื่อชนิดขีดภาษาจีน (横 竖 撇 点…)','MIT']].map(r=>`<div class="card pad2" style="margin:0 20px 10px"><b>${r[0]}</b><div style="font-size:14px;color:var(--sub2);margin-top:3px">${r[1]}</div><div class="cap" style="margin-top:6px">สัญญา: ${r[2]}</div></div>`).join('')}
 <div class="card pad2" style="margin:0 20px 10px;font-size:14px;line-height:1.55"><b>การดัดแปลงที่เราทำ</b><br>• แปลงเป็นไฟล์ JSON หนึ่งไฟล์ต่อตัวอักษร เพิ่มตัวเต็ม ตัวข้าง/ส่วนประกอบ และตัวที่ใช้บ่อยนอกตาราง เฉพาะที่แหล่งเปิดมีข้อมูลจริง (รวม 9,485 ตัว)<br>• เพิ่มชนิดขีด ส่วนประกอบ และบทบาท (ราก / ออกเสียง) ต่อแต่ละขีด<br>• ชื่อขีดภาษาไทยและคำอธิบายทิศทางเป็น <i class="stk-draft">${STK_DRAFT}</i><br>• ขีดที่ชื่อกำกวมในแหล่งข้อมูล ตัดสินด้วยกฎรูปทรง — ยังไม่ผ่านครูตรวจ<br>• ตัวที่ไม่มีข้อมูล แอปบอกตรงๆ ว่า “ยังไม่มีข้อมูล” ไม่เดาเอง</div>
 <p class="cap" style="padding:6px 28px 0;line-height:1.5">ข้อความสัญญาเต็มและประกาศการดัดแปลงอยู่ในโฟลเดอร์ <code>data/stroke/</code> (<a href="data/stroke/ARPHICPL.TXT" target="_blank" rel="noopener">ARPHICPL.TXT</a>, <a href="data/stroke/LGPL-3.0.txt" target="_blank" rel="noopener">LGPL-3.0.txt</a>, <a href="data/stroke/NOTICE.md" target="_blank" rel="noopener">NOTICE.md</a>) และ <code>vendor/</code> ของเว็บนี้ · การฝึกเขียนเก็บเฉพาะในเครื่องของคุณ ไม่ส่งภาพลายมือไปที่ใด</p>`});
/* ================= ฝึกเขียนตามขีด ================= */
let STK_HWP=null;
function stkLoadHW(){return window.HanziWriter?Promise.resolve():STK_HWP||(STK_HWP=new Promise((res,rej)=>{const s=document.createElement('script');s.src='vendor/hanzi-writer.min.js';s.onload=res;s.onerror=()=>{STK_HWP=null;rej(new Error('hw'))};document.head.appendChild(s)}))}
const STK_OK=['ขีดนี้สวยเลย!','ถูกต้อง!','เยี่ยม ต่อไปเลย','นิ้วนิ่งมาก!','ใช่เลย ลำดับถูกด้วย'],STK_BAD=['ลองใหม่อีกที เริ่มจากจุดแดงนะ','ใกล้แล้ว! ดูทิศทางลูกศร','ไม่เป็นไร ค่อยๆ ลาก','ลำดับขีดนี้สำคัญนะ ลองขีดอื่นดู'];
SC.strokeprac=(p)=>{const info=stkWord(p.w);const chars=info.cs;
 return {noRefresh:true,nav:`<header class="nav stk-vnav"><div class="nav-l"><button class="back" data-act="back">${BACKI}<span>ออก</span></button></div><div class="nav-t" style="opacity:1;transform:none">ฝึกเขียน <span class="zh">${p.only>=0?chars[p.only]:p.w}</span></div><div class="nav-r"><span class="stk-chip" id="pchip">…</span></div></header>`,
  body:`<div class="stk-pp" id="stkp"><div class="stk-sk" style="height:18px"></div><div class="stk-sk" style="height:72px;margin-top:12px"></div><div class="stk-sk" style="height:300px;margin-top:12px"></div></div><p class="rd-draft">ชื่อขีดและคำอธิบายภาษาไทยเป็นร่าง รอครูตรวจ</p>`,
  unmount(){if(STK_PR.stop)STK_PR.stop()},
  mount(el){const root=$('#stkp',el);STK_PR.stop=null;
   Promise.all([stkLoadAll(info.cs),stkLoadHW().then(()=>1,()=>0)]).then(([datas,hw])=>{
    if(!hw){root.innerHTML=stkNetErr();$('#stkretry',root).onclick=()=>{replace('strokeprac',p)};return}
    if(datas.some(d=>d.err==='net')){root.innerHTML=stkNetErr();$('#stkretry',root).onclick=()=>replace('strokeprac',p);return}
    const idxs=(p.only>=0?[p.only]:chars.map((c,i)=>i)).filter(i=>!datas[i].err);if(!idxs.length){root.innerHTML=stkEmpty(p.w,'ยังไม่มีข้อมูลสำหรับฝึกเขียน');return}
    stkPractice(el,root,info,datas,idxs,p)})}}};
const STK_PR={stop:null};
function stkPractice(el,root,info,datas,idxs,p){const w=info.w;const k=stkS();let mode=k.mode;
 const SZ=Math.max(210,Math.min(Math.floor(root.clientWidth||el.clientWidth-40),380,(el.clientHeight||844)-450)),PAD=Math.round(SZ*.07);const sc=(SZ-2*PAD)/1024,pu=PAD/sc;
 const total=idxs.reduce((a,i)=>a+datas[i].strokes.length,0);
 let pos=0,sn=0,mis=0,misChar=0,okc=0,consec=0,hints=0,t0=Date.now(),writer=null,alive=true,done=false,perChar=[],mt=0,pillT=0,ovT=0,raf=0;
 const cur=()=>datas[idxs[pos]],cc=()=>info.cs[idxs[pos]];
 root.innerHTML=`<div class="stk-prog" id="pprog" role="progressbar" aria-label="ความคืบหน้า"></div>
 <div class="stk-coach"><div class="cm" id="pmas">${M('write')}</div><div class="bub" id="pbub"></div></div>
 <div class="stk-pc" id="pcv" style="width:${SZ}px;height:${SZ}px"><div class="gridbg"></div><div id="pw" class="pw"></div><svg class="ov" id="pov" viewBox="${-pu} ${-pu} ${SZ/sc} ${SZ/sc}" aria-hidden="true"></svg><div class="stk-pill" id="ppill" role="status" aria-live="polite"></div>${idxs.length>1?`<span class="stk-cc" id="pcc"></span>`:''}</div>
 <div class="stk-tiles"><div><b id="tk">0/0</b><small>ขีดที่ถูก</small></div><div><b id="tm">0</b><small>พลาด</small></div><div><b id="ts">⭐⭐⭐</b><small>ดาวตอนนี้</small></div></div>
 <div class="seg stk-mode" id="pmode" role="group" aria-label="โหมดฝึก">${[['guide','มีเส้นนำ'],['free','ไม่มีเส้นนำ'],['hard','ท้าทาย']].map(x=>`<button data-md="${x[0]}" class="${mode===x[0]?'on':''}">${x[1]}</button>`).join('')}</div>
 <div class="stk-acts"><button class="press" id="pback"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>ย้อนขีด</button><button class="press" id="phint"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>ใบ้</button><button class="press" id="pdemo"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2z"/></svg>ดูตัวอย่าง</button><button class="press" id="prst"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>เริ่มใหม่</button></div>
 <p class="cap center" style="margin-top:12px;padding:0 20px" id="pnote"></p>`;
 STK_PR.stop=()=>{alive=false;cancelAnimationFrame(raf);clearTimeout(mt);clearTimeout(pillT);clearTimeout(ovT);try{writer&&writer.cancelQuiz()}catch(e){}};
 const $$p=s=>root.querySelector(s);const bub=(a,b)=>{$$p('#pbub').innerHTML=`<b>${a}</b>${b?`<small>${b}</small>`:''}`};
 const pose=(n,ms=1700)=>{$$p('#pmas').innerHTML=M(n);clearTimeout(mt);if(ms)mt=setTimeout(()=>{if(alive&&!done)$$p('#pmas').innerHTML=M('write')},ms)};
 const stN=()=>{const d=cur();const t=stkTypeOf(d,sn);return t?`<span class="zh">${t[0]}</span> ${t[2]}`:'ขีดที่ '+(sn+1)};
 function ui(){const d=cur(),n=d.strokes.length;const pg=$$p('#pprog');pg.innerHTML=d.strokes.map((_,i)=>`<i class="${i<sn?'on':i===sn?'cur':''}"></i>`).join('');pg.setAttribute('aria-valuenow',sn);pg.setAttribute('aria-valuemax',n);
  $('#pchip',el).textContent=`ขีด ${Math.min(sn+1,n)}/${n}`;$$p('#tk').textContent=sn+'/'+n;$$p('#tm').textContent=mis;$$p('#ts').textContent=stkStarTxt(stkStars(mis,total));
  const pc=$$p('#pcc');if(pc)pc.textContent=`ตัวที่ ${pos+1}/${idxs.length} · ${cc()}`;
  $$p('#pnote').textContent=mode==='hard'?'โหมดท้าทาย: ไม่มีเส้นนำ ไม่มีตัวช่วย — ได้ดาวตามจำนวนที่พลาด':mode==='free'?'ไม่มีเส้นนำ · จำรูปตัวอักษรแล้วลากตามลำดับขีดเอง':'จุดแดงคือจุดเริ่มขีด · ลากตามลูกศร'; 
  $$p('#phint').disabled=$$p('#pdemo').disabled=mode==='hard';$$p('#pback').disabled=sn===0;ovGuide()}
 function ovClear(){const o=$$p('#pov');if(o)o.innerHTML='';cancelAnimationFrame(raf)}
 function ovGuide(force){ovClear();if(done)return;if(mode!=='guide'&&!force)return;const d=cur();if(sn>=d.strokes.length)return;const m=d.medians[sn];const a=m[0];let b=m[Math.min(m.length-1,Math.max(1,Math.floor(m.length/3)))];let dx=b[0]-a[0],dy=b[1]-a[1];const n=Math.hypot(dx,dy)||1;dx/=n;dy=-dy/n;const x0=a[0],y0=900-a[1];const L=130,x1=x0+dx*L,y1=y0+dy*L;
  const ang=Math.atan2(y1-y0,x1-x0),hs=34;const h=[[x1,y1],[x1-Math.cos(ang-.5)*hs,y1-Math.sin(ang-.5)*hs],[x1-Math.cos(ang+.5)*hs,y1-Math.sin(ang+.5)*hs]];
  $$p('#pov').innerHTML=`<path d="M${x0} ${y0}L${x1} ${y1}" stroke="${STK_RED}" stroke-width="12" stroke-linecap="round" opacity=".55"/><polygon points="${h.map(q=>q.join(',')).join(' ')}" fill="${STK_RED}" opacity=".7"/><circle cx="${x0}" cy="${y0}" r="46" fill="${STK_RED}" opacity=".18" class="stk-pulse"/><circle cx="${x0}" cy="${y0}" r="26" fill="${STK_RED}" stroke="#fff" stroke-width="7"/>`}
 function demo(){ovClear();const d=cur();const dm=d.medians[sn];if(!dm)return;const Lm=Math.round(dm.reduce((a,q,j)=>j?a+Math.hypot(q[0]-dm[j-1][0],q[1]-dm[j-1][1]):0,0)+90);
  $$p('#pov').innerHTML=`<defs><mask id="dmk" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1500" height="1500"><path id="dmp" d="${stkMed(dm)}" fill="none" stroke="#fff" stroke-width="190" stroke-linecap="round" stroke-dasharray="${Lm} ${Lm}" stroke-dashoffset="${Lm}"/></mask></defs><g mask="url(#dmk)"><path d="${d.strokes[sn]}" fill="${STK_RED}" opacity=".8" transform="translate(0,900) scale(1,-1)"/></g>`;
  const t1=performance.now(),dur=900;const f=ts=>{const q=Math.min(1,(ts-t1)/dur);const e=1-Math.pow(1-q,2);const el2=$$p('#dmp');if(!el2)return;el2.setAttribute('stroke-dashoffset',Lm*(1-e));if(q<1)raf=requestAnimationFrame(f);else ovT=setTimeout(()=>{if(alive)ovGuide()},700)};raf=requestAnimationFrame(f)}
 const pill=t=>{const e=$$p('#ppill');e.textContent=t;e.classList.add('on');clearTimeout(pillT);pillT=setTimeout(()=>e.classList.remove('on'),1400)};
 function startQuiz(from){if(!alive)return;sn=from;const d=cur();const hard=mode==='hard';
  writer.cancelQuiz();mode==='guide'?writer.showOutline():writer.hideOutline();
  writer.quiz({quizStartStrokeNum:from,leniency:hard?.85:1.15,showHintAfterMisses:hard?false:3,highlightOnComplete:false,
   onCorrectStroke(r){if(!alive)return;sn=r.strokeNum+1;okc++;consec++;const t=stkTypeOf(d,r.strokeNum);pill(`✓ ขีดที่ ${r.strokeNum+1} · ${t?t[0]+' '+t[2]:''}`.trim());vib(10);
    const last=sn>=d.strokes.length;pose(consec>=3?'cheer':'correct');bub(consec>=3?`ต่อเนื่อง ${consec} ขีดแล้ว!`:STK_OK[(okc+r.strokeNum)%STK_OK.length],last?'':'ขีดถัดไป · '+stN());ui()},
   onMistake(r){if(!alive)return;mis++;misChar++;consec=0;vib([12,40,12]);const c=$$p('#pcv');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');
    pose(r.mistakesOnStroke>=2?'think':'wrong',2200);bub(STK_BAD[(mis)%STK_BAD.length],r.mistakesOnStroke>=3&&!hard?'ลองดูเส้นใบ้ที่ขึ้นมา':'ขีดที่ '+(sn+1)+' · '+stN());ui()},
   onComplete(r){if(!alive)return;perChar.push({c:cc(),mis:misChar});misChar=0;if(pos+1<idxs.length){pose('cheer',1200);bub(`ตัว ${cc()} ครบแล้ว!`,'ไปตัวต่อไปกัน');setTimeout(()=>{if(!alive)return;pos++;consec=0;writer.setCharacter(cc());sn=0;ui();startQuiz(0);bub('ตัวต่อไป '+cc(),'ขีดแรก · '+stN())},950)}else finish()}});
  ui()}
 function finish(){done=true;ovClear();const secs=Math.max(1,Math.round((Date.now()-t0)/1000));const stars=stkStars(mis,total);const k=stkS();
  const rd=k.rd&&k.rd.day===today()?k.rd:(k.rd={day:today(),ws:[]});const first=!rd.ws.includes(w);let xp=0,coins=0;
  if(first){rd.ws.push(w);xp=5*stars;coins=stars;k.n+=idxs.length;}
  if(k.last!==today()){k.days=k.last===today()-1?k.days+1:1;k.last=today()}
  const prev=k.done[w]||{stars:0};k.done[w]={stars:Math.max(prev.stars,stars),at:today()};save();if(xp)addXp(xp);if(coins)addCoins(coins);bumpCnt('stroke',1);
  pose('celebrate',0);bub('ครบแล้ว! '+stkStarTxt(stars),'');pill('✓ เขียนครบทั้งหมด');
  setTimeout(()=>{if(alive)replace('strokeres',{w,only:p.only,cs:idxs.map(i=>info.cs[i]),strokes:total,mis,secs,stars,xp,coins,first,days:k.days})},900)}
 /* ปุ่มต่างๆ */
 $$p('#pback').onclick=()=>{if(sn<=0)return;vib(6);okc=Math.max(0,okc-1);consec=0;startQuiz(sn-1);bub('ย้อนกลับมาขีดที่ '+(sn),'ลองเขียนอีกครั้ง · '+stN());ui()};
 $$p('#phint').onclick=()=>{if(mode==='hard')return;hints++;vib(8);ovGuide(true);bub('ใบ้: เริ่มที่จุดแดง','ขีด '+(sn+1)+' · '+stN());clearTimeout(ovT);if(mode!=='guide')ovT=setTimeout(()=>{if(alive)ovGuide()},3200)};
 $$p('#pdemo').onclick=()=>{if(mode==='hard')return;vib(6);demo();bub('ดูตัวอย่างขีดที่ '+(sn+1),stN())};
 $$p('#prst').onclick=()=>{vib(8);mis=0;misChar=0;okc=0;consec=0;hints=0;perChar=[];t0=Date.now();pos=0;writer.setCharacter(cc());startQuiz(0);bub('เริ่มใหม่อีกที!','ขีดแรก · '+stN());pose('write',0)};
 $$('#pmode [data-md]',root).forEach(b=>b.onclick=()=>{mode=b.dataset.md;stkS().mode=mode;save();$$('#pmode [data-md]',root).forEach(x=>x.classList.toggle('on',x===b));vib(6);startQuiz(sn);bub(mode==='hard'?'โหมดท้าทาย!':mode==='free'?'ไม่มีเส้นนำแล้ว':'เปิดเส้นนำให้แล้ว','ขีดที่ '+(sn+1)+' · '+stN())});
 /* สร้างตัวเขียน */
 const create=()=>{const d=cur();writer=HanziWriter.create($$p('#pw'),cc(),{width:SZ,height:SZ,padding:PAD,showCharacter:false,showOutline:mode==='guide',outlineColor:'#E4D9CE',strokeColor:STK_INK,radicalColor:STK_RAD,drawingColor:STK_RED,drawingWidth:Math.max(10,Math.round(SZ/22)),highlightColor:STK_RED,strokeAnimationSpeed:1,strokeFadeDuration:200,drawingFadeDuration:300,showHintAfterMisses:3,
  charDataLoader:(c,ok,bad)=>{stkLoad(c).then(x=>x.err?bad():ok(x))}});
  window.__stkW=writer;bub(`ลากเขียน ${cc()} ทีละขีดตามลำดับ`,'ขีดแรก · '+stN());startQuiz(0)};
 create();window.__stkP={get sn(){return sn},get mis(){return mis},get pos(){return pos},mode:()=>mode}}
/* ================= ผลสรุป + การ์ด LINE ================= */
function stkShareData(r){const e=wordBy(r.w);const datas=r.cs.map(c=>STK_DATA[c]).filter(Boolean);
 return {text:`ฉันเขียน ${r.w} ได้ครบแล้ว!`,sub:`${r.strokes} ขีด · ${r.mis?'พลาด '+r.mis+' ครั้ง':'ไม่พลาดเลย'} · ใช้เวลา ${r.secs} วินาที`,
  stats:[[r.xp?`+${r.xp}`:'–','XP'],[r.coins?`+${r.coins}`:'–','เหรียญ'],[`${r.days} วัน`,'เขียนต่อเนื่อง']],glyph:{datas,cs:r.cs,w:r.w,py:e?e.py:'',th:e?e.th:'',stars:r.stars}}}
async function stkDrawCard(c,g,x,y,w,h,TH,F){c.save();c.fillStyle=TH.sb;rr(c,x,y,w,h,32);c.fill();
 let ds=(g.datas||[]);if(!ds.length&&g.cs)ds=(await Promise.all(g.cs.slice(0,3).map(stkLoad))).filter(x=>x&&!x.err);ds=ds.slice(0,3);const n=Math.max(1,ds.length);const cell=Math.min(h-36,Math.floor((w*.62-(n-1)*12)/n));let cx=x+20;const cy=y+(h-cell)/2;
 ds.forEach(d=>{c.fillStyle='#fff';rr(c,cx,cy,cell,cell,22);c.fill();c.strokeStyle='rgba(200,16,46,.28)';c.lineWidth=2;c.stroke();
  c.save();c.beginPath();rr(c,cx,cy,cell,cell,22);c.clip();c.strokeStyle='rgba(200,16,46,.16)';c.setLineDash([8,8]);c.beginPath();c.moveTo(cx+cell/2,cy+8);c.lineTo(cx+cell/2,cy+cell-8);c.moveTo(cx+8,cy+cell/2);c.lineTo(cx+cell-8,cy+cell/2);c.stroke();c.setLineDash([]);
  const sc=(cell*.9)/1024;c.translate(cx+cell*.05,cy+cell*.05+ (0));c.scale(sc,sc);c.translate(0,900);c.scale(1,-1);
  d.strokes.forEach((s,i)=>{const role=d.k&&d.cp&&d.cp[d.k[i]]?d.cp[d.k[i]][1]:null;c.fillStyle=role==='r'?STK_RAD:STK_INK;c.fill(new Path2D(s))});c.restore();cx+=cell+12});
 const tx=cx+14,tw=x+w-tx-18;c.textAlign='left';c.textBaseline='alphabetic';c.fillStyle=TH.t;c.font=`700 ${g.w.length>2?48:62}px "Noto Serif SC","Noto Serif CJK SC",serif`;c.fillText(g.w,tx,y+84,tw);
 c.fillStyle=TH.sl;c.font=`500 28px ${F}`;c.fillText((g.py||'').replace(/\|/g,''),tx,y+128,tw);c.fillStyle=TH.t;c.font=`600 28px ${F}`;wrapTxt(c,g.th||'',tx,y+176,tw,36,2);
 c.font=`600 40px ${F}`;c.fillStyle=TH.ac||'#D9822B';if(g.stars>0)c.fillText('★'.repeat(g.stars)+'☆'.repeat(3-g.stars),tx,y+h-30);c.restore()}
function stkNext(w){const cs=stkHan(w);if(cs.length===1){const d=STK_DATA[cs[0]];const q=d&&d.cp?d.cp.find(([c,r])=>r!=='r'&&c!==cs[0]&&STK_SET.has(c)&&c.length===1&&STK_CNT[c]>1):null;if(q)return {w:q[0],lab:`${cs[0]} → ${q[0]}`}}
 const i=ALLW.findIndex(e=>e.zh===w);for(let j=i+1;j<ALLW.length&&i>=0;j++){const e=ALLW[j];if(e.zh!==w&&stkHan(e.zh).length&&stkHan(e.zh).every(c=>STK_SET.has(c)))return {w:e.zh,lab:`${w} → ${e.zh}`}}return null}
SC.strokeres=(r)=>{r=r||{};if(!r.cs){const w=r.w||'你好';r={w,cs:stkHan(w),strokes:stkHan(w).reduce((a,c)=>a+(STK_CNT[c]||0),0),mis:0,secs:30,stars:3,xp:0,coins:0,first:false,days:stkS().days||0}}const e=wordBy(r.w);const nx=stkNext(r.w);const pose=r.stars>=3?'celebrate':r.stars===2?'cheer':'thumbs';
 return {title:'ผลการเขียน',backLabel:'กลับ',noRefresh:true,right:'',body:`<div class="stk-res"><div class="stk-burst"></div><div class="rm pop">${M(pose)}</div>
  <div class="large center" style="padding:6px 20px 0">เขียน <span class="zh">${r.w}</span> ได้ครบแล้ว!</div><div class="stk-bigstars" aria-label="${r.stars} ดาว">${stkStarTxt(r.stars)}</div>
  <p class="cap center" style="font-size:14.5px;color:var(--sub2)">${r.strokes} ขีด · ${r.mis?'พลาด '+r.mis+' ครั้ง':'ไม่พลาดเลย'} · ใช้เวลา ${r.secs} วินาที</p>
  <div class="stk-tiles res"><div><b>${r.xp?'+'+r.xp:'–'}</b><small>XP</small></div><div><b>${r.coins?'+'+r.coins:'–'}</b><small>เหรียญ</small></div><div><b>${r.days}</b><small>วันเขียนต่อเนื่อง</small></div></div>
  ${r.first?'':`<p class="cap center" style="margin-top:8px">วันนี้ได้รางวัลของคำนี้ไปแล้ว · เขียนซ้ำเพื่อฝึกได้เลย พรุ่งนี้รับรางวัลได้อีก</p>`}
  <div class="cardprev" id="rcard" style="margin:14px 20px 0"><div class="cpl">กำลังสร้างการ์ด…</div></div>
  <div style="padding:14px 20px 0;display:flex;flex-direction:column;gap:10px"><button class="pill row1 linebtn press" id="rshare"><span style="display:inline-flex;margin-right:8px">${svg('<path d="M21 11.5C21 7.4 16.97 4 12 4S3 7.4 3 11.5c0 3.6 3.2 6.6 7.5 7.4.3.1.7.2.8.5.1.3.1.7 0 1l-.1.8c0 .3-.2 1.1 1 .6 1.2-.5 6.4-3.8 8.7-6.5 1.6-1.7 2.1-3.4 2.1-3.8z"/>',20)}</span>แชร์ไปที่ LINE</button>
  <button class="pill row1 ghost press" id="rsave">บันทึกรูป</button></div>
  <div class="stk-links"><button class="press" id="ragain">เขียนอีกครั้ง</button>${nx?`<button class="press" id="rnext">ตัวถัดไป <span class="zh">${nx.lab}</span></button>`:''}<button class="press" id="rview">ดูลำดับขีดอีกรอบ</button></div></div>`,
  mount(el){confetti(r.stars>=3?110:70);
   const sd=stkShareData(r);const draw=()=>renderCard(cardSpec('strokes',sd),S.cardTheme||'soft').then(cv=>{const b=$('#rcard',el);if(!b)return;b.innerHTML='';cv.style.cssText='width:100%;height:auto;display:block;border-radius:22px;box-shadow:0 8px 30px rgba(60,40,30,.14)';cv.setAttribute('role','img');cv.setAttribute('aria-label','การ์ดผลการเขียน '+r.w);b.appendChild(cv)});draw();
   $('#rshare',el).onclick=()=>shareSheet('strokes',sd);
   $('#rsave',el).onclick=async()=>{const cv=await renderCard(cardSpec('strokes',sd),S.cardTheme||'soft');const b=await cardBlob(cv);const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lama-strokes-'+stkHex(r.cs[0])+'.png';a.click();toast('บันทึกรูปการ์ดแล้ว')};
   $('#ragain',el).onclick=()=>replace('strokeprac',{w:r.w,only:r.only!=null?r.only:-1});
   const rn=$('#rnext',el);if(rn)rn.onclick=()=>replace('stroke',{w:nx.w});
   $('#rview',el).onclick=()=>replace('stroke',{w:r.w,ci:r.only>=0?r.only:undefined})}}};

/* ตรวจเวอร์ชันใหม่หลังดีพลอย: เทียบ window.APP_VER (ใส่โดย build.js) กับ version.json แล้วรีโหลดครั้งเดียว กันผู้ใช้ค้างหน้าเก่า (แคชของ GitHub Pages 10 นาที) */
(function(){if(location.protocol==='file:'||!window.APP_VER||!window.fetch)return;
 fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(j=>{if(!j||!j.v||j.v===window.APP_VER)return;const k='lama-ver-reload';try{if(sessionStorage.getItem(k)===j.v)return;sessionStorage.setItem(k,j.v)}catch(e){return}location.reload()}).catch(()=>{})})();
