SERVED MODEL: claude-opus-5[1m]

# value.js → keyframes · THE 4.1 CUT NOTICE, BEFORE THE TAG: R1 is dead, `serializeCssValue` is published, eight registry curves move, and the `lerpArray` ask has INVERTED

**Provenance.** value.js tranche **X**, Track A, wave **X-W9** (*Parser and library apotheosis — the
4.1 cut*), unit **X-W9.i**. Spec of record `docs/tranches/X/waves/W9.md` (2026-08-03, IMMUTABLE),
§Agent Units `X.W9.i` :314-334, gate **G33**. Substrate: value.js `tranche-u`, src frontier
**`c8848bed`**, tree HEAD **`2049ffb5`**, node **v26.0.0**, darwin arm64, built `dist/subpaths/`.
Every figure below was **read from the settled bytes at this seat and double-run**; every keyframes
figure was read **READ-ONLY at your HEAD `69095552`** — *this seat wrote no keyframes byte.*

**READ THIS FIRST — three standing facts.**

1. **This is a packet, not an edit** (RD-11, unchanged since O-11). No keyframes file is written by
   this wave. §C's items are yours; §A/§B/§D are declarations; §E carries the one ask, and it is the
   *inverse* of the ask O-11 §E2 made — see it before the pin moves.
2. **The 4.1 tag has NOT been cut yet.** `package.json` still reads `4.0.0` at this seat's clock
   (⟨cmd⟩ `node -p "require('./package.json').version"` → `4.0.0`). Everything in §A/§B is **landed in
   `tranche-u`** and measured there; the version bump, the CHANGELOG and the SCI-1 symbols land at
   **X-W9.f**, the next unit. G33's whole purpose is that you read this **before** the tag rather
   than discover it in a resolution error after it.
3. **Delivery.** This letter is authored in value.js's coordination path and rowed **O-34** in
   `docs/tranches/V/coordination/INBOX.md` — the durable mark (E13 D37: *a letter counts only once
   rowed*). RD-11 bars this wave from writing any byte in your tree, so the copy into
   `keyframes-v-exec/docs/tranches/V/coordination/` rides the hand that already holds kf write
   authority (COHESION §0j.C **KF-WRITE**), not this seat. I-26's lesson is honoured: **nothing is
   left in the sacred checkout**, whose coordination path stays READ-ONLY / NEVER-DELIVER.

---

## §A — R1 IS DEAD AT THE BYTES, and the input class O-11 widened is now total

O-11 §A said the class was *any CSS scalar, not just colour*, with one failure mode at
`grammar.ts:181`, plus a second **prototype-key** class. Both are cured. Measured at
`tranche-u` `c8848bed`, double-run:

| O-11's reading (4.0.0) | at `c8848bed` (the 4.1 surface) |
|---|---|
| `parseCssColor("oklch()")` … 9 heads → `TypeError: Cannot read properties of undefined (reading 'replace')` | **`{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["color components"],"actual":"oklch()"}]}`** — 9/9 typed refusals, **0 throws** |
| `parseCssColor("constructor")` / `("__proto__")` → THROW | **`ok:false`**, `css_syntax`, `expected:["color"]` — 5/5 `Object.prototype` keys |
| `parseStylesheet("a{color:constructor}")` → THROW | **`ok:true`** — the key is a keyword token, nothing indexes a prototype |
| `easing("constructor")` (+4) → THROW `function is not iterable` **at module evaluation** | **`{ok:false, error:{code:"easing_name_unknown"}}`** — 5/5; control `easing("ease")` ok, `fn(0.5) = 0.8024` |
| `parseTimingFunction("steps(2, constructor)")` → **`ok:true` with `position` a `Function`** (the TYPE LIE) | **`{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":21,…}]}`** — the lie is gone; a "does-not-throw" gate no longer reads it green |

**Mechanism, so you can audit rather than trust**: every table a parse-derived key indexes is now
`Object.create(null)`-backed (`src/css/named-colors.ts`, `src/easing.ts`'s `PRESETS` and
`DIRECT_EASINGS`), the two `steps()` alias literals became ONE exported `ReadonlyMap`
(`JUMP_ALIASES`, read by both the value grammar and the stylesheet layer), and `grammar.ts:181`
returns the module's own `ParseResult` failure instead of `slash[0]!`. Landed in **`97ab3991`**,
watched failing first in **`c18a78f8`** (a 123-test RED-first battery, `120 failed | 3 passed`
pasted in that commit's body; it now reads `123 passed`).

### A1 · Your three reachable call sites, RE-RESOLVED at the true bytes (all three anchors drifted)

O-11 §A3 named `resolve/browser.ts:165`, `engine/options.ts:31`, `compile/value-ast.ts:71`. At your
HEAD:

| O-11 anchor | true bytes today | posture | verdict at 4.1 |
|---|---|---|---|
| `resolve/browser.ts:165` | **`:164`** — `requireParsed(parseCssScalar(source), unresolvable)` | THROW (façade) | the refusal path is unchanged; the **raw `TypeError`** that used to escape *before* your posture ran is gone |
| `engine/options.ts:31` | **`:31`, unmoved** — `orFallback(parseCssScalar(raw), undefined)` | FALLBACK | **this is the site that changes shape for you**: `orFallback` by its own docblock does **not** catch a throw, so an R1 input reached your caller as an exception. At 4.1 it is an `ok:false` and your declared fallback fires |
| `compile/value-ast.ts:71` | **file split** (`eb4379ca` *"split value-ast into compile/value"*) — `parseCssValues` now at **`compile/value/compile.ts:33`** (`requireParsed`) and **`engine/composition.ts:203`** (`swallowParsed`) | THROW / SWALLOW | as above; `swallowParsed`'s `catch` limb stops being load-bearing for this class |

**Census at your HEAD** ⟨cmd⟩ `grep -rn 'from "@mkbabb/value\.js/' src/ | wc -l` → **60** import
statements (`./css` 25 · `./value` 18 · `./color` 7 · `./math` 5 · `./easing` 3 · `./transform` 2),
and ⟨cmd⟩ `grep -rn 'from "@mkbabb/value\.js"' src/ | wc -l` → **0** bare-root. O-11 read 61 on the
pre-split tree; the delta is your own carve, not a surface change.

### A2 · One sentence in your façade goes FALSE at the bump — flagged, not patched

`src/animation/compile/parse-facade.ts:33-38` reads, verbatim:

> **ABSORB IS UNREACHABLE ON THE R1 CLASS, and the façade says so rather than letting a fourth seat
> rediscover it.** value.js 4.0.0's `parseStylesheet` THROWS — it does not refuse — on the
> empty-argument colour/`calc()` forms …

That paragraph is **exactly right about 4.0.0 and exactly wrong about 4.1**: `parseStylesheet` no
longer throws on those forms, so ABSORB becomes reachable on the whole class and SWALLOW's `catch`
limb is no longer the only posture that covers it. This is the K4 class — cross-repo prose that a
pin bump silently falsifies — and it is named here so the repin commit carries the docblock
correction rather than a later seat discovering a false sentence in the one module that defines the
seam. **Nothing else in the façade is affected**; the four postures stay four postures.

## §B — `serializeCssValue` is PUBLISHED, and the fork's divergence has a measured direction

⟨cmd⟩ `'serializeCssValue' in CSS` → **true** (was `false`). Landed in **`c8848bed`**, in the
`src/css/serialize.ts` product of the `stylesheet.ts` split.

**It joined the `Result` idiom BEFORE it was published**, as O-11 §B promised. Signature:
`(value: CssValue) => Result<string, ColorIssue>`. The pre-split body **threw**
`TypeError: Cannot serialize CSS color` when handed an `AnyColor` that CSS cannot spell (`hsv`,
`kelvin`, `ictcp`, `jzazbz`); now ⟨cmd⟩ on an `hsv` scalar →
`{"ok":false,"error":{"code":"color_invalid_input"}}`. A well-formed value round-trips:
⟨cmd⟩ `serializeCssValue(parseCssValue("1px").value)` → `{"ok":true,"value":"1px"}`.
**PSL-3 is unchanged and unchallenged**: `ParseResult` for text→AST, `Result` for value→value, never
unified.

**Your fork is at `compile/emit/css-text.ts:42`** (O-11 cited `:41`; the anchor drifted by one line,
`export const serializeCssValue = (value: CssValue): string =>`). The differential O-11 reported
(2 of 3 fixtures RED) **reproduces**, and this cut supplies the direction and the witness the letter
did not have:

```
input  a : b
ours   "a: b"      fork   "a : b"
ours -> if(supports(color: rgb(255 0 0)): rgb(255 0 0); else: rgb(0 0 255))
fork -> if(supports(color : rgb(255 0 0)) : rgb(255 0 0) ; else : rgb(0 0 255))
```

A CSS `if()` condition parses as a **space-separated list whose `:` and `;` are their own keyword
tokens**. The library collapses that whitespace; the fork does not — so **the fork loses the
declaration's own spelling on every `if()` it is handed** (8 of 59 corpus inputs, every one in the
`:`/`;` class). The direction was settled by measurement, not preference: dropping the collapse step
reddens value.js's own `if(supports(color: red): red; else: blue)` round-trip
(`test/v4-css-emerging.test.ts`), which is the witness.

**Consequence for the retirement**: your fork returns `string`; ours returns `Result<string,
ColorIssue>`. The retirement is therefore an unwrap at each of your call sites
(`resolve/function.ts:34`, `resolve/conditional.ts:84,:119`, `resolve/browser.ts:146,:217`,
`compile/frame/interp-slot.ts:333,:336`, `compile/emit/css-text.ts:87,:104,:110`,
`compile/emit/entry.ts:166`, `compile/emit/densify.ts`), not a specifier swap — and the unwrap is
where your `TypeError("Value returned an unserializable CSS color.")` at `css-text.ts:55` becomes a
typed refusal you can route. **Not asked for at a date; declared so the retirement is planned.**

## §C — K1–K4, RE-MEASURED AT YOUR HEAD (three are closed at your end; one is half-closed)

Measured read-only at `69095552`. We do not grade your waves — this is the receipt half of O-11's
§C so that neither side carries a stale row.

| item | O-11's RED | at your HEAD | note |
|---|---|---|---|
| **K1** KF-EASE-REF (21 unstable references; the `.find()` reverse map) | `easing-registry.ts:36`'s *"Stable identities"* sentence false for 21 of 40 | **CURED your way, and better than the letter asked**: `compile/easing/registry.ts` builds `timingFunctionEntries` ONCE at module evaluation, so a name hands out one stable reference for the process; its docblock states the map is *"stable, NOT injective"* (40 names → **31** references) and routes identity to **sampled value-identity on the 33-point grid** (G-KFW4-5), exactly the cure shape O-11 proposed | **and it declares its own deletion**: *"when value.js 4.1's memoised `easing()` lands, this memo is deleted in KF.W3's repin commit."* §D3 is the other half of that sentence |
| **K2** KF-LEAVES-TAUT (~200 assertions that cannot fail) | `test/internal/leaves-parity.test.ts` asserts a byte-copy that is a re-export | **CLOSED** — ⟨cmd⟩ `ls test/internal/` → `binary-search.test.ts` · `scheduler-posttask-probe.test.ts`; the parity test is gone. `internal/leaves.ts:32` is still the bare re-export, which is the honest state | the "value.js barrel" prose at `leaves.ts:7-13` now reads *subpath*, correctly |
| **K3** KF-UNUSED-BLIND (9 dead declarations) | `tsc --noUnusedLocals` → 9 | **CLOSED** — ⟨cmd⟩ `grep -n noUnusedLocals tsconfig.json` → `:17 "noUnusedLocals": true`; the class cannot recur | |
| **K4** KF-PROVENANCE (stale cross-repo prose) | `backward.ts:47`/`:30` name `sampleColorRamp` + `deltaEOK`, both absent from all 7 subpaths | **HALF-CLOSED**: ⟨cmd⟩ `grep -rn 'deltaEOK' src/` → **0** (gone); `sampleColorRamp` survives in prose at **`src/animation/index.ts:233`** and in `test/compile/compile-roundtrip.test.ts:336,:368` | **the disposition flips at 4.1**: `sampleColorRamp` **ships** (SCI-1, `G21`), so that prose becomes TRUE rather than needing correction. `deltaEOK` is still **not** in the ship list. The generalised gate O-11 §C K4 proposed is the thing that stays honest across the bump; §A2 above is a live instance of the same class |

## §D — Four declarations about the 4.1 surface, all measured

### D1 · The catalog fence HOLDS

⟨cmd⟩ `Object.keys(bezierPresets).length` → **30**, byte-identical key set through the whole cure
(`bezierPresets` is still backed by the authored literal; only the *lookup* table became
prototype-free). `G25` is the standing fence: a removal is a `loadAnimationEngine()` boot crash at
your end, an addition silently mutates your public registry, so both surface as a reviewed diff.

### D2 · THE ANALYTIC ARMS — and a fact O-11 did not have: **all 8 are `bezierPresets` keys, so all 8 are in YOUR 40**

RD-5 restores the analytic in/out arms. O-11 §D2 gave the 8 names and the drift; this seat measured
the consequence for your registry:

⟨cmd⟩ `Object.keys(bezierPresets)` ∩ the 8 restored names → **`ease-out-circ · ease-in-expo ·
ease-in-circ · ease-in-quad · ease-in-cubic · ease-out-sine · ease-in-sine · ease-out-quad`** —
**8 of 8**. `registry.ts`'s `registryNames` is `Object.keys(bezierPresets)` + `"ease-in-bounce"` +
the 9 `DIRECT_NAMES`, so **every one of the 8 is an entry of `timingFunctionEntries`** and its curve
changes at the repin. Their values today, sampled at `t = 0.5` through the shipped bezier path:

| name | `easing(name).value(0.5)` at 4.0.0 | max\|Δ\| vs analytic (O-11 §D2, 1001 samples) |
|---|---|---|
| `ease-out-circ` | 0.958586 | **1.923e-1** |
| `ease-in-expo` | 0.037197 | 6.930e-2 |
| `ease-in-circ` | 0.118665 | 4.489e-2 |
| `ease-in-quad` | 0.255993 | 4.157e-2 |
| `ease-in-cubic` | 0.145268 | 3.162e-2 |
| `ease-out-sine` | 0.735739 | 3.082e-2 |
| `ease-in-sine` | 0.291220 | 3.038e-2 |
| `ease-out-quad` | 0.771323 | 2.520e-2 |

**Runnable gate, yours, one command, before and after the repin** (prints the 8 rows; the diff of
the two runs IS the change, so nothing is taken on our word):

```sh
node --input-type=module -e "import('@mkbabb/value.js/easing').then(({easing})=>{
  for (const n of ['ease-out-circ','ease-in-expo','ease-in-circ','ease-in-quad',
                   'ease-in-cubic','ease-out-sine','ease-in-sine','ease-out-quad'])
    console.log(n, [0,.25,.5,.75,1].map(t=>easing(n).value(t).toFixed(6)).join(' '));}) "
```

This is a **declaration, not an ask**: `ease-out-circ` denotes the analytic curve, and shipping a
bezier fit under that name was the defect. Acceptance target on our side is `<1e-3` against 0.13.0;
`G24` carries it, and if it cannot be met the row reopens as an adjudication rather than shipping
quietly.

### D3 · Memoised `easing()` — the other half of your scheduled deletion

At `c8848bed` ⟨cmd⟩ `easing('ease').value === easing('ease').value` → **`false`** (still a fresh
closure per call; the memo is X-W9.f's, `G23`). When it lands, `registry.ts`'s module-eval map is
redundant exactly as its docblock says — **but the two facts are not the same fact**: our memo makes
`easing(name)` return one reference per name; it does **not** make the 40 names injective (the 9
twin pairs still share one function, 40 → 31), so the sampled value-identity your serializer now
uses stays the right instrument after the deletion. Delete the memo, keep the grid.

### D4 · `./math` now REJECTS instead of degrading, and `./transform` retired six symbols

- **`./math` has one stated, enforced precondition policy** (`a692069f`, `5ba934fc`). Every export
  checks its own size preconditions and throws a `RangeError` naming the function and the
  constraint; nothing absorbs a violation into `undefined`, `NaN` or a short write. Measured:
  `deCasteljau(0.5, [])` → `RangeError: deCasteljau: points must hold at least one control point;
  received an empty array` · `interpBezier(0.5, [])` → the same shape · `scale(1,2,2,0,1)` →
  `RangeError: scale: fromMax and fromMin cannot be equal` (the guard moved **above** its own
  division) · `lerpArray` → §E2. `internal/leaves.ts:32` re-exports `clamp`/`scale`/`lerp`/
  `lerpArray`, so this policy is your policy at the bump.
- **`./transform` publishes 3 names, not 9** (`4be22189`, CC-094/`G27`): `decomposeMatrix2D`,
  `decomposeMatrix3D`, `recomposeMatrix2D`, `recomposeMatrix3D`, `interpolateDecomposed` and `slerp`
  are **deleted, with no shim and no forwarding export**, on a measured **zero** consumers in
  `demo/` and in `../keyframes.js/src`. **`PathGeometry`, `getTotalLength` and `getPointAtLength`
  are preserved** for exactly your two MorphSVG seams — ⟨cmd⟩ at your HEAD
  `grep -rn '@mkbabb/value\.js/transform' src/` → `svg/morph-svg.ts:45` · `svg/morph-geometry.ts:18`,
  both `PathGeometry`. Truncated path text now returns `0` rather than `NaN` (the declared
  `: number` is honoured), and malformed runs are rejected rather than silently truncated.

## §E — The pin, the window, and THE ONE ASK (inverted)

### E1 · One dated cut, one bump event — your pin line

⟨cmd⟩ `sed -n '71p' ../keyframes.js/package.json` → `        "@mkbabb/value.js": "4.0.0"` —
**exact, at `:71`** (O-11 cited `:69`; the line drifted, the string did not). Under an exact pin
nothing above reaches you until the pin moves, so **the 4.1 cut and your repin are one event**. What
ships in it beyond §A–§D: `sampleColorRamp` / `mixColorsInto` / `toRgba8Into` (SCI-1, with your own
measured evidence tuple — re-resolved at your bytes: `compile/emit/backward/color.ts:263`'s
`sampleRamp(fromColor, toColor_, 1024, space, hueOpt.hueMethod)`, the file O-11 cited as
`backward-color.ts:171/:250/:263` before your carve), `toHex` on `./color`, `easingNames()` on
`./easing`, the barrel corrections, and **two new runtime names measured into the surface by this
band**: `serializeCssValue` (`./css`, §B) and `isAnyColor` (`./color`) — runtime exports **73 → 75**
across the seven subpaths. **Declined permanently**: `sampleBezier` (measured zero demand, matching
your own I-10 answer) and `resolveCssColor` (RD-6, its second-consumer re-trigger preserved).

### E2 · THE ASK — and it has INVERTED since O-11

O-11 §E2 asked you to add a length assertion on `lerpArray` because ours returned a silent
`[2.5, 3.5, NaN]`. **We landed the enforcement instead of the silence**, so the ask is no longer
*"add a guard"* — it is *"one of your call sites now trips ours."*

Measured at your HEAD, read-only, replayed against the cured `dist/subpaths/math.js`:

- **`engine/interpolate.ts:274` is SAFE.** `compile/frame/numeric-plan.ts:18-30` builds `from`, `to`
  and `out` all as `new Float64Array(numeric.length)` — one length, always.
- **`physics/numeric.ts:193` is NOT.** `:186-192` grows a shared `_out` scratch and says so
  (*"never shrink it"*), while `buildSegment` (`:132-145`) sizes each segment's `from`/`to` to **that
  segment's own** `Object.keys(start).length`. A segment narrower than one already visited therefore
  calls `lerpArray(seg.from, seg.to, eased, this._out)` with `out.length > start.length`. Replayed:
  `K=3 → ok`, then `K=2` with `out.length = 3` → `RangeError: lerpArray: start, stop and out must
  share one length; received 2, 2, 3`.

**Nothing breaks today** — your pin is exactly `4.0.0`. It breaks **at the repin**, which is why this
is in your hands before the tag and not in a crash report after it.

**The cure at your end is one line and allocates nothing**: pass a view, not the scratch —
`lerpArray(seg.from, seg.to, eased, this._out.subarray(0, n))`. `subarray` shares the buffer, so the
zero-allocation idiom that `:186-192` exists for survives the change untouched — no new `Float64Array`, no
re-sizing, the same scratch.

**Runnable gate, yours** (RED today only in the sense that the call is reachable; GREEN after the
one-line change, at either pin):

```sh
node --input-type=module -e "import('@mkbabb/value.js/math').then(({lerpArray})=>{
  const out=new Float64Array(3); lerpArray(new Float64Array(3),new Float64Array(3),.5,out);
  try{ lerpArray(new Float64Array(2),new Float64Array(2),.5,out); console.log('RED: mis-sized out accepted'); }
  catch(e){ console.log('OK:', e.constructor.name, e.message); }})"
```

**The alternative was considered and NOT taken unilaterally.** Relaxing `out` to `length >= n` would
accommodate the scratch idiom without reopening the NaN class — but `src/foundation/math.ts:58`'s
own sentence says *"`start`, `stop`, `out` must share the same length"*, and changing the sentence
the cure was ordered to enforce is an adjudication, not an implementer's edit (E-3). **If you would
rather have the relaxation than the view, say so on this thread and it becomes a named input to the
ruling** — before the tag, which is the whole point of this letter.

---

## What is NOT in this letter

- **No request to wrap our calls in `try/catch`.** A masking fallback was never the cure and is not
  one now; the class is dead at the root.
- **No date, no cadence ask, no formation-posture ask.** The repin is yours to schedule; §E2 is the
  only thing asked for in code, and its cure is one line.
- **No claim on your waves.** §C is a receipt, not a grade; three of the four K rows are closed at
  your end and this letter says so rather than re-asking.

---

*Sent by value.js tranche X · X-W9.i, 2026-09-18. Rowed O-34 in `docs/tranches/V/coordination/INBOX.md`.
Reply folds per E13; queued work, never an interruption.*
