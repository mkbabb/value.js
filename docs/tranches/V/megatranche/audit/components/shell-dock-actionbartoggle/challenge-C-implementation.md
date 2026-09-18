# CHALLENGE-C — `demo/shell/dock/ActionBarToggle.vue` — implementation defect hunt

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat was
explicitly spawned with. Not inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** One BLOCKER (an unrecoverable dock brick, reproduced cross-engine on WebKit and
Chromium, with before/after screenshots), one MAJOR accessibility defect confirmed against Chrome's
real AX tree, one MAJOR state-machine race reproduced **12/12** boots across two engines with an
A/B control, plus four MINOR/INFO findings and one vacuous-gate finding.

The component is 159 lines with 44 lines of header prose asserting three invariants (S.W7-6 boot
seat, T-29 settle stamp, T-36 box model). **Two of the three are violated by the shipped code, and
the oracle written to protect them (`e2e/smoke/oracles/o15-dock-register.spec.ts`) cannot see either
violation** because it only ever visits the one route where the machine happens to work.

Environment: repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `5c13465d`
(the brief said `c654824e`; `git log` at probe time reports `5c13465d` — probes were run against the
live tree). Dev server `http://localhost:9000`. Playwright `webkit-2311` and `chromium-1228`.

---

## C-1 · BLOCKER — the invisible Tools button bricks the entire dock, unrecoverably

### The defect

`ActionBarToggle.vue:92` hides the control from **the tab order only**:

```
:tabindex="visible ? 0 : -1"
```

and `ActionBarToggle.vue:93` emits unconditionally:

```
@click="emit('toggle')"
```

When `visible === false` the control is still in the DOM, still `pointer-events: auto`, still
programmatically focusable, and still emits `toggle`. `Dock.vue:48` accepts that emit
unconditionally (`toggleActionBar()`), setting `actionBarLayerActive = true`; `Dock.vue:113` then
sets `activeLayer = "action-bar"`. But `Dock.vue:153` guards the destination layer with
`v-if="hasAnyActionBar"` — **the layer the group is being switched to does not exist.**

The `DockLayerGroup` therefore has an `active` id matching no child. Every `.dock-face` goes
`inert` + `aria-hidden="true"`, none becomes `is-active`, and `Dock.vue:86-87`'s
`shouldKeepOpen` predicate holds the (now empty) dock open forever. The Back button lives inside
the missing layer, so there is no exit.

### Reproduction (`probe/C1-trap-repro.mjs` — run it)

```
$ node probe/C1-trap-repro.mjs webkit
### [webkit] S0_before
{ "faces": ["dock-face justify-center [inert]","dock-face justify-center [inert]","dock-face is-active"],
  "anyActiveFace": true, "dock": {"w":356,"h":62}, "reachableButtons": 4 }
### [webkit] S1_focused_hidden_tools
{ "focused": true }
### [webkit] S2_after_enter
{ "faces": ["dock-face justify-center [inert]","dock-face justify-center [inert]","dock-face [inert]"],
  "anyActiveFace": false, "dock": {"w":24,"h":62}, "reachableButtons": 0 }
### [webkit] S3_after_recovery_attempts     ← Escape, click, pointer-leave, 12× Tab
{ "faces": [... all [inert] ...], "anyActiveFace": false, "dock": {"w":24,"h":62}, "reachableButtons": 0 }
```

```
$ node probe/C1-trap-repro.mjs chromium      → identical S2/S3 (dock 24×62, reachableButtons 0)
```

Steps: load `http://localhost:9000/#/browse` (any route with no action bar), expand the dock,
`document.querySelector('.dock-tools-btn').focus()`, press **Enter**. The dock collapses from
356×62 to a **24×62 empty capsule**. Escape, clicking, pointer-leave and twelve Tab presses do not
recover it. Only a page reload does.

| before | after (and after every recovery attempt) |
|---|---|
| ![before](probe/C1-dock-before-trap.png) | ![after](probe/C1-dock-after-trap-unrecoverable.png) |

### Reachability — this is not a synthetic-only path

`.focus()` + Enter is precisely what an assistive technology does on activation, and the control
**is in the real accessibility tree** (see C-2). It is not a mouse path: `elementFromPoint` at the
button's centre on `/#/browse` returns a *different* element (`hitIsTools: false`) because the
0-width `overflow:hidden` inner box clips hit-testing. So the reachable actors are AT users and
scripts — which is worse, not better: the only people who can hit it are the ones who cannot see
what happened.

### Mechanism

A half-cure. `tabindex="-1"` addresses *one* of the four ways a control can be reached (sequential
focus) and leaves the other three (AT activation, programmatic focus, script click) open, while the
consumer of the emit assumes the emit is only possible when the destination exists.

### Proposed cure (gestalt, not patch)

Make **presence** — not tab order — the single thing that governs reachability. The slot must be
`inert` when there is no action-bar context, so focus, hit-testing and AT exposure all fall out of
one declaration; `inert` is already this codebase's idiom (glass-ui stamps it on every
non-active `.dock-face`), so this is not a new mechanism:

```
<div class="action-bar-toggle-slot" :inert="!visible" ...>
```

and delete `:tabindex` entirely (it becomes dead). Then `Dock.vue:48` should be
`if (!hasAnyActionBar.value) return;` as a structural belt — a layer group must never be told to
activate a layer that `v-if` has not rendered.

---

## C-2 · MAJOR — the hidden control is exposed to screen readers on 6 of 11 routes

### The defect

`opacity: 0` (`ActionBarToggle.vue:118`) and a `0fr` grid track do **not** remove content from the
accessibility tree. The component relies on exactly that pair plus `tabindex="-1"`, so the Tools
button is announced on every route where there is nothing for it to toggle.

### Evidence — Chrome's real AX tree (CDP `Accessibility.getFullAXTree`), not a heuristic

```
### R2_AX_tree_browse            (route /#/browse, viewport 1440×900)
{ "matches": [ { "role": "button", "name": "Toggle action bar", "ignored": false,
                 "props": ["invalid=\"false\"","focusable=true","focused=true","pressed=\"false\""] } ] }
```

`ignored: false` is the operative word: Chrome is offering this control to AT.

### Route census (`probe/C3-route-census.mjs`, chromium, `axExposed` = non-ignored AX nodes)

| route | desktop `is-visible` | desktop `tabindex` | mobile-390 `is-visible` | `axExposed` (both) |
|---|---|---|---|---|
| `/#/` | ✔ | 0 | ✘ | 1 |
| `/#/palettes` | ✔ | 0 | ✘ | 1 |
| `/#/browse` | ✘ | −1 | ✘ | 1 |
| `/#/extract` | ✘ | −1 | ✘ | 1 |
| `/#/mix` | ✔ | 0 | ✔ | 1 |
| `/#/generate` | ✔ | 0 | ✔ | 1 |
| `/#/gradient` | ✔ | 0 | ✔ | 1 |
| `/#/atmosphere` | ✘ | −1 | ✘ | 1 |
| `/#/blob` | ✔ | 0 | ✘ | 1 |
| `/#/admin/users` | ✘ | −1 | ✘ | 1 |
| `/#/does-not-exist` | ✔ | 0 | ✘ | 1 |

`inertAnc: false` and `ariaHidAnc: false` on **every** row — nothing above the button hides it.
Desktop: exposed-but-invisible on 4/11 routes. Mobile-390: on **7/11**.

WCAG 4.1.2 (Name, Role, Value) and 1.3.1: a control offered to AT with no perceivable counterpart,
whose activation destroys the page's only navigation (C-1).

### Why the audit's own numbers missed it

`docs/tranches/V/megatranche/audit/visual/REPORT.json` counts `namelessButtons` and
`smallTapTargets`; this button has a name and is 32×32, so it scores zero on both — the
REPORT's dock rows (`safari-*/#/admin/*`: 4 small targets, all `Switch to slug` / `Generate new
slug` / `Cancel`) contain no contribution from this component. And
`e2e/smoke/admin/fixtures/a11y-battery.ts:52-56` scopes the whole a11y battery to `main`,
explicitly excluding the dock ("the dock nav is producer chrome"). The hole is structural.

### Proposed cure

Same one declaration as C-1: `:inert="!visible"` on the slot root. `inert` removes the subtree from
the AX tree, from focus, and from hit-testing simultaneously — one mechanism instead of three
partial ones.

---

## C-3 · MAJOR — the settle stamp lands STALE on 12/12 boots; the T-29 clip invariant is violated

### The defect

`ActionBarToggle.vue:60-65`:

```js
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        slotLive.value = true;
        settled.value = true;       // ← never re-checks `visible`
    });
});
```

Two frames elapse between scheduling and running. Nothing cancels the chain and nothing re-reads
`visible` inside it. If presence drops during those two frames, the callback stamps
`settled = true` **while `visible` is false** — the exact state the header (lines 30-31) says can
never exist: *"departure: the stamp drops the moment presence drops — the clip returns BEFORE any
collapse animates."*

### Reproduction — 12/12, two engines (`probe/C2-stale-settle-repro.mjs`)

Plain fresh load of `http://localhost:9000/#/browse`, wait 5 s, read the slot's class list:

```
### [webkit]   STALE_boot_hit_rate  { "runs": 6, "stale": 6 }
### [chromium] STALE_boot_hit_rate  { "runs": 6, "stale": 6 }

resting class list, all 12 runs:  "action-bar-toggle-slot is-live is-settled"
                                                            ^^^^^^^^^^ with NO is-visible
```

Timeline (webkit run 0): `t=385ms  "action-bar-toggle-slot"` → `t=487ms  "…is-live is-settled"`.
`is-live` proves the rAF branch ran (it is the only writer of `slotLive`); `settled` cannot have
come from `onSlotSettled`, because that assigns `settled.value = visible` and `visible` is false.
**The rAF at line 63 is the only possible writer.** Airtight.

### The harm, measured — an A/B control on the same page (`probe/C2-ab-control.mjs`)

Both arms perform the identical arrival (`location.hash = "#/mix"`), sampled at t = 70 ms:

| arm | pre-state | class at 70 ms | `overflow` | clip box | paint box | overpaint |
|---|---|---|---|---|---|---|
| **A** stale-stamped (fresh `/#/browse` boot) | `is-live is-settled` | `is-visible is-live is-settled` | **`visible`** | 62.1px | 107.5px | **45.4px outside the track** |
| **B** healthy (after a real departure) | `is-live` | `is-visible is-live` | `hidden` | 46.2px | 107.1px | 0 — clipped as designed |

Frame-by-frame at the very start of arm A (webkit, `HARM_samples_run5`):

```
t=30ms   cls "is-visible is-live is-settled"  ov=visible  trackW=0px      clipW=0    paintW=104.5  spill=121.5px
t=209ms  cls "is-visible is-live is-settled"  ov=visible  trackW=93.3px   clipW=95.9 paintW=107.4  spill=29.0px
t=323ms  … settles, spill −3.8px (inside)
```

At frame 0 the grid track is **0 px** wide and **104.5 px of Tools control paints anyway**, 121.5 px
past the clip box, over the dock's neighbouring controls, for the full 300 ms `--duration-normal`
grow. Arm B, differing only in the stale flag, clips correctly. This is exactly the class of
artefact the S.W7-6 header prose ("the slot visibly GREW the pill on EVERY load") exists to prevent
— here the content escapes the track entirely rather than growing with it. Its visible severity is
attenuated because the co-transitioning `opacity` ramp is still near 0 at t=30 ms; the invariant
violation and the 45.4 px overpaint are nonetheless real and deterministic.

### Mechanism

A settle **stamp** (a boolean latch written from a deferred callback) instead of a settle
**derivation**. Two independent writers (`rAF` and `transitionend`) both assign `settled`, neither
re-validates the predicate it depends on, and one of them fires two frames after the fact.

### Proposed cure

Delete `settled` as an independently-written latch and let the CSS own the clip release, which
removes both writers and the whole race class. `transition-behavior`/`@starting-style` is not
needed: the release condition is "visible **and** not animating", and both halves are already in
the DOM. Minimal correct version if the ref must stay:

```js
let armFrame = 0;
watch(() => visible, (has) => {
    cancelAnimationFrame(armFrame);
    if (!has) { settled.value = false; return; }
    if (slotLive.value) return;
    armFrame = requestAnimationFrame(() => {
        armFrame = requestAnimationFrame(() => {
            if (!visible) return;              // ← the missing guard
            slotLive.value = true;
            settled.value = true;
        });
    });
}, { immediate: true });
onScopeDispose(() => cancelAnimationFrame(armFrame));
```

The `cancelAnimationFrame` is also the cure for the unguarded-rAF hazard: today the chain has no
handle and no teardown, so it survives unmount and every superseded flap (see C-6).

---

## C-4 · MAJOR — `aria-pressed` and `.is-active` are unobservable: the toggle never reports its state

### The defect

`ActionBarToggle.vue:89` and `:91`:

```
:class="{ 'is-active': active }"
:aria-pressed="active"
```

`active === true` only when `Dock.vue`'s `actionBarLayerActive` is true — and *that* is the exact
condition under which `DockLayerGroup` swaps the **main** layer out. So the button carries its
active state only while it is inside a layer that is `inert`, `aria-hidden="true"` and
`opacity: 0`.

### Evidence — measured at the instant `aria-pressed` is `"true"`

From `probe-abt` `B_after_enter_snap` (webkit, keyboard-activated Tools on `/#/`):

```
"btnAriaPressed": "true",
"btnClass":       "... dock-tools-btn is-active",
"btnCS":          { "background-color": "color(srgb 0.994 0.96 0.926 / 0.8)", "pointer-events": "none" },
"hiddenAncestor": "dock-face",                                  ← inert + aria-hidden="true"
"activeLayerIds": [ …, {"cls":"dock-face is-active",…}, {"cls":"dock-face","inert":true,"ariaHidden":"true"} ]
```

and the producer stylesheet
(`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/crossfade.css`):

```css
.dock-face { … opacity: 0; pointer-events: none; }
.dock-face.is-leaving { … opacity: calc(1 - var(--dock-t)); }
```

So: `aria-pressed="true"` exists **only** beneath `aria-hidden="true"` → no AT will ever announce
it. The `.is-active` background computes but paints only during the ~300 ms exit crossfade
(`.is-leaving`) — the sole moment the state is visible is while the control is disappearing. On
return (Back), `Dock.vue:154` clears `actionBarLayerActive` before the main layer re-enters, so the
active register never paints on the way back either.

Net: the control is a toggle button whose toggled state is unobservable to sighted users **and** to
AT. This is a `role=button` + `aria-pressed` pattern applied to what is structurally a **disclosure
that swaps a region** — `aria-expanded` + `aria-controls` on a control that survives the swap.

### Secondary — focus is destroyed and never restored

Same probe, keyboard path on `/#/`:

```
B_tab_reached_tools     → activeElement = BUTTON.dock-tools-btn "Toggle action bar"
B_after_enter_activeEl  → activeElement = DIV.dock-face is-active, text "lab(92% 88.8 20 / 82.7%)"
B_after_back_activeEl   → activeElement = DIV.dock-face is-active, text "HomeToolsPickerAbout Login  @mbabb"
```

Pressing Enter on Tools lands focus on an unnamed, roleless `<div>` whose accessible text is a raw
colour string. Pressing Back lands it on another unnamed `<div>`. Focus is never returned to the
Tools trigger, and there is no `aria-live` announcing that the dock's contents changed. The
component owns a control whose activation destroys its own focus context and ships no focus
contract at all.

### Proposed cure

Retire the hand-rolled state entirely and speak the producer's API, which is the design-system
contract (edict 4): `DockControl` already takes `active` and emits `aria-pressed` + `data-active` +
the `glass-capsule` register itself (`glass-ui/dist/dock.js` `DockControl` setup). Then re-shape
the ARIA to the actual behaviour — `aria-expanded` + `aria-controls="<action-bar layer id>"` — and
move focus to the action-bar layer's Back control on open and back to the Tools trigger on close.

---

## C-5 · MINOR — two sources of truth for one breakpoint, one of them ruled dead in this repo

`ActionBarToggle.vue:82` and `:103` gate the separator and the affordance arrow on the Tailwind
width utility:

```
<DockSeparator class="hidden lg:block" />
<ArrowRight class="w-3 h-3 text-muted-foreground hidden lg:block" />
```

while line 96 gates the label on the injected prop:

```
<span v-if="isDesktop" …>
```

`isDesktop` is `useMediaQuery("(min-width: 1024px)")` (`Dock.vue:71`). They agree numerically today
and diverge under any container-vs-viewport mismatch or forced layout. More concretely, this repo
already **ruled** against the utility form — `demo/color-picker/App.vue:66-70`:

> "MOB-1 (T round-4) SUPERSEDES the width-only `lg:*` display witnesses with the
> `.app-layout [data-layout]` stamp (the single `isDesktop` truth); the D6-03 exception + D8-1 note
> die — see style.css."

Two `lg:` display witnesses survive here in a component that already receives the ruled truth as a
prop. **Cure:** `v-if="isDesktop"` on both, and drop `hidden lg:block`.

---

## C-6 · MINOR — the rAF chain has no handle, no cancel, no teardown

`ActionBarToggle.vue:60-65` schedules a double `requestAnimationFrame` with no returned id, no
`cancelAnimationFrame`, and no `onScopeDispose`/`onUnmounted`. Consequences, in order of severity:

1. it is the enabling condition for C-3 (a superseded chain still runs and still writes);
2. rapid presence flapping schedules multiple chains that all fire (`slotLive` is only checked at
   *schedule* time, line 59, never at *run* time);
3. it writes to refs after the owning scope is gone.

This is the local shape of the constellation-wide PRM-RAF class. It is **not** a per-frame loop —
there is no `rAF` re-entry, so there is no ongoing frame cost (see negative proof below) — but it
is an unowned deferred write, which is the same defect family.

**Cure:** as shown in C-3 — one `armFrame` id, cancelled on every watcher entry and on scope
dispose.

---

## C-7 · INFO — per-instance styling of a design-system control (edicts 4 + 5)

Three sites style the producer's control from the consumer instance rather than at the design-system
root:

- `ActionBarToggle.vue:154-158` — `.dock-tools-btn { --dock-compact-control-padding: 0.5rem 0.75rem;
  margin-inline: 0.25rem; gap: 0.5em; }`. The header (lines 147-153) defends this as "the
  producer's OWN token hook, never a specificity fight", and that is true of the *mechanism* — but
  the *placement* is still a consumer overriding one instance of a design-system control's box
  model. glass-ui already models size through `shape`/`compact`; the honest home is a `DockControl`
  variant, relayed to the glass-ui BH inbox per the standing relay edict.
- `ActionBarToggle.vue:95` and `:96` — `:style="{ color: accent }"` bound twice, once on the icon
  and once on the label span, for one inherited property. Setting `color` once on the control root
  (or via a `--dock-tools-accent` custom property on `.dock-tools-btn`) makes both inherit and
  halves the per-render style patch.

Measured consequence of the padding override: the Tools trigger renders **32 × 32 CSS px** on a
390 px viewport, against 44 × 44 for the non-compact dock controls (`Back`, `Save edit`) measured in
the same run. It clears WCAG 2.5.8 AA (24 px) and fails 2.5.5 AAA (44 px). Note the producer's
coarse-pointer floor (`glass-ui/dist/components/dock/styles/controls/touch-floor.css`) excludes
*every* control inside `.glass-dock`
(`:not(:where(.glass-dock *))`), so this is a producer-wide register question, not a defect unique
to this component — recorded, not charged.

---

## C-8 · Test truth — the oracle is vacuous with respect to every defect above

`e2e/smoke/oracles/o15-dock-register.spec.ts` is the only spec that inspects this component. All
four of its Tools cases `page.goto("/")` — the *one* route where `visible` is true at boot and the
machine happens to work. It asserts: `is-visible` then `is-settled` present (L75-76), inner
`overflow: visible` (L78), a non-`none` box-shadow under keyboard focus (L100), padding/margins/gap
(L126-129), zero `[title]` (L141/146), and one separator inside the inner box (L163-165).

**Mutations that keep the entire suite green:**

| # | mutation | why it stays green |
|---|---|---|
| M1 | delete `:tabindex="visible ? 0 : -1"` (L92) | no spec reads `tabindex`; C-1 and C-2 get *worse* and nothing fails |
| M2 | `settled.value = visible` → `settled.value = true` (L71) | the only assertion is `is-settled` **present** on `/` |
| M3 | delete the departure reset `if (!has) { settled.value = false; return; }` (L55-58) | no spec ever observes the slot on a no-action-bar route |
| M4 | delete `slotLive` and hardcode `is-live` always on | `is-settled` still arrives via the rAF; `overflow: visible` still holds. The S.W7-6 boot-flicker cure — the component's stated reason for existing — has **no test at all** |
| M5 | delete `:class="{ 'is-active': active }"` (L89) | no spec asserts the active register |

The gap is not accidental. `e2e/smoke/oracles/o10d-display-voice-census.spec.ts:339-350` navigates
to Home *first*, with the comment *"on HOME, where the picker action bar lives (the toggle is
view-dependent)"*, before clicking `Toggle action bar`. The suite **steers around** the exact
condition that produces C-1 rather than asserting against it.

There is no unit test: `vitest.config.ts:21` includes `test/**/*.ts` and `demo/test/**/*.ts`, and
neither contains any reference to `ActionBarToggle`, `.dock-tools-btn` or `action-bar-toggle-slot`
(`grep -rn` over `test/` and `demo/test/` → zero hits).

**Cure:** the missing gate is a two-line negative oracle on a no-action-bar route —
`await expect(page.getByRole("button", { name: "Toggle action bar" })).toHaveCount(0)` on
`/#/browse` — which fails today and passes the moment `:inert="!visible"` lands, closing C-1 and
C-2 with one assertion.

---

## Negative proof — what I checked and found SOUND

These were hunted and are clean; recording them so a later seat does not re-spend the probes.

- **`grid-template-columns` transitions and `transitionend` fire on WebKit.** Measured:
  `{"p":"grid-template-columns","t":6751,"self":true}`. The `@transitionend.self` +
  `propertyName` filter (L69-72) works, and `.self` correctly rejects the ~7 bubbled child
  transitions (`box-shadow`, `background-color`, `color`, `opacity`) recorded in the same window.
  The settle recovery path is not browser-fragile.
- **The settle stamp DOES land on legitimate mid-session arrivals**, including while the dock is
  collapsed (`glass-dock … collapsed`, `visibility: hidden`) — `CASE1`/`CASE2`/`P1` all reach
  `is-visible is-live is-settled` with `overflow: visible`. The collapsed-subtree hypothesis
  (transitions suppressed on a non-rendered subtree) is **disproved**: `transitionend
  grid-template-columns@15416` fires while the dock is collapsed.
- **T-36 box model holds.** `padding 8px 12px`, `margin-inline 4px`, height 32 px at rest — matches
  `o15` L126-129 and the measured sibling scale.
- **No per-frame work.** No `rAF` re-entry, no interval, no observer, no listener added in script.
  The only deferred work is the one-shot double `rAF` (C-6) and one declarative `@transitionend`.
  Nothing to leak per frame.
- **No `ValueUnit`, no colour parsing, no `defineModel`, no WebGL, no network, no reka-ui slider.**
  The named local hazard classes (nesting accumulation, `parseCssColor` crash, `defineModel`
  stale-read, pointer-capture leak, eager WebGL boot) have no surface here. `accent` is a
  pass-through string bound to `style.color`; a malformed value yields an invalid declaration and
  the inherited colour, no throw. The one console error in the visual REPORT
  (`safari-desktop-light /#/: WebGL: context lost`) belongs to the atmosphere canvas, not this
  component.
- **`verbatimModuleSyntax` satisfied** — `import type { Component } from "vue"` (L3) is the only
  type-only import and it is correctly formed.
- **Vue 3.5 idioms satisfied** — reactive props destructure (L38) with a getter source in the watch
  (L53), which is the correct pairing.
- **No god module, no legacy shim, no dual path, no new `shared/` dir, no wrapper component.**
  Edicts 1, 2, 3 clean. Keyframes: the component defines none and deletes none (edict 6 clean).
- **This component contributes 0 rows to the visual audit's measured defect counts.**
  `REPORT.json` `namelessButtons` and `smallTapTargets` for every route contain no entry with
  label `Toggle action bar`; the dock's 4 small-target rows on the admin matrices are
  `Switch to slug` / `Generate new slug` / `Cancel`, all from `SlugEditLayer`.

---

## Defect table

| id | severity | one line | evidence |
|---|---|---|---|
| C-1 | **BLOCKER** | AT-reachable hidden Tools button switches the dock to a `v-if`-absent layer; dock bricks to 24×62, unrecoverable without reload | `probe/C1-trap-repro.mjs`, both engines; screenshots |
| C-2 | **MAJOR** | Invisible control is a non-ignored AX node on 4/11 desktop and 7/11 mobile routes | CDP `getFullAXTree`; `probe/C3-route-census.mjs` |
| C-3 | **MAJOR** | Unguarded double-rAF stamps `settled=true` after presence drops → clip released during the grow, 45.4px overpaint | 12/12 boots, 2 engines; A/B control |
| C-4 | **MAJOR** | `aria-pressed`/`.is-active` set only under `aria-hidden`+`opacity:0`; focus destroyed and never restored | measured `hiddenAncestor`, producer CSS, `activeElement` trace |
| C-5 | MINOR | `hidden lg:block` breakpoint witnesses survive next to the ruled `isDesktop` truth | `App.vue:66-70` ruling vs `ActionBarToggle.vue:82,103` |
| C-6 | MINOR | rAF chain has no id, no cancel, no scope teardown | `ActionBarToggle.vue:60-65` |
| C-7 | INFO | per-instance override of a design-system control's box model + doubled inline `color` | `ActionBarToggle.vue:95,96,154-158`; 32px vs 44px measured |
| C-8 | **vacuous gate** | 5 named mutations keep the whole suite green; the component's stated raison d'être (boot flicker) is untested; the suite steers around C-1 | `o15-dock-register.spec.ts`, `o10d…:339-350` |

## The one-line cure that closes the most

`:inert="!visible"` on the slot root (`ActionBarToggle.vue:77`), with `:tabindex` deleted, closes
C-1 and C-2 outright and is the only change that makes presence — not tab order — the single
governor of reachability.
