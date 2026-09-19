SERVED MODEL: claude-opus-5[1m]

# X.P.W4S — the X·P adjudicative close (supplement wave, minted by COHESION §0y)

**Track D · X·P** · spec = `docs/tranches/X/parse-that/waves/W4.md` **with its THIRD dated addendum**
(file end, line 678) · ruling of record **COHESION.md §0y** (2026-09-19, lines 1634–1688) · chassis
`EXECUTION-RUNBOOK.md` §1.4 (Track D, strictly serial) / §3.4 / §5.
**X.P.W4's CLOSED row is never rewritten.** This wave carries its own LEDGER row and this record.

## Open

**Date**: 2026-09-19 (sitting of record 2026-09-17, the owner's begin-word, COHESION §0j; OP-1 both
words GRANTED at §0j.E — the begin-word and *"You are authorized to publish, push, and pull whatever
items you need"*; the word licenses the release limb, it does not bypass a gate).

**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. Writable at this seat: this record ·
`execution/LEDGER.md` (row cell + event-log append only) · `docs/tranches/V/coordination/INBOX.md`
(mail rows only, if touched). No other path was written.

**CRASH-RECOVERY (standing law, host restart 2026-09-18).** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain`
→ `M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh` ·
`?? docs/tranches/V/megatranche/workflows/gates/`. **None is inside this seat's writable set**:
`CARRY-LEDGER.md` and the untracked `workflows/gates/` belong to sibling seats, `dev.sh` is unowned
and NEVER touched. `execution/LEDGER.md`, `INBOX.md` and `execution/D/X-P-W4S.md` are clean/absent —
**zero inherited edits on this unit**. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that status --porcelain`
→ 14 M/D + 16 `??` rows; `../parse-that` is **READ-ONLY, permanently for this program** (runbook
§5.5) and none of those paths is writable by any unit of this wave — they are not touched, not
stashed, not restored.

### Preconditions — verified at the bytes AND in the ledger

| # | condition | measured | verdict |
|---|---|---|---|
| OA-1 | **X.P.W4 CLOSED** (the wave this one supplements) | LEDGER Track D row: `**CLOSED 2026-09-17 (honest-RED: G-3 · G-10)**` ⟵ CHECK 3 CONFORMANT-HONEST-RED | **MET** |
| OA-2 | X.P.W4's named artefacts present (not the label — the bytes) | `SEAM-CONTRACT.md` (121,820 B) · `RELEASE-CONDITION.md` (26,049 B) · `RELEASE-PACKET.md` (23,017 B) · `waves/W4-CLOSE.md` · `scripts/seam-contract-check.mjs` · `DIVERGENCE-LEDGER.md` (131,539 B) · `evidence/W4/{packed-surface.json,wasm-imports.json,rc-p-evaluation.json,reciprocity-grep.txt,seam-contract-check.txt,seam-contract-negative-controls.txt,value-source-untouched.txt}` · `registry/harvest/x-p-w4.json` — **all PRESENT** | **MET** |
| OA-3 | the fresh root's three W4 scripts present (`.e`'s subject) | `<p2>/typescript/scripts/{packed-candidate-surface.mjs,rc-p-evaluate.mjs,wasm-admission.mjs}` · `<p2>/typescript/package.json` · `<p2>/typescript/src/css/build.mjs` — **all PRESENT** | **MET** |
| OA-4 | the 45 `PENDING-ADJUDICATION` cells `.f` must rule EXIST | ⟨cmd⟩ `grep -c '^\|.*PENDING-ADJUDICATION' SEAM-CONTRACT.md` → **47**; **45 of those lie inside the `<!-- SEAM-ROWS -->` block** (lines 112–163) and **2 are the §3a census table's own label rows** (lines 172–173). The contract's own §3a census reads `PENDING-ADJUDICATION **45**` / `identical **7**` / total **52**, and `seam-contract-check.mjs`'s DISPOSITION CENSUS prints the same 45 / 7. **§0y's 45 reproduces exactly** — the 47 is a grep of a label, not of a row | **MET** |
| OA-5 | `ADJUDICATION-W4.md` does NOT yet exist (`.f` creates it) | ⟨cmd⟩ `ls docs/tranches/X/parse-that/ADJUDICATION-W4.md` → **ABSENT** | **MET (correct open state)** |
| OA-6 | E13 mail closed in scope | **0 UNREAD** over **80** rows, double-run (below) | **MET** |

**Recorded for `.f`, not a blocker**: `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json`
**already exists** — filed 2026-09-18 by **X.P.W3.e** (`"servedModel": "claude-fable-5-1"`,
`"schema": "x-p-w3.e.harvest-fold/2"`, note: *"FOLDED … from the UNMODIFIED harvester's own outputs.
`harvest-journals.mjs` names every output by runId … and so cannot emit a file called
x-p-w3.json"*). §0y **F-w4c-2** grants that file to `.f` as a *create*. `.f` therefore **measures
before it writes**: if the existing fold already satisfies the §0p scratch-mirror procedure it is
cited, not overwritten (E-3 — dated evidence is immutable); if it does not, the correction lands as
a dated addendum-beside and the reason is printed. A blind create would destroy a sibling seat's
banked evidence.

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **Status cell by
position**, never from a bare `grep -i unread`; this file **self-excluded** (SELF-COUNT law).

⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|' '/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print c+0}'`
→ **0**, double-run `0 ≡ 0`, over **80** rows (⟨cmd⟩ same awk counting rows → `80`); tail ids
`O-38 · O-39 · O-40`.

1. `docs/tranches/V/` + `V/coordination/` — **10** depth-1 `.md` ⊕ **24** coordination entries.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest tranche dir**
   (⟨cmd⟩ `ls -1dt /Users/mkbabb/Programming/glass-ui/docs/tranches/*/ | head -3` → `BK/` (Sep 18
   17:53) · `BJ/` · `BI/`; **45** tranche dirs total, the letter sequence terminating at `BK`);
   **9** entries, newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed
   (⟨cmd⟩ `grep -c 'o26-reply' INBOX.md` → **32**).
3. `../keyframes.js/docs/tranches/V/coordination/` — **13** entries; newest inbound-grammar letter
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, ours, delivered.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — **28** entries, path **UNMOVED**
   (newest member Aug 3).

**Movement since the previous Track-D sweep**: ⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 06:00"`
→ exactly **one** member, `docs/tranches/V/coordination/INBOX.md` itself (**self**; the tail moved
`O-38` → `O-40` by sibling-track appends, not by this sweep).

**Result: ZERO unrowed letters addressed to value.js · ZERO new `I-n`/`O-n` minted by this seat ·
ZERO UNREAD Status cells.** `INBOX.md` is **not written** at this open; X·P's own packet row already
exists (G-8, filed at X.P.W4's close) and `.f`'s adjudication rows are its act, not pre-rowed.

## Baseline

Every command below run **READ-ONLY** at this seat's own clock, 2026-09-19. The two scripts that can
write were given `--out` into the session scratchpad, so **no byte of `evidence/W4/**` was touched**
(E-3: `.b`'s and `.d`'s dated evidence is immutable; `.e` banks NEW dated files beside them).

| gate | spec's declared birth | measured at THIS open | verdict |
|---|---|---|---|
| **G-1** seam contract 52/52 | born-RED (0 of 52) | `VERDICT: GREEN` — set-differences ∅/∅, census `PENDING-ADJUDICATION 45 · identical 7`, universe tally `{TOTAL:46, PARTIAL:6, ABSENT:0}` | **GREEN (inherited from X.P.W4)** |
| **G-2** zero value.js source bytes | born-RED (unasserted) | ⟨cmd⟩ `git -C … status --porcelain -- src api demo test e2e` → **0 lines** at this seat's first reading; **2 lines** at the settled bytes, both a **concurrent Track-A seat's** (see the note below) | **GREEN for X·P (this wave wrote none of them); the raw command is NOT clean — read it with attribution** |
| **G-3** packed candidate from the tarball | born-RED | **`resolved 0 of 52`**, `entryCount 1`, `seamSubpathDeclared false`, `G3: RED`, **exit 1**, double-run identical | **RED — `.e`'s cure target** |
| **G-4** Wasm zero-function-import | born-RED (no artifact) | `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `total 0 · functionKind 0`, instantiation OK, `"verdict": "GREEN"`, **exit 0** | **GREEN (inherited)** |
| **G-5** RC-P evaluator honest | born-RED (no evaluator) | evaluator runs; `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts FALSE: 1 PUBLISHED · 3 EQUIVALENCE · 4 ADMITTED`, **exit 1** | **GREEN (inherited) — the predicate itself honestly FALSE** |
| **G-6** reciprocity both ends | born-RED (neither dir existed) | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25** hits (≥ 2) | **GREEN (inherited)** |
| **G-7** forbidden edge at zero | INHERITED-GREEN FLOOR | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0** | **GREEN (floor held)** |
| **G-8** mail closed + lawful delivery path | born-RED (0 rows, no packet) | `ls RELEASE-PACKET.md` → present; `grep -c 'RELEASE-PACKET'` → 1, `'SS-6'` → 25, `'RC-P'` → 1 in INBOX; **0 UNREAD** | **GREEN (inherited)** |
| **G-9** adoption gap terminal disposition | born-RED | `W4-CLOSE.md` records the G-9 disposition (§6 G-9 *"never in silence"*) | **GREEN (inherited)** |
| **G-10** the R-A stamp act, **shape (a)** (F-w4c-1) | born-RED (0 of 5 stamped; open-state sum **5**) | ⟨cmd⟩ `for f in docs/tranches/X/parse-that/waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5**, double-run `5 ≡ 5` | **open-state CORRECT (5) — `.f`'s act drives it to 0 iff G-1..G-9 GREEN** |

**X.P.W4's own close read**: *"GREEN: G-1 · G-2 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9. RED: G-3 ·
G-10."* This open reproduces that reading **gate for gate at this seat's own commands** — the
supplement wave opens against exactly the state its ruling describes.

### Pasted outputs

**G-3 (`.e`'s born-RED), run 2 of 2** — ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>/g3-baseline-run2.json`:

```
"candidate": "@mkbabb/parse-that@1.0.0"
"tarball": "mkbabb-parse-that-1.0.0.tgz"
"tarballSha256": "efc11936d361820526a93ada2145012d0c58cec48cee9ccb9a19c22c66e74cda"
"entryCount": 1
"symbolCounts": { "runtime": 19, "types": 33, "total": 52 }
"seamSubpathDeclared": false
"resolved": "0 of 52"
"refusals": 5
"verdict": { "pack": true, "declaration": true, "install": true,
             "resolve": false, "refusals": true, "G3": "RED" }
EXIT=1
```

The manifest as the tarball ships it — **this is C1's subject, measured, not narrated**:

```
"declaredFiles": [ "./dist" ]
"declaredExports": { ".", "./core", "./diagnostics", "./packrat", "./utils" }
"seamSubpath": "./css"      ← asked for, NOT declared
```

**G-5 / RC-P, V = 4.0.0** — ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>/rcp-baseline.json`:

```
#  conjunct          MEASURED  VALUE   reading
1  PUBLISHED(V)      yes       FALSE   verify-packed-surface.mjs exited 1 against V's registry tarball
2  TOTALITY(V)       yes       TRUE    TRUE
3  EQUIVALENCE(V)    yes       FALSE   the harness exited 1 with 44 mirror-defects
4  ADMITTED(V)       NO        FALSE   V's installed bytes contain zero .wasm artifacts, so the
                                       admission has no subject — FALSE, not vacuously true
5  BAR-DISCHARGED    yes       TRUE    TRUE
6  ROUTED(V)         yes       TRUE    TRUE
RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)
EXIT=1
```

Two readings this banks for `.f`: **Q-RC-2 is already discharged at the bytes** — conjunct 4 reads
`FALSE, not vacuously true` against a Wasm-free `V`, exactly as §0y ruled; and **conjunct 3's subject
is still the harness, not V's tarball** — which is precisely **Q-RC-1**'s arm for `.f` to land (or to
return with the measured reason).

### WRITE-THEN-MEASURE — G-2's denominator moved under this open, and it is stated rather than smoothed

This seat's **first** reading of G-2 was ⟨cmd⟩ `git status --porcelain -- src api demo test e2e`
→ **0 lines**. At the settled bytes, minutes later, the same command reads **2 lines**:

```
 M demo/shell/PaneSlot.vue        (mtime 2026-09-19 08:36, +159/−…)
 M demo/shell/usePaneRouter.ts    (mtime 2026-09-19 08:35, +232/−…)
```

with `docs/tranches/X/waves/W5/` appearing untracked in the same interval. **Neither file was
touched by this seat, and neither belongs to any unit of this wave** — X·P writes **zero** value.js
source bytes under any reading (W4.md §3 Prohibitions), and `demo/**` is X·V's by COHESION §2's
routing law. The attribution is **Track A's open `X-W5`**, working the same checkout: four tracks
share this working tree, which is exactly why the pathspec-commit law exists.

**Consequence for `.f`'s G-2 re-run, recorded now so it is not discovered as a surprise**: the gate's
sentence — *"`git status --porcelain -- src api demo test e2e` is empty at every commit"* — was
authored for a tree in which X·P was the only writer. At this open it is **not empty, and X·P did not
make it non-empty**. `.f` re-runs it and reads it **with attribution**: the assertion X·P owes is that
**no commit of this wave contains a path under `src/**` · `demo/**` · `api/**` · `test/**` ·
`e2e/**`** (checkable by `git show --stat` over this wave's own commits, which is the claim §9's
commit plan makes), not that a shared checkout is globally clean. Smoothing this into a clean `0`
would be a false green; inventing a cure for a sibling's dirty path would be worse — those paths are
this wave's **Do-NOT-touch** list.

### R.2 — GREEN-before-cure, declared

Seven gates the **spec** declares born-RED read **GREEN at this open**: **G-1 · G-2 · G-4 · G-5 ·
G-6 · G-8 · G-9**. None is a W4S cure target: each was turned by **X.P.W4** and re-verified by its
CHECK 3, and each is listed here because R.2 forbids a silent green. They are `.f`'s **re-run**
obligations at its own clock, never inherited claims — a gate that has moved since X.P.W4's close is
a finding for `.f`, not a formality. **G-7** is an inherited-GREEN FLOOR by the spec's own words and
is listed for completeness of the sweep, not as a surprise. **G-3 is honestly RED**; **G-10's
open-state sum is 5**, which is the value the gate must find at open.

## Unit plan

Two units, **strictly serial** (§0y: *"Two serial units"*; runbook §1.4: Track D is serial).
`.e` must read `G3 GREEN` before `.f` re-runs G-1..G-10 — a stamp performed while any of G-1..G-9 is
red fails by G-10's own falsifier, and G-3 is the gate `.e` exists to turn.

| group | unit | model | gates |
|---|---|---|---|
| 1 | `X.P.W4.e` | opus | G-3 |
| 2 | `X.P.W4.f` | fable (FRESH adjudicator, M-23 §1) | G-1 · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 · G-10 |

**Disjointness**: the two units share **no** create/modify path. `.e` writes only in `<p2>` plus NEW
dated files under `evidence/W4/**`; `.f` writes only in value.js docs plus `<p2>/typescript/scripts/rc-p-evaluate.mjs`.
They are serial regardless, so no concurrency question arises.

**Locks and families** (runbook §3.4; W4.md §4a):
- **`.e` → `.f` serial**, never concurrent.
- **`.f`'s R-A stamp is ONE act** over the five four-verb `VERIFIED` rows (W0–W4) — the family does
  not split, and it is performed **iff** G-1..G-9 read GREEN at `.f`'s own re-run, else **withheld by
  gate id**.
- **The two COHESION carves** (§1 SS-5 status cell · §5 status-board line) land **only under a
  performed stamp** — `.f` performs both or neither (§0y).
- **`INBOX.md` is shared** with X·V's mail units (W4.md §4a cross-wave): `.f` must not run while an
  X·V mail unit is open; rows are appended, never rewritten.
- **`../parse-that`, `../keyframes.js`, `../fourier-analysis`, `../glass-ui` are READ-ONLY**
  (runbook §5.5). **Zero value.js `src/**`, `demo/**`, `api/**`, `test/**`, `e2e/**` bytes** — G-2
  asserts it at every commit.

### X.P.W4.e — packaging (F-w4b-3, cure (a))

- **Model**: opus (M-23 §2 — packaging is mechanism).
- **Spec sections**: `W4.md` **THIRD dated addendum** (line 678, the `X.P.W4.e` clause — the unit's
  own bounds and gate) · §3 Scope item 3 (lines 106–108) · §4 File Bounds (162–194, as amended
  beside by the addendum) · §4b Worktree Plan (216–237) · §6 **G-3** (383–397) · §7 (545–554) ·
  §9 Commit Plan (581–598) · COHESION **§0y F-w4b-3** (1642–1653).
- **Writable set** (exactly the third addendum's list):
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/package.json` ·
  `…/typescript/src/css/build.mjs` · `…/typescript/src/css/build/**` ·
  `…/typescript/src/css/lowering-js/js-alg.mjs` · `…/typescript/src/css/bounds.mjs` ·
  `…/typescript/src/css/lowering-wasm/index.mjs` (**the one artefact-loader line only, iff G-3's
  resolve leg names it**) · `/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W4/**`
  (**NEW dated files beside `.b`'s — never an overwrite**).
- **Gate**: **G-3** → `resolved 52 of 52`, `entryCount ≥ 2`, `G3 GREEN`, **double-run**, plus a
  **positive control in a staged consumer tree outside both repos**.

**Brief** (≤700 chars): Turn G-3 by the three cures, none a workaround. **C1**: `typescript/package.json` — `files` ships the css runtime **and** the Wasm artefact; `exports["./css"]` declares `import` + `types` (baseline: `files ["./dist"]`, five subpaths, `./css` absent, `entryCount 1`). **C2**: kill the `tsx/esm/api` runtime import at `js-alg.mjs:23` and `bounds.mjs:834` — the css layer imports the library through the package's **own built entry** (self-reference or `dist/`), never TS sources through a loader; declaring `tsx` a runtime dependency is **REFUSED**. **C3**: `build.mjs` emits the 33 frozen types as in-package bytes, byte-copied from the sha-pinned vendored 4.0.0 declaration with the sha in the emitted header; `ac1.d.ts` re-exports from that in-package file; no specifier escapes the package root. Then run `packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md` twice, bank NEW dated evidence beside `.b`'s, commit pathspec in `<p2>` and in value.js separately.

### X.P.W4.f — the fresh adjudicator (E-r2-1)

- **Model**: **fable**, and it must be **FRESH** (M-23 §1) — a seat that authored a gate cannot
  certify it; this seat authored no byte of X.P.W4 or of `.e`.
- **Spec sections**: `W4.md` **THIRD dated addendum** (line 678, the `X.P.W4.f` clause) · §2b OP-6
  (line 73) · §3 Scope items 6–10 (114–130) · §5 `X.P.W4.d` mechanism (293–312, the adjudicative
  half it inherits) · §6 **G-1..G-10** (314–543), **G-10 read in shape (a)** per the addendum ·
  §8 (556–579) · §9 (581–598) · §12 L-18 rider (651–665) · COHESION **§0y** (1634–1688, esp.
  E-r2-1 · F-w4c-2 · Q-RC-1 · Q-RC-2 · the two carves), **§0v** (1574–1584, GROUND-C) and **§0w**
  (1586–1602, the id-set + each class's ruling).
- **Writable set** (exactly the third addendum's list):
  `docs/tranches/X/parse-that/SEAM-CONTRACT.md` (**disposition + consumer-direction cells of the 45
  `PENDING-ADJUDICATION` rows only**) · `docs/tranches/X/parse-that/ADJUDICATION-W4.md` (**create**) ·
  `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (modify-append, `rulingId` fields) ·
  `docs/tranches/X/parse-that/waves/W4-CLOSE.md` (**append a dated §12 only**) ·
  `docs/tranches/X/parse-that/RELEASE-PACKET.md` (**a dated addendum section only**) ·
  `docs/tranches/V/coordination/INBOX.md` (mail rows) · the **five four-verb `VERIFIED` rows** in
  `docs/tranches/X/parse-that/waves/W0.md`, `W1.md`, `W2.md`, `W3.md`, `W4.md` (R-A, **one act, iff
  G-1..G-9 GREEN at this seat's own re-run**) · `docs/tranches/X/COHESION.md` (**§1 SS-5 cell + §5
  board line only, iff the stamp is performed**) ·
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/scripts/rc-p-evaluate.mjs` ·
  `docs/tranches/X/parse-that/RELEASE-CONDITION.md` (**§2.3 dated addendum only**) ·
  `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json` and `x-p-w4s.json` (create, §0p
  scratch-mirror — **`x-p-w3.json` already exists; measure before writing, see §Open**).
- **Gates**: **G-1..G-10**, re-run at its own clock; **G-10 in shape (a)** (the awk-narrowed command
  above): **5** at open, **0** after the stamp.

**Brief** (≤700 chars): Rule all **45** `PENDING-ADJUDICATION` seam cells by the **§0w id-set** `{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 · ID-5 · PB-11 · R-f1 · E-k2}` — GROUND-C cells under §0v (overflow is not a syntax error; range per production → `declared-divergence`, rulingId GROUND-C, consumer direction stated); every cell ends terminal (`identical` / `declared-divergence(rulingId)` / `incumbent-defect(rulingId)`), **none left PENDING**. Record each ruling with its predicate in `ADJUDICATION-W4.md` (create); append `rulingId` fields to `DIVERGENCE-LEDGER.md`; re-run `seam-contract-check.mjs`; re-run **G-1..G-10** at own clock with G-10's **shape (a)** command; perform the **R-A stamp iff G-1..G-9 GREEN**, else withhold **by gate id**; carve the two COHESION cells **only under a performed stamp**; land **Q-RC-1**'s V-tarball arm in `rc-p-evaluate.mjs` + a `RELEASE-CONDITION.md` §2.3 dated addendum, or return the measured reason; file the harvests. L-14: attempt refutation before certifying.

## Unit receipts

_(appended by each unit as it lands)_

### X.P.W4.e

**SERVED MODEL**: `claude-opus-5[1m]` · **status**: **ESCALATED** (G-3 advanced `0 of 52` → `19 of 52`,
still RED; the residual is a one-token defect in a file this unit may not write) · 2026-09-19.

**CRASH-RECOVERY (standing law).** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 status --porcelain`
→ `?? .worktrees/` **only** — the `<p2>` half of this unit's writable set carried **zero inherited
edits**. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 5 M + 2 `??`, and
**none inside `docs/tranches/X/parse-that/evidence/W4/**`** (that directory held exactly `.b`'s and
`.d`'s eight dated files, all committed). **No predecessor work was inherited, none was stashed, and
no dirty path outside the writable set was touched.**

#### Acts, in order

**A-0 · Measure before editing.** Every anchor the brief names was verified at the true bytes; **none
had drifted**. ⟨cmd⟩ `grep -rn 'tsx' src/css/` → `js-alg.mjs:23` (`import { tsImport } from "tsx/esm/api"`)
and `bounds.mjs:834` (`const { tsImport } = require_("tsx/esm/api")`) — the two sites §0y names, at the
lines §0y names. ⟨cmd⟩ `cat typescript/package.json` → `"files": ["./dist"]`, five `exports` subpaths,
**no `./css`**. ⟨cmd⟩ `ls typescript/dist` → **No such file or directory**: the manifest declared build
output that had never been built, which is why `.b`'s baseline read `entryCount 1` (the tarball carried
`package.json` and nothing else). ⟨cmd⟩ `grep -n 'from "' src/css/build/ac1.d.ts` → the single frozen
re-export, through `../../../../../value.js/docs/…/vendor/value-js-4.0.0/dist/subpaths/css` — **the only
specifier in all of `src/css/**` that leaves the package root** (⟨cmd⟩ `grep -rn 'from "\.\./\.\./' src/css/`
returns that one line).

**A-1 · The toolchain, so the subject exists.** ⟨cmd⟩ `npm install --package-lock=false --no-audit --no-fund`
in `<p2>/typescript` → `added 159 packages in 4s`; `--package-lock=false` so the unowned
`typescript/package-lock.json` is not written (⟨cmd⟩ `git status --porcelain` after → unchanged).
⟨cmd⟩ `npm run build` (`vite build`) → `dist/` emitted, 18 modules, `✓ built in 377ms`.

**A-2 · C1 — the manifest declares and ships the seam.** `typescript/package.json`:
`files` → `["./dist", "./src/css"]` (the css runtime **and** `src/css/build/ac1.wasm`, which lives
under it); `exports` gains
`"./css": { "types": "./src/css/build/ac1.d.ts", "import": "./src/css/build/ac1.js" }`.
No `"./package.json"` export is added, so the five forbidden deep specifiers keep refusing.

**A-3 · C2, site 1 — the loader dies at `js-alg.mjs`.** Line 23 becomes
`import { Parser, createParserContext } from "@mkbabb/parse-that";` — the **self-reference** this
package's own `exports["."]` resolves to `./dist/parse.js` — and `const pt = await tsImport("../../parse/index.ts", …)`
becomes `export { Parser, createParserContext }`. The subject is unchanged (`dist/parse.js` is built by
this root's own `vite build` from this root's own `src/parse/**`, OP-7); what changed is that the
lowering now addresses the library **the way a consumer does**. `tsx` as a runtime `dependency` was
**not** declared — the ruling refuses it. ⟨cmd⟩ `grep -nE '^\s*(import|const|let|var|await|return).*tsx' src/css/lowering-js/js-alg.mjs`
→ **no output, exit 1** (the three remaining hits are prose in the doc comment that records the removal).

**A-4 · C3 — the frozen types become the package's own bytes.** `src/css/build.mjs` now reads the
vendored 4.0.0 declaration, **halts** unless its sha256 is the value X.P.W3's own artefacts pin
(`evidence/W3/universe-52.json` `.frozen.sha256` = `evidence/W3/equivalence-full-surface.json`
`.declarationSha256` = `c81d095213d112c6bdbddf1ddb65da2a1286d6e2ff37f5f0ba40e78a439743d0`), and
**byte-copies** it beneath a provenance header into `src/css/build/value-css-4.0.0.d.ts`. `ac1.d.ts`
re-exports the 33 names from `"./value-css-4.0.0.js"` — the NodeNext spelling of a sibling `.d.ts`.
⟨cmd⟩ `node src/css/build.mjs` →
`value-css-4.0.0.d.ts   10910 bytes byte-copied · sha256 c81d0952…` ·
`ac1.d.ts   33 frozen types re-exported from ./value-css-4.0.0.js` · `EXIT=0`.
The same run rebuilt `ac1.wasm` (`636753` → `662339` bytes — the artefact brought current with W3's
grammar landings). **G-4 re-run on the rebuilt bytes**: ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm`
→ `functionKindImportsTotal 0`, `unaccountedImportsTotal 0`, instantiation ok, `"verdict": "GREEN"`, `EXIT=0`.

**A-5 · C2, site 2 — `bounds.mjs:834` NOT cured, and no substitute landed.** Measured at the built
bytes: ⟨cmd⟩ `node -e "import('./dist/parse.js')…"` → `Parser createParserContext … memoize mergeMemos
resetPackrat` · ⟨cmd⟩ `node -e "import('./dist/packrat.js')…"` → `memoize mergeMemos resetPackrat`.
**`packratEnter` / `packratExit` are on neither public subpath** (⟨cmd⟩ `cat dist/packrat.js` → the
chunk is re-exported as `m`/`i`/`k` only), and they are exactly what `readPackratArmState()` calls.
`armPackratArmState` and `resetPackratArmState` port to the built entry unchanged; **the readback does
not**. A module-local "have we armed" flag was **refused**: it would answer the very question
`latch.test.ts` L-3 exists to measure, turning a MEASURED red into an ASSERTED one — the masking
fallback `bounds.mjs:805-806` forbids in its own words. The file was therefore **left untouched**;
returned as **E-w4e-2**. Blast radius, measured: the site is a lazy `require` inside
`loadPackratInstrument()`, whose only callers are `test/css-recovery/boundary/latch.test.ts` and
`scripts/css-bench-three-leg.mjs` — both in-repo; `entry.mjs:87-89` takes only bounds **tables** from
the file, so the css parse path never reaches it, and G-3's resolve leg imported all 19 runtime names
from the installed tarball **with no `tsx` present**.

**A-6 · G-3, double-run at the settled bytes.** ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out …-run{1,2}.json`:

| reading | `.b`'s baseline (this record's Open) | X.P.W4.e, run 1 | run 2 |
|---|---|---|---|
| `entryCount` | **1** | **91** | **91** |
| `seamSubpathDeclared` | **false** | **true** | **true** |
| `resolved` | **0 of 52** | **19 of 52** | **19 of 52** |
| `tarballSha256` | `efc11936…` | `6b51c336…` | `6b51c336…` |
| `refusals` | 5 | 5 | 5 |
| `verdict.G3` | **RED** (exit 1) | **RED** (exit 1) | **RED** (exit 1) |

Runs 1 and 2 are identical, sha included. `pack` · `declaration` · `install` · `refusals` are **all
`true`**; the sole `false` is `resolve`, and within it the sole failure is the **types** half.

**A-7 · The positive control, in a staged tree outside both repos.** `<scratch>/pc-w4e` (neither repo
is an ancestor). Packed there, sha **`6b51c336…` — the same bytes the gate read**; installed with
`--ignore-scripts --package-lock=false`. ⟨cmd⟩ `node -e "import('@mkbabb/parse-that/css')…"` →
`RUNTIME resolved 19 of 19`. ⟨cmd⟩ `node <tsc> -p tsconfig.pc.json` (`NodeNext`, `strict: true`,
**`skipLibCheck: false`**, the gate's own consumer file with **one token changed**,
`ParseResult` → `ParseResult<unknown>`) → **`EXIT=0` — all 33 frozen types resolve from the consumer's
`node_modules`.** NEGATIVE control ⟨cmd⟩ `node <tsc> -p tsconfig.nc.json` (one absent name) → `EXIT=2`,
`TS2305: Module '"@mkbabb/parse-that/css"' has no exported member 'NotAFrozenType'` — so the green is
not a compiler that failed to look.

#### Gate readings — BEFORE → AFTER

| gate | before (this record's Open) | after X.P.W4.e | verdict |
|---|---|---|---|
| **G-3** | `resolved 0 of 52` · `entryCount 1` · `seamSubpathDeclared false` · exit 1 | `resolved 19 of 52` · `entryCount 91` · `seamSubpathDeclared true` · exit 1 | **STILL RED** — monotone, first iteration; cause isolated to a path outside this unit's bounds |
| **G-4** (not this unit's, re-read because this unit rebuilt its subject) | `total 0 · functionKind 0` · GREEN | `total 0 · functionKind 0` · GREEN on the rebuilt `ac1.wasm` | **GREEN, unmoved** |
| **G-2** (read with attribution, per this record's WRITE-THEN-MEASURE note) | 2 lines, Track A's | 20 lines, **all** Track A's `demo/**` + `e2e/**` | **GREEN for X·P** — ⟨cmd⟩ `git show --stat` over both of this unit's value.js/`<p2>` commits contains **no** path under `src/**` `demo/**` `api/**` `test/**` `e2e/**` |

**E13 mail**, double-run at this unit's own clock: ⟨cmd⟩ the positional Status-cell awk over
`INBOX.md` → `UNREAD=0 ROWS=80`, `UNREAD=0 ROWS=80`; ⟨cmd⟩ `find docs/tranches/V/coordination -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 08:45"` → **no member**. **Zero UNREAD in scope.**

**Format / lint (§7).** ⟨cmd⟩ `git diff --check` in `<p2>` → clean. ⟨cmd⟩ `node --check` on `build.mjs`
and `js-alg.mjs` → OK; `package.json` parses. ⟨cmd⟩ `node <tsc> --noEmit -p tsconfig.json` → **82 errors,
all pre-existing and all under `test/**`** (⟨cmd⟩ `cut -d'(' -f1 | sort -u` → 16 test files, **zero**
hits for `src/css/build`, `js-alg` or `package.json`); this unit wrote no `.ts` byte. `npx eslint .` was
**not run**: the fresh root carries no eslint configuration (⟨cmd⟩ `ls typescript/eslint.config.* typescript/.eslintrc*`
→ no matches), and inventing one is outside these bounds.

#### Commits

| repo | hash | meaning |
|---|---|---|
| `<p2>` | **`93bcb83`** | `feat(x-p-w4.e/packed)` — C1 + C2 site 1 + C3, **one commit, one meaning**: the manifest's `./css` export is only true if `ac1.d.ts`'s specifier stays in-package and `js-alg.mjs` no longer needs a loader, so splitting them would publish an intermediate state in which `./css` resolves to a broken graph. Pathspec: `typescript/package.json` · `typescript/src/css/build.mjs` · `typescript/src/css/build/{ac1.d.ts,ac1.wasm,value-css-4.0.0.d.ts}` · `typescript/src/css/lowering-js/js-alg.mjs` |
| value.js | **`e9140c34`** | `docs(x-p-w4.e/evidence)` — five **NEW dated** files under `evidence/W4/`; `.b`'s `packed-surface.json` and `wasm-imports.json` untouched (E-3) |

#### Residuals and escalations

- **E-w4e-1 — G-3's TYPES half is unsatisfiable as written, against the frozen surface itself.**
  `scripts/packed-candidate-surface.mjs:400` emits, for each of the 33 names,
  `export type __check_<N> = <N>;`. The frozen 4.0.0 declaration declares
  `export declare type ParseResult<T>` (⟨cmd⟩ `grep -n '^export declare type ParseResult' <vendored css.d.ts>`
  → `241:`) — **one required type parameter, no default** — so that line is
  `TS2314: Generic type 'ParseResult' requires 1 type argument(s)`, and `:420`
  (`resolved: compile.status === 0 ? true : !named(name) && diagnostics.length === 0`) turns that one
  diagnostic into **33 unresolved rows**. This is a property of the **assertion form**, not of the
  tarball: A-7 compiled the same 33 names from the same installed bytes at exit 0. It would fail for
  **any** candidate, `@mkbabb/value.js@4.0.0` included.
  **Minimal cure** (one token): emit `ParseResult<unknown>` for a generic name — or, more generally,
  `export type __check_<N> = typeof __t_<N>;`-free: read the genericity from the declaration and
  instantiate. **`scripts/packed-candidate-surface.mjs` is X.P.W4.b's file and is in NO row of this
  unit's writable set** (W4.md third dated addendum, the `X.P.W4.e` clause, which grants
  `package.json` · `build.mjs` · `build/**` · `js-alg.mjs` · `bounds.mjs` · one line of
  `lowering-wasm/index.mjs` · `evidence/W4/**` and nothing else). A write there is an **ESCALATION —
  stopped and returned**, not taken. **This is diagnostic iteration 1, and it was monotone**
  (`0 of 52` → `19 of 52`), so §3a's third-iteration trigger has **not** fired.
- **E-w4e-2 — C2's second site (`bounds.mjs:834`) cannot take the specified cure without a §3a
  File-bound expansion.** Measured in A-5 and in
  `evidence/W4/c2-built-entry-surface-2026-09-19-w4e.txt`. The two lawful cures, both outside these
  bounds: **(a)** add `packratEnter`/`packratExit` to `typescript/src/parse/packrat-entry.ts` so the
  built `./packrat` subpath carries the reader — then `bounds.mjs` imports
  `@mkbabb/parse-that/packrat`, the loader dies, and the instrument's reading is **fully preserved**;
  **(b)** rule that the instrument may not read the latch, and re-characterize ESC-c1's leg. `tsx`
  remains reachable from shipped bytes **only** through `loadPackratInstrument()`, which no consumer
  path calls.
- **`lowering-wasm/index.mjs` was NOT touched.** Its one-line grant was conditional — *"iff G-3's
  resolve leg names it"* — and the resolve leg named no artefact loader: the runtime half reached
  **19 of 19** from the installed tarball. The condition did not fire, so the line was left alone.
- **Recorded for `.f`, not a defect**: this unit rebuilt `ac1.wasm` (`636753` → `662339` B) as an
  unavoidable side effect of the `build.mjs` run C3 requires. G-4 re-reads **GREEN** on the new bytes
  and the fresh reading is banked dated; `.b`'s `wasm-imports.json` is untouched.
- **`.f` REMAINS BLOCKED** by this record's own serial lock — *"`.e` must read `G3 GREEN` before `.f`
  runs"* — and by G-10's falsifier (*a stamp performed while any of G-1..G-9 is red fails*). **G-3 is
  red.** The unblocking act is the one-token cure of E-w4e-1 by a seat that owns
  `packed-candidate-surface.mjs`; after it, G-3's resolve leg is expected to read **52 of 52** on the
  bytes already committed at `93bcb83` — expected, and therefore **to be measured, not assumed**.
