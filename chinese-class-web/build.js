#!/usr/bin/env node
/* สร้างไฟล์ที่ต้องมีชื่อแบรนด์แบบตายตัว (title / description / manifest / line.html) จาก config.js ที่เดียว
   ใช้: node build.js   (แก้ BRAND_NAME ใน config.js แล้วรันครั้งเดียว) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const D=__dirname,rd=f=>fs.readFileSync(path.join(D,f),'utf8'),wr=(f,t)=>fs.writeFileSync(path.join(D,f),t);
const cfg=vm.runInNewContext(rd('config.js')+';({BRAND_NAME,BRAND_SHORT,MASCOT_NAME})');
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const title=`${cfg.BRAND_NAME} — ตัวอย่างทดลอง`;
const desc=`ตัวอย่างทดลองเว็บเรียนภาษาจีนสำหรับคนไทย ${cfg.BRAND_NAME} เรียนสนุกผ่านเรื่องราว เกม และเพื่อนใน LINE (ยังไม่ใช่ระบบจริง)`;
let h=rd('index.html');
h=h.replace(/<!--brand:start-->[\s\S]*?<!--brand:end-->/,`<!--brand:start--><title>${esc(title)}</title>\n<meta name="description" content="${esc(desc)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><!--brand:end-->`);
wr('index.html',h);
let l=rd('line.html');l=l.replace(/<title>[^<]*<\/title>/,`<title>ทางเข้าจาก LINE OA — ${esc(cfg.BRAND_NAME)}</title>`);wr('line.html',l);
const m=JSON.parse(rd('manifest.webmanifest'));m.name=`${cfg.BRAND_NAME} (ตัวอย่างทดลอง)`;m.short_name=cfg.BRAND_SHORT;wr('manifest.webmanifest',JSON.stringify(m));
console.log('built for',cfg.BRAND_NAME);
