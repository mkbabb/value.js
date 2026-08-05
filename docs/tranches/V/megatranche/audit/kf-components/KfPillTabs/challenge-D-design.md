claude-opus-5[1m]

# CHALLENGE · KfPillTabs · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/KfPillTabs.vue` (124 lines)
**Imports read whole** `KfPillTabs/useKfPillTabs.ts` (93) — the only import.
**Rendered context read whole** `channel-controls/ChannelControls.vue` (456), `transport/index.ts`, `transport/composables/useKfPillTabs.ts` (the 4-line shim), `channel-controls/composables/useTabStripScroll.ts`, `state/controlSurfaces.ts`, `app/App.vue` (provide sites), `styles/style.css`, `styles/tab-idiom.css`, `styles/font-roles.json`, `demo/DESIGN.md §5`, `test/demo/instrument/KfPillTabs.test.ts`.
**Token evidence** `node_modules/@mkbabb/glass-ui/dist/styles/{glass/ladder.css, glass/a11y-fallback.css, theme/radius.css, typography/scale.css, tokens/scheme-motion.css, fonts.css}` (installed 7.0.0).
**Method** static + source-derived only. No browser. Contrast computed WCAG 2.x relative-luminance from the token graph; every ratio carries its substrate assumption inline. Livable-only claims are tagged **UNPROVEN-NEEDS-LIVE** for SS-13.

**Tally** 22 defects · **2 BLOCKER** · 7 MAJOR · 8 MINOR · 5 INFO · 5 superlatives.

---

## 0. Fold of the hitherto corpus

| Corpus id | What it said | This challenge |
|---|---|---|
| `lane-frontend.md` **F-1** | `@mkbabb/glass-ui` is a phantom dep — absent from `package.json`/lock, 7.0.0 on disk | **CONFIRMED independently.** `grep -n glass-ui package.json` → 0 hits; `node -p require(...).version` → `7.0.0`. Every token ratio below is therefore computed against an *unpinned* substrate. Noted as a standing caveat, not re-filed as my defect. |
| **F-2 / S-1** | `KfPillTabs` forks `SegmentedTabs` over a 4.0.1 ARIA bug fixed in the installed 7.0.0; verdict **replace**, 217 lines | **CONFIRMED and ESCALATED.** S-1 rated the fork *stale*; D-B1 below shows it is also **unrendered**, which moves the verdict from *replace* to *delete*. |
| **S-1 tail** | "It is **live, not dead** — rendered at `ChannelControls.vue:74`" | **CONTRADICTED — see D-B1.** The render *site* exists; the render *never happens*. S-1 stopped at the `<KfPillTabs` grep and did not walk the `v-if` one line up (`ChannelControls.vue:56`) to `App.vue:169`. |
| **S-2** | Demo adopted glass-ui's tab *data contract* while rejecting its *renderer*; prose still says `<SegmentedTabs>` owns the strip | **CONFIRMED, extended.** D-M6 shows the fork also dropped a *capability* (`activation: "manual"`), and D-i4 shows the prose rot reaches `DESIGN.md` and `font-roles.json`, not just SFC comments. |
| **S-1 shim tail** (`lane-frontend.md:537-553`) | `transport/composables/useKfPillTabs.ts` is a 4-line back-compat shim; `ChannelControls.vue:229-230` imports component and type through *different* paths | **CONFIRMED.** D-m7 adds the root cause: the SFC comment claims a re-export that `<script setup>` cannot produce, so the shim exists to paper over a documented-but-absent seam. |
| **S-8** | `TypingDots` is justified bespoke | Not in scope; cited only as the contrast case — S-8's justification is a *capability gap*, KfPillTabs' is a *fixed upstream bug*. |
| `lane-library.md` (parse seams) | — | No overlap; KfPillTabs touches no parser surface. |

---

## 1. BLOCKERS

### D-B1 · BLOCKER · `<KfPillTabs>` never renders in the shipped demo — the entire design surface is unobservable

`ChannelControls.vue:56` gates the strip's host:

```
56  <div v-if="!tabsExternallyManaged" ref="tabsHeaderEl" class="… glass-wash rounded-panel px-2 py-0.5 overflow-hidden">
…
74      <KfPillTabs
```

`tabsExternallyManaged` is injected at `ChannelControls.vue:277` (`inject(TABS_EXTERNALLY_MANAGED_KEY, false)`). There is **exactly one** provide site in the entire demo:

```
demo/app/App.vue:168  // Tabs in the controls pane are managed via the ChromeDock controls tab dropdown
demo/app/App.vue:169  provide(TABS_EXTERNALLY_MANAGED_KEY, true);
```

Verified exhaustive: `grep -rn "provide(" demo/ | grep -i tabs` → that single line. It is top-level in `<script setup>`, unconditional, not inside any branch. There is exactly one `createApp` (`demo/app/main.ts:32`, mounting `App`), and the only other candidate host — the "standalone playground `EditorShell`" the comments at `ChannelControls.vue:263-272` and `:289-292` invoke — is rendered **inside** `App.vue:28`, so it inherits `true`. No component provides `false`.

Therefore `!tabsExternallyManaged` is permanently `false` and `<KfPillTabs>` never mounts. Corroborating consequences all hold:

- `useTabStripScroll`'s `tabsHeaderEl` is always `null`, so `checkOverflow()` and `scrollActiveTabIntoView()` (`useTabStripScroll.ts:47-56, 64-74`) are permanent no-ops — the overflow fade is unreachable machinery.
- The live control-surface switcher is a glass-ui **`<Select>` dropdown** in `demo/app/dock/ChromeDock.vue:235-244` (via `dockCardinality`, `surfaceTabs.ts:26-33`) — **not a tab strip at all**. So the owner ruling the component cites as its design charter, `KfPillTabs.vue:77-78` ("the legible chip register the user asked for — *pills if tabs at all*"), is moot: the shipped UI has **no tabs**. The conditional in the ruling resolved to "not at all", and the strip was built anyway.
- The demo's own design-system manifest already knows: `demo/styles/font-roles.json:29-32` registers `.kf-pill-tab` with the note *"the component itself is a T.H gated-on-publish excision; the register holds until then."*
- The sibling pill vocabulary is dead the same way: `grep -rn "tab-trigger" demo/` returns only comments, `DESIGN.md:116`, `font-roles.json:18/24`, and `tab-idiom.css` itself — no template applies `.tab-trigger-*`. The demo ships **two dead pill registers**.

**Why this is the blocker and not a footnote.** Every finding D-B2…D-i5 is a design property of markup that does not paint. A design axis cannot certify a component whose rendered form is empty; and a 124+93-line bespoke fork of a shipped primitive, kept alive on rationale that F-2 proved three majors stale, that also never renders, is not a refactor candidate — it is dead weight with a live maintenance tax (`font-roles.json` role, `DESIGN.md` grammar row, a 190-line vitest suite, a 4-line compat shim, an async barrel entry).

**Falsifier.** Any of: (a) a second `createApp`/mount root outside `App.vue`; (b) a `provide(TABS_EXTERNALLY_MANAGED_KEY, false)` anywhere in the tree or in a test/story host that ships; (c) `TABS_EXTERNALLY_MANAGED_KEY` reaching `ChannelControls` via a *different* key that also defaults false; (d) a live page where DevTools shows a `[role=tablist].kf-pill-tabs` node. Any one kills this claim. I ran (a) and (b) to exhaustion by grep; (d) is the SS-13 confirmation I cannot run.

---

### D-B2 · BLOCKER (on revival) · plate-on-plate: `glass-wash` nested inside `glass-wash` destroys the recede idiom it exists to serve

`KfPillTabs.vue:17` puts the wash rung on the tablist root:

```
17  class="kf-pill-tabs glass-wash"
```

Its only consumer already put the same rung on the immediate parent:

```
ChannelControls.vue:56  class="… glass-wash rounded-panel px-2 py-0.5 overflow-hidden"
```

`ladder.css` gives `.glass-wash` a *plate*, a *border*, a *rim*, a *drop shadow*, and a *backdrop-filter*:

```
.glass-wash { position: relative; --glass-bg-rung: var(--glass-bg-wash);
  background: var(--glass-plate-tinted);
  backdrop-filter: var(--glass-blur-wash);
  border: 1px solid var(--glass-border-accent);
  box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); }
```

Nesting therefore doubles **all five**. The plate stack is computable:

- `--glass-bg-wash: color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-wash)) * var(--glass-level)) * 100%), transparent)`
- defaults: `--glass-level: 0.3`, `--glass-opacity-wash: 0.30` → per-plate card alpha `1 - 0.70 × 0.3 = 0.79`
- two stacked plates → effective `0.79 + 0.21 × 0.79 = **0.9559**`

The wash rung exists precisely so the stage bleeds through the chrome — that is the whole of `ADOPT-9` / `J.W7a D5` / `pane-cube.md C16` in the value.js corpus ("the controls pane recedes so the subject becomes the protagonist"). Designed residual translucency **21%**; delivered **4.4%**. The idiom is not weakened, it is inverted: the strip reads as the *heaviest* thing in the pane. Secondary compounding: two `1px solid var(--glass-border-accent)` hairlines separated by exactly `py-0.5` = **2px** (a moiré-prone double rule), two `--glass-material-rim` insets, two `--glass-shadow-wash` drops, and `blur(0.3px) saturate(1.35)` applied twice — the inner element's backdrop already contains the outer's blurred plate.

This is glass-ui's own documented **No-PLATE-on-PLATE** rule (recorded in this corpus at `docs/tranches/N/audit/research-glass-vt-modernweb.md:19`: *"DO NOT nest a glass PANEL inside a glass panel … depth-3 ceiling, contain:paint budget; a glass CONTROL on a glass plate is SANCTIONED"*). A pill *track* is a plate, not a control; the sanctioned form is bare-track-on-plate.

Note the demo compounds it deliberately in one direction: `style.css:203-208` names `.glass-wash` and forces `--glass-tint-strength-aa: 0%`, stripping the AA ink-darken glass-ui adds for legibility. So the nested plate is maximally translucent *per rung* and near-opaque *in stack* — the worst of both.

**Severity note.** Rated BLOCKER **conditional on D-B1**: unrendered today, ships the instant the gate flips. If D-B1 is resolved by deletion, D-B2 dies with it; if by flipping the gate, D-B2 is a shipping blocker.

**Falsifier.** A demo rule that suppresses the plate on a nested wash (e.g. `.glass-wash .glass-wash { background: none; border: 0; box-shadow: none; backdrop-filter: none }`) — I grepped `demo/styles/` for any nested-glass or depth guard and found only the `--glass-tint-strength-aa` re-point at `style.css:203`. Or: a live computed-style read showing the inner root's `background-color` alpha ≤ 0.79 and one border.

---

## 2. MAJOR

### D-M1 · MAJOR · no `aria-controls` / `aria-labelledby` — the tab↔tabpanel relation does not exist, falsifying the header's own claim

`KfPillTabs.vue:19-32` renders `role="tab"` buttons with `aria-selected`, `tabindex`, `disabled`, `data-value`, `data-state` — and **no `aria-controls`**. The component exposes no `id` prop, no `panelId` per option (`KfPillTabOption` is `{label, value, disabled?}`, `useKfPillTabs.ts:23-27`), so a consumer *cannot* wire it without editing the SFC. On the panel side, `ChannelControls.vue:97-102, 129-137, 149-154` render `role="tabpanel"` divs with **no `id`** and **no `aria-labelledby`**.

WAI-ARIA 1.2 / APG *Tabs* pattern: each `tab` **must** carry `aria-controls` referencing its `tabpanel`; each `tabpanel` **should** carry `aria-labelledby` referencing its tab. Neither exists in either direction. The result: an AT user hears "Controls, tab, selected, 1 of 3" and then, on reaching the panel region, an **unlabelled** `tabpanel` with no announced owner, and no `Ctrl+Alt+↓`-class tab→panel jump.

This directly falsifies `KfPillTabs.vue:9-11`: *"This strip is ARIA-correct **BY CONSTRUCTION** — a `role=tablist` of `role=tab` buttons (a panel switcher, the right pattern), where `aria-orientation` is a **VALID, complete contract**."* The strip swapped one incomplete ARIA contract (`role=group` + a stray `aria-orientation`) for a *differently* incomplete one, and asserted completeness. The `aria-orientation` sub-claim is true in isolation; "ARIA-correct by construction" is not.

**Honest bound.** NVDA/JAWS/VoiceOver all remain functional without `aria-controls` — the tabs announce, selection announces, panels are reachable by normal reading order. This is a degraded relation, not a dead one. That is why it is MAJOR and not BLOCKER.

**Falsifier.** An `aria-controls` binding anywhere in the KfPillTabs template or a wrapper that injects it (`grep -rn "aria-controls" demo/` — I found none on this path); or an authoritative reading that `aria-controls` on `tab` is optional in ARIA 1.2 for automatic-activation tablists (the spec lists it under the required properties for `tab`, so I expect this fails).

### D-M2 · MAJOR · `font-weight` in the transition list is a **layout** channel — every activation animates the pill's width and shoves its siblings for 200ms

```
101      /* Narrow transition (no `all`) — only the activation channels change. */
102      transition:
103          color var(--duration-fast) var(--ease-standard),
104          background var(--duration-fast) var(--ease-standard),
105          font-weight var(--duration-fast) var(--ease-standard);
```
paired with `:99 font-weight: 500` → `:117 font-weight: 600`.

Plus Jakarta Sans ships as a **variable** face — `glass-ui/dist/styles/fonts.css` declares `font-weight: 200 800` on the `Plus Jakarta Sans` `@font-face`. Browsers therefore **interpolate** `font-weight` continuously across the 200ms rather than snapping, so the glyph advance widths change every frame. `.kf-pill-tab` is `flex-shrink: 0` (`:89`) inside an `inline-flex` track (`:81`), which is itself sized `w-fit` by the consumer (`ChannelControls.vue:81`). Consequence chain per activation:

1. the activating pill's intrinsic width grows (weight 500→600 across ~8–15 glyphs),
2. every pill to its right translates,
3. the `inline-flex` track's own width animates,
4. the `w-fit` wrapper and — via D-B2 — the outer `glass-wash` plate resize with it.

So the comment's claim ("only the activation channels change") is exactly inverted for one of its three entries: `font-weight` is the *widest* channel available, invalidating layout on every frame of the transition. `background` and `color` are compositor-cheap paint channels; `font-weight` is layout. The J.W7b STY-6 lesson (retire `transition: all` because it "silently animated EVERY future property change (layout included)") was applied by *enumerating* the list while leaving a layout property inside it.

**Falsifier.** Any of: (a) `fonts.css` turns out to serve *static* 500/600 faces for the rung the pills inherit (I read the declaration: `font-weight: 200 800`, i.e. variable — but `font-synthesis: none` at `style.css:100` interacts here and a live `document.fonts` probe would settle which face is actually used); (b) the labels sit in a context where `font-variation-settings` is pinned, defeating interpolation; (c) a live layout-shift trace across an activation showing 0px sibling movement. **UNPROVEN-NEEDS-LIVE** for the exact px magnitude; the mechanism is proven from the two files.

### D-M3 · MAJOR · no `prefers-reduced-motion` arm, and the token it relies on is not PRM-aware

`KfPillTabs.vue:76-124` contains no `@media (prefers-reduced-motion: reduce)` block. Nor does the demo anywhere: `grep -rn "prefers-reduced-motion" demo/styles/` → **0 hits**; `grep -rn "prefers-reduced-motion" demo/` → 0 hits.

The component delegates to `--duration-fast`. glass-ui's PRM handling is a single block in `tokens/scheme-motion.css`:

```
@media (prefers-reduced-motion: reduce) { :root { --motion-weight: 0; --ease-cartoon-punch: var(--ease-standard); } }
```

It zeroes a *weight* multiplier and swaps one easing. It does **not** zero `--duration-fast` (`:root { --duration-fast: 0.2s }` stands). `.kf-pill-tab` reads no `--motion-weight`. Therefore the transition — including the D-M2 layout-motion channel — runs at full 200ms under a declared reduced-motion preference.

Colour and background cross-fades are defensible under PRM (they are not motion). The **font-weight width animation is motion** — it translates sibling elements from a user interaction, squarely WCAG 2.3.3 territory — and it is unguarded. The component's PRM story is honest only for the two channels that never needed a story.

Adjacent, same root cause: `useTabStripScroll.ts:55` fires `scrollIntoView({ behavior: "smooth" })` unconditionally on every selection change, with no PRM gate. Attributed to the host, not to KfPillTabs, and moot while D-B1 stands.

**Falsifier.** A PRM rule reaching `.kf-pill-tab` from a sheet I did not read (I grepped all of `demo/` and the glass-ui `styles/` tree for `prefers-reduced-motion`); or a demonstration that variable-`font-weight` interpolation produces no positional change (kills the motion characterisation, leaving only the harmless colour channels).

### D-M4 · MAJOR · the active-state chip is **1.17:1** against its own track, and is separated from hover by ~0.06 — the selected state has no non-text indicator

```
111  .kf-pill-tab[data-state="inactive"]:hover { background: color-mix(in srgb, var(--foreground) 5%, transparent); }
115  .kf-pill-tab[data-state="active"]        { background: color-mix(in srgb, var(--foreground) 8%, transparent); }
```

Both composite over the *same* substrate — the `.kf-pill-tabs` plate — so the ratio is decidable from tokens regardless of what lies beneath. Computing against the nominal plate colour `--card` (`theme`: `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`), with `--foreground` = `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))`:

| arm | track Y | active chip Y (8% ink) | active : track | hover chip Y (5% ink) | hover : track | **active : hover** |
|---|---|---|---|---|---|---|
| light | 0.9222 | 0.7791 | **1.17 : 1** | 0.8264 | **1.11 : 1** | **1.06 : 1** |
| dark | 0.0253 | 0.0436 | **1.24 : 1** | 0.0361 | **1.14 : 1** | **1.09 : 1** |

Two readings, both bad:

1. **WCAG 1.4.11 (Non-text Contrast, AA)** requires 3:1 for visual information identifying a *state*. The chip delivers 1.17/1.24 — a factor of ~2.5 short. The state is carried instead by `color` (`--muted-foreground` → `--foreground`) plus weight; those *do* carry it (see the honest bound), so this is not an automatic 1.4.11 failure, but the chip — the thing the component is *named for*, the "legible chip register" of `:77-78` — contributes essentially nothing.
2. **Hover vs active are perceptually the same chip.** 1.06:1 / 1.09:1 apart. A user hovering an inactive tab sees the same plate wash as the selected tab. The 5%/8% choice budgets a 3-percentage-point ink delta over a near-white (light) or near-black (dark) substrate, where 3pp of ink is under the perceptual floor. This is the design defect proper: the strip has no reliable *pointer-time* selected indicator.

The demo makes it worse on purpose: `style.css:203-208` zeroes `--glass-tint-strength-aa` on `.glass-wash`, removing the ink-darken glass-ui adds so that on-glass composites clear AA. That override is defensible for its stated reason (the dark-substrate self-darken breach) but it also removes the only mechanism that would have widened this chip's separation.

**Honest bound.** The *text* channel does carry state legibly: inactive text 6.06:1 vs plate (light), active text 16.19:1 — see D-S5. So AT users and careful sighted users are fine. The failure is the chip.

**Falsifier.** A live computed-style read of `.kf-pill-tab[data-state=active]`'s resolved `background-color` against its parent's, yielding ≥3:1 — e.g. if the `saturate(1.35) brightness(1.18)` arm of `--glass-blur-wash` or the `::after` grain overlay shifts the substrate luminance far from `--card`. Or a glass-ui rule that repaints `[data-state=active]` inside `.glass-wash` (I grepped `ladder.css`/`glass.css` and found none). My ratios assume the plate resolves near `--card`; at a mid-luminance substrate (Y≈0.2) the 8% chip could reach ~1.4:1 — still far under 3:1, so the conclusion is robust to the assumption even where the exact number is not. **The numbers are token-derived; the perceptual claim is UNPROVEN-NEEDS-LIVE.**

### D-M5 · MAJOR · fluid `--type-small` inside a capped `--rail-width` → the 4-tab strip overflows at every desktop width, with no pointer-reachable scroll

`:98 font-size: var(--type-small, 0.875rem)` resolves (glass-ui `typography/scale.css`) to `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — **viewport-fluid, 14px → 20px**. Its container is not: `design-idioms.css:47 --rail-width: clamp(25rem, 33svi, 32rem)` — **capped at 512px** past a ~1552px viewport. So the strip's type keeps growing after its container has stopped. Available inner width = `--rail-width` − pane inset `pl-4 pr-7` (`ChannelControls.vue:39`) = 44px.

The maximum realisable option set is 4: `BUILT_IN_SURFACES` = {controls, keyframes, timeline} (`controlSurfaces.ts:51-56`) ∪ the cube's conditional `matrix-controls` facet (`controlSurfaces.ts:229-244` via `CubeScene.vue:232`, `:244`) — the Matrix channel paints, so it earns the triad *and* contributes its facet. Labels from `SURFACE_META` (`controlSurfaces.ts:145-159`): "Controls" (8), "Keyframes" (9), "Timeline" (8), "Matrix Controls" (15) = **40 glyphs**.

Fixed chrome: 4 × `0.75rem` × 2 pill padding (`:93`) = 96px; 3 × `0.125rem` gaps (`:83`) = 6px; track padding 2 × 2px (`:85`) = 4px; nested borders 4px (D-B2); wrapper `px-2` = 16px. **= 126px.** Glyph advance at ~0.53em (Jakarta mixed-case, weight 500):

| viewport | `--type-small` | rail | available | text | total | verdict |
|---|---|---|---|---|---|---|
| 1024px | 15.36px | 400px | 356px | 326px | **452px** | overflow **+96px** |
| 1440px | 16.40px | 475px | 431px | 348px | **474px** | overflow **+43px** |
| 1920px | 17.60px | 512px | 468px | 373px | **499px** | overflow **+31px** |
| ≥2464px | 20.00px (cap) | 512px | 468px | 424px | **550px** | overflow **+82px** |

Overflow at every desktop width — and it *worsens* on wider screens, the inverse of the expected direction, because type is fluid and the rail is not.

The component has no answer for it: `:81 display: inline-flex` with no `overflow-x`, no `flex-wrap`, and `:89 flex-shrink: 0` on every child — the pills cannot shrink, wrap, or scroll. The consumer's response is to **clip** (`ChannelControls.vue:56 overflow-hidden`) and paint a fade mask (`ChannelControls.vue:441-455`). An `overflow: hidden` box is programmatically scrollable but **not user-scrollable** — no scrollbar, no wheel, no trackpad pan, no touch drag. So "Matrix Controls" is reachable by **keyboard arrows only** (the `focus()` at `useKfPillTabs.ts:61` triggers the browser's scroll-to-focus). Pointer and touch users cannot reach it.

**UNPROVEN-NEEDS-LIVE sub-note.** The fade mask is applied to `.kf-pill-tabs` itself (`ChannelControls.vue:81` binds `overflowClass` onto the child root) — i.e. to the *overflowing* element rather than to the *clipping* ancestor. CSS `mask-repeat` defaults to `repeat`, so the gradient may tile across the overflow region and paint a repeating fade band rather than one edge fade. I cannot confirm the paint without a browser.

**Falsifier.** (a) A width budget I missed — e.g. `SURFACE_META` labels are overridden per-host, or the cube never yields 4 simultaneous options (I traced `surfacesFor` at `controlSurfaces.ts:97-119`: the Matrix channel has `animation`, so `base` = full triad, and its `facets` add `matrix-controls` — 4); (b) Jakarta's actual mean advance is materially below 0.53em, which would move the 1920px row under the line (the 1024px and ≥2464px rows survive advances down to ~0.40em, so the conclusion holds); (c) a live measurement showing `scrollWidth === clientWidth` on `.kf-pill-tabs` at the cube scene. The advance constant is my estimate and is the weakest link — flagged as such.

### D-M6 · MAJOR · automatic activation only, over panels the host itself proves are expensive

`useKfPillTabs.ts:86-89` — every arrow/Home/End keypress commits the selection:

```
86  // Selection follows focus (automatic activation) …
87  if (target.value !== params.modelValue()) params.select(target.value);
```

No manual mode exists; there is no `activation` parameter in `UseKfPillTabsParams` (`useKfPillTabs.ts:29-35`), no Enter/Space commit path.

APG *Tabs*: use **manual** activation when displaying a panel is expensive. These panels are expensive, and the host says so at length: `ChannelControls.vue:117-128` force-mounts the Monaco keyframes pane and caches it under `content-visibility: hidden` *specifically because* "re-spins Monaco's worker / model / themes on every switch-back"; `:389-392` gates the first mount behind `keyframesWarmed` to keep Monaco off the LCP path; `:79-80` wires `@pointerenter`/`@focusin` → `warmKeyframes` on the strip. So: arrowing from Controls to Timeline **instantiates Monaco en route**, on a keystroke, by design of the keyboard core — while the surrounding code is an elaborate apparatus for not doing exactly that.

And the capability was available. glass-ui 7.0.0 ships it: `dist/components/tabs/composables/useTabRovingFocus.d.ts` declares `export type TabActivation = "automatic" | "manual"` and `activation: ComputedRef<TabActivation>`, documented as *"Automatic activation keeps that tabstop on the selection; manual activation moves it independently and commits only on Enter/Space."* The fork re-implemented the roving machine (S-1) and, in doing so, shipped the half that is wrong for its own panels.

**Falsifier.** A live trace showing Monaco is *not* instantiated by a keyboard pass-through (e.g. `keyframesWarmed` latches on some other signal first, so the arrow-through is free) — `useKeyframesPaneReveal` would settle it; I read its call site but not its body, so this is the honest gap. Or an APG reading that automatic activation is acceptable here because the panel is cached after first warm (mitigates the *second* pass, not the first).

### D-M7 · MAJOR · `.kf-pill-tab` is a second local pill vocabulary — the exact fork `DESIGN.md` forbids by name

`demo/styles/tab-idiom.css:53-61` already owns a pill register:

```
53  .tab-trigger-pill { border-radius: var(--radius-lg); }
56  .tab-trigger-pill[data-state="inactive"]:hover { background: color-mix(in srgb, var(--foreground) 5%, transparent); }
59  .tab-trigger-pill[data-state="active"]         { background: color-mix(in srgb, var(--foreground) 8%, transparent); }
```
plus `.tab-trigger-base:22-51` — `flex-shrink: 0`, `background: transparent`, `font-weight: 500` → `600` on active, `--muted-foreground` → `--foreground`, and the **identical three-property transition list** (`:37-40`).

`KfPillTabs.vue:88-119` re-authors all of it. Every value that matters is byte-identical (radius `--radius-lg`, hover 5%, active 8%, weight 500/600, colour pair, transition triple) — and three have already **drifted**:

| property | `.tab-trigger-base` | `.kf-pill-tab` |
|---|---|---|
| block padding | `0.375rem` (`tab-idiom.css:25`) | `0.25rem` (`KfPillTabs.vue:93`) |
| type rung | `var(--type-body, 1rem)` → 16–22px (`:26`) | `var(--type-small, 0.875rem)` → 14–20px (`:98`) |
| `line-height` | `1.75rem`, explicit (`:27`) | **absent** → see D-m1 |

`demo/DESIGN.md:116-122` rules on this directly:

> "`tab-trigger-base`, `tab-trigger-pill`, and `tab-trigger-underline` **are the tab grammar** … These are cross-component recipes, so they remain central rather than being copied into SFCs. … upstreaming the tab variants … are glass-ui coordination asks, **not permission to fork a second local vocabulary**."

`.kf-pill-tab` is that second local vocabulary, copied into an SFC, with drift. And the comment at `KfPillTabs.vue:78-79` asserts the opposite — *"the same look the retired SegmentedTabs pill carried, sourced from design tokens (no re-authored colours)"* — where `color-mix(in srgb, var(--foreground) 8%, transparent)` is a hand-rolled recipe, not a token: glass-ui exposes `--tab-track-recess-ink`, `--tab-indicator-duration`, `--tab-indicator-max-stretch`, `--tab-indicator-blob-max`, none of which is read. "Sourced from design tokens" is true only of the *inputs*; the *recipe* is re-authored.

Standing corpus law: the value.js memory records `feedback_glass_ui_first_class` ("glass-ui is the design system; add variants/primitives there") and `feedback_kiss_no_contrivance`. Both point the same way.

**Falsifier.** Evidence that `.tab-trigger-pill` and `.kf-pill-tab` are deliberately different registers with a documented distinction (I found the opposite: `font-roles.json:26` calls `.tab-trigger-base[data-state=active]` "active filing tab" and `:29-32` calls `.kf-pill-tab` "pill-tab", both expecting `voice: body` — same register, two implementations). Or a live page where both classes paint (neither does — D-B1 and the `tab-trigger` grep).

---

## 3. MINOR

### D-m1 · MINOR · no `line-height` — the pill's height is inherited, so strip height is context-dependent

`.kf-pill-tab` (`:88-106`) declares `font-size` and `padding` but no `line-height`. `line-height` is inherited and Tailwind preflight sets `line-height: inherit` on `button`, so the pill's content box height is decided by whatever ancestor last declared one — the pane, the wrapper, or `:root`. The strip therefore has no intrinsic height; drop it in a different container and it changes size. The sibling idiom it copied from is explicit about this (`tab-idiom.css:27 line-height: 1.75rem`), so the omission is a regression against the register KfPillTabs replaced.
**Falsifier.** A `line-height` on `.kf-pill-tabs` or an ancestor that is stable across every mount site (there is none in the SFC; the two live mount sites collapsed to zero under D-B1, so this is untestable in situ today).

### D-m2 · MINOR · the focus ring (3px reach) exceeds the inter-pill gap (2px) and lands inside the neighbour

`:120-122 outline: 2px solid …; outline-offset: 1px` → the ring occupies 1px→3px outward from the button's border box. `:83 gap: 0.125rem` = **2px**. So the ring crosses the gap and overlaps 1px of the adjacent pill's box — grazing its hover/active chip. Aristotelian reading: the spacing rhythm (2px) was chosen without reference to the focus affordance (3px) it must contain. Clearance to the clip boundary is adequate (2px track pad + 1px inner border + 2px `py-0.5` = 5px > 3px), so the ring is not *clipped* — it is *collided*.
**Falsifier.** A live screenshot showing no visual overlap (browsers round `outline-offset` on radiused corners, and at a 10px radius the corner geometry may absorb it); or a rule raising `gap` ≥ `0.1875rem`.

### D-m3 · MINOR · a component named **Pill**Tabs uses `--radius-lg` (10px), not the design system's `--radius-tab` (9999px)

`:94 border-radius: var(--radius-lg)`. `glass-ui/dist/styles/theme/radius.css` defines `--radius-tab: var(--radius-pill)` = `9999px`, and `--radius-control: var(--radius-pill)` — the system has a token for exactly this element and it is ignored. `--radius-lg` = `var(--radius)` = `0.625rem` = **10px**: a rounded rectangle. The name, the header's "pill tab strip" (`:2`), the owner ruling "pills if tabs at all" (`:78`), and `font-roles.json`'s `"role": "pill-tab"` all say pill; the geometry says chip.
**Falsifier.** A ruling in the T/U/V corpus that the pill *register* means the glass-track-chip look rather than a capsule radius — plausible given `:77-79`'s "glass-track pill strip … the legible chip register", in which case the naming is loose but the token choice defensible. Note the tension with D-S1: switching to `--radius-pill` would *also* fix the concentricity that D-S1 credits.

### D-m4 · MINOR · `orientation="vertical"` is announced and keyboard-wired but never laid out vertically

The prop exists (`:57`), is bound to `aria-orientation` (`:15`), is documented as "the complete WCAG contract" (`:56`), and drives the arrow axis (`useKfPillTabs.ts:67-69`: `vertical ? "ArrowDown" : "ArrowRight"`). The CSS has **no vertical arm**: `:80-86` is `display: inline-flex` with no `flex-direction`, and there is no `[aria-orientation="vertical"]` selector anywhere in the block. So `orientation="vertical"` yields a tablist that announces `vertical`, responds to ↑/↓, and renders **horizontally** — the announced orientation contradicts the rendered axis, which is worse for a screen-reader-plus-sight user than either alone. The vertical path is even test-covered (`KfPillTabs.test.ts:"a vertical strip navigates on ArrowUp/ArrowDown"`), against a harness that renders its own bare `div` — so the test certifies the keyboard half and cannot see the missing layout half.
**Falsifier.** A consumer stylesheet that sets `flex-direction: column` on a vertical instance (no consumer passes `orientation` at all — `ChannelControls.vue:74-82` omits it, taking the `"horizontal"` default), or a `:where([aria-orientation=vertical])` rule in glass-ui reaching a `.kf-*` class (it cannot; the class is demo-local and the style block is `scoped`).

### D-m5 · MINOR · disabled arm is opacity-only (≈2.16:1) and unexercised

`:107-110 opacity: 0.5; cursor: not-allowed`. Compositing the inactive text (`--on-glass-muted`, light arm `hsl(30 26% 35%)`) at 0.5 over the plate gives Y ≈ 0.3994 → **2.16:1** against the track. **Honest verdict: not a WCAG failure** — 1.4.3 explicitly exempts inactive/disabled controls. It is a legibility finding: a disabled tab label at 2.16:1 is hard to read as *text*, so the user cannot tell what they are being denied. No consumer sets `disabled` (`stripOptions`, `ChannelControls.vue:313-324`, never emits it), so the arm is unexercised in the tree and its in-situ ratio is unverified.
**Falsifier.** A consumer that does pass `disabled` (none found), or a `forced-colors`/high-contrast arm restoring legibility (D-i2: none).

### D-m6 · MINOR · `ariaLabel` is optional, so the tablist can ship nameless

`:59 ariaLabel?: string` → `:16 :aria-label="ariaLabel"`. A `role=tablist` with no accessible name is an a11y gap; the type system permits it. The sole live consumer does the right thing (`ChannelControls.vue:77 aria-label="Control surface"`, which Vue camelises onto the declared `ariaLabel` prop). Making it required — or defaulting it — costs one character.
**Falsifier.** A convention in this repo that tablist naming is the consumer's contract to keep (defensible; hence MINOR).

### D-m7 · MINOR · the header documents a re-export that `<script setup>` cannot produce

```
39  // The roving-tabindex keyboard core + the canonical option shape live in the
41  // useToolbarKeyboard precedent. KfPillTabOption is re-exported
42  // so `import type { KfPillTabOption } from ".../KfPillTabs.vue"` keeps resolving.
44  import type { KfPillTabOption } from "./KfPillTabs/useKfPillTabs";
```

There is no `export type { KfPillTabOption }` and no second `<script>` block. `<script setup>` bindings are compiled into a `setup()` closure and are **not** module exports; re-exporting from an SFC requires a plain `<script>` sibling. So the documented import path does not resolve. Confirmed behaviourally: the sole consumer reaches the type through the compat shim instead — `ChannelControls.vue:229` imports the component from `../KfPillTabs.vue`, `:230` imports the type from `../composables/useKfPillTabs` (the 4-line re-export the census flags at `lane-frontend.md:537-553`). The shim exists *because* the documented seam does not. Two files' worth of indirection resting on a false comment.
**Falsifier.** A Vue version in which `<script setup>` type imports become module exports (none does), or a build step that injects the export.

### D-m8 · MINOR · computed pill height 26–31px: passes 2.5.8 (AA), fails 2.5.5 (AAA)

Height = inherited line-height + `2 × 0.25rem` (`:93`) = 8px. At the `--type-small` floor (14px, viewport ≤ 480px) with a normal-ish 1.3 leading: ≈ **26px**. At 17.6px (1920px): ≈ **31px**. WCAG 2.5.8 *Target Size (Minimum)* AA needs 24×24 — **passes** in both. WCAG 2.5.5 *Target Size (Enhanced)* AAA needs 44×44 — **fails**. Split verdict stated as such; I am not filing a conformance defect. The design concern is that this is the in-pane strip whose mobile presentation is a sheet, where 26px targets separated by 2px gaps are thin for touch.
**Falsifier.** Any declared `line-height` or `min-height` (there is none — D-m1), or a touch-floor idiom applying to `.kf-pill-tab` (`design-idioms.css` owns "focus/touch floors" per `DESIGN.md:112`, but nothing in it names `.kf-pill-*`).

---

## 4. INFO

### D-i1 · INFO · RTL: physical arrow axis and physical mask direction — latent only

`useKfPillTabs.ts:68-69` hardcodes `ArrowRight` = next / `ArrowLeft` = prev. Under `dir="rtl"` the `inline-flex` row reverses visually while the handler does not, so ArrowRight would move to the visually-*previous* tab — APG requires arrow keys follow the visual axis. The host's fade masks are physical too (`ChannelControls.vue:444-453`, `to right`, `tabs-overflow-left/right`). **Latent, not live**: `grep -rn 'dir="rtl"|direction: rtl|:dir=' demo/` → 0 hits; the demo has no i18n and no direction switch. Filed INFO for that reason.
**Falsifier.** Introduction of any RTL locale or `dir` binding promotes this to MAJOR unchanged.

### D-i2 · INFO · forced-colors: the state indicator reduces to weight alone, and the double border becomes two `CanvasText` rules

No `@media (forced-colors: active)` arm in the SFC or anywhere in `demo/`. glass-ui's fallback (`glass/a11y-fallback.css`) forces `--glass-level: 0`, `--glass-grain-opacity: 0`, and `border: 1px solid CanvasText` on `.glass-wash`. Consequences for this component: (a) both nested washes get a `CanvasText` hairline, so D-B2's doubled border becomes two **high-contrast** rules 2px apart — the most visible form of the defect; (b) forced-colors overrides `background-color`, so the 5%/8% ink chips vanish entirely and the sighted selected-state cue reduces to `font-weight: 500` → `600` (D-M4's text-colour channel is also forced to a single system colour). `aria-selected` keeps AT users informed; sighted forced-colors users lose the indicator.
**Falsifier.** A live forced-colors render showing the UA preserving a distinguishable active background (some UAs honour `forced-color-adjust` heuristics for `:focus`/selected), or a demo `forced-colors` arm I did not find. **UNPROVEN-NEEDS-LIVE.**

### D-i3 · INFO · empty `options: []` paints a nameless ~6px glass artifact — latent

No `v-if`/empty guard on `:13-18`. With `options: []` the `v-for` yields nothing and the root still renders: `glass-wash` plate + 1px border + `padding: 0.125rem` ≈ a 6×6px glass chip, plus an empty `role="tablist"` in the AT tree carrying the consumer's `aria-label`. `rovingValue` correctly returns `undefined` (`useKfPillTabs.ts:46-50`) and `onKeydown` early-returns (`:66`), so the keyboard core is safe. **Unreachable from the sole consumer**: `stripOptions` = `[...builtInTabs, ...extra]` (`ChannelControls.vue:313-324`); the strip only renders when `tabsExternallyManaged` is false, and in that branch `builtInTabs` is unfiltered (`:299-303`) so it always holds the full triad. Filed INFO as a *primitive contract* gap — the test header calls KfPillTabs "promoted to a standard panel primitive at S.D2", and a primitive should guard its empty state.
**Falsifier.** A future consumer passing `[]`, or a guard I overlooked (there is none in `:13-35`).

### D-i4 · INFO · the design-system record around this component has rotted in three places

- `demo/styles/font-roles.json:29-32` registers `.kf-pill-tab` as role `pill-tab`, note: *"the component itself is a T.H gated-on-publish excision; the register holds until then."* The manifest is auditing a selector that D-B1 shows can never appear in the DOM. No runner consumes it (`grep -rn "font-roles.json"` → only prose in `DESIGN.md:28` and U-tranche ledgers; `U.B.md:139` planned a move to `scripts/` that did not land).
- `demo/DESIGN.md:116-118` still names `tab-trigger-base/pill/underline` "**the** tab grammar" though no template applies them.
- `demo/components/instrument/surfaceTabs.ts:12-24` is a byte-level duplicate of `SURFACE_META` + `extraTabsFrom` from `state/controlSurfaces.ts:145-159, 200-206` — and it is the **live** copy (`ChromeDock.vue:21`, `TransportDock.vue:237` import from it; `ChannelControls.vue:245-250` imports the other). `controlSurfaces.ts:141-144` calls itself "THE ONE SURFACE-METADATA REGISTRY … (proof:dfa-derived's 'resolves from exactly ONE module' clause)". Two modules resolve it. This is the label source for KfPillTabs, so it is in this component's blast radius, but the defect is not KfPillTabs' — filed for the D-lane record.
**Falsifier.** A runner that reads `font-roles.json` and skips absent selectors by design; or a re-export relationship between `surfaceTabs.ts` and `controlSurfaces.ts` (there is none — `surfaceTabs.ts` re-declares the literal).

### D-i5 · INFO · the async registration is dead

`transport/index.ts:12` registers `KfPillTabs = defineAsyncComponent(() => import("./KfPillTabs.vue"))`, and the barrel header explains the laziness at length. The live consumer imports it **eagerly** (`ChannelControls.vue:229 import KfPillTabs from "../KfPillTabs.vue"`), so the async wrapper — and any loading/Suspense treatment it would have enabled — is unused. No loading state exists for the strip.
**Falsifier.** A consumer importing `KfPillTabs` from the barrel (`grep -rn "from \".*transport\"" demo/` shows the barrel's `KfPillTabs` export unconsumed).

---

## 5. SUPERLATIVES — L-18 in the other direction

Each of these is a claim, and each carries the observation that would kill it.

### D-S1 · the inner track↔pill radius arithmetic is exactly concentric

`:94` pill `border-radius: var(--radius-lg)` = `var(--radius)` = `0.625rem` = **10px**. `:85` track `padding: 0.125rem` = **2px**. Correct concentric outer radius = 10 + 2 = **12px**. `:84` uses `var(--radius-panel, var(--radius-lg))`, and `radius.css` gives `--radius-panel: var(--radius-xl)` = **12px**. Exact. Nested-radius arithmetic is the single most commonly botched detail in chip/track components and this one is right to the pixel — and it is right *by token composition*, not by a magic number. (Ironically the fallback branch, `--radius-lg` = 10px, would be wrong; the defined token rescues it.)
**Falsifier.** A change to `--radius`/`--radius-xl` decoupling the two (they are independently declared in `radius.css`, so this correctness is a coincidence of current values rather than an enforced relation — worth pinning). Or `--radius-panel` being undefined at the mount site, taking the 10px fallback.

### D-S2 · the focus ring clears WCAG 1.4.11 in both theme arms, and so does its fallback

`:121 outline: 2px solid var(--color-progress, currentColor)`. `--color-progress: var(--accent-kf)` (`style.css:163`) = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`. Against the plate: light Y≈0.128 vs 0.9222 → **≈5.45:1**; dark Y≈0.372 vs 0.0253 → **≈5.60:1**. Both clear the 3:1 focus-indicator floor with ~1.8× headroom. And the `currentColor` fallback is safe too: on an inactive tab that resolves to `--on-glass-muted` at **6.06:1** (D-S5). 2px thickness with a 1px offset also satisfies 2.4.11/2.4.13 area heuristics. A focus ring that passes in both arms *and* degrades safely is not the norm.
**Falsifier.** A live contrast probe of the rendered outline against the *actual* composited plate (my oklch→luminance conversion is an approximation; a substrate far from `--card` could move it). Ratios below 3:1 in either arm kill the claim. Note the ring is `outline` on a radiused box, so UA corner rendering also matters. **Ratios token-derived; UNPROVEN-NEEDS-LIVE for the composited substrate.**

### D-S3 · the transition list is genuinely enumerated, not `transition: all`

`:101-105` names three properties with a comment recording *why* (`J.W7b STY-6`: `all` "silently animated EVERY future property change (layout included)"). Most demo components in this tree would have shipped `transition: all 0.2s`. The discipline is real and the rationale is captured at the point of use. It is undercut by D-M2 — one of the three named properties *is* a layout channel — but "enumerated with a wrong entry" is a strictly better position than "unenumerated", because the wrong entry is now visible and one-line removable.
**Falsifier.** A demonstration that `background` as a *shorthand* in `transition-property` behaves as broadly as `all` in some engine (it expands to its longhands per spec, so I expect not).

### D-S4 · `rovingValue`'s fallback guarantees the strip is never Tab-unreachable

`useKfPillTabs.ts:46-50`:
```
const sel = en.find((o) => o.value === params.modelValue());
return (sel ?? en[0])?.value;
```
Filtered to enabled options first (`:38`), then `?? en[0]`, then optional-chained. This is correct across four edges that routinely break roving-tabindex strips: empty `modelValue`, a `modelValue` matching nothing, a `modelValue` matching a *disabled* option, and all-options-disabled (returns `undefined`, and `:25` then renders every `tabindex="-1"` — the honest outcome, since there is nothing to focus). The test pins the important one (`"empty/unmatched modelValue still leaves a tab stop"`). The shipped glass-ui contract documents "EXACTLY ONE tab remains in the focus order" but its `.d.ts` does not show the unmatched-model guarantee, so this is a case where the fork's core is *at least as* careful as the platform's on a real edge.
**Falsifier.** A `modelValue` whose match is enabled but *unrendered* (impossible here — `options` is the render source), or a glass-ui implementation read showing the same guard (would demote this from superlative to parity, not to defect).

### D-S5 · inactive-tab text contrast is 6.06:1 — the on-glass muted token is doing real work

`:100 color: var(--muted-foreground)`, and because the root carries `.glass-wash`, `ladder.css`'s `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` block re-points `--muted-foreground: var(--on-glass-muted)` = light `hsl(30 26% 35%)`. Against the plate: Y 0.1106 vs 0.9222 → **6.06:1**, comfortably over the 4.5:1 AA floor for a *muted* label — the register most likely to fail. Active text is **16.19:1**. The component gets this for free by standing on the wash rung rather than hardcoding a grey, which is the glass-ui consume edge working as designed.
**Falsifier.** A live read showing `--muted-foreground` resolving to the non-glass `--neutral-5` (would mean the `:where()` block lost the cascade), or a composited plate far enough from `--card` to drop the ratio under 4.5:1. Note the same token is what makes the D-m5 disabled arm 2.16:1 — the token is good, the 0.5 opacity on top of it is not.

---

## 6. Verdict on the design axis

**Assume defective until the tree proves otherwise** — the tree does not.

The component is well-made in its small mechanics (D-S1…D-S5: correct concentric radii, a passing focus ring in both arms, a disciplined transition list, a genuinely careful roving-focus edge, a token-sourced muted register). Those are real and I do not want them lost in the excision.

But the design case against it is structural, not cosmetic, and it stacks in one direction:

1. it **does not render** (D-B1) — the owner ruling it invokes as its charter ("pills *if tabs at all*") resolved to *not at all*, and the shipped switcher is a `<Select>`;
2. where it *would* render, it **breaks the glass idiom it opted into** (D-B2: 21% designed translucency → 4.4% delivered, plus doubled border/rim/shadow/blur);
3. its central ARIA claim is **false as stated** (D-M1: no tab↔panel relation, in a component whose entire reason for existing is ARIA correctness);
4. it **overflows its container at every desktop width** with no pointer-reachable scroll (D-M5), because fluid type was put inside a capped rail;
5. its **selected-state chip is not an indicator** (D-M4: 1.17:1, and 1.06:1 from hover);
6. its "narrow" transition **animates layout** and does so **under `prefers-reduced-motion`** (D-M2, D-M3);
7. it is the **second local pill vocabulary**, which `DESIGN.md:118-120` forbids by name, already drifted on three properties (D-M7);
8. and it **dropped a capability the platform ships** (D-M6: manual activation) in front of a Monaco panel the host spends 40 lines protecting.

Folding the census: S-1 rated the fork *stale* and recommended **replace**. On the design axis the recommendation is **delete**. Replacing it onto `SegmentedTabs` + `useTabRovingFocus` would ship a strip that no code path renders; the correct motion is to remove `KfPillTabs.vue`, `KfPillTabs/useKfPillTabs.ts`, `transport/composables/useKfPillTabs.ts`, the barrel entry (`index.ts:12`), the `ChannelControls.vue:56-83` dead header branch, the now-dead `useTabStripScroll` + its mask rules (`:441-455`), the `font-roles.json:28-33` role, and the `DESIGN.md:116` grammar row — then, separately, decide whether the `<Select>` in `ChromeDock` is the switcher the design wants, which is a *fresh* design question, not a port of this one. Sequencing caveat from the corpus: **F-1 first** — nothing here is reproducible while `@mkbabb/glass-ui` is unpinned.

**What would most change this verdict** — one observation: a live page (SS-13) showing a `[role=tablist].kf-pill-tabs` node painted anywhere in the shipped demo. That single finding would demote D-B1, restore D-B2/D-M4/D-M5 to shipping defects rather than latent ones, and turn "delete" back into "replace".
