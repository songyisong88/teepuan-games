#!/usr/bin/env python3
# สร้าง data/hsk1.js (ระดับ 1 โครงใหม่) + data/l1-extra.js (คำเสริมย้ายไประดับ 2) + รายการเสียงที่ต้องสร้าง
# ใช้: python3 tools/l1-build/build_l1.py [--tts]
import json,sys,os,re,hashlib,importlib.util
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../..')
spec=importlib.util.spec_from_file_location('spec',D+'/spec.py');S=importlib.util.module_from_spec(spec);spec.loader.exec_module(S)
SRC={w['zh']:w for w in json.load(open(D+'/words-src.json'))}
TONE={c:t for t,cs in enumerate(['','āēīōūǖ','áéíóúǘ','ǎěǐǒǔǚ','àèìòùǜ'][1:],1) for c in cs}
def tone(s):
  for c in s:
    if c in TONE:return TONE[c]
  return 5
def retone(s,t):
  base={'ā':'a','á':'a','ǎ':'a','à':'a','ē':'e','é':'e','ě':'e','è':'e','ī':'i','í':'i','ǐ':'i','ì':'i','ō':'o','ó':'o','ǒ':'o','ò':'o','ū':'u','ú':'u','ǔ':'u','ù':'u'}
  mk={'a':'āáǎà','e':'ēéěè','i':'īíǐì','o':'ōóǒò','u':'ūúǔù'}
  return ''.join(mk[base[c]][t-1] if c in base else c for c in s)
PUN='，。！？、'
taught=[];code_of={}
def known(tok,upto):
  return tok in upto or tok in S.NAMES or (tok in S.EXTRA and S.EXTRA[tok][2] in code_of and True)
def split_known(t,upto):
  # คำผสม: แยกเป็นคำที่สอนแล้วแบบยาวสุดก่อน
  if known(t,upto):return [t]
  for k in range(len(t)-1,0,-1):
    a=t[:k]
    if known(a,upto):
      r=split_known(t[k:],upto)
      if r:return [a]+r
  return None
def wpy(z):
  if z in S.NAMES:return S.NAMES[z][0]
  if z in S.EXTRA:return S.EXTRA[z][0]
  return SRC[z]['py']
def sent(tokstr,upto,where):
  toks=tokstr.split('/');zs=[];ps=[];bad=[]
  core=[re.sub('['+PUN+']','',t) for t in toks]
  for i,t in enumerate(toks):
    c=core[i];tail=t[len(c):]
    parts=split_known(c,upto)
    if not parts:bad.append(c);parts=[c]
    py='|'.join(wpy(p) if (p in upto or p in S.NAMES or p in S.EXTRA) else '?' for p in parts)
    nxt=core[i+1] if i+1<len(toks) else ''
    nfirst=re.split('[| ]',wpy(split_known(nxt,upto)[0]))[0] if nxt and split_known(nxt,upto) else ''
    if c=='不' and nfirst and tone(nfirst)==4:py='bú'
    if c=='一' and not tail and nfirst:py='yí' if tone(nfirst)==4 or nxt=='个' else 'yì'
    if c=='个' and i>0 and core[i-1] in('这','那','几') :py='ge'
    zs.append(t);ps.append(py+tail.replace('，',',').replace('。','.').replace('！','!').replace('？','?').replace('、',','))
  if bad:print('UNTAUGHT',where,tokstr,bad,file=sys.stderr);sys.exit(1)
  return '/'.join(zs),'/'.join(ps)
js=lambda o:json.dumps(o,ensure_ascii=False)
audio={}  # key -> (text, voice)
def need(k,text,role=''):
  key=('f|' if role=='f' else '')+k;audio[key]=(text,'zh-CN-YunxiNeural' if role=='f' else 'zh-CN-XiaoxiaoNeural')
chap=[];les=[];upto=set();ORDER=[]
for p,th,zh,sub,bg in S.PARTS:
  chap.append(f"{{lv:1,id:{1000+p},ep:{p},th:{js(th)},zh:{js(zh)},sub:{js(sub)},emoji:'',bg:'{bg}'}}")
  ls=[x for x in S.L if x[0].split('-')[0]==str(p)]
  for k,(code,lth,lzh,emo,can,words,sents,fr,dlg,wrong,story) in enumerate(ls,1):
    lid=1000+p*10+k;code_of[code]=lid
    kind='snd' if p==0 else 'lex'
    for w in words:
      if w in upto:print('DUP',w,file=sys.stderr)
    upto|=set(words)
    ws=[]
    for z in words:
      w=SRC[z];thv=S.TH.get(z,w['th'])
      ex=next((s for s in sents if z in re.sub('['+PUN+']','',s[0]).split('/')),None)
      if ex:ez,ep=sent(ex[0],upto,code);ex=[ez.replace('/',''),re.sub(r'\|(?=[aeoāáǎàēéěèōóǒò])',"'",ep.replace('/',' ')).replace('|',''),ex[1]]   # nǚ'ér
      else:ex=['','','']
      ws.append(f"W({js(z)},{js(w['py'])},{js(thv)},{js(w.get('h',''))},{js(w.get('mn',''))},{js(ex[0])},{js(ex[1])},{js(ex[2])})")
    so=[];
    for s in sents:
      z,py=sent(s[0],upto,code);so.append([z,py,s[1]]);need(z.replace('/',''),z.replace('/',''))
    do=[]
    for r,t,tt in dlg:
      z,py=sent(t,upto,code);z2=z.replace('/','');do.append([r,z2,py.replace('/',' '),tt]);need(z2,z2,r)
    wo=[]
    for t,tt in wrong:
      z,py=sent(t,upto,code);z2=z.replace('/','');wo.append([z2,py.replace('/',' '),tt]);need(z2,z2)
    o=f"{{id:{lid},v3:1,kind:'{kind}',code:'{code}',th:{js(lth)},zh:{js(lzh)},chapter:{1000+p},emoji:{js(emo)},can:{js(can)},story:{js(story)},\n words:[{','.join(ws)}],\n sents:{js(so)},\n fr:{js({'k':fr[0],'s':fr[1]} if fr else None)},dlg:{js(do)},rq:{js({'p':0,'wrong':wo} if dlg else None)}}}"
    les.append(o);ORDER.append(code)
  if p>0:
    gth,gzh,scene=S.GATES[p]
    for z in scene:
      if z not in upto:print('GATE untaught',p,z,file=sys.stderr);sys.exit(1)
    les.append(f"{{id:{1000+p*10+9},v3:1,kind:'gate',code:'{p}-✓',th:{js(gth)},zh:{js(gzh)},chapter:{1000+p},emoji:'⭐',can:'ทบทวนทั้งตอน ผ่าน 70% ขึ้นไป',story:'',scene:{js(scene)},words:[],sents:[],fr:null,dlg:[],rq:null}}")
# ตรวจ: คำครบ 150 คำมาตรฐาน + 八 ซ้ำใน 0-1 ไม่ได้นับ
allw=[w for x in S.L for w in x[5]]
assert len(allw)==len(set(allw)),'dup words'
print('lessons',len(les),'words',len(allw),file=sys.stderr)
OLD=json.load(open(os.environ['L1_OLD'])) if os.environ.get('L1_OLD') else None   # สร้าง old-l1.json ใหม่เฉพาะเมื่อระบุ L1_OLD=<ไฟล์ข้อมูลเดิม>
hdr="""LVMETA[1]={standard:'HSK 2.0',original:true,official:150,covered:150,v3:1};
/* ระดับ 1 โครงใหม่ (v3) · 8 ตอน (ตอน 0 = เสียง) · บทละไม่เกิน 6 คำ · ใช้เฉพาะคำที่สอนแล้ว · ด่านทบทวนท้ายตอน
   สร้างจาก tools/l1-build/spec.py ด้วย build_l1.py — อย่าแก้ไฟล์นี้ด้วยมือ */
"""
out=hdr+"CHAPTERS.push(\n"+",\n".join(chap)+"\n);\nLESSONS.push(\n"+",\n".join(les)+"\n);\n"
# แผนที่ความคืบหน้าเดิม: รหัสรอบเดิม → คำ (ใช้ย้ายความคืบหน้า dv=3)
if OLD:
  CH={c['id']:c for c in OLD['CHAPTERS']};om={}
  for L in OLD['LESSONS']:
    if CH[L['chapter']]['lv']==1:
      om[str(L['id'])+'a']=[w['zh'] for w in L['words'][:8]];om[str(L['id'])+'b']=[w['zh'] for w in L['words'][8:]]
  json.dump(om,open(D+'/old-l1.json','w'),ensure_ascii=False)
om=json.load(open(D+'/old-l1.json'))
out+="/* รอบเรียนระดับ 1 เดิม → คำในรอบนั้น (ย้ายความคืบหน้าให้ผู้เรียนเดิม) */\nconst OLD_L1="+js(om)+";\n"
open(R+'/data/hsk1.js','w').write(out)
json.dump({k:{'text':v[0],'voice':v[1]} for k,v in audio.items()},open(D+'/audio-texts.json','w'),ensure_ascii=False,indent=0)
print('audio keys',len(audio),file=sys.stderr)
# ---- (เลิกใช้แล้ว) คำเสริมเดิมย้ายไปอยู่ในระดับ 2 โครงใหม่ (tools/lv-build/build_lv.py) · data/hsk2x.js เหลือเป็นไฟล์ว่าง ----
if False:
  CH={c['id']:c for c in OLD['CHAPTERS']};old=[L for L in OLD['LESSONS'] if CH[L['chapter']]['lv']==1]
  OW={w['zh']:w for L in old for w in L['words']};OL={L['id']:L for L in old}
  def pick(ids):
    return [s for i,k in ids for s in [OL[i]['sents'][k]]]
  XA=('ทักทายตามเวลา','早上好','🌅','您好 大家好 早上好 晚上好 晚安 明天见 一会儿见 早上 晚上 起床 回家 请进 也 吧 你好吗 我很好'.split(),
      [OL[1]['sents'][0],OL[1]['sents'][1],OL[1]['sents'][3],OL[3]['sents'][[s[0] for s in OL[3]['sents']].index('明天/见！')],
       OL[13]['sents'][[s[0] for s in OL[13]['sents']].index('请/进，/请/坐。')],OL[11]['sents'][[s[0] for s in OL[11]['sents']].index('我/七点/半/起床。')]],3)
  XB=('พูดคุยและซื้อของ','好吃','🛒','说 没有 一点儿 好吃 贵 便宜 饭店 哪儿 雨 半 泰国 泰国人 今年 多大 不是 下雨了'.split(),
      [next(s for L in old for s in L['sents'] if s[0]==t) for t in ['她/没有/女儿。','你/在/哪儿？','这/个/菜/很/好吃。','他/住/在/饭店。','太/贵/了，/便宜/一点儿/吗？','我/是/泰国人。']],10)
  out2="/* คำเสริมที่เดิมอยู่ระดับ 1 แต่ไม่ใช่คำระดับ 1 มาตรฐาน — ย้ายมาไว้ท้ายระดับ 2 (สร้างโดย tools/l1-build/build_l1.py) */\n"
  out2+="CHAPTERS.push({lv:2,id:1200,th:'คำเสริมจากระดับ 1 เดิม',zh:'补充',sub:'ทักทายตามเวลา ซื้อของ',emoji:'➕',bg:'#F3EEE6'});\nLESSONS.push(\n"
  xs=[]
  for n,(th,zh,emo,ws,ss,dl) in enumerate((XA,XB),1):
    wl=','.join(f"W({js(z)},{js(OW[z]['py'])},{js(OW[z]['th'])},{js(OW[z].get('h',''))},{js(OW[z].get('mn',''))},{js(OW[z].get('ex',''))},{js(OW[z].get('exPy',''))},{js(OW[z].get('exTh',''))})" for z in ws)
    xs.append(f"{{id:{1200+n},th:{js(th)},zh:{js(zh)},chapter:1200,emoji:{js(emo)},story:'คำและวลีที่ใช้บ่อย ต่อยอดจากระดับ 1',\n words:[{wl}],\n sents:{js(ss)},dlg:{js(OL[dl]['dlg'])},rq:{js(OL[dl]['rq'])}}}")
  out2+=",\n".join(xs)+"\n);\n"
  open(R+'/data/hsk2x.js','w').write(out2)
