SERVED MODEL: claude-opus-5-5

# X close — LEDGER-FINAL (G1 · the terminal carry-cut state table)

**Unit**: X.W11.a · Track A (X·V) · wave X-W11 · **Date**: 2026-10-18 (sitting of record 2026-09-17,
COHESION §0j). **This file mirrors** `docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md` **§4**
row for row and cell for cell; the extractor in §A fails if the two diverge. One table, every carry-cut
row's terminal state, readable without opening another document (W11.md X.W11.a _Goal_).

**Beside it, never inside it** (fold S1 · W11.2): the registry's own accounting —
`docs/tranches/X/close/BOUNDARY-CARRY.md` (G16, 34 + 1 conditional NO-WAVE-OWNER rows) and
`docs/tranches/X/close/evidence/registry/g14-adjudicated-landed.json` (G14, the ADJUDICATED→landed
map). Neither enters the 118.

**Authority**: `docs/tranches/X/waves/W11.md` §Agent Units X.W11.a (`:119-131`), G1 (`:180-192`),
Dispositions (`:366-374`); `docs/tranches/X/refinement/X-W11-FOLD.md` §2a S1. Sitting of record
2026-09-17 (COHESION §0j). **E-3 form**: an append after the file's last byte; §0–§3 and both earlier
dated appends are untouched. Mirror: `docs/tranches/X/close/LEDGER-FINAL.md` (same rows, same cells).

**Denominator: 118** = the 117 rows of §1 + **CC-118** (the 2026-09-17 dated append, COHESION §0k.3
S-8). W11.md's "117" predates that mint; the walk takes every row that has a §1-or-append origin.

**The four terminal words** (one per row, each with its argument): **VERIFIED** `<commit>` (each hash
resolves by `git cat-file -e`; the owning wave's cure commit, or for a FOLD-to-wave row the wave's
authoring and/or CLOSED-promotion commit) · **RETIRED** `<tombstone path>` (authored by the owning
wave or producer; X-W11 authors none) · **BLOCKED-ON** `<exact release condition>` + a re-trigger
command · **DEGRADED-TO-BOUNDARY** `<row-id>` (fold S1; the row moves to
`docs/tranches/X/close/BOUNDARY-CARRY.md`). The §1.M bank's eleven conditions are copied from §1
**verbatim** (L-4) and stay BLOCKED-ON; a "measured at walk" note beside each records the trigger's
reading at the installed bytes and never changes the word. A VERIFIED word here is the row's landed
and gate-proven state; the per-wave **VERIFIED stamp** remains X-W11's R-A act at `.e`.

**Counts, read from the rows below**: VERIFIED **83** · RETIRED **18** (the 17 RETIRE rows + CC-029,
whose own disposition retires it at close with a tombstone) · BLOCKED-ON **17** (the 11 §1.M rows +
CC-010 · CC-033 · CC-035 · CC-036 · CC-059 · CC-067) · DEGRADED-TO-BOUNDARY **0** · total **118**.

<!-- prettier-ignore -->
| # | terminal word | argument | re-trigger | home · note |
|---|---|---|---|---|
| CC-001 | **VERIFIED** | `c9aa1fdf4` (graph v3 + frontend denominator, X-W0.h) · `549353fd0` (completeness split, X-W0.c) · close `d5ac877c2` | — | FOLD → X-W0; X-W0 CLOSED (honest-RED HG-8 byte-diff clause, ESC-N1) |
| CC-002 | **VERIFIED** | `c4af0ef9` | — | carried in, not re-proven (W11.md Dispositions) |
| CC-003 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON** (re-derived against I-21 per C-07): installed `@mkbabb/glass-ui` major **≥ 8** AND `./watercolor-dot` **absent** from packed exports AND the **consumer-painted indicator slot (TR#84)** present in declarations + packed exports AND the Glass receipt names its keyboard/orientation/motion contract — all four machine-checked before the writer opens product source. Under I-21 the trigger also inherits: **no chassis arms exist at 8.0.0** (A-17), the repin census is one event (no repin, no shim, no copied selector before it). The glass-independent remainder partitions to X-W4 (CC-040..047) | census conditions 1–2: `node -p "const p=require('./node_modules/@mkbabb/glass-ui/package.json');[+p.version.split('.')[0]>=8,!Object.keys(p.exports).some(k=>/watercolor/.test(k))].join()"` (`true,true` at walk) · condition 3: `grep -rn indicator node_modules/@mkbabb/glass-ui/dist --include='*.d.ts' \| grep -ic slot` (0 at walk; fires ≥ 1) · then condition 4's receipt read and the census PASS line | §1.M bank; measured at walk (glass 10.1.0 installed): c1 TRUE · c2 TRUE (`./watercolor-dot` ABSENT) · c3 FALSE (slot 0) — not fired |
| CC-004 | **VERIFIED** | close `3e933c332` | — | FOLD → X-W5 (V·MT3 re-homed); X-W5 CLOSED honest-RED (g2 · B3 · A3 · C3 · C7 · A5-OUTLINE · o12 · D1) |
| CC-005 | **VERIFIED** | close `e24361c6d` | — | FOLD → X-W6 (V·MT4); X-W6 CLOSED honest-RED (B1-G3D · g1 · I3-SEED-SIZE) |
| CC-006 | **VERIFIED** | close `a994800cc` | — | FOLD → X-W7 (V·MT5); X-W7 CLOSED honest-RED (G3 · G11 · G14-grep · C-5/NG-6) |
| CC-007 | **VERIFIED** | close `6eb8f0268` | — | FOLD → X-W8 (V·MT6); X-W8 CLOSED honest-RED (ink D6/T-35 → O-62 (a) · DOCK-SCROLL-MORPH → O-55) |
| CC-008 | **VERIFIED** | close `03f76440f` · cut `f3fccfb76` | — | FOLD → X-W9 (V·MT7); X-W9 CLOSED honest-RED (G3 · G12, relieved §0ac) |
| CC-009 | **VERIFIED** | close `7466ed9e5` | — | FOLD → X-W10 (V·MT8); X-W10 CLOSED |
| CC-010 | **BLOCKED-ON** | X-W11's own completion law: W11.md §6 G2–G12 + fold §2b G13/G15/G17 GREEN or relieved at X-W11's release close (units `.b` `.c` `.d` `.h` `.e`) and the R-A stamp act (`.e`); this §4 table is its G1 act | `grep -c '^\| X-W11 .*CLOSED' docs/tranches/X/execution/LEDGER.md` (0 at walk; fires at 1) | FOLD → X-W11; terminal at `.e`'s close, not here |
| CC-011 | **RETIRED** | `docs/tranches/X/W0/ROUTING-LAW-V-L5.md` | — | executed at X-W0.i (`2012dbfa5`) |
| CC-012 | **VERIFIED** | `befbc05a3` | — | X-W0.a track-or-archive |
| CC-013 | **VERIFIED** | `5937b6de0` | — | X-W0.b prompt recap as tracked canon |
| CC-014 | **VERIFIED** | `f7197d716` | — | X-W0.g owner sitting (seven rows ruled) |
| CC-015 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-1) | — | X-W0.f `b5673ae03` |
| CC-016 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-2) | — | X-W0.f `b5673ae03`; verb DELETE (COHESION §0j.A) |
| CC-017 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-3) | — | X-W0.f `b5673ae03` |
| CC-018 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-4) | — | X-W0.f `b5673ae03`; option (a) at the X-W0.g sitting |
| CC-019 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-6) | — | X-W0.g `f7197d716` |
| CC-020 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-7) | — | X-W0.g `f7197d716` |
| CC-021 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-8) | — | RETIRED-BY-ASSIGNMENT; `scripts/dev/dev.sh` NEVER-touch permanent for X (DR-24) |
| CC-022 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-5) | — | X-W0.f `b5673ae03`; FIXED at kf 6 |
| CC-023 | **RETIRED** | `docs/tranches/X/W0/TOMBSTONES.md` (TS-9) | — | X-W0.g `f7197d716`; the permanent 301 accepted in canon |
| CC-024 | **VERIFIED** | `c9aa1fdf4` | — | FOLD → X-W0.h (frontend denominator authority) |
| CC-025 | **VERIFIED** | `58be3626` · `549353fd0` · repair `de85e26c1` | — | X-W0.c completeness toolchain; HG-7 cured at X-W0.k |
| CC-026 | **VERIFIED** | `9f4b22a72` | — | X-W0.d 7e28 census (126/126 accounted) |
| CC-027 | **VERIFIED** | `af03de5c2` | — | X-W0.e three axes re-run + motion quarantine |
| CC-028 | **VERIFIED** | `338c513b` | — | carried in, not re-proven (W11.md Dispositions) |
| CC-029 | **RETIRED** | `docs/tranches/X/evidence/w1/real-gpu/TOMBSTONE.md` | — | real-GPU half retired `20a7b6230` (its own disposition: no session → RETIRED with tombstone); software-GL half = CC-030 (`e2347c0e5`) |
| CC-030 | **VERIFIED** | `e2347c0e5` | — | X-W1.b `e2e/visual/` — 207 goldens committed |
| CC-031 | **VERIFIED** | `ec6541584` · falsifier `dfc65a3e1` | — | X-W1.a verification surface; one-time falsifier demonstrated (run 35388604746) |
| CC-032 | **VERIFIED** | `cad51f9e7` | — | X-W1.c boot-smoke both modes (re-read GREEN at X-W11 open, 8/8 + 8/8) |
| CC-033 | **BLOCKED-ON** | one non-skipped, successful `deploy-pages` run at a master commit that is an ancestor of the release tag, and production re-probed for the released build (X-W1 honest-RED G-19 · G-20; X-W11 G6 is the receiving cell, unit `.c`) | `gh run list --workflow deploy-pages.yml --limit 5 --json conclusion,headSha` (3/3 `skipped` at X-W11 open; fires on a `success` row) | merge landed `04d2d8089` (G-18 GREEN); deploy arm never fired |
| CC-034 | **VERIFIED** | `7bc728389` | — | X-W1.d deploy resolves glass-ui from the registry |
| CC-035 | **BLOCKED-ON** | glass blob `settled` reachable within the fixture window on software GL (producer `blob.js` quiescence predicate — b-F1/b-F2 at the glass BH/BI relay); then the wall-clock park retires (X-W2 honest-RED G5, §3a "Quiescence does not park") | `grep -rnE "BLOB_IDLE_MS\|SLEEPY_POSE_MS" demo/ e2e/ \| wc -l` (26 at X-W2 Check 2; fires at 0 after the producer cure) | value half landed: G1 GREEN (boot-path `glass-ui/blob` 3 → 0), G8 `BLOB_HERO` tombstoned |
| CC-036 | **BLOCKED-ON** | p75 TBT ≤ 300 ms over N ≥ 20 on `mobile-4x-cpu` at a quiescent bench or X-W1's pinned `ubuntu-24.04` job (X-W2 honest-RED G3, §11 guardrail 2) | the W2.md G3 probe: `e2e/smoke/perf/serve-built.mjs` + the N=20 TBT run (1,137 ms at X-W2 Check 2; fires ≤ 300) | G2 · G4 · G6 · G7 GREEN; Q14 numbers SUPERSEDED |
| CC-037 | **VERIFIED** | `504819eac` | — | X-W3.6 fail-closed admin guard; Stub-render limb handed to X-W5 (CC-049) by W3.md D-4 |
| CC-038 | **VERIFIED** | `326dbe579` · `9b3e6923b` · `0324197ed` · `66537044f` · `d7e5f30c1` · `22d2eb650` · `fcf51523f` | — | X.A1..X.A5 in forced order; X-W3 CLOSED honest-RED G-21 only |
| CC-039 | **RETIRED** | `docs/tranches/X/contracts/WRITE-CONTRACT.md` | — | recorded as a deployment fact at `47ea10290` (X.A3 · D-3) |
| CC-040 | **VERIFIED** | `8934de857` | — | X-W4.a shell control geometry; X-W4 CLOSED, honest-RED set EMPTY |
| CC-041 | **VERIFIED** | `8934de857` | — | X-W4.a (A4 naming) |
| CC-042 | **VERIFIED** | `666978d4c` | — | X-W4.c gradient stop keyboard grammar (C1–C4) |
| CC-043 | **VERIFIED** | `e64002e9c` | — | X-W4.d one owner-tokened SceneActionSet |
| CC-044 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON CC-003's trigger** — one atomic cut: delete every `watercolor-dot` import, native button owns click/focus/name/disabled/keyboard, paint-only local `WatercolorSwatch` into the TR#84 slot; no pre-8 wrapper (a second migration is forbidden) | census conditions 1–2: `node -p "const p=require('./node_modules/@mkbabb/glass-ui/package.json');[+p.version.split('.')[0]>=8,!Object.keys(p.exports).some(k=>/watercolor/.test(k))].join()"` (`true,true` at walk) · condition 3: `grep -rn indicator node_modules/@mkbabb/glass-ui/dist --include='*.d.ts' \| grep -ic slot` (0 at walk; fires ≥ 1) · then condition 4's receipt read and the census PASS line | §1.M bank (CC-003's trigger); measured at walk: `glass-ui/watercolor-dot` importers in `demo/` = 0 (relocated to `demo/shared/ui/watercolor-dot/` by the 10.x repin, X-W7L); trigger not fired (c3 = 0) |
| CC-045 | **VERIFIED** | `8934de857` | — | X-W4.a (A3 `size="xs"` adopt) |
| CC-046 | **VERIFIED** | `583715162` | — | X-W4.b (B3) |
| CC-047 | **VERIFIED** | `583715162` | — | X-W4.b (B1 · B2 SelectTrigger titles via LabeledField) |
| CC-048 | **VERIFIED** | `adc312f64` | — | X-W5.b block law (B4 GREEN); B3 relieved/routed → X-W6 (CC-056) |
| CC-049 | **VERIFIED** | `50633f195` · `fdf3e9e07` | — | X-W5.c one mount, ordered regions; C3 fork census routed → X-W8 `.i` (`82bd72d2f`) |
| CC-050 | **VERIFIED** | `de99ec156` | — | X-W5.a one route H1 (A5 GREEN; A5-OUTLINE relieved/routed → X-W10) |
| CC-051 | **VERIFIED** | `50633f195` · `82bd72d2f` | — | block-axis half X-W5.c + the C3 viewport forks deleted at X-W8 `.i`; inline-axis half rides CC-056 |
| CC-052 | **VERIFIED** | `e2f56558f` | — | X-W5.e P-1 exact Browse/Library posture (E1 · E2 GREEN) |
| CC-053 | **VERIFIED** | authoring `e0346d0c6` · close `3e933c332` | — | FOLD → X-W5 wave authoring (consumes `registry/adjudicated/App.md`) |
| CC-054 | **VERIFIED** | `2183b814f` · `bdee09cec` | — | X-W5.d frame-budget oracle; D1 GREEN of record (headed real GPU) |
| CC-055 | **VERIFIED** | `2183b814f` · `52dc0a5b5` | — | X-W5.d scene motion; dock-layer half rides CC-080 (`15932a93a`) |
| CC-056 | **VERIFIED** | `17dd0df47` | — | X-W6.j Gradient pilot → Mix canary → adoption |
| CC-057 | **VERIFIED** | `17dd0df47` · `177301823` | — | X-W6.j; J4-SHORT-LANDSCAPE-BLOB marker retired at `177301823` (property holds, X-W12U) |
| CC-058 | **VERIFIED** | `f90aeb029` · `7dff25f6b` · `e07bff630` · `b1c5ff34` | — | X-W6.a/.b/.c; residual: b1 `B1-G3D` honest-RED-by-instrument (§0ax) — the roster re-point of G3d is X-W11's browser cell (`.d`); D-6/D2-16 limb → bank (CC-044) |
| CC-059 | **BLOCKED-ON** | the picker card's last failing interval (`demo/picker/seat.css:84` `gap: calc(var(--spectrum-stamp) + 1rem)`, authored by the X-DS program `082e1abbd` after X-W12 measured g1 GREEN) re-derived on the spacing canon — ESC-W10-g1-1, owner the orchestrator (X-W6 honest-RED g1 → X-W10 `.g1` `db364be64`) | `CARD_RHYTHM_ORIGIN=<served origin> node docs/tranches/V/megatranche/audit/probes/x-w6/gate-card-rhythm.mjs` (`GATE g1 — RED: 1 interval(s) fail` at X-W10; fires on GREEN) | readout dead band cured at `82ba99e19` (X-W12 `.d`) |
| CC-060 | **VERIFIED** | `9557e6b56` | — | X-W6.d d1 one derived radius register |
| CC-061 | **VERIFIED** | `a87f89303` | — | X-W6.h h1/h2 GREEN (sRGB buffer; `H1-P3` honest-RED-by-physics, §0aq) |
| CC-062 | **VERIFIED** | `e69aaf95f` · `4233e83e` | — | X-W6.g g2 GREEN ×3 (`.s2` settle read, §0ba W5D4-SETTLE-READ) |
| CC-063 | **VERIFIED** | `78af2c6a9` | — | X-W6.d d2 GREEN (DATED ASK · local restyle 0) |
| CC-064 | **VERIFIED** | `3c5589561` | — | X-W6.e structural PRM, no private rAF |
| CC-065 | **VERIFIED** | `e68e8889b` · tombstone `c2f17badc` | — | X-W6.i i1; DR-01 RETIRED-AS-LANDED tombstone first |
| CC-066 | **VERIFIED** | `4cb294b97` | — | X-W6.i i2 dark lBand door REACHABLE |
| CC-067 | **BLOCKED-ON** | the glass producer's pre-module derive seed (O-53; the §0ay (a) IIFE measures 50,989 B gzip > the 12 KB bar) — cold-load first painted atmosphere = seeded pick (X-W6 honest-RED i3 `I3-SEED-SIZE`) | `npx playwright test e2e/smoke/oracles/o28-atmosphere-coldload.spec.ts --project=smoke --workers=1` (1 failed at X-W6 Check 1; fires on pass) | oracle landed `e68e8889b`; cure banked unlanded `d30ac9371` |
| CC-068 | **VERIFIED** | `e0e204a9b` | — | X-W6.f X:CSS-1 one total space catalog (f1–f10 GREEN) |
| CC-069 | **VERIFIED** | `877710a23` | — | X-W7.c shadow silhouette + hover register; G11 goldens honest-RED → X-W10 |
| CC-070 | **VERIFIED** | `b970fe963` | — | X-W7.f display formatting facility |
| CC-071 | **VERIFIED** | `41002df50` · `8fe6a2db4` | — | X-W7.g OM-15 abrogation (G19) + ShadowPalette plate (G20) |
| CC-072 | **VERIFIED** | `9250dd192` · `76a4d1cf7` | — | X-W7.c arbitrary-N law + N-fixtures battery |
| CC-073 | **VERIFIED** | `cb03d5714` · `486689477` · `1d4d375bf` | — | X-W7.b export truth + X-W7.d UI half |
| CC-074 | **VERIFIED** | `9250dd192` | — | X-W7.c consumer-side priority-collapse; producer revival stays glass-owned |
| CC-075 | **VERIFIED** | `4cb3d4869` | — | X-W7.e deliberate dismissal; G14 grep honest-RED at X-W7 discharged by the 10.x repin (12 sites at walk) |
| CC-076 | **VERIFIED** | authoring `e0346d0c6` · close `a994800cc` | — | FOLD → X-W7 wave authoring (Admin DAG rows → G13–G15) |
| CC-077 | **VERIFIED** | authoring `e0346d0c6` · close `a994800cc` | — | FOLD → X-W7 wave authoring (palette apotheoses) |
| CC-078 | **VERIFIED** | `62bc3fbde` · census `17090b54a` | — | X-W8.a/.b — 19 barrels deleted; C-16 re-measure recorded |
| CC-079 | **VERIFIED** | `9b92f36c9` | — | X-W8.c four SCCs closed by ownership |
| CC-080 | **VERIFIED** | `15932a93a` | — | X-W8.d `useLayerTransition` shim retired clean-break |
| CC-081 | **VERIFIED** | `62bc3fbde` · `15932a93a` · `42727db0f` | — | limbs distributed: Button/Skeleton/dead-surface/overlay at X-W8 (G-9 · G-10 · G-11); Checkbox at X-W7; ICtCp at X-W9.h |
| CC-082 | **VERIFIED** | `df5737679` | — | X-W8.e LoC cap ruled WIRED (G-14) |
| CC-083 | **VERIFIED** | authoring `e0346d0c6` · `15932a93a` | — | FOLD → X-W8 wave authoring; the crossfade row co-landed with CC-080 |
| CC-084 | **VERIFIED** | `97ab39916` · `c18a78f81` · cut `f3fccfb76` | — | X-W9.a typed failure at `grammar.ts:181` (R1); G3 relieved by leg-scope ruling ESC-W9a-G3-LEG-SCOPE (§0ac) |
| CC-085 | **VERIFIED** | `474846cec` | — | X-W9.b path totality |
| CC-086 | **VERIFIED** | `0e37318e4` | — | X-W9.g canon doc-diff |
| CC-087 | **VERIFIED** | `0e37318e4` | — | X-W9.g parse-that position recorded under the readopt decree |
| CC-088 | **VERIFIED** | `f3fccfb76` | — | X-W9.f SCI-1 in the same dated 4.1.0 cut as CC-084 |
| CC-089 | **VERIFIED** | `42727db0f` | — | X-W9.e external colour vectors; circular oracle renamed |
| CC-090 | **VERIFIED** | `c8848bed2` | — | X-W9.d stylesheet split (RD-9) |
| CC-091 | **VERIFIED** | authoring `e0346d0c6` · close `03f76440f` | — | FOLD → X-W9 wave authoring (library-band W.L1..W.L7) |
| CC-092 | **RETIRED** | `docs/tranches/X/execution/A/X-W9.md` (X-W9.f DECLINE at the bytes, `:4131`) | — | CLOSED-DECLINED; runnable second-consumer re-trigger preserved |
| CC-093 | **RETIRED** | `docs/tranches/X/waves/evidence/W9/close-gates-2026-09-18.txt` (G26 fence = 0) | — | prune list + G26 fence |
| CC-094 | **RETIRED** | `docs/tranches/X/waves/evidence/W9/matrix-family-census.md` | — | X-W9.b `4be221892`; `PathGeometry` preserved |
| CC-095 | **RETIRED** | `docs/tranches/X/parse-that/evidence/W1/BAR-LEDGER-2026-09-17.md` | — | superseded by G28's three-leg bar |
| CC-096 | **VERIFIED** | authoring `e0346d0c6` · close `03f76440f` | — | FOLD → X-W9 wave-open staged reading (G1–G4 · G19 · G28) |
| CC-097 | **VERIFIED** | authoring `e0346d0c6` · close `03f76440f` | — | FOLD → X-W9 gate contract (G28 restatement rule) |
| CC-098 | **VERIFIED** | `3bb272f05` | — | X-W10.c `demo/DESIGN.md` re-authored from the twice-authored apotheosis (G-1 · G-2 · G-3) |
| CC-099 | **VERIFIED** | `b5727dcb7` | — | X-W10.d PRM-scoped scroll-driven motion (G-4) |
| CC-100 | **VERIFIED** | `3bb272f05` | — | X-W10.e G-6 — canon limb (Laws M-1..M-3); facet limb discharged |
| CC-101 | **VERIFIED** | `b5727dcb7` | — | X-W10.d condense spacing register (G-5) |
| CC-102 | **VERIFIED** | `8f04b4d5d` | — | X-W10.f producer-contract citation (G-7) |
| CC-103 | **RETIRED** | `docs/tranches/X/execution/A/X-W10.md` (X.W10.f DR-13 survivor table, one terminal verb per row) | — | bundle retired at `8f04b4d5d`; G-8 GREEN ×2 |
| CC-104 | **VERIFIED** | `505429cac` | — | FOLD → X-W10 open precondition; discharged by COHESION §0k.2 (substitute recorded `1f4fdf996`) |
| CC-105 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON the 8.0.0 repin census event**: migrate the 4 sites + collapse the twins in the SAME census; no pre-repin shim, no copied selector | a dated census returning PASS at its elected target: `grep -rlE '^> ## \*\*PASS' docs/tranches/X/W0/ \| wc -l` (0 at walk — X-W0.j reads FAIL 1/4; fires ≥ 1) | §1.M bank; measured at walk: `--slider-track-bg` in `demo/` = 0 (migrated to `--glass-slider-track-background` by the 10.x repin, X-W7R/X-W7L); the twins-collapse limb unmeasured; no census since X-W0.j |
| CC-106 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON the #35 adopt at the 8.0.0 repin census** — deletion rides the same cut | a dated census returning PASS at its elected target: `grep -rlE '^> ## \*\*PASS' docs/tranches/X/W0/ \| wc -l` (0 at walk — X-W0.j reads FAIL 1/4; fires ≥ 1) | §1.M bank; measured at walk: `useSliderAnnouncements.ts` still tracked (1); `getValueText` in glass dist = 0 |
| CC-107 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON TR#47's dock publish** — the probe retires against the shipped pair | `grep -rl 'glass-tint-source' node_modules/@mkbabb/glass-ui/dist \| wc -l` (0 at walk; fires ≥ 1) | §1.M bank; measured at walk: `--glass-tint-source` in glass dist = 0; `paintedTintOf` in `demo/` = 0 |
| CC-108 | **RETIRED** | `../glass-ui/docs/tranches/BJ/coordination/glass-outbound-2026-07-29-o19-receipt.md` | — | RETIRED-BY-PRODUCER (A-17 chassis death); producer-authored receipt, INBOX I-21 |
| CC-109 | **VERIFIED** | `ad240462c` | — | FOLD → glass seat; DISCHARGED BY THE VERDICT at the X-W0.j census (`GLASS8-REPIN-CENSUS.md` §9.1) — transposed verbatim |
| CC-110 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON TR#47's resolution** — then retire DockStatusLamp's wrong-question viewport fallback our side | `grep -rn '@container dock' node_modules/@mkbabb/glass-ui/dist \| wc -l` + the TR#47 resolution in a dated census | §1.M bank; measured at walk: `@container dock` in glass dist = 0 (resolution-by-deletion is possible; the receiving surface confirms) |
| CC-111 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON that publication** — then delete the hand-copied `44.9375rem` from both bespoke skeletons | a dated census returning PASS at its elected target: `grep -rlE '^> ## \*\*PASS' docs/tranches/X/W0/ \| wc -l` (0 at walk — X-W0.j reads FAIL 1/4; fires ≥ 1) | §1.M bank; measured at walk: `44.9375rem` in `demo/` = 0; the publication itself unconfirmed |
| CC-112 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON TR#78's canon publication**; X-W10 cites the named contract meanwhile (CC-102) — no consumer reads dist to write its canon again | a dated census returning PASS at its elected target: `grep -rlE '^> ## \*\*PASS' docs/tranches/X/W0/ \| wc -l` (0 at walk — X-W0.j reads FAIL 1/4; fires ≥ 1) | §1.M bank; X-W10 cites the named contract meanwhile (CC-102); X-W10's close carries CC-112 BLOCKED-ON TR#78 unchanged |
| CC-113 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON TR#84 ⊕⁷ (+#32/#71 twins)**: the consumer-painted indicator slot at 8.0.0, both orientations — we paint the relocated `WatercolorSwatch` into it and inherit the bounce (loupe grammar at #35/#32/#71, #26 the one spring authority); **no watercolor bytes return to the library** | condition 3: `grep -rn indicator node_modules/@mkbabb/glass-ui/dist --include='*.d.ts' \| grep -ic slot` (0 at walk; fires ≥ 1), both orientations, then the census PASS line | §1.M bank; measured at walk: c3 slot = 0 — not fired |
| CC-114 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON glass TR#22 ⊕⁷** (`--glass-shadow-capsule` indirection, witness #47); consumer adopt at the 8.0.0 repin census; no local patch (masking-fallback ban) | `grep -rl 'glass-shadow-capsule' node_modules/@mkbabb/glass-ui/dist \| wc -l` + CENSUS | §1.M bank; measured at walk: `--glass-shadow-capsule` present in 3 glass dist files at 10.1.0 — the producer limb may have SHIPPED; the consumer adopt awaits the repin census (X-W4.g) |
| CC-115 | **BLOCKED-ON** | verbatim §1.M — **BLOCKED-ON TR#87 shipping at 8.0.0**; consumer adopts at the repin census; the interim consumer formatting rides CC-070's facility | `grep -rlE 'coalesceMetric\|coalesce-metric' node_modules/@mkbabb/glass-ui/dist \| wc -l` + CENSUS | §1.M bank; measured at walk: `coalesce-metric` present in 4 glass dist files at 10.1.0 — the producer limb may have SHIPPED; the consumer adopt awaits the repin census (X-W4.g) |
| CC-116 | **VERIFIED** | `ad240462c` | — | FOLD → glass TR seats; DISCHARGED BY THE VERDICT (`GLASS8-REPIN-CENSUS.md` §9.2), 31/31 stand as received — transposed verbatim |
| CC-117 | **VERIFIED** | `ad240462c` | — | EVIDENCE-ONLY · FOLD → coordination INBOX row I-24 · NO VALUE ACT · NO X WAVE ROW (`GLASS8-REPIN-CENSUS.md` §9.3, stated once) — transposed verbatim |
| CC-118 | **VERIFIED** | `082e1abbd` · `ddd399786` | — | dated-append row (BUILD → X-W6, unspent at X-W6's close); G-PAINT's mechanism landed by the X-DS program (V1C-06: `variant="spectrum"` and the `--ink-muted` track feed deleted; V2C-06: the one scalar range ink) — the range-vs-track ≥ 3:1 arm is re-read by X-W11's browser cell (`.d`) |

## §A — The G1 extractor (source of record)

Run from the repo root. It reads §1 + the dated appends as the origin set, parses §4, and fails
naming the CC-ID for: a word outside the four · a VERIFIED without a resolving commit · a RETIRED
whose tombstone path is absent · a BLOCKED-ON without its exact condition or a re-trigger command ·
a §1.M row that is not BLOCKED-ON or whose condition is not §1's text verbatim · a row without a §1
origin · a row twice · an origin row with no §4 row · a DEGRADED row absent from BOUNDARY-CARRY ·
this mirror diverging from §4.

⟨cmd⟩ `sed -n '/^```js g1-extract$/,/^```$/p' docs/tranches/X/close/LEDGER-FINAL.md | sed '1d;$d' > <scratch>/g1-extract.mjs && node <scratch>/g1-extract.mjs docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md docs/tranches/X/close/LEDGER-FINAL.md docs/tranches/X/close/BOUNDARY-CARRY.md`

```js g1-extract
// G1 extractor — node g1-extract.mjs <CARRY-CUT-LEDGER.md> <LEDGER-FINAL.md> <BOUNDARY-CARRY.md>
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
const [ledgerP, finalP, boundP] = process.argv.slice(2);
const L = readFileSync(ledgerP, "utf8").split("\n");
const s4 = L.findIndex((l) => /^## §4 /.test(l));
const cells = (l) =>
    l
        .split(/(?<!\\)\|/)
        .slice(1, -1)
        .map((c) => c.trim());
const pre = L.slice(0, s4 < 0 ? L.length : s4).filter((l) => /^\| CC-\d{3} \|/.test(l));
const origin = pre.map((l) => cells(l)[0]);
const verb = Object.fromEntries(pre.map((l) => [cells(l)[0], cells(l)[4]]));
const bank = [
    "CC-003",
    "CC-044",
    "CC-105",
    "CC-106",
    "CC-107",
    "CC-110",
    "CC-111",
    "CC-112",
    "CC-113",
    "CC-114",
    "CC-115",
];
const table = (lines) => lines.filter((l) => /^\|\s*CC-\d{3}\s*\|\s*\*\*/.test(l));
const splitRow = (l) => cells(l);
const fails = [];
const F = (id, why) => fails.push(`${id}: ${why}`);
const t4 = s4 < 0 ? [] : table(L.slice(s4));
if (s4 < 0) F("§4", "absent");
const seen = new Map();
for (const l of t4) {
    const [id, w, arg, rt] = splitRow(l);
    seen.set(id, (seen.get(id) || 0) + 1);
    const word = w.replace(/\*/g, "");
    if (!origin.includes(id)) F(id, "no §1 / dated-append origin");
    if (!["VERIFIED", "RETIRED", "BLOCKED-ON", "DEGRADED-TO-BOUNDARY"].includes(word)) {
        F(id, `bad terminal word "${word}"`);
        continue;
    }
    if (word === "VERIFIED") {
        const hs = [...arg.matchAll(/`([0-9a-f]{7,40})`/g)].map((m) => m[1]);
        if (!hs.length) F(id, "VERIFIED without a commit");
        for (const h of hs) {
            try {
                execFileSync("git", ["cat-file", "-e", `${h}^{commit}`], {
                    stdio: "ignore",
                });
            } catch {
                F(id, `commit ${h} does not resolve`);
            }
        }
    }
    if (word === "RETIRED") {
        const p = (arg.match(/`([^`]+)`/) || [])[1];
        if (!p || !existsSync(p)) F(id, `tombstone path missing (${p})`);
    }
    if (word === "BLOCKED-ON") {
        if (!arg || arg.trim() === "—" || arg.trim().length < 12)
            F(id, "BLOCKED-ON without an exact condition");
        if (!rt || rt.trim() === "—" || !/`[^`]+`/.test(rt))
            F(id, "BLOCKED-ON without a re-trigger command");
        if (bank.includes(id) && !arg.includes(verb[id]))
            F(id, "§1.M condition not verbatim");
    }
    if (bank.includes(id) && word !== "BLOCKED-ON")
        F(id, "§1.M row must stay BLOCKED-ON");
    if (
        word === "DEGRADED-TO-BOUNDARY" &&
        !new RegExp(`\\|\\s*${id}\\s*\\|`).test(readFileSync(boundP, "utf8"))
    )
        F(id, "degraded row absent from BOUNDARY-CARRY.md");
}
for (const id of origin) if (!seen.has(id)) F(id, "no §4 row");
for (const [id, n] of seen) if (n > 1) F(id, `appears ${n}× in §4`);
const mirror = table(readFileSync(finalP, "utf8").split("\n"));
if (
    mirror.map((l) => cells(l).join("|")).join("\n") !==
    t4.map((l) => cells(l).join("|")).join("\n")
)
    F("LEDGER-FINAL", "mirror differs from §4");
const by = {};
for (const l of t4) {
    const w = splitRow(l)[1].replace(/\*/g, "");
    by[w] = (by[w] || 0) + 1;
}
console.log(
    JSON.stringify({ origin: origin.length, s4Rows: t4.length, byWord: by, fails }),
);
process.exit(fails.length ? 1 : 0);
```

## §B — The G14 builder and its check (source of record)

The builder wrote `docs/tranches/X/close/evidence/registry/g14-adjudicated-landed.json` (its `method`
field states the rule); the check re-derives every ⟨row, wave⟩ pair the fold §1z names (X-W11 itself
excluded — it stamps itself at `.e`) and fails on an unmapped pair, a value outside
`landed <commit>` | `NOT-CARRIED` | `DEGRADED-TO-BOUNDARY`, or a mapped pair without a §1z origin.

⟨cmd⟩ `node <scratch>/g14-check.mjs docs/tranches/X/refinement/X-W11-FOLD.md docs/tranches/X/close/evidence/registry/g14-adjudicated-landed.json`

```js g14-check
// G14 check — node g14-check.mjs <X-W11-FOLD.md> <g14-adjudicated-landed.json>
import { readFileSync } from "node:fs";
const f = readFileSync(process.argv[2], "utf8").split("\n");
const a = f.findIndex((l) => l.startsWith("### 1z. Id-keyed census"));
const b = f.findIndex((l, i) => i > a && l.startsWith("### 1z-b."));
const want = [];
for (const l of f.slice(a, b)) {
    const m = l.match(/^\| ((?:R|ADJ|CNL|PCS)-\d+) \| [^|]+ \| (.+) \|$/);
    if (!m) continue;
    for (const w of new Set([...m[2].matchAll(/X-W(\d+)/g)].map((x) => `X-W${x[1]}`)))
        if (w !== "X-W11") want.push(`${m[1]}@${w}`);
}
const j = JSON.parse(readFileSync(process.argv[3], "utf8"));
const got = new Map();
for (const r of j.rows)
    for (const v of r.receiving)
        if (v.wave !== "X-W11") got.set(`${r.id}@${v.wave}`, v.verdict);
const ok = (v) =>
    /^landed [0-9a-f]{7,40}$/.test(v) ||
    v === "NOT-CARRIED" ||
    v === "DEGRADED-TO-BOUNDARY";
const fails = [
    ...want.filter((k) => !got.has(k)).map((k) => `${k}: unmapped`),
    ...[...got].filter(([, v]) => !ok(v)).map(([k, v]) => `${k}: bad value "${v}"`),
    ...[...got.keys()]
        .filter((k) => !want.includes(k))
        .map((k) => `${k}: no §1z origin`),
];
const eligible = Object.entries(j.perWave).map(
    ([w, s]) =>
        `${w}:${s.verifiedEligible ? "eligible" : "NOT-eligible(" + s.notCarried.join(",") + ")"}`,
);
console.log(JSON.stringify({ pairs: want.length, mapped: got.size, eligible, fails }));
process.exit(fails.length ? 1 : 0);
```

```js g14-build
// G14 builder — ADJUDICATED→landed map over the X-W11 fold §1z census (85 roster rows).
// Read-only over the tree; prints JSON to stdout.
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
const R = (p) => readFileSync(p, "utf8");
const sh = (c) => {
    try {
        return execSync(c, {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
            maxBuffer: 64 << 20,
        });
    } catch {
        return "";
    }
};
const fold = R("docs/tranches/X/refinement/X-W11-FOLD.md").split("\n");
const start = fold.findIndex((l) => l.startsWith("### 1z. Id-keyed census"));
const end = fold.findIndex((l, i) => i > start && l.startsWith("### 1z-b."));
const recOf = {
    R: "PreviewRamp",
    ADJ: "PreviewRamp",
    CNL: "ColorNutritionLabel",
    PCS: "PaletteColorStrip",
};
const rows = [];
for (let i = start; i < end; i++) {
    const m = fold[i].match(/^\| ((?:R|ADJ|CNL|PCS)-\d+) \| ([^|]+) \| (.+) \|$/);
    if (!m) continue;
    const [, id, sev, disp] = m;
    const waves = [
        ...new Set([...disp.matchAll(/X-W(\d+)/g)].map((x) => `X-W${x[1]}`)),
    ];
    rows.push({
        id,
        record: recOf[id.split("-")[0]] + ".md",
        line: i + 1,
        severity: sev.trim(),
        disposition: disp.trim(),
        waves,
        bound:
            (/\*\*BOUND\*\*/.test(disp) && !/^ADJ/.test(id)) ||
            /CONDITIONAL BOUND/.test(disp),
        conditional: /CONDITIONAL BOUND/.test(disp),
        foldW11: [
            ...new Set([...disp.matchAll(/W11\.(\d+)/g)].map((x) => `W11.${x[1]}`)),
        ],
    });
}
// fold-row ids at the receiving waves' folds that cite this registry id
const tok = (id, rec) => {
    const re = new RegExp(`(^|[^A-Za-z0-9-])${id.replace("-", "\\-")}([^0-9]|$)`);
    return (line) =>
        re.test(line) &&
        (id.startsWith("R-") || id.startsWith("ADJ-")
            ? /PreviewRamp/.test(line)
            : id.startsWith("PCS-")
              ? /PaletteColorStrip/.test(line) || !/PaletteCardSkeleton/.test(line)
              : true);
};
const foldCache = {},
    recCache = {};
const loadFold = (w) =>
    (foldCache[w] ??= existsSync(`docs/tranches/X/refinement/${w}-FOLD.md`)
        ? R(`docs/tranches/X/refinement/${w}-FOLD.md`).split("\n")
        : []);
const loadRec = (w) =>
    (recCache[w] ??= existsSync(`docs/tranches/X/execution/A/${w}.md`)
        ? R(`docs/tranches/X/execution/A/${w}.md`).split("\n")
        : []);
const HDR =
    /^(?:\*\*([A-Z][A-Za-z0-9]*[.·-]?[A-Za-z0-9.·-]*\d[A-Za-z0-9.]*)\s*[·—(]|\| ((?:W\d+[·.]\d+|[A-Z]{1,3}-?\d+[a-z]?)) \||#{2,4} (\S+))/;
const hdr = (l) => {
    const m = l.match(HDR);
    return m ? m[1] || m[2] || m[3] : null;
};
const blockOf = (f, i) => {
    let a = i;
    while (a > 0 && !hdr(f[a])) a--;
    let b = i + 1;
    while (b < f.length && !hdr(f[b])) b++;
    return {
        id: hdr(f[a]) || `line${i + 1}`,
        text: f.slice(a, b).join(" "),
        line: a + 1,
    };
};
const GATE = /\b(G-?\d+[a-z]?|S-\d+|N-\d+|NG-\d+)\b/g;
for (const r of rows) {
    const t = tok(r.id, r.record);
    r.receiving = [];
    for (const w of r.waves) {
        const f = loadFold(w);
        const blocks = new Map();
        f.forEach((l, i) => {
            if (t(l)) {
                const b = blockOf(f, i);
                if (!blocks.has(b.id)) blocks.set(b.id, b);
            }
        });
        const foldRows = [...blocks.values()].map((b) => {
            const cells = b.text.startsWith("| ") ? b.text.split(" | ") : null;
            const cure =
                cells && cells.length > 6
                    ? cells[5]
                    : (b.text.match(/\*cureShape\*:([^*]{0,400})/) ||
                          b.text.match(/(→[^.]{0,200})/) || ["", ""])[1];
            const units = [
                ...new Set(
                    (cure + " " + b.text).match(/(?:X\.W\d+\.|`?\.)([a-z]\d?)\b`?/g) ||
                        [],
                ),
            ].slice(0, 6);
            return {
                row: b.id,
                line: b.line,
                gates: [...new Set(b.text.match(GATE) || [])].slice(0, 8),
                units,
                cure: cure.replace(/\s+/g, " ").trim().slice(0, 240),
            };
        });
        r.receiving.push({
            wave: w,
            foldFile: `docs/tranches/X/refinement/${w}-FOLD.md`,
            foldRows,
        });
    }
}
// verdict per (row, stamped wave): landed <wave-close commit> | NOT-CARRIED | DEGRADED-TO-BOUNDARY
const CLOSE = {
    "X-W1": "3730ff844",
    "X-W5": "3e933c332",
    "X-W6": "e24361c6d",
    "X-W7": "a994800cc",
    "X-W8": "6eb8f0268",
    "X-W9": "03f76440f",
    "X-W10": "7466ed9e5",
};
const HONEST_RED = { "X-W6": [/gate \*\*g1\b|`\.g`\*\* — gate \*\*g1/] };
const map = [];
for (const r of rows)
    for (const v of r.receiving) {
        if (v.wave === "X-W11") {
            v.verdict = "SELF";
            v.why = "X-W11 maps its own rows at .e (R-A stamp act)";
            continue;
        }
        const live = v.foldRows.filter(
            (f) =>
                !/^0a\.$|^§?R\d\.\d+$|^C-\d+$|^\d+[a-z]?\.[a-z.]*$/.test(f.row) ||
                v.foldRows.length === 1,
        );
        const nwoOnly =
            live.length > 0 &&
            live.every(
                (f) =>
                    /NO-WAVE-OWNER/.test(f.cure) &&
                    !/X-W\d|`\.[a-z]|\.[a-z]\d?`|\bW\d/.test(
                        f.cure.replace(/NO-WAVE-OWNER[^;]*/g, ""),
                    ),
            );
        const red =
            (HONEST_RED[v.wave] || []).some((re) =>
                live.some((f) => re.test(f.cure)),
            ) &&
            live.every((f) => (HONEST_RED[v.wave] || []).some((re) => re.test(f.cure)));
        if (!v.foldRows.length) {
            v.verdict = "NOT-CARRIED";
            v.why = `no fold row in ${v.foldFile} cites ${r.id} at the bytes`;
        } else if (nwoOnly) {
            v.verdict = "DEGRADED-TO-BOUNDARY";
            v.why = `the receiving fold row routes it NO-WAVE-OWNER → BOUNDARY-CARRY.md`;
        } else if (red) {
            v.verdict = "NOT-CARRIED";
            v.why = `its receiving gate is in ${v.wave}'s honest-RED set at close`;
        } else {
            v.verdict = `landed ${CLOSE[v.wave]}`;
            v.why = `fold row(s) ${live.map((f) => f.row).join(", ")} sit in ${v.wave}'s executed fold (reading rule: spec THEN addendum); ${v.wave} CLOSED CONFORMANT at ${CLOSE[v.wave]} — evidence class WAVE-CLOSE, not a per-row byte commit`;
        }
        map.push({ id: r.id, record: r.record, wave: v.wave, verdict: v.verdict });
    }
// one dated override, recorded with its reason (the row splits at X-W6 across two units)
for (const r of rows)
    if (r.id === "CNL-24")
        for (const v of r.receiving)
            if (v.wave === "X-W6") {
                v.verdict = "NOT-CARRIED";
                v.why =
                    "two limbs at X-W6: the .f content limb landed (e0e204a9b), but the rhythm limb rides gate g1 (W6·184), which is X-W6 honest-RED → ESC-W10-g1-1 (CC-059 BLOCKED-ON); a row is mapped landed only whole";
            }
const perWave = {};
for (const r of rows)
    for (const v of r.receiving) {
        if (v.verdict === "SELF") continue;
        const k = v.verdict.startsWith("landed") ? "landed" : v.verdict;
        (perWave[v.wave] ??= {
            landed: 0,
            "NOT-CARRIED": 0,
            "DEGRADED-TO-BOUNDARY": 0,
            notCarried: [],
        })[k]++;
        if (k === "NOT-CARRIED") perWave[v.wave].notCarried.push(r.id);
    }
for (const w of Object.values(perWave)) w.verifiedEligible = w["NOT-CARRIED"] === 0;
const order = (w) => +w.slice(3);
const out = {
    "SERVED MODEL": "claude-opus-5-5",
    gate: "G14 — ADJUDICATED→landed sweep (X-W11-FOLD §2b N2)",
    unit: "X.W11.a",
    date: "2026-10-18",
    sittingOfRecord: "2026-09-17",
    scope: "the X-W11 fold's §1z roster: 85 registry rows from the three assigned apotheoses (PreviewRamp 27 · ColorNutritionLabel 27 · PaletteColorStrip 31); the 12 §1z-b correction rows resolve to these ids and add no wave-naming row",
    values: ["landed <commit>", "NOT-CARRIED", "DEGRADED-TO-BOUNDARY"],
    method: "for each roster row and each X wave its §1z disposition names: locate the receiving wave fold's row(s) that cite the registry id at the bytes; a row with no citing fold row is NOT-CARRIED; a row whose every receiving fold row routes it NO-WAVE-OWNER is DEGRADED-TO-BOUNDARY; otherwise it is landed at the receiving wave's CLOSED-promotion commit (evidence class WAVE-CLOSE — the fold row sits in the wave's executed fold under the reading rule 'spec THEN addendum' and the wave's L-20 check returned CONFORMANT). X-W11 is not mapped here (it stamps itself at .e). The builder's source is LEDGER-FINAL.md §B.",
    closeCommits: CLOSE,
    perWave: Object.fromEntries(
        Object.entries(perWave).sort((a, b) => order(a[0]) - order(b[0])),
    ),
    rows: rows.map((r) => ({
        id: r.id,
        record: r.record,
        severity: r.severity,
        bound: r.bound && !r.conditional,
        conditionalBound: r.conditional,
        foldW11: r.foldW11,
        receiving: r.receiving.map((v) => ({
            wave: v.wave,
            foldRows: v.foldRows.map((f) => `${f.row} (${v.foldFile}:${f.line})`),
            verdict: v.verdict,
            why: v.why,
        })),
    })),
};
console.log(JSON.stringify(out, null, 1));
```
