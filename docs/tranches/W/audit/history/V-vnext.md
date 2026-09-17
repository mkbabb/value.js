# V-vnext historical audit — the 193-wave mega-tranche formation

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]`,
running as a Claude Code subagent seat. Knowledge cutoff May 2026; session date
2026-07-24. No served-model probe was available to me from inside the harness, so this
is a self-report of the identity the harness declares, not a cryptographic receipt.

## Scope and method

- **Scope audited:** `docs/tranches/V/vnext/` ONLY, strictly read-only. 165 files,
  1,750,375 bytes. I wrote nothing into it and edited no `src/`, `demo/`, `api/`,
  `scripts/dev/dev.sh` or any `INBOX.md`.
- **Repo state:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD
  `c654824e0b252cda7f8490b67f182a48c48cc0ed`.
- **Method:** full `ls -R`; read of README/PLAN/FORMATION/DISPOSITIONS/PROMPT-RECAP/
  RETURN-CONTRACT/OWNER-AMENDMENTS/PROVENANCE/STATE-ROUTING/DESIGN-PROGRAM/
  PARSER-CSS-COLOR/WAVE-ROUTING-PI and the four wave books; **all 193 wave rows parsed
  mechanically** and 57 hand-audited; **every formation validator executed**; **live
  probes run against `src/`** to test born-RED claims; every declared hash and repo pin
  I sampled recomputed on disk.

Evidence below is file:line, a command with pasted output, a recomputed digest, or a
quoted document line. Anything I could not verify is marked UNVERIFIED with the exact
command that would settle it.

---

## 0. Headline

**The formation's honesty about its own emptiness (0/2 clean, 0/193 executed) is real,
and it is the least interesting thing about it.** Underneath that honest banner:

1. **The entire 1.75 MB corpus is untracked in git.** `git ls-files docs/tranches/V/vnext
   | wc -l` → `0`. There is no commit, no blob, no tag. Every "immutable", "byte-preserved",
   "pinned" and "sealed" claim in the corpus is backed by working-tree bytes on one laptop.
   One `git clean -fd` destroys the whole formation.
2. **Three formation validators are RED right now**, including the one that binds the
   114-row union zero-drop account — it does not merely fail, it *crashes*.
3. **The corpus ships a machine-readable manifest declaring `"status":"clean"` with two
   CLEAN passes** while the README declares 0/2. The validator sides with the README:
   `epoch drift`.
4. **The one known live shipping crash in value.js — `parseCssColor("oklch()")` throwing
   `TypeError` — is named in no born-RED row of the 45-wave V band.** I reproduced it
   today. The authority that found it (`apotheosis/parser-proof/GATE-VERDICT.md`,
   2026-07-20 12:04) explicitly assigned it to "the fleet's V-band"; the wave book was
   last written 07-20 07:17 and never received it.
5. **The boot-performance close-law is gone.** `LCP`, `p75`, `2.5s` appear **0 times** in
   the four wave books. This item has ridden three closes under three names
   (T·Q14 → U.W-PERF → V′·CH-4) and has now been dropped from the registry that formally
   claims to have folded it.
6. **Two mandates the repo itself labelled "Chronic" in 2026-06 — aurora-derive and
   blob-extirpation — have been silently inverted into KEEP waves** with no tombstone and
   no supersession record.

---

## 1. Budgets — MEASURED

README.md:188–189: *"Hard active budgets are: formation ≤1,750,000 bytes; tools ≤750,000;
clean-pass core ≤25,000; return prose plus schema ≤20,000. Exceeding a budget is RED."*

```
$ find docs/tranches/V/vnext -type f -exec wc -c {} + | tail -1
 1750375 total
$ find docs/tranches/V/vnext/tools -type f -exec wc -c {} + | tail -1
  713988 total
$ find docs/tranches/V/vnext -type f | wc -l
     165
```

| Budget | Limit | Measured | Verdict | Headroom |
|---|---:|---:|---|---:|
| formation | 1,750,000 | **1,750,375** | **RED by 375 bytes** | −375 |
| formation, less the self-excluded `FORMATION-CLEAN-PASSES.json` (8,577 B) | 1,750,000 | 1,741,798 | GREEN on that reading | +8,202 |
| tools | 750,000 | 713,988 | GREEN | +36,012 (4.8%) |
| clean-pass core (7 named files) | 25,000 | 24,671 | GREEN | **+329 (1.3%)** |
| return prose + schema | 20,000 | 12,502 | GREEN | +7,498 |

Clean-pass core measured exactly as the protocol defines it
(`FORMATION-CLEAN-PASS-PROTOCOL.md:3–5`): that file + `formation-clean-passes.schema.json`
+ `tools/{corpus-files,corpus-epoch,clean-pass-prompts,hash-clean-report,validate-clean-passes}.mjs`
= 2,479 + 2,155 + 1,470 + 3,293 + 3,436 + 1,955 + 9,883 = **24,671**.

**Finding B-1 (vacuous gate).** *No mechanism enforces any of the four budgets.*

```
$ rg -n "1750000|750000|25000|20000" docs/tranches/V/vnext --glob '!*.json'
docs/tranches/V/vnext/README.md:188:Hard active budgets are: formation ≤1,750,000 bytes; tools ≤750,000; clean-pass
```

The only occurrence of any budget number in the corpus is the prose sentence that
declares it. `validate-corpus.mjs`, `validate-formation.mjs` and `corpus-epoch.mjs` count
files and hash them; none sums bytes against a limit. **What input makes this gate RED?
None — it cannot be run.** The formation therefore states a hard RED condition it has
already tripped (on the plain total) and has no way to notice.

**Finding B-2.** The clean-pass core has **329 bytes of headroom on a 25,000-byte ceiling
(1.3%)**. Any substantive edit to `validate-clean-passes.mjs` — e.g. adding the union
check that currently crashes — trips a declared-RED budget. This is a formation designed
at its own limit with no instrument to read the gauge.

---

## 2. The corpus is not in version control

```
$ git ls-files docs/tranches/V/vnext | wc -l
       0
$ git log --oneline -- docs/tranches/V/vnext | head -5
(no output)
$ git status --porcelain docs/tranches/V/vnext
?? docs/tranches/V/vnext/
```

For comparison, `git ls-files docs/tranches/V | wc -l` → `82`. The rest of tranche V is
tracked. The formation corpus is not.

**Finding G-1 (declared capture with no object behind it).** Every one of the following
is asserted against bytes that exist only in one working tree:

- `README.md:98–101` — manifest hashes `a83a5218…` and `61fa7489…` "bind exact physical targets".
- `RETURN-CONTRACT.md` — the whole `repository_state_sha256` / `state_digest` apparatus,
  which explicitly hashes `git ls-files --others --exclude-standard` output. The formation
  is *itself* inside its own untracked vector: its state digest changes every time it edits
  itself.
- `HISTORY-EVIDENCE.json` — "byte-preserved" 51-file / 878,130-byte sealed epoch.
- `FORMATION-CLEAN-PASSES.json` — six actor prompt/assignment/report triples.

**Finding G-2 (CONFIRMED, reproducible).** The prototype's own reproducibility tool fails
*because of* G-1:

```
$ node docs/tranches/V/vnext/prototypes/c14-css/tools/reproduce-from-commit.mjs
AssertionError [ERR_ASSERTION]: commit does not contain C14 exact-lock prototype
    at .../reproduce-from-commit.mjs:22:281
```

`prototypes/c14-css/README.md` presents this as the reproduction path. It cannot pass
until the corpus is committed. The prototype also has no `node_modules` and depends on
`@mkbabb/parse-that@1.0.0` + `tsx`, so `PARSER-CSS-COLOR.md:116`'s *"17/17 external tests
pass"* is not reproducible from the corpus as it stands. (UNVERIFIED whether the tests
pass; `npm ci && npm test` inside `prototypes/c14-css` would settle it — I did not run it,
as it would write `node_modules` into the read-only scope.)

---

## 3. Formation validators: three are RED, one crashes

All 25 executables run with exit codes captured directly (no pipeline masking):

| Tool | exit | State |
|---|---:|---|
| `validate-clean-passes.mjs` | **1** | **RED — `epoch drift`** |
| `validate-corpus.mjs` | **1** | **RED — 5 distinct failures** |
| `validate-union-inventory.mjs` | **1** | **RED — uncaught `Error`, stack trace** |
| `validate-{keyframes-public-package,keyframes-target-transpose,value-current-inventory,value-public-surface,value-target-transpose}.mjs` | 2 | usage — require manifests that do not exist; **never exercised** |
| the remaining 13 validators + 4 selftests + 2 layers | 0 | GREEN |

### 3.1 The clean-pass manifest contradicts the README, and the validator contradicts the manifest

`FORMATION-CLEAN-PASSES.json` top level:

```json
"corpus_epoch_sha256": "61d4954fd8a50dd1c79c146c80b93156c893b562ce928e2ce9869fb794d9345c",
"schema": "vnext-formation-clean-passes/4",
"status": "clean"
```
with `pass 1 verdict CLEAN` and `pass 2 verdict CLEAN`, six named `gpt-5.6-sol`/`ultra`
seats, all six report artifacts present on disk under
`docs/tranches/V/evidence/vnext-clean-passes/61d4954f…/`.

README.md:40: *"Formation-wide clean credit is **0/2**."*

The truth-maker:

```
$ node docs/tranches/V/vnext/tools/corpus-epoch.mjs
{"schema":"vnext-formation-corpus-epoch/1","files":181,"external_files":17,
 "exclusions":["FORMATION-CLEAN-PASSES.json"],
 "sha256":"b54c26393fe63511b85ad48ceb83a8d3b7036f11e2207a7598e9081fcd35ade9"}

$ node docs/tranches/V/vnext/tools/validate-clean-passes.mjs; echo EXIT=$?
epoch drift
1:pass identity
1/critic_a:prompt ENOENT: .../b54c26393fe6…/FORMATION-CLEAN-PASS-1-A.prompt.txt
… (45 lines) …
EXIT=1
```

**Finding C-1.** The corpus carries a committed machine authority asserting `status:
"clean"`, 2/2, over an epoch (`61d4954f…`) that no longer exists. The README's 0/2 is
correct; the JSON is a **green-over-broken artifact left inside the corpus**. A reader or
downstream tool that trusts the JSON over the prose gets the wrong answer, and the
protocol says the JSON is the authority (`FORMATION-CLEAN-PASS-PROTOCOL.md:1`, "the sole
`corpus-epoch.mjs` digest"). Credit is what the validator says: **0/2**.

To the formation's credit, `validate-clean-passes.mjs --selftest` really does run
(`{"schema":"vnext-clean-pass-selftest/3","status":"complete","mutations":31}`), and the
drift really does bite. This gate is *not* vacuous. It is simply RED and the corpus
shipped a document saying otherwise.

### 3.2 The union zero-drop proof crashes on a source that moved

```
$ node docs/tranches/V/vnext/tools/validate-union-inventory.mjs
Error: union inventory: canon supplement source drift: ../reformation/CARRY-LEDGER.md
```

Root cause, exactly:

```
$ shasum -a 256 docs/tranches/V/reformation/CARRY-LEDGER.md
9e88f9e23a64cf26d123c91cdd3595b8348039afb3671fb33840557fe2b983f9
$ git show HEAD:docs/tranches/V/reformation/CARRY-LEDGER.md | shasum -a 256
725490e9b7afa02eb93476ec77557a34d4eba202e2a36265e8a97a432c67f9a9
```

`UNION-INGESTION.md:30` pins `725490e9…`. HEAD matches the pin; the **working tree does
not** — `CARRY-LEDGER.md` is the ` M` row in `git status`. Someone appended to the
formation's declared fold source after the formation sealed it (see §6).

**Finding C-2.** The 114-row union zero-drop account — README.md:21's binding authority
for "the later union and owner-ruling letters, their hashes and the 114-row zero-drop
account" — **cannot currently be validated at all.** Not RED-with-findings; an
unhandled exception.

### 3.3 The aggregate corpus validator

```
$ node docs/tranches/V/vnext/tools/validate-corpus.mjs; echo EXIT=$?
design input is not an exact canonical corpus-epoch member: APOTHEOSIS-PASS-RECORD
design input is not an exact canonical corpus-epoch member: BAND-FEEDBACK-MOTION
union_inventory: exited 1: …
union_inventory: union authority is not an exact external corpus-epoch input
union_inventory: owner_rulings authority is not an exact external corpus-epoch input
union_inventory: expected five canon supplement inputs; found 0
EXIT=1
```

### 3.4 The design epoch is already unbound

`DESIGN-INPUT-EPOCH.json` declares 8 inputs with SHA-256s. Recomputed today:

| Input | Verdict |
|---|---|
| DESIGN-ITERATION-PROMPT (`~/.codex/attachments/e1e5aef6-…/pasted-text.txt`) | MATCH |
| TRANCHE-DEVELOPMENT-PROMPT (`~/.codex/attachments/84afd69f-…/pasted-text.txt`) | MATCH |
| REFORMATION-PASS-RECORD | MATCH |
| VNEXT-HISTORY-PASS-RECORD | MATCH |
| **APOTHEOSIS-PASS-RECORD** (`…/V/apotheosis/RUN-STATE.md`) | **DRIFT** `bed84b9d…` → `56216a8a…` |
| IOS27-CODEX (glass-ui) | MATCH |
| SUFFUSION-MATRIX (glass-ui) | MATCH |
| **BAND-FEEDBACK-MOTION** (glass-ui) | **DRIFT** `8bf26063…` → `6c260eab…` |

**Finding C-3.** G00I's gate promises it *"rehashes all three inputs … and refuses drift
or unavailable DesignSync as green."* Two of eight already drifted within four days —
one in this repo, one in an actively-worked sibling. Two more inputs live in
`~/.codex/attachments/<uuid>/pasted-text.txt`, an ephemeral agent attachment cache outside
every repository and outside git. **The bound design epoch binds two files nobody owns and
two hashes that already moved.** They exist today; nothing preserves them.

---

## 4. The 193 wave rows

### 4.1 Counts are honest

193 rows parsed from the four books; band split **P8 / V45 / K27 / A36 / G11 / D33 /
M13 / C20** — exactly as README.md:30–39 and PROMPT-RECAP declare. `validate-formation.mjs`
and `validate-wave-contracts.mjs` both exit 0 with `contracts: 193`. No inflation, no
double-counting, no formation row smuggled in as a wave. **This is a genuine strength.**

### 4.2 What the contract validator actually checks — and why it is vacuous on substance

`tools/validate-wave-contracts.mjs:16–26`:

```js
if (item.gates.length !== 1) failures.push(`${item.wave_id}: expected exactly one canonical acceptance gate`);
if (gate.id !== `${item.wave_id.toLowerCase()}.acceptance`) …
if (gate.subject !== `node .vnext/proof-runner.mjs test/proof/${slug}/run.mjs --manifest test/proof/${slug}/manifest.json`) …
if (!gate.expected) failures.push(`${item.wave_id}: empty falsifiable expectation`);
```

**Vacuous gate V-1 — the "falsifiable expectation" check.** The entire content test on the
Falsifiable-gates cell is `if (!gate.expected)`. **The only input that makes it RED is an
empty cell.** A gate cell reading `x` passes. 193 of 193 rows are checked this way.

**Vacuous gate V-2 — the canonical gate command.** All 193 gates resolve to the *same*
command modulo slug. Neither endpoint exists:

```
$ ls .vnext ; ls test/proof ; ls tools/validate-return.mjs
ls: .vnext: No such file or directory
ls: test/proof: No such file or directory
ls: tools/validate-return.mjs: No such file or directory
```

`.vnext/proof-runner.mjs` is absent from the whole repo (`find . -name proof-runner.mjs`
→ nothing). **0 of 193 acceptance gates can produce RED today, because 0 of 193 can be
run.** The formation says this ("production is 0/193"); the point is that *the gate
apparatus itself does not exist*, so "born-RED" and "falsifiable" are, for now, literary
genres.

**Vacuous gate V-3 — routing/π.** `tools/wave-table-contract.mjs`:

```js
const nonvisualRouting = "R0 · N/A(no-visual-claim)";
const visualRouting = /^R([1-5]) · ([A-Za-z0-9](?:[A-Za-z0-9._/-]*[A-Za-z0-9])?)-π\/DELTA$/;
export function routingPiFailure(value) { if (value === nonvisualRouting) return null; … }
```

A pure string-format check. `WAVE-ROUTING-PI.md:19` requires *"`π=N/A` **must name why**
no rendered claim exists"* and *"A visual row may not use `R0`"* — **neither is
enforceable**, because the accepted non-visual literal is a fixed token with no reason
field. 135 of 193 rows use it. **No input makes a mis-classified visual wave RED.**

**Vacuous gate V-4 — born-state.** `openingStateFailure` requires only that the cell start
with `BORN-RED — ` / `BORN-ABSENT — ` / `RULING — ` / `AUDIT — ` followed by non-space.
Nothing ties a BORN-RED claim to a failing probe. §4.5 shows a BORN-RED claim that is
false today and passes.

**Vacuous gate V-5 — union FOLD.** `UNION-ROW-INVENTORY.json` rows carry a disposition
(`FOLD`) and an owner-ID list. The validator joins IDs and hashes; it never checks that
the owning wave's *text* carries the requirement. §6 shows a row declaring "THE BOOT KILL"
folded into 24 owners whose text contains no trace of it. **A FOLD assertion cannot fail
on missing substance.**

### 4.3 Aggregate structure of the 193

| Property | Count | Share |
|---|---:|---:|
| Gate cell names a wave-specific mechanism (`proof:<id>` or a `.mjs`) | 57 | 30% |
| Gate cell is prose predicates only | 136 | 70% |
| Born-state `BORN-RED` (claims a live defect) | 131 | 68% |
| Born-state `RULING` / `AUDIT` / `BORN-ABSENT` (**no live defect**) | 62 | **32%** |
| Routing `R0 · N/A(no-visual-claim)` | 135 | 70% |
| Routing `R1`–`R5` with a named π/DELTA token | 58 | 30% |

### 4.4 The 57-wave hand sample — (a)/(b)/(c)/(d)

Sample (all eight bands): P00 P01 P02 P04 P05 P06 P07 · V00A V00C V03 V05 V12 V15 V16A
V16B V24 V24P V26 V27 V29 V29T V31 · K00 K02 K05 K09 K12 K19 K21 K22T K24 · A00 A01 A05
A19 A23C A26 · G00 G00I G05 G07 G09 · D00A D03 D12 D25 · M02 M05 M08 M11 · C00P C00U C05
C07 C08 C09 C10.

Criteria as I scored them:

- **(a) real acceptance gate** — the cell names a wave-specific executable mechanism, or
  a machine-decidable predicate over a named artifact (not "intentionally", "gestalt").
- **(b) can that gate fail** — an input class exists whose result is RED, *and the wave
  does not choose that input/threshold itself*.
- **(c) born-RED where the defect is live** — labelled `BORN-RED` **and** the stated defect
  is a probe-able current fact.
- **(d) π/DELTA named for every visual claim** — the row's routing class matches the
  evidence its own gate demands.

| Criterion | Pass | Fraction |
|---|---:|---|
| (a) real acceptance gate | 48 / 57 | **84%** |
| (a) strict — names an executable mechanism | 29 / 57 | 51% |
| (b) falsifiable in principle | 51 / 57 | 89% |
| (b) **executable today** | **0 / 57** | **0%** |
| (c) born-RED on a live defect | 27 / 57 | **47%** |
| (c) live defect I could independently confirm | 1 verified / 1 falsified / 25 out-of-repo or unprobed | — |
| (d) routing matches the row's own evidence demand | 55 / 57 | 96% |
| (d) N/A rows carrying the law-required *reason* | **0 / 46** | **0%** |

**(a) failures (9):** D03 ("tablet/desktop use space intentionally" — no threshold),
D25 and M11 ("every *applicable* … cell joins and passes" — applicability is self-scoped),
G09 and M08 (see below), C08 (reviewer-opinion), P02, P06, P07 (self-assigned
dispositions, below), G00 ("mutation bites prove each scanner can fail" is real; the rest
of the cell is census prose).

**(b) failures (6) — self-set thresholds and self-assigned dispositions:**

- **G09** — *"measured tile/stroke thresholds yield at least the M08 contact-sheet
  density"*, and **M08** — *"The pre-mutation record falsifies or confirms the tile/stroke
  diagnosis **and binds the chosen density/resolution threshold**"*. The wave measures,
  the wave picks the bar, the wave clears the bar. There is no input the wave does not
  control. Both rows do carry independent concrete floors later in the cell
  (`≤0.5 physical px at DPR 1/2/3`; "two columns and at least six visible curves at
  320×568"), so this is a *partial* vacuity, not a total one — but the load-bearing
  precision threshold is self-set.
- **P02 → P07** — P02 assigns each blocker `not-reproduced` | `external-routed` |
  `blocks-adoption`. P07's acceptance: *"Acceptance requires every P02 row `not-reproduced`
  or `external-routed`"*. `external-routed` requires **no external acceptance** — P03 only
  banks an "append-only outbound digest". **The program can green its own parser-substrate
  gate by re-labelling every blocker `external-routed`.** That is a masked fallback with a
  paper trail.
- **C08** — *"the **latest clean retry** is `COMPLETE`, has zero current reopenings and
  retains every prior reopening as a sorted exact terminal owner-return hash"*, over
  *"append-only canonical attempt returns"*. Unbounded re-rolls of a fresh hostile triad,
  only the latest must be clean, prior failures retained as data but not blocking.
  **This is green-by-resampling with receipts.** C09 partly compensates ("any new mechanism
  resets the consecutive-pass count") but does not bound C08 attempts.
- **C10** — the release wave's gate is an ordered runbook; its RED condition is inherited
  from P07, which is self-assignable (above).

**(d) failures (2) — π/DELTA waived by mislabelling:**

- **K12** routing `R0 · N/A(no-visual-claim)`; K12's own gate: *"Automated
  cancel/lost-capture/1→2→1/antipodal/coalescing traces pass"*. `WAVE-ROUTING-PI.md:21`
  defines **R3** as *"Direct manipulation, gesture … PL-10 traces for position, velocity,
  acceleration/impulse, **1→2→1 pointer transitions, cancel/lost-capture**, interruption,
  settle"*. K12's gate is a verbatim recitation of the R3 obligation list under an R0
  label. The M-band peer **M05**, whose gate quotes the same traces, *is* routed
  `R3 · m05-cube-traces-π/DELTA` (`waves/M-C.md:23`). Identical obligation, two routings.
- **K21** routing `R0 · N/A(no-visual-claim)`; gate: *"`proof:k21` passes
  settle/interruption/meter/**PRM**/style traces **in both consumers**"*. PRM is an
  explicit R1/R2 axis in the routing table. Rendered motion evidence in Glass and Speedtest
  under a no-visual-claim label.

Formation-wide, **0 of 135 `N/A` rows names why no rendered claim exists** — the token
format makes it impossible.

### 4.5 Born-RED claims tested against the live tree

I probed the value.js-resident claims with `vite-node` against `src/`.

**V26 — CONFIRMED LIVE.** Claim: *"CSS-wide keyframe names and `!important` currently
survive"*.

```
$ vite-node probe4.ts   # parseStylesheet("@keyframes initial { from { color: red !important } … }")
ok: true
{"kind":"keyframes","name":"initial","rules":[{…,"declarations":[{"name":"color",…,"important":true}]}…
```
A CSS-wide keyword accepted as a keyframes name and `!important` retained inside a
keyframe block. The born-RED witness is real.

**V27 — HALF FALSE (stale born-RED).** Claim: *"`entry-crossing`/`exit-crossing` fail
while obsolete `@scroll-timeline`/`@view-timeline` parse as current."*

```
$ vite-node probe3.ts   # src/css/timeline.ts parseAnimationRange
"entry-crossing"    => {"ok":true,"value":{"start":{"phase":"entry-crossing"}},"diagnostics":[]}
"exit-crossing 50%" => {"ok":true,"value":{"start":{"phase":"exit-crossing","offset":"50%"}},…}
```
`src/css/timeline.ts:53` already includes both phases in `RANGE_PHASES`. The first clause
of the born-RED witness is **false today**. The second clause is true
(`src/css/stylesheet.ts:703` still parses `@scroll-timeline`/`@view-timeline`). Vacuous
gate **V-4** is why this passes formation validation unchallenged.

**V24P — UNVERIFIED.** Claim: *"Current parser skips garbage, accepts invalid arity/arc
flags, leaks NaN and permits explosive recursive subdivision."* `src/transform/path.ts`
exports only `PathGeometry` (class), `getTotalLength`, `getPointAtLength`; there is no
`src/svg/`. Verifying requires constructing `new PathGeometry(d)` per case and inspecting
its command list — I did not, to stay inside a read-only budget. **Command that settles
it:** `vite-node` script instantiating `new PathGeometry("M0 0 L10 10 ZZZZ garbage")`,
`"M0 0 A 5 5 0 3 9 10 10"` (invalid arc flags), `"M0 0 L NaN 5"`.

**The absent one — R1.** See §5.

---

## 5. The live shipping crash that no wave owns

`docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md:32–35` (mtime 2026-07-20 12:04):

> **F-2 — The LIVE v4 parser has 5 recorded defects; R1 is a shipping crash.**
> `parseCssColor("oklch()")` (and `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`) throws
> `TypeError` from `parseFunctionalColor` (`src/css/grammar.ts` ~L181) — the frozen public
> contract says clean `ok:false`. … **R1/R2 are defect rows for the fleet's V-band.**

Reproduced today on HEAD:

```
$ vite-node probe.ts
oklch() => THREW TypeError: Cannot read properties of undefined (reading 'replace')
rgb()   => THREW TypeError: Cannot read properties of undefined (reading 'replace')
hsl()   => THREW TypeError: Cannot read properties of undefined (reading 'replace')
lab()   => THREW TypeError: Cannot read properties of undefined (reading 'replace')
color() => THREW TypeError: Cannot read properties of undefined (reading 'replace')
rgba()  => THREW TypeError: Cannot read properties of undefined (reading 'replace')
```

Root cause is one line, `src/css/grammar.ts:180`:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```
`slash[0]` is `undefined` for an empty body; the non-null assertion hides it from tsc.

**Finding S-1 (SILENT DROP, highest severity).** Searching the four wave books:

```
$ rg -in "crash|TypeError" docs/tranches/V/vnext/waves/*.md
# only "crash/retry converges" (A09), "crash-restart-replica" (A21J), "storage crash recovery" (A26)
$ rg -n "oklch\(\)" docs/tranches/V/vnext/
PARSER-CSS-COLOR.md:116  # "…Its product-shaped W0 covers `oklch()`…"  (prototype scope, not a defect)
prototypes/c14-css/README.md:16
```

**No born-RED row in the 45-wave V band names the empty-functional-color crash.** The V
rows that touch this surface — V03, V12, V13, V14 — open on other witnesses. The
mechanism of the loss is chronological and structural: `waves/P-V.md` mtime is
**2026-07-20 07:17**, `GATE-VERDICT.md` is **2026-07-20 12:04**. The gate that found the
crash and assigned it to the V band landed **five hours after** the wave book was last
written, and the corpus is declared READ-ONLY/Codex-owned, so the obligation had nowhere
to land. R2–R5 (10 valid qualified rules over-rejected; dangling-alpha leniency; selector
range check off-api; comment-trivia folded into declaration names) are likewise absent.

This is the exact shape the audit brief calls *per-mechanism green over gestalt broken*:
the parser proof gate ran, produced a correct and damning finding, and the registry that
was supposed to receive it had already frozen.

---

## 6. Deferrals, carries and the fold that did not happen

### 6.1 The formation's own deferral law

`RETURN-CONTRACT.md:131` — *"Every partial or abandoned item is `fold`ed to an owner,
`bank`ed with a measurable retrigger, or `retire`d with rationale. **A twice-deferred
chronic gets its own decision wave.**"*

This is a good law. **No wave in the 193 implements it.** There is no chronic register, no
`retrigger` index, and nothing that can detect a twice-deferred item. `DISPOSITIONS.md`
holds 4 explicit `bank` rows (P02/P03 prototype-blocking defects; V16B SoA; P02/P03
diagnostics/recovery; K24/M02 keyframes server API) — of which **V16B is the only one with
a genuinely measurable retrigger** (>10% p95 miss in 3 independent runs; ≥20% improvement,
95% CI excluding 10%). The parse-that banks retrigger on "a separately authorized future
epoch" — i.e. on nothing.

### 6.2 The declared fold source moved after the seal

`git diff docs/tranches/V/reformation/CARRY-LEDGER.md` = **+34 lines**, adding two carries
both dated **2026-07-22** — two days after the formation sealed at `725490e9…`:

1. *"**glass BJ W4 / v8 Slider post-cut consumer hold (2026-07-22):**"* — three formation
   packet hashes, four pinned receiver components with per-file SHA-256
   (`ComponentSliders.vue`, `ConfigSliderPane.vue`, `ExtractControls.vue`,
   `GenerateControls.vue`), a property migration to `--glass-slider-track-background`,
   and a `backdrop-filter:none` cascade condition.
2. *"**glass BJ W8 / v8 refract-state consumer hold (2026-07-22; HOLD-ONLY):**"* — names
   `demo/color-picker/index.html:205–213` and `armGlassRefract`.

```
$ grep -rl "armGlassRefract" docs/tranches/V/vnext/ ; echo exit=$?
exit=1
$ grep -rl "glass-slider-track-background" docs/tranches/V/vnext/ ; echo exit=$?
exit=1
```

**Finding S-2 (SILENT DROP).** Both post-seal carries are absent from the 193-wave
registry, and the drift they caused is what crashes `validate-union-inventory.mjs` (§3.2).
The formation has no inbound channel: it is READ-ONLY, and the ledger it consumes is live.

### 6.3 The CARRY-LEDGER §B–§F fold is asserted, not performed

`UNION-ROW-INVENTORY.json` rows **ADD-1** and **R-13**:

> ADD-1 · ADD · *"**The CARRY-LEDGER fold whole** (PL-9): F-PD-06 (C3×W47), F-PD-07 (W48
> picker parity), F-PD-08 (W49/50 + D57 export seat), F-PD-09 (W52 admin), **F-PD-12 (THE
> BOOT KILL — CH-4 p75-LCP ≤2.5s close-law + W54 D-1 aurora-derive)**, F-PD-22 (W53 plate
> rebuild ON v4), F-PD-23 (W55 truth pass), F-PD-24 disposition table"* · **FOLD** ·
> owners `[G00I, D03, D03A, D06 … D25, V16R]` (24 owners)
>
> R-13 · REPAIR · *"Fold the CARRY-LEDGER §B–§F universe: W46–W56 vehicles, CH-4 p75-LCP
> close-law, W54 D-1, W53 plate, W55 re-gate, D57 export seat"* · **FOLD** · 29 owners

Now the wave books those 29 owners live in:

```
$ cd docs/tranches/V/vnext && for t in lcp p75 2.5s aurora-derive indexeddb pagehide __host webgl PaneSegmentedControl PerceivedSpacePlate SeedToken; do
    echo "$t: $(grep -oin -- "$t" waves/*.md | wc -l)"; done
lcp: 0        p75: 0        2.5s: 0       aurora-derive: 0
indexeddb: 0  pagehide: 0   __host: 0     webgl: 1   (M06, keyframes-demo Amiga scene)
PaneSegmentedControl: 0     PerceivedSpacePlate: 0    SeedToken: 0
```

`aurora` does appear 6× — but only as **D17/D17A, *"KEEP and refine the current Aurora
instrument as an output-first environmental field plate"***, which is the opposite of
"aurora derived from a singular colour". `plate` appears 6× — all D17's "field plate", not
W53's perceived-space plate.

**Finding S-3 (partial counted as done — the cardinal sin).** The union inventory records
these as `FOLD` with a `"exact CARRY mapping"` note; the receiving wave rows contain none
of the substance. Because the FOLD check is owner-ID-join only (**vacuous gate V-5**), the
formation's own machinery reports zero drop. Confirming loss list:

| CARRY row | Where it was | Presence in the 193 |
|---|---|---|
| **CH-4 / Q14-LCP boot close-law** (*"the ~5s boot dies or V′ does not close"*) | `reformation/CARRY-LEDGER.md:29`, `V-PRIME.md:94` | **0** |
| **CH-7 real-GPU oracle RUNS** | `CARRY-LEDGER.md:29` | **0** |
| **W54 D-1 aurora-derive RUNS or V′ does not close** | `CARRY-LEDGER.md:27` | **0** |
| **W54 SeedToken negative set / `script-src 'self'` / WebGPU-WebGL2 parity** | `CARRY-LEDGER.md:27` | **0** |
| **W47 `PaneSegmentedControl` 1→0 + D53.iv four shell couplings** | `CARRY-LEDGER.md:22` | **0** |
| **W48 Blob 0px chassis vs the `.26` before-frame at tag `v-blob-b0-26-ref-w40`** | `CARRY-LEDGER.md:23` | **0** |
| **W50 D55.iii `__Host-value-session` cookie transition; D57 Prepare→Download export seat (IndexedDB `ExportOperation`, 60s-`pagehide` lease)** | `CARRY-LEDGER.md:25` | **0** |
| **W53 B1 arm-A perceived-space plate rebuild ON v4** | `CARRY-LEDGER.md:28` | **0** |
| **§F gh-pages prod-preview empty mount** — *"First probe of the post-compaction deep audit"* | `CARRY-LEDGER.md:§F` | **0** (`gh-pages`, `prod-preview`, `empty-mount` → 0 files) |
| **§F `audit/rehearsal/` disposition; `ActionBarLayer` shim; M1/M2 glass replies** | `CARRY-LEDGER.md:§F` | **0** |
| **§C D49 research residue** (`auth-cookie-order.md`, `proportion-register.md`) — *"the next formation rules track-or-archive"* | `CARRY-LEDGER.md:§C` | **0** |
| **§C D53.vi app-root rename `demo/color-picker/` → `app/`** — *"next formation decides"* | `CARRY-LEDGER.md:§C` | **0** |
| **§C `scripts/dev/dev.sh`** — *"the LAST unowned dirty working-tree row … un-ruled since pre-V′"* | `CARRY-LEDGER.md:§C` | named once in `PROVENANCE.md` as a *preserve* row; **no wave owns it** |
| W56 4.1.x SCI-1/D54 vehicle | `CARRY-LEDGER.md:31` | **PRESENT** → V16R (`waves/P-V.md:103`) |

**One of fourteen §B–§F carry rows actually landed in a wave.** The union row says all of
them did.

### 6.4 The `reviews/` directory is empty

```
$ ls -la docs/tranches/V/vnext/reviews/
total 0
drwxr-xr-x 2 mkbabb staff 64 Jul 20 02:04 .
```

`PROMPT-RECAP.md:174` owes *"Fresh R4 skeptic pair plus third-Sol adjudication of the
reopened RR-17 repair"*; `PLAN.md` records *"**NOT CLEAN**; RR-17 remains open."* The
directory that would hold those reviews exists and is empty, and README's normative map
never mentions it. RR-17's disposition is **UNVERIFIED** — I found it named in
`PROMPT-RECAP.md`, `PLAN.md` and `UNION-ROW-INVENTORY.json` but found no wave owning it.
**What would verify:** a grep for `RR-17` in the wave books (`grep -n "RR-17" waves/*.md`
→ 0 hits) plus an owner ruling; there is none.

---

## 7. Named mechanisms that do not exist

Every `*.mjs` named anywhere in the wave books or root docs, checked against
`tools/` and `prototypes/c14-css/tools/`:

| Named mechanism | Present? | Named by | Declared deferred? |
|---|---|---|---|
| `validate-return.mjs` | **ABSENT** | P00, C09, RETURN-CONTRACT | **YES** — `RETURN-VALIDATOR-DEFERRED.json`, honest |
| `.vnext/proof-runner.mjs` | **ABSENT** | all 193 gate subjects | no |
| `test/proof/<slug>/run.mjs`, `manifest.json` | **ABSENT** (×193) | all 193 gate subjects | no |
| `selftest-consumer-universe.mjs` | **ABSENT** | **C00U gate**, with exact counts | no |
| `resolve-reopenings.mjs` | **ABSENT** | C09 landing | no |
| `validate-parse-that-package-receipt.mjs` | **ABSENT from the corpus** | P04 gate | no |
| `css-parse-perf.mjs` | **ABSENT** | P05 | no |
| `proof/demo-text-loader.mjs` | **ABSENT** | `TARGET-DAGS.md:174` | no |
| the 20 `tools/validate-*.mjs` + 4 selftests | present | README §Lean proof surface | — |

**Finding M-1 (declared capture missing, with fabricated precision).** C00U's gate states:
*"`selftest-consumer-universe.mjs` proves two real-Git receipts, **44 resolver rejections,
11 receipt-projection rejections**, two blocking unavailable receipts, **22 syntax
controls**, one return-annex control and **11 immutable-binding controls**."* That is 91
enumerated controls attributed to a file that does not exist. The nearest real thing:

```
$ node tools/resolve-consumer-universe.mjs --selftest
{"schema":"vnext-consumer-sass-projection-selftest/1","positive":4,"hostile":3}
```
Seven controls, all about Sass projection. This also contradicts README.md:165:
*"Standalone fixture/selftest forests … are evidence only. Compact mutation canaries belong
behind each surviving validator's `--selftest` mode."* C00U's gate still requires the
standalone forest the README retired.

**Finding M-2 (alias smuggling of a retired mechanism).** P04's gate requires
`validate-parse-that-package-receipt.mjs`. It exists — but only at
`docs/tranches/V/evidence/vnext-history/tools/` and
`docs/tranches/V/apotheosis/snapshot-vnext/tools/`, both of which `HISTORY-EVIDENCE.json`
declares `"authority": "evidence_only"` and README.md:57 places *"outside active
authority"*. P04's acceptance depends on a tool the formation formally demoted.

---

## 8. Pins already stale

`PROVENANCE.md:38–56` is a 17-repository register with branch, HEAD and a
`git status --porcelain=v1 -z` count/SHA-256 fingerprint, snapshotted `2026-07-18T16:50:04`.
Sampled today:

| Repository | Declared HEAD | Actual HEAD | Verdict |
|---|---|---|---|
| value.js | `c654824e…` | `c654824e…` | HEAD MATCH |
| value.js dirty-state | `9 / 67abe419…` | **`22 / 6fe849a8…`** | **DRIFT** |
| parse-that | `ef10d5b7…` | `ef10d5b7…` | MATCH |
| keyframes canonical (`keyframes-v-exec`) | `81a56990…` | `81a56990…` | MATCH |
| Slides-K | `5b546be4…` | `5b546be4…` | MATCH |
| **glass-ui** | `66294838…` | **`0371836d…`** | **DRIFT** |
| **active Atlas** (`.p-totality/atlas`, *"sole canonical … checkout for C01"*, declared clean) | `fe9abcfc…` | **`6dd96b91…`** | **DRIFT** |

**Finding P-1.** Three of seven sampled pins drifted within six days, including the two
that matter most operationally (the Glass producer that G00–G07 and the design epoch bind,
and the sole canonical Atlas root C01 binds). `PROVENANCE.md:57` says *"Every implementation
wave refreshes the exact NUL-delimited status"* — that is a mitigation, not a mechanism:
**no tool reads `PROVENANCE.md`** (`grep -rl PROVENANCE tools/` → nothing).

`CSS-MODULE-ISOMORPHISM.json`'s bbnf-lang pin is done **correctly** — pinned to committed
bytes (`git show af15f63e:grammar/css/l4/color.bbnf | shasum -a 256` = the declared
`e923f52c…`), even though the working-tree file has since changed (` M
grammar/css/l4/color.bbnf`). That is the pattern the register should have used. Note the
validator's own honest self-report:

```
$ node tools/validate-css-module-isomorphism.mjs
{"modules":15,"excluded":1,"edges":25,"edge_corrections":1,"filesystem_join":false,…}
```
`edge_corrections: 1` + `filesystem_join: false` means that by OA-16's own rule
(*"execution requires the upstream canonical DAG and **zero corrections**"*) this topology
**cannot be used for execution**. P00 must re-snapshot. Honest, and a real dependency on an
external freeze that has not happened.

---

## 9. What the formation gets right

A hostile audit that lists only defects is a bad audit. These are genuine:

1. **Wave counts are exact and validated.** 193 = 8+45+27+36+11+33+13+20, mechanically
   checked, with 149 seed rows bound uniquely to owner contracts (`rowIds.size !== 149`
   is a real failure).
2. **Four selftests genuinely bite.** `selftest-clean-passes` (31 mutations),
   `selftest-gate-runtime`, `selftest-deletion-gitlink`, `selftest-json-contract`
   (25 schemas / 4 positive / 10 hostile) all pass and all test falsification, not
   confirmation.
3. **The quarantine is enforced structurally**, not by convention:
   `corpus-files.mjs` throws on `r1-opus-refuted` *before* any filesystem call, and
   `corpus-epoch --selftest` proves 4 hostile paths rejected with 0 target I/O calls.
4. **The prototype is scrupulously honest about its own credit.**
   `prototypes/c14-css/proof/status.json`: `"credit":"isolated-assay-only"`,
   `"semantic equivalence remains RED"`, benchmark `comparative_credit: false`,
   current/historical `ABSENT`. It claims filename/import topology and nothing more.
5. **V16B is a correctly-constructed bank row** — the only deferral in the corpus with a
   numerically falsifiable retrigger and a predeclared retirement condition.
6. **The `state_digest` design is sound** — content-bound repository identity including
   untracked bytes and recursive gitlinks, with named canaries. Its problem is that it does
   not exist yet, not that it is wrong.
7. **`DISPOSITIONS.md` and `OWNER-AMENDMENTS.md` record reversals as reversals** (OA-16,
   OA-17, D-1, D-9, D-19), with the earlier position quoted. That is the correct shape for
   a ruling ledger, and most of this repo's history does not do it.

---

## 10. Chronic candidates — items riding 2+ closes under different names

### CHRONIC-1 · aurora derived from a singular colour — **5 closes, 5 names, now inverted**

| Close | Name it wore | Disposition |
|---|---|---|
| A (turn-1 m.13) | *"aurora derived from a singular color"* | user mandate |
| D (open #6) | aurora derive-from-color | *"precept-§10 blocked, filed sharper"* |
| J | **VAL-1** | `docs/tranches/K/PROGRESS.md:114` — *"**Chronic:** aurora-derive (→W4) … VAL-1 (→W4)"* |
| K | aurora-derive | `docs/tranches/K/K.md:16` — *"The two oldest user mandates are **still UNADDRESSED**"*; K.md:48 folds to K.W4 |
| N | aurora-derive | memory: *"the 2 oldest mandates now unilateral, land at N.W5"* |
| V′ | **D-1** | `CARRY-LEDGER.md:27` — *"**D-1 aurora-derive RUNS or V′ does not close** (L1)"* |
| **vnext** | — | **`aurora-derive` → 0 hits.** D17 = *"**KEEP and refine** the current Aurora instrument"* |

The repo's own word for it in 2026-06 was "Chronic". It is now a KEEP wave with no
tombstone, no supersession row, and no reference to the five prior deferrals. **This is a
disease row.**

### CHRONIC-2 · blob-facility extirpation — **4+ closes, now inverted to KEEP**

`docs/tranches/K/K.md:155`: *"**Blob-facility extirpation** (A turn-1 m.13 / D-open #6 /
user-request #24) — `useMetaballRenderer` + `WatercolorDot` → glass-ui. **FOLD → K.W3.**"*
`K/PROGRESS.md:114` lists it under **Chronic**. Carried through N (blob-extirpation
mandate), V′ (W54 *"D-2 blob truthful lifecycle"*).

vnext: `grep -ril extirpat docs/tranches/V/vnext/` → **0 files**. D18 =
*"**KEEP and refine** the complete Blob instrument as stage-first progressive disclosure"*,
gate *"`/blob` always Blob; **all 49 leaves remain live/owned**"*. The mandate to remove
the facility became a mandate to preserve all 49 of its parameters. **No tombstone, no
ruling cited, no supersession record in the row.**

### CHRONIC-3 · the boot / LCP blocker — **3 closes, 3 names, now dropped**

| Close | Name | Evidence |
|---|---|---|
| T | **Q14** RULED ESCALATION | `docs/tranches/T/FINAL.md:14,20` — *"the Q14 LCP/TBT budgets"*, LCP 5141 / TBT 5988; routed → U.W-PERF |
| U / V′ | **CH-4 "Q14-LCP"** | `reformation/V-PRIME.md:32,94`; `CARRY-LEDGER.md:29` — *"CH-4: p75 LCP ≤2.5s on the named matrix — **the ~5s boot dies or V′ does not close**"* |
| **vnext** | *(claimed as ADD-1 "THE BOOT KILL")* | **`lcp`/`p75`/`2.5s` → 0 hits in all four wave books.** Survives only as a string inside `UNION-ROW-INVENTORY.json` |

Three closes, never executed, each time re-deferred under a new name, and now dropped from
the wave registry while the union inventory records it as folded. **This is the highest-value
find in the scope** and exactly the pattern `RETURN-CONTRACT.md:131` says earns its own
decision wave.

### CHRONIC-4 · SoA / bulk color kernels — **correctly banked** (the control case)

3.0.0 SoA surface → D-19 tombstone → V16B `bank` with a numeric retrigger. This is what
the other three should look like. Listed here so the contrast is on the record.

### CHRONIC-5 · `scripts/dev/dev.sh` — the unowned dirty row

`CARRY-LEDGER.md:§C` — *"the LAST unowned dirty working-tree row (M, **un-ruled since
pre-V′**). Owner rules commit-or-restore; **no wave owns it**."* vnext mentions it once,
in `PROVENANCE.md`, as a *preserve* instruction. Still unowned after the formation that
was supposed to consume the ledger whole. Minor in bytes, perfect as a marker: the ledger
said "no wave owns it", the formation read the ledger, and no wave owns it.

### CHRONIC-6 · D49 research residue + `audit/rehearsal/` — *"the next formation rules track-or-archive"*

`CARRY-LEDGER.md:§C` and `§F` both hand this to the next formation by name. vnext is that
formation. `auth-cookie-order` / `proportion-register` / `HeaderRibbon` → 0 hits.
**Re-deferred by omission**, which is the least honest form of deferral.

---

## 11. Commitment ledger

| # | Commitment | Source | Audited status |
|---|---|---|---|
| 1–193 | 193 production waves | README:30–39; wave books | **STILL_OPEN** — declared 0/193; also 0 executable (no proof-runner) |
| 194–195 | two consecutive whole-corpus clean passes | `FORMATION-CLEAN-PASS-PROTOCOL.md` | **STILL_OPEN** — validator RED (`epoch drift`); corpus JSON falsely says `status:"clean"` 2/2 |
| 196 | formation ≤1,750,000 B | README:188 | **RED on the plain total** (1,750,375); unenforced either way |
| 197 | tools ≤750,000 B | README:188 | **LANDED** (713,988) — unenforced |
| 198 | clean-pass core ≤25,000 B | README:188 | **LANDED** (24,671, 329 B margin) — unenforced |
| 199 | return prose+schema ≤20,000 B | README:189 | **LANDED** (12,502) — unenforced |

**promised 199 · landed 3.** The three landed items are the three budgets I could measure
as met; nothing else in the corpus is in a state that admits verification.

---

## 12. Recommendations for the next mega-tranche (W)

1. **Commit the corpus before anything else.** A formation whose authority is untracked
   bytes cannot make an immutability claim. This is a one-command fix and it invalidates
   half of §2, §3.1 and §7.
2. **Make the four budgets executable.** ~20 lines in `corpus-epoch.mjs`. Right now the
   formation's loudest RED condition is unreadable.
3. **Replace `if (!gate.expected)` with something that can fail.** Minimum: require every
   gate cell to name ≥1 concrete falsifying input class, and reject a gate whose RED
   condition is a threshold the same wave sets (kills G09/M08 self-set, P02→P07
   self-assignment, C08 unbounded retry).
4. **Give `R0 · N/A(no-visual-claim)` a reason field** and cross-check it against the
   row's own gate vocabulary. K12 and K21 fall out immediately.
5. **Make `FOLD` prove itself.** A union row asserting FOLD into owner IDs must require a
   token from the folded requirement to appear in the owning wave's text. Applying this
   rule today turns ADD-1 and R-13 RED and recovers the 13 dropped carries in §6.3.
6. **Open the four chronic decision waves** the return contract already mandates:
   aurora-derive, blob-extirpation, Q14/CH-4 boot-LCP, D49+rehearsal residue. Each has
   ridden 3–5 closes. Each needs `fold` / `bank(retrigger)` / `retire(rationale)` — the
   law exists; nothing implements it.
7. **Land R1–R5 from `parser-proof/GATE-VERDICT.md` as V-band born-RED rows.** R1 is a live
   shipping crash in a published package, one line at `src/css/grammar.ts:180`, and no wave
   owns it.
8. **Give the formation an inbound mail path.** A READ-ONLY corpus that consumes a live
   ledger will drift again on the next inbound letter — it already has, twice, within
   48 hours of sealing.
