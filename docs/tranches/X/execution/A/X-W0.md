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
