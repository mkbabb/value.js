SERVED MODEL: claude-opus-5[1m]

# X-W0 — Track A (X·V) execution record

**Wave**: X-W0 — Formation: Rulings, Tombstones, Track-or-Archive, Graph Authority
**Spec**: `docs/tranches/X/waves/W0.md` (2026-08-03) + `§ADDENDUM 2026-08-30` (X-W0.j widened to 8.0.0 **and** 9.0.0)
**Fold layer (read beside the spec)**: `docs/tranches/X/refinement/X-W0-FOLD.md` — 28 rows · 11 gates (7 SHARPEN · 4 NEW) · 10 BoundsDelta entries · 25 CrossEdges
**Rulings consumed**: COHESION `§0i.2` (the glass election) · `§0j.A` (the seven owner rows) · `§0j.B` (the FB packets + G-F R-1/R-2/R-3) · `§0j` preamble (the begin-word)
**Seat**: seat 0 (OPEN) · Opus · 2026-09-17

---

## Open

**Date**: 2026-09-17. **Branch**: `tranche-u`. **HEAD at open**: `b42d775a` ⟨`git log --oneline -1`⟩.

### Preconditions — verified at the bytes AND in the ledger

| condition (spec §Dependencies / §State "Opens after") | verified how | result |
|---|---|---|
| **tranche X open — X is ratified** (`registry/CARRY-CUT-LEDGER.md` §0.2) | ⟨`sed -n '1,40p' docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md`⟩ → §0 clause 2: *"It feeds tranche-X wave authoring directly. **Letter X is ratified** (2026-08-03, M-21 … + M-22 §1 delegated judgment; `docs/tranches/A..W` all occupied, X first unused)."* | **MET** |
| **the owner's begin-word** | COHESION `§0j:465` carries it verbatim, dated 2026-09-17; committed at `b42d775a` | **MET** |
| **P-1 CLOSED** (four-path mail round) | `execution/LEDGER.md` §Pre-acts row P-1 = `CLOSED 2026-09-17` · `642a0098`; artefact = the `INBOX.md:100` sweep line | **MET** |
| **P-2 CLOSED** (27 born-RED first gates banked) | LEDGER P-2 = `CLOSED 2026-09-17` · `fd40535c` · `0bed8379`; artefacts present: `execution/gates/BASELINE-2026-09-17-value-parse.md` (35,958 B) · `…-kf-fourier.md` (34,223 B) · `census-before-2026-09-17.txt` | **MET** |
| **P-3 CLOSED** (the opening sitting ruled → COHESION §0j) | LEDGER P-3 = `CLOSED 2026-09-17`; dossier `execution/SITTING-DOSSIER-2026-09-17.md` present (71,875 B, `a3ae9a4f`); §0j.A–F present in `COHESION.md` | **MET** |
| **no prior X wave, no producer release, no external repo** (spec §Dependencies) | X-W0 is the Track A head in `EXECUTION-RUNBOOK.md` §1.1; X-W0.j reads installed bytes and returns a verdict at either polarity | **MET — nothing to wait on** |

All five pre-act commits exist and are reachable ⟨`git log --oneline -1 <hash>` ×5⟩: `642a0098` · `fd40535c` · `0bed8379` · `a3ae9a4f` · `b42d775a`.

### Mail sweep (E13 Step-0, runbook §5.3) — **1 unrowed found, 1 rowed**

Four paths swept read-only; the dated sweep line is appended at `docs/tranches/V/coordination/INBOX.md` (file end).

| # | path | newest | rowed? |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | `INBOX.md` (self-excluded, SELF-COUNT law); next `value-inbox-2026-07-20-bbnf-coordination.md`@2026-07-21 — an **outbound of ours** | nothing inbound unrowed |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 16:41 | **I-30, rowed** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md`@2026-07-27 | rowed |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md`@2026-08-03 | rowed |
| 4b | `../sci-report/atlas/docs/tranches/Q/coordination/` (atlas's **later** lane — the lane I-27's letter came from; swept because the canonical path 4 names P and atlas has moved on) | `ATLAS-TO-VALUE-2026-07-28-PASS2.md`@2026-08-03 15:06, 3,299 B, sha `7b362fea895e` | **UNROWED → minted I-31 UNREAD** |

**BK confirmed still the newest glass tranche dir** ⟨`ls -ltd ../glass-ui/docs/tranches/*/`⟩ → `BK/`@2026-09-17 12:28 heads `BJ/`@2026-08-03, `BI/`@2026-07-28. BK's 2026-09-17 writes are `BURNDOWN.md`@12:40 · `ASK.md`/`PLAN.md`@12:22 · `execution/` — **not mail paths**; bounded check ⟨`grep -ci 'value.js\|valuejs'`⟩ → `ASK.md` **1**, `BURNDOWN.md` **0**. No letter and no ask of us. glass-ui stays READ-ONLY (runbook §5.5).

**Provenance note (dated 2026-09-17, E-3 — a receipt, not a correction)**: the I-31 row and this seat's sweep line were written to `INBOX.md` before this record's commit, and the bytes were carried into HEAD by the **concurrent F.W0 seat's** pathspec commit `47608b5c` (four Track seats share that one file; it stages whatever is settled). Both are verified present in HEAD ⟨`git show HEAD:docs/tranches/V/coordination/INBOX.md | grep -c '^| I-31'` → `1`; `… | grep -c 'X-W0 open, Track A'` → `1`⟩. Nothing is lost and nothing is duplicated; the row's authorship is this seat's, its commit is that one.

**I-31, stated once**: the letter is value.js-addressed (*"Reciprocal outbound · Atlas/sci → value.js megatranche"*) and asks one thing (*"Please reciprocate with exact renamed/removed exports…"*). Its substance was **already consumed in tracked canon** — `megatranche/AUDIT-PLAN.md:177` and `megatranche/CONSUMER-ADMIN-DAG-AUDIT-2026-07-28.md:265` both cite this exact file (at its `.p-totality/sci` copy) — and our **O-12** (2026-07-27 export-delta) is the reciprocation it asks for, sent the day before it. The defect is ledger-shaped, not work-shaped: consumed without a row. **X-W0 may not CLOSE with I-31 UNREAD** (E13) — the close marks it FOLDED with those two receipts + O-12 named, or states the residue by name.

---

## Baseline — the born-RED gates, run READ-ONLY at open (2026-09-17)

Every published count double-run from settled bytes (WRITE-THEN-MEASURE + SELF-COUNT law). `git status --porcelain` was re-read after the toolchain run and is byte-identical to the open state (`--self-test` exits at `validate-completeness.mjs:508`, **before** the `:511` write — read-only by construction).

| gate | probe (⟨cmd⟩) | spec's born-RED | **measured at open** | verdict |
|---|---|---|---|---|
| **HG-1** | `git ls-files --others --exclude-standard docs/ \| wc -l` | `1858` (apotheosis 1798 · megatranche 33 · W/audit 16 · T/audit 11) | **1825** — apotheosis **1798** · `W/audit` **16** · `T/audit` **11**; **megatranche 33 → 0** | **RED — DIVERGENT (denominator moved, −33)** |
| **HG-2** | `ls docs/tranches/X/W0/TRACK-OR-ARCHIVE.md` | ABSENT | **ABSENT** (`docs/tranches/X/W0/` itself does not exist); census tree-set at depth-4 = **3** trees | **RED-AS-EXPECTED** |
| **HG-3** | `git ls-files …/raw-prompts/ \| wc -l` ⧸ `grep -cE '\bE(1[01]\|[1-9])\b' V/vnext/PROMPT-RECAP.md` | `0` ⧸ `0` | **0** ⧸ **0**; corpus on disk = `INDEX.json` + 3 archives; `INDEX.json` totals **83 + 28 + 70 = 181** prompts (180 unique — `bbnf-greenfield-coordination` is 70/69) | **RED-AS-EXPECTED** |
| **HG-4** | `sed -n '88p' V/vnext/PROMPT-RECAP.md` ⧸ `FORMATION-CLEAN-PASSES.json` | both live | `:88` → *"…Whole-formation credit is **0/2**"*; JSON → `"status":"clean"`, `"verdict":"CLEAN"` ×1 | **RED-AS-EXPECTED** |
| **HG-5** | per-phrase `grep -l` over `git ls-files`-tracked docs (MEASURE-AT-OPEN) | DR-30's finding, count not carried forward | `internal Browser` **2** · `Aristotelian` **87** · `precepts binding` **4** · `lightningcss` **11** · `sonic-rs` **5** · `ARM-only` **4** · `3x5x3` **4** · `3×5×3` **3** | **MEASURED-AT-OPEN** (presence ≠ anchored restoration; X-W0.b re-derives the twelve by name) |
| **HG-6** | `grep -c 218` ⧸ `grep -rn '264/264'` | `0` in both; 5 live gate-text sites | `grep -c 218` → **0** in `COMPLETENESS-LEDGER.md` **and** `validate-completeness.mjs`; unqualified `264/264` at **`COMPLETENESS-LEDGER.md:20,22,196`** (the spec's `:171` has drifted to **`:196`**) · `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md:68` · `IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md:49`, plus dated-record restatements at `MECHANISM-CUT-FORMATION-MAP:102,118,128` · `SCOPE.md:331` · `STATE.md:175` · `CONSTELLATION-RESURRECTION-HANDOFF:162,1275` · `CONSTELLATION-COMMISSION:9` (`:142` **already** carries the split) | **RED-AS-EXPECTED** (one line-number drift, recorded) |
| **HG-7** | `node …/validate-completeness.mjs --self-test` | verbatim: `exit 1 · **1 uncovered** · 264/264 hash-banked` | verbatim, **double-run identical**: `baseline (unmutated tree): exit 1 · **87 uncovered** · 264/264 hash-banked` / `BASELINE IS NOT GREEN — self-test is meaningless until the real tree passes. Fix the tree first.` | **RED — DIVERGENT and WORSE (1 → 87 uncovered)** |
| **HG-8** | ephemeral-worktree replay | K-35: 264× `NO-LEDGER`, exit 1 @ `87f56f11`; **MEASURE-AT-OPEN** | precondition banked read-only: `git status --porcelain -- registry workflows` → **0 lines** (clean). The replay itself **creates a worktree** and is X-W0.c's own act (§Worktree Plan's one exception) — **not run by seat 0**, deliberately | **DEFERRED-TO-UNIT (X-W0.c)** |
| **HG-9** | `find …/codex-worktree-7e28 -type f \| wc -l` | GREEN-AT-AUTHORING: 91, collision resolved | **91** files, **91 tracked**; both collision names present (`coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` + `formation/…/…WORKTREE-VARIANT.md`) | **GREEN-AS-DECLARED** (spec calls this gate a re-verification, not a cure — the 90 digest re-hashes are X-W0.d's act) |
| **HG-10** | untracked under `megatranche/` ⧸ ledger status | r2 artefacts untracked (33); 46 REPORT-AUTHORED rows | untracked under `megatranche/` → **0**; r2 files tracked: `ActionFeedback` **6** · `picker-pointerdebugoverlay` **2** · `picker-componentsliders-consolerail` **26**; `HYDRATION-LEDGER.md` `REPORT-AUTHORED` → **47** greps = **46 rows + the Totals line** | **HALF-GREEN-BEFORE-CURE** — the untracked half is discharged **by event** (exactly as fold **W0.14** predicted); the ledger-status half stays RED |
| **HG-11** | markers in `motion-quarantine.md` | 0 markers at authoring; CURED-IN-PART at `9812f951` (46 swept / 34 ruled / 16 files) | record **tracked**; `QUARANTINED-PENDING-TWO-GUARD-CHECK` literal → **0**; axis-file names resolvable by regex → **3** | **RED-AS-EXPECTED** — the residual is the coverage set-difference + the marker-token spelling; X-W0.e closes it **by dated addendum**, never by editing an axis file (C-02) |
| **HG-12** | the nine tombstone probes, re-run | see spec table | **CC-015** `grep -rn "glass-ui/blob" demo/` → **5** (`scenes/blob/BlobPane.vue` · `picker/visual/HeroBlob.vue` · `color-picker/composables/boot/useAtmosphere.ts`) · **CC-016** `vite.config.ts:139,287`, glass installed **7.0.0** · **CC-017** `63240e67…` vs kf `8ccf9f4d…` (divergent) · **CC-018** `> _(empty — the owner's verdict lands here)_` · **CC-022** kf **6.0.0** · **CC-019** vnext `proof:` → **69**, `scripts/**/proof-*.mjs` → **0 matches** · **CC-020** `Color.try` → **0** · **CC-021** ` M scripts/dev/dev.sh` · **CC-023** `301 → https://color.babb.dev/` | **RED-AS-EXPECTED — all nine reproduce** (CC-023's VPN-gated probe resolved live: permanent 301) |
| **HG-13** | seven rows ruled | 0/7 | `docs/tranches/X/W0/` ABSENT — **0/7 written**. The **rulings now exist** at COHESION §0j.A (7/7) + §0j.B (the FB/G-F docket); X-W0.g **transcribes and dates them**, never re-opens them | **RED-AS-EXPECTED (file), RULED (substance)** |
| **HG-14** | `ls workflows/graph-v3.mjs` | no artifact exists | **ABSENT** | **RED-AS-EXPECTED** |
| **HG-15** | `ls X/W0/FRONTEND-DENOMINATOR.md` ⧸ `find demo -name '*.vue' \| wc -l` | ABSENT ⧸ 88 | **ABSENT** ⧸ **88** (double-run **88**) | **RED-AS-EXPECTED** (the 88 spot-check holds exactly) |
| **HG-16** | `grep -L 'COMPLETABLE' docs/tranches/X/waves/W*.md` | ABSENT (no X tree at HEAD) | **empty output** — all twelve wave files carry the field | **GREEN-BEFORE-CURE** (R.2 law: a green before its cure is a finding — here the **authoring** cured it; re-checked at close over the set present then) |
| **HG-17** | `git ls-files docs/ \| xargs grep -ln 'V·L5\|V\.L5' \| wc -l` ⧸ DAG node ids | **35** tracked files; **8** `V.L5` node ids | **57** tracked files (double-run **57**); `validate-constellation-dag.mjs` **8** `V.L5` ids; law-bearing sites all live: `PARSER-RESURRECTION-HANDOFF-2026-07-31.md:64` · `CONSTELLATION-COMMISSION-2026-08-03.md:76` · `coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md:35` · DAG `.md` **6** hits · DAG `.json` **10** hits; `CARRY-CUT-LEDGER.md` carries **1** token (no §0 alias line yet) | **RED — DIVERGENT (35 → 57; the growth is X-tranche records, a read-only class by rule)** |
| **HG-18** | the four conditions, per candidate | **0/4** at authoring (2026-08-03); leg 4 flipped to a receipt by I-28 (R.2 gate 2 → 1/4 at 2026-08-28) | **c1** installed `7.0.0`, pin `^7.0.0` → **FAIL** (major < 8) · **c2** watercolor subpaths → `./watercolor-dot` **PRESENT** → **FAIL** · **c3** indicator-slot `.d.ts` decls → **0** → **FAIL** · **c4** receipts **EXIST** for both candidates (I-28 = 8.0.0 `v8.0.0`@`17a11bc5`; I-30 = 9.0.0 `v9.0.0`@`d4f7b24f`) → **PASS**. **Census = 1/4 → FAIL branch is the live branch.** §ADDENDUM datum, per candidate: **8.0.0 registry-resolvable** (`npm view @mkbabb/glass-ui@8.0.0 version` → `8.0.0`; `latest` → `8.0.0`) · **9.0.0 TAG-ONLY** (`npm view @mkbabb/glass-ui@9.0.0` → npm error/404; `git -C ../glass-ui tag --list` → both tags present; `v8.0.0`=`17a11bc5`, `v9.0.0`=`d4f7b24f`) | **RED-AS-EXPECTED (1/4)** — and the §0i.2 election (**8.0.0**) is corroborated at the bytes: only 8.0.0 satisfies PIN-LAW's registry half |
| **Gate 1 / G-F** (fold, NEW) | the NO-WAVE-OWNER register | 73 records / 604 occurrences / 0 in X waves | **73** / **604** / **0** — all three reproduce **exactly**, double-run; COHESION §4 holds **14** source rows; the fold's G-F slate holds **14** booked entries (`SLATE ENTRY` → 14) | **RED-AS-EXPECTED (reproduces exactly)** |
| **G-A** (fold, sharpens HG-18) | the FAIL branch enumerated | 62 dispositions / 10 records, none enumerated | `grep -ro 'X[-.]W4\.g' registry/adjudicated/*.md` → **62** across **10** records (double-run identical) — **none enumerated anywhere** | **RED-AS-EXPECTED** |
| **G-D** (fold, sharpens HG-6/7) | three integers | `HYDRATION-LEDGER.md` 286 rows (235/5/46) | **287** `^| ` lines; greps **236 / 6 / 47** = **235 / 5 / 46 + the Totals line each** (self-count law: the Totals line at `:13` reads *"235 original · 51 payload-less (46 report-authored · 5 unwitnessed-direct)"*, agreeing) | **RED-AS-EXPECTED** (the three integers are still absent from the validator and from `COMPLETENESS-LEDGER.md`) |

### The findings this baseline hands the wave (not rulings — findings)

1. **HG-7 is worse than its born-RED, by 86**: `1 uncovered` → **87 uncovered**. The likely mechanism is the very event that discharged HG-10's untracked half — the r2 artefacts entering `git`, moving the validator's roster — but **no cause is asserted here**; X-W0.c measures it. Three diagnose→edit→re-measure iterations on this gate is a **triumvirate trigger** (spec §Triumvirate Dispatch, bullet 2: *"HG-7 baseline still `exit 1` after the `frontend-omissions` band receives a real run record"*).
2. **HG-1's denominator moved −33 and HG-17's grew +22.** Both are the tranche's own authoring traffic. HG-17's growth is entirely in the **read-only class by rule** (X-tranche records) — X-W0.i's live set is still the six law-bearing sites, unchanged.
3. **HG-6's `:171` is now `:196`.** A dated line-number drift in a *generated* ledger, recorded here so no seat cites a stale anchor.
4. **HG-16 is GREEN before its cure** — listed as required by R.2's law. The cure was the authoring of the twelve wave files; nothing is owed but the close-time re-check.
5. **A sequencing defect in §Disjointness, cured by ordering (not by edit).** The spec places **X-W0.c and X-W0.i concurrently in batch 3** and asserts *"No two concurrent units share a `modify` path"*. Measured: they do — **`CONSTELLATION-COMMISSION-2026-08-03.md`** carries c's unqualified `264/264` at `:9` **and** i's routing law at `:76`. The unit plan below **serializes i → c** (groups 3 → 4). No spec byte is edited (E-3); the wave's own stated rule governs the ordering.
6. **HG-4's "in place" versus §File Bounds.** HG-4 requires the losing reading marked *SUPERSEDED in place*, but neither `docs/tranches/V/vnext/PROMPT-RECAP.md` nor `FORMATION-CLEAN-PASSES.json` appears in §File Bounds. X-W0.b writes its dated ruling in **its own** tracked file and, if it judges an in-place mark indispensable, **returns the bounds question as an escalation** rather than writing outside bounds (§5.7).

---

## Unit plan — 10 units, 5 ordered groups, ≤3 concurrent

**Model law**: every seat **Opus** — spec §Agent Units: *"Seats are **Opus** (M-23: implementation seats Opus). No unit here is design content; the twice-authored Fable ∥ Opus → fresh-Fable apotheosis process belongs to X-W10 (CC-098) and is not performed in this wave."*

**Group order** (spec §Worktree Plan batches 1–4, tightened to the ≤3 concurrency cap and to finding 5):

| group | units | why this grouping |
|---|---|---|
| **1** | `X-W0.a` | *"runs alone and first: it is the only unit that changes a path's tracked/untracked state"* |
| **2** | `X-W0.b` · `X-W0.d` · `X-W0.e` | spec batch 2 minus `.h` (concurrency cap 3); disjoint by write path |
| **3** | `X-W0.f` · `X-W0.i` · `X-W0.j` | spec batch 3 minus `.c` (finding 5: i and c share `CONSTELLATION-COMMISSION-2026-08-03.md`); **i before g** as §Disjointness requires; **j's verdict in hand before the sitting** |
| **4** | `X-W0.h` · `X-W0.c` | `.c` **after** `.e` (r2 tracking → generator replay) **and after** `.i`; `.h` is disjoint from both |
| **5** | `X-W0.g` | spec batch 4 — alone and last; consumes j's verdict, i's ledger edit, f's tombstone file |

Batches commit before the next dispatches (§Worktree Plan). Docs-only; no sibling worktree except HG-8's ephemeral one **inside `.c`**, created/read/removed, nothing committed from it.

### Standing law for every unit of this wave

- **Bounds**: write only inside your unit's writable set. `src/` `demo/` `api/` `test/` `e2e/` `.github/` `package.json` `vite.config.ts` `node_modules/` `~/.codex/**` `scripts/**` are **Do-NOT-touch**; `scripts/dev/dev.sh` is **NEVER** touched or staged (§0j.A **DR-24 RETIRED-BY-ASSIGNMENT**, posture PERMANENT for tranche X).
- **Immutable (fold G-H / BoundsDelta 1)**: `docs/tranches/V/megatranche/registry/adjudicated/**` — **read-only, E-3 addenda only**. `git diff --name-only` over this wave's commits intersecting that directory must be **empty**.
- **Immutable**: the 90 adopted copies under `formation/codex-worktree-7e28/**` (only `CENSUS.md` takes `.d`'s block) · the 46 canonical `challenge-*.md` axis files (C-02, receipts literal) · every dated spec and the adjudicated registry (E-3).
- **Owner-gated items are RULED at COHESION §0j** — cite the ruling id, never presume, never re-open. Anything owner-gated that §0j does **not** cover is an **escalation returned**, not a seat decision.
- **Commits**: pathspec only, `--no-verify --quiet`, body where §Commit Plan says "body required", `Claude-Session:` trailer. One commit per meaning; declared families never split.
- **Receipts**: line 1 of any created file = `SERVED MODEL: <model id>`; quote-by-command ⟨cmd⟩ → output; write-then-measure and double-run every published count; self-count law.

### Units

#### X-W0.a — Track-or-Archive Disposition (CC-012 / DR-23)
- **Model**: opus
- **Sections**: `waves/W0.md` §Agent Units "X-W0.a" :144–149 · §Scope 1 :24 · HG-1 :221–225 · HG-2 :226–229 · §Commit Plan row 1 :371 · fold `X-W0-FOLD.md` **G-G** :533–544 · fold §3 BoundsDelta entries **4** and **5** :564–565
- **Writable**: `docs/tranches/X/W0/TRACK-OR-ARCHIVE.md` (create) · the untracked trees named by the open-time census (git-track in place, or move under `docs/tranches/<L>/archive/` and track, or delete)
- **Gates**: HG-1 · HG-2 · G-G
- **Locks**: ONE commit (`docs(x-w0/track-or-archive)`, body required: why, what, per-tree disposition counts). Runs **alone and first**; every other unit reads paths it moves.
- **Brief**: Census ⟨`git ls-files --others --exclude-standard docs/`⟩ → **1825** files in **3** depth-4 trees (`V/apotheosis` 1798 · `W/audit` 16 · `T/audit` 11); re-run at your own clock, the set moves. Rule each tree **TRACK | ARCHIVE | DELETE** with a one-line reason; **`X/keyframes/**` and `X/refinement/**` are TRACK-or-defer, NEVER ARCHIVE** (fold entries 4–5; X·KF is authoring). Add G-G's two extra sections: (b) one row per **cited-but-absent instrument** (`probe-state.mjs`, `probe-deadlock.mjs`, the EY-r3 scratchpad probes, GEN R-5) dispositioned RE-SCRIPT→X-W1 or STRIKE-THE-CITE; (c) the **closure rule for trees created after this commit** (HG-1's zero is unreachable while siblings author). Execute in ONE commit. If the census reaches outside `docs/` (any `src/ demo/ api/ test/ e2e/ scripts/ .github/` path), **STOP — triumvirate trigger**.

#### X-W0.b — The 181-Event Prompt-Recap Canon (CC-013 / DR-30)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.b" :151–156 · §Scope 2 :25 · HG-3 :231–234 · HG-4 :236–239 · HG-5 :241–244 · §Commit Plan row 2 :372
- **Writable**: `docs/tranches/X/W0/PROMPT-RECAP.md` (create)
- **Gates**: HG-3 · HG-4 · HG-5
- **Locks**: commit 2 (`docs(x-w0/prompt-recap)`, body required) — the recap + the supersession ruling land together. Depends on `.a` having tracked the raw-prompts corpus.
- **Brief**: Re-author from `V/apotheosis/pi/formation/session-audit/raw-prompts/` — `INDEX.json` gives **83 + 28 + 70 = 181** (`bbnf-greenfield-coordination` 70/**69 unique**; state both). One row per event, each with a `<archive>:<line>` phrase anchor that resolves. Reconcile the clean-pass contradiction — `V/vnext/PROMPT-RECAP.md:88` *"Whole-formation credit is **0/2**"* vs `FORMATION-CLEAN-PASSES.json` `"status":"clean"` — with a **dated ruling naming which reading is canon**. Restore the twelve dropped owner asks **by name** with anchors; baseline presence measured at open (`internal Browser` 2 · `Aristotelian` 87 · `precepts binding` 4 · `lightningcss` 11 · `sonic-rs` 5 · `ARM-only` 4 · `3x5x3` 4 / `3×5×3` 3) — presence is not restoration. **Bounds**: `V/vnext/**` is **not** in §File Bounds — if HG-4's "SUPERSEDED **in place**" demands writing it, **return the escalation**, do not write.

#### X-W0.c — Completeness Toolchain Admission and the Challenged Denominator (CC-025 + CC-001's gate half)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.c" :158–163 · §Scope 3 :26 · HG-6 :246–249 · HG-7 :251–259 · HG-8 :261–264 · §Format And Lint Cadence :341 · §Commit Plan row 5 :375 · fold **G-D** :504–511 · fold §3 BoundsDelta entry **3** :563
- **Writable**: `docs/tranches/V/megatranche/workflows/validate-completeness.mjs` (modify-carve) · `workflows/hydrate-reports.mjs` (**modify-carve** — fold BoundsDelta 3: the columns must come from the generator) · `registry/COMPLETENESS-LEDGER.md` + `registry/HYDRATION-LEDGER.md` (generated output only, never by hand) · the unqualified-`264/264` **live gate-text** sites: `COMPLETENESS-LEDGER.md:20,22,196` · `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md:68` · `IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md:49`
- **Gates**: HG-6 · HG-7 · HG-8 · G-D
- **Locks**: commit 5 (`chore(megatranche/completeness)`, body required — generated-output commit). **Runs after `.e`** (r2 artefacts tracked → generator replay) **and after `.i`** (shared file, finding 5).
- **Brief**: First **re-measure HG-7** — the baseline is `exit 1 · **87 uncovered**`, not the spec's `1`; diagnose the roster shift **before** touching the band, and state the cause in the commit body. Give `frontend-omissions`/`UNASSIGNED-FRONTEND-OMISSIONS` a **real run record** so the baseline reaches GREEN and all six synthetic violations S1–S6 reject. Make the validator print **three** integers (EXISTS-ORIGINAL **235** · UNWITNESSED-DIRECT **5** · REPORT-AUTHORED **46** = the 218/46-against-264 split) **and name the roster predicate** (G-D: 287 ledger lines vs 264 canonical rows — 22 non-roster rows separate them). Replace unqualified `264/264` at the five live gate-text sites; **dated records** (`…-2026-07-29/31`, `SCOPE.md`, `STATE.md`, `CONSTELLATION-COMMISSION:9`) take a **dated addendum, never a patch** (E-3). Then HG-8: ephemeral `git worktree` of HEAD, `node hydrate-reports.mjs && node validate-completeness.mjs`, `git diff --exit-code` inside it, bank the output, remove the worktree. Three iterations on HG-7 or HG-8 = **triumvirate**.

#### X-W0.d — Worktree-7e28 Corpus Closure (CC-026 / C-11)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.d" :165–170 · §Scope 4 :27 · HG-9 :266–269 · §Commit Plan row 3 :373
- **Writable**: `docs/tranches/V/megatranche/formation/codex-worktree-7e28/CENSUS.md` (modify-carve — append the dated re-verification block only)
- **Gates**: HG-9
- **Locks**: commit 3 (`docs(x-w0/7e28-census)`). The **90 copies are immutable** — read/hash only.
- **Brief**: Re-hash all **90** adopted copies — ⟨`tail -c <original-bytes> <copy> | shasum -a 256`⟩ against `CENSUS.md` §2's recorded original digest, one row each. Confirm **126/126** accounting (90 ADOPT-COPY + 36 LEAVE-IN-PLACE). Confirm the `PRODUCER-ARTIFACT-BOUNDARY-2026-07-29` collision still resolves to **two distinct tracked names** (measured at open: `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` + `formation/codex-worktree-7e28/coordination/…WORKTREE-VARIANT.md`; tree = **91** files, **91** tracked). Confirm `~/.codex/**` unmodified (read/hash only, M-21 §2). Append the block **dated**, beside the existing bytes — never rewrite them. Any digest drift is a **finding stated at the row**, not a re-hash of the ledger.

#### X-W0.e — Axis Re-runs and the Motion Quarantine (CC-027)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.e" :172–177 · §Scope 5 :28 · HG-10 :271–274 · HG-11 :276–280 · §File Bounds :96–98 + :101 · §Commit Plan row 4 :374 · fold **G-C** :494–502 · fold **W0.14** :329 · fold **W0.7/W0.8** :204–240
- **Writable**: `docs/tranches/V/megatranche/audit/components/{ActionFeedback,picker-pointerdebugoverlay,picker-componentsliders-consolerail}/**` (r2 artefacts + `evidence-r2/` probes only) · `audit/codex-provenance/motion-quarantine.md` (**modify-append** — dated addendum). **READ-ONLY**: the 46 canonical `challenge-*.md` axis files.
- **Gates**: HG-10 · HG-11 · G-C
- **Locks**: commit 4 (`docs(x-w0/axes-r2)`). Must land **before `.c`** (c re-runs the generator that re-statuses the ledger rows).
- **Brief**: HG-10's **untracked half is already discharged by event** — measured at open: **0** untracked under `megatranche/`, r2 files tracked (ActionFeedback **6** · pointerdebugoverlay **2** · consolerail **26**). State that with the receipt; the **ledger-status half stays RED** and lands through `.c`'s generator, never by hand (§Disjointness). Then HG-11 + G-C: extend `motion-quarantine.md` (landed `9812f951` — 46 files swept, 34 assertions ruled across 16 files, §7.1–§7.5) **by dated addendum** covering (a) every assertion the sweep did not reach, (b) the coverage **set-difference** against the ledger's 46 REPORT-AUTHORED rows, (c) G-C's classification: each assertion is **CSS-guarded** (clear/quarantine, citing both guards by path:line) **or mechanism-out-of-guard-reach with its witness named** — GEN-29/MQ-1 (scroll-driven timeline, byte-identical under `reduce`), MX-9/10/13/45 (JS-clock), EY-32 (producer-internal transition). A CLEARED verdict spelled with two true citations over a `requestAnimationFrame`/`animation-timeline` assertion is a **false clear** — G-C exists to make it unspellable. Measured at open: literal `QUARANTINED-PENDING-TWO-GUARD-CHECK` → **0** in the record; reconcile the marker spelling explicitly. **Never write a canonical axis file** (C-02) — that is not a pass.

#### X-W0.f — The Tombstone Set (CC-015..CC-018, CC-022)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.f" :179–184 · §Scope 6 :29 · HG-12 :282–298 · §Commit Plan row 6 :376
- **Writable**: `docs/tranches/X/W0/TOMBSTONES.md` (create)
- **Gates**: HG-12 (the five executable rows)
- **Locks**: commit 6 (`docs(x-w0/tombstones)`). `.g` **appends** the four ruled tombstones (CC-019/020/021/023) to this same file later — leave the file's structure open for a dated addendum and **do not** pre-write those four.
- **Brief**: Five tombstones — **CC-015** (DR-02 blob extirpation, *inverted*), **CC-016** (DR-14 `siblingFsAllowTransient`), **CC-017** (DR-15 precepts submodule drift), **CC-018** (DR-16 HG6 taste certification), **CC-022** (DR-25 PRM-expand at kf 6). Each: the original mandate **quoted verbatim**, the probe **pasted with its output**, the terminal disposition named. Probes re-run at open and reproducing: `grep -rn "glass-ui/blob" demo/` → **5** (3 files) · `vite.config.ts:139,287` + glass **7.0.0** · `63240e67…` vs kf `8ccf9f4d…` · `> _(empty — the owner's verdict lands here)_` · kf **6.0.0**. Re-run them at your own clock and paste what you get. **CC-016's ruling is §0j.A: DR-14 = DELETE, routed to X-W1's config carve** — the tombstone says so and cites the id; it does **not** perform the delete (`vite.config.ts` is Do-NOT-touch here). **CC-018's ruling is §0j.A: RETIRE (option a), no fresh bracket set at X-W10.** A tombstone whose pasted probe does not reproduce at close fails the gate.

#### X-W0.g — The Owner Sitting Packet (CC-014 / DR-29 + CC-019/020/021/023)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.g" :186–191 · §Scope 7 :30 · HG-13 :300–303 · §Commit Plan row 10 :380 · fold **G-B** :486–492 · fold **W0.27** :958–988 · fold §6.7 entry **10** :1080 · **COHESION §0j.A** :502–512 · **§0j.B** :514–539 · §0j.C (OP-1) :541–545
- **Writable**: `docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md` (create — dated **at wave-open**, per §Agent Units) · `docs/tranches/X/W0/TOMBSTONES.md` (append the four ruled tombstones, dated, beside `.f`'s five) · `registry/CARRY-CUT-LEDGER.md` (the **disposition cells of the seven owner rows only** — §Disjointness gives i the §0 alias line + CC-011's row) · `docs/tranches/X/refinement/X-W0-FOLD.md` (**a dated §9 addendum in §8's idiom only** — authorized expressly by **COHESION §0j.B**: *"X-W0.g writes the five rows at `X-W0-FOLD.md`'s §8 idiom"*; never a rewrite of §4's or §8's bytes)
- **Gates**: HG-13 · G-B · (verify-only) HG-16
- **Locks**: commit 10 (`docs(x-w0/owner-sitting)`, body required) — **the seven rulings + the four ruled tombstones + the CC disposition-column updates do not split**. Runs **last, alone**, after `.i` (shared `CARRY-CUT-LEDGER.md`), after `.j` (the verdict is reported at the sitting, not discovered after it), after `.f` (the tombstone file exists).
- **Brief**: Transcribe, date and cite — **never re-open** — the rulings already made. **§0j.A, the seven, verbatim with their rationale**: DR-19 **RETIRE** + the grep-checkable structural ban in canon (no `scripts/**/proof-*.mjs`; measured 69 vnext sites / 0 in the library band) · DR-20 **RETIRE** (`Color.try` → 0) · DR-24 **RETIRED-BY-ASSIGNMENT**, NEVER-touch made PERMANENT for X · DR-31 **ACCEPT the permanent 301** (measured `301 → https://color.babb.dev/`) · DR-14 **DELETE**, routed to X-W1's config carve · DR-16 **RETIRE** (option a) · U-F12 **POLE B**. Then **§0j.B**, written at the fold's §8 idiom as a dated addendum: the **five FB packet rows** (PRE-X MT-REGISTER · BOUNDARY-SCOPE AB-4/AB-5 · AUTH-SESSION AF-50 = BOOK TERMINAL; **MIGRATE-DIALOG IDENTITY-FLOW = DECLINE-WITH-REASON** behind the OWNER-DECISION gate; W-HYGIENE's limb = BOOK TERMINAL, **explicitly NOT ADOPTED**), **GF-R1 = slate entry 15** (all seven ⟨record · id⟩ id-for-id — AP-12/17/24/29/30/31/33 — claimant **X-W3**, `×5`→`×7` corrected **in the addendum, never in COHESION §4's bytes**), **GF-R3 = RATIFY §1** (the fold + canonical layers ARE the register of record; zero file motion — so BoundsDelta 2/9's candidate A/B question is **moot and says so**), and **R-2's two `≡`-pointer lines** (⟨AdminFlaggedPanel · AF-12⟩ ≡ AdminListItem D-5; ⟨ColorNutritionLabel · R6⟩). Each verdict token is **LANDED-AS-RULED or RETIRED** — "banked"/"pending"/"carried" is not a verdict. **G-B/W0.27 arithmetic**: the docket is **nine owner rows + eight escalations + one OWNER-DECISION = eighteen**. §0j rules seven of the nine, plus OP-1 at §0j.C and the OWNER-DECISION at §0j.B(4). **DR-21 (X-W9's CC-088 ninth carry), CC-104, and the eight escalations S-1..S-8 (bindPane · GAB-5/K-8 · `src/color/model.ts` · `UserSortMenu.vue:8` · `PaletteCard.vue` verb · AdminGate seam · `ErrorBoundary.vue` path · MT-CSP-1) are NOT ruled at §0j** — docket them by name with their far-end byte and **return them as an ESCALATION**; do not presume a verdict. Sitting non-occurrence is a **triumvirate trigger**, never a re-naming (FM-21). `scripts/dev/dev.sh` is recorded by ruling id and **never staged**.

#### X-W0.h — Typed Graph Authority and the Frontend Denominator (CC-001 graph half + CC-024)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.h" :193–199 · §Scope 8 :31 · HG-14 :305–308 · HG-15 :310–313 · §Format And Lint Cadence :342 · §Commit Plan row 7 :377 · fold **G-E** :513–520 · fold §3 BoundsDelta entry **7** :567
- **Writable**: `docs/tranches/V/megatranche/workflows/graph-v3.mjs` (create) · `docs/tranches/X/W0/GRAPH-V3/**` (create) · `docs/tranches/X/W0/FRONTEND-DENOMINATOR.md` (create)
- **Gates**: HG-14 · HG-15 · G-E
- **Locks**: commit 7 (`feat(megatranche/graph-v3)`, body required: mechanism, X-W8 consumer, round-trip evidence)
- **Brief**: Emit graph v3 with **typed multi-domain edges** (resolver alias, CSS, render/DI/route/state/API, worker/asset, package/build/test boundary) and SCCs classified **runtime / load / ownership separately** (L-17). `node graph-v3.mjs --verify` must **round-trip**: a second run reproduces identical node/edge/SCC digests (non-determinism is a tool defect, **triumvirate**, not an edit). Name the four frontend SCCs (Admin/provider, Markdown, Gradient, Dock) **with an owner each** — and per **G-E**, name **every** SCC found with an owner or a written reason for having none, including the two adjudicated cycles outside the four: **CPE L-24** (palettes ↔ shell, lattice-not-load-time) and **AuroraPane AP-19** (aurora ↔ boot, bidirectional, NO-WAVE-OWNER); type the **alias-barrel class** (19 barrels / 90+ edges). Land `FRONTEND-DENOMINATOR.md` re-verified at wave HEAD: **88 SFC** (measured at open: **88**, double-run) · 310 members · 14 routes + wildcard · 13 `:is` · 2 Teleports · 2 harnesses · **per-file SHAs**. **This is X-W8's input, not a proof farm** (L-19) — X-W8 binds CC-078's bounds and CC-079's four SCC owners from it and cannot open without it.

#### X-W0.i — The V·L5 Routing-Law Retirement (CC-011 / C-13)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.i" :201–206 · §Scope 9 :32 · HG-17 :320–323 · §File Bounds :87–94 · §Format And Lint Cadence :343 · §Commit Plan row 8 :378
- **Writable**: `docs/tranches/X/W0/ROUTING-LAW-V-L5.md` (create — the path X-W11 G1 emits) · the **six law-bearing sites only**: `megatranche/PARSER-RESURRECTION-HANDOFF-2026-07-31.md` (`:64`) · `megatranche/CONSTELLATION-COMMISSION-2026-08-03.md` (`:76`) · `megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` (`:35`) · `coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md` + `.json` (the `V.L5` DAG edges) · `workflows/validate-constellation-dag.mjs` (the **8** `V.L5` node identifiers only) · `registry/CARRY-CUT-LEDGER.md` (§0 period-form **alias line** + CC-011's row)
- **Gates**: HG-17
- **Locks**: commit 8 (`docs(x-w0/routing-law)`, body required: the live set, and why the frozen corpus is untouched) — **the rewritten laws + the DAG node ids + the §0 alias + the tombstone are ONE commit**. Must land **before `.g`** (shared `CARRY-CUT-LEDGER.md`) and **before `.c`** (shared `CONSTELLATION-COMMISSION-2026-08-03.md`).
- **Brief**: Enumerate at open ⟨`git ls-files docs/ | xargs grep -ln 'V·L5\|V\.L5'`⟩ — measured **57** tracked files (the spec's born-RED said 35; the growth is X-tranche records, **read-only by rule** — state the delta, do not chase it). The **write set is exactly the six law-bearing sites**; everything else is read-only **by class**: frozen 7e28 copies (editing one breaks HG-9's digest re-hash — this is why they are excluded by rule), the two `codex-provenance` records that quote the defect **as its own proof**, the dated 07-29 restatement/evidence records and harvest/reconciliation JSON (epoch rule), and this tranche's own records. Rewrite each law against **`V·L1..V·L4` plus one explicitly defined new cut — X-W9 (parser and library apotheosis) → X-W11 (release/rebind)**. Normalize survivors to the **middot** form and register the **period form as a search alias** in `CARRY-CUT-LEDGER.md` §0 (L-5: an alias is a search key, **never a rename** — CC-011 and V·L1..V·L4 keep their ids). Write the tombstone: the minted law quoted verbatim, the **no-definition probe pasted** (⟨`grep -c 'V·L5\|V\.L5' registry/adjudicated/layout-gestalt.md`⟩ → 0, against `STATE.md:88`'s *"four born-RED waves V·L1..V·L4"*), the terminal disposition named. Then ⟨`node workflows/validate-constellation-dag.mjs`⟩ must run with **zero** `V.L5` node identifiers and still be runnable (§Format And Lint Cadence).

#### X-W0.j — The Glass-8 Repin Census Event (CC-003's trigger · CC-109 · CC-116 · CC-117)
- **Model**: opus
- **Sections**: §Agent Units "X-W0.j" :208–213 · §Scope 10 :33 · §Blocked rows :55 · HG-18 :325–332 · **§ADDENDUM 2026-08-30** :413–489 · §Commit Plan row 9 :379 · fold **G-A** :477–484 · fold **W0.3/W0.4/W0.18/W0.19** · **COHESION §0i.2** :398–412 + **§0i.5** :443–461 · runbook §3.2
- **Writable**: `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md` (create) **only**. Read-only: `package.json`, `node_modules/@mkbabb/glass-ui/**` (read/hash only), `../glass-ui` (READ-ONLY always).
- **Gates**: HG-18 · G-A
- **Locks**: commit 9 (`docs(x-w0/glass8-census)`, body required). Must land **before `.g`**. **Performing any part of the cut here — a `watercolor-dot` deletion, a shim, a copied selector — invalidates the wave** (§Triumvirate Dispatch, bullet 5).
- **Brief**: Run CC-003's four conditions **read-only against installed bytes**, recording each measured value beside its PASS/FAIL, **per candidate**, and name the **elected target**. Measured at open (re-measure at your clock; MEASURE-AT-OPEN **and again at close**, never inherited): c1 installed **7.0.0**, pin `^7.0.0` → FAIL · c2 `./watercolor-dot` **PRESENT** → FAIL · c3 indicator-slot `.d.ts` decls **0** → FAIL · c4 receipts **EXIST** both candidates → PASS. **Census 1/4 → FAIL.** Per the §ADDENDUM, record the registry/tag datum beside the four (**not** a fifth condition, **does not gate**): 8.0.0 `npm view` → **8.0.0** (registry-resolvable, `latest`) · 9.0.0 `npm view` → **404/error**, `git -C ../glass-ui tag --list` → `v9.0.0` present (**TAG-ONLY**); `v8.0.0`=`17a11bc5`, `v9.0.0`=`d4f7b24f`. **The elected target is RULED: 8.0.0, registry-pinned (`v8.0.0` @ `17a11bc5`) — COHESION §0i.2**, with §0i.5's erratum to receipt (3) carried; cite the ruling, do not re-elect. Condition 4 is **target-relative** (§ADDENDUM 3): 8.0.0's receipt is the required datum, and an 8.0.0 receipt never discharges a 9.0.0 election. On this FAIL: **the bank stays shut, X-W4.g stays CLOSED**, and per **G-A** the census must **enumerate the FAIL branch by row id** — all **62** `X-W4.g` dispositions across **10** records (measured at open; ⟨`grep -ro 'X[-.]W4\.g' registry/adjudicated/*.md`⟩), each with its FAIL home, so the set-difference names any dropped id. Discharge **CC-109 + CC-116 by the verdict itself** (ledger §1.M: the census *is* their value action) and state **CC-117's terminal word once**: evidence-only, **FOLD → INBOX row I-24**, no value act, no X wave row — X-W11 G1's 117-row walk reads it from that line. A FAIL is a **complete, dated result**, not a deferral.

---

## Unit receipts

_(appended by each unit's seat, in group order; one block per unit: gates turned, commands with output, commit hash)_

---

### X-W0.a — Track-or-Archive Disposition (CC-012 / DR-23) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 1, alone and first · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.a" `:144–149` · §Scope 1 `:24` · HG-1 `:221–225` · HG-2 `:226–229` · §Commit Plan row 1 `:371` · fold `X-W0-FOLD.md` **G-G** `:533–544` · §3 BoundsDelta **4** `:564` / **5** `:565`
**Artefact**: `docs/tranches/X/W0/TRACK-OR-ARCHIVE.md` (created)
**Commit**: **`befbc05a`** — `docs(x-w0/track-or-archive): every untracked tree under docs/ dispositioned — 3 TRACK, 0 ARCHIVE, 0 DELETE` · ONE commit, as locked · 1826 files changed, 652,397 insertions

#### Acts, in order

**A1 · Census, frozen.** HEAD at freeze `fa9597cd` ⟨`git log --oneline -1`⟩. ⟨`git ls-files --others --exclude-standard docs/ | wc -l`⟩ → **1825** (double-run **1825**); ⟨`… | cut -d/ -f1-4 | sort -u`⟩ → **3** trees (double-run **3**) — `T/audit` · `V/apotheosis` · `W/audit`. Frozen to a scratchpad listing **before any staging**, and it reproduces seat 0's open measurement exactly.

> **The census moved under the hand that took it.** This seat's *first* pass minutes earlier returned **1828 / 5 trees**; the extra two — `X/keyframes` (1 file) and `X/parse-that` (2) — were tracked by **their own seats** before the freeze: ⟨`git log --oneline -1 -- docs/tranches/X/keyframes/artefacts/W0/substrate-open.txt`⟩ → `e898b65e`; ⟨`… -- docs/tranches/X/parse-that/evidence/W0/`⟩ → `b69611a8`. No act of this unit touched them. Recorded at §2.3 of the ledger, and they are the measured precedent for the closure rule.

**A2 · Bounds check (spec §Triumvirate Dispatch bullet 1).** The census reaches **nothing** outside `docs/` — no `src/ demo/ api/ test/ e2e/ scripts/ .github/` path enters the set. **No trigger fired.** Verified again on the landed commit: ⟨`git diff-tree --no-commit-id --name-only -r befbc05a | grep -vc '^docs/'`⟩ → **0**.

**A3 · Dispositions ruled — TRACK 3 · ARCHIVE 0 · DELETE 0**, one row per censused tree (HG-2's set, exact):

| row | tree | files | bytes | disposition | ground |
|---|---|---:|---:|---|---|
| D-1 | `docs/tranches/T/audit` | 11 | 44,669 | **TRACK** in place | u-gestalt probes + logs cited from ten tracked files (`T/audit/pi/w9/q14-close-escalation.md`, `U/FINAL.md`, `U/audit/w-visual/lane-a.md`, …) |
| D-2 | `docs/tranches/V/apotheosis` | 1,798 | 305,427,148 | **TRACK** in place | the authority layer (`OWNER-RULINGS-2026-07-20.md`, `OWNER-RULING-D23`, `parser-proof/`) **and** the 181-prompt corpus **HG-3 `:232` pins by literal path** and **X-W0.b `:153` re-authors from** — so ARCHIVE (a move) is structurally barred |
| D-3 | `docs/tranches/W/audit` | 16 | 696,656 | **TRACK** in place | the A→W tranche-history audit cited from `AUDIT-PLAN.md`, `STATE.md`, `excavation/TRUTH-TABLE.md` and seven more |

**ARCHIVE 0** because ARCHIVE is *move-and-track* (`:147`) and every path is cited from tracked canon **at its present path** — a move manufactures exactly the dangling-reference disease G-G(b) exists to register. **DELETE 0** because E-3 binds this seat (prior evidence IMMUTABLE) and the one deletion tracked canon itself proposes is gated on an **unruled** owner question (R-2 below).

**A4 · G-G(b) — five dangling receipts, all RE-SCRIPT, none STRIKE-THE-CITE.** ⟨`find docs -type f -name 'probe-state.mjs' -o -type f -name 'probe-deadlock.mjs' -o -type f -name 'probe-isolate.mjs' | wc -l`⟩ → **0**.
- **DR-1/2/3** `probe-state.mjs` · `probe-deadlock.mjs` · `probe-isolate.mjs` → **X-W1**. They underwrite `registry/adjudicated/EmptyState.md:21`, where **C-1 is OVERRULED → CONFIRMED (BLOCKER)**; that record's own residue **U-3 `:117`** already names the disposition (*"Re-script and re-run at the next live session"*) and its adjudicator explicitly refused the downgrade (*"the un-banked probe script is a re-run residue (U-3), not a verdict downgrade"*). U-3's parenthesis re-measured: ⟨`ls …/EmptyState/probes/ | grep -cv '\.png$'`⟩ → **0** of **29**.
- **DR-4** the EY-r3 `probe9` scripts → **X-W1**. `registry/adjudicated/wb-extract-imageeyedropper.md:150` — *"whose probe scripts live in a session scratchpad, not the tree"*; ⟨`ls …/wb-extract-imageeyedropper/probe/*.mjs`⟩ → `pixels probe probe2..probe6` — **no `probe9`**. Folded as `XP-7 ≡ XW-18 ≡ EY-46` at `X-W1-FOLD.md:379`.
- **DR-5** GEN **R-5** → **split at its source**, transcribed not invented: `registry/adjudicated/wb-generate-pane.md:53` — *"→ CI: **X-W1** (CC-031); oracle repair + any unit coverage: **GEN-CLUSTER, NO-WAVE-OWNER**"*. CI half to X-W1; the oracle-repair half is the G-F register's, not this unit's to home.
- Receiving seat named once: **X.W1.a**, `scripts/ci/oracle-slate.mjs` (`W1.md:159,178,218`), CC-031, gated by G-5 (`:305`).

**A5 · G-G(c) — the closure rule, CR-1..CR-6.** CR-1 this unit's set is frozen; CR-2 **the authoring seat closes its own tree, in place, in its own commit** (precedent `e898b65e` · `b69611a8`); CR-3 never ARCHIVE a live sub-session tree (BoundsDelta 4/5, extended to `X/parse-that/**`, `X/fourier/**`, `X/execution/**`); **CR-4 HG-1's zero is read as a set-difference against CR-2, never as an absolute** — the falsifier survives intact, since an untracked tree *with no owning seat* is in the difference and prints itself; CR-5 X-W11 enforces; CR-6 the `.gitignore` shadow is measured and untouched.

**A6 · Landing.** Staged by exact pathspec, four arguments only. ⟨`git diff --cached --name-only | wc -l`⟩ → **1826** = 1825 census + the ledger. ⟨`… | grep -vc '^docs/'`⟩ → **0** · ⟨`… | grep -c 'registry/adjudicated/'`⟩ → **0** (fold **G-H**) · ⟨`… | grep -c 'dev.sh'`⟩ → **0**. ⟨`git diff --check`⟩ clean. One commit, body carrying why / what / per-tree disposition counts as §Commit Plan row 1 requires.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (13:05:17 EDT, HEAD `fa9597cd`) | AFTER (post-commit, `befbc05a`) | verdict |
|---|---|---|---|
| **HG-1** — zero untracked bytes under `docs/` | **1825** files / 3 trees | **0** over the frozen census set ⟨`comm -12 <(live) <(frozen)`⟩ → **0**, double-run **0**; and all 1825 paths verify tracked ⟨`xargs git ls-files --error-unmatch \| wc -l`⟩ → **1825** | **GREEN as CR-4 reads it** |
| **HG-2** — one disposition per censused tree | file **ABSENT** (`docs/tranches/X/W0/` did not exist) | **3 rows / 3 trees, set-equal**, each with a reason ⟨`grep -c '^| \*\*D-[123]\*\*'`⟩ → **3** | **GREEN** |
| **G-G** — (a) tree rows + (b) dangling-receipt rows + (c) post-commit closure rule | all three **ABSENT** | (a) §2 · (b) §3, five rows · (c) §4, CR-1..CR-6 | **GREEN** |

**The live absolute is non-zero and moving, by design.** ⟨`git ls-files --others --exclude-standard docs/`⟩ post-commit → `X/keyframes/artefacts/W0/headerribbon-tripwire.txt` · `manifest-four-coordinates.txt` — both written **after** the freeze by the open **X·KF (Track B)** seat, which has already shown it closes its own trees (`e898b65e`). It read **1** at 13:12:05 and **2** seconds later, while this record was being written: a count of it is false the instant it is written down, which is why the gate reading is the set-difference and the residual is stated as **one named tree with one named open owner**. This is **G-G's own prediction measured live** — *"a zero asserted at close is unreachable while X·KF/X·F author, so the rule must be written, not discovered"* — within seven minutes of this unit's census.

#### Residuals

- **R-1 — the `.gitignore` shadow (out of bounds, reported not touched).** ⟨`git ls-files --others --ignored --exclude-standard docs/ | wc -l`⟩ → **8800**: **6384** `.png` (repo-root `.gitignore:34 *.png`, `:35 !demo/**/*.png`), **2385** under `node_modules/`/`.dts/` (the two nested ignore files in `apotheosis/pi/mirror/`, correctly excluding a vendored tree), **31** logs / `.DS_Store` / vendored `dist/`. The PNG class is load-bearing — `adjudicated/EmptyState.md:117` cites `probes/` as holding *"only PNGs"*, and git sees none of them. `.gitignore` is at the repo root, **outside `docs/` and outside this unit's writable set**; measured, reported, untouched. Routed to the L-18 passes or X-W11.
- **Measured cost of TRACK, against the intuition.** ⟨`git count-objects -vH`⟩ before staging → `count 9103 · size 202.32 MiB · in-pack 25736 · size-pack 190.90 MiB`; after staging all 1826 paths → `count 9111 · size 202.36 MiB · in-pack 25736 · size-pack 190.90 MiB` — **+8 loose objects, +0.04 MiB, zero pack growth**. The bytes were already in the object store: the 69,590,643-byte `occurrence-owner-formation-v3.json` stages as blob `d69892c8…`, which `git cat-file -t` resolves while `.git/objects/d6/9892c8…` does not exist (**packed**), and ⟨`git log --all --oneline -1 -- …/OWNER-RULINGS-2026-07-20.md`⟩ → *empty*. **This commit did not add 292 MB; it made bytes the repository already carried permanently reachable.**

#### Escalation returned — **R-2 · X-6, the 255 MB rejected denominator**

**Not a blocker on this unit; a question this unit's TRACK does not settle and must not be read as settling.**

Tracked canon carries the dispute in full at `registry/harvest/v-pi-receiving-audit.json:2371–2374` — topic *"X-6 — retain or delete the 255 MB rejected denominator"*; **positionA** *"FINDINGS G05's append-only law: retain. A failed attempt may never be erased."*; **positionB** retain the eight `*-rejection.json` receipts and the tools (~30 KB) and delete the payloads and shards, *"~255,457,954 bytes recovered with zero loss of dispositioned truth, since all eight generations carry ZERO_CREDIT and v2/v3 are byte-equal across the 69.5 MB payload for a 1,194-byte header delta"*; **whatWouldSettleIt** *"An owner or ADDENDA-09 ruling … but **the append-only law is the owner's to relax, not mine.**"* Scheduling row **P3.1** at `:2395` is stamped **"[Gated on X-6]"**; the credit finding at `:2147` is *"Rejection upheld … all `*_ZERO_CREDIT`."*

**Re-measured independently here, to the byte and to the file**: `pi/denominator/` = **157 files / 255,457,954 B** = **83.4% of the entire census**, agreeing exactly with `:2644`. Largest members `occurrence-owner-formation-v3.json` **69,590,643 B** and `-v2.json` **69,589,449 B** — `:2642`'s byte-near-identical twins.

**Why TRACK and not DELETE, reviewably**: (1) ⟨`git grep -c '255,457,954\|255457954' -- docs/`⟩ → the figure occurs in **one** file; **COHESION §0j does not rule it**, and the wave's standing law is explicit — *anything owner-gated that §0j does not cover is an escalation returned, not a seat decision*; (2) **E-3** binds this seat and positionA *is* E-3 under another name; (3) the proposing auditor declined the identical act for the identical reason; (4) DELETE is irreversible, TRACK is not.

**The word wanted, in one sentence**: *retain (positionA — the branch landed here) or delete-the-payloads-keep-the-receipts (positionB / P3.1)*. On a positionB ruling the act is one pathspec over `…/apotheosis/pi/denominator/occurrence-owner-formation-v*.json` + `…-v*.shards`, retaining every `*-rejection.json` receipt and the tools. **Returned to X-W0.g's sitting packet as a docketed row** — it is **not** one of §0j.A's seven and must not be presumed into them — or to the owner directly. **No act taken.**

---

### X-W0.d — Worktree-7e28 Corpus Closure (CC-026 / C-11) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 2 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.d" `:165–170` · §Scope 4 `:27` · HG-9 `:266–269` · §Commit Plan row 3 `:373` · §File Bounds Do-NOT-touch `:101` (the 90 copies immutable)
**Rulings consumed**: COHESION `§0j` preamble (the begin-word) — no §0j row gates this unit; nothing owner-held arose.
**Artefact**: `docs/tranches/V/megatranche/formation/codex-worktree-7e28/CENSUS.md` **§7** (appended; §1–§6 untouched)
**Commit**: **`9f4b22a7`** — `docs(x-w0/7e28-census): HG-9 re-verified GREEN — 126/126 accounted, 90/90 copies byte-exact, collision holds, ~/.codex untouched` · ONE commit, as locked · **1 file changed, 281 insertions(+), 0 deletions(-)**

#### Acts, in order

**D1 · Open, frozen.** HEAD at measurement open **`c0d70599`** ⟨`git log --oneline -1`⟩. Tree state ⟨`find …/codex-worktree-7e28 -type f | wc -l`⟩ → **91** · ⟨`git ls-files … | wc -l`⟩ → **91** · ⟨`git ls-files --others --exclude-standard … | wc -l`⟩ → **0** · ⟨`git status --porcelain -- … | wc -l`⟩ → **0**, worktree and index both CLEAN. Seat 0's open measurement (**91 files, 91 tracked**) reproduces exactly.

**D2 · The 126 accounted, re-derived from §2 — not read off §1.** ⟨`awk -F'|' 'NF>=7 && $6 ~ /ADOPT-COPY|LEAVE-IN-PLACE/' CENSUS.md`⟩ → **126** rows (double-run **126**, ⟨`cmp -s`⟩ identical); ⟨`cut -f1 | sort | uniq -c`⟩ → **89** `ADOPT-COPY` + **1** `ADOPT-COPY-AS-VARIANT` + **36** `LEAVE-IN-PLACE` = **90 + 36**. The gate's accounting is confirmed by independent re-derivation rather than by quoting the census's own §1 headline.

**D3 · The 90 re-hashed — HG-9's central act, one row each.** ⟨`tail -c <original-bytes> <copy> | shasum -a 256`⟩ against §2's recorded original digest, for all 90 (the collision row resolved to its `.WORKTREE-VARIANT.md` copy path): **90 MATCH · 0 DRIFT**, double-run identical. **No row required a finding.** §1's claim *"90/90 payload tails re-hash to the original sha256 (byte-exact)"* reproduces forty-five days after it was written.

**D4 · Two further axes the gate does not require, run because a single axis cannot catch a header edit.**
- **§3 whole-copy digests**: ⟨`shasum -a 256 <copy>`⟩ vs §3 → **90 MATCH / 0 DRIFT** (double-run identical). A payload-preserving edit *to the provenance header* would pass D3 and fail here.
- **Three-way set equality**: the §2-derived copy-path set, §3's listed set, and the on-disk set minus `CENSUS.md` are the same **90** paths — ⟨`diff`⟩ → **0** lines on both comparisons. No copy exists that the census does not name; no census row names a copy that is gone.
- **Provenance-header integrity**: `header_length = copy_bytes − original_bytes`, then reading only those bytes — **90/90** headers name the `~/.codex/worktrees/7e28` origin path, the original sha256 and the original byte-count. Two greps returned >1 line and **both belong solely to the collision variant**, whose header restates `5661` / `1450204640b3…` / `3463` inside its own COLLISION RULING prose. Stated rather than left as an unexplained outlier.

**D5 · The collision — two distinct tracked names, still.** ⟨`git ls-files 'docs/**/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29*'`⟩ → exactly **2** paths, ⟨`git ls-files --error-unmatch`⟩ succeeds on both:

| role | path | bytes | sha256 |
|---|---|---:|---|
| repo of record (**governs**) | `megatranche/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` | **5661** | `1450204640b3…` |
| derivative variant (copy) | `…/codex-worktree-7e28/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md` | **5694** | `b56b064e…` |
| the variant's payload | ⟨`tail -c 3463`⟩ | **3463** | `91b9a0ce…` |

All three equal §4's record. Titles differ (*"Producer artifact boundary — Glass, Value, and Keyframes"* vs *"Producer Artifact Boundary — Value Receiver"*) and — the load-bearing part — **the basenames differ**, not merely the directories, so the disambiguation survives any future flattening. §4's ruling is not re-opened.

**D6 · `~/.codex/**` unmodified (M-21 §2, read/hash only).** The strongest read-only evidence available is the corpus itself: **all 126 originals still carry their recorded sha256 *and* their recorded byte-count in place** — ⟨`shasum -a 256`⟩ + ⟨`wc -c`⟩ → **126 MATCH / 0 DRIFT**, double-run identical. Beside that: ⟨`find /Users/mkbabb/.codex/worktrees/7e28/value.js -type f | wc -l`⟩ → **3967** (double-run **3967**), exactly the spec's `:268` figure; the worktree's `HEAD` **file** reads `e01d0065fa6c7c80282280566af2b9a4add809bf`, its `.git` reads `gitdir: /Users/mkbabb/Programming/value.js/.git/worktrees/value.js`, and ⟨`git merge-base --is-ancestor e01d0065 tranche-u`⟩ exits **0** — §Subject's *"detached HEAD `e01d0065`, reachable from `tranche-u`"* holds. HEAD was read from the file rather than by a command that could refresh an index; no write, no `git` mutation, no mtime touch in either tree.

**D7 · The unit's Goal, measured rather than assumed** (`:168` — *"the 07-31 'Exact Value authority' pins resolve from the repo of record, permanently"*). All **six** §5 pins named in `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md` §4 still resolve inside the repo of record and each resolving copy re-hashes **MATCH**: `717bf1e3…` · `244c448a…` · `713ae753…` · `973799e4…` · `29303183…` · `0cc04422…`. **K-14 stays cured** — 6/6 from `formation/codex-worktree-7e28/`, 0/6 from `~/.codex/`. **K-13's standing exception stands unchanged and unre-opened**: `VALUE-FORMATION-PACKET-2026-07-29.md` still carries `d07b6ddc…` at 63,572 bytes, adopted AS-FOUND, sole extant version — its stability across 45 days is not evidence the seal digests were right, only that the as-found bytes have not moved again.

**D8 · Landing, append-only by measurement.** `CENSUS.md` pre-append: **59,093** B, sha256 `afd6ed06aeb14dd2ca2fb02602b5cb1d3c93ef34e15c84e387878c39bce3ddfc`. Post-append: **92,254** B, and ⟨`head -c 59093 CENSUS.md | shasum -a 256`⟩ → **`afd6ed06…`, identical** — the prior bytes are preserved byte-for-byte, so E-3's addendum-beside is proved, not asserted. Git agrees independently: ⟨`git diff --numstat`⟩ → **281 0**, ⟨`git diff | grep -c '^-[^-]'`⟩ → **0 deleted lines**. ⟨`git diff --check`⟩ clean. Staged by exact pathspec, one argument; the landed commit carries **1** file ⟨`git diff-tree --no-commit-id --name-only -r 9f4b22a7`⟩, **0** non-`docs/`, **0** `registry/adjudicated/` (fold **G-H**), **0** `dev.sh`.

**SELF-COUNT, read back from the settled bytes**: §7.3 → **90** numbered rows, **90** reading `MATCH | MATCH`; §7.4 → **36** numbered rows, **36** reading `MATCH`; row-level `| DRIFT` verdicts anywhere in §7 → **0** (the 7 textual `DRIFT` hits are all the string *"0 DRIFT"* or *"no copy drifts"*); `SERVED MODEL: claude-opus-5[1m]` → **1**. The block is not prefixed to line 1 of `CENSUS.md` — that would rewrite the file's existing first byte (E-3); the served-model receipt is carried inside the appended section.

#### Gate reading — BEFORE → AFTER

| gate | BEFORE (open, HEAD `c0d70599`) | AFTER (post-commit `9f4b22a7`) | verdict |
|---|---|---|---|
| **HG-9** — the 7e28 corpus is closed and byte-exact | seat 0 recorded **GREEN-AS-DECLARED** on the two limbs it could take read-only (91 files / 91 tracked; both collision names present) and left the gate's **central limb — the 90 digest re-hashes — UNRUN**, deliberately: *"the 90 digest re-hashes are X-W0.d's act"* | **all four limbs measured**: 126/126 accounted (90 + 36, each with its own row) · **90/90** tail digests MATCH, 0 DRIFT (and 90/90 on the §3 axis) · collision = **2** distinct tracked names, three digests reproducing · `~/.codex/**` unmodified (126/126 originals, 3,967 files, `e01d0065`). Re-measured **after** the commit at the landed bytes: tree **91/91/0-dirty**, re-hash **90 checked / 0 drift** | **GREEN** |

*The gate's own falsifier (`:269` — "any copy whose `tail -c <original-bytes>` digest drifts from `CENSUS.md` §2") was executed as the gate, not paraphrased: 90 separate `tail -c | shasum -a 256` invocations, each compared to its own recorded digest, twice.*

#### Residuals

- **R-1 — the freeze this gate makes checkable.** The 90 copies are frozen *by rule* (`waves/W0.md:101`; HG-17 excludes them from X-W0.i's `V·L5` live set precisely because an edit inside one would break this digest re-hash). Re-measured at this run: ⟨`git ls-files <7e28> | grep -v CENSUS.md | xargs grep -l 'V·L5\|V\.L5' | wc -l`⟩ → **19** (double-run **19**) — the frozen copies carrying the token, all correctly untouched. This unit's 90 digests are the instrument that would name any seat that edits one; X-W0.i and X-W11 can rely on it.
- **R-2 — concurrency, recorded not disputed.** Two Track-B commits (`30110269`, `4ffa4f59`) landed during this run, moving repo HEAD off `c0d70599`. ⟨`git diff-tree --no-commit-id --name-only -r <h> | grep -c 'codex-worktree-7e28'`⟩ → **0** and **0**; the tree re-measured 91/91/clean afterwards and the post-commit re-hash returned 90/0. No interference.

#### Escalations

**None.** Every limb of HG-9 was executable at the bytes exactly as specified; no anchor had drifted, no cure was impossible, no owner-gated question arose. Nothing outside the single writable file was written.

---

### X-W0.e — Axis Re-runs and the Motion Quarantine (CC-027) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 2 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.e" `:172–177` · §Scope 5 `:28` · HG-10 `:271–274` · HG-11 `:276–280` · §File Bounds `:96–98` + `:101` · §Commit Plan row 4 `:374` · fold `X-W0-FOLD.md` **G-C** · **W0.7** · **W0.8** · **W0.14**
**Artefact**: `docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md` **§9** (dated addendum-beside, 2026-09-17)
**Commit**: **`af03de5c`** — `docs(x-w0/axes-r2): the three re-run axes tracked by event, the motion quarantine stamped in HG-11's own vocabulary` · ONE commit, as locked · **471 insertions, 0 deletions, 1 file**
**HEAD at open**: `c0d70599` ⟨`git log --oneline -1`⟩

#### Acts, in order

**E1 · HG-10, both halves measured separately (fold W0.14).** ⟨`git ls-files --others --exclude-standard docs/tranches/V/megatranche/ | wc -l`⟩ → **0** (double-run **0**). r2 artefacts tracked, per slug ⟨`git ls-files …/<slug>/ | grep -c 'r2'`⟩: `ActionFeedback` **6** (`challenge-L-library-r2.md` + 5 `evidence-r2/` probes) · `picker-pointerdebugoverlay` **2** (`challenge-D-design-r2.md` + `evidence-r2/probe.mjs`) · `picker-componentsliders-consolerail` **26** (`challenge-D-design-r2.md` + 25 `evidence-r2/` probes) = **34**. Seat 0's brief reproduces exactly (6 · 2 · 26).

> **The untracked half was discharged BY EVENT, not by this seat's hand.** This unit created no r2 artefact and git-tracked none: they were already in the index at open. Fold **W0.14** predicted this on 2026-08-28 (*"the megatranche tree contributes **0** untracked files"*) against a born-RED written on 2026-08-03 (*"all 33 untracked files … are exactly these three slugs' r2 challenge files"*). Recorded with the receipt rather than claimed as work.

**E2 · The ledger-status half, left RED deliberately.** ⟨`grep -c 'REPORT-AUTHORED' registry/HYDRATION-LEDGER.md`⟩ → **47** = **46 rows + the Totals line** (SELF-COUNT law; the Totals line at `:13` reads *"235 original · 51 payload-less (46 report-authored · 5 unwitnessed-direct)"*). The 46 is a fixed constant — `CLOSURE_MANIFEST_46` in `hydrate-reports.mjs`, per the ledger's own definition block at `:6–8` — so re-statusing needs a **generator change, not a ledger edit**. §Disjointness `:119` gives that act to **X-W0.c**. **A hand-edit here would be a masking fallback and was refused.**

**E3 · Both guards re-hashed before any stamp was written.** ⟨`shasum -a 256 demo/styles/animations.css`⟩ → `a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b`; ⟨`shasum -a 256 node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`⟩ → `511e861a88fd2436f63395b6a2bbf32a60f4ade93d4f4d77473bad8a38e428d7`. **Both byte-identical to the record's §1 recorded digests** — so every landed CLEARED verdict keeps its evidentiary footing at this clock and nothing in §1–§8 needed re-deriving. ⟨`grep -n 'prefers-reduced-motion' demo/styles/animations.css`⟩ → `43` · `177` · **`184`** · **`202`**; glass-ui installed **7.0.0**.

**E4 · The marker-spelling reconciliation (the seat brief's explicit charge).** ⟨`grep -c 'QUARANTINED-PENDING-TWO-GUARD-CHECK' motion-quarantine.md`⟩ → **0** at open, confirming seat 0's reading. Corpus-wide ⟨`git grep -ln '…' -- docs/`⟩ → **3** files only: `registry/harvest/wf_4e763b6a-224.json` (the mint site) · `docs/tranches/X/waves/W0.md` (the gate) · `docs/tranches/X/execution/A/X-W0.md` (this record). **The literal had never appeared in the quarantine record.**

Diagnosed at §9.1 as a **vocabulary mismatch, not an unchecked assertion**: HG-11 `:277` writes a two-branch grammar over each assertion, while the landed record spells a **post-check** state space (`TRUE`/`FALSE`/`UNPROVEN` + per-file `cleared`/`STILL QUARANTINED`) *because the two-guard check had already run on every row* — §1 enumerates both guards as served bytes with sha256s and all 34 §3 rows carry a `guard evidence` cell. A total one-way mapping is stated, and the literal is reserved for its only honest home: assertions for which the check **cannot conclude**. **After the addendum: 8 occurrences** (double-run **8**).

**E5 · G-C — guard reach classified before any clear is spelled.** The three out-of-reach classes, witnesses re-read verbatim from `registry/adjudicated/**` (read-only; the commit's intersection with that directory is **0**): **(a) scroll-driven timeline** — **GEN-29** `wb-generate-pane.md:76` *"the pane's dominant motion is a scroll-driven scrub **both PRM guards fire on and cannot stop**"* + **MQ-1**; **(b) JS clock** — **MX-13** `wb-mix-animationcanvas.md:66` *"the CSS PRM neutralizers cannot reach JS constants"*, with MX-9 `:63` / MX-10 `:64` / MX-45 `:77`; **(c) producer-internal transition** — **EY-32** `wb-extract-imageeyedropper.md:75`, which *cites the quarantine's own M-26 measurement in its own direction*.

**Where each class actually lands inside the 46 — measured, not assumed.** ⟨`grep -nEi 'requestAnimationFrame|rAF|animation-timeline|scroll-timeline|setInterval|setTimeout'` over the 46 paths⟩ → **2** lines, **both false positives**: the case-insensitive `rAF` inside the word **"d-r-a-f-t"** at `PaletteRenameInput/challenge-C-implementation.md:9` and `picker-colorcomponentdisplay/challenge-C-implementation.md:18`. **Zero** assertion in the 46 names an rAF loop, a JS motion clock, or an `animation-timeline`. Class (a) holds **2** in-corpus limbs; classes (b) and (c) hold **none** — their witnesses are real and entirely **outside** the 46. **G-C's falsifier is discharged by construction**: no CLEARED stamp sits over an rAF or timeline assertion, because the corpus contains none and the only two timeline-carrying limbs are quarantined.

**E6 · The stamp table — all 34 §3 rows in HG-11's vocabulary (§9.3).** **CLEARED ⟨G1⟩+⟨G2⟩ = 26** · **NOT-A-MOTION-ASSERTION = 7** (M-09, M-14, M-18, M-21, M-22, M-24, M-30) · **QUARANTINED-PENDING-TWO-GUARD-CHECK = 1** (M-34). **26 + 7 + 1 = 34**, set-equal to §3's row count. Each stamped row cites both guards by `path:line` **and** its own carrier byte.

> **WRITE-THEN-MEASURE caught two grep artifacts in my own count line, and they are now stated in the addendum rather than left to diverge**: M-34's cell is bold-prefixed (`| **M-34** |`), so ⟨`grep -c '^| M-'`⟩ over the table returns **33**, not 34; and M-13 carries **two limbs and two stamps**, so ⟨`grep -c 'NOT-A-MOTION-ASSERTION'`⟩ returns **8**, of which M-13 is a *secondary* stamp. `33 + 1 = 34`; `8 − 1 = 7`.

**E7 · The independent re-sweep — "assertions the sweep did not reach", settled by measurement (§9.4).** A deliberately over-broad **33-token** vocabulary over the same 46 files ⟨`grep -nEi 'motion|animat|transition|prefers-reduced|spin|blink|fade|scroll|scale|transform|duration|ease|easing|keyframe|pulse|stagger|hover|press|scan|shift|frame|move|delay|jitter|flicker|bounce|slide|morph|shimmer|glow'`⟩ → **76** lines (double-run **76**). Against the record's coverage (34 §3 rows + 8 §7.5 collisions = **41** keys) ⟨`comm -23`⟩ → **38** unreached lines. **Every one adjudicated**: **1** genuine motion assertion · **4** motion-adjacent (§7.5 extension, each with its guard note) · **33** substring collisions in six named classes (`hover` 12 · `press` 8 · `move` 5 · `slide` 4 · `frame` 3 · `delay` 1). **1 + 4 + 33 = 38** — nothing unaccounted.

**E8 · The one material find — A-1, and it re-homes a file.** `audit/components/wb-gradient-pane/challenge-C-implementation.md:15`, verbatim: *"The wrapper owns scrolling and fades while the child owns content height."* Two limbs:
- **A-1a** *"owns … **fades**"* → **FALSE**, **CLEARED ⟨G1⟩+⟨G2⟩** (vacuous). ⟨`sed -n '54,58p' demo/shared/ui/PaneHeader.vue`⟩ → `.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }` and ⟨`… | grep -ci 'mask\|linear-gradient'`⟩ → **0**. **There is no fade.** Identical in kind and cause to **M-33** on the sibling D axis — the report read the class **name**, not the rule.
- **A-1b** *"owns **scrolling**"* → **TRUE**, **MECHANISM-OUT-OF-GUARD-REACH**, **QUARANTINED-PENDING-TWO-GUARD-CHECK**, witness **MQ-1**/**GEN-29**. ⟨`grep -n 'pane-scroll-fade' demo/workbenches/gradient/GradientPane.vue`⟩ → `:20` (host class on the root `Card`); ⟨`grep -n 'animation-timeline' demo/shared/ui/PaneHeader.vue`⟩ → `:180`, `:186`, `:191`.

**Why it is material and not bookkeeping**: that axis file sits in **§7.4 — "No motion content — vacuously cleared"**. Measured, it carries motion content *and the very premise the record killed one axis over*. A reader adopting the C axis would have adopted a refuted claim — the exact failure §7.3's *"must not be adopted until"* column exists to prevent.

**E9 · §7 corrected BY ADDITION (§9.5), never by rewrite (E-3).** §7.3 gains an eleventh row; §7.4's `wb-gradient-pane` row falls from `C · L` to `L`. Restated arithmetic: §7.1 **5** · §7.2 **1** · §7.3 **10 → 11** · §7.4 **30 → 29**; §7.4's landed sum `…+2 = 30` becomes `…+1 = 29`; **29 + 17 = 46**, the full set, still no file unswept. §6 delta stated: 34 → **36** assertion-limbs, FALSE 15 → **16**, TRUE 14 → **15**, UNPROVEN **5** unchanged; **surviving reduced-motion obligations 1 → 2 — the same single mechanism (MQ-1) asserted at two sites, not a second defect.**

**E10 · The coverage set-difference — ZERO both ways, by enumeration (§9.6).** Left side ⟨`grep '^| audit/' HYDRATION-LEDGER.md | awk … | grep '^REPORT-AUTHORED' | sort`⟩ → **46** paths (double-run **46**). Right side: §7.1–§7.3 name **16** literally ⟨`sed -n '236,290p' motion-quarantine.md | grep -o 'audit/components/[A-Za-z0-9_-]*/challenge-[A-Za-z-]*\.md' | sort -u | wc -l`⟩ → **16**; §7.4's subject × axes table expands to **30**; `16 + 30 = 46` with ⟨`sort -u | wc -l`⟩ → **46** (no double-count).

| direction | ⟨cmd⟩ | result |
|---|---|---|
| ledger **minus** record | `comm -23 ra46.txt mq_all46.txt` | **empty — 0 rows** |
| record **minus** ledger | `comm -13 ra46.txt mq_all46.txt` | **empty — 0 rows** |

HG-11's *"one of the 46 axis files absent from its disposition"* falsifier is discharged **by enumeration, not by assertion**. The §9.5 re-home moves a file **between** §7 cells and never out of the 46, so the difference is zero before and after.

**E11 · Fold W0.8 consumed — re-measured, never inherited (§9.7).** Five zero-row attestations re-run ⟨`grep -ci '<subject>' motion-quarantine.md`⟩ against the record as it stood **before** this addendum: `AuroraPane` **0** · `CurrentPaletteEditor` **0** · `SwatchHoverMenu` **0** · `EmptyState` **0** · `wb-mix` **0** · `wb-extract-controls` **0** (and `ShadowPalette` **0**) — all five reproduce exactly, and none of these subjects is in the 46. The **EmptyState classification precedent** (*"a species-swap contract is state, not motion"*) is **adopted, not re-derived**, and applied inside the 46 at M-09, M-13's second limb and M-21. The **ShadowPalette provenance correction** is dated: the record is TRACKED at **`9812f951`** ⟨`git log --oneline -1 -- <it>`⟩, so any *"does not exist"* cell — `W6.md:240`, gate **H2** `:338` — is dated 2026-08-03 and superseded by that landing.

**E12 · The coverage axis the set-difference structurally cannot enumerate — recorded, not closed.** ⟨`registry/adjudicated/AuroraPane.md:10`⟩ verbatim: *"X.W6.j's transition gates are already **MOTION-SOURCED · PENDING-QUARANTINE** by the wave's own text."* Confirmed live at `W6.md:240`, `:327`, `:338`, `:446`, `:473`, with `:473` binding (*"no close may claim … a motion property still under PENDING-QUARANTINE"*). The quarantine's reach extends into **wave gate text**, an axis HG-11's set-difference — defined over the 46 ledger rows — cannot reach. **X.W6.j** discharges it at its own open; this seat states the discharge condition in one place and claims no closure. Named residue **R-2**, not a silent one.

**E13 · Landing, and the bounds proof.** Staged by exact pathspec, **one argument**. ⟨`git diff --cached --name-only | wc -l`⟩ → **1**; ⟨`… | grep -vc 'motion-quarantine.md'`⟩ → **0**; ⟨`… | grep -c 'dev.sh'`⟩ → **0**. ⟨`git diff --check`⟩ → clean (exit 0). Append-only proven at the bytes: ⟨`git diff --numstat`⟩ → **471 insertions / 0 deletions**, single hunk ⟨`git diff -U0 | grep '^@@'`⟩ → `@@ -318,0 +319,471 @@`, and ⟨`diff <(git show HEAD:<file>) <(head -318 <file>)`⟩ → **exit 0, §1–§8 byte-identical**. Post-commit, over `af03de5c` ⟨`git diff-tree --no-commit-id --name-only -r`⟩: **1** path · `registry/adjudicated/` → **0** · `challenge-*.md` → **0** · non-`docs/` → **0**.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (HEAD `c0d70599`) | AFTER (`af03de5c`) | verdict |
|---|---|---|---|
| **HG-10** — the three axes witnessed, not report-authored | **half 1** untracked under `megatranche/` → **0**; r2 tracked 6·2·26. **half 2** `REPORT-AUTHORED` → **47** greps = 46 rows + Totals | **half 1 unchanged and GREEN over the gate's subject set** — my three slugs' untracked count ⟨`git ls-files --others --exclude-standard <3 slug dirs>`⟩ → **0**, double-run **0**. **half 2** still **47** | **HALF-GREEN — as fold W0.14 rules it.** Untracked half **GREEN by event**; ledger half **RED by law**, cured only by X-W0.c's generator replay (§Disjointness `:119`) |
| **HG-11** — every motion assertion quarantined or two-guard-cleared, **in the quarantine record** | literal marker → **0**; coverage set-difference **unrun**; sweep-missed assertions **unknown** | literal marker → **8** (double-run **8**); **34/34** §3 rows stamped + **2** new limbs; coverage set-difference **0 both directions**, enumerated; the 38 unreached lines **all adjudicated** | **GREEN** |
| **G-C** (fold, sharpens HG-11) — guard reach classified before a clear is spelled | three witness classes named in the fold, **none classified in the record**; no third disposition existed | three classes stated with witnesses re-read verbatim; in-corpus population **measured** (a = 2 limbs · b = 0 · c = 0); the third disposition populated by M-34 + A-1b; **zero** rAF/timeline assertions in the 46, so the false clear is **unspellable** | **GREEN** |

#### Residuals

- **R-1 — HG-10's ledger-status half stays RED at this unit's close, by design.** Its only lawful cure is **X-W0.c's** `hydrate-reports.mjs` replay. This commit is sequenced **before** `.c` precisely so that replay sees the tracked r2 artefacts.
- **R-2 — the wave-gate-text coverage axis (E12) is recorded, not closed.** Outside the 46 and outside the record's file-level disposition; **X.W6.j's** act at its own open.
- **R-3 — MQ-1 remains an open product defect and no cure was applied.** `demo/` is Do-NOT-touch for this wave (`W0.md:101`). A-1b adds a **second asserting site**, not a second defect; the nine sibling panes carrying `.pane-scroll-fade` are unchanged at this clock.
- **R-4 — §7.3's ten landed rows are untouched.** An eleventh is added; nothing is withdrawn, softened or re-ruled. Every *"must not be adopted until"* condition landed at `9812f951` still binds.
- **R-5 — zero canonical axis bytes written (C-02).** ⟨`git status --porcelain -- audit/components/`⟩ → **empty**; the commit contains **0** `challenge-*.md` paths. The 46 are byte-identical to their state at this wave's open. The stamps live in the quarantine record, which is the whole reason it exists.
- **R-6 — the live untracked absolute under `megatranche/` moved from 0 to 1 during this run, and it is not this unit's.** Post-commit ⟨`git ls-files --others --exclude-standard docs/tranches/V/megatranche/`⟩ → **1**: `registry/harvest/x-p-w0.json`, 30,067 B, mtime **Sep 17 13:23**, written by the concurrent **X·P (Track D)** seat (the filename names it) and **not** an r2 artefact of any of the three slugs ⟨`… | grep -c 'audit/components/(ActionFeedback|picker-pointerdebugoverlay|picker-componentsliders-consolerail)/'`⟩ → **0**. HG-10's falsifier is scoped to *"a named slug whose row stays REPORT-AUTHORED, or whose **evidence** stays untracked"*, and that subject reads **0**. This is **X-W0.a's CR-2/CR-4 rule measured live a second time** — the authoring seat closes its own tree in its own commit — and is reported, never touched.

#### Escalations

**None.** Every limb of HG-10, HG-11 and G-C was executable at the bytes exactly as specified. No anchor had drifted; no specified cure was impossible; no owner-gated question arose. Two spec-adjacent facts are recorded rather than escalated, because the spec itself already rules them: HG-10's ledger half is **not** this unit's to cure (§Disjointness `:119` assigns it), and the `QUARANTINED-PENDING-TWO-GUARD-CHECK` spelling was **reconciled inside the addendum** as the seat brief directed, not by editing the gate (E-3). Nothing outside the single writable file was written.

**Provenance note (dated 2026-09-17, E-3 — a receipt, not a correction).** The record-append commit **`9c72f097`** carries **five paths that are not this unit's**: `registry/DEFECT-LEDGER.md` · `registry/harvest/x-p-w0.json` · `X/COHESION.md` · `X/parse-that/EVIDENCE-CHAIN.md` · `X/parse-that/evidence/W0/census-after.txt`. This seat staged **one** argument ⟨`git add docs/tranches/X/execution/A/X-W0.md`⟩; the concurrent **X·P (Track D)** seat staged its own work into the **shared index** between that call and the commit, and the commit consumed whatever was settled. **Nothing is lost and nothing is duplicated** ⟨`git diff-tree --no-commit-id --numstat -r 9c72f097`⟩ → all six paths present with their authors' full content; each foreign row's authorship is X·P's, its commit is this one. **This is the identical event X-W0.a recorded at `:44`** (its INBOX rows carried into HEAD by the concurrent F.W0 seat's commit `47608b5c`, *"four Track seats share that one file; it stages whatever is settled"*), and it takes the identical disposition: **recorded, not rewritten.** No history is rewritten — a `reset` mid-flight would hand a live sibling seat an index it did not create, and `47608b5c` was left standing for that same reason. **The wave-owned commit `af03de5c` is unaffected**: ⟨`git diff-tree --no-commit-id --name-only -r af03de5c`⟩ → **1** path, this unit's only writable file. Subsequent commits by this seat stage by pathspec **and re-verify the staged set, unstaging any foreign path by exact pathspec before committing.**

---

### X-W0.b — The 181-Event Prompt-Recap Canon (CC-013 / DR-30) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 2 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.b" `:151–156` · §Scope 2 `:25` · HG-3 `:231–234` · HG-4 `:236–239` · HG-5 `:241–244` · §Commit Plan row 2 `:372`
**Artefact**: `docs/tranches/X/W0/PROMPT-RECAP.md` (created — 668 lines, 60,284 B)
**Commit**: **`5937b6de`** — `docs(x-w0/prompt-recap): the 181-event recap as tracked canon, the clean-pass contradiction RULED, thirteen owner asks restored` · ONE commit as locked (recap + supersession ruling together), body required and written

#### Acts, in order

**B1 · Dependency verified at the bytes, not assumed.** §Disjointness makes this unit wait on `.a` tracking the corpus. ⟨`git ls-files docs/tranches/V/apotheosis/pi/formation/session-audit/raw-prompts/ | wc -l`⟩ → **4** (was **0** at seat 0's open). X-W0.a's disposition row **D-2** names this gate as its own ground. **HG-3's first half is GREEN by event at `befbc05a`**, verified here rather than inherited.

**B2 · Corpus integrity, before any re-authoring.** Each archive's live digest ⟨`shasum -a 256`⟩ compared to `INDEX.json`'s `archiveSha256`: `value-tranche-v-formation` `c04456894…` · `value-v-pi-refinement` `96d94a82a…` · `bbnf-greenfield-coordination` `73612abe6…` — **3/3 MATCH**. Re-authoring from a drifted corpus would have been undetectable later.

**B3 · The denominators, all of them, kept apart.** ⟨`grep -c '^## [0-9][0-9][0-9] — '`⟩ → 83 + 28 + 70 = **181** headers, agreeing with `INDEX.json`'s `prompts`. ⟨`cat *.md | grep -c '^- Body SHA-256: '`⟩ → **181** occurrences; ⟨`… | sort -u | wc -l`⟩ → **179** globally unique. The brief's `70/69` for bbnf is stated **and** its mechanism located: ⟨`grep -n '65f64eae…'`⟩ → `:527`, `:542` = **B#033 ≡ B#034**, both the single word *"Continue."* A **second** collision `INDEX.json` structurally cannot report — it counts uniqueness **per session** — was found and published: **R#023 ≡ B#055**, sha `6dca10971…`, one owner phase-mark that reached two live sessions. **181 is the row count** (an occurrence is what the edict forbids dropping); **179** is the distinct-body count. Publishing one without the other would either drop two events or over-claim by two.

**B4 · DR-30's chain re-derived, not carried forward.** DR-30 asserts the incumbent recap predates **69** of the 181 events, **29** owner-authored. Sorting all 181 by UTC and cutting to leave exactly 69 places the cut **between `2026-07-20T08:41:15.202Z` and `2026-07-20T14:30:24.187Z`**, with **29** owner-authored in that tail. **Both figures reproduce exactly**, and they date the incumbent's authoring to a six-hour window. DR-30's second probe at this seat's clock: ⟨`grep -cE '\bE(1[01]|[1-9])\b' docs/tranches/V/vnext/PROMPT-RECAP.md`⟩ → **0**, double-run **0**.

**B5 · HG-4 — ruled on measurement, three receipts.** ⟨`git log --format='%h' -- <each file>`⟩ → both readings landed in **one** commit `5c13465d`, so authoring order decides nothing and no seat should try it. The ruling: **`vnext/PROMPT-RECAP.md:88`'s `0/2` is CANON; the JSON's `"status":"clean"` is SUPERSEDED**, epoch-scoped. (1) `FORMATION-CLEAN-PASS-PROTOCOL.md`'s own final line — *"Until both pass on current evidence, formation is 0/2 and production 0/193"* — plus *"A finding resets 0/2"*, and `:85–88` records the R2/R3 findings that trip it. (2) ⟨`node docs/tranches/V/vnext/tools/validate-clean-passes.mjs`⟩ run **read-only** today errors **`epoch drift` FIRST**, double-run identical; **45** errors total = 1 drift + 2 pass-identity + 42 seat (18 of them `ENOENT`). ⟨`node …/corpus-epoch.mjs`⟩ → live epoch **`04dfe8da…`** ≠ the passes' **`61d4954f…`**, double-run identical. (3) `formation-clean-passes.schema.json` pins `status` to `{"const":"clean"}` with `additionalProperties:false` — **the field is a well-formedness marker with no vocabulary for "not clean"**, so reading it as standing credit *is* the defect DR-30 registered, not a genuine disagreement. **J stands valid and untouched as history** (G05 append-only). `git status --porcelain` verified byte-identical before and after every probe.

**B6 · HG-5 — thirteen restored, and the roster difference explained rather than smoothed.** The re-derivation source is DR-30's own chain: `docs/tranches/W/audit/history/CROSS-prompt-recap.md` **§F-12 `:274`**, twelve rows. HG-5's six named ∩ F-12's twelve = **five**; F-12's remaining **seven** are candidates for HG-5's "six more" — seven candidates, six slots. **The 3×5×3 law is absent from F-12 for a substantive reason, measured**: ⟨`grep -n '3×5×3\|3x5x3' CROSS-prompt-recap.md`⟩ → **5** hits at `:79,:173,:187,:429,:469`, ⟨`awk 'NR>=274 && NR<=292 …' | wc -l`⟩ → **0** inside F-12's block — because it is filed **one severity band higher** at **F-06 MAJOR**, *"contradicted, not merely omitted"* (the incumbent encodes **2+1 twice**), with ask-row **A69 `:429`** marked **X** not `N`, and remedy **R-07 `:469` BUILD**. **Disposition: restore the union, thirteen rows** — discarding one measured drop to satisfy an arithmetic is the exact act the edict forbids. Every F-12 source citation was verified to fall inside the event F-12 names, by mapping each anchor line to the greatest `## NNN —` header at or above it: **12/12 reproduce**.

**B7 · Two spelling defects caught in the act of anchoring.** The owner wrote **`DIRIGIBLITY`** (`B:85`); F-12 quotes **`DIRIGIBILITY`**. Consequence measured: ⟨`git ls-files docs/ -z | xargs -0 grep -lI 'DIRIGIBILITY is reached'`⟩ → **exactly one file, `CROSS-prompt-recap.md` itself** — a search for the corrected spelling reaches the correcting file and nothing else, never the owner's bytes. Likewise *"an **abitrary** upper bound"* (`R:2108`). **Row 8 and the §3.3 note carry the owner's spellings**, so the anchors resolve. This is the mechanism by which an ask goes missing, and it is why **presence is not restoration**.

**B8 · HG-5's MEASURE-AT-OPEN, and the denominator that moved.** Per-phrase presence ⟨`git ls-files docs/ -z | xargs -0 grep -lI -- '<phrase>' | wc -l`⟩ at this seat vs seat 0's pre-`befbc05a` baseline: `internal browser` 2→**6** · `ristotelian` 87→**118** · `pursuant to precepts` 4→**19** · `lightningcss` 11→**30** · `sonic-rs` 5→**17** · `No x86 ever` 4→**4** · `3x5x3` 4→**6** · `3×5×3` 3→**26**. **Every increase is the archive itself entering `git` at `befbc05a`** — the asks did not become addressed between the two measurements, they became greppable. A gate reading presence as restoration would have flipped RED→GREEN on a tracking commit that answered nothing: the same conflation HG-6 forbids for `264/264`. Recorded in the file as the reason the counts are context and the **anchored rows are the gate**.

**B9 · The anchor rule, applied by position and never by content.** (1) the first non-empty line after `## My request for Codex:` — **35** rows; (2) otherwise the `<input>` line of a `<codex_delegation>` — **120** rows; (3) otherwise the first non-empty non-boilerplate body line — **26** rows. Total **181**, and **120** matches the measured `cross-thread-delegation` count exactly (64+15+41). Rule 1 exists because the IDE-context envelopes open with hundreds of lines of pasted context: anchoring at the body's first line would have pointed **30** rows at *"# V·π HANDOFF PACKET…"* — an anchor that resolves but **carries no meaning**, the precise failure the **L-18 rider** names in advance (*"a recap re-authored with anchors that do not carry meaning"*). Rules applied by position mean no anchor can be chosen to flatter its row.

**B10 · Landing.** Staged one path; committed **by pathspec on the commit itself** ⟨`git commit … -- docs/tranches/X/W0/PROMPT-RECAP.md`⟩ **because X-W0.e's `:402` note records the shared-index hazard** — a concurrent Track seat's staged work being swept into another unit's commit. Result: ⟨`git diff-tree --no-commit-id --name-only -r 5937b6de`⟩ → **1** path; ⟨`… | grep -vc '^docs/tranches/X/W0/PROMPT-RECAP.md$'`⟩ → **0** foreign paths; `dev.sh` → **0**. Another seat's staged `X-W0.md` and `EVIDENCE-CHAIN.md` were left staged and untouched, and that seat committed them itself. ⟨`git diff --check`⟩ clean.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (seat 0, HEAD `b42d775a`) | AFTER (from the committed blob `5937b6de`) | verdict |
|---|---|---|---|
| **HG-3** | corpus tracked **0**; file ABSENT; incumbent `E1–E11` → **0** | corpus tracked **4**; **181** event rows (F **83** · R **28** · B **70**); **181/181** anchors resolve ⟨verifier, **triple-run** identical⟩ | **GREEN** |
| **HG-4** | both readings live and unannotated | one **dated 2026-09-17** row: canon **P (0/2)**, loser **J SUPERSEDED**, both annotated at their byte coordinates, three re-runnable receipts | **GREEN** (bounds question returned, R-2) |
| **HG-5** | DR-30's finding; per-phrase presence only | **13/13** rows, each `<archive>:<line>`; **13/13** anchors resolve, triple-run | **GREEN** (12 required, 13 restored, surplus declared) |

Self-count from the committed object: ⟨`git show 5937b6de:… | grep -cE '^\| [FRB]#[0-9]{3} \|'`⟩ → **181**; HG-5 rows → **13**; line 1 → `SERVED MODEL: claude-opus-5[1m]`.

#### Residuals

- **R-1 — the roster band difference, recorded not cured.** HG-5 names the 3×5×3 law; CROSS files it at F-06 MAJOR rather than among F-12's twelve. §3.1 states the arithmetic; §3.2 restores the union, so **nothing is dropped by this file**. The *cure* for the contradiction — CROSS's **R-07 BUILD**, *"Amend every 2+1 review row to the 3×5×3 law"* — is a write into `docs/tranches/V/vnext/**`, outside §File Bounds entirely. **Owed and unhomed**: no X wave is charged with it in `waves/W0.md`. Naming it is this seat's duty; homing it is not a seat decision.
- **R-3 — the incumbent's probe left as it stands.** ⟨`grep -cE '\bE(1[01]|[1-9])\b' docs/tranches/V/vnext/PROMPT-RECAP.md`⟩ → **0**, unchanged. HG-3 cites it as evidence of the incumbent's defect, not as a value to move; the cure is this file's 181 anchored rows, and `vnext/**` is out of bounds regardless. Recorded so no later seat reads the unchanged `0` as an unfinished act.

#### Escalation returned — **R-2 · HG-4's "SUPERSEDED in place" is unsatisfiable at the losing byte**

**Not a blocker on this unit — HG-4's stated falsifier is discharged in bounds — but a question this seat may not answer for itself.**

HG-4 `:237` requires the loser marked *"SUPERSEDED **in place**"*. The loser is `docs/tranches/V/vnext/FORMATION-CLEAN-PASSES.json`. **`docs/tranches/V/vnext/**` appears nowhere in §File Bounds `:73–99`**; this unit's writable set is one file. Beyond bounds, the mark is **impossible at the target**, measured: `status` is `{"const":"clean"}` (no other value is schema-legal) · `additionalProperties:false` (no annotation key may be added) · `manifest_hash = sha256(JCS(doc − manifest_hash))`, validator-checked, so **any byte edit destroys the seal that makes J worth keeping as history**. There is no byte in J that can carry the mark. Per §Triumvirate Dispatch — *"if the specified cure is impossible at the bytes, do NOT substitute"* — **no substitute was written**: no shim, no sidecar `.superseded` file, no edit to the prose winner.

**Done instead, wholly in bounds**: §2.2 is a dated tracked row naming **P** canon, marking **J** SUPERSEDED, annotating **both** readings at their exact byte coordinates, and proving it with three re-runnable probes. HG-4's falsifier — *"leaving both readings unannotated leaves the contradiction greppable"* — is therefore **met**.

**The word wanted, in one sentence**: *does "in place" require a byte inside `FORMATION-CLEAN-PASSES.json` — in which case the gate is unsatisfiable as written and the honest act is a dated addendum-beside amending HG-4 — or is §2.2's dated annotation in tracked canon sufficient, this seat's reading and the only one its bounds permit?* **Returned to X-W0.g's sitting packet as a docketed row**, or to the owner directly; it is **not** one of COHESION §0j.A's seven and must not be presumed into them. **No act taken outside bounds.**

---

### X-W0.f — The Tombstone Set (CC-015..CC-018, CC-022) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 3 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.f" `:179–184` · §Scope 6 `:29` · HG-12 `:282–298` · §Commit Plan row 6 `:376` · §File Bounds Do-NOT-touch `:101`
**Rulings consumed**: COHESION **§0j.A `:517`** (DR-14 = **DELETE**, routed to X-W1's config carve) · **§0j.A `:518`** (DR-16 = **RETIRE**, option a, **no** fresh bracket set at X-W10) · §0j preamble (the begin-word). No other §0j row gates this unit.
**Artefact**: `docs/tranches/X/W0/TOMBSTONES.md` (created — **687 lines, 43,649 B**)
**Commit**: **`b5673ae0`** — `docs(x-w0/tombstones): the five executable tombstones — CC-015/016/017/018/022, every probe pasted and reproducing; CC-022 FIXED at kf 6.0.0` · ONE commit, as locked · **687 insertions, 0 deletions, 1 file**
**HEAD at open**: `a0d392dc` · **at the final probe re-run**: `ca5b7441` · **post-commit re-run**: `e12eeb91` (sibling Track seats commit concurrently; every probe was re-run at each clock)

#### Acts, in order

**F1 · The five probes run and double-run BEFORE a byte was written.** All five reproduce the spec's born-RED table (`W0.md:286–292`) exactly, and each was run twice with byte-identical output ⟨captured to one scratchpad file in a single shell so the two runs share a clock⟩:

| row | ⟨cmd⟩ | output (verbatim, both runs identical) |
|---|---|---|
| **CC-015** | `grep -rn "glass-ui/blob" demo/` | **5** hits / **3** files — `scenes/blob/BlobPane.vue:12,13` · `picker/visual/HeroBlob.vue:34,35` · `color-picker/composables/boot/useAtmosphere.ts:36` |
| **CC-016** | `grep -n siblingFsAllowTransient vite.config.ts` | `139:const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];` · `287:                fs: { allow: siblingFsAllowTransient },`; glass installed **7.0.0**, pin `^7.0.0` (`package.json:83`) |
| **CC-017** | `git submodule status docs/precepts` ⧸ same in `../keyframes.js` | ` 63240e677dfd1d5b95e00710a1a4d64664624784 docs/precepts (heads/main-26-g63240e6)` ⧸ ` 8ccf9f4da0198e02382e673f253fe96c2ed03034 docs/precepts (heads/main)` |
| **CC-018** | `sed -n 30p docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md` | `> _(empty — the owner's verdict lands here)_` |
| **CC-022** | `node -p "require('./node_modules/@mkbabb/keyframes.js/package.json').version"` | `6.0.0`, pin `^6.0.0` (`package.json:84`) |

**F2 · Every "original mandate" resolved to an owner-or-origin byte, not to the registry's paraphrase of it.** HG-12 asks for the mandate *quoted verbatim*; a tombstone that quotes only the adjudicated summary quotes the summariser. Each row was chased to its minting byte and both are carried:

| row | the minting byte | the adjudicated statement carried beside it |
|---|---|---|
| CC-015 | **`docs/tranches/D/D-PROMPTS.md:25`** — the owner's own words, *"Full validation and extirpation of the blob **faciilities** — align, update, and augment the glass-ui **glob** facilities …"* | `DISEASE-REGISTRY:123` + `:127` |
| CC-016 | **`D/audit/D.W1-contract-v2.md:204` + `:210`** — the decision that minted the identifier *and* the retirement trigger in the same bullet list; restated at `D/FINAL.md:201` | `DISEASE-REGISTRY:243` |
| CC-017 | **`F/coordination/Q.md:145`** + **`G/audit/G-AUDIT-2-deferred-ledger.md:145`** (CH-10's full row) + the finding that minted it, **`E/audit/E-AUDIT-4-cross-repo-state.md:232`** | `DISEASE-REGISTRY:253` + `:257` |
| CC-018 | **`T/waves/T.W8.md:240–242`** (§Hard gate row 6) + `:246–247` (the *"critique is a PRE-FILTER, never a certification"* prohibition); restated at `PACKAGE.md:10` | `DISEASE-REGISTRY:263` |
| CC-022 | **`S/audit/w7-furniture-records.md:24–29`** (the root cause) + **`:42–48`** (the named one-line cure) + **`U/FINAL.md:274`** (book **B1**, the retirement gate) + `U/DISPOSITION-LEDGER.md:57` | `DISEASE-REGISTRY:353` + `:357` |

> **The owner's spellings are preserved** — `faciilities`, `glob` — for the reason X-W0.b measured on this same corpus at its B7: a search for the *corrected* spelling reaches the correcting file and never the owner's bytes. Every one of the sixteen anchors above was re-read at its line number at this clock; **none had drifted**.

**F3 · CC-015 — a second probe, because the gate's probe answers the wrong question if read alone.** The mandate's verb is *"remove the hard-coded bespoke versions herein **to leverage that**"*, so a producer import is **compliance**, not violation. The mandate's actual predicate was measured directly: ⟨`find demo -iname '*metaball*' -o -iname '*WatercolorDot*' -o -iname '*useMetaballRenderer*'`⟩ → **empty**; ⟨`grep -rln "createQuadVAO\|compileShader\|metaball.frag" demo/ src/`⟩ → **`demo/picker/seat.css` only** (a CSS file — no GL call site survives); ⟨`grep -rn "watercolor-filter" demo/`⟩ → **1** hit, `SpectrumCanvas.vue:266`, *"no global #watercolor-filter override here"* — **a comment asserting its own absence**; ⟨`node -p "Object.keys(require('…/glass-ui/package.json').exports).filter(k=>/blob/.test(k)).join(',')"`⟩ → `./blob-config,./blob`. Landing re-verified: ⟨`git merge-base --is-ancestor e32111c7 HEAD`⟩ → **exit 0**. The inversion re-measured: ⟨`grep -rn "extirpat" docs/tranches/V/vnext/ | wc -l`⟩ → **0** (double-run **0**) — the registry's *"ZERO times in the entire vnext corpus"* reproduces.

**Disposition: RETIRED — satisfied at `e32111c7`, inverted in the record and never in the tree.** The five HEAD imports are the mandate's second clause, not its debt; D18's KEEP ruling governs the instrument's *future* and is not disturbed; the residual lifecycle asks are **DR-03 / CC-035**, the split six closes failed to make.

**F4 · CC-016 — the trigger evaluated ONCE, in both directions, and the finding that it fired four months ago.** The ledger's verb is *"evaluate the trigger ONCE at X-W0 against installed glass 7.0.0"*. **Producer half**: `E/audit/E-AUDIT-4-cross-repo-state.md:41`, verbatim — glass-ui `9275584` (2026-05-19) *"**Closes the contract-v2 §2.1 keystone gap.** … **value.js can now retire its `siblingFsAllowTransient` transient carve-out.**"* **The trigger was observed firing in value.js's own tracked canon on 2026-05-19 and the carve-out was carried through E, F, G, H and I..V anyway** — the FM-19 shape a second time. **Consumer half**: ⟨`awk 'NR>=130 && NR<=139' vite.config.ts`⟩ (read-only) shows the rationale has already migrated in the file's own comment — *"the SFC-scoped component-CSS half closed at E.W0; only font-asset resolution remains"* — so the trigger as **written** fired at E while the trigger as the file now **reasons about itself** (fonts inlined as data URLs) has not. A retirement condition that silently migrates across fourteen closes is the thing that may not survive X.

**Disposition: RETIRED — trigger evaluated once and not re-armed; verb = DELETE (§0j.A `:517`), act routed to X-W1, NO delete performed here.** `vite.config.ts` is `W0.md:101` **Do NOT touch** for this entire wave; ⟨`git diff-tree --no-commit-id --name-only -r b5673ae0 | grep -c 'vite.config'`⟩ → **0**.

**F5 · CC-017 — the gate's probe cannot tell a fork from a lag, so ten more were run.** Two differing SHAs are consistent with two incompatible facts, and the row rode six closes on the **fork** reading without anyone measuring which it was. Measured read-only inside value.js's own `docs/precepts` clone — **no `fetch`, no `update`, no write; `origin/main` is whatever this clone last held**:

| ⟨cmd⟩ | output | what it settles |
|---|---|---|
| `git -C docs/precepts cat-file -t 8ccf9f4da019…` | `commit` | the peer's pin **is an object in this clone** → *"a separate precepts repository"* **refuted at the bytes** |
| `git -C docs/precepts merge-base 63240e67 8ccf9f4d` | `63240e677dfd…` | the merge-base **is value.js's own pin** — linear, not divergent |
| `git -C docs/precepts rev-list --left-right --count 63240e67...8ccf9f4d` | `0	1` | value.js **0 ahead**, keyframes.js **1 ahead**. The whole drift is **one commit** |
| `git -C docs/precepts rev-list --count 63240e67..origin/main` | `16` | **value.js is the laggard**, 16 behind upstream |
| `… --is-ancestor 8ccf9f4d origin/main` ⧸ `458c2d1 origin/main` ⧸ `68d9b20 63240e67` | exit `0` ×3 | peer pin **and both historically cited SHAs** are all on the one `mkbabb/precepts` line |
| `git -C docs/precepts log -1 --format='%h %ad %s' --date=short` ×3 | `63240e6 2026-05-27 infra: promote tls/blob-backend-dr/deploy…` ⧸ `8ccf9f4 2026-06-04 spec(π-lane): edict — every-page paired before/after capture…` ⧸ `b0f6134 2026-07-17 precepts: truth-up against the glass-ui 7.0.0 surface` | the peer's pin **is value.js's pin plus one commit** |

**The E-era grading — *"a separate precepts repository (or a fork) that does NOT share commits"*, *"drift of the highest severity"* — does not hold at today's bytes.** The registry was right that the `458c2d1` vs `68d9b20` framing is *"historical fiction"*; it is right for a stronger reason than it knew — **that pair was never a fork either.**

**Disposition: RETIRED — the event-bound trigger is dead by six-close demonstration and is not re-armed; the chronic it named does not exist.** No rebase performed: `docs/precepts` appears in **no** X wave's §File Bounds, and the peer half is un-writable by us by standing law and by `G-PEER-KEYFRAMES-JS.md:188` (*"the fix is keyframes.js-internal … Per F3, value.js doesn't write keyframes.js"*). The surviving question — *do we advance our own pin the 16?* — is **new, small and not the carry**; returned as **RS-2**.

**F6 · CC-018 — the "three closes" claim carried by history, not by a one-line probe.** ⟨`git log --format='%h %ad %s' --date=short -- …/VERDICT-2026-07-12.md`⟩ → **exactly one commit**, `286619e8` (2026-07-12, the hour it was assembled). **The file has never been edited** — 67 days and three tranche closes; ⟨`shasum -a 256`⟩ → `7119280ad5d6a8ead76e3518f13f012acc13f4b114475041eb9500f595d7a861`. Its own `:3` still reads *"**AWAITING THE OWNER**"* and its own `:39` *"**Wave close**: only on the owner's word. Until then, **OPEN, honestly**."* The bracket half: ⟨`grep -rn "B-02\|B-10\|B-20" docs/tranches/U/ | wc -l`⟩ → **0 · 0 · 0**.

**Disposition: RETIRED (option a) per §0j.A `:518`, transcribed verbatim and not re-opened; tombstone is the act; NO fresh bracket set at X-W10.** Recorded explicitly at §4.4 of the artefact: **CC-018's *"optional CC-018 fresh brackets"* entry at `CARRY-CUT-LEDGER.md:256` is closed by this ruling** — the condition it was optional upon has been answered **NO**. `VERDICT-2026-07-12.md` stays byte-identical (G05 append-only; E-3): its emptiness is now evidence, not an open obligation.

**F7 · CC-022 — the owed re-probe run against the installed bytes, and the cure FOUND.** The ledger's act is *"one re-probe at kf 6"*, not a version read. Run read-only over the package value.js consumes ⟨`shasum -a 256 node_modules/@mkbabb/keyframes.js/dist/sequence-BvpIpCGp.js`⟩ → `d13cab1bd6e1879acba3cde570656f3da1463c19c87a8fdf9d2c57c4e0cb9c56`. The bundle preserves its source-region markers, so the defect's exact file is locatable in the shipped artifact ⟨`grep -n "managed-play.ts\|managed-stepper.ts"`⟩ → `:229` and `:137`.

- `springPlay` — `//#region src/animation/physics/spring/managed-play.ts`, `:233–235`: `function O(e, t) { S(e, t); }` → delegates to the managed-stepper.
- **The PRM arm, `:141–147`**: `function S(e, t) { e.disposed || (e._onFrame = t, y(e.respectReducedMotion, () => { `**`e.snap(), e._emitManagedFrame()`**`; }, () => { e.settled ? e._emitManagedFrame() : x(e); })); }` — with `y` the PRM gate (`:85–87`, `_()` = the live media match).
- **`_emitManagedFrame`, `:371–373`**: `this._onFrame?.(this.value, this.velocity);`

Read against the cure S.W7 named term-for-term — `() => { spring.snap(); onFrame?.(spring.value, spring.velocity); }` ≡ `e.snap(), e._emitManagedFrame()` → `this._onFrame?.(this.value, this.velocity)` — **the cure is present.** The 2026-07-06 asymmetry is gone: **both** arms now route through `_emitManagedFrame()`, so the `onFrame` bound by `.play(onFrame)` fires under PRM in exactly one frame (*"jump, no motion frames"*).

> **And the original mechanism is still visible beside it, which is why this is a cure and not a coincidence.** ⟨`awk 'NR>=447 && NR<=449'`⟩ → `emit() { if (this.subscribers.size !== 0) for (let e of this.subscribers) e(this.currentValue, this.currentVelocity); }` — **`emit()` is still subscribers-only.** S.W7's diagnosis was and remains exactly correct; what changed is that the PRM arm no longer *depends* on `emit()` to reach `onFrame`. The producer fixed **the arm, not the emitter** — precisely the one-line shape the letter asked for.

**Disposition: RETIRED — FIXED at kf 6.0.0. The `fixed → tombstone with the probe pasted` branch is live and the probe is pasted. NO §D letter is owed, nothing is dispatched, and no fourth carry is created.** The gate (*"a kf tag > 5.2.0"*) fired and is now **observed** — DR-25's actual complaint (FM-19) is discharged on a dated run against installed bytes with the artifact's sha256 recorded.

**F8 · The file left structurally open for `.g`, by construction and by measurement.** `W0.md:181` assigns CC-019/020/021/023 to X-W0.g. §4 of the artefact is a **reserved, empty** section naming the four by id with their §0j.A ruling lines (`:513` · `:514` · `:515` · `:516`, each re-read at its byte) so the addendum's roster is checkable by set-difference, and stating the arithmetic `5 + 4 = 9` against HG-12's *"nine tombstones"*. ⟨`grep -c '^### TS-.*CC-0\(19\|20\|21\|23\)'`⟩ → **0**: **not one of the four was pre-written.** §0 rule 3 states the append law in the file itself — *"§4 is reserved … nothing in §1–§3 is rewritten to accommodate them"* (E-3).

**F9 · Landing, and the bounds proof.** ⟨`git diff --check`⟩ → clean (exit 0). Staged by exact pathspec, **one argument**, then committed **with the pathspec on the commit itself** ⟨`git commit … -- docs/tranches/X/W0/TOMBSTONES.md`⟩ — adopting X-W0.e's `:402` and X-W0.b's B10 finding about the shared index that four concurrent Track seats write. Result over `b5673ae0` ⟨`git diff-tree --no-commit-id --name-only -r`⟩: **1** path · foreign paths **0** · non-`docs/` **0** · `registry/adjudicated/` **0** (fold **G-H**) · `dev.sh` **0** · `vite.config` **0** · `docs/precepts` **0**. ⟨`--numstat`⟩ → **687 / 0** — a created file, nothing deleted, nothing rewritten anywhere.

**SELF-COUNT, read back from the committed blob** ⟨`git show b5673ae0:…`⟩: `^### TS-` → **5**; §2 gate-table rows `^| \*\*CC-0(15|16|17|18|22)\*\*` → **5**; *"The original mandate, verbatim"* subsections → **5**; *"— Terminal disposition"* subsections → **5**; line 1 → `SERVED MODEL: claude-opus-5[1m]`; pre-written CC-019/020/021/023 entries → **0**. All six double-run identical.

#### Gate reading — BEFORE → AFTER

| gate | BEFORE (seat 0 open, HEAD `b42d775a`) | AFTER (committed blob `b5673ae0`; probes re-run post-commit at HEAD `e12eeb91`) | verdict |
|---|---|---|---|
| **HG-12** — nine tombstones, nine pasted probes — **the five executable rows** (`:282–298`) | `docs/tranches/X/W0/TOMBSTONES.md` **ABSENT**; 0/5 mandates quoted, 0/5 probes pasted, 0/5 dispositions named. All five probes reproducing RED-AS-EXPECTED | **5/5** complete: mandate quoted verbatim at its **minting** byte (16 anchors, all re-read, none drifted) · probe pasted **with** its output, each double-run identical · terminal disposition named with its ruling id where one exists. **Post-commit re-run, all five reproduce**: CC-015 **5/3** · CC-016 `139,287` + glass **7.0.0** · CC-017 `63240e67` vs `8ccf9f4d` · CC-018 `> _(empty — the owner's verdict lands here)_` · CC-022 kf **6.0.0** | **GREEN (the five-row half)** |

*The gate's falsifier (`:298` — "a tombstone whose pasted probe does not reproduce when re-run at wave close") is discharged by construction for this half: four of the five probes read tracked or installed bytes that no X-W0 unit may write, and the fifth reads `demo/`, which `W0.md:101` forbids to this entire wave. **No unit of X-W0 can move any of them** — so a non-reproduction at close would itself name a §File Bounds breach, which is a useful thing for this gate to be able to catch.*

**The remaining four rows are X-W0.g's, by the spec.** HG-12's full nine-row reading is not claimed here and is not claimable until that addendum lands.

#### Residuals

- **R-1 — HG-12 is HALF-GREEN at this unit's close, by design, not by shortfall.** The gate's denominator is nine; this unit owns five and turned five. The other four (CC-019/020/021/023) are assigned to X-W0.g at `W0.md:181` and their landing place — §4 of this same file — is written, named and empty.
- **R-2 — `emit()` in kf 6.0.0 is still subscribers-only (F7), and that is stated as a fact, not filed as a defect.** The PRM arm no longer depends on it, so DR-25's consumer-visible symptom is cured. No new row is minted on the emitter's shape: that is the producer's design and value.js has **0 direct kf imports** (U-F28). Recorded so a later seat reading `emit()` alone does not re-open a cured row.
- **R-3 — CC-015's D18 KEEP ruling is untouched.** This tombstone closes the *extirpation* mandate; it does not adjudicate the Blob instrument's future, which D18 rules and which no byte here disturbs.
- **R-4 — no product byte, no producer byte, no sibling byte was written.** `demo/`, `vite.config.ts`, `docs/precepts`, `node_modules/**` and `../keyframes.js` were **read and hashed only**; ⟨`git status --porcelain -- demo vite.config.ts docs/precepts`⟩ → **empty** at close.

#### Escalations returned — two docketed rows, neither blocking

**RS-1 · the DR-14 route names a wave whose §File Bounds do not contain the file.**
Not a challenge to the ruling — §0j.A's **DELETE** is transcribed and not re-opened. What is returned is a measured fact about its **route**. ⟨`grep -c 'vite.config' docs/tranches/X/waves/W1.md`⟩ → **0**; X-W1's §File Bounds `:143–170` holds `.github/workflows/{ci,deploy-pages}.yml` · `e2e/**` · `scripts/ci/*.mjs` · `scripts/visual/regenerate-goldens.mjs` · `playwright.config.ts` · `tsconfig.e2e.json` · `package.json` (scripts block only) · `docs/tranches/X/**` — **`vite.config.ts` absent**. ⟨`grep -n 'vite.config.ts' docs/tranches/X/waves/W5.md`⟩ → **`94:| \`vite.config.ts\` | modify-carve |`**. The sitting's own dossier states the premise at `SITTING-DOSSIER-2026-09-17.md:139–140` — *"the act routes to **X-W1** (the only wave holding a config carve)"* — and **that parenthetical does not hold at the authored bytes**: X-W1 holds a config carve, but not this file.
**The word wanted, in one sentence**: *does DR-14's DELETE land at X-W1 under a dated E-3 addendum widening its §File Bounds to `vite.config.ts`, or does it ride X-W5's existing `modify-carve` on that same file?* Either is a one-line act for the seat that owns it; **choosing is a routing decision, not a tombstone seat's.** **No wave file edited, no route re-written** (E-3 — §0j.A's bytes are immutable). Returned to X-W0.g's sitting packet as a docketed row, or to the owner directly.

**RS-2 · the precepts pin-bump is a new question, not the retired chronic.**
CC-017's chronic is retired and does not carry. What the measurement **created** is a distinct, small, reviewable question the record never asked because for six closes it believed it faced a fork: **value.js's `docs/precepts` is 16 commits behind the last-fetched `origin/main`** (`63240e67`@2026-05-27 → `b0f6134`@2026-07-17, *"precepts: truth-up against the glass-ui 7.0.0 surface"* — whose subject names the very glass major this repo installs). It is **not** the DR-15 carry (that was the peer's SHA and an event-bound trigger, both dead); it is one checkout plus a gitlink commit with a reviewable diff, on a path in **no** X wave's §File Bounds including this one. **No act taken.** Returned to X-W0.g's sitting packet as a docketed row, or to the owner directly.

*Neither is one of COHESION §0j.A's seven and neither may be presumed into them — the wave's standing law: anything owner-gated that §0j does not cover is an escalation returned, not a seat decision.*

---

### X-W0.j — The Glass-8 Repin Census Event (CC-003's trigger · CC-109 · CC-116 · CC-117) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 3 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.j" `:208–213` · §Scope 10 `:33` · §Blocked rows `:55` · **HG-18** `:325–332` · **§ADDENDUM 2026-08-30** `:413–489` · §Commit Plan row 9 `:379` · fold `X-W0-FOLD.md` **G-A** `:477–484` + rows **W0.3** `:138` / **W0.4** `:153` / **W0.18** `:413` / **W0.19** `:430` · **COHESION §0i.2** + **§0i.5** · runbook **§3.2**
**Artefact**: `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md` (created, 53,103 B)
**Commit**: **`ad240462`** — `docs(x-w0/glass8-census): the Glass-8 repin census returns FAIL 1-of-4 at the elected target 8.0.0, dated 2026-09-17` · ONE commit, as locked · body required and present · **1 file changed**, verified ⟨`git diff-tree --no-commit-id --name-only -r ad240462 | wc -l`⟩ → **1**; ⟨`… | grep -vc '^docs/'`⟩ → **0**; ⟨`… | grep -c 'registry/adjudicated/'`⟩ → **0** (fold G-H); ⟨`… | grep -c 'dev.sh'`⟩ → **0**

> ## **THE VERDICT: FAIL — 1 of 4 at the elected target 8.0.0.** X-W4.g stays **CLOSED**, the bank stays shut, and no byte of the cut was performed.

**HEAD at open** `456c3422` · **at close** `e12eeb91` (moved by concurrent sibling seats; none of this unit's). **Clock**: open `13:35:51 EDT`, close `13:47:17 EDT`.

#### Acts, in order

**A1 · MEASURE-AT-OPEN — the four conditions, read-only against installed bytes, every figure double-run.**
⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → **`7.0.0`** (double-run `7.0.0`) · ⟨`grep -n '@mkbabb/glass-ui' package.json`⟩ → `83: "@mkbabb/glass-ui": "^7.0.0",` → **c1 FAIL**.
⟨`node -p "Object.keys(…exports).filter(k=>/watercolor/.test(k)).join(',')||'ABSENT'"`⟩ → **`./watercolor-dot`** (double-run identical) → **c2 FAIL** — HG-18's own falsifier firing as designed (*"probe 2 prints the subpath, naming the failure"*). Packed target: `{"types":"./dist/watercolor-dot.d.ts","import":"./dist/watercolor-dot.js"}`; export surface **74** subpaths.
⟨`grep -rn indicator node_modules/@mkbabb/glass-ui/dist --include='*.d.ts' | grep -ic slot`⟩ → **`0`** (double-run `0`) → **c3 FAIL**. Every `indicator` hit in the `.d.ts` surface is the producer-owned *traveling selection* indicator (`useSelectionIndicator` / `useSelectionGroup` / `useDragMorph` / `--tab-indicator-*`), not a consumer-paintable slot. Packed half also probed: `select.js` → `renderSlot` **0** · `indicator` **0** · `hideIndicator` **0** · `select-dot-color` **0**.
**c4 measured TARGET-RELATIVE** (§ADDENDUM clause 3) — see A3.

**A2 · The §ADDENDUM datum, recorded BESIDE the four — not a fifth condition, does not gate.**
⟨`npm view @mkbabb/glass-ui@8.0.0 version`⟩ → **`8.0.0`** · ⟨`npm view @mkbabb/glass-ui version`⟩ → **`8.0.0`** (`latest`) → **8.0.0 REGISTRY-RESOLVABLE**.
⟨`npm view @mkbabb/glass-ui@9.0.0 version`⟩ → `npm error code E404` / *"The requested resource '@mkbabb/glass-ui@9.0.0' could not be found…"* · ⟨`git -C ../glass-ui tag --list v9.0.0`⟩ → `v9.0.0` → **9.0.0 TAG-ONLY**.
⟨`git -C ../glass-ui rev-parse --short=8 'v8.0.0^{commit}'`⟩ → **`17a11bc5`** · ⟨`… 'v9.0.0^{commit}'`⟩ → **`d4f7b24f`** — both exactly as §0i.2 and I-30 state them.
> **A trap measured and written down so the next seat does not fall into it**: ⟨`git -C ../glass-ui show-ref --tags | grep -E 'v8\.0\.0|v9\.0\.0'`⟩ returns `478aa462…` / `6d71e663…` — the **annotated-tag objects**, not the commits. A seat reading `show-ref` or a bare `rev-parse` would report two hashes matching no ruling and mint a phantom drift. Only `^{commit}` resolves the ruled pair. Recorded at §3 of the census.

**A3 · Condition 4, measured at the condition's own words — and it moved.** The condition reads *"the Glass receipt **names its keyboard/orientation/motion contract**"*. Measured per candidate:
- **8.0.0 (elected)**: the value.js-addressed letter **I-28** (`../glass-ui/docs/tranches/BJ/coordination/glass-outbound-2026-08-09-value.js-8.0.0-addendum.md`, ⟨`wc -c`⟩ **7,514 B**, ⟨`shasum -a 256 | cut -c1-12`⟩ **`22b83a975e4b`**) names **keyboard 0 · orientation 0 · motion 0** — it is a consumer-edge addendum, **not** the release receipt. The release receipt is `../glass-ui/MIGRATION.md` **§8.0.0** (`:114–624`), measured over exactly that range ⟨`awk 'NR>=114 && NR<=624' … | grep -ci <word>`⟩ → **keyboard 2** (`:433`, `:599`) · **orientation 2** (`:252`, `:262`) · **motion 1** (`:198`). → **c4 PASS**.
- **9.0.0 (not elected)**: its own named datum — the I-30 ACK calls `MIGRATION.md` §9.0.0 *"the re-read datum"* — measured at `:8–49` → **keyboard 0 · orientation 0 · motion 0**. → **c4 FAIL**.
> **Finding, recorded not smoothed (census R-j2).** Seat 0's baseline read c4 as receipt-**existence** (PASS both candidates). At the condition's words it is receipt-**content**. **8.0.0's verdict is unchanged (PASS)**; **9.0.0 flips to FAIL**, so the 9.0.0 row reads **0/4** here against the baseline's 1/4. No ruling moves — the datum *strengthens* §0i.2's receipt (4) at bytes §0i.2 did not cite, and an 8.0.0 receipt never discharges a 9.0.0 election (§ADDENDUM 3).

**A4 · The election — CITED, never re-made.** COHESION **§0i.2** quoted verbatim in the census (*"Ruled: 8.0.0 … registry-pinned (`v8.0.0` @ `17a11bc5`)"*) with **§0i.5's erratum carried** (receipt (3) overstated the `./search` break — X-EXT-1 already budgets the four `SearchBar` sites inside the X-W4.g cut; the ruling rests on receipts (1), (2) and (4) alone). §0i.2's re-trigger clause recorded: 9.0.0 re-enters the enumeration *"the moment `npm view @mkbabb/glass-ui version` returns 9.0.0"* — at this clock it returns **8.0.0**, so the re-trigger has **not** fired.

**A5 · G-A — the FAIL branch ENUMERATED by id.** ⟨`grep -ro 'X[-.]W4\.g' docs/tranches/V/megatranche/registry/adjudicated/*.md | wc -l`⟩ → **62** (double-run **62**) across ⟨`grep -rl … | wc -l`⟩ → **10** records — the fold's 2026-08-28 born-RED **reproduces exactly, 20 days on**. Decomposed and published: **54 distinct sites** ⟨`… | cut -d: -f1,2 | sort -u | wc -l`⟩ + **8 extras on 7 lines** ⟨`… | uniq -c | awk '$1>1'`⟩ = **62**; **41 id-bearing dispositions + 21 non-row sites** (instruments blocks, route legends, wave-authority headers, closing-verdict restatements, reader prose) = **62**; **32 distinct row ids**. Every one of the 62 is named in §5.2 with its record, line, class, its disposition quoted at its own bytes, and its **FAIL home**, and §5.3 re-derives the per-record count against `grep -roc` — **ten rows, ten ✓, total 62**.
**Five FAIL homes, no sixth, nothing homeless**: **MX-CLUSTER** (17 ids: MX-1/2/3/32/41 · MP-4/5 · MR-1/10 · MSS-1/19/20/21/22/23 · C-1≡D-5(A)≡DC-2 · DD-5) · **EY-CLUSTER** (EY-7/27/32) · **GEN-CLUSTER** (GEN-2/8/28) · **unclustered NO-WAVE-OWNER** (EC-2/3/22 · ES-15/20) · **the §1.M bank or the X-W0.g sitting** (AB-15→CC-113 · AP-17 + R-8 → the CSP G-PAINT register + the sitting · MSS-1's fold limb → CC-044 · K-14 = a standing kill, no booking owed and none invented). Each home is quoted from the record that mints it — `wb-generate-pane.md:38` (*"on FAIL they join the cluster"*), `wb-mix-animationcanvas.md:167` (*"falling to MX-CLUSTER if the census never fires"*), `wb-extract-imageeyedropper.md:34`, `wb-mix-resultdisplay.md:37`, `wb-extract-controls.md:35`.

**A6 · Fold W0.3 — the receiving-bounds delta, published (it is owed on FAIL exactly as on PASS).** ⟨`grep -rn 'slider-track-bg' demo/ src/`⟩ → **8** hits = **5 live bindings in 4 files** + 3 comment restatements. Against `W4.md:159–172` (X.W4.g's 13-row bounds table): `GenerateControls.vue` is held **but at `:203`, not the `:305` site**; **`ExtractControls.vue:32,75` · `ConfigSliderPane.vue:202` · `ComponentSliders.vue:197` are held by NO X-W4.g row**. And ⟨`grep -rl 'ExtractControls' docs/tranches/X/waves/W*.md`⟩ → `W7.md` · `W8.md`, **both prose** — `W7.md:539` a comparand, `W8.md:106` an **explicit out-of-bounds exclusion** (*"the slider import line in those files is in bounds; **the CSS var is not**"*) that routes all five sites to X-W4.g. **The fold's MAJOR reproduces exactly: on a PASS the cut would be unexecutable against three of its four subject files.** Two further bank subjects measured while there: **CC-106**'s `useSliderAnnouncements.ts` and **CC-115**'s `coalesce-metric.ts` are in no X-W4.g bounds row either (⟨`grep -rl 'coalesce-metric' waves/W*.md`⟩ → **NONE**). **Published and routed to the X-W0.g sitting** — beside AuroraPane `:35`/`:173`'s kindred CC-105 ⇄ G-PAINT reconciliation — and standing as a **precondition on any future PASS**. `W4.md` was **read, never written**.
Both the ×4 and the ×5 figure are stated, neither silently elected (runbook §3.2's own posture for X-EXT-4): **4 files**, **5 live sites**, because `ExtractControls.vue` carries two.

**A7 · Fold W0.18 — c3's consumer witness, re-measured at this seat's clock.** ⟨`grep -rn 'select-dot-color' node_modules/@mkbabb/glass-ui/dist`⟩ → `select-BcBAyLXA.js:283` inks `background-color: var(--select-dot-color, var(--glass-accent, currentColor))`; ⟨`grep -rn 'glass-accent' …/dist/styles | grep initial-value`⟩ → `styles/tokens/property-regs.css:1` — `@property --glass-accent { syntax: "<color>"; inherits: true; **initial-value: transparent**; }`. **The chain can never fall through**: `currentColor` is unreachable, so the selected option's marker paints **zero pixels for every consumer** unless the consumer sets `--select-dot-color`. Condition 3 therefore measures the right thing — a slot that lets a consumer **paint**, not merely a gutter that can be hidden. **No relay byte written**; the producer question rides the standing BH relay at X-W9's coordination step, per W0.18. glass-ui READ-ONLY throughout.

**A8 · Fold W0.19 — cited, NOT inherited.** All six corroborations re-run by this seat on `dist/watercolor-dot.js` (4,560 B, sha256 `db2de914e6978214`): `inheritAttrs: !1` ✓ · `renderSlot` **0** ✓ · `aria-hidden": "true"` **×3** ✓ · `pointerEvents: "none"` ✓ · no `"tag"` prop (**0**) ✓ · `useAttrs()` **1**, class/style-only ✓ · `./watercolor-dot` still in packed exports ✓ — **six-for-six plus the export, no drift 2026-08-04 → 2026-09-17**.
> **One honest spelling correction, recorded rather than smoothed over**: the corroborating seats quote the minified `inheritAttrs:!1`; the installed bytes read `inheritAttrs: !1` (one space), so a literal grep for the quoted string returns **0** and reads as a drift. **It is not one** — the dist at this pin is unminified and the fact is identical. Written down so a later seat re-running the quoted string does not mint a phantom regression.

**A9 · The consumer-side FAIL consequence, measured (context, not a fifth condition).** ⟨`grep -rn 'glass-ui/watercolor-dot' demo/ | wc -l`⟩ → **11**; ⟨`grep -rln … | wc -l`⟩ → **11** (double-run **11**/**11**) — exactly the eleven SFCs `W4.md:310–318` sizes the cut for. **X.W4.g's G1 born-RED (11) reproduces exactly at 2026-09-17.** Not one of them touched.

**A10 · The rows discharged.** **CC-109** (`CARRY-CUT-LEDGER.md:221`) and **CC-116** (`:228`) are **DISCHARGED BY THE VERDICT ITSELF** — the ledger gives their value action as exactly this census, the census was held and dated, the **31/31 receipt verdicts stand as received with zero silent drops**, and neither mints a value wave row. **CC-117's terminal word, stated ONCE** in the census at §9.3: **evidence-only · FOLD → coordination INBOX row I-24 · no value act · no X wave row** — X-W11 G1's 117-row walk reads it from that line. The fold target verified live: ⟨`grep -n '^| I-24 \|^| I-24a ' docs/tranches/V/coordination/INBOX.md`⟩ → `93:` (RECONCILED 2026-08-03) and `95:` (I-24a, the 16-not-5 undercount correction) — **the FOLD is not a pointer into nothing.**

**A11 · MEASURE-AT-CLOSE (HG-18 `:331` — *"and again at close; the verdict is dated, never inherited"*).** All four probes plus the datum and the G-A denominator re-run at `13:47:17 EDT` on settled bytes: `7.0.0` · `^7.0.0` · `./watercolor-dot` · `0` · `2/2/1` (§8.0.0) · `0/0/0` (§9.0.0) · `npm view` → `8.0.0` · `@9.0.0` → `E404` · `62` / `10`. **Nothing moved. The close verdict equals the open verdict.**

**A12 · Landing.** ⟨`git diff --check -- docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md`⟩ → clean, exit 0. Staged by exact pathspec, one argument. ⟨`git diff --cached --name-only`⟩ → one line. One commit with the required body (why · what · the four per-candidate values · the X-W4.g disposition · gates · discharges · fold rows · residuals). `scripts/dev/dev.sh` never touched, never staged.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (seat-0 baseline, 2026-09-17 open) | AFTER (this unit, `ad240462`) | verdict |
|---|---|---|---|
| **HG-18** — a dated four-condition verdict with measured values, per candidate | file **ABSENT**; census **1/4** measured but **unrecorded**; no elected target named in any artefact; no close re-run | `GLASS8-REPIN-CENSUS.md` carries **all four probes pasted with their outputs**, each measured value beside its PASS/FAIL, **per candidate** (8.0.0 **1/4** · 9.0.0 **0/4**), the **elected target named and cited** (§0i.2 + §0i.5, never re-elected), the §ADDENDUM registry/tag datum **beside** the four and **not gating**, one verdict word (**FAIL**), the X-W4.g disposition (**CLOSED**), and the **re-run at close** (§10, identical) | **GREEN** |
| **G-A** (fold, sharpens HG-18) — the FAIL branch enumerated, not merely recorded | **62** dispositions / **10** records, **none enumerated anywhere** | all **62** named by id with FAIL homes (§5.2), the per-record count re-derived against `grep -roc` (§5.3, ten ✓), **32** distinct row ids listed in one greppable line, **5** FAIL homes each quoted from the record that mints it | **GREEN** |

**Cross-gate note (not this unit's to turn)**: X.W4.g's **G1** born-RED — 11 `watercolor-dot` imports — was re-measured read-only at **11/11** (A9). It is measured *at fire*, never inherited (`W4.md:322`); this is a dated corroboration for the closed branch, not a gate reading.

#### Residuals

- **R-j1 — the `glass8-census-2026-08-XX.txt` sidecar is NOT banked by this unit, by bounds.** §Verification Artefacts `:361` names `docs/tranches/X/artefacts/W0/glass8-census-2026-08-XX.txt`; that path is **not in §File Bounds `:73–99`**, and §Disjointness `:117` confines this unit to *"`X/W0/GLASS8-REPIN-CENSUS.md` only"*. ⟨`ls docs/tranches/X/artefacts/W0/`⟩ → **No such file or directory** — no seat of this wave has banked there. **All four probes are pasted verbatim with their outputs inside the census (§2) and re-run at §10**, so HG-18's evidentiary requirement is met in-file; the *banking* of the sidecar is left to the wave's close seat rather than written out of bounds. **Reported, not taken.**
- **R-j2 — condition 4's reading moved under measurement** (A3): receipt-**existence** → receipt-**content**. 8.0.0 unmoved (PASS); 9.0.0 flips to FAIL, so its row reads 0/4 here against the baseline's 1/4. Dated finding, not an unexplained delta between two of this wave's own files.
- **R-j3 — the receiving-bounds delta is a MAJOR that a FAIL does not cure** (A6). Routed to the X-W0.g sitting; a precondition on any future PASS.
- **R-j4 — the 11-vs-7 bank arithmetic, both figures stated.** `W0.md:210`/`:471` say the trigger gates *"eleven banked rows"*; §Blocked rows `:55` names **seven** cut rows. Measured at `CARRY-CUT-LEDGER.md:270`: BLOCKED-ON = **11**, and the four-row difference — **CC-107** (*"BLOCKED-ON TR#47's dock publish"*) · **CC-110** (*"TR#47's resolution"*) · **CC-111** (TR#68) · **CC-112** (TR#78) — is gated on **other producer events, not this census**. So **11** is the §1.M BLOCKED-ON total and **7** is the set this FAIL holds shut; the four are neither released nor further blocked by this verdict. Both figures published, neither silently elected; **no spec byte edited** (E-3).

#### Escalations

**None.** The specified cure was executable exactly as written at the true bytes: the four conditions ran read-only, the verdict is dated and complete at the FAIL polarity, and both gates turned inside the unit's one-file writable set. The one bounds-shaped item (R-j1) is a **reported residual, not an escalation** — HG-18's evidentiary requirement is satisfied in-file, so nothing this unit owed went unpaid.

#### What this unit did NOT do

Zero product bytes. No `watercolor-dot` deletion, no shim, no wrapper, no copied selector — **§Triumvirate Dispatch bullet 5 is honoured and verified at the commit** (1 file, `docs/` only). `package.json` and `node_modules/@mkbabb/glass-ui/**` **read and hashed only** — the only `npm` invocations were `view` (read-only); no install, no repin. `../glass-ui` **read-only** (`MIGRATION.md`, the BJ/BK letters, `git tag`/`rev-parse`) and **no relay byte written**. `docs/tranches/X/waves/W4.md` **read, never written**. `registry/adjudicated/**` **read-only** (fold G-H: the commit's intersection with it is **0**). `scripts/dev/dev.sh` **never touched, never staged**.

---

### X-W0.i — The V·L5 Routing-Law Retirement (CC-011 / C-13) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · group 3 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.i" `:201–206` · §Scope 9 `:32` · **HG-17** `:320–323` · §File Bounds `:87–94` · §Format And Lint Cadence `:343` · §Commit Plan row 8 `:378`
**Rulings consumed**: COHESION `§0j` preamble (the begin-word). **§0j rules no row of this unit** — nothing owner-gated arose; §0j.F's branch-topology word is X-W1/X-W11's, not this carve's.
**Artefact**: `docs/tranches/X/W0/ROUTING-LAW-V-L5.md` (created — the path `W11.md:372` says X-W11 G1 reads and authors none of)
**Commits**: **`2012dbfa`** — `docs(x-w0/routing-law): CC-011 RETIRED — the six law-bearing V-L5 sites rewritten to V·L1..V·L4 -> X-W9 -> X-W11` · ONE commit, the locked family whole (rewritten laws + DAG node ids + §0 alias + tombstone), body required and written · **8 files, 129 insertions, 37 deletions**; **`379d011c`** — `docs(x-w0/routing-law): tombstone §9 — the post-commit re-measure, 57 not the projected 56` · 1 file, the dated addendum-beside the WRITE-THEN-MEASURE law required
**HEAD at open**: `a0d392dc` ⟨`git log --oneline -1`⟩

#### Acts, in order

**I1 · Enumerate at open, and the probe's own defect measured before trusting it.** The unit's probe ⟨`git ls-files docs/ | xargs grep -ln 'V·L5\|V\.L5' | wc -l`⟩ → **61** (double-run **61**). It emits `grep: … No such file or directory` on **3** tracked `docs/` paths containing spaces ⟨`git ls-files docs/ | grep -c ' '`⟩ → **3**; re-run NUL-safe ⟨`git ls-files -z docs/ | xargs -0 grep -lI 'V·L5\|V\.L5' | wc -l`⟩ → **61**, identical. **The errors are stderr noise, not a miscount** — stated rather than left for a later seat to re-discover. Frozen to a scratchpad listing before any edit.

**I2 · The delta, stated and not chased (the seat brief's explicit charge).** Three readings, three clocks: spec born-RED (2026-08-03) = **35** — 19 frozen · 2 provenance · 2 X-tranche · 12 live-V; **seat 0 at this wave's open** (`:72`) = **57**; **this seat, hours later** = **61** — frozen **20** · provenance **2** · X-tranche **22** · live-V **17**. **The 57 → 61 is four more X-tranche records tracked by sibling seats between the two measurements**, which is the same live-census effect X-W0.a's CR-4 wrote the closure rule for; the seat brief's 57 is not stale, it is a reading at its own clock, and both fall in the read-only class. **The +20 is this tranche's own authoring traffic** — twelve wave specs, the fold, the union seams, four conformance passes, two execution records — every one **read-only by rule**. The +5 live-V are restatement class, and two of them *blockquote the commission's sentence verbatim* (`formation/fourier/lane-docs.md:333` opens `> *"routing law absolute: …"`; `formation/keyframes/CENSUS-2026-08-03.md:189`); the other three are `registry/harvest/wf_*.json` payloads plus one. **The write set never moved**: the same six law-bearing sites HG-17 `:322` named, each verified live at its own anchor before a byte was written.

**I3 · The defect diagnosed at the bytes, not inherited from the row.** The row's gist (*"used in 5 docs, defined in none; silent `·`→`.` glyph drift"*) is true, and the mechanism beneath it is sharper: the minted DAG spine conflated the **layout** band `V·L1..V·L4` — real, adjudicated, four waves (`registry/adjudicated/layout-gestalt.md:411,448,491,533`; sequencing rider `:402` *"Preferred order V·L1 → V·L2 → V·L3 → V·L4"*) — with an invented **library/parser** chain `V.L1..V.L6` carrying a release routing. Probes: ⟨`grep -c 'V·L5\|V\.L5' registry/adjudicated/layout-gestalt.md`⟩ → **0**; widened, ⟨`ls registry/adjudicated/*.md | wc -l`⟩ → **231** and ⟨`grep -l 'V·L5\|V\.L5' registry/adjudicated/*.md | wc -l`⟩ → **0**. **Zero of 231 adjudicated records defines it.** HG-17 cites `STATE.md:88` for the counter-authority; it resolves at **`:97`** (repeated `:102`) — a dated anchor drift inside a generated table, recorded so no later seat cites `:88`.

**I4 · The new cut taken from the ledger's own dispositions, not invented.** `V·L1..V·L4 → X-W9 → X-W11`, with both terms defined: ⟨`head -1 docs/tranches/X/waves/W9.md`⟩ → `# X.W9 - Parser and library apotheosis (the 4.1 cut)`; ⟨`head -1 …/W11.md`⟩ → `# X.W11 - Release and Verified Close`. The ledger had already homed exactly this work there — **CC-008** (`V·MT7`, *"parser + library apotheosis; small, total, consumer-proven 4.1 surface"*) → **FOLD → X-W9**; **CC-010** (`V·MT9 · V·C6`, *"release + verified close"*) → **FOLD → X-W11**. The cut is therefore **transcribed from canon**, which is the difference between naming a wave and minting one.

**I5 · The six sites carved.** Token counts before → after, per site: `PARSER-RESURRECTION-HANDOFF-2026-07-31.md` **1→0** · `CONSTELLATION-COMMISSION-2026-08-03.md` **1→0** · `coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` **1→0** · DAG `.md` **6→0** · DAG `.json` **10→0** · `validate-constellation-dag.mjs` **8→0**. Each carries a **dated carve note** naming X-W0.i / CC-011 / C-13 and pointing at the tombstone, and each reads the law literally ⟨`grep -c` per site⟩: `X-W9` ≥1 · `X-W11` ≥1 · `V·L1..V·L4` ≥1 at **6 of 6**.

> **The carve notes deliberately do not re-spell the retired label.** HG-17 `:321` makes residual hits legal only in named read-only classes, and *a law-bearing site is not one of them*. A note that quoted the dead identifier would leave the very grep the gate reads still naming the file it just cured. The verbatim minted text lives in the tombstone's §2, its sanctioned home, all six statements quoted from the **committed blobs at `a0d392dc`** rather than from working-tree bytes.

**I6 · The graph, moved by rule.** Nodes **130 → 131**, edges **177 → 178**. `V.L5.candidate` → `V.X.W9.candidate`; `V.L5` → `V.X.W9`; **`V.X.W11` minted** — `P.exec.release`'s `released-rebind` edge had been pointing at a wave that did not exist, and *released rebind* is X-W11's own definition. The `V.L2 → V.L5 → V.L4` sandwich becomes `V.L3 → V.L4 → V.X.W9 → V.X.W11`, which is the adjudicated band's own linear order, so **`V.L4` keeps a predecessor** rather than being orphaned by the removal. The forbidden-edge guard is **preserved, not dropped**: `V.L5 → V.L6` becomes `V.X.W9 → V.L6`, so `V.L6` still closes only through `V.L3` + `V.L4`. The two `wrongAnswerMutants` prose rows (M06, M16) that spell the old spine are restated in the same commit — a stale mutant description is a silent lie about what the harness checks.

> **Why `V.X.W9` and not `X.W9`.** In this graph the first segment is the repository (`P.` `V.` `K.` `F.`) and **`X.` is already the constellation-root namespace** (`X.constellation.cleanA/cleanB/rehash`, `X.formation-close`). A bare `X.W9` would read as a root node and re-introduce, one field over, the exact ambiguity this row exists to end. The middot form is canonical prose; the period form is the registered alias.

**I7 · The alias registered — §0 clause 7, not a rename.** `CARRY-CUT-LEDGER.md` §0 gains clause **7**: the middot is canonical, the period form is that identifier's **search alias**, the two spellings name one identifier, the canonical probe `grep -n 'V·Ln\|V\.Ln'` is written down, and machine ids in the constellation graph keep the graph's period grammar and resolve through the clause. **L-5 honoured to the letter**: `CC-011`, `V·L1`, `V·L2`, `V·L3`, `V·L4`, `V·L6` **all keep their ids**. CC-011's disposition cell is updated to **RETIRE — EXECUTED**, and its **original-ID cell keeps the retired label**, which is why the token still greps in the ledger — a deliberate, law-required residual, stated in the tombstone §5 and §7.4 rather than silently tolerated.

**I8 · HG-17's executable limb, and the pre-existing wall in front of it.** ⟨`node docs/tranches/V/megatranche/workflows/validate-constellation-dag.mjs`⟩ runs before and after with **byte-identical output**: `ok:false`, exit 1, **one** base error — `V.form.packet-post-CA01 evidence bytes do not match /Users/mkbabb/.codex/worktrees/7e28/…/VALUE-FORMATION-PACKET-2026-07-29.md`. That error short-circuits at `:585`, **before** the 29 mutants, so at HEAD the harness certifies nothing — and it did not before this unit either. It is **X-W0.d's K-13 standing exception seen from the other end**: `.d` re-verified that packet at `d07b6ddc…` / 63,572 B *"adopted AS-FOUND, sole extant version"*, while the graph records `359262b6…`. `~/.codex/**` is read/hash-only (M-21 §2) and the DAG's evidence block is not in this carve.

**I9 · So the structural half was proved read-only, rather than asserted.** HEAD's blobs and the carved bytes were each copied to the session scratchpad; the **one** drifted digest was corrected **in the copies only**; the validator ran against both.

| | nodes | edges | mutants | all rejected | `ok` | exit |
|---|---:|---:|---:|---|---|---|
| BEFORE (blobs at `a0d392dc`) | 130 | 177 | 29 | **true** | `true` | 0 |
| AFTER (carved bytes) | **131** | **178** | **29** | **true** | `true` | 0 |

Double-run identical on both sides ⟨`cmp -s`⟩; ⟨`git status --porcelain -- docs/tranches/V/megatranche/`⟩ shows the repository untouched by the harness. **The falsifier moves with the cure instead of vanishing** — M16's first error reads `missing V.L5.candidate -> V.L4.candidate` before and **`missing V.L4.candidate -> V.X.W9.candidate`** after; M06's is unchanged. The re-run was repeated after the `valueRoutingLaw` key was added to the JSON: still **29/29 rejected, `ok:true`**.

**I10 · Landing, and the shared-index guard.** Staged by exact pathspec, **eight** arguments; ⟨`git diff --cached --name-only | wc -l`⟩ → **8**, zero foreign. Committed **with the pathspec on the commit itself** ⟨`git commit … -- <8 paths>`⟩ because X-W0.e `:402` and X-W0.b `:433` both recorded a concurrent Track seat's work being swept into another unit's commit. Result ⟨`git diff-tree --no-commit-id --name-only -r 2012dbfa`⟩ → **8** paths · non-`docs/` **0** · `registry/adjudicated/` **0** (fold **G-H**) · `codex-worktree-7e28` **0** · `dev.sh` **0**. ⟨`git diff --check`⟩ clean on all seven modified paths. **Three files modified by the concurrent X·KF seat** (`formation/keyframes/CENSUS-2026-08-03.md`, `lane-frontend.md`, `lane-library.md`) sat dirty in the tree throughout and were **never staged** — one of them is itself a read-only-class token carrier.

**I11 · WRITE-THEN-MEASURE caught my own published figure.** §5 of the tombstone projected **56** at the landed commit (55 + itself); the settled tree reads **57**, double-run. ⟨`comm -13 open post`⟩ names the two additions exactly: this tombstone (mine, the sanctioned class) and `docs/tranches/X/parse-that/waves/W0-CLOSE.md`, tracked by the concurrent **X·P (Track D)** seat ⟨`git log --oneline -1 -- <it>`⟩ → `76e727be`, not in `2012dbfa`. **This unit added exactly one file to the census; the denominator moved by two because a sibling track was authoring in the same minutes** — X-W0.a's CR-2/CR-4 measured live a third time. Corrected in the tombstone by a **dated §9 addendum-beside** (`379d011c`), never by rewriting §5's landed bytes.

#### Gate reading — BEFORE → AFTER

| gate | BEFORE (open, HEAD `a0d392dc`) | AFTER (settled bytes, `379d011c`) | verdict |
|---|---|---|---|
| **HG-17** — the V·L5 routing law is retired against defined waves | **61** tracked files carry the token; **6 law-bearing sites live**, each at its verified anchor; **0 of 6** read the new law; `validate-constellation-dag.mjs` carries **8** `V.L5` node identifiers; no tombstone exists; no alias registered | law-bearing sites carrying the token **0**; **6 of 6** read `V·L1..V·L4 → X-W9 → X-W11` literally; validator `V.L5` node identifiers **0** ⟨double-run⟩ and it still **runs** with byte-identical output; tombstone landed with the minted law quoted verbatim from the open blobs, both no-definition probes pasted (0-of-1 and **0-of-231**) and the terminal disposition named; §0 clause 7 registers the period-form alias with zero renames; residual **57** hits all inside a class `:321` names | **GREEN** |

*The gate's falsifiers were executed, not paraphrased.* (a) *"re-glyph one `V·Ln` to the period form without registering the alias and the alias probe names the file"* — discharged by §0 clause 7, which declares the two spellings one identifier and writes the canonical two-spelling probe into the ledger. (b) *"Curing a citation inside a 7e28 copy instead fails HG-9's digest re-hash"* — measured: **20** frozen copies carry the token, ⟨`git status --porcelain -- …/codex-worktree-7e28/`⟩ → **empty**, and the commit's intersection with that tree is **0**. X-W0.d's R-1 predicted exactly this check at `:317`, and it holds.

**§Format And Lint Cadence `:343`** — *"`node …/validate-constellation-dag.mjs` after batch 3 — X-W0.i's node rewrite must leave the DAG runnable"*: **runnable**, re-run twice at the settled bytes, output identical to the pre-carve run to the byte. `npm run lint` / `vue-tsc` intentionally skipped per `:346` — this unit wrote **zero** `.ts`/`.vue`/`.css` bytes; the replacement evidence is that script gate plus `git diff --check`.

#### Cross-track receipt — X.P.W1's **R-18** trigger has fired

`X/parse-that/waves/W0-CLOSE.md:559` states that when this carve lands, `EVIDENCE-CHAIN.md` §7 takes a dated addendum beside and **§5's verbatim quotation is never rewritten**, recording both digests as dated coordinates. Supplying the second one so that seat measures rather than re-derives — subject `docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md`:

| coordinate | commit | sha256 |
|---|---|---|
| pre-carve (the X.P.W0 close reading) | `61217711` | `ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7` |
| **post-carve** | **`2012dbfa`** (= HEAD) | **`10a12719772f2aa954469450b2c3f1ab468519949fe4f5c8dcbfecabb83e7171`** |

11,163 bytes. §3.1/§3.2/§3.3 pause coordinates are **untouched** — the diff lands entirely in §2's chain block plus one new dated paragraph beside it, which is the shape X.P.W0's addendum already adjudicated as lawful. **Do not read the digest change as a G-1 MISMATCH**; it is an authored amendment by the wave that owns the rewrite, as that seat itself wrote.

#### Residuals

- **R-1 — the DAG's `V.form.packet-post-CA01` evidence digest is stale, and it gates the whole validator.** `359262b6…` recorded vs `d07b6ddc…` as-found. Pre-existing and byte-identical before and after this unit; outside the carve; `~/.codex/**` is read/hash-only. Consequence stated plainly: **the executable encoding certifies nothing at HEAD** until it is cured, which is why I9's harness exists. **Routed to X-W11's 117-row walk or the L-18 passes; no act taken.**
- **R-2 — `V.L6` carries the identical shape.** ⟨`grep -l 'V·L6\|V\.L6' registry/adjudicated/*.md | wc -l`⟩ → **0** of 231, and `STATE.md:97` names **four** waves, not six. It is **not** in HG-17's write set and was **not** touched — CC-011 is about one label, and widening the carve here would be the seat inventing scope. **Named so the next census meets it as a row, not a surprise.**
- **R-3 — `V.L1` still carries a parser-consumer role in the graph** (`V.L1.candidate` typed `candidate-consumer-milestone`; `P.exec.release → V.L1` typed `released-rebind`) although `V·L1` is the **block-law layout wave**. Same conflation, at the node the carve did not reach. Outside the write set; **recorded, untouched**.
- **R-4 — `docs/tranches/X/artefacts/W0/` was not written**, so `vl5-sites-open.txt` / `vl5-sites-close.txt` (`W0.md:360`) do not exist as files. That directory appears in **no** unit's writable set: §File Bounds `:73–99` does not list it, and §Agent Units `:205` names only the tombstone, the six sites and the ledger. Both enumerations — with the probe, the six-class classification and the set-difference both ways — are carried in the tombstone's **§5 and §9** instead. The bounds gap is a spec finding returned here; a seat writing outside its hard bound to satisfy a §Verification Artefacts line would be the larger defect.
- **R-5 — one dated anchor drift.** HG-17 cites `STATE.md:88`; the sentence resolves at **`:97`** (repeated `:102`). Byte-identical text, generated table, recorded so no seat cites the stale number.
- **R-6 — mail was not swept by this unit.** E13 binds the **wave's** close, not a unit's; seat 0's **I-31** (UNREAD) and the four-path round are X-W0's close obligation and remain exactly as seat 0 left them. Nothing in this carve touches a coordination path.

#### Escalations

**None.** Every limb of HG-17 was executable at the bytes exactly as the spec specifies. The six anchors were verified live before writing (one — `STATE.md:88` → `:97` — had drifted and the INTENT was taken at the true bytes and recorded, per METHOD). No specified cure was impossible; no substitute was written; no owner-gated question arose that COHESION §0j does not already rule. Nothing outside the eight-path writable set was written, and the two facts that brush against bounds (R-4's artefacts directory, R-1's `~/.codex` digest) are **reported residuals**, not seat decisions.

#### What this unit did NOT do

Zero product bytes; zero `src/ demo/ api/ test/ e2e/ .github/ scripts/ node_modules/` paths in either commit. **No frozen 7e28 copy edited** (the §Triumvirate Dispatch bullet-5 trap: *"curing a `V·L5` citation by editing a frozen 7e28 copy … fails HG-9 instead"*) — 20 carry the token, 0 were written. **No `registry/adjudicated/**` byte** (fold G-H: intersection **0**). **No identifier renamed** — the alias is a search key (L-5); `CC-011` and `V·L1..V·L4`/`V·L6` keep their ids, and CC-011's original-ID cell deliberately keeps the retired label. **No dated restatement record patched** — the ten epoch-rule records take the alias, not an edit. **No X-W0.g row pre-empted**: the ledger edit is confined to §0 clause 7 and CC-011's row, leaving the seven owner rows' disposition cells untouched for `.g` (§Disjointness `:119`). `scripts/dev/dev.sh` never touched, never staged.

---

### X-W0.c — Completeness Toolchain Admission and the Challenged Denominator (CC-025 + CC-001's gate half) — **PARTIAL · HG-7 ESCALATED**

**Seat**: Opus (`claude-opus-5[1m]`) · group 4 · 2026-09-17
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.c" `:158–163` · §Scope 3 `:26` · **HG-6** `:246–249` · **HG-7** `:251–259` · **HG-8** `:261–264` · §Format And Lint Cadence `:341` · §Commit Plan row 5 `:375` · fold `X-W0-FOLD.md` **G-D** `:504–511` · §3 **BoundsDelta 3** `:563` (+ W0.10 `:260` · W0.11 `:281` · W0.14 `:329`)
**Rulings consumed**: COHESION `§0j` preamble (the begin-word). **§0j rules no row of this unit**; the one question this unit raises that §0j does not answer is returned as an escalation, not decided.
**Artefacts**: `workflows/hydrate-reports.mjs` + `workflows/validate-completeness.mjs` (modify-carve) · `registry/HYDRATION-LEDGER.md` + `registry/COMPLETENESS-LEDGER.md` (regenerated, never hand-edited) · the two 07-29 handoff gate lines
**Commits**: **`58be3626`** — carries this unit's six bytes (see the provenance note at C9: a concurrent sibling seat's pathspec commit consumed this seat's staged index; **recorded, not rewritten**, on the disposition X-W0.a `:44`, X-W0.e `:402`, X-W0.b `:433` and X-W0.i I10 each took) · **`549353fd`** — `chore(megatranche/completeness): the two 07-29 handoff gate lines carry the split on the FIGURE'S OWN LINE`, 2 paths
**HEAD at open**: `fc92ed52` ⟨`git log --oneline -1`⟩. **Ran after `.e`** (r2 artefacts tracked → generator replay) **and after `.i`** (shared `CONSTELLATION-COMMISSION-2026-08-03.md`), as §Disjointness and seat 0's finding 5 require.

#### Acts, in order

**C1 · HG-7 re-measured FIRST, and the roster shift diagnosed before the band was touched** (the seat brief's explicit charge). ⟨`node …/validate-completeness.mjs --self-test`⟩ → verbatim, double-run identical:

```
baseline (unmutated tree): exit 1 · 87 uncovered · 264/264 hash-banked
BASELINE IS NOT GREEN — self-test is meaningless until the real tree passes. Fix the tree first.
```

Seat 0's reading reproduces exactly (`:62`). **The shift is not in megatranche work and the `frontend-omissions` band contributes none of it.** 264/264 axes are hash-banked, so no component row is incomplete; ⟨`sed -n '/^## VERDICT/,$p' registry/COMPLETENESS-LEDGER.md | grep -c 'frontend-omissions'`⟩ → **0**. All 87 are **non-band run records**: **75 completed-but-NOT-HARVESTED + 12 unaccounted harvest shortfalls** (14 short, 2 carrying a matching `HARVEST_DISPOSITION`), over **120** non-band records.

**C2 · The cause, named at the input rather than at the symptom.** `validate-completeness.mjs:18` reads `SESSION_WF` — a **live Claude Code session directory outside the repository**, shared by every program that dispatches a workflow in this session — and its non-band law (*"every run record must be completed AND harvested"*) carries **no corpus predicate at all**. Measured at the megatranche's own dispatch boundary (records timestamped on or before **2026-08-03**, the date the wave spec was authored): **27 non-band records · 0 violations.** At `≤ 2026-08-04`: 39 records · 8 violations. Today: 120 records · 87. **Every one of the 87 is timestamped 2026-08-04 or later**, and their `workflowName`s name the four tranche-X tracks — `kf-saturation-batch-*`, `fourier-saturation-batch-*`, `parsethat-saturation-batch-*`, `adjudication-batch-*`, `xf-repair-r2`, `xp-conformance-round*`. The gate is not broken; it is adjudicating four other programs' dispatch discipline against the megatranche's harvest law.

**C3 · Why the specified cure was NOT substituted for, measured at the bytes.** *"Give the `frontend-omissions` band a real run record"* is **not executable**: there is no such record, and no run that could honestly be named.

| probe ⟨cmd⟩ | output |
|---|---|
| the band's only dispatch, `wf_bb1c807c-f47` | `{"status":"killed","agentCount":6,"result":null}` — already carrying `STOPPED_WITH_DISPOSITION` *"stopped pre-write, 0 results"* |
| the 21 canonical axes of the band's 7 slugs, by hydration status | **18 REPORT-AUTHORED + 3 UNWITNESSED-DIRECT · 0 EXISTS-ORIGINAL · 0 HYDRATED** — **not one witnessed seat return exists for this band** |
| the provenance of the 18 (`coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.json`) | `"authority": "NONE"`, `"runtimeEvidence": 0` — a source-review authoring pass, no seat dispatched |
| any harvest payload naming the 7 slugs ⟨`grep -rl "audit/components/<slug>/" registry/harvest/`⟩ | **2 of 7**, and only via `wf_1a4c8a8c-557` (the r2 re-runs) and `wf_83265e1d-a99` — neither is the band's run |

Pointing `BANDS['frontend-omissions']` at any existing run ID would attach one run's provenance to work it did not do — **the magic-string exemption `validate-completeness.mjs:28–35` records as deliberately deleted** (*"it previously short-circuited `coverageFor` to covered:true, which made 21 axes with no run record… structurally incapable of failing"*). **No substitute was written.** Per METHOD and §Triumvirate Dispatch bullet 2, HG-7 is **RETURNED AS AN ESCALATION** (E-1 below), and the band's spine value was left exactly as it stands.

**C4 · HG-6 + G-D cured at the GENERATORS, per fold BoundsDelta 3** (*"the columns must come from the generator"*; §Disjointness forbids touching `HYDRATION-LEDGER.md` by hand). **The roster predicate is written into both scripts in the same words and built by the same construction**, so neither ledger can move a denominator without the other's reconciliation line moving visibly:

> an axis is **CANONICAL-ROSTER** iff its path is `audit/components/<slug>/<exact canonical axis filename>` with `<slug>` on a band roster in `workflows/args/*.json` — 88 slugs × 3 axes = **264**.

⟨`node …/hydrate-reports.mjs`⟩ → `roster predicate: 283 rows = 264 canonical roster + 19 non-roster` · `three integers (roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46 → 264 = 218 CHALLENGED + 46 REPORT-AUTHORED`. ⟨`node …/validate-completeness.mjs`⟩ → `denominator: 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED`. The arithmetic closes in both directions and is the proof G-D's falsifier asks for: **213 + 5 + 46 = 264**; ledger-wide **232 + 5 + 46 = 283 = 264 + 19**; the 19 non-roster rows are **all** later-round variants, each printed with its round (`r2`/`r3`/`r4`/`pass2`), never dropped.

**C5 · A generator defect found by the predicate and cured at the seam, not at the ledger.** G-D's born-RED counted **286 rows / 22 non-roster** and said a `-r2|-r3|pass` grep names only **20**. The two that grep could not name are the mechanism: **three harvested payloads wrote a `reportPath` with English appended after the filename** —

```
/Users/…/audit/components/PaletteCard/challenge-L-library.md (pass 2; the prior seat's pass-1 report is preserved verbatim at …)
/Users/…/audit/components/wb-extract-workbench/challenge-C-implementation.md (probe scripts + JSON captures + screenshots copied to …)
/Users/…/audit/components/wb-mix-configbar/challenge-D-design.md (round 3 archived to challenge-D-design.2026-07-28-r3-prior.md)
```

— and an earlier run of `hydrate-reports.mjs` took the whole string as a path, called `mkdirSync`/`writeFileSync` on it and **materialized files whose names are sentences**. ⟨`git ls-files …/PaletteCard/`⟩ prints one, tracked. Every run since read them back as `EXISTS-ORIGINAL`, so the ledger carried **three phantom rows beside the real ones**. The annotation is now split off **before anything is keyed, hashed or written**, and printed in a generated **§Dangling receipts** block. Measured effect: ledger-wide originals **235 → 232**, rows **286 → 283**, non-roster **22 → 19** — and **the canonical-roster split is unchanged at 213 / 5 / 46**, which is the arithmetic proof the three rows were duplicates and not coverage.

**C6 · The supersession column, and what it does and does not do for HG-10.** The generator now prints, per canonical row, the witnessed later rounds that re-ran it — **13** rows read `r1 · re-run at r2 (witnessed)`, and among them **exactly the three slugs X-W0.e routed here**:

| canonical row | status | round | r2 row |
|---|---|---|---|
| `ActionFeedback/challenge-L-library.md` | REPORT-AUTHORED | `r1 · re-run at r2 (witnessed)` | `…-L-library-r2.md` · EXISTS-ORIGINAL · `wf_1a4c8a8c-557.json` |
| `picker-componentsliders-consolerail/challenge-D-design.md` | REPORT-AUTHORED | `r1 · re-run at r2 (witnessed)` | `…-D-design-r2.md` · EXISTS-ORIGINAL · `wf_1a4c8a8c-557.json` |
| `picker-pointerdebugoverlay/challenge-D-design.md` | REPORT-AUTHORED | `r1 · re-run at r2 (witnessed)` | `…-D-design-r2.md` · EXISTS-ORIGINAL · `wf_1a4c8a8c-557.json` |

**The provenance word was NOT changed, deliberately.** `REPORT-AUTHORED` is a true statement about the canonical file — it was authored by the closure pass and no seat wrote it — and re-badging it would falsify the one thing the status column exists to record. What changed is that the ledger now **names the witnessed re-run beside it, with its harvest**, which is the only truthful re-status available at these bytes. HG-10 is X-W0.e's gate, not this unit's; its ledger-status half is reported here, not claimed (**R-3**).

**C7 · HG-6's five live gate-text sites, cured and probe-checkable.** The only mechanically checkable form of *"zero unqualified `264/264`"* is **the figure and its split on one line**, so that is what was written. WRITE-THEN-MEASURE caught my own first carve failing it: the handoff edits put `264/264` on one line and `= 218 CHALLENGED + 46 REPORT-AUTHORED` on the next — **2 of 5 still unqualified**. Corrected at `549353fd`.

⟨`cat <(grep -n '264/264' registry/COMPLETENESS-LEDGER.md) <(grep -n '264/264' CONVERGENCE-RESUME-HANDOFF-2026-07-29.md) <(grep -n '264/264' IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md) | grep -vc 'CHALLENGED'`⟩ → **0** (double-run **0**).

Line numbers, measured not inherited: the spec's `:171` had drifted to `:196` at seat 0's clock and now stands at **`:294`** in the regenerated ledger (the denominator section adds lines above it); the ledger's own sites are `:20`, `:22`, `:40`, `:294`. **`grep -c 218`** in `COMPLETENESS-LEDGER.md`: born-RED **0 → 7**. In `validate-completeness.mjs`: **0, and deliberately so** — the integer is **computed from the ledger's status column, never a literal**; a hardcoded 218 would be exactly the hand-declared figure this wave exists to kill. The script *prints* it: ⟨`node … --self-test | grep -c '218 CHALLENGED'`⟩ → **1**.

**C8 · HG-8 — the ephemeral-worktree replay, run twice at two HEADs, and its falsifier executed.** §Worktree Plan's one exception: created, read, removed; **nothing committed from it**.

| # | worktree HEAD | ⟨`node hydrate-reports.mjs && node validate-completeness.mjs`⟩ | ⟨`git -C <wt> diff --exit-code`⟩ | ⟨`git -C <wt> status --porcelain`⟩ |
|---|---|---|---|---|
| 1 | `58be3626` | hydrate OK · validate exit 1 (the HG-7 RED, unchanged) | **exit 0 · 0 diff lines** | empty |
| 2 | `549353fd` (settled HEAD) | same | **exit 0**, and **exit 0 again on the double-run** | **0 lines** |

**Both committed ledgers reproduce byte-identically from a clean checkout of HEAD.** K-35's baseline (264× `NO-LEDGER`, exit 1, at `87f56f11`) is **CURED**, and the cure was measured, not asserted — the spec's `MEASURE-AT-OPEN` honoured.

*The falsifier was executed, not paraphrased.* HG-8 `:264`: *"narrow the ledger hash width back to 16 and every axis becomes NO-LEDGER."* Inside the worktree, `[0-9a-f]{64}` → `[0-9a-f]{16}`: `**175 incomplete component rows · 264 unbanked canonical axes · 264/264 exact files present · 0/264 hash-banked = 0 CHALLENGED + 0 REPORT-AUTHORED**`, 90 ledger lines carrying `NO-LEDGER`. Restored → ⟨`git diff --exit-code`⟩ **0** again; the worktree was then removed and ⟨`git worktree list`⟩ returns to its four standing entries. The main repository was untouched throughout: ⟨`git status --porcelain`⟩ after removal shows only `CARRY-LEDGER.md` and `dev.sh` (the standing dirty pair) plus concurrent seats' untracked work.

**C9 · Landing, and the shared-index event a fourth time.** Six paths were staged by exact pathspec ⟨`git diff --cached --name-only | wc -l`⟩ → **6**, ⟨`… | grep -vc '^docs/tranches/V/megatranche/'`⟩ → **0**. Between that `git add` and the commit call, the concurrent **X·KF** seat committed `58be3626` **with its own pathspec**, and git's shared index carried this seat's six settled paths into it; my own `git commit` then reported *"no changes added to commit"*. Verified at the bytes: all six are in `HEAD` and ⟨`diff <(git show HEAD:<f>) <f>`⟩ → **IDENTICAL ×6**; `58be3626`'s only non-megatranche path is that seat's `X/keyframes/W0/REF-OF-RECORD.md`. **Nothing is lost and nothing is duplicated**; the bytes' authorship is this seat's, their commit is that one. **No history was rewritten** — a reset mid-flight would hand a live sibling seat an index it did not create, which is the identical reason X-W0.e left `9c72f097` standing. **What did not survive the sweep is the §Commit Plan row-5 body**, which the seat brief required to carry the HG-7 diagnosis; it is therefore banked **here**, in full, and in `549353fd`'s body in summary. The second commit was made **with the pathspec on the commit itself** (X-W0.i's I10 guard) and landed **2** paths, zero foreign.

**Bounds proven over both commits**: non-`docs/` → **0** · `registry/adjudicated/` → **0** (fold G-H) · `codex-worktree-7e28` → **0** · `challenge-*.md` → **0** · `dev.sh` → **0** (never touched, never staged). ⟨`git diff --check`⟩ clean. **§Format And Lint Cadence `:346`**: `npm run lint` / `vue-tsc` intentionally skipped — this unit wrote zero `.ts`/`.vue`/`.css` bytes; the replacement evidence is the two script gates plus `git diff --check`.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (open, HEAD `fc92ed52`) | AFTER (settled bytes, `549353fd`) | verdict |
|---|---|---|---|
| **HG-6** — the challenged denominator gates, not the saturation count | `grep -c 218` → **0** in `COMPLETENESS-LEDGER.md` **and** in `validate-completeness.mjs`; unqualified `264/264` live at `COMPLETENESS-LEDGER.md:20,22,196` · `CONVERGENCE-RESUME-HANDOFF:68` · `IN-FLIGHT-RESUME-HANDOFF:49` | validator prints `264/264 hash-banked = **218 CHALLENGED + 46 REPORT-AUTHORED**` to stdout and into the ledger; `grep -c 218` → **7** in the ledger, **0** in the script **because it is computed, not declared**; same-line unqualified across the five sites → **0** (double-run) | **GREEN** |
| **G-D** (fold, sharpens HG-6/HG-7) — three integers and a stated scope predicate | `HYDRATION-LEDGER.md` **286 rows (235/5/46)**, predicate nowhere; `COMPLETENESS-LEDGER.md` **264/264** with no reconciliation; 22 non-roster rows, a `-r2|-r3|pass` grep naming only 20 | both scripts state the predicate in the same words and build it the same way; **283 = 264 + 19**, reconciliation printed on the ledger's face; three integers **213 · 5 · 46** printed by both scripts and tabled in both ledgers; the 2 rows the grep could not name are **cured at the generator**, not classified | **GREEN** |
| **HG-7** — the validator's self-test is meaningful | `exit 1 · **87 uncovered** · 264/264 hash-banked`, double-run; cause unknown | `exit 1 · **87 uncovered** · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED`, double-run; **cause measured and located** (C1–C3); the specified cure proven **not executable at the bytes**; S1..S6 unreadable **by the harness's own construction** (it returns at `:436` before the cases, exactly as designed: *"self-test is meaningless until the real tree passes"*) | **RED — ESCALATED (E-1)** |
| **HG-8** — the GREEN is regenerable from a clean checkout | K-35: 264× `NO-LEDGER`, exit 1 @ `87f56f11`; **MEASURE-AT-OPEN**, deferred to this unit by seat 0 | ephemeral worktree of HEAD ×2 (`58be3626`, `549353fd`): ⟨`git diff --exit-code`⟩ → **0**, double-run **0**, `status --porcelain` **0 lines**; falsifier fired on demand (**0/264 hash-banked** at 16-hex) and the tree restored to diff-0; worktree removed | **GREEN** |

#### Escalations

**E-1 — HG-7 cannot reach GREEN by the cure the spec names, and the cure that would reach it is outside this unit's bound. Returned under §Triumvirate Dispatch bullet 2** (*"HG-7 baseline still `exit 1` after the `frontend-omissions` band receives a real run record"*) **and METHOD** (*"if the specified cure is impossible at the bytes, do NOT substitute"*).

*What is measured, not argued*: the band contributes **0** of the 87 (264/264 banked ⇒ no incomplete component row; the uncovered list names it **0** times); the band has **no run record to give** (its only dispatch killed with `result: null`; **0 of its 21 axes** carry a seat payload; the 18 REPORT-AUTHORED come from a pass whose own receipt records `authority: NONE`). The 87 are **75 unharvested + 12 unaccounted-short non-band run records, all timestamped 2026-08-04 or later, all belonging to the four tranche-X tracks**; at the megatranche's own dispatch boundary the same law returns **0 violations over 27 records**.

*The two candidate branches, both measured, neither inside `X-W0.c`'s writable set — so neither is a seat decision*:

1. **Harvest them.** `workflows/harvest-journals.mjs` exists and is idempotent; it emits `registry/harvest/<workflow>.json` **and** rewrites `registry/DEFECT-LEDGER.md` (10.5 MB, modified today 13:23 by a concurrent seat). Both paths are outside this unit's bound. This branch treats the 87 as the true finding it appears to be — **four tranche-X tracks have been dispatching workflows without harvesting their journals**, which is precisely the loss `harvest-journals.mjs`'s header exists to prevent.
2. **Give the non-band law a corpus predicate.** The law has none; `SESSION_WF` is a live session directory outside the repository that every program writes into. A stated boundary would scope the law to the corpus it was written for. **This is a scope ruling, not an edit** — and writing it unilaterally would *suppress* branch 1's finding, which is the masking-fallback shape the standing law forbids.

*What was NOT done, and why it is stated*: no run ID was invented or borrowed for the band; no allowlist, no timestamp cutoff, no `covered:true` short-circuit, no edit to any S1..S6 fixture, no harvest file written. The gate is left RED and honest.

#### Residuals

- **R-1 — HG-7 is RED at this unit's close, by measurement, and E-1 is the whole of it.** Three diagnose→edit→re-measure iterations on this gate is itself a triumvirate trigger; this seat performed **one** diagnostic pass and escalated rather than spending the other two on a cure it had already proven unlawful.
- **R-2 — three materialized prose-named artefacts remain tracked and are NOT deleted here.** `PaletteCard/challenge-L-library.md (pass 2; …)`, `wb-extract-workbench/challenge-C-implementation.md (probe scripts…)`, `wb-mix-configbar/challenge-D-design.md (round 3 archived…)`. `audit/components/**` is not in this unit's writable set (it is X-W0.e's, and only for three named slugs). The **generator no longer produces them and no longer counts them**; the files themselves are a dangling-receipt row of exactly G-G(b)'s class and are routed there by name.
- **R-3 — HG-10's ledger-status half is reported, not claimed.** The three slugs' canonical rows keep `REPORT-AUTHORED` because that word is true of those files; the witnessed r2 round is now printed beside each, with its harvest. Whether that discharges HG-10's falsifier (*"a named slug whose row stays REPORT-AUTHORED"*) is **X-W0.e's gate and the wave's close to read**, not this seat's to assert.
- **R-4 — `docs/tranches/X/artefacts/W0/` is in no unit's writable set**, so `selftest-open.txt` / `selftest-close.txt` / `clean-checkout-replay.txt` (`W0.md:355–356`) were **not** written out of bounds. Their content is carried in C1 and C8 above verbatim. This is X-W0.i's **R-4** measured a second time, at a different gate — the bounds gap is a spec finding, returned, not worked around.
- **R-5 — the dated records' `264/264` restatements are untouched, by rule and by bound.** `SCOPE.md:331` · `STATE.md:175` · `MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:102,118,128` · `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:162,1275` · `CONSTELLATION-COMMISSION-2026-08-03.md:9` (whose `:142` **already** carries the split). None is in this unit's writable set and all are dated epoch-rule records; HG-6's own born-RED names **five** live gate-text sites and all five are cured.
- **R-6 — the §Commit Plan row-5 body did not reach its commit.** The bytes landed inside a concurrent seat's commit (C9). The body is banked here in full and summarised in `549353fd`; no history was rewritten and no empty commit was manufactured.
- **R-7 — mail was not swept by this unit.** E13 binds the **wave's** close; seat 0's **I-31** (UNREAD) stands exactly as left. Nothing in this carve touches a coordination path.

#### What this unit did NOT do

Zero product bytes; zero `src/ demo/ api/ test/ e2e/ .github/ scripts/ node_modules/` paths in either commit. **No hand edit to either ledger** — every byte of `HYDRATION-LEDGER.md` and `COMPLETENESS-LEDGER.md` came out of its generator (§Disjointness `:119`, fold BoundsDelta 3). **No `registry/adjudicated/**` byte** (fold G-H: intersection 0). **No canonical `challenge-*.md` byte** (C-02). **No `BANDS` entry invented, borrowed or re-pointed.** **No self-test fixture weakened** — S1..S6 are byte-identical to their landed form. **No harvest file written and no `DEFECT-LEDGER.md` byte touched.** **No 46-row constant edited**: `CLOSURE_MANIFEST_46` still holds exactly 46 paths and still throws if it does not. `scripts/dev/dev.sh` never touched, never staged.

---

### X-W0.h — Typed Graph Authority and the Frontend Denominator (CC-001 graph half + CC-024) — **DONE**

**Seat**: Opus · `claude-opus-5[1m]` · 2026-09-17 · group 4
**Sections executed**: `waves/W0.md` §Agent Units "X-W0.h" :193–199 · §Scope 8 :31 · HG-14 :305–308 · HG-15 :310–313 · §Format And Lint Cadence :342 · §Commit Plan row 7 :377 · fold **G-E** :513–520 · fold §3 BoundsDelta **7** :567
**Commit**: `c9aa1fdf` — `feat(megatranche/graph-v3)`, body required and present (mechanism · X-W8 consumer · round-trip evidence), **seven paths, one commit, family unsplit**
**Gates**: HG-14 **RED → GREEN** · HG-15 **RED → GREEN** · G-E **RED → GREEN**

#### A0 — the found state, and what this seat did about it

`graph-v3.mjs` (50,307 B) and `GRAPH-V3/` (5 JSON files) were **on disk and untracked at open**, written earlier the same day at 14:21/14:24 — a prior seat's unlanded draft, never committed, in exactly this unit's writable set. ⟨`git status --porcelain`⟩ → `?? docs/tranches/V/megatranche/workflows/graph-v3.mjs` · `?? docs/tranches/X/W0/GRAPH-V3/`. `FRONTEND-DENOMINATOR.md` was **absent**.

The draft was **read whole (1,072 lines) before any edit and before any publish**, not trusted. Reading it found the gate-bearing defects in A1. Nothing was committed that this seat had not read.

#### A1 — defects found in the found draft, each cured at the root

| # | defect, measured | why it was gate-bearing | cure |
|---|---|---|---|
| 1 | `SCC_REGISTRY`'s Dock entry carried **`classes: [...]`** while `nameSccs` matched on **`r.class === s.class`** — a key that entry does not have | **Dock never matched.** ⟨`--print-sccs`⟩ before: `[load] size=2 (UNNAMED)` and `[runtime] size=2 (UNNAMED)` over `Dock.vue` + `dock/index.ts`. HG-14 requires *"the four frontend SCCs … appear by name with an owner each"* — the gate was RED on its own headline requirement | `nameSccs` matches `r.classes.includes(s.class)`; every entry normalized to a `classes` array |
| 2 | `census()` returned **`renderTagsUnboundToAnImport: facts.renderUnresolved`** — a field that does not exist on `facts` (the real one is `renderUnbound`) | `undefined` → dropped by `JSON.stringify`, so the census silently published **no** unbound-tag fact at all | field corrected + sorted by a total key |
| 3 | `DENOMINATOR_BANDS` was **declared and never used**; `sourceMembers` counted **every** band | census read **412**, not 310. HG-15's denominator would have been wrong by 102 | `sourceMembers` = the three denominator bands; `graphMembers` published beside it |
| 4 | line citations computed as `lineOf(text, text.indexOf(m[0]))` — the **first** occurrence of the matched text anywhere in the file | every repeated statement mis-cited; X-W8 subtracts against these witnesses | blocks are now **masks over the whole file** (outside bytes → spaces, newlines kept), so `m.index` IS the file offset and `lineOf` is exact |
| 5 | **15 raw NUL bytes** inside sort-key template literals | the file was **binary to `grep`** ⟨`grep -n "lineOf" …`⟩ → no output on a file containing 8 such lines; `git diff --check` over it is meaningless, which is this wave's own §Format And Lint Cadence gate | each raw NUL → the escape ` `: identical runtime sort key, plain-ASCII source. ⟨scan⟩ `raw NUL before=15 after=0`; `grep -c byKey` → **16** (grep works again) |
| 6 | `facts.workers` could hold duplicates; `counts.sccs` omitted the `ownership.pair` class | a published count that double-counts, and a class invisible in the digest summary | `[...new Set()]`; counts extended with `ownership.pair` · `total` · `owned` · `reasonedNoOwner` · `unnamed` |

**Nothing was masked.** No try/catch around a defect, no skip, no allowlist, no figure hand-edited into an artefact.

#### A2 — G-E's closure, built (not asserted)

G-E: *"Graph v3 names **every** runtime/load/ownership SCC it finds, with an owner or a written reason for having none."* The found draft named 4 of 11 (and one of those, CPE L-24, was attached to the **coarse 8-area component** rather than to its own pair — the precise failure G-E's falsifier describes).

Measured pair set, with witnesses read at the bytes:

| pair | witnesses | disposition |
|---|---|---|
| `demo/palettes ↔ demo/shell` | 17 | **CPE L-24**, owner **X-W8** — `registry/adjudicated/CurrentPaletteEditor.md` L-24 verbatim: *"palettes ↔ shell mutual dependency (type-import up at usePalettePorts.ts:19, five SESSION_PORT_KEY value-imports down — verified); lattice cycle, not load-time"*. Measured **absent from both the runtime and the load class** — exactly what "lattice, not load-time" predicts |
| `demo/color-picker ↔ demo/scenes` | 3 | **AP-19**, **NO-WAVE-OWNER** — `registry/adjudicated/AuroraPane.md:83` verbatim, reason carried into `sccs.json`. Back-edge measured at `aurora-harmony-stops.ts:23` → `atmosphere-calibration`, the record's own citation |
| `assets ↔ demo/scenes` | 55 | reason recorded — the About reference-page lattice; 11 `.md` pages reached by `import()` only, each importing the shared `katex` barrel back. Absent from runtime and load: no static edge closes it |
| `demo/color-picker ↔ demo/picker` | 4 | reason recorded — provide/inject inversion (`OVERTURE_KEY`) |
| `demo/picker ↔ demo/shell` | 5 | reason recorded — the pane-registry contract (`VIEW_MANAGER_KEY`) |
| the coarse `ownership` component (8 areas) | 179 | reason recorded — it is the five pairs' transitive closure; owning it would mean owning the whole demo |

⟨`node …/graph-v3.mjs --verify`⟩ → `G-E closure GREEN  11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed`. **The closure is machine-checked**: an `UNNAMED` row fails `--verify`, so the roster cannot silently shrink back to a list of four.

#### A3 — HG-15's six figures, and the two that had to be earned

⟨`node …/graph-v3.mjs`⟩, double-run, identical both times:

```
  census 310 source members · 88 SFC · 2 harnesses
  graph digest b3a387c9afd00ca07639812bfc0598593fdf84d1829eb37ca09be3a906782bee
```

| figure | required | measured | verdict |
|---|---|---|---|
| SFC | 88 | **88** | EXACT (⟨`find demo -name '*.vue' \| wc -l`⟩ → 88 agrees) |
| source members | 310 | **310** | EXACT |
| routes + wildcard | 14 + wildcard | **14 + 1** (`/:pathMatch(.*)*`) | EXACT |
| `:is` | 13 | **13** | EXACT |
| Teleports | 2 | **2** | EXACT |
| harnesses | 2 | **2** — `PaletteSlugBar.vue` · `Katex.vue` | EXACT |
| per-file SHAs | required | **88 rows**, re-verified against live bytes ⟨double-run⟩ → `rows=88 mismatches=0` | PRESENT |

**310 was earned by stating a predicate.** The inherited figure carries none. The tool's stated predicate — the three denominator bands — yields 261 + 26 + 23 = **310**, reproducing it to the unit while `e2e` (84), `assets` (11) and the seven build files stay **in the graph** (412 members) and **out of the denominator**, so an edge can leave it.

**2 harnesses was derived, not copied.** The naive predicate ("an SFC no render edge targets") measured **25**. Three real mount mechanisms were missing, each cured at the root:

1. **barrel forwarding** — `<PaletteCard>` binds to a barrel; the SFC is one `export { default as … }` behind it. New typed edge kind **`render.mount`** (222 edges) resolves the hop while `render.tag` still names the barrel, so both truths survive for X-W8. 25 → 4.
2. **in-component lazy binding** — `HeroBlob` exists only as `defineAsyncComponent(() => import("./visual/HeroBlob.vue"))` at `ColorPicker.vue:157`; async bindings were read only inside `usePaneRouter`. Now read in every file. 4 → 3.
3. **the pane registry's prefix arm** — ⟨`sed -n '93p' demo/shell/usePaneRouter.ts`⟩ → `if (name.startsWith("admin-")) return AdminPane;` is `AdminPane.vue`'s **only** mount; only the `name === "…"` arms were parsed. 3 → 2 (with the `componentFor` barrel hop for `ColorPicker`).

The survivors are **`PaletteSlugBar` + `Katex`** — exactly the pair two independent records name: `coordination/VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:90` (*"`PaletteSlugBar` and `Katex` remain honest unmounted harnesses"*) and `formation/codex-worktree-7e28/formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md:110` (*"88 SFC workflows, with 86 mounted and two exported-unmounted harnesses"*). **Neither was read into the tool**; the agreement is corroboration, not copying.

#### A4 — HG-14's round trip, and its falsifier EXECUTED

⟨`node docs/tranches/V/megatranche/workflows/graph-v3.mjs --verify`⟩ → **exit 0**, verbatim:

```
graph-v3 --verify · round-trip over two independent in-process builds
  run1 vs run2  nodes   MATCH  0e75a1c9cc1a5c6c90494a186fc010bc934a18a0f1f288554152740072a55000
  run1 vs run2  edges   MATCH  4f1fb14fda15c0a80cd769cdae579e32948bd820aeba9057c9c888a7873a30c6
  run1 vs run2  sccs    MATCH  bf9c9a20cb4c4ca2c0dc28c7349851a0aec5709a2bd375caa615ad80412c82a3
  run1 vs run2  census  MATCH  e3a09112213701e05e9f6ba163b7f97cde7ed15608a09a08bf7b19cca359d54a
  run1 vs run2  graph   MATCH  b3a387c9afd00ca07639812bfc0598593fdf84d1829eb37ca09be3a906782bee
  committed     nodes   MATCH  0e75a1c9cc1a5c6c90494a186fc010bc934a18a0f1f288554152740072a55000
  committed     edges   MATCH  4f1fb14fda15c0a80cd769cdae579e32948bd820aeba9057c9c888a7873a30c6
  committed     sccs    MATCH  bf9c9a20cb4c4ca2c0dc28c7349851a0aec5709a2bd375caa615ad80412c82a3
  committed     census  MATCH  e3a09112213701e05e9f6ba163b7f97cde7ed15608a09a08bf7b19cca359d54a
  committed     graph   MATCH  b3a387c9afd00ca07639812bfc0598593fdf84d1829eb37ca09be3a906782bee
  G-E closure   GREEN  11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed
  HG-14 four    GREEN
ROUND-TRIP GREEN
```

Run again **after** the commit, against HEAD's own bytes: identical, exit 0.

**The falsifier, run.** HG-14: *"remove one resolver-alias edge and either a named SCC disappears or the round-trip digest changes."* The tool derives the repo root from its own path, so the mutant had to sit at the real path; a byte-exact backup was taken and the restore **re-hashed** (`98e4d3a72db32025fdc9ad81457b929288952c9db86d9092058fd78730b7cba6` **before and after** → `RESTORE BYTE-EXACT`).

| arm | mutation | result |
|---|---|---|
| **A** | the `@src` alias removed from the alias table | `nodes` · `edges` · `graph` all **DIFFER** from committed; `graph` → `801021ba7a0baa2f…`. `ROUND-TRIP RED — 3 mismatch(es)` |
| **B** | the typed alias edge suppressed (the `alias` domain emits nothing) | `edges` · `graph` **DIFFER**; `graph` → `086cb8ed968ab005…`. `ROUND-TRIP RED — 2 mismatch(es)` |

Both mutants stayed **internally deterministic** (run1 = run2 in each), so the gate distinguishes *"the graph changed"* from *"the tool is flaky"* — which is the distinction §Triumvirate Dispatch bullet 2 turns on. **No non-determinism was observed at any point**, so no triumvirate was triggered.

#### A5 — what the graph is, in one table

Nodes **487** · edges **2,996** · eleven domains:

`module` 1,477 · `render` 715 · `boundary` 570 · `di` 76 · `alias` 63 · `route` 39 · `api` 20 · `state` 16 · `asset` 11 · `css` 8 · `worker` 1.

The alias class G-E asks to be **typed**: **19** `demo/ui/**/index.ts` barrels carrying **279** inbound edges (the record's "19 barrels / 90+ edges" — 19 exact, the edge figure a floor). The class is load-bearing because it is *what hid the mounts*: all 25 false harnesses in A3 sat behind exactly this forwarding.

Resolver aliases: **8**, and the table is **read from `package.json#exports`**, never hard-coded — `vite.config.ts` derives its own the same way, so the two cannot drift.

#### Commit

| # | hash | scope | paths |
|---|---|---|---|
| 7 | `c9aa1fdf` | `feat(megatranche/graph-v3)` | `workflows/graph-v3.mjs` · `X/W0/GRAPH-V3/{nodes,edges,sccs,census,digests}.json` · `X/W0/FRONTEND-DENOMINATOR.md` |

Body carries the three required sections. ⟨`git show --name-only --format="" HEAD`⟩ → exactly **7 paths**, all inside the writable set; the declared family did not split.

**Index hygiene, recorded.** At commit time the shared index already held **~200 staged paths from a concurrent seat** (`docs/tranches/X/parse-that/evidence/W1/rescued/**`). A bare `git commit` would have swept them into this unit's commit. This seat **unstaged its own paths to restore the index as found** and committed with an explicit pathspec (`git commit -F <msg> -- <7 paths>`); ⟨`git show --name-only`⟩ confirms no foreign path entered. No other seat's work was touched, moved or reset.

#### Format And Lint Cadence (`:342`, `:346`)

- ⟨`git diff --check --cached -- <the 7 paths>`⟩ → exit **0**, no output.
- ⟨`node …/graph-v3.mjs --verify`⟩ → exit **0** (the cadence's named X-W0.h gate), run at landing and again post-commit.
- `npm run lint` / `vue-tsc` **intentionally skipped** per `:346` — this unit wrote no `.ts`, `.vue` or `.css` byte. Replacement evidence is the two lines above.

#### Residuals — stated, not hidden

- **R-1 — one false-positive unbound render tag, named and bounded.** `census.renderTagsUnboundToAnImport` = **1**: `PaletteCard.vue`, tag `Card`, at **`:12`** — inside a JavaScript line-comment nested in a template `:class="[…]"` binding expression (*"… is retired. NOT `<Card` / surface=cartoon>"*). HTML comments in templates **are** blanked before tag extraction (that cure removed the other two, both `<EasingPicker>` in the gradient visualizers, 3 → 1); a JS comment inside an attribute expression would need a template-expression parser, and building one for a single benign site is contrivance. The figure, the file and the line are published in `FRONTEND-DENOMINATOR.md` §6 and any change to it moves the census digest.
- **R-2 — two genuinely dangling e2e fixture imports**, recorded for the wave that owns `e2e/`: `e2e/smoke/admin/fixtures/admin-populated.ts` and `e2e/smoke/fixtures/browse-palettes.ts` both import `demo/@/lib/palette/types`, a tree that no longer exists. Outside the denominator, so no §2 figure moves. The naive count read **5**; the honest count is **2**, because specifiers resolving to files outside the five subject roots (vite's own root-level plugin modules) are now typed `outside:` rather than conflated with "unresolved".
- **R-3 — the `ownership` class is emitted at two granularities on purpose.** The coarse component is an artefact of area-level Tarjan, not a finding; the `ownership.pair` refinement is where the adjudicated cycles live. Both are emitted and both are reasoned. A later wave that reads only the coarse row will see one 8-area blob — `FRONTEND-DENOMINATOR.md` §5.2 says so in terms.
- **R-4 — `docs/tranches/X/artefacts/W0/graph-v3/`** (`W0.md:358`) is **in no unit's writable set**, so the nodes/edges/SCC/round-trip artefacts were **not** written there. Their content is the committed `GRAPH-V3/**` plus §A4 above, verbatim. This is the same bounds gap X-W0.i and X-W0.c each returned; it is a spec finding, returned, not worked around.
- **R-5 — mail was not swept by this unit.** E13 binds the **wave's** close; seat 0's **I-31** (UNREAD) stands exactly as left.

#### What this unit did NOT do

Zero product bytes — no `src/ demo/ api/ test/ e2e/ .github/ scripts/ node_modules/` path in the commit (the tree is **read** exhaustively; not one byte written). `scripts/dev/dev.sh` never touched, never staged. **No `registry/adjudicated/**` byte** — ⟨`git show --name-only HEAD | grep -c registry/adjudicated`⟩ → **0** (fold G-H). No adjudicated verdict re-opened, re-homed or re-worded: **AP-19 stays NO-WAVE-OWNER** and **L-24 stays X-W8's**; the graph is the register that carries them, not a court. No figure written into an artefact by hand — every number in `FRONTEND-DENOMINATOR.md` is a field of `census.json`, and the 88-row SHA table was spliced from it mechanically. No sibling tree read or written; glass-ui untouched.

---

### X-W0.g — The Owner Sitting Packet (CC-014 / DR-29 + CC-019/020/021/023) — **DONE (with escalations returned)**

**Seat**: Opus (`claude-opus-5[1m]`) · group 5, **alone and last** · 2026-09-17
**HEAD at open**: `bd5dd14f` ⟨`git log --oneline -1`⟩ — sibling tracks commit concurrently.
**Commit**: **`f7197d71`** — `docs(x-w0/owner-sitting)`, body required, **one commit, family unsplit**.
**Gates**: **HG-13 RED → GREEN** · **G-B RED → GREEN** · **HG-16 GREEN (verify-only)**.
**Escalations returned**: **10** — 2 owner rows (DR-21, CC-104/OP-1) + 8 cross-wave (S-1..S-8).

#### Precedence, verified before writing a byte

`W0.md` §Worktree Plan batch 4 + §Disjointness require this unit to run after `.i` (shared
`CARRY-CUT-LEDGER.md`), after `.j` (the verdict in hand, not discovered after), after `.f` (the
tombstone file exists). All three verified at the bytes before any write:

| dependency | verified how | result |
|---|---|---|
| `.i` landed (shared ledger) | ⟨`git log --oneline -5 -- docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md`⟩ → `2012dbfa docs(x-w0/routing-law): CC-011 RETIRED …` | **MET** — CC-011's row and §0's alias line are `.i`'s and were not touched by this seat |
| `.j` verdict in hand | ⟨`sed -n '17,30p' docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md`⟩ → *"## **FAIL** — at the elected target **8.0.0**, the census reads **1 of 4**"* (commit `ad240462`) | **MET** — reported at the sitting, not discovered after it |
| `.f` tombstone file exists | `docs/tranches/X/W0/TOMBSTONES.md` present, `b5673ae0`; §4 reserved and **deliberately empty** | **MET** |

#### A1 — anchors verified at true bytes; one drift recorded, INTENT taken at the true bytes

The work order cites `COHESION §0j.A :502-512 · §0j.B :514-539 · §0j.C :541-545`.
⟨`awk '/^### §0j/{print NR}' docs/tranches/X/COHESION.md`⟩:

```
509
521
548
604
…
```

**The three sections begin at `:509`, `:521`, `:548`.** The cited ranges are ~7 lines short — the
sibling seats' concurrent COHESION appends moved them. **INTENT was taken at the true bytes**: every
ruling quoted in this unit's artefacts is transcribed from the line that actually carries it
(DR-19 `:513` · DR-20 `:514` · DR-24 `:515` · DR-31 `:516` · DR-14 `:517` · DR-16 `:518` ·
U-F12 `:519`; §0j.B's packets `:523–546`), and each is cited at its true line. **No COHESION byte was
moved** (E-3). X-W0.f's own citations (`§0j.A:517`, `:518`) independently corroborate the true
numbering.

#### A2 — the sitting packet written · `docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md` (646 lines)

Dated **at wave-open** per §Agent Units (*"one scheduled session, dated at wave-open"*) — 2026-09-17,
the begin-word's own date, so the path is `OWNER-SITTING-2026-09-17.md`, not the spec's placeholder
`-2026-08-XX`. Contents: §0 the transcription posture and the FM-21 non-occurrence statement · **§1 the
eighteen-item docket** · **§2 the seven rows, each verbatim with rationale, artifact, verdict token and
downstream binding** · §3 **the structural proof-farm ban, stated in canon** · §4 the two unruled owner
rows + **the three-way `OP-1` namespace disambiguation** · §5 the eight escalations · §6 the
OWNER-DECISION · §7 the pointer to the fold's §9 · §8 the ledger cells · §9 gate readings · §10
residuals · §11 self-count.

**The seven verdicts, transcribed — never re-opened** (each `⟨sed -n '<n>p' COHESION.md⟩`, quoted whole
in §2 with its rationale cell):

| row | ruled at | verdict token |
|---|---|---|
| DR-19 vnext `proof:` sites | `§0j.A:513` | **RETIRED** + the grep-checkable ban in canon |
| DR-20 the PARK set | `:514` | **RETIRED** |
| DR-24 `scripts/dev/dev.sh` | `:515` | **RETIRED-BY-ASSIGNMENT**, NEVER-touch **PERMANENT for X** |
| DR-31 the NCSU alias | `:516` | **RETIRED** — ACCEPT the permanent 301 in canon |
| DR-14 `siblingFsAllowTransient` | `:517` | **RETIRED** — verb DELETE, act routed to X-W1 |
| DR-16 HG6 taste certification | `:518` | **RETIRED** (option a), no X-W10 bracket set |
| U-F12 Pole A/B | `:519` | **LANDED-AS-RULED — POLE B** |

**Artifacts, all re-measured at this seat's clock and double-run (byte-identical both runs):**

⟨`grep -rn "proof:" docs/tranches/V/vnext/ | wc -l`⟩ → `69` · ⟨`find scripts -name 'proof-*.mjs' | wc -l`⟩ → `0`
⟨`grep -rn "Color.try" src/ demo/ test/ | wc -l`⟩ → `0`
⟨`git status --porcelain -- scripts`⟩ → ` M scripts/dev/dev.sh`
⟨`curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 12 -I https://mbabb.fi.ncsu.edu/colors/`⟩ → `301 https://color.babb.dev/`
⟨`grep -n siblingFsAllowTransient vite.config.ts`⟩ → `139`, `287` · ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `7.0.0`
⟨`sed -n '30p' docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md`⟩ → `> _(empty — the owner's verdict lands here)_`
⟨`sed -n '50p' docs/tranches/U/FINAL.md`⟩ → the U-F12 bracket, still **UN-PICKED**, C 0.0216, coupled to U-F26's 2.26:1.

**FM-22 honoured on DR-19**: the ledger carries **81**; the measurement is **69**. The re-measure is
recorded in three places (sitting §2.1, tombstone TS-6 §6.2, ledger cell CC-019) and the carried figure
is **not** propagated. No vnext byte was read-modified: the band is retired **unadopted**.

#### A3 — the four ruled tombstones appended · `TOMBSTONES.md` §5 (43,649 → 1,044 lines)

Appended as a **dated §5 addendum beside** X-W0.f's five, exactly where `.f` reserved the space and
**without rewriting one byte of §0–§4** (E-3; `.f`'s own instruction: *"appends them beside §1–§3 as a
dated addendum … Nothing above is rewritten to make room"*). Each entry carries `.f`'s three-part
idiom: **mandate verbatim → probe pasted with output → terminal disposition named**, plus the ruling
transcribed and cited.

| entry | row | mandate quoted at | probe → output | disposition |
|---|---|---|---|---|
| **TS-6** | CC-019 / DR-19 | `apotheosis/armB/…owner-clean.txt:10175,10706` (**the owner's own bytes**) + `UNIFIED-CICD.md:48` + `N/audit/lanes/E5.md:234` + `DISEASE-REGISTRY:293,295` | `69` · no matches · `0` | **RETIRED — the vnext band retired UNADOPTED; the ban is in canon and greppable** |
| **TS-7** | CC-020 / DR-20 | `R/FINAL.md:118` (**the minted trigger**) + `T/FINAL.md:317` + `U/FINAL.md:147` + `DISEASE-REGISTRY:303,305` | `0` | **RETIRED — all three PARK members; no threshold authored; DR-12 untouched** |
| **TS-8** | CC-021 / DR-24 | `V/megatranche/SCOPE.md:74–75` (**the owner's standing order**) + `DISEASE-REGISTRY:345,347` + `W0.md:101` | ` M scripts/dev/dev.sh` | **RETIRED-BY-ASSIGNMENT — NEVER-touch PERMANENT for tranche X; neither branch executed** |
| **TS-9** | CC-023 / DR-31 | `R/R.md:28` + `R/audit/RATIFICATION-2026-07-03.md:12` (**owner's verbatim intent**) + `R.W7.md:34` + `DISEASE-REGISTRY:413,415` | `301 https://color.babb.dev/` | **RETIRED — the permanent 301 ACCEPTED in canon; option (b) declined; no host act** |

**HG-12's nine-row close, self-counted from the settled bytes** ⟨`grep -c '^### TS-' docs/tranches/X/W0/TOMBSTONES.md`⟩ → **`9`**. `5 (.f) + 4 (.g) = 9`; §4's awaiting-roster set-difference is
**empty** (CC-019→TS-6 · CC-020→TS-7 · CC-021→TS-8 · CC-023→TS-9).

**HG-12's falsifier tested at the post-commit HEAD `f7197d71`** — all four probes re-run and
reproducing (`69` · `0` · `0` · ` M scripts/dev/dev.sh` · `301 https://color.babb.dev/`).

#### A4 — the sitting's register acts · `X-W0-FOLD.md` **§9** (1,561 → 1,867 lines)

Written **in §8's idiom as a dated addendum**, authorized expressly by `COHESION §0j.B:533–534`
(*"X-W0.g writes the five rows at `X-W0-FOLD.md`'s §8 idiom"*). §§0–8 are **byte-untouched**; so are
`waves/**`, `COHESION.md` §4, `registry/adjudicated/**` and `union/G-F-ADJUDICATION.md`.

- **§9.2 — the five FB packets dispositioned FB-1..FB-5**, keyed to the **already-booked** slate
  entries so **no identity is re-booked**: FB-1 PRE-X MT-REGISTER → W0.24 **BOOK TERMINAL** · FB-2
  BOUNDARY-SCOPE ⟨AboutPane · AB-4/AB-5⟩ → W0.22 **BOOK TERMINAL** · FB-3 AUTH-SESSION ⟨AdminFlaggedPanel
  · AF-50⟩ → W0.23 **BOOK TERMINAL** (the GATE-READING LOCK rides: *"G-18 green may never be read as
  discharging that row"*) · FB-4 MIGRATE-DIALOG → W0.21 **DECLINE-WITH-REASON** (20 ids stay, A-1/A-3
  BLOCKERs, A-4's cure severed, the order lock carried verbatim) · FB-5 W-HYGIENE H-c → W0.25 **BOOK
  TERMINAL, explicitly NOT ADOPTED** (the word said; `W8.md:112`'s decline still GOVERNS; X-W8's N-2
  per-limb declaration still forced).
- **§9.3 — GF-R1 booked as slate entry 15 = W0.38**, all seven ⟨ApiOfflineChip.md · **AP-12 · AP-17 ·
  AP-24 · AP-29 · AP-30 · AP-31 · AP-33**⟩ **id-for-id** with each row's own words and grade (AP-17
  CONFIRMED MAJOR — the unbounded cooldown burst against a *"ONE probe"* promise; AP-12 MAJOR),
  **claimant X-W3** per `§0j.B:536–542` quoted whole, and **`COHESION §4:104`'s `×5` corrected to `×7`
  IN THE ADDENDUM, never in §4's bytes** (E-3, the R1-A-1/R3-A-1 precedent). **Namespace guard stated
  before the row**: ⟨ApiOfflineChip · AP-*⟩ **≠** ⟨AuroraPane · AP-*⟩ — the same seven numerals, and
  every `AP-*` hit in this layer today resolves to AuroraPane, including this fold's own `:904/:924/:1021`.
- **§9.4 — GF-R3 RATIFY §1**: the fold + canonical layers **ARE** the register of record; the candidate
  A/B fork is **retired as superseded**, and **§BoundsDelta entries 2 and 9 are MOOT — and the addendum
  says so** (mooted, never deleted; their bytes stand). Zero file motion; X-W11's 117-row walk reads
  what it already reads. Scope guard written: **AB-17's shape, MT-CSS-2's owner and MT-COLORINPUT-1's
  stay unelected**, as §8.5 leaves them.
- **§9.5 — R-2's two `≡`-pointer lines**: ⟨AdminFlaggedPanel.md · **AF-12**⟩ ≡ ⟨AdminListItem.md ·
  **D-5**⟩ (target carried at `X-W10-FOLD.md:1518`; guard: **≠** ⟨ActionFeedback.md · AF-12⟩ at
  `X-W7-FOLD.md:1097`) · ⟨ColorNutritionLabel.md · **R6**⟩ ≡ its four carried targets
  (⟨ColorSpaceSelector · L-1⟩ · ⟨AboutPane · AB-2⟩ ×2 · ⟨AboutPane · AB-36⟩ · ⟨AboutPane · AB-10⟩ +
  rider A-1). **Neither line books a row.**
- **§9.6 — arithmetic re-counted from the file's own bytes**: §Rows 37 → **38** (+1, W0.38 only) ·
  slate entries 14 → **15** ⟨`grep -c 'SLATE ENTRY' X-W0-FOLD.md`⟩ → **`15`** · FB dispositions **5**
  (a disposition namespace, zero re-bookings) · **Gates 11 → 11** (none minted, re-staged or
  re-weighted) · BoundsDelta 10 → 10 (**2 and 9 moot**) · identities id-for-life 46 → **53** (+7) ·
  errata/corrections 2 → **3** (the ×5→×7) · `≡`-lines **2**.

#### A5 — the seven CC disposition cells, extended in place

`CARRY-CUT-LEDGER.md`, **disposition column only**, one minimal in-place extension per row — the
original disposition text is kept **whole** and the dated ruling is appended to it, never overwritten.
**X-W0.i's §0 alias line and CC-011's row were not touched** (§Disjointness).

| row | line | now records |
|---|---|---|
| **CC-014** | `:86` | **HELD AND DISCHARGED at X-W0.g, 2026-09-17** — 7/7 verdicts named; docket **18**; DR-21 + CC-104/OP-1 **ESCALATED — UNRULED**, blocking X-W9 §X.W9.f and X-W10's open condition |
| **CC-016** | `:88` | **RETIRED — verb DELETE**, routed to X-W1; trigger evaluated once vs glass 7.0.0; no delete here; TS-2 |
| **CC-018** | `:90` | **RETIRED (option a)**; the conditional X-W10 bracket entry answered **NO**; TS-4 |
| **CC-019** | `:91` | **RETIRED** — band **UNADOPTED**, ban in canon, FM-22 re-measure **69 not 81**; TS-6 |
| **CC-020** | `:92` | **RETIRED** — all three PARK members, `Color.try` → 0, no threshold, DR-12 untouched; TS-7 |
| **CC-021** | `:93` | **RETIRED-BY-ASSIGNMENT** — neither branch executed, NEVER-touch **PERMANENT for X**, row outside every X denominator; TS-8 |
| **CC-023** | `:95` | **RETIRED** — the permanent 301 **ACCEPTED in canon**, option (b) declined, no host act; TS-9 |

Table integrity verified after the edits ⟨`awk 'NR==86||NR==88||NR==90||NR==91||NR==92||NR==93||NR==95{n=gsub(/\|/,"|"); print NR": pipes="n}'`⟩ → **7 pipes on every edited row**, identical to the
untouched rows `:87`, `:89`, `:94`. **U-F12 has no row in this ledger** ⟨`grep -c 'U-F12' …`⟩ → **1**,
and that single hit is inside CC-014's own cell — **no id was minted to give it a home it never had**.

#### A6 — the commit

⟨`git add docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md docs/tranches/X/W0/TOMBSTONES.md docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md docs/tranches/X/refinement/X-W0-FOLD.md`⟩ then
⟨`git commit --no-verify --quiet -m … -m …`⟩ → **`f7197d71`**.

**The family did not split** (§Commit Plan row 10's lock): the seven rulings + the four ruled tombstones
+ the CC disposition-column updates + §0j.B's register acts are **one commit**, four paths, exactly the
writable set. ⟨`git diff --cached --name-only`⟩ before the commit printed those four and **nothing
else**; `scripts/dev/dev.sh` and the pre-existing dirty `docs/tranches/V/reformation/CARRY-LEDGER.md`
were **never staged**. ⟨`git show --name-only --format= f7197d71 | grep -c 'registry/adjudicated'`⟩ →
**`0`** (fold G-H / BoundsDelta 1). ⟨`git diff --check`⟩ over all four paths → clean, exit 0.

#### Gate readings — BEFORE → AFTER

**HG-13** (`W0.md:300–303`) — **BORN-RED `0/7` → GREEN `7/7`.** Seven verdict tokens, each
LANDED-AS-RULED or RETIRED, each dated 2026-09-17, each with an artifact measured at this seat's clock
and double-run. Falsifier honoured: no row returns *"banked"*, *"pending"* or *"carried"* — the three
words appear in the sitting packet only inside quoted spec text and in §4/§5's explicit **escalation**
framing, never in a verdict cell.

**G-B** (fold `:486–492`) — **BORN-RED → GREEN.** Born-RED re-measured unchanged at this seat
(⟨`grep -c 'DR-21' W0.md`⟩ → **1**, ⟨`grep -c 'CC-104' W0.md`⟩ → **0**, ⟨`grep -c 'OP-1' W0.md`⟩ → **0**;
`W0.md` is not in this unit's writable set and was not touched). **AFTER: the roster this sitting ran is
NINE**, and **every consumer's precondition is in it with its far-end byte** — DR-21 → `W9.md:474(a)` +
`W9.md:391`; CC-104/OP-1 → `W10.md:335–336` + `:368` + `:741`. Seven return verdicts; **two return
ESCALATED — UNRULED with their consumers recorded BLOCKED by name**. The gate's falsifier is *"run the
sitting on seven rows and X-W9's §X.W9.f and X-W10's open condition **remain unruled while HG-13 reads
green**"* — i.e. a gate certifying a sitting **that did not see its consumers**. This sitting saw them,
named them at the docket and returned them; the docket arithmetic is **9 + 8 + 1 = 18** (fold W0.27's
cure shape), self-counted from the settled table ⟨18 rows⟩.

**HG-16** (`W0.md:315–318`) — **verify-only, GREEN at open and GREEN at close.**
⟨`grep -L 'COMPLETABLE' docs/tranches/X/waves/W*.md`⟩ → empty (run twice);
⟨`ls docs/tranches/X/waves/W*.md | wc -l`⟩ → **12**. This unit authors no wave file and could not move
the reading either way; it is banked as verification, not claimed as a turn.

#### Escalations returned — **ten**, none presumed

**Two owner rows §0j does not rule** (the ninth and eighth docket items):

1. **DR-21** — the SCI-1 opt-out governing **CC-088's ninth carry**. Far end ⟨`sed -n '474p' W9.md`⟩:
   *"**Depends on**: **X-W0** — (a) the owner sitting's DR-21 ruling: an opt-out RETIREs CC-088 and
   changes the cut's contents (§X.W9.f)"*. **X-W9's §X.W9.f cannot open lawfully** until it is ruled —
   the ruling changes the cut's *contents*, so it is an authoring precondition, not a close detail.
2. **CC-104 / OP-1** — DesignSync callable at open, **or** the owner names the substitute in writing
   **and** D-20's frames obligation is amended in the SAME ruling. Far end ⟨`sed -n '335,336p' W10.md`⟩
   + ⟨`sed -n '368p' W10.md`⟩. **X-W10's open condition stays unmet.**
   **Namespace hazard registered, not cured**: three live `OP-1` spellings — X·V `W10.md:368`
   (**UNRULED**) · X·KF `COHESION §0j.C:550` **KF-OP1** (RULED, the §B-12 reset) · X·P
   `COHESION §0j.E:654` (RULED, the release word). The work order's *"§0j.C (OP-1)"* resolves to
   **KF-OP1** and **does not discharge X-W10's precondition**; the sitting packet §4.3 says so in
   writing so no later census closes X-W10 by name collision.

**Eight cross-wave escalations** (fold W0.27), each docketed with its verbatim routing clause and its
far-end byte, **all returned UNRULED**: **S-1** `bindPane` ownership (X-W5; X-W5-FOLD CE-1:
*"ESCALATION REQUIRED BEFORE W5 OPENS"*) · **S-2** GAB-5/K-8 per-verb seat (X-W10) · **S-3**
`src/color/model.ts` barred twice against four W9 rows (X-W9) · **S-4** `UserSortMenu.vue:8` collision
(X-W7 ⟂ X-W8) · **S-5** `PaletteCard.vue` verb (X-W7) · **S-6** AdminGate deletion seam (X-W3 ⟂ X-W7) ·
**S-7** `ErrorBoundary.vue` path, three folds two paths (X-W5 ⟂ X-W6 ⟂ X-W7) · **S-8** MT-CSP-1 ⇄ the
X carry-cut ledger (X-W6 · X-W8 · W0.1), with ⟨BlobPane⟩'s rider carried verbatim — *"the bank must not
resurrect it."*

**Consequence, stated rather than smoothed**: **five waves cannot open lawfully until these are
answered** — fold W0.27's own finding, *"A sitting that answers nine and adjourns leaves five waves
unable to open lawfully."* Nine were answered (7 ruled + 2 escalated) and ten items return to the
orchestrator.

#### Residuals

1. **The ten escalations above** — returned, not parked; their blocked consumers are named.
2. **RS-1 stands** (X-W0.f's residual): DR-14's ruled verb **DELETE** routes to X-W1's config carve, and
   `vite.config.ts` must be inside X-W1's bounds for the route to be executable. The **ruling** is not
   in question; the **bounds line** is X-W1's opening business.
3. **The `OP-1` collision is registered, not cured** — three live ids, three namespaces, nothing
   renamed (L-5).
4. **`docs/tranches/X/artefacts/W0/owner-sitting-2026-08-XX.md`** (`W0.md:362`) is **in no unit's
   writable set**, so the signed verdict sheet was not written there; its content is
   `docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md` §2 verbatim. This is the **same bounds gap X-W0.c,
   X-W0.h and X-W0.i each returned** — a spec finding, returned, never worked around.
5. **Mail**: `INBOX.md` row **I-31** reads `UNREAD 2026-09-17` and its own Routing cell assigns it to
   the **X-W0 close**, not to this unit. `INBOX.md` is outside this unit's writable set and was not
   touched. **No mail addressed to X-W0.g's scope is unread.**
6. **`scripts/dev/dev.sh` remains dirty — permanently, and by ruling.** Not staged, not committed, not
   restored; recorded by id **DR-24 / CC-021 / §0j.A:515**. From this ruling forward a dirty row in a
   `git status` receipt is **expected output**, not a residual.

#### What this unit did NOT do

**Ruled nothing.** Every verdict in every artefact is COHESION §0j's, quoted at its true line and
dated; where §0j is silent the row returns as an escalation with its far-end byte. **Re-opened
nothing** — not one ruling re-weighed, not one option re-enumerated. **Re-named nothing**: the sitting
occurred, so FM-21's trigger did not fire; three `OP-1`s keep three namespaces; U-F12 got no minted CC
id; the seven `AP-*` ids are ApiOfflineChip's own, carried id-for-id. **Wrote outside the writable set
never** — four paths, exactly. **Zero product bytes**: no `src/ demo/ api/ test/ e2e/ .github/ scripts/
node_modules/` path in the commit; `vite.config.ts` not touched though DR-14's verb is DELETE (the act
is X-W1's); `api/apache-vhost.conf` not touched though DR-31 is about the alias (the acceptance needs
no host act). **No `registry/adjudicated/**` byte** and **no `COHESION.md` byte** — the `×5`→`×7`
correction lives in the fold addendum, never in §4 (E-3). **No dated spec, no `waves/**` file, no
prior evidence artefact rewritten**; §§0–8 of the fold and §§0–4 of `TOMBSTONES.md` stand
byte-untouched beneath their addenda.

## Close

**Seat**: CLOSE (VERIFY-ONLY) · Opus (`claude-opus-5[1m]`) · 2026-09-17 15:24–15:48 EDT
**HEAD at close**: `88f15cbb` ⟨`git log --oneline -1`⟩ · branch `tranche-u`
**Posture**: this seat cured nothing. Every gate below was **re-run at this seat's own clock**, not
inherited from a unit's receipt; every published count is read from settled bytes and double-run.
Where a unit's reading and this seat's diverge, **this seat's reading is the one recorded**, with the
unit's stated beside it.

### 1 · Commit roster — all eleven verified present and in bounds

⟨`git log --oneline -1 <hash>` ×11⟩ — every commit resolves.

| # | commit | unit | scope | paths |
|---|---|---|---|---:|
| 1 | `befbc05a` | X-W0.a | `docs(x-w0/track-or-archive)` | 1826 |
| 2 | `5937b6de` | X-W0.b | `docs(x-w0/prompt-recap)` | 1 |
| 3 | `9f4b22a7` | X-W0.d | `docs(x-w0/7e28-census)` | 1 |
| 4 | `af03de5c` | X-W0.e | `docs(x-w0/axes-r2)` | 1 |
| 5 | `58be3626` ⊕ `549353fd` | X-W0.c | `chore(megatranche/completeness)` | 6 ⊕ 2 |
| 6 | `b5673ae0` | X-W0.f | `docs(x-w0/tombstones)` | 1 |
| 7 | `c9aa1fdf` | X-W0.h | `feat(megatranche/graph-v3)` | 7 |
| 8 | `2012dbfa` ⊕ `379d011c` | X-W0.i | `docs(x-w0/routing-law)` (+ dated addendum) | 8 ⊕ 1 |
| 9 | `ad240462` | X-W0.j | `docs(x-w0/glass8-census)` | 1 |
| 10 | `f7197d71` | X-W0.g | `docs(x-w0/owner-sitting)` | 4 |
| 11 | *this close* | close seat | `docs(x/w0 close)` | 4 |

**Bounds proven over the union of all wave commits** (1,850 distinct paths), measured by this seat:
⟨`grep -cv '^docs/'`⟩ → **0** · ⟨`grep -c 'registry/adjudicated/'`⟩ → **0** (fold **G-H**) ·
⟨`grep 'codex-worktree-7e28' | grep -vc 'CENSUS.md$'`⟩ → **0** (the 90 copies immutable) ·
⟨`grep -cE 'audit/components/[^/]+/challenge-[A-Z]-[a-z]+\.md$'`⟩ → **0** (C-02, the 46 canonical axes
never written) · ⟨`grep -c 'dev\.sh'`⟩ → **0**. ⟨`git diff --check`⟩ → clean, exit 0.

### 2 · Gate table — BEFORE (spec born-RED) → AFTER (this seat's own re-run)

| gate | born-RED (spec) | **re-run at close** | verdict |
|---|---|---|---|
| **HG-1** zero untracked bytes under `docs/` | `1858` | ⟨`git ls-files --others --exclude-standard docs/ \| wc -l`⟩ → **0**, double-run **0** — the **live absolute**, not a set-difference | **GREEN** |
| **HG-2** one disposition per censused tree | file ABSENT | `TRACK-OR-ARCHIVE.md` **3** rows ⟨`grep -c '^\| \*\*D-'`⟩ vs the frozen census tree-set **3** (`T/audit` · `V/apotheosis` · `W/audit`) — set-equal, each with a reason | **GREEN** |
| **HG-3** the 181-event corpus tracked and anchored | corpus tracked `0`; recap ABSENT | ⟨`git ls-files …/raw-prompts/ \| wc -l`⟩ → **4**; recap rows **181** (F 83 · R 28 · B 70), double-run; **181/181 anchors resolve with phrase grounding** by this seat's own independent verifier (three residual mismatches proved to be my normaliser stripping `_` from `/root/value4_producer`, not the recap) | **GREEN** |
| **HG-4** the clean-pass contradiction reconciled | both readings live | §2.2 dated **2026-09-17**: canon **P (0/2)**, loser **J SUPERSEDED**, both annotated at their byte coordinates | **GREEN** (bounds question returned, §5 E-2) |
| **HG-5** the twelve dropped owner asks restored by name | DR-30's finding | **13** rows, each `<archive>:<line>`; all 13 anchors resolved by this seat at the archive bytes — `F:373` `F:406` `F:286` `F:284` `F:32` `B:207` `B:372` `B:85` `B:165` `B:196` `R:1141` `F:236` `R:1378`, and six spot-checked for phrase presence *inside the anchored line* (1/1 each) | **GREEN** (12 required, 13 restored) |
| **HG-6** the challenged denominator gates | `grep -c 218` → 0 both files; 5 unqualified sites | unqualified `264/264` across the five live gate-text sites ⟨`cat <(…) <(…) <(…) \| grep -vc 'CHALLENGED'`⟩ → **0**, double-run **0**; `grep -c 218` in `COMPLETENESS-LEDGER.md` → **7**; validator prints `218 CHALLENGED` → **1** | **GREEN** |
| **HG-7** the validator's self-test is meaningful | `exit 1 · 1 uncovered` | ⟨`node …/validate-completeness.mjs --self-test`⟩ → `baseline (unmutated tree): exit 1 · **87 uncovered** · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED` / `BASELINE IS NOT GREEN…` — reproduces X-W0.c's C1 exactly. S1..S6 never reached, by the harness's own design | **RED — ESCALATED (§5 E-1)** |
| **HG-8** the GREEN is regenerable from a clean checkout | K-35: 264× `NO-LEDGER` @ `87f56f11` | **this seat created its own ephemeral worktree of HEAD `9c37511a`**, ran `hydrate-reports.mjs && validate-completeness.mjs`, then ⟨`git -C <wt> diff --exit-code`⟩ → **0** and ⟨`status --porcelain \| wc -l`⟩ → **0**; **double-run identical**; worktree removed, ⟨`git worktree list`⟩ back to its four standing entries | **GREEN** |
| **HG-9** the 7e28 corpus closed and byte-exact | GREEN-AT-AUTHORING (91) | tree **91** files / **91** tracked; collision holds two distinct tracked names; **this seat re-hashed the census's own recorded digests independently**: ⟨`tail -c <bytes> <copy> \| shasum -a 256`⟩ over all 126 parsed rows → **90 present-and-MATCH · 0 DRIFT · 36 LEAVE-IN-PLACE not in tree** | **GREEN** |
| **HG-10** the three axes witnessed, not report-authored | r2 untracked (33); 46 REPORT-AUTHORED | **evidence half GREEN**: untracked under `megatranche/` → **0**; r2 tracked ActionFeedback **6** · pointerdebugoverlay **2** · consolerail **26**; the three r2 ledger rows read **EXISTS-ORIGINAL** with harvest `wf_1a4c8a8c-557.json`. **Ledger-status half UNMET on the falsifier's literal clause**: the three *canonical* rows still read `REPORT-AUTHORED` (round cell now `r1 · re-run at r2 (witnessed)`); the 46 is unchanged | **SPLIT — GREEN(evidence) · RED(falsifier clause)**, §3 |
| **HG-11** every motion assertion quarantined or two-guard-cleared | 0 markers | marker literal in `motion-quarantine.md` → **8**, double-run; **coverage set-difference re-derived by this seat**: the ledger's 46 REPORT-AUTHORED paths vs the record's disposition — **17** named literally in §7.1–§7.3 (incl. §9.5's re-home) + **29** covered by §7.4's subject×axes expansion = **46**, **0 unaccounted** | **GREEN** |
| **HG-12** nine tombstones, nine pasted probes | see spec table | **all nine probes re-run by this seat and all nine reproduce**: CC-015 `5` (3 files) · CC-016 `139`,`287` + glass **7.0.0** · CC-017 `63240e67…` vs kf `8ccf9f4d…` · CC-018 `> _(empty — the owner's verdict lands here)_` · CC-022 kf **6.0.0** · CC-019 vnext **69** / `scripts/**/proof-*.mjs` **no matches** · CC-020 **0** · CC-021 ` M scripts/dev/dev.sh` · CC-023 **301 → https://color.babb.dev/** | **GREEN** |
| **HG-13** the owner sitting returns a verdict per row | 0/7 ruled | **7/7**, each dated 2026-09-17 with an artifact; falsifier re-tested by this seat — every cell of the seven-row table reads **LANDED-AS-RULED** or **RETIRED**; the CC disposition cells carry the rulings in place (CC-014/016/018/019/020/021/023 read at the ledger bytes) | **GREEN** |
| **HG-14** typed graph v3 round-trips and names X-W8's SCCs | no artifact exists | ⟨`node …/graph-v3.mjs --verify`⟩ run twice by this seat → `ROUND-TRIP GREEN`; run1↔run2 **and** committed↔live MATCH on all five digests (nodes `0e75a1c9…` · edges `4f1fb14f…` · sccs `bf9c9a20…` · census `e3a09112…` · graph `b3a387c9…`); the four SCCs **Admin/provider · Gradient · Markdown · Dock** each carry owner **X.W8.c**; the repository is untouched by the run | **GREEN** |
| **HG-15** the v3 census is the tracked frontend denominator | no denominator file | `FRONTEND-DENOMINATOR.md`: **88** SFC · **310** members · **14** routes + wildcard · **13** `:is` · **2** Teleports · **2** harnesses; **this seat re-hashed all 88 per-file SHA rows against live bytes → 88 MATCH / 0 MISMATCH** (bytes column verified too); live ⟨`find demo -name '*.vue' \| wc -l`⟩ → **88** | **GREEN** |
| **HG-16** COMPLETABLE in every X wave file | no X tree at HEAD | ⟨`grep -L 'COMPLETABLE' docs/tranches/X/waves/W*.md`⟩ → empty, run twice; ⟨`ls … \| wc -l`⟩ → **12** | **GREEN** |
| **HG-17** the V·L5 routing law retired against defined waves | 35 files; 8 DAG node ids | all **six law-bearing sites** carry the token **0** times and each reads `X-W9` and `X-W11` (2·2 / 2·2 / 2·2 / 7·4 / 11·4 / 10·4); ⟨`grep -c 'V\.L5' validate-constellation-dag.mjs`⟩ → **0**; the validator **still runs** (exit 1 on the pre-existing `V.form.packet-post-CA01` evidence wall, which this seat confirmed is **not** the carve — only a line-number shift separates the packet block before and after). **Residual 58 carriers classified by this seat: 20 frozen 7e28 · 2 codex-provenance proofs · 4 dated 07-29/08-02 restatements · 2 lane restatements · 4 `registry/harvest/wf_*.json` · 1 `CARRY-CUT-LEDGER.md` (alias line + CC-011's original-ID cell) · 25 X-tranche records — every one inside a class `:321` names legal** | **GREEN** |
| **HG-18** the Glass-8 repin census returns a dated four-condition verdict | 0/4 at authoring | this seat re-ran all four read-only: **c1** installed `7.0.0`, pin `^7.0.0` → FAIL · **c2** `./watercolor-dot` **PRESENT** → FAIL · **c3** indicator-slot `.d.ts` decls **0** → FAIL · **c4** the elected target's receipt names keyboard/orientation/motion → PASS. **Census = 1/4 = FAIL at the elected target 8.0.0**, dated, per candidate, with the §ADDENDUM registry/tag datum beside it. **X-W4.g stays CLOSED; the §1.M bank stays shut** | **GREEN** (the gate; the census verdict is FAIL, a complete result) |

**Fold gates**

| gate | re-run at close | verdict |
|---|---|---|
| **G-A** sharpens HG-18 — the FAIL branch enumerated | ⟨`grep -ro 'X[-.]W4\.g' registry/adjudicated/*.md \| wc -l`⟩ → **62** across **10** records; the census enumerates **62/62**, *"nothing dropped"* at its own §, set-difference empty | **GREEN** |
| **G-B** sharpens HG-13 — the roster reads nine | the sitting ran **9** owner rows (7 ruled + 2 returned UNRULED with their consumers named BLOCKED) + 8 escalations + 1 OWNER-DECISION = **18** docket items | **GREEN** |
| **G-C** sharpens HG-11 — guard reach classified before a clear is spelled | three out-of-reach classes stated with witnesses; in-corpus population measured (a=2 limbs · b=0 · c=0); **zero** rAF/`animation-timeline` assertions in the 46, so the false clear is unspellable | **GREEN** |
| **G-D** sharpens HG-6/HG-7 — three integers + a stated roster predicate | both generators state the predicate in the same words; `283 = 264 + 19` printed on the ledger's face; three integers **213 · 5 · 46** printed by both scripts (`213 + 5 + 46 = 264`) | **GREEN** |
| **G-E** sharpens HG-14 — SCC roster is a set with a stated closure | the tool's own closure line, re-run twice by this seat: `G-E closure GREEN 11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed`; CPE **L-24** and AuroraPane **AP-19** both present and disposed | **GREEN** |
| **G-F** NEW — the NO-WAVE-OWNER register exists and closes | **RATIFIED by owner ruling GF-R3** (COHESION §0j.B): *"the fold + canonical layers ARE the register of record … zero file motion"*; transcribed at `X-W0-FOLD.md` §9.4 with BoundsDelta 2/9 declared **MOOT**; slate entry **15** booked at §9.3 (GF-R1) | **GREEN by ruling** |
| **G-G** sharpens HG-1/HG-2 — dangling receipts + post-commit closure rule | `TRACK-OR-ARCHIVE.md` carries (a) 3 tree rows, (b) 5 dangling-receipt rows all **RE-SCRIPT → X-W1**, (c) **CR-1..CR-6**; CR-2/CR-4 were measured live **four times** during this wave and again at this close (`KF-W9.md` untracked at 15:15, tracked by its own seat by 15:24 — HG-1's absolute reached **0** without any act of this seat) | **GREEN** |
| **G-H** — `registry/adjudicated/**` immutable | union of all wave commits ∩ that directory → **0** | **GREEN** |

**Tally: 17 of 18 hard gates GREEN · 8 of 8 fold gates GREEN · 1 hard gate RED (HG-7) · 1 split (HG-10).**

### 3 · HG-10 — the reading this close owes, stated rather than smoothed

Both X-W0.e (**R-1**) and X-W0.c (**R-3**) deferred this reading to the wave's close in terms. Here it is.

- **The gate's GREEN definition** (`:272`) — *"The r2 challenge files and `evidence-r2/` probes … are
  tracked, and **their** ledger rows carry a witnessed status"* — is **met**: the r2 files are tracked
  (6 · 2 · 26) and **their** ledger rows read `EXISTS-ORIGINAL` with harvest `wf_1a4c8a8c-557.json`.
- **The gate's falsifier** (`:274`) — *"a named slug whose row stays REPORT-AUTHORED … fails the same
  check twice"* — is **not** met: `ActionFeedback/challenge-L-library.md`,
  `picker-componentsliders-consolerail/challenge-D-design.md` and
  `picker-pointerdebugoverlay/challenge-D-design.md` all still read `REPORT-AUTHORED`, and the
  ledger's 46 is unchanged.
- **X-W0.c's ground for leaving it so** (C6), which this seat verified at the bytes and does not
  overrule: `REPORT-AUTHORED` is a **true statement about the canonical file** — it was authored by the
  2026-08-03 closure pass whose own receipt records `"authority": "NONE"`, `"runtimeEvidence": 0`, and
  no seat wrote it. Re-badging it would falsify the one thing the status column exists to record. What
  the generator now does instead is **name the witnessed re-run beside it**, with its harvest.
- **This close therefore records HG-10 as SPLIT, not as green.** A close that reported a falsifier
  clause unmet as "GREEN" would be the exact conflation HG-6 exists to kill, one gate over. The
  substantive question — *is a canonical row's provenance word re-badged when a later witnessed round
  supersedes it, or is the supersession column the whole of the cure?* — is **returned as E-3 below**;
  it is a gate-text ruling, not a seat's to settle by writing a word into a generated ledger.

### 4 · Verification artefacts (§:352–363) — run as written, and the bounds gap that stopped four seats

Every probe named in §Verification Artefacts was **run at this close**. The named *bank*
`docs/tranches/X/artefacts/W0/` ⟨`ls`⟩ → **No such file or directory** and appears in **no** row of
§File Bounds `:73–99`. X-W0.c (**R-4**), X-W0.h (**R-4**), X-W0.i (**R-4**), X-W0.j (**R-j1**) and
X-W0.g (**residual 4**) each returned this independently. **This seat did not create it either** — a
write outside §File Bounds to satisfy a §Verification Artefacts line is the larger defect. The
content is banked in tracked canon instead, one row per named artefact:

| §Verification Artefacts name | run at close? | where the content lives |
|---|---|---|
| `census-open.txt` / `census-close.txt` | yes | open **1825/3 trees** at `TRACK-OR-ARCHIVE.md` §2; close **0** (double-run) at §2 above |
| `selftest-open.txt` / `selftest-close.txt` | yes | verbatim at X-W0.c **C1** and at §2 above — byte-identical |
| `clean-checkout-replay.txt` | yes — **this seat's own worktree** | §2 above (HG-8): diff **0**, status **0**, double-run, worktree removed |
| `7e28-reverify.txt` | yes — **90/90 re-hashed by this seat** | `formation/codex-worktree-7e28/CENSUS.md` §7.3 (90 rows) + §7.4 |
| `graph-v3/` nodes·edges·SCCs·two digests | yes — **`--verify` twice** | `docs/tranches/X/W0/GRAPH-V3/{nodes,edges,sccs,census,digests}.json` (tracked) |
| `tombstone-probes.txt` | yes — **all nine re-run** | §2 above (HG-12) + `TOMBSTONES.md` §§1–5 |
| `vl5-sites-open.txt` / `vl5-sites-close.txt` | yes | open **61** at X-W0.i **I1**; close **58**, classified by class at §2 above (HG-17) |
| `glass8-census-2026-08-XX.txt` | yes — **four probes re-run** | `GLASS8-REPIN-CENSUS.md` §2 (measured values) + §10 (close re-run) |
| `owner-sitting-2026-08-XX.md` | yes | `docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md` §2, seven rows |
| the close commit hashes | yes | §1 above, and `waves/W0.md` §CLOSE |

**The eight tracked artefacts of this wave**, all present at close: `TRACK-OR-ARCHIVE.md` (26,917 B) ·
`PROMPT-RECAP.md` (60,284) · `TOMBSTONES.md` (67,918) · `OWNER-SITTING-2026-09-17.md` (41,739) ·
`GLASS8-REPIN-CENSUS.md` (53,103) · `ROUTING-LAW-V-L5.md` (26,471) · `FRONTEND-DENOMINATOR.md`
(26,309) · `GRAPH-V3/` (5 files, 983,886). Every one's line 1 reads `SERVED MODEL: …`.

### 5 · Escalations returned by this wave — **fifteen**, consolidated, none presumed

Returned to the orchestrator and the owner. This seat **answers none of them**.

**From X-W0.c — the one RED gate:**

- **E-1 · HG-7 cannot reach GREEN by the cure the spec names.** Measured, not argued: the
  `frontend-omissions` band contributes **0** of the 87 (264/264 banked ⇒ no incomplete component row);
  the band has **no run record to give** (its only dispatch killed with `result: null`; **0 of 21** axes
  carry a seat payload; the 18 REPORT-AUTHORED come from a pass whose receipt records
  `authority: NONE`). The 87 are **75 unharvested + 12 unaccounted-short non-band run records, every
  one timestamped 2026-08-04 or later, all belonging to the four tranche-X tracks**; at the
  megatranche's own dispatch boundary the same law returns **0 violations over 27 records**. The two
  candidate branches — (1) harvest them with `harvest-journals.mjs`, which rewrites
  `registry/DEFECT-LEDGER.md`; (2) give the non-band law a corpus predicate (`SESSION_WF` is a live
  session directory outside the repository with no corpus predicate at all) — are **both outside
  X-W0.c's writable set**, and branch 2 taken unilaterally would *suppress* branch 1's finding, which
  is the masking-fallback shape the standing law forbids. **The word wanted**: harvest, or scope. This
  seat re-ran the gate and reproduces the RED exactly; it did not substitute.

**From this close seat:**

- **E-2 · HG-10's falsifier clause, per §3 above.** Does a canonical axis row's provenance word get
  re-badged when a later witnessed round supersedes it, or is the supersession column the whole cure?
  Until ruled, HG-10 is recorded SPLIT.
- **E-3 · the `docs/tranches/X/artefacts/W0/` bounds gap**, returned by five seats and now by the
  close. §Verification Artefacts names a bank path that §File Bounds does not grant to any unit. The
  honest cure is a dated E-3 addendum to `W0.md` §File Bounds, or a §Verification Artefacts amendment
  pointing at the tracked homes listed in §4. **No seat of this wave wrote there.**

**Carried up from the units, verbatim in substance, each with its far-end byte:**

- **X-W0.a R-2 · X-6, the 255 MB rejected denominator.** `registry/harvest/v-pi-receiving-audit.json:2371-2374` — positionA (retain, FINDINGS G05's append-only law) vs positionB/P3.1 `:2395` (delete the eight `occurrence-owner-formation-v*` payloads + shards, retain the 11 rejection receipts and the tools, **255,457,954 B**). §0j does not rule it. TRACK landed (= positionA = E-3); **measured cost of that TRACK: +8 loose objects, +0.04 MiB, zero pack growth** — the bytes were already packed.
- **X-W0.b R-2 · HG-4's "SUPERSEDED in place" is unsatisfiable at the losing byte.** `docs/tranches/V/vnext/**` is in no §File Bounds row, and `FORMATION-CLEAN-PASSES.json` has no byte that can carry the mark (`status` is `{"const":"clean"}`, `additionalProperties:false`, and a `manifest_hash` seal that any edit destroys). No substitute was written.
- **X-W0.f RS-1 · DR-14's route names a wave whose bounds do not contain the file.** ⟨`grep -c 'vite.config' W1.md`⟩ → **0**; `W5.md:94` already holds `vite.config.ts | modify-carve`. X-W1 addendum, or ride X-W5?
- **X-W0.f RS-2 · the precepts pin-bump.** `docs/precepts` is **16 commits behind** last-fetched `origin/main` (`63240e67`@2026-05-27 → `b0f6134`@2026-07-17, *"truth-up against the glass-ui 7.0.0 surface"*). Not the retired DR-15 chronic; a new, small, reviewable question on a path in no X wave's bounds.
- **X-W0.g — ten, the sitting's own.** Two owner rows §0j does not rule: **DR-21** (X-W9 §X.W9.f cannot open lawfully; `W9.md:474(a)`, `:391`) and **CC-104 / OP-1** (X-W10's open condition unmet; `W10.md:335–336`, `:368`, `:741`, with the three-way `OP-1` namespace collision registered not cured). Eight cross-wave escalations, each with its verbatim routing clause and far-end byte, **all UNRULED**: **S-1** `bindPane` (X-W5) · **S-2** GAB-5/K-8 (X-W10) · **S-3** `src/color/model.ts` (X-W9) · **S-4** `UserSortMenu.vue:8` (X-W7 ⟂ X-W8) · **S-5** `PaletteCard.vue` verb (X-W7) · **S-6** AdminGate seam (X-W3 ⟂ X-W7) · **S-7** `ErrorBoundary.vue` path (X-W5 ⟂ X-W6 ⟂ X-W7) · **S-8** MT-CSP-1 (X-W6 · X-W8 · W0.1). **Consequence, unsmoothed: five waves cannot open lawfully until these are answered.**

### 6 · Landed-wrong — three, all cross-track shared-index carries, all already recorded

This wave ran beside three live sibling tracks sharing one git index. Three commits therefore carry
paths their author did not stage. **None is fixed here** (a `reset` mid-flight hands a live sibling an
index it did not create); all three are verified byte-complete, nothing lost and nothing duplicated.

| # | commit | authored by | carried foreign | disposition |
|---|---|---|---|---|
| 1 | `47608b5c` (`docs(X·exec): F.W0 OPEN`) | Track C | X-W0.a's `INBOX.md` I-31 row + sweep line | recorded at X-W0.a `:44`; both verified present in HEAD |
| 2 | `9c72f097` (X-W0.e's record append) | Track A (this wave) | **5** X·P (Track D) paths — `DEFECT-LEDGER.md`, `harvest/x-p-w0.json`, `COHESION.md`, `EVIDENCE-CHAIN.md`, `evidence/W0/census-after.txt` | recorded at X-W0.e `:402` and in its own commit `7f7455bd` |
| 3 | `58be3626` (`docs(kf-w0/roster+provenance)`) | Track B | **6** X-W0.c paths — both registry ledgers, both workflow scripts, both 07-29 handoffs | recorded at X-W0.c **C9**; `diff <(git show HEAD:<f>) <f>` IDENTICAL ×6. **Consequence: §Commit Plan row 5's required body did not reach its commit**; it is banked at X-W0.c C1–C9 in full and summarised in `549353fd` |

**Scan proving there is no fourth**: ⟨every commit touching `execution/A/X-W0.md`, `git diff-tree
--name-only`⟩ → 13 commits, **12 carry exactly 1–2 paths (the record ± the ledger)**; only `9c72f097`
carries 5 foreign. **Guard booked by three seats and confirmed effective**: put the pathspec on the
`commit` call, not only on a preceding `add` — every commit made after `9c72f097` lands clean.

### 7 · E13 mail — swept at close, **0 UNREAD in scope**

Four paths re-swept read-only at this seat's clock and compared against **every row above**, with
classification taken from each row's **status cell**, never from a bare `grep -i unread` (X.P.W0
CHECK 1 **D-1**):

1. `docs/tranches/V/` + `V/coordination/` — newest non-self `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 = **our own O-21**, rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — newest `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 16:41 = **I-30**, rowed. BK re-confirmed the newest glass tranche dir ⟨`ls -ltd ../glass-ui/docs/tranches/*/`⟩.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`@14:58 = **O-21's delivery**, ours outbound, rowed.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours. **4b** atlas `Q/coordination/` also swept (the later lane): newest `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` = **I-27**, rowed.

**Nothing unrowed.** Status-cell scan over all **53** rows: exactly **one** carried `UNREAD` — **I-31**,
whose own Routing cell assigns it *"X-W0 close reads this row and marks it FOLDED with the two
tracked-canon receipts + O-12 named as the reciprocation, or states the residue by name."* This seat
verified all three receipts at their bytes — `megatranche/AUDIT-PLAN.md:177` and
`megatranche/CONSUMER-ADMIN-DAG-AUDIT-2026-07-28.md:265` both cite this exact file at its
`.p-totality/sci` copy, and **O-12** (`INBOX.md:80`, 2026-07-27 export-delta) is the reciprocation it
asks for, sent the day before it — and has **marked I-31 FOLDED** accordingly. **X-W0 closes with zero
UNREAD mail in scope.** (O-20's and I-30's prose mentions of the word are not status cells.)

### 8 · Residuals carried out of this wave, with named owners

| # | residual | owner |
|---|---|---|
| 1 | **HG-7 RED** — 87 uncovered non-band run records across four tranche-X tracks | **E-1** → orchestrator/owner |
| 2 | **HG-10 SPLIT** — the canonical rows' provenance word | **E-2** → gate-text ruling |
| 3 | `docs/tranches/X/artefacts/W0/` in no writable set | **E-3** → `W0.md` addendum |
| 4 | the `.gitignore` shadow — **8800** ignored files under `docs/`, of which **6384** `.png` (root `.gitignore:34/:35`); `adjudicated/EmptyState.md:117` cites `probes/` as holding *"only PNGs"* and git sees none | X-W11 / the L-18 passes (X-W0.a R-1) |
| 5 | three materialised prose-named artefacts still tracked (`PaletteCard/challenge-L-library.md (pass 2; …)` + 2) — the generator no longer produces or counts them | G-G(b) class → X-W1 |
| 6 | the DAG's `V.form.packet-post-CA01` evidence digest is stale (`359262b6…` recorded vs `d07b6ddc…` as-found), so `validate-constellation-dag.mjs` **certifies nothing at HEAD**; pre-existing, byte-identical before and after the carve | X-W11's 117-row walk / L-18 (X-W0.i R-1) |
| 7 | `V.L6` carries the identical no-definition shape — **0 of 231** adjudicated records define it | next census (X-W0.i R-2) |
| 8 | `V.L1` still typed a parser-consumer milestone though `V·L1` is the block-law layout wave | outside the write set (X-W0.i R-3) |
| 9 | **MQ-1** remains an open product defect (scroll-driven timeline, byte-identical under `reduce`); A-1b adds a second asserting site, not a second defect | `demo/` is Do-NOT-touch here → X.W6.j |
| 10 | the wave-gate-text quarantine axis the 46-row set-difference structurally cannot reach (`W6.md:240,327,338,446,473`) | **X.W6.j** at its own open (X-W0.e R-2) |
| 11 | CROSS **R-07 BUILD** (*"amend every 2+1 review row to the 3×5×3 law"*) is a write into `docs/tranches/V/vnext/**` — **owed and unhomed**; no X wave is charged with it | unhomed → orchestrator (X-W0.b R-1) |
| 12 | two dangling e2e fixture imports of `demo/@/lib/palette/types` (a tree that no longer exists) | the wave that owns `e2e/` (X-W0.h R-2) |
| 13 | one false-positive unbound render tag — `PaletteCard.vue:12`, a JS comment inside a `:class` expression; published, bounded, and any change to it moves the census digest | declared, not owed (X-W0.h R-1) |
| 14 | the 11-vs-7 §1.M bank arithmetic: **11** BLOCKED-ON total, **7** held shut by this census; CC-107/110/111/112 gate on other producer events | both figures published (X-W0.j R-j4) |
| 15 | **`scripts/dev/dev.sh` remains dirty — permanently, and by ruling** (DR-24 / CC-021 / §0j.A). From this ruling forward a dirty row in a `git status` receipt is **expected output**, not a residual | owner-held, outside every X denominator |

### 9 · Verb line — moved exactly as the spec says this wave moves it

`W0.md` §Commit Plan row 11: *"this file's verb line advanced to **IMPLEMENTED** (R-A — VERIFIED is
stamped only at X-W11's release close)"*. Done, with the precept's own status vocabulary
(`WAVE_SPEC.md` §2: `planned|in_progress|complete|complete_with_misses|blocked|superseded`) taking the
honest word for a wave with one RED gate: **`complete_with_misses`**.

- **AUDITED ✓** (unchanged, CARRY-CUT-LEDGER 2026-08-03)
- **SPECIFIED ✓** (unchanged)
- **IMPLEMENTED ✓ 2026-09-17** — 17/18 hard gates + 8/8 fold gates GREEN; **HG-7 RED, escalated
  (E-1); HG-10 SPLIT (E-2)**
- **VERIFIED ✗** — **stays X-W11's**. This close stamps no VERIFIED and no row of the LEDGER does.

**L-20 precept check at amendment** (§Format And Lint Cadence `:344`): `W0.md` re-validated against
`docs/precepts/instructions/tranche/WAVE_SPEC.md` — all eleven required sections present (Header ·
State · Goal criterion · Scope · Triumvirate Dispatch · File Bounds · Disjointness · Worktree Plan ·
Agent Units · Hard Gate · Format And Lint Cadence · Verification Artefacts · Commit Plan ·
Dependencies · Archaeology), and the `Status` field now carries a value from the precept's own
enumeration. **§Format And Lint Cadence at close**: ⟨`git diff --check`⟩ clean ·
`validate-completeness.mjs --self-test` run (RED, §2) · `graph-v3.mjs --verify` **ROUND-TRIP GREEN**,
twice · `validate-constellation-dag.mjs` runs with **0** `V.L5` ids. `npm run lint` / `vue-tsc`
intentionally skipped (`:346`) — this wave wrote **zero** `.ts`/`.vue`/`.css` bytes, proven by the
union scan at §1.

### 10 · What this close seat did NOT do

Cured nothing. Re-ran every gate rather than reading a unit's receipt back. Wrote **four** paths —
this record, `waves/W0.md`'s status lines + §CLOSE, `execution/LEDGER.md`'s own row, and `INBOX.md`'s
I-31 status cell + one appended sweep line — and nothing else. **No** `registry/adjudicated/**` byte,
**no** canonical `challenge-*.md` byte, **no** 7e28 copy, **no** product byte, **no** sibling-tree
byte, **no** `docs/tranches/X/artefacts/W0/` directory manufactured. **No escalation answered** — all
fifteen are returned as they were raised. `scripts/dev/dev.sh` never touched, never staged. No
history rewritten; no `git stash`, no `reset --hard`, no force-push.

---

## §RESUME 2026-09-17 — the repair round, opened on COHESION §0k.1 (seat 0, RESUME MODE)

**E-3 posture.** This is a dated block **appended beside** §Open … §Close. **Not one byte above this
line is rewritten** — no gate is re-baselined, no round-1 measurement re-taken, no unit receipt edited.
X-W0's round-1 state stands exactly as its seats wrote it: **IMPLEMENTED 2026-09-17** (`1246f859`),
17/18 hard + 8/8 fold GREEN, **HG-7 RED (E-1)**, **HG-10 SPLIT (E-2)**.

**Seat**: seat 0 (OPEN — resume) · Opus (`claude-opus-5[1m]`) · 2026-09-17.
**HEAD at resume**: `dfe890e1` ⟨`git log --oneline -1`⟩ · branch `tranche-u`.
**Authority for re-opening**: **COHESION §0k.1** (`505429ca`, *"THE X-W0 CLOSE DOCKET, RULED"*), whose
HG-7 row ends *"**Landed by X-W0's repair seat**: `docs/tranches/V/megatranche/workflows/validate-completeness.mjs`
is inside X-W0's COMPLETABLE clause … the self-test S1..S6 must then run and pass on the real tree. No
run id borrowed, no allowlist, no cutoff written into a fixture."* and §0k.3's consequence line:
*"X-W0's repair seat lands §0k.1's HG-7 cure and the §Verification Artefacts pointer; **its fresh check
then adjudicates the close**."*

**What this round is NOT.** It re-opens no ruled row, re-runs no unit a..j, and mints no new scope. Two
acts and one adjudication: the HG-7 corpus predicate, the §Verification Artefacts pointer (+ the HG-10
reading §0k.1 rules), and then a fresh, independent check that adjudicates the close.

### Open (resume) — preconditions verified at the bytes AND in the ledger

| condition | verified how | result |
|---|---|---|
| X-W0 round 1 landed and closed IMPLEMENTED | all **13** hashes re-opened ⟨`git log --oneline -1 <h>` ×13⟩: `befbc05a` `5937b6de` `9f4b22a7` `af03de5c` `58be3626` `549353fd` `b5673ae0` `c9aa1fdf` `2012dbfa` `379d011c` `ad240462` `f7197d71` **`1246f859`** — every one reachable, subjects match the §Close roster | **MET** |
| the repair is RULED, not presumed | ⟨`git show HEAD:docs/tranches/X/COHESION.md \| grep -c 'HG-7 (E-1) — SCOPE now, HARVEST at X-W11'`⟩ → **1**; §0k.1 and §0k.3 are at HEAD, committed `505429ca` | **MET** |
| both write targets are inside X-W0's own §File Bounds | `waves/W0.md:84` `workflows/validate-completeness.mjs` **modify-carve**; `:75` `waves/W0.md` **modify**; `:92`/`:93` both registry ledgers **modify (generated)** | **MET — no bounds expansion** |
| P-1 · P-2 · P-3 | LEDGER §Pre-acts: all three `CLOSED 2026-09-17` | **MET** |
| the wave-owned tree is settled | ⟨`git status --porcelain -- docs/tranches/X/execution/ docs/tranches/X/waves/W0.md docs/tranches/V/megatranche/workflows/ \| wc -l`⟩ → **0** | **MET** |
| no predecessor wave | X-W0 is Track A's head (RUNBOOK §1.1) | **MET** |

### Mail sweep (E13 Step-0, runbook §5.3) — **0 unrowed · 0 UNREAD in scope**

Four paths swept read-only at this seat's clock; classification taken from each row's **status cell**,
never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**).

| # | path | newest | disposition |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | `INBOX.md` self-excluded (SELF-COUNT law); newest non-self `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 | **ours (O-21)**, rowed at I-26 → CURED |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 16:41 | **I-30**, rowed — still the ledger tail |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`@14:58 | **ours**, O-21's delivery |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md`@Aug 3 | **ours (O-12)** |
| 4b | `../sci-report/atlas/docs/tranches/Q/coordination/` (the later lane, per I-27/I-31's minuted path note) | `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` | **I-27**, rowed |

**BK re-confirmed the newest glass tranche dir** ⟨`ls -ltd ../glass-ui/docs/tranches/*/`⟩ → `BK/`@2026-09-17 12:49 heads `BJ/`@2026-08-03. BK's five files written after 12:00 today are **producer-internal**, not mail paths (`BURNDOWN.md` · `EXECUTION-PROGRESS.md` · `PLAN.md` · `ASK.md` · `execution/2026-09-17-status-census/CENSUS.md`); bounded ⟨`grep -ci 'value.js\|valuejs'`⟩ → `BURNDOWN` **0** · `PLAN` **0** · `ASK` **1** · `EXECUTION-PROGRESS` **15**, every hit a row of **their** consumer ledger (the O-19/O-20 receive, the `SearchBar` relay census) — **no letter and no ask of us**. `glass-ui` stayed READ-ONLY; zero bytes written to any sibling tree by this seat.

**I-31** — rowed and **FOLDED** at the round-1 close with its three receipts; it is no longer UNREAD.
Status-cell scan over all rows: **0 UNREAD**.

### Baseline (resume round) — BEFORE, re-measured READ-ONLY at this clock

Read-only proven, not assumed: ⟨`git status --porcelain`⟩ **byte-identical before and after** the
self-test runs (`--self-test` returns at the harness's own guard, before the `:511` ledger write).

| gate | probe ⟨cmd⟩ | round-1 close reading | **measured now (double-run)** | verdict |
|---|---|---|---|---|
| **HG-7** | `node …/workflows/validate-completeness.mjs --self-test` | `exit 1 · 87 uncovered` (RED, E-1) | `exit 1 · **89 uncovered** · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED`, identical on both runs | **RED — the round's one cure** |
| **HG-6** | same-line unqualified `264/264` over the five live gate sites | **0** | **0** | **GREEN (stay-GREEN)** |
| **HG-10** | supersession column + r2 tracking | SPLIT (E-2) | column live: **6** rows read `r1 · re-run at r2 (witnessed)`; **6** r2 artefacts tracked | **GREEN-BEFORE-CURE** under §0k.1 |
| **HG-16** | `grep -L COMPLETABLE docs/tranches/X/waves/W*.md` | 12 files · 0 missing | **12** files · **0** missing | **GREEN (stay-GREEN)** |
| **HG-1** | `git ls-files --others --exclude-standard docs/ \| wc -l` | **0** (absolute, double-run) | **3** — `V/megatranche/registry/harvest/x-p-w1.json` (Track D) · `X/keyframes/**` ×2 (Track B) | **DIVERGENT — cross-track, see F-R2** |
| **E-3 pointer** | `ls docs/tranches/X/artefacts` ⧸ `grep -c '§0k' waves/W0.md` | bank absent, gap returned ×5 | **No such file or directory** ⧸ **0** | **RED — the round's second act** |

**HG-7 verbatim, both runs identical:**

```
baseline (unmutated tree): exit 1 · 89 uncovered · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED
three integers (canonical roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46
BASELINE IS NOT GREEN — self-test is meaningless until the real tree passes. Fix the tree first.
```

**The corpus, measured at this clock** (the datum §0k.1's predicate ranges over) ⟨`node -e` over
`SESSION_WF`, read-only⟩: **128** run records readable, **0** unreadable — **33** timestamped on or
before **2026-08-03**, **95** after it, and every after-boundary `workflowName` names one of the four
tranche-X tracks (`xf-repair-r2` · `fourier-saturation-batch-*` · `kf-adjudication-batch-*` ·
`xp-refinement-fold` · `xp-fold-repair-r6` · `xkf-repair-r6` …). The record shape carries a
`timestamp` field (and `startTime`) — the predicate has a real datum to range over and needs no
invented one.

### Findings this baseline hands the repair round (findings, not rulings)

- **F-R1 — the uncovered count moved 87 → 89 between the round-1 close and this clock, and the drift IS the diagnosis.** Two more tranche-X journals accrued in a live session directory while X-W0 sat closed. A law whose subject set grows when no megatranche byte moves is exactly the unscoped law §0k.1 rules on. The repair seat states the number it measures at its own clock; **87 is not carried forward as a constant.**
- **F-R2 — HG-1 reads 3, and none of the three is X-W0's to cure.** `registry/harvest/x-p-w1.json` is a live Track D seat's artefact; the two `docs/tranches/X/keyframes/**` trees are Track B's evidence dirs, inside their own waves' bounds. X-W0's HG-1 was **absolute 0 at its close seat's clock, double-run**; these carriers post-date it. **The repair seat neither tracks nor deletes them** (a write outside §File Bounds), and the fresh check reads HG-1 against X-W0's own bounds with the three carriers named and owned.
- **F-R3 — HG-10 is GREEN before this round writes a byte.** X-W0.c's supersession column (C6) already prints the witnessed r2 round beside each of the three canonical rows, and X-W0.e already tracked the r2 artefacts; §0k.1 rules that column **is** the cure and that the falsifier is read against it. The round therefore **records** HG-10 GREEN and **writes no ledger byte for it** — re-badging `REPORT-AUTHORED` would falsify the one thing the status column records.
- **F-R4 — the artefacts bank stays absent, as ruled.** §0k.1: *"no new directory"*. The pointer is a dated addendum at `waves/W0.md` §Verification Artefacts naming the tracked homes the close record's §4 maps, row for row.
- **F-R5 — two sibling-seat working paths are live in the index's neighbourhood and must never be staged**: `registry/DEFECT-LEDGER.md` (modified by a concurrent harvest seat) and `registry/harvest/x-p-w1.json` (untracked, Track D). Four tracks share this git index; the standing law is **pathspec on the commit itself** (§0k.1's contamination row). `scripts/dev/dev.sh` is never touched, never staged.

### Unit plan (resume round) — **2 units · 2 ordered groups · peak concurrency 1**

Serial by construction: the check adjudicates a close that includes the repair, so it cannot precede
it. Both seats are **Opus** — `waves/W0.md` §Agent Units `:142` binds this wave's seats to Opus by
name (*"No unit here is design content; the twice-authored Fable ∥ Opus → fresh-Fable apotheosis
process belongs to X-W10 … and is not performed in this wave"*), and the fresh-check precedent in this
program (F.W0 CHECK 1, X.P.W0 CHECK 1) is an independent Opus seat that authored none of the bytes.

| group | unit | model | writes |
|---|---|---|---|
| 1 | **X-W0.k** — the HG-7 corpus predicate + the §Verification Artefacts pointer | Opus | `workflows/validate-completeness.mjs` · both registry ledgers (generated only) · `waves/W0.md` (dated addendum) · this record |
| 2 | **X-W0.m** — the fresh check, VERIFY-ONLY, adjudicates the close | Opus | this record (§Check 1) · `execution/LEDGER.md` (its own row cells) |

**X-W0.k — sections**: `waves/W0.md` §Hard Gate **HG-7** `:251–259` · **HG-6** `:246–249` · **HG-8**
`:261–264` · §Agent Units X-W0.c `:158–163` · §File Bounds `:84,:85,:92,:93,:75` · §Disjointness `:119`
· §Format And Lint Cadence `:338–346` · §Commit Plan rows 5 + 11 idiom `:375,:381` · §Verification
Artefacts `:350–363`; **COHESION §0k.1** `:696–715`; the close record **§4** `:1345–1370` (the mapping
the pointer cites) and **X-W0.c C1–C8** `:742–818` (the measured ground).

**X-W0.m — sections**: the spec **whole** (572 L incl. §ADDENDUM + §CLOSE) · this record **whole** ·
`X/refinement/X-W0-FOLD.md` G-A..G-H · **COHESION §0i.2 · §0j · §0k.1–§0k.3** · RUNBOOK §1.1 · §3.4 ·
§5; LEDGER row + event log.

#### X-W0.k — the HG-7 corpus predicate and the §Verification Artefacts pointer (COHESION §0k.1)

- **Gates it must turn**: **HG-7 GREEN** (baseline green **and** S1..S6 each rejected) · **HG-6 stay-GREEN** (same-line unqualified `264/264` → 0 at all five live sites) · **HG-8 stay-GREEN** (ephemeral `git worktree` of HEAD: `node hydrate-reports.mjs && node validate-completeness.mjs` → `git diff --exit-code` **0**, double-run, worktree removed, nothing committed from it) · **HG-10 recorded GREEN** under §0k.1 (no ledger byte written for it).
- **Writable set** (nothing else): `docs/tranches/V/megatranche/workflows/validate-completeness.mjs` · `docs/tranches/V/megatranche/registry/COMPLETENESS-LEDGER.md` · `docs/tranches/V/megatranche/registry/HYDRATION-LEDGER.md` (**generated only — never a hand edit**, §Disjointness `:119`) · `docs/tranches/X/waves/W0.md` (dated addendum, append-beside) · `docs/tranches/X/execution/A/X-W0.md` (its own receipt).
- **Locks / families**: the predicate **and** the ledgers it regenerates are **ONE commit** (§Commit Plan row 5's generated-output idiom, body required); the `waves/W0.md` addendum is a **second** commit (one commit per meaning). **Pathspec on the commit itself** — `git add <paths> && git commit --no-verify --quiet -m … -- <the same paths>`; **never** stage `registry/DEFECT-LEDGER.md`, `registry/harvest/x-p-w1.json`, `docs/tranches/X/keyframes/**` or `scripts/dev/dev.sh`.
- **Acts, in order**: (1) re-measure HG-7 double-run and state the number at your own clock (**89 here, not the inherited 87**); (2) write the corpus predicate into the non-band law **in §0k.1's own words** — it ranges over run records timestamped **≤ 2026-08-03** (the megatranche dispatch boundary) **plus any record a canonical row cites**; live tranche-X session journals are outside the corpus **by construction**, not by exception; the record's own `timestamp` field is the datum; (3) **print** the predicate, the in-corpus denominator and the **out-of-corpus count as a dated, owed figure** (`harvest at X-W11`), so the scope suppresses nothing; (4) regenerate both ledgers through their generators and verify the three integers still read **213 · 5 · 46 = 264 = 218 + 46**; (5) run `--self-test` — baseline GREEN **and** S1..S6 all rejected — double-run; (6) re-run HG-8's ephemeral-worktree replay and its falsifier; (7) append the dated `waves/W0.md` **§ADDENDUM 2026-09-17 (§0k.1)**: the §Verification Artefacts pointer (**no new directory** — the ten rows of the close record's §4 mapping, quoted by name) and the **HG-10 GREEN** reading (supersession column IS the cure; canonical provenance words are not re-badged); (8) write this record's receipt with BEFORE→AFTER per gate.
- **Forbidden, named**: no borrowed/invented run id, no `BANDS` re-point, no allowlist, no cutoff written into an S1..S6 fixture, no weakening of any fixture, no `covered:true` short-circuit, no harvest file written, no `DEFECT-LEDGER.md` byte, no canonical `challenge-*.md` byte, no `registry/adjudicated/**` byte, no 7e28 byte, zero product source. If the predicate cannot be written without one of these, **STOP and escalate** — a third diagnose→edit→re-measure iteration on HG-7 is itself a Triumvirate trigger (§Triumvirate Dispatch `:65`).

#### X-W0.m — the fresh check (VERIFY-ONLY) that adjudicates the close (COHESION §0k.3)

- **Independence**: an Opus seat that **authored none of X-W0's bytes**. It **cures nothing, re-opens nothing, and extends relief to no gate by name** — it re-runs and adjudicates.
- **Acts, in order**: (1) read `waves/W0.md` **whole** and this record **whole**; (2) re-open **every** wave commit with `git show --name-status` (the eleven of round 1 + X-W0.k's) and prove the union bounds again: non-`docs/` **0** · `registry/adjudicated/` **0** · 7e28 copies **0** · canonical `challenge-*.md` **0** · `scripts/dev/dev.sh` **0**; (3) **re-run all 18 hard gates and all 8 fold gates (G-A..G-H) at its own clock**, never inheriting a reading, each against the gate's own GREEN definition, doubling every published count; (4) read **HG-1** against X-W0's bounds with the three cross-track carriers **named and owned** (F-R2) — it neither tracks nor deletes them; (5) read **HG-7** against §0k.1's predicate and **HG-10** against §0k.1's supersession clause; (6) confirm **HG-18 stays FAIL at the elected target 8.0.0** (§0i.2) so X-W4.g stays CLOSED and the §1.M bank shut; (7) E13 sweep at close — **no close with UNREAD mail**; (8) verify the **fifteen escalations**' dispositions against §0k.1/§0k.2/§0k.3 and name any that remain owed; (9) write **§Check 1** in this record and set the LEDGER row by minimal in-place edit to the verdict it measures, appending an event-log line.
- **Verdict vocabulary**: `CLOSED` only if every gate reproduces GREEN at its own clock, or `CLOSED (honest-RED: …)` naming each RED with the ruling that relieves it — the F.W0 CHECK 1 idiom. **VERIFIED stays ✗** — X-W11's alone (R-A).
- **Writable set**: `docs/tranches/X/execution/A/X-W0.md` · `docs/tranches/X/execution/LEDGER.md` (its own row cells + an appended event line). **Nothing else** — a check that edits a gate's subject has stopped being a check.

### Unit receipts (resume round)

_(empty at open — each unit appends its own block below, newest last.)_

#### X-W0.k — the HG-7 corpus predicate and the §Verification Artefacts pointer (COHESION §0k.1) — **DONE**

**Seat**: Opus (`claude-opus-5[1m]`) · resume round group 1 · 2026-09-17
**Sections executed**: `waves/W0.md` §Hard Gate **HG-7** `:251–259` · **HG-6** `:246–249` · **HG-8**
`:261–264` · §Agent Units **X-W0.c** `:158–163` · §File Bounds `:75,:84,:85,:92,:93` · §Disjointness
`:119` · §Format And Lint Cadence `:336–346` · §Commit Plan rows **5** `:375` + **11** idiom `:381` ·
§Verification Artefacts `:350–363`; **COHESION §0k.1** `:696–715`; this record **§4** `:1345–1370` and
**X-W0.c C1–C8** `:742–818`; §RESUME plan `:1503–1630`.
**Rulings consumed**: §0k.1's **HG-7 (E-1)** row (SCOPE now, HARVEST at X-W11, both) · its **HG-10
(E-2)** row (the supersession column IS the cure) · its **E-3** row (`X/artefacts/W0/` — no new
directory) · its contamination row (**pathspec on the commit itself**).
**HEAD at open**: `6d4221c5` ⟨`git log --oneline -1`⟩ · branch `tranche-u`.
**Commits**: **`de85e26c`** (validator + regenerated ledgers, ONE commit, 2 paths) · **`04ea2ac6`**
(`waves/W0.md` §ADDENDUM, 1 path) · this receipt.
**Anchors verified at true bytes before editing** — none had drifted: `waves/W0.md` §Verification
Artefacts at **`:350`**, *"Banked under …"* at **`:352`**, the ten artefact rows **`:354–363`**; this
record's §4 heading at **`:1345`**. ⟨`sed -n '350,352p;362,363p' waves/W0.md`⟩.

##### Acts, in order

**K1 · HG-7 re-measured FIRST at this seat's own clock, double-run, before one byte moved.** The
inherited figure is **not** carried forward (§RESUME **F-R1**). ⟨`node …/validate-completeness.mjs
--self-test`⟩ → verbatim, both runs byte-identical ⟨`diff run1 run2`⟩ → empty:

```
baseline (unmutated tree): exit 1 · 89 uncovered · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED
three integers (canonical roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46
BASELINE IS NOT GREEN — self-test is meaningless until the real tree passes. Fix the tree first.
```

**89**, not 87 — seat 0's F-R1 reproduces exactly. ⟨`git status --porcelain`⟩ byte-identical across
the two runs' ledger sha256s ⟨`shasum -a 256` before/after⟩ — **`--self-test` writes nothing**, proven
rather than assumed.

**K2 · The corpus measured before the predicate was written**, so the law would range over a datum
that exists rather than one invented for it. ⟨`node -e` over `SESSION_WF`, read-only⟩: **128** run
records, **128** carrying a `timestamp` field, **0** unreadable, **0** missing it. **33** timestamped
on or before **2026-08-03**, **95** after. **The boundary is unambiguous at the bytes**: the last
in-corpus record is `wf_b1903beb-e2b`@`2026-08-03T19:10:14Z` and the first out is
`wf_a376b9ac-d45`@`2026-08-04T16:19:27Z` — a **21-hour gap**, so no UTC-vs-local reading can move a
single row. Restricted to the **non-band** set the law governs: **122** records = **27 in corpus** +
**95 out**.

**K3 · The predicate, written into the non-band law in §0k.1's own words.** `validate-completeness.mjs`
gains `CORPUS_BOUNDARY = '2026-08-03'` and `inCorpus()`, stated in the ruling's language — *"run
records at or before the megatranche dispatch boundary (timestamped ≤ 2026-08-03) plus any record a
canonical row cites; live tranche-X session journals are outside its corpus by construction"*. Three
properties, each load-bearing, each written as a property rather than a comment:

| property | how it is built | why it is not a suppression |
|---|---|---|
| **FAIL-CLOSED** | a record with no readable `timestamp` returns `{inside:true}` | the exclusion must be *positively established* from the record's own datum; absence never buys it |
| **THE CITATION CLAUSE IS LIVE** | `citedByCanonicalRow` is built in `gather()` from the harvest payloads' `reportPath`s against the canonical-roster axis set — **the same construction the denominator uses**, so "canonical row" cannot mean two things in one script | a record of **any** date that actually produces megatranche coverage is in corpus; it admits **0** extra records today and is the seam that keeps that true |
| **IT SUPPRESSES NOTHING** | out-of-corpus records are read, put through the *identical* `nonBandVerdict`, and printed in their own ledger section | the finding survives with a date, a breakdown and a named owner |

**The record's own `timestamp` is the datum** (`startTime` its only in-record fallback). Neither is
invented; `SESSION_WF` itself is untouched and unwritten.

**K4 · WRITE-THEN-MEASURE caught my own first carve suppressing the record, and it was fixed at the
generator.** The first version printed the out-of-corpus **count** and a per-workflow attribution but
**stopped naming the 95 records by run id** — ⟨`grep -c 'wf_ca218d91-9c7' COMPLETENESS-LEDGER.md`⟩
fell **1 → 0**, and a ledger that had named every non-band run since it was written would have
silently dropped 95 identities. **A scope that stops NAMING what it stops gating has become a
suppression.** The section now carries a full per-record table — run id, dispatching workflow, why it
is out of corpus, record status, agents, harvested, and the verdict it **would** have taken.
Re-measured after the fix: **122 non-band run ids in the session directory · 0 absent from the
regenerated ledger** ⟨`node -e` set-difference over the ledger text⟩.

**K5 · The printed complement, dated and owed — the ledger's own face.** Regenerated section
`## Out-of-corpus run records — DATED AND OWED (COHESION §0k.1, 2026-09-17), never suppressed`:

| owed shortfall | out-of-corpus records |
|---|---:|
| completed but NOT HARVESTED | **77** |
| harvest short of seats | **12** |
| stale harvest disposition | **0** |
| record not terminal | **0** |
| **total** | **89** of **95** |

attributed by dispatching program (27 distinct workflow families; largest: `xf-repair-r*` **14** ·
`adjudication-batch*` **9** · `fourier-saturation-batch*` **8** · `xp-fold-repair-r*` **8**), owed at
**X-W11's close via `workflows/harvest-journals.mjs`**, which rewrites `registry/DEFECT-LEDGER.md`
inside X-W11's own bounds. **The GREEN verdict line itself says so**: *"it does not discharge the 89
owed out-of-corpus shortfalls above"*. The scope **gates less and hides nothing**.

**K6 · Both ledgers regenerated through their generators only** (§Disjointness `:119` — a hand edit is
forbidden). ⟨`node …/hydrate-reports.mjs`⟩ → `roster predicate: 283 rows = 264 canonical roster + 19
non-roster` · `three integers (roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED
46 → 264 = 218 CHALLENGED + 46 REPORT-AUTHORED`. ⟨`node …/validate-completeness.mjs`⟩ → `denominator:
264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED`. **213 · 5 · 46 = 264 = 218 + 46**, moved
by nothing. **`HYDRATION-LEDGER.md` carries no diff** — the hydration generator reproduced its
committed bytes exactly, which is itself the reconciliation proof that this cure did not touch the
denominator. It is named in the commit's pathspec regardless, because the family must not split.

**K7 · HG-7 AFTER — GREEN, double-run.** ⟨`node …/validate-completeness.mjs --self-test`⟩, exit **0**
both runs, ⟨`diff run1 run2`⟩ empty:

```
baseline (unmutated tree): exit 0 · 0 uncovered · 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED
three integers (canonical roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46
corpus predicate (COHESION §0k.1, 2026-09-17): run records timestamped ≤ 2026-08-03, plus any record a canonical roster row cites
non-band records: 27 IN CORPUS (gating) · 95 out of corpus, of which 89 OWED and dated — harvest at X-W11's close, via workflows/harvest-journals.mjs. Scoped, not suppressed.
…
SELF-TEST PASS — 6/6 injected violations correctly rejected.
The gate can fail for each of its intended reasons, and does not fail on the real tree.
```

**All six rejected, each for its own reason** (⟨`grep -c 'PASS — correctly rejected'`⟩ → **6**): S1
absent axis → `core / App — D` · S2 hash drift → `core / App — L` · S3 unharvested run →
`(non-band) / wf_selftest-unharvested` · S4 short harvest → `(non-band) / wf_selftest-short` · S5
ex-exempt-band regression → `frontend-omissions / shell-dock-genericactionbar — C` · S6 stale harvest
disposition → `(non-band) / wf_a6f71311-4e5`. **Not one fixture was weakened, re-pointed or given a
cutoff.**

**K8 · The predicate carries its own falsifier, and it was FIRED, not paraphrased.** S3/S4 inject
synthetic records that carry **no timestamp** — so they are exactly the fail-closed case. Inside the
ephemeral worktree, `inCorpus` was flipped **fail-open** (a missing timestamp *excluded* instead of
included) and the harness was re-run:

```
[S3] … FAIL — falsely accepted
[S4] … FAIL — falsely accepted
SELF-TEST FAIL — 4/6 injected violations correctly rejected.
```

**The fail-closed reading is therefore load-bearing**: a future weakening of this scope cannot pass
HG-7 silently. Restored → ⟨`git diff --exit-code`⟩ **0**.

**K9 · HG-8 — the ephemeral-worktree replay, run at two HEADs, twice each, with the `:264` falsifier
executed.** §Worktree Plan's one exception: created, read, removed; **nothing committed from any of
them**.

| # | worktree HEAD | ⟨`node hydrate-reports.mjs && node validate-completeness.mjs`⟩ | ⟨`git diff --exit-code`⟩ | ⟨`status --porcelain`⟩ |
|---|---|---|---|---|
| 1 | `de85e26c` (the cure) | hydrate exit 0 · validate **exit 0** (was exit 1 at round 1) | **0**, and **0** on the double-run | **0 lines**, both |
| 2 | `04ea2ac6` (settled HEAD) | same | **0**, and **0** on the double-run | **0 lines**, both |

*Falsifier `:264` executed*: `[0-9a-f]{64}` → `[0-9a-f]{16}` inside the worktree → **88 incomplete
component rows · 264 unbanked canonical axes · 264/264 exact files present · 0/264 hash-banked = 0
CHALLENGED + 0 REPORT-AUTHORED**, **90** `NO-LEDGER` ledger lines. (Round 1 measured 175 rows at the
same falsifier; the difference is exactly the 87 non-band rows now out of corpus — **88 + 87 = 175**,
so the delta is explained by arithmetic, not by a weaker falsifier.) Restored → ⟨`git diff
--exit-code`⟩ **0**; worktree removed; ⟨`git worktree list`⟩ back to its **four** standing entries.
The main repository was untouched throughout.

**K10 · HG-10 recorded GREEN under §0k.1 — and NO ledger byte was written for it.** Measured from the
generated `HYDRATION-LEDGER.md` at HEAD: **6** canonical rows carry `r1 · re-run at r2 (witnessed)`,
among them exactly the three slugs X-W0.e routed here, each beside a tracked r2 row reading
`EXISTS-ORIGINAL` with harvest `wf_1a4c8a8c-557.json`; **34** r2 artefacts tracked across the three
slugs ⟨`git ls-files …/*r2*`⟩. The canonical rows keep `REPORT-AUTHORED` **deliberately** — it is true
of the canonical file, and re-badging it would falsify the one thing the provenance column records.
§RESUME **F-R3** reproduces; the round **records** the gate and cures nothing that was not broken.

**K11 · The `waves/W0.md` §ADDENDUM, appended-beside.** §Verification Artefacts' bank
`docs/tranches/X/artefacts/W0/` re-measured ⟨`ls docs/tranches/X/artefacts`⟩ → **No such file or
directory**, and ⟨`sed -n '73,101p' waves/W0.md | grep -n artefacts`⟩ finds it in **no** §File Bounds
row (the single hit is the Do-NOT-touch paragraph's *"r2 artefacts"*). **§0k.1 rules no new directory
and none was created.** The addendum reads the ten named artefacts as **pointers** into the tracked
homes this record's §4 maps, quoted row for row, and adds this round's own evidence to three of them.
**Append-only, proven**: ⟨`diff <(git show HEAD:waves/W0.md) <(sed -n '1,572p' waves/W0.md)`⟩ →
**IDENTICAL** — zero bytes above `:572` moved; 572 → 683 lines.

**K12 · Landing, both commits with the pathspec ON THE COMMIT ITSELF** (§0k.1's contamination row).
⟨`git diff --cached --name-only`⟩ → **0** before each `add`, so nothing foreign was in the index.

| # | commit | subject | paths |
|---|---|---|---:|
| 1 | **`de85e26c`** | `chore(megatranche/completeness): the non-band law gains its corpus predicate — HG-7 GREEN` | **2** |
| 2 | **`04ea2ac6`** | `docs(x-w0/addendum): §Verification Artefacts points at its tracked homes; HG-10 GREEN, HG-7 cured` | **1** |

**Union bounds over both commits** ⟨`git diff-tree --no-commit-id --name-only -r <h>` per commit⟩ —
**3** paths, every one inside the writable set: non-`docs/` **0** · `registry/adjudicated/` **0** ·
`codex-worktree-7e28` **0** · `challenge-*.md` **0** · `DEFECT-LEDGER` **0** · `registry/harvest` **0**
· `X/keyframes` **0** · `scripts/dev/dev.sh` **0** (never touched, never staged). A sibling Track D
commit landed **between** my two — `296db58b` — and carried **none** of my paths; the guard held.
⟨`git diff --check`⟩ clean. **§Format And Lint Cadence `:346`**: `npm run lint` / `vue-tsc`
intentionally skipped — this unit wrote **zero** `.ts`/`.vue`/`.css` bytes; replacement evidence is
the two script gates plus `git diff --check`.

##### Gate readings — BEFORE → AFTER

| gate | BEFORE (open, HEAD `6d4221c5`) | AFTER (settled bytes, HEAD `04ea2ac6`) | verdict |
|---|---|---|---|
| **HG-7** — the validator's self-test is meaningful | `exit 1 · **89** uncovered · 264/264 = 218 + 46`; *"BASELINE IS NOT GREEN"*; S1..S6 unreachable by the harness's own guard | `exit 0 · **0** uncovered`; **SELF-TEST PASS — 6/6 injected violations correctly rejected**; double-run byte-identical; the predicate's own fail-open falsifier fired (**4/6**) | **RED → GREEN** |
| **HG-6** — the challenged denominator gates, not the saturation count | same-line unqualified `264/264` over the five live sites → **0** | **0**, double-run **0**; three integers **213 · 5 · 46 = 264 = 218 + 46**, unmoved; `grep -c 218` in the ledger **7 → 6** — and the delta is fully explained: **two** of the seven were the coincidental substring in run id `wf_ca218d91-9c7`, one of which is now an out-of-corpus row; **all four true HG-6 sites (`:20`, `:22`, `:38`, `:40`) stand, plus the GREEN verdict line** | **stay-GREEN** |
| **HG-8** — the GREEN is regenerable from a clean checkout | round-1 reading `exit 0`, inherited | ephemeral worktree ×2 HEADs × double-run: ⟨`git diff --exit-code`⟩ **0** every time, `status --porcelain` **0 lines**; `:264` falsifier fired (**0/264** hash-banked, 90 `NO-LEDGER`) and the tree restored to diff-0; worktree removed | **stay-GREEN** |
| **HG-10** — the three axes are witnessed, not report-authored | SPLIT (E-2) at round 1 | **6** supersession cells · **34** tracked r2 artefacts · the three canonical rows named beside their witnessed r2 rows and harvest; **no ledger byte written for it** | **GREEN** (recorded under §0k.1) |
| **HG-16** (collateral re-read) — COMPLETABLE in every X wave file | 12 files · 0 missing | ⟨`grep -aL COMPLETABLE docs/tranches/X/waves/W*.md`⟩ → **0** over **12** files; `W0.md` still carries it **4×** after the append | **stay-GREEN** |

##### E13 mail — swept at close, **0 unrowed · 0 UNREAD in scope**

Four paths swept read-only at this seat's clock; classification taken from each row's **status cell**,
never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**). (1) `docs/tranches/V/coordination/` —
newest non-self `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09, **ours (O-21)**, rowed.
(2) `../glass-ui/docs/tranches/BK/coordination/` — newest `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29,
**I-30**, rowed; BK re-confirmed as the newest glass tranche dir ⟨`ls -ltd ../glass-ui/docs/tranches/*/`⟩.
(3) `../keyframes.js/docs/tranches/V/coordination/` — newest `VALUEJS-INBOUND-2026-09-17-…`@14:58,
**ours outbound**. (4) `../sci-report/atlas/docs/tranches/{P,Q}/coordination/` — newest
`ATLAS-TO-VALUE-2026-08-03-RULINGS.md`, **I-27**, rowed. **Status-cell scan**: exactly **3** rows
contain the string `UNREAD` and **none** is classified so — O-20's status cell reads **SENT**
(the word appears in its sweep note about glass's own 08-09 letters), I-30's reads **ROWED
2026-08-30**, I-31's reads **FOLDED 2026-09-17**. `glass-ui` stayed **READ-ONLY**; **zero** bytes
written to any sibling tree.

##### Residuals and escalations

**Escalations: none.** The specified cure was executable at the bytes and was executed as specified;
nothing was substituted, and no third diagnose→edit→re-measure iteration occurred (§Triumvirate
Dispatch `:65` never armed).

| # | residual | owner |
|---|---|---|
| 1 | **The 89 out-of-corpus shortfalls (77 unharvested + 12 short) are OWED, not discharged** — printed by run id, by shortfall kind and by dispatching workflow on the ledger's own face | **X-W11's close**, via `workflows/harvest-journals.mjs` (§0k.1's own routing) |
| 2 | The ledger's out-of-corpus section is a function of a **live session directory outside the repository**, so its figures move when four sibling tracks dispatch. This is a property of the datum, not of the cure — and is precisely the reason the law no longer *gates* on it | declared; X-W11's harvest retires it |
| 3 | **HG-1 reads 3+ at this clock** and none of the carriers is X-W0's: `registry/harvest/x-p-w1.json` (Track D) and the `docs/tranches/X/keyframes/**` evidence trees (Track B); two more megatranche `audit/visual/safari-real/**` files appeared mid-round from Track B | §RESUME **F-R2** — this seat neither tracked nor deleted them; **X-W0.m** reads HG-1 against X-W0's own bounds |
| 4 | `scripts/dev/dev.sh` remains dirty **by ruling** (DR-24 / CC-021 / §0j.A) — expected output in any `git status` receipt | owner-held, outside every X denominator |

##### What this unit did NOT do

Wrote **three** paths and nothing else: `workflows/validate-completeness.mjs`,
`registry/COMPLETENESS-LEDGER.md` (generator output), `waves/W0.md` (append-beside) — plus this
receipt. **No** `HYDRATION-LEDGER.md` byte (the generator reproduced it exactly) · **no** hand edit of
either ledger · **no** `DEFECT-LEDGER.md` byte · **no** `registry/harvest/**` byte · **no**
`registry/adjudicated/**` byte · **no** canonical `challenge-*.md` byte · **no** 7e28 byte · **no**
`docs/tranches/X/artefacts/W0/` directory manufactured · **no** sibling-tree byte · **zero** product
source. **No run id borrowed or invented, no `BANDS` re-point, no allowlist, no cutoff in a fixture,
no fixture weakened, no `covered:true` short-circuit.** No verb stamped, no escalation answered, no
close adjudicated — that is **X-W0.m**'s. No `git stash`, no `reset`, no force-push, no history
rewritten; `scripts/dev/dev.sh` never touched and never staged.

---

## §CHECK 1 2026-09-17 — X-W0 ADJUDICATED · fresh, independent, VERIFY-ONLY (COHESION §0k.3)

**SERVED MODEL: claude-opus-5[1m]** · **Seat**: X-W0.m — an Opus seat that **authored none of X-W0's
bytes**, cured nothing, and extends relief to no gate by name.
**HEAD at open**: `d5d1931d` ⟨`git log --oneline -1`⟩ · branch `tranche-u` · **HEAD at close**: stated
at §7.
**Authority**: COHESION **§0k.3** — *"X-W0's repair seat lands §0k.1's HG-7 cure and the §Verification
Artefacts pointer; **its fresh check then adjudicates the close**."* Plan: §RESUME `:1621–1626`.
**Sections read whole before a byte was measured**: `waves/W0.md` **683 L** (§State … §ADDENDUM
2026-08-30 … §CLOSE … §ADDENDUM 2026-09-17) · this record **1,860 L** (§Open … §Close … §RESUME …
X-W0.k) · `X/refinement/X-W0-FOLD.md` **G-A..G-H** `:477–554` + **§9** `:1565–1867` · COHESION
**§0i.2** · **§0j** · **§0k.1–§0k.3** and every later §0k addendum **to the file end** (864 L) ·
RUNBOOK **§1.1** · **§3.4** · **§5** · `execution/LEDGER.md` Track A row + the full event log.

> **ANCHOR NOTE (METHOD).** The work order cites `waves/W0.md` as **572 L**. At the true bytes it is
> **683 L** — X-W0.k's `§ADDENDUM 2026-09-17` appended `:573–683` after the order was written. **INTENT
> was taken at the true bytes**: the whole file was read, the addendum included, and the addendum is
> adjudicated below (§2, HG-7/HG-10/§Verification Artefacts). Likewise §RESUME `:1503–1630` resolves at
> `:1503–1631`. No spec byte was moved (E-3).

**Verdict, stated first**: **CLOSED (honest-RED: E13's rowing limb — ESC-M2)**. All **18** hard gates
and all **8** fold gates reproduce **GREEN at this seat's own clock**, none inherited, every published
count double-run. Two escalations are returned that did not exist at the close (**ESC-M1** · **ESC-M2**,
§5), three published counts do not reproduce and are corrected by measurement (§6), and **VERIFIED
stays ✗ — X-W11's alone (R-A)**.

---

### 1 · The commit roster re-opened, and the union bounds re-proven

**30 commits** re-opened with ⟨`git show --name-status`⟩ — the fifteen artefact/close/repair hashes
plus every commit that touched this record. **All thirty resolve**; all fifteen named hashes carry the
subjects the §CLOSE table and §RESUME's precondition table name.

| # | commit | unit | paths |
|---|---|---|---:|
| 1 | `befbc05a` | X-W0.a track-or-archive | 1826 |
| 2 | `5937b6de` | X-W0.b prompt-recap | 1 |
| 3 | `9f4b22a7` | X-W0.d 7e28 census | 1 |
| 4 | `af03de5c` | X-W0.e axes-r2 / motion quarantine | 1 |
| 5 | `58be3626` ⊕ `549353fd` | X-W0.c completeness | **7** ⊕ 2 |
| 6 | `b5673ae0` | X-W0.f tombstones | 1 |
| 7 | `c9aa1fdf` | X-W0.h graph-v3 + denominator | 7 |
| 8 | `2012dbfa` ⊕ `379d011c` | X-W0.i routing law | 8 ⊕ 1 |
| 9 | `ad240462` | X-W0.j glass8 census | 1 |
| 10 | `f7197d71` | X-W0.g owner sitting | 4 |
| 11 | `1246f859` | round-1 close | **3** |
| 12 | `de85e26c` | X-W0.k validator + ledger (HG-7 cure) | 2 |
| 13 | `04ea2ac6` | X-W0.k `waves/W0.md` §ADDENDUM | 1 |

**Union bounds, re-derived independently and double-run** (⟨`git show --name-status`⟩ and
⟨`git diff-tree --name-only -r`⟩ over the same 30 commits, the two listings ⟨`diff`⟩ **IDENTICAL**):

| probe | result |
|---|---:|
| distinct paths in the union | **1,864** |
| ⟨`grep -cv '^docs/'`⟩ — non-`docs/` | **0** |
| ⟨`grep -c 'registry/adjudicated/'`⟩ — fold **G-H** | **0** |
| ⟨`grep 'codex-worktree-7e28' \| grep -vc 'CENSUS.md$'`⟩ — the 90 copies immutable | **0** |
| ⟨`grep -cE 'audit/components/[^/]+/challenge-[A-Z]-[a-z]+\.md$'`⟩ — C-02, the 46 canonical axes | **0** |
| ⟨`grep -c 'dev\.sh'`⟩ | **0** |
| ⟨`git diff --check`⟩ | clean, exit **0** |

Five bounds, five zeros, over a **larger** denominator than the close measured — which is strictly
stronger, not weaker. The 7e28 tree appears exactly **once** (`CENSUS.md`, X-W0.d's append) and **zero**
`challenge-*-r2.md` files ride the union (they were tracked by event, before the wave — X-W0.e E1).

---

### 2 · The eighteen hard gates, re-run at this seat's own clock

Every reading below is **this seat's own probe**, never a unit's receipt read back. Where §0k.1 rules
how a gate is read, the ruling is cited and the gate is read against it.

| gate | probe ⟨cmd⟩ at this clock | reading | verdict |
|---|---|---|---|
| **HG-1** zero untracked bytes under `docs/` | ⟨`git ls-files --others --exclude-standard docs/ \| wc -l`⟩ | live absolute **8**, double-run **8**, and **1** eleven minutes later; **set-difference against X-W0's frozen census = 0**, double-run, at both clocks; all **1,825** census paths ⟨`xargs git ls-files --error-unmatch`⟩ still tracked | **GREEN** as **CR-4** reads it (§3) |
| **HG-2** one disposition per censused tree | ⟨`grep -c '^\| \*\*D-'`⟩ → **3** vs the frozen census tree-set ⟨`cut -d/ -f1-4 \| sort -u`⟩ → **3** (`T/audit` · `V/apotheosis` · `W/audit`) | **set-equal**, each row with a reason | **GREEN** |
| **HG-3** the 181-event corpus tracked and anchored | corpus ⟨`git ls-files …/raw-prompts/ \| wc -l`⟩ → **4**; rows ⟨`grep -cE '^\\| [FRB]#[0-9]{3} \\|'`⟩ → **181** (F **83** · R **28** · B **70**), double-run; **this seat's own verifier**: **181/181** anchors resolve to a real non-blank `<archive>:<line>`, double-run; **phrase grounding 181/181** — 180 mechanically, the one residual (F#040) read at the bytes and proved to be *my* normaliser (the recap substitutes `'` for the source's backticks inside a table cell) | **GREEN** |
| **HG-4** the clean-pass contradiction reconciled | §2.2 dated **2026-09-17**: canon **P (0/2)**, loser **J SUPERSEDED**; both readings still live and annotated at their coordinates (`vnext/PROMPT-RECAP.md:88`; `"status":"clean"`) | and §0k.1 rules *"**GREEN as landed**"* for the sealed record | **GREEN** |
| **HG-5** the twelve dropped owner asks restored | **13** rows (12 required, 13 restored); **17** anchors ⟨`grep -oE '\`[FRB]:[0-9]+\`'`⟩, **17/17 resolve** at the archive bytes; four spot-read for meaning — `F:373` the internal-Browser edict · `B:85` **DIRIGIBLITY** (the owner's spelling, preserved) · `R:1141` the atom-framework ask · `F:32` the tail-deferral ask | anchors that carry meaning, not position | **GREEN** |
| **HG-6** the challenged denominator gates | ⟨`cat <(…) <(…) <(…) \| grep -vc 'CHALLENGED'`⟩ → **0**, double-run **0**, over all **6** `264/264` occurrences at the five live gate-text sites (`COMPLETENESS-LEDGER.md:20,22,40,347` · `CONVERGENCE…:68` · `IN-FLIGHT…:49`); ⟨`grep -c 218`⟩ in the ledger → **6** | **GREEN** |
| **HG-7** the validator's self-test is meaningful | ⟨`node …/validate-completeness.mjs --self-test`⟩ → **exit 0** · `0 uncovered` · **SELF-TEST PASS — 6/6 injected violations correctly rejected**; **double-run byte-identical** ⟨`diff run1 run2`⟩ empty; ⟨`git status --porcelain`⟩ byte-identical before/after — **read-only proven** | **GREEN**, read against **§0k.1** (§4) |
| **HG-8** the GREEN is regenerable from a clean checkout | **this seat's own ephemeral worktree of HEAD**: ⟨`node hydrate-reports.mjs && node validate-completeness.mjs`⟩ → ⟨`git diff --exit-code`⟩ **0** and **0** on the double-run, ⟨`status --porcelain`⟩ **0 lines** both; the `:264` falsifier **fired by my hand** (hash width 64 → 16 ⇒ `0/264 hash-banked`, **88** incomplete rows, **90** `NO-LEDGER` lines), tree restored to diff-0, worktree removed, ⟨`git worktree list`⟩ back to its **four** standing entries | **GREEN** |
| **HG-9** the 7e28 corpus closed and byte-exact | tree **91**/tracked **91**/untracked **0**; **this seat re-parsed §2 and re-hashed independently** ⟨`tail -c <bytes> <copy> \| shasum -a 256`⟩ → **90 MATCH · 0 DRIFT · 0 MISSING**, double-run; accounting **90 ADOPT (incl. 1 AS-VARIANT) + 36 LEAVE-IN-PLACE = 126**; collision ⟨`git ls-files 'docs/**/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29*'`⟩ → **2** distinct tracked names; `~/.codex/**` **3,967** files, `e01d0065` still ⟨`merge-base --is-ancestor`⟩ of `tranche-u` (exit 0) | **GREEN** |
| **HG-10** the three axes witnessed | r2 tracked **6 · 2 · 26 = 34**; the three r2 rows read **EXISTS-ORIGINAL** with harvest `wf_1a4c8a8c-557`; the three canonical rows carry **`r1 · re-run at r2 (witnessed)`** (**6** such cells ledger-wide) | **GREEN**, read against **§0k.1**'s supersession clause (§4) |
| **HG-11** every motion assertion quarantined or two-guard-cleared | marker literal ⟨`grep -c 'QUARANTINED-PENDING-TWO-GUARD-CHECK'`⟩ → **8**, double-run; **coverage set-difference re-derived by this seat's own construction** (ledger's 46 REPORT-AUTHORED paths vs §7.1–§7.5 explicit ∪ §7.4's subject×axes expansion ∪ §9.5's re-home): **46 ↔ 46**, ledger−record **0**, record−ledger **0**, double-run | **GREEN** |
| **HG-12** nine tombstones, nine pasted probes | ⟨`grep -c '^### TS-'`⟩ → **9** (TS-1..TS-9 ≡ CC-015/016/017/018/022/019/020/021/023); **all nine probes re-run by this seat and all nine reproduce**: CC-015 **5** hits / **3** files · CC-016 `139`,`287` + glass **7.0.0** · CC-017 `63240e67…` vs kf `8ccf9f4d…` · CC-018 `> _(empty — the owner's verdict lands here)_` · CC-022 kf **6.0.0** · CC-019 **69** / **0** · CC-020 **0** · CC-021 ` M scripts/dev/dev.sh` · CC-023 **301 → https://color.babb.dev/** | **GREEN** |
| **HG-13** the owner sitting returns a verdict per row | **7/7** verdict tokens (6 RETIRED + 1 LANDED-AS-RULED = U-F12 POLE B), each dated 2026-09-17 with an artifact; the seven CC disposition cells read at the ledger bytes (`:86,:88,:90,:91,:92,:93,:95`); **falsifier re-tested** — ⟨`grep -ciE '\| *(banked\|pending\|carried) *\|'`⟩ over §2 → **0** | **GREEN** |
| **HG-14** typed graph v3 round-trips and names X-W8's SCCs | ⟨`node …/graph-v3.mjs --verify`⟩ run **twice by this seat** → `ROUND-TRIP GREEN`, exit 0; run1↔run2 **and** committed↔live MATCH on all five digests (`0e75a1c9…` · `4f1fb14f…` · `bf9c9a20…` · `e3a09112…` · `b3a387c9…`); ⟨`diff run1 run2`⟩ empty; ⟨`git status --porcelain`⟩ identical before/after — the repository is untouched by the run; the four SCCs **Admin/provider · Gradient · Markdown · Dock** each carry owner **X.W8.c** | **GREEN** |
| **HG-15** the v3 census is the tracked frontend denominator | **this seat re-hashed all 88 per-file SHA rows against live bytes** → **88 MATCH / 0 MISMATCH / 0 byte-count mismatches**, double-run; six figures **88 SFC · 310 source members · 14 routes + 1 wildcard · 13 `:is` · 2 Teleports · 2 harnesses**, each EXACT; live ⟨`find demo -name '*.vue' \| wc -l`⟩ → **88**, double-run | **GREEN** |
| **HG-16** COMPLETABLE in every X wave file | ⟨`grep -aL 'COMPLETABLE' docs/tranches/X/waves/W*.md`⟩ → **0**, run twice; ⟨`ls … \| wc -l`⟩ → **12** | **GREEN** |
| **HG-17** the V·L5 routing law retired against defined waves | all **six law-bearing sites** carry the token **0** times and each reads `X-W9` and `X-W11` and `V·L1..V·L4` literally (2·2·2 / 2·2·2 / 2·2·2 / 7·4·9 / 11·4·10 / 10·4·7); ⟨`grep -c 'V\.L5' validate-constellation-dag.mjs`⟩ → **0**; the harness **still runs** (exit 1 on the pre-existing `V.form.packet-post-CA01` evidence wall, ⟨`diff run1 run2`⟩ identical, repository untouched). **59 residual carriers re-classified by this seat**: 20 frozen 7e28 · 2 `codex-provenance` proofs · 25 X-tranche records · 5 `registry/harvest/wf_*.json` · 1 `CARRY-CUT-LEDGER.md` · 6 dated 07-29/08-02 restatement + lane records — **every one inside a class `:321` names legal**; the close read 58, the +1 is one more X-tranche record tracked by a sibling seat since | **GREEN** |
| **HG-18** the Glass-8 repin census returns a dated four-condition verdict | **all four re-measured read-only by this seat**: **c1** installed `7.0.0`, pin `^7.0.0` → **FAIL** · **c2** ⟨`…exports…/watercolor/…`⟩ → `./watercolor-dot` **PRESENT** → **FAIL** (the gate's own falsifier firing as designed) · **c3** indicator-slot `.d.ts` decls → **0** → **FAIL** · **c4** target-relative at the elected target **8.0.0**: `MIGRATION.md` §8.0.0 (`:114–624`) names **keyboard 2 · orientation 2 · motion 1** → **PASS**. **Census = 1/4 = FAIL at 8.0.0** (and **0/4** at 9.0.0 — §9.0.0 `:8–49` names **0 · 0 · 0**). **X-W4.g stays CLOSED and the §1.M bank stays shut.** | **GREEN** (the gate). **But the §ADDENDUM's beside-datum has MOVED — ESC-M1, §5** |

**Tally: 18 of 18 hard gates GREEN at this seat's own clock.**

### Fold gates — G-A..G-H, all eight re-run

| gate | this seat's reading | verdict |
|---|---|---|
| **G-A** sharpens HG-18 | ⟨`grep -ro 'X[-.]W4\.g' registry/adjudicated/*.md \| wc -l`⟩ → **62** across **10** records; decomposed by this seat: **54 distinct sites + 8 extras = 62**; the census's §5.3 per-record table re-derived against ⟨`grep -o … \| wc -l`⟩ per record — **2 · 3 · 7 · 9 · 7 · 7 · 10 · 5 · 4 · 8 = 62**, ten ✓, **nothing dropped** | **GREEN** |
| **G-B** sharpens HG-13 | the sitting's docket self-counts **18** rows = **9 owner rows + 8 escalations + 1 OWNER-DECISION** ⟨`awk` over §1⟩; every consumer's far-end byte present (`DR-21` · `CC-104` · `OP-1` · `W9.md:474` · `W10.md:335`) | **GREEN** |
| **G-C** sharpens HG-11 | ⟨`grep -nEi 'requestAnimationFrame\|\brAF\b\|animation-timeline\|scroll-timeline\|setInterval\|setTimeout'` over the 46 canonical paths⟩ → **0 lines**. **Zero** rAF/timeline assertions exist in the corpus, so the false clear is **unspellable** — discharged by construction, not by assertion | **GREEN** |
| **G-D** sharpens HG-6/HG-7 | both generators re-run by this seat: `roster predicate: 283 rows = 264 canonical roster + 19 non-roster` · `three integers (roster): EXISTS-ORIGINAL 213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46` · `denominator: 264/264 hash-banked = 218 CHALLENGED + 46 REPORT-AUTHORED`. **213 + 5 + 46 = 264 = 218 + 46** and **283 = 264 + 19**; the predicate is stated in both scripts; and running both **reproduced the committed ledgers byte-identically** ⟨`git status --porcelain -- registry workflows`⟩ → **0** — a second, main-tree witness for HG-8 | **GREEN** |
| **G-E** sharpens HG-14 | the tool's own closure line, twice: `G-E closure GREEN 11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed`; read out of `sccs.json` by this seat — every SCC carries `ownerState` **OWNED** or **NO-OWNER-WITH-REASON**, **0** unnamed; **CPE L-24** (owner X-W8) and **AuroraPane AP-19** (NO-WAVE-OWNER, adjudicated) both present and disposed | **GREEN** |
| **G-F** the NO-WAVE-OWNER register | **RATIFIED by owner ruling GF-R3** (COHESION §0j.B: *"the fold + canonical layers ARE the register of record … zero file motion"*), transcribed at fold **§9.4**; ⟨`grep -c 'SLATE ENTRY'`⟩ → **15**; BoundsDelta **2** and **9** declared **MOOT** (mooted, never deleted) | **GREEN by ruling** |
| **G-G** sharpens HG-1/HG-2 | `TRACK-OR-ARCHIVE.md` carries (a) **3** tree rows, (b) **5** dangling-receipt rows (DR-1..DR-5, all **RE-SCRIPT → X-W1**, **0** STRIKE-THE-CITE), (c) the post-commit closure rule **CR-1..CR-6**. And CR-2 was **measured live a fourth time during this check** — §3 | **GREEN** |
| **G-H** `registry/adjudicated/**` immutable | the union of all **30** wave commits ∩ that directory → **0**, double-run | **GREEN** |

**Tally: 8 of 8 fold gates GREEN.**

---

### 3 · HG-1 read against X-W0's own bounds — the carriers named and owned, neither tracked nor deleted

§RESUME **F-R2** hands this reading to this seat. It is taken, and the phenomenon was measured **twice
inside this check**:

| clock | live absolute | the carriers | owner |
|---|---:|---|---|
| gate pass | **8** (double-run 8) | `megatranche/audit/visual/safari-real/desktop-CELL-2026-09-17.md` · `X/keyframes/evidence/W9/**` ×4 · `X/keyframes/waves/evidence/KF-W4/**` ×3 | **Track B** — `KF.W9` **OPEN** and `KF.W4` **EXECUTING** in this ledger |
| eleven minutes later | **1** | `X/fourier/contract/operation-register.md` | **Track C** — `F.W5` **OPEN** in this ledger |

**All eight of the first reading's carriers were tracked by their own authoring seats, in their own
commits, between the two measurements — without one act of this seat** ⟨`git ls-files --error-unmatch`
on three of them → **TRACKED**⟩. That is **X-W0.a's CR-2 measured live a fourth time** (after X-W0.a
`:247`, X-W0.e **R-6** and X-W0.i **I11**), and it is why **CR-4** reads HG-1's zero as a
set-difference and never as an absolute:

⟨`comm -12 <(git ls-files --others --exclude-standard docs/ \| sort) <(frozen census)`⟩ → **0**,
double-run, at **both** clocks · and all **1,825** frozen-census paths verify **tracked** ⟨`comm -23`
against `git ls-files docs/`⟩ → **0** missing.

**This seat neither tracked nor deleted one of them** — a write outside §File Bounds to make a number
look better is the larger defect. **HG-1 GREEN.**

---

### 4 · HG-7 and HG-10 read against §0k.1 — and both readings independently re-earned

**HG-7 — the predicate is real, load-bearing, and suppresses nothing.** Not read back from X-W0.k's
receipt; re-established:

1. **The corpus was re-measured by this seat** ⟨`node -e` over `SESSION_WF`, read-only⟩: **128** run
   records readable, **0** unreadable, **128** carrying a `timestamp`; **33** timestamped ≤ 2026-08-03,
   **95** after. Double-run identical. §0k.1's datum exists and is not invented.
2. **The predicate is written in §0k.1's own words**, at `validate-completeness.mjs:124` / `:131` /
   `:520` — *"run records at or before the megatranche dispatch boundary (timestamped ≤ 2026-08-03)
   plus any record a canonical roster row cites; live tranche-X session journals are outside the corpus
   by construction"*.
3. **It is FAIL-CLOSED at the bytes** (`:137–139`: no readable timestamp ⇒ `{inside:true}`), and
   **this seat fired the falsifier itself** inside the ephemeral worktree — flipping it fail-open
   returns `[S3] FAIL — falsely accepted` · `[S4] FAIL — falsely accepted` ·
   **`SELF-TEST FAIL — 4/6`**. The fail-closed reading is therefore load-bearing and a future
   weakening cannot pass this gate silently.
4. **It suppresses nothing — proven by set-difference, not by claim.** Out-of-corpus records are put
   through the *identical* `nonBandVerdict` (`:179`, `:214`) and printed by run id.
   ⟨`node -e` set-difference, this seat's own⟩: **128 run ids in the session directory · 0 absent from
   the regenerated ledger**, double-run. The ledger's own face carries `## Out-of-corpus run records —
   DATED AND OWED (COHESION §0k.1, 2026-09-17), never suppressed` and the GREEN verdict line states
   *"it does not discharge the 89 owed out-of-corpus shortfalls above"*.
5. **Nothing forbidden was done, verified at the diff.** ⟨`git diff --numstat de85e26c^ HEAD -- <the
   validator>`⟩ → **159 / 13**; ⟨`git diff … \| grep -c`⟩ over `SELF_TEST` / `CASES` / `expectReject`
   → **0 · 0 · 0** — **not one S1..S6 fixture byte moved**. The four `covered:true` sites are
   **pre-existing** (⟨`git show de85e26c^:<file> \| grep -nE 'covered *: *true'`⟩ returns the same
   sites at `:234`/`:33`/`:531`); the single `allowlist` occurrence is a **prohibition comment**; **0**
   `try/catch` and **0** `.skip` in the file; **no** `DEFECT-LEDGER.md` or `registry/harvest/**` write.

**HG-7 GREEN**, with §0k.1's harvest limb **dated and owed at X-W11** (§5, owed-list).

**HG-10 — the supersession column IS the cure, and it is at the bytes.** §0k.1: *"A canonical axis
row's provenance word records the truth of the canonical file and is never re-badged … the falsifier's
'fails the same check twice' is read against the supersession column. **HG-10 GREEN.**"* Measured from
the generated `HYDRATION-LEDGER.md` at this clock: the three canonical rows read `REPORT-AUTHORED` **and**
`r1 · re-run at r2 (witnessed)`; their three r2 rows read `EXISTS-ORIGINAL` with harvest
`wf_1a4c8a8c-557`; **6** canonical rows carry the supersession cell; **34** r2 artefacts tracked across
the three slugs. **No ledger byte was written for HG-10 by the repair round, and none was owed.**
**HG-10 GREEN.**

---

### 5 · Escalations — the returned set audited against §0k, and two returned that did not exist at the close

**The returned set, item by item, against §0k.** Every distinct item the close returned carries a §0k
ruling ⟨`grep -c` per id over COHESION `:700–776`⟩ — **17 of 17 RULED, 0 unruled**:

| # | escalation | §0k ruling | state at this clock |
|---|---|---|---|
| 1 | **E-1** HG-7 | §0k.1 — SCOPE now, HARVEST at X-W11, both | **scope limb LANDED** `de85e26c`; **harvest limb OWED at X-W11** |
| 2 | **E-2** HG-10 falsifier clause | §0k.1 — the supersession column IS the cure; GREEN | **recorded GREEN**; nothing owed |
| 3 | **E-3** `X/artefacts/W0/` bounds gap | §0k.1 — no new directory; pointer by dated addendum | **LANDED** `04ea2ac6`; ⟨`ls docs/tranches/X/artefacts`⟩ → still **No such file or directory**, correctly |
| 4 | **X-6** the 255 MB denominator | §0k.1 — **RETAIN (position A)** | the landed TRACK **is** the ruling; nothing owed |
| 5 | **HG-4** "SUPERSEDED in place" | §0k.1 — **GREEN as landed** | nothing owed |
| 6 | **RS-1** DR-14's route | §0k.1 — rides **X-W5**'s existing `vite.config.ts` modify-carve (`W5.md:94`); X-W1 owes nothing | **act OWED at X-W5** |
| 7 | **RS-2** the precepts pin | §0k.1 — fast-forward to `b0f6134` **at X-W11** by dated bounds addendum | **OWED at X-W11** |
| 8 | **DR-21** | §0k.2 — **NO opt-out**; CC-088 is BUILD at X-W9.f | **OWED at X-W9.f** |
| 9 | **CC-104 / OP-1** | §0k.2 — substitute named in writing **and** D-20 amended in the same ruling | **addendum OWED at X-W10's open** |
| 10–17 | **S-1 … S-8** | §0k.3 — each ruled with its far-end byte | **each consuming wave lands its dated addendum at its own open** (X-W5 · X-W6 · X-W7 · X-W8 · X-W9 · X-W10) |

**Zero escalations remain unruled. Nine carry a dated act owed by a named later wave** — stated here so
no later census reads "RULED" as "discharged".

**ESC-M1 — §0i.2's re-trigger HAS FIRED, and receipt (1) is now false at the bytes. Returned; not ruled
here.**
§0i.2 wrote its own re-trigger in terms: *"**9.0.0** … re-enters X-W0.j's enumeration as a candidate
**the moment `npm view @mkbabb/glass-ui version` returns 9.0.0** (that is the re-trigger; the census
re-runs, nothing is pre-decided)."* Measured by this seat, double-run:

| probe ⟨cmd⟩ | at the close (2026-09-17 ~15:40) | **at this check** |
|---|---|---|
| `npm view @mkbabb/glass-ui version` | `8.0.0` | **`9.0.0`** |
| `npm view @mkbabb/glass-ui dist-tags.latest` | `8.0.0` | **`9.0.0`** |
| `npm view @mkbabb/glass-ui@9.0.0 version` | `E404` | **`9.0.0`** |
| `npm view @mkbabb/glass-ui time.9.0.0` | — | **`2026-09-17T20:33:34.848Z`** |
| `git -C ../glass-ui rev-parse --short=8 'v9.0.0^{commit}'` | `d4f7b24f` | `d4f7b24f` (unmoved) |

The owner act §0i.5 named (*"re-mint the token / `npm login`, then `npm publish` off the `v9.0.0` tag
tree"*) **happened today, after this wave's close and after its repair round**. glass's own HEAD says so:
⟨`git -C ../glass-ui log --oneline -1`⟩ → **`81f7db0d docs(BK/coordination): act-4 publish landed —
9.0.0 live with provenance, the wall struck where it stood`**.

**What this does NOT move, measured rather than assumed**: HG-18's four conditions are read against the
**installed** tree and the **elected target's** receipt, and no registry publication touches either —
c1 `7.0.0`/`^7.0.0`, c2 `./watercolor-dot` present, c3 `0` indicator slots all still **FAIL**, c4 at
8.0.0 still **PASS**. **The census stays 1/4 = FAIL at the elected target 8.0.0; 9.0.0 reads 0/4;
X-W4.g stays CLOSED and the §1.M bank stays shut at either candidate.** The §ADDENDUM 2026-08-30 is
explicit that the registry/tag datum *"does not gate the census"*.

**What it does move, and why it is not this seat's**: §0i.2's receipt **(1)** — *"PIN-LAW's registry
half is satisfiable only at 8.0.0 — the registry holds 8.0.0 and does not hold 9.0.0"* — **is false at
today's bytes**. Receipt (3) was already erratum'd at §0i.5; receipts **(2)** (the six §EXTERNAL rows
sized at 8.0.0) and **(4)** (the audited hash `17a11bc5`; no seat has audited `d4f7b24f`'s bytes) stand
and are untouched by the publish. **Re-running X-W0.j's census over both candidates and re-affirming or
re-making the election is the orchestrator's and the owner's, not a VERIFY-ONLY check seat's** — and
§0i.2 itself says *"the census re-runs, nothing is pre-decided"*. **Returned. No act taken, no re-election,
no byte of `W0.md`, `COHESION.md` or the census written.**

**ESC-M2 — E13: the I-30 letter was AMENDED after the close, and its row's digest pin is stale. Returned;
rowing is outside this seat's writable set.**
⟨`ls -lt ../glass-ui/docs/tranches/BK/coordination/`⟩ shows `glass-outbound-2026-08-29-valuejs-o20-ack.md`
at mtime **`2026-09-17 16:34:58`**. The I-30 row pins it at ⟨`shasum \| cut -c1-12`⟩ **`caed90705234`**,
mtime **`2026-08-29 16:41:56`**, glass **`3a2329c1`**. Measured now: **`ec360555811b`**, mtime
**`2026-09-17 16:34:58`**, glass **`81f7db0d`**. The added block, quoted from the producer's bytes:

> **[2026-09-17 · LIVE: 9.0.0 is on the registry — `release.yml` run 33273556530 attempt 3, provenance
> (sigstore logIndex 2880033507), `gitHead` `d4f7b24f` = the `v9.0.0` tag, `unpackedSize` 2549378. The
> tag pin and the registry pin are now the same tree …]**

This is **new mail content on a rowed letter, squarely in X-W0.j's scope**, and E13's first limb
(*"new mail is ROWED … before any other work"*) is therefore **not** met for it.
**`docs/tranches/V/coordination/INBOX.md` is in no row of this seat's writable set**, so it was **not
written** — the standing law returns an out-of-bounds write as an escalation rather than taking it.
**Returned to the orchestrator**, with the far-end bytes above so the rowing seat measures rather than
re-derives. ESC-M1 and ESC-M2 are the same event seen from two ends.

**The rest of the E13 sweep — four paths, read-only, at this seat's own clock**, classification taken
from each row's **status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**):

| # | path | newest | disposition |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | `INBOX.md` self-excluded (SELF-COUNT); next `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 | **ours (O-21)**, rowed |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `glass-outbound-2026-08-29-valuejs-o20-ack.md`@**16:34 today** | **I-30, rowed — but AMENDED: ESC-M2** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`@14:58 | **ours outbound** |
| 4 · 4b | `../sci-report/atlas/docs/tranches/{P,Q}/coordination/` | `valuejs-inbound-2026-07-27-…`@Aug 3 · `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` | **ours (O-12)** · **I-27, rowed** |

**BK re-confirmed the newest glass tranche dir** ⟨`ls -ltd ../glass-ui/docs/tranches/*/`⟩ → `BK/` heads
`BJ/`, `BI/`. **Status-cell scan over all 57 rows**: exactly **three** rows contain the string `UNREAD`
and **none is classified so** — **O-20** = `SENT` (the word is in its sweep note about glass's own 08-09
letters), **I-30** = `ROWED 2026-08-30`, **I-31** = `FOLDED 2026-09-17`. **0 rows UNREAD.**
`glass-ui` stayed **READ-ONLY**; **zero** bytes were written to any sibling tree by this seat.

---

### 6 · Three published counts that do not reproduce — corrected by measurement, none moving a verdict

The self-count law binds a check as much as a unit. All three are stated-vs-measured divergences in
**round-1's** own receipts; each is corrected here **by addition** (E-3), and **none moves a gate**.

| # | the stated figure | measured at this clock | why it does not move a verdict |
|---|---|---|---|
| **D-1** | §Close `:1278` and `waves/W0.md` §CLOSE: union bounds over *"**1,850** paths"* | over the close's own 13-commit roster: **1,858** distinct paths (12 pre-close commits alone: **1,855**); over this check's 30-commit set: **1,864** | a **larger** denominator returning the same five zeros is strictly stronger evidence, not weaker. The bounds claim survives; only the count was mis-stated |
| **D-2** | §Close §5 and the LEDGER row: *"**fifteen** escalations returned"* | the enumeration yields **17** distinct items — E-1 · E-2 · E-3 · X-6 · HG-4 · RS-1 · RS-2 · DR-21 · CC-104/OP-1 · **S-1..S-8** (7 + 2 + 8). The "ten, the sitting's own" bullet is 2 + 8 | **all seventeen are RULED at §0k** (§5), so the mis-count hid nothing and left nothing unanswered. The honest count is **17** |
| **D-3** | §Close §1 row 11: *"this close … **4** paths"* | ⟨`git diff-tree --name-only -r 1246f859 \| wc -l`⟩ → **3**; the LEDGER row landed in its own commit **`79298655`** | the four paths were written; they landed across **two** commits, not one. Nothing is lost; the table's per-commit cell is what is off |

Also recorded, not a defect: `58be3626`'s cell reads **6** where the commit carries **7** — the seventh
is Track B's own `X/keyframes/W0/REF-OF-RECORD.md`, which X-W0.c **C9** already names in the same
breath as the shared-index carry. The close's own landed-wrong table (§6) is accurate.

---

### 7 · What this check found sound, and what it leaves standing

**Sound, by re-measurement and not by deference**: every artefact byte-figure in `waves/W0.md` §CLOSE
reproduces **exactly** ⟨`wc -c`⟩ — 26,917 · 60,284 · 67,918 · 41,739 · 53,103 · 26,471 · 26,309 ·
983,886 — and **every one of the eight tracked artefacts carries `SERVED MODEL:` on line 1**. X-W0.k's
append-only claim was **re-tested at this seat's hand**: ⟨`diff <(git show 1246f859:waves/W0.md)
<(sed -n '1,574p' waves/W0.md)`⟩ → identical through `:572`, the only additions being the blank +
`---` at `:573–574` and the addendum below them. **Zero bytes of §State … §CLOSE were moved.**

**Left standing, with its owner named** — because moving it is outside this seat's writable set:

| # | residual | owner |
|---|---|---|
| 1 | **`waves/W0.md` §State `:9–10` still carry round-1's readings** — *"complete_with_misses"*, *"HG-7 RED — ESCALATED E-1; HG-10 SPLIT — E-2"*. Both gates are **GREEN** at this check against §0k.1's rulings, so the two status lines now under-state the wave. **`waves/W0.md` is in no row of this seat's writable set** and was not touched: *a check that edits a gate's subject has stopped being a check* (§RESUME `:1626`) | the orchestrator, or a docs seat holding `waves/W0.md` — a dated addendum-beside, never a rewrite (E-3) |
| 2 | **ESC-M1** — §0i.2's re-trigger fired; receipt (1) false at the bytes | orchestrator / owner |
| 3 | **ESC-M2** — the I-30 amendment is unrowed; `INBOX.md` out of bounds here | orchestrator |
| 4 | the **nine owed acts** of §5's table (E-1's harvest · RS-1 · RS-2 · DR-21 · CC-104/OP-1 · S-1..S-8's per-wave addenda) | X-W5 · X-W9 · X-W10 · X-W11, each at its own open |
| 5 | the **15 residuals** of §Close §8 stand exactly as that seat listed them; **§0k rules 8 of them** and the remainder keep their named owners (the `.gitignore` PNG shadow → X-W11 · the wave-gate-text quarantine axis → X.W6.j · MQ-1 → X.W6.j · the DAG evidence digest → X-W11/L-18 · `V.L6`'s identical shape → the next census · `V.L1`'s typing · the two e2e fixture imports → X-W1 · the 11-vs-7 bank arithmetic · CROSS R-07) | as listed there |
| 6 | **`scripts/dev/dev.sh` remains dirty by ruling** (DR-24 / CC-021 / §0j.A) — expected output in any `git status` receipt, never touched, never staged by this seat | owner-held, outside every X denominator |
| 7 | **L-18's two challenging gestalt passes are NOT performed by this check** (`W0.md` §L-18 rider `:407–409`). A fresh VERIFY-ONLY check is not the quartet-of-skeptics apotheosis; X-W0 is **IMPLEMENTED and CLOSED**, not **ACCEPTED**. Scheduled with the X-W1 open, as the rider says | the orchestrator |

---

### 8 · The verdict

**X-W0 is CLOSED (honest-RED: E13's rowing limb — ESC-M2).**

- **18 of 18 hard gates GREEN · 8 of 8 fold gates GREEN**, every one re-run at this seat's own clock
  against the gate's own GREEN definition, every published count double-run, **nothing inherited**.
- **Union bounds re-proven over 1,864 paths across 30 commits**: non-`docs/` **0** ·
  `registry/adjudicated/` **0** · 7e28 copies **0** · canonical `challenge-*.md` **0** · `dev.sh` **0**.
- **Every returned escalation is RULED at §0k — 17 of 17, none owed a ruling**; nine owed acts carry a
  named later wave.
- **The one RED is E13's rowing limb**, created **after** the close by a producer publish and a letter
  amendment, and it is **not this seat's to cure** — `INBOX.md` is outside the writable set, so it is
  returned (**ESC-M2**) beside the producer-state escalation it is twinned with (**ESC-M1**).
- **VERIFIED remains ✗ and stays X-W11's** (R-A). This check stamps no verb and answers no escalation.

**HEAD at close of check**: stated in §9 with the commit.

### 9 · What this check seat did NOT do

**Cured nothing. Wrote two paths**: this record's §Check 1 and `execution/LEDGER.md`'s own X-W0 row cells
plus one appended event line — **nothing else**. **No** `waves/W0.md` byte (its two stale status lines
are returned as residual 1, not fixed) · **no** `COHESION.md` byte · **no** `INBOX.md` byte (ESC-M2 is
returned, not rowed) · **no** `registry/**` byte · **no** canonical `challenge-*.md` byte · **no** 7e28
byte · **no** product byte · **no** sibling-tree byte (`../glass-ui`, `../keyframes.js`,
`../sci-report/atlas` and `docs/precepts` were **read and hashed only**; the only `npm` invocations were
`view`, read-only) · **no** `docs/tranches/X/artefacts/W0/` directory manufactured.
**Extended relief to no gate by name** — HG-7 and HG-10 are GREEN because §0k.1 rules how they are read
and the bytes satisfy that reading, both re-earned here from the tree, not from a receipt.
**Tracked and deleted none** of HG-1's cross-track carriers. **Answered no escalation** — the seventeen
are audited against §0k, and the two new ones are returned as raised. Two ephemeral-worktree replays
were created, read and **removed**; **nothing was committed from either**, and ⟨`git worktree list`⟩ is
back to its four standing entries. The main repository was untouched by every probe
⟨`git status --porcelain` identical before and after each generator and harness run⟩.
**No `git stash`, no `reset`, no force-push, no history rewritten.** `scripts/dev/dev.sh` never touched,
never staged. **No verb stamped; VERIFIED stays X-W11's.**

### 10 · WRITE-THEN-MEASURE addendum — the landed hash, and the two pointers it closes (dated 2026-09-17)

**E-3: an addendum-beside. Not one byte of §Check 1 `:1861–2212` is rewritten.** §Check 1's header and
§8 each promised the close hash forward (*"stated at §7"* / *"stated in §9 with the commit"*) and
neither section could carry it, because the hash does not exist until the commit exists. It exists now,
so it is written here rather than left as a pointer into nothing — the same defect class this wave's
own HG-17 and G-G(b) exist to catch, applied to this seat's own receipt.

| datum | value |
|---|---|
| **the check commit** | **`b92d6a38`** — `docs(x-w0/check): X-W0 CHECK 1 — fresh VERIFY-ONLY adjudication returns CLOSED (honest-RED: E13 rowing limb); 18/18 hard + 8/8 fold GREEN at its own clock` |
| **paths in it** | **2** ⟨`git diff-tree --no-commit-id --name-only -r b92d6a38`⟩ — `execution/A/X-W0.md` · `execution/LEDGER.md`, exactly the writable set |
| **HEAD at open of check** | `d5d1931d` |
| **HEAD at close of check** | **`b92d6a38`** (this commit; sibling tracks commit concurrently, so a later HEAD is expected and is not this seat's) |

**Bounds over this seat's own commit, measured after it landed**: `^docs/` **2** · `registry/adjudicated/`
**0** · `codex-worktree-7e28` **0** · `challenge-*.md` **0** · `dev.sh` **0** · `X/keyframes` **0** ·
`registry/harvest` **0** · `INBOX` **0** · `waves/W0.md` **0** · `COHESION` **0**. ⟨`git diff --check`⟩
clean, exit 0. **Append-only proven at the bytes**: ⟨`git diff --numstat`⟩ → **352 / 0** on the record
with a single hunk `@@ -1860,0 +1861,352 @@`, and ⟨`head -c 273867 <record> | shasum -a 256`⟩ →
**`d1da786215aed44b`** both before and after the append — the prior 1,860 lines are byte-identical.
The LEDGER took **1 changed line + 1 appended line** (⟨`git diff --numstat`⟩ **2 / 1**), the X-W0 row
replaced **in place** with its pipe count unchanged at **6**, identical to its untouched neighbour.

**The shared-index guard held.** ⟨`git diff --cached --name-only`⟩ was **empty** before the `add`, and
the commit carried its own pathspec (`git commit … -- <the same two paths>`), so a concurrent Track D
seat's staged `X/parse-that/waves/W1-CLOSE.md` **was not swept** — it was left for its own seat, which
committed it. **§Format And Lint Cadence `:346`**: `npm run lint` / `vue-tsc` intentionally skipped —
this seat wrote **zero** `.ts`/`.vue`/`.css` bytes; the replacement evidence is the three script gates
re-run above plus ⟨`git diff --check`⟩.

**Nothing in §8's verdict moves**: X-W0 is **CLOSED (honest-RED: E13's rowing limb — ESC-M2)**, 18/18
hard and 8/8 fold GREEN, **ESC-M1** and **ESC-M2** returned, **VERIFIED still ✗ and still X-W11's**.

---

## §CHECK 2 2026-09-17 (17:05 EDT) — a second VERIFY-ONLY re-run at a LATER clock; one gate no longer reproduces

**SERVED MODEL: claude-opus-5[1m]** · **Seat**: the close seat, re-dispatched after X-W0.k's repair
round. **VERIFY-ONLY — cured nothing, re-baselined nothing, stamped no verb.**
**HEAD at open**: `a6b72b90` ⟨`git log --oneline -1`⟩ · branch `tranche-u` · clock **2026-09-17
17:05:04 EDT** ⟨`date`⟩.
**E-3 posture**: a dated **addendum-beside**. Not one byte of §Open … §Close … §RESUME … §Check 1
`:1–2246` is rewritten. `waves/W0.md` was **not touched** (it is a gate's subject; §Check 1's
residual 1 stands with its named owner).

**Read whole before a byte was measured**: `waves/W0.md` **683 L** · this record **2,246 L** ·
`execution/LEDGER.md` Track A row + event log.

**Verdict, stated first**: the wave's implementation **stands** — **17 of 18 hard gates and 8 of 8
fold gates reproduce GREEN at this seat's own clock**, none inherited, every published count
double-run. **HG-8's literal byte-diff clause NO LONGER REPRODUCES** and is returned as **ESC-N1**
(§3) — not a defect in a cure, but a structural consequence of one: the ledger's out-of-corpus block
ranges over a live directory *outside the repository*. **E13's rowing limb is still open** (ESC-M2,
re-measured at §4). **VERIFIED stays ✗ and stays X-W11's** (R-A).

---

### 1 · The roster re-opened at a third clock, and the bounds re-proven

**20 commits** re-opened ⟨`git diff-tree --no-commit-id --name-only -r <hash>`⟩ — the fifteen
artefact/close/repair hashes, the two LEDGER commits (`79298655`, `a6b72b90`) and §Check 1's two
(`b92d6a38`, `7c700dc9`). **All twenty resolve**, each carrying the subject its cell names.

| probe over the 20-commit union | result |
|---|---:|
| distinct paths | **1,859** |
| ⟨`grep -cv '^docs/'`⟩ non-`docs/` | **0** |
| ⟨`grep -c 'registry/adjudicated/'`⟩ | **0** |
| 7e28 copies (excluding `CENSUS.md`) | **0** |
| canonical `challenge-[A-Z]-[a-z]+\.md` | **0** |
| ⟨`grep -c 'dev\.sh'`⟩ | **0** |
| ⟨`grep -c 'registry/harvest'`⟩ | **0** |
| ⟨`grep -c 'X/keyframes'`⟩ | **1** — `X/keyframes/W0/REF-OF-RECORD.md` in `58be3626`, the shared-index carry X-W0.c **C9** and §6 already book as landed-wrong; **no new finding** |

Five bounds, five zeros, at a third independent clock.

### 2 · The gates, re-run — reading, then verdict

| gate | this seat's probe ⟨cmd⟩ | reading | verdict |
|---|---|---|---|
| **HG-1** | ⟨`git ls-files --others --exclude-standard docs/ \| wc -l`⟩ · and the same over the three frozen-census trees | live absolute **1**, double-run **1** — the sole carrier is `X/keyframes/waves/evidence/KF-W4/k3-decision.md`, **Track B**, `KF.W4` executing; **CR-4 set-difference over `T/audit` ∪ `V/apotheosis` ∪ `W/audit` = 0**, double-run; those trees hold **1,993** tracked files, **0** untracked | **GREEN** (CR-4). Neither tracked nor deleted by this seat |
| **HG-2** | ⟨`grep -c '^\| \*\*D-'`⟩ | **3** rows ≡ **3** census trees, each with a reason; TRACK 3 · ARCHIVE 0 · DELETE 0 | **GREEN** |
| **HG-3** | ⟨`git ls-files …/raw-prompts/ \| wc -l`⟩ · ⟨`grep -cE '^\\| [FRB]#[0-9]{3} \\|'`⟩ · **this seat's own anchor verifier** | corpus **4** tracked · **181** rows (**F 83 · R 28 · B 70**) · **181/181** anchors resolve to a real **non-blank** `<archive>:<line>`, **0** unresolved, double-run | **GREEN** |
| **HG-4** | §2.2 read at the bytes; both losing readings re-read at their coordinates | dated **2026-09-17**, canon **P (0/2)**, loser **J SUPERSEDED, epoch-scoped**; `vnext/PROMPT-RECAP.md:88` and `"status":"clean"` both still live and annotated | **GREEN** |
| **HG-5** | ⟨`grep -oE '\`[FRB]:[0-9]+\`'`⟩ over §3 + the same verifier | **13** restored rows (the union, 12 required); **19/19** anchors resolve, **0** unresolved | **GREEN** |
| **HG-6** | ⟨`cat <3 gate-text files> \| grep '264/264' \| grep -vc 'CHALLENGED'`⟩ | **0**, double-run **0**, over all **6** occurrences at the five live sites; ⟨`grep -c 218`⟩ → **6** | **GREEN** |
| **HG-7** | ⟨`node validate-completeness.mjs --self-test`⟩ ×2 | **exit 0** · `0 uncovered` · `264/264 = 218 CHALLENGED + 46 REPORT-AUTHORED` · **SELF-TEST PASS — 6/6**; ⟨`diff run1 run2`⟩ **empty**; ⟨`git status --porcelain`⟩ identical before/after — read-only proven | **GREEN** |
| **HG-8** | this seat's **own** ephemeral worktree of `a6b72b90` | ⟨`git diff --exit-code`⟩ → **1**, double-run 1 — **the literal clause fails**. Partitioned at §3: the **gating half is byte-identical**, the whole diff is **8 / 5** lines inside the out-of-corpus block | **RED at the literal clause · GREEN in substance — ESC-N1 (§3)** |
| **HG-9** | tree/tracked counts · **this seat re-parsed §2 and re-hashed independently** ⟨`tail -c <bytes> \| shasum -a 256`⟩ | **91** files / **91** tracked / **0** untracked; **90/90 MATCH · 0 DRIFT · 0 MISSING** (the 90th resolving at its `.WORKTREE-VARIANT.md` path, digest `91b9a0ce…` exact); accounting **90 + 36 = 126**; collision → **2** distinct tracked names; `~/.codex` worktree still listed, unmodified | **GREEN** |
| **HG-10** | ⟨`grep -c 'r1 · re-run at r2 (witnessed)'`⟩ · per-slug ⟨`git ls-files … \| grep -c r2`⟩ | **6** supersession cells · r2 tracked **6 + 2 + 26 = 34** · the three r2 rows read **EXISTS-ORIGINAL** with harvest `wf_1a4c8a8c-557` | **GREEN**, read against **§0k.1** |
| **HG-11** | marker ⟨`grep -c`⟩ · **coverage set-difference re-derived by this seat's own construction** (§7.1–§7.3 literal ∪ §7.4 subject×axes expansion) | marker **8**, double-run; **16 literal + 30 expanded = 46**, `sort -u` **46**; ledger−record **0**, record−ledger **0** | **GREEN** |
| **HG-12** | ⟨`grep -c '^### TS-'`⟩ + **all nine probes re-run by this seat** | **9** tombstones; **9/9 reproduce** — CC-015 **5** hits / **3** files · CC-016 `139`,`287` + glass **7.0.0** · CC-017 `63240e67…` vs kf `8ccf9f4d…` · CC-018 `> _(empty — the owner's verdict lands here)_` · CC-022 kf **6.0.0** · CC-019 **69** / **0** · CC-020 **0** · CC-021 ` M scripts/dev/dev.sh` · CC-023 **301 → `https://color.babb.dev/`** | **GREEN** |
| **HG-13** | the seven verdict cells read at the bytes; falsifier re-tested | **7/7** tokens — **6 RETIRED + 1 LANDED-AS-RULED (U-F12 POLE B)**; ⟨`grep -ciE '\| *(banked\|pending\|carried) *\|'`⟩ → **0** | **GREEN** |
| **HG-14** | ⟨`node graph-v3.mjs --verify`⟩ ×2 | `ROUND-TRIP GREEN`, exit 0 both; committed↔live MATCH on all five digests (`0e75a1c9…` `4f1fb14f…` `bf9c9a20…` `e3a09112…` `b3a387c9…`); ⟨`diff run1 run2`⟩ **empty**; ⟨`git status --porcelain`⟩ unchanged | **GREEN** |
| **HG-15** | **this seat re-hashed all 88 rows against live bytes** ⟨`shasum -a 256 \| cut -c1-16`⟩ + ⟨`wc -c`⟩ | **88 MATCH · 0 MISMATCH · 0 byte-count mismatches · 0 missing**; live ⟨`find demo -name '*.vue' \| wc -l`⟩ → **88**; the six figures **88 · 310 · 14+1 · 13 · 2 · 2** EXACT | **GREEN** |
| **HG-16** | ⟨`grep -aL 'COMPLETABLE' docs/tranches/X/waves/W*.md \| wc -l`⟩ | **0** missing over **12** wave files, double-run | **GREEN** |
| **HG-17** | per-site ⟨`grep -c 'V·L5\|V\.L5'`⟩ and ⟨`grep -c 'X-W9'`⟩ / ⟨`grep -c 'X-W11'`⟩ over all six law-bearing sites | token **0 · 0 · 0 · 0 · 0 · 0**; each site reads X-W9 and X-W11 (**2·2 / 2·2 / 2·2 / 7·4 / 11·4 / 10·4**); `validate-constellation-dag.mjs` carries **0** `V.L5` node ids; **59** residual carriers ⟨`git grep -l`⟩, every one in a class `:321` names legal (22 frozen 7e28 · 6 registry · 4 audit · 2 coordination · the rest X-tranche records) | **GREEN** |
| **HG-18** | **all four re-measured read-only by this seat** | **c1** installed **7.0.0**, pin `^7.0.0` → **FAIL** · **c2** ⟨`…exports…/watercolor/…`⟩ → `./watercolor-dot` → **FAIL** · **c3** indicator-slot `.d.ts` decls → **0** → **FAIL** · **c4** target-relative at the elected **8.0.0**: `MIGRATION.md` §8.0.0 (510 L) names **keyboard 2 · orientation 2 · motion 1** → **PASS**; at 9.0.0 (105 L) **0 · 0 · 0**. **1/4 = FAIL at 8.0.0 · 0/4 at 9.0.0 → X-W4.g stays CLOSED, the §1.M bank stays shut** | **GREEN** (the gate returns its dated verdict) |

**Fold gates, all eight re-run**: **G-A** ⟨`grep -ro 'X[-.]W4\.g' registry/adjudicated/*.md`⟩ → **62**
across **10** records · **G-B** the docket self-counts **18 = 9 owner rows + 8 escalations + 1
OWNER-DECISION** ⟨`grep -oE '^\| [0-9]+ \| (owner row\|escalation\|OWNER-DECISION)'`⟩ · **G-C**
⟨`grep -nEi 'requestAnimationFrame\|\brAF\b\|animation-timeline\|scroll-timeline\|setInterval\|setTimeout'`
over the 46 canonical paths⟩ → **0 lines** (the false clear stays unspellable) · **G-D** `EXISTS-ORIGINAL
213 · UNWITNESSED-DIRECT 5 · REPORT-AUTHORED 46` → **213+5+46 = 264 = 218+46** · **G-E** `G-E closure
GREEN 11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed`, twice · **G-F** RATIFIED (GF-R3);
⟨`grep -c 'SLATE ENTRY'`⟩ → **15** · **G-G** `TRACK-OR-ARCHIVE.md` carries **3** tree rows + **5**
DR rows, all **5** `RE-SCRIPT → X-W1`, and **6** `CR-1..CR-6` rules · **G-H** adjudicated ∩ union →
**0**. **8 of 8 GREEN.**

---

### 3 · ESC-N1 — HG-8's byte-diff clause is no longer satisfiable by construction. Returned, not cured.

**The replay, run by this seat's own hand** in an ephemeral `git worktree` of `a6b72b90`
(created, read, restored, removed — nothing committed from it):

⟨`node hydrate-reports.mjs && node validate-completeness.mjs`⟩ → both **exit 0** ·
⟨`git diff --exit-code`⟩ → **1** · ⟨`git status --porcelain`⟩ → **1 line**, and the one line is
`M registry/COMPLETENESS-LEDGER.md`. `HYDRATION-LEDGER.md` shows **no diff at all** — the hydration
half reproduces its committed bytes exactly.

**The diff is 8 insertions / 5 deletions and every hunk is inside the out-of-corpus block**
⟨`git diff -U0 \| grep '^@@'`⟩ → `:203 · :208 · :210 · :228 · :320 · :324 · :350` — the owed-set
headline (**95 → 97** records, **89 → 91** owed), its by-program table (`x-track-D` **+2**), two new
per-record rows (`wf_b749e51e-e79` *killed* · `wf_c431fb2c-82d` harvest-short 14/12) and the VERDICT
line's owed count.

**Partition proof — the gating half did not move one byte**:
⟨`git show HEAD:…/COMPLETENESS-LEDGER.md \| sed -n '1,199p' \| shasum -a 256`⟩ → **`a17320ee56ecb2ca`**
and the regenerated file's own `sed -n '1,199p'` → **`a17320ee56ecb2ca`**. The roster, the
`264/264 = 218 + 46` denominator, the three integers and the 27 in-corpus non-band records are
**identical**. **No component, axis, hash or denominator moved.**

**Determinism intact**: the regeneration was run twice inside the worktree and the two outputs are
⟨`diff`⟩ **byte-identical** — the generator is deterministic *at a fixed clock*; it is not a pure
function of *repository* bytes.

**The gate's own falsifier still fires, by this seat's hand**: hash width **64 → 16** in
`hydrate-reports.mjs` ⇒ ⟨`validate-completeness.mjs`⟩ **exit 1**, `0/264 hash-banked`. The tree was
then ⟨`git checkout -- .`⟩ restored to ⟨`diff --exit-code`⟩ **0**, `status --porcelain` **0 lines**,
and the worktree removed ⟨`git worktree list`⟩ → back to its **four** standing entries.

**The finding, stated plainly.** §0k.1's scope cure — correctly — put the 89 (now 91) owed
out-of-corpus shortfalls **on the ledger's own face, by run id**. That block is regenerated from the
**live session-journal directory, which is outside this repository and moves under four concurrent
tracks' hands**. Therefore **HG-8's literal test — "reproduces both committed ledgers,
`git diff --exit-code`" — becomes RED the moment any sibling track dispatches a workflow, with no
megatranche byte moved.** §Check 1 measured `diff 0` a few hours ago and was right then; two
`x-track-D` runs have landed since. The ledger says this of itself in terms: *"A figure that moves
when no megatranche byte moves is a measurement of another program."*

**ESC-N1 — returned to the orchestrator, no act taken.** The candidate cures (date-stamp and pin the
out-of-corpus block as a dated measurement rather than re-deriving it every run; or scope HG-8's
byte-diff to the gating half it was written for) both edit `validate-completeness.mjs` /
`hydrate-reports.mjs` **and the gate's own text**, and a check seat may not re-baseline the gate it is
checking. **Natural owner: X-W11**, which already owns the harvest limb (`workflows/harvest-journals.mjs`)
that rewrites exactly these figures. **Nothing was written to either generator, either ledger, or
`waves/W0.md` by this seat.**

---

### 4 · E13 — the four paths swept again, and ESC-M2 re-measured as still open

Classification from each row's **status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**).

| # | path | newest by mtime | disposition |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | `INBOX.md`@**16:44** self-excluded (SELF-COUNT); next `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 | **ours (O-21)**, rowed |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `glass-outbound-2026-08-29-valuejs-o20-ack.md`@**16:34:58** | **I-30, rowed — still AMENDED-AND-UNROWED: ESC-M2 stands** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`@14:58 | **ours outbound** |
| 4 | `../sci-report/atlas/docs/tranches/{P,Q}/coordination/` | `ATLAS-TO-VALUE-2026-08-03-RULINGS.md`@Aug 3 | **I-27 / O-12**, rowed |

**Status-cell scan**: exactly **three** rows contain the string `UNREAD` and **none is classified so** —
the three hits at `:4`, `:5`, `:23`, `:33` are the ledger's own *law text and status vocabulary*, and
rows O-20 / I-30 / I-31 read `SENT` / `ROWED 2026-08-30` / `FOLDED 2026-09-17`. **0 rows UNREAD.**

**ESC-M2, re-measured**: the I-30 row still pins ⟨`shasum \| cut -c1-12`⟩ **`caed90705234`**; the letter
measures **`ec360555811b`** at mtime **2026-09-17 16:34:58**, 3,639 B. `INBOX.md` was written at 16:44
(the X.P.W1 close sweep) and carries **no** row for the amendment ⟨`grep -c '9.0.0 is on the registry'`
· `'ec360555'` · `'81f7db0d'` → **0 · 0 · 0**⟩. **`INBOX.md` is in no row of this wave's §File Bounds**,
so it was **not written**; the honest-RED limb stands exactly as §Check 1 returned it.

**ESC-M1, re-measured and still true**: ⟨`npm view @mkbabb/glass-ui version`⟩ → **9.0.0** ·
⟨`dist-tags.latest`⟩ → **9.0.0** · ⟨`git -C ../glass-ui log --oneline -1`⟩ → `81f7db0d` · both tags
`v8.0.0` and `v9.0.0` present. **It moves no HG-18 condition** — c1/c2/c3 read the *installed* tree
(7.0.0) and c4 the *elected target's* receipt, and §ADDENDUM 2026-08-30 is explicit that the
registry/tag datum *"does not gate the census"*. Re-running the census over both candidates is the
orchestrator's and the owner's. `../glass-ui` stayed **READ-ONLY**; the only `npm` calls were `view`.

#### §4.1 · WRITE-THEN-MEASURE addition (17:12 EDT) — **ESC-M2's rowing limb closed by Track D while this section was being written**

**E-3: an addition, not a rewrite.** §4's readings were taken at **17:05** against HEAD `a6b72b90` and
were true then ⟨`git show a6b72b90:…/INBOX.md \| grep -c 'ec360555\|81f7db0d'`⟩ → **0**. Seven minutes
later the bytes moved, so the movement is recorded rather than left to contradict a stale line.

⟨`git log --oneline -1 -- docs/tranches/V/coordination/INBOX.md`⟩ → **`f7f613e9`** (Track D's X.P.W1
CHECK 1 seat). ⟨`grep -c 'ec360555\|81f7db0d'`⟩ → **1**, at `INBOX.md:144`: a dated E13 sweep line that
names the amendment at the bytes — the letter's new digest **`ec360555811b`** against the row's banked
**`caed90705234`**, glass commit **`81f7db0d`**@16:35:09, the 9.0.0-live provenance datum — classifies
I-30 **ROWED, not UNREAD**, takes **no** disposition beyond the line, and **files the owed act as K-R1
at `execution/D/X-P-W1.md` §Close, owner orchestrator** ⟨`grep -c 'K-R1'`⟩ → **4**.

**Reclassified, by measurement**: the amendment is now **recorded in the durable ledger** and no row is
classified UNREAD ⟨`grep -E '^\| [IO]-[0-9]+ \|' \| grep -c 'UNREAD'`⟩ → **3 rows carry the string, 0
classified so** (O-20 `SENT` · I-30 `ROWED 2026-08-30` · I-31 `FOLDED 2026-09-17`), over **53** mail
rows. **ESC-M2's *unrecorded* limb is therefore DISCHARGED — by Track D's hand, not by this seat's** —
and what remains is exactly **I-30's stale digest coordinate plus the routing of the 9.0.0-live datum to
X-W0.j's consumers**, which is **K-R1 ≡ ESC-M2 ≡ ESC-M1 seen from three tracks, one owner: the
orchestrator.** Two VERIFY-ONLY seats on different tracks reached the same disposition independently
and neither re-rowed: that agreement is the evidence, and **this seat still wrote no `INBOX.md` byte.**

#### §4.2 · WRITE-THEN-MEASURE addition (17:20 EDT) — the shared-index hazard measured a FIFTH time, in both directions, on this seat's own writes

**Recorded because it happened to this check's own bytes, live, and the wave's LEDGER row is the
subject.** Four tracks share one index and one `execution/LEDGER.md`.

1. **A sibling's uncommitted hunk could not be separated by a pathspec.** When §Check 2's LEDGER write
   was ready, ⟨`git diff -U0 -- execution/LEDGER.md`⟩ showed **three** hunks: my two (`:28` row cell,
   `:128` event line) and **Track D's uncommitted X.P.W1 row at `:79`**. A pathspec commit takes the
   **working-tree** content of the named path, so `git commit … -- LEDGER.md` would have swept their
   row into a Track A commit — the contamination the standing law forbids, unavoidable by pathspec
   because the two seats' edits are **in one file**. **Act taken**: the index was proven empty
   ⟨`git diff --cached --name-only \| wc -l`⟩ → **0**, **only my two hunks** were staged
   ⟨`git apply --cached <patch with hunk 2 dropped>`⟩, the staged set was re-proven to be exactly
   `docs/tranches/X/execution/LEDGER.md`, and the commit was taken **from the index** so the sibling's
   line stayed untouched in the working tree for its own seat. Landed **`5a2e0011`**, **1** path.
   Their hunk verified still present and unstaged afterwards.
2. **The reverse then happened, to me.** Track D's ⟨`5e9319a7`⟩ wrote `LEDGER.md` from a buffer read
   **before** `5a2e0011` landed: it carried my then-uncommitted commit-cell edit **and reverted both
   of `5a2e0011`'s writes** — the X-W0 notes cell and the appended CHECK 2 event line
   ⟨`git show 5e9319a7 -U0 \| grep '^@@'`⟩ → `-28 +28` · `-79 +79` · **`-128 +127,0`**.
3. **Their seat found it and repaired it**, unprompted: ⟨`8c771475`⟩ *"LEDGER REPAIR — restore Track
   A's X-W0 CHECK 2 row cell and event line, which 5e9319a7 reverted; X.P.W1's CHECK 1 row kept"*,
   **1** path. Re-measured after it: row `:28` carries **ESC-N1** ⟨`grep -c`⟩ → **1**, the event line
   is back ⟨`grep -c 'X-W0 CHECK 2 — the close seat re-dispatched'`⟩ → **1**, file **128** lines. The
   one byte the repair could not know to restore was the commit cell's `check-2` hashes (they had
   ridden `5e9319a7`, not `5a2e0011`), re-applied and landed by this seat at **`3de35925`**, **1** path.

**Net at the bytes: nothing lost, nothing of another track's rewritten, and no `reset`, `stash`,
`force-push` or history rewrite anywhere.** The finding for the runbook, stated once: **a pathspec is
not sufficient protection when two tracks edit the same file** — it protects against a sibling's
*staged paths*, not against their *unstaged hunks in your path*. The index-staging idiom of (1) is,
and it is cheap. Filed beside the three shared-index carries §6 already books (`47608b5c` ·
`9c72f097` · `58be3626`), of which the third rode X-W0's own row-5.

---

### 5 · Residuals carried forward — owners named, nothing parked silently

1. **ESC-N1** (§3) — HG-8's byte-diff clause vs. a live out-of-repo input · **X-W11 / orchestrator**.
2. **ESC-M2** (§4, as §4.1 re-reads it) — the amendment is now **recorded** (`INBOX.md:144`, Track D's
   `f7f613e9`); what stands is **I-30's stale digest coordinate and the routing of the 9.0.0-live
   datum**, filed there as **K-R1** · **orchestrator**.
3. **ESC-M1** (§4) — §0i.2's re-trigger fired; receipt (1) false at the bytes · **orchestrator / owner**.
4. **`waves/W0.md` §State `:9–10` still carry round-1's readings** (*complete_with_misses*, *HG-7 RED*,
   *HG-10 SPLIT*), which §0k.1 and two checks have since overtaken. **Not touched here** — §Check 1's
   residual 1, same reasoning: *a check that edits a gate's subject has stopped being a check* ·
   **orchestrator, or a docs seat holding `waves/W0.md`, by dated addendum-beside**.
5. The **nine owed acts** of §Check 1 §5 (E-1's harvest · RS-1 · RS-2 · DR-21 · CC-104/OP-1 · S-1..S-8)
   and the **15 residuals** of §Close §8 stand exactly as listed there · **X-W5 · X-W9 · X-W10 · X-W11**.
6. **`scripts/dev/dev.sh` dirty by ruling** (DR-24 / CC-021 / §0j.A) — never touched, never staged.
7. **L-18's two challenging gestalt passes are not performed by a check seat**; X-W0 is IMPLEMENTED and
   CLOSED, **not ACCEPTED** · **orchestrator**, scheduled with the X-W1 open.

### 6 · What this seat did NOT do

**Cured nothing · re-baselined nothing · stamped no verb · answered no escalation.** Wrote **two
paths**: this §Check 2 and `execution/LEDGER.md`'s X-W0 row cell plus one appended event line —
nothing else. **No** `waves/W0.md` byte · **no** `COHESION.md` byte · **no** `INBOX.md` byte · **no**
`registry/**` byte · **no** workflow-script byte · **no** canonical `challenge-*.md` byte · **no** 7e28
byte · **no** `registry/adjudicated/**` byte · **no** product source · **no** sibling-tree byte
(`../glass-ui`, `../keyframes.js`, `../sci-report/atlas` read and hashed only). Tracked and deleted
**none** of HG-1's cross-track carriers. One ephemeral worktree created, read, restored to diff-0 and
removed; **nothing committed from it**. **No `git stash`, no `reset`, no force-push, no history
rewritten.** ⟨`npm run lint`⟩ / ⟨`vue-tsc`⟩ intentionally skipped per §Format And Lint Cadence `:346` —
**zero** `.ts`/`.vue`/`.css` bytes written; replacement evidence is the three script gates above plus
⟨`git diff --check`⟩ clean. This section names **no hash of its own commit** — a pointer into nothing is
the defect HG-17 and G-G(b) exist to catch; the commit is this record's newest
⟨`git log -1 --format=%h -- docs/tranches/X/execution/A/X-W0.md`⟩, and it is written into the LEDGER's
commit cell by the one follow-up WRITE-THEN-MEASURE line that can carry it — after it exists.
