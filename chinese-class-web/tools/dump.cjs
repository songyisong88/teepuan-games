/* dump all lesson data to JSON for tools/validate.py:  node tools/dump.cjs [out.json] */
const fs=require('fs'),vm=require('vm'),path=require('path');
const D=path.join(__dirname,'..');
const files=['config.js','data/common.js',...[1,2,3,4,5].map(n=>'data/hsk'+n+'.js'),'data/place.js'].filter(f=>fs.existsSync(path.join(D,f)));
let s=files.map(f=>fs.readFileSync(path.join(D,f),'utf8')).join('\n').replace(/^const /gm,'var ');
s+='\n;globalThis.__out={LESSONS,CHAPTERS};';vm.runInThisContext(s);
const o=globalThis.__out;
const lvOf={};for(const c of o.CHAPTERS)lvOf[c.id]=c.lv||c.level;
for(const l of o.LESSONS)if(!l.lv)l.lv=lvOf[l.chapter];
fs.writeFileSync(process.argv[2]||'/tmp/cn-lessons.json',JSON.stringify(o));console.log('dumped',o.LESSONS.length,'lessons');
