# U.W-LIB — DESIGN MEMO (the U-F30 invariant pick + the U-F29 shape pick)

*Author: the design-loop research/synthesize leg. Governs against `docs/tranches/U/waves/U.W-LIB.md`
(the wave of record) and `audit/registry.md` §11/§13.5/§15/§20/§22/§23/§25/§26/§28/§29. Where a cited
line drifted from the live tree it is noted inline. NOT committed; a work-product for the prototype leg.*

**Evidence base**: every RED frame below is captured LIVE from the published-3.1.0 substrate via
`test/_probe_lib_gates.test.ts` (a scratch probe; not a gate), re-run this session on `tranche-u`.

```
G1  parseCSSValue('1px solid red').toString()            → "1px"                       (silent drop)
G1  parseCSSValue('translate(10px) rotate(45deg)')       → "translateX/Y/Z(10px)"      (drop rotate + F31)
G2  color-mix(in srgb, red 30%, blue).toString()         → "rgb(0.30000000000000004 0 0.7)"
G3a rgb(from red r g b).toString()                       → "rgb(1 0 0)"
G3b rgb(from red calc(r + 10) g b).toString()            → "rgb(11 0 0)"   (calc on NORMALIZED bindings: 1+10)
G4  rgb(76.5 0 178.5).toString()  /  rgb(255 0 0)         → unchanged, correct  (the guard — must stay)
G5  mixed.value.entries()                                → r=0.3000… g=0 b=0.7        (stored normalized)
G5  colorUnit2(mixed,'rgb').entries()                    → r=0.00118 g=0 b=0.00275     (double-normalize)
G7  rotate(45deg)/translate(10px)/scale(2)               → all → X/Y/Z 3-axis          (F31)
G8  sin(30deg) → value 0.5 unit "deg"  ;  calc(sin(30deg)*100px) → 50 "deg"            (F32)
G9  linear-gradient(90deg, red 20%, blue 80%)            → "linear-gradient(90deg, rgb(255 0 0), 20%, rgb(0 0 255), 80%)"  (F33)
G10 color2(P3(0,1,0),'rgb')  and  (…,{correctGamut:false}) → IDENTICAL [0, 0.875, 0.275]  (3rd arg ignored → F74)
G11 typeof recomposeMatrix2D → "undefined"   (F35 dead-end)
```

Line-drift found vs the registry (task: "note drift"):
- R-2 (§20) cites "`color.ts:359` mixColors / `color.ts:443` resolveRelativeColor". **`resolveRelativeColor`
  was extracted to `parsing/color/relative-color.ts:125-164`** (the W1-8 god-module split); the color-mix
  `mixColors` call is at `color.ts:358` and its wrap at `:359`. The relative-color normalized-binding loop
  the wave calls `:137-142` is at **`relative-color.ts:136-139`** (bindings), `:142-143` (values/alpha),
  `:162-163` (construct + wrap). Cite the block, not the integer.
- U-F34's `xyzToICtCp` is NOT a stale duplicate of `xyz2ictcp` — they have **different signatures**
  (`difference.ts:151` scalar `(x,y,z)→tuple` for `deltaEITP`; `conversions/ictcp.ts:27` `XYZColor→ICtCpColor`
  for dispatch). A naive rename COLLIDES. See F34 note.

---

## U-F30 — RECOMMENDATION: **composite** (denorm-on-output for the color-mix parser locus · normalize-on-construct for the relative-color path)

### Why the single shapes each fail the whole gate set

| Shape | LIB-G2 mix | LIB-G3a rel | LIB-G3b calc=265 | LIB-G4 direct | LIB-G5 refeed | LIB-G6 raw convention |
|---|---|---|---|---|---|---|
| denorm-on-output (both) | ✓ 76.5 | ✓ 255 | **✗ 2805** (denorm scales `11`) | ✓ (parse-locus) | ✓ | ✓ if at parser |
| normalize-on-construct (both) | **✗ can't** (see below) | ✓ 255 | ✓ 265 | ✓ | ✓ | **✗ if inside mixColors** |
| normalization-state brand (both) | ✓ 76.5 | ✓ 255 | **✗ 11→2805** | ✓ | ✓ | ✓ | 
| **composite (mix=denorm-out · rel=normalize-construct)** | **✓** | **✓** | **✓ 265** | **✓** | **✓** | **✓ no co-migration** |

- **denorm-on-output can't reach the calc `265`** — the LIB-G3-b discriminator the wave already hands the
  loop. `resolveRelativeColor` (`relative-color.ts:136-139`) builds `bindings` from the **normalized**
  converted origin (`color2(plainOrigin, targetSpace)` is `[0,1]` in/out), so `calc(r+10)` computes `1+10=11`
  (G3b RED, empirically `rgb(11 0 0)`). Denorming that constructed `11` at output scales `scale(11,0,1,0,255)=2805`
  — never CSS's `255+10=265`. Only evaluating calc on **physical** bindings (`r=255`) reaches `265`.
- **normalize-on-construct cannot serve the mix path.** `mixColors` (`mix.ts:108-180`) IS the shared raw
  function that two siblings read RAW (glass-ui `spectrum-walk.ts`, keyframes `backward-color.ts` via
  `sampleColorRamp`, §25/§28). Forcing it to emit physical either (a) breaks those raw readers → the LIB-G6
  co-migration for BOTH siblings, or (b) requires `mixColors` to run its premultiplied-alpha + hue
  interpolation on physical channels — but CSS Color 4 §12 defines that math on the **normalized** channels
  (premul by α, hue in the cylindrical component); denormalizing pre-mix corrupts it. So the mix path MUST
  keep normalized-internal arithmetic and denorm at the **parser consumer**, never inside `mixColors`.
- **the normalization-state brand** (§28.1's orthogonal candidate) preserves the raw convention (nice) and
  disambiguates `toString`, but (a) it still fails G3b — the brand does not change that calc runs on
  normalized bindings, and a normalized-tagged `11` denorms to `2805`; and (b) it is a pervasive new nominal
  brand threaded through every `Color`/`ValueUnit` construction + every `toString`/`toFormattedString`/
  `toAnimationString` path, for a payoff a one-line denorm at the mix parser already buys with zero calc
  benefit. It also entrenches TWO live internal conventions forever — the opposite of the E-3 end-state
  (one convention: physical, matching direct-parse).

### The E-3 gestalt cure (what to build)

The root disease is that `createColorValueUnit`-wrapped colors carry **two** conventions by input path:
direct-parse stores **physical** (`color.ts:187-271`, e.g. `rgb(76.5 …)`), while the color-mix parser
(`color.ts:358-359`) and relative-color (`relative-color.ts:162-163`) store **normalized [0,1]**. The gestalt
is to make **every parser-produced color carry the physical convention uniformly** — matching direct-parse
AND matching what `normalizeColorUnit`/`colorUnit2` expect as *input* (they normalize physical→[0,1]; that is
why G5 double-normalizes today). Achieve it at the two PARSE loci, never at the shared wrapper, never inside
the raw functions:

1. **color-mix parser locus** — `parsing/color/color.ts` `colorMix.map` (`:358-359`): after `mixColors(...)`
   returns its normalized `Color<number>`, **denorm it to physical via the `inverse` normalize path**, THEN
   `createColorValueUnit`. Color-mix has no calc → denorm-on-output is exactly correct and the simplest
   idiomatic shape. `mixColors` is UNCHANGED → every raw reader is preserved.
2. **relative-color locus** — `relative-color.ts` `resolveRelativeColor` (`:133-163`): **denorm the
   `converted` origin to physical before building `bindings`**, so calc evaluates on physical bindings
   (`r=255`) → `calc(r+10)=265`, and construct the result with those physical channels directly
   (normalize-on-construct; no post-denorm). `resolveRelativeColor` is parse-private — consumed by NO raw
   reader — so changing its internal binding convention is safe.

This composite is not two unrelated patches — it is ONE invariant ("parser colors are physical") realized by
the shape each locus's math demands: the mix path's spec-normalized arithmetic forces denorm-**after**; the
relative path's calc forces physical **before**. The wave itself names this composite in §Scope
("normalize-on-construct for relative-color + denorm-on-output for mixColors").

### Guards / consequences (all GREEN under the composite)

- **LIB-G4 (direct-parse unchanged, the R-2 guard)** — neither locus touches the direct color parsers nor
  the shared `createColorValueUnit` (`color-unit.ts:32`); `rgb(76.5 0 178.5).toString()` stays verbatim.
  This is the whole point of R-2: denorming at the shared wrapper would double-denorm the already-physical
  direct path. The composite honors it structurally.
- **LIB-G5 (refeed, the glass-ui `colorUnit2` pipeline)** — cured at ROOT, not by a second patch. Physical
  channels feed `normalizeColorUnit`'s physical→[0,1] scale correctly (`76.5→0.3`) instead of the current
  double-normalize (`0.3→0.00118`, G5 RED). The one physical-output fix resolves serialization AND refeed.
- **LIB-G6 (raw-channel convention, §28.2)** — the decisive win: `mixColors`/`sampleColorRamp`/`color2` are
  ALL untouched → glass-ui `spectrum-walk` and keyframes `backward-color` read the SAME normalized/hue-in-turns
  channels they read today → **the invariant PROVABLY PRESERVES the convention, no sibling co-migrates.** The
  BH addendum records this verdict; the build-time re-enumeration born-RED (LIB-G6) confirms it against the
  then-current sibling HEADs at cut. This is the "invariant-preserving fix PREFERRED" outcome §28.1 asks for.

### Denorm machinery — the trap in the wave's own citation

The wave/§23 cite `serialize.ts convertColorSpaceDenorm` as "the machinery." **It is the WRONG tool for the
mix locus.** `convertColorSpaceDenorm` (`serialize.ts:205-248`) *normalizes-in* on the assumption the input is
in the source space's physical **number** domain (`getColorSpaceBound(from,k,"")` → e.g. rgb `[0,255]`), then
converts, then denorms. Feeding it a normalized `[0,1]` mix result makes step 1 read `0.3` as if physical:
`scale(0.3,0,255,0,1)=0.00118` — the exact G5 wrong number, one layer earlier. The correct machinery for a
**normalized→physical** egress is the existing `inverse` normalize path: `normalizeColor(color, /*inverse*/ true)`
(`normalize.ts:34-55`), which scales `[0,1]→[min,max]` AND attaches the denorm unit (`getColorSpaceDenormUnit`)
so the mix result serializes in the SAME shape as direct-parse (`hsl(120 50% 50%)`, not a bare-number `hsl`).
Prototype MUST use the inverse path, not `convertColorSpaceDenorm`.

---

## U-F29 — RECOMMENDATION: **loud-fail** (parseCSSValue requires full-input consumption; a typed throw on unconsumed trailing tokens) + the mandatory naming cure

### The shape

`parseCSSValue` (`parsing/index.ts:494-500`, `memoize(tryParse(ValuesValue))`) parses the FIRST sub-value and
`tryParse` never requires EOF, so trailing tokens are silently dropped (G1 RED). **Cure**: require full-input
consumption — parse to EOF and, on unconsumed trailing input, throw a **typed, named** parse error (not a bare
`Error`). The single-value return type (`ValueUnit | FunctionValue`) is UNCHANGED. The intentional two-function
design (`parseCSSValue` = one sub-value, documented at `index.ts:504-518`; `parseCSSSubValue` = the full
whitespace/comma list, `:529-558`) is PRESERVED. The naming footgun (`parseCSSSubValue` reads as if it parses
*less* though it returns the FULL `ValueArray`) is cured in the same cut: **export the full-list parser under a
discoverable name — `parseCSSValues` (plural; the top-level name is currently free, §227)** — and the README
gains a multi-token example steering shorthands there. E-3: rename at the root, **no legacy alias**; keyframes'
`parseCSSSubValue`/`parseCSSValueUnit` imports co-migrate at the cut (U-F77).

### Why loud-fail over full-value-default

- **Semver-minimal against BOTH `^3.1.0` floors.** loud-fail keeps the RETURN TYPE single-value, so keyframes'
  three call-sites (`resolve-function.ts:61,159` + `resolve-if.ts:131`, all try/catch-guarded, §22) degrade
  gracefully — a throw fires the catch (→ raw-node/DROP). full-value-default changes the return to include
  `ValueArray`, which flows into keyframes' **unguarded** single-`ValueUnit` downstream — a shape break, a
  strictly larger blast radius. glass-ui consumes `parseCSSValue` ZERO times (§350), so it is untouched either
  way; the whole comparison is decided on keyframes.
- **E-3 gestalt.** The codebase already has the clean single/full split by deliberate design (the
  `parseCSSSubValue` header, `:502-518`, documents the "V4 truncation trap" and why `FunctionArgs`-first is
  load-bearing). The defect is **silence + discoverability**, NOT the split. loud-fail fixes the silence at the
  truthful locus (the parser refuses to lie) and the name fix fixes discoverability. full-value-default
  collapses an intentional distinction into one overloaded return type — un-gestalt, and it forces every
  consumer of the headline export to handle `ValueArray` for what used to be a scalar.
- **Owner intent honored** ("a consumer must not silently lose data") — a typed throw IS the signal the
  complaint says is missing ("with no signal").

### The counter (weighed, recorded as a risk)

loud-fail turns a call that previously *returned* (a wrong-but-non-crashing `'1px'`) into a throw, and does NOT
make shorthands "just work" — the consumer must switch to `parseCSSValues`. Mitigation: the discoverable name +
README example route them there, and the throw is catchable/typed. This is the honest E-3 trade: correctness
over convenience. Either shape is semver-major and **owner-held (§13.5)** — LIB lands the fix + the publish
packet; the cut is U.W-ADOPT's (U-F77), co-landed against glass-ui's peer floor + keyframes' **runtime**
`dependencies` floor (§22 r5 correction).

Implementation notes: the throw must be a **named error class** (a `ParseError`/`CSSParseError`, not bare
`Error`) so keyframes' catch is precise; and because `parseCSSValue` is **memoized**, ensure a throw is NOT
cached as a poisoned entry (throw before the memo set, or let `tryParse` throw past the cache — verify the
`memoize` wrapper does not store rejections). The EOF requirement is `ValuesValue` consuming to `input.length`
(a `.skip(eof)`/trailing-index check), NOT a post-hoc string compare.

---

## The three siblings + three folds — one-paragraph implementation notes each (E-3 binds them into the same wave; born-RED per defect)

**U-F31 (per-transform axis-cardinality table)** — `parsing/index.ts:87-91`: the `values.length === 1` branch
iterates `dimensions` (all of X/Y/Z, skew minus Z) for EVERY transform, so `rotate(45deg)→rotateX/Y/Z`,
`translate(10px)→X/Y/Z`, `scale(2)→scaleX/Y/Z` (G7 RED). CSS single-arg semantics differ per transform:
`rotate(a)` is a Z-rotation (emit a single `rotate`/`rotateZ`, NOT three axes); `scale(s)` is uniform 2D
(`scaleX=scaleY=s`, Z=1 — NOT scaleZ); `translate(t)` is X only (Y/Z default 0); `skew(a)` is skewX only
(Y=0). Cure: a per-transform single-arg expansion table co-located with `makeTransformName`/`TRANSFORM_DIMENSIONS`
(`:56,67`) mapping name→its single-arg axis set (`rotate:[z-as-scalar]`, `scale:[x,y]`, `translate:[x]`,
`skew:[x]`), replacing the blanket `dimensions.forEach`. Feeds keyframes' apply/resolve path → the
producer-coupling build→co-migrate (§22); the DELTA is measured against keyframes and the co-migration rides
U-F77. (The library's own matrix decompose/interpolate never consumes the expanded `FunctionValue` list — §29
REFUTED that downstream — so blast radius is external parse-output consumers only.)

**U-F32 (inferResultUnit unitless forward-trig)** — `parsing/math.ts:504-524`: the inverse-trig case
(`asin/acos/atan/atan2 → rad`, `:515`) exists but `sin/cos/tan` fall through to the inherit-from-argument loop
(`:519-522`) and carry the argument's `deg` out — `sin(30deg)→0.5deg`, and `calc(sin(30deg)*100px)→50deg`
(G8 RED, empirically confirmed). Cure: add a named forward-trig case `if (["sin","cos","tan"].includes(node.name))
return undefined;` (explicit unitless — per css-values-4 the forward trig fns return `<number>`) BEFORE the
inherit loop, so it short-circuits and never inspects the `deg` arg. `:496`'s `new ValueUnit(result, unit?.unit,…)`
then constructs unitless; the enclosing `calc(*)` node infers from its OTHER arg (`100px`) → `50px`. A named
case at the type-determining locus, not a downstream emit-strip (E-3). Confined to `evaluateMathFunction`
(`parseCSSValue` round-trips the AST unevaluated).

**U-F33 (positioned-stop serialize case)** — `units/index.ts:300`: `FunctionValue.toString`'s default
comma-joins all values, so a gradient's `red 20%` becomes `…red), 20%, …` — reads as extra stops, invalid CSS
(G9 RED, empirically `linear-gradient(90deg, rgb(255 0 0), 20%, rgb(0 0 255), 80%)`). The `linear()`
easing-hint case (`:269-281`) already models the exact shape: a position (a `%`/length ValueUnit) space-joins
onto the PRECEDING stop, and stops comma-join. Cure: a positioned-stop branch for the `*-gradient` names
(`linear-gradient`/`radial-gradient`/`conic-gradient` + `repeating-*`) generalizing the `:269-281` idiom — a
color followed by its position(s) space-joins; stops comma-join. One idiomatic serialize case, not a
per-consumer patch. (The demo uses a separate strict `gradientParse`, §15 — no app path regresses; confined to
the library `FunctionValue` serialize. The `:292` "CONFIRMED-CORRECT" comment for `linear-gradient` is falsified
and must be corrected.)

**U-F34 (the {from}2{to} rename list — the actual drift)** — `units/color/CLAUDE.md` documents `{from}2{to}`
as the one true form; the `{from}To{to}` drift, **all PUBLIC-barrel-exported** (`src/index.ts` +
`subpaths/color.ts` — so the renames are semver-loaded and ride the owner-held cut): `xyzToICtCp`/`ictcpToXYZ`
(`difference.ts:151,222`), `xyzToJzazbz`/`jzazbzToXYZ` (`jzazbz.ts:80,103`), `oklabToLinearSRGB`(+`Into`)/
`srgbToOKLab`(+`Into`)/`oklabToRgb255`/`rawOklabToOklch`/`rawOklchToOklab` (`gamut.ts:79,315,347,405,462,448,456`),
`okhslToSrgb`/`srgbToOkhsl`/`okhsvToSrgb`/`srgbToOkhsv` (`okhsl.ts:128,158,197,233`), and the transfer set
`srgbToLinear`/`linearToSrgb`/`adobeRgbToLinear`/`linearToAdobeRgb`/`proPhotoToLinear`/`linearToProPhoto`/
`rec2020ToLinear`/`linearToRec2020` (`transfer.ts`), plus the internal `directOklabToRgb`/`directRgbToOklab`/…
(`direct.ts`). **Collision hazard (a real fold complication)**: `xyzToICtCp` (`difference.ts`, scalar
`(x,y,z)→tuple`) and `xyz2ictcp` (`conversions/ictcp.ts`, `XYZColor→ICtCpColor`) are DIFFERENT functions — a
naive `xyzToICtCp→xyz2ictcp` collides; the two must be disambiguated (e.g. the scalar helper keeps a distinct
suffix, or the pair is unified) before renaming. Cure: rename the drift to `{from}2{to}` at the root (barrel +
subpath + every internal call), NO legacy re-export aliases (E-3, consumers migrate), + the parity check
(LIB-G12) so a future `{from}To{to}` is caught. Casing is normalized to lowercase space tokens (the `srgb-linear`
space → the `2`-form token per the existing `xyz2linearSrgb` precedent). The `serialize*`/`reverse*`
parse-inverse naming (a second axis §11 notes) is a smaller sub-fold — pick one verb for the parse-inverse role.

**U-F35 (recomposeMatrix2D + 2D interpolate)** — `transform/decompose.ts`: `decomposeMatrix2D` (`:41`, →
`{translateX,translateY,scaleX,scaleY,angle(rad),skew(tan)}`) has no inverse (`recomposeMatrix2D` undefined, G11
RED) and `interpolateDecomposed` (`:510`) is 3D-only (`DecomposedMatrix3D`). Cure: add `recomposeMatrix2D(d)`
as the algebraic inverse of the CSSOM §15.1 decompose — rebuild `matrix(a,b,c,d,e,f)` from the recomposition
`translate · rotate(angle) · skew(skew) · scale(sx,sy)` (the 2D analog of `recomposeMatrix3D`'s `:431`
translate→rotate→skew→scale order), and extend `interpolateDecomposed` to accept the 2D shape (overload on the
decomposed type, or a sibling `interpolateDecomposed2D`; `angle` lerps directly — no slerp needed in 2D).
born-RED LIB-G11: `recomposeMatrix2D(decomposeMatrix2D(M)) ≈ M` round-trip + a 2D interpolate at t=0/0.5/1.

**U-F74 (dispatch-exposed correctGamut)** — `conversions/xyz-extended.ts:69-87`: `xyz2rgb` defaults
`correctGamut=true`, and `color2` (`dispatch.ts:183-209`) offers NO way to thread it — G10 confirms the
probe's `{correctGamut:false}` third arg is silently ignored (both calls return the identical mapped
`[0,0.875,0.275]`), so a caller converting wide→sRGB to DETECT out-of-gamut never sees raw OOB channels. Cure:
thread an idiomatic option through the dispatch surface — an options bag on `color2` (`color2(c, to, {gamut:
'raw'|'map'})`) or a sibling `color2Raw`, routed to `xyz2rgb`'s `correctGamut=false` (and the XYZ-hub
`getXyzFromFn` path, which currently hard-calls `xyz2rgb` with the default). born-RED LIB-G10: a known-OOB wide
color (P3 pure green) reports raw OOB channels through the dispatch surface. Keep the DEFAULT `map` (no silent
behavior change for existing callers) — the fix is making raw-detect a FIRST-CLASS reachable capability, not
flipping the default.

---

## The BH addendum + publish packet (what LIB hands ADOPT)

- **BH addendum** (path-scoped to `../glass-ui/docs/tranches/BH/**`, foreign-tree fence): records the CHOSEN
  U-F30 invariant = **composite (mix denorm-on-output at the parser · relative normalize-on-construct)**, and
  the co-migration verdict = **NONE — the invariant PRESERVES the raw `mixColors`/`sampleColorRamp`/`color2`
  channel convention** (spectrum-walk + backward-color unaffected, LIB-G6 GREEN), plus the U-F29 shape =
  **loud-fail + `parseCSSValues` rename** so keyframes' 3 call-sites + the `parseCSSSubValue`/`parseCSSValueUnit`
  imports can plan.
- **Publish packet**: the U-F29 reshape (typed-throw + export rename) is **semver-major** against BOTH
  `^3.1.0` floors — glass-ui peer (`peerDependencies`+`devDependencies`) + keyframes RUNTIME
  (`dependencies`, the stronger coupling, §22). U-F30/F31/F34/F74 renames/behavior are also breaking. The
  owner takes the cut at U.W-ADOPT (§13.5); LIB closes build-complete under PP-16.
