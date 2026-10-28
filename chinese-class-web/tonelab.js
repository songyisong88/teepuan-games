/* ห้องแล็บวรรณยุกต์สำหรับคนไทย — เส้นเสียง · คู่เสียง 2 พยางค์ · คู่เสียงที่ฟังแยกยาก · เสียงเปลี่ยน
   ทุกอย่างทำงานในเครื่อง (เสียงเป็นไฟล์สังเคราะห์ ไม่ใช่ผู้พูดจริง) · การเทียบกับวรรณยุกต์ไทยเป็นการประมาณเพื่อช่วยจำ */
const TL_CONT={1:[5,5],2:[3,5],3:[2,1,4],4:[5,1]};            /* Chao tone letters: 55 · 35 · 214 · 51 */
const TL_HALF3=[2,1];                                           /* เสียง 3 หน้าพยางค์อื่น = “ครึ่งเสียง 3” (21) */
const TL_COL={1:'#A8501F',2:'#2B7552',3:'#3A64A8',4:'#7A4A9C'};
const TL_SINGLE=[{t:1,zh:'妈',py:'mā',th:'แม่'},{t:2,zh:'麻',py:'má',th:'ป่าน / ชา'},{t:3,zh:'马',py:'mǎ',th:'ม้า'},{t:4,zh:'骂',py:'mà',th:'ด่า'}];
const TL_PAIRS=[
 {a:1,b:1,zh:'今天',py:'jīn tiān',th:'วันนี้'},{a:1,b:2,zh:'中国',py:'zhōng guó',th:'ประเทศจีน'},{a:1,b:3,zh:'开始',py:'kāi shǐ',th:'เริ่ม'},{a:1,b:4,zh:'生日',py:'shēng rì',th:'วันเกิด'},
 {a:2,b:1,zh:'明天',py:'míng tiān',th:'พรุ่งนี้'},{a:2,b:2,zh:'学习',py:'xué xí',th:'เรียน'},{a:2,b:3,zh:'啤酒',py:'pí jiǔ',th:'เบียร์'},{a:2,b:4,zh:'学校',py:'xué xiào',th:'โรงเรียน'},
 {a:3,b:1,zh:'老师',py:'lǎo shī',th:'ครู'},{a:3,b:2,zh:'起床',py:'qǐ chuáng',th:'ลุกจากเตียง'},{a:3,b:3,zh:'水果',py:'shuǐ guǒ',th:'ผลไม้',sandhi:1},{a:3,b:4,zh:'请问',py:'qǐng wèn',th:'ขอถามหน่อย'},
 {a:4,b:1,zh:'汽车',py:'qì chē',th:'รถยนต์'},{a:4,b:2,zh:'大学',py:'dà xué',th:'มหาวิทยาลัย'},{a:4,b:3,zh:'电脑',py:'diàn nǎo',th:'คอมพิวเตอร์'},{a:4,b:4,zh:'再见',py:'zài jiàn',th:'ลาก่อน'}];
const TL_MIN=[
 [{zh:'买',py:'mǎi',th:'ซื้อ'},{zh:'卖',py:'mài',th:'ขาย'}],
 [{zh:'水饺',py:'shuǐ jiǎo',th:'เกี๊ยวต้ม'},{zh:'睡觉',py:'shuì jiào',th:'นอน'}],
 [{zh:'问',py:'wèn',th:'ถาม'},{zh:'文',py:'wén',th:'ภาษา/อักษร'}],
 [{zh:'四',py:'sì',th:'สี่'},{zh:'十',py:'shí',th:'สิบ'}],
 [{zh:'汤',py:'tāng',th:'ซุป'},{zh:'糖',py:'táng',th:'น้ำตาล'}],
 [{zh:'鱼',py:'yú',th:'ปลา'},{zh:'雨',py:'yǔ',th:'ฝน'}],
 [{zh:'房间',py:'fáng jiān',th:'ห้อง'},{zh:'放假',py:'fàng jià',th:'ปิดเทอม/วันหยุด'}],
 [{zh:'书',py:'shū',th:'หนังสือ'},{zh:'熟',py:'shú',th:'สุก / คุ้นเคย'}]];
function tlSvg(tones,{h=64,w=56,sw=5,half=false}={}){const n=tones.length;let g='';
 tones.forEach((t,k)=>{let pts=TL_CONT[t];if(t===3&&half&&k<n-1)pts=TL_HALF3;const x0=k*w+8,x1=(k+1)*w-8;
  const P=pts.map((l,i)=>[x0+(x1-x0)*(pts.length===1?0:i/(pts.length-1)),8+(5-l)*((h-16)/4)]);
  g+=`<polyline points="${P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${TL_COL[t]}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${P[P.length-1][0].toFixed(1)}" cy="${P[P.length-1][1].toFixed(1)}" r="${sw*.9}" fill="${TL_COL[t]}"/>`});
 return `<svg viewBox="0 0 ${n*w} ${h}" width="${n*w}" height="${h}" role="img" aria-label="เส้นระดับเสียง ${tones.map(t=>'เสียง '+t).join(' แล้ว ')}">${[1,3,5].map(l=>`<line x1="0" x2="${n*w}" y1="${8+(5-l)*((h-16)/4)}" y2="${8+(5-l)*((h-16)/4)}" stroke="#E5DED5" stroke-width="1" stroke-dasharray="3 4"/>`).join('')}${g}</svg>`}
const TL_THAI={
 1:{k:'ระดับสูง ค้างนิ่ง',tip:'คนไทยมักปล่อยเสียงหลุดลงตอนท้าย ให้ลองนึกว่ากำลังร้องโน้ตสูงค้างไว้ ไม่ให้ตก'},
 2:{k:'ไล่ขึ้น',tip:'คล้ายจัตวาของไทย แต่ไม่ต้องกดเสียงลงก่อนแล้วค่อยขึ้น เริ่มจากระดับกลางแล้วไล่ขึ้นเลย'},
 3:{k:'ต่ำ (ลงแล้วขึ้น)',tip:'ในประโยคจริงมักออกแค่ “ต่ำลง” (ครึ่งเสียง 3) ไม่ต้องเด้งขึ้นทุกครั้ง · คล้ายเอกที่ต่ำและหนัก'},
 4:{k:'ตกเร็ว',tip:'คล้ายโท แต่เริ่มสูงกว่าและตกลึกถึงต่ำสุด สั้นและหนัก เหมือนสั่ง “ไม่!”'}};
function tlHub(){return `<div class="sec">ฝึกกับเส้นเสียง</div><div class="card pad2" style="padding:12px 14px">
 <p class="cap" style="margin:0 0 8px;line-height:1.5">เส้นนี้คือระดับเสียงสูง–ต่ำของแต่ละเสียง (เทียบกับเสียงพูดของเราเอง) · แตะเพื่อฟัง “妈 má…” ทีละเสียง</p>
 <div class="tlrow">${TL_SINGLE.map(s=>`<button class="tlc press" data-act="audio" data-t="${s.zh}" aria-label="ฟัง ${s.py} ${s.th}">${tlSvg([s.t],{h:56,w:56,sw:5})}<b class="zh">${s.zh}</b><small>${s.py}</small></button>`).join('')}</div>
 ${[1,2,3,4].map(t=>`<div class="tlnote"><b style="color:${TL_COL[t]}">เสียง ${t} · ${TL_THAI[t].k}</b><span>${TL_THAI[t].tip}</span></div>`).join('')}
 <p class="cap" style="margin:8px 0 0">* เทียบกับวรรณยุกต์ไทยแบบคร่าว ๆ เพื่อช่วยจำ ไม่ใช่เสียงเดียวกันทุกประการ · เสียงตัวอย่างเป็นเสียงสังเคราะห์ ควรฟังผู้พูดจริงควบคู่</p></div>
 <div class="group mt16">
  ${ROW('#EFF1F8','🎚️','ตารางคู่เสียง 2 พยางค์','16 คู่ · แตะฟังและดูเส้นเสียง · กฎเสียงเปลี่ยน',undefined,'data-go="tonegrid"')}
  ${ROW('#E9F4EE','👂','ฟังแล้วเลือกเส้นเสียง','8 ข้อ · พยางค์เดียว',undefined,'data-go="tl_single"')}
  ${ROW('#FBEFE6','🎼','ฟังแล้วเลือกเส้นคู่เสียง','8 ข้อ · คำ 2 พยางค์',undefined,'data-go="tl_pair"')}
  ${ROW('#F2EAF8','🔀','คู่เสียงที่ฟังแยกยาก','8 ข้อ · 买/卖 · 四/十 · 水饺/睡觉',undefined,'data-go="tl_min"')}</div>`}
const _tonesSC=SC.tones;
SC.tones=()=>{const r=_tonesSC();r.body=r.body.replace(/<div class="dock">[\s\S]*$/,tlHub()+`<div class="dock"><button class="pill press" data-go="tonedrill"><b>ฝึกฟังจากคำที่เรียนแล้ว</b><small>8 ข้อ · เลือกพินอินที่ถูก</small></button></div>`);return r};
SC.tonegrid=()=>({title:'ตารางคู่เสียง',body:`<div class="large">ตารางคู่เสียง 2 พยางค์</div><p class="cap" style="padding:2px 20px 0;line-height:1.5">แถว = เสียงของพยางค์แรก · คอลัมน์ = เสียงของพยางค์ที่สอง · แตะเพื่อฟังคำตัวอย่าง</p>
 <div class="tlgrid">${TL_PAIRS.map(p=>`<button class="tlg press" data-act="audio" data-t="${p.zh}" aria-label="ฟัง ${p.zh} ${p.th}">${tlSvg([p.a,p.b],{h:44,w:42,sw:4,half:true})}<b class="zh">${p.zh}</b><small>${p.py}</small><small class="th">${p.th}</small></button>`).join('')}</div>
 <div class="sec">กฎเสียงเปลี่ยนที่เจอบ่อย</div><div class="card pad2" style="font-size:14.5px;line-height:1.7">
  <b>① เสียง 3 + เสียง 3</b> → พยางค์แรกกลายเป็นเสียง 2<br>你好 เขียน nǐ hǎo แต่พูดเหมือน <b>ní</b> hǎo · 水果 พูดเหมือน <b>shuí</b> guǒ<br>
  <div style="margin:8px 0">${tlSvg([3,3],{h:44,w:42,sw:4})} <span class="cap">เขียน 3+3</span> &nbsp;→&nbsp; ${tlSvg([2,3],{h:44,w:42,sw:4})} <span class="cap">ได้ยินจริง 2+3</span></div>
  <b>② 不 bù</b> → เจอเสียง 4 ข้างหลังจะเป็น <b>bú</b> (不是 bú shì · 不要 bú yào)<br>
  <b>③ 一 yī</b> → ก่อนเสียง 4 เป็น <b>yí</b> (一个 yí ge) · ก่อนเสียง 1–3 เป็น <b>yì</b> (一天 yì tiān)<br>
  <p class="cap" style="margin:8px 0 0">ในแอปนี้พินอินเขียนตามเสียงพื้นฐานของแต่ละคำ ยกเว้น 不/一 ที่เขียนตามเสียงที่ออกจริง · ตัวอย่างเสียงเป็นเสียงสังเคราะห์</p></div>
 <div class="dock"><button class="pill press" data-go="tl_pair"><b>ลองฟังแล้วเลือกเส้นคู่เสียง</b><small>8 ข้อ</small></button></div>`});
function tlQuestions(kind){const out=[];
 if(kind==='single'){const pool=shuffle([...TL_SINGLE,...TL_SINGLE]).slice(0,8);pool.forEach(s=>{const opts=shuffle([1,2,3,4]);
   out.push({k:'q',q:{w:null,type:'tone',custom:true,top:`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกเส้นที่ตรงกับเสียงสูงต่ำ</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${s.zh}" data-tl="${s.zh}">${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`,
    optsHtml:opts.map(t=>`<span class="tlopt">${tlSvg([t],{h:44,w:56,sw:4})}<small class="cap">เสียง ${t}</small></span>`),ans:opts.indexOf(s.t),
    reveal:`<div class="ans"><b style="font-size:17px">${s.py}</b> · <span class="zh">${s.zh}</span> = ${s.th}<div style="margin-top:6px;font-size:14px;color:var(--sub2)"><b class="t${s.t}">เสียง ${s.t} · ${TL_THAI[s.t].k}</b> — ${TL_THAI[s.t].tip}</div></div>`}})})}
 else if(kind==='pair'){const ps=TL_PAIRS.filter(p=>!p.sandhi);shuffle(ps).slice(0,8).forEach(p=>{const others=shuffle(ps.filter(x=>!(x.a===p.a&&x.b===p.b))).slice(0,3);const opts=shuffle([p,...others]);
   out.push({k:'q',q:{w:null,type:'tone',custom:true,top:`<div class="cap" style="font-size:14px">ฟังคำ 2 พยางค์ แล้วเลือกเส้นเสียงที่ตรงกัน</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${p.zh}" data-tl="${p.zh}">${SPK}</button><div class="cap mt12">ฟังทีละพยางค์ — สูงต่ำเริ่มจากตรงไหน จบที่ไหน</div>`,
    optsHtml:opts.map(o=>`<span class="tlopt">${tlSvg([o.a,o.b],{h:44,w:50,sw:4,half:true})}<small class="cap">เสียง ${o.a} + ${o.b}</small></span>`),ans:opts.indexOf(p),
    reveal:`<div class="ans"><b style="font-size:17px">${p.py}</b> · <span class="zh">${p.zh}</span> = ${p.th}<div style="margin-top:6px;font-size:14px;color:var(--sub2)">เสียง ${p.a} + เสียง ${p.b}${p.a===3?' · พยางค์แรกเป็นครึ่งเสียง 3 (ต่ำลงอย่างเดียว)':''}</div></div>`}})})}
 else{shuffle(TL_MIN).forEach(pr=>{const k=Math.random()<.5?0:1,t=pr[k],opts=shuffle([pr[0],pr[1]]);
   out.push({k:'q',q:{w:null,type:'tone',custom:true,top:`<div class="cap" style="font-size:14px">ฟังเสียง แล้วเลือกคำที่ได้ยิน (หน้าตาคล้ายกัน เสียงสูงต่ำต่างกัน)</div><button class="audio press" aria-label="ฟังเสียง" style="width:92px;height:92px;margin-top:14px" data-act="audio" data-t="${t.zh}" data-tl="${t.zh}">${SPK}</button><div class="cap mt12">แตะเพื่อฟังอีกครั้ง</div>`,
    optsHtml:opts.map(o=>`<span class="zh" style="font-size:26px">${o.zh}</span> <span class="cap" style="margin-left:6px">${o.py}</span><br><span style="font-size:14px;color:var(--sub2)">${o.th}</span>`),ans:opts.indexOf(t),
    reveal:`<div class="ans">${pr.map(o=>`<div><span class="zh" style="font-size:20px">${o.zh}</span> &nbsp;<b>${o.py}</b> = ${o.th}</div>`).join('')}</div>`}})})}
 return out}
function tlDrill(kind,title){return ()=>({nav:sessNav,body:'<div class="stage" id="stage"></div>',extra:sessExtra,noRefresh:true,unmount(){stopAudio();if(window.__tlObs){window.__tlObs.disconnect();window.__tlObs=null}},
 mount(el){const qs=tlQuestions(kind);const st=$('#stage',el);
  if(window.__tlObs)window.__tlObs.disconnect();
  window.__tlObs=new MutationObserver(()=>{const b=$('[data-tl]',st);if(b&&b.dataset.tlDone!=='1'){b.dataset.tlDone='1';setTimeout(()=>{if(document.body.contains(b))speak(b.dataset.tl,b)},350)}});window.__tlObs.observe(st,{childList:true});
  session(el,qs,res=>{const xp=res.correct*2;addXp(xp);addCoins(res.correct);bumpCnt('tonelab',1);replace('result',{title,mascot:res.correct>=6?'celebrate':'cheer',sub:`ตอบถูก ${res.correct}/${res.total}`,xp,coins:res.correct,stats:[['ตอบถูก',res.correct+'/'+res.total]],back:'x'})},{review:true})}})}
SC.tl_single=tlDrill('single','ฟังเส้นเสียงเสร็จ');SC.tl_pair=tlDrill('pair','ฟังคู่เสียงเสร็จ');SC.tl_min=tlDrill('min','แยกคู่เสียงเสร็จ');
Object.assign(window.GOX,{tonegrid:()=>push('tonegrid'),tl_single:()=>replace('tl_single'),tl_pair:()=>replace('tl_pair'),tl_min:()=>replace('tl_min')});
