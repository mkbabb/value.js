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
