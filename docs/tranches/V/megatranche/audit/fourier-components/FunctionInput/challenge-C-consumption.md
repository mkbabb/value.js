claude-opus-5[1m]

# CHALLENGE — `FunctionInput.vue` · axis **C · CONSUMPTION**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FunctionInput.vue` (261 LOC)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its falsifier.
**Method** static + source-derived only (no browser tooling). Read whole: the target, its 5 direct imports, their transitive leaves, the sole parent, the server operation models, the installed `@mkbabb/glass-ui@4.0.0` dist, `reka-ui@2.9.10` dist, and the built `web/dist` CSS (as compiled evidence, not a live run).

**Import closure read (read-only):**
`components/equation/FunctionInput.vue` → `@mkbabb/glass-ui/button` · `lib/equation/presets.ts` → `lib/equation/types.ts` · `lucide-vue-next` · `components/ui/CollapsibleSection.vue` → `@mkbabb/glass-ui` (barrel) · `components/ui/SliderControl.vue` → `@mkbabb/glass-ui/slider` · `components/ui/tooltip/{index.ts,Tooltip.vue}` → `@mkbabb/glass-ui/tooltip` · `components/equation/NotationPills.vue` → `lib/equation/notation.ts`.
**Consumption context read:** `components/equation/EquationView.vue` (sole parent), `lib/equation/api.ts`, `lib/api.ts`, `composables/useEquationCache.ts`, `api/models/equations.py`, `api/routers/equations.py`, `components/visualization/EquationPanel.vue` (co-consumer of the same operation), `web/src/style.css`, `web/src/App.vue`, `web/e2e/*`.

**Verified pins (corroborates CENSUS-2026-08-03.md:37):** installed `@mkbabb/value.js@0.13.0` · `@mkbabb/keyframes.js@4.3.0` · `@mkbabb/glass-ui@4.0.0` · `reka-ui@2.9.10` · `vue@3.5.38`.

**Tally — 15 defects (2 BLOCKER · 5 MAJOR · 5 MINOR · 3 INFO) · 4 SUPERLATIVES.**

---

## §0 · Corpus fold (cite, don't re-invent)

| Corpus row | Claim | This audit |
|---|---|---|
| `intakes/lane-fourier-r3-r6.md` **R3-7a** | "FunctionInput 2" Tooltip callsites in the 35/9 migration budget | **CORROBORATED.** `grep -c "<Tooltip" FunctionInput.vue` → **2** (`:157` preset pills, `:188` auto-toggle). The F.W3 `ui/tooltip`→`@mkbabb/glass-ui/tooltip` budget for this file is exactly 2 lines. |
| `intakes/lane-fourier-r3-r6.md` **R5-7** | derived-registry leaf `instance.loop.presets` keyed `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0` | **CORROBORATED against the live tree.** `FunctionInput.vue:157` is `<Tooltip v-for="preset in PRESETS" …>` — a *component* callsite, which is precisely why this leaf is populated where `instance.loop.paper-sidebar` is empty. This file is the positive control for R5-7's blind spot. |
| `formation/fourier/lane-frontend.md:371` | the 3 `components/ui/` wrappers are "thin API-shape adapters, not shadows … keep" | **CORROBORATED, and strengthened** — see **S-4**: FunctionInput consumes all three *through* their adapter APIs with 0 reach-past to reka-ui. |
| `formation/fourier/lane-frontend.md:70` | `reka-ui` has 0 direct imports; its mentions are prose | **CORROBORATED inside this closure.** The only hit is a comment, `SliderControl.vue:51`. |
| `formation/fourier/CENSUS-2026-08-03.md:38` | value.js live surface = 5 statements / 4 files, easing-only | **CORROBORATED — and FunctionInput is not one of them.** See **S-1**. |
| `formation/fourier/lane-frontend.md:132` | `FunctionInput.vue | 261 | Expression entry + presets` | **CORROBORATED** — 261 lines exactly. |
| `formation/fourier/lane-frontend.md:441` | `NotationPills` → `./toggle-chip` (4.0.0) / `./chip` (5.0.0+); "currently 6× `Button`" | **CONTRADICTED on the count, agreed on the disposition.** The live `NotationPills.vue` renders **one** `<Button>` inside a `v-for` over a 3-element `NOTATION_OPTIONS` (`notation.ts:15-17`) — 1 callsite / 3 instances, not 6 callsites. The migration budget is 1 line, not 6. Falsifier: `grep -c "<Button" NotationPills.vue` → 1. |

---

## §1 · BLOCKERS

### C-1 · BLOCKER — the `budget` control range exceeds the server's operation contract by 2×; the resulting 422 is silent on `/simplify` and persists across reloads

**Provenance**
- `FunctionInput.vue:216-217` — `:model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"` · `:min="2" :max="Math.max(2, vizHarmonics ?? nHarmonics)"`.
- `FunctionInput.vue:183` — the Harmonics slider's `:max="100"`, which is what feeds `vizHarmonics`/`nHarmonics` into that `:max`.
- `/Users/mkbabb/Programming/fourier-analysis/api/models/equations.py:23` — `budget: int = Field(default=10, ge=2, le=50)` (compute).
- `/Users/mkbabb/Programming/fourier-analysis/api/models/equations.py:40` — `budget: int = Field(default=6, ge=2, le=50)` (simplify).
- `EquationView.vue:110` and `:137` — `budget` is forwarded verbatim to both operations; `lib/equation/api.ts:24-31,46-54` performs **no clamp** on the way out.
- `EquationView.vue:143` — `catch (e) { if (!isAbortError(e)) { /* silent */ } }`.
- `lib/api.ts:180-182` — `if (!res.ok) throw await ApiProblem.from(res)`; FastAPI answers a `le=50` breach with **422**.

**Reachability — two independent paths, both derived, neither hypothetical.**

1. *Direct.* `SliderControl.vue:44-49` exposes an inline numeric input whose `clamp(v, props.min, props.max)` uses **FunctionInput's** `:max`. With `autoHarmonics` off and `nHarmonics = 100`, the Display-terms field accepts a typed **100** in one keystroke sequence — 2× the server ceiling.
2. *Incidental, no intent required.* `EquationView.vue:151-159`'s "scale it up proportionally" branch ratchets `budget` upward on every Harmonics tick, and `Math.round` biases the ratio up each step. Simulated exactly from the source (`budget=10, N=20`, stepping N by 1):

   ```
   N=30 → budget=20 · N=40 → budget=30 · N=50 → budget=40 · N=60 → budget=50 · N=61 → budget=51  ← breach
   ```

   **Dragging the Harmonics slider from 20 to 61 — 41 ticks, one gesture — puts the app out of contract.** The Harmonics slider's own `:max="100"` means the drag can reach `budget ≈ 90`.

**Consequences, ranked.**
- `/api/equations/simplify` 422 → swallowed at `EquationView.vue:143` → the LaTeX display **silently freezes** on stale output with no error surface. This is the failure the user actually meets.
- `/api/equations/compute` 422 → surfaced, but as a raw problem-detail string in the error banner (`EquationView.vue:229-234`), not as "your Display-terms value is too high".
- **It persists.** `useEquationCache.ts:32-34` writes `budget` into `sessionStorage` unvalidated, and `:25-30` reads it back with a bare `JSON.parse` and no range check. `EquationView.vue:174` (`if (!result.value) doCompute()`) then POSTs the poisoned `budget` **on first paint after reload, with zero user action**.

**A third ceiling.** The same server field is bounded three different ways in this codebase, with no shared constant: **50** (server, `equations.py:23,40`), **2 … up-to-100** (this file, `:217`), **20** (`components/visualization/EquationPanel.vue:99` — `:min="2" :max="20"`, the co-consumer of `/simplify`). Two clients, two ceilings, neither equal to the contract.

**Falsifier (survived).** This dies if (a) `lib/equation/api.ts` clamps, (b) `lib/api.ts` retries/coerces on 422, (c) the server's `le` is higher than 50, or (d) FastAPI coerces rather than rejects. Checked: `api.ts:24-54` is a pass-through with zero arithmetic; `lib/api.ts:172-182` retries only on **429**; `equations.py:23,40` are both `le=50`; pydantic `Field(le=…)` rejects, it does not clamp. **CONFIRMED.**

**Discharge shape.** One exported constant per operation field, imported by both clients and asserted against the pydantic model in a contract test. This is the R6-8 operation↔client-leaf coupling made concrete: `budget` is a leaf whose bounds live only in Python.

---

### C-2 · BLOCKER — the auto-harmonics toggle has no accessible name, and the tooltip that is its only explanation is unreachable in the exact state where it is needed

**Provenance** `FunctionInput.vue:188-211`.

```vue
<Tooltip side="bottom">
    <Button variant="glass" size="icon"
            :class="{ 'is-auto-active': autoHarmonics }"
            :disabled="!effectiveN" @click="toggleAuto">
        <Wand2 class="h-4.5 w-4.5" />
    </Button>
    <template #content> …Auto (Parseval's theorem)… </template>
</Tooltip>
```

**Claim (a) — empty accessible name.** The button's entire content is one `lucide-vue-next` `<svg>`; there is no text node, no `aria-label`, no `aria-labelledby`, no `title`. The tooltip does **not** supply a name: `reka-ui@2.9.10` `dist/Tooltip/TooltipTrigger.js:88` sets `"aria-describedby": rootContext.open.value ? contentId : undefined` — a *description*, and only while open. Accessible name computation therefore terminates empty → WCAG 2.1 **4.1.2** failure, axe `button-name`.

**Claim (b) — the tooltip is dead while disabled.** The compiled glass-ui `Button` base cva (`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js`) begins `btn-pill tap-squish focus-ring … disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled`, and the component forwards `disabled: u.disabled` through `mergeProps` into `Primitive` whose `as` defaults to `"button"` — i.e. a native `<button disabled>` **plus** `pointer-events: none`. No `pointerenter`/`focus` reaches reka-ui's trigger. `:disabled="!effectiveN"` (`:193`) is exactly the "nothing has been computed yet" state — the first-run state, where an unlabelled wand icon most needs its explanation.

**Claim (c) — nothing would catch it.** `@axe-core/playwright` is wired only in `web/e2e/visualization-ux.spec.ts` and `visualization-crud.spec.ts`, and the sole `page.goto` in the axe spec is `visualization-ux.spec.ts:47 → "/visualize"`. `/equation` appears **only** in `e2e/visual-baseline.spec.ts:34` — a screenshot capture whose one assertion is a horizontal-overflow gate. The equation route has never been scanned.

**Falsifier (survived).** Dies if lucide emits a `<title>`, if glass-ui's `Button` injects a name from tooltip context, if the variant used `aria-disabled` instead of the native attribute, or if some axe run covers `/equation`. Checked all four against the installed dists and the e2e tree: none hold. **CONFIRMED.**

*(Sibling note, not double-counted: the icon-only `Button` at `EquationView.vue:276-280` has the same nameless shape. Same route, same blind spot.)*

---

## §2 · MAJOR

### C-3 · MAJOR — the Display-terms slider renders a clamp it never commits, so the displayed value and the value sent to the API diverge

`FunctionInput.vue:216` binds `:model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"`. The `Math.min` is **display-only** — no write-back path exists; the sole writer is `@update:model-value="budget = $event"` (`:219`), which fires only on user interaction.

Concrete divergent state, reachable with no exotic input: reload with `sessionStorage["eq-tab-state-v2"].budget = 60` (C-1 shows how it gets there) while `vizHarmonics` restores to 20. `EquationView.vue:151` `watch(vizHarmonics, …)` is **not** `immediate`, so it does not fire at mount. Result: the slider reads **20** with `max=20`, the model holds **60**, and `EquationView.vue:110` POSTs **60**.

**Falsifier.** Dies if the watch were `{ immediate: true }`, if the component emitted the clamp on mount, or if `budget` were clamped at load. `EquationView.vue:151-159` has no `immediate`; `useEquationCache.ts:25-30` has no validation; FunctionInput has no `onMounted`/`watchEffect`. **CONFIRMED.**

### C-4 · MAJOR — rejected domain input leaves the field showing text the model does not hold, and Vue will not repaint it

`FunctionInput.vue:57-60`:

```ts
function onDomainInput(e: Event, setter: (v: number) => void) {
    const val = parseDomainValue((e.target as HTMLInputElement).value);
    if (val !== null) setter(val);       // ← null ⇒ nothing happens at all
}
```

Both domain fields are **`:value`-bound, not `v-model`** (`:120-121`, `:132-133`). On a rejected parse the model is untouched, so `formatDomain(domainStart)` re-evaluates to the *same string as the previous render*; Vue's `patchDOMProp` diffs the new vnode prop against the **previous vnode prop** — not against the live DOM — so it skips the assignment and the user's rejected text stays on screen indefinitely. The user sees `foo` in the Domain field, presses Compute, and gets a series for the old domain with no indication of the rejection.

**Falsifier.** Dies if the binding were `v-model` (which force-syncs), if a `@blur` reset existed, or if Vue re-set `el.value` on identical props. Read the template — neither exists; and Vue 3.5's DOM-prop patch is prev-vnode-diffed by construction. **CONFIRMED.**

### C-5 · MAJOR — glass-ui ships `Input`; this file hand-rolls three raw `<input>`s with the same recipe pasted three times

`@mkbabb/glass-ui@4.0.0` exports `./forms` → `export * from "./components/ui/input"` (`dist/forms.d.ts:1`), and `dist/components/ui/input/Input.vue.d.ts` types exactly the props this file needs: `modelValue`, `type`, `placeholder`, `autocomplete`, `disabled`, `readonly`, `pattern`, `inputmode`, `class`. `./label` and `./number-field` ship too.

This file instead renders three bare `<input>`s (`:98-111`, `:116-127`, `:129-139`), each carrying a hand-written 6-declaration Tailwind recipe — `fira-code bg-muted/40 border-[1.5px] border-border/50 text-foreground outline-none transition-colors focus:border-primary/50` — **duplicated verbatim three times** (`:103-107`, `:122-125`, `:134-137`). Two of the three differ only in width (`w-full` vs `w-20`), so the divergence is pure copy.

Consumption cost: (i) the file re-implements the design system's focus/border/disabled behaviour by hand, so it silently drifts from `Input`; (ii) the tri-package uplift (`glass-ui 4→7`, CENSUS:184) will re-derive these token names by hand rather than inheriting them; (iii) `Input` already exposes `modelValue`, which is the structural cure for **C-4**.

**Falsifier.** Dies if `Input` were absent from 4.0.0 or lacked a text mode. Enumerated the 80 export subpaths of the installed package and read the `.d.ts` — `Input` is present with `type?: InputHTMLAttributes["type"]`. **CONFIRMED.**

### C-6 · MAJOR — selected/pressed state is class-only, contradicting the canonical `aria-pressed` pattern this repo documents and implements in eight sibling components

Three toggle-shaped controls in this file express state through classes alone:
- preset pills — `:class="{ 'is-active': activePreset?.name === preset.name }"` (`:162`);
- auto toggle — `:class="{ 'is-auto-active': autoHarmonics }"` (`:192`);
- notation pills — `:class="{ 'notation-active': modelValue === opt.value }"` (`NotationPills.vue:23`).

`lib/equation/notation.ts:5-8` — the file that *feeds* those pills — states the intended pattern in prose: *"matching the `.basis-toggle` pattern from BasisSelector (glass-ui `<Button variant="outline" size="sm">` with `aria-pressed` driving an instance-scoped tint)"*. The tree implements that pattern **eight times**: `BasisSelector.vue:144` (+ selectors at `:269,:274`), `GallerySearchBar.vue:70,120` (+ `:218`), `GalleryCard.vue:140`, `GalleryCardModal.vue:114,163,173` (+ `:241`), `CanvasOverlayButton.vue:20`. This file is the documented-but-unfollowed exception.

Two costs, both consumption-shaped: (i) AT users get no pressed state on eleven controls (8 presets + 3 notation modes) plus the auto toggle; (ii) glass-ui's `Button` cva ships `aria-pressed:` styling for **every** variant used here — `outline` carries `aria-pressed:bg-accent aria-pressed:text-accent-foreground`, `glass` carries `aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]` (`dist/button-BNDWhAZb.js`) — and all of it is left on the table while the consumer re-paints the same states by hand.

**Falsifier.** Dies if `aria-pressed` were present anywhere in this file, or if the variants lacked `aria-pressed:` hooks. `grep -n aria-pressed FunctionInput.vue NotationPills.vue` → 0; the cva string carries the hooks. **CONFIRMED.**

### C-7 · MAJOR — `autoHarmonics` is a hand-rolled v-model in a component that uses `defineModel` six times for the identical pattern

`:25-30` declare six `defineModel`s. `:13-18` then declares `autoHarmonics?: boolean` as a plain optional prop and `:21` a matching `"update:autoHarmonics": [value: boolean]` emit — which is, byte for byte, what `defineModel<boolean>("autoHarmonics")` compiles to. The parent even binds it as one: `EquationView.vue:207` `:auto-harmonics="autoHarmonics"` + `:209` `@update:auto-harmonics="autoHarmonics = $event"` — a `v-model:auto-harmonics` written the long way on both ends.

Two live consequences beyond the asymmetry: (i) `toggleAuto()` (`:32-34`) computes `!props.autoHarmonics`, and with the prop optional-and-defaultless an unbound mount emits `true` on the *first* click regardless of intent; (ii) the write path is split — five models write through `.value`, one writes through `emit`, and `:186` mixes both in a single handler (`nHarmonics = v; emit('update:autoHarmonics', false)`).

**Falsifier.** Dies if `autoHarmonics` needed one-way semantics. It does not — the parent round-trips it, and the component both reads and writes it. **CONFIRMED.**

---

## §3 · MINOR

### C-8 · MINOR — the Harmonics slider exposes half the operation's range
`FunctionInput.vue:184` caps at `:max="100"`; `api/models/equations.py:20` accepts `n_harmonics: int = Field(default=20, ge=1, le=200)`. `ge=1` matches `:min="1"`; the ceiling silently forfeits 101–200. Falsifier: a client-side perf guard justifying 100 — none is documented anywhere in the file, and `n_eval_points` is separately hard-coded to 500 (`EquationView.vue:108`, within `ge=50, le=5000`), so the guard, if intended, is unstated.

### C-9 · MINOR — `parseDomainValue`'s grammar is narrower than its docstring
`:43` advertises `"pi", "π", "2π", "-pi/2", "3.14"`. `:47`'s regex `^([+-]?\d*\.?\d*)\*?pi(?:\/(\d+))?$` additionally rejects, silently (→ C-4): fractional denominators (`pi/2.5`), trailing-coefficient form (`pi*2`), any sum (`pi/2 + 1`), and any negative denominator. Falsifier: if `@change`-time rejection surfaced an error, this would be cosmetic — it does not (`:59`).

### C-10 · MINOR — falsy guards on numeric API fields treat `0` as "absent"
`:205` `v-if="effectiveN"` and `:207` `v-if="energyCaptured"` and `:193` `:disabled="!effectiveN"`. `effective_n` and `energy_captured` are plain `int`/`float` on the response (`equations.py:34-35`); a genuine `0` (a null series, a fully-degenerate spline tier) renders as "no data" and disables the toggle. Falsifier: if the server guaranteed `≥1` — `equations.py:35` carries no `Field(ge=…)`.

### C-11 · MINOR — one barrel import inside an otherwise all-subpath closure
`CollapsibleSection.vue:2` imports `{ Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mkbabb/glass-ui'` while every other site in this closure uses a subpath: `FunctionInput.vue:3` `/button`, `SliderControl.vue:23` `/slider`, `Tooltip.vue:13-17` `/tooltip`, `NotationPills.vue:2` `/button`. `./collapsible` is an exported subpath of the installed 4.0.0 (verified against the 80-entry export map), so the barrel is a free inconsistency — and the 4→7 uplift's rename surface is per-subpath, so the barrel is the one line in this closure that will need bespoke handling. Falsifier: Rollup does tree-shake ESM re-export barrels, so the *bytes* cost is likely nil — the cost booked here is uplift-surface consistency, not weight.

### C-12 · MINOR — three unnecessary `!important`s that also kill the variant's hover feedback
`:251-253`. Compiled proof from `web/dist/assets/EquationView-BCeos_0P.css`:

```css
.is-auto-active[data-v-6d12defe]{color:var(--viz-amber)!important;border-color:…!important;background:…!important}
.preset-pill.is-active[data-v-6d12defe]{background:…;border-color:…;color:…}   /* no !important — and it wins */
```

The sibling rule in the same file, against the same `Button` variants, wins with no `!important`: SFC scoped styles are **unlayered** while Tailwind v4 utilities are emitted inside `@layer utilities` (verified present in `dist/assets/index-57FkGzlZ.css`), and unlayered beats layered regardless of specificity. Beyond redundancy, the `!important` trio **outranks the `glass` variant's own `hover:` and `active:` declarations**, so the button loses all interaction feedback precisely while auto is engaged. Falsifier: if glass-ui's hover rules were themselves `!important` or unlayered — the cva string shows plain `hover:`/`active:` utilities.

---

## §4 · INFO

### C-13 · INFO — the route has screenshot coverage and nothing else
`/equation` appears once in the e2e tree: `e2e/visual-baseline.spec.ts:34`, a capture spec whose only assertion is a ±2px horizontal-overflow gate (`:62-67`). No spec types an expression, applies a preset, drags a slider, or exercises the domain parser. The one `Harmonics` control the e2e suite does touch is BasisSelector's, on a different route (`settings-persistence.spec.ts:68-70`). C-1 through C-4 are all invisible to CI by construction.

### C-14 · INFO — the six `defineModel` defaults are dead
`:25-30` declare defaults (`""`, `0`, `2π`, `20`, `10`, `"trig"`); the sole parent binds all six (`EquationView.vue:199-204`) and seeds its own defaults from cache (`:25-30`). Two default sets for one state, only one of which can ever apply. Harmless today; a divergence trap the moment a second parent appears.

### C-15 · INFO — `formatDomain` writes its own 4-dp truncation back into the field
`:77` `val.toFixed(4).replace(/\.?0+$/, "")`. A typed `3.14159` parses and stores exactly, then re-renders as `3.1416` — and because that *is* the bound `:value`, the field now holds the truncation. The model keeps full precision until the next edit, at which point the user's baseline is the rounded string. (The π-rational fast paths at `:64-76` are correct and pleasant; the tolerance `1e-10` against a `1e-6` matching tolerance in `activePreset` (`:84-85`) is a deliberate, defensible asymmetry.)

---

## §5 · SUPERLATIVES (L-18, both ways)

### S-1 · SUPERLATIVE — zero value.js coupling: this component contributes nothing to the F.W2 migration surface
`CENSUS-2026-08-03.md:38` fixes the live value.js surface at **5 import statements / 4 files / 6 symbols, easing-only** — `lib/easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`. FunctionInput, the equation tab's *primary* control surface at 261 LOC, is on none of them: `grep -n "value.js" FunctionInput.vue SliderControl.vue CollapsibleSection.vue` → **0 hits**. The largest interactive component on the route sits entirely off the `0.13 → 4.0` critical path. **Falsifier:** any transitive value.js pull through the closure — the closure's only third-party imports are `@mkbabb/glass-ui/*`, `lucide-vue-next`, and `vue`. Holds.

### S-2 · SUPERLATIVE — color consumption is already at the F.W2 target posture
Every colour in this file is a CSS custom property composed with `color-mix()`: `:185`, `:218` (`color="var(--viz-fourier)"` into `SliderControl`'s `--track-color` hook at `SliderControl.vue:89,143-148`), and `:236-238`, `:245-247`, `:251-253`. **Zero** calls into `lib/colors.ts` — whose `cssVarToHex`/`hslToHex`/`rgbToHex` arms (`colors.ts:22-74`) are exactly the hand-rolled colour math F.W2 must retire, and which are themselves `getComputedStyle`-dependent and regex-fragile. FunctionInput needs no part of that retirement: it is theme-reactive for free, light/dark included (`style.css:113-125` re-tints `--viz-amber` per scheme and this file inherits it with no JS). **Falsifier:** any `VIZ_COLORS` / `cssVarToHex` import, or any hex literal — `grep -nE "VIZ_COLORS|cssVarToHex|#[0-9a-fA-F]{3,6}" FunctionInput.vue` → **0**. Holds.

### S-3 · SUPERLATIVE — `notation` is the one field on this form whose client type, option table, and server contract agree exactly
`NotationMode = "trig" | "exponential" | "polar"` (`lib/equation/types.ts:1`) ↔ `NOTATION_OPTIONS` values (`lib/equation/notation.ts:15-17`) ↔ the server's `pattern=r"^(trig|exponential|polar)$"` on **both** operations (`equations.py:22,41`). `defineModel<NotationMode>("notation")` (`:30`) carries the union end-to-end into `NotationPills`' typed prop and emit (`NotationPills.vue:7,11`) with no widening and no cast. Set against C-1 and C-8 — where `budget` and `n_harmonics` bounds are triplicated by hand and disagree — `notation` is the proof that this codebase *can* keep an operation leaf honest: it does so wherever the contract is a **type** and fails wherever the contract is a **number**. That is the generalizable lesson for R6-8. **Falsifier:** a widening cast on the notation path — the one cast in the closure is `api.ts:49` `notation as SimplifyRequest["notation"]`, which *narrows* `string` back to the union at the call boundary, not widens. Holds.

### S-4 · SUPERLATIVE — the component consumes its three local adapters through their APIs and never reaches past them into reka-ui
`lane-frontend.md:371` rules the three `components/ui/` wrappers "thin API-shape adapters, not shadows — keep." This file is the strongest evidence for that verdict: it consumes `CollapsibleSection` (title/subtitle/default-open), `SliderControl` (scalar `modelValue` + `color`), and `Tooltip` (`text`/`side`/`#content`) purely through their declared surfaces, and the entire closure contains **zero** `from "reka-ui"` imports — the single hit is a prose comment at `SliderControl.vue:51`, exactly as `lane-frontend.md:70` measured. The adapters carry their own migration provenance in-file (`SliderControl.vue:3-20` P.W5/A.W3.b, `Tooltip.vue:2-12`, `CollapsibleSection.vue:57-59` A.W3.d), and the substrate they lean on is real: `@keyframes collapsible-open` is present at `@mkbabb/glass-ui/dist/styles/animations.css:18` and reaches this route via `src/style.css:3` `@import "@mkbabb/glass-ui/styles"`, with `--ease-out` resolving through `--motion-ease-out: cubic-bezier(0,0,.2,1)` in the built CSS. Every glass-ui-facing seam that *could* have been broken here is intact. **Falsifier:** a missing keyframe or an undefined `--ease-out` would have made `CollapsibleSection.vue:61-64` invalid-at-computed-value-time and killed the animation silently — checked both in the installed dist and the built bundle. Holds.

---

## §6 · Consumption ledger (per dependency)

| Dependency | Pinned / installed | This component's consumption | Verdict |
|---|---|---|---|
| `@mkbabb/value.js` | `^0.13.0` / 0.13.0 | **none** (0 imports, direct or transitive) | **S-1 · off the F.W2 critical path** |
| `@mkbabb/keyframes.js` | `^4.3.0` / 4.3.0 | none directly; motion is CSS `transition-colors` (`:106,:125,:137`) + the adapter's `collapsible-*` keyframes | clean — no keyframes API surface to migrate |
| `@mkbabb/glass-ui` | `^4.0.0` / 4.0.0 | `Button` ×3 callsites (`:143,:158,:189`), 3 variants (`default`/`outline`/`glass`), 2 sizes (`sm`/`icon`); via adapters: `Slider`, `Collapsible*`, `Tooltip*`; `TooltipProvider` correctly hoisted to `App.vue:23` | **C-5** (`Input` unconsumed) · **C-6** (`aria-pressed:` hooks unused) · **C-12** (`!important` fights the variants) · **C-11** (one barrel) |
| fourier API (45-op surface) | — | no direct calls; **encodes** the bounds of 2 operation leaves (`budget`, `n_harmonics`) as slider `min`/`max` | **C-1 (BLOCKER)** · **C-8** — R6-8 coupling with the contract living only in `api/models/equations.py` |
| props/emits contract | — | 6 `defineModel` + 4 props + 2 emits | **C-7** (asymmetric v-model) · **C-3** (unwritten display clamp) · **C-14** (dead defaults) |
| integration seams | — | sole parent `EquationView.vue:198-211`; sessionStorage round-trip | **C-1** (unvalidated cache restore) · **C-3** (non-immediate clamp watch) · **C-13** (no interaction coverage) |

---

## §7 · Disposition (for the wave planner, non-binding)

1. **C-1** — one shared bounds module per operation leaf + a contract test against the pydantic `Field`s; validate on cache read. Blocks any claim that `/equation` is green.
2. **C-2** — `aria-label` on the wand button; move the tooltip trigger outside the disabled surface (or use `aria-disabled` + a no-op handler). Then extend the axe spec to `/equation` so it stays fixed.
3. **C-6** + **C-12** — adopt `:aria-pressed`, delete the three `!important`s, let the glass-ui variants paint the state. Folds into the F.W3 chip migration (`lane-frontend.md:441`) at 1 line, not 6 (see §0).
4. **C-5** + **C-4** — adopt `@mkbabb/glass-ui/forms`' `Input` with `v-model`; the model binding structurally cures the rejected-input desync.
5. **C-3**, **C-7** — commit the clamp; promote `autoHarmonics` to `defineModel`.
