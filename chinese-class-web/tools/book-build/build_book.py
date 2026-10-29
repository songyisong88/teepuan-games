# ห้องเรียนคู่หนังสือ: สร้างข้อมูลบท + แทร็กเสียง + ไฟล์เสียง จากต้นฉบับหนังสือ
# ใช้: python3 tools/book-build/build_book.py            (ข้อมูล + เสียงที่ยังขาด)
#      python3 tools/book-build/build_book.py --no-audio (ข้อมูลอย่างเดียว ไม่สร้างเสียง)
# อ่าน:  TOC  = /workspace/books/beginner-book/TOC-final.md
#        แทร็ก = /workspace/books/beginner-book/full/audio-tracks.json
#                (ถ้ายังไม่มี ใช้ full/build/audio-part*.json แทนชั่วคราว)
# เขียน: data/book1.js (บท) · data/book1-tracks.js (แทร็ก) · data/book1-audio.js (ดัชนีเสียงเพิ่มเติม) · audio/<hash>.mp3
# หลังรันแล้ว: node build.js
import re,json,os,sys,glob,hashlib,asyncio,subprocess,unicodedata as ud
D=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(D+'/../..')
BOOK=os.environ.get('BOOK_DIR','/workspace/books/beginner-book')
TOC=BOOK+'/TOC-final.md'
TRACKS=BOOK+'/full/audio-tracks.json'
TRACKS_FALLBACK=sorted(glob.glob(BOOK+'/full/build/audio-part*.json'))
CACHE=D+'/cache';os.makedirs(CACHE,exist_ok=True)
NO_AUDIO='--no-audio' in sys.argv
hid=lambda k:hashlib.sha1(k.encode()).hexdigest()[:8]
CJK=r'\u3400-\u9fff'
ZHP='，。！？、；：“”…'
THAI=r'\u0e00-\u0e7f'

# ---------- พินอิน: แยกพยางค์ด้วยการเทียบกับตัวอักษร (ใส่ | ระหว่างพยางค์ในคำเดียวกัน) ----------
from pypinyin import lazy_pinyin,Style
from pypinyin.pinyin_dict import pinyin_dict as PD
def bare(s):return ''.join(c for c in ud.normalize('NFD',s.lower()) if 'a'<=c<='z' or c=='\u0308').replace('u\u0308','v')
def split_py(zh,py):
    hz=[c for c in zh if re.match('['+CJK+']',c)]
    if not hz or not py:return py
    syl=[bare(s) for s in lazy_pinyin(''.join(hz),style=Style.NORMAL,v_to_u=False)]
    syl=[s if s!='r' else 'r' for s in syl]
    out='';i=0;need=None;buf=''
    letters=[c for c in py]
    # เดินทีละตัว: นับเฉพาะตัวอักษรละติน เทียบความยาวพยางค์
    lens=[len(s) for s in syl];k=0;cnt=0;res=''
    for c in letters:
        b=bare(c)
        if b:
            if k<len(lens) and cnt==lens[k]:
                # ขึ้นพยางค์ใหม่: ถ้ายังอยู่ในคำเดียวกันให้คั่นด้วย |
                if res and (bare(res[-1]) or res[-1] in "'’"):res+='|'
                k+=1;cnt=0
            cnt+=len(b)
        res+=c
    if bare(py)!=''.join(syl):return py
    return res
def tone_of(s):
    for c in ud.normalize('NFD',s):
        if c in '\u0304\u0301\u030c\u0300':return '\u0304\u0301\u030c\u0300'.index(c)+1
    return 5

# ---------- อ่าน TOC ----------
def parse_toc():
    L=open(TOC,encoding='utf-8').read().split('\n')
    parts=[];cur=None;sec=None
    for ln in L:
        if ln.startswith('## ภาคผนวก'):break
        m=re.match(r'^## ภาค (\d+) (.+?) \(หน้า (\d+)[–-](\d+)\)',ln)
        if m:
            cur=dict(n=int(m[1]),t=m[2].strip(),pg=f'{m[3]}–{m[4]}',goal='',ch=[],story=None,quiz=None);parts.append(cur);sec=None;continue
        if cur is None:continue
        m=re.match(r'^เป้าหมายของภาค:\s*(.+?)(?:\s·\sหน้าเปิดภาค.*)?$',ln)
        if m:cur['goal']=m[1].strip();continue
        m=re.match(r'^### บทที่ (\d+) (.+?) · หน้า (\d+)(?:[–-](\d+))?',ln)
        if m:
            sec=dict(n=int(m[1]),t=m[2].strip(),p0=int(m[3]),p1=int(m[4] or m[3]),topic='',goal='',voc=[],pron='');cur['ch'].append(sec);continue
        m=re.match(r'^### นิทานน้องลามา: (.+?) \((.+?)\) · หน้า (\d+)',ln)
        if m:
            sec=dict(zh=m[1].strip(),th=m[2].strip(),p=int(m[3]),lines=[]);cur['story']=sec;continue
        m=re.match(r'^### แบบทดสอบย่อยภาค (\d+)(?: \((\d+) ข้อ\))? · หน้า (\d+)',ln)
        if m:
            sec=dict(p=int(m[3]),q=int(m[2] or 10),fmt='');cur['quiz']=sec;continue
        if not ln.startswith('- ') or sec is None:continue
        b=ln[2:].strip()
        if 'lines' in sec:
            z=re.match(r'^([%s%s]+)\s+(.*)$'%(CJK,ZHP),b)
            if z:
                rest=z[2];t=re.search('['+THAI+']',rest);pi=rest[:t.start()].strip() if t else rest.strip();th=rest[t.start():].strip() if t else ''
                sec['lines'].append(dict(zh=z[1],py=split_py(z[1],pi),th=th))
            continue
        if 'fmt' in sec:
            if b.startswith('รูปแบบ:'):sec['fmt']=b[7:].strip()
            continue
        if b.startswith('หัวข้อ:'):sec['topic']=b[7:].strip()
        elif b.startswith('เป้าหมาย:'):sec['goal']=b[9:].strip()
        elif b.startswith('จุดออกเสียง:'):sec['pron']=b[12:].strip()
        elif re.match(r'^คำศัพท์ใหม่ \d+ คำ:',b):
            for it in b.split(':',1)[1].split(' · '):
                tk=it.strip().split(' ')
                zh=tk[0];i=1;py=[]
                while i<len(tk) and re.match(r"^[A-Za-zÀ-ɏ'’]+$",tk[i]) and not re.search('['+THAI+']',tk[i]):py.append(tk[i]);i+=1
                th=' '.join(tk[i:])
                if not re.match('^['+CJK+']+$',zh) or not py:print('WARN vocab',it,file=sys.stderr);continue
                sec['voc'].append(dict(zh=zh,py=split_py(zh,' '.join(py)),th=th))
    return parts

# ---------- อ่านแทร็ก (ชื่อฟิลด์อาจต่างกัน อ่านแบบยืดหยุ่น) ----------
def pick(d,*ks,default=None):
    for k in ks:
        if isinstance(d,dict) and k in d and d[k] not in (None,''):return d[k]
    return default
def load_tracks():
    src=None;rows=[]
    if os.path.exists(TRACKS):
        try:
            j=json.load(open(TRACKS,encoding='utf-8'));src=TRACKS
            rows=j if isinstance(j,list) else pick(j,'tracks','items','rows','data',default=[])
            if isinstance(rows,dict):rows=list(rows.values())
        except Exception as e:print('WARN อ่าน audio-tracks.json ไม่ได้:',e,file=sys.stderr)
    if src is None and TRACKS_FALLBACK:
        src=' + '.join(TRACKS_FALLBACK)
        for f in TRACKS_FALLBACK:
            try:rows+=json.load(open(f,encoding='utf-8'))
            except Exception as e:print('WARN',f,e,file=sys.stderr)
    out=[]
    for r in rows or []:
        if not isinstance(r,dict):continue
        tid=str(pick(r,'track','id','track_id','trackId','no','code',default='')).strip()
        tid=re.sub(r'^(?:แทร็ก|track)\s*','',tid,flags=re.I)
        m=re.match(r'^(\d+)[-–](\d+)$',tid)
        ch=pick(r,'chapter','ch','chap','lesson')
        try:ch=int(re.sub(r'\D','',str(ch))) if ch not in (None,'') else (int(m[1]) if m else None)
        except ValueError:ch=int(m[1]) if m else None
        part=pick(r,'part','section_part','unit')
        try:part=int(re.sub(r'\D','',str(part))) if part not in (None,'') else None
        except ValueError:part=None
        pg=pick(r,'page','pg','book_page')
        try:pg=int(re.sub(r'[^\d]','',str(pg))) if pg not in (None,'') else None
        except ValueError:pg=None
        items=pick(r,'items','lines','say',default=[])
        its=[]
        if isinstance(items,list):
            for x in items:
                if isinstance(x,dict):its.append(dict(zh=str(pick(x,'hanzi','zh','chinese','text',default='')),py=str(pick(x,'pinyin','py',default=''))))
                elif isinstance(x,(list,tuple)) and x:its.append(dict(zh=str(x[0]),py=str(x[1]) if len(x)>1 else ''))
                elif isinstance(x,str):its.append(dict(zh=x,py=''))
        text=str(pick(r,'text','script','zh','chinese',default=''))
        if not its and text:
            for seg in re.split(r'\s/\s|\n',text):
                z=re.match(r'^([%s%s\s]*[%s][%s%s]*)\s*(.*)$'%(CJK,ZHP,CJK,CJK,ZHP),seg.strip())
                its.append(dict(zh=z[1].strip(),py=z[2].strip()) if z else dict(zh='',py=seg.strip()))
        if not tid or ch is None:continue
        sec=str(pick(r,'section','where',default=''))
        kind=str(pick(r,'kind','type',default='lesson'))
        grp='ch'
        if re.search('นิทาน|เรื่องสั้น|story',sec,re.I):grp='story'
        elif re.search('แบบทดสอบ|quiz|test',sec,re.I):grp='quiz'
        ans=pick(r,'answer','answers','key','ans',default='')
        out.append(dict(id=tid,part=part,ch=ch,grp=grp,pg=pg,ex=str(pick(r,'exercise','title','label','q',default='')),
            kind='listening' if re.search('listen|ฟัง',kind,re.I) else 'lesson',note=str(pick(r,'note',default='')),
            ans=ans if isinstance(ans,(str,list)) else '',items=[dict(zh=i['zh'],py=split_py(i['zh'],i['py']) if i['zh'] else i['py']) for i in its if (i['zh'] or i['py'])]))
    return src,out

# ---------- เลขหน้าจริง (B5 เลขต่อเนื่องทั้งเล่ม) จาก PDF ที่จัดหน้าแล้ว full/partN/partN.pdf ----------
# เลขหน้าใน TOC-final เป็นแผนเดิม (A4) ไม่ตรงกับเล่มจริง จึงไม่ใช้เลขหน้าจาก TOC ในแอปเลย
def b5_pages():
    out={}  # key: c9 / s1 / q1 / p1 -> [หน้าแรก, หน้าสุดท้าย]
    for f in sorted(glob.glob(BOOK+'/full/part*/part*.pdf')):
        m=re.search(r'/part(\d+)/part\1\.pdf$',f)
        if not m:continue
        pn=int(m[1])
        try:n=int(re.search(r'Pages:\s+(\d+)',subprocess.check_output(['pdfinfo',f]).decode())[1])
        except Exception as e:print('WARN pdfinfo',f,e,file=sys.stderr);continue
        txt=subprocess.check_output(['pdftotext','-layout',f,'-']).decode('utf-8','ignore').split('\f')
        offs=[];lab=[];cur=None
        for i in range(n):
            L=[l for l in (txt[i] if i<len(txt) else '').split('\n') if l.strip()]
            if not L:lab.append(cur);continue
            for l in (L[-1],L[0]):
                mm=re.match(r'^\s*(\d{1,3})\s{2,}',l) or re.search(r'\s{2,}(\d{1,3})\s*$',l)
                if mm:offs.append(int(mm[1])-i);break
            head=re.sub(r'\s+','',''.join(L[:3]))
            if re.search('ทดสอบภาค|แบบทดสอบท้ายภาค',head):cur='q%d'%pn
            elif re.search('นิทานน้องลามา|เรื่องสั้นท้ายภาค',head):cur='s%d'%pn
            else:
                mm=re.search(r'บทที่ (\d+)',' '.join(L[:2]))
                if mm:cur='c'+mm[1]
                elif i==0:cur=None
            lab.append(cur)
        if not offs:continue
        from collections import Counter
        off=Counter(offs).most_common(1)[0][0]
        out['p%d'%pn]=[off,off+n-1]
        for i,k in enumerate(lab):
            if not k:continue
            pg=off+i;r=out.setdefault(k,[pg,pg]);r[0]=min(r[0],pg);r[1]=max(r[1],pg)
    return out

# ---------- เสียง ----------
def load_idx():
    s=open(R+'/audio-index.js',encoding='utf-8').read();return json.loads(s[s.index('{'):s.rindex('}')+1])
COMMON=''
for f in sorted(glob.glob(R+'/data/hsk*.js'))+[R+'/data/common.js']:
    try:COMMON+=''.join(dict.fromkeys(re.findall('['+CJK+']',open(f,encoding='utf-8').read())))
    except Exception:pass
COMMON=''.join(dict.fromkeys(COMMON))
ALIAS={'iu':'yōu','ui':'wēi','un':'wēn','ong':'wēng','ü':'yū','i':'yī','u':'wū','ju':'jū','xu':'xū','qu':'qū','yu':'yū'}
def mark(b,t):
    b=b.replace('v','ü')
    if t==5:return b
    M={'a':'āáǎà','o':'ōóǒò','e':'ēéěè','i':'īíǐì','u':'ūúǔù','ü':'ǖǘǚǜ'}
    if 'a' in b:v='a'
    elif 'e' in b:v='e'
    elif 'ou' in b:v='o'
    else:
        v=[c for c in b if c in 'aoeiuü'][-1]
    j=b.index(v) if v!=[c for c in b if c in 'aoeiuü'][-1] or v in 'aeo' else b.rindex(v)
    return b[:j]+M[v][t-1]+b[j+1:]
def char_for(syl):
    """พยางค์พินอินอย่างเดียว -> ตัวอักษรที่อ่านเสียงนั้นเสียงเดียว (ใช้กับเสียงสังเคราะห์)"""
    s=ud.normalize('NFC',syl.lower().strip("'’.,!?"))
    t=tone_of(s);b=bare(s)
    B={'i':'yi','u':'wu','v':'yu','iu':'you','ui':'wei','un':'wen','ong':'weng','ju':'ju','xu':'xu','qu':'qu'}
    if b in B or t==5:s=mark(B.get(b,b),1 if t==5 else t)
    def gb1(c):
        try:b=c.encode('gb2312');return 0xB0<=b[0]<=0xD7
        except Exception:return False
    first=lambda c:PD.get(ord(c),'').split(',')[0]
    G=[chr(k) for k in range(0x4e00,0x9fa6) if gb1(chr(k))];gs=set(G)
    pool=[c for c in COMMON if c in gs]+G
    cands=[c for c in pool if first(c)==s]
    if not cands:  # ไม่มีพยางค์นี้ในเสียงที่ระบุ ใช้เสียงอื่นของพยางค์เดียวกัน
        cands=[c for c in pool if bare(first(c))==bare(s)]
    return cands[0] if cands else None
def speak_text(it):
    if it['zh']:return it['zh']
    p=it['py']
    if not re.search(r'[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]',p):return None
    if "'" in p or '’' in p:  # เช่น Xī'ān
        cs=[char_for(x) for x in re.split(r"['’]",p)]
        return ''.join(cs) if all(cs) else None
    cs=[char_for(x) for x in re.split(r'[\s·]+',p) if x]
    cs=[c for c in cs if c]
    return '，'.join(cs) if cs else None
async def tts(text,path):
    import edge_tts
    for a in range(4):
        try:
            await edge_tts.Communicate(text,'zh-CN-XiaoxiaoNeural',rate='-8%').save(path)
            if os.path.getsize(path)>500:return True
        except Exception as e:print('retry',text,e,file=sys.stderr);await asyncio.sleep(3)
    return False
def dur(p):
    try:return round(float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p]).decode().strip()),1)
    except Exception:return None
def silence(sec):
    p=f'{CACHE}/sil_{sec}.mp3'
    if not os.path.exists(p):subprocess.run(['ffmpeg','-y','-loglevel','error','-f','lavfi','-i','anullsrc=r=24000:cl=mono','-t',str(sec),'-c:a','libmp3lame','-b:a','48k',p],check=True)
    return p

def main():
    parts=parse_toc()
    nch=sum(len(p['ch']) for p in parts)
    assert len(parts)==5 and nch==32,(len(parts),nch)
    src,tracks=load_tracks()
    print('TOC',len(parts),'ภาค',nch,'บท · คำศัพท์',sum(len(c['voc']) for p in parts for c in p['ch']),'คำ')
    print('แทร็ก',len(tracks),'จาก',src or '(ไม่มีไฟล์)')
    PG=b5_pages()
    print('เลขหน้า B5 จาก PDF:',{k:v for k,v in PG.items() if k[0] in 'pq'})
    for p in parts:
        tp=[t['pg'] for t in tracks if t['part']==p['n'] and t['pg']]
        r=PG.get('p%d'%p['n'])
        p['pg']=f"{r[0]}–{r[1]}" if r else ''
        for c in p['ch']:
            r=PG.get('c%d'%c['n']);tp=[t['pg'] for t in tracks if t['ch']==c['n'] and t['grp']=='ch' and t['pg']]
            if not r and tp:r=[min(tp),max(tp)]
            for k in ('p0','p1'):c.pop(k,None)
            if r:c['p0'],c['p1']=r
            for t in tp:
                if r and not r[0]<=t<=r[1]:print('WARN แทร็กบท',c['n'],'หน้า',t,'อยู่นอกช่วงบท',r,file=sys.stderr)
        for key,kind in (('story','s'),('quiz','q')):
            if not p[key]:continue
            r=PG.get('%s%d'%(kind,p['n']));tp=[t['pg'] for t in tracks if t['grp']==('story' if kind=='s' else 'quiz') and t['part']==p['n'] and t['pg']]
            p[key].pop('p',None)
            if r:p[key]['p']=r[0]
            elif tp:p[key]['p']=min(tp)
    idx=load_idx();extra={}
    # คำ/ประโยคที่ต้องมีเสียง: คำศัพท์ นิทาน จุดออกเสียง
    keys=[]
    for p in parts:
        for c in p['ch']:
            keys+=[v['zh'] for v in c['voc']]+re.findall('['+CJK+']+',c['pron'])
        if p['story']:keys+=[l['zh'] for l in p['story']['lines']]
    keys=[k for k in dict.fromkeys(keys) if k not in idx]
    # แทร็ก: ต่อเสียงทีละรายการ เว้นช่วง (โจทย์ฟังที่ระบุ "อ่าน 2 ครั้ง" อ่านซ้ำแล้วเว้น 3 วินาที)
    plan=[]
    for t in tracks:
        say=[s for s in (speak_text(i) for i in t['items']) if s]
        twice=t['kind']=='listening' and re.search('อ่าน 2 ครั้ง',t['note']+' '+t['ex'])
        sig='bk1|'+t['id']+'|'+('2|' if twice else '')+'/'.join(say)
        t['a']=hid(sig) if say else '';t['say']=len(say)
        if say:plan.append((t,say,twice))
    if not NO_AUDIO:
        clips=sorted({s for _,say,_ in plan for s in say})
        async def run():
            sem=asyncio.Semaphore(6)
            async def one(text,path):
                if os.path.exists(path) and os.path.getsize(path)>500:return
                async with sem:await tts(text,path)
            await asyncio.gather(*[one(k,R+'/audio/%s.mp3'%hid(k)) for k in keys],*[one(s,f'{CACHE}/c_{hid(s)}.mp3') for s in clips])
        asyncio.run(run())
        for t,say,twice in plan:
            out=R+'/audio/%s.mp3'%t['a']
            if not (os.path.exists(out) and os.path.getsize(out)>500):
                seq=[silence(0.3)]
                for j,s in enumerate(say):
                    c=f'{CACHE}/c_{hid(s)}.mp3'
                    if not os.path.exists(c):continue
                    if twice:seq+=[c,silence(1.2),c,silence(3)]
                    else:seq+=[c]+([silence(0.9)] if j<len(say)-1 else [])
                seq.append(silence(0.4))
                lst=f'{CACHE}/list.txt';open(lst,'w').write(''.join(f"file '{x}'\n" for x in seq))
                subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',lst,'-c:a','libmp3lame','-b:a','48k','-ar','24000','-ac','1',out],check=True)
            t['d']=dur(out)
    for k in keys:
        p=R+'/audio/%s.mp3'%hid(k)
        if os.path.exists(p) and os.path.getsize(p)>500:extra[k]=hid(k)
    for t in tracks:
        if t.get('a') and not os.path.exists(R+'/audio/%s.mp3'%t['a']):t['a']=''
        if 'd' not in t:
            p=R+'/audio/%s.mp3'%t['a'] if t.get('a') else ''
            t['d']=dur(p) if p and os.path.exists(p) else None
        t.pop('say',None)
    hdr='/* สร้างอัตโนมัติโดย tools/book-build/build_book.py ห้ามแก้มือ */\n'
    open(R+'/data/book1.js','w',encoding='utf-8').write(hdr+'window.BOOK1='+json.dumps(dict(title='ภาษาจีนสำหรับผู้เริ่มต้น',parts=parts),ensure_ascii=False,separators=(',',':'))+';\n')
    open(R+'/data/book1-tracks.js','w',encoding='utf-8').write(hdr+'window.BOOK1_TRACKS='+json.dumps(tracks,ensure_ascii=False,separators=(',',':'))+';\n')
    open(R+'/data/book1-audio.js','w',encoding='utf-8').write(hdr+'window.BOOK1_AUDIO='+json.dumps(extra,ensure_ascii=False,separators=(',',':'))+';\n')
    miss=[k for k in keys if k not in extra]
    from collections import Counter
    print('เสียงคำ/ประโยคใหม่',len(extra),'(มีอยู่แล้วในแอป ใช้ของเดิม)','ขาด',len(miss),miss[:10])
    print('แทร็กมีไฟล์เสียง',sum(1 for t in tracks if t['a']),'/',len(tracks),'· แทร็กต่อภาค',dict(Counter(t['part'] for t in tracks)))
    print('เขียน data/book1.js data/book1-tracks.js data/book1-audio.js แล้ว · ต่อไปรัน node build.js')
if __name__=='__main__':main()
