claude-opus-5[1m] (served model id)

# CHALLENGE — `CanvasOverlayButton.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasOverlayButton.vue`
(595 B, 25 lines, mtime 2026-06-02) at fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`,
tree `9a66411d16fe4ec564d67367ca55e5f97da2a6d4` — the exact substrate R4-9 pinned and F.W0 opens on.
Not among the 27 modified paths of the frozen M.W1a tree.

**Import closure read whole** (the file has exactly one import):

| edge | resolved artifact | read |
|---|---|---|
| `@mkbabb/glass-ui/button` | `web/node_modules/@mkbabb/glass-ui@4.0.0` → `dist/button.js` → `dist/button-BNDWhAZb.js` (the Button SFC + its CVA) + `dist/components/ui/button/{index,Button.vue}.d.ts` | whole |
| (paint closure of that import) | `dist/styles/glass/surfaces.css`, `dist/styles/glass/material.css`, `dist/styles/utilities/btn.css`, `dist/styles/dock-controls/{icon-button,tab-button,triggers,touch-floor}.css` | all `.is-active` / `glass-btn` / `btn-glass` / `aria-pressed` sites |
| (successor, for the F.W1 hop) | `/Users/mkbabb/Programming/glass-ui@7.0.0` `src/components/button/{index.ts,Button.vue}`, `dist/components/button/Button.vue.d.ts`, `src/styles/glass/material.css`, `src/styles/accessibility.css` | whole / all relevant |
| (semantics of the wrapper's own forwarding) | `vue@3.5.38` `@vue/runtime-core` `cloneVNode` / `mergeProps`; `@vue/runtime-dom` `patchAttr` | the three functions |

**Method.** Static + source-derived only. No browser tooling; no product source mutated in any repo;
the single write is this file. Live receipts are `grep` / `find` / `git` / `node -e` over the two
read-only trees. Nothing here is marked UNPROVEN-NEEDS-LIVE — every claim below is decidable from
bytes, and I say so per row.

**Posture.** Assumed defective. It is. Ten defects survive their falsifiers, two of them blocking;
four superlatives also survive (L-18 runs both ways) and one of them is load-bearing for the cure.

---

## §0 — The subject, verbatim, with line anchors

```
 1  <script setup lang="ts">
 2  /**
 3   * A.W3.b — canvas-overlay icon-button wrapper.
 4   *
 5   * Forwards every attr/listener to `<Button variant="glass" size="icon">` and
 6   * surfaces the `active` flag as both `aria-pressed` and the legacy
 7   * `.is-active` class, matching the glass-ui canon for toggle buttons.
 8   */
 9  import { Button } from "@mkbabb/glass-ui/button";
10
11  defineProps<{
12      active?: boolean;
13  }>();
14  </script>
15
16  <template>
17      <Button
18          variant="glass"
19          size="icon"
20          :aria-pressed="active"
21          :class="{ 'is-active': active }"
22      >
23          <slot />
24      </Button>
25  </template>
```

No `<style>` block. No `defineOptions`, `defineEmits`, `defineSlots`, `defineExpose`.

---

## §1 — DEFECTS

### L-1 · **BLOCKER** — dead module: zero consumers, zero dynamic reachability, and an ordered deletion that was executed-as-skipped

**Claim.** The file cannot be reached by any path in the application and has never been reachable.
Its deletion is an *ordered, planned, wave-scoped step* that the executed branch did not perform and
did not record as unperformed.

**Provenance.**
- Reachability, live: `grep -rn "CanvasOverlay" /Users/mkbabb/Programming/fourier-analysis/web/`
  → **zero hits outside the file itself** (`src/`, `e2e/`, root `*.ts`, `*.json` all clean).
- Dynamic-resolution closure, live: `grep -rn "import.meta.glob\|defineAsyncComponent\|resolveComponent\|app.component("`
  over `web/src` → **four hits, all in `GalleryView.vue:2,31,32,33`**, and all three
  `defineAsyncComponent` calls take *string-literal* paths (`./gallery/AdminUserList.vue`,
  `./gallery/AdminFlaggedPanel.vue`, `./gallery/AdminAuditLog.vue`). No glob, no `resolveComponent`,
  no global registration, no component-as-prop family that could name it.
- The order, five times over, all in fourier's own tree:
  `docs/tranches/M/M.md:141` ("dead component, 0 consumers | **DELETE** outright | W1/W5");
  `docs/tranches/M/design/M-design-language.md:70`;
  `docs/tranches/M/design/M-bump-migration.md:56` and `:199` (STEP `2i DELETE CanvasOverlayButton.vue`);
  `docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:29` (A8-14);
  `docs/audits/runs/2026-06-17-M-critique-audit/findings-index.txt:105` (CHR-26) and `:144` (A8-21).
- The skip, self-reported:
  `docs/audits/runs/2026-06-17-M-critique-audit/partial-prior-run.json:207-211` — "A3-05:
  `CanvasOverlayButton.vue` was NOT deleted — plan STEP 2i (dead-component removal) skipped".

**Why blocking.** F.W0's first act is land-or-abandon on the 28-path frozen tree
(CENSUS §4 item 1, §5 risk 2). The tree cannot be *landed* as "M.W1a executed" while a numbered step
of M.W1a's own plan is unexecuted and the branch carries no record of the divergence. Either the step
runs or the divergence is minuted.

**Falsifier.** Any importer in any tree state; any string-keyed or glob mount; any e2e/story/test
reference; any build-time registration. All four checked above, all empty. *Conditional downgrade:*
if F.W0 rules ABANDON on the M.W1a tree wholesale, STEP 2i dies with the plan and L-1 drops to MAJOR
— the deadness survives, the governance blocker does not.

---

### L-2 · **BLOCKER** — the dead file is a hard `vue-tsc` break on the glass-ui 4→7 hop, and it is **absent from the census break surface**

**Claim.** Under F.W1 (the atomic tri-package uplift, CENSUS §5 risk 1), `size="icon"` at line 19
becomes a definite `TS2322` against glass-ui 7.0.0, failing `npm run build` — because tsconfig roots
the program on a glob, not on the import graph, so an unreachable SFC still gates the typecheck.

**Provenance.**
- glass-ui **4.0.0** (installed): `dist/components/ui/button/index.d.ts:4-6` —
  `size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm"`, `variant?: … | "glass" | …`. Both
  attributes are legal today.
- glass-ui **7.0.0** (the LATEST the commission audits against):
  `src/components/button/Button.vue:15-31` = `dist/components/button/Button.vue.d.ts:4-19` —
  `export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">`, and `ButtonProps` carries
  `emphasis` / `tone` / `size` / `iconOnly` / `loading` / `type` / `disabled` / `class`.
  **There is no `variant` prop and `"icon"` is not in `ButtonSize`.**
- Program roots: `web/tsconfig.json:20` — `"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue", "env.d.ts"]`.
  A glob include makes every `.vue` under `src` a root file of the program regardless of reachability.
- The gate: `web/package.json` `"build": "vue-tsc -b && vite build"` — the typecheck **is** the build,
  and the CF-Pages SPA deploy is gated on the same-SHA green CI ([DOCS §6]).
- The two attributes decompose differently, and I separate them because their certainty differs:
  - `size="icon"` (line 19) → `size` **is** a declared prop with a closed string union. `"icon"` is
    not assignable. **Definite type error.** No ambiguity about excess-property semantics.
  - `variant="glass"` (line 18) → `variant` is *not* a prop at 7.0.0, so it degrades to a fallthrough
    attr and lands on the host `<button>` as a literal `variant="glass"` DOM attribute (invalid HTML,
    zero paint) *unless* `vue-tsc`'s excess-property check on the generated props literal fires first.
    **Either branch is a defect**; I do not claim which, because glass-ui 7 is not installed in
    fourier and installing it would be a write.
- **Census amendment.** CENSUS §3a [FE §5] enumerates the uplift break surface as: `metric-badge` ×7
  files, `hover-card` ×2, `hover-popover` ×2, dock members ×3, `ToastVariant`, `lucide-vue-next` ×35,
  pencil-boil. **The Button `variant`/`size` axis rename is not in that list**, and it is not small:
  live `grep` over `web/src` → **35 files import `@mkbabb/glass-ui/button`**, **123 `variant="` attribute
  lines**, **38 `size="icon"` lines** (the Button-attributable subset of those two figures is
  UNMEASURED here and is an F.W1 enumeration item, not a claim).
- The cure, derived from the two type declarations for the record:
  `variant="glass"` → `emphasis="secondary"` (+ default `tone="neutral"`, which is what selects the
  `glass-wash glass-capsule` material at `Button.vue:47-51,66-72`); `size="icon"` → `iconOnly` with
  `size="md"`. For **this** file the cure is `git rm` — it is the only member of the break class where
  deletion is a complete fix, because it is the only unreachable one.

**Falsifier.** `size` ceasing to be a declared prop at 7.0.0, or `"icon"` re-entering `ButtonSize`
(read: it does not — `Extract<Size, "xs"|"sm"|"md"|"lg">`); or a tsconfig that roots on entry points
rather than globs (read: it globs); or `vue-tsc -b` not propagating a non-zero exit (the M-critique's
complaint at `partial-prior-run.json` was `-b` masking a *TS2882 CSS-side-effect* diagnostic, not
masking prop-assignability errors — those fail the build).

---

### L-3 · **MAJOR** — `.is-active` is provably **inert** on this element in the installed glass-ui 4.0.0; the docblock's "matching the glass-ui canon" (line 7) is false as installed

**Claim.** Line 21 toggles a class that matches no selector reachable by this element. The paint the
component believes it is invoking belongs to a different class name.

**Provenance (all in `web/node_modules/@mkbabb/glass-ui@4.0.0`).**
1. `<Button variant="glass">` emits, per the CVA at `dist/button-BNDWhAZb.js:61`:
   `"glass-wash btn-glass text-foreground hover:… aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]"`,
   plus the base at `:49` (`btn-pill tap-squish focus-ring …`) and the size arm at `:70`
   (`icon: "h-(--control-h-md) w-(--control-h-md) p-0"`). Host classes therefore include
   `btn-pill`, `btn-glass`, `glass-wash` — and **not** `glass-btn`.
2. The only `.is-active` rule in the whole 4.0.0 stylesheet that could paint a *button* is
   `dist/styles/glass/surfaces.css:111-116` — `.glass-btn.is-active, .glass-btn[aria-pressed="true"] { background/border-color/color }`.
3. **`glass-btn` ≠ `btn-glass`.** They are two distinct, separately-authored utilities:
   `surfaces.css:47-57` defines `.glass-btn` as "the FIXED-square icon primitive
   (width/height: var(--size-icon-btn) + contain:paint)" for hand-authored markup;
   `surfaces.css:182-184` defines `.btn-glass { backdrop-filter: var(--glass-blur-btn); }` as the
   backdrop re-point the Button CVA applies. `grep -rn "btn-glass" dist/` → the CVA (5 lines) plus
   those two definition/comment sites. The Button component never emits `.glass-btn`.
4. The specular `.is-active` arm is **dock-family-scoped**: `dist/styles/glass/material.css:231-234`
   lists exactly `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`,
   `.dock-dropdown-trigger`. `dist/styles/dock-controls/icon-button.css:109-115` likewise. Neither
   touches `glass-wash` / `btn-glass` / `btn-pill`.
5. There is **no unscoped `.is-active`** rule: `grep -rnE '^\s*\.is-active' dist/styles/` → two hits,
   both interior members of a `:is()` list inside `.dock-select-trigger` / `.dock-dropdown-trigger`
   (`dock-controls/triggers.css:100,106`).
6. Consumer side: the SFC has **no `<style>` block**, and `grep -rn "is-active" web/src/style.css`
   → **zero**. Every fourier `.is-active` CSS rule is scoped to a foreign hook
   (`.eq-toggle-btn`, `.floating-toc-item`, `.sidebar-link`, `.easing-chip`, `.preset-pill`,
   `.filter-toggle`, `.nav-dropdown-item`).

**Consequence.** As installed, `active` paints via `aria-pressed` alone (the CVA's
`aria-pressed:bg-[…]` Tailwind arm, receipt 1). The `.is-active` half is decorative DOM noise. The
docblock's third clause is therefore **false**, and the second clause ("both") is misleading: the
component surfaces one working signal and one dead one.

**Falsifier.** Any selector in the 4.0.0 cascade matching `.is-active` on an element carrying
`btn-pill` / `btn-glass` / `glass-wash` without a dock-family ancestor class; or a fourier global rule
supplying one. Both searched exhaustively above; neither exists.

---

### L-4 · **MINOR** — at glass-ui 7.0.0 the class stops being inert and becomes *exactly* redundant: the same `:is()` list, the same single declaration

**Claim.** The 4→7 hop does not vindicate line 21; it converts a dead class into a duplicate one.

**Provenance.** `/Users/mkbabb/Programming/glass-ui@7.0.0` `src/styles/glass/material.css:352-376`:

```
:is(.glass-material, .glass-wash, .glass-quiet, .glass-resting, .glass-floating,
    .glass-overlay, .glass-specular-track, .dock-icon-button, .dock-tab-button,
    .dock-select-trigger, .dock-dropdown-trigger
):is(.is-active, .active, [data-active], [data-dragging], [data-state="checked"],
     [data-state="on"], [aria-pressed="true"], [aria-selected="true"],
     [aria-expanded="true"], [aria-current="page"])::before {
    --specular-intensity: var(--glass-specular-intensity-active, 0.16);
}
```

`Button.vue:66-72` puts `glass-wash glass-capsule` on the host for `tone="neutral"` +
`emphasis in {primary, secondary}`, so the first list matches. `.is-active` and
`[aria-pressed="true"]` are **co-members of the second list feeding one declaration** — setting both
has zero differential effect. `src/styles/accessibility.css:5-40` reinforces the point: the
`prefers-contrast: more` and `forced-colors: active` arms key on `[aria-pressed="true"]` and never on
`.is-active`, so under those two media the ARIA attribute is the *only* signal that works.

**Consequence.** The correct primitive is `aria-pressed` alone, at both versions. `.is-active` is
legacy-alias cascade-compat the wrapper did not need — which is exactly what its own line 6 calls it
("the legacy `.is-active` class") while line 7 simultaneously calls it canon.

**Falsifier.** A 7.0.0 declaration reachable through `.is-active` but not `[aria-pressed="true"]` on a
`glass-wash` host (or the converse) — searched: none in the button path; the only asymmetry runs the
other way (accessibility.css, favouring ARIA).

---

### L-5 · **MAJOR** — the wrapper's three pinned attributes are all **defeasible by fallthrough**, and `class` merges while `aria-pressed` overrides, so a caller can force a self-contradictory DOM with no type error

**Claim.** `variant="glass"`, `size="icon"` and `:aria-pressed="active"` are not invariants. A parent
passing the same keys silently wins on all three, while `:class` merges — so the component's single
stated contract ("surfaces `active` as **both** `aria-pressed` and `.is-active`") can be split into
`aria-pressed="false"` + `.is-active` on one element.

**Provenance (`vue@3.5.38`).** `inheritAttrs` is unset (no `defineOptions` in the file) ⇒ default
`true`, and the render root is a single component vnode, so `renderComponentRoot` applies the
fallthrough via `cloneVNode(root, fallthroughAttrs)`:
- `@vue/runtime-core/dist/runtime-core.cjs.js:7746-7748` — `mergedProps = mergeProps(props || {}, extraProps)`;
  the template's own props are argument **one**, the fallthrough attrs argument **two**.
- `:7883-7910` `mergeProps` — `class` → `normalizeClass([ret.class, toMerge.class])` (**merge**, `:7888-7891`);
  `style` → merge; `on*` → handler chain (`:7894-7903`); **everything else → `ret[key] = toMerge[key]`
  (`:7904-7906`), last-writer-wins.**

So `<CanvasOverlayButton :active="true" variant="ghost" aria-pressed="false">` renders a **ghost**
button carrying `aria-pressed="false"` **and** `class="… is-active"`. TypeScript raises nothing:
`active` is the only declared prop (line 11-13), so `variant` / `aria-pressed` are ordinary attrs on
the wrapper's surface.

**Consequence.** The abstraction buys no enforcement. Everything it "pins" is advisory; the one thing
it makes un-removable is the class L-3/L-4 show it should not be setting.

**Falsifier.** `mergeProps` preferring the existing value for non-class keys (it does not, `:7904-7906`);
or `inheritAttrs: false` with an explicit `v-bind="$attrs"` placed *before* the pinned props (the file
has neither); or a declared-prop shadow that would consume `variant`/`aria-pressed` at the wrapper
(only `active` is declared).

---

### L-6 · **MINOR** — an icon-only button primitive with no accessible-name obligation anywhere in its contract

**Claim.** Line 19 hard-pins the square icon geometry and line 23 accepts arbitrary slot content, but
nothing in the component requires, declares, defaults, or asserts an accessible name. Every consumer
would have had to remember `aria-label` through the (defeasible, L-5) fallthrough channel.

**Provenance.** The wrapper declares one prop, `active` (`:11-13`); no `label`, no `aria-label`, no
dev-time check. Downstream, glass-ui 4.0.0's Button injects no name — `dist/button-BNDWhAZb.js:30-44`
renders `Primitive` with `as`/`as-child`/`data-slot`/`data-variant`/`data-size`/`type`/`disabled`/`class`
and `renderSlot($slots, "default")`, nothing else. The successor names the obligation the wrapper
omits: glass-ui 7.0.0 `src/components/button/Button.vue:25` (= `dist/components/button/Button.vue.d.ts:12`)
documents `iconOnly` as "Square geometry for an **accessibly named** icon command."

**Falsifier.** An accessible name injected by Button, by reka-ui `Primitive`, or by a fourier-global
convention that fills `aria-label` on `[data-size="icon"]` — the first two are read above and inject
none; `grep -rn "aria-label" web/src/style.css` → zero.

---

### L-7 · **MINOR** — colocation and naming assert a canvas-overlay role the component does not and cannot fill

**Claim.** A domain-neutral Button wrapper is filed under `components/visualization/` and named for a
surface it never touches; the real canvas-overlay control surface is built from a *different, mutually
incompatible* primitive family.

**Provenance.** The viz render path (CENSUS §3a [FE §6]: three independent Canvas2D surfaces,
WebGL/WebGPU **absent** — live-confirmed, exactly four `getContext("2d")` sites and zero WebGL:
`BasisCanvas.vue:475`, `composables/useCanvasSetup.ts:30`, `equation/FrequencyGraph.vue:63`,
`equation/ConvergencePlot.vue:93`). The canvas-overlay chrome is composed at
`VisualizationView.vue:199` (`<BasisCanvas ref="canvasComponent" …>`), `:211` (`<CanvasControlsDock …>`),
`:239` (`<EditorControlsDock …>`), over an absolutely-positioned `.canvas-container` (`:390-394`).
Every control inside those two docks is `DockIconButton` from `@mkbabb/glass-ui/dock`
(`CanvasControlsDock.vue:6,45,54,59,71,77,87,92`), whose active paint lives on a family selector this
component's host can never carry (`dock-controls/icon-button.css:109-115`,
`glass/material.css:231-234` — see L-3 receipt 4). Dropping `CanvasOverlayButton` into the dock it is
named for would produce an unstyled control; conversely its own `variant="glass"` siblings
(`FullscreenViewer.vue:110`, `EquationView.vue:276`, `ConvergenceTimeline.vue:61`) all sit outside the
overlay dock stack. **The component's touch-count on the viz render path is zero, by construction and
by name.**

**Falsifier.** Any `Button variant="glass"` rendered *inside* `CanvasControlsDock` / `EditorControlsDock`
/ the `.canvas-container` overlay stack — grep of both docks returns `DockIconButton` only;
`FullscreenViewer.vue:110` is a fullscreen-frame close, authored inline, not an overlay-dock member.

---

### L-8 · **MINOR** — Goldilocks: the abstraction unified **zero** of the sites it was authored for, and fourier's own ledger says so

**Claim.** 25 lines whose entire payload is two static attributes and one conditional class, wrapping
a component that already exposes both attributes, adopted by nobody.

**Provenance.** fourier's own `docs/tranches/A/audit/W3-button-ledger.md:93` — the authoring wave's
ledger — records the row as: *"naked wrapper component forwarding `active` as `aria-pressed`;
`<Button variant="glass" size="icon">` **IS** the surface"*. The sites it would have unified all wrote
the two attributes inline instead and still do: `FullscreenViewer.vue:110`, `EquationView.vue:276`,
`ConvergenceTimeline.vue:61`, plus (per the same ledger, lines 87 and 96) `ExportModal.vue:37` and
`GalleryCardModal.vue:76`. Live: `variant="glass"` appears at 8 further call sites
(`PaperView.vue:400`, `GalleryCard.vue:158/167/176`, `EquationResult.vue:39`, `FunctionInput.vue:190`, …).
Cost of the wrapper: an extra component instance per use, an opaque name (L-7), and — per L-5 — no
type safety in exchange.

**Falsifier.** A single adopting consumer, historical or present: `git log --all -S CanvasOverlayButton`
and the live grep both return the defining file only.

---

### L-9 · **MINOR** — deleting the file (as ordered ×5) silently deletes the only `aria-pressed` idiom on the viz-dock surface, unless the idiom is lifted first

**Claim.** The component is the sole carrier, on the visualization control surface, of the ARIA
mechanism that both glass-ui versions actually paint from. A bare `git rm` therefore hands a latent
a11y regression to F.W3/F.W4 rather than closing one.

**Provenance.** `grep -rn "aria-pressed" web/src` → 15 lines. The toggle controls of the canvas
overlay are **not among them**: `CanvasControlsDock.vue:54,59,71,77,87` and
`EditorControlsDock.vue:143,148` (7 live toggles) set `:class="{ 'is-active': … }"` and **no**
`aria-pressed`; `ConvergenceTimeline.vue:61` sets `:class="{ 'is-playing': playing }"` on a
`variant="glass" size="icon"` Button with no ARIA state. Those 7 dock toggles *do* paint (L-3 receipt 4
— they are dock-family), so the defect is silent to the eye and visible only to assistive tech and to
`prefers-contrast`/`forced-colors` (glass-ui 7 `accessibility.css:5-40`, which keys on
`[aria-pressed="true"]` exclusively).

**Cure.** Delete the file **and** add `:aria-pressed` to those 7 sites in the same commit — the
migration is one attribute per site and needs no producer change at either version.

**Falsifier.** Any `aria-pressed` (or `role="switch"` + `aria-checked`, or `[data-state]`) on a
`DockIconButton` in either dock — grep returns none; the 15 hits are BasisSelector, GalleryCard,
GalleryCardModal, GallerySearchBar, plus this file and two comments.

---

### L-10 · **INFO** — `active?: boolean` renders a **three**-state `aria-pressed`, and the "not a toggle" vs "toggle-off" distinction is invisible to the type system

**Claim.** `undefined` → attribute removed (plain button); `false` → `aria-pressed="false"`
(toggle, currently off); `true` → `aria-pressed="true"`. `<CanvasOverlayButton>` and
`<CanvasOverlayButton :active="false">` therefore expose **different a11y roles** with no type-level
signal, from an optional prop with no default.

**Provenance.** `@vue/runtime-dom/dist/runtime-dom.cjs.js:560-577` `patchAttr` — `value == null` ⇒
`el.removeAttribute(key)`; `aria-pressed` is not in `isSpecialBooleanAttr`, so `false` is stringified
by `setAttribute` to `"false"`. The prop is optional with no `withDefaults` (`:11-13`).

**Cure.** Either require `active: boolean` (making every instance a toggle) or split the toggle
affordance into its own component. Not both-in-one, silently.

**Falsifier.** Vue rendering `aria-pressed="false"` for `undefined` (it removes it, `:568-569`) or
treating `aria-pressed` as a special boolean attr (it is not — `isSpecialBooleanAttr` covers the HTML
boolean set, not `aria-*`).

---

## §2 — SUPERLATIVES (L-18, the other direction — each with its own falsifier)

### S-1 · The dead file is the **only** viz-overlay control in fourier that gets toggle *semantics* right
`:aria-pressed="active"` (line 20) is the mechanism both glass-ui 4.0.0
(`button-BNDWhAZb.js:61`, the `aria-pressed:bg-[…]` CVA arm) and glass-ui 7.0.0
(`material.css:352-376`, `accessibility.css:5-40`) actually paint from — and the seven live dock
toggles do not use it (L-9). The one file scheduled for deletion is the one that read the producer
correctly. This is why L-9's cure is "lift, then delete", not "delete".
*Falsifier:* an `aria-pressed` on any dock control — none exists (L-9 receipt).

### S-2 · Provably leak-free: the teardown surface is empty by construction
`grep -nE "onMounted|onUnmounted|addEventListener|requestAnimationFrame|ResizeObserver|setInterval|watch\(|ref\("`
over the file → **zero hits**. One import, one `defineProps`, a static template: no handle is ever
acquired, so none can be leaked. In a tree whose two rAF clocks are ungated under
`prefers-reduced-motion` (CENSUS §3a [FE §8]) and whose canvas composables hold contexts
(`useCanvasSetup.ts:30`), a control with a nil lifecycle surface is worth naming.
*Falsifier:* any lifecycle hook, timer, observer, listener, or retained ref — none.

### S-3 · Prop-not-attr hygiene: `active` is declared, so it never leaks to the DOM
Because line 12 declares it, `active` is consumed by the wrapper and excluded from `$attrs`; no stray
`active="true"` attribute reaches the `<button>`. The naive alternative (an undeclared attr) would
have stamped it onto the host.
*Falsifier:* `active` appearing in `$attrs` — it cannot, it is in `props`.

### S-4 · The docblock indicts itself accurately on the one point that mattered
Line 6 labels `.is-active` **"the legacy … class"** — in-file, unprompted. That single word is what let
three independent audits (`A8-no-legacy-sweep.md:29`, `raw-findings.json:2919`, `findings-index.txt:105`)
locate the toggle-register defect class without reading a line of producer CSS.
*Falsifier (and the limit of the credit):* the very next clause — "matching the glass-ui canon" (line 7)
— is **false as installed** (L-3). The credit is for the `legacy` label alone, not for the docblock.

---

## §3 — R5-7 (native-template-loop invisibility): **does not apply directly — its dual does, and it names two files**

**R5-7 does not apply on its face.** The file contains no `v-for`, native or component
(`grep -n "v-for" CanvasOverlayButton.vue` → zero). The class R5-7 describes — *loop evidence keyed to
component callsites is blind to native `<li v-for>`* — has no instance here. Saying otherwise would be
stretching the finding, and L-18 cuts both ways.

**Its dual applies, and it is measurable.** R5-7's defect is a member-scope defect: the numerator is
keyed to one kind of member and misses another. This component instantiates the *opposite* miss —
a member that is fully registered and has **zero instances**:

- Method (live, read-only): for each of the 66 `web/src/**/*.vue`, grep its basename across every
  `.vue` and `.ts` under `web/src`, excluding the file itself; report the zero-hit set.
- Result: **exactly two** — `components/visualization/CanvasOverlayButton.vue` and
  `components/equation/InfoCard.vue`. Both re-checked directly (`grep -rn "InfoCard" web/src web/e2e`
  → empty; `grep -rn "CanvasOverlay" web/src web/e2e` → empty) and against the dynamic-resolution
  closure of L-1.

**This is the live-tree corroboration — and the naming — of an otherwise anonymous Codex figure.**
Intake row **R3-7** (adjudicated **TRUE / ADOPT-AS-FACT**) carries
`summary.sourceWorkflowTotal 66 / Reachable 64 / Unmounted 2` — "two exact unmounted workflows",
never named in R3, never named in the intake lane, never named in the census. **They are these two.**
Independent method, exact agreement with a thrice-stable deriver (R4-8, `workflows: 66`).

**The consequence for F.W4, stated as the R5-7 lesson mirrored.** A per-component D/L/C audit driven
by the 66-workflow numerator will spend budget auditing **2 components that can never render**, exactly
as a callsite-keyed loop derivation drops the whole `PaperSidebar` TOC subtree (3 native `<li v-for>`,
lines 65/87/105). Same disease, opposite sign; both are why **X-9** ("publish ONE member-scope law
before any percentage") is the governing carry.

**And the cost is already paid, in receipts.** The frozen M.W1a sweep spent a migration edit on the
*other* dead SFC: `git diff web/src/components/equation/InfoCard.vue` → one line,
`:amount` → `:value` (MetricBadge, InfoCard.vue:32). CENSUS §2 **C-4** budgets InfoCard as one of the
7 files needing the `./metric` cure at F.W1. **That budget is 7 files but only 6 live** — and the
seventh, like this one, wants `git rm`, not a rename.

---

## §4 — Corpus reconciliation: where I agree, refine, and contradict

| corpus row | this challenge |
|---|---|
| A8-14 / CHR-26 / A8-21 (fourier `docs/audits/runs/2026-06-1{6,7}-*`) — "dead component, zero consumers, DELETE" | **CONFIRMED** at live HEAD by an independent four-way reachability closure (L-1), **and escalated**: the deletion is also the cheapest member of the F.W1 break surface (L-2), and a bare `git rm` costs an a11y idiom (L-9). |
| `partial-prior-run.json:207-211` (A3-05) — STEP 2i skipped | **CONFIRMED** — the file is present at `cd26c65` and is not among the 27 modified paths. |
| **`raw-findings.json:2968`** (M-deep-audit, 2026-06-16) — "`.dock-icon-button.is-active` has **NO backing paint** in glass-ui dock.css OR fourier's scoped CSS — the toggled-on state currently renders identically to idle" | **CONTRADICTED for the dock family.** Against the **installed** glass-ui 4.0.0 this is false: `dist/styles/dock-controls/icon-button.css:109-115` gives `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` five real declarations (`background`/`color`/`scale`/`border`/`box-shadow` off the `--dock-active-*` token cohort), and `dist/styles/glass/material.css:231-234` adds the specular arm. The finding was authored the day **before** the M.W1a 4.0.0 install cured it. **The inert-class claim survives only for the Button family** — which is precisely this component (L-3). The distinction matters: it means the 7 live dock toggles (L-9) are a pure *a11y* defect, not a paint defect. |
| `raw-findings.json:2919/2980` — the "DOCK-ACTIVE" ask: should the pressed register be Button-family-wide or DockIconButton-only? | **ANSWERED by the producer, upstream.** glass-ui 7.0.0 made it neither: it is *material*-wide — `material.css:352-376` keys `[aria-pressed="true"]`/`.is-active` off `glass-wash`/`glass-*`/dock families in one rule (L-4). No fourier-side ask remains; the F.W3 relay should record the ask as satisfied. |
| CENSUS §3a [FE §5], the uplift break surface | **AMENDED** — add the Button `variant`/`size` → `emphasis`/`iconOnly` axis rename (L-2): 35 files import `@mkbabb/glass-ui/button`; 123 `variant="` lines; 38 `size="icon"` lines (Button-attributable subset UNMEASURED, F.W1 enumeration item). |
| CENSUS §3a [FE §6] — Canvas2D throughout, WebGL/WebGPU absent, three independent canvases | **CONFIRMED** live (4 × `getContext("2d")`, 0 × WebGL) — and used to establish that this component's touch-count on that path is **zero** (L-7). |
| CENSUS §2 **C-4** — metric-badge cure budget "7 files" | **REFINED** — 6 live + 1 unmountable (`InfoCard.vue`), §3 above. |
| Intake **R3-7** — "64/66 reachable, two exact unmounted workflows" (TRUE / ADOPT-AS-FACT) | **CORROBORATED AND NAMED**: `CanvasOverlayButton.vue` + `equation/InfoCard.vue`, by independent method (§3). |
| Intake **R4-8 / R4-9** — the thrice-stable census at an unmoved substrate | **CONFIRMED** — 66 `.vue` re-counted live; HEAD/tree hashes re-verified. |
| Intake **R5-7** — native-loop blindness | **DOES NOT APPLY** here (no `v-for` in the file); its **dual** does, and is the §3 finding. |
| Intake **X-9** — publish ONE member-scope law before any percentage | **STRENGTHENED** — §3 gives it a concrete two-file cost at F.W4. |

---

## §5 — VERDICT

**DEFECTIVE.** 10 defects survive their falsifiers — **2 BLOCKER** (L-1 dead-and-ordered-deleted,
un-minuted on the branch F.W0 must land; L-2 a hard `vue-tsc`/`npm run build` break at glass-ui 7 that
the census break surface does not enumerate), **2 MAJOR** (L-3 the `.is-active` half is inert as
installed and the docblock says otherwise; L-5 every pinned attribute is defeasible by fallthrough
while `class` merges, so the stated contract is caller-breakable into a contradiction), and
**6 MINOR/INFO** (L-4, L-6, L-7, L-8, L-9, L-10).

**4 superlatives** also survive, and one is load-bearing: S-1 makes the disposition **LIFT-THEN-DELETE**,
not DELETE.

**Terminal disposition.**
1. **F.W0** — minute the M.W1a STEP-2i divergence, then execute it: `git rm web/src/components/visualization/CanvasOverlayButton.vue`.
   Rule on `equation/InfoCard.vue` in the same breath (the second unmounted workflow, §3).
2. **Before that rm** — lift `:aria-pressed` onto the 7 live dock toggles
   (`CanvasControlsDock.vue:54,59,71,77,87`; `EditorControlsDock.vue:143,148`) and onto
   `ConvergenceTimeline.vue:61`. One attribute per site, no producer change, works at 4.0.0 and 7.0.0.
3. **F.W1** — add the Button `variant`/`size` → `emphasis`/`iconOnly` rename to the break-surface
   enumeration; this file is the one member whose cure is deletion.
4. **F.W3** — record the "DOCK-ACTIVE" glass-BH ask as satisfied upstream by glass-ui 7 `material.css:352-376`.
5. **F.W4** — adopt the member-scope law (X-9) with the 2-unmounted-workflow figure banked, so the
   per-component audit does not spend budget on components that cannot render.

*Read-only throughout. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`
were read as evidence and not modified; the single write of this lane is this file. No browser tooling
was used, and no claim required it.*
