# N — WAVES-2: the re-divined second wave block (N.W10–N.W18, then W8/W9 re-sequenced) — **INDEX**

**Status: RATIFIED 2026-06-15.** The WAVES-2 second block flipped PLANNED→RATIFIED, and the grammar
fold (`EXECUTION-ORCHESTRATION.md §3` / `GRAMMAR-FOLD.md` — `sampleColorRamp` = N.W11.D, the scroll
grammar = N.W11′) was ratified into N's library track. Each wave was then **developed to executable
depth in its own per-wave spec** at `waves/N.W10..N.W18.md` + `N.W11-prime.md` + `N.W8-prime.md` +
`N.W9-prime.md` (every one carries the matching RATIFIED stamp). **This document is now the INDEX
over that wave set** — it points at each per-wave spec and holds the cross-wave records that live
in no single spec (the DAG §2, the BOOKs/closed/refuted ledger §3, the invariant deltas §4, the
coverage map §5, the critic fold §6). The per-lane work that was inline here MOVED into the
per-wave specs; this index does not duplicate it (no legacy beside the replacement).

**Authored**: 2026-06-12, lane S1 of the second N-fleet (lanes2); **ratified + indexed**: 2026-06-15.
**Supersedes**: the dead **N.W6** (PLANNED, zero impl commits, only the dock-first-paint sliver
in `199fd15` — R1 §4) and re-sequences **N.W8/N.W9** AFTER this block.
**Canon**: `audit/user-audit-2026-06-12/LEDGER.md` (U1–U33 + 6 standing directives — OUTRANKS all prior
claims) → the lanes2 corpus (R1–R4 · D1–D8 · U-* · L-* · X-*) → `N.md` → `PROGRESS.md`.
**Zero drops**: §5 is the coverage map — every LEDGER row and every open R3 fold row appears
exactly once.

**Why the re-divination**: W6's death is the proximate cause of the entire user-audit corpus
surviving a "green" tranche (R1 §4–5). The user re-audited the un-executed W6 from the live app;
W6's monolithic "suffusion" charter cannot survive — it decomposes into the per-surface waves
below, with the FUNCTIONAL defects first, the GRAND HIERARCHY as the keystone stage, and the
glass-ui-blocked halves split honestly from the unilateral work.

**Standing mandates binding every wave**: no-legacy (interim shims DIE at the consume — no
parallel forks), idiomatic gestalt (fix the root, not the symptom), KISS (no new shared/ dirs,
no wrapper contrivance), **Fable on every design/synthesis implementation lane** (orchestration
on the core model; opus/sonnet fan-out), chrome-devtools MCP + frontend-design plugin + modern-web
guidance on every visual lane, π paired before/after evidence at every design gate.

---

## §1 — The wave set (the index)

Each wave's full lane table + hard gate lives in its per-wave spec. This index carries one line
and the spec pointer; the cross-wave records follow in §2–§6.

| Wave | Kind | One line | Spec | Cut | Blocked-on-BA? |
|---|---|---|---|---|---|
| **N.W10** | IMPL unilateral | Functional truth: U9 reset, U33 aurora-motion, the save data-loss P0, the kC placebo, **the CSS-cascade substrate kill (U11 root)** + single-mount | `waves/N.W10.md` | — | no |
| **N.W11** | IMPL unilateral (library) | U10 color-SOTA: gamut-map re-anchor + §13.2 oracle + wide-gamut egress (**+ lane D `sampleColorRamp`**) → 0.13.0 | `waves/N.W11.md` | **0.13.0** | no |
| **N.W11.D** | IMPL unilateral (library) | `sampleColorRamp(from,to,n,{space,hueMethod})` — the perceptual ramp fold (VJ.W2), lane D of N.W11; composes the shipped color kernels; un-blocks kf-K.W10 CC-2 densify | `waves/N.W11.md` §lane D · `GRAMMAR-FOLD.md` PART I | **0.13.0** | no |
| **N.W11′** | IMPL unilateral (library) | The scroll-grammar library wave (VJ.W1): the `CSSTimelineOptions` typed extractor + inverse serializer (NEW `parsing/scroll-timeline.ts`); the ONE genuine net-new grammar; un-blocks kf-K.W9 | `waves/N.W11-prime.md` · `GRAMMAR-FOLD.md` PART II | **0.13.0** | no |
| **N.W12** | IMPL unilateral (Fable) | THE GRAND HIERARCHY (D6 keystone): font root, accent axis, dark ladder, layout clamp, depth-grammar laws, ramp + φ tokens | `waves/N.W12.md` | — | gray-token half consumes BA free at pin |
| **N.W13** | IMPL split (Fable) | CONTROLS: sliders/dropdowns/rail/pills/clip + the a11y cluster | `waves/N.W13.md` | — | size-axis, Select bound/rung = BA; interims land now |
| **N.W14** | IMPL split (Fable) | CARDS: PaletteCard first-class, depth-grammar applied, skeletons glassy, empty-state CTAs | `waves/N.W14.md` | — | watercolor-ghost = BA; all else unilateral |
| **N.W15** | IMPL split | PERF: idle-floor, reflows, reactivity, bundles + the U6/U16 dock-morph verify harness | `waves/N.W15.md` | — | dock FLIP A-1, zombie-canvas, card-shrink keyframes = BA |
| **N.W16** | IMPL unilateral (Fable) | PER-PANE: picker hero, gradient+easing, mix, extract, docs + the modern-web carry | `waves/N.W16.md` | — | easing-configurator consume = W18 |
| **N.W17** | IMPL unilateral (Fable) | SHELL + MOTION + POPS: dock scale, 14→3 transition families, view-select moment, celebration, nomenclature | `waves/N.W17.md` | — | spring-clock tokens refine at pin |
| **N.W18** | IMPL cross-repo | Consume-on-their-land: the BA-cut re-pin + adopt sweep, easing-configurator consume, kf/fourier coordination | `waves/N.W18.md` | — | **gated on the BA cut** |
| **N.W8′** | IMPL unilateral | (re-sequenced) Hygiene + reconciliation + **the wire-deploy ceremony** + doc-truth (R4's exact lists) | `waves/N.W8-prime.md` | — | no |
| **N.W9′** | DEV close | (re-sequenced) v1.0.0 + π + FINAL.md; pin discharged by W18 | `waves/N.W9-prime.md` | **v1.0.0** | pin target = the BA cut |

**The grammar fold (ratified into the library track).** VJ.W2 `sampleColorRamp` rides as
**N.W11.D** (a 4th lane of the color-SOTA wave — ~S-effort over the kernels N.W11.A/B/C already
touch); VJ.W1 the scroll-timeline grammar rides as the sibling wave **N.W11′** (different substrate
— `parsing/`). Both ship in **0.13.0**, un-blocking kf-K.W9 (scroll-as-CSS) + K.W10 (compiler CC-2
oklab densify) one tranche behind — a PUBLISHED-consume edge, born-RED downstream, never a `file:`
link or vendored copy. The library track (N.W11 + N.W11.D + N.W11′) is BA-independent and runs in
R2 beside the design body. (Full specs: `GRAMMAR-FOLD.md` PART I/II; `EXECUTION-ORCHESTRATION.md §3`.)

---

## §1.1 — Per-wave spec index

The full per-lane tables and hard gates that were inline in this document now live in the per-wave
specs (developed to executable depth, each RATIFIED). Read the spec for the lane breakdown; the
one-line summaries above and the cross-wave records below (§2–§6) remain canonical here.

| Wave | Spec | What it owns |
|---|---|---|
| **N.W10** — Functional truth + the substrate kill (the gate-opener) | `waves/N.W10.md` | U9 reset · U33 aurora-motion · the save data-loss P0 · the kC placebo · the cascade kill (U11 root) + single-mount · data hygiene |
| **N.W11** — Library color-SOTA (U10) → 0.13.0 | `waves/N.W11.md` | gamut-map re-anchor toward the cusp · the §13.2 binary-search oracle · wide-gamut egress parity · OKLCh display-range reconcile · **lane D `sampleColorRamp`** (the ramp fold) |
| **N.W11′** — The scroll-grammar library wave (VJ.W1) → 0.13.0 | `waves/N.W11-prime.md` | the `CSSTimelineOptions` typed extractor + inverse serializer (`parsing/scroll-timeline.ts`); the round-trip law; born-RED against kf-K.W9 |
| **N.W12** — THE GRAND HIERARCHY (D6) | `waves/N.W12.md` | the font root · the chroma/accent axis · the layout system (container queries) · the depth grammar (laws + `--card-edge` mint) · ramp + φ tokens |
| **N.W13** — CONTROLS | `waves/N.W13.md` | sliders + rail · dropdowns · pills + clip · the a11y cluster (focus rings, tap targets, names/labels) |
| **N.W14** — CARDS + skeletons + empty states | `waves/N.W14.md` | PaletteCard first-class · the depth sweep · glassy skeletons · empty-state CTAs · the dashed-ghost interim |
| **N.W15** — PERF | `waves/N.W15.md` | idle floor + GL hygiene · interaction reflows · reactivity + bundle hygiene · gates + the dock-morph harness (born-RED until BA A-1) |
| **N.W16** — PER-PANE | `waves/N.W16.md` | picker (the hero pane) · gradient + easing · mix (inv-N-9 closes) · extract · docs · the modern-web carry |
| **N.W17** — SHELL + MOTION + POPS | `waves/N.W17.md` | dock scale · motion unification (14→3 families) · the view-select moment · icon energy + celebration · nomenclature + shell robustness |
| **N.W18** — Cross-repo consume-on-their-land | `waves/N.W18.md` | the BA-cut consume sweep + the inv-N-10 abrogation sweep · easing-configurator consume · keyframes · fourier (**gated on the BA cut**) |
| **N.W8′** — Hygiene + reconciliation + the deploy ceremony | `waves/N.W8-prime.md` | the wire-deploy ceremony · master-merge + CI green · kill-list · doc-truth (the R4 exact lists) |
| **N.W9′** — v1.0.0 close + π | `waves/N.W9-prime.md` | the registry pin (discharged by W18) · the π paired before/after lane · re-confirm L's close · **v1.0.0** publish + FINAL.md |

---

## §2 — DAG

```
W10 (functional + substrate)  ──┬─→ W12 (grand hierarchy; A/B first) ──┬─→ W13 (controls)
W11 (library U10)  ∥ W10        │                                      ├─→ W14 (cards)
                                ├─→ W15 (perf; harness born-RED)       ├─→ W16 (per-pane)
                                │                                      └─→ W17 (shell+motion+pops)
W18 (consume-at-pin) ← the BA cut (the ONE cross-repo wait; asks already filed)
W8′ ← {W10..W17 green}   ·   W9′ ← {W8′, W18}
```

W10 is the critical path for everything desktop-visible (the cascade kill + single mount).
W11 is independent. W12's A/B lanes precede its own C/D/E and all of W13/W14/W16/W17 (fonts +
accent are prerequisites — D6 §0). W15 runs beside the design waves after W10. W18 may lag on
the BA cut without blocking W8′; W9′ waits for both.

---

## §3 — BOOKs · closed · refuted (carried verbatim, zero drops)

- **BOOK-with-trigger**: CH-10 kf precept-pin (maintainer signal) · CH-13 fourier quiescence
  (fourier-owned) · X5 rollback runbook (folded W8′) · X14 SwiftShader harness residual
  (renderer artifact; the playwright pin is the mitigation) · the BA-cut pin (W18/W9′).
- **CLOSED this fleet**: VJ-F1 verify (the path sampler SHIPPED — `src/transform/path.ts:478,512`;
  X-KF-ITEMS §2) · VJ-1 `cssLinearFromString` (satisfied-by-composition).
- **KILLED at the S2 fold**: the R3 §1.5 glass-ui-AZ carry "notify glass-ui (easing-stability ⇐
  `proof:motion-suite`)" (`R3-fold-ledger-v2.md:125` — the notify its own §3 then omitted; K2-D2).
  The grep-`proof:*` idiom is RETIRED constellation-wide (the standing feedback record); the
  substance is recorded here instead: **the W7.A easing additions were additive — no glass-ui
  motion-suite stability impact.** Nothing is owed the letter.
- **REFUTED**: X15 the software-GL-probe aurora suspect (U-AURORA §1 — webgl mode on real GPU,
  44 fps, advancing uTime; the root is the motion-fields table) · the LEDGER's U9
  "DOES NOT WORK" overstatement (the chain fires; the real defects are W10.A's triad) ·
  U13 as a "regression-restore" (nothing to revert — the remembered ellipse was the deleted blob
  orbit; it is a re-introduction) · `chromaCeiling` as the U3 pallor root (the seed is near-white).
- **FOLDED into N's library track (was "recorded for the post-N successor"; RATIFIED 2026-06-15)**:
  VJ.W1 scroll-timeline grammar → **N.W11′** · VJ.W2 `sampleColorRamp` → **N.W11.D**, both shipping
  in **0.13.0** (the §3 dispatch-gate fallback — a post-N Tranche O — was NOT elected; `N.md §3`/§4.1,
  `EXECUTION-ORCHESTRATION.md §3`, `GRAMMAR-FOLD.md`). The capability is born-RED-absent at 0.12.0
  and lights on the 0.13.0 publish, un-blocking kf-K.W9/K.W10 one tranche behind.

---

## §4 — Invariant deltas

- **inv-N-9** (PRM-complete): VIOLATED at HEAD (the mix-canvas RAF shipped un-gated in 0.12.0 —
  R1/R4); **closes at W16.C** (the composable-boundary gate).
- **inv-N-7** (zero phantom classes): **VIOLATED at HEAD** — the demo's bare `watercolor-swatch`
  (`MixSourceSelector.vue:148`) matches NO reachable rule: glass-ui's only definitions are
  SFC-scoped to `WatercolorDot` (`WatercolorDot.vue:140`, emitted as
  `watercolor-swatch[data-v-cb0117af]` in the dist CSS — unreachable from a bare consumer class);
  the demo defines none. One live phantom (the `stagger-children` claim in U-cards §2 is WRONG —
  `animations.css:40` defines it; W5.E minted it). **Closes at W14.E**; `PROGRESS.md`'s W5-row
  "zero phantom classes ✓" is amended stale-at-HEAD.
- **inv-N-6** (registry consumption): pin target AMENDED 3.13.0 → **the BA cut** (X-GU §5.2);
  discharged at W18.A, gated only on the cut.
- **inv-N-11 (new) — cascade-truth**: no foreign stylesheet may beat the demo's layered
  utilities; the glass-ui import rides `layer(glass-ui)` and the boot-smoke asserts COMPUTED
  desktop layout (W10.D). The emission probe alone is insufficient — proven twice.
- **inv-N-12 (new) — perf floor**: single-mount per logical pane; no offscreen live WebGL
  context; no continuously-running layout-property animation (CLS ≤ 0.1); no per-tick router
  churn (W15.D wires the asserts).

---

## §5 — The coverage map (finding → wave; EXACTLY ONCE; parentheses = the blocked half's landing site)

### The user LEDGER (U1–U33; U30 split a/b → 34 rows)

| ID | Wave | ID | Wave | ID | Wave |
|---|---|---|---|---|---|
| U1 | **W12** A/B (gray tokens consume → W18) | U13 | **W13.A** | U24 | **W14.A** |
| U2 | **W16.A** | U14 | **W13.A** | U25 | **W16.B** |
| U3 | **W16.A** demo halves (satellites `uSatColor[]` → W18.A) | U15 | **W13.A** (consumption; primitive exists) | U26 | **W14.B** (border-token root = W12.B) |
| U4 | **W16.E** | U16 | **W15** harness (producer fix verify → W18.A) | U27 | **W18.B** (interim hierarchy = W16.B) |
| U5 | **W16.E** | U17 | **W14.B** | U28 | **W13.A** interim (real fix → W18.A) |
| U6 | **W15** harness (producer fix verify → W18.A) | U18 | **W14.E** interim (ghost variant → W18.A) | U29 | **W13.C** |
| U7 | **W13.B** demo half (font-rung prop → W18.A) | U19 | **W14.B** | U30a | **W13.B** |
| U8 | **W13.B** interim cap (first-class bound → W18.A) | U20 | **W14.C** skeletons (spectrum-slider half = W13.A) | U30b | **W16.A** |
| U9 | **W10.A** | U21 | **W13.C** | U31 | **W16.A** (card-lock law codified = W12.E) |
| U10 | **W11** | U22 | **W14.E** (→ W18.A) | U32 | **W12.C** layout (dock half = W17.A; sliders = W13.A) |
| U11 | **W10.D** | U23 | **W13.B** verify (spring-clock → W18.A) | U33 | **W10.B** |
| U12 | **W17.B** motion + **W17.E** nomenclature (one row, one wave-pair) | | | | |

### The R3 fold-ledger survivors (every OPEN row)

| R3 row | Wave | R3 row | Wave |
|---|---|---|---|
| N-P0-1 re-verify | W12 gate | X4 openapi drift decision | W8′ |
| N-P0-2 wire half · N-P0-3 · N-P0-5 | W8′ | X5 rollback runbook | W8′ (BOOK) |
| CH-14a / A5 / X1 / X2 / X3 | W8′ | X6 dual-mount | W10.D |
| CH-2 (re-opened by U33) | via U33 → W10.B | X8 pane-router residual | W17.E |
| CH-1/CH-3 (re-opened by U3/U18/U22) | via those rows | X9 tags warn | W10.E |
| CH-4..8 expanded primitive asks | W18.A (filed) | X10 CI full-build | W8′ |
| CH-10 · CH-13 | BOOK (§3) | X12 / K-DISP | W16.F |
| K-DOCK (re-opened by U6/U16) | via U6/U16 → W15/W18 | X13 DESIGN.md refresh | W8′ |
| K-W3DIFF | W16.F | X14 SwiftShader | BOOK (§3) |
| K-PALID | W16.F | X15 aurora-probe suspect | REFUTED (§3) |
| K-INV5 VITE_API_URL | W10.C | kill-list (useCardMenu et al.) | W8′ |
| K-W5RT router-5 | W16.F | `$OUT` + staged deletions + w6-debris | W8′ |
| T4 (re-opened by U2/U14) | via U2/U14 | glass-ui cohort rows (uSatColor[], AuroraConfig, C-DTS, devDep, retired-classes manifest, the cut) | W18.A |
| T10/T11 (re-opened by U3) | via U3 → W16.A | AZ-fleet adopt (Button icon-sm / Select size / clampLabel / Tooltip mono) | W18.A |
| T12 (re-opened by U6/U16) | via U6/U16 | kf notify + MCI-5 flip slate | W18.C (notify DISCHARGED) |
| T16 mix-RAF PRM (inv-N-9) | W16.C | fourier matrix + web bump | W18.D |
| T19 population/dominance | W16.D | VJ-F1 verify | CLOSED (§3) |
| T20 dup-shell collapse | W16.D | W9-bound: pin + peers + phantom devDep | W18.A + W9′ |
| T21 EditDrawer delete | W16.A | | |

### Net-new lanes2-born defects (mapped for completeness)

| Finding | Wave | Finding | Wave |
|---|---|---|---|
| D7 §3.4 save data-loss P0 | W10.C | D8-2 focus rings P0 | W13.D |
| D3 §4a kC placebo | W10.C | D8-3/4/5/6/7 a11y cluster | W13.D / W12.B / W16.A·E (3b = W17.E; 3c = W12.C) |
| D8-1 unlayered-dist cascade P0 | W10.D | D8-8 container queries | W12.C |
| L-COLOR §3 secondaries (egress / oklch range / inputColor) | W11.C / W11.D / W10.E | D8-9 view transitions · D8-11 (=T16) | W17.B / W16.C |
| L-PERF1/2/3 ledgers | W10.D + W15 (asks → W18) | R4-1 (=T16) · R4-2 LoC breach · R4-3 dead comments | W16.C / W13.A / W8′ |
| RM-1..8 + CM-1..7 doc drift | W8′ | D2-S2 ghost CTA (cascade class) | W10.D (design: W16.C) |

**Attestation**: all 34 LEDGER rows, all R3 OPEN/BOOK/VERIFY/ADVISORY rows, and every
lanes2-born defect above carry exactly one primary wave. Zero silent drops.
**Re-verified at the S2 critic fold (2026-06-12)**: the K2 walk's two genuine drops (thumb
live-color → W13.A; the AZ-notify carry → KILLED, §3) are now homed; the K3 coverage hole
(~10 glass-ui-blocked rows with no filed ask) is closed by the letter's A′/F addendum —
every "Blocked-on-BA" row in W13/W14/W15/W18 now anchors on a NAMED letter register.
The attestation is literally true.

---

## §6 — End-matter: the critic fold (lane S2, 2026-06-12)

Critics K1 (adversarial anchors), K2 (coverage), K3 (cross-repo coherence) were folded in
full. The disposition ledger — every confirmed finding fixed in place, every overrule
recorded with tree evidence:

**Folded (confirmed against the tree/corpus, fixed above + in `N.md`/`PROGRESS.md`/the
glass-ui letter):**
- **K1-F1** = K2-corroborated: 12 demo-authored transition families, not 14; `pop`/`fade-slide`
  are glass-ui-shipped → W17.B re-arithmetic (author `pane` only) + the gate grep scoped to
  demo CSS. Verified: grep over `demo/**` = 12 families; `dist/styles/transitions.css` ships 8.
- **K1-F2**: inv-N-7 VIOLATED at HEAD (§4 entry added; PROGRESS W5 row amended). Verified:
  the dist emits only `watercolor-swatch[data-v-cb0117af]`. K1's counter-note also verified:
  `stagger-children` IS defined (`animations.css:40-49`).
- **K1-F3**: the U21 dual diagnosis recorded in W13.C — D7-9's live measurement governs;
  A-5 demoted to verify-after-`pb-2`.
- **K1-F4**: PROGRESS `:23/:55` "still uncut" corrected (3.13.0 IS cut; pin = the BA cut 4.0.0).
- **K1-F5**: the W10.B temporal-gate thresholds marked CALIBRATE-AT-IMPLEMENTATION (S1-authored;
  U-AURORA measured only the `breathing` dead baseline) + D5-8/D6 §5.1 cited for the companions.
- **K1-F6** = K2 §4-1: "8 directives" → 6 (LEDGER `:90-97` counted: 6 bullets).
- **K1-F7** = K2 §4-3: the §5 D8-3 cell now names 3b → W17.E and 3c → W12.C.
- **K1-F8** (partial — see overrules): `Katex.vue:20`→`:21` ✓ fixed; `keys.ts:26-28`→`:24-28`
  ✓ fixed (colorEnergy/zones at :24-25).
- **K2-D1**: thumb live-color (the W6.C carry, D1 §5) → W13.A clause + gate token. K2-D2: the
  AZ-notify carry → KILLED with rationale (§3). K2-X1: W12.C re-points (not re-lands) the W10.D
  boot-smoke gate. K2-X2/X3: U26/U31 split-parentheticals added. K2 §4-2: the U20b token now in
  W13.A. K2 §4-4: the four AZ adopts enumerated in W18.A.
- **K3-D1/D2 [the P0]**: the unfiled producer cluster (LP2-2 · LP3-1b · LP3-3a · LP2-4/5 ·
  LP1-DPR · D5-1 glyph) + the N.md §8 carries (AuroraConfig · C-DTS · devDep/peer range ·
  retired-classes manifest) are now **FILED** — Register A′ + Register F authored into the
  glass-ui letter at the S2 fold, with K3's fold-by-batch deadline table. The W18 preamble and
  W18.A row now cite the registers by id; the DAG's "asks already filed" is true again.
- **K3-D3**: BA GREENLIT-and-executing stamped into the W18 preamble + the letter.
- **K3-D4**: the letter's "`dist/components/` does not exist" corrected to the un-falsifiable
  mechanism (`.vue.d.ts`-only tree; compiled JS flat at `dist/*.js`, unscanned). Verified live:
  the directory exists, declarations only.
- **K3-D5**: inv-N-6's in-place echoes amended in `N.md` §3/§6/§9 (the schedule-row-only
  amendment was insufficient — a §6-alone reader would pin 3.13.0).
- **K3-D6.2**: the letter's dead `N.W6.C` cite re-pointed to W16.B-interim → W18.B-consume.
  K3-D6.6: the letter's "30 BA waves" → 29.

**Overruled (critic wrong; evidence):**
- **K1-F8/SpectrumCanvas**: K1 claims the `getBoundingClientRect` read sits at `:108`;
  tree truth (`sed -n '105,112p'`): `:108` is the `spectrumRef` guard, the rect read is at
  **`:109`** — WAVES-2's original anchor was correct and stands. (L-PERF2's LP2-1 row agrees: `:109`.)
- **K1-F8/style.css**: K1 claims the font tokens sit at `:63-65`; tree truth: `@theme {` opens
  at `:63`, the three `--font-*` tokens sit at **`:64-66`** — WAVES-2's anchor was correct and stands.
- **K1-F2's literal mechanism, precision-corrected (substance upheld)**: "grep = 0 definitions"
  is imprecise — glass-ui DOES define `.watercolor-swatch` (SFC-scoped,
  `WatercolorDot.vue:140-187`); the violation is that the scoped emission
  (`[data-v-cb0117af]`) is unreachable from the demo's bare class. The §4 entry carries the
  precise mechanism.

**Recorded, no doc edit owed (lane-report-internal staleness — reports are evidence, not plans):**
- X-GU.md's header "pre-greenlight, NO impl" and §5.1's "collapse to ONE publish" judgment are
  STALE/SUPERSEDED — BA is greenlit-executing, and the letter (correctly, on U-DROPDOWN's live
  root) splits A-2 (the Select bound, P0-now) from C-3 (the easing-configurator publish): a
  synthesis reader must NOT de-prioritize A-2 as "ships inside C-3." X-GU-ITEMS `:32/:46` and
  X-KF-ITEMS `:93/:126` carry the same dead-`dist/components`/`N.W6.C` cites — superseded by
  the letter's corrected text. K3-D6.3 (provenance "resolved at 3.13.0" vs `file:` — loose,
  not wrong) and K3-D6.5 (X-KF-ITEMS cite drift, cosmetic) carry no action.
