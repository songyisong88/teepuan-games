#!/usr/bin/env python3
"""สร้าง data/pinyin/syllables.js จากคลิปเสียงเดี่ยว (1 ตัวอักษร) ที่มีอยู่ใน audio-index.js เท่านั้น
 - ใช้พินอินจากบทเรียนก่อน ถ้าไม่มีใน lesson ใช้ pypinyin เฉพาะตัวที่อ่านได้เสียงเดียว
 - OVERRIDE = ตัวที่ตรวจมือแล้ว (หลายเสียงแต่ต้องการเสียงนี้)
 - ไม่สร้างเสียงใหม่ ไม่มีเสียงของ 'ตัวอักษรเดี่ยว' (b, p, ü ...) เพราะไม่มีคลิป
 รัน: node tools/dump.cjs && python3 tools/pinyin-build/build_pinyin.py"""
import json,re,unicodedata,os
from pypinyin import pinyin,Style
ROOT=os.path.join(os.path.dirname(__file__),'..','..')
import sys
L=json.load(open(sys.argv[1] if len(sys.argv)>1 else '/tmp/cn-lessons.json'))
src=open(os.path.join(ROOT,'audio-index.js'),encoding='utf8').read()
A=json.loads(src[src.index('{'):src.rindex('}')+1])
single=[k for k in A if len(k)==1]
OVERRIDE={'八':'bā','麻':'má','一':'yī','不':'bù','破':'pò','摸':'mō','披':'pī','发':'fā','都':'dōu','啊':'a','二':'èr','雨':'yǔ','五':'wǔ','饿':'è','去':'qù','七':'qī','西':'xī','是':'shì','吃':'chī','四':'sì','日':'rì','字':'zì','菜':'cài','草':'cǎo','才':'cái','热':'rè','做':'zuò','人':'rén','说':'shuō','书':'shū','出':'chū','茶':'chá','喝':'hē','水':'shuǐ','月':'yuè','六':'liù','九':'jiǔ','十':'shí','三':'sān','朝':'cháo','我':'wǒ','有':'yǒu','无':'wú','哈':'hā','开':'kāi','看':'kàn','高':'gāo','小':'xiǎo','先':'xiān','请':'qǐng','个':'gè','鱼':'yú','课':'kè','刻':'kè','苦':'kǔ','太':'tài','条':'tiáo','能':'néng','拿':'ná','老':'lǎo','来':'lái','家':'jiā','马':'mǎ','骂':'mà','妈':'mā','吗':'ma','吧':'ba'}
lw={}
for l in L['LESSONS']:
    for w in l['words']:
        if len(w['zh'])==1: lw.setdefault(w['zh'],set()).add(w['py'])
TM={'\u0304':1,'\u0301':2,'\u030c':3,'\u0300':4}
INI=['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w']
def parse(s):
    d=unicodedata.normalize('NFD',s);t=5;o=''
    for ch in d:
        if ch in TM:t=TM[ch]
        elif ch=='\u0308':o=o[:-1]+'ü'
        else:o+=ch
    o=unicodedata.normalize('NFC',o)
    ini=''
    for i in INI:
        if o.startswith(i):ini=i;break
    return ini,o[len(ini):],t
out={}
for c in single:
    if c in OVERRIDE:p=OVERRIDE[c]
    elif c in lw and len(lw[c])==1:p=list(lw[c])[0]
    elif c in lw:continue
    else:
        h=pinyin(c,style=Style.TONE,heteronym=True)[0]
        if len(h)!=1:continue
        p=h[0]
    if not re.fullmatch(r"[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüê]+",p):continue
    ini,fin,t=parse(p)
    # y/w ต้นพยางค์ถือเป็น 'เขียนแทน' ไม่ใช่พยัญชนะต้น: เก็บเป็น ini='' เพื่อใช้ในด่านสระ/กฎการเขียน
    out[c]=[p,ini,fin,t]
os.makedirs(os.path.join(ROOT,'data','pinyin'),exist_ok=True)
rows=[[c]+v for c,v in sorted(out.items(),key=lambda kv:(kv[1][1],kv[1][2],kv[1][3]))]
open(os.path.join(ROOT,'data','pinyin','syllables.js'),'w',encoding='utf8').write('/* สร้างโดย tools/pinyin-build/build_pinyin.py — [ตัวอักษร, พินอิน, ต้น, ท้าย, เสียง] เฉพาะตัวที่มีคลิปเสียงจริงในแอป */\nwindow.PIN_SYL='+json.dumps(rows,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(rows),'syllable clips')
