# ตรวจว่าพินอินแต่ละคู่ อ่านตรงกับอักษรจีนคู่ของมัน (เทียบแบบไม่มีวรรณยุกต์) · ใช้หลัง build.js (อ่าน pairs.json)
import json,sys,os,re,unicodedata
from pypinyin import lazy_pinyin,Style,load_phrases_dict
d=json.load(open(os.path.join(os.path.dirname(__file__),'pairs.json')))
def norm(s):s=unicodedata.normalize('NFD',s.lower());return re.sub(r"[^a-z]","",s.replace('ü','v').replace('u\u0308','v'))
bad=0
for e in d:
  for r in e['R']:
    z=e['zh'][r['z'][0]:r['z'][1]];p=e['py'][r['p'][0]:r['p'][1]]
    if re.search(r'[0-9A-Za-z]',z):continue  # ตัวเลข/คำย่อละติน ตรวจด้วยตา
    cands=set()
    import itertools
    from pypinyin import pinyin
    opts=pinyin(z,style=Style.NORMAL,heteronym=True)
    opts=[sorted(set(o)|set(pinyin(ch,style=Style.NORMAL,heteronym=True)[0])) for ch,o in zip(z,opts)]  # รวมเสียงอ่านรายตัว (คำวลีบางคำ pypinyin ให้เสียงเดียว เช่น 不得了)
    opts=[o+['r'] if ch=='儿' and i>0 else o for i,(ch,o) in enumerate(zip(z,opts))]  #儿化音 (r) หรือ 儿 เต็มพยางค์ (ér)
    for combo in itertools.islice(itertools.product(*opts),200):cands.add(norm(''.join(combo)))
    if norm(p).replace('v','u') not in {c.replace('v','u') for c in cands}:
      bad+=1;print(f"{e['k']}: {z} ≠ {p}   ({e['zh']})")
print('ไม่ตรง',bad)
