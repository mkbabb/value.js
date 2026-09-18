claude-opus-5[1m] (served model id)

# CHALLENGE — `CanvasOverlayButton.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasOverlayButton.vue`
— 25 lines, at fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, branch `m/w1-bump-migration`,
28 uncommitted paths. **The subject is not among them** (`git status --porcelain | grep -i CanvasOverlay`
→ empty), so the file at HEAD is the file on disk — no [WT]/[HEAD] split applies to this challenge.

**Import closure — read whole.** The file has exactly one import edge.

| edge | resolved artifact | read |
|---|---|---|
| `@mkbabb/glass-ui/button` | `web/node_modules/@mkbabb/glass-ui@4.0.0` — `package.json` exports `"./button"` (80 subpaths, `./button` present) → `dist/button.js` → `dist/button-BNDWhAZb.js` (the Button SFC + its full CVA) | whole |
| — its typings | `dist/button.d.ts`, `dist/components/ui/button/index.d.ts`, `dist/components/ui/button/Button.vue.d.ts` | whole |
| — its render substrate | `web/node_modules/reka-ui/dist/Primitive/Primitive.js` | whole |
| — its **paint** closure (what `variant`/`size`/`.is-active`/`aria-pressed` actually resolve to) | `dist/styles/index.css` → `glass.css` → `glass/surfaces.css`; `glass/material.css`; `utilities/btn.css`; `dock-controls/{icon-button,tab-button,triggers,touch-floor}.css`; `tokens/offsets-sizing.css` | every `is-active` / `glass-btn` / `btn-glass` / `aria-pressed` / `--dock-active-*` site |
| — the variant compiler | `web/node_modules/tailwindcss/dist/lib.js` (`aria` functional variant) | the variant definition |
| — the successor, for the F.W1 hop | `/Users/mkbabb/Programming/glass-ui@7.0.0` — `src/components/button/Button.vue`, `src/styles/glass/material.css`, `src/styles/accessibility.css` | whole / all relevant |
| — consumer program roots | `web/tsconfig.json`, `web/package.json`, `web/vite.config.ts`, `web/src/style.css`, `web/src/router/index.ts` | whole |

**Method.** Static + source-derived only. `grep` / `find` / `git` / `sed` / `node -e` over two read-only
trees. No dev server, no browser tooling, no install, no product-source mutation in any repo. The single
write of this lane is this file. **Nothing below is marked UNPROVEN-NEEDS-LIVE** — every claim is decidable
from bytes, and each carries the falsifier I actually ran.

**Posture.** Assumed defective. It is, on eleven counts, two of them blocking. Four superlatives also
survive their falsifiers (L-18 runs both ways), and one of them changes the disposition from DELETE to
**LIFT-THEN-DELETE**.

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

No `<style>` block. No `defineOptions`, `defineEmits`, `defineSlots`, `defineExpose`, `withDefaults`.

**Authoring history (`git log --follow`).** Added `9146d3f` **2026-03-14**; its sole consumer
(`VisualizationView.vue`) was removed **two days later** by `2f53d5d` *"feat(web): replace overlay buttons
with canvas controls dock"* — verified by `git grep -l CanvasOverlayButton 2f53d5d^ -- web/src` →
`VisualizationView.vue`, and at `2f53d5d` → *(empty)*. It has then been **edited twice while dead**
(`be24948` A.W3.b `<button>`→`<Button>` migration; `262c3d0` the 3.1.0 adoption). **~4.7 months dead, two
maintenance edits spent on it.**

---

## §1 — DEFECTS

### L-1 · **BLOCKER** — dead module: unreachable by every resolution channel, ordered deleted five times, and the skip is un-minuted on the branch F.W0 must land

**Claim.** No path in the application can reach this file, and none ever could after 2026-03-16. Its
deletion is a *numbered step of an executed plan* that the executed branch did not perform and did not
record as unperformed.

**Provenance — a four-channel reachability closure, all live at `cd26c65`:**
1. **Static import.** `grep -rn "CanvasOverlay"` over the entire repo minus `docs/` and `node_modules/`
   → **zero hits outside the file itself**. `grep -rn "CanvasOverlay" web/src web/e2e` → **0**.
2. **Dynamic import.** `grep -rn "import.meta.glob\|defineAsyncComponent\|resolveComponent\|app.component("`
   over `web/src` → the only component-resolution hits are `GalleryView.vue:31,32,33`, and all three
   `defineAsyncComponent` calls take **string-literal** specifiers (`./gallery/AdminUserList.vue`,
   `./gallery/AdminFlaggedPanel.vue`, `./gallery/AdminAuditLog.vue`). No glob. No `resolveComponent`.
3. **Router.** `web/src/router/index.ts` — 7 lazy `component: () => import("…")` records, every specifier
   a literal path; none names this file.
4. **Build-time registration.** `web/vite.config.ts` plugins = `latexPaperPlugin` + `vue()` **only** —
   no `unplugin-vue-components`, no `components.d.ts`, no global `app.component`.

**The order, five independent times, in fourier's own tree:**
`docs/tranches/M/M.md:141` ("dead component, 0 consumers | **DELETE** outright | W1/W5") ·
`docs/tranches/M/design/M-design-language.md:70` ·
`docs/tranches/M/design/M-bump-migration.md:56` **and** `:199` (`STEP 2i DELETE CanvasOverlayButton.vue`) ·
`docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:29` (A8-14) ·
`docs/audits/runs/2026-06-17-M-critique-audit/findings-index.txt:105` (CHR-26) and `:144` (A8-21).

**The skip, self-reported:** `docs/audits/runs/2026-06-17-M-critique-audit/partial-prior-run.json:207-211`
— *"A3-05: `CanvasOverlayButton.vue` was NOT deleted — plan STEP 2i (dead-component removal) skipped"*.

**Why blocking (governance, not bytes).** F.W0's opening act is land-or-abandon on the 28-path frozen
M.W1a tree. The tree cannot be landed as "M.W1a executed" while a numbered step of M.W1a's own plan is
unexecuted **and the branch carries no record of the divergence**. Either the step runs, or the divergence
is minuted before the tree is blessed.

**Falsifier.** Any importer in any tree state; any glob/string-keyed mount; any e2e, story or test
reference; any build-time registration. All four channels enumerated above; `web/e2e` grepped separately;
all empty. **Conditional downgrade:** if F.W0 rules ABANDON on the M.W1a tree wholesale, STEP 2i dies with
its plan and L-1 falls to MAJOR — the deadness survives, the governance blocker does not.

---

### L-2 · **BLOCKER** — the dead file is a hard `vue-tsc` break on the glass-ui 4→7 hop, and the axis it breaks on is **absent from the census break surface**

**Claim.** Under the F.W1 atomic tri-package uplift, line 19 becomes a definite prop-assignability error
against glass-ui 7.0.0 and fails `npm run build` — because the TS program is rooted on a **glob**, so an
unreachable SFC still gates the typecheck.

**Provenance.**
- **Installed 4.0.0** — `dist/components/ui/button/index.d.ts:4-6`:
  `variant?: … | "glass" | …`, `size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm"`. Both legal today.
- **Producer 7.0.0** — `/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-31`:
  ```
  export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
  export interface ButtonProps extends PrimitiveProps {
      emphasis?: ButtonEmphasis; tone?: Tone; size?: ButtonSize;
      iconOnly?: boolean; loading?: boolean; type?: …; disabled?: …; class?: …;
  }
  ```
  **There is no `variant` prop, and `"icon"` is not in `ButtonSize`.**
- **Program roots** — `web/tsconfig.json:20`:
  `"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue", "env.d.ts"]`. A glob include makes every
  `.vue` under `src` a root file **regardless of reachability**. Reachability is not the selector; the glob is.
- **The gate** — `web/package.json` `"build": "vue-tsc -b && vite build"`. The typecheck *is* the build.
- The two attributes decompose differently and I separate them because their certainty differs:
  - `size="icon"` (line 19) — `size` **is** a declared prop with a closed union; `"icon"` is not assignable.
    **Definite type error.**
  - `variant="glass"` (line 18) — `variant` is not a prop at 7.0.0, so it either trips `vue-tsc`'s
    excess-attribute check or degrades to a fallthrough attr landing on the host `<button>` as a literal
    `variant="glass"` DOM attribute (invalid HTML, zero paint). **Either branch is a defect.** I do not
    claim which, because glass-ui 7 is not installed in fourier and installing it would be a write.
- **CENSUS AMENDMENT.** `formation/fourier/lane-frontend.md:468-482` ("Rows that hit fourier-analysis
  TODAY") enumerates: `./metric-badge` ×7, `./hover-card` ×2, `./hover-popover` ×2, `DockIconButton` ×2,
  `DockDropdownTrigger` ×1, `type ToastVariant`, `lucide-vue-next` ×35, and three peer floors. **The Button
  `variant`/`size` → `emphasis`/`iconOnly` axis rename is not in that table.** Measured live: **35 files**
  import `@mkbabb/glass-ui/button`; **38 `size="icon"` grep lines** (2 are prose — `CanvasOverlayButton.vue:5`,
  `GalleryCard.vue:254` — so **36 real attribute sites, 35 live + this one dead**). The Button-attributable
  subset of the tree's `variant="` lines is **UNMEASURED here** and is an F.W1 enumeration item, not a claim.
- **The cure, for the record** (derived from the two declarations, not proposed as this file's fix):
  `variant="glass"` → `emphasis="secondary"` + default `tone="neutral"` (which is what selects
  `glass-wash glass-capsule` at 7.0.0 `Button.vue:69`); `size="icon"` → `iconOnly` with `size="md"`.
  **For *this* file the cure is `git rm`** — it is the only member of the break class where deletion is
  a complete fix, because it is the only unreachable member.

**Falsifier.** `size` ceasing to be a declared prop at 7.0.0, or `"icon"` re-entering `ButtonSize` (read:
`Extract<Size, "xs"|"sm"|"md"|"lg">` — it does not); a tsconfig rooted on entry points rather than globs
(read: it globs); or `vue-tsc -b` failing to propagate a non-zero exit. On that last: the M-critique's
`-b`-masking complaint was about a **TS2882 CSS-side-effect** diagnostic, not about prop-assignability
errors — those fail the build under either invocation.

---

### L-3 · **MAJOR** — `.is-active` is provably **inert** on this element in the installed glass-ui 4.0.0; the docblock's "matching the glass-ui canon" (line 7) is false as installed

**Claim.** Line 21 toggles a class that matches **no selector reachable by this element**. The paint the
component believes it is invoking belongs to a *differently spelled* class.

**Provenance — all in `web/node_modules/@mkbabb/glass-ui@4.0.0`:**
1. **What the host actually wears.** The CVA in `dist/button-BNDWhAZb.js` emits, for `variant="glass"`:
   `"glass-wash btn-glass text-foreground hover:… aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]"`,
   over the base `"btn-pill tap-squish focus-ring …"` and the size arm `icon: "h-(--control-h-md) w-(--control-h-md) p-0"`.
   Host classes therefore include `btn-pill`, `btn-glass`, `glass-wash` — **and not `glass-btn`**.
   Receipt: `grep -c "glass-btn" dist/button-BNDWhAZb.js` → **0**.
2. **The only button-family `.is-active` rule in the whole 4.0.0 cascade** is
   `dist/styles/glass/surfaces.css:111-116` —
   `.glass-btn.is-active, .glass-btn[aria-pressed="true"] { background / border-color / color }`.
3. **`glass-btn` ≠ `btn-glass`.** Two distinct, separately-authored utilities in the same file:
   `surfaces.css:57` defines `.glass-btn` as the fixed-square hand-authored icon primitive;
   `surfaces.css:182-184` defines `.btn-glass { backdrop-filter: var(--glass-blur-btn); }` as the backdrop
   re-point the **Button CVA** applies. The Button component never emits `.glass-btn`.
4. **The specular `.is-active` arm is dock-family-scoped:** `dist/styles/glass/material.css:231-234` lists
   exactly `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`;
   `dist/styles/dock-controls/icon-button.css:109-115` likewise. Neither touches `glass-wash` / `btn-glass` /
   `btn-pill`.
5. **No unscoped `.is-active` exists** in the shipped cascade: the remaining hits
   (`dock-controls/triggers.css:100,106`) are interior members of `:is()` lists inside dock-trigger rules.
6. **Consumer side supplies none either:** the SFC has no `<style>` block, and every fourier `.is-active`
   rule is scoped to a foreign hook — `.eq-toggle-btn` (`EquationModeToggle.vue:63`), `.floating-toc-item`
   (`MobileFloatingToc.vue:371`), `.sidebar-link` (`PaperSidebar.vue:240`), `.easing-chip`
   (`EasingPicker.vue:84`), `.preset-pill` (`FunctionInput.vue:244`), `.filter-toggle`
   (`GallerySearchBar.vue:159`), `.nav-dropdown-item` (`AppHeader.vue:340`). None matches a `<Button>`.

**Consequence.** As installed, `active` paints via **`aria-pressed` alone** — the CVA's
`aria-pressed:bg-[…]` arm, which Tailwind v4 compiles to `&[aria-pressed="true"]` (verified in
`node_modules/tailwindcss/dist/lib.js`: the `aria` functional variant emits ``&[aria-${value}="true"]``
for named values). The `.is-active` half is decorative DOM noise. **The docblock's third clause is false**,
and its second clause ("both") is misleading: the component surfaces one working signal and one dead one.

**Falsifier.** Any selector in the 4.0.0 cascade matching `.is-active` on an element carrying
`btn-pill`/`btn-glass`/`glass-wash` without a dock-family class; or a fourier global rule supplying one.
Both searched exhaustively (receipts 2, 4, 5, 6); neither exists.

---

### L-4 · **MAJOR** — every attribute the wrapper "pins" is defeasible by fallthrough, and because `class` **merges** while the rest **overrides**, a caller can force a self-contradictory DOM with no type error

**Claim.** `variant="glass"`, `size="icon"` and `:aria-pressed="active"` are not invariants. A parent
passing the same keys silently wins on all three, while `:class` merges — so the component's single stated
contract ("surfaces `active` as **both** `aria-pressed` and `.is-active`") is caller-breakable into
`aria-pressed="false"` **plus** `.is-active` on one element.

**Provenance (`vue@3.5.38` runtime-core).** `inheritAttrs` is unset (no `defineOptions`) ⇒ default `true`;
the render root is a single component vnode, so `renderComponentRoot` applies fallthrough via
`cloneVNode(root, fallthroughAttrs)` → `mergeProps(templateProps, fallthroughAttrs)` — template props are
argument **one**, fallthrough attrs argument **two**. `mergeProps` semantics: `class` →
`normalizeClass([ret.class, toMerge.class])` (**merge**); `style` → merge; `on*` → handler chain;
**every other key → `ret[key] = toMerge[key]`, last-writer-wins.**

So `<CanvasOverlayButton :active="true" variant="ghost" aria-pressed="false">` renders a **ghost** button
carrying `aria-pressed="false"` **and** `class="… is-active"`. TypeScript raises nothing on the ARIA half:
`active` is the only declared prop (lines 11-13), so `aria-pressed` is an ordinary attribute on the
wrapper's surface.

**Consequence.** The abstraction buys **no enforcement**. Everything it pins is advisory; the one thing it
makes un-removable is the class L-3 proves it should not be setting at all.

**Falsifier.** `mergeProps` preferring the incumbent for non-class keys (it does not); or
`inheritAttrs: false` with an explicit `v-bind="$attrs"` placed *before* the pinned props (the file has
neither); or a declared-prop shadow consuming `variant`/`aria-pressed` at the wrapper (only `active` is
declared).

---

### L-5 · **MINOR** (escalates to MAJOR on the first `<form>`) — the wrapper pins geometry and variant but **not `type="button"`**, and the installed glass-ui 4.0.0 Button supplies no fallback, so every instance is an implicit `type="submit"`

**Claim.** A general-purpose icon-button wrapper that pins two presentational attributes and omits the one
*behavioural* attribute that has a dangerous HTML default.

**Provenance.**
- **glass-ui 4.0.0 (installed)** — `dist/button-BNDWhAZb.js`:
  `d = computed(() => ({ type: u.type, disabled: u.disabled }))`, spread into the `Primitive` props.
  **No `?? "button"` fallback.** With `type` undefined, Vue omits the attribute.
- **reka-ui `Primitive`** — `node_modules/reka-ui/dist/Primitive/Primitive.js`: `as` defaults to `"div"`,
  Button passes `as: "button"`, and the render is `h(props.as, attrs, { default: slots.default })`.
  A `<button>` with no `type` attribute has the HTML default **`type="submit"`**.
- **glass-ui 7.0.0 cures it upstream** — `src/components/button/Button.vue:55`:
  `type: nativeButton.value ? (props.type ?? "button") : undefined`.
- **fourier-wide**: `grep -rn 'type="button"' web/src` → **exactly one site** (`ImageUpload.vue:94`),
  against 36 `size="icon"` attribute sites and 35 files importing `/button`.

**Honest bound — the falsifier that keeps this MINOR.** `grep -rn "<form" web/src` → **zero**;
`grep -rn "@submit\|submit.prevent" web/src` → **zero**. With no form owner anywhere in the tree, implicit
submission has **no live trigger today**. The defect is real at the primitive level and real in this
wrapper's contract (it is the natural place to pin `type`, since it already pins `variant` and `size`), but
it is currently latent. **It escalates the moment any `<form>` enters `web/src` — and it is one of the
under-booked benefits of the 4→7 hop, which the census break table does not credit.**

---

### L-6 · **MINOR** — at glass-ui 7.0.0 the class stops being inert and becomes *exactly redundant*: same `:is()` list, same single declaration — and the a11y media arms key on ARIA **only**

**Claim.** The 4→7 hop does not vindicate line 21; it converts a dead class into a duplicate one, and the
two signals stop being interchangeable precisely where accessibility depends on them.

**Provenance.** `/Users/mkbabb/Programming/glass-ui/src/styles/glass/material.css:352-377`:

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

`Button.vue:69` puts `glass-wash glass-capsule` on the host, so the first list matches. `.is-active` and
`[aria-pressed="true"]` are **co-members of the second list feeding one declaration** — setting both has
zero differential effect. And `src/styles/accessibility.css:9-40` breaks the tie: both the
`@media (prefers-contrast: more)` and `@media (forced-colors: active)` arms key on
`[aria-current]`/`[aria-selected="true"]`/`[aria-pressed="true"]`/`[aria-checked="true"]`/`[data-state]`
— **`.is-active` appears in neither.** Under those two media the ARIA attribute is the *only* signal that
works.

**Consequence.** The correct primitive is `aria-pressed` **alone**, at both versions. `.is-active` is
legacy cascade-compat the wrapper never needed — exactly what its own line 6 calls it ("the legacy
`.is-active` class") while line 7 simultaneously calls it canon. The file contradicts itself in two
consecutive lines.

**Falsifier.** A 7.0.0 declaration reachable through `.is-active` but not `[aria-pressed="true"]` on a
`glass-wash` host (or the converse). Searched: none in the button path; the only asymmetry runs the other
way (accessibility.css), favouring ARIA.

---

### L-7 · **MINOR** — an icon-only button primitive with **no accessible-name obligation** anywhere in its contract

**Claim.** Line 19 hard-pins square icon geometry and line 23 accepts arbitrary slot content, but nothing
in the component requires, declares, defaults, or asserts an accessible name. Every consumer would have had
to remember `aria-label` through the defeasible (L-4) fallthrough channel.

**Provenance.** The wrapper declares one prop, `active` (11-13) — no `label`, no `aria-label`, no dev
assertion, no `defineSlots` constraining the slot to named content. Downstream, glass-ui 4.0.0's Button
injects nothing: it renders `Primitive` with `as`/`as-child`/`data-slot`/`data-variant`/`data-size`/`type`/
`disabled`/`class` plus `renderSlot($slots, "default")`, and no name. The **successor names the obligation
this wrapper omits**: glass-ui 7.0.0 `src/components/button/Button.vue:25` documents `iconOnly` as
*"Square geometry for an **accessibly named** icon command."*

**Falsifier.** A name injected by Button, by reka-ui `Primitive`, or by a fourier-global convention filling
`aria-label` on `[data-size="icon"]` — the first two are read above and inject none;
`grep -rn "aria-label" web/src/style.css` → **zero**.

---

### L-8 · **MINOR** — colocation and name assert a canvas-overlay role the component does not and structurally cannot fill; its touch-count on the viz render path is **zero**

**Claim.** A domain-neutral Button wrapper is filed under `components/visualization/` and named for a
surface it never touches, while the real canvas-overlay control surface is built from a **different,
mutually incompatible** primitive family.

**Provenance.**
- **The render path** (`lane-frontend.md §6`, re-verified live): Canvas2D throughout, WebGL/WebGPU absent —
  exactly four `getContext("2d")` sites (`BasisCanvas.vue:475`, `composables/useCanvasSetup.ts:30`,
  `equation/FrequencyGraph.vue:63`, `equation/ConvergencePlot.vue:93`) and zero WebGL hits. **This component
  appears in none of Paths A, B or C** — it acquires no context, subscribes to no clock, registers with no
  `IntersectionObserver`, and is absent from `stores/animation.ts`'s visibility gate.
- **The real canvas chrome** is `CanvasControlsDock` + `EditorControlsDock`, and every control inside them
  is `DockIconButton` from `@mkbabb/glass-ui/dock` (`CanvasControlsDock.vue:7,54,59,71,77,87`;
  `EditorControlsDock.vue:6,143,148`) — whose active paint lives on a family selector this component's host
  **can never carry** (`dock-controls/icon-button.css:109-115` keyed on `.dock-icon-button`, resolving
  `--dock-active-bg` → `--dock-control-active-bg` → `var(--glass-bg-floating)` at
  `tokens/offsets-sizing.css:405,339`). Dropping `CanvasOverlayButton` into the dock it is named for would
  produce an **unstyled** control.
- **Placement.** `web/src/components/ui/` exists and holds exactly the domain-neutral wrappers
  (`CollapsibleSection.vue`, `PathPreview.vue`, `SliderControl.vue`, `tooltip/`). A Button wrapper with one
  boolean prop belongs there, not in the epicycle-product directory.

**Falsifier.** Any `Button variant="glass"` rendered *inside* `CanvasControlsDock`/`EditorControlsDock` or
the `.canvas-container` overlay stack — grep of both docks returns `DockIconButton` only.
`FullscreenViewer.vue:110` is a fullscreen-frame close authored inline (see L-9), not an overlay-dock member.

---

### L-9 · **MINOR** — Goldilocks: the abstraction unified **zero of nine** live sites, and the one control that is *literally* a canvas-corner overlay button hand-rolls it instead

**Claim.** 25 lines whose entire payload is two static attributes and one conditional class, wrapping a
component that already exposes both, adopted by nobody — while the exact composition it wraps is retyped
inline nine times.

**Provenance.**
- fourier's own authoring-wave ledger, `docs/tranches/A/audit/W3-button-ledger.md:93`, records the row as:
  *"naked wrapper component forwarding `active` as `aria-pressed`; `<Button variant="glass" size="icon">`
  **IS** the surface"*. The wave that created it already knew.
- **Exact live count** (`grep -rn 'variant="glass"' web/src`, minus the 2 prose lines and this file):
  **9 attribute sites** — `PaperView.vue:400`, `FullscreenViewer.vue:110`, `GalleryCard.vue:158/167/176`,
  `EquationResult.vue:39`, `FunctionInput.vue:190`, `EquationView.vue:276`, `ConvergenceTimeline.vue:61`.
- **The sharpest one:** `FullscreenViewer.vue:110` —
  `<Button variant="glass" size="icon" class="fs-close" @click="emit('close')">` — sits inside
  `.fs-container` **directly over `<BasisCanvas>`** (`:118-127`). That is, verbatim, a canvas-overlay
  icon-button, hand-authored with the identical two attributes, in the component the census calls the
  "Fullscreen canvas layer". **The wrapper's single natural consumer bypasses it.**
- Cost of keeping it: one extra component instance per (hypothetical) use, an opaque name (L-8), no type
  safety (L-4) — in exchange for two static attributes.

**Falsifier.** A single adopting consumer, historical or present. `git log --all -S CanvasOverlayButton`
and the live grep both return the defining file only; the one historical consumer died at `2f53d5d`.

---

### L-10 · **MINOR** — a bare `git rm` deletes the **only** `aria-pressed` idiom on the visualization control surface, handing F.W3/F.W4 a latent a11y regression rather than closing one

**Claim.** The component is the sole carrier, on the viz control surface, of the ARIA mechanism that both
glass-ui versions actually paint from and that the a11y media arms exclusively key on.

**Provenance.** `grep -rn "aria-pressed" web/src` → 16 lines. **The canvas-overlay toggles are not among
them**: `CanvasControlsDock.vue:54,59,71,77,87` and `EditorControlsDock.vue:143,148` — **7 live toggles** —
set `:class="{ 'is-active': … }"` and **no** `aria-pressed`; `ConvergenceTimeline.vue:61` sets
`:class="{ 'is-playing': playing }"` (a *third* active vocabulary, backed only by its own scoped
`.play-btn.is-playing` at `:124`) on a `variant="glass" size="icon"` Button with no ARIA state at all.
Those 7 dock toggles **do** paint (L-3 receipt 4 — they are dock-family, and the tokens resolve), so the
defect is **invisible to the eye** and visible only to assistive tech and to
`prefers-contrast`/`forced-colors` (glass-ui 7 `accessibility.css:9-40`, keyed on `[aria-pressed="true"]`
exclusively — L-6).

**Cure.** Delete the file **and** add `:aria-pressed` to those 8 sites **in the same commit**. One
attribute per site, no producer change, correct at 4.0.0 and 7.0.0 alike.

**Falsifier.** Any `aria-pressed`, `role="switch"`+`aria-checked`, or `[data-state]` on a `DockIconButton`
in either dock — grep returns none. The 16 hits are `BasisSelector`, `GalleryCard`, `GalleryCardModal`,
`GallerySearchBar`, this file, and two prose comments.

---

### L-11 · **INFO** — `active?: boolean` yields a **three**-state `aria-pressed`, and "not a toggle" vs "toggle-off" is invisible to the type system

**Claim.** `undefined` → attribute removed (a plain command button); `false` → `aria-pressed="false"`
(a toggle, currently off); `true` → `aria-pressed="true"`. `<CanvasOverlayButton>` and
`<CanvasOverlayButton :active="false">` therefore expose **different ARIA roles** with no type-level
signal, from an optional prop with no `withDefaults`.

**Provenance.** Vue's `patchAttr`: `value == null` ⇒ `removeAttribute`; `aria-pressed` is not a special
boolean attribute, so `false` is stringified to `"false"` by `setAttribute`. Line 12 is optional; there is
no default. Tailwind's `aria-pressed:` arm matches `="true"` only, so `false` correctly paints as off —
the *rendering* is right; the *contract* is ambiguous.

**Cure.** Either require `active: boolean` (every instance is a toggle) or split the toggle affordance into
its own component. Not both-in-one, silently.

**Falsifier.** Vue rendering `aria-pressed="false"` for `undefined` (it removes it), or treating
`aria-pressed` as a special boolean attr (`isSpecialBooleanAttr` covers the HTML boolean set, not `aria-*`).

---

## §2 — SUPERLATIVES (L-18, the other direction — each with its own falsifier)

### S-1 · The dead file is the **only** viz-overlay control in fourier that gets toggle *semantics* right — and this is load-bearing
`:aria-pressed="active"` (line 20) is precisely the mechanism that glass-ui 4.0.0 paints from (the CVA's
`aria-pressed:bg-[…]` arm), that glass-ui 7.0.0 paints from (`material.css:352-377`), and that the
`prefers-contrast`/`forced-colors` arms key on **exclusively** (`accessibility.css:9-40`). The seven live
dock toggles and `ConvergenceTimeline.vue:61` do not use it (L-10). **The one file scheduled for deletion
is the one that read the producer correctly.** This is why the disposition is LIFT-THEN-DELETE, not DELETE.
*Falsifier:* an `aria-pressed` on any dock control — none exists.

### S-2 · Provably leak-free by construction: the teardown surface is empty
`grep -nE "onMounted|onUnmounted|onScopeDispose|addEventListener|requestAnimationFrame|ResizeObserver|IntersectionObserver|setInterval|setTimeout|watch\(|ref\("`
over the file → **zero hits**. One import, one `defineProps`, a static template: no handle is ever acquired,
so none can be leaked. In a tree carrying two rAF clocks (one of them ungated —
`ConvergencePlot.vue:67-69`, census §6 Path B), four retained 2D contexts, and a reference-counted
visibility gate, a control with a nil lifecycle surface is worth naming as the clean case.
*Falsifier:* any lifecycle hook, timer, observer, listener or retained ref — none.

### S-3 · Prop-not-attr hygiene: `active` is declared, so it never leaks to the DOM
Because line 12 declares it, `active` is consumed by the wrapper and excluded from `$attrs`; no stray
`active="true"` reaches the host `<button>`. The naive alternative — leaving it undeclared and reading
`$attrs.active` — would have stamped a non-standard attribute onto every instance. Small, but it is the one
place the file's authorship is strictly better than the shortcut.
*Falsifier:* `active` appearing in `$attrs` — it cannot; it is in `props`.

### S-4 · The docblock indicts itself accurately on the one word that mattered
Line 6 labels `.is-active` **"the legacy … class"** — in-file, unprompted, by the author. That single word
is what let three independent audits (`A8-no-legacy-sweep.md:29`, `raw-findings.json:2919`,
`findings-index.txt:105`) locate the whole toggle-register defect class without reading a line of producer
CSS. *Falsifier, and the strict limit of the credit:* the very next clause — "matching the glass-ui canon"
(line 7) — is **false as installed** (L-3). The credit is for the word `legacy`, not for the docblock.

---

## §3 — R5-7 (native-template-loop invisibility): **does not apply on its face; its dual applies, is measurable, and names two files**

**R5-7 does not apply directly, and I decline to stretch it.** `grep -n "v-for" CanvasOverlayButton.vue`
→ **zero**. The class R5-7 describes — *loop evidence keyed to component callsites is blind to native
`<li v-for>`* (adjudicated TRUE / ADOPT-AS-FACT, cured by R6-5's `NATIVE_TEMPLATE_LOOP` family) — has no
instance in this file. Sharper still: because this subject is a **component**, any future instantiation of
it inside a `v-for` *would* register as a component callsite. **It sits on the visible side of R5-7 by
construction.** L-18 cuts both ways; claiming otherwise would be padding.

**Its dual applies, and I re-derived it independently.** R5-7's defect is a *key-mismatch* defect: the
numerator is keyed to one kind of member and misses another. This component is the **opposite miss** — a
member fully registered in the file denominator with **zero instances** in any instance denominator.

- **Method** (live, read-only): for each of the 66 `web/src/**/*.vue`, grep its basename across every `.vue`
  and `.ts` under `web/src`, excluding the file itself; report the zero-hit set.
- **Result — exactly two:**
  `components/visualization/CanvasOverlayButton.vue` and `components/equation/InfoCard.vue`.
  Both re-checked directly (`grep -rn "InfoCard" web/src web/e2e` → empty; `grep -rn "CanvasOverlay"
  web/src web/e2e` → empty) and against the four-channel dynamic closure of L-1.

**This corroborates — and *names* — an otherwise anonymous adjudicated figure.** Intake row **R3-7**
(verdict **TRUE / ADOPT-AS-FACT**) carries `summary.sourceWorkflowTotal 66 / Reachable 64 / **Unmounted 2**`
— "two exact unmounted workflows", never named in R3, never named in the intake lane, never named in the
census. **They are these two.** Independent method, exact agreement with a thrice-stable deriver
(R4-8 `workflows: 66`; X-5 AGREE, `find web/src -name "*.vue"` → 66, re-run here → **66**).

**The F.W4 lesson, stated as R5-7 mirrored.** A per-component D/L/C audit driven by the 66-workflow
numerator will spend budget auditing **2 components that can never render**, exactly as a callsite-keyed
loop derivation drops the entire `PaperSidebar` TOC subtree (3 native `<li v-for>` at lines 65/87/105,
R6-5). *Same disease, opposite sign.* Both are why **X-9** — *publish ONE member-scope law before any
per-component percentage* — is the governing carry, and both argue the law must state, for each
denominator, **what a member is keyed by**.

**The cost is already paid, in receipts.** The frozen M.W1a sweep spent a migration edit on the *other*
dead SFC: `web/src/components/equation/InfoCard.vue` carries a `:amount` → `:value` MetricBadge rename in
the uncommitted diff. And `lane-frontend.md:471` budgets the `./metric-badge` → `./metric` cure at
**"7 imports / 6 files"**, listing `InfoCard.vue:4` among them. **That budget is 6 files but only 5 live** —
and the sixth, like this subject, wants `git rm`, not a rename.

---

## §4 — Corpus reconciliation: agree · refine · contradict

| corpus row | this challenge |
|---|---|
| fourier A8-14 / CHR-26 / A8-21 — "dead component, zero consumers, DELETE" | **CONFIRMED** at live HEAD by an independent four-channel reachability closure (L-1) — **and escalated**: the deletion is also the cheapest member of the F.W1 break surface (L-2), and a bare `git rm` costs an a11y idiom (L-10). |
| `partial-prior-run.json:207-211` (A3-05) — STEP 2i skipped | **CONFIRMED** — present at `cd26c65`, and **not among the 28 modified paths**, so the skip is un-minuted on the branch F.W0 must land. |
| **`raw-findings.json:2968`** (M-deep-audit, 2026-06-16) — "`.dock-icon-button.is-active` has **NO backing paint** in glass-ui dock.css OR fourier's scoped CSS — the toggled-on state renders identically to idle" | **CONTRADICTED for the dock family.** Against the **installed** glass-ui 4.0.0 this is false: `dist/styles/dock-controls/icon-button.css:109-115` gives `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` five real declarations off the `--dock-active-*` cohort (which resolves: `tokens/offsets-sizing.css:405` → `:339` → `var(--glass-bg-floating)`), and `glass/material.css:231-234` adds the specular arm. The finding was authored the day **before** the M.W1a 4.0.0 install cured it. **The inert-class claim survives only for the Button family** — i.e. exactly this component (L-3). The distinction is load-bearing: it makes the 7 live dock toggles a pure **a11y** defect (L-10), not a paint defect. |
| `raw-findings.json:2919/2980` — the "DOCK-ACTIVE" producer ask: Button-family-wide pressed register, or DockIconButton-only? | **ANSWERED UPSTREAM, neither way.** glass-ui 7.0.0 made it *material*-wide: `material.css:352-377` keys the whole state family off `glass-wash`/`glass-*`/dock in one rule (L-6). No fourier-side ask remains; the F.W3 glass-BH relay should record it **satisfied**, not re-send it. |
| `lane-frontend.md:468-482` — the 4→7 break surface "rows that hit fourier TODAY" | **AMENDED** — add the Button `variant`/`size` → `emphasis`/`iconOnly` axis rename (L-2). 35 files import `/button`; 36 real `size="icon"` attribute sites. Button-attributable `variant="` subset **UNMEASURED**, F.W1 enumeration item. **Also add the `type="button"` cure** (7.0.0 `Button.vue:55`) as an under-booked *benefit* of the hop (L-5). |
| `lane-frontend.md:471` — `./metric-badge` cure budget "7 imports / 6 files" | **REFINED** — 5 live files + 1 unmountable (`InfoCard.vue`), §3. |
| `lane-frontend.md §6` — Canvas2D throughout, WebGL/WebGPU absent, three independent canvases + 4 contexts | **CONFIRMED** live (4× `getContext("2d")` at the four named sites, 0× WebGL) — and used to establish that this component's touch-count on that path is **zero** (L-8). |
| `lane-frontend.md:101` — inventory row "`CanvasOverlayButton.vue` | 25 | `Button` wrapper for canvas-corner affordances" | **CONTRADICTED as written.** The row describes a live role. It has no consumers, is absent from the render path, and the one real canvas-corner affordance (`FullscreenViewer.vue:110`) hand-rolls the composition instead (L-9). The census §2 roster carries **no deadness column**, which is how a file under a five-fold DELETE order re-entered the formation as inventory. |
| Intake **R3-7** — "64/66 reachable, two exact unmounted workflows" (TRUE / ADOPT-AS-FACT) | **CORROBORATED AND NAMED** by independent method: `CanvasOverlayButton.vue` + `equation/InfoCard.vue` (§3). |
| Intake **R4-8 / X-5** — 66 `.vue` / 65 `.ts`, thrice-stable | **CONFIRMED** — 66 re-counted live at `cd26c65`. |
| Intake **R5-7** — native-loop blindness | **DOES NOT APPLY** to this file (no `v-for`; and as a *component* it is on the visible side of the defect). Its **dual** applies and is §3. |
| Intake **X-9** — publish ONE member-scope law before any percentage | **STRENGTHENED** — §3 gives it a concrete two-file cost at F.W4, and a required clause: each denominator must state *what a member is keyed by*. |

---

## §5 — VERDICT

**DEFECTIVE.** **11 defects** survive their falsifiers — **2 BLOCKER** (L-1 dead-and-ordered-deleted with
the skip un-minuted on the tree F.W0 must land; L-2 a hard `vue-tsc`/`npm run build` break at glass-ui 7 on
an axis the census break table omits), **3 MAJOR** (L-3 the `.is-active` half is provably inert as installed
and the docblock asserts the opposite; L-4 every pinned attribute is defeasible by fallthrough while `class`
merges, so the stated contract is caller-breakable into a contradiction; L-9 the abstraction unified zero of
nine sites while its single natural consumer hand-rolls it), and **6 MINOR/INFO** (L-5, L-6, L-7, L-8, L-10,
L-11).

**4 superlatives** survive, and **S-1 is load-bearing**: it changes the disposition from DELETE to
**LIFT-THEN-DELETE**.

**Terminal disposition.**
1. **F.W0** — minute the M.W1a STEP-2i divergence, then execute it:
   `git rm web/src/components/visualization/CanvasOverlayButton.vue`. Rule on `equation/InfoCard.vue` in
   the same breath — it is the second and last unmounted workflow (§3), and it is currently *receiving*
   migration edits.
2. **Before that `rm`** — lift `:aria-pressed` onto the 8 live toggles that lack it
   (`CanvasControlsDock.vue:54,59,71,77,87`; `EditorControlsDock.vue:143,148`;
   `ConvergenceTimeline.vue:61`). One attribute per site, no producer change, correct at 4.0.0 and 7.0.0.
   Deleting first loses the tree's only correct reading of the producer's toggle contract (S-1, L-10).
3. **F.W1** — add the Button `variant`/`size` → `emphasis`/`iconOnly` rename to the break-surface
   enumeration (35 files / 36 `size="icon"` sites), and credit the `type="button"` cure as a hop benefit.
   This file is the one member whose cure is deletion.
4. **F.W3** — record the "DOCK-ACTIVE" glass-BH ask as **satisfied upstream** by glass-ui 7
   `material.css:352-377`; do not re-send it.
5. **F.W4** — adopt the member-scope law (X-9) with the 2-unmounted-workflow figure banked and the
   keyed-by clause required, so the per-component audit does not spend budget on components that cannot
   render — and does not repeat R5-7 in the opposite direction.

*Read-only throughout. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`
were read as evidence and not modified; the single write of this lane is this file. No browser tooling was
used, and no claim required it.*
