/* สีจับคู่คำในประโยคตัวอย่าง (แบบ C2 ไฮไลต์สีอ่อน + สีไล่ตามเสียงตอนกดฟัง · ซ้งอี้เลือก 31 ต.ค. 2026)
   ข้อมูลคู่คำอยู่ใน data/align.js (window.ALIGN: ประโยคจีน -> "จีน=พินอิน=ไทย|...")  ต้นฉบับ tools/align/*.txt
   ประโยคที่ไม่มีข้อมูล หรือข้อมูลไม่ตรงกับข้อความจริง (เช่นแก้คำแปลภายหลัง) = แสดงแบบเดิมทุกตัวอักษร ไม่เดาเด็ดขาด
   สีตัวอักษร (สีวรรณยุกต์) ไม่ถูกแตะ ใช้แค่พื้นหลังอ่อน */
(function(G){
const AL_BG=['#FCDCD8','#D9E7FB','#D8EFDB','#EEDCF5','#FDE6C8','#CFEFF1'];
const AL_HI=['#F4A99F','#A9C7F2','#A6D9AF','#D3AAE6','#F7C27F','#93D6DC'];
const AL_FG=['#C62828','#1F64C8','#2A7B34','#8A2BA6','#C96A00','#00808C'];
const LAT=/[A-Za-z0-9\u00C0-\u024F\u01CD-\u01DC\u0300-\u036F']/;
/* หาตำแหน่งครั้งที่ n (นับ 1) · ไม่ใส่ n = ต้องมีครั้งเดียวเท่านั้น · lat = ต้องเป็นคำเต็ม (ไม่ใช่ส่วนหนึ่งของคำละติน) */
function alFind(line,tok,lat){const m=/^(.*?)(?:#(\d+))?$/.exec(tok);const t=m[1],n=m[2]?+m[2]:0;if(!t)return null;const hits=[];let i=line.indexOf(t);
 while(i>=0){const ok=!lat||((i===0||!LAT.test(line[i-1]))&&(i+t.length>=line.length||!LAT.test(line[i+t.length])));if(ok)hits.push(i);i=line.indexOf(t,i+1)}
 if(n?hits.length<n:hits.length!==1)return null;const s=hits[n?n-1:0];return [s,s+t.length]}
/* แปลงข้อมูลเป็นช่วงตัวอักษร · คืน null ถ้ามีอะไรไม่ตรง/ทับกัน/คู่สีน้อยกว่า 2 */
function alResolve(zh,py,th,spec){if(!spec||typeof spec!=='string')return null;const prs=spec.split('|').map(x=>x.split('='));if(prs.some(p=>p.length!==3))return null;
 const R=[];for(const [a,b,c] of prs){const z=alFind(zh,a,/^[A-Za-z0-9]/.test(a)),p=alFind(py,b,true),t=alFind(th,c,false);if(!z||!p||!t)return null;R.push({z,p,t,key:a.replace(/#\d+$/,'')+'='+c.replace(/#\d+$/,'')})}
 for(const k of ['z','p','t']){const s=R.map(r=>r[k]).sort((x,y)=>x[0]-y[0]);for(let i=1;i<s.length;i++)if(s[i][0]<s[i-1][1])return null}
 R.sort((x,y)=>x.z[0]-y.z[0]);const gk=[];R.forEach((r,i)=>{let g=gk.indexOf(r.key);if(g<0){g=gk.length;gk.push(r.key)}r.g=g;r.i=i});
 if(gk.length<2)return null;return R}
function alWrap(line,R,k){const s=R.map(r=>({a:r[k][0],b:r[k][1],r})).sort((x,y)=>x.a-y.a);let o='',at=0;
 for(const x of s){o+=line.slice(at,x.a)+`<span class="al" data-i="${x.r.i}" style="--al:${AL_BG[x.r.g%6]};--alh:${AL_HI[x.r.g%6]};--alf:${AL_FG[x.r.g%6]}">${line.slice(x.a,x.b)}</span>`;at=x.b}
 return o+line.slice(at)}
/* ข้อความประโยค 3 บรรทัด (ใช้แทน markup เดิมของ .tx) */
function alTx(zh,py,th){const R=G.ALIGN&&alResolve(zh,py,th,G.ALIGN[zh]);
 if(!R)return `<span class="tx"><b class="zh">${zh}</b><span class="p">${py}</span><small>${th}</small></span>`;
 return `<span class="tx al-on"><b class="zh">${alWrap(zh,R,'z')}</b><span class="p">${alWrap(py,R,'p')}</span><small>${alWrap(th,R,'t')}</small></span>`}

/* ---- สีไล่ตามเสียง: เวลาของแต่ละคำประมาณจากจำนวนพยางค์พินอิน (+ช่วงหยุดที่เครื่องหมายวรรคตอน) ---- */
function alTimes(tx){const p=tx.querySelector('.p');if(!p)return null;const parts=[];let pos=0;const cut=[];
 p.childNodes.forEach(n=>{const t=n.textContent;if(n.nodeType===1&&n.classList.contains('al'))cut.push({i:+n.dataset.i,a:pos,b:pos+t.length});parts.push(t);pos+=t.length});
 const line=parts.join('');const w=new Array(line.length+1).fill(0);let acc=0;
 for(let i=0;i<line.length;i++){w[i]=acc;const ch=line[i];
  if(/[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(ch)&&!(i>0&&/[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(line[i-1])))acc+=1;
  else if(/[0-9]/.test(ch))acc+=1;else if(/[,.!?;:—…，。！？]/.test(ch))acc+=.9}
 w[line.length]=acc;if(!acc)return null;return {tot:acc,seg:cut.map(c=>({i:c.i,a:w[c.a]/acc,b:Math.max(w[c.b],w[c.a]+.6)/acc}))}}
let alRun=null;
function alStop(){if(!alRun)return;cancelAnimationFrame(alRun.raf);alRun.tx.querySelectorAll('.al-lit').forEach(e=>e.classList.remove('al-lit'));alRun.tx.classList.remove('al-play');alRun=null}
function alFollow(tx){alStop();const T=alTimes(tx);if(!T)return;const t0=performance.now();const est=T.tot*380+300;let au=null;try{au=curAudio}catch(e){}
 const run={tx,raf:0,cur:-1};alRun=run;tx.classList.add('al-play');
 const tick=()=>{if(alRun!==run)return;if(!tx.isConnected){alStop();return}
  let f,done=false;let a=null;try{a=curAudio}catch(e){}
  if(au&&a===au&&au.duration&&isFinite(au.duration)){const L=.12,Tl=.22,d=Math.max(.3,au.duration-L-Tl);f=(au.currentTime-L)/d;done=au.ended||au.paused&&au.currentTime>0}
  else if(au&&a!==au){done=true}
  else{const el=performance.now()-t0;f=(el-200)/est;done=el>est+400}
  if(done){alStop();return}
  const on=T.seg.filter(s=>f>=s.a&&f<s.b).map(s=>s.i);const key=on.join(',');
  if(key!==run.cur){run.cur=key;tx.querySelectorAll('.al').forEach(e=>e.classList.toggle('al-lit',on.includes(+e.dataset.i)))}
  run.raf=requestAnimationFrame(tick)};
 run.raf=requestAnimationFrame(tick)}
if(typeof document!=='undefined')document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-act="audio"]');if(!b)return;
 const row=b.closest('.exr,.hb-ex');const tx=row&&row.querySelector('.tx.al-on');if(tx)setTimeout(()=>alFollow(tx),0);else alStop()});
G.alTx=alTx;G.alResolve=alResolve;G.alFollow=alFollow;G.alStop=alStop;
if(typeof module!=='undefined')module.exports={alResolve,alFind,alTx};
})(typeof window!=='undefined'?window:globalThis);
