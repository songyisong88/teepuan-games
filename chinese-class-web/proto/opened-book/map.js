(function(){
const T = window.THEME, B = window.BOOK;
const ART = '../img/llama/';
const POSE = {idle:'t20-present', move:'e03-excited', done:'t05-thumbsup', lock:'e08-thinking', boss:'t19-pointcorner', fin:'t06-trophy', hello:'t12-hello'};
Object.values(POSE).forEach(p=>{const i=new Image(); i.src=ART+p+'.webp';});
const STAR = '<svg viewBox="0 0 24 24"><path d="M12 1.8l3 6.4 7 .8-5.2 4.8 1.4 6.9L12 17.2l-6.2 3.5 1.4-6.9L2 9l7-.8z" fill="#ffd34d" stroke="#c98a0b" stroke-width="1.3" stroke-linejoin="round"/></svg>';
const LOCK = '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 018 0v2.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
const CROWN = '<svg viewBox="0 0 24 24"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill="#fff" stroke="#7a1608" stroke-width="1.2" stroke-linejoin="round"/><circle cx="12" cy="15" r="1.6" fill="#d9402b"/></svg>';
const CERT = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" fill="#fff" stroke="#8f5f00" stroke-width="1.2"/><path d="M6.5 8h11M6.5 11h7" stroke="#d3a13a" stroke-width="1.4" stroke-linecap="round"/><circle cx="16" cy="16" r="3.6" fill="#d9402b"/><path d="M14 19l-1 3.5 3-1.4 3 1.4-1-3.5" fill="#d9402b"/></svg>';
const SPK = '<svg viewBox="0 0 24 24"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" fill="#fff6c8"/></svg>';

const app = document.querySelector('.app'), sc = document.querySelector('.scroller'), map = document.querySelector('.map');
let k = 1, P = [], lens = [], path, prog, total = 0, llama, bubble, at = B.current, busy = false, sel = B.current;
const H = T.mapH;

function stateOf(n){ return n<=B.done?'done':(n===B.current?'current':'locked'); }

function build(){
  const W = map.clientWidth; k = W/390;
  map.style.height = (H*k)+'px';
  P = T.pts.map(([x,y])=>[x*W, y*k]);
  // background
  if(T.parallax){
    const bg = document.createElement('div'); bg.className='pbg';
    bg.innerHTML = `<img src="${T.bg}" style="width:100%;display:block">`; app.insertBefore(bg, sc); T._pbg = bg;
  } else {
    const img = new Image(); img.className='bg'; img.src=T.bg; img.style.height=(H*k)+'px'; img.style.objectFit='cover'; map.appendChild(img);
  }
  if(T.decor) T.decor(map, P, k);
  // path
  const d = smooth(P);
  const ns='http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg'); svg.setAttribute('class','path'); svg.setAttribute('width',W); svg.setAttribute('height',H*k);
  svg.innerHTML = T.pathSvg(d, k);
  map.appendChild(svg);
  path = svg.querySelector('.measure'); prog = svg.querySelector('.prog');
  total = path.getTotalLength();
  lens = nodeLens(path, P);
  svg.querySelectorAll('.prog').forEach(pp=>{ pp.style.strokeDasharray = `${lens[B.current-1]} ${total+10}`; pp.style.strokeDashoffset = lens[B.current-1]; });
  // sections
  B.sections.forEach(s=>{
    const i=s.at-1, y = i===0 ? P[0][1]+ (T.secOff0||62)*k : (P[i][1]+P[i-1][1])/2;
    const e=document.createElement('div'); e.className='sec'; e.textContent=s.name; e.style.top=y+'px';
    { const mx = i===0?P[0][0]:(P[i][0]+P[i-1][0])/2; e.style.left = (mx<W/2? W*0.74 : W*0.26)+'px'; }
    map.appendChild(e);
  });
  // nodes
  B.lessons.forEach((L,i)=>{
    const n=i+1, st=stateOf(n), e=document.createElement('div');
    e.className=`node ${st}`+(L.boss?' boss big':'')+(L.final?' final big':'');
    e.style.left=P[i][0]+'px'; e.style.top=P[i][1]+'px';
    let inner = L.boss?CROWN:(L.final?CERT:(st==='locked'?LOCK:n));
    e.innerHTML = (T.under?T.under(L,st):'')+`<div class="glow"></div><div class="disc">${inner}</div>`+
      ((L.boss||L.final)&&st==='locked'?`<div class="mini-lock" style="color:#857d70">${LOCK}</div>`:'')+
      (st==='done'?`<div class="stars"><i>${STAR}</i><i>${STAR}</i><i>${STAR}</i></div>`:'')+`<div class="tag">${L.tag}</div>`;
    e.dataset.n=n; e.addEventListener('click',()=>go(n,e));
    map.appendChild(e);
  });
  // llama + bubble
  llama=document.createElement('div'); llama.className='llama idle';
  llama.innerHTML=`<div class="shadow"></div><div class="body"><img src="${ART+POSE.hello}.webp"></div>`;
  map.appendChild(llama);
  bubble=document.createElement('div'); bubble.className='bubble'; map.appendChild(bubble);
}

function smooth(p){
  let d=`M${p[0][0]},${p[0][1]}`;
  for(let i=0;i<p.length-1;i++){
    const p0=p[i-1]||p[i], p1=p[i], p2=p[i+1], p3=p[i+2]||p2, t=T.tension||0.22;
    const c1=[p1[0]+(p2[0]-p0[0])*t, p1[1]+(p2[1]-p0[1])*t], c2=[p2[0]-(p3[0]-p1[0])*t, p2[1]-(p3[1]-p1[1])*t];
    d+=` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
function nodeLens(path,P){
  const L=path.getTotalLength(), out=[]; let j=0;
  const samples=[]; for(let s=0;s<=L;s+=1.5){const q=path.getPointAtLength(s); samples.push([s,q.x,q.y]);}
  P.forEach(([x,y])=>{ let best=1e9,bl=0; for(let m=j;m<samples.length;m++){const sm=samples[m],dd=(sm[1]-x)**2+(sm[2]-y)**2; if(dd<best){best=dd;bl=sm[0];j=m;} if(dd>best+40000&&best<100)break;} out.push(bl); });
  return out;
}
const ease = t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function place(x,y){ llama.style.left=x+'px'; llama.style.top=y+'px'; }
function pose(p){ llama.querySelector('img').src=ART+POSE[p]+'.webp'; }
let follow=true;
function scrollTo(y,instant){ const t=Math.max(0,y-sc.clientHeight*0.56); if(instant) sc.scrollTop=t; else sc.scrollTop += (t-sc.scrollTop)*0.12; }

function moveTo(n){
  return new Promise(res=>{
    const from=at, to=n; if(from===to){res();return;}
    llama.classList.remove('idle'); pose('move');
    llama.classList.toggle('flip', P[to-1][0] < P[from-1][0]);
    if(T.move==='hop'){
      const seq=[]; const st=to>from?1:-1; for(let i=from+st; st>0?i<=to:i>=to; i+=st) seq.push(i);
      const per = seq.length>5?260:420; let idx=0, prev=from;
      const hop=()=>{
        if(idx>=seq.length){ at=to; res(); return; }
        const a=P[prev-1], b=P[seq[idx]-1]; const t0=performance.now(); const hh=(T.hopH||46)*k;
        llama.classList.toggle('flip', b[0]<a[0]);
        const step=now=>{ let t=Math.min(1,(now-t0)/per); const e=ease(t);
          const x=a[0]+(b[0]-a[0])*e, y=a[1]+(b[1]-a[1])*e - Math.sin(Math.PI*t)*hh;
          place(x,y); llama.querySelector('.shadow').style.opacity = 1-Math.sin(Math.PI*t)*.6; scrollTo(y);
          if(t<1) requestAnimationFrame(step); else { if(T.onLand) T.onLand(map,b,k); prev=seq[idx]; idx++; setTimeout(hop, seq.length>5?20:70); } };
        requestAnimationFrame(step);
      }; hop();
    } else {
      const l0=lens[from-1], l1=lens[to-1], dist=Math.abs(l1-l0), dur=Math.min(2600,Math.max(800,dist*2.2)); const t0=performance.now();
      const step=now=>{ const t=Math.min(1,(now-t0)/dur), e=ease(t), l=l0+(l1-l0)*e, q=path.getPointAtLength(l), q2=path.getPointAtLength(Math.min(total,Math.max(0,l+(l1>l0?3:-3))));
        llama.classList.toggle('flip', q2.x<q.x-0.3 ? true : (q2.x>q.x+0.3?false:llama.classList.contains('flip')));
        const bob=Math.abs(Math.sin(t*dur/140))*5*k; place(q.x,q.y-bob); scrollTo(q.y);
        if(t<1) requestAnimationFrame(step); else { at=to; res(); } };
      requestAnimationFrame(step);
    }
  });
}

function say(n){
  const L=B.lessons[n-1], st=stateOf(n);
  let lb, tt=`บทที่ ${n}  ${L.title}`;
  if(st==='current') lb='<span class="lb">บทต่อไป</span>';
  else if(st==='done') lb='<span class="lb done">เรียนจบแล้ว</span>';
  else lb='<span class="lb lock">ยังไม่เปิด</span>';
  if(L.boss) tt=L.title; if(L.final) tt=L.title;
  bubble.classList.remove('show'); void bubble.offsetWidth;
  bubble.innerHTML=`${lb}<div class="tt">${tt}</div><div class="ln">${L.line}</div>`;
  const W=map.clientWidth, bw=Math.min(250, W-24); bubble.style.width=bw+'px';
  const lx=parseFloat(llama.style.left), ly=parseFloat(llama.style.top);
  const bl=Math.max(12,Math.min(W-12-bw, lx-bw/2));
  bubble.style.left=bl+'px';
  bubble.style.setProperty('--tx', Math.max(22,Math.min(bw-22, lx-bl))+'px');
  requestAnimationFrame(()=>{ bubble.style.top=(ly-86 - bubble.offsetHeight - 10)+'px'; bubble.classList.add('show'); });
  pose(L.final&&st!=='locked'?'fin':L.boss?'boss':st==='current'?'idle':st==='done'?'done':'lock');
  llama.classList.add('idle');
  // CTA
  const c=document.querySelector('.cta');
  c.className='cta'+(st==='done'?' review':st==='locked'?' locked':'');
  c.innerHTML = st==='current'?`<b>เริ่มบทที่ ${n}</b><small>${L.title} · ราว 5 นาที</small>`:
    st==='done'?`<b>ทบทวนบทที่ ${n}</b><small>${L.title}</small>`:`<b>กลับไปบทที่ ${B.current}</b><small>เรียนตามลำดับเพื่อเปิดบทนี้</small>`;
  sel=n;
}
function sparkle(x,y,count){
  for(let i=0;i<(count||8);i++){
    const s=document.createElement('div'); s.className='spk'; s.innerHTML=SPK; map.appendChild(s);
    const a=(i/(count||8))*Math.PI*2+Math.random()*.4, r=(34+Math.random()*16)*k, sz=.6+Math.random()*.7;
    s.animate([{left:x+'px',top:y+'px',transform:`scale(0) rotate(0deg)`,opacity:1},{left:x+Math.cos(a)*r+'px',top:y+Math.sin(a)*r+'px',transform:`scale(${sz}) rotate(90deg)`,opacity:1,offset:.6},{left:x+Math.cos(a)*r*1.15+'px',top:y+Math.sin(a)*r*1.15+'px',transform:`scale(0) rotate(140deg)`,opacity:0}],{duration:720,easing:'cubic-bezier(.22,1,.36,1)'}).onfinish=()=>s.remove();
  }
}
async function go(n,el){
  if(busy) return;
  el.classList.remove('tap','nope'); void el.offsetWidth; el.classList.add(stateOf(n)==='locked'?'nope':'tap');
  if(n===at){ sparkle(P[n-1][0],P[n-1][1],6); say(n); return; }
  busy=true; bubble.classList.remove('show'); bubble.classList.add('hide');
  await moveTo(n); bubble.classList.remove('hide');
  if(stateOf(n)!=='locked') sparkle(P[n-1][0],P[n-1][1]-30*k,8);
  say(n); busy=false;
}
window.goLesson = n=>{ const el=map.querySelector(`.node[data-n="${n}"]`); go(n,el); };
document.querySelector('.cta').addEventListener('click',()=>{ const st=stateOf(sel); if(st==='locked') window.goLesson(B.current); else { const el=map.querySelector(`.node[data-n="${sel}"]`); sparkle(P[sel-1][0],P[sel-1][1],10);} });

function parallax(){ if(!T._pbg) return; const bh=T._pbg.offsetHeight, vh=app.clientHeight, max=sc.scrollHeight-vh; const r=max>0?sc.scrollTop/max:0; T._pbg.style.transform=`translateY(${-(bh-vh)*r}px)`; }
sc.addEventListener('scroll',parallax,{passive:true});

async function intro(){
  build();
  const cy=P[B.current-1][1]; scrollTo(cy+40*k,true); parallax();
  document.querySelector('.prog .fill').style.width='0%';
  const nodes=[...map.querySelectorAll('.node')];
  // place llama at previous node, hidden
  place(P[B.current-2][0],P[B.current-2][1]); at=B.current-1; llama.style.opacity=0;
  await wait(250);
  nodes.forEach((e,i)=>setTimeout(()=>e.classList.add('in'), 40*Math.abs(i-(B.current-1))));
  await wait(450);
  // draw progress path
  map.querySelectorAll('.prog').forEach(pp=>pp.animate([{strokeDashoffset:lens[B.current-1]},{strokeDashoffset:0}],{duration:1500,easing:'cubic-bezier(.45,0,.2,1)',fill:'forwards'}));
  document.querySelector('.prog .fill').style.width=(B.done/17*100)+'%';
  for(let i=0;i<B.done;i++) setTimeout(()=>nodes[i].querySelector('.stars').classList.add('in'), 300+i*350);
  await wait(1300);
  llama.animate([{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'none'}],{duration:300,fill:'forwards'}); llama.style.opacity=1;
  await wait(250);
  await moveTo(B.current);
  sparkle(P[B.current-1][0],P[B.current-1][1]-30*k,8);
  say(B.current);
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
document.fonts && document.fonts.ready ? document.fonts.ready.then(()=>setTimeout(intro,80)) : window.addEventListener('load',intro);
})();
