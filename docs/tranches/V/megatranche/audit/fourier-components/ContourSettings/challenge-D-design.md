claude-opus-5[1m] (served model id)

# CHALLENGE · `ContourSettings.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourSettings.vue` (470 lines)
**Substrate** fourier `m/w1-bump-migration`, HEAD `cd26c65` / tree `9a66411d` — the exact tree the intake lane
re-verified (`lane-fourier-r3-r6.md` R4-9, X-4). glass-ui **installed 4.0.0** (`web/node_modules/@mkbabb/glass-ui/package.json:3`),
producer **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier,
**including the superlatives** (L-18 runs both ways).
**Writes** this file only. `fourier-analysis` and `glass-ui` were read-only throughout.

**Read whole**: the SFC; `stores/workspace.ts` (471); `lib/defaults.ts`; `lib/colors.ts`; `lib/api-problem.ts`;
`components/ui/SliderControl.vue` (150); `components/ui/tooltip/Tooltip.vue` (38); `lib/api.ts` (throw paths);
`VisualizationView.vue` (mount context); `e2e/visualization-ux.spec.ts` + `e2e/contour-extraction.spec.ts` (the gates);
and the glass-ui surfaces it consumes at BOTH pins — installed `dist/{configurator.js,useConfiguratorState-*.js,
SelectScrollDownButton-*.js,button-*.js,slider-*.js,components/ui/slider/index.d.ts,styles/**}`, producer
`src/components/{configurator,select,slider}/*`.

---

## §0 — Corpus fold (what I inherit; where I contradict)

| Inherited | Source | Use here |
|---|---|---|
| ContourSettings = **6 Tooltip callsites** (of 35 over 9 consumers) | intake `R3-7a` (CARRY → F.W3) | **CORROBORATED EXACTLY** — lines 194, 229, 242, 268, 281, 294. B-2 below is the *quality* verdict on those 6 that R3-7a's count could not reach. |
| The 4→7 break surface = metric-badge ×7 files · hover-card ×2 · hover-popover ×2 · dock members ×3 · `ToastVariant` | CENSUS §3a / `lane-frontend.md` §5 | **This component touches NONE of them** — see S-5. Its only rename cost is line 20. |
| `lucide-vue-next → @lucide/vue`, 35 sites | `lane-frontend.md` §5 | 1 of the 35 is line 20 (4 symbols). |
| 3 local `components/ui/` files are "thin API-shape adapters, not shadows — keep" | `lane-frontend.md` §3 verdict | **CONTRADICTED for `SliderControl.vue`** — see B-1. The adapter is not thin, it is *disconnected*: its entire retint layer addresses tokens that do not exist at the installed pin. |
| The 3.1→4.0 WT bump is "a pure rename sweep, no logic — 24 files, 46±46 lines" | `lane-frontend.md` §5 prior-art | **CONTRADICTED.** The rename swept the `variant=` attribute (9 sites) but **not** the CSS custom-property half. B-1 is the residue. The prior-art rate under-states the true 3.1→4.0 cost by at least one dead retint layer, which re-prices the F.W1 estimate. |
| Reduced-motion coverage: `ContourSettings.vue:370` counted as one of 8 `reduce` blocks | `lane-frontend.md` §8 | **PARTIALLY CONTRADICTED** — the block is real and correct, but it covers only 1 of the file's 3 motion surfaces (m-4). |
| "8 routes, all lazy" → corrected to 9 route records | CENSUS addendum item 3 (X-2) | Not load-bearing here; noted for consistency of citation. |

---

## §1 — BLOCKERS (2)

### B-1 · The panel has **no colour identity**: all five `:color` bindings paint nothing
**Severity BLOCKER** · `ContourSettings.vue:236, 249, 275, 287, 301` → `components/ui/SliderControl.vue:138-146`

Every slider is bound `:color="VIZ_COLORS.amber"` (five callsites). `SliderControl` projects that onto the track via

```
.slider-track-host {                              /* SliderControl.vue:139-146 */
    --slider-scrub-track-height: 16px;
    --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 25%, transparent);
    --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 35%, transparent);
    --slider-scrub-thumb-bg:        var(--track-color);
    --slider-scrub-thumb-bg-hover:  var(--track-color);
}
```

**No `--slider-scrub-*` custom property exists anywhere in glass-ui 4.0.0.** Exhaustive probe over the whole installed
package — `grep -ro -- "--slider-[a-z-]*" node_modules/@mkbabb/glass-ui/dist | sort -u` — returns exactly ten names:
`--slider-range-bg · --slider-range-blur · --slider-range-shadow · --slider-thumb-bg · --slider-thumb-border-color ·
--slider-thumb-shadow · --slider-thumb-size · --slider-thumb-spring · --slider-track-bg · --slider-track-height`.
The literal string `scrub` survives in dist only inside `timeline.js`, `scale-paper.css`, and three `.d.ts` prose blocks.

Consequence, compounded: the `standard` variant the WT bump migrated to
(`dist/components/ui/slider/index.d.ts` — *"the CONTINUOUS GLASS CYLINDER with **NO VISIBLE THUMB AT ALL** … the reka
`<SliderThumb>` STAYS MOUNTED … but paints INVISIBLE: width 0, opacity 0, transparent"*) has **no thumb to tint**. So even
the correctly-spelled `--slider-thumb-bg` would not restore the intended amber handle. Both halves of the retint —
geometry (`16px` vs the `md` rung's 20px) and colour — are inert. Five contour sliders paint the library-default
`--primary` glass cylinder, identical to every other slider in the app.

*Falsifier* — produce one occurrence of any `--slider-scrub-*` token in `@mkbabb/glass-ui@4.0.0`'s shipped surface
(`dist/*.js`, `dist/glass-ui.css`, `dist/styles/**`), or one selector at that pin that reads `--track-color`. Neither exists.

*Uplift note* — **7.0.0 does NOT cure this.** Producer `src/components/slider/*` uses the same `--slider-range-bg` /
`--slider-thumb-bg` family (plus `--slider-range-origin`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-*`);
still zero `scrub`. F.W1 must budget the retint rewrite explicitly — the bump will not absorb it.

### B-2 · The panel's entire explanatory layer is hover-only — 5 of 6 tooltips hang on non-focusable wrappers
**Severity BLOCKER** · `ContourSettings.vue:229-239, 242-252, 268-278, 281-291, 294-304` · `components/ui/tooltip/Tooltip.vue:25-27`

`Tooltip.vue` renders `<TooltipTrigger as-child><slot/></TooltipTrigger>`. reka-ui's `TooltipTrigger`
(`node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js:24`) defaults `as: "button"` — `as-child` **replaces** that button
with the slotted child and adds no `tabindex`. The five slider tooltips slot `<SliderControl>`, whose root is
`div.slider-control` (`SliderControl.vue:72`) — a plain, non-focusable `<div>`.

Therefore the four sentences that are the panel's **only** documentation of what each control does —
`"Saliency cutoff — lower values capture more background detail"`, `"Soften before tracing…"`,
`"Ignore tiny contours…"`, `"How many outlines to keep…"`, `"Iron out jagged edges…"` — are unreachable by keyboard and
never announced: the `aria-describedby` reka attaches on open lands on the wrapper `<div>`, not on the reka
`SliderRoot`/`SliderThumb` that actually holds focus (`SliderControl.vue:85-93`). A keyboard or AT user arrowing the
"Min Area %" slider gets the name `"Min Area %"` and nothing else. The **sixth** tooltip (line 194) is the only conformant
one — it wraps a real `<Button>`.

This is not a nit: the six parameters are opaque image-processing knobs ("Blur Sigma", "Min Area %", "Smoothing"), and the
microcopy that makes them usable (S-1, genuinely the best in the tree) is delivered exclusively through a hover channel.

*Falsifier* — show that reka `TooltipTrigger` with `as-child` injects `tabindex="0"` onto a non-interactive child, or that
`div.slider-control` carries a tabindex/role. `SliderControl.vue:72-95` has neither, and reka's trigger only merges
`data-state`/`aria-describedby`/pointer+focus handlers.

*Cure lives at the current pin* — `ConfiguratorRow` ships `description?: string` (rendered as a `<p class="text-micro …">`
below the control) at **both** 4.0.0 (`dist/components/custom/configurator/ConfiguratorRow.vue.d.ts`, `__VLS_Props.description`)
and 7.0.0 (`src/components/configurator/ConfiguratorRow.vue:105,150`). Moving the four sentences from hover to persistent
row descriptions removes the a11y defect *and* the tooltip callsites — which also discharges 5 of R3-7a's 35-callsite
F.W3 migration budget instead of migrating them.

---

## §2 — MAJOR (9)

### M-1 · The Reset control is *pseudo*-disabled: 1.39:1, a 25 %-opacity focus ring, and keyboard-reachable while mouse-inert
`ContourSettings.vue:195-204, 387-405` (esp. `199` and `399-402`)

```
.reset-icon-btn.is-default { opacity: 0.25; pointer-events: none; }   /* :399-402 */
```
The `<Button>` carries **no `disabled`** — only a class. Three consequences, all token-decidable:

1. **Contrast.** `color: var(--muted-foreground)` (`:394`) = `--neutral-5` = `hsl(30 22% 40%)`
   (`dist/styles/tokens/color-radius.css:45,85`) composited at α=0.25 over `--background` = `--neutral-0` =
   `hsl(40 30% 98%)` (`:40,57`) → sRGB ≈ `#DBD5CE`, relative luminance 0.674 → **1.39 : 1** against the page.
   WCAG 1.4.11 requires 3:1 for a graphical control indicator. The *disabled* exemption does **not** apply, because the
   control is not disabled — it is pointer-suppressed.
2. **Focus.** `opacity` applies to the element's whole rendered box including the `focus-ring` outline the glass Button
   base emits (`button-BNDWhAZb.js`, CVA base `"btn-pill tap-squish focus-ring …"`). The focus indicator is therefore
   painted at 25 % — 2.4.7 / 2.4.11 fail.
3. **Interaction model.** The button stays in the tab order and Enter/Space still fires `resetDefaults()`
   (`@click.stop`, `:201`) — pointer users cannot reach a control keyboard users can. Its tooltip (`:194`) also cannot
   open, because `pointer-events: none` suppresses the trigger's own hover.

*Falsifier* — a `disabled` binding on line 195-202 (there is none), or evidence that glass-ui's `Button` sets
`aria-disabled`/`tabindex="-1"` from a class (it forwards only the `disabled` prop: `button-BNDWhAZb.js` `d = t(() => ({type, disabled}))`).
*Cure* — `:disabled="isDefault"`, which the primitive already forwards, plus deletion of the whole `.is-default` rule.

### M-2 · "Retry" always re-runs contour extraction — but the banner renders for **every** workspace error
`ContourSettings.vue:311-317` · `stores/workspace.ts:128, 184, 227, 256, 278, 303, 332, 362, 386, 403`

`store.error` is one global `ref<string|null>`. Ten call sites write it, including `"Upload failed"` (:128),
`"Failed to load workspace"` (:184), `"Failed to save contour"` (:278), `"Failed to save visualization"` (:362),
`"Failed to update visibility"` (:386), `"Failed to delete visualization"` (:403). The Contour panel renders its banner
on **any** of them (`v-if="store.error"`) and offers one verb — `@click="runCompute"` — which re-extracts the contour and
recomputes epicycles/bases. For at least six of the ten sources that is the wrong remediation: it cannot fix a failed
delete, it silently discards the actual failure, and it issues three fresh network round-trips.

*Falsifier* — a contour-scoped error field on the store, or a guard on the banner. Neither exists; `error` is declared once
at `workspace.ts:51` and exported bare at `:441`.

### M-3 · The in-flight state is **structurally unreachable** — the panel has no busy affordance at all
`ContourSettings.vue:104-137` (esp. `108`), `313-316`, `450-453`

```
async function runCompute() {
    if (!store.imageMeta) return;
    store.beginCompute();
    store.error = null;          // :108 — SYNCHRONOUS, before any await
```
`store.error = null` executes before the first `await`, so the banner's `v-if` flips false in the same tick the user clicks
Retry. The banner (with a 150 ms `slide-down` leave, `:459-461`) unmounts. But the **only** two elements bound to
`store.computing` — `:disabled` (`:313`) and `class="animate-spin"` (`:314`) — live *inside* that banner. Their states are
therefore never painted; `.retry-btn:disabled` (`:450-453`) is dead CSS.

Wider: across a debounced-1 s → `extractContour` → `Promise.allSettled([computeEpicycles, computeBases])` round trip
(`:126-131`) the panel shows **nothing**. No spinner, no skeleton, no `aria-busy`, no disabling of the six controls the
user is still free to drag. `store.computing` is consumed elsewhere in the view only to *mount* `CoefficientsPanel`
(`VisualizationView.vue:273`) — a different pane. State coverage: idle ✅ · error ✅ · **loading ✗** · empty (n/a, see §5).

*Falsifier* — any `store.error` clear that happens after an `await`, or one `computing`-bound node outside the
`v-if="store.error"` subtree in this file. `grep -n "computing" ContourSettings.vue` → lines 313, 314 only.

### M-4 · The error banner is silent to assistive tech
`ContourSettings.vue:310-317`

An async failure inserts a `<div class="retry-banner">` with no `role="alert"`, no `aria-live`, no `role="status"`, and no
focus move. Wrapped in a `<Transition>`, it is a purely visual event. A screen-reader user who changed "Blur Sigma" and
waited gets no signal that the recompute failed — and the sole recovery control is inside the region they were never told about.

*Falsifier* — a live-region attribute anywhere in `:310-318`. There is none.

### M-5 · "Advanced" — the collapsible's only label and only control — resting contrast **2.50 : 1**
`ContourSettings.vue:258-261, 336-352`

```
.advanced-trigger { color: color-mix(in srgb, var(--foreground) 40%, transparent); }   /* :345 */
.advanced-trigger:hover { … var(--foreground) 60% … }                                  /* :351 */
```
With `--foreground: hsl(24 10% 10%)` and `--background: hsl(40 30% 98%)`
(`dist/styles/tokens/color-radius.css:57,40,58`): 40 % over page → `#A2A09E`, L = 0.354 → **2.50 : 1**.
The element is `@apply text-sm` (`:342`) — normal-size text, so 1.4.3 AA demands 4.5:1; as a UI control label it also misses
the 3:1 floor. Hover (60 %) computes to **4.53 : 1** — i.e. the label becomes compliant *only under the pointer*, which is
precisely the state a keyboard user never reaches. `text-sm` + `letter-spacing: 0.03em` + `font-weight: 500` further thins
the stroke at the smallest optical size in the panel.

*Falsifier* — a different `--foreground`/`--background` pair in the shipped light arm, or a `background` on the layer body
that raises the effective ratio. The layer body is `configurator-layer-body px-3 py-2 space-y-2` with no background of its
own (`useConfiguratorState-kiIlun8I.js`); the glass tint applied by `.configurator-layer` would move the number by
hundredths, not close a 2.0 gap. Marked partially `UNPROVEN-NEEDS-LIVE (SS-13)` only for the exact glass-tinted backdrop.

### M-6 · Five per-instance overrides on `SelectTrigger` defeat the token chassis — including the WCAG-2.5.5 touch clamp
`ContourSettings.vue:211`

```
<SelectTrigger … class="w-full h-10 text-sm border-2 border-foreground/15 rounded-lg">
```
Against the shipped trigger recipe (`SelectScrollDownButton-C1jb3b3K.js`, `data-slot="select-trigger"`):
`"… flex w-full items-center justify-between rounded-pill px-3 py-2 text-dropdown …"` plus a size-driven
`h-(--control-h-md)`. `cn()` is tailwind-merge, so **every local class wins**:

| local | overrides | cost |
|---|---|---|
| `w-full` | already on the recipe | dead duplicate |
| `h-10` | `h-(--control-h-md)` | **the real defect** — see below |
| `text-sm` | `text-dropdown` (→ `--dropdown-text`, `theme/bridges.css:30`) | opts out of the control-font comfort register |
| `border-2 border-foreground/15` | `.control-surface` rest register | a 2 px hairline nothing else in the panel carries |
| `rounded-lg` | `rounded-pill` | a rounded-rect trigger inside a pill design language |

`--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` (`tokens/offsets-sizing.css:151`). Under
`@media (pointer: coarse)` the library lifts `--ui-scale → 1.5` and `--control-floor → var(--touch-target, 2.75rem)`
(`tokens/light-dark.css:18-21`), whose own comment names the intent: *"The WCAG-2.5.5 44px touch floor is enforced HERE …
so every scaled control-height `max(scaled, floor)` clamps at ≥ 44px"*. The literal `h-10` pins the trigger at 2.5 rem =
40 px on touch, where the system would have produced 3.75 rem = 60 px. On a fine pointer the override is a **no-op**
(2.5 rem ≡ 2.5 rem) — so it buys nothing and costs the touch floor.

*Falsifier* — show `cn` is not tailwind-merge (it is: `button-BNDWhAZb.js` imports `t` from `cn-DJXf4yaB.js` and applies it
as `cn(cva(...), props.class)`), or a coarse-pointer override elsewhere in fourier that restores the floor
(`grep -rn "control-floor\|ui-scale" web/src` → no hits).

### M-7 · Option descriptions are inside `SelectItemText` — the accessible name and typeahead string are label + full sentence
`ContourSettings.vue:218-223`

```
<SelectItem v-for="(desc, key) in strategyDescriptions" :key="key" :value="key">
    <div>
        <div class="font-medium">{{ strategyLabels[key] }}</div>
        <div class="text-xs text-muted-foreground max-w-[280px]">{{ desc }}</div>
    </div>
</SelectItem>
```
glass-ui's `SelectItem` — at **both** pins — wraps the **default** slot in reka `SelectItemText` and ships a **separate
`#description` slot** beside it inside a `flex flex-col gap-0.5 min-w-0` column
(4.0.0: `SelectScrollDownButton-C1jb3b3K.js`, `l("div", z, [u(v(w), …default…), _(a.$slots, "description")])`;
7.0.0: `src/components/select/SelectItem.vue:89-92`). It also accepts `textValue` (4.0.0 props list; 7.0.0 `:8,65`).

Because both rows are in the default slot: (a) the option's accessible name becomes e.g.
*"ML (Neural Net)U²-Net saliency model for subject isolation — best when subject blends with background"* (~95 chars);
(b) reka's typeahead matches against that whole string, so typing `s` can land on any option containing an "s" anywhere in
its description; (c) the chassis' `gap-0.5` inter-rung spacing is bypassed by the extra `<div>` wrapper (`:219`), so the
title/description rhythm is line-box default rather than the system's.

*Falsifier* — a `textValue` binding on line 218 (absent), or evidence that `SelectItemText` is not the name/typeahead
source. Both pins route the default slot through `RekaSelectItemText`.

### M-8 · Five of six controls bypass `ConfiguratorRow`; the panel-wide reset re-forks a shipped recipe
`ContourSettings.vue:191-206, 209-226, 229-304`

Only **Strategy** is wrapped in `<ConfiguratorRow>`. The five sliders are dropped bare into the layer body, so:
the Strategy field gets the row chassis (`flex flex-col gap-1.5 py-2`, a `<Label>` at the `text-small/500` register, and the
size axis), the sliders get their own `gap-0.25rem` + a `text-sm/500 --muted-foreground` label
(`SliderControl.vue:98-108, 111-117`). Two label registers and two block rhythms inside one section, arbitrated only by the
body's `space-y-2` (`useConfiguratorState-kiIlun8I.js`).

The comment at `:191-192` — *"ConfiguratorLayer has no header-actions slot, so the affordance lives at the top of the layer
body"* — is **true about the layer and irrelevant to the need**. `ConfiguratorRow` ships `canReset?: boolean` + a `reset`
emit and a canonical reset recipe at both pins (7.0.0 `ConfiguratorRow.vue:150-158`:
`h-6 w-6 rounded-pill text-muted-foreground/60 hover:bg-foreground/5` + `:aria-label="\`Reset ${label}\`"`). The file instead
hand-rolls a 19-line `.reset-icon-btn` (`:387-405`) that *undoes* the glass Button it imports (`border: none; background: none;`
→ kills `glass-wash`+`btn-glass`; `border-radius: 0.25rem` → overrides `btn-pill`), and pays a
`-mt-1 -mb-1` clawback (`:193`) to compensate for the chassis rhythm it is fighting. Per-field resets would also fix the
all-or-nothing semantics of the current global reset.

*Falsifier* — a `canReset` on `ConfiguratorRow` at 4.0.0 that is absent (it is present:
`dist/components/custom/configurator/ConfiguratorRow.vue.d.ts`, `canReset?: boolean` + `reset: () => any`), or scoped CSS
that loses to glass-ui's layers (scoped SFC styles are **unlayered** and therefore beat every `@layer` rule glass-ui ships).

### M-9 · Two shipped defaults are off their own step grid — and "Min Area %" contradicts its default's magnitude
`ContourSettings.vue:269-277, 295-303` · `lib/defaults.ts:11, 14`

| control | default | min/max/step | reachable by dragging? |
|---|---|---|---|
| Min Area % | `min_contour_area: 0.001` | 0 / 20 / **0.5** | **no** (grid = 0, 0.5, 1.0, …) |
| Smoothing | `smooth_contours: 0.03` | 0 / 1 / **0.05** | **no** (grid = 0, 0.05, 0.10, …) |
| ML Threshold | 0.5 | 0.1 / 0.9 / 0.05 | yes |
| Blur Sigma | 0.5 | 0 / 5 / 0.1 | yes |
| Max Contours | 24 | 0 / 50 / 1 | yes |

Once a user touches either off-grid slider, `isDefault` (`:61-68`) can **never** return true by manipulation — only the
Reset button restores it. The dimmed "you are at defaults" affordance (M-1) is therefore false almost always. Separately,
the label says **percent** while the default is `0.001` on a 0–20 scale: displayed as `0.0` (`:276` `toFixed(1)`), it reads
as "zero", and a single step to 0.5 is a **500×** jump in whatever unit the backend consumes. Either the label or the
default is wrong; the UI cannot express which.

*Falsifier* — a `step` that divides both defaults, or a unit annotation reconciling `0.001` with a 0–20 "%" axis. Neither
exists; `defaults.ts:11` is `min_contour_area: 0.001` and `:14` is `smooth_contours: 0.03`.

---

## §3 — MINOR (10)

| # | finding | provenance | falsifier |
|---|---|---|---|
| m-1 | `class="w-full"` on `<Select>` is **dropped**. reka `SelectRoot` renders `PopperRoot` whose slot here holds two children (`SelectTrigger` + `SelectContent`) ⇒ fragment root ⇒ no attribute inheritance, plus a dev-mode "Extraneous non-props attributes" warning. (The trigger is already `w-full`, so nothing is lost but the line is a lie.) | `:210`; `reka-ui/dist/Select/SelectRoot.js:145-147` | A single-element root on `SelectRoot`. At 7.0.0 it is *explicitly* `inheritAttrs: false` (`src/components/select/Select.vue:26`) — dead at both pins. |
| m-2 | `shortError`'s `"503"` branch is unreachable. `ApiProblem` sets `super(title)` so `e.message` is the problem **title**, never a numeric status; the store stores `e.message` verbatim. | `:81`; `lib/api-problem.ts:27`; `workspace.ts:256,303,332`; `lib/api.ts:182,194` | An API path whose `title` embeds `"503"`. `grep -rn "503" api/ --include=*.py` → only `dependencies.py:265` `detail=` and test rows; `detail` is not `message`. The `"fetch"` branch (`:82`) *is* live (browser `TypeError: Failed to fetch`). |
| m-3 | Double truncation of the failure text: JS slices at 60 chars + `…` (`:83`), then CSS ellipsizes a `white-space: nowrap` line (`:420-428`). No `title`, no expansion, no copy. The user can never read the whole error. | `:83, 312, 420-428` | A `title`/`aria-label` carrying the full message, or a wrapping banner. Neither. |
| m-4 | Motion coverage is inconsistent **inside one file**: `.advanced-content` is reduced-motion-gated (`:370-375`) but the `slide-down` banner transition (`translateY(-4px)`, `:456-469`) is not. | `:370-375` vs `:456-469` | A global `prefers-reduced-motion` rule reaching `.slide-down-*`. `style.css:92` gates only `[role="tabpanel"]`; glass-ui's `transitions.css` does not own these consumer-named classes. (`animate-spin` at `:314` is **not** counted — it is unreachable, M-3; it becomes a real reduced-motion defect the moment M-3 is cured.) |
| m-5 | The same control renders at **three** track widths in one panel: full-width (ML Threshold, Blur Sigma), half-width (Min Area %, Max Contours), and full-width again for the odd last child (Smoothing, via `:383-385`). Slider precision reads off track length, so three lengths imply three precisions that do not exist. | `:229-252, 266, 377-385` | A design note justifying the split. The `> :last-child:nth-child(odd)` rule is a layout-fallout hack, not an authored hierarchy. |
| m-6 | Dangling label: `ConfiguratorRow` renders `<Label>Strategy</Label>` with **no `for`** (documented upstream: *"No a11y for/id wiring"*), and the trigger's `aria-label` (`:211`) overrides it. **WCAG 2.5.3 PASSES** on the case-insensitive substring test ("Contour extraction strategy" ⊃ "strategy") — the defect is a dangling `<label>` element and a duplicated name, not a 2.5.3 failure. | `:209, 211`; `ConfiguratorRow.vue.d.ts` prose | Any `for`/`id` pairing. None; the upstream doc says so explicitly. |
| m-7 | `advancedOpen` is component-local (`:24`), and `VisualizationView` mounts ContourSettings in **both** arms of a `<Transition name="panel-swap" mode="out-in">` (`:253-270`) — so entering/leaving the contour editor destroys and recreates the instance and silently re-collapses "Advanced". | `:24`; `VisualizationView.vue:253, 260, 270` | Persisted disclosure state (store/`useSafeStorage`). Absent. |
| m-8 | Scoped margins restate/fight the chassis rhythm: `.retry-banner { margin-top: .5rem }` (`:412`) duplicates the body's `space-y-2`, and `.advanced-divider { margin-top: .25rem }` (`:329`) is **dead by margin collapse** against the same 0.5 rem. | `:329, 412`; body class `…space-y-2` in `useConfiguratorState-kiIlun8I.js` | A body class without `space-y-2`. It has it at 4.0.0 (`px-3 py-2 space-y-2`) and 7.0.0 (`py-2 space-y-2`). |
| m-9 | Two parallel `Record<string,string>` maps (`:41-48` labels, `:50-57` descriptions) with the **description** map driving the option list (`:218`). A strategy present in labels but not descriptions vanishes from the picker with no error. | `:41-57, 59, 218-220` | A single source of truth (`{key: {label, desc}}`). Not present. |
| m-10 | `CONTOUR_DEFAULTS.max_contours ?? 16` appears three times (`:36, 65, 74`) — a second, contradictory default (16 vs the declared **24**) behind a `??` that can never fire (`max_contours: number` at `defaults.ts:12`). Dead code that documents a wrong number. | `:36, 65, 74`; `defaults.ts:12` | A nullable `max_contours` in `lib/types.ts`. The field is written `max_contours: 24` and typed non-optional in `CONTOUR_DEFAULTS: ContourSettings`. |

---

## §4 — INFO (3)

- **i-1 · The component's only a11y gate is disabled on a premise that is FALSE at the installed pin.**
  `e2e/visualization-ux.spec.ts:133` is `test.fixme("keystone: ContourSettings Configurator-open is a11y-clean")`, justified
  at `:118-132` by *"glass-ui renders each collapsed layer body with `role="region" aria-hidden="true"` while keeping its
  focusable `btn-pill` trigger inside (**it omits `inert`**) … pending the glass-ui `inert` release + guarded `^2→^3` bump."*
  The installed **4.0.0** `ConfiguratorLayer` emits `inert: !i.value || void 0` alongside `role="region"` and
  `aria-hidden` (`dist/useConfiguratorState-kiIlun8I.js`), and 7.0.0 keeps it with the comment *"inert pulls the collapsed
  subtree from tab order + a11y tree — the aria-hidden-focus closure"* (`src/components/configurator/ConfiguratorLayer.vue:159`).
  The booked vendored defect is **cured**; the `fixme` (and its sibling at `:113`) should be un-fixed at F.W0/F.W1 — which
  is also how B-2/M-1/M-4 would have been caught by CI rather than by this challenge.
  *Falsifier* — no `inert` in the installed configurator chunk. `grep -o "inert" dist/useConfiguratorState-kiIlun8I.js` hits.
- **i-2 · (cross-axis → L)** The parent binds `v-model:n-harmonics` / `v-model:n-points` (`VisualizationView.vue:260, 270`)
  but the child declares plain props with no `defineEmits`/`defineModel` (`:26-29`) — the two-way binding is one-way in fact.
  Design-relevant only as evidence that this panel is a *consumer* of harmonic state while presenting as an owner.
- **i-3 · `UNPROVEN-NEEDS-LIVE (SS-13)`** The strategy dropdown's proportion. Six items × (title + a `max-w-[280px]`
  description) inside a content that is `min-w-(--reka-select-trigger-width) w-full` and capped at
  `min(24rem, 60dvh)` with inner scroll (`dist/styles/select.css`) will very likely render a scrolling panel wider than the
  left rail. Needs a live measurement to grade; recorded so SS-13 can settle it.

---

## §5 — Falsified candidates (recorded so the next auditor does not re-file them)

1. **"No empty state."** *Falsified.* `VisualizationView.vue:260, 270` gate the component behind `v-if="hasImage"`
   (`:123` `!!store.imageMeta`), so the inert-controls-without-an-image state cannot occur. The `if (!store.imageMeta) return`
   guard at `:105` is belt-and-braces, not a missing state.
2. **"Two ContourSettings instances double-fire `runCompute`."** *Falsified.* The two mounts are the mutually exclusive
   `v-if="isEditing"` / `v-else` arms of one `<Transition mode="out-in">` (`VisualizationView.vue:253-259` / `:268-274`).
   Only the disclosure-state loss survives (m-7).
3. **"The `collapsible-open`/`collapsible-close` keyframes don't exist at 4.0.0, so Advanced never animates."** *Falsified.*
   `dist/styles/animations.css:18` and `:29` define both, keyed to `--reka-collapsible-content-height`, and
   `dist/styles/tokens/scheme-motion.css:217-218` defines `--ease-out`/`--ease-in`. The comment at `:354-360` is accurate.
   (This became S-2.)
4. **"The slider range fill fails 1.4.11 at 25 % alpha."** *Falsified as stated* — the 25 % rule never applies (B-1); the
   sliders paint the producer's own calibrated `--slider-range-bg`. Filing a contrast defect here would have been a
   phantom built on dead CSS.
5. **"`animate-spin` violates `prefers-reduced-motion`."** *Falsified at HEAD* — unreachable (M-3). Re-arms on cure.

---

## §6 — SUPERLATIVES (6) — L-18 runs both ways

- **S-1 · The best help microcopy in the visualization tree.** `:229, 242, 268, 281, 294` — *"Soften before tracing — crank
  it up for furry subjects or noisy backgrounds"*, *"Ignore tiny contours — raise to drop grass, fences, and stray edges"*,
  *"How many outlines to keep — 1 for a clean silhouette, more for interior detail"*, *"Iron out jagged edges — tame fur,
  leaves, and pixelated boundaries"*. Every string names a **concrete failure mode and its direction of travel**, none
  restates the parameter. *Falsifier* — another visualization panel doing the same. `grep -n "Tooltip text=" BasisSelector.vue
  CanvasControlsDock.vue EditorControlsDock.vue AnimationControls.vue` returns 16 bare noun labels ("Undo", "Redo",
  "Fullscreen", "Image overlay", "Save contour"). ContourSettings is alone. **This is exactly why B-2 is a BLOCKER and not
  a MINOR** — the file's single best asset is delivered on the one channel a keyboard user cannot open.
- **S-2 · The motion posture is exemplary and self-documenting.** `:354-375` retires hand-rolled `adv-open`/`adv-close`
  keyframes for the substrate `collapsible-open`/`collapsible-close` (verified shipped, §5.3), gates both under
  `prefers-reduced-motion: reduce` (`:370-375`), and `:455-461` uses **named** transition properties with the
  `--ease-out`/`--ease-in` tokens — the comment even states the rule (*"named properties + canonical tokens, no
  `transition: all`"*). *Falsifier* — a `transition: all` or an un-tokenized cubic-bezier in the file. `grep -n "transition:" ` →
  `:397 color, opacity` · `:444 background, border-color` · `:346 color` · `:457/:460` tokenized. Zero violations.
- **S-3 · Producer-first typography.** `:312` `class="fira-code"` consumes glass-ui's shipped
  `@utility fira-code` (`dist/styles/typography/utilities.css:69`) rather than a local `font-family` literal. 22 files in the
  tree use it; none re-declares the face. *Falsifier* — a local `@font-face`/`font-family: "Fira Code"` in this file. None.
- **S-4 · A self-cured a11y defect with a receipt.** `:211` `aria-label="Contour extraction strategy"` is the recorded fix
  for an axe **critical** `button-name` on this exact trigger, documented at `e2e/visualization-ux.spec.ts:125-127`
  (*"was real and is FIXED in `ContourSettings.vue`"*). Finding, fixing, and *leaving the provenance in the gate* is the
  behaviour the megatranche wants. *Falsifier* — the aria-label absent, or the spec comment not naming this file. Both present.
- **S-5 · This component is OFF the entire named uplift break surface.** Its imports (`:7-22`) are
  `button · collapsible · select · configurator` + `lucide-vue-next` + two local adapters. Cross-checked against
  `lane-frontend.md` §5: **no** `metric-badge` (the 7-file cure), **no** `hover-card`/`hover-popover` (the 4 sites), **no**
  `DockIconButton`/`DockDropdownTrigger`, **no** `ToastVariant`. All four of its glass subpaths survive 4.0.0 → 7.0.0
  (7.0.0 export map removes 21 subpaths; none of them is `./button`, `./collapsible`, `./select`, `./configurator`).
  Its entire mechanical F.W1 cost is **line 20** (one `@lucide/vue` rename, 4 symbols). *Falsifier* — one of its four
  subpaths in the 7.0.0 REMOVED list. None is.
- **S-6 · The auto-apply model is made viable by a real idempotence guard.** `:86-99` builds a canonical compute key over
  all nine inputs, `:140-149` debounces 1 s, and `:145` short-circuits when the key is unchanged — so a settings panel with
  **no Apply button** does not thrash a three-request pipeline. *Falsifier* — a redundant recompute path that skips the key
  check. `runCompute` is reached from exactly two places (`:146` guarded, `:165` guarded on empty data) plus the Retry
  button. *Qualification (cross-axis → L, not scored here)*: the `queueMicrotask` re-arming at `:179-186` is the fragile
  seam; the design claim is only that the guard exists and is well-formed.

---

## §7 — The 4.0.0 → 7.0.0 delta **for this component** (F.W1 input)

| surface | at 4.0.0 (installed) | at 7.0.0 (producer) | verdict |
|---|---|---|---|
| `lucide-vue-next` (`:20`) | works | peer is `@lucide/vue ^1.16.0` | **BREAKS** — 1 import line, 4 symbols |
| `./button` variants `ghost`/`destructive`, sizes `icon`/`sm` (`:196-197, 313`) | all present (`button-BNDWhAZb.js` CVA keys: default, solid, primary-audacious, gold-audacious, destructive, outline, secondary, accent, ghost, glass, glass-wash, ai, link; xs, sm, lg, icon, icon-sm) | present | **SAFE** |
| `./collapsible`, `./select`, `./configurator` subpaths | present | present (not in the 21 removed) | **SAFE** |
| `SelectTrigger` geometry | `rounded-pill` + `h-(--control-h-md)` | `rounded-pill` + control-surface register | **the local `rounded-lg`/`h-10`/`border-2` override (M-6) fights both pins** — cure at F.W1, do not carry |
| `ConfiguratorLayer` body padding | `configurator-layer-body px-3 py-2 space-y-2` | `configurator-layer-body py-2 space-y-2` + `--configurator-pad-inline` | **VISUAL SHIFT** — inline padding moves from a literal to a token; the `-mt-1 -mb-1` clawback (`:193`) and the `.retry-banner`/`.advanced-divider` margins (m-8) are calibrated against the old literal |
| `ConfiguratorRow` | `label · name · description · canReset · density` | `label · sub · name · description · canReset · size` (adds the L14 double-label) | **IMPROVES** — `sub` + `description` are the exact cure for B-2; `canReset` is the cure for M-8 |
| `SelectItem` `#description` + `textValue` | present | present (`SelectItem.vue:8,65,92`) | **cure for M-7 is uplift-stable** |
| `--slider-scrub-*` retint (B-1) | tokens absent | tokens still absent (`--slider-range-bg`/`--slider-thumb-bg` family) | **NOT CURED BY THE BUMP** — budget the rewrite separately |
| `ConfiguratorLayer` `inert` on collapsed body | **present** | present | the `test.fixme` premise (i-1) is stale at BOTH pins |

---

## §8 — Tally

| severity | count |
|---|---:|
| BLOCKER | **2** |
| MAJOR | 9 |
| MINOR | 10 |
| INFO | 3 |
| **defects total** | **24** |
| superlatives | 6 |
| falsified-and-withdrawn candidates | 5 |

**The one-line verdict.** ContourSettings is the best-*written* panel in `components/visualization/` — its microcopy,
its motion discipline, and its self-documented substrate adoption are the tree's high-water mark — and it is
simultaneously the panel whose design system is most thoroughly *not connected*: five inert colour bindings, five
hover-only explanations, a pseudo-disabled reset at 1.39:1, an unreachable busy state, and a five-way per-instance
override of the very trigger chassis it imports. Nothing here is cured by the tri-package bump; the cures all exist at
the **installed** pin.

---

*Read-only. No product source in any repo was modified. The single write is this file.*
