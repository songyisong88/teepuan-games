#!/usr/bin/env python3
"""Report answer-position distribution for book1-v4 / book2-v4 quizzes."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from importlib.machinery import SourceFileLoader
mod = SourceFileLoader('shuffle', str(Path(__file__).resolve().parent / 'shuffle-ans-positions.py')).load_module()
ROOT = Path(__file__).resolve().parents[1]
books = sys.argv[1:] or ['book1-v4', 'book2-v4']
for b in books:
    d = mod.scan_distribution(ROOT / b)
    print(f'=== {b} ===')
    for k,v in d.items():
        pos=v['pos']; n=v['n'] or 1
        fracs=', '.join(f'{i}:{c} ({c/n:.0%})' for i,c in sorted(pos.items()))
        print(f"  {k}: n={v['n']}  {fracs}")
