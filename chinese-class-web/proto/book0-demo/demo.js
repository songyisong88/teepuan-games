/* book0-demo engine: shared by l1/l8/l17. Standalone prototype; saves nothing. */
(function(){
'use strict';
var R='../../';
var SPK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';
var MIC='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>';
var STOP='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
var STAR='<svg viewBox="0 0 24 24"><path fill="#D4A017" d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z"/></svg>';
var VL={f:'เสียงผู้หญิง',m:'เสียงผู้ชาย',s:'เสียงช้า'};
function h(html){var d=document.createElement('div');d.innerHTML=html.trim();return d.firstChild}
function esc(s){return String(s)}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
/* ---------- audio ---------- */
var cur=null,curBtn=null,AC=null;
function ac(){if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==='suspended')AC.resume();return AC}
function url(t,v){var m=window.B0A||{};var p=m[(v||'f')+':'+t]||m['f:'+t];return p||null}
function stopAudio(){try{if(cur){cur.onended=null;cur.pause()}}catch(e){}cur=null;if(curBtn){curBtn.classList.remove('playing');curBtn=null}try{speechSynthesis.cancel()}catch(e){}}
function play(t,v,btn,cb){
  stopAudio();var done=false;
  var fin=function(){if(done)return;done=true;if(btn)btn.classList.remove('playing');if(curBtn===btn)curBtn=null;cb&&cb()};
  if(btn){btn.classList.add('playing');curBtn=btn}
  var u=url(t,v);
  if(!u){tts(t,v,fin);return}
  var a=new Audio(u);cur=a;a.onended=fin;a.onerror=function(){tts(t,v,fin)};
  var p=a.play();if(p&&p.catch)p.catch(function(){fin()});
}
function tts(t,v,cb){try{var u=new SpeechSynthesisUtterance(t);u.lang='zh-CN';u.rate=v==='s'?.5:.8;if(v==='m')u.pitch=.7;u.onend=u.onerror=function(){cb&&cb()};speechSynthesis.speak(u);setTimeout(function(){cb&&cb()},4000)}catch(e){cb&&cb()}}
function sfx(ok){var c=ac();if(!c)return;try{var t=c.currentTime;var notes=ok?[660,880]:[300,240];notes.forEach(function(f,i){var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.11);g.gain.linearRampToValueAtTime(.12,t+i*.11+.02);g.gain.exponentialRampToValueAtTime(.001,t+i*.11+.22);o.connect(g);g.connect(c.destination);o.start(t+i*.11);o.stop(t+i*.11+.25)})}catch(e){}}
function vbtn(t,v,label){var b=h('<button class="vbtn" type="button">'+SPK+'<span>'+(label||VL[v])+'</span></button>');b.onclick=function(){play(t,v,b);b.classList.add('heard');b.dispatchEvent(new CustomEvent('heard',{bubbles:true}))};return b}
function spk(t,v,cls){var b=h('<button class="spk '+(cls||'')+'" type="button" aria-label="ฟังเสียง">'+SPK+'</button>');b.onclick=function(){play(t,v||'f',b)};return b}
/* ---------- pitch ---------- */
function f0(buf,sr){var n=buf.length,rms=0,i;for(i=0;i<n;i++)rms+=buf[i]*buf[i];rms=Math.sqrt(rms/n);if(rms<.012)return null;
  var lo=Math.floor(sr/500),hi=Math.floor(sr/70),best=0,bk=-1,c0=0;for(i=0;i<n;i++)c0+=buf[i]*buf[i];
  for(var k=lo;k<=hi&&k<n/2;k++){var c=0;for(i=0;i<n-k;i++)c+=buf[i]*buf[i+k];if(c>best){best=c;bk=k}}
  if(bk<0||best/c0<.45)return null;return sr/bk}
function contourFromBuffer(ab){var d=ab.getChannelData(0),sr=ab.sampleRate,W=Math.floor(sr*.04),H=Math.floor(sr*.015),out=[];
  for(var i=0;i+W<d.length;i+=H){out.push(f0(d.subarray(i,i+W),sr))}return out}
function normC(raw){ // -> array of 40 semitone values (median 0) or null
  var a=raw.slice(),i;var idx=[];for(i=0;i<a.length;i++)if(a[i])idx.push(i);if(idx.length<5)return null;
  a=a.slice(idx[0],idx[idx.length-1]+1);
  var v=a.filter(Boolean).slice().sort(function(x,y){return x-y});var med=v[Math.floor(v.length/2)];
  // octave fix + fill gaps
  var s=a.map(function(x){if(!x)return null;var st=12*Math.log(x/med)/Math.LN2;while(st>9)st-=12;while(st<-9)st+=12;return st});
  for(i=0;i<s.length;i++)if(s[i]===null){var j=i;while(j<s.length&&s[j]===null)j++;var L=i>0?s[i-1]:s[j],Rv=j<s.length?s[j]:L;for(var k=i;k<j;k++)s[k]=L+(Rv-L)*(k-i+1)/(j-i+1);i=j}
  var m=s.map(function(_,i){var w=s.slice(Math.max(0,i-2),i+3).sort(function(x,y){return x-y});return w[Math.floor(w.length/2)]});
  var o=[];for(i=0;i<40;i++){var p=i*(m.length-1)/39,f=Math.floor(p),r=p-f;o.push(m[f]+(f+1<m.length?(m[f+1]-m[f])*r:0))}return o}
var CC={};
function modelContour(t,v,cb){var k=v+':'+t;if(CC[k]){cb(CC[k]);return}var u=url(t,v),c=ac();if(!u||!c||!window.fetch){cb(null);return}
  fetch(u).then(function(r){return r.arrayBuffer()}).then(function(b){return new Promise(function(res,rej){c.decodeAudioData(b,res,rej)})}).then(function(ab){CC[k]=normC(contourFromBuffer(ab));cb(CC[k])}).catch(function(){cb(null)})}
function drawC(cv,model,mine){var r=window.devicePixelRatio||1,W=cv.clientWidth,H=cv.clientHeight;cv.width=W*r;cv.height=H*r;var g=cv.getContext('2d');g.scale(r,r);g.clearRect(0,0,W,H);
  g.strokeStyle='#F0E8DF';g.lineWidth=1;for(var i=1;i<4;i++){g.beginPath();g.moveTo(0,H*i/4);g.lineTo(W,H*i/4);g.stroke()}
  var rg=4;[model,mine].forEach(function(c){if(c)c.forEach(function(y){rg=Math.max(rg,Math.abs(y)*1.15)})});
  function ln(c,col,w,dash){if(!c)return;g.save();g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';if(dash)g.setLineDash(dash);g.beginPath();c.forEach(function(y,i){var X=14+(W-28)*i/(c.length-1),Y=H/2-y*(H/2-12)/rg;Y=Math.max(6,Math.min(H-6,Y));i?g.lineTo(X,Y):g.moveTo(X,Y)});g.stroke();g.restore()}
  ln(model,'#C9B8A6',7);ln(mine,'#C8102E',4)}
function score(a,b){if(!a||!b)return 0;var ma=0,mb=0,i;for(i=0;i<40;i++){ma+=a[i];mb+=b[i]}ma/=40;mb/=40;var d=0;for(i=0;i<40;i++)d+=Math.abs((a[i]-ma)-(b[i]-mb));d/=40;return Math.max(0,Math.min(100,Math.round(100-d*22)))}
/* ---------- shell ---------- */
var L,S={i:0,right:0,total:0,spoke:0},M,F,nextBtn;
function build(){
  document.body.innerHTML='<div id="app"><header><button class="x" id="xb" aria-label="กลับหน้ารวม">&times;</button><div class="bar"><i id="bf"></i></div><div class="stepn" id="sn"></div></header>'+
  '<div class="where"><span id="wst"></span><span id="wnm"></span></div><div class="ins" id="ins"></div><main id="main"></main><footer id="ft"><button class="btn" id="nx" disabled>ต่อไป</button></footer></div>';
  M=document.getElementById('main');F=document.getElementById('ft');nextBtn=document.getElementById('nx');
  document.getElementById('xb').onclick=function(){location.href='index.html'};
  nextBtn.onclick=function(){ac();if(S.i<L.steps.length-1)go(S.i+1);else location.href='index.html'};
}
var api={
  done:function(){nextBtn.disabled=false;nextBtn.classList.add('fadein')},
  lock:function(){nextBtn.disabled=true},
  play:play,sfx:sfx,h:h,spk:spk,vbtn:vbtn,shuffle:shuffle,R:R,SPK:SPK,MIC:MIC,STAR:STAR,
  add:function(html,where){var n=typeof html==='string'?h(html):html;(where||M).appendChild(n);return n},
  fb:function(html,type,where){var w=where||M;var old=w.querySelector(':scope > .fb.live');if(old)old.remove();var n=h('<div class="fb live '+(type||'tip')+'">'+html+'</div>');w.appendChild(n);n.scrollIntoView({block:'nearest',behavior:'smooth'});return n},
  mark:function(ok){S.total++;if(ok)S.right++},
  stats:function(){return S},
  img:function(p){return R+p}
};
function go(i){
  stopAudio();stopRec();S.i=i;var st=L.steps[i],n=L.steps.length;
  document.getElementById('bf').style.width=(i/(n-1)*100)+'%';
  document.getElementById('sn').textContent=(i+1)+'/'+n;
  document.getElementById('wst').innerHTML='<b>'+st.stage+'</b>';
  document.getElementById('wnm').textContent=st.name;
  document.getElementById('ins').textContent=st.ins;
  M.innerHTML='';nextBtn.disabled=true;nextBtn.classList.remove('fadein');
  nextBtn.textContent=i===n-1?'กลับหน้ารวมบทเรียน':'ต่อไป';
  if(st.guide){api.add('<div class="guide"><img src="'+R+(st.guideImg||'assets/mascot/teach.webp')+'" alt="ลามา"><div class="bub">'+st.guide+'</div></div>')}
  st.render(M,api);
  window.scrollTo(0,0);
}
/* ---------- generic: pick quiz ---------- */
// qs:[{play:'text',ask:'Thai',opts:[{html,ok}],explain:{ok:'',bad:''},cols:2}]
function pick(qs,o){o=o||{};return function(m,a){
  var box=a.add('<div class="fadein" style="display:flex;flex-direction:column;gap:12px"></div>');
  var dots=a.add('<div class="dots">'+qs.map(function(){return '<i></i>'}).join('')+'</div>',box);
  var q=0,body=a.add('<div style="display:flex;flex-direction:column;gap:12px"></div>',box);
  function show(){
    var Q=qs[q],v=Q.voice||(q%2?'m':'f');dots.children[q].className='c';body.innerHTML='';
    if(Q.play){var hd=a.add('<div class="qhead"></div>',body);var b=spk(Q.play,v,'big');hd.appendChild(b);hd.appendChild(h('<span class="vlab">'+(Q.ask||'ฟังเสียง')+'<br>'+VL[v]+'</span>'));setTimeout(function(){b.click()},350)}
    else if(Q.ask)a.add('<div class="card center" style="font-weight:600">'+Q.ask+'</div>',body);
    var og=a.add('<div class="opts'+(Q.cols===1?' one':'')+'"></div>',body);
    var opts=o.keepOrder||Q.keep?Q.opts:shuffle(Q.opts);
    opts.forEach(function(op,k){var b=h('<button class="opt" type="button" style="animation-delay:'+(k*60)+'ms">'+op.html+'</button>');og.appendChild(b);b.dataset.ok=op.ok?1:0;
      b.onclick=function(){if(og.dataset.ans)return;og.dataset.ans=1;var ok=!!op.ok;a.mark(ok);sfx(ok);
        b.classList.add(ok?'right':'wrong');[].forEach.call(og.children,function(c,j){if(c!==b){c.disabled=true;if(opts[j].ok)c.classList.add('right');else c.classList.add('dim')}});
        dots.children[q].className=ok?'d':'x';
        var ex=Q.explain||{};a.fb((ok?'<b>ถูกต้อง</b> ':'<b>ยังไม่ใช่</b> ')+(ok?(ex.ok||''):(ex.bad||ex.ok||'')),ok?'ok':'bad',body);
        if(op.say)setTimeout(function(){play(op.say,v)},450);
        var nb=h('<button class="btn o sm" type="button" style="align-self:center">'+(q<qs.length-1?'ข้อต่อไป':'ครบทุกข้อแล้ว')+'</button>');body.appendChild(nb);
        if(q<qs.length-1){nb.onclick=function(){q++;show()}}else{nb.disabled=true;nb.style.opacity=.6;a.done()}
      }});
  }
  show();
}}
/* ---------- generic: listen cards ---------- */
function listen(cards,o){o=o||{};return function(m,a){
  if(o.top)a.add(o.top);
  var g=a.add('<div class="lcards"'+(o.cols?' style="grid-template-columns:repeat('+o.cols+',1fr)"':'')+'></div>');var left=cards.length;
  cards.forEach(function(c,k){var n=h('<div class="lcard" style="animation-delay:'+(k*70)+'ms">'+(c.top||'')+(c.py?'<div class="py">'+c.py+'</div>':'')+(c.zh?'<div class="zh">'+c.zh+'</div>':'')+(c.th?'<small>'+c.th+'</small>':'')+'<div class="vs"></div></div>');
    var vs=n.querySelector('.vs');(c.voices||['f','m']).forEach(function(v){vs.appendChild(vbtn(c.say,v))});
    n.addEventListener('heard',function(){if(!n.classList.contains('done')){n.classList.add('done');left--;if(c.onHeard)c.onHeard(n);if(!left){if(o.after)a.fb(o.after,'tip');a.done()}}});
    g.appendChild(n)});
  if(o.bottom)a.add(o.bottom);
}}
/* ---------- generic: speak and compare ---------- */
var REC=null;
function stopRec(){if(!REC)return;try{clearInterval(REC.t);REC.stream.getTracks().forEach(function(t){t.stop()});if(REC.mr&&REC.mr.state!=='inactive')REC.mr.stop()}catch(e){}var r=REC;REC=null;if(r.cb)r.cb()}
function speak(targets,o){o=o||{};return function(m,a){
  var ti=0,attempted=0;
  var dots=targets.length>1?a.add('<div class="dots">'+targets.map(function(){return '<i></i>'}).join('')+'</div>'):null;
  var wrap=a.add('<div style="display:flex;flex-direction:column;gap:10px"></div>');
  function show(){
    var T=targets[ti];wrap.innerHTML='';if(dots){[].forEach.call(dots.children,function(d,j){d.className=j<ti?'d':j===ti?'c':''})}
    var card=a.add('<div class="card fadein"><div class="row"><div style="flex:1"><div class="zh" style="font-size:40px;line-height:1.15">'+T.zh+'</div><div class="py" style="font-size:20px;color:var(--red);font-weight:600">'+T.py+'</div><div style="font-size:14px;color:var(--sub)">'+T.th+'</div></div><div class="vs" style="display:flex;flex-direction:column;gap:6px"></div></div>'+(T.tip?'<div class="fb tip" style="margin-top:10px">'+T.tip+'</div>':'')+'</div>',wrap);
    var vs=card.querySelector('.vs');vs.appendChild(vbtn(T.say,'f'));vs.appendChild(vbtn(T.say,'m'));
    var pad=a.add('<div class="pad"><canvas style="height:128px"></canvas></div>',wrap);var cv=pad.querySelector('canvas');
    a.add('<div class="leg"><span><i style="background:#C9B8A6"></i>เส้นเสียงต้นแบบ</span><span><i style="background:#C8102E"></i>เส้นเสียงของคุณ</span></div>',wrap);
    var model=null;drawC(cv,T.tpl||null,null);modelContour(T.say,'f',function(c){model=c||T.tpl||null;drawC(cv,model,null)});
    var ctl=a.add('<div class="row jc" style="gap:16px"></div>',wrap);
    var mic=h('<button class="mic" type="button" aria-label="กดแล้วพูด">'+MIC+'</button>');ctl.appendChild(mic);
    var st=a.add('<p class="note">กดปุ่มไมโครโฟน แล้วพูดตามภายใน 3 วินาที</p>',wrap);
    var row2=a.add('<div class="row jc wrap" style="gap:8px"></div>',wrap);
    var mine=h('<button class="vbtn hide" type="button">'+SPK+'<span>ฟังเสียงของฉัน</span></button>');row2.appendChild(mine);
    var self=h('<button class="vbtn" type="button"><span>ไม่มีไมโครโฟน ใช้วิธีตรวจเอง</span></button>');row2.appendChild(self);
    var fbw=a.add('<div></div>',wrap);var blobUrl=null;
    function finish(){attempted++;if(dots)dots.children[ti].className='d';
      if(ti<targets.length-1){var nb=h('<button class="btn o sm" type="button" style="align-self:center">คำต่อไป</button>');fbw.appendChild(nb);nb.onclick=function(){ti++;show()}}else a.done()}
    var finished=false;function fin1(){if(!finished){finished=true;finish()}}
    function selfCheck(why){mic.classList.add('hide');st.textContent=why||'ตรวจด้วยตนเอง: ฟังต้นแบบ พูดตามออกเสียงดัง แล้วฟังต้นแบบอีกครั้ง';self.classList.add('hide');
      var box=a.add('<div class="card fadein" style="display:flex;flex-direction:column;gap:8px"><div style="font-size:14px">1. ฟังต้นแบบ  2. พูดตามออกเสียงดัง  3. ฟังอีกครั้งแล้วเทียบด้วยหูของคุณ</div><div class="row jc" style="gap:8px"></div></div>',fbw);
      var r=box.querySelector('.row');var y=h('<button class="btn sm" type="button">ใกล้เคียงต้นแบบแล้ว</button>'),n=h('<button class="btn o sm" type="button">ยังไม่ใกล้ ขอฟังอีกครั้ง</button>');r.appendChild(y);r.appendChild(n);
      var l=h('<button class="vbtn" type="button">'+SPK+'<span>ฟังต้นแบบ</span></button>');l.onclick=function(){play(T.say,'f',l)};box.insertBefore(l,r);
      y.onclick=function(){a.fb('<b>ดีมาก</b> บันทึกว่าพูดแล้ว 1 ครั้ง','ok',fbw);y.disabled=n.disabled=true;fin1()};
      n.onclick=function(){play(T.say,(window.B0A||{})['s:'+T.say]?'s':'f',l)};
    }
    self.onclick=function(){selfCheck()};
    mic.onclick=function(){
      if(REC){stopRec();return}
      var c=ac();if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!c){selfCheck('อุปกรณ์นี้ใช้ไมโครโฟนไม่ได้ จึงเปลี่ยนเป็นการตรวจด้วยตนเอง');return}
      stopAudio();st.textContent='กำลังขอใช้ไมโครโฟน…';
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
        var src=c.createMediaStreamSource(stream),an=c.createAnalyser();an.fftSize=2048;src.connect(an);var buf=new Float32Array(an.fftSize),raw=[],chunks=[],mr=null;
        try{mr=new MediaRecorder(stream);mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};mr.onstop=function(){if(chunks.length){blobUrl=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||'audio/webm'}));mine.classList.remove('hide')}};mr.start()}catch(e){mr=null}
        mic.classList.add('rec');mic.innerHTML=STOP;st.textContent='กำลังฟัง… พูดได้เลย';var t0=Date.now();
        REC={stream:stream,mr:mr,t:setInterval(function(){an.getFloatTimeDomainData(buf);raw.push(f0(buf,c.sampleRate));if(Date.now()-t0>3000)stopRec()},25),cb:function(){
          mic.classList.remove('rec');mic.innerHTML=MIC;try{src.disconnect()}catch(e){}
          var me=normC(raw);
          if(!me){st.textContent='ไม่ได้ยินเสียงพูด ลองกดอีกครั้งแล้วพูดให้ดังขึ้น';a.fb('ยังไม่ได้ยินเสียง ลองพูดใกล้โทรศัพท์มากขึ้น','bad',fbw);sfx(false);return}
          drawC(cv,model,me);var sc=score(model,me);S.spoke++;
          var msg=sc>=70?'<b>เส้นเสียงใกล้ต้นแบบมาก</b> ('+sc+'/100)':sc>=45?'<b>ใกล้แล้ว</b> ('+sc+'/100) ดูเส้นสีแดงเทียบกับเส้นสีเทา แล้วลองอีกครั้งได้':'<b>ยังต่างจากต้นแบบ</b> ('+sc+'/100) ฟังต้นแบบอีกครั้ง แล้วลองใหม่';
          a.fb(msg+(T.hint?'<br>'+T.hint:''),sc>=45?'ok':'bad',fbw);sfx(sc>=45);st.textContent='กดไมโครโฟนเพื่อพูดอีกครั้งได้';fin1();
        }};
      }).catch(function(){selfCheck('ไม่ได้รับอนุญาตให้ใช้ไมโครโฟน จึงเปลี่ยนเป็นการตรวจด้วยตนเอง')});
    };
    mine.onclick=function(){if(!blobUrl)return;stopAudio();var au=new Audio(blobUrl);cur=au;mine.classList.add('playing');au.onended=function(){mine.classList.remove('playing')};au.play().catch(function(){mine.classList.remove('playing')})};
  }
  show();
}}
/* ---------- reward ---------- */
function reward(o){return function(m,a){
  var s=S,pct=s.total?s.right/s.total:1,n=pct>=.85?3:pct>=.6?2:1;
  a.add('<img class="lama-big" src="'+R+'assets/mascot/celebrate.webp" alt="ลามาดีใจ">');
  a.add('<h1>จบ'+L.title+'</h1>');
  var stars=a.add('<div class="stars">'+[0,1,2].map(function(){return STAR}).join('')+'</div>');
  a.add('<p class="note">ตอบถูก '+s.right+' จาก '+s.total+' ข้อ'+(s.spoke?' · พูดเทียบเสียง '+s.spoke+' ครั้ง':'')+'</p>');
  [].forEach.call(stars.children,function(sv,i){if(i<n)setTimeout(function(){sv.classList.add('on');sfx(true)},400+i*350);else{sv.style.opacity=.25;sv.style.transform='none'}});
  if(o.extra)o.extra(m,a);
  var sum=a.add('<div class="sum"></div>');o.learned.forEach(function(t,i){sum.appendChild(h('<div style="animation-delay:'+(900+i*120)+'ms"><b>ได้แล้ว</b> '+t+'</div>'))});
  setTimeout(a.done,600);
}}
window.B0={run:function(lesson){L=lesson;build();go(0)},pick:pick,listen:listen,speak:speak,reward:reward,play:play,sfx:sfx,h:h,spk:spk,vbtn:vbtn,MIC:MIC,shuffle:shuffle,stopAudio:stopAudio,R:R,SPK:SPK,STAR:STAR};
})();
