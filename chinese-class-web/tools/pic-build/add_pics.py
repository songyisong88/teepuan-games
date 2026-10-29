"""เพิ่มภาพระดับ 1 ใหม่จาก PIXEL โดยไม่ล้างรายการเดิม (build_pics.py เขียนทับทั้งไฟล์ แต่เก็บส่วนก่อน '/* ภาพคำศัพท์จาก PIXEL' ไว้)
แหล่ง: /workspace/cn-images/l1-new  (index.json ถ้ามี · ไม่มีก็ใช้ items.py + raw/<id>.jpg ที่ไม่อยู่ใน _rejected)
       /workspace/cn-images/l1-scenes (ไฟล์ p1..p7.* หรือ index.json) → assets/art/scene/l1-p<N>.webp
ผล: assets/art/word/<คำจีน>.webp · ลงทะเบียนในบล็อก L1-NEW ของ assets/art/index.js (รันซ้ำได้)"""
import os,json,re,glob,sys
from PIL import Image
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC='/workspace/cn-images/l1-new';SCN='/workspace/cn-images/l1-scenes'
IDX=os.path.join(R,'assets/art/index.js')
# ภาพที่มีลามะ (ทักทาย/การกระทำ/อารมณ์): ซ่งอี้อนุมัติแล้ว 29 ต.ค. 2026 — ไม่ข้ามแล้ว (ใส่ id ที่นี่ถ้าต้องการข้าม)
SKIP_LLAMA=set()
skipped=[]
TYPE={'phrase':'ph','pronoun':'pr','number':'num','time':'t','place':'n'}
def conv(src,dst,size=512):
  im=Image.open(src).convert('RGB')
  if im.width!=im.height:
    s=min(im.size);l=(im.width-s)//2;t=(im.height-s)//2;im=im.crop((l,t,l+s,t+s))
  if im.width>size:im=im.resize((size,size),Image.LANCZOS)
  os.makedirs(os.path.dirname(dst),exist_ok=True);im.save(dst,'WEBP',quality=80,method=6)
items={}
if os.path.exists(os.path.join(SRC,'items.py')):
  ns={};exec(open(os.path.join(SRC,'items.py'),encoding='utf-8').read(),ns)
  for x in ns.get('I',[]):items[x[0]]={'zh':x[1],'type':x[4]}
words={};typ={}
def find(i):
  for d in (SRC,os.path.join(SRC,'final'),os.path.join(SRC,'out'),os.path.join(SRC,'raw')):
    for e in ('webp','png','jpg','jpeg'):
      p=os.path.join(d,i+'.'+e)
      if os.path.exists(p):return p
ij=os.path.join(SRC,'index.json')
if os.path.exists(ij):
  d=json.load(open(ij,encoding='utf-8'))
  rows=d if isinstance(d,list) else [dict(v,id=k) if isinstance(v,dict) else {'id':k,'file':v} for k,v in d.items()]
  for r in rows:
    i=r.get('id') or r.get('key')
    if i in SKIP_LLAMA:skipped.append(r.get('zh') or i);continue
    zh=r.get('zh') or (items.get(i) or {}).get('zh')
    f=r.get('file') or r.get('filename') or r.get('path') or (find(i) if i else None)
    if f and not os.path.isabs(f):f=os.path.join(SRC,f)
    if zh and f and os.path.exists(f) and r.get('ok',True) is not False:words[zh]=f;typ[zh]=TYPE.get(r.get('type') or (items.get(i) or {}).get('type'),'x')
else:
  for i,x in items.items():
    f=find(i)
    if f:words[x['zh']]=f;typ[x['zh']]=TYPE.get(x['type'],'x')
for zh,f in words.items():conv(f,os.path.join(R,'assets/art/word',zh+'.webp'))
scenes={}
if os.path.isdir(SCN):
  for f in sorted(glob.glob(os.path.join(SCN,'*'))):
    m=re.search(r'p(?:art)?[-_]?([1-7])',os.path.basename(f).lower())
    if m and f.lower().rsplit('.',1)[-1] in ('png','jpg','jpeg','webp'):
      im=Image.open(f);w=min(900,im.width);im=im.convert('RGB').resize((w,round(im.height*w/im.width)),Image.LANCZOS)
      os.makedirs(os.path.join(R,'assets/art/scene'),exist_ok=True);im.save(os.path.join(R,'assets/art/scene','l1-p'+m.group(1)+'.webp'),'WEBP',quality=80,method=6);scenes['scene/l1-p'+m.group(1)]=1
s=open(IDX,encoding='utf-8').read()
s=re.sub(r'\n/\* L1-NEW .*?/\* /L1-NEW \*/','',s,flags=re.S)
blk='\n/* L1-NEW · ภาพระดับ 1 ใหม่จาก PIXEL ('+str(len(words))+' คำ, '+str(len(scenes))+' ฉาก) — tools/pic-build/add_pics.py */\nObject.assign(ART_IDX,'+json.dumps(dict({('word/'+z):1 for z in words},**scenes),ensure_ascii=False)+');\nwindow.PIC_TYPE_X='+json.dumps(typ,ensure_ascii=False)+';\n/* /L1-NEW */'
mk='\n/* ภาพคำศัพท์จาก PIXEL'
a,b=s.split(mk,1);s=a.rstrip()+'\n'+blk+'\n'+mk+b
open(IDX,'w',encoding='utf-8').write(s)
print('words',len(words),sorted(words),'scenes',sorted(scenes));print('skipped (llama)',len(skipped),skipped)
