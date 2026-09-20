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

## Close

**SERVED MODEL**: `claude-opus-5[1m]` · **CLOSE SEAT (VERIFY-ONLY — this seat cured nothing, and
wrote no byte outside this record, `execution/LEDGER.md`)** · 2026-09-19.
**Verdict: PARTIAL.** `.e` LANDED-AND-ESCALATED (three cures, G-3 `0 of 52` → `19 of 52`, still
RED); **`.f` WAS NEVER DISPATCHED** — held by this record's own serial lock (*"`.e` must read
`G3 GREEN` before `.f` re-runs G-1..G-10"*) and, independently, by §6 G-10's falsifier (*"a stamp
performed while any of G-1..G-9 is red fails"*). The R-A stamp is **WITHHELD by gate id: G-3**.

**CRASH-RECOVERY (standing law, host restart 2026-09-18).**
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **27** rows: 20 `M` under
`demo/**` + `e2e/**`, plus `docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh` ·
`vite.config.ts`, and 4 untracked (`workflows/gates/` · `X/keyframes/evidence/W12/KF-W12-d-born-red.md` ·
`X/waves/W5/` · `plugins/vite-ground-tokens.ts`). **None is inside this seat's writable set** —
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/D/X-P-W4S.md docs/tranches/X/execution/LEDGER.md`
→ **0 lines**, both clean. ⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` only.
**Zero inherited edits on this close.** Nothing stashed, nothing restored, no dirty path outside the
writable set touched — `scripts/dev/dev.sh` never staged.

### 1. ACT 1 — every unit's commits exist, and touch only that unit's writable set

⟨cmd⟩ `git show --name-only --format=` over each hash, compared against the third dated addendum's
`X.P.W4.e` clause:

| repo | hash | paths (measured) | in-bounds |
|---|---|---|---|
| `<p2>` | **`93bcb83`** | `typescript/package.json` · `typescript/src/css/build.mjs` · `typescript/src/css/build/{ac1.d.ts,ac1.wasm,value-css-4.0.0.d.ts}` · `typescript/src/css/lowering-js/js-alg.mjs` — **6 files** | **YES** — ⟨cmd⟩ the same list filtered against the addendum's grant (`package.json` · `build.mjs` · `build/**` · `js-alg.mjs`) → **out-of-bounds count 0** |
| value.js | **`e9140c34`** | five NEW dated files under `docs/tranches/X/parse-that/evidence/W4/` (`c2-built-entry-surface-…` · `packed-candidate-controls-…` · `packed-surface-…-run1.json` · `…-run2.json` · `wasm-imports-…json`), **1796 insertions, 0 deletions** | **YES** — insert-only, so `.b`'s `packed-surface.json` / `wasm-imports.json` are provably untouched (E-3) |
| value.js | **`f170e178`** | `docs/tranches/X/execution/D/X-P-W4S.md` only, **163 insertions, 0 deletions** | **YES** — the unit receipt, append-only |

**`bounds.mjs` is absent from `93bcb83`** — the file `.e` refused to cure without a §3a expansion was
left byte-identical, which the commit's own file list proves. **`lowering-wasm/index.mjs` is absent**
— its grant was conditional and the condition did not fire.
**LANDED-WRONG: none.** ⟨cmd⟩ `git show --name-only --format= f170e178 e9140c34 | grep -cE '^(src|demo|api|test|e2e)/'`
→ **0**. No commit of this wave contains a value.js source path, which is the claim §9's commit plan
makes and the executable form of G-2.

### 2. ACT 2 — every spec gate re-run at THIS seat's clock, against §6's GREEN definitions

Both writing scripts were given `--out` into the session scratchpad, so **no byte of
`evidence/W4/**` was touched by this close**. Every reading double-run.

| gate | §6 GREEN definition | BEFORE (this record's Open) | AFTER (close seat, 2026-09-19) | verdict |
|---|---|---|---|---|
| **G-1** | both set-differences ∅; no disposition contradicts the ledger; no blank field; exits 0 | GREEN | ⟨cmd⟩ `node …/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · rows `52/52`, ledger 47 · census `PENDING-ADJUDICATION 45 · identical 7` · universe tally `{TOTAL:46, PARTIAL:6, ABSENT:0}` · `VERDICT: GREEN`, **EXIT=0, double-run `0 ≡ 0`** | **GREEN (unmoved)** |
| **G-2** | no value.js source byte at any commit of the wave | GREEN for X·P (2 foreign lines) | raw ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **20 lines**, **all** `demo/**` + `e2e/**`, **all a concurrent Track-A `X-W5` seat's**; the gate's own assertion ⟨cmd⟩ `git show --name-only --format=` over this wave's three commits → **0** such paths | **GREEN for X·P — read with attribution, not smoothed** |
| **G-3** | `resolved 52 of 52`, `G3 GREEN`, exit 0 | `resolved 0 of 52` · `entryCount 1` · `seamSubpathDeclared false` · sha `efc11936…` · exit 1 | `resolved **19 of 52**` · `entryCount **91**` · `seamSubpathDeclared **true**` · `refusals 5/5` · sha `6b51c336…` · `verdict {pack:true, declaration:true, install:true, **resolve:false**, refusals:true, G3:"RED"}` · **EXIT=1**; double-run leg-for-leg identical (`pack` · `declaration` · `install` · `types` · `resolve` · `refusals` all `EQ`; only `generatedAt` differs) | **RED — monotone, and honestly so** |
| **G-4** | 0 function-kind imports · empty-import instantiation · every import accounted | GREEN | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` · `functionKindZero true` · `emptyImportInstantiation true` · `everyImportAccounted true` · `"verdict": "GREEN"` · **EXIT=0, double-run**, on `.e`'s **rebuilt** `ac1.wasm` (662339 B) | **GREEN (re-verified on the new bytes)** |
| **G-5** | the evaluator prints the six-row table and exits non-zero while any conjunct is false, naming which | GREEN (honestly FALSE) | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`; conjunct 4 reads *"FALSE, not vacuously true"* (**Q-RC-2 discharged at the bytes**); **EXIT=1, double-run identical** | **GREEN — the predicate honestly FALSE** |
| **G-6** | ≥ 2 hits naming `RC-P` by predicate, in files X·P may not write | 25 | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**, double-run `25 ≡ 25` | **GREEN** |
| **G-7** | INHERITED-GREEN FLOOR — the direct edge absent | 0 / 0 | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0**; double-run `0/0 ≡ 0/0` | **GREEN — floor held** |
| **G-8** | packet exists in-repo · dated row names that path + the SS-6 batch · 0 UNREAD | GREEN | ⟨cmd⟩ `ls RELEASE-PACKET.md` → present (**23017 B**); `grep -c` in `INBOX.md`: `RELEASE-PACKET` → **1**, `SS-6` → **25**, `RC-P` → **1**; **UNREAD = 0 over 80 rows**, double-run | **GREEN** |
| **G-9** | a terminal disposition, never silence | GREEN | `W4-CLOSE.md` §4 records disposition **(C)** — `BLOCKED-ON` + re-trigger, quoted by id from COHESION §0i.1; ⟨cmd⟩ `git show --name-only` over this wave's commits → **0** paths under `docs/tranches/X/waves/` (X·P authored no X·V wave) | **GREEN — recorded, not decided here** |
| **G-10** | shape (a) sum **5** at open, **0** after the stamp | open-state **5** | ⟨cmd⟩ `for f in …/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5**, double-run `5 ≡ 5`; ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → no sibling claims the stamp (W0/W1 explicitly defer it to X.P.W4's close, W2 restates R-A) | **RED — the act was not performed; the open-state value is correct and the stamp is WITHHELD by gate id G-3** |

**GREEN: G-1 · G-2 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 (8). RED: G-3 · G-10 (2).** This close
reproduces X.P.W4's own reading gate for gate, at this seat's own commands — the supplement wave
moved G-3's *interior* (`resolve` is now the sole false leg, and within it the sole failure is the
types half) without turning its verdict.

**E-w4e-1 CONFIRMED independently, not accepted on report.** ⟨cmd⟩ the G-3 run's `legs.types` →
`{"ok":false,"status":2,"diagnostics":["…<consumer>/consumer.ts(55,35): error TS2314: Generic type
'ParseResult' requires 1 type argument(s)."]}` — **exactly one diagnostic**, and
`packed-candidate-surface.mjs:400` emits `export type __check_${name} = ${name};` while `:420` reads
`resolved: compile.status === 0 ? true : !named(name) && diagnostics.length === 0`, so that one
diagnostic makes `diagnostics.length !== 0` true for **all 33** type rows (⟨cmd⟩ the resolve leg →
`52 rows · 33 unresolved, kind=types · resolved runtime 19 · resolved types 0`). ⟨cmd⟩
`grep -n '^export declare type ParseResult' <pinned source>` → **`241:export declare type ParseResult<T> = {`**
— one required parameter, no default. It is a defect of the **assertion form**, not of the tarball,
and it would fail for any candidate. **`.e`'s escalation is upheld as measured.**

**C3's byte-copy claim verified at the bytes** (a claim about provenance is worth checking, not
reading): ⟨cmd⟩ `shasum -a 256 <pinned source css.d.ts>` → `c81d0952…`, `wc -c` → **10910**;
⟨cmd⟩ `tail -n +16 src/css/build/value-css-4.0.0.d.ts | shasum -a 256` → **`c81d0952…`**, `wc -c` →
**10910**. The body beneath the provenance header is the source file's bytes, verbatim, to the byte
and to the hash.

### 3. ACT 3 — §8 Verification Artefacts, as written

| artefact | state |
|---|---|
| `SEAM-CONTRACT.md` | PRESENT 121820 B |
| `RELEASE-CONDITION.md` | PRESENT 26049 B |
| `RELEASE-PACKET.md` | PRESENT 23017 B |
| `waves/W4-CLOSE.md` | PRESENT 39300 B |
| `DIVERGENCE-LEDGER.md` | PRESENT 131539 B |
| `scripts/seam-contract-check.mjs` | PRESENT 16379 B |
| `evidence/W4/packed-surface.json` · `wasm-imports.json` · `rc-p-evaluation.json` | PRESENT 128861 / 9392 / 33938 B (`.b`'s and `.d`'s, untouched) |
| `evidence/W4/value-source-untouched.txt` · `reciprocity-grep.txt` | PRESENT 3312 / 3951 B |
| `evidence/W4/**` **NEW dated 2026-09-19** (`.e`'s) | 6 files: `packed-surface-…-run1.json` · `…-run2.json` · `packed-candidate-controls-…` · `c2-built-entry-surface-…` · `wasm-imports-…json` · `rc-p-evaluation-after-packet-…` |
| `registry/harvest/x-p-w4.json` | PRESENT 119964 B (X.P.W4's) |
| commit hashes, both roots | `93bcb83` (`<p2>`) · `e9140c34` · `f170e178` (value.js) — §1 above |
| `registry/harvest/x-p-w4s.json` (this wave's L-13) | **ABSENT — `.f`'s act, never dispatched.** Named as a residual, not silently omitted |

### 4. ACT 4 — E13, the four paths swept again at the close seat's clock

1. `docs/tranches/V/` + `V/coordination/` — **10** depth-1 `.md` ⊕ **24** coordination entries.
2. `../glass-ui/docs/tranches/` — **BK** still the newest dir; **9** entries; newest
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, already rowed.
3. `../keyframes.js/docs/tranches/V/coordination/` — **13** entries; newest
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, ours, delivered.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — **28** entries, **UNMOVED**.

⟨cmd⟩ the positional Status-cell awk over `INBOX.md` (this file self-excluded) → **`UNREAD=0`**,
double-run `0 ≡ 0`, over **`ROWS=80`**. ⟨cmd⟩ `find <the three live paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 09:00"`
→ **no member**. **ZERO UNREAD in scope; no letter unrowed; `INBOX.md` not written by this close** —
the adjudication rows are `.f`'s act and are not pre-rowed by a verify-only seat.

### 5. Commit roster

| # | repo | hash | meaning |
|---|---|---|---|
| 1 | `<p2>` | `93bcb83` | `feat(x-p-w4.e/packed)` — C1 the manifest declares and ships `./css`; C2 site 1 the `tsx/esm/api` loader dies at `js-alg.mjs`; C3 the 33 frozen types become in-package bytes. One commit, one meaning (a `./css` export that resolved to a broken graph would be the intermediate state a split would publish) |
| 2 | value.js | `e9140c34` | `docs(x-p-w4.e/evidence)` — five NEW dated evidence files beside `.b`'s |
| 3 | value.js | `f170e178` | `docs(x-p-w4.e)` — the unit receipt in this record |
| 4 | value.js | *this close* | `docs(x-p-w4s/close)` — this `## Close` |
| 5 | value.js | *this close* | `docs(X·exec)` — the LEDGER row + event-log append |

### 6. Residuals, with named owners

| id | residual | owner |
|---|---|---|
| **R-1** | **`registry/harvest/x-p-w4s.json` was never filed**, and `harvest-journals.mjs` was never run for this wave (L-13). `.f` was not dispatched; a verify-only close seat does not own `registry/**` | **`X.P.W4.f`** (§0y F-w4c-2) |
| **R-2** | The **45 `PENDING-ADJUDICATION` seam cells remain PENDING**; `ADJUDICATION-W4.md` remains ABSENT; `DIVERGENCE-LEDGER.md` carries no `rulingId` appends from this wave | **`X.P.W4.f`** |
| **R-3** | **The packed tarball now ships `src/css/bounds.mjs`, which holds a lazy `require_("tsx/esm/api")` at :834, while `dependencies` is `{}`** — measured: ⟨cmd⟩ the install leg's 91 entries include `src/css/bounds.mjs`, and ⟨cmd⟩ `node -e` over the manifest → `deps: {}`. It is **latent, not a load failure**: the require sits inside `loadPackratInstrument()`, `entry.mjs:89` imports only tables from that module, and G-3's resolve leg imported **19 of 19** runtime names from the installed tarball with no `tsx` present. C1 landing while C2 site 2 could not is exactly what put it in the tarball | **E-w4e-2's cure (a)** — a seat owning `typescript/src/parse/packrat-entry.ts` |
| **R-4** | **`.e` rebuilt `ac1.wasm`** (636753 → 662339 B) as an unavoidable effect of the C3 build. G-4 re-reads GREEN on the new bytes at this close, and `.b`'s `wasm-imports.json` is untouched (E-3), so `.b`'s banked artefact now describes the **previous** bytes. Disclosed, not cured | recorded for **`X.P.W4.f`** |
| **R-5** | **`npx eslint .` was not run in `<p2>`** (§7): the fresh root carries no eslint configuration, and inventing one is outside every unit's bounds. `git diff --check` clean; `node --check` OK; `tsc --noEmit` → 82 pre-existing errors, all under `test/**`, none in a file this wave wrote | recorded; a config is an owner/architecture act |
| **R-6** | **`<p2>` has no git remote** (⟨cmd⟩ `git remote -v` → empty; branch `w2/harness`), so its commit `93bcb83` **cannot be pushed**. The fresh root is local by construction (X.P.W0) | recorded — not a defect of this wave |

### 7. Escalations, carried forward unresolved

- **E-w4e-1 — G-3's TYPES half is unsatisfiable as written.** Upheld and independently confirmed
  above. **Minimal cure: one token** — instantiate the generic in the generated check line
  (`ParseResult<unknown>`), or read genericity from the declaration.
  `scripts/packed-candidate-surface.mjs` is **`X.P.W4.b`'s file** and appears in **no row** of
  `.e`'s writable set, so the write was stopped and returned rather than taken. **This close does
  not take it either** — a verify-only seat that cures its own red gate has destroyed the
  separation the seat exists to provide. Diagnostic iteration **1**, monotone; §3a's
  third-iteration trigger has **not** fired.
- **E-w4e-2 — `bounds.mjs:834` cannot take the specified cure without a §3a File-bound expansion.**
  Two lawful cures, both outside these bounds: **(a)** export `packratEnter`/`packratExit` from
  `typescript/src/parse/packrat-entry.ts` so the built `./packrat` subpath carries the reader;
  **(b)** rule that the instrument may not read the latch, and re-characterize ESC-c1's leg. The
  module-local flag was **refused** — it would assert the very state `latch.test.ts` L-3 measures.
  R-3 is this escalation's consumer-visible shadow.

**Both escalations are returned by id to the orchestrator. Neither was worked around; no `try/catch`,
no `test.skip`, no allowlist, no producer selector, no node_modules patch was added by any seat of
this wave — the two files that would have needed them (`packed-candidate-surface.mjs`,
`bounds.mjs`) are byte-identical to their pre-wave state.**

### 8. Four-verb — moved exactly as the spec says this wave moves it, and no further

**W4.md §2 R-A**: *"VERIFIED is stamped only at this wave's release close"*, by `.d`/`.f` alone, and
§6 G-10: *"A stamp performed while any of G-1..G-9 is red fails."* **G-3 is RED.**

| verb | value after this close | evidence |
|---|---|---|
| AUDITED | **YES** (unchanged) | W4.md §2 |
| SPECIFIED | **YES** (unchanged) | W4.md §2 + the three dated addenda |
| IMPLEMENTED | **NO — PARTIAL** | 1 of 2 units landed; 8 of 10 gates GREEN; G-3 · G-10 RED |
| VERIFIED | **NO — WITHHELD by gate id G-3** | not this seat's to stamp (R-A); the shape-(a) sum stands at **5**, and **no byte of `waves/W0..W4.md` was written by this close** |

**X.P.W4's CLOSED row is untouched.** No four-verb table, no `COHESION.md` cell, no
`SEAM-CONTRACT.md` disposition, and no `INBOX.md` row was written by this close seat.

### 9. Push

- ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js push origin HEAD` →
  `To https://github.com/mkbabb/value.js.git` · **`a54c148a..8424a6eb  HEAD -> tranche-u`**, exit 0.
- ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that push origin HEAD` → **`Everything up-to-date`**
  — the frozen read-only root is **0 commits ahead of upstream** (⟨cmd⟩ `git rev-list --count @{u}..HEAD`
  → **0**), so the push published **nothing**; this wave landed no commit there and never will
  (runbook §5.5). Measured before the act, not discovered by it.
- `<p2>` **cannot be pushed** — no remote (R-6). `93bcb83` lives in the local fresh root.

### 10. The unblocking act, stated so it cannot be mistaken for a schedule

`.f` must not run. The sequence is: **(i)** a seat that owns `packed-candidate-surface.mjs` lands
E-w4e-1's one-token cure; **(ii)** G-3 is re-run on the bytes **already committed at `93bcb83`** —
its resolve leg is *expected* to read `52 of 52`, and the expectation is **to be measured, not
assumed**; **(iii)** only with `G3 GREEN` may `.f` open, re-run G-1..G-10 at its own clock, rule the
45 cells, and perform the R-A stamp. E-w4e-2 does not hold G-3 red and can be sequenced
independently.

---

# RESUME — SECOND SITTING (2026-09-19, on COHESION §0aa)

**SERVED MODEL**: `claude-opus-5[1m]` · **SEAT 0 (RE-OPEN)**. The wave resumes rather than re-opens:
`.e`'s commits stand and are **never re-dispatched** (§0aa *"`.e`'s commits stand (`93bcb83`; never
re-dispatched)"*). The sections above are **dated evidence and are not rewritten** (E-3); everything
below is measured at **this** seat's own clock.

## Open — RESUME

**Ruling of record**: **COHESION §0aa** (2026-09-19, lines 1729–1755) — `.e`'s two escalations
**upheld as measured and ruled**, unit **`X.P.W4.e2` (Opus) MINTED**, serial between `.e` and `.f`;
`.f` opens **iff `.e2` reads `G3 GREEN`** (the wave's serial lock, adopted from the PARTIAL close's
own ordering). Unit spec = `W4.md`'s **FOURTH dated addendum** (file end) for `.e2` and its **THIRD**
for `.f`. Chassis `EXECUTION-RUNBOOK.md` §1.4 (Track D, strictly serial) / §3.4 / §5.
**X.P.W4's CLOSED row is never rewritten**; this wave keeps its own row and this record.

**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. Writable at this seat: this record ·
`execution/LEDGER.md` (row cell + event-log append only) · `docs/tranches/V/coordination/INBOX.md`
(mail rows only, if touched — **not touched**). No other path was written.

**CRASH-RECOVERY (standing law, host restart 2026-09-18).**
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **3** rows:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M docs/tranches/X/keyframes/evidence/W12/KF-W12-d-born-red.md` ·
`M scripts/dev/dev.sh`. **None is inside this seat's writable set** — the first two are sibling
seats' (V-reformation, Track B's X·KF W12), `dev.sh` is unowned and **never staged**.
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/D/X-P-W4S.md docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md`
→ **0 lines**, all three clean. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/evidence/W4/`
→ **0 lines** (the half of `.e2`'s writable set that lives in value.js carries **zero inherited
edits**). ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 status --porcelain`
→ `?? .worktrees/` **only** — `packed-candidate-surface.mjs`, `packrat-entry.ts` and `bounds.mjs`
are **byte-clean**, so `.e2` inherits nothing and starts from `93bcb83`'s settled bytes.
**Nothing stashed, nothing restored, no dirty path outside the writable set touched.**

### Preconditions — verified at the bytes AND in the ledger

| # | condition | measured | verdict |
|---|---|---|---|
| RA-1 | **`.e` LANDED and is never re-dispatched** | ⟨cmd⟩ `git -C <p2> log --oneline -1` → **`93bcb83 feat(x-p-w4.e/packed): the candidate DECLARES and SHIPS its /css seam …`** — HEAD of `<p2>`, so no unit has landed after it; value.js carries `e9140c34` (evidence) · `f170e178` (receipt) · `2bf4b205` + `dfb9eab5` (close) · `8424a6eb` (LEDGER) | **MET — `alreadyDone`** |
| RA-2 | **`.e2` has landed NOTHING** (the resume is honest about what is owed) | ⟨cmd⟩ `git -C <p2> log --oneline -8` → no `e2` commit; ⟨cmd⟩ `git -C value.js log --oneline -12` → no `e2` commit; `<p2>` working tree clean but for `?? .worktrees/` | **MET — `.e2` is owed in full** |
| RA-3 | **§0aa exists and rules both escalations** | `COHESION.md:1729` `## §0aa ADDENDUM 2026-09-19 — X.P.W4S's '.e' ESCALATIONS (E-w4e-1 · E-w4e-2) RULED; UNIT '.e2' MINTED; '.f' OPENS ONLY ON 'G3 GREEN'`, landed at `f830c384` | **MET** |
| RA-4 | **`W4.md`'s FOURTH dated addendum exists and IS `.e2`'s unit spec** | ⟨cmd⟩ `tail` of `waves/W4.md` → *"ADDENDUM 2026-09-19 (fourth, beside — E-3; COHESION §0aa). Unit `X.P.W4.e2` (Opus), serial between `.e` and `.f`."* with the writable list and the gate | **MET** |
| RA-5 | **`.e2`'s three cure sites are at the bytes §0aa names** | ⟨cmd⟩ `sed -n '395,425p' scripts/packed-candidate-surface.mjs` → the emitter at `:400` reads `` `export type __check_${name} = ${name};` `` and `:420` reads `resolved: compile.status === 0 ? true : !named(name) && diagnostics.length === 0`; ⟨cmd⟩ `grep -n export src/parse/packrat-entry.ts` → `5: export { memoize, mergeMemos, resetPackrat } from "./packrat.js";` (**`packratEnter`/`packratExit` ABSENT**); ⟨cmd⟩ `sed -n '828,842p' src/css/bounds.mjs` → `const { tsImport } = require_("tsx/esm/api");` inside `loadPackratInstrument()` | **MET — none drifted** |
| RA-6 | `ADJUDICATION-W4.md` still ABSENT (`.f` creates it); `x-p-w4s.json` still ABSENT | ⟨cmd⟩ `ls …/ADJUDICATION-W4.md` → *No such file or directory*; ⟨cmd⟩ `ls registry/harvest/` → `x-p-w3.json` **129579 B** (X.P.W3.e's, 2026-09-18 — `.f` MEASURES before writing, §0y F-w4c-2) · `x-p-w4.json` **119964 B** · **no `x-p-w4s.json`** | **MET (correct open state)** |
| RA-7 | E13 mail closed in scope | **0 UNREAD** over **80** rows, double-run (below) | **MET** |

### E13 Step-0 — the four-path mail sweep, at this seat's clock

Classification read from each row's **Status cell by position** (both INBOX tables put Status at
field 6 — ⟨cmd⟩ `grep -n '^| # |'` → `41:| # | Date | From | Letter | Status | Owner |` and
`66:| # | Date | To | Letter | Status |`), never from a bare `grep -i unread`; this record
self-excluded (SELF-COUNT law).

⟨cmd⟩ `sed 's/\|/@PIPE@/g' INBOX.md | awk -F'|' '/^\| [IO]-[0-9]+[a-z]? \|/ {n++; s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print "ROWS="n+0" UNREAD="c+0}'`
→ **`ROWS=80 UNREAD=0`**, double-run **`ROWS=80 UNREAD=0`**. Tail ids `O-37 · O-38 · O-39 · O-40`.

1. `docs/tranches/V/` + `V/coordination/` — **10** depth-1 `.md` ⊕ **24** coordination entries.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest tranche dir**
   (⟨cmd⟩ `ls -1dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`); **9** entries,
   newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, already rowed.
3. `../keyframes.js/docs/tranches/V/coordination/` — **13** entries; newest inbound-grammar letter
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21**, ours, delivered.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — **28** entries, **UNMOVED**.

⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 09:10"` → **no
member** — **nothing has moved since the PARTIAL close's own sweep.**

**Result: ZERO unrowed letters addressed to value.js · ZERO new `I-n`/`O-n` minted by this seat ·
ZERO UNREAD Status cells.** `INBOX.md` is **not written** at this re-open; `.f`'s adjudication rows
are its act and are not pre-rowed.

## Baseline — RESUME

Every command READ-ONLY at this seat's clock, 2026-09-19. The three writing scripts were given
`--out` into the session scratchpad, so **no byte of `evidence/W4/**` was touched** (E-3). The
BEFORE column is now **`.e`'s settled bytes** (`93bcb83`), not `.b`'s — which is the honest
denominator for `.e2`.

| gate | §6 GREEN definition | measured at THIS re-open | verdict |
|---|---|---|---|
| **G-1** | both set-differences ∅; no disposition contradicts the ledger; no blank field; exit 0 | `VERDICT: GREEN — both set-differences ∅, no disposition contradicts the ledger, every carried cell publishes PENDING-ADJUDICATION, no field is blank`, **double-run identical** | **GREEN (inherited)** |
| **G-2** | no value.js source byte at any commit of the wave | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **0 lines** (Track A's `demo/**`+`e2e/**` rows the close seat read with attribution have since **landed** at `de99ec15`, so the raw command is clean again) | **GREEN** |
| **G-3** | `resolved 52 of 52`, `G3 GREEN`, exit 0 | `tarballSha256 6b51c336…` · `entryCount 91` · `seamSubpathDeclared true` · **`resolved 19 of 52`** · `refusals 5` · `verdict {pack:true, declaration:true, install:true, **resolve:false**, refusals:true, G3:"RED"}`; **double-run byte-identical but for `generatedAt`** | **RED — `.e2`'s cure target** |
| **G-4** | 0 function-kind imports · empty-import instantiation · every import accounted | `artifacts 1 · admitted 1 · functionKindImportsTotal 0 · unaccountedImportsTotal 0 · "verdict": "GREEN"`, double-run, on `.e`'s **rebuilt** `ac1.wasm` | **GREEN** |
| **G-5** | the evaluator prints the six-row table and exits non-zero while any conjunct is false, naming which | `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)`; conjunct 4 *"FALSE, not vacuously true"* (**Q-RC-2 discharged at the bytes**); conjunct 3's subject is **still the harness** (**Q-RC-1 is `.f`'s arm**) | **GREEN — honestly FALSE** |
| **G-6** | ≥ 2 hits naming `RC-P` by predicate, in files X·P may not write | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**, double-run `25 ≡ 25` | **GREEN** |
| **G-7** | INHERITED-GREEN FLOOR — the direct edge absent | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0** | **GREEN — floor held** |
| **G-8** | packet in-repo · dated row names it + the SS-6 batch · 0 UNREAD | `RELEASE-PACKET.md` **23017 B**; `grep -c 'RELEASE-PACKET' INBOX.md` → **1**; **UNREAD 0 / 80 rows** | **GREEN** |
| **G-9** | a terminal disposition, never silence | `waves/W4-CLOSE.md` PRESENT **39300 B**, §4 records disposition **(C)** | **GREEN** |
| **G-10** | shape (a) sum **5** at open, **0** after the stamp | ⟨cmd⟩ `for f in …/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5**, double-run `5 ≡ 5` | **open-state CORRECT (5) — the stamp is `.f`'s, still WITHHELD by gate id G-3** |

**`.e2`'s second gate, born-RED at this re-open** — ⟨cmd⟩ `grep -rn 'tsx' src/css/` in `<p2>/typescript`
→ **5** hits: `bounds.mjs:818` (prose) · **`bounds.mjs:834` — `const { tsImport } = require_("tsx/esm/api");`, the live one** · `js-alg.mjs:38,42,45` (prose recording `.e`'s removal).
**One live code hit remains, and it is exactly E-w4e-2's site.** §0aa's GREEN for this leg is **0**
over shipped bytes.

### Pasted output — G-3, run 2 of 2 (the BEFORE that `.e2` must move)

```
"candidate": "@mkbabb/parse-that@1.0.0"
"tarballSha256": "6b51c33608baf0b60273b813eec5ff8df702cf2a3b4fc5053258014208a11103"
"entryCount": 91
"symbolCounts": { "runtime": 19, "types": 33, "total": 52 }
"seamSubpathDeclared": true
"resolved": "19 of 52"
"refusals": 5
"verdict": { "pack": true, "declaration": true, "install": true,
             "resolve": false, "refusals": true, "G3": "RED" }
```

**The whole residual is the types half** (19 runtime of 19 resolve; 0 types of 33), and its cause is
`packed-candidate-surface.mjs`'s own assertion form — independently confirmed by the PARTIAL close
and ruled at §0aa. `.e2` cures the **generator**, not the tarball: the tarball at `6b51c336…` is
already the bytes A-7's positive control compiled at exit 0.

### R.2 — GREEN-before-cure, declared

Seven gates the **spec** declares born-RED read **GREEN at this re-open**: **G-1 · G-2 · G-4 · G-5 ·
G-6 · G-8 · G-9**. **None is a remaining cure target of this wave**: each was turned by X.P.W4 (G-4
re-verified on `.e`'s rebuilt `ac1.wasm`), and each is listed because R.2 forbids a silent green.
They are `.f`'s **re-run** obligations at its own clock, never inherited claims. **G-7** is an
inherited-GREEN FLOOR by the spec's own words. **G-3 is honestly RED** and is `.e2`'s; **G-10's
open-state sum is 5**, the value the gate must find at open.

## Unit plan — RESUME

**Two units owed, strictly serial** (§0aa: *"unit `.e2` … lands the two cures and re-runs G-3 …
then `.f` opens exactly as §0y states, iff `G3 GREEN`"*; runbook §1.4: Track D is serial).
`X.P.W4.e` is **`alreadyDone`** and is **never re-dispatched**.

| group | unit | model | gates |
|---|---|---|---|
| — | `X.P.W4.e` | opus | **LANDED `93bcb83`** — alreadyDone |
| 1 | `X.P.W4.e2` | opus | G-3 · the `tsx`-free-shipped-bytes leg |
| 2 | `X.P.W4.f` | fable (FRESH adjudicator, M-23 §1) | G-1 · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 · G-10 |

**Disjointness**: the two owed units share **no** create/modify path. `.e2` writes only in `<p2>`
(`scripts/packed-candidate-surface.mjs` · `src/parse/packrat-entry.ts` · the regenerated `dist/` ·
`src/css/bounds.mjs`) plus NEW dated files under `evidence/W4/**`; `.f` writes only in value.js docs
plus `<p2>/typescript/scripts/rc-p-evaluate.mjs`. They are serial regardless.

**Locks and families** (runbook §3.4; W4.md §4a; §0aa):
- **`.e2` → `.f` serial, and CONDITIONAL**: `.f` **opens iff `.e2` reads `G3 GREEN`**. A stamp
  performed while any of G-1..G-9 is red fails by G-10's own falsifier. If `.e2` returns G-3 still
  RED, `.f` is **not dispatched** and the wave closes PARTIAL again, by gate id.
- **`.f`'s R-A stamp is ONE act** over the five four-verb `VERIFIED` rows (W0–W4) — the family does
  not split; performed **iff** G-1..G-9 read GREEN at `.f`'s own re-run, else **withheld by gate id**.
- **The two COHESION carves** (§1 SS-5 status cell · §5 status-board line) land **only under a
  performed stamp** — `.f` performs both or neither (§0y).
- **`INBOX.md` is shared** with X·V's mail units (W4.md §4a cross-wave): rows are appended, never
  rewritten; `.f` must not run while an X·V mail unit is open.
- **`../parse-that`, `../keyframes.js`, `../fourier-analysis`, `../glass-ui` are READ-ONLY**
  (runbook §5.5). **Zero value.js `src/**`, `demo/**`, `api/**`, `test/**`, `e2e/**` bytes** — G-2
  asserts it at every commit of this wave.
- **`dist/` is gitignored in `<p2>`** (⟨cmd⟩ `git check-ignore -v dist` → `.gitignore:6:dist/`), so
  `.e2`'s regeneration of it is a **build act with no commit**: the built bytes reach the gate only
  through `npm pack`'s `files` list. This is why `.e2` must re-run G-3 **after** rebuilding, never
  before.

### X.P.W4.e2 — the generator's arity + the latch reader's subpath (§0aa)

- **Model**: opus (M-23 §2 — both cures are mechanism).
- **Spec sections**: `W4.md` **FOURTH dated addendum** (file end, the `X.P.W4.e2` clause — the
  unit's own bounds and gate) · §6 **G-3** (lines 383–397) · §7 Format/Lint (545–554) · §9 Commit
  Plan (581–598) · COHESION **§0aa** (1729–1755, E-w4e-1 · E-w4e-2 cure (a)) · §0y **F-w4b-3**
  (1642–1653, the packaging ruling `.e` executed and this unit completes).
- **Writable set** (exactly the fourth addendum's list):
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/scripts/packed-candidate-surface.mjs`
  (**the check-line emitter only**) ·
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/parse/packrat-entry.ts`
  (**export lines only**) ·
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/dist/**` (**regenerated, gitignored**) ·
  `/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css/bounds.mjs` ·
  `/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W4/**`
  (**NEW dated files beside `.b`'s and `.e`'s — never an overwrite**) ·
  `/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/D/X-P-W4S.md` (its own receipt).
- **Gates**: **G-3** → `resolved 52 of 52`, `entryCount ≥ 2`, `G3 GREEN`, **exit 0**, **double-run**,
  plus a **positive control in a staged consumer tree outside both repos** and a **negative control
  that still fires**; and **`grep -rn 'tsx' src/css/` over shipped bytes → 0 code hits**.

### X.P.W4.f — the fresh adjudicator (E-r2-1), CONDITIONAL on `G3 GREEN`

- **Model**: **fable**, and **FRESH** (M-23 §1) — a seat that authored a gate cannot certify it.
- **Spec sections**: `W4.md` **THIRD dated addendum** (file end, the `X.P.W4.f` clause) · §2b OP-6
  (line 73) · §3 Scope items 6–10 (114–130) · §5 `X.P.W4.d` mechanism (293–312) · §6 **G-1..G-10**
  (314–543), **G-10 read in shape (a)** · §8 (556–579) · §9 (581–598) · §12 L-18 rider (651–665) ·
  COHESION **§0y** (1634–1688: E-r2-1 · F-w4c-2 · Q-RC-1 · Q-RC-2 · the two carves), **§0v**
  (1574–1584, GROUND-C), **§0w** (1586–1602, the id-set + each class's ruling) and **§0aa**
  (1729–1755: R-4 — bank the rebuilt `ac1.wasm`'s import listing as a NEW dated file beside `.b`'s;
  R-5 rides X-W11's OUT-OF-WAVE roster; R-6 is by construction).
- **Writable set** (exactly the third addendum's list): unchanged from the first sitting's plan —
  `SEAM-CONTRACT.md` (disposition + consumer-direction cells of the 45 `PENDING-ADJUDICATION` rows
  only) · `ADJUDICATION-W4.md` (create) · `DIVERGENCE-LEDGER.md` (modify-append, `rulingId`) ·
  `waves/W4-CLOSE.md` (append a dated §12 only) · `RELEASE-PACKET.md` (a dated addendum section
  only) · `docs/tranches/V/coordination/INBOX.md` (mail rows) · the **five four-verb `VERIFIED`
  rows** in `waves/W0..W4.md` (R-A, **one act, iff G-1..G-9 GREEN at this seat's own re-run**) ·
  `docs/tranches/X/COHESION.md` (**§1 SS-5 cell + §5 board line only, iff the stamp is performed**) ·
  `<p2>/typescript/scripts/rc-p-evaluate.mjs` · `RELEASE-CONDITION.md` (**§2.3 dated addendum
  only**) · `registry/harvest/x-p-w3.json` **and** `x-p-w4s.json` (create, §0p scratch-mirror —
  **`x-p-w3.json` already exists at 129579 B; measure before writing**) · this record.
- **Gates**: **G-1..G-10** re-run at its own clock; **G-10 in shape (a)**: **5** at open, **0** after
  the stamp.

## Unit receipts — RESUME

_(appended by each unit as it lands)_

### X.P.W4.e2

**SERVED MODEL**: `claude-opus-5[1m]` · **status**: **DONE** · 2026-09-19. **G-3 is GREEN** —
`resolved 52 of 52`, `entryCount 91`, `G3 GREEN`, **exit 0**, double-run; and the `tsx`-free-shipped-
bytes leg reads **0 code hits**. **The serial lock is therefore OPEN: `.f` may be dispatched.**

**CRASH-RECOVERY (standing law, host restart 2026-09-18).**
⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 status --porcelain` → `?? .worktrees/`
**only**: the `<p2>` half of this unit's writable set — `scripts/packed-candidate-surface.mjs`,
`src/parse/packrat-entry.ts`, `src/css/bounds.mjs` — carried **zero inherited edits**, and `.worktrees/`
is untracked infrastructure in no row of this unit's grant.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 3 M + 1 `??`
(`V/reformation/CARRY-LEDGER.md` · `X/keyframes/evidence/W12/KF-W12-d-born-red.md` ·
`scripts/dev/dev.sh` · `X/keyframes/evidence/W12/KF-W12-d-gate-transcripts.md`), **none inside this
unit's writable set** — the first, second and fourth are sibling seats' (V-reformation, Track B's
X·KF W12), `dev.sh` is unowned and **never staged**. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/evidence/W4/`
→ **0 lines**. **Nothing inherited, nothing stashed, nothing restored, no dirty path outside the
writable set touched.**

#### Acts, in order

**A-0 · Measure before editing — all three anchors verified at the true bytes; NONE had drifted.**
⟨cmd⟩ `sed -n '395,425p' scripts/packed-candidate-surface.mjs` → `:400` emits
`` `export type __check_${name} = ${name};` `` and `:420` reads
`resolved: compile.status === 0 ? true : !named(name) && diagnostics.length === 0`.
⟨cmd⟩ `cat src/parse/packrat-entry.ts` → `export { memoize, mergeMemos, resetPackrat } from "./packrat.js";`
and nothing else — `packratEnter`/`packratExit` **ABSENT**.
⟨cmd⟩ `sed -n '828,842p' src/css/bounds.mjs` → `const { tsImport } = require_("tsx/esm/api");` inside
`loadPackratInstrument()`.
⟨cmd⟩ `grep -rn 'packratEnter\|packratExit' src/` → both are `export function`s in
`src/parse/packrat.ts` (`:223`, `:250`) and the epoch boundary `parser.ts:42/46` already calls them,
so cure (a) needs **re-export lines only** and `packrat.ts` — which is in no row of this grant — is
not touched. ⟨cmd⟩ `grep -n 'PackratEpoch' src/parse/packrat.ts` → `203:interface PackratEpoch` is
**not exported**, so no type re-export was added: a `export type { PackratEpoch }` line would have
needed a write in `packrat.ts`. Measured, then dropped.

**A-1 · BEFORE, at this seat's own clock.** ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>/g3-before-e2.json`
→ `tarballSha256 6b51c336…` · `entryCount 91` · `seamSubpathDeclared true` · **`resolved 19 of 52`** ·
`refusals 5` · `verdict {pack:true, declaration:true, install:true, **resolve:false**, refusals:true,
G3:"RED"}` · **EXIT=1** — reproducing the re-open baseline sha for sha. ⟨cmd⟩ a probe importing
`src/css/bounds.mjs` and `src/css/entry.mjs` recorded the instrument's reading **before** the cure,
in the order `latch.test.ts` reads it (the file is outside the repo's vitest `include`,
`test/*.test.ts`, so it is exercised by this probe and by `scripts/css-bench-three-leg.mjs`, not by
`npx vitest run`): parsing-armed **false** · L-1 **false** · L-2 arms **true** · read-back **true** ·
L-3 after `resetPackrat()` **true** (ESC-c1's born-RED) · `record.readable true` · `record.armed true`
· `record.symmetric false`.

**A-2 · E-w4e-2 cure (a) — the latch reader rides the subpath.** `packrat-entry.ts` gains
`export { packratEnter, packratExit } from "./packrat.js";`. `bounds.mjs`'s `loadPackratInstrument()`
becomes `await import("@mkbabb/parse-that/packrat")` + `await import("@mkbabb/parse-that")`; the
`createRequire` / `tsImport` pair dies. The doc comment above it is **rewritten rather than left
standing**, because the cure changed what the reading MEANS and a stale comment would be the
dishonest half of a true fix (below). **The module-local "have we armed" flag was REFUSED** — §0aa
and `.e` both name it: it would ANSWER the question `latch.test.ts` L-3 exists to MEASURE.

**A-3 · The rebuild, which is a build act with no commit.** ⟨cmd⟩ `npm run build` (`vite build`) →
`✓ built in 416ms`; ⟨cmd⟩ `git check-ignore -v typescript/dist` → `.gitignore:6:dist/`. ⟨cmd⟩
`cat dist/packrat.js` → `export { m as memoize, i as mergeMemos, p as packratEnter, o as packratExit,
k as resetPackrat }`; ⟨cmd⟩ `cat dist/packrat-entry.d.ts` → both re-export lines. **`src/css/build/`
was NOT rebuilt** — `npm run build` is `vite build` and does not run `src/css/build.mjs`, so
`ac1.wasm` stands at `.e`'s **662339 B** (⟨cmd⟩ `ls -l` and the `<p2>` commit file lists both show it
untouched) and G-4's subject is unmoved.

**A-4 · E-w4e-1 cure — the check line is instantiated to the arity the INSTALLED declaration
declares.** `readInstalledTypeArity()` resolves the seam specifier with `ts.resolveModuleName` from
the consumer workspace and reads each export's type-parameter list through
`checker.getExportsOfModule` — the **same resolver the consumer compile uses**, so the seam's
re-export chain (`ac1.d.ts` → `value-css-4.0.0.d.ts`) is followed rather than re-implemented by a
grep. The emitter then supplies exactly that many `unknown`s. **`:420`'s reading is byte-identical.**

**REQUIRED arity, not total — and this is measured, not preferred.** ⟨cmd⟩ the banked report's
`legs.types.arity.generics` → `["CollectedRule: 0 required of 1", "ParseResult: 1 required of 1"]`.
`ParseResult<T>` has one required parameter → `ParseResult<unknown>`; `CollectedRule<R extends
StylesheetItem = StylesheetItem>` is fully defaulted → **bare**. A blind `unknown`-per-*total*-
parameter reading would emit `CollectedRule<unknown>` and newly fail **TS2344** on a row that passes
today, contradicting §0aa's own acceptance criterion — *"a check line that is valid for every generic
on the surface"*. ⟨cmd⟩ rows carrying a **required AND constrained** parameter → **0**, so `unknown`
is a valid argument for every generic on this surface; the count is **printed in the report**, not
assumed, because `unknown` need not satisfy a constrained parameter on some future surface.

**A-5 · G-3, double-run at the settled bytes**, banked into `evidence/W4/` as NEW dated files:

| reading | BEFORE (`.e`'s settled bytes, `93bcb83`) | AFTER run 1 | AFTER run 2 |
|---|---|---|---|
| `tarballSha256` | `6b51c336…` | `f8aede11…` | `f8aede11…` |
| `entryCount` | 91 | **91** | **91** |
| `seamSubpathDeclared` | true | true | true |
| `resolved` | **19 of 52** | **52 of 52** | **52 of 52** |
| `unresolved` | 33 | **0** | **0** |
| `refusals` | 5 of 5 | 5 of 5 | 5 of 5 |
| `verdict.resolve` | **false** | **true** | **true** |
| `verdict.G3` | **RED** (exit 1) | **GREEN** (exit 0) | **GREEN** (exit 0) |

⟨cmd⟩ whole-report identity with `generatedAt` and the ephemeral consumer root excluded → **true**.
Both runs carried the same `--label`, so `generatedAt` is the *only* differing field.

**A-6 · The `tsx`-free-shipped-bytes leg.** ⟨cmd⟩ `grep -rn 'tsx' src/css/` → **5** hits; ⟨cmd⟩ the
same piped through `grep -vE ':[0-9]+: *(\*|//|/\*)'` → **no output, 0 code hits**. The five are
doc-comment prose recording the removal (`js-alg.mjs:38,42,45` are `.e`'s; `bounds.mjs:823,824` are
this unit's). Asserted over **shipped** bytes, not only the tree: ⟨cmd⟩ `tar -xzf <the packed tarball>`
then the same two greps over `package/src/css/` → **0 code hits**, and ⟨cmd⟩
`grep -rn 'require_\|tsImport' package/src/css/` → **5 hits, every one comment prose**. ⟨cmd⟩ the
installed manifest's `dependencies` → **`{}`**. **R-3 is DISCHARGED at the bytes**, not disclosed.

**A-7 · The instrument's reading is preserved whole — and is now stronger.** Same probe, same order,
before and after: parsing-armed `false/false` · L-1 `false/false` · L-2 arms `true/true` · read-back
`true/true` · **L-3 after `resetPackrat()` `true/true`** · `record.readable true/true` · `record.armed
true/true` · **`record.symmetric false/false`** · `record.sites` unchanged. **Field for field.**
ESC-c1's born-RED is still **measured** red — which is exactly why cure (b) and the flag were
refused. What changed is the reading's *subject*, and it is stated rather than smoothed: `tsImport`
did not dedupe, so the instrument read its own library instance and could not claim to read the one
the lowerings hold; ⟨cmd⟩ `import('@mkbabb/parse-that').memoize === import('@mkbabb/parse-that/packrat').memoize`
→ **true**, and `js-alg.mjs:23` addresses the library through that same map, so the instrument now
reads **the latch the js lowering itself holds**. The "parsing does not arm the latch" leg thereby
became a live assertion about the candidate's own instance, and it still reads `false`.

**A-8 · Positive control, in a staged tree outside both repos.** `<scratch>/pc-w4e2` — ⟨cmd⟩ prefix
check against both roots → neither is an ancestor. ⟨cmd⟩ `shasum -a 256 <staged>/mkbabb-parse-that-1.0.0.tgz`
→ **`f8aede11…` — the same bytes the gate read this run**. ⟨cmd⟩ `import('@mkbabb/parse-that/css')`
inside the consumer → **RUNTIME resolved 19 of 19**; ⟨cmd⟩ `import('@mkbabb/parse-that/packrat')` →
`memoize mergeMemos packratEnter packratExit resetPackrat`, and `packratEnter()` returns `null`
(unarmed) **from a consumer's `node_modules`**. ⟨cmd⟩ `node <tsc> -p tsconfig.pc.json` over **the
gate's own emitted `consumer.ts`, byte for byte** (`NodeNext`, `strict`, **`skipLibCheck: false`**) →
**EXIT=0**.

**A-9 · Negative controls — the gate still fires, twice over.** (a) the same consumer file with one
absent name, emitted in **the bare form the generator uses for a name with no arity row** → ⟨cmd⟩
`node <tsc> -p tsconfig.nc.json` → **EXIT=2**, `TS2305: Module '"@mkbabb/parse-that/css"' has no
exported member 'NotAFrozenType'`. (b) **the whole gate**, run against a seam contract carrying a
53rd row for that absent name and differing in nothing else → `symbolCounts {runtime:19, types:34,
total:53}` · **`resolved 19 of 53`** · **`G3 RED`** · **EXIT=1**, with that row reading
`{"resolved":false,"reason":"named in a tsc diagnostic"}` and the arity table carrying **33 rows and
no entry for it**. A row is now written for **every** export the installed declaration carries,
generic or not, so *"no arity row"* means one thing only — the declaration does not export this name
— which is what keeps the bare-form path a control rather than a hiding place.

#### Gate readings — BEFORE → AFTER

| gate | before (this seat's own BEFORE run) | after X.P.W4.e2 | verdict |
|---|---|---|---|
| **G-3** | `resolved 19 of 52` · `resolve:false` · `G3 RED` · exit 1 | `resolved 52 of 52` · `entryCount 91` · every leg true · `G3 GREEN` · **exit 0** · double-run identical but for `generatedAt` | **GREEN** |
| **`tsx`-free shipped bytes** | 1 live code hit (`bounds.mjs:834`) | ⟨cmd⟩ `grep -rn 'tsx' src/css/` minus comment lines → **0 code hits**, in the tree **and** in the tarball; `dependencies {}` | **GREEN** |
| **G-4** (not this unit's; re-read because `dist/` was rebuilt) | `functionKind 0` · GREEN | `artifacts 1 · admitted 1 · functionKindImportsTotal 0 · unaccountedImportsTotal 0 · "verdict": "GREEN"` · EXIT=0, on `.e`'s **unchanged** `ac1.wasm` (662339 B) | **GREEN, unmoved** |
| **G-2** (read with attribution) | 0 lines | raw ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **2 lines**, both `demo/styles/**`, **a concurrent Track-A seat's**; the claim X·P owes — ⟨cmd⟩ `git show --name-only --format=` over this unit's value.js commits `\| grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0** | **GREEN for X·P** |

#### Regression sweep (this unit changed a built entry, so the suite was read, not assumed)

⟨cmd⟩ `npx vitest run` → **Test Files 4 failed \| 10 passed (14)** · **Tests 2 failed \| 124 passed
(126)**. **All five failures are `ENOENT: ../data/…`** — the fresh root ships no benchmark corpus
(⟨cmd⟩ `ls -d ../data data` → *No such file or directory* for both) — and ⟨cmd⟩
`grep -lE 'packrat|bounds|packed-candidate'` over the four failing files → **none**. The suites that
do exercise this unit's subject pass: ⟨cmd⟩ `npx vitest run test/memoize.test.ts test/reentrancy.test.ts
test/dist-surface.test.ts` → **3 passed, 20 tests passed**. `test/css-recovery/boundary/latch.test.ts`
is outside the config's `include` (`test/*.test.ts`) and is therefore read by A-1/A-7's probe, which
reproduces its assertion order exactly.

#### Format / lint (§7)

⟨cmd⟩ `git diff --check` in `<p2>` → **clean**. ⟨cmd⟩ `node --check` on
`scripts/packed-candidate-surface.mjs` and `src/css/bounds.mjs` → **OK**. ⟨cmd⟩
`node <tsc> --noEmit -p tsconfig.json` → **82 errors, all under `test/**`** — the identical count
`.e` measured — and ⟨cmd⟩ the same output filtered to this unit's three files → **0**. `npx eslint .`
was **not run**: ⟨cmd⟩ `ls eslint.config.* .eslintrc*` → no matches; the fresh root carries no eslint
configuration and inventing one is outside these bounds (**R-5**, already rowed to X-W11's
OUT-OF-WAVE roster by §0aa).

#### E13 mail — and a self-correction, recorded rather than quietly fixed

⟨cmd⟩ the positional Status-cell awk over `INBOX.md` → **`ROWS=80 UNREAD=0`**, double-run
`0 ≡ 0`; header rows confirm Status at field 6 (⟨cmd⟩ `grep -n '^| # |'` → `41:` and `66:`). Four
paths: V/ **10** depth-1 ⊕ **24** coordination · glass-ui **BK** still the newest tranche dir, **9**
entries, newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed · keyframes.js
**13** · atlas **28**. ⟨cmd⟩ `find <the three live paths> -maxdepth 1 -type f -name '*.md' -newermt
"2026-09-19 09:10"` → **no member**. **ZERO UNREAD; no unrowed letter; `INBOX.md` not written.**
**Self-correction (SELF-COUNT law):** this seat's first sweep used `sed 's/\|/@PIPE@/g'`, which in
BSD sed replaces *every* pipe — including the table delimiters — and so read **`ROWS=0 UNREAD=0`**, a
vacuous zero. The correct form escapes only in-cell backslash-pipes, `sed 's/\\|/@PIPE@/g'`, and
reads **`ROWS=80`**. The bad reading is published here because a zero from an empty denominator is
exactly the false green this program's counting laws exist to refuse.

#### Commits

| repo | hash | meaning |
|---|---|---|
| `<p2>` | **`43c3f48`** | `fix(x-p-w4.e2/packed)` — **E-w4e-1**: the check line is instantiated to the arity the installed declaration declares. Pathspec: `typescript/scripts/packed-candidate-surface.mjs` |
| `<p2>` | **`49ca70b`** | `fix(x-p-w4.e2/packrat)` — **E-w4e-2 cure (a)**, **one commit, one family**: `bounds.mjs`'s import is valid only once the subpath carries the name, so a split would publish a state in which the instrument imports a binding that does not exist. Pathspec: `typescript/src/parse/packrat-entry.ts` · `typescript/src/css/bounds.mjs` |
| value.js | **`c6ec1ee6`** | `docs(x-p-w4.e2/evidence)` — five **NEW dated** files under `evidence/W4/`, **3191 insertions / 0 deletions**, so `.b`'s and `.e`'s artefacts are provably untouched (E-3) |
| value.js | *this receipt* | `docs(x-p-w4.e2)` — this section, append-only |

⟨cmd⟩ `git show --name-only --format=` over `43c3f48` → 1 path; over `49ca70b` → 2 paths; all three
are rows of the FOURTH addendum's grant. **`dist/**` appears in no commit** — it is gitignored, and
it reaches the gate only through `npm pack`'s `files` list, which is why G-3 was re-run **after** the
rebuild and never before. **Out-of-bounds count: 0.** `scripts/dev/dev.sh` never staged.

#### Residuals and escalations

- **ESCALATIONS: NONE.** Both of `.e`'s escalations are discharged as §0aa ruled them, at the bytes.
- **No workaround was taken anywhere**: no `try/catch` around a defect, no `test.skip`, no allowlist,
  no copied producer selector, no `node_modules` patch, no `tsx` runtime dependency, no module-local
  latch flag. The two refused shapes are named above with the reason each was refused.
- **R-3 (the PARTIAL close's residual) is CURED**, not carried: the tarball's `src/css/**` holds no
  executable `tsx` reference against `dependencies {}`.
- **R-5 stands** (no eslint configuration in `<p2>`; an architecture act, already on X-W11's
  OUT-OF-WAVE roster by §0aa). **R-6 stands** (`<p2>` has no remote — ⟨cmd⟩ `git remote -v` → empty —
  so `43c3f48` and `49ca70b` live in the local fresh root and are not pushed; by construction, X.P.W0).
- **R-4 stands for `.f`** — `.e` rebuilt `ac1.wasm` and `.b`'s `wasm-imports.json` describes the
  previous bytes. This unit did **not** rebuild it (`vite build` does not run `src/css/build.mjs`);
  §0aa's R-4 remains `.f`'s to bank as a NEW dated file.
- **R-1 and R-2 stand for `.f`** — `registry/harvest/x-p-w4s.json` still ABSENT, the **45**
  `PENDING-ADJUDICATION` cells still PENDING, `ADJUDICATION-W4.md` still ABSENT. Untouched by this
  unit; they are `.f`'s acts.
- **Carried, measured, for `.f`'s own re-run**: the arity reader instantiates `unknown` per required
  parameter, and **zero** parameters on this surface are both required and constrained. Should a
  future surface declare one, `unknown` would not satisfy it and the gate would redden **honestly**,
  naming that row — the report prints `constrainedRequired` per row so the condition is read rather
  than discovered.

#### The serial lock

**`.e2` reads `G3 GREEN`.** §0aa's condition — *"`.f` opens iff `.e2` reads `G3 GREEN`"* — is **MET**,
and G-10's own falsifier (*a stamp performed while any of G-1..G-9 is red fails*) no longer bites on
G-3. `.f` re-runs G-1..G-10 at **its own** clock; nothing here is inherited as a claim.

### X.P.W4.f

**SERVED MODEL**: `claude-fable-5-1` · **FRESH** (M-23 §1 — this seat authored no byte of X.P.W4, `.e` or
`.e2`) · **status**: **ESCALATED** (every in-bounds act performed; the R-A stamp **WITHHELD by gate id
G-1**, whose cure is one file outside this unit's grant — E-w4f-1) · 2026-09-19.

**CRASH-RECOVERY (standing law, host restart 2026-09-18).** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain`
→ 6 `M` + 1 `??` (`demo/DESIGN.md` · `demo/styles/foundation.css` · `demo/styles/shell.css` ·
`docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs` · `docs/tranches/V/reformation/CARRY-LEDGER.md`
· `scripts/dev/dev.sh` · `docs/tranches/X/waves/W5/born-red/…json`) — **none inside this unit's writable
set** (Track A's, V-reformation's, the unowned `dev.sh`). ⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/`
only; `scripts/rc-p-evaluate.mjs` byte-clean. **Zero inherited edits; nothing stashed, restored or touched
outside the set; `dev.sh` never staged.** The serial lock was read at the bytes before opening: `.e2`'s
receipt above reads `G3 GREEN`, and this seat re-measured it (A-1) before any write.

#### Acts, in order

**A-0 · Measure before editing — every anchor at the true bytes.** `W4.md` third addendum at line 678, the
`X.P.W4.f` clause — verbatim as the plan quotes it; §6 G-10 shape (a) in the same addendum. ⟨cmd⟩ `grep -c '^### Four-verb status' waves/W[0-4].md`
→ `1 1 1 1 1` (OP-6). ⟨cmd⟩ `grep -c PENDING-ADJUDICATION SEAM-CONTRACT.md` → **47** = 45 rows inside
`<!-- SEAM-ROWS -->` + the §3a census's 2 label rows (the Open's OA-4, reproduced). `ADJUDICATION-W4.md`
ABSENT; `harvest/x-p-w4s.json` ABSENT; `harvest/x-p-w3.json` **PRESENT, 129579 B**, schema
`x-p-w3.e.harvest-fold/2`, seatCount **5 of 6** (`.e` structurally absent). **None drifted.**

**A-1 · The ten gates BEFORE any write, at this seat's clock, double-run** (both writing scripts given `--out`
into the session scratchpad; `evidence/W4/**` is in no row of this grant and was not touched):

| gate | reading |
|---|---|
| G-1 | ⟨cmd⟩ `seam-contract-check.mjs …` → `VERDICT: GREEN`, set-differences ∅/∅, census `PENDING-ADJUDICATION 45 · identical 7`, `(COHESION §0v carried: 44 cells over 6 rows)`, EXIT=0 |
| G-2 | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **3 lines**, all `demo/**`, a concurrent Track-A seat's — X·P wrote none |
| G-3 | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>` ×2 → `tarballSha256 f8aede1176d0…` · `entryCount 91` · `seamSubpathDeclared true` · **`resolved 52 of 52`** · `refusals 5` · `verdict {pack, declaration, install, resolve, refusals: all true, G3: "GREEN"}` · **EXIT=0**; identity modulo the clock and the ephemeral consumer root → `true` |
| G-4 | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `artifacts 1 · admitted 1 · functionKindImportsTotal 0 · unaccountedImportsTotal 0 · "verdict": "GREEN"`, EXIT=0; ⟨cmd⟩ `shasum -a 256 src/css/build/ac1.wasm` → **`f0d063d6…`**, 662339 B — **the sha `.e`'s dated `evidence/W4/wasm-imports-2026-09-19-w4e.json` records: R-4 is DISCHARGED AT THE BYTES by that file** (this grant has no `evidence/W4/**` row; nothing re-banked) |
| G-5 | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0 --out <scratch>` → `RC-P(4.0.0) = FALSE — 3 of 6: 1 PUBLISHED · 3 EQUIVALENCE (the harness, 44) · 4 ADMITTED`, EXIT=1 — conjunct 3 still bound to the candidate tree (Q-RC-1, this unit's arm) |
| G-6 | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25** |
| G-7 | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0** |
| G-8 | `RELEASE-PACKET.md` 23017 B; INBOX `RELEASE-PACKET` 1 · `RC-P` 1 · `SS-6` 25; positional Status-cell awk → `ROWS=80 UNREAD=0` |
| G-9 | `W4-CLOSE.md` §4 disposition **(C)**, quoted by id from COHESION §0i.1 |
| G-10 (a) | ⟨cmd⟩ the awk-narrowed sum → **5**; ⟨cmd⟩ `grep -rn VERIFIED waves/W[0-3]-CLOSE.md` → every hit defers the stamp to X.P.W4 |

**The serial lock is OPEN at this seat's own reading (G-3 GREEN), and G-1..G-9 read GREEN before the ruling.**

**A-2 · The adjudication — measured, then ruled (L-14).** Every one of the 44 carried cells was re-run through
the sha-pinned vendored 4.0.0 `css.js` (sha256 `8b538130…`, 43,972 B) and BOTH candidate lowerings
(⟨cmd⟩ `node <scratch>/probe-cells.mjs`, twice, byte-identical; `js ≡ wasm` on 44 of 44 —
`ADJUDICATION-W4.md` Appendix A). The `ID-1b`/`ID-4`-tagged cells were reduced to minimal variants (name
alone, value alone; ⟨cmd⟩ `probe-id1b.mjs` + `probe-name.mjs`, twice each — Appendix B). **Refutations
that landed**: (i) **both engines accept a non-ident run as a declaration NAME** — `a { col!r: red }` →
name `col!r` from 4.0.0 and from both candidate lowerings (12 forms) — so `ID-1b`'s `candidate` field
(*"REJECTS the first two in BOTH lowerings"*) is refuted as stated: those rejections were `PB-12`'s
(`9.`, `0.`) and the `!important`-adjacency defect's — **F-w4f-1** (shared, not a divergence);
(ii) **the candidate requires whitespace before `!important`** — `#d { color: red!important }` → 4.0.0
`important: true`, candidate REJECT in both lowerings (`red !important` accepted) — **F-w4f-2, a
CANDIDATE DEFECT (HIGH)**, css-syntax-3 §5.4.7; 2 of the 44 cells (`#40`, `#41`) are its. Rulings:
**`GROUND-C` ×29** (§0v — the candidate accepts, clamps where css-color-4 declares a range — measured
`rgb(-1e400 0 0)` → `[0,0,0]`, alpha `5e498` → 1 — and carries `±Infinity` where none exists — measured
`cubic-bezier` `y1: Infinity`, `typeof number`; no cell overflows an abscissa) · `ID-2` ×1 · `ID-4` ×5
(css-syntax-3 §5.4.3/§5.4.9; the FALSE_REJECT cell's `(` opens a block consumed to EOF) · `ID-1b` ×2 (the
nested at-rule, §5.4.4) · five re-attributed to `PB-12` ×3 · `PB-09` · `PB-05` (alpha `-137`: 4.0.0's own
`color_out_of_range` rejection vs the candidate's clamp to 0) · **2 candidate-defect (F-w4f-2)** → **42
declared-divergence, candidate correct; 2 candidate defects; 0 PENDING.** The 39 premise rows: `CN-2` ·
`CN-3` · `R4` **RETIRED as coverage claims** (F-w4a-1 — 19 of 19 runtime and 33 of 33 types resolved
from the installed tarball at G-3), 38 → `identical`, `coerceToSyntax` → `declared-divergence`
inherited (its 208 declared cells honour `SP-1 · ADJ-2 · ID-5 · PB-12 · PB-04/05 · PB-08`, read from the
differential's own `why` fields). The whole-sheet refusal ruled the SEAM's posture (§5). Written:
`ADJUDICATION-W4.md` (create, 62,711 B, appendices embedded), the 45 rows' two cells in
`SEAM-CONTRACT.md` (⟨cmd⟩ a node script rewriting cells 6–7 of exactly those rows; `git diff --stat` →
45 insertions / 45 deletions; ⟨cmd⟩ `awk` over the SEAM-ROWS block `\| grep -c PENDING` → **0**; the
file's 12 remaining hits are §3a's census labels, §3b's rule and §9's prose — outside the grant, not
rewritten), and `DIVERGENCE-LEDGER.md` **§10** (appended; `#### §10.x` subheadings so the checker's
`^### id — ` row reader does not mint them as rows — a first draft with `###` made check J fire on four
phantom rows, measured and corrected before commit).

**A-3 · G-1 AFTER the ruling — RED, double-run identical.** ⟨cmd⟩ `seam-contract-check.mjs …` → rows
`52 · 52 · ledger 47`; set-differences ∅/∅; no blank field (C); no unknown id (F — a first draft
carried `` `ADJUDICATION-W4.md` `` in backticks inside disposition cells, which the checker reads as ids;
corrected: only ledger/ruling ids are backticked there); census **`identical 45 · declared-divergence 7`**;
**`VERDICT: RED — 2 check(s) failed`**: **[E] 37** — every `CN-2`/`CN-3`-bound row reads `identical`
while the ledger's `subjects` fields still bind them (the checker has no notion of a retired row, and the
emitter cannot re-emit `CN-3` truthfully until `F-ab1`'s five-name literal at `run-full-surface.mjs:60`
is cured); **[G] 6** — the six carried rows publish a terminal head while `universe-52.json` (immutable
W3 evidence) marks them PARTIAL: check G is §0v's *"publishes the carried cells as PENDING-ADJUDICATION"*
rider, encoded for the state BEFORE the adjudication §0y ordered. **Both fires are the instrument's
vocabulary; neither is a defect of the contract's content. The gate is read as it measures: RED.**
`scripts/seam-contract-check.mjs` is `.a`'s file, in **no row** of this unit's writable set — the cure is
returned as **E-w4f-1**, not taken (a write there is an ESCALATION by the standing law).

**A-4 · Q-RC-1 — the V-tarball arm, landed in `rc-p-evaluate.mjs`.** ⟨cmd⟩ `grep -n 'import.*entry.mjs' run-full-surface.mjs`
→ `:25` — the CLI's candidate side is a static import of `<p2>/src/css/entry.mjs`; the CLI takes only
`--pinned-value-commit`, `--out`, `--limit`. The arm therefore runs the harness's **library**
(`lib/differential.mjs` `runFullSurface`, `lib/ledger.mjs` for §6a's direction half, `lib/oracle.mjs`,
`css-totality/lib/pin.mjs`, `harness/totality/lib/surface.mjs`) in-process with
`surfaces = { V: import(<consumer>/node_modules/@mkbabb/value.js/<exports["./css"].import>) }` from the
registry-identical tarball, over the pinned universe and the whole corpus, no limit; the clean consumer
install is hoisted and shared with conjunct 4; only arm V's reading is the value; the CLI (arm C) is
recorded beside it. ⟨cmd⟩ `node --check` OK; ⟨cmd⟩ semver-literal grep → only the prose mentions of the
4.0.0 oracle; ⟨cmd⟩ `git diff --check` clean. **RC-P(4.0.0) AFTER, ×2**: table identical line for line —
`3 EQUIVALENCE(V) yes FALSE — arm V read 20962 mirror-defects over V's installed /css (full corpus, no limit)`;
`RC-P(4.0.0) = FALSE — 3 of 6: 1 PUBLISHED · 3 EQUIVALENCE · 4 ADMITTED`, EXIT=1. Arm V's subject printed:
tarball sha1 `ccb962e5…` ≡ `dist.shasum`; `/css` entry `./dist/subpaths/css.js` sha256 **`8b538130…` — the
oracle's own bytes, so the arm demonstrably read V and not a tree**; 19/19 entries, 33/33 types, corpus
27,021/27,021, `emptyConsumerDirections` ∅; classes `ADJUDICATION_UNHONOURED 13,797 · DIVERGENT_VALUE 6,383
· CANDIDATE_THREW 782 · MIS_ACCEPT 0 · FALSE_REJECT 0` — 4.0.0 fails exactly where the adjudications ruled
against 4.0.0, which is the reading a V-bound conjunct must give. Arm C in the same runs: 44. **Negative
control** `--version 0.0.0-does-not-exist` → conjuncts 1–4 `MEASURED: NO`, conjunct 3's reason names the
missing tarball; no conjunct TRUE unmeasured. **Q-RC-2** unchanged at the bytes (*"FALSE, not vacuously
true"*). `RELEASE-CONDITION.md` gains the dated §2.3 addendum with this evaluation of record.

**A-5 · The close artefacts.** `waves/W4-CLOSE.md` **§12** appended (gates BEFORE→AFTER, the ruling, the
withheld stamp, residuals with owners); `RELEASE-PACKET.md` dated addendum (§6 item 3 superseded beside:
the cells are ruled; the consumer-facing table; RC-P re-read); `INBOX.md` **O-41** appended directly after
`O-40` — the adjudication relay to the same recipients, delivery point `ADJUDICATION-W4.md` + the packet's
addendum in THIS repo, cross-repo carriage on the SS-6 batch, **SENT — no reply owed**, O-15 not converted
into an ask; ⟨cmd⟩ the positional Status-cell awk → **`ROWS=81 UNREAD=0`**, double-run; `RELEASE-PACKET` 2 ·
`RC-P` 2 · `SS-6` 27. **INBOX shared-file discipline**: ⟨cmd⟩ `git status --porcelain -- INBOX.md` → clean
before the write; one row inserted by line, nothing rewritten; `git diff --check` clean.

**A-6 · The harvests (§0p scratch-mirror, F-w4c-2).** ⟨cmd⟩ the UNMODIFIED harvester (sha256 `77a6e04c…`,
last commit `c0078d96`, `git status --porcelain -- workflows/` → 0 lines) run in **two** fresh mirrors with
the script symlinked → EXIT=0 each, 155 files each, the five run files of interest **sha256-equal across
the two runs**; the mirror's `DEFECT-LEDGER.md` reads 120,302 lines vs the repo's 120,188 (sha
`9092e062…` both runs) — **NOT written to the repo**: `registry/DEFECT-LEDGER.md` is in no row of this
grant (residual, owner named). **`x-p-w3.json` — MEASURED before written**: the existing fold/2 (X.P.W3.e,
129579 B, sha256 `f657d114…`, commit `c2bc7f5a`) satisfies the scratch-mirror procedure and does NOT
satisfy §0p ESC-e2's *"the successor harvests (6 of 6)"* — `wf_a9980aef-425` has grown from 4,191 B /
4 results to 74,892 B / 11 results since it was written, and now carries **X.P.W3.e's own row**
(resultIndex 4, commits `313d5bac · c2bc7f5a · 984d2c27 · d166abc5 · 422537b8`). Written as
**fold/3** with the predecessor embedded **whole and verbatim** (`predecessor.document`, its sha256 and
byte count, its commit) and the three run files re-embedded as the harvester wrote them at this clock:
**seatCount 6 of 6 — GREEN under L-13's letter**. **`x-p-w4s.json`** created (fold/1): runs
`wf_a25d7c23-90d` (`.e`, ESCALATED) + `wf_7afdc968-28c` (`.e2`, DONE); **2 of 3 — RED under L-13's
letter, structurally**: this seat cannot appear in its own harvest.

**A-7 · E13, four paths at this seat's clock.** V/ **10** depth-1 ⊕ **24** coordination · glass-ui **BK**
still the newest tranche dir, **9** entries, newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` =
I-35 (rowed, ⟨cmd⟩ `grep -c o26-reply` → 33) · keyframes.js **13**, newest by mtime the ledger file
`INBOUND-LEDGER.md` (no new letter; O-21 ours) · atlas **28** UNMOVED. ⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 09:30" \| grep -v INBOX.md`
→ **no member**. **ZERO unrowed letters addressed to value.js; ZERO UNREAD (81 rows); one row minted (O-41).**

**A-8 · The stamp — WITHHELD by gate id G-1; the carves not performed.** §6 G-10's falsifier and COHESION
§0y bind. ⟨cmd⟩ the shape-(a) sum after every write → **5 ≡ 5**; `git status --porcelain -- waves/W0.md
waves/W1.md waves/W2.md waves/W3.md waves/W4.md docs/tranches/X/COHESION.md` → **0 lines** — no four-verb
row and no COHESION cell was written. Both or neither: neither.

#### Gate readings — BEFORE → AFTER (this seat's own commands, every reading double-run)

| gate | BEFORE (A-1) | AFTER | verdict |
|---|---|---|---|
| **G-1** | GREEN (`PENDING 45 · identical 7`) | **RED — [E] 37 · [G] 6**; census `identical 45 · declared-divergence 7`, 0 PENDING, ∅/∅ | **RED (instrument vocabulary — E-w4f-1)** |
| **G-2** | 3 foreign `demo/**` lines | ⟨cmd⟩ `git show --name-only --format= 6be73f38 04d5ed04 e456c2ff \| grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0** | **GREEN for X·P** |
| **G-3** | `52 of 52` · `G3 GREEN` · exit 0 | unchanged (no `<p2>` packaging byte moved) | **GREEN** |
| **G-4** | GREEN, `f0d063d6…` | unchanged | **GREEN** |
| **G-5** | honestly FALSE (conjunct 3 on the candidate tree) | honestly FALSE, conjunct 3 on **V's bytes** (20,962), negative control clean | **GREEN** |
| **G-6** | 25 | 25 | **GREEN** |
| **G-7** | 0 / 0 | 0 / 0 | **GREEN — floor held** |
| **G-8** | packet · 0 UNREAD / 80 | packet + addendum · O-41 · **0 UNREAD / 81** | **GREEN** |
| **G-9** | (C) recorded | unchanged; 0 paths under `docs/tranches/X/waves/` in this unit's commits | **GREEN** |
| **G-10** (a) | 5 | 5 — the act **not performed**, withheld by gate id G-1 | **RED (withheld)** |

#### Commits (pathspec on the commit itself; `dev.sh` never staged; a sibling's staged `D demo/shell/PaneSegmentedControl.vue` left exactly as found)

| repo | hash | meaning |
|---|---|---|
| value.js | **`6be73f38`** | `docs(x-p-w4.f/adjudication)` — `ADJUDICATION-W4.md` (create) · `SEAM-CONTRACT.md` (the 45 rows' two cells) · `DIVERGENCE-LEDGER.md` (§10 appended). **One family**: the cells cite the adjudication and the ledger carries the same ids |
| `<p2>` | **`f3c389c`** | `feat(x-p-w4.f/rc-p)` — `typescript/scripts/rc-p-evaluate.mjs`, the V-tarball arm (local-only root, no remote — R-6) |
| value.js | **`04d5ed04`** | `docs(x-p-w4.f/release-condition)` — `RELEASE-CONDITION.md` §2.3 dated addendum |
| value.js | **`e456c2ff`** | `docs(x-p-w4.f/close)` — `waves/W4-CLOSE.md` §12 · `RELEASE-PACKET.md` addendum · `INBOX.md` O-41 · `harvest/x-p-w3.json` (fold/3) · `harvest/x-p-w4s.json` (create). The §9 `.d` family's stamp members (five VERIFIED rows, two COHESION cells) are absent **because the act was withheld**, not because the family was split |
| value.js | *this receipt* | `docs(x-p-w4.f)` — this section, append-only |

#### Residuals and escalations

- **E-w4f-1 (ESCALATION — the reason this unit is not DONE).** `scripts/seam-contract-check.mjs` reads
  RED after a ruling it was built before: check **G** encodes §0v's pre-adjudication rider against the
  immutable `universe-52.json`; check **E** binds `CN-2`/`CN-3`'s `subjects` fields against the
  `identical` rows they no longer describe. The file is `.a`'s and in no row of this grant. **Cure, for the
  triumvirate**: the checker learns the post-adjudication vocabulary (a carried row whose cells are
  ruled in `ADJUDICATION-W4.md` is terminal; a row retired in `DIVERGENCE-LEDGER.md` §10 does not bind),
  OR the ledger is regenerated without the stale subjects — which waits on `F-ab1`. Until one lands, the
  R-A stamp stays **WITHHELD by gate id G-1** and the two COHESION carves unperformed.
- **F-w4f-2 (HIGH, candidate defect)**: `!important` without a preceding space is refused by the
  candidate in both lowerings; 2 carried cells are candidate mirror-defects; a grammar act at
  `<p2>/typescript/src/css/**`, outside this grant — returned by id.
- **F-w4f-1 (MEDIUM, shared)**: both engines accept a non-ident declaration NAME; no cell; a candidate
  grammar act and a 4.0.0 defect for X·V.
- **The ledger's §10 is outside the emitter's `§6.x` carry** — a regeneration must re-append it (the
  emitter's owner). **`DEFECT-LEDGER.md`'s append** (+114 lines, measured) not written — outside the grant.
- **R-4 DISCHARGED at the bytes** by `.e`'s dated listing (A-1); **R-5 · R-w4b-2 · SEAM-DRIFT · F-ae1/F-p1
  · the W3 rounds-6–8 set** handed to X-W11's OUT-OF-WAVE roster by id (`ADJUDICATION-W4.md` §8); **R-6**
  by construction; **F-e3** carried (shared hue-overflow rejection).
- **No workaround anywhere**: no `try/catch` around a defect, no `test.skip`, no allowlist, no producer
  selector, no `node_modules` patch, no re-worded `PENDING` head to satisfy a grep, no edit to the
  checker, no edit to `evidence/W4/**`, no COHESION or four-verb byte.

---

# RESUME — THIRD SITTING (2026-09-19, on COHESION §0ab)

SERVED MODEL: claude-opus-5[1m] (SEAT 0, Track D · X·P; sitting of record 2026-09-17, the owner's
begin-word, COHESION §0j). This section is **appended**; no byte above it is rewritten (E-3).
X.P.W4's CLOSED row is untouched.

## Open — THIRD SITTING

**Ruling of record: COHESION §0ab** (`COHESION.md:1757`, landed `e105059c`). `.f` did the
adjudicative half whole — 45 cells → 42 `declared-divergence` · 2 candidate defects (F-w4f-2) · 0
`PENDING`; 39 premise rows retired. G-1 then reads RED **because the checker was built before the
ruling it now measures** (E-w4f-1). §0ab mints three units: `.g` ∥ `.h` (disjoint) → `.f2`.

| id | condition | receipt | verdict |
|----|-----------|---------|---------|
| OA-r3-1 | §0ab exists and rules E-w4f-1 · F-w4f-2 · F-w4f-1 · F-ab1 | ⟨cmd⟩ `grep -n '^## §0ab' docs/tranches/X/COHESION.md` → **1757**; the four ids read in full at this seat | **MET** |
| OA-r3-2 | `W4.md`'s **FIFTH** dated addendum is the unit spec (writable sets) | ⟨cmd⟩ `grep -n 'ADDENDUM' waves/W4.md` → `674 · 676 · 678 · 680 · **682**`; `:682` names `.g` ∥ `.h` → `.f2` | **MET** |
| OA-r3-3 | `.e` · `.e2` · `.f` stand on their commits | ⟨cmd⟩ `git -C <p2> log --oneline -6` → `f3c389c` (`.f`/rc-p) · `49ca70b` (`.e2`/packrat) · `43c3f48` (`.e2`/packed) · `93bcb83` (`.e`/packed); ⟨cmd⟩ `git -C value.js log --oneline -14` → `3d4470f2` · `e456c2ff` · `04d5ed04` · `6be73f38` (all `.f`) | **MET — alreadyDone, NEVER re-dispatched** |
| OA-r3-4 | `.g` · `.h` · `.f2` are owed in full | the same two logs carry **no** `x-p-w4.g` / `.h` / `.f2` commit; `<p2>` HEAD is `f3c389c`, value.js HEAD is `61aafe41` (a Track-F row) | **owed** |
| OA-r3-5 | CRASH-RECOVERY over this seat's writable sets | ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/ docs/tranches/V/megatranche/registry/ docs/tranches/X/execution/ docs/tranches/V/coordination/INBOX.md` → **0 lines**; ⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` only. value.js's 14 dirty rows are `demo/**` · `e2e/**` · `CARRY-LEDGER.md` · `scripts/dev/dev.sh` — **a sibling track's, none in any owed unit's set; nothing stashed, nothing restored, `dev.sh` never staged** | **MET — `.g`/`.h` inherit nothing** |
| OA-r3-6 | `.f`'s artefacts present (the units' inputs) | `ADJUDICATION-W4.md` **62711 B** · `harvest/x-p-w3.json` **350304 B** · `harvest/x-p-w4s.json` **56673 B** · `DEFECT-LEDGER.md` **10560195 B** | **MET** |
| OA-r3-7 | every cure site undrifted at the bytes | `seam-contract-check.mjs` live (it ran, below); `run-full-surface.mjs:60` still holds `const candidateTypeNames = ["CssColor", "CssTimingFunction", "Stylesheet", "StyleRule", "Declaration"];` — **F-ab1's five-name literal, exactly as §0ab describes**; `src/css/**` still rejects the `!important` adjacency and still accepts `col!r` (probe below) | **MET** |

**MEASURED PATH CORRECTION (dated, beside — E-3; the fifth addendum is NOT edited).** The addendum
names `.g`'s second row as `<p2>/typescript/test/css-totality/run-full-surface.mjs`. At the bytes
⟨cmd⟩ `find <p2> -name run-full-surface.mjs -not -path '*/node_modules/*'` → the file is
`<p2>/typescript/test/css-**equivalence**/run-full-surface.mjs` (and `.worktrees/w4b/`'s copy, which
no unit may write); `test/css-totality/` exists as a sibling directory holding the totality corpus
and specs. The **subject is unambiguous** — the `:60` five-name literal, quoted above, lives in the
`css-equivalence` file. `.g`'s writable row is therefore that file **by the addendum's own
description of its contents**, and `.g` writes no byte of `test/css-totality/`. (`.h`'s
`test/css-totality/**` re-emission row is unaffected: that directory is real and is `.h`'s.)

**E13 Step-0 — four-path sweep at this seat's own clock, read-only.**
(1) `docs/tranches/V/` (10 depth-1) + `V/coordination/` (24, `INBOX.md` self-excluded per SELF-COUNT);
newest five letters are the 2026-09-18 `*-inbox-2026-09-18-value-4.1-*` batch — ⟨cmd⟩ `grep -c` each
basename in `INBOX.md` → `2 · 1 · 1 · 1 · 1`, **all rowed**. (2) `../glass-ui/docs/tranches/BK/coordination/`
— **BK re-confirmed the newest glass tranche dir** ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK/` · `BJ/` · `BI/`; 9 entries, newest `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**,
rowed (32 mentions). (3) `../keyframes.js/docs/tranches/V/coordination/` — 13 entries, newest
`INBOUND-LEDGER.md` is keyframes' own; every `VALUEJS-INBOUND-*` is ours outbound. (4)
`../sci-report/atlas/docs/tranches/P/coordination/` — 28 entries, **UNMOVED** (newest 2026-07-27, ours).
⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -newermt "2026-09-19 09:10"` → **exactly one member,
`INBOX.md` itself** — `.f`'s own O-41 row, committed at `e456c2ff`, not inbound mail.
**Status-cell census, positional, double-run**: ⟨cmd⟩ `awk -F'|' '/^\| *[IO]-[0-9]+ *\|/ {rows++; s=$6;
sub(/^[ *]+/,"",s); if (s ~ /^UNREAD/) u++} END {print "ROWS="rows, "UNREAD="u+0}' INBOX.md` →
**`ROWS=77 UNREAD=0`**, identical on both runs. A bare `grep -i UNREAD` over the same rows returns 4
(O-20 · I-31 · I-32 · O-39) — **all four are prose inside a status cell that begins `**SENT**` /
`**FOLDED**` / `**READ IN FULL + ROUTED**`**, the X.P.W0 CHECK-1 **D-1** trap, and none is UNREAD.
**Result: 0 unrowed letters addressed to value.js · 0 UNREAD in scope · no `I-n` minted · `INBOX.md`
NOT written at this open.**

## Baseline — THIRD SITTING

Per the STALL-WATCHDOG resume clause, **only the gates the two owed units turn are re-measured at
this seat's clock**; the rest are cited from `.f`'s own banked close-table above, which measured them
after the last byte moved and is the settled reading. Nothing below is a claim about a gate this seat
did not run.

**G-1 — RE-RUN AT THIS SEAT, DOUBLE-RUN, READ-ONLY (the gate `.g` turns).**
⟨cmd⟩ `node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/evidence/W3/universe-52.json docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`
→ **EXIT=1** on both runs; ⟨cmd⟩ `diff -q run1 run2` → **IDENTICAL**.

```
rows: contract 52 · universe 52 · ledger rows 47
universe tally: {"TOTAL":46,"PARTIAL":6,"ABSENT":0}
SET DIFFERENCES (G-1: both must be empty)
  contract ∖ universe-52 : ∅
  universe-52 ∖ contract : ∅
DISPOSITION CENSUS
  declared-divergence    7
  identical              45
  (COHESION §0v carried: 44 cells over 6 rows)
VERDICT: RED — 2 check(s) failed.
  [E] a row whose disposition contradicts DIVERGENCE-LEDGER.md — 37
        serializeCssColor: disposition "identical" vs DIVERGENCE-LEDGER rows CN-2
        …  (9 rows vs CN-2 · 28 rows vs CN-3)
  [G] COHESION §0v rider — a carried cell not published as PENDING-ADJUDICATION — 6
        parseCssColor / parseCssScalar / parseCssValue / parseCssValues: carries GROUND-C×1 but publishes "declared-divergence"
        parseTimingFunction: carries GROUND-C×23 ID-2×1 but publishes "declared-divergence"
        parseStylesheet: carries ID-1b×9 ID-4×5 GROUND-C×2 but publishes "declared-divergence"
```

**This is E-w4f-1 exactly, reproduced independently and not accepted on `.f`'s report**: both
set-differences are ∅, the census is post-adjudication (`identical 45 · declared-divergence 7 · 0
PENDING`), and the **two failing checks are the instrument's pre-adjudication vocabulary** — [E]
binds subjects of `CN-2`/`CN-3`, which `DIVERGENCE-LEDGER.md` §10 **RETIRED**, and [G] applies §0v's
pre-adjudication rider to cells whose rulings are now terminal in `ADJUDICATION-W4.md`. `.g` cures
the checker; it **does not touch the contract, the ledger or the adjudication**.

**`.h`'s two cells — BORN-RED PROBE at this seat, double-run, read-only** (an import of the
candidate's own `entry.mjs`; nothing written):

| probe | input | reading |
|---|---|---|
| `#40` | `b { background-color: var(--brand) -!important }` | **`ok=false`** (REJECT) |
| `#41` | `#d { background-color: hsl(73.416 -338 -290)!important } .c { color: red }` | **`ok=false`** (REJECT) |
| spaced control | `b { color: red !important }` | `ok=true` (ACCEPT) — the adjacency is the sole variable |
| minimal | `b { color: red!important }` | **`ok=false`** — F-w4f-2 in one line |
| F-w4f-1 candidate half | `a { col!r: red }` | **`ok=true`** (ACCEPT) — the production still takes a non-ident NAME |

Both runs identical. **F-w4f-2 (HIGH) and F-w4f-1's candidate half are live in the shipped
production**, as §0ab rules them — `.h`'s two cures, measured before a byte moves.

**G-10 (shape (a)) — open-state, cited and unchanged**: sum **5**, the act not performed; `.f2`'s to
move, and only under a performed stamp.

**Cited from `.f`'s banked close-table (not re-run here)**: **G-2** GREEN for X·P (0 wave paths under
`src|demo|api|test|e2e`) · **G-3 GREEN** (`52 of 52` · `G3 GREEN` · exit 0 — `.e2`'s cure, and no
`<p2>` packaging byte has moved since) · **G-4** GREEN · **G-5** GREEN (RC-P honestly FALSE, conjunct
3 now over V's own bytes, 20,962) · **G-6** 25 · **G-7** 0/0 floor · **G-8** GREEN (0 UNREAD) ·
**G-9** GREEN. **R.2**: every one of these is **inherited, never this wave's work**, and each is
`.f2`'s re-run obligation at its own clock.

**R.2 — GREEN BEFORE CURE (declared, not smoothed)**: `G-2 · G-4 · G-5 · G-6 · G-8 · G-9` are
spec-born-RED gates that read GREEN before this sitting's units cure anything (G-7 is the declared
inherited-GREEN FLOOR; G-3 is GREEN by `.e2`'s landed cure, not born so). Listed as findings, owned
by `.f2`'s re-measurement.

## Unit plan — THIRD SITTING

**alreadyDone, never re-dispatched**: `X.P.W4.e` (`93bcb83`) · `X.P.W4.e2` (`43c3f48` · `49ca70b`) ·
`X.P.W4.f` (`6be73f38` · `04d5ed04` · `e456c2ff` · `3d4470f2` · `f3c389c`). **Groups**: [`.g` ∥ `.h`]
→ `.f2` — exactly COHESION §0ab's *"Groups: [`.g` ∥ `.h`] (disjoint paths) → `.f2`"*. Concurrency 2,
the standing cap. **No path is shared between `.g` and `.h`**: `.g`'s only value.js-docs writes are
`scripts/seam-contract-check.mjs` and the `DEFECT-LEDGER.md` append; `.h`'s are
`ADJUDICATION-W4.md`, `SEAM-CONTRACT.md` and `DIVERGENCE-LEDGER.md`. Both file NEW dated
`evidence/W4/**` files — **creates, not modifies**, and each unit's basenames carry its own unit
letter (`…-w4g-…` / `…-w4h-…`), so the directory is shared and no path is.

### `X.P.W4.g` — THE CHECKER LEARNS THE POST-ADJUDICATION VOCABULARY (Opus)

*Spec*: COHESION §0ab first bullet (`COHESION.md:1770–1781`) · `W4.md` FIFTH addendum, `.g` clause
(`waves/W4.md:682`) · `W4.md` §6 **G-1** (`:389–405`, the command and its three falsifiers).
*Writable*: `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` ·
`/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-equivalence/run-full-surface.mjs`
(the file holding the `:60` literal — see the MEASURED PATH CORRECTION above) ·
`docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (modify-append, **by the harvester through
the §0p run-B symlink only, never a hand's**) · `docs/tranches/X/parse-that/evidence/W4/**` (NEW
dated files).
*Gates*: **G-1** `VERDICT: GREEN`, exit 0, double-run, **and the three negative controls printed RED**
(a `PENDING` head with no adjudication row · an unretired subject binding against an `identical` row ·
a disposition id absent from the ledger).
*Locks*: parallel with `.h`; both strictly before `.f2`. `evidence/W4/**` creates only — E-3 forbids
touching `.b`/`.d`/`.e`'s files.

### `X.P.W4.h` — THE `!important` ADJACENCY AND THE IDENT-TOKEN NAME (Opus)

*Spec*: COHESION §0ab bullets 2–3 (`COHESION.md:1782–1788`) · `W4.md` FIFTH addendum, `.h` clause
(`waves/W4.md:682`) · `ADJUDICATION-W4.md` §6 rows **F-w4f-2** / **F-w4f-1** (`:168–169`) and cells
`#40` / `#41` (`:112–113`) · COHESION §0s's quartet law.
*Writable*: `<p2>/typescript/src/css/**` **for the declaration production only** ·
`<p2>/typescript/test/css-totality/**` re-emission outputs as NEW dated files ·
`docs/tranches/X/parse-that/ADJUDICATION-W4.md` (dated addendum) ·
`docs/tranches/X/parse-that/SEAM-CONTRACT.md` (**only the cells the two rulings touch** — row 19
`parseStylesheet`, `SEAM-CONTRACT.md:130`) · `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`
(modify-append: the F-w4f-1 row) · `docs/tranches/X/parse-that/evidence/W4/**` (NEW dated files).
*Gates*: cells `#40` / `#41` re-measure **`identical`**; the full differential re-run reads **0
mirror-defects outside ruled ids**; **W3's totality gate still TOTAL**.
*Locks*: parallel with `.g`; both strictly before `.f2`. §0s's quartet law binds if a ctor row
changes (`algebra/grammar/*.mjs` · `algebra/tables.mjs` · both lowerings · `bounds.mjs`).

### `X.P.W4.f2` — THE STAMP, RE-ATTEMPTED (a FRESH Fable adjudicator, M-23 §1)

*Spec*: COHESION §0ab final bullet (`COHESION.md:1789–1792`) · `W4.md` THIRD addendum's `.f` stamp
set (`waves/W4.md:678`) · `W4.md` §6 **G-10 shape (a)** (the awk-narrowed sum: **5** at open, **0**
after the stamp).
*Writable*: the five four-verb `VERIFIED` rows in `docs/tranches/X/parse-that/waves/W0..W4.md` (R-A,
one act) · `docs/tranches/X/COHESION.md` §1 SS-5 cell + §5 board line (**iff the stamp is
performed**) · `docs/tranches/X/parse-that/waves/W4-CLOSE.md` (dated **§13**) ·
`docs/tranches/X/parse-that/RELEASE-PACKET.md` (dated addendum) ·
`docs/tranches/V/megatranche/registry/harvest/x-p-w4s.json` (**fold/2 — the file EXISTS at 56673 B;
measure before writing, F-w4c-2; a blind create destroys banked evidence, E-3**) ·
`docs/tranches/V/coordination/INBOX.md` (mail rows).
*Gates*: **G-1 … G-10**, all re-run at its own clock; the **R-A stamp iff G-1..G-9 GREEN**, else
**withheld by gate id** — again, and never by prose.
*Locks*: strictly after **both** `.g` and `.h`; the two COHESION carves only under a performed stamp.

## Unit receipts — THIRD SITTING

*(empty at the open; each dispatched unit appends its own receipt below, SERVED MODEL first.)*

## Close — THIRD SITTING

**SERVED MODEL**: `claude-opus-5[1m]` · **CLOSE SEAT (VERIFY-ONLY — this seat cured nothing and
wrote no byte outside this record and `execution/LEDGER.md`)** · 2026-09-19.

**Verdict: PARTIAL.** Both dispatched units returned **DEAD with zero commits**: `X.P.W4.g` (the
checker's post-adjudication vocabulary) and `X.P.W4.h` (the `!important` adjacency + the ident-token
NAME). `X.P.W4.f2` was **never dispatched** — its own lock reads *"strictly after **both** `.g` and
`.h`"*, and §6 G-10's falsifier (*"a stamp performed while any of G-1..G-9 is red fails"*) bars it
independently. **No byte landed at this sitting, in either repo.** The R-A stamp is **WITHHELD by
gate id: G-1**, exactly as the second sitting left it.

**CRASH-RECOVERY (standing law).** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain -- docs/tranches/X/execution/D/X-P-W4S.md docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md`
→ **0 lines** — this seat's entire writable set is clean and **inherits nothing**. The two killed
seats' partial work lies **outside** it and was **read, never touched** (§Residuals R-1/R-2):
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/` → `M scripts/seam-contract-check.mjs`
+ **8** untracked `evidence/W4/negctl-w4g-*` files; ⟨cmd⟩ `git -C <p2> status --porcelain` →
`M typescript/test/css-equivalence/run-full-surface.mjs` · `?? .worktrees/`. Nothing stashed,
nothing restored, nothing reset; `scripts/dev/dev.sh` never staged; the 13 dirty `demo/**`+`e2e/**`
rows are a concurrent Track-A seat's and were not read as this wave's.

### 1. ACT 1 — commits: the two dispatched units have none

⟨cmd⟩ `git log --oneline -40 | grep -iE 'w4\.(g|h|f2)'` (value.js) → **no output**;
⟨cmd⟩ the same over ⟨cmd⟩ `git -C <p2> log --oneline -20` → **no output**. `<p2>` HEAD is
**`f3c389c`** (`.f`'s rc-p arm) and value.js HEAD is **`27ebc255`** (a Track-A row) — both unmoved
by this sitting.

| unit | dispatched | commits | writable-set bytes moved | verdict |
|---|---|---|---|---|
| `X.P.W4.g` | yes | **none** | **none committed**; uncommitted partial work survives at 2 paths (R-1) | **DEAD** |
| `X.P.W4.h` | yes | **none** | **none, committed or uncommitted** — ⟨cmd⟩ `git status --porcelain -- ADJUDICATION-W4.md SEAM-CONTRACT.md DIVERGENCE-LEDGER.md` → 0 lines; ⟨cmd⟩ `git -C <p2> status --porcelain -- typescript/src/css typescript/test/css-totality` → 0 lines | **DEAD** |
| `X.P.W4.f2` | **no** (locked behind `.g`/`.h`) | none | none | **NOT DISPATCHED** |

**alreadyDone, re-verified in bounds at this seat and never re-dispatched**: `.e` `93bcb83` · `.e2`
`43c3f48` ⊕ `49ca70b` · `.f` `f3c389c` (`<p2>`) and `6be73f38` · `04d5ed04` · `e456c2ff` ·
`3d4470f2` (value.js). ⟨cmd⟩ `git show --name-only --format= 6be73f38 04d5ed04 e456c2ff 3d4470f2 | grep -cE '^(src|demo|api|test|e2e)/'`
→ **0**.

**LANDED-WRONG: none** — a sitting with zero commits can land nothing wrong. The findings below are
*unlanded* work and *unturned* gates, which is a different fault and is recorded as such.

### 2. ACT 2 — every §6 gate re-run at THIS seat's clock, against its own GREEN definition

Every reading double-run. The two writing scripts were given `--out` into the session scratchpad, so
**no byte of `evidence/W4/**` was touched by this close** (E-3).

| gate | §6 GREEN definition | BEFORE (this sitting's Open) | AFTER (close seat, 2026-09-19) | verdict |
|---|---|---|---|---|
| **G-1** | both set-differences ∅ · no disposition contradicts the ledger · no blank field · exit 0 | **RED** (E-w4f-1, exit 1) | **at the LANDED bytes** ⟨cmd⟩ `git show HEAD:…/seam-contract-check.mjs > <scratch>/scc-HEAD.mjs` then `node <scratch>/scc-HEAD.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `rows: contract 52 · universe 52 · ledger 47` · `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · census `declared-divergence 7 · identical 45` · `VERDICT: RED — 2 check(s) failed` ([E] **37** rows bound to the retired `CN-2`/`CN-3` subjects · [G] **6** §0v-carried cells) · **EXIT=1**, ⟨cmd⟩ `diff -q run1 run2` → **IDENTICAL** | **RED — unmoved; `.g` died before it could land its cure** |
| **G-2** | no value.js source byte at any commit of the wave | GREEN for X·P | raw ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **13 lines**, all `demo/**` + `e2e/**`, all a concurrent Track-A `X-W5` seat's; the gate's own assertion over **this sitting's commits** is vacuously satisfied — **there are none** — and over the wave's whole roster ⟨cmd⟩ `git show --name-only --format=` → **0** such paths | **GREEN for X·P — read with attribution, not smoothed** |
| **G-3** | `resolved 52 of 52` · `G3 GREEN` · exit 0 | GREEN (cited from `.e2`) | ⟨cmd⟩ `node <p2>/typescript/scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>/g3-close-run{1,2}.json` → `resolved "52 of 52"` · `entryCount 91` · `seamSubpathDeclared true` · `refusals 5` · `tarballSha256 f8aede11…` · `verdict {pack:true, declaration:true, install:true, resolve:true, refusals:true, G3:"GREEN"}` · **EXIT=0** both runs; ⟨cmd⟩ `diff` over the two JSONs → **one line**, the temp `consumerRoot` mkdtemp suffix | **GREEN — re-verified at this seat, not inherited** |
| **G-4** | 0 function-kind imports · empty-import instantiation · every import accounted | GREEN (cited) | ⟨cmd⟩ `node <p2>/typescript/scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` · `functionKindZero true` · `emptyImportInstantiation true` · `everyImportAccounted true` · `"verdict": "GREEN"` · **EXIT=0 on both runs** | **GREEN** |
| **G-5** | the six-row table prints; exit non-zero while any conjunct is false, naming which | GREEN (honestly FALSE) | ⟨cmd⟩ `node <p2>/typescript/scripts/rc-p-evaluate.mjs --version 4.0.0` → `1 PUBLISHED FALSE · 2 TOTALITY TRUE · 3 EQUIVALENCE FALSE (arm V: 20962 mirror-defects over V's installed /css, full corpus) · 4 ADMITTED FALSE ("not vacuously true") · 5 BAR-DISCHARGED TRUE · 6 ROUTED TRUE` → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE` · `KF.W3 does NOT open` · **EXIT=1 on both runs** | **GREEN — the predicate honestly FALSE** |
| **G-6** | ≥ 2 hits naming `RC-P` by predicate, in files X·P may not write | 25 | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**, double-run `25 ≡ 25` | **GREEN** |
| **G-7** | INHERITED-GREEN FLOOR — the direct edge absent | 0 / 0 | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0**; double-run | **GREEN — floor held** |
| **G-8** | packet in-repo · dated row names that path + the SS-6 batch · 0 UNREAD | GREEN | ⟨cmd⟩ `ls -l …/RELEASE-PACKET.md` → **26645 B**; `grep -c` in `INBOX.md`: `RELEASE-PACKET` → **2**, `SS-6` → **27**, `RC-P` → **2**; positional Status-cell census → **ROWS=81 UNREAD=0**, double-run identical | **GREEN** |
| **G-9** | a terminal disposition, never silence | GREEN | ⟨cmd⟩ `grep -n 'BLOCKED-ON' …/waves/W4-CLOSE.md` → `:131` §0i.1 S-4 **DISPOSITION C** · `:134` *"Ruled: C. The row closes `BLOCKED-ON` + re-trigger"* · `:148` the re-trigger command; ⟨cmd⟩ `git show --name-only` over the wave's commits → **0** paths under `docs/tranches/X/waves/` | **GREEN — recorded, not decided here** |
| **G-10** | shape (a) sum **5** at open, **0** after the stamp | 5 (act not performed) | ⟨cmd⟩ `for f in …/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5**, double-run | **RED — the act was not performed; open-state value correct; stamp WITHHELD by gate id G-1** |

**GREEN: G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 (8). RED: G-1 · G-10 (2).** The sitting's
reading is **identical to the reading it opened against** — which is the honest consequence of two
dead seats: no gate moved because no byte moved.

**The one reading that could be mistaken for a green, stated plainly.** The **uncommitted**
working-tree `seam-contract-check.mjs` (`+177 / −15`, the dead `.g` seat's) runs to
`VERDICT: GREEN — both set-differences ∅, no disposition contradicts a LIVE ledger row, every
carried cell is terminally ruled in ADJUDICATION-W4.md, no field is blank`, **EXIT=0**. That reading
is recorded **because it exists on disk and a successor will meet it**, and it is **not a green for
this wave**: the bytes are uncommitted, unreceipted, and unadjudicated — no unit receipt describes
them, the three §0ab negative controls have file names on disk but **no measured RED reading in any
record**, and G-1's landed state is the committed checker, which reads RED. A VERIFY-ONLY close
neither commits another seat's bytes nor certifies them. **G-1 is RED.**

**`.h`'s subjects re-probed at this seat, double-run, read-only** (an import of the candidate's own
`src/css/entry.mjs`; nothing written):

| probe | input | reading | vs the open baseline |
|---|---|---|---|
| cell `#40` | `b { background-color: var(--brand) -!important }` | `ok=false` (REJECT) | **unmoved** |
| cell `#41` | `#d { background-color: hsl(73.416 -338 -290)!important } .c { color: red }` | `ok=false` (REJECT) | **unmoved** |
| spaced control | `b { color: red !important }` | `ok=true` (ACCEPT) | unmoved — the adjacency is still the sole variable |
| minimal | `b { color: red!important }` | `ok=false` | **F-w4f-2 still live** |
| F-w4f-1 half | `a { col!r: red }` | `ok=true` (ACCEPT) | **the production still takes a non-ident NAME** |

Both runs identical. **F-w4f-2 (HIGH) and F-w4f-1 are exactly as §0ab found them** — `.h` moved
nothing.

### 3. ACT 3 — §8 Verification Artefacts, as written

| artefact | state |
|---|---|
| `SEAM-CONTRACT.md` | PRESENT **97534 B** |
| `RELEASE-CONDITION.md` | PRESENT **31606 B** |
| `RELEASE-PACKET.md` | PRESENT **26645 B** |
| `waves/W4-CLOSE.md` | PRESENT **46065 B** |
| `DIVERGENCE-LEDGER.md` | PRESENT **136935 B** |
| `ADJUDICATION-W4.md` (`.f`'s) | PRESENT **62711 B** |
| `scripts/seam-contract-check.mjs` | PRESENT **25333 B** working-tree / **16379 B** at HEAD — **the delta is R-1's uncommitted work** |
| `evidence/W4/{packed-surface.json, wasm-imports.json, rc-p-evaluation.json}` | PRESENT 128861 / 9392 / 33938 B — `.b`'s and `.d`'s, **untouched** |
| `evidence/W4/{value-source-untouched.txt, reciprocity-grep.txt}` | PRESENT 3312 / 3951 B |
| `registry/harvest/{x-p-w3.json, x-p-w4.json, x-p-w4s.json}` | PRESENT 350304 / 119964 / 56673 B |

**No artefact is owed by this sitting** — `.g`'s and `.h`'s evidence files were to be NEW dated
creates, and the eight untracked `negctl-w4g-*` files are R-1's, not this close's.

### 4. ACT 4 — E13, the four paths swept again at the close seat's clock

(1) `docs/tranches/V/` — **10** depth-1 `.md` ⊕ **24** coordination entries; the newest four letters
(`parse-that-inbox-2026-09-18-value-4.1-evidence-addendum-2` · `fourier-…-facility19-delta` ·
`glassui-…-r1-relay` · `atlas-…-export-delta-refresh`) each ⟨cmd⟩ `grep -c <basename> INBOX.md` →
**2 · 1 · 1 · 1**, all rowed. (2) `../glass-ui/docs/tranches/BK/coordination/` — **BK** still the
newest glass tranche dir (`BK` · `BJ` · `BI`), **9** entries, newest
`glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed (**32** mentions).
(3) `../keyframes.js/docs/tranches/V/coordination/` — **13** entries, unmoved.
(4) `../sci-report/atlas/docs/tranches/P/coordination/` — **28** entries, unmoved.
⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -newermt "2026-09-19 09:10"` → **exactly one
member, `INBOX.md` itself** (self, sibling-track appends).

**Positional Status-cell census, double-run** — ⟨cmd⟩ `awk -F'|' '/^\| *[IO]-[0-9]+[a-z]? *\|/ {rows++; s=$6; sub(/^[ *]+/,"",s); if (s ~ /^UNREAD/) u++} END {print "ROWS="rows, "UNREAD="u+0}' INBOX.md`
→ **`ROWS=81 UNREAD=0`**, identical on both runs. A bare ⟨cmd⟩ `grep -ci unread` over the same file
returns **79** — the X.P.W0 CHECK-1 **D-1** trap; every one is prose inside a cell that begins
`**SENT**` / `**FOLDED**` / `**READ IN FULL + ROUTED**`. **0 unrowed letters · 0 UNREAD in scope ·
no `I-n`/`O-n` minted · `INBOX.md` NOT written by this close.**

### 5. Commit roster

| sitting | unit | repo | hash | meaning |
|---|---|---|---|---|
| 1 | `.e` | `<p2>` | `93bcb83` | the candidate DECLARES and SHIPS its `/css` seam (C1·C2·C3) |
| 1 | `.e` | value.js | `e9140c34` | five NEW dated `evidence/W4/` files |
| 1 | — | value.js | `f170e178` · `2bf4b205` | `.e`'s receipt · the first close |
| 2 | `.e2` | `<p2>` | `43c3f48` · `49ca70b` | the arity-instantiated check line · the latch reader on `./packrat` |
| 2 | `.f` | `<p2>` | `f3c389c` | conjunct 3's V-tarball arm |
| 2 | `.f` | value.js | `6be73f38` · `04d5ed04` · `e456c2ff` · `3d4470f2` | the 45 cells ruled · §2.3 addendum · the adjudicative close + harvests · the receipt |
| 2 | — | value.js | `c5c7daad` | the THIRD-SITTING open |
| **3** | `.g` | — | **NONE** | **DEAD** |
| **3** | `.h` | — | **NONE** | **DEAD** |
| **3** | `.f2` | — | **NONE** | **not dispatched (locked)** |
| **3** | close | value.js | *(this close + the LEDGER row)* | the record and the row; no gate cured |

### 6. Residuals, with named owners

- **R-1 — `.g`'s uncommitted partial work, in two repos, left exactly as found.** value.js
  `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` `+177 / −15` (reads G-1 GREEN, exit 0)
  and **8** untracked `docs/tranches/X/parse-that/evidence/W4/negctl-w4g-*` files
  (`…-contract-base` · `…-contract-A-pending-unruled` · `…-contract-B-live-binding` ·
  `…-contract-C-ghost-id` · `…-adjudication` · `…-adjudication-empty` · `…-ledger` · `…-universe.json`).
  **`<p2>` `typescript/test/css-equivalence/run-full-surface.mjs` `+2 / −1` is INCOMPLETE**: the seat
  added `readFileSync` and `fileURLToPath` and **died before replacing the `:60` literal** —
  ⟨cmd⟩ `sed -n '61p'` still reads
  `const candidateTypeNames = ["CssColor", "CssTimingFunction", "Stylesheet", "StyleRule", "Declaration"];`,
  so F-ab1 is **unfixed** and the file currently carries two unused imports. **Owner: a successor
  `X.P.W4.g` seat** — which must judge every hunk against §0ab bullet 1 and G-1's three falsifiers
  and **measure the three negative controls RED itself**, never adopt the green on sight.
  This close touched none of it (VERIFY-ONLY; the paths are `.g`'s set, not this seat's).
- **R-2 — `.h` produced nothing, anywhere.** Its three value.js subjects and both `<p2>` subject
  trees are byte-clean; cells `#40`/`#41` still REJECT and `col!r` still ACCEPTs, re-measured above.
  **Owner: a successor `X.P.W4.h` seat**, under §0s's quartet law if a ctor row changes.
- **R-3 — `.f2` never opened, and the R-A stamp is WITHHELD by gate id G-1.** Shape-(a) sum stands
  at **5**. **Owner: `X.P.W4.f2`**, strictly after `.g` and `.h` both read green.
- **R-4 — G-2's raw command is not empty and X·P did not make it so.** 13 `demo/**` + `e2e/**` rows,
  a concurrent Track-A `X-W5` seat's. Unchanged in kind from the two earlier sittings; read with
  attribution. **Owner: Track A.**
- **R-5 — G-3's tarball sha has moved twice** (`efc11936…` → `6b51c336…` → **`f8aede11…`**) as `.e`
  and `.e2` landed; the gate is GREEN at the current sha, measured here. Recorded so a later seat
  does not read a sha drift as a defect. **Owner: none — informational.**

### 7. Escalations

- **ESC-W4S-r3-1 — the sitting produced zero landed bytes because both seats were killed.** `.g` and
  `.h` were dispatched in parallel per §0ab and both returned DEAD with no commit; this is the
  **third** sitting of X.P.W4S in which seats died mid-work (the STALL WATCHDOG clause records six
  killed at the previous one). The wave cannot reach `.f2` without a re-dispatch of `[.g ∥ .h]`.
  **Routed to the orchestrator / COHESION** — the close seat cures nothing and invents no unit.
- **ESC-W4S-r3-2 — a GREEN on disk with no receipt behind it.** R-1's uncommitted checker turns G-1
  GREEN, and adopting it would convert a killed seat's unreviewed work into a gate verdict. The
  lawful act is a successor `.g` that re-derives the cure against §0ab bullet 1, prints the three
  negative controls RED, double-runs G-1, and commits by pathspec. **Recorded so the next seat meets
  the green as a claim to be tested, not as work already done.**

### 8. Four-verb — moved exactly as the spec says this wave moves it, and no further

`W4.md` §2 **R-A** is the governing sentence: *"Gates green + bytes landed stamps a wave
**IMPLEMENTED**"*, and *"**VERIFIED is stamped only at this wave's release close**"* by the fresh
adjudicator — `.f2` at this sitting. **Neither condition is met.** No byte landed; **G-1 and G-10
read RED**; the adjudicator was never dispatched.

| verb | value | moved by this close? | evidence |
|---|---|---|---|
| AUDITED | **YES** | no | `W4.md` §2 (unchanged) |
| SPECIFIED | **YES** | no | `W4.md` + five dated addenda (`:674 · :676 · :678 · :680 · :682`) |
| IMPLEMENTED | **NO** | **no — withheld by the act's own condition** | zero commits at this sitting; G-1 RED |
| VERIFIED | **NO** | **no — R-A reserves the stamp for `.f2`, and G-10's falsifier bars it while G-1 is red** | shape-(a) sum **5**, re-measured above |

**The R-A stamp act is WITHHELD by gate id: G-1.** The five sibling `VERIFIED` rows and the two
COHESION carves (§1 SS-5 cell · §5 board line) are **untouched** — ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/parse-that/waves/ docs/tranches/X/COHESION.md` → **0
lines**. **X.P.W4's own CLOSED row is never rewritten**, and was not.

### 9. Push

Both remotes pushed at the close, per the owner's 2026-09-17 authorization; never forced. `<p2>` has
no remote (recorded at the first sitting, and re-read here), so its commits remain local-only.

### 10. The re-trigger, stated so it cannot be mistaken for a schedule

X.P.W4S resumes by **re-dispatching `[.g ∥ .h]`** under COHESION §0ab and `W4.md`'s FIFTH dated
addendum — `.g` first meeting R-1's inherited hunks as a claim to test, `.h` from clean bytes — and
`.f2` opens **iff** ⟨cmd⟩
`node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/evidence/W3/universe-52.json docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`
reads **`VERDICT: GREEN`, exit 0, double-run, at COMMITTED bytes**, and cells `#40`/`#41` re-measure
`identical`. Until then RC-P stays honestly FALSE and KF.W3 does not open.

---

# RESUME — FOURTH SITTING (2026-09-19, on COHESION §0ab; relaunched by §0ag)

SERVED MODEL: claude-opus-5[1m]

## Open

**Date** 2026-09-19 (sitting of record **2026-09-17**, the owner's begin-word, COHESION §0j).
**Seat** SEAT 0 (OPEN), Track D (X·P), `claude-opus-5[1m]`. **No byte above this line is rewritten**
(E-3); **X.P.W4's CLOSED row is untouched**.

**Why a fourth sitting.** The third sitting closed **PARTIAL** at `40bfbc9b`: both dispatched units
(`.g` ∥ `.h`) returned DEAD with **zero commits**, and `.f2` was never dispatched. COHESION **§0ag**
(`:1898`) names the cause — the synchronized kills were the supervisor cron's tick deliveries into
the root session, the cron is **deleted**, and *"all four tracks relaunch in RESUME MODE now"*. §0ae
and §0af are superseded on their diagnosis, not on their durability posture. No spec, row or law
changes; the units are re-dispatched **unchanged** under §0ab and `W4.md`'s FIFTH dated addendum.

### Preconditions — verified at the bytes AND in the ledger

| # | condition | receipt | verdict |
|---|---|---|---|
| PA-1 | `.e` · `.e2` · `.f` stand on their commits | ⟨cmd⟩ `git -C <p2> log --oneline -8` → `f3c389c` (`.f`/rc-p) · `49ca70b` + `43c3f48` (`.e2`) · `93bcb83` (`.e`); value.js `e456c2ff` (`.f` close) | **MET — `alreadyDone`** |
| PA-2 | no `.g` / `.h` / `.f2` commit exists | ⟨cmd⟩ `git log --oneline -40 \| grep -iE 'w4\.g\|w4\.h\|w4\.f2'` → the sole hit is `.f`'s own close subject line; `<p2>` HEAD is still `f3c389c` | **MET — both owed in full** |
| PA-3 | §0ab is the ruling of record | `COHESION.md:1757` reads the §0ab header; §0ac–§0ag read to the file end (`1909` lines) and **none** re-mints, re-scopes or bars these units | **MET** |
| PA-4 | the unit spec exists | `waves/W4.md:682` = the **FIFTH** dated addendum (the file's last line); it carries both writable sets | **MET** |
| PA-5 | `.f`'s artefacts present | `ADJUDICATION-W4.md` **62711 B** · `SEAM-CONTRACT.md` **97534 B** · `DIVERGENCE-LEDGER.md` **136935 B** · `harvest/x-p-w3.json` **350304 B** · `x-p-w4s.json` **56673 B** · `DEFECT-LEDGER.md` **10560195 B** | **MET** |
| PA-6 | the cure sites undrifted | the five-name literal `candidateTypeNames = ["CssColor","CssTimingFunction","Stylesheet","StyleRule","Declaration"]` still stands in `run-full-surface.mjs`; the production still REJECTs the `!important` adjacency and still ACCEPTs `col!r` (probe below) | **MET** |

**MEASURED PATH CORRECTION, carried forward from the third sitting and re-measured here (the
addendum is NOT edited — E-3).** The fifth addendum names `.g`'s second row as
`<p2>/typescript/test/css-totality/run-full-surface.mjs`. At the bytes that file does **not** exist —
⟨cmd⟩ `ls <p2>/typescript/test/css-totality/` → `corpus.json` · `generated` · `lib` ·
`spec-conformance.test.ts` · `stylesheet-band.test.ts` · `tsconfig.assignability.json` ·
`universe.test.ts` · `vitest.config.ts`. The `:60` literal the addendum quotes lives in
`<p2>/typescript/test/css-**equivalence**/run-full-surface.mjs`, which is therefore `.g`'s row.
`test/css-totality/**` is real and is **`.h`'s** re-emission row; `.g` writes no byte of it.

### CRASH-RECOVERY — the killed seats' partial work, read and LEFT EXACTLY AS FOUND

⟨cmd⟩ `git status --porcelain -- <record> <LEDGER> <INBOX>` → **one line**, ` M
docs/tranches/X/execution/LEDGER.md`. ⟨cmd⟩ `git diff -U1 -- LEDGER.md` shows **2 insertions / 1
deletion**, and both hunks are a **sibling Track-A `X-W9` RESUME-OPEN** cell (`| X-W9 | X-W0 |
**RESUME-OPEN 2026-09-19** …` at line 32, plus its event line appended after `:411`) — **not this
seat's work and not this track's**. Nothing stashed, nothing restored, nothing unstaged. This is the
same hazard `5c59835d` and `0f93a570` measured: a pathspec commit of `LEDGER.md` sweeps a sibling's
in-flight byte into a Track-D commit. The file is re-measured immediately before this open's commit
and the event line is **withheld** if it is still dirty (see §Commit).

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/` → **9 lines**, all the third sitting's
**killed `.g` seat's** partial work, inherited by the successor `.g` and by no one else:

| path | state | reading at this seat |
|---|---|---|
| `scripts/seam-contract-check.mjs` | ` M` **+177 / −15** | runs to ⟨cmd⟩ `VERDICT: GREEN`, **EXIT=0** — a GREEN with no receipt behind it (**ESC-W4S-r3-2**). Its `:36` now reads `const adjudicationPath = process.argv[5] ?? resolve(dirname(contractPath), "ADJUDICATION-W4.md")`, so check **G** does read the adjudication. **No negative control has a measured RED in any record.** |
| `evidence/W4/negctl-w4g-{adjudication,adjudication-empty,contract-A-pending-unruled,contract-B-live-binding,contract-C-ghost-id,contract-base,ledger}-2026-09-19.md` + `negctl-w4g-universe-2026-09-19.json` | `??` ×8 | the killed seat's negative-control fixtures and transcripts, **untracked and unreceipted** |

⟨cmd⟩ `git -C <p2> status --porcelain` → ` M typescript/test/css-equivalence/run-full-surface.mjs`
(**2 / 1**) and `?? .worktrees/`. The hunk is **INCOMPLETE**: the `:60`-area five-name literal is
**untouched at the bytes** (re-read above), so **F-ab1 is unfixed**.

**The law this seat applies**: these are `.g`'s paths, not SEAT 0's. This open **adopts nothing,
reverts nothing, and stages nothing**; it reads the diff whole, names every inherited path here, and
hands them to the successor `.g` **as a claim to be tested** — §0ab's wording, and ESC-W4S-r3-2's.
`scripts/dev/dev.sh` (unowned, dirty by standing arrangement) was never touched or staged; value.js's
other dirty rows are a sibling Track-A seat's `demo/**` + `e2e/**` and `CARRY-LEDGER.md`, none in any
writable set of this wave.

### E13 Step-0 — the four-path mail sweep

| path | measured | newest |
|---|---|---|
| `docs/tranches/V/` (depth 1) ⊕ `V/coordination/` | **19** ⊕ **24** | the five 2026-09-18 letters, all rowed |
| `../glass-ui/docs/tranches/BK/coordination/` | **9** — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/`, **BK re-confirmed newest** | `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed |
| `../keyframes.js/docs/tranches/V/coordination/` | **13** | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, ours |
| `../sci-report/atlas/docs/tranches/P/coordination/` | **28 UNMOVED** | `valuejs-inbound-2026-07-27-…` |

⟨cmd⟩ the positional Status-cell census — `awk -F'|' '/^\| *[IO]-[0-9]/{n++; s=$6; gsub(/^[ *`]+/,"",s); if (s ~ /^UNREAD/) u++} END{print "ROWS=" n " UNREAD=" u+0}'` → **`ROWS=81 UNREAD=0`**,
**double-run identical**. A naive `$(NF-1)` read returns **3** (`O-20` · `I-35` · `O-39`) and a bare
`grep -i UNREAD` returns more still — all prose **inside** status cells that begin `SENT` / `FOLDED` /
`READ`: the X.P.W0 CHECK-1 **D-1** trap, avoided by reading column **6** by position.

**Unrowed census.** ⟨cmd⟩ a filename-membership sweep of the three letter dirs against `INBOX.md`
returns 8 names, and **every one of them is outbound or another repo's inbound**: the four
`value-inbox-2026-07-20-{d23-ruled-mirror-primary,parser-proof-evidence,pi-minitranche-notice,residual-repairs}.md`
each read `FROM: the value.js union-apotheosis program … → the active V-next Codex fleet` (value.js's
**own** authored letters, deposited in its own dir), and the four keyframes files are `ATLAS-` /
`GLASS-` / `SPEEDTEST-INBOUND` (addressed to **keyframes**) plus `VALUEJS-INBOUND-…-formation-exchange-marks`
(ours, outbound). **Zero unrowed letters addressed to value.js.**
⟨cmd⟩ `find <the four dirs> -newermt "2026-09-19 09:10"` → **one member, `INBOX.md` itself** (`.f`'s
own `O-41` row at `e456c2ff`), not inbound mail. **0 unrowed · 0 UNREAD · no row minted · `INBOX.md`
NOT written at this open.**

## Baseline — re-banked at this seat's clock, READ-ONLY

Per the **STALL WATCHDOG** resume clause, only the gates the still-owed units turn were re-run at
baseline (**G-1** for `.g`; the two cells for `.h`; **G-10** for `.f2`); the rest are **cited** from
the third sitting's close table and are `.f2`'s re-run obligations at its own clock. Nothing was
written: the checker only prints, and the cell probe is an import of the candidate's own `entry.mjs`.

| gate | owner | reading at this open | source |
|---|---|---|---|
| **G-1** | `.g` | **RED — EXIT=1, double-run identical** | re-run here, at **committed** bytes |
| **G-2** | `.f2` | GREEN (X·P's claim: no wave commit carries a `src`/`demo`/`api`/`test`/`e2e` path) | cited, third-sitting close |
| **G-3** | `.f2` | GREEN — `52 of 52`, exit 0, sha `f8aede11` (`.e2`'s landed cure) | cited |
| **G-4** | `.f2` | GREEN — `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` | cited |
| **G-5** | `.f2` | GREEN — `RC-P(4.0.0) = FALSE — 3 of 6`, exit 1, honestly false | cited |
| **G-6** | `.f2` | GREEN — 25 | cited |
| **G-7** | `.f2` | GREEN — 0/0, the inherited-GREEN **FLOOR** | cited |
| **G-8** | `.f2` | GREEN — packet 26645 B; INBOX `ROWS=81 UNREAD=0` re-measured here | cited + re-measured |
| **G-9** | `.f2` | GREEN — `W4-CLOSE.md` §4 disposition **(C)** | cited |
| **G-10** | `.f2` | **RED — shape (a) sum 5, the correct OPEN-state** (the act is not performed) | re-run here |
| cells `#40`/`#41` | `.h` | **BORN-RED — both REJECT** | re-run here |

### G-1 — the gate `.g` turns, at COMMITTED bytes

⟨cmd⟩ `git show HEAD:docs/tranches/X/parse-that/scripts/seam-contract-check.mjs > <scratch>` then
`node <scratch> SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md`
→ **EXIT=1 on both runs**; ⟨cmd⟩ `diff -q run1 run2` → **IDENTICAL**.

```
VERDICT: RED — 2 check(s) failed.
  [E] a row whose disposition contradicts DIVERGENCE-LEDGER.md — 37
        serializeCssColor / … : disposition "identical" vs DIVERGENCE-LEDGER rows CN-2
        CustomFunctionRule / KeyframeRule / … / ViewTimelineDescriptor : … vs CN-3
  [G] COHESION §0v rider — a carried cell not published as PENDING-ADJUDICATION — 6
        parseCssColor · parseCssScalar · parseCssValue · parseCssValues : GROUND-C×1, publishes "declared-divergence"
        parseTimingFunction : GROUND-C×23 ID-2×1        parseStylesheet : ID-1b×9 ID-4×5 GROUND-C×2
```

**E-w4f-1 reproduced independently at this seat, not accepted on report**: the two failing checks are
exactly the instrument's **pre-adjudication vocabulary** — `[E]` binds the subjects of `CN-2`/`CN-3`,
both **RETIRED** in `DIVERGENCE-LEDGER.md` §10, and `[G]` applies §0v's pre-adjudication rider to six
cells whose rulings are now **terminal** in `ADJUDICATION-W4.md`. `.g` cures the **checker**; it
touches neither the contract, the ledger, nor the adjudication.

**And the inherited checker, measured beside it**: the **uncommitted** working-tree file runs to
`VERDICT: GREEN`, **EXIT=0**. That reading is recorded as **a claim, never a verdict** — it is
unreceipted, its three negative controls have no measured RED anywhere, and adopting it would convert
a killed seat's unreviewed diff into a gate verdict (**ESC-W4S-r3-2**). `.g` re-derives the cure
against §0ab bullet 1, prints the three controls RED, double-runs G-1, and commits by pathspec.

### `.h`'s two cells — BORN-RED PROBE, double-run, read-only

⟨cmd⟩ `node <probe.mjs> <p2>/typescript/src/css/entry.mjs` (a dynamic import of the candidate's own
entry; **nothing written**), both runs byte-identical:

| probe | input | reading |
|---|---|---|
| `#40` | `b { background-color: var(--brand) -!important }` | **`ok=false`** (REJECT) |
| `#41` | `#d { background-color: hsl(73.416 -338 -290)!important } .c { color: red }` | **`ok=false`** (REJECT) |
| spaced control | `b { color: red !important }` | `ok=true` (ACCEPT) — the **adjacency** is the sole variable |
| minimal | `b { color: red!important }` | **`ok=false`** — F-w4f-2 in one line |
| F-w4f-1 candidate half | `a { col!r: red }` | **`ok=true`** (ACCEPT) — the production still takes a non-ident NAME |

**F-w4f-2 (HIGH) and F-w4f-1's candidate half are live in the shipped production**, exactly as §0ab
rules them — measured before a byte moves.

### G-10 — shape (a), and why the §6 body's raw command is not this gate

⟨cmd⟩ `for f in docs/tranches/X/parse-that/waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done | grep -c 'VERIFIED | \*\*NO\*\*'`
→ **5**, **5** (double-run) — the correct **open-state**, the act not performed.
The **unscoped** §6 command (`cat W[0-4].md | grep -c …`) reads **7** at this seat: per-file
`W0 1 · W1 1 · W2 1 · W3 **3** · W4 1`, because `W3.md:836` and `:971` are **dated addenda quoting a
four-verb table** (landed at `55611fa3`, and `waves/` is ⟨cmd⟩ `git status --porcelain` **clean**).
**F-w4c-1's shape (a) excludes them by construction** — *"Dated addenda quoting a table are outside
the sum by construction"* — which is precisely the drift shape (a) was minted to defeat. Recorded so
`.f2` meets **5 → 0**, never 7 → 0, and so the divergence is never mistaken for a regression.
⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → **10 lines, none claiming the stamp**: every one
disclaims it (*"X.P.W4's to stamp … never this wave's"*). That leg holds.

### R.2 — GREEN before cure

**G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9** read GREEN **before** this sitting's units cure
anything (G-7 is the inherited-GREEN FLOOR; G-3 is GREEN by `.e2`'s **landed** cure at `43c3f48` /
`49ca70b`). All eight are declared **inherited, never this wave's work**, and all eight are `.f2`'s
re-run obligations at its own clock. Only **G-1**, the two cells, and **G-10** are this sitting's to
move.

## Unit plan — 3 units, 2 ordered groups, at most 2 concurrent

**Group 1 (parallel, disjoint): `X.P.W4.g` ∥ `X.P.W4.h`** → **Group 2 (serial): `X.P.W4.f2`**.
`.f2` opens **only** after both land, and is barred independently by §6 G-10's falsifier while any of
G-1..G-9 is red. Authority: COHESION **§0ab** (`:1757`) + `W4.md`'s **FIFTH** dated addendum (`:682`).

### `X.P.W4.g` — Opus. The checker learns the post-adjudication vocabulary; F-ab1 dies

*Sections*: `W4.md:682` (fifth addendum, the `.g` sentence) · COHESION `:1757–1775` (§0ab bullet 1) ·
§6 **G-1** (`W4.md:~300`) · §0p run-B procedure for the `DEFECT-LEDGER.md` append.
*Writable*: `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` ·
`<p2>/typescript/test/css-equivalence/run-full-surface.mjs` (**the measured path**; the addendum's
`css-totality` spelling names a file that does not exist) ·
`docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (modify-**append**, by the harvester through
the §0p run-B symlink only — the script's write, never a hand's) ·
`docs/tranches/X/parse-that/evidence/W4/**` as **NEW dated** files.
*Gates*: **G-1 `VERDICT: GREEN`, exit 0, double-run, at COMMITTED bytes**; the **three negative
controls printed RED** (a `PENDING` head with no adjudication row · an unretired subject binding
against an `identical` row · a disposition id not in the ledger).
*Locks*: parallel with `.h`, no shared modify path; `evidence/W4/**` is create-only with distinct
dated names. Commit families: value.js and `<p2>` are separate repos and take separate pathspec
commits; the checker cure and its negative-control evidence are one meaning and must not split.
*Inherits*: the killed seat's ` M seam-contract-check.mjs` (+177/−15, reads GREEN, **unreceipted**),
8 untracked `negctl-w4g-*` files, and `<p2>`'s incomplete ` M run-full-surface.mjs` (2/1, the `:60`
literal untouched). **Read whole, judged hunk by hunk against §0ab, kept only where it conforms.**

### `X.P.W4.h` — Opus. `!important` adjacency + the ident-token NAME

*Sections*: `W4.md:682` (the `.h` sentence) · COHESION `:1757–1790` (§0ab bullets 2–3) · §0s's quartet
law · css-syntax-3 **§5.4.7** (the `!important` tail) and **§5.4.4** (the declaration NAME).
*Writable*: `<p2>/typescript/src/css/**` **for the declaration production only** ·
`<p2>/typescript/test/css-totality/**` re-emission outputs as **NEW dated** files ·
`docs/tranches/X/parse-that/ADJUDICATION-W4.md` (dated addendum) ·
`docs/tranches/X/parse-that/SEAM-CONTRACT.md` (**only** the cells of the rows F-w4f-2 / F-w4f-1
touch) · `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` (modify-append: the F-w4f-1 row) ·
`evidence/W4/**` NEW dated files.
*Gates*: cells `#40` / `#41` re-measure **`identical`**; the full differential re-run reads **0
mirror-defects outside ruled ids**; the **W3 totality gate still TOTAL**.
*Locks*: parallel with `.g`; **§0s's quartet law** binds if a ctor row changes — the algebra tables,
**both** lowerings and `bounds.mjs` move in **one commit**, never split.

### `X.P.W4.f2` — fresh Fable adjudicator (M-23 §1). The stamp, or its withholding by id

*Sections*: `W4.md:682` (the `.f2` sentence) · `W4.md:678` (the third addendum's `.f` stamp set) ·
§6 **G-1..G-10**, with G-10 in **shape (a)** (F-w4c-1's scoped command) · §2 **R-A** · Q-RC-1 / Q-RC-2.
*Writable*: `waves/W0.md` `W1.md` `W2.md` `W3.md` `W4.md` — the five four-verb **`VERIFIED`** rows,
**one act, iff G-1..G-9 GREEN at its own re-run** · `docs/tranches/X/COHESION.md` §1 SS-5 cell + §5
board line (**only** under a performed stamp) · `waves/W4-CLOSE.md` (append a **dated §13**) ·
`RELEASE-PACKET.md` (dated addendum section) · `docs/tranches/V/coordination/INBOX.md` (mail rows) ·
`docs/tranches/V/megatranche/registry/harvest/x-p-w4s.json` (**fold/2 — the file EXISTS at 56673 B;
measure before writing, a blind create destroys banked evidence, E-3**) · `evidence/W4/**` NEW dated.
*Gates*: **G-1..G-10** at its own clock, every reading double-run; the **R-A stamp iff G-1..G-9
GREEN**, else **withheld by gate id**; G-10 moves **5 → 0** in shape (a).
*Locks*: strictly serial after `.g` **and** `.h`. **X.P.W4's CLOSED row is never rewritten.**

## Unit receipts

*(empty at open — each dispatched unit appends its own receipt below, SELF-COUNT LAW, quote-by-command.)*

### X.P.W4.g

SERVED MODEL: claude-opus-5[1m]

**Status: PARTIAL — both owned gates GREEN; one specified limb returned as ESC-W4g-1 because its
file is outside this unit's hard writable bound.** Spec executed: `W4.md:682` (FIFTH addendum, the
`.g` sentence) · COHESION `:1757–1775` (§0ab bullet 1, **E-w4f-1** and **F-ab1**) · `W4.md` §6
**G-1** · §0p's run-B append procedure.

#### Act 0 — CRASH-RECOVERY over this unit's writable set, before any other act

⟨cmd⟩ `git -C value.js status --porcelain` and ⟨cmd⟩ `git -C <p2> status --porcelain` at open. Inside
this unit's set, three inheritances from the killed seat (ESC-W4S-r3-2), **read whole and judged hunk
by hunk before a byte of mine moved**:

| inherited path | shape at open | judgement |
|---|---|---|
| `scripts/seam-contract-check.mjs` | ` M`, **+177/−15**, UNRECEIPTED | **KEPT WHOLE** — every hunk conforms to §0ab bullet 1; see the hunk table below |
| 8 × `evidence/W4/negctl-w4g-*` | untracked fixtures | **KEPT** — a complete fixture harness; verified by running it, not by reading it |
| `<p2>/…/run-full-surface.mjs` | ` M`, **2/1** — two imports only, the `:61` literal untouched | **KEPT and COMPLETED** — the two imports (`readFileSync`, `fileURLToPath`) are exactly what the measured cure needs |

Dirty paths **outside** the set — 13 value.js rows under `demo/**` · `e2e/**` · `CARRY-LEDGER.md` ·
four sibling `execution/**` records · `LEDGER.md` · `scripts/dev/dev.sh`, and `<p2>`'s `?? .worktrees/`
— were **not read for content, not staged, not stashed, not restored**. `scripts/dev/dev.sh` was never
touched.

**Nothing inherited was treated as done.** The checker was judged against the ruling and then
*measured*: the four fixture runs below are this seat's, not the killed seat's.

#### Act 1 — the checker learns the post-adjudication vocabulary (E-w4f-1)

The inherited diff, judged against §0ab bullet 1 hunk by hunk:

| hunk | what it does | ruling it implements | verdict |
|---|---|---|---|
| `existsSync` import | lets an ABSENT adjudication be a reading, not a crash | §0ab "G reads the adjudication" | conforms |
| `adjudicationPath = argv[5] ?? <beside the contract>` | a FOURTH argument, **optional** | keeps §6 G-1's three-argument command **unchanged** | conforms |
| `readRetirements()` | §10 rows whose first cell is a defined ledger id and whose remaining cells hold the standalone word `RETIRED` | check **E**: "a ledger row RETIRED in §10 does not bind its `subjects`" | conforms |
| `readAdjudication()` | `### §2.x` subsections of `## §2`; an entry is ruled when the subsection **names it in backticks, heading OR body** | check **G**: "a carried cell ruled in `ADJUDICATION-W4.md` is terminal" | conforms — and the body-reading is **load-bearing**: `§2.1` names its four entries in its first body sentence, so a heading-only reader would leave 4 of 6 unruled |
| check **E** split into `live` / `dead` | only LIVE rows contradict | §0ab | conforms — teeth unchanged for every live row |
| check **G** biconditional | PENDING → RED (ruled-and-ignored, or unruled); terminal-without-a-ruling → RED; a carried id missing from the cell → RED (the §0v rider's surviving arm) | §0ab | conforms — and it is what makes control A fire |
| the `POST-ADJUDICATION VOCABULARY` block + verdict wording | the two rulings the checker now reads are auditable **from its own output** | — | conforms |

**No contract, ledger or adjudication byte was touched** (E-3): ⟨cmd⟩ `git show --stat 31a9d5d8` names
11 paths, all in this unit's set, and `SEAM-CONTRACT.md` · `DIVERGENCE-LEDGER.md` ·
`ADJUDICATION-W4.md` are not among them.
#### Act 2 — the three negative controls, RUN (not asserted)

§0ab: *"Negative controls must still fire."* Four runs of the CURED checker over synthetic fixtures,
each negative contract being the base contract with **exactly one cell changed**, pasted verbatim at
`evidence/W4/negctl-w4g-runs-2026-09-19.md`:

| run | the one changed cell | verdict | exit | check fired |
|---|---|---|---|---|
| **0 — POSITIVE CONTROL** | (none) | **GREEN** | **0** | — |
| **A** | row 1 publishes `PENDING-ADJUDICATION`, adjudication fixture EMPTY | **RED** | **1** | **[G]** — *"alpha: carries GROUND-C×1, publishes PENDING-ADJUDICATION, and NO ADJUDICATION-W4.md §2.x rules it"* |
| **B** | row 3 publishes `identical` beside the **unretired** `NC-LIVE` | **RED** | **1** | **[E]** — *"gamma: disposition \"identical\" vs DIVERGENCE-LEDGER rows NC-LIVE"* |
| **C** | row 3's disposition names `NC-GHOST` | **RED** | **1** | **[F]** — *"gamma: unknown id `NC-GHOST`"* (and **[I]** beside it) |

Run B is the sharpest reading in the set: in the **same run**, row 2 publishes `identical` beside the
**RETIRED** `NC-DEAD` and is **not** reported, while row 3 beside the **LIVE** `NC-LIVE` is. The
ruling and its control, in one output. The positive control matters as much: without it a RED would
prove only that the fixtures are malformed.

#### Act 3 — F-ab1: the five-name literal dies (`<p2>`)

⟨cmd⟩ `sed -n '61p' …/run-full-surface.mjs` (BEFORE) →
`const candidateTypeNames = ["CssColor", "CssTimingFunction", "Stylesheet", "StyleRule", "Declaration"];`

That list is a **denominator**, not a label: `lib/ledger.mjs:244` derives `CN-3`'s subjects by
subtracting it from the frozen type universe. `.e` made the package re-export all 33 and the literal
did not move, so a measurement program published a narrowing the producer had closed — which is why
`.f` had to retire `CN-3` **by hand**.

**MEASURED-ANCHOR NOTE (recorded, per the method's drifted-anchor clause; the addendum is NOT
edited — E-3).** §0ab says "measured from `entry.mjs`'s exports". ⟨cmd⟩ `grep -n 'export type'
src/css/entry.mjs` → **no match**: `entry.mjs` is the RUNTIME entry and a `.mjs` module holds no type
export. The type re-export set the addendum means is the one the package's built entry ships beside
it — `src/css/build/ac1.d.ts`'s single `export type { … } from "./value-css-4.0.0.js"` clause
(emitted by `build.mjs:153`), which is what a consumer of `/css` actually resolves. **The INTENT —
measure, never type — is served at the true bytes; the name in the addendum is not.**

`measureCandidateTypeNames()` reads that clause and **throws** if it is absent or shapeless. The
report gains `candidateTypeReExports { source, measured, names }`; the printed reading gains a
`re-exports … MEASURED from …` line.

**BEFORE → AFTER, both MEASURED** (the BEFORE bytes were restored from `<p2>` `HEAD~1` into the same
path, run at the same pin and limit, and returned to `HEAD` immediately; `git -C <p2> status
--porcelain` → `?? .worktrees/` only). Bounded smoke run, `--limit 5`, double-run byte-identical,
exit 0 each — **this is not G-7**, which is `.f2`'s to re-run at full corpus:

| reading | BEFORE | AFTER |
|---|---|---|
| type re-export set | **5**, typed | **33**, read off `src/css/build/ac1.d.ts` |
| `rows` | 52 · COMPARED 24 · **NO-PEER 28** | 52 · **COMPARED 52 · NO-PEER 0** |
| `CN-3`'s derived subjects | **28** | **0** |
| NARROWING ledger ROWS | 3 | 3 — *unchanged, stated so* |

**Self-correction, recorded rather than overwritten**: a first draft of that table published
*NARROWING 4 → 3*. It was **typed, not read** — WRITE-THEN-MEASURE's own failure mode inside the
receipt for a defect about typed numbers. Caught by running the BEFORE bytes; re-measured ⟨cmd⟩
`narrowingRows({… realizedTypes: <5> vs <33>})` → `CN-1:0 CN-2:19 CN-3:28` and `CN-1:0 CN-2:19
CN-3:0`. The row COUNT never moved; the SUBJECT list did.
#### Act 4 — the `DEFECT-LEDGER.md` append, by the §0p run-B symlink only

The instrument, measured before it ran: ⟨cmd⟩ `shasum -a 256 …/harvest-journals.mjs` →
**`77a6e04c2067…`** — byte-for-byte the sha `.f` recorded; ⟨cmd⟩ `git log --oneline -1` → `c0078d96`;
⟨cmd⟩ `git status --porcelain -- …/workflows/` → **0 lines**. **Unmodified.**

**Run A (control)** — fresh mirror, script symlinked, ledger NOT symlinked: EXIT=**0**, *"harvested
3354 agent results · 7837 defects"*; ⟨cmd⟩ `ls <mirrorA>/…/harvest | wc -l` → **167** files, **the
F-e11 spillage contained in the mirror**; mirror ledger **120,340** lines.

**The write proven LOSS-FREE before it was allowed near the repo** (E-3): ⟨cmd⟩ `diff <repo> <mirrorA>`
→ `<` **1** · `>` **153**. The one removed line is the **census sentence** (`7813 defects` → `7837`);
**no defect row is removed**.

**Run B** — a SECOND fresh mirror with `DEFECT-LEDGER.md` symlinked into the repo, so the write is
**the script's, through the symlink, never a hand's**:

| reading | BEFORE | AFTER |
|---|---|---|
| sha256 | `54fd8c713e964a30…` | **`9573d226530f131a…`** |
| bytes | 10,560,195 | **10,561,092** |
| lines | 120,188 | **120,340** |

⟨cmd⟩ `diff -q <mirrorA ledger> <repo ledger>` → **silent — run A ≡ run B, byte-identical**.
⟨cmd⟩ `git diff --numstat` → **`153  1`**, the figure the loss-free check predicted.
⟨cmd⟩ `git status --porcelain -- …/registry/` → **exactly one line**, the ledger: **the 167 JSONs
stayed in mirror B.** `.f` left this append as a residual because the registry row was in no grant of
its unit; it is in this one, and it is discharged.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (this wave's third-sitting baseline, re-read at this seat) | AFTER (this seat, at COMMITTED bytes, double-run) | verdict |
|---|---|---|---|
| **G-1** | **RED** — `[E] 37 · [G] 6`; census `identical 45 · declared-divergence 7`, ∅/∅ | ⟨cmd⟩ `node …/seam-contract-check.mjs …SEAM-CONTRACT.md …universe-52.json …DIVERGENCE-LEDGER.md` → **`VERDICT: GREEN`**, **EXIT=0** on both runs, ⟨cmd⟩ `diff -q run1 run2` **silent** | **GREEN** |
| **three negative controls** | not run (the fixtures existed, unreceipted) | **A · B · C all RED, exit 1 each**, one named check apiece; positive control **GREEN exit 0** | **GREEN (all three fire)** |

The G-1 AFTER reading is pasted whole at `evidence/W4/g1-after-w4g-2026-09-19.txt`; the census is
unmoved (`contract 52 · universe 52 · ledger rows 47`, `identical 45 · declared-divergence 7`, both
set-differences ∅). **The cure removed two FALSE readings and no TRUE one** — that is the whole of
E-w4f-1.

Re-run a final time after Act 4 moved `DEFECT-LEDGER.md` (a different file from `DIVERGENCE-LEDGER.md`,
but re-measured rather than assumed): **GREEN, exit 0, twice, identical.**

**G-2, measured over this unit's own commits**: ⟨cmd⟩ `git show --name-only --format= 31a9d5d8
c1c8d775 c7d7b768 | grep -cE '^(src|demo|api|test|e2e)/'` → **0**.
#### Commits — pathspec on the commit itself, four tracks sharing one index

| repo | hash | meaning | paths |
|---|---|---|---|
| value.js | **`31a9d5d8`** | the checker cure **and** its negative-control fixtures + runs — **one meaning, not split**, as the locks require | 11 (`seam-contract-check.mjs` + 10 `evidence/W4/**`) |
| `<p2>` | **`ba4d148`** | F-ab1 — the measured re-export set | 1 (`test/css-equivalence/run-full-surface.mjs`) |
| value.js | **`c1c8d775`** | F-ab1's evidence + **ESC-W4g-1** stated at the bytes | 1 |
| value.js | **`c7d7b768`** | the §0p run-B append + its evidence | 2 |

value.js and `<p2>` took **separate** pathspec commits, as the locks require. Every commit carried
its own `-- <the same exact paths>`; ⟨cmd⟩ `git show --stat` on each names **only** this unit's
writable set — no sibling seat's staged bytes were swept in, and no sibling's paths were reset or
unstaged. `scripts/dev/dev.sh` never entered a command.

#### Residuals and escalations

**ESC-W4g-1 — F-ab1's SECOND limb, returned unlanded (File Bounds).** §0ab: *"the emitter's carry
gains `§10` so a regeneration never drops the retirements."* **Measured**: the carry is **not** in
`run-full-surface.mjs`. It is `<p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs:169`
(`const carryPath = CANONICAL_LEDGER_PATH`), and its block is bounded at `"\n### §6."` and the next
level-2 heading — **`§6` and nothing else**. `§10` (⟨cmd⟩ `grep -n '^## §10' DIVERGENCE-LEDGER.md` →
**1084**, `.f`'s hand-written retirements) would be dropped by a regeneration exactly as `.e`'s `§6`
block once was (F-e7). **`emit-divergence-ledger.mjs` is not in this unit's writable set** — the set
names one `<p2>` path — so the write was **refused, not improvised**: no local patch, no second
carry bolted onto the wrong file, no "while I'm here". The cure is specified in full at
`evidence/W4/fab1-w4g-reexport-measured-2026-09-19.md` so the granting seat spends no measurement on
it: *the single carried block becomes a carried LIST — slice from each of `"\n### §6."` and
`"\n## §10"` to the next level-2 heading and emit each under its own preamble, in document order; the
acceptance test is the idempotence check that caught the 47→286→525 growth, plus `§10`'s rows
surviving both emissions.*
**Consequence, stated so it is not mistaken for a gate failure**: no regeneration is ordered, the
ledger stands (E-3), and **G-1 reads GREEN over the ledger's committed bytes with `§10` present**.
ESC-W4g-1 is a DURABILITY defect against a future regeneration, **not a live RED**, and it blocks
neither `.h` nor `.f2`.

**R-1 — the harvester's malformed rows, NOT hand-cured.** ⟨cmd⟩ `git diff --check | grep -c 'trailing
whitespace'` → **48** added lines, every one of the shape ``### `` ·  · `` + `**Defect.** ` — rows
emitted from result records whose id, severity and file are empty. **F-e11's own family.** Left
exactly as the script wrote it, because §0ab grants this file to the harvester's write and to nothing
else; a hand's tidy here would be the substitution the ruling forbids. Owner: **X-W11's HARVEST
(§0k HG-7)**, beside F-e11 / K.7(i).

**R-2 — `LEDGER.md`: the withholding ENDED between this wave's open and this unit's close, and the
event line is still not this unit's to write.** This record's open withheld the X.P.W4S event line a
fourth time because `LEDGER.md` carried a sibling Track-A seat's uncommitted `X-W9` hunks (2/1). At
this unit's close ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/LEDGER.md` → **0 lines**:
Track F's close seat landed it at `72735922` (*"the event line withheld by four consecutive resume
seats finally lands on a clean ledger"*). So the obstruction is gone — but **`LEDGER.md` is not in
this unit's writable set**, which names four paths and does not include it. This unit therefore does
**not** write it, and says so rather than taking the opening: the next seat holding that grant
(`.f2`, whose plan carries the close acts) finds a clean ledger and an X.P.W4S row that is still
TRUE, since the wave remains OPEN in RESUME MODE with `.g` landed and `.h` ∥ `.f2` owed.

**Carried, untouched and not this unit's**: `.h`'s two cells (`#40` / `#41`) and the F-w4f-1 candidate
half; `.f2`'s stamp, still withheld by gate id. **G-1 is no longer one of the ids withholding it.**

**E13 mail — swept at THIS unit's clock, read-only, not cited.** Four paths: `docs/tranches/V/`
**10** depth-1 `.md` ⊕ `V/coordination/` **24** entries · ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1`
→ **`BK/`** still newest, **9** entries · `../keyframes.js/docs/tranches/V/coordination/` **13** ·
`../sci-report/atlas/docs/tranches/P/coordination/` **28**. ⟨cmd⟩ `find <the four paths> -maxdepth 1
-type f -name '*.md' -newermt "2026-09-19 12:00"` → **no member**: nothing inbound since `.f` closed.
**Status-cell census, positional**: ⟨cmd⟩ `awk -F'|' '/^\| *[IO]-[0-9]+ *\|/ {rows++; s=$6;
sub(/^[ *]+/,"",s); if (s ~ /^UNREAD/) u++} END {print "ROWS="rows, "UNREAD="u+0}' INBOX.md` →
**`ROWS=77 UNREAD=0`** — identical to this sitting's open. (`.f`'s close receipt records `ROWS=81`
under the same command; this seat reports only what it measured, and the difference is noted rather
than reconciled by assertion, since the arithmetic that matters — **UNREAD=0** — agrees in both.)
**0 unrowed letters addressed to value.js · 0 UNREAD in scope · no `I-n` minted.** This unit wrote no
`INBOX.md` byte: ⟨cmd⟩ `git status --porcelain -- docs/tranches/V/coordination/INBOX.md` → **0 lines**.

### X.P.W4.h

**SERVED MODEL**: `claude-opus-5[1m]` · unit `X.P.W4.h` (the `!important` adjacency + the ident-token
NAME) · 2026-09-19 · **DONE**. Spec: COHESION §0ab bullets 2–3 (`COHESION.md:1776–1790`) ·
`waves/W4.md` FIFTH dated addendum, `.h` clause (`:682`) · `ADJUDICATION-W4.md` §6 rows F-w4f-2 /
F-w4f-1 and cells `#40` / `#41` · css-syntax-3 §5.4.7 and §5.4.4 · COHESION §0s's quartet law.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain`
→ 25 rows, **none in this unit's writable set** (`demo/**`, `e2e/**`, `CARRY-LEDGER.md`, two
sibling-track execution records, the unowned `scripts/dev/dev.sh`, and `.g`'s own
`scripts/seam-contract-check.mjs` + eight `evidence/W4/negctl-w4g-*` files — a SIBLING's, read and
never touched). ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 status
--porcelain` → `M typescript/test/css-equivalence/run-full-surface.mjs` (again `.g`'s, F-ab1) and
`?? .worktrees/`. **This unit inherited nothing**: `<p2>/typescript/src/css/**`,
`<p2>/typescript/test/css-totality/**`, `ADJUDICATION-W4.md`, `SEAM-CONTRACT.md`,
`DIVERGENCE-LEDGER.md` and this unit's `evidence/W4/**` basenames were all clean. Nothing stashed,
nothing restored, nothing reset; `dev.sh` never staged.

#### Acts, in order

**A-1 — the born-RED reproduced at this seat, then the ROOT CAUSE found one production deeper.**
⟨cmd⟩ an import of the candidate's own `entry.mjs` (nothing written) → `#40` REJECT · `#41` REJECT ·
`b { color: red !important }` ACCEPT · `b { color: red!important }` REJECT · `a { col!r: red }`
ACCEPT — §0ab's born-RED, confirmed. The defect is **not** in `important()`: its leading `WS()` is
already `0..∞`. ⟨cmd⟩ `js.parseCssValue("red!important")` →
`REJECT … expected ["<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or the end of
input)","<open-paren>"] actual "!important"` — **the VALUE TOKEN's boundary** eats the `!`, because
`!` was a `token-char`. 4.0.0 cannot meet that byte at all: it strips `/!important\s*$/i` off the
PART before `parseCssValue` tokenizes anything.

**A-2 — F-w4f-2's cure, and the guard that keeps it honest.** `algebra/tables.mjs`: `token-char`
widens its exclusion set by `!` (the X.P.W3.j brace precedent, same argument); a new `bang` class
(`since: "X.P.W4.h"`, label `'!'` — deduped, **no L index moves**, K-10); `LATER_UNITS` and
`UNIT_SITE_LABELS` gain the unit with an empty site list. `algebra/grammar/value.mjs`: `ITEM_SEP` =
`ALT(WS1(), NOT_BANG())` replaces the bare `WS()` separator of **both** space groups — an item is
admitted after at least one whitespace (any item, `!=` included) or with no whitespace and no `!` at
the cursor, which is the incumbent splitter's own rule (`red!= blue` is ONE token there and a
refusal). `algebra/grammar.mjs`: `WS1` joins the value grammar's notations. **Measured against
4.0.0, both lowerings**: `red != blue` ACCEPT · `red!= blue` REJECT · `red!=` REJECT · `red !=`
ACCEPT · `red,!=` ACCEPT · `red/!=` ACCEPT · `rgb(1!= 2)` REJECT — **0 of 6+ differ**; the corpus
carries **0** rows with a token-abutting `!=` at 27,021, so the guard is proved by control, not by
the corpus's silence.

**A-3 — F-w4f-1's candidate half.** `algebra/tables.mjs`: `decl-name` narrows from "every byte but
`:` `;` `{` `}`" to the `ident` continuation set (label unchanged — L does not move).
`algebra/grammar/stylesheet.mjs`: `declName()` = `SEQ(NO_LEADING_DIGIT(), TEXT("decl-name", 1, INF))`
and an explicit `WS()` before `TOK(":")` (§5.4.4's optional whitespace, which used to ride inside the
name run). Both declaration arms read it. **`a { col!r: red }` · `a { !color: red }` ·
`a { color!: red }` · `a { 1color: red }` REJECT in both lowerings; `a { color: red }` ·
`a { --brand: red }` · `a { color : red }` · `a { animation: a 1s }` · `@keyframes s { from { color:
red } }` ACCEPT, identical to 4.0.0.**

**§0s's QUARTET LAW — NOT TRIGGERED, and that is a measurement.** No `R_ctor` row moved: `declaration`
keeps `arity: 3` and `leafMap: ["name","value","important"]`, `animation-property` keeps its own, and
both new grammar pieces are `DROP`ped zero-width assertions that contribute no leaf. Neither
lowering's constructor table nor `bounds.mjs` was opened. Both lowerings inherit the cure because
both instantiate the one grammar over the one class table (the Wasm module is assembled at runtime
from those tables), and every probe above reads js and wasm separately and finds them equal.

**A-4 — the documents, exactly the four cells the spec names.** `ADJUDICATION-W4.md` gains a dated
addendum §11 (F-w4f-2 cured, with the mechanism and the cure table) · §12 (F-w4f-1's candidate half,
the consumer direction, the census movement, and the residual named with its owner) · §13 (the three
gates as read) — **nothing above the addendum is edited** (E-3). `SEAM-CONTRACT.md` row 19
(`parseStylesheet`) moves **only** the two rulings' cells: the disposition cell drops
`candidate-defect ×2 (F-w4f-2 …)` and gains `` `F-w4f-1` `` to its declared-divergence id list; the
F-w4f-2 passage becomes the cured reading; the F-w4f-1 passage becomes a divergence with its
direction. No other row, no other cell. `DIVERGENCE-LEDGER.md` is **appended** with §11 (the
`F-w4f-1` row, its measurement at the pin, the L-14 amendment of `ID-1b`'s `candidate` field, and
§11.4 recording that F-w4f-2 opens no row because it is a repaired candidate defect).

**A-5 — evidence, all NEW dated files beside W3's (E-3; nothing under `evidence/W3/**` touched).**
`evidence/W4/two-cell-census-2026-09-19-w4h.mjs` (the emitter; 20 rows — the two cells plus the
controls the ruling turns on) · `…-w4h.txt` · `…-w4h.json` ·
`evidence/W4/differential-full-surface-2026-09-19-w4h.txt` ·
`evidence/W4/universe-totality-2026-09-19-w4h.txt`. The census computes `identical` through
`ruledValue` — the same resolver `lib/differential.mjs` compares through — and prints the RAW
column beside it, so `#41`'s one raw delta (`GROUND-C`'s clamp) is published rather than smoothed.

#### Gate readings — BEFORE → AFTER (every reading double-run at this seat's clock)

| gate | BEFORE (this seat's own open probe / the banked W3 artefact) | AFTER | verdict |
|---|---|---|---|
| cells `#40` / `#41` re-measure `identical` | `#40` **REJECT**, `#41` **REJECT** (both lowerings); `ADJUDICATION-W4 §10.1` carries both as *"mirror-defect until F-w4f-2 is cured"* | **`#40 identical · #41 identical`** — `cells #40/#41: #40 identical · #41 identical · rows 20 · identical 16 · declared-divergence 4 · lowerings disagree 0` | **GREEN** |
| the full differential reads **0 mirror-defects OUTSIDE ruled ids** | banked `evidence/W3/equivalence-full-surface.json` `tally.mirrorDefects` **44**, `parseStylesheet` **16** | `MIRROR-DEFECTS 152` · **`RULING-ID 152 of 152 miss entries carry a rulingId from {ID-3 · ID-1b · ID-4 · ID-5 · GROUND-C · ID-2 · ID-1 · PB-11 · R-f1 · E-k2} · NOT IN THE SET 0`** | **GREEN** |
| the W3 totality gate still **TOTAL** | banked `universe-52.json` tally `{"TOTAL":46,"PARTIAL":6,"ABSENT":0}` | `tally runtime 13 TOTAL / 6 PARTIAL / 0 ABSENT · types 33 / 0 / 0 · **ALL 46 of 52 TOTAL**` — the **same six** PARTIAL rows, line for line | **GREEN (UNMOVED)** |

⟨cmd⟩ `node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca86020b6b2605e7d0f04fccb6601746e387f7`
(run 1 and run 2) → ⟨cmd⟩ `diff final-diff-1.txt final-diff-2.txt` → **the node PID inside the
`MODULE_TYPELESS_PACKAGE_JSON` warning line, and nothing else**.
⟨cmd⟩ `node scripts/css-universe.mjs --check --pinned-value-commit 6aca8602…` (run 1 and run 2) →
⟨cmd⟩ `diff -q` → **IDENTICAL**. ⟨cmd⟩ the census emitter, twice → ⟨cmd⟩ `diff -q` → **IDENTICAL**.
Each figure published above is read from the settled bytes of those files.

**The class census, read at the same clock** (`universe-totality-…-w4h.txt`): `8 residual
predicates · 152 cells carried BY ID · **0 cells NOT attributed to a ruling id** · **0 census OVER
its pinned population** · **0 population drifted from its pin**` — `ID-1b` 117 ≤ 534, `ID-4` 5 ≤
1172, `GROUND-C` 29 ≤ 1069, `ID-2` 1 ≤ 45.

#### Regression sweep (this unit moved a shipped grammar, so the suites were read, not assumed)

⟨cmd⟩ `npx vitest run --config test/css-totality/vitest.config.ts` → **`Test Files 3 passed (3) ·
Tests 80 passed (80)`**, with `universe.test.ts`'s own line `G-1 reading: runtime 13/6/0 · types
33/0/0 · 46 of 52 TOTAL`. ⟨cmd⟩ `npx vitest run` (the repository root config) → `4 failed | 10
passed (14)`, **all four pre-existing and unrelated to `src/css/**`**: `ENOENT … '../data/json/
data-l.json'` and the CSV fixture beside it (`test/json.test.ts`, `test/csv.test.ts`,
`test/validate-parsers.test.ts`, `test/verify-parse-output.test.ts` — the parse-that library's own
data files, absent from this tree). ⟨cmd⟩ `npx vitest run --config test/css-equivalence/
vitest.config.ts` → `1 failed (1) · 4 failed | 24 passed (28)`; **two of the four are the W3-era
expectations the corpus outgrew before this unit existed** (`expected 27021 to be 26604`;
`expected +0 to be 172`), one is **G-7's declared inherited-RED floor** (its own message: *"The floor
was GREEN at 403-string pilot scale and is inherited as a FLOOR, not as a pass"*), and the fourth is
this unit's own R-2 below, stated there by number.

#### Commits (pathspec ON the commit, four tracks sharing one index)

| repo | commit | paths |
|---|---|---|
| `<p2>` | **`fede7d3`** — *fix(css/algebra): the declaration production reads css-syntax-3 §5.4.7 and §5.4.4 — X.P.W4.h (F-w4f-2 · F-w4f-1)* | `typescript/src/css/algebra/{grammar.mjs, tables.mjs, grammar/value.mjs, grammar/stylesheet.mjs}` |
| `value.js` | **`e31b8450`** — *docs(X·P/w4.h): F-w4f-2 DISCHARGED and F-w4f-1 FILED — the two seam cells move, the ledger gains §11, the census and both gate readings are banked as new dated evidence* | `ADJUDICATION-W4.md` · `SEAM-CONTRACT.md` · `DIVERGENCE-LEDGER.md` · the five `evidence/W4/…-w4h.*` files |

**One commit per meaning, and the grammar commit is ONE because its two rulings are one production's
cure over the same four files** — `tables.mjs` and `stylesheet.mjs` each carry a hunk of both, and
splitting them would need an interactive hunk stage this environment does not have. `git add -A` /
`-u` were never used, nothing another seat had staged was swept in, `dev.sh` was never staged, and
`.g`'s dirty `run-full-surface.mjs` and `negctl-w4g-*` files were left exactly as found.

#### Residuals and escalations

**R-1 (returned by id to the adjudicator — `X.P.W4.f2`, NOT an escalation of this unit's gates).**
The differential now reads **`ADJUDICATION_UNHONOURED 27`** at `parseStylesheet` (js and wasm alike;
**0** before this cure), and **`DIVERGENT_VALUE` 2 → 7**. Every one of the 27 is one shape: a source
a REPAIR CLASS governs for its COLOUR (`expect: "accept"` — `PB-04/05`, `PB-01/02`) that ALSO carries
a rule whose declaration NAME is not an `<ident-token>`; the class was adjudicated while that NAME
was SHARED by both engines, and it is not any more. `outsideEveryClass`'s guard exists for exactly
this — *"The guard NEVER excuses a cell: it withholds the RULING"* — and its one surviving clause
reaches only `!` forms, not `colo.r` or `backgrou(d-color`. Extending it, and retagging the residual
class from `ID-1b` to `F-w4f-1`, would move both the CLASSES' **pinned measured populations** and
`RULING_IDS` — the §0w id-set printed in the IMMUTABLE banked `evidence/W3/universe-52.json`.
`test/css-totality/lib/adjudications.mjs` **is** the adjudicated registry in code, which **E-3 holds
immutable**; corrections are dated addenda-beside, which is what `ADJUDICATION-W4.md` §12 now is.
**This seat did not open that file.** The five new `DIVERGENT_VALUE` cells are NOT a residual: each
is a style body opening with a COMMENT, which 4.0.0 reads as the declaration NAME and the candidate
now reads as trivia — X.P.W3.l's F-k3 family closed from the other side, candidate correct.

**R-2 (for the emitter's owner).** `DIVERGENCE-LEDGER.md` is generated, and its F-e7 carry lifts
`### §6.x` subsections only. A regeneration must re-append **§10** (`.f`'s) **and §11** (this
unit's), or both rulings' rows are lost.

**R-3 (stated, not cured).** `a { color: red ! important }` and `a { color: red! important }` stay
REJECT in both engines — 4.0.0 refuses the gap (measured) and SH-3 closed it deliberately at
X.P.W3.l. css-syntax-3 §5.4.7 reads the pair off the last two NON-whitespace tokens and would admit
the gap; opening it would make the candidate ACCEPT where 4.0.0 rejects, i.e. **a new unruled
divergence §0ab does not authorise**. Returned as an observation, by id, to whoever rules the seam's
whitespace posture; `#40`, `#41` and `color: red!important` — the three the spec names — all accept.

**Escalations: none.** All three gates this unit owed read GREEN at this seat's clock, double-run,
and every byte written lies inside the unit's writable set.

### X.P.W4.f2

**SERVED MODEL**: `claude-fable-5-1` · **FRESH** (M-23 §1 — this seat authored no cure byte of `.e`,
`.e2`, `.f`, `.g` or `.h`) · **status**: **ESCALATED** (every in-bounds act performed; the R-A stamp
**WITHHELD by gate id G-1** a THIRD time, now on `DIVERGENCE-LEDGER.md` §11's form — E-w4f2-1, a file
outside this unit's grant) · 2026-09-19 (UTC 2026-09-20 03:38–03:50). Spec: `W4.md:682` (the `.f2`
sentence) · `:678` (the `.f` stamp set, G-10 shape (a)) · §6 G-1..G-10 · §2 R-A · Q-RC-1 / Q-RC-2 ·
COHESION §0y · §0ab.

**CRASH-RECOVERY, first act.** ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that
docs/tranches/X/COHESION.md docs/tranches/V/coordination/INBOX.md …/harvest/x-p-w4s.json
docs/tranches/X/execution/D/X-P-W4S.md` → **0 lines**; ⟨cmd⟩ `git -C <p2> status --porcelain` →
`?? .worktrees/` only. **Zero inherited edits.** The tree's other dirty rows (13 × `demo/**` + `e2e/**`
+ `CARRY-LEDGER.md` + sibling `execution/{A,B,C}/**` records + the unowned `scripts/dev/dev.sh`) are
outside every row of this set and were not read for content, staged, stashed or restored; a sibling's
staged `D demo/shell/PaneSegmentedControl.vue` was left exactly as found (it is still staged, and no
commit of this seat carries it). The serial lock read at the bytes: `.g` `31a9d5d8` and `.h`
`e31b8450`/`fede7d3` both landed (PA-2 of the open is discharged). `x-p-w4s.json` measured **56673 B**,
schema `x-p-w4s.f.harvest-fold/1`, before any write (E-3).

#### Acts, in order

**A-1 · The ten gates BEFORE any write, at this seat's clock, every reading double-run** (both writing
scripts given `--out` into the scratchpad; long runs backgrounded per the STALL WATCHDOG; raw outputs
banked afterwards as NEW dated files, `evidence/W4/gates-w4f2-2026-09-19.md` + 7). The table is
`W4-CLOSE.md` §13.1, reproduced by verdict: **G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 GREEN;
G-1 RED; G-10 open-state 5 (RED, withheld).** The readings that moved since the third sitting's
close: G-3's tarball sha `f8aede11…` → **`004bbcce…`** (`fede7d3` changed the packed grammar bytes;
still `resolved 52 of 52`, `G3 GREEN`, EXIT=0 ×2); G-1 **RED for a NEW reason** — ⟨cmd⟩
`seam-contract-check.mjs …` → `ledger rows 48`, ∅/∅, census `identical 45 · declared-divergence 7`,
§10's three retirements read (37 bindings released), the 6 carried rows terminal by §2 —
**`VERDICT: RED — 2 check(s) failed`: [F] `parseStylesheet: unknown id F-w4f-1` · [J] `§11.4
F-w4f-2`**, EXIT=1, `diff -q run1 run2` silent. G-4 `ac1.wasm` `f0d063d6…` unchanged since `93bcb83`
(the module is assembled at runtime from the class tables `.h` moved). G-5 `RC-P(4.0.0) = FALSE — 3 of
6` (1 · 3 at 20,962 · 4), EXIT=1 ×2, plus the negative control `0.0.0-does-not-exist` → conjuncts 1–4
`MEASURED: NO`. G-8 `ROWS=77 UNREAD=0` ×2 before this seat's row.

**A-2 · L-14 — refutation attempted on the RED before it was recorded.** Is G-1 the checker's fault
again (E-w4f-1's shape)? ⟨cmd⟩ `grep -n '/\^### ' seam-contract-check.mjs` → `:112
line.match(/^### (.+?) — /)` — the standing row grammar, obeyed by all 47 `§6` rows and by `.f`'s
`#### §10.x` (dropped one level for exactly this reason, `.f`'s receipt A-2). ⟨cmd⟩ `grep -n '^### '
DIVERGENCE-LEDGER.md | sed -n '/§11/,$p'` → `### §11.1 The row` (no ` — `: the `F-w4f-1` table under it
is invisible to the reader, so row 19's `` `F-w4f-1` `` is an unknown id — **[F]**) and `### §11.4
F-w4f-2 — DISCHARGED …` (matches: a phantom row that names no export and is not in the contract's
`SURFACE-WIDE` block — **[J]**). **The RED is the ledger's form, not the checker's vocabulary**; `.g`'s
cure and its three measured-RED controls stand. Widening the reader to parse §11.1's table would be a
second row grammar minted to pass one gate — REFUSED (a masking cure). The other two central claims:
**no value.js byte moved** — ⟨cmd⟩ `git show --name-only --format=` over every X.P.W4S commit
(`93bcb83` … `d357aad9`, and this seat's) → **0** paths under `src/demo/api/test/e2e`; **RC-P is
unarguable** — the evaluator's negative control leaves no conjunct TRUE unmeasured, and arm V reads
`V`'s own bytes (Q-RC-1); Q-RC-2 unchanged (*"FALSE, not vacuously true"*).

**A-3 · The stamp — WITHHELD by gate id G-1; the carves not performed.** §6 G-10's falsifier and
COHESION §0y/§0ab bind. ⟨cmd⟩ the shape-(a) sum after every write of this seat → **5 ≡ 5**; ⟨cmd⟩
`git status --porcelain -- waves/W[0-4].md docs/tranches/X/COHESION.md` → **0 lines** — no four-verb
row and no COHESION cell was written. Both or neither: neither. X.P.W4's CLOSED row untouched.

**A-4 · Adjudicative rulings recorded** (`ADJUDICATION-W4.md` is in no row of this grant; the rulings
live in `W4-CLOSE.md` §13.3, dated): `.h`'s **R-1** — the 27 `ADJUDICATION_UNHONOURED` cells at
`parseStylesheet` are **RULED candidate correct, `declared-divergence`, NARROWS**: mechanism
`F-w4f-1`, census id `ID-1b` (the resolver's residual predicate names `nonIdentDeclarationName`, so
all 27 sit inside the §0w set and `.h`'s `NOT IN THE SET 0` stands); retagging in `adjudications.mjs`
or the banked `universe-52.json` is **REFUSED** (E-3). `.h`'s **R-3** (`red ! important`) — shared
REJECT, no cell, no act. `.g`'s **ESC-W4g-1** — durability, not a live RED; owner unchanged.

**A-5 · The close artefacts.** `waves/W4-CLOSE.md` **§13** appended (13.1 gates · 13.2 why the reason
moved · 13.3 rulings · 13.4 the withheld stamp + E-w4f2-1's cure · 13.5 residuals with owners);
`RELEASE-PACKET.md` **second dated addendum** (F-w4f-2 CURED, F-w4f-1 FILED with its consumer
direction, the packed candidate's new sha, RC-P re-read — §6 items 1, 2, 4, 5 unchanged, asks nothing);
`INBOX.md` **O-42** inserted by line directly after O-41 (the producer-cure relay, same recipients,
delivery point in THIS repo, SS-6 batch named, **SENT — no reply owed**, O-15 not converted); ⟨cmd⟩
the positional Status-cell awk after the row → **`ROWS=78 UNREAD=0`** ×2; `RELEASE-PACKET` 3 · `RC-P`
3 · `SS-6` 29; ⟨cmd⟩ `git diff --check` over every written path → clean.

**A-6 · The harvest — `x-p-w4s.json` fold/2 (§0p scratch-mirror, by program).** ⟨cmd⟩ `shasum -a 256
harvest-journals.mjs` → `77a6e04c…` (unmodified; `git status --porcelain -- workflows/` → 0). Run in
**two** fresh mirrors with the script symlinked and `DEFECT-LEDGER.md` NOT symlinked → EXIT=0 each,
`3363 agent results · 7847 defects`, 167 files per mirror, **nothing written under the repo**. The four
X.P.W4S run files sha256-equal across A and B: `wf_a25d7c23-90d` (8 results, `9c84cbb5…`, 28313 B —
`.e` at index 6), `wf_7afdc968-28c` (7, `d557c966…`, 17412 B — `.e2` at index 6; **`.f`'s row ABSENT**,
the file byte-identical to fold/1's embedding), `wf_3c0a3280-0ce` (6, `fc0ce2b8…`, 10089 B — the third
sitting, zero unit rows), `wf_d0a271b1-356` (8, `ebb4bd6f…`, 23432 B — `.g` PARTIAL at index 6, `.h`
DONE at index 7). Written as **fold/2** with the predecessor fold/1 embedded **whole and verbatim**
(`predecessor.document`, sha256 `bd09f39d…`, 56673 B, commit `e456c2ff`) and all four run files
embedded as the harvester wrote them: **147196 B**; **seatCount 4 of 6 — RED under L-13's letter**
(`.f` returned ESCALATED at `3d4470f2` but its journal never carried a result row — a
journal/harvester finding for X-W11's HARVEST beside F-e11; `.f2` structurally absent, W0 R-3 / W1 R-3
/ ESC-e2 reproduced). The `DEFECT-LEDGER.md` append for `.g`/`.h`'s rows is **not written** —
`registry/DEFECT-LEDGER.md` is in no row of this grant (residual, owner named in §13.5).

**A-7 · E13, four paths at this seat's clock.** `docs/tranches/V/` **10** depth-1 ⊕ `V/coordination/`
**24** · ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → **`BK/`**, **9** entries, newest
`glass-outbound-2026-09-18-valuejs-o26-reply.md` = I-35 (rowed) · keyframes.js **13**, newest by mtime
`INBOUND-LEDGER.md` (no new letter) · atlas **28** UNMOVED. ⟨cmd⟩ `find <the four paths> -maxdepth 1
-type f -name '*.md' -newermt "2026-09-19 12:00" | grep -v INBOX.md` → **no member**. **0 unrowed
letters addressed to value.js · 0 UNREAD (78 rows) · one row minted (O-42).**

#### Gate readings — BEFORE → AFTER (this seat's own commands, every reading double-run)

| gate | BEFORE (A-1, pre-write) | AFTER (post-write, re-run) | verdict |
|---|---|---|---|
| **G-1** | **RED — [F] 1 · [J] 1** (the ledger's §11 form) | unchanged — no ledger byte is this seat's to move | **RED (E-w4f2-1)** |
| **G-2** | 13 foreign `demo/**`+`e2e/**` lines; 0 wave-commit paths | ⟨cmd⟩ `git show --name-only --format= a6e94149 c1fe075f \| grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0** | **GREEN for X·P** |
| **G-3** | `52 of 52` · `G3 GREEN` · sha `004bbcce…` · EXIT=0 ×2 | unchanged (no `<p2>` byte moved) | **GREEN** |
| **G-4** | GREEN, `f0d063d6…`, 0/0 | unchanged | **GREEN** |
| **G-5** | honestly FALSE, 3 of 6, arm V 20,962; negative control clean | unchanged | **GREEN** |
| **G-6** | 25 | 25 | **GREEN** |
| **G-7** | 0 / 0 | 0 / 0 | **GREEN — floor held** |
| **G-8** | packet 26645 B · 0 UNREAD / 77 | packet + second addendum (28768 B) · O-42 · **0 UNREAD / 78** | **GREEN** |
| **G-9** | (C) recorded | unchanged; 0 paths under `docs/tranches/X/waves/` in this seat's commits | **GREEN** |
| **G-10** (a) | 5 | 5 — the act **not performed**, withheld by gate id G-1 | **RED (withheld)** |

#### Commits (pathspec on the commit itself; `dev.sh` never staged; the sibling's staged `D demo/shell/PaneSegmentedControl.vue` left exactly as found)

| repo | hash | meaning |
|---|---|---|
| value.js | **`a6e94149`** | `docs(x-p-w4.f2/evidence)` — eight NEW dated files under `evidence/W4/` (the gate receipt, G-1's output, G-3 ×2, G-4, G-5 json+txt, G-5's negative control) |
| value.js | **`c1fe075f`** | `docs(x-p-w4.f2/close)` — `waves/W4-CLOSE.md` §13 · `RELEASE-PACKET.md` second addendum · `INBOX.md` O-42 · `harvest/x-p-w4s.json` fold/2. The §9 `.d` family's stamp members (five VERIFIED rows, two COHESION cells) are absent **because the act was withheld**, not because the family was split |
| value.js | *this receipt* | `docs(x-p-w4.f2)` — this section, inserted under `## Unit receipts` |

No `<p2>` commit: this seat wrote no byte there. `LEDGER.md` is clean at this seat and in no row of
this grant — not written; the X.P.W4S row stays TRUE.

#### Residuals and escalations

- **E-w4f2-1 (ESCALATION — the reason this unit is not DONE).** `DIVERGENCE-LEDGER.md` §11 (`.h`,
  `e31b8450`) is not in the checker's row grammar: `### §11.4 F-w4f-2 — …` mints a phantom row ([J]);
  the `F-w4f-1` row is a table under `### §11.1 The row` and so has no reader-visible id ([F]). Cure,
  for the triumvirate, at that file: (a) `### §11.4` → `#### §11.4`; (b) render `F-w4f-1` as
  `### F-w4f-1 — a declaration NAME that is not one <ident-token>` with the `| field | value |` table
  (content lifted from §11.1), in place or as a dated §12 beside. Then G-1 re-runs; a further FRESH seat
  stamps iff G-1..G-9 GREEN. Until then the R-A stamp stays **WITHHELD by gate id G-1** and both
  COHESION carves unperformed.
- **L-13 4 of 6** · **DEFECT-LEDGER append not written** · **`LEDGER.md` not this unit's** — each with
  its owner in `W4-CLOSE.md` §13.5.
- **No workaround anywhere**: no edit to the checker, the ledger, `ADJUDICATION-W4.md`, any four-verb
  row, any COHESION cell, any `evidence/W4/**` file of an earlier seat, `LEDGER.md`, or `dev.sh`; no
  re-worded heading to satisfy a grep; raw gate outputs banked verbatim (JSON cannot carry the
  SERVED-MODEL header line; `gates-w4f2-2026-09-19.md` carries it and names them).

## Commit — and the LEDGER event line, WITHHELD a fourth time

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/LEDGER.md` → ` M …/LEDGER.md`, ⟨cmd⟩
`git diff --numstat` → **2 / 1**, re-read **twice twenty seconds apart** with an unchanged
HEAD-of-file object `7f2d7eb1…` and an unchanged numstat. Both hunks are the sibling **Track-A
`X-W9` RESUME-OPEN** cell and its event line — **another seat's uncommitted work inside this seat's
pathspec**. A pathspec commit of `LEDGER.md` commits the file's whole working-tree content, so it
would sweep their in-flight bytes into a Track-D commit under a Track-D message (the contamination
measured at X-W0, and the reason `5c59835d` and `0f93a570` withheld before this).

**Therefore: `LEDGER.md` is NOT edited and NOT staged at this open.** The X.P.W4S row keeps its
third-sitting reading, which remains **true** — the wave is `OPEN 2026-09-17` in RESUME MODE with
`.e` · `.e2` · `.f` `alreadyDone` and `[.g ∥ .h] → .f2` owed — so nothing in the ledger is made false
by the withholding; only this sitting's event line is deferred. It is written by the next seat that
finds `LEDGER.md` clean. **Nothing was stashed, reset or unstaged**; `scripts/dev/dev.sh` was never
touched. This open commits **one path**: this record.

## Close — FOURTH SITTING

**SERVED MODEL**: `claude-opus-5[1m]` · **CLOSE SEAT**, Track D (X·P), **VERIFY-ONLY — this seat cured
nothing**, wrote no gate instrument, no seam cell, no ledger row, no four-verb row and no COHESION
cell. 2026-09-19. **No byte above this line is rewritten** (E-3); **X.P.W4's CLOSED row is untouched**.

**Verdict: `PARTIAL`.** All three dispatched units landed and returned (`.g` **PARTIAL** with one
escalation · `.h` **DONE** · `.f2` **ESCALATED**), eleven commits exist across the two repos, and
**eight of the ten gates read GREEN at this seat's own double-run clock**. The wave does not reach
IMPLEMENTED because **G-1 is RED** — on the same head `.f2` measured and refused to mask
(**E-w4f2-1**: `DIVERGENCE-LEDGER.md` §11's heading form against the checker's row grammar) — and
because **G-10 is therefore WITHHELD**: §6 G-10's falsifier reads *"a stamp performed while any of
G-1..G-9 is red fails — the act is the consequence of the gates, never a substitute for them."*
The R-A stamp stays unperformed for the **fourth** time, by gate id, and both COHESION carves stay
unmade. **That is the spec's own instruction, executed, not a shortfall of will.**

### 1. ACT 1 — the commits exist, and each touches only its own unit's writable set

⟨cmd⟩ `git show --name-only --format=''` over every commit of the sitting, in both repos. Each
unit's grant is the FIFTH dated addendum (`W4.md:682`) plus §4's standing `evidence/W4/**` create row
and this record.

| unit | repo | commit | paths | in-bounds |
|---|---|---|---|---|
| `.g` | value.js | **`31a9d5d8`** | `scripts/seam-contract-check.mjs` + **10** NEW dated `evidence/W4/negctl-w4g-*` / `g1-after-w4g-*` files | **YES** — row 1 of `.g`'s grant + `evidence/W4/**` |
| `.g` | value.js | **`c1c8d775`** | `evidence/W4/fab1-w4g-reexport-measured-2026-09-19.md` | **YES** |
| `.g` | value.js | **`c7d7b768`** | `registry/DEFECT-LEDGER.md` · `evidence/W4/harvest-runB-w4g-2026-09-19.md` | **YES** — row 3 (modify-append, by the harvester through the §0p run-B symlink) |
| `.g` | value.js | **`4075c234`** | `execution/D/X-P-W4S.md` | **YES** — the record |
| `.g` | `<p2>` | **`ba4d148`** | `typescript/test/css-equivalence/run-full-surface.mjs` | **YES** — row 2 under the open's dated MEASURED PATH CORRECTION (the addendum's `css-totality` spelling names a file that does not exist; the `:60` literal it quotes is in `css-equivalence`) |
| `.h` | `<p2>` | **`fede7d3`** | `typescript/src/css/algebra/{grammar.mjs,tables.mjs,grammar/value.mjs,grammar/stylesheet.mjs}` | **YES** — `<p2>/typescript/src/css/**`, declaration production only |
| `.h` | value.js | **`e31b8450`** | `ADJUDICATION-W4.md` · `SEAM-CONTRACT.md` · `DIVERGENCE-LEDGER.md` + **5** NEW dated `evidence/W4/…-w4h.*` | **YES** — all four rows of `.h`'s grant |
| `.h` | value.js | **`d357aad9`** | `execution/D/X-P-W4S.md` | **YES** — the record |
| `.f2` | value.js | **`a6e94149`** | **8** NEW dated `evidence/W4/*-w4f2-*` files | **YES** — §4's `evidence/W4/**` |
| `.f2` | value.js | **`c1fe075f`** | `INBOX.md` · `registry/harvest/x-p-w4s.json` · `RELEASE-PACKET.md` · `waves/W4-CLOSE.md` | **YES** (see the disclosure below for `INBOX.md`) |
| `.f2` | value.js | **`cc8a4896`** | `execution/D/X-P-W4S.md` | **YES** — the record |

**LANDED-WRONG: NONE.** ⟨cmd⟩ the nine value.js commits' file lists piped to
`grep -cE '^(src|demo|api|test|e2e)/'` → **0**. No commit of this sitting carries a path under
`docs/tranches/X/waves/**` (X·V's), `docs/tranches/X/keyframes/**`, `docs/tranches/X/fourier/**`,
`../glass-ui/**`, `../keyframes.js/**`, `../fourier-analysis/**` or `../parse-that/**`; `dev.sh`
appears in none of the eleven.

**One disclosure, stated rather than smoothed.** §0ab's `.f2` sentence enumerates the stamp set
(*"five `VERIFIED` rows · two COHESION cells · `W4-CLOSE.md` dated §13 · `RELEASE-PACKET.md` dated
addendum · `x-p-w4s.json` fold/2"*) and does not re-name `INBOX.md`; `c1fe075f` carries the O-42 row.
It is held **IN BOUNDS** on two legs and neither is a stretch: §0ab defines `.f2` as *"the third
addendum's `.f` stamp set"*, and §0y's `.f` grant names `INBOX.md` (mail rows) explicitly; and **G-8
is the mail gate** — a seat obligated to re-run *"X·P closes with zero UNREAD"* and to row the
packet's delivery point cannot discharge it without the row. Recorded here so a later reader finds
the reading, not the silence.

### 2. ACT 2 — all ten §6 gates re-run at THIS seat's clock, against §6's own GREEN definitions

Not cited, not inherited: every gate below was executed by this seat, **every reading double-run**,
both writing scripts given `--out` into the scratchpad so **no byte of `evidence/W4/**` was touched**.
The long runs (`packed-candidate-surface.mjs`, `rc-p-evaluate.mjs`) were backgrounded per the STALL
WATCHDOG and polled.

| gate | §6's GREEN definition | this seat's reading | verdict |
|---|---|---|---|
| **G-1** | both set-differences ∅ · no disposition contradicts the ledger · non-goals named; exit 0 | ⟨cmd⟩ `node scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → **`VERDICT: RED — 2 check(s) failed`**: **[F]** *a disposition naming an id that is neither a ledger row nor a ruled class — 1: `parseStylesheet: unknown id F-w4f-1`* · **[J]** *a ledger row naming no export is not declared surface-wide — 1: `§11.4 F-w4f-2`*; **EXIT=1**, ⟨cmd⟩ `diff -q run1 run2` **silent** | **RED — E-w4f2-1 reproduced independently** |
| **G-2** | no commit of the wave carries a `src`/`demo`/`api`/`test`/`e2e` path | the nine value.js commits' file lists → **0** such paths (raw working-tree `git status` carries a sibling Track-A seat's `demo/**`+`e2e/**` rows, which X·P did not write and does not claim) | **GREEN for X·P** |
| **G-3** | every seam symbol resolves **from the installed path**; deep specifiers refuse | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>` in `<p2>/typescript` → `tarballSha256 **004bbcce02e08b89**…` · `entryCount **91**` · **`resolved 52 of 52`** · `refusals **5**` · `pack`·`declaration`·`install`·`resolve`·`refusals` **all true** · **`G3: GREEN`** · **EXIT=0**; ⟨cmd⟩ `diff -q run1 run2` **silent** | **GREEN** |
| **G-4** | 0 function-kind imports · empty-import instantiation succeeds · full list printed and accounted | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `"functionKindImportsTotal": **0**` · `"unaccountedImportsTotal": **0**` · `"verdict": "GREEN"` · **EXIT=0**; ⟨cmd⟩ `shasum -a 256 ac1.wasm` → **`f0d063d6241812de`**… (unmoved since `93bcb83` — `.h` changed class tables, not the artefact) | **GREEN** |
| **G-5** | the evaluator prints six rows and exits non-zero while any conjunct is false, naming which | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → **`RC-P(4.0.0) = FALSE — 3 of 6`**: `1 PUBLISHED(V)` (`verify-packed-surface.mjs` exited 1 against V's registry tarball) · `3 EQUIVALENCE(V)` (**20962** mirror-defects over V's installed `/css`, **full corpus, no limit**) · `4 ADMITTED(V)` (*"V's installed bytes contain zero `.wasm` artifacts … **FALSE, not vacuously true**"* — **Q-RC-2 discharged at the bytes**); 2 · 5 · 6 TRUE, all six **MEASURED** except 4 whose subject is absent; **EXIT=1 ×2**, the two tables differing only in `generatedAt` | **GREEN — the evaluator is honest, the predicate is FALSE** |
| **G-6** | ≥2 hits, both far ends, each naming the **predicate** | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/` → **25 ≡ 25**, across **5** files — `KF-W3.md` · `KF-W2.md` · `KF-W5.md` · `KF-W10.md` (X·KF) and `F-W0.md` (X·F). X·P wrote no byte of either directory in this sitting | **GREEN** |
| **G-7** | the direct `parse-that → fourier` edge absent — **INHERITED-GREEN FLOOR** | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0 ≡ 0**; `web/package.json` → **0 ≡ 0**. No transitive copy was "cured" | **GREEN — floor held** |
| **G-8** | packet exists in-repo · dated row names that path **and** the SS-6 batch · zero UNREAD | ⟨cmd⟩ `ls -l RELEASE-PACKET.md` → **28768 B**; `grep -c` in `INBOX.md` → `RELEASE-PACKET` **3** · `RC-P` **3** · `SS-6` **30**; ⟨cmd⟩ the positional Status-cell awk (column **6** by position) → **`ROWS=82 UNREAD=0`**, double-run identical, and **`ROWS=82 UNREAD=0` at `HEAD` too** (`INBOX.md` is byte-clean in the working tree — ⟨cmd⟩ `git diff --numstat` → empty) | **GREEN** |
| **G-9** | the gap ends in one of three recorded states, never in silence | `W4-CLOSE.md` **§4** — disposition **(C)**, quoted by id from COHESION **§0i.1 · S-4**, with its exact `BLOCKED-ON` condition and its re-trigger command; ⟨cmd⟩ the commit file lists → **0** paths under `docs/tranches/X/waves/` — X·P authored no X·V wave | **GREEN — recorded, not decided here** |
| **G-10** | shape (a) sum **5** at open → **0** after the act; no sibling self-stamps | ⟨cmd⟩ `for f in waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5 ≡ 5**, the correct **OPEN** state — **the act was not performed**. Second leg ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → **10 lines across 4 files, every one a DISCLAIMER** (*"VERIFIED is X.P.W4's alone (R-A)"* · *"NO — X.P.W4's release close alone"* · *"no wave stamps VERIFIED at its own close"*) — **no sibling close claims the stamp** | **RED — WITHHELD by gate id G-1** |

**8 GREEN · 2 RED.** The two REDs are one head: G-1's, and G-10's withholding is its consequence.
**BEFORE → AFTER over the sitting**: G-1 RED→**RED** (the *reason* moved — from the checker's stale
pre-adjudication vocabulary, E-w4f-1, **CURED by `.g` at `31a9d5d8`**, to `DIVERGENCE-LEDGER.md`
§11's heading form, E-w4f2-1, a file in no seat's remaining grant) · `.h`'s cells `#40`/`#41`
**BORN-RED → `identical`** · G-3 GREEN→GREEN with a **moved sha** (`f8aede11…` → `004bbcce…`, `.h`'s
grammar bytes) · G-2 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 GREEN→**GREEN** (G-8's row count 77 → **82**
as `.f2`'s O-42 and three sibling rows landed, UNREAD **0** throughout) · G-10 **5 → 5**.

### 3. ACT 3 — §8 Verification Artefacts, run as written

⟨cmd⟩ `wc -c` over every row of §8, at the settled bytes. **All present; none missing.**

| artefact | bytes |
|---|---|
| `SEAM-CONTRACT.md` | **98058** |
| `RELEASE-CONDITION.md` | **31606** |
| `RELEASE-PACKET.md` | **28768** (the second dated addendum, `.f2`) |
| `waves/W4-CLOSE.md` | **54949** (the dated **§13**, `.f2`) |
| `evidence/W4/packed-surface.json` | **128861** |
| `evidence/W4/wasm-imports.json` | **9392** |
| `evidence/W4/rc-p-evaluation.json` | **33938** |
| `evidence/W4/value-source-untouched.txt` | **3312** |
| `evidence/W4/reciprocity-grep.txt` | **3951** |
| `registry/harvest/x-p-w4s.json` | **147196** (fold/2) |
| `registry/harvest/x-p-w3.json` | **350304** |

⟨cmd⟩ `ls evidence/W4 | wc -l` → **43** files; the sitting added **24** of them (10 + 1 + 1 `.g` · 5
`.h` · 8 `.f2`), every one NEW and dated, so **no earlier seat's evidence was overwritten (E-3)**.
Commit hashes for each phase in both roots are the roster at §5.

### 4. ACT 4 — E13, the four paths swept again at the close seat's clock

| path | measured | newest |
|---|---|---|
| `docs/tranches/V/` depth-1 ⊕ `V/coordination/` | **10** ⊕ **24** | unchanged since `.f2`'s sweep |
| `../glass-ui/docs/tranches/BK/coordination/` | **9** — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/`, **BK re-confirmed newest** | `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35**, rowed |
| `../keyframes.js/docs/tranches/V/coordination/` | **13** | newest by mtime is `INBOUND-LEDGER.md` (no new letter); newest *letter* `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, **ours** |
| `../sci-report/atlas/docs/tranches/P/coordination/` | **28 UNMOVED** | `valuejs-inbound-2026-07-27-…` |

⟨cmd⟩ `find <the four dirs> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-19 12:00"` → **one
member, `INBOX.md` itself** (`.f2`'s own O-42 at `c1fe075f`), **not inbound mail**. ⟨cmd⟩ the
positional Status-cell awk → **`ROWS=82 UNREAD=0`**, double-run identical, **and identical at `HEAD`**.
A bare `grep -i UNREAD` answers larger and is the header vocabulary and prose inside cells that begin
`SENT`/`FOLDED`/`READ` — the X.P.W0 CHECK-1 **D-1** trap, refused here as at every prior sitting.

**0 unrowed letters addressed to value.js · 0 UNREAD · no row minted by this close ·
`INBOX.md` NOT written by this close.** **No wave closes with UNREAD mail in scope — none is.**

### 5. Commit roster

| # | repo | hash | unit | meaning |
|---|---|---|---|---|
| 1 | `<p2>` | `ba4d148` | `.g` | F-ab1 — the candidate type re-export set is MEASURED from the shipped declaration, not a five-name literal |
| 2 | value.js | `31a9d5d8` | `.g` | `seam-contract-check.mjs` learns the post-adjudication vocabulary (E-w4f-1) — G-1 GREEN, three negative controls RED |
| 3 | value.js | `c1c8d775` | `.g` | F-ab1 evidence, BEFORE→AFTER measured; **ESC-W4g-1** returned unlanded |
| 4 | value.js | `c7d7b768` | `.g` | the `DEFECT-LEDGER.md` append **by the §0p run-B symlink** — the harvester's write, 153/1, loss-free, A ≡ B |
| 5 | value.js | `4075c234` | `.g` | `.g`'s unit receipt |
| 6 | `<p2>` | `fede7d3` | `.h` | the declaration production reads css-syntax-3 §5.4.7 and §5.4.4 (F-w4f-2 · F-w4f-1) |
| 7 | value.js | `e31b8450` | `.h` | F-w4f-2 DISCHARGED, F-w4f-1 FILED — two seam cells, the ledger's §11, the census and both gate readings banked |
| 8 | value.js | `d357aad9` | `.h` | `.h`'s unit receipt |
| 9 | value.js | `a6e94149` | `.f2` | eight NEW dated gate-evidence files at a FRESH adjudicator's clock |
| 10 | value.js | `c1fe075f` | `.f2` | `W4-CLOSE.md` §13 · `RELEASE-PACKET.md` second addendum · `INBOX.md` O-42 · `x-p-w4s.json` fold/2 |
| 11 | value.js | `cc8a4896` | `.f2` | `.f2`'s unit receipt |
| 12 | value.js | *this close* | SEAT 0 | this `## Close` section + the `LEDGER.md` row and event line |

**The §9 `.d` commit family was not split** — its stamp members (five VERIFIED rows, two COHESION
cells) are **absent because the act was withheld**, which is the family being honoured, not broken.

### 6. Residuals, with named owners

| id | residual | owner |
|---|---|---|
| **R-C1** | **`DIVERGENCE-LEDGER.md` §11's form** — `### §11.4 F-w4f-2 — …` mints a phantom row ([J]); `F-w4f-1` is a table under `### §11.1 The row` and so carries no reader-visible id ([F]). Cure, fully specified by `.f2`: (a) `### §11.4` → `#### §11.4`; (b) render `F-w4f-1` as `### F-w4f-1 — a declaration NAME that is not one <ident-token>` with its `\| field \| value \|` table, in place or as a dated §12 beside | **a seat granted `DIVERGENCE-LEDGER.md`** — in no current seat's grant. Then G-1 re-runs and a further **FRESH** seat stamps iff G-1..G-9 GREEN |
| **R-C2** | **the R-A stamp** — five `VERIFIED` rows + the two COHESION §1 SS-5 / §5 carves, unperformed a fourth time | a **FRESH** Fable adjudicator (M-23 §1), **after R-C1** |
| **R-C3** | **L-13 harvest 4 of 6** — `.f`'s journal carried no result row (a journal/harvester finding, beside F-e11); `.f2` structurally absent | X-W11's HARVEST lane |
| **R-C4** | **the `DEFECT-LEDGER.md` append for `.g`/`.h`'s rows** not written by `.f2` (`registry/DEFECT-LEDGER.md` is in no row of the `.f2` grant). `.g` **did** land its own §0p run-B append at `c7d7b768` | the registry lane |
| **R-C5** | **R-2 (`.h`)** — `DIVERGENCE-LEDGER.md` is generated and its F-e7 carry lifts `### §6.x` only; a regeneration must re-append **§10** and **§11** or both rulings' rows are lost. Same mechanism as **ESC-W4g-1** | the emitter's owner (`emit-divergence-ledger.mjs:169`) |
| **R-C6** | **R-3 (`.h`)** — `a { color: red ! important }` and `red! important` stay **REJECT in both engines**; css-syntax-3 §5.4.7 would admit the gap, and opening it would mint an **unruled divergence §0ab does not authorise** | whoever rules the seam's whitespace posture |
| **R-C7** | **R-1 (`.g`)** — ⟨cmd⟩ `git diff --check` reports trailing whitespace on line 48 of one written file; **not hand-cured**, because the bytes are the instrument's | `.g`'s file owner, at the next lawful touch |
| **R-C8** | `<p2>` has **NO git remote** (branch `w2/harness`), so `ba4d148` and `fede7d3` cannot be pushed | the root session / owner |

### 7. Escalations, carried forward UNRESOLVED and unworked-around

- **E-w4f2-1 (`.f2`) — the reason the sitting is PARTIAL.** G-1's RED head, reproduced independently
  by this close at its own double-run clock (§2). `.f2` refused to widen the checker's reader to
  parse §11.1's table: *"a second row grammar minted to pass one gate"* — a **masking cure**, refused.
  This close concurs and did not take it either. Cure and owner at **R-C1**.
- **ESC-W4g-1 (`.g`) — a DURABILITY defect, not a live RED.** F-ab1's second limb (*"the emitter's
  carry gains §10"*) is **impossible inside `.g`'s hard bound**: the carry is at
  `<p2>/…/emit-divergence-ledger.mjs:169` (`const carryPath = CANONICAL_LEDGER_PATH`), whose slice is
  bounded at `"\n### §6."` and the next level-2 heading — §6 and nothing else. That file is in no row
  of `.g`'s grant, so **no byte of it was written**; the cure is specified in full in `.g`'s receipt so
  the granting seat spends no measurement. G-1 reads over the ledger's **committed** bytes with §10
  present, so this blocks nothing today and would fire only against a future regeneration. It is the
  same mechanism as `.h`'s **R-2** (**R-C5**), now named from two independent seats.
- **Diagnostic-iteration count.** G-1 has now been re-measured RED at **four** sittings — but **not
  three times without a monotone change**: the head moved each time (G-3 → E-w4f-1 → E-w4f2-1), and
  `.g`'s cure removed two FALSE readings ([E] 37, [G] 6) and no TRUE one. §3a's third-iteration
  trigger has **not** fired.
- **No workaround anywhere, measured over the sitting's eleven commits.** No `try/catch` around a
  defect, no `test.skip`, no allowlist, no copied producer selector, no `node_modules` patch, no
  re-worded heading to satisfy a grep, no four-verb row or COHESION cell moved under a red gate, no
  `evidence/W4/**` file of an earlier seat overwritten, no `ADJUDICATION-W4.md` retag, no edit to the
  banked `universe-52.json`. `scripts/dev/dev.sh` is in **0 of 11** commits.

### 8. Four-verb — moved exactly as the spec says this wave moves it, and no further

`W4.md` §2 **R-A**: *"Gates green + bytes landed stamps a wave **IMPLEMENTED**"*, and §6 G-10's
falsifier: *"A stamp performed while any of G-1..G-9 is red fails — the act is the **consequence** of
the gates, never a substitute for them."* **G-1 is RED.**

| verb | value | by whom |
|---|---|---|
| AUDITED | **YES** | unchanged |
| SPECIFIED | **YES** | unchanged |
| IMPLEMENTED | **NO — PARTIAL** | eleven commits landed; 8 of 10 gates GREEN; G-1 RED |
| VERIFIED | **NO — WITHHELD by gate id G-1**, a fourth time | **not this seat's to stamp** (R-A: only a fresh Fable adjudicator, and only iff G-1..G-9 GREEN) |

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/waves/W[0-4].md docs/tranches/X/COHESION.md`
→ **0 lines** after every write of this close: **no four-verb row and no COHESION cell was written**,
by any seat of this sitting or by this close. Shape-(a) sum stands at **5 ≡ 5**. **Both carves or
neither: neither.** **X.P.W4's CLOSED row is untouched.**

### 9. Push

The owner's 2026-09-17 begin-word authorized push. ⟨cmd⟩ `git -C ../parse-that status -sb` →
`## master...origin/master` with **no ahead marker** — the frozen read-only root publishes nothing,
and no seat of this wave wrote a byte of it. ⟨cmd⟩ `git -C <p2> remote -v` → **empty**: `<p2>` has
**no remote at all** (branch `w2/harness`), so `ba4d148` and `fede7d3` are **unpushable** (**R-C8**,
owner's). value.js: `push origin HEAD` performed, never forced.

### 10. The re-trigger, stated so it cannot be mistaken for a schedule

1. A seat granted `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` lands **R-C1**'s two-part form
   cure — `### §11.4` → `#### §11.4`, and `F-w4f-1` rendered as a `### <id> — <title>` row with its
   field table — in place or as a dated §12 beside (E-3).
2. **Re-trigger command**, to be **measured, not assumed**:
   `node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/evidence/W3/universe-52.json docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`
   → **`VERDICT: GREEN`, EXIT=0**, double-run.
3. **Only then** may a **fresh** Fable adjudicator (M-23 §1) re-run G-1..G-10 at its own clock and
   perform the R-A stamp — five `VERIFIED` rows in one act, shape-(a) sum **5 → 0** — with the two
   COHESION carves, **iff G-1..G-9 all read GREEN at that seat's own commands**.

Nothing above is a date. RC-P(4.0.0) stays **FALSE — 3 of 6**; **KF.W3 does not open**; the X·V
adoption wave's re-trigger does not fire.

---

# Check 1 — FRESH ADVERSARIAL CHECK (L-20, pass 1) of the FOURTH SITTING's close

SERVED MODEL: claude-opus-5[1m] · CHECK SEAT, Track D (X·P) · 2026-09-19 · **VERIFY-ONLY — this
seat cured nothing, wrote no gate instrument, no seam cell, no ledger row, no four-verb row and no
COHESION cell.** No byte above this line is rewritten (E-3).

**Verdict: `NOT-CONFORMANT`** — and the reason is narrow, because the close's own posture survives
every other axis. **All eight claimed GREENs reproduced at this seat's own commands**, both REDs
reproduced by id and by output, no write landed outside §File Bounds, no masking cure exists in any
of the eleven commits, the commit families are intact, E-3 holds at the bytes, mail is clean, and
the four-verb line did not move. The single blocking finding is that **G-1's RED is not relieved**:
it was introduced *inside this sitting* by `.h`'s write to a file `.h` held a grant on, 22 minutes
after `.g` had turned the same gate GREEN, and the close routes it to a seat that does not yet
exist rather than to any relief the spec gives (producer-owned · successor-routed · spec-named
honest-RED id). The close's honesty about it is not in question; its **relief** is.

## 1. Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **C1-1** | **HIGH** | **G-1 RED is an in-sitting regression, not a relieved RED.** `.h`'s grant (fifth addendum) is `DIVERGENCE-LEDGER.md` **modify-append**. Its append wrote `### §11.1 The row` and `### §11.4 F-w4f-2 — DISCHARGED …` at **level 3**, which is the checker's row grammar (`/^### (.+?) — /`, `:112`). `.f` had already demoted its own retirements to **level 4** (`#### §10.1 … #### §10.4`) one section above **in the same file** for exactly this reason (`.f` receipt A-2). The two RED checks are the direct consequence: `[J]` reads `§11.4 F-w4f-2` as a row naming no export, and `[F]` cannot see the `F-w4f-1` row at all because it is a field table under a heading with no ` — `. Both are curable **inside `.h`'s own append** — one `#` per heading, plus rendering `F-w4f-1` as `### F-w4f-1 — …`. `.h` returned **DONE · "Escalations: none"** without re-running the wave gate its write reddened, and the sitting's unit plan cleared `.g ∥ .h` as "no shared modify path" — true of *writes*, false of the **gate read**: `.g`'s G-1 reads the file `.h` writes | ⟨cmd⟩ `node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `VERDICT: RED — 2 check(s) failed` · `[F] parseStylesheet: unknown id F-w4f-1` · `[J] §11.4 F-w4f-2`, **EXIT=1** — the close's reading reproduced exactly. ⟨cmd⟩ `git log --format='%h %cI' -1` → `.g`'s cure `31a9d5d8` **23:12:40**, `.g`'s GREEN receipt `4075c234` **23:19:26**, `.h`'s ledger append `e31b8450` **23:34:27** — the regression is 15 minutes *after* the GREEN was banked. ⟨cmd⟩ `grep -n '^#\{2,4\} .*§1[01]' DIVERGENCE-LEDGER.md` → `1094 #### §10.1` … `1143 ### §11.1` · `1168 ### §11.4 F-w4f-2 — …` — the level split is at the bytes | R-C1's two-part form cure is correct **and its owner is wrong**: the work belongs to a **re-dispatch of `.h`** (or a successor seat granted the same modify-append row), not to "a seat granted `DIVERGENCE-LEDGER.md` — in no current seat's grant". Add to the unit plan's *Locks* the rule the disjointness rule does not carry: **a unit that writes a file another unit's gate READS is serial behind that gate's re-run, or owes the re-run itself.** Then G-1 re-runs and a FRESH adjudicator stamps iff G-1..G-9 GREEN |
| **C1-2** | MINOR (mitigated — non-blocking) | **G-2 is read as a commit predicate, not as §6's literal working-tree predicate.** §6 G-2 says `git status --porcelain -- src api demo test e2e` **is empty at every commit**; the working tree carries 13 such rows throughout | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → non-empty (a sibling Track-A seat's `demo/**` + `e2e/**`); ⟨cmd⟩ the nine value.js commits' file lists → **0** paths under `src\|demo\|api\|test\|e2e` | **Mitigation accepted**: the reading is **disclosed** at the open, in `.f2`'s table and in the close's §2 ("*X·P did not write and does not claim*"), and it is the reading G-2's own **falsifier** states (*"one byte under those paths at any commit fails the wave"*). No cure ordered; a dated addendum to §6 G-2 naming the commit predicate would end the re-litigation |
| **C1-3** | INFO | **The close's "row count 77 → 82" mixes two awk variants.** 77/78 is `.g`'s regex (`/^\| *[IO]-[0-9]+ *\|/`), 81/82 the open's (`/^\| *[IO]-[0-9]/`); at a single variant the movement is **81 → 82**, one row (O-42) | ⟨cmd⟩ variant A → `ROWS=82 UNREAD=0`; ⟨cmd⟩ variant B → `ROWS=78 UNREAD=0`; both at `HEAD` and in the working tree | Nothing to cure — `.g`'s receipt already records the divergence and both variants agree on the only load-bearing figure, **UNREAD=0**. Pin one variant in the E13 idiom so the delta is never read as mail |
| **C1-4** | INFO | **§3a's third-iteration trigger is close, and the close's argument for why it has not fired is correct but is now at its limit.** G-1 has read RED at four sittings; the head moved each time (G-3 → E-w4f-1 → E-w4f2-1) | the three heads are distinct at the bytes: `resolve 19 of 52` · `[E] 37 · [G] 6` · `[F] 1 · [J] 1` | A **fifth** RED anywhere in the checker/ledger **document-form** family should be read as the same head recurring and dispatched to the triumvirate, not re-cured unit-locally |

**No BLOCKER · no CRITICAL · one HIGH (C1-1) · one MINOR-with-mitigation · two INFO.**

## 2. Every claimed GREEN, re-run at this seat's own commands — 8 of 8 REPRODUCE

| gate | the close's published reading | this seat's reading | ≡ |
|---|---|---|---|
| **G-2** | 0 wave-commit paths under `src`/`demo`/`api`/`test`/`e2e` | ⟨cmd⟩ nine commits' file lists ` \| grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0** | **YES** |
| **G-3** | `resolved 52 of 52` · `G3: GREEN` · sha `004bbcce…` · `entryCount 91` · refusals 5 · EXIT=0 | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>` → `"tarballSha256": "004bbcce02e08b89020a74e43ce35b83dec2f6f6597204afd8b712cc9dd056ec"` · `entryCount 91` · `"resolved": "52 of 52"` · `refusals 5` · `pack`·`declaration`·`install`·`resolve`·`refusals` all `true` · `"G3": "GREEN"` · **EXIT=0** | **YES — sha to the byte** |
| **G-4** | `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` · GREEN · `ac1.wasm` `f0d063d6…` | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `0` · `0` · `"verdict": "GREEN"` · **EXIT=0**; ⟨cmd⟩ `shasum -a 256` → `f0d063d6241812de…` | **YES** |
| **G-5** | `RC-P(4.0.0) = FALSE — 3 of 6` (1 · 3 · 4), EXIT=1, honestly false | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` · `KF.W3 does NOT open.` · **EXIT=1** | **YES** |
| **G-6** | 25 hits, 5 files, both far ends | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**, files `KF-W3.md` · `KF-W2.md` · `KF-W10.md` · `KF-W5.md` · `F-W0.md` | **YES** |
| **G-7** | 0 / 0, the inherited-GREEN FLOOR | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0** | **YES — floor held** |
| **G-8** | packet **28768 B** · `ROWS=82 UNREAD=0` | ⟨cmd⟩ `ls -l RELEASE-PACKET.md` → **28768**; ⟨cmd⟩ the positional column-6 awk → **`ROWS=82 UNREAD=0`**, and **82/0 at `c1fe075f`** too | **YES** |
| **G-9** | disposition **(C)**, quoted by id from COHESION §0i.1 · S-4, with `BLOCKED-ON` + re-trigger | `W4-CLOSE.md` §4 `:1`–`:23` carries the quoted disposition, the `BLOCKED-ON` condition and the re-trigger command; ⟨cmd⟩ commit file lists → **0** paths under `docs/tranches/X/waves/` | **YES** |

**Both REDs also reproduce**, by output and not by report: **G-1** `VERDICT: RED — 2 check(s)
failed` EXIT=1 (§1 C1-1), and **G-10** shape (a) ⟨cmd⟩ `for f in waves/W[0-4].md; do awk …; done \|
grep -c 'VERIFIED \| \*\*NO\*\*'` → **5**, the correct **open** state, the act unperformed.

**The checker still has teeth — the three negative controls re-run at this seat**, against `.g`'s own
fixtures: ⟨cmd⟩ `node scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-{base,A-pending-unruled,B-live-binding,C-ghost-id}-2026-09-19.md …` →
**base GREEN EXIT=0** · **A RED EXIT=1** · **B RED EXIT=1** · **C RED EXIT=1 (2 checks)**. `.g`'s cure
is therefore **not** a narrowing: ⟨cmd⟩ `git show 31a9d5d8 -- …/seam-contract-check.mjs \| grep '^-'`
shows the 15 deleted lines are **checks E and G being re-specified**, not removed, and both still fire.

## 3. Honest-RED adjudication (axis 10)

| gate | RED at close | relief examined | verdict |
|---|---|---|---|
| **G-1** | `[F] parseStylesheet: unknown id F-w4f-1` · `[J] §11.4 F-w4f-2` | **producer-owned?** No — the file is `docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`, this repo's, and no producer is implicated. **Routed to a successor by the spec?** No — neither `W4.md` §6 G-1, nor the third/fourth/fifth addenda, nor COHESION §0ab routes a G-1 failure onward; §3a routes a non-local-edit-recoverable gate failure to the **triumvirate**, which was not invoked. **A spec-named honest-RED id?** No — G-1 is one of the nine **born-RED** gates the wave exists to turn, and it *was* turned, at `31a9d5d8`. The record's own relief clause — *"a file in NO remaining seat's grant"* — is an artifact of this sitting's dispatch ordering, since the fifth addendum **granted that exact file to `.h`**, whose write created the RED | **UNRELIEVED — a real defect (C1-1, HIGH)** |
| **G-10** | withheld; shape-(a) sum `5 ≡ 5` | **Relieved by the spec's own words**, quoted and obeyed: §6 G-10's falsifier — *"A stamp performed while any of G-1..G-9 is red fails — the act is the consequence of the gates, never a substitute for them"* — and §2 R-A. Withholding is the **conforming** act, and the record performs it completely: both COHESION carves unmade, no sibling close self-stamps (⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → 10 lines, every one a disclaimer). **Owner named: R-C2**, a FRESH Fable adjudicator after R-C1 | **HONEST-RED — relieved and owner-named** |

**The honest-RED set is therefore `{G-10}` alone.** G-1 is not in it, and this check declines to put
it there: the close's *reasoning* about G-1 is sound and its refusal to widen the checker's reader
(*"a second row grammar minted to pass one gate"*) is the right refusal — but a gate a wave reddened
with its own in-grant write is a defect the wave owes, not a residual it may hand forward.

## 4. The remaining axes, each measured

- **§File Bounds (axis 2)** — ⟨cmd⟩ `git show --stat` over all **11** commits (9 value.js · 2 `<p2>`).
  Every path lies in its unit's grant: `.g` → `seam-contract-check.mjs` + 10 `evidence/W4/**` ·
  `evidence/W4/fab1-…` · `registry/DEFECT-LEDGER.md` + evidence · the record · `<p2>`
  `test/css-equivalence/run-full-surface.mjs`; `.h` → `<p2>/typescript/src/css/algebra/{grammar,tables,grammar/value,grammar/stylesheet}.mjs` ·
  `ADJUDICATION-W4.md` (+135, **append-only**) · `SEAM-CONTRACT.md` (**1 line**, row 19's cells) ·
  `DIVERGENCE-LEDGER.md` (+43, **append-only**) · 5 `evidence/W4/**` · the record; `.f2` → 8
  `evidence/W4/**` · `INBOX.md` · `harvest/x-p-w4s.json` · `RELEASE-PACKET.md` · `W4-CLOSE.md` · the
  record. **`scripts/dev/dev.sh` appears in 0 of 11.** The `INBOX.md` disclosure the close volunteers
  is accepted: §0y's `.f` grant names it and G-8 cannot be discharged without the row.
- **Masking (axis 3)** — ⟨cmd⟩ `git show <each> \| grep '^+' \| grep -iE 'try *\{\|catch\|skip\|allowlist\|ignore\|\.only'`
  over `31a9d5d8`, `fede7d3`, `ba4d148` → **one hit, a doc-comment prose word** (*"a ruling ignored"*).
  No `test.skip`, no allowlist, no copied producer selector, no `node_modules` patch, no silently
  narrowed assertion — and the two places where a masking cure was *available* (widening the checker's
  row grammar; retagging `adjudications.mjs` / the banked `universe-52.json`) were **named and refused**
  in the record.
- **Commit families (axis 4)** — `.g`'s checker cure and its negative-control fixtures ride **one**
  commit (11 paths); `.h`'s two rulings ride **one** grammar commit over four files because both
  rulings touch the same production; the §9 `.d` family's stamp members are absent **because the act
  was withheld**, which honours the family rather than splitting it. One commit per meaning throughout.
- **E-3 (axis 5)** — ⟨cmd⟩ the eleven commits' file lists filtered for `evidence/W3` ·
  `docs/tranches/X/waves` · `registry/adjudicated` · `keyframes` · `fourier` → **empty**; ⟨cmd⟩
  `grep -c 'parse-that/waves/W[0-4].md'` over the same → **0**. The dated spec, the adjudicated
  registry, the banked W3 conformance artefacts and every sibling spec are **byte-untouched**.
  `x-p-w4s.json`'s 74 deletions are the fold/2 rewrite, and the predecessor is embedded whole —
  ⟨cmd⟩ `node -e` over it → `schema x-p-w4s.f2.harvest-fold/2` · `predecessor bd09f39d3fea 56673 B` ·
  `dispatched 6 · harvestedUnitRows 4` (the RED disclosed, not smoothed).
- **Mail (axis 6)** — ⟨cmd⟩ the positional column-6 awk → **`ROWS=82 UNREAD=0`**, in the working tree
  and at `c1fe075f`; ⟨cmd⟩ `git status --porcelain -- INBOX.md` → 0 lines. **No UNREAD row in scope.**
- **Four-verb (axis 7)** — ⟨cmd⟩ `git status --porcelain -- waves/W[0-4].md COHESION.md` → **0 lines**;
  shape-(a) sum **5**. Nothing moved, which under a RED G-1 is the lawful reading. X.P.W4's CLOSED row
  untouched.
- **The goal criterion (axis 8)** — **two of §2a's three questions are answered at the bytes** (*how
  does it arrive*: G-3 proves 52 of 52 from the **installed** tarball, sha published; *when may the
  consumer act*: `RC-P(4.0.0) = FALSE — 3 of 6`, a script a person cannot argue with). The **first** —
  *what exactly does value.js receive* — is answered **except at one row**: `SEAM-CONTRACT.md` row 19
  publishes disposition id `F-w4f-1`, and a reader who follows that id into `DIVERGENCE-LEDGER.md`
  finds no row bearing it. That is not a formatting nicety; it is the precise failure G-1's falsifier
  is written against, and it is why C1-1 is HIGH rather than MINOR.
- **Published figures (axis 9)** — ⟨cmd⟩ `wc -c`: `SEAM-CONTRACT.md` **98058** · `RELEASE-CONDITION.md`
  **31606** · `RELEASE-PACKET.md` **28768** · `W4-CLOSE.md` **54949** · `x-p-w4s.json` **147196** —
  every §8 figure reproduces. `W4-CLOSE.md` §13 present with 13.1–13.5.

## 5. The successor waves' "Opens after" conjuncts, measured against this wave

| successor | conjunct | state | reading |
|---|---|---|---|
| **KF.W3** (X·KF) | *"opens if and only if `RC-P(V)` evaluates TRUE … run against the registry coordinate `V`"* (`KF-W3.md:9`) | `RC-P(4.0.0) = FALSE — 3 of 6` | **LAWFULLY BLOCKED** — gate-keyed, not scheduled; the reciprocity sentence names the **predicate**, never a wave number (G-6's falsifier satisfied) |
| **F.W0** (X·F) | *"Opens after: tranche X's execution gate lifts (owner begin-word for the X·F lane). No predecessor wave"* (`F-W0.md:53`) — its **parser** leg is the RC-P one | the open conjunct is owner-gated and independent of X·P; the parser conjunct is FALSE | **NOT blocked by this wave** as to opening; its parser-effects tuple **is** blocked, and the forbidden direct edge is asserted absent (G-7, 0/0) |
| **the X·V adoption wave** | it does not exist (OP-4 / G-9) | disposition **(C)** `BLOCKED-ON` + re-trigger, recorded not decided | **LAWFULLY BLOCKED**, and X·P authored no X·V wave to fill the gap — 0 commit paths under `docs/tranches/X/waves/` |

**No successor is unlawfully opened, and none is blocked by anything but a measured predicate.**

## 6. What this check did not do

It cured nothing, re-dispatched nothing, and wrote no byte outside this record and the ledger's own
row. It did **not** take the cure it is naming (`DIVERGENCE-LEDGER.md` is in no grant of a check
seat), and it did not widen, retag or regenerate any instrument to move a gate. The LEDGER status is
left at **PARTIAL**: on this reading X.P.W4S is not closed, because C1-1 is owed work inside the
wave, and a `CLOSED` cell written over an unrelieved RED would be the laundering axis 10 forbids.

---

## Repair 1 — ROUND 1, on Check 1's register (C1-1 HIGH)

SERVED MODEL: claude-opus-5[1m] · **REPAIR SEAT (round 1)**, Track D (X·P) · 2026-09-20. No byte
above this line is rewritten (E-3); the fourth sitting's open, receipts, close and Check 1 stand as
written. This seat cured the ONE blocking defect at the bytes Check 1 named, re-ran every gate the
cure could move, and **did not perform the R-A stamp** — that act is a FRESH Fable adjudicator's
(M-23 §1), and this seat has now authored ledger bytes.

### R1.0 — CRASH-RECOVERY sweep, before any write

⟨cmd⟩ `git status --porcelain` (value.js) → **18** rows at open, **none inside this seat's writable
set**: `demo/**` (**10**) · `e2e/**` (3) · `docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`docs/tranches/X/execution/{A/X-W5.md,A/X-W9.md,B/KF-W13.md}` · `scripts/dev/dev.sh` (unowned,
NEVER touched, never staged). `docs/tranches/X/parse-that/**` carried **0** dirty rows and
`docs/tranches/X/execution/{D/X-P-W4S.md,LEDGER.md}` **0** — no killed predecessor's partial work on
this unit exists, nothing was inherited, nothing stashed, nothing restored, and no dirty path
outside the set was touched or staged. The tree MOVED under this seat while it worked — by the last
sweep a sibling track had landed `src/css/{grammar,index,types}.ts` · `src/easing.ts` ·
`package.json` · `scripts/ci/verify-packed-surface.mjs` and had committed the `A/X-W9.md` and
`B/KF-W13.md` rows away (⟨cmd⟩ `git status --porcelain` → **24** rows). None of them is this wave's,
none was touched, and **0** of them appears in any commit of this repair.

### R1.1 — Defect register, each row dispositioned

| # | severity | disposition | where |
|---|---|---|---|
| **C1-1** | **HIGH** | **CURED** at the bytes, `cf99b1c8`; G-1 re-reads `VERDICT: GREEN`, `EXIT=0`, double-run identical | R1.2–R1.4 |
| **C1-2** | MINOR (mitigated) | **NO CURE ORDERED** by the check itself; the suggested form-cure (a dated addendum to `W4.md` §6 G-2 naming the commit predicate) edits the **dated spec**, outside this seat's writable set — **ESCALATED**, with the measured reason | R1.6 |
| **C1-3** | INFO | **RECORDED, no cure** — the suggested cure pins a variant in the **E13 idiom**, which is not a wave artefact and is in no unit's grant; both variants agree on the load-bearing figure (`UNREAD=0`), re-measured here | R1.5, R1.6 |
| **C1-4** | INFO | **RECORDED as a standing trigger** — the fifth RED in the checker/ledger document-form family goes to the triumvirate (§3a), not to a unit. This repair is the **fourth** head's cure, not a fifth RED | R1.6 |

### R1.2 — C1-1, the cure at the bytes

**The defect, reproduced first.** ⟨cmd⟩ `cd docs/tranches/X/parse-that && node
scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md`
→ `VERDICT: RED — 2 check(s) failed` · `[F] parseStylesheet: unknown id `F-w4f-1`` · `[J] §11.4
F-w4f-2`, **EXIT=1** — Check 1's reading and the close's, to the line.

**The mechanism, read at the checker's own bytes.** ⟨cmd⟩ `sed -n '112p' scripts/seam-contract-check.mjs`
→ `const head = line.match(/^### (.+?) — /)`. A ledger ROW is a level-3 heading carrying ` — `.
`X.P.W4.h`'s append put the `F-w4f-1` field table under `### §11.1 The row` — level 3 with **no**
` — ` — so `cur` was never set and the row did not exist for `[F]`; and it put `### §11.4 F-w4f-2 —
DISCHARGED, so it opens no row here` at level 3 **with** ` — `, so a prose section WAS a row, named
no export, and `[J]` fired. `.f` had already met this exact hazard one section above in the same
file and answered it with `#### §10.1 … #### §10.4`.

**The cure — a FORM cure inside `X.P.W4.h`'s own appended bytes, cell-for-cell.**

1. `### §11.1 The row` → **`### F-w4f-1 — a declaration NAME that is not one `<ident-token>`**`, and
   the 6-column table re-rendered as the ledger's `| field | value |` form with `| **entry** |
   `parseStylesheet` |` as its declared subject field. **Every field's text is `.h`'s, moved
   unedited** — the move was executed by a script that *splits `.h`'s own row on `|` and re-emits
   the cells*, so no byte of the subject, incumbent, candidate, disposition or consumer-direction
   text was retyped (`/private/tmp/.../repair1-form-cure.mjs`, scratch, uncommitted).
2. `### §11.2` · `### §11.3` · `### §11.4` → `#### …`, `.f`'s precedent.

**Nothing else moved.** No reading, no disposition, no consumer direction, no id, no census figure,
no population, no `RULING_IDS` retag. ⟨cmd⟩ `git show --numstat --format='' cf99b1c8` → `21  7
DIVERGENCE-LEDGER.md` (the 7 deletions are exactly 4 replaced lines — heading, table header,
separator, the row — plus the 3 demoted headings) · `203  0
evidence/W4/g1-repair1-2026-09-20.txt` — **2 paths, both in the fifth addendum's `.h`
grant (`DIVERGENCE-LEDGER.md` modify-append · `evidence/W4/**` NEW dated files)**, which is the
grant Check 1 names as the cure's rightful owner. Sections `§0`–`§10` are untouched.

### R1.3 — G-1, re-run at the settled bytes, twice

⟨cmd⟩ `node scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json
DIVERGENCE-LEDGER.md` → `rows: contract 52 · universe 52 · **ledger rows 48**` ·
`contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · census `declared-divergence 7 ·
identical 45` · §0v carried `44 cells over 6 rows` · `SURFACE-WIDE ledger rows … S-1, S-4, R2, R3,
R5, CN-1, §6.1` (**`§11.4 F-w4f-2` is gone from that list**) · **`VERDICT: GREEN`**, **EXIT=0**.
⟨cmd⟩ run 2 → identical; ⟨cmd⟩ `diff -q run1 run2` → silent. Banked at
`evidence/W4/g1-repair1-2026-09-20.txt`. **Ledger row count is UNMOVED at 48**: `F-w4f-1` becomes a
row in the same act by which `§11.4` stops being one — the cure adds no row and removes none.

### R1.4 — the cure is not a masking cure, and each half is falsifiable

**The instrument did not move.** ⟨cmd⟩ `git status --porcelain -- scripts/seam-contract-check.mjs
SEAM-CONTRACT.md` → **0 lines**; both are byte-unchanged by this repair. No check was widened, no
second row grammar was minted, no id was allowlisted, no `try`/`catch`, no skip, no ghost row.

**`.g`'s three negative controls still fire, re-run at this seat** — ⟨cmd⟩ `node
scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-<X>-2026-09-19.md
…universe…json …ledger…md …adjudication…md` → **base GREEN EXIT=0** · **A-pending-unruled RED
EXIT=1** · **B-live-binding RED EXIT=1** · **C-ghost-id RED EXIT=1 (2 checks)**. The `C-ghost-id`
control is the exact class `[F]` caught here, and it still catches it.

**Each half of the cure has its own falsifier** (scratch copies of the cured ledger, never
committed): ⟨cmd⟩ `sed 's/^### F-w4f-1 —/#### F-w4f-1 —/' DIVERGENCE-LEDGER.md > D` then the gate
→ **RED, EXIT=1, `[F] … unknown id `F-w4f-1`` — 1**; ⟨cmd⟩ `sed 's/^#### §11.4 F-w4f-2 —/### §11.4
F-w4f-2 —/' … > E` then the gate → **RED, EXIT=1, `[J] §11.4 F-w4f-2` — 1**. Neither half is
decorative and neither is a narrowing: remove either and the gate returns to RED.

### R1.5 — every gate a cure could move, re-read

The cure touched **one markdown file in `value.js`** and one new evidence file. `<p2>`'s tree, the
packed tarball, the Wasm artefact, the RC-P evaluator, the sibling reciprocity sentences and the
producer package manifests are all untouched by it — so G-3/G-4/G-5 cannot move, and their close
readings, re-reproduced independently by Check 1 §2 hours earlier at these same bytes, stand cited
rather than re-burned. The gates this seat re-ran at its own clock:

| gate | reading at this seat | ≡ |
|---|---|---|
| **G-1** | `VERDICT: GREEN`, **EXIT=0**, double-run identical, `diff -q` silent (R1.3) | **RED → GREEN — the defect is cured** |
| **G-2** | ⟨cmd⟩ `git show --name-only --format='' cf99b1c8 \| grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0**; the same over every commit of this repair → **0**; `dev.sh` in **0** | GREEN, unmoved |
| **G-6** | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25** | GREEN, unmoved |
| **G-7** | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json ../fourier-analysis/web/package.json` → **0** and **0** | GREEN, the inherited floor held |
| **G-8** | ⟨cmd⟩ `ls -l RELEASE-PACKET.md` → **28768 B**; ⟨cmd⟩ the positional column-6 awk over `INBOX.md` → **`ROWS=82 UNREAD=0`** (C1-3's variant A; variant B reads 78/0 — the two differ by 4 rows and agree on `UNREAD=0`, the only load-bearing figure) | GREEN, unmoved |
| **G-3 · G-4 · G-5 · G-9** | not re-burned: no byte this repair wrote is in any of their read sets. Cited at Check 1 §2 — `resolved 52 of 52` sha `004bbcce…` EXIT=0 · `0`/`0` GREEN `f0d063d6…` EXIT=0 · `RC-P(4.0.0) = FALSE — 3 of 6` EXIT=1 (honestly false) · disposition (C) quoted with `BLOCKED-ON` + re-trigger | GREEN, unmoved |
| **G-10** | ⟨cmd⟩ `for f in waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5** — the correct **open** state; the R-A stamp is still **unperformed** | **withheld — now by freshness, not by a red gate** |

**The posture after this repair: G-1..G-9 all GREEN.** G-10's shape-(a) sum is still `5`, because
the stamp is an act, not a measurement, and this seat may not perform it: §6 G-10 and M-23 §1 give
it to a **FRESH** adjudicator, and a seat that has just written the ledger row the stamp certifies
is not fresh. That is **R-C2**, the owner Check 1 §3 already names — now unblocked.

### R1.6 — the Locks addendum, the escalation, and the two INFO rows

**LOCKS — dated addendum-beside to every unit plan in this record (C1-1, second half).** The
fourth sitting's unit plan cleared `.g ∥ .h` as *"no shared modify path"*. That is true of **writes**
and false of the **gate read**, and the whole of C1-1 lives in that gap. Standing from here:

> **§4a's disjointness does not carry to gate reads.** A unit that WRITES a file another unit's
> gate READS is serial behind that gate's re-run, or it owes the re-run itself. A unit returning
> DONE must re-run every wave gate whose read set intersects its own write set, and report the
> reading — "Escalations: none" is not a gate reading. For this wave the concrete lock is:
> `DIVERGENCE-LEDGER.md` · `SEAM-CONTRACT.md` · `ADJUDICATION-W4.md` · `evidence/W3/universe-52.json`
> are **G-1's read set**; any unit granted a write on one of them owes G-1 at its own clock.

**ESCALATION (C1-2, MINOR-mitigated).** The check orders **no cure**; the form it suggests — *"a
dated addendum-beside to §6 G-2 naming the commit predicate as the gate's operative form"* — is a
write to `docs/tranches/X/parse-that/waves/W4.md`, a **dated spec**. §4 File Bounds grants this wave
`modify-carve` on the four sibling wave files' VERIFIED rows only and no write at all on `W4.md`;
spec addenda are the root session's act (E-3). Measured, so the reason is not an opinion: ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/parse-that/waves/W4.md` → **0 lines**, and this repair
left it so. Recorded here; the wave's own reading of G-2 is re-measured GREEN at R1.5 under the
commit predicate the falsifier states, with the working-tree divergence disclosed exactly as the
open and the close disclose it: **13** such rows at this seat's open (10 `demo/**` + 3 `e2e/**`,
a sibling Track-A seat's), and by its last sweep a sibling's `src/**` and `package.json` rows
beside them — **0** of any of it in any commit of this wave.

**C1-3 (INFO)** — no cure inside bounds: the fix is to pin one awk variant in the **E13 idiom**,
which is not a wave artefact. Both variants are re-measured at this seat (R1.5): `ROWS=82 UNREAD=0`
and `ROWS=78 UNREAD=0`. **`UNREAD=0` under both** — E13 is satisfied, and no wave closes with unread
mail in scope.

**C1-4 (INFO)** — accepted as a standing trigger and written down so the next seat cannot miss it:
the four G-1 heads to date are distinct at the bytes (`resolve 19 of 52` → `[E] 37 · [G] 6` →
`[F] 1 · [J] 1`, and this repair's GREEN). **A FIFTH RED in the checker/ledger document-form family
is the same head recurring and goes to the triumvirate under §3a — not to another unit-local cure.**

### R1.7 — bounds, commits, and what this repair did not do

**Writes, all inside the fifth addendum's `.h` grant plus this record.** `DIVERGENCE-LEDGER.md`
(modify, the form of `.h`'s own §11) · `evidence/W4/g1-repair1-2026-09-20.txt` (NEW dated file) ·
this record. **No write** to `SEAM-CONTRACT.md`, `scripts/seam-contract-check.mjs`,
`ADJUDICATION-W4.md`, `W4-CLOSE.md`, `RELEASE-PACKET.md`, `RELEASE-CONDITION.md`, any `waves/*.md`,
`COHESION.md`, `INBOX.md`, the registry, `<p2>`, or any sibling repo. ⟨cmd⟩ `git status --porcelain
-- docs/tranches/X/parse-that/` after the cure → clean but for the paths committed here. Pathspec
commits only, the pathspec repeated on the commit itself; nothing else staged; `scripts/dev/dev.sh`
never touched and in **0** commits.

**This repair did NOT**: perform the R-A stamp · carve either COHESION cell · move a four-verb
`VERIFIED` row · rule a seam cell · retag `RULING_IDS` or regenerate `universe-52.json` · widen or
weaken the checker · touch a producer or a sibling tree · write a spec addendum · re-open a closed
sitting. **X.P.W4S remains PARTIAL on the LEDGER**: nine of ten gates GREEN, G-10 withheld for the
lawful reason that the act belongs to a fresh adjudicator (**R-C2**), who stamps iff G-1..G-9 read
GREEN at its own commands.

---

## Check 2 — FRESH ADVERSARIAL CHECK (L-20, pass 2), of the FOURTH SITTING's close as repaired by Repair 1

SERVED MODEL: `claude-opus-5[1m]` · **CHECK SEAT (pass 2)**, Track D (X·P) · 2026-09-20 ·
**VERIFY-ONLY — this seat cured nothing, wrote no gate instrument, no seam cell, no ledger row, no
four-verb row and no COHESION cell.** No byte above this line is rewritten (E-3); **X.P.W4's CLOSED
row is untouched**.

**Verdict: `NOT-CONFORMANT`** — and, as at pass 1, the reason is narrow and it is not a dishonesty.
**Repair 1's cure reproduces at this seat's own commands**: G-1 reads `VERDICT: GREEN`, `EXIT=0`,
double-run identical, `diff -q` silent — and **all nine of G-1..G-9 now reproduce GREEN at this
seat's own double-run clock**, including the two long runs (G-3's pack-install-resolve to the same
tarball sha, G-5's full-corpus RC-P). No write landed outside §File Bounds, no masking cure exists
in any commit of the repair, the commit families are intact, E-3 holds at the bytes, mail is clean
(`UNREAD=0` under every reading tried here), and the four-verb line did not move.

The single blocking finding is **G-10**, and it is a finding about *relief*, not about honesty.
Check 1 admitted G-10 as HONEST-RED on one ground only — §6 G-10's own falsifier, *"a stamp
performed while any of G-1..G-9 is red fails"*. **Repair 1 turned G-1 GREEN, and that relief
expired with it.** What now withholds the R-A stamp is seat **freshness** (M-23 §1; §5 *"a seat
that authored a gate cannot certify it"*), which the spec answers by **dispatching a fresh Fable
adjudicator**, not by closing the wave. `W4.md` §2's Hard gate names ten conditions and the tenth
is the stamp; §3.9 is the act itself; §2 R-A makes this close **the only site in all of X·P** that
may stamp VERIFIED. A `CLOSED` cell written now would book that act as never-performed for the very
wave minted to perform it — the laundering axis 10 forbids. The row therefore **stays PARTIAL**,
and the owed act is **one dispatch**, fully specified below.

### 1. Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **C2-1** | **HIGH** | **G-10's relief has EXPIRED, and the R-A stamp is now performable and undispatched.** At Check 1 the withholding was *commanded* by §6 G-10's falsifier, because G-1 was RED. Repair 1 cured G-1 (`cf99b1c8`) and **G-1..G-9 all read GREEN at this seat's own commands** (§2). The spec's condition for the act — §0ab's *"iff G-1..G-9 GREEN at its own re-run"* — is now SATISFIED for any seat that re-runs them. The only remaining bar is **freshness**: `.f2` already ran and escalated under the then-RED gate, and the Repair-1 seat, having authored the ledger bytes the stamp certifies, is correctly disqualified (§5, M-23 §1). That is a *dispatch* condition, not a gate relief: nothing in `W4.md` §6 G-10, §2 R-A, or COHESION §0y/§0aa/§0ab routes an unperformed stamp to a later wave, names it as an honest-RED by id, or puts it in a producer's hands. **The record's own routing (R-C2) is a wave-internal residual the wave invented, not a relief the spec gives** — which is exactly the shape axis 10 declines to launder | ⟨cmd⟩ `node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `VERDICT: GREEN`, **EXIT=0**, run twice, ⟨cmd⟩ `diff -q run1 run2` **silent**; ⟨cmd⟩ the G-3 pack-install-resolve → `resolved 52 of 52` · sha `004bbcce02e08b89…` · `G3: GREEN` · **EXIT=0**; ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `0` / `0` · `GREEN` · **EXIT=0**; ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → `RC-P(4.0.0) = FALSE — 3 of 6` · **EXIT=1** (honest); ⟨cmd⟩ G-6 `25` · G-7 `0`/`0` · G-8 packet **28768 B** + `ROWS=82 UNREAD=0` · G-9 disposition **(C)** at `W4-CLOSE.md` §4. **Nine GREEN.** ⟨cmd⟩ the §0ab shape-(a) awk → **5** — the OPEN state, the act unperformed; ⟨cmd⟩ `git status --porcelain -- waves/W[0-4].md COHESION.md` → **0 lines** | **One dispatch, no cure at the bytes by any seat now seated.** A **sixth dated addendum-beside** (the root session's act, as §0y · §0aa · §0ab each were) mints a **FRESH Fable adjudicator** unit — `.f3` — with `.f2`'s writable set verbatim (the five four-verb `VERIFIED` rows · `COHESION.md` §1 SS-5 + §5 · `W4-CLOSE.md` dated §14 · `RELEASE-PACKET.md` dated addendum · `x-p-w4s.json` fold/3). It re-runs G-1..G-10 at its own clock and performs the R-A stamp **iff** G-1..G-9 read GREEN there — sum `5 → 0` in one act, both COHESION carves or neither. Until that seat returns, **X.P.W4S is PARTIAL, not CLOSED** |
| **C2-2** | MINOR (mitigated — non-blocking) | **Repair 1's cure is an in-place edit under a `modify-append` grant, made by a seat that is not `.h`.** §0ab grants `DIVERGENCE-LEDGER.md` to `X.P.W4.h` as *modify-append (the F-w4f-1 row)*; `cf99b1c8` deletes 7 lines and adds 21 inside `## §11`, and the seat that made it is the repair seat | ⟨cmd⟩ `git show --numstat --format='' cf99b1c8` → `21  7  DIVERGENCE-LEDGER.md` · `203  0  evidence/W4/g1-repair1-2026-09-20.txt` — **2 paths, both inside the wave's §File Bounds writable set**. The deleted bytes are `.h`'s own, from the same sitting, never dated evidence. Cell-for-cell preservation **verified mechanically at this seat**, not read: the old 6-column row was split on `\|` and each cell compared to the new `\| field \| value \|` rendering → `subject` **175≡175** · `incumbent (4.0.0)` **414≡414** · `candidate (both lowerings)` **178≡178** · `disposition` **42≡42** · `consumer direction` **453≡453**, **CELL-FOR-CELL: VERIFIED**, with `rulingId` `F-w4f-1` and `entry` `parseStylesheet` as the added subject fields | **Mitigation accepted.** The write is in-bounds for the wave, the reading did not move, Check 1 itself named that grant as the cure's rightful owner, and R1.2/R1.7 disclose the shape rather than smoothing it. No cure ordered; the LOCKS addendum at R1.6 is the durable fix |
| **C2-3** | MINOR (mitigated — carried, unmoved) | **C1-2 stands as escalated**: §6 G-2's literal predicate is a working-tree one, and the wave reads it as a commit predicate | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → non-empty (sibling Track-A rows); ⟨cmd⟩ every commit of the sitting **and** of Repair 1 piped to `grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0**; `scripts/dev/dev.sh` in **0** of them | Unchanged: the cure is a dated addendum to `W4.md` §6 G-2, a **spec** write outside every seat's bounds. Correctly ESCALATED at R1.6, not taken |
| **C2-4** | INFO | **The E13 awk variance (C1-3) is wider than one row-count.** A positional `$6 ~ /UNREAD/` reading answers **UNREAD=4** — every hit the word inside a cell that *begins* `SENT` / `FOLDED` / `READ` (O-20, I-31, I-32, O-39): the X.P.W0 D-1 trap, met again | ⟨cmd⟩ naive `$6 ~ /UNREAD/` → `ROWS=82 UNREAD=4`, all four cells printed and read; ⟨cmd⟩ leading-token census → `ROWS=82 UNREAD_leading=0`; ⟨cmd⟩ `grep -nE '\| *\*{0,2}UNREAD'` → **no table row** (four prose lines in sweep paragraphs only) | Nothing to cure — **`UNREAD=0` under every reading tried here**. The E13 idiom should pin the **leading-token** form, not a column index, since cells carry prose |
| **C2-5** | INFO | **C1-4's standing trigger is not fired, and the family is now at rest.** G-1's fourth head was cured, not re-cured: the four heads are distinct at the bytes and the fifth would go to the triumvirate | ⟨cmd⟩ the heads: `resolve 19 of 52` → `[E] 37 · [G] 6` → `[F] 1 · [J] 1` → **GREEN**; ⟨cmd⟩ the checker's own controls re-run at this seat (§2) still fire | Recorded. §3a's third-iteration trigger has not fired |

**No BLOCKER · no CRITICAL · one HIGH (C2-1) · two MINOR-with-mitigation · two INFO.**

### 2. Every GREEN the record claims, re-run at this seat's own commands — 9 of 9 REPRODUCE

Nothing below is cited. Every reading was executed here, the two long runs backgrounded per the
STALL WATCHDOG and polled, and every writing script given `--out` into the scratchpad so **no byte
of `evidence/W4/**` was touched by this check**.

| gate | the record's published reading | this seat's reading | ≡ |
|---|---|---|---|
| **G-1** | `VERDICT: GREEN`, EXIT=0, double-run identical (R1.3) | ⟨cmd⟩ `node scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `rows: contract 52 · universe 52 · ledger rows 48` · `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · `declared-divergence 7` · `identical 45` · `(COHESION §0v carried: 44 cells over 6 rows)` · `SURFACE-WIDE … S-1, S-4, R2, R3, R5, CN-1, §6.1` (**no `§11.4`**) · **`VERDICT: GREEN`**, **EXIT=0**; run 2 byte-identical, ⟨cmd⟩ `diff -q` **silent** | **YES — every published figure to the number** |
| **G-2** | 0 wave-commit paths under `src`/`demo`/`api`/`test`/`e2e` | ⟨cmd⟩ the **14** commits of the sitting + Check 1 + Repair 1, file lists piped to `grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0**; `scripts/dev/dev.sh` → **0** | **YES** |
| **G-3** | `resolved 52 of 52` · sha `004bbcce…` · `entryCount 91` · refusals 5 · `G3: GREEN` · EXIT=0 | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>` in `<p2>/typescript` → `"tarballSha256": "004bbcce02e08b89020a74e43ce35b83dec2f6f6597204afd8b712cc9dd056ec"` · `"entryCount": 91` · `"resolved": "52 of 52"` · `"refusals": 5` · all legs `true` · `"G3": "GREEN"` · **EXIT=0** | **YES — sha to the byte** |
| **G-4** | `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` · GREEN · EXIT=0 | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `"artifacts": 1` · `"admitted": 1` · `"functionKindImportsTotal": 0` · `"unaccountedImportsTotal": 0` · `"verdict": "GREEN"` · **EXIT=0** | **YES** |
| **G-5** | `RC-P(4.0.0) = FALSE — 3 of 6` (1 · 3 · 4), EXIT=1, honestly false | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` · `KF.W3 does NOT open. The X·V adoption wave's re-trigger does NOT fire.` · **EXIT=1** | **YES — and the gate is GREEN precisely because the predicate is FALSE** |
| **G-6** | 25 hits across 5 files, both far ends | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**, files `KF-W3.md` · `KF-W2.md` · `KF-W10.md` · `KF-W5.md` (X·KF) · `F-W0.md` (X·F). Neither directory appears in any commit of this wave | **YES** |
| **G-7** | 0 / 0 — the INHERITED-GREEN FLOOR | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0**. No transitive copy "cured" | **YES — floor held** |
| **G-8** | packet **28768 B** · `ROWS=82 UNREAD=0` · `RELEASE-PACKET` 3 · `RC-P` 3 · `SS-6` 30 | ⟨cmd⟩ `ls -l RELEASE-PACKET.md` → **28768**; ⟨cmd⟩ `grep -c` in `INBOX.md` → **3** · **3** · **30**; ⟨cmd⟩ leading-token status census → `ROWS=82 UNREAD_leading=0`, run twice identical; ⟨cmd⟩ `git status --porcelain -- INBOX.md` → **0 lines** | **YES** |
| **G-9** | disposition **(C)**, quoted by id from COHESION §0i.1 · S-4, with `BLOCKED-ON` + re-trigger | `W4-CLOSE.md` §4 carries the quoted disposition (`:131`), the `BLOCKED-ON` condition and the re-trigger (`:148`); ⟨cmd⟩ the commit file lists → **0** paths under `docs/tranches/X/waves/` | **YES** |

**G-10 also reproduces, as RED**: ⟨cmd⟩ `for f in waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5 ≡ 5**, the open state, the act unperformed. Second leg ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → **10 lines across 4 files, every one a disclaimer** (*"X.P.W4's to stamp … never this wave's"* · *"VERIFIED is X.P.W4's alone (R-A)"* · *"no wave stamps VERIFIED at its own close"*) — **no sibling self-stamps**.

**The checker still has teeth — the full control set re-run at this seat**, with the fixture
universe/ledger/adjudication `.g` shipped: ⟨cmd⟩ `node scripts/seam-contract-check.mjs
evidence/W4/negctl-w4g-contract-{base,A-pending-unruled,B-live-binding,C-ghost-id}-2026-09-19.md
evidence/W4/negctl-w4g-universe-2026-09-19.json evidence/W4/negctl-w4g-ledger-2026-09-19.md
evidence/W4/negctl-w4g-adjudication-2026-09-19.md` → **base GREEN EXIT=0** · **A RED EXIT=1** ·
**B RED EXIT=1** · **C-ghost-id RED EXIT=1 (2 checks)**. `C-ghost-id` is the exact class `[F]`
caught at C1-1, and it still catches it — so **Repair 1's cure is not a narrowing**: ⟨cmd⟩ `git
status --porcelain -- scripts/seam-contract-check.mjs SEAM-CONTRACT.md` → **0 lines**, and ⟨cmd⟩
`git log -2 -- scripts/seam-contract-check.mjs` shows the instrument last moved at `.g`'s
`31a9d5d8`, **before** the repair. The gate was moved by curing the document, never the reader.

### 3. Honest-RED adjudication (axis 10) — the set is EMPTY, and that is the finding

| gate | RED after Repair 1 | relief examined, at the spec's bytes | verdict |
|---|---|---|---|
| **G-10** | shape-(a) sum `5 ≡ 5`; the R-A stamp unperformed a fourth time | **Producer-owned?** No — the act is five row edits in this repo's own `waves/W[0-4].md` plus two `COHESION.md` cells; no producer is implicated and no upstream tree is involved. **Routed to a successor by the spec's own routing?** No. `W4.md` §2 R-A: *"X.P.W4 advances its own four-verb table row and every sibling X·P wave's from IMPLEMENTED to VERIFIED **in one act at close**"*, and *"VERIFIED is stamped **only at this wave's release close**"*; §3.9 makes the advance a scope item of **this** wave; COHESION §0y gives it to `.f`, §0ab re-gives it to `.f2` — **all inside the wave**. No addendum routes it onward on failure. **A spec-named honest-RED id?** No — G-10 is one of the **nine born-RED** gates §6 says this wave exists to turn, and §2's Hard gate lists *"the R-A stamp"* as the tenth of ten conditions. **The relief Check 1 accepted?** *Expired.* It was §6 G-10's falsifier — *"a stamp performed while any of G-1..G-9 is red fails"* — and **G-1 is no longer red** (§2 above, nine GREEN at this seat's own double-run clock). What is left is **freshness** (§5: *"the adjudicator must be fresh — a seat that authored a gate cannot certify it"*; M-23 §1), a **dispatch** condition whose answer is a seat, not a close | **UNRELIEVED — a real defect (C2-1, HIGH)** |

**The honest-RED set is `∅`.** This check declines to put G-10 in it, and says plainly why the
temptation exists: the record is *honest* about G-10 at every sitting, it refused the two masking
cures that were available to it by name, and it never claimed the stamp. Honesty is not relief.
Under axis 10 a RED gate is relieved only by producer ownership, by the spec's own forward routing,
or by a spec-named id — and G-10 has none of the three now that its one genuine relief has expired
with G-1's cure. **Withholding was the conforming act on 2026-09-19; on 2026-09-20 the conforming
act is the dispatch.**

### 4. The remaining axes, each measured

- **§File Bounds (axis 2)** — ⟨cmd⟩ `git show --stat` over Repair 1's three commits: `cf99b1c8` → `DIVERGENCE-LEDGER.md` (21/7) + `evidence/W4/g1-repair1-2026-09-20.txt` (203/0) · `91853f91` → the record (171/0) · `4558addf` → `LEDGER.md` (2/1). Every path is in the wave's writable set (§0ab's `.h` row · §4's standing `evidence/W4/**` · the record · the ledger's own row, appended and minimally replaced). The eleven commits of the fourth sitting were re-walked here and each path re-checked against its unit's grant — **LANDED-WRONG: NONE**. ⟨cmd⟩ over all **14** commits: **0** paths under `src`/`demo`/`api`/`test`/`e2e`, **0** under `docs/tranches/X/waves/**`, `docs/tranches/X/keyframes/**`, `docs/tranches/X/fourier/**`, `registry/adjudicated/**`, `evidence/W3/**`, and **0** occurrences of `scripts/dev/dev.sh`. ⟨cmd⟩ `git -C ../parse-that log -1` → **`ef10d5b`, 2026-07-05** — the frozen read-only root has not moved in this tranche at all; `<p2>`'s head is `.h`'s `fede7d3`, unmoved by the repair.
- **Masking (axis 3)** — ⟨cmd⟩ `git show <each of the three> \| grep '^+' \| grep -iE 'try *\{\|catch\|test\.skip\|\.skip\(\|allowlist\|\.only\(\|node_modules'` → **two hits, both the record's own prose disclaiming the practice**. The cure did not widen the checker, mint a second row grammar, allowlist an id, retag `RULING_IDS`, regenerate `universe-52.json`, or narrow an assertion — and this seat **proved** the point rather than reading it: the old row's five text cells compare **byte-identical** to the new field table's five values (§1 C2-2), so the gate moved on form alone with every reading preserved. Repair 1's own two falsifiers were re-read and are sound: demote the new heading → `[F]` returns; promote `§11.4` → `[J]` returns.
- **Commit families (axis 4)** — Repair 1 is **one commit per meaning**: the cure and its banked gate output ride one commit (the evidence is the cure's proof, not a separate meaning), the record's §R1 rides one, the ledger row + event line ride one. The §9 `.d` family's stamp members are still absent **together** — five rows and two cells, none moved — so the family is honoured whole, not split. ⟨cmd⟩ each commit carries its own pathspec; ⟨cmd⟩ `4558addf` numstat → **2 insertions, 1 deletion** in `LEDGER.md`, i.e. this wave's own row and one appended event line — **no sibling seat's row swept in**.
- **E-3 (axis 5)** — ⟨cmd⟩ the 14 commits' file lists filtered for `docs/tranches/V/megatranche/registry/adjudicated/` · `docs/tranches/X/waves/**` · `docs/tranches/X/{keyframes,fourier}/**` · `docs/tranches/X/parse-that/waves/W[0-4].md` · `docs/tranches/X/parse-that/evidence/W3/` → **0**. A raw `git diff --stat 2237f305^..HEAD` over those paths **does** print twelve files — and ⟨cmd⟩ `git log --name-only` over the same range attributes every one of them to **Track A's X-W9 seats and Track B's KF-W12 seats** (`4b51a447` · `cf8c54b4` · `10e9a446` · `a37073cf` · `3464a1c9` · `e5d8f196` · `5db5d0f0`), not to one commit of this wave. The dated spec, the adjudicated registry, the W3 conformance artefacts and every sibling spec are **byte-untouched by X.P.W4S**.
- **Mail (axis 6)** — `ROWS=82`, **`UNREAD=0`** under the leading-token census, run twice; ⟨cmd⟩ `grep -nE '\| *\*{0,2}UNREAD'` finds **no table row**; `INBOX.md` is byte-clean in the working tree. The four prose hits a naive positional awk returns are cells that begin `SENT`/`FOLDED`/`READ` (C2-4). **No wave closes with UNREAD mail in scope — none is.**
- **Four-verb (axis 7)** — ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/waves/ docs/tranches/X/COHESION.md` → **0 lines**; shape-(a) sum **5**; per-file `grep -c` reads `1,1,1,3,1` and the two extra hits in `W3.md` are **dated addenda quoting a table**, which §0ab puts outside the sum by construction. Nothing moved — which, while the stamp is undispatched, is the only lawful reading. **X.P.W4's CLOSED row is untouched.**
- **The goal criterion (axis 8) — MET at the bytes, and the repair is what met it.** §2a's three questions: *what exactly does value.js receive* → `SEAM-CONTRACT.md`'s 52 rows, and the row-19 hole Check 1 measured is **closed**: ⟨cmd⟩ `grep -n '^### F-w4f-1' DIVERGENCE-LEDGER.md` → **`:1143`**, so the id row 19 publishes now resolves to a reader-visible ledger row, and G-1's mechanical cross-check agrees (`VERDICT: GREEN`). *How does it arrive* → G-3, 52 of 52 from the **installed** tarball, sha published, refusals asserted. *When may the consumer act* → `RC-P(4.0.0) = FALSE — 3 of 6`, EXIT=1, a script that cannot be argued with. **None of the three is answerable only by reading a status word.** What is unmet is not §2a but §2's tenth hard-gate condition — the act.
- **Published figures (axis 9)** — every figure re-read from the settled bytes: `SEAM-CONTRACT.md` **98058** · `RELEASE-CONDITION.md` **31606** · `RELEASE-PACKET.md` **28768** · `W4-CLOSE.md` **54949** · `x-p-w4s.json` **147196**; G-1's `ledger rows 48` · `declared-divergence 7` · `identical 45` · `§0v carried 44 cells over 6 rows`; G-3's `entryCount 91` · `refusals 5`; G-8's `RELEASE-PACKET` 3 · `RC-P` 3 · `SS-6` 30. **All reproduce.** R1.3's claim that the ledger row count is *unmoved at 48* also reproduces — the cure adds no row and removes none.

### 5. The successor waves' "Opens after" conjuncts, measured against this wave

| successor | conjunct | state at these bytes | reading |
|---|---|---|---|
| **KF.W3** (X·KF) | *"opens if and only if `RC-P(V)` evaluates TRUE per `RELEASE-CONDITION.md` §6a, run against the registry coordinate `V`"* | ⟨cmd⟩ `RC-P(4.0.0) = FALSE — 3 of 6` · `KF.W3 does NOT open.` | **LAWFULLY BLOCKED** — by a measured predicate, not by a schedule and not by the missing stamp; the sentence names the **predicate**, never a wave number (G-6's falsifier satisfied) |
| **F.W0** (X·F) | opening is owner-gated on the X·F lane; its **parser-effects** leg is the RC-P one | the open conjunct is independent of X·P; the parser conjunct is FALSE; ⟨cmd⟩ G-7 `0`/`0` | **not blocked as to opening**; its parser tuple **is** blocked, and the forbidden direct edge is asserted absent |
| **the X·V adoption wave** | does not exist (OP-4 / G-9) | disposition **(C)** `BLOCKED-ON` + re-trigger, recorded at `W4-CLOSE.md` §4; ⟨cmd⟩ **0** commit paths under `docs/tranches/X/waves/` | **LAWFULLY BLOCKED**, and X·P authored no X·V wave to fill the gap |

**No successor is unlawfully opened, and none is blocked by the unperformed stamp** — every
downstream edge in this constellation is keyed on `RC-P`, which is FALSE and honestly so. That is
why C2-1 is **HIGH and not CRITICAL**: nothing false has been published and nothing downstream has
moved on a claim it should not have; the wave is simply one dispatch short of its own tenth gate.

### 6. What this check did not do

It cured nothing, re-dispatched nothing, minted no addendum, and wrote no byte outside this record
and the ledger's own appended event line. It did **not** perform the R-A stamp — this seat is
neither fresh-to-the-wave in the M-23 §1 sense nor a Fable adjudicator, and §5's *"a seat that
authored a gate cannot certify it"* is the same law that disqualified the Repair-1 seat. It did not
widen, retag or regenerate any instrument to move a gate, and it did not touch `<p2>`, `../parse-that`,
`../glass-ui` or any producer tree. **The LEDGER status cell stays `PARTIAL`**: on this reading
X.P.W4S is not closed, because its tenth hard-gate condition is now performable and unperformed,
and a `CLOSED` cell over it would be exactly the laundering axis 10 forbids.

---

## Repair 2 — ROUND 2, on Check 2's register (C2-1 HIGH)

SERVED MODEL: `claude-opus-5[1m]` · **REPAIR SEAT (round 2)**, Track D (X·P) · 2026-09-20. No byte
above this line is rewritten (E-3); the fourth sitting's open, receipts, close, Check 1, Repair 1
and Check 2 stand as written. **This seat cured nothing at the bytes and says so first.** Check 2's
one blocking defect is the R-A stamp itself, and its cure — *"ONE dispatch, no cure at the bytes by
any seat now seated"* — lies outside every seated unit's §File Bounds by three independent
measurements. It is **ESCALATED**, with the reason measured rather than asserted, and with the
dispatch reduced to one paste. **X.P.W4S stays PARTIAL.**

**Tally: 0 cured · 2 escalated (C2-1 HIGH, C2-3 MINOR-carried) · 3 recorded (C2-2, C2-4, C2-5).**
G-1..G-9 re-read GREEN at this seat's own clock; G-10 re-reads `5`, the open state, the act
unperformed a fifth time.

### R2.0 — CRASH-RECOVERY sweep, before any write

⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/D/X-P-W4S.md
docs/tranches/X/execution/LEDGER.md docs/tranches/X/parse-that/` → **0 lines**. **No killed
predecessor's partial work on this unit exists**; nothing was inherited, nothing stashed, nothing
restored. ⟨cmd⟩ `git status --porcelain` (whole tree) → **15** rows, every one a sibling track's
(`demo/**` · `e2e/**` · `CARRY-LEDGER.md` · `execution/A/X-W5.md` · `execution/LEDGER.md` ·
`scripts/dev/dev.sh`, unowned and NEVER touched) — **none inside this seat's writable set, none
touched, none staged**. ⟨cmd⟩ `git -C <p2> log --oneline -1` → **`fede7d3`** — `X.P.W4.h`'s head,
**unmoved** since the third sitting; this repair wrote no byte there. ⟨cmd⟩ `git status
--porcelain -- docs/tranches/X/parse-that/waves/ docs/tranches/X/COHESION.md` → **0 lines**, before
and after.

**The tree MOVED under this seat while it worked, and the shared index is not empty.** By the last
sweep: ⟨cmd⟩ `git status --porcelain` → **17** rows — a sibling had committed its
`execution/LEDGER.md` row away (⟨cmd⟩ `git diff --stat -- docs/tranches/X/execution/LEDGER.md` →
empty) and had **STAGED a deletion**, ⟨cmd⟩ `git diff --cached --name-only` →
**`demo/shell/PaneSegmentedControl.vue`**, a single row sitting in the index this seat shares with
three other tracks. It is not this wave's, it was not touched, it was never unstaged — **and it is
exactly why the pathspec is repeated on the commit itself**: a bare `git commit` here would have
swept a sibling's staged deletion into an X·P commit, the contamination measured at X-W0. ⟨cmd⟩
`git status --porcelain -- src api demo test e2e` → **13** rows (**10** `demo/**` · **3**
`e2e/**`), unchanged across the movement.

### R2.1 — Defect register, each row dispositioned

| # | severity | disposition | where |
|---|---|---|---|
| **C2-1** | **HIGH** | **ESCALATED — no cure at the bytes is lawful for any seat now seated.** Three independent bars, each measured: the minting addendum is a **dated-spec / root-session write** (`waves/W4.md` + a new `COHESION.md §0*` section), the stamp paths are granted to a **fresh Fable adjudicator alone**, and this seat is **neither fresh nor Fable**. The dispatch is reduced to one paste at R2.2.4 | R2.2 |
| **C2-2** | MINOR (mitigated) | **NO CURE ORDERED** by the check itself (*"Mitigation accepted … No cure ordered"*); the durable fix is Repair 1's LOCKS addendum at R1.6, already landed. **RECORDED** | R2.4 |
| **C2-3** | MINOR (mitigated, carried) | **ESCALATION CARRIED, unmoved.** The only cure is a dated addendum to `W4.md` §6 G-2 — the same dated-spec surface C2-1's cure needs, outside every seat's bounds. Re-measured here | R2.3 |
| **C2-4** | INFO | **RECORDED, no cure** — the suggested fix pins a variant in the **E13 idiom**, not a wave artefact and in no unit's grant. A **third** reading is measured here and agrees on the load-bearing figure | R2.4 |
| **C2-5** | INFO | **RECORDED** — the family is at rest; §3a's third-iteration trigger has not fired. This repair adds no G-1 head: G-1 was GREEN before it and is GREEN after it | R2.4 |

**No defect at ≥ MEDIUM was cured, because none at ≥ MEDIUM has a cure inside bounds.** That is the
whole finding, and it is the same finding Check 2 reached from the other side.

### R2.2 — C2-1, the escalation, measured

**The defect reproduces, first.** ⟨cmd⟩ `for f in waves/W[0-4].md; do awk '/^### Four-verb
status/{t=1;next} /^#/{t=0} t' "$f"; done | grep -c 'VERIFIED | \*\*NO\*\*'` → **5** — COHESION
§0ab's shape-(a), the OPEN state, the act unperformed. ⟨cmd⟩ `grep -rn 'VERIFIED'
waves/W[0-3]-CLOSE.md | wc -l` → **10**, every line a disclaimer; **no sibling self-stamps**.
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/waves/ docs/tranches/X/COHESION.md` →
**0 lines**. Check 2's reading, to the number.

**And the relief is gone, as Check 2 says.** ⟨cmd⟩ `node scripts/seam-contract-check.mjs
SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → **`VERDICT: GREEN`**,
**EXIT=0**; run 2 byte-identical; ⟨cmd⟩ `diff -q run1 run2` → **silent**. §6 G-10's falsifier
(*"a stamp performed while any of G-1..G-9 is red fails"*) no longer bites. This seat agrees with
Check 2 and does not re-argue it.

#### R2.2.1 — Bar 1: the minting act is a dated-spec write, and this wave has no grant on it

The cure Check 2 names is *"a **sixth dated addendum-beside** (the root session's act, as §0y ·
§0aa · §0ab each were)"*. Measured at the bytes, that act is two writes, and this wave holds
neither:

- ⟨cmd⟩ `grep -cE '^\*\*ADDENDUM 2026-09-19' docs/tranches/X/parse-that/waves/W4.md` → **5** — the
  five addenda live **inside `W4.md`**, the dated spec. `W4.md` §4 File Bounds grants this wave
  `modify-carve` on `waves/W0.md`–`W3.md`'s **VERIFIED row only** and **no write at all on
  `W4.md`**; E-3 makes the dated spec IMMUTABLE and its corrections the root session's addenda.
  ⟨cmd⟩ `git log -1 --format='%h %ad %s' --date=short -- waves/W4.md` → **`e105059c` 2026-09-19**,
  *"docs(X·exec): §0ab — … units .g ∥ .h → .f2 minted"* — **the root session's own commit**, which
  is the precedent and also the disqualification: every one of the five was landed by that seat,
  never by a wave unit.
- The paired `COHESION.md` section. `W4.md` §4 grants `docs/tranches/X/COHESION.md` as
  **`modify-carve` — §1 SS-5 status cell and §5 status board line only**, and states that *"§2's
  edge text and §1's SS-6 row are authored by the root session and are quoted here, never
  rewritten"*. A **new `## §0*` ruling section** is neither of the two carved cells.

**This is the same surface C2-3's cure needs**, which is why the two escalations are one act for
the root session and are stated together at R2.3.

#### R2.2.2 — Bar 2: the stamp paths are granted to a fresh Fable adjudicator alone

⟨quote⟩ `W4.md` §5: *"`.d` is a **fresh Fable adjudicator** (M-23 §1): the sub-tranche release
close is an adjudication act, it is the only site that stamps VERIFIED, and the adjudicator must be
fresh — **a seat that authored a gate cannot certify it**."* ⟨quote⟩ §4a: the four sibling waves'
VERIFIED table rows, `INBOX.md` and the two COHESION cells are **`.d`'s** and no one else's.
⟨quote⟩ COHESION §0y re-gives that set to **`.f`**; §0ab re-gives it to **`.f2`** — *"(fresh Fable)
— the third addendum's `.f` stamp set … **iff G-1..G-9 GREEN at its own re-run**"*. Three grants,
three fresh-Fable holders, **zero** of them this seat.

#### R2.2.3 — Bar 3: this seat is neither fresh nor Fable, and it is now less fresh than it was

**SERVED MODEL: `claude-opus-5[1m]`** — line 1 of this section, and not a Fable instance; M-23 §1's
model seat is missed on its face. And freshness: this seat has now read Check 2's register, re-run
nine of the ten gates, and authored these bytes. ⟨cmd⟩ `grep -n 'X.P.W4S' execution/LEDGER.md` →
the row and the event lines record **`claude-opus-5[1m]`** at every X·P sitting since 2026-09-19 —
open, close, Check 1, Repair 1, Check 2. §5's *"a seat that authored a gate cannot certify it"* is
the same law that disqualified the Repair-1 seat at R1.5 and the Check-2 seat at its §6.

**A fourth bar, for completeness**: even a lawful holder must satisfy §0ab's *"iff G-1..G-9 GREEN
**at its own re-run**"*. This seat's re-run is not that seat's, and a stamp resting on a cited
reading would be the cached-verdict failure §6 G-5's falsifier names in the neighbouring gate.

**Therefore the conforming act for a seat with this seat's grants is to escalate**, and the
non-conforming acts are enumerated so the next reader can see they were considered and refused:
performing the stamp (bars 2 + 3), writing the addendum (bar 1), minting `.f3` without an addendum
(a wave inventing its own unit — the exact shape Check 2 §3 declines to launder in `R-C2`), or
writing `CLOSED` on the LEDGER row (the laundering axis 10 forbids). **None was taken.**

#### R2.2.4 — the dispatch, reduced to one paste (a PROPOSAL in this record; NOT LANDED anywhere)

Everything below is **text in this execution record**. It is **not** written into `W4.md`, **not**
written into `COHESION.md`, and neither file moved: ⟨cmd⟩ `git status --porcelain -- waves/
../COHESION.md` → **0 lines** after this repair, exactly as before it.

**The collision-free section id, measured — not guessed.** ⟨cmd⟩ `grep -oE '^## §0[a-z]+'
docs/tranches/X/COHESION.md | sort -u` → **34** ids, `§0a … §0z · §0aa · §0ab · §0ac · §0ad · §0ae
· §0af · §0ag`. `§0ac` is **already taken** by Track A's runner ruling of 2026-09-19, so the
"next" id a reader would reach for by counting the X·P addenda (`§0ac`) **would collide**. The
first free id is **`§0ah`**.

> **PROPOSED ADDENDUM (sixth, beside — E-3; COHESION §0ah). Unit `X.P.W4.f3` (a FRESH Fable
> adjudicator, M-23 §1).** G-10's Check-1 relief expired with G-1's cure at `cf99b1c8`: G-1..G-9
> read GREEN at two independent seats' own double-run clocks (Repair 1 §R1.5, Check 2 §2), the
> R-A stamp is performable and undispatched, and every seat then seated is disqualified by
> freshness or by model seat. `.f3` carries **`.f2`'s writable set verbatim**: the five four-verb
> `VERIFIED` rows of `waves/W[0-4].md` (R-A, **one act**) · `COHESION.md` §1 SS-5 cell + §5 board
> line (**both carves or neither**) · `waves/W4-CLOSE.md` (append a dated §14) ·
> `RELEASE-PACKET.md` (dated addendum) · `registry/harvest/x-p-w4s.json` (fold/3). It re-runs
> **G-1..G-10 at its own clock** and performs the stamp **iff G-1..G-9 read GREEN there** —
> §0ab shape-(a) sum **5 → 0** in one act. It stamps **VERIFIED, never ACCEPTED** (§12, L-18). If
> any of G-1..G-9 reads RED at its clock it performs nothing, records the id, and X.P.W4S stays
> PARTIAL. The §9 `.d` commit family (five rows + two cells) **must not split**.

**What the dispatching seat should know before it reads the record whole**: the stamp is the
wave's **tenth hard-gate condition** (`W4.md` §2), not a residual; `R-C2` is a wave-invented
routing that Check 2 §3 refused; and the act's only live precondition — G-1..G-9 GREEN — is
satisfied at these bytes and has been re-measured at R2.5 below.

### R2.3 — C2-3, the carried escalation, re-measured

`W4.md` §6 G-2's literal predicate is a **working-tree** one — *"`git -C … status --porcelain --
src api demo test e2e` is empty at **every commit**"* — and this wave reads it as a **commit**
predicate. Re-measured at this seat, both legs:

- ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **non-empty** — **13** rows, **10**
  under `demo/**` and **3** under `e2e/**`, every one a sibling Track-A seat's and none this
  wave's. The literal reading is FALSE and has been FALSE at every X·P sitting.
- ⟨cmd⟩ each of `cf99b1c8` · `91853f91` · `4558addf` · `9d16ac59` piped to
  `git show --name-only --format='' <c> | grep -cE '^(src|demo|api|test|e2e)/'` → **0 · 0 · 0 ·
  0**; ⟨cmd⟩ the same four grepped for `scripts/dev/dev.sh` → **0 · 0 · 0 · 0**. The commit reading
  is TRUE, and it is the reading the gate's own *falsifier* states — *"one byte under those paths
  **at any commit** fails the wave"*.

**The cure is unchanged and still outside bounds**: a dated addendum to `W4.md` §6 G-2 naming the
commit predicate as the gate's operative form — the same dated-spec surface R2.2.1 measures, in
the same root-session act. ⟨cmd⟩ `git status --porcelain -- waves/W4.md` → **0 lines**, and this
repair left it so. **ESCALATION CARRIED**, non-blocking, disclosed at every sitting since Check 1.

### R2.4 — C2-2, C2-4 and C2-5, recorded

**C2-2 (MINOR, mitigated).** Check 2 ordered **no cure** (*"Mitigation accepted … the LOCKS
addendum at R1.6 is the durable fix"*), and that addendum is already landed in this record at
`91853f91`. Re-measured here: ⟨cmd⟩ `git show --numstat --format='' cf99b1c8` → `21 7
DIVERGENCE-LEDGER.md` · `203 0 evidence/W4/g1-repair1-2026-09-20.txt` — **2 paths, both inside the
wave's §File Bounds writable set** (§0ab's `.h` row · §4's standing `evidence/W4/**`). Nothing to
cure; re-opening the shape would rewrite bytes E-3 protects.

**C2-4 (INFO) — a THIRD reading, and it agrees.** This seat's own row-count variant is wider than
either of the two on the record: ⟨cmd⟩ `awk -F'|' '/^\|/{n++} END{print n}'
docs/tranches/V/coordination/INBOX.md` → **107** (⟨cmd⟩ of which **5** are separator rows; the
variant counts every line beginning `|`, table headers and separators included). The record's
variants read **82** and **78**. **The file did not move**: ⟨cmd⟩ `git log -1 --format='%h'
-- docs/tranches/V/coordination/INBOX.md` → **`422dc086`**, which predates Check 2's commit
`9d16ac59`, and ⟨cmd⟩ `git status --porcelain -- docs/tranches/V/coordination/INBOX.md` → **0
lines** — so the spread is **purely a counting idiom**, three variants over identical bytes.
**The load-bearing figure is unanimous**: ⟨cmd⟩ the leading-token census → **`UNREAD_leading=0`**;
⟨cmd⟩ the naive positional `$6 ~ /UNREAD/` → **4**, and all four printed here are cells that
*begin* `SENT` / `FOLDED` / `READ` (`:99` SENT 2026-08-28 · `:103` FOLDED 2026-09-17 · `:105` READ
IN FULL 2026-09-19 · `:126` SENT 2026-09-19) — the X.P.W0 D-1 trap, met a third time and caught a
third time. **E13 is satisfied: no wave closes with UNREAD mail in scope, and none is.** The fix
Check 2 names — pin the leading-token form in the E13 idiom — remains outside every unit's grant.

**C2-5 (INFO).** The trigger is still unfired and this repair does not fire it: **this repair
authored no gate instrument and no ledger row**, so G-1 has no fifth head. ⟨cmd⟩ `git status
--porcelain -- docs/tranches/X/parse-that/scripts/seam-contract-check.mjs
docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md` →
**0 lines**. G-1 was GREEN before this repair and is GREEN after it.

### R2.5 — every gate a cure could move, re-read

**No cure landed, so no gate could move** — and the claim is not left as an inference. This repair
wrote **two paths**: this record and the LEDGER's own row + event line. Neither is in any gate's
read set: G-1 reads `SEAM-CONTRACT.md` · `evidence/W3/universe-52.json` · `DIVERGENCE-LEDGER.md` ·
`ADJUDICATION-W4.md`; G-3/G-4/G-5 read `<p2>`'s tree and the registry; G-6/G-7 read sibling specs
and producer manifests; G-8 reads `RELEASE-PACKET.md` and `INBOX.md`; G-10 reads `waves/W[0-4].md`
and `W[0-3]-CLOSE.md`. The fast gates were re-run anyway, at this seat's own clock:

| gate | reading at this seat | ≡ |
|---|---|---|
| **G-1** | ⟨cmd⟩ `node scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `SURFACE-WIDE ledger rows … S-1, S-4, R2, R3, R5, CN-1, §6.1` (no `§11.4`) · **`VERDICT: GREEN`**, **EXIT=0**; run 2 byte-identical; ⟨cmd⟩ `diff -q` **silent** | **GREEN — Repair 1's cure reproduces a third time** |
| **G-2** | ⟨cmd⟩ the four commits of Repair 1 + Check 2 → **0** paths under `src`/`demo`/`api`/`test`/`e2e`, **0** occurrences of `scripts/dev/dev.sh`; the two commits of THIS repair re-checked at R2.6 → **0** and **0** | GREEN under the commit predicate; C2-3's disclosure carried |
| **G-6** | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25** | GREEN, unmoved — and X·P wrote no byte in either directory |
| **G-7** | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0** | GREEN — the inherited floor held; no transitive copy "cured" |
| **G-8** | ⟨cmd⟩ `wc -c < RELEASE-PACKET.md` → **28768**; ⟨cmd⟩ leading-token census over `INBOX.md` → **`UNREAD_leading=0`** (three row-count variants, R2.4; `UNREAD=0` under all three) | GREEN, unmoved |
| **G-10** | ⟨cmd⟩ §0ab shape-(a) → **5**; ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md \| wc -l` → **10**, all disclaimers | **RED — the open state, the act unperformed a FIFTH time. C2-1.** |
| **G-3 · G-4 · G-5 · G-9** | **not re-burned** (STALL WATCHDOG: a long run this repair cannot move is a silent generation, not evidence). ⟨cmd⟩ `git -C <p2> log --oneline -1` → **`fede7d3`**, unmoved since `.h`; `<p2>` holds every byte those three read. Banked at Check 2 §2, re-run there at that seat's own clock: `resolved 52 of 52` · sha `004bbcce02e08b89…` · `entryCount 91` · `refusals 5` · `G3: GREEN` EXIT=0 · `0`/`0` GREEN EXIT=0 · `RC-P(4.0.0) = FALSE — 3 of 6` EXIT=1 (honestly false) · disposition **(C)** at `W4-CLOSE.md` §4 | GREEN, cited not re-claimed |

**The posture is unchanged by this repair, and that is the correct outcome**: G-1..G-9 GREEN,
G-10 RED, honest-RED set **∅**, one dispatch owed. A repair that moved a figure here would have
moved it by writing somewhere it had no grant.

### R2.6 — bounds, commits, and what this repair did not do

**Writes — two paths, both this wave's own record surface.**
`docs/tranches/X/execution/D/X-P-W4S.md` (this `## Repair 2` section, appended; **no byte above it
rewritten**, E-3) and `docs/tranches/X/execution/LEDGER.md` (this wave's row cell, minimally
replaced in place, plus **one appended** dated event line — re-read immediately before editing,
per the standing law that four tracks edit it concurrently). Two commits, **one per meaning**, each
with its own pathspec repeated **on the commit itself**; nothing else staged; the hashes are named
on the LEDGER event line.

**No write** to: `W4.md` or any `waves/*.md` · `COHESION.md` · `SEAM-CONTRACT.md` ·
`DIVERGENCE-LEDGER.md` · `ADJUDICATION-W4.md` · `W4-CLOSE.md` · `RELEASE-PACKET.md` ·
`RELEASE-CONDITION.md` · `scripts/seam-contract-check.mjs` · `evidence/W4/**` · `INBOX.md` · the
registry (`harvest/**`, `DEFECT-LEDGER.md`, `adjudicated/**`) · `<p2>` · `../parse-that` ·
`../glass-ui` · any producer tree. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/
docs/tranches/X/COHESION.md docs/tranches/V/coordination/INBOX.md
docs/tranches/V/megatranche/registry/` → **0 lines**, after the repair as before it.
`scripts/dev/dev.sh` never touched, never staged, and in **0** commits of this repair.

**This repair did NOT**: perform the R-A stamp · carve either COHESION cell · move a four-verb
`VERIFIED` row · mint `.f3` or any unit · write a spec addendum · rule a seam cell · retag
`RULING_IDS` · touch or widen any gate instrument · write `CLOSED` on the LEDGER row · re-open a
closed sitting · re-argue Check 2's verdict.

**E13 (axis 6), swept at open and re-measured at close**: `INBOX.md` byte-clean in the working
tree, `UNREAD_leading=0` under the leading-token census and `UNREAD=0` under all three row-count
variants (R2.4). **No UNREAD mail in scope.**

**Terminal posture. `X.P.W4S` stays `PARTIAL`.** Ten hard-gate conditions; **nine GREEN, one RED**;
honest-RED set **∅**; the owed act is **one dispatch of a fresh Fable adjudicator `.f3`**, minted
by a sixth dated addendum-beside at the collision-free id **`COHESION §0ah`** (R2.2.4), whose text
is written out there in full so the root session's act is one paste. **Escalations returned by this
seat: C2-1 (HIGH) and C2-3 (MINOR-carried) — both resolve on the same dated-spec surface, in the
same root-session act.** Cured at the bytes by this seat: **0**, because **0** of the register's
defects has a cure inside any seated unit's §File Bounds, and a cure invented to make the tally
non-zero would have been the masking this wave has refused at five sittings running.

---

## Check 3 — FRESH ADVERSARIAL CHECK (L-20, pass 3) of the FOURTH SITTING's close as repaired by Repair 1 and escalated by Repair 2

SERVED MODEL: `claude-opus-5[1m]` · **CHECK SEAT (pass 3)**, Track D (X·P) · 2026-09-20 ·
**VERIFY-ONLY — this seat cured nothing, wrote no gate instrument, no seam cell, no ledger row, no
four-verb row, no COHESION cell and no byte of `<p2>`.** No byte above this line is rewritten
(E-3); **X.P.W4's CLOSED row is untouched**.

**Verdict: `NOT-CONFORMANT`** — and the finding is the same one pass 2 reached, re-measured
independently rather than cited, plus **one finding neither prior pass made**.

**Nine of nine claimed GREENs reproduce at this seat's own commands** (§2), including both long
runs: G-3 packs, installs and resolves to the **same tarball sha**, and G-5's full-corpus RC-P is
honestly FALSE. The G-1 checker still has teeth at this seat — **base GREEN, three negative
controls RED** — so Repair 1's cure moved the document, never the reader. No write landed outside
§File Bounds across the wave's **19** commits, no masking cure exists in any of them, the commit
families are intact, E-3 holds at the bytes, mail carries **no UNREAD status cell**, and the
four-verb line did not move.

**G-10 is RED, unrelieved, for the sixth consecutive reading.** The R-A stamp — the tenth of §2's
ten hard-gate conditions and the act this supplement wave was minted to perform (COHESION §0y) —
is performable (`.f2`'s condition *"iff G-1..G-9 GREEN at its own re-run"* is satisfied at two
independent seats' clocks and now a third) and undispatched. This seat re-walked the relief
question at the spec bytes and reaches pass 2's answer: **the honest-RED set is `∅`**.

**The new finding (C3-2): §3a's third-diagnostic-iteration trigger has FIRED for G-10**, and the
cure Repair 2 proposes is shaped as a bare redispatch, which §3a forbids.

### 1. Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **C3-1** | **HIGH** | **G-10 RED and unrelieved — the R-A stamp is performable and undispatched.** Carried forward from C2-1, re-measured here and **not** re-argued from the record: the three axis-10 reliefs are each absent at the spec bytes. **Producer-owned?** No — the act is five row edits in this repo's `waves/W[0-4].md` plus two `COHESION.md` cells; no producer tree is implicated. **Routed to a successor by the spec's own routing?** No — `W4.md` §2 R-A binds the act to *"this wave's release close"*, §3.9 makes it a scope item of this wave, and COHESION §0y → §0aa → §0ab each re-give the same set to a seat **inside** the wave (`.d` → `.f` → `.f2`); no addendum routes it onward on failure. **An honest-RED the spec names by id?** No — G-10 is one of §6's **nine born-RED** gates the wave exists to turn, and §2's Hard gate lists *"the R-A stamp"* as the tenth condition. **Check 1's relief** (§6 G-10's falsifier, *"a stamp performed while any of G-1..G-9 is red fails"*) **expired with G-1's cure** and has not returned | ⟨cmd⟩ `for f in waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5** (§0ab shape (a) — the OPEN state); ⟨cmd⟩ per-file `grep -c` → `1,1,1,3,1`, the two extra `W3.md` hits dated addenda quoting a table, outside the sum by construction; ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → **10 lines, every one a disclaimer** (*"X.P.W4's to stamp … never this wave's"* · *"VERIFIED is X.P.W4's alone (R-A)"*) — **no sibling self-stamps**; ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/ docs/tranches/X/COHESION.md docs/tranches/V/coordination/INBOX.md docs/tranches/V/megatranche/registry/` → **0 lines**; and the act's only live precondition re-measured at this seat: **G-1..G-9 all GREEN** (§2) | **One dispatch, in §3a's mandatory form (see C3-2) — no cure at the bytes is lawful for any seat now seated.** Repair 2's three bars re-verified here: the minting act is a dated-spec write (⟨cmd⟩ `grep -cE '^\*\*ADDENDUM 2026-09-19' waves/W4.md` → **5**, all inside the immutable spec, last moved by the root session at `e105059c`), the stamp paths are granted to a **fresh Fable adjudicator alone** at three separate grants, and this seat is **neither fresh nor Fable** (`claude-opus-5[1m]`, and it has now re-run nine gates and authored these bytes). **X.P.W4S stays PARTIAL** |
| **C3-2** | **MEDIUM** (new at this pass — it shapes the owed act, it does not add a red gate) | **§3a's third-diagnostic-iteration trigger has FIRED for G-10, and no record applies it there.** `W4.md` §3a: *"**Third diagnostic iteration.** Any gate re-run three times without a monotone change"*, under a heading that reads *"Mandatory (research + plan augment + redress); **the orchestrator may not redispatch the failing unit alone**."* Every sitting since the third has tracked this trigger **for G-1 only** — correctly, since G-1's head moved each time (G-3 → E-w4f-1 → E-w4f2-1 → the §11 form) — and **none has applied it to G-10**, whose reading has been the identical `5` at six consecutive seats with **no monotone change at all**: `.f2`'s own re-run · the fourth sitting's close §2 · Check 1 · Check 2 · Repair 2 §R2.5 · this seat. Repair 2's proposed `§0ah` mints `.f3` as *"`.f2`'s writable set verbatim"* — i.e. **the failing unit redispatched alone**, which is the precise act §3a's heading forbids once the trigger has fired | ⟨cmd⟩ `grep -n 'Third diagnostic iteration' docs/tranches/X/parse-that/waves/W4.md` → **`:155`**, and `:143` for *"the orchestrator may not redispatch the failing unit alone"*; ⟨cmd⟩ `grep -c 'shape-(a)\|shape (a)' docs/tranches/X/execution/D/X-P-W4S.md` → the readings, each printed `5`; ⟨cmd⟩ the record's own diagnostic-iteration paragraphs (§7 of the fourth sitting · C2-5 · R2.4) name **G-1** and no other gate | **The `§0ah` addendum Repair 2 wrote out must carry §3a's form, not a bare re-seat**: research (why five dispatched adjudicator seats have not performed a five-row edit) + plan augment (a grant that survives the seat, e.g. the stamp act stated as a standalone dated act with its own precondition) + redress. The orchestrator may not simply re-run `.f`/`.f2`'s shape a third time and expect a different result. **Outside every seated unit's §File Bounds — ESCALATED with C3-1, same root-session act** |
| **C3-3** | MINOR (mitigated — carried, unmoved) | **C1-2 / C2-3 stand as escalated**: §6 G-2's literal predicate is a working-tree one; the wave reads it as a commit predicate | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **13** rows (**10** `demo/**` · **3** `e2e/**`), every one a sibling Track-A seat's; ⟨cmd⟩ all **19** of this wave's commits piped to `grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0**, and `scripts/dev/dev.sh` in **0** of them | Unchanged: a dated addendum to `W4.md` §6 G-2, the same dated-spec surface C3-1 and C3-2 need. Correctly ESCALATED, non-blocking |
| **C3-4** | MINOR (mitigated — disclosed, owner-named) | **The L-13 harvest sub-gate reads 4 of 6.** `W4.md` §5 `.d`'s sub-gate requires the harvest JSON's seat count to equal the units dispatched | ⟨cmd⟩ `node -e` over `registry/harvest/x-p-w4s.json` → `dispatched` **6** · `harvestedUnitRows` **4** · `absent` **`["X.P.W4.f","X.P.W4.f2"]`** · `zeroRowSeats` **`[]`**, with the file's own reading printed: *"RED under L-13's letter (4 of 6)"* | **Mitigation accepted, no cure ordered.** `.f2`'s absence is structural (*a harvesting unit cannot appear in its own harvest*) and `.f`'s is a journal/harvester finding; the record files it as **R-C3** with owner **X-W11's HARVEST lane**, and `registry/harvest/**` is in no currently seated unit's grant. It is a sub-gate, not one of §6's ten |
| **C3-5** | INFO | **The checker retains its teeth at an independent seat — Repair 1's cure is confirmed non-masking a second time, by control rather than by cell comparison** | ⟨cmd⟩ the four fixtures re-run at this seat: `negctl-base` **EXIT=0** · `negctl-A-pending-unruled` **EXIT=1** · `negctl-B-live-binding` **EXIT=1** · `negctl-C-ghost-id` **EXIT=1**. `C-ghost-id` is the exact `[F]` class Check 1 caught, and it still fires; ⟨cmd⟩ `git status --porcelain -- scripts/seam-contract-check.mjs` → **0 lines**, the instrument last moved at `.g`'s `31a9d5d8`, **before** the repair | Recorded. The gate was moved by curing the document, never the reader |

**No BLOCKER · no CRITICAL · one HIGH (C3-1) · one MEDIUM (C3-2) · two MINOR-with-mitigation · one INFO.**

### 2. Every GREEN the record claims, re-run at this seat's own commands — 9 of 9 REPRODUCE

Nothing below is cited from a prior pass. Every reading was executed here; the two long runs were
backgrounded per the STALL WATCHDOG and polled; every writing script was given `--out` into the
scratchpad, so **no byte of `evidence/W4/**` was touched by this check**.

| gate | the record's published reading | this seat's reading | ≡ |
|---|---|---|---|
| **G-1** | `VERDICT: GREEN`, EXIT=0, double-run identical (R1.3, C2 §2, R2.5) | ⟨cmd⟩ `node scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md` → `rows: contract 52 · universe 52 · ledger rows 48` · `universe tally {"TOTAL":46,"PARTIAL":6,"ABSENT":0}` · `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · `declared-divergence 7` · `identical 45` · `(COHESION §0v carried: 44 cells over 6 rows)` · `§10 RETIRED rows: CN-2, CN-3, R4` · `bindings those retirements release: 37` · `SURFACE-WIDE … S-1, S-4, R2, R3, R5, CN-1, §6.1` (**no `§11.4`**) · **`VERDICT: GREEN`**, **EXIT=0**; run 2 byte-identical, ⟨cmd⟩ `diff -q run1 run2` **silent** | **YES — every published figure to the number** |
| **G-2** | 0 wave-commit paths under `src`/`demo`/`api`/`test`/`e2e` | ⟨cmd⟩ the **19** commits of the sitting + the two checks + the two repairs + the ledger rows, file lists piped to `grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0**; `scripts/dev/dev.sh` → **0** | **YES** (under the commit predicate; C3-3's disclosure carried) |
| **G-3** | `resolved 52 of 52` · sha `004bbcce…` · `entryCount 91` · refusals 5 · `G3: GREEN` · EXIT=0 | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md --out <scratch>` in `<p2>/typescript` → `"candidate": "@mkbabb/parse-that@1.0.0"` · `"tarballSha256": "004bbcce02e08b89020a74e43ce35b83dec2f6f6597204afd8b712cc9dd056ec"` · `"entryCount": 91` · `"symbolCounts": {runtime 19, types 33, total 52}` · `"resolved": "52 of 52"` · `"refusals": 5` · every leg `true` · `"G3": "GREEN"` · **EXIT=0** | **YES — sha to the byte** |
| **G-4** | `functionKindImportsTotal 0` · `unaccountedImportsTotal 0` · GREEN · EXIT=0 | ⟨cmd⟩ `node scripts/wasm-admission.mjs src/css/build/ac1.wasm` → `"artifacts": 1` · `"admitted": 1` · `"functionKindImportsTotal": 0` · `"unaccountedImportsTotal": 0` · `"verdict": "GREEN"` · **EXIT=0** | **YES** |
| **G-5** | `RC-P(4.0.0) = FALSE — 3 of 6` (1 · 3 · 4), EXIT=1, honestly false | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version 4.0.0` → six rows, five `MEASURED yes` and conjunct 4 `MEASURED NO` with its reason printed (*"V's installed bytes contain zero .wasm artifacts, so the admission has no subject — FALSE, not vacuously true"*, Q-RC-2) · `3 EQUIVALENCE(V) FALSE — arm V read 20962 mirror-defects over V's installed /css (full corpus, no limit)` · `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` · `KF.W3 does NOT open.` · **EXIT=1** | **YES — and the gate is GREEN precisely because the predicate is FALSE** |
| **G-6** | 25 hits, both far ends, 5 files | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25**; files `KF-W2.md` · `KF-W3.md` · `KF-W5.md` · `KF-W10.md` (X·KF) · `F-W0.md` (X·F). Neither directory appears in any of the 19 commits | **YES** |
| **G-7** | 0 / 0 — the INHERITED-GREEN FLOOR | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; `web/package.json` → **0**. No transitive copy "cured" | **YES — floor held** |
| **G-8** | packet **28768 B** · `RELEASE-PACKET` 3 · `RC-P` 3 · `SS-6` 30 · no UNREAD | ⟨cmd⟩ `wc -c < RELEASE-PACKET.md` → **28768**; ⟨cmd⟩ `grep -c` over `INBOX.md` → **3** · **3** · **30**; ⟨cmd⟩ every `UNREAD`-bearing table row's cells split on `\|` and printed → **6 rows, and in every one the status cell begins `SENT` / `ROWED` / `FOLDED` / `READ IN FULL`**, the word appearing inside prose (*"two UNREAD glass 08-09 letters found this bound"*) — **no status cell IS `UNREAD`**; ⟨cmd⟩ `git status --porcelain -- INBOX.md` → **0 lines** | **YES** |
| **G-9** | disposition **(C)**, `BLOCKED-ON` + re-trigger | ⟨cmd⟩ `grep -n 'BLOCKED-ON' waves/W4-CLOSE.md` → `:131` the quoted COHESION §0i.1 · S-4 disposition, `:134` *"Ruled: C"*, `:148` the `BLOCKED-ON` condition with its re-trigger command; ⟨cmd⟩ the 19 commits → **0** paths under `docs/tranches/X/waves/` | **YES** |

**G-10 also reproduces, as RED**: ⟨cmd⟩ §0ab shape-(a) awk → **5 ≡ 5**, the open state, the act
unperformed. Second leg ⟨cmd⟩ `grep -rn 'VERIFIED' waves/W[0-3]-CLOSE.md` → **10 lines across 4
files, every one a disclaimer** — **no sibling self-stamps**.

**The checker still has teeth, proven by control at this seat** (C3-5): base **GREEN EXIT=0**,
`A-pending-unruled` **RED EXIT=1**, `B-live-binding` **RED EXIT=1**, `C-ghost-id` **RED EXIT=1**.

### 3. Honest-RED adjudication (axis 10) — the set is `∅`, at a third independent seat

| gate | RED at these bytes | relief examined, at the spec's bytes | verdict |
|---|---|---|---|
| **G-10** | shape-(a) sum `5 ≡ 5`; the R-A stamp unperformed a **sixth** reading | **Producer-owned?** No — five row edits in this repo plus two `COHESION.md` cells; no upstream tree, no producer row, nothing that could be green only at a sibling. **Routed to a later wave by the spec's own routing?** No — `W4.md` §2 R-A: *"VERIFIED is stamped **only at this wave's release close**"*; §3.9 lists the advance as this wave's own scope item; COHESION §0y (`.d`→`.f`), §0aa (the serial lock), §0ab (`.f2`) each re-give the identical set to a seat **inside** the wave, and **no addendum routes it onward when the conditional fails**. §3a's answer to a hard-gate failure that is not local-edit-recoverable is a **triumvirate dispatch**, not a close — a routing *to the orchestrator*, never to a successor wave. **An honest-RED the spec names by id?** No — §6 opens *"Ten conditions. **Nine born-RED** …"* and G-10 is one of the nine; §2's Hard gate names *"the R-A stamp"* as the tenth condition of ten. **The relief Check 1 accepted?** *Expired at `cf99b1c8`* and re-measured expired here: G-1..G-9 read GREEN at this seat's own clock (§2), so §6 G-10's falsifier no longer bites. What remains is **freshness + model seat** (§5, M-23 §1) — a **dispatch** condition whose answer is a seat, not a close | **UNRELIEVED — a real defect (C3-1, HIGH)** |

**The honest-RED set is `∅`**, and this seat declines the temptation for the same reason pass 2
did: the record is *honest* about G-10 at every sitting, it named and refused the masking cures
available to it, and it never claimed the stamp. **Honesty is not relief.** Nor is an escalation:
an escalation names an owner, and axis 10 asks for a relief. A wave whose tenth hard-gate condition
is performable and unperformed is not closed, and a `CLOSED` cell over it would book the act as
never-needed for the very wave minted to perform it.

### 4. The remaining axes, each measured

- **§File Bounds (axis 2)** — ⟨cmd⟩ `git show --name-only` over all **19** commits of the wave (`2237f305` `31a9d5d8` `c1c8d775` `c7d7b768` `4075c234` `e31b8450` `d357aad9` `a6e94149` `c1fe075f` `cc8a4896` `53b31b8f` `65866bdb` `b4ec7fa5` `cf99b1c8` `91853f91` `4558addf` `9d16ac59` `4ca61d03` `3cdd49da`): every path is one of `execution/D/X-P-W4S.md` · `execution/LEDGER.md` · `parse-that/{SEAM-CONTRACT,DIVERGENCE-LEDGER,ADJUDICATION-W4,RELEASE-PACKET}.md` · `parse-that/waves/W4-CLOSE.md` · `parse-that/scripts/seam-contract-check.mjs` · `parse-that/evidence/W4/**` · `V/coordination/INBOX.md` · `V/megatranche/registry/{DEFECT-LEDGER.md,harvest/x-p-w4s.json}`. **LANDED-WRONG: NONE.** ⟨cmd⟩ over the same 19: **0** under `src`/`demo`/`api`/`test`/`e2e`, **0** under `docs/tranches/X/waves/**`, `docs/tranches/X/keyframes/**`, `docs/tranches/X/fourier/**`, `registry/adjudicated/**`, `evidence/W3/**`; **0** occurrences of `scripts/dev/dev.sh`. ⟨cmd⟩ `git -C ../parse-that log --oneline -1` → **`ef10d5b`** (2026-07-05) — the frozen read-only root has not moved in this tranche; ⟨cmd⟩ `git -C <p2> log --oneline -1` → **`fede7d3`**, `.h`'s head, unmoved by either repair or either check.
- **Masking (axis 3)** — ⟨cmd⟩ each of the seven content-bearing commits piped to `grep '^+' \| grep -icE 'try *\{\|catch\|test\.skip\|\.skip\(\|allowlist\|\.only\(\|node_modules'` → `31a9d5d8` **0** · `c1c8d775` **0** · `c7d7b768` **0** · `e31b8450` **2** · `a6e94149` **74** · `c1fe075f` **1** · `cf99b1c8` **0**, and **every hit was opened and read**: `e31b8450`'s two are the census probe's `try { … } catch (e) { return \`THROW ${e.message}\` }` — an instrument that **reports** a throw as a third outcome beside ACCEPT and REJECT, never one that swallows it; `a6e94149`'s 74 are `node_modules` **paths inside the G-3 evidence JSON** (`"resolvedDeclaration": "<consumer>/node_modules/@mkbabb/parse-that/…"`), which is the gate's whole point — resolution from the *installed* bytes; `c1fe075f`'s one is the packet's own prose **disclaiming** the practice. ⟨cmd⟩ the same scan over `<p2>`'s `ba4d148` and `fede7d3` → **0** and **0**. **No try/catch around a defect, no `test.skip`, no allowlist, no copied producer selector, no patched `node_modules`, no silently narrowed assertion** — and the one assertion that *could* have been narrowed (G-1's) is proven un-narrowed by control at C3-5.
- **Commit families (axis 4)** — one commit per meaning throughout: `.g`'s instrument / evidence / harvest-append / receipt are four distinct meanings; `.h`'s cure+evidence and its receipt are two; `.f2`'s evidence / close-set / receipt are three; each check and each repair rides its own. The **§9 `.d` family** — five `VERIFIED` rows and two `COHESION.md` cells — is **absent whole**: ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/waves/ docs/tranches/X/COHESION.md` → **0 lines**, and no commit of the 19 carries any member. The family is honoured, not split.
- **E-3 (axis 5)** — ⟨cmd⟩ the 19 commits' file lists filtered for `registry/adjudicated/` · `docs/tranches/X/waves/**` · `docs/tranches/X/{keyframes,fourier}/**` · `docs/tranches/X/parse-that/waves/W[0-4].md` · `parse-that/evidence/W3/` → **0**. The dated spec (`W4.md`, ⟨cmd⟩ `git log -1 --format='%h %ad' -- waves/W4.md` → **`e105059c` 2026-09-19**, the root session's own commit), the adjudicated registry, the W3 conformance artefacts and every sibling spec are **byte-untouched by X.P.W4S**.
- **Mail (axis 6)** — ⟨cmd⟩ `grep -c 'UNREAD' INBOX.md` → **84** hits, and every one was classified: **4** are the file's own vocabulary prose (`:4` `:5` `:23` `:33`), the rest are sweep paragraphs and row cells in which the word appears **inside** a cell whose leading token is `SENT` / `ROWED` / `FOLDED` / `READ IN FULL`. ⟨cmd⟩ the six `UNREAD`-bearing table rows (`:99` `:102` `:103` `:105` `:115` `:126`) had their cells split and printed: **not one status cell is `UNREAD`**. **No wave closes with UNREAD mail in scope — and none is.**
- **Four-verb (axis 7)** — it did not move, which while the stamp is undispatched is the only lawful reading. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/ docs/tranches/X/COHESION.md docs/tranches/V/coordination/INBOX.md docs/tranches/V/megatranche/registry/` → **0 lines**. **X.P.W4's CLOSED row is untouched.**
- **The goal criterion (axis 8) — MET at the bytes.** §2a's three questions, each answered by a document and a command rather than a status word: *what value.js receives* → `SEAM-CONTRACT.md`, **52** rows, both set-differences `∅`, `declared-divergence 7` / `identical 45`, **no blank field** (G-1 asserts it mechanically); *how it arrives* → G-3, **52 of 52 resolved from the installed tarball**, sha published, **5** refusals asserted; *when the consumer may act* → `RC-P(4.0.0) = FALSE — 3 of 6`, **EXIT=1**, a script that cannot be argued with. What is unmet is not §2a — it is §2's **tenth hard-gate condition**, the act.
- **Published figures (axis 9)** — every figure re-read from the settled bytes: `SEAM-CONTRACT.md` **98058** · `RELEASE-CONDITION.md` **31606** · `RELEASE-PACKET.md` **28768** · `W4-CLOSE.md` **54949** · `x-p-w4s.json` **147196**; G-1's `ledger rows 48` · `declared-divergence 7` · `identical 45` · `§0v carried 44 cells over 6 rows` · `bindings released 37`; G-3's `entryCount 91` · `refusals 5` · sha `004bbcce…`; G-8's `3` · `3` · `30`. **All reproduce.**

### 5. The successor waves' "Opens after" conjuncts, measured against this wave

| successor | conjunct | state at these bytes | reading |
|---|---|---|---|
| **KF.W3** (X·KF) | *"This wave opens if and only if `RC-P(V)` evaluates TRUE per `RELEASE-CONDITION.md` §6a, run against the registry coordinate `V`"* | ⟨cmd⟩ `RC-P(4.0.0) = FALSE — 3 of 6` · `KF.W3 does NOT open.` | **LAWFULLY BLOCKED** — by a measured predicate, not by a schedule and **not by the missing stamp**; the sentence names the predicate, never a wave number (G-6's falsifier satisfied) |
| **F.W0** (X·F) | *"fourier receives parser effects only through an admitted, packed value.js release satisfying `RC-P`; the direct `parse-that → fourier` edge is forbidden and is asserted absent"* | the opening conjunct is independent of X·P; the parser conjunct is FALSE; ⟨cmd⟩ G-7 `0`/`0` | **not blocked as to opening**; its **parser tuple is blocked**, and the forbidden direct edge is asserted absent at this seat |
| **the X·V adoption wave** | does not exist (OP-4 / G-9) | disposition **(C)** `BLOCKED-ON` + re-trigger at `W4-CLOSE.md` §4 (`:131` `:134` `:148`); ⟨cmd⟩ **0** commit paths under `docs/tranches/X/waves/` | **LAWFULLY BLOCKED**, and X·P authored no X·V wave to fill the gap |

**No successor is unlawfully opened, and none is blocked by the unperformed stamp.** Every
downstream edge is keyed on `RC-P`, which is FALSE and honestly so. That is why C3-1 is **HIGH and
not CRITICAL**: nothing false has been published, nothing downstream has moved on a claim it should
not have, and the wave is short of its own tenth gate by one dispatch — now a **§3a-shaped** one
(C3-2).

### 6. What this check did not do

It cured nothing, re-dispatched nothing, minted no addendum, and wrote no byte outside this record
and the LEDGER's own row cell and appended event line. It did **not** perform the R-A stamp — this
seat is neither fresh-to-the-wave in the M-23 §1 sense nor a Fable adjudicator, and §5's *"a seat
that authored a gate cannot certify it"* is the same law that disqualified the Repair-1, Check-2
and Repair-2 seats. It did not widen, retag or regenerate any instrument to move a gate; it wrote
no `evidence/W4/**` file (every script was given `--out` into the scratchpad); it touched neither
`<p2>` nor `../parse-that` nor any producer tree. **The LEDGER status cell stays `PARTIAL`.**

**Terminal posture at this pass. Ten hard-gate conditions: nine GREEN, one RED; honest-RED set
`∅`; escalations returned — C3-1 (HIGH), C3-2 (MEDIUM, new), C3-3 (MINOR, carried) — all three
resolving on the same dated-spec surface, in one root-session act.**

---

## Open — RESUME (FIFTH SITTING, SEAT 0, 2026-09-20; COHESION §0ah + W4.md SIXTH addendum)

SERVED MODEL: claude-opus-5[1m]

**Mode.** RESUME. The LEDGER row reads `PARTIAL 2026-09-20 — CHECK 3`, not CLOSED, and this
record exists — so this sitting re-opens on `§0ah`'s plan augment, not on a bare re-seat of `.f2`
(C3-2: §3a's third-diagnostic-iteration trigger has fired for G-10). `X.P.W4`'s own CLOSED row is
untouched (E-3).

### Crash-recovery (standing law)

⟨`git -C /Users/mkbabb/Programming/value.js status --porcelain`⟩ → 16 dirty rows, ⟨`git -C
/Users/mkbabb/Programming/parse-that status --porcelain`⟩ → 30 rows. **Not one path falls inside
either owed unit's writable set** (`<p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs`
· `<p2>/typescript/evidence/W4/**` · this record · `LEDGER.md` · the `.s` stamp set). The value.js
rows are Track A's and Track C's working state plus the standing-arrangement `scripts/dev/dev.sh`;
the `parse-that` rows are that repo's own Rust tree, which is not this wave's root (`<p2>` =
`/Users/mkbabb/Programming/parse-that-css-totality-p2`). ⟨`git -C <p2> status --porcelain`⟩ → clean
at the wave's paths. **No inherited partial work on either owed unit. Nothing stashed, nothing
restored, no sibling path touched.**

### Preconditions, at the bytes and in the ledger

| conjunct | receipt |
|---|---|
| `X.P.W4` CLOSED (honest-RED) | LEDGER row present; `waves/W4-CLOSE.md` exists with §13 |
| the six earlier units stand on commits | `<p2>`: `.e` `93bcb83` · `.e2` `43c3f48`+`49ca70b` · `.f` `f3c389c` · `.g` `ba4d148` · `.h` `fede7d3`; value.js: `.g` `31a9d5d8`/`c7d7b768`/`4075c234`, `.h` `e31b8450`/`d357aad9`, `.f2` `a6e94149`/`c1fe075f`/`cc8a4896` |
| `.g2`'s target exists | `<p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs`, carry at `:171` |
| `.s`'s stamp set exists | `SEAM-CONTRACT.md` · `ADJUDICATION-W4.md` · `DIVERGENCE-LEDGER.md` (§0..§11) · `W4-CLOSE.md` · `RELEASE-PACKET.md` (28768 B) · `registry/harvest/x-p-w4s.json` |

**All preconditions MET.** Not blocked.

### E13 Step-0 — the four-path mail sweep (read-only)

Four landing paths swept at this seat's own clock and compared against **every** row of
`docs/tranches/V/coordination/INBOX.md`. `glass-ui/docs/tranches/BK/` **confirmed still the newest**
tranche dir (⟨`ls -dt glass-ui/docs/tranches/*/ | head -3`⟩ → `BK/` `BJ/` `BI/`).

- ⟨`ROWS=$(grep -c '^| I-\|^| O-' INBOX.md)`⟩ → **82** · ⟨`wc -c < INBOX.md`⟩ → **313072**.
- A filename-vs-ledger difference over all four paths returns **31 files not named by any row**.
  Each was opened and classified by its own `FROM:`/title line, never by its filename prefix:
  - the four `value-inbox-2026-07-20-*.md` (`d23-ruled-mirror-primary` · `parser-proof-evidence` ·
    `pi-minitranche-notice` · `residual-repairs`) are **value.js-AUTHORED OUTBOUND** — each reads
    *"→ the active V-next Codex fleet"* / *"FROM: the value.js union-apotheosis program"*. They are
    not addressed to value.js and take no `I-n`.
  - the remaining 27 are sibling-internal (keyframes' `GLASS-INBOUND`/`ATLAS-INBOUND`/`SPEEDTEST-
    INBOUND` and atlas' own P-tranche register files) — addressed to keyframes.js and to atlas.
- **Unrowed AND addressed to value.js: 0. No new `I-n` minted. No status cell reads UNREAD** (the 84
  literal `UNREAD` hits are prose inside status-cell text and sweep lines, measured by position at
  Check 3 and unmoved). **No UNREAD mail in scope; this open does not carry one.**

A dated sweep line is appended at `INBOX.md`'s file end.

## Baseline — RESUME (2026-09-20), banked BEFORE any cure

Standing law at a RESUME open: **re-run at baseline only the gates the still-owed units turn; cite
the banked baseline for the rest.** `.g2` turns G-1 (it writes the artefact G-1 reads) under the
G-2 commit predicate; `.s` turns G-1..G-9 as its **own precondition** and G-10 as its act. So eight
of ten are re-measured here at this seat's clock and G-3 is cited from Check 3's banked double-run
(it packs and installs — a long gate, and `.s` re-runs it at its own clock by §0ah's own words).

| gate | command (⟨cmd⟩ → output) | reading |
|---|---|---|
| **G-1** | ⟨`node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs SEAM-CONTRACT.md evidence/W3/universe-52.json DIVERGENCE-LEDGER.md`⟩ → `VERDICT: GREEN — both set-differences ∅, no disposition contradicts a LIVE ledger row, every carried cell is terminally ruled in ADJUDICATION-W4.md, no field is blank` · `EXIT=0` · double-run identical | **GREEN** |
| **G-2** | ⟨18 `X.P.W4S`-subject commits in `2237f305^..HEAD`, `git show --name-only` each⟩ → `grep -cE '^(src\|demo\|api\|test\|e2e)/'` → **0** | **GREEN** (commit predicate, C3-3/§0ah) |
| **G-3** | *banked, Check 3 double-run*: `resolved 52 of 52`, tarball sha `004bbcce…`, `entryCount 91`, refusals **5**, `EXIT=0` | **GREEN** (banked; `.s` re-runs) |
| **G-4** | ⟨`node scripts/wasm-admission.mjs ./src/css/build/ac1.wasm`⟩ → `"functionKindImportsTotal": 0`, `"unaccountedImportsTotal": 0`, `"verdict": "GREEN"`, `EXIT=0` | **GREEN** |
| **G-5** | ⟨`node scripts/rc-p-evaluate.mjs --version 4.0.0`⟩ → `RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)` / `KF.W3 does NOT open` | **GREEN** (the evaluator reports honestly; conjunct 3 reads `20962 mirror-defects over V's installed /css`, the Q-RC-1 V-tarball arm live) |
| **G-6** | ⟨`grep -rc 'RC-P' docs/tranches/X/keyframes/waves/ docs/tranches/X/fourier/waves/`⟩ → **25** hits | **GREEN** (≥2) |
| **G-7** | ⟨`grep -c 'parse-that' fourier-analysis/package.json`⟩ → **0**; ⟨same over `web/package.json`⟩ → **0** | **GREEN** (floor held) |
| **G-8** | ⟨`wc -c < RELEASE-PACKET.md`⟩ → **28768**; INBOX `ROWS=82`; no status cell UNREAD | **GREEN** |
| **G-9** | *banked, Check 3*: terminal disposition **(C)**, recorded not silent | **GREEN** (banked) |
| **G-10** | ⟨`for f in docs/tranches/X/parse-that/waves/W[0-4].md; do awk '/^### Four-verb status/{t=1;next} /^#/{t=0} t' "$f"; done \| grep -c 'VERIFIED \| \*\*NO\*\*'`⟩ → **5** | **RED** — the stamp is performable and unperformed for a SEVENTH reading; `.s` is its cure |

### `.g2`'s own born-RED (ESC-W4g-1 / F-ab1's second limb)

⟨`grep -c '## §10' <p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs`⟩ → **0**. The
carry at `:171` is a SINGLE block — `previous.indexOf("\n### §6.")` sliced to the next `\n## ` —
so `DIVERGENCE-LEDGER.md`'s `## §10 — rulingId appends, X.P.W4.f` (line 1084) and `## §11 — the NEW
divergence X.P.W4.h` (line 1135) are **dropped by a canonical re-emission**. Born-RED, and the cure
is §0ah's carried LIST. No regeneration is ordered; the ledger stands (E-3).

### R.2 — GREEN before cure, disclosed

**G-1 · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9** all read GREEN at this open while sitting in
`.s`'s gate list. They are **inherited-GREEN from the six alreadyDone units** (`.e`/`.e2` turned
G-3; `.f`/`.g`/`.h` and Repair 1 turned G-1), not unearned: each was born-RED on 2026-08-03 and has
a named curing commit. `.s` does not cure them — it **re-measures them as its precondition** — so
their GREEN is the condition for the stamp, and a RED at `.s`'s own clock means the stamp is not
performed and the row reads `BLOCKED-ON G-n`. Disclosed here rather than left implicit.

## Unit plan — RESUME (2026-09-20)

**alreadyDone, never re-dispatched** (commits exist; §0ah's *"stand on their commits"*):
`X.P.W4.e` · `X.P.W4.e2` · `X.P.W4.f` · `X.P.W4.g` · `X.P.W4.h` · `X.P.W4.f2`.

**Groups (serial, ≤2 concurrent honoured trivially — `.s` is dispatched LAST AND ALONE by §0ah):**
`[X.P.W4.g2]` → `[X.P.W4.s]`. Disjointness: `.g2` writes only inside `<p2>`; `.s` writes only
inside value.js docs + the harvest registry. No shared modify path, and they are serial regardless
because `.s`'s precondition is a re-run of G-1..G-9 over the artefact `.g2` may move.

### `X.P.W4.g2` — Opus — ESC-W4g-1, the carried LIST

*Sections*: `W4.md` SIXTH ADDENDUM 2026-09-20 (line 684, the `X.P.W4.g2` clause) · `COHESION.md`
§0ah bullet 4 (lines 2244–2249) · `W4.md` §6 G-1 (352–370) and §6 G-2 as amended by C3-3.

*Writable*: `<p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs` ·
`<p2>/typescript/evidence/W4/**` (NEW dated files only).

*Gates*: the existing idempotence check over two consecutive emissions **plus** §10's retirement
rows surviving both; G-1 `VERDICT: GREEN` double-run unmoved; G-2 (no `src|demo|api|test|e2e` path
in its commit).

*Locks*: before `.s`, always. No regeneration of `DIVERGENCE-LEDGER.md` is ordered — the ledger
stands byte-frozen (E-3); the cure is in the emitter, proven by emitting to a `--out` scratch path.

*Brief*: `:171`'s single `previous.indexOf("\n### §6.")` block becomes a carried LIST over the two
marks `"\n### §6."` and `"\n## §10"`, each sliced to the next level-2 heading and §10's slice taken
as the TAIL (so §11 rides it), emitted under its own preamble **in document order**. Acceptance is
measured, not asserted: emit twice to a scratch `--out`, diff the two emissions (idempotent), and
grep each for §10's retirement rows and §11's heading — both must survive both emissions. Re-run
G-1 double-run against the canonical ledger to prove nothing moved. Bank the readings as NEW dated
files under `evidence/W4/`. One commit in `<p2>`, pathspec, `--no-verify`.

### `X.P.W4.s` — fable (a FRESH Fable adjudicator, M-23 §1) — THE STAMP ACT, standalone

*Sections*: `W4.md` SIXTH ADDENDUM (line 684, the `X.P.W4.s` clause) · THIRD ADDENDUM (line 678,
the stamp set and G-10 shape (a)) · `COHESION.md` §0ah bullets 2–3 (2229–2241) · `W4.md` §6 G-1..
G-10 (352–544) · §12 (651–673, VERIFIED never ACCEPTED) · §9 Commit Plan (581–599, the family).

*Writable*: the five `### Four-verb status` `VERIFIED` rows of
`docs/tranches/X/parse-that/waves/W{0,1,2,3,4}.md` · `docs/tranches/X/COHESION.md` (§1 SS-5 cell +
§5 board line ONLY) · `docs/tranches/X/parse-that/waves/W4-CLOSE.md` (dated §14, append) ·
`docs/tranches/X/parse-that/RELEASE-PACKET.md` (dated addendum section, append) ·
`docs/tranches/V/megatranche/registry/harvest/x-p-w4s.json` (fold/3) ·
`docs/tranches/V/coordination/INBOX.md` (mail rows) · this record (`## Unit receipts`).

*Gates*: G-1 · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 as its **precondition**, re-run at its
own clock (G-3 backgrounded and polled ≤60 s); G-10 shape (a) **5 → 0** as its act.

*Locks*: dispatched LAST AND ALONE, after `.g2` and after every check that moved a gate. The §9
family is ONE commit and must not split: five rows + two COHESION cells + `W4-CLOSE.md` §14 +
`RELEASE-PACKET.md` addendum + `x-p-w4s.json` fold/3.

*Brief*: re-run G-1..G-9 at your own clock, double-run, long gates backgrounded and polled — never
cite this record's table. **All nine GREEN → perform the R-A stamp as ONE act**: the five
`### Four-verb status` rows move `IMPLEMENTED`→`VERIFIED` (shape-(a) sum 5→0, **VERIFIED never
ACCEPTED**, §12), `COHESION.md` §1 SS-5 cell + §5 board line carve ONLY under a performed stamp,
`W4-CLOSE.md` gains a dated §14, `RELEASE-PACKET.md` a dated addendum, `x-p-w4s.json` folds to /3
(predecessor embedded whole). Re-measure G-10 from the settled bytes, double-run, and self-count
the receipt. **Any gate RED at your clock → perform NOTHING**, write the reading, and the LEDGER row
reads `BLOCKED-ON G-n` by gate id — never `PARTIAL`.

## Unit receipts — RESUME (2026-09-20)

*(empty at open; each unit appends its own)*

### X.P.W4.g2

SERVED MODEL: claude-opus-5[1m]

**Unit.** ESC-W4g-1 / F-ab1's second limb — `emit-divergence-ledger.mjs`'s single carried block
becomes a carried LIST. Sections executed: `W4.md` SIXTH ADDENDUM 2026-09-20 (line 684, the
`X.P.W4.g2` clause) · `COHESION.md` §0ah bullet 4 (2240–2244) · `W4.md` §6 G-1 (352–370) and §6 G-2
as amended by C3-3. **Status: DONE.** One `<p2>` commit `3199913`; this record's commit below.

#### Act 0 — crash-recovery, at the bytes (standing law)

⟨`git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 status --porcelain`⟩ → **1 row**,
`?? .worktrees/` — an untracked directory of four sibling worktrees (`w2/ac1` · `w2/ac2` ·
`w2/ac3-scan-union` · a detached `w4b`), **not** a path in this unit's writable set and not a
killed predecessor's edit. ⟨`git -C <p2> status --porcelain -- typescript/test/css-equivalence
typescript/evidence`⟩ → **0 rows**. **No inherited partial work on this unit.** Nothing stashed,
nothing restored, no sibling path touched; `scripts/dev/dev.sh` never opened.

⟨`git -C <p2> worktree list`⟩ → the main tree at `fede7d3 [w2/harness]`, which is `.h`'s commit —
the unit's target file is in the MAIN tree at the branch the six prior units stand on, so this seat
writes where the wave writes.

#### Act 1 — the born-RED, measured twice: in the source and in an emission

⟨`grep -c '## §10' <p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs`⟩ → **0**
(reproduces the open's reading at this seat's own clock).

The carry at `:171` read `previous.indexOf("\n### §6.")` sliced to the next `\n## ` / `\n---\n` — a
single region — while the canonical ledger carries two sections appended **after** F-e7's cure was
written: `## §10 — rulingId appends, X.P.W4.f` (line 1084) and `## §11 — the NEW divergence
X.P.W4.h opens` (line 1135), 105 lines to the file's end.

A source reading is not a behaviour reading, so the defect was measured as an emission, to scratch:

⟨`node test/css-equivalence/emit-divergence-ledger.mjs --out <scratch>/before-1.md
--pinned-value-commit 6aca86020b6b2605e7d0f04fccb6601746e387f7`⟩ →
`wrote … — 131539 B · 1080 lines · 46 rows · empty directions 0 · `.e`'s §6 block carried 47 lines`,
`EXIT=0`. Over that file: ⟨`grep -c '^## §10'`⟩ → **0** · ⟨`grep -c '^## §11'`⟩ → **0** ·
⟨`grep -c 'RETIRED'`⟩ → **0**. **Born-RED confirmed at the bytes**, and this emission is the
negative control for Act 3: same command, same pin, same scratch root, one commit apart.

#### Act 2 — the cure, exactly as §0ah specifies it

The carry is now a declared LIST of marked regions of the CANONICAL ledger (never `--out` — F-y2):

```js
const CARRIED_REGIONS = [
    { id: "§6",  mark: "\n### §6.", toTail: false },
    { id: "§10", mark: "\n## §10",  toTail: true  },
];
const sliceCarry = ({ mark, toTail }) => {
    const at = previous.indexOf(mark);
    if (at < 0) return [];
    const rest = previous.slice(at + 1);
    if (toTail) return rest.replace(/\s+$/, "").split("\n");
    const ends = ["\n## ", "\n---\n"].map((m) => rest.indexOf(m)).filter((i) => i >= 0);
    const block = ends.length > 0 ? rest.slice(0, Math.min(...ends)) : rest;
    return block.replace(/\s+$/, "").split("\n");
};
const carries = CARRIED_REGIONS.map((r) => ({ ...r, lines: sliceCarry(r) }));
```

Three properties, each ordered and each measured, never asserted:

1. **A list, not a block.** Two marks, one table, extensible by a row rather than by a second copy
   of the slice.
2. **Each to the next level-2 heading, EXCEPT §10's, taken as the TAIL.** §11 was appended below
   §10; a bounded §10 slice would have carried `.f` and dropped `.h`, which is ESC-W4g-1 re-opening
   under a new number at the next append. The tail is what makes the region, not the section, the
   unit of carry.
3. **Emitted under its own preamble, in document order.** §6's stays inside §6 (unmoved, same
   end-marks, 47 lines before and after); the tail is emitted at the file's end after §9, where
   `.f` and `.h` put it. The tail preamble sits **above** the carried `## §10` heading on purpose:
   a preamble below it would be swallowed by the next run's slice and printed twice — the growth
   F-e7's own first double-run measured at 47 → 286 → 525 lines.

The `console.log` receipt line now reports the list (`carried regions §6 … · §10 …`) rather than one
block, so a region that silently carries nothing is visible in the run's own output.

⟨`node --check test/css-equivalence/emit-divergence-ledger.mjs`⟩ → `EXIT=0`.
⟨`grep -c '## §10' …/emit-divergence-ledger.mjs`⟩ → **7** (born-RED **0 → 7**, read from the settled
bytes after the last edit — SELF-COUNT LAW, not the edit's intent).

**No regeneration of `DIVERGENCE-LEDGER.md` was ordered and none was performed.**
⟨`git status --porcelain -- docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md`⟩ → **0 rows**, before
and after. The ledger stands byte-frozen (E-3); the cure is proven by emitting to a scratch `--out`.

#### Act 3 — acceptance, MEASURED (the unit's first gate)

Two consecutive emissions to a scratch `--out`, same pin, nothing written into either repo:

⟨`node test/css-equivalence/emit-divergence-ledger.mjs --out <scratch>/after-1.md
--pinned-value-commit 6aca8602…`⟩ → `wrote … — 142234 B · 1197 lines · 46 rows · empty directions 0
· carried regions §6 47 lines · §10 105 lines`, `EXIT=0`
⟨same, `--out <scratch>/after-2.md`⟩ → byte-for-byte the same receipt line, `EXIT=0`

| probe | before (Act 1) | after-1 | after-2 |
|---|---|---|---|
| ⟨`grep -c '^## §10'`⟩ | 0 | **1** | **1** |
| ⟨`grep -c '^## §11'`⟩ | 0 | **1** | **1** |
| ⟨`grep -c '^#### §10\.'`⟩ | 0 | **4** | **4** |
| ⟨`grep -c '^#### §11\.'`⟩ | 0 | **3** | **3** |
| ⟨`grep -c 'RETIRED'`⟩ | 0 | **4** | **4** |
| ⟨`grep -c '^#### §10.2 … — RETIRED as coverage claims'`⟩ | 0 | **1** | **1** |

**Idempotence**: ⟨`diff after-1.md after-2.md`⟩ → `EXIT=0`, **0 lines**;
⟨`shasum -a 256 after-1.md after-2.md`⟩ → both `0d17d4bf353a0163e2dd9c7ee3870e2a2a13cee5b5a1fd1689
32fc5dbd2e09ba`. **Exactly one** of each heading in both emissions — nothing doubles.

**Verbatim, not re-rendered**: ⟨`awk '/^## §10 /{p=1} p' after-1.md`⟩ → 105 lines;
⟨`sed -n '1084,$p' DIVERGENCE-LEDGER.md`⟩ → 105 lines; ⟨`diff canon-tail emitted-tail`⟩ → `EXIT=0`,
**0 lines**. This program authors not one byte of §6, §10 or §11.

**Fixed point** (the property F-y2 had to buy once already): applying the landed slice function to
the canonical file and to the emitted file region-for-region →
`§6: canonical 47 lines · emitted 47 lines · IDENTICAL=true` /
`§10: canonical 105 lines · emitted 105 lines · IDENTICAL=true`. Idempotence therefore does **not**
depend on `--out` pointing away from the artefact. Nothing was written to the canonical path.

Banked as NEW dated evidence (E-3, beside): `<p2>/typescript/evidence/W4/carried-list-idempotence-
2026-09-20-w4g2.txt` (8992 B) — the directory `typescript/evidence/W4/` did not exist and is opened
by this unit.

#### Act 4 — G-1 and G-2, at this seat's own clock

**G-1** ⟨`node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs SEAM-CONTRACT.md
evidence/W3/universe-52.json DIVERGENCE-LEDGER.md`⟩, run twice AFTER the cure →
`VERDICT: GREEN — both set-differences ∅, no disposition contradicts a LIVE ledger row, every
carried cell is terminally ruled in ADJUDICATION-W4.md, no field is blank`, `EXIT=0`;
⟨`diff run1 run2`⟩ → `EXIT=0`, 0 lines. **BEFORE → AFTER: GREEN → GREEN, UNMOVED** — which is what
was owed: the cure lives in the generator and the artefact G-1 reads was not regenerated.

**G-2** (commit predicate, C3-3 / §0ah bullet 5): ⟨`for h in $(git log --format='%H %s'
2237f305^..HEAD | grep -iE 'x\.p\.w4|x-p-w4' | cut -d' ' -f1); do git show --name-only --format=''
$h; done | grep -cE '^(src|demo|api|test|e2e)/'`⟩ over **24** X.P.W4-subject commits → **0**.
**GREEN.** This unit's `<p2>` commit is inside the fresh root, not value.js; its value.js commit
carries only `docs/` paths. Banked: `<p2>/typescript/evidence/W4/g1-g2-double-run-2026-09-20-
w4g2.txt` (10244 B), both G-1 runs whole.

#### Act 5 — the commit

⟨`git -C <p2> add <3 exact paths> && git commit --no-verify --quiet -m … -- <the same 3 paths>`⟩ →
**`3199913`** `fix(css-equivalence): the F-e7 carry becomes a carried LIST — .f's §10 and .h's §11
survive a re-emission (ESC-W4g-1)`. ⟨`git show --name-only --format="" HEAD`⟩ → exactly three paths,
all inside the writable set:
`typescript/test/css-equivalence/emit-divergence-ledger.mjs` ·
`typescript/evidence/W4/carried-list-idempotence-2026-09-20-w4g2.txt` ·
`typescript/evidence/W4/g1-g2-double-run-2026-09-20-w4g2.txt`.
⟨`git -C <p2> status --porcelain`⟩ after → **1 row**, the same pre-existing `?? .worktrees/`.
One commit, one meaning. Pathspec on the commit itself.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (this seat's own baseline) | AFTER | verdict |
|---|---|---|---|
| idempotence over two emissions with §10's retirement rows surviving both | **RED** — `^## §10` 0, `^## §11` 0, `RETIRED` 0 in a scratch emission | identical bytes (one sha), `^## §10` 1/1 · `^## §11` 1/1 · `RETIRED` 4/4 · `#### §10.` 4/4 · `#### §11.` 3/3 | **GREEN** |
| G-1 | GREEN (banked at the RESUME open) → re-measured GREEN here | `VERDICT: GREEN`, `EXIT=0`, double-run identical | **GREEN, unmoved** |
| G-2 | GREEN (commit predicate) | 0 `src\|demo\|api\|test\|e2e` paths over 24 subject commits | **GREEN** |

#### Residuals and escalations

- **ESCALATIONS: none.** Every write landed inside the declared set; the two `evidence/W4/` files
  are NEW and dated; `DIVERGENCE-LEDGER.md`, `SEAM-CONTRACT.md` and every dated spec were read only.
- **R-C5 / R-2 are discharged AS A MECHANISM, not as ledger rows.** The residual read *"a
  regeneration must re-append §10 and §11 or both rulings' rows are lost"*; after `3199913` a
  regeneration re-appends them itself. The ledger's own §10 and §11 sentences saying *"a
  regeneration must re-append this"* remain standing inside the ledger, immutable under E-3, and now
  describe a cured defect rather than a live hazard. **No ledger byte was changed to say so.**
- **Standing, disclosed**: the carried-list mechanism covers regions that exist at the mark. A
  future dated section appended **above** `## §10` and below `## §9` would still fall outside both
  regions. The tail rule covers everything appended below §10, which is where §10 and §11 both sit
  and where an append beside (E-3) naturally lands.
- `.s` is unblocked by this unit: its precondition re-run of G-1..G-9 reads the same canonical
  artefacts, and G-1 is measured GREEN and unmoved above.
