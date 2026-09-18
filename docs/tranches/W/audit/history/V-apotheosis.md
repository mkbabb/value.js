# V-APOTHEOSIS — HISTORICAL AUDIT (hostile seat)

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`,
per the environment block of this session. No sub-seats spawned; every command
below was run by this seat.

**Scope audited:** `docs/tranches/V/apotheosis/` **excluding `pi/`** — `armA/`,
`armB/`, `armC/`, `post-convergence/`, `parser-proof/`, `probe/`,
`snapshot-vnext/`, `snapshot-vnext-2/`, `fable-era/`,
`OWNER-RULINGS-2026-07-20.md`, `OWNER-RULING-D23-2026-07-20.md`,
`CONVERSATION-ADDENDA.md`, `RUN-STATE.md`.
**Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
**Writes:** this file only.

---

## 0. HEADLINE

The 114/114 crosswalk is **REAL and verified by count**. The parser-proof gate's
composite verdict is **REAL and reproduced by independent execution** — including
the R1 shipping crash, which is **worse than the gate states**. What the corpus
hides is elsewhere: **two ratified close-laws that this program's own union folded
in were routed and then silently dropped at the gate layer** (`CH-4 p75-LCP ≤2.5 s`
and `W54 D-1 aurora-derive` have **zero** hits in any of the 193 wave/gate texts),
one of which is a **10-close chronic wearing four names**; the perf instrument that
could have measured it was **explicitly retired from gate status** in the same
corpus; and the flagship post-convergence score line **does not sum to its own
ledger** (20 rows scored as `12 + 5 + 0 = 17`), an error that propagated verbatim
into `VERDICT.md`.

---

## 1. THE 114/114 CROSSWALK — VERIFIED BY COUNTING

**Claim** (`snapshot-vnext-2/UNION-ROW-INVENTORY.json`):
`"state":"TERMINAL","terminal_count":114,"expected_count":114`,
`counts:{ADOPT:17, AMEND:30, ADD:13, KILL:12, REPAIR:20, OWNER_RULING:22}`.

**Command run** (python over the JSON):

```
n 114 unique 114
Counter({'AMEND': 30, 'OWNER_RULING': 22, 'REPAIR': 20, 'ADOPT': 17, 'ADD': 13, 'KILL': 12})
dupes []
missing vs canonical: []
extra: []
```

**VERDICT: CONFIRMED.** 114 rows, 114 distinct ids, zero duplicates, and the id set
is exactly `AD-1..17 · AM-1..30 · ADD-1..13 · KL-1..12 · R-01..20 · D-1..22`. The
delta arithmetic `17+30+13+12 = 72` also holds
(`armC/UNION-APOTHEOSIS.md:133` "Delta magnitude: 72 rows").

**Anchors resolve.** All 114 `#Lxx` anchors point at a real line of a real file;
94 contain their own row id verbatim; the 20 apparent misses are the repair-ledger
rows, which the union document numbers `| 1 |…| 20 |` and the inventory
canonicalizes to `R-01..R-20` — the anchors land on the correct lines
(`R-01 → armC/UNION-APOTHEOSIS.md:141` = "Land RR-17's three correction slices…").

**The 193-wave registry is real by count.** Mechanical row extraction over
`snapshot-vnext-2/waves/*.md`: 201 table rows − 8 `| ID |` headers = **193 unique
wave ids** (G-D 44 · K-A 63 · M-C 33 · P-V 53).

### 1.1 What the count does NOT prove — three findings

**F-1.1 — 15 of the 114 rows (13%) route to NO executable wave.** Of the 164
distinct owners cited, 13 are not wave ids
(`FORMATION`, `FORMATION-CLEAN`, `FORMATION-REVIEWS`, `FORMATION-ROUTING`,
`DELETION-LAW`, `PROVENANCE`, `STATE-ROUTING`, `LIVE-VISUAL-AUDIT`, `P4.5`,
`RR17-root`, `CARRY-W50`, `api-schema`, `api-source`). Fifteen rows have **no**
resolvable wave owner at all:

`AD-11, AD-12, AD-17, AM-27, AM-28, AM-30, ADD-12, KL-6, KL-12, R-01, R-03, R-14, R-19, D-4, D-5`

Two of those are load-bearing: **R-01** ("no Codex tool is trusted in a union gate
before this" — the P0-path row) owns `RR17-root`, and **R-03** (the record-citation
gate) owns `FORMATION`. Neither can be failed by any wave gate, because neither has
one. A crosswalk that routes a P0-path row to a non-node is routing, not binding.

**F-1.2 — the crosswalk froze one ruling too early.** `D-23` (mirror-primary,
`OWNER-RULING-D23-2026-07-20.md`) is **absent** from the inventory
(`rg -o '"D-2[0-9]"'` → only `D-20`, `D-21`, `D-22`) and absent from every
`snapshot-vnext-2/*.md`. D-23 states verbatim: *"This supersedes the union's AM-1
restoration-primary arm."* **AM-1 is one of the 114 crosswalked rows.** So the
"114/114 zero-drop, TERMINAL" seal certifies a corpus in which one of the sealed
rows had already been superseded by a ruling the seal cannot see. The seal is
correct as of 2026-07-20 10:27 and stale by the end of the same day.

**F-1.3 — `R-nn` is a colliding namespace, and the collision points at the
partials.** `OWNER-RULINGS-2026-07-20.md` Effect column:

- `:38` D-16 → "**R-11 closed**"
- `:39` D-17 → "**R-10 closed BUILD; R-12 closed RETIRE**"
- `:41` D-19 → "**R-13 closed BANKED**"

In the only `R-nn` namespace that exists in this corpus (the canonicalized repair
ledger), those ids mean:

| id | what the crosswalk says it is | what the ruling claims about it |
|---|---|---|
| R-10 | Reconcile SCI-1/D54/W56; de-couple mix/ramp Into | "closed BUILD" |
| R-11 | V15 raytrace TEST-side oracle; kill production challenger | "closed" |
| R-12 | kf dispatch pack on the P4.5 channel | "closed RETIRE" |
| R-13 | Fold the CARRY-LEDGER §B–§F universe (W46–W56, CH-4, W54 D-1) | "closed BANKED" |

`rg -n "\bR-1[0-3]\b"` over the whole scope returns those three ruling lines, the
delta-census ledger recital, and nothing else — **there is no second `R-nn`
namespace in which those citations resolve.** R-12 and R-13 are precisely the two
rows the convergence adjudication grades **PARTIAL / "routed, not loaded" /
"routed, not yet expressed"**. A mechanical join on `R-13` reads the largest
single Codex gap as CLOSED-BANKED. This is dangling-reference smuggling, whether
or not it was intended.

Four live `D-nn` namespaces coexist in the same corpus:
`armB/OWNER-DOCKET.md` D-01..D-47, `OWNER-RULINGS` D-1..D-22, the standalone D-23,
and the CARRY-LEDGER's D50/D54/D57/D58/D59. In the docket, `D-09` = "R-EVAL calc
evaluator" and `D-19` = "transform/decompose PRUNE"; in the rulings, `D-9` =
"decompose PRUNE" and `D-19` = "SoA BANKED". Both documents are cited as authority
by the same crosswalk.

---

## 2. PARSER-PROOF GATE — VERDICT STATED EXACTLY, EVERY CLAIM ADJUDICATED

### 2.1 The verdict, verbatim

`parser-proof/GATE-VERDICT.md:10`:

> ## COMPOSITE: 🔴 RED — but a RED of DISTANCE, not of DOUBT

with the arm table (`:12-16`):

| arm | verdict | one line (verbatim) |
|---|---|---|
| P-1 semantic equivalence | 🟢 GREEN | 0 mirror-defects across the 403-string corpus; every cross-engine difference is declared narrowing or a **live-side** defect |
| P-2 coverage census | 🔴 RED | assay = W0 pilot: frozen 52-export surface 0 TOTAL / 3 PARTIAL / 16 ABSENT runtime + 33 types ABSENT; kf seams 3/37 |
| P-3 comparative bench | 🔴 RED | C14 sheet ratio 0.0537 < 0.1000 floor (value 0.0640 ≥ 0.0500 passes); deterministic across 5 invocations |

### 2.2 Claim-by-claim adjudication

| memory's claim | verdict | evidence |
|---|---|---|
| COMPOSITE RED-of-distance | **CONFIRMED** | `GATE-VERDICT.md:10` verbatim above |
| equivalence GREEN, 0 mirror-defects | **CONFIRMED** | `equivalence-results.json`: `/gate = GREEN`, `/defects [list len 0]`, `/misAcceptGuardFailures [list len 0]`, `/corpusSize = 403` |
| coverage RED, 0-of-52 TOTAL | **CONFIRMED** | `coverage.md:70` "Runtime tally: 0 TOTAL / 3 PARTIAL / 16 ABSENT"; `:87` "Type tally: 0 TOTAL / 0 PARTIAL / 33 ABSENT". I independently counted `src/css/index.ts`: 33 type exports + 19 runtime (grammar 7 + syntax 1 + timeline 3 + stylesheet 8) = **52**. |
| bench RED, sheet 0.0537 | **CONFIRMED** | `bench.md:132` C14 `sheet-common … 0.0537 … floor 0.1000 … ❌`; `:169` "SHEET … 0.0537 … **FAIL** (−46 %)" |
| live regex FASTEST ≈1.8× | **CONFIRMED** | `bench.md:126` "fastest of the three on every shared scenario (≈1.8× deposed and C14 on the common corpus)". Ratio arithmetic checks: sheet-common live 0.1261 ÷ deposed 0.0683 = **1.85×**; value-common 0.1132 ÷ 0.0640 = **1.77×**. |
| R1 = live `parseCssColor("oklch()")` shipping crash | **CONFIRMED — AND UNDER-STATED** | see §2.3 |

### 2.3 R1 — confirmed by execution, and broader than the gate says

`GATE-VERDICT.md:32-34` names six shapes: `oklch()`, `rgb()`, `hsl()`, `lab()`,
`color()`, `rgba()`.

Root cause read on disk: `src/css/grammar.ts:63-87` `splitTopLevel("", "/")` returns
`[]` (empty tail is never pushed); `:155-158` `alphaToken(undefined)` returns `1`
rather than failing; `:184` then dereferences `slash[0]!.replace(...)` on
`undefined`.

I bundled `src/css/grammar.ts` with the repo's own esbuild and ran it:

```
oklch() => THREW TypeError: Cannot read properties of undefined (reading 'replace')
rgb()   => THREW TypeError: ...   hsl()   => THREW TypeError: ...
lab()   => THREW TypeError: ...   color() => THREW TypeError: ...
rgba()  => THREW TypeError: ...   hwb()   => THREW TypeError: ...
lch()   => THREW TypeError: ...   oklab() => THREW TypeError: ...
```

and against the **built artifact** `dist/subpaths/css.js`:

```
dist oklch() => THREW TypeError: Cannot read properties of undefined (reading 'replace')
dist hwb()  => THREW  dist lch() => THREW  dist oklab() => THREW  dist xyz() => THREW
```

**Finding:** *every* functional-color shape with an empty body throws, not six.
`hwb()`, `lch()`, `oklab()`, `xyz()` are unnamed in F-2. The frozen contract
promises `ok:false`; the shipped 4.0.0 public API throws `TypeError`.

**Finding (evidence gap):** the 403-string differential corpus contained **exactly
one** of these shapes. `equivalence-results.json` → `/tally/ENGINE_EXCEPTION = 1`,
`/liveThrewFindings [list len 1]`, the single row being
`{"id":272,"source":"oklch()","thrower":"LIVE"}`. F-2's parenthetical list of five
further crashing functions was **extrapolated, not measured**. It happens to be
true (I measured it); the artifact does not support it.

### 2.4 The P-1 GREEN is scope-bounded to near-vacuity

`equivalence-results.json` gate definition, verbatim:

> GREEN iff zero DIVERGENT_VALUE + zero MIS_ACCEPT + zero FALSE_REJECT_IN_SHAPE
> on the frozen-surface subset.

Tally over 403 rows: `OUT_OF_SCOPE 142` + `COVERAGE_NARROWING 95` = **237 rows
(59 %) belong to classes that are defined as never-reddening**. `LIVE_STRICTER 10`
and `ENGINE_EXCEPTION 1` are also defined as live-side, not mirror-side. Only
`STRUCT_CONGRUENT 105` + `CONGRUENT_REJECT 50` sit in the failure surface at all.

*What input would make this gate RED?* A numeric divergence on an `oklch()` /
`cubic-bezier()` value both engines accept, or a C14 accept of a string the live
engine and spec both reject. Those are nameable, so the gate is **not formally
vacuous** — but the failure surface **shrinks as C14's coverage shrinks**. Adding
more unimplemented CSS to C14 can only add `COVERAGE_NARROWING` rows. And a gate
whose GREEN survives a `TypeError` from the shipped public API of the engine under
test is a gate reporting on 3 productions of a 52-export surface. `GATE-VERDICT.md`
is honest about this ("sound where it speaks and nowhere near total"); a downstream
reader who cites "P-1 GREEN" is not.

Also buried in the same artifact and absent from the verdict prose:
`/kfSheetSeam/seamServiceable = "NO — C14 refuses @keyframes and exposes no
collectKeyframes/parseKeyframeSelector public door"`.

### 2.5 Declared-capture risk: the proof harnesses are not in the repo

`GATE-VERDICT.md:102-105`: *"Everything is now on disk for the begin-word: the
three reports, the two results JSONs, **the recovered harnesses (differential +
bench, both reusable at G-1/G-2/G-3 time)**…"*

The repo holds 8 files under `parser-proof/` (3 reports + 2 JSONs + 3 analyses).
The harnesses live at:

```
/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/
  bench/ bench-recovered.mjs c14-bundle.mjs c14-css/ deposed/ deposed-full/
  equivalence/ gate-recovered.mjs live-bundle.mjs node_modules/ profile/
```

— an **ephemeral agent job directory, not version-controlled**. `bench.md:10-12`
cites `W/bench/raw-run-{1..5}.json`, `W/gate-recovered.mjs`,
`W/bench-recovered.mjs`; `coverage.md:3-5` anchors the whole census on
`/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css`. None of those are in
the repo. The same pattern appears in `armC/UNION-APOTHEOSIS.md:262-264`, where the
letter **shipped to the Codex fleet** tells them the union corpus lives at
`~/.claude/jobs/9e7dadd0/tmp/apotheosis/`.

If that job dir is reaped, G-1/G-2/G-3 cannot be re-run against the same subjects
and the parser-proof numbers become unfalsifiable claims.

### 2.6 OC-1 is still open; OC-2 was never ruled

`GATE-VERDICT.md:86-97` books two OWNER-CONFIRMs and closes:
*"Silence holds execution fully blocked."*

`rg "OC-1|OC-2"` over `docs/tranches/V/{coordination,audit,reformation}`:

- `coordination/value-inbox-2026-07-20-parser-proof-evidence.md:76,79` — the two
  proposals, restated as proposals.
- `coordination/value-inbox-2026-07-20-pi-minitranche-notice.md:9` — *"The
  GATE-VERDICT's staged reading (OC-2) is thereby adopted IN SUBSTANCE"*.

**OC-1 (bench-bar recalibration) has no disposition anywhere in the tranche
record.** OC-2 was not ruled; it was declared adopted-in-substance by a
mini-tranche notice — a program adopting its own recommendation, which is exactly
the "silence yields" failure the union's own §4 preamble forbids ("Leans stated;
nothing forecloses").

---

## 3. THE SILENT DROPS — the highest-value finding

### 3.1 Two ratified close-laws bind nothing

`ADD-1` (`armC/UNION-APOTHEOSIS.md:102`) folds the CARRY-LEDGER whole, naming
**F-PD-12 (THE BOOT KILL — CH-4 p75-LCP ≤2.5s close-law + W54 D-1 aurora-derive)**
and stating: *"two ratified close-laws were unowned."* `R-13` repeats the demand.

The CARRY-LEDGER's own text (`docs/tranches/V/reformation/CARRY-LEDGER.md`):

- `:29` — *"**CH-4: p75 LCP ≤2.5s on the named matrix — the ~5s boot dies or V′ does not close**"*
- `:28` — *"**D-1 aurora-derive RUNS or V′ does not close** (L1)"*

Greps over the post-convergence formation (`snapshot-vnext-2/`, which
`convergence-adjudication.md:14` certifies is byte-identical to live `vnext/`):

```
rg -n "LCP|2\.5 ?s|p75"  snapshot-vnext-2/waves/*.md snapshot-vnext-2/*.md   →  0 hits
rg -c "CH-4"             snapshot-vnext-2/                                    →  1 hit, UNION-ROW-INVENTORY.json only
rg -ci "aurora"          snapshot-vnext-2/                                    →  5 hits, all "AuroraAtoms" presentation rows
                                                                                 (LIVE-VISUAL-AUDIT:189, DESIGN-PROGRAM:258,
                                                                                  DISPOSITIONS:79, PROMPT-RECAP, inventory)
rg -c "W4[6-9]|W5[0-6]"  snapshot-vnext-2/waves/*.md                          →  1 hit: "W56" inside V16R (the 4.1.x vehicle)
```

**Both ratified close-laws exist ONLY as a routing string inside
`UNION-ROW-INVENTORY.json`. Neither number appears in any of the 193 wave rows, any
gate cell, or any band registry. The entire W46–W56 CARRY namespace is absent from
the wave books.** The fold was booked as `FOLD` in the crosswalk and never written.

The post-convergence audit found this itself
(`convergence-adjudication.md:96`, `VERDICT.md:45-47`) and named it correctly —
*"a ratified close-law that no gate can fail on is a vacuous-green seed"* — and
then the same VERDICT's headline reads *"the most faithful letter-consumption event
in this constellation's record."* Both statements are in the same file. The second
one is what travels.

### 3.2 The instrument that could measure CH-4 was retired in the same corpus

`snapshot-vnext-2/SEED-ROW-INVENTORY.json` `exceptions` block, row `H-L-L365`:

> "Retire Lighthouse from gate status; retain it only as an explicitly nonblocking audit."

And `waves/M-C.md:52` (C07, the only wave with perf numbers at all) closes with:
*"no emulator, **Lighthouse-only verdict**, unnamed 'current browser,' automation-only
visual claim or source repair can green it."*

So: the p75-LCP close-law has no gate text, and the automated LCP instrument is
explicitly non-blocking. The `~5s boot` that Tranche T escalated (Q14: LCP 5141 /
TBT 5988, `docs/tranches/T/FINAL.md:14,20`) is, at this close, measured by nothing
that can turn red.

### 3.3 Other silent drops

| # | dropped | last seen | evidence |
|---|---|---|---|
| 1 | `N-ADJ-3` governance record | `armA/VERDICT.md` header (0 hits, 2026-07-19) | still `rg N-ADJ-3 snapshot-vnext-2/` → 0 hits; `convergence-adjudication.md:105` residual 10 "N-ADJ-3 absent" |
| 2 | P4.5 kf scar coordinates (`backward/color.ts:120-124`, `backward.ts:30-32`), the easing consume-vs-ratify brief, the eight-zone regex census | union repair 12, `armC/UNION-APOTHEOSIS.md:152` | `rg -c backward snapshot-vnext-2/` → 2 hits, both unrelated prose (`TARGET-DAGS.md:223` "routes backward"); `convergence-adjudication.md:78` "appear **nowhere** in S2 (grep: 0). Routed, not loaded." |
| 3 | The record-citation gate (R-03) as a *machine* | union repair 3: "the gate is a grep; it is cheap" | `convergence-adjudication.md:69` — `record_refs` appears once (an encoding note) and **zero** times in any validator. "practiced, not installed." |
| 4 | The 147th API operation | `armC/UNION-APOTHEOSIS.md:46` "147-op closed signed registry" | regenerated registry = 146 (value 89→88). `delta-census.md:61` calls this *"matches AD-2's '146-op' claim"* — AD-2 says **147**. The dropped operation is never named. |
| 5 | R-20's atlas 3-site chase ledger | union repair 20 | `convergence-adjudication.md:86` "Unverified by this seat"; seed exception `H-L-L428` "Retire a stale-Atlas catch-up wave". Retired-or-unverified, never completed. |
| 6 | OC-1 bench-bar recalibration | `GATE-VERDICT.md:88-94` | no disposition anywhere in `docs/tranches/V/` outside `pi/` |

---

## 4. VACUOUS GATES

For each: *what exact input makes this RED?*

| # | gate | where | why it cannot fail |
|---|---|---|---|
| V-1 | CH-4 `p75 LCP ≤2.5 s` close-law | nowhere | It has no gate text. `rg "LCP\|p75\|2.5 ?s"` over all 193 wave rows = 0. A number that appears in no gate cannot redden. Non-vacuous form would be: the literal string in D25's or D03/D05's acceptance cell. |
| V-2 | `W54 D-1 aurora-derive RUNS or V′ does not close` | nowhere | Same: 0 hits in any wave/gate. The only "aurora" rows in the formation are `AuroraAtoms` **presentation-refinement** dispositions (`DISPOSITIONS.md:79` "Keep and refine totally") — a keep-everything row, which by construction cannot fail. |
| V-3 | Lighthouse perf audit | `SEED-ROW-INVENTORY.json` exception `H-L-L365` | Declared "explicitly nonblocking". A nonblocking audit is a report, not a gate. |
| V-4 | R-03 record-citation "grep-gate law" | `armC/UNION-APOTHEOSIS.md:143`; crosswalk owner `FORMATION` | No validator implements `record_refs`; no wave owns it; compliance is behavioral. Nothing executes, so nothing can return non-zero. |
| V-5 | The 2/2 FORMATION-CLEAN passes | `snapshot-vnext-2/FORMATION-CLEAN-PASSES.json` | Both passes report `finding_families:[]`, `orphan_demands:[]`, `unsupported_claims:[]` across 12 domains **including `parser-boundary` and `gate-soundness`**, over a corpus whose subject library's public `parseCssColor` throws `TypeError`. The domains audit formation *text*, not product; **no product defect can make these passes RED.** (Mitigating: the machinery demonstrably fails on *format* — `FORMATION-CLEAN-PASS-1-ADJ.oversize-rejection.json`, "report exceeded the fail-closed clean-artifact byte ceiling", 12,946 > 12,000 — and 5 prior epochs died. It is a gate with a body count on shape, not on substance.) |
| V-6 | AD-12 deletion-judgment grammar | `armC/UNION-APOTHEOSIS.md:56` | Self-declared: *"may not fire on a frozen key or decided row until ruled."* Adopted with its non-firing condition intact. |
| V-7 | P-1 equivalence GREEN | `parser-proof/equivalence-results.json` | Not formally vacuous (see §2.4) — but 237/403 rows (59 %) are in never-redden classes, and the failure surface contracts as the mirror's coverage contracts. |

---

## 5. CENSUS ARITHMETIC — the documents do not add up

| # | claim | actual | command |
|---|---|---|---|
| A-1 | `convergence-adjudication.md:88` "**12 LANDED** (of which 4 landed-by-ruling) · **5 PARTIAL** · 0 MISSING" over a **20**-row ledger | `12 + 5 + 0 = 17 ≠ 20`. Mechanical extraction of the grade column of that same table gives **14 LANDED** (rows 1,2,5,7,8,9,10,11,14,15,16,17,18,19) / **6 PARTIAL** (3,4,6,12,13,20) = 20. Only 3 rows are LANDED-BY-RULING (7,8,16), not 4. | python regex over the §3 table |
| A-2 | `post-convergence/VERDICT.md:39` "**Repair ledger: 12 LANDED · 5 PARTIAL · 0 MISSING.**" | propagates A-1 verbatim into the top-level verdict | — |
| A-3 | `delta-census.md:40` C14 prototype "**63 files ≈ 74 KB**" | `find … -type f \| wc -l` = **50 files**; byte sum = **70,206 B (68.6 KB)**. 63 = 50 files + the 13 subdirectories. Directories were counted as files. | `find`/`stat` |
| A-4 | `convergence-adjudication.md:50` same prototype "**224 KB**" | `du -sk` block size, not bytes. Two audit documents state 74 KB and 224 KB for the same tree; neither is 68.6 KB. | `du -sk` vs `stat` |
| A-5 | `delta-census.md:61` "closedCounts … = 146 (matches **AD-2's "146-op" claim**)" | AD-2 (`armC/UNION-APOTHEOSIS.md:46`) says **147-op**. The quotation is invented. | `rg "147-op"` |
| A-6 | `RUN-STATE.md:66` "`snapshot-vnext/` (**181 files**)" | `find snapshot-vnext -type f \| wc -l` = **187** (and `delta-census.md:5` says 187) | `find` |
| A-7 | `RUN-STATE.md:86` "No `sweep-*.md` / `audit-*.md` final reports exist yet" and `:83` "kf-demo captures were not yet taken" | `armA/audit-*.md` (8 files) and `armB/sweep-*.md` (8 files) exist; `probe/kf-mobile-390-{landing,animation-list}.png` exist | `ls` |
| A-8 | `convergence-adjudication.md:80` "tools/ 85→43 files" | 85 → **44** `.mjs` (`ls snapshot-vnext-2/tools/*.mjs \| wc -l`). Size claim 2,260→780 KB is exact (`du -sk`). | `ls`/`du` |

A-1/A-2 is the one that matters: the flagship post-convergence score of a 20-row
repair ledger sums to 17, in both directions understating, and no reader can tell
that three rows are unaccounted.

---

## 6. THE CHRONICS — items riding multiple closes under changing names

### C-1 (DISEASE ROW) — Aurora derive-from-color. **Four names, ten-plus closes, still unbound.**

| close | id | wording |
|---|---|---|
| A → H | **CH-2** | *"Aurora `deriveAuroraPalette` + `deriveAuroraConfig`"* — `H-AUDIT-2-deferred-ledger.md:105`: **"6-tranche (A→B→D→E→F→G→H)"**, "glass-ui-blocked + precept-§10 (wire-before-retire)" |
| D → H | **CH-11** | *"Aurora derive-from-color + blob extirpation precept-§10 wire-before-retire"* — `H-AUDIT-2-deferred-ledger.md:114`: **"4-tranche (D→E→F→G→H; derivative of CH-2 + CH-3)"**; `:201` disposition **"CARRY-FORWARD-WITH-SHARPER-TRIGGER"** |
| G | CH-11 | `G-AUDIT-2-deferred-ledger.md:92`: **"3-tranche (D→E→F→G…)"** — same row, count incrementing |
| V′ | **W54 D-1 "aurora-derive"** | `CARRY-LEDGER.md:28`: *"**D-1 aurora-derive RUNS or V′ does not close** (L1)"* — promoted to a **close-law** |
| V-apotheosis | **ADD-1 / R-13 "W54 D-1 aurora-derive"** | `armC/UNION-APOTHEOSIS.md:102,153` — folded, routed to `UNION-ROW-INVENTORY.json` |
| post-convergence | residual #1 | `convergence-adjudication.md:96` — *"exist only as inventory routing… no wave gate states the number"* |

**Status today: 0 hits in the 193-wave formation.** The row has been renamed three
times, promoted from a research note to a ratified close-law, folded "whole" by a
72-row union, and still binds nothing. This is the pattern the audit charter calls
the disease row, in its purest form.

Nuance for the next tranche: the *upstream* half did land — glass-ui now ships
`aurora.d.ts` / `ln` and the demo consumes `resolveAtoms` with a picker-derived seed
(`demo/color-picker/composables/boot/useAtmosphere.ts`,
`demo/scenes/atmosphere/aurora-atoms.ts`). What never landed is the **close-law that
proves it runs**. The item became untestable rather than done.

### C-2 (DISEASE ROW) — the boot / p75-LCP kill. **Three names, four-plus closes, plus an ID collision.**

`T` Q14 RULED ESCALATION (LCP 5141 / TBT 5988, `docs/tranches/T/FINAL.md:14,20-21`,
"closes by the RULED escalation, not by a re-baseline, a preset-swap, or a
deferral") → routed to **`U.W-PERF`** → **`CARRY-LEDGER.md:29` CH-4** ("the ~5s boot
dies or V′ does not close") → **ADD-1 "THE BOOT KILL"** → **residual #1** → **0 gate
hits**. Three deferrals of a row whose own text forbids deferral.

**Collision hazard:** `CH-4` in `G-AUDIT-2-deferred-ledger.md:85` and
`H-AUDIT-2-deferred-ledger.md:107` is *"`SelectTrigger size` prop"*, a **6-tranche
(A→B→D→E→F→G→H)** glass-ui-blocked chronic. Two unrelated `CH-4`s ride the same
ledger family. Any future crosswalk joining on `CH-4` will mis-route.

### C-3 — the kf ramp scar (`backward/color.ts:120-124`, `backward.ts:30-32`)

`armA/VERDICT.md` COLOR section: *"kf scar deletion (backward/color.ts:120-124,
backward.ts:30-32) absent from K band + coordination ✔ grep"* (2026-07-19) →
union `AM-8` + repair 12 (`:152`) → `convergence-adjudication.md:78` **PARTIAL**,
"Routed, not loaded", grep 0 → `VERDICT.md:47` residual 2. Two bookings inside a
single program, zero bytes.

### C-4 — DesignSync. **Three postures, still unavailable.**

Codex banked it honestly with G00/D00A/M00 retriggers →
`armC/UNION-APOTHEOSIS.md:29` grades the Fable side *"**DesignSync silently omitted
entirely**"* → `ADD-8` books a "DesignSync retrigger execution row" →
`SEED-ROW-INVENTORY.json` exception **`ORCH-07`**: *"DesignSync is unavailable and
no substitute may claim equivalence."* The commitment converted from "discharge at
the design gates" to "unavailable, retrigger on availability" without a named
downgrade. Every visual close-gate that cited DesignSync frames (including
`OWNER-RULINGS` D-20: *"Final form at the design gate, **with DesignSync frames**"*)
now rests on an unavailable tool.

### C-5 — the governance-lineage anchors

`LT-10`/`LT-16`/`proof:structure`/`depcruise` = 0 hits at armA (the sole P0) →
repair 2 → **LANDED at the formation layer** (`K00` carries them). But `N-ADJ-3`,
booked in the same P0 sentence, is **still 0 hits corpus-wide** and re-deferred as
residual 10. A P0 partially cured and scored LANDED.

### C-6 — "measure the retiring regex parser ONCE for the record"

`164343c1`/`css-parse-perf` = 0 hits at armA → repair 6 → `convergence-adjudication.md:72`
**PARTIAL**, "the regex parser itself is still unmeasured" → **DISCHARGED** by
`bench.md` §3(a) on 2026-07-20 (peak MB/s, ns/call, ratios, 5 invocations). The
measurement exists — but it lives **outside** the fleet's corpus (`parser-proof/`,
harness in the job tmp dir), while the fleet's `P05` wave still holds it born-RED.
A split record: discharged in one authority, open in the other.

---

## 7. OTHER FINDINGS

**7.1 — The certified epoch is unreproducible, and the drift is unrepaired.**
`convergence-adjudication.md:99` (residual 4): *"`RUN-STATE.md` has drifted from its
pinned `bed84b9d…` (current `56216a8a…`), so `corpus-epoch.mjs` today yields
`c5767352…`, not `61d4954f…`."* Four days later:

```
$ shasum -a 256 docs/tranches/V/apotheosis/RUN-STATE.md
56216a8a0c266cd016e51e2f1472b1c3f1b31dc3c66874f58be4ead132210f68
```

Still the drifted value. The 2/2 clean-pass seal — the load-bearing convergence
claim — **cannot be re-derived from live bytes today**, and the named joint fix
("next epoch pins content-addressed COPIES") has not been applied.

**7.2 — Declared captures: mostly present, one undeclared duplicate corpus.**
Spot-check of the clean-pass evidence hashes: PASS.

```
$ shasum -a 256 .../FORMATION-CLEAN-PASS-1-ADJ.report.json
aa333d5978285ece4c7256ed84220b86f1ba80030a2f3e5fa8edb599da8227a5   (manifest: aa333d59… ✓)
$ shasum -a 256 .../FORMATION-CLEAN-PASS-1-ADJ.prompt.txt
cfa5cb7b9beafee568c16982fc12fab8f945814c03d4b7056b3cc83ca3a0993d   (manifest: cfa5cb7b… ✓)
```

All 6 epoch directories and all 20 pass artifacts exist. The 16 probe PNGs exist.

But: **`probe/vf/` is a byte-identical, undeclared duplicate of `snapshot-vnext/`**
— `diff -rq probe/vf snapshot-vnext` is **empty**, 187 files each, 4.0 MB each.
`RUN-STATE.md` documents `snapshot-vnext/` and never mentions `probe/vf/`. Add
`fable-era/` (11.9 MB) duplicating `armB/`'s owner transcripts and `probe/`'s PNGs,
and the scope carries several megabytes of undeclared triplicate corpus — inside a
program whose own KL-6/R-14 rows are an *apparatus diet*.

**7.3 — The apparatus diet is real.** `snapshot-vnext/tools` 85 `.mjs` / 2,260 KB →
`snapshot-vnext-2/tools` 44 `.mjs` / 780 KB. The clean-pass core measures
**24,671 bytes** against the ≤25,000 ceiling — genuinely within budget (the
adjudication's "~25.1 KB" overstates it; the conclusion holds).

**7.4 — The C14 prototype is real.** 50 files, 15 `l4` modules ↔ 15 external test
peers (`ls … \| wc -l` = 15/15), exact `@mkbabb/parse-that@1.0.0` pin,
`proof/last-run.json` `npm test 17/17 PASS`, `semantic equivalence RED` stated in
the same receipt. `REAL-AND-BENCHED` is a fair grade at W0-pilot scale. The
delta-census's file/byte counts for it are wrong (§5 A-3/A-4); the substance is not.

**7.5 — No masked fallback found in the audited program's own gates.** The one
try/catch-shaped defect is R1 itself, and R1 is *unmasked* — it propagates as an
uncaught `TypeError` to every consumer. `parseCssColor` has 18 call sites across
`src/`, `test/`, `demo/`; none wraps it in try/catch
(`rg -n "parseCssColor" demo/ src/ test/`). The demo's colour paths call it
directly (`demo/color-session/ink.ts:39`,
`demo/workbenches/gradient/composables/gradientParse.ts`,
`demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts`).

**7.6 — No alias smuggling found** in the surface rulings. D-1 held the 7-key
freeze; `V00C` was rewritten to reject the six-key proposal *by name*; the crosswalk
records `KL-8 SUPERSEDE`. The `./quantize` demotion is the only surface motion and
it is tombstoned. This one is clean.

---

## 8. COMMITMENT LEDGER — 120 promises

| class | count | landed (verified) | partial | open / dropped |
|---|---|---|---|---|
| ADOPT (AD-1..17) | 17 | 17 routed terminally | — | 3 route to non-wave owners (AD-11/12/17) |
| AMEND (AM-1..30) | 30 | 29 routed | — | AM-1 superseded by an un-crosswalked D-23 |
| ADD (ADD-1..13) | 13 | 12 routed | **ADD-1 routed but 0 gate text** (CH-4, W54 D-1, W46–W56) | ADD-8 → `ORCH-07` "unavailable" |
| KILL (KL-1..12) | 12 | 12 | — | — |
| REPAIR (R-01..20) | 20 | **14** (not 12) | **6** (not 5) | R-03 not installed; R-12 cargo unwritten; R-13 unexpressed; R-20 atlas retired-or-unverified |
| OWNER_RULING (D-1..22) | 22 | 22 present in the crosswalk with terminal dispositions | — | 4 carry dangling `R-nn` citations (D-16..D-19) |
| D-23 + 3 proof arms | 4 | D-23 ruled; P-1 GREEN, P-2 RED, P-3 RED | — | composite RED stands |
| OC-1 / OC-2 | 2 | 0 | — | OC-1 never ruled; OC-2 "adopted in substance" by the program itself |
| **total** | **120** | **≈96 verified landed at the formation layer** | 7 | 17 open / dropped / re-booked |

"Landed" here means **landed as formation text**, which is the only layer this
program claims. Production remains `0/193` by the fleet's own in-epoch text
(`README.md:39`) — correctly and honestly stated.

---

## 9. WHAT THE NEXT TRANCHE MUST NOT INHERIT UNEXAMINED

1. **CH-4 and W54 D-1 must be written into a gate cell as literal numbers**, or
   struck with a named rationale. Third deferral of an anti-deferral close-law.
2. **The aurora-derive row must be closed or killed by name** — it has ridden ten
   closes under four names since tranche A.
3. **R1 is a live shipping crash on the frozen public contract** and is broader
   than recorded. It has a wave owner only implicitly (V03/V-band). Give it a row.
4. **OC-1 must be ruled before any bench floor is cited again** — the current bar
   fails its own calibration subject on this rig.
5. **The `R-nn` and `D-nn` namespaces must be disambiguated** before any further
   mechanical join. Four live `D-nn` namespaces and one mis-resolving `R-nn`
   citation set are already on record.
6. **Move the parser-proof harnesses into the repo** or the G-1/G-2/G-3 gates are
   unreproducible.
7. **Re-pin the epoch with content-addressed copies** — the 2/2 seal is already
   unverifiable from live bytes and has been for four days.
8. **Re-run the repair-ledger tally.** The published score is 17-of-20.

---

*Audit seat: Opus 5 (1M), 2026-07-24. Sole write: this file. No `src/`, `demo/`,
`api/`, `vnext/`, `dev.sh`, or `INBOX.md` touched. Every number above traces to a
pasted command output, a `file:line`, or a quoted document line.*
