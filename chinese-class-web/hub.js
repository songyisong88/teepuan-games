/* คลังคำน่ารู้ — ส่วนบนของแท็บแหล่งความรู้ (ซ้งอี้อนุมัติตามภาพ A B C · 8 ชุดแรก)
   เนื้อหาอยู่ใน data/hub.js · ระดับของคำคำนวณจากคำในบทเรียน (ตัวอักษรทุกตัวต้องอยู่ในบทเรียน ใช้ระดับสูงสุดของตัวที่ประกอบ)
   "เรียนแล้ว" = ตัวอักษรทุกตัวอยู่ในคำที่ผู้เรียนรู้แล้ว (lbKnown) · ปุ่มฝึกใช้เฉพาะคำที่เรียนแล้ว และไม่แตะรอบทบทวน
   ปุ่มเก็บ = เพิ่มเข้ารายการ "คำที่ควรทบทวน" เดิม (S.srs) · ชุดศัพท์โซเชียลเป็นแบบอ่านเล่น ไม่มีแบบฝึก */
const HB_SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
const HB_ORDER=['hit','num','net','tea','love','food','bless','tone','teen'];/* ลำดับการ์ดตามภาพ A */
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
 tea:()=>hbPic('奶茶'),love:()=>hbPic('爱'),food:hbCov('ahanthai',()=>hbPic('米饭')),bless:hbCov('uayporn',()=>hbPic('红包')),tone:hbCov('phudphid',()=>`<span class="kn-row">${hbZt('问','#3D6FB6',26)}${hbZt('吻','#C8102E',26,'margin-left:6px')}</span>`),teen:hbCov('teen',()=>hbZt('绝了','#6B8E23',24))};
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
 <div class="hb-g3" data-hbl>${s.items.map(it=>hbTile(it,s)).join('')}</div><div style="height:${s.browse?40:120}px"></div>${dock}`,
 mount(el){let list=s.items;el.addEventListener('click',e=>{const t=e.target.closest('[data-hbt]');if(t){vib(6);const k=list.findIndex(it=>it.i===+t.dataset.hbt);if(k>=0)hbOpen(s,list,k,t,el);return}
  const b=e.target.closest('[data-hbf]');if(!b)return;vib(6);el.querySelectorAll('[data-hbf]').forEach(x=>x.classList.toggle('on',x===b));const kc2=hbKnownCh();list=hbFilter(s,b.dataset.hbf,kc2);
  const g=el.querySelector('[data-hbl]');g.innerHTML=list.length?list.map(it=>hbTile(it,s)).join(''):`<div class="hb-empty">ยังไม่มีคำในกลุ่มนี้</div>`})},unmount(){hbClose(1);stopAudio()}}};
/* ===== ห้องคำ: ไทล์กลม 3 คอลัมน์ (W3) · แตะแล้วการ์ดลอยมากลางจอและพลิกเป็นการ์ดคำใหญ่ (W1) · ซ้งอี้อนุมัติ 31 ต.ค. 2026
   ภาพ: hubw/<คำ> ก่อน แล้ว word/<คำ> ที่มีอยู่ · ไม่มีภาพ = ตัวอักษรจีนบนพื้นสีของชุด
   เก็บลงสมุด: nbSaveToggle เดิม (สมุดคำของฉัน) + ริบบิ้นแดงที่มุมภาพบนการ์ด · ลดการเคลื่อนไหว = ไม่พลิก ไม่บิน ริบบิ้นขึ้นทันที ===== */
const hbImg=it=>{const A=window.ART_IDX||{};return A['hubw/'+it.zh]?artUrl('hubw',it.zh):A['word/'+it.zh]?artUrl('word',it.zh):''};
const hbRM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const hbAt=t=>String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const HB_I={x:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 l:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 r:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'};
/* ภาพหรือตัวอักษรแทนภาพ (ภาพโหลดไม่ได้ = เหลือตัวอักษร) */
const hbPh=(it,fs)=>{const lat=hbIsLatin(it.zh),src=hbImg(it);return `<span class="phz${lat?' lat':' zh'}" style="font-size:${fs}px">${it.zh}</span>${src?`<img src="${src}" alt="" decoding="async" draggable="false" onerror="this.remove()">`:''}`};
function hbTile(it,s){const n=[...it.zh].length,lat=hbIsLatin(it.zh);const cf=lat?Math.min(30,Math.floor(58/(n*.62))):Math.min(34,Math.floor(62/n));const zf=lat?16:Math.min(17,Math.floor(96/n));
 return `<div class="hb-t press" data-hbt="${it.i}" role="button" aria-label="${hbAt(it.zh+' '+it.th)}"><span class="cc" style="background:${s.bg}">${hbPh(it,cf)}</span><span class="z${lat?' lat':' zh'}" style="font-size:${zf}px">${it.zh}</span><span class="t">${it.th}</span></div>`}
function hbBigHtml(o){const {s,list,k}=o;const it=list[k],N=list.length,kc=hbKnownCh(),lat=hbIsLatin(it.zh),n=[...it.zh].length;
 const zf=lat?40:Math.min(40,Math.floor(250/n)),pf=lat?Math.min(72,Math.floor(280/(n*.62))):Math.min(76,Math.floor(280/n));
 const nd=Math.min(5,N),on=N<=5?k:k<2?k:k>N-3?nd-(N-k):2;const parts=hbParts(it);
 const tag=s.tag?s.tag(it,kc):s.browse?'<span class="hb-tag lv">อ่านเล่น</span>':hbTag(it,kc);const bg=it.bg||s.bg;
 return `<div class="top"><span class="cnt">คำที่ ${k+1} จาก ${N}</span><span class="dots" aria-hidden="true">${Array.from({length:nd},(_,j)=>`<i${j===on?' class="on"':''}></i>`).join('')}</span><button class="xb press" data-hbx aria-label="ปิด">${HB_I.x}</button></div>
 <div class="hb-sc"><div class="ph"><span class="pic" style="background:${bg}">${hbPh(it,pf)}</span>${hbSaved(it)?'<i class="rib"></i>':''}</div>
 <div class="hd"><div class="hw"><div class="hz${lat?' lat':' zh'}" style="font-size:${zf}px">${it.zh}</div><div class="py">${pyPlain(it.py)}</div></div><button class="say press" data-act="audio" data-t="${hbAt(hbKey(it))}" aria-label="ฟังเสียง">${HB_SPK}</button></div>
 <div class="tr"><span class="th">${it.th}</span>${tag}<button class="slow" data-hbslow="${hbAt(hbKey(it))}">ฟังแบบช้า</button></div>
 ${it.use?`<div class="box"><h4>ใช้เมื่อไร</h4><p>${it.use}</p></div>`:''}
 ${it.ex&&it.ex.length?`<div class="box"><h4>ตัวอย่างประโยค</h4>${it.ex.map(e=>`<div class="exr">${typeof alTx==='function'?alTx(e.zh,e.py,e.th):`<span class="tx"><b class="zh">${e.zh}</b><span class="p">${e.py}</span><small>${e.th}</small></span>`}<button class="say press" data-act="audio" data-t="${hbAt(e.say)}" aria-label="ฟังประโยค">${HB_SPK}</button></div>`).join('')}</div>`:''}
 ${parts.length?`<div class="box"><h4>คำในบทเรียนที่อยู่ในคำนี้</h4><div class="hb-wd">${parts.map(w=>`<span class="${hbHan(w.zh).every(c=>kc.has(c))?'':'no'}"><span class="zh">${w.zh}</span>${hbGloss(w.th)}</span>`).join('')}</div></div>`:''}
 <div class="sp"></div></div>
 <div class="ft"><button class="nv press${k?'':' dis'}" data-hbnav="-1" aria-label="คำก่อนหน้า">${HB_I.l}</button>${s.btn?s.btn(it):nbBtn(it.zh)}<button class="nv press${k<N-1?'':' dis'}" data-hbnav="1" aria-label="คำถัดไป">${HB_I.r}</button></div>`}
/* เปิดการ์ดคำ/เปลี่ยนคำ = อ่านออกเสียงทันที (เรียกในจังหวะแตะ เพื่อให้ iOS ยอมเล่น) · ถูกบล็อก = เงียบ */
function hbAutoSay(root,it){try{const b=root&&root.querySelector('[data-act="audio"]');speak(b?b.dataset.t:hbKey(it),b||null)}catch(e){}}
/* กล่องภาพการ์ดใหญ่: ใช้สีขอบภาพเป็นพื้นกล่อง ให้ภาพกับกล่องเป็นผืนเดียว */
function hbPicBg(root){const im=root&&root.querySelector('.pic img');if(!im)return;const go=()=>{try{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(im,0,0,4,4,0,0,1,1);const d=x.getImageData(0,0,1,1).data;im.parentNode.style.background=`rgb(${d[0]},${d[1]},${d[2]})`}catch(e){}};im.complete&&im.naturalWidth?go():im.addEventListener('load',go,{once:true})}
function hbMarkSay(root){const b=root&&root.querySelector('[data-act="audio"]');if(b)b.classList.add('playing')}
let hbOv=null;
const hbA=(el,k,o)=>el.animate?el.animate(k,Object.assign({fill:'both'},o)):{finished:Promise.resolve(),cancel(){}};
const hbDone=a=>a&&a.finished?a.finished.catch(()=>{}):Promise.resolve();
/* ไทล์ลอยจากตำแหน่งเดิมไปกลางการ์ด ขยาย 1.75 เท่า และหมุนรอบแกนตั้ง 90 องศา (ย้อนกลับได้) */
function hbFlyTile(o,tile,back){const fr=$('#frame').getBoundingClientRect(),r=tile.getBoundingClientRect(),cr=o.card.getBoundingClientRect();
 const f=tile.cloneNode(true);f.classList.add('fly');f.classList.remove('press');f.removeAttribute('data-hbt');f.style.visibility='visible';Object.assign(f.style,{left:(r.left-fr.left)+'px',top:(r.top-fr.top)+'px',width:r.width+'px',height:r.height+'px'});o.fly.appendChild(f);
 const dx=(cr.left+cr.width/2)-(r.left+r.width/2),dy=(cr.top+cr.height/2)-(r.top+r.height/2);
 const a={transform:'none',boxShadow:'0 4px 12px rgba(60,40,30,.06)'},b={transform:`translate(${dx}px,${dy}px) scale(1.75) rotateY(90deg)`,boxShadow:'0 40px 60px rgba(0,0,0,.25)'};
 const an=hbA(f,back?[b,a]:[a,b],{duration:back?300:320,easing:back?'cubic-bezier(.22,.61,.36,1)':'cubic-bezier(.65,0,.35,1)'});return hbDone(an).then(()=>f)}
function hbOpen(s,list,k,tile,scr){if(hbOv)return;stopAudio();const F=$('#frame');const rm=hbRM();
 const ov=document.createElement('div');ov.className='hb-ov';ov.innerHTML=`<div class="hb-bd"></div><div class="hb-fly"></div><div class="hb-bc" role="dialog" aria-modal="true" aria-label="${hbAt(s.t)}"><div class="hb-in"></div></div>`;
 const o=hbOv={s,list,k,ov,scr,bd:ov.querySelector('.hb-bd'),fly:ov.querySelector('.hb-fly'),card:ov.querySelector('.hb-bc'),inn:ov.querySelector('.hb-in'),busy:1};
 o.inn.innerHTML=hbBigHtml(o);F.appendChild(ov);hbPicBg(o.inn);vib(8);hbAutoSay(o.inn,o.list[o.k]);
 const fin=()=>{o.busy=0;o.card.style.visibility='';};
 if(!rm&&s.from&&ov.animate){hbA(o.bd,[{opacity:0},{opacity:1}],{duration:360,easing:'ease-out',fill:'none'});hbDone(hbA(o.card,hbZoom(o,s.from),{duration:420,easing:'cubic-bezier(.2,.85,.25,1)',fill:'none'})).then(fin)}
 else if(rm||!tile||!ov.animate){hbA(ov,[{opacity:0},{opacity:1}],{duration:rm?120:200,fill:'none'});fin()}
 else{o.card.style.visibility='hidden';tile.style.visibility='hidden';hbA(o.bd,[{opacity:0},{opacity:1}],{duration:420,easing:'cubic-bezier(.215,.61,.355,1)',fill:'none'});
  hbFlyTile(o,tile,false).then(f=>{f.remove();tile.style.visibility='';o.card.style.visibility='';
   return hbDone(hbA(o.card,[{transform:'perspective(1400px) rotateY(-90deg) scale(.82)'},{transform:'perspective(1400px) rotateY(0deg) scale(1)'}],{duration:340,easing:'cubic-bezier(.215,.61,.355,1)',fill:'none'}))}).then(fin)}
 hbBind(o)}
/* การ์ดใหญ่ขยายออกจากการ์ดเล็กที่แตะ (ใช้กับหน้าที่ไม่ใช่ห้องคำ เช่น สมุดคำ) */
function hbZoom(o,el){const r=el.getBoundingClientRect(),c=o.card.getBoundingClientRect();const sc=Math.max(.15,r.width/Math.max(1,c.width));
 return [{transform:`translate(${(r.left+r.width/2)-(c.left+c.width/2)}px,${(r.top+r.height/2)-(c.top+c.height/2)}px) scale(${sc})`,opacity:.35},{transform:'none',opacity:1}]}
function hbClose(instant){const o=hbOv;if(!o)return;hbOv=null;stopAudio();document.removeEventListener('keydown',o.key);
 try{o.s.onClose&&o.s.onClose(o.list[o.k])}catch(e){}
 const ov=o.ov,gone=()=>ov.remove();if(instant===1||!ov.isConnected){gone();return}
 if(o.s.tileOf&&!instant&&!hbRM()&&ov.animate){const t=o.s.tileOf(o.list[o.k]);o.busy=1;hbA(o.bd,[{opacity:1},{opacity:0}],{duration:320,easing:'ease-out'});
  hbDone(hbA(o.card,t?hbZoom(o,t).reverse():[{opacity:1,transform:'none'},{opacity:0,transform:'scale(.94)'}],{duration:t?320:220,easing:'cubic-bezier(.4,0,.6,1)'})).then(gone);return}
 o.busy=1;if(instant||hbRM()||!ov.animate){hbDone(hbA(ov,[{opacity:1},{opacity:0}],{duration:instant?160:140})).then(gone);return}
 const it=o.list[o.k];const tile=o.scr&&o.scr.querySelector(`[data-hbt="${it.i}"]`);const sc=o.scr&&o.scr.querySelector('.scroller');
 let vis=false;if(tile&&sc){const r=tile.getBoundingClientRect(),q=sc.getBoundingClientRect();vis=r.bottom>q.top+40&&r.top<q.bottom-120}
 hbA(o.bd,[{opacity:1},{opacity:0}],{duration:vis?560:260,delay:vis?60:0,easing:'ease-out'});
 if(!vis){hbDone(hbA(o.card,[{opacity:1,transform:'none'},{opacity:0,transform:'scale(.94)'}],{duration:220,easing:'cubic-bezier(.4,0,1,1)'})).then(gone);return}
 hbDone(hbA(o.card,[{transform:'perspective(1400px) rotateY(0deg) scale(1)'},{transform:'perspective(1400px) rotateY(-90deg) scale(.82)'}],{duration:220,easing:'cubic-bezier(.55,.055,.675,.19)'})).then(()=>{o.card.style.visibility='hidden';tile.style.visibility='hidden';
  return hbFlyTile(o,tile,true)}).then(()=>{tile.style.visibility='';gone()})}
/* เปลี่ยนคำ: ปุ่ม ‹ › หรือปัดซ้าย/ขวา */
function hbShow(o,k2,dir,from){if(k2<0||k2>=o.list.length||k2===o.k){if(from)hbA(o.inn,[{transform:`translateX(${from}px)`},{transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.75,.3,1)',fill:'none'});return}
 hbAutoSay(null,o.list[k2]);const put=()=>{o.k=k2;o.inn.innerHTML=hbBigHtml(o);hbMarkSay(o.inn);hbPicBg(o.inn)};vib(6);
 if(hbRM()||!o.inn.animate){put();return}
 o.busy=1;hbDone(hbA(o.inn,[{transform:`translateX(${from||0}px)`,opacity:1},{transform:`translateX(${-dir*90}px)`,opacity:0}],{duration:150,easing:'cubic-bezier(.4,0,1,1)'})).then(()=>{put();
  return hbDone(hbA(o.inn,[{transform:`translateX(${dir*90}px)`,opacity:0},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.2,.75,.3,1)'}))}).then(()=>{o.busy=0;o.inn.getAnimations&&o.inn.getAnimations().forEach(a=>a.cancel())})}
/* เก็บลงสมุด: ริบบิ้นแดงหล่นลงที่มุมภาพ ปุ่มเด้ง ประกายเล็ก ๆ · นำออก: ริบบิ้นยกออก */
function hbSaveFx(o,btn){const it=o.list[o.k];if(o.s.save&&o.s.save(o,btn,it)!==false)return;const on=nbSaveToggle(it.zh,{py:it.py,th:it.th},o.s.src?o.s.src(it):'คลัง'+o.s.t,null);
 const nb=document.createElement('div');nb.innerHTML=o.s.btn?o.s.btn(it):nbBtn(it.zh);const b2=nb.firstChild;btn.replaceWith(b2);const ph=o.inn.querySelector('.ph');const rm=hbRM();let rib=ph.querySelector('.rib');
 if(on){if(!rib){rib=document.createElement('i');rib.className='rib';ph.appendChild(rib)}
  if(!rm){hbA(rib,[{transform:'translateY(-60px)'},{transform:'none'}],{duration:440,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'none'});
   hbA(b2,[{transform:'scale(.95)'},{transform:'scale(1.06)',offset:.45},{transform:'none'}],{duration:420,easing:'ease-out',fill:'none'});
   for(let j=0;j<7;j++){const a=-Math.PI*(j/6),d=document.createElement('i');d.className='spk';d.style.background=j%2?'#C8102E':'#E8A33D';ph.appendChild(d);
    hbDone(hbA(d,[{transform:'translate(0,0)',opacity:1},{transform:`translate(${-Math.cos(a)*54}px,${-Math.sin(a)*54*.6}px)`,opacity:0}],{duration:620,delay:160,easing:'cubic-bezier(.215,.61,.355,1)'})).then(()=>d.remove())}}}
 else if(rib){if(rm)rib.remove();else hbDone(hbA(rib,[{transform:'none',opacity:1},{transform:'translateY(-60px)',opacity:0}],{duration:240,easing:'cubic-bezier(.4,0,1,1)'})).then(()=>rib.remove())}}
function hbBind(o){const c=o.card;
 o.ov.addEventListener('click',e=>{if(!hbOv||hbOv!==o)return;if(e.target===o.bd){hbClose();return}const t=e.target.closest('[data-hbx],[data-hbnav],[data-nbsave],[data-hbslow]');if(!t||o.busy&&!t.dataset.hbslow)return;
  if(t.dataset.hbx!==undefined){vib(6);hbClose();return}
  if(t.dataset.hbslow!==undefined){vib(6);t.classList.add('playing');lbPlay(t.dataset.hbslow,.7,()=>t.classList.remove('playing'));return}
  if(t.dataset.hbnav){const d=+t.dataset.hbnav;hbShow(o,o.k+d,d);return}
  hbSaveFx(o,t)});
 o.key=e=>{if(hbOv!==o)return;if(e.key==='Escape')hbClose();else if(e.key==='ArrowRight')hbShow(o,o.k+1,1);else if(e.key==='ArrowLeft')hbShow(o,o.k-1,-1)};document.addEventListener('keydown',o.key);
 /* ลากลงเพื่อปิดเหมือนชีทอื่นในแอป */
 if(typeof sheetDrag==='function')sheetDrag(c,{bd:o.bd,active:()=>hbOv===o&&!o.busy,dismiss:()=>{if(hbOv===o)hbClose(true)}});
 /* ปัดซ้าย/ขวา: การ์ดตามนิ้ว ปล่อยแล้วเปลี่ยนคำ */
 let g=null;c.addEventListener('touchstart',e=>{g=null;if(o.busy||e.touches.length!==1)return;const t=e.touches[0];g={x:t.clientX,y:t.clientY,m:null,dx:0,t:performance.now()}},{passive:true});
 c.addEventListener('touchmove',e=>{if(!g)return;const t=e.touches[0],dx=t.clientX-g.x,dy=t.clientY-g.y;
  if(!g.m){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;if(Math.abs(dx)>Math.abs(dy)*1.2)g.m='x';else{g=null;return}}
  if(e.cancelable)e.preventDefault();const edge=(dx>0&&o.k===0)||(dx<0&&o.k>=o.list.length-1);g.dx=edge?dx*.28:dx;o.inn.style.transform=`translateX(${g.dx}px)`},{passive:false});
 const end=()=>{if(!g||g.m!=='x'){g=null;return}const q=g;g=null;o.inn.style.transform='';const v=Math.abs(q.dx)/Math.max(1,performance.now()-q.t);const dir=q.dx<0?1:-1;
  if(Math.abs(q.dx)>70||(v>.5&&Math.abs(q.dx)>24))hbShow(o,o.k+dir,dir,q.dx);else hbShow(o,o.k,0,q.dx)};
 c.addEventListener('touchend',end,{passive:true});c.addEventListener('touchcancel',end,{passive:true})}
/* ===== หน้า C: รายละเอียดคำ (ปัดซ้าย/ขวาเพื่อเปลี่ยนคำ) ===== */
function hbWordBody(s,i,kc){const it=s.items[i];const N=s.items.length;const len=[...it.zh].length,lat=hbIsLatin(it.zh);const fs=lat?54:len<=2?64:len<=3?56:len<=4?48:len<=6?38:30;
 const parts=hbParts(it);
 return `<div class="hb-pager"><span>คำที่ ${i+1} จาก ${N}</span>${s.browse?`<span><span class="hb-tag lv" style="font-size:12px">อ่านเล่น</span>${hbTag(it,kc,'font-size:12px')}</span>`:hbTag(it,kc,'font-size:12px')}</div>
 <div class="hb-card"><div class="hz${lat?'':' zh'}" style="font-size:${fs}px${lat?';font-family:Inter,sans-serif':''}">${it.zh}</div><div class="py">${pyPlain(it.py)}</div><div class="th">${it.th}</div><button class="say press" data-act="audio" data-t="${hbKey(it)}" aria-label="ฟังเสียง">${HB_SPK}</button><div><button class="slow press" data-hbslow="${hbKey(it)}">ฟังแบบช้า</button></div></div>
 <div class="hb-box"><h4>ใช้เมื่อไร</h4><p>${it.use}</p></div>
 <div class="hb-box"><h4>ตัวอย่างประโยค</h4>${it.ex.map(e=>`<div class="hb-ex">${typeof alTx==='function'?alTx(e.zh,e.py,e.th):`<span class="tx"><b class="zh">${e.zh}</b><span class="p">${e.py}</span><small>${e.th}</small></span>`}<button class="hb-say press" data-act="audio" data-t="${e.say}" aria-label="ฟังประโยค">${HB_SPK}</button></div>`).join('')}</div>
 ${parts.length?`<div class="hb-box"><h4>คำในบทเรียนที่อยู่ในคำนี้</h4><div class="hb-wd">${parts.map(w=>`<span class="${hbHan(w.zh).every(c=>kc.has(c))?'':'no'}"><span class="zh">${w.zh}</span>${hbGloss(w.th)}</span>`).join('')}</div></div>`:''}
 <div style="height:120px"></div>`}
function hbWordDock(s,i){const it=s.items[i];const last=i>=s.items.length-1;
 return `<div class="hb-dock3"><button class="pill ghost press${i?'':' hb-dis'}" style="flex:1" data-hbnav="-1">ก่อนหน้า</button>${typeof nbBtn==='function'?nbBtn(it.zh).replace('pill sm','pill').replace('class="','style="flex:1.7" class="'):''}<button class="pill ghost press${last?' hb-dis':''}" style="flex:1" data-hbnav="1">ถัดไป</button></div>`}
SC.hubword=p=>{const s=hbSet(p.c)||HB_SETS[0];let i=Math.max(0,Math.min(s.items.length-1,+p.i||0));const kc=hbKnownCh();
 return {title:s.t,noRefresh:true,body:`<div data-hbw>${hbWordBody(s,i,kc)}</div><div class="dock" data-hbd>${hbWordDock(s,i)}</div>`,
 mount(el){hbAutoSay(el.querySelector('[data-hbw]'),s.items[i]);const sc=el.querySelector('.scroller');const show=(n,dir)=>{if(n<0||n>=s.items.length)return;stopAudio();i=n;p.i=n;const box=el.querySelector('[data-hbw]');box.innerHTML=hbWordBody(s,i,hbKnownCh());el.querySelector('[data-hbd]').innerHTML=hbWordDock(s,i);sc.style.scrollBehavior='auto';sc.scrollTop=0;hbAutoSay(box,s.items[i]);
   if(dir&&box.animate)box.animate([{transform:`translateX(${dir*28}px)`,opacity:.3},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.32,.72,0,1)'})};
  el.addEventListener('click',e=>{const t=e.target.closest('[data-hbnav],[data-nbsave],[data-hbslow]');if(!t)return;vib(6);
   if(t.dataset.hbslow!==undefined){t.classList.add('playing');lbPlay(t.dataset.hbslow,.7,()=>t.classList.remove('playing'));return}
   if(t.dataset.hbnav){const d=+t.dataset.hbnav;show(i+d,d);return}
   const it=s.items[i];nbSaveToggle(it.zh,{py:it.py,th:it.th},'คลัง'+s.t,t);el.querySelector('[data-hbd]').innerHTML=hbWordDock(s,i)});
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
