# value.js — implementation truth, tranches N → W

**Seat B:value-tranches-NW (M-14 excavation swarm) · Opus banausic band · generated 2026-07-27**

Subject: what the last ten value.js tranche letters **promised**, what **landed**, what landed and
then **diverged**, what was **explicitly rejected**, and what was **promised and never mentioned
again**. The silent drops are the payload.

## Provenance

| item | value |
|---|---|
| corpus | `docs/tranches/{N,O,P,Q,R,S,T,U,V,W}` — 10 letters, **1,406** `.md` files (`find … -name '*.md' \| wc -l`: N 128 · O 11 · P 1 · Q 1 · R 75 · S 88 · T 153 · U 66 · V 867 · W 16) |
| primary reading | `FINAL.md` first where present; else the charter + `PROGRESS.md`; for V: `reformation/{V-PRIME,CARRY-LEDGER,FORMATION-CLOSED,MAPPING,RETURN,DISPOSITIONS}.md` + `audit/POST-U-AUDIT.md` + `megatranche/STATE.md` (per seat brief) |
| never read | `docs/tranches/V/vnext/**` (Codex-owned, READ-ONLY) — zero bytes read, zero written |
| git verification | 25 cited commits resolved with `git log -1`; **25/25 exist and their subjects match the citing document**. Tag list, branch topology, and 4 tree-state probes run live |
| tree state at excavation | branch `tranche-u`, HEAD `5c13465d` (2026-07-18 M-15 vnext transfer) — **newer than the `c654824e` recorded in `megatranche/SCOPE.md §1`** |
| disposition rows below | **113** (109 numbered + 4 structural facts; see §14 counting rule) |

### Honest limits of this seat

1. I read closure records and charters, not every wave file. Where a wave spec would change a
   verdict I say so in the row rather than guessing.
2. Six of the ten letters close `complete_with_misses` **by their own naming law**. I did not
   re-litigate those self-declared misses; I hunted the rows that are *not* in the misses list.
3. Where the megatranche's own adjudicated corpus already ruled a row (MT-F###, DR-##), I cite it
   as corroboration and mark it as such — I did not re-derive it. Rows marked **(mine)** carry a
   command + pasted output from this session.

---

## §0 — The four structural facts, measured this session

These bind every tranche row below.

| # | Fact | Command + output |
|---|---|---|
| S-1 | **Neither U nor V is on `master`. `master` is frozen at the T close ceremony, 2026-07-13.** | `git log -1 --format='%h %ad %s' --date=short master` → `6abef800 2026-07-13 ci(O-25) + docs(T · w9-close): the ceremony deploy record`; `git log --oneline master..tranche-u \| wc -l` → **196**; `git merge-base --is-ancestor c654824e master` → **V NOT on master** |
| S-2 | **Close tags stop at T.** R, S, T each minted `tranche-*-close`. U closed `complete_with_misses` on 2026-07-13 and V′ closed 8 units — neither minted a tag. | `git tag --list 'tranche-*'` → `tranche-r-close  tranche-s-close  tranche-t-close` (3 rows, nothing else) |
| S-3 | **The e2e corpus has been import-broken since the V′ W43 colocation.** 7 spec/fixture files still reach into `demo/@`, which no longer exists. **(mine)** | `ls -d demo/@` → `No such file or directory`; `grep -rln "demo/@\|@/lib" e2e/` → 7 files, incl. `e2e/smoke/fixtures/browse-palettes.ts:19: import type { Palette } from "../../../demo/@/lib/palette/types"` |
| S-4 | **`docs/tranches/W/` is not a tranche.** It contains `audit/history/` and nothing else — no charter, no `FINAL.md`, no `waves/`. The letter W was consumed by the mega-tranche's 16-seat historical audit (run `wf_76f092b7-f4b`). Meanwhile `megatranche/registry/DISEASE-REGISTRY.md` writes wave IDs as **`W.W1`…`W.W5`**, i.e. it has already spent the letter on the *next* tranche. | `ls -la docs/tranches/W/` → `audit/` only; `grep -n "W.W1 RE-GATE" DISEASE-REGISTRY.md` → line 197 |

---

## §1 — Tranche N (2026-06-11 → superseded; `FINAL.md` present, authored 3 weeks late at R.W0)

**Promised:** 9 waves (N.W0–N.W9) at open; then a second block N.W10–N.W18 + re-sequenced W8′/W9′,
**RATIFIED 2026-06-15**; terminus = v1.0.0.
**Self-declared outcome** (`N/FINAL.md:3-5`): *"N.W1–W9 landed (0.12.0 published, 2026-06-11).
**N.W10–W18 were ratified 2026-06-11 and never executed** — the block died on the record and its
content folds forward into **Tranche R**."*

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 1 | N.W1 boot-truth | typecheck 0, CI boot-smoke, e2e green | `d9c3b9f2` 2026-06-11 *"fix(boot): N.W1 — boot-truth substrate: carousel→tablist gestalt + BouncyTabs→SegmentedTabs"* ✓ | LANDED |
| 2 | N.W2.A WithId | 26 escape casts → 0 | `e4b5f600` *"26 escape casts → 0, aggregation boundaries typed (inv-N-2)"* ✓ | LANDED |
| 3 | N.W3 CRUD right-size | txns 18→≤14, TTL index, URN decision | `fe3c00c7` *"txns 18→14 justified-each, indexes 26→22"* ✓ | LANDED |
| 4 | N.W4 deploy-truth | prod serves HEAD lineage | artifacts landed `e62567a`+`b0cb867`; **the wire deploy did not fire** — deferred to the W8 "ceremony", which never ran. Prod stayed I-era until **T.W0, 2026-07-10** (`bdfb4a5e`) | HALF-BAKED → chronic (2 further tranches) |
| 5 | N.W5 blob/aurora/watercolor | forks deleted, `deriveAurora` wired | `e32111c7` *"blob fork (1270 LoC) → glass-ui goo-blob with live-palette paletteStops; deriveAurora wired"* ✓ | LANDED |
| 6 | inv-N-7 zero phantom classes | every demo class resolves | Closed at W5, **RE-OPENED same day** (`PROGRESS.md:19` — `watercolor-swatch` bare-use), routed to N.W14, which never ran | HALF-BAKED |
| 7 | N.W6 design suffusion (the standing Fable wave) | 14-pane design audit + suffusion work-orders | **DIED un-implemented.** `PROGRESS.md:20`: *"zero impl commits, only the dock-first-paint sliver in `199fd15`"* | REJECTED-BY-DEATH → re-divined |
| 8 | N.W7.A kf 12-item ledger | 12 library asks | 11 landed `9cd815e`+`0deca84`+`ed0dd00`; witness-mirrored | LANDED (11/12) |
| 9 | N.W7.B prettier eviction | **"tarball < 200kB unpacked"** (`N.md:156` hard gate) | 586→287 KB, and the gate was **rewritten to ≤320 KB in the same breath** — `PROGRESS.md:21`: *"prettier evicted 586→287KB ✓ (≤320KB gate, honest re-target from <200KB)"* | HALF-BAKED — gate moved to fit the result |
| 10 | N.W7.B `lerpArray` demote | "decide, don't carry" | KEEP — premise refuted by the kf consume-edge | REJECTED-EXPLICITLY (good) |
| 11 | N.W8 hygiene + master merge | master green, tags == registry | never ran as N.W8; absorbed into R.W0 (`R/FINAL.md:37`, 14 rows + 10 retro-tags) | FOLDED |
| 12 | N.W9 v1.0.0 close | v1.0.0 + π + FINAL | v1.0.0 shipped instead at **O.W6** (`dd9beb5c`). N's own FINAL calls the framing *"obsolete"* and *"dropped"* (`N/FINAL.md:17-22`) | REJECTED-EXPLICITLY |
| 13 | **N.W10–W18 "never executed"** | the whole second block | **FALSE AS WRITTEN.** `git log -1 9fce504` → `9fce504a 2026-06-16 feat(N): 0.13.0 — the kf-K-dispatched grammar fold (N.W11.D sampleColorRamp + N.W11′ the scroll-timeline grammar)`; tag `v0.13.0` exists; `O/PROGRESS.md:8` independently records *"value.js HEAD at O-open = `9fce504`, version 0.13.0 (N.W11.D + N.W11' shipped)"*. **2 of the 9 second-block waves DID execute and shipped a minor.** **(mine)** | **DOCUMENTED FALSEHOOD in a FINAL.md** |
| 14 | N.W11′ scroll-timeline grammar | new `parsing/scroll-timeline.ts` | Survives today as `src/css/timeline.ts` + `CSSTimelineOptions` (`src/css/types.ts:100`) **(mine)** | LANDED, survived |
| 15 | N.W11.D `sampleColorRamp` | perceptual ramp, un-blocks kf-K.W10 CC-2 densify | Shipped 0.13.0; extended to `sampleColorRampAt` at 1.2.0. **Gone from the tree today**: `grep -rn "sampleColorRamp" src/ test/` → **no hits**; only `CHANGELOG.md:264,404` remember it **(mine)** | **SILENT DROP** — see §11 D-1 |
| 16 | §8 cohort ask: `uSatColor[]` per-satellite shader | glass-ui ships it, value consumes | glass-ui now has `uSatColorActive` but *"DEFAULT OFF: no satColors"* (`../glass-ui/src/components/blob/composables/uploadBlobUniforms.ts:109`). Rode S(GAP-L5)→T→U(U-F5). **Absent from every V′ reformation document** **(mine)** | **SILENT DROP** — see §11 D-3 |
| 17 | §8 ask: `AuroraConfig` slider descriptor | producer ships | last named at S GAP-L2; absent from V′ canon | **SILENT DROP** |
| 18 | inv-N-10 abrogation sweep at every pin bump | standing structural sweep | Not re-asserted at the V′ W44 glass-7 adoption gate list (`CARRY-LEDGER §F` gate enumeration) | fell out of the gate set |

**N's verdict:** N is the tranche that proves the re-divination loop. W6 died → was re-divined as
W10–W18 → the block died → was folded into R. Two of those waves executed anyway and N's own FINAL
denies it. **All 12 files in `N/waves/` carry a RATIFIED stamp** (`grep -l RATIFIED N/waves/*.md |
wc -l` → 12 of 12 **(mine)**) — ratification of a wave has never, in this corpus, implied its
execution.

---

## §2 — Tranche O (2026-06-18/19; **NO `FINAL.md`** — a finding)

**`ls docs/tranches/O/`** → `O.md`, `PROGRESS.md`, `waves/` (9 files). There is no close record.
`PROGRESS.md:3` asserts *"O is **CLOSED** — all library waves (O.W0–O.W6) SHIPPED"*; the header was
rewritten from DEVELOPMENT to CLOSED-as-built **by tranche P**, not by O (`P/FINAL.md:36-37`:
*"committed the previously-untracked `docs/tranches/O/`; rewrote its PROGRESS header DEVELOPMENT →
CLOSED-as-built"*).

| # | Wave | Promised | Landed | Class |
|---:|---|---|---|---|
| 19 | O.W0 | 2 P0 crashes + `linear()` spacing → 0.13.1 | `650a8cdb` *"the two P0 crashes + linear() stop-spacing — ship 0.13.1"* ✓ | LANDED |
| 20 | O.W1+W2 | subpath split → 0.14.0 | `9ae9df01` *"the subpath split — 145 KB monolith dissolved into 7 per-tier subpaths, ./color parse-that-ZERO"* ✓ | LANDED |
| 21 | O.W3 | zero-alloc color math | `0118ae1` (104→84 allocs/call) | LANDED-partial — the second half (`color2Into`) explicitly deferred to P |
| 22 | O.W4/W4b | 2026 grammar + timeline | shipped 0.15.0 | LANDED |
| 23 | O.W5 | semantic idempotence → 0.16.0 | shipped | LANDED |
| 24 | O.W6 | SOTA perf + **1.0.0** | `dd9beb5c` *"SOTA perf — dispatch() table + byte scanners → value.js 1.0.0"*; tag `v1.0.0` ✓ | LANDED |
| 25 | **O.W7-demo** — Parse-Lab pane + gamut-truth indicator | a demo pane | **NOT SHIPPED** (`PROGRESS.md:29`), then **fused** at R.W4 lane E4 into `ColorInput` (`R/waves/R.W4.md:71`, Q10 RATIFIED) and R.W3 (overlay half). **Both halves are gone today**: `grep -rl "ParseLab\|parse-lab" demo/` → 0; `grep -rln "gamut-truth\|GamutTruth" demo/` → 0. The overlay was terminally retired by owner bracket B1 at V′ W40 (`V-PRIME.md:108`) **(mine)** | built → fused → **DELETED**; see §11 H-2 |
| 26 | `proof:parse-lab-mount` gate | a born-RED gate | *"remains unimplemented with O.W7-demo"* (`PROGRESS.md:58`) — a gate authored for a wave that never ran | GATE THAT NEVER RAN |

**O's verdict:** O is the cleanest execution record in the corpus (7 published cuts in ~24h) and the
worst closure record (no FINAL, header retrofitted by its successor, one wave dropped).

---

## §3 — Tranche P (`FINAL.md` present, authored 10 days late at R.W0)

`P/FINAL.md:5-6`: *"Authored lean at R.W0 (2026-07-03) — the P tranche shipped its version and tag
but never carried a close record."*

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 27 | VJ-L3 `parseCSSSubValue` | terminal API for kf S9 | `23d1a91e` 2026-06-23 *"Tranche P (1.1.0): parseCSSSubValue (S9 unblock) + color2Into gamut zero-alloc + :any→string"* ✓; tag `v1.1.0` | LANDED — later **retired at 4.0.0** into `parseCSSValues` (U-F29) |
| 28 | VJ-P1 `color2Into` | 84 → 37 allocs/call | landed, measured | LANDED |
| 29 | VJ-CSS1 `extractFunctions` | AST depth-walk | landed `src/parsing/extract.ts:124`; a stale-worktree audit later claimed it *"absent from source"* — refuted at R.W0 and canonized as R lesson 1 | LANDED (with a recorded false-negative audit) |
| 30 | VJ-CSS2 `sibling-index()` | probe → decide | already parsed; contract pinned by tests, no new arm | REJECTED-EXPLICITLY (good) |

**P's verdict:** four rows, four honest dispositions, zero drops. P and Q are the only letters in
N..W with no half-baked row — and both had to have their close records written for them.

---

## §4 — Tranche Q (`FINAL.md` present, authored 10 days late at R.W0)

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 31 | VJ-Q1 `contrast-color()` | CSS Color L7 catch-up | `fd3c7cef` *"VJ-Q1 contrast-color() — the library-LEADS catch-up + parse-that ^0.13.0"*; tag `v1.1.1` ✓ | LANDED |
| 32 | VJ-Q2..Q9 | perf + grammar + provenance | `e80b359c` *"the perf + grammar + provenance minor — VJ-Q2…Q9"*; tag `v1.2.0` ✓ | LANDED |
| 33 | VJ-Q3 `mixColorsInto` / `sampleColorRampAt` | zero-alloc mixing | shipped 1.2.0. **Gone today**: `grep -rn "mixColorsInto\|toRgba8Into" src/` → no hits **(mine)**. Re-appears in V′ WL as **SCI-1 "restore-or-bless"** with a named live consumer (atlas, ~3,243 marks/frame) | **SILENT DROP → re-discovered by the consumer**; §11 D-1 |
| 34 | NO-LEGACY: retire dead L6 `color-contrast()` grammar stub | delete, don't shim | deleted from `css-color.bbnf` | LANDED (exemplary) |

---

## §5 — Tranche R (CLOSED 2026-07-04, `complete_with_misses`; 2.0.0)

`R/FINAL.md` is the highest-fidelity close record in the corpus: per-wave gate table, a §2 zero-drop
ledger walking every `R.md §10` row, an ι integrity sweep of the reflog, a π reconciliation, and 10
process lessons. Verified: `96f124d7` (2.0.0), `bdba8fc2` (`merge(R · close)`), tag `tranche-r-close`,
tags `v2.0.0`/`v2.0.1`.

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 35 | R.W1 → 2.0.0 | one honest major bundling every output-changing row | published; independent verifier 12/12 | LANDED |
| 36 | R.W2 K-INV5 | typed degraded-backend | literal fix **REFUTED by experiment**; functional kernel landed via save-P0, residual discharged at R.W3 `c4eb9d2` | REJECTED-then-LANDED-differently (honest) |
| 37 | R.W2 K-W3DIFF | PaletteDiff render surface | **REFUTED-AS-CONTRIVANCE** — no diff consumer exists; stored `atomDiff` write-only. Alt-exit taken at S.W5, physical routes excised at T.W1 | REJECTED-EXPLICITLY, then fully discharged — the model row |
| 38 | R.W5 hero-lab | a treatment | **KILLED at ratification by owner (Q1 FLIP)**; artifacts deleted `9ed9175`; the wave-letter gap kept deliberately | REJECTED-EXPLICITLY (exemplary record) |
| 39 | R.W7 X1 prod deploy | the wire serves HEAD | **NOT FIRED** — host webhook dead (`Hook not found.`); handed to the maintainer. 2nd carry | HALF-BAKED → chronic |
| 40 | R.W7 X2 NCSU alias retirement | alias dies | **NOT FIRED** — SSH times out off-campus. 2nd carry | HALF-BAKED → chronic |
| 41 | R.W7 X3 CF-Pages wire | first deploy | **GREEN** — run 28723903374, and *"CI itself went green for the first time in the unified workflow's history"* (`R/FINAL.md:195`) | LANDED |
| 42 | R §5 books (14 rows) | trigger-bound carries | handed intact to S §5 with per-row live re-probes | LANDED (the mechanism worked) |
| 43 | `srgbToLinear` decode defect | booked to the next output-changing cut | landed in S 3.0.0 with a by-name MIGRATION table | LANDED |
| 44 | `Color.try()` | demand-triggered | S: *"KEEP-BOOKED — soft signal now 12 demo try-wraps"*; T: PARK/DORMANT → hand to U; U: absent from the 77 families. **Absent from all V′ reformation docs** **(mine)** | **SILENT DROP** — §11 D-4 |
| 45 | glass-ui 5.0.0 adopt event | the joint cut | **WAITING** — carried R→S(W8)→T(W7)→U(U-F2, "the disease row") and finally executed at V′ W44 as **Glass 7.0.0**, never 5.0.0 | chronic, 4 tranches, resolved by the target moving |
| 46 | R.W0 W0-7 precepts submodule | commit + bump | **REVERT** with recorded rationale (superseded draft) | REJECTED-EXPLICITLY (good) |

---

## §6 — Tranche S (CLOSED 2026-07-06, `complete_with_misses`; 3.0.0 + 3.1.0)

Verified: `1537fed0` (3.0.0), `964c3992` (3.1.0), `4a6b62b5` (merge), tag `tranche-s-close`.

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 47 | S.W1 → 3.0.0 | full HDR perceptual slate | **published, then BLOCKED 9/11 by the independent gate** — ICtCp/Jzazbz shipped as conversion pairs only under a full-space claim; the CHANGELOG, the `v3.0.0` tag message and the wave artefacts all *"claimed the full integration — a dishonest record"* (`CHANGELOG.md:40-44`). Remediated at 3.1.0 | **HALF-BAKED, caught and cured; the recovery shape of record** |
| 48 | S.W2-3 Normalized/Display brand | a type brand | **DECLINED-mechanical by decision doc**, re-booked src-owned; carried to T | REJECTED-EXPLICITLY → then **KILLED with rationale** at T.W1 (`T/FINAL.md:181`) — clean 2-hop |
| 49 | S.W3 JS-eager ≤280 KiB | a hard budget gate | **unreachable; RE-BASELINED on record at 346.4 KiB (RP-2)**. Then 347.9 (S close) → 331.0 (T close) → still red at U → V′ CH-4, unexecuted | **the canonical moved-goalpost row**, 4 tranches |
| 50 | S.W5 `/remix`+`/diff` api deletion | physical route deletion | deferred as "a future api-hygiene pass"; discharged at T.W1 (`atomDiff` excised) | booked → LANDED |
| 51 | S.W8 glass 5.0.0 adopt | the adopt wave | **NOT DISPATCHED** — trigger never fired; wave doc handed to T intact | TRIGGER-NOT-FIRED (honest) |
| 52 | GAP-L2 aurora lightness atoms | producer ships | OPEN at S close, OPEN at T, OPEN at U (U-F5 relay). **Zero hits in `V/reformation/`** **(mine)** | **SILENT DROP** — §11 D-3 |
| 53 | GAP-ARM aurora cold-load arm-replay | producer one-line replay | OPEN at S close and explicitly *"user-visible on prod"* (`S/FINAL.md:210-215`). **Zero hits in `V/reformation/`** **(mine)** | **SILENT DROP** — §11 D-3 |
| 54 | GAP-L5 blob producer halves | HERO preset · `uSatColor[]` · satellites-at-rest | OPEN S → T → U-F5. **Zero hits in `V/reformation/`** **(mine)** | **SILENT DROP** — §11 D-3 |
| 55 | PRM-expand (kf `springPlay`) | dock expands under PRM | root-caused producer-side at S; U-F28 *"STILL-BOOKED (WATCH)"*; **zero hits in `V/reformation/`** **(mine)** | **SILENT DROP** — §11 D-3 |
| 56 | L20 `goo-blob/config` subpath | ≈ −33 KiB eager | OPEN at S; still the named blocker in T's Q14 escalation; V′ has no L20 row | **SILENT DROP** (mechanism survives inside CH-4) |
| 57 | 14 open GLASSUI-S-ASKS (L2..L16) | producer letter items | *"per-item live-verified table"* at S close; T carried them; U relayed some. No per-item ledger survives V′ | **SILENT DROP en bloc** |
| 58 | dup-`useDark` · PI-DRIFT-1 | successor demo lane | both **DISCHARGED at T.W1** with grep evidence | LANDED (books that worked) |
| 59 | S process lesson 5 | *"The cap sweep belongs in EVERY wave gate, not only the close"* | T then breached caps again at W6.5 and W8 (HG5, two files over 400) | LESSON RECORDED, NOT ENCODED |

---

## §7 — Tranche T (CLOSED 2026-07-13, `complete_with_misses`; no version cut)

Verified: `bdfb4a5e` (X1/X2 executed), `6e14e90c` (`T close: merge tranche-t → master`), tag
`tranche-t-close`. T is the last tranche whose work reached `master` (fact S-1).

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 60 | T.W0 | substrate + oracle floor + the §2 CI/deploy rider | 11/11 PASS, the only zero-miss wave in the corpus | LANDED |
| 61 | **X1 / X2** (R→S→T, 3rd carry) | prod lineage + alias retirement | **EXECUTED** at T.W0 `bdfb4a5e`, re-probed live at close: `/health` 200 `commit: 0441aba`, NCSU `/colors/` → 301. The maintainer-book class was killed by *ruling it executable* | **the model chronic-cure** — a 3-tranche book died by being re-classed, not re-booked |
| 62 | T.W1 colocation (E-1) | whole-tree colocation | landed across 3 trees (`f8e7eed`/`dfa46c4`/`77d21fc`) | LANDED — then **re-opened**: V′ POST-U-AUDIT A8 measures *"242/248 demo TS/Vue files remain under `demo/@`… modularization is path movement, not a DAG"* | HALF-BAKED (re-opened by measurement) |
| 63 | T.W1 row 6 / MOB-1 | `data-layout` witness stamped | **the one FAIL** — deferred to Fable with a ratified-vs-ratified conflict; discharged at T.W6 `a92f501` | FAIL → LANDED in-tranche (honest) |
| 64 | **Q14 PERF REDEMPTION** (the ruled close gate) | LCP ≤2500 / TBT ≤300, *"no re-baseline, no preset-swap, no deferral"* | **ESCALATION.** LCP 5141 ms (2.1×), TBT 5988 ms (20×). Root named: the eager WebGL blob engine before first paint; cure requires a producer cut that was unfired | ESCALATE → U.W-PERF → V′ CH-4/W55, **still unexecuted 2026-07-27** |
| 65 | T.W7 adopt event | glass 5.0.0 | **TRIGGER-NOT-FIRED** (2nd letter in a row) | TRIGGER-NOT-FIRED |
| 66 | T.W8 HG6 owner certification | the owner's taste verdict | **PENDING — the empty stub, delivered-but-unruled.** Carried into U bracket, then V′ bracket B5 *"owner-held, never proxied"*, still open | **PENDING ACROSS 3 TRANCHES** |
| 67 | T.W8 HG5 caps breach | demo ≤400 LoC | two W8-grown files at 411 and 408; booked a W9-handed re-encapsulation row | HALF-BAKED (S lesson 5 unlearned) |
| 68 | T-1..T-61 owner findings | zero silent drops | 61/61 routed: LANDED / booked-to-U-by-name / producer-gated / killed-with-rationale, each with a cite. **The best prompt-recap instrument in the corpus** | LANDED (method) |
| 69 | T `ROWS.md` LAND-row count | one number | *"the §4 enumeration and §1 pass tables count 29; its summary scalar reads '24' — the stale pre-P9 tally"* (`T/FINAL.md:136-137`) | counting drift, recorded not reconciled |
| 70 | T-56 palettes-ramp resolver | ramp legibility | *"the A-class resolver defect CONFIRMED — the ramp walks to a 0.02 near-black clamp, monochrome in light / 1.24:1 in dark"* — booked to U as an owner-uncertified still-red | CONFIRMED DEFECT, booked |

---

## §8 — Tranche U (CLOSED 2026-07-13, `complete_with_misses`; no tag, never merged)

U's close instrument is `FINAL.md` walking `DISPOSITION-LEDGER.md` row by row — 77 U-Fxx families,
gate-backed by `scripts/gates/proof-close-ledger.mjs`, family-audit invariant machine-confirmed
(every integer 1..77 exactly once). Verified: `755a089b` (G-ORACLE-1), `f0f29652` (G-ADOPT-1 armed).

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 71 | 77-family zero-drop walk | every family DECIDED with a terminal cite | delivered + machine-checked | LANDED (method) |
| 72 | U-F2 adopt-disease | "its own wave" per the disease law | **DECIDED over an unfired trigger** — gates ARMED born-RED, 0 flipped, cut never executed (3rd consecutive unfired adopt) | DECIDED-NOT-DONE |
| 73 | U-F3 Q14 | escalate | escalated as structural fact | ESCALATE (inherited from T) |
| 74 | U-F28 kf PRM-expand | retire on their next tag | *"STILL-BOOKED (WATCH)"* | accepted as terminal (see #78) |
| 75 | U-F54 real-GPU visual oracle | the headless slate flips | *"the headed-GPU slate never ran in 7 rounds (SwiftShader)"* → an **owner-attested annex** of 11 rows | NEVER RAN → attested |
| 76 | U-F42 3 armed `test.fail()` | cure-ownership | *"the 3 orphaned `test.fail()` 3→3 mapped BY NAME"* — mapped, not cured | ESCALATE, 3→3 |
| 77 | U-F61 single-sourced claims | flag every one | 4 named as attested-not-verified, never laundered green | LANDED (honesty instrument) |
| 78 | **U's terminality itself** | a close | V's own `audit/POST-U-AUDIT.md` A1 rules it: *"U accepted `STILL-BOOKED`, `complete_with_misses`, `DECISION-PENDING-OWNER`, relay records, and owner-attested visual rows at close. The close-ledger script treats those words as terminal evidence."* | **TERMINALITY LAUNDERING** — the gate validated vocabulary, not state |
| 79 | U-F63 npm-pack ships demo | tarball demo payload 9→0 | LANDED `6bed451` | LANDED |
| 80 | U-F50 tracked binary bloat | 58 MB heapsnapshot removed from tip | LANDED; history-rewrite BOOKED owner-decidable | LANDED-partial |
| 81 | U close ceremony | merge + tag | **never fired** — no `tranche-u-close` tag, 196 commits off master **(mine, fact S-1/S-2)** | **CEREMONY SILENTLY DROPPED** |

---

## §9 — Tranche V (re-formed as V′; 8 units closed, 10 waves + the frontend arc unexecuted)

V's own record calls the pre-reformation V a failure in its own words — `V-PRIME.md:12-20`:

> *"Of the 1.46MB living canon, ~30–35% specifies a proportionate product; the palette stack is
> ~70% speculative armor; 9 of 10 sampled waves cannot be executed from their own file; the
> convergence clock reached 2/2 twice and invalidated itself both times; **31 of 34 waves never
> started** while eight product chronics — two born in Tranche D — rode every close as
> decided-but-never-run rows."*

| # | Item | Promised (V-PRIME §2, 17 waves + 1 lane) | Landed | Class |
|---:|---|---|---|---|
| 82 | W40 Reconcile | dirty tree committed in owned slices | CLOSED (D46/D47) | LANDED |
| 83 | W41 Canon compression | living canon ≤ ~150 KB | CLOSED (D49) | LANDED |
| 84 | W42 Subtraction | prune meta-tests, wire the demo-typecheck re-gate | CLOSED (D48/D56) — but the CI **falsifier demonstration was waived** (`DISEASE-REGISTRY.md:197`: *"the exact demonstration W42 and W45 both waived"*) | LANDED-with-waived-proof |
| 85 | W43 Structure settlement (CH-3 dies here) | `demo/@` dies, panes 16→0, census 0 | CLOSED (D50–D53); commits `a61094e3` *"the feature UI trees; demo/@ dies"*, `6dc12aad` *"panes/ 16→0"* ✓ | LANDED — **but see #86** |
| 86 | W43 gate: *"import-graph census shows zero alias"* | zero dangling references | **the e2e corpus was outside the census and is import-broken to this day** (fact S-3, mine) | **HALF-BAKED — the gate's scope excluded the breakage it caused** |
| 87 | W44 Glass rail | Glass 7.0.0 adopted, routed mount witness green | CLOSED GREEN-WITH-RESIDUALS (D58); `f2c8f565`/`ef57230b`/`4c1e9270` verified ✓; CH-5 EXECUTION-TERMINAL | LANDED — the born-RED blank cured |
| 88 | W45 Palette honest core | 7 RED remediations + armor retirement | CLOSED (D55); 8 `v-w45` commits verified in `git log` ✓ | LANDED |
| 89 | W51 Palette export | 5 serializers byte-exact | CLOSED GREEN-PURE (D57); `d881eefc`+`1658ba8f` ✓ | LANDED |
| 90 | WL Library evolution | per-row ship/decline | CLOSED (D54): **1 ship + 7 declines** | LANDED |
| 91 | **W46 Constitution & chrome law (F0)** | seat/proportion/type law | **NEVER RAN** — `git log --grep 'W46'` → 0 commits **(mine)** | UNEXECUTED |
| 92 | **W47 Shell & scene (F1) — CH-6 gated** | 11 routes direct, dock scene 0px | NEVER RAN | UNEXECUTED |
| 93 | **W48 Picker instrument (F2)** | one settled routed frame; A137/A138 die | NEVER RAN | UNEXECUTED |
| 94 | **W49 Palette read (F3)** | card count = entity count | NEVER RAN | UNEXECUTED |
| 95 | **W50 Palette write (F4) — CH-8 UI half** | register→…→restore | NEVER RAN | UNEXECUTED |
| 96 | **W52 Admin suite (F6)** | 5 full-width routes | NEVER RAN | UNEXECUTED |
| 97 | **W53 Workbenches (F7)** | 5 features + B1 plate rebuild | NEVER RAN | UNEXECUTED |
| 98 | **W54 Atmosphere & GPU (F8) — D-1 aurora-derive** | *"derive-from-color RUNS or V′ does not close"* | NEVER RAN | UNEXECUTED — **and the L1 execution gate is therefore unmet** |
| 99 | **W55 Adversarial close — CH-4 / CH-7** | *"p75 LCP ≤2.5s… the ~5s boot dies or V′ does not close"*; *"the real-GPU oracle RUNS"* | NEVER RAN | UNEXECUTED — Q14 is now 3 tranches unredeemed |
| 100 | **W56 Release + canon** | ordered release, deploy, PROMPT-RECAP §7 terminal, writes `TRANCHE-CLOSED.md` | NEVER RAN — **no `reformation/TRANCHE-CLOSED.md` exists** | UNEXECUTED — **V is an OPEN tranche** |
| 101 | L1 execution gate (`V-PRIME.md:31-36`) | *"Their next legitimate state is a RUNNING wave with product-green Browser evidence. A further 'BUILD W##' row for any of them is the forbidden re-booking."* | 5 of the 8 disease riders (D-1, CH-4, CH-6, CH-7, CH-8-UI) sit in unexecuted wave rows; the mega-tranche is now authoring **`W.W1..W.W5`** rows for the same mechanisms (`DISEASE-REGISTRY.md:137,157,197`) | **THE FORBIDDEN RE-BOOKING, by V′'s own definition** |
| 102 | L3 standalone wave files | *"Every wave file is executable from itself plus ≤2 named references"* | the tail ships as **bundles**: `W46-W48.md`, `W49-W52.md`, `W53-W54.md`, `W55-W56.md` **(mine, `ls reformation/waves/`)** | law relaxed without a ruling |
| 103 | 4.0.0 capability cut | 7 explicit entries, no root, no shims | published; `CHANGELOG.md:3-30` is honest at class level | LANDED |
| 104 | 4.0.0 breaking-change discipline | the S 3.0.0 precedent: a **by-name MIGRATION table** | 4.0.0's breaking list names *classes* (`ValueUnit`, "raw color-conversion exports", "root-barrel internals") and **no individual symbol**. `sampleColorRamp`, `sampleColorRampAt`, `mixColorsInto`, `toRgba8Into` — each built to a named downstream requirement — vanish unnamed **(mine)** | **REGRESSION against S's own encoded lesson** |
| 105 | 4.0.0 as-published totality | a shipping library | **`@mkbabb/value.js@4.0.0` throws on the empty-argument form of every major CSS colour function.** `ROOT-FINDINGS.md:972-995`, npm-packed + installed through the real exports map: *"crashes: 7/10 … CRASH `oklch()` `rgb()` `hsl()` `lab()` `color()`"*; mechanism = one `!` at `src/css/grammar.ts:181` (corroborating MT-F024/MT-F001) | **BLOCKER SHIPPED** |
| 106 | CARRY-LEDGER's own claim | *"nothing lost: head, tail, or interval"* | 6 named S/T/U carries are absent from every reformation document (rows 44, 52–56) **(mine)** | **the fold ledger has holes** |

---

## §10 — Letter W (not a tranche)

| # | Item | Promised | Landed | Class |
|---:|---|---|---|---|
| 107 | `docs/tranches/W/` | — (no charter was ever written) | 16 history-audit files under `audit/history/` (A-D, E-H, I-L, M-P, Q-S, T, U, V-core, V-apotheosis, V-vnext, 4 CROSS lenses, DISEASE-REGISTRY, HISTORY-SYNTHESIS) | AUDIT ARTIFACT under a tranche letter |
| 108 | the letter's next use | the successor tranche | `DISEASE-REGISTRY.md` already writes `W.W1`…`W.W5`; `docs/tranches/W/` is occupied by audit output | **letter collision, unruled** |
| 109 | the history audit's self-verdict | trust it? | quoted in `megatranche/STATE.md`: *"THE RUNNING PRODUCT — zero passes. Not one of the fourteen seats booted the demo, walked a route, or looked at a rendered frame."* | the document axis is saturated; the execution axis is not |

---

## §11 — THE PAYLOAD: silent drops (promised, then never mentioned again)

A drop qualifies here only if it was (a) explicitly promised or built in N..W, and (b) absent from
the successor's carry instrument — not "declined", not "booked", not "killed with rationale".
**Absent.**

| ID | Dropped thing | Last named | Absent from | Proof |
|---|---|---|---|---|
| **D-1** | `sampleColorRamp` / `sampleColorRampAt` / `mixColorsInto` / `toRgba8Into` — published API built for named consumers (kf CC-2 densify; atlas ~3,243 marks/frame) | 1.2.0 CHANGELOG | src/, test/, and the 4.0.0 breaking list | `grep -rn "sampleColorRamp" src/ test/` → 0 hits; `grep -rn "mixColorsInto\|toRgba8Into" src/` → 0 hits; `CHANGELOG.md:264,404` are the only survivors **(mine)**. Rediscovered from the consumer side as V′ WL **SCI-1 "restore-or-bless"** — i.e. the library learned of its own removal from a downstream repo |
| **D-2** | O.W7 gamut-truth overlay + Parse-Lab | R.W3/R.W4 (built, fused) | demo/ today | `grep -rl "ParseLab\|parse-lab" demo/` → 0; `grep -rln "gamut-truth\|GamutTruth" demo/` → 0 **(mine)**. Retired by owner bracket B1 at W40 — the *overlay* retirement is ruled; the *Parse-Lab fuse into `ColorInput`* was never ruled and is simply gone |
| **D-3** | The five S-era producer gaps: **GAP-L2**, **GAP-ARM**, **GAP-L5** (incl. the N-era `uSatColor[]` ask), **PRM-expand**, **L20** | U (U-F5, U-F28, U-F3) | all of `V/reformation/**` | `grep -rn "GAP-L5\|GAP-L2\|GAP-ARM\|uSatColor\|PRM-expand" V/reformation/` → **0 hits** **(mine)**. GAP-ARM was recorded at S close as *"user-visible on prod"* |
| **D-4** | `Color.try()` | S §5 (12 demo try-wraps), T (PARK/DORMANT → hand to U) | U's 77 families; V′ canon | absent from `U/FINAL.md §A` and from `V/reformation/**` **(mine)** |
| **D-5** | The 14 open **GLASSUI-S-ASKS** (L2..L16) as a per-item ledger | S §5 (live-verified per item) | V′ canon | V′ §D carries only 4 glass rows, none of them the L-series **(mine)** |
| **D-6** | The **U close ceremony** (merge + `tranche-u-close` tag) | U close, 2026-07-13 | git | `git tag --list 'tranche-*'` → 3 tags, none for U; `git log --oneline master..tranche-u \| wc -l` → 196 **(mine)** |
| **D-7** | `inv-N-10` abrogation sweep as a standing pin-bump gate | N §6 | the W44 glass-7 adoption gate list | `CARRY-LEDGER.md:106-110` enumerates the W44 gates verbatim; no abrogation sweep among them |
| **D-8** | `proof:parse-lab-mount` | O `PROGRESS.md:58` | everywhere | a born-RED gate authored for a wave that never ran and never re-homed |

**Eight silent drops across ten letters.** Six of the eight cross the V′ re-formation boundary —
the single event in this history that discarded the most inherited state, under a ledger that
claims *"nothing lost: head, tail, or interval."*

---

## §12 — HALF-BAKED register (landed, then diverged; or a gate that moved to fit the result)

| ID | Row | The divergence |
|---|---|---|
| H-1 | N.W7.B tarball gate | promised `< 200 kB unpacked`, closed at 287 kB by rewriting the gate to `≤ 320 kB` in the same status line |
| H-2 | O.W7 → R.W4 Parse-Lab fuse | promised as a pane, downgraded to a fuse, built, then deleted without a ruling |
| H-3 | S.W1 3.0.0 | published + tagged + CHANGELOG'd as full HDR spaces while shipping conversion pairs; the independent gate caught it; 3.1.0 is the cure and the CHANGELOG carries the correction |
| H-4 | S.W3 JS-eager budget | 280 → re-baseline 346.4 → 347.9 → 331.0 → still red; four tranches, never met, never retired |
| H-5 | T.W1 colocation | landed whole in 3 trees; V′ POST-U-AUDIT A8 then measures `242/248` demo files still under `demo/@` and calls it *"path movement, not a DAG"* |
| H-6 | T caps law (S lesson 5) | lesson explicitly recorded at S — *"the cap sweep belongs in EVERY wave gate"* — and breached again at T.W6.5 and T.W8 |
| H-7 | V′ W43 census | *"zero alias"* certified while 7 e2e files kept importing the deleted `demo/@` tree; the e2e re-gate that would have caught it was assigned to W55, which never ran **(mine)** |
| H-8 | V′ W42/W45 CI re-gate | wired, but the one-time falsifier demonstration *"W42 and W45 both waived"* — a gate whose teeth were never tested |
| H-9 | 4.0.0 migration discipline | S encoded "never dribble breaks; publish a by-name MIGRATION table"; 4.0.0 published class-level prose and dropped four named APIs unnamed |
| H-10 | inv-N-7 phantom classes | closed at N.W5, re-opened the same day, routed to N.W14 — a wave that never executed |
| H-11 | U's terminality | 77/77 machine-verified "DECIDED" over a vocabulary in which `STILL-BOOKED` and `DECISION-PENDING-OWNER` count as terminal (V's own A1 ruling) |
| H-12 | U-F54 real-GPU oracle | *"never ran in 7 rounds"*; converted from a gate into an owner-attested annex |

---

## §13 — REJECTED-EXPLICITLY register (the healthy set — do not re-book these)

| Row | Rejection | Quality |
|---|---|---|
| R.W5 hero-lab | KILLED by owner at ratification; artifacts deleted; the wave-letter gap kept as the record of the kill | **model** |
| K-W3DIFF | REFUTED-AS-CONTRIVANCE by experiment; alt-exit taken at S.W5; physical routes excised at T.W1 | **model** — a rejection that was carried to physical completion |
| K-INV5 literal fix | refuted by a deletion-probe; the functional kernel landed by a different route | model |
| N.W9 v1.0.0 framing | PRUNED as obsolete (the version event had already shipped at O.W6); the phantom kf devDep premise REFUTED | good |
| N.W7 `lerpArray` demote | KEEP — premise refuted by the kf consume-edge | good |
| S.W2-3 Normalized/Display brand | DECLINED-mechanical by decision doc → **KILLED with rationale** at T.W1 (a permanent constraint) | good — 2 hops, terminal |
| V′ B2 armor retirement | ~70% of the palette spec RETIRED-AS-SPECULATIVE, *"re-formation is explicitly not a BANK"* | good |
| VJ-CSS2 `sibling-index()` | probed, found already-parsing, pinned by tests, no new arm | good |
| Q L6 `color-contrast()` stub | deleted at the grammar source, no shim | good |
| WL (V′) | 1 ship + 7 declines-with-rationale | good |
| D-15 fourier / D-GAP-6 keyframes | DECLINE ACCEPTED by the consumer, marked terminal | good |

---

## §14 — Tallies

Counting rule: the numbered rows §1–§10 (1..109) plus the four §0 structural facts are the
disposition rows. The §11/§12/§13 registers are **re-groupings** of those same rows, not new ones —
so the 13 silent-drop rows below collapse into 8 payload IDs, and the 11 half-baked rows into 12
register entries (H-7/H-8 split V′ row 84/86 by mechanism).

| Class | Rows |
|---|---:|
| LANDED (clean) | 38 |
| LANDED-partial / FOLDED / landed-by-a-different-route | 6 |
| HALF-BAKED (landed-then-diverged, or a gate that moved) | 11 |
| REJECTED-EXPLICITLY (healthy) | 7 |
| **SILENT DROPPED** | **13 rows → 8 payload IDs** |
| UNEXECUTED (specced, ratified, never ran) | 10 |
| DIED un-implemented (zero impl commits) | 1 |
| TRIGGER-NOT-FIRED / DECIDED-NOT-DONE | 3 |
| GATE THAT NEVER RAN / teeth never tested | 3 |
| ESCALATED and still open | 3 |
| PENDING-ON-OWNER across ≥3 tranches | 1 |
| Structural / record-integrity findings (incl. the four §0 facts) | 17 |
| **Total disposition rows** | **113** |

| Closure hygiene | N | O | P | Q | R | S | T | U | V | W |
|---|---|---|---|---|---|---|---|---|---|---|
| `FINAL.md` exists | ✓ (late) | **✗** | ✓ (late) | ✓ (late) | ✓ | ✓ | ✓ | ✓ | **✗** (no `TRANCHE-CLOSED.md`) | **✗** (not a tranche) |
| close tag | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | **✗** | **✗** | — |
| merged to master | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | **✗** | — |
| version cut | 0.12.0 | 0.13.1→1.0.2 | 1.1.0 | 1.1.1/1.2.0 | 2.0.0 | 3.0.0/3.1.0 | none | none | 4.0.0 | — |
| waves promised | 9 + 11 | 8 | — | — | 8 | 10 | 11 | 10 | 34 → 18 | — |
| waves executed | 9 + 2 | 7 | — | — | 7 (1 killed) | 9 (1 unfired) | 10 (1 unfired) | 10 | **8** | — |

---

## §15 — The three consequences a wave author must carry from this dig

1. **The re-formation boundary is the leak.** Six of eight silent drops crossed exactly one event:
   the V′ re-formation of 2026-07-16/17. It compressed 1.46 MB of canon to ~150 KB and, in doing so,
   dropped the S/T/U producer-gap book table and two published library APIs. Any future compression
   must diff its inputs against its outputs and publish the delta — the CARRY-LEDGER's promise
   ("nothing lost: head, tail, or interval") was made but never proved.

2. **V is not closed, and the letter after it is already occupied.** `W56` never ran, no
   `TRANCHE-CLOSED.md` exists, no tag, 196 commits off master — while `docs/tranches/W/` holds audit
   output and `DISEASE-REGISTRY.md` writes `W.W1..W.W5` for the next tranche. The naming and the
   merge topology both need an owner ruling before any wave is authored.

3. **Three gates have never once been executed against reality**: the Q14 LCP/TBT budget (T→U→V′,
   escalated twice, `W55` unrun), the real-GPU visual oracle (U-F54, "never ran in 7 rounds", V′
   CH-7 unrun), and the e2e suite as a whole (import-broken since W43, its re-gate assigned to the
   unrun W55). Every taste, perf, and a11y claim made since 2026-07-13 rests on instruments that
   have not run. A wave set that opens without repairing those three is authoring over a void.
