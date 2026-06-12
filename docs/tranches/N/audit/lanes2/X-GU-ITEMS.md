# Lane X-GU-ITEMS — the glass-ui BA inbound-ask items, AUTHORED

**Fleet**: second N-tranche deep-audit (lanes2). **Mode**: tranche development only — no code
edited anywhere; the deliverable is a docs-only authoring in the sanctioned foreign-repo grant.
**Date**: 2026-06-12. **Substrate**: the X-GU overlap matrix (`X-GU.md`), the user LEDGER
(U1–U33), and the donor lane reports `U-DROPDOWN.md` / `U-AURORA.md` / `U-DOCK.md` /
`U-BLOB.md` / `U-CONTROLS.md` / `X-KF.md` — every ask carries a live-reproduced diagnosis,
none is hypothesis.

---

## §1 — The artifact

**Authored**: `../glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md`
(absolute: `/Users/mkbabb/Programming/glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md`).
NOT committed — the lead reviews + commits.

**The location judgment** (the brief offered `waves/W-VALUEJS-N2-ASKS.md` or the idiomatic
location): BA's demonstrated idiom for inbound cross-repo asks is the **coordination
letter** — `coordination/ATLAS-LETTER-2026-06-12.md` is the precedent (a need-shaped
register-structured letter from the atlas consumer, which the BA lead then folded as
`W-ATLAS-RECONCILE`). The `waves/` directory holds only `BA.W-*.md` lead-authored wave specs
with File Bounds, gates, and Triumvirate dispatch a consumer repo cannot legitimately
dictate; a foreign-authored wave spec there would be off-idiom and presumptuous. The letter
mirrors the atlas letter's structure (provenance → registers by nature → routing) and BA's
voice, and is explicitly **need-shaped, not name-shaped** so BA keeps design authority.

## §2 — The item census (the brief's 9 items → the letter's registers)

| brief item | letter home | disposition | priority |
|---|---|---|---|
| Select/dropdown collision+scroll+font-parity (U7/U8/U30a) | **A-2** (WO-1/WO-2/WO-3) | the `@source "../components"` dist breakage root (U-DROPDOWN.md WO-1: the bound is authored at `SelectContent.vue:47` but never emits — `dist/components/` does not exist) + the kf donor cap (`EasingSelect.vue:29` + `design-idioms.css:113` `min(24rem,60dvh)`) + the font-rung prop (the `--dropdown-text` lever promoted from raw-token override to a Select-family prop). Net-new roster item or W-MENU-GLASS/W-HYGIENE extension — the 30-wave grep returns ZERO for collision/bound/scroll. | P0 |
| dropdown open-jerk (U23) | **A-2 WO-2 + D-2** | downstream of the unbounded box (the zoom-in-95 sweep over 745px); WO-2 = origin-anchored open polish; D-2 = confirm the open transition is in W-GLASS-CAL.3's spring-clock census | folds with A-2 |
| dock morph timing/sizing (U6/U16) | **A-1** | the nested-DockLayerGroup FLIP `to:0px` mis-measure, DETERMINISTIC (4/4 cycles), not the booked "first-mount intermittent" — re-scope `AY.W-GOD1 §F2` (`dockMorphContext.ts:328-343`); spring constants explicitly fenced as FINE (no re-tune); fold into W-DOCK-GEOMETRY or W-DOCK-MORPH-INSITU | P0 |
| Slider primitive (spectrum face, sizing) (U15/U20b/U28) | **A-3** | the size axis is structurally dead (CVA arbitrary utilities ship only in dist JS — every consumer renders 6px tracks; `size` inert); fix shape offered: `[data-size]` scoped selectors (pattern already proven at `Slider.vue:150-154`) or precompiled rules; spectrum-thumb re-verify under the fix; the spectrum VARIANT itself already exists ("the value.js color-picker reference EXACTLY") so U15 is consumption, not a new primitive; track-content convenience filed optional/LOW | P0/P1 |
| aurora motion root-fix (U33) | **A-4** | the LEDGER's probe suspect is REFUTED (U-AURORA.md: webgl mode on real GPU, 44fps, advancing uTime) — the fix spec filed instead: `MOTION_FIELDS.breathing` zeroes all spatial drift (`atoms.ts:164-168`), only a ±2.5% luminance pulse survives; ask = non-zero nucleiDrift/paletteDrift or amplitude lift; noted OUTSIDE the GL-shader fence-lock (composable table, not frag) | P1, cohort-grade |
| blob satellite expressivity (U3) | **C-1** | the `uSatColor[]` spec ready from U-BLOB.md (uniform + per-source frag blend with smin cross-fade + `uploadBlobUniforms` stop assignment `i ← stops[(i % (stopCount-1)) + 1]` + optional shade-spread knob); fence collision named: W-GOO-REDRESS fence-locks `metaball.frag` except its smin/orbit seam — ask is to WIDEN the named seam or ship 4.x; companion `bodyLightness` floor on `deriveBlobPalette` (the near-white-seed base case is demo-side, but the deriver gives consumers no floor) | HIGH, N-chartered (`N.md §8` V4) |
| watercolor-dot ghost/dashed variant (U18/U22) | **C-2** | net-new register (BA grep: absent); the spec = same `useWatercolorBlob` PRNG geometry rendered stroke/low-alpha (a PROPER watercolor ghost, not a CSS dashed rectangle), seed-stable so a ghost that fills keeps its silhouette | MED |
| easing-configurator port (U27/U25) | **C-3** | the X-KF.md headline: three hand-rolled editors on one value.js math substrate, none published, neither K nor BA schedules the publish; donor = the kf trio reconciled with glass-ui's own `BezierEditor.vue` twin; coordinate W-FOURIER-STUDIO's StepsEditor fold (no fourth fork) + note W-DEMO-AFFORDANCES' chip rack is demo-local by BA's own fence (no duplication); boundary law restated (math=value.js, time=kf, component=glass-ui); 3 consumers re-point on their own schedules | HIGH, cross-repo |
| skeleton glass (U20a) | **D-1** | ALREADY COVERED — W-SURFACE-AXIS scope 6 is exactly the fix; filed as confirmation + named downstream consumer only (value.js `PaletteCardSkeleton.vue` re-authors onto `surface="glass"` at the pin); zero new scope requested | confirm-only |

**Plus two items the donor lanes surfaced that the brief did not name** (filed because they
are glass-ui-owned and would otherwise drop, violating the LEDGER's zero-drop directive):

- **Register B — the P9 emission class** (HIGH): A-2/WO-1 and A-3 are two instances of ONE
  mechanism (glass-ui's `@source` points at a non-existent `dist/components/`; structural
  utilities depend on consumer JIT reach). The letter asks for the class-closing sweep +
  a producer-side emission gate (the mirror of value.js inv-N-7), homed at W-HYGIENE or
  net-new. This is the single highest-leverage robustness ask in the letter.
- **A-5 — SegmentedTabs pill centering** (U21, P2): filed as a W-TABS acceptance-row
  addition only (the indicator engine is being rebuilt anyway) — extend, don't re-state.

## §3 — Register E: the cut (the N-side consequence)

The letter records what X-GU §3.3 found: **N.W9's pin target moved.** N chartered the close
pin at glass-ui 3.13.0 (`inv-N-6`), but BA cuts 4.0.0 and that is where every U-fix lands —
the letter commits value.js to re-target the pin to the BA cut and asks for the by-name
migration rows that hit live value.js consumers (the tabs break — `PaneSegmentedControl.vue`
consumes `/tabs`; Dialog `variant`→`surface`; the menu-row glass default flip; any Select/
Slider renames out of registers A/B). This needs a one-line N charter amendment at the
synthesis fold: `inv-N-6` "3.13.0" → "the BA cut (4.0.0)".

## §4 — What was deliberately NOT asked (anti-duplication ledger)

- U1 gray/dark, U6/U12 spring feel, U16 clip half, U7 item glass register, U13 veil, U20a
  skeleton: all COVERED by BA waves (W-DARK-MATERIAL, W-NO-GRAY, W-GLASS-CAL.3,
  W-DOCK-GEOMETRY, W-MENU-GLASS, W-SURFACE-AXIS) — the letter's Register D names them as
  consume-only so the BA lead sees the boundary explicitly.
- The aurora renderMode probe audit (X-GU's original ASK X-GU-A1 shape): NOT filed —
  U-AURORA refuted the probe hypothesis live; filing it would have sent BA chasing an
  innocent mechanism. The fix spec (the motion table) is filed instead.
- A glass-ui Slider track-content slot as a hard ask: demoted to optional/LOW — value.js can
  compose the spectrum behind the glass track via `--slider-track-bg` demo-side; the ≥2-
  consumer bar isn't met.
- U14/U2/U31/U32/U30b/U4/U5/U9/U10/U11/U29-application: demo- or library-owned (value.js
  side); no glass-ui ask exists for them and none was invented.

## §5 — Provenance + scope honesty

- Read in full before authoring: the user LEDGER; `X-GU.md` (the overlap matrix + 8-ask
  census); `U-DROPDOWN.md`, `U-AURORA.md`, `U-DOCK.md`, `U-BLOB.md`, `U-CONTROLS.md`,
  `X-KF.md`; glass-ui `BA.md` (full roster, invariants, hinges, fences) +
  `coordination/ATLAS-LETTER-2026-06-12.md` (the inbound-ask idiom) + `BA.W-MENU-GLASS.md`
  (the wave-spec format, to make the asks fold-ready).
- No live-browser work was needed: every diagnosis in the letter is inherited from the donor
  lanes' live probes (cited per item); per BA inv-3 the folding BA lane re-greps anchors at
  HEAD but inherits the diagnosis. No screenshots emitted by this lane.
- Foreign-repo writes: exactly ONE file, docs-only, under the explicit sanction
  (`docs/tranches/BA/coordination/`), uncommitted. No glass-ui code, no value.js code, no
  keyframes.js writes (read-only donor cites).
- Design-language note (the Fable mandate): the letter preserves the user's design verdicts
  inside the asks — the audacious type ramp rides WO-3's font-rung register (trigger+items
  scale together, U30a/U31 congruence), the satellites are the colorful-pops mandate
  expressed in the goo (derived in-family shades, not white), the ghost variant keeps the
  watercolor hand (PRNG silhouette as stroke, never a dashed rect), and the easing
  configurator is the kf-styled glass instrument U27 names — each ask states the design
  intent so BA's shape-freedom cannot regress the look.
