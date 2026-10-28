#!/usr/bin/env python3
"""Automated validator for the lesson data (data/hsk1-5.js).
Usage:  node tools/dump.cjs   (writes /tmp/cn-lessons.json)  then  python3 tools/validate.py [--hsk DIR] [--json out.json]
Needs: pypinyin, opencc-python-reimplemented.  Optional: HSK 2.0 word lists (old1..old6.json from complete-hsk-vocabulary).
Exit code 1 when any ERROR is found.  WARN items are style / difficulty notes for a native-speaker review.
"""
import json,re,sys,os,unicodedata,collections,hashlib
from pypinyin import pinyin,Style
from opencc import OpenCC
APP=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args=sys.argv[1:]
def opt(n,d=None): return args[args.index(n)+1] if n in args else d
DATA=json.load(open(opt('--data','/tmp/cn-lessons.json')))
HSKDIR=opt('--hsk','/workspace/hsk')
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
FP=set('长片场只处便觉假地了得背干差切炸倒缝还拧钉儿谁都着重行为都发调率校数传曲没会将量')
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
for n in range(1,7):
    p=os.path.join(HSKDIR,f'old{n}.json')
    if os.path.exists(p):
        for e in json.load(open(p)): HL.setdefault(e['simplified'],n)
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
    if above+unl>=0.5*n: W(f'L{L["id"]}',f'difficulty: only {inl+f.get("chars-ok",0)}/{n} words at or below HSK{L["lv"]} (above={above}, not in HSK2.0 lists/unknown={unl})')
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
print('\nDifficulty fit per app level (words by HSK 2.0 list membership):')
for lv in sorted(byl):
    c=byl[lv];n=sum(c.values())
    print(f' HSK{lv}: n={n} in-level={c["in"]} below={c["below"]} above={c["above"]+c["above6"]} (HSK6={c["above6"]}) chars-ok(compound/themed)={c["chars-ok"]} chars-above={c["chars-above"]} unlisted={c["unlisted"]}')
if opt('--json'): json.dump({'errors':errs,'warnings':warns,'fit':lesson_fit,'byLevel':{k:dict(v) for k,v in byl.items()}},open(opt('--json'),'w'),ensure_ascii=False,indent=1)
sys.exit(1 if tot_e else 0)
