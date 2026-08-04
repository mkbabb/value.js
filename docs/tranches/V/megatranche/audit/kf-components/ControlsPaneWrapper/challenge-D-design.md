claude-opus-5[1m]

# CHALLENGE · `ControlsPaneWrapper` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` (319L)
**Colocated style** `.../controls-pane/ControlsPaneWrapper.css` (148L)
**Read whole (read-only)**: `RibbonBar.vue` (151L) · `ChannelControls.vue` (456L) · `ControlsPaneWrapper/{useControlsLayout,usePaneHover,usePaneRegister}.ts` · `composables/useScrollFade.ts` · `transportSource.ts` · `injectionKeys.ts` · `channel-controls/composables/useSelectedControlSurface.ts` · `AnimationControlsGroup.{vue,css}` (the parent grid) · `TransportDock.vue` · `styles/{layout,design-idioms,style}.css` · installed `node_modules/@mkbabb/glass-ui@7.0.0` `dist/drawer.js`, `dist/components/drawer/{styles.css,*.d.ts}`, `dist/styles/{tokens/*,utilities/btn.css}`, `dist/components/{card,surface,_shared}/*.d.ts` · `node_modules/reka-ui/dist/Dialog/*` · `node_modules/tailwindcss@4.3.0/index.css`.

**Method** static + source-derived only (no browser, per Law). Every claim carries severity, `file:line`, and its own falsifier. Livable-only consequences are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.

**Provenance** This document is the merge of **two independent D-axis passes** over the same tree. Pass 1 produced D-B1..D-B3, D-M1..D-M9, D-m1..D-m9, D-i0..D-i3, S-1..S-5. Pass 2 (this write) folded in **D-B4, D-M10, D-m10, D-m11** — findings pass 1 did not reach — and filed **two corrections against pass 1's own record**: `D-C1` (D-B2's mechanism is misstated; its verdict survives) and `D-C2` (S-3 rests on a premise the tree falsifies). Pass 1's text is preserved verbatim; nothing was deleted. L-18 runs both ways, and it runs against this document too.

**Tally** — 4 BLOCKER · 10 MAJOR · 11 MINOR · 3 INFO (**28 defects**) · 5 SUPERLATIVE (one now qualified, `D-C2`) · 1 recorded NON-defect **overturned** (`D-i0` → `D-m11`) · 2 self-corrections.

**Verdict** The component is a *good* adoption with a *stale* contract. The 2026-07-06 owner-overridden `<Drawer>` swap deleted ~250L of bespoke sheet and bought real a11y for free (S-1). What it did not do is re-derive the design contract against what it adopted: the file's own headline defect (BG-11, the bottom-menubar occlusion) is discharged by a token the installed glass-ui **already publishes**, three prose sites carry a detent number the code does not ship, two class hooks paint nothing, one composable latch can never fire, and the desktop rest-dim ships text at ≈2.2:1.

Pass 2 sharpens that verdict along one axis pass 1 left open. Three of this file's defects — D-M2, D-M10, D-M4 — are the *same* defect wearing three costumes: **a documented contract that the cascade silently discards** (by layer, by specificity, by having no selector at all). The file's prose is not merely stale about its dependency; it is stale about *itself*. And the one surface pass 1 did not audit — `RibbonBar`'s active state — carries the worst measured contrast in the component (**1.22 : 1**, D-B4), on the button that reports whether the user's CSS is live.

---

## Hitherto corpus — fold, not re-invent

| id | lane | how this challenge relates |
|---|---|---|
| **F-1** | `lane-frontend.md:15,54` — glass-ui is a phantom dep; **7.0.0 installed**, undeclared | **FOLDED and load-bearing.** D-B1 and D-m4 both turn on 7.0.0 being what is actually resolved. F-1 is the reason nobody re-read the dist after the version moved. |
| **S-2** | `lane-frontend.md:308` — stale `<SegmentedTabs>` prose in `ChannelControls.vue` | **EXTENDED.** D-m4 is S-2's sibling one directory over: `ControlsPaneWrapper.vue` cites glass-ui **4.0.1** and three dead `drawer.js`/`drawer.css` line numbers. Same disease, different file — file it under the same reconcile. |
| **§6.3** | `lane-frontend.md:437` — "No `--kf-*` namespace exists … demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own" | **INSTANTIATED TWICE.** D-m3 gives the lane its first concrete casualty (`--controls-idle-opacity`, a global token with one consumer that shadows its own value). **D-m10 gives it a second and sharper one**: the demo partially overrides glass-ui's `--rainbow-*` set — six of seven stops in `hsl`, leaving `--rainbow-indigo` at glass-ui's `oklch` — inside a gradient the demo does not own. |
| **§6.5** | `lane-frontend.md:462` — lists `ControlsPaneWrapper.css:144` among the 10 PRM blocks | **CONTRADICTED IN SCOPE.** The census counts the block as present; D-M7 shows it guards only *one* of the file's *three* opacity transitions. Presence ≠ coverage. |
| **S-1 (shadow census)** | `lane-frontend.md:264` — `KfPillTabs` → `SegmentedTabs`, "RED, stale rationale" | **PATTERN-MATCHED.** This component is the same failure at the *contract* tier rather than the component tier: a rationale written against an older glass-ui and never re-derived. D-B1 is what that costs when the stale rationale is load-bearing. |
| **S-8** | `lane-frontend.md:387` — JUSTIFIED BESPOKE | no overlap. |

Nothing in `lane-library.md` (parse seams) bears on this component; it imports only types from `@mkbabb/keyframes.js` (`ControlsPaneWrapper.vue:161-163`).

---

## BLOCKERS

### D-B1 · The BG-11 occlusion gap is self-declared "structural" and "forwarded" — the lever ships in the installed dependency **BLOCKER**

`ControlsPaneWrapper.vue:21-26` states the contract failure and forwards it out of the repo:

> "…the Drawer is pinned to `bottom:0` with **no bottom-inset lever**, so the sheet rides OVER the bottom menubar at any detent. That is the BG-11 structural gap — FORWARDED to the glass-ui tranche and tracked as a BG-11-BLOCKED born-RED backlog row (**dischargedBy the `--drawer-inset-block-end` publish** + re-pin)."

Reinforced at `:174-175`: *"The published Drawer still lacks a bottom-inset lever; the live-behind consumer keeps its measured detents until Glass exposes that component seam."*

**The installed dist already exposes it, by that exact name.** `node_modules/@mkbabb/glass-ui@7.0.0/dist/components/drawer/styles.css`:

```css
:root { --drawer-inset-block-end: 0px; … }
.glass-drawer[data-glass-drawer-snap-points="true"][data-glass-drawer-direction="bottom"] {
  bottom:     var(--drawer-inset-block-end);
  height:     calc(100% - var(--drawer-inset-block-end));
  max-height: calc(100% - var(--drawer-inset-block-end));
}
```

The stated `dischargedBy` condition is **met**. The consumer is one declaration from the cure, on an element it already owns: `:class="['controls-drawer-content', …]"` (`ControlsPaneWrapper.vue:127-130`) lands on `.glass-drawer` itself (glass-ui composes `class: cn("glass-drawer glass-overlay", props.class)` — `drawer.js`), so a self-declaration inside the file's own scoped `@media (max-width:1023px)` block resolves for that element's `bottom`/`height`:

```css
.controls-drawer-content { --drawer-inset-block-end: var(--dock-menubar-reserve); }
```

`--dock-menubar-reserve` (`demo/styles/layout.css:103`) is the token authored **for precisely this job** — its own comment at `layout.css:100-102` reads *"Consumed by the mobile sheet anchor + open-pane max-height."* It is no longer consumed by any sheet: `grep -rn -- "--dock-menubar-reserve" demo/` returns only `AnimationControlsGroup.css:183` (`.timeline-expanded-cell`) and `CubeScene.vue:275`. `TransportDock.vue:260` still asserts *"The mobile bottom sheet anchors at `bottom: var(--dock-menubar-reserve)`"* — a third stale cross-file claim of a contract nothing upholds.

**A fourth stale claim, from pass 2.** `layout.css:72-77`, the token's own definition comment, states the reserve takes the max of the token floor and TransportDock's ResizeObserver-measured menubar height *"**so the mobile sheet always clears the menubar the user actually sees**."* And `AnimationControlsGroup.css` (mobile `.stage-cell` block) states it as satisfied: *"the sheet anchor (ControlsPaneWrapper) keeps the live token so it still clears the menubar the user sees (proof:live-session-mobile)."* Four files across the suite assert this contract holds. `ControlsPaneWrapper.css` contains **no dock token at any line**.

**Why BLOCKER and not MAJOR.** The occlusion eats the *re-open affordance*, not just chrome. At `PEEK_SNAP = 0.12` (`:269`) the sheet's visible band is `0.12·dvh`; the grab handle is a fixed `min-block-size: var(--touch-target, 2.75rem)` = **44px** (glass-ui `styles.css`). The menubar band is `--dock-menubar-reserve = --dock-bottom-anchor + --dock-band-reserve` (`layout.css:103`), where `--dock-band-reserve ≥ --dock-icon-height (2.75rem) + --dock-margin + safe-area` (`layout.css:78-84`) — i.e. **≥ 44px before any anchor term**. On a 667px-tall viewport the peek band is 80px against a ≥ 44px+anchor menubar band that the dock paints *over* (glass-ui puts `live-behind` at `z-index: calc(var(--z-dock) - 1)` = 39 vs the dock's 40 — `styles.css`, `demo/styles/style.css:32`). The handle and the dock occupy the same strip.

**What sits in the occluded band at the expanded detents (pass 2).** `RibbonBar` — the *persistent* controls ribbon — is the last child of `.controls-content` (`:96-113`), `flex-shrink-0` (`RibbonBar.vue:2`), inside an `h-full flex flex-col` box. It pins to the box bottom whether or not the body overflows, i.e. to the sheet's bottom edge, i.e. **inside the ≥44px band the dock paints over**. Its rendered height is `p-3`×2 + `h-8` + `pb-2` ≈ 64px, so at the floor ≥69% of the strip is behind the dock and with the anchor term all of it. Copy / Format / Export CSS / Apply CSS cannot be scrolled into view, because they already sit at the end of the scroll extent — and the end of the extent *is* the occluded edge. This is the concrete cost, and it makes D-B4 (the ribbon's contrast) partly moot on mobile: the button that fails contrast is also the button behind the dock.

- **Falsifier (kills the "lever missing" claim → confirms the defect):** `grep -c -- "--drawer-inset-block-end" node_modules/@mkbabb/glass-ui/dist/components/drawer/styles.css` returns 0, **or** the installed `@mkbabb/glass-ui` is not 7.0.0. Both checked: token present in `:root` + consumed on the bottom-direction snap-point selector; `package.json` version = `7.0.0`.
- **Falsifier (kills the defect):** show `--drawer-inset-block-end` set to a non-zero value somewhere in the demo cascade. `grep -rn -- "--drawer-inset-block-end" demo/` → **exactly one hit, the comment at `:26` asserting it does not exist**. It resolves to the `:root` default `0px`.
- **Falsifier (kills the ribbon claim):** measure `.glass-drawer`'s bottom edge against `[data-dock-tether="bottom"]`'s top edge below 1024px; if the ribbon clears the dock the pass-2 extension dies (the ≥44px floor, the z-order, and the absent join remain decidable). `UNPROVEN-NEEDS-LIVE` for the exact overlap in px, and for whether the dock band is pointer-transparent outside the centred pill (which would leave the handle partially tappable at the edges). The *visual* overlap is decided by the geometry above; the *hit test* is not.

### D-B2 · The "closed" desktop rail is opacity-hidden, not inert — and `:focus-within` then lights it up inside a zero-width clip **BLOCKER**

> **Corrected by `D-C1` (pass 2): the verdict stands, the stated mechanism does not.** Read D-C1 before acting on this entry — the fix shape is unchanged, but the "raises it to full opacity" reasoning is wrong and would mislead a repair lane that trusted it.

The desktop close axis is the `[rail]` grid-track collapse (`ControlsPaneWrapper.css:75-80`; `AnimationControlsGroup.css:51,66-71` collapse `--rail-track` to `0px`). The pane itself is hidden by **opacity alone**:

```css
.controls-pane-wrapper.controls-pane--closed { pointer-events: none; }   /* :97-99  */
.controls-pane--closed .controls-pane { opacity: 0; … }                  /* :104-107 */
```

There is no `visibility: hidden`, no `inert`, no `display:none` — `v-show="showSheet"` (`:144`) covers a *different* predicate (`!!selectedAnimation && !hideControls`, `:231-233`), not the open/closed axis. `opacity: 0` and `pointer-events: none` remove neither the accessibility tree nor the tab order. Every `Button`, `KfPillTabs` trigger, Monaco surface and slider inside the collapsed rail stays sequentially focusable.

Then `:117-120` compounds it:

```css
.controls-pane-wrapper:hover,
.controls-pane-wrapper:focus-within { opacity: 1; }
```

Tabbing in raises the *closed* pane to full opacity **inside** a wrapper whose `overflow: hidden` (`:89`) is clipping fixed-width content (`.controls-content { width: var(--rail-width) }`, `:127`) against a track that is `0px` wide. The keyboard user's focus lands in a zero-width, fully-opaque, load-bearing-clipped void with no visible focus indicator and no escape cue.

The file *knows* the right primitive — `ChannelControls.vue:117-137` uses `:inert` for exactly this reason, and says so at `:123-127`: *"`inert` (not bare `aria-hidden`, which leaves focusable Monaco descendants in the tab order — the aria-hidden-focus a11y defect)."* The lesson was learned one directory over and not applied here.

Violates WCAG 2.4.3 (Focus Order), 2.4.7 (Focus Visible), 1.3.2 (Meaningful Sequence).

- **Falsifier:** any ancestor of `.controls-pane-wrapper` applies `visibility:hidden`, `display:none`, `content-visibility:hidden` or `inert` when `isControlsPanelOpen` is false. Checked: the wrapper's only ancestors are `.controls-layout` (`AnimationControlsGroup.vue:4-10`, no such rule — `controls-layout--closed` sets only `--rail-track: 0px`, `AnimationControlsGroup.css:66-68`) and the shell. Nothing hides it structurally.
- **Falsifier:** `overflow:hidden` on a zero-width box removes descendants from the tab order. It does not — clipping is paint-only.
- **Fix shape (one line):** `:inert="!storedControls.isControlsPanelOpen"` on the desktop branch (`:142-155`), which also makes `pointer-events:none` and the `:focus-within` lift redundant/consistent.

### D-B3 · The idle rest-dim ships body text at ≈ 2.2 : 1 — and the file asserts the opposite **BLOCKER**

> **Escalated by `D-M10` (pass 2):** the one documented escape from this state — the `:focus-within` instant lift — is defeated by specificity, so a keyboard user cannot leave it. Aggravator 2 below ("a user *operating* the pane never sees the dim") is true for the pointer and **false for the keyboard**.

After 10 s of *global* window inactivity (`usePaneHover.ts:7` `IDLE_MS = 10_000`) the open desktop pane dims:

```css
.controls-pane-wrapper.controls-pane--idle:not(.controls-pane--hovered) {
  opacity: var(--controls-idle-opacity, 0.35);   /* ControlsPaneWrapper.css:114-116 */
}
```

`ControlsPaneWrapper.css:140-142` justifies keeping it under PRM: *"the desktop idle dim still APPLIES (an opacity rest state, **legibility-preserving**)."* That claim is false and the arithmetic is decidable from tokens.

Group opacity composites the whole rendered subtree over its backdrop in gamma-encoded sRGB. Light theme tokens (`glass-ui.css`): `--foreground: hsl(24 10% 10%)` → sRGB ≈ `(28, 25, 23)`; `--card: hsl(30 85% 96%)` → ≈ `(253, 245, 236)`. Backdrop behind the naked rail is the same warm near-white family.

- composited text = `0.35·(28,25,23) + 0.65·(253,245,236)` = `(174.3, 168.0, 161.5)` → relative luminance **0.3963**
- composited card ≈ `(253.2, 244.9, 236.2)` → relative luminance **0.9223**
- contrast = `(0.9223 + 0.05) / (0.3963 + 0.05)` = **2.18 : 1**

WCAG 1.4.3 AA requires 4.5 : 1 (normal) / 3 : 1 (large). This fails **both**. Solving for the threshold: AA holds only at `α ≳ 0.60`. The shipped `0.35` (`demo/styles/layout.css:41`) is 42 % under the floor. `--muted-foreground` labels — which the pane uses throughout `ChannelControls`/`ChannelOptions` — are worse.

Aggravators, all decidable:
1. **No opt-out.** No setting, no `prefers-contrast: more` guard, no `prefers-reduced-transparency` guard anywhere in the file.
2. **Reading is the failure case.** `useIdle` (`usePaneHover.ts:52`) resets on mousemove/mousedown/keydown/touchstart/wheel/resize/visibilitychange. A user *operating* the pane never sees the dim; a user *reading* a slider value, a keyframe string, or a numeric readout for 10 s does. That is the pane's primary job. *(Pass 2: and a keyboard user holding focus in the pane is in this state with no lift — D-M10.)*
3. **PRM does not exempt contrast.** The file's PRM block (`:144-148`) deliberately preserves the dim on the "legibility-preserving" rationale — so the guard that exists actively protects the defect.
4. **Forced-colors does not neutralise it** (see D-m9).

- **Falsifier:** the rail's backdrop is substantially darker than the card, which would *raise* composited text luminance relative to a darkened card and could recover ratio. Checked: the desktop rail is a **naked column** by design (`ControlsPaneWrapper.css:23-27` — "no border, no background, no radius"), so the composite is card-over-page-background, both in the light warm family. Dark theme (`--foreground: hsl(30 14% 90%)` ≈ 233, `--card: hsl(26 22% 17%)` ≈ 53) composited at 0.35 over a dark backdrop gives text ≈ `0.35·233 + 0.65·53` = 116 and card ≈ 53 → **≈ 3.6 : 1**. Better, still under 4.5 : 1. The defect holds in both themes; light is the severe case.
- **Falsifier:** browsers composite group opacity in linear-light space (which would change the numbers). They do not — CSS `opacity` composites in the element's compositing space, sRGB by default.
- **Falsifier (kills BLOCKER → MAJOR):** a reviewer rules a 10 s-transient state exempt from 1.4.3. WCAG grants no such exemption, and there is no mechanism to disable or extend it (2.2.1-adjacent).

### D-B4 · White label on a full-chroma rainbow: the Apply-CSS **active** state fails contrast at every stop it paints — worst 1.22 : 1 **BLOCKER** *(pass 2 — new)*

Pass 1 did not audit `RibbonBar`'s state styling. It carries the component's worst measured contrast.

`RibbonBar.vue:44-64` — the Apply CSS button's *applied* state:

```vue
:class="[ RIBBON_BUTTON_CLASS,
  activeKeyframesRef?.cssApplied ? 'rainbow-vivid text-white ribbon-apply--active' : '' ]"
```

`rainbow-vivid` is a glass-ui `@utility` that sets the element's **background** to a seven-stop gradient — `node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css`:

```css
@utility rainbow-vivid { background: linear-gradient(to right,
  var(--rainbow-red), var(--rainbow-orange), var(--rainbow-yellow),
  var(--rainbow-green), var(--rainbow-blue), var(--rainbow-indigo), var(--rainbow-violet)); }
```

Six of those stops are overridden by the demo in `styles/design-idioms.css:15-21`, after the glass cascade (`style.css:1-16`), so the demo's crayon `hsl` values are what paints. Relative luminance from those triples, and the contrast of `#fff` over each:

| stop | value | Y | contrast vs `#fff` | ≥4.5:1 | ≥3:1 |
|---|---|---|---|---|---|
| yellow `design-idioms.css:17` | `hsl(55 90% 55%)` | 0.8136 | **1.22 : 1** | ✗ | ✗ |
| green `:18` | `hsl(130 70% 50%)` | 0.5033 | **1.90 : 1** | ✗ | ✗ |
| orange `:16` | `hsl(30 90% 55%)` | 0.3811 | **2.44 : 1** | ✗ | ✗ |
| violet `:20` | `hsl(300 75% 60%)` | 0.2767 | **3.21 : 1** | ✗ | ✓ |
| blue `:19` | `hsl(210 80% 55%)` | 0.2530 | **3.47 : 1** | ✗ | ✓ |
| red `:15` | `hsl(0 85% 60%)` | 0.2280 | **3.78 : 1** | ✗ | ✓ |
| indigo — **not overridden** | `oklch(0.566 0.206 294.1)` (glass) | ≈0.18 | ≈4.55 : 1 | ≈✓ | ✓ |

The label is body-scale (`RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body …"`, `RibbonBar.vue:135`), so 4.5 : 1 governs. **Every stop the utility actually paints fails 4.5 : 1; three of seven fail even 3 : 1**, bottoming at 1.22 : 1 where the label crosses yellow — roughly *half* the width of a `to right` gradient on a pill-width button.

This is not decoration. It is the **active** state of "Apply CSS": the affordance that reports whether the user's compiled CSS is live on the subject. The state most in need of reading is the least readable, and the failure is silent — the label does not disappear, it greys into the yellow band.

The adjacent sibling shows the correctly-shaped instinct: the *inactive* Apply icon paints the rainbow into the **stroke** via `url(#rainbow-gradient)` (`RibbonBar.vue:56-61`) — rainbow as ink on a legible plate. The active state inverts that into rainbow as ground under white ink.

- **Falsifier:** `rainbow-vivid` composites a scrim, reduces chroma, or is overpainted at the callsite. `.ribbon-apply--active` (`RibbonBar.vue:148-150`) sets **only** `border-color: transparent`; the glass `@utility` sets `background` outright with no overlay; glass-ui's `Button` background is what the utility overrides.
- **Falsifier:** the label renders large-scale (≥18.66px bold / 24px), making 3 : 1 the threshold — then three stops still fail. `text-body` is body scale.
- **Falsifier:** the demo overrides `--rainbow-yellow` to something darker downstream of `design-idioms.css`. `grep -rn -- "--rainbow-yellow" demo/` → one definition, `:17`.
- `UNPROVEN-NEEDS-LIVE`: the exact painted pixels and where each stop lands under the glyphs. The per-stop luminances are decidable from the tokens; the ordering is not close.
- **Fix shape:** keep the rainbow as the *border* or a bottom rule and restore a legible plate under the label, or drop `text-white` for a token that survives the light stops. The active state needs a signal, not a texture.

---

## MAJOR

### D-M1 · `isPanelTransitionDone` can never latch true — there is no `max-height` transition to end **MAJOR**

`useControlsLayout.ts:31-38` latches on `e.propertyName === "max-height"`, wired at `ControlsPaneWrapper.vue:145` (`@transitionend="onPanelTransitionEnd"`). But the file's own desktop rule kills the property:

```css
.controls-pane-wrapper { max-height: none; … }   /* ControlsPaneWrapper.css:82-90 */
```

and the desktop open/close axis is explicitly the **track collapse**, not a height animation (`:75-80`, `:93-95` — *"the F9 idle-fade OPACITY transition is the only transition that remains"*). Exhaustive search of the subtree: the **only** `transition-[max-height,…]` in the transport tree is `AnimationControlsGroup.vue:83`, on `#timeline-expanded-target` — a **sibling** of `ControlsPaneWrapper` in `.controls-layout` (`AnimationControlsGroup.vue:19,78-86`), not a descendant. `transitionend` bubbles *up*; a sibling's event never reaches this handler.

Trace the consequence through `useControlsLayout.ts:22-29`:

- `isPanelTransitionDone = ref(storedControls.isControlsPanelOpen)` — true only if the pane happens to mount open.
- `watch(isControlsPanelOpen, open => { if (!open) isPanelTransitionDone.value = false })` — one close sets it false.
- Nothing can ever set it true again.

So after the **first** close→open cycle on desktop:

- `paneScrollable` (`ControlsPaneWrapper.vue:299-303`) is permanently `false` → `.controls-pane` carries `overflow-hidden` (`:36`) forever. Overflowing rail content becomes unreachable — no scrollbar, no wheel, no keyboard scroll on the pane box.
- `useScrollFade`'s `retrigger: isPanelTransitionDone` (`useControlsLayout.ts:80`) never fires again, so the fade classes stop being re-derived on open.

The composable's own docblock (`useControlsLayout.ts:9,21,46`) describes "the max-height transition tracking" / "the `max-height` transitionend latch" as a live mechanism three times. It is vestigial from the pre-`T.B4` design where the pane animated its own height.

- **Falsifier:** any descendant of `.controls-pane-wrapper` transitions `max-height`. `grep -rn "max-height" demo/components/instrument/transport/` → the only descendant hit is `ChannelOptions.vue:590` (`max-height: min(50dvh, 480px)`, a static cap, no transition). Kills the claim if a transition is found.
- **Falsifier:** an inner scroller absorbs the overflow so the pane box never needs to scroll. `ChannelControls.vue:85` does carry `flex-1 min-h-0 overflow-y-auto` — but its host wrapper (`ControlsPaneWrapper.vue:49`) is a bare `<div v-show>` with **no** `flex-1 min-h-0`, so whether the inner scroller receives a bounded height is layout-dependent. **`UNPROVEN-NEEDS-LIVE`** for the user-visible severity; the latch defect itself is static and certain.
- **Pass-2 note:** this defect is *desktop-only*. On mobile the same `paneScrollable` branch is dead for an unrelated reason (D-M2). Both halves of one computed are inert, by two different mechanisms, in two different layouts. Neither is detectable from the template.

### D-M2 · The mobile half of `paneScrollable` is dead code — the scoped rule outranks the utility unconditionally **MAJOR**

`ControlsPaneWrapper.vue:36` binds `paneScrollable ? 'overflow-y-auto' : 'overflow-hidden'` on `.controls-pane`, and `:299-303` computes the mobile branch as `props.storedControls.isControlsPanelOpen` — i.e. "the body scrolls only when expanded", stated as intent at `:295-298`.

The file's own stylesheet overrides it in every state:

```css
@media (max-width: 1023px) {
  .controls-drawer-content .controls-pane { min-height:0; flex:1 1 auto; overflow-y: auto; touch-action: pan-y; }  /* :41-46 */
}
```

Two independent reasons the scoped rule always wins:
1. **Layer.** Tailwind v4 (`4.3.0`, verified) emits utilities inside `@layer utilities`; Vue SFC scoped styles are **unlayered**. Unlayered author declarations beat layered ones *regardless of specificity*.
2. **Specificity**, even ignoring layers: `.controls-drawer-content[data-v-x] .controls-pane[data-v-x]` (0,4,0) vs `.overflow-hidden` (0,1,0).

So on mobile the peek body is always scrollable, the `paneScrollable` mobile branch is unreachable, and the design intent recorded at `:295-296` is not shipped.

- **Falsifier:** the demo imports Tailwind unlayered, or `.controls-drawer-content` is not applied to the same element as `.controls-pane`'s ancestor. Checked: `demo/styles/style.css:1` `@import "tailwindcss"` (v4 layered index, `@layer theme, base, components, utilities;` at line 1 of the package index) and `ControlsPaneWrapper.vue:127-130` puts `controls-drawer-content` on `DrawerContent` whose root is `.glass-drawer` (the portal host that contains `.controls-pane` via `<ReusePaneBody />` at `:135`).
- **Falsifier:** Vue scoped styles emit into `@layer`. They do not.

### D-M3 · The occlusion contract's headline number is wrong in 3 of 4 prose sites — and the wrong one would violate the floor the file cites **MAJOR**

| site | text | value |
|---|---|---|
| `ControlsPaneWrapper.vue:19-20` | "subject scenes cap at **0.48** (sheet.top ≈ 52dvh, stage readable)" | 0.48 |
| `ControlsPaneWrapper.vue:267` | "(subject **0.48** → sheet.top ≈ 52dvh; editor/storyboard 0.62 → 26dvh strip)" | 0.48 |
| `ControlsPaneWrapper.css:19-20` | "subject **0.48** ≈ 52dvh reserve" | 0.48 |
| `ControlsPaneWrapper.vue:270-274` | "subject **0.40** keeps ≈49dvh of unoccluded stage … proof:mobile-single-page's **0.45 UNOCCLUDED floor**" | 0.40 |
| `ControlsPaneWrapper.vue:275` | `const EXPANDED_SUBJECT = 0.4;` | **0.40 — shipped** |

Both numbers are internally coherent (`1 − 0.48 = 0.52` ✓ 52dvh; `1 − 0.40 = 0.60`, minus the ~0.11 top-dock band = 0.49 ✓ "≈49dvh"). They are **different contracts**, and the majority prose states the one that **fails the file's own gate**: at 0.48 the unoccluded stage is `0.52 − 0.11 = 0.41 < 0.45`, violating the `proof:mobile-single-page` floor quoted at `:273`. The code is right; the documentation — including the entire header block a reader meets first (`:15-26`) and the stylesheet's contract paragraph — is wrong.

This is a design defect, not a typo: the occlusion contract *is* the mobile design of this component, and `ControlsPaneWrapper.css:21` points a named gate (`proof:stage-visible`) at the wrong reserve.

- **Falsifier:** `EXPANDED_SUBJECT` is 0.48 somewhere in the build (a define, an env override). `:275` is a plain module const with no override path; `expandedSnap` (`:277-279`) and `snapPoints` (`:280`) read it directly.
- **Falsifier:** the "0.45 UNOCCLUDED floor" is not a real gate. It is quoted by the file itself at `:273`; if the gate does not exist the *prose* is doubly wrong, which strengthens rather than kills the finding.

### D-M4 · `controls-pane--stage-*` and `controls-drawer--stage-*` are dead classes — the declared stage register paints nothing **MAJOR**

Both layouts bind a stage-mode modifier:

```
`controls-drawer--stage-${stageMode}`   ControlsPaneWrapper.vue:129
`controls-pane--stage-${stageMode}`     ControlsPaneWrapper.vue:148
```

`grep -rn "controls-pane--stage\|controls-drawer--stage" demo/` returns **three** hits: the two bindings and `usePaneRegister.ts:14` calling itself "the `controls-pane--stage-*` class driver". **Zero CSS rules** exist for either, in this file or anywhere in `demo/`.

*(Pass 2 extends the count: the **parent** binds a third member of the same dead family — `` `controls-layout--stage-${stageMode}` `` at `AnimationControlsGroup.vue:6` — also with zero selectors anywhere. Three class families, one unimplemented register.)*

The register they claim to drive is documented three times as a *visual* contract — `ControlsPaneWrapper.vue:189-191` (*"`subject` full-bleeds the stage behind the sheet; `editor`/`storyboard` keep a content card"*) and `usePaneRegister.ts:8-9,26-29` (*"the sheet is ALWAYS a content card; `subject` full-bleeds the stage behind it"*). None of that is expressed. `stageMode` retains exactly one live effect — selecting `EXPANDED_SUBJECT` vs `EXPANDED_EDITOR` (`:277-279`) — a *detent* choice, not a register.

*(Pass 2: the same composable returns a **second** dead value. `usePaneRegister.ts:17,38,40` computes and returns `isDesktop`, documented at `:26-28` as gating "the desktop glass-wash adoption"; the sole consumer destructures `{ stageMode }` alone (`:236`). A composable whose stated purpose is a register now exports one live detent input and two dead hooks.)*

Cost: two class hooks and a composable's stated purpose that a future designer will reasonably style against, plus a false trail in `usePaneRegister`'s docblock.

- **Falsifier:** a rule targeting either selector exists in glass-ui or an unscoped demo sheet. Searched `demo/**` (all extensions) and `node_modules/@mkbabb/glass-ui/dist/**.css` — no hits.
- **Falsifier (partial):** the classes are consumed by a Playwright/proof selector rather than CSS. That would make them test hooks, not design hooks — the design claim in the three docblocks would still be unimplemented.

### D-M5 · The component forks on viewport **px**; its parent grid forks on container **rem** — they disagree over a 256px band **MAJOR**

This file draws its layout boundary three times, always against the **viewport in CSS px**:

- `ControlsPaneWrapper.vue:254` `useMediaQuery("(max-width: 1023px)")`
- `ControlsPaneWrapper.css:40` `@media (max-width: 1023px)` / `:81` `@media (min-width: 1024px)`
- `usePaneRegister.ts:38` `useMediaQuery("(min-width: 1024px)")`

Its parent draws the *same* boundary against the **container's inline size in rem**:

```css
.controls-layout { container-type: inline-size; container-name: controls-layout; }   /* AnimationControlsGroup.css:24-25 */
@container controls-layout (min-width: 64rem) { … }                                   /* AnimationControlsGroup.css:190+ */
```

`px` in a media query is absolute; `rem` in a container query resolves against the **root font size**. At a user root font size of 20px (a common browser a11y setting), `64rem = 1280px` while `1024px` stays 1024px. Over the viewport band **1024 ≤ W < 1280**:

- `isMobileLayout` = false → this file renders the **desktop naked rail** (`:142-157`) and applies the `@media (min-width:1024px)` rules.
- The container fork is still **mobile** → `AnimationControlsGroup.css:190-215` does **not** apply, so the wrapper never receives `grid-column: rail; grid-row: stage`. It falls back to its own Tailwind `col-start-1 row-start-1` (`:147`) — column 1 is `[rail]` ✓ but row 1 is `[top] auto`, not `[stage] 1fr`. The rail lands in the auto-height top row.
- Simultaneously the mobile fork keeps `.stage-cell { position: fixed; inset: 0 }` (`AnimationControlsGroup.css:~130`), so a full-bleed fixed stage sits behind a desktop rail that expects a disjoint `[stage]` column, and no Drawer renders at all.

Second, smaller instance at the default 16px root: `@media` viewport width **excludes** a classic scrollbar while `.controls-layout`'s width is `min(100dvw, …)` and `100dvw` **includes** it (`AnimationControlsGroup.css:7`). On Windows/Linux Chrome at a ~1024–1039px window, the container reads ≥ 64rem (desktop placements applied) while the media query reads < 1024px (this file renders the **mobile Drawer**) — a bottom sheet over a grid-column stage that reserves nothing for it.

- **Falsifier:** `@media (min-width: 1024px)` scales with root font size. It does not — `px` is an absolute unit in media queries.
- **Falsifier:** `.controls-layout`'s inline size is pinned to the viewport at all root sizes. It is `min(100dvw, var(--work-area-max-width))` with `--work-area-max-width: clamp(72rem, 94vw, 160rem)` (`design-idioms`/`layout.css:49`) — both rem-anchored, so both move with the root font size while the media queries do not.
- `UNPROVEN-NEEDS-LIVE`: the rendered damage in the band. The fork divergence is arithmetic and certain.
- **Fix shape:** convert this file's three boundaries to the same `@container controls-layout (min-width: 64rem)` axis the parent already declares (`useMediaQuery` → a container-query-driven inject, or move the branch decision up to `AnimationControlsGroup`).

### D-M6 · The mobile mount-reset is setup-time only — crossing 1024px downward mounts the sheet **expanded**, the exact occlusion the reset exists to prevent **MAJOR**

```ts
if (isMobileLayout.value) {                              // ControlsPaneWrapper.vue:260-262
    props.storedControls.isControlsPanelOpen = false;
}
```

`:256-259` states the intent: *"on the mobile layout the sheet is born at PEEK per scene entry (the wrapper remounts per scene via the group superKey boundary), so this setup-time reset overrides the store's persisted/default open fact."*

The reset runs **once, in `setup`**, keyed on scene remount. Resizing/rotating from desktop-open to mobile does not remount the wrapper — `isMobileLayout` flips reactively, `v-if="isMobileLayout && showSheet"` (`:118`) mounts the `<Drawer>`, and `activeSnap`'s getter (`:284-288`) reads `isControlsPanelOpen === true` → the sheet is born at `expandedSnap` (0.40 / 0.62), covering 40–62 dvh of the stage on first paint, with no user gesture. Landscape→portrait rotation on a tablet crossing 1023px is the everyday path.

Secondary design smell in the same three lines: a **setup-time write into a prop object** (`props.storedControls`) — a side effect on shared state at component-creation time, which also means the store's persisted user preference is silently discarded on every mobile scene entry with no affordance recording that it happened.

- **Falsifier:** the wrapper is keyed such that a breakpoint cross remounts it. `AnimationControlsGroup.vue:19-35` mounts `<ControlsPaneWrapper v-if="hasControlSurfaces">` with no `:key`; the remount boundary named at `:257` is the *scene* superKey, which a resize does not change.
- **Falsifier:** `useMediaQuery` remounts consumers on change. It does not — it is a reactive ref.

### D-M7 · PRM guard covers one of three opacity transitions — and the census counts it as coverage **MAJOR**

The file declares three transitions:

```css
.controls-pane-wrapper.controls-pane--open { transition: opacity var(--duration-normal) var(--ease-standard); }  /* :91-96  */
.controls-pane--open  .controls-pane      { transition: opacity var(--duration-normal) var(--ease-out); }        /* :100-103 */
.controls-pane--closed .controls-pane     { transition: opacity var(--duration-fast)   var(--ease-in); }         /* :104-107 */
```

The PRM block guards only the first:

```css
@media (min-width: 1024px) and (prefers-reduced-motion: reduce) {
  .controls-pane-wrapper.controls-pane--open { transition: none; }   /* :144-148 */
}
```

So under PRM the **open/close cross-fade still animates** (0.3 s in, 0.2 s out — `--duration-normal: 0.3s`, `--duration-fast: 0.2s`, verified in `glass-ui.css`). The block's own comment (`:139-143`) reasons only about the idle-fade and the mobile Drawer; it never accounts for the two rules eleven lines above it. `lane-frontend.md:462` lists `ControlsPaneWrapper.css:144` among the demo's 10 PRM blocks — **presence, not coverage**; this challenge contradicts that reading in scope.

Honest counterweight (and the reason this is MAJOR, not BLOCKER): the file's *mobile* PRM delegation claim at `:141-143` is **true**. `node_modules/@mkbabb/glass-ui/dist/drawer.js` carries `respectReducedMotion: !0` on the snap spring and `components/drawer/styles.css` ends with `@media (prefers-reduced-motion: reduce) { .glass-drawer-grip { transition: none } }`. The delegation holds; only the local desktop guard is partial. *(Pass 2 independently re-verified both, and adds: `Drawer.vue`'s `stage` enum degrades `scale`/`immersive` → `dim` under `prefersReducedMotion`, so the page-recede is PRM-safe too.)*

- **Falsifier:** an ancestor or global sheet zeroes transitions under PRM (a blanket `*{transition:none}` reset). `grep -rn "prefers-reduced-motion" demo/styles/` → **zero hits** in the four global sheets; `glass-ui.css` carries exactly one PRM block, scoped to glass components.
- **Falsifier:** opacity cross-fades are PRM-exempt. WCAG 2.3.3 / the PRM contract targets non-essential motion *and* transition; a 0.3 s opacity fade on a full panel is squarely in scope for a codebase that guards its sibling rule three lines later.

### D-M8 · The peek detent is a viewport fraction measured against a fixed-px handle — usable band swings 1.9× and falls under the touch target **MAJOR**

`PEEK_SNAP = 0.12` (`ControlsPaneWrapper.vue:269`) is a fraction of viewport height. The affordance it must clear is fixed: `.glass-drawer-handle { min-block-size: var(--touch-target, 2.75rem) }` = **44px** (glass-ui `styles.css`).

| viewport height | peek band `0.12·h` | minus 44px handle | usable body |
|---|---|---|---|
| 568px | 68.2px | | **24.2px** |
| 667px (SE) | 80.0px | | **36.0px** |
| 852px (16 Pro) | 102.2px | | **58.2px** |
| 932px (16 Pro Max) | 111.8px | | **67.8px** |

A **2.8×** swing in the peek's information payload driven purely by device height, and on the two shorter viewports the residual band is **below glass-ui's own declared `--touch-target` of 44px** — the peek state cannot host one conformant control. The correct Aristotelian form for a detent whose first job is clearing a fixed affordance is `max(fraction, handle + one row)`, not a bare fraction. Compare the expanded detents, which are legitimately fractional (they express a *stage-reserve* proportion, `:265-274`) — peek expresses a *fixed* clearance and should not be.

Compounds with D-B1: subtract the ≥44px menubar band from the same peek strip and the shorter viewports have no clear band at all.

- **Falsifier:** `--touch-target` is not 44px in this cascade. `grep -rho -- "--touch-target:[^;]*;" node_modules/@mkbabb/glass-ui/dist/` → `2.75rem`, single definition; the demo never overrides it.
- **Falsifier:** the peek band is measured against the *sheet*, not the viewport, so the fraction is self-relative. It is not — `.glass-drawer[data-glass-drawer-snap-points="true"]` is `height: 100%` of the viewport (`styles.css`), and the file states the identity at `:264-265`: *"fractions of the viewport height the sheet fills … visible fraction = snap fraction."*
- `UNPROVEN-NEEDS-LIVE`: what is actually legible in 24–36px (the `KfPillTabs` strip's rendered height).

### D-M9 · Two of three scroll-fade states have no rule — the "more below" cue is absent exactly at rest **MAJOR**

`useControlsLayout.ts:76-81` wires `useScrollFade({ axis: "y", classPrefix: "scroll-fade" })`, which emits one of `scroll-fade-top` / `scroll-fade-bottom` / `scroll-fade-both` (`useScrollFade.ts:72-80`). This file styles **one**:

```css
@supports (…mask-image…) { .controls-drawer-content .scroll-fade-both { mask-image: … } }   /* :54-72 */
```

`grep -rn "scroll-fade-top\|scroll-fade-bottom" --exclude-dir=node_modules .` across the whole repo → **zero rules**. So:

- **At rest** (`scrollTop === 0`, the state every user meets on open) the class is `scroll-fade-bottom` → **no mask, no fade**. The one moment the "there is more content below" affordance is the *only* cue that the sheet scrolls, it is not rendered.
- Scrolled to the end → `scroll-fade-top` → no fade either.
- The fade appears **only** mid-scroll, when the scrollbar/momentum already tells the user what the fade would.

The affordance is inverted: it is present when redundant and absent when load-bearing.

Compounding, `ControlsPaneWrapper.css:53` documents a class the composable never emits — *"scroll-fade-both aliases scroll-fade-y"*. `scroll-fade-y` appears nowhere in the repo; `classPrefix + axis` is not a naming the composable produces (`useScrollFade.ts:72-73` derives `top`/`bottom`, never `y`).

*(Pass 2 adds a proportion note: `--mask-fade` is `2.5rem` = 40px (`design-idioms.css:49`), applied at both edges. The pane's controls are `h-8` = 32px and its rhythm gap is `0.75rem` = 12px, so the ramp is wider than a control plus its gap — any interactive element caught in the band renders partially transparent while remaining fully clickable, an affordance/state mismatch. Whether a control lands there is `UNPROVEN-NEEDS-LIVE`; the geometry is decidable, and D-M9 makes it rare rather than absent.)*

- **Falsifier:** a global sheet styles the two missing classes. Searched all of `demo/` and `node_modules/@mkbabb/glass-ui/dist/*.css` — no hits (the only other `-fade` masks are `ChannelControls.vue:443-454`, a different `tabs-overflow-*` family on the x axis).
- **Falsifier:** `overflowStart`/`overflowEnd` can both be true at `scrollTop === 0`. `useScrollFade.ts:91` sets `overflowStart = scrollTop > threshold(2)` → false at rest, so `fadeClass` (`:76-78`) can only be `scroll-fade-bottom`. Certain.

### D-M10 · The `:focus-within` instant lift is cascade-dead — the documented escape from D-B3 loses on specificity **MAJOR** *(pass 2 — new)*

`ControlsPaneWrapper.css:114-120`, read as a cascade rather than as prose:

```css
.controls-pane-wrapper.controls-pane--idle:not(.controls-pane--hovered) {
    opacity: var(--controls-idle-opacity, 0.35);      /* (0,3,0) */
}
.controls-pane-wrapper:hover,
.controls-pane-wrapper:focus-within {
    opacity: 1;                                        /* (0,2,0) */
}
```

`:not()` takes the specificity of its argument, so the idle rule is **three** class selectors — (0,3,0) — against the lift rule's (0,2,0). Specificity precedes source order. **The idle rule wins.**

For `:hover` this is invisible, which is why it survived review: `paneMouseEnter` (`:38` → `usePaneHover.ts:55`) sets `isPaneDirectHover`, `.controls-pane--hovered` lands on the wrapper (`:151`), `:not()` fails, and the idle rule stops matching. The pointer path is protected by the **class**, not by the `:hover` rule — the rule is decorative.

**The keyboard path has no such class.** `isPaneHovered = isPaneDirectHover || isDockHovered` (`usePaneHover.ts:36-38`); `isPaneDirectHover` is written only by `@mouseenter` (`:38`). Focus writes nothing anywhere in the composable. So with focus held inside the pane and `useIdle(10_000)` elapsed, `.controls-pane--idle` applies, `.controls-pane--hovered` does not, and the lift never fires.

The contract this breaks is stated twice, in prose, by the code itself:

- `usePaneHover.ts:23` — "the `:hover`/`:focus-within` instant lift"
- `ControlsPaneWrapper.css:112-113` — "`:hover` / `:focus-within` lift it to full opacity at once."

**Why this escalates D-B3 rather than duplicating it.** D-B3 establishes that the dimmed pane renders body text at 2.18 : 1. Group opacity composites the *whole* subtree, including the **focus indicator on the focused control** — so a ring designed at the WCAG 2.4.11 minimum of 3 : 1 composites to ≈1.2 : 1 against its surround. D-B3's aggravator 2 argues the dim is escapable ("a user *operating* the pane never sees it"); for the keyboard that is false, because the only documented escape is this rule and this rule does not run. A pointer user leaves the state by moving the mouse; a keyboard user reading a focused slider has no gesture that both preserves focus and clears idle.

Filed **MAJOR, not BLOCKER**, deliberately: on its own — against a compliant dim — a dead `:focus-within` lift is a MAJOR cascade defect. Its severity here is borrowed from D-B3, and double-counting one harm as two blockers would inflate the ledger. It should be repaired *with* D-B3, not after it.

- **Falsifier:** find any rule that adds `.controls-pane--hovered` (or an equivalent ≥(0,3,0) `opacity: 1`) on focus. `grep -rn "focus" demo/components/instrument/transport/ControlsPaneWrapper/` → no hit in `usePaneHover.ts`; the class has exactly one writer, `:151`, bound to `isPaneHovered`.
- **Falsifier:** the lift rule sits in a later cascade layer that wins. Both rules are in the same unlayered scoped `<style src>`; layers cannot separate them.
- **Falsifier:** `useIdle` cannot fire while an element inside the pane holds focus. It is vueuse's window-level idle on mousemove/mousedown/resize/keydown/touchstart/wheel — indifferent to focus, and a stationary reader trips it in 10 s.
- **Falsifier (kills the escalation, not the defect):** if a repair lands `α ≥ 0.60` per D-B3, this becomes cosmetic. That is the correct sequencing, not a reason to defer.
- **Fix shape (one selector):** append `:not(:hover):not(:focus-within)` to the idle rule, or union focus into the `.controls-pane--hovered` condition. Do **not** raise the lift rule's specificity — that leaves two rules racing on a magnitude that D-B3 shows is wrong anyway.

---

## MINOR

### D-m1 · Same magnitude, two unit systems; physical and logical padding three lines apart **MINOR**

`ControlsPaneWrapper.css:31` `gap: 0.75rem` (= 12px at a 16px root) sits in the same box as `:133-135` `padding-left: 12px; padding-right: 12px; padding-bottom: 12px`. Identical intended magnitude, one rem-relative and one absolute: raise the root font size to 20px and the gap becomes 15px while the padding stays 12px, so the shadow-clearance the padding exists to provide (`:129-132`) silently falls out of proportion with the rhythm it was tuned against. Meanwhile `:86` uses the *logical* `padding-inline: 0` three declarations above the *physical* pair, and the mobile block uses logical `padding-inline: 0.75rem` (`:48`) — three conventions in a 60-line stylesheet.

- **Falsifier:** the 12px is intentionally absolute (shadow geometry in device px). Plausible — but then it should be a named token beside `--mask-fade`/`--rail-width`, not a bare literal, and the file gives no such rationale (`:129-132` explains *why padding*, never *why px*).

### D-m2 · Physical horizontal padding does not mirror under RTL **MINOR**

`RibbonBar.vue:2` `pl-4 pr-7 pb-2` and `ChannelControls.vue:17,39` `pl-4 pr-7 pt-2 pb-2` are Tailwind **physical** utilities (v4 `pl-*`/`pr-*` → `padding-left`/`padding-right`; the logical forms are `ps-*`/`pe-*`). The 16px/28px asymmetry is deliberate (it clears something on the right edge of the rail) and will land on the **wrong side** under `dir="rtl"`, inverting the clearance into a collision.

Honest scope: no RTL surface exists in the demo today (`grep -rn 'dir="rtl"' demo/` → zero). This is a latent defect, filed MINOR on that basis — but the parent stylesheet already uses logical properties correctly (`ControlsPaneWrapper.css:48,86`), so the tree is inconsistent with itself, not merely RTL-naive.

*(Pass 2 independently reached this and records a cleared sub-claim so it is not re-filed: the 16/28 asymmetry is **not** a `RibbonBar` one-off. `ChannelControls.vue:17` and `:39` carry `pl-4 pr-7` byte-for-byte, so it is the pane's consistent inline rhythm — a deliberate right-edge reserve, undocumented but uniform. Read as an unexplained margin it looks like a proportion defect; it is not. It wants one comment naming what it reserves.)*

- **Falsifier:** the project has a Tailwind config mapping `pl-*`/`pr-*` to logical properties. Tailwind v4 does not; `demo/` carries no such `@utility` override.

### D-m3 · A component-private magnitude published to the flat global namespace — then shadowed by a hardcoded duplicate **MINOR** (instantiates `lane-frontend.md §6.3`)

`--controls-idle-opacity: 0.35` lives in `demo/styles/layout.css:41`, document-global and unprefixed. Its **only** consumer in the repo is `ControlsPaneWrapper.css:115` — and that consumer restates the value as a fallback: `var(--controls-idle-opacity, 0.35)`. Two sources of truth for a number that governs a WCAG-relevant rendering (D-B3); change the token and the fallback silently disagrees on any path where the token fails to resolve (scoped-style extraction, a portal outside `:root`'s cascade — and the mobile body **is** portalled to `<body>`).

Worse in the same namespace: `--rail-width` is `@property`-registered with `inherits: true` (`design-idioms.css:60-64`). A registered custom property is **document-global**; the demo's registration wins for the whole document, so any future glass-ui token of that name inherits the demo's `syntax`/`initial-value` semantics. That is the collision surface `lane-frontend.md:437` called "worth a lane of its own", made concrete: this component consumes three such unprefixed demo tokens (`--rail-width`, `--mask-fade`, `--controls-idle-opacity`) side by side with glass-ui's unprefixed `--duration-*`/`--ease-*`, with nothing distinguishing owner from consumer.

- **Falsifier:** a second consumer of `--controls-idle-opacity` exists. `grep -rn -- "--controls-idle-opacity" demo/` → the definition, this file's consumption, and one prose mention (`usePaneHover.ts:22`, which also mis-attributes the token to `design-idioms.css` when it lives in `layout.css`).

### D-m4 · glass-ui provenance is pinned to 4.0.x against an installed 7.0.0; three dist citations are dead **MINOR** (sibling of `lane-frontend.md` S-2)

| citation | site | against installed 7.0.0 |
|---|---|---|
| "glass-ui 4.0.1's `<Drawer>`" | `:7` | version is **7.0.0** (`lane-frontend.md` F-1) |
| "drawer.js:6 `import { SpringProgress } from "@mkbabb/keyframes.js"`" | `:9-10` | `drawer.js:6` is the **reka-ui** import line; `SpringProgress` is `:7` |
| "`:134` `new A({ … })`" | `:10` | no such line (the ctor is `new M({…})`) |
| "drawer.css :53/:134" | `:17` | the installed drawer stylesheet is a single line; both refs unresolvable |
| "glass-ui 4.0.0 (BA.W-TABS)" | `:197` | same drift |
| the substrate is vaul-derived | `:5-8` | `BB.W-DRAWER-ABROGATE` retired vaul-vue; reka `DialogRoot` + the house `useDrawerSnap` own it (`Drawer.vue.d.ts` header) |

**The substantive claim survives and must not be over-filed.** The dogfood is real: `grep -l SpringProgress node_modules/@mkbabb/glass-ui/dist/*.js` → `drawer.js`, `dock.js`, `blob.js`, `useSpring-*.js`, `useDragMorph-*.js`. keyframes' own spring **is** what drives `--glass-drawer-t`. Only the coordinates are dead — and D-B1 is the cost of nobody re-walking them after the version moved.

*(Pass 2: the compounding with **F-1** is the part worth escalating to the repair lane. With glass-ui declared in neither `package.json` nor the lockfile, no reader can determine from the manifest which glass the prose describes — so documentation rot here is **unfalsifiable without reading `node_modules`**, which is exactly what both passes had to do. F-1 is not only a build risk; it is what makes this class of defect undetectable by review.)*

- **Falsifier:** `node_modules/@mkbabb/glass-ui/package.json` reads `4.0.1`. It reads `7.0.0`.
- **Falsifier:** `SpringProgress` is absent from the 7.0.0 drawer chain (which would make the dogfood claim *substantively* stale, escalating this). It is present, at `drawer.js:7`.

### D-m5 · `group/controls` is a dead Tailwind group **MINOR**

`ControlsPaneWrapper.vue:35` declares the named group `group/controls`. `grep -rn "group-hover/controls\|group-focus/controls\|group-.*\/controls" demo/` → **zero consumers**. A named group with no variant referencing it costs a class on the hot element and misleads the next author into believing pane-level hover state is already plumbed to descendants (it is not — the hover state is JS, `usePaneHover.ts`, and reaches CSS only via `.controls-pane--hovered` on the *wrapper*, `:152`).

- **Falsifier:** a scene or glass-ui component consumes `/controls`. Searched all of `demo/`; none.

### D-m6 · The prose sells a three-detent ladder; two ship **MINOR**

`:7-8` — *"The mobile sheet is now glass-ui 4.0.1's `<Drawer>` — **the exact peek/half/full** bottom sheet"*. `:111-113` — *"Held permanently OPEN (peek is the resting state — the grab handle stays the re-open affordance, **mirroring the bespoke peek/half/full**)"*.

Shipped: `snapPoints = [PEEK_SNAP, expandedSnap]` (`:280`) — **two** detents. The *half* rung the deleted bespoke sheet provided was dropped in the adoption, and both prose sites assert parity with it. "Exact" is the load-bearing word: a reviewer reading `:7-8` will not check `:280`.

Design consequence beyond the prose: the ladder now jumps 0.12 → 0.40 (subject) or 0.12 → 0.62 (editor). The 0.62 jump crosses the whole readable stage in one fling, with no intermediate rest — the exact state a "half" detent exists to hold.

*(Pass 2 note: glass-ui's own live-behind default ladder is `[0.12, 0.5, 1]` — three rungs, including the half (`drawer.js` constants; `drawer/index.d.ts` documents "bottom/top → `[0.12, 0.5, 1]`"). The consumer's explicit two-point `snapPoints` **overrides** a producer default that already had the missing rung. The half was not unavailable; it was opted out of.)*

- **Falsifier:** the Drawer synthesises an intermediate detent from a two-point `snapPoints` array. `useDrawerSnap` snaps to array members; nothing in `drawer.js` interpolates a third.

### D-m7 · The ribbon renders an empty glass plate whenever its teleport has not landed **MINOR** · verdict PLAUSIBLE

`RibbonBar.vue:3-4` always renders `<Card cartoon tier="quiet"><CardContent class="p-3">`. When `selectedControl === 'controls'` the only child is the teleport target `<div id="controls-ribbon-target" v-show>` (`:6-9`) — the three sibling branches (`v-if` keyframes / `v-else-if` timeline / `v-else-if !== 'controls'`, `:12,68,107`) are all false. Content arrives from `ChannelOptions.vue:377` `<Teleport v-if="active" to="#controls-ribbon-target" defer>`. `defer` guarantees the teleport resolves **after** the target mounts, so a card with 24px of padding and nothing inside paints for at least one frame on every mount.

A *persistent* empty plate requires the gate divergence: `RibbonBar.vue:8` reads the **raw** `storedControls.selectedControl`, while `ChannelControls` gates the teleport source on the **projected** `selectedControlSurface` (`ChannelControls.vue:98,108` → `useSelectedControlSurface.ts:80-86`). Two ends of one Teleport, two different authorities.

Marked PLAUSIBLE, not CONFIRMED, because `useSelectedControlSurface.ts:88-101` runs a reconciling watch with `immediate: true` that writes the projection back into the store — closing the window to ~one tick in the normal path. It is deliberately suppressed when `!isActiveSceneHost` (`:73-78`, the scene-leave window) and passes the raw pick through when `machine.selectedControlSurface()` returns `undefined` (`:82,110`).

- **Falsifier:** `machine.selectedControlSurface()` is total over the pick domain (never `undefined`) **and** the reconcile is never suppressed while `RibbonBar` is mounted. The `?? pick` fallbacks at `:82` and `:110` exist precisely because it is not total.
- **Falsifier (kills the one-frame case):** `Teleport defer` resolves synchronously with the target's mount. It does not — `defer` exists to postpone resolution past the current render.

### D-m8 · Two `ControlsPaneWrapper` homes in sibling scope **MINOR**

The SFC lives at `transport/controls-pane/ControlsPaneWrapper.vue` but imports its own composables from a **directory of the same name one level up**:

```ts
import { usePaneRegister }   from "../ControlsPaneWrapper/usePaneRegister";     // :172
import { useControlsLayout } from "../ControlsPaneWrapper/useControlsLayout";   // :173
```

`transport/` therefore contains both `ControlsPaneWrapper/` (a directory: 3 composables) and `controls-pane/ControlsPaneWrapper.vue` (the component). `RibbonBar.vue` is colocated with the component; `usePaneHover.ts` is not. A reader searching for "the ControlsPaneWrapper files" finds two disjoint answers. `lane-frontend.md §7.4` already names a "duplicate-name hazard" in the composable tier — this is the component-tier instance.

- **Falsifier:** the split is a documented seam. `usePaneRegister.ts:20-30` calls itself "colocated" — which it is not, relative to the SFC it names.

### D-m9 · No forced-colors handling anywhere; both opacity mechanisms survive it **MINOR**

`grep -rn "forced-colors" demo/` → **zero hits** (glass-ui carries exactly one block). Forced-colors mode overrides `color`/`background-color`/`border-color` but **not** `opacity`. So in Windows High Contrast:

- the idle rest-dim (`:115`) still applies — over a forced background, 0.35 opacity destroys the contrast the mode exists to guarantee (D-B3 gets *worse*, not better, since the user in this mode has declared a contrast need);
- the closed pane's `opacity: 0` hide (`:105`) still applies, so D-B2's invisible-but-focusable rail is invisible in forced-colors too, with no forced border to reveal it.

The correct guard is a `@media (forced-colors: active)` block neutralising both (`opacity: 1` on the idle rule; a real `visibility`/`inert` hide for the closed state — which D-B2 wants anyway).

*(Pass 2 widens the search and confirms the gap is total: `grep -rn "forced-colors\|prefers-contrast\|prefers-reduced-transparency" demo/` → **zero hits for all three**. The demo does not query a single contrast- or transparency-preference media feature anywhere. D-B4's rainbow ground is the second surface with no forced-colors escape — in forced-colors the gradient background is overridden but `text-white` may not be, which can invert the failure rather than fix it. `UNPROVEN-NEEDS-LIVE`.)*

- **Falsifier:** UA forced-colors emulation neutralises `opacity`. The CSS Color Adjust spec's forced-colors override list does not include `opacity`.

### D-m10 · The demo overrides six of seven stops in a gradient it does not own — the seventh is a different colour space **MINOR** *(pass 2 — new; second instantiation of `lane-frontend.md §6.3`)*

`lane-frontend.md:437` named the flat-namespace hazard abstractly. D-m3 gives it a single-token instance. This is the multi-token one, and it is sharper because the collision is **partial**.

glass-ui's `rainbow-vivid` consumes seven stops: red, orange, yellow, green, blue, **indigo**, violet (`dist/styles/utilities/btn.css`). glass-ui defines all seven in `oklch` (`dist/styles/tokens/*`). The demo redefines six of them in `hsl` at `design-idioms.css:15-21`, after the glass cascade — and **does not define `--rainbow-indigo`**:

```
$ grep -rn -- "--rainbow-indigo" demo/     → 0 hits
$ grep -rho -- "--rainbow-indigo:[^;]*;" node_modules/@mkbabb/glass-ui/dist/styles/
  --rainbow-indigo: oklch(0.566 0.206 294.1);
```

So the gradient the user sees is **six crayon-hsl stops with one perceptually-uniform oklch stop wedged between blue and violet** — a hue/chroma discontinuity nobody chose, in a palette the demo partially owns and partially inherits. Compounding the incoherence, the demo *does* define `--rainbow-cyan` (`:21`), which `rainbow-vivid` never consumes; the override set and the consumption set do not match on either end.

The tell is exact, and it is why this is worth filing rather than shrugging at: indigo — the one stop the demo did **not** touch — is also the **only** stop in D-B4's table that clears 4.5 : 1 against the white label. The glass palette was contrast-tuned. The crayon override was not, and it silently replaced six-sevenths of it.

- **Falsifier:** the demo defines `--rainbow-indigo` anywhere in the cascade → 0 hits, checked across `demo/**`.
- **Falsifier:** `rainbow-vivid` does not consume indigo → it is named explicitly in the utility's stop list.
- **Falsifier:** the demo's `design-idioms.css` loads *before* glass-ui, so glass wins and the palette is homogeneous → `styles/style.css:1-16` imports `@mkbabb/glass-ui/styles` at `:3` and `./design-idioms.css` at `:5`, and `:10-13` documents the ordering as deliberate ("the demo idioms land immediately after the glass cascade so `--rainbow-*` … are the authoritative copy"). The demo wins for the six it defines.
- Whether the discontinuity is *visible* at button width is `UNPROVEN-NEEDS-LIVE`; the heterogeneity and the partial override are decidable.

### D-m11 · **Overturns `D-i0`.** The `aria-describedby` IDREF *is* dangling, and the dev warning *does* fire **MINOR** *(pass 2 — new; contradicts pass 1)*

Pass 1 recorded the missing `DrawerDescription` as an explicit NON-defect (D-i0) *"so a later lane does not re-file it"*, on two grounds: that `descriptionId` stays `""` and that reka's warning is gated out. **Both are false against the installed tree.** Recording the correction here because a non-defect entry actively suppresses future filing, so an incorrect one is more costly than a missed defect.

Pass 1's evidence stops at `reka-ui/dist/Dialog/DialogRoot.js:52`, which does initialise `descriptionId: ""`. The next file overwrites it. `DialogContentImpl.js:49-50`:

```js
rootContext.titleId       ||= useId(void 0, "reka-dialog-title");
rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
```

`""` is falsy, so `||=` **assigns a generated id**. And this path is live for `mode="live-behind"`: `DialogContentNonModal.js:4,49` imports and renders `DialogContentImpl_default`.

Consequences, both decidable:

1. **Dangling IDREF.** `DialogContentImpl.js:78` emits `"aria-describedby": unref(rootContext).descriptionId` unconditionally — now a non-empty `reka-dialog-description-N` pointing at an element that never mounts (no `DrawerDescription` is rendered, `ControlsPaneWrapper.vue:125-136`). Not the harmless `aria-describedby=""` pass 1 describes. axe's `aria-valid-attr-value` flags a reference to a non-existent id.
2. **The warning fires.** `Dialog/utils.js:16-20` gates on `if (descriptionId && describedById)`. Pass 1 read `""` as failing that gate; with the generated id **both operands are truthy**, `document.getElementById(descriptionId)` returns `null`, and `console.warn("Warning: Missing \`Description\` or \`aria-describedby=\"undefined\"\` for DialogContent")` runs — in dev (`if (process.env.NODE_ENV !== "production")`, `DialogContentImpl.js:55`).

Severity **MINOR**, not higher: the dialog is correctly *named* (`DrawerTitle`, `:134`, and `DrawerTitle.vue.d.ts` does forward `class`, so `sr-only` applies as intended), screen readers tolerate a dangling describedby, and the console noise is dev-only. The fix is one element: `<DrawerDescription class="sr-only">` naming what the sheet contains.

- **Falsifier (restores D-i0):** show `DialogContentImpl.js:49-50` does not run for the non-modal path, or that `||=` does not assign on `""`. `DialogContentNonModal.js:49` renders `DialogContentImpl_default`; `""` is falsy in JS.
- **Falsifier:** show `descriptionId` is re-blanked before render. Nothing writes it after `:50`; `:78` reads the same object.
- **Method note for the lane:** the divergence is instructive. Both passes read the same two files; pass 1 stopped at the initialiser, pass 2 followed the mutation. A recorded NON-defect should carry the *strongest* falsifier available, not the first sufficient one.

---

## INFO

### D-i0 · ~~NON-DEFECT, recorded so it is not re-filed: the missing `DrawerDescription` is harmless~~ **OVERTURNED — see `D-m11`** **INFO**

> **Status: WITHDRAWN by pass 2.** Retained in place, struck, so the reasoning error is legible rather than erased — a withdrawn entry that vanishes teaches nothing. The original text follows.

~~`ControlsPaneWrapper.vue:125-136` renders `DrawerContent` + `DrawerTitle` but no `DrawerDescription`, though glass-ui exports one (`dist/components/drawer/DrawerDescription.vue.d.ts`). A reviewer will reach for "dangling `aria-describedby` IDREF + reka dev warning". **Both are false here.** `reka-ui/dist/Dialog/DialogRoot.js:52` initialises `descriptionId: ""`, so `DialogContentImpl.js:78` emits `aria-describedby=""` (an empty, harmless attribute — no dangling reference), and `Dialog/utils.js:16-20` gates the warning on `if (descriptionId && describedById)`, which `""` fails. No console warning, no ARIA violation.~~

**Why it failed:** the `""` initialiser is overwritten one file later by `DialogContentImpl.js:49-50`'s `||=`. Both stated conclusions invert. See `D-m11`.

### D-i1 · The sheet's re-open affordance is announced as "Drawer position, 12%, position 1 of 2" — a glass-ui forward, not a consumer defect **INFO**

glass-ui's handle is `role="slider" tabindex="0" aria-label="Drawer position"` with `aria-valuetext` computed as `` `${Math.round(t*100)}%, position ${i+1} of ${n}` `` (`drawer.js`). A screen-reader user meets *"Drawer position, slider, 12%, position 1 of 2"* — nothing connects it to the animation controls the `DrawerTitle` names, and a raw snap percentage is not a user-meaningful quantity.

Filed INFO because the consumer **cannot** fix it: `DrawerContent` forwards `$attrs` to `DialogContent`, not to the handle (`drawer.js` — the handle's attribute set is a closed literal). This is a glass-ui component seam to forward alongside the D-B1 `--drawer-inset-block-end` note, not a defect in this file. The consumer *could* mitigate with a visually-hidden instruction inside `DrawerContent`.

### D-i2 · Scoped styles are unlayered; Tailwind v4 utilities are layered — every rule in this stylesheet silently outranks every utility **INFO**

`demo/styles/style.css:1` `@import "tailwindcss"` (v4.3.0) places utilities in `@layer utilities`. Vue SFC scoped styles are emitted unlayered, and unlayered author declarations win over layered ones **regardless of specificity**. So any property this 148-line stylesheet touches becomes unoverridable from the template, permanently and invisibly. D-M2 is the first casualty; `overflow`, `opacity`, `width`, `padding-*` and `max-height` are all currently in that set. Worth a repo-level note: the demo's mental model ("Tailwind at the callsite, CSS for the grammar") is inverted by the cascade.

*(Pass 2: this INFO is arguably the **root cause entry** of the whole document, and the repair lane should treat it as such. D-M2 is it by layer. D-M10 is the same disease by specificity, inside the stylesheet rather than against it. D-M4 is the degenerate case — a class the cascade discards because nothing claims it. Three of the four contract failures in this component are one unexamined assumption about who wins.)*

- **Falsifier:** Tailwind v4's `@import "tailwindcss"` does not layer utilities. Its index declares `@layer theme, base, components, utilities;` at line 1 and imports utilities with `layer(utilities)`. Verified against `node_modules/tailwindcss@4.3.0/index.css`.

### D-i3 · Adjacent-axis note (correctness, not design): `animControlRefs` never nulls **INFO**

`ControlsPaneWrapper.vue:51` `:ref="(el: any) => { if (el) animControlRefs[host.name] = el }"` — the `if (el)` guard swallows the unmount callback Vue fires with `null`, so entries persist after their component dies. Combined with D-M5/D-M6 (a resize across 1024px swaps hosts and remounts the whole subtree through `createReusableTemplate`), the parent's `activeKeyframesRef`/`activeTimelineRef` plumbing can hold refs to dead instances. Recorded for the correctness lane; the *design* consequence is state discontinuity across the breakpoint (scroll position, Monaco editor state, active tab) — the mobile Drawer and desktop rail do not hand off, they replace.

---

## CORRECTIONS (pass 2 against pass 1 — L-18 turned inward)

### D-C1 · `D-B2`'s verdict survives; its mechanism is wrong — the closed pane goes **transparent**, not opaque

D-B2 states: *"Tabbing in raises the closed pane to full opacity … the keyboard user's focus lands in a zero-width, **fully-opaque**, load-bearing-clipped void."*

The two rules act on **different elements**, and group opacities **multiply**:

```css
.controls-pane--closed .controls-pane      { opacity: 0; }   /* :104-107 — the INNER pane   */
.controls-pane-wrapper:focus-within        { opacity: 1; }   /* :117-120 — the OUTER wrapper */
```

`.controls-pane--closed` is a wrapper class (`:149-151`); `.controls-pane` is its inner child (`:33-35`). `:focus-within` therefore raises the **wrapper** to 1 — which it already was — while the inner pane stays at `0`. Effective rendering opacity is `1 × 0 = 0`. **The pane remains fully invisible when a keyboard user tabs into it.**

Every consequence D-B2 draws is unchanged or worse: focusable descendants in a collapsed track, no visible focus indicator, no escape cue, WCAG 2.4.3 / 2.4.7 / 1.3.2. The `:inert` fix shape is unchanged. What changes is the *story* a repair lane would tell itself — "the lift is working, it just reveals a clipped box" invites raising the track width or removing `overflow:hidden`; the truth is that nothing reveals anything and only `:inert` (or a real `visibility` hide) addresses it.

- **Falsifier:** show a rule setting `opacity: 1` on the **inner** `.controls-pane` under `:focus-within`. `grep -n "focus-within" demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css` → one hit, `:118`, on `.controls-pane-wrapper`.
- **Falsifier:** show CSS group opacity does not multiply through nested stacking contexts. It does; each `opacity < 1` composites its subtree independently.
- **Note:** D-M10 shows the *same rule* is additionally dead for the idle case on specificity. `:117-120` is decorative in one state and misdirected in the other. It has no correct effect anywhere in this stylesheet.

### D-C2 · `S-3`'s premise is false — the "visible facet panels" carry no headings

S-3 praises `DrawerTitle class="sr-only"` for, among other things, *"it is **not** duplicated visually, which would compete with **the facet headings the sheet already carries**."* That reasoning is quoted from the component's own comment (`:132-133`: *"keep it off-screen (the visible facet panels carry their own headings)"*) and pass 1 adopted it without checking.

The sheet body carries **one** heading element in its entire subtree:

```
$ grep -rn "<h[1-6]\|CardTitle" demo/components/instrument/transport/{channel-controls,controls-pane}/
channel-controls/TimingFunctionPanel.vue:14:  <h3 class="text-title">{{ kind === "steps" ? "steps" : "cubic-bézier" }}</h3>
```

— and `TimingFunctionPanel` is a *drill-in*, not a facet the sheet opens on. The pane's only orientation cue at rest is the SegmentedTabs strip, which is labelled **for AT only** (`ChannelControls.vue:77`, `aria-label="Control surface"`) and carries no visible title.

**What survives of S-3:** the *a11y* half is entirely correct and remains a superlative — the dialog is named, reka's title warning is avoided, the choice is documented, and the third path (visible duplicate heading) was correctly rejected. **What does not:** the design half. The expanded sheet presents an unlabelled slab of controls, and the comment asserting otherwise is precisely what would stop a reviewer from noticing — as it stopped pass 1. S-3 is downgraded from a full superlative to a **qualified** one: right primitive, right reasoning about reka, false premise about the visual register.

This is the D-M4 disease again at the prose tier: a comment describing a register that was never implemented.

- **Falsifier:** find a visible heading rendered in the sheet body at any tab. One `<h3>`, in a drill-in, across both directories.
- **Falsifier (restores S-3 whole):** argue the tab strip *is* the heading. Defensible as information architecture — but then the comment should say so, and the strip's label should not be `sr-only`-equivalent.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · The adoption **bought** a11y the hand-roll did not have — and the file's delegation claims verify **SUPERLATIVE**

Deleting `SheetGrabHandle` + `useSheetGesture`/`useSheetSpring`/`useSheetState` + ~250L of sheet CSS (`ControlsPaneWrapper.vue:2-13`, `ControlsPaneWrapper.css:5-15`) is usually a capability trade. Here it was a capability **gain**, verified in the installed dist:

- the handle is `role="slider" tabindex="0"` with `aria-valuemin/max/now/text` and an `onKeydown` handler stepping the detent ladder (`drawer.js`) — the sheet is **keyboard-operable**, which a pointer-gesture hand-roll almost never is;
- `min-block-size: var(--touch-target, 2.75rem)` → a conformant 44px target (`components/drawer/styles.css`);
- a real `:focus-visible` treatment that lifts grip opacity **and** paints `box-shadow: 0 0 0 3px var(--focus-ring-color)` — focus is visible on a 5px-tall grip, which is the hard case;
- `respectReducedMotion: !0` on the snap spring plus a PRM block zeroing the grip transition, plus (pass 2) the `stage` enum's PRM degrade of `scale`/`immersive` → `dim`, so the page-recede is motion-safe by construction.

And the delegation the file *claims* (`ControlsPaneWrapper.css:139-143`: "the mobile sheet's PRM snap is owned by the Drawer's own SpringProgress `respectReducedMotion` — no CSS here") is **true against the installed dist**. That is the rare case of a comment asserting an external contract and the external contract holding — and, against D-m4's five dead citations, it is worth naming that this file's *substantive* cross-repo claim survived while all its *coordinates* rotted.

Worth stating plainly against D-B1 and D-m4: **the adoption decision was right.** The producer is better than what it replaced on motion, on a11y, and on touch-target sizing. What failed is the *maintenance* of the seam — the consumer stopped re-reading the producer, and three majors of improvement (including the fix to its own filed blocker) went unclaimed.

- **Counter-falsifier:** if the handle were `<div>`-only or the PRM flag absent, this praise inverts to a BLOCKER. Checked both.

### S-2 · `createReusableTemplate` makes mobile/desktop drift structurally impossible **SUPERLATIVE**

`ControlsPaneWrapper.vue:179` `const [DefinePaneBody, ReusePaneBody] = createReusableTemplate()`, consumed at `:135` (Drawer) and `:156` (rail). One body, two homes, **zero duplication** — the two layouts render literally the same subtree, so a change to the pane body cannot land on one platform and miss the other.

This is the correct answer to the design problem that produces most mobile/desktop drift in component libraries (two markup copies that diverge one commit at a time), and the file states the intent precisely at `:177-178`: *"the ONE body, two homes."* Note the discipline it enables: every defect above that is *layout*-specific (D-M2, D-M5, D-M6) lives in the *fork*, and none lives in the body — which is exactly the failure distribution this pattern is supposed to produce.

- **Counter-falsifier:** a second copy of the pane body exists elsewhere. `grep -rn "controls-content" demo/` → only this file and its stylesheet.

### S-3 · `DrawerTitle class="sr-only"` — correctly named, correctly reasoned **SUPERLATIVE (QUALIFIED — see `D-C2`)**

`:132-134`:

```html
<!-- reka DialogContent wants a labelling title; keep it off-screen
     (the visible facet panels carry their own headings). -->
<DrawerTitle class="sr-only">Animation controls</DrawerTitle>
```

Three things right at once: the dialog **is** named for AT (reka warns loudly when it is not — `Dialog/utils.js:7-11`); it is *not* duplicated visually, which would compete with the facet headings the sheet already carries; and the two-line comment records the reasoning so the next author does not "clean up" an apparently unused element. The common failure modes are omitting the title (dev warning + unnamed dialog) or adding a visible one (redundant heading). This file took the third, correct path.

> **Qualification (pass 2).** The a11y half stands and is genuinely exemplary. The parenthetical premise — that visible facet headings exist — is false (`D-C2`), and the paired claim that the *description* omission is harmless is overturned (`D-m11`). Read S-3 as praise for the labelling decision, not for the visual register it cites.

### S-4 · The close choreography is ordered correctly — the fade leads the guillotine **SUPERLATIVE**

`.controls-content` is a **fixed** `width: var(--rail-width)` (`:127`) inside a wrapper with `overflow: hidden` (`:89`) whose track animates to `0px`. Naively that clips the cards mid-glyph for the whole collapse. It does not, because the durations are deliberately asymmetric:

| axis | duration | easing | source |
|---|---|---|---|
| track collapse | `--duration-slow` = **0.45s** | `--spring-smooth` | `AnimationControlsGroup.css:57` |
| pane fade-**out** | `--duration-fast` = **0.20s** | `--ease-in` | `ControlsPaneWrapper.css:106` |
| pane fade-**in** | `--duration-normal` = **0.30s** | `--ease-out` | `ControlsPaneWrapper.css:102` |

The content is fully transparent at 0.20s while the clip is still 55 % of the way through — the guillotine never renders. And the easing pairing is right for once: `ease-in` on the exit (accelerate away, the eye is leaving) and `ease-out` on the entrance (decelerate in, the eye is arriving), rather than the usual single shared curve. Values verified in `glass-ui.css` (`--duration-fast: 0.2s`, `--duration-normal: 0.3s`, `--duration-slow: 0.45s`).

*(Pass 2 adds the companion superlative, which pass 1 folded into this one: the desktop open/close axis is a **real grid-track collapse** — `--rail-track` from `var(--rail-width)` to `0`, with the stage reflowing into the freed width — not an overlay and not a transform, and `.controls-content { width: var(--rail-width) }` couples pane to track from a single `@property`-registered token. The gesture **is** the composition, which is the Aristotelian reading this axis asks for. The F7 shadow-clearance at `:129-135` — symmetric 12px padding plus `box-sizing: border-box` so the cartoon offset shadow renders inside the padded box and the load-bearing `overflow:hidden` never reaches it, with the width budget preserved — is the correct solution to the clip/shadow conflict that pattern creates, and it is documented as such.)*

- **Counter-falsifier:** `--duration-fast > --duration-slow` in this cascade. Verified 0.20s < 0.45s.

### S-5 · The idle-fade's WHEN/HOW-MUCH seam, and the hover-linger that prevents ghosting the surface under the cursor **SUPERLATIVE**

`usePaneHover.ts:52-53`:

```ts
const { idle } = useIdle(IDLE_MS);
const isPaneIdle = computed(() => idle.value && !isPaneHovered.value);
```

with `isPaneHovered` unioning direct hover **and** injected dock hover (`:35-38`) behind a 2s `useTimeoutFn` linger (`:42-48`). The pane therefore can never rest-dim under a resting cursor, or while the user is working the dock that drives it — the two states where a dim reads as a bug rather than a rest. The composable's docblock (`:9-27`) states the seam explicitly and keeps it: **JS owns the WHEN, CSS owns the magnitude, the transition, the `:hover`/`:focus-within` instant lift and the PRM guard.** That is the right division; a hand-rolled `setTimeout` + inline style would have collapsed all five concerns into one place, and the file names that alternative and rejects it (`:21-23`, inv ζ).

The *magnitude* chosen is D-B3's blocker. The *mechanism* is exemplary, and the fix for D-B3 is a one-token change precisely **because** this seam is clean.

> **Pass-2 qualification.** The seam is real and the praise holds for four of the five CSS-side concerns. The fifth — the `:focus-within` instant lift the docblock enumerates — is not implemented by the CSS the seam hands it to (`D-M10`). The composable kept its half of the contract; the stylesheet did not. That is an argument *for* the seam, not against it: the defect is isolated to one selector precisely because the concerns were separated.

- **Counter-falsifier:** `useIdle` does not reset on the interactions claimed. `@vueuse/core`'s default event set is mousemove/mousedown/resize/keydown/touchstart/wheel + visibilitychange, as the docblock states.

### S-6 · glass-ui prop conformance is exact, and the one scoped rule retires an `!important` escape honestly **SUPERLATIVE** *(pass 2 — new)*

`RibbonBar.vue` is the file D-B4 indicts, so its conformance deserves the counterweight. Every glass-ui prop it passes validates against 7.0.0's declarations, which is not the default outcome in a tree with a phantom dependency (F-1):

- `Card cartoon tier="quiet"` — `cartoon` is `CardProps['cartoon']`; `tier` is inherited from `SurfaceProps` (`surface/Surface.vue.d.ts:9`), typed `SurfaceTier = ["wash","quiet","resting","floating","overlay"]` (`_shared/axes.d.ts:5`). `"quiet"` is a member.
- `Button size="sm" emphasis="secondary"` — both are declared `ButtonProps` members.

Zero bespoke re-implementations, zero shadcn-style local `ui/` copies, zero direct `reka-ui` imports — consistent with `lane-frontend.md` §3.3/§3.4 for the tree as a whole, and it holds at this leaf.

And `.ribbon-apply--active { border-color: transparent }` (`RibbonBar.vue:144-150`) is documented as the deliberate retirement of a `!border-transparent` Tailwind escape: *"a scoped rule fights the cascade honestly."* That is exactly the right instinct — and pointedly, it is the instinct D-M2 and D-M10 needed and did not get. The author who wrote that comment understood the cascade; the rules that fail understood it less.

- **Counter-falsifier:** any of the four props absent from 7.0.0's declarations would invert this to a defect (a stray attribute on the DOM and a dead design intent). All four were read in `dist/components/**/*.d.ts`.
- **Counter-falsifier:** if the scoped rule were fighting a battle it could not win (a layered utility with `!important`), the comment would be aspirational. It is not — `border-color` is unopposed at that specificity.

---

## Sequencing note for the repair lane

`D-B1` first, and alone: it is one declaration (`--drawer-inset-block-end: var(--dock-menubar-reserve)` on `.controls-drawer-content`), it discharges the file's own born-RED row, and it retires **four** stale cross-file claims (`ControlsPaneWrapper.vue:22-26,174-175`; `layout.css:72-77,100-102`; `AnimationControlsGroup.css` mobile `.stage-cell` block; `TransportDock.vue:260`) in the same stroke.

`D-B2` is `:inert` on one branch — and read `D-C1` first, because the mechanism pass 1 described would send you at `overflow`/track-width instead.

`D-B3` + `D-M10` land **together**, one token and one selector: `α ≥ 0.60` per the AA floor derived above, and `:not(:hover):not(:focus-within)` on the idle rule. Fixing either alone leaves the other's harm intact — the magnitude without the escape, or the escape onto a non-compliant magnitude.

`D-B4` is a state-style redesign on one button (rainbow to border/rule, or a label token that survives the light stops) and should land with `D-m10`, since both turn on the same partially-overridden palette.

`D-M1`/`D-M2`/`D-M4`/`D-m5` are deletions of dead mechanism — no behaviour to preserve. Note `D-M1` and `D-M2` are the two halves of one computed; delete `paneScrollable` whole rather than repairing either branch.

`D-M3`/`D-m4`/`D-m6`/`D-C2` are a single prose reconcile and should land with `lane-frontend.md` **S-2** rather than separately — as should `D-m11`'s one-element fix, which is a `DrawerDescription` in the same edit.

`D-M5` is the only structural change (fork axis) and wants its own spec.

`D-i2` is not a defect but it is the **root cause of three of them**; a repo-level decision about layering scoped styles would retire D-M2 and prevent the next D-M10 outright, and is worth a lane note independent of this component.
