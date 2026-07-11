# T.W6.5 — CLOSE ARTEFACTS (the owner-audit remediation wave, T-33..T-48)

**Verdict**: **CLOSED-`complete_with_misses`** (2026-07-11).
**Close head**: `69500b7` (the PP-8 cohesion cure) + this docs commit.
**Gate of record**: the composite `T.W6.5.md §Hard gate` (8 rows), re-run against the
LIVE merged round-4 tree (`c2a911f`) + the four landed lanes (S `0ad772f` · P `ad301e7` ·
I `c2a911f` · M `7d3900a` · E `1a8f06c`).
**Spec of record**: `MANDATE-2026-07-06.md §0.6` (verbatim law) · `audit/t33-research.md` ·
`waves/T.W6.5.md`.

---

## §0 The verdict + its reconciliation (the honest narrative)

The close gate returned **BLOCKED** on **HG7 (PP-8 sweep + PI-1 delta)** — a genuine
FAIL, not a gate-run artefact: two demo files sat OVER the standing ≤400-LoC cap
(`ink.ts` 423 · `useColorPipeline.ts` 403 — the Lane-I veil-rung + Lane-P clamp-seam
additions pushed both over), and the W6.5 wave-close PI-1 delta row was absent from the
ledger. The cap is a named §Hard-gate row **and** a standing `CLAUDE.md` precept; every
prior wave CURED it by extraction before close (never routed forward), and the mandate
binds **"no gate weakened."**

**The close CURED HG7 the idiomatic way** — the only path that honours both "no gate
weakened" and the owner's `§0.6` law (*"NO quick solutions, NO workarounds … architectural
transpositions in the sake of elegance, simplicity, and performance above all are both
necessary and desirable"*), the same close-time hygiene as W2's `a25c4d2` and W6's
`a9f5e88`:

- **`ink.ts` 423 → 292** — the raw-OKLCH domain bridge + the WCAG gamut-cusp certification
  walk lift to **`ink-walk.ts`** (152, NEW). `ink.ts` keeps the surface-referent model
  (`resolveSurfaceLightness`) + the three public certified-ink rungs; ALL public exports +
  the one-directional import preserved (the 4 consumers + `test/ink.test.ts` untouched).
- **`useColorPipeline.ts` 403 → 373** — the rAF atmosphere-frame-coalesce (W3-1) lifts to
  **`useAtmosphereFrameCoalesce.ts`** (56, NEW), the S-18 last-of-frame-wins law + the rAF
  lifecycle preserved bit-for-bit.
- **PI-1 W6.5 wave-close row FILED** (`pi1-delta-ledger.md`) — demo-only, chunk-graph-neutral,
  expected FLAT vs W4; CSS tripwire re-measured **88.16 KiB gz ≤ 120**.

Behavior-preserving proof: lint 0 · typecheck 0 · vitest **2233/2233** (74 files) ·
gh-pages build clean · LIVE e2e on both touched paths GREEN (O-18 IDENTITY/GRAPHICS legs +
the W4 de-emphasis rows through `certifyAccentInk`/`resolveMutedInk`→`walkToFloor`;
smoke-reactivity spectrum-drag median **4.20ms** through the coalesced atmosphere signal).
Full demo cap sweep now **0 files > 400**.

**HG7 flips FAIL → PASS.** The final gate is **7 PASS + 1 MISS-RECORDED, zero FAIL**:

`_with_misses` = **HG5** (the "scroll-timeline chunk ABSENT from eager" leg — a research
§4.2 chunk-NAME misattribution; the chunk is the boot-required `/parsing` grammar core, and
the REAL dead weight (the scroll()/view() grammar tail in `src/subpaths/parsing.ts`) is
library-side / build-frozen this wave → routed to the **W7 dead-payload row BY NAME**;
demo-side half complete: root-barrel grep ZERO) + the **standing born-RED producer legs**
carried by-design (`test.fail()`, never weakened): **O-16-R1** (150ms clobber, PKT-1→W7) ·
**O-5** (boot-pacing spike, RP-2→W7) · **O-26** (aurora headless→W9) + the reka-ui Select
contention flake (env-class; reproducibly GREEN 6/6 in isolation).

---

## §1 The 8 §Hard-gate rows — VERBATIM (as the gate delivered), with the HG7 cure annotated

### HG1 — verify-walk (6 rows) → **PASS**
All 6 VERIFY-AT-ROUND-4 rows walked against the LIVE merged tree (`c2a911f`) via the oracles
run at lane ports 8291/8292: **T-36** O-15b:43 true-button box-model GREEN (padding 8px 12px /
margin-inline 4px, `c237d24` stands); **T-37** O-15a seal border-style:none + t31-dock-band
105-109 band-never-a-card GREEN (die-rim dead, wax fills, derive-seam encoded, `3408433`
stands); **T-40b** O-18 W6.5 letterform gate "options compute weight 400" GREEN both schemes;
**T-43** O-14 36-37 "one mint, two consumers" + excised legend dead GREEN (`5833474` stands);
**T-46** O-21:84 "pill silhouette rounds on glass-ui slider-track register" GREEN (`5edd903`
stands); **T-48** O-16 W5 census "per-row duration/curve ≡ liquid target both schemes" GREEN +
O-11 gate-4 compositor-only CDP-layout-FLAT GREEN. Zero unwalked, zero reopened. (The
verify-walk RECORD is this filing — owed as a wave-close artefact.)

### HG2 — Lane S (O-9 / trio / filler-zero / pulse / R7) → **PASS**
o9-shadow-palette 5/5 GREEN: Extract instrument face live-k ghost LIVING pulse PRM-static (125);
Mix→Palettes, My Palettes, Browse true-empty all render trio+dashes with ZERO fillers
(168/187/203); error≠empty plate wears no ghost/no trio — R7 surviving semantics (238). Code
confirms: EmptyState trio restored (plate-a/b/c WatercolorDot ghosts on `--accent-live`, dots
default-true, no `:dots="false"` anywhere), ShadowPalette redesigned genesis register (staggered
`animate-pulse` delay i×0.12s, card-true material), R7 aria stack intact (aria-hidden, NO
role=status, NO Loading label; error uses role=status/CircleAlert). ShadowPalette-as-filler
retired to the ONE legitimate Extract instrument face only.

### HG3 — Lane P (clamp / blank-band / O-18 W4 veil / O-10b lock) → **PASS**
Clamp oracle `test/value-domain-clamp.test.ts` 6/6 vitest GREEN (999→per-space bound, −999→min,
hue-wrap, kelvin-exception, NaN, owner's exact `lab(40% 999 47)`). readout-seam 3/3 GREEN (lab
one-line: numbers flush at box bottom / air rides above; lab two-line: growth UPWARD into
reservation same box; rgb one-line: reserved≡painted). O-18 W4 rows re-run GREEN both schemes on
the veil ground (readout fracs/units/commas ≥4.5:1; channel letters ≥4.5:1 on console;
ConfigSliderPane). O-10b line-locks GREEN both 1440 and 390. Console re-seated onto
`<Card surface=veil>`, D6 ink referent moved with material (`ink.ts` veil rung).

### HG4 — Lane I (O-18 identity+graphics / F-4 grep / weight 400) → **PASS**
O-18 W6.5 legs GREEN both schemes: IDENTITY leg "certified accent SPEAKS the pick — hue held,
C ≥ 0.35×" (67/70, the §5.1 cream-collapse now certifies a chromatic ink); GRAPHICS leg "Extract
instrument tracks ≥3:1 WCAG 1.4.11" (69/72, born-RED against the kC `var(--muted)` track);
letterform gate "options compute weight 400" (68/71). F-4 grep ZERO:
`text-muted-foreground/[0-9]` = 0 hits across demo/. `certifyAccentInk` cure present in `ink.ts`
(hueGamutCeiling→findCusp cusp-walk + resolveSurfaceLightness surface referent, not page ambient).
Option-letterform weight pinned to `--type-weight-display` at ColorSpaceSelector. *(Close note:
`certifyAccentInk`/`hueGamutCeiling`/`walkToFloor` moved to `ink-walk.ts` at the HG7 cure — the
cure is byte-neutral; HG4's O-18 IDENTITY/GRAPHICS legs re-ran GREEN post-cure.)*

### HG5 — Lane M (eager graph / b2-b4 / T-45 / P3 rider) → **MISS-RECORDED**
demo root-barrel grep ZERO (`from "@mkbabb/value.js"` = 0 in demo/). O-11 6/6 GREEN incl. gate-4
(blob-mount layout now inside the settled overture, ≤5 layout bar unchanged). T-45 carrier
landed lossless (≤1/255 Chromium, 0 WebKit; rim precondition structurally dissolved by T-31
dock-atop band). P3-family rider BOOKED by name (`92136ab5`, GLASSUI-T-ASKS §P3/P10). **MISS**:
the gate's "scroll-timeline chunk ABSENT from eager" leg is NOT achievable demo-side — the chunk
is the boot-REQUIRED parse-that/CSS grammar core held eager by the `/parsing` subpath (hydrate.ts
synchronous URL-color parse), a research §4.2 chunk-NAME misattribution; the real dead weight
(scroll()/view() grammar tail in `src/subpaths/parsing.ts`) is library-side/build-frozen this
wave → routed to W7 dead-payload row BY NAME. Honestly recorded, no gate weakened, demo-side half
complete.

### HG6 — Row E (VERIFIED or O-17 + §3.4) → **PASS**
Lane E EXECUTED §3.4 (commit `1a8f06c`). New `easing/` subdir: `EasingAuthoringStage.vue` seats
the ONE vendor `<EasingPicker :playback="false">` as a flat well (kf division: closed rows=
selection gallery via easingCatalogue, open row=authoring); regex autoplay drive DELETED (only a
removal-documenting comment remains — zero querySelector-on-button-text); SegmentedTabs dropped
(picker owns mode); GradientEasingEditor −59 LoC. O-17 3/3 GREEN (zero letterbox across curve
regimes desktop+390; composition stamps/dot-rest/one-literal/mint-law).

### HG7 — PP-8 sweep + PI-1 delta + CSS tripwire → **FAIL → CURED at close → PASS**
**As the gate delivered (VERBATIM):** CSS tripwire PASS: render-blocking index CSS = 87.4 KiB gz
≤ 120 (glass-fonts 98.1 + katex 7.8 are async via media=print/onload + lazy chunk, not
render-blocking). BUT PP-8 repo-wide sweep is NOT clean — 2 un-cured god-module cap breaches:
`demo/@/composables/color/ink.ts` = 423 LoC and `demo/@/composables/color/useColorPipeline.ts` =
403 LoC, both OVER the ≤400 cap (CLAUDE.md precept; the W6.5 Lane-P veil-rung + clamp-seam
additions pushed both over). The cap is a named §Hard gate row + a standing precept; every prior
wave CURED PP-8 by extraction before close (Dock 468→336 `a9f5e88`, PaletteCard lift `a47afa7`) —
none routed it forward; the mandate binds "no gate weakened". Also: the INTEGRATOR W6.5
wave-close PI-1 delta row is NOT filed in `pi1-delta-ledger.md` (only the Lane-M contribution row
exists at line 47).

**THE CLOSE CURE (both halves discharged — see §0):** (1) the two module lifts (`ink-walk.ts` +
`useAtmosphereFrameCoalesce.ts`, `69500b7`) bring the sweep to **0 demo files > 400** — behaviour
preserved (lint 0 · typecheck 0 · vitest 2233/2233 · build clean · live O-18 + reactivity GREEN);
(2) the W6.5 wave-close PI-1 delta row is FILED (`pi1-delta-ledger.md`), CSS re-measured
**88.16 KiB gz ≤ 120** from the fresh build. The cure is an architectural transposition per §0.6,
NOT an adhoc temp fix / comment-shave. **HG7 → PASS.**

### HG8 — lint 0 / typecheck 0 / test / e2e / git → **PASS**
lint 0 (eslint --max-warnings=0 exit 0); typecheck 0 (vue-tsc lib+demo exit 0); vitest **2233/2233**
across 74 files exit 0; git status CLEAN; tool-artefact grep `</?(content|invoke|parameter|antml)`
CLEAN over all W6.5 docs. E2E full 6-project (ports 8291/8292): 154 passed + 2 skipped (O-3
headed-GPU) + 1 failed. The 3 ✘ inside "passed" are the standing born-RED `test.fail()` legs
(O-16-R1 150ms-clobber PKT-1, O-26 aurora perceptibility, O-5 boot-pacing RP-2) — all
intact/expected, O-16 re-confirmed 2/2 in isolation. The 1 real failure (O-10d:296 "Select view"
combobox not visible) is a reka-ui contention flake — reproducibly GREEN 6/6 in isolation; same
documented flake class as the lane runs. Product work all green. *(Close note: the HG7 cure
re-ran lint 0 · typecheck 0 · vitest 2233/2233 unchanged.)*

---

## §2 The T-33..T-48 disposition map (all 16 rows accounted; zero silent drops)

| Row | §0.6 kernel | Disposition | Evidence |
|---|---|---|---|
| **T-33** | readout↔rail gap + dynamic-max clamp (999) | **LANDED — Lane P** | `ad301e7`; clamp oracle 6/6 (`value-domain-clamp`), readout-seam 3/3; taste-residual (seam air) → W8 bracket |
| **T-34** | sliders console → glass-ui veil card + air | **LANDED — Lane P** | `ad301e7`; `<Card surface=veil>` re-seat, D6 ink referent moved to the veil rung, O-18 W4 rows re-run GREEN |
| **T-35** | "delineate all" — accent-ink census | **LANDED — Lane I** | `c2a911f`; `certifyAccentInk` cusp-walk cure (cream-collapse dies), O-18 IDENTITY leg born-RED→GREEN |
| **T-36** | Tools trigger true-button box-model | **VERIFY GREEN** | O-15b:43 (8px 12px / 4px), `c237d24` stands |
| **T-37** | collapsed-dock swatch visibility | **VERIFY GREEN** | O-15a + t31-dock-band; derive-seam material, `3408433` + T-31 dock-atop |
| **T-38** | aurora pointer response → glass-ui | **RELAYED (producer)** | P1-family rider `8a0ca24e`; verify-at-cut W7 |
| **T-39** | "performance awful on load" | **Q14 PRESSURE** | levers stay W7 (RP-2/L20/GAP-L5) / W9; Lane-M demo-now contributions recorded in PI-1 |
| **T-40** | dropdown options not bold | **LANDED (T-40a) + VERIFY (T-40b)** | Lane I weight-400 pin (`--type-weight-display`); O-18 letterform gate GREEN; P10 producer cure booked |
| **T-41** | ShadowPalette rejection (3 sightings) | **LANDED — Lane S (R12)** | `0ad772f`; as-filler retired at 3 hosts, trio+dashes restored, O-9 5/5 |
| **T-42** | shrunken pane-header state | **→ W8 bracket** | `T.W8.md` package roster (§6.6 mechanism handed by name) |
| **T-43** | "Palettes" rainbow | **VERIFY GREEN** | Q5 ramp ×2 sites, O-14 referent, `5833474` stands |
| **T-44** | sliders unreadable + species redesign | **LANDED — Lane I (T-44a) + Lane S** | tracks re-inked (GRAPHICS leg born-RED gate); species genesis-register redesign `0ad772f` |
| **T-45** | card border-clip artifacts | **LANDED — Lane M** | `7d3900a`; oversampled-pseudo carrier (≤1/255), rim precondition dissolved by T-31; P3 producer rider `92136ab5` |
| **T-46** | gradient unusable + rounding | **VERIFY GREEN** | O-21:84 pill-rounding, `5edd903` + `ee7b1dc` stand |
| **T-47** | easing selector first-principles redesign | **EXECUTED — Row E** | `1a8f06c`; kf `<EasingPicker>` seat, regex autoplay DELETED, O-17 3/3 |
| **T-48** | card transition motion "janky" | **VERIFY GREEN + residual → W8** | O-16 W5 census GREEN both schemes; frame-by-frame residual → `T.W8.md` motion bracket |

---

## §3 Books carried (books, never gates)

- **T-45 producer root** → P3-family glass-recipe rider (oversampled-pseudo at the ladder;
  demo-interim is the booked-swap interim) — walked at W7.
- **T-38 rider** → P1-family (aurora pointer); dispatched `8a0ca24e`/`92136ab5`, verify-at-cut W7.
- **T-40 root** → P10 weight tokenization (the `--type-weight-display` pin retires when it lands).
- **T-42** → the W8 shrunken-state bracket; **T-48 residual** → the W8 motion bracket (both named
  in `T.W8.md`).
- **T-33b** seam-air taste residual → W8 bracket (both §6.1 arms as its poles).
- **HG5 / T-39** → the `/parsing` scroll()/view() grammar tail (library-side dead-payload) →
  the **W7 dead-payload row BY NAME**; the Q14 budget gates stay W7 / W9 (green-or-escalation).
- **The standing born-RED producer legs** (`test.fail()`, never weakened): O-16-R1 (PKT-1→W7) ·
  O-5 (RP-2→W7) · O-26 (aurora headless→W9).

---

## §4 Suites + evidence (at close)

- lint **0** (`eslint --max-warnings=0`) · typecheck **0** (`vue-tsc` lib+demo) · vitest
  **2233/2233** (74 files) · gh-pages build clean · `git status` clean (tracked tree).
- Full demo cap sweep: **0 files > 400 LoC** (`ink.ts` 292 · `ink-walk.ts` 152 ·
  `useColorPipeline.ts` 373 · `useAtmosphereFrameCoalesce.ts` 56, post-cure).
- CSS tripwire: render-blocking `index-*.css` = **88.16 KiB gz ≤ 120** (fresh build).
- E2E: the gate's full 6-project run (154 passed / 2 skipped O-3 / 3 standing born-RED / 1
  reka-ui contention flake, GREEN 6/6 in isolation) + the close-cure targeted re-drive on lane
  ports 8391/8392: **24/24 GREEN** (O-18 full census both schemes incl. IDENTITY/GRAPHICS/W4 legs
  + smoke-reactivity spectrum-drag 4.20ms / slider-keyboard 26ms).
- PI-1: the W6.5 wave-close row filed (`pi1-delta-ledger.md`) — demo-only, chunk-graph-neutral,
  expected FLAT; the Lane-M contribution row carries the demo-now movers; CI 3-sample spread
  appends from the post-push run.
- Lane records: `audit/w65-lane-m-record.md` · `audit/w65-lane-p-record.md` (the S/I/E/verify
  records fold into this artefact + the wave doc).
- Close cohesion cure: `69500b7` (path-scoped `demo/@/composables/color/`).

---

## §5 Hand-off

**T.W8 flips DISPATCHABLE** — the round barrier (round 4.5) is discharged; W8 opens on ground the
owner's own audit has re-shaped, its passes re-judge these surfaces critique-fresh with this
wave's ledger + the two named brackets (**T-42** shrunken-state · **T-48** motion residual) in
the package roster. **T.W7** stays **TRIGGER-NOT-FIRED** (re-probed 2026-07-11: `git -C
../glass-ui tag --list 'v5*'` = EMPTY · `npm view @mkbabb/glass-ui version` = 4.2.0; the BG 5.0.0
cut is USER-GATED + untagged — it FLOATS into whatever round is current when the tag lands, NOT
on the critical path). W9's zero-drop walk counts all sixteen T-33..T-48 rows against this record.
