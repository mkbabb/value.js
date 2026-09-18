claude-opus-5[1m]

# CHALLENGE · KfPillTabs · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/KfPillTabs.vue` (124 lines)
**Method** static + source-derived only. No browser. Every contrast ratio is computed from the resolved token graph by WCAG 2.x relative luminance and is reproducible from §0; claims that genuinely need pixels are tagged **UNPROVEN-NEEDS-LIVE** for SS-13.

Read whole, read-only:

| file | why |
|---|---|
| `demo/components/instrument/transport/KfPillTabs/useKfPillTabs.ts` (93) | the only import |
| `demo/components/instrument/transport/composables/useKfPillTabs.ts` (4) | re-export shim |
| `demo/components/instrument/transport/index.ts` | async barrel export |
| `demo/components/instrument/transport/channel-controls/ChannelControls.vue` | the sole render site |
| `.../channel-controls/composables/useTabStripScroll.ts` | the strip's overflow plumbing |
| `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue`, `AnimationControlsGroup.vue`, `injectionKeys.ts`, `demo/app/App.vue`, `demo/app/main.ts` | the render chain + the `provide` that governs it |
| `demo/state/controlSurfaces.ts` | `SURFACE_META`, the option source |
| `demo/styles/{style.css, tab-idiom.css, design-idioms.css, playback-idiom.css, font-roles.json}` | demo token + idiom authority |
| `node_modules/@mkbabb/glass-ui@7.0.0/dist/styles/{glass/ladder.css, theme/radius.css, tokens/*, accessibility.css, transitions.css, animations.css}` | every token the SFC reads |
| `test/demo/instrument/KfPillTabs.test.ts` | what is (and is not) gated |

**Tally — 24 defects · 2 BLOCKER · 8 MAJOR · 12 MINOR · 2 INFO · 4 superlatives.**

**Prior** — assume defective until the tree proves otherwise. **Counter-discipline** — a false defect is worse than a missed one. Four things I went hunting for and could **not** stand up are recorded in §4 as *cleared*, not dressed up as findings.

---

## 0. Fold of the hitherto corpus + token resolution

### 0.1 Corpus

| id | what it said | this challenge |
|---|---|---|
| `lane-frontend.md` **F-1** | `@mkbabb/glass-ui` is a phantom dep — absent from `package.json` **and** the lock, yet 7.0.0 sits in `node_modules` | **CONFIRMED independently.** `package.json` `dependencies` = `{"@mkbabb/value.js":"4.0.0"}`, sole entry; `require(".../glass-ui/package.json").version` → `7.0.0`. Standing caveat on every ratio below: the substrate is **unpinned**. Not re-filed as mine. |
| **S-1** | KfPillTabs forks `SegmentedTabs` over a 4.0.1 ARIA bug fixed in 7.0.0; 217 lines; verdict **replace** | **CONFIRMED** and folded into D-10. |
| **S-1 tail** — "the fork's *secondary* claim (a panel switcher wants `role=tablist`, not `role=group`) is a **design** argument the 7.0.0 aria fix does not by itself answer" | open question left to this axis | **ANSWERED — see D-6.** Whichever role wins, the tab↔panel association is missing in *both* directions today, so the swap must specify it rather than inherit it from either implementation. |
| **S-1 liveness** — "rendered at `ChannelControls.vue:74`" | treats the fork as live | **CONTRADICTED — see D-1.** The render *site* exists; the render never *happens*. The `<KfPillTabs` grep stops one line short of the `v-if` at `:56`. A prior D-axis pass at this path reached the same conclusion; I re-derived the full chain independently below rather than take it, and it holds. |
| **S-2** | stale `<SegmentedTabs>` prose in `ChannelControls.vue` / `useTabStripScroll.ts` | **CONFIRMED**, extended into D-10 and D-18 (the rot reaches `font-roles.json` and the SFC's own header). |
| `lane-frontend.md:553` | the 4-line back-compat shim pair violates `feedback_no_backwards_compat` | **CONFIRMED**, D-17. |
| `U/audit/lane-03-t-verdict-trace.md` **F-6** | the `Kf` vanity surface the owner derided survives behind an external-blocked defer | **CONFIRMED**, and D-15 notes it is now load-bearing in the *CSS* surface (`font-roles.json:31-34` selects on `.kf-pill-tab`). |
| `lane-library.md` (parse seams) | — | no overlap; this component touches no parser surface. |

### 0.2 Tokens (so every number below is checkable)

```
--radius-panel  → --radius-xl = 12px            (glass-ui theme/radius.css)
--radius-lg     → --radius    = 0.625rem = 10px (glass-ui theme/radius.css)
--type-small    = clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)   → 14px … 20px   (fluid)
--type-body     = clamp(1rem,     0.92rem + 0.27vw, 1.375rem)                 (fluid)
--duration-fast = 0.2s ;  --ease-standard = var(--motion-ease-standard)
--color-progress → --accent-kf = light-dark(oklch(.56 .17 295), oklch(.74 .13 305))  (style.css:130,163)
--card       = light-dark(hsl(30 85% 96%), hsl(26 22% 17%))
--foreground = light-dark(hsl(24 10% 10%), hsl(30 14% 90%))
```

`.glass-wash` (glass-ui `glass/ladder.css`) additionally declares, **on the element itself**:
`border: 1px solid var(--glass-border-accent)` · `backdrop-filter: var(--glass-blur-wash)` (dark arm carries `brightness(1.18)`, `tokens/dark-arm-glass.css`) · `background: var(--glass-plate-tinted)`; and the `:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)` rule repoints **`--muted-foreground → var(--on-glass-muted)`** = `hsl(34 16% 72%)` dark / `hsl(30 26% 35%)` light.

Relative luminance of the resolved surfaces:

```
dark  plate ≈ --card  hsl(26 22% 17%)   Y = 0.02527
dark  --on-glass-muted hsl(34 16% 72%)  Y = 0.49343
dark  --foreground     hsl(30 14% 90%)  Y = 0.79145
light plate ≈ --card  hsl(30 85% 96%)   Y = 0.92218
light --on-glass-muted hsl(30 26% 35%)  Y = 0.11056
```

The strip's plate is ≥ 79 % `--card` (`--glass-bg-wash` at `--glass-level: 0.3`) and sits on a **second** `.glass-wash` plate (D-5), composite ≥ 95 % `--card`. Treating the backdrop as `--card` is therefore the correct limit, not a convenience — and D-2 shows the conclusion is backdrop-independent anyway.

---

## 1. BLOCKERS

### D-1 · BLOCKER — `<KfPillTabs>` **never renders in the shipped demo**. The entire design surface under audit is unobservable.

The render chain, walked end to end:

```
demo/app/main.ts:32          createApp(App)                       ← the only createApp in the tree
demo/app/App.vue:169         provide(TABS_EXTERNALLY_MANAGED_KEY, true)
                             // "Tabs in the controls pane are managed via the ChromeDock controls tab dropdown"
  ↓ (setup top level, unconditional → whole subtree)
AnimationControlsGroup.vue:18    <ControlsPaneWrapper …>
ControlsPaneWrapper.vue:50         <ChannelControls …>
ChannelControls.vue:277              inject(TABS_EXTERNALLY_MANAGED_KEY, false)  → true
ChannelControls.vue:56               <div v-if="!tabsExternallyManaged" …>       → FALSE
ChannelControls.vue:74                 <KfPillTabs … />                          ← never mounted
```

Each link verified by grep, not inference:

* `TABS_EXTERNALLY_MANAGED_KEY` has **exactly one** `provide` in `demo/` and `test/` — `App.vue:169`, the literal `true`. The `false` at `ChannelControls.vue:277` is the *inject default*, reachable only with no providing ancestor.
* `<ChannelControls>` has **exactly one** render site — `ControlsPaneWrapper.vue:50`.
* `<ControlsPaneWrapper>` has **exactly one** render site — `AnimationControlsGroup.vue:18`.
* **one** `createApp` — `main.ts:32`, mounting `App`. `EditorShell.vue` (the "STANDALONE host / playground" the comments repeatedly invoke as the `tabsExternallyManaged === false` path) contains **no** reference to `ChannelControls`, `ControlsPaneWrapper`, or the key. The standalone host does not exist.

So the `v-if` at `:56` is false for every mount in the shipped application, and every finding below D-2 describes a surface no user has seen. The strip was superseded by the ChromeDock controls dropdown, and the branch was left behind.

This reframes the axis. The component is not *badly designed and shipping*; it is **217 lines of dead design surface** (SFC 124 + composable 93) carrying a 20-line rationale (D-10), a 4-line back-compat shim (D-17), an entry in `font-roles.json` (`:31-34`), a dead async barrel export (D-17), and a 7-case test file — all maintained for a branch that cannot execute. It also explains the corpus: lane-frontend **S-1** rated the fork *stale* and prescribed *replace*; the correct verdict is **delete**, and the swap onto `SegmentedTabs` + `useTabRovingFocus` that S-1 scoped is unnecessary work.

It also downgrades, honestly, every visual finding below to **latent** — true of the code, not currently true of anything a user perceives. I have kept D-2 at BLOCKER because it is the finding that must not survive a reinstatement; the rest are graded on that basis.

**Falsifier.** Any second `provide(TABS_EXTERNALLY_MANAGED_KEY, …)`; any `createApp` other than `main.ts:32`; any host that mounts `ChannelControls` / `ControlsPaneWrapper` outside `App`'s subtree; or a `provide` on the injection key with a value that is reactive rather than the literal `true`. Also killable by a Playwright/DevTools snapshot showing a live `[role=tablist].kf-pill-tabs` node in the running demo — the single cheapest disproof, and worth spending at SS-13.

---

### D-2 · BLOCKER — the "legible chip" measures **1.17 : 1 – 1.24 : 1** against its own track, and an 8 % tint cannot reach 3 : 1 at *any* backdrop.

`KfPillTabs.vue:115-119` — the active-state indicator is

```
background: color-mix(in srgb, var(--foreground) 8%, transparent);
```

painted on the `.kf-pill-tabs` `.glass-wash` plate (`:17`, `:80-86`). Composite the overlay and compute:

| arm | active chip Y | track Y | **contrast** |
|---|---|---|---|
| dark  | 0.04363 | 0.02527 | **1.244 : 1** |
| light | 0.77913 | 0.92218 | **1.173 : 1** |

The bound is structural, not incidental. An 8 % overlay of `--foreground` over the *most favourable possible* backdrop still cannot clear 3 : 1 — over pure black the chip lands **1.13 : 1**, over pure white **1.17 : 1**. There is no plate opacity, no `--glass-tint-strength-aa` value, no theme arm and no substrate that rescues an 8 % same-family tint. WCAG 2.2 SC 1.4.11 asks 3 : 1 of the visual information that identifies a component's *state*; this is off by ~2.5× and is not tunable into range without changing the percentage.

BLOCKER because it **falsifies the component's own reason to exist, in its own prose, twice**:

* `KfPillTabs.vue:77-79` — "The glass-track pill strip — **the legible chip register the user asked for** ("pills if tabs at all")".
* `ChannelControls.vue:57-62` — pill was chosen over `underline` because the underline "read as **an unlabeled divider**".

The rejected underline would have been `2px solid var(--foreground)` — **≈ 15 : 1** against the same plate. The replacement chosen *for legibility* is an order of magnitude less legible than the thing it replaced for being illegible. The owner's verdict ("pills if tabs at all") was applied to the **register** and not to the **visibility**, which is what the verdict was actually about.

This is the one finding that must not survive D-1's cleanup. If the strip is ever reinstated — or if S-1's swap lands and ports the recipe — the defect ships with it.

**Falsifier.** Render the strip, sample the computed `background-color` of `[data-state="active"]` and of `.kf-pill-tabs`, composite, compute. If the measured ratio is ≥ 3 : 1 the claim is dead. It cannot be, per the pure-black/pure-white bounds — *unless* some rule outside the scoped block overrides `.kf-pill-tab[data-state="active"] { background }`. I grepped `demo/` and `glass-ui/dist/styles/` and found none; that grep is the falsifier's real target.

---

## 2. MAJOR

### D-3 · MAJOR — `orientation="vertical"` ships a correct ARIA contract and correct keyboard over a layout that stays horizontal — and a green test certifies the working half.

Three quarters of vertical exist; the fourth does not.

| piece | where | state |
|---|---|---|
| `aria-orientation="vertical"` on the tablist | `KfPillTabs.vue:15` | ✅ ships |
| ArrowUp/ArrowDown remap | `useKfPillTabs.ts:67-69` | ✅ ships |
| a unit test asserting it | `KfPillTabs.test.ts:186` — *"a vertical strip navigates on ArrowUp/ArrowDown"* | ✅ green |
| **`flex-direction: column`** | `KfPillTabs.vue:80-86` | ❌ **absent** |

`.kf-pill-tabs` is `display: inline-flex` with no direction rule, and no `[aria-orientation="vertical"]` selector exists anywhere. I grepped every `.css`/`.vue` under `demo/` and every file under `glass-ui@7.0.0/dist/styles/` for `aria-orientation`: the only hits are three authors *emitting* it (`SquareScene.vue:59,69`, `KeyframesEditor.vue:67`, this file) and **zero rules consuming it**. A consumer passing `orientation="vertical"` gets a strip that reads top-to-bottom to a screen reader, navigates top-to-bottom on the arrows, and renders left-to-right to the eye.

This is the exact class of defect the component was built to kill. `KfPillTabs.vue:10-11` claims `aria-orientation` here is "a **VALID, complete** contract that needs no suppress"; the whole DM-5 CONTINGENCY-KILL rationale (`R/FINAL.md:40`) is that glass-ui 4.0.1 emitted an ARIA orientation its *structure* did not honour. KfPillTabs emits one its *stylesheet* does not honour. The band-aid was excised and the disease re-imported one layer down.

The green test at `:186` is the aggravating factor: it converts a latent gap into an active guarantee, so the next author reads "vertical is tested" and ships a vertical strip. It tests the keyboard core against a synthetic host and never touches the SFC's layout — correct as a unit test, misleading as a certificate.

Not BLOCKER only because of D-1 (the surface is unrendered) and because the sole call site never passes `orientation` (`ChannelControls.vue:74-82`).

**Falsifier.** Any rule — scoped, global, vendored — setting `flex-direction: column` (or `grid-auto-flow: row`) under `[aria-orientation="vertical"]`. Or a ruling that `orientation` is horizontal-only, which makes the prop, the keyboard branch and the test all dead weight instead.

---

### D-4 · MAJOR — hovering an inactive tab makes it visually indistinguishable from the selected tab.

`KfPillTabs.vue:111-119`:

```
[data-state="inactive"]:hover { color: var(--foreground); background: color-mix(… 5% …); }
[data-state="active"]         { color: var(--foreground); background: color-mix(… 8% …); font-weight: 600; }
```

Hover sets `color: var(--foreground)` — **the identical token the active state uses**. So between *inactive-hovered* and *active* exactly two deltas survive:

* chip 5 % vs 8 % → contrast **between the two chips** = **1.088 : 1** (dark; Y 0.03606 vs 0.04363). Imperceptible.
* `font-weight` 500 vs 600 at ~14 px.

With a pointer resting anywhere on the strip, the only surviving cue for "which tab am I on" is a 100-unit weight step at small size. Stacked on D-2 (the chip itself is 1.24 : 1), the practical outcome is that the selected tab is not identifiable while pointing at any tab.

Not BLOCKER: `aria-selected` (`:24`) keeps AT correct, and a 500→600 Jakarta step is genuinely visible side by side. But it is the **second independent collapse of the same signal**, and the two share a root cause — the design leans on a tint delta that carries no contrast.

**Falsifier.** Show hover does not raise inactive to `--foreground` — i.e. a later rule wins. None exists, and scoped styles are the last word for this element.

---

### D-5 · MAJOR — nested `.glass-wash`: two plates, two 1 px borders 2 px apart, two `backdrop-filter`s, `brightness(1.18)² = 1.39×` in the dark arm.

`ChannelControls.vue:56` wraps the strip in `<div class="… glass-wash rounded-panel px-2 py-0.5 overflow-hidden">`, and `KfPillTabs.vue:17` hard-codes `class="kf-pill-tabs glass-wash"` on its own root. Both resolve the same `glass/ladder.css` rule, so the rendered result is:

* **two** `border: 1px solid var(--glass-border-accent)` hairlines separated by exactly `py-0.5` = **2 px** vertically — a double-rule the glass ladder never intends (the ladder is a *depth* scale; two adjacent rungs of the same tier is not a position on it);
* **two** stacked `backdrop-filter: blur(…) saturate(…) brightness(1.18)` (`tokens/dark-arm-glass.css`) — filters composite multiplicatively, so content behind the strip is brightened **1.3924×** and blurred twice;
* **two** `--glass-plate-tinted` layers — 0.79 + 0.79·0.21 ≈ **0.956** effective opacity: the "glass" is 96 % opaque and the material reads as paint.

The component-side cause is that the tier is baked into the SFC's own class attribute (`:17`) instead of being the consumer's choice. **A control that may be nested cannot own its own glass rung.**

**Falsifier.** A rule suppressing `.glass-wash` on a `.glass-wash` descendant (`:where(.glass-wash) .glass-wash { … }`). No such de-duplication exists in `glass-ui/dist/styles/glass/*.css`. **UNPROVEN-NEEDS-LIVE** for the *visual* severity of the double hairline; the double declaration is confirmed from source.

---

### D-6 · MAJOR — `role="tab"` with no `aria-controls`, no `id` channel, and no way for a consumer to supply one; the panels carry no `aria-labelledby` either. *(this answers S-1's open design question)*

`KfPillTabOption` is `{ label, value, disabled? }` (`useKfPillTabs.ts:23-27`). The rendered button (`:19-34`) emits `role`, `aria-selected`, `tabindex`, `disabled`, `data-value`, `data-state` — no `id`, no `aria-controls` — and there is no prop, no slot, and no option field through which a consumer could add them.

Downstream, `ChannelControls.vue:97-102` and `:129+` render the panels as `role="tabpanel"` with `data-state` and `tabindex` and **no `id`, no `aria-labelledby`**. I grepped the whole file for `id=`, `aria-controls`, `aria-labelledby`: **zero hits**.

Both directions of the APG tab↔panel association are therefore absent, and the *component* is why the forward direction cannot be repaired without changing its public type. WAI-ARIA APG, Tabs: "Each element with role `tab` has the property `aria-controls` referring to its associated `tabpanel` element." A screen-reader user on the strip has no programmatic route to the panel it controls.

This is precisely the surface `:9` claims: "ARIA-correct **BY CONSTRUCTION**". It is ARIA-correct in the two respects the R.W6 kill was scoped to (role choice, orientation validity) and silently incomplete in the one that carries the pattern's utility.

**And this settles S-1's deferred question.** S-1 correctly noted that "a panel switcher wants `role=tablist`, not `role=group`" is a design argument the 7.0.0 aria fix does not answer. The answer: it does not matter which role wins, because the association is missing in **both** directions today. Any swap must *specify* `id` + `aria-controls` + `aria-labelledby` as part of its contract rather than inherit silence from either implementation.

**Falsifier.** Find `aria-controls` emitted on the tabs, or an id/controls field on `KfPillTabOption`, or an APG reading exempting a tablist whose panels are conditionally unmounted (`v-if`, `:98`). The last is the strongest defence — a dangling `aria-controls` to an unmounted node is its own defect — but the answer to that is `aria-labelledby` on the panel plus stable ids, not silence in both directions.

---

### D-7 · MAJOR — `font-weight` is in the transition set, so the whole `w-fit` strip changes width on every selection; and the one channel that produces motion has no `prefers-reduced-motion` guard.

`KfPillTabs.vue:102-105` transitions `font-weight` over `--duration-fast` (0.2 s); `:99` = 500, `:117` = 600. Glyph advances differ between the weights, so the active label's measured width changes. `.kf-pill-tabs` is `inline-flex` (`:81`) with `flex-shrink: 0` children (`:89`); the consumer sizes both the strip and its wrapper `w-fit` (`ChannelControls.vue:81`, `:56`). Nothing reserves the wider box — no `::after { content: attr(…); font-weight: 600; visibility: hidden }`, no grid-stacked pair, no `font-variation-settings` lock.

Selecting a tab therefore animates a **layout** property for 200 ms, reflowing every sibling pill and resizing the wrapper plate: a visible horizontal jitter of the whole chrome on each switch.

Two consequences ride on it:

* **PRM is unhandled, and here it genuinely matters.** There is no PRM block in this SFC, and glass-ui provides no universal guard — every `@media (prefers-reduced-motion: reduce)` in `glass-ui/dist/styles/` is class-scoped (`transitions.css`: `.fade-*`, `.pane-swap-*`, `.metric-swap-*`, `.dock-in`; `animations.css`: `.glass-top-layer`). A 200 ms colour crossfade is defensible under PRM; a 200 ms **reflow** is motion. The demo is otherwise scrupulous — 12 PRM blocks across `demo/scenes/` and `demo/components/` — so this is a local lapse, not house style.
* the comment at `:101` — "Narrow transition (no `all`) — only the activation channels change" — is *why* it survived review: narrowing the list was treated as the whole of the hygiene, and the one property that should never have been in the list stayed.

**Falsifier.** Show `font-weight` is not interpolated by the target engines (it is — CSS Fonts 4 types it animatable; engines snap to available instances for non-variable faces), **and** that the 500→600 snap does not change the advance width for the shipped Jakarta face. If both held, this degrades from a slide to a jump — still a reflow, one severity lower.

---

### D-8 · MAJOR — the skin is a near-verbatim fork of `tab-idiom.css`, and the fork has already drifted.

`demo/styles/tab-idiom.css:22-61` defines `.tab-trigger-base` + `.tab-trigger-pill` — the demo's **owned** pill idiom, deliberately unscoped, with `:9-18` explaining at length why it must stay unscoped *so non-owning components can carry the classes*. `KfPillTabs.vue:88-119` re-declares it:

| declaration | `tab-idiom.css` | `KfPillTabs.vue` |
|---|---|---|
| `flex-shrink: 0` | `:23` | `:89` identical |
| `background: transparent` | `:24` | `:90` identical |
| transition triple (`color`,`background`,`font-weight` @ `--duration-fast`/`--ease-standard`) | `:37-40` | `:102-105` **identical, comment and all** |
| inactive `color: var(--muted-foreground)` | `:42-44` | `:100` identical |
| hover `color: var(--foreground)` + `color-mix(… 5% …)` | `:45-47`, `:56-58` | `:111-114` identical |
| active `color` + `600` + `color-mix(… 8% …)` | `:48-51`, `:59-61` | `:115-119` identical |
| `border-radius: var(--radius-lg)` | `:54` | `:94` identical |
| **`padding`** | `0.375rem 0.75rem` | **`0.25rem 0.75rem`** ← drifted |
| **`font-size`** | `var(--type-body, 1rem)` | **`var(--type-small, 0.875rem)`** ← drifted |
| **`line-height`** | **`1.75rem` pinned** | **absent** ← dropped |

Eleven declarations copied, three diverged, one dropped — and the divergences are undocumented *as* divergences (`:95-97` explains the rung choice, never that it forks a shared idiom). Every future edit to the house pill skin must now be made twice, and `font-roles.json:31-34` already carries a second registry row (`pill-tab`) describing what is the same idiom.

`:77-79` claims the block is "the same look the retired SegmentedTabs pill carried, sourced from design tokens (**no re-authored colours**)". The colours *are* token reads — and the entire skin is re-authored around them. True on the narrowest reading; misleading on the one a reviewer takes.

**Falsifier.** Show `.tab-trigger-*` cannot be applied here — scoping or specificity blocking reuse. It does not: `tab-idiom.css:14-18` exists precisely to permit it.

---

### D-9 · MAJOR — `useTabStripScroll` designates `[role=tablist]` as its scroll container; `.kf-pill-tabs` is `overflow: visible` with unshrinkable children, so overflow tabs would be keyboard-reachable and pointer-unreachable.

`useTabStripScroll.ts:71-72` resolves `tabsHeaderEl.querySelector("[role=tablist]")` — i.e. `.kf-pill-tabs` — and hands it to `useScrollFade` as the overflow probe (`:39-44`); `:52-55` calls `scrollIntoView` on `[role=tab][aria-selected=true]`.

But `.kf-pill-tabs` (`:80-86`) declares no `overflow`, so it is `visible` — **not a scroll container**. Its children are `flex-shrink: 0` (`:89`) and there is no `flex-wrap`. The nearest scrollable ancestor is the consumer's wrapper, which is `overflow-hidden` (`ChannelControls.vue:56`) — programmatically scrollable, but with no scrollbar, no wheel affordance and no touch pan. On overflow:

* arrow-key traversal works (roving focus + native scroll-on-focus);
* pointer and touch cannot reach the clipped tabs at all;
* the `tabs-overflow-*` edge fade renders, advertising content the pointer cannot get to.

The consumer asserts overflow cannot happen ("the ≤4-tab control strip never overflows", `ChannelControls.vue:52-53`), and with the three built-in labels (Controls / Keyframes / Timeline ≈ 268 px at the 14 px floor) it does not at common widths. But `SURFACE_META` carries a 15-character `"Matrix Controls"` (`controlSurfaces.ts:156-160`), `--type-small` is fluid to 20 px (D-11), and `extraTabs` is an open injection point — so the "never" is a viewport-and-label assumption, and the machinery built to survive its violation does not work. It is also, per D-1, machinery attached to a node that never mounts.

**Falsifier.** **UNPROVEN-NEEDS-LIVE** for overflow *occurring*. Confirmed from source for the mechanism: `useScrollFade` is pointed at a node whose computed `overflow` is `visible`, with no user-scroll seam. Killed by adding `overflow-x: auto` to `.kf-pill-tabs`, or by showing an `overflow: hidden` box is user-scrollable (it is not).

---

### D-10 · MAJOR — the header rationale cites two consumer sites that **do not exist** and a glass-ui version two majors behind the installed one. *(folds S-1, S-2, F-1)*

`KfPillTabs.vue:2-12` — a 20-line block, the first thing any reader meets. Its load-bearing predicates:

| claim | tree |
|---|---|
| "the two band-aid sites (**SpringSidebar** + **AnimationControls**)" (`:4-5`) | `find demo -iname "*SpringSidebar*" -o -iname "*AnimationControls*"` → **only** `AnimationControlsGroup.{vue,css}`. Neither named file exists. |
| the sole consumer | `ChannelControls.vue:74` — **one** site, which the comment does not name, and which never renders (D-1) |
| "**glass-ui 4.0.1's** SegmentedTabs emits the orientation attribute UNCONDITIONALLY" (`:5-7`) | installed is **7.0.0**. lane-frontend **S-1** measured the fix at `dist/tabs.js:232`: "rationale is void against 7.0.0." |
| "This strip is ARIA-correct BY CONSTRUCTION" (`:8-9`) | falsified by D-3 and D-6 |
| `:45-46` "until the published Glass component can provide pill material with tablist semantics **and roving focus**" | S-1: 7.0.0 ships `SegmentedTabs` **+ `useTabRovingFocus`** |

Every factual predicate is stale, and one (`:5-7`) is stale in the specific way that keeps a 217-line fork alive: **the version it argues against is not the version installed**. The rot runs downstream — `useTabStripScroll.ts:5,23-29,47-51,66-70` still narrates `<SegmentedTabs>` and its "vendor-DOM contract" for a component that is not rendered (S-2), and `ChannelControls.vue:41-65` stacks two more `<SegmentedTabs>` paragraphs directly above the `<KfPillTabs>` call.

Compounding, **F-1**: `@mkbabb/glass-ui` is in neither `package.json` nor the lock. So the version this rationale is measured against is not merely stale, it is **unpinned** — the comparison has no fixed referent and `npm ci` resolves nothing.

**Falsifier.** Produce `SpringSidebar.vue` or `AnimationControls.vue` in the demo tree, or a 7.0.0 `SegmentedTabs` still emitting `aria-orientation` unconditionally on `role=group`. S-1 already checked the second and found the guard.

---

## 3. MINOR / INFO

### D-11 · MINOR — fluid type against fixed padding, with the line-height pin dropped: the pill's proportions erode ~30 % across the viewport range.

`:93` `padding: 0.25rem 0.75rem` (4 px / 12 px, **fixed**) against `:98` `font-size: var(--type-small)` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — **14 px → 20 px**.

| viewport | `--type-small` | horiz pad : type | vert pad : type |
|---|---|---|---|
| ≤ 1152 px | 14.0 px | 0.857 | 0.286 |
| 1440 px | 16.4 px | 0.732 | 0.244 |
| 1920 px | 17.6 px | 0.682 | 0.227 |
| ≥ 2880 px | 20.0 px | 0.600 | 0.200 |

The Aristotelian complaint is exact: the ratio of frame to figure is not a constant of the design, it is a function of window width — the pill grows *tighter* as the screen grows *larger*, the opposite of what a fluid ramp is for. And `tab-idiom.css:27` pins `line-height: 1.75rem` specifically so the sibling idiom's **box** is stable against its fluid type; KfPillTabs dropped that pin, so the pill's height is fully fluid inside a wrapper whose vertical padding (`py-0.5` = 2 px) is fixed.

`:95-97` justifies the *rung* — correctly; `--type-small` stays below `--type-body` at every width (16.4 px vs 18.6 px at 1440 px, checked) — but treats the rung as a scalar when the token is a ramp.

**Falsifier.** A demo-level override pinning `--type-small`. Grep of `demo/` for `--type-small`: exactly one hit, this consumption site. The glass-ui clamp stands.

---

### D-12 · MINOR — the strip takes the PANEL radius rung while nested inside a `rounded-panel` plate: concentric-radius collision.

`:84` `border-radius: var(--radius-panel, var(--radius-lg))` = **12 px**. `ChannelControls.vue:56` gives the wrapper `rounded-panel` = **12 px** with `py-0.5` (2 px) + its own `.glass-wash` 1 px border = **3 px** of vertical offset.

Concentric radii want `outer = inner + offset`, so the wrapper needs **15 px** to sit cleanly around a 12 px strip. It has 12. The arcs converge and the inner corner crowds the outer — the classic tight-corner artefact, worst on the vertical axis (3 px offset); horizontally the offset is 9 px, so 12-vs-21 reads as a slack corner instead. Both axes are wrong, in opposite directions, from the same asymmetric `px-2 py-0.5`.

Root cause is rung selection: a control nested inside a panel took the **panel** rung. `--radius-strip` (0.75 rem) and `--radius-control` (`--radius-pill`) both exist in `theme/radius.css`; neither is used. *(The component's* internal *concentricity is near-textbook — see S-3. The failure is only at the seam with its parent.)*

**Falsifier.** **UNPROVEN-NEEDS-LIVE** for the visual severity; the 12-vs-15 arithmetic is confirmed from source.

---

### D-13 · MINOR — `:hover` with no `@media (hover: hover)` guard, on a demo explicitly built for LAN mobile testing.

`:111-114` styles `[data-state="inactive"]:hover` unconditionally. On touch, `:hover` latches after tap and persists until the next tap elsewhere — so the last-tapped tab keeps `color: var(--foreground)` and a 5 % chip which, per D-4, is indistinguishable from selected. Touch users get a phantom second "selected" tab.

**Falsifier.** A global `@media (hover: hover)` wrapper reaching scoped rules. There is none, and a scoped block cannot be wrapped from outside.

---

### D-14 · MINOR — the focus ring bleeds 3 px into a 2 px gap and is overpainted by the next sibling.

`:120-122` `outline: 2px solid …; outline-offset: 1px` → the ring occupies **3 px** beyond the button box on every side. `:83` `gap: 0.125rem` = **2 px**. The ring overlaps its neighbour's box by 1 px each side, and because the following sibling paints later in DOM order, any neighbour that is hovered or active covers the overlapping millimetre with its own background.

Vertically the ring survives: 2 px strip padding + 1 px strip border + 2 px wrapper padding = 5 px of room before `overflow-hidden` clips (`ChannelControls.vue:56`), against 3 px of bleed. Horizontally at the first/last pill it is exactly tangent — 3 px available, 3 px used, zero margin.

**Falsifier.** Raise `gap` to ≥ 6 px or drop `outline-offset` to 0 and the overlap disappears; or show engines paint outlines above all sibling backgrounds (they do not — an outline paints with its own element).

---

### D-15 · MINOR — zero theming seam. The consumer that needs a denser rung cannot get one.

Every value in `:80-123` is a literal or a direct global-token read. There is no `--kf-pill-pad`, `--kf-pill-gap`, `--kf-pill-radius`, `--kf-pill-tint` — nothing a host can retune.

This is the **inverse** of the flat `--kf-*` namespace hazard the axis names: the component is immune to namespace collision because it participates in no namespace at all, and pays with total rigidity. It bites concretely — the sole consumer nests the strip in a 2 px-padded track (D-5, D-12) and would need a tighter radius and a stronger chip (D-2); neither is reachable without editing the SFC. Note also that the `Kf` vanity the owner explicitly derided (`U/audit/lane-03-t-verdict-trace.md:179-183`, F-6) has propagated into the **CSS** surface, where `font-roles.json:31-34` now selects on `.kf-pill-tab` — so de-vanitizing is no longer a rename, it is a registry migration.

**Falsifier.** Show a consumer retuning the strip from outside without `:deep()` or a source edit.

---

### D-16 · MINOR — one registry, two renderings: `SURFACE_META` carries an `icon` for all six surfaces and the strip silently drops it.

`controlSurfaces.ts:145-161` — every surface has `icon` (`SlidersHorizontal`, `Braces`, `Clock`, `Activity`, `Grid3X3`), documented at `:141-143` as "a key into the host's icon-COMPONENT registry (ChromeDock `TAB_ICONS`)". `ChannelControls.vue:299-303` maps `SURFACE_META[s]` straight into `stripOptions`, so the icon **arrives** at `KfPillTabs` — and `KfPillTabOption` (`useKfPillTabs.ts:23-27`) has no icon field, the template renders `{{ opt.label }}` only (`:33`), and there is no slot. The registry's own comment claims "**both docks and the in-panel strip** resolve every tab's `{label,icon}` from HERE"; the strip resolves `label` and discards `icon`.

**Falsifier.** A ruling that the in-panel strip is deliberately text-only — in which case the fix is to correct `controlSurfaces.ts:141-143`, which currently asserts otherwise.

---

### D-17 · MINOR — the async barrel export is dead, and the type arrives through a back-compat shim. *(folds lane-frontend:553)*

`index.ts:12` `export const KfPillTabs = defineAsyncComponent(() => import("./KfPillTabs.vue"))` — no `loadingComponent`, no `errorComponent`, no `delay`. The sole consumer does not use it: `ChannelControls.vue:229` imports `../KfPillTabs.vue` **directly**. The code-split the barrel promises never happens, and the async wrapper's missing loading/error states are moot only by accident.

Separately, `ChannelControls.vue:230` imports `KfPillTabOption` from `../composables/useKfPillTabs` — a 4-line pure re-export (`composables/useKfPillTabs.ts:1-4`) of `../KfPillTabs/useKfPillTabs`, which is where the SFC itself imports from (`:43-44`). Two paths, one type, one existing solely to keep a stale import resolving — lane-frontend:553's `feedback_no_backwards_compat` violation, confirmed. I add that the SFC's comment at `:41-42` documents a **third** alias ("`import type { KfPillTabOption } from ".../KfPillTabs.vue"` keeps resolving") that no file in the tree uses.

**Falsifier.** A consumer importing `KfPillTabs` from the barrel, or the type from `KfPillTabs.vue`. Grep across `demo/`, `src/`, `test/`: none.

---

### D-18 · MINOR — self-certifying prose: the comments assert the properties the code does not have.

33 lines of comment to 91 of code (36 %), and the register is the problem more than the volume:

* `:8-9` "ARIA-correct **BY CONSTRUCTION**" — falsified by D-3 and D-6.
* `:10` "(a panel switcher, **the right pattern**)" — an assertion of correctness standing in for the `aria-controls` that would constitute it.
* `:11` "a **VALID, complete** contract" — falsified by D-3.
* `:79` "sourced from design tokens (**no re-authored colours**)" — sits directly above 30 lines that re-author the shared skin (D-8).
* `:77-78` "**the legible chip register the user asked for** ("pills if tabs at all")" — an owner quotation embedded in a stylesheet as design authority, measuring 1.24 : 1 (D-2). Quoting the brief is not evidence of meeting it.
* `:95` "the display-face force **dies**"; `useKfPillTabs.ts:88` "the load-bearing half a12 F1 dropped" — florid.

A superlative asserted in a comment is a claim with no falsifier attached. Four of the six above are now false, and each sits exactly where a reviewer would have stopped looking — which is, per D-1, how a dead branch kept its documentation.

**Falsifier.** Resolve D-3 and D-6 and four of these become true. That is the point: the prose was written as a promise and shipped as a description.

---

### D-19 · MINOR — `ariaLabel` is optional with no default, so the tablist can ship unlabelled, with no dev-time warning, and `aria-labelledby` is not offered at all.

`:52`, `:58` — `ariaLabel?: string`, no default; `:16` `:aria-label="ariaLabel"` (Vue omits the attribute when the value is `undefined`). A `role="tablist"` with neither `aria-label` nor `aria-labelledby` is an unnamed composite in the AT tree. The sole consumer does pass one (`ChannelControls.vue:77`), so this is latent — but nothing enforces it, and a consumer with a **visible** heading (the APG-preferred labelling) has no `aria-labelledby` prop to use.

**Falsifier.** A dev-mode assertion or a required-prop declaration. Neither exists.

---

### D-20 · MINOR — RTL: the arrow mapping is hardcoded LTR.

`useKfPillTabs.ts:67-69` — `nextKey = vertical ? "ArrowDown" : "ArrowRight"`, unconditionally. APG requires the horizontal mapping to mirror under `dir="rtl"` (ArrowRight → *previous*). Nothing reads `dir`, `getComputedStyle(…).direction`, or any logical-direction signal. Latent — the demo ships no RTL (`grep -rn 'dir="rtl"' demo` → nothing; only two logical-property uses anywhere, `ControlsPaneWrapper.css:48,86`) — but this is a **component** contract, and the component is presented as the reusable ARIA-correct primitive.

**Falsifier.** A ruling that RTL is out of scope — which would also want `:15`'s orientation prop reconsidered, since both are "complete contract" claims.

---

### D-21 · MINOR — forced-colors / prefers-contrast: `border: 0` reserves no space for the global override that adds 2 px.

`glass-ui/dist/styles/accessibility.css` applies, under **both** `@media (forced-colors: active)` and `@media (prefers-contrast: more)`:

```
:is(…, [aria-selected="true"], …) { border-color: Highlight !important; border-style: solid !important; border-width: 2px !important; }
```

The active pill carries `aria-selected="true"` (`:24`), so it **does** get a real state indicator in those modes — which is good, and is why D-2 is not *also* a forced-colors failure. But `:91` declares `border: 0` with no transparent reservation, and `box-sizing: border-box` (Tailwind preflight, universal) with content-driven height means the 2 px border **grows** the active pill by 4 px in each axis. Inside a strip whose padding is 2 px and a wrapper whose padding is 2 px, the row height changes the moment a high-contrast user selects a tab, and the pill's text box shifts against its unselected siblings. The cure is `border: 2px solid transparent` at rest.

**Falsifier.** Show `box-sizing: content-box` applies (it does not), or that 4 px of growth is absorbed rather than propagated.

---

### D-22 · MINOR — empty / single-option states are unguarded.

`:19-34` renders `v-for` with no `v-if` on `options.length`. With `options: []` the component emits `role="tablist"` containing **zero** `role="tab"` children — an `aria-required-children` violation — rendered as a ~7 px glass sliver (2 px padding × 2 + 1 px border × 2 + a collapsed line box) carrying a full 12 px radius and a backdrop-filter. With one option it renders a complete glass plate for a non-choice.

**Honestly scoped:** not reachable through the sole consumer. `builtInTabs` (`ChannelControls.vue:299-303`) returns the full three-surface triad whenever `tabsExternallyManaged` is false, and the strip is `v-if="!tabsExternallyManaged"` (`:56`) — so the (unreachable, D-1) rendered path would always carry ≥ 3. Component-level latent; MINOR for that reason, not MAJOR.

**Falsifier.** A host passing `extraTabs` / `options` that can empty. None today.

---

### D-23 · INFO — `transition: background` (shorthand) in the same declaration whose comment praises its narrowness.

`:104` transitions the `background` shorthand, covering `background-image`, `background-position`, `background-size` and the rest; the only channel that changes is `background-color`. `:101` says "Narrow transition (no `all`) — only the activation channels change". Trivially tightened; noted because it is the second place (with D-7) where the narrowing was declared complete and was not.

---

### D-24 · INFO — a latent state-collapse via glass-ui's `--glass-backdrop` container query.

`glass/ladder.css` contains `@container style(--glass-backdrop: light) { …, .glass-wash, … { --muted-foreground: var(--foreground); } }` and, under `@supports (color: contrast-color(white))`, `--muted-foreground: contrast-color(var(--card))`. `--glass-backdrop` inherits, and is set to `light` by `.glass-floating` / `.glass-overlay`. If the strip ever lands inside such an ancestor, `--muted-foreground` collapses onto `--foreground` and the **inactive and active label colours become identical** — leaving `font-weight` and a 1.24 : 1 chip (D-2) as the entire selection signal.

**Not reachable today:** `grep -rn "glass-overlay\|glass-floating\|glass-backdrop" demo` → zero hits. Filed as a hazard because D-2 and D-4 have already spent the redundancy that would otherwise absorb it.

**Falsifier.** Place the strip in any glass-ui Popover / Sheet / Dialog and read the computed `color` of an inactive tab.

---

## 4. Examined and CLEARED — not findings

Recorded so a later pass does not re-raise them.

* **Disabled-tab contrast.** `:107-109` `opacity: 0.5` puts the disabled label at **2.95 : 1** (dark, computed). WCAG 1.4.3 explicitly exempts inactive components — **not a failure**. Below a 3 : 1 house floor if one exists, which is policy, not defect.
* **Target size.** Pill height ≈ 1.5 × 14 px + 8 px = **29 px**; narrowest label ("Curve") ≈ 12 + 12 + ~38 = 62 px. Clears SC 2.5.8 (24 × 24) with margin. Misses SC 2.5.5 (44 px, AAA) on height — recorded, not charged.
* **Disabled tabs and roving focus.** `useKfPillTabs.ts:38` filters disabled options out of the roving set and `:26` uses native `disabled`. This is a **valid** APG option ("elements are not focusable"), not the `aria-disabled` bug it superficially resembles. Correct as written.
* **Inactive-label contrast.** I expected a failure from a "muted" token on translucent glass and found the opposite — it became S-1.

---

## 5. SUPERLATIVES (L-18 both ways — each carries its own falsifier)

### S-1 · The label contrast is AAA in both arms, achieved with **zero local colour authorship**.

By mounting on `.glass-wash` (`:17`) and reading `--muted-foreground` / `--foreground` (`:100`, `:112`, `:116`) instead of picking values, the component inherits glass-ui's on-glass foreground repoint (`glass/ladder.css`, the `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` block) for free:

| | dark | light |
|---|---|---|
| inactive label vs plate | **7.22 : 1** | **6.06 : 1** |
| active label vs plate | **11.18 : 1** | ≈ **17 : 1** |

7.22 and 11.18 clear **AAA** (7 : 1); 6.06 clears AA with 35 % headroom. This is the right mechanism — the accessibility comes from the design system, so it tracks the system — and it is why D-2's chip failure does not take the whole component down: the label carries the state when the chip cannot.

**Falsifier.** If `.glass-wash` did not repoint `--muted-foreground`, the raw token would apply and these numbers would move. Verified present in `glass/ladder.css`.

### S-2 · The focus ring is on the ONE motion-colour authority, `:focus-visible`-gated, and clears SC 1.4.11 with margin.

`:120-122` — `outline: 2px solid var(--color-progress, currentColor)`. `--color-progress` is the demo's single motion-colour authority (`style.css:163`; `playback-idiom.css:39` "ONE motion-color authority"), so the ring is the same violet as every other progress affordance:

| arm | ring Y | plate Y | contrast |
|---|---|---|---|
| light `oklch(.56 .17 295)` | 0.16022 | 0.92218 | **4.62 : 1** |
| dark `oklch(.74 .13 305)` | 0.38454 | 0.02527 | **5.77 : 1** |

Both clear the 3 : 1 floor by > 50 %, in both arms; `:focus-visible` (not `:focus`) means pointer users never see it; the `currentColor` fallback is a sensible degradation. Only D-14's 3 px-into-2 px geometry lets it down.

**Falsifier.** Re-derive from `--accent-kf` at `style.css:130`; if `--color-progress` is repointed the numbers move.

### S-3 · The strip's **internal** concentric radius is within 1 px of textbook.

Outer `--radius-panel` = 12 px (`:84`); offset = 2 px padding (`:85`) + 1 px `.glass-wash` border = 3 px; inner `--radius-lg` = 10 px (`:94`). Ideal outer = 10 + 3 = **13 px**; actual **12 px**. A 1 px deviation on a nested-radius pair beats most hand-tuned systems, and it was got by picking two *named rungs* rather than two numbers. *(D-12 is the seam with the parent — a different measurement. Both are true.)*

**Falsifier.** `--radius-panel` / `--radius-lg` resolving elsewhere. Verified: `theme/radius.css` → `--radius-xl` = 12px, `--radius` = 0.625rem.

### S-4 · The transition property list is explicit, and the reason is written down.

`:101-105` enumerates three properties instead of `all`, with a rationale. The constellation grand-audit (2026-06-03) found ~40 ungated `transition: all` / PRM-RAF sites across eleven repos; this file is on the right side of that. The credit is real even though the list contains one property that should not be in it (D-7) — enumerating is exactly what makes that mistake *visible*.

---

## 6. Verdict

**The component does not render.** `App.vue:169` provides `TABS_EXTERNALLY_MANAGED_KEY: true` unconditionally to the only application root, and `ChannelControls.vue:56` gates the strip on its negation — so `<KfPillTabs>` has not mounted in the shipped demo since the ChromeDock dropdown took the job. 217 lines of component, a 4-line shim, a dead async barrel export, a `font-roles.json` registry row, a 7-case test file and a 20-line rationale are maintained for a branch that cannot execute.

That moves lane-frontend **S-1**'s verdict from *replace* to **delete**, and the swap onto 7.0.0's `SegmentedTabs` + `useTabRovingFocus` becomes unnecessary work — the cheaper cut is the `v-if` branch and everything hanging off it. If the strip is instead reinstated, the two findings that must not survive are:

1. **D-2 — the chip percentage is not portable.** `color-mix(… var(--foreground) 8% …)` fails 3 : 1 at *every* backdrop (proved, not sampled). The owner rejected the underline for reading as an unlabeled divider; the pill that replaced it is measurably harder to see than the underline would have been. If glass-ui's pill uses the same recipe, a mechanical swap lands the defect intact.
2. **D-6 — S-1's open design question, answered.** The `role=tablist`-vs-`role=group` argument is moot until the tab↔panel association exists; it is missing in **both** directions today (`aria-controls`/`id` on the tabs, `aria-labelledby` on the panels), and the component's option type cannot express it. Any replacement must specify it rather than inherit silence.

Order of operations is unchanged from the corpus: **F-1 first** (declare and lock `@mkbabb/glass-ui: 7.0.0` — nothing here is reproducible against an unpinned substrate), then the deletion, then D-2 and D-6 as acceptance criteria on whatever occupies the seam.
