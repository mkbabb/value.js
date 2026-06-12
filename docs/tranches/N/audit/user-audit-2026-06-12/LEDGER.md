# The user audit — 2026-06-12, live against HEAD (`199fd15` + 0.12.0)

**Provenance**: first-person audit on the dev server (:9000, cold cache) after W0–W5+W7
landed and W6 died un-implemented. 28 screenshots salvaged to this directory (u01–u28, in
message order). **These findings OUTRANK the prior audit corpus where they conflict.** Every
row gets grounded (file:line, root cause, ownership: demo / glass-ui / library / keyframes)
by the second fleet, then folded into the re-divined waves. NOTHING here may drop.

## A — Global / typographic / atmosphere

| ID | Finding (user's words condensed) | Shots | Initial ownership hypothesis |
|---|---|---|---|
| U1 | App overwhelmingly GRAY AND DARK; "the fonts are ALL wrong" | u01 | demo+glass-ui — suspect a font-loading or token regression (the styles-surface changes); verify live which font-family actually renders + why the wash went gray |
| U2 | Color-space numbers "should not be strictly columnar" | u02 | demo — ComponentSliders value layout |
| U31 | Color-space numbers much LARGER, HERO-like, fluid, audacious — but the card must NOT resize as they change | u28 | demo — tabular-nums/ch-reservation + display ramp |
| U33 | **Background aurora completely broken: does not move, no shade variation** — may need the glass-ui root | — | glass-ui/demo — PRIME SUSPECT: the new software-GL probe (e59987ae) or the demo's renderMode consume mis-firing on real GPU → the static CSS fallback painting always; or deep-watch not re-deriving |
| U32 | Cards/layouts "overly contrived, not modern"; picker card properly sized; sliders bigger; dock bigger; less cramped/more accessible; desktop = two cards side-by-side, similar size, CLAMPED for pathological wide/tall screens, handled generally | u27,u28 | demo — the grand-hierarchy/layout wave |

## B — The blob (the hero)

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U3 | Blob is awful: hover broken + janky; colors FAR TOO WHITE (must derive from current color); NO satellite blobs that orbit and meatball out; satellites = slightly-different shades of the current color, like deriveAurora | u03 | demo consume (paletteStops feed too pale — chromaCeiling 0.16? L too high?) + glass-ui (satellite config/expressivity; the uSatColor[] ask) |
| U30b | Blob bigger; positioned essentially absolutely top-right of the picker card | u26 | demo |

## C — Dock + transitions

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U6 | Dock animations/transitions take FAR too long to squish/morph; slow, laggy, jittery | u06 | glass-ui dock springs (register/duration) + demo perf — needs a measured trace |
| U16 | Dock slow, NOT SIZED PROPERLY between transitions | u11 | glass-ui dock morph sizing |
| U12 | Pane transitions + card transitions not smooth — refine on glass-ui springs; STANDARDIZE the pane/card nomenclature | u09 | demo (+nomenclature doc) |
| U11 | Desktop missing the second right-most pane? | u09 | demo — likely the R1 pane-router hydration residual (W1D-closure.md) |

## D — Dropdowns / selects (glass-ui core robustness)

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U7 | Dropdown items must be the SAME scaled font-size as the select trigger | u07 | glass-ui Select root |
| U8 | Dropdowns must bound themselves on the page + scroll within — FIRST-CLASS in glass-ui; study how the keyframes.js easing-curve picker dropdown does it and bring that mechanism | u08 | glass-ui (collision/scroll) + keyframes (the reference mechanism) |
| U23 | Dropdown open animation jerks | u20 | glass-ui |
| U30a | The current color-space dropdown should be more audacious | u26 | demo+glass-ui variant |

## E — Controls (sliders, pills, skeletons)

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U15 | Sliders must be FIRST CLASS in glass-ui | u10 | glass-ui — new primitive |
| U28 | Slider too thin | u24 | glass-ui slider sizing / demo |
| U20 | Skeletons too BLACK — should be glassy like glass-ui skeletons; the slider = a glass slider, but SPECTRUM glass | u16 | demo skeletons + the glass-ui slider primitive |
| U14 | The channel letters must center EXACTLY with the sliders they affect | u10 | demo ComponentSliders |
| U13 | The color-space component section used to sit in a hairline dock/veil ELLIPSE card — regression | u10 | demo — restore the encapsulation idiomatically |
| U21 | Pills not centered | u17 | demo |
| U29 | Items that clip need a hover state | u25 | demo |

## F — Cards / shadows / rounding (the depth grammar)

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U17 | Palettes card + many cards not rounded properly; shadow FIGHTING issue; cards = glass cards WITH cartoon shadows | u12 | demo + the depth-grammar work-order |
| U19 | Components not rounded per the design language (two separate panes) | u14,u15 | demo |
| U24 | Shadow too extreme; hairline border wrong; the palette component → FIRST-CLASS in-repo component with variants (skeleton, glass) | u21 | demo — PaletteCard componentization |
| U26 | Black hairline wrong (should be glassy); shadow too extreme again | u23 | demo |
| U18 | The dashed outline = a dashed/GHOST variant of the watercolor dot — abstracted to glass-ui | u13 | glass-ui watercolor-dot variant |
| U22 | "Not a proper watercolor ghost"; UI needs refinement | u18,u19 | glass-ui+demo |

## G — Docs panes

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U4 | No spacing between the "definition" and the about-the-color-space content | u04 | demo docs styles |
| U5 | Written sections: padding inconsistent (too much or none) — GOLDEN-RATIO-backed sectional padding + padding around dividing lines | u05 | demo docs styles (the φ ladder) |

## H — Easing pane

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U25 | Easing area needs a lot of work; more design hierarchy | u22 | demo |
| U27 | The easing area → a FIRST-CLASS easing selector + configurator, ABSTRACTED FROM keyframes.js INTO glass-ui, supporting the panoply of easing fns, styled like keyframes.js | u23-ish | glass-ui (the port) + keyframes (the source) — cross-repo tranche item |

## I — Functional defects (not design)

| ID | Finding | Shots | Hypothesis |
|---|---|---|---|
| U9 | Resetting the current color DOES NOT WORK | — | demo bug |
| U10 | Color conversion "quantization" awful: default pink in LAB → RGB is "nothing close" — needs SOTA refinement and research | u09 | **library** (src/units/color/) — reproduce, diff vs reference implementations, research; highest-severity claim in the audit |

## Standing directives attached to this audit

- Fold EVERY un-fixed item (this ledger + the dead W6 charter + all prior deferrals) into the
  tranche, prioritized. NO exceptions, zero drops.
- Performance optimizations + grand design changes to increase hierarchy = first-class waves.
- glass-ui has a NEW just-written tranche; keyframes.js too — analyze for overlap; **author
  tranche items for those repos** in the constellation.
- All design and synthesis work on **Fable**; orchestration on the core model; opus/sonnet fan-out.
- Leverage the chrome-devtools MCP, modern-web guidance, and the frontend-design plugin. No exceptions.
- Tranche development ONLY — this fleet implements nothing.
