# R2-PROMPTS — the full user-prompt recap + coverage matrix

**Lane**: R2-PROMPTS (Tranche R, pass 1). **Authored**: 2026-07-02.
**Charge**: recapitulate EVERY user prompt/request across the value.js tranche corpus (A..Q) and
produce a coverage matrix — ADDRESSED (with evidence) / PLANNED-NOT-IMPLEMENTED (where planned) /
DROPPED (no home). Verify each U1–U33 ledger item against the LIVE TREE, not the wave specs. Fold
the standing directives and the newest 2026-07-02 session asks.

**Method**: read every `docs/tranches/*/[A-Z]-PROMPTS.md` (B..H — the only lettered prompt files;
I..Q carry no `*-PROMPTS.md`, their prompt-records live in charters + kf dispatch files), the
`N/audit/user-audit-2026-06-12/LEDGER.md` U1–U33 canon, `N/N.md`, `O/O.md`, `O/PROGRESS.md`,
`N/PROGRESS.md`, `keyframes.js/docs/tranches/{P,Q}/KF-TO-VALUEJS-{P,Q}.md`, and spot-checks of the
live `demo/`, `src/`, `package.json`, and git log.

---

## §0 — The load-bearing state facts (verified live, 2026-07-02)

| Fact | Evidence |
|---|---|
| value.js at **1.2.0**; O library arc CLOSED at 1.0.0 (2026-06-19); P=1.1.0; Q=1.1.1/1.2.0 | `package.json` version 1.2.0; git log `e80b359`/`fd3c7ce`/`23d1a91`/`dd9beb5` |
| **7 subpath exports live** (`./color …/quantize`), `./color` parse-that-ZERO | `package.json` exports (8 keys); `O/PROGRESS.md:21-28` |
| N **first block landed** (W1–W5, W7); N.W6 **died un-implemented**; N.W8/W9 **planned** | `N/PROGRESS.md` wave table; git `d9c3b9f e4b5f60 fe3c00c e62567a e32111c 9cd815e 3f4f0ed` |
| N **second block (W10–W18 + W8'/W9') RATIFIED 2026-06-15, NEVER IMPLEMENTED** — zero impl commits | git log has ONLY docs commits (`3843a08 eef5d1b 08ed824 7efabc9`) + the 0.13.0 library fold (`9fce504`); `O/PROGRESS.md:9`; constellation-state note |
| N library-track (W11/W11.D/W11') **shipped → 0.13.0** | git `9fce504`; `O/PROGRESS.md:8` |
| N.W5 forks **actually deleted** (goo-blob, watercolor-dot, webgl-utils absent) | `ls` → "No such file or directory" ×3; git `e32111c` |
| glass-ui still `file:../glass-ui` (NOT the registry BA-cut pin N.W9' gates on) | `package.json` → `"@mkbabb/glass-ui": "file:../glass-ui"` |
| `AuroraPane.vue` still present (rebuilt at N.W5.B, NOT deleted) | `demo/@/components/custom/panes/AuroraPane.vue` exists |
| O.W7-demo (Parse-Lab pane) **NOT shipped** (demo-only, non-blocking) | `O/PROGRESS.md:29` |

**The central coverage truth**: the LIBRARY track is thoroughly ADDRESSED (O + P + Q shipped every
grammar/perf/subpath/color-SOTA ask). The **DEMO/DESIGN track is the great open debt** — the entire
2026-06-12 user audit (U1–U33) was re-divined into N.W10–N.W18, RATIFIED, and then **never
executed**. The demo the user critiqued on 2026-06-12 is, ~3 weeks later, still substantially that
demo (modulo the N.W5 blob/aurora consume + N.W1 boot-fix that DID land).

---

## §1 — The canonical prompt corpus (chronological)

The prompt chain, reconstructed from B..H PROMPTS files + charters. The **6-agent-audit invocation**
(("DEEPLY audit with 6 agents… recap ALL prompts… NO legacy… fold deferrals… tranche development
only")) is the user's established *canonical opening pattern* — issued verbatim at B-turn-4, D-open,
E-open, F-open, G-open, H-open, and (per N.md §10 authority) at N-open. It recurs; it is one
standing directive, not N distinct asks.

| # | Prompt (source) | Essence |
|---|---|---|
| P0 | Pre-A modernization | 10-phase (Sass→CSS, gl-matrix→inline, TS strict, radix→reka). CLOSED at A.W0 (`E-PROMPTS §4`). |
| P1 | A turn-1 (`B-PROMPTS §1`) | The 13-mandate frontend + design audit (styling resilience, 4-state buttons, modals/dropdowns, dup-components, golden-ratio hierarchy, `@apply`, root-restyle, glass-ui-for-all, flatten, gaps in value.js+glass-ui, Playwright user+admin, blob/aurora idiom). |
| P2 | A turn-1 amend | "panels broken largely; dock broken." |
| P3 | A turn-2 | "de-dup from Q; harden with 6 agents; recap plan first." |
| P4 | A turn-3 | "continue in totality; orchestrate as team lead; NO quick solutions." |
| P5 | B turn-4 = **the 6-agent-audit invocation** | (canonical opening; see above) + "dock sizing items seem contrived/overfit; simplify layout structure; hung on e2e." |
| P6 | D-open (`D-PROMPTS §1`) | 6-agent audit + **aurora derive-from-color** + **blob extirpation to glass-ui** + api legacy-excision (fail-explicit) + no-god-modules + component decomposition + idiomatic-Tailwind + design-idiom catalog. |
| P7 | D library-perf round (`E-PROMPTS §4`) | "6 agents + 6 challenge agents; research-backed; KISS" (→ 12 REJECTED claims). |
| P8 | D reactivity round | "instant reactivity; commit-history excavation; version bump." |
| P9 | E-open | 6-agent audit + "analyze the speedtest, glass-ui, fourier-analysis work." |
| P10 | F-seed | "No deferrals. New tranche for the above." |
| P11 | F-open / G-open / H-open | the 6-agent-audit invocation, each re-issued verbatim. |
| P12 | G-open add | "Relay all carry-forward items to me for ratification" (G1). |
| P13 | N-open (`N/N.md §10`) | the 6-agent-audit invocation (as a 32+5-lane deep audit) + "Begin and continue… IN TOTALITY." |
| **P14** | **2026-06-12 user audit (`LEDGER.md`)** | **U1–U33** — the first-person live demo critique. OUTRANKS all priors. + 5 standing directives (fold-zero-drop, perf+hierarchy first-class, author sibling tranche-items, Fable for design, chrome-devtools/modern-web/frontend-design MCP). |
| P15 | O-open (`O/O.md`) | the Constellation Lib-Perf + Grammar campaign (D1–D11): subpath split, 2026+ grammar, bidirectional idempotence, SOTA perf. |
| P16 | 2026-06-20 kf→VJ P dispatch | VJ-L3 `parseCSSSubValue`, VJ-P1 `color2Into`, VJ-P3 `:any`→string (`P/KF-TO-VALUEJS-P.md`). |
| P17 | kf→VJ Q dispatch | VJ-Q1 `contrast-color()` + VJ-Q2…Q9 perf/grammar/provenance (`Q/KF-TO-VALUEJS-Q.md`). |
| **P18** | **2026-07-02 (this session)** | challenge/refine the most recent tranche set; audit+uplift fourier tranches & db; the value.js-palette ↔ fourier-viz CRUD union; align to glass-ui BG/BH 5.0.0; relay gaps to the active glass-ui agent. |

---

## §2 — Coverage matrix: the A..H mandate corpus

Status legend: **A** = ADDRESSED (evidence), **PNI** = PLANNED-NOT-IMPLEMENTED (destination), **D** = DROPPED.

| Mandate (P#) | Status | Evidence / destination |
|---|---|---|
| P0 modernization | **A** | A.W0; `MEMORY.md` "Migration Complete". |
| P1.1 styling resilience/idiomatic Tailwind | **A** (library/api eras) / **PNI** (demo design) | api+src disciplined through L; the *demo* design-quality half is U1–U33 → N.W10–W18 (unimplemented). |
| P1.2 golden-ratio font/card hierarchy | **PNI** | THE GRAND HIERARCHY = **N.W12** (`waves/N.W12.md`), RATIFIED, not built. Recurs as U5/U31/U32. |
| P1.3 four-state buttons | **A** (spec) / **PNI** (full sweep) | glass-ui variants; the demo audit U-items (U29 hover) sit in N.W13. |
| P1.4 modals/dropdowns/popups | **PNI** | U7/U8/U23/U30a → **N.W13** (CONTROLS). Not built. |
| P1.5 duplicated-components consistency | **A** (partial) | H.W3 god-module decomp; ExtractPane↔ImagePaletteExtractor dedup was N.W6.C (died) → N.W16. |
| P1.6 abrogate spreadsheet lists | **PNI** | U2 "not strictly columnar" → N.W13/N.W16. |
| P1.7 `@apply` colocation | **A** | D design-idiom catalog; `demo/@/styles/`. |
| P1.8 root-level restyle | **A** (invariant) | A4/inv — glass-ui-first, standing. |
| P1.9 glass-ui-for-all | **A** (ongoing) | N.W5 consume (forks deleted); remaining sliders/select = N.W13. |
| P1.10 flatten complex components | **A** | H.W3, D component decomposition. |
| P1.11 skip-duplicates | **A** | dedup discipline in every close. |
| P1.12 gaps in value.js + glass-ui | **A** (standing) | the cohort-ask ledgers; N §8; the BA `VALUEJS-N2-ASKS`. |
| P1.13 Playwright user + admin flows | **A** | 5-project smoke suite (42 tests); e2e 37/37 at `199fd15`. |
| P2 panels/dock broken | **A** | A/B dock rework; N.W1 boot-fix + dock-boot-expanded (`199fd15`). |
| P3/P4 orchestration/totality | **A** (posture) | every tranche ran as orchestrated fleets. |
| P5 dock-contrived/simplify-layout/e2e | **A** | B abrogated the dock calc-chain; `usePaneRouter` SOT; e2e un-hung. |
| P6 aurora derive-from-color | **A** | **N.W5.B** — `deriveAurora` wired picker→atmosphere, AuroraPane rebuilt (`e32111c`). *Caveat*: aurora-MOTION (U33) was re-split to N.W10 → NOT built. |
| P6 blob extirpation | **A** | **N.W5.A** — 1270-LoC fork deleted, glass-ui `goo-blob` consumed, live-palette `paletteStops` (`e32111c`); forks verified absent. |
| P6 api legacy-excision/fail-explicit | **A** | Tranche L (`api/src` boundary closure); N.W3 CRUD right-sizing. |
| P6 no-god-modules / decomposition | **A** | H.W3; L inv (≤350 LoC); demo ≤400 LoC. |
| P7 library-perf research | **A** | D `D-LIB-OPTIMIZATION-SYNTHESIS` (12 REJECTED); O.W3/O.W6 SOTA perf shipped. |
| P8 instant reactivity | **A** | D reactivity audits + microbench gate; v0.6.0. |
| P9 analyze speedtest/glass-ui/fourier | **A** | E-AUDIT-4 cross-repo state. |
| P10 no-deferrals | **A** (invariant) | F1; every close carries a fold-ledger. |
| P12 relay-for-ratification | **A** (invariant) | G1; N ratified 2026-06-11. |

---

## §3 — The U1–U33 ledger (P14) checked against the LIVE TREE

The 2026-06-12 audit was re-divined into N.W10–N.W18 (`WAVES-2.md`), **RATIFIED 2026-06-15**, and
**NEVER IMPLEMENTED**. Therefore all items whose sole home is N.W10/W12–W18 are **PNI** unless the
N.W5 first-block consume (which DID land) or a library wave already discharged them. Verified per
item below.

| U | Finding (condensed) | Assigned wave | Live status | Verdict |
|---|---|---|---|---|
| U1 | App gray/dark; "fonts ALL wrong" | N.W12 (font root) | not built | **PNI** → N.W12 |
| U2 | Color-space numbers not strictly columnar | N.W13/W16 | not built | **PNI** |
| U3 | Blob awful; too white; needs orbiting satellites derived from color | N.W5.A + cohort | **partial-A**: fork gone, glass-ui blob + live paletteStops landed (`e32111c`); satellite-color `uSatColor[]` = glass-ui shader ask (still open) | **A (consume)** / **PNI (uSatColor expressivity)** |
| U4 | No spacing between definition & about-color-space | N.W16 (docs φ) | not built | **PNI** |
| U5 | Docs padding inconsistent; golden-ratio ladder | N.W16 | not built | **PNI** |
| U6 | Dock transitions far too slow/janky | N.W15 (dock-morph verify) | not built | **PNI** |
| U7 | Dropdown items = same scaled font as trigger | N.W13 | not built | **PNI** |
| U8 | Dropdowns must self-bound + scroll (glass-ui first-class) | N.W13 + glass-ui | not built (glass-ui ask) | **PNI** |
| U9 | **Resetting current color DOES NOT WORK** | N.W10 (functional truth) | `resetToDefaults` exists (`useAppColorModel.ts:43`) but N.W10 (the fix + cascade-kill) never ran; bug presumed live | **PNI** (functional P0 still open) |
| U10 | Color conversion "quantization" awful (LAB→RGB) — highest severity | **N.W11 color-SOTA** | **A** — gamut-map re-anchor + wide-gamut egress + oracle shipped → **0.13.0** (`9fce504`); further sharpened O.W3/O.W5, Q color asks | **ADDRESSED** (the one U-item the library track fully closed) |
| U11 | Desktop missing 2nd right-most pane | N.W10.D (cascade kill) + N.W2.B | N.W2.B `@source` fix landed (`fc23c8e`) but the true root (unlayered glass-ui dist CSS cascade, D8-1) = N.W10.D, not built | **PNI** (root unaddressed) |
| U12 | Pane/card transitions not smooth; standardize nomenclature | N.W17 | not built | **PNI** |
| U13 | Component section lost its hairline ellipse card | N.W14 | not built | **PNI** |
| U14 | Channel letters must center with sliders | N.W13 | not built | **PNI** |
| U15 | Sliders FIRST-CLASS in glass-ui | N.W13 + glass-ui | not built | **PNI** |
| U16 | Dock not sized properly between transitions | N.W15 | not built | **PNI** |
| U17 | Cards not rounded; shadow-fighting; glass cards w/ cartoon shadows | N.W14 | not built | **PNI** |
| U18 | Dashed outline = ghost watercolor-dot variant | N.W14 + glass-ui | not built | **PNI** |
| U19 | Components not rounded per design language | N.W14 | not built | **PNI** |
| U20 | Skeletons too black; want glassy | N.W14 | not built | **PNI** |
| U21 | Pills not centered | N.W13 | not built | **PNI** |
| U22 | "Not a proper watercolor ghost" | N.W14 + glass-ui | fork extirpated (N.W5.C) but the ghost/refinement = N.W14 | **PNI** |
| U23 | Dropdown open animation jerks | N.W13 | not built | **PNI** |
| U24 | Shadow too extreme; PaletteCard → first-class component | N.W14 | not built | **PNI** |
| U25 | Easing area needs design hierarchy | N.W16 | not built | **PNI** |
| U26 | Black hairline wrong (should be glassy) | N.W14 | not built | **PNI** |
| U27 | Easing → first-class easing selector, abstracted to glass-ui | N.W18 (easing-configurator consume) + glass-ui + keyframes | not built (cross-repo) | **PNI** |
| U28 | Slider too thin | N.W13 + glass-ui | not built | **PNI** |
| U29 | Clipped items need hover state | N.W13 | not built | **PNI** |
| U30a | Color-space dropdown more audacious | N.W13 | not built | **PNI** |
| U30b | Blob bigger; absolute top-right of picker card | N.W5/N.W16 | blob placement partially in N.W5; audacious-place = N.W16 | **PNI** |
| U31 | Numbers larger/hero/fluid but card must NOT resize | N.W12/W13 | not built | **PNI** |
| U32 | Layouts overly contrived; two cards side-by-side, clamped | N.W12/W17 | not built | **PNI** |
| U33 | **Background aurora completely broken: no motion, no shade variation** | N.W5.B (derive) + N.W10 (motion) | derive wired (`e32111c`) + renderMode('auto')→CSS-substrate remediation (`199fd15`); the MOTION fix (N.W10) never ran | **partial-A (derive)** / **PNI (motion — the actual complaint)** |

**U-ledger tally**: 33 items. **ADDRESSED (fully): 1** (U10). **Partial-A (consume landed, design/expressivity residual PNI): 3** (U3, U22, U33). **PNI: 29**. **Dropped: 0** — every item HAS a named home (N.W10–W18), it simply never executed. This is the single largest coverage gap in the corpus: a fully-planned, fully-ratified, zero-drop design body that stalled at the implementation gate while the library track raced ahead through O/P/Q.

---

## §4 — N.md charter asks + O.md charter

| Charter ask | Status | Evidence |
|---|---|---|
| N boot-truth (typecheck 0, boot-smoke, e2e) | **A** | N.W1 `d9c3b9f`; e2e 37/37 `199fd15`; inv-N-1. |
| N WithId transposition (26 casts→0) | **A** | N.W2.A `e4b5f60`. |
| N one color-resolution path + parseCSSColor typing | **A** | N.W2.C `cfb206c` (11+2 casts deleted, inv-N-3). |
| N CRUD right-sizing + contract honesty | **A** | N.W3 `fe3c00c` (txns 18→14, indexes 26→22, urn:contract:*, 214 tests). |
| N deploy-truth (rs0, deploy-hook, /health) | **A (artifacts)** / **PNI (wire)** | N.W4 `e62567a`+`b0cb867`; the actual prod wire-deploy ceremony = N.W8' (planned, not run). |
| N design-system consummation (blob/aurora/watercolor) | **A** | N.W5 `e32111c`+`ee458e5`; forks deleted (inv-N-4). |
| N library asks (kf next-slice) → 0.12.0 | **A** | N.W7 `9cd815e`+`0deca84`+`ed0dd00`+`3f4f0ed`. |
| N color-SOTA + sampleColorRamp + scroll-grammar → 0.13.0 | **A** | N.W11/W11.D/W11' `9fce504`. |
| N design-language suffusion (Fable) | **PNI** | N.W6 died; re-divined N.W10–W18, never run. |
| N v1.0.0 close + registry pin (BA cut) | **partial** | v1.0.0 SHIPPED but via **O.W6 library route** (`dd9beb5`), NOT the N.W9' demo-close; glass-ui still `file:` (registry BA-cut pin unmet). |
| **O**: two P0 crashes + linear() spacing | **A** | O.W0 → 0.13.1. |
| **O**: subpath split + exports map | **A** | O.W1/W2 → 0.14.0; 7 subpaths live. |
| **O**: zero-alloc color-math | **A** | O.W3 → 0.15.0 (104→84 allocs). |
| **O**: 2026+ grammar (at-rule/nesting/if/@function/contrast-color/scroll-timeline) | **A** | O.W4/W4b → 0.15.0. |
| **O**: semantic-idempotence + spring() | **A** | O.W5 → 0.16.0 (inv-O-2). |
| **O**: SOTA perf hybrid | **A** | O.W6 → 1.0.0. |
| **O.W7-demo**: Parse-Lab pane | **PNI** | demo-only; `proof:parse-lab-mount` still born-RED (`O/PROGRESS.md:59`). |

---

## §5 — Library dispatch asks (P16 / P17 — kf→VJ P & Q)

| ASK | Status | Evidence |
|---|---|---|
| VJ-L3 `parseCSSSubValue` | **A** | P → 1.1.0 (`23d1a91`). |
| VJ-P1 `color2Into` gamut zero-alloc | **A** | P → 1.1.0 (`23d1a91`). |
| VJ-P3 `:any`→string seam | **A** | P → 1.1.0. |
| VJ-L1 `flatLeaf` provenance | **PNI (demoted-to-spike)** | P demoted; re-open on measured need (`KF-TO-VALUEJS-P.md`). |
| VJ-P2 typed Float64 channel view | **DROPPED** | falsified premises (`KF-TO-VALUEJS-P.md` header). |
| VJ-Q1 `contrast-color()` | **A** | Q → 1.1.1 (`fd3c7ce`). |
| VJ-Q2…Q9 perf/grammar/provenance | **A** | Q → 1.2.0 (`e80b359`). |

The dispatch track is clean: every surviving ask ADDRESSED; the two non-landed (VJ-L1, VJ-P2) are
explicitly, honestly dispositioned (spike / dropped-with-rationale), NOT silent drops.

---

## §6 — The standing directives (fold into R)

These bind every tranche and MUST re-bind R. Status = how well the CORPUS honors them.

| Directive | Corpus status | R-relevance |
|---|---|---|
| Fold every deferral, zero-drop | **A (bookkeeping)** / **at-risk (execution)** | The U1–U33 fold is *documented* zero-drop but *executed* near-zero. R must confront: a ratified-not-built body is a deferral in substance even if not in ledger. |
| Performance + grand-hierarchy first-class | **A (perf)** / **PNI (hierarchy)** | Perf shipped (O.W3/W6). GRAND HIERARCHY (N.W12) never built — the keystone design wave is the biggest open. |
| Fable for design | **A (posture)** | N design waves speced for Fable; none executed. R design work → Fable. |
| frontend-design plugin | **A (posture)** | mandated; unused since design body never ran. |
| chrome-devtools / modern-web MCP audits | **A (audit-time)** | used in N audit lanes; R should re-run against the live demo. |
| Author tranche-items for sibling repos | **A** | BA `VALUEJS-N2-ASKS`; kf `VALUEJS-N2-ASKS`; O/P/Q dispatch files. R must refresh these against BG/BH 5.0.0. |

---

## §7 — The NEWEST 2026-07-02 session asks (P18 — all NEW, R-scope)

None of these are yet addressed; they DEFINE Tranche R. Recorded here with grounding for the R
charter.

| Ask | Status | Grounding / gap |
|---|---|---|
| **R-a. Challenge/audit/refine the most recent tranche set** | **NEW → R** | The "most recent set" = O (closed) + P + Q (library, shipped) AND the stalled N demo body (W10–W18). The sharpest finding for R: the N design body is RATIFIED-but-DEAD ~3 weeks; it must be re-challenged against a moved constellation (glass-ui 4.2.0→5.0.0, not the 3.13.0/BA-cut it was speced against). Its glass-ui interims (Select bound/rung, watercolor-ghost, size-axis) may already be superseded by BG/BH. |
| **R-b. Audit fourier-analysis tranches + db; uplift** | **NEW → R** | fourier tranches run F..M (`fourier-analysis/docs/tranches/`); shares CRUD facilities (`atomdiff`, `urn:contract:*`) with value.js `api/src/lib/crud/atomdiff.ts`. R must read fourier INVARIANTS.md + CANONICAL-ORDERING.md and score its db/tranche health. **Cross-repo read-only** per the boundary. |
| **R-c. CRUD union: value.js palettes ↔ fourier vizzes** | **NEW → R** | Both consume the shared atomdiff/remix/publish CRUD (Tranche J cohort). The union question: a single generic `urn:contract:*` CRUD substrate serving both palette docs and viz docs, vs two parallel schemas. value.js already adopted `urn:contract:*` at N.W3 (`fe3c00c`) — the convergence half is DONE on value.js's side; the union DESIGN is R-new. |
| **R-d. Align to forthcoming glass-ui BG/BH 5.0.0** | **NEW → R** | glass-ui is at 4.2.0; BG executing (aurora-metal, viz-resize-adopt, dock-fission, dock-cap-scroll-fade); BG/BH ride to 5.0.0. The N.W9'/W18 pin target "BA cut 4.0.0" is **STALE**. R must re-target the pin to 5.0.0 and re-map every glass-ui-interim design item (N.W13/W14 interims) onto the 5.0.0 surface. |
| **R-e. Identify gaps to relay to the active glass-ui agent** | **NEW → R** | The standing cohort asks (`uSatColor[]` per-satellite shader = U3 residual; AuroraConfig descriptor; the sliders/select/watercolor-ghost first-class primitives from U7/U8/U15/U18/U22/U28; the easing-configurator port U27) must be re-filed against BG/BH, since the BA-letter (`VALUEJS-N2-ASKS-2026-06-12`) is now stale. This lane's §3 PNI rows ARE the gap list. |

---

## §8 — Synthesis: the coverage verdict for R

1. **Library track: DONE.** A..O + P + Q addressed essentially every library ask (grammar, perf,
   subpaths, color-SOTA, the kf dispatch asks). U10 — the highest-severity 2026-06-12 complaint —
   is the one U-item fully closed, via 0.13.0. This half of the corpus is healthy.

2. **Demo/design track: the great stall.** The entire U1–U33 audit was folded zero-drop into
   N.W10–N.W18, RATIFIED, and never executed. 29 of 33 U-items are PLANNED-NOT-IMPLEMENTED;
   3 are partial (consume landed, expressivity/design residual open); 1 fully done. The
   grand-hierarchy keystone (N.W12), all controls (N.W13), all cards (N.W14), all per-pane design
   (N.W16), shell/motion (N.W17), and the cross-repo consume (N.W18) are dead-ratified. **This is R's
   central mandate: resurrect, re-challenge against the moved constellation, and execute the design
   body** — OR consciously re-scope it (the "challenge/refine the most recent set" ask invites
   exactly this re-litigation).

3. **Functional P0s still live.** U9 (reset broken) and U11's true root (unlayered glass-ui CSS
   cascade) sit in the dead N.W10 — these are behavior bugs, not polish, and outrank design.

4. **Zero true DROPS in the historical corpus.** Every deferral has a named home; VJ-L1/VJ-P2 are
   the only non-landed dispatch asks and both carry explicit disposition. The failure mode is not
   silent-drop — it is ratified-but-unbuilt, which the zero-drop precept must now be read to
   forbid in *substance*.

5. **Stale cross-repo anchors.** N/O were speced against glass-ui BA/4.0.0 and 3.13.0; the live
   constellation is glass-ui 4.2.0 → BG/BH → 5.0.0. Every N.W18 pin-and-consume assumption needs
   re-targeting (P18-d/e). The sibling-authoring asks (BA `VALUEJS-N2-ASKS`) are stale and must be
   re-filed against BG/BH.

**R's coverage charge**: (i) decide the fate of the dead N design body (execute vs re-scope) against
5.0.0; (ii) close the live functional P0s (U9, U11-root); (iii) run the fourier audit + design the
palette↔viz CRUD union; (iv) re-file the glass-ui gap list against BG/BH.
