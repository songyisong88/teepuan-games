#!/usr/bin/env python3
# สร้าง data/hsk2.js – hsk5.js เป็นโครงบทแบบใหม่ (v3) เหมือนระดับ 1
# ใช้: python3 tools/lv-build/build_lv.py [2 3 4 5]
# แหล่ง: tools/lv-build/src.json (ภาพรวมข้อมูลเดิมก่อนแปลง) · คำ/ประโยค/บทสนทนาเดิมถูกนำมาใช้ซ้ำทั้งหมด (ไม่แต่งประโยคใหม่)
# กติกา: ทุกประโยคต้องประกอบจากคำที่สอนแล้วเท่านั้น (ระดับก่อนหน้า + บทก่อนหน้าในระดับเดียวกัน + บทนี้) หรือชื่อเฉพาะ
import json,sys,os,re,collections
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../..')
SRC=json.load(open(D+'/src.json'));OFF={int(k):set(v) for k,v in json.load(open(R+'/tools/hsk20-words.json')).items()}
ART=set(re.findall(r'"word/([^"]+)"',open(R+'/assets/art/index.js',encoding='utf8').read()))
CH={c['id']:c for c in SRC['CHAPTERS']}
for l in SRC['LESSONS']:l['lv']=CH[l['chapter']]['lv']
LEVELS=[int(a) for a in sys.argv[1:]] or [2,3,4,5]
ORDER={2:[200,1200,6,8,7,9,10,230]}
MAXW={2:6,3:8,4:8,5:8}
MAXS={2:6,3:6,4:6,5:7}
PUN='，。！？、,.!?：:；;“”‘’…—（）()「」《》 '
EMO=re.compile('[\U0001F000-\U0001FFFF\u2600-\u27BF\uFE0F\u200D]')
def clean(s):return re.sub(r'\s+',' ',EMO.sub('',s or '')).strip().replace('HSK ','').replace('HSK','')
def core(t):return ''.join(c for c in t if c not in PUN)
js=lambda o:json.dumps(o,ensure_ascii=False)
def lv_lessons(n):
  chs=[c['id'] for c in SRC['CHAPTERS'] if c['lv']==n]
  ls=[l for l in SRC['LESSONS'] if l['lv']==n]
  ls.sort(key=lambda l:(chs.index(l['chapter']),SRC['LESSONS'].index(l)));return ls
# ---- ชุดคำต่อระดับ (คงการจัดระดับเดิม · ตัดคำซ้ำ/คำที่ประกอบจากคำที่สอนแล้วซึ่งไม่ใช่คำมาตรฐาน)
ALLVOC=set(w['zh'] for l in SRC['LESSONS'] for w in l['words'])
def decomp(t,K):
  if t in K:return True
  return any(t[:k] in K and decomp(t[k:],K) for k in range(len(t)-1,0,-1))
known0=set(w['zh'] for l in lv_lessons(1) for w in l['words'])
WS={};kk=set(known0)
for n in range(2,6):
  ws=[];seen=set()
  for l in lv_lessons(n):
    for w in l['words']:
      z=w['zh']
      if z in kk or z in seen:continue
      if not any(z in OFF[k] for k in OFF) and decomp(z,kk|seen):continue
      seen.add(z);ws.append(dict(w,old=l['id'],ch=l['chapter']))
  WS[n]=ws;kk|=seen
# ---- คำมาตรฐานของระดับ n ที่เดิมอยู่ระดับสูงกว่า → ย้ายลงมาระดับ n (ใส่ตอนที่มีประโยคใช้คำนั้นมากที่สุด)
SENT_RAW=[s[0].replace('/','') for l in SRC['LESSONS'] for s in l.get('sents',[])]+[w.get('ex','') for l in SRC['LESSONS'] for w in l['words']]
MOVED={}
for n in range(2,6):
  mv=[w for m in range(n+1,6) for w in WS[m] if w['zh'] in OFF[n]]
  if not mv:continue
  ids=set(id(w) for w in mv)
  for m in range(n+1,6):WS[m]=[w for w in WS[m] if id(w) not in ids]
  chs=[]
  for w in WS[n]:
    if w['ch'] not in chs:chs.append(w['ch'])
  for w in mv:
    best=(-1,chs[0])
    for c in chs:
      pz=[x['zh'] for x in WS[n] if x['ch']==c]
      sc=sum(1 for t in SENT_RAW if w['zh'] in t and any(z in t for z in pz))
      if sc>best[0]:best=(sc,c)
    w['ch']=best[1];MOVED[w['zh']]=n
    # ต่อท้ายคำของตอนนั้น
    last=max(i for i,x in enumerate(WS[n]) if x['ch']==best[1])
    WS[n].insert(last+1,w)
# ---- ชื่อเฉพาะ (พินอินขึ้นต้นตัวใหญ่ และไม่ใช่คำศัพท์ในบทใด)
NAMES=set()
for l in SRC['LESSONS']:
  for s in l.get('sents',[]):
    zs,ps=s[0].split('/'),s[1].split('/')
    if len(zs)!=len(ps):continue
    for i,(z,p) in enumerate(zip(zs,ps)):
      c=core(z)
      if c and p[:1].isupper() and c not in ALLVOC and re.fullmatch(r'[\u4e00-\u9fff]+',c):NAMES.add(c)
NAMES|={'大明','小美'}
def okstr(s,K):
  s=core(s)
  if not s:return True
  if re.fullmatch(r'[0-9０-９%:：.]+',s):return True
  n=len(s);ok=[False]*(n+1);ok[0]=True
  for i in range(n):
    if not ok[i]:continue
    if s[i].isdigit():ok[i+1]=True;continue
    for j in range(i+1,min(n,i+8)+1):
      if s[i:j] in K or s[i:j] in NAMES or (i>0 and s[i:j] in ('们','儿')):ok[j]=True
  return ok[n]
# ---- คลังประโยค/บทสนทนาเดิม
POOL=[];seenS=set()
for l in SRC['LESSONS']:
  for s in l.get('sents',[]):
    full=s[0].replace('/','')
    if full in seenS or len(s[0].split('/'))!=len(s[1].split('/')):continue
    seenS.add(full);POOL.append({'s':[s[0],s[1],clean(s[2])],'full':full,'toks':[core(t) for t in s[0].split('/')],'src':l['id'],'lv':l['lv']})
HANC=re.compile(r'[\u4e00-\u9fff]')
def tokenize(zh,py):
  # แบ่งคำตามพินอิน (คำละช่องว่าง พยางค์คั่นด้วย |) → "我/哥哥/是/医生。" , "wǒ/gē|ge/shì/yī|shēng."
  zh=zh.strip();py=py.strip()
  if re.search(r'[0-9A-Za-z]',zh):return None
  pw=py.split()
  out=[];i=0
  for k,w in enumerate(pw):
    n=len([x for x in w.split('|') if re.search(r'[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]',x)])
    t=''
    while i<len(zh) and not HANC.match(zh[i]):
      if out:out[-1]+=zh[i]
      i+=1
    c=0
    while i<len(zh) and c<n:
      if HANC.match(zh[i]):c+=1;t+=zh[i];i+=1
      else:return None
    if c<n:return None
    while i<len(zh) and not HANC.match(zh[i]):t+=zh[i];i+=1
    out.append(t)
  if i!=len(zh) or not out:return None
  py2=[w if k else w[:1].lower()+w[1:] for k,w in enumerate(pw)]
  return '/'.join(out),'/'.join(py2)
def addpool(zh,py,th,src,lv):
  if not zh or not th:return
  full=zh.strip()
  if full in seenS:return
  r=tokenize(zh,py)
  if not r:return
  seenS.add(full);POOL.append({'s':[r[0],r[1],clean(th)],'full':full,'toks':[core(t) for t in r[0].split('/')],'src':src,'lv':lv})
for l in SRC['LESSONS']:
  for w in l['words']:addpool(w.get('ex',''),w.get('exPy',''),w.get('exTh',''),l['id'],l['lv'])
  for x in l.get('dlg') or []:addpool(x[1],x[2],x[3],l['id'],l['lv'])
DLG=[];seenD=set()
for l in SRC['LESSONS']:
  if l.get('v3'):continue
  dl=l.get('dlg') or []
  if len(dl)<2:continue
  key='|'.join(x[1] for x in dl)
  if key in seenD:continue
  seenD.add(key);DLG.append({'dlg':[[r,z,p,clean(t)] for r,z,p,t in dl],'rq':l.get('rq'),'src':l['id']})
usedS=set();usedD=set();usedEx=set()
for l in lv_lessons(1):
  for s in l['sents']:usedS.add(s[0].replace('/',''))
  if l.get('dlg'):usedD.add('|'.join(x[1] for x in l['dlg']))
def has_word(p,w):return any(t==w for t in p['toks']) or (len(w)>=2 and w in p['full'])
def pref_len(n,L):
  return {2:(3,9),3:(6,14),4:(7,16),5:(8,22)}[n]
def score(p,ws,n,srcids):
  a,b=pref_len(n,0);L=len(core(p['full']))
  hit=sum(1 for w in ws if has_word(p,w))
  return (hit*3+(2 if p['src'] in srcids else 0)-(0 if a<=L<=b else (a-L if L<a else (L-b)/3))) 
def find_frame(cands,ws,n):
  # ประโยคที่เหมือนกันทุกคำ ต่างกันตำแหน่งเดียว · อย่างน้อยหนึ่งประโยคมีคำของบท
  g=collections.defaultdict(list)
  for p in cands:
    zt=p['s'][0].split('/')
    if len(zt)<2:continue
    for k in range(len(zt)):
      if not core(zt[k]):continue
      key=(k,tuple(zt[:k]),zt[k][len(core(zt[k])):],tuple(zt[k+1:]))
      g[key].append(p)
  best=None
  for (k,pre,tail,post),ps in g.items():
    toks={};
    for p in ps:
      t=p['toks'][k]
      if t not in toks:toks[t]=p
    if len(toks)<2:continue
    vs=list(toks.values())
    inl=[p for p in vs if p['toks'][k] in ws]
    if not inl and not any(has_word(p,w) for p in vs for w in ws):continue
    vs=sorted(vs,key=lambda p:(p['toks'][k] not in ws))[:4]
    ln=len(pre)+1+len(post)
    sc=len(inl)*3+min(len(vs),4)+(ln if n>=3 else -abs(ln-3))*0.5
    if best is None or sc>best[0]:best=(sc,k,vs)
  return best

# ---- กรอบประโยคสังเคราะห์: แทนคำในช่องด้วยคำใหม่ชนิดเดียวกัน (ตรวจชนิดคำจากคลังประโยคเดิม + ลักษณนามจาก CC-CEDICT)
CL=collections.defaultdict(set)
CED=os.environ.get('CEDICT','/workspace/curriculum-v2/all/cedict_ts.u8')
if os.path.exists(CED):
  for line in open(CED,encoding='utf8'):
    m=re.match(r'(\S+) (\S+) \[[^\]]+\] /(.*)/',line)
    if not m:continue
    for g in m.group(3).split('/'):
      if g.startswith('CL:'):
        for x in g[3:].split(','):CL[m.group(2)].add(x.split('[')[0].split('|')[-1])
RAWALL=SENT_RAW+[x[1] for l in SRC['LESSONS'] for x in (l.get('dlg') or [])]
ADV='很|太|非常|真|特别|比较|更|最|不太|有点儿';VT='想|会|喜欢|要|去|一起|开始|爱|在|能'
_pc={}
def posof(w):
  if w in _pc:return _pc[w]
  e=re.escape(w);r=set()
  if any(re.search('(?:'+ADV+')'+e+'(?:[，。！？了的]|$)',t) for t in RAWALL):r.add('a')
  if len(w)>=2 and any(re.search('(?:'+VT+')'+e+'(?:[，。！？了]|$)',t) for t in RAWALL):r.add('v')
  if CL.get(w):r.add('n')
  _pc[w]=r;return r
def thalts(t):
  t=clean(t);t=re.sub(r'[（(][^）)]*[）)]','',t)
  return [x.strip() for x in re.split(r'\s*/\s*|,|;|、',t) if len(x.strip())>=2]
TONE1={c:i for i,cs in enumerate(['āēīōūǖ','áéíóúǘ','ǎěǐǒǔǚ','àèìòùǜ'],1) for c in cs}
def tone1(py):
  for c in re.split(r'[| ]',py)[0]:
    if c in TONE1:return TONE1[c]
  return 5
def synth(cands,g,part_zs,WM,n):
  # คืน (k, [ประโยค]) โดยอย่างน้อย 2 รูปแบบ มีคำของบทในช่องอย่างน้อย 1 คำ
  best=None
  for p in cands:
    zt=p['s'][0].split('/');pt=p['s'][1].split('/')
    if not (2<=len(zt)<=(6 if n==2 else 9)):continue
    for k,t in enumerate(p['toks']):
      if not t or t not in WM:continue
      tail=zt[k][len(t):]
      if tail and tail[0] not in '，。！？':continue
      prev=p['toks'][k-1] if k else ''
      ptail=pt[k][len(pt[k].rstrip(',.!?')):]
      th_t=[a for a in thalts(WM[t]['th']) if a in p['s'][2]]
      if not th_t:continue
      pt_=posof(t)
      vs=[]
      for w in g:
        z=w['zh']
        if z==t or z in p['full']:continue
        pw=posof(z);ok=False
        if 'n' in pt_ and 'n' in pw:
          sh=(CL[t]&CL[z])-{'个'}
          ok=bool(sh) and not (posof(t)-{'n'}) and not (pw-{'n'})
        if not ok:continue
        th_w=thalts(w['th'])
        if not th_w:continue
        zs2=zt[:];ps2=pt[:]
        zs2[k]=z+tail;ps2[k]=w['py']+ptail
        if k and prev=='不':ps2[k-1]=('bú' if tone1(w['py'])==4 else 'bù')+ps2[k-1][len(ps2[k-1].rstrip(',.!?')):] if ps2[k-1].rstrip(',.!?') in ('bù','bú') else ps2[k-1]
        th2=p['s'][2].replace(th_t[0],th_w[0],1)
        full=''.join(zs2)
        if full in usedS:continue
        vs.append({'s':['/'.join(zs2),'/'.join(ps2),th2],'full':full,'toks':[core(x) for x in zs2],'src':-1,'lv':n,'syn':1})
      if not vs:continue
      sc=len(vs)*3+(1 if p['src']!=-1 else 0)+(len(zt) if n>=3 else -abs(len(zt)-3))*0.3
      if best is None or sc>best[0]:best=(sc,k,[p]+vs[:3])
  return best

sys.path.insert(0,D);import frames as FRM
PUNM={'，':',','。':'.','！':'!','？':'?','、':',','：':':','；':';'}
def wordpy(c,K):
  if c in ('这个','那个','哪个') and c in WM:return WM[c]['py'].replace('gè','ge')
  if c in WM:return WM[c]['py']
  if len(c)>1 and c[-1] in '们儿':
    r=wordpy(c[:-1],K)
    return r and r+('|men' if c[-1]=='们' else '|r')
  n=len(c)
  for k in range(n-1,0,-1):
    if c[:k] in WM:
      r=wordpy(c[k:],K)
      if r:return WM[c[:k]]['py']+'|'+r
  return None
def mksent(tokstr,th,K,where):
  toks=tokstr.split('/');cs=[core(t) for t in toks];ps=[]
  for i,t in enumerate(toks):
    c=cs[i]
    if not okstr(c,K):print('UNTAUGHT',where,tokstr,c,file=sys.stderr);return None
    py=wordpy(c,K)
    if py is None:print('NOPY',where,c,file=sys.stderr);return None
    if ' ' in py and len(py.split())==len(c):py=py.replace(' ','|')   # คำเดียวกันเขียนแบบเดียวกับระดับ 1
    nx=wordpy(cs[i+1],K) if i+1<len(toks) else None
    if c=='不' and nx:py='bú' if tone1(nx)==4 else 'bù'
    if c=='一' and nx and i+1<len(toks):py='yí' if (tone1(nx)==4 or cs[i+1]=='个') else 'yì'
    if c=='个' and i>0 and cs[i-1] in ('这','那','哪','几','一','两','三','四','五','六','七','八','九','十','每'):py='ge'
    tail=t[len(c):]
    ps.append(py+''.join(PUNM.get(x,x) for x in tail))
  full=tokstr.replace('/','')
  return {'s':[tokstr,'/'.join(ps),th],'full':full,'toks':cs,'src':-2,'lv':0}
# ชื่อตอนเดิมที่ไม่เหมาะกับผู้เรียน (ตอนคำเสริมเดิม 1200)
TOVR={3:{'9-5':'ยิ่ง นาที นก'}}   # ชื่อบทที่ต่อจากคำแปลแล้วอ่านไม่ลื่น
CHOVR={1200:{'th':'ทักทายเช้าเย็น','zh':'早晚好'}}
def wrong_opts(correct,K,exclude):
  out=[]
  for p in POOL:
    if p['full'] in exclude or p['full']==correct:continue
    if 4<=len(core(p['full']))<=16 and all(okstr(t,K) for t in p['toks']):
      out.append([p['full'],p['s'][1].replace('/',' '),p['s'][2]])
  return out
def thshort(t):
  t=clean(t);t=re.split(r'\s*/\s*|,|;|（|\(',t)[0].strip();return t
def parts(n):
  chs=ORDER.get(n) or [c['id'] for c in SRC['CHAPTERS'] if c['lv']==n]
  return [(CH[c],[w for w in WS[n] if w['ch']==c]) for c in chs if any(w['ch']==c for w in WS[n])]
def split(ws,m):
  k=-(-len(ws)//m);base,rem=divmod(len(ws),k);out=[];i=0
  for j in range(k):
    s=base+(1 if j<rem else 0);out.append(ws[i:i+s]);i+=s
  return out
import random
random.seed(7)
BG=['#EAF1FB','#FDF0E6','#EEF6EC','#F4EEF8','#FCF6E3','#E9F5F5','#F8ECEE','#F3EEE6']
PYOVR={'弹':'tán'}   # คำพ้องรูป: ในบทนี้หมายถึงดีด/เล่นเครื่องดนตรี
for _n in WS:
  for _w in WS[_n]:
    if _w['zh'] in PYOVR:_w['py']=PYOVR[_w['zh']]
WM={w['zh']:w for l in lv_lessons(1) for w in l['words']}
for n in WS:
  for w in WS[n]:WM.setdefault(w['zh'],w)
known=set(known0)
for n in range(2,6): 
  if n>max(LEVELS):
    known|=set(w['zh'] for w in WS[n]);continue
  LVK=set(known)|set(w['zh'] for w in WS[n])   # คำทั้งระดับนี้ (ใช้เฉพาะตัวอย่างบนบัตรคำ เมื่อหาประโยคจากคำที่สอนแล้วไม่ได้)
  chap=[];les=[];audio={};stat=collections.Counter();oldmap={}
  for l in lv_lessons(n):
    oldmap[str(l['id'])+'a']=[w['zh'] for w in l['words'][:8]]
    if len(l['words'])>8:oldmap[str(l['id'])+'b']=[w['zh'] for w in l['words'][8:]]
  for pi,(c,pws) in enumerate(parts(n),1):
    cid=n*1000+pi
    c=dict(c,**CHOVR.get(c['id'],{}))
    chap.append(f"{{lv:{n},id:{cid},ep:{pi},th:{js(clean(c['th']))},zh:{js(c['zh'])},sub:{js(clean(c.get('sub','')))},emoji:'',bg:'{c.get('bg') or BG[pi%len(BG)]}'}}")
    groups=split(pws,MAXW[n]);partS=[]
    for k,g in enumerate(groups,1):
      lid=n*10000+pi*100+k;zs=[w['zh'] for w in g];known|=set(zs)
      src=set(w['old'] for w in g)
      cands=[p for p in POOL if p['full'] not in usedS and p['full'] not in [a.replace('/','') for a,b in FRM.FR.get(n,{}).get(f'{pi}-{k}',[])+FRM.EX.get(n,{}).get(f'{pi}-{k}',[])] and all(okstr(t,known) for t in p['toks'])]
      chosen=[];fr=None;code=f'{pi}-{k}'
      hf=[mksent(a,b,known,code) for a,b in FRM.FR.get(n,{}).get(code,[])]
      hx=[mksent(a,b,known,code) for a,b in FRM.EX.get(n,{}).get(code,[])]
      hf=[x for x in hf if x];hx=[x for x in hx if x]
      f=None
      if len(hf)>=2:
        L0=[len(x['toks']) for x in hf]
        diff=[i for i in range(L0[0]) if len(set(x['toks'][i] for x in hf))>1] if len(set(L0))==1 else []
        if len(diff)==1:f=(99,diff[0],hf)
        else:print('BADFRAME',code,file=sys.stderr)
      for x in hf+hx:usedS.add(x['full'])
      if not f:f=find_frame([p for p in cands if 2<=len(p['toks'])<= (6 if n==2 else 10)],zs,n)
      if f and f[0]!=99 and not any(p['toks'][f[1]] in zs for p in f[2]):f=None
      if f:
        _,fk,vs=f;chosen=vs[:];fr={'k':fk,'s':list(range(len(vs)))}
      chosen+=[x for x in hx if x['full'] not in [c['full'] for c in chosen]]
      rel=[p for p in cands if p not in chosen and any(has_word(p,w) for w in zs)]
      for w in zs:  # ให้ทุกคำมีประโยคอย่างน้อยหนึ่ง
        if len(chosen)>=MAXS[n]:break
        if any(has_word(p,w) for p in chosen):continue
        cw=[p for p in rel if has_word(p,w) and p not in chosen]
        if cw:chosen.append(max(cw,key=lambda p:score(p,zs,n,src)))
      rest=sorted([p for p in rel if p not in chosen],key=lambda p:-score(p,zs,n,src))
      while len(chosen)<min(MAXS[n],5) and rest:chosen.append(rest.pop(0))
      for p in chosen:usedS.add(p['full'])
      sents=[p['s'] for p in chosen]
      if not sents:stat['nosent']+=1
      if fr:stat['fr']+=1
      # บทสนทนา
      dl=None
      dc=[x for x in DLG if '|'.join(y[1] for y in x['dlg']) not in usedD and all(okstr(y[1],known) for y in x['dlg']) and any(w in y[1] for y in x['dlg'] for w in zs)]
      if dc:
        dl=max(dc,key=lambda x:(x['src'] in src,sum(1 for w in zs for y in x['dlg'] if w in y[1]),-abs(len(x['dlg'])-4)))
        usedD.add('|'.join(y[1] for y in dl['dlg']))
      rq=None
      if dl:
        stat['dlg']+=1
        r=dl['rq'] or {'p':0,'wrong':[]}
        p=r['p'] if r['p']+1<len(dl['dlg']) else 0
        ans=dl['dlg'][p+1][1]
        wr=[x for x in r.get('wrong',[]) if okstr(x[0],known) and x[0]!=ans]
        if len(wr)<2:
          pool=wrong_opts(ans,known,set(y[1] for y in dl['dlg']))
          random.shuffle(pool);wr=(wr+pool)[:2]
        if len(wr)>=2:rq={'p':p,'wrong':[[x[0],x[1],clean(x[2])] for x in wr[:2]]};stat['rq']+=1
      # คำ
      wsrc=[]
      for w in g:
        ex,exPy,exTh=w.get('ex',''),w.get('exPy',''),clean(w.get('exTh',''))
        if not ex or not okstr(ex,known):
          cw=[p for p in chosen if has_word(p,w['zh'])] or [p for p in cands if has_word(p,w['zh'])]
          if cw:
            p=min(cw,key=lambda p:abs(len(p['full'])-8));ex,exPy,exTh=p['full'],p['s'][1].replace('/',' '),p['s'][2]
          elif n>=3 and ex and okstr(ex,LVK) and ex not in usedEx:stat['ex_lv']+=1
          else:
            cl=[p for p in POOL if p['full'] not in usedS and p['full'] not in usedEx and has_word(p,w['zh']) and all(okstr(t,LVK) for t in p['toks'])] if n>=3 else []
            if cl:
              p=min(cl,key=lambda p:abs(len(p['full'])-10));ex,exPy,exTh=p['full'],p['s'][1].replace('/',' '),p['s'][2];stat['ex_lv']+=1
            else:ex=exPy=exTh='';stat['noex']+=1
        if ex:usedEx.add(ex)
        if ex:audio[ex]=''
        audio[w['zh']]=''
        wsrc.append(f"W({js(w['zh'])},{js(w['py'])},{js(clean(w['th']))},{js(clean(w.get('h','')))},{js(clean(w.get('mn','')))},{js(ex)},{js(exPy)},{js(exTh)})")
      for s in sents:audio[s[0].replace('/','')]=''
      dlo=dl['dlg'] if dl else []
      for r_,z,_,_ in dlo:audio[('f|' if r_=='f' else '')+z]=''
      if rq:
        for x in rq['wrong']:audio[x[0]]=''
      old=next(l for l in SRC['LESSONS'] if l['id']==g[0]['old'])
      th=' '.join(dict.fromkeys(thshort(w['th']) for w in g[:3] if thshort(w['th'])))
      if len(th)>18:th=' '.join(dict.fromkeys(thshort(w['th']) for w in g[:2] if thshort(w['th'])))
      th=TOVR.get(n,{}).get(code,th)
      can=f"ใช้คำเกี่ยวกับ{clean(old['th'])} {len(g)} คำ"
      les.append(f"{{id:{lid},v3:1,kind:'lex',code:'{pi}-{k}',th:{js(th)},zh:{js(zs[0])},chapter:{cid},emoji:{js(old.get('emoji') or '📖')},can:{js(can)},story:'',\n words:[{','.join(wsrc)}],\n sents:{js(sents)},\n fr:{js(fr)},dlg:{js(dlo)},rq:{js(rq)}}}")
      stat['lex']+=1;stat['words']+=len(g)
      if len(sents)<3:stat['few_sents']+=1
    pic=[w['zh'] for w in pws if w['zh'] in ART]
    scene=pic[:9] if len(pic)>=4 else []
    if scene:stat['scene']+=1
    les.append(f"{{id:{n*10000+pi*100+99},v3:1,kind:'gate',code:'{pi}-✓',th:{js('ด่านทบทวน: '+clean(c['th']))},zh:{js(c['zh'])},chapter:{cid},emoji:'⭐',can:'ทบทวนทั้งตอน ผ่าน 70% ขึ้นไป',story:'',scene:{js(scene)},words:[],sents:[],fr:null,dlg:[],rq:null}}")
    stat['gate']+=1
  off=len(OFF[n]);cov=len([w for w in WS[n] if w['zh'] in OFF[n]])
  hdr=f"LVMETA[{n}]={{standard:'HSK 2.0',original:true,official:{off},covered:{cov},v3:1}};\n/* ระดับ {n} โครงใหม่ (v3) · {len(chap)} ตอน · บทละไม่เกิน {MAXW[n]} คำ · ประโยคใช้เฉพาะคำที่สอนแล้ว · ด่านทบทวนท้ายตอน\n   สร้างจาก tools/lv-build/build_lv.py — อย่าแก้ไฟล์นี้ด้วยมือ */\n"
  out=hdr+"CHAPTERS.push(\n"+",\n".join(chap)+"\n);\nLESSONS.push(\n"+",\n".join(les)+"\n);\n"
  out+=f"/* รอบเรียนระดับ {n} เดิม → คำในรอบนั้น (ย้ายความคืบหน้าให้ผู้เรียนเดิม) */\nObject.assign(OLD_L1,{js(oldmap)});\n"
  if n not in LEVELS:continue
  open(R+f'/data/hsk{n}.js','w').write(out)
  json.dump(sorted(audio),open(D+f'/audio-l{n}.json','w'),ensure_ascii=False,indent=0)
  print('level',n,dict(stat),file=sys.stderr)
