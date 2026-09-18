# CHALLENGE-C (r4) — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)** — the model this
seat was explicitly spawned with. Declared, not inherited. No sub-agent was spawned from this seat.

---

## Verdict: **DEFECTIVE — BLOCKER**

Three prior passes of this seat exist, preserved verbatim at `challenge-C-implementation.r1-prior.md`,
`.r2-prior.md` and `.r3-prior.md`.

**Disclosure of method, precisely.** I read the component, its composables, its styles, the glass-ui
7.0.0 dist, both e2e specs and the visual REPORT, and ran probes 1–7 **before opening any prior** —
the same accident r3 records (the write tool refuses an unread file). Probes 8–10 were then aimed
deliberately at the gaps I could see in r3's ledger. So findings `D-*` below are a genuine
**fourth independent witness**, and the `R4-*` block is what survives after r3 is on the table.

**Headline, now on four witnesses:** `data-mix-target` at `MixResultDisplay.vue:69` does not exist in
the shipped DOM. r3's N-1 — that the anchor's *host* is also absent for the first ~quarter-second of
every re-mix — reproduces under my apparatus at **281 ms**.

What r4 adds is small in count and sharp in consequence: **r3's D-3 is not the whole story, and
understating it matters.** r3 proved the scoped `transition` shorthand deletes two of `vj-morph`'s
three channels on `.mix-plate`. I measured the third. It is dead too. The plate's enter transition
is a **complete no-op** — not a degraded one — and the fix r3 implies (restore the shorthand to a
longhand `transition-property`) would leave it a no-op, because the surviving channel is killed by a
different rule through a different mechanism.

---

## Substrate and apparatus

- Branch `tranche-u`. Work order names HEAD `c654824e`; `MixResultDisplay.vue` is untouched at both
  that commit and the current tip (last edit `f2c8f565`, the Glass 7.0.0 adoption), so every finding
  holds at both.
- Read whole: the SFC, `MixPane.vue`, `MixSourceSelector.vue`, `composables/useMixingState.ts`,
  `MixAnimationCanvas/composables/{useMixingAnimation,mixStage}.ts`, `demo/palettes/mix.ts`,
  `demo/palettes/usePaletteStore.ts`, `demo/shell/usePaneRouter.ts`, `demo/styles/animations.css`,
  the glass-ui 7.0.0 dist for `WatercolorDot` / `DockControl` / `useClipboard`, both e2e specs, and
  the visual `REPORT.md` / `REPORT.json` / `STATES.json`.
- Apparatus: 8 Playwright scripts against the live dev server on `http://localhost:9000`, **Chromium
  and WebKit**, desktop 1440×900 and Pixel-7 (coarse pointer). Unreachable states were forced through
  the live `MixPane` instance's own `setupState` — its real reactive source, no stubs. One real
  `npx playwright test` run. Scripts and screenshots archived at `./evidence/`.
- I did **not** re-measure r3's N-2 (fallback-miss distances), N-3 (focus loss on Reset), N-4/N-5
  (index keys and seeds), N-6 (CI runs no Playwright), N-7 (`o7` census skip), D-15 (`DockSeparator`
  1 × 0 px) or D-17 (`.swatch-row` positioning). Those stand on r3's evidence; I neither corroborate
  nor dispute them, and I say so rather than launder them into my own ledger.

---

## The governing mechanism (four passes agree)

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (v7.0.0 — the version the demo resolves in
*every* mode; `vite.config.ts:104-115` forbids source resolution):

```js
E = e(c({ inheritAttrs: !1, __name: "WatercolorDot",
  props: { color, variant, animate, cycleDuration, range, seed },
  setup(e) { let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style); …
    return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, …]),
      "data-testid": "watercolor-swatch", "data-variant": e.variant,
      style: u([f.value, { …, pointerEvents: "none", … }]) }, [ … ]));
```

`inheritAttrs: false`, no `mergeProps($attrs)`, no `tag` prop, root hardcoded `aria-hidden="true"`
and `pointer-events: none`. **Only `class` and `style` survive.** Everything else this component
hands the dot — `data-mix-target` (:69), `tag="div"` (:66, :81, :100), `:title="color.css"` (:103),
`aria-hidden` (:72) — is discarded without a diagnostic: `vue-tsc` models unknown component
attributes as legal fall-through, so the type system is structurally blind to this class.

---

# NEW IN r4

## R4-1 · MAJOR · **CORRECTS / COMPLETES r3's D-3** — the plate's `vj-morph` enter is a *total* no-op, and r3's implied cure does not reach it

r3 measured the channel loss and stopped there:

> `{ "plate": { "prop": "opacity", "dur": "0.2s" }, "vjMorphFamily": { "prop": "opacity, transform, max-height", … } }`
> — *"The 0.44 s transform and 0.3 s height channels are gone on this element."*

Correct, and incomplete in a way that changes the fix. There is a **second, independent** override on
the same element, on the one channel that survived. `MixResultDisplay.vue:155-157`:

```css
.mix-plate--ghost { opacity: 0.55; }
```

Scoped compilation makes that `.mix-plate--ghost[data-v-0f138735]` — specificity **(0,2,0)** — which
outranks `.vj-morph-enter-from { opacity: 0 }` and `.vj-morph-enter-to`
(`demo/styles/animations.css:118-136`, **(0,1,0)**). So the transition's start and end values are
both forced to `0.55` and the declared `opacity 0.2s` interpolates from a number to itself.

And this is not an edge case — it is **every** mount. `MixPane.vue:113-115` renders the plate
`v-if="mixResult"` with `:ghost="animationPhase === 'mixing'"`, while `startMix` assigns `mixResult`
and `animationPhase = "mixing"` in the *same tick* (`useMixingState.ts:90-100`). The plate is
therefore **always born ghosted**. There is no code path on which the enter transition has a live
channel.

**Measured, Chromium** (`evidence/challengeC-probe3.mjs`) — computed opacity sampled every ~43 ms
across the entire enter window, with `vj-morph-enter-active vj-morph-enter-to` applied throughout:

```
"opacityTrace": [[4747,"0.55",true],[4789,"0.55",true],[4831,"0.55",true],[4874,"0.55",true],
                 [4917,"0.55",true],[4960,"0.55",true],[5003,"0.55",true],[5046,"0.55",true],
                 [5088,"0.55",true],[5131,"0.55",true]]
```

**Measured, WebKit** (`evidence/challengeC-probe8.mjs`) — `[t, opacity, transition-property,
transition-duration, hasEnterClass, hasGhostClass]`:

```
… [5295,"0.55","opacity","0.2s",false,true], [5327,"0.55","opacity","0.2s",false,true],
   [5361,"0.55","opacity","0.2s",false,true], [5395,"0.55","opacity","0.2s",false,true] …
ghostH: 119   settledH: 159   settledOpacity: "1"
```

Flat on both engines. `transition-property` is `opacity` alone (r3's finding) **and** opacity cannot
move (mine). Nothing animates. The `vj-morph` name on `MixPane.vue:111` is decoration.

**Why the distinction is load-bearing.** Restoring the longhand — the natural reading of r3's D-3 —
gives back `transform` and `max-height` but leaves `opacity` pinned, so the surface would still snap
rather than fade. **Both overrides must go, and they are different bugs:** one is a shorthand
resetting `transition-property`, the other is a scoped value rule outranking a family's from/to.

The same collision kills the **leave** side on a live path: `reset()` while `phase === "mixing"` —
reachable from the dock's Clear action (`usePaneRouter.ts:220 → clearSelection → reset`, live during
the convergence) — leaves an element still carrying `.mix-plate--ghost`, so `.vj-morph-leave-to
{ opacity: 0 }` loses and the plate disappears abruptly at 0.55.

**Cure.** Presence is a *state of the surface*, not a competing declaration on the channel the
transition owns. `animations.css:62-63` establishes the seam: consuming sites parameterise a family
through `--vj-*` custom properties, never by re-declaring its properties. Express the ghost state on
a channel the family does not claim (a `data-ghost` attribute driving `filter`/`--vj-morph-*`), and
write the plate's own transition as longhand `transition-property`/`-duration` so it composes with
the family instead of resetting it. Two rules must never both claim `opacity` on one element.

**Reproduction.** `node evidence/challengeC-probe3.mjs` (Chromium) · `node evidence/challengeC-probe8.mjs` (WebKit).

---

## R4-2 · MAJOR · **NEW** — Save is a silent no-op *to the user*: it persists, and the UI says nothing at all

`:128-134` emits `save`; `MixPane.vue:38-47` calls `pm.createPalette(...)`. The write succeeds. The
interface is byte-identical before and after.

**Measured** (`evidence/challengeC-probe9.mjs`) — `localStorage["color-palettes"]` around two presses,
with the plate's user-visible surface (text, button titles, icon classes) captured on both sides:

```
"before":        { "count": 0, "names": [] }
"surfaceBefore": { "text": "RESULT\noklab(55% 0.01 0.085)",
                   "titles": ["Copy color","Save to palettes","Reset"],
                   "icons":  ["lucide lucide-copy-icon…","lucide lucide-save-icon…","lucide lucide-rotate-ccw-icon…"] }
"after":         { "count": 1, "names": ["Mixed Color"] }
"surfaceAfter":  { "text": "RESULT\noklab(55% 0.01 0.085)",
                   "titles": ["Copy color","Save to palettes","Reset"],
                   "icons":  ["lucide lucide-copy-icon…","lucide lucide-save-icon…","lucide lucide-rotate-ccw-icon…"] }
"afterSecond":   { "count": 1, "names": ["Mixed Color"] }
```

Plus, from the WebKit run: `liveRegionsInPlate: 0`, `docToasts: 0`. Nothing announces, nothing
flashes, nothing changes. The palette lands in a *different pane*, so there is no ambient
confirmation either — the user's only way to verify a save is to navigate away and look.

This is an **internal contradiction inside a three-button row**: Copy confirms (Check +
`Copied!`, `:123`/`:126`); Save and Reset do not. The component already owns a confirmation idiom
and applies it to exactly one of the three actions. The second press is idempotent
(`usePaletteStore.ts:66-81` dedupes on name + colours and moves the entry to front), so the silence
is not covering a duplication bug — it is simply silence, and a user who presses twice because the
first press seemed not to work is right to be unsure.

**Cure.** One feedback surface for the whole row, not one per lucky button: the `role="status"`
region D-4 already demands, written by all three actions (`Copied`, `Saved to palettes`, `Result
cleared`). `useClipboard`'s success/failure shape is the model — Save wants the same two-state
treatment because `createPalette` can also do nothing you can see (the dedupe branch).

---

## R4-3 · MINOR · **NEW** — the "announced destination" announces the wrong geometry: +40 px settle shift

The ghost plate is the component's stated contract — *"the plate stands as the announced
destination"* (`:12-14`). It announces a box 40 px shorter than the one that arrives.

**Measured, both engines** (`evidence/challengeC-probe5.mjs` Chromium, `challengeC-probe8.mjs` WebKit):

```
ghost 119 px  →  settled 159 px   (single colour)     Δ +40 px
                 settled 171 px   (4-colour palette)  Δ +52 px
```

The plate is the last child of the pane, so this is not a CLS emergency — but it is a reflow the
component causes on every mix, for free, in the one element whose entire job is to pre-announce
where the result will be. It also interacts with r3's N-1: the destination the convergence is
aiming at is both *late* and *the wrong size*.

**Cure.** The ghost branch already knows `result.type` (:71). Give it the settled branch's row
geometry so the announced box is the delivered box.

---

## R4-4 · MINOR · **NEW** — the result value has no programmatic relationship to its own label

`:58` renders a bare `<span>Result</span>`; `:85-87` renders the value in an unrelated sibling
`<span>`. Nothing joins them, and the plate is not a region.

**Measured** (`evidence/challengeC-probe8.mjs`):

```
"labelling": { "plateRole": null, "plateAriaLabel": null, "plateId": null,
               "labelText": "Result", "labelId": null,
               "valueAriaLabelledby": null, "valueRole": null,
               "headingsInPlate": 0 }
```

To assistive tech this is two adjacent orphan strings followed by three nameless buttons (D-4). The
visual grouping the plate's material creates has no semantic counterpart at all.

**Cure.** `id` on the label, `aria-labelledby` on the value (or `role="group"` +
`aria-labelledby` on `.mix-plate`). This is the same edit as D-4's live region and should land with
it, not separately.

---

## R4-5 · INFO · **NEW** — doubled decorative hiding

`:114-115` — `aria-hidden="true"` **and** `role="presentation"` on the same gradient strip. Either
alone removes it from the accessibility tree; together they are redundant, and the pairing implies
an uncertainty about which mechanism is doing the work.

---

## R4-6 · corroborates r3's coverage-gap claim with a second, independent measurement

r3 established the plate appears in none of the 60 visual captures. The gap is structural, not
incidental: `docs/tranches/V/megatranche/audit/visual/STATES.json` contains **no `#/mix` row at
all** — the routes it carries are `#/`, `#/gradient`, `#/browse`, `#/blob`, `#/admin/users`. So there
is no state-capture pathway by which this component could ever be photographed, independent of
whether the mixer works. The REPORT's `/#/mix` `namelessButtons: 1` and its `smallTapTargets` list
(`{"w":160,"h":23,"tag":"input"}`, three 22 px slug buttons, four 12 × 24 channel handles) are
measurements over an **unmounted subtree**: this component's 3 nameless buttons and 3 sub-44 px
targets are absent from both counts.

---

# CONFIRMED INDEPENDENTLY (fourth witness, my own output)

Each measured before I opened any prior.

**D-1 · BLOCKER — `data-mix-target` never reaches the DOM.** The ghost dot's complete attribute list,
sampled while `phase === "mixing"` and the plate is mounted (`evidence/challengeC-probe3.mjs`):

```
"ghostDotAttrs": ["data-v-292b9032","data-v-0f138735","aria-hidden","class","data-testid","data-variant","style"]
"dataMixTargetCount": 0
"ghost": { "platePresent": true, "ghostDot": true,
           "plateClass": "mix-plate … mix-plate--ghost vj-morph-enter-active vj-morph-enter-to" }
```

`mixStage.ts:121-124` then takes its silent fallback on every mix that ships:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");   // always null
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

**r3's N-1 reproduces.** Re-mix (`done → mixing`), sampled every `requestAnimationFrame` from the
`startMix()` call (`evidence/challengeC-probe10.mjs`):

```
{ "t":  22, "ghostClass": true, "wellPresent": false,
  "innerCls": "flex flex-col gap-3 vj-morph-leave-from vj-morph-leave-active" },
{ "t":  75, "ghostClass": true, "wellPresent": false,
  "innerCls": "flex flex-col gap-3 vj-morph-leave-active vj-morph-leave-to" },
{ "t": 281, "ghostClass": true, "wellPresent": true,
  "innerCls": "flex items-center gap-3 vj-morph-enter-from vj-morph-enter-active" },
{ "t": 333, "ghostClass": true, "wellPresent": true,
  "innerCls": "flex items-center gap-3 vj-morph-enter-active vj-morph-enter-to" }
```

**281 ms** here against r3's 239 ms — same mechanism, different machine. `mode="out-in"` at `:60`
serialises leave-then-enter, so at the `flush:"post"` tick where `collectStage` runs
(`useMixingAnimation.ts:169-183`) the plate's inner node is the *content* branch playing its leave.
The docstring's *"the ghost well ([data-mix-target]) mounts in the same reactive flush"* is false by
construction. `MIX_ARRIVE_MS = 700` (`mixStage.ts:22`): the drops are ~40 % of the way across before
the destination element exists. **r3 is right that this invalidates the wrapper-`div` and
`useTemplateRef` cures — both still resolve the anchor from inside the swap.** The destination must
be hoisted out of the `<Transition>` entirely.

**Corollary — the flow is unreachable, so no user has ever seen this component.**
`MixSourceSelector.vue:164-176` hands the same dot `tag="button"`, `aria-label` and `@click`.
Measured (`evidence/challengeC-probe2.mjs` logic, reproduced in probe 3's session):

```
"addSlot": { "tag":"SPAN", "ariaHidden":"true", "ariaLabel":null,
             "pointerEvents":"none", "tabIndex":-1,
             "elementAtCenter":"DIV.swatch-row flex items-center gap-2.5 flex-wrap" }
"chipsAfterClicks":  0     ← real mouse click ×2 at the element centre
"chipsAfterDispatch": 0    ← direct el.click() ×2
```

Not a button, not focusable, not clickable, no listener. Every result-plate state in this report had
to be reached by driving the live `MixPane` instance's own reactive state.

**D-2 · MAJOR — dropped `:title`; a palette result exposes no value to anyone.** Measured on 3- and
4-colour results (`challengeC-probe4.mjs`, `challengeC-probe5.mjs`):

```
"palette3":        { "dotCount": 3, "dotTitles": [null,null,null], "text": "RESULT" }
"paletteSettled":  { "dots": 4, "text": "RESULT", "axDump": 9 }   ← 9 aria-hidden nodes in the plate
```

`plate.innerText` is the literal string `"RESULT"`. Screenshot `evidence/challengeC-plate-palette.png`
— four blobs, a gradient bar, three unlabelled icons, no text. The single-colour branch
(`evidence/challengeC-plate-color.png`) *does* print its value at `:85-87`: **one component, two
contradictory contracts.**

**D-4 · MAJOR — nameless buttons, no live region.** By the visual audit's own accessible-name rule
(`capture.mjs:102-105`: `aria-label || aria-labelledby || textContent`):

```
"buttons": [ {"w":28,"h":28,"title":"Copy color",      "aria":null,"namelessByReportHeuristic":true,"type":"button"},
             {"w":28,"h":28,"title":"Save to palettes","aria":null,"namelessByReportHeuristic":true,"type":"button"},
             {"w":28,"h":28,"title":"Reset",           "aria":null,"namelessByReportHeuristic":true,"type":"button"} ]
"liveRegions": 0        "svgAriaHidden": [null, null, null]
```

Three defects in one row: `title`-only naming (glass-ui's own `DockBackgroundToggle` sets
`aria-label` **and** `title` — `dist/dock.js`); icons not `aria-hidden`; and no announcement for a
result that arrives `MIX_CONVERGE_MS = 900 ms` after activation.

**D-5 · MAJOR — the clipboard failure path is unrendered.** `:32` reads only `"success"` of a
four-valued enum; `:42-47` discards the `CopyResult`; `onCopyError` and `invalidate` are never used
(`dist/composables/dom/useClipboard.d.ts:23-30`). Measured with `navigator.clipboard` shadowed to
`undefined` — the `"no-api"` branch the repo hits over LAN http (`server.host: true`)
(`evidence/challengeC-probe7.mjs`):

```
"clipboardAvailable": false,
"before":          { "title": "Copy color" },
"afterFailedCopy": { "title": "Copy color", "iconIsCheck": false,
                     "anyVisibleFeedback": "RESULT\noklab(55% 0.01 0.085)" },
"consoleNoise": []
```

Zero feedback, zero console noise. The button looks alive and is inert.

**D-6 / D-9 · MAJOR — `?? ""` manufactures a false affirmative.** `{ type:"palette", colors: [] }` is
reachable from the real mixer — `demo/palettes/mix.ts:124` `if (resultLength === 0) return [];` under
the default `discard` strategy (`useMixingState.ts:46`). Measured with the clipboard pre-seeded with
a sentinel (`evidence/challengeC-probe4.mjs`):

```
"palette0copy":   { "title": "Copied!", "clip": "" }   ← { type:"palette", colors: [] }
"colorNoCssCopy": { "title": "Copied!", "clip": "" }   ← { type:"color" }, css undefined
```

The sentinel is gone and the UI claims success. (I also confirm r3's D-6/N-8 mechanism by
code-read — `invalidate()` is never destructured at `:31` — but did not re-run its swap-after-copy
measurement.)

**D-8/D-16 · MAJOR — an empty palette repaints the *previous* result's gradient.** `:91` guards
truthiness, not length, so `[]` is truthy and `:112` assigns `linear-gradient(to right, )`. CSSOM
rejects the invalid value and **keeps the prior declaration** (`evidence/challengeC-probe4.mjs`,
consecutive 1-colour → 0-colour results):

```
"palette1": { "stripInlineBg": "background: linear-gradient(to right, oklab(0.7 0.1 0.05));" }
"palette0": { "stripInlineBg": "background: linear-gradient(to right, oklab(0.7 0.1 0.05));" }
                               ^^^ colors: [] — byte-identical; the stale gradient survives
```

I also confirm r2/r3's retraction on the adjacent point: a **one-stop** gradient is accepted —
`d.style.background = "linear-gradient(to right, oklab(0.5 0 0))"` round-trips intact, while
`"linear-gradient(to right, )"` yields `""`. Only the zero-stop case is the defect.

**D-7 · MAJOR — two divergent copy implementations.** `MixResultDisplay.vue:43-46` and
`MixPane.vue:51-53` are the same expression character for character. The plate's uses `useClipboard`
(confirmation); the pane's `copyResult` — exposed at `MixPane.vue:57` and routed from the dock at
`demo/shell/usePaneRouter.ts:222` — uses `writeClipboard` (none). Same user intent, two code paths,
divergent feedback, and the `?? ""` bug now exists in duplicate.

**D-11 · MAJOR (test truth) — the gate is RED.** Ran it:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line

  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

It dies at line **42**, so `views/mix.spec.ts:52`'s and `safari/mix-flow.spec.ts:40`'s
`[data-mix-target]` assertions have **never been evaluated** — and I have measured that they would
fail if they were (count 0). No unit test exists (`test/demo/` holds only `palettes/`; grep for
`MixResult` across `test/` → empty).

**Vacuous-mutation set.** Even with the upstream break repaired, the four surviving assertions (ghost
anchor visible · `.animate-spin` count 0 · text matches `/^oklab\(/` · console quiet) keep passing
under: deleting all three `DockControl`s (`:120-143`); making `onCopy` always `copy("")`; deleting
the entire palette branch (`:91-117` — the spec only mixes *colours*); swapping `Check`/`Copy` so
success reads as failure; removing `@save`/`@reset`; stripping every ARIA attribute. Every finding in
this report is invisible to the suite.

**D-12 · MINOR — 28 px targets on a genuinely coarse pointer.** Pixel-7 descriptor
(`evidence/challengeC-probe6.mjs` logic):

```
"pointerCoarse": true
"buttons": [ {"w":28,"h":28,"title":"Copy color","minW":"0px","minH":"auto"},
             {"w":28,"h":28,"title":"Save to palettes",…}, {"w":28,"h":28,"title":"Reset",…} ]
"overflowX": 0
```

`DockControl`'s own docstring promises *"the HIT CELL stays the full `--dock-control-size` (≥44px on
coarse via the density clamp)"*; `compact` (`:122`, `:129`, `:137`) opts out and the clamp never
applies outside a dock. Above the repo's 24 px bar (`capture.mjs:98`) and WCAG 2.5.8; below the 44 pt
platform floor — on a destructive control (Reset) with no undo and, per R4-2, no confirmation.

---

## Checks that came back clean (negatives, proved)

- **`verbatimModuleSyntax` — compliant.** `:7` is `import type { MixResult }`; every other import is
  a used value.
- **Vue 3.5 idiom — correct.** Reactive props destructure with default (`:20-23`, `vue@^3.5.34`)
  compiles to `__props.result`, so reads inside `computed` (`:36-40`) and the async handler
  (`:42-47`) are fresh. **No stale read.**
- **No `defineModel`** — the `WritableComputedRef` async-round-trip hazard has no site here; the
  component is props-down / emits-up (`:25-28`).
- **No timers, listeners, observers, or rAF owned by this file. Zero PRM-RAF exposure.**
  `useClipboard` registers `onScopeDispose` in the dist (`t(() => { s = !1; c++; u(); })`), so its
  1500 ms reset timer cannot outlive the scope. The feature's one rAF is
  `useMixingAnimation.ts:88-114` via glass-ui `useRAFLoop` with `pauseWhenHidden: true`, an explicit
  `onBeforeUnmount` stop (`:187`), and a PRM fast-path that *completes* rather than pauses
  (`:120-125`) — correct by construction, and its reasoning is sound.
- **The phase machine cannot strand.** Every early return in `useMixingAnimation.ts:116-158` calls
  `onSettled()`. I reach r2/r3's conclusion independently. **Do not file.**
- **No `ValueUnit` wrapping, no oklch→HSV round-trip, no `parseCssColor`.** The component consumes
  pre-formatted CSS strings. The live `parseCssColor` crash class does not touch this file.
- **No WebGL.** `WatercolorDot` is CSS/SVG by design (its docstring calls itself the deliberate
  suite counterexample); the mix canvas is 2D.
- **No god module.** 159 lines, one job, one default export.
- **The copy confirmation, when the clipboard exists, works.** Title `Copy color` → `Copied!`; icon
  path → `M20 6 9 17l-5-5` (lucide `Check`); clipboard receives `oklab(55% 0.01 0.085)`; auto-reset
  to `Copy color` after `resetMs`. An earlier suspicion of mine that this was broken was a
  probe-selector artifact of my own making and is **retracted**.
- **Route health is real but says nothing about this component.** `/#/mix`: 0 page errors, 0 console
  errors, 0 horizontal overflow (`overflowX: 0` measured on Pixel 7), exactly 1 `main` across all
  four Safari matrices. The only console message on the live pane is the dev-config `VITE_API_URL`
  notice. Per R4-6 the plate contributes nothing to any of those numbers.

---

## Ranked (r4 ledger)

| # | severity | status | defect |
|---|---|---|---|
| D-1 | **BLOCKER** | confirmed ×4 | `data-mix-target` dropped by glass-7 `inheritAttrs:false` → `mixStage.ts:124` silent fallback; **and** the anchor's host is absent for **281 ms** of every re-mix (`mode="out-in"` vs `flush:"post"`). Corollary: the same drop makes the add-slot inert, so `/#/mix` cannot mix at all |
| **R4-1** | MAJOR | **corrects r3 D-3** | the plate's `vj-morph` enter is a **total** no-op: the scoped shorthand deletes transform + max-height (r3) **and** `.mix-plate--ghost[data-v-…]` (0,2,0) pins `opacity` over `.vj-morph-enter-from/-to` (0,1,0). Flat 0.55 trace on both engines. Every mount is a ghost mount, so there is no path on which it runs. Restoring the longhand alone does **not** fix it |
| **R4-2** | MAJOR | **NEW** | Save persists (`count 0→1`, `"Mixed Color"`) with a **byte-identical UI**: no text change, no icon change, no toast, no live region. One of three actions confirms; two do not |
| D-2 | MAJOR | confirmed | dropped `:title`, dead `tag`; a palette result's entire text is `"RESULT"` while the colour branch prints its value |
| D-4 | MAJOR | confirmed | 3 buttons named only by `title`; icons not `aria-hidden`; no `aria-live` for a 900 ms async result |
| D-5 | MAJOR | confirmed | clipboard `failure` never rendered — silent no-op on the LAN-http path the repo ships |
| D-6/D-9 | MAJOR | confirmed | `?? ""` → `Copied!` over an empty clipboard; `MixResult` is non-discriminated so blank states are representable |
| D-7 | MAJOR | confirmed | two divergent copy implementations; the dock routes to the silent one |
| D-8/16 | MAJOR | confirmed | empty palette → invalid gradient → CSSOM retains the **previous** result's bar |
| D-11 | MAJOR | confirmed | gate RED at an earlier line; 0 unit tests; six named mutations survive |
| **R4-3** | MINOR | **NEW** | ghost 119 px → settled 159 px (171 px palette): the announced destination announces the wrong box |
| **R4-4** | MINOR | **NEW** | `"Result"` and the value have no programmatic relationship; plate has no role, no id, no heading |
| D-12 | MINOR | confirmed | 28 px controls under a genuinely coarse pointer, against `DockControl`'s own ≥44 px guarantee |
| **R4-5** | INFO | **NEW** | `aria-hidden` + `role="presentation"` doubled on `:114-115` |
| **R4-6** | INFO | corroborates | `STATES.json` has no `#/mix` row at all — the coverage gap is structural |
| N-2 · N-3 · N-4 · N-5 · N-6 · N-7 · D-15 · D-17 | — | **r3, not re-measured** | fallback-miss distances · focus lost to `<body>` on Reset · `vj-enter` mis-attributed by index key · index-derived seeds re-shape silhouettes · CI runs no Playwright · `o7` census skips silently · `DockSeparator` 1 × 0 px · `.swatch-row` leave has no positioned ancestor |

---

## Family grouping (mechanisms, for the cure)

- **F-A · a declared thing the runtime silently declines to honour.** D-1, D-2, D-8/16, and now
  **both halves of R4-1**. An anchor, a `tag`, a title, a gradient, a transition — asserted in
  source and comments, dropped at runtime, and **not one raises a diagnostic**: `vue-tsc` models
  unknown component attributes as fallthrough, invalid CSS assignments are no-ops, and a losing
  cascade rule is invisible everywhere. This is the defect *class*.
- **F-B · anchoring inside the thing that hides it.** r3's N-1 — and it is why F-A's obvious fixes
  fail.
- **F-C · truthiness where length was meant.** D-8/16, D-9, `MixPane.vue:44` (persists an empty
  palette).
- **F-D · state the composable models and the component refuses to render.** D-5, D-6 — plus **R4-2's
  mirror image**: an action with *no* state model at all. `useClipboard` is strictly richer than the
  boolean projected off it; `createPalette` is strictly richer than the nothing projected off it.
- **F-E · the result is a live region that never says so.** D-4, R4-2, R4-4, r3's N-3.
- **F-F · gates that cannot fail.** D-11 + r3's N-6/N-7, now with R4-6's structural coverage gap: the
  visual matrix has no route entry by which this component could ever be photographed.

**The one sentence, r4's version:** a dependency major bump silently voided an attribute-forwarding
contract nothing in this repository can observe — and the same blindness runs all the way down, so
the component's transition animates nothing, its Save says nothing, its palette result shows nothing,
and its only gate has never reached the line that would notice.

---

## Evidence index

| artifact | establishes |
|---|---|
| `evidence/challengeC-probe3.mjs` | `dataMixTargetCount: 0`; ghost-dot attribute list; flat-0.55 opacity trace (Chromium); 3 nameless buttons; `liveRegions: 0`; inert add-slot |
| `evidence/challengeC-probe4.mjs` | copy confirmation works; dropped `:title`s; `colors: []` false-`Copied!`; stale gradient; one-stop gradient valid |
| `evidence/challengeC-probe5.mjs` | no `vj-enter-*` class on the shipping path; 119 → 159 → 171 px shift; plate screenshots |
| `evidence/challengeC-probe7.mjs` | clipboard-unavailable path produces zero feedback |
| `evidence/challengeC-probe8.mjs` | **WebKit** flat-0.55 trace + `transition-property: opacity` only; label/association dump; save-feedback dump |
| `evidence/challengeC-probe9.mjs` | Save persists `0→1`, UI byte-identical, second press idempotent |
| `evidence/challengeC-probe10.mjs` | re-mix anchor host arrives at **t = 281 ms** (r3's N-1, fourth witness) |
| `evidence/challengeC-plate-color.png` · `challengeC-plate-palette.png` | the two settled states as rendered |
| pasted `npx playwright test e2e/smoke/views/mix.spec.ts` | the gate is RED (D-11) |

All probes are read-only against the running dev server; **no source file was modified by this
seat**, and the `test-results/` directory produced by the Playwright run was removed. r3 is preserved
at `challenge-C-implementation.r3-prior.md`.
