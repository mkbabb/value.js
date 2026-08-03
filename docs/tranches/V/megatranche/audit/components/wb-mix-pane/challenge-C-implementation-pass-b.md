# CHALLENGE-C · `demo/workbenches/mix/MixPane.vue` — implementation (pass B)

> **Pass A is preserved verbatim at `challenge-C-implementation-pass-a.md`.** This is an independent
> second seat, run without reading pass A until after my own probes had landed. Where we agree, that
> agreement is *two-seat confirmation from independent instruments* and is recorded as such. Where I
> have new material, it is marked **NEW**. Where I contradicted pass A and was wrong, I say so.

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context seat), declared explicitly at
spawn. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.** Independently confirmed: **4 BLOCKERs** (three of them pass A's C-1/C-2/C-3,
one **NEW**), 4 MAJORs (three NEW), 4 MINORs, 1 INFO.

The headline result stands and is now doubly attested from two independent probe rigs: the Mix
workbench's default mode **cannot accept a single colour**, the convergence animation **lands on a
point it computed from a formula rather than on the destination it documents**, and **one unparseable
colour string anywhere in the user's palette store unmounts the entire application, silently**.

My pass adds a fourth blocker that pass A did not reach: **`MixPane.onSave` mints the exact artifact
that hard-crashes `mixPalettes`** — a closed, self-inflicted poisoning loop entirely inside this
component's own two write paths.

| | |
|---|---|
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u` |
| HEAD **as audited** | `e39da983` (brief said `c654824e`; sibling seats have committed since — `git diff c654824e..HEAD -- demo/workbenches/mix` is empty, so all findings hold at both) |
| glass-ui | `@mkbabb/glass-ui@7.0.0` |
| Probe rig | **isolated** `chromium` via `playwright@1.60.0`, own `BrowserContext` per scenario, `localStorage` seeded via `addInitScript` |
| Why isolated | the shared Chrome-DevTools/Playwright MCP browser was being re-navigated **mid-probe** by concurrent audit seats (I caught a `/#/mix` probe returning `/#/extract` DOM with a foreign `data-v-0ce6f2b0` scope id). **Every number below comes from a context only I drove.** Seats sharing one MCP browser is itself a hazard worth the fleet's attention. |
| Probe scripts | `…/scratchpad/WBMIXC-probe1.mjs` · `probe2.mjs` · `probe3.mjs` · `probe4.mjs` |
| Source edits | **none.** One temp spec (`test/wbmixc-parse.test.ts`) was created, run, and deleted in a single command; `git status` for `test/` is unchanged. |

---

## Reconciliation with pass A — the two distance measurements are both right

Pass A's C-3 reports the pigment landing **251 px** from its target. I measured **143 px**. These are
not in conflict; they measure to two different referents, and together they bound the defect:

| referent | position (canvas CSS px) | distance from the pool centroid |
|---|---|---|
| pool centroid, measured (mine) / brightest pixel (pass A) | **(255, 491)** / (255, 492) | — |
| fallback formula `{clientWidth/2, scrollHeight*0.7}` | **(255, 491)** | **0 px** — exact |
| result **plate centre** (mine) | (255, 634) | **143 px** |
| ghost **well centre** (pass A) | (60, 650) | **251 px** |

The well sits at the plate's left edge, so the miss is 143 px measured to the plate and 251 px
measured to the well the source comments actually name. Pass A's number is the stricter and more
faithful one. The new fact my measurement adds: the centroid is **pixel-identical to the fallback
formula**, which proves the fallback branch is not merely *taken* but is the *sole* determinant of
where the animation goes.

---

## NEW findings (not in pass A)

### N-1 · BLOCKER — `onSave` mints the zero-colour palette that hard-crashes `mixPalettes`; a closed loop

Pass A's C-8 correctly found that an empty mix renders an empty plate with an invalid gradient. It
stopped one step short. The empty palette is not merely inert — **it is a live crash seed, and this
component is what plants it.**

**The crash.** `demo/palettes/mix.ts:88` (`repeat`) computes `index % len` with `len === 0` ⇒ `NaN`
⇒ `palette.colors[NaN]` ⇒ `undefined.css`. `mix.ts:92-99` (`distribute`) computes
`Math.floor((index * (len-1)) / (resultLength-1))` with `len === 0` ⇒ a **negative** index ⇒ the same
dereference. Neither is guarded; `resultLength` is `maxLen` for both strategies, so the loop always
reaches the empty operand.

Temp spec `test/wbmixc-parse.test.ts` (run, then deleted):

```
empty/discard         -> []
repeat with empty     -> THREW TypeError Cannot read properties of undefined (reading 'css')
distribute with empty -> THREW TypeError Cannot read properties of undefined (reading 'css')

 FAIL  demo/palettes/mix.ts:88:62 — getColorAtIndex
     88| return parseColorIn(palette.colors[index % len]!.css, space);
       |                                                  ^
 ❯ mixPalettes demo/palettes/mix.ts:130:33
```

Note the `!` non-null assertion on `palette.colors[index % len]!` — the type system was told this
could not be undefined. It is.

**The loop.** Every step is inside `MixPane`'s own two write paths:

1. Select any palette + a zero-colour palette, default `discard` ⇒ `mixPalettes` returns `[]`
   (`mix.ts:118-120`).
2. `useMixingState.ts:97` stores `{ type: "palette", colors: [] }` — no emptiness check.
3. `MixResultDisplay.vue:91` gates on `result.colors`; `[]` is **truthy** ⇒ the palette branch renders
   with zero swatches and `linear-gradient(to right, )`. Measured (`WBMIXC-probe2.mjs`):
   `{"swatches": 0, "gradientStyle": null, "text": "Result"}` — CSSOM rejected the declaration and
   dropped the whole `style` attribute.
4. **`MixPane.vue:44-46`** — `onSave` sees `mixResult.value.colors` (`[]`, truthy) and calls
   `pm.createPalette("Mixed Palette", [])`, persisting a zero-colour palette to
   `localStorage["color-palettes"]`. **There is no length guard at any layer.**
5. That palette, re-selected with **Repeat to pad** or **Distribute**, throws at `mix.ts:88` — which is
   C-1's detonation path, so the whole application is replaced by the error boundary.

The component manufactures its own grenade and hands it back to the user's library. `mix.ts:88`'s `!`
encodes an invariant (`colors.length > 0`) that the store never enforces and that this pane actively
violates.

**Cure.** `createPalette` must refuse `colors.length === 0` at the store boundary — that is where the
invariant `mix.ts:88` assumes actually lives. `mixPalettes` returning `[]` is a *legitimate* answer
("these palettes share no rows") and belongs in the plate as the `EmptyState` grammar this repo
already owns, not as a hollow specimen plate with live Copy/Save controls.

---

### N-2 · MAJOR — the `<Plus>` glyph is not merely dim; the slot child is **discarded**

Pass A established that `WatercolorDot` drops fall-through attributes. It does more: **it renders no
slot at all.** The full render function from `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```js
return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([c.value, "watercolor-swatch", e.animate && "watercolor-animated"]),
    "data-testid": "watercolor-swatch",
    "data-variant": e.variant,
    style: u([f.value, { backgroundColor: …, borderRadius: m(b), pointerEvents: "none", … }])
}, [(d(), o("svg", w, [ /* the internalised turbulence filter */ ])),
    e.variant === "ghost" ? (d(), o("span", { key: 0, class: "watercolor-ghost-stroke", … })) : a("", !0)
], 14, C));
```

Two children, both internal. **No `renderSlot`. No `$attrs` spread.** So
`MixSourceSelector.vue:175`'s `<Plus class="w-5 h-5 text-primary/60" />` never reaches the DOM.

Measured (`WBMIXC-probe1.mjs`): `"hasPlusGlyph": false`,
`"childTags": ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"]`.

This is why the committed real-Safari capture
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png` shows the "Selected"
well holding a bare dashed blob with **no `+` mark**. Pass A read that as "barely visible"; it is not
low-contrast, it is **absent**. The affordance has no affordance: nothing in the rendered pixels tells
a sighted user that the shape is a button — which it also is not (N-3).

---

### N-3 · MAJOR — blast-radius census: 21 of 23 `WatercolorDot` call sites drop something; **5 are dead controls**

Pass A's repair order item 1 asks for this audit. Here it is, run over `demo/**/*.vue`:

```
21 of the call sites pass at least one DROPPED attr/listener/slot

demo/color-session/ColorSpaceSelector.vue:81            dropped=['tag=']
demo/palettes/browser/card/SwatchHoverMenu.vue:14       dropped=['aria-label', 'tag=']
demo/palettes/browser/card/SwatchHoverMenu.vue:29       dropped=['@click', 'aria-label', 'tag=']
demo/palettes/browser/card/CurrentPaletteEditor.vue:62  dropped=['tag=']
demo/palettes/browser/card/CurrentPaletteEditor.vue:64  dropped=['tag=']
demo/palettes/browser/card/CurrentPaletteEditor.vue:95  dropped=['@click', 'aria-label', 'tag=']  +DEFAULT-SLOT
demo/shared/ui/EmptyState.vue:45,46,47                  dropped=['tag=']
demo/shell/dock/Dock.vue:136,138,271                    dropped=['tag=']
demo/picker/controls/ComponentSliders/ConsoleRail.vue:57 dropped=['tag=']
demo/workbenches/mix/MixSourceSelector.vue:146          dropped=['tag=', 'title=']
demo/workbenches/mix/MixSourceSelector.vue:164          dropped=[':disabled', '@click', 'aria-label', 'tag=']  +DEFAULT-SLOT
demo/workbenches/mix/MixSourceSelector.vue:211          dropped=['@click', 'aria-label', 'tag=', 'title=']
demo/workbenches/mix/MixResultDisplay.vue:64            dropped=['aria-hidden', 'data-', 'tag=']
demo/workbenches/mix/MixResultDisplay.vue:79            dropped=['tag=']
demo/workbenches/mix/MixResultDisplay.vue:97            dropped=['tag=', 'title=']
demo/workbenches/generate/GenerateControls.vue:199      dropped=['@click', 'aria-label', 'tag=']
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:26 dropped=['tag=']
```

**The five sites passing `@click` are five dead controls**, three of them outside this seat's subject:

| dead control | file:line |
|---|---|
| Mix — add current colour | `MixSourceSelector.vue:164` |
| Mix — "From palettes" swatches | `MixSourceSelector.vue:211` |
| palette card swatch hover menu | `palettes/browser/card/SwatchHoverMenu.vue:29` |
| current-palette editor add slot | `palettes/browser/card/CurrentPaletteEditor.vue:95` |
| generate workbench swatch | `workbenches/generate/GenerateControls.vue:199` |

`tag=` appears at **17** sites and has never existed in glass 7's API — every one is a call-site
belief in a prop the producer does not declare. This is a **glass-7 adoption-wide regression**, not a
mix-local bug; the mix pane is simply where it is fatal. It belongs in the standing glass-ui BH relay
(fond) as one item, with the mix pane as its worst instance.

---

### N-4 · MAJOR — measured: the result dots' `:title` is dropped, which is *why* a palette result has no accessible text

Pass A's C-6 correctly concluded that a palette result's accessible text is the single word `RESULT`,
attributing it to the producer-forced `aria-hidden`. The mechanism is worse and now measured:
`MixResultDisplay.vue:103`'s `:title="color.css"` — the one place the CSS strings were meant to
survive into the DOM — is **also** dropped.

`WBMIXC-probe4.mjs`, after a completed 3-colour palette mix:

```json
"afterMix": {
  "plateLive": 0,
  "resultDotTitle": [null, null, null],
  "plateButtons": [ {"name":"Copy color","w":28,"h":28},
                    {"name":"Save to palettes","w":28,"h":28},
                    {"name":"Reset","w":28,"h":28} ]
}
```

So the palette result is unreadable in **both** channels: not in the a11y tree (`aria-hidden`), and not
as a tooltip or hover title either. The same drop kills the selected-chip label at
`MixSourceSelector.vue:150` (`:title="\`${sc.css} (${sc.source})\`"`).

Credit where due: the three action buttons are **clean** — named, 28 × 28 (≥ 24 px). That part of the
plate is sound.

---

### N-5 · MINOR — sharpening C-13: `clearCanvas()` is unreachable on the ordinary path

Pass A's C-13 says the backing store is retained "for the pane's lifetime". The condition is tighter
than that, and worth stating precisely because it changes the cure.

`useMixingAnimation.ts:171-183` calls `clearCanvas()` **only** on the `idle` edge. `idle` is produced
only by `reset()` / `clearSelection()` (`useMixingState.ts:108-117`). A completed mix leaves the phase
at **`done`**, forever. A user who mixes and then moves on never reaches the cleanup at all.

Measured across one session (`WBMIXC-probe4.mjs`):

```json
"beforeMix":     { "canvasStyleH": "",      "cardScrollH": 683, "cardClientH": 683 }
"afterMix":      { "canvasStyleH": "702px", "cardScrollH": 770, "cardClientH": 770 }
"afterDeselect": { "canvasStyleH": "702px", "cardScrollH": 770, "cardClientH": 770, "scrollableBy": 0 }
```

The inline height survives **deselecting every source**. So the retained backing store is not an
opt-out condition — it is the default. The cure is not "also reset `canvas.width`" (pass A's, correct
as far as it goes) but "run the teardown on the epilogue's own completion" —
`useMixingAnimation.ts:108-111` already clears the *pixels* there and is the natural seam; it should
clear the sizing and release the buffer too.

**Honest limit:** I measured `scrollableBy: 0` at 1440 × 1000 — `clientHeight === scrollHeight`, so I
did **not** observe scroll inflation from the stale abspos child at this viewport. The retention is
measured; the overflow consequence is not.

---

### N-6 · MINOR — measured: the result plate outlives its operands

Pass A's C-12 argues this from the absence of a watcher. Measured, same session, after deselecting
**both** source palettes without pressing Reset:

```json
"afterDeselect": { "plateStillThere": true, "sourcesLeft": 0, "mixBtnDisabled": true }
```

A live "Result" plate — with working **Copy** and **Save** — presenting a mix of a selection that is
now empty, beside a `Mix` button that is correctly disabled because nothing is selected. The pane
simultaneously asserts "you have nothing to mix" and "here is your mix".

---

## Independent confirmations of pass A

Same conclusions, different instruments. Recorded because a second seat reproducing a blocker from a
clean rig is evidence, not duplication.

### ✅ C-2 — the add affordance is inert (BLOCKER)

`WBMIXC-probe1.mjs`, `#/mix`, default state, isolated context:

```json
"A_addSlot": [{ "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null, "role": null,
                "tabIndex": -1, "pointerEvents": "none", "rect": {"w":48,"h":48},
                "hasPlusGlyph": false, "ownerText": "Selected" }],
"B_clickAttempt": { "afterForceClick_sources": 0,
                    "normalClick": "BLOCKED: TimeoutError: locator.click: Timeout 2500ms exceeded.",
                    "sourcesAfter": 0, "mixBtnDisabled": true },
"C_keyboard": { "focusedIsSlot": false, "activeTag": "BODY" }
```

`ownerText: "Selected"` pins this to `MixSourceSelector.vue:119`, i.e. the mix pane's own well and not
a neighbouring workbench. `tabIndex: -1` adds a datum pass A did not record: it is unreachable by
**keyboard** as well as by pointer. A forced synthetic click adds zero sources; Playwright's
actionability check refuses the real click outright.

And the gate is still RED at `e39da983`:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      42 |     await expect(addSlot).toBeVisible();
  1 failed
```

`playwright.config.ts:147-153` ignores only `admin/`, `mobile/`, `safari/`, `perf/` and
`reactivity-instant.spec.ts` from the default `smoke` project — so `npm run test:e2e` runs this. The
gate is **not vacuous; it is correct and unenforced.**

### ✅ C-3 — the convergence lands on a formula, not on a destination (BLOCKER)

`WBMIXC-probe3.mjs` reads the canvas back with `getImageData` at t ≈ 820 ms (inside the pool window
between `MIX_ARRIVE_MS` 700 and `MIX_CONVERGE_MS` 900) and computes the centroid of every pixel with
α > 12:

```json
"poolProbe": {
  "canvasStyleH": "702px", "canvasPx": [510, 702],
  "paintedPixels": 1382, "maxAlpha": 242,
  "centroidCssPx":             { "x": 255, "y": 491 },
  "fallbackPredicted":         { "x": 255, "y": 491 },
  "plateCenterInCanvasCoords": { "x": 255, "y": 634 },
  "targetElExists": false, "ghost": true
}
```

Centroid ≡ fallback formula, exactly. `targetElExists: false`. See the reconciliation table above for
the 143 / 251 px framing.

### ✅ C-4 — the re-mix case is independently broken

`"secondMix": { "targetEverSeen": false, "firstGhostAt": 21, "ghostWindowMs": 960 }` — the second mix
re-arms correctly (~960 ms narration, ghost opens at 21 ms) and still never sees an anchor. Pass A's
point stands: restoring the dropped `data-mix-target` alone would fix mix #1 and leave #2..n on the
fallback, because `MixResultDisplay.vue:60`'s `mode="out-in"` defers the `well` branch until the
`content` branch's leave completes — a later task than `arm()`'s `flush:"post"` read.

### ✅ C-5 — the stage is measured mid-transition

Independently measured from the layout side rather than the stage side: `cardScrollH` is **683**
before the mix, **702** at `arm()` (the value the canvas was sized to, `canvasStyleH: "702px"`), and
**770** once the plate finishes its `vj-morph` enter. The canvas is armed **68 px short**, and the
fallback's `0.7 × 702 = 491` inherits the error.

### ✅ C-1 — one bad colour detonates the app, silently (BLOCKER) — with a *second, worse* crash class

Pass A used `"not-a-color"`, which raises the honest `PickerColorError`. I used the repo's own
recorded R1 string, and it raises something else entirely:

```
"oklch()"     -> THREW TypeError Cannot read properties of undefined (reading 'replace')
""            -> THREW PickerColorError Invalid CSS color
"not-a-color" -> THREW PickerColorError Invalid CSS color
```

`parseColorIn("oklch()")` does not fail the parser's typed way — it dereferences `undefined` inside
the parser. Live consequence (`WBMIXC-probe3.mjs`, one saved palette containing `"oklch()"`, palettes
mode, one Mix click):

```json
"malformed": { "after": {
    "boundaryShown": true,
    "boundaryDetail": "Cannot read properties of undefined (reading 'replace')",
    "plate": false, "mixBtnStillThere": false,
    "bodyTextSample": "…This panel hit an unexpected error.Cannot read properties of undefined (reading 'replace') Try again" },
  "errs": [] }
```

So the string the boundary shows the **user** is a raw V8 message about `.replace`. `errs: []` —
nothing reached `console` or `pageerror`, because `ErrorBoundary.vue:59-69` returns `false` and halts
propagation. No telemetry, no log, no crumb. `mixBtnStillThere: false` — the whole workbench is gone.

`useMixingState.ts:79-101` has no `try`/`catch`, and `startMix` is reachable from two places: the
`Mix` button (`MixConfigBar.vue:166` → `MixPane.vue:104`) and the dock
(`usePaneRouter.ts:221 → paneRefs.mix.value?.startMix?.()` via `MixPane.vue:57`'s `defineExpose`).

### ✅ C-6 — no announcement (`plateLive: 0`, measured; see N-4 for the sharpening)

### ✅ C-8, C-10, C-11, C-12 — confirmed as written

On C-11 I owe pass A a correction: my first sweep for a lint config used a shell glob that errored,
and I had drafted "there is no eslint config in the tree." **Pass A is right and I was wrong** —
`eslint.config.js` exists and explicitly disables the rule:

```
$ grep -n "no-unused-vars" eslint.config.js
71:            "@typescript-eslint/no-unused-vars": "off",
81:            "no-unused-vars": "off",
153:            "vue/no-unused-vars": "off",
185:            "@typescript-eslint/no-unused-vars": "off",
```

`tsconfig.base.json:7` sets `"strict": true` but not `noUnusedLocals`. The dead
`computed` import at `MixPane.vue:2` (sole occurrence in the file) survives both gates, exactly as
pass A reported.

### ⚪ C-7 — **not reproduced by me.** I did not probe keyboard operability of the `overflow-y-auto` Card at a scrolling viewport. Pass A's measurement stands unchallenged and un-corroborated; a third seat should settle it.

---

## Test truth

`grep -rln "MixPane\|useMixingState\|mixStage\|useMixingAnimation\|MixResultDisplay\|MixSourceSelector\|MixConfigBar" test e2e demo` returns, outside `demo/` itself, only
`e2e/smoke/oracles/o15-dock-register.spec.ts` and `test/mix-v4.test.ts` — and `mix-v4` imports only
`mixColorSequence` from `demo/palettes/mix`, i.e. library maths. **Unit coverage of the pane, the
state machine, the clock, and the stage: zero.** Pass A's mutation table is correct; I add one more
that is green-safe and would silently break the shipping flow:

| mutation | unit suite still green? |
|---|---|
| delete `@settled="settleMix"` from `MixPane.vue:72` — the phase machine strands in `mixing` forever, the plate never inks in | ✅ green |

The non-vacuous gate pass A proposes — a canvas-pixel landing oracle asserting the brightest/centroid
pixel lies within *r* of the measured well — is the right instrument and is cheap: my
`WBMIXC-probe3.mjs` computes exactly that assertion in ~20 lines of `getImageData`. I second it. I
would add a headless vitest suite over `useMixingState` (a pure composable: refs in, functions out, no
DOM) covering `idle→mixing→done`, the re-entry guard at `:83`, `settleMix`'s idempotence at `:105`,
and — for N-1 — that a zero-length operand never reaches `createPalette`.

---

## Negative proof — what I tried to break and could not

| hazard | verdict | evidence |
|---|---|---|
| ungated rAF (PRM-RAF epidemic) | **CLEAN** | `useMixingAnimation.ts:88-114` rides glass-ui `useRAFLoop` with `pauseWhenHidden: true`, stops at `CONVERGE + EPILOGUE`, stops on a missing canvas/stage, and has `onBeforeUnmount(() => loop.stop())`. `respectReducedMotion: false` is **deliberate and correct**: `arm()` (`:120-125`) owns the PRM path and *completes* (fires `onSettled`) rather than pausing, so PRM can never strand the phase machine. This is not an epidemic site. |
| phase-machine re-entrancy | **guarded** | `useMixingState.ts:83` blocks a second `startMix` while `mixing`; `arm()` calls `loop.stop()` before re-arming. `stuckGhostAtEnd: false` in every successful scenario I ran. |
| `defineModel` stale-read | **absent** | no `defineModel` in `demo/workbenches/mix/`; plain `ref`s + explicit props/emits |
| `ValueUnit` nesting | **absent** | no `ValueUnit` construction on this path |
| oklch→HSV hue drift / `stableHue` | **N/A** | no HSV round-trip; `pigmentRamp` (`mixStage.ts:93-109`) interpolates in the *same* space + hue method as the mix itself — this is correct and deliberate |
| reka slider pointer-capture leak | **N/A** | no sliders in this tree |
| WebGL context loss / eager boot | **N/A** | Canvas2D radial gradients only (`mixStage.ts:199-207`); no `ctx.filter`, no engine branch — the "Safari-true by construction" docstring is accurate |
| `MixPane.vue:85` `@update:mode="(v) => mode = v"` (assigning a destructured composable ref in a template) | **sound** | verified live — driving the "Palettes" tab switched the mode and rendered the cards (`cardCount: 2`) |
| palettes-mode source stamping | **sound** | `MixSourceSelector.vue:246-268` uses a real native `<button type="button" aria-pressed>` with real `data-mix-source`/`data-mix-colors`; measured `sourcesStamped: 2` |
| result-plate action buttons | **sound** | all three named, 28 × 28 ≥ 24 px |
| `MixConfigBar`'s "the sampling costs nothing at rest" claim (`:20-23`) | **holds** | `spaceRamps`/`hueRamps` (`:57-74`) are lazy `computed`s read only inside `SelectContent`, which reka unmounts when closed. (The *prop identity* does churn — `MixPane.vue:103` allocates a fresh array literal per render, re-rendering `MixConfigBar` unnecessarily — but the ramps are not sampled.) |
| happy-path console/page errors | **zero** | `"errs": []` across every successful scenario, excluding the pre-existing shell-level `dev is MISCONFIGURED` warning, which is not this component's |
| edicts 1, 6, 7, 8 | **satisfied** | 124 lines of pure composition, no god module; `vj-morph`/`vj-enter` consumed from `demo/styles/animations.css` with only a scoped `.mix-plate` opacity locally; reactive props destructure + `useTemplateRef` + `toRef(() => prop)` throughout; `import type { PaletteColor }` at `MixPane.vue:13` |

**The architecture is not the defect.** The one-clock law is real and correctly implemented; the phase
machine is small, honest, and guarded; the stage model is cleanly separated from the clock. Every
blocker here is a **seam** failure: a partial function handed to a click handler (C-1, N-1), and a
producer contract silently violated at four attribute/slot seams (C-2, C-3, N-2, N-4).

---

## Ranked repair order (pass B)

1. **C-2 / C-3 / N-2 / N-4 as one item** — they are a single mechanism. Fix the mix pane by wrapping
   `WatercolorDot` in real `<button>`s (the shape `MixSourceSelector.vue:127-159` already uses), put
   `data-mix-target` on an element the producer cannot swallow, and **delete `mixStage.ts:122-124`'s
   fallback** so `collectStage` returns `null` when the destination is absent (`arm()` already handles
   that honestly at `:149-154`). Then relay **N-3's 21-site census** to the glass-ui BH inbox as one
   item — five dead controls repo-wide is a producer-adoption regression, not five demo bugs.
2. **C-1 + N-1** — make `startMix` total (`mixResult` gains an `error` species; retire the `*OrThrow`
   seam on this path), and guard `createPalette` against `colors.length === 0` so the pane cannot
   plant its own crash seed. `parseCssColor("oklch()")`'s raw `TypeError` is R1 and belongs to the
   parser mini-tranche — but the pane must survive it either way.
3. **The landing oracle** — the canvas-pixel gate; it locks C-3/C-4/C-5 permanently. Plus a headless
   `useMixingState` suite. Make the e2e leg a hard CI gate so a red convergence spec cannot ship.
4. **C-4 / C-5** — hoist the anchor out of both `mode="out-in"` transitions; drive `arm()` from the
   destination's own mount/measure rather than from a `watch(phase)` post-flush read.
5. **C-6 / N-4** — `role="status"` on the plate + a real text summary for palette results.
6. **C-7** (pending a third seat's corroboration), then C-8…C-13, N-5, N-6.
