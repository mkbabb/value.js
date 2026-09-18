claude-opus-5[1m]

# Challenge C · `SpringPhysicsFacet.vue` — the CONSUMPTION axis

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringPhysicsFacet.vue` (242 lines)
**Axis:** C — how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling integration seams.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. keyframes.js + glass-ui are READ-ONLY evidence; the only write in this task is this file.
**Date:** 2026-08-06. keyframes.js `package.json` version 6.0.0; installed `@mkbabb/glass-ui` **7.0.0**; installed `@mkbabb/value.js` **4.0.0**.

**Read whole:** the component + `springKeys.ts`, `springPresets.ts`, `useSpringDemo.ts`, `useSpringHotPath.ts`, `useSpringKeyframesEditor.ts`, `SpringHeatmap.vue`, `SpringScene.vue`, `SpringTarget.vue` (painter block), `KeyframesEditor.vue`, `useKeyframesEditor.ts`, `useKeyframesParsing.ts`, `useKeyframeOps.ts`, `usePainterRegistry.ts`, `demo/styles/design-idioms.css`, `demo/styles/style.css`; on the producer side `glass-ui/src/components/{chip,labeled-field,label,card,toggle-group}`, `glass-ui/src/styles/utilities/btn.css`, and the **installed** `node_modules/@mkbabb/glass-ui/dist/**` (the artifact that actually runs).

---

## 0. Verdict

The facet is **structurally excellent on the keyframes.js/value.js axis and structurally broken on the glass-ui axis.**

Its consumption of the engine is the best in the spring scene: the minimal value.js subpath, a correctly-released painter registration, a compositor-only 60 Hz path that never touches the render graph, and a sibling prop (`:framed="false"`) used instead of a CSS override. The R1 parser-crash class is **not** reachable through it.

Its consumption of glass-ui is a different component. **Six of the attributes it hands to glass-ui do nothing at all** — four phantom props on two `LabeledSlider`s, two applications of a phantom utility class — and none of the six can be caught by any gate this repo runs, because the repo has no SFC type-checker. On top of that, the one genuinely single-select surface in the scene is assembled from four independent toggles, and the component fights the `Chip` variant it asked for with two `!important`s and a reach into reka's generated `data-state`.

**DEFECTS: 14** — 1 BLOCKER · 5 MAJOR · 5 MINOR · 3 INFO. **SUPERLATIVES: 4.**

| id | severity | one line |
|---|---|---|
| C-B1 | **BLOCKER** | The facet's three glass-ui specifiers resolve only by accident of the present `node_modules`; `npm ci` cannot build this file (folds **F-1**). |
| C-M1 | **MAJOR** | `tooltip=` ×2 is a phantom prop — glass-ui's labeled-field contract *explicitly refuses* a tooltip trigger. Both explanations of the physics never render. |
| C-M2 | **MAJOR** | `label-class=` ×2 is a phantom prop; the two slider labels render at `--foreground` while the facet's own two sibling section labels render at `--muted-foreground`. |
| C-M3 | **MAJOR** | `btn-interactive` ×2 is a **phantom class** — absent from glass-ui 7.0.0's shipped CSS, while glass-ui's own retired-classes registry asserts it live. |
| C-M4 | **MAJOR** | The preset balls hard-clamp to 1.0 and clip the overshoot the *same component's* heatmap exists to visualise; sibling `SpringTarget` deliberately clamps to **1.18** off the same array. |
| C-M5 | **MAJOR** | A single-select preset picker built from four independent `mode="selectable"` Chips; glass-ui ships `/toggle-group` (single mode) and the demo already consumes it. |
| C-m1 | MINOR | Two `!important`s + a `[data-state="on"]` reach-around, with `Chip`'s declared `tone`/`surface` props unused. |
| C-m2 | MINOR | Hand-rolled `<button>` re-sample control (the S-7 shadow class) one DOM level above the real S-7 `CopyButton`. |
| C-m3 | MINOR | God-prop: `demo: SpringDemoContext` = the anonymous `ReturnType<typeof useSpringDemo>` (~30 members); 7 are used; zero emits. |
| C-m4 | MINOR | Seam split: the scene `provide`s `SPRING_DEMO_KEY`, two siblings `inject` it, this facet prop-drills it and re-drills to `SpringHeatmap`. |
| C-m5 | MINOR | `demo.seedKeyframes()` is the one parse call in the facet's reach with no error boundary. |
| C-i1 | INFO | No `vue-tsc` anywhere in the repo — SFC templates are unchecked, which is *why* C-M1/C-M2 exist. |
| C-i2 | INFO | `const demo = props.demo` freezes the prop; inert at the present call site. |
| C-i3 | INFO | A `26rem` cap imposed on a sibling from outside, via CSS, on a component with no height contract. |

---

## 1. What the facet actually imports

```
SpringPhysicsFacet.vue:127-139
  vue                                    ComponentPublicInstance, onMounted, onScopeDispose
  @mkbabb/glass-ui                       Card, CardContent          ← root barrel
  @mkbabb/glass-ui/labeled-field         LabeledSlider              ← subpath
  @mkbabb/glass-ui/chip                  Chip                       ← subpath
  @lucide/vue                            RefreshCw
  @mkbabb/value.js/math                  clamp                      ← subpath
  @components/instrument/keyframes/KeyframesEditor.vue
  ./SpringHeatmap.vue
  ./springKeys        (type SpringDemoContext)
  ./useSpringDemo     (type SpringPreset, SpringTrack)
```

Note what is **absent**: no `@mkbabb/keyframes.js` import, no `@kf-engine`. The facet touches the engine only through the `demo` context object and through `KeyframesEditor`. That is the correct altitude for a panel — flagged here so §4's superlatives are read as *choices*, not as *absences*.

---

## 2. BLOCKER

### C-B1 — the facet's glass-ui imports are unresolvable from a clean checkout (BLOCKER, folds **F-1**)

**Claim.** `SpringPhysicsFacet.vue:129-131` imports from three `@mkbabb/glass-ui` specifiers. `@mkbabb/glass-ui` appears in **neither** `package.json` nor `package-lock.json`; only `node_modules/@mkbabb/glass-ui/package.json` (`"version": "7.0.0"`) exists. `npm ci` reconstructs `node_modules` strictly from the lockfile; with zero glass-ui entries there, this file fails at its first import and the `spring` scene cannot build.

**Provenance.**
- `keyframes.js/package.json:68-70` — the only `@mkbabb` dependency is `"@mkbabb/value.js": "4.0.0"`.
- `SpringPhysicsFacet.vue:129,130,131`.
- Installed artifact: `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`, with peers `@mkbabb/keyframes.js ^6.0.0`, `@mkbabb/value.js ^4.0.0`, `reka-ui ^2.0`, `vue ^3.5`.
- Lane corpus: **lane-frontend.md F-1** ("phantom dependency", RED) — this finding is that census row *as experienced by this component*, not a new discovery.

**Why it belongs on the C axis and not only in the census.** F-1 is a repo fact; C-B1 is the statement that this component is one of the 42 files that eat it, and that every other glass-ui finding below (C-M1/M2/M3/M5, C-m1) is a claim about *an unpinned, unlocked, floating substrate*. There is no version floor and no ceiling: the facet's props were evidently written against an older glass-ui (its own comment at `:117` cites "the glass-ui 4.0.0 single-surface contract") and are being executed against 7.0.0.

**Falsifier.** A `@mkbabb/glass-ui` entry in `package.json`/`package-lock.json`, a workspace/`file:` link, or a `.npmrc`/`overrides` mechanism that installs it — any of these kills this. I grepped: `grep -c "glass-ui" package-lock.json` → 0; `.gitmodules` declares only `docs/precepts`; `ls -ld node_modules/@mkbabb/glass-ui` is a real directory, not a symlink.

---

## 3. MAJOR

### C-M1 — `tooltip=` is a phantom prop; glass-ui *explicitly refuses* it (MAJOR)

**Claim.** Both `LabeledSlider`s pass a `tooltip` attribute:

```
SpringPhysicsFacet.vue:31   tooltip="Spring response time (s) — higher = slower"
SpringPhysicsFacet.vue:41   tooltip="Damping fraction (ζ) — <1 overshoots, ≥1 settles"
```

`LabeledSlider` has no `tooltip` prop. The attribute falls through to `LabeledField`'s root `<div class="labeled-field">` as a non-standard HTML attribute and renders nothing. **The only text in the entire facet that explains what ζ is never reaches a user.** "damping (ζ)" beside a bare track is the whole affordance.

**Provenance (three independent confirmations).**
1. **Installed dist (authoritative — this is what runs).** `node_modules/@mkbabb/glass-ui/dist/labeled-field.js`: `grep -c tooltip` → **0**. The compiled `LabeledSlider` props object enumerates exactly: `variant, size, marks, invalid, keepDockOpen, motion, defaultValue, disabled, orientation, dir, inverted, min, max, step, minStepsBetweenThumbs, thumbAlignment, asChild, as, name, required, label, description, requirement, layout, errorLive, modelValue`.
2. **Installed types.** `dist/components/labeled-field/types.d.ts` — `LabeledSliderProps = Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: number }`; `LabeledFieldCommonProps = { label, description?, requirement?, layout?, errorLive? }`; `SliderProps extends SliderRootProps` (reka) `+ {class, variant, size, marks, invalid, keepDockOpen, motion}`. No `tooltip` on any branch.
3. **The producer's written contract.** `glass-ui/src/components/labeled-field/README.md:27-29`: *"No mode adds a divider, control paint, hidden label, **tooltip trigger**, or trailing action."* This is not an oversight in glass-ui; it is a documented refusal, and the facet is arguing with it by attribute.

**The contract does supply the affordance the facet wants.** `description?: string` is the sanctioned slot for exactly this copy, and it is rendered (`LabeledField.vue:47-49`: `<p v-if="description" :id="descriptionId" class="labeled-field-description">`) *and* wired into `aria-describedby` (`:26-29`). So the fix is a one-word rename per site, and it upgrades the affordance from hover-only to always-visible + screen-reader-announced.

**Scope note (not this component's defect, but it establishes the class).** The same phantom appears at `EasingSidebar.vue:59` and `LayerConfigPanel.vue:52`, and `LayerConfigPanel.vue:63-65` carries a fourth phantom (`LabeledSwitch :checked` / `@update:checked` — `LabeledSwitch` takes `modelValue`). See C-i1 for why none of these are caught.

**Falsifier.** Any of: a `tooltip` prop in glass-ui 7.0.0's labeled-field surface; a global Vue directive or plugin in the demo that reads a `tooltip` attribute and mounts a tooltip; a `TooltipProvider` behaviour that scans `[tooltip]` in the DOM. I checked all three — `grep -rn "\.directive(\|app.directive" demo/` → no output; no `getAttribute("tooltip")` / `[tooltip]` selector anywhere in glass-ui `src/`.

### C-M2 — `label-class=` is a phantom prop, and its absence is visible (MAJOR)

**Claim.**

```
SpringPhysicsFacet.vue:30,40   label-class="text-small font-medium text-muted-foreground"
```

`LabeledSlider` has no `labelClass` prop (same enumeration as C-M1) and `LabeledField` forwards no class to its `Label`. The string is inert; it lands as a bogus `label-class` DOM attribute.

**The visible consequence is derivable statically.** glass-ui's `Label` root paints (`glass-ui/src/components/label/Label.vue:64-69`):

```css
.glass-label { color: var(--foreground); font-size: var(--type-small); font-weight: 500; ... }
```

Of the three intended utilities, `text-small` and `font-medium` are already what `.glass-label` gives. **`text-muted-foreground` is the one that differs** — `var(--muted-foreground)` vs `var(--foreground)`. So inside this single Card, four labels are authored in one register and two of them silently opt out:

| element | file:line | resolved label colour |
|---|---|---|
| "response" | `SpringPhysicsFacet.vue:29-30` | `--foreground` (intended `--muted-foreground`) |
| "damping (ζ)" | `SpringPhysicsFacet.vue:39-40` | `--foreground` (intended `--muted-foreground`) |
| "parameter space — overshoot" | `SpringHeatmap.vue:16` | `--muted-foreground` ✓ (plain `<span>`, class applies) |
| "@keyframes (editable)" | `SpringPhysicsFacet.vue:102` | `--muted-foreground` ✓ (plain `<span>`, class applies) |

The two labels routed *through the design system* are the two that miss the register; the two hand-rolled `<span>`s hit it. That inversion is the finding.

**Secondary observation (reasoning, not a claim).** Even if `labelClass` existed, a utility would likely lose: `.glass-label`'s colour rule is authored in a `<style scoped>` block (specificity `.glass-label[data-v-…]` = 0,2,0, unlayered), whereas Tailwind v4 emits `text-muted-foreground` into `@layer utilities` (layered loses to unlayered). The sanctioned lever is therefore a glass-ui token/variant, not a class prop — which is presumably why the producer never shipped one.

**What the facet's own comment claims.** `:23-25` — *"the UNIFORM label-column grammar (the cube's bar). The two sliders join ONE `.labeled-field-grid` so their labels ... resolve the SAME width (U5)."* **That part is true and unaffected**: the shared label-column width comes from `design-idioms.css:255-273` (`grid-template-columns: [label] auto [value] 1fr` + `.labeled-field-grid > .labeled-field { grid-template-columns: subgrid }`), which needs no prop and works because glass-ui's `.labeled-field` has exactly the two children the subgrid expects. I explicitly do **not** claim the grid is broken. Only `label-class` is inert.

**Falsifier.** A `labelClass`/`label-class` prop anywhere in glass-ui 7.0.0's labeled-field or label surface (`grep -rn "labelClass\|label-class" glass-ui/src/components/labeled-field/` → no output; zero occurrences in the installed `dist/labeled-field.js`), or a `--muted-foreground`-valued `.glass-label` in some later cascade rung.

### C-M3 — `btn-interactive` is a phantom class, twice (MAJOR)

**Claim.** The facet applies `btn-interactive` at two sites:

```
SpringPhysicsFacet.vue:74    class="preset-cell rounded-pill … btn-interactive"     (all four preset Chips)
SpringPhysicsFacet.vue:105   class="reseed-btn btn-interactive shrink-0 …"          (the re-sample button)
```

**There is no `.btn-interactive` rule in glass-ui 7.0.0, and none in the demo.** Every interactive affordance it was meant to carry — the press/hover register — is absent from both of the facet's own buttons.

**Provenance (exhaustive, both trees).**
- Producer source: `glass-ui/src/styles/utilities/btn.css` `@utility` list is exactly `scale-on-hover, transition-control, transition-disclosure, sheet-animate, table-cell, table-head, rainbow-vivid, rainbow-pastel`. `grep -n "btn-interactive" src/styles/utilities/btn.css` → no output; `find src -name "*.css" | xargs grep -ln btn-interactive` → no output.
- Installed artifact: `find node_modules/@mkbabb/glass-ui/dist -name "*.css" | xargs grep -ln btn-interactive` → **no output** (all 30+ dist CSS files).
- Consumer: `grep -rl btn-interactive demo/ --include="*.css"` → no output. `demo/styles/style.css:1-16` imports `tailwindcss`, `tw-animate-css`, `@mkbabb/glass-ui/styles`, `@mkbabb/glass-ui/styles/fonts`, `./design-idioms.css`, `./layout.css` — the class is in none of them. It is not a Tailwind-shaped name, so no utility is generated for it.
- **The substrate's own registry disagrees with the substrate.** `glass-ui/.claude/worktrees/bi-p4b-glass/.retired-classes.txt:18` — *"# NOT retired (do not add): `rainbow-vivid`, `rainbow-pastel`, `btn-interactive`"*. The guard file that exists to stop exactly this asserts the class is live; the shipped CSS says otherwise. `rainbow-vivid` and `rainbow-pastel` **did** survive (both present in `dist/styles/utilities/btn.css`); `btn-interactive` did not.
- **This is a named, catalogued regression class in the repo's own precepts.** `keyframes.js/docs/precepts/instructions/LESSONS-LEARNED.md:603` (2026-05-18, "Cleanup Commit Deletes Load-Bearing Artefact", Q-chron-4): *"substrate `b0debec` (D.W2.D 'delete zero-site orphans' — retired `.rainbow-vivid` + `.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict; keyframes.js consumed `.rainbow-*`)"*, with invariant 33 and `scripts/proof-phantom-classes.mjs` as the mechanical gate. glass-ui `CHANGELOG.md:686` records the recovery REVERT that re-promoted all three. Between that revert and 7.0.0 the recovery was lost for one of the three — and keyframes.js runs no phantom-class proof (`package.json:50-51` has `proof:publish` and `proof:owner-golden`, nothing else).

**Blast radius beyond this component (8 sites, 6 files):** `CubeScene.vue:188,193`, `SequenceTarget.vue:31`, `SpringPhysicsFacet.vue:74,105`, `SpringScene.vue:167`, `RibbonBar.vue:135`, `PlaybackRibbon.vue:55`. The facet holds 2 of the 8.

**Note on the sibling that got it right.** `KeyframesEditor.vue:83,91` uses `scale-on-hover` — which *does* exist in `btn.css`. So within this facet's own subtree, the mounted child uses the live utility and the facet uses the dead one.

**Falsifier.** A `.btn-interactive` rule or `@utility btn-interactive` in any CSS the demo's cascade actually loads — glass-ui's shipped `dist/styles/**`, `dist/glass-ui.css`, `demo/styles/*.css`, or any `<style>` block. I searched all of them.

### C-M4 — the facet clips the overshoot its own heatmap exists to show (MAJOR)

**Claim.** The preset-ball painter hard-clamps to `[0, 1]`:

```
SpringPhysicsFacet.vue:159
  if (el) el.style.transform = `translateX(${clamp(values[i] ?? 0, 0, 1) * 100}cqw)`;
```

`values` is `demo.springLive.trackValues` — raw `SpringProgress.value` per preset (`useSpringDemo.ts:223`; `SpringProgress` `get value()` returns `this.currentValue` unclamped, `src/animation/physics/spring/progress.ts:187-189`). Underdamped presets overshoot past 1, so the ball **flatlines at the right rail for the entire excursion** — precisely the interval that distinguishes the presets from each other.

Using the closed-form peak this component itself declares EXACT (`SpringHeatmap.vue:85-104`, `overshoot(ζ) = exp(-ζπ/√(1-ζ²))`, asserted "under 1% vs the live 60 Hz peak" at `:10`):

| preset | ζ | peak value | clipped |
|---|---|---|---|
| bouncy | 0.45 | **1.205** | 20.5 % of travel, invisible |
| snappy | 0.65 | 1.068 | 6.8 %, invisible |
| smooth | 0.86 | 1.005 | 0.5 % |
| gentle | 1.00 | 1.000 | — |

`springPresets.ts:33` describes `bouncy` as *"pronounced overshoot, playful ring"*. Its chip's ball cannot express it.

**This is a sibling inconsistency, not a house rule.** `SpringTarget.vue` paints from the *same* `springLive.trackValues` array and deliberately does not:

```
SpringTarget.vue:207   liveBallEl … `translateX(${live.value * 100}cqw)`          ← NO clamp at all
SpringTarget.vue:210   samplerBallEl … clamp(live.sampled, 0, 1)                 ← clamped (sampler, correct)
SpringTarget.vue:222   const v = clamp(trackValues[i] ?? 0, 0, 1.18);            ← RELAXED, on purpose
```

with the rationale written out at `SpringTarget.vue:213-221`: *"the live lanes remain relaxed so the bouncy lane visibly rings PAST the target line — **the overshoot is the point**. … Allow a small overshoot beyond 100% so the ring is seen; cap so the ball can't leave the lane entirely."* Note further that `1.18` is itself below `bouncy`'s 1.205 — the sibling's headroom is tight, the facet's is zero.

**And the facet contradicts itself in one screen.** `SpringHeatmap`, rendered at `:58` inside this same Card, colours a 20×20 field by exactly `exp(-ζπ/√(1-ζ²))` — the overshoot amplitude — while the four chips directly beneath it render every overshoot as the same flat pin at the rail.

**Containment is a real constraint; the number is the defect.** `.preset-track` is `h-2` and `.preset-ball` is `--ball-size: 0.85rem` (`:192-198`), so unbounded travel would push the ball out of a 2-column grid cell. The correct value is a headroom cap (the sibling's `1.18`, or `1.25` to seat `bouncy`), not `1.0`. `.preset-track`'s `container-type: inline-size` (`:189-191`) applies `contain: layout style inline-size` — **not** paint containment — so nothing clips the ball at the track level; the clamp is the only limiter.

**Falsifier.** Any of: `SpringProgress` clamping `value` to the target (it does not — `progress.ts:187`); `SpringTarget` also clamping at 1.0 (it does not — `:222`); a `Chip`/`glass-chip` rule with `overflow: hidden` that would clip a relaxed ball anyway. On the last: `glass-ui/src/styles/glass/glass-chip.css` sets only `border-radius` for `--cell` (`:59-62`) — but whether the composed capsule clips in the live cascade is **UNPROVEN-NEEDS-LIVE** and belongs to the SS-13 visual audit. That uncertainty affects the *fix*, not the finding: at `clamp(…, 0, 1)` there is nothing to clip.

### C-M5 — four independent toggles standing in for one single-select group (MAJOR)

**Claim.** `SpringPhysicsFacet.vue:66-88` renders four `Chip mode="selectable"`. `Chip.vue:80-91` (glass-ui source) resolves `mode="selectable"` to a reka `<Toggle>` — an independent two-state button emitting `aria-pressed` + `data-state`. The four are wired to behave as a radio group only by convention:

- `:model-value="isActivePreset(t)"` (`:72`) is derived from the live params (`:165-167`), so at most one can read `on`;
- `@update:model-value="applyPreset(t.preset)"` (`:75`) **discards the emitted boolean** and writes the params instead.

Consequences that a real group would not have:
1. **Assistive tech hears four unrelated toggle buttons**, each announcing pressed/not-pressed, with no group relationship. `.preset-grid` (`:66`) carries no `role="group"`/`role="radiogroup"` and no accessible name.
2. **Deselection is silently impossible** — pressing the active chip emits `false`, the handler ignores it and re-applies identical params, `isActivePreset` stays `true`. The control lies about being a toggle.
3. **No roving tabindex** — four separate tab stops where a group would be one.

**glass-ui ships the primitive, and the demo already uses it.** `@mkbabb/glass-ui/toggle-group` is one of the 73 exports (lane-frontend §3.1 counts 1 consumption of `/toggle-group`, at `EasingTarget.vue:139`). The installed declaration `dist/components/toggle-group/ToggleGroup.vue.d.ts` extends reka's `ToggleGroupRootProps` — which carries `type: "single" | "multiple"` and `rovingFocus` — and glass-ui's own `_shared/selection.ts:15` defines `SelectionMode = "single" | "multiple"`. Single mode gives mutual exclusion, `role="group"`, and roving focus for free, which is item 1–3 above.

**Corpus reconciliation.** This is a *new* shadow of the S-1..S-8 kind that lane-frontend's census did not enumerate: not a hand-rolled component (there is no `PresetGroup.vue`), but a **hand-rolled composition** — the primitive is present and correctly imported, and the *grouping semantics* are reimplemented in the consumer. I flag the census shape explicitly: S-1..S-8 caught forked components; it did not scan for forked component *relationships*.

**Falsifier.** A `role`/`aria` treatment on `.preset-grid` I missed (there is none — `:66` is `class="preset-grid grid grid-cols-2 gap-2"`, and `Chip.vue:31-35` explicitly *filters* `role|aria-pressed|data-state|name|required` out of fallthrough attrs, so the consumer cannot add them by attribute either); or a glass-ui `ToggleGroup` that cannot express this cell geometry (`ToggleGroupItem` + the same `class` string is the obvious port, but whether it lands pixel-identical is **UNPROVEN-NEEDS-LIVE**).

---

## 4. MINOR

### C-m1 — reaching around the Chip variant API (MINOR)

`ChipProps` declares `tone?: string` and `surface?: Surface` (`dist/components/chip/types.d.ts`) — the sanctioned levers for a chip's paint; `Chip.vue:59-71` turns `tone` into `--glass-fill-tint`/`--glass-fill-strength` + `data-surface`. **Neither is used.** Instead:

```
SpringPhysicsFacet.vue:74     class="… border-none bg-background px-3 pt-1.5 pb-2 h-auto items-start gap-1 font-medium leading-normal …"
SpringPhysicsFacet.vue:217    background: color-mix(…) !important;   /* :hover */
SpringPhysicsFacet.vue:221    background: color-mix(…) !important;   /* [data-state="on"] */
```

`shape="cell"` supplies `glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro` and `size` defaults to `md` (`chipVariants.d.ts`); the class string overrides the padding, the radius, the border, the surface, the alignment and the type scale — i.e. every axis the variant was asked for except `flex-col`. The two `!important`s are the tell that the class-prop route already lost to glass-chip's own cascade.

`.preset-cell[data-state="on"]` (`:220`) targets **reka's** generated attribute through glass-ui — the same "styling reka's generated DOM directly" soft coupling lane-frontend §3.4 flagged for `tab-idiom.css`/`playback-idiom.css`, appearing here inside a scoped block. It is not an import-boundary breach and it does currently match (Vue applies the parent scope-id to a child component's root, and `Chip.vue:81-91` puts `chipClass` on the `<Toggle>` root that carries `data-state`) — the fragility is that it is a contract nobody promised.

**Falsifier.** A demonstration that `tone`/`surface` cannot express the dashed motion-accent treatment at `:209-223` — plausible for the *dashed outline* specifically, but not for the two background `color-mix`es, which is what the `!important`s are spent on.

### C-m2 — a hand-rolled `<button>` sitting on top of the real S-7 shadow (MINOR)

`SpringPhysicsFacet.vue:103-111` is a bare `<button>` with an 11-utility class string reimplementing a small icon+label button, when the root barrel it already imports from exports `Button`. It sits one DOM level above `KeyframesEditor.vue:82-85`'s `CopyButton` — which lane-frontend catalogues as **S-7** (`CopyButton` → `Button` + `Tooltip`, 113 lines, AMBER). So the facet's own subtree contains both the census's S-7 shadow *and* a fresh instance of the same pattern. It also carries the dead `btn-interactive` (C-M3), i.e. this button has no press affordance at all.

**Falsifier.** A `Button` variant that cannot produce a borderless muted 20px-tall inline control — worth checking against `dist/components/button` before porting; if true, this drops to INFO.

### C-m3 — the god-prop (MINOR)

```
SpringPhysicsFacet.vue:141   const props = defineProps<{ demo: SpringDemoContext }>();
springKeys.ts:4              export type SpringDemoContext = ReturnType<typeof useSpringDemo>;
```

`useSpringDemo` returns ~30 members (`useSpringDemo.ts:433-498`). The facet reads **seven**: `response`, `dampingFraction`, `tracks`, `registerSpringPainter`, `springLive`, `springEditAnim`, `seedKeyframes`. It declares **zero emits**.

Two contract costs, both structural: (a) the prop type is an *anonymous structural* alias over an inferred return, so any change to `useSpringDemo`'s return silently re-types every consumer's prop with no declaration site to review; (b) the facet has write access to the entire scene — `play`, `pause`, `reset`, `derby`, `scrubTo`, `scenePlayback` — with nothing narrowing it. A named interface listing the seven (or a `Pick<SpringDemoContext, …>`) costs one line and makes the seam auditable.

**Falsifier.** If the facet is expected to grow into the scene's full control panel, the wide prop is forward-looking rather than loose. Against that: `SpringScene.vue:32` already `provide`s the same object (see C-m4), so breadth is available without the prop at all.

### C-m4 — two seams for one context (MINOR)

```
SpringScene.vue:32           provide(SPRING_DEMO_KEY, demo);
SpringTarget.vue:169         const demo = inject(SPRING_DEMO_KEY)!;
StartingStyleTarget.vue:96   const demo = inject(SPRING_DEMO_KEY)!;
SpringScene.vue:67           const tabsContent = () => h(SpringPhysicsFacet, { demo });   ← prop
SpringPhysicsFacet.vue:58    <SpringHeatmap :demo="demo" />                               ← re-drilled
```

`springKeys.ts:9-10` exists to be the one seam. Two of the three scene children use it; this facet prop-drills the identical object and then drills it a second level into `SpringHeatmap`. Neither seam is wrong; having both, for one object, in one scene, is.

**Falsifier.** A mount path where the facet is rendered outside `SpringScene`'s provide tree — `h(SpringPhysicsFacet, …)` in a render function still resolves the parent chain, so `inject` would work; and the only call site is `SpringScene.vue:67`. If a future host mounts the facet standalone, the prop is the right seam and the *injecting* siblings are the outliers.

### C-m5 — the one unguarded parse call in the facet's reach (MINOR)

`SpringPhysicsFacet.vue:107` — `@click="demo.seedKeyframes()"` — reaches `useSpringKeyframesEditor.ts:71-74`:

```ts
const seedKeyframes = (): void => {
    springEditAnim.fromString(buildSpringKeyframesCSS());
    springEditAnim.parse();
};
```

Synchronous, no `try`, no boundary. Per **lane-library §7.5** the parse seam throws from five different sites with five different postures (`compile/value-ast.ts:73-77` `TypeError`, `compile/selector.ts:27-34` `AnimationOptionError`, `scroll/grammar.ts:57-61` `TypeError`, …), so a throw here is an unhandled rejection in a click handler — no toast, no recovery, a dead button.

**Honest severity.** The input is machine-generated (`useSpringKeyframesEditor.ts:43-55` emits `NN% { transform: translateX(N.NN%); }` from `springTimingFunction`), so a throw requires the sampler to produce a non-finite value. I did not find such a path. This is MINOR because it is a *posture* defect against a boundary the sibling code already establishes — contrast `useKeyframeOps.ts:22-40`, where every user-driven parse in the mounted editor is wrapped in `withErrorToastAsync` with a Retry action.

**Secondary asymmetry** worth a ruling, not a claim: the constructor at `useSpringKeyframesEditor.ts:57-64` calls `.fromString(...)` **without** `.parse()`; `seedKeyframes` calls `.fromString(...)` **then** `.parse()`. One of the two is wrong (either the initial animation is unparsed, or the explicit `parse()` is redundant). Determining which needs the `CSSKeyframesAnimation.fromString` contract; I did not chase it, and it is a library-seam question rather than a facet defect.

**Falsifier.** `fromString`/`parse` proven total for machine-generated `translateX(<pct>)` input, or `springTimingFunction(...).fn(t)` proven finite over ζ ∈ [0.2, 1.5] × response ∈ [0.1, 1.2].

---

## 5. INFO

### C-i1 — nothing in this repo type-checks a template (INFO — the root cause of C-M1/C-M2)

`package.json:37` — `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. Plain `tsc` does not parse `.vue`; `grep -rn "vue-tsc" package.json .github/ Makefile` → **no output**, and `vue-tsc` is not a devDependency. `tsconfig.json:47` includes `demo/`, which type-checks the `.ts` composables and **no SFC template**.

So the four phantom props (C-M1 ×2, C-M2 ×2), the fourth at `LayerConfigPanel.vue:63-65`, and every future one are structurally invisible to `npm run check` and to CI. These are not authoring slips — they are the predicted output of a repo with 58 SFCs and no template checker. Any remediation wave that fixes C-M1/C-M2 without landing `vue-tsc --noEmit` fixes four attributes and leaves the generator running.

### C-i2 — `const demo = props.demo` freezes the prop (INFO)

`SpringPhysicsFacet.vue:142` (and identically `SpringHeatmap.vue:66`) reads the prop once at setup. If the parent ever passed a different `demo` identity, the facet would keep the stale context *and* the painter registered on the old registry. **Inert today**: the sole call site (`SpringScene.vue:67`) closes over a `demo` created once at `:31`, and the scene remounts under a keyed `<Suspense>` rather than swapping props. Filed so a future host does not inherit the assumption silently.

**Falsifier.** Any call site passing a non-stable `demo`. There is exactly one call site.

### C-i3 — geometry imposed on a sibling from outside (INFO)

```
SpringPhysicsFacet.vue:113-120   <div class="keyframes-editor-scroll"> <KeyframesEditor … /> </div>
SpringPhysicsFacet.vue:233-238   .keyframes-editor-scroll { max-height: 26rem; overflow-y: auto; container-type: inline-size; }
```

`KeyframesEditor` accepts `framed` and nothing else about size; the facet caps it via an ancestor. That is a legitimate KISS choice and the comment at `:225-229` argues it well — but note the cap is now a fact two components must agree on with no contract between them (the editor's own `sticky bottom-0` footer at `KeyframesEditor.vue:35` depends on the ancestor being the scrollport). Also: `overflow-y: auto` with `overflow-x` left at `visible` computes `overflow-x: auto` per spec, so the band scrolls horizontally too — while the parent `Card` is explicitly `overflow-visible` (`:21`).

**Falsifier.** A height/`maxHeight` prop on `KeyframesEditor` (there is none — `:132-139` declares `animation` and `framed` only).

---

## 6. SUPERLATIVES (L-18 both ways)

### S★1 — the value.js subpath is the minimal correct one

`SpringPhysicsFacet.vue:133` — `import { clamp } from "@mkbabb/value.js/math"`. The installed `dist/subpaths/math.js` is **nine pure numeric functions** (`clamp, scale, lerp, lerpArray, logerp, deCasteljau, cubicBezier, interpBezier, cubicBezierToString`), ~40 lines, with **zero** imports — no color graph, no parser, no `Result` machinery. The facet's entire value.js exposure is that chunk.

Part of this is forced (value.js 4.0.0's exports map has **no `"."` entry** — only `./color ./value ./css ./easing ./math ./transform ./quantize` — so a barrel import is impossible) and part is chosen: `/value` and `/css` were equally reachable and would have dragged the parse surface in. Consistent with lane-library **LEG-3** (`internal/leaves.ts:28` re-exports `clamp, scale, lerp, lerpArray` from `@mkbabb/value.js/math` as the library's own leaf tier) — the facet consumes the same leaf the engine does, from the same subpath, rather than re-deriving it.

**Falsifier (L-18 runs both ways).** If `dist/subpaths/math.js` pulled in `anchors-*.js`/`operations-*.js` (the two shared chunks the color/css subpaths use), this praise collapses. It imports nothing.

### S★2 — the R1 crash class is not reachable through this facet

The facet mounts the one component in its subtree that touches value.js's parser (`KeyframesEditor.vue:119`), and every user-reachable parse path through it is guarded:

- `KeyframesEditor.vue:186-204` — the per-stop offset field uses **Result-typed** `parseCssScalar` from `@mkbabb/value.js/css`, checks `parsed.ok`, and renders `issue.code`/`issue.start`/`issue.end`/`issue.expected` as a toast. No throw path.
- `useKeyframeOps.ts:22-40` — `withErrorToastAsync` wraps **every** string→animation op: `updateAnimationFromKeyframesString`, `updateAnimationFromKeyframeString` (the per-card CSS edit the facet's editor exposes), `addKeyframesStringToAnimation`. Each catches, toasts with a 10 s **Retry action**, and re-logs. So a user typing `color: oklch()` into a spring keyframe card lands a toast, not the R1 crash.

Set against lane-library **§4.6**, which names `demo/scenes/square/useSquareTumble.ts:22` `parseCssColor(css)` as *"the known R1 crash surface"*, and **§7.5**, which finds five inconsistent failure postures on the seam: this facet's subtree is on the *correct* side of both. The single exception is C-m5 — the facet's own `seedKeyframes()` — which is machine-fed, not user-fed.

**Falsifier.** A user-reachable value.js parse in the facet's subtree outside `withErrorToastAsync` — I traced `KeyframesEditor.vue` → `useKeyframesEditor` → `useKeyframesParsing` → `useKeyframeOps` whole; the only such call is C-m5.

### S★3 — `:framed="false"` is a contract used, not a contract overridden

`SpringPhysicsFacet.vue:119` solves card-in-card by passing the sibling's **declared prop** (`KeyframesEditor.vue:132-139`), which drops the inner `Card` at the source (`:10` vs `:23`) rather than neutering it with `:deep()` or a `.card { border: none }` override. The facet is the **only** consumer of `framed` in the tree (`grep -rn framed demo/` → 2 files), and the prop exists because of this call site — i.e. the seam was negotiated into the producer instead of forced from the consumer. This is the exact opposite of the C-m1 pattern in the same file, which is why both are worth naming.

**Falsifier.** If `framed` had been added *only* for this call site and is dead weight for every other consumer, it is a private hack wearing a prop's clothes. It is not: `:framed` defaults to `true` and the standalone authoring surface (the cube scene's pane) uses the default.

### S★4 — the painter seam is consumed exactly as specified

`SpringPhysicsFacet.vue:150-163`:

- `demo.registerSpringPainter(...)` returns an unregister closure (`usePainterRegistry.ts:9-13` — `painters.add(paint); paint(...currentArgs()); return () => painters.delete(paint)`), and the facet **captures and releases it** on `onScopeDispose` (`:163`). No leak across scene swaps. The eager first `paint(...)` also means the balls are seated at mount without a frame of flicker.
- The painter reads the **non-reactive** `springLive` snapshot (`useSpringHotPath.ts:87-95`) and writes only `el.style.transform`. Zero reactive writes on the 60 Hz path — the J.W2/DS-3 discipline, honoured rather than narrated.
- `transform: translateX(<n>cqw)` against `.preset-track { container-type: inline-size }` (`:189-191`) keeps the value axis rail-relative with **no per-frame width read and no layout**, and `container-type: inline-size` is `contain: layout style inline-size` — no paint containment, so nothing is clipped by the mechanism itself.

**Falsifier.** If `registerPainter` returned `void`, `unregisterPainter?.()` would be a silent no-op and each remount would leak a painter holding stale element references — that would be a BLOCKER, not a superlative. It returns the closure (`usePainterRegistry.ts:12`). Separately, if `.preset-track` lost `container-type`, `cqw` would resolve against the next container up and every ball would fly off; the pairing at `:159` ↔ `:189-191` is load-bearing and correct.

---

## 7. Corpus reconciliation

| lane id | this challenge |
|---|---|
| **F-1** (phantom dep, RED) | **Folded as C-B1.** Not re-derived; stated as this component's exposure (3 specifiers at `:129-131`). |
| **S-7** (`CopyButton` → `Button`+`Tooltip`, AMBER) | **Cited in C-m2.** The facet mounts the S-7 shadow *and* adds a fresh instance of the same pattern at `:103-111`. |
| **S-1/S-2** (`KfPillTabs` fork; stale `SegmentedTabs` prose) | **Confirmed, no contradiction.** `SpringPhysicsFacet.vue:7` is prose-only ("the KfPillTabs strip is gone" — spring site only), exactly as lane-frontend:304 records. No `KfPillTabs` import here. |
| lane-frontend row `242 · spring/SpringPhysicsFacet.vue — Card*, LabeledSlider, Chip` | **Confirmed complete.** Plus the un-rowed `@mkbabb/value.js/math` and `@lucide/vue` edges. |
| lane-frontend **§3.4** (CSS reach-around reka's DOM) | **Extended.** The census listed `tab-idiom.css`/`playback-idiom.css`; add `SpringPhysicsFacet.vue:220` `[data-state="on"]` inside a scoped block (C-m1). |
| lane-frontend **§5 / S-1..S-8 census** | **Contradicted by omission.** The census enumerated forked *components*. C-M5 is a forked *relationship* — the primitive (`Chip`) is imported correctly and the single-select grouping is reimplemented around it. A census keyed on `.vue` files cannot see this shape; the S-series wants a companion scan. |
| lane-library **§4.6** (R1 surface at `useSquareTumble.ts:22`) | **Confirmed and contrasted** — S★2. The R1 class does not reach this facet. |
| lane-library **§7.5** (five failure postures on the parse seam) | **Cited in C-m5** as the reason an unguarded `parse()` in a click handler is a posture defect. |
| lane-library **LEG-3** (`internal/leaves.ts` → `value.js/math`) | **Cited in S★1** — the facet consumes the same leaf from the same subpath as the engine. |
| **new to this challenge** | C-M1, C-M2 (phantom props on `LabeledSlider`, against an explicit producer refusal); **C-M3** (`btn-interactive` phantom class, 8 fleet sites, contradicted by glass-ui's own `.retired-classes.txt`); C-M4 (overshoot clip vs sibling `1.18`); C-i1 (no `vue-tsc` — the generator behind C-M1/C-M2). |

## 8. Live-audit handoff (SS-13)

Static analysis cannot settle these; they are marked **UNPROVEN-NEEDS-LIVE** above and are listed once here so the visual lane can pick them up:

1. Whether the composed `glass-chip` capsule clips at the cell boundary — decides the *fix value* for C-M4 (1.18 vs 1.25 vs a re-scaled rail), not the finding.
2. Whether the two slider labels are visibly distinguishable from the two `--muted-foreground` section labels in the same Card (C-M2) in light and dark.
3. Whether a `ToggleGroup`/`ToggleGroupItem` port of the preset grid (C-M5) lands pixel-identical to the current `Chip shape="cell"` composition.
4. What visual affordance is actually missing from the two `btn-interactive` sites (C-M3) — the class's last known behaviour is a press/hover register, but the shipped rule no longer exists to diff against.
