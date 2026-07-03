# CRIT — proto-glassui-consume (R.W3 controls-lane pure-consume feasibility)

**Critic pass:** 1 · **Date:** 2026-07-02 · **Target:** `scratchpad/pass1/proto-glassui-consume.md`
**Convergence: 90%** · **Verdict:** Central thesis (pure consume viable, zero interims) is robustly proven — every load-bearing producer claim independently reverified in the live 4.2.0 tree; a handful of precision/citation nits remain before ratifiable.

---

## Method
Independently reverified all four producer primitives against the on-disk glass-ui 4.2.0
source (not just dist), plus the four value.js consume sites. Did NOT trust the doc's cites —
re-grepped each.

## What holds (spot-check results — all CONFIRMED)

| Claim | Verification | Verdict |
|---|---|---|
| `/slider`,`/select`,`/easing` exports present | `glass-ui/package.json` exports map — all three present | ✓ |
| `sliderVariants` CVA `variant: standard\|spectrum`, `size: sm\|md\|lg` | `src/components/ui/slider/index.ts:44-79` | ✓ |
| spectrum track height `= calc(var(--slider-thumb-size)*1.5)`, does NOT read `--slider-track-height` | `Slider.vue:421-422` literal | ✓ |
| `size="md"` → thumb-size 1rem → 1.5rem = 24px = `h-6` | `Slider.vue:207-208` (`--slider-thumb-size:1rem` md) | ✓ |
| thumb-bg default `transparent`; thumb-border default `--background` | `Slider.vue:449-450` | ✓ |
| `SelectTrigger` `size: 'display'\|'audacious'` + `variant:'ghost'`; writes `--dropdown-text`; cures **1.59×** desync | `SelectTrigger.vue:13,36,66-104` (1.59× at :23) | ✓ |
| select.css collision-bound `max-height: min(--select-content-max-h, --reka-popper-available-height)` | `dist/styles/select.css:42-44` (paraphrase drops the nested `var()` fallback but faithful) | ✓ |
| imported via `dist/styles/index.css:203`; demo imports `@mkbabb/glass-ui/styles` at `style.css:52` | both confirmed | ✓ (index.css line is **203**, matches) |
| `dist/easing.js` imports value.js `bezierPresets/CSSCubicBezier/parseSteps/steppedEase/jumpTerms` | `dist/easing.js:6` | ✓ |
| `EasingPicker` preset list `= Object.keys(bezierPresets)` | `useEasingPicker.ts:117` `PRESET_NAMES = Object.keys(bezierPresets)` | ✓ |
| `EasingConfigurator` = "value.js GradientPane consumer shape"; `EasingPickerValue.fn:(t)=>number` callable | `EasingConfigurator.vue:5-6`; `useEasingPicker.ts:41-57,188-191`; `EasingPicker.vue:80` | ✓ |
| ComponentSliders 418 LoC; raw `SliderRoot/Track/Thumb` fork; `pointercancel`/`lostpointercapture` gate | `ComponentSliders.vue` 418 lines; `:59-124`, `:306-307` | ✓ |
| SpectrumCanvas luma→black/white border | `SpectrumCanvas.vue:231-235` | ✓ |

**Factual grounding is excellent.** This is the most thoroughly-verifiable of the pass-1
prototypes; the "shipped in fresh dist" discipline (not just "landed in source") is exactly right
and I could not find a producer claim that failed.

## Precept fidelity — clean
- Argues AGAINST interims on no-legacy grounds (correct; §2.4 mirror).
- KISS-correct: recommends accept `size="md"` geometry, do NOT file the spectrum track-height relay ask.
- Design-system-first: consumes glass-ui variants, deletes demo forks; the two OPTIONAL relay asks
  are correctly gated ("default is consume as-is") and route producer work to glass-ui, not demo/ui.
- Correctly identifies the ComponentSliders 418-LoC breach self-resolving via consume (~250 LoC
  internalized by `glass-ui/slider`'s `useTouchGate`/`useDockHold`). No over-scoping into src/glass-ui.

## mustFix (precision/completeness — none blocks the verdict)

1. **Easing catalogue count is wrong: 24, not 23.** `GRADIENT_EASING_NAMES`
   (`useGradientModel.ts:57-82`) has **24** entries. The doc says "23 value.js `timingFunctions`."

2. **Row-4 drop enumeration is loose + undercounts.** The doc frames the non-consumable drop as "the
   `ease-in-sine`-family named entries." The real drop is **13 of 24** named easings not representable
   as cubic-bezier/steps presets: sine×3, circ×3, expo×3, back×3, **plus `smooth-step-3`** (a
   smoothstep polynomial the doc omits entirely — it strengthens the point but is missing from the
   "transcendental" framing). Quantify: "13 non-bezier named easings drop" — this is the load-bearing
   zero-drop ratification item and deserves a precise number, not "the family."

3. **`ColorSpaceSelector.vue:17` cite is off-by-one AND the ghost recommendation is already-done.**
   Line 17 is `variant="ghost"` (already present!); the font override the doc describes lives at
   `:18-19` (`fontFamily:var(--font-display)` + `text-title sm:text-display`). So (a) fix the cite to
   `:18-19` for the override, and (b) note in the net-rec that `variant="ghost"` is a no-op
   restatement (already shipped on the consume site) — the net-new is only `size="display"/"audacious"`.

4. **`v-model:EasingPickerValue` notation is imprecise.** `EasingPicker.vue:80` is
   `defineModel<EasingPickerValue>()` — a DEFAULT `v-model` binding a value typed `EasingPickerValue`,
   not a NAMED model called `EasingPickerValue`. Write `v-model` (typed `EasingPickerValue`) to avoid
   implying a named-model API that does not exist.

## Should-consider (non-blocking)

5. **5.0.0 subpath-tracking note absent.** Adopting `/easing` adds a net-new subpath dependency that
   R3-GLASSUI GAP-3 (the BH B2 `/api`-fold + subpath regen) must carry into the 5.0.0 by-name
   migration table. The four sites are 4.2.0-safe (slider/select/easing are core UI subpaths unlikely
   to rename), but a one-line "book /easing into the 5.0.0 subpath-rename watch (R3 GAP-3)" closes the
   loop. Low.

6. **Title/scope vs SYNTHESIS split.** The doc is titled "R.W3 controls-lane," but SYNTHESIS §198
   places the `/easing` consume (site 4) + EasingSelector-fork retirement in **R.W4**, with only
   spectrum-slider + Select in R.W3. The net-rec hedges "R.W3/W4," which is consistent, but the
   title over-claims all four for R.W3. Align the title to "R.W3/W4 controls lane" or note the split.

## Staleness — not a concern
Doc is dated today, uses the live `file:../glass-ui`@4.2.0 link, and its four target subpaths
(slider/select/easing) are BG-stable (BG touches aurora-metal/dock/viz-resize/blob — none of the four
consume sites). The 5.0.0 goo-blob→blob rename does not touch these sites. Staleness limited to nit #5.

## Zero-drop — satisfied within lane
The four sites map cleanly to SYNTHESIS §197-198 (U7/U13/U14/U15/U28/U30a/R8-14 → R.W3; U27-consume
→ R.W4). §5 items outside the controls lane (Skeleton glass, breathing default) are legitimately out
of scope. The one genuine drop (13 non-bezier named easings) is surfaced as an open R.W4 ratification
question, not buried — correct handling, just needs the precise count (#2).

## Bottom line
A near-ratifiable, densely-grounded feasibility proof. The verdict needs no change. Land the four
citation/precision fixes (#1-4) and it converges. Held below 95 solely because mustFix is non-empty.
