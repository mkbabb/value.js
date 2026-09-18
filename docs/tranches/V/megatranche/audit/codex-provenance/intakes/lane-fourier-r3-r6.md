claude-opus-5[1m] (served model id)

# LANE — Codex provenance intake, per-claim adjudication: FOURIER R3 · R4 · R5 · R6

**Law.** M-21: Codex claims are AUDIT SUBJECTS — adjudicated per-claim, never auto-void, never
auto-adopted. The four intake files are CODEX-AUTHORED CANONICAL and were **not modified**; every
correction lives here. Read-only everywhere else. The only write this lane made is this file.

**Sources adjudicated** (all under `docs/tranches/V/megatranche/coordination/`):

| short | file | lines |
|---|---|---:|
| `R3` | `FOURIER-R3-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md` | 114 |
| `R4` | `FOURIER-R4-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` | 100 |
| `R5` | `FOURIER-R5-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` | 74 |
| `R6` | `FOURIER-R6-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` | 75 |

**Cross-reference:** `docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md` + its three
lanes. **Census §6.7 ("Codex R3–R6 residue formally not inherited … carry zero credit") is UNDER
CORRECTION and is replaced by the rows below.**

---

## §0 — THE HEADLINE FINDING (read this before the rows)

The Codex R3–R6 coordinates are dead **as authority**. They are **not** dead **as measurement**.

I re-derived the load-bearing claims against the live trees. **Every reproducible archaeology figure
reproduced exactly** — not approximately, exactly:

- **45 Python API operations** — Codex R3/R4/R5/R6 all say 45. Live `fourier-analysis`:
  `grep -rc "^@.*\.\(get\|post\|put\|patch\|delete\)(" api/` → **45** across 8 files
  (`main.py` 1, `sessions.py` 4, `contours.py` 4, `equations.py` 2, `admin.py` 13, `images.py` 7,
  `visualizations.py` 13, `gallery.py` 1).
- **66 workflows** — live `find web/src -name "*.vue" | wc -l` → **66**. (Census §3a independently
  says "66 SFC"; live `.ts` = 65, census says 65. Triple agreement.)
- **9 routes** — live `web/src/router/index.ts` carries exactly **9 route records**.
- **35 Tooltip callsites over 9 consumers** — summing `<Tooltip` in R3's nine named consumer files
  from the live tree: 2+2+2+4+2+6+6+10+1 = **35**. Exact.
- **2 Teleports** — live `grep -rn "<Teleport" web/src` → exactly two, at
  `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`. R3 names both at those exact lines.
- **3 native `li v-for` rows in `PaperSidebar.vue` at lines 65, 87, 105** (R6's gate claim) — live
  `grep -n "v-for" web/src/components/paper/PaperSidebar.vue` → **65, 87, 105**, with the exact
  expressions R6 records.
- **All four packet-root censuses** (7/339/442/484 files; 6,563,070 / 6,948,329 / 7,537,703 /
  7,846,757 bytes) reproduced byte-exact by independent `find`/`stat`.
- **Every published SHA-256 I could reach reproduced exactly** — all 7 R3 file pins, all 3 R3
  hostile-A files, 5 of 6 R4 terminal artifacts (the 6th is a filename error, R4-5 below), R6's C31
  plan/raw/receipt triple, and the `/tmp` residue.

**And the substrate has not moved.** fourier HEAD is `cd26c6533adc32dfe1453d74117d3cb73b89ea16`,
tree `9a66411d16fe4ec564d67367ca55e5f97da2a6d4` — *today*, identical to what R3 and R4 pinned. The
Codex worktree (`/Users/mkbabb/.codex/worktrees/d0be/fourier-analysis`, still registered, detached at
the same commit) has `web/src` **byte-identical** to the live tree (`diff -rq` → empty), and both
carry the same 24 in-scope dirty paths. **The audited scope is the exact tree F.W0 will open on.**
Nothing here is STALE-AT-HEAD.

So the correct disposition is neither "zero credit" nor "adopt": it is **the measurements enter the
substrate; the authority does not.** Six of these claims are load-bearing engineering findings the
formation would otherwise have to rediscover from scratch — most sharply **R5-7** (the deriver is
blind to native template loops) and **R6-8** (the API operation leaf is not client-independent).

---

## §1 — R3 · `FOURIER-R3-STATIC-HOSTILE-OWNER-INTAKE-2026-08-02.md` (20 claims)

*(R3-7 is split into the parent archaeology roll-up plus three children — R3-7a/b/c — because three
of its figures are separately actionable and route to different waves.)*

| id | source file:line | the claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| R3-1 | R3:3-7 | "Status: `TERMINAL_AMEND / SOURCE_RED`; Authority: none; Product, API, Browser, Safari, Simulator, Docker, package, release, rebind, P29, count, admission, and constellation credit: 0" | OWNER-GATED | A Codex-era governance status, dead by M-24. Asserts no live-tree fact; the *findings* it gates are adjudicated at R3-3 and R3-10..R3-15, all TRUE. | **OWNER-GATED** — ruling owed: does the megatranche re-root the fourier source coordinate at F.W0, or leave it frozen? This row is what replaces census §6.7. |
| R3-2 | R3:10-13 | R3 is terminal on its first independently demonstrated material falsifier `R3-HA-001 / AUTHENTICATED_BYTES_DERIVATION_DISCONNECTED` | TRUE | `fourier-r3-static-hostile-a/outputs/FINDINGS.json` → `firstMaterialFalsifier.id = "R3-HA-001"`, `.code = "AUTHENTICATED_BYTES_DERIVATION_DISCONNECTED"`, `.severity = "CRITICAL"`, evidence `AUDITOR.mjs:81-133,141-150,174-197`. Exact. | **ADOPT-AS-FACT** |
| R3-3 | R3:15-21 | The auditor "parses the four authored registry files, validates selected counts/shapes, and separately rehashes repository members. It never re-derives the claimed 545 module edges, 66 workflows, 519 template callsites, 1,376 subject records, or 45 API operations from the authenticated bytes. A coherent forged registry can therefore remain detached from the source truth it claims to summarize." | TRUE | Read `AUDITOR.mjs` (17,672 B) whole: no Vue/Python parser, no derivation path. `CONTROL_DEFINITIONS` at :200+ mutate the *loaded bundle* — `b.source.sourceSnapshot.memberCount--`, `b.modules.edges.pop()`, `b.instances.summary.physicalTemplateComponentCallsites = 518` — never file bytes. The five products exist only as authored JSON fields. | **ADOPT-AS-FACT** — the evidence standard for F.W4/F.W5: *a registry audit that re-hashes bytes but never re-derives products proves the bytes unchanged, not the summary true.* |
| R3-4 | R3:23-25 | "This coordinate is frozen. Do not repair, rerun, reseal, admit, or begin hostile B over R3. Any later source successor requires a fresh explicit owner ruling and a non-overlapping absent root." | OWNER-GATED | Pure governance directive; no verifiable content. Superseded in form by M-24 (Codex abrogated) but the reopen-condition is an owner's to set. | **OWNER-GATED** — same ruling as R3-1. |
| R3-5 | R3:29-42 | Frozen author packet at `…/fourier-mobile-safari-instance-source-plan-r3/outputs`: seven regular mode-`0644` `nlink1` files; zero child dirs/symlinks/special nodes; **6,563,070 bytes**; checksum file `0d44e81f…`, replay 6/6 | TRUE | Independent `find`/`stat`: 7 regular files, 0 child dirs, 0 non-file non-dir nodes, **6,563,070 bytes** — exact. `shasum -a 256 checksums.sha256` → `0d44e81f479af061596f7184c9a833e8ad24ff5d7b1349587ea4d612563c09df` — exact. | **ADOPT-AS-FACT** |
| R3-6 | R3:44-54 | The seven exact file pins (bytes + SHA-256): `SOURCE-PINS-AND-CENSUS.json` 103,712 / `e146c201…`; `MODULE-RESOLUTION.json` 299,549 / `0ab04956…`; `INSTANCE-STATE-REGISTRY.json` 5,882,399 / `5a8df9cf…`; `API-VISIBLE-STATE-REGISTRY.json` 249,476 / `92e36a8d…`; `AUDITOR.mjs` 17,672 / `53bdfe1a…`; `REPORT.md` 9,732 / `1ce82f3a…`; `checksums.sha256` 530 / `0d44e81f…` | TRUE | `stat -f %z` + `shasum -a 256` over all seven: **every byte count and every SHA-256 reproduced exactly.** | **ADOPT-AS-FACT** — the R3 packet is authenticated; it may be cited by hash. |
| R3-7 | R3:56-60 | Zero-credit archaeology: "189 source members, 545 declared edges, 64/66 declared reachable workflows, two exact unmounted workflows, 35 Tooltip callsites over nine consumers, 45 API operations over 41 paths, 36 client edges, nine gaps, three absent-or-prune subjects, and OpenAPI security description `0/45`. Its mounted-instance denominator remains OPEN." | TRUE | Packet re-read: `sourceSnapshot.memberCount` 189 · `edgeCount` 545 · `summary.sourceWorkflowTotal` 66 / `Reachable` 64 / `Unmounted` 2 · `tooltipResolution.physicalCallsiteCount` 35, `consumerFileCount` 9 · `operationCount` 45, `summary.paths` 41 · `currentClientEdges` 36 · `clientGapOperations` 9 · `requiredAbsentSurfaceCount` 3 · `openApiSecurityDescriptions` 0 / `securityDescriptionsRequired` 45 · `exactMountedInstanceDenominator: null`, `denominator.status: "OPEN"` — all exact. **Live-tree re-derivation:** 45 API ops confirmed (§0); 35 Tooltip callsites over the 9 named consumers confirmed by summation. | **ADOPT-AS-FACT** — and see the three CARRY children R3-7a/b/c below. |
| R3-7a | R3:58 (child) | "35 Tooltip callsites over nine consumers" | TRUE | Live sum over R3's nine named files: FunctionInput 2, PaperSidebar 2, CoefficientsSpectrum 2, AnimationControls 4, BasisSelector 2, CanvasControlsDock 6, ContourSettings 6, EditorControlsDock 10, VisualizationView 1 = **35**. (`App.vue` +1 and the local adapter `ui/tooltip/Tooltip.vue` +3 sit outside R3's consumer set.) | **CARRY-TO-WAVE → F.W3** — this is the migration budget for the `ui/tooltip` thin-adapter disposition (census §3a keeps 3 local adapters): 35 callsites / 9 consumers, barrel `web/src/components/ui/tooltip/index.ts` → `@mkbabb/glass-ui/tooltip`. |
| R3-7b | R3:59-60 (child) | "OpenAPI security description `0/45`" — `securityGate: RED_0_OF_45` | TRUE | `API-VISIBLE-STATE-REGISTRY.json.summary.openApiSecurityDescriptions = 0`, `securityDescriptionsRequired = 45`; `stop.securityGate = "RED_0_OF_45"`. Denominator 45 independently confirmed live (§0). | **CARRY-TO-WAVE → F.W5** — a real, un-refuted API-contract defect: zero of 45 fourier operations declare OpenAPI security. The shared-provenance contract (ADMISSION KEYSTONE) cannot specify auth parity over a surface that documents none. |
| R3-7c | R3:59 (child) | "36 client edges, nine gaps" (of 45 operations) | TRUE | `summary.currentClientEdges = 36`, `clientGapOperations = 9`. Corroborated by R4/R5/R6's independent deriver: `clients` 20, `clientGaps` 2 under a different (function-level, not edge-level) denominator. | **CARRY-TO-WAVE → F.W5** — quantifies census risk #9's "inv-15 consumer gap" with a number. Cross-check: fourier's own `docs/tranches/M/M.md §7` books "inv-15 consumer gap (7 endpoints, 0 callers)" for M.W10 — three independent counts of the same hole. |
| R3-8 | R3:63-83 | Frozen hostile A packet: exactly three regular `0644` `nlink1` files; zero child dirs/symlinks/special; **17,083 bytes**; `REVIEW.md` `390cec47…` 8,663 B; `FINDINGS.json` `379491d6…` 8,264 B; `checksums.sha256` `346ff8c4…`; replay 2/2 | TRUE | Independent `stat`+`shasum`: 3 files, sizes 8,663 + 8,264 + 156 = **17,083** exact; all three SHA-256 reproduced exactly. (Line counts 172/153 not re-checked — bytes+SHA are strictly stronger.) | **ADOPT-AS-FACT** |
| R3-9 | R3:85-86 | "No authored auditor, product module, API, service, Browser, Safari, Simulator, Docker, package, or parser code was imported or executed." | UNPROVEN | An unfalsifiable negative from a frozen artifact. *Consistent with* the packet's shape — it contains only `REVIEW.md`, `FINDINGS.json`, `checksums.sha256`; no runner, no execution receipts — but absence of a receipt is not proof of non-execution. | **CARRY-TO-WAVE → F.W0** — record as an unverifiable provenance assertion; do not cite it as a method guarantee. |
| R3-10 | R3:96-97 (secondary 1) | "module resolution declares six dynamic families while the instance registry carries only four" | TRUE | `MODULE-RESOLUTION.json.dynamicFamilies` len **6**; `INSTANCE-STATE-REGISTRY.json.dynamicFamilies` len **4** (AppHeader:117, AppHeader:130, MobileFloatingToc:157, FourierMorphDemo:72). The two dropped, per `FINDINGS.json` R3-HA-003: `CoefficientsSpectrum.vue:132` and `EditorControlsDock.vue:144`. **Both confirmed in the live tree** — `:132` = `<component :is="expanded ? ChevronUp : ChevronDown" …>`, `:144` = `<component :is="showGhost ? Eye : EyeOff" :size="20" />`. | **CARRY-TO-WAVE → F.W4** — six live dynamic-`:is` families are an exhaustiveness gap in any per-component audit; two of them were silently lost between two registries built from the same tree. Budget all six sites. |
| R3-11 | R3:98-99 (secondary 2) | "the module registry has two distinct Teleports, while the instance registry duplicates `PaperSearchModal` and omits `FullscreenViewer`" | TRUE | Re-derived from the packet: `INSTANCE-STATE-REGISTRY.json.teleports` has 2 array entries that are **the same record twice** (identical `callsiteId F.CS3.d06624ce…`, `PaperSearchModal.vue:41`); `FullscreenViewer.vue:105` is absent. `MODULE-RESOLUTION.json.teleports` carries both. **Live tree:** exactly two `<Teleport` — `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`. | **ADOPT-AS-FACT** (the two Teleport sites are a live-tree fact) + carry the registry-join defect to **F.W4**. |
| R3-12 | R3:100 (secondary 3) | "35 open-family records collapse to 28 unique records" | TRUE | Re-derived: `len(openFamilies)` = **35**, `len(set(canonical(row)))` = **28**, duplicates = **7** — exactly the declared 35/28/7. Duplicated rows per `R3-HA-004`: both Paper-search callsites, `GalleryCard` basisLabels, `MorphPhaseConfig` easingNames. | **ADOPT-AS-FACT** — any instance denominator built on these rows over-counts by 7 (20%). |
| R3-13 | R3:101-102 (secondary 4) | "all 24 controls mutate authored summary objects rather than authenticated raw source/predicate inputs consumed by a re-derivation path" | TRUE | `AUDITOR.mjs:200+` `CONTROL_DEFINITIONS` = exactly **C01…C24** (24 entries). Every mutator has signature `(b) => …` writing `b.source.*` / `b.modules.* `/ `b.instances.*` — the loaded summary bundle. Zero raw-byte mutations, zero raw receipts (matches `R3-HA-005`: `authenticatedRawSourceMutations: 0`, `rawReceipts: 0`). | **ADOPT-AS-FACT** — the specific mechanism behind R3-3; this is the defect R4→R6 spent three rounds curing (R4 mutates real bytes: see R6-8's `{"kind":"replace","target":"web/src/lib/api.ts",…}`). |
| R3-14 | R3:103 (secondary 5) | "the source identity uses host `localeCompare`, while the contract does not seal an explicit Unicode codepoint ordering law" | TRUE | `AUDITOR.mjs:34` — `.sort((a, b) => a.path.localeCompare(b.path))` inside `canonicalSourceIdentity`, the **sole** ordering site; `grep -n "codePoint"` → no hits. **Cured downstream:** R4/R5/R6 `SNAPSHOT-MANIFEST.json.ordering = "UTF8_BYTEWISE_CODEPOINT"`. | **ADOPT-AS-FACT** — locale-dependent identity ordering is a real reproducibility defect; note the R4+ cure so the formation adopts the *fixed* law, not the broken one. |
| R3-15 | R3:104 (secondary 6) | "checksum membership and report comparison validate only selected authored surfaces, not the complete byte-to-registry derivation" | TRUE | `AUDITOR.mjs:162-169`: asserts `rows.length !== 6` and allowed-name membership per row, then re-hashes each named file — no unique-set closure, no coverage of the registries' internal fields. Matches `R3-HA-006`/`R3-HA-007` (`selectedFieldsCompared: 35`). | **ADOPT-AS-FACT** — corroborating detail for R3-3. |
| R3-16 | R3:107-111 | "Fourier formation remains 14/14 waves, 72/72 units, and 158/158 terminal rows. P29 remains 0/137 COMPLETE. … The Fourier cross-repository input slot remains null, and all five slots remain null." | UNPROVEN (partly TRUE) | **"14 waves" is TRUE and maps to a real board**: fourier `docs/tranches/M/M.md §4` runs **M.W0 → M.W13 = 14 waves** (census [DOCS §2] independently calls it "a stale 14-wave board"). "72 units / 158 terminal rows / P29 0/137 / slots 0/5" are Codex-internal decompositions with **no counterpart in the fourier tree or in the value.js megatranche** — unverifiable, and superseded in form by the census §4 F.W0–W10 sketch (11 waves). | **CARRY-TO-WAVE → F.W0** — the 14-wave M board is the real object F.W0 must disposition (absorb/supersede/close, per census §6 item 4). The 72/158/P29/slot bookkeeping is Codex-internal and does not transfer. |
| R3-17 | R3:114 | "R3 does not block Value source auditing or Glass's independent lane. It only closes this Fourier source coordinate truthfully." | TRUE | No value.js or glass-ui artifact is referenced, gated, or mutated anywhere in the R3 packet; the 11 R3–R6 files live on the value side but touch nothing in either tree (census [DOCS §4c] concurs). | **ADOPT-AS-FACT** |

---

## §2 — R4 · `FOURIER-R4-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` (13 claims)

| id | source file:line | the claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| R4-1 | R4:5-7 | "Verdict: `TERMINAL_AMEND_SOURCE_RED / NO_RETRY / NO_HOSTILES`; Authority and credit: `NONE / 0`" | OWNER-GATED | Codex-era timebox status, dead by M-24. The finding it gates (R4-6) is TRUE and reproducible. | **OWNER-GATED** — same ruling as R3-1. |
| R4-2 | R4:11-22 | Independent census of the R4 root: "339 regular files, 56 child directories (57 including the root), zero symlinks or special nodes, and 6,948,329 regular-file bytes. All files are mode `0644`, nlink 1; all directories are mode `0755`." Plus two serialization identities (`a1e61722…` over 395 non-root nodes; `81bb5911…` over the 339 regular-file rows). | TRUE (census) / UNPROVEN (identities) | Independent `find`/`stat`: **339** regular files, **56** child dirs, **0** non-file non-dir nodes, **6,948,329** bytes — all exact; 339+56 = **395** non-root nodes, arithmetic exact. The two SHAs are not reproducible from the intake because the exact record serialization is not published in it. | **ADOPT-AS-FACT** (the census) — the identities stay unverified-as-published, per R4-3. |
| R4-3 | R4:24-31 | "the owner terminal report separately labels a diagnostic codepoint tree as `12274f39…`; the regular-file-set identity is `c9ba3de1…`. Because that report does not publish its exact record serialization, those two diagnostic identities remain owner-scoped rather than substitutes for the explicit independent serialization above." + "No root file is newer than `TERMINAL-RED.json`." | UNPROVEN | The intake **self-declares** the identities unreproducible — and that self-declaration is correct: no serialization spec is published anywhere in the four files. The mtime-ordering claim became unverifiable when Codex-root read access was withdrawn mid-lane (`Operation not permitted`); it was not re-checked. | **ADOPT-AS-FACT** that these identities are **unreproducible as published** — Codex's own epistemic honesty here is the citable item. Never cite `12274f39…`/`c9ba3de1…` as authentication. |
| R4-4 | R4:33-40 | Six terminal-artifact SHA-256 rows: `TERMINAL-RED.json` `1e8c6d95…`, `controls/R4.C01.raw.json` `ea371fb8…`, `controls/R4.C01.receipt.json` `e1fa57a5…`, `SNAPSHOT-MANIFEST.json` `a5f9ad2e…`, `DERIVED-REGISTRIES.json` `cd80105a…`, **`CONTROL-REGISTRY.json` `c3e04b4f…`** | **FALSE as written** (5/6 TRUE) | Five of six reproduced exactly by `shasum -a 256`. The sixth is a **filename error**: **`CONTROL-REGISTRY.json` does not exist** in the R4 root (`ls`: `BASELINE-CONTRACT.json`, `CONTROL-PLAN-REGISTRY.json`, `DERIVED-REGISTRIES.json`, `R4-BUILD.mjs`, `R4-CONTRACT.json`, `R4-DERIVER.mjs`, `SNAPSHOT-CLOSURE-RECEIPT.json`, `SNAPSHOT-MANIFEST.json`, `TERMINAL-RED.json`, `controls/`, `snapshot/`). The intended file is **`CONTROL-PLAN-REGISTRY.json`**, whose SHA-256 is exactly the claimed `c3e04b4ffd53bc04450b7363a271c444027d5121084a53fc4cd1b634e6c56fbe`. | **REFUTED** (as written) — transcription defect, no substantive consequence: the hash is right, the name is wrong. Corrected row: **`CONTROL-PLAN-REGISTRY.json` = `c3e04b4f…`**. Cite the correction, never the original line. |
| R4-5 | R4:42-47 | Snapshot identity `1727d153…`; "Membership is 318 repository members + six authority members + three generated checkout receipts = 327 members / 381 nodes, ordered `UTF8_BYTEWISE_CODEPOINT`." | TRUE | `SNAPSHOT-MANIFEST.json`: `snapshotIdentity = 1727d153562aca4806e891f3012510d1e763b71bceb6c814d0470e9c99774ee2` exact; `repositoryMemberCount` 318, `authorityMemberCount` 6, `generatedCheckoutMemberCount` 3, `len(members)` **327**, `nodes` **381**, `ordering "UTF8_BYTEWISE_CODEPOINT"` — all exact. | **ADOPT-AS-FACT** |
| R4-6 | R4:50-56 | **THE FIRST RED.** "The serialized plan stores the mutation at `operationPlan.mutation`, while the control runner reads `plan.mutation` at `R4-BUILD.mjs:230`. `applyMutation` therefore dereferences undefined at line 232 before the owning predicate executes." Plan SHA `b22b75e8…` | TRUE | **Byte-exact.** `R4-BUILD.mjs:230` → `const mutation = plan.mutation;`. `:352-353` → `const operationPlan = { mutation, concreteDelta, … }; return { …, operationPlan, operationPlanSha256 }` — the mutation is written one level deeper than it is read. The C01 receipt's base64 stderr decodes to: `R4-BUILD.mjs:232 … TypeError: Cannot read properties of undefined (reading 'kind') at applyMutation (…R4-BUILD.mjs:232:16)`. Receipt `planSha256 = b22b75e8d7066916eaf43a5f9f3e0289f2884f3ff51d126be21ec3a59be3122b` exact. | **ADOPT-AS-FACT** — a genuine, fully reproduced one-line harness defect, honestly self-reported. This is the model for how the formation should report its own RED. |
| R4-7 | R4:58-67 | The exact six-run result: normal/owner-bypass/nonowner-sweep exit 1, empty stdout, TypeError; no-delta/wrong-code/synthetic-receipt exit 42 with their declared control codes; before/after root identity equal at `286eabda…`; residue empty; C01 closure false; **total control closure 0/37**; later controls not run | TRUE | `TERMINAL-RED.json.firstRed.detail.statuses` = `{normal:1, owner-bypass:1, nonowner-sweep:1, no-delta:42, wrong-code:42, synthetic-receipt:42}` exact; `parsedStdout` null for the three exit-1 runs, and `control.no-delta` / `control.wrong-expected-code` / `control.synthetic-receipt` for the three exit-42 runs. Receipt: `beforeRootIdentity == afterRootIdentity == 286eabdae3b21d6f4b05f125d932751c414f6c431ec8b58bf4cb13dc662ee39f`. `ls controls/` → only `R4.C01.*`. (The `/37` denominator was not re-read before access withdrawal; R6 independently uses the same 37 — see R6-7.) | **ADOPT-AS-FACT** |
| R4-8 | R4:73-79 | Zero-credit archaeology: "571 module edges, 66 workflows, nine routes, 512 physical callsites, 1,105 mounted subjects, 900 explicit OPEN gaps, 45 Python operations, 20 client functions, two clients without an operation, and 33 visible-state rows" | TRUE | `DERIVED-REGISTRIES.json.counts` — `moduleEdges` 571, `workflows` 66, `routes` 9, `physicalCallsites` 512, `mountedSubjects` 1105, `openGaps` 900, `pythonOperations` 45, `clientFunctions` 20, `clientsWithoutOperation` 2, `visibleStateRows` 33, `sourceMembers` 318, `modules` 131 — **every figure exact, and byte-identical across R4, R5 and R6** (a stable deriver). **Live-tree cross-check: 45 Python operations ✓, 66 `.vue` workflows ✓, 9 route records ✓** (§0). | **ADOPT-AS-FACT** — this is the single most valuable artifact in the four files: a stable, thrice-reproduced, live-corroborated structural census of fourier at the exact HEAD F.W0 opens on. |
| R4-9 | R4:82-84 | "The protected Fourier checkout remains HEAD `cd26c653…`, tree `9a66411d…`, status identity `a087c90d…`; the snapshot and live checkout agree." | TRUE | Live, **one day later**: `git rev-parse HEAD` → `cd26c6533adc32dfe1453d74117d3cb73b89ea16`; `git rev-parse HEAD^{tree}` → `9a66411d16fe4ec564d67367ca55e5f97da2a6d4` — both exact. R3's `SOURCE-PINS-AND-CENSUS.json.repository` records the same pair. The status identity's serialization is unpublished (unverifiable), but the stronger statement holds: `diff -rq` between the Codex worktree's `web/src` and the live `web/src` is **empty**, and both carry the same **24** in-scope dirty paths. | **ADOPT-AS-FACT** — **the load-bearing row.** The audited scope is byte-identical to the tree F.W0 opens on. Nothing in R3–R6 is stale-at-HEAD. |
| R4-10 | R4:83-85 | "R2/R3 checksum packets remain `a780cb72…` and `0d44e81f…`" | TRUE (R3) / UNPROVEN (R2) | R3's `checksums.sha256` → `0d44e81f479af061596f7184c9a833e8ad24ff5d7b1349587ea4d612563c09df`, exact (twice-confirmed, R3-5). The R2 packet was not reached before Codex-root access withdrawal. | **ADOPT-AS-FACT** for R3; the R2 pin stays unverified. |
| R4-11 | R4:84-85 | "Canonical formation remains 14 waves / 72 units / 158 terminal rows, while P29 remains 0/137 COMPLETE, passes 0/3, and cleans 0/2." | UNPROVEN (partly TRUE) | Identical to R3-16 — see that row. "14 waves" = fourier's real M.W0–M.W13 board; the rest is Codex-internal. | **CARRY-TO-WAVE → F.W0** — same as R3-16 (disposition the 14-wave M board). |
| R4-12 | R4:87-96 | Preserved out-of-root residue: "a read-only census command inadvertently materialized `/tmp/fourier-r4-files.sha256` outside the authorized writer root … one regular mode-`0644`, nlink-1 file, 74,507 bytes and 339 lines, SHA-256 `e70543907d…`. It is preserved without cleanup." | TRUE | The file **still exists today**: `stat` → 74,507 bytes, `wc -l` → **339** lines, `shasum -a 256` → `e70543907dcd4517b550042c82bf90d981fae5164611e40781579fbc50467aa9` — every figure exact, `-rw-r--r-- 1 mkbabb wheel`. | **CARRY-TO-WAVE → F.W0** — an uncleaned out-of-root Codex artifact is still on disk; F.W0's re-ground should disposition it (the intake correctly forbids consuming its rows as evidence, and this lane consumed none). |
| R4-13 | R4:98-100 | "R4 supersedes the earlier 'authorized and absent' chronology only with this terminal failed source coordinate. It does not fill Fourier P1 or any owner slot. Any successor requires a fresh explicit owner/root ruling." | OWNER-GATED | Governance; no verifiable content. | **OWNER-GATED** — same ruling as R3-1. |

---

## §3 — R5 · `FOURIER-R5-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` (9 claims)

| id | source file:line | the claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| R5-1 | R5:5-7 | "Verdict: `TERMINAL_AMEND_SOURCE_RED / NO_RETRY / NO_HOSTILES`; Authority and credit: `NONE / 0`" | OWNER-GATED | Codex-era timebox status, dead by M-24. | **OWNER-GATED** — same ruling as R3-1. |
| R5-2 | R5:15-21 | Census: "442 regular mode-`0644`, nlink-1 files, 62 child directories, zero symlinks or special nodes, and 7,537,703 file bytes." Plus identities `27c77c54…` (504 non-root nodes) and `dc575b4b…` (442 rows). | TRUE (census) / UNPROVEN (identities) | Independent `find`/`stat`: **442** files, **62** dirs, **0** special, **7,537,703** bytes — exact; 442+62 = **504**, arithmetic exact. Serialization unpublished ⇒ hashes unverifiable, as at R4-2. | **ADOPT-AS-FACT** (the census). |
| R5-3 | R5:23-25 | "Terminal receipt SHA is `7c1b1d59…`. No regular-file mtime follows it." | UNPROVEN | Not re-hashed before Codex-root access withdrawal (`Operation not permitted`). No contrary evidence. | **CARRY-TO-WAVE → F.W0** — an unverified pin; re-hash if the coordinate is ever cited, or drop it. |
| R5-4 | R5:29-37 | "R5 fixed R4's mutation-pointer defect before broader construction" — preflight schema/runner/results/verdict SHAs; "C01 six-run closure 6/6; pointer hostiles 10/10; sole mutation pointer `/operationPlan/mutation`." | TRUE (the fix) / UNPROVEN (the four preflight SHAs) | **The fix is proven downstream**: R5's `controls/R4.C01.receipt.json` has `closure: true` with `runs.normal.status = 42` — R4's identical control had `closure: false`, status 1, TypeError (R4-6). The defect is genuinely cured. The `preflight/` directory exists but its four SHAs were not re-hashed before access withdrawal. | **ADOPT-AS-FACT** (the cure, proven by the C01 closure flip) — the four preflight pins stay unverified. |
| R5-5 | R5:39-45 | Snapshot identity `61cc65d4…` over "331 members / 385 nodes: 318 repository members, ten authority members, and three generated checkout receipts. Repository reads after closure are zero. Derived registries … preserve 571 edges, 66 workflows, nine routes, 512 physical callsites, 1,105 mounted subjects, and 45 API operations." | TRUE | `SNAPSHOT-MANIFEST.json`: `snapshotIdentity = 61cc65d40e6a65a8051eba5bf072b05bfa36b2c8dfc1e4c01c50ae3b03781b00` exact; 318 + 10 + 3 = `len(members)` **331**, `nodes` **385** — exact. `DERIVED-REGISTRIES.json.counts` byte-identical to R4's (R4-8). | **ADOPT-AS-FACT** |
| R5-6 | R5:49-56 | "Controls C01 through C16 close exactly. C17 is the first failure" — owning leaf `instance.loop.paper-sidebar`; normal exit 43 with `control.wrong-reason` and `errors: []`; closure false | TRUE | All 17 receipts re-read: **C01–C16 every one `closure: true`, `runs.normal.status: 42`**; **C17 `closure: false`, `status: 43`**, `TERMINAL-RED.json.firstRed.detail.parsedStdout.normal = {"code":"control.wrong-reason","errors":[],"controlId":"R4.C17","verdict":"REJECT"}` — exact, including the empty `errors` array. | **ADOPT-AS-FACT** |
| R5-7 | R5:58-62 | **THE SUBSTANTIVE FINDING.** "The byte mutation changes the native `PaperSidebar.vue` `li v-for` expression, but the derived baseline loop leaf is already empty because the deriver forms loop evidence only from registered component callsites. The mutation therefore cannot reach its declared source-owned predicate." | TRUE | Re-derived: R5 `DERIVED-REGISTRIES.json.leafValues["instance.loop.paper-sidebar"]` = **`[]`** — literally empty. Contrast the sibling leaf `instance.loop.presets`, which is populated and **keyed by component callsite** (`"callsiteId": "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`). `PaperSidebar.vue`'s loops are on native `<li>` elements, so they register nowhere. R6 confirms the diagnosis by curing it with a new `NATIVE_TEMPLATE_LOOP` family (R6-5). | **ADOPT-AS-FACT** + **CARRY-TO-WAVE → F.W4** — a real, generalizable derivation-model defect: **template-loop evidence keyed to *component* callsites is blind to native HTML element loops.** In fourier this is not marginal — `PaperSidebar.vue` renders the entire paper table of contents through three nested native `<li v-for>` loops (live: lines 65, 87, 105), so any instance denominator built on component callsites drops the whole sidebar subtree. F.W4's per-component D/L/C audit must count native element loops or it will inherit exactly this blind spot. |
| R5-8 | R5:64-66 | "C18 and later control artifacts are absent. Root checksum, NODE/TREE seal, `CONTROL-RESULTS`, `SOURCE-PLAN-R5`, report, final verdict, hostile A, and hostile B are absent." | TRUE | `ls controls/` → exactly `R4.C01…R4.C17` (17 receipts, nothing beyond). Root `ls` → no `CONTROL-RESULTS*`, no `SOURCE-PLAN-R5*`, no `REPORT.md`, no `checksums.sha256`, no hostile artifacts. Exact. | **ADOPT-AS-FACT** — honest self-reported incompleteness. |
| R5-9 | R5:70-74 | "R5 banks source mechanics only … Formation remains 14 waves / 72 units / 158 terminal rows; P29 remains 0/137 COMPLETE; current passes 0/3; clean audits 0/2; cross-repository slots 0/5." | UNPROVEN (partly TRUE) | Identical to R3-16 / R4-11. | **CARRY-TO-WAVE → F.W0** — same as R3-16. |

---

## §4 — R6 · `FOURIER-R6-TERMINAL-SOURCE-RED-INTAKE-2026-08-02.md` (10 claims)

| id | source file:line | the claim | verdict | receipt | disposition |
|---|---|---|---|---|---|
| R6-1 | R6:5-7 | "Verdict: `TERMINAL_AMEND_SOURCE_RED / NO_RETRY / NO_SUCCESSOR`; Authority and credit: `NONE / 0`" | OWNER-GATED | Codex-era timebox status, dead by M-24. Note this row goes further than R3/R4/R5: **NO_SUCCESSOR**, i.e. Codex itself closed the R-series. | **OWNER-GATED** — same ruling as R3-1; this is the row that makes the ruling cheap (Codex already declined a successor). |
| R6-2 | R6:15-23 | Census: "484 regular mode-`0644`, nlink-1 files, 61 mode-`0755` child directories, zero links or special nodes, and 7,846,757 file bytes." Plus identities `46493d36…` / `957be47b…`; terminal receipt `09dfb634…`; no regular-file mtime follows it. | TRUE (census) / UNPROVEN (identities) | Independent `find`/`stat`: **484** files, **61** dirs, **0** special, **7,846,757** bytes — exact. Identities and mtime ordering unverifiable (serialization unpublished; access withdrawn). | **ADOPT-AS-FACT** (the census). |
| R6-3 | R6:25-30 | "The owner decision required a new immediate-before-first-write proof that the parent and output roots were absent. No such receipt is persisted in the 484-file coordinate. Historical root absence therefore cannot be authenticated from the decision and frozen packet alone. This is a separate construction-provenance gap and independently prevents source admission." | TRUE (the absence) / OWNER-GATED (the requirement) | `grep -ril "absence\|pre-write\|prewrite\|root-absent"` across the whole 484-file root returns exactly **one** hit, and it is snapshot *content* (fourier's own `docs/tranches/N/megatranche/TERMINAL-LEDGER.md`), **not a receipt**. The absence is confirmed. Whether the owner decision *required* such a receipt is a Codex-era governance premise this lane cannot adjudicate. | **ADOPT-AS-FACT** that no pre-write absence receipt exists; the *requirement* is **OWNER-GATED**. Self-reported gaps like this are why these packets deserve adjudication rather than dismissal. |
| R6-4 | R6:32-37 | Snapshot identity `dad9f80f…` binding "332 members / 386 nodes: 318 repository, 11 authority, and three generated checkout members … repository reads after closure are zero." | TRUE | `SNAPSHOT-MANIFEST.json`: `snapshotIdentity = dad9f80fa9b1a451e84c3d6aa303b26ede7f39807b1db634db776baaf3817a90` exact; 318 + 11 + 3 = `len(members)` **332**, `nodes` **386** — exact. `NATIVE-LOOP-GATE-VERDICT.json.repositoryReadsAfterSnapshotClosure = 0`. | **ADOPT-AS-FACT** |
| R6-5 | R6:39-46 | "The mandatory native-template-loop gate is GREEN 11/11: original C17 six-run closure 1/1; structural hostiles 10/10; … and three authenticated `PaperSidebar.vue` native `li v-for` rows at source lines **65, 87, and 105**." | TRUE | `NATIVE-LOOP-GATE-VERDICT.json` → `verdict: "GREEN_BROAD_DERIVATION_RELEASED"`, `c17SixRunClosure: true`, `structuralHostiles: {green: 10, denominator: 10}` (= 11/11), `baselinePaperRowCount: 3`. `DERIVED-REGISTRIES.leafValues["instance.loop.paper-sidebar"]` → **3 rows, family `NATIVE_TEMPLATE_LOOP`, at lines 65 / 87 / 105**, expressions `(section, si) in sections` / `sub in section.subsections` / `subsub in sub.subsections`. **Live tree, independently:** `grep -n "v-for" web/src/components/paper/PaperSidebar.vue` → **65, 87, 105** with those exact expressions. | **ADOPT-AS-FACT** — the strongest live-tree corroboration in the set: an executable gate's output matches the current working tree line-for-line. |
| R6-6 | R6:48-51 | "Within the persisted executable mechanism evidence, R6 closes R5's disconnected `instance.loop.paper-sidebar` defect and releases the ordered broader controls. This mechanism result does not cure the missing pre-write absence proof or grant packet authority." | TRUE | Direct comparison: R5's leaf = `[]`; R6's = 3 `NATIVE_TEMPLATE_LOOP` rows (R5-7, R6-5). R6 adds `nativeTemplateLoops: 16` and `nativeTemplateLoopDiagnostics: 17` to `counts` — registry fields absent from R4/R5. The self-limitation is consistent with R6-3. | **ADOPT-AS-FACT** — a Codex round that *fixed its predecessor's model defect and still refused itself credit*. The fix is the reusable part. |
| R6-7 | R6:54-61 | "Controls C01 through C30 close: **30/37 = 81.0810810811%**. C31 is the first persisted executable control RED" — owning leaf `client.method.visualization-update`; plan `d1ca81a5…`, raw `24bc5d75…`, receipt `cc5bdadf…` | TRUE | 31 receipts present; re-read confirms **C01–C30 all `closure: true`, `runs.normal.status: 42`**; **C31 `closure: false`, status 43**. All three SHAs reproduced exactly: `d1ca81a595fc5cbc94061afd196a2854b84b80d073ecd2a95e52d490246c21cf`, `24bc5d7550253263572acc55aa50b02a29717f7eb0bdcbb92d6ed508f6f49ae5`, `cc5bdadffa0c35f3ab7780eeb0ddbcb2f6b4e848cffa311c1fe20658e6742d9f`. 30/37 = 0.810810810810… — arithmetic exact to the published digit. | **ADOPT-AS-FACT** |
| R6-8 | R6:63-67 | **THE SUBSTANTIVE FINDING.** "The normal run exits 43 and changes both `client.method.visualization-update` and `operation.method.visualization-update`. Owner suppression retains the operation leaf, so owning-leaf isolation and nonowner retention fail." | TRUE — **and this lane adds the root cause** | C31's decoded stdout: `{"code":"control.wrong-reason","errors":["client.method.visualization-update","operation.method.visualization-update"],"controlId":"R4.C31","verdict":"REJECT"}`, exit 43 — exact. **Root cause (established here, not in the intake):** C31's mutation is `{"kind":"replace","target":"web/src/lib/api.ts","before":"{ method: \"PATCH\", body: { ...patch }, headers }","after":"{ method: \"PUT\", … }"}` — a **client-side** edit. But the *operation* leaf embeds a back-reference: `operation:PATCH:/api/visualizations/{slug}` carries `"clients": ["client:updateVisualization"]` and `"clientDisposition": "CLIENT_MATCH_SOURCE_DERIVED"`. Flipping the client verb breaks the client↔operation match, so the operation leaf mutates too. **The two leaves are structurally non-isolable by construction.** Both endpoints verified live: `web/src/lib/api.ts:420` `export async function updateVisualization(`; `api/routers/visualizations.py:350` `@router.patch("/{slug}")` / `async def update_visualization(`. | **ADOPT-AS-FACT** + **CARRY-TO-WAVE → F.W5** — the contract lesson for the ADMISSION KEYSTONE: **an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam.** The shared-provenance contract must keep operation identity independent of client identity (the client↔operation join belongs in a separate relation, not inside the operation record) — otherwise value.js↔fourier conformance fixtures (census §4 F.W8, FN-6) will produce exactly this ambiguous two-sided failure. |
| R6-9 | R6:69-70 | "C32-C37, aggregate CONTROL-RESULTS, source-plan publication, report, final verdict, NODE/TREE/checksum seal, and static hostiles A/B are absent." | TRUE | `ls controls/` stops at `R4.C31`; root `ls` → no `CONTROL-RESULTS*`, no source-plan publication, no `REPORT.md`, no `checksums.sha256`, no hostile artifacts. Exact. | **ADOPT-AS-FACT** — honest self-reported incompleteness (as R5-8). |
| R6-10 | R6:72-75 | "Formation remains 14 waves / 72 units / 158 terminal rows; P29 remains 0/137 COMPLETE; current passes 0/3; clean audits 0/2; slots 0/5. Product, API, Browser, Safari, storage, package, release, admission, authority, and credit remain zero." | UNPROVEN (partly TRUE) | Identical to R3-16 / R4-11 / R5-9. | **CARRY-TO-WAVE → F.W0** — same as R3-16. |

---

## §5 — CENSUS RECONCILIATION: explicit AGREE / CONFLICT rows

| # | subject | Codex R3–R6 | census `CENSUS-2026-08-03.md` | live tree | resolution |
|---|---|---|---|---|---|
| X-1 | **§6.7 posture** | (n/a — the packets claim zero credit for *themselves*) | §6 item 7: "Codex R3–R6 residue **formally not inherited** … carry zero credit"; §3c [DOCS §4c] "TERMINAL / SOURCE_RED, zero credit" | — | **CONFLICT — census CORRECTED.** "Zero credit" conflates *authority* with *measurement*. The authority is dead (R3-1 etc., OWNER-GATED); the measurements are live, reproducible and live-corroborated (R4-8, R4-9, R5-7, R6-5, R6-8). **This lane's rows replace §6 item 7.** The charter line should read: *no authority, no admission, no slot — and the structural census + the two model defects enter the substrate by adjudication.* |
| X-2 | **route count** | "nine routes" (R4-8, R5-5, R6 registries; `counts.routes = 9`) | §3a [FE §1]: "**8 routes**, all lazy" | `web/src/router/index.ts` → **9 route records**: 7 lazy component routes (`/paper`, `/v/:visualizationSlug`, `/w/:imageSlug?`, `/gallery`, `/equation`, `/morph`, `/demo/shape-extractor`) + 2 redirects (`/` → saved tab, `/s/:slug` → `/w/:slug`); plus 1 alias (`/visualize` on `/w`) | **CONFLICT — Codex correct, census wrong.** The census's "8, all lazy" matches neither denominator (7 lazy, or 9 records). Codex's 9 = the record count, and it is corroborated by R6's own control leaves `route.component.saved-visualization` (C21), `route.redirect.legacy-s` (C22), `route.alias.workspace` (C23) — a model that distinguishes all three kinds. **Adopt: 9 route records = 7 lazy component + 2 redirect, + 1 alias.** CARRY → F.W4. |
| X-3 | **API operation count** | "45 API operations over 41 paths" (R3-7), "45 Python operations" (R4-8/R5-5/R6) | §1: "fourier `/api/visualizations` = 13 routes; whole-API **as-built = 30**" — marked CONSISTENT | `grep -rc "^@.*\.\(get\|post\|put\|patch\|delete\)("` over `api/` → **45** (`visualizations.py` 13 ✓) | **CONFLICT — RESOLVED, both right under different denominators.** 45 = every decorator. 45 − 13 (`admin_router`) − 1 (`app`, in `main.py`) − 1 (`gallery_router`) = **exactly 30** = the census's non-admin public surface. **Adopt: 45 total / 30 public-non-admin / 13 admin.** The security gate (R3-7b) is `0 of 45`, so the admin arm is inside the defect. CARRY → F.W5. |
| X-4 | **fourier HEAD / substrate** | HEAD `cd26c653…`, tree `9a66411d…` (R3, R4-9) | §1 / §2 C-1: HEAD `cd26c65`, 2026-07-03; 28 uncommitted paths | `git rev-parse HEAD` → `cd26c6533adc…`; tree `9a66411d16fe…`; 28 dirty paths, 24 in scope | **AGREE — three-way, exact.** Also: the Codex worktree `/Users/mkbabb/.codex/worktrees/d0be/fourier-analysis` is still registered at the same commit with `web/src` **byte-identical** to live. Census C-1's correction of lane-crud's `14d83356` stands. |
| X-5 | **workflow / SFC count** | "66 workflows" (R3-7, R4-8, R5-5, R6) | §3a: "66 SFC + 65 TS ≈ 20.6k LOC" | `find web/src -name "*.vue"` → **66**; `-name "*.ts"` → **65** | **AGREE — exact, both sides, both figures.** |
| X-6 | **Teleports** | 2 distinct: `PaperSearchModal.vue:41`, `FullscreenViewer.vue:105` (R3-11) | not enumerated | `grep -rn "<Teleport" web/src` → exactly those two | **AGREE (census silent) — Codex fills a census gap.** ADOPT. |
| X-7 | **the 14-wave board** | "Canonical formation remains 14 waves" (R3-16, R4-11, R5-9, R6-10) | §3c [DOCS §2]: "a **stale 14-wave board**"; §6 item 4 | `docs/tranches/M/M.md §4` → M.W0 … M.W13 = **14 waves** | **AGREE on the wave count.** The "72 units / 158 terminal rows / P29 0/137 / slots 0/5" superstructure is Codex-internal with no tree counterpart — does not transfer. CARRY → F.W0. |
| X-8 | **fourier defect F-α (chain never deepens)** | not named by R3–R6 | §5 risk 5 / §2 C-6: "every version `depth=0`; the chain never deepens" | fourier's own `docs/tranches/M/M.md §7`: "Phantom within-viz version chain (depth always 0) \| J \| **DELETE** (W2-transpose) \| W10" | **AGREE — and independently corroborated by fourier's own tranche doc**, which books the fix at M.W10. Census C-6's reading ("known unfinished work, not an overlooked bug") is confirmed verbatim from the source tree. Strengthens census risk 5. CARRY → F.W6 (as census already routes it). |
| X-9 | **member-scope denominator** | R3: **189** members (`web` 145 + `api` 43 + `docker-compose.yml`). R4/R5/R6: **318** repository members (`web/src` 139, `src/fourier_analysis` 61, `api/tests` 38, `api/lib` 12, `api/services` 10, `api/models` 9, `docs/tranches` 9, `web/e2e` 9, `api/routers` 8, `api/scripts` 7, + 15 singletons) | not stated | live in-scope regular files: `api` 92 + `src` 61 + `web/src` 139 + `web/e2e` 22 = 314 (`web/tests` does not exist) | **INTERNAL CODEX CONFLICT — RESOLVED as scope, not error.** R3 scoped "production members"; R4+ scoped "fixed boundaries + complete files below api/src/web/src/web/e2e/web/tests, excluding bytecode and .DS_Store" — which in practice also drops `web/e2e`'s 13 screenshot PNGs (9 of 22 admitted) and names a `web/tests` that does not exist. Both are self-consistent; **neither is "the" denominator**, and both label the mounted-instance denominator OPEN. **CARRY → F.W4: the formation must pick and publish one scope law** before any per-component census claims a percentage. |
| X-10 | **R3 ↔ R4 product drift** | R3: 545 edges / 519 callsites / 1,376 subjects. R4–R6: 571 edges / 512 callsites / 1,105 subjects | not stated | same HEAD, same bytes | **INTERNAL CODEX CONFLICT — a direct consequence of X-9** (different member scopes ⇒ different products), compounded by R3's registry-join defects (R3-10/11/12: 6→4 dynamic families, 2→1 teleports, 35→28 unique open-family rows). **The R4–R6 figures are the defensible ones** — stable across three independent rounds, produced by a deriver that mutates real bytes (R6-8) rather than authored summaries (R3-13), and live-corroborated on 3 of 3 checkable axes (45 ops / 66 workflows / 9 routes). **Adopt R4–R6's `counts` block; treat R3's products as superseded.** |

---

## §6 — WHAT ENTERS THE FORMATION SUBSTRATE (the ADOPT set, consolidated)

The fourier structural census at HEAD `cd26c65` + the 24 in-scope working-tree modifications —
**stable across R4/R5/R6, live-corroborated on every checkable axis:**

> 318 repository source members · 131 modules · **571 module edges** · **66 workflows** (= 66 `.vue`,
> live ✓) · **9 route records** (live ✓) · **512 physical callsites** · **1,105 mounted subjects** ·
> 16 template loops (+16 native, R6) · **45 Python API operations** (live ✓) over 41 paths · 20
> client functions · 2 clients without an operation · 33 visible-state rows · **900 explicit OPEN
> gaps** · 36 client edges with 9 gap operations · **OpenAPI security 0 of 45** · 2 Teleports
> (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`) · 6 dynamic `:is` families · 35 Tooltip
> callsites over 9 consumers · **mounted-instance denominator OPEN**.

Plus four method/model facts:

1. **R3-3/R3-13** — a registry audit that re-hashes bytes but never re-derives products proves only
   that bytes are unchanged. Evidence standard for F.W4/F.W5.
2. **R3-14** — locale-dependent (`localeCompare`) identity ordering is a reproducibility defect;
   adopt the cured law `UTF8_BYTEWISE_CODEPOINT`.
3. **R5-7** — template-loop evidence keyed to *component* callsites is blind to native element
   loops; in fourier this drops the entire `PaperSidebar` TOC subtree (3 nested `<li v-for>`, live
   lines 65/87/105).
4. **R6-8** — an API-operation record that embeds derived client back-references cannot attribute a
   defect to one side of the seam. Direct constraint on the F.W5 shared-provenance contract.

---

## §7 — OWNER RULINGS OWED (the OWNER-GATED set)

| ruling | rows | the question |
|---|---|---|
| **OG-1 · re-root or freeze** | R3-1, R3-4, R4-1, R4-13, R5-1, R6-1 | The R3–R6 coordinates each declare themselves frozen, `NO_RETRY`, and (R6) `NO_SUCCESSOR`, reopenable only by fresh explicit owner ruling. Does the megatranche (a) re-root fourier source auditing at F.W0 on a fresh non-overlapping root, or (b) leave the coordinates frozen and build F.W4 from live-tree measurement alone? **This lane's evidence favours (b) with adoption**: the measurements have already been independently reproduced against the live tree, so no re-root is needed to use them. |
| **OG-2 · the pre-write absence requirement** | R6-3 | R6 reports that the owner decision required an immediate-before-first-write root-absence proof, and that no such receipt exists. The *absence* is confirmed TRUE. Does that requirement bind any successor fourier source coordinate, or was it specific to the Codex-era R-series? |

---

## §8 — Tally (auditable)

**52 discrete claims**, one verdict and one disposition each.

| file | claims | TRUE | FALSE | UNPROVEN | OWNER-GATED |
|---|---:|---:|---:|---:|---:|
| R3 | 20 | 16 | 0 | 2 | 2 |
| R4 | 13 | 8 | 1 | 2 | 2 |
| R5 | 9 | 6 | 0 | 2 | 1 |
| R6 | 10 | 8 | 0 | 1 | 1 |
| **total** | **52** | **38** | **1** | **7** | **6** |

| file | claims | ADOPT-AS-FACT | CARRY-TO-WAVE | REFUTED | OWNER-GATED |
|---|---:|---:|---:|---:|---:|
| R3 | 20 | 12 | 6 | 0 | 2 |
| R4 | 13 | 8 | 2 | 1 | 2 |
| R5 | 9 | 6 | 2 | 0 | 1 |
| R6 | 10 | 8 | 1 | 0 | 1 |
| **total** | **52** | **34** | **11** | **1** | **6** |

**Counting rules.** Each claim is counted once, under its **primary** disposition. Two rows carry a
secondary CARRY noted in prose but counted as ADOPT (**R5-7** → also F.W4; **R6-8** → also F.W5) —
both are model defects that are simultaneously true-as-stated and actionable downstream. Rows whose
verdict splits (R4-2, R4-10, R5-2, R5-4, R6-2, R6-3) are counted under the verdict of their
load-bearing half, with the unverified half named explicitly in the receipt.

**CARRY targets** (11): F.W0 ×7 (R3-9, R3-16, R4-11, R4-12, R5-3, R5-9, R6-10) · F.W3 ×1 (R3-7a) ·
F.W4 ×1 (R3-10) · F.W5 ×2 (R3-7b, R3-7c). Plus the two secondary carries (R5-7 → F.W4,
R6-8 → F.W5) and four census-reconciliation carries from §5 (X-2 → F.W4, X-3 → F.W5,
X-8 → F.W6, X-9 → F.W4).

**The single REFUTED row** is R4-4, a filename transcription defect (`CONTROL-REGISTRY.json` does
not exist; the file is `CONTROL-PLAN-REGISTRY.json`) whose published SHA-256 is nonetheless correct.
No substantive Codex claim in these four files was refuted.

---

## §9 — Method and limits

- **Read-only** throughout. The four intake files were read whole and **not modified**. No product
  source, no `scripts/dev/dev.sh`, no Codex file, no sibling-repo file was written.
- Live evidence: `git rev-parse` / `git log` / `git worktree list` / `git status --porcelain` /
  `git grep` / `grep` / `find` / `stat` / `shasum -a 256` / `diff -rq` / `wc`, over
  `/Users/mkbabb/Programming/fourier-analysis` (and, read-only, the Codex worktree at
  `/Users/mkbabb/.codex/worktrees/d0be/fourier-analysis`), plus JSON re-derivation of the frozen
  packets under `/Users/mkbabb/Documents/Codex/2026-08-02/`.
- **Access limit, disclosed:** read access to `/Users/mkbabb/Documents/Codex/2026-08-02/` was
  withdrawn by the OS mid-lane (`Operation not permitted`) after the substantive verifications were
  banked. Five pins were consequently not re-hashed and are marked UNPROVEN, not FALSE: R4-3's
  mtime ordering, R4-10's R2 packet, R5-3's terminal receipt, R5-4's four preflight SHAs, and R6-2's
  two tree identities. Everything marked TRUE was verified before that point.
- No browser tooling was used.
