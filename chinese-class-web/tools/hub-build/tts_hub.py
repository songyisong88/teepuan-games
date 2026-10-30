# สร้างเสียงตัวอย่างคลังคำน่ารู้ (คีย์ใน audio-hub.json = ข้อความที่อ่านจริง) แล้วต่อท้าย audio-index.js
# ใช้: node tools/hub-build/keys.cjs && python3 tools/hub-build/tts_hub.py
import json,hashlib,os,asyncio,sys,edge_tts
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../..')
src=open(R+'/audio-index.js').read();idx=json.loads(src[src.index('{'):src.rindex('}')+1])
hid=lambda k:hashlib.sha1(k.encode()).hexdigest()[:8]
keys=json.load(open(D+'/audio-hub.json'))
todo=[k for k in dict.fromkeys(keys) if k not in idx]
print('missing',len(todo))
sem=asyncio.Semaphore(6)
async def one(k):
  p=R+'/audio/%s.mp3'%hid(k);text=(k[2:] if k.startswith('f|') else k).replace('—','，')
  voice='zh-CN-YunxiNeural' if k.startswith('f|') else 'zh-CN-XiaoxiaoNeural'
  if os.path.exists(p) and os.path.getsize(p)>500:return
  async with sem:
    for a in range(4):
      try:await edge_tts.Communicate(text,voice,rate='-8%').save(p);return
      except Exception as e:print('retry',k,e,file=sys.stderr);await asyncio.sleep(3)
async def main():await asyncio.gather(*[one(k) for k in todo])
asyncio.run(main())
n=0
for k in todo:
  if os.path.exists(R+'/audio/%s.mp3'%hid(k)) and os.path.getsize(R+'/audio/%s.mp3'%hid(k))>500:idx[k]=hid(k);n+=1
open(R+'/audio-index.js','w').write('window.AUDIO_INDEX='+json.dumps(idx,ensure_ascii=False,separators=(',',':'))+';')
print('added',n)
