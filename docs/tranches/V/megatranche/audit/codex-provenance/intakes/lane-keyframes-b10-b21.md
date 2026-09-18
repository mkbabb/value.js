Served model id: `claude-opus-5[1m]`

# LANE — Codex intake adjudication: KEYFRAMES B10 / B18 / B19 / B20 / B21

**Seat:** per-claim adjudicator (M-21: Codex claims are AUDIT SUBJECTS — never auto-void, never
auto-adopted). **Date:** 2026-08-03. **Authority:** read-only everywhere except this file.

**Subject files** (all under `docs/tranches/V/megatranche/coordination/`, Codex-authored canonical,
receipts literal, never rewritten):

| short | file |
|---|---|
| `B10` | `KEYFRAMES-B10-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md` |
| `B18` | `KEYFRAMES-B18-TERMINAL-STATIC-DEPENDENCY-INTAKE-2026-08-02.md` |
| `B19` | `KEYFRAMES-B19-TERMINAL-MECHANICS-RED-INTAKE-2026-08-02.md` |
| `B20` | `KEYFRAMES-B20-TERMINAL-MECHANICS-RED-INTAKE-2026-08-02.md` |
| `B21` | `KEYFRAMES-B21-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` |

**Cross-reference corpus:** `formation/keyframes/CENSUS-2026-08-03.md` + `lane-library.md` /
`lane-frontend.md` / `lane-docs.md`; the live `keyframes.js` tree (read-only); the frozen Codex roots
under `~/Documents/Codex/2026-08-0{1,2}/`.

---

## §0 — Method, and the honest boundary on receipts

1. **A real read-window existed and then closed.** Every `~/Documents/Codex` verification below
   (`shasum`, `stat`, `find`, `sed`, `python3 json`) executed successfully inside a TCC window early
   in this session. Mid-session the grant lapsed: `shasum … REVIEW.md` → `Operation not permitted`,
   `head`/`cat`/`grep`/`Read` likewise, on files whose hashes I had already reproduced minutes
   earlier. This matches — and independently re-confirms — the master ledger's demotion of
   `sessions D6` ("unverifiable *without* a TCC grant, and any given session may lose it mid-flight",
   `CODEX-PROVENANCE-AUDIT-2026-08-03.md` §0.2). Claims marked **UNPROVEN (TCC)** are unproven for
   that reason alone, not for want of trying; the artifact exists and is hashed.
2. **What was verified, and how.** All six frozen roots were censused (node count, regular-file
   check, mode, nlink, bytes) and every declared SHA-256 recomputed. All four canonical *identity*
   digests were **recomputed from scratch** by rebuilding the declared serialization
   (`/private/tmp/.../scratchpad/ident.py`) — schema, mode token and kind token were solved for, and
   the solutions are exactly the ones the packets declare.
3. **Two runtime falsifiers were reproduced live**, on this host, without touching any Codex byte:
   `ruby -e '[1,2].filter_map{…}'` and the B20 Base64/UTF-8 comparison.
4. **Nothing was executed inside a Codex root.** No Codex file was opened for write, moved, or
   re-hashed into a new artifact. No product source, no `scripts/dev/dev.sh`.

**Canonical-identity solutions (recomputed, all six exact):**

| root | declared identity | schema that reproduces it |
|---|---|---|
| B10 source | `23bd8a6c…40a4` | `basename\|bytes\|644\|nlink\|sha256\n`, basename-sorted |
| B10 hostile | `dd6f2200…33f8e` | same |
| B18 source | `11022dd3…cbd73` | same |
| B19 source | `d5fe8c15…16b1d1` | `relativePath\|regular-file\|0644\|nlink\|bytes\|sha256\n` |
| B20 source | `1c32244a…555050` | same |
| B21 source | `184ddd0c…453fdf` | same |

---

## §1 — THE HEADLINE CROSS-REFERENCE (highest-value rows first)

The five intakes never once name the census's subject matter — no parser seam, no `parseCssColor`
R1 surface, no glass suffusion, no K1–K4, no `serializeCssValue` fork. They audit a **reviewer
harness**, not a product. But they are pinned to a substrate, and that pin is the collision:

**X-1 is the finding of this lane.** The Codex "Keyframes v8" contract lineage that B10/B18/B19/B20/
B21 all authenticate against is frozen to **`8281638c0ac4ac8c54a67a018ca5bf6a9117174f`** — which is
the *sacred stale owner checkout*, **41 commits behind** `origin/master` = `81a56990`, the tree the
census (§0, SCH-1..7) proved carries none of V's execution. Every v8-contract denominator (414
contracts, 152 surfaces, 73,568 Safari cells, 184/184 demo members) is therefore measured on the
tree the formation has already ruled non-authoritative for anchors.

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| X-1 | derived: `B18:29-32` + `B21:20-21` pins → `coordination/KEYFRAMES-EIGHT-HOUR-CURRENT-SOURCE-DELTA-2026-08-03.md:43` | The whole B-lineage's "frozen product HEAD" is `8281638c0ac4…` — i.e. the B10..B21 v8 contract is anchored to the **stale sacred checkout**, not to the tree V executed in | **TRUE** | `git -C keyframes.js rev-parse HEAD` = `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`; `rev-parse origin/master` = `81a56990736ced…`; `rev-list --count HEAD..origin/master` = **41**, reverse = **1** — the census's SCH numbers exactly. Codex's own delta record names `8281638c…` as "immutable source coordinate" and "staged entries 0" (live `git diff --cached --name-only` = 0) | **CARRY-TO-WAVE KF.W0** (Substrate Settle): the §B-12 reconciliation must re-anchor the Codex v8 contract too, or the contract must be declared stale-by-substrate and never cited for a live count |
| X-2 | ibid. `:41` ("`184/184` recursive `demo/**/*.{ts,vue}` members") vs `formation/keyframes/lane-library.md:29` | Codex's frozen snapshot manifest counts **184** demo `.ts`/`.vue`; LIB independently counted **184** with the same `find` | **TRUE — AGREE (and it localizes the substrate)** | On disk in the stale checkout: `find demo -type f \( -name '*.ts' -o -name '*.vue' \)` = **184**. Tracked at `origin/master` = **185**; tracked at `8281638c` = 183 (+1 working-tree file = 184). So both Codex and LIB censused the *same working tree*, and it is not `origin/master` | **ADOPT-AS-FACT**: 184 is the stale-checkout working-tree figure; the HEAD figure is 185. Feeds KF.W0's re-count |
| X-3 | `B18:78` (152-surface / 58-Vue denominator, via `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:465-471`) | The 73,568-cell matrix rests on "58 Vue definitions" among 152 surfaces | **TRUE — AGREE with census** | `git ls-tree -r --name-only origin/master \| grep -c '\.vue$'` = **58**; census AGG-P2/SCH-6 = 58; FE = 58. The one Codex component count that survives the schism unchanged | **ADOPT-AS-FACT**; feeds the KF.W5/KF.W6 component registry as a corroborated roster size |
| X-4 | `B18:78` + handoff `:469-471` | "80 public library surfaces" is the library half of the same denominator | **UNPROVEN** | Census measures **153** `src/**/*.ts` at HEAD (139 at the stale checkout), 14 zones, **2** published entries. No basis reconciles to 80; Codex never states the counting rule | **CARRY-TO-WAVE KF.W5**: the D/L/C registry must state its own counting basis and reconcile 80 / 139 / 153 / "159 modules" explicitly (the census already flags this class of drift, SCH-3) |
| X-5 | all five files, whole | The B-lineage reports **zero** overlap with the census's top-10 live defects (R1 crash surface, five failure postures, cssom RegExp injection, DUAL-1, K1, the 8-curve delta, depcruise decay, KfPillTabs) | **TRUE** | Grep of all five intakes for `parse`, `glass`, `easing`, `serialize`, `color` returns nothing; the census's ten severest rows have no Codex analogue | **ADOPT-AS-FACT**: the B-corpus is a *harness-audit* lineage. It neither confirms nor threatens any product finding — and must never be cited as product coverage |
| X-6 | `B10:5-6`, `B18:3/7`, `B19:7`, `B20:7`, `B21:7` (all five) | "Authority … none / null; Execution, Review B, product, package, Browser, Safari, release, and credit: 0" | **TRUE (self-declaration, and correct)** | `lane-docs.md:338/346-352` (row I-24) reached the same conclusion independently: "not keyframes coordination mail and confer no obligation on either repo", RECONCILED 2026-08-03 | **ADOPT-AS-FACT**: zero authority is *accurate*, which is exactly why the packets are safe to adjudicate rather than quarantine |
| X-7 | `B10:73-77` ("no … successor … follows"), `B18:15-16` ("No B19 … follows") | Both intakes declare terminal stops that forbid successors | **FALSE — self-refuted within the same day** | File mtimes: `B10` intake **18:13:47**, `B18` intake **19:16:50**; the successor roots were created **after** both: `keyframes-v8-review-b19-source/outputs` **20:57**, `b20` **21:41**, `b21` **22:28**, with their intakes at 21:08 / 21:55 / 22:45. B18's "No B19 … follows" was falsified 1 h 52 m later by B19 itself | **REFUTED.** The corpus's terminal-stop language is not load-bearing — successors follow it routinely. Do not treat any Codex "TERMINAL / NO_RETRY" line as a binding boundary when reading the corpus |
| X-8 | `B19:63-64` ("any successor requires a fresh explicit owner ruling and non-overlapping root") | The successor discipline B19 states | **TRUE — and this one WAS honored** | `keyframes-b20-source-only-owner-decision/outputs/OWNER-DECISION.md` sha `7826ac45…` (6,805 B) and `…b21-…` sha `b6942f4a…` (7,421 B) both exist and both rehash exactly; roots `b20`/`b21` are disjoint directories | **ADOPT-AS-FACT**: the *root-hygiene* half of the stop discipline is real; the *no-successor* half (X-7) is not. Useful precedent for how to read Codex stops |

---

## §2 — B10 (static hostile owner intake)

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| B10-1 | `B10:3` | Status `TERMINAL_AMEND / SOURCE_RED` | **TRUE** (as a status declaration) | Self-declaration; consistent with the packet's own content and with X-6 | ADOPT-AS-FACT (chronology) |
| B10-2 | `B10:4` | Mode: tranche-development, **static source reading only** | **TRUE** | B10 root contains no result/verdict artifact of any kind (2 files only, census below) | ADOPT-AS-FACT |
| B10-3 | `B10:5-6` | Authority/slot none/null; execution, Review B, product, package, Browser, Safari, release, credit all 0 | **TRUE** | See X-6 | ADOPT-AS-FACT |
| B10-4 | `B10:10-11` | The externally authored B10 root is read-only at `~/Documents/Codex/2026-08-02/keyframes-v8-review-b10-source/outputs` | **TRUE** | Path exists; 2 files, mtime `Aug 2 03:05` | ADOPT-AS-FACT |
| B10-5 | `B10:12-13` | Exactly **two** regular `0644`/nlink-1 files, no child directories, links or special nodes, **64,323** bytes | **TRUE** | `find … -mindepth 1` = 2 nodes, 0 non-regular; `stat -f '%Sp %l %z'` = `-rw-r--r-- 1` ×2; 23,256 + 41,067 = **64,323** | ADOPT-AS-FACT |
| B10-6 | `B10:17` | `SOURCE-READY.md` 23,256 B, sha `44521493…4931` | **TRUE** | `shasum -a 256` reproduces exactly | ADOPT-AS-FACT |
| B10-7 | `B10:18` | `preflight-b10-source.mjs` 41,067 B, sha `f70f4fcf…c6458` | **TRUE** | ibid. | ADOPT-AS-FACT |
| B10-8 | `B10:20-21` | `basename\|bytes\|644\|nlink\|sha256\n` identity = `23bd8a6c…b40a4` | **TRUE** | Recomputed from scratch, exact (§0 table) | ADOPT-AS-FACT |
| B10-9 | `B10:22-23` | B10 declares source-ready / unexecuted, authority none, slot null | **UNPROVEN (TCC)** | `SOURCE-READY.md` became unreadable before I could read its declaration block; only its digest is proven | CARRY-TO-WAVE KF.W0 (re-read under a TCC grant if the v8 contract is ever cited) |
| B10-10 | `B10:27-28` | Authorized hostile root at `…/keyframes-b10-static-hostile-a/outputs` | **TRUE** | Path exists, 3 files, mtime `Aug 2 18:01` | ADOPT-AS-FACT |
| B10-11 | `B10:29-30` | Exactly **three** regular `0644`/nlink-1 files, no other nodes, **17,623** bytes | **TRUE** | 3 nodes, 0 non-regular, `-rw-r--r-- 1` ×3; 9,332 + 8,135 + 156 = **17,623** | ADOPT-AS-FACT |
| B10-12 | `B10:34` | `REVIEW.md` 9,332 B, sha `3f60cd93…9478a` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B10-13 | `B10:35` | `FINDINGS.json` 8,135 B, sha `97671868…81ffe` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B10-14 | `B10:36` | `checksums.sha256` 156 B, sha `ff1e1b27…8f162`, **replay 2/2** | **TRUE** | `shasum -a 256 -c checksums.sha256` → `FINDINGS.json: OK`, `REVIEW.md: OK` — 2/2 replayed by this seat | ADOPT-AS-FACT |
| B10-15 | `B10:38-39` | Mode-token-`644` identity `dd6f2200…33f8e` | **TRUE** | Recomputed, exact | ADOPT-AS-FACT |
| B10-16 | `B10:40` | "The source root remained byte-stable across the review" | **UNPROVEN** (unfalsifiable retrospectively) — **corroborated** | Both B10 source digests still reproduce today, ~36 h after the review; a mutation would have to have been reverted byte-exactly | ADOPT-AS-FACT (as corroborated chronology, not as proof) |
| B10-17 | `B10:44-45` | `KFB10-A-001 PHYSICAL_COORDINATE_RECAPTURE` is terminal; B10 performs **21** logical target reads over **18** physical coordinates | **UNPROVEN (TCC)** | `preflight-b10-source.mjs` unreadable at adjudication time; digest proven, content not | CARRY-TO-WAVE KF.W4 (as a *gate-design* rule, not as a count — see B10-27) |
| B10-18 | `B10:45-49` | Candidate `OUTER`/`NODE`/`TREE` are re-read through standalone **and** payload aliases with no physical-coordinate cache or shared immutable generation, so two logical authorities can observe different generations and preservation cannot prove one snapshot | **UNPROVEN (TCC)** — **structurally credible** | The successor B18 exhibits precisely this family of defect at a place I *could* read (B18-16): a per-control finalizer rewriting the payload alias of NODE/TREE out from under the projection | CARRY-TO-WAVE KF.W4 |
| B10-19 | `B10:53-55` | Payload semantics reauthenticate **0/333** manifest-record coordinates and replay **0/275** checksum rows — it authenticates statements *about* the payload, not the payload filesystem | **UNPROVEN (TCC)** | Denominators unverifiable: the v8 draft's `CHECKSUMS.sha256` (34,983 B) and `NODE-MANIFEST.json` (86,899 B, 7 top-level keys) were readable in-window but I did not capture their row counts before the grant lapsed | CARRY-TO-WAVE KF.W4 |
| B10-20 | `B10:56-57` | Thirteen predecessor/input groups are allowlist literals; their named authority bytes and checksum claims are not read or replayed | **UNPROVEN (TCC)** | ibid. | CARRY-TO-WAVE KF.W4 |
| B10-21 | `B10:58-59` | Twenty-six controls own **26/140** production leaves; raw JSON syntax/object, exact descriptor membership, and preservation lack concrete owner mutants | **UNPROVEN (TCC)** — **corroborated by the successor** | B18's `leafParity` (readable) asserts exactly `39` owned + `114` unowned = `153` leaves and 39 controls. A 26/140 → 39/153 progression across eight revisions is coherent and in the right direction | CARRY-TO-WAVE KF.W5 (control-coverage ratios are the same shape as D/L/C per-component coverage) |
| B10-22 | `B10:60-61` | Preservation compares derived logical summaries rather than physical path, membership, inode, mode, nlink, size, raw bytes or capture generation | **UNPROVEN (TCC)** | Content unreadable | CARRY-TO-WAVE KF.W4 |
| B10-23 | `B10:62-63` | The control model permits the payload alias of NODE/TREE to diverge from the standalone alias, normalizing an impossible split | **UNPROVEN (TCC)** — **confirmed in the successor** | The B18 finalizer does exactly this and it is the B18 first falsifier (B18-16) | CARRY-TO-WAVE KF.W4 |
| B10-24 | `B10:66-70` | Retained design evidence: strict duplicate scanner, **17-key descriptor design**, case/hex/width leaves, selected hard hashes, Node/Tree semantic fields, case-blind predicate + suppression architecture, read-only git restriction, explicit zero-authority law | **TRUE in part (2 of 8 verified in the successor)** | B18's declaration parses to `descriptors: 17` (measured) and `sourceControls: 14`; `strictParseJson(…,{duplicate:…,syntax:…})` is the strict duplicate scanner, live in `preflight-b18-source.mjs`. The remaining six are UNPROVEN (TCC) | ADOPT-AS-FACT for the two verified; the rest CARRY-TO-WAVE KF.W4 |
| B10-25 | `B10:73-74` | B10 is frozen `AMEND / SOURCE-RED`; do not import or run it | **TRUE** (owner disposition) | Honored by this seat: nothing under any Codex root was executed | ADOPT-AS-FACT |
| B10-26 | `B10:74-77` | Review B is not authorized; no in-place repair, **successor**, candidate, product, package, Browser/Safari, release, slot population, authority or credit follows | **FALSE (in the successor clause)** | See X-7 — B19/B20/B21 roots were created 2 h 44 m to 4 h 15 m after this intake was written | **REFUTED** (successor clause only; the credit/authority clauses stand and are re-adopted at X-6) |
| B10-27 | `B10:77-80` | A later authorized source coordinate must (a) use **one immutable map keyed by physical coordinate**, (b) reauthenticate every payload node and checksum row, (c) read every declared predecessor authority, (d) close raw/descriptor/preservation controls before another hostile | **TRUE (a sound gate-design rule, independent of B10's own counts)** | Rule (a) is exactly what would have prevented B18's confirmed first falsifier; rule (b) is exactly the gap I *did* confirm in B18 (`parseOracleEnvelope` validates receipt envelope + count only, never per-receipt provenance — B18-19) | **CARRY-TO-WAVE KF.W4** — fold (a)–(d) into the born-RED gate-authoring rules for `G-L7a–d`: a gate may not re-derive its own oracle, and every input a gate names must be re-read and re-hashed at use, not allowlisted |

---

## §3 — B18 (terminal static dependency intake) — the substantive packet

B18 is the only one of the five whose *technical* finding I could verify end-to-end. It is
**CONFIRMED, and confirmed harder than stated**: the first falsifier is deterministic, and I
reproduced every link of its chain.

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| B18-1 | `B18:3` | Status `DEPENDENCY_ONLY / TERMINAL_AMEND_SOURCE_RED / KEYFRAMES_SLOT_NULL` | **TRUE** (declaration) | Consistent with content; X-6 | ADOPT-AS-FACT |
| B18-2 | `B18:5/7` | Read-only intake mode; authority and execution credit granted: none | **TRUE** | X-6; `lane-docs.md:346-352` | ADOPT-AS-FACT |
| B18-3 | `B18:11-13` | Supersedes B10 only as the latest observed lineage; B10 remains canonical-root history; **B11–B17 remain preserved chronology**, none rewritten or credited | **TRUE** | All seven successor roots exist on disk: `keyframes-v8-review-b11-source` … `b17-source` (+ `b11`/`b17` static-owner-intakes), none touched | ADOPT-AS-FACT (chronology) |
| B18-4 | `B18:15-16` | "No **B19**, substantive Review B, candidate admission, product mutation, Browser, Safari, package, release, or constellation action follows" | **FALSE (B19 clause)** | X-7: `b19` root at 20:57, intake at 21:08 — same day, 1 h 52 m later. The other clauses (Review B, product, package, release) hold | **REFUTED** on the B19 clause; the remaining clauses ADOPT-AS-FACT |
| B18-5 | `B18:22` | Root `…/keyframes-v8-review-b18-source/outputs` | **TRUE** | exists, mtimes 06:34–06:55 | ADOPT-AS-FACT |
| B18-6 | `B18:24-25` | Exactly **four** regular `0644`, nlink-1 files, zero child dirs/symlinks/specials, **44,268,230** bytes | **TRUE** | 4 nodes, 0 non-regular, `-rw-r--r-- 1` ×4; 5,056,928 + 39,017,939 + 94,733 + 98,630 = **44,268,230** | ADOPT-AS-FACT |
| B18-7 | `B18:29` | `DERIVATION-RECEIPTS.json` 5,056,928 B / `76c8b96f…46a8f` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B18-8 | `B18:30` | `OPERATION-ORACLE-39.json` 39,017,939 B / `2e4a0799…c01c7` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B18-9 | `B18:31` | `SOURCE-READY.md` 94,733 B / `ee82e99d…6ca34` | **TRUE** | reproduced exactly (note: despite `.md`, the file is JSON — the source `strictParseJson`s it) | ADOPT-AS-FACT |
| B18-10 | `B18:32` | `preflight-b18-source.mjs` 98,630 B / `4b17b09c…7c54a` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B18-11 | `B18:36` | Canonical identity `11022dd3…cbd73` | **TRUE** | recomputed, exact | ADOPT-AS-FACT |
| B18-12 | `B18:42` | External **terminal machine receipt** sha `46c6f52f…0ef46e` | **UNPROVEN (artifact unlocatable)** | Content-hash sweep of every file <2 MB under `~/Documents/Codex/2026-08-02` and `2026-08-03` produced **no match**; `rg` finds the literal only inside *prose* (`keyframes-b19-source-only-owner-decision/OWNER-DECISION.md:44` and two value-side Codex records). The digest circulates; the artifact does not resolve | CARRY-TO-WAVE KF.W10 (terminalize: an external coordinate that no file reproduces cannot close a row) |
| B18-13 | `B18:43` | External **chronology** sha `688ad479…45ba3` | **UNPROVEN (artifact unlocatable)** | same sweep, no match; literal appears only in `CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json:467` | CARRY-TO-WAVE KF.W10 |
| B18-14 | `B18:44/46` | External **checksum packet** sha `540ffbe6…f44d5`, and it "replays **9/9** at its owning coordinate" | **UNPROVEN (artifact unlocatable)** | same sweep, no match; literal appears only at `…MATRIX…:468`. The 9/9 replay is therefore unreplayable by any third party — contrast B10-14, which I *did* replay 2/2 | CARRY-TO-WAVE KF.W10 |
| B18-15 | `B18:50` | Verdict `AMEND / SOURCE-RED` | **TRUE** | Earned — the falsifier beneath it is confirmed (B18-16) | ADOPT-AS-FACT |
| B18-16 | `B18:54-58` | First falsifier `ORDINAL_1_FINALIZER_REWRITES_UNAUTHORIZED_NODE_AND_TREE`: for ordinal 1 `same-width-wrong-value`, `finalizeMutatedOperationState` minifies authenticated NODE bytes and rewrites TREE although the oracle authorizes only `/pinRecord/candidateChecksum` | **TRUE — CONFIRMED, four independent links** | (1) `preflight-b18-source.mjs:834-848`: for any control not `tree-*`/`malformed-node-manifest`/`profile-authentication-wrong` it does `JSON.stringify(node)` → `state.…files["NODE-MANIFEST.json"]`, sets `tree.nodeManifestSha256` + `tree.payloadRecordsIdentitySha256`, and re-stringifies TREE. (2) `SOURCE-READY.md` `operationControls[0].id` = `same-width-wrong-value`; injector `:782` mutates only `record.candidateChecksum`. (3) `OPERATION-ORACLE-39.json` ordinal 1 row: `authorizedChangedPaths` = `['/pinRecord/candidateChecksum']`, `exactScalarDiffs` = same single path. (4) the payload manifests are pretty-printed — `NODE-MANIFEST.json` 86,899 B vs 67,513 B minified, `TREE-MANIFEST.json` 23,445 B vs 21,527 B — so the rewrite *provably* changes bytes, and `projectOracleState` projects `nodeRawSha256`/`nodeRawBase64`/`treeRawSha256`/`treeRawBase64` (`:696-706`). Extra diffs are unavoidable → `pass` false | **ADOPT-AS-FACT.** The B18 harness is genuinely RED and the reason is exact |
| B18-17 | `B18:58-59` | "The scalar-diff gate therefore rejects before control 27 or its own reason can be reached" | **TRUE** | `runOperationControls` (`:975-991`) returns on the first `!exactProjection.pass` inside the control loop; `runPrimaryProbes` and the `rows[26]` control-27 assertion both sit **after** the loop. Ordinal 1 fails ⇒ neither runs | ADOPT-AS-FACT |
| B18-18 | `B18:62` | `sameContainerExtra` is omitted from `projectOracleState` | **TRUE** | `:696-706` projects `descriptorKinds: Object.fromEntries(state.descriptors.map(r => [r.field, r.kind]))` — field and kind only. The `same-container-extra-drift` probe (`:961`) sets `sameContainerExtra = "UNAUTHORIZED"` on a descriptor and would be invisible to the projection; the probe therefore passes for the wrong reason | ADOPT-AS-FACT — **strengthened**: not merely omitted, it makes one of the five primary probes vacuous |
| B18-19 | `B18:63` | `projectFullState` and derivation helpers are dead | **TRUE (for `projectFullState`; "derivation helpers" unproven)** | `grep -n 'projectFullState\|FULL_STATE_KEYS'` over the whole 98,630-byte source returns **only** the definition (`:634`), its guard (`:635`) and the key list (`:622`) — zero call sites. "Derivation helpers" is unenumerated and not adjudicable as stated | ADOPT-AS-FACT for `projectFullState`; the vague half CARRY-TO-WAVE KF.W4 |
| B18-20 | `B18:64-66` | Receipt parsing validates only envelope/count, not each receipt's provenance and hashes | **TRUE — CONFIRMED** | `parseOracleEnvelope` (`:673-685`): the *oracle* packet gets a full per-row loop (`for(const row of packet.rows){…}` re-deriving `projectorIdentitySha256`, `fullAfterProjectionSha256`, scalar diffs, masked digest); the *receipts* get one line — `exactKeys(receipts,[…]) && schema && count!==18 && receipts.length!==18`. Nothing inside the 5 MB receipt file is ever re-derived | **ADOPT-AS-FACT** — this is the single most transferable defect in the corpus (see B10-27 / KF.W4) |
| B18-21 | `B18:67` | The corrected control-27 NODE-versus-TREE rule is unreachable | **TRUE** | `:990` `const control27 = rows[26]` executes only after all 39 controls pass and all 5 primary probes pass; ordinal 1 aborts (B18-17) | ADOPT-AS-FACT |
| B18-22 | `B18:69` | "The audit plan itself was not executed. Review B was not dispatched. No successor is authorized." | **TRUE / TRUE / FALSE** | Root holds no result artifact (4 files, all inputs); Review B absent everywhere; but B19/B20/B21 followed (X-7) | REFUTED on the successor clause; the first two ADOPT-AS-FACT |
| B18-23 | `B18:74-75` | "Keyframes formation remains **357/414 = 86.231884%**, with **57/414** explicit RED contracts" | **UNPROVEN as a fact about keyframes.js; STALE-AT-2026-08-03 within Codex's own corpus** | Arithmetic is exact (357/414 = 86.231884%; 414−357 = 57). But (a) a *prior* Codex falsifier ruled the same seal inadmissible — `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:223-224`: "maximum supported numerator is therefore **333/414** … The sealed 357/414 claim is not admissible"; (b) a *later* Codex record supersedes it — `KEYFRAMES-EIGHT-HOUR-CURRENT-SOURCE-DELTA-2026-08-03.md:56-58` demotes to **345 exact + 12 partial + 57 unresolved** and names a corrected ceiling of 393/15/6; (c) no live-tree quantity equals 414 (census: 153 src modules, 58 `.vue`, 131 test files, 1,051 cases) | **CARRY-TO-WAVE KF.W10**: if any 414-denominator row is ever cited, it must be cited as `345 exact / 12 partial / 57 unresolved @ 8281638c`, never as 357/414, and never as coverage of the HEAD tree |
| B18-24 | `B18:76` | Review A remains clean chronology; substantive Review B remains **0/1** | **UNPROVEN (external)** — corroborated | `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:70` and `:1328` independently record "v8 Review A CLEAN" and no Review B; the Review-A artifacts sit outside my read window | ADOPT-AS-FACT (as corroborated chronology) |
| B18-25 | `B18:77` | "B18 is the **latest** source-review packet and is terminal RED" | **FALSE as written; TRUE in the qualified form its own successors use** | B19 (20:57), B20 (21:41), B21 (22:28) all postdate B18's root (06:55) and this intake (19:16). B20:48 and B21:45 restate it correctly as "**latest substantive** source evidence" — which holds, since B19/B20/B21 produced no substantive artifact | **REFUTED** as written; the qualified form ADOPTED at B20-12/B21-16 |
| B18-26 | `B18:78` | Real iOS Simulator Mobile Safari remains **0/73,568** chronology-only cells | **TRUE as arithmetic; UNPROVEN as coverage (manufactured denominator)** | 152 surfaces × 11 states × 4 origins × 11 profiles = **73,568** exactly; and the handoff's split 46,816 + 26,752 = 73,568 exactly (`…HANDOFF-2026-07-31.md:465-471`). It is a Kronecker self-cross-product with no product consumer — the exact class the master ledger flags ("seven of nine sweeping RED fractions are self-cross-products") | **CARRY-TO-WAVE KF.W9** (Safari visual audit): the *numerator* is honest (zero real-Safari execution — the census agrees Safari mobile+desktop is unaudited). The denominator must be replaced by KF.W9's own scoped surface list, not inherited |
| B18-27 | `B18:79-80` | The complete Keyframes input slot remains **0/1**; constellation slots remain **0/5** | **UNPROVEN (external); internally inconsistent** | `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json:1060` = `"immutableOwnerInputs": "0/5"` (agrees); but `KEYFRAMES-EIGHT-HOUR-CURRENT-SOURCE-DELTA-2026-08-03.md:30-31` says "the four native slots remain `0/4`" — the denominator moved 5→4 within a day with no reconciliation | CARRY-TO-WAVE KF.W10 (the slot ledger is Codex-internal bookkeeping; it must not enter a keyframes wave spec until 4-vs-5 is settled or the ledger is dropped) |
| B18-28 | `B18:81-82` | Product, Browser, Safari, package, release and constellation credit remain zero | **TRUE** | X-6 | ADOPT-AS-FACT |
| B18-29 | `B18:86-88` | This session only censused, hashed and read the frozen root; it ran neither the B18 source program nor Review B and modified no Keyframes, external or failed-root byte | **UNPROVEN (unfalsifiable)** — **corroborated** | Root contains four *input* files and no output; all four mtimes (06:34–06:55) precede the intake (19:16); all four digests still reproduce | ADOPT-AS-FACT (as corroborated chronology) |

---

## §4 — B19 (terminal mechanics RED)

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| B19-1 | `B19:5/7` | Verdict `TERMINAL_MECHANICS_RED / NO_RETRY / NO_REVIEW_B`; authority and credit `NONE / 0` | **TRUE** | X-6; and the RED itself is confirmed at B19-9 | ADOPT-AS-FACT |
| B19-2 | `B19:13-16` | Root holds exactly **one** regular mode-`0644`, nlink-1 file, zero dirs/symlinks/specials, **7,362** bytes | **TRUE** | 1 node, `-rw-r--r-- 1 7362` | ADOPT-AS-FACT |
| B19-3 | `B19:20` | `derive-b19-receipts.rb` sha `3ada36ea…323c7` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B19-4 | `B19:22-24` | Canonical tree-record identity independently reproduced from `relativePath\|kind\|mode\|nlink\|bytes\|sha256\n` as `d5fe8c15…16b1d1` | **TRUE** | Recomputed; the solving tokens are `kind = "regular-file"`, `mode = "0644"` (§0) | ADOPT-AS-FACT |
| B19-5 | `B19:25-26` | No receipt, declaration, verifier, `SOURCE-READY`, checksum, review or other artifact exists | **TRUE** | Root census = 1 file | ADOPT-AS-FACT |
| B19-6 | `B19:28-30` | Source-only owner decision exact at `029ff5e9…30349`, **6,495** bytes, mode `0644`, nlink 1 | **TRUE** | `keyframes-b19-source-only-owner-decision/outputs/OWNER-DECISION.md` — `-rw-r--r-- 1 6495`, digest reproduced exactly | ADOPT-AS-FACT |
| B19-7 | `B19:34-35` | The sole substantive owner command was `ruby derive-b19-receipts.rb`, exiting before any secondary artifact creation | **TRUE (consistent)** | No secondary artifact exists in the root; the failure site (B19-9) precedes every write | ADOPT-AS-FACT |
| B19-8 | `B19:35-38` | Raw in-memory error SHA `a6ad8e55…585b3`; "that stream is not a packet file and receives no independent-byte claim" | **UNPROVEN — and self-declared as such** | Nothing on disk carries that digest; Codex explicitly disclaims byte-authority for it. Correct epistemic hygiene, zero evidentiary weight | ADOPT-AS-FACT (as an explicitly non-load-bearing chronology note) |
| B19-9 | `B19:39-45` | Host is Ruby **2.6.10**; source **line 57** calls `Array#filter_map`, unavailable on that runtime → `undefined method 'filter_map'` | **TRUE — CONFIRMED, reproduced live** | `ruby -v` = `ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin25]`; `grep -n filter_map` = **57** only; `ruby -e '[1,2].filter_map{…}'` → `NoMethodError: undefined method 'filter_map' for [1, 2]:Array` (`filter_map` is 2.7+). Line 57 sits in `exact_scalar_diffs`, on the main path | **ADOPT-AS-FACT** |
| B19-10 | `B19:40-41` | All three source pins match; the B18 schema/count is **18/18** | **TRUE in part** | The 18/18 half is corroborated where I could read it: `preflight-b18-source.mjs:676` requires `receipts.count === 18 && receipts.receipts.length === 18`. The three pins themselves are UNPROVEN (TCC) | ADOPT-AS-FACT for 18/18; the pin half CARRY-TO-WAVE KF.W0 |
| B19-11 | `B19:41-42` | The first receipt's seven archaeology comparisons rederive true | **UNPROVEN (TCC)** | `derive-b19-receipts.rb` became unreadable before the archaeology block was captured | CARRY-TO-WAVE KF.W0 |
| B19-12 | `B19:46-48` | This is a terminal mechanics RED in the B19 coordinate, **not** a finding about the frozen Keyframes v8 payload | **TRUE** | The failure is a host-runtime incompatibility in the harness; no payload byte is implicated | **ADOPT-AS-FACT** — and it is the correct epistemic call, which is why B19 earns credit as *chronology* while earning none as *evidence* |
| B19-13 | `B19:48-50` | No compatibility patch, cleanup, rerun, hostile or substantive Review B is authorized; the root must remain unchanged | **TRUE** | Root still holds exactly the one file, mtime 20:57, digest unchanged | ADOPT-AS-FACT |
| B19-14 | `B19:54-59` | Preserved boundary: 357/414 with 57 RED; real Apple execution 0/73,568; Review B 0/1; slot null; product/Browser/Safari/package/release/rebind/admission/authority/credit zero | **UNPROVEN / STALE** (verbatim restatement of B18-23/26/27) | Same receipts as B18-23, B18-26, B18-27 — the boundary block is copied forward unchanged across B18→B19→B20, so the 08-03 supersession invalidates all three copies at once | CARRY-TO-WAVE KF.W10 (single disposition covers all three restatements) |
| B19-15 | `B19:61-63` | B19 does not supersede B18 as scientific source evidence; it supersedes only the earlier "authorized and absent" mechanics chronology, with one preserved terminal failed-root receipt | **TRUE** | Consistent with B19-12 and with the root census (no substantive artifact) | ADOPT-AS-FACT |
| B19-16 | `B19:63-64` | Any successor requires a fresh explicit owner ruling and a non-overlapping root | **TRUE — and honored** | X-8: B20 and B21 each have their own owner decision (digests reproduced) and disjoint roots | ADOPT-AS-FACT |

---

## §5 — B20 (terminal mechanics RED)

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| B20-1 | `B20:5/7` | Verdict `TERMINAL_MECHANICS_RED / NO_RETRY / NO_REVIEW_B`; `NONE / 0` | **TRUE** | X-6; RED confirmed at B20-7 | ADOPT-AS-FACT |
| B20-2 | `B20:15-17` | **Two** independent read-only census/hash snapshots found exactly one regular `0644`, nlink-1 file, zero dirs/symlinks/specials, **19,372** bytes | **TRUE on the census; UNPROVEN on "two independent snapshots"** | My own census reproduces the single-file/19,372-byte state exactly; the claim of two prior independent passes is not evidenced by any artifact | ADOPT-AS-FACT (census); the "two snapshots" rider is non-load-bearing |
| B20-3 | `B20:21` | `derive-b20-receipts.rb` sha `cbb26614…28958` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B20-4 | `B20:23-26` | One-record identity `1c32244a…555050` reproduces from the declared serialization | **TRUE** | recomputed, exact | ADOPT-AS-FACT |
| B20-5 | `B20:27` | Owner decision `7826ac45…38a99` | **TRUE** | `keyframes-b20-source-only-owner-decision/outputs/OWNER-DECISION.md`, 6,805 B, digest exact | ADOPT-AS-FACT |
| B20-6 | `B20:28` | All **five** source-pinned inputs rehash exactly | **UNPROVEN (TCC)** | B20's pin block was not captured before the grant lapsed. The parallel claim in B21 was verified for 2 of 5 (B21-7), which raises but does not settle confidence | CARRY-TO-WAVE KF.W0 |
| B20-7 | `B20:33-37` | The pre-write runtime gate JSON-encodes non-ASCII `B20-π`, `Base64.strict_encode64`s it, decodes through Ruby 2.6's binary path, and at **line 241** compares `ASCII-8BIT` decoded bytes to the original UTF-8 string; the incompatible encodings make equality false, so the gate raises `runtime-base64` | **TRUE — CONFIRMED, reproduced live** | `:241` is literally `raise "runtime-base64" unless Base64.strict_decode64(encoded) == json`; `:237` builds `{"utf8"=>"B20-π",…}`. Live on this host: `json.encoding = UTF-8`, `ascii_only? = false`, `decoded.encoding = ASCII-8BIT`, `decoded == json` → **false**, `decoded.bytes == json.bytes` → **true**. The bytes are identical; only the encoding tag differs — Ruby's comparability rule makes the gate reject its own correct round-trip | **ADOPT-AS-FACT** |
| B20-8 | `B20:39` | This occurs before the first possible write at **line 283** | **TRUE** | `:283` = `File.binwrite(CAPABILITY_PATH, …)` — the first write in the file, 42 lines after the raise | ADOPT-AS-FACT |
| B20-9 | `B20:41-45` | Consequently `RUNTIME-CAPABILITY.json`, `B20-DERIVATION-RECEIPTS.json` and every `SOURCE-READY`, verifier, result, checksum, terminal-verdict, hostile and Review B artifact are absent | **TRUE** | Root census = exactly 1 file (the source) | ADOPT-AS-FACT |
| B20-10 | `B20:45-46` | The later graph, receipt and dependent-failure logic is unreachable and receives no scientific credit | **TRUE** | Unreachable by construction given B20-7/B20-8 | ADOPT-AS-FACT |
| B20-11 | `B20:47-48` | This is terminal failed-root **mechanics** evidence, not a finding about the frozen Keyframes v8 payload | **TRUE** | Same reasoning as B19-12 | ADOPT-AS-FACT |
| B20-12 | `B20:48-49` | "B18 remains the **latest substantive** terminal source evidence" | **TRUE** | The qualified form is correct: B19 and B20 produced zero substantive artifacts. This is the phrasing B18-25 should have used | ADOPT-AS-FACT |
| B20-13 | `B20:49-50` | No same-root repair, rerun, cleanup, hostile, Review B or successor is inferred or authorized | **TRUE (same-root); FALSE by implication (successor)** | Same-root: honored — root unchanged. Successor: B21 followed 47 minutes later, on a disjoint root with its own owner decision, which is what B19-16 actually licenses | ADOPT-AS-FACT (same-root clause); the successor clause is superseded by X-8's finding, not by a defect |
| B20-14 | `B20:53-59` | Preserved boundary block (357/414 / 0/73,568 / Review B 0/1 / slot null / zero credit) | **UNPROVEN / STALE** | Verbatim third copy; see B19-14 and B18-23/26/27 | CARRY-TO-WAVE KF.W10 |

---

## §6 — B21 (terminal source RED) — the only packet that reaches the payload

B21 is the one root whose failure is **not** a host-runtime accident: its gate closed, it wrote its
receipt, and it then died on a real disagreement with the authenticated v8 TREE manifest. I verified
every step, including the manifest's key set.

| id | source file:line | claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| B21-1 | `B21:5/7` | Verdict `TERMINAL_SOURCE_RED / FIRST_FAILURE_FREEZE / NO_B22`; `NONE / 0` | **TRUE** | X-6; RED confirmed at B21-9..12. `NO_B22` holds so far: no `keyframes-v8-review-b22*` root matched across `~/Documents/Codex/*/` at probe time (bounded — the `2026-08-03` dir became unreadable before I could enumerate it) | ADOPT-AS-FACT, with the bounded caveat |
| B21-2 | `B21:15-16` | Exactly **two** regular `0644`, nlink-1 files, no dirs/links/specials, **22,991** bytes | **TRUE** | 2 nodes, `-rw-r--r-- 1` ×2; 21,229 + 1,762 = **22,991** | ADOPT-AS-FACT |
| B21-3 | `B21:20` | `derive-b21-receipts.rb` 21,229 B / `20827e45…44da` | **TRUE** | reproduced exactly; the same digest also appears self-recorded inside `RUNTIME-CAPABILITY.json.generator.sha256` — a genuine self-consistency check that passes | ADOPT-AS-FACT |
| B21-4 | `B21:21` | `RUNTIME-CAPABILITY.json` 1,762 B / `e7b7ca98…89fe6` | **TRUE** | reproduced exactly | ADOPT-AS-FACT |
| B21-5 | `B21:23-25` | Sorted `basename\|regular-file\|0644\|nlink\|bytes\|sha256\n` records reproduce `184ddd0c…453fdf` | **TRUE** | recomputed, exact — and this row is what let me solve the B19/B20 schema (§0) | ADOPT-AS-FACT |
| B21-6 | `B21:26-27` | Owner decision `b6942f4a…3ef0c` | **TRUE** | `keyframes-b21-source-only-owner-decision/outputs/OWNER-DECISION.md`, 7,421 B, digest exact | ADOPT-AS-FACT |
| B21-7 | `B21:28` | All **five** input pins rehash exactly | **TRUE for 2 of 5; UNPROVEN for the remainder** | `derive-b21-receipts.rb:28` pins TREE = `babd173e…548aa` — live file hashes **exactly**; `:29` pins SNAPSHOT = `faa56289…f48da` — hashes **exactly**. The other three pin lines (`:24-27`) were not captured before TCC lapsed | ADOPT-AS-FACT for the two verified; the rest CARRY-TO-WAVE KF.W0 |
| B21-8 | `B21:33-34` | The Ruby 2.6/UTF-8/Base64 **zero-write capability gate closes** and writes `RUNTIME-CAPABILITY.json` first, at source **line 304** | **TRUE** | `:304` = `File.binwrite(CAPABILITY, "#{JSON.pretty_generate(capability)}\n")` — first write in the file. The receipt itself records `forceEncodingOnDuplicateOnly: true`, `byteEquality: true`, `forbiddenMethods: ["filter_map"]` — i.e. **B21's gate is the explicit cure for B19's and B20's failures**, encoded as capability assertions | **ADOPT-AS-FACT** — the mechanics REDs were genuinely learned from; this is the corpus's one demonstrated improvement loop |
| B21-9 | `B21:34-36` | The source then projects the authenticated v8 TREE manifest and at **line 313** requires exactly **five** keys | **TRUE** | `:32-33` `TREE_KEYS = %w[expectedClosedPaths nodeManifestSha256 outerTrustDomainSha256 payloadRecordsIdentitySha256 schema]` — exactly 5; `:313` = `raise "baseline.tree-envelope" unless exact_keys?(pristine.fetch("tree"), TREE_KEYS)` | ADOPT-AS-FACT |
| B21-10 | `B21:36` | Authentic TREE SHA `babd173e…` has **eight** keys | **TRUE** | Live: `TREE-MANIFEST.json` hashes to `babd173e8bdcb9d769d07cba109720453c2c5072fa6d53e307006dcdbff548aa` and parses to **8** top-level keys | ADOPT-AS-FACT |
| B21-11 | `B21:36-37` | The source omits `checksumLaw`, `expectedClosedNodeCount` and `sealNodes` | **TRUE — exactly those three** | Manifest keys = `[checksumLaw, expectedClosedNodeCount, expectedClosedPaths, nodeManifestSha256, outerTrustDomainSha256, payloadRecordsIdentitySha256, schema, sealNodes]`; set-minus `TREE_KEYS` = precisely the three named. (Cross-check: `NODE_KEYS` has 7 and the NODE manifest has 7 — so `:312` passes and `:313` is the first failure, exactly as claimed) | **ADOPT-AS-FACT** |
| B21-12 | `B21:37-38` | It deterministically raises `baseline.tree-envelope` before derivation output could be written at **line 405** | **TRUE** | `:405` = `File.binwrite(DERIVATIONS, …)`, 92 lines after the raise; the raise is unconditional given B21-10/11 | ADOPT-AS-FACT |
| B21-13 | `B21:40-41` | The capability receipt reports `writesBeforeGate: 0`, `authority: NONE`, `credit: 0` | **TRUE** | All three literals present in `RUNTIME-CAPABILITY.json`, alongside `rootChildrenBeforeFirstWrite: ["derive-b21-receipts.rb"]` — which independently corroborates the zero-write claim | ADOPT-AS-FACT |
| B21-14 | `B21:41-42` | Derivation receipts, `SOURCE-READY`, verifier/results, checksum, terminal verdict, hostiles and Review B are absent | **TRUE** | Root census = exactly 2 files | ADOPT-AS-FACT |
| B21-15 | `B21:42-43` | The owner-reported raw stderr SHA is not persisted and remains chronology only | **TRUE (as a disclaimer)** | No such artifact in the root; explicitly disclaimed, like B19-8 | ADOPT-AS-FACT (non-load-bearing) |
| B21-16 | `B21:45` | B18 remains the latest **substantive** Keyframes source evidence | **TRUE** | Same qualified form as B20-12; correct | ADOPT-AS-FACT |
| B21-17 | `B21:45-46` | B21 is a later mechanics/source falsifier, **not** an accepted packet or a v8 product finding | **TRUE — and materially so** | B21's failure is a real disagreement between the harness's envelope law (5 keys) and the authenticated payload (8 keys). That is a *contract* defect, not a runtime accident — the most substantive thing in B19–B21 — yet it still says nothing about keyframes.js product code | **ADOPT-AS-FACT**; the substantive core CARRIES to KF.W4 as a gate-design rule (an envelope assertion must be derived from the pinned artifact, never hand-listed beside it) |
| B21-18 | `B21:46-48` | No same-root repair, rerun, cleanup, hostile, Review B, **B22**, product, Browser, Safari, package, release, admission, authority or credit follows | **OWNER-GATED** | Unlike B10-26/B18-4 this has not been falsified (no B22 found, bounded probe) — but it is a forward-looking prohibition on a corpus whose prohibitions have a 2-for-3 violation record (X-7). Whether the B-lineage resumes is not value.js's to decide | **OWNER-GATED**: ruling owed — *does the Codex Keyframes B-lineage continue at all, and if so must it re-anchor to `origin/master` (`81a56990`) first?* Value.js cannot answer; §B-12 is already the owner's hand |

---

## §7 — What actually enters the formation

**ADOPTED (substrate).** Six frozen roots, censused and hash-exact, with four canonical identity
digests recomputed from scratch. Three technical findings confirmed to the line: B18's ordinal-1
finalizer defect (four independent links), B18's receipt-validation gap, B21's TREE-envelope
disagreement (5 declared keys vs 8 authentic). Two runtime falsifiers reproduced live. Two
cross-corpus agreements with the census (184 demo members, 58 `.vue`).

**CARRIED.**

| target | rows |
|---|---|
| **KF.W0 · Substrate Settle** | X-1 (the B-lineage is pinned to the stale `8281638c` checkout — re-anchor or declare stale-by-substrate), B10-9, B19-10/11, B20-6, B21-7 (pin/declaration re-reads that need a TCC grant) |
| **KF.W4 · K-Quartet Hygiene (born-RED gate authoring)** | B10-17/18/19/20/22/23 + B10-27 (the four gate-design rules), B18-19 (dead projector), B21-17 (envelope-from-artifact rule). **The transferable law:** a gate may not re-derive its own oracle; every named input must be re-read and re-hashed at use, never allowlisted; an envelope assertion must be derived from the pinned artifact |
| **KF.W5 · D/L/C Tri-Fold Library Audit** | X-4 (reconcile the 80 / 139 / 153 / "159" module bases), B10-21 (control-coverage ratio as the shape of per-component coverage) |
| **KF.W9 · Safari Visual Audit** | B18-26 — inherit the *numerator* (zero real-Safari execution, which the census independently agrees with) and **reject the denominator**; KF.W9 scopes its own surface list |
| **KF.W10 · Fold Discharge & Close** | B18-12/13/14 (three external coordinates no artifact reproduces), B18-23 + B19-14 + B20-14 (the 357/414 boundary block, superseded 08-03 by 345/12/57), B18-27 (slot denominator 5-vs-4) |

**REFUTED.** B10-26 and B18-4/B18-22 (the "no successor follows" clauses — falsified by their own
successors within hours, X-7) and B18-25 ("latest source-review packet" — falsified by B19/B20/B21;
the corpus's own qualified phrasing survives).

**OWNER-GATED.** B21-18 — one ruling owed: *does the Codex Keyframes B-lineage continue, and must
any continuation re-anchor to `origin/master` `81a56990` before its denominators may be cited?*

**Tally (112 claims; each row carries exactly one primary verdict and one primary disposition —
four rows with split verdicts, B10-24 / B18-19 / B19-10 / B21-7, are counted at their primary
disposition ADOPT and appear again in the CARRIED table for their unproven remainder).**

| block | claims | TRUE | FALSE | UNPROVEN | OWNER-GATED | ADOPT | CARRY | REFUTED | O-G |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| X (cross-reference) | 8 | 6 | 1 | 1 | 0 | 5 | 2 | 1 | 0 |
| B10 | 27 | 17 | 1 | 9 | 0 | 17 | 9 | 1 | 0 |
| B18 | 29 | 18 | 3 | 8 | 0 | 20 | 6 | 3 | 0 |
| B19 | 16 | 13 | 0 | 3 | 0 | 14 | 2 | 0 | 0 |
| B20 | 14 | 12 | 0 | 2 | 0 | 12 | 2 | 0 | 0 |
| B21 | 18 | 17 | 0 | 0 | 1 | 17 | 0 | 0 | 1 |
| **total** | **112** | **83** | **5** | **23** | **1** | **85** | **21** | **5** | **1** |

Of the 23 UNPROVEN, **17 are UNPROVEN (TCC)** — the artifact exists and is hash-proven, only its
interior was unreadable after the read grant lapsed mid-session. Three are genuinely unlocatable
(B18-12/13/14, the external terminal coordinates). Three are corpus-internal bookkeeping
(B18-23/24/27).

**The one sentence.** The B10–B21 corpus is byte-honest and claim-inflated in exactly the pattern the
master ledger found elsewhere: every digest reproduces, every technical falsifier I could reach is
real and sharper than stated — and all of it is a reviewer-harness audit pinned to a keyframes.js
checkout 41 commits stale, so none of it is product coverage and none of its denominators may be
carried forward as measured.
