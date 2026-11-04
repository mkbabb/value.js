# OD-18 WebKit dock trace summary. usage: python3 -I summarize.py <local.json> <prod.json> ... > summary.json
# Per phase (site x cell x rep):
#   maxDt            largest rAF delta in the window (ms)
#   widthStepFrac    largest single-frame |d paintW| / |paintW(end) - paintW(start)|  (also vs the range max-min)
#   radiusAfterSettle  effective-radius changes (> 0.5 px, any corner, painted) on frames after data-morphing clears
#   settleRadiusJump the painted-radius step across the data-morphing 1 -> 0 frame
#   nonUniformFrames frames whose 4 painted corners differ (> 0.5 px) or whose corners are elliptical (rx != ry > 0.5 px)
import json, sys, os, re

EPS = 0.5

# WebKit serialises computed radii as calc() (e.g. 'calc(48.076923% + 0.615385px)'), which the in-page
# resolver read as NaN, so every radius is re-resolved here from radiusRaw and the plate's layout box,
# then the CSS corner-overlap rule is applied and the painted scale (sx, sy) multiplies it.
def _len(tok, basis):
    tok = tok.strip()
    if tok.startswith('calc(') and tok.endswith(')'):
        tok = tok[5:-1]
    tot, sign = 0.0, 1
    for part in re.split(r'\s+', tok):
        if part == '+': sign = 1; continue
        if part == '-': sign = -1; continue
        if part.endswith('%'): tot += sign * float(part[:-1]) / 100 * basis
        elif part.endswith('px'): tot += sign * float(part[:-2])
        elif part: tot += sign * float(part)
    return tot

def _corner(s, w, h):
    # 'A' or 'A B' where A/B may be calc(...) containing spaces
    parts = re.findall(r'calc\([^)]*\)|[^\s]+', s.strip())
    a = parts[0]; b = parts[1] if len(parts) > 1 else a
    return [_len(a, w), _len(b, h)]

def resolve(r):
    w, h = r['inline'], r['block']
    c = [_corner(s, w, h) for s in r['radiusRaw']]
    sums = [c[0][0] + c[1][0], c[3][0] + c[2][0], c[0][1] + c[3][1], c[1][1] + c[2][1]]
    f = min([1] + [side / sm for side, sm in zip([w, w, h, h], sums) if sm > 0])
    c = [[x * f, y * f] for x, y in c]
    r['radiusPx'] = [[round(x, 2), round(y, 2)] for x, y in c]
    r['paintR'] = [[round(x * r['sx'], 2), round(y * r['sy'], 2)] for x, y in c]
    return r

def corners_diff(pr):
    xs = [c[0] for c in pr]; ys = [c[1] for c in pr]
    return max(xs) - min(xs) > EPS or max(ys) - min(ys) > EPS

def elliptical(pr):
    return any(abs(c[0] - c[1]) > EPS for c in pr)

def rstep(a, b):
    return max(max(abs(x[0] - y[0]), abs(x[1] - y[1])) for x, y in zip(a, b))

def phase(rows):
    rows = [resolve(r) for r in rows if r.get('radiusRaw')]
    if not rows:
        return {'frames': 0}
    dts = [r['dt'] for r in rows if r['dt'] is not None]
    w = [r['paintW'] for r in rows]
    steps = [abs(w[i + 1] - w[i]) for i in range(len(w) - 1)]
    tot = abs(w[-1] - w[0]); rng = max(w) - min(w)
    imax = max(range(len(steps)), key=lambda i: steps[i]) if steps else None
    # settle = the first frame after which data-morphing stays 0 (if morphing ever ran), else frame 0
    m = [r['morph'] for r in rows]
    last1 = max([i for i, v in enumerate(m) if v == 1], default=None)
    settle = (last1 + 1) if last1 is not None else 0
    after = []
    for i in range(max(settle, 1), len(rows)):
        s = rstep(rows[i - 1]['paintR'], rows[i]['paintR'])
        if s > EPS:
            after.append({'frame': i, 'tMs': round(rows[i]['t'] - rows[0]['t'], 1), 'stepPx': round(s, 2), 'from': rows[i - 1]['radiusRaw'], 'to': rows[i]['radiusRaw']})
    jump = round(rstep(rows[settle - 1]['paintR'], rows[settle]['paintR']), 2) if last1 is not None and settle < len(rows) else None
    nu = [i for i, r in enumerate(rows) if corners_diff(r['paintR']) or elliptical(r['paintR'])]
    nu_c = [i for i in nu if corners_diff(rows[i]['paintR'])]
    nu_e = [i for i in nu if elliptical(rows[i]['paintR'])]
    sample = lambda i: {'frame': i, 'tMs': round(rows[i]['t'] - rows[0]['t'], 1), 'morph': rows[i]['morph'], 'radiusRaw': rows[i]['radiusRaw'], 'paintR': rows[i]['paintR'], 'sx': rows[i]['sx'], 'paintW': rows[i]['paintW'], 'paintH': rows[i]['paintH']}
    return {
        'frames': len(rows), 'morphFrames': sum(m), 'settleFrame': settle if last1 is not None else None,
        'maxDt': round(max(dts), 2) if dts else None, 'p50Dt': round(sorted(dts)[len(dts) // 2], 2) if dts else None,
        'framesOver20ms': sum(1 for d in dts if d > 20),
        'paintW': {'start': w[0], 'end': w[-1], 'min': min(w), 'max': max(w)},
        'block': {'start': rows[0]['paintH'], 'end': rows[-1]['paintH']},
        'maxWidthStepPx': round(steps[imax], 2) if steps else 0,
        'maxWidthStepAtMs': round(rows[imax + 1]['t'] - rows[0]['t'], 1) if steps else None,
        'widthStepFracOfDelta': round(steps[imax] / tot, 3) if steps and tot > 1 else None,
        'widthStepFracOfRange': round(steps[imax] / rng, 3) if steps and rng > 1 else None,
        'radiusChangesAfterSettle': len(after), 'radiusAfterSettle': after[:6],
        'settleRadiusJumpPx': jump,
        'nonUniformFrames': len(nu), 'nonUniformCornerFrames': len(nu_c), 'ellipticalFrames': len(nu_e),
        'nonUniformDuringMorph': sum(1 for i in nu if rows[i]['morph']),
        'nonUniformSample': [sample(i) for i in nu[:: max(1, len(nu) // 4)][:4]],
        'restRadius': {'start': rows[0]['radiusRaw'], 'end': rows[-1]['radiusRaw']},
        'scale': {'rootStart': rows[0]['rootScale'], 'rootEnd': rows[-1]['rootScale'], 'sxMin': min(r['sx'] for r in rows), 'sxMax': max(r['sx'] for r in rows), 'plateTransformEnd': rows[-1]['plateTransform']},
    }

out = {}
for f in sys.argv[1:]:
    d = json.load(open(f))
    L = out[d['label']] = {'url': d['url'], 'when': d['when'], 'ua': d['ua'], 'cells': {}}
    for cn, c in d['cells'].items():
        C = L['cells'][cn] = {'viewport': c['viewport'], 'bundle': c.get('bundle'), 'dom': c.get('dom'), 'error': c.get('error'), 'reps': []}
        for rep in c['reps']:
            C['reps'].append({k: ({'error': v['error']} if 'error' in v else {'how': v['how'], **phase(v['rows'])}) for k, v in rep.items()})
print(json.dumps(out, indent=1))
