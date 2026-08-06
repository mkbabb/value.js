claude-opus-5[1m]

# CHALLENGE — `MorphPhaseConfig.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue` (212 lines; template 1–62, script 64–106, scoped style 108–212).
**Posture** Assumed defective until the tree proved otherwise. Every claim carries severity + `file:line` + its own falsifier; the falsifier was executed where executable, and four candidate defects died under it (§7 — recorded, not hidden).
**Method** Static + source-derived only. Read whole: the target, its 3 import sources (`@mkbabb/glass-ui/select`, `@mkbabb/glass-ui/slider`, `@/composables/useMorphConfig`), the transitive `@/lib/easings.ts` + `@/composables/useFourierMorph.ts`, the sole consumer `FourierMorphDemo.vue`, the sibling render sink `MorphShapePreview.vue`, and the installed producer artifacts (`@mkbabb/glass-ui@4.0.0` dist + `glass-ui.css`, `reka-ui@2.9.10` types, `@mkbabb/value.js@0.13.0` types + runtime). No browser. Two measurements were taken by *running the installed producer code read-only in node* (easing amplitude sampling, `twMerge` conflict probe) — that is source-derived evaluation, not live-app observation; nothing was written to any product tree.
**Write footprint** This file only.

| | |
|---|---|
| Defects | **16** (0 BLOCKER · 3 MAJOR · 8 MINOR · 5 INFO) |
| Blockers | **0** — argued, not conceded, in §6 |
| Superlatives | **4** (L-18 both ways) |
| Corpus rows folded | CENSUS-2026-08-03 §3a (lines 85–86, 94–97), row 38 / C-7; lane-frontend.md 173, 181, 368, 382, 499, 565; intake `lane-fourier-r3-r6.md` R5-7 / R6-5 |
| Explicit contradiction of the corpus | **1** — lane-frontend.md:382 (§5) |

---

## §1 — The three MAJORs

### D1 · MAJOR — the number input is uncontrolled and desyncs whenever the clamp is a fixed point

**Where** MPC:10–18 (`<input type="number" :value="duration" @change=…>`), MPC:93–96 (`emitDuration`).

```
 12:  :value="duration"
 13:  @change="emitDuration(($event.target as HTMLInputElement).value)"
 94:  const v = Math.max(50, Math.min(800, Math.round(Number(raw) || 50)));
 95:  emit("update:duration", v);
```

The input is a *property binding plus a change handler* — there is no `v-model`, no `@input`, and no post-emit DOM write-back. The DOM value is therefore only ever corrected as a side effect of a re-render, and a re-render only happens if the `duration` prop actually changes. When the clamp maps the typed text onto the value the model already holds, nothing changes, nothing re-renders, and the DOM keeps displaying the rejected text indefinitely.

**Failure scenario (reachable at first touch, zero prior interaction).** `DEFAULT_MORPH_CONFIG.morphMs = 50` (useFourierMorph.ts:61) and the floor is 50 (MPC:94). Open `/morph`; in the **Morph** card select the duration field and type `20`, or simply clear it; blur. `change` fires → `Number("20")` → clamp → `50` → `emit("update:duration", 50)` → `FourierMorphDemo.vue:42` assigns `morphConfig.config.morphMs = 50`, which is already 50 → no reactive trigger → no re-render → **the field still reads `20` (or empty) while the model, the slider thumb and the `{{ totalMs }}ms` chip all read 50.** Same at the ceiling: any card sitting at 800, type `900`, blur → field reads `900` forever. The two sibling controls bound to the same scalar now disagree on screen.

**Falsifier (executed).** (a) *Does the browser rewrite the value from `min`/`max`?* No — `min`/`max` on `input[type=number]` gate constraint-validation and the spinner steppers; they never rewrite typed text. (b) *Does Vue patch the `value` prop anyway?* Only inside a re-render; with no dependency change there is no re-render. The dodge would be an explicit write-back (`$event.target.value = String(v)`) or `@input` — the file has neither. (c) *Is the emit swallowed?* No — the parent handler at FourierMorphDemo.vue:42 is a direct assignment to a `reactive` field, whose no-op-on-equal semantics are exactly the mechanism. The claim dies only if some ancestor forces a re-render on every emit; none does (`FourierMorphDemo` re-renders on *value* change, which is precisely what does not occur).

**Note the contrast that makes this a defect rather than a taste call**: the in-tree chassis this component duplicates, `ui/SliderControl.vue:78`, uses `@input` (live commit, so every keystroke re-derives the prop and the fixed-point trap cannot form) and `clamp()` with an explicit `Number.isFinite` guard (SliderControl.vue:40–42). The correct idiom exists in the repo, 150 lines away.

---

### D2 · MAJOR — the per-instance retint hook is dead: `--slider-scrub-*` has zero consumers in glass-ui 4.0.0, so the `sliderColor` prop is inert

**Where** MPC:204–211 (the four declarations), MPC:29 (`:style="{ '--track-color': sliderColor ?? 'var(--accent-red)' }"`), MPC:85 (`sliderColor?: string`), MPC:23 (`variant="standard"`), and the parent's three deliberate accents at FourierMorphDemo.vue:31 (`--accent-red`), :41 (`--accent-pink`), :51 (`--accent-red`).

```
204:  /* A.W2.c — glass-scrubber per-instance retint hook + flex stretch. */
205:  .duration-slider-track {
206:      flex: 1;
207:      --slider-scrub-range-bg: color-mix(in srgb, var(--track-color) 30%, transparent);
208:      --slider-scrub-range-bg-hover: color-mix(in srgb, var(--track-color) 45%, transparent);
209:      --slider-scrub-thumb-bg: var(--track-color);
210:      --slider-scrub-thumb-bg-hover: var(--track-color);
211:  }
```

**Evidence.** `grep -ro "slider-scrub[a-zA-Z-]*" node_modules/@mkbabb/glass-ui/` → **0 occurrences** (js, css, d.ts, styles/ — the whole installed package). The variables glass-ui 4.0.0 actually reads are, exhaustively: `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`, `--slider-thumb-spring`, `--slider-track-bg`, `--slider-track-height`. The live rule is

```
.slider-range[data-v-534634a7]{…background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent);…}   /* glass-ui.css */
```

— consumer-overridable by inheritance from the Slider root, which is exactly the element `.duration-slider-track` styles. So the hook was one token-rename away from working and is instead wholly dead: **all three phase cards paint the same `var(--primary)` glass**, and the red/pink/red phase coding the parent goes to the trouble of passing is discarded. `sliderColor` is a prop with no effect.

Three further facts sharpen it:
1. `--slider-scrub-range-bg-hover` and `--slider-scrub-thumb-bg-hover` (MPC:208, 210) have **no counterpart at all** after any rename — glass-ui's hover rule changes `box-shadow` only (`.glass-slider:not([data-variant=spectrum]):hover .slider-range{box-shadow:…}`), never `background`. Two of the four lines are unrepairable as written.
2. Under `variant="standard"` the thumb paints `width:0;opacity:0;background:0 0` (glass-ui.css, `slider-thumb[data-v-534634a7]`) — the documented "no visible thumb at all" recipe (`components/ui/slider/index.d.ts`). So `--slider-thumb-bg` is moot too. **Exactly one of the four declarations (MPC:207 → `--slider-range-bg`) has a live target.**
3. This is a *class*, not a one-off: `grep -rn "slider-scrub" src` → **21 declarations across 7 files** (`BasisSelector.vue:319–322`, `EditorControlsDock.vue:225–228`, `GlassTimeline.vue:125`, `SliderControl.vue:144–148`, `ConvergenceTimeline.vue:136`, `HarmonicLevelGrid.vue:210–213`, `MorphPhaseConfig.vue:207–210`). Every `--slider-scrub-track-height` in that list is dead the same way, so every slider in the tree silently renders at the `size="md"` default (1.25rem).

**Falsifier (executed).** The claim dies if any installed glass-ui artifact reads `--slider-scrub-*`, or if the retint is applied by some other path. Both were checked: zero string occurrences package-wide; the CVA emits *no* variable-setting classes (`variant: { standard: "", spectrum: "" }`, slider-DQ95MET2.js) so there is no second channel; and no `--track-color` consumer exists in glass-ui either. It would also die if the parent passed one colour — it passes three, of which two differ.

---

### D3 · MAJOR — the whole component is a re-implementation of two in-tree chassis, and loses to both on the merits

**(a) The duration row duplicates `ui/SliderControl.vue`** — described in its own header as "Labeled slider chassis — label + inline numeric input + glass-scrubber track" (SliderControl.vue:2–3) and inventoried as such by the corpus (lane-frontend.md:181, :368 "`SliderControl.vue` (→ `Slider variant="standard"`)"). Line-for-line correspondence:

| concern | `SliderControl.vue` | `MorphPhaseConfig.vue` |
|---|---|---|
| scalar↔array adapter | 53–56 `computed<number[]>` | 99–102 `computed<number[]>` (near-identical, incl. the `?? min` guard) |
| per-instance colour | 89 `:style="{'--track-color': color}"` | 29 (identical) |
| numeric input | 71–79 | 10–18 |
| clamp | 40–42 `Number.isFinite` guard | 94 `Number(raw) \|\| 50` |
| commit semantics | 78 `@input` (live) | 13 `@change` (blur/Enter only) |
| label association | 66–80 `<label>` **wraps** the input | 8 `<label>` wraps nothing, no `for` |
| aria | 87 `:aria-label="label"` | 27 `aria-label="Duration (ms)"` |

The duplicate is the worse of the two on four axes (commit latency → D1; the `|| ` fallback → D7; the orphan label → D12; the number→string→Number round-trip at MPC:101 → D5). Roughly 30 template lines, 10 script lines and 40 CSS lines are re-derived.

**(b) The easing select re-implements `EasingPicker.vue` + `EasingCurvePreview.vue`.** The corpus already names `EasingPicker.vue`+`EasingCurvePreview.vue`+`lib/easings.ts` a HARD shadow, "the producer README's forbidden *fourth fork*" (CENSUS-2026-08-03.md:94–96). MPC:46–56 hand-inlines a **fifth** instance of "render an easing curve as an SVG path in a chip": a bare `<svg viewBox="0 0 40 20">` + `<path :d="easingCurvePath(name)">`, where `EasingCurvePreview.vue` (41 lines, sized/coloured/overshoot-safe/memoised) already exists and is imported by `EasingPicker.vue:32`.

**Falsifier (partly successful — severity held at MAJOR, scope narrowed).** Direct substitution of `EasingCurvePreview` is *not* drop-in: its prop is `easing: EasingName` from `@/stores/animation` (the compact 6-name catalog), while this component drives the 22-name morph catalog typed `string`. So (b) requires widening that prop (or accepting a precomputed `d`) — the duplication is real, the one-line fix is not. `SliderControl` substitution in (a) survives its falsifier intact: every prop the chassis needs (`label`, `modelValue`, `min`, `max`, `step`, `color`) is present at the callsite, and the only feature MPC has that the chassis lacks is the `ms` unit chip (MPC:19), which `formatValue` (SliderControl.vue:33) already covers.

---

## §2 — MINORs

**D4 · MINOR — `String($event)` is the wrong error posture at the Select boundary.**
MPC:36 `@update:model-value="$emit('update:easing', String($event))"`. glass-ui's `Select` re-emits reka's `update:modelValue: (value: AcceptableValue) => any` (`components/ui/select/Select.vue.d.ts`), and `AcceptableValue = string | number | bigint | Record<string, any> | null` (reka-ui@2.9.10, `dist/index3.d.ts:231`). `String()` accepts all five members and manufactures a *valid-looking* easing name from four of them (`"null"`, `"[object Object]"`, `"42"`), instead of rejecting. It then composes with two other silencers: `getEasingFn` falls back to linear for any unknown name (easings.ts:65–66) and `<SelectValue />` (MPC:38) carries no `placeholder`, so an out-of-catalog easing renders a **blank trigger with a silently linear animation and no console signal anywhere**. A `typeof v === "string" && v in presets` guard is the two-token fix. *Falsifier:* reachability is genuinely low — every `SelectItem :value` is a string from `EASING_PRESET_NAMES` (MPC:44) and reka's Select cannot deselect, so the union's other four members are not reachable through the UI today. Severity held at MINOR on that basis; the posture (widen-and-hope vs narrow-and-guard) is the finding.

**D5 · MINOR — the `durationModel` setter is typed narrower than the emit that drives it, and dereferences unguarded.**
MPC:99–102 declares `computed<number[]>`, so the setter parameter is `number[]`; glass-ui's Slider declares `"update:modelValue": (payload: number[] | undefined) => any` (`components/ui/slider/Slider.vue.d.ts`). `arr[0]` at MPC:101 throws `TypeError: Cannot read properties of undefined` on the `undefined` branch. Fix is `arr?.[0]`. *Falsifier:* no reka 2.9.10 pointer/keyboard path emits `undefined` from `SliderRoot`, so this is a contract hole rather than a live crash. Whether `vue-tsc -b` (the `build` script) already rejects the v-model bridge on this variance is **UNVERIFIED** — running it writes `tsconfig.tsbuildinfo` into the read-only evidence tree, which the law forbids; the hazard stands on the `.d.ts` alone either way (if the compiler flags it, the build is red; if the codegen erases it, the runtime hole survives — both are defects).

**D6 · MINOR — `emitDuration` never quantises to the declared step, so the input can write values the slider's own grid cannot express.**
Both controls declare `step` 10 (MPC:16 and MPC:26); `emitDuration` (MPC:94) rounds to an *integer* and clamps, but does not snap to the grid. Typing `55` emits `55`. *Falsifier:* the emitted value is provably off-grid from source alone; whether reka then re-snaps the thumb on the next drag (making the model self-heal) is **UNPROVEN-NEEDS-LIVE (SS-13)**. Either branch is a defect — silent value drift, or a value the number field shows and the slider cannot represent.

**D7 · MINOR — the range is a quadruplicated magic-number literal, and the `||` fallback idiom is unsound.**
`50` / `800` / `10` appear at MPC:14–16 (input attrs), MPC:24–26 (Slider props), MPC:94 (clamp, twice), MPC:101 (`?? 50`) — five sites, no shared constant, and the domain type carries no range metadata (`MorphConfig` / `DEFAULT_MORPH_CONFIG`, useFourierMorph.ts:47–67). Separately, `Number(raw) || 50` (MPC:94) conflates `0`, `NaN` and `""` into the fallback; it is *accidentally* correct only because the floor happens to be 50 — the same idiom under a 0-floor slider would swallow a legitimate zero. `SliderControl.vue:40–42` shows the sound form (`Number.isFinite(v) ? clamp : lo`).

**D8 · MINOR — pure constants are imported through a composable barrel, three export surfaces deep.**
MPC:74–78 imports `EASING_PRESETS` / `EASING_PRESET_NAMES` / `easingCurvePath` from `@/composables/useMorphConfig`, which merely re-exports them (useMorphConfig.ts:20) from `@/lib/easings` — which `useFourierMorph.ts:29` *also* re-exports. One catalog, three public surfaces. The presentational leaf thereby takes a transitive dependency on `@mkbabb/keyframes.js` and `@/lib/svg-fourier` (useFourierMorph.ts:14–27) plus `useClipboard` from the glass-ui root barrel (useMorphConfig.ts:9) to draw 22 polylines. *Falsifier (partly successful):* the `/morph` route is lazily chunked (`router/index.ts:104`) and its only other member, `FourierMorphDemo.vue:92–93`, already imports both composables — so the **bundle delta today is zero**. The finding is coupling and legibility (and the fragility of the barrel if the leaf is ever reused elsewhere), not weight; severity held at MINOR for that reason.

**D9 · MINOR — dead export with an `as any` type hole in an imported module.**
`useMorphConfig.ts:64–66` + `:92`: `updateField(field, event)` is returned from the composable and called **nowhere** in `src` (verified by grep over `*.vue`/`*.ts`: the only hits are its own definition and its own return statement). It writes `(config as any)[field] = Number(target.value)`, so `updateField("settleOutEasing", ev)` would place `NaN` into a `string`-typed field with no type error. Dead code *and* the cast that would make its resurrection unsafe.

**D10 · MINOR — `syncWith` returns no disposer and asks for a redundant deep traversal.**
`useMorphConfig.ts:78–85` creates a `watch` with no stop handle returned; two calls create two permanent watchers with no way to unwind one. Its source is `() => ({ ...config })` — a fresh object per evaluation, so the watcher already fires on every field change by identity; `{ deep: true }` (line 82) adds a full traversal on every tick for nothing. Composable-contract smell on both counts (compare `useFourierMorph`'s disciplined `onUnmounted(() => stopAnim())` at useFourierMorph.ts:215).

**D11 · MINOR — two commit semantics inside one control group.**
The slider commits live (every reka step, through MPC:99–102); the number input commits only on blur/Enter (MPC:13, `@change`). Same scalar, same row, two different notions of "I meant it". This is the mechanism behind D1 and the reason `SliderControl.vue:78` chose `@input`.

---

## §3 — INFOs

**D12 · INFO (cross-axis, A11Y lane) — the number input has no accessible name; the slider has two.**
MPC:8 `<label class="config-label">Duration</label>` neither wraps the input nor carries `for`, and the input has no `aria-label` — the field is announced unnamed. Three cards render three identically-labelled "Duration" rows whose only differentiator is the `<h3>` (MPC:3), which is not programmatically associated either. On the other side, `aria-label="Duration (ms)"` (MPC:27) lands **twice**: glass-ui forwards `$attrs["aria-label"]` explicitly onto each `SliderThumb` (slider-DQ95MET2.js) *and* Vue's default attribute fallthrough puts it on the reka root. Logged here for the A11Y challenger, not scored as an L defect.

**D13 · INFO — the easing preview clips the back-easing overshoot; the in-tree component it duplicates does not.**
MPC:47 `viewBox="0 0 40 20"` with the mapping `y = 18 − v·16` (easings.ts:121). Measured against the installed `@mkbabb/value.js@0.13.0` at the component's own 24-sample resolution: `ease-out-back` peaks at v=1.0868 → y=0.611; `ease-in-out-back` spans v∈[−0.0924, 1.0926] → y∈[0.519, 19.478]. The polyline itself stays inside the viewport — **but `stroke-width="1.5"` (MPC:52) centres 0.75 units either side, so ≈0.23 units (≈15% of the stroke) is shaved at the apex** by the SVG viewport's default clip. `EasingCurvePreview.vue:22` uses `viewBox="-0.05 -0.3 1.1 1.6"` — headroom deliberately sized for exactly this overshoot. *Falsifier:* dies if the `<svg>` did not clip; nothing in `.easing-preview` (MPC:198–202) sets `overflow: visible`, and the UA default for `<svg>` with a viewBox is `overflow: hidden`.

**D14 · INFO — the memo exists 15 lines away and is not used.**
`easingCurvePath` (easings.ts:115–124) is uncached; its sibling `getEasingSVGPath` (easings.ts:102–107) memoises through `_svgCache` (easings.ts:99). MPC:49 calls the uncached one from inside `v-for` (MPC:42), so a full `SelectContent` render costs 22 names × 25 samples = **550 easing evaluations**, all of them pure functions of module constants that could be computed once at module init. *Falsifier (successful, severity dropped to INFO):* `SelectContent` is not force-mounted (`forceMount` defaults false, `components/ui/select/SelectContent.vue.d.ts`), so the slot function does not run while the popover is closed, and the popover cannot be open while the slider is being dragged. The cost is ~550 evaluations per *open*, sub-millisecond — so this is a duplication/API-asymmetry finding, not a performance one. Recorded that way deliberately.

**D15 · INFO — this component's live-committing slider can make the preview's `totalMs` chip disagree with the animation actually running.**
`morphTo` destructures all three durations *once*, before phase 1 (useFourierMorph.ts:151–166), so a mid-flight edit does not reach the running sequence. But nothing disables this component during animation — `FourierMorphDemo.vue:18` disables only the preview button — while the `{{ totalMs }}ms` chip (MorphShapePreview.vue:24, :41, fed by FourierMorphDemo.vue:17) is bound to the live config. Drag a duration slider during a morph and the chip reports a total the in-flight animation is not honouring. *Falsifier:* the capture-at-start is arguably the correct semantics (a phase-3 duration must not change after phase 1 has budgeted the total) — the defect is the *readout*, not the capture, so the cure belongs to the chip or to a disabled state, not to `morphTo`.

**D16 · INFO — the double cast that would turn the value.js uplift's partial failure into a silent linear degradation.**
easings.ts:58 builds every preset as `timingFunctions[name as keyof typeof timingFunctions] as EasingFn` — two casts that erase `undefined` from the type. Today this is harmless: I enumerated the installed `@mkbabb/value.js@0.13.0` `timingFunctions` key set (55 keys) against all 22 `EASING_LABELS` names (easings.ts:29–52) — **zero missing, and all 22 are functions, including the three `*-back` entries** (checked because the neighbouring bezier-preset const stores tuples, which would have thrown on call). Folding CENSUS row 38 / C-7: the bare-root specifiers at easings.ts:9 and :10–16 are `ERR_PACKAGE_PATH_NOT_EXPORTED` candidates the moment value.js 4.0.0 installs — that failure is loud (module resolution), which is fine. The quiet failure mode is the other one: *partial* key loss under a future rename would be absorbed by the cast, and `getEasingFn`/`easingCurvePath` would silently serve `linear` for the missing names. Worth a guard when the uplift lands, not before.

---

## §4 — R5-7 (native template-loop invisibility): where it applies here, and where it does not

The intake row R5-7 (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY→F.W4) establishes: *template-loop evidence keyed to component callsites is blind to native HTML element loops* — `instance.loop.paper-sidebar` derived literally `[]` while the sibling `instance.loop.presets` populated, keyed `callsite:…FunctionInput.vue:157:Tooltip:…`; R6-5 cured it with a `NATIVE_TEMPLATE_LOOP` family.

**Contradiction first, so the class is not over-applied.** The single `v-for` in this file is on a **component**, not a native element — `<SelectItem v-for="name in easingNames" :key="name">` (MPC:41–44). A callsite-keyed deriver *sees* it, exactly as it sees `instance.loop.presets`. **R5-7's primary class does not apply to MorphPhaseConfig**, and any blanket sweep that assumes "fourier `v-for` ⇒ invisible" is wrong here.

**The secondary form does apply, and it is the one F.W4 will trip on.** The loop *head* is component-keyed; the loop *body* is entirely native — `<span>` + `<svg>` + `<path>` at MPC:46–54. A per-component D/L/C audit that counts component callsites will score this file as *1 loop, 22 `SelectItem` instances, 0 native nodes*, and will miss **66 native elements per open popover** (22 × 3), ×3 card instances if all three are opened. Two further multipliers are invisible to *any* static callsite enumeration:

1. **Portal + conditional mount.** `SelectContent` renders through reka's `SelectPortal` and is unmounted while closed (`forceMount` default false). The 66 nodes exist only while open, so a snapshot-based denominator reads 0 and a live one reads 66 — the derivation must model *conditional* subtrees, not just loops.
2. **The teleported clone.** glass-ui's `SelectItem` wraps the default slot in reka's `SelectItemText` (verified in `SelectScrollDownButton-C1jb3b3K.js`, the `SelectItem` definition), so the selected item's whole native subtree — including a second copy of the `<svg><path>` — is projected into the trigger's `<SelectValue />` (MPC:38). One extra live SVG per card that no callsite enumeration predicts, and that no `NATIVE_TEMPLATE_LOOP` row would attribute to this loop.

**Carry for F.W4.** Extend R6-5's `NATIVE_TEMPLATE_LOOP` family from "native loop heads" to (i) native subtrees *inside* component loop bodies, and (ii) portal/conditional mount points. Falsifier for the carry: if F.W4's denominator is defined over *rendered DOM* rather than *source callsites*, both extensions are moot — but R5's `leafValues` being keyed by `callsiteId` says it is not.

---

## §5 — Corpus reconciliation

**Folded and confirmed.**
- lane-frontend.md:173 — "`components/morph/MorphPhaseConfig.vue` | 212 | Phase/duration `Select` + `Slider`". Line count exact (`wc -l` = 212).
- lane-frontend.md:280–281 — the two glass-ui import statements at MPC:72 and MPC:73. Exact.
- lane-frontend.md:499 — the uplift edit "9 − `variant="glass-scrubber"` / 9 + `variant="standard"`" is **present in the working tree but uncommitted**: `git diff` on this file shows exactly one hunk, MPC:23 `glass-scrubber → standard`, against `HEAD` (`cd26c65`). My audit reads the working tree, i.e. post-flip.
- lane-frontend.md:565 — MorphPhaseConfig is listed among the tree's SVG surfaces. Confirmed (MPC:47–54); see §6.
- CENSUS-2026-08-03.md:94–96 — the `EasingPicker`/`EasingCurvePreview`/`lib/easings.ts` "fourth fork". Confirmed and **extended**: MPC:46–56 is a fifth, inline instance (D3b).
- CENSUS row 38 / C-7 "latent, not live" — confirmed by direct inspection of the installed `@mkbabb/value.js@0.13.0` (`exports` = `"."` only; `timingFunctions` present and complete). See D16.
- intake R5-7 / R6-5 — folded in §4, with an explicit non-application.

**CONTRADICTION — lane-frontend.md:382.** The lane writes: *"All 11 `glass-scrubber` and all `glass-track`/`glass-fill`/`glass-thumb` occurrences are **prose comments only** (verified site-by-site: … `MorphPhaseConfig.vue:98,204` …)."* That verdict is **correct about the comments and incomplete about the declarations they head**. MPC:204 is indeed a comment — but MPC:207–210, the four lines it introduces, are live CSS custom properties with **zero consumers in glass-ui 4.0.0**, and they are the sole mechanism by which the `sliderColor` prop (MPC:85) and the parent's three distinct accents (FourierMorphDemo.vue:31/41/51) were meant to reach the paint. The lane's sweep asked "is `glass-scrubber` a live *selector*?" (answer: no, only `GlassTimeline.vue:103`) and did not ask "is `--slider-scrub-*` a live *custom property*?" (answer: no, and 21 declarations across 7 files depend on it — D2). The stale-comment finding should be re-graded from cosmetic to functional, and widened from 11 comment sites to 21 declaration sites.

---

## §6 — The viz render path, and why there is no BLOCKER

**Render path — explicit scope-out with provenance.** CENSUS-2026-08-03.md:85–86 fixes the architecture: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces"*; and CENSUS:96–97 books the canvas convergence risk on `BasisCanvas` + `canvas-drawing/` (1 311 LOC) vs glass-ui's GPU-backed `FourierField`. **MorphPhaseConfig touches none of it.** Its emissions travel: MPC:95 → `FourierMorphDemo.vue:32/42/52` → `morphConfig.config` → `syncWith`'s watcher (useMorphConfig.ts:78–85) → `morph.updateConfig` (useFourierMorph.ts:106) → and are consumed at `morphTo`'s single capture (useFourierMorph.ts:151–160), which drives `currentPoints` → `pointsToSvgPath` (useFourierMorph.ts:81) → `MorphShapePreview.vue:5` → `FourierMorphSvg`. That is one of the 12 SVG surfaces (lane-frontend.md:565 lists this file among them), not a canvas. Manufacturing a canvas/WebGL link here would be a fabricated finding; the one real coupling to the render path is D15, and the one real *cost* on that path is the per-frame `interpolateAtHarmonicLevel` in the tween callbacks — which belongs to `useFourierMorph`'s own challenge, not this one.

**No BLOCKER, argued.** I looked for one and did not find it. Nothing in this component or its imports crashes, corrupts persisted state, or blocks a wave: the two `undefined`-dereference candidates (D5 `arr[0]`, and `presets[name].label` at MPC:55) are both unreachable — the second because `easingNames` is `Object.keys(EASING_PRESETS)` over the very object being indexed (easings.ts:62), so the index can never miss; the "missing easing function" candidate died on measurement (D16); the desync (D1) is user-recoverable by entering an in-range value; the dead retint (D2) degrades paint, not function. Reporting **0 blockers** with three verified MAJORs is the honest read, and I would rather be held to it than inflate the count.

---

## §7 — Candidates checked and cleared (falsifiers that killed my own findings)

Recorded so the next challenger does not re-spend the effort.

1. **`class="duration-slider-track"` colliding with Tailwind's `duration-*` namespace inside glass-ui's `cn()`/tailwind-merge.** Executed against the installed `tailwind-merge`: `twMerge(<slider base> + " duration-200", "duration-slider-track")` → **both survive**; twMerge does not parse `duration-slider-track` as a transition-duration utility. No annihilation now, and none if the Slider recipe later adds `duration-200`. **CLEARED** (naming remains unfortunate; not a defect).
2. **Back-easing overshoot escaping the 40×20 viewBox.** Measured (see D13): the polyline stays inside; only the stroke's outer half is shaved. Downgraded from a MINOR clipping bug to INFO.
3. **`.cartoon-card` (MPC:2) as a dead class.** It is live — resurrected locally as `@utility cartoon-card` at `src/style.css:98–107` (D.W4.a shim after glass-ui removed the recipe at C.W5), 25 sites. **CLEARED.**
4. **`.fira-code` (MPC:17, 19) as an undefined class.** Defined in `@mkbabb/glass-ui/dist/styles/typography.css`, imported via `src/style.css:3` `@import "@mkbabb/glass-ui/styles"`. 49 sites tree-wide. **CLEARED.**
5. **Mid-flight config edits corrupting a running morph.** `morphTo` captures all durations and easings once (useFourierMorph.ts:151–160) — no corruption. Only the readout diverges (D15). **CLEARED as a correctness defect.**
6. **A listener/timer leak in this component.** None exists — see S1. **CLEARED.**

---

## §8 — Superlatives (L-18, both ways)

**S1 · Zero teardown surface — nothing here can leak.** MPC:64–106 contains no lifecycle hook, no `watch`, no timer, no event listener, no template ref, no subscription. The component is a pure prop→emit leaf; every piece of imperative machinery it benefits from lives in the producer and disposes itself — glass-ui's Slider registers `pointerdown`/`touchstart` on the root and `pointerup`/`pointercancel` on `window` in `onMounted` and removes all of them plus releases the dock token in `onBeforeUnmount` (slider-DQ95MET2.js, `useDockHold` + the touch-gate block). *Falsifier:* a leak needs a subscription created in this file; grep finds none, and the one composable in scope that *does* own a timer (`useClipboard`, useMorphConfig.ts:58) is not instantiated here.

**S2 · `durationModel` is the right adapter, not the reflexive one.** MPC:99–102 bridges reka's array model with a **writable `computed`** — get re-derives from `props.duration`, set forwards to the parent. The common alternative (mirror the prop into a local `ref` + a `watch` to resync) manufactures a second source of truth and a write-feedback loop; this file has neither, so the parent stays authoritative and there is no stale local cache. Worth stating precisely because D1 looks superficially like a state-mirroring bug and is not: the desync there comes from the **uncontrolled DOM input**, while the reactive adapter beside it is exactly correct. *Falsifier:* if any local state mirrored `duration`, a parent-side clamp would desync it — no such state exists.

**S3 · Goldilocks module.** 212 lines: 43 of script (64–106), 62 of template, 104 of scoped style; one responsibility (one morph phase's two controls); zero god-module gravity. The parent instantiates it three times (FourierMorphDemo.vue:26, 36, 46) rather than triplicating markup — the extraction earned its keep. Contrast the same tree's `canvas-drawing/` at 1 311 LOC (CENSUS:96).

**S4 · Constants are bound as constants.** MPC:104–105 aliases `EASING_PRESETS`/`EASING_PRESET_NAMES` as plain module-scope `const`s rather than wrapping them in `computed`/`ref` — correct, and a discipline many trees fail. The catalogs are built once at module init (easings.ts:55–62) and never mutated (grep: no writes to `EASING_PRESETS` anywhere in `src`), so reactivity would be pure overhead and a false signal that they can change. *Falsifier:* if any code mutated the catalog at runtime the template would go stale — nothing does.

---

## §9 — Repair order (for the wave that consumes this)

1. **D2** — rename MPC:207 → `--slider-range-bg`, delete MPC:208–210 (no live target), and sweep the other 6 files / 17 declarations as one carry. Cheapest fix, largest visible restoration (phase colour coding returns).
2. **D1 + D11 + D6 + D7 + D3a** — one move: replace MPC:6–32 with `<SliderControl :label="'Duration'" :model-value="duration" :min="…" :max="…" :step="10" :color="sliderColor ?? 'var(--accent-red)'" :format-value="v => v + 'ms'" @update:model-value="…" />`, hoisting `50/800/10` to a shared range constant beside `DEFAULT_MORPH_CONFIG`. Kills the desync, the commit-semantics split, the off-grid writes, the quadruplication and half the duplication at once — but note the chassis inherits D2's dead vars (SliderControl.vue:144–148), so fix (1) first or the regression travels.
3. **D4 + D5** — two guards: `typeof v === "string" && v in presets` at MPC:36; `arr?.[0]` at MPC:101.
4. **D9 + D10** — in `useMorphConfig`: delete `updateField`, return a stop handle from `syncWith`, drop `{ deep: true }`.
5. **D3b + D14** — precompute the 22 curve paths once at module scope in `easings.ts` (or extend `_svgCache` to cover `easingCurvePath`) and widen `EasingCurvePreview`'s prop so MPC:46–56 can consume it; folds into the census's fourth-fork consolidation rather than preceding it.
6. **D13 / D15 / D16 / D12** — book; each is cheap but none is load-bearing, and D12 belongs to the A11Y challenger's ledger.
