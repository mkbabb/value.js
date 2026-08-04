claude-opus-5[1m]

# CHALLENGE · `CanvasControlsDock.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasControlsDock.vue` (132 lines).
**Axis** how this component consumes value.js `0.13.0`, keyframes.js `4.3.0`, glass-ui `^4.0.0` (installed 4.0.0), the local `@/components/ui/tooltip` adapter, and the 45-operation fourier API; plus props/emits contract quality and integration seams.
**Mode** static + source-derived, read-only. No browser tooling. fourier-analysis and glass-ui were read as evidence only; the single write of this lane is this file.
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` — the coordinate adjudicated TRUE at intake row **R4-9** ("the audited scope is byte-identical to the tree F.W0 opens on"). Nothing below is stale-at-HEAD.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Three hypotheses were **refuted by the tree** and are recorded as superlatives (S-3, S-4, and the `startCollapsed` finding S-1) — L-18 runs both ways.

**Imports read whole (the closure):**

| import | resolved to | read |
|---|---|---|
| `vue` (`ref`, `watch`) | 3.5.x | — |
| `lucide-vue-next` ×7 icons | `node_modules/lucide-vue-next@1.0.0` | `dist/esm/createLucideIcon.js`, `dist/esm/defaultAttributes.js` |
| `@/components/ui/tooltip` | `web/src/components/ui/tooltip/{Tooltip.vue,index.ts}` (38 + 1 LOC) | whole |
| `@mkbabb/glass-ui/hover-popover` | `dist/components/custom/hover-popover/HoverPopover.vue.d.ts` | whole |
| `@mkbabb/glass-ui/dock` | `dist/components/custom/dock/{GlassDock,DockIconButton}.vue.d.ts`, `composables/useDockShellProps.d.ts`, `dist/dock.js` (compiled render fn) | whole/targeted |
| CSS contract (implicit) | `dist/styles/dock-controls/icon-button.css`, `dock-controls/touch-floor.css`, `glass/material.css`, `dock/layer-group.css`, `tokens/offsets-sizing.css`, `tokens/light-dark.css`, `tokens/color-radius.css` | targeted |
| transitive (reka) | `node_modules/reka-ui@2.9.10/dist/Tooltip/TooltipTrigger.js` | targeted |
| producer (7.0.0, migration target) | `/Users/mkbabb/Programming/glass-ui/src/components/dock/{index.ts,GlassDock.vue,DockSeparator.vue}`, `src/components/popover/Popover.vue`, `CHANGELOG.md` | targeted |
| consumer (the seam's other half) | `web/src/components/visualization/VisualizationView.vue`, `EditorControlsDock.vue`, `web/src/stores/gallery.ts`, `web/src/lib/api.ts`, `api/routers/visualizations.py`, `web/e2e/gallery.spec.ts`, `web/src/style.css`, `web/src/lib/colors.ts` | targeted |

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md` §3/§4/§5/§9 · `CENSUS-2026-08-03.md` · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**, **R6-8**, **R5-7**, **R4-9**, **X-3**. Where this challenge contradicts or extends the corpus it says so explicitly (C-2 extends lane-frontend §5; C-9 extends §4; S-1 and S-3 correct silences).

---

## Tally

| severity | count | ids |
|---|---:|---|
| **BLOCKER** | **2** | C-1, C-2 |
| MAJOR | 7 | C-3 … C-9 |
| MINOR | 7 | C-10 … C-16 |
| INFO | 1 | C-17 |
| **defects total** | **17** | |
| **superlatives** | **5** | S-1 … S-5 |

---

## BLOCKERS

### C-1 · BLOCKER · Six of the seven controls have **no accessible name**; the tooltip supplies a *description*, never a name

**Provenance.** `CanvasControlsDock.vue:46` is the only `aria-label` in the file (`grep -c aria-label` → **1**); `grep -c '<DockIconButton'` → **7**. The six unnamed controls are at `:54` (image overlay), `:59` (contour trace), `:71` (publish), `:77` (equation), `:87` (edit), `:93` (fullscreen). Each is wrapped in the local adapter `@/components/ui/tooltip` → `web/src/components/ui/tooltip/Tooltip.vue:26-35`, which renders `TooltipTrigger as-child` + `TooltipContent`. reka-ui's trigger supplies **only** `reka-ui/dist/Tooltip/TooltipTrigger.js:88` → `"aria-describedby": rootContext.open.value ? rootContext.contentId : void 0`. The glyphs contribute nothing: `lucide-vue-next@1.0.0` `dist/esm/defaultAttributes.js` emits `xmlns/width/height/viewBox/fill/stroke/stroke-width/stroke-linecap/stroke-linejoin` — **no `role`, no `aria-hidden`, no `<title>`** — and `createLucideIcon.js:11-19` adds none.

**The failure scenario.** A screen-reader user tabs the expanded dock. Six buttons announce as bare *"button"*. `aria-describedby` is a description and (a) is only attached **while the tooltip is open**, and (b) never satisfies the accessible-name computation. WCAG 2.1 **4.1.2 Name, Role, Value** failure on the Publish, Equation, Edit, Fullscreen, Image-overlay and Contour-trace affordances — i.e. on every destructive/state-changing control in the visualization's primary chrome. `@axe-core/playwright ^4.11.3` is in devDeps (lane-frontend §8) but no spec runs axe over this dock (see C-17).

**Falsifier.** Show that either (a) reka-ui's `TooltipContent` renders a `VisuallyHidden` node that is wired as an `aria-labelledby` target rather than `aria-describedby`, or (b) glass-ui's `Tooltip*` re-export interposes an `aria-label` pass-through, or (c) lucide 1.0.0 emits a `<title>` for a named icon. All three were checked and are false: `grep -no 'aria-describedby\|aria-label' dist/tooltip.js` over installed glass-ui 4.0.0 returns **nothing** (the tooltip subpath is a thin re-export), and the two lucide files above are the whole render path.

**Cheapest cure.** `aria-label` on the six `DockIconButton`s. The component already proves it knows the idiom at `:46`, and the repo's own e2e comment calls it *"the dock idiom"* (`e2e/gallery.spec.ts:110-111`).

---

### C-2 · BLOCKER · Three glass-ui-7.0.0 **definition-absent** surfaces inside 132 lines — the densest removal site in the fourier tree — and one of them is **not in the census break table**

**Provenance.**

| # | surface | site(s) | disposition at 7.0.0 |
|---|---|---|---|
| 1 | `@mkbabb/glass-ui/hover-popover` subpath | `:6` | **REMOVED at 5.0.0** → `<Popover>`. `glass-ui/CHANGELOG.md:217` — "`./hover-popover` \| folds onto `<Popover>` \| `MIGRATION.md` §5.0.0 `BI.W-OVERLAY-UNION`". Producer `ls src/components/ \| grep -i hover` → **empty**. |
| 2 | `DockIconButton` member | `:7` import + **7 usages** (`:46,:54,:59,:71,:77,:87,:93`) | **DEFINITION-ABSENT at 5.0.0** → `<DockControl>`. `glass-ui/src/components/dock/index.ts` — "the shared dock control folds the retired `DockIconButton` + `DockTabButton` onto a `shape` axis … The five legacy SFCs are DEFINITION-ABSENT (clean break, no alias — G10 census; every consumer re-points by name, MIGRATION.md)". |
| 3 | raw `.dock-separator` **class** | `:67`, `:82` markup + `:106-112` scoped CSS | **SUPERSEDED at 7.0.0** by `<DockSeparator>`. `glass-ui/src/components/dock/DockSeparator.vue:8-13` — "The raw `.dock-separator` class was **axis-blind** — a fixed VERTICAL 1px hairline that paints a useless 1px-wide sliver in a column (vertical) dock and a single cell-sliver in a grid dock." |

**Extends the corpus, does not repeat it.** `lane-frontend.md §5` books rows 1 and 2 (its "Rows that hit fourier-analysis TODAY" table names `CanvasControlsDock.vue:6` and `:7`). **Row 3 is new** — the census's break table has no `.dock-separator` row, and the shadow census in §4 does not list it either. There are **2** such markup sites in this file plus **1** in `EditorControlsDock.vue:130`; all three must re-point to `<DockSeparator>` at the tri-package bump.

**Why BLOCKER rather than MAJOR.** `lane-frontend §9 carry 1` establishes that `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` is **one atomic transaction** (the `keyframes@4.3.0 → glass-ui ~4.0.0` optional-dep tilde lock). This file does not compile against the far side of that transaction on **three independent axes**, and it is one of only **two** files in the tree (with `EditorControlsDock.vue`) carrying *both* a removed dock member and the removed `hover-popover` subpath. It is therefore on the critical path of the megatranche's single most consequential carry.

**Falsifier.** Produce a 7.0.0 alias for any of the three. Checked: `glass-ui/package.json` exports has `./dock`, `./popover`, `./separator` — and **no** `./hover-popover`; `src/components/dock/index.ts` exports `DockControl`/`DockTrigger`/`DockSeparator` and states the legacy SFCs are alias-free.

---

## MAJOR

### C-3 · MAJOR · `update:expanded` is declared **without a matching `expanded` prop** — the v-model is half-wired and the parent's value leaks into the DOM as a non-standard attribute that name-collides with glass-ui's own `expanded` state class

**Provenance.** `CanvasControlsDock.vue:26` declares `"update:expanded": [value: boolean]`; `:9-17` declares seven props and **none of them is `expanded`**. The parent binds the full model: `VisualizationView.vue:212` `v-model:expanded="dockExpanded"`.

**The failure scenario.** `v-model:expanded` desugars to `:expanded="dockExpanded"` + `@update:expanded=…`. The listener is consumed (it is in `defineEmits`); the **value is not** — `expanded` is undeclared, so it becomes a fallthrough attr. `inheritAttrs` is not set (defaults `true`) and the single root is `<GlassDock>`, whose compiled render function merges `$attrs` straight onto the dock element: `dist/dock.js:582` `inheritAttrs: !1`, then `D("div", j({ref_key:"dockEl", ref:_}, t.$attrs, { class:["glass-dock", [...{ expanded: W.value, collapsed: !W.value, ...}]] , …}))`. `expanded` is not in Vue's special-boolean-attr list, so `patchAttr` emits `el.setAttribute("expanded", "false"|"true")`. Result on every render: `<div class="glass-dock … collapsed" expanded="false">` — an **invalid HTML attribute named identically to the state class glass-ui paints on the same element** (producer source `glass-ui/src/components/dock/GlassDock.vue:330`). Consequences: (i) the parent can never *drive* the dock (setting `dockExpanded = true` collapses to a no-op plus a DOM attribute), so the model is one-way in a two-way clothing; (ii) any `[expanded]` attribute selector or Playwright locator matches **unconditionally**, in both states; (iii) silent — Vue does not warn on undeclared fallthrough props.

**Falsifier.** Show `expanded` in `defineProps` (it is not, `:9-17`), or `inheritAttrs: false` on this component (absent), or that `GlassDock` consumes `expanded` as a prop (`useDockShellProps.d.ts` `DockProps` has no `expanded` member — it is exposed, not accepted). Or show Vue removes a `false`-valued non-boolean attr — it does not; `isSpecialBooleanAttr` covers only `itemscope/allowfullscreen/formnovalidate/ismap/nomodule/novalidate/readonly`.

**Cure.** Either declare `expanded: boolean` and honour it (`dockRef.value?.expand()/collapse()` are both on the exposed surface), or rename the event to a non-`update:` name (e.g. `expandedChange`) so it stops advertising a contract it cannot honour.

---

### C-4 · MAJOR · The `W2.E` comment claims the out-of-band coupling was removed; the code still reaches into `GlassDock`'s `defineExpose`, and `?.` + `?? false` makes the break **silent**

**Provenance.** `CanvasControlsDock.vue:31-33`: *"In-band coupling (W2.E): surface the dock's expanded state to the parent … via a typed event **rather than an out-of-band `defineExpose` the parent reaches into**."* The implementation at `:34-37` is `watch(() => dockRef.value?.expanded, …)` — it reads `GlassDock`'s `defineExpose({ expanded, isPinned, isHeld, isTransitioning, expand, collapse, keepOpen, release })` (`glass-ui/src/components/dock/GlassDock.vue:312-321`). The reach-in was **relocated one component down**, not removed; the parent's comment repeats the claim (`VisualizationView.vue:75-78`).

**The failure scenario.** The coupling is guarded by an optional chain and a `?? false` default. If the producer renames or drops the exposed key — precisely the kind of thing the 5.0.0 clean break did to five sibling dock SFCs (`dock/index.ts`) — the getter yields `undefined` forever, `?? false` converts that to a legitimate-looking `false`, and the component reports **permanently collapsed**. The parent's `.dock-centered` anchor re-centring (`VisualizationView.vue:210`) then silently never fires. No type error (the key is gone from the exposed type only if the consumer recompiles against the new `.d.ts`; the `?.` short-circuit is legal either way), no runtime warning, no test (C-17).

**Falsifier.** Show the watcher would throw or fail typecheck on a renamed expose. It would not: `?.` is designed to swallow exactly that. Confirming counter-evidence for the *narrow* claim (that `expanded` survives 7.0.0) is real — producer `GlassDock.vue:313` still exposes it — so this is a **latent** coupling defect, not a live break. Severity is MAJOR because the file's own comment asserts the opposite invariant, which is what an auditor at F.W4 would otherwise trust.

---

### C-5 · MAJOR · The scoped `.dock-separator` **shadows and overrides** glass-ui's shipped recipe — unlayered SFC CSS beats `@layer components` unconditionally — dropping density and orientation awareness

**Provenance.** Local: `CanvasControlsDock.vue:106-112` — `width:1px; height:1.5rem; margin:0 0.125rem; background: color-mix(in srgb, var(--foreground) 20%, transparent); flex-shrink:0`. Shipped: `glass-ui/dist/styles/dock/layer-group.css:35-41` inside `@layer components {` (line 23) — `@apply flex-shrink-0; width:1px; height: var(--dock-separator-height); margin: 0 0.375rem; background: var(--surface-tint-15)`, **plus** `:45-53` (vertical dock → horizontal rule) and `:56-61` (grid dock → full-row section break). `--dock-separator-height` = `calc(var(--dock-h, var(--size-icon-btn)) * 0.5)` (`dist/styles/dock/shell.css:24`).

**The failure scenario.** Vue scoped styles are emitted **unlayered**; unlayered rules win over any `@layer` rule regardless of specificity. So the local block deterministically replaces the shipped one for this dock: the hairline is pinned at `1.5rem` instead of tracking `--dock-h`, its margin is `0.125rem` instead of `0.375rem` (3× tighter, a different visual rhythm from every other dock in the app), and its colour is `--foreground @ 20%` instead of the `--surface-tint-15` token that the glass tier retints per surface. Worse, **three divergent copies of one class name coexist**: this file (`margin: 0 0.125rem`), `EditorControlsDock.vue:132-138` (**no margin at all**), and glass-ui (`0 0.375rem`). Two docks stacked on the same canvas render visibly different dividers.

**Falsifier.** Show the local rule loses. It cannot: cascade layers are strictly below unlayered for the same origin, and the scoped attribute selector `.dock-separator[data-v-…]` (0,2,0) also outranks `.dock-separator` (0,1,0) even absent layering. Or show glass-ui 4.0.0 does not define `.dock-separator` — it does, at `layer-group.css:35`, and additionally at `dock/overflow.css:166`.

---

### C-6 · MAJOR · `h-4.5 w-4.5` on five of seven glyphs **defeats glass-ui's declared glyph-ownership contract** — 18 px pinned glyphs next to 30 px scaled ones inside one dock on coarse pointers

**Provenance.** Two sizing idioms in one file: Tailwind utilities at `:47` (`Eye`), `:72` (`Upload`), `:78` (`Sigma`), `:88` (`Pencil`), `:94` (`Maximize2`); lucide `:size="20"` props at `:55` (`ImageIcon`) and `:60` (`Spline`). glass-ui owns the glyph: `dist/styles/dock-controls/icon-button.css:132-135` `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: … }`, documented at `:124-131` as **"AX.W45 D15 — LIBRARY GLYPH OWNERSHIP … the glyph scales WITH the box on the `--dock-scale` multiplier instead of swimming at a fixed consumer size … A consumer passing an explicit lucide size class still WINS (utility layer > component layer) — a DEFAULT, not a ceiling."**

**The failure scenario.** `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` (`tokens/offsets-sizing.css:287`), `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale,1))` (`:264`), and `tokens/light-dark.css:17-21` lifts `--ui-scale: var(--ui-coarse-scale, 1.5)` under `@media (pointer: coarse)`. On a touch device the two `:size="20"` glyphs (presentation attributes, which any CSS rule outranks) render at **30 px**; the five `h-4.5 w-4.5` glyphs stay hard-pinned at `1.125rem` = **18 px**, because — exactly as the producer comment predicts — Tailwind's `utilities` layer beats glass-ui's `components` layer. A single dock therefore paints a 30 px `Eye`-popover contents beside 18 px rail glyphs, and the whole rail refuses the WCAG-2.5.5-driven touch uplift. Even on a fine pointer the two idioms disagree: 18 px vs 20 px.

**Falsifier.** Show `h-4.5` resolves to something other than `calc(var(--spacing) * 4.5)` = `1.125rem` under Tailwind v4 (it does not), or show `:size="20"` wins over the CSS rule (an SVG `width`/`height` presentation attribute has specificity 0 and always loses to an author rule), or show `--dock-icon-glyph` is unset in the installed build (`grep -rn dock-icon-glyph dist/styles/` → defined at `tokens/offsets-sizing.css:287`, consumed at `icon-button.css:133-134`).

**Cure.** Delete both idioms. The producer's default is the intended value.

---

### C-7 · MAJOR · `publishing` is modelled as a *toggle-on* state with no `disabled`/`aria-busy` affordance — the Publish button stays clickable through the round-trip, double-submitting straight into the **R6-8** client↔operation seam

**Provenance.** `CanvasControlsDock.vue:70-74`: `<DockIconButton :class="{ 'is-active': publishing }" @click="$emit('publish')">` with `<Upload … :class="{ 'animate-pulse': publishing }" />`. No `:disabled`, no `aria-busy`, no re-entrancy guard on the emit. The parent handler `VisualizationView.vue:106-118` guards only `if (!store.imageSlug || !store.contour) return` — it never checks `publishing.value`.

**The failure scenario.** The user clicks Publish; the button paints "active" and pulses but remains hittable. A second click (impatience, or a double-tap on touch) re-enters `handlePublish`, which runs `store.createSnapshot()` a second time — that alias resolves to `saveVisualization` (`stores/workspace.ts:457-460`: *"`createSnapshot` is retained as an alias for the (unmigrated) visualization-view publish call site; it now creates a `draft` visualization"*) — producing a **second draft visualization row**, then a second `gallery.publish(slug, …)` → `api.updateVisualization(slug, { visibility: "public" }, etag)` (`stores/gallery.ts:219-234`). The client leg is `web/src/lib/api.ts:420-431` `{ method: "PATCH", body: { ...patch }, headers }` against `api/routers/visualizations.py:350` `@router.patch("/{slug}")`.

**Why this is a consumption finding, not merely a UX one.** That client/operation pair is verbatim the leaf the adjudicated intake row **R6-8** proved structurally non-isolable: C31's mutation target is `{"kind":"replace","target":"web/src/lib/api.ts","before":"{ method: \"PATCH\", body: { ...patch }, headers }"}`, and flipping the client verb mutated **both** `client.method.visualization-update` and `operation.method.visualization-update` because the operation record embeds `"clients": ["client:updateVisualization"]`. **This dock's Publish button is the UI head of exactly that seam.** A defect attributed here cannot be localised to one side of the contract until F.W5 splits the client↔operation join into a separate relation — which is precisely R6-8's carry. The duplicate-draft residue also lands in the same entity family as census risk 5 / intake row **X-8** (the `depth=0` phantom version chain, booked by fourier's own `docs/tranches/M/M.md §7` for M.W10).

**Falsifier.** Show the button is disabled or the handler is re-entrant-safe. It is not: `DockIconButton`'s prop surface (`DockIconButton.vue.d.ts` `__VLS_Props` = `compact/type/as/asChild/class`) has no `disabled`, none is passed as a fallthrough attr, and `handlePublish`'s only early return is the slug/contour check. A second falsifier — "the ETag guard catches it" — fails too: the first PATCH's `nextETag` is stored *after* it resolves (`gallery.ts:229`), so two overlapping publishes of two *different* freshly-created slugs never contend on a validator at all.

---

### C-8 · MAJOR · Five toggles carry **zero ARIA state**, although glass-ui's active-state recipe accepts `[aria-pressed="true"]` as an equal member of the same `:is()` — the accessible fix is free and paints identically

**Provenance.** Five `:class="{ 'is-active': … }"` bindings at `:54, :59, :71, :77, :87`; no `aria-pressed`, `aria-expanded` or `aria-current` anywhere in the file. The glass-ui recipe is a *family*, not a class: `dist/styles/dock-controls/icon-button.css:109` `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`; `dist/styles/glass/material.css:231` `.dock-icon-button:is(.is-active, .active, [aria-pressed="true"], [aria-expanded="true"], [aria-current="page"])::before`; `dist/styles/dock-controls/touch-floor.css:64,82` the same union at the touch tier, with `:56` naming it *"the family already activates"*.

**The failure scenario.** `showImageOverlay`, `showGhost`, `showEquation`, `isEditing` are boolean toggle states and `publishing` a busy state; all five are conveyed to sighted users only. A screen-reader or voice-control user cannot determine whether the image overlay is on. Combined with C-1 (no name at all) the five controls are entirely opaque to assistive tech. The sharpness is that glass-ui *documents the ARIA arm as equivalent* — switching `:class="{'is-active': showGhost}"` to `:aria-pressed="showGhost"` yields byte-identical paint and restores role+state, so the current form pays an accessibility cost for **zero** styling benefit.

**Falsifier.** Show the ARIA arm does not paint. It does — three independent selector families above, all at the *installed* 4.0.0 version, all still present in the 7.0.0 producer tree. (This falsifier is also what refuted my initial hypothesis that `.is-active` was dead here — see **S-3**.)

---

### C-9 · MAJOR · The sibling dock implements the *same* affordance with a *different* contract on five axes — the parent has to wire two vocabularies for one piece of state

**Provenance.** `CanvasControlsDock.vue` vs `EditorControlsDock.vue`, both mounted by `VisualizationView.vue` over the same canvas and both driving the same two parent refs (`showImageOverlay`, `showGhost`):

| axis | `CanvasControlsDock` | `EditorControlsDock` |
|---|---|---|
| emit name for the same state | `toggleImageOverlay` (`:23`) | `toggleOverlay` (`:41`) — parent wires **both** to `showImageOverlay = !showImageOverlay` (`VisualizationView.vue:222` and `:246`) |
| prop optionality for the same state | `showGhost: boolean` **required** (`:12`) | `showGhost?: boolean` **optional** (`:29`) |
| popover trigger name | `aria-label="View options"` (`:46`) | `aria-label="Overlay options"` (`:135`) |
| item order inside the identical popover | image overlay, then contour trace (`:53,:58`) | contour trace, then image overlay (`:141,:146`) |
| state feedback for contour trace | static `Spline` + `.is-active` (`:59-61`) | dynamic `<component :is="showGhost ? Eye : EyeOff">` (`:144`) |
| separator host element | `<div class="dock-separator">` (`:67,:82`) | `<span class="dock-separator">` (`:130`) |
| emit idiom | `$emit(…)` in template (6×) | `emit(…)` via the typed const |

**The failure scenario.** The two docks swap in and out on the `isEditing` flip over the same canvas: a user toggling the image overlay finds the control in a differently-named popover, in the inverted position, with different feedback semantics. Contract-side, the parent maintains two aliases for one mutation, so any future rename touches two vocabularies; and the `showGhost` required/optional split means a `vue-tsc` change that tightens one dock does not tighten the other. `EditorControlsDock.vue:144` is also one of the two dynamic-`:is` families that intake row **R3-10** proved were *silently dropped* between two Codex registries — the exhaustiveness hazard is live in this exact pair.

**Falsifier.** Show the two docks are not co-mounted over the same state. They are: `VisualizationView.vue:210-226` (this dock) and `:237-247` (the editor dock), both binding `showImageOverlay`/`showGhost`.

---

## MINOR

### C-10 · MINOR · `animate-pulse` is the tree's **only** site and is ungated under `prefers-reduced-motion: reduce`

`:72` `:class="{ 'animate-pulse': publishing }"`. `grep -rn animate-pulse src/` → exactly one hit, this line. The repo's global reduce block covers only tab panels (`style.css:92-96` — `[data-state="active"][role="tabpanel"] { animation: none }`), and `tw-animate-css` ships no reduced-motion gate (`grep prefers-reduced-motion node_modules/tw-animate-css/dist/*.css` → empty). Extends lane-frontend §8's reduced-motion gap table, which enumerates 8 reduce blocks and 5 JS gates and does **not** list this site. **Falsifier:** show a reduce rule that matches `.animate-pulse` — none exists in `style.css`, in glass-ui's dist styles, or in tw-animate-css. Severity is MINOR only because the animation's lifetime is bounded by one HTTP round-trip.

### C-11 · MINOR · The `#collapsed` slot advertises an Edit affordance that the expanded dock may not have

`:98-101` renders `Maximize2` + `Pencil` unconditionally, but the Edit control at `:86` is `v-if="hasContour"`. When `hasData && !hasContour` the collapsed pill promises editing and the expanded dock delivers `[Eye][sep][Sigma][sep][Maximize2]`. Reachable: the parent mounts the dock on `hasData || (isEditing && store.contour)` (`VisualizationView.vue:210`) and `hasData` is `store.epicycleData || store.basesData || store.computing` (`:221`) — true during compute, before any contour exists. **Falsifier:** show `hasContour` is implied by `hasData` — it is not; they are independent store reads (`store.contour` vs the three compute fields).

### C-12 · MINOR · Two emit idioms in a 37-line script block; the typed `emit` handle covers 1 of 7 events

`:19` binds `const emit = defineEmits<…>()` but only `:36` uses it; the six user-facing events all go through `$emit('…')` string literals in the template (`:54,:59,:71,:77,:87,:93`). The sibling uses the typed handle throughout (`EditorControlsDock.vue:143,148,…`). **Falsifier:** `$emit` is type-checked against `defineEmits` under `vue-tsc`, so this is not a soundness defect — it is an idiom split that makes the emit surface un-greppable by symbol (a real cost at F.W3/F.W4 where the census is symbol-driven).

### C-13 · MINOR · Latent adjacent-separator hole in the props contract

With `!isEditing && !hasData && !hasContour`, `:67` and `:82` render back-to-back with nothing between them — a double hairline. Today unreachable *only* because of the parent's `v-if` (`VisualizationView.vue:210`); the component itself declares no such invariant and documents none. **Falsifier:** show the component enforces it. It does not — the two `v-if`s are on the *contents*, never on the separators.

### C-14 · MINOR · `side="top" align="center"` restate `HoverPopover`'s shipped defaults, enlarging the surface to re-verify at the `Popover` migration

`:44`. `HoverPopover.vue.d.ts` declares defaults `align: "center"`, `side: "top"`, `sideOffset: 6`, `closeDelay`, `hoverOpenDelay: 250`, `keepDockOpen: false`. Two of the three props passed are the defaults. **Falsifier:** the props are harmless *today*; the cost is that C-2's `HoverPopover → Popover` rewrite must now re-check three props instead of one, and `Popover`'s `side`/`align` defaults are not guaranteed to match a retired component's.

### C-15 · MINOR · `ref<InstanceType<typeof GlassDock>>()` instead of Vue 3.5's `useTemplateRef`

`:29`. The tree is Vue 3.5 with `vue-tsc ^3.3.5` in the WT bump (lane-frontend §1), and `useTemplateRef` is the project's stated 3.5 idiom. **Falsifier:** the current form is correct and well-typed (see **S-4**) — this is an idiom row, not a correctness row.

### C-16 · MINOR · Zero value.js and zero keyframes.js consumption, while adding two more `--viz-amber` read sites to the F.W2 colors surface

The file imports neither `@mkbabb/value.js` nor `@mkbabb/keyframes.js` (lane-frontend §5 enumerates the whole value.js consumer surface as **5 sites**, all `easeInOutSine`/`timingFunctions`; none is here). It nonetheless consumes the viz palette *through CSS*: `:128` `background: var(--viz-amber)` and `:129` `color-mix(in srgb, var(--viz-amber) 60%, transparent)`. That token is the one whose **JS twin** is produced by the hand-rolled arm the axis brief names — `web/src/lib/colors.ts:22-56` `cssVarToHex()`, a 35-line regex CSS-colour parser (`hsl(...)` / bare HSL triplet / `rgb(...)`, `return "#888888"` on miss) plus `hslToHex`/`rgbToHex`, re-run on every dark-mode flip via `App.vue:11-17`. value.js 4.0.0's `parseCssColor` is the direct supersession target; these two lines are the CSS-side half of the same token and belong in the F.W2 crosswalk denominator. Separately, `:110`/`:128-129` reach for `--foreground` where glass-ui's own separator uses `--surface-tint-15` — the local block bypasses the glass tier's retint token. **Falsifier:** show a value.js/keyframes import in this file — there is none; the finding is precisely that the count is zero while the token coupling is non-zero.

---

## INFO

### C-17 · INFO · e2e proves exactly **one of seven** controls, and the proving test states the very convention the component breaks six times

`e2e/gallery.spec.ts:104-115` locates `.controls-dock-anchor .glass-dock`, hovers it, and asserts one node: `dock.locator('[aria-label="View options"]')`. Its comment reads *"The dock's actions are keyed by aria-label (the dock idiom)."* — the convention C-1 shows is honoured once and violated six times, which is also **why** only one control is assertable: the other six are unlocatable by the project's own locator strategy. No axe run over this dock despite `@axe-core/playwright` in devDeps. Six of this file's Tooltip callsites are the ones intake row **R3-7a** counted for the F.W3 tooltip-adapter budget (`grep -c '<Tooltip ' ` → **6**, matching R3-7a's per-file figure for `CanvasControlsDock` exactly — corpus corroborated, not contradicted).

---

## Superlatives (L-18, both ways)

### S-1 · `:start-collapsed="true"` is **not** redundant — it is a correct defence against a live producer boolean-prop trap, and it is the only reason the dock starts collapsed

My hypothesis was that `:start-collapsed="true"` (`:41`) merely restates a documented default and should be deleted. **The tree refutes it.** `useDockShellProps.d.ts` / producer `useDockShellProps.ts:212-215` says *"`startCollapsed` defaults true"* and computes `props.startCollapsed ?? true`. But `GlassDock.vue:51-53` is `withDefaults(defineProps<DockProps>(), { backdropMode: "live" })` — `startCollapsed` gets no `withDefaults` entry, so the compiler emits `startCollapsed: { type: Boolean }` (visible in the installed build at `dist/dock.js:594`) and **Vue's Boolean cast resolves an absent prop to `false`, not `undefined`** — so `e.startCollapsed ?? !0` (`dist/dock.js:474`) never reaches its `true` arm. Absent the consumer's explicit binding the dock would start **expanded**, contradicting the producer's own docstring. This component (and `EditorControlsDock.vue:55`) are the sites that get it right. The irony is documented in the producer's own tree: the `alwaysExpanded` docstring in `useDockShellProps.ts` explains this exact Vue boolean trap as the reason a positive `collapsible` prop was rejected — while `startCollapsed` falls into it. **This is a glass-ui-side defect and belongs in the standing BH/BI relay**, not a fourier one. **Falsifier:** show a `withDefaults` entry or a runtime `default: true` for `startCollapsed` — neither exists in producer source or in the installed 4.0.0 build.

### S-2 · `keep-dock-open` is the exactly-right use of the J.W3.B dock-keep sink, and it is one of the few 5.0.0 removals whose semantics port 1:1

`:44`. `HoverPopover.vue.d.ts` documents `keepDockOpen` as *"when mounted inside a `<GlassDock>`, hold the parent dock open while this popover is visible … the dock's collapse timer is ref-counted so multiple keep-open holds compose cleanly."* Without it the dock's idle-collapse (`collapseDelay` default 2000 ms) would retract out from under an open popover. The consumer opted in. It also survives C-2's migration verbatim: producer `src/components/popover/Popover.vue:25,40,75-80` carries `keepDockOpen` with the same dock-context wiring — a rare clean leg in an otherwise expensive hop, and worth naming so F.W2 does not budget a redesign for it. Contrast the two *silent* `inject("dockKeepOpen", null)` sites the producer barrel calls out by name (`glass-ui/src/components/dock/index.ts`: *"fourier-analysis's 2 silent `inject<...>("dockKeepOpen", null)` sites at SliderControl.vue + GlassTimeline.vue … silently no-op without it; a functional regression on scrub gestures"*) — **this file is on the right side of that line.**

### S-3 · `.is-active` is live, not dead — the five state bindings do paint, and the repo's in-tree claim about the glass-ui canon is TRUE

My second hypothesis was that `.is-active` on a `DockIconButton` had no recipe at 4.0.0, which would have made every state binding in the file a no-op (a BLOCKER). **Refuted.** Three independent selector families honour it at the installed version: `dock-controls/icon-button.css:109`, `glass/material.css:231-234`, `dock-controls/touch-floor.css:64,82`. Consequently `CanvasOverlayButton.vue:7`'s in-tree assertion — *"`.is-active` class, matching the glass-ui canon for toggle buttons"* — is **verified true**, a claim neither `lane-frontend.md` nor the census tested. Recorded so no downstream wave re-litigates it. (C-8 stands *because* the ARIA arm sits in the same `:is()`, not because the class arm is broken.)

### S-4 · The template-ref typing is sound through a non-obvious `.d.ts` intersection

My third hypothesis was that `InstanceType<typeof GlassDock>` would resolve to `{ $slots: … }` (TypeScript picks the last construct signature of an intersection), making `dockRef.value?.expanded` either a type error or an un-unwrapped `Ref<boolean>`. **Refuted empirically** using the repo's own `typescript@6.0.3`: replicating `GlassDock.vue.d.ts`'s `__VLS_WithSlots<T,S> = T & { new(): { $slots: S } }` shape and asserting `const bad: number = inst.expanded` yields `TS2322: Type 'boolean' is not assignable to type 'number'` — i.e. `ShallowUnwrapRef` correctly resolves the exposed `Ref<boolean, boolean>` to `boolean` through the intersection. `value ?? false` at `:36` is therefore well-typed rather than a defensive cast, and the runtime agrees (Vue's expose proxy is `proxyRefs`-wrapped, so the read is both unwrapped **and** reactively tracked — which is why the watcher fires on mount without `immediate: true`).

### S-5 · A genuinely clean presentational seam in a tree whose orchestrator is 486 LOC

Zero store imports, zero `lib/api` imports, zero router, zero composables, zero `defineExpose`, zero prop mutation. All seven props are primitives; six of the seven emits are payload-free. Every piece of state — including `publishing`, whose async lifecycle lives entirely in `VisualizationView.vue:105-118` — is owned above. Against `VisualizationView.vue` (486 LOC of orchestration) and `BasisCanvas.vue` (547), this file is the correct altitude, and its glass-ui adoption is idiomatic rather than shadowed: it composes `GlassDock` + `DockIconButton` + `HoverPopover` rather than re-forking them, which is exactly the posture `lane-frontend.md §3` calls *"the cleanest glass-ui consumer posture in the constellation."* The defects above are contract and version-gap defects, **not** architecture defects.

---

## Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `lane-frontend §5` — `hover-popover` ×2 and `DockIconButton` ×2 hit fourier today | **AGREE**, and **EXTENDS**: the raw `.dock-separator` class is a third removed surface in this file (2 sites) not in the §5 table (C-2). |
| `lane-frontend §3` — "adoption is deep and idiomatic, not superficial" | **AGREE** for composition (S-5), **QUALIFIES** for CSS: this file overrides two shipped glass-ui contracts (`.dock-separator` recipe, `--dock-icon-glyph` ownership) — C-5, C-6. |
| `lane-frontend §4` — the shadow census (9 components) | **EXTENDS**: `CanvasControlsDock` is not a component-level shadow, but it carries a **class-level** shadow (`.dock-separator`) that the §4 method (component-name collision) cannot see. |
| `lane-frontend §8` — reduced-motion gap table | **EXTENDS**: `animate-pulse` at `:72` is a third ungated motion site, absent from the table (C-10). |
| intake **R3-7a** (35 Tooltip callsites / 9 consumers; `CanvasControlsDock` = 6) | **CORROBORATED** exactly — `grep -c '<Tooltip ' ` → 6. F.W3's adapter budget for this file is 6. |
| intake **R6-8** (operation record embeds client back-references ⇒ non-isolable seam) | **APPLIED**: this dock's Publish emit is the UI head of `client.method.visualization-update` / `operation.method.visualization-update`; C-7's duplicate-write defect is un-attributable to one side until F.W5 splits the join. |
| intake **R3-10** (six dynamic `:is` families, two silently lost) | **TOUCHED**: one of the two lost sites (`EditorControlsDock.vue:144`) is the sibling half of C-9's divergence pair. |
| intake **R4-9** (audited scope byte-identical to the F.W0 tree) | **RELIED ON** — every line cited here was read from the live tree at HEAD `cd26c653`. |
| intake **X-3** (45 total / 30 public-non-admin / 13 admin operations) | **CONSISTENT** — C-7's path touches 2 of the 30 public operations (POST `/api/visualizations`, PATCH `/api/visualizations/{slug}`). |

## Method and limits

Read-only throughout; the sole write is this file. Probes: `cat`/`sed`/`grep`/`find`/`wc`/`node -e` over `/Users/mkbabb/Programming/fourier-analysis` (source + `web/node_modules/@mkbabb/glass-ui@4.0.0`, `reka-ui@2.9.10`, `lucide-vue-next@1.0.0`) and, read-only, `/Users/mkbabb/Programming/glass-ui` @ 7.0.0. One isolated TypeScript experiment (S-4) was compiled in the session scratchpad using fourier's own `typescript@6.0.3`; it touched no repo file. **No browser tooling** — every claim above is static or source-derived. Nothing here is marked `UNPROVEN-NEEDS-LIVE`: the two claims that would ordinarily need a live page (C-6's rendered glyph sizes, C-3's emitted DOM attribute) are instead derived from the compiled render function (`dist/dock.js:582,594,474,692`), the cascade-layer declaration (`dock/layer-group.css:23`), and Vue's documented `patchAttr`/Boolean-cast semantics — a live confirmation at SS-13 would be corroborative, not load-bearing.
