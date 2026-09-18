SERVED MODEL: claude-opus-5[1m]

# X·KF · THE INGRESS CENSUS OF RECORD

**Wave**: X.KF.W2 — Parse Façade · **Unit**: `KF.W2.a` · **Published**: 2026-09-17
**Authority**: `docs/tranches/X/keyframes/waves/KF-W2.md` §Carry **F0** · §Gates **G-W2-5**
(clauses 1–2; clause 3, the malformed fuzz corpus, is `.d`'s) · §Gates **G-W2-2b** (the demo arm).
**Ref of record**: keyframes.js `7d958f212fd519142ee9ed5e298d5afe456a7967` (`origin/master`).
**Artifact of record**: `node_modules/@mkbabb/value.js/dist/subpaths/{css,easing}.js`, version
**4.0.0**, verified at run time. Every reading below was **re-executed by this seat on 2026-09-17**
and **double-run with identical output** — the census owns its readings rather than quoting them.

---

## §0 · What this file is

G-W2-5's first two clauses, discharged:

1. **Per ingress, the exact value.js entry reached and the EXECUTED outcome at the pinned artifact**,
   covering the **colour** organ **and** the **easing/CSS** organ (the `KF-CB-33` organ lock).
2. **The boundary set recorded as negatives, enumerated over the WHOLE 58-record corpus, so no later
   seat re-probes it.**

Plus **G-W2-2b**'s subject, frozen here: **the demo-side runtime grammar/collector set** at §4.

**Per LAW B, no closure claim is made in this file's voice.** The round-2 sentence *"the set is now
closed over the 58"* was struck from G-W2-5 at repair round 3 for exactly that reason, and this file
does not re-introduce it. Enumeration carriage is cited at §7.

**Cure of any ingress is NOT this wave's.** Owners are carried at each row, unmoved.

---

## §1 · THE ENTRY-POINT MATRIX — re-executed by this seat

`$ node <probe> ` against `dist/subpaths/css.js` + `dist/subpaths/easing.js`, version **4.0.0**;
run twice, `diff` empty.

| input class | `parseCssColor` | `parseCssValues` / `parseCssValue` | `parseCssScalar` | `parseTimingFunction` | `parseKeyframeSelector` | `parseStylesheet` |
|---|---|---|---|---|---|---|
| `oklch()` `rgb()` `hsl()` `lab()` `color()` | **THROW** | **THROW** | **THROW** | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` top level; **THROW nested** |
| `calc()` | **THROW** | `ok:false [css_syntax]` | **THROW** | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `steps()` | **THROW** | `ok:false [css_syntax]` | **THROW** | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `steps(2, end)` *(the well-formed control)* | `ok:false [css_syntax]` | **`ok:true`** | `ok:false [css_syntax]` | **`ok:true`** | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `color-mix(in srgb, red, blue)` | `ok:false [css_syntax]` | **`ok:true`** | `ok:false [css_syntax]` | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `var(--x)` | `ok:false [color_context_required]` | `ok:true` | `ok:false [css_syntax]` | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `oklch(0.7 0.1 200)` | **`ok:true`** | `ok:true` | `ok:true` | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `500m` | `ok:false [css_syntax]` | `ok:true` | **`ok:true`** (`{number, 500, unit:"m"}`) | `ok:false [css_syntax]` | `ok:false [keyframe_selector_invalid]` | `ok:false [css_syntax]` |
| `from` · `100%` | `ok:false [css_syntax]` | `ok:true` | **`ok:true`** | `ok:false [css_syntax]` | **`ok:true`** | `ok:false [css_syntax]` |
| `null` `undefined` | **THROW** | **THROW** | **THROW** | **THROW** | **THROW** | **THROW** (`…reading 'length'`) |
| `42` `{}` `[]` | **THROW** | **THROW** | **THROW** | **THROW** | **THROW** | **`ok:true` with `[]`** |

Every throw is a `TypeError`: `Cannot read properties of undefined (reading 'replace')` on the string
arm, `Cannot read properties of null (reading 'trim')` / `e.trim is not a function` on the non-string
arm. **Pasted output** (LAW D's numeric arm — the measurement rides beside the sentence it makes true):

```
"oklch()"        parseCssColor=THROW TypeError: Cannot read properties of undefined (reading 'replace')
                 parseCssValues=THROW (same) | parseCssScalar=THROW (same)
                 parseTimingFunction=ok:false[css_syntax] | parseKeyframeSelector=ok:false[keyframe_selector_invalid]
                 parseStylesheet=ok:false[css_syntax]
nested oklch()   parseStylesheet("@keyframes a{from{color:oklch()}}") -> THROW TypeError (same)
"calc()"         parseCssColor=THROW | parseCssValues=ok:false[css_syntax] | parseCssScalar=THROW
"steps()"        parseCssColor=THROW | parseCssValues=ok:false[css_syntax] | parseCssScalar=THROW
"steps(2, end)"  parseCssColor=ok:false[css_syntax] | parseCssValues=ok:true | parseTimingFunction=ok:true
"color-mix(in srgb, red, blue)"
                 parseCssColor=ok:false[css_syntax] | parseCssValues=ok:true
"var(--x)"       parseCssColor=ok:false[color_context_required] | parseCssValues=ok:true
42 / {} / []     five entries THROW "e.trim is not a function"; parseStylesheet -> {"ok":true,"value":[],"diagnostics":[]}
parseTimingFunction("step-start") -> {"ok":true,"value":{"kind":"steps","count":1,"position":"jump-start"}}
parseTimingFunction("step-end")   -> {"ok":true,"value":{"kind":"steps","count":1,"position":"jump-end"}}
parseCssScalar("500m")            -> {"ok":true,"value":{"kind":"scalar","payload":{"type":"number","value":500,"unit":"m"}}}
parseKeyframeSelector("from")     -> {"ok":true,"value":{"kind":"percent","value":0}}
easing("step-start") / ("step-end") / ("steps") / ("cubic-bezier")  -> ok:false {"code":"easing_name_unknown"}
easing("easeInBounce") -> ok:true      easing("smooth-step-3") -> ok:true
easing("bounceInEase") -> ok:false {"code":"easing_name_unknown"}     ← the KF-CB-1 instance
steppedEase(1,"jump-none") -> ok:false {"code":"step_count_invalid"}  ← value.js is CSS-spec-correct
```

### §1.1 · The reconciliation, stated

- **The R1 shape is empty-argument FUNCTIONAL notation** and it escapes **five** entries
  (`parseCssColor`, `parseCssValues`, `parseCssValue`, `parseCssScalar`, `parseStylesheet` on the
  nested form) — **not one**. The registry's contradiction was a **corpus difference, not an
  entry-point difference**.
- **kf-HeroAurora `KF-HA-19`** — **CONFIRMED IN MEASUREMENT, REFUTED IN CONCLUSION**: every reading it
  reports reproduces here (`oklch(0.7 0.1 200)` → ok; `var()`/`color-mix()` → diagnostics, not
  throws), but its probe set is the **well-formed** one, so its conclusion is false **as to the
  empty-argument form**.
- **kf-SquareInstrument `K-6`** — **measurement CONFIRMED, conclusion NOT retired.** It killed exactly
  one claim, **R1-through-a-token** at `useSquareTumble.ts:22` (`getPropertyValue` → `""` → the
  `if (value)` guard). The **authored-CSS** path is established elsewhere (kf-KeyframeTimeline `C-7`;
  kf-SquareScene `D-27/L-7/C-9`; kf-EditorShell `C-19`'s RR-2). **Read as a pair, never merged.**
- **kf-ChannelOptions `C·S-4`**'s third shape (`parseTimingFunction(null|42|{})`) is confirmed and
  **generalises: every entry throws on non-string**, `parseStylesheet` excepted — and its exception is
  worse (§1.2).
- **The memory-of-record framing** *"R1 = live `parseCssColor(\"oklch()\")` shipping crash"* is
  **VINDICATED as to `parseCssColor` and CORRECTED as to scope.**

### §1.2 · Forwarded, not booked — no id is minted by this file

- **`parseStylesheet(42|{}|[])` → `ok:true` with an empty stylesheet.** A non-string silently accepted
  as *"no rules"*; **worse than a throw for a validator**. Routed to the value.js parser lane as
  evidence.
- **The two subpaths return two different Result envelopes** — `/css` failures carry
  `diagnostics: [{code, start, end, expected, actual}]`; `/easing` failures carry `error: {code}`
  (both re-executed). The façade publishes **one** answer per seam (G-W2-6), so the envelope
  difference is a **contract fact it must state rather than discover**. Booking it in a registry would
  inflate the count G-W2-1 depends on; it is forwarded.
- **The `C-L-2` residual** ⟨kf-CubeScene:170⟩ — whether `parseCssValue`/`parseCssScalar` internally
  dispatch into the colour grammar. This census's executed datum bears on it in **both** directions
  (a *scalar* entry dying on `oklch()`; a *colour* entry dying on `calc()`/`steps()`), and it is still
  **black-box evidence from the dist**. The residual stays routed to the **V·π parser program** for a
  source-level answer. **No id minted.**
- **Posture 1's unreachability** (`adapter.ts:219-226` `parseSource` ABSORB) — `parseStylesheet`
  **throws before returning** on the nested form, so the absorb arm never runs on the input it exists
  for. Booked as a **mechanism finding under R1's identity**, not as a new crash id. *(This is the
  footnote `POSTURES.md` §1a carries for row 1.)*

---

## §2 · THE INGRESS CENSUS — per ingress, the entry reached, the executed outcome

**Reading of the table**: `ingress` = the site where kf hands data to value.js (or takes a value.js
symbol into its graph). `entry` = the exact value.js entry. `executed outcome` = measured at 4.0.0.
`owner` is the bank's, **carried and not moved**.

### §2.a · The demo arm — the eight runtime specifiers, at the ref of record

| # | ingress ⟨`7d958f21`⟩ | organ | value.js entry | executed outcome at 4.0.0 | banked id · owner |
|--:|---|---|---|---|---|
| 1 | `demo/components/instrument/keyframes/KeyframesEditor.vue:123` → call `:186` | CSS scalar | `parseCssScalar` | `ok:true` for `500m`, `from`, `100%`, `oklch(0.7 0.1 200)`; **THROW** on `oklch()`/`calc()`/`steps()` and on every non-string; `ok:false [css_syntax]` on `color-mix()`/`var()`/`steps(2, end)` | the seam **`KF-KE-3`** convicts as **the wrong entry point** at the start field (a keyframe **selector** asked of the **scalar** grammar) — BLOCKER, **KFED-UNIT**; the contract half is **G-W2-6**'s |
| 2 | `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:2-5` → `collectStyleRules` `:36` | stylesheet collector | `collectStyleRules` (over `parseStylesheet`) | inherits `parseStylesheet`: `ok:false [css_syntax]` on malformed text, **THROW on the nested empty-args form**, **`ok:true` with `[]` on a non-string** | the demo's **grammar authority** — kf-KeyframesEditor **ruling 8**: *"one grammar authority, no regex pre-detection, structured diagnostics converted to typed errors, Retry actions"* |
| 3 | same module, `collectAnimationOptions` `:41` | stylesheet collector | `collectAnimationOptions` | as above | same |
| 4 | `demo/scenes/square/useSquareDemo.ts:4` → call **`:107`** ⟨spec anchor `:82`; **drift recorded at §4.1**⟩ | CSS scalar | `parseCssScalar` | as row 1 — and `calc(1px + 2px)` → **`ok:false`**, which the consumer converts into a **throw** (`num()`), inside the rAF frame | kf-SquareScene **`D-27/L-7/C-9`**, MAJOR — *"a throw does not drop a frame — it **BRICKS the loop** for the mount's lifetime"*; cure = the square packet's (**KF.W11**). Its positive twin is **`C S-C / superlative 3`** ⟨kf-SquareScene:132⟩, *"the demo's best use of value.js"*, carried whole **with `L-10`'s unit-blindness** |
| 5 | `demo/scenes/square/useSquareTumble.ts:2` → call `:22` | colour | `parseCssColor` | **THROW** on empty-args `oklch()`; `ok:false [css_syntax]` on `color-mix()`; `ok:false [color_context_required]` on `var(--x)`; `ok:true` on `oklch(0.7 0.1 200)` | lane-library §4.6's **named R1 crash surface**, entering the census **by name** (kf-EditorShell **`C-19`** (ii)). **`K-6`'s guard applies here and only here**: `getPropertyValue` → `""` → `if (value)` skips, so **no token can produce empty-args `oklch()`**. Colour-arm stake bounded by kf-SquareScene **`C-1`** — the sole colour write is **dead paint** |
| 6 | same module, `serializeCssColor` `:37` | colour (emit half) | `serializeCssColor` | throws `TypeError("Value returned an unserializable CSS color.")` for an unserializable value — the same thrower `POSTURES.md` row 10 names at `css-text.ts:54` | **Tier-D** (the emit mirror, §4.4 lockstep); not an ingress cure |
| 7 | `demo/utils/keyframeSelector.ts:2-4` → call `:15` | selector | `parseKeyframeSelector` | `ok:true` for `from`/`100%` (`{kind:"percent", value:0}` for `from`); `ok:false [keyframe_selector_invalid]` for everything else tested, **including well-formed non-selectors**; **THROW** on non-string | **`KF-KE-46`** (the `percentSelector` helper-skip pattern, sweep-verified at `keyframeSelector.ts:23`) + **`MISS-β2`** ⟨kf-TimelineCaret:46⟩: this module is **the demo's third copy** of a serializer the library privatizes twice and exports never → **G-W2-8**, act at **KF.W8** |
| 8 | `demo/utils/reference-data/animationDescriptions.ts:113` → call **`:76`** ⟨spec anchor `:128`; **drift recorded at §4.1**⟩ | easing/CSS | `parseTimingFunction` | `ok:true` for `step-start`/`step-end` (**`{kind:"steps", count:1, position:"jump-start"\|"jump-end"}`**) and `steps(2, end)`; `ok:false [css_syntax]` otherwise; **THROW** on non-string | **`Z6`** ⟨kf-ChannelOptions ruling 3⟩, confirmed with the payload printed. **The organ lock's own seam**: a §4.6-scoped (colour-only) parser wave misses this entirely |

**Type-only, and therefore not a runtime ingress**:
`demo/components/instrument/timeline/timelineTypes.ts:1` —
`import type { KeyframeSelector } from "@mkbabb/value.js/css"`, **erased under
`verbatimModuleSyntax`**. Carried because G-W2-2b's file arm counts it and its runtime arm must not.

### §2.b · Corpus-banked ingresses beyond the demo arm — the easing/CSS organ, and the graph edges

| ingress / cell ⟨record:line⟩ | organ | entry or edge | executed outcome at 4.0.0 | disposition · owner (carried) |
|---|---|---|---|---|
| **`KF-CB-1 · EE-01`** ⟨kf-CopyButton:40⟩ | easing | `easing("bounceInEase")` via kf's ctor | **`ok:false {"code":"easing_name_unknown"}`** (re-executed) → *"the ctor throws inside the uncaught async `onMounted`"*; `easing("easeInBounce")` → **`ok:true`** | **The executed instance of the organ lock `KF-CB-33`.** TRUE at the audited bytes and **ALREADY CURED at the ref of record** (frontier `:42` = `"easeInBounce"`; *"the diff is exactly one word"*). Identity **EE-01** → **KF.W0**; the surviving phantom trail → `KF-CB-18`/**KF.W4**. **A seat re-filing this as live work is in breach of the record.** |
| **`KF-ET-2`** ⟨kf-EasingTarget:41⟩ | easing | `parseTimingFunction("ease-in-bounce")`, `("smooth-step-3")` | **both `ok:false [css_syntax]`** — the two name-branch specimens the demo prints under a *"Copy easing literal"* label are **not CSS `<easing-function>`s** (silently `ease` on paste) | **NO-WAVE-OWNER**, MAJOR. Cure-lock carried whole: the corpus-unanimous *"delete `literal`; bind `demo.cssValue`"* is **REFUTED and adjudicated harmful** — `cssValue` returns the bare NAME for everything but `cubic-bezier`/`steps`, putting **20 of 28** specimens on invalid CSS. `KF-ET-2`'s cure-lock is a lock **ON `KF-ET-1`** |
| **`KF-ET-1`** ⟨kf-EasingTarget:37⟩ BLOCKER | easing (serializer) | `cubicBezierToString`'s `toFixed(2)` against value.js's parsed quads | *"17 of 28 tiles copy a curve with Δ > 0 against the one painted … **10 via `toFixed(2)` alone** — 15 of 23 quads round, each by exactly **0.005**"* | **The value.js-side rider, carried verbatim**: *"value.js needs a **lossless timing-function serializer twin for `parseTimingFunction`**, and `easing()`'s analytic-first resolution order documented in the `.d.ts`"* → **KF.W5** rider letter. PASS-6 escape **E1**, named at the engaged row at round 6 |
| **`Z5` · superlative 12** ⟨kf-EasingTarget:119⟩ | easing | `easing("step-start")`, `("step-end")`, `("steps")`, `("cubic-bezier")` | **all four `ok:false {"code":"easing_name_unknown"}`** (re-executed) | **The guard is load-bearing**: `timingCurveUtils.ts:43-44`'s two lines are *"what keeps three of 28 specimens from taking the scene down at render"*. **The four names value.js's `easing` entry does not know are exactly the four CSS timing-function keywords the `/css` entry DOES parse — two subpaths, two answers, one string**, which is the entry-point contract's business and nobody else's. No re-probe |
| **`Z7`** ⟨kf-ChannelOptions ruling 5, `:215`⟩ | CSS scalar | `parseCssScalar("500m")` | **`ok:true` `{number, 500, unit:"m"}`** (re-executed, payload shape exact) | **`parseCssScalar` is permissive at the UNIT; the rejection happens downstream in kf's own `tryParseTime`** (which accepts only `s`/`ms`). **Do-not-chase lock, verbatim**: *"Recorded so no repair chases a phantom parser behaviour."* A façade reporting *"the parser rejected it"* on a `500m` duration would report a failure the parser never returned |
| **`KF-TFP-20`** ⟨kf-TimingFunctionPanel:63⟩ | easing/CSS | `parseTimingFunction`, **once per `pointermove`** | as row 8 above | **The census's only LIVE per-move grammar consumer**, and the sharpest available statement of the anti-pattern the façade exists to make visible (**parse-once/interpolate-many**) — *"a parser recovering a two-valued tag the handler already holds verbatim as `v.mode`"*. Registry-swept: *"KF-CO-10 and the R1 class are different mechanisms."* Cure NO-WAVE-OWNER |
| **`KF-TFP-18`** ⟨kf-TimingFunctionPanel:61⟩ | easing (serializer) | `cubicBezierToString` at a WAAPI compositor-delegation site | 2-dp emission against 3-dp authored points — **Δ up to 0.005/coordinate, 10× the file's own `quadEq` tolerance**; the persisted literal (2 dp) and `controlPoints` (3 dp) disagree in localStorage | **Fold-extension of `KF-ET-1`**; grade lives there. Dispositioned at round 5 **without a row** |
| **`KF-TFP-21` / `KF-TFP-27`** ⟨kf-TimingFunctionPanel:64, :73⟩ | engine option seam | — (kf's own `setTimingFunction` / `animation.frames`) | *"`animation.setTimingFunction` normalizes but never reaches compiled frames; the demo's direct write reaches frames but never normalizes"*; `animation.frames` pre-parse yields `[]` and the per-frame write is **a silent no-op reporting success** | **KF.W5 rider** — the option-setter gap letter, ONE letter with `G-OPTSET`'s four legs. Demo half NO-WAVE-OWNER |
| **`KF-CB-16` / `KF-CB-24`** ⟨kf-CopyButton⟩ | stylesheet / easing | `parseStylesheet` (via the collectors) · `parseTimingFunction("steps")` | two **constant** keyframe strings re-parsed through the full stylesheet grammar **per instance, unmemoized** — N cards pay 2N parses; `"steps"` **fails** the CSS Easing L1 parse (`ok:false [css_syntax]`; and `easing("steps")` → `easing_name_unknown`) | census cells; cures at their banks |
| **`C-11`** ⟨kf-CubeScene⟩ | easing | `easeInBounce` by value.js function reference | `easing("easeInBounce")` → **`ok:true`** | the **only** `@mkbabb/value.js/easing` edge in that subtree; census cell |
| **`KF-ES-22`** ⟨kf-EasingScene⟩ | type edge | glass-ui's `JumpTerm` imported **FROM** value.js | type-only, inert casts; erased at build | census cell; no runtime entry reached |
| **`KF-ET-32`** ⟨kf-EasingTarget⟩ | graph edge | the 41.6 KB `/css` module enters the **static graph** for two frozen tables | **link, not call** — no entry is executed | census cell, dispositioned at round 5 without a row |
| **`KF-AV-8 · L·M-5 = C-3`** ⟨kf-AnimationVisualizer:49⟩ | graph edge | the lone deep `@src` import; *"the target module is value.js-bearing, parser-touching, and **side-effectful at module eval**"* — `browser.ts` imports `@mkbabb/value.js/{value,css}` and installs a module-eval `window.resize` listener | a graph entry, not a Result unwrap | PASS-6 escape **E5**, dispositioned at round 6; folds by reference to `KF-CE-12`, whose deep-import arm is **KF.W8**'s |
| **`C-13`** ⟨kf-KeyframeTimeline⟩ · **`S-3`** ⟨kf-TimelineCaret:113⟩ · the `/math` family | math subpath | `clamp` from `@mkbabb/value.js/math` | a pure function; **`/math` is not the parse surface** | recorded so the negatives that rest on it (kf-DemoGlobalChrome `C-10`, kf-AnimationControlsGroup `SUP-1/2/3`, kf-SequenceScene superlative 4, kf-SpringHeatmap superlative 7, kf-SequencePlayhead superlative 7, kf-PlaybackRibbon C-negative) are **topological, not probabilistic** |

### §2.c · The untrusted-CSS ingresses — where authored text crosses into the grammar

| ingress ⟨record:line⟩ | what crosses | entry reached | executed outcome | disposition |
|---|---|---|---|---|
| **`C-7`** ⟨kf-KeyframeTimeline:48⟩ — `KeyframeTimeline.vue:251-261` → `:263` `kf.vars` → `:264` un-awaited `rebuild()` | **any** declaration value a user types, unvalidated (`split("\n")` + `indexOf(":")`) | `parseAnimationCSS` → the stylesheet grammar | `oklch()` → **THROW TypeError**, **swallowed** at `useTimelineBuild.ts:47-50` (`console.error` + `animation.value = null`) | **The §F-2 falsifier** (→ `GATE-VERDICT-F2-ADDENDUM-2026-09-17.md`). Posture at `POSTURES.md` row 8; crash identity FOLDS to megatranche R1, **never re-booked**; cure **KF.W7** |
| **`KF-CE-12`** (R1 ingress arm only) ⟨kf-CSSCodeEditor:46⟩ — `CSSCodeEditor.vue:116`, the debounced `modelValue` write | the demo's **largest** untrusted-CSS ingress | the stylesheet grammar | same class | **The fuzz entry of record** for G-W2-5 clause 3 (`.d`'s). Arm-split **hard lock**: the deep import, `sideEffects:false` falsification and `useKeyframesState.ts:1` are **KF.W8's** and must not be pulled here |
| **`Z3 · KF-KC-17 · L-7`** ⟨kf-KeyframeCard:59⟩ — `range.insertNode` fires no `input` event | **4×NBSP (U+00A0)**, via a **bypassed model channel** | `parseAnimationCSS` via `ops:111` | **the parse SUCCEEDS** — value.js's `/\s/` **matches** U+00A0 (`K-11` ⟨kf-KeyframesAddDialog:107⟩, re-verified at the bank, **do-not-re-derive lock**) | **The expected-outcome fact the `.d` fixture must encode**: the character arm asserts the parse succeeds and **the MODEL is what diverged** — not that the parser rejects. `KF-KC-17` is NO-WAVE-OWNER and is **never merged** with kf-KeyframeCard's `KF-KC-53` negative |
| **`D-27/L-7/C-9`** ⟨kf-SquareScene:53, identity at `:125`⟩ | authored CSS in a `--rainbow-*` token or a `calc()` value | `parseCssScalar` (`num()`), `parseCssColor` (`colorAt`) | `calc(1px + 2px)` → `ok:false` → **`num()` throws** → **the rAF loop bricks for the mount's lifetime** | **CRASH-SURFACE ANNOTATION, not a new row** (anti-rename; the cell's own lock: *"annotated, never re-booked"*). Riders travel with it: `C-1` (dead paint) and `MISS-4` (per-frame re-parse of two static strings — *"what moves the C-9 throw from a survivable init site into the loop-bricking frame path"*). Cure = **KF.W11** |
| **`KF-KE-2`** ⟨kf-KeyframesEditor:41⟩ / **`KC-2`** ⟨kf-KeyframeCardList:34⟩ — the one write, two registers | a slider value written **into a value.js deep-frozen parse result** | the frozen-parse boundary (not an entry) | **`TypeError` at i=0**, loop aborts, `:45` never runs — *"the user sees nothing"*: Vue's `callWithAsyncErrorHandling` turns it into a console line. Executed domain probe: the declared domain offers **20 points value.js rejects at parse** (`keyframe_selector_invalid, expected:["0%..100%"]`) | **The contract fact is the census's** (value.js 4.0.0 deep-freezes every parse result in a frozen envelope — *"which is exactly why KC-2 is a loud TypeError instead of silent corruption"*) → **G-W2-6**; **the posture is `POSTURES.md` row 19**. *The write is one, the registers are two, the subjects are disjoint.* Cures: **CARD-UNIT** and **KFED-UNIT** |
| **`KF-HA-13`** ⟨kf-HeroAurora:55⟩ | `var(--accent-kf)` / non-opaque hex / `color-mix()` seeds | value.js diagnostics, **converted to throws by glass-ui's bridge** | *"all THREW in execution"* — from an unguarded `resolveAtoms` at `<script setup>` top level, *"one token-ising edit from a **white-screened home route with no error handler anywhere**"* (`KF-HA-15`) | **Load-bearing on the contract**: the façade's diagnostic surface is not designing against a neutral consumer — it designs against **a bridge that destroys the Result**. Cure **KF.W6** (the `OklchStop` seed form, else a guard); **bridge posture is producer-domain → the glass BH relay**, never a demo-side hack. *This wave takes the census datum only* |
| **`C-19`** ⟨kf-EditorShell:77⟩ | the demo's own token idiom, `color-mix(in srgb, …)` | `parseCssColor` vs `parseCssValues` | **`ok:false [css_syntax]`** at the colour entry · **`ok:true`** at the value entry — *the demo's own token idiom is rejected by the colour entry and accepted by the value entry* | **Any façade diagnostic surface must treat `color-mix()` as a first-class not-an-error at the colour seam, or the demo's token system reads as broken.** → **G-W2-6**'s contract. Fold direction `C-19 → KF-APP-56 → R1`, never re-booked at R1 directly |

---

## §3 · THE RATE AND SHAPE CELLS — how often the grammar is entered

Not defects of *reachability*; recorded because a parse façade that ignores call frequency inherits
the cost it was built to make visible.

| cell ⟨record⟩ | measured shape |
|---|---|
| **`KF-TFP-20`** ⟨kf-TimingFunctionPanel⟩ | `parseTimingFunction` **once per `pointermove`**, one of four classifier funnels invalidated by the same per-move literal write |
| **`RR-B missed-2`** ⟨kf-TimelineTrack⟩ | every `pointermove` of a marker drag runs **a full engine construction and CSS parse** (~60–120/s), no throttle, no rAF coalescing, no dirty check — *"a drag held at a rail end rebuilds at pointer rate for zero delta"* |
| **`MISS-4`** ⟨kf-SquareScene⟩ | `colorAt` re-parses **two STATIC colour strings per tumble frame** (four Result allocations per frame, ~120 frames per tumble) — *"parse-once/interpolate-many is the library's own idiom; the showcase demonstrates the inverse"* |
| **`KF-CB-16`** ⟨kf-CopyButton⟩ | two constant keyframe strings re-parsed through the full stylesheet grammar **per instance**, unmemoized |
| **`KF-SST-31`** ⟨kf-StartingStyleTarget⟩ | the heavy entry compile is **unthrottled and ungated by view**: every 0.01-step slider tick fires it |

---

## §4 · THE DEMO CENSUS — G-W2-2b, RE-MEASURED AND FROZEN AT `7d958f21`

**The two witness commands, re-executed by this seat at the ref of record, double-run identical:**

```
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- demo/ | wc -l
  7
$ git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- demo/
  demo/components/instrument/keyframes/KeyframesEditor.vue
  demo/components/instrument/keyframes/utils/parseAnimationCSS.ts
  demo/components/instrument/timeline/timelineTypes.ts          ← type-only
  demo/scenes/square/useSquareDemo.ts
  demo/scenes/square/useSquareTumble.ts
  demo/utils/keyframeSelector.ts
  demo/utils/reference-data/animationDescriptions.ts

$ <per-file whole-import-block runtime read, type-filtered — command (ii), re-aimed at demo/>
  demo/components/instrument/keyframes/KeyframesEditor.vue          :: parseCssScalar
  demo/components/instrument/keyframes/utils/parseAnimationCSS.ts   :: collectAnimationOptions
  demo/components/instrument/keyframes/utils/parseAnimationCSS.ts   :: collectStyleRules
  demo/scenes/square/useSquareDemo.ts                               :: parseCssScalar
  demo/scenes/square/useSquareTumble.ts                             :: parseCssColor
  demo/scenes/square/useSquareTumble.ts                             :: serializeCssColor
  demo/utils/keyframeSelector.ts                                    :: parseKeyframeSelector
  demo/utils/reference-data/animationDescriptions.ts                :: parseTimingFunction
  → 8 runtime specifiers over 6 modules
```

**FROZEN, module for module** — this is the set G-W2-2b monitors:

| module | runtime specifiers | import line | call site(s) |
|---|--:|---|---|
| `demo/components/instrument/keyframes/KeyframesEditor.vue` | 1 — `parseCssScalar` | `:123` | `:186` |
| `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts` | 2 — `collectAnimationOptions`, `collectStyleRules` | `:2`, `:3` (block `:1-5`) | `:41`, `:36` |
| `demo/scenes/square/useSquareDemo.ts` | 1 — `parseCssScalar` | `:4` | `:107` |
| `demo/scenes/square/useSquareTumble.ts` | 2 — `parseCssColor`, `serializeCssColor` | `:2` | `:22`, `:37` (emit half = Tier-D) |
| `demo/utils/keyframeSelector.ts` | 1 — `parseKeyframeSelector` | `:2` (block `:1-4`) | `:15` |
| `demo/utils/reference-data/animationDescriptions.ts` | 1 — `parseTimingFunction` | `:113` | `:76` |
| **totals** | **8 over 6 modules** | — | — |
| `demo/components/instrument/timeline/timelineTypes.ts` | **0 runtime** (`import type { KeyframeSelector }`, `:1`) | `:1` | — |

**Assertion (G-W2-2b, unchanged)**: *the demo-side set is **CENSUSED AND FROZEN at six modules /
eight runtime specifiers**, and no demo module gains a new runtime grammar/collector edge while this
wave is open.* **This wave opens no demo call site**, so the clause asserts **enumeration and
non-growth**, never a cure. **Its force is unchanged**: it is a **paired clause of G-W2-2**, and **a
`src/`-only re-scoping of either clause reds the pair** — which is `KF-KE-54`'s binding written as a
check.

**Falsifier**: a ninth runtime specifier, or a seventh runtime module, under `demo/` while this wave
is open.

### §4.1 · Anchor drift `81a56990` → `7d958f21`, measured and recorded (D-19)

The spec's demo-arm anchors were resolved at `81a56990`. Re-resolved here; **the module and the
symbol are load-bearing, the line number rides the command**:

| spec anchor | at `7d958f21` | note |
|---|---|---|
| `scenes/square/useSquareDemo.ts:4` (import), call **`:82`** | import `:4` **exact**; call **`:107`** | **drifted 25 lines**; symbol and module unchanged |
| `utils/reference-data/animationDescriptions.ts:128` (import), call `:76` | import **`:113`**; call `:76` **exact** | **drifted 15 lines upward**; symbol and module unchanged |
| `KeyframesEditor.vue:123` / call `:186` | **exact** | — |
| `keyframes/utils/parseAnimationCSS.ts:1-5` / `:36` / `:41` | **exact** | — |
| `scenes/square/useSquareTumble.ts:2` / call `:22` | **exact** | — |
| `utils/keyframeSelector.ts:1-4` / call `:15` | **exact** | — |
| `timeline/timelineTypes.ts:1` (type-only) | **exact** | — |

**The census figures did not move**: 7 files · 6 runtime modules · 8 runtime specifiers, identical
module-for-module to §Carry F1's record.

---

## §5 · THE BOUNDARY SET — negatives, enumerated over the WHOLE 58

*Adopted **as negatives**. None becomes work. **None is to be re-probed.** A later seat that re-files
one is in breach of the bank's own words.* **32 banked negative cells over 32 distinct records**; the
other 26 records carry no banked boundary negative and their per-cell read dispositions are stated at
`POSTURES.md` §5.

### §5.a · The F0 verified negatives (12)

| id ⟨record⟩ | the lock |
|---|---|
| **`KF-APP-56`** ⟨kf-App⟩ | `css_syntax` ×0 in the boot entry; **the boot graph is OUT**; the colour-module exposure is `KF-APP-15`, KF.W6's |
| **`C-19`** ⟨kf-EditorShell⟩ | folds to `KF-APP-56` — *"never re-booked at R1 directly"* (its component rider is censused at §2.c) |
| **the `S-C` R1 note** ⟨kf-KeyframeCardList⟩ | **R1-class unreachable; the seam is `KeyframesEditor.vue`** ⟨qualified at round 3: **this line no longer stands for the whole record** — `KC-2`/`Y2` is a contract fact, not a negative⟩ |
| **`C·§4`** ⟨kf-CubeAxisLines⟩ | verified negative |
| **`SUP-3`** ⟨kf-TimelineTrack⟩ | *"the only emit→parser path is **awaited inside the try** at `useTimelineBuild.ts:40-50`"* — *"recorded as a negative result so parser waves skip this file"*. ⟨**Tension recorded, not smoothed**: those same bytes are the silent-swallow posture `POSTURES.md` row 8 books at kf-KeyframeTimeline. **Containment at the track's topology; posture at the timeline's handling** — booked once each, by subject⟩ |
| **`C-4`** ⟨kf-CSSPasteDialog⟩ | *"Cleared — **do not re-file**"* |
| **`K-5`** ⟨kf-KeyframesAddDialog⟩ | *"CONTAINED … Cleared — **do not re-file**"* |
| **`KF-KC-53`** ⟨kf-KeyframeCard⟩ | verified negative ⟨beside it: **`Z3`/`KF-KC-17`**, booked at G-W2-5, **never merged** with this negative⟩ |
| **`LP-24`** ⟨kf-LayerConfigPanel⟩ | dev-graph exposure only |
| **`MM-37`** ⟨kf-MbabbMenu⟩ | bundle-graph presence, **no reachable path** |
| **`#11`** ⟨kf-CubeTarget⟩ | verified negative |
| **`C's L-1`** ⟨kf-ChannelControls⟩ | verified negative |

### §5.b · The round-1 widening (11)

| id ⟨record:line⟩ | the lock, verbatim |
|---|---|
| **`C-§1 / R-B`** ⟨kf-KeyboardShortcutsModal:78⟩ | *"CLEARED — the R1 crash class is not on this component's graph; same containment posture as the banked kf-CSSPasteDialog row. **Do not re-file.**"* |
| **`C-10`** ⟨kf-DemoGlobalChrome:77⟩ | *"zero value.js/engine edges; R1 reachability CLEAN … **recorded so parser waves skip this file**"* — mechanism named: the only neighbourhood edge is the parent's `@mkbabb/value.js/math`, and **`/math` is not the parse surface**. *"The negative is topological, not probabilistic."* |
| **`SUP-1/2/3`** ⟨kf-AnimationControlsGroup:106⟩ | *"the 1.1 KB `value.js/math` leaf everywhere `clamp` is needed (**the direct cause of the R1-unreachable verified negative**)"*, with **M-11**'s scope correction (the runtime `RAFPlayback` edge one hop out) |
| **`S+2 / superlative 6`** ⟨kf-AmigaScene:150⟩ | *"amiga is the **negative** exemplar (zero exposure); **the R1 row itself stays owned by KF.W3**"* |
| **`C-10`** ⟨kf-AnimatedText:105⟩ | *"the R1 crash-class exposure delta of adopting `splitText` is **exactly zero**"* |
| **`SUP-7`** ⟨kf-AnimationVisualizer:124⟩ | *"parser-free subpath (**no R1 crash class in this call graph**)"* |
| **`★ S-7`** ⟨kf-SpringPhysicsFacet:107⟩ | *"the R1 crash class does not reach this subtree"* — **doubles as `POSTURES.md`'s positive row 1** |
| **`superlative 3 / C S★1`** ⟨kf-OrbitalDrag:132⟩ | *"a 1,110-byte zero-import leaf making the R1 crash class **unreachable by module topology** while a sibling scene took the exposed edge"* |
| **`S+3 / S-d`** ⟨kf-TimelineHoverPreview:112⟩ | *"**structural immunity to the R1 crash class by construction**"* |
| **`S-C2`** ⟨kf-EditorStartScreen:113⟩ | *"the one string that crosses into value.js was **EXECUTED** against the installed 4.0.0, not reasoned about"* — the method precedent this census follows |
| **`C's S★-3`** ⟨kf-TypingDots:89⟩ | *"the one string crossing the package boundary **checked against the installed `@mkbabb/value.js@4.0.0` dist**"* — same precedent |

### §5.c · The round-2 completion over the 58 — `X1`–`X9` (9)

| # | id ⟨record:line⟩ | the lock, verbatim |
|---|---|---|
| **X1** | **`S-9 (RR-2)`** ⟨kf-ControlsPaneWrapper:121⟩ | *"100% `import type` … **the parser blast radius has no entry point in this component's import closure**"* |
| **X2** | **`C S-A`** ⟨kf-EditorHeader:95⟩ | *"proving a negative: **the full import-closure walk that DECLINED an R1 parser-crash claim**"* |
| **X3** | **`superlative 7`** ⟨kf-MatrixEditor:139⟩ | *"**The value.js edge is type-only and R1-clean** … **no parser entered**"* |
| **X4** | **`C-negative (upheld)`** ⟨kf-PlaybackRibbon:88⟩ | *"the value.js **R1 parser-crash class is NOT reachable** from this component's scrub path … **Negative recorded so it is never re-litigated.**"* |
| **X5** | **`superlative 7`** ⟨kf-SequencePlayhead:121⟩ | *"`@mkbabb/value.js/math`, declared, 1110 import-free bytes, **parser-crash class unreachable**"* |
| **X6** | **`superlative 4`** ⟨kf-SequenceScene:119⟩ | *"**R1 is structurally unreachable** … the 4.0.0 exports map has no root entry; no colour string ever enters the engine. **Package-enforced, not discipline-enforced.**"* |
| **X7** | **`superlative 7`** ⟨kf-SpringHeatmap:101⟩ | *"one pure function (`clamp`) by exact subpath …; `/css`/`/color` untouched, transitive reach verified absent — **the R1 parser-crash class is structurally unreachable**"* |
| **X8** | **`KF-SST-36 · C-13`** ⟨kf-StartingStyleTarget:80⟩ | *"**the R1 colour-parser class is unreachable here** (opacity/transform only; `eligible: true` re-executed)"* — routing carried whole: the negative is this census's, the **KF.W3 scoping input** stays W3's |
| **X9** | **`S-A (C)`** ⟨kf-SpringTrace:108⟩ | *"**the R1 crash class is provably unreachable** — the closure is value.js-free by construction (`sample.ts:16`), **proven by enumeration**"*. **Cure note carried verbatim (M-25)**: *"the N-2 route imports runtime `@mkbabb/value.js/easing` … R1 (`/css`) stays unreachable either way; **the adopting spec must state this trade**."* **Stated: this census adopts X9 as an R1(`/css`) negative only**, and takes no position on the N-2 route |

**The eight-vs-one split is recorded, not smoothed** (E-3): X1–X8 sit in records the AUDITED basis did
not span until round 2; **X9 sits in an AUDITED record**, so *"we only sampled"* does not fully explain
the miss, and this register is not allowed to claim it does.

---

## §6 · THE §F-2 CORRECTION — delivered, beside the pinned authority

`GATE-VERDICT.md:42`'s *"no known consumer feeds the crash shape (kf's 37 seams verified — none
constructs empty functional colors)"* is **FALSIFIED** by `C-7`'s live inline variable editor (§2.c),
re-walked byte-exact at `7d958f21`, and corroborated independently by kf-SquareScene
`D-27/L-7/C-9`'s authored-CSS path.

**The correction is an E-3 addendum-BESIDE, never a rewrite** (epoch rule):
`docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT-F2-ADDENDUM-2026-09-17.md`, **published in the
same commit as this census** under the wave's declared commit-family lock. **No byte of
`GATE-VERDICT.md` is edited.** What is falsified is one clause; what is scope-corrected is the *"37
seams"* parenthetical (the verification was real and covered kf's `src/` **seams**, not the demo's
live **typing surface**); everything else in §F-2 stands.

---

## §7 · CARRIAGE (LAW B) — enumeration, cited, never closed here

G-W2-5's basis clause was amended at repair round 3 precisely to strike a closure claim from this
census's voice. The lawful form is a citation:

- `conformance/PASS-4/KF-W2-CHECK.md` **§2a** — seven cells outside the register, named **Z1–Z7**, all
  seven booked at repair round 4.
- `conformance/PASS-5/KF-W2-CHECK.md` **§2 / §2a** — **86 routed · 77 booked · 9 escaped · 16 defects
  (7 MAJOR)**, escapes **E1–E9**.
- `conformance/PASS-6/KF-W2-CHECK.md` **§2 / §2a** — **92 routed · 86 accounted · 6 escaped**
  (**E1–E6**) · 13 defects (5 MAJOR). Two of its escapes landed in `POSTURES.md` (row 20, positive row
  6); `E1`/`E4`/`E5`/`E6` are censused or dispositioned here and at round 6.
- `conformance/PASS-7/CHECK.md` **§1** and `conformance/PASS-8/CHECK.md` **§1** — whole-corpus id-keyed
  censuses over all 58 (2,632 and 2,633 candidate rows; every record yielding), **`censusEscapes = 0`**
  at both, each reported *"per LAW B … **this seat's dated measurement, never as a closure of the
  class**."*

**This file makes no closure claim of its own.**

---

## §8 · SELF-COUNT RECEIPT (measured from these settled bytes, double-run)

Run from `docs/tranches/X/keyframes/registries/`:

```
$ awk '/^### §2.a/{f=1} /^### §2.b/{exit} f && /^\| *[0-9]+ \|/{n++} END{print n+0}' INGRESS-CENSUS.md   → 8
$ awk '/^### §5.a/{f=1} /^## §6/{exit} f && /^\| \*\*/{n++} END{print n+0}' INGRESS-CENSUS.md            → 32
$ cd /Users/mkbabb/Programming/keyframes.js && git grep -l 'from "@mkbabb/value.js/css"' 7d958f21 -- demo/ | wc -l   → 7
$   … per-file runtime read over exactly those files                                                     → 8 specifiers / 6 modules
```

**Demo arm: 7 files · 6 runtime modules · 8 runtime specifiers — CENSUSED AND FROZEN.**
**Boundary negatives: 32 banked cells over 32 distinct records, enumerated over the whole 58.**
**Cure of any ingress: not this wave's.**
