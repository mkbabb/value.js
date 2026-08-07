claude-opus-5[1m] (served model id)

# CHALLENGE · `SliderControl.vue` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/SliderControl.vue` (150 lines)
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` (unmoved — intake row **R4-9**, ADOPT-AS-FACT), working tree on `m/w1-bump-migration` with the in-flight 3.1→4.0 bump applied to `web/package.json` and to this file's `variant=` string.
**Mode** static + source-derived, read-only. No browser tooling. No product source touched in any repo. Single write = this file.
**Import closure read whole** — the file has exactly two imports (`SliderControl.vue:22-23`): `computed` from `vue`, and `Slider` from `@mkbabb/glass-ui/slider`. The latter was read at the installed version through `web/node_modules/@mkbabb/glass-ui/dist/{slider.d.ts, components/ui/slider/index.d.ts, components/ui/slider/Slider.vue.d.ts, slider-DQ95MET2.js, cn-DJXf4yaB.js, glass-ui.css, package.json}`, and cross-read against producer `@mkbabb/glass-ui@7.0.0` at `/Users/mkbabb/Programming/glass-ui`.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It did not prove otherwise. The load-bearing finding is that the component's **required `color` prop is completely inert** — it drives five CSS custom properties that do not exist in the pinned producer — and that the seam it forms is the transport for a **client↔operation domain divergence that destroys contour extraction on first touch**.

---

## §0 · The consumption ledger (what this file actually consumes)

The axis brief names four consumption surfaces. Measured, not assumed:

| Surface | Sites in this file | Evidence |
|---|---:|---|
| **value.js `0.13`** | **0** | `grep -n "value.js\|value-js\|easeInOut\|timingFunctions" src/components/ui/SliderControl.vue` → empty. The five repo-wide value.js sites (lane-frontend §5) are `easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — none here. |
| **keyframes.js `4.3`** | **0** | `grep -n "keyframes" src/components/ui/SliderControl.vue` → empty. |
| **glass-ui `^4.0.0`** | **1 import / 1 symbol / 1 subpath**; **11 template bindings**; **5 CSS custom-property writes**; **2 producer-token reads** (`--muted-foreground` :108, `--foreground` :123,:132) | `:23`, `:81-90`, `:143-149` |
| **fourier API (45-op surface)** | **0 direct**; **6 parameters transported** across 8 callsites, 2 of which reach `POST /api/images/{slug}/extract-contour` (`api/routers/images.py:212`) via `lib/api.ts:300-312` | §C-5 |
| **Tailwind v4** | 1 `@reference` + 1 `@apply` | `:95`, `:106` |

So the **value.js consumption of this component is NIL**, and the F.W2 migration surface reaches it only transitively — through glass-ui's peer range (**C-7**) and through the hand-rolled `lib/colors.ts` arm that fills the `color` prop at 5 of 8 callsites (**C-10**). That nullity is itself a finding: the wrapper's per-instance colour hook is the one place in this file where value.js would earn its keep, and it is instead served by a 117-line regex resolver that returns `#888888` for anything it does not recognise.

**Callsite census (8, complete).** `git grep -n '<SliderControl'`:
`FunctionInput.vue:179, :213` · `ContourSettings.vue:230, :243, :269, :282, :295` · `EquationPanel.vue:97`.

---

## §1 · DEFECTS

### C-1 · **BLOCKER** — the required `color` prop is inert: all five `--slider-scrub-*` properties are dead at the pinned producer

**Claim.** `SliderControl.vue:143-149` writes five custom properties in the `--slider-scrub-*` namespace. **That namespace does not exist anywhere in the installed `@mkbabb/glass-ui@4.0.0`.** Nothing reads them. The `color: string` prop (`:32`) — declared **required**, passed by all 8 callsites, threaded to `--track-color` at `:89` — therefore paints nothing.

**Provenance.**
```
SliderControl.vue:143-149
    .slider-track-host {
        --slider-scrub-track-height: 16px;
        --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 25%, transparent);
        --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 35%, transparent);
        --slider-scrub-thumb-bg:        var(--track-color);
        --slider-scrub-thumb-bg-hover:  var(--track-color);
    }
```
- `grep -rl -- "--slider-scrub" web/node_modules/@mkbabb/glass-ui/` → **empty** (whole package: `dist/`, `src/`, CSS, JS, types).
- The token surface that *does* ship at 4.0.0 — `grep -rho -- "--slider-[a-z0-9-]*" dist/ | sort -u` → exactly ten names: `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`, `--slider-thumb-spring`, `--slider-track-bg`, `--slider-track-height`. **No `scrub` anywhere.**
- The live rules, extracted from `dist/glass-ui.css` (minified, one line; selectors quoted verbatim):
  - `.slider-track[data-v-534634a7]{ … height:var(--slider-track-height,.375rem); background:var(--slider-track-bg,var(--muted-medium)); … }`
  - `.slider-range[data-v-534634a7]{ … background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent); … }`
  - `.slider-thumb[data-v-534634a7]{width:0;height:var(--slider-track-height,.375rem);opacity:0;box-shadow:none; … background:0 0;border:none;display:block}`

**Dating the death (producer-side, read-only).**
- **Introduced** at glass-ui **1.8.0**, commit `df0e7e7e` (2026-05-16, "tranche-p/W3 … GlassScrubber promotion"). `glass-ui/CHANGELOG.md:1016`: *"No new tokens shipped—divergence axes route through inline `var(--slider-scrub-*, default)` per the existing slider scoped-CSS pattern."*
- **Removed** at glass-ui **3.2.0**, commit `99a11083` (2026-06-06, "tranche-AV … W11 slider-unification"). `glass-ui/CHANGELOG.md:472`: *"Two-slider unification (AV.W11). Exactly two sliders ship: `standard` … and `spectrum` … **The other variants retired; consumers ported.** Gate `proof:slider-two-only`."*
- **fourier was not ported.** `git diff -- web/src/components/ui/SliderControl.vue` shows the in-flight sweep changed exactly three lines — `:7` and `:13` (prose) and `:83` `variant="glass-scrubber"` → `variant="standard"` — and left `:143-149` untouched.

**Consequences, each independently checkable.**
1. The fill stays `--primary`-tinted at every one of the 8 callsites. The per-basis amber / `--viz-fourier` identity the design intends is absent.
2. The stated 16px track is not applied; the track renders at the shipped default `.375rem` = **6px** — 2.7× thinner than the intent.
3. `--slider-scrub-thumb-bg` is doubly dead (see **C-2**).

**Repo-wide extent** (this file is 5 of 22): `grep -rn -- "--slider-" web/src/` → 22 declarations across **7 files** — `SliderControl.vue:144-148` (5), `BasisSelector.vue:319-322` (4), `EditorControlsDock.vue:225-228` (4), `HarmonicLevelGrid.vue:210-213` (4), `MorphPhaseConfig.vue:207-210` (4), `GlassTimeline.vue:125` (1), `ConvergenceTimeline.vue:136` (1). **Every one is in the dead namespace. Zero live-token writes exist in the tree.**

**Falsifier.** Produce any occurrence of the substring `--slider-scrub` inside `web/node_modules/@mkbabb/glass-ui/`, or any CSS rule in `dist/glass-ui.css` that reads one of the five names. `grep -rl` over the entire installed package returns empty; the ten shipped `--slider-*` names are enumerated above. Alternatively show that glass-ui 3.1.0 (the [HEAD] pin) still honoured them — irrelevant to the verdict, since `^3.1.0` resolves forward past 3.2.0 and the installed tree is 4.0.0.

**Corpus relation.** This **sharpens lane-frontend §5's prior-art row**, which measured the 3.1→4.0 hop as "24 files, 46 insertions, 46 deletions — **a pure rename sweep, no logic**" and counted `9 - variant="glass-scrubber" / 9 + variant="standard"`. Correct as far as it goes — and that is exactly the defect: the sweep renamed the *variant string* at 9 sites and did not rename the **22 accompanying token declarations** the variant string was the key to. It also **corrects lane-frontend §3's class census** (`:382`), which recorded all `glass-scrubber` occurrences as "**prose comments only**" and therefore harmless; the prose is harmless, but the CSS custom properties named after the retired variant are live, dead code.

---

### C-2 · **MAJOR** — the repair is not a pure rename: two of the five properties have no successor at `variant="standard"`

**Claim.** Renaming `--slider-scrub-*` → the shipped names fixes only two of the five. `--slider-scrub-thumb-bg` / `-hover` and `--slider-scrub-range-bg-hover` have **no reachable target**.

**Provenance.**
- `--slider-thumb-bg` is read by exactly one rule in `dist/glass-ui.css`, and it is variant-gated: `.glass-slider[data-variant=spectrum] .slider-thumb[data-v-534634a7]{width:calc(var(--slider-thumb-size,1rem) * .75);opacity:1;background:var(--slider-thumb-bg,transparent); …}`. At `variant="standard"` (`SliderControl.vue:83`) the ungated rule wins: `.slider-thumb{width:0; … opacity:0; … background:0 0;border:none}` — a hardcoded transparent background on a zero-width, zero-opacity node. The producer's own type docs state the intent (`dist/components/ui/slider/index.d.ts`): *"standard — the CONTINUOUS GLASS CYLINDER with **NO VISIBLE THUMB AT ALL** … paints INVISIBLE: width 0, opacity 0, transparent."*
- There is **no `-hover` counterpart token at all** in the shipped set (ten names, listed in C-1); hover is handled internally by the range's edge rim.
- Producer 7.0.0 does not restore them: `grep -rho -- "--slider-[a-z0-9-]*" /Users/mkbabb/Programming/glass-ui/src/components/slider/ | sort -u` → `--slider-range-bg`, `--slider-range-origin`, `--slider-target-floor`, `--slider-thumb-size`, `--slider-touch-target`, `--slider-track-height`. `glass-ui/src/components/slider/styles.css:116,437` read `var(--slider-range-bg, var(--glass-capsule-warm))`.

**Consequence for F.W-repair budgeting.** The correct 4.0.0 block is two lines — `--slider-track-height: 16px;` and `--slider-range-bg: color-mix(in srgb, var(--track-color) 25%, transparent);` — and the same two names survive the 4→7 uplift. The three thumb/hover lines must be **deleted, not renamed**. A mechanical `s/slider-scrub-/slider-/` sweep would leave two live-but-unreachable properties and silently re-tint the *spectrum* variant of any future consumer.

**Second-order note (surfaces at repair time, not now).** The producer already wraps the token: `color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)`. Feeding it the file's own `color-mix(… 25%, transparent)` compounds to ~22% effective alpha. The repair should pick the final alpha once.

**Falsifier.** Show a `dist/glass-ui.css` rule reading `--slider-thumb-bg` that is not gated on `[data-variant=spectrum]`, or any `--slider-*-hover` token in either version. Neither exists.

---

### C-3 · **MAJOR** — the numeric-input contract desyncs from the model and destroys in-progress edits

**Claim.** `onInput` (`:44-49`) commits on every keystroke through a `clamp` that maps **any unparseable input to `props.min`** (`:41` — `Number.isFinite(v) ? … : lo`), against a one-way `:value="displayValue"` binding (`:74`). Two distinct failures follow.

**Failure A — silent DOM/model desync (no re-render to heal it).**
When the emitted clamp equals the current `modelValue`, the parent's state does not change, so no re-render occurs and the DOM keeps the invalid text indefinitely.
*Concrete instance:* `ContourSettings.vue:282-290` — `Max Contours`, `:min="0"`, `:format-value="(v) => v === 0 ? 'All' : String(v)"`. At `maxContours === 0` the field is `type="text"` with value `"All"`. Append `8` → `"All8"` → `parseFloat("All8")` = `NaN` → `clamp` → `0` → emit `0` → `maxContours` unchanged → **no patch**. The field reads `All8` for the rest of the session while the model, the draft in IndexedDB (`workspace.ts:93-106`) and the request body all say `0`.

**Failure B — clear-to-retype is impossible, and it fires a real API round-trip.**
`FunctionInput.vue:179-187` — `Harmonics`, `:min="1"`, model 50. Deleting the last digit yields `""`; `parseFloat("")` = `NaN`; clamp → `1`; emit `1`. The model jumps to 1 mid-edit, `displayValue` becomes `"1"`, and Vue patches `el.value` under the caret. For the `ContourSettings` sliders the same keystroke enters `watchDebounced(…, {debounce: 1000})` (`ContourSettings.vue:141-150`) and, one second later, issues a real `POST /api/images/{slug}/extract-contour` at the bound value.

**Falsifier.** Any of: (a) `Number.isFinite(parseFloat(""))` is true — it is not; (b) `clamp` returns the current `modelValue` rather than `lo` on `NaN` — `:41` returns `lo`; (c) the input commits on `change`/blur rather than `input` — `:78` binds `@input`; (d) a re-render is guaranteed after every emit — it is not, Vue skips the patch when the reactive source is unchanged. Switching `:78` to `@change`, or an early `if (raw === "") return;`, kills both failures.

**Gate coverage: zero.** `vitest` is ABSENT (lane-frontend §9 item 11); the only e2e that touches this input is `e2e/contour-extraction.spec.ts:67-72`, which does `blurInput.fill("3")` — a single well-formed `input` event on the one slider (`Blur Sigma`) where clamping is a no-op. Neither failure path is exercised.

---

### C-4 · **MAJOR** — the input's `type` (and ARIA role) flips on a live element as `formatValue`'s output crosses numeric-parsability

**Claim.** `isNumericDisplay` (`:61`) is computed from the **formatted string**, and it gates `type` (`:72`) plus `min`/`max`/`step` (`:75-77`). A `formatValue` whose output is sometimes non-numeric therefore mutates the element's type in place.

**Provenance.** `ContourSettings.vue:282-290`: `label="Max Contours"`, `:min="0"`, `:format-value="(v) => v === 0 ? 'All' : String(v)"`. Dragging the slider across 1↔0 flips `displayValue` `"1"`↔`"All"`, so `isNumericDisplay` flips `true`↔`false`, so:
- `type` toggles `number` ↔ `text`;
- `min`/`max`/`step` are **removed** and re-added (`:75-77` bind `undefined`);
- the computed ARIA role toggles `spinbutton` ↔ `textbox`.

Setting `type="number"` re-runs the UA value-sanitization algorithm; `"All"` is not a valid floating-point number, so the value is discarded. `-moz-appearance: textfield` and the webkit spin-button suppression at `:127`, `:134-137` are declared unconditionally and apply to a `type=text` element as no-ops.

**Consequence for the test surface.** Any role-based locator on this control is value-dependent. `e2e/settings-persistence.spec.ts:70,94` already keys on `page.getByRole("spinbutton", { name: "Harmonics" })` (against `BasisSelector`'s own input) — the idiom is in use, and on a `SliderControl` with a conditional formatter it is not stable.

**Falsifier.** Show that Vue re-creates rather than patches the element on `type` change (it patches — `type` is a plain attribute in the same vnode, and no `key` is present at `:71`), or supply a `formatValue` contract that forbids non-numeric output (none is declared; `:33` types it `(v: number) => string`). Keying the type off `formatValue === undefined`, or fixing `type="text" inputmode="decimal"`, removes the flip.

---

### C-5 · **BLOCKER** — client↔operation domain divergence transported through the untyped `modelValue: number`: `Min Area %` sends a 0–20 value into a server domain clamped to `[0,1]`

**Claim.** `SliderControl` declares `modelValue: number`, `min: number`, `max: number`, `step: number` (`:28-31`) with **no unit, no domain, and no reconciliation against the operation schema**, while being the sole transport for six contour parameters. One of the six is out of contract by a factor of 20 and is destructive on first touch.

**The chain, end to end.**
| Hop | Location | Value |
|---|---|---|
| control | `ContourSettings.vue:269-277` | `label="Min Area %"`, `:min="0" :max="20" :step="0.5"`, `v-model="minContourArea"` |
| seat | `ContourSettings.vue:35` | initialised from `CONTOUR_DEFAULTS.min_contour_area` = **0.001** (`lib/defaults.ts:11`) |
| serialise | `ContourSettings.vue:116` | `min_contour_area: minContourArea.value` — **no conversion** |
| store | `stores/workspace.ts:247-250` | `api.extractContour(imageSlug, contourSettings)` |
| wire | `lib/api.ts:300-312` | `POST /api/images/${imageSlug}/extract-contour`, `body: { contour_settings: {...settings} }` |
| operation | `api/routers/images.py:212` | `@router.post("/{imageSlug}/extract-contour")` — one of the 45 (intake §0 / X-3) |
| validate | `api/models/shared.py:27-30`, `api/models/computation.py:25-28` | `return max(0.0, min(1.0, float(v)))` |
| semantics | `src/fourier_analysis/contours/processing.py:71`; `contours/structure.py:44` | `area_threshold = config.min_contour_area * image.image_area` |

**Therefore.**
1. The `%` in the label is **false**. The transported quantity is a *fraction* of image area; `20` would read as 2000%.
2. The default seat, `0.001`, sits at 0.005% of a 0–20 track — visually pinned at zero.
3. The **first step**, `0.5`, means *discard every contour smaller than half the image*. `_postprocess_raw_contours` then filters against `area_threshold`, and the extraction returns (near-)empty.
4. `1.0 … 20` — **95% of the track** — is a dead zone: the server clamps every one of those values to `1.0`, i.e. "discard every contour smaller than the entire image". No contour can satisfy it.
5. Round-trip is lossy in a way the UI cannot show: the user sees `12.5`, the server persists `1.0`, and `isDefault` (`ContourSettings.vue:64`) compares the *client* value, so the "reset" affordance and the server state disagree.

The two out-of-domain values reach the server through **one of the 45 operations**, and the divergence is unrepresentable in this component's contract by construction: `min`/`max` are just numbers with no declared relation to the operation's validator.

**Attribution, honestly.** The wrong numbers are authored at `ContourSettings.vue:272-273`. What `SliderControl` owns is the seam: a required `min`/`max` pair with no unit, no domain, and no place to state which operation field it feeds — so nothing in the tree can detect the divergence, and the other five parameters transported through the same seam are correct only by accident (`Smoothing` 0–1 matches `_clamp_smooth`'s `[0,1]`; `Blur Sigma` 0–5 is a safe subset of `max(0.0, …)`; `Max Contours` 0–50 with the client's `0 → null` map at `:87` and `:117` matches `_clamp_max_contours`; `ML Threshold` 0.1–0.9 is unvalidated server-side).

**Falsifier.** Produce a `/100` (or any scaling) anywhere on the transport — `grep -rn "min_contour_area" web/src/` returns exactly six sites (`ContourSettings.vue:35,64,73,116` · `lib/defaults.ts:11` · `lib/types.ts:37`), none of which scales. Or show the server interpreting the field as a percentage — refuted twice over by the `[0,1]` clamp and by the `* image.image_area` multiply. Or show the Advanced collapsible is unreachable — it is a `<CollapsibleTrigger>` at `ContourSettings.vue:258-261`, one click away.

**Corpus relation.** **Not in the hitherto corpus** — `grep -rn "min_contour_area\|Min Area" formation/fourier/ audit/codex-provenance/intakes/lane-fourier-r3-r6.md` → 0 hits. It is, however, precisely the class the intake's **R6-8** (ADOPT-AS-FACT + CARRY→F.W5) warns about: *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam."* Here the pathology is the mirror image — the client leaf declares a domain the operation leaf does not honour, and **no join is declared anywhere**, so neither side is falsifiable from the other. Route this to **F.W5** alongside R6-8 and R3-7c: the shared-provenance contract must carry the operation field's domain, not just its type.

---

### C-6 · **MAJOR** — three **required, non-optional** peers of `@mkbabb/glass-ui@4.0.0`, all pulled at module scope by this file's single import edge, are declared in fourier's `devDependencies`

**Claim.** `SliderControl.vue:23` — `import { Slider } from "@mkbabb/glass-ui/slider"` — is a runtime edge onto three packages the consumer has scoped as dev-only.

**Provenance.**
- `web/node_modules/@mkbabb/glass-ui/package.json`: `"dependencies": {}` — **empty**. `peerDependencies` includes `"reka-ui": "^2.0"`, `"class-variance-authority": "^0.7"`, `"clsx": "^2.0"`. `peerDependenciesMeta` marks **only** `@vueuse/core`, `embla-carousel-vue`, `@mkbabb/keyframes.js`, `@mkbabb/pencil-boil`, `@mkbabb/value.js`, `perfect-freehand`, `tw-animate-css` optional. **The three above are required.**
- The chunk this import resolves to, `dist/slider-DQ95MET2.js`, imports all three at module scope:
  - line 6: `import { SliderRange as v, SliderRoot as y, SliderThumb as b, SliderTrack as x, useForwardPropsEmits as S } from "reka-ui";`
  - line 7: `import { cva as C } from "class-variance-authority";`
  - line 1 → `./cn-DJXf4yaB.js:1`: `import { clsx as e } from "clsx";`
- `web/package.json`: `reka-ui`, `class-variance-authority`, `clsx` are all under `devDependencies`.

**Live vs latent.** No break today — `web/Dockerfile:11` is a bare `RUN npm ci`, which installs devDependencies. The exposure is that `npm ci --omit=dev` / `NODE_ENV=production` fails at this exact import, and that the manifest states the wrong thing.

**CONTRADICTION with the hitherto corpus — explicit.** `lane-frontend.md:70` books these as *"**Dead devDeps (measured, not estimated)**: `class-variance-authority`, `clsx`, `tailwind-merge` all have **0 import sites** in `src/`… `reka-ui` also has **0 direct imports** — its 6 mentions are all prose comments"*, and `lane-frontend.md:645` §9 item 10 carries them as **"[P3] Dead deps"** for removal. The measurement is correct — 0 *first-party* import sites — but **the inference is wrong for three of the four.** `reka-ui`, `class-variance-authority` and `clsx` are required runtime peers with zero producer-side `dependencies` backing them; they are consumed at module scope by the very chunk `SliderControl.vue:23` pulls in. **Acting on §9 item 10 would break `vue-tsc -b && vite build` at this import edge.** The correct disposition is *re-scope `devDependencies` → `dependencies`*, not *delete*. `tailwind-merge` is not defended here — `cn-DJXf4yaB.js` imports only `clsx` and carries its own class-conflict table, so that one row may stand.

**Falsifier.** Show any of the three in glass-ui 4.0.0's `dependencies`, or in `peerDependenciesMeta` with `optional: true` — neither holds; or show the published chunks bundling their own copies — the `import … from "reka-ui" / "class-variance-authority" / "clsx"` lines quoted above are bare, unbundled specifiers.

---

### C-7 · **MINOR** — `@mkbabb/value.js@0.13.0` is **outside** glass-ui 4.0.0's declared peer range, at the pinned version

**Claim.** The tree is not merely "behind" on value.js; it is already out of the producer's stated compatibility contract.

**Provenance.** `web/node_modules/@mkbabb/glass-ui/package.json` → `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`. `web/package.json` pins `"@mkbabb/value.js": "^0.13.0"`; installed is **0.13.0** (`node -p "require('…/@mkbabb/value.js/package.json').version"`). Under 0.x caret semantics `^0.10.0` = `>=0.10.0 <0.11.0` and `^0.11.0` = `>=0.11.0 <0.12.0`; **0.13.0 satisfies neither.** The peer is marked optional, so `npm ci` warns rather than fails.

**Relation to this file.** `SliderControl` consumes value.js **zero** times (§0) — it is a bystander, not the offender. It is named here because this file is the tree's canonical `@mkbabb/glass-ui/slider` consumer, and the slider chunk is inside the resolution graph the violation governs.

**Corpus relation — sharpens, does not contradict.** `lane-frontend.md:480` books the value.js row only against the **7.0.0** floor (*"7.0 peers `@mkbabb/value.js@^4.0.0`; installed 0.13.0"*). The tree says the constraint is already violated at **4.0.0**, one major earlier. Same for the sibling row at `:478`: `@lucide/vue ^1.16.0` is a **required, non-optional peer of 4.0.0**, and fourier ships `lucide-vue-next ^1.0.0` — so the lucide rename is not a 4→7 uplift cost, it is an **unmet required peer today**. Two of lane-frontend §5's "uplift break surface" rows are live breaches at the pinned version.

**Falsifier.** `npm ls @mkbabb/value.js` / re-read the two manifests; or demonstrate 0.13.0 ∈ `^0.11.0`.

---

### C-8 · **MINOR** — the wrapper swallows the producer's `valueCommit`, and a consumer rebuilds it by hand

**Claim.** `SliderControl.vue:36-38` declares exactly one emit. The producer emits two: `dist/components/ui/slider/Slider.vue.d.ts` → `{"update:modelValue": (payload: number[] | undefined) => any; valueCommit: (payload: number[]) => any}`. `valueCommit` is neither consumed nor re-emitted, so **no consumer can distinguish drag-in-progress from drag-commit**.

**Cost, in the tree.** `ContourSettings.vue` reconstructs commit-detection twice over: `watchDebounced(…, { debounce: 1000 })` at `:141-150`, plus a `currentComputeKey()` JSON-string equality guard at `:86-98` and `:145-147` to suppress the re-fire. That is a hand-rolled commit detector standing in for a producer signal the wrapper dropped — and it is the reason C-3's Failure B costs an API round-trip rather than a repaint.

**Falsifier.** Show `valueCommit` absent from 4.0.0's emit type (it is present, quoted above), or show a consumer that needs per-frame granularity — all three consumers debounce or coalesce.

---

### C-9 · **MINOR** — `step` binds the slider path and not the input path; the rendered value can differ from the transported value

**Claim.** `:86` hands `:step` to `<Slider>` (reka quantizes on the pointer/keyboard path). `onInput` (`:44-49`) clamps to `[min,max]` and **never quantizes**. The two ingress paths therefore have different value contracts.

**Provably divergent display.** `ContourSettings.vue:243-251` — `Blur Sigma`, `:step="0.1"`, `:format-value="(v) => v.toFixed(1)"`. Typing `0.37` emits `0.37`; `displayValue` renders `"0.4"`; the request body carries `0.37`. **The number on screen is not the number sent** — statically provable from `:59` (`props.formatValue(props.modelValue)`) and `:47` (no quantization).

The DOM `step` attribute is passed at `:77`, so the browser's spinners and constraint validation do respect it — but `@input` fires before validation and `parseFloat` ignores `step` entirely, so the attribute is decorative on the typing path.

**Falsifier.** Add `Math.round(v/step)*step` at `:47` and the divergence vanishes. Whether reka additionally re-snaps an off-grid incoming `modelValue` is **UNPROVEN-NEEDS-LIVE (SS-13)** — it does not affect the claim, which rests only on `toFixed(1)` vs the unquantized emit.

---

### C-10 · **MINOR** — two incompatible representations of "colour" flow through one undiscriminated `color: string`

**Claim.** `:32` types the prop `string`, and the 8 callsites supply two different kinds of string with two different retint mechanisms.

**Provenance.**
- **CSS-var reference, static, unbound** (3): `FunctionInput.vue:185`, `:218`, `EquationPanel.vue:101` — `color="var(--viz-fourier)"`. Retints through the cascade on a `.dark` flip.
- **Resolved hex, reactive** (5): `ContourSettings.vue:236, 249, 275, 288, 301` — `:color="VIZ_COLORS.amber"`. Retints only when `resolveVizColors()` re-runs, driven by the `MutationObserver` at `App.vue:11-17`.

`VIZ_COLORS` is filled by the hand-rolled resolver at `lib/colors.ts:22-56` — the F.W2 arm. `cssVarToHex` regex-matches exactly four shapes (`#…`, `hsl(h s% l%)`, a bare Tailwind triplet `"6 72% 49%"`, `rgb(r,g,b)`) and **returns the sentinel `#888888` for anything else** (`:33`, `:55`). Any producer token expressed in `oklch()` / `lab()` / `color()` — the direction glass-ui's own token layer is moving — degrades silently to grey with no error. `@mkbabb/value.js` is already a declared dependency of this repo and ships exactly this parse; `SliderControl` consumes it zero times, and `colors.ts` reimplements it.

Both paths are presently moot: **C-1** means neither reaches a paint.

**Falsifier.** Show that `--viz-fourier`/`--viz-amber` can never be authored in a space `cssVarToHex` cannot parse — `web/src/style.css:120,125` authors `--viz-amber` in `hsl()` today, so the failure is latent, not live; the claim is a fragility + representation-inconsistency claim, and it is falsified only by unifying the prop's accepted form (or by typing it as a discriminated union).

---

### C-11 · **INFO** — header documentation is two majors stale and cites a retired variant by name

**Claim.** Three prose assertions in `:1-21` and `:140-142` describe a producer that is no longer installed.
- `:18-20` — *"the v1.8.x `<Slider>` acquires the typed `DockContext` token internally"*. Installed is **4.0.0**. The mechanism is now the declared prop `keepDockOpen?: boolean` (default `true`, `Slider.vue.d.ts`), which this file never passes.
- `:140` — *"Retint the **glass-scrubber** variant tokens"*, naming a variant retired at glass-ui 3.2.0 (C-1). `:141` further claims *"The variant defaults compose `--surface-tint-*`"* — `grep -c -- "--surface-tint" dist/glass-ui.css` shows no such composition in the slider rules, which read `--slider-track-bg,var(--muted-medium)` and `--slider-range-bg,var(--primary)`.
- `:51` names `reka-ui` in prose — one of the six comment-only mentions lane-frontend `:70` enumerates; accurate, and it is the correct posture (see **S-4**).

**Non-defect, stated for completeness.** `keepDockOpen` defaults to `true` at all 8 callsites and **none of them is inside a `GlassDock`** (the dock consumers `EditorControlsDock.vue:3` and `CanvasControlsDock.vue` import `Slider` directly). The compiled `useDockHold` guards on a null context — `let n = r(), … !i() || a || !n || (n.keepOpen(), a = !0)` — so every path short-circuits. Cost is one `pointerdown` listener plus a `pointerup`/`pointercancel` window pair per instance. Harmless; noted so a repair does not over-correct.

**Falsifier.** Any SliderControl callsite inside a `GlassDock` (grep: none); or a `--surface-tint-*` read inside a `.slider-*` rule (none).

---

### C-12 · **INFO** — the two coupled controls carry different accessible names, and the default slot can diverge them further

**Claim.** The slider thumb and the numeric input name the same value differently.
- `:87` `:aria-label="label"` → the thumb's name is `label` alone (see **S-1** for why it lands correctly).
- `:71-79` the `<input>` carries no `aria-label`; it takes its name implicitly from the enclosing `<label>` (`:66-80`), whose text content is `label` **plus** `" — " + subtitle` (`:69`).

`FunctionInput.vue:181-182` passes both ⇒ thumb = `"Harmonics"`, spinbutton = `"Harmonics — terms in the Fourier sum"`.

**Latent divergence.** `:68` renders `<slot>{{ label }}</slot>`. A consumer supplying slot content changes the *visible* name while `:87` still uses the `label` prop — visible text and accessible name part company. No callsite does this today (all 8 pass `label`, none passes slot content), so this is latent, not live.

**Falsifier.** Any callsite passing default-slot content (none, verified over all 8); or an `aria-label` on the input (absent at `:71-79`).

---

## §2 · SUPERLATIVES (L-18 runs both ways — each carries its own falsifier)

### S-1 · `:aria-label` lands on the node that carries `role="slider"`, and it is **derived** rather than duplicated

`:87` binds `:aria-label="label"` as a fallthrough attribute. The producer forwards it deliberately: `dist/slider-DQ95MET2.js` renders one `SliderThumb` per model entry and binds `"aria-label": n.$attrs["aria-label"] ?? void 0` **on the thumb**, not the root — i.e. onto the element reka gives `role="slider"`. The one binding that had to survive the scalar↔array adaptation does.

And it is the only slider seat in the tree where the accessible name is **structurally tied to the rendered label**. Every direct `<Slider>` consumer hardcodes a second string: `BasisSelector.vue:174` `aria-label="Harmonics"`, `:201` `"Sample Points"`; `EditorControlsDock.vue:121` `"Magnet radius"`; `HarmonicLevelGrid.vue:23,46`; `MorphPhaseConfig.vue:27`; `GlassTimeline.vue:71`; `ConvergenceTimeline.vue:78`. Those seven can drift from their visible text; this one cannot.

*Falsifier.* If the producer declared `aria-label` as a prop pinned to the root, or set `inheritAttrs: false`, the name would land on a non-interactive wrapper. Neither: `aria-label` is absent from `Slider.vue.d.ts`'s `__VLS_Props`, `inheritAttrs` does not appear in the chunk, and the thumb binding is explicit. (The attribute additionally mirrors onto the root via normal fallthrough — cosmetic duplication on an element with no widget role.)

### S-2 · The scalar↔array adaptation is **stateless**, and therefore structurally cannot desync

`:53-56` is a `computed` with getter **and** setter over `props.modelValue` — no local `ref`, no mirror, no `watch`. The slider path has exactly one source of truth (the parent), and the setter clamps on egress (`:55`).

The falsifier is inside the same file: the **input** path (C-3) holds implicit DOM state and does desync, permanently. Same author, same 150 lines — the harder of the two adaptations is the one written correctly. It also structurally avoids the hazard this project has already paid for once: the `shallowRef`/`defineModel` async-round-trip stale-read recorded in value.js's own `useColorModel`.

*Falsifier.* Any `ref`/`reactive`/`watch` mirroring `modelValue` in this file — there is none; `computed` is the only reactive primitive imported (`:22`).

### S-3 · The `variant` prop retirement is a **receipted deletion with its verification command in the source**

`:9-17` records the A.W3.b D5 fold: the retired shape (`variant?: "timeline" | "default"`), the reason (both branches already mapped to the same producer variant), the verification actually run (`git grep '<SliderControl' | xargs grep variant`), the ledger citation, and the flag it discharged (H1-hardening). Re-verified live: **all 8 callsites pass no `variant`**, and the cited ledger exists at `fourier-analysis/docs/tranches/A/audit/W3-adoption-ledger.md`. This is the evidence standard the intake's **R3-3** demands (*"a registry audit that re-hashes bytes but never re-derives products proves the bytes unchanged, not the summary true"*) applied at the component scale — a deletion whose falsifier is written down next to it.

*Falsifier.* A callsite passing `variant` (none), or an absent ledger (present; the comment's `audit/…` is repo-relative shorthand for the `docs/tranches/A/` path).

### S-4 · The import edge is minimal and reka-pure

Two imports total (`:22-23`). **Zero direct `reka-ui` import** despite the file's whole purpose being to adapt reka's array model — reka is named only in the prose at `:51`. This is the posture lane-frontend §3 measures repo-wide (*"zero direct reka-ui imports… the cleanest glass-ui consumer posture in the constellation"*), and this file is one of its load-bearing instances: the deepest producer-internal API in the tree is adapted **without reaching past the producer's public subpath**. Contrast C-6 — where the tree's *manifest* fails to acknowledge the transitive edge this source correctly refuses to make direct.

*Falsifier.* A `from "reka-ui"` line in this file — none.

### S-5 · The retint **mechanism** is sound end to end; only the names are wrong

Every link in the per-instance-colour chain holds, which is what makes C-1 a two-line rename rather than a re-architecture:
1. `class="slider-track-host"` (`:88`) is consumed by the producer's **declared `class` prop** and merged through `cn()` — chunk: `class: h(e)(h(E)({variant, size}), C.class)`.
2. `:style="{ '--track-color': color }"` (`:89`) falls through as an attribute; `inheritAttrs: false` is absent from the chunk and the `SliderRoot` is a single root, so it lands.
3. Vue stamps the parent's scope id onto the child component's root, so the scoped selector `.slider-track-host[data-v-…]` matches.
4. CSS custom properties **inherit past the scope boundary** into the producer's internals, which is precisely how `var(--slider-range-bg, …)` would pick them up.

Stating this is what keeps C-1 honest: the design is right, the vocabulary is two majors stale.

*Falsifier.* `inheritAttrs: false` in the chunk, a multi-root `Slider`, or a `class` prop that overwrites rather than merges — none of the three; the `cn()` merge and the absence of `inheritAttrs` are quoted above.

---

## §3 · Corpus fold — agreements, sharpenings, contradictions

| # | Corpus row | This challenge |
|---|---|---|
| 1 | `lane-frontend.md:371` — *"these three `components/ui/` files are **thin API-shape adapters, not shadows** … the correct posture — keep."* | **AGREE on the verdict, dissent on the grade.** The adapter shape is right (S-2, S-4, S-5). But "keep" was concluded from the *documented intent* at `:3-20` without checking the intent against the pinned producer. It does not adapt cleanly today: its required `color` prop paints nothing (C-1) and its input contract is broken in two ways (C-3, C-4). Keep — and repair. |
| 2 | `lane-frontend.md:496-507` §5 prior-art — *"a pure rename sweep, no logic"*, `9 × variant="glass-scrubber" → "standard"` | **SHARPENED.** That is exactly the defect: the sweep renamed the variant *string* and not the **22 token declarations across 7 files** the string was the key to (C-1). The measured "46 insertions / 46 deletions" is the *cost of what was done*, not the cost of the hop. |
| 3 | `lane-frontend.md:382` — all `glass-scrubber`/`glass-track`/`glass-fill`/`glass-thumb` occurrences are *"prose comments only"* | **CORRECTED.** True for those four class names. But the census did not enumerate `--slider-scrub-*` **custom properties**, which are live CSS in the same scoped blocks and are dead against the pinned producer. |
| 4 | `lane-frontend.md:70` + §9 item 10 — *"Dead devDeps"*: `cva`, `clsx`, `tailwind-merge`, `reka-ui` → **[P3] remove** | **CONTRADICTED for three of four (C-6).** They are **required, non-optional peers** of glass-ui 4.0.0 (whose own `dependencies` is `{}`) and are imported at module scope by the chunk `SliderControl.vue:23` resolves to. 0 first-party import sites ≠ dead. Correct disposition: re-scope to `dependencies`. `tailwind-merge` is not defended. |
| 5 | `lane-frontend.md:478-480` §5 — lucide rename and the value.js floor as **4→7 uplift** costs | **RE-DATED (C-7).** Both are breaches at the **installed 4.0.0**: `@lucide/vue ^1.16.0` is a required unmet peer today, and `value.js 0.13.0` is outside 4.0.0's `^0.10.0 || ^0.11.0`. |
| 6 | intake **R6-8** (ADOPT-AS-FACT + CARRY→F.W5) — operation/client leaves non-isolable by construction | **EXTENDED by a mirror case (C-5).** There the operation embedded a client back-reference; here the client declares a domain the operation silently overrides, with **no join declared on either side**. Same F.W5 carry: the shared-provenance contract must carry the operation field's *domain*, not merely its type. |
| 7 | intake **§0 / X-3** — 45 operations / 30 public-non-admin | **AGREE, used as denominator.** C-5's endpoint `POST /api/images/{slug}/extract-contour` (`api/routers/images.py:212`) is inside the 7 `images.py` operations of that 45. |
| 8 | intake **R3-3** — *re-hashing bytes ≠ re-deriving products* | **APPLIED as the method here.** Every claim above re-derives from the tree (compiled chunks, shipped CSS, manifests, Python validators) rather than from either repo's prose. It is also the reason C-1 exists: the file's own header comment is a summary that the bytes no longer support. |
| 9 | `lane-frontend.md:645` item 11 — *"No unit-test runner. vitest is ABSENT"* | **AGREE, and quantified at this component.** C-1, C-3, C-4, C-5, C-9 are all invisible to the shipped gate: no unit runner; the sole e2e touching this input is `contour-extraction.spec.ts:67-72` (`fill("3")`, one valid event); and `e2e/visual-baseline.spec.ts:55` calls `page.screenshot({…})` — an **artifact dump**, never `toHaveScreenshot()` — so there is no visual-regression comparison that could have caught a colour hook that stopped painting. |

---

## §4 · Tally

**Defects: 12** — BLOCKER **2** (C-1 dead `--slider-scrub-*` namespace ⇒ inert required `color` prop; C-5 `Min Area %` client↔operation domain divergence) · MAJOR **4** (C-2, C-3, C-4, C-6) · MINOR **4** (C-7, C-8, C-9, C-10) · INFO **2** (C-11, C-12).

**Superlatives: 5** — S-1 (aria-label lands on `role="slider"` and is derived, uniquely in the tree) · S-2 (stateless scalar↔array adaptation) · S-3 (receipted variant retirement with its verifier in-source) · S-4 (two imports, reka-pure) · S-5 (retint mechanism sound end to end).

**UNPROVEN-NEEDS-LIVE (SS-13): 1** — whether reka re-snaps an off-grid incoming `modelValue` (C-9, second half). Every other claim is static or source-derived.

**Wave routing.** C-1 + C-2 → the glass-ui token cross-walk (repo-wide: 22 declarations, 7 files). C-5 → **F.W5**, filed with R6-8 / R3-7c. C-6 + C-7 → **F.W0/F.W2** manifest re-scope, and they **block** lane-frontend §9 item 10 as written. C-3 + C-4 + C-8 + C-9 → the component repair. C-10 → the F.W2 value.js arm (`lib/colors.ts` is the reimplementation).

**Method and limits.** Read-only throughout; the only write is this file. No `fourier-analysis`, `glass-ui`, or `value.js` product source was modified. No browser, no dev server, no install. Evidence: file reads · `grep`/`git grep` · `git log`/`git show`/`git diff` (read-only) · `node -e` JSON + string extraction over installed manifests and compiled chunks · `find`/`ls`.
