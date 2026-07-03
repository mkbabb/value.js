# R.W3 — THE INSTRUMENT (the picker design keystone · the amended treatment IS the spec · the gamut-truth overlay consumes the 2.0.0 boundary API · Fable + frontend-design)

**Name**: W3 — The Instrument (the picker design keystone)
**Spec of record**: `docs/frontend-design/color-picker.md` **as amended at R.W0 item W0-1** (the overlay-amendment packet P1–P10 merged, incl. the pass-3 P8 `:140` clause). The treatment carries the design mass — aesthetic direction, audit, refinements, the one unforgettable moment, verdict reconciliation, implementation plan. **This wave doc ORCHESTRATES: sequencing, gates, consume anchors. It does not re-author design prose**; where an item below names a design beat, the treatment's section is the binding text.
**Opens after**: R.W1 (the overlay consumes the *published* `sampleGamutBoundary` from the 2.0.0 cut, atop the settled Q7 α policy — goldens are post-α) **and** R.W2 (design lands on a working substrate: cold-cache boot green, Tabs→SegmentedTabs migrated, e2e green). Runs parallel to nothing; R.W4 and R.W5 open after it (`SYNTHESIS-v2.md §3.2`).
**Discipline**: Fable design lane under the frontend-design skill; the editorial-instrument register (`SYNTHESIS-v2.md §2`) is settled — execute it, don't re-litigate it.
**Status**: SPECED (tranche development). Dispatches after the owner ratifies the Q-table (`PASS3-VERDICT.md §3`) — this wave's own ratification row is **Q11** (below).

---

## §Charter

One wave turns the flagship picker into the instrument the treatment specifies: the keystone hierarchy (font/accent/layout) that every later beat plays on, then the gamut-truth overlay — the demo's signature and the library's identity made visible — then controls that consume glass-ui 4.2.0 instead of forking it, then the readout rhythm, then the motion three-beat. The keystone ORDER is load-bearing: audacious type is invisible in Times; chroma is impossible while `--primary` is ink; the overlay is unreadable on a broken stage.

## §Goal criterion

R.W3 succeeds when the picker page reads as the treatment's editorial instrument — a color-science atlas plate with the wide-gamut truth line breathing on the kept HSL square — and every control on it is a glass-ui consume, not a demo fork. The one unforgettable thing (the amended P7: red/magenta flood, blue clears the plate, the `p3 ⊣` detent you *feel*) renders at first paint under the speced default lens. Completion is the §Hard gate below; a wave whose gates pass but whose plate still reads as generic furniture closes `complete_with_misses` with the taste deficit recorded for the user-review packet.

---

## §Sequencing (the keystone order — load-bearing, `SYNTHESIS-v2.md §3 R.W3`)

```
A font/accent/layout keystone  →  B gamut-truth overlay  →  C controls consume + design
                                                          →  D readout rhythm
                                                          →  E motion three-beat
```

A precedes everything (the N.W12 lesson: type/chroma work is invisible until the font root + accent axis land). B precedes C/D/E only in the sense that the plate is the stage; C/D/E are file-separable and may run parallel after A+B.

---

## §Items

### Lane A — the keystone (N.W12 folded; `docs/tranches/N/waves/N.W12.md` demotes to the residual checklist — its §Scope lanes A–E and §Hard gate clauses (a)–(h) are the anchor + oracle bank; anchors are N-era-verified (2026-06-15), re-verify at dispatch)

| # | Item | Anchors | Why |
|---|---|---|---|
| A1 | **Font root**: cure the `@theme inline` split-brain at the SOURCE (`--font-stack-display`, never the dead `--font-display` runtime var); import the glass-ui fonts corpus; three-voice law (Fraunces=display, Jakarta=body, Fira=annotation) | `demo/@/styles/style.css:52-53,64-66`; N.W12.md Lane A + its §No-workaround prohibitions (no `!important` family overrides, no serif-fallback rung) | U1-fonts — no display rung paints a real Fraunces face today |
| A2 | **Accent axis**: mint `--accent-live` via the shipped library `safeAccentColor` (ONE color-resolution path — no bespoke resolver); re-point `--primary`; `--glass-tint-source` at low strength | `src/units/color/contrast.ts:185` (`safeAccentColor`); the dock already consumes it (`Dock.vue:33`, the `SAFE_ACCENT_KEY` inject) | U1-gray — `--primary` ≡ `--foreground` in light mode; the interactive layer is ink |
| A3 | **Dark ladder + de-navy**: stepped warm dark ladder; `--border`/`--input` hue-217 → warm | `style.css:222-223` | U1-gray, U26's border-token root |
| A4 | **Container-query clamp**: `--pane-min`/`--pane-max` + container `min()` formula; delete the 10 self-clamps; aspect law for portrait; `cqi` in-card sizing | `style.css:132-133,189-209`; the 10 `lg:max-w-desktop-pane` shells | U32 — the layout froze at 2014-laptop size |
| A5 | **Depth laws + `--card-edge` mint**, applied on the picker-bearing surfaces (rounding, one shadow voice, glassy hairlines) | `demo/DESIGN.md` §Depth (new); N.W12.md Lane D | U17 (rounding/shadow-fighting) · U19 (rounding per language) · U24 (extreme shadow; PaletteCard) · U26 (hairline). The fleet-wide card *application* is R.W4's — the mint + laws are owned HERE, once |
| A6 | **Card-lock law codified** (tabular-nums + `ch` reservation, normative) | `demo/DESIGN.md` §Type | U31's hard constraint — Lane D applies it |

### Lane B — the gamut-truth overlay (the signature; spec = the merged P1–P10; evidence: `docs/tranches/R/audit/pass2/overlay-amendment.md` + `boundary-api.md`)

| # | Item | Anchors | Why |
|---|---|---|---|
| B1 | Four ink/paper tokens in `style.css :root`: `--gamut-edge`/`--gamut-hatch` + `-paper` pair (P3, verbatim) | `demo/@/styles/style.css` `:root` | single-ink hatch disappears on dark/saturated substrate (prototype-proven) |
| B2 | **2D-canvas overlay** stacked on the KEPT HSL square: strokes the ΔE>JND contour of the wide lens, dual-ink hatched margin, clear-plate caption. **Consumes `sampleGamutBoundary(hueDeg, target, {columns, mode})` from the published 2.0.0 cut — the demo owns paint, NEVER math** (no matrix re-derivation, no in-demo gamut mapping). clip-path = no-canvas fallback; WebGL rejected on the record | base square KEPT `SpectrumCanvas.vue:208-224`; rAF gate `:94-105`; API per `boundary-api.md` (result `{points, count, oogTopFrac}`; `count=0` ⇔ plate-clear) | the one unforgettable thing (P1/P7); perf proven ≈0.3 ms/frame, ~7× inside the <2 ms budget |
| B3 | **Luma ink-regime flip at 0.5 via the shared `spectrumDotStyle` helper — share the function, never copy the constant** | `SpectrumCanvas.vue:226-243` (luma `:231`, flip `:232-233`) | instrument coherence: contour ink and dot border must never disagree about the same region (overlay-amendment §4.1) |
| B4 | **Threshold detent** at the JND contour + target-named `p3 ⊣` micro-label (detent = dot **and model** hold ~6px then release; outbound only; no contour ⇒ no detent; label animation PRM-gated; contour position still tracks hue under PRM — state, not decoration) | P6/P9; crossing detection reuses the render pass's boundary samples — zero new geometry | the treatment's only tactile beat, physics corrected |
| B5 | **Lens policy — Q11, speced at the recommended default: B-with-override** (default lens display-p3; lens follows `selectedColorSpace` only when wide-RGB; caption always names the lens: `GAMUT LENS — DISPLAY-P3 / SRGB`; empty-state caption `p3 Δ < JND — plate clear`, final copy at implementation per overlay-amendment §6) | `demo/@/components/custom/color-picker/index.ts:37` (`DEFAULT_COLOR_SPACE = "oklch"` — why keyed-only never renders the signature) | **Q11 — ratify or flip.** Keyed-only (Option A) demotes the signature to an easter egg and overrules the packet on the record; strict-B is the minor variant |
| B6 | On-plate datum = the contour's innermost point (9px ink crosshair); cusp readout lives in the caption (`cusp L 0.968 C 0.211`) | P7 | the cusp always projects to the square's (1,1) corner — vacuous as a position |
| B7 | Treatment merge-pass nit: fix the stale `spectrumDotStyle:230-235` cite at `color-picker.md:110` → `:226-243` | overlay-amendment §7 footnote (flagged there for this wave's merge pass) | doc-truth |

Lane B is the **O.W7 gamut-truth half**: the same `gamutMapOKLab`/JND computation that draws this contour feeds R.W4's ColorInput gamut-verdict echo — one meaning of "visible clipping," two surfaces (`SYNTHESIS-v2.md §2.3`).

### Lane C — controls consume + design (pure-consume; every producer fix landed at glass-ui 4.0.0–4.2.0; the N.W13 interim spine is void)

| # | Item | Anchors | Why |
|---|---|---|---|
| C1 | **Spectrum-slider consume**: delete the raw-reka fork at `ComponentSliders.vue:59-122` onto glass-ui `variant="spectrum"`; the thumb paints the live color as a producer token feed; center notch + value-aware contrast via the shared helper (B3). ComponentSliders lands **≤400 LoC by construction** (pure-consume proven end-to-end by prototype at 90%; the R8-14 lift) | `ComponentSliders.vue:59-122` (fork), `:93` (literal `gray-200` dies) | U15 (sliders first-class) · U28 (too thin) · U14 (channel letters center EXACTLY with their sliders) · U21 (pills centered) · U29 (clipping items get hover states) · U23 (dropdown-open jerk — producer fix landed; consume) |
| C2 | **Audacious space dropdown**: net-new at `ColorSpaceSelector.vue` is **only** the `size="display"`/`"audacious"` rung — ghost variant already present at `:15`, font override at `:16-17` (that override's *retirement* is R.W4's, rides the same commit family as the EasingSelector fork death) | `ColorSpaceSelector.vue:15,16-17`; catalog-caption eyebrow per treatment TYPOGRAPHY-2 | U7 (menu items at trigger scale) · U30a (more audacious) |
| C3 | **U8 bounded SelectContent + specimen rows via slot + WatercolorDot**: the dropdown bounds itself on the page and scrolls within (producer mechanism landed); option rows are specimen entries (display-face name + live per-space conversion + WatercolorDot swatch — N.W16 D1-3 residual) | `ColorSpaceSelector.vue:23-36` region; `docs/tranches/N/waves/N.W16.md` Lane A D1-3 | U8, named in the fold ledger |
| C4 | **U13 veil capsule**: restore the hairline veil/ellipse encapsulation of the color-space section, idiomatically (glass-ui veil tier, no bespoke recipe) | picker card region | U13 regression |
| C5 | **D8 focus-rings**: every keyboard-operable control paints a visible focus ring (accent-aware via `--accent-live`) | picker controls fleet-wide | the a11y half of the controls story; feeds gate clause (e) |

### Lane D — readout rhythm + picker hero

| # | Item | Anchors | Why |
|---|---|---|---|
| D1 | **Readout rhythm**: int/frac/unit span split, `tnum` tabular figures, small-caps unit (treatment TYPOGRAPHY-1); hero-number scale per the display ramp with the card-lock law applied (the A6 law's *application* — slider drag min→max changes NO card rect) | `ColorComponentDisplay.vue`; N.W16.md Lane A D1-1 (the `ch`-reservation table) | U31 (hero numbers, card must not resize) · U2 (not strictly columnar) |
| D2 | **Picker-hero composition**: the blob placed absolutely top-right of the picker card (material hero, corner-break), numbers as the typographic hero — the dual-hero diagonal | N.W16.md Lane A D1-4; `HeroBlob.vue` | U30b. (The blob's *color-derive* + satellite asks are R.W2/U3 + the GAP-1 BOOK — not this lane) |

### Lane E — the motion three-beat

| # | Item | Anchors | Why |
|---|---|---|---|
| E1 | **plate-land → paint-in → stagger**: one orchestrated open — the plate lands (cartoon shadow casts in), the field paints in at ~180ms, the existing `.stagger-children` becomes beat three. All inside `prefers-reduced-motion: no-preference` | treatment MOTION-1/2; `ColorPicker.vue:3`; `animations.css:34-50` | B1 of the treatment audit: the flagship has no entrance |
| E2 | **Space-switch cross-fade**: the field cross-fades between perceptual plates on space change — and the Q11 lens override hands this a *real geometry change* for free (selecting a wide-RGB space redraws the contour, riding the A2 morph) | treatment MOTION-3; `ComponentSliders.vue:156,159-160` | A2 of the audit: 15 spaces should feel like 15 geometries |

---

## §Hard gate (verbatim-faithful to `SYNTHESIS-v2.md §3 R.W3`; each clause with its measurement form)

- **(a)** `document.fonts.check` true for Fraunces — a REAL face resolves on the built demo (never a `font-family` string match; the split-brain's vacuity is the named escape).
- **(b)** the slider **thumb paints live color under keyboard drive** — arrow-key the slider; the thumb's computed background tracks the model color (proves the consume is a token feed, not a pointer-event cosmetic).
- **(c)** `document.getAnimations()` shows the orchestrated open — the plate-land/paint-in/stagger beats are live animation objects at load (PRM off), absent under `prefers-reduced-motion: reduce`.
- **(d)** **ComponentSliders ≤400 LoC** — the god-module cap holds by construction after the fork deletion.
- **(e)** **focus ring paints on every keyboard control** — tab the picker; every stop shows a computed visible ring.
- **(f)** **re-author a w6a-equivalent probe against the cured substrate** as the falsifiable before/after oracle — a computed-truth probe (CSSOM/screenshot class) driving the built demo, capturing the pre-wave state RED and the post-wave state GREEN. The discarded W0-2 scratch (`.w6a-audit*.mjs`) encoded the technique; **the files stay dead** — the probe is authored fresh, never resurrected from git.

Overlay-specific completion riders (from the packet, inside the same gate): the contour renders at first paint under the ratified lens with the caption naming it; `count=0` renders clear + caption (no NaN sentinels, no phantom stroke); the detent fires outbound-only and not at all on a clear plate; overlay ink-regime flips exactly where the dot's border regime flips.

---

## §BOOKS touching this wave (books, NEVER gates)

| Book | Trigger | Bearing on W3 |
|---|---|---|
| **D8-1 no-shim render verify** | glass-ui rebuilds dist with `layer(components)` (ask already dispatched to the live BG agent at pass-2 time — `dispatch-homes.md` B) | If the BG cut stalls past W3's start, the design wave **proceeds** on R.W2's internally-confirmed defect record (`SYNTHESIS-v2.md §13` residual-risk-4). The 1440 no-shim probe retires the book when the rebuilt `file:` dist lands — never a W3 gate |
| **oklch/lab chroma-extension lenses** | demand, post-v1 overlay | Deferred with trigger per proto F1 v1 scoping (wide-RGB lenses only) — overlay-amendment §6 |

## §Hand-off (binding boundaries)

- **W3 consumes R.W1's engine geometry, never re-derives it** — `sampleGamutBoundary` is the only math seam; matrices stay package-internal (`boundary-api.md`). Any need for a new export is a scope-reveal → triumvirate, not an inline demo re-implementation.
- **W3 owns the `--card-edge` mint + depth laws + card-lock law; R.W4 is a pure consumer** (the N.W12→N.W14 ownership split, carried).
- **W3 owns the picker's gamut-BOUNDARY signature; R.W5 owns the interpolation-PATH signature** — two pages must not both claim the perceptual-truth reveal (`SYNTHESIS-v2.md §2.2`, binding).
- The trigger-font override at `ColorSpaceSelector.vue:16-17` is *observed* here, *retired* in R.W4 (its gate names the deletion).
- Q7's α ratification is upstream and invisible here: whichever α shipped, W3 consumes the published API atop it (goldens regenerated post-α at R.W1).

## §Evidence packets consumed

`docs/tranches/R/audit/pass2/overlay-amendment.md` (the merge packet + detent/lens/narrative spec) · `boundary-api.md` (the API contract + perf envelope) · `gamut-bound.md` (why the α policy is settled upstream) · `dispatch-homes.md` (D8-1 dispatch record) · `docs/tranches/N/waves/N.W12.md` + `N.W16.md` (residual checklists, anchor banks) · `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` (the U-row canon).

## §Fold accounting (zero-drop, `SYNTHESIS-v2.md §10` R.W3 row)

U1 (A1–A3) · U2 (D1) · U7 (C2) · U13 (C4) · U14 (C1) · U15 (C1) · U17 (A5) · U19 (A5) · U21 (C1) · U23 (C1) · U24 (A5) · U26 (A3/A5) · U28 (C1) · U29 (C1) · U30a (C2) · U30b (D2) · U31 (A6+D1) · U32 (A4) · **U8 named** (C3) · ComponentSliders lift R8-14 (C1) · O.W7 gamut-truth half (Lane B) · overlay signature (Lane B) · lens ratification Q11 (B5). Every row exactly once; nothing re-folds into R.W4.
