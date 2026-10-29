/* ระดับ 1 โครงใหม่ (v3): บทเสียง (ตอน 0) · บทคำศัพท์ (ภาพนำ + กรอบประโยค) · ด่านทบทวนท้ายตอน
   ข้อมูลบท: data/hsk1.js (สร้างจาก tools/l1-build/spec.py) · ตัวละครในฉาก/การ์ด: ลามาเท่านั้น
   ภาพที่ยังไม่มี: ใช้ภาพวาดในแอป (ตัวเลข ปฏิทิน นาฬิกา ตำแหน่ง ดวงอาทิตย์) หรือการ์ดประโยค
   ภาพใหม่จาก PIXEL ลงทะเบียนผ่าน tools/pic-build/add_pics.py แล้วจะแสดงแทนอัตโนมัติ */
if(window.PIC_TYPE_X&&window.PIC_TYPE)Object.assign(PIC_TYPE,PIC_TYPE_X);
const L1NUM={'零':0,'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10};
const L1GRP={cal:['今天','明天','昨天','星期','年','月','日'],clk:['点','分钟'],sun:['上午','中午','下午'],pos:['上','下','前面','后面']};
const l1Img=z=>`assets/art/word/${encodeURIComponent(z)}.webp`;
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
const l1Rev=w=>`<div class="ans pic-rev">${l1Show(w,'pic-mini')}<div class="tx"><span class="zh" style="font-size:24px">${w.zh}</span> ${pyHtml(w.py)}<div style="margin-top:2px">= <b>${w.th}</b></div></div>${spkBtn(w.zh,'','ฟัง')}</div>`;
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
function l1CardHtml(w,n,t,L){const sz=w.zh.length>3?56:w.zh.length>2?68:w.zh.length>1?84:96;
 return `<div class="center wc l1card"><div class="cap" style="letter-spacing:1px">${L.code} · คำใหม่ ${n}/${t}</div><div class="l1pic">${l1Show(w,'pic-big')}</div>
 <div class="bigzh zh" style="font-size:${sz}px">${w.zh}</div><div style="font-size:28px;font-weight:500;margin-top:2px">${pyHtml(w.py)}</div><div style="font-size:24px;font-weight:600;margin-top:6px;padding:0 20px">${w.th}</div>
 <button class="audio lg press" aria-label="ฟังเสียง ${w.zh}" data-act="audio" data-t="${w.zh}">${SPK}<span>ฟังเสียง</span></button></div>
 <details class="l1more card"><summary>เพิ่มเติม</summary><div class="l1mi"><span class="hb">อ่านแบบไทย</span> <b>${w.h}</b> <span class="cap">(ใกล้เคียง)</span></div>${w.mn?`<div class="l1mi">${String(w.mn).replace(/^ตัวช่วยจำ:\s*/,'')}</div>`:''}
 ${w.ex?`<div class="l1mi"><div class="zh" style="font-size:20px">${zhHtml(w.ex,w.exPy)}</div><div style="font-size:13px">${pyHtml(w.exPy)}</div><div class="cap">${w.exTh}</div>${spkBtn(w.ex,'','ฟังประโยค')}</div>`:''}</details>`}
function l1FrameStep(L,pool){const f=L.fr;const vars=f.s.map(k=>{const s=parseSent(L.sents[k]);return {s,tok:strip(s.zh[f.k]||'')}}).filter((v,i,a)=>v.tok&&a.findIndex(x=>x.tok===v.tok)===i);
 if(vars.length<2)return null;const wOf=t=>pool.find(w=>w.zh===t)||ALLW.find(w=>w.zh===t);let cur=0;const tried=new Set([0]);
 const sentH=()=>{const v=vars[cur],w=wOf(v.tok);return `<div class="l1fs zh">${v.s.zh.map((t,i)=>i===f.k?t.replace(v.tok,`<span class="l1slot">${w?l1Tile(w,'l1st'):''}<b>${v.tok}</b></span>`):`<span>${t}</span>`).join('')}</div><div class="l1fp">${pyHtml(v.s.pyAll)}</div><div class="l1ft">${v.s.th}</div>`};
 const cnt=()=>`ลองครบ ${vars.length} คำเพื่อไปต่อ · ${tried.size}/${vars.length}`;
 return {k:'h',lock:true,btn:'ต่อไป',html:`<div class="center"><div class="cap" style="font-size:14px">กรอบประโยคของบทนี้</div><div class="cap">แตะคำด้านล่างเพื่อเปลี่ยนคำในช่อง แล้วฟังทั้งประโยค</div></div>
 <div class="card l1frame"><div id="l1fsent">${sentH()}</div><button class="cap press spkl" id="l1fsp"><span class="spi">${SPK}</span>ฟังประโยค</button></div>
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

/* ---------- ตอน 0: เสียง ---------- */
const L1TONE=[['妈','mā','แม่'],['麻','má','ป่าน'],['马','mǎ','ม้า'],['骂','mà','ด่า']];
const l1Contour=(t,cls)=>{const d=['M14 22 L86 22','M14 56 L86 20','M14 52 L44 82 L86 30','M14 18 L86 84'][t-1];
 return `<svg class="l1ct ${cls||''}" viewBox="0 0 100 100" aria-hidden="true">${[18,34,50,66,82].map(y=>`<line x1="8" y1="${y}" x2="92" y2="${y}" stroke="#EFE7DC" stroke-width="1.4"/>`).join('')}<path d="${d}" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
function l1PyQ(top,opts,ans,reveal,lbl){const o=opts.map((x,i)=>({x,i}));const sh=shuffle(o);return {w:null,lbl:lbl||'เสียง',custom:true,top,optsHtml:sh.map(v=>`<span style="font-size:24px;font-weight:500">${v.x}</span>`),ans:sh.findIndex(v=>v.i===ans),reveal}}
const l1Txt=(t)=>`<div class="ans">${t}</div>`;
function l1SndSteps(u,L){const st=[],Q=q=>q&&st.push({k:'q',q});
 if(L.code==='0-1'){
  st.push({k:'h',say:'你好',btn:'ต่อไป',html:`<div class="center l1snd"><div class="l1code">0-1</div><div class="large" style="padding:6px 0 0">ตัวจีน กับ พินอิน</div>
   <div class="card l1two"><div><span class="zh" style="font-size:54px">你好</span><small>ตัวจีน (汉字)<br>บอกความหมาย</small></div><div><span style="font-size:34px;font-weight:600">${pyHtml('nǐ hǎo')}</span><small>พินอิน<br>บอกวิธีอ่าน</small></div></div>
   <p class="l1p">พินอินเขียนด้วยอักษรโรมัน ช่วยให้อ่านตัวจีนออกเสียงได้ · 你好 อ่านว่า nǐ hǎo แปลว่า สวัสดี</p>
   <button class="audio lg press" data-act="audio" data-t="你好">${SPK}<span>ฟังเสียง</span></button>
   <button class="pill sm ghost press mt16" data-l1go="1003a">เคยเรียนพินอินแล้ว · ไปทดสอบบท 0-3</button></div>`});
  st.push({k:'h',say:'八',btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">พินอิน 1 พยางค์ มี 3 ส่วน</div><div class="zh" style="font-size:72px;margin-top:6px">八</div>
   <div class="l1parts"><span class="pi">b</span><span class="pf">ā</span></div>
   <div class="l1legend"><div><i class="pi"></i><b>b</b> พยัญชนะต้น</div><div><i class="pf"></i><b>a</b> สระ</div><div><i class="pt"></i><b>ˉ</b> วรรณยุกต์ (เครื่องหมายบนสระ)</div></div>
   <p class="l1p">八 bā แปลว่า แปด · เครื่องหมายบนสระบอกเสียงสูงต่ำ</p><button class="audio lg press" data-act="audio" data-t="八">${SPK}<span>ฟังเสียง</span></button></div>`});
  Q(l1PyQ(`<div class="cap" style="font-size:14px">พินอินมีไว้ทำอะไร</div><div class="zh" style="font-size:48px;margin-top:10px">你好</div><div style="font-size:22px">${pyHtml('nǐ hǎo')}</div>`,['บอกวิธีอ่านออกเสียง','บอกความหมายของคำ','บอกจำนวนขีดของตัวจีน'],0,l1Txt('พินอินบอกวิธีอ่าน · ความหมายดูจากตัวจีนและคำแปล'),'พินอิน'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud('八')}`,['bā','pā','mā'],0,l1Txt('<b>bā</b> 八 = แปด'),'bā'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ในพินอิน bā ส่วนไหนคือวรรณยุกต์</div><div style="font-size:56px;font-weight:600;margin-top:8px">bā</div>`,['เครื่องหมาย ˉ บนตัว a','ตัว b','ตัว a'],0,l1Txt('วรรณยุกต์คือเครื่องหมายบนสระ บอกเสียงสูงต่ำ'),'วรรณยุกต์'));
  Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud('你好')}`,['nǐ hǎo','nī hāo','nì hào'],0,l1Txt(`<b>${pyHtml('nǐ hǎo')}</b> 你好 = สวัสดี`),'nǐ hǎo'));
  return st}
 if(L.code==='0-2'){
  st.push({k:'h',btn:'ต่อไป',html:`<div class="center l1snd"><div class="l1code">0-2</div><div class="large" style="padding:6px 0 0">สี่เสียง</div><p class="l1p">ภาษาจีนมี 4 เสียงวรรณยุกต์ เสียงต่างกัน ความหมายก็ต่างกัน · แตะแต่ละช่องเพื่อฟัง</p>
   <div class="l1tones">${L1TONE.map((t,i)=>`<button class="l1tn press tc${i+1}" data-act="audio" data-t="${t[0]}">${l1Contour(i+1)}<b>${t[1]}</b><span><span class="zh">${t[0]}</span> ${t[2]}</span></button>`).join('')}</div>
   <p class="cap">นอกจากนี้มีเสียงเบา (ไม่มีเครื่องหมาย) เช่น xie ตัวหลังใน 谢谢</p></div>`});
  L1TONE.forEach((t,i)=>{const g=TONE_GUIDE[i];st.push({k:'h',say:t[0],btn:'ต่อไป',html:`<div class="center l1snd"><div class="cap">${i+1}/4 · ${g.name}</div><div class="l1tbig tc${i+1}">${l1Contour(i+1)}</div><div style="font-size:52px;font-weight:600" class="t${i+1}">${t[1]}</div><div><span class="zh" style="font-size:30px">${t[0]}</span> <span style="font-size:20px">= ${t[2]}</span></div><p class="l1p">${g.thai}</p>${g.like?`<p class="cap">${g.like}</p>`:''}<button class="audio lg press" data-act="audio" data-t="${t[0]}">${SPK}<span>ฟังเสียง</span></button></div>`})});
  shuffle([0,1,2,3]).forEach(k=>{const mk=()=>{const o=shuffle([0,1,2,3]);return {w:null,lbl:L1TONE[k][1],html:`<div class="center"><div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกเส้นเสียง</div>${l1Aud(L1TONE[k][0])}</div><div class="pgrid">${o.map((t,i)=>`<button class="opt ptile press tc${t+1}" data-i="${i}"><span class="k">${LET[i]}</span>${l1Contour(t+1,'pic-t')}<span class="l1tl">${L1TONE[t][1]}</span></button>`).join('')}</div>`,ans:o.indexOf(k),reveal:l1Txt(`<b class="t${k+1}">${L1TONE[k][1]}</b> <span class="zh">${L1TONE[k][0]}</span> = ${L1TONE[k][2]} · ${TONE_GUIDE[k].name}`)}};const q=mk();q.rq=()=>({k:'q',q:mk()});Q(q)});
  return st}
 /* 0-3 ทดสอบ: พยางค์เดียวกัน ต่างเสียง (มีคลิปเสียงจริงครบ 4 เสียง) */
 st.push({k:'h',btn:'เริ่มทดสอบ',html:`<div class="center l1snd"><div class="l1code">0-3</div><div class="large" style="padding:6px 0 0">ฟังแล้วเลือกเสียง</div><p class="l1p">ทดสอบ 10 ข้อ ฟังพยางค์แล้วเลือกพินอินที่มีเสียงวรรณยุกต์ตรงกัน · ตอบถูก 7 ข้อขึ้นไปนับว่าผ่านตอนที่ 0</p><div class="l1lama">${M('listening')}</div></div>`});
 const fam={};(window.PIN_SYL||[]).forEach(r=>{if(r[4]<1||r[4]>4)return;const k=r[2]+'|'+r[3];(fam[k]=fam[k]||{})[r[4]]=fam[k][r[4]]||r});
 const full=shuffle(Object.values(fam).filter(f=>f[1]&&f[2]&&f[3]&&f[4]&&(!window.AUDIO_INDEX||[1,2,3,4].every(t=>AUDIO_INDEX[f[t][0]]))));
 full.concat(shuffle(full.slice())).slice(0,10).forEach(f=>{const t=1+(Math.random()*4|0),r=f[t];Q(l1PyQ(`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกพินอิน</div>${l1Aud(r[0])}`,[1,2,3,4].map(x=>f[x][1]),t-1,l1Txt(`<b class="t${t}">${r[1]}</b> · ${TONE_GUIDE[t-1].name}`),r[1]))});
 return st}

/* ---------- ด่านทบทวน (ฉาก B) ---------- */
function l1SceneHtml(L,tap){const ch=l1Ch(L),ws=l1SceneWords(L),reg=window.ART_IDX&&ART_IDX['scene/l1-p'+ch.ep];
 return `<div class="l1scene" style="background:${ch.bg||'#F3EEE6'}">${reg?`<img class="l1simg" src="assets/art/scene/l1-p${ch.ep}.webp" alt="">`:''}<div class="l1sg n${Math.min(ws.length,9)}">${ws.map((w,i)=>tap?`<button class="opt l1sit press" data-i="${i}" aria-label="ภาพที่ ${i+1}"><span class="k"></span>${l1Tile(w,'pic-t')}</button>`:`<button class="l1sit press" data-act="audio" data-t="${w.zh}" data-l1sc="${i}">${l1Tile(w,'pic-t')}<span class="l1sl"><span class="zh">${w.zh}</span> <small class="py">${pyPlain(w.py)}</small></span></button>`).join('')}</div>${reg?'':`<span class="l1slama">${M('teach')}</span>`}</div>`}
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
 if((L.kind==='gate'||L.code==='0-3')&&r<.7){replace('l1retry',{u,L,res});return}
 if(L.code==='0-3')['1001a','1002a'].forEach(id=>{if(unitBy(id)&&!unitDone(id)){S.parts.push(id);S.stars[id]=Math.max(S.stars[id]||0,2)}});
 return _fu(u,res)}}
SC.l1retry=({u,L,res})=>({nav:'<header class="nav"></header>',noRefresh:true,
 body:`<div class="center" style="padding:calc(var(--st) + 24px) 20px 0"><div style="width:200px;height:190px;margin:0 auto">${M('think')}</div><div class="cap mt8">${lnoTxt(L)}</div><div class="large" style="padding:2px 0">ยังไม่ผ่าน</div>
 <p style="color:var(--sub2);font-size:15px;margin:6px 0 0">ตอบถูก ${res.correct}/${res.total} ข้อ · ต้องได้ 70% ขึ้นไป</p>${res.wrong.length?`<p class="cap mt12">ข้อที่พลาดเพิ่มในรายการทบทวนแล้ว</p>`:''}</div>`,
 extra:`<div class="dock"><button class="pill press" id="l1again"><b>ลองอีกครั้ง</b></button><button class="pill sm ghost press mt12" id="l1back">กลับไปที่แผนที่</button></div>`,
 mount(el){$('#l1again',el).onclick=()=>replace('lesson',{uid:u.id});$('#l1back',el).onclick=()=>mountRoot('book')}});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-l1go]');if(!t)return;const id=t.dataset.l1go;vib(8);stopAudio();
 if(t.closest('.stage'))replace('lesson',{uid:id});else{try{closeSheet()}catch(x){}setTimeout(()=>push('lesson',{uid:id}),120)}});

/* ---------- แผ่นรายละเอียดบท ---------- */
const L1SND={'0-1':'รู้จักตัวจีนกับพินอิน และส่วนประกอบของพยางค์','0-2':'ฟังและแยกเสียงวรรณยุกต์ทั้ง 4 เสียง','0-3':'ทดสอบฟังเสียง 10 ข้อ ผ่านแล้วนับว่าจบตอนที่ 0'};
{const _us=unitSheet;unitSheet=function(id){const u=unitBy(id),L=u&&lessonBy(u.lesson);if(!L||!L.v3)return _us(id);const done=unitDone(id),open=unitOpen(id);
 openSheet(`<div style="padding:0 20px"><div class="cap">${lnoTxt(L)}</div><div style="font-size:24px;font-weight:700">${L.th} <span class="zh" style="font-weight:400">${L.zh}</span></div>${L.can?`<div class="cap mt8">เป้าหมาย: ${L.can}</div>`:''}
 ${L.words.length?`<div class="l1sw">${L.words.map(w=>`<div class="l1swi">${l1Show(w,'pic-mini')}<span class="zh">${w.zh}</span><small>${pyHtml(w.py)}</small><small>${open?w.th:'?'}</small></div>`).join('')}</div>`:`<p class="cap mt12" style="font-size:14px">${L.kind==='gate'?'ทบทวนคำทั้งตอนจากภาพ · ผ่านเมื่อตอบถูก 70% ขึ้นไป':L1SND[L.code]||''}</p>`}
 ${open?`<button class="pill row1 press mt16" id="ls">${done?'เรียนอีกครั้ง':'เริ่มเรียน'}</button>`:`<div class="banner mt16" style="background:#F2ECE4;color:var(--sub2);text-align:center">เรียนบทก่อนหน้าให้จบก่อน</div>`}
 ${L.code==='0-1'&&!unitDone('1003a')?`<button class="pill sm ghost press mt12" data-l1go="1003a">เคยเรียนพินอินแล้ว · ไปทดสอบบท 0-3</button>`:''}</div>`,{onMount:sh=>{const b=$('#ls',sh);if(b)b.onclick=()=>{closeSheet();setTimeout(()=>push('lesson',{uid:id}),120)}}})}}

/* แผนที่ระดับ 1: ใช้แผนที่ซิกแซกแบบ C ร่วมกับทุกระดับ (lcMap ใน levels.js รองรับบท v3 ด่านทบทวน และเพื่อนในห้อง) */
