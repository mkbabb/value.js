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
