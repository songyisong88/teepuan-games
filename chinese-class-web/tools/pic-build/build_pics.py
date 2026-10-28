#!/usr/bin/env python3
"""แปลงภาพคำศัพท์จาก PIXEL → assets/art/word/<คำจีน>.webp และสร้างรายการ ART_IDX ให้ assets/art/index.js
รันซ้ำได้ (ใส่ภาพล็อตใหม่ในโฟลเดอร์ SRC แล้วรันอีกครั้ง) — ใช้ไฟล์ opaque (filename) ขนาด 512px
ใช้:  python3 tools/pic-build/build_pics.py /path/to/cn-images/hsk1 /path/to/cn-images/hsk2-3 [...]
แต่ละโฟลเดอร์ต้องมี index.json: [{id,zh,thai,filename,transparent_filename,type?}]  (type: noun|verb|adj, ไม่ใส่ = noun)"""
import json,os,sys,re
from PIL import Image
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')
out=os.path.join(ROOT,'assets/art/word');os.makedirs(out,exist_ok=True)
idx={};typ={}
for d in sys.argv[1:]:
    for x in json.load(open(os.path.join(d,'index.json'),encoding='utf8')):
        im=Image.open(os.path.join(d,x['filename'])).convert('RGB')
        if im.width>512:im=im.resize((512,512),Image.LANCZOS)
        im.save(os.path.join(out,x['zh']+'.webp'),'WEBP',quality=80,method=6)
        idx['word/'+x['zh']]=1;typ[x['zh']]={'noun':'n','verb':'v','adj':'a'}[x.get('type') or 'noun']
p=os.path.join(ROOT,'assets/art/index.js');s=open(p,encoding='utf8').read()
s=s.split('\n/* ภาพคำศัพท์จาก PIXEL')[0].rstrip()+'\n/* ภาพคำศัพท์จาก PIXEL ('+str(len(idx))+' คำ) · webp 512px — สร้างโดย tools/pic-build/build_pics.py */\nObject.assign(ART_IDX,'+json.dumps(idx,ensure_ascii=False)+');\n/* ชนิดคำของคำที่มีรูป (n=นาม v=กริยา a=คุณศัพท์) ใช้เลือกตัวหลอกให้อยู่หมวดเดียวกัน */\nwindow.PIC_TYPE='+json.dumps(typ,ensure_ascii=False)+';\n'
open(p,'w',encoding='utf8').write(s);print(len(idx),'images')
