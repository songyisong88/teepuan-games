#!/usr/bin/env python3
"""Automated validator for the lesson data (data/hsk1-5.js).
Usage:  node tools/dump.cjs   (writes /tmp/cn-lessons.json)  then  python3 tools/validate.py [--json out.json]
Needs: pypinyin, opencc-python-reimplemented.  Word lists: tools/hsk20-words.json (HSK 2.0, from complete-hsk-vocabulary).
Exit code 1 when any ERROR is found.  WARN items are style / difficulty notes for a native-speaker review.
"""
import json,re,sys,os,unicodedata,collections,hashlib
from pypinyin import pinyin,Style
from opencc import OpenCC
APP=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args=sys.argv[1:]
def opt(n,d=None): return args[args.index(n)+1] if n in args else d
DATA=json.load(open(opt('--data','/tmp/cn-lessons.json')))
AUDIO=os.path.join(APP,'audio');IDX=os.path.join(APP,'audio-index.js')
t2s=OpenCC('t2s')
LS=DATA['LESSONS'];CH={c['id']:c for c in DATA['CHAPTERS']}
HAN=re.compile(r'[\u4e00-\u9fff]');THAI=re.compile(r'[\u0e00-\u0e7f]')
errs=collections.defaultdict(list);warns=collections.defaultdict(list)
def E(l,m): errs[l].append(m)
def W(l,m): warns[l].append(m)
def han(s): return ''.join(HAN.findall(s))
def syl(py): return [x for x in re.split(r'[| ]',re.sub(r'[,.!?:;，。！？：；“”‘’…\"\'()（）]','',py)) if x]
def tone_of(s):
    for ch in unicodedata.normalize('NFD',s):
        if ch=='\u0304':return 1
        if ch=='\u0301':return 2
        if ch=='\u030c':return 3
        if ch=='\u0300':return 4
    return 5
def base(s): return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if not unicodedata.combining(c)).replace('ü','u')
# characters where pypinyin's context guess is known to differ from correct usage in our sentences -> not reported
FP=set('脏长片场只处便觉假地了得背干差切炸倒缝还拧钉儿谁都着重行为都发调率校数传曲没会将量')
def readings(c):
    return {r for r in sum(pinyin(c,style=Style.TONE,heteronym=True),[])}
def toneck(zh,py,l,ctx):
    zc=HAN.findall(zh);sy=syl(py)
    if len(zc)!=len(sy): E(l,f'{ctx} syllable count {len(zc)}!={len(sy)}: {zh} / {py}');return
    exp=pinyin(''.join(zc),style=Style.TONE,heteronym=False)
    for c,e,s in zip(zc,exp,sy):
        e=e[0];s=s.lower()
        if c=='儿':continue
        if c=='谁' and s in('shéi','shuí'):continue
        rs=readings(c)|{'er'}
        if not any(base(r)==base(s) and (tone_of(r)==tone_of(s) or tone_of(s)==5 or c in '一不') for r in rs):
            E(l,f'{ctx} no valid reading of {c} matches {s} (valid: {"/".join(sorted(rs))}) in {zh}')
        elif tone_of(e)!=tone_of(s) and tone_of(s)!=5 and c not in '一不' and (base(e)!=base(s) or True) and s!=e:
            W(l,f'{ctx} heteronym check: {c} written {s}, context guess {e} (native review) in {zh}')
# ---- audio
idx=json.loads(re.search(r'=(\{.*\})',open(IDX,encoding='utf8').read(),re.S).group(1))
def haveaudio(key): 
    h=idx.get(key); return bool(h) and os.path.exists(os.path.join(AUDIO,h+'.mp3'))
# ---- HSK 2.0 lists
HL={}
_L=json.load(open(os.path.join(APP,'tools','hsk20-words.json')))   # HSK 2.0 word lists (words only; source in ROADMAP)
for n in range(1,7):
    for w in _L.get(str(n),[]): HL.setdefault(w,n)
CHL={}
for w,n in HL.items():
    for c in w: CHL[c]=min(CHL.get(c,9),n)
seen_ex=collections.defaultdict(list);seen_dlg=collections.defaultdict(list);seen_sent=collections.defaultdict(list);wrong_use=collections.Counter()
allwords=collections.defaultdict(list)
lvl_stats=collections.defaultdict(lambda:collections.Counter())
lesson_fit={}
for L in LS:
    i=L['id'];lv=L['lv'];tag=f'L{i}'
    for k in ('th','zh','story','emoji'):
        if not L.get(k): E(tag,f'missing {k}')
    if L['chapter'] not in CH: E(tag,'unknown chapter')
    if len(L['words'])!=16: E(tag,f'words={len(L["words"])} (need 16)')
    if len(L['sents'])!=6: E(tag,f'sents={len(L["sents"])} (need 6)')
    if len(L['dlg'])!=4: E(tag,f'dlg={len(L["dlg"])} (need 4)')
    roles=[d[0] for d in L['dlg']]
    if any(roles[k]==roles[k+1] for k in range(3)): E(tag,f'dialog roles do not alternate {roles}')
    for t in [L['zh'],L['story']]+[w['zh'] for w in L['words']]:
        if t2s.convert(t)!=t: E(tag,f'traditional characters in: {t}')
    for w in L['words']:
        allwords[w['zh']].append(i)
        for k in ('zh','py','th','h','mn','ex','exPy','exTh'):
            if not w.get(k): E(tag,f'word {w["zh"]} missing {k}')
        if t2s.convert(w['ex'])!=w['ex']: E(tag,f'traditional in example: {w["ex"]}')
        toneck(w['zh'],w['py'],tag,'word');toneck(w['ex'],w['exPy'],tag,'example')
        if w['zh'] not in w['ex']: W(tag,f'example does not contain the word: {w["zh"]} -> {w["ex"]}')
        if not THAI.search(w['th']): E(tag,f'Thai meaning has no Thai text: {w["zh"]}')
        if not THAI.search(w['exTh']): E(tag,f'Thai example translation has no Thai text: {w["zh"]}')
        if HAN.search(w['th']) : W(tag,f'Chinese characters inside Thai meaning: {w["zh"]} {w["th"]}')
        if 'TODO' in json.dumps(w,ensure_ascii=False) or '???' in w['th']: E(tag,f'placeholder text in {w["zh"]}')
        if len(han(w['ex']))<3: W(tag,f'very short example: {w["ex"]}')
        if not haveaudio(w['zh']): E(tag,f'no audio for word {w["zh"]}')
        if not haveaudio(w['ex']): E(tag,f'no audio for example {w["ex"]}')
        seen_ex[w['ex']].append(i)
        # difficulty
        hl=HL.get(w['zh'])
        if hl is None:
            cs=[CHL.get(c) for c in w['zh']]
            hl=('chars',max(c for c in cs if c) if all(cs) else None) if cs else None
        if isinstance(hl,int): cat='in' if hl==lv else('below' if hl<lv else 'above'+('6' if hl==6 else ''))
        elif hl is None: cat='unlisted'
        else:
            cm=hl[1]
            cat='unlisted' if cm is None else('chars-ok' if cm<=lv else 'chars-above')
        lvl_stats[i][cat]+=1
    for s in L['sents']:
        z=s[0].split('/');p=s[1].split('/');full=''.join(z)
        if len(z)!=len(p): E(tag,f'sentence segments {s[0]} / {s[1]}');continue
        for zz,pp in zip(z,p):
            if len(han(zz))!=len(syl(pp)): E(tag,f'segment pinyin length {zz} / {pp}')
        toneck(full,' '.join(p),tag,'sentence')
        if t2s.convert(full)!=full: E(tag,f'traditional in sentence {full}')
        if not THAI.search(s[2]): E(tag,f'sentence translation not Thai {full}')
        if not haveaudio(full): E(tag,f'no audio for sentence {full}')
        seen_sent[full].append(i)
    for d in L['dlg']:
        toneck(d[1],d[2],tag,'dialog')
        if t2s.convert(d[1])!=d[1]: E(tag,f'traditional in dialog {d[1]}')
        if not THAI.search(d[3]): E(tag,f'dialog translation not Thai {d[1]}')
        if not haveaudio(('f|' if d[0]=='f' else '')+d[1]): E(tag,f'no audio for dialog line {d[1]}')
        seen_dlg[d[1]].append(i)
    rq=L['rq'];p=rq['p']
    if not(0<=p<=2) or p+1>=len(L['dlg']): E(tag,f'rq.p={p} invalid')
    else:
        correct=L['dlg'][p+1][1]
        ws=[x[0] for x in rq['wrong']]
        if len(ws)<2: E(tag,'need at least 2 wrong replies')
        if len(set(ws+[correct]))!=len(ws)+1: E(tag,'duplicate answer options')
        q=han(L['dlg'][p][1])
        for x in rq['wrong']:
            toneck(x[0],x[1],tag,'wrong-reply');wrong_use[x[0]]+=1
            # a wrong reply must not share a 3-char run with the correct reply or answer the question
            for a in range(len(han(x[0]))-2):
                if han(x[0])[a:a+3] in han(correct): W(tag,f'wrong reply overlaps correct reply: {x[0]}');break
    # difficulty summary per lesson
    c=lvl_stats[i];n=sum(c.values())
    good=c['in']+c['below']+c['chars-ok']
    lesson_fit[i]=dict(lv=lv,n=n,**{k:v for k,v in c.items()})
# ---- global repetition / templating
for ex,ids in seen_ex.items():
    if len(ids)>1: E('global',f'identical example sentence in lessons {ids}: {ex}')
for s,ids in seen_sent.items():
    if len(ids)>1: W('global',f'identical practice sentence in lessons {ids}: {s}')
for s,ids in seen_dlg.items():
    if len(ids)>1: W('global',f'identical dialog line in lessons {ids}: {s}')
for w,ids in allwords.items():
    if len(ids)>1: E('global',f'word taught in several lessons {ids}: {w}')
# same Thai gloss on two words -> an exercise (zh2th options / match pairs) could have two correct answers
gl=collections.defaultdict(list)
for L in LS:
    for w in L['words']: gl[w['th'].strip()].append((L['id'],w['zh']))
for g,v in gl.items():
    if len(v)>1: E('global',f'same Thai gloss "{g}" on several words {v}: an exercise could have two correct answers')
reuse=[(k,v) for k,v in wrong_use.items() if v>=5]
for k,v in sorted(reuse,key=lambda x:-x[1]): W('global',f'wrong-reply "{k}" reused in {v} lessons (learner can answer by elimination)')
# example starts: templated openers
for L in LS:
    cnt=collections.Counter(han(w['ex'])[:2] for w in L['words'])
    for k,v in cnt.items():
        if v>=4: W(f'L{L["id"]}',f'{v} examples begin with "{k}" (templated?)')
    cnt=collections.Counter(re.sub(r'[^\u4e00-\u9fff]','',w['ex'])[-3:] for w in L['words'])
    for k,v in cnt.items():
        if v>=4: W(f'L{L["id"]}',f'{v} examples end with "{k}" (templated?)')
    # lesson difficulty
    f=lesson_fit[L['id']];n=f['n']
    inl=f.get('in',0)+f.get('below',0)
    above=f.get('above',0)+f.get('above6',0)
    unl=f.get('unlisted',0)+f.get('chars-above',0)
    hl_=(f.get('in',0)+f.get('below',0)+f.get('chars-ok',0))/n
    if hl_<0.80: W(f'L{L["id"]}',f'in-level word % {hl_*100:.0f} < 80 (above={above}, unknown/derived-above={unl})')
# ---- ลำดับขีด: ข้อมูลลำดับขีด (data/stroke) ----
import glob
SD=os.path.join(APP,'data','stroke')
for f in ('ARPHICPL.TXT','MMAH-COPYING.txt','NOTICE.md','index.js'):
    if not os.path.exists(os.path.join(SD,f)): E('stroke','missing '+f)
for f in ('hanzi-writer.min.js','LICENSE-hanzi-writer.txt','LICENSE-cnchar-order.txt'):
    if not os.path.exists(os.path.join(APP,'vendor',f)): E('stroke','missing vendor/'+f)
HANX=re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff\U00020000-\U0002a6df]')
have=set();badj=0
for f in glob.glob(os.path.join(SD,'*.json')):
    try:
        j=json.load(open(f,encoding='utf8'))
        n=len(j['strokes'])
        if not(n==len(j['medians'])>0) or j.get('lic')!='APL-modified': E('stroke','bad json '+os.path.basename(f));badj+=1
        have.add(chr(int(os.path.basename(f)[:-5],16)))
    except Exception as ex: E('stroke','unreadable '+os.path.basename(f)+' '+str(ex))
ix=open(os.path.join(SD,'index.js'),encoding='utf8').read()
m=re.search(r'STK_COV\s*=\s*"([^"]*)"',ix)
if not m or set(m.group(1))!=have: E('stroke','STK_COV does not match data/stroke/*.json')
need=set()
for L in LS:
    for w in L['words']:
        for k in ('zh','ex'): need|=set(HANX.findall(w.get(k,'') or ''))
miss=sorted(need-have)
if miss: E('stroke','lesson characters without stroke data: '+''.join(miss))
srcmiss=set()
for f in glob.glob(os.path.join(APP,'*.js'))+glob.glob(os.path.join(APP,'data','*.js')):
    if os.path.basename(f) in ('stroke.js',): continue
    srcmiss|=set(HANX.findall(open(f,encoding='utf8').read()))-have
srcmiss-=need
if srcmiss: W('stroke','characters elsewhere in app source without stroke data (will show "ยังไม่มีข้อมูล"): '+''.join(sorted(srcmiss))[:80])
print(f'stroke data: {len(have)} chars, lesson chars needed {len(need)}, missing {len(miss)}')

# ---- อักษรข้าง (data/rad) ----
import subprocess
RD=os.path.join(APP,'data','rad')
for f in ('rad.js','NOTICE.md','MMAH-COPYING.txt'):
    if not os.path.exists(os.path.join(RD,f)): E('rad','missing data/rad/'+f)
for f in ('rad.js','radgame.js','radcol.js','rad.css'):
    if not os.path.exists(os.path.join(APP,f)): E('rad','missing '+f)
    elif re.search(r'HSK',open(os.path.join(APP,f),encoding='utf8').read()): E('rad','"HSK" in brand text of '+f)
if re.search(r'HSK',open(os.path.join(RD,'rad.js'),encoding='utf8').read()): E('rad','"HSK" in data/rad/rad.js')
try:
    out=subprocess.check_output(['node','-e',"const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';this.o={RAD,RAD_MEM,RAD_CH,RAD_Z}',c);console.log(JSON.stringify(c.o))",os.path.join(RD,'rad.js')])
    RJ=json.loads(out)
    _rt=open(os.path.join(RD,'rad.js'),encoding='utf8').read()
    mp=re.search(r"RAD_PAIRS\s*=\s*'([^']*)'",_rt)
    if not mp or len(mp.group(1).split(" "))<8000: E('rad','RAD_PAIRS missing or too small (drag-build distractors depend on it)')
    # tonestrip regression guard: the build must strip U+030C (caron) like the other tone marks
    if "0x30C" not in open(os.path.join(APP,'tools','rad-build','build_rad.py'),encoding='utf8').read(): E('rad','build_rad.py tonestrip does not handle U+030C')
    R=RJ['RAD'];ids=[r['id'] for r in R]
    if len(R)!=60 or sum(1 for r in R if not r['bonus'])!=48: E('rad',f'expected 48 core + 12 bonus, got {len(R)}')
    if len(set(ids))!=len(ids): E('rad','duplicate radical ids')
    lessonch=set()
    for L in LS:
        for w in L['words']: lessonch|=set(HANX.findall(w.get('zh','') or ''))
    for r in R:
        for k in ('th','mn','mean','py','card'):
            if not r.get(k): E('rad',f'{r["id"]} missing {k}')
        mem=set(RJ['RAD_MEM'].get(r['id'],{}).get('s',[]))|set(RJ['RAD_MEM'].get(r['id'],{}).get('w',[]))
        if not r['ex'] or any(x not in mem for x in r['ex']): E('rad',f'{r["id"]} example not in members')
        if len(mem)<3: W('rad',f'{r["id"]} has only {len(mem)} member chars')
        if r['z'] not in range(len(RJ['RAD_Z'])): E('rad',f'{r["id"]} bad zone')
    bad=[c for c,v in RJ['RAD_CH'].items() if any(i not in ids for i in v[0] if len(i)==1 and i in '亻讠') ]
    miss=[c for c in RJ['RAD_CH'] if c not in lessonch]
    if miss: W('rad',f'{len(miss)} RAD_CH chars not in lesson text')
    print(f'radicals: {len(R)} (zones {len(RJ["RAD_Z"])}), decomposed chars {len(RJ["RAD_CH"])}')
    rj=open(os.path.join(APP,'rad.js'),encoding='utf8').read()+open(os.path.join(APP,'radcol.js'),encoding='utf8').read()
    if 'ร่าง รอครูตรวจ' not in rj: E('rad','draft label "ร่าง รอครูตรวจ" missing in UI')
except Exception as ex: E('rad','cannot load data/rad/rad.js: '+str(ex))

tot_e=sum(len(v) for v in errs.values());tot_w=sum(len(v) for v in warns.values())
print(f'lessons checked: {len(LS)}  words: {sum(len(L["words"]) for L in LS)}  ERRORS: {tot_e}  WARNINGS: {tot_w}')
for k in sorted(errs,key=lambda x:(x=='global',int(x[1:]) if x[1:].isdigit() else 0)):
    for m in errs[k]: print('ERROR',k,m)
if '--quiet' not in args:
    for k in sorted(warns,key=lambda x:(x=='global',int(x[1:]) if x[1:].isdigit() else 0)):
        for m in warns[k]: print('WARN ',k,m)
# per-level fit summary
byl=collections.defaultdict(collections.Counter)
for L in LS:
    for k,v in lesson_fit[L['id']].items():
        if k not in('lv','n'): byl[L['lv']][k]+=v
print('\nIn-level word % per lesson (headline = listed at <= lesson level, or all characters at <= level; strict = listed in HSK 2.0 list at <= level; exact = listed at exactly this level):')
for L in LS:
    f=lesson_fit[L['id']];n=f['n']
    h=(f.get('in',0)+f.get('below',0)+f.get('chars-ok',0))/n;st=(f.get('in',0)+f.get('below',0))/n;ex=f.get('in',0)/n
    L_pct=(round(h*100),round(st*100),round(ex*100))
    lesson_fit[L['id']]['pct']=L_pct
    if '--lessons' in args: print(f' L{L["id"]:>3} HSK{L["lv"]} headline {L_pct[0]:>3}%  strict {L_pct[1]:>3}%  exact {L_pct[2]:>3}%')
print('\nIn-level word % per level (words by HSK 2.0 list membership):')
for lv in sorted(byl):
    c=byl[lv];n=sum(c.values());nl=sum(1 for L in LS if L['lv']==lv)
    h=c['in']+c['below']+c['chars-ok'];st=c['in']+c['below']
    low=sum(1 for L in LS if L['lv']==lv and lesson_fit[L['id']]['pct'][0]<80)
    print(f' HSK{lv}: lessons={nl} words={n} headline={h/n*100:.1f}% strict={st/n*100:.1f}% exact={c["in"]/n*100:.1f}%  above={c["above"]+c["above6"]} chars-above={c["chars-above"]} unlisted={c["unlisted"]}  lessons<80%: {low}')
if opt('--json'): json.dump({'errors':errs,'warnings':warns,'fit':lesson_fit,'byLevel':{k:dict(v) for k,v in byl.items()}},open(opt('--json'),'w'),ensure_ascii=False,indent=1)
sys.exit(1 if tot_e else 0)
