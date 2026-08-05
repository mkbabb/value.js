claude-opus-5[1m]

# Challenge · KfPillTabs · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/KfPillTabs.vue` (124 L)
**Whole-unit scope** the SFC + its sole import `KfPillTabs/useKfPillTabs.ts` (93 L) = **217 L**, matching lane-frontend S-1's count.
**Mode** static, read-only. No installs, no dev server, no browser. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and three claims survived falsification as **superlatives** (L-18 runs both ways). Two hypotheses I formed and then **killed** are recorded in §4 so the next reader does not re-chase them.

**Files read whole (read-only):**

| file | why |
|---|---|
| `demo/components/instrument/transport/KfPillTabs.vue` | target |
| `demo/components/instrument/transport/KfPillTabs/useKfPillTabs.ts` | its only import |
| `demo/components/instrument/transport/channel-controls/ChannelControls.vue` | the only render site (`:74`) |
| `demo/components/instrument/transport/index.ts` | barrel registration (`:12`) |
| `demo/components/instrument/transport/composables/useKfPillTabs.ts` | the F-5 shim |
| `demo/components/instrument/transport/channel-controls/composables/useTabStripScroll.ts` | the strip's overflow/scroll plumbing |
| `demo/components/instrument/transport/channel-controls/composables/useSelectedControlSurface.ts` | the model-value authority |
| `demo/components/instrument/composables/useScrollFade.ts` | the measurement primitive |
| `demo/state/controlSurfaces.ts` | `SURFACE_META` / `BUILT_IN_SURFACES` / `selectedSurfaceFrom` |
| `test/demo/instrument/KfPillTabs.test.ts` | the component's only gate |
| `node_modules/@mkbabb/glass-ui/dist/components/tabs/{SegmentedTabs.vue.d.ts,index.d.ts,composables/useTabRovingFocus.d.ts}` | the shadowed primitive |
| `node_modules/@mkbabb/glass-ui/dist/{tabs.js, styles/index.css, styles/glass.css, styles/glass/{material,ladder,glass-capsule}.css}` | the runtime + cascade evidence |

**Headline: 11 defects (1 BLOCKER · 4 MAJOR · 5 MINOR · 1 INFO) · 3 superlatives.**

| # | severity | claim |
|---|---|---|
| C-1 | **BLOCKER** | The fork's rationale is void **three** ways against installed glass-ui 7.0.0 — including the residual design claim lane-frontend §10.2 left open. |
| C-2 | MAJOR | `role=tab` ships with **no** `aria-controls`, and the component's prop surface makes the association **impossible** to wire. "ARIA-correct BY CONSTRUCTION" is false. |
| C-3 | MAJOR | Wrong design-system rung: `glass-wash` (a *plate*) where glass-ui ships `glass-capsule-track` (a *control track*) — nested double-material + a `contain: paint` that clips the focus ring. |
| C-4 | MAJOR | The strip declares no scroll port, so the consumer's overflow-fade + scroll-into-view seam is inert and overflowing tabs are pointer-unreachable. |
| C-5 | MAJOR | Lossy option contract: `SURFACE_META.icon` / `SegmentedTabOption.tooltip` arrive and are silently dropped; no slot exists to restore them; the sibling tab host renders them. |
| C-6 | MINOR | `KfPillTabs.vue:41–42` promises a re-export the file does not contain. |
| C-7 | MINOR | `transport/index.ts:12` async-registers the component; **zero** consumers, and the laziness rationale does not apply to it. |
| C-8 | MINOR | `orientation` and `disabled` are dead in the tree — including the prop the header cites as the fork's justification. |
| C-9 | MINOR | `transition: font-weight` is layout-affecting, inside a comment claiming the opposite. |
| C-10 | MINOR | No `prefers-reduced-motion` guard, against a demo with 13 PRM sites and a primitive that handles PRM structurally. |
| C-11 | INFO | Two selection guards of different shape, one of which the keyboard path bypasses. |
| S-A | superlative | The roving-tabindex core is correct **and** genuinely gated — 7 real-`KeyboardEvent` cases with a recorded BITE. |
| S-B | superlative | The DFA seam is closed: `projectPick` is the identity on the strip's own option domain, so focus/selection cannot desync. |
| S-C | superlative | Zero value.js / keyframes.js surface — the R1 `parseCssColor` crash class is **unreachable** here. |

**Hitherto corpus folded, not re-invented.** lane-frontend `S-1` (RED, replace, 217 L), `S-2` (type-only `/tabs`, stale prose), `F-1` (glass-ui phantom dep), `F-5` (the shim), `§7.4` (duplicate-name hazard), `§10` (wave order); lane-library `§4.6` (the R1 demo blast radius). Where I extend or contradict a lane row I say so explicitly.

---

## 1. What this component consumes

The measured answer is startling and is itself the axis finding:

| library | edges | evidence |
|---|---|---|
| `@mkbabb/keyframes.js` (the library under test) | **0** | `grep -n "^import\|from \"" KfPillTabs.vue KfPillTabs/useKfPillTabs.ts` → `vue` (1) + `./KfPillTabs/useKfPillTabs` (2). |
| `@mkbabb/value.js` | **0** | same probe. |
| `@mkbabb/glass-ui` (import boundary) | **0** | same probe. |
| `@mkbabb/glass-ui` (cascade boundary) | **1**, string-typed | `KfPillTabs.vue:17` `class="kf-pill-tabs glass-wash"`; `.glass-wash` resolves through `demo/styles/style.css:3` → `dist/styles/index.css` → `glass.css` → `glass/{material,ladder}.css`. |
| design tokens | **7** | `--radius-panel`, `--radius-lg`, `--type-small`, `--muted-foreground`, `--foreground`, `--duration-fast`, `--ease-standard` (glass-ui) + `--color-progress` (demo `style.css:163`). All 8 resolve; verified per-token. |

So the *entire* consumption surface of this component is **one CSS class name and eight custom properties**. It is a design-system consumer with no type-checked edge to the design system, and a keyframes.js demo component with no edge to keyframes.js. Everything below follows from that shape.

---

## 2. Defects

### C-1 · **BLOCKER** · The fork's rationale is void three ways — including the claim lane-frontend left open

`KfPillTabs.vue:2–12` is a 11-line docblock that is the component's entire warrant:

> `glass-ui 4.0.1's SegmentedTabs emits the orientation attribute UNCONDITIONALLY on its role=group pill variant (a WCAG breach on a non-composite container), so the demo carried an undefined-binding suppress that P-invariant-28 forbids carrying a 9th tranche.`

lane-frontend **S-1** already killed leg 1 (the emission is conditional in the installed 7.0.0, `dist/tabs.js:232`) and, in `§10` step 2, deliberately **left leg 2 open**:

> `Verify the role=group / role=tablist semantic choice survives the swap — the fork's secondary claim (that a panel-switcher wants role=tablist, not role=group) is a design argument that the 7.0.0 aria fix does not by itself answer.`

**I close it. 7.0.0 answers it with a first-class prop.** `dist/components/tabs/SegmentedTabs.vue.d.ts`:

```ts
/** The interaction semantic, independent of material. `toggle` exposes a
 *  group of pressed buttons; `tabs` exposes a tablist with selected tabs. */
export type SegmentedTabsSemantics = "toggle" | "tabs";
…
    /**
     * Interaction semantics, independent of `variant`. When omitted, preserves the
     * historical mapping: `pill` → `toggle`, `underline` → `tabs`.
     */
    semantics?: SegmentedTabsSemantics;
```

and the runtime honours it at `dist/tabs.js:229–232`:

```js
role: W.value ? "tablist" : "group",
"aria-label": p.ariaLabel,
"aria-orientation": W.value ? B.value ? "vertical" : "horizontal" : void 0,
```

`variant="pill"` + `semantics="tabs"` is *exactly* the artefact the fork hand-rolls: pill material, `role=tablist`, `role=tab` children, conditional `aria-orientation`. The historical `pill → toggle` default that produced the 4.0.1 complaint is now an explicit, overridable mapping — the producer generalised precisely along the axis the fork forked on.

Leg 3: the roving core. `dist/components/tabs/composables/useTabRovingFocus.d.ts` ships the same machine with a **wider** contract than `useKfPillTabs` — `activation: "automatic" | "manual"`, a decoupled `RovingSelectionOption` (`{value, disabled?}`) explicitly documented as accepting "any richer option … structurally assignable", and index-aligned `buttonRefs` instead of the fork's `parentElement`/`dataset` DOM crawl (`useKfPillTabs.ts:52–62, 89`). Its docblock names the anti-goal outright: *"ONE roving machine, never re-forked."*

And 7.0.0 carries four capabilities the fork has no analogue for: `responsive` (collapse to `<Select>` below a breakpoint — the real answer to C-4), `motion` with *"PRM forces `full → reduced` regardless (a11y absolute)"* (the answer to C-10), `icon`/`tooltip` on the option shape plus an `option` slot (the answer to C-5), and `activation: "manual"`.

**Net:** 217 lines and a bespoke keyboard machine stand against `<SegmentedTabs variant="pill" semantics="tabs">` — a single import of a type the demo *already* imports at three sites (lane S-2).

**Falsifier.** Any of: (a) `semantics` absent from the installed `SegmentedTabs.vue.d.ts`; (b) `dist/tabs.js` rendering `role` as a constant; (c) `pill` + `tabs` being rejected at runtime; (d) `useTabRovingFocus` not exported from the `./tabs` subpath. I checked (a)–(b) and (d) directly and all four legs hold; (c) is `UNPROVEN-NEEDS-LIVE` (the prop is typed and the render branch is `W.value`-driven, but I did not mount it).

---

### C-2 · MAJOR · `role=tab` with no `aria-controls`, and the API forecloses ever adding it

The component's headline claim (`KfPillTabs.vue:9–11`):

> `This strip is ARIA-correct BY CONSTRUCTION — a role=tablist of role=tab buttons (a panel switcher, the right pattern), where aria-orientation is a VALID, complete contract that needs no suppress.`

The tree does not support "complete".

```
$ grep -rn "aria-controls\|aria-labelledby" --include="*.vue" demo/
→ (no output)
```

**Zero** association attributes exist anywhere in the demo. Meanwhile the panels this strip switches are real and adjacent — `ChannelControls.vue:99`, `:131`, `:151` each render `role="tabpanel"` with `data-state` and a `tabindex`, and `demo/scenes/cube/CubeScene.vue:172` renders a fourth. Every one is an **orphan**: no `id`, no `aria-labelledby` back to its tab, and no tab pointing forward at it.

WAI-ARIA 1.2 makes the tab↔tabpanel association a SHOULD; the APG tabs pattern makes it a MUST (*"Each element with role `tab` has the property `aria-controls` referring to its associated `tabpanel` element"*). The concrete losses: the AT "move to panel" affordance is unavailable; `ChannelControls.vue:101` gives the revealed panel `tabindex="0"`, so it is a **focusable element with role `tabpanel` and no accessible name**.

The structural half is what makes this a consumption defect rather than a consumer bug: **`KfPillTabs` has no `id` prop, no per-option id derivation, and no slot** (`KfPillTabs.vue:53–59` — the props are exactly `options`, `modelValue`, `orientation?`, `ariaLabel?`; `:19–34` renders a bare `v-for` with no `:id`). A consumer that *wanted* to wire the pattern has no seam to hang it on. The fork replaced a component whose stated sin was one over-emitted attribute with a component that cannot express the pattern's required attribute at all.

**Falsifier.** An `aria-controls`/`id` binding in `KfPillTabs.vue`, an `id` on any `role=tabpanel` in `ChannelControls.vue`, or an authoritative reading that ARIA 1.2 exempts a tablist whose panels are DOM-adjacent. The first two are settled by the greps above; I hold the third open but note the APG text is unambiguous.
**Note.** I deliberately do **not** call this a WCAG SC failure. `role=tablist`/`tab`/`aria-selected` alone satisfies 4.1.2 for the tabs themselves; the gap is APG-completeness plus an unnamed focusable panel. That is why this is MAJOR and not BLOCKER.

---

### C-3 · MAJOR · The wrong glass rung — a plate where the system ships a track

`KfPillTabs.vue:17` opts into `.glass-wash`. `dist/styles/glass/ladder.css` defines that rung as a **panel plate**:

```css
.glass-wash { position: relative; --glass-bg-rung: var(--glass-bg-wash);
  background: var(--glass-plate-tinted); backdrop-filter: var(--glass-blur-wash);
  border: 1px solid var(--glass-border-accent);
  box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); }
```

and `dist/styles/glass/material.css` adds, for that rung only:

```css
.glass-wash, .glass-quiet, .glass-resting, .glass-card { contain: paint; }
```

glass-ui's **own** pill strip does not use it. `dist/tabs.js:236` composes the strip root with `!M.value && "glass-capsule-track"`, and `dist/styles/glass/glass-capsule.css` defines that as a *control track* — no border, no `contain`:

```css
.glass-capsule-track { background: var(--glass-bg-quiet);
  backdrop-filter: var(--glass-blur-quiet);
  box-shadow: var(--glass-rim-top), var(--glass-rim-bottom),
              inset 0 1px 2px var(--tab-track-recess-ink); }
```

Three consequences, all static:

1. **Nested double material.** `ChannelControls.vue:56` already wraps the strip in `… glass-wash rounded-panel px-2 py-0.5 overflow-hidden`. The strip then paints a *second* `glass-wash` immediately inside the first: two `backdrop-filter` layers, two `1px solid` borders, two rim shadows, and two specular `::before` pseudo-elements (`material.css` gives every rung a conic+radial specular layer with `mix-blend-mode: plus-lighter`). The ladder is a ladder — rungs are meant to stack across depth, not against themselves.
2. **The focus ring is clipped.** `contain: paint` clips descendants at the padding edge. The root's padding is `0.125rem` = **2px** (`:86`); the focus ring is `outline: 2px` at `outline-offset: 1px` (`:120–122`) and therefore extends **3px** beyond each button. 3 > 2 → the outermost **1px of the ring is clipped on all four edges of every tab**. `glass-capsule-track` — the rung the system intends here — carries no `contain`, which is very likely *why*.
3. **The coupling has no failure mode.** This is the only glass-ui edge the component has, and it is an unversioned, untyped string. Under lane `F-1` (glass-ui absent from both `package.json` and `package-lock.json`) there is neither an import that would fail loudly nor a declaration that would pin the contract. If glass-ui renames or re-tiers `.glass-wash`, the strip silently loses its material with a green build and a green typecheck. A `<SegmentedTabs>` import would make the same coupling both type-checked and version-pinned.

**Falsifier.** (1) dies if the wrapper's `glass-wash` is removed or the two rungs compose to one plate at runtime — `UNPROVEN-NEEDS-LIVE`, though the two `::before` layers and two `1px` borders are declarative. (2) dies if paint containment is shown not to clip `outline` (spec says the overflow clip edge is the padding box, and `outline` paints outside the border box), or if a live screenshot shows an unclipped ring — `UNPROVEN-NEEDS-LIVE` for the pixel, static for the arithmetic. (3) dies if `@mkbabb/glass-ui` gains a declaration in `package.json` (it has not: `grep -n "mkbabb" package.json` → only `"@mkbabb/value.js": "4.0.0"` at `:69`).

---

### C-4 · MAJOR · No scroll port — the consumer's overflow seam is inert and clipped tabs are pointer-unreachable

The consumer wires a full overflow apparatus around this strip:

- `ChannelControls.vue:56` — wrapper is `w-fit … **overflow-hidden**`;
- `ChannelControls.vue:81` — `:class="['w-fit max-w-full min-w-0', overflowClass]"` on the strip;
- `useTabStripScroll.ts:71–72` — resolves the measured element by `querySelector("[role=tablist]")`, i.e. **KfPillTabs' own root**;
- `useTabStripScroll.ts:52–55` — `scrollIntoView({ block:"nearest", inline:"nearest" })` on `[role=tab][aria-selected=true]`;
- `ChannelControls.vue:441–455` — three `.tabs-overflow-*` mask rules keyed on the fade class.

`KfPillTabs.vue:80–86` declares the root as `display: inline-flex` with **no `overflow` property**, and `:89` pins every tab `flex-shrink: 0`. Therefore:

- **The strip has no scrolling box.** `scrollLeft` is permanently `0`, so `useScrollFade.check()`'s start branch (`scrollEl.scrollLeft > threshold`, `useScrollFade.ts:97`) can never be true — the `tabs-overflow-left` and `tabs-overflow-both` rules are **dead by construction**.
- **Nothing on the strip can scroll.** `scrollIntoView(inline:"nearest")` finds no scroll port at the strip and retargets to an ancestor — the `overflow-y-auto` content column (`ChannelControls.vue:85`) or the page. A tab-switch therefore risks a smooth *page* scroll rather than a strip scroll. `UNPROVEN-NEEDS-LIVE` for the observed scroll target; static for the absence of a port.
- **Clipping is the guaranteed failure mode, not squeezing.** `flex-shrink: 0` forbids compression; the wrapper is `overflow-hidden`; so once `stripOptions` exceeds the available width the surplus tabs are cut off with **no pointer affordance to reach them**. The DFA can reach 4 options (`controls` + `keyframes` + `timeline` + a facet such as `matrix-controls`/`Curve`/`Physics` — `controlSurfaces.ts:51–55, 145–160`), and the mobile host is a `<Drawer>` (`ControlsPaneWrapper.vue:166`). Keyboard users are unaffected — `focusTab`'s `.focus()` (`useKfPillTabs.ts:61`) will scroll an `overflow:hidden` box programmatically — which makes this a **pointer-only** loss and thus easy to miss in the keyboard-focused test.

The producer's answer to exactly this is the `responsive` prop (`SegmentedTabs.vue.d.ts`: *"BELOW it the strip collapses to a `<Select>`"*), which the fork forfeits.

This **extends lane S-2**, which flagged `useTabStripScroll.ts:23/47` as *stale prose*. It is worse than stale: the prose describes a vendor-DOM contract (`[role=tablist]` on a `<SegmentedTabs>` strip) that the fork changed underneath it, and the plumbing has been measuring a node that cannot answer since the swap.

**Falsifier.** An `overflow-x` declaration on `.kf-pill-tabs` (there is none — `:80–86`), a `min-width: 0`-driven shrink path (blocked by `flex-shrink: 0` at `:89`), or a live measurement showing `overflowClass` non-empty and the strip scrolling. Note I deliberately do **not** claim the *right*-fade is dead: `scrollWidth` semantics for `overflow: visible` vary by engine, so the fade may or may not paint — `UNPROVEN-NEEDS-LIVE`. The unscrollability does not depend on that.

---

### C-5 · MAJOR · The option contract is a lossy narrowing of a type the demo already imports

Three types describe the same descriptor in one cluster:

| type | shape | site |
|---|---|---|
| `ControlSurfaceTab` | `{value, label, icon}` | `demo/state/controlSurfaces.ts:145–160` (`SURFACE_META`) |
| `SegmentedTabOption` | `{label, value, icon?, disabled?, tooltip?}` | `@mkbabb/glass-ui/tabs` — imported type-only at 3 demo sites (lane S-2) |
| `KfPillTabOption` | `{label, value, disabled?}` | `KfPillTabs/useKfPillTabs.ts:23–27` |

`KfPillTabOption` is a strict **subset** of the glass type the demo already depends on. The narrowing is silently lossy in two live paths:

1. **Machine path.** `ChannelControls.vue:299–303` builds `builtInTabs` as `SURFACE_META[s]` — descriptors that carry `icon: "SlidersHorizontal" | "Braces" | "Clock" | "Activity" | "Grid3X3"`. TypeScript accepts the wider object into `KfPillTabOption[]` (non-fresh assignment), and `KfPillTabs.vue:33` renders `{{ opt.label }}` and nothing else. **Every icon is dropped.**
2. **Standalone path.** `EditorShell.vue:169` → `:84` → `AnimationControlsGroup.vue:173` → `:30` → `ControlsPaneWrapper.vue:198` → `:65` → `ChannelControls.vue:271`. The first three declare `extraTabs?: SegmentedTabOption[]`; the fourth re-declares it `extraTabs?: KfPillTabOption[]`. So `icon` **and** `tooltip` travel four components and are discarded at the fifth.

And the drop is unrecoverable at the call site: `KfPillTabs.vue` exposes **no slots at all**. glass-ui's `SegmentedTabs` exposes an `option` slot (`SegmentedTabs.vue.d.ts` → `__VLS_Slots = { option?: (props: {option, active}) => any }`).

The cost is real drift, against an explicit no-drift claim. `ChannelControls.vue:285–286` says *"Reading the SAME projection the dock reads keeps the two tab hosts in lockstep — one authority, no drift."* The sibling host honours the full descriptor: `ChromeDock.vue:292`, `:299`, `:313–315` all render `<component :is="TAB_ICONS[tab.icon]">`. So the **same** `SURFACE_META` row renders *icon + label* in the dock and *label only* in the pane. The authority is shared; the rendering is not.

**Falsifier.** An icon binding in `KfPillTabs.vue` (none — `:19–34`), a slot declaration (none), or `SURFACE_META` rows without `icon` (all six carry one, `controlSurfaces.ts:146–159`). Whether the missing icons are *desirable* here is a design call for SS-13 — `UNPROVEN-NEEDS-LIVE`; the **inconsistency between the two hosts** is static.

---

### C-6 · MINOR · A promised re-export that does not exist

`KfPillTabs.vue:41–42`:

> `KfPillTabOption is re-exported so \`import type { KfPillTabOption } from ".../KfPillTabs.vue"\` keeps resolving.`

```
$ grep -n "export" demo/components/instrument/transport/KfPillTabs.vue
41:// tablist host — the useToolbarKeyboard precedent. KfPillTabOption is re-exported
```

The only match is the sentence making the claim. Line 44 is `import type { … }` — an import, not a re-export — and `<script setup>` carries no other export. The promised specifier does not resolve.

The tree corroborates: the **sole** consumer routes the type through the F-5 shim instead — `ChannelControls.vue:229–230` imports the *component* from `../KfPillTabs.vue` and the *type* from `../composables/useKfPillTabs` on adjacent lines. lane-frontend F-5 called that pairing "incoherent"; C-6 supplies the **cause** — the coherent path the comment advertises was never implemented, so the shim is load-bearing after all. That reorders lane `§10` step 3: deleting the shim requires repointing `:230` at `../KfPillTabs/useKfPillTabs`, **not** at `../KfPillTabs.vue`.

**Falsifier.** Any `export`/`export type` of `KfPillTabOption` in the SFC, or a working import of the type from the `.vue` path.

---

### C-7 · MINOR · A dead async barrel registration with a rationale that does not apply

`transport/index.ts:12`:

```ts
export const KfPillTabs = defineAsyncComponent(() => import("./KfPillTabs.vue"));
```

```
$ grep -rn "KfPillTabs" --include="*.vue" --include="*.ts" demo/
→ 17 hits: 2 stale prose (scenes/spring), 1 barrel decl, 3 self-refs, 4 composable-internal,
  3 shim, 4 ChannelControls (2 prose + 1 tag + 1 direct import)
```

Nothing imports it. The only re-export is the blanket `components/instrument/index.ts:24 export * from "./transport"`, which no file consumes for this symbol. The render site imports the SFC **directly** (`ChannelControls.vue:229`), so the async wrapper is bypassed.

The barrel's own docblock (`index.ts:1–5`) justifies laziness by weight — *"Heavy SFCs are re-exported LAZILY … so importing this barrel never eager-loads the control facility's downstream Monaco/highlight.js chunk"*. KfPillTabs is 124 lines whose entire dependency set is `vue`. It sits alongside `AnimationControlsGroup` and `TransportDock` under a rationale that describes neither its weight nor its usage. Dead export + mis-applied laziness; it vanishes with the component if C-1 lands.

**Falsifier.** Any `import { KfPillTabs } from` against the transport or instrument barrel.

---

### C-8 · MINOR · `orientation` and `disabled` are dead — including the prop the header cites as its warrant

`KfPillTabs.vue:56–57` annotates `orientation` as *"Valid on `role=tablist` (default horizontal) — the complete WCAG contract"*, and the header (`:10–11`) makes that validity the fork's differentiator. In the tree:

- **`orientation` is never bound.** The sole render site (`ChannelControls.vue:74–82`) passes `options`, `model-value`, `aria-label`, `@update:model-value`, `@pointerenter`, `@focusin`, `:class`. No `orientation`. It is always the `"horizontal"` default.
- **`disabled` is never set.** `stripOptions` (`ChannelControls.vue:313–324`) is `SURFACE_META` rows plus `{value,label}` projections of `extraControlTabs()`; `SURFACE_META` (`controlSurfaces.ts:145–160`) has no `disabled` field. So `useKfPillTabs`' whole `enabled()` filter (`:38`) runs over an always-total set in production.

Two second-order points follow. First, `aria-orientation="horizontal"` is the **ARIA default value** for `tablist`, so the always-emitted attribute is semantically inert — the "complete contract" is, in practice, a no-op. Second, and pointedly: `KfPillTabs.vue:15` `:aria-orientation="orientation"` with a non-`undefined` default emits the attribute **unconditionally** — the exact word `:6` uses to condemn 4.0.1. The fork did not fix conditionality; it changed the `role` so the unconditional emission became legal. That is a real fix, but it is not the fix the docblock claims, and it is precisely the fix 7.0.0's `semantics` prop now provides (C-1).

**Falsifier.** Any call site binding `:orientation`, or any option source setting `disabled: true`. Both greps are clean. Note this does **not** condemn the composable's coverage of those branches — see S-A; the test suite exercises both, which is why they are correct-but-unexercised rather than untested.

---

### C-9 · MINOR · `transition: font-weight` — layout motion inside a comment claiming there is none

`KfPillTabs.vue:101–105`:

```css
/* Narrow transition (no `all`) — only the activation channels change. */
transition:
    color var(--duration-fast) var(--ease-standard),
    background var(--duration-fast) var(--ease-standard),
    font-weight var(--duration-fast) var(--ease-standard);
```

`font-weight` interpolates by computed value (CSS Fonts 4), so a 500→600 activation (`:99` vs `:117`) animates glyph advance widths for the whole transition. Consequences: the pill's intrinsic width animates → the `inline-flex` strip's width animates → the `w-fit` wrapper's width animates, once per tab switch, on a strip whose two ends are simultaneously reflowing. `contain: paint` (C-3) does not contain layout. And `useTabStripScroll.reMeasure()` runs its measurement on `nextTick` (`:58–63`) — i.e. at transition frame 0 — so it reads the pre-transition geometry every time.

`color` and `background` are the compositable "activation channels" the comment describes; `font-weight` is the one property in the list that reflows. Two of three declarations honour the stated discipline.

**Falsifier.** A live measurement showing no advance-width delta between 500 and 600 in the resolved family (`UNPROVEN-NEEDS-LIVE` — plausible only if the family resolves to a static face, in which case the *transition* is a no-op and the property is merely dead). The property-choice defect is static regardless.

---

### C-10 · MINOR · No `prefers-reduced-motion` guard

`KfPillTabs.vue:76–124` carries no `@media (prefers-reduced-motion: reduce)` block. Against lane-frontend `§6.5`, which counts **13** PRM enforcement sites across 12 demo files (10 CSS blocks + 3 JS queries) — a demo whose motion discipline is otherwise conscientious. And against the primitive it forked from, where PRM is structural rather than per-consumer: `SegmentedTabs.vue.d.ts` documents *"PRM forces `full → reduced` regardless (a11y absolute)"*.

Weight is honest here: a 150 ms colour crossfade is not a vestibular hazard. The reason it is a defect and not noise is C-9 — the transition list includes a **layout-affecting** channel, which is the kind of motion PRM exists for, and this file is the demo's most-used control affordance.

**Falsifier.** A PRM block reaching `.kf-pill-tab` from `demo/styles/*.css` (the 10 CSS sites are enumerated in lane §6.5 and none targets this selector), or a global `transition: none` under PRM in the glass cascade — I did not exhaustively probe glass-ui's `transitions.css` for a universal reduce rule, so this claim is **conditional on that file not carrying one**.

---

### C-11 · INFO · Two guards of different shape, one bypassed

`KfPillTabs.vue:63–65` guards the click path:

```ts
const select = (value: string) => {
    if (value !== modelValue) emit("update:modelValue", value);
};
```

`:72` hands the composable a **raw, unguarded** emit — `select: (value) => emit("update:modelValue", value)` — and the composable re-implements the guard itself at `useKfPillTabs.ts:87` (`if (target.value !== params.modelValue()) params.select(target.value)`). Behaviour agrees; the shapes do not. The keyboard path never traverses the SFC's `select`, so a future edit to one guard silently diverges from the other. INFO, not a defect of behaviour.

**Falsifier.** A path where the two guards disagree today — I found none.

---

## 3. Superlatives (L-18 both ways)

### S-A · The roving core is correct *and* genuinely gated

Two things are unusually right here.

`useKfPillTabs.ts:46–50` makes the strip **structurally Tab-reachable**: the roving stop is the selected enabled tab *or*, when `modelValue` matches nothing enabled, the first enabled tab; `undefined` only when no enabled tab exists. Most hand-rolled roving strips lose their tab stop on an empty/cleared model and drop out of the focus order entirely. This one cannot.

And the gate is real, not a shape assertion. `test/demo/instrument/KfPillTabs.test.ts` mounts a representative tablist **into `document.body`** so jsdom `activeElement` is live (`:93–97`), dispatches real `KeyboardEvent`s (`:109–111`), and asserts focus **and** selection together across 7 cases: single tab stop, third-tab reachability, wrap at both ends, Home/End, disabled-skip, vertical axis, empty-`modelValue` stop. It carries a recorded BITE (`:20–22`: *"revert the `focusTab` call → the 'third tab reachable' assertion reds"*), and it exists because a real HIGH defect (a12 F1 — arrows moved selection but not focus, collapsing traversal one hop and stranding the third tab) shipped and was caught. That is a component that got **more** rigorous after being bitten.

**Falsifier (this cuts against me).** If the assertions passed against a stub, or if `focusedValue()` read a value the handler set rather than `document.activeElement` — it reads `document.activeElement` (`:106–107`). If C-1 lands, this gate should migrate to `useTabRovingFocus`, not be deleted: it is the fork's most transferable asset.

### S-B · The DFA seam is closed — focus and selection cannot desync

I went looking for a recurrence of the a12 F1 class through the projection seam, and it is **not there**. The hypothesis: `useKfPillTabs.onKeydown` moves DOM focus to `target.value` (`:89`) while the consumer writes `projectPick(target.value)` (`ChannelControls.vue:403`) — if `projectPick` were ever non-identity, focus would land on a tab whose `tabindex` had just flipped to `-1`, reproducing the original bug through a different door.

It cannot. `projectPick` → `machine.selectedControlSurface(pick)` → `selectedSurfaceFrom(activeSurfaces, pick)` (`controlSurfaces.ts:206–213`), which returns `preferred` **verbatim** whenever `surfaces.includes(pick)`. And every strip option is drawn from that same set: `builtInTabs` is `BUILT_IN_SURFACES` filtered by `machine.controlSurfaces` (`ChannelControls.vue:299–303`), and the extras are `extraTabsFrom(activeSurfaces)` (`controlSurfaces.ts:189–195`). The strip's option domain is a **subset** of the projection's fixed-point set, so `projectPick` is the identity on it. On a standalone host it is the identity by definition (`useSelectedControlSurface.ts:109–112`).

**Falsifier.** A strip option whose value is outside `machine.controlSurfaces.value` — the only candidate is the `extraTabs` prop on a standalone host, where `projectPick` is unconditionally the identity anyway. So the seam is closed on both branches.

### S-C · Zero library surface — R1 is unreachable here

lane-library `§4.6` names `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)` as the R1 crash surface, and the megatranche's standing question is where value.js's parser is transitively exposed through demo components. **Not here.** The full import set is `vue` (`useKfPillTabs.ts:1`) and the colocated composable (`KfPillTabs.vue:43–44`). Every colour the component computes is `color-mix(in srgb, …)` (`:113`, `:118`) — resolved by the user agent, never by value.js. There is no `parseCssColor`, no `parseCssScalar`, no `@kf-engine` edge, no engine-driven animation.

Stated plainly because a false negative here would be costly: **the R1 parser crash class has no reachable path through KfPillTabs.**

The same fact is worth one INFO-weight counterpoint rather than a defect: this is a component in the *keyframes.js* demo, whose motion is hand-written CSS `transition`. lane-frontend `S-8` records that `TypingDots` is justified bespoke precisely *because* it dogfoods the engine ("the inv-ζ seam"). KfPillTabs is the mirror image — bespoke and **not** dogfooding. For a control affordance that is the correct call (KISS; a CSS transition is the right tool for a 150 ms pill crossfade), so I do not file it as a defect. It does mean the component earns no library coverage to offset its 217-line cost, which is one more input to C-1's ledger.

**Falsifier.** Any `@mkbabb/value.js`, `@mkbabb/keyframes.js`, or `@kf-engine` specifier in either file — `grep -n "^import\|from \""` over both returns three lines, all listed above.

---

## 4. Hypotheses I killed (do not re-chase)

1. **"Fallthrough listeners are dropped."** `ChannelControls.vue:79–80` binds `@pointerenter` / `@focusin` on `<KfPillTabs>`, which declares only `update:modelValue` in `defineEmits` (`:61`). I expected a silent drop. It is fine: the SFC has a single root and default `inheritAttrs`, so both land as native listeners on the `role=tablist` div. `pointerenter` fires on entry to that box; `focusin` bubbles from the tab buttons. The keyframes-pane warm seam works.
2. **"`focusTab`'s DOM crawl breaks under fallthrough classes."** `useKfPillTabs.ts:52–62` resolves the button by walking `(e.currentTarget).parentElement.children` and matching `dataset.value`. Fragile (it hard-codes the buttons as direct children of the root and would break if a slot or indicator element were ever added — a real reason to prefer `useTabRovingFocus`' index-aligned `buttonRefs`), but **correct against today's template** (`KfPillTabs.vue:19–34` renders the buttons as the root's only children, each keyed with `:data-value`). Not filed as a defect; recorded as a fragility that C-1's migration retires.
3. **All eight custom properties resolve.** I checked each against the installed cascade rather than assuming, because a `var()` substitution failure in the un-fallbacked `transition` shorthand (`:102–105`) would drop **all three** channels at once. `--duration-fast` → `dist/styles/tokens/scheme-motion.css`; `--ease-standard` → `tokens/scheme-spring.css` + `theme/bridges.css`; `--radius-panel`/`--radius-lg` → `theme/radius.css`; `--type-small` → `typography/scale.css`; `--muted-foreground` → `glass/ladder.css`; `--color-progress` → `demo/styles/style.css:163`. No missing token. Worth noting the inconsistency only: `--radius-panel`, `--type-small` and `--color-progress` carry fallbacks while `--duration-fast`/`--ease-standard` — the two whose failure would be *total* — do not.

---

## 5. Disposition on this axis

The CONSUMPTION verdict is **retire, and fold the gate**. lane-frontend S-1 ranked this RED on a stale-rationale argument; this challenge closes the one leg S-1 left open (`semantics="tabs"`, C-1) and adds five independent consumption defects that the swap resolves as a side effect:

| defect | what `<SegmentedTabs variant="pill" semantics="tabs">` does with it |
|---|---|
| C-3 wrong rung | uses `glass-capsule-track` — no `contain: paint`, no double border |
| C-4 no scroll port | `responsive` collapses the strip to a `<Select>` below a breakpoint |
| C-5 lossy options | `SegmentedTabOption.icon`/`.tooltip` + an `option` slot |
| C-8 dead props | `orientation`/`disabled` are the primitive's problem, exercised across its consumers |
| C-10 no PRM | `motion` axis, *"PRM forces full → reduced regardless"* |

C-2 (`aria-controls`) is the one defect the swap does **not** fix — glass-ui's strip does not own the panels either. It wants its own item in the wave: give the tabs and the four `role=tabpanel` sites (`ChannelControls.vue:99/131/151`, `CubeScene.vue:172`) reciprocal `id` / `aria-controls` / `aria-labelledby`.

Sequencing is unchanged from lane `§10`: **F-1 first** (glass-ui is undeclared in both `package.json` and `package-lock.json`; nothing here is reproducible until it lands), then S-1, then F-5 — with C-6's correction that the shim repoint targets `../KfPillTabs/useKfPillTabs`, not the `.vue`. Carry `test/demo/instrument/KfPillTabs.test.ts` across; it is the fork's best artefact (S-A) and it drives a composable contract `useTabRovingFocus` satisfies.
