# SERVED MODEL: claude-opus-5-5 — KF.W13R.d: one line per (run, context, segment) from report-<tag>.json
import json, sys
for tag in sys.argv[1:]:
    r = json.load(open(f'report-{tag}.json'))
    print(f"## {tag} load {r['load']} errs {sum(len(c['errs']) for c in r['ctx'].values())}")
    for n, c in r['ctx'].items():
        for s in c['segments']:
            if not s.get('frames'): continue
            print(f"{n[:6]} {s['m']:<14} w {s['w0']}->{s['w1']} jump {s['maxFrameJumpPx']:>6} os {s['overshootPx']:>4} rev {s['widthReversals']} wSet {s['widthSettleMs']:>5} mSpan {s['morphSpanMs']:>5} rows {s['rowsSeq']:<6} over {s['rowsOverRest']} h {s['hMax']}/{s['hRest']} rad {s['radMin']}/{s['pradMin']} blurM {s['textBlurMorphFrames']} blurS {s['textBlurSettleFrames']} scM {s['textScaleMorphFrames']} scS {s['textScaleSettleFrames']} dbl {s['dblFrames']} {','.join(s['dblOwners'])[:60]}")
