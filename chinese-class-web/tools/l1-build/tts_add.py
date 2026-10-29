# สร้างเสียงที่ยังไม่มีให้ประโยค/บทสนทนาระดับ 1 ใหม่ แล้วต่อท้าย audio-index.js (ไม่ลบรายการเดิม)
import json,hashlib,os,asyncio,sys,re,edge_tts
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../..')
T=json.load(open(D+'/audio-texts.json'))
src=open(R+'/audio-index.js').read();idx=json.loads(src[src.index('{'):src.rindex('}')+1])
hid=lambda k:hashlib.sha1(k.encode()).hexdigest()[:8]
todo={k:v for k,v in T.items() if k not in idx}
print('missing',len(todo))
sem=asyncio.Semaphore(4)
async def one(k,v):
  p=R+'/audio/%s.mp3'%hid(k)
  if os.path.exists(p) and os.path.getsize(p)>500:return
  async with sem:
    for a in range(3):
      try:await edge_tts.Communicate(v['text'],v['voice'],rate='-8%').save(p);return
      except Exception as e:print('retry',k,e,file=sys.stderr);await asyncio.sleep(2)
async def main():await asyncio.gather(*[one(k,v) for k,v in todo.items()])
asyncio.run(main())
n=0
for k in todo:
  if os.path.exists(R+'/audio/%s.mp3'%hid(k)):idx[k]=hid(k);n+=1
open(R+'/audio-index.js','w').write('window.AUDIO_INDEX='+json.dumps(idx,ensure_ascii=False,separators=(',',':'))+';')
print('added',n)
