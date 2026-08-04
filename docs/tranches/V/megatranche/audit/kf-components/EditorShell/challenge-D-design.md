claude-opus-5[1m]

# CHALLENGE · EditorShell · axis D (DESIGN) — round 2 (merged, supersedes round 1)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise — but a false defect is worse than a missed one, so §4 records **seven** hypotheses raised and then **killed against the tree**.

**Provenance of this document.** A round-1 challenge existed at this path (14 defects · 1 BLOCKER · 3 superlatives). I ran an independent pass before reading it, then merged rather than clobbered. **Round-1 ids D-1…D-14, S-1…S-3, C-1…C-4 are carried forward unchanged** (marked `[R1]`), with their load-bearing computations preserved verbatim. **D-15…D-29, S-4…S-6, C-5…C-7 are new** (marked `[R2]`). One round-1 claim is **factually corrected** — see D-18. Round-1's S-1 is **qualified** by D-16.

**Tally: 29 defects · 1 BLOCKER · 6 superlatives · 7 cleared hypotheses.**

---

## Read set (whole, read-only — the full import closure plus round-2 additions)

| file | why |
|---|---|
| `demo/components/instrument/shell/EditorShell.vue` | target |
| `.../shell/{SharePopover,EditorStartScreen,KeyboardShortcutsModal,EditorHeader,AnimatedText,TypingDots}.vue` · `useShareState.ts` · `index.ts` | `:117–119` + siblings + the barrel |
| `demo/components/instrument/utils/iosTextEntry.ts` | `:115` |
| `.../transport/AnimationControlsGroup.vue` + `AnimationControlsGroup/useControlsKeyboardShortcuts.ts` | `:120` |
| `demo/styles/{style,design-idioms,layout}.css` | `:131` — the whole cascade root |
| `demo/app/App.vue` · `demo/app/index.html` · `demo/app/dock/{ChromeDock,MbabbMenu}.vue` · `.../shell/HeroAurora.vue` | the only host + the duplication surface + **the viewport meta** `[R2]` |
| `vite.config.ts` · `tsconfig.json` · `.prettierrc.json` · `package.json#scripts` · `scripts/gates/**` | aliases, formatter contract, **whether the cited `proof:*` gates exist** `[R2]` |
| `node_modules/@mkbabb/glass-ui@7.0.0/dist/` — `header-ribbon.js` · `components/header-ribbon/{types,HeaderRibbon.vue}.d.ts` + `styles.css` · `components/button/styles.css` + `.d.ts` `[R2]` · `components/dark-mode-toggle/{dark-mode-toggle.css,*.d.ts}` `[R2]` · `tooltip*.js` `[R2]` · `dark-mode-toggle.js` · `keyboard.{js,d.ts}` · `styles/{index,transitions,utilities/btn,utilities/a11y-overrides,tokens/*}.css` | every consumed contract |
| `node_modules/reka-ui@2.9.9/dist/shared/createContext.js` · `dist/Tooltip/*` `[R2]` | provider-injection semantics |

**Hitherto corpus folded.** `formation/keyframes/lane-frontend.md` — **F-1** (glass-ui phantom dependency: 7.0.0 installed, absent from `package.json` and lock) is a **precondition for this entire audit**; every glass-ui fact below is read from the copy the demo actually resolves. **S-2** (type-only `/tabs`, `EditorShell.vue:126`) confirmed unchanged. **§3.1** (`/header-ribbon` = 1 consumption site) is load-bearing for D-1. **§6.3** (flat namespace, `--kf-*` = 0) made concrete at D-12. **§6.5** (PRM delegation "unverified statically") **verified here** — C-2/C-3, S-5. Full reconciliation table at §6.

---

## 0. Headline

| id | sev | claim |
|---|---|---|
| **D-1** `[R1]` | **BLOCKER** | The shell's three header controls are `inert` + `aria-hidden="true"` at rest with **no reachable reveal affordance**: keyboard ✗, touch ✗, AT ✗. `mode="persistent"` is not a HeaderRibbon prop in glass-ui 7.0.0. |
| D-2 `[R1]` | MAJOR | The graph substrate is **7.5×–14× more perceptually present in dark than light** from the same rule (ΔL\* 4.3 vs 33.1 major; 1.1 vs 15.9 fine); the comment asserts the single-rule retint is sufficient. |
| D-3 `[R1]` | MAJOR | `SharePopover` + `DarkModeToggle` in the ribbon are **exact duplicates** of two better-labelled `MbabbMenu` rows. Two authorities, one command. |
| D-4 `[R1]` | MAJOR | Three adjacent controls, **three affordance idioms**: bare `aria-label` / glass `<Tooltip>` / native `title=` (a non-prop through `useAttrs`). |
| **D-15** `[R2]` | **MAJOR** | `role="toolbar"` is announced with **none** of the APG keyboard contract (no roving tabindex, no arrow nav), and the shell never passes `ariaLabel`, so the demo's only toolbar is named with glass-ui's generic default. |
| **D-16** `[R2]` | **MAJOR** | The page's only `<h1>` — the declared LCP node — **and all visible prose sit outside `<main>` and outside every landmark**; `<main>` contains no heading. Qualifies S-1. |
| **D-17** `[R2]` | **MAJOR** | The header band is the **one chrome band outside the φ/work-area anchor chain**: raw `inset-block-start: 0` + `padding: 1rem`, no `--dock-*` term, and **no `data-dock-tether`**, so it is skipped by the anchor-positioning enhancement built for "the two real dock bands". |
| **D-18** `[R2]` | **MAJOR** | `aspect-square w-8` **cannot** produce a square — both glass-ui components set an explicit `block-size` that `aspect-ratio` loses to. Computed: Button **32×40** (fine) / **32×60** (coarse), toggle **32×36**. Identical classes, three different boxes. **Corrects R1 D-7's "32 × 32 px".** |
| **D-19** `[R2]` | **MAJOR** | The scoped block stakes its design on `proof:appearance-suffusion` "clause g" and the file cites `proof:hero-two-focal`. **Neither gate exists** — `package.json#scripts` has only `proof:publish`/`proof:owner-golden`; `scripts/gates/` has no suffusion gate. The D-5 drift exists *because* nothing checks. |
| D-5 `[R1]` | MINOR | The scoped block's fallbacks and prose state values the tree does not have (5% vs 3%, 12% vs 11%) and mis-cite the token home. |
| D-6 `[R1]` | MINOR | The start-screen wrapper's `flex items-center justify-center` is **inert against its own default child** (that child is `absolute`). |
| D-7 `[R1]` | MINOR | Sub-44 px targets; the demo's own `.tap-floor` idiom has **zero consumers demo-wide**. (Geometry corrected by D-18.) |
| D-8 `[R1]` | MINOR | `--z-header: 35` is absent from the shell's documented z-contract and sits **below** `--z-dock: 40` in the same block-start band. |
| D-9 `[R1]` | MINOR | **Zero** `forced-colors` rules anywhere in `demo/`; the shell's entire visual read is a decorative `background-image`. |
| D-10 `[R1]` | MINOR | `headerRibbonRef` is `defineExpose`d with **zero consumers** — dead public contract. |
| D-11 `[R1]` | MINOR | `:key="superKey"` hard-remounts the whole transport per scene switch while the subject cross-fades — asymmetric motion at the shell's most visible seam. |
| D-12 `[R1]` | MINOR | `--scale-hover` is a **live shadow** of a glass-ui token with a currently-zero delta (census §6.3 made concrete). |
| **D-20** `[R2]` | MINOR | **Inverted hover semantics inside one cluster**: two controls grow (`scale-on-hover`, 1.08); the third **dims to 50%** — the demo's own disabled vocabulary. |
| **D-21** `[R2]` | MINOR | **Icon-rung discord in one cluster**: `icon-lg` (24 px) beside `icon-sm` (16 px) ×2, from a family that exists to differentiate rungs. |
| **D-22** `[R2]` | MINOR | `<h2>` used twice for a **deck and a hint that are not sections**; the modal separately opens groups at `<h3>` under its `DialogTitle`. |
| **D-23** `[R2]` | MINOR | The file **fails the repo's own formatter** — verified by running `prettier --check`. Unsorted class strings, three over-width lines, and the entire `<main>` body un-indented. |
| **D-24** `[R2]` | MINOR | Two props are justified entirely by "the playground" (`:160`, `:163–164`) — **a host that is not in the tree**, making their defaults unauditable here. |
| **D-25** `[R2]` | MINOR | No `viewport-fit=cover` in the viewport meta, so **every `env(safe-area-inset-*)` term in the anchor chain is inert** (resolves `0px`). Kills a plausible notch claim — see C-7. |
| **D-26** `[R2]` | MINOR | RTL is **entirely uncovered**, and the shell is half-migrated: the ribbon flips correctly (`inset-inline-end`) while the hero is pinned with physical `left-0`. |
| D-13 `[R1]` | INFO | `#backdrop` has no out-of-flow contract; an in-flow host backdrop displaces `<main>`. |
| D-14 `[R1]` | INFO | Four different names for one command across four surfaces. |
| **D-27** `[R2]` | INFO | Two more dead bindings beside D-10: `const props` (`:135`, never read) and `--header-items-max-w: 500px` — a raw-px token kept alive in the geometry authority for a component with zero consumers. |
| **D-28** `[R2]` | INFO | `<Transition appear>` starts the **LCP `<h1>` at `opacity: 0`**, making it LCP-ineligible for ~1 frame — against a chain (preload + Capsize fallback) working hard the other way. |
| **D-29** `[R2]` | INFO | 77/262 lines (29%) are ledger prose citing 11 wave/ruling coordinates and 4 `proof:` gates, **none resolvable in `demo/`** and two resolvable nowhere (D-19). |
| **S-1**…**S-6** | SUPERLATIVE | see §5 |

---

## 1. BLOCKER

### D-1 `[R1]` · The header ribbon's actions are `inert` + `aria-hidden` with no reachable way to reveal them — **BLOCKER**

**Provenance.** `EditorShell.vue:16` — `<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">`.

The `mode` prop **does not exist**. `glass-ui@7.0.0` `components/header-ribbon/types.d.ts` declares exactly three:

```ts
export interface HeaderRibbonProps {
    placement?: HeaderRibbonPlacement;   // "left" | "right"
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
}
```

and the runtime confirms it — `dist/header-ribbon.js` props block is `{ placement: {default:"left"}, ariaLabel: {default:"Header actions"}, class: {...} }`. `grep -c "mode" dist/header-ribbon.js` → **0**. The component is `inheritAttrs: !1` and spreads `useAttrs()` onto its root, so `mode="persistent"` lands as a **literal non-conforming HTML attribute** on `<div class="header-ribbon" role="toolbar">` and does nothing else. (The word "persistent" appears in glass-ui only as JSDoc prose — `types.d.ts`: *"Accessible name for the persistent action toolbar"* — plausibly the source of the mistaken name. `EditorHeader.vue`, the pre-migration predecessor with the same `#items`/`#anchor` shape, had no `mode` prop either, so this was never valid on either side of the migration.) Vue does not warn on excess attrs; `vue-tsc` does not flag them on an `inheritAttrs:false` component. **The author wrote down the correct intent and the framework silently discarded it.**

**What the ribbon actually does.** `dist/header-ribbon.js` renders the items slot inside:

```js
i("div", { class: "header-ribbon__actions",
           inert: !w.value || void 0,
           "aria-hidden": !w.value }, [u(n.$slots, "items")], 8, _)
```

with `w = computed(() => x.value || S.value || C.value)` — `x` = pinned, `S` = hovered, `C` = focus-within, **all initialised `ref(!1)`**. And `components/header-ribbon/styles.css`:

```css
.header-ribbon:not([data-expanded]) .header-ribbon__actions {
    max-inline-size: 0; opacity: 0; pointer-events: none;
}
```

So at rest the slot content — `SharePopover` (`:20`), the shortcuts `Button` (`:32–40`), `DarkModeToggle` (`:44–47`) — is simultaneously **`inert`**, **`aria-hidden="true"`**, **zero inline size**, and **`opacity: 0`**.

**Every reveal path is closed.**

1. **pin** — `onClick: k` is bound to `.header-ribbon__anchor`. EditorShell supplies **no `#anchor` slot content** (`:16–50` contains only `<template #items>`), and `.header-ribbon__anchor { display: grid; flex: none; place-items: center }` carries no min-size ⇒ a **0 × 0 px click target**.
2. **hover** — `function T(e){ e.pointerType !== "touch" && (S.value = !0) }`. Touch pointers explicitly excluded ⇒ **no touch device can ever expand it** by hover.
3. **focus-within** — requires `focusin` inside the ribbon. The actions are `inert` (unfocusable); the anchor is empty. **Circular: expansion requires focus, focus requires expansion.** The root `div[role=toolbar]` carries no `tabindex`.

**The residual affordance, measured.** `.header-ribbon__band { min-block-size: var(--size-icon-btn) /* 2.5rem = 40px */; padding: var(--panel-padding) /* 0.375rem = 6px */ }`, inner content = anchor (0) + actions (0), `margin-inline-end: 0` when collapsed ⇒ a **12 px × 40 px blank glass sliver** at the top-inline-end corner, with `pointer-events: auto` on the band alone. A fine-pointer user must discover that hovering a featureless 12 px sliver produces three controls. Under `@media (pointer: coarse)` the ribbon padding *drops* to `0.75rem`, tightening it — for the exact class of device on which hover can never fire.

**Blast radius, App host.** `App.vue:28–102` passes neither `#header-left` nor `#header-right`, so the `:19` fallback renders — all three controls are affected. Redundancy audited: Share and Dark mode survive via `MbabbMenu` (D-3). The shortcuts trigger has no second visible route — only `?` (`:190`). That is precisely the paradox `:21–29` claims to break:

> *"F.W15.S3 — the **VISIBLE** shortcuts-discovery trigger. The 19-shortcut registry was discoverable ONLY via the `?` shortcut (the discoverability paradox); this breaks it with one control."*

The control is not visible, not focusable, not announced. `[R2] addendum` — I enumerated the whole registry independently (19 `registerShortcut` calls across `useControlsKeyboardShortcuts` + `:190`): there is **no** binding for theme and **no** binding for share. So for a keyboard-only user two *functions of the page* — theme toggle and share/load-state — have no operable path at all in the App host. That is **WCAG 2.1.1 Keyboard, Level A**, not merely a discoverability defect.

**Falsifier.** Any of: (a) a demo-side rule forcing `.header-ribbon__actions` open or setting `[data-expanded]` — `grep -rn "header-ribbon|data-expanded" demo` returns **only** `EditorShell.vue:16,50,116,187`, no CSS; (b) a `[mode=…]` selector in glass-ui — `grep -rno "\[mode=[^]]*\]" glass-ui/dist` → **empty**; (c) a HeaderRibbon `mode` prop in another version — the installed `dist` is what the demo resolves (census F-1); (d) a UA ignoring `inert` — Baseline 2023, and `aria-hidden` closes the AT path independently; (e) a `registerShortcut` for theme or share — the enumeration above is complete. If any surfaces, this drops to INFO.

**Cross-ref:** census §3.1 records `/header-ribbon` at **1** consumption site — this one — so nothing else in the tree could have caught it.

---

## 2. MAJOR

### D-2 `[R1]` · The graph substrate is 7.5×–14× more present in dark than light, from the same rule

**Provenance.** `EditorShell.vue:238–259` with tokens from `layout.css:32–35`; fg/bg from `glass-ui/dist/styles/tokens/`.

The component's justification, `:231–233`: *"The lines mix over `--foreground`, so the dark theme **retints from the SAME rules**."* The rules are the same; the **result is not**, because an alpha fraction of `--foreground` over `--background` is wildly non-symmetric across the sRGB transfer curve near the two ends.

Resolved: light `--foreground: hsl(24 10% 10%)` (Y ≈ 0.01005) over `--neutral-0: hsl(40 30% 98%)` (Y ≈ 0.96016); dark `hsl(30 14% 90%)` (Y ≈ 0.79141) over `hsl(24 9% 4%)` (Y ≈ 0.00310). At the token alphas (3% / 11%):

| tier | arm | line Y | contrast vs page | **ΔL\*** |
|---|---|---|---|---|
| fine (3%) | light | 0.93166 | 1.03 : 1 | **1.1** |
| fine (3%) | dark | 0.02675 | 1.45 : 1 | **15.9** |
| major (11%) | light | 0.85565 | 1.12 : 1 | **4.3** |
| major (11%) | dark | 0.08981 | 2.63 : 1 | **33.1** |

Major lines are **7.5×** the perceptual step in dark; fine lines **14×**. In light the fine tier is an 8-bit delta of ≈7/255 — at or under the display noise floor — so the "*deliberate two-tier engineering graph paper*" (`:228–230`) collapses to one tier in the light arm. Not a WCAG finding (decorative wash, exempt from 1.4.11); a **design-parity** finding contradicting `:231–233`, and it strains the `:235–236` legibility assertion stated once for both arms as if equivalent.

`[R2] reconciliation, and it matters.` I independently computed the **WCAG contrast ratio** for the same tokens and got **1.25 : 1 (major) and 1.06 : 1 (fine) — identical in both arms to three significant figures.** That is not a contradiction of R1; it is the two metrics behaving as designed. WCAG's `(L₁+0.05)/(L₂+0.05)` is near-symmetric for a percentage mix at the two luminance extremes, while ΔL\* (CIE cube-root) is not — and **ΔL\* is the design-relevant metric here**, because the question is perceptual presence, not legibility of text. R1's reading stands; my ratio is the sanity check that the mechanism is theme-neutral *by contrast ratio* while being wildly asymmetric *by perception*. That divergence is itself the sharpest statement of the defect, and it is why S-4 credits the mechanism while D-2 files the values.

**Falsifier.** A `.dark`-scoped override of `--graph-opacity` / `--graph-major-opacity`. `layout.css` declares them once, at `:12–141`; `grep -rn "graph-" demo/styles` finds no `.dark` arm. Absolute perceived weight behind `HeroAurora`'s wash and the glass plates is **UNPROVEN-NEEDS-LIVE**; the *ranking* is decidable now.

### D-3 `[R1]` · The ribbon duplicates two commands that already exist, better labelled, in the dock menu

**Provenance.** `EditorShell.vue:20`, `:44–47` versus `app/dock/MbabbMenu.vue:8–14`, `:18–24`, which mount the *same two components* inside `DropdownMenuItem`s carrying a visible text label **and** a supporting description ("Share" / "Copy link or load shared state"; "Dark mode"). Both mount unconditionally in the App host (`App.vue:19–23`), so the running page carries **two live `SharePopover` and two live `DarkModeToggle` instances** — and the dock copies are the better ones: visible label, description, normal focus order, no `inert` wall. The ribbon copies are unlabelled icons behind D-1.

The `:21–29` rationale justifies exactly **one** ribbon tenant (the shortcuts trigger, which genuinely has no other home). Share and Dark mode ride in as slot fallback, splitting each command across two authorities in two chrome bands. Corroborating: `EditorHeader.vue:23,:26` is a **third** copy with **zero mounting consumers** (`shell/index.ts:2` and a `layout.css:15` comment only). Copied three times, consolidated zero times.

**Falsifier.** A host rendering `EditorShell` without `ChromeDock`/`MbabbMenu` — none; `grep -rn "EditorShell" demo` gives one mount site, `App.vue:28`. Or an explicit ruling that top-right chrome and dock-menu chrome are deliberate parallel affordances.

### D-4 `[R1]` · Three adjacent controls, three affordance idioms

Three controls 8 px apart (`.header-ribbon__actions { gap: 0.5rem }`), each with a different disclosure mechanism:

| control | mechanism | provenance |
|---|---|---|
| `SharePopover` | **nothing** — bare `aria-label="Share animation"` | `SharePopover.vue:5` |
| shortcuts `Button` | glass `<Tooltip>` → "Keyboard shortcuts (?)" | `EditorShell.vue:30–43` |
| `DarkModeToggle` | **native `title=`** → "Toggle dark mode" | `EditorShell.vue:45` |

The third is unintentional: `DarkModeToggleProps` declares only `{ size?, disableTransitions? }`; the component is `inheritAttrs: !1` and spreads attrs onto its `<button>`, so `title` becomes a native browser tooltip — different delay, typography, placement, and **no touch equivalent**. Same authorship mistake as D-1: a prop that does not exist, silently absorbed by `useAttrs`. `[R2]` — a fourth idiom compounds it: `SharePopover.vue:27,:36` uses `title=` on its two *inner* Buttons. Four controls, three vocabularies, one 12 px band.

Secondary: `dark-mode-toggle.js` computes `"aria-label": v.value ? "Switch to light mode" : "Switch to dark mode"`, so the accessible name is *"Switch to dark mode"* while the only visible label is *"Toggle dark mode"*; the shortcuts button splits the same way (accname `:35` vs visible `:42`). **R1 declined to file WCAG 2.5.3 (Label in Name) because whether a `title` counts as a "visible label" is genuinely contested. `[R2]` I independently reached 2.5.3 and, on review, I endorse R1's call** — filing it would over-claim on a contested predicate. It is recorded here as the divergence (see D-14), not as a conformance failure. Noting the near-miss so a third pass does not re-file it.

**Falsifier.** A glass-ui version declaring `title` as a prop rendered into a styled tooltip; or a CSS suppression of native `title` (impossible). Neither exists.

### D-15 `[R2]` · `role="toolbar"` is announced with none of its keyboard contract, and the toolbar is unnamed

**Provenance.** `glass-ui/dist/header-ribbon.js:56` renders `role: "toolbar"`, `"aria-label": o.ariaLabel` (default `"Header actions"`), consumed at `EditorShell.vue:16`.

ARIA APG requires a `toolbar` to be a **single tab stop with arrow-key navigation among its items** (roving `tabindex`). `HeaderRibbon` implements neither. Its only keyboard handler is `onKeydown.esc` → `A()`, which unpins, sets focus-within, and focuses the first focusable inside the **anchor** — which EditorShell leaves empty (D-1). So AT announces "Header actions, toolbar" and the widget then behaves as an ordinary run of tab stops. Announcing a widget pattern you do not implement is worse than announcing none: it sets a keyboard expectation (arrows move within, Tab moves past) that the implementation defeats.

Separately and squarely on the shell: `EditorShell` never passes `ariaLabel` — the one prop that *does* exist and *is* needed. The demo's only header toolbar is therefore named with glass-ui's generic library default, saying nothing about keyframes.js.

This overlaps and extends census **S-1**'s *secondary* claim — that the `role=group` vs `role=tablist` choice is "a **design** argument that the 7.0.0 aria fix does not by itself answer". Same family, one rung up: glass-ui hands out ARIA widget roles whose keyboard contracts it does not carry, and every consumer inherits the lie. The shell is the consumer that inherited it on its most public surface.

**Falsifier.** Find roving-`tabindex` or arrow-key handling in `header-ribbon.js` (I read the whole 2 420-byte module — it has `onPointerenter/leave`, `onFocusin/out`, `onKeydown.esc`, and nothing else), or find an `ariaLabel` passed at the call site.

### D-16 `[R2]` · The `<h1>` — the declared LCP node — and all visible prose sit outside `<main>` and outside every landmark

**Provenance.** `EditorShell.vue:60–65` (start-screen wrapper) vs `:74–104` (`<main>`); `EditorStartScreen.vue:27,:40,:45`; `demo/app/index.html` (the LCP declaration).

`<main>` (`:74`) wraps `AnimationControlsGroup` and nothing else. The start-screen block — containing the page's **only `<h1>`** ("Select an animation") plus **both `<h2>`s** — is a *sibling* at `:60`, inside a bare `<div>`. `HeaderRibbon` (`role="toolbar"`, which is **not** a landmark) is a third sibling. Net result:

- the shell's entire visible textual content is outside all landmark regions (axe `region` / "all page content contained by landmarks");
- `<main>` contains **no heading at all**, so landmark-then-heading navigation lands in a region with nothing to orient against;
- the element `index.html` identifies as the LCP node and protects with a font preload and a Capsize-matched fallback face is the one element outside the document's semantic skeleton.

This is precisely the failure `:67–73` congratulates itself for avoiding at the *box* level. The box is real and the role survives — and then the content that most needed to be inside it was left out. **This qualifies round-1's S-1**: the reasoning credited there is correct and the precondition verifies, but the landmark it produces is empty of the page's actual subject.

**Falsifier.** Show a `<header>`/`banner`/`role="region"` ancestor for `:60` or `:16`, or the `<h1>` inside `<main>` in the rendered tree. `App.vue:44–46` fills `#start-screen`, which renders at `:61` — still outside `<main>`. No landmark wrapper exists in either file.

### D-17 `[R2]` · The header band is the one chrome band outside the φ / work-area anchor chain

**Provenance.** `demo/styles/layout.css:43–141` (the chain) and `:143–169` (the tether) vs `header-ribbon/styles.css` (`inset-block-start: 0; padding: 1rem`) at `EditorShell.vue:16`.

`layout.css` builds an explicit Aristotelian proportion system and states its governing ban: the vertical slack is split golden (`--work-area-vertical-bias-top: 0.382 = 1/φ²`), both dock anchors derive from one `--phi` token plus a `--dock-anchor-ceiling`-capped float plus a safe-area term, and the file records the rule — *"never a raw vh/px offset"* (K.W3 M4/C5). `EditorStartScreen.vue:88–94` obeys it exactly: `top: calc(var(--work-area-top-offset,0px) + var(--work-area-height,100dvh) * 0.45)`.

The header ribbon obeys none of it: `inset-block-start: 0` plus a hardcoded `padding: 1rem`, measured off the raw viewport — no `--dock-top-anchor`, no `--work-area-*`, no `--dock-margin`, no `--phi`. There is no demo-side override (`grep -rn "header-ribbon" demo/` → four `EditorShell.vue` lines, no CSS).

Worse, it carries **no `data-dock-tether`**, so `layout.css:154–169` — the `@supports (anchor-name: --stage)` enhancement that tethers the docks to the stage rect, the strongest expression of "*cluster to the content, not the viewport*" — **skips the header entirely**. `grep -rn "data-dock-tether" demo/` confirms exactly two opt-ins: `ChromeDock.vue:214` and `TransportDock.vue:4`. The `layout.css:151` comment names them "the two real dock bands", which is the tell: the shell's own header was never counted as chrome by the geometry authority the shell imports.

So the shell has three chrome bands; the two it does not mount participate in the proportion system, and the one it does mount floats free.

**Falsifier.** A demo rule overriding `.header-ribbon`'s inset/padding onto the chain; a `data-dock-tether` on the ribbon; or a demonstration that `--dock-top-anchor` resolves to ≈1rem at every viewport — that last would make the offsets coincidentally equal rather than derived, a weaker but real rebuttal. Note `--dock-anchor-ceiling: 4rem` caps the float, so the two are *near* at large viewports and diverge at small ones.

### D-18 `[R2]` · `aspect-square w-8` cannot produce a square — identical classes, three different boxes *(corrects R1 D-7)*

**Provenance.** `EditorShell.vue:36` (`Button`) and `:46` (`DarkModeToggle`), both `class="aspect-square w-8 scale-on-hover"`.

Round 1 read these as "**32 × 32 px**". They are not. Both glass-ui components set an **explicit block-size**, and `aspect-ratio` is ignored whenever both axes are definite:

- `button/styles.css` — `.button[data-icon-only] { inline-size: var(--button-size); block-size: var(--button-size); min-block-size: var(--button-size); padding: 0 }`, with `--button-size: var(--control-h-md) = max(2.5rem * var(--ui-scale), var(--control-floor))`.
- `dark-mode-toggle.css` — `.dark-mode-toggle-button { --dark-mode-toggle-size: 2.25rem; width: var(--dark-mode-toggle-size); height: var(--dark-mode-toggle-size) }`.

Cascade, checked rather than assumed: all three glass-ui sheets open `@layer components { … }`, and Tailwind v4 orders `@layer theme, base, components, utilities`, so `w-8` (`width: 2rem`) **does** win the inline axis. Nothing overrides `block-size`/`height`, and `aspect-square` is inert against them. Computed:

| control | fine pointer (`--ui-scale: 1`, `--control-floor: 0px`) | coarse pointer (`--ui-scale: --ui-coarse-scale = 1.5`, `--control-floor: --touch-target = 2.75rem`) |
|---|---|---|
| shortcuts `Button` (`:36`) | **32 × 40 px** | **32 × 60 px** |
| `DarkModeToggle` (`:46`) | **32 × 36 px** | 32 × 36 px |

So: neither control is square despite `aspect-square`; the two neighbours differ from each other on **both** axes; and on touch the Button becomes a 32-wide, 60-tall sliver — the aspect distortion is *worst* on the modality that most needs a clean target. The author wrote *identical* classes on both and got three different boxes, silently.

The right instrument was available and unused: `Button` exposes `size?: "xs"|"sm"|"md"|"lg"`, `DarkModeToggle` exposes `size?: "sm"|"md"|"lg"|"control"|"dock"`, and `SharePopover.vue:23,:32` *does* pass `size="sm"`. The shell reaches past both published size scales for raw utilities — R1's D-7 makes the same point about `w-8` under-riding the primitive; this entry supplies the geometry that point was missing.

**Falsifier.** Show `aspect-ratio` winning over an explicit `block-size` when width is also definite (CSS Sizing 4 says it does not); show `w-8` is itself dead (it is not — utilities layer after components, verified against all three sheets' `@layer` headers); or find an `h-8` alongside the `w-8`.

### D-19 `[R2]` · The gate the scoped block stakes its design on does not exist

**Provenance.** `EditorShell.vue:235–237` and `:15` vs `package.json#scripts` and `scripts/gates/`.

`:235–237` closes the substrate argument with a runtime guarantee: *"the §Hard-gate clause-g legibility assertion — W6-3 exits on a runtime clause, **never deferred again**."* `EditorStartScreen.vue:15` similarly gates the hero on `proof:hero-two-focal` (OWNER).

Neither gate exists:

- `package.json#scripts` contains exactly two `proof:*` entries — `proof:publish` and `proof:owner-golden`.
- `ls -R scripts/gates/` → `surface/{boundary,consume-bundle,index,published-surface,readme-runs,verify-diff}.mjs` and `visual/index.mjs`. No suffusion gate, no `proof-appearance-suffusion.mjs`, no `proof-hero-two-focal.mjs` anywhere under `scripts/`.
- `grep -rln "suffusion|two-focal"` across `scripts/` returns only *historical mentions* in `published-surface.mjs`, `demo-driver.mjs`, and the observe harnesses — no implementation. (The U-tranche audit lane at `docs/tranches/U/audit/lane-03-t-verdict-trace.md:78` independently records that the surviving proof scripts "still hard-reference the `demo/@` literal", i.e. a path this tree no longer has.)

This is the mechanism behind D-5. The prose says 12% and 5%; the tokens say 11% and 3%; the drift persisted because **the assertion's enforcement was retired and the assertion was not**. A component that cites a gate as its warrant is making a checkable claim; when the gate is gone the comment silently degrades from a guarantee into a memory.

**Falsifier.** Produce an executable `proof:appearance-suffusion` (or `proof:hero-two-focal`) — a script, a vitest case, a CI step. I checked `package.json`, `scripts/**`, and the two `scripts/gates/` subtrees.

---

## 3. MINOR / INFO

### D-5 `[R1]` · The scoped block's fallbacks and prose state values the tree does not have — MINOR

| site | states | tree says |
|---|---|---|
| `:241` | `var(--graph-opacity, **5%**)` | `layout.css:34` → **3%** |
| `:246` | `var(--graph-major-opacity, **12%**)` | `layout.css:35` → **11%** |
| `:234` | *"`--graph-major-opacity` **(12%)** … above the former 0.10α floor"* | 11% — a **1 pp** margin, not the 2 pp implied |
| `:231` | *"all four layers reading the demo-owned `--graph-*` tokens **(design-idioms.css)**"* | the tokens live in **`layout.css:32–35`**; `design-idioms.css` has no `--graph-*` at all, and `layout.css:1–6` says so |

Both fallbacks are also **dead** — `:131` imports `@styles/style.css`, which imports `layout.css`, so the tokens are always defined. A dead fallback is harmless; a dead fallback stating a *different* number is a trap, and the prose repeats the wrong one. Note the asymmetry: the opacity vars carry (wrong) fallbacks while `background-size` (`:254–258`) reads `var(--graph-major)`/`var(--graph-pitch)` **bare** — a missing length there invalidates the whole declaration at computed-value time and drops the grid to `auto`. See **D-19** for why this survived.

**Falsifier.** A second `--graph-*` declaration resolving to 5%/12%. `grep -rn "graph-opacity|graph-major-opacity" demo` → two sites: `layout.css:34–35` and this component's two reads.

### D-6 `[R1]` · The start-screen wrapper centres nothing — MINOR

`:60` is `class="absolute inset-0 z-controls flex items-center justify-center pointer-events-none"`. `EditorStartScreen.vue:17–19`'s root is `absolute left-0 w-screen` with its own `top: calc(…)` φ-band seat (`:88–94`). An absolutely positioned child is removed from flex layout, so `flex items-center justify-center` has **no effect on the default slot content** — the hero self-positions entirely. The classes advertise a centering contract the component does not honour, and a host filling `#start-screen` with in-flow content would get *different* geometry than the default it replaces. `z-controls` and `pointer-events-none` are likewise doubled on wrapper and child.

**Falsifier.** A host supplying in-flow `#start-screen` content — `App.vue:48–50` supplies the same absolute component, which is exactly why the inertness has never been observed.

### D-7 `[R1]` · Sub-44 px targets; the repo's own 44 px idiom has zero consumers — MINOR

`:36` and `:46` both set `w-8` ⇒ **32 px on the inline axis** (block axis per D-18). That passes WCAG 2.2 SC 2.5.8 (Target Size Minimum, AA, 24 px) and **fails** SC 2.5.5 (AAA, 44 px) — I file only the AAA miss; the AA claim would be false. `SharePopover.vue:4–12` is worse: an unboxed `icon-lg` glyph with `p-0` ⇒ ≈24 px, at the AA threshold exactly.

The interesting fact is that the demo **defines the remedy and never uses it**:

```
design-idioms.css:81  /* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
design-idioms.css:82  .tap-floor { min-height: 44px; min-width: 44px; }
```

`grep -rn "tap-floor" demo` → **2 hits, both the definition. Zero call-sites.** The shell's icon cluster is the canonical call-site.

Against my own case: glass-ui ships `@utility touch-hit-area` (`utilities/a11y-overrides.css`) expanding a `::before` to `--touch-target: 2.75rem` under `pointer: coarse` — but that pseudo carries `pointer-events: none`, so it does **not** enlarge the hit region. `.tap-floor` is the remedy.

**Falsifier.** An ancestor setting a larger min-size — `.header-ribbon__band` sets `min-block-size` only, and no demo rule targets the ribbon at all.

### D-8 `[R1]` · The ribbon rides a z rung the shell's own contract does not document — MINOR

`style.css:18–40` declares a closed, enumerated stacking contract — `--z-behind −10 · --z-content 10 · --z-controls 20 · --z-bar 30 · --z-dock 40 · --z-overlay 50 · --z-popover 130 · --z-modal 140` — with *"There is NO demo-local z-scale; the demo OWNS the ORDER as a documented contract, strictly ascending."* `.header-ribbon` sets `z-index: var(--z-header)`, which glass-ui resolves to **35**. **35 is not in the contract.** The shell's only fixed chrome paints at an undocumented rung and the contract's completeness claim is false for the shell's own header. `[R2]` — also absent and reachable from glass-ui: `--z-panel:45`, `--z-tooltip:120`, `--z-hovercard:120`, `--z-fullscreen:150`, `--z-toast:160`, `--z-toggle:999`. And the contract's enforcement clause (*"do NOT introduce a raw `z-[N]` bracket value; `proof:brittleness` gates against drift"*) polices the wrong surface: drift here arrives through a **consumed component**, which no grep for `z-[` will ever catch.

Consequence, partly live: 35 < `--z-dock` 40, both anchored to block-start — the ribbon at `inset-block-start: 0` + `padding: 1rem`, `ChromeDock` at `top: var(--dock-top-anchor)` (`ChromeDock.vue:215–216`, `fixed left-1/2 -translate-x-1/2 z-dock`). At rest the dock is centred and `:start-collapsed`/`:fit-content`, so no overlap; expanded on a narrow viewport it can reach the top-right and, at z 40, would paint **over** the ribbon. `EditorShell.vue:29` asserts the opposite — *"Sits in the header ribbon, not over the dock band → no occlusion (inv δ)"* — true of the bottom dock, unestablished for the top one.

**Falsifier.** Measure at 375 × 667 with `ChromeDock` expanded whether its rect intersects x ∈ [w−28, w−16] px, y ∈ [16, 56] px. **UNPROVEN-NEEDS-LIVE** for occlusion; the z fact and the shared band are decidable now.

### D-9 `[R1]` · Zero forced-colors coverage in the demo layer — MINOR

`grep -rn "forced-colors" demo` → **no output.** The shell's entire visual identity below the chrome is a decorative `background-image` (`:249–259`) on a `bg-background` field. `[R2] mechanism, made precise:` under `forced-colors: active` the UA forces `color`, `background-color`, `border-color`, `outline-color`, `fill`, `stroke` — it forces **neither custom properties nor `background-image`**. So `.grid-background` keeps its authored ink (3%/11% of the *author's* `--foreground`) while the field behind it is forced to `Canvas`. In a high-contrast **dark** scheme (`Canvas` = black) an 11%-black line over black is invisible; in a high-contrast **light** scheme the 3% tier is invisible. Either way the designed substrate does not survive, and there is no arm and no `forced-color-adjust` anywhere in `demo/`.

glass-ui supplies two relevant rules — `.header-ribbon__band { border: 1px solid CanvasText }` (which at least makes D-1's sliver *bordered*) and focus-visible outlines including `.dark-mode-toggle-button`. The demo layer supplies none, and the shell is the natural owner of a forced-colors decision for its own substrate.

**Falsifier.** A `@media (forced-colors: active)` block in `demo/` (grep is empty), or a UA that forces gradient color stops (none does, per CSS Color Adjust §3.2's forced-property list). The **paint outcome** is UNPROVEN-NEEDS-LIVE; the **absence of handling** is decidable and is what is filed.

### D-10 `[R1]` · `headerRibbonRef` is exposed and unused — MINOR

`:187` `useTemplateRef(…)`, `:197` `defineExpose({ headerRibbonRef })`. `grep -rn "headerRibbonRef" demo` → three hits, all inside this file (`:16`, `:187`, `:197`). The shell publishes a component-instance handle nothing consumes — and `[R2]` the handle points at a component whose `HeaderRibbon.vue.d.ts` declares an **empty exposed surface (`{}`)**, so there is nothing imperative to reach for even in principle. `App.vue:171–173`'s shared-ref comment refers to `CONTROLS_PANE_HOVER_KEY`, not this.

**Falsifier.** A consumer outside `demo/` — none in this repo; `shell/index.ts` re-exports the component only.

### D-11 `[R1]` · The transport hard-cuts while the subject cross-fades — MINOR

`:76` `:key="superKey"` on `<AnimationControlsGroup>`. `superKey` is per-scene (`app/scene/scenes.ts:131–184`), so **every scene switch fully unmounts and remounts** the controls pane, the rail, and the transport dock with no exit or enter transition — while the subject beside it cross-fades (`App.vue:88` `:style="sceneSwapStyle"`; `useSceneTransition.ts:18`). One half of the frame dissolves; the other pops. The shell owns both sides of that seam and chose different motion for each.

**Falsifier.** Observe a scene switch: if the controls region is visually static across the swap, the remount is imperceptible and this is INFO. **UNPROVEN-NEEDS-LIVE** for perceived severity; the remount is decidable from `:key` + per-scene `superKey`.

### D-12 `[R1]` · `--scale-hover` is a live token shadow with a currently-zero delta — MINOR

Census §6.3 flags the flat namespace abstractly ("*98 unprefixed demo custom properties sharing a global namespace with glass-ui's*"; `--kf-*` count **0**). This is a concrete instance. `:36`/`:46` apply `scale-on-hover`, a glass `@utility` (`utilities/btn.css`) reading `var(--scale-hover)`. Both sides declare it at `:root`: glass-ui `--scale-hover: 1.08`, and `design-idioms.css:41` `--scale-hover: 1.08` ("*mirrors glass-ui's*"). The demo copy wins by import order and the values match, so the shadow is **invisible today** — which is the hazard: a glass-ui retune will silently not reach any demo call-site and nothing will fail. Same shape for `--color-gold`.

`[R2] refinement, on the same axis.` The scoped block invents **`--graph-line-fine` and `--graph-line-major`** at `:239,:244`. R1 credits their placement *inside* `.grid-background` rather than `:root` — correct, and I concur. But `<style scoped>` scopes **selectors, never custom-property names**: these are global identifiers that would inherit into any descendant, sitting one word from `layout.css:32–35`'s authoritative `--graph-*` family and undocumented in its comment block. Today `.grid-background` is childless so the exposure is nil; a future `--graph-line-*` in `layout.css` would be silently shadowed here. Two-class taxonomy stands: `--scale-hover`/`--color-gold` are **live** shadows with zero delta; `--graph-*`/`--graph-line-*` are **latent** (glass has no counterpart — `grep -rno "\-\-graph-[a-z-]*:" glass-ui/dist` → empty).

**Falsifier.** Remove `design-idioms.css:41` and observe no visual change today — which confirms rather than refutes.

### D-20 `[R2]` · Inverted hover semantics inside one cluster — MINOR

`:36` and `:46` both carry `scale-on-hover` — `utilities/btn.css`: `&:hover { scale: var(--scale-hover) }`, `1.08` — the controls **grow**. `SharePopover.vue:8` instead binds `sharePopoverOpen ? 'opacity-100' : 'hover:opacity-50'` — at rest opacity 1, on hover **0.5**. It **dims**.

Fading toward transparent is the demo's own *disabled* vocabulary: `style.css:249–252`, `.is-disabled { opacity: 0.5; pointer-events: none }`. So the share control reads as receding — as going *unavailable* — when pointed at, beside two neighbours that lean in. Three controls, 8 px apart, two opposite affective registers.

Note the inheritance: `EditorHeader.vue:26` composes **both** on the same element (`scale-on-hover hover:opacity-50`) — grow and dim at once. The shell dropped the dim from the toggle and kept it on share, so the inconsistency is a partial cleanup, not an original choice.

**Falsifier.** A ruling that a popover *trigger* should recede while plain commands lift (I know of no design system that does this); or evidence that `scale-on-hover` does not apply here — it does, the utility is real and reachable (see C-3).

### D-21 `[R2]` · Icon-rung discord inside one cluster — MINOR

`:39` `<Keyboard class="icon-sm" />` = **16 px**; `SharePopover.vue:11` `<Share2 class="icon-lg" />` = **24 px** (`design-idioms.css:102–119`: `icon-xs` 14 / `icon-sm` 16 / `icon-md` 20 / `icon-lg` 24); `DarkModeToggle`'s glyph is component-sized inside a 36 px box. The `icon-*` family exists precisely to *differentiate* rungs — its own comment records that "61 call-sites used to resolve to nothing, all computing at Lucide's default 24px" — and the shell's three-control ribbon uses two rungs side by side with no stated reason, on a band where D-18 already yields three different box sizes. Inside `SharePopover` itself the same discord recurs: `icon-lg` on the trigger, `icon-md` on both inner buttons (`:29`, `:38`).

**Falsifier.** A design ruling that the share glyph is the cluster's primary and deliberately one rung up — plausible, but nothing in the file or `DESIGN.md` says so, and the sizing of the *box* (D-18) does not follow the glyph, which is what a deliberate hierarchy would do.

### D-22 `[R2]` · `<h2>` used for a deck and a hint that are not sections — MINOR

`EditorStartScreen.vue:40` and `:45` (mounted at `EditorShell.vue:62`) mark the subtitle and the hint as `<h2>`. A screen-reader heading list therefore reads:

> Select an animation · from the list ☰ below, then press Play. · or drag M. cubert

— three peer headings, two of which are running prose. Headings are a navigation structure, not a type ramp; the `--type-title` italic ladder (`:135–154`) is styling and belongs on `<p>`. The file's own comment (`:31–39`) describes them in exactly typographic terms ("the deck joins the poster's own voice… the φ ladder read top-down"), which is the tell: they were chosen as *rungs*, not as *structure*.

Compounding, in the shell's other owned surface: `KeyboardShortcutsModal.vue:12` opens group headings at `<h3>` under a `DialogTitle`, skipping `h2` within the dialog's own outline.

**Falsifier.** A ruling that the deck/hint are section headings for content that follows them (nothing follows — they are the last nodes in the hero), or evidence that AT does not surface them (they carry no `role="presentation"` and are not inside an `aria-hidden` subtree).

### D-23 `[R2]` · The file fails the repo's own formatter — MINOR

Verified, not asserted:

```
$ npx prettier --check demo/components/instrument/shell/EditorShell.vue
[warn] demo/components/instrument/shell/EditorShell.vue
[warn] Code style issues found in the above file.
```

`.prettierrc.json` sets `printWidth: 80`, `tabWidth: 4`, and installs `prettier-plugin-tailwindcss` + `prettier-plugin-classnames` + `prettier-plugin-organize-imports` + `prettier-plugin-merge`. Concretely, from the diff:

- `:3`, `:13`, `:60` exceed 80 chars unwrapped (`:60` is 118);
- class order is unsorted — `aspect-square w-8 scale-on-hover` → `scale-on-hover aspect-square w-8` at `:36` and `:46`; `absolute inset-0 z-controls flex …` → `z-controls pointer-events-none absolute inset-0 flex …` at `:60`;
- **`:75–103` — the entire `AnimationControlsGroup` block — is not indented inside the `<main>` added at `:74`**, which is the visual tell that `<main>` was inserted late and by hand.

The demo's most-read composition file is the one drifting from tooling installed to prevent exactly this drift. On this axis it matters because unsorted class strings are how the D-18 kind of override collision hides.

**Falsifier.** A `.prettierignore` entry covering this path, or a formatter-exempt ruling for `demo/`. I checked: no `.prettierignore` in the repo root.

### D-24 `[R2]` · Two props are justified entirely by a host that is not in the tree — MINOR

`:160` — *"A non-App host (the playground) takes the TRUE default — rail unchanged."*
`:163–164` — *"the playground's \"Assets\" tab … The playground supplies the Assets tab here AS DATA + renders its panel via the `tabs-content` slot."*

`ls demo/` → `app components composables scenes state styles utils` + `DESIGN.md`, `env.d.ts`, `kf-engine.ts`. There is no playground. `AnimationControlsGroup.vue:167,:169` repeats the same phantom host.

The consequence is not cosmetic: `hasControlSurfaces` and `extraTabs` exist, and their **defaults** (`true` and `() => []`) are chosen, *for* that host. `extraTabs` has zero non-default call sites in `demo/`. So two of the shell's nine props are dead surface justified by prose that cannot be checked from this repo — and a reader deciding whether the defaults are right has nothing to check them against.

**Falsifier.** Find a playground host in this repo or a sibling that resolves through the demo's aliases; or a ruling that these props are a published-API contract for external embedders (in which case they want a documented contract, not a comment about a missing consumer).

### D-25 `[R2]` · Every `env(safe-area-inset-*)` term in the anchor chain is inert — MINOR

`demo/app/index.html:6` — `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`. No `viewport-fit=cover`; `grep -rn "viewport-fit" demo/ vite.config.ts scripts/` is **empty**. Per CSS Environment Variables, `env(safe-area-inset-*)` resolves to `0px` without it.

So `layout.css:80`, `:95`, `:115`, `:132` — the safe-area terms deliberately folded into `--dock-band-reserve`, `--dock-band-reserve-stable`, `--dock-top-anchor`, and `--dock-bottom-anchor`, each with a comment explaining why a notched device needs them ("*a notched device's safe-area inset still wins when it exceeds the cap*") — **can never fire**. The engineering is real, careful, and unreachable. And the shell is the surface it was written for: `:3` is a `h-dvh w-dvw` full-bleed root and `:133` calls `initIOSPlatformClass()`, so the component both knows it runs on iOS and asks the layout system for device-aware insets the page has opted out of receiving.

**Falsifier.** Add `viewport-fit=cover` and observe the anchors change — or find a JS-set viewport meta (none: `grep -rn "viewport" demo/app/main.ts` is empty). See **C-7** for the claim this fact killed.

### D-26 `[R2]` · RTL is entirely uncovered, and the shell is half-migrated — MINOR

`grep -rn 'dir="rtl"|dir="auto"|:dir\(|\[dir=' demo/ demo/app/index.html` → empty; `index.html:2` is `<html lang="en">` with no `dir`.

Within the shell the migration is exactly half done. Correct: `placement="right"` resolves through `header-ribbon/styles.css`'s **`inset-inline-end`** (see S-6), and `EditorStartScreen.vue:93` uses **`padding-inline`**. Incorrect: `EditorStartScreen.vue:18` seats the hero with the **physical `left-0`** (its own comment says "the poster hangs at the left *reading* edge" — a reading edge is `inline-start`, not `left`), and `EditorShell.vue:250–253` uses physical `to right` / `to bottom` gradients (immaterial for a symmetric grid, but it is the same habit).

Under `dir="rtl"` the chrome would flip and the hero would not. Honest severity: if the demo does not target RTL this is a scoping decision, not a bug — what is not defensible is doing half of it, because the half that works makes the half that does not look intentional.

**Falsifier.** A ruling that RTL is out of scope (then this is INFO), or a `[dir=rtl]` arm anywhere in `demo/`.

### D-13 `[R1]` · `#backdrop` has no out-of-flow contract — INFO

`:5–10` documents the slot as "*Empty by default (no layer, no cost)*" and relies on the host's content being out of flow. The root is `grid … place-items-center` and `<main>` is its single in-flow item (S-1). An in-flow host backdrop would become a second auto row and displace `main`. `HeroAurora.vue:20–23` is `fixed inset-0`, so the contract holds today by the host's discipline, not the shell's construction. A one-line `position:absolute; inset:0` wrapper would make it structural.

**Falsifier.** A second host supplying in-flow backdrop content — none exists.

### D-14 `[R1]` · One command, four names — INFO

| surface | string | provenance |
|---|---|---|
| accessible name | "Show keyboard shortcuts" | `:35` |
| visible tooltip | "Keyboard shortcuts (?)" | `:42` |
| registry label | "Show shortcuts" | `:190` |
| modal title / description | "Keyboard Shortcuts" / "Press `?` to toggle this panel" | `KeyboardShortcutsModal.vue:5,:7` |

Nothing here is trite or cliché — the copy is short, concrete, and free of the "Effortlessly…/Seamlessly…" register; `MbabbMenu`'s supporting lines ("Copy link or load shared state", "Reset every saved animation to defaults") are genuinely good microcopy. The defect is single-sourcing: the modal renders `shortcut.options.label` (`KeyboardShortcutsModal.vue:22`), so the button that opens the modal **lists itself in that modal under a third name** matching neither its accname nor its tooltip. The `DialogDescription` also duplicates the row the registry already renders for `?`.

`[R2] one addition on the prose axis.` `App.vue:47` passes `hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;"` — a **ZWJ emoji sequence** (U+1F642 ZWJ U+2194 U+FE0F, "head shaking horizontally", Emoji 15.1). Coverage is thin outside recent platform fonts; where the sequence is unsupported it decomposes to two glyphs (🙂↔️) or renders tofu, inside the hero's serif poster at `--type-title`. A hint that may render as two unrelated symbols is a copy risk, not just a font one.

**Falsifier.** A ruling that the registry label is deliberately terser for the modal's narrow (`max-w-md`) column — plausible, hence INFO. For the emoji: a font-coverage matrix showing the sequence resolves on the target platforms.

### D-27 `[R2]` · Two more dead bindings beside D-10 — INFO

- `:135` — `const props = withDefaults(…)`. `grep -n "props" EditorShell.vue` returns **line 135 only**: the binding is never read. The template reads props by auto-exposure; the `const` is residue.
- `layout.css:15` — `--header-items-max-w: 500px`, documented as "*the EditorHeader expanded items-wrapper cap*". `EditorHeader` has zero mounting consumers (D-3). So the geometry authority carries a token for a dead component — and it is that file's **one raw-px literal**, inside a file whose stated thesis (`:1–6`, and the K.W3 M4/C5 ban at D-17) is that raw offsets are banned. The exception outlives the only thing it excepted.

**Falsifier.** A consumer of either. Both greps are exhaustive over `demo/`.

### D-28 `[R2]` · `appear` starts the LCP node at `opacity: 0` — INFO

`:52` — `<Transition name="fade" appear>` resolves to glass-ui's `.fade-enter-from { opacity: 0 }` (`styles/transitions.css`). Chrome excludes `opacity: 0` elements from LCP candidacy, so the `<h1>` that `index.html` protects with a dedicated woff2 preload and a Capsize-matched `"Instrument Serif Fallback"` face (`style.css:69–88`) is ineligible until the enter frame.

**Calibrated so this is not overstated:** the deferral is ≈**one frame** (~16 ms), *not* the 0.2 s transition — the element becomes eligible the instant opacity leaves 0. Exact delta is **UNPROVEN-NEEDS-LIVE**. It is worth naming only because every other actor in that chain (preload, metric-matched fallback, `display=swap`, the whole `style.css:69–88` block) is working hard in the opposite direction, and the shell is the one component that adds a cost to it.

**Falsifier.** A Chrome build counting `opacity: 0` elements as LCP candidates, or a trace showing no LCP shift. Measure before acting.

### D-29 `[R2]` · The design rationale is written in coordinates that no longer resolve — INFO

77 of 262 lines (**29%**) are comment. The design-bearing ones cite `T.D13 (OD-2)`, `T.D9 (OD-4)`, `F.W15.S3`, `J.W7a S4 (D19)`, `W6-3`, `W3.S3`, `inv δ`, `r-modern-web-2026 F-MW-1`, `wave-I.W6.md §6`, plus `proof:hero-two-focal` and `proof:appearance-suffusion`. None resolve within `demo/`; the two `proof:` gates resolve **nowhere at all** (D-19).

I want to be fair about this, because the comments are genuinely valuable: they preserve *why each decision beat its alternative*, which is rare and which is how I was able to falsify four of my own hypotheses in §4. The defect is narrower — as **design documentation** they are addressed to a reader holding the tranche archive, and the archive's enforcement half is gone. A designer opening this file can recover the *story* and cannot recover the *spec*: not which numbers are current (D-5), not whether the assertions still hold (D-19), not what "inv δ" permits (D-8).

**Falsifier.** A `demo/DESIGN.md` (it exists) that resolves these coordinates — I checked: it references `proof:appearance-suffusion` at `:251` as a name, without defining the clause or the numbers.

---

## 4. Cleared — hypotheses raised and killed against the tree

Recorded because a false defect is worse than a missed one, and because each is a plausible-looking trap for the next auditor.

**C-1 `[R1]` · "The 19 shortcuts leak on every scene switch."** `AnimationControlsGroup` is `:key`-remounted (D-11) and `useControlsKeyboardShortcuts.ts:50–71` fires 18 bare `registerShortcut(…)` calls discarding every unregister — which looked like guaranteed duplicate rows in the shortcuts modal. **FALSIFIED.** `glass-ui/dist/keyboard.js`:

```js
function y(e, r, i = {}) { … a.add(s), o.value++;
    let l = () => { a.delete(s) && o.value++; };
    return t() && n(l), l; }        // t = getCurrentScope, n = onScopeDispose
```

`registerShortcut` **self-registers `onScopeDispose`** inside an active effect scope. Both that composable and `:190` run from `<script setup>`. No leak, no duplicate rows. **No defect.**

**C-2 `[R1]` · "`<Transition name="fade" appear>` is dead — no `.fade-*` CSS."** **FALSIFIED.** `glass-ui/dist/styles/transitions.css` defines `.fade-enter-active/.fade-leave-active { transition: opacity var(--duration-fast) var(--ease-standard) }` + `.fade-enter-from/.fade-leave-to { opacity: 0 }`, reachable via `styles/index.css` ← `style.css:3`, **and** guards them under `@media (prefers-reduced-motion: reduce)`.

**C-3 `[R1]` · "`scale-on-hover` is an unguarded transform under PRM."** **FALSIFIED, and better than expected.** `utilities/a11y-overrides.css` under PRM sets `*:not([data-allow-motion]) { transition-duration: 0.1s !important; transition-property: opacity, color, background-color, border-color, box-shadow !important }` — the list **excludes `scale`**, so the hover lift snaps with zero motion rather than animating faster. Correct behaviour, inherited. (`[R2]` I also verified `scale-on-hover` is a real `@utility` in `utilities/btn.css` reachable through `utilities.css` — it is not the phantom class it resembles.)

**C-4 `[R1]` · "`<Tooltip>` at `:30` will throw without a `TooltipProvider` ancestor."** The nearest in-file provider is inside `AnimationControlsGroup` (`:2`), a *sibling* subtree, not an ancestor — and the tree carries a scar from exactly this failure (`CubeScene.vue:39–48`, orphaned reka context throwing "Injection … not found"). **FALSIFIED for every host that exists:** `App.vue:3` wraps the whole shell in `<TooltipProvider>` with the comment "*Shared shell tooltip triggers require one application-lifetime provider*", and `App.vue:28` is the only mount site.

`[R2] confirmation and one qualification.` I reproduced this independently and confirm the kill: `reka-ui@2.9.9/dist/shared/createContext.js:20–25` throws with no fallback, and `App.vue:3` is the rescue. R1's choice not to file it is right and I do not file it. The qualification worth recording for the *consumption* axis (not this one): the asymmetry is that `AnimationControlsGroup:2` and `ChannelControls:2` each defensively mount their **own** provider while the shell that composes them does not — and `shell/index.ts:1` publishes the shell as reusable, so the undocumented host requirement travels with the export. That is a contract-fragility observation for challenge-C, not a design defect here.

**C-5 `[R2]` · "`w-8` is dead because glass-ui component CSS is unlayered and out-cascades Tailwind utilities."** I checked the cascade-layer priority rule (unlayered normal declarations beat layered ones) and expected `.dark-mode-toggle-button { width: 2.25rem }` to defeat `w-8`. **FALSIFIED:** all three relevant sheets self-declare `@layer components { … }` at byte 0 (`dark-mode-toggle.css`, `button/styles.css`, `header-ribbon/styles.css`), so Tailwind's `utilities` layer orders after them and `w-8` wins the inline axis. What survives is the **block** axis — D-18, a smaller and more precise claim than the one I set out to make.

**C-6 `[R2]` · "`.scale-on-hover` is a phantom class — `design-idioms.css:40–41` defines only the token, and the demo has no rule."** The file defines `--scale-hover` with a comment naming a class it does not declare, and the demo has 14 call-sites — the exact shape of the bug `design-idioms.css:92–95` records for `icon-*` ("*61 call-sites used to resolve to nothing*"). **FALSIFIED:** the rule is glass-ui's `@utility scale-on-hover` in `utilities/btn.css`, reachable via `utilities.css` ← `index.css` ← `style.css:3`. The token comment is a *mirror*, not an orphan. (This is D-12's live shadow, not a dead class.)

**C-7 `[R2]` · "The ribbon's raw `inset-block-start: 0` + `padding: 1rem` puts its 40 px band at y ∈ [16, 56] px — under a modern iPhone's status bar / Dynamic Island."** The token math is right and the conclusion is wrong. **FALSIFIED by D-25:** without `viewport-fit=cover` the layout viewport already begins *below* the status bar, so `top: 0` is the safe-area edge, not the physical one. I withdraw the occlusion claim entirely. What survives is the inverse and more interesting fact — the safe-area machinery in `layout.css` is inert — which is filed as D-25.

---

## 5. Superlatives (L-18 runs both ways)

### S-1 `[R1]` · The `<main>` landmark box, and its precondition actually holds — *qualified by D-16*

`:67–74`: *"A REAL layout box — not `display:contents`, which strips the box AND the implicit `main` role from the a11y tree. `place-self-stretch` fills the grid's single center cell … byte-identical layout, real landmark box."*

Both halves are right, and the second is the one usually wrong in this pattern. `display: contents` on an element with an implicit role has a documented history of dropping that element from the a11y tree in shipping engines — a real box is the correct fix, not a superstition. And the "single center cell" precondition **verifies against the tree**: enumerate the root grid's children — `#backdrop` (`HeroAurora`, `fixed`), `.grid-background` (`fixed`), `HeaderRibbon` (`position: fixed` per its own sheet), the start-screen wrapper (`absolute`), `KeyboardShortcutsModal` (a portalled `Dialog`) — **every one is out of flow**, leaving `<main>` the sole in-flow grid item. With `grid-auto-rows: auto` and default stretch alignment the single row fills `h-dvh`, and `place-self-stretch` fills it. The layout-equivalence claim is not hand-waving; it is true for a checkable reason.

**`[R2]` qualification, and it is load-bearing.** The credit is for the *box*. **D-16** shows the box is empty of the page's subject: the `<h1>`, both `<h2>`s, and every visible string live outside it. So this is a correctly-built landmark around the wrong content — an excellent fix applied one level too narrowly. A reader should not take S-1 as a clean bill on the shell's document semantics.

**Falsifier.** Any host supplying in-flow `#backdrop`/`#header-left`/`#header-right` content — see D-13; none does.

### S-2 `[R1]` · The `dvh` fallback covers width, in the right layer, for the right reason

`:208–221` guards `@supports not (height: 100dvh)` and supplies **both** `height/max-height: 100vh` **and** `width: 100vw`, with the reasoning explicit at `:209–211`: *"A browser without `dvh` also lacks `dvw` (same spec)"*. That inference is correct (both are CSS Values 4 viewport units) and it is the half practitioners routinely omit — `h-dvh` fallbacks that leave `w-dvw` to collapse are common. The cascade placement is right by construction, not luck: the scoped block is **unlayered**, so it out-cascades Tailwind's `@layer utilities` `h-dvh`/`w-dvw` regardless of specificity, which is exactly what a fallback must do. `HeroAurora.vue:122–127` mirrors the guard on the backdrop layer, so the two co-sized fixed layers degrade together.

**Falsifier.** A browser shipping `dvw` without `dvh` (none known), or a Tailwind build emitting `h-dvh` unlayered (v4 emits into `@layer utilities`).

### S-3 `[R1]` · Backdrop layering by DOM order, zero `z-index` — and it verifies

`:5–9` puts `#backdrop` **before** `.grid-background` and claims the wash therefore paints over `bg-background` but under the ink lines, "*no z-index games*". Checked end to end: `HeroAurora.vue:20–23` is `fixed inset-0` with **no `z-index`**; `.grid-background` (`:13`) is `fixed inset-0` with **no `z-index`** — two positioned `z-index: auto` boxes, which CSS paints in document order. The claim is true, and `HeroAurora.vue:115–117` states the same contract from the other side, so the two files agree. Neither creates a containing block on `.editor-shell` (no `transform`/`filter`/`contain`), so both resolve against the viewport despite the root's `overflow-hidden`. Restraint here is worth naming precisely because the file's neighbours reach for the z-scale for less, and because D-8 shows what happens when a layer *does* take a rung.

**Falsifier.** A `z-index` on either layer, or a `transform`/`filter`/`will-change`/`contain: paint` landing on `.editor-shell` — at which point both `fixed` layers reparent and the stacking argument needs re-deriving.

### S-4 `[R2]` · Theme-invariance by construction — the right mechanism, honestly separated from its values

`:238–248` builds the substrate as `color-mix(in srgb, var(--foreground) N%, transparent)` rather than the two hand-tuned data-URIs it replaced. The consequence is stronger than the comment claims for it: the **WCAG contrast ratio is identical in both arms to three significant figures** — 1.25 : 1 (major), 1.06 : 1 (fine) — because the mix is a fixed fraction of `--foreground` over `--background` at both luminance extremes. The dark twin retires for free, the light and dark rules cannot drift apart, and one declaration replaces two assets.

This is credit for the **mechanism**, and it must be read alongside **D-2**, which shows the *values* do not deliver perceptual parity (ΔL\* 4.3 vs 33.1). The two are not in tension: contrast-ratio invariance and ΔL\* asymmetry are simultaneously true of the same rule, and that they diverge is the sharpest available statement of the problem. Choosing a token-derived mix over baked assets is what makes the fix a one-line token change instead of re-authoring two images — the mechanism earned the option that D-2 asks the team to exercise.

**Falsifier.** Show the ratios differ between arms (I computed both: light `(0.9593+0.05)/(0.7679+0.05)`, dark `(0.0163+0.05)/(0.0031+0.05)` — both 1.25), or show a baked-asset approach with the same edit cost.

### S-5 `[R2]` · Motion is `prefers-reduced-motion`-honest end to end, across three different mechanisms

Traced all three paths independently:

- the `fade` at `:52` inherits glass-ui's PRM arm (`transitions.css`) *and* the blanket `utilities/a11y-overrides.css` rule;
- `AnimatedText.vue:118–125` carries an explicit CSS guard — `@media (prefers-reduced-motion: reduce) { .wave-char { animation: none } }` — on the per-char hero wave;
- `TypingDots.vue:91` routes through the engine's **real** `respectReducedMotion: true` flag, with a matching CSS rest frame at `:117–124` so the dots are readable at `opacity: 0.2` before the first frame *and* under PRM.

I specifically checked whether the `TypingDots` comment (`:119–122`, which *describes* PRM behaviour) was prose-only, because a described-but-unimplemented guard is exactly the failure mode D-19 documents elsewhere in this file. **It is not** — the flag is real and passed to `CSSKeyframesAnimation`. Three components, three mechanisms (inherited CSS / authored CSS / engine flag), all honest, and the engine path is the hardest of the three to get right.

**Marked honestly:** the shell authors none of this. It inherits two layers and composes a third. Credit is for composing correctly and for the engine-side flag being real — not for building. Cross-refs C-2/C-3, and it **verifies census §6.5**, which recorded the PRM delegation as "correct if it holds, unverified statically".

**Falsifier.** A motion path in the shell's subtree with no PRM arm — I enumerated them: the `fade`, `scale-on-hover`, `charLift`, the TypingDots engine loop, and the ribbon's reveal transition (which has both its own `@media` arm *and* the blanket rule). All covered.

### S-6 `[R2]` · The one RTL-correct anchor in the shell's chrome

`:16` passes `placement="right"`, which resolves through `header-ribbon/styles.css`'s **`inset-inline-end`** — a logical property — so the header would flip correctly under `dir="rtl"`. Reaching for the component's placement API instead of hand-rolling `right-0` is the right instinct, and it is the **only** place in the shell where it was taken: `EditorStartScreen.vue:18` pins the hero with physical `left-0` (D-26), and `:250–253` uses physical gradient directions.

Small, but it is the difference between a shell that *could* be internationalised by adding `dir` and one that would need re-authoring — and the correct choice was made on the harder surface (fixed chrome), which is where a physical value is most tempting.

**Falsifier.** Show `placement="right"` resolves to a physical `right` (it does not — the sheet is `[data-placement="right"] { inset-inline-end: 0 }`), or show that `dir` is set somewhere making the distinction moot (it is not — D-26).

---

## 6. Census reconciliation

| census id | this challenge |
|---|---|
| **F-1** (glass-ui phantom dep, RED) | Not re-litigated, but **D-1, D-15, D-18 all rest on the version in `node_modules`** — an undeclared, unlocked 7.0.0. A lockfile fix pinning a different version requires re-deriving `mode`/`inert`/`[data-icon-only]` behaviour. F-1 is a precondition for auditing this component at all. |
| **S-1** (`KfPillTabs` → `SegmentedTabs`, RED) | Its **secondary** claim — that a widget role is a design argument the 7.0.0 aria fix does not answer — is **extended by D-15**: `HeaderRibbon` announces `role="toolbar"` with none of the APG keyboard contract. Same family, different component. |
| **S-2** (type-only `/tabs`, AMBER) | `:126` is one of the three cited sites; the shell is a **carrier** — it imports `SegmentedTabOption` type-only and threads it as `extraTabs` (`:169`). No contradiction. **D-24** adds that `extraTabs` has zero non-default call sites and is justified by a host not in the tree. |
| **§3.1** (`/header-ribbon` = 1 consumption) | Confirmed and load-bearing for D-1: nothing else exercises the ribbon, so the collapsed-and-inert default never had a second chance to be caught. |
| **§4** (roster: 261 L, "shell frame — HeaderRibbon, registerShortcut, DarkModeToggle, Button, Tooltip\*") | Confirmed as inventory. This challenge is what the inventory does not say. |
| **§6.3** (`--kf-*` = 0; flat namespace "worth a lane of its own") | **Made concrete — D-12.** Two-class taxonomy: `--scale-hover`/`--color-gold` are *live* shadows with zero current delta; `--graph-*`/`--graph-line-*` are *latent* (glass has no counterpart). The axis's `--kf-*` hazard does not manifest — `grep -rno -- "--kf-[a-z-]*" demo/` is empty — `--graph-line-*` is its structural analogue. |
| **§6.5** (13 PRM sites; delegation "unverified statically") | **Verified — C-2, C-3, S-5.** EditorShell authors no animation and correctly carries no local PRM guard; the delegation holds across all three mechanisms, with the bonus that the blanket rule's `transition-property` excludes `scale`. |

---

## 7. Recommended order (design axis only; no code was written)

1. **D-1 / D-15** — supply an `#anchor` slot (a real, labelled, ≥44 px trigger) or move the three actions out of the collapsible ribbon; delete `mode="persistent"`; pass an `ariaLabel`. Nothing else on this axis matters while three controls are `inert` and two page functions have no keyboard path. The single highest-value edit: one labelled anchor `Button` closes D-1, unblocks `focusWithin`, gives touch a target, and retires most of D-7 at once.
2. **D-3 / D-4 / D-20 / D-21** — decide the single home for Share and Dark mode (the `MbabbMenu` rows are stronger), leaving the shortcuts trigger as the ribbon's sole tenant with **one** disclosure idiom, **one** hover register, and **one** icon rung.
3. **D-16** — move the start-screen block inside `<main>` (or wrap it in a landmark). One nesting change; it is the only reason the shell's own `<main>` work (S-1) does not fully land.
4. **D-18 / D-7** — drop `aspect-square w-8`, pass `size` on both components, adopt `.tap-floor`. Three lines, and it removes an invisible geometry trap.
5. **D-2 / D-5 / D-19** — split `--graph-opacity`/`--graph-major-opacity` per arm (light needs ≈3–4× the alpha to match dark's ΔL\*), truth-pass the comment, and either restore an executable suffusion gate or delete the sentence that claims one.
6. **D-17 / D-8** — one ruling on whether the header is chrome the geometry authority owns; if yes, a `data-dock-tether="top-end"` arm and a documented `--z-header` rung.
7. **D-6, D-9, D-10, D-11, D-12, D-22…D-29** — cheap, independent; each a single edit or a single ruling. **D-23** (`prettier --write`) is free and makes the rest of the class-string work legible.

## Provenance note

Every glass-ui fact is read from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy the demo resolves — never from the producer repo. Contrast, ΔL\*, and box-geometry figures are computed from the token values quoted inline (sRGB → linear → WCAG relative luminance; L\* via the CIE cube-root transfer; sizes via the resolved `--control-h-*` / `--ui-scale` / `--control-floor` chain) and are reproducible from this file alone. The single command executed against the target repo was a read-only `npx prettier --check` (D-23). **No file in `keyframes.js` was written, mutated, or executed; no installs, no dev server, no browser.** The single write of this task is this document, which merges round 1 rather than replacing it: all 14 round-1 defects, 3 superlatives, and 4 cleared hypotheses are carried forward, one round-1 geometry figure is corrected (D-18), and one round-1 superlative is qualified (S-1 ← D-16).
