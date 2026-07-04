# S · audit lane — legacy/workaround/fallback sweep over `src/**` (the library)

Scope: `src/` only (parsing, units, units/color, quantize, transform). Repo at
`a7eabcc` (branch `tranche-q`). Audit-only — no edits, no commits. Evidence
below is file:line-cited; every numeric claim was computed with a throwaway
`node -e` script (shown inline) against the actual constants/formulas in the
tree, not eyeballed.

---

## P0 — BOOKED defect: `srgbToLinear` decode uses the wrong-domain threshold

**Files**: `src/units/color/conversions/transfer.ts:18-19,22-35` (canonical) and
`src/units/color/gamut.ts:28-40` (an intentionally-inlined duplicate, "to avoid
circular dep with utils.ts").

Both copies are **byte-identical** (same constants, same branch order) — so
this is one defect, not a two-copy divergence. But it IS a live DRY liability:
any future fix must touch both sites; nothing enforces they stay in lockstep
(no shared constant, no test asserting equality between them).

### The defect

Per CSS Color 4 §... / the standard sRGB piecewise transfer function, the
**decode** direction (`srgbToLinear`, "gamma-encoded → linear-light") must
threshold its **encoded**-domain input against **0.04045**; the **encode**
direction (`linearToSrgb`, "linear-light → gamma-encoded") must threshold its
**linear**-domain input against **0.0031308** (`0.04045 / 12.92`). This is
exactly the reference implementation (W3C's own `lin_sRGB`/`gam_sRGB`):

```js
function lin_sRGB(v){ return Math.abs(v) <= 0.04045   ? v/12.92 : sign*(((abs+0.055)/1.055)**2.4); }
function gam_sRGB(v){ return Math.abs(v) >  0.0031308  ? sign*(1.055*abs**(1/2.4)-0.055) : 12.92*v; }
```

The tree's code (`transfer.ts:22-35`, `gamut.ts:33-40`):

```ts
const SRGB_TRANSITION = 0.04045;
const SRGB_LINEAR_TRANSITION = SRGB_TRANSITION / SRGB_SLOPE; // 0.0031308…

function srgbToLinear(channel) {           // channel is ENCODED-domain
  if (abs <= SRGB_LINEAR_TRANSITION) …     // ← checks against the LINEAR threshold — BUG
}
function linearToSrgb(channel) {           // channel is LINEAR-domain
  if (abs <= SRGB_LINEAR_TRANSITION) …     // ← correct: this IS the linear threshold
}
```

`linearToSrgb` (encode) is correct. `srgbToLinear` (decode) checks the
**encoded** input against the **linear**-domain threshold (0.0031308) instead
of the encoded-domain one (0.04045) — so any encoded channel in
`(0.0031308, 0.04045]` takes the power-law branch when it should take the
linear branch.

### Precise blast radius (measured, not estimated)

Affected input band: encoded sRGB channel ∈ (0.0031308, 0.04045] → **8-bit
channel values 1 through 10** (v=11/255=0.0431 is outside the band). Round-trip
`srgbToLinear → linearToSrgb` (the latter is correct, so this isolates the
decode-side error) at each affected 8-bit value:

| v (0-255) | current round-trip | correct round-trip | Δ |
|---|---|---|---|
| 1 | 3 | 1 | **+2** |
| 2 | 4 | 2 | **+2** |
| 3 | 4 | 3 | +1 |
| 4 | 5 | 4 | +1 |
| 5 | 6 | 5 | +1 |
| 6 | 6 | 6 | 0 (rounds away) |
| 7-12 | exact | exact | 0 |

Max relative error in raw linear-light value: **2.86×** at v≈0.8/255 (i.e. the
very-near-black band the linear segment exists specifically to serve).
Continuity at the true boundary (c=0.04045) is near-exact (9th-decimal
agreement) — the bug is invisible at the boundary and maximal at the bottom of
the band, which is exactly why it has survived: spot-checks at "typical" dark
colors (v≥12) never trip it.

**Concretely: 8-bit sRGB values 1-5 (near-black shadow tones) are
systematically LIGHTENED by 1-2 code values (out of 255)** whenever they pass
through linear-light space — i.e. every conversion to/from OKLab, Lab, XYZ,
LCH, OKLCH, OKHSL/OKHSV, every WCAG luminance computation, and the image
quantizer's per-pixel OKLab projection.

### Consumers of the buggy `srgbToLinear` (transfer.ts export)

- `src/units/color/conversions/xyz-extended.ts:61` — the RGB↔XYZ hub leg used
  by **every** color-space conversion that isn't on a `DIRECT_PATHS` shortcut
  (Lab, LCH, wide-gamut RGB spaces, …).
- `src/units/color/conversions/direct.ts:87-89,165-167` — the perf-critical
  `DIRECT_PATHS` (rgb↔oklab, rgb↔oklch) — the **hot path** color2Into rides.
- `src/units/color/boundary.ts:102` (`decode: srgbToLinear`) — gamut-boundary
  sampling.
- `src/quantize/index.ts:12,125` — `dominantColor`/`quantizePixels` calls
  `srgbToOKLab` (gamut.ts's copy) per pixel. Real photos routinely have large
  near-black regions (shadows, letterboxed borders, dark UI chrome) — this is
  a genuine product-facing consumer, not just a theoretical one.
- `src/units/color/contrast.ts:56` (`wcagRelativeLuminance` → `color2(…,
  "srgb-linear")`) — WCAG contrast-color()/contrast-ratio for near-black
  backgrounds is measurably (if narrowly) off.

### Already-booked, already worked around

`test/okhsl.test.ts:63-79` documents this defect verbatim and **narrows its
own sweep domain** (`l ≥ 0.4`, `s ≤ 0.8`) specifically to dodge the dark+
saturated corner that lands in the buggy band — i.e. there is a live test
that avoids exercising the defect rather than pinning correct behavior. This
is the "silent handling" pattern in test form: the workaround is documented,
but it is still a workaround, not a fix.

### Fold-in verdict

**Fix now, in `src/units/color/conversions/transfer.ts`** (single-line: change
`srgbToLinear`'s guard from `SRGB_LINEAR_TRANSITION` to `SRGB_TRANSITION`) —
**and mirror the same one-line fix into `gamut.ts`'s inlined copy**, or (better,
root-routed) delete `gamut.ts`'s private copy and import from `transfer.ts`
now that both live under `units/color/` (the "circular dep with utils.ts" that
justified the inline copy was about the OLD `utils.ts` home; `transfer.ts` is
a leaf module with no such cycle — re-verify the import graph before dropping
the duplicate). Expected fallout: `test/okhsl.test.ts`'s dodged sweep band
(`l<0.4 / s>0.8`) should be reinstated once fixed, since the defect it was
avoiding will be gone; a couple of golden/snapshot values that were computed
against the buggy near-black behavior may shift by 1-2/255 — re-run
`npm test` after the fix and expect ONLY near-black-adjacent fixtures to move.
Blast radius is real but small in magnitude (≤2/255) and narrow in domain
(v=1-5 of 255) — safe to fold into a single wave item, not a standalone wave.

**Root-routing**: value.js src (both sites are in this repo; no glass-ui/kf
producer involved — this is pure color-math correctness internal to value.js).

---

## P0 — the "0 as any / 2 policy-documented as-unknown-as" ledger in `CLAUDE.md` is stale

`CLAUDE.md` §Conventions asserts: *"src/ holds 0 `as any` and 2
policy-documented `as unknown as` irreducibles (DOM `CSSStyleDeclaration` at
`normalize.ts:117`; clone-reinterpret at `parsing/color.ts:59`)."*

Current count in `src/`: **`as any` = 0** (confirmed, matches the doc) but
**`as unknown as` = 7**, not 2:

| # | Site | Status vs. ledger |
|---|---|---|
| 1 | `units/normalize.ts:137` (`styleRecord`) | the documented DOM-structural-impossibility cast — line drifted 117→137 but same site, still well-documented inline (H.md §2 H2 citation) |
| 2 | `parsing/color.ts:86` (`resolveToPlainColor`, "clone-reinterpret") | the documented one — line drifted 59→86, still well-commented |
| 3 | `units/color/contrast.ts:51` (`normalizeColor(...) as unknown as Color<number>`) | **NOT in the ledger.** Added at VJ-Q1 (Tranche Q). Commented (generic-erasure boundary), but never tallied. |
| 4 | `units/color/dispatch.ts:282` (`color2Into`, direct-path erasure) | **NOT in the ledger.** |
| 5 | `units/color/dispatch.ts:311` (`color2Into`, `fromXYZIntoFn` egress) | **NOT in the ledger.** |
| 6 | `units/color/dispatch.ts:318` (`color2Into`, `fromXYZFn` egress) | **NOT in the ledger.** |
| 7 | `units/color/dispatch.ts:324` (`color2Into`, general fallback) | **NOT in the ledger.** |
| 8 | `parsing/color.ts:532` (`contrastColorEval(parsed as unknown as Color)`) | **NOT in the ledger.** Commented, cites the same boundary class as #2. |

(That's 8 sites, "7" was my grep-line count before splitting #1 from the
duplicate mention — corrected table above; there are 8 call sites across 4
files.)

**Verdict on each**: all 8 are the SAME structural-erasure class the ledger's
2 documented sites already represent — `Color<T>` generic-over-component-type
erasure where the runtime is provably `Color<number>` but TypeScript can't
thread that through a shared dispatch function, or the DOM
no-string-index-signature class. Each site carries a load-bearing inline
comment explaining why the cast is safe. **None of the 8 look reducible** by
inspection — this is not "sloppy casting crept in," it's the SAME irreducible
class recurring at new call sites as VJ-Q1/VJ-Q2/VJ-Q3 (Tranche Q) added the
WCAG leaf and the zero-alloc `color2Into` fast path. The defect is purely
**documentation drift**: the CLAUDE.md ledger was never updated when Tranche Q
added 6 new instances of the same accepted pattern, so the "2" figure is
false today and will keep drifting every time a new perf-critical or
generic-dispatch leaf is added.

**Root-routing**: value.js src (docs). Candidate wave-item: update the
CLAUDE.md ledger line to either (a) state the actual current count with a
regenerable source-of-truth note ("`grep -rn 'as unknown as' src/ | wc -l`",
mirroring the LoC-count precept already used elsewhere in this same file —
"LoC counts intentionally omitted... `wc -l` is the source of truth"), or (b)
name the erasure-class + point at a lint rule / comment convention instead of
a hardcoded count. A hardcoded number in a doc that changes every wave a
generic dispatch function is added is exactly the kind of counter this
project's own convention (LoC precept) has already learned to stop hardcoding.

---

## P1 — DRY: `reverseCSSIterationCount` is a dead public export whose logic is duplicated inline

- `src/parsing/units.ts:151-154` defines and `src/index.ts:384` + the
  `./parsing` subpath barrel (`src/subpaths/parsing.ts:110`) re-export
  `reverseCSSIterationCount` — a one-line public API:
  ```ts
  export function reverseCSSIterationCount(count: number): string {
      if (count === Infinity) return "infinite";
      return String(count);
  }
  ```
- **Zero consumers anywhere**: not in `value.js` itself (src/test/demo/api),
  not in `../keyframes.js/src`, not in `../glass-ui/src`, not in
  `../fourier-analysis` (confirmed by repo-wide grep across all four repos —
  only hit is its own definition/export chain and one historical doc
  reference in `docs/tranches/D/research/Dm-parsing.md`).
- Meanwhile `src/parsing/animation-shorthand.ts:224-229`
  (`reverseAnimationShorthand`) **reimplements the identical logic inline**:
  ```ts
  opts.iterationCount === Infinity ? "infinite" : String(opts.iterationCount)
  ```
  byte-for-byte the same branch as the orphaned export.
- Contrast: its sibling `reverseCSSTime` (same file, same export list) IS
  consumed (5 consumer-files across kf/glass-ui) — so this isn't "the whole
  reverse-serializer cluster is unused," it's specifically this one function
  that never got wired to its natural call site.

**Verdict**: genuine dead export + DRY violation, same fix. Root-routed to
`value.js src`: have `reverseAnimationShorthand` call
`reverseCSSIterationCount` instead of reimplementing it. Low risk (pure
refactor, output-identical) — good small wave-item. Because
`reverseCSSIterationCount` is exported from the public barrel + a subpath, do
NOT delete it outright (registry-published API, semver-breaking); wiring the
internal duplicate to call it is the KISS/DRY fix without a breaking removal.

---

## P2 — `ch` unit approximation's catch-all masks a real null-deref, not just "canvas unavailable"

`src/units/utils.ts:538-556` (the `ch` unit resolver in
`convertToPixels`/whichever caller):

```ts
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;   // getContext CAN return null
ctx.font = `${fontSize}px ${getComputedStyle(element).fontFamily}`;
const zeroWidth = ctx.measureText("0").width;
value *= zeroWidth > 0 ? zeroWidth : fontSize * 0.5;
} catch {
    value *= fontSize * 0.5;   // catches EVERYTHING, including the null-deref the `as` cast invited
}
```

`getContext("2d")` is typed `CanvasRenderingContext2D | null` in DOM lib; the
`as CanvasRenderingContext2D` cast asserts non-null, and the very next line's
`ctx.font = …` would throw a `TypeError` on a real null (e.g. a browser that
returns `null` for OffscreenCanvas 2D contexts under strict contexts, or a
canvas-less headless/jsdom environment reached via a path that bypassed the
outer `typeof … !== "undefined"` guard). The blanket `catch {}` then silently
folds that real null-deref into the SAME fallback as the intended
"approximation, canvas measurement unavailable" case — so a genuine
regression here (e.g. a future browser API change) would present as "ch units
are slightly imprecise," never as a visible failure.

**Verdict**: PLAUSIBLE, not CONFIRMED as a live bug today (no repro found that
actually nulls the context in this codebase's supported targets) — but it is
exactly the "no silent handling" precept violation in miniature: the code
narrows a nullable type with `as`, then relies on try/catch 2 lines later to
paper over the exact failure that narrowing promised couldn't happen. Fix:
check `ctx` for `null` explicitly and fall through to the `fontSize * 0.5`
branch on that specific condition, narrowing the `catch` (if kept at all) to
whatever `measureText` itself can throw (rare/none in spec).

**Root-routing**: value.js src (`units/utils.ts`).

---

## P2 — god-module candidates in `src/` exceed the repo's own decomposition discipline

CLAUDE.md's "no god module" precept is stated as scoped to `demo/` (≤400 LoC),
but this audit's binding precept set is broader (>500 hard). By line count,
`src/` has accumulated several files past 500 despite a documented history of
decomposition waves (G.W1 Lane B split `color/conversions/` into 8 modules;
K.W2e moved contrast helpers out of `dispatch.ts`; K-DISP moved the hue/mix
cluster out of `dispatch.ts` into `mix.ts`) — yet the two files those waves
were relieving pressure on are STILL the two largest non-data files:

| File | LoC | Character |
|---|---|---|
| `units/color/index.ts` | 968 | `Color<T>` base + 15 space classes — mostly repetitive per-space boilerplate, a plausible non-god-module carve-out (data-shaped, not logic-shaped) |
| `parsing/stylesheet.ts` | 864 | full CSS at-rule + qualified-rule parser — logic-dense, a real decomposition candidate |
| `parsing/color.ts` | 854 | 15 color-space parsers + relative-color-syntax + `color-mix()` + `color()` + system colors — logic-dense |
| `units/constants.ts` | 799 | unit tables — data-shaped |
| `units/utils.ts` | 722 | unit conversion + CSS utilities (also home to the P2 `ch`-approximation finding above) |
| `parsing/scroll-timeline.ts` | 667 | scroll-driven-animation grammar — logic-dense |
| `units/color/constants.ts` | 613 | matrices/white-points/named-colors — data-shaped |
| `parsing/index.ts` | 587 | top-level CSS parsing composition |
| `transform/path.ts` | 562 | `PathGeometry` + DOM-free length/point sampling |
| `units/normalize.ts` | 550 | (this file itself; see the C1/C7 perf-cache commentary already inline) |
| `transform/decompose.ts` | 541 | 2D/3D matrix decomposition + quaternion slerp |
| `units/color/dispatch.ts` | 522 | `color2`/`color2Into`/`gamutMap` dispatch core |
| `easing.ts` | 515 | 30+ named easing fns + bezier/stepped/linear() |
| `units/color/gamut.ts` | 514 | Ottosson gamut mapping (also home to the P0 srgb defect above) |

**Verdict**: this is a real, measured drift, but MIXED severity — several of
these (constants.ts × 2, color/index.ts's 15-class boilerplate) are
data-shaped and a LoC cap is a poor proxy for "doing too much"; the
logic-dense ones (`parsing/stylesheet.ts`, `parsing/color.ts`,
`scroll-timeline.ts`) are the better decomposition candidates and match the
pattern the project has already applied successfully elsewhere (`conversions/`
8-way split). Not urgent enough to block anything, but worth a named wave-item
given the project's own track record of treating this as real technical debt
in `color/` and `api/`.

**Root-routing**: value.js src. No single fix — candidate future wave, same
shape as the G.W1 Lane B `conversions/` split.

---

## Clean / explicit-failure discipline confirmed (no finding)

- **Parsing `tryParse`/`catch{}` sites** (`parsing/extract.ts:157-163`,
  `parsing/syntax.ts:161-166,213-218`) are parser-combinator-idiomatic:
  documented `Maybe`-shaped helpers (`tryParseTime → undefined`,
  `validateSyntax → false`, `coerceToSyntax → null`) with the caller's
  fallback behavior named in the docstring ("the caller's KILL fork"). Not
  silent — the sentinel IS the contract.
- **`normalizeValueUnits`'s unit dispatch** (`units/normalize.ts:359-416`)
  throws explicit `TypeError`s for every unrecognized length/angle/time/
  resolution unit rather than defaulting silently; only the terminal
  `default:` branch (superType-less values) passes the raw unit through,
  which is the documented behavior for non-dimensional values.
- **Color dispatch space-lookup** (`units/color/dispatch.ts:214,220,316`)
  throws `Unknown source/target color space` rather than defaulting to a
  space — no silent gamut/space substitution.
- **`dominantColor`'s empty-palette path** (`quantize/index.ts:182`) returns
  `null` explicitly and typed (`QuantizedColor | null`), not a silent
  black/white default.
- **No `deprecated`/`TODO`/`FIXME`/`XXX` markers anywhere in `src/`** (repo-wide
  grep, zero hits outside the CSS-spec term "legacy color syntax family" which
  is a spec vocabulary word, not a code smell — `COLOR_SYNTAX_FAMILY`,
  `color-mix()` legacy-vs-non-legacy interpolation rule, CSS3 legacy system
  colors).
- **Post-K-DISP / post-KF-1**: no residual duplicate `interpolateHue`/
  `mixColors` implementation left behind in `dispatch.ts` (K-DISP's move to
  `mix.ts` is a clean cut — `dispatch.ts` only carries a doc-comment pointer at
  line 15-16, no dead code).
- **`typecheck` clean**: `npx vue-tsc -p tsconfig.lib.json --noEmit` and a
  bare `tsc --noEmit -p tsconfig.json` both ran 0-error at HEAD during this
  audit — the 8 `as unknown as` sites above are not masking a type-level bug
  today, only a documentation-count bug.

---

## Summary (≤40 lines)

- **P0 (fix-now, sized)**: `srgbToLinear` (decode) checks its ENCODED-domain
  input against the LINEAR-domain threshold (0.0031308 instead of 0.04045),
  duplicated identically in `transfer.ts:22-35` and `gamut.ts:33-40`.
  Measured blast radius: 8-bit sRGB values 1-5 round-trip through
  linear-light space 1-2/255 too light; values ≥11 unaffected; boundary
  (v≈10-11) near-exact by design-continuity. Affects every RGB→{Lab, OKLab,
  XYZ, LCH, OKLCH, OKHSL/OKHSV} conversion, WCAG luminance/contrast for
  near-black colors, and `quantize/`'s per-pixel OKLab projection (real photos
  with shadow/letterbox regions). Already booked + worked around by
  `test/okhsl.test.ts:63-68`'s narrowed sweep domain. Fix: flip one constant
  in `transfer.ts`; mirror or (better) dedupe `gamut.ts`'s copy. Root: value.js
  src.
- **P0 (docs, but load-bearing)**: CLAUDE.md's "0 `as any`, 2 policy-documented
  `as unknown as`" ledger is stale — actual count is 8 across 4 files (6 added
  post-Tranche-Q at `contrast.ts:51`, `dispatch.ts:282/311/318/324`,
  `parsing/color.ts:532`), all the SAME accepted generic-erasure class as the
  2 named sites, none look reducible, but the hardcoded "2" is simply false
  and will keep drifting. Root: value.js src (docs) — replace the count with
  a regenerable-count note, same pattern the file already uses for LoC.
- **P1**: `reverseCSSIterationCount` (`parsing/units.ts:151`) is a dead public
  export (0 consumers in value.js/keyframes.js/glass-ui/fourier-analysis) whose
  identical one-line logic is reimplemented inline in
  `reverseAnimationShorthand` (`animation-shorthand.ts:224-229`). Wire the
  internal call site to the export; do not delete (published API). Root:
  value.js src.
- **P2**: `ch`-unit canvas approximation (`units/utils.ts:538-556`) narrows a
  nullable `getContext` result with `as`, then a blanket `catch{}` 2 lines
  later silently folds a real null-deref into the same fallback as
  "measurement unavailable" — no live repro found, PLAUSIBLE not CONFIRMED.
  Root: value.js src.
- **P2**: `src/` has 14 files >500 LoC despite a track record of successful
  decomposition waves elsewhere (`color/conversions/` 8-way split); the
  data-shaped ones (constants tables, 15-class color boilerplate) are weak
  candidates, but `parsing/stylesheet.ts` (864), `parsing/color.ts` (854),
  `parsing/scroll-timeline.ts` (667) are logic-dense and match the pattern
  already fixed elsewhere. Root: value.js src, future wave.
- **Clean**: parsing's `tryParse`/`catch` sites are documented Maybe-shaped
  sentinels (idiomatic, not silent); `normalizeValueUnits` and color dispatch
  both throw explicit errors on unknown units/spaces; no
  `deprecated`/`TODO`/`FIXME` in `src/`; no residual K-DISP duplication;
  typecheck 0-error at HEAD.
