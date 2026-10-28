/* ติวเตอร์จำลอง · เรียนด้วยกัน · สรุปสัปดาห์ */
/* ---------- ติวเตอร์จำลอง: ตอบจากกติกาที่เขียนไว้ล่วงหน้า (ไม่ใช่ปัญญาประดิษฐ์) ----------
   จุดเชื่อมต่อเดียว: TUTOR_ADAPTER(msg, ctx) -> Promise<{html, say?, act?}>
   ถ้าจะเชื่อมระบบตอบอัตโนมัติจริง: แทนที่ฟังก์ชันนี้ด้วย fetch ไปยังเซิร์ฟเวอร์ของคุณ (เก็บ API key ฝั่งเซิร์ฟเวอร์เท่านั้น)
   ให้ตอบกลับรูปแบบเดียวกัน แล้วที่เหลือของหน้าจอใช้ได้ทันที */
const TUTOR_ADAPTER=(msg,ctx)=>Promise.resolve(tutorReplySim(msg,ctx));
/* รูปแบบการแก้ประโยคที่คนไทยพลาดบ่อย: [ข้อความผิด(ตัดเว้นวรรค/วรรคตอน), ประโยคที่ถูก, คำอธิบาย] — จับแบบ “มีข้อความนี้อยู่ในประโยค” จึงตรวจได้เฉพาะแพตเทิร์นเหล่านี้ */
const CORR=[['我是很好','我很好','“是” (shì = เป็น/คือ) ใช้เชื่อมคำนาม ไม่ใช้นำหน้าคำคุณศัพท์ ถ้าจะบอกว่าสบายดี พูดว่า 我很好。'],
 ['你名字什么','你叫什么名字？','ถามชื่อ ใช้ 叫 (jiào = ชื่อว่า) นำหน้า: 你叫什么名字？ (เธอชื่ออะไร)'],
 ['再见明天','明天见！','ลำดับคำจีนคือ “เวลา” มาก่อน “คำกริยา”: 明天见 = พรุ่งนี้เจอกัน'],
 ['我不有','我没有','“有” (มี) ปฏิเสธด้วย 没 (méi) ไม่ใช้ 不: 我没有 = ฉันไม่มี'],
 ['我爱你很','我很爱你','คำบอกระดับอย่าง 很 วางหน้าคำกริยา/คำคุณศัพท์: 我很爱你'],
 ['我吃饭在家','我在家吃饭','ที่สถานที่ (在+สถานที่) ต้องมาก่อนคำกริยา: 我在家吃饭 = ฉันกินข้าวที่บ้าน'],
 ['我去学校在','我在学校','บอกว่า “อยู่ที่ไหน” ใช้ 在 + สถานที่: 我在学校 (ฉันอยู่ที่โรงเรียน) ถ้าจะบอกว่าไปใช้ 我去学校'],
 ['我是泰国','我是泰国人','บอกสัญชาติต้องมี 人 (rén = คน) ต่อท้าย: 泰国人 = คนไทย'],
 ['一个书','一本书','หนังสือใช้ลักษณนาม 本 (běn) ไม่ใช่ 个: 一本书'],
 ['三个书','三本书','หนังสือใช้ลักษณนาม 本 (běn): 三本书'],
 ['两个猫','两只猫','สัตว์ตัวเล็กใช้ลักษณนาม 只 (zhī): 两只猫'],
 ['二个','两个','ก่อนลักษณนามมักใช้ 两 (liǎng) แทน 二 (èr): 两个'],
 ['我有二十岁','我二十岁','บอกอายุไม่ต้องมี 有: 我二十岁 (ฉันอายุยี่สิบปี)'],
 ['我吃了饭已经','我已经吃饭了','คำว่า 已经 (แล้ว) วางหน้าคำกริยา และ 了 มักอยู่ท้ายประโยค: 我已经吃饭了'],
 ['我也是不','我也不是','ลำดับคำปฏิเสธ: 也 + 不 + กริยา → 我也不是 (ฉันก็ไม่ใช่)'],
 ['都我们','我们都','คำว่า 都 (ทั้งหมด) วางหลังประธาน: 我们都是学生'],
 ['我在学习中国','我在学习中文','เรียนภาษา ใช้ 中文/汉语 ไม่ใช่ 中国 (ประเทศจีน): 我在学习中文'],
 ['太好很','太好了','โครงสร้าง “太…了” = …มากเกินไป/…จัง: 太好了 = ดีจังเลย'],
 ['我很想去吗','你想去吗','ประโยคคำถามที่ลงท้ายด้วย 吗 พูดถึงอีกฝ่าย: 你想去吗？ (คุณอยากไปไหม)'],
 ['你好吗你','你好吗','ไม่ต้องใส่ประธานซ้ำ: 你好吗？ (คุณสบายดีไหม)'],
 ['谢谢你很','非常感谢你','จะบอกว่า “ขอบคุณมาก” พูด 非常感谢 หรือ 太谢谢你了 ไม่ต้องเติม 很 ท้ายประโยค'],
 ['我不会说中文很好','我中文说得不好','เมื่ออธิบายว่า “พูดได้ดีไหม” ใช้ กริยา+得+คำคุณศัพท์ : 我中文说得不好'],
 ['昨天他来','昨天他来了','เหตุการณ์ที่จบไปแล้วมักลงท้ายด้วย 了: 昨天他来了 (เมื่อวานเขามา)']];
const sh=t=>String(t).replace(/[\s，。？！,.?!、“”"'「」]/g,'');
const tzh=(zh,py)=>`<span class="zh" style="font-size:20px">${zh}</span>`+(py?` <span style="font-size:13px">${pyHtml(py)}</span>`:'');
function tutorWordHtml(w){const L=lessonBy(w.lesson);
 return `<b>${tzh(w.zh,w.py)}</b> ${spkBtn(w.zh,'','ฟัง')}<br>แปลว่า <b>${w.th}</b> · อ่านแบบไทยประมาณ “${w.h}”${w.mn?`<br><span class="cap" style="font-size:13px">💡 ${w.mn}</span>`:''}<br><div style="margin-top:6px;padding:8px 10px;background:rgba(0,0,0,.04);border-radius:12px"><span class="zh" style="font-size:16px">${zhHtml(w.ex.replace(/\//g,''),w.exPy&&w.exPy.replace(/\//g,' '))}</span> ${spkBtn(w.ex.replace(/\//g,''),'','')}<br><span class="cap">${w.exTh}</span></div><span class="cap" style="font-size:12px">จากบทที่ ${L.id} · ${L.th}</span>`}

/* อธิบายไวยากรณ์พื้นฐาน (ข้อความเตรียมไว้ล่วงหน้า) */
const GRAM=[['是','“是” (shì) = เป็น/คือ ใช้เชื่อมคำนาม เช่น 我是学生 (ฉันเป็นนักเรียน) · ไม่ใช้นำหน้าคำคุณศัพท์ (✗我是很好)'],
 ['不','“不” (bù) ปฏิเสธกริยาทั่วไป/ปัจจุบัน/อนาคต เช่น 我不去 · ก่อนเสียง 4 ออกเสียงเป็น bú เช่น 不是 (bú shì)'],
 ['没','“没” (méi) ปฏิเสธ 有 และเหตุการณ์ที่ยังไม่เกิด เช่น 我没有钱 · 我没吃饭'],
 ['吗','“吗” (ma) ท้ายประโยคทำให้เป็นคำถาม ใช่/ไม่ใช่ เช่น 你好吗？ · ใช้ร่วมกับคำถามอื่นเช่น 什么 ไม่ได้'],
 ['呢','“呢” (ne) ถามกลับ “แล้ว…ล่ะ?” เช่น 我很好，你呢？'],
 ['吧','“吧” (ba) ท้ายประโยคชวน/เสนอ/คาดเดา เช่น 我们走吧 (ไปกันเถอะ)'],
 ['的','“的” (de) เชื่อมคำขยายกับคำนาม/แสดงความเป็นเจ้าของ เช่น 我的书 (หนังสือของฉัน) · ญาติสนิทมักละได้ เช่น 我妈妈'],
 ['了','“了” (le) บอกว่าเหตุการณ์เสร็จแล้วหรือสถานการณ์เปลี่ยน เช่น 我吃了 · 太好了'],
 ['很','“很” (hěn) นำหน้าคำคุณศัพท์ ถึงไม่ได้แปลว่า “มาก” เสมอไป เช่น 我很好 · ถ้าไม่ใส่ มักฟังเหมือนกำลังเปรียบเทียบ'],
 ['也','“也” (yě) = ก็/เหมือนกัน วางหน้ากริยา เช่น 我也是学生'],
 ['都','“都” (dōu) = ทั้งหมด วางหลังประธาน เช่น 我们都是学生'],
 ['在','“在” (zài) = อยู่ที่ เช่น 我在家 · หรือกำลังทำ เช่น 我在吃饭 · สถานที่ที่ทำ มาก่อนกริยา 我在家吃饭'],
 ['个','“个” (ge) ลักษณนามที่ใช้ทั่วไป เช่น 一个人 · ของบางอย่างมีลักษณนามเฉพาะ เช่น 一本书 (หนังสือ) 一只猫 (แมว)'],
 ['和','“和” (hé) = และ/กับ เชื่อมคำนาม เช่น 我和你 · ไม่ใช้เชื่อมประโยคกริยา'],
 ['想','“想” (xiǎng) = อยากทำ/คิดถึง เช่น 我想去 (ฉันอยากไป) · 我想你 (ฉันคิดถึงเธอ)'],
 ['会','“会” (huì) = เป็น/ทำได้ (เพราะเรียนรู้มา) เช่น 我会说中文'],
 ['要','“要” (yào) = ต้องการ/จะ เช่น 我要茶 · 我要去'],
 ['有','“有” (yǒu) = มี เช่น 我有朋友 · ปฏิเสธด้วย 没有']];
/* เคล็ดลับการออกเสียงสำหรับคนไทย (เทียบแบบคร่าว ๆ) */
const PRON=[[/zh|ch|sh|จัง|ลิ้นม้วน/i,'zh / ch / sh: ม้วนปลายลิ้นขึ้นเล็กน้อยแตะเพดาน (เสียงเหมือน จ ฉ ช แบบลิ้นม้วน) · z / c / s: ลิ้นแบนวางหลังฟัน (คล้าย จ ฉ ซ ธรรมดา) — ฝึกจับคู่ในหน้าวรรณยุกต์/ฟังเสียงได้'],
 [/\b[jqx]\b|เสียง j|เสียง q|เสียง x/i,'j / q / x: ลิ้นแบนใกล้ฟันหน้าล่าง ยิ้มเล็กน้อย: j ≈ จ(อ่อน) q ≈ ฉ(ลมแรง) x ≈ ซ/ชบาง ๆ — ใช้กับสระ i / ü เท่านั้น'],
 [/ü|เสียง ?u\b|ปากจู๋/i,'ü (เช่น nǚ, lǜ): ทำปากจู๋เหมือนจะออกเสียง “อู” แต่ออกเสียง “อี” — ลองพูด “อี” แล้วค่อย ๆ ห่อปาก'],
 [/\br\b|เสียง r|ร /,'r (เช่น rén): ไม่ใช่ ร เรือไทยรัวลิ้น ให้ม้วนลิ้นเบา ๆ แล้วเปล่งเสียงคล้าย “ฌ/ร” ผสมกัน ไม่รัว'],
 [/ng|an|ang|ตัวสะกด/i,'ตัวสะกด -n กับ -ng: an ปลายลิ้นแตะเหงือกบน (เหมือน “อัน”) · ang เสียงจากลำคอ (เหมือน “อัง”) — ฟังคู่ ban/bang ให้แยกให้ได้'],
 [/เสียง ?3|เสียงสาม|tone ?3/i,'เสียง 3 (ˇ): ในประโยคจริงมักออกเสียงแค่ “ต่ำลง” และถ้ามีเสียง 3 ติดกัน พยางค์แรกกลายเป็นเสียง 2 เช่น 你好 → ní hǎo'],
 [/ลมออก|aspirat|เสียง ?p\b/i,'p t k: ปล่อยลมแรงออกมา (ลองถือกระดาษหน้าปากให้ขยับ) · b d g: ลมน้อยคล้าย ป ต ก ไทย']];
const zhsOnly=t=>[...String(t)].filter(c=>/[\u4e00-\u9fff]/.test(c)).join('');
function tutorReplySim(m,ctx){m=(m||'').trim();const k=sh(m);
 if(!k)return {html:'พิมพ์คำถามมาได้เลย หรือแตะปุ่มด้านล่าง'};
 for(const c of CORR)if(k.includes(c[0]))return {html:`เกือบถูกแล้ว! ลองแบบนี้นะ<br><b>${tzh(c[1].replace(/？|！/g,''))}</b> ${spkBtn(c[1].replace(/？|！/g,''))}<br>${c[2]}`,say:c[1]};
 if(/แก้|ตรวจ|ผิดไหม|ถูกไหม/.test(m))return {html:`ส่งประโยคจีนที่อยากให้ตรวจมาได้เลย — ติวเตอร์จำลองตรวจได้เฉพาะ ${CORR.length} แพตเทิร์นที่คนไทยพลาดบ่อย (ไม่ใช่ทุกประโยค) ลองพิมพ์ตัวอย่าง:`,chips:CORR.slice(0,6).map(c=>c[0])};
 if(/ออกเสียง|เสียงยาก|ลิ้น|อ่านไม่ออก|pronun|เสียงเปลี่ยน|เสียงเบา|เสียงกลาง|neutral/i.test(m)){const hit=PRON.filter(p=>p[0].test(m));return {html:(hit.length?hit:PRON.slice(0,3)).map(p=>p[1]).join('<br><br>')+'<br><span class="cap">* เทียบกับเสียงไทยแบบคร่าว ๆ เพื่อช่วยจำ ควรฟังเสียงจริงควบคู่ (กดปุ่มฟังในบทเรียน)</span>'}}
 if(/ไวยากรณ์|อธิบาย|ใช้ยังไง|ใช้อย่างไร|ต่างกัน|หมายถึง/.test(m)){const hit=GRAM.filter(g=>m.includes(g[0])).sort((a,b)=>b[0].length-a[0].length);if(hit.length)return {html:hit.slice(0,2).map(g=>g[1]).join('<br><br>'),chips:['ใช้ 是 ยังไง','ใช้ 了 ยังไง','ใช้ 在 ยังไง','ออกเสียง zh ch sh']}}
 if(GRAM.some(g=>g[0]===zhsOnly(m)))return {html:GRAM.find(g=>g[0]===zhsOnly(m))[1]};
 if(/วรรณยุกต์|เสียงสูงต่ำ|tone|เสียง ?[1-4]/i.test(m))return {html:`จีนกลางมี 4 เสียงหลัก + เสียงเบา:<br>${TONE_GUIDE.slice(0,4).map(t=>`<b>${t.name}</b>: ${t.thai}`).join('<br>')}<br><span class="cap">* เทียบกับเสียงไทยแบบคร่าว ๆ เท่านั้น</span>`,act:'tones'};
 if(/สนทนา|บทบาท|role|คุยกัน|ฝึกพูด/i.test(m))return {html:'มาเล่นบทบาทสมมติกัน! ฉันพูดก่อน คุณเลือกคำตอบที่เหมาะสม',act:'rp'};
 if(/สวัสดี|หวัดดี|hello|hi\b/i.test(m)){const w=wordBy('你好');return {html:`สวัสดีครับ! ภาษาจีนทักทายว่า <b>${tzh('你好','nǐ hǎo')}</b> ${spkBtn('你好')} ลองพูดตามดูนะ`,say:'你好'}}
 if(/ขอบคุณ/.test(m)){const w=wordBy('谢谢');if(w)return {html:tutorWordHtml(w)}}
 if(/ลา|บาย|ไปก่อน/.test(m)&&/จีน|พูด/.test(m)){const w=wordBy('再见');if(w)return {html:tutorWordHtml(w)}}
 if(/ขอประโยค|ตัวอย่างประโยค|แต่งประโยค|ประโยคตัวอย่าง/.test(m))return window.tutorSentence();
 if(/สุ่ม|คำศัพท์|ทวน|ขอคำ/.test(m)){const pool=gw4();const w=pool[Math.random()*pool.length|0];return {html:`คำสุ่มวันนี้!<br>${tutorWordHtml(w)}`}}
 const zhs=[...m].filter(c=>/[\u4e00-\u9fff]/.test(c)).join('');
 if(zhs){const ws=ALLW.filter(w=>zhs.includes(w.zh)||w.zh===zhs).sort((a,b)=>b.zh.length-a.zh.length);
  if(ws.length){return {html:(ws.length>1&&ws[0].zh!==zhs?`ในประโยคนี้มีคำที่เราเรียนไปแล้ว ${ws.length} คำ:<br>`:'')+ws.slice(0,2).map(tutorWordHtml).join('<hr style="border:0;border-top:.5px solid rgba(0,0,0,.1);margin:8px 0">')}}
  return {html:`<span style="display:block;width:72px;height:72px;margin-bottom:2px">${M('notfound')}</span>`+`คำนี้ยังไม่อยู่ในบทที่เรียนไปค่ะ/ครับ (ติวเตอร์จำลองรู้เฉพาะคำใน ${LESSONS.length} บทที่มีในแอป) ลองถามคำอื่น หรือพิมพ์ภาษาไทยของคำที่อยากรู้ เช่น “ขอบคุณ”`}}
 const hit=ALLW.filter(w=>w.th.split(/ ?\/ ?/).some(t=>t.length>=2&&m.includes(t.replace(/^(เป็น|คือ) ?/,''))));
 if(hit.length)return {html:`ภาษาจีนของ “${hit[0].th.split(' / ')[0]}” คือ<br>${tutorWordHtml(hit[0])}`};
 return {html:`<span style="display:block;width:72px;height:72px;margin-bottom:2px">${M('notfound')}</span>ตอนนี้ฉันเป็นติวเตอร์จำลอง ตอบได้เฉพาะ: อธิบายคำในบทที่เรียน · แก้ประโยค ${CORR.length} แพตเทิร์น · อธิบายไวยากรณ์พื้นฐาน · เคล็ดลับออกเสียงสำหรับคนไทย · เล่นบทบาทสมมติ · เรื่องวรรณยุกต์<br><span class="cap" style="font-size:12.5px">ยังไม่ได้เชื่อมกับระบบตอบอัตโนมัติจริง (ดูหน้า “อะไรจริง อะไรจำลอง”)</span>`}}

SC.tutor=()=>({title:'ติวเตอร์จำลอง',noRefresh:true,unmount(){stopAudio()},
 body:`<div class="tutorhd"><span class="tav">${M('teacher')}</span><span style="flex:1"><b>${MASCOT_NAME} · ติวเตอร์</b><br><span class="demo">ติวเตอร์จำลอง · ตอบจากกติกาที่เตรียมไว้</span></span></div>
 <div class="tchat" id="tc"></div>
 <div class="tchips" id="tchips"></div>
 <form class="tform" id="tf" autocomplete="off"><input id="ti" type="text" placeholder="พิมพ์คำจีน คำไทย หรือประโยคที่อยากตรวจ…" enterkeyhint="send" aria-label="ข้อความถึงติวเตอร์"><button class="tsend press" aria-label="ส่ง">↑</button></form>`,
 mount(el){const tc=$('#tc',el),chips=$('#tchips',el),ti=$('#ti',el);let rp=null,busy=false;
  const bub=(me,h)=>{tc.insertAdjacentHTML('beforeend',`<div class="tm ${me?'me':'bot'} fade-in">${me?'':`<span class="tav2">${M('teacher')}</span>`}<div class="tb">${h}</div></div>`);setTimeout(()=>{const sc=tc.closest('.scroller');if(sc)sc.scrollTop=sc.scrollHeight},30)};
  const setChips=a=>{chips.innerHTML=a.map(c=>`<button class="tchip press" data-q="${c}">${c}</button>`).join('')};
  const base=['ขอคำศัพท์สุ่ม','ลองสนทนา','แก้ประโยคให้หน่อย','ใช้ 了 ยังไง','ออกเสียง zh ch sh','วรรณยุกต์ยากจัง'];
  const typing=()=>{tc.insertAdjacentHTML('beforeend','<div class="tm bot" id="ty"><span class="tav2">'+M('think')+'</span><div class="tb"><span class="dots"><i></i><i></i><i></i></span></div></div>');const sc=tc.closest('.scroller');if(sc)sc.scrollTop=sc.scrollHeight};
  async function ask(t){if(busy)return;busy=true;bub(true,t.replace(/</g,'&lt;'));S.tutorN++;bumpCnt('tutor',1);save();vib(6);chips.innerHTML='';typing();
   const r=await TUTOR_ADAPTER(t,{});await new Promise(o=>setTimeout(o,650));$('#ty',tc)&&$('#ty',tc).remove();bub(false,r.html);if(r.say)setTimeout(()=>speak(r.say),400);
   if(r.act==='rp'){rpStart()}else{if(r.act==='tones')bub(false,`<button class="pill sm press" data-go="tones">เปิดหน้าวรรณยุกต์ + ฝึกฟัง</button>`);setChips(r.chips||base)}busy=false}
  function rpStart(){const ls=lvLessonPool().filter(l=>l.dlg&&l.dlg.length);const L=ls.length?ls[Math.random()*ls.length|0]:LESSONS[0];rp={L,k:0};bub(false,`ฉากจากบทที่ ${L.id} · ${L.th} — ฉันเป็นครู คุณเป็นนักเรียน`);setTimeout(rpNext,500)}
  function rpNext(){const {L,k}=rp;if(k>=L.dlg.length){const xp=10;addXp(xp);bub(false,`เก่งมาก! จบฉากแล้ว +${xp} XP 🎉`);rp=null;setChips(base);return}
   const d=L.dlg[k];if(d[0]==='t'){bub(false,`<span class="zh" style="font-size:19px">${zhHtml(d[1],d[2])}</span> ${spkBtn(d[1],'t','')}<br><span class="cap">${d[3]}</span>`);setTimeout(()=>speak(d[1],null,'t'),300);rp.k++;setTimeout(rpNext,900)}
   else{const wrong=shuffle(LESSONS.flatMap(l=>l.dlg.filter(x=>x[0]==='f'&&x[1]!==d[1]))).slice(0,2);const opts=shuffle([d,...wrong]);rp.ans=d;bub(false,'คุณจะตอบว่าอะไรดี? 👇');chips.innerHTML=opts.map(o=>`<button class="tchip rpo press" data-rp="${o[1]}"><span class="zh">${o[1]}</span><small>${o[3]}</small></button>`).join('')}}
  chips.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.rp!==undefined){if(!rp)return;const ok=b.dataset.rp===rp.ans[1];chips.innerHTML='';bub(true,`<span class="zh">${b.dataset.rp}</span>`);speak(b.dataset.rp,null,'f');
    if(ok){vib(12);bub(false,'ตอบได้เหมาะสมเลย ✓');rp.k++;setTimeout(rpNext,900)}else{vib([25,30,25]);bub(false,`ลองแบบนี้นะ: <span class="zh">${rp.ans[1]}</span> ${spkBtn(rp.ans[1],'f','')}<br><span class="cap">${rp.ans[3]}</span>`);rp.k++;setTimeout(rpNext,1600)}}
   else if(b.dataset.q)ask(b.dataset.q)};
  $('#tf',el).onsubmit=e=>{e.preventDefault();const v=ti.value.trim();if(!v)return;ti.value='';if(rp){bub(false,'ตอนนี้อยู่ในฉากสนทนา เลือกคำตอบจากปุ่มก่อนนะ');return}ask(v)};
  bub(false,`สวัสดี! ฉันคือ${MASCOT_NAME} ติวเตอร์ประจำตัวของคุณ 🦙<br>ถามคำที่เรียนมา ให้ตรวจประโยค หรือฝึกสนทนาได้เลย<br><span class="cap" style="font-size:12.5px">หน้านี้เป็นการจำลอง ตอบจากสคริปต์ที่เตรียมไว้ — ไม่ใช่ปัญญาประดิษฐ์จริง</span>`);setChips(base)}});

/* ---------- เรียนด้วยกัน (ห้องอ่านหนังสือจำลอง) ---------- */
SC.study=()=>({title:'เรียนด้วยกัน',noRefresh:true,body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M('read')}</div><div class="large" style="padding:0">ห้องอ่านหนังสือ</div><p style="color:var(--sub2);font-size:15px;margin:6px 14px 0">เปิดจับเวลาพร้อมเพื่อน ๆ — เห็นว่าใครกำลังตั้งใจอยู่ด้วยกัน มีแรงฮึดขึ้นเยอะ!</p></div>
 <div class="seg mt16" id="stg" style="margin:16px 20px 0">${[5,10,15].map((m,i)=>`<button data-m="${m}" class="${i===1?'on':''}">${m} นาที</button>`).join('')}</div>
 <div id="stb"></div>${DEMO}`,
 mount(el){let mins=10,timer=null,fast=false;const box=$('#stb',el);
  const ppl=[['พี่ต้น','#A25F3A'],['น้องมะลิ','#4B7D61'],['แพรว','#4C72A7']];
  const idle=()=>{box.innerHTML=`<div class="card pad2 mt16 center" style="margin:16px 20px 0"><div style="font-size:54px;font-weight:700;letter-spacing:1px" class="num">${String(mins).padStart(2,'0')}:00</div><div class="cap">รางวัลเมื่อครบ: +${mins*2} เหรียญ · +${mins} XP</div></div><div class="pad mt16"><button class="pill row1 press" id="go">เริ่มอ่านพร้อมเพื่อน</button></div><p class="cap center" style="padding:10px 30px 0">ใน LINE จริง เพื่อนจะเข้าห้องผ่านลิงก์ชวนในกลุ่ม · การเห็นว่าใครกำลังอ่านต้องมีเซิร์ฟเวอร์ ตอนนี้เพื่อนเป็นข้อมูลจำลอง</p>`;$('#go',el).onclick=start};
  function start(){let left=mins*60;const joined=[];vib(10);
   box.innerHTML=`<div class="card pad2 mt16 center" style="margin:16px 20px 0"><div style="font-size:64px;font-weight:700" class="num" id="tm">${mins}:00</div><div class="prog mt8"><i id="tp" style="width:0%"></i></div><div class="cap mt8" id="tn">กำลังรอเพื่อนเข้าห้อง…</div></div><div class="pbar mt16" id="pp"></div><div class="pad mt16"><button class="pill sm ghost press" id="gv">เลิกก่อน (ไม่ได้รางวัล)</button><button class="cap press" id="ff" style="display:block;margin:14px auto 0;text-decoration:underline;color:var(--sub)">เดโม: เร่งเวลา ×30</button></div>`;
   const draw=()=>{const m=Math.floor(left/60),s=left%60;$('#tm',el).textContent=`${m}:${String(s).padStart(2,'0')}`;$('#tp',el).style.width=(1-left/(mins*60))*100+'%'};
   $('#pp',el).innerHTML=`<div class="center" style="display:flex;justify-content:center;gap:14px"><span class="av big" style="background:var(--red)">${S.name[0]}</span>${ppl.map((p,i)=>`<span class="av big off" id="pf${i}" style="background:${p[1]}">${p[0].replace(/^(พี่|น้อง)/,'')[0]}</span>`).join('')}</div>`;
   ppl.forEach((p,i)=>setTimeout(()=>{if(!timer)return;$('#pf'+i,el)&&$('#pf'+i,el).classList.remove('off');joined.push(p[0]);$('#tn',el).textContent=`${joined.join(' · ')} กำลังอ่านอยู่ด้วย (จำลอง)`;toast(`${p[0]}เข้าห้องแล้ว`)},2200+i*3000));
   timer=setInterval(()=>{left-=fast?30:1;if(left<=0){clearInterval(timer);timer=null;fin()}else draw()},1000);
   $('#ff',el).onclick=()=>{fast=true;$('#ff',el).remove()};
   $('#gv',el).onclick=()=>{clearInterval(timer);timer=null;toast('เลิกก่อนแล้ว ไว้ลองใหม่นะ');idle()}}
  function fin(){S.studyN++;bumpCnt('study',1);addXp(mins,null,0);addCoins(mins*2);save();confetti(90);vib([20,30,20]);
   box.innerHTML=`<div class="center mt16"><div class="pop" style="width:160px;height:160px;margin:0 auto">${M('celebrate')}</div><div class="h2">อ่านครบ ${mins} นาที!</div><p class="cap">+${mins} XP · +${mins*2} เหรียญ</p></div><div class="pad mt16"><button class="pill row1 press" id="ag">อ่านอีกรอบ</button></div>`;$('#ag',el).onclick=idle}
  $$('[data-m]',el).forEach(b=>b.onclick=()=>{if(timer)return;mins=+b.dataset.m;$$('[data-m]',el).forEach(x=>x.classList.toggle('on',x===b));idle()});
  idle();this.stop=()=>clearInterval(timer)},unmount(){this.stop&&this.stop()}});

/* ---------- สรุปสัปดาห์ ---------- */
function recapData(){const t=today();let days=0,best=0,bd=0;for(let i=0;i<7;i++){const x=dayXp(t-i);if(x>0)days++;if(x>best){best=x;bd=i}}
 const acc=S.qAll?Math.round(S.qOk/S.qAll*100):0;return {xp:weekXp(),days,best,words:learnedCount(),streak:curStreak(),acc,mis:Object.keys(S.mistakes).length,cms:CLASSMATES.filter(cmUnlocked).length,bs:S.buddy?buddyStreak():0}}
SC.recap=()=>{const r=recapData();const line=r.days>=6?'สัปดาห์นี้คุณเทพมาก!':r.days>=3?'ทำได้ดีมาก ต่อเนื่องแบบนี้เลย':r.days>=1?'เริ่มต้นได้ดี สัปดาห์หน้าเพิ่มอีกวันนะ':'สัปดาห์นี้ยังไม่ได้เรียน เริ่มวันนี้ก็ยังทัน';
 const spec={badge:'สรุปสัปดาห์',title:line,sub:`เรียนไป ${r.days}/7 วัน · ${r.words} คำ`,mascot:r.days>=5?'trophy':r.days>=2?'thumbs':'cheer',tint:'#EAF1FB',accent:'#3E6FB0',stats:[[r.xp+'','XP สัปดาห์นี้'],[r.streak+'','วันสตรีค'],[r.acc+'%','ตอบถูก']],ctaLabel:'ลองเรียนด้วยกัน'};
 S.recapDay=today();save();
 return {title:'สรุปสัปดาห์',body:`<div class="center" style="padding:6px 20px 0"><div class="pop" style="width:200px;height:200px;margin:0 auto">${M(spec.mascot)}</div><div class="large" style="padding:0">สรุป 7 วันที่ผ่านมา</div><p style="color:var(--sub2);font-size:15.5px;margin:4px 14px 0">${line}</p></div>
 <div class="stat mt16"><div><b style="color:var(--red)">${r.xp}</b><small>XP</small></div><div><b>${r.days}/7</b><small>วันที่เรียน</small></div><div><b>${r.words}</b><small>คำที่เรียน</small></div></div>
 <div class="group mt16">${[['🔥','สตรีคปัจจุบัน',r.streak+' วัน'],['🎯','ตอบถูกรวม',S.qAll?r.acc+'% ('+S.qOk+'/'+S.qAll+')':'—'],['📝','คำที่ควรทวน',r.mis+' คำ'],['🤝','สตรีคบัดดี้',S.buddy?r.bs+' วัน':'ยังไม่มีบัดดี้'],['🏫','เพื่อนร่วมห้อง',r.cms+'/'+CLASSMATES.length+' คน'],['⭐','วันที่ XP สูงสุด',r.best?r.best+' XP':'—']].map(x=>`<div class="row" style="min-height:52px"><span class="ic" style="background:#F8F3EC">${x[0]}</span><span class="tx"><b style="font-weight:500">${x[1]}</b></span><span class="val" style="color:var(--ink);font-weight:600">${x[2]}</span></div>`).join('')}</div>
 <div class="dock"><button class="pill linebtn press" id="rs"><b>แชร์สรุปไป LINE</b></button></div>`,
 mount(el){$('#rs',el).onclick=()=>shareSheet('recap',{recap:spec})}}};
/* ───── เพิ่มไวยากรณ์ระดับกลาง + แพตเทิร์นแก้ประโยค (ติวเตอร์จำลองแบบกฎ ไม่ใช่ AI จริง) ───── */
CORR.push(
 ['我比你很高','我比你高','ประโยคเปรียบเทียบด้วย 比 ไม่ใส่ 很 หน้าคำคุณศัพท์: 我比你高 (ฉันสูงกว่าเธอ) · ถ้าจะเน้นมากกว่าเดิม ใช้ 高多了/高一点儿'],
 ['他比我不高','他没有我高','ปฏิเสธประโยค 比 ไม่ใช้ 不 ไว้หน้าคำคุณศัพท์ ให้ใช้ 没有: 他没有我高 (เขาไม่สูงเท่าฉัน) หรือ 他不比我高'],
 ['因为我累但是','因为我累，所以我想睡觉','คู่ที่เข้ากับ 因为 (เพราะ) คือ 所以 (ดังนั้น) ส่วน 但是 (แต่) ใช้คู่กับ 虽然: 因为…所以… / 虽然…但是…'],
 ['虽然很累所以','虽然很累，但是很开心','虽然 (แม้ว่า) คู่กับ 但是/可是 (แต่): 虽然…但是… ไม่ใช้ 所以'],
 ['我没会','我不会','“会” (เป็น/ทำได้) ปฏิเสธด้วย 不: 我不会游泳 ส่วน 没 ใช้กับ 有 และเหตุการณ์ที่ยังไม่เกิดขึ้น'],
 ['我没去过了','我没去过','ประโยคปฏิเสธประสบการณ์ ใช้ 没 + กริยา + 过 และไม่ใส่ 了 ท้ายประโยค: 我没去过中国'],
 ['我有去过','我去过','บอกประสบการณ์ ใช้ กริยา + 过 ได้เลย ไม่ต้องมี 有: 我去过泰国 (ฉันเคยไปไทย)'],
 ['我正在吃饭了','我正在吃饭','正在 (กำลัง) บอกการกระทำที่ดำเนินอยู่ ไม่ใส่ 了 ท้ายประโยค: 我正在吃饭'],
 ['你要喝茶还是咖啡吗','你要喝茶还是咖啡？','还是 (หรือ) ใช้ในประโยคคำถามเลือกหนึ่งในหลายตัวเลือก ไม่ต้องเติม 吗: 你喝茶还是咖啡？'],
 ['我来从北京','我从北京来','บอกจุดเริ่มต้นด้วย 从 + สถานที่ วางไว้หน้ากริยา: 我从北京来 (ฉันมาจากปักกิ่ง)'],
 ['我给一本书他','我给他一本书','กริยาที่ให้ของ (给) เรียงเป็น ให้ + ผู้รับ + ของ: 我给他一本书 (ฉันให้หนังสือเขาเล่มหนึ่ง)'],
 ['非常很','我非常喜欢','非常 (มาก) กับ 很 เป็นคำบอกระดับเหมือนกัน ใช้อย่างใดอย่างหนึ่งพอ ไม่ใช้พร้อมกัน: 非常好 / 很好'],
 ['很多的人','很多人','หลัง 很多 ไม่ต้องมี 的 เมื่อขยายคำนาม: 很多人 (คนมากมาย) 很多书 (หนังสือมากมาย)'],
 ['你有吃饭吗','你吃饭了吗？','ถามว่ากินข้าวหรือยังใช้ 了 ไม่ใช่ 有: 你吃饭了吗？ ถ้าจะตอบว่ายัง พูด 还没（吃）'],
 ['把书我放','我把书放在桌子上','ประโยค 把 ประธานต้องมาก่อน: ประธาน + 把 + ของ + กริยา + ผล เช่น 我把书放在桌子上'],
 ['说中文得好','他中文说得很好','ถ้ากริยามีกรรม ให้ซ้ำกริยาก่อน 得: 他说中文说得很好 หรือย้ายกรรมขึ้นหน้า: 他中文说得很好'],
 ['我不要去了','我不想去了','ถ้าต้องการบอกว่าไม่อยากทำอะไร ใช้ 不想 (ไม่อยาก) · 不要 หมายถึง “อย่า/ไม่เอา” จะแข็งกว่า'],
 ['谢谢你的帮忙很','谢谢你的帮助','บอกว่าขอบคุณที่ช่วย ใช้ 谢谢你的帮助 (หรือ 谢谢你帮我) ไม่ต้องวาง 很 ท้ายประโยค'],
 ['我昨天去学校了在','我昨天在学校','จะบอกว่า “เมื่อวานอยู่ที่โรงเรียน” ใช้ 在 + สถานที่ ไม่ต้องใส่ 去…了'],
 ['比较很','比较好','比较 (ค่อนข้าง) เป็นคำบอกระดับ ใช้แทน 很 ไม่ใช้ซ้อนกัน: 比较好 (ค่อนข้างดี)'],
 ['我刚才吃饭了没有','我刚吃过饭','刚 / 刚才 (เมื่อครู่) บอกเวลาที่เพิ่งผ่านไป: 我刚吃过饭 · ถามว่า “กินหรือยัง” ใช้ 你吃了吗？']);
GRAM.push(
 ['过','“过” (guo) ท้ายกริยา = เคยทำ เช่น 我去过中国 · ปฏิเสธด้วย 没…过: 我没去过 · ไม่ใช่ “ผ่านไป” เสมอไป'],
 ['比','“比” (bǐ) = เทียบกว่า ใช้รูป A + 比 + B + คำคุณศัพท์ เช่น 我比你高 · ห้ามใส่ 很 · ปฏิเสธ A没有B+คุณศัพท์'],
 ['因为','“因为…所以…” (yīnwèi…suǒyǐ) = เพราะ…จึง… เช่น 因为下雨，所以我不去 · ในภาษาจีนมักพูดทั้งสองคำคู่กัน'],
 ['所以','“所以” (suǒyǐ) = ดังนั้น/จึง เช่น 我累了，所以想睡觉 · คู่กับ 因为 ได้'],
 ['虽然','“虽然…但是…” (suīrán…dànshì) = แม้ว่า…แต่… เช่น 虽然很累，但是很开心 · ต่างจากไทยที่ใช้ “แม้…แต่” คล้ายกัน'],
 ['但是','“但是” (dànshì) = แต่ เช่น 我想去，但是没有钱 · ใกล้เคียงกับ 可是 (kěshì) ที่เป็นภาษาพูดกว่า'],
 ['一点儿','“一点儿” (yìdiǎnr) = นิดหน่อย วางหลังคุณศัพท์ในประโยคขอ/เปรียบเทียบ เช่น 便宜一点儿 (ลดหน่อย) · 有点儿 วางหน้าคุณศัพท์ มักบอกความไม่ชอบใจ'],
 ['有点','“有点儿” (yǒudiǎnr) = ค่อนข้าง… (มักไม่พอใจ) วางหน้าคำคุณศัพท์ เช่น 有点贵 (แพงไปหน่อย) · ต่างจาก 一点儿 ที่วางหลัง'],
 ['正在','“正在” (zhèngzài) = กำลัง… เช่น 我正在学习 · ไม่ใส่ 了 ท้ายประโยค · ย่อเป็น 在 หรือ 正 ก็ได้'],
 ['还是','“还是” (háishi) = หรือ (ในคำถามเลือก) เช่น 你喝茶还是咖啡？ · ส่วน 或者 (huòzhě) ใช้ในประโยคบอกเล่า'],
 ['或者','“或者” (huòzhě) = หรือ (ในประโยคบอกเล่า) เช่น 我想喝茶或者咖啡 · ถ้าเป็นคำถามเลือก ใช้ 还是'],
 ['让','“让” (ràng) = ให้/ยอมให้/ทำให้ เช่น 妈妈让我早点睡 (แม่ให้ฉันนอนเร็ว) · 让我想想 (ขอฉันคิดก่อน)'],
 ['可以','“可以” (kěyǐ) = ได้/อนุญาต เช่น 我可以坐这里吗？ · ถามขออนุญาตใช้บ่อย · ต่างจาก 会 (เป็น) และ 能 (สามารถ)'],
 ['能','“能” (néng) = สามารถ (มีความสามารถ/เงื่อนไขเอื้อ) เช่น 我今天不能去 (วันนี้ไปไม่ได้) · 会=เรียนมา 能=เงื่อนไขอำนวย 可以=ได้รับอนุญาต'],
 ['先','“先…再…” (xiān…zài) = ก่อน…แล้วค่อย… เช่น 先吃饭，再看书 · ลำดับเหตุการณ์ในอนาคต'],
 ['再','“再” (zài) = อีกครั้ง (ยังไม่เกิด) เช่น 请再说一遍 · เทียบกับ 又 (yòu) ที่ใช้กับสิ่งที่เกิดซ้ำไปแล้ว'],
 ['又','“又” (yòu) = อีกแล้ว (เกิดซ้ำไปแล้ว) เช่น 他又迟到了 (เขามาสายอีกแล้ว) · ต่างจาก 再 ที่เป็นอนาคต'],
 ['离','“离” (lí) = ห่างจาก เช่น 我家离学校很近 (บ้านฉันอยู่ใกล้โรงเรียน) · บอกระยะทางจากจุดหนึ่งถึงอีกจุด'],
 ['从','“从…到…” (cóng…dào) = จาก…ถึง เช่น 从家到学校 · 从 บอกจุดเริ่มต้น เช่น 我从泰国来'],
 ['一边','“一边…一边…” (yìbiān…yìbiān) = ทำ…ไปพลาง…ไปพลาง เช่น 他一边吃饭一边看手机'],
 ['如果','“如果…就…” (rúguǒ…jiù) = ถ้า…ก็… เช่น 如果下雨，我就不去 · ภาษาพูดใช้ 要是 ก็ได้'],
 ['只要','“只要…就…” (zhǐyào…jiù) = แค่…ก็… เช่น 只要努力，就会成功 · ไม่ใช่เงื่อนไขเข้มอย่าง 只有…才…'],
 ['只有','“只有…才…” (zhǐyǒu…cái) = ต้อง…เท่านั้นถึงจะ… เช่น 只有多练习，才能说得好 · เงื่อนไขเข้มกว่า 只要'],
 ['无论','“无论…都…” (wúlùn…dōu) = ไม่ว่า…ก็… เช่น 无论天气怎么样，我都去'],
 ['把','“把” (bǎ) ย้ายกรรมขึ้นมาก่อนกริยาเมื่อจัดการกับสิ่งนั้น เช่น 我把书放在桌子上 · กริยาต้องมีผล/ส่วนเสริม ไม่ใช้คำเดี่ยว ๆ'],
 ['被','“被” (bèi) = ถูก… เช่น 我的手机被偷了 (โทรศัพท์ฉันถูกขโมย) · ใช้บ่อยกับเรื่องที่ไม่ค่อยดี'],
 ['得','“得” (de) เชื่อมกริยากับระดับ/ผล เช่น 他说得很好 (เขาพูดดี) · ถ้ามีกรรม ให้ซ้ำกริยา: 他说中文说得很好'],
 ['着','“着” (zhe) ท้ายกริยา = สภาพที่คงอยู่ เช่น 门开着 (ประตูเปิดอยู่) · 坐着 (นั่งอยู่)'],
 ['才','“才” (cái) = เพิ่งจะ/กว่าจะ (ช้าหรือน้อยกว่าที่คิด) เช่น 他十点才来 (เขามาตั้งสิบโมงถึงมา) · ต่างจาก 就 (เร็ว)'],
 ['就','“就” (jiù) = ก็/ทันที (เร็วกว่าที่คิด) เช่น 他八点就来了 (เขามาตั้งแต่แปดโมง) · ใช้เชื่อมเงื่อนไขในประโยค 如果…就…'],
 ['还','“还” (hái) = ยัง/อีกด้วย เช่น 他还没来 (เขายังไม่มา) · 我还想吃 (ฉันยังอยากกินอีก)'],
 ['刚','“刚” (gāng) = เพิ่ง… เช่น 我刚到 (ฉันเพิ่งถึง) · ใช้หน้ากริยา ไม่ใช้กับเวลาชัดเจน'],
 ['已经','“已经” (yǐjīng) = …แล้ว วางหน้ากริยา ท้ายประโยคมักมี 了 เช่น 我已经吃了'],
 ['对','“对” (duì) = ถูก · หรือ 对…感兴趣 = สนใจ… เช่น 我对中文很感兴趣 · 对 + คน + 很好 = ดีกับ…'],
 ['给','“给” (gěi) = ให้ หรือ “ให้/เพื่อ” เช่น 我给你一本书 · 我给妈妈打电话 (ฉันโทรหาแม่)'],
 ['跟','“跟” (gēn) = กับ/ตาม เช่น 我跟朋友去 (ฉันไปกับเพื่อน) · 跟我来 (ตามฉันมา)'],
 ['更','“更” (gèng) = ยิ่ง…กว่า เช่น 今天更冷 · ใช้เมื่อเทียบสองสิ่ง ไม่ต้องมี 比 ก็ได้ถ้าเทียบกับก่อนหน้า'],
 ['最','“最” (zuì) = ที่สุด เช่น 我最喜欢茶 · 最近 = ช่วงนี้ · 最后 = สุดท้าย'],
 ['别','“别” (bié) = อย่า… เช่น 别担心 (อย่ากังวล) · 别说话 (อย่าพูด) · ใกล้เคียง 不要'],
 ['一起','“一起” (yìqǐ) = ด้วยกัน เช่น 我们一起去吧 · วางหน้ากริยา'],
 ['而且','“不但…而且…” (búdàn…érqiě) = ไม่เพียง…แต่ยัง… เช่น 他不但聪明，而且努力'],
 ['然后','“然后” (ránhòu) = แล้วหลังจากนั้น เช่น 我先吃饭，然后去学校'],
 ['以前','“以前” (yǐqián) = ก่อนหน้า/ในอดีต · 以后 (yǐhòu) = หลังจากนี้ · 的时候 = ตอนที่… เช่น 小的时候 (ตอนเด็ก)'],
 ['以后','“以后” (yǐhòu) = หลังจากนี้ เช่น 以后见 · 下班以后 = หลังเลิกงาน · ตรงข้ามกับ 以前'],
 ['的时候','“…的时候” (de shíhou) = ตอนที่… เช่น 我小的时候 (ตอนฉันเด็ก) · 吃饭的时候 (ตอนกินข้าว)'],
 ['快','“快…了” / “就要…了” (kuài…le) = กำลังจะ… เช่น 快到了 (ใกล้ถึงแล้ว) · 就要下雨了 (ฝนจะตกแล้ว)'],
 ['比较','“比较” (bǐjiào) = ค่อนข้าง เช่น 比较好 · เป็นคำบอกระดับ ไม่ต้องใส่ 很 ซ้อน'],
 ['一点','“一点儿” (yìdiǎnr) = นิดหน่อย เช่น 少一点 (น้อยลงหน่อย) · อย่าสับสนกับ 一点 = หนึ่งนาฬิกา']);
PRON.push(
 [/ie|üe|ian|ยาน|เยน/i,'ian ไม่ได้อ่าน “อี-อัน” แต่เป็น “เยน” (เช่น tiān ≈ เทียน แต่สั้นกว่า) · ie = “เย” · üe = “ยเว” (ปากจู๋เหมือนอ่าน ü)'],
 [/iu|ui|un|ตัวย่อ/i,'iu = iou (เช่น jiǔ ≈ จิ-โอว) · ui = uei (เช่น huí ≈ ฮเว-ย) · un = uen (เช่น kùn ≈ คเวิน) — จีนเขียนย่อ แต่ออกเสียงเต็ม'],
 [/ao|ou|ei|ai|สระผสม/i,'ai ≈ ไอ · ei ≈ เอ-ย (เหมือน “เฮ้ย”) · ao ≈ อาว · ou ≈ โอว — สระผสมออกเสียงลื่นเป็นพยางค์เดียว'],
 [/เสียง ?e\b|ตัว e|เออ/i,'e (เช่น hē, kě): ไม่ใช่ “เอ” แต่เป็น “เออ” ที่ปากไม่ห่อ ออกเสียงลึกในลำคอ ใกล้ “เออะ” ของไทย · ในพยางค์ ie/ei/ye จะเป็น “เอ”'],
 [/\bc\b|เสียง c|ทส/i,'c (เช่น cài): เสียง “ทซ” ปล่อยลมแรง (ต่างจาก z ที่ลมน้อย) · วางลิ้นที่ฟันหน้าเหมือน s แต่ระเบิดลมก่อน'],
 [/เสียงเบา|เสียงกลาง|neutral|พยางค์เบา/i,'เสียงเบา (ไม่มีเครื่องหมาย) เช่น māma, xièxie: ออกเสียงสั้นและเบา ระดับเสียงขึ้นกับพยางค์ก่อนหน้า'],
 [/一|เปลี่ยนเสียง|bu4|不.{0,2}เสียง/,'เสียงเปลี่ยนของ 一 และ 不: 不 bù + เสียง 4 → bú (不是 bú shì) · 一 yī + เสียง 4 → yí (一个 yí gè) · 一 + เสียง 1/2/3 → yì (一天 yì tiān)'],
 [/er\b|เออร์|ลิ้นม้วนท้าย|儿化/i,'er และเสียงลงท้าย 儿 (r): ม้วนลิ้นท้ายคำเบา ๆ เช่น 一点儿 (yìdiǎnr) · 儿化 พบบ่อยในสำเนียงปักกิ่ง ในมาตรฐานไม่ต้องออกก็เข้าใจได้']);
/* ขอประโยคตัวอย่างจากบทที่เรียนไปแล้ว */
window.tutorSentence=function(){const pool0=lvLessonPool().filter(l=>l.sents&&l.sents.length),pool=pool0.length?pool0:[LESSONS[0]],L=pool[Math.random()*pool.length|0],s=L.sents[Math.random()*L.sents.length|0],zh=s[0].replace(/\//g,''),py=s[1].replace(/\//g,' ');
 return {html:`ประโยคตัวอย่างจากบท “${L.th}”<br><b>${tzh(zh,py)}</b> ${spkBtn(zh)}<br><span style="color:var(--sub2)">${s[2]}</span>`,say:zh}};
