# เลือกตัวจาก animCJK ที่จะเพิ่ม → acjk_chars.txt (ดู build_strokes.py v3)
# (ก) 通用规范汉字表 ระดับ 1-3 (level-*.txt จาก shengdoushi/common-standard-chinese-characters-table) ที่ hanzi-writer-data ไม่มี
# (ข) ส่วนประกอบที่แอปใช้แต่ไม่มีข้อมูล (APP)  ·  ตัดตัวที่จำนวนขีดไม่ตรง Unihan kTotalStrokes และไม่ตรงหมวดขีดในตารางทางการ (DROP)
import json,os
W='/workspace/stroke-order';A=W+'/acjk'
G={j['character'] for j in map(json.loads,open(A+'/graphicsZhHans.txt',encoding='utf8'))}
HW={f[:-5] for f in os.listdir(W+'/work/package') if f.endswith('.json')}
L8={c for l in (1,2,3) for c in open(f'{A}/level-{l}.txt',encoding='utf8').read() if c.strip()}
APP=set('⺕⺝⺤⺫⻌⻍⻎⻏⻖⻗冃𠂢𠂤𢦏')
DROP=set('滫')  # animCJK 14 ขีด แต่ตารางทางการจัดไว้หมวด 13 ขีด
add=sorted((((L8-HW)&G)|(APP&G))-DROP,key=ord)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'acjk_chars.txt'),'w',encoding='utf8').write(''.join(add)+'\n')
print(len(add))
