#!/usr/bin/env python3
# สร้าง data/stroke/*.json จาก hanzi-writer-data 2.0.1 (Arphic Public License) + Make Me a Hanzi dictionary + cnchar-order (ชื่อขีด)
import json,os,re,sys,math,shutil
W='/workspace/stroke-order/work'
OUT=os.environ.get('OUT','/workspace/teepuan-games/chinese-class-web/data/stroke')
os.makedirs(OUT,exist_ok=True)
cov=open(W+'/covered.txt',encoding='utf8').read().strip()  # 6,866 ตัวแรก = 通用规范汉字表 ∩ hanzi-writer-data
# v2 (2026-10-29): เพิ่มตัวนอก 通用规范汉字表 ที่ใช้จริง ตามรายการ tools/stroke-build/extra_chars.txt
# เกณฑ์: (ก) ตัวที่ปรากฏในแอป เช่น ตัวข้าง/ส่วนประกอบ/ตัวเต็มในหน้า rad (ข) ตัวเต็มของตัวย่อ (Unihan kTraditionalVariant)
# (ค) ตัวใน Big5 (ไต้หวัน/ฮ่องกง ใช้บนป้าย/ชื่อ) — เฉพาะตัวที่ Make Me a Hanzi graphics.txt / hanzi-writer-data มีข้อมูลจริง ไม่วาดเอง; ตัวโบราณ/หายากมากไม่เอา
_extra=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'extra_chars.txt'),encoding='utf8').read().strip()
_have=set(json.loads(l)['character'] for l in open(W+'/graphics.txt',encoding='utf8'))
_have={c for c in _have&set(_extra) if os.path.exists(W+'/package/'+c+'.json')}
cov+=''.join(sorted(_have-set(cov)))
NAMES=json.load(open(W+'/names_all2.json',encoding='utf8'))
DIC={}
for l in open(W+'/dictionary.txt',encoding='utf8'):
    j=json.loads(l);DIC[j['character']]=j
# ---- ชนิดขีด (ร่างภาษาไทย รอครูตรวจ) ----
T=[('横','héng','ขีดนอน','ลากจากซ้ายไปขวา'),
('竖','shù','ขีดตั้ง','ลากจากบนลงล่าง'),
('撇','piě','ขีดปาดซ้าย','ลากเฉียงลงไปทางซ้าย'),
('点','diǎn','จุด','จิ้มลงเฉียงขวาสั้นๆ'),
('捺','nà','ขีดปาดขวา','ลากเฉียงลงไปทางขวา ปลายหนา'),
('提','tí','ขีดปัดขึ้น','ลากเฉียงขึ้นไปทางขวา'),
('横折','héng zhé','นอนแล้วหักลง','ลากไปขวา แล้วหักลงล่าง'),
('横钩','héng gōu','นอนตวัดตะขอ','ลากไปขวา แล้วสะบัดตะขอลงซ้าย'),
('横撇','héng piě','นอนแล้วปาดซ้าย','ลากไปขวา แล้วปาดเฉียงลงซ้าย'),
('横折钩','héng zhé gōu','นอนหักตวัดตะขอ','ลากไปขวา หักลง แล้วตวัดตะขอไปซ้าย'),
('竖钩','shù gōu','ตั้งตวัดตะขอ','ลากลง → ตวัดตะขอขึ้น'),
('撇折','piě zhé','ปาดซ้ายแล้วหัก','ปาดลงซ้าย แล้วหักไปทางขวา'),
('竖弯钩','shù wān gōu','ตั้งโค้งตะขอ','ลากลง โค้งไปขวา แล้วตวัดตะขอขึ้น'),
('竖提','shù tí','ตั้งแล้วปัดขึ้น','ลากลง แล้วปัดเฉียงขึ้นไปขวา'),
('竖弯','shù wān','ตั้งโค้งขวา','ลากลง แล้วโค้งไปทางขวา'),
('斜钩','xié gōu','ตะขอเฉียง','ลากเฉียงลงไปขวาโค้งๆ แล้วตวัดตะขอขึ้น'),
('卧钩','wò gōu','ตะขอนอน','ลากโค้งลงแล้วไปขวา ตวัดตะขอขึ้น'),
('竖折折钩','shù zhé zhé gōu','ตั้งหักหักตะขอ','ลากลง หักขวา หักลง แล้วตวัดตะขอ'),
('撇点','piě diǎn','ปาดแล้วจุด','ปาดลงซ้าย แล้วจิ้มเฉียงขวา'),
('横折折折钩','héng zhé zhé zhé gōu','นอนหักสามทบตะขอ','ลากไปขวา หักลง หักขวา หักลง แล้วตวัดตะขอ'),
('横折折撇','héng zhé zhé piě','นอนหักหักปาดซ้าย','ลากไปขวา หักลง หักขวา แล้วปาดเฉียงลงซ้าย'),
('横折提','héng zhé tí','นอนหักปัดขึ้น','ลากไปขวา หักลง แล้วปัดเฉียงขึ้น'),
('弯钩','wān gōu','ตะขอโค้ง','ลากโค้งลง แล้วตวัดตะขอ'),
('横折折','héng zhé zhé','นอนหักหัก','ลากไปขวา หักลง แล้วหักไปขวาอีกครั้ง'),
('竖折撇','shù zhé piě','ตั้งหักปาดซ้าย','ลากลง หักขวา แล้วปาดเฉียงลงซ้าย'),
('横折折折','héng zhé zhé zhé','นอนหักสามทบ','ลากไปขวา หักลง หักขวา แล้วหักลงอีก'),
('横斜钩','héng xié gōu','นอนเฉียงตะขอ','ลากไปขวาแล้วเฉียงลงโค้งๆ ตวัดตะขอขึ้น'),
('横撇弯钩','héng piě wān gōu','นอนปาดโค้งตะขอ','ลากไปขวา ปาดลงซ้าย โค้งไปขวา แล้วตวัดตะขอ')]
TI={t[0]:i for i,t in enumerate(T)}
def norm(n):
    n=re.sub(r'\d','',n)
    return n
def geo(med):
    p=med;L=[math.dist(p[i],p[i+1]) for i in range(len(p)-1)]
    tot=sum(L) or 1
    xs=[q[0] for q in p];ys=[q[1] for q in p]
    return tot,L,max(xs)-min(xs),max(ys)-min(ys)
def resolve(n,med):
    alts=[norm(a) for a in n.split('|')]
    if len(alts)==1: return alts[0],0
    tot,L,w,h=geo(med)
    if set(alts)=={'横撇','横钩'}:
        xs=[q[0] for q in med];im=xs.index(max(xs))
        tail=sum(L[im:])
        return ('横撇' if tail/tot>=0.27 else '横钩'),1
    if set(alts)=={'斜钩','卧钩'}:
        return ('卧钩' if w>=0.85*h else '斜钩'),1
    return alts[0],1
# ---- IDS แยกลูกระดับบนสุด ----
AR={'⿰':2,'⿱':2,'⿲':3,'⿳':3,'⿴':2,'⿵':2,'⿶':2,'⿷':2,'⿸':2,'⿹':2,'⿺':2,'⿻':2,'⿼':2,'⿽':2}
def parse(s,i=0):
    c=s[i]
    if c in AR:
        j=i+1;ch=[]
        for _ in range(AR[c]):
            sub,j=parse(s,j);ch.append(sub)
        return ('N',c,ch),j
    return ('L',c),i+1
def flat(node):
    if node[0]=='L':return node[1]
    return node[1]+''.join(flat(c) for c in node[2])
def children(ids):
    try:
        t,_=parse(ids)
    except Exception: return None
    if t[0]=='L':return None
    return [flat(c) for c in t[2]]
SC=[]
stats={'ambig':0,'noname':0,'nocomp':0,'chars':0,'bytes':0,'nlenbad':0}
amb_list=[]
LIC='Arphic Public License (1999) - derived from hanzi-writer-data 2.0.1 / Make Me a Hanzi; modified: compact JSON, added n,k,cp,d fields; stroke names from cnchar-order (MIT); see data/stroke/ARPHICPL.TXT & NOTICE.md'
for ch in cov:
    d=json.load(open(W+'/package/'+ch+'.json',encoding='utf8'))
    n_s=len(d['strokes'])
    o={'lic':'APL-modified','strokes':d['strokes'],'medians':d['medians']}
    if d.get('radStrokes'):o['radStrokes']=d['radStrokes']
    nm=NAMES.get(ch)
    if nm and len(nm)==n_s:
        ids=[];fl=[]
        for i,n in enumerate(nm):
            t,a=resolve(n,d['medians'][i])
            if t not in TI:
                t=norm(n.split('|')[0])
            if t not in TI: ids=None;break
            ids.append(TI[t])
            if a: stats['ambig']+=1;amb_list.append((ch,i+1,n,t))
        if ids:
            # report5 M3: ชื่อขีด/ทิศสลับกับรูปทรงในข้อมูลต้นทาง → ซ่อนชื่อ (-1 = แสดง "ขีดที่ N")
            for si in {'滚':[6,7],'漫':[10,11],'盖':[5,6],'篝':[13,14,15],'馒':[10,11]}.get(ch,[]): ids[si-1]=-1
            o['n']=ids
        else:stats['noname']+=1
    else:
        stats['noname']+=1
        if nm:stats['nlenbad']+=1
    e=DIC.get(ch)
    if e:
        ids=e.get('decomposition','')
        o['d']=ids
        ch_list=children(ids)
        mt=e.get('matches')
        if ch_list and mt and len(mt)==n_s and all(m for m in mt):
            k=[m[0] for m in mt]
            if max(k)<len(ch_list):
                et=e.get('etymology') or {}
                rad=e.get('radical');phon=et.get('phonetic');sem=et.get('semantic')
                cp=[]
                for c in ch_list:
                    role='o'
                    if c==phon:role='p'
                    elif c==sem or c==rad:role='r'
                    cp.append([c,role])
                if not any(r=='r' for _,r in cp) and rad:
                    # radical อาจอยู่ในส่วนย่อยของลูก
                    for i,c in enumerate(ch_list):
                        if rad in c and len(c)>1 and cp[i][1]=='o':cp[i][1]='r';break
                o['k']=k;o['cp']=cp
                if et.get('type'):o['ty']={'pictographic':'g','ideographic':'i','pictophonetic':'p'}.get(et['type'],'')
            else: stats['nocomp']+=1
        else: stats['nocomp']+=1
        if e.get('radical'):o['rad']=e['radical']
        if e.get('pinyin'):o['py']=e['pinyin'][:3]
    SC.append(n_s)
    s=json.dumps(o,ensure_ascii=False,separators=(',',':'))
    fn=OUT+'/%x.json'%ord(ch)
    open(fn,'w',encoding='utf8').write(s)
    stats['chars']+=1;stats['bytes']+=len(s.encode())
print(stats)
json.dump(amb_list,open('/workspace/stroke-order/build/ambiguous.json','w',encoding='utf8'),ensure_ascii=False)
# index.js
idx='/* ข้อมูลลำดับขีด: ดัชนีตัวอักษรที่มีข้อมูล + ชื่อชนิดขีด (ชื่อไทยเป็น "ร่าง รอครูตรวจ")\n   ข้อมูลเส้นขีดมาจาก hanzi-writer-data 2.0.1 (Arphic Public License) ที่ดัดแปลงแล้ว · ดู data/stroke/NOTICE.md */\n'
idx+='const STK_COV='+json.dumps(cov,ensure_ascii=False)+';\n'
B36='0123456789abcdefghijklmnopqrstuvwxyz'
idx+='const STK_SC='+json.dumps(''.join(B36[min(35,n)] for n in SC))+';/* จำนวนขีดต่อตัว (base36) เรียงตาม STK_COV */\n'
idx+='const STK_T='+json.dumps(T,ensure_ascii=False,separators=(',',':'))+';\n'
G={}
for f in ('table_core.md','table_bonus.md'):
    for l in open('/workspace/radicals/work/'+f,encoding='utf8'):
        p=[x.strip() for x in l.split('|')]
        if len(p)>4 and p[1][:1] in '0123456789B':
            for c in p[2].split('/'):
                c=c.strip()
                if c:G[c]=p[3]
idx+='const STK_GLOSS='+json.dumps(G,ensure_ascii=False,separators=(',',':'))+';\n'
open(OUT+'/index.js','w',encoding='utf8').write(idx)
for f,src in [('ARPHICPL.TXT','/workspace/stroke-order/research/ARPHICPL.TXT'),('MMAH-COPYING.txt','/workspace/stroke-order/research/mmah_COPYING.txt')]:
    shutil.copy(src,OUT+'/'+f)
print('amb',len(amb_list))
