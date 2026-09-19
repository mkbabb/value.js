SERVED MODEL: claude-opus-5[1m]

# X.P.W4 — The PLAW-BIND Integration and the Release Condition · EXECUTION RECORD (Track D · X·P)

**Spec of record**: `docs/tranches/X/parse-that/waves/W4.md` (670 L, authored 2026-08-03; read WHOLE
by this seat).
**Wave status at this seat**: **BLOCKED-ON the §2 "Opens after" artefact conjuncts** — **3 of the 6
are RED at this seat's own clock, each double-run**, and the label conjunct (`X.P.W3 IMPLEMENTED`)
reads **NO** in both W3's own four-verb table and the LEDGER (`PARTIAL 2026-09-17`). The spec is
explicit that *"the dependency is on those artefacts, not on the label — §2b checks each"*, so the
blocking finding is stated at the artefacts and not at the status word.
**No spec-bound byte was written by this seat.** The only bytes it wrote are this record, the
LEDGER's own X.P.W4 row cell and its event line. The ten-gate baseline, the four-path mail sweep,
the six precondition receipts and the **full 4-unit plan** are banked below, so that X.P.W3 reaching
IMPLEMENTED dispatches this wave without a second open sitting.

This seat re-confirms, independently and at its own commands, the reading the X.P.W3 CHECK-1 seat
banked on 2026-09-19 (`ff54f2ac`): *"X.P.W4 is LAWFULLY BLOCKED at 3 of 6 'Opens after' conjuncts."*
Three seats have now measured the same wall from three directions.

---

## Open

**Date**: 2026-09-19 (wall clock). **Sitting of record: 2026-09-17**, the owner's begin-word
(COHESION §0j, quoted at that addendum).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, VERIFY-AND-BANK only.
**Substrate named, never assumed**: value.js `/Users/mkbabb/Programming/value.js`, branch
`tranche-u` — ⟨cmd⟩ `git log --oneline -1` → **`f0475542`**. Fresh writer root `<p2>` =
`/Users/mkbabb/Programming/parse-that-css-totality-p2` — ⟨cmd⟩ `git -C <p2> log --oneline -1` →
**`44c6583`** (`.k`'s round-6 commit), ⟨cmd⟩ `git -C <p2> status --porcelain` → **`?? .worktrees/`
only** (§4b's container, as every X·P round records it). Frozen read-only root: ⟨cmd⟩
`git -C /Users/mkbabb/Programming/parse-that log --oneline -1` → **`ef10d5b`**, unmoved.

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **11 rows**:
8 `demo/**` rows (`color-picker/App.vue` · `color-session/keys.ts` · `picker/ColorPicker.vue` ·
`shell/dock/ActionToolbar.vue` · `shell/dock/Dock.vue` · `shell/dock/layers/ActionBarLayer.vue` ·
`shell/dock/layers/GenericActionBar.vue` · `shell/usePaneRouter.ts`) — **Track A / X·V seats' live
work**; `M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's); `M eslint.config.js` (a
sibling's); `M scripts/dev/dev.sh` (**unowned, NEVER touched, never staged** — COHESION §0j.A DR-24).
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/D/X-P-W4.md
docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md` → **no output**;
⟨cmd⟩ `ls docs/tranches/X/execution/D/` → **`X-P-W0.md · X-P-W1.md · X-P-W2.md · X-P-W3.md`** — no
`X-P-W4.md`. **Zero dirty paths inside this seat's writable set; zero inherited hunks; nothing
stashed, nothing restored, no sibling path touched.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; `INBOX.md` self-excluded from its own denominator
(SELF-COUNT law); classification read from each row's Status cell **by position**, never from a bare
`grep -i UNREAD`.

| path | entries | unrowed addressed to value.js |
|---|---|---|
| `docs/tranches/V/*.md` (depth 1) | 10 | 0 |
| `docs/tranches/V/coordination/` | 24 | 0 |
| `../glass-ui/docs/tranches/BK/coordination/` | 9 | 0 |
| `../keyframes.js/docs/tranches/V/coordination/` | 13 (12 files + `vnext/`) | 0 |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | 0 |

**BK re-confirmed the newest glass tranche directory**: ⟨cmd⟩ `ls -1d ../glass-ui/docs/tranches/*/`
→ 45 dirs, the letter sequence terminating at **`BK/`** (`…BH · BI · BJ · BK`; no BL). Every
2026-09-17/18 letter on all four paths is already rowed — `glass-outbound-2026-09-18-valuejs-o26-reply.md`
**20** citations, `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` **10**,
`…-kfw7-bh-relay-ADDENDUM-A9.md` **8**, `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` **4**,
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` **19**, and the five
`*-inbox-2026-09-18-value-4.1-*` packets **1** each.
**UNREAD status cells**, by **position** (the house command, escaped pipes restored; never a bare
`grep -i unread`): ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|' '/^\| [IO]-[0-9]+[a-z]? \|/
{s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print c+0}'` → **0**, double-run
`0 ≡ 0`, over **78** register rows (of the file's **84** `^| ` rows; the six others are header and
separator rows). The naive ⟨cmd⟩ `grep -cE '\|[[:space:]]*\*{0,2}UNREAD' …` → **4**, and all four
are **sweep-prose lines, not table rows** (L219 · L225 · L229 · L239) — recorded so the two numbers
do not read as a contradiction. I-32/I-33/I-34 read *"TERMINAL AS MAIL 2026-09-19"* (X.KF.W10 `.f`).
**Register tail unmoved: I-35 / O-38.** ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -type f -name '*.md'
-newermt "2026-09-19 01:50"` → **no member**: nothing has landed on path (1) since the X.F.W7 sweep.
**Result: 0 unrowed · 0 new `I-n` minted · 0 UNREAD in X·P's scope.** A dated sweep line is appended
at `INBOX.md`'s end by this seat.

### §2b Open preconditions — measured, not narrated

| # | precondition | verdict | receipt (this seat's own command) |
|---|---|---|---|
| **OP-1** | owner begin-word **and** the separate release word | **MET** | COHESION **§0j.E**: *"both owner words are given, dated 2026-09-17"* — the begin-word opens the X·P lane, the release word is *"You are authorized to publish, push, and pull whatever items you need"*. Cited, never presumed; the word licenses the limb, it does not bypass a gate |
| **OP-2** | X.P.W3's five artefacts, the four values **re-read** | **RED — 3 of 5** | the table below |
| **OP-3** | OC-1 discharged in either direction | **MET** | COHESION **§0j.E**: *"ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* — a dated ruling of the second shape, so RC-P conjunct 5 is satisfiable |
| **OP-4** | an X·V adoption surface | **RULED, and it is disposition (C)** | COHESION **§0i.1**: S-4 → *"DISPOSITION C (BLOCKED-ON, with A named as the re-trigger's payload)"*; re-trigger = *"X.P.W4's RC-P evaluator returning TRUE at a dated run"*. G-9's terminal disposition is therefore **pre-ruled** and `.d` records it by id — it does not invent an X·V wave |
| **OP-5** | the release vehicle | **MET (measured)** | ⟨cmd⟩ `node -e "…require('./package.json').version"` → **4.0.0**; ⟨cmd⟩ `npm view @mkbabb/value.js version` → **4.0.0**. Unchanged from the 2026-08-03 authoring measurement; RC-P quantifies over `V` |
| **OP-6** | the four-verb table in all five X·P wave files | **MET** | ⟨cmd⟩ `grep -c '^### Four-verb status' waves/W{0,1,2,3,4}.md` → `W0:1 W1:1 W2:1 W3:1 W4:1`; G-10's concatenated sum → **5** (§Baseline). Every sibling has a carve target; `.d` need not halt on OP-6 |

#### OP-2, the five artefacts — the blocking finding

| artefact | spec's required value | measured (double-run, byte-identical) | verdict |
|---|---|---|---|
| `evidence/W3/universe-52.json` | **all TOTAL** | sealed file's own `tally` → `runtime {TOTAL 0 · PARTIAL 3 · ABSENT 16} · types {TOTAL 5 · ABSENT 28} · all {TOTAL 5 · PARTIAL 3 · ABSENT 44}`; the round-6 beside-bank `universe-closure-2026-09-19.g1-A.txt` (≡ `g1-B`, ⟨cmd⟩ `cmp` → identical) closes *"**RED — 6 of 52 rows are not TOTAL** (6 PARTIAL, 0 ABSENT)"* — i.e. **46 of 52** | **RED** |
| `evidence/W3/r1-anchor-after.txt` | **exit 0** | the artefact's own closing line: *"**G-2 VERDICT: RED** — unchanged, reproduced twice, and RED for a stated structural reason"*, over *"TOTAL 0 throws / 516 calls over 3 realized entries (**6 of 9 NOT REALIZED**)"*. The file is unmoved since `3a9baee4` (2026-09-18 11:49) and **no successor R1-anchor bank exists** — ⟨cmd⟩ `ls evidence/W3/ \| grep -i r1` → exactly one file. Round 6's GREEN `0 throws / 1548 calls` is the **`r1-published-totality.mjs`** probe, which packs value.js's own root: its subject is the **INCUMBENT** (W3 close, finding **A-1**: *"NOT ours"*), so it does not witness the candidate | **RED** |
| `evidence/W3/equivalence-full-surface.json` | **0 mirror-defects** | sealed `tally` → `{rows 52 · compared 8 · noPeer 44 · **mirrorDefects 5890** · specUndecided 3982}`; round-6 beside-bank `universe-closure-2026-09-19.g7-A.txt` closes *"**RED** — the equivalence floor is NOT held at full surface. **134 mirror-defects** over 24 compared rows"* | **RED** |
| `DIVERGENCE-LEDGER.md` | non-empty, **every** consumer-direction filled | **988 L · 504 table rows**; round-6 G-7 bank: `ledger 38 rows — ADJUDICATED 16 · DISSENT 4 · FIXTURE 5 · LABEL 1 · NARROWING 3 · CAPACITY 9` with *"**empty consumer-direction fields: 0**"* and *"GATE-VERDICT anchors present: 5/5"* | **GREEN** |
| `evidence/W3/bench-three-leg.md` | present | present, **202 L** | **GREEN** |

**Label conjunct.** ⟨cmd⟩ `grep -n '^| IMPLEMENTED' waves/W3.md` → `43:| IMPLEMENTED | **NO** | —
gates green + bytes landed in the fresh root stamps this (R-A) |` (×2, identical). LEDGER X.P.W3:
*"`PARTIAL 2026-09-17` STANDS … NO VERB MOVED"* and *"**IMPLEMENTED stays NO** (§12 — four of the ten
conditions unmet; §2a's coverage conjunct is not reached)"*.

**Verdict: BLOCKED-ON `X.P.W3 IMPLEMENTED` — specifically the three artefact conjuncts
(universe-52 TOTAL · the R1 anchor · the full-surface equivalence floor).** This is not a formality
and not a relief question: W4 §3 item 1 generates the 52-row seam contract **from** `universe-52.json`,
and G-1's falsifier fires on any row the universe does not back. Authoring a seam contract over a
universe that is 46/52 would publish a contract asserting six dispositions the producer cannot
honour — the exact "a contract with no green producer" shape COHESION §0i.1 refuses. **Re-trigger**:
X.P.W3 reaching IMPLEMENTED (the three artefacts at their spec values), after which this record's
§Unit plan dispatches unchanged.

**Two acts this seat declined, and why** (both are honest deferrals with their authority quoted, not
omissions):

1. **ESC-e2's harvest (COHESION §0p)** — *"The successor harvests: X.P.W4's **seat 0** re-runs the
   harvester over W3's journals (6 of 6) **at its open**"*. The wave **does not open**; a blocked
   open is not an open, and an L-13 registry append attributed to a wave that never opened would
   falsify the harvest's own seat-count semantics. The obligation is carried below, with §0p's
   mandatory procedure (*"every harvest runs from a scratch mirror with the script symlinked"* —
   F-e11/K.7(i), the harvester's 143-file spillage being a MAJOR defect owed to X-W11) named so the
   opening seat inherits it whole. LEDGER's W3 row records the state as **harvest 5 of 13**.
2. **R6-1 · F-ab1 · F-ab2 · F-ab3**, which W3's round-6 close assigns to *"X.P.W4 seat 0"*. All four
   are **instrument** defects whose cure is a write under `<p2>/typescript/test/css-equivalence/**`
   and `evidence/W3/**` — outside this seat's writable set, and outside W4 §4's File Bounds in the
   blocked state. Carried below by id.

---

## Baseline — the ten gates, read-only, BEFORE any cure

Run at this seat's own clock, 2026-09-19, against value.js `f0475542` + working tree and `<p2>`
`44c6583`. **Nine born-RED · one INHERITED-GREEN FLOOR**, exactly as §6 predicts — with **one
declared divergence from the spec's 2026-08-03 baseline (G-2)**, stated rather than smoothed.

| gate | spec's stated RED baseline (2026-08-03) | measured 2026-09-19 | verdict at open |
|---|---|---|---|
| **G-1** seam contract 52/52 | `SEAM-CONTRACT.md` does not exist — 0 of 52 rows | ⟨cmd⟩ `ls docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` → *No such file or directory* (both) | **RED as expected** |
| **G-2** zero value.js source bytes | *"the paths are clean (`git status --porcelain -- src` → 0 lines)"* | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **8 lines**, all `demo/**`, all **Track A / X·V seats' live uncommitted work** | **DIVERGENT — see the finding below** |
| **G-3** packed candidate from the tarball | no candidate package; the fresh root ABSENT by design | `<p2>` **EXISTS** (opened at X.P.W0's first write); ⟨cmd⟩ `ls <p2>/typescript/scripts/` → 14 entries, **`packed-candidate-surface.mjs` ABSENT**; the value-side idiom `scripts/ci/verify-packed-surface.mjs` **present** | **RED as expected** |
| **G-4** Wasm zero-function-import admission | *"no project Wasm artifact exists"* — zero project artifacts | ⟨cmd⟩ `find <p2> /Users/mkbabb/Programming/value.js -name '*.wasm' -not -path '*/node_modules/*'` → **6 project artifacts**, the subject built at X.P.W2: `<p2>/typescript/src/css/build/ac1.wasm` (the graduated one, `.k`'s at `44c6583`) ⊕ 5 further copies under `.worktrees/ac1|ac2|ac3/**` and `experiments/w2/**` (two more `ac1.wasm`, one `ac2.wasm`, one `ac3.wasm`, one worktree `typescript/src/css/build/ac1.wasm`). The 2026-08-03 baseline's *"zero project artifacts"* is superseded by X.P.W2's landing — recorded, not treated as drift. **`wasm-admission.mjs` ABSENT** — the gate has a subject and no inspector | **RED as expected** (subject now exists; the admission is unrun) |
| **G-5** RC-P evaluator exists and reports honestly | evaluator absent; all six conjuncts FALSE | ⟨cmd⟩ `ls <p2>/typescript/scripts/rc-p-evaluate.mjs` → *No such file or directory*. Conjunct 1 `npm view @mkbabb/value.js version` → **4.0.0** (`package.json#version` → **4.0.0**); conjunct 3 → 5,890 sealed / 134 live mirror-defects; conjunct 4 → no admitted artifact; **conjunct 5 is now TRUE by COHESION §0j.E** (the one cell that moved since authoring); conjunct 6 → packet absent | **RED as expected** |
| **G-6** reciprocity, both ends | *"neither sub-tranche's wave directory exists"* — 0 hits | ⟨cmd⟩ `ls -d docs/tranches/X/{keyframes,fourier}/waves` → **both exist**; ⟨cmd⟩ `grep -rn 'RC-P' …` → **25 hits across 5 files** (`KF-W2.md · KF-W3.md · KF-W5.md · KF-W10.md · F-W0.md`). The **count** clause is satisfiable; the gate's real condition — the three **exact** sentences, each citing the predicate by name and not the wave number — is **unverified** and is `.c`'s to verify (never to write) | **RED as expected** (falsifier not yet run) |
| **G-7** forbidden edge at zero — **INHERITED-GREEN FLOOR** | 0 hits in both fourier manifests | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; ⟨cmd⟩ `… web/package.json` → **0** | **GREEN — the spec's declared floor** |
| **G-8** mail closed + lawful delivery path | INBOX X·P hits **0**; `RELEASE-PACKET.md` absent | ⟨cmd⟩ `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → *No such file or directory*; ⟨cmd⟩ `grep -c 'X·P\|X.P.W\|RC-P' docs/tranches/V/coordination/INBOX.md` → **39** (X·P now has mail rows, none of them the packet's); UNREAD status cells **0 of 84 rows** | **RED as expected** (the packet leg) |
| **G-9** adoption gap terminal disposition | no X·V wave adopts a parser | unmoved at the bytes — ⟨cmd⟩ `grep -n 'adopt a parser' docs/tranches/X/waves/W9.md` → `296:  adopt a parser; it records why value.js ships none of parse-that today.` (the sentence wraps at L295/296 — a literal one-line grep of it returns nothing, which is why the pattern is the unwrapped fragment); ⟨cmd⟩ `grep -n 'G31' …W9.md` → `298` (sub-gate) · `373` (*"**RED [measured]** — dependencies are exactly `{"@mkbabb/glass-ui":…`"*). **The disposition is pre-ruled (C)** at COHESION §0i.1 and `.d` records it by id | **RED as expected** (unrecorded, pre-ruled) |
| **G-10** the R-A stamp act | open-state sum must read **5** | ⟨cmd⟩ `cat waves/W0.md W1.md W2.md W3.md W4.md \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **5** (×2, identical) — the **correct open state**; the close condition (sum 0) is unmet | **RED as expected at close; open-state assertion MET** |

### The one declared divergence — G-2's baseline is not the clean state the spec measured

The spec wrote G-2's RED baseline as *"the property is **unasserted** … the paths are clean …
so the gate starts from a true state and its job is to keep it true through nine commits."* At this
seat's clock the paths are **not** clean: eight `demo/**` rows are dirty. **None of them is X·P's** —
they are Track A's live X·V work (`ActionToolbar.vue` appeared during this very sitting), and X·V
owning its own bytes is precisely what G-2 exists to protect. Consequence, recorded now so no later
seat mistakes it for an X·P violation:

* G-2's literal command (*"is empty at every commit"*) is **unsatisfiable by any act of X·P** while
  Track A is open — the same shape as X.P.W3's ESC-d2/A-1 (*"the probe's subject is the incumbent"*).
* The reading that **is** X·P's and **is** satisfiable is the commit-scoped one the spec's own §9
  states: *"**No commit in this wave may contain a path under `src/**`, `demo/**`, `api/**`**"* —
  a per-commit pathspec assertion, not a tree-wide porcelain assertion. `.a`–`.d` bank
  `evidence/W4/value-source-untouched.txt` as the chain of custody for **their own commits**, and
  the tree-wide leg is recorded with its cause (Track A's open waves) rather than cured — *"a seat
  that breaks a working tree to satisfy a gate"* is G-7's named failure mode and it generalizes.
* This divergence is **declared, not patched**: no sibling's dirty path was touched, staged, stashed
  or restored by this seat.

### R.2 — GREEN before cure

**One**: **G-7** (0 hits in both fourier manifests, before any act of this wave). It is **not a
finding**: §6 declares G-7 *"an INHERITED-GREEN FLOOR"* with its baseline measured and its
regression falsifier named — *"it can only be lost, never won, and losing it voids the wave."*
Recorded here because R.2 requires every pre-cure GREEN to be listed, not because it surprises.
The other nine are RED at open, as §6 states.

---

## Unit plan — 4 units, BANKED AND UNDISPATCHED

Built from §5 Agent Units ⊕ §4 File Bounds ⊕ §4a Disjointness ⊕ §4b Worktree Plan ⊕ the §2 Agents
line. **Peak concurrency 2** (the four-workflow cap and §5's *"`.a` and `.b` are the only parallel
pair"*). **No unit is dispatched while the wave is blocked.**

**Order**: `[.a ∥ .b]` → `[.c]` → `[.d]`.

### X.P.W4.a — the seam contract (`opus`)

* **Sections**: §5 `X.P.W4.a` (L246–261) · §3 items 1–2 (L96–105) · §6 **G-1** (L352–369) · **G-2**
  (L371–381) · §2c rows L86 (non-goals), L91 (O-15 PT-01/03/04/07), L92 (M-22 citation discipline).
* **Writable**: `docs/tranches/X/parse-that/SEAM-CONTRACT.md` (create) ·
  `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` (create).
* **Gates**: G-1, G-2.
* **Locks**: parallel with `.b`, shares no path (§4a). Docs-only — **no worktree**, writes in
  value.js on clean main (§4b). One commit, §9's first message.
* **Brief**: Generate one row per frozen `/css` export from `evidence/W3/universe-52.json` (52 rows:
  19 runtime + 33 types, the 19+33 measurement pasted in the commit body); hand-annotate **only** the
  disposition column (`identical` / `declared-divergence <id>` / `not-provided`) and the
  consumer-direction field. Name the seam in **both** vocabularies (§3.2): `V.L1`/`V.L5` as
  historical receiver coordinates (M-21 audit-subject, never standing authority) **and** `src/css/**`
  held by X-W9.a, with `src/css/index.ts`/`types.ts` as the frozen surface. Add §Non-goals (relative
  colour recognised-not-validated; `color-mix()` a both-sides gap, GROUND-A P-028), §What the
  consumer inherits from parse-that (O-15's PT-01 · PT-03 · PT-04 · PT-07, each with its X.P.W3 cure
  state), §Open contract questions (GROUND-C `±Infinity`; the token-juxtaposition dissent). Then
  author `seam-contract-check.mjs` — prints **both** set-differences against `universe-52.json` and
  every row whose disposition contradicts `DIVERGENCE-LEDGER.md`; exits non-zero on any. Run it,
  paste both directions ∅. Write **zero** bytes under `src/**`, `demo/**`, `api/**`.

### X.P.W4.b — the packed-release protocol and the Wasm admission (`opus`)

* **Sections**: §5 `X.P.W4.b` (L263–276) · §3 items 3–4 (L106–111) · §6 **G-3** (L383–397) · **G-4**
  (L399–428, the exact inspection command at L405–416) · §4b Worktree Plan (L216–237).
* **Writable**: `<p2>/typescript/scripts/packed-candidate-surface.mjs` (create) ·
  `<p2>/typescript/scripts/wasm-admission.mjs` (create) ·
  `docs/tranches/X/parse-that/evidence/W4/packed-surface.json` ·
  `docs/tranches/X/parse-that/evidence/W4/wasm-imports.json`.
* **Gates**: G-3, G-4.
* **Locks**: parallel with `.a`, shares no path. **Worktree `<p2>/.worktrees/w4b`** — *inside* the
  fresh root, never beside it (the ONE-root law; a `<p2>-w4b` sibling would be indistinguishable
  from an unlawful root in W0's census). Own `typescript/node_modules`;
  `CARGO_TARGET_DIR=<p2>/target/w4b`. The orchestrator runs `git worktree list` / `git worktree add`
  in `<p2>` before dispatch and records that **no worktree of the read-only `parse-that` root
  exists**. One commit, §9's second message.
* **Brief**: `npm pack --ignore-scripts` in the fresh root; install the tarball into a **clean temp
  consumer**; resolve every seam-contract symbol **from the installed path** (never the source tree —
  cand-O's dist-drift finding, L-12); assert the forbidden deep specifiers refuse; emit
  `packed-surface.json` with the tarball sha256, per-symbol resolution and the refusals. Cross-check
  against the value-side idiom by running `node scripts/ci/verify-packed-surface.mjs <tarball>`
  (execute, no write). Then the Wasm admission on the X.P.W2 artifact
  (`<p2>/typescript/src/css/build/ac1.wasm`): the §6 G-4 command verbatim — full import list printed,
  **function-kind count 0**, empty-import-object instantiation must not throw, memory/table/global
  imports permitted **only if printed and accounted**. A third failed install attempt is a §3a
  triumvirate trigger, never a fourth retry.

### X.P.W4.c — the release condition and its reciprocity (`opus`, serial after `.a` ∥ `.b`)

* **Sections**: §5 `X.P.W4.c` (L278–291) · §3 items 5–6 (L112–116) · §6a **RC-P normative**
  (L321–350) · **G-5** (L430–438) · **G-6** (L440–459) · **G-7** (L461–470) · §10 cross-repo edges
  (L608–621).
* **Writable**: `docs/tranches/X/parse-that/RELEASE-CONDITION.md` (create) ·
  `<p2>/typescript/scripts/rc-p-evaluate.mjs` (create) ·
  `docs/tranches/X/parse-that/evidence/W4/rc-p-evaluation.json` ·
  `docs/tranches/X/parse-that/evidence/W4/reciprocity-grep.txt`.
* **Gates**: G-5, G-6, G-7.
* **Locks**: serial — needs `.a`'s contract (conjunct 1 resolves the 52) and `.b`'s admission
  (conjunct 4). One commit, §9's third message.
* **Brief**: Author `RELEASE-CONDITION.md` reproducing §6a **verbatim** as its normative core, with
  the six commands and the COHESION §2 citation quoted (*"gate-keyed, never scheduled"*). Author
  `rc-p-evaluate.mjs --version <V>`: six rows, each **run at evaluation time** against the registry
  coordinate — never a cached verdict, never a document read except conjunct 5 (BAR-DISCHARGED, a
  ruling) and conjunct 6's mail leg; exits non-zero while any conjunct is false, naming which.
  Conjunct 5 evaluates **TRUE** on COHESION §0j.E (OC-1: correctness-decided, bench recorded-not-gating)
  once W3's three-leg table is cited — cite the ruling id, never re-open it. Run it, bank the
  honest table (expected: FALSE, with the failing conjuncts named). Then write the three reciprocity
  sentences (§6 G-6, verbatim) and **deliver** them — KF.W3's to X·KF's authoring seat, F.W0's to
  X·F's, the adoption wave's to X·V + the owner — **delivering is not writing into another seat's
  file**; verify both far ends by grep and bank `reciprocity-grep.txt`. Any pressure to drop, weaken
  or escape-hatch a conjunct **halts the wave** (§3a).

### X.P.W4.d — the sub-tranche release close (`fable`, fresh adjudicator, serial last)

* **Sections**: §5 `X.P.W4.d` (L293–312) · §3 items 7–10 (L117–130) · §6 **G-8** (L472–501) ·
  **G-9** (L503–519) · **G-10** (L521–543) · §4 carve rows (L166–183) · §4a cross-wave (L206–214) ·
  §12 L-18 rider (L651–665).
* **Writable**: `docs/tranches/X/parse-that/waves/W4-CLOSE.md` (create) ·
  `docs/tranches/X/parse-that/RELEASE-PACKET.md` (create) · `waves/W0.md` `W1.md` `W2.md` `W3.md`
  (**modify-carve: the four-verb table's `VERIFIED` row only**) ·
  `docs/tranches/V/coordination/INBOX.md` (mail rows only) · `docs/tranches/X/COHESION.md`
  (**modify-carve: §1 SS-5 status cell + §5 status board line only**) ·
  `docs/tranches/V/megatranche/registry/harvest/x-p-w4.json` (create) ·
  `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (append, **by the harvester script only**).
* **Gates**: G-8, G-9, G-10 + the harvest seat count == units dispatched (**4**).
* **Locks**: **ONE commit, unsplit** (§9's fourth message covers all of: `W4-CLOSE.md`,
  `RELEASE-PACKET.md`, the four VERIFIED rows, `INBOX.md`, the two COHESION cells,
  `x-p-w4.json` + the ledger append). **Must not run concurrently with any open X·V mail unit**
  (§4a: X-W11.e and X-W9's packet unit also write `INBOX.md`). A **fresh** Fable seat — one that
  authored no gate of this wave (M-23 §1).
* **Brief**: Under L-14, attempt refutation of the three central claims **before** certifying —
  that the seam is complete, that RC-P is unarguable, that no value.js byte moved — and record the
  attempts. Write `W4-CLOSE.md` with all ten gates' RED-before/GREEN-after outputs pasted. Record
  **G-9's terminal disposition by id: COHESION §0i.1 = disposition (C)**, `BLOCKED-ON` the parser
  proof gate reading GREEN, re-trigger *"X.P.W4's RC-P evaluator returning TRUE at a dated run"*,
  with disposition (A) named as the re-trigger's payload — **never author an X·V wave**. Author
  `RELEASE-PACKET.md` **in this repo** (seam summary · every `declared-divergence` row's
  consumer-direction · RC-P(V)'s six rows quantified over `V`, **no version literal**); row it in
  `INBOX.md` with **that in-repo path** as the delivery point **and** the **SS-6** batch that carries
  it cross-repo (COHESION §1 SS-6, quoted, never rewritten); write **no byte** under
  `keyframes.js/**` and open **no** channel. Close X·P's mail to zero UNREAD. Run the L-13 harvest
  **from a scratch mirror with the script symlinked** (COHESION §0p F-e11) and file `x-p-w4.json`
  with seat count 4 — the `DEFECT-LEDGER.md` append is the harvester's, never hand-edited. Perform
  the **single R-A stamp act**: W0..W4's four-verb `VERIFIED` rows IMPLEMENTED→**VERIFIED**, one row
  edit per file, verbs kept in separate fields, only after G-1..G-9 are green
  (`cat … | grep -c 'VERIFIED | \*\*NO\*\*'` → **5** at open, **0** at close). Then the two COHESION
  carve cells. ACCEPTED is **not** claimed (§12: post-quartet).

### Carried obligations the opening seat inherits (by id, none discharged here)

| id | source | owner named there |
|---|---|---|
| **ESC-e2** harvest, 6 of 6 over W3's journals, from a scratch mirror with the script symlinked | COHESION §0p | *"X.P.W4's seat 0 … at its open"* — deferred because the wave did not open; LEDGER records **harvest 5 of 13** |
| **R6-1** `dual-target-identity.json` has no round-6 beside-bank (sealed 79,674 vs live 239,022) | X.P.W3 round-6 close | *"X.P.W4 seat 0"* — instrument, `<p2>` write, out of this seat's set |
| **F-ab1** `candidateTypeNames` hard-coded five-name literal at three `test/css-equivalence/` sites while `ac1.d.ts` measures **33** (28 type rows + ledger row **CN-3** assert a falsehood) | X.P.W3 round-6 close | *"X.P.W4 seat 0"* — F-z2's class, cured for HEADS and not for TYPES |
| **F-ab2** `universe-closure-2026-09-19.g7-evidence.json` carries no `servedModel` where its seven siblings do | X.P.W3 round-6 close | *"X.P.W4 seat 0"* |
| **F-ab3** G-7's `ledgerRows` audit omits `INCUMBENT_DEFECTS` — reads **38** where the census says **41** | X.P.W3 round-6 close | *"X.P.W4 seat 0"* |
| **R-f1** the input window (Θ.input 65,458 → 14,107 derived): shape (a) `cap₃ = K × INPUT_CAP` with the linear-memory cost printed, else (b) a per-entry window table on both lowerings | COHESION §0r | *"Ruled for X.P.W4"* — the adoption seam |
| **ESC-c1** `resetPackrat()` clears the memo store and does not disarm (`symmetric:false`) | X.P.W3 §Close | *"X.P.W4 / the parse-that library seam"* |
| **E-2 / F-e10** C-4's dead falsifier (0 of 18,224 rejections) | COHESION §0r carried | *"→ W4"* |
| **ESC-d1** G-7's mirror-defect count (now **134**) | X.P.W3 §Close | *"X.P.W4 · X·V"* |
| **E-h5 · E-h4/E-i1 · E-j1 · E-j2 · E-k1 · E-k2** | X.P.W3 round-6 close, returned unruled | the triumvirate / orchestrator — **not** this wave's to presume |

---

## Unit receipts

*(empty — no unit was dispatched; the wave is BLOCKED-ON `X.P.W3 IMPLEMENTED`.)*

---

## RESUME 2026-09-19 (SECOND OPEN ATTEMPT) — THE THREE SEALS MOVED; ONE CONJUNCT TURNED GREEN; TWO REMAIN RED; THE WAVE STAYS BLOCKED

**SERVED MODEL: claude-opus-5[1m]** — SEAT 0 (OPEN), VERIFY-AND-BANK only, a **different seat** from
the first attempt above. That attempt's every measurement is preserved **verbatim** (E-3): it was
taken at value.js `f0475542` / `<p2>` `44c6583`, **before** X.P.W3's round 7 (`.l` `92ed4cc` · `.m`
`b07e32d`) re-emitted the three OP-2 seals. This sitting re-reads them at their new bytes and
re-runs all ten gates at its own clock; **nothing is inherited**.

**Sitting of record: 2026-09-17** (the owner's begin-word, COHESION §0j). Wall clock 2026-09-19.

**Substrate, named and measured, never assumed**: value.js `/Users/mkbabb/Programming/value.js`,
branch `tranche-u` — ⟨cmd⟩ `git log --oneline -1` → **`8617f4b5`**. Fresh writer root `<p2>` =
`/Users/mkbabb/Programming/parse-that-css-totality-p2` — ⟨cmd⟩ `git -C <p2> log --oneline -1` →
**`b07e32d`** (`.m`'s round-7 commit), ⟨cmd⟩ `git -C <p2> status --porcelain` → **`?? .worktrees/`
only**; ⟨cmd⟩ `git -C <p2> worktree list` → 4 entries, **all inside the root**
(`.worktrees/ac1|ac2|ac3`), **no `<p2>-w4*` sibling** (§4b's ONE-root law). Frozen read-only root:
⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that log --oneline -1` → **`ef10d5b`**, unmoved.

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **4 rows**:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) · `M docs/tranches/X/waves/evidence/W4/action-bar-mix-390.png`
and `…-desktop.png` (**Track A's X-W4 evidence**, a sibling seat's) · `M scripts/dev/dev.sh`
(**unowned, NEVER touched, never staged**). ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/D/X-P-W4.md docs/tranches/X/execution/LEDGER.md
docs/tranches/V/coordination/INBOX.md` → **no output**. ⟨cmd⟩ `git -C <p2> status --porcelain` →
`?? .worktrees/` alone. **Zero dirty paths inside this seat's writable set · zero inherited hunks ·
nothing stashed, nothing restored, no sibling path touched.**

### E13 Step-0 — the four-path mail sweep, re-run at this seat's clock

Swept read-only and compared against **every row** of `docs/tranches/V/coordination/INBOX.md`;
`INBOX.md` self-excluded from its own denominator (SELF-COUNT law); classification read from each
row's Status cell **by position**, never from a bare `grep -i UNREAD`.

| path | entries | unrowed addressed to value.js |
|---|---|---|
| `docs/tranches/V/*.md` (depth 1) | 10 | 0 |
| `docs/tranches/V/coordination/` | 24 | 0 |
| `../glass-ui/docs/tranches/BK/coordination/` | 9 | 0 |
| `../keyframes.js/docs/tranches/V/coordination/` | 13 (12 files + `vnext/`) | 0 |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | 0 |

**BK re-confirmed the newest glass tranche directory**: ⟨cmd⟩ `ls -1d ../glass-ui/docs/tranches/*/`
→ **45** dirs, the letter sequence terminating at **`BK`** (`… BH · BI · BJ · BK`; no BL), and
⟨cmd⟩ `ls -1dt …` → `BK/ · BJ/ · BI/` by mtime as well. **Movement since the first attempt**:
⟨cmd⟩ `find <the four paths> -type f -name '*.md' -newermt "2026-09-19 00:00"` → exactly **two**
members — `docs/tranches/V/coordination/INBOX.md` (**self**) and
`../keyframes.js/docs/tranches/V/coordination/INBOUND-LEDGER.md`, which is **keyframes' own inbound
ledger, not a letter addressed to value.js**; its tail closes *"Nothing is owed by this side on
either letter"* and it mints no row, so it needs no `I-n`.
**UNREAD status cells**, by **position**: ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|'
'/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print c+0}'`
→ **0**, double-run **`0 ≡ 0`**, over **79** register rows (of the file's **85** `^| ` rows).
**WRITE-THEN-MEASURE, stated rather than smoothed**: this seat's *first* reading was **78** rows with
the tail at **O-38**; between that reading and the settled bytes a **sibling X·F seat appended
`O-39`** (value.js's *own outbound*, the F.W8 FN-6 relay to fourier) — four tracks share this
append-only file by row, exactly as `W4.md` §4a anticipates. The count above is the re-read at the
settled bytes and the scan is re-run there: **0 ≡ 0 UNREAD over 79 rows**. **No row was minted by
this seat**; the tail moved by a sibling's act, not by this sweep.
**Result: 0 unrowed · 0 new `I-n` minted · 0 UNREAD in X·P's scope.** A dated sweep line is appended
at `INBOX.md`'s end by this seat.

### §2b Open preconditions — re-measured at this seat's own commands

| # | precondition | verdict | receipt |
|---|---|---|---|
| **OP-1** | owner begin-word **and** the separate release word | **MET** | COHESION **§0j.E**: *"both owner words are given, dated 2026-09-17"*; the release word *"You are authorized to publish, push, and pull whatever items you need"*. The word licenses the limb; it does not bypass a gate |
| **OP-2** | X.P.W3's five artefacts, the four values **re-read** | **RED — 2 of 5** (was 3 of 5) | the table below |
| **OP-3** | OC-1 discharged in either direction | **MET** | COHESION **§0j.E**: *"ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* — a dated ruling of the second shape; RC-P conjunct 5 is satisfiable |
| **OP-4** | an X·V adoption surface | **RULED — disposition (C)** | COHESION **§0i.1**: *"**Ruled: C.** The row closes `BLOCKED-ON` + re-trigger … **Re-trigger command:** X.P.W4's RC-P evaluator returning TRUE at a dated run"*, with **A** named as that re-trigger's payload. G-9 is pre-ruled; `.d` records it by id and authors no X·V wave |
| **OP-5** | the release vehicle | **MET (measured)** | ⟨cmd⟩ `node -e "…require('./package.json').version"` → **4.0.0**; ⟨cmd⟩ `npm view @mkbabb/value.js version` → **4.0.0**. RC-P quantifies over `V`, never a literal |
| **OP-6** | the four-verb table in all five X·P wave files | **MET** | ⟨cmd⟩ `grep -c '^### Four-verb status' waves/W{0,1,2,3,4}.md` → `1 · 1 · 1 · 1 · 1`. Every sibling has a carve target (but see **F-w4b-1** on G-10's *count*) |

#### OP-2 — the five artefacts at their round-7 values (each double-run; all three seals `shasum -c` verified)

⟨cmd⟩ `shasum -a 256 -c universe-52.json.sha256 equivalence-full-surface.json.sha256
r1-anchor-after.txt.sha256` → **OK · OK · OK**.

| artefact | spec's required value | measured 2026-09-19 (double-run, byte-identical) | verdict | moved since attempt 1 |
|---|---|---|---|---|
| `evidence/W3/universe-52.json` | **all TOTAL** | `tally` → `runtime {TOTAL 13 · PARTIAL 6 · ABSENT 0} · types {TOTAL 33 · PARTIAL 0 · ABSENT 0} · all {TOTAL 46 · PARTIAL 6 · ABSENT 0}` — **46 of 52** | **RED** | yes: 5/52 → **46/52** |
| `evidence/W3/r1-anchor-after.txt` | **exit 0** | re-banked by `.m` over the **CANDIDATE's** nine entries (⟨cmd⟩ `node typescript/scripts/r1-anchor-candidate.mjs --at typescript/src/css`): *"TOTAL 0 throws / 1548 calls · DISTINCT FAILURE MODES: 0 · GREEN — every public parser is total · **EXIT=0, both runs**"*, in **each** lowering; `unrealized NONE — all nine frozen parsers are published`; the value.js probe **unmodified** (sha `77678a57…`) | **GREEN** | **yes — this is the one conjunct that turned** |
| `evidence/W3/equivalence-full-surface.json` | **0 mirror-defects** | `tally` → `{rows 52 · compared 24 · noPeer 28 · **mirrorDefects 98** · specUndecided 96}` | **RED** | yes: 5,890 → **98** |
| `DIVERGENCE-LEDGER.md` | non-empty, **every** consumer-direction filled | **988 L · 504 `^\| ` rows**; ⟨cmd⟩ `grep -c '^\| \*\*consumer direction\*\*'` → **41**, ⟨cmd⟩ empty-field regex → **0**; the file's own §closure line: *"**Empty consumer-direction fields: 0.**"* and *"`GATE-VERDICT.md` anchors present: 5/5"* | **GREEN** | no |
| `evidence/W3/bench-three-leg.md` | present | present, **202 L** | **GREEN** | no |

**The §0v / `W4.md`-ADDENDUM relief clause, tested at the bytes rather than at the prose.** The
2026-09-19 addendum to §2/OP-2 admits `IMPLEMENTED-with-carried-REDs-by-id` **iff** *"every non-TOTAL
cell … every residual mirror-defect … and every non-zero reading of the candidate-side
`r1-anchor-after.txt` is attributed to a ruling id from {GROUND-C · ID-1/ID-2 · R-f1 · E-k2} and none
is unauthored surface."* Measured by this seat, twice, identically:

* **universe-52.json — FAILS.** Reading the `remainder` map of each non-TOTAL row and classifying by
  the addendum's id-set (ID-1 = *"the incumbent's UNANCHORED component read"*, ID-2 = *"the incumbent
  accepts an EMPTY argument"*, per §0v's own gloss): **270** non-TOTAL cells, of which **37 are IN the
  set** and **233 are OUT** — `BND-1` **172** · `F-k2` **42** · `SH-1` **11** · `E-j1`(tag) **5** ·
  literally **`unattributed` 3**. Under `.m`'s own per-cell re-read (36 of the `F-k2`-tagged cells
  re-read as GROUND-C non-finite fourth arguments, F-l1) the split is **75 in / 195 out** — *the
  verdict is the same under both readings*, and `.m` states it in its own addendum: *"Measured: **75 of
  270** are. **195 are not** — each with a named id, none with a ruling from that set."*
* **equivalence-full-surface.json — FAILS.** ⟨cmd⟩ over every row's `misses`: **196** miss entries
  (98 per lowering, matching the sealed `mirrorDefects 98`), **192** carrying `specUndecided: true`,
  and **0** carrying a ruling-id field of any name (`rulingId` / `ruling` / `attribution` /
  `declared`). The artefact has no attribution surface at all, so the clause cannot be satisfied by
  reading it.
* **r1-anchor-after.txt — SATISFIED VACUOUSLY**: there is no non-zero reading to attribute.

**Label conjunct.** ⟨cmd⟩ `grep -n '^| IMPLEMENTED' waves/W3.md` → `43:| IMPLEMENTED | **NO** | —
gates green + bytes landed in the fresh root stamps this (R-A) |` (L43 **unedited**, E-3), and W3's
sixth dated addendum records the stamp **WITHHELD** in those words: *"**IMPLEMENTED** | **NO —
WITHHELD**. L43's sealed cell stands unedited (E-3) … the stamp is withheld on **one** conjunct: the
id-set."* The LEDGER's X.P.W3 row concurs, and X.P.W3's own CHECK 1 (2026-09-19, a fresh adversarial
seat) states the consequence for this wave in its own words: *"**X.P.W4 lawfully BLOCKED** at 3 of 6
Opens-after conjuncts."* This seat measures **2 of 6 RED** — one better, because `.m`'s candidate-side
R1 bank landed after that check was written — and the same verdict.

**Verdict: BLOCKED-ON `X.P.W3 IMPLEMENTED`**, at two artefact conjuncts (`universe-52.json` TOTAL ·
the full-surface equivalence floor) whose relief clause is measured false in both directions. This is
not a formality: W4 §3 item 1 generates the 52-row seam contract **from** `universe-52.json`, and
G-1's falsifier fires on any row the universe does not back — a seam contract published over 46/52
would assert six dispositions the producer cannot honour, the exact *"contract with no green
producer"* shape COHESION §0i.1 refuses.

**Re-trigger, quoted from the authority that owns it** — `W3.md`'s sixth addendum, §D: *"**What
discharges it — one triumvirate act, not a unit's work.** Either (a) the §0v/OP-2 enumeration is
**widened by dated addendum** to the standing ids this wave actually carries — `BND-1` · `SH-1` ·
`E-j1`(tag) · `F-k2` · `F-m1` … — or (b) those ids are **ruled**."* Neither is a seat's act (M-23 §1),
and this seat performs neither. After either, re-run this section's six conjunct commands; the §Unit
plan below then dispatches unchanged.

---

## Baseline (second sitting) — the ten gates, read-only, BEFORE any cure

Run at this seat's own clock against value.js `8617f4b5` and `<p2>` `b07e32d`. **Nine born-RED · one
INHERITED-GREEN FLOOR**, as §6 predicts. One reading changed since the first attempt and one finding
is new; both are stated rather than smoothed.

| gate | spec's stated baseline (2026-08-03) | measured 2026-09-19 (second sitting) | verdict at open |
|---|---|---|---|
| **G-1** seam contract 52/52 | `SEAM-CONTRACT.md` absent — 0 of 52 rows | ⟨cmd⟩ `ls docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` → *No such file or directory* (**both**) | **RED as expected** |
| **G-2** zero value.js source bytes | *"the paths are clean … the gate starts from a true state"* | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **0 lines**, double-run `0 ≡ 0`. **The first sitting's divergence is GONE** (it measured 8 dirty `demo/**` rows, Track A's live work, since committed) — the tree now matches the spec's own baseline exactly | **state TRUE at open; the assertion is what is owed** |
| **G-3** packed candidate from the tarball | no candidate package; the fresh root ABSENT by design | `<p2>` **EXISTS** (opened at X.P.W0's first write); ⟨cmd⟩ `ls <p2>/typescript/scripts/` → **15** entries, **`packed-candidate-surface.mjs` ABSENT**; the value-side idiom `scripts/ci/verify-packed-surface.mjs` **present** | **RED as expected** |
| **G-4** Wasm zero-function-import admission | *"no project Wasm artifact exists"* | ⟨cmd⟩ `find <p2> /Users/mkbabb/Programming/value.js -name '*.wasm' -not -path '*/node_modules/*'` → **8 hits = 6 project artefacts ⊕ 2 unrelated** Chrome-profile TTS binaries under `.claude/worktrees/**/WasmTtsEngine/`. The graduated subject is `<p2>/typescript/src/css/build/ac1.wasm` (X.P.W2's, carried through `.k`/`.l`/`.m`); the other five are worktree/experiment copies (`ac1` ×2, `ac2`, `ac3`, one worktree `src/css/build/ac1.wasm`). **`wasm-admission.mjs` ABSENT** — the gate has a subject and no inspector | **RED as expected** |
| **G-5** RC-P evaluator exists and reports honestly | evaluator absent; all six conjuncts FALSE | ⟨cmd⟩ `ls <p2>/typescript/scripts/rc-p-evaluate.mjs` → *No such file or directory*. Conjunct 1 → **4.0.0** at both the manifest and the registry; conjunct 2 → the candidate-side anchor is **GREEN** (the one conjunct that moved); conjunct 3 → **98** mirror-defects; conjunct 4 → no admitted artifact; conjunct 5 → **TRUE by COHESION §0j.E**; conjunct 6 → packet absent | **RED as expected** |
| **G-6** reciprocity, both ends | *"neither sub-tranche's wave directory exists"* — 0 hits | ⟨cmd⟩ `ls -d docs/tranches/X/{keyframes,fourier}/waves` → **both exist**; ⟨cmd⟩ `grep -rn 'RC-P' …` → **25 hits over 5 files** (`KF-W2 · KF-W3 · KF-W5 · KF-W10 · F-W0`). The **count** clause is satisfiable; the gate's real condition — the three **exact** sentences, each citing the predicate by name and not a wave number — is **unverified** and is `.c`'s to verify (never to write) | **RED as expected** (falsifier not yet run) |
| **G-7** forbidden edge at zero — **INHERITED-GREEN FLOOR** | 0 hits in both fourier manifests | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; ⟨cmd⟩ `… web/package.json` → **0** | **GREEN — the spec's declared floor** |
| **G-8** mail closed + lawful delivery path | INBOX X·P hits **0**; `RELEASE-PACKET.md` absent | ⟨cmd⟩ `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → *No such file or directory*; ⟨cmd⟩ `grep -c 'X·P\|X.P.W\|RC-P' INBOX.md` → **41** (X·P has mail rows; **none of them the packet's**); UNREAD status cells **0** | **RED as expected** (the packet leg) |
| **G-9** adoption gap terminal disposition | no X·V wave adopts a parser | unmoved at the bytes; **the disposition is pre-ruled (C)** at COHESION §0i.1 with its re-trigger named, and `.d` records it by id — it does not invent an X·V wave | **RED as expected** (unrecorded, pre-ruled) |
| **G-10** the R-A stamp act | open-state sum must read **5** | ⟨cmd⟩ `cat waves/W[0-4].md \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **6**, double-run `6 ≡ 6`. Per-file: `W0:1 · W1:1 · W2:1 · **W3:2** · W4:1`. The sibling-self-stamp leg is **GREEN** — ⟨cmd⟩ `grep -rn 'VERIFIED' W[0-3]-CLOSE.md` → 10 lines, **every one disclaiming** the stamp (*"X.P.W4's to stamp … never this wave's"*) | **RED, and the sum is 6 not 5 — see F-w4b-1** |

### Findings of this sitting

**F-w4b-1 (MEDIUM, instrument — G-10's open-state count reads 6, and neither of the spec's two named
causes is present).** §6 G-10 states: *"A sum other than **5** at open fails and halts the act: either
a sibling's §2 is not in table form (OP-6, no carve target) or a wave has self-stamped."* Measured:
OP-6's form check is **1 per file across all five** and no sibling close report self-stamps (all 10
`VERIFIED` lines in `W[0-3]-CLOSE.md` disclaim it). The actual cause is a **third** the spec did not
anticipate: `W3.md`'s **sixth dated addendum** — lawful under E-3, authored by `.m` — reproduces a
four-verb table whose row at `W3.md:836` reads `| VERIFIED | **NO** — X.P.W4's alone (**R-A**) | §12 |`,
and G-10's literal `grep -c` over the concatenation matches it. Consequence for `.d`, stated now so it
is not discovered at the stamp: carving only the five §2 tables would leave `W3.md:836` standing and
the **close-state** sum would read **1**, not **0**. **Surfaced UNRULED** (never presumed): the two
admissible shapes are (a) a dated addendum narrowing G-10's command to rows inside a
`### Four-verb status` block, or (b) naming `W3.md:836`'s addendum row as an additional carve target.
Ruling it is the triumvirate's / orchestrator's, not a seat's — and it is **not** a blocking finding
for this wave's open, which is blocked on OP-2 regardless.

**F-w4b-2 (INFO, good news — the first sitting's G-2 divergence is discharged).** That sitting
recorded *"the paths are **not** clean: eight `demo/**` rows are dirty"* and declared the divergence
rather than curing it (correctly — they were Track A's bytes). At this clock they are **0**. G-2's
literal tree-wide command is now satisfiable as written, and the commit-scoped reading stands as the
stricter one `.a`–`.d` must bank per-commit.

### R.2 — GREEN before cure

**One declared, one stated for completeness**, and neither is a defect:

* **G-7** — 0 hits in both fourier manifests before any act of this wave. §6 itself declares it *"an
  INHERITED-GREEN FLOOR"* with its baseline measured and its regression falsifier named — *"it can
  only be lost, never won, and losing it voids the wave."*
* **G-2** — the paths are clean at open. §6's own RED baseline for this gate is the *unasserted*
  property, not a dirty tree (*"the gate starts from a true state and its job is to keep it true
  through nine commits"*), so a clean reading at open is the spec's expectation, not a finding.

The other eight are RED at open, as §6 states.

---

## Unit plan (second sitting) — UNCHANGED, re-verified against the spec, STILL UNDISPATCHED

The four-unit plan banked in §Unit plan above was re-read against `W4.md` §5 ⊕ §4 ⊕ §4a ⊕ §4b ⊕ the §2
Agents line at this seat's own clock and **requires no amendment**: the spec's bytes have not moved
(`W4.md` 674 L, the sixth line of its §2 table and the 2026-09-19 ADDENDUM at L674 both unchanged),
`.a`/`.b` remain the only parallel pair and share no path, `.c` remains serial on both, and `.d` is
the **fresh Fable adjudicator** — the only site that stamps VERIFIED (R-A). Order stands:
**`[.a ∥ .b]` → `[.c]` → `[.d]`**, peak concurrency **2**.

Two riders this sitting adds to the banked briefs, both carried rather than performed:

1. **`.a`'s disposition column must publish the carried cells as `PENDING-ADJUDICATION`** (COHESION
   §0v: *"the seam contract publishes the carried cells as **PENDING-ADJUDICATION** dispositions, not
   as dispositions the producer cannot honour"*) — and `.d`'s adjudicator rules them, ID-1/ID-2 and
   the GROUND-C cells first.
2. **`.d` inherits F-w4b-1** and must not perform the stamp act until G-10's counting question is
   ruled — the act is *"the **consequence** of the gates, never a substitute for them."*

### Carried obligations — unchanged, none discharged at this sitting

Every row of the first sitting's carried-obligations table (**ESC-e2** · **R6-1** · **F-ab1** ·
**F-ab2** · **F-ab3** · **R-f1** · **ESC-c1** · **E-2/F-e10** · **ESC-d1** · the `E-h*`/`E-j*`/`E-k*`
set) stands. Two acquire new detail from round 7 and are restated by id only:

| id | round-7 state |
|---|---|
| **ESC-e2** harvest of W3, 6 of 6, from a scratch mirror with the script symlinked (§0p) | still owed; §0v names it *"the opening seat's first act"* — **the wave does not open**, and an L-13 registry append attributed to a wave that never opened would falsify the harvest's own seat-count semantics (L-13's corollary). Deferred with its authority quoted, exactly as the first sitting deferred it |
| **F-ae1** `test/css-equivalence/equivalence.test.ts:100`'s stale `toBe(26604)` literal (the union moved to 27,074) | W3's CHECK 1 routes it here by name: *"the seat that next opens `test/css-equivalence/**` = **X.P.W4**, joining F-ad1 at the same address"*. That path is in **neither** this wave's §4 writable set **nor** this seat's — carried, not touched |
| **F-w4b-1** G-10's open-state count (this sitting's own finding) | surfaced unruled, above |

### Unit receipts (second sitting)

*(empty — **0 of 4 units dispatched**; the wave is BLOCKED-ON `X.P.W3 IMPLEMENTED` at two OP-2
artefact conjuncts. No spec-bound byte was written by this seat: its only bytes are this record
section, the LEDGER's own X.P.W4 row cell and event line, and one dated `INBOX.md` sweep line.)*

---

## RESUME 2026-09-19 (THIRD OPEN ATTEMPT) — **THE WAVE OPENS**: ALL SIX §2 CONJUNCTS MET, THE BASELINE RE-BANKED, FOUR UNITS PLANNED

**SERVED MODEL: claude-opus-5[1m]** — SEAT 0 (OPEN), a **third, different seat**. The two blocked
attempts above stand **verbatim** (E-3): the first was taken at value.js `f0475542` / `<p2>`
`44c6583`, the second at `8617f4b5` / `b07e32d`. This sitting re-reads every conjunct at its own
clock against **new bytes** — X.P.W3's round 8 (`.n`, `<p2>` `5eea66c` → `36de453` → `3b81c52`)
landed after the second attempt and **cured the two conjuncts that blocked it**. Nothing is
inherited; every number below was produced by a command run by this seat.

**Sitting of record: 2026-09-17** (the owner's begin-word, COHESION §0j). Wall clock 2026-09-19.

**Substrate, named and measured, never assumed**: value.js `/Users/mkbabb/Programming/value.js`,
branch `tranche-u` — ⟨cmd⟩ `git log --oneline -1` → **`e914453f`**. Fresh writer root `<p2>` =
`/Users/mkbabb/Programming/parse-that-css-totality-p2` — ⟨cmd⟩ `git -C <p2> log --oneline -1` →
**`3b81c52`** (`.n`'s third commit, *"every miss entry of the differential carries a rulingId"*);
⟨cmd⟩ `git -C <p2> status --porcelain` → **`?? .worktrees/` only**; ⟨cmd⟩ `git -C <p2> worktree
list` → **4 entries, all inside the root** (`.worktrees/ac1|ac2|ac3`), **no `<p2>-w4*` sibling**
(§4b's ONE-root law: *"worktrees inside the fresh root, never beside it"*). Frozen read-only root:
⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that log --oneline -1` → **`ef10d5b`**, unmoved.
**No worktree of the read-only `parse-that` root exists** (its `git worktree list` is not consulted
from here; `<p2>`'s list is the one §4b requires and it is quoted above).

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **2 rows**:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's / the owner's) · `M scripts/dev/dev.sh`
(**unowned, NEVER touched, never staged**). ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/D/X-P-W4.md docs/tranches/X/execution/LEDGER.md
docs/tranches/V/coordination/INBOX.md docs/tranches/V/megatranche/registry/` → **no output**.
⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` alone.
**Zero dirty paths inside this seat's writable set · zero inherited hunks · nothing stashed, nothing
restored, no sibling path touched · no inherited path to name.**

### E13 Step-0 — the four-path mail sweep, re-run at this seat's clock

Swept read-only and compared against **every row** of `docs/tranches/V/coordination/INBOX.md`;
`INBOX.md` self-excluded from its own denominator (SELF-COUNT law); classification read from each
row's Status cell **by position**, never from a bare `grep -i UNREAD`.

| path | entries | unrowed addressed to value.js |
|---|---|---|
| `docs/tranches/V/*.md` (depth 1) | 10 | 0 |
| `docs/tranches/V/coordination/` | 24 | 0 |
| `../glass-ui/docs/tranches/BK/coordination/` | 9 | 0 |
| `../keyframes.js/docs/tranches/V/coordination/` | 13 (12 files + `vnext/`) | 0 |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | 0 |

**BK re-confirmed the newest glass tranche directory**: ⟨cmd⟩ `ls -1d ../glass-ui/docs/tranches/*/`
→ **45** dirs; the B-series terminates at **`BK`** (`BA BB BC BD BE BF BG BH BI BJ BK`), ⟨cmd⟩
`ls -d …/BL` → *No such file or directory*, and ⟨cmd⟩ `ls -1dt` puts `BK/ · BJ/ · BI/` first by
mtime as well. **Movement since the round-8 sweep**: ⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f
-name '*.md' -newermt "2026-09-19 00:00"` → exactly **two** members — `INBOX.md` (**self**) and
`../keyframes.js/docs/tranches/V/coordination/INBOUND-LEDGER.md`, **keyframes' own inbound ledger,
not a letter addressed to value.js**; it mints no row and needs no `I-n`. Every path's entry count is
**byte-identical to the second attempt's and to X.P.W3 round 8's** censuses (10 · 24 · 9 · 13 · 28).

**UNREAD status cells**, by **position**: ⟨cmd⟩ `sed 's/\|/@PIPE@/g' INBOX.md | awk -F'|' '/^\|
[IO]-[0-9]+[a-z]? \|/ {s=$6; …; if (s ~ /^\*\*?UNREAD/) c++} END {print c+0}'` → **0**, double-run
**`0 ≡ 0`**, over **79** register rows (of the file's **85** `^| ` rows); tail `I-35` / **`O-39`**,
unmoved since the round-8 sweep.

**Result: 0 unrowed · 0 new `I-n`/`O-n` minted by this seat · 0 UNREAD in X·P's scope.** `INBOX.md`
is **not** in this commit's pathspec: no row was minted and no sweep line is owed twice for a
census identical to the one round 8 already appended.

### §2b Open preconditions — re-measured at this seat's own commands. **ALL SIX MET.**

| # | precondition | verdict | receipt |
|---|---|---|---|
| **OP-1** | owner begin-word **and** the separate release word | **MET** | COHESION **§0j.E**: *"both owner words are given, dated 2026-09-17"*; the release word *"You are authorized to publish, push, and pull whatever items you need"*. The word licenses the limb; *"it does not bypass the gates or the §9 STOP conditions"* |
| **OP-2** | X.P.W3's five artefacts, the four values **re-read** | **MET — 5 of 5**, with the §0v/§0w biconditional satisfied on **both** limbs | the two tables below |
| **OP-3** | OC-1 discharged in either direction | **MET** | COHESION **§0j.E**: *"ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING"* — a dated ruling of the second (disjunct) shape; RC-P conjunct 5 is satisfiable |
| **OP-4** | an X·V adoption surface | **RULED — disposition (C)** | COHESION **§0i.1**: *"**Ruled: C.** The row closes `BLOCKED-ON` + re-trigger … **Re-trigger command:** X.P.W4's RC-P evaluator returning TRUE at a dated run"*, with **A** named as that re-trigger's payload. G-9 is **pre-ruled**; `.d` records it by id and authors no X·V wave |
| **OP-5** | the release vehicle | **MET (measured)** | ⟨cmd⟩ `node -e "…require('./package.json').version"` → **4.0.0**; ⟨cmd⟩ `npm view @mkbabb/value.js version` → **4.0.0**. RC-P quantifies over `V`, never a literal |
| **OP-6** | the four-verb table in all five X·P wave files | **MET** | ⟨cmd⟩ `grep -c '^### Four-verb status' waves/W{0,1,2,3,4}.md` → `1 · 1 · 1 · 1 · 1`. Every sibling has a carve target (but see **F-w4c-1** on G-10's *count*) |

#### OP-2 — the five artefacts at their ROUND-8 values (each double-run; all three seals `shasum -c` verified)

⟨cmd⟩ `shasum -a 256 -c universe-52.json.sha256 equivalence-full-surface.json.sha256
r1-anchor-after.txt.sha256` → **OK · OK · OK**.

| artefact | spec's required value | measured 2026-09-19 (third sitting, double-run) | verdict | moved since attempt 2 |
|---|---|---|---|---|
| `evidence/W3/universe-52.json` | **all TOTAL**, or the §0v/§0w by-id form | `tally` → `runtime {TOTAL 13 · PARTIAL 6 · ABSENT 0} · types {33/0/0} · all {TOTAL 46 · PARTIAL 6 · ABSENT 0}`; the **44** non-TOTAL cells tallied from each PARTIAL row's own `remainder` → `GROUND-C 29 · ID-1b 9 · ID-4 5 · ID-2 1` | **MET by id** | yes — the attribution moved from **233 out-of-set** to **0** |
| `evidence/W3/r1-anchor-after.txt` | **exit 0** | the candidate's nine entries (`--at typescript/src/css`): *"TOTAL 0 throws / 1548 calls · DISTINCT FAILURE MODES: 0 · GREEN — every public parser of the candidate surface is total, in BOTH lowerings"*, `unrealized NONE — all nine frozen parsers are published`; the value.js probe **unmodified** | **GREEN** | no (turned at attempt 2) |
| `evidence/W3/equivalence-full-surface.json` | **0 mirror-defects**, or the §0w `rulingId` form | `tally` → `{rows 52 · compared 24 · noPeer 28 · **mirrorDefects 44** · specUndecided 42}`; **88** miss entries (44 per lowering), **88 carrying a `rulingId`**, **0 without**, **0 outside the set** → `GROUND-C 58 · ID-1b 18 · ID-4 10 · ID-2 2` | **MET by id** | yes — `mirrorDefects` 98 → **44**, and the attribution surface went from **absent** to **complete** |
| `DIVERGENCE-LEDGER.md` | non-empty, **every** consumer-direction filled | **1,080 L · 568 `^\| ` rows**; ⟨cmd⟩ `grep -c '^\| \*\*consumer direction\*\*'` → **46**, empty-field regex → **0**; the file's own §closure line: *"**Empty consumer-direction fields: 0.**"* | **GREEN** | yes (grew 504 → 568 rows) |
| `evidence/W3/bench-three-leg.md` | present | present, **202 L** | **GREEN** | no |

#### The §0v / §0w / `W4.md`-ADDENDUM biconditional, tested at the bytes — **TRUE on both limbs**

`W4.md`'s **second** dated addendum (L676, COHESION §0w) fixes the id-set as
`{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 · ID-5 · PB-11 · R-f1 · E-k2}` and states the check
mechanically: *"every non-TOTAL cell of `universe-52.json` carries one of those ids; every miss entry
of `equivalence-full-surface.json` carries a `rulingId` from the set."* Measured by this seat, twice,
identically, by program over the artefacts' own fields:

* **universe-52.json — SATISFIED.** `TOTAL non-TOTAL cells: 44 | IN SET: 44 | NOT IN SET: 0`,
  double-run `44 44 0 ≡ 44 44 0`. Per row: `parseCssColor {GROUND-C 1}` · `parseCssScalar
  {GROUND-C 1}` · `parseCssValue {GROUND-C 1}` · `parseCssValues {GROUND-C 1}` ·
  `parseTimingFunction {GROUND-C 23 · ID-2 1}` · `parseStylesheet {ID-1b 9 · ID-4 5 · GROUND-C 2}`.
  Where the second attempt measured **233 cells out of the set** (`BND-1` 172 · `F-k2` 42 · `SH-1` 11
  · `E-j1` 5 · `unattributed` 3), **not one of those tags survives**: `.n` cured BND-1 at the
  instrument (the r1 arm hands `src`), F-k2 at the grammar (css-color-4 §8.1, landed with **ID-5**),
  E-j1's five at the grammar, and re-attributed SH-1 → **ID-4** and F-m1 → **ID-1b** by replaying the
  incumbent's own `blocks()`. **Nothing was folded**: `ID-5` and `ID-1`/`ID-3`/`PB-11` carry census
  **0** and stand as falsifiers (W3 `.n`'s F-n2).
* **equivalence-full-surface.json — SATISFIED.** `miss entries: 88 | with rulingId: 88 | WITHOUT: 0 |
  NOT IN SET: 0`, double-run `88 88 0 0 ≡ 88 88 0 0`. The second attempt measured **0 of 196**
  carrying a ruling-id field *of any name*; `.n`'s emitter now writes `rulingId` + `rulingInSet` on
  every entry, and the field's values are `GROUND-C 58 · ID-1b 18 · ID-4 10 · ID-2 2`.
* **r1-anchor-after.txt — SATISFIED**, non-vacuously: `EXIT=0`, so there is no non-zero reading to
  attribute, and the bank is the CANDIDATE's nine entries, not the incumbent's (A-1).

**Label conjunct — MET, in the accepted form.** ⟨cmd⟩ `grep -n '^| IMPLEMENTED' waves/W3.md` → `43:|
IMPLEMENTED | **NO** | …` — **L43 is still sealed and unedited (E-3)**, exactly as §0v/§0w require,
and the stamp lands **beside** it: `W3.md`'s **seventh** dated addendum (L971 table) reads
*"**IMPLEMENTED** | **YES — with carried REDs, by id.** L43's sealed cell stands unedited (E-3); the
stamp lands here, dated, beside. `.m`'s §D withholding is **DISCHARGED**"*. The LEDGER's X.P.W3 row
concurs — **`CLOSED 2026-09-17 (honest-RED: G-1 · G-4's C-4 · G-7 · G-9)`** — promoted at round 8's
CHECK 1, whose own successor note states the consequence for this wave in its own words:
*"`W4.md`'s OP-2 biconditional is **MET on both limbs** … **X.P.W4 is no longer blocked by X.P.W3's
id-set**."* This seat re-derived both limbs itself rather than inheriting that sentence.

**Verdict: the §2 "Opens after" condition is MET at the bytes AND in the ledger. X.P.W4 OPENS.**

### ESC-e2 — the harvest of W3, run at this seat's open (COHESION §0p), MEASURED-NOT-LANDED

§0p: *"A wave's last seat cannot harvest itself. **The successor harvests**: X.P.W4's seat 0 re-runs
the harvester over W3's journals at its open"*, and *"until cured, every harvest runs **from a scratch
mirror with the script symlinked**"* (F-e11: the harvester's 143-file spillage and its wholesale
`DEFECT-LEDGER.md` rewrite). The two blocked attempts deferred this with *"a blocked open is not an
open"*; **that reason expires here**, so this seat performed the procedure.

* **Procedure, exactly as §0p prescribes.** A scratch mirror was built under this session's scratchpad
  with `docs/tranches/V/megatranche/{registry/harvest,workflows}` and the **unmodified** harvester
  **symlinked** in place (⟨cmd⟩ `ln -s …/harvest-journals.mjs …`), then ⟨cmd⟩ `node
  docs/tranches/V/megatranche/workflows/harvest-journals.mjs` run with the mirror as cwd.
* **Result**: `harvested 3205 agent results · 7767 defects`, **153 files emitted into the mirror**,
  0.72 s wall. **The repo was not written**: ⟨cmd⟩ `git status --porcelain --
  docs/tranches/V/megatranche/` → **no output**, before and after.
* **W3's own surface, measured**: of the 153 harvested runs, **nine** are X.P.W3's own workflow runs —
  `wf_25c53370-7ee` (10 results) · `wf_3e7ab295-b6d` (6) · `wf_a9980aef-425` (11) · `wf_58a94d22-d77`
  (6) · `wf_8e1bb839-626` (12) · `wf_e5701693-63e` (7) · `wf_f3a04a02-9ad` (11) · `wf_f46b5290-177`
  (9) · `wf_fbba3f1e-302` (6) — **78 agent results across nine runs**. The filed
  `registry/harvest/x-p-w3.json` (129,579 B, 2026-09-18 14:37) is `.e`'s fold of **three** runs and
  reads `resultCount` 0 at the top level with five folded seats — the *"5 of 15"* CHECK-1 named
  (**F-p2**). At round 8's end the honest denominator is **nine runs / 78 results**.
* **ESCALATION — F-w4c-2 (the bounds gap, surfaced not performed).** Landing that measurement means
  **writing `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json`**. That path is in **no** row of
  `W4.md` §4 — the wave's only registry rows are `harvest/x-p-w4.json` (create, `.d`) and
  `DEFECT-LEDGER.md` (modify-append, by the script, `.d`) — and it is in no unit's set, least of all
  seat 0's. §0p **named the act and granted the bounds only in `W3.md` §4**, never in `W4.md` §4.
  Per the standing law (*"any write outside it is an ESCALATION — stop and return it"*, runbook §5.7)
  this seat **measured and did not land**. **Cure is one dated addendum-beside to `W4.md` §4** adding
  `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json` (modify, seat 0 or `.d`, by the
  scratch-mirror procedure) — a triumvirate act, not a seat's.

---

## Baseline (third sitting) — the ten gates, read-only, BEFORE any cure

Run at this seat's own clock against value.js `e914453f` and `<p2>` `3b81c52`. **Nine born-RED · one
INHERITED-GREEN FLOOR**, as §6 predicts. Two readings have moved since the second attempt and both are
stated rather than smoothed.

| gate | spec's stated baseline (2026-08-03) | measured 2026-09-19 (third sitting) | verdict at open |
|---|---|---|---|
| **G-1** seam contract 52/52 | `SEAM-CONTRACT.md` absent — 0 of 52 rows | ⟨cmd⟩ `ls docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` → *No such file or directory* (**both**) | **RED as expected** |
| **G-2** zero value.js source bytes | *"the paths are clean … the gate starts from a true state"* | ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **0 lines**, double-run `0 ≡ 0` | **state TRUE at open; the per-commit assertion is what is owed** |
| **G-3** packed candidate from the tarball | no candidate package; the fresh root ABSENT by design | `<p2>` **EXISTS**; ⟨cmd⟩ `ls <p2>/typescript/scripts/` → **15** entries, **`packed-candidate-surface.mjs` ABSENT**; the value-side idiom `scripts/ci/verify-packed-surface.mjs` **present** | **RED as expected** |
| **G-4** Wasm zero-function-import admission | *"no project Wasm artifact exists"* | ⟨cmd⟩ `find <p2> value.js -name '*.wasm' -not -path '*/node_modules/*'` → **8 hits = 6 project artefacts ⊕ 2 unrelated** Chrome-profile TTS binaries. The graduated subject is `<p2>/typescript/src/css/build/ac1.wasm`; the other five are worktree/experiment copies. **`wasm-admission.mjs` ABSENT** — the gate has a subject and no inspector | **RED as expected** |
| **G-5** RC-P evaluator exists and reports honestly | evaluator absent; all six conjuncts FALSE | ⟨cmd⟩ `ls <p2>/typescript/scripts/rc-p-evaluate.mjs` → *No such file or directory*. Conjunct 1 → **4.0.0** at both manifest and registry (no `V` candidate published) · 2 → candidate anchor **GREEN** · 3 → **44** mirror-defects, all by id · 4 → no admitted artifact · 5 → **TRUE** by COHESION §0j.E · 6 → packet absent | **RED as expected** |
| **G-6** reciprocity, both ends | *"neither sub-tranche's wave directory exists"* — 0 hits | ⟨cmd⟩ `ls -d docs/tranches/X/{keyframes,fourier}/waves` → **both exist**; ⟨cmd⟩ `grep -rn 'RC-P' …` → **25 hits over 5 files** (`KF-W2 · KF-W3 · KF-W5 · KF-W10 · F-W0`). **Both far-end sentences are present VERBATIM** — `KF-W3.md:9` and `F-W0.md:459` — so the two-hit falsifier does **not** fire. The **third** sentence (the X·V adoption wave) has no file at all: that is G-9 | **RED on leg 3 only; legs 1–2 GREEN before any act of this wave — see R.2** |
| **G-7** forbidden edge at zero — **INHERITED-GREEN FLOOR** | 0 hits in both fourier manifests | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; ⟨cmd⟩ `… web/package.json` → **0** | **GREEN — the spec's declared floor** |
| **G-8** mail closed + lawful delivery path | INBOX X·P hits **0**; `RELEASE-PACKET.md` absent | ⟨cmd⟩ `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → *No such file or directory*; ⟨cmd⟩ `grep -c 'X·P\|X.P.W\|RC-P' INBOX.md` → **42** (X·P has mail rows; **none of them the packet's**); UNREAD status cells **0** | **RED as expected** (the packet leg) |
| **G-9** adoption gap terminal disposition | no X·V wave adopts a parser | unmoved at the bytes — ⟨cmd⟩ `grep -n 'adopt a parser' docs/tranches/X/waves/W9.md` → `296: adopt a parser; it records why value.js ships none of parse-that today.`, and G31's falsifier at `W9.md:373` still reads *"or adopt a parser inside this wave"*. **The disposition is pre-ruled (C)** at COHESION §0i.1 with its re-trigger named | **RED as expected** (unrecorded, pre-ruled) |
| **G-10** the R-A stamp act | open-state sum must read **5** | ⟨cmd⟩ `cat waves/W[0-4].md \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **7**, double-run `7 ≡ 7`. Per-file: `W0:1 · W1:1 · W2:1 · **W3:3** · W4:1`. The sibling-self-stamp leg is **GREEN** — ⟨cmd⟩ `grep -rn 'VERIFIED' W[0-3]-CLOSE.md` → 10 lines, **every one disclaiming** the stamp | **RED, and the sum is 7 not 5 — see F-w4c-1** |

### Findings of this sitting

**F-w4c-1 (MEDIUM, instrument — G-10's open-state count has grown 5 → 6 → 7, and neither of the
spec's two named causes is present).** This is **F-w4b-1 re-measured**, one higher. §6 G-10 states:
*"A sum other than **5** at open fails and halts the act: either a sibling's §2 is not in table form
(OP-6, no carve target) or a wave has self-stamped."* Measured: OP-6's form check is **1 per file
across all five**, and no sibling close report self-stamps (all 10 `VERIFIED` lines in
`W[0-3]-CLOSE.md` disclaim it). The cause is a **third** the spec did not anticipate — `W3.md` now
carries **three** matching lines, ⟨cmd⟩ `grep -n 'VERIFIED | \*\*NO\*\*' W3.md` →
`44:` (the §2 table, the real carve target) · `836:` (the **sixth** dated addendum's four-verb table,
`.m`'s) · `971:` (the **seventh** dated addendum's, `.n`'s). Both extra rows are **E-3-lawful dated
addenda** and neither may be rewritten. Consequence for `.d`, stated now so it is not discovered at
the stamp: **carving only the five §2 tables leaves two rows standing and the close-state sum reads
2, not 0.** Admissible shapes, **surfaced UNRULED**: (a) a dated addendum narrowing G-10's command to
rows inside a `### Four-verb status` block, or (b) naming `W3.md:836` and `W3.md:971` as additional
carve targets. **Ruling it is the triumvirate's, not a seat's** — and because the count grows by one
with each W3 addendum, shape (a) is the only one that stays true under a ninth round. It is **not**
blocking for this open; it **is** a halt condition on `.d`'s stamp act, which is *"the **consequence**
of the gates, never a substitute for them."*

**F-w4c-2 (MEDIUM, bounds — ESC-e2's harvest is measurable and unlandable).** Stated in full above.

**F-w4c-3 (INFO — the spec's G-6 baseline is stale in the wave's favour).** `W4.md` §6 measured, on
2026-08-03, *"neither sub-tranche's wave directory exists"*. Both now exist and both carry their
reciprocity sentence **verbatim, authored by their own seats** (`KF-W3.md:9`, `F-W0.md:459` — the
latter a dated addendum-beside taken at the X-union S-3 cure). This is the gate working exactly as
designed: *"X·P may not satisfy this gate by writing in those directories."* `.c`'s job on G-6 is
therefore **verification and the third sentence's delivery**, not authorship of the first two.

**F-ae1 / F-p1 — carried, untouched.** W3's CHECK 1 routes `test/css-equivalence/equivalence.test.ts`
(the stale `toBe(26604)` literal, and round 8's new `F-c3 … expected +0 to be 172`) to *"the seat that
next opens `test/css-equivalence/**` = **X.P.W4**"*. That path is in **neither** this wave's §4
writable set **nor** this seat's, and `W4.md`'s §4 Do-NOT-touch names `test/**` explicitly. Carried by
id, not touched, and re-escalated here: it needs a home that is not this wave.

### R.2 — GREEN before cure

**Three declared**, each characterised rather than smoothed:

* **G-7** — 0 hits in both fourier manifests before any act of this wave. §6 itself declares it *"an
  INHERITED-GREEN FLOOR"* with its baseline measured and its regression falsifier named — *"it can
  only be lost, never won, and losing it voids the wave."*
* **G-2** — the paths are clean at open. §6's own RED baseline for this gate is the *unasserted*
  property, not a dirty tree (*"the gate starts from a true state and its job is to keep it true
  through nine commits"*), so a clean reading at open is the spec's expectation. The **assertion** is
  what is owed, per-commit.
* **G-6 legs 1–2** — the KF.W3 and F.W0 reciprocity sentences are **already landed, verbatim, by
  their own seats**, against a spec baseline of *"0 hits, neither directory exists"*. The two-hit
  falsifier therefore cannot fire at open. This is a genuine GREEN-before-cure and is declared as
  **F-w4c-3**: `.c` must verify these two by exact-sentence comparison (never by hit count) and must
  not claim them as its own cure.

The other seven are RED at open, as §6 states.

---

## Unit plan (third sitting) — 4 units, **DISPATCHING**

Built from `W4.md` §5 ⊕ §4 ⊕ §4a ⊕ §4b ⊕ the §2 `Agents` line, re-read whole at this seat's clock
(⟨cmd⟩ `wc -l W4.md` → **676 L**, §0w's second dated addendum standing at L676). The plan is the one banked at the first
sitting, re-verified unchanged, now with the two riders folded in and a third added for `.d`.

**Order**: `[.a ∥ .b]` → `[.c]` → `[.d]`. **Peak concurrency 2** (§2 `Agents`: *"phase 1: 2 parallel
Opus 5 seats … phase 2: 1 serial Opus 5 seat … phase 3: 1 fresh Fable adjudicator"*). `.a` and `.b`
are *"the only parallel pair and they share no path"* (§4a). **Models (M-23)**: `.a`–`.c` **Opus 5**
(*"a seam contract, a packaging protocol, and a predicate evaluator are mechanism"*); `.d` a **fresh
Fable adjudicator** (*"the sub-tranche release close is an adjudication act, it is the only site that
stamps VERIFIED, and the adjudicator must be fresh — a seat that authored a gate cannot certify it"*).

**Worktree (§4b)**: `.a`, `.c`, `.d` are docs-only on clean main in value.js. `.b` runs in
`<p2>/.worktrees/w4b` — **inside** the fresh root, never beside it — with its own
`typescript/node_modules` and `CARGO_TARGET_DIR=<p2>/target/w4b`. `<p2>`'s worktree list is measured
above (3 entries, all inside); `.b` adds its own and no `<p2>-w4*` sibling is ever created.

**Locks and cautions carried into the briefs**:
1. **§4a disjointness** — no two units share a create/modify/modify-carve path; `.a ∥ .b` verified
   disjoint at this seat's read.
2. **§4a cross-wave** — *"the orchestrator must not run this wave's `.d` concurrently with an open
   X·V mail unit"* (`INBOX.md` is also written by X-W11.e and X-W9's packet unit). Measured at this
   clock: X-W9 `PARTIAL 2026-09-17`, X-W11 `planned` — no X·V mail unit is open, and `.d` runs alone
   in its own group regardless.
3. **R-A one act** — `.d` advances all five X·P waves IMPLEMENTED→VERIFIED *"in one act at close"*;
   no sibling stamps itself.
4. **§0v rider on `.a`** — the carried cells publish as **`PENDING-ADJUDICATION`** dispositions
   (*"not as dispositions the producer cannot honour"*); `.d`'s adjudicator rules them, ID-1/ID-2 and
   the GROUND-C cells first.
5. **F-w4c-1 rider on `.d`** — the stamp act **halts** until G-10's counting question is ruled.
6. **G-2 is a wave-level invariant, not a unit's** — every unit banks
   `git status --porcelain -- src api demo test e2e` → 0 lines at **each** of its commits, into
   `evidence/W4/value-source-untouched.txt`.

### X.P.W4.a — the seam contract (`opus`)

- **Spec sections**: §3 items 1–2 (L96–105) · §5 `X.P.W4.a` (L246–261) · §6 **G-1** (L352–369) ·
  §6 **G-2** (L371–381) · §4 rows 1–2 and 4 (L166–169) · §7 (L545–554) · §9 commit 1 (L583–584) ·
  the 2026-09-19 addenda (L674–677).
- **Writable**: `docs/tranches/X/parse-that/SEAM-CONTRACT.md` ·
  `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` ·
  `docs/tranches/X/parse-that/evidence/W4/` (its own `seam*` / `value-source-untouched.txt` legs).
- **Gates**: G-1, G-2.
- **Locks**: parallel with `.b`, disjoint; the `PENDING-ADJUDICATION` rider (§0v); no byte under
  `src/**`, `demo/**`, `api/**`, `test/**`, `e2e/**`, any sibling repo, or `X/waves/**`.

### X.P.W4.b — the packed-release protocol and the Wasm admission (`opus`)

- **Spec sections**: §3 items 3–4 (L106–111) · §5 `X.P.W4.b` (L263–276) · §6 **G-3** (L383–397) ·
  §6 **G-4** (L399–428, including the verbatim inspection command at L405–416) · §4b (L216–237) ·
  §4 rows 4, 12–13, 15 · §9 commit 2 (L585–586).
- **Writable**: `<p2>/typescript/scripts/packed-candidate-surface.mjs` ·
  `<p2>/typescript/scripts/wasm-admission.mjs` ·
  `docs/tranches/X/parse-that/evidence/W4/packed-surface.json` ·
  `docs/tranches/X/parse-that/evidence/W4/wasm-imports.json` · `<p2>/.worktrees/w4b` (its own).
- **Gates**: G-3, G-4.
- **Locks**: parallel with `.a`, disjoint; ONE-root law (§4b) — worktree **inside** `<p2>`, never a
  sibling; `scripts/ci/verify-packed-surface.mjs` is **execute, no write** (R-E); third failed
  install attempt is a triumvirate trigger (§3a), never a fourth retry.

### X.P.W4.c — the release condition and its reciprocity (`opus`, serial after `.a` ∥ `.b`)

- **Spec sections**: §3 items 5–6 (L112–116) · §5 `X.P.W4.c` (L278–291) · **§6a RC-P** (L321–350,
  reproduced verbatim in `RELEASE-CONDITION.md`) · §6 **G-5** (L430–438) · **G-6** (L440–459) ·
  **G-7** (L461–470) · §4 rows 3–4, 14, 16 · §9 commit 3 (L587–588) · §10 (L600–625).
- **Writable**: `docs/tranches/X/parse-that/RELEASE-CONDITION.md` ·
  `<p2>/typescript/scripts/rc-p-evaluate.mjs` ·
  `docs/tranches/X/parse-that/evidence/W4/rc-p-evaluation.json` ·
  `docs/tranches/X/parse-that/evidence/W4/reciprocity-grep.txt`.
- **Gates**: G-5, G-6, G-7.
- **Locks**: **no invented bench bar, no dropped conjunct, no "or the owner says so" escape hatch**
  (§3a — any such pressure halts the wave); **no version literal** in RC-P; G-6 is **verified, never
  written** — `docs/tranches/X/{keyframes,fourier}/**` is Do-NOT-touch; G-7 is a floor that *"can
  only be lost"* and the transitive parse-that copies must **not** be "cured".

### X.P.W4.d — the sub-tranche release close (`fable`, **fresh adjudicator**, serial last, alone)

- **Spec sections**: §3 items 7–10 (L117–130) · §5 `X.P.W4.d` (L293–312) · §6 **G-8** (L472–501) ·
  **G-9** (L503–519) · **G-10** (L521–543) · **R-A** (L46–53) · §4 rows 5–6, 8–11 · §4a cross-wave
  (L206–214) · §9 commit 4 (L589–593) · §12 L-18 rider (L651–665).
- **Writable**: `docs/tranches/X/parse-that/waves/W4-CLOSE.md` ·
  `docs/tranches/X/parse-that/RELEASE-PACKET.md` · the four-verb **VERIFIED row only** of
  `waves/W0.md`, `W1.md`, `W2.md`, `W3.md` (modify-carve) · `docs/tranches/V/coordination/INBOX.md`
  (mail rows only) · `docs/tranches/X/COHESION.md` (**§1 SS-5 status cell and §5 board line only**) ·
  `docs/tranches/V/megatranche/registry/harvest/x-p-w4.json` (create) ·
  `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (append, **by the script**).
- **Gates**: G-8, G-9, G-10, and the harvest seat count **= 4** (L-13's corollary: a seat harvested
  with zero journal rows is RED, not green).
- **Locks**: **R-A is ONE act** across five files; **halt on F-w4c-1** until G-10's count is ruled;
  G-9 records disposition **C** by id (COHESION §0i.1) and **never authors an X·V wave**; the packet
  is authored **in this repo** and handed to **SS-6**, never written into `keyframes.js/**` and never
  on a fresh channel; the harvest runs from a **scratch mirror with the script symlinked** (§0p
  F-e11) — and see **F-w4c-2** if the W3 harvest is to land with it.

### Carried obligations the opening seat inherits (by id, none discharged here)

| id | state at this sitting |
|---|---|
| **ESC-e2** harvest of W3 | **MEASURED** at this open (nine runs / 78 results), **NOT LANDED** — the write target is outside `W4.md` §4. Escalated as **F-w4c-2** |
| **F-w4c-1** G-10's open-state count (now 7) | surfaced UNRULED; a halt condition on `.d`'s stamp |
| **F-ae1 / F-p1** `test/css-equivalence/**` stale pins | carried, untouched — the path is in no unit's set here and `test/**` is §4 Do-NOT-touch |
| **F-o1** the stale `build/ac1.wasm` (emit 662,339 B vs on-disk 636,753 B) | carried into `.b`'s G-4 subject selection — the inspector must name and hash the artifact it reads |
| **R6-1 · F-ab1 · F-ab2 · F-ab3 · R-f1 · ESC-c1 · E-2/F-e10 · ESC-d1 · the `E-h*`/`E-j*`/`E-k*` set** | unchanged from the first sitting's table; `.d`'s adjudication is their terminal site |

### Unit receipts (third sitting)

*(empty at open — the four units dispatch after this record and the LEDGER row land.)*

---

## Unit receipts

### X.P.W4.b — the packed-release protocol and the Wasm admission

**SERVED MODEL: claude-opus-5[1m]** · dispatched at the third sitting's plan, unchanged.
**Status: PARTIAL — G-4 GREEN, G-3 honest-RED with three measured causes, escalated by name.**

**Substrate, measured not assumed.** value.js `/Users/mkbabb/Programming/value.js`, branch
`tranche-u` — ⟨cmd⟩ `git log --oneline -1` → **`fecca648`** at this unit's open. Fresh writer root
`<p2>` — ⟨cmd⟩ `git -C <p2> log --oneline -1` → **`3b81c52`** (`.n`'s third commit). Frozen
read-only root — ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that log --oneline -1` → **`ef10d5b`**,
unmoved and never written.

**Crash-recovery (standing law, first act).** ⟨cmd⟩ `git -C <p2> status --porcelain` → **`?? .worktrees/`
alone**; ⟨cmd⟩ `git status --porcelain` in value.js → 5 rows, **none inside this seat's writable set**
(`M docs/tranches/V/reformation/CARRY-LEDGER.md` · `M scripts/dev/dev.sh` — unowned, NEVER touched,
never staged — and three `docs/tranches/X/fourier/evidence/w3/` files, Track C's). ⟨cmd⟩ `ls
docs/tranches/X/parse-that/evidence/W4/` → *No such file or directory*; ⟨cmd⟩ `ls
<p2>/typescript/scripts/packed-candidate-surface.mjs <p2>/typescript/scripts/wasm-admission.mjs` →
*No such file or directory* (both). **Zero dirty paths inside this unit's writable set · zero
inherited hunks · nothing stashed, nothing restored, no sibling path touched · no inherited path to
name.**

### Acts, in order

**1 · §4b — the worktree, inside the fresh root.** ⟨cmd⟩ `git -C <p2> worktree add --detach
.worktrees/w4b HEAD` → *"Preparing worktree (detached HEAD 3b81c52)"*. ⟨cmd⟩ `git -C <p2> worktree
list` → **5 entries, every one under `<p2>`** (`.worktrees/ac1 · ac2 · ac3 · w4b`); ⟨cmd⟩ `ls -d
/Users/mkbabb/Programming/parse-that-*` shows **no `<p2>-w4*` sibling** — §4b's ONE-root law held
(*"worktrees **inside** the fresh root, never beside it"*). Detached rather than branched so the
scripts of record land on the branch of record (`w2/harness`) at the §4 File Bounds path, and the
worktree stays what §4b makes it: a build sandbox. `CARGO_TARGET_DIR=<p2>/target/w4b` exported for
every run in it; no cargo invocation was reached (the Wasm emitter is `lowering-wasm/index.mjs`,
pure node), and that is recorded rather than implied.

**2 · G-4 — the Wasm admission. GREEN.**

The spec's **verbatim** inspection command (§6 G-4, L405–416), run unaltered against the graduated
subject — ⟨cmd⟩ `node --input-type=module -e "…" -- src/css/build/ac1.wasm`:

```
{
 "total": 0,
 "functionKind": 0,
 "imports": []
}
VERBATIM EXIT=0
```

`scripts/wasm-admission.mjs` reproduces that object **verbatim per artifact** before its fuller
record, so an auditor comparing this run to the spec's one-liner compares like with like. It adds
exactly the two things the gate's prose demands and the one-liner cannot carry: the **accounting** of
every printed import (a `memory`/`table`/`global` import is accounted, a `function`-kind import never
is, any other kind is UNACCOUNTED and fails), and the artifact's **identity** — path, byte length,
sha256 — because F-o1 measured the on-disk copy stale against the emitter.

**F-o1 reproduced exactly and discharged by measuring both, never by choosing one.** ⟨cmd⟩ in the
w4b worktree, `buildModule()` in memory → `{"emitBytes": 662339, "onDiskBytes": 636753, "emitSha256":
"f0d063d6…", "onDiskSha256": "04fbb80e…", "identical": false}`. Both were then admitted.

Reading over **all six project Wasm artifacts** (⟨cmd⟩ `find <p2> value.js -name '*.wasm' -not -path
'*/node_modules/*'` → 8 hits = 6 project ⊕ 2 unrelated Chrome-profile TTS binaries):

| artifact | bytes | sha256 | imports | fn-kind | empty-import instantiation | admitted |
|---|---|---|---|---|---|---|
| `typescript/src/css/build/ac1.wasm` (**the graduated subject**) | 636,753 | `04fbb80e…` | 0 | 0 | ok | YES |
| the fresh in-worktree emit (F-o1's live bytes) | 662,339 | `f0d063d6…` | 0 | 0 | ok | YES |
| `experiments/w2/ac1-tagless/build/ac1.wasm` | 187,341 | `049b9904…` | 0 | 0 | ok | YES |
| `.worktrees/ac1/experiments/w2/ac1-tagless/build/ac1.wasm` | 187,341 | `049b9904…` | 0 | 0 | ok | YES |
| `.worktrees/ac2/experiments/w2/ac2-closed-ir/artifacts/ac2.wasm` | 117,544 | `d70449e8…` | 0 | 0 | ok | YES |
| `.worktrees/ac3/experiments/w2/ac3-span/build/ac3.wasm` | 25,267 | `fef1f1a7…` | 0 | 0 | ok | YES |

`tally` → **`artifacts 6 · admitted 6 · functionKindImportsTotal 0 · unaccountedImportsTotal 0`**;
`verdict GREEN`; **EXIT=0, double-run, byte-identical with `generatedAt` excluded**. The graduated
artifact **exports** `{function 6, memory 1}` and imports nothing — it owns its memory rather than
asking for one, which is the "closed memory/reification accounting" clause read as a property of the
module and not merely of its import list. Both of §6's legs are separately measured: the falsifier's
*"a passing static count paired with an instantiation that needs a non-empty import object"* cannot
hide here, because `emptyImportInstantiation` is its own field and is never inferred from the count.

Banked: `docs/tranches/X/parse-that/evidence/W4/wasm-imports.json` (282 L, sha256 `e10c123f…`).

**3 · G-3 — the packed candidate. RED, honestly, and the protocol is not what is red.**

`scripts/packed-candidate-surface.mjs` executes five legs, each measured and none inferred from
another: **PACK** (`npm pack --ignore-scripts --json`, tarball named/sized/sha256'd, entry list
recorded) · **DECLARATION** (every packed entry checked against the manifest's own `files` field — the
*"ships more than it declares"* falsifier, run as a set difference) · **INSTALL** (a clean `mkdtemp`
consumer, one attempt, its own npm cache; the **installed** manifest re-read from
`node_modules/<name>/package.json`, never the source one) · **RESOLVE** (runtime names off a real
dynamic `import()` inside the consumer; type names compiled against the **installed** `.d.ts` by a
strict `tsc` consumer) · **REFUSALS** (the forbidden deep specifiers imported, each required to throw
`ERR_PACKAGE_PATH_NOT_EXPORTED`).

⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam docs/tranches/X/parse-that/SEAM-CONTRACT.md
--package <p2>/.worktrees/w4b/typescript` — **the gate's literal command**, run once `.a`'s contract
landed mid-sitting:

```
 "candidate": "@mkbabb/parse-that@1.0.0",
 "tarball": "mkbabb-parse-that-1.0.0.tgz",
 "tarballSha256": "efc11936d361820526a93ada2145012d0c58cec48cee9ccb9a19c22c66e74cda",
 "entryCount": 1,
 "symbolSource": "seam-contract",
 "symbolCounts": { "runtime": 19, "types": 33, "total": 52 },
 "symbolCrossCheck": true,
 "seamSubpathDeclared": false,
 "resolved": "0 of 52",
 "refusals": 5,
 "verdict": { "pack": true, "declaration": true, "install": true,
              "resolve": false, "refusals": true, "G3": "RED" }
```

**EXIT=1, double-run identical.** The contract's 52 rows were cross-checked against
`evidence/W3/universe-52.json` **in both directions**: `inSeamNotUniverse []` · `inUniverseNotSeam []`
· `agree true`.

**THE POSITIVE CONTROL, so the RED is attributed to the candidate and not to this instrument.** A
staged copy of the same tree **outside both repositories** (no repository byte modified to obtain it)
whose manifest declares `"./css"` and ships `src/css` packs **26 entries**, installs — and still
resolves **0 of 52**. That is how causes C2 and C3 below were located rather than guessed.

**The three causes, each measured, none curable inside this unit's bounds:**

| id | leg | measured | cure address |
|---|---|---|---|
| **C1** HIGH | pack / declaration | `typescript/package.json` declares `files: ["./dist"]` — gitignored build output that does not exist in the tree — and an `exports` map of five subpaths (`.` `./core` `./diagnostics` `./packrat` `./utils`) with **no `./css`**. `npm pack` ships `entryCount 1`: package.json alone. The consumer's `node_modules` holds no code, so 0 of 52 is arithmetic, not opinion | `<p2>/typescript/package.json` |
| **C2** HIGH | resolve / runtime | with the subpath declared and `src/css` shipped, the installed runtime still fails: `ERR_MODULE_NOT_FOUND: Cannot find package 'tsx' imported from node_modules/@mkbabb/parse-that/src/css/lowering-js/js-alg.mjs`. ⟨cmd⟩ `grep -rn tsx src/css/` → `js-alg.mjs:23: import { tsImport } from "tsx/esm/api"` and `bounds.mjs:834: require_("tsx/esm/api")`. **`tsx` is a devDependency of the FRESH ROOT** (§0l E-1, `tsx@4.23.13`) and is declared nowhere in `@mkbabb/parse-that`. This is precisely G-3's reason for existing — *"a symbol that resolves in the source tree and not in the tarball"* | `<p2>/typescript/src/css/lowering-js/js-alg.mjs` · `src/css/bounds.mjs` |
| **C3** HIGH | resolve / types | the strict installed-consumer compile returns `ac1.d.ts(7,589): error TS2834`. `build/ac1.d.ts` re-exports all **33** frozen types through `../../../../../value.js/docs/tranches/V/megatranche/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css` — a relative specifier that **escapes the package root** into value.js's vendored tree. Even with an extension it cannot resolve from a consumer's `node_modules`; the declaration is not self-contained | `<p2>/typescript/src/css/build.mjs` (the generator) and its emitted `build/ac1.d.ts` |

**The value-side cross-check leg** (§4's execute-no-write row, §6 G-3's *"cross-checked against the
value-side idiom"*). ⟨cmd⟩ `npm view @mkbabb/value.js version` → **4.0.0**; ⟨cmd⟩ `npm view
@mkbabb/value.js@4.0.0 dist.shasum` → `ccb962e5…`; ⟨cmd⟩ `npm pack @mkbabb/value.js@4.0.0
--pack-destination <scratch>` → 20 entries, sha256 `7f80658c…`; ⟨cmd⟩ `node
scripts/ci/verify-packed-surface.mjs <tarball>` → **EXIT=1**, first error *"`/transform` exports
["PathGeometry","decomposeMatrix2D","decomposeMatrix3D","getPointAtLength","getTotalLength",
"interpolateDecomposed","recomposeMatrix2D","recomposeMatrix3D","slerp"]"*. **This is not a defect of
this unit and not a defect of 4.0.0**: the script carries `tranche-u`'s post-X-W9 expectation set, in
which X.W9.b retired the matrix family, and published 4.0.0 predates that cut. The idiom refusing a
tarball whose surface differs from the expected one is exactly the property G-3 borrows — **live and
discriminating**. Recorded for **`.c`**: RC-P conjunct 1 `PUBLISHED(V)` is measured **FALSE at
V=4.0.0** by that very command, at this seat's clock.

Banked: `docs/tranches/X/parse-that/evidence/W4/packed-surface.json` (2,539 L, sha256 `0bcef64e…`),
carrying the subject run, the positive control, the literal `--seam` run **beside** the
universe-sourced ones (E-3 — nothing erased, the two sources shown to agree rather than asserted to),
the value-side cross-check, the three causes and the residuals.

**4 · G-2, the wave-level invariant, per commit.** Each of this unit's two value.js commits carries a
pathspec holding only paths under `docs/tranches/X/parse-that/evidence/W4/`; neither holds a byte
under `src/**`, `demo/**`, `api/**`, `test/**` or `e2e/**`. The **tree-wide** leg is **not** empty at
this clock: ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **1 line**,
`M test/gradient-v4-consume.test.ts`, modified at 06:40 **during this sitting** and carrying X-W6
`.a`'s own migration comment in its diff — **a Track A seat's live work, declared and not touched**.
This is the same shape the first sitting declared and the second found discharged; it is not X·P's,
and curing it would be the *"a seat that breaks a working tree to satisfy a gate"* failure G-7 names.
`evidence/W4/value-source-untouched.txt` is **`.a`'s** leg under §4a and was not written by this seat.

**5 · Format and lint cadence (§7), measured rather than claimed.** ⟨cmd⟩ `git diff --check` → clean
in both roots. ⟨cmd⟩ `node --check` → OK on both scripts. §7's fresh-root `npx tsc --noEmit` / `npx
eslint .` have **no subject** for these two files and the reason is measured, not assumed: the fresh
root has **no eslint configuration and no eslint install** (and `npx eslint` would install packages
into a root this unit may not write), `typescript/tsconfig.json` includes only `src/` and `test/`, and
⟨cmd⟩ `ls <p2>/node_modules/@types/` → `chai · deep-eql · estree` — **no `@types/node` anywhere in the
root**, so a direct `tsc --allowJs --checkJs` over the two `.mjs` files returns 23 diagnostics of
which **all 23** are `Cannot find module 'node:*'` / `Cannot find name 'process'`. Recorded as
**R-w4b-2**, a measured environment fact, not a skipped check.

### Commits

| repo | sha | meaning |
|---|---|---|
| `<p2>` | **`ca615a6`** | `feat(x-p-w4/packed): pack-install-resolve the candidate; prove the Wasm zero-function-import admission` — the two scripts |
| value.js | **`f92a3f32`** | same message — the two evidence banks |
| `<p2>` | **`00806a8`** | `fix(x-p-w4/packed): the seam reader locates the name, and the contract-vs-universe set-difference is measured in both directions` |
| value.js | **`046bc176`** | same message — the evidence updated with the literal `--seam` run beside |

Pathspec on every commit, on the commit itself; `scripts/dev/dev.sh` never touched, never staged; no
sibling seat's path staged, reset or unstaged.

### Gate readings — BEFORE → AFTER

| gate | at this unit's open | at its close | receipt |
|---|---|---|---|
| **G-4** | **RED** — the gate had a subject and no inspector (`wasm-admission.mjs` ABSENT) | **GREEN** | 6 of 6 project artifacts admitted · 0 function-kind imports · 0 unaccounted · empty-import instantiation clean on every one · EXIT=0 double-run |
| **G-3** | **RED** — `packed-candidate-surface.mjs` ABSENT; no packed candidate exists | **RED — honestly, with the protocol whole** | pack · declaration · install · refusals all GREEN; **resolve 0 of 52**; three measured causes, every cure address outside §4 |

### Escalation — F-w4b-3 (the bounds gap on G-3's cure)

**Returned, not substituted for.** W4.md §4 File Bounds grants X.P.W4 exactly three creatable paths
in the fresh root — the three `scripts/*.mjs` — and **no unit of this wave may write
`<p2>/typescript/package.json` or anything under `<p2>/typescript/src/css/**`**. All three causes of
G-3's RED live at those addresses. G-3 cannot be turned GREEN by any act available to `.b`, and
substituting a different subject for the gate would be the *"a claim about a source tree that happens
to be on disk"* failure the gate was written to refuse.

**Trigger**: §3a — *"Hard-gate failure that is not local-edit-recoverable."* The shape is the one §3a
gives for G-4 verbatim (*"that is an X.P.W2 architecture question, not a link-flag tweak"*): the
candidate has never been **packaged** for release, and packaging it is an X.P.W2 question.

**Admissible cures, surfaced UNRULED — a triumvirate act, not a seat's:** (a) one dated
addendum-beside to `W4.md` §4 (E-3) naming `<p2>/typescript/package.json`, `src/css/build.mjs`,
`src/css/lowering-js/js-alg.mjs` and `src/css/bounds.mjs` as writable for a named unit; or (b) a
successor X.P.W2 packaging unit that owns them. Either way the work is three cures, not one: the
manifest (C1), the `tsx/esm/api` runtime dependency (C2), and the self-containment of the emitted
declaration (C3) — and C2/C3 would still be RED after C1 alone, which is why the control was run.

### Residuals and findings

| id | state |
|---|---|
| **F-w4b-3** the bounds gap on G-3's cure | **ESCALATED**, above |
| **F-w4b-4** (LOW, instrument, **cured here**) the contract's row carries an ordinal before the name, so a column-0 reader parses the ordinal as the name and yields zero rows | cured at the reader: it locates the first adjacent (identifier, kind) pair. Recorded because a silently-empty denominator is the defect class this gate exists to refuse in others, and one loud throw is not a margin |
| **R-w4b-1** the gate's literal `--seam` form had no subject at this unit's open | **DISCHARGED** — `.a`'s contract landed mid-sitting, the literal command was run, and the set-difference against `universe-52.json` is empty in both directions |
| **R-w4b-2** §7's fresh-root `tsc`/`eslint` cadence has no subject for `.mjs` scripts in this root | **CARRIED**, measured: no eslint config or install, no `@types/node`, `scripts/` outside tsconfig `include`. `node --check` + `git diff --check` are what was run and both are green |
| **F-o1** the stale `build/ac1.wasm` | **DISCHARGED** — both the on-disk copy and a fresh emit named, hashed and admitted; the admission verdict is identical for both, so staleness does not change it |
| **G-2 tree-wide divergence** | declared: one Track A `test/**` row, dirty through no act of X·P, not touched |
| **`.c` inherits** | RC-P conjunct 1 measured FALSE at V=4.0.0 by `verify-packed-surface.mjs` at this seat's clock (exit 1, `/transform`); conjunct 4 ADMITTED(V) has its command and a GREEN reading for the X.P.W2 artifact |

**E13**: ⟨cmd⟩ the by-position UNREAD scan over `INBOX.md` → **0**, over **79** register rows (of 85
`^| ` rows), tail `I-35` / `O-39` — unmoved since seat 0's sweep. No row minted by this unit.

---

### X.P.W4.a — the seam contract

**SERVED MODEL: claude-opus-5[1m]** · Opus 5 seat (M-23 §2) · docs-only, **no worktree**, writes in
value.js on clean main (§4b). Sections executed: `W4.md` §3 items 1–2 (L96–105) · §5 `X.P.W4.a`
(L246–261) · §6 **G-1** (L352–369) · **G-2** (L371–381) · §4 rows 1–2, 4 (L166–169) · §7 (L545–554) ·
§9 commit 1 (L583–584) · the two dated addenda (L674–676) · COHESION **§0v** (the PENDING-ADJUDICATION
rider) and **§0w** (the id-set).

**Verdict: DONE. G-1 GREEN · G-2 GREEN on the leg X·P controls, DECLARED-DIVERGENT on the leg it does
not.** One commit, `b4f8e5d1`.

#### Act 0 — crash-recovery, first act (standing law)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **3 rows** at this seat's open:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's / the owner's) · `M scripts/dev/dev.sh`
(**unowned, NEVER touched, never staged**) · `M test/gradient-v4-consume.test.ts` (a **sibling seat's**
live work; `test/**` is §4 Do-NOT-touch). ⟨cmd⟩ `git -C ../parse-that status --porcelain` → 15 modified
+ 15 untracked rows, **none inside this seat's writable set** and `parse-that` is the frozen read-only
root — not one byte touched. ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/scripts/
docs/tranches/X/parse-that/evidence/W4/` → **no output**, and ⟨cmd⟩ `ls
docs/tranches/X/parse-that/scripts/` → *No such file or directory*. **Zero dirty paths inside this
seat's writable set · zero inherited hunks · no inherited path to name · nothing stashed, nothing
restored, no sibling path touched.**

#### Act 1 — E13 Step-0, the four-path mail sweep at this seat's own clock

| path | `*.md` at depth 1 | unrowed addressed to value.js |
|---|---|---|
| `docs/tranches/V/` | 10 | 0 |
| `docs/tranches/V/coordination/` | 24 | 0 |
| `../glass-ui/docs/tranches/BK/coordination/` | 9 | 0 |
| `../keyframes.js/docs/tranches/V/coordination/` | 12 | 0 |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | 0 |

**UNREAD status cells, read by POSITION** (never a bare `grep -i unread`): ⟨cmd⟩ `sed 's/\|/@PIPE@/g'
INBOX.md \| awk -F'\|' '/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; …; if (s ~ /^\*\*?UNREAD/) c++} END {print
c+0}'` → **0**, double-run **`0 ≡ 0`**, over **79** register rows (of the file's **85** `^\| ` rows).
Tail **`I-35` / `O-39`**, unmoved. ⟨cmd⟩ `find <the four paths> -name '*.md' -newermt "2026-09-19
06:00"` → **no member**. **0 unrowed · 0 `I-n`/`O-n` minted by this unit · 0 UNREAD in X·P's scope.**
`INBOX.md` is in neither of this unit's pathspecs.

#### Act 2 — measure before editing: the denominator, re-derived rather than inherited

`W4.md` §6 G-1's RED baseline names the measurement; this seat re-took it rather than quoting it.

| what | ⟨cmd⟩ | reading |
|---|---|---|
| frozen runtime surface | `node --input-type=module -e "const m=await import('<vendored 4.0.0>/dist/subpaths/css.js'); console.log(Object.keys(m).length)"` | **19** |
| frozen type surface | `src/css/index.ts`'s **first** `export type { … } from "./types"` block, counted by program | **33** |
| the seam | 19 + 33 | **52** |
| the pin agrees | `universe-52.json` `pin.counts` | `{runtime 19, types 33, total 52}` |

**A finding this act produced, and it is load-bearing for any adoption wave.** The frozen 52 is **not**
today's `src/css/**`. ⟨cmd⟩ `git show 6aca8602:src/css/index.ts \| shasum -a 256` → `c09d076e…`
(1,310 B) against ⟨cmd⟩ `shasum -a 256 src/css/index.ts` → `16e15a56…` (2,463 B); `types.ts` likewise
`109327ce…` → `fd5a5b37…`. Counted by program, HEAD `tranche-u` publishes **65** names from `./css`
(20 runtime + 45 types) where the pin publishes 52 — **`frozen ∖ HEAD` = ∅**, so every seam row is
still published, but the thirteen adds (`serializeCssValue` plus twelve re-exported types) are
**outside the seam and provided by no candidate symbol**. `serializeCssValue` is exactly the name
KF.W3's reciprocity sentence commits to a *"fork retirement"*. Recorded in `SEAM-CONTRACT.md` §1.

#### Act 3 — the disposition rule, derived from the ledger's own bytes

The contract needed a **mechanical** answer to G-1's falsifier — *"a row whose disposition is
`identical` while `DIVERGENCE-LEDGER.md` holds a row for the same export fails (the two documents are
cross-checked mechanically, not by reading)"*. This seat implemented "holds a row for the same export"
as: **the frozen-52 names appearing in a ledger row's DECLARED SUBJECT fields** — `parser` · `entry` ·
`entries` · `subject` · `subjects` · `witness family`, the six field names the ledger itself uses to
state a row's scope (⟨cmd⟩ field census over the ledger → `parser` 16 · `entry` 8 · `subjects` 3 ·
`witness family` 9). Prose mentions are a **second tier**, printed as an ADVISORY and never fatal,
because prose includes complements: `CN-3`'s `candidate` field names the five types it **excludes**.
Reading those five as bound would have inverted the row's own meaning.

Measured bindings: `parseCssColor` 20 rows · `parseStylesheet` 8 · `parseTimingFunction` 4 ·
`parseCssValue` 1 · the ten `CN-2` names · the twenty-eight `CN-3` names. **Ten exports are bound by no
subject field** and **seven ledger rows name no export in any field at all** (`S-1` · `S-4` · `R2` ·
`R3` · `R5` · `CN-1` · `§6.1`) — those seven are declared in the contract's §7 surface-wide section so
none is silently dropped, and check **J** asserts it.

#### Act 4 — `SEAM-CONTRACT.md`, 52 rows, generated from `universe-52.json`

Every cell but the disposition and consumer-direction columns is **generated**: name/kind/signature
from `universe-52.json` (types' signature heads lifted from the sha-pinned `css.d.ts`), provider from
an actual import of the candidate's `entry.mjs`. Only the two judgement columns are hand-annotated,
exactly as §5 `.a` prescribes.

**Dispositions, 52 of 52**: `identical` **7** · `PENDING-ADJUDICATION` **45** · `not-provided` **0**.

* **`not-provided` = 0 is a MEASUREMENT.** ⟨cmd⟩ over an import of
  `<p2>/typescript/src/css/entry.mjs` → *"provided 19 of 19 · missing: [] · `UNREALIZED_ENTRIES`
  `[]`"*; ⟨cmd⟩ over `universe-52.json`'s `candidate.declaredTypeNames` → **33**, with
  `rows∖declared` = `declared∖rows` = **∅**. The candidate's seam coverage is **52 of 52**.
* **The two different 44s, disambiguated in the contract so no reader conflates them**: **44 carried
  *cells*** (COHESION §0v's, over **6** rows — `GROUND-C` 29 · `ID-1b` 9 · `ID-4` 5 · `ID-2` 1, and
  the differential concurs at `mirrorDefects 44`, 88 miss entries, **88 of 88 carrying a `rulingId`**),
  versus **45 *rows*** publishing PENDING-ADJUDICATION. Check **G** asserts mechanically that every §0v
  carried cell lies inside a PENDING row.
* **§0v honoured to its words** — *"not as dispositions the producer cannot honour"*. The six carried
  rows publish PENDING with their ids and counts in the cell.

Also authored: **§Non-goals** (relative colour recognised-not-validated · `color-mix()` a both-sides
gap, `GROUND-A P-028`, `parser-band.md:136` quoted whole, plus `R2`'s trap that "does not reproduce
the over-rejection" is not "cures it"); **§What the consumer inherits from parse-that** (O-15's
`PT-01`/`PT-03`/`PT-04`/`PT-07`, each with its cure state re-measured here, below); **§Open contract
questions** (`GROUND-C`; the juxtaposition dissent; and `F-e4`, which `.e` addressed to this wave by
name).

**O-15's four, re-measured at this seat rather than narrated:**

| id | cure state at the candidate | reaches the consumer? |
|---|---|---|
| **PT-01** label/diagnostics coupling + unconditional `console.error` | **CURED** — ⟨cmd⟩ `grep -c 'console\.' entry.mjs` → **0**; `diagnostics.mjs` → **2, both inside comment lines describing PT-01 itself**. `F-b4`'s named productions are available with diagnostics UNARMED | NO — and the consumer gains a named label |
| **PT-03** `PACKRAT_ARMED` one-way latch | **NOT CURED, and not the candidate's to cure** — carried by id as **`ESC-c1`**, routed to *"X.P.W4 / the parse-that library seam"* | NO from this path; **YES per-process** for a consumer that also uses `@mkbabb/parse-that` directly. Stated, not smoothed |
| **PT-04** `Parser.lazy` depth 7,761 → thrown `RangeError` | **CURED IN KIND, by declaration** — ⟨cmd⟩ → `DEPTH_BOUND` **64**, `DEPTH_PRODUCTION` `"<nesting-depth> (at most 64 levels)"`, `CAPACITY` `{input 14107, marks 32768, recoveries 4096, D 4096, C 65536, P 65536, vstack 65536, arena 7208960, expsnap 32}` | **YES**, and it is the largest behaviour change on `parseStylesheet`: the bound is far LOWER than 7,761 and is an ordinary `ok:false`, never a throw |
| **PT-07** non-string → raw `TypeError`; `.parse()` → `undefined` | **CURED at the boundary** — ⟨cmd⟩ `parseStylesheet(42)` → `{"ok":false,…"expected":["<string source>"],"actual":null}`; the R1 anchor reads **0 throws · 0 undefined / 1,548 calls** per lowering | **YES, as a narrowing**, rowed `ID-3` |

#### Act 5 — `scripts/seam-contract-check.mjs`, and nine negative controls

The checker reads three files and **writes none**. Eleven checks, each named in its output: **A/B** the
two set-differences · **B2** duplicate rows · **C** blank required fields · **D** disposition
vocabulary · **E** THE CONTRADICTION (`identical` against a bound ledger row) · **F** an id that is
neither a ledger row nor a §0w ruled class · **G** the §0v carried-cell rider · **H** the G-1 falsifier
by its own name · **I** a bound ledger row dropped from a row's disposition · **J** a surface-wide
ledger row not declared · **K** the Non-goals section naming both explicitly (searched **inside that
section**, not the file at large).

**A gate that cannot go RED is not a gate.** Nine controls, each mutating one cell of a scratch copy —
the repo file is never edited — each asserted to (a) actually differ from the source, (b) exit 1, and
(c) fire its **intended** check. Banked whole at `evidence/W4/seam-contract-negative-controls.txt`:

| control | expected | fired | exit |
|---|---|---|---|
| NC-1 `parseCssColor` published `identical` while 20 ledger rows bind it | **E** | yes | 1 |
| NC-2 the `parseStylesheet` row deleted | **B** | yes | 1 |
| NC-3 a 53rd row with no `index.ts` origin | **A** | yes | 1 |
| NC-4 `parseTimingFunction`'s consumer-direction blanked | **H** | yes | 1 |
| NC-5 a carried cell published as `declared-divergence` | **G** | yes | 1 |
| NC-6 `color-mix()` struck from §Non-goals | **K** | yes | 1 |
| NC-7 surface-wide row `R3` dropped from §7 | **J** | yes | 1 |
| NC-8 ledger row `CAP-9` dropped from a disposition | **I** | yes | 1 |
| NC-9 an id that is no ruled class | **F** | yes | 1 |

**9 of 9.** The first attempt at NC-7 read **EXIT=0** because Prettier's table padding defeated the
mutation's `sed` pattern — the control was **VOID, not passing**. It is recorded because the cure was
to make the harness assert `cmp -s source mutant` before counting a control, so a mutation that does
not apply now prints VOID instead of a false green. That is the same defect class this gate exists to
refuse in others.

#### Act 6 — gate readings, BEFORE → AFTER

| gate | BEFORE (baseline, re-measured at this seat) | AFTER | verdict |
|---|---|---|---|
| **G-1** | ⟨cmd⟩ `ls docs/tranches/X/parse-that/SEAM-CONTRACT.md docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` → *No such file or directory* (**both**) — **0 of 52 rows** | **52 of 52**; ⟨cmd⟩ the spec's literal command → `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · *"VERDICT: GREEN"*, **EXIT=0**, run twice with ⟨cmd⟩ `diff` → **no output** | **GREEN** |
| **G-2** | the property **unasserted** — no X·P wave had run the check | LEG 2 (§9's, the one X·P controls): ⟨cmd⟩ `git show --name-only --format= b4f8e5d1 \| grep -E '^(src\|demo\|api\|test\|e2e)/' \| wc -l` → **0**. LEG 1 (tree-wide) at commit time: **1 line**, `M test/gradient-v4-consume.test.ts` — a sibling seat's live work, `test/**` is §4 Do-NOT-touch; **declared, not cured** | **GREEN on leg 2; leg 1 DECLARED-DIVERGENT** |

`evidence/W4/value-source-untouched.txt` banks both legs at each of this unit's commits, with the
reason for leg 1 named rather than smoothed. Nothing was stashed, staged, reverted or restored to make
either leg read better — *"a seat that deletes … to make a grep prettier has broken a working tree to
satisfy a gate"* (§6 G-7's named failure mode, which generalizes).

#### Act 7 — §7 format cadence

⟨cmd⟩ `npx prettier --write` over both authored files, then ⟨cmd⟩ `npx prettier --check` → *"All
matched files use Prettier code style!"*; three further `--write` passes hold the file at **121,820 B**
(idempotent). ⟨cmd⟩ `git diff --check -- docs/tranches/X/parse-that/` → **exit 0, no output**;
⟨cmd⟩ `grep -c ' $' SEAM-CONTRACT.md` → **0**. **Measured and stated rather than smoothed**: Prettier's
markdown table alignment grows the contract **56,280 B → 121,820 B (+116%)**, all of it interior cell
padding, and **no sibling X·P document is Prettier-formatted** (⟨cmd⟩ `--check` over `W4.md`,
`DIVERGENCE-LEDGER.md`, `COHESION.md` → all three `[warn]`). §7 was obeyed as written and the cost is
recorded, not traded away. The checker was **re-run at the settled bytes** after formatting (§WRITE-THEN-MEASURE);
every figure published above is read from those bytes.

#### Act 8 — cross-check with the parallel seat (§4a), unasked for and load-bearing

`.a` and `.b` ran concurrently and share no path. `.b`'s `evidence/W4/packed-surface.json` records
this contract at **sha256 `e269f6e665f288948a58ff1c6ac24e4e252e044a91806c5a832a0f0a09fe0818`** —
⟨cmd⟩ `shasum -a 256 docs/tranches/X/parse-that/SEAM-CONTRACT.md` at this seat returns **the same
digest**, so `.b` read the settled bytes — and its own reading is *"the set-difference between the
contract's 52 rows and `universe-52.json`'s is EMPTY IN BOTH DIRECTIONS"*, discharging its `R-w4b-1`.
This seat independently simulated `.b`'s row reader over the settled contract: **52 rows, 19 runtime +
33 type, both set-differences ∅**. Two instruments, written by two seats that never shared a byte,
agree on checks A and B. `.b`'s `F-w4b-4` (a column-0 reader would parse the ordinal as the name) is
**not a defect of this contract**: the ordinal column is §3's `#`, and `.b` cured it at its reader.

#### Findings — surfaced, none cured, none presumed

**F-w4a-1 (MEDIUM, ledger drift — three `DIVERGENCE-LEDGER.md` rows rest on premises measured FALSE).**

| row | its claim | measured 2026-09-19 |
|---|---|---|
| `CN-2` | *"the 10 frozen runtime exports that are neither realized nor named"* | **all 10 exported and callable** — `entry.mjs` `:260` `:546` `:1001` `:1002` `:1003` `:1004` `:1067` `:1168` `:1333` `:1337`; ⟨cmd⟩ over the imported module → **19 of 19, 0 missing** |
| `CN-3` | *"the 28 frozen type exports the candidate does not declare"* · *"re-exports 5 … and declares no others"* | **all 33 declared** — `build/ac1.d.ts` re-exports 33 from the vendored 4.0.0 declaration; `declaredTypeNames` = **33**, both set-differences ∅ |
| `R4` | *"`parseKeyframeSelector` is one of the six entries the candidate does not realize"* | **`UNREALIZED_ENTRIES` = `[]`**; the entry is in `PUBLIC_ENTRIES` and answers **27,021 of 27,021 AGREE** in both lowerings |

This is **`F-ab1`**'s family — already on the carried-obligations table and routed there to *"X.P.W4
seat 0"* — confirmed here from the **producer** side (not only the instrument side) and **extended by
two rows** (`CN-2`, `R4`). **Not cured**: `DIVERGENCE-LEDGER.md` is E-3 dated evidence, is in no unit's
writable set here, and its generator lives in `<p2>`. The contract's consequence is the 39 PENDING rows
whose consumer-direction fields each state what the measurement shows and what a consumer should plan
for. **`.d`'s adjudication is the terminal site.**

**F-w4a-2 (INFO — the differential's `noPeer 28` is an instrument reading, not a producer gap).** The
28 NO-PEER rows are **exactly** `CN-3`'s 28, and the 24 COMPARED include exactly the five of
`candidateTypeNames`' hard-coded literal. The producer declares all 33. Recorded so `.c` does not read
RC-P conjunct 3's `noPeer` as a producer gap and so `.d` rules `CN-3` against the right subject.

**F-w4a-3 (INFO — G-2's tree-wide leg is not X·P's to satisfy).** Stated in Act 6; `test/**` is §4
Do-NOT-touch and the dirty row is a sibling's.

#### Residuals carried, and what `.c` / `.d` inherit

| id | state |
|---|---|
| **`ESC-c1`** (PT-03's latch) | **CARRIED, by id** — the contract §5 states its scope honestly (per-process, not per-call) and cures nothing; its home is *"X.P.W4 / the parse-that library seam"* |
| **`F-ab1`** | **CONFIRMED and EXTENDED** (F-w4a-1). Still owed a cure at `<p2>`'s `test/css-equivalence/**` and at the ledger's generator — neither in this unit's set |
| **`GROUND-C`** per-cell adjudication | `SEAM-CONTRACT.md` §6.1 assembles the evidentiary state `.d` inherits, including `.e`'s finding that `ADJ-3`/`S-2`'s **citation is wrong** (css-values-4 §10.9 is *Type Checking*) and its reject half is refuted for `<hue>`. **Not ruled here** — §0v gives it to the fresh adjudicator |
| the juxtaposition dissent | §6.2 quotes `.e`'s refutation verbatim: the candidate's grammar-level juxtaposition is *"a strict superset of the tokenizer's maximal munch … a candidate **MIS_ACCEPT** against the spec"* (`F-e1`). The contract tells a consumer **not to build on the widening** |
| **`F-e4`** (hue un-normalized by BOTH engines) | recorded in §6.3 — `.e` addressed it *"for X.P.W4's adoption packet"*, i.e. `.d`'s |
| `.c` inherits | a 52-row contract whose row set `.b` has already cross-checked; RC-P conjunct 3's `noPeer 28` explained (F-w4a-2); and §1's thirteen HEAD-only names, of which `serializeCssValue` is KF.W3's reciprocity subject |

**No escalation.** Every act stayed inside the writable set; no byte was written under `src/**`,
`demo/**`, `api/**`, `test/**`, `e2e/**`, `X/waves/**`, or any sibling repo, and `scripts/dev/dev.sh`
was never touched.

**Commit**: `b4f8e5d1` *"docs(x-p-w4/seam): the 52-row seam contract — V.L1/V.L5 and src/css/** named
in both vocabularies"* — 5 files, 1,037 insertions, **0 paths under `src|demo|api|test|e2e`**.

---

## Close

**SERVED MODEL: claude-opus-5[1m]** — CLOSE SEAT, **VERIFY-ONLY**, a seat that authored no gate and
cured nothing. Wall clock **2026-09-19**; sitting of record **2026-09-17** (the owner's begin-word,
COHESION §0j). Every reading below was produced by a command this seat ran itself against the
settled bytes; nothing is inherited from a unit receipt, and where a unit's number and this seat's
number differ the divergence is stated rather than smoothed.

**VERDICT: PARTIAL — 2 of 4 units sat. `.a` DONE · `.b` PARTIAL · `.c` and `.d` NEVER DISPATCHED.**
**4 gates GREEN · 6 gates RED.** **No four-verb line moves** — see §The four verbs below.

**Substrate.** value.js `/Users/mkbabb/Programming/value.js`, branch `tranche-u` — ⟨cmd⟩ `git log
--oneline -1` → **`2613953b`** at this seat's open. Fresh writer root `<p2>` =
`/Users/mkbabb/Programming/parse-that-css-totality-p2`, branch **`w2/harness`** — ⟨cmd⟩ `git -C <p2>
log --oneline -1` → **`00806a8`**; ⟨cmd⟩ `git -C <p2> status --porcelain` → **`?? .worktrees/` alone**.
Frozen read-only root — ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that log --oneline -1` →
**`ef10d5b`**, unmoved, never written by this wave.

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **3 rows**:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's / the owner's) ·
`M docs/tranches/X/execution/A/X-W6.md` (**Track A's live work**) · `M scripts/dev/dev.sh`
(**unowned, NEVER touched, never staged**). ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that
status --porcelain | wc -l` → **31 rows** in the **frozen read-only** root (**14** modified/deleted
`rust/**` + **17** untracked) — **none of it this wave's**, that root is §4 Do-NOT-touch, and not one
byte of it was touched, stashed or restored. ⟨cmd⟩ `git -C <p2> status --porcelain` →
`?? .worktrees/` alone.

**Inside this seat's own writable set** (`docs/tranches/X/execution/D/X-P-W4.md` ·
`docs/tranches/X/execution/LEDGER.md`): the record was **clean**; `LEDGER.md` was **dirty with
exactly one hunk, and it was not this wave's** — ⟨cmd⟩ `git diff -U0 -- docs/tranches/X/execution/LEDGER.md
| grep -cE '^@@'` → **1** at this seat's open, at line **34**, the **`X-W6` row** (Track A, moving
`CHECK 1` → `REPAIR 1 (round…`), paired with a then-dirty `execution/A/X-W6.md`. **It was a sibling
seat's live work, not a killed predecessor's work on this unit**: no hunk of it touched the `X.P.W4`
row. It was read whole, judged, and **left standing** — nothing stashed, nothing restored, nothing
reverted. **Then it resolved itself while this seat measured**: the Track A seat committed its own
bytes, and ⟨cmd⟩ the same hunk count re-run before this seat's own LEDGER edit → **0**. The hazard it
posed is recorded because it was real and will recur: `git commit -- <pathspec>` records the
*working-tree* content of the named path, so a LEDGER commit taken while a sibling's hunk stands in
that same file **carries it**, and pathspec discipline cannot prevent same-file carry. This seat's
LEDGER commit was taken at a **clean-but-for-its-own-edit** file and carries **no sibling hunk**.
No other path was staged, and `scripts/dev/dev.sh` was never touched.

### ACT 1 — every unit's commits exist and touch only that unit's writable set

⟨cmd⟩ `git show --name-only --format= <sha>` in each root. **Six commits across two roots; the
frozen root carries none.**

| # | root | sha | message | paths | inside the unit's §4 set? |
|---|---|---|---|---|---|
| 1 | `<p2>` | **`ca615a6`** | `feat(x-p-w4/packed): pack-install-resolve the candidate; prove the Wasm zero-function-import admission` | `typescript/scripts/packed-candidate-surface.mjs` · `typescript/scripts/wasm-admission.mjs` | **YES** — §4 rows 12–13 (`create`), `.b`'s by §4a |
| 2 | value.js | **`f92a3f32`** | same message | `evidence/W4/packed-surface.json` · `evidence/W4/wasm-imports.json` | **YES** — §4a: *"`.b` owns … `evidence/W4/packed*` + `evidence/W4/wasm*`"* |
| 3 | `<p2>` | **`00806a8`** | `fix(x-p-w4/packed): the seam reader locates the name, and the contract-vs-universe set-difference is measured in both directions` | `typescript/scripts/packed-candidate-surface.mjs` | **YES** |
| 4 | value.js | **`046bc176`** | same message | `evidence/W4/packed-surface.json` | **YES** |
| 5 | value.js | **`b4f8e5d1`** | `docs(x-p-w4/seam): the 52-row seam contract — V.L1/V.L5 and src/css/** named in both vocabularies` | `SEAM-CONTRACT.md` · `scripts/seam-contract-check.mjs` · `evidence/W4/seam-contract-check.txt` · `evidence/W4/seam-contract-negative-controls.txt` · `evidence/W4/value-source-untouched.txt` | **YES** — §4 rows 1–2 and 4; `value-source-untouched.txt` is §8's named chain-of-custody artefact, assigned to `.a` in the third sitting's plan |
| 6 | value.js | **`1f23675d`** | `docs(x-p-w4/a): receipt — G-1 GREEN 52/52 with nine negative controls, the two 44s disambiguated, three ledger rows measured stale` | `execution/D/X-P-W4.md` · `evidence/W4/value-source-untouched.txt` | **YES** — the execution record and `.a`'s own leg |

**LANDED-WRONG: NONE.** No commit of this wave holds a path under `src/**`, `demo/**`, `api/**`,
`test/**`, `e2e/**`, `X/waves/**`, `X/keyframes/**`, `X/fourier/**`, `package.json`,
`.github/workflows/**`, `scripts/dev/dev.sh`, or any sibling repo. §9's per-commit form, re-run by
this seat over all four value.js commits — ⟨cmd⟩ `git show --name-only --format= <sha> | grep -E
'^(src|demo|api|test|e2e)/' | wc -l` → **`0 · 0 · 0 · 0`**. `.b`'s worktree
`<p2>/.worktrees/w4b` is §4b's container, **inside** the fresh root; ⟨cmd⟩ `ls -d
/Users/mkbabb/Programming/parse-that-*` → **7 roots** (`…-css-totality` · `…-p1-e` · `…-p1-r` ·
`…-p1-vk` · `…-p2` · `…-runtime-probes` · `…-skv26`), **every one of them pre-existing and none
matching `…-p2-w4*`** — the ONE-root law held, stated as the whole reading rather than as an absence.

### ACT 2 — the ten gates, RE-RUN BY THIS SEAT. **4 GREEN · 6 RED.**

| gate | BEFORE (§6's own RED baseline / the wave's open) | AFTER — measured at this seat's clock | verdict |
|---|---|---|---|
| **G-1** seam contract 52/52 | ⟨cmd⟩ `ls SEAM-CONTRACT.md scripts/seam-contract-check.mjs` → *No such file or directory* (both) — **0 of 52 rows** | the spec's **literal** command re-run whole → `rows: contract 52 · universe 52 · ledger rows 47`; `contract ∖ universe-52 : ∅`; `universe-52 ∖ contract : ∅`; disposition census `PENDING-ADJUDICATION 45 · identical 7`; *"VERDICT: GREEN — both set-differences ∅, no disposition contradicts the ledger, every carried cell publishes PENDING-ADJUDICATION, no field is blank"*, **EXIT=0**; **double-run, ⟨cmd⟩ `diff` → no output** | **GREEN** |
| **G-2** zero value.js source bytes | the property **unasserted** — no X·P wave had ever run the check | **LEG 2 (§9's per-commit, the leg X·P controls): `0 · 0 · 0 · 0` over all four value.js commits.** **LEG 1 (§6's tree-wide literal): ⟨cmd⟩ `git status --porcelain -- src api demo test e2e` → **0 lines**, double-run `0 ≡ 0`, at this seat's clock.** The one line `.a` and `.b` declared at their commits (`M test/gradient-v4-consume.test.ts`, a Track A seat's live work, `test/**` Do-NOT-touch) has since been committed by its own seat and is gone | **GREEN** — both legs read TRUE at close; the one historical leg-1 divergence is declared, never cured |
| **G-3** packed candidate, proven from the tarball | `packed-candidate-surface.mjs` **ABSENT**; no candidate package exists | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md` → `candidate "@mkbabb/parse-that@1.0.0"` · `tarballSha256 efc11936…` (**identical to `.b`'s bank**) · `entryCount 1` · `seamSubpathDeclared false` · **`resolved "0 of 52"`** · `refusals 5` · `verdict {pack true, declaration true, install true, resolve false, refusals true, G3 "RED"}`, **EXIT=1**; **double-run identical** (timestamps/tmpdirs excluded) | **RED — honestly. The protocol is whole; the candidate is not packaged.** Three HIGH causes, every cure address outside §4 → **F-w4b-3 ESCALATED** |
| **G-4** Wasm zero-function-import admission | *"no project Wasm artifact exists"* (2026-08-03); at open, **subject present, inspector ABSENT** | the spec's **verbatim** §6 one-liner against the graduated subject `<p2>/typescript/src/css/build/ac1.wasm` → `{"total": 0, "functionKind": 0, "imports": []}`, instantiation against `{}` did not throw, **EXIT=0**. Then ⟨cmd⟩ `node scripts/wasm-admission.mjs <all project artifacts>` → `tally {artifacts 9 · admitted 9 · functionKindImportsTotal 0 · unaccountedImportsTotal 0}` · `"verdict": "GREEN"` · **EXIT=0**, **double-run identical with `generatedAt` excluded** | **GREEN** |
| **G-5** RC-P evaluator exists and reports honestly | evaluator absent; all six conjuncts FALSE | ⟨cmd⟩ `ls <p2>/typescript/scripts/rc-p-evaluate.mjs` → **No such file or directory**. Conjunct 1 re-measured: `npm view @mkbabb/value.js version` → **4.0.0**, `package.json#version` → **4.0.0** — no `V` candidate is published | **RED — `.c` was never dispatched. Unmoved from its baseline** |
| **G-6** reciprocity, both ends | *"neither sub-tranche's wave directory exists"* — 0 hits | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/` → **25 hits over 5 files**, so the two-hit falsifier does not fire. **Legs 1–2 GREEN before any act of this wave**, verbatim and authored by their own seats: `KF-W3.md:9` carries the KF.W3 sentence word-for-word, `F-W0.md:459` the F.W0 sentence inside its dated addendum-beside, **each citing the predicate by name and not a wave number**. **LEG 3 ABSENT**: ⟨cmd⟩ `grep -rn 'SEAM-CONTRACT' docs/tranches/X/waves/` → **no line** — the X·V adoption sentence has no file to live in (that is G-9). And `RELEASE-CONDITION.md`, which both far-end sentences cite by path, **does not exist**; `evidence/W4/reciprocity-grep.txt` was never banked | **RED on leg 3 and on the cited file's existence; legs 1–2 declared GREEN-BEFORE-CURE (F-w4c-3)** |
| **G-7** forbidden edge at zero — **INHERITED-GREEN FLOOR** | 0 hits in both fourier manifests | ⟨cmd⟩ `grep -c 'parse-that' /Users/mkbabb/Programming/fourier-analysis/package.json` → **0**; ⟨cmd⟩ over `web/package.json` → **0**. The transitive copies were **not** touched — *"a seat that deletes a transitive copy to make a grep prettier has broken a working tree to satisfy a gate"* | **GREEN — the floor is held. It was not won here and it was not lost** |
| **G-8** mail closed + a lawful delivery path | INBOX X·P hits 0; `RELEASE-PACKET.md` absent | ⟨cmd⟩ `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → **No such file or directory**; ⟨cmd⟩ `grep -c 'X·P\|X.P.W\|RC-P' INBOX.md` → **42** (X·P has mail rows; **none of them the packet's**). **The mail leg alone is GREEN**: UNREAD by position → **0**, double-run `0 ≡ 0` | **RED on the packet leg — `.d` was never dispatched** |
| **G-9** adoption gap, terminal disposition | no X·V wave adopts a parser | unmoved at the bytes. The disposition is **pre-ruled (C)** at COHESION §0i.1 with its re-trigger named — but `W4-CLOSE.md`, the file §6 requires it to be **recorded** in, ⟨cmd⟩ `ls` → **No such file or directory**. A pre-ruled disposition that no close records is *"closing with the gap unstated"* | **RED — ruled, UNRECORDED. `.d` was never dispatched** |
| **G-10** the R-A stamp act | open-state sum must read **5** | ⟨cmd⟩ `cat waves/W0.md W1.md W2.md W3.md W4.md \| grep -c …` → **7**, double-run `7 ≡ 7`. Per-file `W0:1 · W1:1 · W2:1 · W3:3 · W4:1`. The stamp act was **not performed**; close-state sum is required to be 0 and reads 7 | **RED — and the count question F-w4c-1 raises is still UNRULED** |

**GREEN: G-1 · G-2 · G-4 · G-7. RED: G-3 · G-5 · G-6 · G-8 · G-9 · G-10.**

### ACT 3 — §8 Verification Artefacts, run as written

| §8 artefact | state | by |
|---|---|---|
| `SEAM-CONTRACT.md` — 52 rows, non-goals, inherited-from-parse-that, open contract questions | **PRESENT**, 121,820 B, sha256 `e269f6e6…` (⟨cmd⟩ `shasum -a 256` at this seat = the digest `.b` independently recorded) | `.a` |
| `RELEASE-CONDITION.md` — RC-P verbatim, six commands, three reciprocity sentences | **ABSENT** | `.c` (undispatched) |
| `evidence/W4/packed-surface.json` | **PRESENT**, 128,861 B | `.b` |
| `evidence/W4/wasm-imports.json` | **PRESENT**, 9,392 B | `.b` |
| `evidence/W4/rc-p-evaluation.json` | **ABSENT** | `.c` (undispatched) |
| `evidence/W4/value-source-untouched.txt` — G-2's chain of custody at every commit | **PRESENT**, 3,312 B, both legs banked per commit with leg 1's cause named | `.a` |
| `evidence/W4/reciprocity-grep.txt` | **ABSENT** | `.c` (undispatched) |
| `waves/W4-CLOSE.md` — ten gates RED-before/GREEN-after, the X·P terminal state table, the G-9 disposition, the R-A stamp act | **ABSENT** | `.d` (undispatched) |
| `RELEASE-PACKET.md` | **ABSENT** | `.d` (undispatched) |
| the INBOX sent-row for the packet, naming its in-repo path and the SS-6 batch | **ABSENT** | `.d` (undispatched) |
| `registry/harvest/x-p-w4.json` — the L-13 harvest, seat count = units dispatched | **ABSENT** | `.d` (undispatched) |
| commit hashes for each phase in both roots | **PHASE 1 ONLY** — six commits, rostered in ACT 1. Phases 2 and 3 have none | — |
| *(extra, banked beyond §8)* `evidence/W4/seam-contract-check.txt` · `evidence/W4/seam-contract-negative-controls.txt` | **PRESENT**, 4,487 B · 4,727 B — G-1's run and its **nine** negative controls | `.a` |

**Counted exactly, over the twelve §8 rows: 4 PRESENT · 1 PARTIAL (the commit roster — phase 1 only)
· 7 ABSENT.** The seven absent are exactly **`.c`'s three** (`RELEASE-CONDITION.md`,
`rc-p-evaluation.json`, `reciprocity-grep.txt`) and **`.d`'s four** (`W4-CLOSE.md`,
`RELEASE-PACKET.md`, the INBOX packet row, `x-p-w4.json`) — **no artefact is missing for any reason
other than its unit never sitting.** The two extras `.a` banked beyond §8 are counted in neither
figure.

### ACT 4 — E13, the four-path mail sweep at this seat's own clock

Read-only, compared against **every row** of `docs/tranches/V/coordination/INBOX.md`; `INBOX.md`
self-excluded from its own denominator (SELF-COUNT law); classification read from each row's Status
cell **by position**, never from a bare `grep -i UNREAD`.

| path | `*.md` at depth 1 | unrowed addressed to value.js |
|---|---|---|
| `docs/tranches/V/` | 10 | 0 |
| `docs/tranches/V/coordination/` | 24 | 0 |
| `../glass-ui/docs/tranches/BK/coordination/` | 9 | 0 |
| `../keyframes.js/docs/tranches/V/coordination/` | 12 | 0 |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | 0 |

⟨cmd⟩ the by-position scan → **UNREAD 0**, double-run **`0 ≡ 0`**, over **79** register rows (of the
file's **85** `^| ` rows). Register tail **`O-39`**, unmoved. ⟨cmd⟩ `find <the four paths> -maxdepth 1
-type f -name '*.md' -newermt "2026-09-19 06:00"` → **no member** — nothing has landed since `.a`'s
sweep. **0 unrowed · 0 `I-n`/`O-n` minted by this seat · 0 UNREAD in X·P's scope.** `INBOX.md` is in
neither of this seat's pathspecs, and no sweep line is owed twice for a census identical to the one
already appended.

### The four verbs — NONE MOVES, and that is the honest act

| verb | value at this close | why |
|---|---|---|
| AUDITED | **YES** (unchanged) | §2's table, set at authoring |
| SPECIFIED | **YES** (unchanged) | `W4.md` itself, 2026-08-03, plus its two dated addenda |
| IMPLEMENTED | **NO — NOT STAMPED** | *"Gates green + bytes landed stamps a wave IMPLEMENTED"* (R-A). **Six of ten gates are RED** and **two of four units never sat**. A stamp here would be closure by omission |
| VERIFIED | **NO — NOT THIS SEAT'S TO STAMP, AT ANY GATE STATE** | R-A: *"VERIFIED is stamped only at this wave's release close"*, by **`.d` alone**, the fresh Fable adjudicator, *"in one act"* across five files. This seat is not `.d`; it authored no gate and it certifies none. G-10's own falsifier — *"A stamp performed while any of G-1..G-9 is red fails — the act is the consequence of the gates, never a substitute for them"* — forbids it twice over |

**No byte of `waves/W0.md`, `W1.md`, `W2.md`, `W3.md` or `W4.md` was touched by this seat.** The R-A
carve is `.d`'s and remains unperformed.

### Escalations — returned, not substituted for

1. **F-w4b-3 (HIGH, bounds — G-3's cure has no lawful address inside this wave).** `W4.md` §4 grants
   X.P.W4 exactly three creatable paths in the fresh root (the three `scripts/*.mjs`); **no unit may
   write `<p2>/typescript/package.json` or anything under `<p2>/typescript/src/css/**`**, and all
   three causes of G-3's RED live there: **C1** the manifest declares `files: ["./dist"]` (gitignored
   output that is not in the tree) and an `exports` map with **no `./css`**, so `npm pack` ships
   `entryCount 1` — package.json alone; **C2** with the subpath declared and `src/css` shipped, the
   installed runtime still fails `ERR_MODULE_NOT_FOUND: Cannot find package 'tsx'` — `tsx/esm/api` is
   imported at `src/css/lowering-js/js-alg.mjs:23` and `src/css/bounds.mjs:834` and is a devDependency
   of the fresh root, declared nowhere in `@mkbabb/parse-that`; **C3** `build/ac1.d.ts` re-exports all
   33 frozen types through a relative specifier that **escapes the package root** into value.js's
   vendored tree, so the declaration is not self-contained. `.b`'s positive control — a staged copy
   outside both repositories, with `"./css"` declared and `src/css` shipped — still resolved **0 of
   52**, which is how C2 and C3 were located rather than guessed. **Trigger**: §3a *"Hard-gate failure
   that is not local-edit-recoverable"*. **Admissible cures, UNRULED**: (a) one dated addendum-beside
   to `W4.md` §4 naming those four paths writable for a named unit, or (b) a successor X.P.W2
   packaging unit that owns them. Either way it is **three** cures, not one.
2. **F-w4c-2 (MEDIUM, bounds — ESC-e2's harvest is measurable and unlandable).** Seat 0 ran §0p's
   scratch-mirror procedure with the unmodified harvester symlinked and the repo untouched, and
   measured W3's honest denominator at **nine runs / 78 agent results** against the filed
   `x-p-w3.json`'s three-run, five-seat fold. Landing it means writing
   `docs/tranches/V/megatranche/registry/harvest/x-p-w3.json`, **a path in no row of `W4.md` §4**.
   Cure: one dated addendum-beside adding it. A triumvirate act, not a seat's.
3. **F-w4c-1 (MEDIUM, instrument — G-10's count, and it is a halt condition on `.d`).** The
   open-state sum has grown **5 → 6 → 7** and neither of §6's two named causes is present: OP-6's form
   check is 1 per file across all five, and all ten `VERIFIED` lines in `W[0-3]-CLOSE.md` **disclaim**
   the stamp. The cause is a third the spec did not anticipate — `W3.md` carries the matching row at
   its §2 table **and** in its sixth and seventh dated addenda (`:44` · `:836` · `:971`), both
   **E-3-lawful and unrewritable**. Carving only the five §2 tables would leave the close-state sum at
   2, not 0. **Admissible shapes, UNRULED**: (a) a dated addendum narrowing G-10's command to rows
   inside a `### Four-verb status` block — the only shape that stays true under a ninth W3 round — or
   (b) naming `W3.md:836` and `:971` as additional carve targets.

### Residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| **U-c** | **`X.P.W4.c` NEVER DISPATCHED** — `RELEASE-CONDITION.md`, `rc-p-evaluate.mjs`, `rc-p-evaluation.json`, `reciprocity-grep.txt`, and G-5 · G-6 leg 3 · G-7's verification all owed | the orchestrator — an Opus 5 seat, serial after `.a ∥ .b`, which have both sat |
| **U-d** | **`X.P.W4.d` NEVER DISPATCHED** — `W4-CLOSE.md`, `RELEASE-PACKET.md`, the INBOX packet row + SS-6 hand-off, the two COHESION carve cells, `registry/harvest/x-p-w4.json`, the G-9 record, and the single R-A stamp act | the orchestrator — a **fresh Fable adjudicator** (M-23 §1), serial last and alone; **halts on F-w4c-1** until G-10's count is ruled |
| **F-w4a-1** | three `DIVERGENCE-LEDGER.md` rows rest on premises measured FALSE **at the producer**: `CN-2` (*"10 runtime exports neither realized nor named"* — all 10 exported at `entry.mjs`), `CN-3` (*"28 type exports the candidate does not declare"* — 33 of 33 declared), `R4` (*"`parseKeyframeSelector` is one of the six the candidate does not realize"* — realized, 27,021/27,021 AGREE). `F-ab1`'s family, confirmed from the producer side and extended by two rows | `.d`'s adjudication is the terminal site; the ledger is E-3 evidence and its generator lives in `<p2>` |
| **F-w4a-2** | the differential's `noPeer 28` is **exactly** `CN-3`'s 28, and the 24 COMPARED include exactly the five of `candidateTypeNames`' hard-coded literal — an **instrument** reading, not a producer gap | `.c`, so RC-P conjunct 3 is not read as one |
| **SEAM-DRIFT** | the frozen 52 is **not** today's `src/css/**`: HEAD `tranche-u` publishes **65** names (20 runtime + 45 types) where the pin publishes 52. `frozen ∖ HEAD` = ∅, so every seam row is still published, but the **13 adds** — `serializeCssValue` plus twelve re-exported types — are **outside the seam and provided by no candidate symbol**. `serializeCssValue` is the exact name KF.W3's reciprocity sentence commits to a *"fork retirement"* | `.d`'s packet, and the X·V adoption wave G-9 disposition (A) names as its payload |
| **R-w4b-2** | §7's fresh-root `npx tsc --noEmit` / `npx eslint .` cadence has **no subject** for the two `.mjs` scripts: the root has no eslint config or install, `typescript/tsconfig.json` includes only `src/` and `test/`, and there is no `@types/node` anywhere in the root. `node --check` + `git diff --check` are what was run, both green | carried, measured — a triumvirate question if §7 is to bind in that root |
| **F-ae1 / F-p1** | `test/css-equivalence/**`'s stale pins, routed by W3's CHECK 1 to *"the seat that next opens `test/css-equivalence/**` = X.P.W4"* — but that path is in **no** unit's writable set here and `test/**` is §4 Do-NOT-touch | **needs a home that is not this wave** — re-escalated |
| **ESC-c1 · R6-1 · F-ab1 · F-ab2 · F-ab3 · R-f1 · E-2/F-e10 · ESC-d1 · the `E-h*`/`E-j*`/`E-k*` set** | carried by id from W3's rounds 6–8, **none discharged** — every one of them names `.d`'s adjudication or the triumvirate as its terminal site | `.d` / the triumvirate |
| **`.b` PARTIAL** | G-3 RED with the protocol whole. `.b`'s own five legs (pack · declaration · install · refusals) are GREEN; only **resolve** is RED, and it is RED because the candidate has never been packaged | F-w4b-3's cure |

### Format and lint cadence (§7)

⟨cmd⟩ `git diff --check` → **clean** in value.js and in `<p2>`. Prettier was **not** re-run over any
authored file by this seat — `.a` banked its `--check` green and three idempotent passes at 121,820 B,
and re-formatting a settled artefact from a verify-only seat would rewrite E-3 bytes. The shared
append-only wave record is **not** Prettier-formatted and must not be: ⟨cmd⟩ `prettier --check` over
it already reported non-conformant **before** this append, and formatting it would rewrite six seats'
immutable bytes.

### Push (the owner's 2026-09-17 authorization; never forced)

| root | remote | state | act |
|---|---|---|---|
| value.js | `origin` → `github.com/mkbabb/value.js` | branch `tranche-u`, ⟨cmd⟩ `git rev-list --left-right --count origin/tranche-u...HEAD` → **0 behind / 23 ahead** at this seat's open | **PUSHED** — `git push origin HEAD` |
| `<p2>` `/Users/mkbabb/Programming/parse-that-css-totality-p2` | ⟨cmd⟩ `git remote -v` → **no output** | branch `w2/harness`, HEAD `00806a8` — **the fresh writer root has NO REMOTE** | **NOT PUSHABLE.** Stated, not skipped: `.b`'s two commits (`ca615a6`, `00806a8`) live only on disk. The fresh root's publication is an owner/orchestrator question, not a seat's |
| `/Users/mkbabb/Programming/parse-that` (frozen, §4 **Do-NOT-touch**) | `origin` → `github.com/mkbabb/parse-that` | ⟨cmd⟩ `git rev-list --left-right --count origin/master...HEAD` → **0 / 0**; HEAD `ef10d5b` contained in `origin/master` | **PUSH IS A NO-OP** — this wave landed no commit there, and none was created to make one |

**Push receipt, taken after the two close commits landed (2026-09-19).** ⟨cmd⟩ `git -C
/Users/mkbabb/Programming/parse-that push origin HEAD` → **`Everything up-to-date`** — the no-op the
0/0 reading predicted, and the frozen root is left exactly as found. ⟨cmd⟩ `git push origin HEAD` in
value.js → **`7630cc48..6b8ec46c  HEAD -> tranche-u`**; ⟨cmd⟩ `git rev-list --left-right --count
origin/tranche-u...HEAD` → **`0 0`** after. Never forced. `<p2>` was not pushed and could not be: it
has no remote.

**This close's own commits** (pathspec on each, one file each, `scripts/dev/dev.sh` never touched and
no sibling path staged): **`ee33cf80`** *"docs(x-p-w4/close): PARTIAL — .c and .d never dispatched; 4
gates GREEN, 6 RED, no verb moved; three escalations returned"* (this record) · **`6b8ec46c`**
*"docs(x-p-w4/close): LEDGER — X.P.W4 PARTIAL, .c and .d undispatched, six commits rostered, three
escalations named"* (the `X.P.W4` row alone — ⟨cmd⟩ `git diff -U0 | grep -E '^@@'` re-run immediately
before the commit returned the single hunk at line 82 and no other).

### What the next sitting does

`.a` and `.b` have sat; `.c` dispatches next (serial, Opus 5), then `.d` (serial, alone, fresh
Fable) — **and `.d` cannot close the sub-tranche while G-3 is RED and F-w4c-1 is unruled**. The two
bounds escalations (F-w4b-3, F-w4c-2) and the G-10 counting question are **triumvirate acts** and
must be ruled before `.d` is dispatched; dispatching `.d` first would put the only seat that may
stamp VERIFIED in front of a halt condition it is required to honour.
