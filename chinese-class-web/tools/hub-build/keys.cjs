// รวมข้อความที่ต้องมีเสียงในคลังคำน่ารู้ (คำ + ประโยคตัวอย่าง) -> audio-hub.json · ใช้: node tools/hub-build/keys.cjs
const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'../..');global.window={};
eval(fs.readFileSync(R+'/data/hub.js','utf8'));const keys=[];
for(const s of window.HUB_SETS)for(const a of s.items){const o=a[5]||{};keys.push(o.say||a[0]);for(const e of a[4]||[])keys.push(e[3]||e[0])}
const u=[...new Set(keys)];fs.writeFileSync(__dirname+'/audio-hub.json',JSON.stringify(u,null,0));console.log('keys',u.length);
