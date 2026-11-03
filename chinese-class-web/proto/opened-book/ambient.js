// Ambient life for A1-A3. Config: window.AMB = {clouds, birds, petals, leaves, grass, twinkle, stream, halo}
(function(){
const A = window.AMB || {}, T = window.THEME;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
let layer, k = 1, W = 390, sc;
const rnd=(a,b)=>a+Math.random()*(b-a);
function el(html, css){ const d=document.createElement('div'); d.innerHTML=html; Object.assign(d.style,css||{}); layer.appendChild(d); return d; }

const CLOUD = {
  line:(c,o)=>`<svg width="74" height="34" viewBox="0 0 60 28"><path d="M8,24 C0,24 0,12 9,13 C9,4 22,3 25,10 C29,2 43,4 41,14 C50,12 54,24 45,24 Z" fill="${c.fill||'none'}" fill-opacity="${c.fo||0}" stroke="${c.stroke}" stroke-opacity="${o}" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  soft:(c,o)=>`<svg width="120" height="44" viewBox="0 0 120 44"><g fill="${c.fill}" fill-opacity="${o}"><ellipse cx="60" cy="30" rx="56" ry="13"/><ellipse cx="44" cy="22" rx="22" ry="15"/><ellipse cx="72" cy="18" rx="26" ry="17"/></g></svg>`,
  xiang:(c,o)=>`<svg width="64" height="32" viewBox="0 0 60 30"><path d="M8,24 C0,24 0,12 9,13 C9,4 22,3 25,10 C29,2 43,4 41,14 C50,12 54,24 45,24 Z M20,18 C24,14 30,14 32,18 M38,14 c2,-3 6,-3 7,0" fill="none" stroke="${c.stroke}" stroke-opacity="${o}" stroke-width="1.5" stroke-linecap="round"/></svg>`
};
function leafCluster(color, op, flip, n){
  let p=''; for(let i=0;i<n;i++){ const a=-38+i*(70/(n-1||1))+rnd(-6,6), L=rnd(34,48);
    p+=`<path d="M0,0 C${L*.3},-${L*.11} ${L*.7},-${L*.09} ${L},0 C${L*.7},${L*.09} ${L*.3},${L*.11} 0,0Z" transform="rotate(${a.toFixed(1)})"/>`; }
  return `<svg width="60" height="80" viewBox="-4 -40 60 80" style="${flip?'transform:scaleX(-1)':''}"><g fill="${color}" fill-opacity="${op}"><rect x="-4" y="-40" width="2.4" height="80" rx="1.2" opacity=".7"/>${p}</g></svg>`;
}
function grass(color, op){ let p=''; const n=5; for(let i=0;i<n;i++){ const a=-28+i*14+rnd(-4,4), h=rnd(16,24);
    p+=`<path d="M0,0 C-2.6,-${h*.45} -1.2,-${h*.8} 0,-${h} C1.2,-${h*.8} 2.6,-${h*.45} 0,0Z" transform="translate(${20+i*1.5},30) rotate(${a.toFixed(1)})"/>`; }
  return `<svg width="46" height="32" viewBox="0 0 46 32"><g fill="${color}" fill-opacity="${op}">${p}</g></svg>`; }
const STAR = (c)=>`<svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" fill="${c}"/></svg>`;

function build(){
  const map=document.querySelector('.map'); sc=document.querySelector('.scroller');
  W=map.clientWidth; k=W/390;
  layer=document.createElement('div'); layer.className='amb';
  const svg=map.querySelector('svg.path'); map.insertBefore(layer, svg);
  const P=T.pts.map(([x,y])=>[x*W,y*k]);
  // clouds: static spots across the map, slow horizontal drift
  (A.clouds?.at||[]).forEach(([x,y],i)=>{ const c=A.clouds; const d=el(CLOUD[c.kind](c, c.op||.5),{left:(x*W)+'px',top:(y*k)+'px'});
    d.className='cloud'; d.style.setProperty('--d', (rnd(55,85)|0)+'s'); d.style.setProperty('--dx', (rnd(18,34)|0)+'px'); d.style.animationDelay=(-rnd(0,40))+'s';
    if(c.scale) d.style.scale=c.scale[i%c.scale.length]; });
  // leaves at edges
  (A.leaves?.at||[]).forEach(([side,y,n])=>{ const c=A.leaves; const d=el(leafCluster(c.color,c.op,side==='r',n||5),{top:(y*k-40)+'px',[side==='r'?'right':'left']:'-6px'});
    d.className='sway'; d.style.setProperty('--ox', side==='r'?'100%':'0'); d.style.setProperty('--d',rnd(5,7.5).toFixed(1)+'s'); d.style.setProperty('--a',rnd(2.5,4).toFixed(1)+'deg'); d.style.animationDelay=(-rnd(0,6))+'s'; });
  (A.grass?.at||[]).forEach(([x,y])=>{ const c=A.grass; const d=el(grass(c.color,c.op),{left:(x*W-23)+'px',top:(y*k-30)+'px'});
    d.className='sway'; d.style.setProperty('--ox','50%'); d.style.transformOrigin='50% 100%'; d.style.setProperty('--d',rnd(3.5,5).toFixed(1)+'s'); d.style.setProperty('--a','4deg'); d.style.animationDelay=(-rnd(0,4))+'s'; });
  // twinkle near summit
  if(A.twinkle){ const [cx,cy]=A.twinkle.at; [[-34,-18,1],[30,-30,.8],[44,6,.65],[-50,10,.6]].slice(0,A.twinkle.n||3).forEach(([dx,dy,s],i)=>{
    const d=el(STAR(A.twinkle.color),{left:(cx*W+dx*k-6)+'px',top:(cy*k+dy*k-6)+'px',scale:s}); d.className='tw'; d.style.setProperty('--d',(3.2+i*.7)+'s'); d.style.animationDelay=(i*1.1)+'s'; }); }
  // halo (A2 sun)
  if(A.halo){ const [x,y,r]=A.halo; el(`<svg width="${r*4}" height="${r*4}"><circle class="halo" cx="${r*2}" cy="${r*2}" r="${r*1.35}" fill="#F7C6AC" fill-opacity=".22"/></svg>`,{left:(x*W-r*2)+'px',top:(y*k-r*2)+'px'}); }
  // stream shimmer (A2)
  (A.stream||[]).forEach(s=>{ const d=s.d; el(`<svg width="${W}" height="${s.h*k}" viewBox="0 ${s.y} 390 ${s.h}"><path d="${d}" fill="none" stroke="${s.base}" stroke-width="${s.w}" stroke-linecap="round"/><path class="shim" d="${d}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="${s.w*.45}" stroke-linecap="round" stroke-dasharray="6 18"/></svg>`,{left:0,top:(s.y*k)+'px'}); });
  if(RM) return;
  if(A.birds) setTimeout(bird, 1400);
  if(A.petals){ for(let i=0;i<A.petals.max;i++) petal(true); setInterval(()=>{ if(!document.hidden && layer.querySelectorAll('.petal').length<A.petals.max) petal(false); }, A.petals.every||3200); }
}
function view(){ return [sc.scrollTop, sc.scrollTop+sc.clientHeight]; }
function bird(){
  if(!document.hidden){
    const [t0]=view(), y=t0+rnd(140,300), ltr=Math.random()<.5, c=A.birds.color;
    const one=(s)=>`<div style="display:inline-block;width:${14*s}px;height:${7*s}px;margin-right:${8*s}px"><svg class="wing" width="${14*s}" height="${7*s}" viewBox="0 0 14 7" style="animation-delay:${rnd(0,.3).toFixed(2)}s"><path d="M0,1 Q3.5,6 7,6 Q10.5,6 14,1" fill="none" stroke="${c}" stroke-opacity="${A.birds.op}" stroke-width="1.4" stroke-linecap="round"/></svg></div>`;
    const b=el(`<div style="display:flex;align-items:flex-start">${one(1)}<div style="margin-top:9px">${one(.8)}</div></div>`,{top:y+'px',left:'0'});
    b.className='bird'; if(!ltr) b.firstChild.style.transform='scaleX(-1)';
    const dy=rnd(-50,20), from=ltr?-50:W+20, to=ltr?W+20:-50;
    b.animate([{transform:`translate(${from}px,0)`,opacity:0},{opacity:1,offset:.12},{transform:`translate(${(from+to)/2}px,${dy*.6}px)`},{opacity:1,offset:.88},{transform:`translate(${to}px,${dy}px)`,opacity:0}],{duration:rnd(11000,14000),easing:'linear'}).onfinish=()=>b.remove();
  }
  setTimeout(bird, rnd(8000,10500));
}
function petal(prewarm){
  const [t0,t1]=view(), c=A.petals, x=rnd(.06,.94)*W, y=t0+rnd(90,180), fall=rnd(380,520), dur=rnd(14000,19000), sw=rnd(18,34)*(Math.random()<.5?-1:1);
  const col=c.colors[(Math.random()*c.colors.length)|0], s=rnd(.8,1.15);
  const p=el(`<svg width="10" height="8" viewBox="0 0 10 8"><path d="M1,4 C2,0 8,0 9,4 C8,8 2,8 1,4Z" fill="${col}" fill-opacity="${c.op}"/></svg>`,{left:x+'px',top:y+'px'});
  p.className='petal';
  const a=p.animate([{transform:`translate(0,0) rotate(0) scale(${s})`,opacity:0},{opacity:1,offset:.1},{transform:`translate(${sw}px,${fall*.33}px) rotate(120deg) scale(${s})`},{transform:`translate(${-sw*.6}px,${fall*.66}px) rotate(220deg) scale(${s})`},{opacity:1,offset:.85},{transform:`translate(${sw*.4}px,${fall}px) rotate(320deg) scale(${s})`,opacity:0}],{duration:dur,easing:'linear'});
  if(prewarm) a.currentTime=rnd(0,dur*.6);
  a.onfinish=()=>p.remove();
}
(function wait(){ if(document.querySelector('.map svg.path')) build(); else setTimeout(wait,60); })();
})();
