/* แบบทดสอบท้ายภาค 1–5 เล่นในเว็บ (แบบ A · การ์ดสอบเรียบสงบ ซ้งอี้อนุมัติ 3 พ.ย. 2026)
   เปิดจากหน้าแบบทดสอบของห้องเรียนคู่หนังสือ (bookch g=q1..q5) และ QR ในหนังสือ ?go=book&ch=q1..q5
   ขั้นตอน: หน้าเริ่ม → 10 ข้อ (ตอบแล้วเห็นผลทันที + คำอธิบายจากภาคผนวก ง + ลิงก์ทบทวนบท) → หน้าผลคะแนน
   ข้อมูล: data/book1-quiz.js (สร้างจาก tools/book-build/build_quiz.py)
   คะแนนสูงสุดเก็บในเครื่อง: localStorage lama-book1 → .quiz.q1 = {best,last,n,at} (ไม่แตะคีย์อื่นของห้องนี้) */
(function(){
const KEY='lama-book1',KK=['ก','ข','ค','ง'];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const zhw=s=>esc(s).replace(/([\u3400-\u9fff！？，。、…]+)/g,'<span class="bq-zh">$1</span>');
const isZh=s=>/[\u3400-\u9fff]/.test(s);
const CHK=(w=20)=>`<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const XX=(w=20)=>`<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const CLOSE=`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const SPK=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>`;
const STAR=on=>`<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" fill="${on?'#D9A21B':'#E6DCD0'}"/></svg>`;
const QZ=()=>window.BOOK1_QUIZ||{};
const part=n=>(window.BOOK1&&BOOK1.parts||[]).find(p=>p.n===+n)||null;
const nparts=()=>(window.BOOK1&&BOOK1.parts||[]).length||5;

/* ---------- คะแนนสูงสุด (เพิ่มคีย์ quiz เข้าไปในข้อมูลเดิม ไม่ลบ/ไม่เปลี่ยนคีย์อื่น) ---------- */
function rd(){try{const o=JSON.parse(localStorage.getItem(KEY)||'{}');return o&&typeof o==='object'?o:{}}catch(e){return null}}
function best(g){const o=rd();const r=o&&o.quiz&&o.quiz[g];return r&&typeof r.best==='number'?r:null}
function record(g,sc){const o=rd();if(!o)return null;const q=o.quiz=(o.quiz&&typeof o.quiz==='object')?o.quiz:{};const r=q[g]||{};
 q[g]={best:Math.max(typeof r.best==='number'?r.best:0,sc),last:sc,n:(r.n||0)+1,at:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}return q[g]}

/* ---------- สถานะของแต่ละหน้า (หนึ่งหน้าจอต่อหนึ่งแบบทดสอบ) ---------- */
const ST={};/* g -> {step:'intro'|'q'|'res', i, ans:[], pick, el, qr} */
function cur(){const t=stack[stack.length-1];return t&&t.name==='bookch'&&t.params&&ST[t.params.g]?ST[t.params.g]:null}
const secOf=i=>i<3?0:i<6?1:i<8?2:3;
const ttl=n=>`แบบทดสอบท้ายภาค ${n}`;

function top(s,mid){return `<header class="bq-top"><button class="bq-x press" data-go="bqclose" aria-label="ปิด">${CLOSE}</button>${mid}</header>`}
function opt(k,txt,st,mk,cls,i,dis){return `<button class="bq-opt ${st||''} press" data-go="bqpick" data-i="${i}"${dis?' disabled':''}><span class="bq-k">${k}</span><span class="${cls}">${txt}</span><span class="bq-mk">${mk||''}</span></button>`}

/* ---------- หน้าเริ่ม ---------- */
function introHtml(s){const Q=QZ()[s.g],p=part(s.n);const pg=p&&p.quiz&&p.quiz.p;const b=best(s.g);
 const chip=pg?`<span class="bq-chip">${s.qr?'มาจาก QR ':''}หนังสือหน้า ${pg}</span>`:'';
 const rows=Q.sec.map((t,j)=>`<div><span>${esc(t)}</span><b>ข้อ ${['1–3','4–6','7–8','9–10'][j]}</b></div>`).join('');
 const pass=s.n<nparts()?`ได้ 8 คะแนนขึ้นไป ไปต่อภาค ${s.n+1} ได้เลย`:'ได้ 8 คะแนนขึ้นไป แสดงว่าจบเล่มนี้ได้ดี';
 return top(s,`<div class="bq-sp"></div>${chip}`)+`<main class="bq-main"><div class="bq-hero"><img src="assets/mascot/teach.webp" alt="" draggable="false"><div class="bq-sec">ภาค ${s.n}${p?' · '+esc(p.t):''}</div><div class="bq-h1">${ttl(s.n)}</div>
 <div class="bq-meta"><span>10 ข้อ</span><span>ข้อละ 1 คะแนน</span><span>ประมาณ 5 นาที</span></div>${b?`<div class="bq-best">คะแนนสูงสุดที่เคยทำ ${b.best} / 10</div>`:''}</div>
 <div class="bq-card bq-parts">${rows}</div>
 <div class="bq-note">ทำโดยไม่เปิดบทเรียน ตอบแล้วจะเห็นผลทันที<br>${pass}</div></main>
 <div class="bq-foot"><button class="bq-btn press" data-go="bqstart">เริ่มทำแบบทดสอบ</button><button class="bq-link press" data-go="bqkey">ทำในหนังสือแล้ว ดูเฉลยได้ที่ภาคผนวก ง</button></div>`}

/* ---------- หน้าโจทย์ ---------- */
function qHtml(s){const Q=QZ()[s.g],q=Q.qs[s.i],n=s.i+1,pk=s.pick,done=pk!=null,ok=done&&pk===q.a;
 let h=top(s,`<div class="bq-bar"><i style="width:${n*10}%"></i></div><div class="bq-cnt">ข้อ ${n} / 10</div>`)+`<main class="bq-main${done?' bq-done':''}"><div class="bq-sec">ตอนที่ ${secOf(s.i)+1} · ${esc(Q.sec[secOf(s.i)])}</div>`;
 const st=j=>!done?'':j===q.a?'ok':j===pk?'bad':'dim';
 const mk=j=>!done?'':j===q.a?`<span class="bq-g">${CHK()}</span>`:j===pk?`<span class="bq-r">${XX()}</span>`:'';
 if(q.t==='pic'){h+=`<div class="bq-q">ภาพนี้ตรงกับคำใด</div><div class="bq-card bq-pc"><img class="bq-pic" src="${artUrl('word',q.img)}" alt="" draggable="false"></div>`;
  Q.picOpts.forEach((w,j)=>{h+=opt(KK[j],esc(w)+(done&&j===q.a?` <span class="bq-py bq-pyok">${esc(q.py)}</span>`:''),st(j),mk(j),'bq-zh bq-big',j,done)})}
 else if(q.t==='py'){h+=`<div class="bq-card bq-wd"><div class="bq-zh bq-huge">${esc(q.zh)}</div>${q.gl?`<div class="bq-gl">${esc(q.gl)}</div>`:''}<div class="bq-ask">${esc(q.q)}</div></div>`;
  q.opts.forEach((w,j)=>{h+=opt(KK[j],esc(w),st(j),mk(j),'bq-py bq-mid',j,done)})}
 else if(q.t==='fill'){const w=done?Q.bank[pk]:'';
  h+=`<div class="bq-q">${esc(q.q)}</div><div class="bq-card bq-fill">`+q.lines.map(([sp,t])=>{const parts=t.split('__');
   return `<div>${sp?`<span class="bq-spk">${esc(sp)}&nbsp;&nbsp;</span>`:''}${parts.map(esc).map(x=>`<span class="bq-zh">${x}</span>`).join(`<span class="bq-blank bq-zh${done?(ok?' ok':' bad'):''}">${done?esc(w):'&nbsp;'}</span>`)}</div>`}).join('')+(q.hint?`<div class="bq-hint">(${esc(q.hint)})</div>`:'')+`</div>
  <div class="bq-cap">คำให้เลือก แตะคำเพื่อเติมลงช่องว่าง</div><div class="bq-bank">`+Q.bank.map((w,j)=>`<button class="bq-zh press${done&&j===pk?' used':''}" data-go="bqpick" data-i="${j}"${done?' disabled':''}>${esc(w)}</button>`).join('')+`</div>`}
 else{h+=`<div class="bq-card bq-dlg">`+Q.dlg.map(([sp,z,py])=>`<div class="bq-dl"><span>${esc(sp)}</span><div><div class="bq-zh">${esc(z)}</div><div class="bq-py">${esc(py)}</div></div></div>`).join('')+(Q.gloss?`<div class="bq-gls">${zhw(Q.gloss)}</div>`:'')+`</div>
  <div class="bq-q bq-q2">${zhw(q.q)}</div>`;q.opts.forEach((w,j)=>{const z=isZh(w);h+=opt(KK[j],esc(w),st(j),mk(j),z?'bq-zh bq-big':'',j,done)})}
 h+='</main>';
 if(!done)h+=`<div class="bq-foot bq-tip">แตะคำตอบเพื่อตรวจทันที</div>`;
 else{const right=q.t==='fill'?Q.bank[q.a]:q.t==='pic'?Q.picOpts[q.a]:q.opts[q.a];const say=q.t==='pic'?q.img:q.t==='py'?q.zh:q.t==='fill'?q.say:'';
  const last=s.i===9;
  h+=`<div class="bq-fb ${ok?'g':'r'}" role="status"><h3><span class="bq-ic">${ok?CHK():XX()}</span>${ok?'ถูกต้อง':`ยังไม่ถูก คำตอบคือ ${q.t==='fill'?'':KK[q.a]+' '}<span class="${isZh(right)?'bq-zh':''}">${esc(right)}</span>`}</h3><p>${q.ex.split('\n').map(zhw).join('<br>')}</p>
  ${ok?'':`<div class="bq-fbrow"><button class="bq-rev press" data-go="bqrev" data-c="${q.ch}">ทบทวนบทที่ ${q.ch}</button>${say?`<button class="bq-say press" data-go="bqsay" data-t="${esc(say)}">${SPK}ฟังเสียง</button>`:''}</div>`}
  <button class="bq-btn ${ok?'g':''} press" data-go="bqnext">${last?'ดูผลคะแนน':'ข้อต่อไป'}</button></div>`}
 return h}

/* ---------- หน้าผล ---------- */
function resHtml(s){const Q=QZ()[s.g];const sc=s.ans.filter((a,i)=>a===Q.qs[i].a).length;const pass=sc>=8,stars=sc===10?3:sc>=8?2:1;const last=s.n>=nparts();
 const b=s.rec;const wrong=Q.qs.map((q,i)=>({q,i})).filter(x=>s.ans[x.i]!==x.q.a);
 const msg=pass?(last?'ผ่านเกณฑ์ แสดงว่าจบเล่มนี้ได้ดี':`ผ่านเกณฑ์ ไปต่อภาค ${s.n+1} ได้เลย`):'ยังไม่ถึงเกณฑ์ 8 คะแนน ทบทวนบทที่แนะนำแล้วลองใหม่อีกครั้ง';
 const sub=sc===10?'ได้คะแนนเต็ม 3 ดาว':'ได้ 10 คะแนนเต็มจึงจะได้ 3 ดาว';
 const rows=wrong.length?wrong.map(({q,i})=>{const rk=q.rk||'';const m=/^(\S*[\u3400-\u9fff]\S*)\s+(.+)$/.exec(rk);
   const main=m?`<span class="bq-zh">${esc(m[1])}</span> <span class="bq-py">${esc(m[2])}</span>`:zhw(rk);
   return `<div class="bq-ri"><span class="bq-n">${i+1}</span><div class="bq-rt"><div>${main}</div><small>${zhw(q.rs||'')}</small></div><button class="bq-go press" data-go="bqrev" data-c="${q.ch}">บทที่ ${q.ch}</button></div>`}).join('')
  :`<div class="bq-allok">ตอบถูกทุกข้อ</div>`;
 const nextBtn=last?`<button class="bq-btn${pass?'':' o'} press" data-go="bqhome">กลับหน้าห้องเรียนคู่หนังสือ</button>`:`<button class="bq-btn${pass?'':' o'} press" data-go="bqnextpart">ไปต่อภาค ${s.n+1}</button>`;
 const again=`<button class="bq-btn${pass?' o':''} press" data-go="bqagain">ทำใหม่อีกครั้ง</button>`,key=`<button class="bq-btn o press" data-go="bqkey">ดูเฉลยทั้งหมด</button>`;
 return top(s,`<div class="bq-tt">ผล${ttl(s.n)}</div><div class="bq-xs"></div>`)+`<main class="bq-main bq-res"><div class="bq-card bq-score"><img src="assets/mascot/${pass?'celebrate':'think'}.webp" alt="" draggable="false">
 <div class="bq-big2"><span class="${pass?'bq-gn':'bq-rn'}">${sc}</span><span class="bq-of"> / 10 คะแนน</span></div><div class="bq-stars" aria-label="${stars} ดาว">${STAR(1)}${STAR(stars>=2)}${STAR(stars>=3)}</div>
 <div class="bq-msg${pass?'':' bq-msgr'}">${msg}</div><div class="bq-sub">${sub}${b&&b.best>sc?` · คะแนนสูงสุดที่เคยทำ ${b.best} / 10`:''}</div></div>
 <div class="bq-card bq-rl"><div class="bq-rh">${wrong.length?'ข้อที่ควรทบทวน':'ผลรายข้อ'}</div>${rows}</div></main>
 <div class="bq-foot">${pass?nextBtn:again}<div class="bq-two">${pass?again:nextBtn}${key}</div></div>`}

function paint(s){const el=s.el;if(!el)return;let w=el.querySelector('.bq');if(!w){el.innerHTML='<div class="bq"></div>';w=el.firstChild}
 w.className='bq bq-'+s.step;w.innerHTML=s.step==='intro'?introHtml(s):s.step==='q'?qHtml(s):resHtml(s);
 const m=w.querySelector('.bq-main');if(m&&!s.keep)m.scrollTop=0;s.keep=false;
 if(s.step==='q'&&s.pick!=null){const fb=w.querySelector('.bq-fb');if(fb){m.style.paddingBottom=(fb.offsetHeight+16)+'px';
   const sel=w.querySelector('.bq-opt.ok,.bq-blank');if(sel){const r=sel.getBoundingClientRect(),fr=fb.getBoundingClientRect();if(r.bottom>fr.top-8)m.scrollTop+=r.bottom-fr.top+16}
   requestAnimationFrame(()=>fb.classList.add('on'))}}}

/* ---------- ตัวหน้าจอ: ใช้ร่วมกับ SC.bookch (book.js เรียกเมื่อเป็นกลุ่ม q1..q5) ---------- */
window.BQ={has:g=>!!QZ()[g]&&Array.isArray(QZ()[g].qs)&&QZ()[g].qs.length===10,
 screen(G,p){const g=G.g;const s=ST[g]={g,n:G.p.n,step:'intro',i:0,ans:[],pick:null,qr:!!(p&&p.qr),el:null};
  return {title:ttl(G.p.n),nav:'',body:'',noRefresh:true,
   mount(el){s.el=el;paint(s)},onShow(){},unmount(){try{stopAudio()}catch(e){}if(ST[g]===s)delete ST[g]}}}};

function keySheet(s){const Q=QZ()[s.g];
 const li=Q.qs.map((q,i)=>{const right=q.t==='fill'?Q.bank[q.a]:q.t==='pic'?Q.picOpts[q.a]:q.opts[q.a];const k=q.t==='fill'?'':KK[q.a]+' ';
  return `<div class="bq-ki"><span class="bq-n">${i+1}</span><div><b>${esc(k)}<span class="${isZh(right)?'bq-zh':'bq-py0'}">${esc(right)}</span></b><small>${q.ex.split('\n').map(zhw).join(' ')} (บทที่ ${q.ch})</small></div></div>`}).join('');
 openSheet(`<div class="bq-key">${li}</div>`,{title:`เฉลย${ttl(s.n)} · ภาคผนวก ง`})}

Object.assign(window.GOX=window.GOX||{},{
 bqstart(){const s=cur();if(!s)return;s.step='q';s.i=0;s.ans=[];s.pick=null;paint(s)},
 bqpick(el){const s=cur();if(!s||s.step!=='q'||s.pick!=null)return;const j=+el.dataset.i;const q=QZ()[s.g].qs[s.i];s.pick=j;s.ans[s.i]=j;try{vib(j===q.a?8:14)}catch(e){}paint(s)},
 bqnext(){const s=cur();if(!s||s.pick==null)return;stopAudio();if(s.i<9){s.i++;s.pick=null;paint(s);return}
  const Q=QZ()[s.g];const sc=s.ans.filter((a,i)=>a===Q.qs[i].a).length;const prev=best(s.g);s.rec=prev;record(s.g,sc);s.step='res';paint(s)},
 bqsay(el){try{stopAudio();playOne(el.dataset.t,'')}catch(e){}},
 bqrev(el){stopAudio();push('bookch',{g:'c'+el.dataset.c})},
 bqagain(){const s=cur();if(!s)return;s.step='q';s.i=0;s.ans=[];s.pick=null;paint(s)},
 bqkey(){const s=cur();if(s)keySheet(s)},
 bqnextpart(){const s=cur();if(!s)return;const p=part(s.n+1);const c=p&&p.ch&&p.ch[0];if(!c)return;replace('bookch',{g:'c'+c.n})},
 bqhome(){const below=stack[stack.length-2];if(below&&below.name==='bookhome')pop();else replace('bookhome')},
 bqclose(){const s=cur();if(!s)return pop();if(s.step!=='q'||(s.i===0&&s.pick==null))return pop();
  openSheet(`<div class="bq-cf"><p>คำตอบรอบนี้จะไม่ถูกบันทึก</p><button class="bq-btn press" data-go="bqquit">ออกจากแบบทดสอบ</button><button class="bq-btn o press" data-act="closesheet">ทำต่อ</button></div>`,{title:'ออกจากแบบทดสอบหรือไม่'})},
 bqquit(){closeSheet(true);pop()}});
})();
