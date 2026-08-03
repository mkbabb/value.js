# CHALLENGE-C — MiniColorPicker.vue · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), spawned with an explicit Opus 5
declaration. Seat is declared, not inherited.

## Subject and substrate

- Component: `/Users/mkbabb/Programming/value.js/demo/palettes/browser/search/MiniColorPicker.vue` (164 lines)
- Sole consumer: `/Users/mkbabb/Programming/value.js/demo/palettes/browser/search/SearchFilterBar.vue:66-81` → `/Users/mkbabb/Programming/value.js/demo/palettes/BrowsePane.vue:15` → route `/#/browse`
- Reachability: `⋮ Filters` button → outer Popover → swatch trigger → inner Popover. **Two popovers deep.**
- Branch `tranche-u`. **HEAD is `e39da983`, not `c654824e` as the work-order states** (`git log --oneline -1`). All measurements below are against `e39da983` with the live dev server at `http://localhost:9000`, Vue **3.5.35** (measured), Playwright 1.60 / Chromium.
- Probe scripts (re-runnable): `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/mcp-{math,live,live2,live3,live4,live5}.mjs`
- Screenshots captured by me: `docs/tranches/V/megatranche/audit/components/MiniColorPicker/evidence/mini-picker-edges.png`, `.../mini-picker-stuck-drag.png`

**VERDICT: DEFECTIVE.** Eight defects, one BLOCKER, five MAJOR. The gestalt: this file is a bespoke
re-implementation of a control the repo already ships in hardened form
(`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`), and it omits **every single one** of that
control's cures — pointer-capture recovery, round-trip jitter suppression, touch gating, ARIA,
unmount cleanup, `overflow: visible`. The known-hazard list in the work order is not a checklist this
component partially fails; it is a description of this component.

---

## C-1 · BLOCKER — the picker drags on hover: no `pointercancel` / `lostpointercapture` recovery

**Defect.** `canvasDragging` / `hueDragging` (`MiniColorPicker.vue:79-80`) are plain non-reactive
`let` flags cleared **only** by `pointerup` fired on the element itself
(`:133 onCanvasUp`, `:148 onHueUp`). `setPointerCapture` is taken at `:129` / `:144` and **never
released**; there is no `@pointercancel`, no `@lostpointercapture`, and no `onUnmounted`. When the
`PopoverContent` unmounts mid-press — Escape, outside click, the component's own `search` emit
(`SearchFilterBar.vue:183` sets `miniPickerOpen = false`), a route change, or an iOS scroll takeover
firing `pointercancel` — the capture element is destroyed before `pointerup` arrives. The flag stays
`true` **for the life of the MiniColorPicker instance**, which outlives the popover content because
the instance root is `<Popover>` (`:2`), not `<PopoverContent>`.

Result: on the next open, every bare `pointermove` — **no button pressed at any time** — rewrites the
color, emits `update:hex`, and stamps the parent's filter field.

**Reproduction** (confirmed 3×, independent runs):

```
S2.1 pressed mid-canvas, hex: #406080
S2.2 mini popover unmounted: true          <- Escape pressed while the button was down
S2.3 hover-only sweep: #406080 -> #17181a -> #174fe5  STUCK-DRAG: true
S2.4 buttons pressed during sweep: playwright never issued mousedown after S2.2
```
```
P7 hex before hover: #804080  after hover-only: #1a181a  => STUCK DRAG: YES
T4 hover-only after Escape-mid-press: #993d3d -> #eb0c0c (pointer never pressed)
```

Steps: `/#/browse` → `⋮ Filters` → click the swatch → press-and-hold anywhere on the SV field →
press <kbd>Esc</kbd> → release → reopen the swatch → move the mouse across the field without pressing.
The color follows the cursor. Screenshot: `evidence/mini-picker-stuck-drag.png` (readout `#eb0c0c`,
thumb parked at top-right, produced by hover alone).

**The repo already knows the cure.** `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:18-19`
binds `@pointercancel` and `@lostpointercapture`; `:81-91` is a `releaseCapture()` with a `try/catch`
for the detached-element case; `:168-175` clears drag state on lost capture; `:217-224` cleans up on
unmount. `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:91-92` does the
same for the sliders and its docblock names the hazard verbatim ("leak recovery
(`pointercancel`/`lostpointercapture`)"). MiniColorPicker binds none of them
(`grep -rn "lostpointercapture\|pointercancel" demo/` returns 15 hits across 6 files — zero in this one).

**Cure (gestalt, not patch).** Delete the hand-rolled pointer plumbing and consume the existing
`SpectrumCanvas` + a real hue slider. If a compact variant is genuinely needed, it is a `size` prop
on `SpectrumCanvas`, not a second implementation.

---

## C-2 · MAJOR — the parent hex round-trip destroys hue *and* saturation; the thumb deserts the pointer

**Defect.** `watch(currentHex, hex => emit("update:hex", hex))` (`:107`) plus the parent's
`pickerHex.value = hex` (`SearchFilterBar.vue:176`) plus `watch(() => hex, …)` (`:110-125`) forms a
closed loop: every pointermove round-trips the state through an 8-bit-per-channel hex, which is **not
injective for HSV**. The author saw half the problem — `if (d === 0) return; // keep existing hue`
(`:119`) — but that guard only catches *exact* greys. Near-black quantization garbage passes it and
rewrites hue *and* saturation. `sat.value = max === 0 ? 0 : d / max` (`:118`) has no guard at all.

**Reproduction (live, measured).** Pointer held at **x = 60 %** of the canvas, dragged straight down:

```
P6 after pointerdown at x=60% y=15%: thumbStyle "left: 59.9078%; …"  hex #5798d9  hueVar "--hue: 210;"
P6 after drag to BOTTOM (still x=60%): thumbStyle "left: 50%; …"     hex #010202  hueVar "--hue: 180;"
```

The thumb renders at **50 %** while the pointer is at **60 %**, and `--hue` flips **210 → 180**
though the user never touched the hue rail (`#010202` → r=1,g=2,b=2 → `max===g` → h = 3/6 = 180°).

**Reproduction (algebraic, `mcp-math.mjs`, verbatim transcription of `:85-125`):**

```
=== C-1: v -> 0 destroys saturation on the parent round-trip ===
  updateCanvas(val=0)   : {"hue":210,"sat":0.6,"val":0} -> emit update:hex #000000
  after prop round-trip : {"hue":210,"sat":0,"val":0}
  SATURATION CLOBBERED  : YES (0.6 -> 0)
=== C-7: quantization fight ===
  worst |Δsat| over 4000 random states: 0.7916 = thumb x-jump of 79.16% of canvas width
=== C-8: low-value states ===
  val=0.005  hex=#000101 -> sat becomes 1.0000 (was 0.7500)
```

A single pointermove can teleport the thumb across **79 % of the canvas width**.

**The repo already knows the cure.** `SpectrumCanvas.vue:58-63`:

> `// Raw spectrum coords to avoid HSV roundtrip jitter.`
> `// Persists after mouseup so the dot stays where the user placed it.`

`rawS` / `rawV` are the source of truth for the dot; the model round-trip never moves it. This is the
same family as the `stableHue` cure recorded in project memory for oklch→HSV. MiniColorPicker has no
equivalent: its thumb is rendered directly from the round-tripped `sat`/`val` (`:19`).

**Cure.** Hold pointer-space `rawS`/`rawV` as the render source and only clear them when the color
changes from a non-canvas source — i.e. adopt `SpectrumCanvas`.

---

## C-3 · MAJOR — the picker is 100 % keyboard-inoperable; no name, no role, no live region, no focus restoration

**Defect.** Both interactive surfaces are bare `<div>`s with pointer handlers
(`:8-15`, `:24-31`). Measured attributes on the live component:

```
R2 svAttrs   : {"role":null,"tabindex":null,"aria":null}
R2 stripAttrs: {"role":null,"tabindex":null,"aria":null}
R2 hexReadout: {"tag":"SPAN","ariaLive":null}
P4 focusables inside mini popover: [{"tag":"BUTTON","text":"Search","aria":null}]
P5 tab stop 1: BUTTON|…|Search
P5 tab stop 2: BUTTON|…|Search
P5 hex before arrows: #4488cc  after arrows: #4488cc  => keyboard changes color: NO
```

Tab stop 1 and tab stop 2 are the *same* button — the popover contains exactly one focusable, and it
is not the picker. There is no keyboard path to any color. **WCAG 2.1.1 Keyboard (Level A) failure.**
The hex readout is a plain `<span>` with no `aria-live` (`:44-46`), so a screen-reader user is never
told the value changed even if they could change it.

Focus is also not restored on close:

```
S3.2 focus after the mini's Search closed it: {"tag":"BUTTON","cls":"absolute right-1 top-1/2 -translate-y-1/…"}
S3.3 trigger swatch is: {"aria":"Open color picker, current color #4488cc","focused":false}
```

Focus lands on the parent's *inline* Search button, not on the trigger swatch — because the parent
dismisses by flipping the `open` prop (`SearchFilterBar.vue:183`) rather than through reka's own
dismiss path. **WCAG 2.4.3 Focus Order.**

**The repo already knows the cure.** `SpectrumCanvas.vue:4-9` carries the ruling in a comment —
*"2D saturation×lightness picker — not a linear slider, so `role="img"` with a reactive descriptive
label, not `role="slider"`"* — and implements it. `ComponentSliders.vue:227-228` documents the
`aria-valuenow`/`aria-valuetext` handling for the linear rails.

**Cure.** SV field → `role="img"` + reactive `aria-label` (SpectrumCanvas's exact idiom). Hue rail →
the glass-ui `Slider` primitive (edict 4), which brings `role="slider"`, arrow/Home/End, and a name
for free. Readout → `aria-live="polite"`.

---

## C-4 · MAJOR — 12 px hue rail (half the WCAG 2.2 minimum) and both thumbs clipped at the extremes

**Defect.** `class="relative w-full h-3 …"` (`:26`) — `h-3` = 12 px. Measured on **both** matrices:

```
P10 {"tag":"DIV","cls":"relative w-full h-3 mt-2 rounded-f","w":174,"h":12}
R4 mobile geometry: {"hueStrip":[174,12], "hueThumb":[16,16], "searchBtn":[53,24]}
```

12 px against the **24 px** floor of WCAG 2.2 SC 2.5.8 Target Size (Minimum, AA) — and this rail is
not merely a hit target, it is the *drag* surface.

Both containers carry `overflow-hidden` (`:10`, `:26`) while the thumbs are `-translate-x-1/2` /
`-translate-y-1/2`, so at every domain extreme the thumb is sliced:

```
T1 CLIPPED left px: 7  clipped top px: 7   (thumb is 16px; overflow: hidden)
T2 thumb overhang past right edge: 6 px    => visible half-width: 6 of 12
```

At `sat=0, val=1` only a quarter of the SV thumb survives; at `hue=360` half the hue thumb is gone.
Screenshot: `evidence/mini-picker-edges.png` — the wedge in the top-left corner and the half-moon at
the right end of the rail are the defect, rendered.

`SpectrumCanvas.vue:234` sets `overflow: visible` explicitly, for exactly this reason.

**Audit-coverage note (not a separate defect, but the reason this was never caught).** The visual
matrix has **zero** captures of this component: it is two popovers deep, so
`REPORT.md`'s `/#/browse` row (`| safari-desktop-light | /#/browse | … | 4 |` small tap targets)
counts four *other* targets. I read
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png`: the route renders
"The commons is unreachable." with the `⋮` trigger closed. This component's 12 px rail is not in the
60-capture defect budget at all.

---

## C-5 · MAJOR — the prop contract is a lie, and the divergence is never reported outward

**Defect.** `hex?: string` (`:67`) advertises a CSS color string. The guard at `:111`
(`!incomingHex || !startsWith("#") || length < 7`) silently discards everything except a ≥7-char
`#`-prefixed string, and `parseInt` is lenient, so partial garbage is *accepted and mangled*.
`mcp-math.mjs`, verbatim transcription:

```
=== C-2: malformed hex ===
  in="#12345g"   -> emit #123405            <- parseInt("5g",16) === 5; silent misparse
  in="#zzzzzz"   -> state {hue:null,…}      -> emit #000000  (NaN state; renders as red via hsl(calc(NaN*1deg)))
=== C-3: 8-digit (alpha) hex ===
  in=#3b82f680 (50% alpha) -> emit #3b82f6  (alpha destroyed on the echo)
=== C-4: 3/4-digit CSS hex silently ignored ===
  in=#f00   -> state UNCHANGED -> emit #528fcc   (parent asked for #f00)
=== C-5: named / non-hex CSS colors ===
  in=rebeccapurple -> state UNCHANGED
  in=oklch(0.7 0.15 210) -> state UNCHANGED
```

So the component can display `#528fcc` while the parent believes the color is `#f00` — and it never
says so, because **the mount-time `update:hex` emission does not reach the parent**. Measured:

```
Q1 t=1200ms after outer open: {"colorText":"", "swatchLabel":"Open color picker, current color #4488cc"}
Q2 mini open:                 {"hexLabel":"#4488cc","colorText":""}
S1.2 after flipping Tier=Featured (forced parent re-render), field shows: ""
```

`hexLabel` is `#4488cc`, which is only reachable if `sat` moved `0.6 → 0.6667` (I verified
`currentHex(210, 0.6, 0.8) === "#528fcc"`), so the prop watcher *did* run and `currentHex` *did*
change — yet the parent's `colorText`, which `onPickerHexUpdate` sets unconditionally
(`SearchFilterBar.vue:175-178`), stayed `""` across a forced re-render. The identical two-watcher
logic **does** emit at mount when mounted outside the popover, on the app's own Vue build:

```
R1 vue version: 3.5.35
R1 after MOUNT — emissions: [["emit","#4488cc","#4488cc"]]
```

Same code, two behaviours depending on mount context (reka `Presence`/`Teleport`). That is the
definition of a fragile contract: the outward half of the two-way binding is established only by the
first drag, and correctness at mount is a scheduler coincidence. **This is currently latent** — today
`pickerHex` is only ever fed the component's own 6-digit output (`SearchFilterBar.vue:170,176,181`) —
but the field beside it advertises `placeholder="#hex, hsl(...)"` (`SearchFilterBar.vue:92`), so the
first commit that wires the typed text into the picker detonates it.

**Cure.** Stop hand-rolling both directions. The parent already imports the repo's real parser —
`import { parseColorIn } from "../../../color-session/color-utils"` (`SearchFilterBar.vue:145`) —
which fronts `parsePickerColor`/`convertPickerColor` and accepts any CSS color. Parse with it, hold
the color as a `PickerColor`, and render hex only at the readout. That also deletes the 20-line
inline HSV→hex switch (`:85-105`) and the 15-line inline hex→HSV block (`:110-125`), both of which
duplicate `src/units/color`.

---

## C-6 · MINOR — no `touch-action`, no touch gate: the iOS Safari detonation path for C-1

**Defect.** Measured on the live component:

```
R2 svTouchAction: "auto"   stripTouchAction: "auto"
R4 mobile stripTouchAction: "auto"
```

Neither surface sets `touch-action: none`. A vertical drag inside a scrollable popover is therefore
eligible to be claimed by the scroller, and the claim arrives as `pointercancel` — which this
component does not handle (C-1), so the drag flag sticks. On the emulated mobile matrix the drag does
currently follow (`S4.1 touch drag down the SV canvas: #4488cc -> mid: #185da3 … followed: true`,
`S4.3 page scrollY: 0`), so I label the *scroll-steal* half a **HYPOTHESIS** for real iOS Safari; the
missing `touch-action` and the missing cancel handler are measured facts.

`SpectrumCanvas.vue:11-21` carries `touch-gate-target` + `useTouchGate()` + `@touchmove.passive` +
`@touchend.passive` and a tap-to-activate gate specifically for this. MiniColorPicker has none.

---

## C-7 · MINOR — per-instance inline gradient, contradicting the file's own comment (edict 5)

**Defect.** `:27` — `style="background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"`,
seven raw hex literals in an inline `style` attribute. Eight lines further down the file states the
opposite principle for its sibling surface (`:158`):

> `/* Static black-to-transparent overlay lives in CSS; only the dynamic hue layer stays in :style */`

The static hue rail is exactly the case the comment says belongs in CSS. It is also the only raw-hex
color in a repo that routes color through tokens (`efc7d253 fix(tranche-a/w1)`, `6b3b64ea
refactor(tranche-a/w2): route ad-hoc colors, shadows, widths through tokens`).

**Cure.** Move to the scoped block as a class beside `.sv-canvas`, or — better — delete it with the
rail when the glass-ui `Slider` lands (C-3).

---

## C-8 · MAJOR — vacuous gate: the component has no tests of any kind

**Defect.** Zero coverage, measured:

```
$ grep -rn "sv-canvas\|MiniColorPicker\|Open color picker" test/ demo/test/ e2e/
(no output)
```

`vitest.config.ts:21` → `include: ["test/**/*.ts", "demo/test/**/*.ts"]`; nothing there mounts a demo
SFC from `demo/palettes/`. `e2e/smoke/a11y-slider-operation.spec.ts:21` visits `/` only. The one e2e
that touches the route (`e2e/smoke/oracles/o9-shadow-palette.spec.ts:226-228`) asserts the pane is
visible and never opens `⋮ Filters`. The visual matrix cannot see it (C-4).

**Exact mutation that keeps every gate green:** delete `MiniColorPicker.vue` and its import at
`SearchFilterBar.vue:132`, replacing the `<MiniColorPicker>` block with its `#trigger` slot content.
Full suite stays green. Weaker mutations that also stay green: swap `sat.value` and `val.value` in
`updateCanvas` (`:138-139`); make `currentHex` return `"#000000"` unconditionally; delete the
`@pointerup` bindings entirely.

**Cure.** A component test that (a) presses, unmounts mid-press, remounts, and asserts a subsequent
move does *not* change the value (C-1); (b) asserts `hsv → hex → hsv` is a fixed point for the thumb
position (C-2); (c) asserts arrow keys move the value (C-3). Any one of these fails today.

---

## Edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | PASS — 164 lines, focused |
| 2 | No legacy code | PASS — no shims |
| 3 | KISS, no contrivance | **FAIL** — a second SV-canvas implementation that duplicates `SpectrumCanvas` (C-1..C-4, C-6) |
| 4 | Glass-ui is the design system | **FAIL** — hue rail is a hand-rolled `<div>`, not the glass-ui `Slider`; every a11y/pointer affordance is re-invented and lost (C-3, C-7) |
| 5 | Root-level styling | **FAIL** — inline per-instance gradient, `:27` (C-7) |
| 6 | Animations never deleted | PASS (none present; `SpectrumCanvas`'s PRM-gated `field-paint-in` was never here to delete) |
| 7 | Idiomatic Vue 3.5 | PARTIAL — `useTemplateRef` ✓, reactive props destructure ✓; but `defineModel` is not used for either two-way binding, and the manual `emit`+`watch` loop is the C-2/C-5 mechanism |
| 8 | `verbatimModuleSyntax` | PASS — `:61-63` are all runtime imports; no type-only import present |

## Hazard checklist from the work order

| Hazard | Present? |
|---|---|
| `defineModel` stale read | N/A — `defineModel` not used; the hand-rolled substitute is worse (C-2/C-5) |
| oklch→HSV hue loss / `stableHue` | **PRESENT in kind** — hex→HSV loses hue *and* sat; the `d === 0` guard is the half-cure (C-2) |
| `ValueUnit` nesting accumulation | Absent — no `ValueUnit` use |
| reka-ui pointer-capture leak | **PRESENT — BLOCKER** (C-1) |
| ungated rAF loop | Absent — no rAF at all (and no throttling either; `SpectrumCanvas:97-108` rAF-throttles, this does not) |
| WebGL context loss / eager boot | Absent |
| `parseCssColor` crash class | **PRESENT in kind** — hand-rolled `parseInt` parser, silent misparse + silent no-op (C-5) |

## Strongest defect

**C-1.** Press, get interrupted, and from then on the picker follows your cursor without you touching
it — silently rewriting the color and the parent's filter field. Reproduced three times in
independent runs, screenshotted, and cured one directory away in `SpectrumCanvas.vue:18-19`.
