# CHALLENGE-C (r6) — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)** — the model this
seat was explicitly spawned with. Declared, not inherited. No sub-agent was spawned from this seat.

---

## Verdict: **DEFECTIVE — BLOCKER**

Five prior passes exist, preserved verbatim at `challenge-C-implementation.r1-prior.md` through
`.r5-prior.md`.

**Disclosure of method.** I read the SFC, `MixPane.vue`, `MixSourceSelector.vue`,
`composables/useMixingState.ts`, `MixAnimationCanvas/{MixAnimationCanvas.vue,composables/*}`,
`demo/styles/animations.css`, the glass-ui 7.0.0 dist for `WatercolorDot` / `DockControl` /
`useClipboard` **including `components/dock/styles/controls/{icon-button,touch-floor}.css`**, both
e2e specs, `test/mix-v4.test.ts`, `docs/tranches/V/megatranche/audit/visual/{REPORT.md,capture.mjs}`
and `shots/safari-desktop-light/mix.png` (read with vision), and ran seven live probes plus one real
`npx playwright test` — **all before opening any prior report** (the Write tool's read-before-write
rule is what put r5 on my screen, the same collision every prior pass records). I then re-aimed the
last three probes at the items r5's own ledger carries as *"not re-measured, and I neither
corroborate nor dispute."*

**What r6 adds — six items, five of them retirements of carried-forward unmeasured claims:**

| id | kind | one line |
|---|---|---|
| **R6-1** | **NEW mechanism + sharpens r4's R4-1** | the scoped `transition` at `:152-154` **outranks and truncates** the `vj-morph` family — measured `transitionProperty: "opacity"` where the family declares `opacity, transform, max-height`. Quotable violation of `animations.css`'s own stated family law. |
| **R6-2** | **retires r3's N-3** (unmeasured ×3 rounds) | Reset drops focus to `<body>`. Measured. |
| **R6-3** | **retires r3's N-4/N-5** (unmeasured ×3 rounds) | `:key="i"` reuses the DOM nodes on re-mix; `vj-enter` never fires. Measured node identity. |
| **R6-4** | **corrects D-12's mechanism** | the ≥44 px touch floor is not "failing" — the producer's `touch-floor.css` selector **explicitly excludes** `.dock-icon-button--compact`. And `capture.mjs:98`'s `< 24` threshold is why REPORT.md cannot see 28 px. |
| **R6-5** | **retires the unreproduced half of D-5** | stale `"Copied!"` over a changed payload, reproduced with timings. |
| **R6-6** | **method** | a cheaper apparatus (`__vueParentComponent.setupState`, no localStorage seeding) that reaches the `type === "color"` branch r5 declared user-unreachable; and an in-page `Element.prototype.querySelector` patch that proves **the consumer's lookup returns null**, which is a tighter statement than "the attribute is absent". |

---

## Substrate and apparatus

- Branch `tranche-u`, dev server live at `http://localhost:9000` (Chromium via Playwright MCP,
  1280 × 720). `MixResultDisplay.vue` unchanged since the Glass 7.0.0 adoption.
- **No source file was modified by this seat.** All instrumentation is in-page and transient.
- Screenshot archived at `evidence/r6/r6-settled-palette-plate.png`.
- I did not need r5's `localStorage` palette seeding. `document.querySelector('main')` →
  walk `__vueParentComponent` until `setupState` carries `startMix` → assign `setupState.mixResult`
  / `.selectedColors` / `.animationPhase` directly. This drives every branch of the plate, including
  the ones the dead add-slot walls off, in one `evaluate` call. Recommended for the next seat.

---

## The governing mechanism (six passes now agree)

```
$ grep -o "inheritAttrs:.\{0,40\}" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
inheritAttrs: !1,

$ grep -c "tag" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
0
```

`WatercolorDot.vue.d.ts` declares six props — `color`, `variant`, `animate`, `cycleDuration`,
`range`, `seed`. No `tag`. `inheritAttrs: false` with explicit `class`/`style` forwarding only.

The settled result dot's **complete** attribute list, measured live:

```json
{ "dotTag": "SPAN",
  "dotAttrs": ["data-v-292b9032","data-v-0f138735","aria-hidden","class",
               "data-testid","data-variant","style"] }
```

`data-mix-target` (`:72`), `tag` (`:69`, `:81`, `:101`), `title` (`:103`) — none present.

**My tighter reproduction of D-1.** Prior passes proved the attribute absent and inferred that
`mixStage.ts:121` therefore falls back. I patched `Element.prototype.querySelector` **in the page**
to record every `[data-mix-target]` lookup and its result, then fired a mix through the real phase
machine:

```json
{ "samples": [
    {"tag":"sync",      "dt":0,    "phase":"mixing","mixTargets":0,"plates":0,"ghost":0,"dots":0},
    {"tag":"microtask", "dt":12,   "phase":"mixing","mixTargets":0,"plates":1,"ghost":1,"dots":1},
    {"tag":"macro0",    "dt":15,   "phase":"mixing","mixTargets":0,"plates":1,"ghost":1,"dots":1},
    {"tag":"t+150",     "dt":165,  "phase":"mixing","mixTargets":0,"plates":1,"ghost":1,"dots":1},
    {"tag":"t+550",     "dt":566,  "phase":"mixing","mixTargets":0,"plates":1,"ghost":1,"dots":1},
    {"tag":"t+1150",    "dt":1167, "phase":"done",  "mixTargets":0,"plates":1,"ghost":0,"dots":1}],
  "probe": [ {"sel":"[data-mix-target]","found":false} ] }
```

`collectStage` called `querySelector("[data-mix-target]")` **exactly once and got `null`**. The
masking fallback at `mixStage.ts:124` ran. Note also that the ghost plate is mounted from the first
microtask onward (`plates:1, ghost:1` at `dt:12`) — **`flush:"post"` timing in
`useMixingAnimation.ts:182` is correct and is not the fault.** The attribute simply does not exist.

---

# NEW IN r6

## R6-1 · **MAJOR** · **NEW mechanism** — the scoped `transition` at `:152-154` outranks the `vj-morph` family and silently deletes its transform + spring

r4 filed "the plate's `vj-morph` enter is a total no-op"; r5 carried it forward as *not
re-measured*. It is **not a total no-op — it is a truncation**, and the mechanism is a cascade
specificity inversion this component causes.

`MixResultDisplay.vue:149-157`:

```css
.mix-plate {
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.mix-plate--ghost { opacity: 0.55; }
```

Scoped styles compile to `.mix-plate[data-v-0f138735]` → specificity **(0,2,0)**.
`demo/styles/animations.css:103-109` declares the family:

```css
.vj-morph-enter-active {
    transition:
        opacity var(--duration-fast) var(--ease-decelerate),
        transform var(--spring-snappy-duration) var(--spring-snappy),
        max-height var(--duration-normal) var(--ease-decelerate);
    overflow: hidden;
}
```

specificity **(0,1,0)**. Both declare the `transition` **shorthand**, so the higher-specificity
scoped rule replaces the whole declaration — dropping `transform` and `max-height` and swapping the
curve.

**Measured** (MutationObserver captures `getComputedStyle` on the frame `vj-morph-enter-active` is
applied to the plate; a detached probe element gives the family's own values for contrast):

```json
{ "plateWhileMorphEntering": {
    "classes": "mix-plate … bg-well vj-morph-enter-from vj-morph-enter-active",
    "transitionProperty": "opacity",
    "transitionDuration": "0.2s",
    "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transform": "matrix(0.97, 0, 0, 0.97, 0, 4)",
    "opacity": "0" },
  "familyDeclares": "opacity, transform, max-height | cubic-bezier(0, 0, 0.2, 1), linear(0 0%, 0.00652 2.041%, … 1 100%), cubic-bezier(0, 0, 0.2, 1)" }
```

Read that carefully:

- `transitionProperty: "opacity"` — `transform` and `max-height` are **gone**.
- `transitionTimingFunction: cubic-bezier(0.4, 0, 0.2, 1)` — that is `--ease-standard` from the
  scoped rule, **not** the family's `--ease-decelerate` + the `--spring-snappy` `linear()` spring
  (visible in `familyDeclares`).
- `transform: matrix(0.97, 0, 0, 0.97, 0, 4)` — `vj-morph-enter-from`'s `scale(.97) translateY(4px)`
  **is** applied to the element, but since `transform` is no longer a transitioned property it
  **snaps** to identity instead of springing.

The classes fire correctly (`PLATE:vj-morph-enter-from`, `-enter-active`, `-enter-to` all observed);
what is destroyed is the family's curve+geometry pairing.

**This violates a law the repo states in prose.** `demo/styles/animations.css:60-65`:

> *"The family owns the CURVE + TOKEN pairing; a consuming site may parameterise only GEOMETRY
> through the `--vj-*` custom properties (set on the transitioning element or an ancestor — custom
> props inherit)."*

The scoped rule parameterises the **curve**. It is also owner edict 5 (root-level styling, never
per-instance overrides) and edict 6 (animations are never deleted, only moved or tokenized) — the
snappy spring is not moved or tokenized here, it is deleted by accident of specificity.

**Cure (gestalt).** Delete `:152-154` entirely. The plate is already inside a `vj-morph`
`<Transition>` (`MixPane.vue:111`), so the family already owns its opacity; the only thing the
scoped rule adds is the ghost dimming, and `.mix-plate--ghost { opacity: .55 }` at `:155-157` does
not need a `transition` shorthand of its own — it needs the family's hook. If the ghost step must
be eased independently, use `transition-property: opacity` **longhands** (which merge instead of
replacing) or a `--vj-morph-*` custom property, per the stated law.

---

## R6-2 · **MAJOR** · **retires r3's N-3** — Reset drops keyboard focus to `<body>`

Carried as unmeasured through r3, r4 and r5. Measured.

`@click="emit('reset')"` (`:139`) → `MixPane.vue:117` → `useMixingState.reset()` sets
`mixResult = null` → `v-if="mixResult"` (`MixPane.vue:113`) unmounts the plate **including the
button that was just activated**. Nothing restores focus.

**Reproduction** (live; focus the Reset control, click it, read `document.activeElement` after the
`vj-morph` leave completes):

```json
{ "focusBeforeReset": "Reset",
  "focusAfterReset": { "tag": "BODY", "title": null, "isBody": true, "plateStillMounted": false } }
```

A keyboard user who resets is returned to the top of the document and must re-traverse the entire
pane — the color picker's four sliders, four channel tabs, two comboboxes and the source selector —
to get back. WCAG 2.4.3 (Focus Order) / 3.2.1-adjacent.

**Cure.** Focus must land on the control that logically replaces the one destroyed — the `Mix`
button in `MixConfigBar`, which is the pane's next action. That is a `useTemplateRef` + `focus()` in
`MixPane`'s reset handler; it belongs in the parent because the parent owns both the unmount and the
successor.

---

## R6-3 · **MAJOR** · **retires r3's N-4/N-5** — `:key="i"` makes the `vj-enter` TransitionGroup inert on every re-mix

`:99` keys palette swatches by array index. On a re-mix the indices are unchanged, so Vue patches
the existing nodes in place and `TransitionGroup` observes no enter or leave.

**Reproduction** (live; a palette result replaced by a **same-length, different-color** palette,
capturing the first swatch's DOM node identity across the swap):

```json
{ "step1_two":   {"strip":"linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))","dots":2},
  "step2_remix": {"strip":"linear-gradient(to right, rgb(0, 255, 0), rgb(255, 255, 0))",
                  "dots":2, "sameDomNodeReused": true, "hasEnterClass": false} }
```

`sameDomNodeReused: true` — literally the same element object. `hasEnterClass: false` — no
`.vj-enter-enter-active` anywhere in the plate during the swap. The animation runs only when the
palette **grows**; the common case (re-mix at the same length, which is what changing space or hue
method produces) is silent.

This compounds with R6-1: the plate has two declared animations, one truncated by its own scoped CSS
and one keyed into inertness. Both read as present in review.

**Cure.** Key on identity, not position: `:key="`${i}:${color.css}`"`. The seed expression on
`:104` (`i === 0 ? 'mix-result' : \`mix-result-${i}\``) already concedes that position is the wrong
identity by special-casing index 0.

---

## R6-4 · **MINOR** · **corrects D-12's mechanism** — `compact` is the producer's *exclusion selector* for its own touch floor, and the audit threshold is why nobody saw it

Prior passes reported 28 × 28 px against `DockControl`'s docstring promise of *"the HIT CELL stays
the full `--dock-control-size` (≥44px on coarse via the density clamp)"* — reading it as the clamp
failing. It is not failing. It is being opted out of, by this component's own prop.

`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/touch-floor.css`:

```css
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
    min-block-size: var(--dock-touch-target, 2.75rem);
    min-inline-size: var(--dock-touch-target, 2.75rem);
  }
}
```

`compact` (`:122`, `:129`, `:137`) **is** the `:not()`. And `icon-button.css` gives
`.dock-icon-button--compact { width: var(--dock-compact-control-size, auto); height: auto;
padding: var(--dock-compact-control-padding, 0.25rem) }` — with `w-5 h-5` glyphs that is
20 + 4 + 4 = **28 px**, on coarse pointers exactly as on fine. Measured:

```json
[ {"title":"Copy color","ariaLabel":null,"w":28,"h":28},
  {"title":"Save to palettes","ariaLabel":null,"w":28,"h":28},
  {"title":"Reset","ariaLabel":null,"w":28,"h":28} ]
```

**And why the visual audit is silent about it:**
`docs/tranches/V/megatranche/audit/visual/capture.mjs:87,98` —

```js
// tap-target audit: interactive elements smaller than 24x24 CSS px
  .filter((m) => m.w < 24 || m.h < 24);
```

28 ≥ 24. This component contributes **0** to REPORT.md's `smallTapTargets` for `/#/mix` — and 0 to
`namelessButtons`, since `title` satisfies HTML-AAM's last-resort naming. REPORT.md's silence here
is a threshold artifact, not a clean bill. (Both counts are moot anyway: `mixResult` is `null` on a
cold route, so the plate is in **zero** of the 60 captures.)

**Cure.** Not a per-instance size override (edict 5). Set `--dock-compact-control-size` at the plate
root — the exact token idiom `demo/shell/dock/ActionBarToggle.vue:155` already uses for
`--dock-compact-control-padding` — or drop `compact` and let the producer's floor apply.

---

## R6-5 · **MINOR** · **retires the unreproduced half of D-5** — a stale "Copied!" outlives its payload

r5 filed the mechanism (*"`invalidate()` is never called when `result` changes, so a confirmation
survives the payload it belongs to"*) without a reproduction. `useClipboard`'s confirmation is
scope-owned and reset only by its own 1500 ms timer; `useClipboard.d.ts` ships
`invalidate: () => void` — *"Invalidate pending or settled feedback because its payload is no longer
current"* — and `:31` destructures only `{ status, copy }`.

**Reproduction** (live; copy, then change the result 150 ms into the 1500 ms window):

```json
{ "afterCopy":         {"title":"Copied!","shown":"RESULT oklab(0.5 0.1 0.1)"},
  "afterResultChange": {"title":"Copied!","shown":"RESULT oklab(0.9 -0.2 0.3)",
                        "icon":"lucide lucide-check-icon lucide-check w-5 h-5"} }
```

The plate displays `oklab(0.9 -0.2 0.3)` and asserts, with a check mark, that it has been copied.
The clipboard holds `oklab(0.5 0.1 0.1)`. Reachable in the shipped UI under
`prefers-reduced-motion`, where `arm()` completes immediately (`useMixingAnimation.ts:120-125`) so
the ghost window never opens and the action row is never hidden behind it.

**Cure.** `watch(() => result, invalidate)` — one line, using the producer's own API.

---

## R6-6 · **INFO** · method note for the next seat

Two pieces of apparatus that are cheaper and tighter than prior rounds':

1. **Drive the component through `setupState`, not through fixtures.** `document.querySelector('main')`
   → walk `el.__vueParentComponent.parent` until `setupState` has `startMix` → assign
   `setupState.mixResult` / `.selectedColors` / `.animationPhase`. No `localStorage` seeding, no
   `addInitScript`, no API. This reaches **every** branch in one `evaluate`, including
   `result.type === "color"` — the branch r5 correctly reports is unreachable by a *user* in the
   shipped tree (the add-slot is inert) but which is trivially reachable for *audit*.
2. **Patch `Element.prototype.querySelector` in-page** to log `[data-mix-target]` lookups and their
   results. This upgrades the claim from "the attribute is absent from the DOM" to "**the consumer's
   lookup executed and returned null**", which is what actually matters and which no DOM snapshot
   can establish.

Neither modifies a source file.

---

## Corroborated from prior passes (I am the sixth witness; every measurement below is mine)

| prior id | severity | my independent measurement | agrees? |
|---|---|---|---|
| **D-1** | **BLOCKER** | `[data-mix-target]` count **0** at all six sampled points of a full mix; in-page probe shows `collectStage`'s lookup returned `false` (once). Ghost plate present from `dt:12`, so `flush:"post"` is exonerated | ✅ |
| **D-2** | MAJOR | `dotTag: "SPAN"`; complete attribute list contains no `tag`, no `title`, no `data-mix-target`; `grep -c "tag" watercolor-dot.js` → **0** | ✅ |
| **D-11** | **BLOCKER** | e2e RED, pasted below | ✅ |
| D-4 | MAJOR | plate `role: null`, `aria-live: null`, `liveRegionsInPlate: []`; three buttons `ariaLabel: null`, `text: ""`, named only by `title` | ✅ |
| D-5 | MAJOR | forced `writeText` rejection → `afterFail` byte-identical to `before` (`"Copy color"` / copy icon). `copy()`'s `CopyResult` discarded at `:46`; `onCopyError` never passed; `status`'s `"failure"` never rendered | ✅ |
| D-6 / D-9 | MAJOR | `colors: []` → `written: ""`, `buttonTitle: "Copied!"` | ✅ |
| D-7 | MAJOR | `MixPane.vue:49-55` duplicates `:42-47`'s ternary verbatim with `writeClipboard` and **no** feedback; wired to the command palette at `demo/shell/usePaneRouter.ts:222` | ✅ |
| D-8/16 + R5-3 | MAJOR | `colors: []` → strip **retains the previous result's gradient** (`rgb(0,255,0)→rgb(255,255,0)` while the result is empty); same for unparseable members. `result.colors` truthy-not-length at `:91` | ✅ |
| D-12 | MINOR | 28.0 × 28.0 — **but see R6-4 for the corrected mechanism** | ✅ (mechanism corrected) |
| R5-5 (reachability) | BLOCKER | live `.dashed-well` renders `<span aria-hidden="true" … pointer-events:none>` with no `aria-label`, no listener, no `<Plus>`; `shots/safari-desktop-light/mix.png` shows the empty dashed slot and a **disabled** Mix button | ✅ |
| R5-6 | INFO | `:4` imports `TransitionGroup` while `:60`'s `<Transition>` is left to the compiler — both are built-ins; inconsistent and the named import is dead | ✅ |

**Not re-measured, and I neither corroborate nor dispute:** R5-1 (the `parseCssColor("oklch()")`
`TypeError` escaping the `Result` contract and destroying the pane — I reached the plate by state
injection, which bypasses `startMix`'s parse, so my runs cannot speak to it; **it remains the
highest-severity item on this component's ledger and r5's evidence for it is detailed and
specific**), R5-2 (the mid-flight pool landing on the `Discard extras` row), R4-2 (Save's silent
success), R4-3 (ghost 119 px → settled 159 px), N-2, N-6, N-7, D-15, D-17.

---

## The e2e gate, re-run this round

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line

  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Error: expect(locator).toBeVisible() failed

    Locator: getByRole('main', { name: 'Color tool panes' })
             .getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found

      > 42 |     await expect(addSlot).toBeVisible();

  1 failed
```

Third independent confirmation. It dies at line 42 and never reaches line 52
(`[data-mix-target]`) or line 62 (the `oklab(` result text) — the only two assertions that exist to
cover this component. `e2e/smoke/safari/mix-flow.spec.ts:29-32` carries the byte-identical locator.

---

## Test truth (D-11, restated with the exact surviving mutation)

- **No component test exists.** The only mix-named unit file is `test/mix-v4.test.ts` (53 lines); it
  tests `mixColorSequence` arithmetic against `mixColors` and never imports the SFC. **Delete the
  entire `<template>` of `MixResultDisplay.vue` and every vitest test stays green.**
- **The e2e assertions are structurally incapable of catching D-1.** Both specs assert only
  `expect(main.locator("[data-mix-target]")).toBeVisible()` — that the *element exists*, never that
  `collectStage` found it or that the pool landed on it. **Exact green-keeping mutation:** in
  `mixStage.ts:121` replace `root.querySelector<HTMLElement>("[data-mix-target]")` with `null`.
  Nothing in the suite can tell. (Today it is red for the opposite reason — the element is not there
  either.)
- **Cure.** The gate must assert the measured landing, not the markup: have `collectStage` take the
  anchor **element** as an argument (which also deletes the masking fallback at `mixStage.ts:124`),
  and assert the stage's `(tx, ty)` within tolerance of the well's `getBoundingClientRect()`.

---

## Checks that came back clean (negatives, proved)

- **`flush:"post"` is correct.** The ghost plate is in the DOM from the first microtask
  (`plates:1, ghost:1` at `dt:12`). D-1 is an attribute problem, not a race. (The separate re-mix
  `mode="out-in"` window r3/r5 measured at 224–281 ms is real and would matter *if* the attribute
  survived; it is currently moot.)
- **No stale-read hazard.** No `defineModel` (`:25-28` is `defineEmits`); reactive props destructure
  at `:20-23` compiles to `__props.result`, so `wellColor` (`:36`) and the async `onCopy` (`:42`)
  both read fresh. The `shallowRef`-cache cure has no site here.
- **No `ValueUnit` wrapping, no oklch→HSV round-trip, no reka-ui slider** in this file.
- **Zero rAF/timer/listener/observer exposure in this file.** The feature's single rAF is in
  `useMixingAnimation.ts:88-114` behind glass-ui `useRAFLoop` with `pauseWhenHidden: true`, an
  explicit `onBeforeUnmount` stop (`:187`), and a PRM fast-path that **completes** rather than pauses
  (`:120-125`) — correct, and its reasoning is sound. Not a PRM-RAF epidemic site.
- **The phase machine cannot strand.** Every early return in `arm()` calls `onSettled()`.
- **No WebGL.** `WatercolorDot` is CSS/SVG by construction; the mix canvas is 2D.
- **No god module.** 159 lines, one responsibility, one default export.
- **`verbatimModuleSyntax`** satisfied — `:7` is `import type { MixResult }`.
- **Console clean.** `/#/mix` across all four Safari matrices: `pageErrors 0`, `consoleErrors 0`,
  `overflowX 0`, `main 1`; and `0 errors` across this seat's entire live session. (Per R5-1 this
  proves less than it appears to — the pane error boundary swallows throws.)

---

## Ranked ledger (r6)

| # | severity | status | defect |
|---|---|---|---|
| R5-1 | **BLOCKER** | r5, not re-measured by me | `parseCssColor("oklch()"/"rgb()"/"lab()"/"color()")` throws a raw `TypeError` out of the `Result` contract; reachable from ordinary stored palette data; **destroys the whole Mix pane on the Mix click**, invisibly to every console gate |
| D-1 | **BLOCKER** | confirmed ×6 | `data-mix-target` (`:72`) dropped by glass-7 `inheritAttrs:false`; `collectStage`'s lookup measured returning `null`; `mixStage.ts:124` masking fallback runs on **every** mix |
| D-11 / R5-5 | **BLOCKER** | confirmed ×3 | both e2e specs RED at line 42; colours mode unreachable; the plate has had **zero** live coverage for its whole glass-7 life |
| D-2 | MAJOR | confirmed | dead `tag` ×3; dropped `:title`; a palette result's entire text — visible and accessible — is `"RESULT"` |
| **R6-1** | MAJOR | **NEW mechanism** | scoped `transition` at `:152-154` (specificity 0,2,0) truncates `.vj-morph-enter-active` (0,1,0) to `opacity` alone: transform + max-height + the snappy spring deleted. Violates `animations.css`'s stated family law and edicts 5 + 6 |
| **R6-2** | MAJOR | **NEW — retires N-3** | Reset unmounts the focused button; focus falls to `<body>` |
| **R6-3** | MAJOR | **NEW — retires N-4/N-5** | `:key="i"` reuses DOM nodes on re-mix; `vj-enter` never fires |
| D-4 | MAJOR | confirmed | no `aria-live`/`role="status"` for a ≥900 ms async result; buttons named only by `title` |
| D-5 | MAJOR | confirmed | `CopyResult`, `onCopyError` and the `"failure"` status all unconsumed → silent no-op on the LAN-http path the repo ships (`server.host: true`) |
| D-6 / D-9 | MAJOR | confirmed | `?? ""` → `"Copied!"` over an empty clipboard write; `MixResult`'s optional fields make blank states representable |
| D-7 | MAJOR | confirmed | two divergent copy implementations; the command palette routes to the silent one |
| D-8/16 | MAJOR | confirmed | truthiness where length was meant → stale gradient (re-mix) / no `style` at all (first mount) |
| R5-2 · R5-4 · R4-1 · R4-2 · R4-3 | MAJOR | prior rounds | carried; R4-1 superseded in mechanism by R6-1 |
| **R6-4** | MINOR | **corrects D-12** | `compact` **is** the producer's touch-floor exclusion selector; 28 px; `capture.mjs`'s `< 24` threshold explains REPORT.md's silence |
| **R6-5** | MINOR | **NEW — retires D-5's second half** | stale `"Copied!"` over a changed payload, reproduced |
| R5-3 · R4-4 · D-12 | MINOR | confirmed | first-mount empty strip; `"Result"` has no programmatic relation to the value; 28 px controls |
| R4-5 · R5-6 · **R6-6** | INFO | confirmed / new | doubled decorative hiding at `:114-115`; dead `TransitionGroup` import at `:4`; method note |
| N-2 · N-6 · N-7 · D-15 · D-17 | — | r3, not re-measured | carried forward unchanged |

---

## Family grouping (mechanisms, for the cure)

- **F-A · a declared thing the runtime silently declines to honour.** D-1, D-2, D-8/16, R5-3, and now
  **R6-1 and R6-3**. An anchor, a `tag`, a title, a gradient, a *transition family*, an *enter
  animation* — all asserted in source, all discarded at runtime, none with a diagnostic. R5-4's
  measurement (`vue-tsc … --noEmit` → exit 0, 0 lines) is this family's number. The cure is not a
  stricter type check — Vue types unknown component attributes as legal fall-through and CSS has no
  type check at all — it is to **stop routing runtime contracts through mechanisms that fail
  silently**: put `data-mix-target` on a plain element this file owns (`:63` is already a bare
  `div`), pass the anchor to `collectStage` as a value so `mixStage.ts:124`'s masking fallback can be
  *deleted* rather than repaired, and let the animation family own its own `transition` shorthand.
- **F-B · anchoring inside the thing that hides it.** The `mode="out-in"` re-mix window (224–281 ms).
- **F-C · truthiness where length was meant.** `:91`, `:44-45`, `MixPane.vue:44` → D-8/16, D-9, R5-3,
  and the empty `"Mixed Palette"` persisted to the user's library. One discriminated union in
  `useMixingState.ts:32-36` removes all of it.
- **F-D · state the composable models and the component refuses to render.** D-5, D-6, R6-5, R4-2.
  `useClipboard` ships four states, a named failure reason, an error hook and `invalidate()`; `:32`
  projects all of it onto one boolean.
- **F-E · the result is a live region that never says so, and never gives focus a home.** D-4, R4-4,
  and now **R6-2**. The plate is the terminus of an async transition: it must announce
  (`role="status"` on `:54`) and it must own focus across its own unmount.
- **F-F · gates that cannot fail.** D-11 + R5-4 + R5-5 + R6-4 + r3's N-6/N-7: the e2e gate is RED
  before its first relevant line and its assertions could not catch D-1 anyway; the type gate is
  blind by construction; the visual matrix never photographs this component and its tap-target
  threshold (24 px) sits just under this component's size (28 px); and per R5-1 the pane error
  boundary swallows the one throw a console gate could have caught. **Five independent gates, none
  of which can observe this component failing.**
- **F-G · `Result` discipline abandoned at the one boundary that needed it** (r5's, carried).

**The one sentence, r6's version:** a dependency major bump silently voided an attribute-forwarding
contract nothing in this repository can observe — and this round shows the same *silent-decline*
pattern is not confined to that bump: the component's own nine lines of scoped CSS quietly strip the
design system's transition family, its own `:key` quietly disables its own list animation, and its
own `compact` prop quietly opts out of the design system's touch floor. Three self-inflicted
instances of the same shape, in a 159-line file, none of them visible to any gate.

---

## Evidence index

| artifact | establishes |
|---|---|
| in-page `querySelector` patch + 6-point sampling | **D-1** — `collectStage`'s lookup returns `null`; `[data-mix-target]` count 0 at every point; ghost plate present from `dt:12` |
| `grep inheritAttrs / grep -c tag` on `dist/watercolor-dot.js`; `WatercolorDot.vue.d.ts` | the governing mechanism; six declared props, no `tag` |
| live `.dashed-well` `outerHTML` | **R5-5** — the add-slot renders `<span aria-hidden pointer-events:none>` |
| `getComputedStyle` capture on the `vj-morph-enter-active` frame + detached family probe | **R6-1** — `transitionProperty: "opacity"` vs `opacity, transform, max-height`; `--ease-standard` vs the spring |
| focus probe across Reset | **R6-2** — `activeElement` → `BODY`, plate unmounted |
| node-identity probe across a same-length re-mix | **R6-3** — `sameDomNodeReused: true`, `hasEnterClass: false` |
| `touch-floor.css` / `icon-button.css` + 3-button `getBoundingClientRect` + `capture.mjs:87,98` | **R6-4** — `:not(.dock-icon-button--compact)`; 28 × 28; audit threshold `< 24` |
| copy-then-mutate probe | **R6-5** — `"Copied!"` + check icon over `oklab(0.9 -0.2 0.3)` while the clipboard holds `oklab(0.5 0.1 0.1)` |
| rejecting-`writeText` probe | **D-5** — `afterFail` byte-identical to `before` |
| empty/malformed-palette probe | **D-6/D-8/16** — `written: ""` + `"Copied!"`; stale gradient retained |
| pasted `npx playwright test … mix.spec.ts --project=smoke` | **D-11** — RED at line 42 |
| `evidence/r6/r6-settled-palette-plate.png` | the settled palette plate: four dots, one bar, three unlabelled 28 px icons, `innerText === "RESULT"` |
| `visual/shots/safari-desktop-light/mix.png` (read with vision) | the empty dashed add-slot with no `+` glyph and a **disabled** Mix button |

All probes are read-only against the running dev server. **No source file was modified by this
seat.** r5 is preserved verbatim at `challenge-C-implementation.r5-prior.md`.
