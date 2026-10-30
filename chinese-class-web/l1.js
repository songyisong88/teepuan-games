/* ระดับ 1 โครงใหม่ (v3): บทเสียง (ตอน 0) · บทคำศัพท์ (ภาพนำ + กรอบประโยค) · ด่านทบทวนท้ายตอน
   ข้อมูลบท: data/hsk1.js (สร้างจาก tools/l1-build/spec.py) · ตัวละครในฉาก/การ์ด: ลามาเท่านั้น
   ภาพที่ยังไม่มี: ใช้ภาพวาดในแอป (ตัวเลข ปฏิทิน นาฬิกา ตำแหน่ง ดวงอาทิตย์) หรือการ์ดประโยค
   ภาพใหม่จาก PIXEL ลงทะเบียนผ่าน tools/pic-build/add_pics.py แล้วจะแสดงแทนอัตโนมัติ */
if(window.PIC_TYPE_X&&window.PIC_TYPE)Object.assign(PIC_TYPE,PIC_TYPE_X);
/* ระดับ 3–4: ซ่อนพินอินไว้ก่อน แตะคำ/ประโยคเพื่อแสดง แตะอีกครั้งเพื่อซ่อน (แบบ ก ที่อนุมัติ) · ใช้ระดับจากข้อมูลบท (L.lv) */
const pyTapLv=L=>!!L&&(L.lv===3||L.lv===4);
window.pyTapLv=pyTapLv;
const PYT_HINT=['แตะคำจีนเพื่อดูพินอิน','แตะคำอีกครั้งเพื่อซ่อนพินอิน'];
let pytN=0;
function pyTapToggle(t){const on=t.classList.toggle('on');t.setAttribute('aria-pressed',on?'true':'false');
 const h=t.dataset.pyh&&document.getElementById(t.dataset.pyh);if(h){h.classList.toggle('on',on);h.textContent=PYT_HINT[on?1:0]}const r=t.dataset.pyh&&document.getElementById(t.dataset.pyh+'r');if(r)r.classList.toggle('on',on);vib(6)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-pyt]');if(t)pyTapToggle(t)});
document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const t=e.target.closest&&e.target.closest('span[data-pyt],div[data-pyt]');if(t&&t===e.target){e.preventDefault();pyTapToggle(t)}});
window.pyTapSent=(zhH,pyH,cls)=>`<div class="pyt-s${cls?' '+cls:''}" data-pyt role="button" tabindex="0" aria-pressed="false">${zhH}<div class="pyx">${pyH}</div><div class="pyt-exh">แตะประโยคเพื่อดูพินอิน</div></div>`;
const L1NUM={'零':0,'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10};
const L1GRP={cal:['今天','明天','昨天','星期','年','月','日'],clk:['点','分钟'],sun:['上午','中午','下午'],pos:['上','下','前面','后面']};
const l1Img=z=>artUrl('word',z);
const l1Has=z=>!!(window.ART_IDX&&ART_IDX['word/'+z]);
const l1Grp=w=>w.zh in L1NUM?'num':Object.keys(L1GRP).find(g=>L1GRP[g].includes(w.zh))||picT(w);
const l1PicOk=w=>picHas(w)||w.zh in L1NUM||Object.values(L1GRP).some(a=>a.includes(w.zh));
const l1Pk=w=>String(w.py).normalize('NFD').replace(/[^a-zA-Z]/g,'').toLowerCase();
const l1T0=s=>String(s).split(/[ (/]/)[0];
const l1Svg=(inner,cls)=>`<span class="art has l1v ${cls||''}"><svg viewBox="0 0 100 100" aria-hidden="true">${inner}</svg></span>`;
const L1INK='#27211E',L1RED='#C8102E',L1LINE='#D9CFC4';
function l1NumSvg(n){let d='';
 if(n===0)d=`<ellipse cx="50" cy="76" rx="27" ry="9" fill="#fff" stroke="#C9BBAA" stroke-width="2.4"/><ellipse cx="50" cy="74" rx="16" ry="4.5" fill="none" stroke="#E6DCCF" stroke-width="1.6"/>`;
 else{const rows=Math.ceil(n/5);for(let k=0;k<n;k++){const r=Math.floor(k/5),c=k%5,cnt=Math.min(5,n-5*r);d+=`<circle cx="${50+(c-(cnt-1)/2)*15}" cy="${rows===1?75:68+r*15}" r="5.6" fill="${L1RED}"/>`}}
 return `<text x="50" y="${n>5?50:52}" text-anchor="middle" font-size="40" font-weight="700" fill="${L1INK}" font-family="system-ui,sans-serif">${n}</text>${d}`}
const l1Page=(x,y,w,h,hi)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fff" stroke="${hi?L1RED:L1LINE}" stroke-width="${hi?2.4:1.6}"/><rect x="${x}" y="${y}" width="${w}" height="${h*.22}" rx="4" fill="${hi?L1RED:L1LINE}"/>`;
function l1CalSvg(z){
 if(z==='今天'||z==='明天'||z==='昨天'){const hi={昨天:0,今天:1,明天:2}[z];let o='';[18,50,82].forEach((cx,i)=>{const big=i===hi,w=big?28:20,h=big?34:26;o+=l1Page(cx-w/2,50-h/2,w,h,big)});
  o+=`<path d="M44 82 L50 76 L56 82 Z" fill="${L1INK}"/>`;
  if(hi!==1)o+=`<path d="M50 ${hi===2?'30 Q66 18 78 30':'30 Q34 18 22 30'}" fill="none" stroke="${L1RED}" stroke-width="2.4" stroke-linecap="round"/><path d="${hi===2?'M78 30 l-7 -1 M78 30 l-2 -7':'M22 30 l7 -1 M22 30 l2 -7'}" stroke="${L1RED}" stroke-width="2.4" stroke-linecap="round"/>`;
  return o}
 if(z==='星期'){let o='';for(let k=0;k<7;k++){const r=k<4?0:1,c=r?k-4:k,x=(r?23:11)+c*20;o+=`<rect x="${x}" y="${r?54:30}" width="16" height="18" rx="3" fill="${k===6?'#FBE3E1':'#fff'}" stroke="${L1LINE}" stroke-width="1.6"/><rect x="${x}" y="${r?54:30}" width="16" height="4" rx="2" fill="${k===6?L1RED:L1LINE}"/>`}return o}
 if(z==='年'){let o='';const cs=['#F6C9D0','#F6C9D0','#F6C9D0','#F9DD8C','#F9DD8C','#F9DD8C','#F2B48A','#F2B48A','#F2B48A','#CFE0F2','#CFE0F2','#CFE0F2'];for(let k=0;k<12;k++){const r=Math.floor(k/4),c=k%4;o+=`<rect x="${16+c*18}" y="${22+r*20}" width="14" height="16" rx="3" fill="${cs[k]}" stroke="#fff" stroke-width="1"/>`}return o}
 if(z==='月'||z==='日'){let o=l1Page(18,14,64,72,1);for(let r=0;r<5;r++)for(let c=0;c<7;c++){const x=24+c*8,y=38+r*9;o+=`<rect x="${x}" y="${y}" width="5.5" height="5.5" rx="1" fill="${z==='日'&&r===2&&c===3?L1RED:'#E6DCCF'}"/>`}if(z==='日')o+=`<circle cx="50.7" cy="58.7" r="7" fill="none" stroke="${L1RED}" stroke-width="2"/>`;return o}
 return ''}
function l1ClkSvg(z){let o=`<circle cx="50" cy="50" r="38" fill="#fff" stroke="${L1INK}" stroke-width="3"/>`;for(let k=0;k<12;k++){const a=k*Math.PI/6;o+=`<line x1="${50+31*Math.sin(a)}" y1="${50-31*Math.cos(a)}" x2="${50+35*Math.sin(a)}" y2="${50-35*Math.cos(a)}" stroke="${k%3?'#C9BBAA':L1INK}" stroke-width="${k%3?1.6:2.6}"/>`}
 if(z==='分钟')o+=`<path d="M50 50 L50 16 A34 34 0 0 1 79.4 33 Z" fill="#F6C9D0"/><line x1="50" y1="50" x2="50" y2="30" stroke="${L1INK}" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="50" x2="77" y2="34.5" stroke="${L1RED}" stroke-width="2.6" stroke-linecap="round"/>`;
 else o+=`<line x1="50" y1="50" x2="72" y2="50" stroke="${L1RED}" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="50" y2="20" stroke="${L1INK}" stroke-width="3" stroke-linecap="round"/>`;
 return o+`<circle cx="50" cy="50" r="3.4" fill="${L1INK}"/>`}
function l1SunSvg(z){const p={上午:[24,58],中午:[50,24],下午:[76,58]}[z];
 return `<rect x="0" y="78" width="100" height="22" fill="#EAF1DF"/><path d="M10 78 Q50 -8 90 78" fill="none" stroke="#E6DCCF" stroke-width="2" stroke-dasharray="4 4"/>${[0,1,2,3,4,5,6,7].map(k=>{const a=k*Math.PI/4;return `<line x1="${p[0]+14*Math.cos(a)}" y1="${p[1]+14*Math.sin(a)}" x2="${p[0]+19*Math.cos(a)}" y2="${p[1]+19*Math.sin(a)}" stroke="#F0A818" stroke-width="2.6" stroke-linecap="round"/>`}).join('')}<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="#F9C846"/>`}
function l1PosSvg(z){const cat=(x,y,s,op)=>l1Has('猫')?`<image href="${l1Img('猫')}" x="${x}" y="${y}" width="${s}" height="${s}" ${op?`opacity="${op}"`:''}/>`:`<circle cx="${x+s/2}" cy="${y+s/2}" r="${s/2.6}" fill="#F2B48A" ${op?`opacity="${op}"`:''}/>`;
 const table=`<rect x="20" y="88" width="5" height="1" fill="none"/><line x1="26" y1="62" x2="26" y2="94" stroke="#8A5A3A" stroke-width="4"/><line x1="74" y1="62" x2="74" y2="94" stroke="#8A5A3A" stroke-width="4"/><rect x="16" y="54" width="68" height="8" rx="2" fill="#B07A4E"/><rect x="18" y="62" width="64" height="7" fill="#CFA27A"/>`;
 const floor=`<line x1="6" y1="95" x2="94" y2="95" stroke="#E6DCCF" stroke-width="2"/>`;
 if(z==='上')return floor+table+cat(33,20,34);
 if(z==='下')return floor+table+cat(36,70,26);
 if(z==='后面')return floor+cat(38,34,24,.9)+table;
 return floor+table+cat(28,52,44)}
function l1VisSvg(w,cls){const z=w.zh;
 if(z in L1NUM)return l1Svg(l1NumSvg(L1NUM[z]),cls);
 if(L1GRP.cal.includes(z))return l1Svg(l1CalSvg(z),cls);
 if(L1GRP.clk.includes(z))return l1Svg(l1ClkSvg(z),cls);
 if(L1GRP.sun.includes(z))return l1Svg(l1SunSvg(z),cls);
 if(L1GRP.pos.includes(z))return l1Svg(l1PosSvg(z),cls);
 return ''}
/* ภาพสำหรับการ์ดคำ (ใช้ได้ทั้งภาพที่ใช้ในโจทย์ไม่ได้ เช่น สติกเกอร์ลามา ลูกศร) */
function l1CardVis(w,cls){const z=w.zh;
 const pair=(a,b,arrow)=>`<span class="art has l1v l1pair ${cls}"><span class="l1pa">${a}</span><span class="l1arw">${arrow||'→'}</span><span class="l1pa">${b}</span></span>`;
 const im=z2=>l1Has(z2)?`<img src="${l1Img(z2)}" alt="">`:'';const lam=im('人');
 if(z==='去'&&l1Has('学校')&&l1Has('人'))return pair(lam,im('学校'));
 if(z==='来'&&l1Has('学校')&&l1Has('人'))return pair(im('学校'),lam);
 if(z==='回'&&l1Has('家')&&l1Has('人'))return pair(lam,im('家'),'↩');
 if(z==='开'&&l1Has('出租车'))return `<span class="art has ${cls}"><img src="${l1Img('出租车')}" alt=""></span>`;
 if(z==='东西'&&l1Has('杯子')&&l1Has('书'))return pair(im('杯子'),im('书'),'·');
 if((z==='多'||z==='少'||z==='些')&&l1Has('苹果')){const n=z==='多'?7:z==='少'?1:3;return `<span class="art has l1v l1cnt ${cls}">${Array(n).fill(`<img src="${l1Img('苹果')}" alt="">`).join('')}</span>`}
 if(z==='本'&&l1Has('书'))return `<span class="art has l1v l1cnt ${cls}">${Array(2).fill(`<img src="${l1Img('书')}" alt="">`).join('')}</span>`;
 return ''}
function l1TextCard(w,cls){const ex=String(w.ex||w.zh);return `<span class="l1tc ${cls||''}"><span class="zh">${ex.replace(w.zh,`<b>${w.zh}</b>`)}</span><small>${w.exTh||w.th}</small></span>`}
const l1Tile=(w,cls)=>{if(!picHas(w))return l1VisSvg(w,cls);const h=art('word',w.zh,'',cls);return w.zh in L1NUM?h.replace(/<\/span>$/,`<b class="l1nb">${L1NUM[w.zh]}</b></span>`):h};
window.l1Tile=l1Tile;
const l1Show=(w,cls)=>l1Tile(w,cls)||l1CardVis(w,cls)||l1TextCard(w,cls);

/* ---------- คลังคำที่สอนแล้ว (เฉพาะบทก่อนหน้า + บทนี้) ---------- */
function l1Taught(L){const a=LESSONS.filter(l=>l.lv===L.lv&&l.v3),k=a.findIndex(x=>x.id===L.id);return uniqW(a.slice(0,k+1).flatMap(l=>l.words))}
{const _lp=learnedPool;learnedPool=function(u){const L=lessonBy(u.lesson);return L&&L.v3?l1Taught(L):_lp(u)}}
function l1Dist(w,pool,n,o={}){const ok=x=>x.zh!==w.zh&&x.th!==w.th&&l1T0(x.th)!==l1T0(w.th)&&!picSim(w.zh,x.zh)&&(!o.pic||l1PicOk(x))&&(!o.aud||l1Pk(x)!==l1Pk(w));
 const g=l1Grp(w),c=shuffle(pool.filter(ok)).sort((a,b)=>(l1Grp(b)===g)-(l1Grp(a)===g));const th=new Set([l1T0(w.th)]),pk=new Set([l1Pk(w)]),out=[];
 for(const x of c){if(out.length>=n)break;if(th.has(l1T0(x.th))||pk.has(l1Pk(x)))continue;th.add(l1T0(x.th));pk.add(l1Pk(x));out.push(x)}return out}
const l1Rev=w=>revCard({pic:l1Tile(w,'pic-big')||l1CardVis(w,'pic-big'),zh:w.zh,py:w.py,th:w.th});
const l1Opts=(opts,fmt)=>`<div class="group opts" style="margin-top:18px">${opts.map((o,i)=>`<button class="opt press" data-i="${i}"><span class="k">${LET[i]}</span>${fmt(o)}</button>`).join('')}</div>`;
const l1Aud=(t,lab)=>`<button class="audio press" aria-label="ฟังเสียง" style="width:84px;height:84px;margin-top:10px" data-act="audio" data-t="${t}" data-auto>${SPK}</button><div class="cap mt12">${lab||'แตะเพื่อฟังอีกครั้ง'}</div>`;
const L1Q={
 aud2pic(w,pool){if(!l1PicOk(w))return null;const o=l1Dist(w,pool,3,{pic:1,aud:1});if(o.length<2)return null;const opts=shuffle([w,...o]);
  return {w,type:'aud2pic',opts,ans:opts.indexOf(w),reveal:l1Rev(w),html:`<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกรูปที่ตรงกัน</div>${l1Aud(w.zh)}</div><div class="pgrid">${opts.map((x,i)=>`<button class="opt ptile press" data-i="${i}" aria-label="รูปที่ ${LET[i]}"><span class="k">${LET[i]}</span>${l1Tile(x,'pic-t')}</button>`).join('')}</div>`}},
 pic2zh(w,pool){if(!l1PicOk(w))return null;const o=l1Dist(w,pool,3);if(o.length<2)return null;const opts=shuffle([w,...o]);
  return {w,type:'pic2zh',opts,ans:opts.indexOf(w),reveal:l1Rev(w),html:`<div class="center"><div class="cap" style="font-size:14px">ภาพนี้คือคำไหน</div><div class="pic-card">${l1Tile(w,'pic-big')}</div></div>${l1Opts(opts,x=>`<span class="zh" style="font-size:26px">${x.zh}</span><span class="pyr">${pyPlain(x.py)}</span>`)}`}},
 aud2th(w,pool){const o=l1Dist(w,pool,3,{aud:1});if(o.length<2)return null;const opts=shuffle([w,...o]);
  return {w,type:'audio',opts,ans:opts.indexOf(w),reveal:l1Rev(w),html:`<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกความหมาย</div>${l1Aud(w.zh)}</div>${l1Opts(opts,x=>`<span>${x.th}</span>`)}`}},
 th2zh(w,pool){const o=l1Dist(w,pool,3);if(o.length<2)return null;const opts=shuffle([w,...o]);
  return {w,type:'th2zh',opts,ans:opts.indexOf(w),reveal:l1Rev(w),html:`<div class="center"><div class="cap" style="font-size:14px">คำจีนของคำว่า</div><div style="font-size:34px;font-weight:700;margin:12px 16px 4px">${w.th}</div></div>${l1Opts(opts,x=>`<span class="zh" style="font-size:26px">${x.zh}</span><span class="pyr">${pyPlain(x.py)}</span>`)}`}}};
function l1Check(w,pool,i){const t=l1PicOk(w)?(i%2?['pic2zh','aud2pic']:['aud2pic','pic2zh']):(i%2?['th2zh','aud2th']:['aud2th','th2zh']);
 for(const k of [...t,'aud2th','th2zh']){const q=L1Q[k](w,pool);if(q)return q}return null}
function l1Mat(ws){const seen=new Set(),u=shuffle(ws).filter(w=>!seen.has(l1T0(w.th))&&seen.add(l1T0(w.th)));
 const pw=u.filter(l1PicOk).slice(0,4);
 if(pw.length>=3)return {w:pw[0],type:'mat',pics:true,ps:pw,right:shuffle(pw.map((_,i)=>i)),reveal:()=>`<div class="ans">${pw.map(w=>`<div class="pic-rv1">${l1Tile(w,'pic-mini sm')}<span class="zh" style="font-size:19px">${w.zh}</span> <span style="font-size:13px">${pyHtml(w.py)}</span> = ${w.th}</div>`).join('')}</div>`};
 return u.length>=3?matQ(u):null}

/* ---------- หน้าจอย่อย ---------- */
const l1Ch=L=>CHAPTERS.find(c=>c.id===L.chapter)||{};
function l1IntroHtml(L){const ch=l1Ch(L);
 return `<div class="l1intro center"><div class="l1code">${L.code}</div><div class="cap mt8">ตอนที่ ${ch.ep} · ${ch.th}</div><div class="large" style="padding:4px 0 0">${L.th}</div><div class="zh" style="font-size:20px;color:var(--sub2)">${L.zh}</div>
 ${L.can?`<div class="l1can">เป้าหมาย: ${L.can}</div>`:''}
 ${L.words.length?`<div class="l1thumbs">${L.words.map(w=>`<div class="l1th">${l1Show(w,'pic-mini')}<span class="zh">${w.zh}</span></div>`).join('')}</div><p class="cap">คำใหม่ ${L.words.length} คำ · ประมาณ 3 นาที</p>`:''}
 <div class="l1lama">${M('teach')}</div></div>`}
function l1CardHtml(w,n,t,L){const sz=w.zh.length>3?44:w.zh.length>2?54:w.zh.length>1?66:76,pt=pyTapLv(L),mn=w.mn?String(w.mn).replace(/^ตัวช่วยจำ:\s*/,''):'';
 const rd=w.h?`<span class="l1rd">· อ่านคล้าย ${w.h}</span>`:'';let zhH,pyL;
 if(pt){const id='pyh'+(++pytN);zhH=`<span class="pyt-w" data-pyt data-pyh="${id}" role="button" tabindex="0" aria-pressed="false" aria-label="${w.zh} แตะเพื่อดูพินอิน"><span class="pyt-r pyx">${pyHtml(w.py)}</span>${w.zh}</span>`;
  pyL=`<div class="l1nwpy"><span class="pyt-hint" id="${id}" aria-live="polite">${PYT_HINT[0]}</span>${w.h?`<span class="l1rd l1rdt" id="${id}r">· อ่านคล้าย ${w.h}</span>`:''}</div>`}
 else{zhH=w.zh;pyL=`<div class="l1nwpy">${pyHtml(w.py)} ${rd}</div>`}
 const ex=w.ex?`<div class="l1nwex"><div class="l1nwext">${pt?pyTapSent(`<div class="zh" style="font-size:19px;line-height:1.35">${zhHtml(w.ex,w.exPy)}</div>`,`<div style="font-size:13px">${pyHtml(w.exPy)}</div>`):`<div class="zh" style="font-size:19px;line-height:1.35">${zhHtml(w.ex,w.exPy)}</div><div style="font-size:13px">${pyHtml(w.exPy)}</div>`}<div class="cap" style="font-size:13px">${w.exTh}</div></div><button class="l1nwexs press" aria-label="ฟังประโยค" data-act="audio" data-t="${w.ex}">${SPK}</button></div>`:'';
 return `<div class="center wc l1card l1nw"><div class="cap" style="letter-spacing:1px">${L.code} · คำใหม่ ${n}/${t}</div><div class="l1pic">${l1Show(w,'pic-big')}</div>
 <div class="l1nwrow"><div class="bigzh zh" style="font-size:${sz}px">${zhH}</div><div class="l1nwspk"><button class="l1nwsb press" aria-label="ฟังเสียง ${w.zh}" data-act="audio" data-t="${w.zh}">${SPK}</button><small aria-hidden="true">ฟังเสียง</small></div></div>
 ${pyL}<div class="l1nwth">${w.th}</div>
 ${mn||ex?`<div class="l1nwcard">${mn?`<div class="l1nwmn">${mn}</div>`:''}${ex}</div>`:''}</div>`}
function l1FrameStep(L,pool){const f=L.fr;const vars=f.s.map(k=>{const s=parseSent(L.sents[k]);return {s,tok:strip(s.zh[f.k]||'')}}).filter((v,i,a)=>v.tok&&a.findIndex(x=>x.tok===v.tok)===i);
 if(vars.length<2)return null;const wOf=t=>pool.find(w=>w.zh===t)||ALLW.find(w=>w.zh===t);let cur=0;const tried=new Set([0]);const pt=pyTapLv(L);
 const sentH=()=>{const v=vars[cur],w=wOf(v.tok);return `<div class="l1fs zh">${v.s.zh.map((t,i)=>i===f.k?t.replace(v.tok,`<span class="l1slot">${w?l1Tile(w,'l1st'):''}<b>${v.tok}</b></span>`):`<span>${t}</span>`).join('')}</div><div class="l1fp${pt?' pyx':''}">${pyHtml(v.s.pyAll)}</div>${pt?'<div class="pyt-exh">แตะประโยคเพื่อดูพินอิน</div>':''}<div class="l1ft">${v.s.th}</div>`};
 const cnt=()=>`ลองครบ ${vars.length} คำเพื่อไปต่อ · ${tried.size}/${vars.length}`;
 return {k:'h',lock:true,btn:'ต่อไป',html:`<div class="center"><div class="cap" style="font-size:14px">กรอบประโยคของบทนี้</div><div class="cap">แตะคำด้านล่างเพื่อเปลี่ยนคำในช่อง แล้วฟังทั้งประโยค</div></div>
 <div class="card l1frame"><div id="l1fsent"${pt?' class="pyt-s" data-pyt role="button" tabindex="0" aria-pressed="false"':''}>${sentH()}</div><button class="cap press spkl" id="l1fsp"><span class="spi">${SPK}</span>ฟังประโยค</button></div>
 <div class="l1chips">${vars.map((v,i)=>{const w=wOf(v.tok);return `<button class="l1chip press${i===0?' on':''}" data-fr="${i}">${w?l1Tile(w,'l1ct'):''}<span class="zh">${v.tok}</span><small>${w?pyPlain(w.py):''}</small></button>`}).join('')}</div><p class="cap center mt12" id="l1fc">${cnt()}</p>`,
 mount(stage,dock){setTimeout(()=>speak(vars[0].s.full),450);const nb=$('[data-sa=next]',dock);
  stage.onclick=e=>{const sp=e.target.closest('#l1fsp');if(sp){speak(vars[cur].s.full,sp);return}const b=e.target.closest('[data-fr]');if(!b)return;cur=+b.dataset.fr;tried.add(cur);vib(6);
   $('#l1fsent',stage).innerHTML=sentH();$$('[data-fr]',stage).forEach(x=>x.classList.toggle('on',x===b));$('#l1fc',stage).textContent=cnt();speak(vars[cur].s.full);if(tried.size>=vars.length&&nb)nb.disabled=false}}}}

function l1LexSteps(u,L){const pool=l1Taught(L),ws=L.words,st=[],Q=q=>q&&st.push({k:'q',q});
 st.push({k:'h',html:l1IntroHtml(L),btn:'เริ่มเรียน'});
 const h=Math.ceil(ws.length/2);let qi=0;
 [ws.slice(0,h),ws.slice(h)].forEach(half=>{if(!half.length)return;half.forEach(w=>st.push({k:'h',html:l1CardHtml(w,ws.indexOf(w)+1,ws.length,L),say:w.zh}));shuffle(half).forEach(w=>Q(l1Check(w,pool,qi++)))});
 Q(l1Mat(ws));
 const fs=L.fr&&l1FrameStep(L,pool);if(fs)st.push(fs);
 const ok=k=>L.sents[k]&&parseSent(L.sents[k]).zh.length>=2;
 const oi=[...(L.fr?L.fr.s.slice().reverse():[]),...L.sents.map((_,i)=>i)].find(ok);if(oi!=null)Q(ordQ(L,oi));
 const fi=L.sents.findIndex((s,i)=>i!==oi&&ok(i));if(fi>=0)Q(fillQ(L,fi,L.id));
 if(L.dlg&&L.dlg.length){st.push({k:'dlg',L});Q(replyQ(L))}
 shuffle(pool.filter(w=>!ws.includes(w))).slice(0,2).forEach(w=>Q(l1Check(w,pool,qi++)));
 const tq=shuffle(ws.slice()).map(toneQ).find(Boolean);if(tq)Q(tq);
 return st}

/* ---------- ตอน 0: เสียง (เรียงตามลำดับมาตรฐาน: พยัญชนะต้น → สระ → วรรณยุกต์ → ประกอบพยางค์ → ทดสอบ) ---------- */
const L1TONE=[['妈','mā','แม่'],['麻','má','ป่าน'],['马','mǎ','ม้า'],['骂','mà','ด่า']];
const l1Contour=(t,cls)=>{const d=['M14 22 L86 22','M14 56 L86 20','M14 52 L44 82 L86 30','M14 18 L86 84'][t-1];
 return `<svg class="l1ct ${cls||''}" viewBox="0 0 100 100" aria-hidden="true">${[18,34,50,66,82].map(y=>`<line x1="8" y1="${y}" x2="92" y2="${y}" stroke="#EFE7DC" stroke-width="1.4"/>`).join('')}<path d="${d}" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
function l1PyQ(top,opts,ans,reveal,lbl){const o=opts.map((x,i)=>({x,i}));const sh=shuffle(o);return {w:null,lbl:lbl||'เสียง',custom:true,top,optsHtml:sh.map(v=>`<span style="font-size:24px;font-weight:500">${v.x}</span>`),ans:sh.findIndex(v=>v.i===ans),reveal}}
const l1Txt=(t)=>`<div class="ans">${t}</div>`;
/* เสียงตัวอย่าง: [ตัวพินอิน, เสียงใกล้เคียงภาษาไทย, ตัวจีน, พินอินเต็ม, ความหมาย] · ทุกตัวจีนมีคลิปเสียงจริงใน AUDIO_INDEX */
const L1PY={
 b:['ใกล้ ป · ไม่พ่นลม','八','bā','แปด'],p:['ใกล้ พ · พ่นลม','跑','pǎo','วิ่ง'],m:['เหมือน ม','妈','mā','แม่'],f:['เหมือน ฟ','发','fā','ส่ง'],
 d:['ใกล้ ต · ไม่พ่นลม','大','dà','ใหญ่'],t:['ใกล้ ท · พ่นลม','他','tā','เขา'],n:['เหมือน น','你','nǐ','คุณ'],l:['เหมือน ล','来','lái','มา'],
 g:['ใกล้ ก · ไม่พ่นลม','高','gāo','สูง'],k:['ใกล้ ค · พ่นลม','开','kāi','เปิด'],h:['ใกล้ ฮ · ลมเสียดในลำคอ','好','hǎo','ดี'],
 j:['ใกล้ จ · ลิ้นแบน ยิ้มกว้าง','鸡','jī','ไก่'],q:['ใกล้ ช · ลิ้นแบน พ่นลม','七','qī','เจ็ด'],x:['ใกล้ ซ · ลิ้นแบน ยิ้มกว้าง','西','xī','ตะวันตก'],
 zh:['ม้วนปลายลิ้น · ใกล้ จ','纸','zhǐ','กระดาษ'],ch:['ม้วนปลายลิ้น · ใกล้ ช พ่นลม','吃','chī','กิน'],sh:['ม้วนปลายลิ้น · ใกล้ ซ','十','shí','สิบ'],r:['ม้วนปลายลิ้น · ใกล้ ร เบา ๆ ไม่รัว','日','rì','วัน'],
 z:['ใกล้ ตซ · ไม่พ่นลม','字','zì','ตัวอักษร'],c:['ใกล้ ตซ · พ่นลม','菜','cài','อาหาร'],s:['ใกล้ ซ · ลิ้นราบ ไม่ม้วน','四','sì','สี่'],
 y:['ใกล้ ย · ใช้แทน i ต้นพยางค์','一','yī','หนึ่ง'],w:['ใกล้ ว · ใช้แทน u ต้นพยางค์','五','wǔ','ห้า'],
 a:['อา','啊','a','คำอุทาน'],o:['ออ · ปากกลม','摸','mō','ลูบ'],e:['เออ · ไม่ใช่ เอ','饿','è','หิว'],i:['อี','一','yī','หนึ่ง'],u:['อู','五','wǔ','ห้า'],'ü':['อี แต่ห่อปากกลม','雨','yǔ','ฝน'],er:['เออ แล้วม้วนลิ้น','二','èr','สอง'],
 ai:['อาย','白','bái','ขาว'],ei:['เอย','黑','hēi','ดำ'],ao:['อาว','好','hǎo','ดี'],ou:['โอว','手','shǒu','มือ'],
 ia:['เอีย (อี+อา)','家','jiā','บ้าน'],ie:['เอีย (อี+เอ)','写','xiě','เขียน'],iao:['เอียว','小','xiǎo','เล็ก'],iu:['อิว (iou)','六','liù','หก'],
 ua:['อัว (อู+อา)','花','huā','ดอกไม้'],uo:['อัว (อู+ออ)','多','duō','มาก'],uai:['อวาย','快','kuài','เร็ว'],ui:['เอว (uei)','对','duì','ถูกต้อง'],'üe':['ü + เอ','月','yuè','เดือน'],
 an:['อัน','三','sān','สาม'],en:['เอิน','门','mén','ประตู'],in:['อิน','新','xīn','ใหม่'],'ün':['ü + น','云','yún','เมฆ'],
 ang:['อาง','忙','máng','ยุ่ง'],eng:['เอิง','冷','lěng','หนาว'],ing:['อิง','听','tīng','ฟัง'],ong:['อุง','红','hóng','แดง'],
 ian:['เอียน','天','tiān','ท้องฟ้า'],uan:['อวน','关','guān','ปิด'],iang:['เอียง','想','xiǎng','คิดถึง'],uang:['อวาง','黄','huáng','เหลือง'],iong:['อยง','穷','qióng','จน']};
/* ชุดฝึกฟัง: ตัวเลือก + [ตัวจีน, พินอิน, คำตอบ] (ทุกตัวมีคลิปเสียงจริง) */
const L1SET={
 bpmf:[['b','p','m','f'],[['被','bèi','b'],['陪','péi','p'],['没','méi','m'],['非','fēi','f'],['比','bǐ','b'],['披','pī','p'],['米','mǐ','m']]],
 dtnl:[['d','t','n','l'],[['大','dà','d'],['他','tā','t'],['拿','ná','n'],['拉','lā','l'],['都','dōu','d'],['偷','tōu','t'],['楼','lóu','l']]],
 gkh:[['g','k','h'],[['个','gè','g'],['渴','kě','k'],['喝','hē','h'],['盖','gài','g'],['开','kāi','k'],['还','hái','h']]],
 jqx:[['j','q','x'],[['鸡','jī','j'],['七','qī','q'],['西','xī','x'],['九','jiǔ','j'],['秋','qiū','q'],['修','xiū','x']]],
 zhchshr:[['zh','ch','sh','r'],[['支','zhī','zh'],['吃','chī','ch'],['诗','shī','sh'],['日','rì','r'],['找','zhǎo','zh'],['炒','chǎo','ch'],['少','shǎo','sh'],['绕','rào','r']]],
 zcs:[['z','c','s'],[['字','zì','z'],['次','cì','c'],['四','sì','s'],['早','zǎo','z'],['草','cǎo','c']]],
 zhz:[['zh','z'],[['纸','zhǐ','zh'],['紫','zǐ','z']]],shs:[['sh','s'],[['是','shì','sh'],['四','sì','s']]],chc:[['ch','c'],[['菜','cài','c'],['拆','chāi','ch']]],
 yw:[['y','w'],[['一','yī','y'],['五','wǔ','w'],['鱼','yú','y'],['我','wǒ','w']]],
 aeu:[['a','e','u'],[['哈','hā','a'],['喝','hē','e'],['湖','hú','u']]],aoi:[['a','o','i'],[['妈','mā','a'],['摸','mō','o'],['米','mǐ','i']]],
 uu:[['u','ü'],[['路','lù','u'],['绿','lǜ','ü']]],iuu:[['i','u','ü'],[['一','yī','i'],['五','wǔ','u'],['雨','yǔ','ü']]],eer:[['e','er'],[['饿','è','e'],['二','èr','er']]],
 aieiaoou:[['ai','ei','ao','ou'],[['还','hái','ai'],['黑','hēi','ei'],['好','hǎo','ao'],['厚','hòu','ou'],['白','bái','ai'],['被','bèi','ei'],['包','bāo','ao']]],
 iaie:[['ia','ie','iao','iu'],[['下','xià','ia'],['些','xiē','ie'],['小','xiǎo','iao'],['修','xiū','iu']]],
 uaui:[['ua','uo','uai','ui'],[['刮','guā','ua'],['过','guò','uo'],['乖','guāi','uai'],['贵','guì','ui']]],
 uee:[['üe','ie'],[['雪','xuě','üe'],['写','xiě','ie'],['月','yuè','üe'],['夜','yè','ie']]],
 anang:[['an','ang'],[['满','mǎn','an'],['忙','máng','ang'],['蓝','lán','an'],['狼','láng','ang']]],
 eneng:[['en','eng'],[['门','mén','en'],['梦','mèng','eng'],['根','gēn','en'],['更','gèng','eng']]],
 ining:[['in','ing'],[['新','xīn','in'],['行','xíng','ing'],['您','nín','in'],['零','líng','ing']]],
 hnasal:[['an','en','eng','ong'],[['喊','hǎn','an'],['很','hěn','en'],['横','héng','eng'],['红','hóng','ong']]],
 uanuang:[['uan','uang'],[['关','guān','uan'],['光','guāng','uang']]]};
const l1Pick=(k,n,what)=>{const [opts,items]=L1SET[k];return shuffle(items.slice()).slice(0,n).map(([hz,py,a])=>l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือก${what}</div>${l1Aud(hz)}`,opts,opts.indexOf(a),l1Txt(`<b>${pyHtml(py)}</b> <span class="zh">${hz}</span> · ${what} <b>${a}</b>`),py))};
/* การ์ดแตะฟัง: ต้องแตะครบทุกช่องก่อนไปต่อ */
const l1Tiles=(keys)=>`<div class="l1tones">${keys.map(k=>{const v=L1PY[k];return `<button class="l1tn press" data-act="audio" data-t="${v[1]}" data-l1k="${k}"><b>${k}</b><span><span class="zh">${v[1]}</span> ${pyHtml(v[2])} · ${v[3]}</span><span>${v[0]}</span></button>`}).join('')}</div>`;
const l1LockMount=n=>(stage,dock)=>{const nb=$('[data-sa=next]',dock),seen=new Set(),c=$('.l1cnt',stage);stage.addEventListener('click',e=>{const b=e.target.closest('[data-l1k]');if(!b)return;b.style.borderColor='var(--red)';seen.add(b.dataset.l1k);if(c)c.textContent=`แตะฟังแล้ว ${seen.size}/${n}`;if(seen.size>=n&&nb)nb.disabled=false})};
const l1TileStep=(cap,title,keys,note)=>({k:'h',lock:true,btn:'ต่อไป',mount:l1LockMount(keys.length),html:`<div class="center l1snd"><div class="cap">${cap}</div><div class="large" style="padding:4px 0 0">${title}</div>${l1Tiles(keys)}${note?`<p class="l1p">${note}</p>`:''}<p class="cap l1cnt">แตะทุกช่องเพื่อฟัง · 0/${keys.length}</p></div>`});
const l1Intro=(L,body)=>({k:'h',btn:'เริ่มเรียน',html:`<div class="center l1snd"><div class="l1code">${L.code}</div><div class="large" style="padding:6px 0 0">${L.th}</div>${body}</div>`});
const l1Know=(q,opts,reveal,lbl)=>l1PyQ(`<div class="cap" style="font-size:15px;margin:0 16px">${q}</div>`,opts,0,l1Txt(reveal),lbl);
const L1_SKIP=`<button class="pill sm ghost press mt16" data-l1go="1003a">เคยเรียนพินอินแล้ว · ไปทดสอบท้ายตอน</button>`;
function l1SndSteps(u,L){const st=[],Q=q=>q&&st.push({k:'q',q}),QA=a=>a.forEach(Q);
 if(L.id===1001){ /* 0-1 พินอินคืออะไร */
  st.push({k:'h',say:'你好',btn:'ต่อไป',html:`<div class="center l1snd"><div class="l1code">0-1</div><div class="large" style="padding:6px 0 0">พินอินคืออะไร</div>
   <div class="card l1two"><div><span class="zh" style="font-size:54px">你好</span><small>ตัวจีน (汉字)<br>บอกความหมาย</small></div><div><span style="font-size:34px;font-weight:600">${pyHtml('nǐ hǎo')}</span><small>พินอิน (拼音)<br>บอกวิธีอ่าน</small></div></div>
   <p class="l1p">ตัวจีนไม่ได้บอกเสียงอ่าน จึงใช้พินอิน ซึ่งเขียนด้วยอักษรโรมัน กำกับวิธีออกเสียงของตัวจีนแต่ละตัว</p>
   <button class="audio lg press" data-act="audio" data-t="你好">${SPK}<span>ฟังเสียง</span></button>${L1_SKIP}</div>`});
  st.push({k:'h',say:'八',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">พินอิน 1 พยางค์ มี 3 ส่วน</div><div class="zh" style="font-size:72px;margin-top:6px">八</div>
   <div class="l1parts"><span class="pi">b</span><span class="pf">ā</span></div>
   <div class="l1legend"><div><i class="pi"></i><b>b</b> พยัญชนะต้น (声母)</div><div><i class="pf"></i><b>a</b> สระ (韵母)</div><div><i class="pt"></i><b>ˉ</b> วรรณยุกต์ (声调) เครื่องหมายบนสระ</div></div>
   <p class="l1p">八 bā แปลว่า แปด</p><button class="audio lg press" data-act="audio" data-t="八">${SPK}<span>ฟังเสียง</span></button></div>`});
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">ลำดับการเรียนในตอนนี้</div><div class="large" style="padding:4px 0 0">เรียนทีละส่วน</div>
   <div class="l1legend" style="font-size:15.5px;gap:10px"><div><i class="pi"></i>0-2 ถึง 0-4 · พยัญชนะต้น 23 ตัว</div><div><i class="pf"></i>0-5 ถึง 0-7 · สระเดี่ยว สระผสม สระเสียงขึ้นจมูก</div><div><i class="pt"></i>0-8 · วรรณยุกต์ 4 เสียงและเสียงเบา</div><div><i class="pi"></i>0-9 · ประกอบพยางค์และกฎการเขียน</div><div><i class="pf"></i>0-10 · ทดสอบฟังเสียง</div></div>
   <p class="l1p">แต่ละบทฝึกเฉพาะเสียงที่เรียนไปแล้วเท่านั้น</p></div>`});
  Q(l1PyQ(`<div class="cap" style="font-size:14px">พินอินมีไว้ทำอะไร</div><div class="zh" style="font-size:48px;margin-top:10px">你好</div><div style="font-size:22px">${pyHtml('nǐ hǎo')}</div>`,['บอกวิธีอ่านออกเสียง','บอกความหมายของคำ','บอกจำนวนขีดของตัวจีน'],0,l1Txt('พินอินบอกวิธีอ่าน · ความหมายดูจากตัวจีนและคำแปล'),'พินอิน'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ในพินอิน bā ส่วนไหนคือพยัญชนะต้น</div><div style="font-size:56px;font-weight:600;margin-top:8px">bā</div>`,['b','a','เครื่องหมาย ˉ'],0,l1Txt('พยัญชนะต้นอยู่หน้าพยางค์ · ใน bā คือ b'),'พยัญชนะต้น'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ในพินอิน mā ส่วนไหนคือสระ</div><div style="font-size:56px;font-weight:600;margin-top:8px">mā</div>`,['a','m','เครื่องหมาย ˉ'],0,l1Txt('สระตามหลังพยัญชนะต้น · ใน mā คือ a'),'สระ'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ในพินอิน bā ส่วนไหนคือวรรณยุกต์</div><div style="font-size:56px;font-weight:600;margin-top:8px">bā</div>`,['เครื่องหมาย ˉ บนตัว a','ตัว b','ตัว a'],0,l1Txt('วรรณยุกต์คือเครื่องหมายบนสระ บอกเสียงสูงต่ำ'),'วรรณยุกต์'));
  return st}
 if(L.id===1004){ /* 0-2 b p m f · d t n l */
  st.push(l1Intro(L,`<p class="l1p">พยัญชนะต้น (声母) คือเสียงที่ขึ้นต้นพยางค์ ภาษาจีนมี 23 ตัว แบ่งเป็นกลุ่มตามตำแหน่งที่ออกเสียง · บทนี้เรียน 2 กลุ่มแรก</p><p class="l1p">ยังไม่มีคลิปเสียงของตัวอักษรเดี่ยว จึงฝึกฟังจากคำจริง ให้ตั้งใจฟังเสียงต้นคำ</p>`));
  st.push(l1TileStep('กลุ่มริมฝีปาก','b p m f',['b','p','m','f'],'ใช้ริมฝีปากออกเสียง · f ใช้ฟันบนแตะริมฝีปากล่าง'));
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">จุดที่คนไทยมักพลาด</div><div class="large" style="padding:4px 0 0">พ่นลม หรือ ไม่พ่นลม</div>
   <div class="card l1two"><div><span style="font-size:44px;font-weight:600">b</span><small>ไม่พ่นลม<br>ใกล้ ป ไม่ใช่ บ</small></div><div><span style="font-size:44px;font-weight:600">p</span><small>พ่นลม<br>ใกล้ พ</small></div></div>
   <p class="l1p">ลองถือกระดาษไว้หน้าปาก เมื่อออกเสียง p กระดาษจะไหว แต่ b กระดาษแทบไม่ขยับ · คู่ d กับ t ก็เป็นแบบเดียวกัน</p></div>`});
  st.push(l1TileStep('กลุ่มปลายลิ้นแตะเหงือก','d t n l',['d','t','n','l'],'d ใกล้ ต ไม่ใช่ ด · t พ่นลม'));
  QA(l1Pick('bpmf',3,'พยัญชนะต้น'));QA(l1Pick('dtnl',3,'พยัญชนะต้น'));
  Q(l1Know('คู่ไหนต่างกันที่การพ่นลม',['b กับ p','m กับ f','n กับ l'],'b ไม่พ่นลม · p พ่นลม (d กับ t ก็เช่นกัน)','พ่นลม'));
  return st}
 if(L.id===1005){ /* 0-3 g k h · j q x */
  st.push(l1Intro(L,`<p class="l1p">ต่อจาก b p m f · d t n l บทนี้เรียนกลุ่มโคนลิ้น g k h และกลุ่มลิ้นแบน j q x</p>`));
  st.push(l1TileStep('กลุ่มโคนลิ้น','g k h',['g','k','h'],'g ไม่พ่นลม · k พ่นลม (เป็นคู่เหมือน b กับ p)'));
  st.push(l1TileStep('กลุ่มลิ้นแบน','j q x',['j','q','x'],'ปลายลิ้นแตะหลังฟันล่าง ยิ้มกว้าง · j q x ใช้กับสระ i และ ü เท่านั้น'));
  QA(l1Pick('gkh',3,'พยัญชนะต้น'));QA(l1Pick('jqx',3,'พยัญชนะต้น'));
  Q(l1Know('ออกเสียง j q x ต้องทำลิ้นอย่างไร',['ลิ้นแบน ยิ้มกว้าง','ม้วนปลายลิ้นขึ้น','ห่อปากกลม'],'j q x ลิ้นแบน ปลายลิ้นแตะหลังฟันล่าง','j q x'));
  return st}
 if(L.id===1006){ /* 0-4 zh ch sh r · z c s · y w */
  st.push(l1Intro(L,`<p class="l1p">บทสุดท้ายของพยัญชนะต้น · กลุ่มม้วนลิ้น zh ch sh r กลุ่มลิ้นตรง z c s และ y w</p>`));
  st.push(l1TileStep('กลุ่มม้วนลิ้น','zh ch sh r',['zh','ch','sh','r'],'ยกปลายลิ้นขึ้นไปทางเพดาน · ch พ่นลม'));
  st.push(l1TileStep('กลุ่มลิ้นตรง','z c s',['z','c','s'],'ลิ้นราบ ไม่ม้วน · z c มีเสียง ต นำเบา ๆ · c พ่นลม'));
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">ฟังคู่ที่คล้ายกัน</div><div class="large" style="padding:4px 0 0">ม้วนลิ้น หรือ ไม่ม้วน</div>
   <div class="card l1two"><div><span style="font-size:40px;font-weight:600">${pyHtml('zhǐ')}</span><small><span class="zh">纸</span> กระดาษ<br>ม้วนลิ้น</small><button class="audio press" data-act="audio" data-t="纸">${SPK}</button></div><div><span style="font-size:40px;font-weight:600">${pyHtml('zǐ')}</span><small><span class="zh">紫</span> สีม่วง<br>ไม่ม้วนลิ้น</small><button class="audio press" data-act="audio" data-t="紫">${SPK}</button></div></div>
   <div class="card l1two"><div><span style="font-size:40px;font-weight:600">${pyHtml('shì')}</span><small><span class="zh">是</span> เป็น<br>ม้วนลิ้น</small><button class="audio press" data-act="audio" data-t="是">${SPK}</button></div><div><span style="font-size:40px;font-weight:600">${pyHtml('sì')}</span><small><span class="zh">四</span> สี่<br>ไม่ม้วนลิ้น</small><button class="audio press" data-act="audio" data-t="四">${SPK}</button></div></div></div>`});
  st.push(l1TileStep('ใช้นำหน้าพยางค์ที่ขึ้นต้นด้วยสระ','y w',['y','w'],'พยางค์ที่ไม่มีพยัญชนะต้นและขึ้นต้นด้วย i หรือ u จะเขียน y หรือ w นำ · ครบ 23 ตัวแล้ว'));
  QA(l1Pick('zhchshr',2,'พยัญชนะต้น'));QA(l1Pick('zcs',2,'พยัญชนะต้น'));QA(l1Pick('zhz',1,'พยัญชนะต้น'));QA(l1Pick('shs',1,'พยัญชนะต้น'));QA(l1Pick('chc',1,'พยัญชนะต้น'));QA(l1Pick('yw',1,'พยัญชนะต้น'));
  return st}
 if(L.id===1007){ /* 0-5 สระเดี่ยว */
  st.push(l1Intro(L,`<p class="l1p">สระ (韵母) คือเสียงที่ตามหลังพยัญชนะต้น เริ่มจากสระเดี่ยว 6 ตัว a o e i u ü และ er</p><p class="l1p">ตัวอย่างบางคำเขียนด้วย y w นำหน้า เพราะไม่มีพยัญชนะต้น ตามที่เรียนในบท 0-4</p>`));
  st.push(l1TileStep('สระเดี่ยว 1','a o e',['a','o','e'],'e ออกเสียง เออ ไม่ใช่ เอ · ในคลิป 摸 มีเสียง m นำ ให้ฟังส่วนท้าย'));
  st.push(l1TileStep('สระเดี่ยว 2','i u ü er',['i','u','ü','er'],'ü ทำปากห่อกลมแล้วออกเสียง อี · er คือ เออ แล้วม้วนลิ้น'));
  QA(l1Pick('aeu',2,'สระ'));QA(l1Pick('aoi',1,'สระ'));QA(l1Pick('uu',2,'สระ'));QA(l1Pick('iuu',1,'สระ'));QA(l1Pick('eer',1,'สระ'));
  return st}
 if(L.id===1008){ /* 0-6 สระผสม */
  st.push(l1Intro(L,`<p class="l1p">สระผสมคือสระเดี่ยวตั้งแต่ 2 ตัวขึ้นไปออกเสียงต่อเนื่องกันเป็นเสียงเดียว</p>`));
  st.push(l1TileStep('สระผสม 1','ai ei ao ou',['ai','ei','ao','ou']));
  st.push(l1TileStep('สระผสมที่ขึ้นต้นด้วย i','ia ie iao iu',['ia','ie','iao','iu'],'iu เป็นรูปย่อของ iou'));
  st.push(l1TileStep('สระผสมที่ขึ้นต้นด้วย u และ ü','ua uo uai ui üe',['ua','uo','uai','ui','üe'],'ui เป็นรูปย่อของ uei'));
  QA(l1Pick('aieiaoou',3,'สระ'));QA(l1Pick('iaie',2,'สระ'));QA(l1Pick('uaui',2,'สระ'));QA(l1Pick('uee',1,'สระ'));
  return st}
 if(L.id===1009){ /* 0-7 สระเสียงขึ้นจมูก */
  st.push(l1Intro(L,`<p class="l1p">สระที่ลงท้ายด้วย n หรือ ng · n ปิดท้ายแบบ น (ปลายลิ้นแตะเหงือก) · ng ปิดท้ายแบบ ง (โคนลิ้นยก)</p>`));
  st.push(l1TileStep('ลงท้ายด้วย n','an en in ün',['an','en','in','ün']));
  st.push(l1TileStep('ลงท้ายด้วย ng','ang eng ing ong',['ang','eng','ing','ong']));
  st.push(l1TileStep('สระนาสิกที่มี i หรือ u นำ','ian uan iang uang iong',['ian','uan','iang','uang','iong']));
  QA(l1Pick('anang',2,'สระ'));QA(l1Pick('eneng',2,'สระ'));QA(l1Pick('ining',2,'สระ'));QA(l1Pick('hnasal',1,'สระ'));QA(l1Pick('uanuang',1,'สระ'));
  return st}
 if(L.id===1002){ /* 0-8 วรรณยุกต์ */
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="l1code">${L.code}</div><div class="large" style="padding:6px 0 0">วรรณยุกต์ 4 เสียง</div><p class="l1p">ภาษาจีนกลางมี 4 เสียงวรรณยุกต์ (声调) พยางค์เดียวกันแต่เสียงต่างกัน ความหมายก็ต่างกัน · แตะแต่ละช่องเพื่อฟัง</p>
   <div class="l1tones">${L1TONE.map((t,i)=>`<button class="l1tn press tc${i+1}" data-act="audio" data-t="${t[0]}">${l1Contour(i+1)}<b>${t[1]}</b><span><span class="zh">${t[0]}</span> ${t[2]}</span></button>`).join('')}</div></div>`});
  L1TONE.forEach((t,i)=>{const g=TONE_GUIDE[i];st.push({k:'h',say:t[0],btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">${i+1}/4 · ${g.name}</div><div class="l1tbig tc${i+1}">${l1Contour(i+1)}</div><div style="font-size:52px;font-weight:600" class="t${i+1}">${t[1]}</div><div><span class="zh" style="font-size:30px">${t[0]}</span> <span style="font-size:20px">= ${t[2]}</span></div><p class="l1p">${g.thai}</p>${g.like?`<p class="cap">${g.like}</p>`:''}<button class="audio lg press" data-act="audio" data-t="${t[0]}">${SPK}<span>ฟังเสียง</span></button></div>`})});
  st.push({k:'h',say:'吗',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">เสียงที่ 5</div><div class="large" style="padding:4px 0 0">เสียงเบา (轻声)</div><div style="font-size:52px;font-weight:600;margin-top:8px">ma</div><div><span class="zh" style="font-size:30px">吗</span> <span style="font-size:20px">= คำลงท้ายคำถาม</span></div>
   <p class="l1p">ไม่มีเครื่องหมายวรรณยุกต์ ออกเสียงสั้นและเบา มักเป็นคำท้ายประโยคหรือพยางค์หลังของคำ เช่น 谢谢 xièxie</p><button class="audio lg press" data-act="audio" data-t="吗">${SPK}<span>ฟังเสียง</span></button></div>`});
  shuffle([0,1,2,3]).forEach(k=>{const mk=()=>{const o=shuffle([0,1,2,3]);return {w:null,lbl:L1TONE[k][1],html:`<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกเส้นเสียง</div>${l1Aud(L1TONE[k][0])}</div><div class="pgrid">${o.map((t,i)=>`<button class="opt ptile press tc${t+1}" data-i="${i}"><span class="k">${LET[i]}</span>${l1Contour(t+1,'pic-t')}<span class="l1tl">${L1TONE[t][1]}</span></button>`).join('')}</div>`,ans:o.indexOf(k),reveal:l1Txt(`<b class="t${k+1}">${L1TONE[k][1]}</b> <span class="zh">${L1TONE[k][0]}</span> = ${L1TONE[k][2]} · ${TONE_GUIDE[k].name}`)}};const q=mk();q.rq=()=>({k:'q',q:mk()});Q(q)});
  const TG=[['汤','tāng'],['糖','táng'],['躺','tǎng'],['烫','tàng']];shuffle([0,1,2,3]).slice(0,2).forEach(k=>Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud(TG[k][0])}`,TG.map(x=>x[1]),k,l1Txt(`<b class="t${k+1}">${TG[k][1]}</b> <span class="zh">${TG[k][0]}</span> · ${TONE_GUIDE[k].name}`),TG[k][1])));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud('吗')}`,['ma','mā','mà'],0,l1Txt('<b>ma</b> <span class="zh">吗</span> · เสียงเบา ไม่มีเครื่องหมาย'),'ma'));
  return st}
 if(L.id===1010){ /* 0-9 ประกอบพยางค์และกฎการเขียน */
  const part=(i,f,hz,th)=>`<div class="card" style="margin:10px 16px 0;padding:8px 12px"><div class="l1parts" style="font-size:36px;margin-top:0"><span class="pi">${i}</span><span class="pf">${f}</span></div><div style="font-size:16px;margin-top:6px"><span class="zh">${hz}</span> ${th} <button class="audio press" style="vertical-align:middle" data-act="audio" data-t="${hz}">${SPK}</button></div></div>`;
  st.push(l1Intro(L,`<p class="l1p">นำพยัญชนะต้น สระ และวรรณยุกต์ที่เรียนมาประกอบเป็นพยางค์ แล้วเรียนกฎการเขียนพินอินที่ต้องรู้</p>${part('h','ǎo','好','ดี')}${part('sh','uǐ','水','น้ำ')}${part('x','iǎo','小','เล็ก')}`));
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">กฎที่ 1</div><div class="large" style="padding:4px 0 0">วางเครื่องหมายวรรณยุกต์ที่ไหน</div>
   <div class="l1legend" style="font-size:15.5px;gap:10px"><div><i class="pt"></i>มี a ใส่ที่ a · ${pyHtml('hǎo')} ${pyHtml('kuài')}</div><div><i class="pt"></i>ไม่มี a แต่มี o หรือ e ใส่ที่ตัวนั้น · ${pyHtml('duō')} ${pyHtml('xiě')}</div><div><i class="pt"></i>iu และ ui ใส่ที่ตัวหลัง · ${pyHtml('liù')} ${pyHtml('duì')}</div><div><i class="pt"></i>มีสระตัวเดียว ใส่ที่ตัวนั้น · ${pyHtml('nǐ')} ${pyHtml('wǔ')}</div></div></div>`});
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">กฎที่ 2</div><div class="large" style="padding:4px 0 0">y w และจุดบน ü</div>
   <div class="l1legend" style="font-size:15.5px;gap:10px"><div><i class="pf"></i>ไม่มีพยัญชนะต้น: i เขียน yi · u เขียน wu · ü เขียน yu · ${pyHtml('yī')} ${pyHtml('wǔ')} ${pyHtml('yú')}</div><div><i class="pf"></i>ü หลัง j q x y ตัดจุดออก เขียนเป็น u · ${pyHtml('qù')} ${pyHtml('xuě')} ${pyHtml('yuè')}</div><div><i class="pf"></i>ü หลัง n l ต้องคงจุดไว้ · ${pyHtml('lǜ')} เขียว ต่างจาก ${pyHtml('lù')} ถนน</div></div>
   <div class="card l1two"><div><span style="font-size:34px;font-weight:600">${pyHtml('qù')}</span><small><span class="zh">去</span> ไป · อ่าน q+ü</small><button class="audio press" data-act="audio" data-t="去">${SPK}</button></div><div><span style="font-size:34px;font-weight:600">${pyHtml('lǜ')}</span><small><span class="zh">绿</span> เขียว</small><button class="audio press" data-act="audio" data-t="绿">${SPK}</button></div></div></div>`});
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">กฎที่ 3</div><div class="large" style="padding:4px 0 0">รูปย่อ และเสียง 3 ต่อกัน</div>
   <div class="l1legend" style="font-size:15.5px;gap:10px"><div><i class="pi"></i>iou เขียน iu · ${pyHtml('liù')}</div><div><i class="pi"></i>uei เขียน ui · ${pyHtml('duì')}</div><div><i class="pi"></i>uen เขียน un · ${pyHtml('chūn')}</div><div><i class="pt"></i>เสียง 3 สองตัวติดกัน ตัวแรกอ่านเป็นเสียง 2 แต่ยังเขียนเสียง 3 · ${pyHtml('nǐ hǎo')} อ่านว่า ní hǎo</div></div>
   <button class="audio lg press" data-act="audio" data-t="你好">${SPK}<span>ฟัง 你好</span></button></div>`});
  const sp=(q,opts,rev,lbl)=>Q(l1PyQ(`<div class="cap" style="font-size:15px;margin:0 16px">เขียนพินอินอย่างไร</div><div style="font-size:20px;margin-top:10px">${q}</div>`,opts,0,l1Txt(rev),lbl));
  sp('<span class="zh">去</span> ไป · q + ü + เสียง 4',['qù','qǜ','qiù'],'ü หลัง j q x y เขียนเป็น u · <b>qù</b>','qù');
  sp('<span class="zh">绿</span> เขียว · l + ü + เสียง 4',['lǜ','lù','lüè'],'หลัง n l ต้องคงจุดบน ü · <b>lǜ</b> (lù คือ 路 ถนน)','lǜ');
  sp('<span class="zh">好</span> ดี · h + ao + เสียง 3',['hǎo','haǒ','hǎó'],'มี a ใส่เครื่องหมายที่ a · <b>hǎo</b>','hǎo');
  sp('<span class="zh">六</span> หก · l + iu + เสียง 4',['liù','lìu','lioù'],'iu ใส่เครื่องหมายที่ตัวหลัง · <b>liù</b>','liù');
  sp('<span class="zh">五</span> ห้า · u + เสียง 3 ไม่มีพยัญชนะต้น',['wǔ','ǔ','yǔ'],'ไม่มีพยัญชนะต้น u เขียนเป็น wu · <b>wǔ</b>','wǔ');
  [['水','shuǐ',['shuǐ','suǐ','shǔ']],['雪','xuě',['xuě','xiě','xuè']],['月','yuè',['yuè','yè','yuě']]].forEach(([hz,py,o])=>Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud(hz)}`,o,0,l1Txt(`<b>${pyHtml(py)}</b> <span class="zh">${hz}</span>`),py)));
  return st}
 /* 0-10 [1003] ทดสอบท้ายตอน: พยัญชนะ 3 · สระ 3 · วรรณยุกต์ 3 · ทั้งพยางค์ 3 */
 st.push({k:'h',btn:'เริ่มทดสอบ',html:`<div class="center l1snd"><div class="l1code">${L.code||'0-10'}</div><div class="large" style="padding:6px 0 0">ทดสอบฟังเสียง</div><p class="l1p">ทดสอบ 12 ข้อ ฟังแล้วเลือกพยัญชนะต้น สระ วรรณยุกต์ และพินอินทั้งพยางค์ · ตอบถูก 70% ขึ้นไป (9 ข้อ) นับว่าผ่านตอนที่ 0</p><div class="l1lama">${M('listening')}</div></div>`});
 const qs=[];shuffle(['bpmf','dtnl','gkh','jqx','zhchshr','zcs']).slice(0,3).forEach(k=>qs.push(...l1Pick(k,1,'พยัญชนะต้น')));
 shuffle(['aeu','uu','aieiaoou','iaie','anang','eneng','ining']).slice(0,3).forEach(k=>qs.push(...l1Pick(k,1,'สระ')));
 const fam={};(window.PIN_SYL||[]).forEach(r=>{if(r[4]<1||r[4]>4)return;const k=r[2]+'|'+r[3];(fam[k]=fam[k]||{})[r[4]]=fam[k][r[4]]||r});
 const full=shuffle(Object.values(fam).filter(f=>f[1]&&f[2]&&f[3]&&f[4]&&(!window.AUDIO_INDEX||[1,2,3,4].every(t=>AUDIO_INDEX[f[t][0]]))));
 full.slice(0,3).forEach(f=>{const t=1+(Math.random()*4|0),r=f[t];qs.push(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกวรรณยุกต์</div>${l1Aud(r[0])}`,[1,2,3,4].map(x=>f[x][1]),t-1,l1Txt(`<b class="t${t}">${r[1]}</b> · ${TONE_GUIDE[t-1].name}`),r[1]))});
 shuffle([['水','shuǐ',['shuǐ','suǐ','shǔ']],['雪','xuě',['xuě','xiě','xuè']],['月','yuè',['yuè','yè','yuě']],['去','qù',['qù','jù','qiù']],['绿','lǜ',['lǜ','lù','nǚ']],['想','xiǎng',['xiǎng','xiǎn','qiǎng']],['春','chūn',['chūn','cūn','chēn']]]).slice(0,3).forEach(([hz,py,o])=>qs.push(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud(hz)}`,o,0,l1Txt(`<b>${pyHtml(py)}</b> <span class="zh">${hz}</span>`),py)));
 shuffle(qs).forEach(Q);
 return st}
/* ตอน 0: ผ่านบททดสอบท้ายตอน (1003a) = นับว่าจบทุกบทในตอน 0 (ไม่ล็อกความคืบหน้าเดิม) */
const L1_SEC0=()=>LESSONS.filter(l=>l.v3&&l.chapter===1000).map(l=>l.id+'a');
function l1Sec0Fix(){try{if(typeof S==='undefined'||!S||!S.parts||!S.parts.includes('1003a'))return;let ch=0;L1_SEC0().forEach(id=>{if(unitBy(id)&&!S.parts.includes(id)){S.parts.push(id);S.stars=S.stars||{};S.stars[id]=Math.max(S.stars[id]||0,2);ch=1}});if(ch)save()}catch(e){}}
l1Sec0Fix();
{const _mr=mountRoot;mountRoot=function(...a){l1Sec0Fix();return _mr.apply(this,a)}}

/* ---------- ด่านทบทวน (ฉาก B) ---------- */
function l1SceneHtml(L,tap){const ch=l1Ch(L),ws=l1SceneWords(L),reg=window.ART_IDX&&ART_IDX['scene/l'+(ch.lv||1)+'-p'+ch.ep];
 return `<div class="l1scene" style="background:${ch.bg||'#F3EEE6'}">${reg?`<img class="l1simg" src="assets/art/scene/l${ch.lv||1}-p${ch.ep}.webp" alt="">`:''}<div class="l1sg n${Math.min(ws.length,9)}">${ws.map((w,i)=>tap?`<button class="opt l1sit press" data-i="${i}" aria-label="ภาพที่ ${i+1}"><span class="k"></span>${l1Tile(w,'pic-t')}</button>`:`<button class="l1sit press" data-act="audio" data-t="${w.zh}" data-l1sc="${i}">${l1Tile(w,'pic-t')}<span class="l1sl"><span class="zh">${w.zh}</span> <small class="py">${pyPlain(w.py)}</small></span></button>`).join('')}</div>${reg?'':`<span class="l1slama">${M('teach')}</span>`}</div>`}
function l1SceneWords(L){const all=l1Taught(L);return (L.scene||[]).map(z=>all.find(w=>w.zh===z)||ALLW.find(w=>w.zh===z)).filter(Boolean).filter(l1PicOk)}
function l1GateSteps(u,L){const ch=l1Ch(L),pool=l1Taught(L),st=[],Q=q=>q&&st.push({k:'q',q});const sw=l1SceneWords(L);
 const partL=LESSONS.filter(l=>l.chapter===L.chapter&&l.kind==='lex'),pw=uniqW(partL.flatMap(l=>l.words));
 const tapped=new Set();
 st.push({k:'h',lock:sw.length>0,btn:'เริ่มทบทวน',html:`<div class="center"><div class="cap">ด่านทบทวน · ตอนที่ ${ch.ep}</div><div class="large" style="padding:4px 0 6px">${ch.th}</div></div>${l1SceneHtml(L,false)}<p class="cap center mt12" id="l1sc">แตะทุกภาพเพื่อฟัง · 0/${sw.length}</p><p class="cap center">จากนั้นตอบคำถามจากทั้งตอน ผ่านเมื่อตอบถูก 70% ขึ้นไป</p>`,
  mount(stage,dock){const nb=$('[data-sa=next]',dock);stage.onclick=e=>{const b=e.target.closest('[data-l1sc]');if(!b)return;b.classList.add('on');tapped.add(b.dataset.l1sc);const c=$('#l1sc',stage);if(c)c.textContent=`แตะทุกภาพเพื่อฟัง · ${tapped.size}/${sw.length}`;if(tapped.size>=sw.length&&nb)nb.disabled=false}}});
 shuffle(sw.slice()).slice(0,3).forEach(w=>{const q={w,type:'aud2pic',ans:sw.indexOf(w),reveal:l1Rev(w),html:`<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วแตะในภาพ</div>${l1Aud(w.zh)}</div>${l1SceneHtml(L,true)}`};Q(q)});
 shuffle(pw.filter(w=>!sw.includes(w))).slice(0,4).forEach((w,i)=>Q(l1Check(w,pool,i)));
 const so=shuffle(partL.flatMap(l=>l.sents.map((s,k)=>[l,k]))).find(([l,k])=>parseSent(l.sents[k]).zh.length>=3);if(so)Q(ordQ(so[0],so[1]));
 const rl=shuffle(partL.filter(l=>l.rq&&l.dlg&&l.dlg.length))[0];if(rl)Q(replyQ(rl));
 return st}

{const _us=unitSteps;unitSteps=function(u){const L=lessonBy(u.lesson);if(!L||!L.v3)return _us(u);
 if(L.kind==='snd')return l1SndSteps(u,L);if(L.kind==='gate')return l1GateSteps(u,L);return l1LexSteps(u,L)}}

/* ---------- จบบท / ไม่ผ่าน ---------- */
window.l1DoneStrip=L=>{const ws=L.kind==='gate'?l1SceneWords(L):L.words;if(!ws.length)return '';return `<div class="l1thumbs mt12">${ws.map(w=>`<div class="l1th">${l1Show(w,'pic-mini')}<span class="zh">${w.zh}</span></div>`).join('')}</div>`};
{const _fu=finishUnit;finishUnit=function(u,res){const L=lessonBy(u.lesson);if(!L||!L.v3)return _fu(u,res);const r=res.correct/Math.max(1,res.total);
 if((L.kind==='gate'||L.id===1003)&&r<.7){replace('l1retry',{u,L,res});return}
 if(L.id===1003)L1_SEC0().forEach(id=>{if(unitBy(id)&&!unitDone(id)){S.parts.push(id);S.stars[id]=Math.max(S.stars[id]||0,2)}});
 return _fu(u,res)}}
SC.l1retry=({u,L,res})=>({nav:'<header class="nav"></header>',noRefresh:true,
 body:`<div class="center" style="padding:calc(var(--st) + 24px) 20px 0"><div style="width:200px;height:190px;margin:0 auto">${M('think')}</div><div class="cap mt8">${lnoTxt(L)}</div><div class="large" style="padding:2px 0">ยังไม่ผ่าน</div>
 <p style="color:var(--sub2);font-size:15px;margin:6px 0 0">ตอบถูก ${res.correct}/${res.total} ข้อ · ต้องได้ 70% ขึ้นไป</p>${res.wrong.length?`<p class="cap mt12">ข้อที่พลาดเพิ่มในรายการทบทวนแล้ว</p>`:''}</div>`,
 extra:`<div class="dock"><button class="pill press" id="l1again"><b>ลองอีกครั้ง</b></button><button class="pill sm ghost press mt12" id="l1back">กลับไปที่แผนที่</button></div>`,
 mount(el){$('#l1again',el).onclick=()=>replace('lesson',{uid:u.id});$('#l1back',el).onclick=()=>mountRoot('book')}});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-l1go]');if(!t)return;const id=t.dataset.l1go;vib(8);stopAudio();
 if(t.closest('.stage'))replace('lesson',{uid:id});else{try{closeSheet()}catch(x){}setTimeout(()=>push('lesson',{uid:id}),120)}});

/* ---------- แผ่นรายละเอียดบท ---------- */
const L1SND={1001:'รู้ว่าพินอินคืออะไร และพยางค์หนึ่งมีพยัญชนะต้น สระ วรรณยุกต์',1004:'พยัญชนะต้นกลุ่มริมฝีปาก b p m f และกลุ่มปลายลิ้น d t n l',1005:'พยัญชนะต้นกลุ่มโคนลิ้น g k h และกลุ่มลิ้นแบน j q x',1006:'พยัญชนะต้นกลุ่มม้วนลิ้น zh ch sh r กลุ่มลิ้นตรง z c s และ y w',1007:'สระเดี่ยว a o e i u ü และ er',1008:'สระผสม ai ei ao ou · ia ie iao iu · ua uo uai ui üe',1009:'สระเสียงขึ้นจมูก an en in ün · ang eng ing ong และ ian uan iang uang iong',1002:'วรรณยุกต์ 4 เสียงและเสียงเบา',1010:'ประกอบพยางค์ ตำแหน่งวรรณยุกต์ กฎ y w และ ü',1003:'ทดสอบฟังเสียง 12 ข้อ ผ่าน 70% แล้วนับว่าจบตอนที่ 0'};
{const _us=unitSheet;unitSheet=function(id){const u=unitBy(id),L=u&&lessonBy(u.lesson);if(!L||!L.v3)return _us(id);const done=unitDone(id),open=unitOpen(id);
 openSheet(`<div style="padding:0 20px"><div class="cap">${lnoTxt(L)}</div><div style="font-size:24px;font-weight:700">${L.th} <span class="zh" style="font-weight:400">${L.zh}</span></div>${L.can?`<div class="cap mt8">เป้าหมาย: ${L.can}</div>`:''}
 ${L.words.length?`<div class="l1sw">${L.words.map(w=>`<div class="l1swi">${l1Show(w,'pic-mini')}<span class="zh">${w.zh}</span><small>${pyHtml(w.py)}</small><small>${open?w.th:'?'}</small></div>`).join('')}</div>`:`<p class="cap mt12" style="font-size:14px">${L.kind==='gate'?'ทบทวนคำทั้งตอนจากภาพ · ผ่านเมื่อตอบถูก 70% ขึ้นไป':L1SND[L.id]||''}</p>`}
 ${open?`<button class="pill row1 press mt16" id="ls">${done?'เรียนอีกครั้ง':'เริ่มเรียน'}</button>`:`<div class="banner mt16" style="background:#F2ECE4;color:var(--sub2);text-align:center">เรียนบทก่อนหน้าให้จบก่อน</div>`}
 ${L.id===1001&&!unitDone('1003a')?`<button class="pill sm ghost press mt12" data-l1go="1003a">เคยเรียนพินอินแล้ว · ไปทดสอบท้ายตอน</button>`:''}</div>`,{onMount:sh=>{const b=$('#ls',sh);if(b)b.onclick=()=>{closeSheet();setTimeout(()=>push('lesson',{uid:id}),120)}}})}}

/* แผนที่ระดับ 1: ใช้แผนที่ซิกแซกแบบ C ร่วมกับทุกระดับ (lcMap ใน levels.js รองรับบท v3 ด่านทบทวน และเพื่อนในห้อง) */
