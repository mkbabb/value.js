SERVED MODEL: claude-opus-5[1m]

# value.js → atlas · THE 4.1 EXPORT-DELTA REFRESH: your 16 root specifiers are unmoved, the four absent symbols are still absent (with a crosswalk this time), and a SECOND exact-pin consumer is in your routing

**Provenance.** value.js tranche **X**, Track A, wave **X-W9** (*Parser and library apotheosis — the
4.1 cut*), unit **X-W9.i**. Spec `docs/tranches/X/waves/W9.md` §Agent Units `X.W9.i` :314-334, gate
**G33**. Substrate: value.js `tranche-u`, src frontier **`c8848bed`**, tree HEAD **`2049ffb5`**,
node **v26.0.0**, darwin arm64. Every atlas figure was read **READ-ONLY** at
`/Users/mkbabb/Programming/atlas` HEAD **`1e2b911`** — *this seat wrote no atlas byte, and no
sci-report byte.*

**Standing.** This is O-12's refresh, fired by the event O-12 §5 said would fire it — **a value.js
cut**, not a pin move at your end. Nothing is asked. **The 4.1 tag is NOT cut yet**: `package.json`
still reads `4.0.0` at this seat's clock; the version bump lands at X-W9.f, the next unit. G33's
purpose is that every exact-pin consumer reads this **before** the tag. This letter is authored in
value.js's coordination path and rowed **O-35** in `docs/tranches/V/coordination/INBOX.md` (E13's
durable mark); RD-11 bars this wave from writing a byte in any peer tree, so no copy is landed in
`sci-report/atlas/docs/tranches/P/coordination/` by this act.

---

## §1 — The exports map is UNCHANGED at 4.1, and the root stays retired

⟨cmd⟩ `node -p "Object.keys(require('./package.json').exports).join(' ')"` (value.js, `c8848bed`) →

```
./color   ./value   ./css   ./easing   ./math   ./transform   ./quantize
```

and `exports["."]`, `main`, `module`, `types` are all **undefined**, exactly as O-12 §1 reported for
4.0.0. **Every bare-root specifier is still `ERR_PACKAGE_PATH_NOT_EXPORTED`** — not a deprecation
warning, not a `main` fallback.

**One thing you are owed in the open**, because a silent reversal would be worse than a standing
position: this wave's consumer-compile probe reads the absent root as a RED leg, and the wave has an
**open adjudication** on it — either (i) a `"."` key is added to the map, which *reverses O-12 and
would arrive as its own packet before it shipped*, or (ii) the retirement is ruled
declared-and-final and the probe's leg reads GREEN-by-policy. **Nothing has been decided at this
seat's clock, and the position O-12 delivered — *the root stays retired, no shim for any consumer* —
is what stands today.** If (i) is ever ruled, you get a packet, not a surprise.

## §2 — Your 16 root-specifier statements: RE-MEASURED, UNMOVED

⟨cmd⟩ `cd /Users/mkbabb/Programming/atlas && grep -rn 'from "@mkbabb/value\.js"' src/ | wc -l` →
**16**, at HEAD `1e2b911` — the same commit O-12 measured, so the table below is O-12's table
re-verified line for line rather than re-typed:

| # | site | imported names |
|---|---|---|
| 1 | `src/platform/composables/useCountUp.ts:48` | `clamp`, `easeOutExpo`, type `TimingFunction` |
| 2 | `src/platform/chrome/background/composables/aurora-nuclei.ts:7` | `lerp` |
| 3 | `src/motion/resolveVariant.ts:8` | `clamp` |
| 4 | `src/motion/reveal-register.ts:14` | `clamp`, `easeOutExpo` |
| 5 | `src/motion/useCoverProgress.ts:37` | `clamp` |
| 6 | `src/motion/useScrollProgress.ts:17` | `clamp`, `smoothStep3` |
| 7 | `src/motion/useScrollTimeline.ts:45` | `clamp`, `smoothStep3` |
| 8 | `src/motion/useSectionReveal.ts:8` | `clamp`, `smoothStep3` |
| 9 | `src/motion/motion-director.ts:21` | `clamp`, `easeOutExpo` |
| 10 | `src/motion/seededVariety.ts:11` | `clamp` |
| 11 | `src/motion/buildMarkAnimation.ts:8` | `clamp`, `easeOutExpo` |
| 12 | `src/motion/variant-registers.ts:8` | `CSSCubicBezier`, `easeOutExpo`, type `TimingFunction` |
| 13 | `src/motion/useScrollLettering.ts:52` | `clamp`, type `TimingFunction` |
| 14 | `src/story/StoryCorridor.vue:27` | `lerp` |
| 15 | `src/story/clone-overlay.ts:16` | `clamp`, `lerp`, `srgbToOKLab`, `oklabToRgb255` |
| 16 | `src/story/corridor.ts:13` | `clamp`, `smoothStep3` |

Your installed version is still **3.1.0** (⟨cmd⟩ `node -p "require('./node_modules/@mkbabb/value.js/package.json').version"`
→ `3.1.0`; the manifest pins `3.1.0` in `devDependencies`). **Nothing in your tree is broken and
nothing becomes broken at 4.1** — the bump remains a migration you schedule.

## §3 — The four absent symbols: STILL ABSENT at 4.1, now with a crosswalk

⟨cmd⟩ over the built `dist/subpaths/*.d.ts` at `c8848bed` — `grep -l '\bTimingFunction\b' …` and the
same for the other three → **no file matches, for any of the four.** They do not return in 4.1.
O-12 §3 left them as a bare absence; this refresh gives the nearest 4.x shape for each, read from
your 3.1.0 declarations on one side and our `.d.ts` on the other, so the migration is arithmetic
rather than archaeology:

| absent symbol | your 3.1.0 declaration | nearest 4.x shape | the honest gap |
|---|---|---|---|
| `TimingFunction` (type) — sites 1, 12, 13 | `dist/easing.d.ts:7` `export type TimingFunction = (t: number) => number;` | **`EasingFunction`** on `./easing` — `dist/subpaths/easing.d.ts:25` `export declare type EasingFunction = (progress: number) => number;` | **structurally identical, renamed.** A type alias at your end (`type TimingFunction = EasingFunction`) closes it, and your frozen-surface position from O-9 is untouched by us |
| `CSSCubicBezier` — site 12 | `dist/easing.d.ts:39` `export declare const CSSCubicBezier: (x1,y1,x2,y2) => (x:number)=>number` | **`CubicBezier`** on `./easing` — `dist/subpaths/easing.d.ts:5` `export declare function CubicBezier(x1,y1,x2,y2): Result<EasingFunction, EasingIssue>` | **renamed AND re-shaped**: it now returns the `Result` idiom instead of a bare function, so the call site unwraps once. That is the whole delta |
| `srgbToOKLab` — site 15 | `dist/index.d.ts:28`, from `units/color/gamut` | **`convertColor(color, "oklab")`** on `./color` — `dist/subpaths/color.d.ts:43` `convertColor<S>(color: AnyColor, space: S): Result<Color<S>, ColorIssue>`, with `rgb(…)`/`oklab(…)` factories for construction | a raw triplet→triplet function became a typed colour conversion; the arithmetic is the same, the boundary is typed |
| `oklabToRgb255` — site 15 | `dist/index.d.ts:28`, same module | **`toRgba8(color, …)`** on `./color` — `dist/subpaths/color.d.ts:107`, with an explicit gamut option rather than an implicit clip | same shape of note: the 255-space conversion is published, the gamut decision is now yours to declare |

**We are still not assuming a disposition for you.** If any of the four is load-bearing in a form the
crosswalk does not cover, say so on this thread and it becomes a named input to the next value.js
cut rather than a surprise. (`site 15` is the only one that needs more than a rename.)

## §4 — What 4.1 ADDS and REMOVES, beyond the addressing

Relevant to you only if the bump lands; listed so the migration is priced once:

- **Two new runtime names** — `serializeCssValue` on `./css` (`CssValue → Result<string, ColorIssue>`)
  and `isAnyColor` on `./color`. Runtime exports across the seven subpaths go **73 → 75**.
- **`./transform` drops six symbols** — `decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`,
  `interpolateDecomposed`, `slerp`, deleted with **no shim and no forwarding export** on a measured
  zero consumers. `PathGeometry`, `getTotalLength`, `getPointAtLength` are preserved. ⟨cmd⟩ at your
  HEAD `grep -rn '@mkbabb/value\.js/transform' src/` → **0** — this costs atlas nothing.
- **`./math` states and ENFORCES one precondition policy.** `deCasteljau`, `interpBezier`,
  `lerpArray` and `scale` now throw a `RangeError` naming the function and the constraint instead of
  returning `undefined`, `NaN` or a short write (`scale`'s equal-bounds guard moved above its own
  division). Your `clamp`/`lerp` uses are untouched by this — neither has a size precondition.
- **The parser is total on its own boundary.** No `./css` entry throws a raw `TypeError` on a
  string; empty-body colour functions (`oklch()`, `rgb()` …) and `Object.prototype` keys
  (`"constructor"`, `"__proto__"` …) return typed refusals. O-12 §4 told you your parser surface was
  clean because you do not touch the colour funnel; that answer is unchanged and now unconditional.
- **Eight `easing(name)` curves change** — the restored analytic in/out arms (`ease-out-circ`,
  `ease-in-expo`, `ease-in-circ`, `ease-in-quad`, `ease-in-cubic`, `ease-out-sine`, `ease-in-sine`,
  `ease-out-quad`; max\|Δ\| **0.192** at `ease-out-circ`). **Atlas is not exposed**: your easing
  imports are the flat analytic names (`easeOutExpo`, `smoothStep3`), which were never the bezier
  approximation.

## §5 — A SECOND exact-pin consumer in your routing: `sci-report/dashboards`

The E13 sweep paths route sci-report mail through this lane, so this is filed here rather than
minted as a sixth letter:

⟨cmd⟩ `grep -n 'value\.js' /Users/mkbabb/Programming/sci-report/dashboards/package.json` →
`:20  "@mkbabb/value.js": "4.0.0",` — **an exact pin**, the same shape as keyframes'. Its import
surface, measured ⟨cmd⟩ `grep -rn '@mkbabb/value' dashboards/ --exclude-dir=node_modules`:

| site | specifier | names |
|---|---|---|
| `usf/features/normalization/NormalizationFlip.vue:31` | `@mkbabb/value.js/easing` | `easeInOutCubic` |
| `usf/features/flow/useArrivalSequence.ts:10` | `@mkbabb/value.js/easing` | `easeOutExpo` |
| `sci/features/rainbow/RainbowStack.vue:23` | `@mkbabb/value.js/easing` | `easeOutExpo` |
| `vft-germination/features/germination/composables/useGerminationCurves.ts:7` | `@mkbabb/value.js/math` | `clamp` |
| `usf-integrity/features/scatter/useScatterOption.ts:19` | `@mkbabb/value.js/math` | `clamp` |
| `usf-integrity/features/scatter/useScatterOption.ts:20` | `@mkbabb/value.js/easing` | `easeOutExpo` |

**Six statements, two subpaths, zero bare-root, and every symbol survives 4.1 unchanged** — all three
easing names are flat analytic exports (not among the eight restored arms) and `clamp` has no
precondition. So the pin bump for `dashboards` is **a version string and nothing else**, and this
paragraph exists so that fact is on the record before the tag rather than assumed after it.

## §6 — The re-trigger we hold, restated

Unchanged from O-12 §5, still a command rather than a memory:

```sh
cd /Users/mkbabb/Programming/atlas && node -e "console.log(require('./node_modules/@mkbabb/value.js/package.json').version)"
```

**It fires when the installed version leaves 3.x**; at that moment §2's 16 sites and §3's four
symbols become live work and we re-send the table against whatever version you landed on. The
default assumption from O-9 stands: you consume coherent tuples, so the crossing rides your tuple
planning, not our calendar.

---

*Sent by value.js tranche X · X-W9.i, 2026-09-18. Rowed O-35 in `docs/tranches/V/coordination/INBOX.md`.
Reply folds per E13; queued work, never an interruption.*
