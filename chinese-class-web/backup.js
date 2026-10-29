/* สำรองความก้าวหน้าข้ามเครื่อง — ทำทั้งหมดในเครื่อง: ส่งออก/นำเข้าไฟล์ .json หรือ "รหัสสำรอง" (ข้อความ) ไม่ส่งข้อมูลไปที่ใด ไม่ต้องมีบัญชี (ซิงก์ผ่าน LINE อยู่ใน sync.js แยกต่างหาก) */
(function(){
const PFX='lama-',SKIP=/^lama-(ver-reload|undo-import|backup-meta|art-|stk-)/;
const MAXB=3e6;
function bkKeys(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf(PFX)===0&&!SKIP.test(k))o[k]=localStorage.getItem(k)}return o}
function bkPack(){return {app:'lama-cn',fmt:1,ver:window.APP_VER||'',t:new Date().toISOString(),keys:bkKeys()}}
function bkMain(o){try{return JSON.parse(o.keys[KEY]||'{}')}catch(e){return null}}
function bkSummary(o){const m=bkMain(o)||{};return {xp:m.xp||0,streak:m.streak||0,coins:m.coins||0,parts:(m.parts||[]).length,words:Object.keys(m.srs||{}).length,when:o.t?o.t.slice(0,10):'?'}}
function bkValidate(o){if(!o||typeof o!=='object'||o.app!=='lama-cn'||o.fmt!==1||!o.keys||typeof o.keys!=='object')return 'ไม่ใช่ไฟล์สำรองของแอปนี้';
 const ks=Object.keys(o.keys);if(!ks.length)return 'ไฟล์ว่าง';
 for(const k of ks){if(k.indexOf(PFX)!==0||SKIP.test(k)||typeof o.keys[k]!=='string')return 'ข้อมูลในไฟล์ไม่ถูกต้อง ('+k.slice(0,30)+')'}
 if(o.keys[KEY]===undefined)return 'ไม่พบความก้าวหน้าหลักในไฟล์';
 let m;try{m=JSON.parse(o.keys[KEY])}catch(e){return 'ข้อมูลความก้าวหน้าเสียหาย'}if(!m||typeof m!=='object'||Array.isArray(m))return 'ข้อมูลความก้าวหน้าเสียหาย';return ''}
/* รหัสสำรอง: LAMA1:<base64url ของ JSON ที่บีบอัดด้วย deflate> · ถ้าเบราว์เซอร์ไม่มี CompressionStream ใช้ LAMA0: (ไม่บีบอัด) */
const b64=u=>{let s='';u.forEach(b=>s+=String.fromCharCode(b));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const unb64=t=>{t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const s=atob(t),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u};
async function pipe(u8,Ctor,mode){const cs=new Ctor(mode);const w=cs.writable.getWriter();w.write(u8);w.close();return new Uint8Array(await new Response(cs.readable).arrayBuffer())}
async function bkEncode(o){const u=new TextEncoder().encode(JSON.stringify(o));
 if(window.CompressionStream){try{return 'LAMA1:'+b64(await pipe(u,CompressionStream,'deflate'))}catch(e){}}return 'LAMA0:'+b64(u)}
async function bkDecode(t){t=String(t||'').replace(/\s+/g,'');const m=/^LAMA([01]):([A-Za-z0-9_-]+)$/.exec(t);if(!m)throw new Error('รหัสไม่ถูกต้อง ต้องขึ้นต้นด้วย LAMA1:');
 let u=unb64(m[2]);if(m[1]==='1'){if(!window.DecompressionStream)throw new Error('เบราว์เซอร์นี้อ่านรหัสบีบอัดไม่ได้ ใช้ไฟล์แทน');u=await pipe(u,DecompressionStream,'deflate')}
 if(u.length>MAXB)throw new Error('ข้อมูลใหญ่เกินไป');return JSON.parse(new TextDecoder().decode(u))}
function bkApply(o){const err=bkValidate(o);if(err)throw new Error(err);
 try{localStorage.setItem('lama-undo-import',JSON.stringify(bkPack()))}catch(e){}
 const cur=bkKeys();Object.keys(cur).forEach(k=>localStorage.removeItem(k));Object.keys(o.keys).forEach(k=>localStorage.setItem(k,o.keys[k]))}
function bkMeta(){try{return JSON.parse(localStorage.getItem('lama-backup-meta')||'{}')}catch(e){return{}}}
function bkMark(){try{localStorage.setItem('lama-backup-meta',JSON.stringify({t:Date.now()}))}catch(e){}}
window.BK={pack:bkPack,validate:bkValidate,encode:bkEncode,decode:bkDecode,apply:bkApply,summary:bkSummary};
const fmtD=t=>{const d=new Date(t);return d.getDate()+'/'+(d.getMonth()+1)+'/'+(d.getFullYear()+543)};
function bkAsk(o,how){const s=bkSummary(o);
 if(!confirm('นำเข้าความก้าวหน้าจาก'+how+'?\n\nข้อมูลในไฟล์ (สำรองเมื่อ '+s.when+'): XP '+s.xp+' · สตรีค '+s.streak+' · เหรียญ '+s.coins+' · บทที่ผ่าน '+s.parts+'\n\nข้อมูลในเครื่องนี้จะถูกแทนที่ (เก็บสำเนาไว้ให้กด “ย้อนการนำเข้า” ได้ 1 ครั้ง)'))return false;
 bkApply(o);toast('นำเข้าแล้ว กำลังเปิดใหม่…');setTimeout(()=>{location.href=location.pathname},700);return true}
SC.backup=()=>{const m=bkMeta(),has=!!localStorage.getItem('lama-undo-import');
 return {title:'สำรองความก้าวหน้า',body:`<div class="large">สำรอง / ย้ายเครื่อง</div>
 <div class="card pad2" style="margin:0 20px 12px;font-size:14.5px;line-height:1.6">ความก้าวหน้า เหรียญ สตรีค และข้อมูลฝึกเขียน เก็บอยู่ใน <b>เครื่องนี้เท่านั้น</b> — ถ้าล้างเบราว์เซอร์หรือเปลี่ยนมือถือจะหาย ใช้ไฟล์หรือรหัสด้านล่างย้ายไปเครื่องใหม่ได้ <b>ไม่ต้องสมัครบัญชี และไฟล์/รหัสสำรองไม่ถูกส่งไปที่ใด</b>${m.t?`<br><small class="cap">สำรองไฟล์ล่าสุด: ${fmtD(m.t)}</small>`:'<br><small class="cap">ยังไม่เคยสำรอง</small>'}</div>
 <div class="group">
  <button class="row press" id="bkexp"><span class="ic" style="background:#EAF1FB">💾</span><span class="tx"><b>ส่งออกเป็นไฟล์</b><small>ได้ไฟล์ .json เก็บไว้ในเครื่อง/ส่งหาตัวเองใน LINE Keep</small></span>${CHEV}</button>
  <button class="row press" id="bkimp"><span class="ic" style="background:#E7F8EE">📂</span><span class="tx"><b>นำเข้าจากไฟล์</b><small>เลือกไฟล์ที่เคยส่งออก · แทนที่ข้อมูลในเครื่องนี้</small></span>${CHEV}</button>
  ${has?`<button class="row press" id="bkundo"><span class="ic" style="background:#FDECEC">↩️</span><span class="tx"><b>ย้อนการนำเข้าครั้งล่าสุด</b><small>กลับไปเป็นข้อมูลก่อนนำเข้า</small></span>${CHEV}</button>`:''}</div>
 <input type="file" id="bkfile" accept=".json,application/json" style="display:none">
 <div class="sec">รหัสสำรอง (ข้อความ)</div>
 <div class="card pad2" style="margin:0 20px 12px"><div style="font-size:14px;color:var(--sub2);line-height:1.5;margin-bottom:8px">คัดลอกรหัสไปวางในโน้ต/แชตของตัวเอง แล้ววางที่เครื่องใหม่ · รหัสยาวหลายร้อยตัวอักษร ใครได้รหัสก็เห็นความก้าวหน้าของคุณ เก็บไว้เป็นส่วนตัว</div>
  <textarea id="bkcode" rows="4" spellcheck="false" autocomplete="off" aria-label="รหัสสำรอง" placeholder="กด “สร้างรหัส” หรือวางรหัสที่ขึ้นต้นด้วย LAMA1: ที่นี่" style="width:100%;box-sizing:border-box;border:1px solid var(--line,#ddd);border-radius:12px;padding:10px;font:16px/1.4 ui-monospace,monospace;resize:vertical"></textarea>
  <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="pill sm ghost press" id="bkgen" style="flex:1;min-width:110px">สร้างรหัส</button><button class="pill sm ghost press" id="bkcopy" style="flex:1;min-width:110px">คัดลอก</button><button class="pill sm press" id="bkuse" style="flex:1;min-width:110px">นำเข้าจากรหัส</button></div>
  <div class="cap" id="bkmsg" role="status" style="margin-top:8px;min-height:18px"></div></div>
 <div class="sec">แผนในอนาคต (ยังไม่ได้ทำ)</div>
 <div class="card pad2" style="margin:0 20px 12px;font-size:14px;line-height:1.6">เข้าสู่ระบบด้วย LINE (ไม่บังคับ) เพื่อซิงก์อัตโนมัติ: ระบบจะเก็บรหัสผู้ใช้ LINE และความคืบหน้าไว้บนเซิร์ฟเวอร์คลาวด์ (Supabase ภูมิภาคสิงคโปร์) ลบได้ที่ “ฉัน” → “ลบข้อมูลบนคลาวด์” · ขณะนี้อยู่ระหว่างทดสอบ ไฟล์และรหัสสำรองด้านบนใช้ได้ตามปกติโดยไม่ต้องเข้าสู่ระบบ</div>`,
 mount(el){const q=s=>el.querySelector(s),msg=t=>{q('#bkmsg').textContent=t};
  q('#bkexp').onclick=()=>{const o=bkPack(),s=JSON.stringify(o);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'application/json'}));const d=new Date();a.download='lama-backup-'+d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);bkMark();toast('บันทึกไฟล์สำรองแล้ว ('+Math.max(1,Math.round(s.length/1024))+' KB)')};
  q('#bkimp').onclick=()=>q('#bkfile').click();
  q('#bkfile').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;if(f.size>MAXB){toast('ไฟล์ใหญ่เกินไป');return}try{const o=JSON.parse(await f.text());const er=bkValidate(o);if(er){toast(er);return}bkAsk(o,'ไฟล์ '+f.name)}catch(x){toast('อ่านไฟล์ไม่ได้ — ต้องเป็นไฟล์ที่ส่งออกจากแอปนี้')}};
  q('#bkgen').onclick=async()=>{try{const c=await bkEncode(bkPack());q('#bkcode').value=c;bkMark();msg('สร้างรหัสแล้ว ('+c.length+' ตัวอักษร) · กด “คัดลอก”')}catch(x){msg('สร้างรหัสไม่สำเร็จ ใช้ไฟล์แทน')}};
  q('#bkcopy').onclick=async()=>{const t=q('#bkcode').value.trim();if(!t){msg('ยังไม่มีรหัส กด “สร้างรหัส” ก่อน');return}try{await navigator.clipboard.writeText(t);msg('คัดลอกแล้ว ✓')}catch(x){q('#bkcode').select();msg('เลือกข้อความแล้ว · กดคัดลอกจากเมนูของเครื่อง')}};
  q('#bkuse').onclick=async()=>{const t=q('#bkcode').value.trim();if(!t){msg('วางรหัสในช่องก่อน');return}try{const o=await bkDecode(t);const er=bkValidate(o);if(er){msg(er);return}bkAsk(o,'รหัสสำรอง')}catch(x){msg(x.message||'รหัสไม่ถูกต้อง')}};
  const u=q('#bkundo');if(u)u.onclick=()=>{try{const o=JSON.parse(localStorage.getItem('lama-undo-import'));if(confirm('ย้อนกลับไปเป็นข้อมูลก่อนนำเข้าครั้งล่าสุด?')){bkApply(o);localStorage.removeItem('lama-undo-import');toast('ย้อนแล้ว กำลังเปิดใหม่…');setTimeout(()=>{location.href=location.pathname},700)}}catch(x){toast('ย้อนไม่ได้')}}}}};
Object.assign(window.GOX,{backup(){push('backup',{})}});
})();
