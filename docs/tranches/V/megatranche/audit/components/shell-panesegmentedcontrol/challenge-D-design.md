# CHALLENGE-D — `demo/shell/PaneSegmentedControl.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (exact model ID `claude-opus-5[1m]`), the tier declared at spawn.
The seat is declared, not inherited.

## Provenance

| Field | Value |
|---|---|
| Repo | `/Users/mkbabb/Programming/value.js` |
| Branch | `tranche-u` |
| HEAD **as stated in the work order** | `c654824e` |
| HEAD **as measured** | `7775473b` — `git log --oneline -1` → `7775473b docs(V·megatranche): STATE — excavation folded COMPLETE (15/15 on disk), r3 delta row added` |
| Subject | `demo/shell/PaneSegmentedControl.vue`, 52 lines (not ~100) |
| Live probe target | `http://localhost:9000` (WebKit/Playwright, `deviceScaleFactor` 1 for geometry, 3 for crops) |

The branch moved under the work order. Every measurement below is against `7775473b`. The subject file is
unchanged between the two commits (`git log` shows no touch since `Jul 17 14:48`).

## Verdict

**DEFECTIVE.** Twelve defects, two of them blocking. The component's *core job* — telling the user which of
two panes is showing — is performed **incorrectly in RTL** (the indicator marks the wrong tab) and
**backwards in ink in both schemes** (the unselected label is drawn darker than the selected one). Beyond
that, the tranche canon has **already ordered this component retired**, twice, in writing, and it still ships.

---

## 0. Usage census — the W47 gate is LIVE, not vacuous

The work order asks for the actual count. Measured:

```
$ grep -rn "PaneSegmentedControl" demo/ src/ test/ e2e/ api/ | grep -v node_modules
demo/shell/dock/Dock.vue:15:import PaneSegmentedControl from "../PaneSegmentedControl.vue";
demo/shell/dock/Dock.vue:192:  <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner).
demo/shell/dock/Dock.vue:198:      <PaneSegmentedControl
demo/styles/shell.css:119:/* The mobile pane switcher (Dock.vue's PaneSegmentedControl) is mobile-grammar
e2e/smoke/mobile/walk.spec.ts:16: *   2. The `PaneSegmentedControl` (a glass-ui `BouncyTabs` pill living in
e2e/smoke/mobile/walk.spec.ts:91:    // PaneSegmentedControl renders Picker / About; `picker` defaults to
e2e/smoke/mobile/page-load-mobile.spec.ts:6: * One spec that exercises the mobile-only paths: the PaneSegmentedControl
```

```
$ find . -name "PaneSegmentedControl*" -not -path "*/node_modules/*"
./demo/shell/PaneSegmentedControl.vue
```

**Render-site count = 1.** The single consumer is `demo/shell/dock/Dock.vue:198`, inside the wrapper at
`Dock.vue:197` (`<div v-if="viewManager.currentConfig.value.right !== null" class="dock-mobile-panes">`),
imported at `Dock.vue:15`. The remaining four hits are prose (one CSS comment, three e2e comments).

So the CARRY-LEDGER W47 row — `PaneSegmentedControl 1->0 (it lives ALIVE at demo/shell/ for exactly this
gate)` — is **accurate and enforceable**. It is not vacuous.

It is, however, **under-specified**, and that is finding D-4b. The gate names a *file usage count* when the
constitution names a *state model*. See §D-4 for the exact replacement.

---

## 1. Visual truth

### The screenshots

| Matrix | Shot | Control present? |
|---|---|---|
| `safari-mobile-light` | `shots/safari-mobile-light/picker.png` | **yes** — "Picker / About" pill in the dock |
| `safari-mobile-dark` | `shots/safari-mobile-dark/picker.png` | yes |
| `rtl-mobile` | `shots/rtl-mobile/picker.png` | **yes — and wrong** (§D-1) |
| `zoom-200-desktop` | `shots/zoom-200-desktop/picker.png` | yes (200% zoom halves the viewport → `data-layout="mobile"`) |
| `safari-desktop-*` | — | **no** — hidden by `shell.css:123` |
| `forced-colors-desktop` | — | **no** |
| `keyboard-focus-desktop` | — | **no** |
| `reduced-motion-desktop` | — | **no** |

Presence confirmed from `visual/STATES.json` `focused` strings — `zoom-200-desktop /#/` reads
`body[→PickerAbout Login  @mbabb L]` and `rtl-mobile /#/` reads `body[→PickerAbout Login  @mbabb L]`, while
`forced-colors-desktop`, `keyboard-focus-desktop` and `reduced-motion-desktop` all read
`body[→lab(92% 88.8 20 / 82.7%)Hom]` — no pane labels in the accessibility tree at all.

### What the crops show

I captured the control in isolation at 390×844, DPR 3
(`scratchpad/psc-{light-ltr,dark-ltr,light-rtl,light-kbfocus}.png`).

- **Light**: cream indicator on a pale-pink track. "About" (unselected) reads **heavier and darker** than
  "Picker" (selected). The eye is pulled to the wrong word.
- **Dark**: the track is a muddy warm brown, the indicator a lighter brown; "About" is pure white,
  "Picker" is off-white. Same inversion, same direction.
- **RTL**: the cream indicator sits on **"About"** while the page below renders the **Lab picker** — i.e.
  pane 0, "Picker". The control states the opposite of the truth.
- **Keyboard focus**: a raw WebKit system-blue `outline: auto` ring at ~6px radius inside a ~16px capsule,
  bleeding past the track's 3px trim and outside the capsule silhouette.

---

## Defects

### D-1 · BLOCKER — In RTL the pill indicator marks the WRONG tab

`VISUAL-CONSTITUTION.md:89` (§4.2 Component register laws) is explicit and numeric:

> A selected `SegmentedTabs` item has one producer-owned filled indicator **whose four edges match the
> active inner button within 0.5px across orientation/viewport/direction**

Measured at 390×844, `dir="rtl"`, settled 7s after load, before any interaction:

| | `x` | `width` | right edge | centre |
|---|---|---|---|---|
| indicator (`.segmented-indicator`) | 134.94 | 49.36 | 184.30 | 159.62 |
| **pressed** tab (`aria-pressed="true"`, text `Picker`) | 184.00 | 49.09 | 233.09 | **208.55** |
| unpressed tab (text `About`) | 134.91 | 49.09 | 184.00 | **159.45** |

- Left-edge error **49.06 px**; right-edge error **48.79 px**. Tolerance is 0.5 px. **~98× over.**
- The indicator's centre (159.62) sits 0.17 px from the *unpressed* tab's centre and 48.93 px from the
  *pressed* one. It is drawn precisely on the wrong tab — off by exactly one tab width.

The same run in LTR **passes**: indicator `{x:156.94, w:49.36, h:26.75}` vs pressed tab
`{x:156.91, w:49.09, h:26.25}` → Δleft 0.03, Δright 0.30, Δheight 0.50. Inside tolerance. So the failure is
purely directional, which is the axis the constitution names.

**It self-heals after interaction.** Clicking the tab labelled "About" in RTL moves the indicator to
`{x:134.91, w:49.09}` — exactly on "About", now `aria-pressed="true"`, and the body text changes to
`About the color spaces, …`. So the *click* path measures the real element; the *mount* path places the
indicator at `contentBoxLeft + index × tabWidth`, which is correct only in LTR.

**Root cause is upstream and total:**

```
$ grep -c "rtl\|direction" node_modules/@mkbabb/glass-ui/dist/tabs.js
0
```

glass-ui 7.0.0's entire tabs bundle contains zero occurrences of `rtl` or `direction`. The producer's
indicator engine is RTL-unaware by construction.

**Reproduction:** `node scratchpad/psc-probe2.mjs` (run B). Or visually: open
`docs/tranches/V/megatranche/audit/visual/shots/rtl-mobile/picker.png` — the cream pill is on "About"
while the Lab picker renders below.

**Cure (gestalt, not patch):** do not repair the wrapper. The producer owns the indicator; the fix is a
glass-ui BJ-inbox relay — `useSelectionIndicator` must position from the active element's measured rect
(logical, `inset-inline-start`) rather than an index-derived physical offset, and glass-ui must gain an RTL
arm in its visual tests. Downstream, this component is scheduled for deletion (§D-4), so value.js should
**relay, not vendor a local correction** — `VISUAL-CONSTITUTION.md:89` forbids descendant corrections
("W17 deletes descendant corrections").

---

### D-2 · BLOCKER — The selection ink is inverted: the unselected label is drawn darker than the selected one

`SegmentedTabs` encodes its entire state signal in two ink tokens
(`dist/components/tabs/styles/segmented.css`):

```css
.segmented-tab { … color: var(--muted-foreground); … }
.segmented-tab[aria-pressed="true"], .segmented-tab[aria-selected="true"] { color: var(--foreground); }
```

Measured computed `color` on the live control:

| Scheme | selected (`aria-pressed="true"`) | unselected | relative luminance | ink-vs-ink contrast |
|---|---|---|---|---|
| light | `rgb(28, 25, 23)` — L = 0.01004 | `rgb(0, 0, 0)` — L = 0 | unselected is **darker** | **1.20 : 1** |
| dark | `rgb(233, 230, 226)` — L = 0.7943 | `rgb(255, 255, 255)` — L = 1.0 | unselected is **brighter** | **1.24 : 1** |

In both schemes the unselected label has the **higher** contrast against the dock. The ink hierarchy runs
backwards, and its magnitude (1.20:1 / 1.24:1) is far below any perceptual threshold — so the ink carries
effectively **zero** state information, in the wrong direction.

**Mechanism, pinned at the tab node** (`scratchpad/cc.mjs`):

```json
{
 "supportsContrastColor": true,
 "unselectedTabIsInsideGlassDock": true,
 "mutedAtTab": "contrast-color(light-dark(hsl(30 85% 96%), hsl(26 22% 17%)))",
 "fgAtTab":    "light-dark(hsl(24 10% 10%), hsl(30 14% 90%))",
 "contrastColorOfCard_atThisNode": "rgb(0, 0, 0)",
 "unselectedTabColor": "rgb(0, 0, 0)"
}
```

`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/adaptive-legibility.css` contains:

```css
@supports (color: contrast-color(white)) {
  :where(.glass-dock) {
    --dock-fg-on-aurora: contrast-color(var(--card));
    --muted-foreground: contrast-color(var(--card));
  }
}
```

WebKit satisfies that `@supports` (`CSS.supports("color","contrast-color(white)") === true`).
`contrast-color()` returns a **maximum-contrast** pick — pure black or pure white. `--foreground` is *not*
overridden by that block. Therefore **inside `.glass-dock`, `--muted-foreground` is strictly
higher-contrast than `--foreground`**, and every muted/normal ink pair in the dock inverts.

The dock legibility rule exists to *raise* muted ink to a floor over a live aurora. It overshoots past
`--foreground`. That is a producer bug in general — but it becomes a **state-semantics failure** here
because this is the one place in the dock where the muted/normal pair *is* the state model. The design
decision that caused it is local: **this component placed a control whose selected state is
`--foreground`-vs-`--muted-foreground` inside a container that redefines `--muted-foreground` above
`--foreground`.** Nobody checked the interaction.

Consequence against canon: `VISUAL-CONSTITUTION.md:83` (§4.1) — "Selected, failed, pending, withdrawn and
disabled states are **never color-only**." With the ink delta at 1.2:1 and reversed, selection survives
**only** as the glass indicator fill. Remove or flatten that fill — forced colors, reduced transparency,
a `backdrop-filter` failure, monochrome — and the control has no selected state at all.

Note precisely what this is *not*: it is not a legibility failure. Both labels clear 12:1 against their
fields. It is a **hierarchy** failure — the control is legible and wrong.

**Reproduction:** `node scratchpad/psc-probe3.mjs` (light-ltr and dark-ltr blocks); crops
`scratchpad/psc-light-ltr.png`, `scratchpad/psc-dark-ltr.png`.

**Cure:** relay to glass-ui BJ — the dock legibility rule must clamp `--muted-foreground` toward the
foreground floor, never past it (`color-mix` toward `--foreground`, not `contrast-color`), preserving the
muted < normal ordering as an invariant. Locally, nothing: the component is scheduled for deletion.

---

### D-3 · MAJOR — Type jurisdiction violated on both axes (family and rung)

`VISUAL-CONSTITUTION.md:75` (§4 Type jurisdictions) is a closed matrix:

| Semantic role | Exact glass-ui role | Family |
|---|---|---|
| **control or label, including dropdown options** | **`text-small`** | **Plus Jakarta Sans, non-bold** |

and `:78` — "This matrix is **closed** across all eighteen compositions. P019's family-neutral Picker
identity/headline pair is the **sole** paired-scale exception."

A two-way pane switcher is a control. Measured at 390 px:

| | mandated | rendered | source |
|---|---|---|---|
| family | Plus Jakarta Sans (`--font-sans` = `"Plus Jakarta Sans", …`) | **Fraunces** (`--font-display`) | `PaneSegmentedControl.vue:10` `class="font-display"` |
| size | `text-small` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` → **13.775 px** | **12.179 px** | `PaneSegmentedControl.vue:49` `font-size: var(--type-caption)` |

`--type-caption` measured at root = `clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )`. Per the same matrix that
rung belongs to "value, code, or provenance … where the content is a caption", Fira Code. It is the
*smallest* rung in the system. This component is the **only** way to reach the second pane on mobile, and
it is typeset one rung below every other control in the app, in the wrong family.

No exception applies — P019 is the Picker identity/headline pair, not this.

**Reproduction:** `node scratchpad/psc-probe2.mjs`, run A → `"fs": "12.179px"`, `"ff": "Fraunces"`.

**Cure:** delete `font-display` and the `font-size` line; the producer's own `.segmented-tab` rung
(0.8125rem below 640 / 0.875rem above) already sits closer to `text-small` than the override does. Better
still — §D-4 — the control does not survive at all.

*(Scope note: `font-display` on `SegmentedTabs` is a house-wide pattern —
`demo/palettes/browser/admin/AdminNamesPanel.vue:16` does the same. That is a separate family row. It is
worst here because this instance is dock chrome and drops the rung as well as the family.)*

---

### D-4 · MAJOR — The canon already retired this component. It still ships.

Two independent constitutional clauses order its removal:

`VISUAL-CONSTITUTION.md:32` (§3 Proportion laws, law 6):
> Mobile uses one document-scrolling stage→inspector→action sequence beneath the same top dock. Secondary
> controls may enter a shallow disclosure region, but **no global pane selector, left/right split state, or
> simultaneous two-stage miniature survives.**

`VISUAL-CONSTITUTION.md:89` (§4.2):
> **V retires the global Dock `PaneSegmentedControl` and left/right view state.** P092 survives only at
> owner-state, Admin Names state and Mix Colors/Palettes source-mode tabs

And `VISUAL-CONSTITUTION.md:58` supplies the destination:
> The member-route inventory is exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`, `/generate`,
> `/gradient`, `/easing`, `/atmosphere`, `/blob`, and `/about`. **About is a quiet trailing destination
> rather than Picker's companion**

`PaneSegmentedControl` *is* the global pane selector. `useViewManager.mobilePaneIndex` *is* the left/right
view state. Both are alive.

#### D-4b — the W47 gate as written is under-specified

The CARRY-LEDGER row (`reformation/CARRY-LEDGER.md:22`) reads `PaneSegmentedControl 1→0`. That is a *file
usage count*. The constitution retires the component **and the state**. A literal reading of the gate is
satisfiable by inlining `<SegmentedTabs>` into `Dock.vue` — which would take the count to 0 while leaving
the banned global pane selector in place. The gate needs the addendum, spelled out below.

#### The exact replacement

| # | Action | Coordinates |
|---|---|---|
| 1 | Split each `(left, right)` pair into two routes, matching the §5 eleven-route inventory. Delete `right`, `rightLabel`, `defaultPaneIndex` from `PaneConfig`. | `demo/shell/viewSchema.ts:66–95` (type), `:107–232` (the 15 `VIEW_MAP` entries) |
| 2 | Delete `mobilePaneIndex` and the left/right split state. | `demo/shell/useViewManager.ts`, `demo/shell/usePaneRouter.ts` |
| 3 | Delete the render site and its wrapper; route choice already lives in `DockViewSelect`. | `demo/shell/dock/Dock.vue:15` (import), `:192–203` (comment + wrapper + element) |
| 4 | Delete the `.dock-mobile-panes` rule and its comment. | `demo/styles/shell.css:118–125` |
| 5 | Delete the SFC. **This is the 1→0.** | `demo/shell/PaneSegmentedControl.vue` |
| 6 | Re-point the two mobile specs from pane-toggling onto route navigation. | `e2e/smoke/mobile/walk.spec.ts:16,31,91`, `e2e/smoke/mobile/page-load-mobile.spec.ts:6` |

`atmosphere` is already single-pane (`viewSchema.ts:170–178`: `right: null`, `rightLabel: null`) and is the
shape every view converges to.

---

### D-5 · MAJOR — The "root-level compact variant" is a per-instance override of producer internals, and a breakpoint pile the shell already outlawed

`PaneSegmentedControl.vue:36–51` carries a 16-line comment asserting the opposite of what the code does:

```
 * Below sm the control compacts AT THE ROOT (never per-instance): tighter tab
 * padding + the caption type rung on the producer's own .segmented-tab hook.
```

```css
@media (max-width: 639px) {
    .pane-segmented-control :deep(.segmented-tab) {
        padding: 0.25rem 0.375rem;
        font-size: var(--type-caption);
    }
}
```

Four separate violations:

**(a) It is a per-instance override, not a root-level one.** The producer's root is `.segmented-tabs` in
glass-ui. `.pane-segmented-control` is a demo wrapper div that exists for no other purpose than to scope
this `:deep()`. Reaching through `:deep()` into a producer's internal class from one consumer *is* the
per-instance override that edict 5 forbids — the comment launders it by calling the wrapper "the root".

**(b) It re-implements a facility the producer already ships.** `SegmentedTabsProps` exposes:

```ts
responsive?: boolean | SegmentedTabsResponsive;
// breakpoint?: CSS length consumed inside `(min-width: <breakpoint>)`.
//              Defaults to "640px" (Tailwind `sm:`).
```

and the producer's own ladder already steps at exactly that boundary
(`dist/components/tabs/styles/segmented.css`):

```css
.segmented-tab { padding: 0.25rem 0.625rem; font-size: 0.8125rem; }
@media (min-width: 640px) { .segmented-tab { padding: 0.3125rem 0.75rem; font-size: 0.875rem; } }
```

The demo's `max-width: 639px` is the exact complement of the producer's `min-width: 640px`. The consumer
hand-rolled the producer's breakpoint to overwrite the producer's own compact rung.

**(c) It violates the proportion law on tokens and forks.** `PROPORTION-AUDIT.md` §3 law 7 (via
`VISUAL-CONSTITUTION.md:38`): *"Spacing is container-scaled from glass-ui tokens. **No desktop-tight/
mobile-airy fork and no breakpoint pile.**"* The override hardcodes `0.25rem 0.375rem` — raw lengths, not
glass-ui tokens — inside a width-only fork.

**(d) It re-introduces the exact width-only disagreement `shell.css` declares retired.**
`demo/styles/shell.css:104–109`, governing this very control's visibility:

> These are **intentionally UN-media'd — the JS drives the breakpoint, so a media wrapper would
> re-introduce the width-only disagreement the stamp exists to retire.**

Visibility is stamped by JS (`demo/color-picker/App.vue:2`, `:data-layout="isDesktop ? 'desktop' : 'mobile'"`,
gated at `shell.css:123`). Typography is stamped by a width-only media query. **Two disagreeing
breakpoint authorities on one control.** Measured consequence at 1024×1366 iPad portrait — where
`data-layout="mobile"` so the control *is* shown — the width is 1024 ≥ 640, so the override does not apply
and the producer's *desktop* rung renders (14 px / 5×12 px padding). The file's own premise ("This control
lives inside the dock's mobile aperture (312px at 390w)") is false across a large part of the control's
actual visibility domain.

**Measured discontinuity across two CSS pixels of viewport:**

| | 639 px | 641 px | Δ |
|---|---|---|---|
| tab `font-size` | 12.7019 px | 14 px | **+10.2 %** |
| tab `padding` inline | 6 px | 12 px | **+100 %** |
| tab width | 50.66 px | 66.56 px | **+31.4 %** |
| tab height | 27.03 px | 31.00 px | +14.7 % |
| strip width | 107.31 px | 141.13 px | **+31.5 %** |

Without the override the producer's own step is ≈ +12 % in width. **The override nearly triples the
breakpoint discontinuity it was written to smooth.**

**Reproduction:** `node scratchpad/psc-probe2.mjs`, runs C/D/E.

**Cure:** delete the `<style scoped>` block and the wrapper div entirely; if a compact rung is genuinely
wanted below `sm`, it belongs in glass-ui's `segmented.css` as a producer rung (or a `size` prop), relayed
via the BJ inbox — not in a consumer `:deep()`.

---

### D-6 · MAJOR — No accessible name; wrong interaction semantics; no panel linkage

Measured on the live strip:

```json
{ "stripTag": "DIV", "stripRole": "group", "stripAriaLabel": null, "stripAriaLabelledby": null }
```
```json
{ "text": "Picker", "role": null, "ariaPressed": "true",  "ariaControls": null, "tabindex": "0"  }
{ "text": "About",  "role": null, "ariaPressed": "false", "ariaControls": null, "tabindex": "-1" }
```

The sole means of reaching the second pane on mobile announces as **an unnamed `role="group"` containing two
pressed buttons**. The producer supplies every missing piece and the component passes none of them
(`dist/components/tabs/SegmentedTabs.vue.d.ts`):

- `ariaLabel?: string` — "Accessible name shared by the desktop strip and responsive Select." Not passed.
- `semantics?: "toggle" | "tabs"` — omitted, so it "preserves the historical mapping: `pill` → `toggle`".
  But this control *does* reveal a distinct panel; `tabs` is the correct register.
- `SegmentedTabOption.controls?: string` — "emitted as the tab's `aria-controls`, **completing the APG
  tablist↔tabpanel linkage** for consumers that own a panel." `Dock.vue` owns exactly such a panel
  (`PaneSlot.vue`). Not passed.

`VISUAL-CONSTITUTION.md:82` (§4.1): "Selected, failed, pending, withdrawn and disabled states are never
color-only. **Role, accessible name, state/value** and associated error/status are explicit." Role is
generic, name is absent.

**Reproduction:** `node scratchpad/psc-probe.mjs`, run A.

---

### D-7 · MAJOR — The focused state was never designed

Measured after a real `Tab` keypress at 390 px:

```json
{ "activeEl": "segmented-tab", "activeOutline": "3px auto rgb(28, 25, 23)", "activeShadow": "none" }
```

`outline-style: auto` is the **user-agent default ring** — nothing in the design system draws it:

```
$ grep -rl "segmented-tab" node_modules/@mkbabb/glass-ui/dist/ | while read f; do echo "$f $(grep -c focus-visible $f)"; done
node_modules/@mkbabb/glass-ui/dist/tabs.js 0
node_modules/@mkbabb/glass-ui/dist/components/tabs/styles/drag.css 0
node_modules/@mkbabb/glass-ui/dist/components/tabs/styles/segmented.css 0
```

Zero `:focus-visible` rules for `.segmented-tab` anywhere in glass-ui 7.0.0.

`scratchpad/psc-light-kbfocus.png` shows the result: a WebKit **system-blue** ring — a colour that exists
nowhere in this warm pink/cream palette — at roughly 6 px corner radius inside a ~16 px capsule, drawn
outside the tab's border box and therefore **bleeding past the track's 3 px trim, outside the capsule
silhouette**. The ring's geometry disagrees with the material it sits in on radius, colour and containment.

`VISUAL-CONSTITUTION.md:84` (§4.1): "Focus remains visibly distinct from selection **in both schemes,
forced colors and reduced transparency**." Un-tokenised UA chrome cannot be asserted to satisfy that; it was
never designed, so it was never checked.

**Reproduction:** `node scratchpad/psc-probe3.mjs`, `light-kbfocus` block.

---

### D-8 · MAJOR — Three of six state matrices are structurally blind to this component

`demo/styles/shell.css:123` — `[data-layout="desktop"] .dock-mobile-panes { display: none; }` — makes the
component desktop-invisible. The state matrices were captured desktop-only. Coverage:

| Matrix | Viewport | Control captured? | Evidence (`STATES.json` `focused`) |
|---|---|---|---|
| `zoom-200-desktop` | 1440 @ 200 % → 720 eff. | ✅ | `body[→PickerAbout Login  @mbabb L]` |
| `rtl-mobile` | 390 | ✅ | `body[→PickerAbout Login  @mbabb L]` |
| `rtl-desktop` | 1440 | ❌ | `body[→lab(92% 88.8 20 / 82.7%)Hom]` |
| **`forced-colors-desktop`** | 1440 | ❌ | `body[→lab(92% 88.8 20 / 82.7%)Hom]` |
| **`keyboard-focus-desktop`** | 1440 | ❌ | `body[→lab(92% 88.8 20 / 82.7%)Hom]` |
| **`reduced-motion-desktop`** | 1440 | ❌ | `body[→lab(92% 88.8 20 / 82.7%)Hom]` |

The three states most likely to break a glass indicator — **forced colors, keyboard focus, reduced
motion** — have **zero** captures of the one component that is mobile-exclusive. D-7 (the un-designed focus
ring) is precisely the kind of defect this hole conceals, and it was found only because I probed at 390 px
by hand.

**Cure:** the state matrices must be run at the mobile viewport too, or at minimum any component gated by
`data-layout` must be listed as requiring a mobile arm. This is an audit-instrument defect surfaced by this
component, not a defect of the component — recorded here because the seat law asks for unhandled states, and
an unobserved state is indistinguishable from an unhandled one.

---

### D-9 · MINOR — Quadruple-redundant null defence over a schema that forbids null

`demo/shell/viewSchema.ts:73–74`:

```ts
leftLabel: string;          // NEVER null
rightLabel: string | null;
```

Against that, four independent guards:

1. `Dock.vue:200` — `:left-label="…leftLabel ?? ''"` — **dead**: the schema type is non-null.
2. `PaneSegmentedControl.vue:22` — `leftLabel: string | null` — **fabricated nullability**, wider than the schema.
3. `PaneSegmentedControl.vue:31` — `leftLabel ?? ""` — **dead**: `Dock` already coerced.
4. `PaneSegmentedControl.vue:3` — `v-if="leftLabel && rightLabel"` — **dead**.

Guard 4 proven dead by enumeration of all nine `VIEW_MAP` entries:

```
picker      right="about"     rightLabel="About"
palettes    right="palettes"  rightLabel="Palettes"
browse      right="palettes"  rightLabel="Palettes"
extract     right="palettes"  rightLabel="Palettes"
mix         right="mix"       rightLabel="Mix"
generate    right="palettes"  rightLabel="Palettes"
gradient    right="palettes"  rightLabel="Palettes"
atmosphere  right=null        rightLabel=null
blob        right="blob"      rightLabel="Blob"
```

`right === null` **iff** `rightLabel === null`. The only view that could make guard 4 fire (`atmosphere`) is
already suppressed one level up by `Dock.vue:197` (`v-if="…right !== null"`). Guard 4 is unreachable.

Edict 2 (no masking fallbacks) and edict 3 (KISS, no contrivance). The design smell is real: the component
does not trust its caller, the caller does not trust the schema, and the schema is right.

Note the *would-be* failure mode this dead code was reaching for, which is itself a design gap: if a view
ever had `right !== null` with `rightLabel === null`, `Dock`'s wrapper would render, the component's `v-if`
would suppress the control, and the user would be left with an empty div in the dock aperture and **no way
to reach the second pane**. The correct expression of that invariant is a discriminated union on
`PaneConfig` (`{ right: null } | { right: RightPane; rightLabel: string }`), not four `??`s.

---

### D-10 · MINOR — Tap target 49.09 × 26.25 px; the override is what trims it

Measured tab rect at 390 px: **49.09 × 26.25 CSS px**.

- WCAG 2.2 AA SC 2.5.8 (24×24): **passes by 2.25 px** on the short axis.
- WCAG 2.2 AAA SC 2.5.5 / Apple HIG (44×44): **fails by 17.75 px**.

`visual/REPORT.json`'s `smallTapTargets` threshold is `< 24`, which is exactly why this never appeared in the
60-capture sweep — it clears the tripwire by 2.25 px. Absence from the report is not evidence of adequacy.

The demo's own override contributes the trim: producer default below 640 is `padding: 0.25rem 0.625rem`
(4×10 px); the override is `0.25rem 0.375rem` (4×6 px) — **8 px narrower per tab** — plus a 0.82 px
font-size reduction that shrinks the line box.

`PROPORTION-AUDIT.md` §5 law 7: "**Visual glyph size, operable target size and layout reservation are
separate quantities.** Accessibility floors do not require bloated visible chrome." The override collapses
all three into one shrink, which is the same error in the opposite direction.

---

### D-11 · MINOR — Stale producer name in the e2e contract prose

`e2e/smoke/mobile/walk.spec.ts:16` and `:31` describe the component as "a glass-ui **`BouncyTabs`** pill".

```
$ grep -c "BouncyTabs" node_modules/@mkbabb/glass-ui/dist/index.d.ts
0
$ ls node_modules/@mkbabb/glass-ui/dist/components/tabs/
SegmentedTabs.vue.d.ts  composables  constants.d.ts  index.d.ts  styles
```

`BouncyTabs` does not exist in glass-ui 7.0.0. The specs document a contract against a component that was
renamed. Edict 2 adjacency (legacy naming outliving its referent). Fold into the D-4 step-6 spec re-point.

---

### D-12 · MINOR — Unchecked numeric cast over a positional model

`PaneSegmentedControl.vue:11`:

```ts
@update:model-value="(v) => emit('update:modelValue', Number(v) as 0 | 1)"
```

The producer's model is `string`; the consumer's is a positional index `0 | 1`. The `as` is the seam where
the two disagree — an unvalidated assertion that any non-`"0"`/`"1"` emission would carry straight into
`viewManager.mobilePaneIndex`. The deeper design fault is that the model is a **position**, not a **pane
identity**; that is exactly what §D-4's route split dissolves. The inline arrow also allocates a new handler
each render — trivial, but it is there because the wrapper has to translate.

---

## Negative proofs — what I checked and found sound

Recorded so the report is not read as uniformly damning, and so these are not re-litigated.

| Claim | Evidence |
|---|---|
| **Motion is correct and producer-owned.** Under `reducedMotion: "reduce"` the tab transition drops to `opacity/color/background-color/border-color/box-shadow 0.1s` and the indicator **loses** the `glass-drag-grabbable` class (drag disarmed). Matches the producer contract: "Reduced-motion preference forces `full → reduced`." | `scratchpad/psc-probe.mjs`, run E vs run A `indicatorClasses` |
| **No animation was deleted or hand-rolled.** The SFC declares zero `@keyframes` and zero `transition`. Edict 6 satisfied. | `PaneSegmentedControl.vue` (full read, 52 lines) |
| **No layout-forcing animated property.** Motion is `color` + producer `scale`/`translate` on the indicator. | `segmented.css` `.segmented-tab { … scale: 1; translate: 0; }` |
| **`verbatimModuleSyntax` clean.** Both imports are value imports (`computed`, `SegmentedTabs`); no type-only import exists to mis-declare. | `PaneSegmentedControl.vue:17–18` |
| **Vue 3.5 idiom correct.** Reactive props destructure (`const { modelValue, leftLabel, rightLabel } = defineProps<…>()`) used properly; no template ref needed; no `defineModel` stale-read hazard (the component is controlled via explicit prop + emit). | `PaneSegmentedControl.vue:20–28` |
| **LTR indicator geometry passes the constitutional tolerance.** Δleft 0.03 px, Δright 0.30 px, Δheight 0.50 px vs the 0.5 px bound at `VISUAL-CONSTITUTION.md:89`. | `scratchpad/psc-probe2.mjs`, run A |
| **No horizontal overflow, no page errors.** `horizontalOverflow: []`, `pageErrors: []` across all 60 captures. | `visual/REPORT.json` `summary.defects` |
| **The pastel-rainbow identity does not leak.** Six views render the literal `Palettes` as a *pane* label; `VISUAL-CONSTITUTION.md:23` requires every pane label to be neutral ink. Measured inks are neutral (`rgb(0,0,0)` / `rgb(28,25,23)`); no rainbow composition applied. Clean. | `scratchpad/psc-probe3.mjs` `inks` |
| **Not a god module.** 52 lines, one job. Edict 1 satisfied — the defect is that the job should not exist, not that the module is bloated. | `wc -l` |

---

## Mechanism families

| Family | Defects | One cure |
|---|---|---|
| **Producer control mis-seated in a container that redefines its state tokens** | D-2 | glass-ui dock legibility must clamp toward the foreground floor, never past it (BJ relay) |
| **Producer engine is direction-blind** | D-1 | glass-ui indicator positions from the measured active rect, logical axis (BJ relay) + an RTL arm in producer visual tests |
| **Consumer hand-rolls a facility the producer ships, through `:deep()`** | D-3, D-5, D-10 | delete the scoped block and the wrapper; rungs belong in `segmented.css` |
| **The producer's a11y surface is offered and declined** | D-6, D-7 | pass `ariaLabel` / `semantics="tabs"` / `controls`; producer adds a tokenised `:focus-visible` |
| **State model is positional, not identity-based** | D-9, D-12 | the §D-4 route split dissolves both |
| **The component was already retired by canon** | D-4, D-11 | execute the six-step deletion; it subsumes D-3, D-5, D-6, D-7, D-9, D-10, D-12 |
| **Audit instrument blind to layout-gated components** | D-8 | run the state matrices at mobile too |

**Seven of twelve defects are discharged by executing D-4 rather than repairing anything.** That is the
gestalt cure the seat law asks for: the correct transposition is deletion plus a route split, not a patch.
Only D-1, D-2 and D-7 survive deletion — and all three are glass-ui BJ-inbox relays, since the same
`SegmentedTabs` instance persists at the three sites `VISUAL-CONSTITUTION.md:89` preserves (owner-state,
Admin Names, Mix source-mode).

---

## Artifacts

Probe scripts and crops (scratchpad, not tracked):

- `scratchpad/psc-probe.mjs` — 6 matrices: computed style, roles, tokens, focus
- `scratchpad/psc-probe2.mjs` — RTL indicator-vs-pressed geometry + 639/641 boundary (`psc2.json`)
- `scratchpad/psc-probe3.mjs` — cropped captures + ink tokens + real keyboard focus
- `scratchpad/ink.mjs`, `scratchpad/cc.mjs` — the `--muted-foreground` / `contrast-color()` mechanism
- `scratchpad/psc-{light-ltr,dark-ltr,light-rtl,light-kbfocus}.png` — the crops

Tracked evidence relied on:

- `docs/tranches/V/megatranche/audit/visual/shots/rtl-mobile/picker.png` (D-1)
- `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` (D-2, D-3)
- `docs/tranches/V/megatranche/audit/visual/{REPORT.json,STATES.json}` (D-8, D-10)
