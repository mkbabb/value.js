# CHALLENGE-D r2 — `PointerDebugOverlay.vue` · design (hostile, live-browser)

**Seat** `demo/picker/visual/PointerDebugOverlay.vue` · **Axis** D (visual truth · state coverage · motion · design-system boundary · proportion)
**Method** LIVE. Dev stack `http://localhost:9000` (API `:3000`) + the deployed product `https://color.babb.dev`. Every claim below carries a computed-style / geometry / hit-test / AX-tree measurement taken in Chromium, plus a screenshot.
**Re-runnable probe** `evidence-r2/probe.mjs` (`node docs/tranches/V/megatranche/audit/components/picker-pointerdebugoverlay/evidence-r2/probe.mjs`) — 11 sections, D-1…D-11, executed green three times while writing this.

## Receipt

`demo/picker/visual/PointerDebugOverlay.vue`, 286 lines, SHA-256 `5529d0384c46234b0e1c09cb1f81a99f12deb6f6d3ee9ba08ae4d6cfa9c56a27` — **byte-identical to the hash in the prior Codex file**, so the re-adjudication below is against the same source. Last touched `a61094e3` (2026-07-17). Composed with `demo/picker/visual/DebugEventLog.vue` (child), `demo/picker/composables/usePointerDebug.ts` (provider), mounted at `demo/picker/ColorPicker.vue:103`, provider wired at `ColorPicker.vue:175-176`.

## Verdict

**LIVE-RED · BLOCKER ×2.** The prior file called this SOURCE-RED for the wrong reasons and missed the two defects that actually break the instrument. Measured, in the default state, on the app's primary route:

- at **1440×900** the `FROZEN?` alarm, the `copied!` confirmation, the collapse affordance and every gauge **value** are **100 % occluded** by the picker card;
- at **390×844** — the phone, i.e. the *only* platform this instrument exists for — the header is **97.5 % occluded and not hit-testable**, so once expanded **it can never be collapsed again**;
- **91 % of the event log is unreachable by wheel, drag, and keyboard**;
- the surface is **reachable in production** (`https://color.babb.dev/?nodebug=1` renders it) through a **substring** gate.

The root cause of the first two is one dead token, and it is a **regression against the shipped build**: production resolves `--z-debug: 99999`; the working tree resolves nothing.

---

## Part 1 — Re-adjudication of the prior Codex file, claim by claim

The prior file is `challenge-D-design.md` (report-authored, zero probes). Rulings are against live bytes.

| # | Codex claim (abbreviated) | Ruling | Bytes |
|---|---|---|---|
| **D#1** | `aria-controls="debug-body"` points at no element | **CONFIRMED** | `document.getElementById("debug-body")` → `null` in collapsed *and* expanded state (probe D-5 `ariaControlsTarget: "MISSING"`). Source `PointerDebugOverlay.vue:13`. |
| **D#2** | 280 px overlay "can cover essential phone UI"; ignores safe-area, keyboard, RTL, drag-reposition | **UNPROVEN** (headline **REFUTED**, two riders confirmed — split below) | See D#2a/b/c. |
| **D#2a** | ignores safe-area insets | **CONFIRMED** | Computed `bottom: 8px`; zero `env(safe-area-inset-*)` anywhere in the file (`:134`). At 390×844 the collapsed pill occupies y 803.8–836.0 of an 844 px viewport — inside the iPhone home-indicator band. |
| **D#2b** | ignores RTL | **CONFIRMED** | Under `document.documentElement.dir = "rtl"` the panel stays pinned left (`left: 8px`, physical inset wins; `inset-inline-start` computes 1152 px) while `.debug-gauge` inherits `direction: rtl` and flips the key/value pair — LTR technical identifiers rendered RTL. |
| **D#2c** | the overlay covers essential phone UI | **REFUTED** | Measured the opposite polarity. At 390×844 the *product* covers the *overlay*: `.debug-header` 97.5 % occluded by `.pane-wrapper--left`, `elementsFromPoint` at the header centre returns `DIV.channel-rows.flex-1`. The overlay never occludes product UI because it computes `z-index: auto` (§D-N1). Codex asserted a hazard whose sign is inverted in the live bytes. |
| **D#3** | 10 px type and 6 px padding "too small for … touch operation" | **UNPROVEN** | Measured targets: header **278 × 30.2**, each action button **83.3 × 27** CSS px. Both clear **WCAG 2.2 AA 2.5.8 (24 × 24)**. They miss Apple HIG 44 pt, but the claim names no standard and the one binding standard it implies passes. The type-size half is a defensible opinion, not a measured defect — the *real* type defect is contrast, booked separately at D-N8. |
| **D#4** | `FROZEN?` blinks forever; **"there is no reduced-motion rule"** | **REFUTED** | Live, both media states, with the frozen state genuinely induced (trusted `mouse.down()` held past `FREEZE_THRESHOLD_MS = 2500`): `no-preference` → `animation: blink-6d4a6a5e 0.5s infinite`, sampled `opacity 0.737` mid-blink. `reduce` → `animation-duration: 1e-05s`, `animation-iteration-count: 1`, `opacity: 1` — **fully neutralised** by the global guard at `demo/styles/animations.css:184-193`, which the prior challenger never read. The blink is governed. |
| **D#5** | copy success is transient text without status semantics; failure never shown | **CONFIRMED** — and understated | `liveRegions: 0` inside the overlay (no `aria-live` / `role=status` / `alert` / `log`); `.debug-copied` `inLiveRegion: false`. Fault-injected both transports (`navigator.clipboard.writeText` → `NotAllowedError`, `document.execCommand("copy")` → `false`): the UI still rendered **"copied!"**, `anyErrorSurface: false`. Source `:109-128`, unconditional `copied.value = true` at `:125`. Understated because the success chip is *also* 100 % occluded (§D-N1) — copy has **zero perceivable outcome** for sighted *and* SR users in the default desktop state. |
| **D#6** | Reset / Copy / Clear share geometry though Reset is destructive | **CONFIRMED** | All three measure **83.3 × 27** (`.debug-btn { flex: 1 }`, `:250`). Under `forced-colors: active` the danger and copy backgrounds become byte-identical `rgba(255, 255, 255, 0.25)`. The destructive rider is real: `forceReleaseAllPointers()` (`usePointerDebug.ts:112-145`) walks `.spectrum-picker`, `.slider-track`, `.slider-thumb`, `[data-reka-*]` and calls `releasePointerCapture()` for every recent pointer id **plus 0…10**, mutating the exact fault under inspection, with no confirmation step. |
| **D#7** | hard-coded styling is a separate visual system with no forced-colors contract | **CONFIRMED** | **31 raw colour literals vs 5 `var()` refs** across the composed surface (probe D-11) — and one of the five is the dead `--z-debug`. Zero `.debug-*` selector appears in any of the app's **8** `@media (forced-colors: active)` blocks, while `.glass-*`, `.focus-ring`, `.skeleton`, `.feedback-mark`, `.spectrum-picker` all have one. Font `"SF Mono", "Fira Code", monospace` (`:143`) diverges from the resolved `--font-mono` = `"Fira Code", "Fira Code Fallback", "Fira Mono", monospace`. Overlay class list is `debug-overlay` — no glass surface rung, unlike every other floating surface in the app. |

**Score: 4 CONFIRMED (D#1, D#5, D#6, D#7) + 2 CONFIRMED riders (D#2a, D#2b) · 2 REFUTED (D#4, D#2c) · 2 UNPROVEN (D#2 composite, D#3).** The confirmed set is real but is entirely the *cosmetic* layer; the prior file did not find a single one of the four defects that stop the instrument working, because it never opened the page.

---

## Part 2 — New defects

### D-N1 · BLOCKER — `--z-debug` is orphaned; the picker card eats the entire status column. **Regression vs. the shipped build.**

`PointerDebugOverlay.vue:136` — `z-index: var(--z-debug);`

Live, on the working tree, the whole z-ladder resolves **except this one rung**:

```
--z-behind -10 · --z-background 0 · --z-content 10 · --z-controls 20 · --z-ornament 20
--z-bar 30 · --z-header 35 · --z-dock 40 · --z-overlay 50 · --z-popover 130 · --z-modal 140
--z-debug  (UNDEFINED)            →  .debug-overlay computed z-index: "auto"
```

`var(--z-debug)` with no fallback is invalid-at-computed-value-time, so `z-index` falls to `auto` — paint rung 0. `.app-layout` sets no stacking context (`position: relative`, `z-index: auto`, no transform/filter/contain/isolation — all verified), so every positive `z-index` in the tree competes with the overlay in the **root** stacking context and wins. `.pane-wrapper--left` carries `z-index: 1`. That is enough.

Measured at 1440×900, frozen state induced:

| element | occluded by `.pane-wrapper--left` |
|---|---|
| `.debug-frozen` — the `FROZEN?` alarm | **100 %** |
| `.debug-toggle` — the collapse affordance | **100 %** |
| `.debug-copied` — the copy confirmation | **100 %** |
| first `.debug-gauge .debug-val` (`"YES"`) | **100 %** |
| whole `.debug-overlay` | 30.1 % |

The occluded 30 % is precisely the right-hand column, and `.debug-gauge { justify-content: space-between }` (`:209-213`) puts every **value** there. The panel renders its keys and hides its answers. `evidence-r2/02-desktop-occlusion-zoom.png` and `04-log-full-91pct-unreachable.png` show `global.activePointer`, `global.activePointers`, `global.silenceMs`, `spec.isDragging`, `spec.capturedPid`, `global.lastDown.pid`, `global.lastDown.hasCap` — seven live gauges, seven blank values.

**This is a regression, not an original sin.** The deployed product is correct: `https://color.babb.dev` resolves `--z-debug: 99999` from `:root` in `assets/index-DJ8Ije_5.css`, the overlay computes `z-index: 99999`, and every value renders (`evidence-r2/03-PROD-color.babb.dev-expanded.png` — `0.7`, `no`, `0.0`, `5001.0`). The token was deleted from the demo's `:root` by `c84504d3` ("refactor(demo): migrate dock, styles, and composables to glass-ui", 2026-03-25) along with the rest of the `--z-*` block, on the premise recorded at `demo/styles/foundation.css:110` that "Glass-ui already bridges `--z-index-*` …". Glass-ui bridges the rest; it does **not** define `--z-debug` (`grep -o -- "--z-[a-z-]*:" node_modules/@mkbabb/glass-ui/dist/*.css` → zero hits). `PointerDebugOverlay.vue:136` is the sole surviving consumer and has been dark ever since.

**Reproduce** `probe.mjs` D-1 + D-2 / D-9.

### D-N2 · BLOCKER — on phone the disclosure is a one-way trap

Same root cause, worse consequence. At **390×844**, `?debug=1`, one tap to expand:

- `.debug-header` rect `(9, 676.4, 278, 30.2)`; `.pane-wrapper--left` covers **97.5 %** of it.
- `document.elementsFromPoint(148, 691.5)` → `["DIV.channel-rows.flex-1", "DIV.flex.gap-x-2.5", "DIV.glass-quiet.card"]`. **The header is not in the hit-test stack at all.**
- A real trusted `page.mouse.click(148, 691.5)` at the header centre changes nothing: `aria-expanded` stays `"true"`, the class stays `debug-overlay` (not `debug-collapsed`).
- Playwright's actionability check on `.debug-header` **times out** — the element is not clickable.

`evidence-r2/08b-mobile-390-expanded.png` is the whole story: the header, the `State` block and the log are gone behind the card; a single stray `g` glyph peeks at the left edge; only the button row survives because it sits below the card's lower boundary.

Per project memory this instrument exists for one job — diagnosing iOS Safari pointer-capture freezes on a phone. On the phone it shows nothing and cannot be closed. **The tool is unusable for its sole purpose on its sole target platform.**

**Reproduce** `probe.mjs` D-7 → `evidence-r2/09-mobile-collapse-trap.png`.

### D-N3 · MAJOR — 91 % of the event log is unreachable by every input modality

`:24` renders `<div class="debug-scroll">`; `:232-237` gives it `flex: 1; min-height: 0; overflow-y: auto; pointer-events: none`.

With the ring buffer full (`MAX_EVENTS = 80`):

```
scrollHeight 2829 · clientHeight 243 · hiddenPx 2586  (91.4 %)
pointerEvents "none" · tabIndex -1
trusted wheel  (mouse.wheel 0,800 over the log) → scrollTop 0
trusted drag   (down → move 180px → up)         → scrollTop 0
keyboard       (header focused, PageDown, End)  → scrollTop 0
elementsFromPoint at the log centre → MAIN.pane-main
```

Only **2 of 80** rows are fully visible. The container advertises scrollability, Chromium paints a scrollbar for it, and no user can move it: `pointer-events: none` removes it from hit-testing so the wheel falls through to the page beneath, and `tabIndex: -1` with no `tabindex` attribute means it can never take focus for keyboard scrolling. The 78 invisible rows are the flight-recorder's entire payload.

The *instinct* is right (§S-3) — the blast radius is wrong. `pointer-events: none` belongs on the rows, not on the scrollport.

**Reproduce** `probe.mjs` D-4.

### D-N4 · MAJOR — the activation gate is a substring match, and it ships to production

`usePointerDebug.ts:34-39`:

```ts
return window.location.hash.includes("debug=1") ||
    window.location.search.includes("debug=1");
```

No parse, no `URLSearchParams`, no `import.meta.env.DEV`. Measured on the live dev stack:

| URL | overlay rendered |
|---|---|
| `/?debug=1` | ✅ (intended) |
| **`/?nodebug=1`** | **✅** |
| `/?xdebug=1` | ✅ |
| `/?q=notdebug=1x` | ✅ |
| `/#/palettes?ref=mydebug=1` | ✅ |
| `/?debug=0` | ❌ (control) |
| `/` | ❌ (control) |

`?nodebug=1` — the parameter whose plain reading is *turn debug off* — turns it **on**. And there is no build gate, so it is live on the public product: **`https://color.babb.dev/?nodebug=1` renders the overlay** (probe D-9; `overlayRendered: true`, `--z-debug: 99999`). Any shared or hand-edited link whose query happens to contain the four-token substring hands a stranger an engineering console that installs six document-level capture listeners and a 500 ms `setInterval` (`usePointerDebug.ts:227-254`), streams their pointer stream into a visible log, and offers a one-tap **Reset** that force-releases pointer capture across the picker DOM.

This is the answer to the seat's framing question — *should product-shipped pointer-debug UI exist at all?* As currently gated, **no**: it is production-reachable by accident, and (per D-N1/D-N2) it does not work when reached.

**Reproduce** `probe.mjs` D-8, D-9.

### D-N5 · MAJOR — no state has accessible structure; the payload is one undifferentiated text run

Live AX tree of the whole overlay, expanded, 80 events:

```
- button "Debug −" [expanded]
- text: State global.activePointer no global.activePointers 0.0 global.silenceMs 543.0 …
        Events (80) 8.98 doc:cancel p7000094 div.spectrum-picker.flex 8.98 spec:cancel … (×80)
- button "Reset"
- button "Copy JSON"
- button "Clear"
```

- `role: null`, `aria-label: null` on `.debug-overlay` — an anonymous generic; a screen-reader user cannot find or name the panel.
- Zero `aria-live` / `role="status"` / `role="alert"` / `role="log"` regions (`liveRegions: 0`). Both state transitions the panel exists to announce — `FROZEN?` and `copied!` — are silent.
- No headings, list or table semantics: "State" and "Events (80)" are plain text, and every key/value pair collapses to `global.activePointer no` with no programmatic association. ~240 tokens arrive as one string.
- `aria-controls="debug-body"` dangles (D#1). `aria-expanded` is correctly wired and flips `false`→`true` (§S-5) — half a disclosure contract.
- The disclosure's accessible **name mutates with state**: `"Debug −"` → `"Debug FROZEN? −"` → `"Debug copied! −"`. Status text and a glyph live inside the control's name instead of a labelled region.
- `.debug-btn` action buttons carry no `type` attribute (`type: null` on all three) — `type="button"` was applied only to the header (`:10`).

### D-N6 · MINOR — one measured contrast failure inside the seat's own bytes

Composited against the real backdrop (`rgba(0,0,0,0.92)` over the live page → `rgb(16, 5.6, 17.2)`), WCAG 2.x AA 1.4.3 (4.5:1 at 10 px):

| rule | colour | px | ratio | AA |
|---|---|---|---|---|
| `.debug-val-false` (`:229`) | `#666` | 10 | **3.47** | ❌ |
| `.debug-ts` (DebugEventLog `:81`) | `#666` | 10 | **3.47** | ❌ |
| `.debug-tgt` (DebugEventLog `:102`) | `#777` | 10 | **4.45** | ❌ |
| `.debug-section-title` | `#888` | 9 | 5.62 | ✅ |
| everything else (9 rules) | — | — | 6.45 – 19.91 | ✅ |

Seat-owned failure is `.debug-val-false` — the **false** state of every boolean gauge, i.e. exactly the reading you scan for. The other two rows belong to the `DebugEventLog` seat; numbers relayed there.

### D-N7 · MINOR — the disclosure has no authored focus treatment

CSSOM shows `.debug-btn:focus-visible` exists (`:270-273`) but there is no `.debug-header:focus-visible`. Focused, the header computes `outline: auto 1px rgb(0, 95, 204)` — the Chrome UA default, a 1 px browser-blue hairline on a near-black panel — while the action buttons below it get the authored 2 px white ring. The app ships a `.focus-ring` utility with its own forced-colors contract; the overlay uses neither. And in the expanded desktop state the header's ring is drawn at `z-index: auto`, so the right half of it is occluded too.

### D-N8 · INFO — the export payload embeds environment fingerprint, on a production-reachable surface

`buildExportJSON` (`:82-107`) writes `navigator.userAgent` verbatim plus `screen.width/height/devicePixelRatio` into the clipboard (measured: 398 bytes on an empty log). Correct for an internal bug report; combined with D-N4 it is a public surface that puts a UA fingerprint on a stranger's clipboard on one tap, with the only confirmation being an occluded chip.

### D-N9 · INFO — the debug controls are tab stops 26–29 of 30

Teleported to the end of `<body>`, the four controls land dead last in the tab order; a keyboard operator traverses the entire application to reach the instrument, and expanding it moves focus nowhere.

### D-N10 · INFO (epistemic record, NOT a finding) — one unattended flag-drop

Once, ~16.5 s after an idle load, the page performed a full-frame navigation `…/?debug=1#/` → `…/#/browse`, dropping the query and unmounting the overlay (`framenavigated` trace captured). It did **not** reproduce: a clean 25 s idle poll held `?debug=1#/` stable, and deliberate in-app navigation Picker → Palettes → Home preserved both the flag and the overlay. Recorded because a debug flag that cannot survive the app's own routing has no durable state and no in-product re-entry, but the trigger is unidentified and may have been dev-server interference. Not scored.

---

## Part 3 — Superlatives (proved to the same standard)

- **S-1 · the default is right, and it holds.** `const collapsed = ref(true)` (`:73`, comment "start collapsed so it doesn't interfere"). Measured collapsed pill **67.6 × 32.2** at both 1440×900 and 390×844, clear of every product control at both — the only geometry in this component that behaves correctly at both viewports. The author's stated intent and the live bytes agree.
- **S-2 · booleans are words, not colours.** `formatGauge` (`:76-80`) renders `true`/`false` as `"YES"`/`"no"`. Under `forced-colors: active` the `#4caf50`/`#666` encoding collapses entirely — and the reading survives intact, because the semantics were never in the colour. This is the one place the component is *ahead* of the rest of its own styling (compare the event-row severity backgrounds, which are colour-only and do collapse).
- **S-3 · the instrument does not perturb what it measures.** `.debug-overlay { pointer-events: none }` (`:151`) with `auto` opted in only on the header (`:167`) and the action bar (`:244`), reinforced by `isDebugOverlay()` early-returns on all six global listeners (`usePointerDebug.ts:149-152, 160, 181, 195, 205, 214, 218`). Verified: `elementsFromPoint` over the panel body returns `MAIN.pane-main`. For a *pointer* diagnostic, refusing to consume pointer events is the correct and non-obvious instinct. D-N3 is that instinct over-applied, not absent.
- **S-4 · motion is governed centrally, not duplicated.** The frozen blink defers to the global `prefers-reduced-motion` guard (`animations.css:184-193`) rather than shipping a local copy — measured neutral under `reduce` (`1e-05s` / `1` iteration / `opacity: 1`). Correct architecture, and precisely the thing the prior challenger asserted was missing without checking.
- **S-5 · `aria-expanded` is real.** Measured `false` → `true` across the toggle. Amid a dangling `aria-controls`, a null role and zero live regions, the one ARIA attribute present is wired correctly and updates.

---

## Part 4 — Wave shape

Ordered by measured blast radius, not by authoring cost.

1. **Restore the rung.** Re-declare `--z-debug` in `demo/styles/foundation.css` beside `--z-ornament` (`:393`) at the top of the ladder above `--z-modal: 140`, or inline a fallback `z-index: var(--z-debug, 99999)`. One line closes **D-N1 and D-N2** — both blockers, both viewports. Ship this first and independently; it restores parity with the build already in production. Then sweep for other `var(--…)` reaches with no fallback and no definition — this one hid for four months behind a token-bridge assumption recorded in a comment.
2. **Un-trap the scrollport.** Move `pointer-events: none` off `.debug-scroll` (`:236`) onto the rows inside `DebugEventLog`, and give the scrollport `tabindex="0"` + an accessible name. Closes **D-N3**.
3. **Gate the surface.** Parse the flag (`new URLSearchParams(location.search).get("debug") === "1"`) and put the whole thing behind a build condition so it cannot reach the public product at all. Closes **D-N4** and defuses **D-N8**.
4. **Give the states somewhere to live.** A `role="status"` region for `copied!` / `copy failed`, a `role="alert"` for `FROZEN`, an honest failure branch in `copyJSON` (`:115-127` currently reports success when both transports fail), `id="debug-body"` on the disclosure target, a `role="region"` + `aria-label` on the panel, `type="button"` on the three actions. Closes **D#1, D#5, D-N5**.
5. **Cosmetics last.** Route the palette through tokens (31 raw literals → the ladder), adopt a `.glass-*` surface rung and `.focus-ring`, add a `@media (forced-colors: active)` block that keeps Reset distinguishable from Copy, lift `.debug-val-false` off `#666`, and re-form the panel as a bottom sheet with `env(safe-area-inset-bottom)` on phone. Closes **D#2a, D#6, D#7, D-N6, D-N7**.

If the tranche's answer to *should this ship at all* is **no**, steps 1–3 collapse into a deletion of `ColorPicker.vue:103` + `:175-176` and the `visual/` pair — but note that the composable is still consumed by `ComponentSliders.vue:117` and `SpectrumCanvas.vue:52`, so the provider survives any UI removal.

---

## Evidence index — `evidence-r2/`

| file | shows |
|---|---|
| `probe.mjs` | the whole re-runnable measurement suite, D-1…D-11 |
| `01-desktop-1440x900-expanded-empty.png` | full desktop viewport, overlay expanded on the primary route |
| `02-desktop-occlusion-zoom.png` | **D-N1** — gauge keys rendered, every value eaten by the card |
| `03-PROD-color.babb.dev-expanded.png` | **D-N1 A/B** — production (`--z-debug: 99999`), all values legible |
| `04-log-full-91pct-unreachable.png` | **D-N3** — `EVENTS (80)`, 2 rows visible, values occluded |
| `05-frozen-motion-on.png` | **D#4** — real induced `FROZEN?`, blinking at `no-preference` |
| `06-copied-indicator-occluded.png` | **D#5** — `copied!` fires and is invisible |
| `07a-forcedcolors-off.png` / `07b-forcedcolors-active.png` | **D#7** — Reset / Copy / Clear collapse to one appearance |
| `08a-mobile-390-collapsed.png` | **S-1** — the collapsed pill, correctly clear at 390 px |
| `08b-mobile-390-expanded.png` | **D-N2** — header, gauges and log all behind the card |
| `09-mobile-collapse-trap.png` | **D-N2** — state after a trusted tap on the header: still expanded |
| `10-rtl.png` | **D#2b** — `dir="rtl"`, panel pinned left, gauge rows flipped |
