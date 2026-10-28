#!/usr/bin/env python3
"""สร้าง data/rad/rad.js (เส้นทาง "เรียนตัวอักษร") — ดู README.md
อินพุต: ตารางตัวข้างที่ร่างไว้ (table_core.md / table_bonus.md ในโฟลเดอร์นี้) + MMAH dictionary/graphics (LGPL-3)
        + chars.json (สรุป MMAH ของ 1,827 ตัวในบทเรียน) + ชั้นแก้ไขของเรา fixes.json
ข้อความไทยทั้งหมดเป็น "ร่าง รอครูตรวจ" """
import json,re,sys,os,unicodedata
HERE=os.path.dirname(os.path.abspath(__file__))
WORK='/workspace/radicals/work/'; SO='/workspace/stroke-order/work/'
OUT=os.path.join(HERE,'..','..','data','rad','rad.js')
chars=json.load(open(WORK+'chars.json')); by={c['ch']:c for c in chars}
fixes=json.load(open(os.path.join(HERE,'fixes.json'),encoding='utf8'))
# ---- MMAH dictionary + graphics (matches) ----
dic={}
for l in open(SO+'dictionary.txt',encoding='utf8'):
    try:j=json.loads(l)
    except: continue
    dic[j['character']]=j
gm={}
for l in open(SO+'graphics.txt',encoding='utf8'):
    j=json.loads(l)
    if j['character'] in by: gm[j['character']]=len(j['strokes'])
# report5 M4: พินอินที่ MMAH ให้ต่างจากที่ถูกต้อง → แก้ในชั้นของเรา
PYFIX={'绩':'jì','迹':'jì'}
for _c,_p in PYFIX.items():
    if _c in dic: dic[_c]['pinyin']=[_p]
    if _c in by: by[_c]['d']['py']=[_p]
# ---- ตารางที่ร่างไว้ ----
def parse(f):
    rows=[]
    for l in open(os.path.join(HERE,f),encoding='utf8'):
        if not l.startswith('|') or l.startswith('|---') or l.startswith('| #'):continue
        c=[x.strip() for x in l.strip().strip('|').split('|')]
        rows.append(c)
    return rows
core=parse('table_core.md'); bonus=parse('table_bonus.md')
TR={'✅':3,'◐':2,'△':1}
cur={}
for r in core+bonus:
    gl=r[1]; 
    if gl.startswith('⺮'): gl='⺮'
    cur[gl]=dict(no=r[0],id=gl,th=r[2],mean=r[3],mn=r[4],ex=r[5].split(),tr=TR[r[8].strip()],bonus=r[0].startswith('B'))
ZONES=fixes['zones']; FORMS=fixes['forms']; META=fixes['meta']
order=[]
for z,zd in enumerate(ZONES):
    for g in zd['ids']: order.append((g,z))
assert len(order)==60 and set(g for g,_ in order)==set(cur), set(cur)^set(g for g,_ in order)
# ---- IDS tree ----
OP2='⿰⿱⿴⿵⿶⿷⿸⿹⿺⿻'; OP3='⿲⿳'
def parse_ids(s):
    pos=[0]
    def node():
        c=s[pos[0]];pos[0]+=1
        if c in OP2: return [c,node(),node()]
        if c in OP3: return [c,node(),node(),node()]
        return c
    try:
        t=node()
        return t if pos[0]==len(s) else None
    except IndexError: return None
def leaves(t,path=()):
    if isinstance(t,str): yield t,path; return
    for i,ch in enumerate(t[1:]): yield from leaves(ch,path+(i,))
def toph(t): return t
# ---- ส่วนประกอบเสียง ----
def norm(p): 
    p=unicodedata.normalize('NFD',p);return ''.join(ch for ch in p if not unicodedata.combining(ch) or False)
def tonestrip(p):
    p=unicodedata.normalize('NFD',p.lower()); p=''.join(ch for ch in p if ord(ch) not in (0x300,0x301,0x304,0x30C)); return unicodedata.normalize('NFC',p).replace('ü','v')
def pyof(c):
    if c in by and by[c]['d'].get('py'): return by[c]['d']['py'][0]
    j=dic.get(c)
    return j['pinyin'][0] if j and j.get('pinyin') else None
# ---- สมาชิกของแต่ละตัวข้าง ----
mem={g:[] for g,_ in order}
roles={}
CH={}
# ตัวอักษรในบทเรียน (เรียงตามระดับและลำดับที่พบ)
for c in chars:
    ch=c['ch'];d=c['d'] or {};dec=d.get('dec');et=d.get('et') or {}
    if not dec: continue
    t=parse_ids(dec)
    ty=et.get('type'); sem=et.get('semantic'); ph=et.get('phonetic'); rad=d.get('rad')
    tcode={'pictophonetic':'p','ideographic':'i','pictographic':'g'}.get(ty,'-')
    row={'py':(d.get('py') or [''])[0],'dec':dec,'t':tcode,'sem':sem or '','ph':ph or '','rad':rad or ''}
    if tcode=='p' and ph:
        pp=pyof(ph);cp=(d.get('py') or [''])[0]
        row['pp']=pp or ''
        if pp and cp:
            row['m']=2 if pp==cp else 1 if tonestrip(pp)==tonestrip(cp) else 0
        else: row['m']=-1
    # สังกัดตัวข้าง
    owners=[]
    for g,_ in order:
        fs=FORMS.get(g,[g])
        if (rad in fs or sem in fs):
            owners.append(g)
    # ชั้นแก้ไขของเรา
    for g in list(owners):
        if ch in fixes['exclude'].get(g,[]): owners.remove(g)
    for g,lst in fixes['include'].items():
        if ch in lst and g not in owners: owners.append(g)
    # ตำแหน่งขีดของส่วนที่เป็นตัวข้าง
    ss={}
    mt=None
    j=dic.get(ch)
    if j: mt=j.get('matches')
    for g in owners:
        fs=FORMS.get(g,[g]); node=None
        if t is not None:
            lv=list(leaves(t))
            cand=[p for l,p in lv if l in fs]
            if cand: node=cand[0]
        if node is not None and mt:
            idx=[i for i,m in enumerate(mt) if m and tuple(m[:len(node)])==node]
            if idx: ss[g]=idx
    row['o']=owners
    row['ss']=ss
    if owners or tcode=='p' or True: CH[ch]=row
    for g in owners: mem[g].append(ch); roles[(g,ch)]='w' if ch in fixes['weak'].get(g,[]) else 's' if (sem in FORMS.get(g,[g]) or ch in fixes['include'].get(g,[]) or (rad in FORMS.get(g,[g]) and g in ss)) else 'w'
# ---- สถิติ ----
tot=len(chars)
print('chars',tot)
for g,z in order:
    miss=[c for c in cur[g]['ex'] if c not in mem[g]]
    print(z+1,g,cur[g]['th'],len(mem[g]),'sem',sum(1 for c in mem[g] if roles[(g,c)]=='s'),'MISSING-EX',miss if miss else '')
import collections
# ---- ครอบครัวส่วนเสียง ----
ph=collections.defaultdict(list)
for ch,r in CH.items():
    if r['t']=='p' and r['ph'] and r.get('pp'): ph[r['ph']].append((ch,r['m']))
# ---- เขียนไฟล์ ----
def levels_for(g):
    lv=[by[c]['lv'] for c in mem[g]]
    return min(lv) if lv else 0
rad=[]
for no,(g,z) in enumerate(order,1):
    cu=cur[g];m=META[g]
    ex=[c for c in cu['ex'] if c in mem[g] or True]
    rad.append(dict(id=g,no=no,z=z,f=FORMS.get(g,[g]),py=m[0],or_=m[1],th=cu['th'],mean=cu['mean'],mn=cu['mn'],tr=cu['tr'],bonus=cu['bonus'],ex=ex,
                    card=m[2],em=m[3],pose=m[4],lv=levels_for(g),n=len(mem[g])))
js=['/* ข้อมูลเส้นทาง "เรียนตัวอักษร" — สร้างโดย tools/rad-build/build_rad.py ห้ามแก้มือ',
 '   การแยกส่วนประกอบมาจาก Make Me a Hanzi (LGPL-3, © Shaunak Kishore et al.) ผ่านชั้นแก้ไขของเรา (tools/rad-build/fixes.json)',
 '   ชื่อไทย/ตัวช่วยจำ/ชื่อการ์ดทั้งหมดเป็น "ร่าง รอครูตรวจ" · ดู data/rad/NOTICE.md */']
js.append('const RAD_Z='+json.dumps([{'n':z['n'],'sub':z['sub'],'em':z['em']} for z in ZONES],ensure_ascii=False,separators=(',',':'))+';')
js.append('const RAD='+json.dumps(rad,ensure_ascii=False,separators=(',',':'))+';')
memo={g:{'s':[c for c in l if roles[(g,c)]=='s'],'w':[c for c in l if roles[(g,c)]=='w']} for g,l in mem.items()}
js.append('const RAD_MEM='+json.dumps(memo,ensure_ascii=False,separators=(',',':'))+';')
js.append('/* ตัวอักษร -> [โครงสร้าง, ชนิด(p=บอกเสียง i=รวมความหมาย g=รูปภาพ), ส่วนความหมาย, ส่วนเสียง, พินอินส่วนเสียง, ตรงเสียง(2=เป๊ะ 1=ตรงพยางค์ 0=ไม่ตรง -1=ไม่ทราบ), {ตัวข้าง:[ลำดับขีด]}] */')
js.append('const RAD_CH='+json.dumps({k:[v['dec'],v['t'],v['sem'],v['ph'],v.get('pp',''),v.get('m',-1),v['ss'],v['py']] for k,v in CH.items()},ensure_ascii=False,separators=(',',':'))+';')
import re
RP={}
for k,v in CH.items():
    m=re.match(r'^[⿰⿱⿸⿺⿵⿷⿶⿹](.)(.)$',v['dec'])
    if m:
        for p in m.groups():
            q=pyof(p)
            if q: RP[p]=q
js.append('/* ส่วนประกอบ -> พินอิน (ใช้ในเกมประกอบร่าง) */')
js.append('const RAD_PY='+json.dumps(RP,ensure_ascii=False,separators=(',',':'))+';')
# ทุกคู่ส่วนประกอบสองชิ้นที่ประกอบเป็นตัวอักษรจริง (MMAH ทั้งหมด ~9.5 พันตัว ไม่สนใจเครื่องหมายโครงสร้าง) ไว้กรองตัวเลือกลวงของเกมประกอบร่าง
PR=set()
for ch,j in dic.items():
    m=re.match(r'^[⿰⿱⿲⿳⿸⿺⿵⿷⿶⿹⿴⿻](.)(.)$',j.get('decomposition',''))
    if m and '？' not in m.groups() and not (0x2FF0<=ord(m.group(1))<=0x2FFB) and not (0x2FF0<=ord(m.group(2))<=0x2FFB): PR.add(m.group(1)+m.group(2))
js.append('/* คู่ส่วนประกอบที่ประกอบเป็นตัวอักษรจริง (ลองทั้งสองลำดับ) — ใช้กรองตัวเลือกลวง */')
js.append("const RAD_PAIRS='"+' '.join(sorted(PR))+"';")
open(OUT,'w',encoding='utf8').write('\n'.join(js)+'\n')
print('wrote',OUT,os.path.getsize(OUT))
ex=collections.Counter(r.get('m',-1) for r in CH.values() if r['t']=='p')
print('phonetic match',dict(ex))
