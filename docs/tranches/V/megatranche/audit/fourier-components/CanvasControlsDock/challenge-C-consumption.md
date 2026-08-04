claude-opus-5[1m]

# CHALLENGE · `CanvasControlsDock.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasControlsDock.vue` (132 lines).
**Axis** how this component consumes value.js `0.13.0`, keyframes.js `4.3.0`, glass-ui `^4.0.0` (installed 4.0.0), the local `@/components/ui/tooltip` adapter, and the 45-operation fourier API; plus props/emits contract quality and integration seams.
**Mode** static + source-derived, read-only. No browser tooling. fourier-analysis and glass-ui were read as evidence only; the single write of this lane is this file.
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` — the coordinate adjudicated TRUE at intake row **R4-9**. `CanvasControlsDock.vue` is **not** among the 28 dirty working-tree paths, i.e. it is committed-clean at HEAD. Nothing below is stale-at-HEAD.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Four hypotheses were **refuted by the tree** and are recorded (S-1, S-3, S-4, and §R) — L-18 runs both ways.

> **SUPERSEDES the 2026-08-04 12:53 pass at this path.** That pass is folded whole, not discarded:
> its rows survive here as C-1, C-4…C-10, C-14…C-19, C-25…C-26 and S-1…S-5, each marked
> `[prior]` where carried unchanged and `[prior, corrected]` / `[prior, extended]` where this pass
> altered it. Two of its rows are **re-rated** with reasons stated in place (C-4). One of its
> factual sub-claims is **corrected** (lucide's `aria-hidden`, C-1). Eleven rows are **new** to this
> pass, including the file's sharpest defect (C-2). One hypothesis of *this* pass was refuted by the
> prior pass's evidence and is recorded at §R rather than published as a finding.

**Imports read whole (the closure):**

| import | resolved to | read |
|---|---|---|
| `vue` (`ref`, `watch`) | 3.5.x | — |
| `lucide-vue-next` ×7 icons | `lucide-vue-next@1.0.0` | `dist/esm/{Icon.js,createLucideIcon.js,defaultAttributes.js,icons/eye.js}` |
| `@/components/ui/tooltip` | `web/src/components/ui/tooltip/{Tooltip.vue,index.ts}` (38 + 1 LOC) | whole |
| `@mkbabb/glass-ui/hover-popover` | `dist/components/custom/hover-popover/HoverPopover.vue.d.ts` + compiled `dist/{hover-popover.js,HoverPopover-Dpzwvc4t.js}` | whole |
| `@mkbabb/glass-ui/dock` | `dist/components/custom/dock/{index,GlassDock.vue,DockIconButton.vue,DockSeparator.vue}.d.ts`, `composables/useDockShellProps.d.ts`, compiled `dist/dock.js` | whole/targeted |
| CSS contract (implicit) | `dist/styles/{index.css, dock/{layer-group,layers,shell,overflow}.css, dock-controls/{icon-button,touch-floor,triggers}.css, glass/material.css, tokens/{offsets-sizing,light-dark}.css}` | targeted |
| transitive (reka 2.9.10) | `src/HoverCard/{HoverCardRoot,HoverCardTrigger,HoverCardContent,HoverCardContentImpl}.vue` + `utils.ts`; `src/Tooltip/{TooltipTrigger,TooltipContentImpl}.vue` | whole |
| producer (7.0.0 = migration target) | `/Users/mkbabb/Programming/glass-ui @ 64e23000`: `src/components/dock/{index.ts,DockControl.vue}`, `package.json` exports | targeted |
| consumer (the seam's other half) | `VisualizationView.vue`, `EditorControlsDock.vue`, `AnimationControls.vue`, `CanvasOverlayButton.vue`, `stores/{workspace,gallery}.ts`, `lib/{api,colors}.ts`, `src/style.css`, `e2e/{gallery,visualization-ux}.spec.ts` | targeted |
| fourier's own prior audit | `docs/audits/runs/2026-06-16-M-deep-audit/{A8-no-legacy-sweep.md,raw-findings.json}`; `2026-06-17-M-critique-audit/` | targeted |

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md` §3/§4/§5/§8/§9 · `CENSUS-2026-08-03.md` · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**, **R3-10**, **R4-9**, **R5-7**, **R6-8**, **X-3**. Contradictions and extensions are stated in place and tabulated at §8.

---

## §0 — Tally

| severity | count | ids |
|---|---:|---|
| **BLOCKER** | **3** | C-1, C-2, C-3 |
| MAJOR | 10 | C-4 … C-13 |
| MINOR | 11 | C-14 … C-24 |
| INFO | 4 | C-25 … C-28 |
| **defects total** | **28** | |
| **superlatives** | **6** | S-1 … S-6 |
| refuted hypotheses (not published as findings) | 1 | §R |

---

## §1 — BLOCKERS

### C-1 · BLOCKER · Six of the seven controls have **no accessible name**; the tooltip supplies a *description*, never a name  `[prior C-1, corrected]`

**Provenance.** `:46` is the only `aria-label` in the file (`grep -c aria-label` → **1**); `grep -c '<DockIconButton'` → **7**. The six unnamed controls: `:54` (image overlay), `:59` (contour trace), `:71` (publish), `:77` (equation), `:87` (edit), `:93` (fullscreen). Each is wrapped in `@/components/ui/tooltip` → `Tooltip.vue:26-38` → `TooltipTrigger as-child` + `TooltipContent`. reka supplies **only** `aria-describedby`, and only while open (`reka-ui/src/Tooltip/TooltipTrigger.vue:110`); `TooltipContentImpl.vue:121-126` renders a `<VisuallyHidden role="tooltip">` as the *description* target. `aria-describedby` never satisfies the accessible-name computation.

**CORRECTION to the prior pass.** It stated the glyphs emit *"no `role`, no `aria-hidden`, no `<title>`"*, reading `defaultAttributes.js` + `createLucideIcon.js`. That is incomplete: `createLucideIcon.js:10-19` renders the shared `Icon` component, and **`Icon.js:41`** is
```js
...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }
```
None of the seven glyph callsites passes an `aria-*` prop or a default slot, so **every glyph does render `aria-hidden="true"`.** The conclusion is unchanged and *strengthened*: the glyphs are affirmatively removed from the a11y tree rather than merely mute.

**Failure scenario.** A screen-reader user tabs the expanded dock and hears bare *"button"* six times, across every state-changing control in the visualization's primary chrome. axe `button-name` (impact **critical**), WCAG 2.1 **4.1.2**. Collapsed, the dock is worse: the `#collapsed` slot (`:98-101`) is two more `aria-hidden` glyphs and GlassDock stamps no root label — all 14 `aria-label` occurrences in `dist/dock.js` belong to `DockLayerGroup` tabs, `DockSection`, `DockHairline` and `DockBackgroundToggle`, none to the `.glass-dock` root.

**Falsifier.** Show (a) reka wires the tooltip content as an `aria-labelledby` target — it does not (`TooltipTrigger.vue:110` is `aria-describedby`); (b) glass-ui's tooltip re-export interposes a label — `dist/tooltip.js` is a two-line re-export and `grep -o "aria-label" TooltipProvider-*.js` → empty; (c) `DockIconButton` injects a fallback — its whole prop surface is `{compact, type, as, asChild, class}` (`DockIconButton.vue.d.ts`).

**Cheapest cure.** `aria-label` on the six. The file proves it knows the idiom at `:46`, and `e2e/gallery.spec.ts:110-111` calls it *"the dock idiom."* The idiom is honoured at **1 of 7** sites in the very file the test names.

---

### C-2 · BLOCKER · The view toggles are **keyboard-dead by construction** — reka's hover-card content stamps `tabindex="-1"` on every tabbable node it holds — and its pointer open-path is touch-excluded  `[NEW]`

**Claim.** The two `<DockIconButton>`s in the `HoverPopover` `#content` slot (`:51-64`) are removed from the tab sequence by the primitive itself, on every open. The same defect repeats verbatim in the sibling `EditorControlsDock.vue:134-153`, so **four toggles across the two canvas docks** are affected.

**Provenance.**
- `:44` — `<HoverPopover side="top" align="center" keep-dock-open>`; the interactive payload is at `:51-64`.
- `dist/HoverPopover-Dpzwvc4t.js` — the non-`native` branch renders reka `HoverCardRoot / HoverCardTrigger / HoverCardPortal / HoverCardContent`. `native` defaults `false` (`HoverPopover.vue.d.ts`) and is not set at this callsite.
- **`reka-ui/src/HoverCard/HoverCardContentImpl.vue:66-72`**, inside `onMounted`:
  ```ts
  const tabbables = getTabbableNodes(contentElement.value)
  tabbables.forEach(tabbable => tabbable.setAttribute('tabindex', '-1'))
  ```
  `getTabbableNodes` (`utils.ts:12-25`) TreeWalks the whole content subtree accepting any node with `tabIndex >= 0`. A `<button>` has `tabIndex === 0`. **Both toggles are stamped `tabindex="-1"`.**
- The same file imports `DismissableLayer` **only** — no `FocusScope`, no `onOpenAutoFocus`. Nothing ever moves focus into the panel.
- `HoverCardTrigger.vue:41` — `@blur="rootContext.onClose()"`. Leaving the trigger schedules the close (`closeDelay` 150 ms).
- Touch: `HoverCardTrigger.vue:38` — `@pointerenter="excludeTouch(rootContext.onOpen)($event)"`, and `utils.ts:1-3` — `event.pointerType === 'touch' ? undefined : eventHandler()`. **The pointer open-path is unconditionally excluded for touch.**

This is Radix/reka's *designed* behaviour: a hover card is a non-interactive preview surface. The component put four of the canvas chrome's controls inside two of them.

**Failure scenario.** A keyboard user tabs to "View options"; the card opens on `@focus`. `Tab` skips both `tabindex="-1"` toggles and lands on the next dock control; the trigger blurs and the card closes. **Image overlay and Contour trace can never be operated by keyboard, in either dock, in either mode.** On a touch device the pointer path never opens the card at all — the only residual open-path is the incidental focus a tap grants a `<button>`.

**Falsifier.** Show that (a) `HoverPopover` mounts with `native: true` on an interest-invoker engine — it does not, `native` is unset and defaults `false`; (b) reka mounts a focus scope or restores `tabindex` — the `-1` loop is the file's only tabindex write; (c) the buttons render outside the portal — `HoverCardPortal` wraps `HoverCardContent`. The residual touch behaviour via `@focus` is `UNPROVEN-NEEDS-LIVE` (SS-13); **the `tabindex="-1"` half needs no browser** — it is an unconditional `onMounted` write in installed source.

**Why this is a CONSUMPTION defect.** glass-ui 4.0.0 already exports `./popover`, `./dropdown-menu` and `./context-menu`, plus the dock-native `DockDropdownTrigger`/`DockSelectTrigger` (`dist/components/custom/dock/index.d.ts:7-8`). The decisive evidence is internal: **`AnimationControls.vue:8-9`** — the other dock on the *same* stage — composes `DockDropdownTrigger` + `DropdownMenu`, the click-tier disclosure. Both idioms already live in this view; only the hover-tier one is keyboard-dead. **This migrates for free**: `./hover-popover` is removed at 5.0.0 anyway (C-4), so the F.W-migration must touch these lines regardless — landing them on `<Popover>`/`DockTrigger` rather than a mechanical rename closes the hole at zero marginal cost.

---

### C-3 · BLOCKER · Publish is un-gated on **all three hops** — N clicks mint N public gallery entities  `[prior C-7, upgraded]`

The prior pass rated this MAJOR and stopped at *"a second draft visualization row."* The third hop makes it worse than a double-submit: it is an unbounded entity-duplication path with no dedupe anywhere.

**The three hops, none of which guards.**

1. `CanvasControlsDock.vue:70-74` — `<DockIconButton :class="{ 'is-active': publishing }" @click="$emit('publish')">`. The component **receives** `publishing: boolean` (`:16`) — the exact in-flight bit — and spends it on a class and an `animate-pulse` (`:72`). No `:disabled`, no `aria-disabled`, no guard. `DockIconButton` renders a reka `Primitive` whose default host is `<button>`, so `:disabled="publishing"` falls straight through: **the fix is one attribute.**
2. `VisualizationView.vue:106-118` — `if (!store.imageSlug || !store.contour) return;` then `publishing.value = true`. **There is no `if (publishing.value) return;`** — the flag is written and never read as a guard (`grep -n "publishing" VisualizationView.vue` → `105, 108, 116, 219`: declare, set, clear, prop-bind).
3. `stores/workspace.ts:344-365` — `saveVisualization` (aliased `createSnapshot` at `:460`) is an unconditional `api.createVisualization({ visibility: "draft", image_slug, contour_hash, … })`. **No idempotency key, no existence check, no dedupe on `(image_slug, contour_hash)`.** Each call mints a new entity and overwrites `visualizationSlug`/`visualizationETag`. `stores/gallery.ts:219-234` then PATCHes that slug to `visibility: "public"`.

**Failure scenario.** Workspace with an extracted contour; the user double-clicks Publish (or clicks again out of impatience — there is no disabled state and no terminal feedback, C-12). Two `handlePublish` invocations run concurrently → two `POST /api/visualizations` (slugs A, B) → two ETag-guarded PATCHes → **two identical public gallery entries.** Repeat ad libitum.

**Falsifier.** Show a guard on any hop (`grep -n "disabled" CanvasControlsDock.vue` → 0; no debounce; no upsert). The prior pass already killed the strongest counter — *"the ETag guard catches it"*: each flight creates its **own** slug and stores `nextETag` only after its own PATCH resolves (`gallery.ts:229`), so the two never contend on a validator. A server-side uniqueness constraint is `UNPROVEN-NEEDS-LIVE` (SS-13) and would not rescue the UI, which would then surface N failures with no error affordance (C-12).

**Why this is a CONSUMPTION defect, not a parent defect.** The component owns the button and is *handed* the in-flight bit. A control that receives `publishing` and does not bind it to its own enabled state has mis-consumed its own prop contract. See C-28 for why the resulting defect is un-attributable across the client↔operation seam.

---

## §2 — MAJOR

### C-4 · MAJOR · Three glass-ui-7.0.0 **definition-absent** surfaces inside 132 lines — the densest removal site in the tree, and one is absent from the census break table  `[prior C-2, re-rated]`

| # | surface | site(s) | disposition at 7.0.0 |
|---|---|---|---|
| 1 | `@mkbabb/glass-ui/hover-popover` subpath | `:6` | **REMOVED at 5.0.0** → `<Popover>`. Producer `package.json` exports has `./popover`, no `./hover-popover`. |
| 2 | `DockIconButton` member | `:7` import + **7 usages** (`:46,:54,:59,:71,:77,:87,:93`) | **DEFINITION-ABSENT at 5.0.0** → `<DockControl>`. Producer `src/components/dock/index.ts`: *"folds the retired `DockIconButton` + `DockTabButton` onto a `shape` axis … The five legacy SFCs are DEFINITION-ABSENT (clean break, no alias)"*. |
| 3 | raw `.dock-separator` **class** | `:67`, `:82` markup + `:106-112` scoped CSS | **SUPERSEDED** by `<DockSeparator>` — which is already exported by the **installed 4.0.0** barrel (`dist/components/custom/dock/index.d.ts:9`), not only at 7.0.0. Its own docblock: *"the raw `.dock-separator` class was **axis-blind**."* |

Add a fourth axis the table does not carry: the seven `lucide-vue-next` glyphs at `:3-4` are 7 of the **35** sites that must re-point to `@lucide/vue` (lane-frontend §5). **Four of §5's break rows land inside 132 lines.**

**Extends the corpus.** lane-frontend §5 books rows 1 and 2 by exact line (`CanvasControlsDock.vue:6`, `:7`). **Row 3 is new** — neither the §5 break table nor the §4 shadow census has a `.dock-separator` row, because §4's method is component-name collision and this shadow is class-level. Sites: `:67`, `:82` here plus `EditorControlsDock.vue:130`.

**Re-rating, stated openly.** The prior pass rated this **BLOCKER**; this pass rates it **MAJOR**. Reason: the tree compiles and runs today (`vue-tsc --noEmit` exit 0, see C-5), and the break is contingent on a bump already booked as lane-frontend §9 carry 1 (P0). Reserving BLOCKER for defects live at HEAD keeps the severity axis legible; the P0 carry is where the schedule risk is recorded. Nothing factual is withdrawn.

**Falsifier.** Produce a 7.0.0 alias for any of the three — producer `dock/index.ts` states the legacy SFCs are alias-free, and the exports map has no `./hover-popover`.

### C-5 · MAJOR · `update:expanded` is declared **without a matching `expanded` prop** — a half-wired v-model whose value leaks into the DOM and name-collides with glass-ui's own state class  `[prior C-3, extended]`

`:26` declares `"update:expanded": [value: boolean]`; `:9-17` declares seven props and **none is `expanded`**. The parent binds the full model at `VisualizationView.vue:212` (`v-model:expanded="dockExpanded"`).

Desugared, the listener is consumed and the **value is not**: `expanded` is undeclared → fallthrough attr → `inheritAttrs` defaults true → root is `<GlassDock>`, which is declared **`inheritAttrs: !1`** and re-binds `$attrs` onto the inner dock div (`dist/dock.js`: `D("div", j({ref_key:"dockEl", ref:_}, t.$attrs, { class:["glass-dock", …, { expanded: W.value, collapsed: !W.value, … }] }))`). `expanded` is not in Vue's `isSpecialBooleanAttr` list, so `patchAttr` emits `setAttribute("expanded", "true"|"false")`.

Result on every render: `<div class="glass-dock … collapsed" expanded="false">` — an invalid HTML attribute **named identically to the state class glass-ui paints on the same element**, sourced from a different truth and lagging it by at least a tick (the attribute refreshes only after the child's `flush:'pre'` watcher emits → parent ref → parent re-render). Consequences: (i) the parent can never *drive* the dock — `dockExpanded = true` is a silent no-op; (ii) any `[expanded]` selector or Playwright locator matches in both states, while the existing suite uses `toHaveClass(/expanded/)` (`e2e/visualization-ux.spec.ts:88`) — two idioms for one state already coexist.

**EXTENSION (this pass): no gate catches it.** I ran `./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json` against the live tree: **exit 0**, one unrelated `TS2882` at `PaperView.vue:12`. And `inheritAttrs: false` on GlassDock also suppresses Vue's dev *"Extraneous non-props attributes"* warning. Typecheck silent, runtime silent, test silent.

**Falsifier.** Show `expanded` in `defineProps` (absent), `inheritAttrs: false` here (absent), or `expanded` in `DockProps` (`useDockShellProps.d.ts` — it is *exposed*, not accepted). **Cure:** declare and honour `expanded` (`expand()`/`collapse()` are both on the exposed surface), or rename the event so it stops advertising a contract it cannot honour.

### C-6 · MAJOR · The scoped `.dock-separator` **shadows and overrides** the shipped recipe — unlayered SFC CSS beats `@layer components` unconditionally  `[prior C-5, extended]`

Local `:106-112`: `width:1px; height:1.5rem; margin:0 .125rem; background: color-mix(in srgb, var(--foreground) 20%, transparent); flex-shrink:0`.
Shipped `dist/styles/dock/layer-group.css:35-41`, inside `@layer components {` (line 23): `@apply flex-shrink-0; width:1px; height: var(--dock-separator-height); margin: 0 .375rem; background: var(--surface-tint-15)` — **plus** `:45-53` (vertical dock → horizontal rule), `:56-62` (grid dock → full-row section break), and **`dist/styles/dock/overflow.css:166-168`** `.glass-dock.dock-overflow-wrap .dock-separator { display: none; }`. `--dock-separator-height` = `calc(var(--dock-h, var(--size-icon-btn)) * .5)` (`shell.css:24`).

Vue scoped styles are emitted **unlayered**; unlayered author rules beat every layered author rule regardless of specificity. So the local block deterministically replaces all four: the hairline is pinned at `1.5rem` instead of tracking `--dock-h`; the gutter is `.125rem` instead of `.375rem`; the tint bypasses the `--surface-tint-15` rung that the glass tier retints per surface; **and the overflow-wrap suppression is dead.** Three divergent copies of one class name now coexist — this file (`margin: 0 .125rem`), `EditorControlsDock.vue:179-184` (**no margin**), glass-ui (`0 .375rem`) — so two docks stacked on one canvas render visibly different dividers.

**Falsifier.** Show the local rule loses — it cannot; layers sit strictly below unlayered for the same origin, and `.dock-separator[data-v-…]` (0,2,0) also outranks `.dock-separator` (0,1,0) absent layering. Or show fourier declares an SFC layer — `src/style.css:1-3` declares none and `vite.config.ts` sets no `cssLayer`. **The primitive is available today**, not only at 7.0.0 (`dock/index.d.ts:9`).

### C-7 · MAJOR · Two icon-size idioms with **opposite cascade outcomes**; `:size="20"` is a dead prop  `[prior C-6, extended]`

Tailwind utilities at `:47,:72,:78,:88,:94`; lucide `:size="20"` at `:55,:60`; a third pair (`h-4 w-4` / `h-3.5 w-3.5`) at `:99,:100`.

glass-ui owns the glyph: `dist/styles/dock-controls/icon-button.css:132-137` `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); … }`, documented at `:124-131` as *"LIBRARY GLYPH OWNERSHIP … A consumer passing an explicit lucide size class still WINS (utility layer > component layer) — a DEFAULT, not a ceiling."* With `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` (`tokens/offsets-sizing.css:287`), `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale,1))` (`:264`), and `tokens/light-dark.css` lifting `--ui-scale` under `@media (pointer: coarse)`.

So the two idioms land in different tiers and resolve **opposite ways**:
- `h-4.5 w-4.5` (utilities layer) **WINS** → five glyphs hard-pinned at 1.125 rem = **18 px**, deaf to `--dock-scale`.
- `:size="20"` becomes SVG `width`/`height` **presentational attributes** (`Icon.js:31-33`), which lose to any author declaration → **overridden** by `--dock-icon-glyph`. **The prop is dead**: its only effect is to mislead the reader.

**Failure scenario.** On a coarse pointer the two popover glyphs render at ~30 px beside five 18 px rail glyphs, and the rail refuses the touch uplift entirely. Even on a fine pointer the idioms disagree: 18 px vs 20 px. **Falsifier:** show `h-4.5` resolves to something other than `calc(var(--spacing) * 4.5)` under Tailwind 4.3.1 (then the five are unsized and inherit the token — the *correct* outcome, and this row inverts to "the `:size` sites are the defective ones"), or show a presentation attribute outranks an author rule. **Cure:** delete both idioms; the producer default is the intended value.

### C-8 · MAJOR · Five toggles carry **zero ARIA state**, although the shipped recipe accepts `[aria-pressed="true"]` as an equal member of the same `:is()` — and this row **contradicts fourier's own 2026-06-16 audit**  `[prior C-8, extended]`

Five `:class="{ 'is-active': … }"` bindings at `:54, :59, :71, :77, :87`; no `aria-pressed`/`aria-expanded`/`aria-current` anywhere in the file. The glass-ui recipe is a *family*: `dock-controls/icon-button.css:109` `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`; `glass/material.css:231-234`; `dock-controls/touch-floor.css:64,82`. Switching `:class="{'is-active': showGhost}"` to `:aria-pressed="showGhost"` yields **byte-identical paint** and restores role+state — the current form pays an accessibility cost for **zero** styling benefit.

**⚠ EXPLICIT CONTRADICTION of an in-tree audit.** fourier's `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:2968` states: *"`.dock-icon-button.is-active` has NO backing paint in glass-ui dock.css OR fourier's scoped CSS — the toggled-on state currently renders identically to idle,"* attributing 5 of 7 sites to this file. **FALSE against the installed tree.** The paint exists (three selector families above), the token resolves (`tokens/offsets-sizing.css:405` `--dock-active-bg: var(--dock-control-active-bg)` → `:339` `var(--glass-bg-floating)`), and `DockIconButton` emits the required class (`dist/dock.js`: `"dock-icon-button glass-specular-track"`). That finding was true at the 3.1.0 pin and was **cured by the uncommitted 3.1→4.0 bump**; it must not be carried forward as written. The live residue is narrower and is this row: **paint yes, semantics no.**

**Orphaned specification.** `CanvasOverlayButton.vue:6,20` is an app-owned component whose docblock reads *"surfaces the `active` flag as both `aria-pressed` and the legacy `.is-active` class, matching the glass-ui canon for toggle buttons."* It has **zero consumers** repo-wide. `e2e/gallery.spec.ts:104-106` records why: *"The overlay actions migrated from the removed `.absolute.top-2.right-2` flex container into the glass-ui CanvasControlsDock."* **The migration into this dock dropped the `aria-pressed` half and orphaned the wrapper.** fourier's own A8-14 / CHR-26 book that file for deletion (planned M.W1, unexecuted) — **delete it only after the contract it documents is restored**, or the specification is lost with the code.

**Free at migration.** Producer 7.0.0 `src/components/dock/DockControl.vue:48-52,101-113` ships a **tri-state `active`** prop that stamps `aria-pressed="true|false"` + `data-active`, with `undefined` meaning "nav mode, no `aria-pressed`". `:active="showGhost"` replaces class + aria in one binding. **Falsifier:** show the ARIA arm does not paint — three independent families say otherwise, at the installed version (this is also what refuted the hypothesis recorded at **S-3**).

### C-9 · MAJOR · The sibling dock implements the *same* affordance with a *different* contract on seven axes  `[prior C-9]`

`CanvasControlsDock` vs `EditorControlsDock`, both mounted by `VisualizationView` over the same canvas, both driving the same two parent refs:

| axis | `CanvasControlsDock` | `EditorControlsDock` |
|---|---|---|
| emit name for the same state | `toggleImageOverlay` (`:23`) | `toggleOverlay` (`:41`) — parent wires **both** to `showImageOverlay = !showImageOverlay` (`VisualizationView.vue:223`, `:245`) |
| prop optionality for the same state | `showGhost: boolean` **required** (`:12`) | `showGhost?: boolean` **optional** |
| popover trigger name | `aria-label="View options"` (`:46`) | `aria-label="Overlay options"` (`:135`) |
| item order in the identical popover | image overlay, then contour trace (`:53,:58`) | contour trace, then image overlay (`:141,:146`) |
| state feedback for contour trace | static `Spline` + `.is-active` (`:59-61`) | dynamic `<component :is="showGhost ? Eye : EyeOff">` (`:144`) |
| separator host element | `<div class="dock-separator">` (`:67,:82`) | `<span class="dock-separator">` (`:130`) |
| emit idiom | `$emit(…)` in template ×6 | `emit(…)` via the typed const |

**Failure scenario.** The two docks swap on the `isEditing` flip over one canvas: a user toggling the image overlay finds the control in a differently-named popover, in inverted position, with different feedback semantics. Contract-side the parent maintains two aliases for one mutation. `EditorControlsDock.vue:144` is also one of the two dynamic-`:is` families intake **R3-10** proved were silently dropped between two Codex registries — the exhaustiveness hazard is live in this exact pair. **Falsifier:** show the two are not co-mounted over the same state — `VisualizationView.vue:210-226` and `:238-247` both bind `showImageOverlay`/`showGhost`.

### C-10 · MAJOR · The `W2.E` comment claims the out-of-band coupling was removed; the code still reaches into `defineExpose` — **because GlassDock emits nothing**  `[prior C-4, extended]`

`:31-33` claims the state is surfaced *"via a typed event rather than an out-of-band `defineExpose` the parent reaches into."* `:34-37` reads `dockRef.value?.expanded` — GlassDock's exposed surface (`GlassDock.vue.d.ts`: `expanded, isPinned, isHeld, isTransitioning, expand, collapse, keepOpen, release`). The reach was **relocated one level down**, not removed; `VisualizationView.vue:75-78` repeats the claim.

The coupling is guarded by `?.` + `?? false`. If the producer renames or drops the key — precisely what the 5.0.0 clean break did to five sibling dock SFCs — the getter yields `undefined` forever, `?? false` launders it into a legitimate-looking `false`, and the component reports **permanently collapsed**; the parent's `.dock-centered` re-centring silently never fires. No type error (the `?.` short-circuit is legal either way), no warning, no test (C-26).

**EXTENSION (this pass): this is substantially a producer gap.** `GlassDock.vue.d.ts` declares its emits type as **`{}`** — **glass-ui 4.0.0's GlassDock emits no `update:expanded`** — so reaching into the exposed ref is the *only* path available to any consumer. A dock whose expansion is observable only by instance reach-in cannot be composed in-band by anyone. → **BH/BI inbox relay**, per the standing formation law, alongside S-1.

**Falsifier.** Show the watcher would throw or fail typecheck on a renamed expose — `?.` is designed to swallow exactly that. The narrow claim that `expanded` survives 7.0.0 is true (producer still exposes it), so this is a **latent** coupling defect; severity is MAJOR because the file's own comment asserts the opposite invariant, which is what an F.W4 auditor would otherwise trust.

### C-11 · MAJOR · `hasData` is the wrong predicate for the control it gates — a visible Equation button whose click renders nothing  `[NEW]`

`:76` gates Equation on `hasData`. The parent supplies `VisualizationView.vue:121`:
```ts
const hasData = computed(() => store.epicycleData || store.basesData || store.computing);
```
but renders the panel at `VisualizationView.vue:231`:
```vue
<EquationPanel v-if="showEquation && store.epicycleData && !isEditing" …>
```
With `basesData` or `computing` alone, the button is visible and enabled, the click flips `showEquation`, and **nothing renders** — while `.is-active` (C-8's paint) asserts an on-state for a panel that does not exist. The prop contract is too coarse: the control needs `hasEquationData`, not the 3-way OR.

**Falsifier.** Show `store.epicycleData` is truthy whenever `basesData || computing` is — they are independent store fields set from different compute responses, not co-implied. State *frequency* is `UNPROVEN-NEEDS-LIVE`; the contract mismatch is static and certain. (Same shape as C-15's collapsed-slot hole, which is reachable through the same `hasData` looseness.)

### C-12 · MAJOR · `publishing` has no terminal state — success and failure are indistinguishable to every channel this component owns  `[NEW]`

`stores/gallery.ts:219-235` catches its own errors and toasts, returning normally. So `VisualizationView.vue:113-115`'s `catch` never sees a publish failure, and `finally` clears `publishing` identically for both outcomes. The Upload button returns to idle after a failure exactly as after a success.

The component's emit surface (`:19-27`) has no `publish-success`/`publish-error`; the button carries no `aria-busy`, no `aria-live`. Stacked with C-1 (no name) and C-8 (no pressed state), an AT user gets **nothing at all** — no name, no state, no busy, no result. The only channel is a toast rendered by a different subtree. This is also the affordance gap that makes C-3's repeat-click natural rather than pathological. **Falsifier:** find a result-bearing prop or emit, or an `aria-busy`/`aria-live` binding — 0 hits.

### C-13 · MAJOR · Portaling severs the **documented** dock-override channel for the two controls inside the popover  `[NEW]`

`HoverCardPortal` teleports the `#content` subtree to `<body>`, so the two `DockIconButton`s sit outside `.glass-dock` in the DOM. Global class rules still apply; the **custom-property channel does not**. `icon-button.css:104-107` names the sanctioned override path as *"Consumers override the active variant via the `--dock-active-{bg,color,scale,border,shadow}` cohort **scoped to a parent**"*, and GlassDock's `density` resolves through dock-scoped properties likewise. Both inherit — a portaled child inherits from `:root`, not from the dock.

Net: two of the seven controls are permanently pinned to root defaults while five follow the dock's scope, and any future density or active retune on this dock silently splits the cluster. **Falsifier:** show `HoverPopover` re-projects the dock's properties onto the portal — `HoverPopover-Dpzwvc4t.js` sets only `data-glass-dock-portal` / `data-glass-dock-owner`, identity markers for the click-away handler, not style scope.

---

## §3 — MINOR

**C-14 · `animate-pulse` is the tree's only site and is ungated under `prefers-reduced-motion: reduce`.** `[prior C-10]` `:72`; `grep -rn animate-pulse src/` → exactly one hit. The global reduce block covers only tab panels (`style.css:92-96`), and `tw-animate-css` ships no PRM gate. Extends lane-frontend §8's table (8 reduce blocks, 5 JS gates), which does not list this site. MINOR only because the animation's lifetime is bounded by one round-trip — though C-3 makes that bound less reliable than it reads.

**C-15 · The `#collapsed` slot advertises an Edit affordance the expanded dock may not have.** `[prior C-11]` `:98-101` renders `Maximize2` + `Pencil` unconditionally; Edit at `:86` is `v-if="hasContour"`. Reachable: the parent mounts on `hasData || (isEditing && store.contour)` and `hasData` is true during compute, before any contour exists (`VisualizationView.vue:121`). The summary is the dock's only visible surface at rest — and per C-1 its glyphs are `aria-hidden`, making them the sole *visual* affordance signal and semantically nothing.

**C-16 · Two emit idioms in a 37-line script; the typed handle covers 1 of 7 events.** `[prior C-12]` `:19` binds `const emit = defineEmits<…>()` but only `:36` uses it; the six user-facing events go through `$emit('…')` string literals (`:54,:59,:71,:77,:87,:93`). `$emit` *is* type-checked under vue-tsc, so this is not a soundness defect — it is an idiom split that makes the emit surface un-greppable by symbol, a real cost at F.W3/F.W4 where the census is symbol-driven.

**C-17 · Latent adjacent-separator hole in the props contract.** `[prior C-13]` With `!isEditing && !hasData && !hasContour`, `:67` and `:82` render back-to-back — a double hairline. Unreachable today *only* because of the parent's `v-if`; the component declares no such invariant and the two `v-if`s are on the *contents*, never on the separators.

**C-18 · `side="top" align="center"` restate shipped defaults, and `top` is the wrong declared side for this anchor.** `[prior C-14, extended]` `:44`. `HoverPopover.vue.d.ts` defaults are `side: "top"`, `align: "center"`, `sideOffset: 6`. Two of three props passed are the defaults, enlarging the surface C-4's `Popover` rewrite must re-verify. **Extension:** the parent anchors the dock at `top: .5rem; right: .5rem` of the canvas stage (`VisualizationView.vue:450-459`), so every open begins in collision and survives only because `HoverPopover` hard-sets `avoid-collisions` (`HoverPopover-Dpzwvc4t.js`). A declared side that always flips is a mis-declared prop.

**C-19 · `ref<InstanceType<typeof GlassDock>>()` instead of Vue 3.5's `useTemplateRef`.** `[prior C-15]` `:29`. The tree is Vue 3.5 and `useTemplateRef` is the project's stated 3.5 idiom. The current form is correct and well-typed (**S-4**) — an idiom row, not a correctness row.

**C-20 · The Publish gate is not the Publish precondition.** `[NEW]` `:70` gates on `hasContour` alone; `handlePublish` early-returns on `!store.imageSlug || !store.contour` (`VisualizationView.vue:107`). Where a contour exists without an image slug, the button renders, the click emits, and nothing happens — no toast, no state change, no feedback (C-12). Reachability `UNPROVEN-NEEDS-LIVE`; the gate≠precondition mismatch is static.

**C-21 · `.view-dot` is an OR of two independent booleans.** `[NEW]` `:48` `v-if="showImageOverlay || showGhost"` — one dot for two states, so it cannot say *which* is on, and the disambiguation lives only inside the keyboard-dead popover (C-2). No `aria-*` equivalent, and no transition, so it hard-pops during the dock morph.

**C-22 · The local `Tooltip` adapter is dock-unaware.** `[NEW]` `components/ui/tooltip/Tooltip.vue` exposes only `{text?, side?}` — no `keep-dock-open`, no `data-glass-dock-portal`, no `align`/`delayDuration` passthrough. The sibling `HoverPopover` in the same file *does* pass `keep-dock-open` (`:44`), so two overlay surfaces inside one dock carry different dock-hold semantics. These are 6 of intake **R3-7a**'s 35 callsites; live re-count of this file (`:53,:58,:70,:76,:86,:92`) = **6**, matching R3-7a exactly. Carry target F.W3.

**C-23 · The watch is not `immediate`, and the parent's mirror goes stale across the `v-if` window.** `[NEW]` `:34-37` conflates "child not yet mounted" and "collapsed" into one emitted `false` via `?? false`. More materially, `dockExpanded` (`VisualizationView.vue:78`) is never reset on unmount: the anchor is `v-if`-gated (`:210`), so unmounting an expanded dock leaves `dockExpanded === true` until a remount re-fires the watcher. Harmless today only because `.dock-centered` rides the same `v-if` node.

**C-24 · Seven lucide symbols on one 100-column import line with a trailing `Spline, }`.** `[NEW]` `:3-4`. These are 7 of the **35** sites that must re-point to `@lucide/vue` at glass-ui 7 — the fourth §5 break axis this file carries (C-4).

---

## §4 — INFO

**C-25 · Zero value.js and zero keyframes.js consumption — while adding two `--viz-amber` read sites to the F.W2 colours surface.** `[prior C-16, extended]`
Direct **and transitive**: the file's five import lines resolve to `vue`, `lucide-vue-next`, the local Tooltip barrel and two glass-ui subpaths; the Tooltip adapter imports only `@mkbabb/glass-ui/tooltip`. **No edge reaches value.js or keyframes.js.** lane-frontend §5 enumerates the whole value.js consumer surface as 5 sites (`easeInOutSine`/`timingFunctions`); none is here. **Consequence for F.W2: this file contributes zero to the value.js `0.13 → 4.0` migration budget** — cost-free on the value.js leg, expensive on the glass-ui leg (C-4).
It nonetheless consumes the viz palette *through CSS*: `:128` `background: var(--viz-amber)` and `:129` `color-mix(in srgb, var(--viz-amber) 60%, transparent)` — a glass-ui token that fourier locally overrides at `style.css:120,125` (the D.W4.d WCAG darken, itself a held upstream carry). That token's **JS twin** is produced by the hand-rolled arm the axis brief names: `lib/colors.ts:120-152` `cssVarToHex()`, a regex CSS-colour parser (`hsl()` / bare HSL triplet / `rgb()`, `return "#888888"` on miss) plus `hslToHex`/`rgbToHex`, re-run on every dark-mode flip via `App.vue:11-17`. value.js 4.0.0's `parseCssColor` is the supersession target; these two lines are the CSS-side half of the same token and belong in the F.W2 crosswalk denominator.
Motion is likewise delegated: the collapse↔expand morph is GlassDock's `--dock-morph-t` CSS spring (`dist/styles/dock/layers.css:130-176`), so keyframes.js is correctly absent. The one hand-authored motion is `animate-pulse` (C-14).

**C-26 · No gate measures this component's controls.** `[prior C-17, extended]` `e2e/gallery.spec.ts:104-115` locates `.controls-dock-anchor .glass-dock`, hovers, and asserts exactly one node: `[aria-label="View options"]` — the convention C-1 shows is honoured once and broken six times, which is *why* only one control is assertable. **Extension — the axe gate never sees this dock at all:** of the four keystones in `e2e/visualization-ux.spec.ts`, **three are `test.fixme`** (keystones 1, 2, 4 — all booked against the glass-ui `aria-hidden-focus` `ConfiguratorLayer` baseline), the surviving keystone 3 runs `openWorkspace` → `openMoreOptions`, which expands the **AnimationControls** dock and never this one; and GlassDock's inactive layer is `visibility: hidden` (`dist/styles/dock/layers.css:148-153`), which axe skips. So C-1's six `button-name` criticals and C-8's five missing states are invisible to CI by construction, not by luck.

**C-27 · Repo-level peer breach.** `npm ls @mkbabb/value.js` in `web/` → `ELSPROBLEMS`: `@mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui`. Not this component's defect; recorded because every glass-ui symbol it imports resolves through that invalid graph. Concurs with the `AnimationControls` sibling challenge row C-1.

**C-28 · Fold of intake R6-8 — this dock is the UI head of a non-isolable seam.** The component makes **zero** direct API calls (no store, no `lib/api.ts`, no router). Its entire API participation is one emit:
```
CanvasControlsDock.vue:71  $emit('publish')
 → VisualizationView.vue:106 handlePublish()
    → stores/workspace.ts:344 saveVisualization() → api.createVisualization  (POST  /api/visualizations)
    → stores/gallery.ts:219   publish(slug)       → api.updateVisualization  (PATCH /api/visualizations/{slug})
```
The second leaf is verbatim the pair **R6-8** proved structurally non-isolable: C31's mutation target is `{"kind":"replace","target":"web/src/lib/api.ts","before":"{ method: \"PATCH\", body: { ...patch }, headers }"}`, and flipping the client verb mutated **both** `client.method.visualization-update` and `operation.method.visualization-update`, because the operation record embeds `"clients": ["client:updateVisualization"]` with `clientDisposition: "CLIENT_MATCH_SOURCE_DERIVED"`. Live endpoints confirmed by that lane at `lib/api.ts:420` and `api/routers/visualizations.py:350`.
**Consequence.** If C-3 is cured client-side (a `:disabled` binding) the F.W5 conformance fixture still registers a two-sided delta. The shared-provenance contract must split the client↔operation join into a separate relation **before** this leaf is used as a fixture — R6-8's carry to F.W5, now with a named consumer. Per **X-3** the path touches 2 of the 30 public-non-admin operations. The duplicate-draft residue also lands in the entity family of census risk 5 / **X-8** (the `depth=0` phantom version chain, booked by fourier's own `docs/tranches/M/M.md §7` for M.W10).

---

## §5 — Superlatives (L-18, both ways)

**S-1 · `:start-collapsed="true"` is *not* redundant — it defends against a live producer Boolean-prop trap, and is the only reason the dock starts collapsed.** `[prior S-1, independently re-verified]`
The hypothesis was that `:41` merely restates a documented default and should be deleted. **The tree refutes it.** `useDockShellProps.d.ts` documents *"Start in the collapsed state (default true)"* and the compiled read site is `startCollapsed: C(() => c.value ? !1 : e.startCollapsed ?? !0)`. But the compiled prop declaration is **`startCollapsed: { type: Boolean }`** (verified independently this pass in `dist/dock.js`) — and **Vue's Boolean cast resolves an absent prop to `false`, never `undefined`** — so the `?? true` arm is **unreachable**. Absent the consumer's explicit binding the dock would start **expanded**, contradicting the producer's own docstring. This component (and `EditorControlsDock.vue:55`) are the sites that get it right. The irony is in the producer's own tree: the `alwaysExpanded` docstring in `useDockShellProps` explains this exact Vue boolean trap as the reason a positive `collapsible` prop was rejected — while `startCollapsed` falls into it. **This is a glass-ui-side defect → BH/BI relay** (with C-10), not a fourier one. **Falsifier:** show a `withDefaults` entry or a runtime `default: true` — neither exists in producer source or the installed build.

**S-2 · `keep-dock-open` is the exactly-right use of the J.W3.B dock-keep sink, and it ports 1:1 through the 5.0.0 removal.** `[prior S-2]` `:44`. `HoverPopover.vue.d.ts` documents it as holding the parent dock open while the popover is visible, ref-counted so multiple holds compose. Without it the dock's 2 s idle-collapse would retract out from under an open popover; the compiled watcher is visible at `HoverPopover-Dpzwvc4t.js`. Producer `Popover` carries the same `keepDockOpen` wiring, so this is a rare clean leg in an expensive hop — worth naming so F.W2 budgets no redesign. Contrast the two *silent* `inject("dockKeepOpen", null)` sites the producer barrel calls out by name (`SliderControl.vue`, `GlassTimeline.vue` — *"silently no-op without it; a functional regression on scrub gestures"*): **this file is on the right side of that line.**

**S-3 · `.is-active` is live, not dead — and the in-tree claim about the glass-ui canon is TRUE.** `[prior S-3, extended]` The hypothesis was that `.is-active` on a `DockIconButton` had no recipe at 4.0.0, which would have made every state binding a no-op (a BLOCKER). **Refuted** by three independent selector families at the installed version. Consequently `CanvasOverlayButton.vue:7`'s assertion — *"matching the glass-ui canon for toggle buttons"* — is **verified true**, a claim neither lane-frontend nor the census tested. **Extension:** the same evidence refutes fourier's own 2026-06-16 `raw-findings.json:2968` (C-8). Recorded so no downstream wave re-litigates it. C-8 stands *because* the ARIA arm sits in the same `:is()`, not because the class arm is broken.

**S-4 · The template-ref typing is sound through a non-obvious `.d.ts` intersection.** `[prior S-4, corroborated]` The hypothesis was that `InstanceType<typeof GlassDock>` resolves to `{ $slots: … }` (TS picks the last construct signature of an intersection), making `dockRef.value?.expanded` a type error or an un-unwrapped `Ref<boolean>`. **Refuted** by the prior pass's isolated TS experiment, and **corroborated whole-project this pass**: `vue-tsc --noEmit -p tsconfig.json` over the live tree exits **0** with one unrelated `TS2882`. `ShallowUnwrapRef` resolves the exposed `Ref<boolean, boolean>` to `boolean` through the intersection, so `value ?? false` at `:36` is well-typed rather than a defensive cast — and Vue's expose proxy is `proxyRefs`-wrapped, so the read is both unwrapped **and** reactively tracked, which is why the watcher fires on mount without `immediate: true`.

**S-5 · A genuinely clean presentational seam, at the correct altitude, with zero API coupling.** `[prior S-5, extended]` Zero store imports, zero `lib/api` imports, zero router, zero composables, zero `defineExpose`, zero prop mutation. All seven props are primitives and **all seven are consumed** — `isEditing` `:42,:87`; `showImageOverlay` `:48,:54`; `showGhost` `:48,:59`; `showEquation` `:77`; `hasData` `:76`; `hasContour` `:70,:86`; `publishing` `:71,:72` — with no dead declaration and no unused import (the one dead *value* is lucide's `:size`, a producer-cascade artefact, C-7). Six of seven emits are payload-free; every piece of state, including `publishing`'s async lifecycle, is owned above. Against `VisualizationView.vue` (486 LOC of orchestration) and `BasisCanvas.vue` (547), this is the correct altitude, and the glass-ui adoption is compositional rather than forked. **The defects above are contract and version-gap defects, not architecture defects.**

**S-6 · The GlassDock collapse idiom is consumed, not hand-rolled.** `[NEW]` `fit-content` + `:start-collapsed="true"` + a `#collapsed` slot (`:41,:98-101`) is precisely the sanctioned surface (`useDockShellProps.d.ts` `fitContent`/`startCollapsed`; `GlassDock.vue.d.ts` slot map `persistent | default | collapsed | rail`). No invented width knob, no consumer `width:` override — compare the sibling challenge row `AnimationControls` C-10, which invents `--animation-dock-max-width` and fights the dock's resize spring.

---

## §R — Refuted hypothesis of *this* pass (recorded, not published as a finding)

**Hypothesis.** *"The image-overlay control is `v-if="!isEditing"`-gated (`:42`) while `ContourEditorCanvas` consumes `:show-image-overlay` (`VisualizationView.vue:206`) — so the setting is honoured in edit mode and unreachable there."* Drafted as a MAJOR.

**Refuted by the tree.** `EditorControlsDock.vue:134-153` ships its own "Overlay options" `HoverPopover` containing **both** Contour trace (`:143`) and Image overlay (`:148`), and `VisualizationView.vue:238` mounts that dock exactly when `isEditing && store.contour`. The control is therefore reachable in edit mode — via the sibling dock. The residue is not unreachability but *divergence*, which is already booked at **C-9** (different popover name, inverted item order, different feedback semantics).

Recorded because the refutation carries a real consequence: **C-2's keyboard-death applies to that popover too**, so the edit-mode path is not an escape hatch — it is a second instance of the same BLOCKER. Four toggles across two docks, one root cause.

---

## §6 — What F.W-migration should do with this file (single paragraph, no new claims)

Both glass-ui import lines are on the 5.0.0 removal list (C-4), so this file is touched by the tri-package atomic bump regardless. Landing `HoverPopover → Popover` as a *primitive-class change* rather than a rename closes C-2; landing `DockIconButton → DockControl` with `:active="…"` closes C-8 and satisfies C-1 in the same pass if `aria-label` is added at the six sites; deleting `:106-112` in favour of `<DockSeparator>` closes C-6; deleting both icon-size idioms closes C-7. C-3, C-5, C-11, C-12 and C-20 are contract defects independent of the bump and can land today. `CanvasOverlayButton.vue` should be deleted **after** C-8, not before (it is the written specification of the contract this dock dropped).

---

## §7 — Method and limits

Read-only throughout `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`; the sole write is this file. Producer behaviour was read from the **installed** `web/node_modules` artefacts (`.d.ts`, compiled ESM chunks, shipped CSS partials) — never from a changelog; producer-7.0.0 rows are read from the glass-ui working tree at `64e23000` and labelled as such. Two commands were executed, both non-mutating: `vue-tsc --noEmit -p tsconfig.json` (exit 0, one pre-existing unrelated `TS2882`) and `npm ls @mkbabb/value.js` (exit `ELSPROBLEMS`). **No browser tooling.** Livable-only residues are marked `UNPROVEN-NEEDS-LIVE` for SS-13 and are confined to C-2's incidental touch open-path via `@focus`, C-11's and C-20's state *frequency* (both mismatches are static), and C-3's server-side uniqueness. **No BLOCKER depends on a live run:** C-1 is a compile-time attribute fact, C-2 is an unconditional `onMounted` write in installed source, C-3 is three un-guarded hops. The claims that would ordinarily need a live page (C-7's rendered glyph sizes, C-5's emitted DOM attribute, C-6's cascade outcome) are derived instead from the compiled render function, the `@layer components` declaration at `dock/layer-group.css:23`, and Vue's documented `patchAttr` / Boolean-cast semantics — a live confirmation at SS-13 would be corroborative, not load-bearing.

---

## §8 — Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `lane-frontend:93` — *"`CanvasControlsDock.vue` \| 132 \| `GlassDock` + `DockIconButton` view controls"* | **AGREE on the count** (live `wc -l` → 132). **INCOMPLETE on the surface**: omits `HoverPopover` (`:6`, which §5 itself books) and the 6 Tooltip callsites. Full surface = 4 symbols over 3 subpaths. |
| `lane-frontend §5` — `hover-popover` ×2, `DockIconButton` ×2 hit fourier today | **AGREE**, line-exact, and **EXTENDS**: the raw `.dock-separator` class is a third removed surface here (2 sites) absent from the §5 table, and the 7 lucide glyphs are a fourth axis (C-4). |
| `lane-frontend §3` — *"adoption is deep and idiomatic, not superficial"* | **AGREE** for composition (S-5, S-6); **QUALIFIES** for CSS — this file overrides two shipped contracts (`.dock-separator` recipe, `--dock-icon-glyph` ownership): C-6, C-7. |
| `lane-frontend §4` — the shadow census (9 components) | **EXTENDS**: not a component-level shadow, but a **class-level** shadow (`.dock-separator`) that §4's name-collision method cannot see. |
| `lane-frontend §8` — reduced-motion gap table | **EXTENDS**: `animate-pulse` at `:72` is a third ungated site, absent from the table (C-14). |
| `lane-frontend §9` carry 5 — *"value.js consumer surface is tiny (5 sites)"* | **CORROBORATED and narrowed**: none of the 5 is in this file; the file's value.js migration cost is **zero** (C-25). |
| intake **R3-7a** (35 Tooltip callsites / 9 consumers; `CanvasControlsDock` = 6) | **CORROBORATED exactly** — live callsites `:53,:58,:70,:76,:86,:92`. F.W3 budget for this file = 6. |
| intake **R3-10** (6 dynamic `:is` families, two silently lost) | **TOUCHED**: `grep "component :is"` in this file → **0**, so it is outside the F.W4 dynamic-family budget; one of the two lost sites (`EditorControlsDock.vue:144`) is the sibling half of C-9's divergence pair. |
| intake **R4-9** (audited scope byte-identical to the F.W0 tree) | **RELIED ON** — every line cited was read from the live tree at HEAD `cd26c653`. |
| intake **R6-8** (operation record embeds client back-references ⇒ non-isolable seam) | **APPLIED with a named consumer** — C-28; C-3's duplicate-write defect is un-attributable to one side until F.W5 splits the join. |
| intake **X-3** (45 total / 30 public-non-admin / 13 admin) | **CONSISTENT** — this path touches 2 of the 30 public operations. |
| fourier `2026-06-16-M-deep-audit/raw-findings.json:2968` — *"`.dock-icon-button.is-active` has NO backing paint"* | **CONTRADICTED.** False against installed 4.0.0 (`icon-button.css:109`, `material.css:231-234`, `touch-floor.css:64,82`; tokens `offsets-sizing.css:339,405`). True at the 3.1.0 pin, cured by the uncommitted bump. Live residue is `aria-pressed`, not paint (C-8, S-3). |
| fourier `A8-no-legacy-sweep.md:29` (A8-14) + `2026-06-17-M-critique-audit` CHR-26 — `CanvasOverlayButton.vue` dead, DELETE planned M.W1, unexecuted | **CONFIRMED still dead** at HEAD (0 consumers repo-wide). **RE-FRAMED**: it is the written specification of the `aria-pressed` contract this dock dropped — sequence the delete *after* C-8 (C-8, §6). |
| prior pass at this path (2026-08-04 12:53) | **SUPERSEDED, folded whole.** 17 rows carried (1 corrected: lucide `aria-hidden`; 1 re-rated: C-4 BLOCKER→MAJOR, reason in place; several extended). 11 rows added, incl. the BLOCKER C-2. 1 of its findings (S-1) independently re-verified. Its evidence refuted one draft row of this pass (§R). |
