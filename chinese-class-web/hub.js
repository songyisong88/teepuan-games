/* คลังคำน่ารู้ — ส่วนบนของแท็บแหล่งความรู้ (ซ้งอี้อนุมัติตามภาพ A B C · 8 ชุดแรก)
   เนื้อหาอยู่ใน data/hub.js · ระดับของคำคำนวณจากคำในบทเรียน (ตัวอักษรทุกตัวต้องอยู่ในบทเรียน ใช้ระดับสูงสุดของตัวที่ประกอบ)
   "เรียนแล้ว" = ตัวอักษรทุกตัวอยู่ในคำที่ผู้เรียนรู้แล้ว (lbKnown) · ปุ่มฝึกใช้เฉพาะคำที่เรียนแล้ว และไม่แตะรอบทบทวน
   ปุ่มเก็บ = เพิ่มเข้ารายการ "คำที่ควรทบทวน" เดิม (S.srs) · ชุดศัพท์โซเชียลเป็นแบบอ่านเล่น ไม่มีแบบฝึก */
const HB_SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
const HB_ORDER=['hit','num','net','tea','love','food','bless','tone'];/* ลำดับการ์ดตามภาพ A */
const HB_SETS=(()=>{const raw=window.HUB_SETS||[];return raw.map(s=>Object.assign({},s,{items:s.items.map((a,i)=>{const o=a[5]||{};return {s:s.id,i,zh:a[0],py:a[1],th:a[2],use:a[3],ex:(a[4]||[]).map(e=>({zh:e[0],py:e[1],th:e[2],say:e[3]||e[0]})),say:o.say||a[0],lw:o.lw||a[0],wk:o.wk||''}})}))})();
const hbSet=id=>HB_SETS.find(s=>s.id===id);
const hbHan=t=>[...String(t)].filter(c=>/\p{Script=Han}/u.test(c));
let _hbIdx=null;/* ตัวอักษร -> ระดับต่ำสุดที่เจอในบทเรียน · คำ -> คำในบทเรียน */
function hbIdx(){if(_hbIdx)return _hbIdx;const ch=new Map(),wd=new Map();LESSONS.forEach(l=>l.words.forEach(w=>{const lv=w.lv||l.lv||1;if(!wd.has(w.zh)||wd.get(w.zh).lv>lv)wd.set(w.zh,Object.assign({},w,{lv}));hbHan(w.zh).forEach(c=>{if(!ch.has(c)||ch.get(c)>lv)ch.set(c,lv)})}));return _hbIdx={ch,wd}}
function hbLv(it){if(it._lv!==undefined)return it._lv;const {ch}=hbIdx();const cs=hbHan(it.lw);let m=0;if(!cs.length)m=0;else for(const c of cs){if(!ch.has(c)){m=0;break}m=Math.max(m,ch.get(c))}return it._lv=m}/* 0 = มีตัวอักษรนอกบทเรียน */
/* แยกคำในบทเรียนที่อยู่ในคำนี้ (จับคำยาวสุดก่อน · ถ้าทั้งคำเป็นคำในบทเรียนเอง ให้แยกย่อยลงไป) */
function hbParts(it){const {wd}=hbIdx();const cs=hbHan(it.lw),out=[];const whole=cs.join('');let i=0;
 while(i<cs.length){let hit=null;for(let n=Math.min(4,cs.length-i);n>=1;n--){const t=cs.slice(i,i+n).join('');if(n===cs.length&&cs.length>1)continue;if(wd.has(t)){hit=wd.get(t);break}}
  if(!hit){let best=null;for(const w of wd.values())if(w.zh!==whole&&w.zh.includes(cs[i])&&(!best||[...w.zh].length<[...best.zh].length||([...w.zh].length===[...best.zh].length&&w.lv<best.lv)))best=w;if(best&&!out.some(w=>w.zh===best.zh))out.push(best);i++;continue}
  if(!out.some(w=>w.zh===hit.zh))out.push(hit);i+=hbHan(hit.zh).length}
 return out.filter(w=>w.zh!==whole||cs.length===1)}
const hbGloss=t=>String(t||'').split(/\s*[\/;(（]/)[0].replace(/,\s*/g,' ').trim();
function hbKnownCh(){const s=new Set();try{(typeof lbKnown==='function'?[...lbKnown()]:gameWords().map(w=>w.zh)).forEach(z=>hbHan(z).forEach(c=>s.add(c)))}catch(e){}return s}
const hbLearned=(it,kc)=>{if(hbSet(it.s).browse)return false;const cs=hbHan(it.lw);return cs.length>0&&hbLv(it)>0&&cs.every(c=>kc.has(c))};
const hbTag=(it,kc,sty)=>{const st=sty?` style="${sty}"`:'';if(hbLearned(it,kc))return `<span class="hb-tag ok"${st}>เรียนแล้ว</span>`;const l=hbLv(it);return `<span class="hb-tag lv"${st}>${l?'ระดับ '+l:'นอกบทเรียน'}</span>`};
const hbKey=it=>it.say||it.zh;
/* คำที่เก็บไว้ทบทวน: ให้รายการทบทวนเดิมหาคำจากคลังได้ (ใช้ใน data.js ผ่าน wordAny) */
const _hbW={};window.hubWord=zh=>{if(_hbW[zh])return _hbW[zh];for(const s of HB_SETS)for(const it of s.items)if(it.zh===zh){const l=hbLv(it)||s.lv||1;return _hbW[zh]={zh:it.zh,py:it.py,th:it.th,lv:l,hub:1}}return null};
/* เก็บคำ → สมุดคำของฉัน (notebook-data.js) · เดิมเก็บเข้ารอบทบทวน S.srs (คำที่เคยเก็บไว้ย้ายเข้าสมุดอัตโนมัติ) */
const hbSaved=it=>typeof nbHas==='function'&&nbHas(it.zh);
function hbSave(it){if(typeof nbAdd==='function')nbAdd(it.zh,{py:it.py,th:it.th},'คลัง'+((hbSet(it.s)||{}).t||''))}
/* คำประจำสัปดาห์: หมุนทุกวันจันทร์ · สัปดาห์ที่เปิดตัว (26 ต.ค. 2026) เริ่มที่ 520 */
const HB_WM={'520':'爱','1314':'久','88':'别','666':'牛','555':'哭','yyds':'神'};
function hbWeekPool(){const lists=HB_ORDER.map(id=>{const s=hbSet(id);if(!s)return [];const a=s.items.filter(x=>x.wk);return s.browse?a:[...a,...s.items.filter(x=>!x.wk).slice(0,4)]});
 const pool=[];const start=HB_ORDER.indexOf('num');for(let r=0;r<12;r++)for(let k=0;k<lists.length;k++){const L=lists[(start+k)%lists.length];if(L[r])pool.push(L[r])}return pool}
function hbWeek(){const pool=hbWeekPool();if(!pool.length)return null;const wk=d=>Math.floor((d+3)/7);const w0=wk(Math.floor(Date.UTC(2026,9,26)/864e5));const n=pool.length;return pool[(((wk(today())-w0)%n)+n)%n]}
const hbZt=(t,bg,fs,extra)=>`<span class="zh hb-zt" style="background:${bg};${fs?`font-size:${fs}px;`:''}${extra||''}">${t}</span>`;
const hbPic=id=>`<span class="kn-pic">${art('word',id,id,'kn-art zh')}</span>`;
/* ปกชุด: ภาพจาก PIXEL (assets/art/hub/) ในช่องเดิมขนาดเดิม · ถ้าไม่มีภาพใช้ป้ายตัวอักษรเดิม */
const hbCov=(f,fb)=>()=>window.ART_IDX&&ART_IDX['hub/'+f]?`<span class="kn-pic">${art('hub',f,'','kn-art')}</span>`:fb();
const HB_VIS={hit:hbCov('kamhit',()=>hbZt('没事','#C8102E',26)),num:hbCov('tualek',()=>`<span class="kn-row">${hbZt('520','#E0457B',22)}${hbZt('88','#3D6FB6',22,'margin-left:6px')}</span>`),net:hbCov('social',()=>hbZt('yyds','#7B5CC4',24,'font-family:Inter,sans-serif')),
 tea:()=>hbPic('奶茶'),love:()=>hbPic('爱'),food:hbCov('ahanthai',()=>hbPic('米饭')),bless:hbCov('uayporn',()=>hbPic('红包')),tone:hbCov('phudphid',()=>`<span class="kn-row">${hbZt('问','#3D6FB6',26)}${hbZt('吻','#C8102E',26,'margin-left:6px')}</span>`)};
const hbIsLatin=t=>!hbHan(t).length;
function hbHubHtml(){const w=hbWeek();let feat='';
 if(w){const s=hbSet(w.s);const big=w.zh,len=[...big].length,lat=hbIsLatin(big);const fs=lat?40:len<=4?40:len<=6?32:26;
  feat=`<div class="hb-feat press" data-go="hubw" data-c="${w.s}" data-i="${w.i}" role="button" aria-label="คำประจำสัปดาห์ ${big}"><span class="wm zh">${HB_WM[w.zh]||hbHan(w.zh)[0]||''}</span><div style="flex:1;min-width:0;position:relative"><small>คำประจำสัปดาห์ · ${s.t}</small><div class="big${lat?'':' zh'}" style="font-size:${fs}px">${big}</div><div class="py">${pyPlain(w.py)}</div><div class="th">${w.wk||w.th}</div></div><button class="say press" data-act="audio" data-t="${hbKey(w)}" aria-label="ฟังเสียง">${HB_SPK}</button></div>`}
 const cards=HB_ORDER.map(hbSet).filter(Boolean).map(s=>`<button class="kn-t press" style="background:${s.bg}" data-go="hubcol" data-c="${s.id}" aria-label="${s.t}"><span class="hb-lv">ระดับ ${s.lv}</span><span class="kn-v">${(HB_VIS[s.id]||(()=>''))()}</span><span class="kn-l">${s.t}</span><span class="kn-d">${s.d}</span></button>`).join('');
 return `${feat}<div class="hb-sh"><h3>คลังคำน่ารู้<small>คำที่คนจีนใช้จริง อ่านเล่นได้ทุกวัน</small></h3><button class="lk press" data-go="huball">ดูทั้งหมด</button></div>
 <div class="kn-grid">${cards}</div>
 <div class="hb-sh"><h3>ห้องฝึก<small>พินอิน ตัวอักษร การอ่าน และแบบทดสอบ</small></h3></div>`}
const hbSpin=n=>n>=3?5:n*2;/* จำนวนข้อฝึก */
/* ===== หน้า B: รายการคำในชุด ===== */
function hbRow(it,kc){const len=[...it.zh].length,lat=hbIsLatin(it.zh);const fs=lat?20:len<=3?22:len<=5?19:16;
 return `<div class="hb-row press" data-go="hubw" data-c="${it.s}" data-i="${it.i}" role="button"><span class="z${lat?'':' zh'}" style="font-size:${fs}px${lat?';font-family:Inter,sans-serif':''}">${it.zh}</span><span class="tx"><b>${it.th}${hbTag(it,kc)}</b><span class="p">${pyPlain(it.py)}</span></span><button class="hb-say press" data-act="audio" data-t="${hbKey(it)}" aria-label="ฟังเสียง">${HB_SPK}</button></div>`}
function hbFilter(s,f,kc){return s.items.filter(it=>f==='all'?true:f==='ok'?hbLearned(it,kc):f==='x'?hbLv(it)===0:hbLv(it)===+f)}
SC.hubcol=p=>{const s=hbSet(p.c)||HB_SETS[0];const kc=hbKnownCh();const ok=s.items.filter(it=>hbLearned(it,kc));const N=s.items.length;
 const lvs=[...new Set(s.items.map(hbLv).filter(Boolean))].sort((a,b)=>a-b);const hasX=s.items.some(it=>hbLv(it)===0);
 const chips=[['all','ทั้งหมด'],...(s.browse?[]:[['ok','เรียนแล้ว']]),...lvs.map(l=>[String(l),'ระดับ '+l]),...(hasX?[['x','นอกบทเรียน']]:[])];
 const prog=s.browse?`<div class="hb-prog"><span class="hb-tag lv" style="margin-left:0">อ่านเล่น</span><span>ความยากระดับ ${s.lv} ขึ้นไป · ${N} คำ</span></div>`:`<div class="hb-prog">เรียนแล้ว ${ok.length} จาก ${N} คำ<i><b style="width:${N?Math.round(ok.length/N*100):0}%"></b></i></div>`;
 const q=hbSpin(ok.length);
 const dock=s.browse?'':`<div class="dock">${ok.length?`<button class="pill press" style="height:56px" data-go="hubquiz" data-c="${s.id}">ฝึกคำที่เรียนแล้ว ${ok.length} คำ<small style="font-size:12px;font-weight:500;opacity:.85">ฟังแล้วเลือกความหมาย ${q} ข้อ</small></button>`:`<button class="pill press hb-off" style="height:56px" data-go="hubnone">ยังไม่มีคำที่เรียนแล้วในชุดนี้<small style="font-size:12px;font-weight:500;opacity:.85">เรียนบทเรียนต่อ คำจะเปิดให้ฝึกเอง</small></button>`}</div>`;
 return {title:s.t,noRefresh:true,body:`<div class="large">${s.t}</div><p class="cap" style="padding:8px 24px 0;line-height:1.55">${s.cap}</p>${prog}
 <div class="hb-chips" role="tablist">${chips.map(([k,t],i)=>`<button class="press${i?'':' on'}" data-hbf="${k}">${t}</button>`).join('')}</div>
 <div class="hb-grp" data-hbl>${s.items.map(it=>hbRow(it,kc)).join('')}</div><div style="height:${s.browse?40:120}px"></div>${dock}`,
 mount(el){el.addEventListener('click',e=>{const b=e.target.closest('[data-hbf]');if(!b)return;vib(6);el.querySelectorAll('[data-hbf]').forEach(x=>x.classList.toggle('on',x===b));const kc2=hbKnownCh();const list=hbFilter(s,b.dataset.hbf,kc2);
  const g=el.querySelector('[data-hbl]');g.innerHTML=list.length?list.map(it=>hbRow(it,kc2)).join(''):`<div class="hb-empty">ยังไม่มีคำในกลุ่มนี้</div>`})},unmount(){stopAudio()}}};
/* ===== หน้า C: รายละเอียดคำ (ปัดซ้าย/ขวาเพื่อเปลี่ยนคำ) ===== */
function hbWordBody(s,i,kc){const it=s.items[i];const N=s.items.length;const len=[...it.zh].length,lat=hbIsLatin(it.zh);const fs=lat?54:len<=2?64:len<=3?56:len<=4?48:len<=6?38:30;
 const parts=hbParts(it);
 return `<div class="hb-pager"><span>คำที่ ${i+1} จาก ${N}</span>${s.browse?`<span><span class="hb-tag lv" style="font-size:12px">อ่านเล่น</span>${hbTag(it,kc,'font-size:12px')}</span>`:hbTag(it,kc,'font-size:12px')}</div>
 <div class="hb-card"><div class="hz${lat?'':' zh'}" style="font-size:${fs}px${lat?';font-family:Inter,sans-serif':''}">${it.zh}</div><div class="py">${pyPlain(it.py)}</div><div class="th">${it.th}</div><button class="say press" data-act="audio" data-t="${hbKey(it)}" aria-label="ฟังเสียง">${HB_SPK}</button><div><button class="slow press" data-hbslow="${hbKey(it)}">ฟังแบบช้า</button></div></div>
 <div class="hb-box"><h4>ใช้เมื่อไร</h4><p>${it.use}</p></div>
 <div class="hb-box"><h4>ตัวอย่างประโยค</h4>${it.ex.map(e=>`<div class="hb-ex"><span class="tx"><b class="zh">${e.zh}</b><span class="p">${e.py}</span><small>${e.th}</small></span><button class="hb-say press" data-act="audio" data-t="${e.say}" aria-label="ฟังประโยค">${HB_SPK}</button></div>`).join('')}</div>
 ${parts.length?`<div class="hb-box"><h4>คำในบทเรียนที่อยู่ในคำนี้</h4><div class="hb-wd">${parts.map(w=>`<span class="${hbHan(w.zh).every(c=>kc.has(c))?'':'no'}"><span class="zh">${w.zh}</span>${hbGloss(w.th)}</span>`).join('')}</div></div>`:''}
 <div style="height:120px"></div>`}
function hbWordDock(s,i){const it=s.items[i];const last=i>=s.items.length-1;
 return `<div class="hb-dock3"><button class="pill ghost press${i?'':' hb-dis'}" style="flex:1" data-hbnav="-1">ก่อนหน้า</button>${typeof nbBtn==='function'?nbBtn(it.zh).replace('pill sm','pill').replace('class="','style="flex:1.7" class="'):''}<button class="pill ghost press${last?' hb-dis':''}" style="flex:1" data-hbnav="1">ถัดไป</button></div>`}
SC.hubword=p=>{const s=hbSet(p.c)||HB_SETS[0];let i=Math.max(0,Math.min(s.items.length-1,+p.i||0));const kc=hbKnownCh();
 return {title:s.t,noRefresh:true,body:`<div data-hbw>${hbWordBody(s,i,kc)}</div><div class="dock" data-hbd>${hbWordDock(s,i)}</div>`,
 mount(el){const sc=el.querySelector('.scroller');const show=(n,dir)=>{if(n<0||n>=s.items.length)return;stopAudio();i=n;p.i=n;const box=el.querySelector('[data-hbw]');box.innerHTML=hbWordBody(s,i,hbKnownCh());el.querySelector('[data-hbd]').innerHTML=hbWordDock(s,i);sc.style.scrollBehavior='auto';sc.scrollTop=0;
   if(dir&&box.animate)box.animate([{transform:`translateX(${dir*28}px)`,opacity:.3},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.32,.72,0,1)'})};
  el.addEventListener('click',e=>{const t=e.target.closest('[data-hbnav],[data-nbsave],[data-hbslow]');if(!t)return;vib(6);
   if(t.dataset.hbslow!==undefined){t.classList.add('playing');lbPlay(t.dataset.hbslow,.7,()=>t.classList.remove('playing'));return}
   if(t.dataset.hbnav){const d=+t.dataset.hbnav;show(i+d,d);return}
   const it=s.items[i];nbSaveToggle(it.zh,{py:it.py,th:it.th},'คลัง'+s.t);el.querySelector('[data-hbd]').innerHTML=hbWordDock(s,i)});
  let x0=null,y0=0;sc.addEventListener('touchstart',e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY},{passive:true});
  sc.addEventListener('touchend',e=>{if(x0===null)return;const t=e.changedTouches[0];const dx=t.clientX-x0,dy=t.clientY-y0;if(x0<28){x0=null;return}x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6)show(i+(dx<0?1:-1),dx<0?1:-1)},{passive:true})},
 unmount(){stopAudio()}}};
/* ===== ดูทั้งหมด ===== */
SC.huball=()=>{const kc=hbKnownCh();const rows=HB_ORDER.map(hbSet).filter(Boolean).map(s=>{const ok=s.browse?0:s.items.filter(it=>hbLearned(it,kc)).length;const z=s.items[0].zh,lat=hbIsLatin(z);
  return `<div class="hb-row press" data-go="hubcol" data-c="${s.id}" role="button"><span class="z${lat?'':' zh'}" style="background:${s.bg};font-size:${lat?18:[...z].length>2?18:22}px${lat?';font-family:Inter,sans-serif':''}">${z}</span><span class="tx"><b>${s.t}<span class="hb-tag lv">ระดับ ${s.lv}</span></b><small>${s.d} · ${s.items.length} คำ${s.browse?' · อ่านเล่น':ok?` · เรียนแล้ว ${ok}`:''}</small></span>${CHEV}</div>`}).join('');
 return {title:'คลังคำน่ารู้',body:`<div class="large">คลังคำน่ารู้</div><p class="cap" style="padding:8px 24px 0;line-height:1.55">คำที่คนจีนใช้จริง แบ่งเป็นชุดตามเรื่อง แตะชุดเพื่อดูคำ ฟังเสียง และวิธีใช้</p><div class="hb-grp" style="margin-top:14px">${rows}</div><div style="height:40px"></div>`}};
/* ===== ฝึก: ฟังแล้วเลือกความหมาย (เฉพาะคำที่เรียนแล้ว · ไม่แตะรอบทบทวน) ===== */
SC.hubquiz=p=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio()},
 mount(el){const s=hbSet(p.c);const kc=hbKnownCh();const ok=s?s.items.filter(it=>hbLearned(it,kc)):[];if(!ok.length){toast('ยังไม่มีคำที่เรียนแล้วในชุดนี้');setTimeout(pop,50);return}
  const n=hbSpin(ok.length);const order=[];while(order.length<n)order.push(...shuffle(ok.slice()));
  const qs=order.slice(0,n).map(it=>{const near=s.id==='tone'?[s.items[it.i-1],s.items[it.i+1]].filter(Boolean):[];const seen=new Set([it.th]);const ds=[];
   for(const d of [...shuffle(near),...shuffle(s.items.slice())]){if(ds.length>=3)break;if(d===it||seen.has(d.th))continue;seen.add(d.th);ds.push(d)}
   const opts=shuffle([it,...ds]);
   return lbOptQ(`<div class="cap" style="font-size:14px">ฟังเสียงแล้วเลือกความหมาย</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${hbKey(it)}" data-auto>${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`,
    opts.map(o=>`<span>${o.th}</span>`),opts.indexOf(it),`<div class="ans"><span class="${hbIsLatin(it.zh)?'':'zh'}" style="font-size:20px">${it.zh}</span> &nbsp;${pyHtml(it.py)} &nbsp;= <b>${it.th}</b></div>`)});
  session(el,qs,res=>{lbEnd('hub',{xp:res.correct*6,coins:res.correct,title:'ฝึก'+s.t+'เสร็จแล้ว',sub:`ตอบถูก ${res.correct} จาก ${qs.length} ข้อ`,mascot:res.correct>=qs.length-1?'celebrate':'cheer',stats:[['ถูก',res.correct+'/'+qs.length],['คำที่เรียนแล้ว',ok.length+' คำ']],shareText:`ฝึก${s.t} ถูก ${res.correct}/${qs.length}`})})}});
Object.assign(window.GOX=window.GOX||{},{hubcol(el){push('hubcol',{c:el.dataset.c})},hubw(el){push('hubword',{c:el.dataset.c,i:+el.dataset.i||0})},huball(){push('huball')},hubquiz(el){push('hubquiz',{c:el.dataset.c})},
 hubnone(){toast('เรียนบทเรียนต่อ แล้วคำในชุดนี้จะเปิดให้ฝึก')}});
/* คำที่แสดงต่างจากข้อความที่อ่าน (520 yyds ฯลฯ): ให้เสียงจากรายการทบทวน/ที่อื่นที่เรียกด้วยตัวที่แสดง ได้เสียงที่ถูก */
(()=>{const A=window.AUDIO_INDEX;if(!A)return;HB_SETS.forEach(s=>s.items.forEach(it=>{if(it.say!==it.zh&&A[it.say]&&!A[it.zh])A[it.zh]=A[it.say]}))})();
