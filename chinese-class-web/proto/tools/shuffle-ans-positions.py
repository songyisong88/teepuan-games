#!/usr/bin/env python3
"""Shuffle quiz option positions in book1-v4 / book2-v4 lesson HTML (data only).

Deterministic per-question seed from k / q / sit / card text.
Does not touch order() tile sequences, engine.js, or CSS.
Also lightly balances tf ans when a safe card tweak is available.
"""
from __future__ import annotations
import argparse, hashlib, random, re, sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Match call sites that carry opts + ans nearby (same object literal)
CALL_RE = re.compile(
    r"""(?P<head>\b(?:ask|blank|reply|point)\s*\()(?P<body>\{)""",
    re.M,
)

def find_matching(s: str, start: int, open_ch: str, close_ch: str) -> int:
    depth = 0
    i = start
    in_str = None
    esc = False
    while i < len(s):
        ch = s[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ("'", '"', '`'):
                in_str = ch
            elif ch == open_ch:
                depth += 1
            elif ch == close_ch:
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    return -1

def split_top_level(arr_body: str) -> list[str]:
    """Split array interior into top-level elements."""
    elems = []
    buf = []
    depth_sq = depth_paren = depth_brace = 0
    in_str = None
    esc = False
    i = 0
    while i < len(arr_body):
        ch = arr_body[i]
        if in_str:
            buf.append(ch)
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ("'", '"', '`'):
            in_str = ch
            buf.append(ch)
            i += 1
            continue
        if ch == '[':
            depth_sq += 1
            buf.append(ch)
        elif ch == ']':
            depth_sq -= 1
            buf.append(ch)
        elif ch == '(':
            depth_paren += 1
            buf.append(ch)
        elif ch == ')':
            depth_paren -= 1
            buf.append(ch)
        elif ch == '{':
            depth_brace += 1
            buf.append(ch)
        elif ch == '}':
            depth_brace -= 1
            buf.append(ch)
        elif ch == ',' and depth_sq == depth_paren == depth_brace == 0:
            elems.append(''.join(buf).strip())
            buf = []
        else:
            buf.append(ch)
        i += 1
    if buf and ''.join(buf).strip():
        elems.append(''.join(buf).strip())
    return elems

def seed_for(text: str) -> int:
    h = hashlib.sha256(text.encode('utf-8')).hexdigest()
    return int(h[:16], 16)

def permute_indices(n: int, seed: int) -> list[int]:
    rng = random.Random(seed)
    idx = list(range(n))
    # Force not all identity when n>1: reshuffle until not sorted OR accept if only 1 perm
    for _ in range(8):
        rng.shuffle(idx)
        if n <= 1 or idx != list(range(n)):
            break
    return idx

def extract_field(obj: str, name: str) -> tuple[str|None, int, int]:
    """Return (value_text, start, end) of field value inside object literal text."""
    m = re.search(rf'\b{name}\s*:', obj)
    if not m:
        return None, -1, -1
    i = m.end()
    while i < len(obj) and obj[i] in ' \t\n\r':
        i += 1
    if i >= len(obj):
        return None, -1, -1
    if obj[i] == '[':
        j = find_matching(obj, i, '[', ']')
        if j < 0:
            return None, -1, -1
        return obj[i:j+1], i, j+1
    if obj[i] == '{':
        j = find_matching(obj, i, '{', '}')
        if j < 0:
            return None, -1, -1
        return obj[i:j+1], i, j+1
    if obj[i] in "'\"":
        quote = obj[i]
        j = i + 1
        esc = False
        while j < len(obj):
            c = obj[j]
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == quote:
                return obj[i:j+1], i, j+1
            j += 1
        return None, -1, -1
    # number, identifier, or call expr like card('a','b','c')
    m2 = re.match(r'(-?\d+|true|false|[A-Za-z_][\w.]*)', obj[i:])
    if not m2:
        return None, -1, -1
    end = i + len(m2.group(1))
    # If followed by (, take the whole call
    j = end
    while j < len(obj) and obj[j] in ' \t':
        j += 1
    if j < len(obj) and obj[j] == '(':
        k = find_matching(obj, j, '(', ')')
        if k >= 0:
            return obj[i:k+1], i, k+1
    return m2.group(1), i, end

def qid_from(obj: str) -> str:
    for name in ('k', 'q', 'tag', 'sit', 'card', 'th'):
        val, _, _ = extract_field(obj, name)
        if val:
            return f'{name}={val}'
    return obj[:120]

def shuffle_opts_in_object(obj: str) -> tuple[str, int|None, int|None]:
    """Shuffle opts and update ans. Returns (new_obj, old_ans, new_ans)."""
    opts_val, opts_a, opts_b = extract_field(obj, 'opts')
    ans_val, ans_a, ans_b = extract_field(obj, 'ans')
    if not opts_val or ans_val is None or not ans_val.lstrip('-').isdigit():
        return obj, None, None
    if not (opts_val.startswith('[') and opts_val.endswith(']')):
        return obj, None, None
    interior = opts_val[1:-1]
    elems = split_top_level(interior)
    if len(elems) < 2:
        return obj, None, None
    old_ans = int(ans_val)
    if old_ans < 0 or old_ans >= len(elems):
        return obj, None, None
    seed = seed_for(qid_from(obj) + '|' + opts_val)
    rng = random.Random(seed)
    n = len(elems)
    # Pick target slot for the correct answer uniformly, then fill the rest.
    new_ans = rng.randrange(n)
    others = [elems[i] for i in range(n) if i != old_ans]
    rng.shuffle(others)
    new_elems = []
    oi = 0
    for i in range(n):
        if i == new_ans:
            new_elems.append(elems[old_ans])
        else:
            new_elems.append(others[oi]); oi += 1
    # rebuild opts with original spacing style: comma+space
    # preserve newlines if original had them
    if '\n' in opts_val:
        indent = re.search(r'\n(\s*)', opts_val)
        ind = indent.group(1) if indent else '  '
        new_opts = '[\n' + ',\n'.join(ind + e for e in new_elems) + '\n' + ind[:-2] + ']' if False else None
        # simpler: join with comma space like most files
        new_opts = '[' + ', '.join(new_elems) + ']'
    else:
        new_opts = '[' + ', '.join(new_elems) + ']'
    # replace opts and ans — replace later field first if needed by positions
    parts = []
    # Build by slicing: ensure we replace without overlapping incorrectly
    replacements = sorted([(opts_a, opts_b, new_opts), (ans_a, ans_b, str(new_ans))], reverse=True)
    out = obj
    for a, b, val in replacements:
        out = out[:a] + val + out[b:]
    return out, old_ans, new_ans

def process_panels_array(arr: str) -> tuple[str, list]:
    """Shuffle each panel object that has opts+ans inside an array."""
    if not (arr.startswith('[') and arr.endswith(']')):
        return arr, []
    interior = arr[1:-1]
    elems = split_top_level(interior)
    changes = []
    new_elems = []
    for e in elems:
        e2 = e.strip()
        if e2.startswith('{') and 'opts' in e2 and re.search(r'\bans\s*:', e2):
            # may be panel object
            ne, old, new = shuffle_opts_in_object(e2)
            if old is not None:
                changes.append((old, new))
            new_elems.append(ne)
        else:
            new_elems.append(e)
    # rebuild
    if '\n' in arr:
        new_arr = '[' + ','.join(new_elems) + ']'
    else:
        new_arr = '[' + ', '.join(x.strip() for x in new_elems) + ']'
    return new_arr, changes

def process_file(path: Path, dry: bool = False) -> dict:
    text = path.read_text(encoding='utf-8')
    orig = text
    stats = Counter()
    ans_before = Counter()
    ans_after = Counter()
    # 1) ask/blank/reply objects
    out = []
    i = 0
    for m in re.finditer(r'\b(?:ask|blank|reply)\s*\(\s*\{', text):
        start_brace = m.end() - 1
        end_brace = find_matching(text, start_brace, '{', '}')
        if end_brace < 0:
            continue
        out.append(text[i:start_brace])
        obj = text[start_brace:end_brace+1]
        # skip if no opts
        if 'opts' in obj and re.search(r'\bans\s*:\s*\d+', obj):
            nob, old, new = shuffle_opts_in_object(obj)
            if old is not None:
                ans_before[old] += 1
                ans_after[new] += 1
                stats['quiz'] += 1
                obj = nob
        out.append(obj)
        i = end_brace + 1
    out.append(text[i:])
    text = ''.join(out)

    # 2) story({... panels:[...]}) and inline panels arrays with sit+opts+ans
    # Also const DAY=[...] / ROLL=[...] style
    out = []
    i = 0
    for m in re.finditer(r'\bpanels\s*:\s*\[', text):
        start = m.end() - 1
        end = find_matching(text, start, '[', ']')
        if end < 0:
            continue
        out.append(text[i:start])
        arr = text[start:end+1]
        narr, ch = process_panels_array(arr)
        for old, new in ch:
            ans_before[old] += 1
            ans_after[new] += 1
            stats['panel'] += 1
        out.append(narr)
        i = end + 1
    out.append(text[i:])
    text = ''.join(out)

    # const arrays that look like panel lists (DAY=, ROLL=, etc.) without panels: key
    out = []
    i = 0
    for m in re.finditer(r'\b(?:const|let|var)\s+(?:DAY|ROLL|PANELS|STORY|SCENES)\s*=\s*\[', text):
        start = text.find('[', m.start())
        end = find_matching(text, start, '[', ']')
        if end < 0:
            continue
        out.append(text[i:start])
        arr = text[start:end+1]
        narr, ch = process_panels_array(arr)
        for old, new in ch:
            ans_before[old] += 1
            ans_after[new] += 1
            stats['const_panel'] += 1
        out.append(narr)
        i = end + 1
    out.append(text[i:])
    text = ''.join(out)

    # 3) point({... cards:[...], rounds:[{ans:n},...]}) — shuffle cards, remap ans
    out = []
    i = 0
    for m in re.finditer(r'\bpoint\s*\(\s*\{', text):
        start_brace = m.end() - 1
        end_brace = find_matching(text, start_brace, '{', '}')
        if end_brace < 0:
            continue
        out.append(text[i:start_brace])
        obj = text[start_brace:end_brace+1]
        cards_val, ca, cb = extract_field(obj, 'cards')
        rounds_val, ra, rb = extract_field(obj, 'rounds')
        if cards_val and rounds_val and cards_val.startswith('['):
            cards = split_top_level(cards_val[1:-1])
            if len(cards) >= 2:
                seed = seed_for(qid_from(obj) + '|point|' + cards_val)
                perm = permute_indices(len(cards), seed)
                # new_cards[i] = old[perm[i]]; old index o -> new index perm.index(o)
                remap = {old: perm.index(old) for old in range(len(cards))}
                new_cards = [cards[p] for p in perm]
                new_cards_s = '[' + ', '.join(new_cards) + ']'
                # remap ans in rounds
                def repl_ans(mo):
                    old = int(mo.group(1))
                    ans_before[old] += 1
                    new = remap.get(old, old)
                    ans_after[new] += 1
                    stats['point'] += 1
                    return f'ans:{new}'
                new_rounds = re.sub(r'\bans\s*:\s*(\d+)', repl_ans, rounds_val)
                # apply replacements reverse order
                reps = sorted([(ca, cb, new_cards_s), (ra, rb, new_rounds)], reverse=True)
                for a, b, val in reps:
                    obj = obj[:a] + val + obj[b:]
        out.append(obj)
        i = end_brace + 1
    out.append(text[i:])
    text = ''.join(out)

    # 4) TF balance: invert some cards (color/number/name) + flip ans, seeded.
    TF_FLIP_MAP = [
        ('รองเท้าสีขาว', 'รองเท้าสีฟ้า'), ('รองเท้าสีฟ้า', 'รองเท้าสีขาว'),
        ('สีขาว', 'สีฟ้า'), ('สีฟ้า', 'สีขาว'),
        ('สีแดง', 'สีดำ'), ('สีดำ', 'สีแดง'),
        ('สีน้ำเงิน', 'สีเขียว'), ('สีเขียว', 'สีน้ำเงิน'),
        ('ตั๋ว 2 ใบ', 'ตั๋ว 3 ใบ'), ('ตั๋ว 3 ใบ', 'ตั๋ว 2 ใบ'),
        ('2 ใบ', '3 ใบ'), ('3 ใบ', '2 ใบ'),
        ('80 หยวน', '60 หยวน'), ('60 หยวน', '80 หยวน'),
        ('300 หยวน', '200 หยวน'), ('200 หยวน', '300 หยวน'),
        ('¥40', '¥30'), ('¥30', '¥40'), ('¥9', '¥8'), ('¥8', '¥9'),
        ('¥2', '¥3'), ('¥3', '¥2'),
        ("'中国'", "'泰国'"), ("'泰国'", "'中国'"),
        ('หลี่น่า', 'หวังหมิง'), ('หวังหมิง', 'หลี่น่า'),
        ('มะลิ', 'หลี่น่า'),
        ('ไปเล่นบาส', 'ไปเตะบอล'), ('ไปเตะบอล', 'ไปเล่นบาส'),
        ('ชอบเต้น', 'ชอบร้องเพลง'), ('ชอบร้องเพลง', 'ชอบเต้น'),
        ('วิ่งเร็วที่สุด', 'วิ่งช้าที่สุด'), ('วิ่งช้าที่สุด', 'วิ่งเร็วที่สุด'),
        ('สนามบิน 9 โมง', 'สถานีรถไฟ 9 โมง'), ('สถานีรถไฟ 9 โมง', 'สนามบิน 9 โมง'),
        ('ด้านซ้าย</b> โรงพยาบาล', 'ด้านซ้าย</b> ร้านค้า'),
        ('วันละ 2 ชั่วโมง', 'วันละ 5 ชั่วโมง'), ('วันละ 5 ชั่วโมง', 'วันละ 2 ชั่วโมง'),
        ('มี', 'ไม่มี'),
    ]

    out = []
    i = 0
    for m in re.finditer(r'\btf\s*\(\s*\{', text):
        start_brace = m.end() - 1
        end_brace = find_matching(text, start_brace, '{', '}')
        if end_brace < 0:
            continue
        out.append(text[i:start_brace])
        obj0 = text[start_brace:end_brace+1]
        obj = obj0
        ans_val, aa, ab = extract_field(obj, 'ans')
        card_val, ca, cb = extract_field(obj, 'card')
        if ans_val and ans_val.isdigit() and card_val:
            old = int(ans_val)
            ans_before[f'tf{old}'] += 1
            seed = seed_for(qid_from(obj) + '|tf')
            rng = random.Random(seed)
            want_flip = rng.random() < 0.55
            flipped = False
            if want_flip:
                new_card = None
                for a, b in TF_FLIP_MAP:
                    if a == 'มี' and 'ไม่มี' in card_val:
                        continue
                    if a in card_val:
                        new_card = card_val.replace(a, b, 1)
                        break
                if new_card and new_card != card_val:
                    new_ans = 1 - old
                    # replace later index first
                    reps = sorted([(ca, cb, new_card), (aa, ab, str(new_ans))], reverse=True)
                    for a, b, val in reps:
                        obj = obj[:a] + val + obj[b:]
                    stats['tf_flip'] += 1
                    ans_after[f'tf{new_ans}'] += 1
                    flipped = True
            if not flipped:
                ans_after[f'tf{old}'] += 1
        out.append(obj)
        i = end_brace + 1
    out.append(text[i:])
    text = ''.join(out)

    if not dry and text != orig:
        path.write_text(text, encoding='utf-8')
        stats['written'] = 1
    elif text != orig:
        stats['dirty'] = 1
    return {'file': str(path.name), 'stats': dict(stats), 'before': dict(ans_before), 'after': dict(ans_after)}

def scan_distribution(book: Path) -> dict:
    """Report ans position distribution for quiz-like constructs."""
    c = Counter()
    tf = Counter()
    panel = Counter()
    point = Counter()
    n_quiz = n_panel = n_point = n_tf = 0
    for path in sorted(book.glob('L*.html')):
        text = path.read_text(encoding='utf-8')
        # ask/blank/reply
        for kind in ('ask', 'blank', 'reply'):
            for m in re.finditer(rf'\b{kind}\s*\(\s*\{{', text):
                sb = m.end() - 1
                eb = find_matching(text, sb, '{', '}')
                if eb < 0:
                    continue
                obj = text[sb:eb+1]
                if 'opts' not in obj:
                    continue
                av, _, _ = extract_field(obj, 'ans')
                if av and av.isdigit():
                    c[int(av)] += 1
                    n_quiz += 1
        # panels
        for m in re.finditer(r'\bpanels\s*:\s*\[', text):
            start = m.end() - 1
            end = find_matching(text, start, '[', ']')
            if end < 0:
                continue
            arr = text[start:end+1]
            for e in split_top_level(arr[1:-1]):
                if 'opts' in e and re.search(r'\bans\s*:', e):
                    av, _, _ = extract_field(e.strip(), 'ans')
                    if av and av.isdigit():
                        panel[int(av)] += 1
                        n_panel += 1
        for m in re.finditer(r'\b(?:const|let|var)\s+(?:DAY|ROLL|PANELS|STORY|SCENES)\s*=\s*\[', text):
            start = text.find('[', m.start())
            end = find_matching(text, start, '[', ']')
            if end < 0:
                continue
            for e in split_top_level(text[start+1:end]):
                if 'opts' in e and re.search(r'\bans\s*:', e):
                    av, _, _ = extract_field(e.strip(), 'ans')
                    if av and av.isdigit():
                        panel[int(av)] += 1
                        n_panel += 1
        # point rounds
        for m in re.finditer(r'\bpoint\s*\(\s*\{', text):
            sb = m.end() - 1
            eb = find_matching(text, sb, '{', '}')
            if eb < 0:
                continue
            obj = text[sb:eb+1]
            rv, _, _ = extract_field(obj, 'rounds')
            if not rv:
                continue
            for am in re.finditer(r'\bans\s*:\s*(\d+)', rv):
                point[int(am.group(1))] += 1
                n_point += 1
        # tf
        for m in re.finditer(r'\btf\s*\(\s*\{', text):
            sb = m.end() - 1
            eb = find_matching(text, sb, '{', '}')
            if eb < 0:
                continue
            obj = text[sb:eb+1]
            av, _, _ = extract_field(obj, 'ans')
            if av and av.isdigit():
                tf[int(av)] += 1
                n_tf += 1
    return {
        'quiz': {'n': n_quiz, 'pos': dict(sorted(c.items()))},
        'panel': {'n': n_panel, 'pos': dict(sorted(panel.items()))},
        'point': {'n': n_point, 'pos': dict(sorted(point.items()))},
        'tf': {'n': n_tf, 'pos': dict(sorted(tf.items()))},
    }

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--book', action='append', choices=['book1-v4', 'book2-v4'], required=True)
    ap.add_argument('--check-only', action='store_true')
    ap.add_argument('--dry', action='store_true')
    args = ap.parse_args()
    for b in args.book:
        book = ROOT / b
        print(f'=== {b} BEFORE ===')
        before = scan_distribution(book)
        print(before)
        if args.check_only:
            continue
        results = []
        for path in sorted(book.glob('L*.html')):
            results.append(process_file(path, dry=args.dry))
        print(f'=== {b} AFTER ===')
        after = scan_distribution(book) if not args.dry else before
        if args.dry:
            # aggregate intended
            ab, aa = Counter(), Counter()
            for r in results:
                ab.update({k: v for k, v in r['before'].items() if isinstance(k, int) or (isinstance(k, str) and k.isdigit())})
                # before keys are ints
                for k, v in r['before'].items():
                    if isinstance(k, int):
                        ab[k] += 0  # already
                aa.update({k: v for k, v in r['after'].items() if isinstance(k, int)})
            print('dry intended quiz/panel/point moves:', sum(r['stats'].get('quiz',0)+r['stats'].get('panel',0)+r['stats'].get('const_panel',0)+r['stats'].get('point',0) for r in results))
            print('dry tf_flip', sum(r['stats'].get('tf_flip',0) for r in results))
        else:
            print(after)
            tot_q = after['quiz']['n'] or 1
            pos0 = after['quiz']['pos'].get(0, 0) / tot_q
            print(f"quiz ans0 fraction: {pos0:.2%} (target nearer 33-40% for 3-opt)")
            tot_p = after['panel']['n'] or 1
            print(f"panel ans0 fraction: {after['panel']['pos'].get(0,0)/tot_p:.2%}")
            tot_tf = after['tf']['n'] or 1
            print(f"tf ans0 fraction: {after['tf']['pos'].get(0,0)/tot_tf:.2%}")

if __name__ == '__main__':
    main()
