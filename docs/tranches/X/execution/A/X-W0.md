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
