// สร้าง data/align.js จาก tools/align/hub.txt (คลังคำ) + tools/align/lessons.txt (บทเรียนระดับ 1–2) · ตรวจทุกคู่ก่อนเขียน: ข้อมูลผิด = หยุด ไม่เขียนไฟล์
// ใช้: node tools/align/build.js [--check]
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..','..');const {alResolve,alFind}=require(path.join(ROOT,'align.js'));
const load=files=>{const ctx={console};ctx.window=ctx;vm.createContext(ctx);for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx);return ctx};
const pyPlain=s=>String(s||'').replace(/\|/g,'');
// คลังคำ: HUB_SETS[].items[4] = [[zh,py,th],...]
const H=load(['data/hub.js']);const hub=[];for(const s of H.window.HUB_SETS)for(const it of s.items)for(const e of (it[4]||[]))hub.push({set:s.id,w:it[0],zh:e[0],py:e[1],th:e[2]});
// บทเรียนระดับ 1–2: LESSONS[].words[] ที่มี ex (พินอินที่แสดงจริง = ตัด | ออก)
const L=load(['data/common.js','data/hsk1.js','data/hsk2.js','data/hsk2x.js']);const LS=vm.runInContext('LESSONS',L),CH=vm.runInContext('CHAPTERS',L);
const les=[];for(const l of LS){const lv=(CH.find(c=>c.id===l.chapter)||{lv:1}).lv;if(lv>2)continue;for(const w of l.words)if(w.ex)les.push({lv,w:w.zh,zh:w.ex,py:pyPlain(w.exPy),th:w.exTh})}
const SRC=[{name:'คลังคำ',file:'hub.txt',list:hub},{name:'บทเรียน 1–2',file:'lessons.txt',list:les}];
const out={},errs=[],warn=[],rec=[];let seg=null;try{seg=new Intl.Segmenter('th',{granularity:'word'})}catch(e){}
const thBounds=t=>{const b=new Set([0,t.length]);if(seg)for(const x of seg.segment(t)){b.add(x.index);b.add(x.index+x.segment.length)}return b};
const add=(zh,spec)=>{(out[zh]=out[zh]||[]);if(!out[zh].includes(spec))out[zh].push(spec)};
const res=(e)=>{for(const s of (out[e.zh]||[])){const R=alResolve(e.zh,e.py,e.th,s);if(R)return R}return null};
for(const S of SRC){const src=fs.readFileSync(path.join(__dirname,S.file),'utf8').split('\n');const seen=new Set();
 for(const [ln,raw] of src.entries()){const l=raw.trim();if(!l||l[0]==='#')continue;const m=/^(\d+)\t(.+)$/.exec(raw);if(!m){errs.push(`${S.file}:${ln+1} รูปแบบผิด`);continue}
  const k=+m[1],spec=m[2].trim(),e=S.list[k],tag=S.file.replace('.txt','')+' '+k;if(!e){errs.push(`${tag}: ไม่มีประโยคนี้`);continue}if(seen.has(k))errs.push(`${tag}: ซ้ำ`);seen.add(k);
  const R=alResolve(e.zh,e.py,e.th,spec);if(!R){errs.push(`${tag} ${e.zh} | ${e.py} | ${e.th}\n   ${spec}\n   -> ${diag(e,spec)}`);continue}
  const groups=new Set(R.map(r=>r.g)).size;if(groups>6)errs.push(`${tag}: ${groups} สี (เกิน 6)`);
  const B=thBounds(e.th);for(const r of R){if(!B.has(r.t[0])||!B.has(r.t[1]))warn.push(`${tag}: ไทย "${e.th.slice(...r.t)}" ไม่ตรงขอบคำ (${e.th})`)}
  add(e.zh,spec);rec.push({k:tag,zh:e.zh,py:e.py,th:e.th,R})}}
function diag(e,spec){for(const p of spec.split('|')){const f=p.split('=');if(f.length!==3)return 'คู่ไม่ครบ 3 ส่วน: '+p;
 if(!alFind(e.zh,f[0],/^[A-Za-z0-9]/.test(f[0])))return 'จีนหาไม่เจอ/ไม่ชัด: '+f[0];if(!alFind(e.py,f[1],true))return 'พินอินหาไม่เจอ/ไม่ชัด: '+f[1];if(!alFind(e.th,f[2],false))return 'ไทยหาไม่เจอ/ไม่ชัด: '+f[2]}return 'ทับกัน หรือ น้อยกว่า 2 สี'}
// ประโยคเดียวกันที่อยู่หลายที่ ต้องผ่านอย่างน้อยหนึ่งชุด ไม่งั้นที่นั้นแสดงแบบเดิม (ปลอดภัย) — แจ้งไว้
for(const S of SRC)for(const e of S.list)if(out[e.zh]&&!res(e))warn.push(`ซ้ำแต่ไม่ตรง (จะแสดงแบบเดิม): ${e.zh} ${e.py} ${e.th}`);
warn.forEach(w=>console.log('เตือน',w));errs.forEach(x=>console.log('ผิด',x));
for(const S of SRC){const n=S.list.length,col=S.list.filter(e=>res(e)).length,u=new Set(S.list.map(e=>e.zh)).size,uc=new Set(S.list.filter(e=>res(e)).map(e=>e.zh)).size;
 console.log(`${S.name}: ลงสี ${col}/${n} ประโยค (ไม่ซ้ำ ${uc}/${u}) · ข้าม ${n-col}`)}
console.log(`ผิด ${errs.length} · เตือน ${warn.length}`);
if(errs.length)process.exit(1);
if(!process.argv.includes('--check')){const keys=Object.keys(out);
 fs.writeFileSync(path.join(ROOT,'data/align.js'),'// สร้างโดย tools/align/build.js — อย่าแก้ไฟล์นี้ตรง ๆ\nwindow.ALIGN={\n'+keys.map(k=>JSON.stringify(k)+':'+JSON.stringify(out[k].length===1?out[k][0]:out[k])).join(',\n')+'\n};\n');
 fs.writeFileSync(path.join(__dirname,'pairs.json'),JSON.stringify(rec));
 console.log('เขียน data/align.js',keys.length,'ประโยค')}
