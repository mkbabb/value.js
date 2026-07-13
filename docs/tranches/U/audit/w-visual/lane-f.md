# U.W-VISUAL — Wave-Open Census — LANE F (Census closure — micro-chrome roster + static pointer roll-up)

The census-closure lane. Re-judges the ONE live perceptual row inherited from
T.W8's terminal state (the micro-chrome roster, owner-uncertified because the E-7
coherence pass was never filed), then RECORDS the static-pointer rows that other
waves / the producer own so no successor silently re-opens them (zero silent
drops). Does NOT re-litigate T.W8's landed cures.

Verdict vocabulary: CENSUS-GREEN (cure holds, retire) / CENSUS-RED (still-red
reproduces, re-cure owed) / ANNEX-OWNER-ATTEST (U-F54: requires a real-GPU /
owner-attested / non-macOS frame a headless read cannot honestly finalize). For
STATIC rows the verdict is RECORDED-ELSEWHERE (name the owning wave; do NOT judge).

## Serve provenance (HEAD-faithfulness)

- Worktree `u-visual-census` HEAD `e97a9d1` (`docs(T · FINAL)` — T.W8-terminal),
  served on **port 8596** via `e2e/smoke/perf/serve-built.mjs` → `dist/gh-pages`.
  Same HEAD + same bundle (`index-SS23gDZz.css`, `glass-ui-C8hjvIIZ.js`) Lane C
  certified — provenance consistent across the wave.
- Probe: `microchrome-probe.mjs` (worktree root, UNCOMMITTED — the Lane A idiom),
  headless Chromium `--use-gl=swiftshader`, both schemes @1440, log at
  `microchrome-probe-log.txt`. Static grep of `demo/` + built `dist/gh-pages`
  assets FIRST (PROBE-PARSIMONY); live probe only to confirm the formed hypothesis.
- **Expected non-defect**: the served loopback build fires the designed
  `misconfigured` console.error (no `VITE_API_URL` + loopback origin +
  cross-origin prod BASE_URL — the CLAUDE.md dev-honesty contract). By design,
  NOT a page break, and orthogonal to every micro-chrome item (all pure CSS/DOM
  chrome). No other page/console errors.

---

## [zd3-microchrome] MICRO-CHROME ROSTER NEVER-FILED W8 PASS — **ANNEX-OWNER-ATTEST**

VERDICT §5-D3 perceptual half. Five sub-items re-judged live at wave-open. Two
decisive perceptual items are cured-GREEN and dispositive; the roster as a whole
carries an unremovable owner touch (a U-F54 platform-conditional scrollbar leg +
two owner-eye retire-vs-recure dispositions), so it cannot be honestly closed
all-GREEN. Per-sub-item DELTAs recorded below so nothing drops silently. NOTE:
the thrown-error a11y half is out of scope here → U-F58 (U.W-A11Y).

### (a) `::selection` ink — **CENSUS-GREEN** (dispositive; cured)

The headline micro-chrome item (T.W8 P11-R1 / T-24). The pre-cure red: every
stylesheet shipped ZERO `::selection` rules, so a text selection painted the
browser DEFAULT BLUE — the single foreign accent in a terracotta/brick app, in
both schemes. **The cure landed and reproduces live.** Authored rule
(`style.css:665`): `::selection { background: color-mix(in srgb, var(--accent-live)
32%, transparent); color: var(--foreground); }` + `::-moz-selection` (Firefox);
present in the built CSS; the translucent color-mix rule cascades LAST over the
glass-ui base `::selection{background:var(--accent-live)}`, so a semi-transparent
accent tint wins (never opaque — ink stays legible).

| scheme | resolved selection bg | resolved ink | default blue? |
|---|---|---|---|
| light | `color(srgb 0.583 0.00006 0.226 / 0.32)` (brick/terracotta @32%) | `rgb(28,25,23)` (warm near-black `--foreground`) | **no** |
| dark  | `color(srgb 1.511 0.562 0.783 / 0.32)` (rose/pink @32%) | `rgb(233,230,226)` (warm off-white `--foreground`) | **no** |

DELTA: **default browser blue → live-accent 32% tint + scheme `--foreground` ink**,
per-scheme derived (the `--accent-live` axis is contrast-guarded), Firefox carried.
Headless-dispositive (pure CSS/DOM, not GPU). π-frames confirm the perceptible
tint over "Home": `frames/microchrome-selection-light.png` (brick-pink band, dark
ink), `frames/microchrome-selection-dark.png` (rose band, off-white ink).

### (b) cursor grammar — **CENSUS-GREEN** (dispositive; coherent)

A coherent 10-value cursor vocabulary ships in the built CSS
(`pointer` ×24 · `not-allowed` ×13 · `grab`/`grabbing` ×5 each · `default` ×4 ·
`help` ×2 · `copy`/`crosshair`/`text`/`inherit` ×1) and resolves correctly by
element role live:

| role | computed cursor |
|---|---|
| interactive / button | `pointer` |
| text input | `text` |
| draggable | `grab` |
| spectrum interaction surface (crosshair-tagged) | `crosshair` |
| disabled affordance | `default` |

DELTA: coherent per-role cursor grammar present (the bare generic `canvas`
selector reads `auto`, but the actual spectrum interaction surface is
crosshair-tagged and resolves `crosshair` — the grammar lands where it matters).
Headless-verifiable via computed cursor; no GPU dependence.

### (c) non-macOS scrollbar — **ANNEX-OWNER-ATTEST** (U-F54) + recorded wiring gap

The themed non-macOS treatment EXISTS but is UNWIRED to the demo's own scroll
surfaces:

- glass-ui ships `.scrollbar-thin` (`::-webkit-scrollbar{width:8px;height:8px}`,
  pill thumb `--scrollbar-thumb`, `scrollbar-width:thin`, `scrollbar-color`) +
  `.scrollbar-hidden` (`scrollbar-width:none`). Tokens are DEFINED:
  `--scrollbar-thumb = color-mix(in srgb, var(--muted-foreground) 25%, transparent)`,
  `--scrollbar-track = transparent`.
- **Live count: `.scrollbar-thin` consumers = 0** (defined + tokenized but applied
  NOWHERE); `.scrollbar-hidden` consumers = 3 (the picker card + dock hide their
  bars: computed `scrollbar-width:none`). Every other scroll surface (dock overflow
  `sw=auto`, panes, palette dialogs) falls to the browser DEFAULT scrollbar.

The WIRING gap is headless-CERTAIN (`scrollbar-thin=0`; tokens unconsumed). The
resulting **non-macOS appearance is NOT honestly renderable on macOS headless
Chromium** (U-F54: macOS paints overlay bars, not the Windows/Linux chunky
default). → Owner attests a non-macOS frame; the actionable cure is recorded:
apply `.scrollbar-thin` to the demo's real (non-hidden) scroll containers so the
non-macOS chrome inherits the tokened treatment instead of the default.

### (d) static `<title>` — **CENSUS-RED** on the predicate (owner-eye disposition)

`document.title = "Color Picker"` — static and generic. Live: `initial="Color
Picker"`, unchanged across navigation, `dynamic=false`; static grep confirms NO
`document.title` / `useTitle` / `useHead` anywhere in `demo/` or the built JS. The
title never reflects the current view, palette, or picked color. The narrow red
predicate ("is it static/generic?") holds. DELTA: **static generic title →
(owner's eye) a trivial dynamic-title cure (reflect view / picked color) OR
retire-as-defensible** (a single-page color tool with a static title is a valid
call). Actionable but minor; routed to the owner's eye per the row's charter.

### (e) native-title tooltips — **out-of-scope-recorded** (producer-relay material)

34 `title=` sites in source (DockIconButton `title=`, mix/gradient `:title="…css"`,
image-extractor controls, truncated `<code :title>`); **ZERO live on the home
surface** — they ride the gradient/mix/image/dock panes, not the default view.
They render as NATIVE OS tooltips (delayed, unstyled OS chrome). DELTA: native
title tooltips are a coherence choice, not a home-surface red; a designed
glass-ui `Tooltip` primitive is PRODUCER material → BH relay 17e0f522 (owner's eye
whether native tooltips are acceptable as-is).

### Row disposition

| sub-item | verdict | basis |
|---|---|---|
| ::selection ink | **CENSUS-GREEN** | accent-live 32% + `--foreground` ink both schemes; no default blue; frame-confirmed |
| cursor grammar | **CENSUS-GREEN** | coherent 10-value vocabulary; correct per-role computed cursor |
| non-macOS scrollbar | **ANNEX-OWNER-ATTEST** | U-F54 platform-conditional appearance; `.scrollbar-thin` defined+tokenized but 0 demo consumers (wiring gap recorded) |
| static `<title>` | **CENSUS-RED** (predicate) | `"Color Picker"` static; no dynamic setter anywhere → owner-eye (trivial dynamic cure OR retire) |
| native-title tooltips | out-of-scope-recorded | 34 source sites, 0 on home; native OS chrome → glass-ui Tooltip = producer/BH relay |

**Verdict: ANNEX-OWNER-ATTEST.** The two decisive perceptual items (selection
ink, cursor grammar) are certified GREEN as fact and retire-to-census. The roster
cannot close all-GREEN: the scrollbar leg needs an owner-attested non-macOS frame
(U-F54; NEVER-FAKE-JUDGE forbids asserting whole-roster GREEN over it) and the
static-title + native-tooltip legs are explicitly owner-eye dispositions per the
row's charter. Nothing dropped: every sub-item carries a named DELTA + owner hand
above.

---

## STATIC POINTERS — RECORDED-ELSEWHERE (zero silent drops)

The excluded-owned set: rows that touch a VISUAL-adjacent surface but are owned by
another wave / the producer. Recorded here (NOT judged live) so a census reader
traces every excluded row to a home. Verdict = RECORDED-ELSEWHERE.

| row | owning wave / lane | one-line rationale |
|---|---|---|
| **static-t39** — T-39 Q14-pressure perf face (LCP 5141 / TBT 5988) | U.W-PERF (LCP) · U-F61 / U.W-CLOSE (TBT) | A perf-budget row, not a VISUAL census surface; eager-WebGL-blob boot blocker owned by the perf/close waves. |
| **static-t20** — T-20 P4 glass-ui Tabs pilling (no gap between pills) | U.W-ADOPT (BH relay 17e0f522) | PRODUCER-DECLINED → owner-escalated → an owner DECISION relayed to glass-ui; no value.js-side cure to build. |
| **static-producer-relay** — GAP-L5/revealBloom (U-F5 blob), PKT-1/O-16-R1 (U-F7 swap confounds), T-52 dock-layer mask honesty (0px-fade shave), P3 ScrollCardHeader whole-header door (U-F9 scrolled), WatercolorDot register + verb instrument (U-F8), the veil material primitive (U-F10) | U.W-ADOPT / BH relay 17e0f522 | The DEMO halves are judged in Lanes A–D; the PRODUCER halves ride the glass-ui 5.0.0 adopt. |
| **static-uf6-oracle** — U-F6 oracle-half: the O-14 proxy-oracle law ("every guard-constant gets a feasibility leg") | U.W-ORACLE (U-F62 split) | VISUAL (Lane C) owns only the ramp BAND; the oracle-law generalization is ORACLE-wave material. |
| **static-ab1** — AB-1 About-KaTeX scope-dead (the boot-scope build seam) | U.W-CANON | Not a VISUAL material row; pairs with T-53, whose material half IS judged (Lane D) — this seam half is CANON's. |
| **static-zd3-admin** — ZD-3 admin never-filed pass (admin-users / -names / -audit / -flagged / -tags + auth/profile flows) + the ZD-3 thrown-error a11y half | U-F56 (U.W-A11Y driven-live) · thrown-error half U-F58 (U.W-A11Y) | Admin surfaces + the thrown-error state a11y are driven live by the A11Y wave, not this perceptual census lane. |
| **static-t5-letterrail** — T-5's SECOND residual: the P5/S-3 letter-rail | U.W-ADOPT (BH relay) | PRODUCER-GATED; distinct from the U-F9-rail active-seat arm (that demo arm IS judged GREEN in Lane A). |

All seven excluded-owned rows homed to a named wave/relay. Combined with the
[zd3-microchrome] per-sub-item record above, the wave-open census surface for
Lane F carries **zero silent drops**.

---

## Summary

| Row | Verdict | Basis |
|---|---|---|
| zd3-microchrome (roster) | **ANNEX-OWNER-ATTEST** | selection ink + cursor grammar cured-GREEN (dispositive); scrollbar leg U-F54 + wiring-gap recorded; static-title RED-on-predicate (owner-eye); native-tooltips producer-relay |
| static pointers (×7) | RECORDED-ELSEWHERE | every excluded-owned row homed to a named wave / BH relay; no silent drops |
