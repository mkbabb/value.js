# JURY-1 — CORRECTNESS AND EVIDENCE — `demo/picker/ColorPicker.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject `demo/picker/ColorPicker.vue` (414 lines). All live probes: Chromium via Playwright
against `http://localhost:9000`, 2026-07-24. No file outside this directory was written.

---

## Verdict

**APOTHEOSIS_REQUIRED.**

Five BLOCKERs survive adjudication, and **I reproduced every one of them myself** rather than
accepting a challenger's transcript. The component cannot be repaired in place because the five
mechanisms live in five different owners: a DOM node doing two incompatible jobs, a debounce over
a multiplexed argument, a lifecycle pair wrong for its host, app-scoped state marooned in a route
leaf, and a library barrel withholding the abstraction its own flagship consumer needs.

I also **dismiss five challenger claims by citing the bytes that refute them** — three of them
because the visual-audit harness was re-run between the challengers reading it and my reading it.
Two challengers built arguments on a superseded `REPORT.json`; a third recorded it as missing
entirely. None of those three states is today's tree.

**Every finding below survived a second, independent measurement pass** (see the re-verification
log). That pass changed three things, and I record them because a juror who only confirms himself
is not measuring: it **refuted one of my own claims** (the "global keyboard sink" framing of J-04 —
unmodified keys are *not* swallowed), it **found J-08 redder than any seat saw** (seven focusables
under the 24 px floor, not four — three rail tabs at 23.6–23.8 px that nobody caught), and it
**caught two of my own gates being flaky** (G-04/G-05 returned a false GREEN twice before I
understood that round 1 of a keyboard probe never latches). Those gates are now specified as
two-round probes and are deterministic across two trials. Gate soundness is this seat's charge, and
a gate that passes against a defective tree is the one failure mode I cannot ship.

---

## Method note — the evidence base moved under the challengers

| seat | what it saw | what is on disk now |
|---|---|---|
| D | `ls docs/…/audit/visual/` → only `capture.mjs` + `shots/`; recorded an "evidence gap" | `REPORT.md` (8 164 B) and `REPORT.json` (92 366 B), mtime 14:21 |
| C, L | a report whose 60 rows all had `allElements: 1744`, `bodyTextLength: 897`, path URLs against a hash router, `consoleErrors — 60` | 60 rows with **distinct** routes and distinct payloads; `consoleErrors — 1` |

This is not a criticism of the seats — it is the reason a juror must re-run rather than tally.
Every REPORT-derived number below is my own read of the current file.

---

## Re-verification log

I re-ran every load-bearing claim in this report against `c654824e` rather than trusting my own
first draft. Probes: `scratchpad/g01.mjs`, `g03.mjs`, `g05.mjs`, `g05b.mjs`, `g0405.mjs`,
`g05c.mjs`, `g05d.mjs` (Chromium/Playwright 1.60.0 against `localhost:9000`), plus direct byte
reads and `node`/`python3` runs.

| claim | drafted | re-measured | status |
|---|---|---|---|
| readout freezes at `45` while 4 witnesses read `43.8`; `cell0.innerHTML === "<b>45</b>"` | ✓ | ✓ identical, incl. control cell 1 intact and no heal across KeepAlive | **CONFIRMED** |
| cross-channel debounce loss | `lab(80% 20 10)`, `l` write destroyed | ✓ identical | **CONFIRMED** |
| KeepAlive listener leak | state mutated on `/browse` | ✓ **and** a live `[role=listbox]` renders on `/browse` and `/gradient` | **CONFIRMED, stronger** |
| chord consumes unrelated keys | `a` prevented | ✓ `a`, `z`, auto-repeat `k` all prevented — but **only in round ≥2**, and **only when Cmd-modified** | **CONFIRMED, narrowed** |
| stuck predicate eats *all* keystrokes | asserted | ✗ `z`/`Escape`/`ArrowLeft`/`a` unmodified all pass, `listbox 0` | **REFUTED — my own overclaim, struck** |
| `contenteditable` / `role=textbox` count | 3 / 3 | ✓ 3 / 3; cards in shell 2 | **CONFIRMED** |
| `h1` 0, first heading `H3[card-title]` numeric | ✓ | ✓ `h1 0`, `main 1` | **CONFIRMED** |
| 12 focusable stops, spectrum absent, `role="img"` | ✓ | ✓ 12 stops, `spectrumInStops false`, `tabindex null` | **CONFIRMED** |
| undersized focusables | 4 thumbs | **7** — 4 thumbs `12×24` + 3 tabs `23.6–23.8 × 24.4` | **CONFIRMED, redder** |
| seam @1440 / @390 | 69.92 / 26.23 px | **70.42 / 25.75 px** | **CONFIRMED** (sub-px run noise; both arms fail the 14.87 px ceiling) |
| readout reserved-minus-painted | +54.90 / −4.59 px | **+55.41 / −5.08 px** | **CONFIRMED** |
| `.title-row` min-height binding | 0 px @1440 | ✓ `73.12px` min vs `84.97px` rendered @1440 (non-binding); @390 `73.12` vs `73.11` (**binding**) | **CONFIRMED** |
| `--instrument-title-gap` | `""` | ✓ `""` at both viewports | **CONFIRMED** |
| P019 ratio | 0.7861 @390 / 0.9750 @1440 | ✓ identical; `fira-code` cells 0 of 3; family Fraunces | **CONFIRMED** |
| pane share / shadow parity | 50.00 % each, shadow alpha `0.5` | ✓ 50.00 %/50.00 %, `512px 512px`; shadow is alpha **`0.8`**, and the two outer plates are character-identical | **CONFIRMED; D's `0.5` corrected to `0.8`** |
| action bar desktop vs mobile | 7 vs 0 | ✓ desktop exposes `Back/Reset/Copy/Random/Palettes/Extract/Open color input`; @390 none, `#action-bar` absent | **CONFIRMED** |
| published `/color` withholds 4 symbols | ✓ | ✓ all four ABSENT from `dist/subpaths/color.js`; `src/color/index.ts` re-exports none (read all 41 lines) | **CONFIRMED** |
| `CSS_PICKER_SPACES` byte-identical to `grammar.ts` | "identical" | members/order/line-breaks identical; **the declaration lines differ** (`export const … : ReadonlySet<SpaceId>` vs `const CSS_COLOR_SPACES`) | **CONFIRMED as duplication; "byte-identical" narrowed to the member block** |
| hex regex admits `#12345`/`#1234567` which the library rejects | ✓ | ✓ pasted run reproduces all six rows | **CONFIRMED** |
| `REPORT.json`: 0 navErrors, 1 consoleError, settle outlier | 18905 vs median 3425 | ✓ 0 navErrors, 0 pageErrors, exactly 1 consoleError (`WebGL: context lost.` on `safari-desktop-light /#/`), settle **18905** vs median **3427**, next-highest 4201 | **CONFIRMED** |
| smallTapTargets vary per route (DIS-1/DIS-4) | ✓ | ✓ 8,8,4,6,8,5,6,7,**39**,4,4,4,4,4,8 | **CONFIRMED** |
| W48 states PR-01 has two causes (DIS-5) | ✓ | ✓ "Removing only Blob height cannot close PR-01" at `W46-W48.md:161-164` | **CONFIRMED** |
| W48 anchor off by one | `:88` is `padding-right`, `:89` is `min-height` | ✓ `seat.css:87-90` read directly | **CONFIRMED** |
| ARCHITECTURE import law + forwarding-dir prohibition + About-not-companion | ✓ | ✓ all three quoted verbatim from the tree | **CONFIRMED** |

Two drafted claims did not survive my own re-run and are struck above: the "all keystrokes"
framing of J-04, and "byte-identical" as a whole-line description of `CSS_PICKER_SPACES`. A juror
who cannot refute himself is not measuring.

---

# UPHELD

Severity is mine, not the challenger's. `UPHELD_REPRODUCED` = I ran it. `UPHELD_BY_BYTES` = I read
the bytes and the mechanism is entailed by them. `HYPOTHESIS` = the mechanism is in the bytes but
the observable fault was not driven.

---

## J-01 · BLOCKER · UPHELD_REPRODUCED — the headline is one DOM node doing two incompatible jobs

**Merges** C-1, D-01, and the editor half of D-07/C-16. Three seats described three symptoms of one
mechanism: `ColorComponentDisplay.vue:21-39` puts `contenteditable="true" role="textbox"` on a span
**whose children Vue owns and patches** (`.fig-int`, `.fig-frac`). The browser's text-entry
mutation and Vue's vnode patching are contending for the same subtree.

### Arm (a) — permanent vdom orphaning. My reproduction, with an in-run control:

```
t0   cells ["45","20.0","30.0"]   cell0.innerHTML "<b>45</b>"
     url  …?space=lab&color=lab(45%25+20+30)     valuetext "Lightness 45.0%"

—— independent path: focus the L slider, 12 × ArrowLeft ——

t2   cells ["45","20.0","30.0"]   cell0.innerHTML "<b>45</b>"          ← FROZEN
     cell1.innerHTML "<span class=fig-int>20</span><span class=fig-frac>.0</span>"  ← CONTROL, intact
     url   …?space=lab&color=lab(43.8%25+20+30)
     title "lab(43.8% 20 30) — Color Picker"
     valuetext ["Lightness 43.8%", …]      channel-meter ["43.8%","20.0","30.0","100.0%"]
```

Four independent witnesses of the model — URL, `<title>`, `aria-valuetext`, channel meter — read
**43.8**. The hero readout, the largest element on the page, reads **45** and never recovers. The
`<b>` wrapper is the proof: the browser destroyed Vue's two child spans, so every subsequent patch
writes into detached nodes. **Cell 1, never edited, tracks the model perfectly in the same frame** —
that is the control that makes this a defect of the edit path and not of the render path.

It also survived a KeepAlive deactivate→activate cycle (`#/` → `#/browse` → `#/`): reactivation does
not heal it.

### Arm (b) — the instrument cannot round-trip its own display, and the share link encodes a value never shown:

```
settled   cell text "20.1"
          title     "lab(50% 20.09999999999 30) — Color Picker"
          url       #/?space=lab&color=lab(50%25+20.09999999999+30)
```

### Arm (c) — the card-lock breaks in the exact moment it exists to protect (390 × 844, `insertText('9999999999')`):

```
before   readout 327.4 × 93.8    card h 592.0    scrollW 327 = clientW 327
during   readout 327.4 × 140.7   card h 638.9    scrollW 367 > clientW 327   (40px inner overflow)
settled  readout 327.4 × 93.8    card h 592.0
```

The card grew **+46.9 px** and the readout overflowed its own box by **40 px**, mid-keystroke.
`readoutReservation.ts:24-30` asserts the reservation is *"TRUE BY CONSTRUCTION … the demo model
clamps every landing color into these same ranges at the pipeline seams."* The clamp is at the
seam; the paint is upstream of the seam. The premise is false for the painted DOM.
(D measured the same mechanism at 1440 as +61.2/+8.4/8 px. Different viewport, same sign, same
cause. Both stand.)

**Mechanism:** editing fused into display. One node is simultaneously the reactive render target,
the user's text-entry surface, and — via `CardTitle` — the document heading.
**Canon:** `VISUAL-CONSTITUTION §7` ("read-only contiguous numeric readout"), `§4` ("editing occurs
only in W21's semantic numeric fields"), `PROPORTION-AUDIT §5.10`.
**Disposition: BUILD.** Delete the writer, do not validate it. There is no patch that makes a
Vue-controlled subtree safely `contenteditable`.

---

## J-02 · BLOCKER · UPHELD_REPRODUCED — one debounce timer multiplexed across five channels silently discards edits

**From C-2.** `demo/shared/utils.ts:22-44` is a single-timer, last-args-win debounce.
`useColorPipeline.ts:209` creates **one** instance, and `ColorPicker.vue:51` and `:233` route every
channel through it. The `component` argument makes each call a *distinct intent*; coalescing
distinct intents is data loss, not throttling.

**Unit reproduction** (`npx tsx` against the real `debounce`; `l` at t=0, `a` at t=100 ms):

```
applied writes: [[80,"a"]]
```

**Live reproduction**, from `lab(80% 20 30)` — type `30` into `l`, then 120 ms later `10` into `b`:

```
t0   cells ["80.0","20.0","30.0"]   valuetext ["Lightness 80.0%", …]
t1   cells ["30","20.0","10"]
     url       …color=lab(80%25+20+10)
     valuetext ["Lightness 80.0%","a axis 20.0","b axis 10.0","Alpha 100.0%"]
```

`b` took the `10`. **`l` is still 80 — the user's `30` was destroyed with no error and no signal**
— and, compounding J-01, the readout *displays* `30`.

**Disposition: BUILD.** Real `<input>` editors committing on `change`/`blur` need no debounce at
all. A per-channel `Map` of debounces would also work and is worse (KISS, edict 3).
**Note for the executor:** W48 §Work-3 makes "W21 numeric fields the sole editors" without noticing
this. Landing those fields on the same shared instance reships the defect in new markup.

---

## J-03 · BLOCKER · UPHELD_REPRODUCED — `onMounted`/`onUnmounted` under `<KeepAlive>`: a global keyboard claim outlives the component

**Merges** C-3, L-5, D-12(ii). `ColorPicker.vue:376-379` registers
`window.addEventListener("keydown", handleKeydown)` in `onMounted`; `:381-385` releases it in
`onUnmounted`. `PaneSlot.vue:120` wraps the pane in `<KeepAlive :max="max">`, so leaving the picker
**deactivates** it — `onUnmounted` never runs.

My reproduction (SPA-internal navigation, chord = Meta↓ k↓ k↑ Meta↑, app-state witness):

```
s0  #/         expanded ["false","false"]   pickerInDom 3 readout cells
s1  chord      expanded ["true","false"]    [role=listbox] × 1        ← opens
s2  chord      expanded ["false","false"]   listbox 0                 ← closes
s3  → #/browse pickerInDom 0   "Select color space" present: 0        ← pane deactivated
s4  chord on #/browse          [role=listbox] × 1                     ← RENDERS ON /browse
s5  → #/       expanded ["true","false"]    [role=listbox] × 1        ← LEAK
```

**Stronger than recorded in any challenge:** at `s4` the popover does not merely mutate state, it
**renders a live `[role=listbox]` on `/browse`**, a route the picker does not own, while the picker
itself has zero nodes in the document. The deterministic synthetic-event arm (J-04) reproduces the
same thing on `/browse` *and* `/gradient` across two trials.

The deactivated picker consumed a shortcut from a route it does not own and mutated
`selectedColorSpaceOpen` (`:243`), so the instrument re-appears with its dropdown spuriously open.
`handleKeydown` also calls `e.preventDefault()` on every route.

The correct idiom is used **in the same directory**: `HeroBlob.vue:246` uses `onActivated()` and
explains why at `:232-245`. The parent did not apply it.

The same hole leaves `parseAndSetColorDebounced` (2000 ms) and `updateColorComponentDebounced`
(500 ms) uncancelled on every view switch — and see J-18 for the inverted cleanup.

**Disposition: BUILD.** The shortcut is app-level: a shell-owned keyboard map registered once at
the composition root. The picker keeps no `window` listener. Any listener that must live in a
KeepAlive'd leaf uses `onActivated`/`onDeactivated`.

---

## J-04 · MAJOR · UPHELD_REPRODUCED — the chord is tested against sampled key *state*, not against the event

**Merges** C-5, D-12(iii). `ColorPicker.vue:263-266`:

```ts
if (keys.cmd?.value && keys.k?.value) { e.preventDefault(); selectedColorSpaceOpen.value = !…; }
```

`useMagicKeys()` reports what is *currently held*, so the predicate is true for the whole duration
the keys are down — not for the one event that is the chord.

**Reproduction — deterministic, two independent trials, fresh page each time** (dispatched
`keydown`s on `window`; no `keyup` is sent, which is what "held" means). Round 1 never latches (the
lazily-created magic-keys refs have not yet been written); **round 2 and every round after it
prevent everything**:

```
round A (picker active, #/)   k:false  a:false  z:false  k-repeat:false   listbox 0
round B (picker active, #/)   k:true   a:true   z:true   k-repeat:true    listbox 1
round C (#/browse, picker NOT in DOM)   k:true a:true z:true k-repeat:true  listbox 1
round D (#/gradient,  picker NOT in DOM) k:true a:true z:true k-repeat:true  listbox 1
```

So while Cmd is held and `k` has been seen without a `keyup`, **every subsequent Cmd-modified
keystroke is `preventDefault`ed and re-toggles the popover** — Cmd+A, Cmd+Z, Cmd+C included. The
`k-repeat:true` column is the missing `e.repeat` guard, measured.

**Correction to the challengers, and to my own first draft.** C-5 (and my earlier transcript)
claimed a stuck predicate consumes *every* keystroke in the application. **It does not, and I
refute that by measurement.** With the predicate primed, unmodified keys pass through untouched:

```
z NO-meta:false   Escape NO-meta:false   ArrowLeft NO-meta:false   plain a NO-meta:false   listbox 0
```

`useMagicKeys` clears `cmd` from the modifier state of each incoming event, so the sink is bounded
to Cmd-modified chords. That is still a global claim over every Cmd chord on every route — serious,
and enough — but the "all keystrokes" framing is overclaimed and must not enter the addenda.

**Disposition: BUILD**, folded into J-03's cure. Test the event
(`e.key === "k" && (e.metaKey || e.ctrlKey) && !e.repeat`); `useMagicKeys` then has no consumer and
is deleted with it (`:123`, `:247`).

---

## J-05 · BLOCKER · UPHELD_REPRODUCED — app-scoped state marooned in a KeepAlive'd route leaf; the picker's entire action bar is absent on mobile

**From L-2.** `ColorPicker.vue:315-328` assembles `actionBarContext`; `:331-344` `defineExpose`s it.
The Dock is a *sibling*, so App reaches back through an instance ref
(`App.vue:38,41-42,342,351`). `colorPickerRef` is populated only by `onDesktopLeftMount`
(`App.vue:323-328`), wired to the **desktop** `PaneSlot`s. The **mobile** `PaneSlot`
(`App.vue:83-91`) passes no `:on-mount`, and `PaneSlot.vue:124` renders
`:ref="onMount ? … : undefined"`. `colorPickerRef` is therefore permanently `null` at mobile widths.

Measured, same page, same route `#/`, only the viewport differs:

| viewport | picker action-bar controls in `<nav>` |
|---|---|
| 1440 × 900 | `Back`, `Reset color`, `Copy color`, `Random color`, `Palettes`, `Extract palette`, `Open color input` |
| 390 × 844 | **none** |

Mobile `<nav>` exposes only `Save edit, Cancel edit, Switch to slug, Generate new slug, Cancel,
Select view, Toggle action bar, Menu`. Corroborated by the shipped captures: the desktop shot shows
the `🖌 Tools →` group in the dock pill; `safari-mobile-dark/picker.png` shows only
`⌂ ⌄ · Picker | About · ⋮`.

**Mechanism:** state whose lifetime must be the application's is assembled inside a component whose
lifetime is a pane-routing accident, and reached imperatively through a ref captured on one of two
mount paths.
**Disposition: BUILD.** `ActionBarContext` and the commit/cancel edit machine move to a
`color-session` composable provided by App beside `COLOR_MODEL_KEY`; the Dock injects it.
`defineExpose` → 0 and `colorPickerRef` disappears.

---

## J-06 · BLOCKER · UPHELD_REPRODUCED — the published `/color` surface withholds the abstraction, so the flagship consumer rebuilds it

**From L-1 (+L-1b).** `src/color/model.ts` exports `SPACE_SCHEMA` (`:56`), `SPACE_IDS` (`:76`),
`isAnyColor` (`:127`), `makeColor` (`:136`). `src/color/index.ts` re-exports **none of them** — I
read all 41 lines. My run against the built package:

```
$ node --input-type=module -e "…await import('./dist/subpaths/color.js')…"
makeColor    ABSENT
SPACE_SCHEMA ABSENT
SPACE_IDS    ABSENT
isAnyColor   ABSENT
```

The demo reconstructs the withheld half, and I verified both duplications by byte comparison:

- `demo/color-session/picker-color.ts:92-95` `CSS_PICKER_SPACES` vs `src/css/grammar.ts:161-164`
  `CSS_COLOR_SPACES` — **identical**: same 13 members, same order, same line breaks.
- `picker-color.ts:123-144` `buildColor()` — a **17-case switch** dispatching to the 17 published
  factories, i.e. `makeColor` with the type safety stripped (`channels[index] ?? "none"`), sitting
  in the slider hot path (`withChannel`/`withAlpha`/`clampPickerColor` all funnel through it).

The library privately depends on exactly what it refuses to publish
(`src/color/operations.ts`, `src/css/grammar.ts:16,290`).

**Disposition: BUILD.** Publish `SPACE_SCHEMA`, `SPACE_IDS`, `makeColor`, `isAnyColor` through
`src/color/index.ts` → `src/subpaths/color.ts`; extend `SPACE_SCHEMA.channels` to
`{key,min,max,unit,hue}` (the library is already the authority for those bounds — it clamps kelvin
at `model.ts:91`); then delete `buildColor`, `CSS_PICKER_SPACES` and the channel-name/hue columns of
`PICKER_CHANNELS`, and promote `withChannel`/`withAlpha`/`channelAt`/`clampToDomain` beside
`mapColorToGamut`. `demo/color-session/valueDomain.ts` (49 lines, 38 of them a docstring wrapping
one call) dies with them.

---

## J-07 · MAJOR · UPHELD_BY_BYTES — masking fallbacks and a give-up poll around the instance ref

**From L-4.** All three arms are literal in `demo/color-picker/composables/usePaletteWiring.ts`:

- `:65-73` `emitApply` — picker present → `onPaletteApply(colors)` (replaces `savedColors` with all
  parsed colours); absent → `applyColorString(colors[0])` (sets the *current colour*, touches no
  palette). **Two different products behind one API, selected by viewport.**
- `:121-127` `emitSetCurrentColor` — `applyExternalColor` vs `applyColorString`; two near-identical
  implementations (`useColorPipeline.ts:182-188` and `:247-257`), one refreshing `stableHue` and
  throwing, the other swallowing.
- `:33-58` `whenColorPickerReady` — 40 × 50 ms poll then
  `console.warn("gave up waiting for the color picker to mount")`. Given J-05's measured permanent
  null, **this loop always exhausts on mobile and `emitStartEdit` is dead there.**

Owner edict 2 (no dual paths, no masking fallbacks) violated three times.
**Disposition: FOLD into J-05's cure.** Delete the picker parameter, the retry loop and both
fallback arms; call the pipeline. Reconcile `applyExternalColor`/`applyColorString` into one named
`color-session` operation.

---

## J-08 · MAJOR · UPHELD_REPRODUCED — 12 px slider thumbs: WCAG 2.2 SC 2.5.8 fails **seven** times

**Merges** C-6, D-10 — and enlarges both. Measured live inside `.pane-shell [data-slot=card]`,
filtering every focusable to `width < 24 || height < 24`:

```
1440 × 900 (fine pointer)   L/A/B/ALPHA channel   12.0 × 24.0    ← 4 slider thumbs
390  × 844 (fine pointer)   L/A/B/ALPHA channel   12.0 × 24.0
1440 × 900 (fine pointer)   l channel  23.8 × 24.4               ← 3 rail TABS, sub-24 inline
                            a channel  23.7 × 24.4                  (no seat caught these)
                            b channel  23.6 × 24.4
```

The fourth tab (`alpha channel`, 24.5 × 25.4) passes, which is why the failure is easy to miss:
the rail's tabs sit fractionally on either side of the floor rather than uniformly under it.

and in today's `REPORT.json` for route `/#/`:

```
desktop  {"w":12,"h":24,"tag":"span","label":"L channel"} ×4  (of 8 smallTapTargets)
mobile   {"w":12,"h":44,"tag":"span","label":"L channel"} ×4
```

The coarse-pointer rung (`ComponentSliders.vue:345-357`, `block-size: max(100%, 2.75rem)`,
`inset-inline: 0`) grows the **SliderRoot's** vertical box — which is why `h` goes 24→44 on a coarse
pointer while `w` stays 12 everywhere. The inline axis is unaddressed at every viewport and every
pointer type.

**Disposition: BUILD, at the producer.** glass-ui 7.0.0 exports `./slider`
(`Object.keys(exports)` → `['./instrument-chassis','./slider']`). The invisible ≥24 px seat belongs
in the producer's Slider thumb, not as a fifth demo override (edicts 4 and 5), with a BH relay per
the standing glass-ui inbox fond. `PROPORTION-AUDIT §5.7` already separates glyph size from target
size; PR-12 already disposes the family as TIGHTEN.

---

## J-09 · MAJOR · UPHELD_REPRODUCED — the primary spatial control is not in the tab order

**From D-03** (C-16 records the same `role="img"`). Enumerated focusables inside the picker card,
1440 × 900, `offsetParent !== null`, in order:

```
combobox "Select color space" 111.5×85
textbox  "l component value"  115.1×61.2     ← J-01's editors
textbox  "a component value"  115.1×61.2
textbox  "b component value"  115.1×61.2
tab      l / a / b / alpha channel   ≈24×24 ×4
slider   L / A / B / ALPHA channel   12×24  ×4
```

Twelve stops. `.spectrum-picker` is absent; `getAttribute('role')` → `"img"`; no `tabindex`, no
`role="slider"`, no named numeric axes. This is **V-A137, still born-RED**.

The interaction with J-01 is the design consequence worth recording: a keyboard user's 2nd, 3rd and
4th stops on the product's front door are three undiscoverable editors with no commit semantics,
and the one control they want is unreachable.
**Disposition: BUILD** — the shared domain-neutral axis composition over BI `Slider`, which W48
§Work-3 already orders.

---

## J-10 · MAJOR · UPHELD_REPRODUCED — zero `<h1>`; the first heading is a number tuple containing three textboxes

**Merges** D-07, C-16. Measured live at 1440:

```
h1count 0
headings[0]  { tag:"H3", data-slot:"card-title", text:"50.0 % , 20.0 , 30.0" }
contenteditable count 3   (all role="textbox", all inside that H3)
main count 1   ✓
```

Corroborated by today's `REPORT.json`: `counts.h1 === 0` on **all 60 captures**; `counts.main === 1`
throughout. `ColorComponentDisplay.vue:13` renders the readout as glass-ui `<CardTitle>`, which
emits `<h3>`.
**Canon:** `VISUAL-CONSTITUTION §4.1`, `§5.1`; `PROPORTION-AUDIT §5.11` ("A display-sized readout is
not therefore a document heading or live status … route H1 owns heading hierarchy").
**Disposition: BUILD**, atomically with J-01 — the heading role and the editor role are the same
fusion. Shell owns one route `<h1>`; the readout becomes a labelled non-live `<output>`.

---

## J-11 · MAJOR · UPHELD_REPRODUCED — the label→headline void, correctly apportioned for the first time

**Merges** D-02, D-09, D-19. Measured, settled `/` route:

| viewport | ink separation `.space-trigger` → `.readout` |
|---|---|
| 1440 × 900 | **70.42 px** |
| 390 × 844 | **25.75 px** |

`VISUAL-CONSTITUTION §3.2` / `PROPORTION-AUDIT §2.2` bind `I_after ≤ min(φG, I_before − G)` with
`G ≈ 9.2 px` → **φG ≈ 14.87 px**. Desktop is **4.73×** the ceiling; phone **1.73×**. Both arms fail.

Apportionment at 1440 — the contribution the register never quantified:

| contributor | measured | binding? |
|---|---|---|
| readout reserved-minus-painted (`--readout-lines: 2` + `align-content: flex-end`) | **+55.41 px** | **yes** |
| `.picker-header` row-gap | 7.168 px | yes |
| label line-box leading below the ink | ≈13.3 px | yes |
| `.title-row` Blob-derived `min-height` (`seat.css:89`) | **0 px** | **no** — computes `73.12px` against a rendered row height of `84.97px` |

`--instrument-title-gap` **computes to the empty string** — the P122 token is neither defined nor
consumed. `readout` box height 122.41 vs painted ink 67.00 → 55.41 px reserved-not-painted, all of
it placed *above* the numbers by `align-content: flex-end`
(`ColorComponentDisplay.vue:151,166`). At 390 the same measurement is **−5.08 px** — the lock is
honest there, because the tuple genuinely wraps, and there the `.title-row` minimum **is** binding
(`73.12px` against a `73.11px` rendered row). **The identical mechanism is correct on the phone and
is a pure blank-line generator on the desktop — and the two contributors swap which one binds.**

That falsifies `readoutReservation.ts:138-147`'s own claim of "a structural guarantee across the
whole band": at 1440 the pane **is** 512 (in band) and lab renders **one** line while the table
derives **two**.

**D-09 folded:** `header.css:18-23` says `--picker-header-rhythm` replaced a "6× divergent gap
(4.0px@1440 vs 24.6px@390)" so both ends "share ONE rhythm SOURCE". Measured after the cure:
70.42 / 25.75 = **2.73×**, with the loose arm now at *desktop*. The token itself is well-behaved
(`row-gap: 7.168px`); it is simply not the governing quantity. A token was minted against a symptom
whose cause is in another file.

**D-19 folded (spec anchor):** W48 §Work-2 says *"Delete the Blob-derived `.title-row` reservation
(`seat.css:88`)"*. At HEAD:

```
seat.css:87  .title-row {
seat.css:88      padding-right: calc(0.76 * var(--blob-fp) + 0.5rem);   ← horizontal clearance
seat.css:89      min-height:    calc(0.76 * var(--blob-fp) - 0.75rem);  ← the vertical reservation PR-01 names
```

Executed literally the wave deletes the **horizontal** bead clearance and leaves the vertical
minimum. The spec self-flags ("Line anchors are today's — re-resolve post-W43/W44"); the
re-resolution has not happened.

**Disposition: BUILD.** Delete `--readout-lines`, `align-content: flex-end` and the static line
table (`readoutReservation.ts:122-208`); one line always, true wrap grows *below* into feature-local
flow, which `§4.2` already sanctions. The card-lock goal is then met by tabular figures + the fixed
per-space least count alone — mechanism (i) that `readoutReservation.ts:14-18` already names.

---

## J-12 · MAJOR · UPHELD_REPRODUCED — the P019 pair is correct at one end of the band and collapses at the other, in the wrong family

**Merges** D-05, D-06.

| viewport | `.space-trigger` | `.readout` | ratio | required `1/√φ` |
|---|---|---|---|---|
| 390 × 844 | 32.928 px | 41.888 px | **0.7861** | 0.78615 ✓ |
| 1440 × 900 | 53.280 px | 54.644 px | **0.9750** | 0.78615 ✗ |

Drift **+24.0 %**. At 1440 the identity label is 97.5 % the size of the numeric specimen — optically
the same size. Two independently clamped sources with different binding arms cannot hold a constant
ratio: label = `--type-display-2` (`ColorSpaceSelector.vue:209`), ceiling-bound at 1440; headline =
`calc(min(var(--type-display-4), max(11.65cqi, 2.618rem)) * var(--readout-fit,1))`
(`ColorComponentDisplay.vue:137-140`), floor-bound at 390 and `11.65cqi`-bound at 1440.
`§3.2` forbids exactly this: *"independently clamped display-2/display-3 tokens **and a local
approximation** are forbidden."* `11.65cqi` is the local approximation.

And the family that would carry the distinction was never applied:

```
getComputedStyle('.readout').fontFamily → 'Fraunces, "Fraunces Fallback", serif'   (1440 and 390)
document.querySelectorAll('.readout-fig.fira-code').length → 0   (of 3 cells)
```

`.fira-code` is applied only when `formatted[component]?.monospace`
(`ColorComponentDisplay.vue:28`), false for every numeric channel. So near-parity reads as a
*collision*, not a contrast. Visible directly in `safari-desktop-light/picker.png`.

**Disposition: BUILD.** One shared P019 paired clamp — both arms from one fluid quantity, Fira Code
on the headline arm unconditionally as `§4`'s sole paired-scale exception specifies. Family and
ratio are one decision, not two.

---

## J-13 · MAJOR · UPHELD_REPRODUCED — `Card` stands in for `InstrumentChassis`, and nests a second `Card`

**From D-08.** Live at 1440:

```
document.querySelectorAll('.pane-shell [data-slot=card]').length → 2
  outer  glass-resting card  512 × 684.8   shadow "color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px"
  inner  glass-quiet   card  469 × 190.4   shadow "none"           ← ComponentSliders.vue:25 <Card surface="veil">
getComputedStyle(:root)['--instrument-title-gap'] → ""
```

The producer ships the real thing:

```
$ node -p "Object.keys(require('@mkbabb/glass-ui/package.json').exports).filter(k=>/chassis|slider/.test(k))"
[ './instrument-chassis', './slider' ]          (glass-ui 7.0.0)
```

`VISUAL-CONSTITUTION §3.1` binds Picker's outer housing to `InstrumentChassis` and states `Card`
"is never the default page primitive"; `§2`: "One surface has one tier."

**This falsifies a register premise.** `PROPORTION-AUDIT §2` ruling 2 opens *"Because Picker no
longer nests a Card, BI P122 exposes `--instrument-title-gap` …"*. Picker nests one at HEAD. A
clause conditioned on a false premise cannot be executed as written; it must be re-premised before
the wave opens.
**Disposition: BUILD.** Transpose to the producer chassis; collapse the inner veil `Card` to a plain
material region. The title-gap (J-11), the proportion (J-14) and the pair (J-12) then close by token
consumption rather than by five local cures.

---

## J-14 · MAJOR · UPHELD_REPRODUCED — no protagonist: 50.00 % of the stage, an identical shadow, and the same control twice

**Merges** D-04, D-11, L-12. Measured at 1440 × 900:

```
.pane-container--dual   display grid   grid-template-columns "512px 512px"   gap 18px
  → leftShare 50.00 %   rightShare 50.00 %
box-shadow, both 512-wide plates:  "color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px"   ← character-identical
.space-trigger × 2      [0] 111.5×85.0 font 53.280px "Lab"   [1] 88.6×48.0 font 41.888px "Lab"
[role=combobox]         ["Select view","Select color space","Select color space"]
```

`VISUAL-CONSTITUTION §3` law 1 binds 61.8033989 % / 38.1966011 % (or preview-dominant); measured
50.00 % is **11.8 points below the floor**. Law 8: "Supporting fixtures do not compete with it
through equal size or equal shadow" — both fail simultaneously.

And the repository's own architecture already ruled on the companion.
`docs/tranches/V/ARCHITECTURE.md`, closed route inventory: *"About is a quiet trailing destination,
**not Picker's permanent right-hand companion**."* `PROPORTION-AUDIT` PR-04 disposes
"Empty/equal companion Cards" as REMOVE.

Two live `ColorSpaceSelector`s (`ColorPicker.vue:39`, `AboutPane.vue:20`) write one piece of state at
two type treatments with no shared mutex — and `selectedColorSpaceOpen` (`:243`) is
component-local, so the chord opens only one of them (confirmed in J-03's trace: `["true","false"]`).

**Disposition: BUILD.** Retire About as Picker's companion per `§3.1`; transpose the picker to the
chassis' stage/inspector ratio. Where an inspector is genuinely absent `§3.1` is explicit that it
"leaves no filler" — the stage takes the width rather than being halved by a peer document. The
duplicate selector dies with it.

---

## J-15 · MAJOR · UPHELD_REPRODUCED — `useHeaderCondense` is structurally unreachable

**From C-7.** The sufficiency gate (`useHeaderCondense.ts:93-99`):

```ts
const savings = expandedH - (condensedH || expandedH * 0.5);   // condensedH === 0 on first pass
if (overflow <= savings + threshold) return;                   // stays expanded
```

My measurements at the audit's own reference matrices:

```
390 × 844   headerH 184.0   scrollH 590  clientH 590   overflow 0    gateRequires > 108   gateOpens false
1440 × 900  headerH 226.5   scrollH 683  clientH 683   overflow 0    overflowY "visible"  gateOpens false
```

C additionally measured 390 × 600 — the tightest band that produces overflow at all — as
`overflow 64` against a required `> 108`, and `scrollTop = 64` leaving `is-condensed` unset. The
predicate is self-defeating: the header is the dominant term in the scroll content, so
`expandedH * 0.5 + 16` outruns the residual overflow at every band where the picker is usable.

Dead surface: 127 lines of composable, six `.is-condensed` blocks in `header.css`
(75/82/100/116/128), the sentinel div (`ColorPicker.vue:12`), the `$el`-unwrapping computed
(`:189-192`), the class binding (`:25`).
**Disposition: BUILD — delete.** Edicts 2 and 3. W48 orders deleting two reservations and leaves
this apparatus standing.

---

## J-16 · MAJOR · UPHELD_REPRODUCED (parser arm) / HYPOTHESIS (end-to-end arm) — a throwing parse boundary honoured by half its call sites

**From C-4, absorbing C-12/L-7.** `ColorPicker.vue:282-289` `onStartEdit` calls the throwing
`parseColor(target.originalCss)` on palette-store CSS with no guard, and the call site
(`usePaletteWiring.ts:113-122`) is inside a bare `setTimeout` — **outside Vue's error propagation**,
so `<ErrorBoundary>` (`App.vue:50`) cannot catch it. On a throw, `preEditModel` is left populated
and `editTarget` stays null: the edit machine wedges and the click is dead.

Measured parser behaviour (`npx tsx` against `src/css/index.ts`):

```
oklch()                          THREW TypeError: Cannot read properties of undefined (reading 'replace')
light-dark(#fff, #000)           REJECT
color-mix(in oklab, red, blue)   REJECT
currentcolor                     REJECT
```

`oklch()` escapes the `Result` contract entirely — this is the **R1 shipping crash** already pinned
by the V·π parser-proof gate. The guarding is inconsistent by construction: `applyExternalColor`
(`useColorPipeline.ts:182-188`) parses unguarded while `onPaletteAddColor`/`onPaletteApply`/
`applyColorString` (`:212-257`) do try/catch.

**J-17 folded (hex regex).** `ColorPicker.vue:227` `/^#[0-9a-fA-F]{3,8}$/` admits the two lengths
CSS does not define. Measured:

```
#abc       regex=true lib=ok        #abcdef    regex=true lib=ok
#abcd      regex=true lib=ok        #1234567   regex=true lib=REJECT
#12345     regex=true lib=REJECT    #abcdef12  regex=true lib=ok
```

A guard that exists to prevent a parse failure is the thing that causes the 2-second
`flashParseError` (`useColorParsing.ts:54-57`). It is also the fifth of **eleven** homes for the
"hex is a display encoding, not a space" special case.

**Disposition: BUILD** the boundary collapse (return the `Result` the library already produces; one
`color-session` `displaySpace` module owning `{resolve, format, parse, channels}`; delete the regex).
**FOLD** the `oklch()` TypeError itself to **V·π** — it is that mini-tranche's R1 and must not be
re-booked here.
The end-to-end arm (a stored palette colour of `color-mix(…)`/`oklch()` wedging the edit machine) is
labelled **HYPOTHESIS**: neither C nor I drove it, because the local API is CORS-blocked in this dev
config.

---

## J-18 · MAJOR · UPHELD_BY_BYTES — cleanup pointed at exactly the wrong resources

**Merges** C-8, C-14, D-17. `ColorPicker.vue:381-385`:

```ts
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
    if (updateColorComponentDebounced.cancel) updateColorComponentDebounced.cancel();
});
```

Both debounces are created by `useColorPipeline` in **App.vue** (`:92`, `:209`) and provided
app-wide via `COLOR_MODEL_KEY`; other consumers are `ComponentSliders.vue:115`,
`ConsoleRail.vue:115`, `HeroBlob.vue:56`, `demo/shell/dock/ColorInput.vue`. A child unilaterally
cancels state it did not create — and the desktop pane `KeepAlive` is `:max="6"` (`App.vue:104`)
over 7 distinct left panes, so the picker **is** LRU-evictable.

Meanwhile the two timers it *does* own escape: `:288` `setTimeout(() => setEditTarget(target), 120)`
and `:378` `window.setTimeout(() => { plateOpening.value = false; }, 850)` — both ids discarded,
neither cleared. On eviction inside the 120 ms window the callback writes a ref on a dead scope and
drives `watch(editTarget, …) → emit("update:editTarget")` from an unmounted instance (`:276`).

**D-17 folded:** both literals are hand-arithmetic over token-owned quantities — the comment at
`:365-371` derives 850 from "440ms plate-land → +220ms stagger → 90ms slack". The same file already
does this correctly at `:97` (`@vue:mounted` / `animationend`).

The observable drop (a user colour change lost to eviction mid-debounce) is **HYPOTHESIS** — I did
not drive an LRU eviction. The ownership inversion itself is direct from the cited lines.
**Disposition: BUILD.** `onScopeDispose` inside `useColorPipeline`; the picker cancels nothing it
did not create and clears the two ids it does own; the two literals become `animationend` or token
reads.

---

## J-19 · MAJOR · UPHELD_BY_BYTES — the only test naming this component makes two regexes over its source text

**From C-9.** `test/picker-blob-config.test.ts:12` `readFileSync`s `ColorPicker.vue`; its only two
assertions about that file are:

```
44:  expect(picker).not.toMatch(/<HeroBlob[^>]*@click=/);
49:  expect(picker.match(/writeClipboard\(/g)).toHaveLength(1);
```

It does not mount the component. Grepping `test/` and `e2e/` for `ColorPicker|readout-fig|
contenteditable` returns four files; the three e2e hits are the dock's propose-mode span
(`color-propose.spec.ts`, its own comments scope it), a mobile walk, and a blob-timing fixture.
`e2e/smoke/oracles/readout-seam.spec.ts` measures box geometry only and would pass unchanged with
J-01 fully present.

**Every BLOCKER above is invisible to this gate.** Deleting `handleKeydown` and both listener lines,
or replacing `parseAndSetColor(newVal)` with a no-op, or inverting `isEditing`, all keep it green.
This is the grep-based `proof:*` idiom the owner deleted as "overfit junk"
(`feedback-proof-idiom-retired.md`) under a different filename.
**Disposition: BUILD** — the wave's gates are the cure; the two regex assertions are deleted.

---

## J-20 · MAJOR · UPHELD_REPRODUCED (vision) — the dark scheme was inherited, not authored

**From D-18.** I read all four committed captures. The atmosphere gradient behind the plates is the
**same bright pink→peach field in both schemes**; only the cards invert, to a desaturated
brown-maroon. Two consequences are visible in the frame:

1. The `8px 8px 0 0` shadow at 50 % alpha of near-black is legible in light and effectively
   invisible in dark — a dark shadow under a dark card on a bright ground has nothing to separate
   against. The plate loses its seat in the scheme that most needs it.
2. In `safari-desktop-dark/picker.png` and `safari-mobile-dark/picker.png` the Blob renders as a
   **near-pure-white blot** — by a wide margin the highest-luminance object on the page, several
   stops brighter than the numeric specimen beside it. `PROPORTION-AUDIT §5.9`: "Picker Blob is
   inert presentation." An inert ornament that out-shouts the protagonist is a hierarchy inversion.

`VISUAL-CONSTITUTION §2`: "Dark chrome uses the restrained neutral pole." The measured dark plate is
a seed-tinted brown.
**Disposition: BUILD.** Author the dark scheme as its own composition: restrained-neutral chrome, an
ambient field that darkens with the scheme, and a Blob luminance ceiling bound to the specimen's.

---

## J-21 · MAJOR · UPHELD_BY_BYTES + REPRODUCED — alpha is structurally absent from the headline while the rail displays it

**From D-20.** `useColorPipeline.ts:117-123` builds `colorComponents` from `PICKER_CHANNELS[space]`
only — alpha is never a headline cell. In `safari-desktop-light/picker.png` the rail reads
**α 82.7 %** while the headline reads **92.0 % 88.8, 20.0**: the flagship readout describes an
opaque colour the instrument is not holding. `VISUAL-CONSTITUTION §4`: "Alpha appears only when
semantically relevant" — 82.7 % is the definition of relevant, and **W48's own completion evidence
expects four cells** (`92.0% | 88.8 | 20.0 | 82.70%`).

The mirror-image dead code, confirmed by bytes: `readoutReservation.ts:94-97` injects an `alpha`
entry into `READOUT_CH` for **every** space, while `readoutLineCount`/`readoutFit` are only ever
called with `colorComponents.map(([c]) => c)` — which excludes alpha. The table reserves for a cell
that cannot render.
**Disposition: BUILD.** One source of truth for the shown-channel set: the headline projects exactly
the channels the rail exposes, alpha present iff ≠ 1. The unreachable `READOUT_CH` alpha entry dies
with the table (J-11).

---

## J-22 · MAJOR · UPHELD_BY_BYTES — four import edges and a whole directory level the repository's own law forbids

**Merges** L-3, L-6. The law is `docs/tranches/V/ARCHITECTURE.md`, read at HEAD:

```text
feature → color-session / own descendants / platform / shared / published packages
```
> "Cross-feature internal imports are forbidden by construction."
> "There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, or one-line
> glass-ui forwarding directory."

Violations, read from `demo/picker/ColorPicker.vue`:

| line | edge | verdict |
|---|---|---|
| `:108` | `../ui/card` | forwarding directory, forbidden by name |
| `:129` | `../color-picker/composables/boot/useOverture` | **feature → app** (composition root) |
| `:130` | `../shell/useViewManager` | **feature → shell**; used only for `paletteActive` (`:313`) |
| `:131` | `../palettes/usePalettePorts` | **feature → another feature's internal**; used only for `paletteManager.commitColorEdit` (`:294`) — a palette-domain write executed from inside the picker |

`:129` also closes a directory-level cycle (`App.vue:164` imports `../picker`;
`usePaletteWiring.ts:21` imports its type).

The forwarding layer, measured:

```
$ ls demo/ui | wc -l                                              → 19
$ wc -l demo/ui/*/index.ts | tail -1                              → 29 total
$ cat demo/ui/card/index.ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
$ grep -rn 'from "[./]*ui/[a-z-]*"' demo --include='*.vue' --include='*.ts' | wc -l   → 90
```

Not one barrel adds a variant, a default or a type; meanwhile composables arrive direct
(`writeClipboard` at `ColorPicker.vue:138`). Same package, two spellings, decided by kind.
**Disposition: BUILD.** Delete the 19 directories, rewrite the 90 sites to `@mkbabb/glass-ui` and
its declared subpaths — mechanical, zero behaviour. The three upward edges disappear when J-05 moves
the state they reach for into `color-session`.

---

## J-23 · MINOR · UPHELD_BY_BYTES — the dead-surface census

Every row measured. One obligation, not eight bookings.

| row | evidence | seats |
|---|---|---|
| `isTransitioning` — declared, exposed, never written, never read | `grep -rn "isTransitioning" demo/ src/ test/ e2e/` → exactly 2 hits, `ColorPicker.vue:330` and `:333` | D-14, C-11, L-8 |
| `@update` — child declares the emit (`ColorComponentDisplay.vue:92-95`), never emits it; parent binds a live handler (`ColorPicker.vue:51`) | `grep -n "emit(" …/ColorComponentDisplay.vue` → one line, `33: emit('input', …)` | C-10 |
| `.pane-shell` transitions `transform`, which nothing sets | `ColorPicker.vue:399`; measured `getComputedStyle('.pane-shell').transform` → `"none"` while `transition` resolves to `transform 0.35s linear(…)` | D-15 |
| `CSS_NATIVE_SPACES` — dead rename export | `grep -rn 'CSS_NATIVE_SPACES'` → the declaration (`color-model.ts:58`) + one 2026 H-tranche doc. Zero live consumers | L-10 |
| `toCSSColorString(color, _digits = 2)` — vestigial second parameter | `color-model.ts:66-71`; spelled at `ColorPicker.vue:293`, `useColorPipeline.ts:214-216` | L-10 |
| dead-API provenance in two derivation docstrings | `ls src/units` → *No such file or directory*; `grep -rn 'COLOR_SPACE_RANGES\|getColorSpaceBound\|COLOR_SPACE_DENORM_UNITS' src/` → nothing. Cited at `valueDomain.ts:7,12,44`, `readoutReservation.ts:21,26`, `demo/DESIGN.md:81`. Same class cured once at `4c1e9270`; these were missed | L-11 |
| `paletteManager` injected without `!` unlike every sibling (`COLOR_MODEL_KEY!` `:172`, `VIEW_MANAGER_KEY!` `:197`), and `commitEdit` early-returns on it **without clearing `editTarget`** (`:292`) — a masking fallback that would wedge the app in edit mode. The port is always provided (`App.vue:351` → `usePaletteWiring.ts:60` → `usePalettePorts.ts:246`), so the guard is dead defensive code | `ColorPicker.vue:198,292` | C-15 |
| `componentFor()` ends `return ColorPicker;` — an unknown left-pane name silently renders the picker | `demo/shell/usePaneRouter.ts:94` | L-13 |
| `(colorSpace: any)` in the template erases the only `DisplayColorSpace` check | `ColorPicker.vue:43` | C-17 |
| 703 lines of pointer-debug statically imported into the eager chunk (`ColorPicker.vue:133,141`, mounted unconditionally `:103`) while the blob is deliberately split eleven lines later (`:157`, with a 9-line rationale); `ComponentSliders.vue:117` and `SpectrumCanvas.vue:52` do `inject(POINTER_DEBUG_KEY)!` unguarded, so the product controls cannot mount outside the picker | measured line counts 281 + 286 + 136 | L-9, C-18 |
| mobile headline breaks 2+1 into a 27.1 %-filled orphan line — measured at 390: last line ink **88.6 px** in a **327.4 px** box | visible in `safari-mobile-dark/picker.png` as `20.0` stranded | D-13 |
| picker parse errors surface on `demo/shell/dock/ColorInput.vue`; no `aria-live`/`role=status` anywhere in `demo/picker/` (the only hit, `ComponentSliders.vue:84`, is deliberately `"off"`) | grep | C-13 |

**Disposition: BUILD** as one excision obligation (edicts 1, 2, 3). The break-policy row folds into
J-11/J-12; the error-surface row folds into J-16.

---

## J-24 · INFO · UPHELD_BY_BYTES (observation) / HYPOTHESIS (cause) — the `/` route is the sole capture in 60 that lost its GL context

**From C-19, re-grounded on today's report.** C's cited bytes are stale (see DISMISSED). What is in
`REPORT.json` now:

```
navErrors across all 60 rows: []
rows with consoleErrors: exactly one — ('safari-desktop-light', '/#/', ['WebGL: context lost.'])
settleMs: /#/ desktop-light 18905 · next highest 4201 · median 3425
```

So the confound C named is gone and the residue is *cleaner*: the picker route is the only capture
in the whole matrix with a console error, and the only one with a settle >2× the median (5.5×).
I add one observation neither seat made: **in `safari-desktop-light/picker.png` the Blob is absent
from the frame entirely**, while it renders (as J-20's white blot) in both dark captures. That is
consistent with the context loss on that specific capture.

`ColorPicker.vue:94-98` is the sole mount site of `HeroBlob` → glass-ui `Blob`. glass-ui 7.0.0 does
ship a `webglcontextlost` handler, so no missing-recovery defect is claimed.
**Disposition: BUILD a probe, not a fix** — G-16 below re-captures `/#/` on a production build ×2
matrices. If GL loss persists it escalates to the producer with the trace; it is not patched in the
demo.

---

# DISMISSED

A challenge is dismissed only by citing the bytes that refute it.

## DIS-1 — L-13's harness artifact: "all 60 captures rendered this component"

**Refuting bytes** — `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `safari-desktop-light`,
route → probe url / allElements / bodyTextLength:

```
/#/               …/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)   1738   859
/#/palettes       http://localhost:9000/#/palettes                     351   237
/#/browse         http://localhost:9000/#/browse                       247   280
/#/extract        …/#/extract                                          293   299
/#/mix            …/#/mix                                              342   186
/#/generate       …/#/generate                                         339   310
/#/gradient       …/#/gradient                                         508   611
/#/atmosphere     …/#/atmosphere                                        243   299
/#/blob           …/#/blob                                             642   713
/#/admin/*        …                                                262–277   244–274
```

Every route is distinct, the harness uses hash URLs, and `allElements` ranges 243→1738. L's
`allElements: 1744` / `bodyTextLength: 897` uniformity and its path-URL diagnosis describe a
superseded run. The dependent claims fall with it:

- **"smallTapTargets — 60 is one component's defects counted 60×"** — refuted: per-route counts are
  4, 5, 6, 7, 8 and **39** (`/#/blob`).
- **"consoleErrors — 60 is the single VITE_API_URL notice"** — refuted: `consoleErrors — 1`, and it
  is `WebGL: context lost.` on `/#/`.

What survives from L-13 and is upheld above: the `componentFor()` silent default (J-23), and the
judgement that W48 contains no structural clause.

## DIS-2 — D's recorded evidence gap: "`REPORT.md` and `REPORT.json` do not exist"

**Refuting bytes:**

```
$ ls -la docs/tranches/V/megatranche/audit/visual/
-rw-r--r--  92366  Jul 24 14:21  REPORT.json
-rw-r--r--   8164  Jul 24 14:21  REPORT.md
-rw-r--r--  11313  Jul 24 14:15  capture.mjs
drwxr-xr-x                       shots
```

Both exist. D's `ls` predates the harness run. **D's own measurements are unaffected** — every one I
re-ran matched — but the gap must not be carried into the addenda as a standing record.

## DIS-3 — C-19's cited capture bytes: `navError TimeoutError 30000ms`, `settleMs 38454`, `[vite] Importing a module script failed`

**Refuting bytes:** across all 60 rows of today's `REPORT.json`, `probe.navError` is present on
**zero**; `/#/` desktop-light `settleMs` is **18905**, not 38454; and its `consoleErrors` array is
exactly `["WebGL: context lost."]` — no `[vite]` entry, no `MISCONFIGURED` entry. The HMR confound C
correctly refused to reason through is not in the current evidence. The underlying outlier survives
and is upheld as J-24.

## DIS-4 — C-6's "8 smallTapTargets on every one of the 60 captures"

**Refuting bytes:** `REPORT.md` §smallTapTargets lists per-route counts of 8, 8, 4, 6, 8, 5, 6, 7,
**39**, 4, 4, 4, 4, 4, 8 for `safari-desktop-light` alone. The picker route's own 8 — of which four
are the channel thumbs — is upheld as J-08; the "×60" amplification is not.

## DIS-5 — D-02's charge that W48 orders the PR-01 cure in the wrong sequence

**Refuting bytes:** `docs/tranches/V/reformation/waves/W46-W48.md` §Current-RED, lines 161-164:

> "PR-01's label→headline void has **two live causes**: `seat.css:88` gives `.title-row` a
> Blob-derived minimum, and `readoutReservation.ts` … always allocates Lab two lines and
> bottom-aligns a one-line value … **Removing only Blob height cannot close PR-01.**"

and §Work-2, which orders both deletions in the *same* step. The register is not ignorant of the
two-cause structure and does not order Blob-first-then-stop. What survives and is upheld as J-11:
the **anchor** is off by one and names `padding-right` (`seat.css:88`) rather than the `min-height`
(`:89`), and no seat before this one **quantified** the split (55.41 px vs **0 px** at 1440).

*Not dismissed, reconciled:* C-6 reports mobile thumbs at 12 × 44 while I measured 12 × 24 at
390 × 844. Both are right — 44 is the coarse-pointer rung (`ComponentSliders.vue:345-357`), which
WebKit mobile emulation triggers and desktop Chromium at 390 does not. **The inline axis is 12 px in
every case**, which is the defect.

---

# THE WAVE

## V.W48′ — Picker Instrument, re-premised · **BORN RED**

**Supersedes** W48 (`docs/tranches/V/reformation/waves/W46-W48.md:145-215`), which is directionally
right on the paint slice, materially incomplete on structure and lifecycle, and rests on one false
premise. W48′ absorbs W48's whole visual mandate — A137, A138, PR-01..03, `hide-indicator`, the
Blob `b₀` proof — and adds the five BLOCKERs no wave in the arc owns.

### Scope

`demo/picker/**` · `demo/color-session/**` · `demo/color-picker/App.vue` (mount + provide wiring) ·
`demo/shell/{PaneSlot.vue,usePaneRouter.ts,dock/**}` · `demo/ui/**` (deletion) ·
`src/color/{index.ts,model.ts}` + `src/subpaths/color.ts` · `test/**` + `e2e/**` ·
one glass-ui producer relay (Slider thumb seat; `InstrumentChassis` consumption).

### Preconditions that must land before any Work step

1. **Re-premise `PROPORTION-AUDIT §2` ruling 2.** Its opening premise *"Because Picker no longer
   nests a Card…"* is false at HEAD (J-13). The clause cannot be executed until it is re-authored
   against a tree where the chassis has landed.
2. **Re-resolve every W48 source anchor against HEAD.** `seat.css:88` is `padding-right`; the
   reservation PR-01 names is `:89` (J-11).
3. **Do not re-mint the Blob `b₀` reconstruction.** W48's phantom-gate HEAL packet and the
   `v-blob-b0-26-ref-w40` pinned tag are IMMUTABLE authorities under the epoch rule; W48′ carries
   them forward unchanged.

### Work (transposition order — each step is a clean break; no alias, shim, dual path or masking fallback)

1. **Split the fused headline into three owners.** Shell owns one route `<h1>`. The readout becomes
   a labelled, non-live `<output>` — no `contenteditable`, no `role="textbox"`, no tab stop, not a
   heading. Editing moves whole into the shared domain-neutral axis composition over BI `Slider`,
   which owns commit / cancel / clamp / error and formats through the same cell the headline
   projects. One writer, one formatter, one truth. (J-01, J-02, J-09, J-10, J-21)
2. **Move the edit session and the action-bar contract to `color-session`,** provided by App beside
   `COLOR_MODEL_KEY`; the Dock injects. `defineExpose` → 0; `colorPickerRef`, `whenColorPickerReady`,
   both `emitApply`/`emitSetCurrentColor` fallback arms and `usePaletteWiring`'s picker parameter are
   deleted. `applyExternalColor` and `applyColorString` reconcile into one named operation.
   (J-05, J-07, J-23)
3. **Kill the global keyboard claim.** A shell-owned keyboard map, registered once at the
   composition root, dispatching to the active instrument, testing the **event**
   (`e.key === "k" && (e.metaKey || e.ctrlKey) && !e.repeat`). `useMagicKeys` and the picker's
   `window` listener are deleted. Any listener that must live in a KeepAlive'd leaf uses
   `onActivated`/`onDeactivated`. (J-03, J-04)
4. **Invert timer ownership.** `onScopeDispose` inside `useColorPipeline` owns the debounces; the
   picker cancels nothing it did not create and clears the two ids it does own; the 120 ms and
   850 ms literals become `animationend` (the idiom this file already uses at `:97`) or token reads.
   (J-18)
5. **Publish the library abstraction and delete its demo reconstruction.** `SPACE_SCHEMA`,
   `SPACE_IDS`, `makeColor`, `isAnyColor` through `src/color/index.ts` → `src/subpaths/color.ts`;
   `SPACE_SCHEMA.channels` extended to `{key,min,max,unit,hue}`;
   `withChannel`/`withAlpha`/`channelAt`/`clampToDomain` promoted beside `mapColorToGamut`. Then
   delete `buildColor`, `CSS_PICKER_SPACES`, the channel-name/hue columns of `PICKER_CHANNELS`, and
   `valueDomain.ts`. (J-06)
6. **Collapse the parse boundary to one place.** `parseColor` returns the `Result` the library
   already produces; call sites branch. The hex regex is deleted; one `color-session` `displaySpace`
   module owns `{resolve, format, parse, channels}`, collapsing 11 `=== "hex"` sites to 1. The parse
   verdict surfaces on the control that produced it, in a picker-local `role="status"`. (J-16, J-23)
7. **Transpose the chassis.** Consume the producer `InstrumentChassis` (glass-ui 7.0.0
   `./instrument-chassis`) with its stage / inspector / action regions, P122 boundary set `[]` and
   reserve `none`; collapse the inner veil `Card` to a plain material region. Retire About as
   Picker's companion per `§3.1` and `ARCHITECTURE.md`'s closed route inventory; the picker header
   owns the sole space selector. (J-13, J-14)
8. **Close the seam and the pair by token consumption.** Delete `--readout-lines`,
   `align-content: flex-end` and the static line table; one line always, true wrap grows below into
   feature-local flow. Consume P122 `--instrument-title-gap` as `G`. One shared P019 paired clamp —
   both arms from one fluid quantity, Fira Code on the headline arm unconditionally. Author the
   tuple's break policy explicitly rather than inheriting greedy `flex-wrap`. (J-11, J-12, J-23)
9. **Producer relay:** the invisible ≥24 × 24 seat on the glass-ui Slider thumb, painted glyph
   unchanged at its 12 px optical rung; relayed to the active glass-ui BH inbox per the standing
   fond. Not a demo override. (J-08)
10. **Author the dark scheme.** Restrained-neutral chrome per `§2`; an ambient field that darkens
    with the scheme; a Blob luminance ceiling bound to the specimen's. (J-20)
11. **Excise the dead surface** (J-23), including `useHeaderCondense` whole — composable, six
    `header.css` blocks, sentinel, computed, class binding (J-15) — and `componentFor()` becomes
    exhaustive over `LeftPane` and throws on an unknown name.
12. **Delete `demo/ui/`** — all 19 directories, all 90 import sites rewritten to `@mkbabb/glass-ui`
    and its declared subpaths. Mechanical, zero behaviour. (J-22)
13. **Replace the vacuous test gate** with the behavioural suite the gates below require; delete the
    two regex assertions in `test/picker-blob-config.test.ts` that concern `ColorPicker.vue`.
    (J-19)

---

## Gates

Every gate is an executable probe. Every gate is **RED against `c654824e` today** — the "input that
turns it RED" column names the exact input, which is the falsifiability test the born-RED law
demands. A gate with no such input would be vacuous and is not in this list.

| # | gate | command / probe | RED today | the exact input that turns it RED |
|---|---|---|---|---|
| **G-01** | **readout ↔ model agreement survives an edit** | e2e oracle: load `#/?space=lab&color=lab(50%25+20+30)`; edit the `l` cell to `45`; then drive the L slider 12 × `ArrowLeft`; assert cell text == the value in `location.hash`, `document.title`, `[role=slider] aria-valuetext` and `.channel-meter` | **YES** | the *second* mutation. Reproduced: cell `45` / model `43.8` on all four witnesses, `cell0.innerHTML === "<b>45</b>"`. A single-frame check (W48's own wording) passes and is therefore forbidden here |
| **G-02** | `contenteditable` and duplicate-editor count = 0 | `document.querySelectorAll('[contenteditable="true"], [role="textbox"]')` inside the picker card | **YES** | 3 today |
| **G-03** | **cross-channel commit independence** | edit `l` := 30, then within 500 ms edit `b` := 10; assert both land | **YES** | the 120 ms gap. Reproduced: URL `lab(80% 20 10)`, the `l` write destroyed. Unit arm: `debounce` applied writes `[[80,"a"]]` |
| **G-04** | **no global listener survives deactivation** | navigate `#/` → `#/browse`; assert the picker has 0 nodes in the document; then dispatch the two-round `window` `keydown` sequence of G-05; assert **every** `defaultPrevented === false` and `[role=listbox]` count 0 on `/browse` **and** on `/gradient` | **YES** | the chord fired *while deactivated*. Reproduced deterministically ×2 trials: rounds C and D return `k/a/z/k-repeat = true,true,true,true` with `listbox 1` **rendered on a route the picker does not own** |
| **G-05** | **the chord is event-tested, not state-sampled** | on `#/`, dispatch on `window`, sending **no `keyup`**: round 1 `{Meta, k, a, z, k(repeat:true)}`, then round 2 of the same. Assert in round 2 that `k` toggles **once**, and that `a`, `z` and the auto-repeat `k` are **not** `defaultPrevented` and do not change the popover | **YES** | **round 2** — round 1 never latches, so a single-round probe is GREEN and is forbidden here. Reproduced ×2 trials: round B = `k:true a:true z:true k-repeat:true`, `listbox 1`. `a`/`z` are the unrelated-keystroke input; `k(repeat:true)` is the missing `e.repeat` guard |
| **G-06** | **action-bar parity: desktop set == mobile set** | at 1440 and at 390 on `#/`, `[...document.querySelectorAll('nav button')].map(b=>b.ariaLabel)`; assert the picker's 6 controls present in both | **YES** | the viewport. Reproduced: 7 desktop / 0 mobile |
| **G-07** | `defineExpose` member count = 0; no `InstanceType<typeof ColorPicker>` in the app | `grep -c` in `ColorPicker.vue`; `grep -rn 'InstanceType<typeof ColorPicker>' demo/` | **YES** | 12 members at `:331-344`; `usePaletteWiring.ts:21` |
| **G-08** | **import-direction law holds** | assert `demo/picker/**` imports only `vue`, `@mkbabb/glass-ui[/*]`, `@mkbabb/value.js/*`, `../color-session/*` and own descendants; assert `ls demo/ui` is empty and `grep -rn 'from "[./]*ui/[a-z-]*"' demo \| wc -l` == 0 | **YES** | `ColorPicker.vue:108,129,130,131`; 19 dirs; 90 sites |
| **G-09** | **published `/color` surface is complete** | `node --input-type=module -e "const m=await import('./dist/subpaths/color.js'); for (const w of ['makeColor','SPACE_SCHEMA','SPACE_IDS','isAnyColor']) if (!(w in m)) process.exit(1)"` | **YES** | all four ABSENT (pasted run) |
| **G-10** | **the demo re-derivation is gone** | `grep -n 'function buildColor' demo/color-session/picker-color.ts` → 0; `grep -n 'CSS_PICKER_SPACES' demo/` → 0; `demo/color-session/valueDomain.ts` absent | **YES** | `picker-color.ts:123-144` (17-case switch), `:92-95` (byte-identical to `src/css/grammar.ts:161-164`), `valueDomain.ts` 49 lines |
| **G-11** | **target size floor** | every focusable in the picker card has `rect.width ≥ 24 && rect.height ≥ 24`, at 1440 and 390, fine **and** coarse pointer | **YES** | the inline axis. Reproduced at 1440: **seven** undersized stops, not four — `L/A/B/ALPHA channel` sliders at `12.0 × 24.0` **and** the `l/a/b channel` tabs at `23.8/23.7/23.6 × 24.4`, which are sub-24 on the inline axis by a hair and which no seat caught. `REPORT.json` `/#/` carries the four thumb rows |
| **G-12** | **spectrum keyboard parity (V-A137)** | the spectrum exposes two named `role="slider"` axes, appears in the picker card's focusable enumeration, and Home/End/arrow reach the same colour as the pointer path | **YES** | tab-order enumeration. Reproduced: 12 stops, spectrum absent, `role="img"` |
| **G-13** | **document outline** | `document.querySelectorAll('h1').length === 1`; the first heading is not the readout; `main` count 1 | **YES** | `h1count 0`; `headings[0] = H3[data-slot=card-title] "50.0 % , 20.0 , 30.0"`; `REPORT.json counts.h1 === 0` on all 60 |
| **G-14** | **the title seam** | Range-rects metrology over `.space-trigger` and `.readout`: `I_after ≤ min(φG, I_before − G)` within ±0.5 CSS px at 1440 / 390 / 320 / actual-400 %-zoom; and `getComputedStyle(:root)['--instrument-title-gap'] !== ""` | **YES** | 70.42 px @1440 (4.73 × the 14.87 px ceiling), 25.75 px @390; token computes to `""` |
| **G-15** | **the P019 pair** | `fontSize('.space-trigger') / fontSize('.readout')` == `1/√φ` ± 0.005 at P019 floor, fluid and ceiling; and `.readout` `fontFamily` matches `/Fira Code/` | **YES** | the ceiling arm. 0.7861 @390 vs **0.9750** @1440; `.readout-fig.fira-code` count 0 of 3 |
| **G-16** | **chassis + proportion** | `.pane-shell [data-slot=card]` count == 1; picker root is the producer `InstrumentChassis`; protagonist share ∈ [61.8 %, 66.7 %]; `[aria-label="Select color space"]` count == 1 | **YES** | 2 cards (`glass-resting` 512×684.8 + `glass-quiet` 469×190.4); `grid-template-columns "512px 512px"` = 50.00 %; 2 selectors |
| **G-17** | **the headline projects the rail's channel set** | headline cell count == rail channel count, alpha present iff ≠ 1; `READOUT_CH` has no unreachable entry | **YES** | `α 82.7 %` on the rail vs 3 headline cells (`useColorPipeline.ts:117-123`); `readoutReservation.ts:94-97` injects alpha for every space |
| **G-18** | **one parse boundary** | no throwing parse wrapper (`grep -n 'valueOrThrow' demo/` scoped to the picker cone → 0); hex regex absent; a rejected value raises a picker-local `role="status"` | **YES** | `picker-color.ts:109-113` throws; `ColorPicker.vue:227` `{3,8}` accepts `#12345`/`#1234567` which the library REJECTs (pasted run); zero `aria-live`/`role=status` in `demo/picker/` |
| **G-19** | **dead surface = 0** | `grep -rn 'isTransitioning\|CSS_NATIVE_SPACES\|COLOR_SPACE_RANGES\|getColorSpaceBound\|COLOR_SPACE_DENORM_UNITS' demo/ src/` → 0; `useHeaderCondense` absent; `.pane-shell` declares no `transform` transition; `componentFor` has no default arm | **YES** | every row of J-23's census, each with a pasted grep |
| **G-20** | **behavioural coverage exists** | the picker suite mounts the component and asserts G-01, G-03, G-04 and a throwing `originalCss` leaving the edit machine consistent; the two `ColorPicker.vue` regex assertions are gone | **YES** | `test/picker-blob-config.test.ts:44,49` are the only assertions; five named mutations (delete the keydown listener; delete the hex branch; no-op the `inputColor` watcher; delete both debounce cancels; invert `isEditing`) all keep it green |
| **G-21** | **dark scheme is authored** | sample the atmosphere layer's computed background in both schemes and assert a nonzero delta; assert peak Blob luminance ≤ the specimen's | **YES** | the scheme toggle. Vision on the 4 committed captures: identical bright pink→peach field; Blob is a near-white blot, the brightest object in both dark frames |
| **G-22** | **`/#/` re-capture is clean** | re-run `capture.mjs` against a **production build** (no HMR), 2 matrices × 2 repeats; assert `consoleErrors == []` and `settleMs ≤ 2 ×` the run median | **YES** | today's `REPORT.json`: `/#/` desktop-light is the only row of 60 with a console error (`WebGL: context lost.`) and the only settle >2× median (18 905 vs 3 425); the Blob is visibly absent from that capture |

### π obligations (pinned witness captures — matrix, route, selector)

- **π-1 · chassis + proportion.** Matrices `safari-{desktop,mobile}-{light,dark}`; route
  `/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` (W48's own baseline); selectors
  `.pane-container`, `.pane-shell [data-slot=card]`, `[data-slot=card]` (all), `.title-row`.
  Records: `gridTemplateColumns`, per-plate rect, per-plate `boxShadow`, card count in the shell.
- **π-2 · seam metrology.** Same matrices; viewports 1440 / 390 / 320 / actual-400 %-zoom; selectors
  `.space-trigger`, `.readout`, `.picker-header`. Records: `Range.getClientRects()` extremes, the
  computed `G`, `I_before`, `I_after`, and the four-row apportionment table of J-11.
- **π-3 · type pair.** Same matrices at P019 floor, fluid and ceiling; selectors `.space-trigger`,
  `.readout`, `.readout-fig`. Records: both `fontSize`s, the ratio, `fontFamily`, `.fira-code` count.
- **π-4 · reach parity.** Selectors: the picker card's focusable enumeration, `.spectrum-picker`,
  `.channel-slider [role=slider]`, `nav button`. Records: ordered stop list with rects and
  accessible names, at 1440 and 390, fine and coarse pointer.
- **π-5 · dark scheme.** Both dark matrices; selectors: the atmosphere layer, `[data-slot=card]`,
  the Blob canvas, `.readout`. Records: computed ambient background, plate surface, peak Blob
  luminance, specimen luminance.
- **π-6 · Blob `b₀`.** Carried forward from W48 §Work-6 **unchanged** — the captured `.26`
  reconstruction against the pinned `v-blob-b0-26-ref-w40` config, both engines × DPR 1/2, sole
  manifest at `audit/pi/w48/picker-painted-component/manifest.json`. Immutable; not re-minted.

### DELTA obligations (before/after pairs proving change)

Each pair is `(HEAD c654824e, post-wave)` at identical matrix / route / selector, with the measured
scalar named:

- **Δ-1** seam: `70.42 px → ≤ 14.87 px` @1440 and `25.75 px → ≤ 14.87 px` @390; the apportionment
  table's readout row `+55.41 px → 0`.
- **Δ-2** type pair: `0.9750 → 0.78615 ± 0.005` @1440, `0.7861` held @390; `.fira-code` cell count
  `0 → 3`.
- **Δ-3** protagonist: `50.00 % → ∈ [61.8 %, 66.7 %]`; card count in the shell `2 → 1`; selector
  count `2 → 1`; shadow parity broken (companion shadow no longer character-identical, or the
  companion is gone).
- **Δ-4** reach: focusable list `12 stops without the spectrum → the spectrum's two named axes
  present`; count of focusables under the 24 × 24 floor `7 → 0` (4 thumbs at `12 × 24` and 3 rail
  tabs at `23.6–23.8 × 24.4`), fine **and** coarse pointer.
- **Δ-5** readout: cell count `3 → 4` at α 82.7 %; `contenteditable` count `3 → 0`; last-line fill at
  390 `27.1 % → authored break policy`.
- **Δ-6** outline: `h1 0 → 1`; first heading `H3 "50.0 % , 20.0 , 30.0" → the route H1`.
- **Δ-7** action bar: mobile picker controls `0 → 6`; `#action-bar` layer present at 390.
- **Δ-8** dark: ambient-field delta `0 → nonzero`; Blob peak luminance `> specimen → ≤ specimen`.
- **Δ-9** surface: `defineExpose` `12 → 0`; `demo/ui/` `19 dirs / 90 sites → 0 / 0`; published
  `/color` `4 ABSENT → 4 PRESENT`; `buildColor` `17 cases → deleted`.
- **Δ-10** capture: `/#/` `consoleErrors ["WebGL: context lost."] → []`; `settleMs 18905 → ≤ 2 ×`
  median.

---

## Dispositions — no re-booking

| id | disposition | note |
|---|---|---|
| J-01, J-02, J-03, J-05, J-06 | **BUILD** | the five BLOCKERs; W48′ Work 1–5 |
| J-04 | **BUILD** | folded into Work 3 |
| J-07 | **FOLD** into J-05 (W48′ Work 2) | the fallbacks die with the instance ref |
| J-08 | **BUILD** at the producer (W48′ Work 9) | glass-ui `./slider`, with a BH relay |
| J-09, J-10, J-11, J-12, J-13, J-14, J-21 | **BUILD** | W48′ Work 1, 7, 8 |
| J-15 | **BUILD — delete** | W48′ Work 11 |
| J-16 | **BUILD** the boundary collapse (Work 6); **FOLD** the `oklch()` TypeError to **V·π** (R1) | the parser crash is π's, already pinned; not re-booked here |
| J-17 (hex regex) | **FOLD** into J-16 | |
| J-18 | **BUILD** | W48′ Work 4 |
| J-19 | **BUILD** | W48′ Work 13; G-20 is the cure |
| J-20 | **BUILD** | W48′ Work 10 |
| J-22 | **BUILD** | W48′ Work 12 |
| J-23 (census) | **BUILD** as one excision obligation | W48′ Work 11 |
| J-24 | **BUILD a probe** (G-22), escalate to the producer if it survives | not patched in the demo |
| W48 as written | **RETIRE** — superseded by W48′ | it would close GREEN with all five BLOCKERs intact: no clause touches `defineExpose`, the `colorPickerRef` service-locator, the import edges, the mobile action-bar loss, the shared debounce, or lifecycle; and its single-frame agreement check cannot see J-01 |
| `PROPORTION-AUDIT §2` ruling 2 | **RETIRE the clause as premised**; re-author post-chassis | its opening premise is false at HEAD (J-13) |
| D's "evidence gap" record | **RETIRE** | refuted, DIS-2 |
| L-13's harness-artifact finding | **RETIRE** | refuted, DIS-1 |

---

## Addendum clause — ready to paste

> **V·addendum — Picker instrument (`demo/picker/ColorPicker.vue`), re-premised.**
>
> W48 as written is **RETIRED** and superseded by **W48′**, which carries W48's entire visual
> mandate forward unchanged — V-A137, V-A138, PR-01..03, `hide-indicator`, and the pinned Blob `b₀`
> reconstruction (`v-blob-b0-26-ref-w40`, IMMUTABLE under the epoch rule) — and adds the five
> BLOCKER mechanisms no wave in the arc owns. W48 could not have closed: no clause of it touches
> `defineExpose`, the `colorPickerRef` service-locator, the picker's four illegal import edges, the
> mobile action-bar loss, the shared debounce instance, or the `onMounted`/`onUnmounted` pair under
> `<KeepAlive>`; and its completion check is single-frame, which cannot see the readout↔model
> divergence at all, because that divergence only appears on the **second** mutation.
>
> Two register premises are corrected as a precondition of execution, not as work inside it.
> **(a)** `PROPORTION-AUDIT §2` ruling 2 opens *"Because Picker no longer nests a Card, BI P122
> exposes `--instrument-title-gap`…"*. That premise is false at `c654824e`: the picker plate is a
> `Card`, it nests a second `Card` (`glass-quiet`, 469.1 × 190.3, from `ComponentSliders.vue:25`),
> and `--instrument-title-gap` computes to the empty string. The clause is RETIRED **as premised**
> and re-authored only against a tree where the producer `InstrumentChassis` has landed.
> **(b)** W48 §Work-2's anchor `seat.css:88` names `padding-right` (the Blob's *horizontal* bead
> clearance); the vertical reservation PR-01 actually names is `seat.css:89` `min-height`. Executed
> literally, the wave deletes the wrong axis. Every W48′ source anchor is re-resolved against HEAD
> before the wave opens.
>
> The label→headline void is apportioned for the first time, and the apportionment reverses the
> cure order. At 1440 the readout's own reservation (`--readout-lines: 2` + `align-content:
> flex-end`) contributes **+55.41 px** of reserved-not-painted air while the Blob-derived
> `.title-row` `min-height` contributes **exactly 0 px** (`73.12px` minimum against an `84.97px`
> rendered row — non-binding); at 390 the same minimum *is* binding (`73.12` vs `73.11`) and the
> readout reservation is honest (**−5.08 px**). The measured seam is **70.42 px @1440** and
> **25.75 px @390** against a `φG ≈ 14.87 px` ceiling — **4.73×** and **1.73×**. Both arms fail;
> the desktop arm is entirely the readout's and none of the Blob's.
>
> `--picker-header-rhythm` is retired rather than retuned: it was minted against a symptom whose
> cause is in another file, and after it the divergence is **2.73×** with the loose arm moved from
> phone to desktop. The seam acquires exactly one owner — P122 `--instrument-title-gap`, consumed
> from the chassis.
>
> W48′ is **BORN RED**: all 22 gates fail against `c654824e` today, each with a named falsifying
> input. Every visual gate carries a π obligation (pinned matrix, route and selector) and a DELTA
> obligation (the before/after scalar pair). No defect in this adjudication is re-booked: each of
> J-01..J-24 carries BUILD, FOLD or RETIRE. The `oklch()` parser `TypeError` is **FOLDED to V·π**
> as its already-pinned R1 and is not re-booked here; the glass-ui Slider thumb seat and the
> `InstrumentChassis` consumption are **producer** obligations relayed to the standing glass-ui BH
> inbox, not demo overrides.

---

## Dissent

Recorded in advance of the other seats' verdicts, on points where I hold a position the bytes
compel and a tally might not reach:

1. **Any juror who carries L-13's harness-artifact finding forward is wrong on today's bytes.** The
   report was re-run; 60 rows carry 15 distinct routes with `allElements` from 243 to 1738 and a
   total of **one** console error. Every conclusion drawn from the superseded uniformity — including
   "the picker contributes half the application's tap-target defects on all 60 captures" — must be
   struck. The picker's four 12 px thumbs remain a real defect on their own row (J-08); they simply
   are not a 60× artifact.
2. **D's evidence gap must not be minuted as a standing record.** `REPORT.md` and `REPORT.json` are
   on disk. Recording a phantom gap in the addenda would send the next seat hunting a file that
   exists.
3. **I do not join D-02's charge that W48 sequences the PR-01 cure wrongly.** The spec says in
   terms that "Removing only Blob height cannot close PR-01" and orders both deletions in one step.
   The real, and sufficient, defects are the off-by-one anchor and the un-quantified apportionment —
   both upheld as J-11. Precision matters here because the register is otherwise being asked to
   absorb a correction it does not need.
4. **On severity I am harder than C on J-18 and softer than D on D-13.** The debounce-cancel
   ownership inversion runs on *every* real unmount against app-shared timers — that is a live
   cross-consumer side effect, not a latent one, even though the specific dropped write is a
   hypothesis. Conversely the 2+1 orphan break is a consequence of the unauthored break policy, not
   an independent defect, and should not carry its own row into the addenda.
5. **I decline to treat J-06 as out of scope because it lives in `src/`.** The library's public
   surface is *defined* by what its flagship consumer could not use. Any verdict that keeps this
   inside "demo cleanup" leaves the 17-case switch in the slider hot path and guarantees the next
   consumer rewrites it.
6. **I dissent from C-5's "global keyboard sink", and from my own first draft of J-04.** I measured
   it and it is false: with the predicate primed, unmodified `z`, `Escape`, `ArrowLeft` and `a` all
   pass through with `defaultPrevented === false`. The defect is real but bounded to **Cmd-modified
   chords on every route** — which is what the gate now asserts. If another juror carries the
   stronger framing, they are carrying an unmeasured claim.
7. **I dissent from any gate written as a single-round keyboard probe.** Round 1 after load never
   latches the magic-keys refs, so a one-round probe of the chord returns GREEN against a tree where
   the defect is fully present — I produced exactly that false-GREEN twice before catching it. G-04
   and G-05 are specified as **two-round, no-`keyup`** probes for this reason. This is the single
   most likely way for W48′ to close green while defective, and it is a gate-soundness matter, not
   a stylistic one.

---

*Written by the JURY-1 (correctness and evidence) seat. No file under `src/`, `demo/`, `api/`,
`test/`, `e2e/`, `docs/tranches/V/vnext/**`, `scripts/dev/dev.sh` or any `INBOX.md` was modified.
Every number above is either a live measurement I took at HEAD `c654824e`, a command I ran with its
output pasted, or a line I read in the tree — except the three rows explicitly labelled HYPOTHESIS
(J-16's end-to-end arm, J-18's observable drop, J-24's cause).*
