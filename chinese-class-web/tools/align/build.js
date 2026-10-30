// สร้าง data/align.js จาก tools/align/hub.txt (+ไฟล์ระยะถัดไป) · ตรวจทุกคู่ก่อนเขียน: ข้อมูลผิด = หยุด ไม่เขียนไฟล์
// ใช้: node tools/align/build.js [--check]
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..','..');const {alResolve}=require(path.join(ROOT,'align.js'));
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'data/hub.js'),'utf8'),ctx);
const hub=[];for(const s of ctx.window.HUB_SETS)for(const it of s.items)for(const e of (it[4]||[]))hub.push({set:s.id,w:it[0],zh:e[0],py:e[1],th:e[2]});
const out={},errs=[],warn=[];let seg=null;try{seg=new Intl.Segmenter('th',{granularity:'word'})}catch(e){}
const thBounds=t=>{const b=new Set([0,t.length]);if(seg)for(const x of seg.segment(t)){b.add(x.index);b.add(x.index+x.segment.length)}return b};
const src=fs.readFileSync(path.join(__dirname,'hub.txt'),'utf8').split('\n');const seen=new Set();
for(const [ln,raw] of src.entries()){const l=raw.trim();if(!l||l[0]==='#')continue;const m=/^(\d+)\t(.+)$/.exec(raw);if(!m){errs.push(`hub.txt:${ln+1} รูปแบบผิด`);continue}
 const k=+m[1],spec=m[2].trim(),e=hub[k];if(!e){errs.push(`hub ${k}: ไม่มีประโยคนี้`);continue}if(seen.has(k))errs.push(`hub ${k}: ซ้ำ`);seen.add(k);
 const R=alResolve(e.zh,e.py,e.th,spec);if(!R){errs.push(`hub ${k} ${e.zh} | ${e.py} | ${e.th}\n   ${spec}\n   -> ${diag(e,spec)}`);continue}
 const groups=new Set(R.map(r=>r.g)).size;if(groups>6)warn.push(`hub ${k}: ${groups} สี (เกิน 6 สีจะวนซ้ำ)`);
 const B=thBounds(e.th);for(const r of R){if(!B.has(r.t[0])||!B.has(r.t[1]))warn.push(`hub ${k}: ไทย "${e.th.slice(...r.t)}" ไม่ตรงขอบคำ (${e.th})`)}
 if(out[e.zh]&&out[e.zh]!==spec){if(!alResolve(e.zh,e.py,e.th,out[e.zh]))errs.push(`hub ${k}: ประโยคซ้ำแต่ข้อมูลขัดกัน`)}else out[e.zh]=spec}
// ประโยคเดียวกันที่อยู่หลายที่ (คำแปลต่างกัน) ต้องผ่านทุกที่ ไม่งั้นที่นั้นแสดงแบบเดิม (ปลอดภัย) — แจ้งไว้
for(const e of hub)if(out[e.zh]&&!alResolve(e.zh,e.py,e.th,out[e.zh]))warn.push(`ซ้ำแต่ไม่ตรง (จะแสดงแบบเดิม): ${e.zh} ${e.th}`);
function diag(e,spec){const {alFind}=require(path.join(ROOT,'align.js'));for(const p of spec.split('|')){const f=p.split('=');if(f.length!==3)return 'คู่ไม่ครบ 3 ส่วน: '+p;
 if(!alFind(e.zh,f[0],/^[A-Za-z0-9]/.test(f[0])))return 'จีนหาไม่เจอ/ไม่ชัด: '+f[0];if(!alFind(e.py,f[1],true))return 'พินอินหาไม่เจอ/ไม่ชัด: '+f[1];if(!alFind(e.th,f[2],false))return 'ไทยหาไม่เจอ/ไม่ชัด: '+f[2]}return 'ทับกัน หรือ น้อยกว่า 2 สี'}
const n=hub.length,col=hub.filter(e=>out[e.zh]&&alResolve(e.zh,e.py,e.th,out[e.zh])).length;
warn.forEach(w=>console.log('เตือน',w));errs.forEach(x=>console.log('ผิด',x));
console.log(`คลังคำ: ลงสี ${col}/${n} ประโยค · ข้าม ${n-col} · ผิด ${errs.length} · เตือน ${warn.length}`);
if(errs.length)process.exit(1);
if(!process.argv.includes('--check')){const keys=Object.keys(out);
 fs.writeFileSync(path.join(ROOT,'data/align.js'),'// สร้างโดย tools/align/build.js — อย่าแก้ไฟล์นี้ตรง ๆ\nwindow.ALIGN={\n'+keys.map(k=>JSON.stringify(k)+':'+JSON.stringify(out[k])).join(',\n')+'\n};\n');
 fs.writeFileSync(path.join(__dirname,'pairs.json'),JSON.stringify(hub.map((e,k)=>out[e.zh]?{k,zh:e.zh,py:e.py,th:e.th,R:alResolve(e.zh,e.py,e.th,out[e.zh])}:null).filter(Boolean)));
 console.log('เขียน data/align.js',keys.length,'ประโยค')}
