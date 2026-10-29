#!/usr/bin/env node
/* สร้างไฟล์ที่ต้องมีค่าตายตัว (title / meta / OG / manifest / viewport / หน้า privacy+terms) จาก config.js ที่เดียว
   ใช้: node build.js   (แก้ค่าใน config.js แล้วรันครั้งเดียว)
   หมายเหตุ: ต้องรันหลัง zoom-fix/apply.py ทุกครั้ง เพราะสคริปต์นั้นใส่ no-zoom กลับเข้ามา — โปรเจกต์นี้ตั้งใจให้ซูมด้วยนิ้วได้ (การเข้าถึง) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const D=__dirname,rd=f=>fs.readFileSync(path.join(D,f),'utf8'),wr=(f,t)=>fs.writeFileSync(path.join(D,f),t);
const cfg=vm.runInNewContext(rd('config.js')+';({BRAND_NAME,BRAND_SHORT,MASCOT_NAME,OA_ID,OA_URL,PROVIDER_NAME,PROVIDER_CONTACT,SITE_URL,OG_IMAGE,POLICY_DATE})');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const VP='<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">';
const title=`${cfg.BRAND_NAME} — ตัวอย่างทดลอง`;
const desc=`ตัวอย่างทดลองเว็บเรียนภาษาจีนสำหรับคนไทย ${cfg.BRAND_NAME} เรียนสนุกผ่านเรื่องราว เกม และเพื่อนใน LINE (ยังไม่ใช่ระบบจริง)`;
const img=cfg.SITE_URL+cfg.OG_IMAGE;
const meta=(t,d,url)=>`<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}"><link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(cfg.BRAND_NAME)}"><meta property="og:locale" content="th_TH"><meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(d)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(img)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(cfg.BRAND_NAME)} — ลามะอาจารย์สอนภาษาจีน">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(t)}"><meta name="twitter:description" content="${esc(d)}"><meta name="twitter:image" content="${esc(img)}">`;
const fixHead=h=>h.replace(/<meta name="viewport"[^>]*>/,VP).replace(/\n?<script data-kz[^>]*>[^<]*<\/script>/g,'');
let h=fixHead(rd('index.html'));
h=h.replace(/<!--brand:start-->[\s\S]*?<!--brand:end-->/,`<!--brand:start-->${meta(title,desc,cfg.SITE_URL)}<!--brand:end-->`);
wr('index.html',h);
let l=fixHead(rd('line.html'));
const lt=`ทางเข้าจาก LINE OA — ${cfg.BRAND_NAME}`,ld=`หน้าจำลองการเข้าห้องเรียนจาก LINE OA ของ ${cfg.BRAND_NAME} (ตัวอย่างทดลอง ยังไม่ได้เชื่อมกับ LINE จริง)`;
l=l.replace(/<!--brand:start-->[\s\S]*?<!--brand:end-->|<title>[^<]*<\/title>/,`<!--brand:start-->${meta(lt,ld,cfg.SITE_URL+'line.html')}<!--brand:end-->`);
wr('line.html',l);
const m=JSON.parse(rd('manifest.webmanifest'));m.name=`${cfg.BRAND_NAME} (ตัวอย่างทดลอง)`;m.short_name=cfg.BRAND_SHORT;wr('manifest.webmanifest',JSON.stringify(m));

/* ---- หน้าความเป็นส่วนตัว / ข้อกำหนด (ร่างตัวอย่าง) ---- */
const page=(t,body)=>`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">${VP}<meta name="robots" content="noindex">
<title>${esc(t)} — ${esc(cfg.BRAND_NAME)}</title><meta name="theme-color" content="#FAF7F2">
<link rel="icon" type="image/png" href="assets/icons/favicon-64.png">
<style>body{margin:0;background:#FAF7F2;color:#27211E;font:16px/1.75 'IBM Plex Sans Thai',system-ui,-apple-system,'Noto Sans Thai',sans-serif}
main{max-width:720px;margin:0 auto;padding:20px 20px 60px}h1{font-size:26px;margin:.6em 0 .2em}h2{font-size:18px;margin:1.6em 0 .3em}
.draft{background:#FFF1D6;color:#6B4510;border-radius:14px;padding:12px 14px;font-weight:600;margin:12px 0}
.tbd{background:#FFE9E9;border-radius:6px;padding:0 6px}a{color:#B3162F}ul{padding-left:1.2em}li{margin:.25em 0}
.back{display:inline-block;margin-top:8px;padding:13px 0;font-weight:600;text-decoration:none}small{color:#6E655E}
main a{padding:13px 2px}:focus-visible{outline:3px solid #B3162F;outline-offset:2px}</style></head><body><main>
<a class="back" href="index.html">← กลับไปที่แอป</a><h1>${esc(t)}</h1>
<div class="draft" role="note">ร่างตัวอย่าง ยังไม่ผ่านการตรวจโดยผู้เชี่ยวชาญกฎหมาย — ใช้เพื่อบอกสิ่งที่ระบบตัวอย่างนี้ทำจริงในตอนนี้เท่านั้น ไม่ใช่เอกสารทางกฎหมายที่มีผลผูกพัน</div>
${body}
<p><small>ปรับปรุงล่าสุด: ${esc(cfg.POLICY_DATE)} · <a href="privacy.html">ความเป็นส่วนตัว</a> · <a href="terms.html">ข้อกำหนดการใช้งาน</a> · <a href="${esc(cfg.OA_URL)}" rel="noopener">เพิ่มเพื่อนใน LINE (${esc(cfg.OA_ID)})</a></small></p>
</main></body></html>`;
const prov=`<span class="tbd">${esc(cfg.PROVIDER_NAME)}</span>`,cont=`<span class="tbd">${esc(cfg.PROVIDER_CONTACT)}</span>`;
wr('privacy.html',page('นโยบายความเป็นส่วนตัว (ร่างตัวอย่าง)',`
<h2>ผู้ให้บริการ</h2><p>ผู้ให้บริการ/ผู้ควบคุมข้อมูล: ${prov}<br>ช่องทางติดต่อ: ${cont}<br>ชื่อและข้อมูลผู้ให้บริการจะระบุให้ครบก่อนเปิดใช้งานจริง</p>
<h2>ตอนนี้เก็บข้อมูลอะไรบ้าง</h2>
<p>เว็บนี้เป็นตัวอย่างทดลอง หากคุณใช้งานโดย<b>ไม่เข้าสู่ระบบ</b> ข้อมูลทั้งหมดอยู่ใน <b>localStorage ของเบราว์เซอร์บนอุปกรณ์ของคุณเท่านั้น</b> และไม่ถูกส่งไปยังเซิร์ฟเวอร์ใด ได้แก่:</p>
<ul><li>ความคืบหน้าการเรียน คะแนน XP เหรียญ สตรีค ระดับที่เลือก และผลทดสอบวัดระดับ</li><li>คำที่ตอบผิด การตั้งค่า (เช่น เป้าหมายรายวัน เวลาเตือนแบบจำลอง) ของที่ปลดล็อก</li><li>จำนวนครั้งที่ใช้ “ติวเตอร์จำลอง” (ข้อความที่พิมพ์ไม่ได้ถูกบันทึกไว้ และประมวลผลในเครื่อง ไม่ได้ส่งไปที่ใด) · หน้าจำลอง LINE เก็บสถานะเปิด/ปิดเตือน ตัวนับข้อความจำลอง และค่าที่ตั้งในแผน ไว้ในเครื่องเช่นกัน</li></ul>
<p>นอกจาก localStorage แล้ว แอปใช้ <b>Service Worker</b> และ <b>Cache Storage</b> ของเบราว์เซอร์เพื่อให้ใช้งานออฟไลน์ได้: เก็บตัวแอป (หน้าเว็บ สคริปต์ ฟอนต์ไทย รูปน้องลามา) ไว้อัตโนมัติหลังเปิดครั้งแรก, เก็บเสียง รูปคำศัพท์ ไฟล์ลำดับขีด และฟอนต์จีนที่เคยเปิด (เสียงเก็บล่าสุด 400 ไฟล์) และเก็บแพ็กที่คุณกดดาวน์โหลดเองในหน้า “ใช้งานออฟไลน์” (ชื่อแคชขึ้นต้นด้วย <code>lama-</code>) — ทั้งหมดเป็นไฟล์สาธารณะของแอปที่ดาวน์โหลดจากเว็บนี้ ไม่มีข้อมูลส่วนตัว ไม่ส่งอะไรออกจากเครื่อง ลบได้จากหน้า “ใช้งานออฟไลน์”  ส่วนข้อมูลการฝึกเขียนและความคืบหน้า “อักษรข้าง” (ตัวข้างที่ผ่าน การ์ดที่ได้ ผลเกม) เก็บใน localStorage ด้วยกัน ปุ่ม “ล้างข้อมูลทั้งหมด” จะลบทั้ง localStorage แคชนี้ และยกเลิกการลงทะเบียน Service Worker</p>
<h2>สำรองความก้าวหน้า</h2><p>หน้า “สำรองความก้าวหน้า / ย้ายเครื่อง” สร้างไฟล์ .json หรือรหัสข้อความ <b>ในเครื่องของคุณ</b> ไม่ได้ส่งไปเซิร์ฟเวอร์ใด คุณเป็นผู้เลือกว่าจะเก็บไว้หรือส่งต่อที่ไหน ใครที่ได้ไฟล์/รหัสจะเห็นความก้าวหน้าของคุณ จึงควรเก็บเป็นส่วนตัว</p>
<h2 id="line">การเข้าสู่ระบบด้วย LINE (ไม่บังคับ)</h2>
<p>การเข้าสู่ระบบด้วย LINE เป็นทางเลือก ผู้ที่ไม่เข้าสู่ระบบใช้งานได้ตามปกติและไม่ได้รับผลกระทบใด ๆ หากคุณเลือกเข้าสู่ระบบและให้ความยินยอม เราจะเก็บข้อมูลต่อไปนี้บนเซิร์ฟเวอร์คลาวด์ของ <b>Supabase (ภูมิภาคสิงคโปร์)</b></p>
<ul><li><b>รหัสผู้ใช้ LINE (userId)</b> ที่ได้รับการยืนยันจาก LINE</li><li><b>ข้อมูลความคืบหน้าการเรียน</b> ชุดเดียวกับที่เก็บในเครื่องตามรายการข้างต้น และเวลาที่บันทึกล่าสุด</li></ul>
<p><b>วัตถุประสงค์:</b> เพื่อเก็บและซิงก์ความคืบหน้าระหว่างอุปกรณ์ของคุณเท่านั้น ไม่ใช้เพื่อการโฆษณา และไม่เปิดเผยแก่บุคคลอื่น นอกจากผู้ให้บริการที่จำเป็น (LINE สำหรับการยืนยันตัวตน และ Supabase สำหรับการจัดเก็บ) · เราไม่เก็บอีเมล เบอร์โทร รายชื่อเพื่อน หรือข้อความแชต ชื่อที่แสดงใน LINE ใช้แสดงในเครื่องเท่านั้น</p>
<p><b>ระยะเวลาเก็บ:</b> จนกว่าคุณจะลบ หรือเมื่อยุติบริการ · <b>การลบ:</b> หน้า “ฉัน” → “บัญชี LINE” → “ลบข้อมูลบนคลาวด์” จะลบรหัสผู้ใช้ LINE และความคืบหน้าของคุณออกจากเซิร์ฟเวอร์ทันที (ข้อมูลในเครื่องไม่ถูกลบ) · “ออกจากระบบ” จะหยุดซิงก์ แต่ข้อมูลบนคลาวด์ยังอยู่ · หากเข้าสู่ระบบไม่ได้ สามารถขอให้ลบผ่านช่องทางติดต่อด้านบน</p>
<h2>สิ่งที่ไม่ได้เก็บ / ไม่ได้ทำ</h2>
<ul><li>ไม่มีการสมัครสมาชิกด้วยอีเมลหรือรหัสผ่าน ไม่เก็บชื่อ อีเมล เบอร์โทร ที่อยู่ หรือข้อมูลบัตร (ยกเว้นรหัสผู้ใช้ LINE หากคุณเลือกเข้าสู่ระบบ)</li><li>ไม่มีระบบชำระเงินจริง (ราคาในแอปเป็นตัวอย่าง)</li><li>ไม่มี analytics หรือเครื่องมือติดตามของบุคคลที่สาม ไม่ใช้คุกกี้โฆษณา</li><li>ข้อความ “จากเพื่อน/ลีก/การแจ้งเตือน” ที่เห็นเป็นข้อมูลจำลอง ไม่ได้ส่งผ่าน LINE OA จริง</li></ul>
<h2>บริการภายนอกที่เกี่ยวข้อง</h2>
<ul><li>ฟอนต์ (IBM Plex Sans Thai, Inter, Noto Serif SC — สัญญาอนุญาต SIL OFL) โฮสต์ในเว็บไซต์เดียวกัน ไม่โหลดจาก Google อีกต่อไป</li><li>โฮสต์ด้วย GitHub Pages — GitHub อาจเก็บบันทึกการเข้าถึงตามนโยบายของ GitHub</li><li>ปุ่มแชร์/เพิ่มเพื่อนจะเปิด LINE หรือแอปแชร์ของอุปกรณ์เมื่อคุณกดเอง</li><li>LINE Login (LY Corporation) และ Supabase — ใช้เฉพาะเมื่อคุณเลือกเข้าสู่ระบบด้วย LINE ตามหัวข้อด้านบน</li></ul>
<h2>สิทธิ์และการลบข้อมูล</h2>
<p>คุณลบข้อมูลทั้งหมดได้ทุกเมื่อที่ หน้า “ฉัน” → “ล้างข้อมูลทั้งหมด” หรือล้างข้อมูลเว็บไซต์ในเบราว์เซอร์ สำหรับผู้ที่ไม่ได้เข้าสู่ระบบ ข้อมูลอยู่ในเครื่องคุณ ผู้ให้บริการจึงไม่สามารถเข้าถึงหรือกู้คืนให้ได้ · หากเข้าสู่ระบบด้วย LINE ลบข้อมูลบนคลาวด์ได้ตามหัวข้อ “การเข้าสู่ระบบด้วย LINE”</p>
<h2>การเปลี่ยนแปลงในอนาคต</h2>
<p>หากมีการเก็บข้อมูลส่วนบุคคลเพิ่มเติม เช่น อีเมล หรือการชำระเงิน เราจะอัปเดตเอกสารนี้ แจ้งวัตถุประสงค์และระยะเวลาเก็บ และขอความยินยอมก่อนเก็บ โดยคำนึงถึงหลักการของ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) — ข้อความฉบับนี้ยังไม่ใช่การรับรองว่าปฏิบัติตามกฎหมายครบถ้วน</p>
<h2>เด็กและเยาวชน</h2><p>หากผู้ใช้อายุต่ำกว่าเกณฑ์ที่กฎหมายกำหนด ควรให้ผู้ปกครองรับทราบก่อนใช้งานบริการที่มีบัญชีหรือการชำระเงินในอนาคต</p>`));
wr('terms.html',page('ข้อกำหนดการใช้งาน (ร่างตัวอย่าง)',`
<h2>สถานะของบริการ</h2><p>${esc(cfg.BRAND_NAME)} ในรูปแบบเว็บนี้เป็น <b>ตัวอย่างทดลอง</b> ผู้ให้บริการ: ${prov} ฟีเจอร์ ราคา และเนื้อหาอาจเปลี่ยนหรือหายไปได้โดยไม่แจ้งล่วงหน้า</p>
<h2>สิ่งที่เป็นของจำลอง</h2><ul><li>เพื่อนร่วมห้อง คะแนนลีก อันดับ กิจกรรมกลุ่ม และการแจ้งเตือน LINE เป็นข้อมูลจำลองเพื่อสาธิต</li><li>“ติวเตอร์จำลอง” ทำงานด้วยกติกาที่เขียนไว้ล่วงหน้า ไม่ใช่ปัญญาประดิษฐ์จริง และอาจให้คำแนะนำที่ไม่ถูกต้อง</li><li>แผนสมาชิกและราคาเป็นตัวอย่าง ยังไม่มีการเก็บเงินจริง</li><li>เสียงอ่านเป็นเสียงสังเคราะห์ ยังไม่ได้ให้เจ้าของภาษาตรวจ</li></ul>
<h2>เนื้อหาการเรียน</h2><p>เนื้อหาเขียนขึ้นเองเพื่อการฝึก อ้างอิงแนวการสอบวัดระดับภาษาจีนมาตรฐาน <b>ไม่ใช่รายการคำศัพท์หรือข้อสอบทางการ</b> และไม่ได้รับรองหรือเกี่ยวข้องกับหน่วยงานผู้จัดสอบวัดระดับภาษาจีน ผลทดสอบวัดระดับเป็นเพียงตัวชี้วัดคร่าว ๆ ไม่รับประกันผลสอบจริงหรือผลการเรียน</p>
<h2>การใช้งาน</h2><ul><li>ใช้เพื่อการเรียนรู้ส่วนตัว ห้ามนำเนื้อหาและภาพตัวละครไปเผยแพร่เชิงพาณิชย์โดยไม่ได้รับอนุญาต</li><li>หากไม่เข้าสู่ระบบ ข้อมูลอยู่ในเครื่องของคุณ การล้างเบราว์เซอร์หรือเปลี่ยนเครื่องจะทำให้ข้อมูลหาย (ใช้หน้า “สำรองความก้าวหน้า” หรือเข้าสู่ระบบด้วย LINE เพื่อเก็บไว้)</li></ul>
<h2>ข้อมูลโอเพนซอร์สที่ใช้ (ฟีเจอร์ “ลำดับขีด”)</h2><ul><li>เส้นขีด/ลำดับขีด: hanzi-writer-data 2.0.1 (David Chanin) สัญญา Arphic Public License — ฟอนต์ © 1999 Arphic Technology Co., Ltd. เราแปลงเป็นไฟล์ต่อตัวอักษรและเพิ่มข้อมูลของเราเอง (ชนิดขีด ส่วนประกอบ ราก) จึงถือเป็นงานดัดแปลง ใช้สัญญาเดิม · ข้อความสัญญาอยู่ที่ <code>data/stroke/ARPHICPL.TXT</code></li><li>การแยกส่วนประกอบ: Make Me a Hanzi (Shaunak Kishore) Arphic PL + LGPL-3</li><li>เส้นทาง “อักษรข้าง”: แยกตัวข้าง/ส่วนเสียงจาก Make Me a Hanzi (Arphic PL + LGPL-3) ผ่านชั้นแก้ไขของเราเอง — ไฟล์ <code>data/rad/rad.js</code> เป็นงานดัดแปลงใช้ LGPL-3 เช่นกัน · ข้อความสัญญา <code>data/rad/MMAH-COPYING.txt</code> · ชื่อไทยและตัวช่วยจำทั้งหมดเป็นร่าง รอครูตรวจ</li><li>ตัวตรวจขีดที่ลาก: Hanzi Writer 3.7.3 (MIT) · ชื่อชนิดขีด: cnchar-order (MIT)</li><li><b>ชื่อชนิดขีดภาษาไทยและตัวช่วยจำเป็นร่าง รอครูตรวจ</b></li><li>หน้าเครดิตอยู่ในแอป: ลำดับขีด → ที่มาของข้อมูลและเครดิต</li></ul>
<h2>การรับผิด</h2><p>บริการนี้ให้ “ตามสภาพ” โดยไม่มีการรับประกันใด ๆ ตามที่กฎหมายอนุญาต (ข้อความนี้เป็นร่างตัวอย่าง ยังไม่ได้ผ่านการตรวจโดยผู้เชี่ยวชาญกฎหมาย)</p>
<h2>ติดต่อ</h2><p>${cont} · LINE OA: <a href="${esc(cfg.OA_URL)}" rel="noopener">${esc(cfg.OA_ID)}</a> · อ่านเพิ่มที่ <a href="privacy.html">นโยบายความเป็นส่วนตัว</a></p>`));
console.log('built for',cfg.BRAND_NAME);

/* ---- รายการไฟล์สำหรับแพ็กออฟไลน์ (offline-index.js) — ต้องสร้างก่อนคำนวณเวอร์ชัน ---- */
{const ls=d=>fs.existsSync(path.join(D,d))?fs.readdirSync(path.join(D,d)).sort():[];const sz=f=>fs.statSync(path.join(D,f)).size;
 const cjk=ls('fonts').filter(f=>/^H4ch.*\.woff2$/.test(f)).map(f=>'fonts/'+f);
 const pr=ls('assets/pinroom').filter(f=>/\.webp$/.test(f)).map(f=>'assets/pinroom/'+f);
 const kb=a=>Math.round(a.reduce((t,f)=>t+sz(f),0)/1024);
 wr('offline-index.js','/* สร้างโดย build.js — อย่าแก้เอง: รายการไฟล์ของแพ็กออฟไลน์ที่ไม่ได้อยู่ในข้อมูลบทเรียน */\nwindow.OFF_IDX='+JSON.stringify({cjkFonts:cjk,cjkKB:kb(cjk),pinroom:pr,pinroomKB:kb(pr)})+';\n')}

/* ---- ตราเวอร์ชัน (กันค้างแคชหลังดีพลอย): แฮชของ js/css/data -> ?v= ใน index.html + version.json + window.APP_VER ---- */
{const crypto=require('crypto');const files=[];const walk=d=>{for(const f of fs.readdirSync(path.join(D,d)).sort()){const p=d?d+'/'+f:f;const st=fs.statSync(path.join(D,p));if(st.isDirectory()){if(!/^(node_modules|assets|data\/stroke|tools|vendor|fonts|\.git)/.test(p))walk(p)}else if(/\.(js|css)$/.test(f)&&f!=='sw.js')files.push(p)}};
 const top=fs.readdirSync(D).filter(f=>/\.(js|css)$/.test(f)&&f!=='sw.js'&&f!=='build.js');const hs=crypto.createHash('md5');[...top.sort(),...fs.readdirSync(path.join(D,'data')).filter(f=>/\.js$/.test(f)).sort().map(f=>'data/'+f),...fs.readdirSync(path.join(D,'data/rad')).filter(f=>/\.js$/.test(f)).map(f=>'data/rad/'+f),...(fs.existsSync(path.join(D,'data/stroke/index.js'))?['data/stroke/index.js']:[]),...(fs.existsSync(path.join(D,'assets/art/index.js'))?['assets/art/index.js']:[])].forEach(f=>hs.update(f).update(rd(f)));
 const v=hs.digest('hex').slice(0,10);let ih=rd('index.html');
 ih=ih.replace(/(<(?:script src|link rel="stylesheet" href)=")([^"?:]+\.(?:js|css))(\?v=[0-9a-f]+)?"/g,(m,a,f)=>a+f+'?v='+v+'"');
 if(!/<!--ver:start-->/.test(ih))ih=ih.replace('<script src="config.js','<!--ver:start--><!--ver:end--><script src="config.js');
 ih=ih.replace(/<!--ver:start-->[\s\S]*?<!--ver:end-->/,`<!--ver:start--><script>window.APP_VER="${v}"</script><!--ver:end-->`);wr('index.html',ih);wr('version.json',JSON.stringify({v}));
 /* service worker: เวอร์ชัน + รายการ shell ที่แคชตอนติดตั้ง */
 {const ls=d=>fs.existsSync(path.join(D,d))?fs.readdirSync(path.join(D,d)).sort():[];
  const assets=[...ih.matchAll(/(?:script src|link rel="stylesheet" href)="([^"?:]+\.(?:js|css)\?v=[0-9a-f]+)"/g)].map(m=>m[1]);
  const shell=['index.html','manifest.webmanifest','favicon.ico',...assets,...ls('assets/icons').map(f=>'assets/icons/'+f),...ls('fonts').filter(f=>/\.woff2$/.test(f)&&!/^H4ch/.test(f)).map(f=>'fonts/'+f),
   ...ls('assets/mascot').filter(f=>/\.webp$/.test(f)).map(f=>'assets/mascot/'+f),...ls('assets/friends').filter(f=>/\.webp$/.test(f)).map(f=>'assets/friends/'+f),'vendor/hanzi-writer.min.js'].filter((f,i,a)=>a.indexOf(f)===i&&fs.existsSync(path.join(D,f.split('?')[0])));
  let sw=rd('sw.js');const line=`/*shell*/const V='${v}',SHELL=${JSON.stringify(shell)};`;
  if(!/^\/\*shell\*\/.*$/m.test(sw))throw new Error('sw.js shell marker missing');sw=sw.replace(/^\/\*shell\*\/.*$/m,()=>line);wr('sw.js',sw);
  console.log('sw shell',shell.length,'files',Math.round(shell.reduce((t,f)=>t+fs.statSync(path.join(D,f.split('?')[0])).size,0)/1024),'KB')}console.log('version',v)}
