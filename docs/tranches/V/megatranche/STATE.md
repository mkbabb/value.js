# MEGA-TRANCHE — STATE OF RECORD

**Read this first in any new session.** It is the resume point. Everything below is on disk; nothing
here depends on conversation context surviving.

Last updated 2026-07-27. Tree: branch `tranche-u`, HEAD `c654824e`. **No source edit has been made
by this formation and none is authorized** — `src/`, `demo/`, `api/`, `test/`, `e2e/` are untouched,
`docs/tranches/V/vnext/**` is Codex-owned READ-ONLY, and `scripts/dev/dev.sh` is never touched.

---

## The artifacts, in dependency order

| file | what it is | status |
|---|---|---|
| `SCOPE.md` | owner marks M-1..M-13 (M-12 tri-fold law · M-13 layout gestalt) , repo scope table, the apotheosis shape, prohibitions | STABLE |
| `FORMATION-LAWS.md` | **L-1..L-13**, each derived from a measured failure in this repo's history; ends with the wave template every wave must fill | STABLE |
| `registry/ROOT-FINDINGS.md` | **29 findings (MT-F001..MT-F028; F028 census corrected by the layout band)** established by the root's own hand, each with a reproduction command | GROWING |
| `registry/DISEASE-REGISTRY.md` | **33 disease rows** (18 BUILD · 11 RETIRE · 4 FOLD) + 22 mechanism families — the anti-rename ledger; wave authoring's primary input | **COMPLETE** |
| `registry/harvest/*.json` | **53 raw agent results** pulled from the workflow journals — complete, untruncated | REGENERABLE |
| `registry/DEFECT-LEDGER.md` | **287 defects** from completed challenger seats, severity-ordered | REGENERABLE |
| `audit/probes/*.mjs` | born-RED gates and hostile probes; each runnable standalone | STABLE |
| `audit/visual/` | route + state capture matrices, `owner-marked/` witnesses **OM-1..OM-10** (evening 2026-07-27 batch: OM-3/4 = MT-F029/F030; OM-5 dev-banner-REMOVE = MT-F031; OM-6 blob vibrancy = MT-F032; OM-7 capsule shadows = MT-F033 extends F026; OM-8 ANIMATED-transitions MANDATE = MT-F034; OM-9+OM-10 defect/control pair About-pane misalignment = MT-F035) | GROWING |
| `workflows/harvest-journals.mjs` | **run after every workflow completion, before any re-deploy (L-13)** | STABLE |

## Rules that bind the next session

0. **THE TRI-FOLD MODEL LAW — M-12 / L-14 (2026-07-27, supersedes M-11).** Fable orchestrates.
   Mechanical + challenge seats: Opus solo. Toughest work (adjudication, design synthesis, parser
   candidates, wave authoring): worker-F (fable) + worker-O (opus) blind-independent → arbiter-F
   (fable) refutes both, then agglomerates into ONE apotheosis. Receipts at every seat (L-11);
   cached seats count as the model that produced them. Instruments:
   `workflows/trifold-adjudication.js` · `workflows/trifold-parser.js`. Plan: `AUDIT-PLAN.md`.
1. **≤4 concurrent workflows** (owner, 2026-07-24). Commissioned scale is honoured *sequentially*.
   Prefer finishing a small band completely over half-running a large one.
2. **Harvest before re-deploy** (L-13): `node docs/tranches/V/megatranche/workflows/harvest-journals.mjs`.
3. **Re-deploy is always `resumeFromRunId`**, never a fresh invocation — completed seats replay from
   cache. Run IDs are in the table below.
4. **A summary is not a result.** `componentsRun: N` with every row `NO_JURY` / `defectCount: 0` is a
   FAILED run. Read the `<failures>` block and the journal before believing any workflow return.
5. **Challenger ≠ finding.** The 287 ledger rows are accusations with evidence attached. The jury
   seats were the ones most often killed; nothing is adjudicated until a jury pass runs.

## Workflow run IDs — resume, never restart

| band | runId | seats done | state |
|---|---|---|---|
| V·π receiving audit | `wf_0ddb79d6-164` | 9/9 | **COMPLETE** — deliverables in `V/apotheosis/pi/formation/session-audit/receiving/` |
| history audit A..V | `wf_76f092b7-f4b` | **16/16** | **COMPLETE** — 0 errors; disease registry + synthesis landed |
| parser band (M-9) ground | `wf_c88c8125-52c` | 3/8 | HARVESTED — ground study banked; candidates superseded by the trifold below |
| area core (7 comp) | `wf_66b1fcba-daa` | 6/42 | HARVESTED — challengers banked; juries superseded by trifold |
| area scenes (7 comp) | `wf_dee4c83a-ec2` | 5/42 | HARVESTED — same |
| area picker (4 comp) | `wf_3c8798e8-23e` | 6/24 | HARVESTED — same |
| **TRIFOLD adjudication r1** | `wf_a6f87133-522` | **15/15** | **COMPLETE — 5/5 apotheoses** in `registry/adjudicated/`: **App.md** (39 rows → C26/R2/S11; four BLOCKERs triple-measured incl. arbiter's own gh-pages build `hasApp:false, 698 B`; wave **MT-APP-1** 8 gates ~11 files + 5 named siblings incl. MT-APP-MOTION-1/MT-DOCK-LAYERS-1/MT-APP-RENAME-1; L-9 overture-colocation + D-15 forced-colors both STRUCK against worker-F in the bytes) · **ColorPicker.md** (46/52 confirmed after refutation-first re-derivation; all 4 contested rows ruled for worker-O; C-1 readout orphaning re-reproduced end-to-end; **MT-PICKER-1** = O's subtraction-first wave with F's gates distributed; spectrum-seam rows GLASS-OWNED per I-20) · **GenerateControls.md** · **GradientStopEditor.md** · **ColorInput.md** (full tallies in the files; the workflow output file + journal carry the complete disagreement rulings) |
| **TRIFOLD parser (M-9)** | `wf_6e1e7c6f-7af` | **3/3** | **COMPLETE — M-9 DELIVERED.** Two RUNNING total idiomatic parse-that parsers (`prototypes/css-parser/cand-f` 210/210 · `cand-o` 355/355); both 0/172 on the R1 corpus where published throws 102/172; the two grammars agree on 30,000 fuzz inputs with ZERO disagreements. **Winner: cand-O** (spec-table: eight colour functions = ONE production; bit-for-bit drop-in on every contested divergence) with binding debts-to-cand-F (labelled diagnostics, reject-path budget, depth bound). Bench: the standing "regex ~1.8× fastest" is NOT reproduced by three independent measurements — both candidates ~1.2× FASTER on accepted input at node level, regex fastest only on the reject path (~0.64–0.89×), and published+catch is ~55–130× worse on the throw class. FOUR dissents preserved for owner ruling (token juxtaposition `rgb(50%20%30%)` · non-finite numerals · try/catch posture · bench epistemics — OC-1 owns the bar). Apotheosis: `registry/adjudicated/parser-band.md` |
| **TRIFOLD adjudication r2** | `wf_9bd0ecd0-037` | **15/15** | **COMPLETE — 5/5 apotheoses**: **ColorSpaceSelector.md** (C8/R1/S5/G1; L-1 false-color-science BLOCKER stands — 5 spaces render the CIE-1931 rgb card, 7 a bare guide; mark-never-project locked; wave V·MT-W-CSS1 10 gates; the L-10 citation-inheritance event RECORDED — O repeated the stale 700-hardcode cell F predicted) · **AdminUsersPanel.md** (C7/S4/G3; BLOCKER moves L-1→L-5 auth-costumed-as-empty-roster; all 7 splits ruled for Opus on arbiter re-measurement; the L-5 witness-standing ruling = the PNG was UNTRACKED so the witness "did not exist" under L-7 — cured by the durability checkpoint) · **ConfigSliderPane.md** (C21/S13/R1; reset wipes nested live state; spectrum variant defeated by its own override; copy Result discarded UI-silent; 4 glass-owned cure-arms ride ONE BH relay) · **Markdown.md** (C7/S5 + NEW MT-MD-12 raised by worker-O and arbiter-confirmed; closed entirely from source + compiler receipts) · **Dock.md** (C5/S2; **L-18 chrome ink probe STATICALLY DEAD** — probe reads `.glass-dock` bg = `rgba(0,0,0,0)`, every rule paints `.dock-plate`, `resolveLiveTint('chrome')` undefined on EVERY call since the W44 Glass-7 adoption; **L-19 admin gold latch has NO falsifying arm** — anonymous `/#/atmosphere` latches gold for the session; L-20 crossfade shim = one-frame cut, IS MT-DOCK-LAYERS-1). **O-16 glass relay OWED at next coordination touch**: the consolidated r1+r2 glass-owned arms (CSS1 SelectTrigger title-variant + F's text-title-tokenized correction · ConfigSliderPane's 4 cure-arms · Dock's 2 asks) |
| **TRIFOLD layout (M-13)** | `wf_73c61fe0-093` | **3/3** | **COMPLETE.** Both blind designers converged: glass's InstrumentChassis already ships the whole mechanism (own container-type, cqi rhythm, 44.9375rem container narrow arm, unbounded golden/preview-dominant fr) — demo consumers: **0**. Arbiter adopted worker-O's spine and **REFUTED worker-F on both load-bearing mechanisms** (inner-scroll frame killed by canon §3 law 6 + the CONFIRMED App D-8 gate; one-cut LG-1 refused as an arc per the same-day App rescope), harvested F's four real contributions (stage-spend gate, admin subgrid, threshold-contract ask, WebGL-resize probe), added three catches BOTH missed (T-45 blur carrier re-seat; dock posture under document scroll = U-7; the MT-APP-1 file collision → ordering). Census CORRECTED: 102 adaptation sites in 3 dialects (58 Tailwind prefixes/28 files · 37 JS refs/13 files · 7 viewport @media); foundation.css:479 block cap → **~86% of viewport AREA dead at 3440×1440**. Final: 18-route table (15 ONE / 2 bespoke-narrow / 1 producer-bespoke), laws ML-0..7 + UL-1..4 + MB-1..6, **8 glass asks (relayed O-10)** incl. the G-6 dead-dock-rules defect relay, four born-RED waves **V·L1..V·L4** (ordered AFTER MT-APP-1). Apotheosis: `registry/adjudicated/layout-gestalt.md` · MT-F028 census amended in place |
| **TRIFOLD library band** | `wf_076062ab-dc8` | **7/7** | **COMPLETE.** 50 sweep findings (value-src 15 · keyframes 9 · fourier/parse-that 14 · api 12); apotheosis `registry/adjudicated/library-band.md` (37KB). Neither worker adopted whole: worker-O's 9-wave skeleton WON on **LIB-01** (arbiter re-verified `easing("constructor")` 5/5 THROW — a third shipping crash class beyond MT-F024, on the exact symbol handed to fourier; worker-F's css-only W.L1 would have closed green over it); worker-F won **LB-N1** (consumer-position blindness, probe exit 1 today) + **LB-N2** (the 350-LoC src/ cap is a PHANTOM — canon caps demo≤400 + api/src≤350 which HOLDS at 0 breaches; R-T1 ratchet replaces it, max src file 899 today). 13 disagreements RULED (RD-1..RD-13; incl. bare-declares=33 not 32, src/css assertions=94 not 90, `_2`=25 lines/58 occurrences gate-pinned). One dated **4.1.0 cut**: SCI-1 + toHex + barrels + easingNames + memoised easing + RESTORED analytic arms (approximated-discriminant DECLINED as a labelled lie; max|Δ|=0.192); resolveCssColor DECLINED with recorded re-trigger (arbiter's closest call, owner-adjacent). Keyframes work goes BY PACKET (no D-15 analogue); DR-18 stylesheet split re-homes to band W.L4; facility 19 = F's one-way correspondence law + O's ten-row table. L-7 debt owned: the entire probes dir is UNTRACKED at HEAD → DR-23 track-or-archive. **5 packets owed** (keyframes · atlas · glass · fourier · parse-that) — see O-11..O-15 |
| **PHASE X excavation (M-14)** | `wf_a6f71311-4e5` | 13 Opus unearth + 3 Fable adjudicate | **RUNNING** — the 100+-sessions/100+-tranches dig: owner-message extraction (value 11 files · glass 26 · kf 4 · fourier 1, top-level jsonl ONLY), per-tranche truth tables (~106 tranches), shadcn/library + design-canon censuses, vnext/Codex standing, glass-forward compliance ledger → `excavation/EXHORTATION-CENSUS.md` + `TRUTH-TABLE.md` + `CONTRIVANCE-REGISTER.md` + `DESIGN-CANON-BRIEF.md`. M-14 + L-15 registered (SCOPE/FORMATION-LAWS) |
| **PHASE D safari-real matrix** | `wf_060ffe39-0fd` | **3/3** | **COMPLETE.** `audit/visual/safari-real/MATRIX-SAFARI.md` (564 lines; 21 route cells + 15 state cells; 30 name↔sha pairings verified, 0 absent). **THREE INVERSIONS**: keyboard-focus #/gradient (webkit sat on `body`, real Safari reaches a ring-bearing stop — **RESOLVES MT-F022 #3: no keyboard defect bookable from webkit rows**) · keyboard-focus #/ (TRUE→FALSE but NOT like-for-like — different 12th stop; OPEN in both cells) · rtl #/ katex half (RTL stays UNCLAIMED-not-broken). Four divergences DECLINED as inversions with reasons (incl. webkit disagreeing with ITSELF on #/blob canvas count). Real findings: #/blob right-pane does not mount at 390 while #/mix does (webkit-corroborated); the "694 clipped" = ONE unscrollable overhanging card (MT-F022-class false signal caught in-seat). **Morph arm NOT-DRIVEN, honestly**: hidden-window rAF ~1Hz → zero genuine morph frames; glass-S0 NOT closed; the two S0-signature `.ips` attributed AWAY from real Safari (Playwright's WebContent under VSCode coalition); frame stack corroborates STYLE-RESOLUTION crash class. Route matrix: 0 horizontal overflow on 21 cells; h1==0 everywhere re-confirmed; Safari accepted 3440 verbatim (display is the constraint). 11 declared blind spots incl. the widened window-snapshot failure and the pointer-actions driver hang (standing instruction recorded). **O-16 SENT** (consolidated r1+r2 arms + S0 corroboration + the forced-colors BLOCKER returned to US as demo-owned) |
| **TRIFOLD chassis fitness** | `wf_88ec28d9-949` | **3/3** | **COMPLETE — ADOPT-WITH-ASKS, unanimous 3/3** (owner challenge "overfit garbage or worth extraction?"). Apotheosis `registry/adjudicated/chassis-fitness.md`. **The root's evidence-pack census was FALSE and both blind workers caught it (L-10 on the root's own numbers): §5 correction record — sci-report 14 hits ALL docs (glass pin 6.0.0, zero `.instrument-*`); fourier consumption IMPOSSIBLE (^4.0.0 dist has no chassis dir); speedtest's 12 files consume the 4.0.1 ANCESTOR (zero prop/slot overlap); true 7.0.0 population N=1 (producer's own demo story) — value.js = the FIRST production consumer anywhere.** Ruling re-grounded on knob test + bespoke-delta COLLAPSE (independently-written bespoke converges near-byte-identical; genuine delta = exactly G-1/G-2/G-3/G-5+G-8) + ask-shape + MT-F014 drift law. Owner's instinct HALF-VINDICATED: the 4.0.1 ancestor WAS textbook overfit (`ping\|download\|upload\|jitter` in a design-system union); 7.0.0 is its wholesale cure. Worker-F's circular canon-fit STRUCK (fr constants entered canon FROM dist bytes one day after glass shipped them; band law: canon-fit is not fitness evidence); worker-O's blocking-gate-on-layout-gestalt REFUTED (that doc always said "zero consumers" — the false census lived only in the root's workflow brief). Consequences: 18-route table STANDS (Browse/Library bind preview-dominant); V·L1..V·L4 proceed after MT-APP-1; **O-10 AMENDMENT RELAY SENT** (`glass-ui/.../valuejs-outbound-2026-07-27-o10-amendment-census-g7-g9.md`: G-7→load-bearing · NEW G-9 proportion tokens · census rider; INBOX row pending the O-11..O-15 packet seat's append — row it after); **canon petitions P-1/P-2 AWAIT OWNER**; worker-F's HYBRID successor clause preserved if glass refuses G-1/G-2 in the 8.0.0 cycle. Dissent preserved §7 (N=1 extraction history, twice) |
| area shell (12 comp) | `wf_e28d617f-9eb` | 4/72 | **RE-DEPLOYED 2026-07-27 (3rd deploy; walls at ~5pm and ~10:50pm ET reset+redeployed on owner order; harvest between EVERY wall — ledger 1,044 defects / 153 BLOCKER after the third harvest)** — first resume ran until the session wall killed the fleet mid-band (22 seats landed with 277 NEW defect rows incl. new BLOCKERs before dying; ALL harvested — ledger now 564 defects / 80 BLOCKER); owner reset the limit and ordered full re-deploy; relaunched with identical args + resumeFromRunId, jury-stripped per M-12. Completed challenge seats replay from cache; only dead seats run live |
| area workbenches (19) | `wf_6edda4a1-192` | 6/114 | **RE-DEPLOYED 2026-07-27 (3rd deploy; walls at ~5pm and ~10:50pm ET reset+redeployed on owner order; harvest between EVERY wall — ledger 1,044 defects / 153 BLOCKER after the third harvest)** — first resume ran until the session wall killed the fleet mid-band (22 seats landed with 277 NEW defect rows incl. new BLOCKERs before dying; ALL harvested — ledger now 564 defects / 80 BLOCKER); owner reset the limit and ordered full re-deploy; relaunched with identical args + resumeFromRunId, jury-stripped per M-12. Completed challenge seats replay from cache; only dead seats run live |
| area palettes (32) | `wf_22b7a7b7-97b` | 1/192 | **RE-DEPLOYED 2026-07-27 (3rd deploy; walls at ~5pm and ~10:50pm ET reset+redeployed on owner order; harvest between EVERY wall — ledger 1,044 defects / 153 BLOCKER after the third harvest)** — first resume ran until the session wall killed the fleet mid-band (22 seats landed with 277 NEW defect rows incl. new BLOCKERs before dying; ALL harvested — ledger now 564 defects / 80 BLOCKER); owner reset the limit and ordered full re-deploy; relaunched with identical args + resumeFromRunId, jury-stripped per M-12. Completed challenge seats replay from cache; only dead seats run live |

Area orchestrator script: `workflows/area-orchestrator.js`; per-component script:
`workflows/component-apotheosis.js`. Rosters with per-component evidence: `workflows/args/*.json`.

## The findings that matter most so far

- **MT-F024 (BLOCKER)** — `@mkbabb/value.js@4.0.0` **as published** throws on the empty-argument form
  of every major CSS colour function. 324 throws / 1548 calls, **one** distinct failure mode, all
  from a single `!` at `src/css/grammar.ts:181`. 4 of 9 public `parse*` entry points affected.
  Gate: `audit/probes/r1-published-totality.mjs` (exit 1 today). Relayed to glass + keyframes + atlas.
- **MT-F012 (BLOCKER)** — the gh-pages build emits a bundle with no application in it; a stock-Vite
  minimal repro produced a SHA-256-identical broken chunk. Cure: move the 8 inline lines from
  `demo/color-picker/index.html:205-213` into `main.ts`.
- **MT-F023 (MAJOR)** — the blunt `animation-duration: 0.01ms !important` PRM guard is structurally
  incapable of reaching a scroll-driven animation. glass-ui already solves this correctly (all 10 of
  their `animation-timeline` decls sit inside `no-preference`); we adopt their idiom.
- **MT-F026 / MT-F027 (owner-marked)** — dock pills carry `--glass-shadow-floating` while their plate
  casts none; `--shadow-cartoon-md`'s three zero-blur same-diagonal layers facet at rounded corners.
  Witnesses committed under `audit/visual/owner-marked/`.
- **MT-F022 / MT-F025 (evidence-integrity)** — the state-matrix harness produced four false signals
  out of four, all probe artefacts; and **every "Safari" capture is Playwright WebKit 2287, not
  Safari 26.4**, which bounds owner mark M-5. Real-Safari automation needs a one-time manual
  *Allow Remote Automation* toggle.

## 2026-07-27 unblocks (I-20 + this session's probes)

- **Real Safari 26.4 is automatable** — verified: safaridriver session, first witness committed
  (`audit/visual/safari-real/picker-safari26.4-light.png`, sha256 `1704d0ce…e4d0`), `h1:0`
  re-confirmed in the real browser. MT-F025's blocker is CLEARED; M-5's Safari clause is now
  dischargeable (Phase D). webkit-engine and safari-app remain SEPARATE evidence cells (glass law).
- **The dock SIGABRT non-repro is explained**: the crash arm is `--dock-expand-t` DRIVEN under morph;
  rest never enters it. Our rest/hover cells were structurally blind — not wrong, blind (L-12).
- **The prefix trap is a live glass-owned defect in our picker today** (spectrum range keeps
  `blur(7px) saturate(1.4)`, hard seam) — cured in glass 8.0.0, NO local patch, adjudicators must
  not re-book it as ours.
- Dev server runs API-LESS via `npx vite --port 9000` (mongo down; `dev.sh` untouched per DR-24) —
  data-backed states don't render; UNVERIFIABLE-HERE is the honest verdict for those arms.

## What remains

- TRIFOLD adjudication rounds 2+ — remaining units with harvested defects (ColorSpaceSelector,
  AdminUsersPanel, ConfigSliderPane, Markdown, Dock, scenes/palettes axis-keyed rows), then areas
  palettes (31 unchallenged) / shell (8) / workbenches (13) / scenes (2) / core (4) / picker (2):
  Opus challengers + trifold juries, ≤4 workflows, harvest between.
- Library audit band (value `src/`, keyframes, fourier-analysis, parse-that APIs).
- Convergent design loop — round-zero portfolio + ≥3 passes.
- **Wave authoring** — the actual mega-tranche: waves, born-RED gates, dispositions
  (BUILD/FOLD/RETIRE, no re-booking), addenda. Nothing is specced yet; the registry and ledger are
  its inputs.

## The history audit's own verdict on itself (read before trusting any of it)

`convergenceVerdict`: **"CONVERGED ON THE DOCUMENT AXIS, STILL GROWING ON THE EXECUTION AXIS.**
Two more reading passes would surface little; one product-execution pass will surface new BLOCKERS,
and I predict at least three." Evidence offered for document convergence: ten per-tranche seats
working independently rediscovered the **same eight chronic identities** from different eras and
different files — independent rediscovery being the signature of saturation — and 18 of the 22
mechanism families are attested by ≥3 seats.

`underexploredLenses`, first entry, quoted because it indicts the audit itself:

> **"THE RUNNING PRODUCT — zero passes. Not one of the fourteen seats booted the demo, walked a
> route, or looked at a rendered frame."**

That gap is exactly what the root's own probe and visual work fills (MT-F001..MT-F027 are all
execution-axis), and it is why the registry and the ledger are kept as separate artifacts: the
document axis is saturated, the execution axis is not. **Any claim that this formation has
"finished auditing" is false on the seat's own testimony.**

## The disease rows that most shape the wave set

- **DR-01 BUILD** — aurora derive-from-colour: **17 closes, 13 names**. The oldest row in the
  repository and the canonical anti-rename case.
- **DR-06 BUILD** — the ~5s boot: escalated at three consecutive closes under four names
  (S RP-2/L20 → T Q14/O-5 → U U-F3 → V′ CH-4).
- **DR-09 / DR-11 BUILD** — the CI verification cliff (185 Playwright tests, Lighthouse, boot-smoke:
  executed by **no automation**) and master CI red since 2026-07-05 with zero deploys since.
  DR-09's wave is named first-to-execute because eight other rows are undecidable without a browser gate.
- **DR-10 BUILD** — the production empty mount = the root's MT-F012, independently rediscovered.
- **DR-12 BUILD** — R1 / parse-honesty = the root's MT-F024, independently rediscovered.
- **DR-24 RETIRE** — `scripts/dev/dev.sh`, the last unowned dirty row, un-ruled since before V′.
- **DR-32 FOLD** — DesignSync / the Fable design pathway: a ruled design gate depending on a tool the
  same corpus books for pruning. Directly touches owner mark M-3.

---

## §RESUME — SESSION-WALL RECIPE (checkpoint 2026-07-27, post-library/chassis/r1)

A fresh session resumes HERE. Harvest is current (99 agent results, `registry/harvest/`); eight
apotheoses are landed and committed: App · ColorPicker · GenerateControls · GradientStopEditor ·
ColorInput · parser-band · layout-gestalt · library-band · chassis-fitness (nine files in
`registry/adjudicated/`).

**In flight at checkpoint (re-check with /workflows or TaskList before assuming):**
| what | resume | if dead |
|---|---|---|
| TRIFOLD adjudication r2 (ColorSpaceSelector · AdminUsersPanel · ConfigSliderPane · Markdown · Dock) | `Workflow({scriptPath: "docs/tranches/V/megatranche/workflows/trifold-adjudication.js", resumeFromRunId: "wf_9bd0ecd0-037", args: <the r2 unit roster — recover verbatim from the run's journal dir or the r1 diagnostics pattern>})` | completed seats replay from cache; only dead seats re-run (L-13) |
| Phase D safari-real matrix (routes seat DONE — 22 shots on disk; states+morph seat + synthesis pending) | `Workflow({scriptPath: "docs/tranches/V/megatranche/workflows/safari-real-matrix.js", resumeFromRunId: "wf_060ffe39-0fd"})` | routes seat replays cached; needs env below |
| O-11..O-15 packet seat | **DONE 5/5** — receipts + THREE PATH DEVIATIONS banked at `registry/harvest/packet-seat-O11-O15-receipts.md` (O-12 → sci-report/atlas P-path, code tree has no docs/; O-14 → fourier `docs/tranches/N/` live inbox; O-15 → parse-that docs-root). INBOX rows O-11..O-15 appended (+5/−0) | — |
| INBOX rows | **DONE** — O-11..O-15 by the seat; **O-10a (chassis amendment) rowed by the root**; all committed | — |

**Environment recipes (both die between sessions):**
- dev server: `npx vite --port 9000 --strictPort` from repo root — API-LESS (mongo down; dev.sh NEVER touched); data-backed arms are UNVERIFIABLE-HERE, not defects.
- safaridriver: `nohup safaridriver -p 4599 > <scratch>/safaridriver.log 2>&1 & disown`, verify `curl -s localhost:4599/status`. ONE session at a time; a leaked session blocks — DELETE it, don't kill processes.
- harvest: `node docs/tranches/V/megatranche/workflows/harvest-journals.mjs` — run BEFORE any re-deploy (L-13).

**Witness disposition (deliberate, not a drop):** git carries the knowledge corpus + OM-1/OM-2 +
the first real-Safari witness; the bulk shot corpora (195 PNGs ≈ 346M: `audit/visual/shots/`,
`audit/components/**`, the safari-real 3440s) stay disk-durable with sha256s recorded in the
registry docs (`.gitignore` at the megatranche root states the law). `docs/tranches/V/apotheosis/`
(364M, embedded node_modules mirror trees) remains uncommitted — booked to **DR-23
track-or-archive** as its own curation decision; do NOT bulk-add it blind.

**Then:** remaining Phase B areas (shell 8 · workbenches 13 · palettes 31 · scenes 2 · core 4 ·
picker 2 unchallenged components — resume run IDs in the table above) → Phase E convergent design →
Phase F wave authoring. Owner rulings pending: canon petitions P-1/P-2 (chassis-fitness.md §4.4),
resolveCssColor re-trigger (library-band.md RD-6), parser-band's four dissents, keyframes/atlas
4.0.1-vs-tuple answer.
