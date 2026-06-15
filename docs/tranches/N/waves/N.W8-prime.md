# N.W8′ — HYGIENE + RECONCILIATION + THE WIRE-DEPLOY CEREMONY + DOC-TRUTH (the close-cluster · master-merge · the 13-file dirty-tree sweep · the prod wire made HEAD-lineage · the docs made to match the tree)

- **Phase:** DEV — spec RATIFIED (the WAVES-2 second block ratified 2026-06-15;
  `EXECUTION-ORCHESTRATION.md §0` "the second block … DEVELOPED + RATIFIED (2026-06-15)"); awaits
  IMPL+auth. · **Class:** CLOSE-PRECEDING hygiene/reconciliation/ceremony wave — NOT a feature wave,
  NOT a grammar wave. It carries the charter `N.W8` (`N.md §4` row N.W8) plus everything R3 routed to
  it (`WAVES-2.md §N.W8′`; `EXECUTION-ORCHESTRATION.md §2` "The dirty-tree cleanup (folds into W8′.B)").
  Its work is mechanical-and-verifiable: a merge that goes green, a tree that goes clean, a wire that
  serves HEAD, a doc that matches the tree — every clause has an artefact, none has a narrative.
- **Cut:** NO library version cut of its OWN. W8′ does not publish a new `@mkbabb/value.js` — it
  RETRO-TAGS the already-published `v0.11.2`/`v0.12.0` (the registry shows them, git does not — the
  tags==registry gap, §State-verified), merges the tranche branch to master, and FIRES the prod wire
  deploy (api HEAD-lineage + the first CF-Pages run). The v1.0.0 cut is N.W9′'s, AFTER this wave
  (`WAVES-2.md §2` DAG "W8′ ← {W10..W17 green}   ·   W9′ ← {W8′, W18}").
- **Round:** **R5 (close)** — `EXECUTION-ORCHESTRATION.md §2` R5: "**N.W8′** (hygiene + master-merge +
  wire-deploy + doc-truth) → **N.W9′** (v1.0.0 + π + FINAL)". W8′ runs AFTER the design body
  (W10–W17) is green (master-merge needs green) and BESIDE/AFTER W18 (W18 may lag on the BA cut
  without blocking W8′ — `WAVES-2.md §2`: "W18 may lag on the BA cut without blocking W8′; W9′ waits
  for both").
- **Locus:** the repo ROOT + `.github/` + `docs/` + `api/` + the precepts submodule + the npm
  registry + the prod wire (`api.color.babb.dev` + `color.babb.dev`). This wave touches NO `src/`
  library code and NO `demo/` feature code except the three kill-list deletions (`WAVES-2.md §N.W8′`
  "Kill-list"). It is file-disjoint from every design wave's write scope.
- **DAG-deps:** depends on **{W10..W17 green}** (master-merge needs green — `WAVES-2.md §2`). The
  wire-deploy ceremony's CF-Pages half is **green-CI-gated** (the deploy fires on a GREEN same-SHA CI
  run on master push — `.github/workflows/deploy-pages.yml:11-13`), so it CANNOT fire until the merge
  lands green. W8′ FEEDS **N.W9′** (the v1.0.0 close consumes a green master + a HEAD-lineage wire +
  the discharged pin). No cross-repo PRODUCE edge: W8′ consumes glass-ui's BA cut transitively
  through W18, never produces for a sibling.
- **MEASURE-FIRST:** **N/A** — a hygiene/ceremony wave, no perf claim. The one measured thing is the
  tarball gate (already authored — `docs/RELEASE.md:133`, `npm pack --dry-run`), which W8′ documents
  into RELEASE.md but does NOT re-measure (the prettier-eviction measurement was N.W7.B's; W8′ records
  the truth, not the bench).

---

## §Thesis (one sentence)

> **N.W8′ closes every open hygiene, reconciliation, and ceremony obligation that stands between a
> green design body and the v1.0.0 close — it merges `tranche-f-handoff` to master and proves CI green
> there, sweeps the 13-file W6-death dirty tree to nothing and `.gitignore`s the class, retro-tags
> `v0.11.2`/`v0.12.0` so git==registry, FIRES the wire-deploy ceremony (HEAD-lineage api to prod + the
> NCSU-alias retirement + the first CF-Pages run + the rollback note) so the production wire stops
> serving I-era code, deletes the three kill-list orphans, and rewrites RELEASE.md + CLAUDE.md +
> demo/CLAUDE.md + DESIGN.md so the docs match the tree — every clause an artefact, none a narrative.**

---

## §Provenance (the audit lanes + the file:line roots this wave consumes)

The wave is divined from five binding inputs; each row cites its document and the load-bearing roots.

- **`N.md §4` row `N.W8` — the charter authority (the wave's original five lanes).** "Hygiene +
  reconciliation … A: merge `tranche-f-handoff` → master via PR; CI green on master (the vite-8 fix +
  retired proof refs); retro-tag v0.11.2 annotated · B: commit the staged deletions; delete `$OUT`;
  `.gitignore` the class · C: precepts submodule — commit the 2 dirty authoring-site files + bump to
  canonical · D: doc-truth — RELEASE.md rewrite (5 contradictions), CLAUDE.md drift … · E: kill-list
  deletions — `useCardMenu`, `useCodeFormatting`, the `usePaletteExport` duplicate (**NOT** `Katex.vue`,
  **NOT** `ImagePaletteExtractor` — V5 refuted)". The row is ANNOTATED "(re-sequenced AFTER the
  WAVES-2 block — `WAVES-2.md` N.W8′; absorbs the wire-deploy ceremony + the R4 doc-truth lists)".
- **`WAVES-2.md §N.W8′` (lines 235–259) — the re-sequenced, absorbed authority (the wire-deploy +
  R4 exact lists).** Adds **the wire-deploy ceremony** as the named largest cluster: "X1 deploy HEAD
  api to prod (N-P0-3), X2 the NCSU-alias on-host retirement (DEC-9 honesty), X3 the first CF-Pages
  wire run (CH-14a + A5), N-P0-2's wire half; X5's rollback note into the runbook." Names the debris
  sweep file-by-file (`.w6a-audit{,2..5}.mjs`, `mix-1440-snapshot.md`, `shot3-dataurl.txt`,
  `suffuse-dataurl.txt`, `impl/shots/w6a-shell-*.json`), the kill-list, and **the doc-truth exact
  lists** (RELEASE.md per R4 §2 RM-1..8; CLAUDE.md per R4 §3 CM-1..7; demo/CLAUDE.md; DESIGN.md per
  X13). Its hard gate: "master green; a mutation succeeds on the PRODUCTION wire and the envelope ==
  HEAD format (inv-N-5 completes); tags == registry; docs match tree."
- **`EXECUTION-ORCHESTRATION.md §2` (R5 + the dirty-tree cleanup ¶) — the round placement +
  the cleanup composition.** R5 places W8′→W9′ as the close. The dirty-tree ¶ (lines 85–88): "The 13
  dirty files are W6-audit residue (`.w6a-audit*.mjs`, the data-url dumps, `$OUT`) + the staged
  CHANGELOG/CONTRIBUTING/VENDOR-POLICY deletions + the precepts-submodule dirt — all W8′ hygiene
  items; `.gitignore` the audit-script class."
- **`PROGRESS.md` (the W4-artifacts-done / W8-planned state) — the ceremony boundary.** Row N.W4
  (line 18): "**ARTIFACTS DONE** `e62567a`+`b0cb867` (verified; **wire deploy = the W8 ceremony**)" —
  the rs0 docker mutation proof PASSED, deploy-hook authored, /health /docs /openapi 200, vhost :8130,
  deploy-pages.yml ✓; the wire deploy itself is explicitly W8′'s. Row N.W8 (line 22): "**PLANNED** (+
  the wire-deploy ceremony folded in) … prod deploy fires post-merge." Line 31: "W8′ absorbs the
  wire-deploy ceremony; W9′'s pin target moved 3.13.0 → the BA cut." Line 67: "Prod wire lineage:
  **I-era `23a7b27`** (2026-05-29); K/L/F-handoff never deployed; NCSU alias alive, byte-identical;
  V3."
- **The value.js ground-truth source/infra lanes (the tree this wave reconciles):**
  - the dirty tree itself — `git status --short` (§State-verified): 3 staged deletions, 1 modified
    submodule, 8 untracked debris files.
  - `.github/workflows/` — `ci.yml` (the collapsed CI — `ci.yml:3` "Collapses the prior ci.yml … +
    node.js.yml"), `deploy-pages.yml` (the CF-Pages green-CI-gated deploy-of-record — `:1,11-13`),
    `release.yml` (the changesets-driven tag-publish — `:8-10`).
  - `api/compose.yaml` (rs0 single-node — `:12,67,84`), `api/apache-vhost.conf` (:8130 proxy —
    `:42-43`), `scripts/deploy-hook.sh` (authored — exists), `scripts/deploy.sh` (the spine webhook),
    `api/src/index.ts:78-79` (the /health/docs/openapi meta-router).
  - `docs/RELEASE.md` (the drifted release doc — `:34,42` cite the dead `node.js.yml`; `:47-59` cite
    the excised `proof:*` ladder; `:5` the stale version map ending at v0.9.0), `CLAUDE.md` (drifted —
    `:113` `@mkbabb/parse-that@^0.7.0` vs the real `^0.9.0`), `docs/dev-deploy-standard.md` (the
    deploy-standard doc the staged deletions are superseded by).
  - the precepts submodule — `docs/precepts` at `63240e6` (modified, `heads/main-26-g63240e6`).

---

## §State-verified (the defect set proven TODAY by command + output)

Every claim re-verified against the working tree on **2026-06-15** at version **`0.12.0`**, branch
**`tranche-f-handoff`**. Every defect below is born-RED-witnessable RIGHT NOW — the gate clause that
discharges it reds against this exact output today and greens at the wave's close.

**1 — The 13-file dirty tree (the W6-death residue + staged deletions + submodule dirt):**

```sh
$ git status --short                  # (filtering out docs/tranches/N/{waves,scratch} = the spec-authoring work itself)
 D CHANGELOG.md                       # staged deletion — superseded by docs/RELEASE.md + the changesets CHANGELOG idiom
 D CONTRIBUTING.md                    # staged deletion — superseded by docs/ + the precept instructions
 D VENDOR-POLICY.md                   # staged deletion — superseded by docs/dev-deploy-standard.md
 m docs/precepts                      # submodule dirt (at 63240e6, heads/main-26-g63240e6)
?? $OUT                               # 66726-byte stray redirect dump (a `> $OUT` that leaked the literal name)
?? .w6a-audit.mjs                     # W6-death playwright audit script (imports playwright, BASE :9401 — the dead W6.A)
?? .w6a-audit2.mjs  …  .w6a-audit5.mjs   # 4 more W6-audit iterations
?? mix-1440-snapshot.md              # W6 data dump
?? shot3-dataurl.txt   suffuse-dataurl.txt   # W6 data-url dumps
```

Plus the TWO TRACKED W6-shell JSONs that must be removed from the index (not merely the working tree):

```sh
$ git ls-files docs/tranches/N/audit/impl/shots/ | grep w6a-shell
docs/tranches/N/audit/impl/shots/w6a-shell-console.json
docs/tranches/N/audit/impl/shots/w6a-shell-probes.json
```

The `$OUT` head proves it is a stray dump, not a deliberate artefact:

```sh
$ head -3 '$OUT'
====================================================================================================
DIVE 2 SCOPE: glass-ui (3.1.1) — W8 deep-dive across the 127-story demo (live :5210) + dist build…
netNewCount: 11
```

`.w6a-audit.mjs:1-6` confirms the W6-death lineage (`import { chromium } from "playwright"; const BASE
= "http://localhost:9401"`). **`.gitignore` does NOT yet cover the audit-script class** — its current
contents (`git show HEAD:.gitignore`) carry `_*`, `dist/`, `*.png` and friends but no `.w6a-audit*`,
no `$OUT`, no `*-dataurl.txt` rule. The class can re-rot.

**2 — The tags==registry gap (the retro-tag N-P0-5 defect):**

```sh
$ npm view @mkbabb/value.js version        # the registry
0.12.0
$ git tag | grep -E 'v0\.1[012]'           # the local tags
v0.10.0
v0.11.0
v0.11.1
$ git for-each-ref --format='%(refname:short) %(objecttype)' refs/tags | grep v0.1
v0.10.0 tag      # annotated
v0.11.0 commit   # LIGHTWEIGHT (not annotated)
v0.11.1 tag      # annotated
```

The registry has published **`0.12.0`** (and `0.11.2` in its history); git has NO `v0.11.2` and NO
`v0.12.0` tag. `v0.11.0` is a lightweight commit-tag, not annotated. The "tags == registry" gate
(`WAVES-2.md §N.W8′` hard gate) is RED today — two missing annotated tags.

**3 — The master-merge gap (the entire N tranche is unmerged):**

```sh
$ git rev-list --left-right --count master...tranche-f-handoff
0	62                                      # 62 commits ahead of master, 0 behind
$ git log master --oneline -1
2f7fc87 docs(tranche-J): … WAVE C frontend-design refinement …    # master HEAD is a Tranche-J docs commit
```

master sits 62 commits behind the branch — the ENTIRE N tranche (W0–W7 implemented + 0.12.0 + all the
N docs) is unmerged. The merge-via-PR + CI-green-on-master is W8′.A's first obligation.

**4 — The prod wire serves I-era code (the wire-deploy ceremony, the largest un-fired cluster):**

`PROGRESS.md:67` records the wire lineage as **I-era `23a7b27` (2026-05-29)** — "K/L/F-handoff never
deployed; NCSU alias alive, byte-identical (V3)." The DEPLOY ARTEFACTS are DONE (N.W4 — verified):

```sh
$ ls scripts/deploy-hook.sh && grep -nE 'rs0|replSet' api/compose.yaml | head -2
scripts/deploy-hook.sh                                              # authored, 9722 bytes, executable
12:  MONGODB_URI: "mongodb://mongo:27017/palette-db?replicaSet=rs0&directConnection=true"
67:  command: ["mongod", "--replSet", "rs0", "--bind_ip_all"]      # the transactions-P0 fix
$ grep -nE '/health|/docs|/openapi' api/src/index.ts | head -1
78:// Liveness sentinel (the bare root). The richer /health … /docs, /openapi.json live in the meta router
```

The artefacts CAN serve HEAD; the wire DOES NOT yet. The ceremony — actually FIRING `scripts/deploy.sh
api` (or the deploy-hook) to push HEAD-lineage to prod, retiring the NCSU on-host alias (DEC-9
honesty), and the FIRST CF-Pages run (`deploy-pages.yml`, the green-CI-gated demo deploy-of-record) —
is W8′'s. This is born-RED on the live wire today (a `curl api.color.babb.dev/…` returns the I-era
envelope: legacy `id`/`status`, no `published`/`atomSetHash`; the K/L routes 404 — `N.md §1`
Deploy-truth, V3).

**5 — RELEASE.md doc-drift (the RM-1..8 set — the dead-workflow + excised-ladder + stale-map):**

```sh
$ grep -nE 'node\.js\.yml' docs/RELEASE.md
34:5. **Node 22 or 24** — matches the CI matrix (`.github/workflows/node.js.yml`)…
42:By construction the FINAL.md gate matrix subsumes every CI step in `.github/workflows/node.js.yml`…
$ ls .github/workflows/
ci.yml   deploy-pages.yml   release.yml          # node.js.yml DOES NOT EXIST (collapsed into ci.yml — ci.yml:3)
$ grep -nE 'proof:' docs/RELEASE.md | head -3
47:- `npm run proof:dts-layout`
50:- `npm run proof:no-deprecated`                 # …the whole proof:* ladder…
$ node -e "const s=require('./package.json').scripts; console.log(Object.keys(s).filter(k=>k.startsWith('proof')))"
[]                                                 # ZERO proof:* scripts remain — the ladder is EXCISED from package.json
$ grep -nE 'v0\.[6-9]\.0 closed' docs/RELEASE.md | head -1
5:**Cadence**: … v0.6.0 closed Tranche D, v0.7.0 closed E, v0.8.0 closed F, v0.9.0 closed G…
```

RELEASE.md cites the **dead `node.js.yml`** twice (`:34,42`) — the workflow was collapsed into `ci.yml`
(`ci.yml:3`). It enumerates the **excised `proof:*` ladder** (`:47-59`) — `package.json` carries ZERO
`proof:*` scripts (the grep-`proof:*` idiom is RETIRED constellation-wide — `WAVES-2.md §3` "KILLED at
the S2 fold"). Its version map **stops at v0.9.0/Tranche-G** (`:5`) — never extended through 0.10/0.11/
0.12. The changesets ceremony (the real release path — `.changeset/config.json` exists,
`release.yml:8-10` "Version discipline is changesets-driven") is undocumented. These are the R4 §2
RM-1..8 contradictions.

**6 — CLAUDE.md doc-drift (the CM-1..7 set):**

```sh
$ grep -nE 'parse-that@\^0\.7' CLAUDE.md
113:- **Runtime**: `@mkbabb/parse-that@^0.7.0`
$ node -e "console.log(require('./package.json').dependencies['@mkbabb/parse-that'])"
^0.9.0                                             # the REAL pin — CM-4 drift confirmed
$ grep -nE '27 indexes' api/CLAUDE.md ; grep -rhE 'createIndex' api/src/ | wc -l
86:api/ … (Docker, Node 22, 9 collections / 27 indexes)
22                                                 # the REAL count is 22 (api/src/db.ts) — the W3 index right-size
```

CLAUDE.md/api/CLAUDE.md claim `@mkbabb/parse-that@^0.7.0` (real: `^0.9.0`) and "27 indexes" (real: 22,
after the W3 index right-size — `api/src/db.ts`). The R4 §3 CM-1..7 set also covers: indexes 22, port
8130 (`api/compose.yaml:5`, `apache-vhost.conf:42` — the host loopback is `127.0.0.1:8130`; the
CLAUDE.md "port" claim must read the real bound port, NOT the container :3000), the typecheck split
(the real script is `vue-tsc -p tsconfig.lib.json … && vue-tsc -p tsconfig.demo.json …`), the
11-`.md`-docs-pages count, and the new boot-smoke/abrogation-sweep/css-emission-probe scripts.

**7 — The kill-list orphans (NOT Katex, NOT ImagePaletteExtractor — V5):**

```sh
$ find demo -name 'useCardMenu*' -o -name 'useCodeFormatting*' -o -name 'usePaletteExport*' | grep -v node_modules
demo/@/composables/palette/usePaletteExport.ts
demo/@/components/custom/markdown/composables/useCodeFormatting.ts
demo/@/components/custom/palette-browser/composables/useCardMenu.ts
demo/@/components/custom/palette-browser/PaletteDialog/composables/usePaletteExport.ts
```

There are TWO `usePaletteExport.ts` — the DUPLICATE is the kill (`WAVES-2.md §N.W8′`: "the
`usePaletteExport` duplicate"); the singular-consumer one stays. `useCardMenu` and `useCodeFormatting`
are the two other dead composables. `Katex.vue` (11 docs consume it) and `ImagePaletteExtractor.vue`
(PaletteDialog renders it) are V5-REFUTED and **stay** (`N.md §2` "Two first-fleet kill-list claims
were *refuted*").

**The substrate state this wave RIDES (the prerequisite, not a defect):** the design body W10–W17 +
W18 must be green before W8′'s merge (master-merge needs green — `WAVES-2.md §2`). At the time this
spec is authored those waves are RATIFIED-not-yet-run; W8′'s DAG-gate (§Hand-off) is the explicit
"{W10..W17 green}" predicate, and its CF-Pages clause is structurally gated by the green-CI predicate
in `deploy-pages.yml:11-13`.

---

## §Goal

Bring value.js to a CLOSE-READY state: a green master carrying the whole N tranche, a spotless tree
that cannot re-rot, a git tag history that matches the registry, a production wire that serves
HEAD-lineage code through an executable deploy artefact (inv-N-5 completed on the WIRE, not just in the
committed compose), and a documentation set (RELEASE.md, CLAUDE.md, demo/CLAUDE.md, DESIGN.md) that
tells the truth about the tree it describes. Every obligation is mechanical and artefact-bearing — the
wave succeeds when a fresh auditor, running the §Hard gate commands, sees green on each. This is the
penultimate wave: it leaves N.W9′ nothing to do but pin, π-verify, and cut v1.0.0.

---

## §Scope (the lanes, each at the gestalt seam — fix the root, not the symptom)

Five lanes, file-disjoint from every design wave and from each other (A=git/CI, B=tree/gitignore,
C=submodule, D=wire+docs+kill-list — D itself sub-partitions cleanly). The wave touches NO `src/`
library code; its only `demo/` writes are the three kill-list deletions.

| Lane | Work | Anchors (the root, not the symptom) |
|---|---|---|
| **A — master-merge + CI-green + retro-tag** | Merge `tranche-f-handoff` → master **via PR** (not a fast-forward push — the constellation merge idiom, `cross-repo-dev-resolution.md` cadence + `docs/RELEASE.md:5` "the version bump and the merge-to-master are a single ceremony"); CI green on master — the **vite-8 fix** (the devDep is `vite@^8.0.13`; the merge must keep CI green under it) + **retired proof refs** (CI must carry NO dead `proof:*` step — already true in `ci.yml`, re-verified at merge). Then **retro-tag the published versions**: annotated `v0.11.2` + `v0.12.0` (and convert the lightweight `v0.11.0` to annotated if the close-honesty audit requires) so `git tag` == `npm view` history. | `git rev-list master...tranche-f-handoff` = `0 62`; `release.yml:8-10` (changesets-driven); the 62-commit branch |
| **B — the 13-file dirty sweep + the `.gitignore` class** | **Commit the staged deletions** (CHANGELOG/CONTRIBUTING/VENDOR-POLICY — superseded by `docs/RELEASE.md` + `docs/dev-deploy-standard.md` + the changesets CHANGELOG; the deletion is the no-legacy discharge, not a loss). **Delete** `$OUT`, `.w6a-audit{,2,3,4,5}.mjs`, `mix-1440-snapshot.md`, `shot3-dataurl.txt`, `suffuse-dataurl.txt`, and **`git rm`** the two TRACKED `docs/tranches/N/audit/impl/shots/w6a-shell-{console,probes}.json`. **`.gitignore` the class** so it cannot re-rot: a `.w6a-audit*.mjs` rule, a `$OUT` rule, a `*-dataurl.txt` rule (the audit-script class per `EXECUTION-ORCHESTRATION.md §2`). | the §State-verified `git status --short`; `git show HEAD:.gitignore` (no class rule today) |
| **C — the precepts submodule** | Commit the submodule's dirty authoring-site files at the canonical site and **bump the pin** to the canonical commit (`docs/precepts` is `m` at `63240e6`, `heads/main-26-g63240e6` — verified `git submodule status`). A submodule pin is a single SHA bump; the gate is `git submodule status` clean. | `git submodule status docs/precepts` → ` 63240e6 … (m)` today |
| **D — the wire-deploy ceremony + doc-truth + kill-list** | **(D.1 wire-deploy — the largest cluster)** FIRE the prod deploy: HEAD-lineage api to prod (X1/N-P0-3 — `scripts/deploy.sh api` over the committed `compose.yaml` rs0 artefact + `scripts/deploy-hook.sh`); the **NCSU-alias on-host retirement** (X2/DEC-9 honesty — the alias is alive + byte-identical at HEAD per `PROGRESS.md:67`); the **first CF-Pages wire run** (X3/CH-14a/A5 — `deploy-pages.yml`, green-CI-gated, fires post-merge); N-P0-2's wire half; **X5's rollback note** into `docs/dev-deploy-standard.md`. **(D.2 doc-truth)** RELEASE.md rewrite per R4 §2 (RM-1..8 — kill the `node.js.yml` cites `:34,42`, excise the `proof:*` ladder `:47-59`, extend the version map past v0.9.0 `:5`, document the changesets path, add the tarball gate); CLAUDE.md per R4 §3 (CM-1..7 — parse-that `^0.9.0` not `^0.7.0` `:113`, indexes 22 not 27, port 8130, the typecheck split, the 11 docs pages, the new boot-smoke/abrogation/css-emission scripts); demo/CLAUDE.md one-liner; DESIGN.md catalog refresh (X13) + the dead `useMetaballRenderer` comments (R4-3); X10 CI glass-ui FULL build confirm; X4 the openapi table-vs-source decision recorded. **(D.3 kill-list)** delete `useCardMenu`, `useCodeFormatting`, the `usePaletteExport` DUPLICATE (NOT Katex, NOT ImagePaletteExtractor — V5). | `PROGRESS.md:67` (I-era wire); `deploy-pages.yml:11-13` (green-gated); `docs/RELEASE.md:34,42,47,5`; `CLAUDE.md:113`; the §State-verified kill-list find |

**Lane disjointness (the one shared-write hazard, named):** Lane A and Lane C both touch the
git/submodule index, but A's index op is the merge + tag (refs), C's is the submodule pin (a tree
entry) — sequential within the close ceremony (C's pin lands IN the merge, A's tags AFTER the
merge-to-master is green). Lane B's deletions are tree ops that ride INTO the merge commit. Lane D.1
(wire) is post-merge-green (the deploy fires on the green CI run); D.2/D.3 (docs/kill-list) ride INTO
the merge. The ordering is: **{B + C + D.2 + D.3 land on the branch → A merges to master → CI greens →
A retro-tags → D.1 wire-deploy fires}**.

---

## §Hard gate (FALSIFIABLE · born-RED-witnessable on a named defect tree TODAY · P6 posture per clause)

The wave closes against the dirty-tree sweep, the merge/tag/CI artefacts, the live prod wire, and the
doc-tree reconciliation. Every clause is born-RED against the §State-verified output TODAY and greens
at close. The headline gate is `WAVES-2.md §N.W8′`'s: **"master green; a mutation succeeds on the
PRODUCTION wire and the envelope == HEAD format (inv-N-5 completes); tags == registry; docs match
tree."** Each sub-clause below is an artefact, not a narrative.

1. **Master is green (Lane A).** `git rev-list --left-right --count master...tranche-f-handoff` →
   `0 0` (the branch is merged); CI is GREEN on the resulting master HEAD (the `ci.yml` run on the
   merge SHA passes — vite-8 build, lib+demo typecheck, tests, the abrogation sweep). *(P6: the CI run
   conclusion is the artefact; born-RED today — master is 62 commits behind, §State-verified row 3.
   A green CI on master is the FALSIFIABLE close condition, not "the merge looks done.")*
2. **The tree is clean AND the class is gitignored (Lane B).** `git status --short` (excluding the
   spec-authoring `docs/tranches/N/{waves,scratch}`) → EMPTY; `$OUT`, all five `.w6a-audit*.mjs`, the
   three data dumps are GONE; the two tracked `w6a-shell-*.json` are `git rm`'d; `git check-ignore
   .w6a-audit.mjs '$OUT' x-dataurl.txt` → all three matched (the class cannot re-rot). *(P6: a
   `git status` + `git check-ignore` artefact; born-RED — 13 dirty entries + no class rule today.)*
3. **The submodule is clean + pinned (Lane C).** `git submodule status docs/precepts` → a clean ` `
   (space) prefix at the canonical SHA, no `m`/`+`. *(P6: the `git submodule status` line is the
   artefact; born-RED — ` m 63240e6` today.)*
4. **tags == registry (Lane A retro-tag).** `git tag | grep -E 'v0\.(11\.2|12\.0)'` returns BOTH;
   each is annotated (`git cat-file -t v0.12.0` → `tag`); the set matches `npm view @mkbabb/value.js
   versions` through 0.12.0. *(P6: the `git for-each-ref` objecttype is the artefact; born-RED — both
   tags ABSENT today, §State-verified row 2.)*
5. **The prod wire serves HEAD-lineage (Lane D.1 — inv-N-5 COMPLETES on the wire).** A mutation
   (e.g. a create) succeeds against `api.color.babb.dev`, AND the response envelope == HEAD format
   (carries `published`/`atomSetHash`, NOT the I-era `id`/`status`); the K/L routes that 404'd now
   200. The NCSU on-host alias is retired (or its retirement recorded honestly — DEC-9). The first
   CF-Pages run is GREEN on `color.babb.dev`. *(P6: a live `curl` + the deploy-job conclusion are the
   artefacts — runtime observation, not "the compose can do transactions"; born-RED — the wire serves
   I-era `23a7b27` today, §State-verified row 4. This is the inv-N-5 deployed-truth clause that
   N.W4's ARTIFACTS-DONE explicitly deferred to "the W8 ceremony" — `PROGRESS.md:18`.)*
6. **Docs match the tree (Lane D.2).** `grep -c 'node\.js\.yml' docs/RELEASE.md` → 0; `grep -c
   'proof:' docs/RELEASE.md` → 0 (the excised ladder gone from the doc); the RELEASE version map
   extends through 0.12.0 and names the changesets path + the tarball gate; `grep -c 'parse-that@\^0\.7'
   CLAUDE.md` → 0 AND `grep -c 'parse-that@\^0\.9' CLAUDE.md` → ≥1; CLAUDE.md indexes read 22, port
   8130, the typecheck split, the docs-page count; demo/CLAUDE.md + DESIGN.md refreshed; the dead
   `useMetaballRenderer` comments removed. *(P6: grep-count artefacts on the docs; born-RED — the dead
   refs PRESENT today, §State-verified rows 5–6.)*
7. **The kill-list orphans are gone (Lane D.3).** `find demo -name useCardMenu\* -o -name
   useCodeFormatting\* | grep -v node_modules` → EMPTY; exactly ONE `usePaletteExport.ts` remains
   (the duplicate deleted); `Katex.vue` + `ImagePaletteExtractor.vue` STILL PRESENT (V5 — the refuted
   claims are NOT acted on). The library + demo typecheck stay green after the deletions (no dangling
   import). *(P6: a `find` + a typecheck artefact; born-RED — 2 `usePaletteExport.ts` + the two dead
   composables present today, §State-verified row 7.)*

**The headline gate (one line):** master merged-and-green + the 13-file tree swept to empty and the
class gitignored + `v0.11.2`/`v0.12.0` retro-tagged (tags==registry) + **a mutation succeeds on the
PRODUCTION wire with a HEAD-format envelope (inv-N-5 completes on the wire) + the first CF-Pages run
green** + RELEASE.md/CLAUDE.md/demo-CLAUDE.md/DESIGN.md reconciled to the tree + the three kill-list
orphans deleted → N.W9′ has nothing left but pin + π + the v1.0.0 cut.

**P6 posture, per clause (the falsifiability discipline):** clauses 1–4, 6, 7 are STATIC artefacts
(git state, grep counts, find results, CI conclusion) — each FALSIFIABLE by a single command whose
output is shown above as RED today. Clause 5 is the one RUNTIME clause (a live mutation against the
prod wire) — it is NOT a "the artefact can do it" check (the compose-can-transact proof was N.W4's,
already PASSED); it is the WIRE actually serving HEAD, observed by curl. No clause is grep-only-for-a-
feature or "API exists"; the wire clause specifically demands a runtime mutation, per the hard-gate
discipline (`TRANCHE-AND-WAVE-SPEC.md §Hard gate`: "Grep-only and 'API exists' checks are
insufficient for runtime features").

---

## §No-workaround (the named forbidden shortcuts for THIS wave)

- **NO fast-forward push to master in place of a PR merge.** The close ceremony is a PR merge with
  CI-green-on-master (`docs/RELEASE.md:5` "the merge-to-master are a single ceremony"; the
  constellation cadence). A direct `git push master` skips the green-on-master gate that
  `deploy-pages.yml:11-13` keys the deploy off — it would let a red master fire (or fail to fire) the
  CF-Pages deploy. The PR + green-CI is the mechanism, not a formality.
- **NO `.gitignore`-without-removal of the tracked debris.** The two `w6a-shell-*.json` are TRACKED
  (`git ls-files` shows them); a `.gitignore` rule does NOT untrack an already-tracked file. They must
  be `git rm`'d. `.gitignore` covers the UNTRACKED class (`$OUT`, `.w6a-audit*.mjs`, `*-dataurl.txt`)
  so it cannot RE-rot; it is not a substitute for removing what is already indexed.
- **NO leaving the staged deletions un-committed "to be safe."** CHANGELOG/CONTRIBUTING/VENDOR-POLICY
  are superseded (by `docs/RELEASE.md`, the precept instructions, `docs/dev-deploy-standard.md`); the
  staged `D` is the no-legacy discharge. Reverting them would re-introduce the legacy-beside-
  replacement the standing mandate forbids (`WAVES-2.md §0` "no-legacy … interim shims DIE at the
  consume"). Commit the deletions; do not un-stage them.
- **NO lightweight tags for the retro-tag.** `v0.11.2`/`v0.12.0` must be ANNOTATED (`git tag -a`), like
  `v0.10.0`/`v0.11.1` already are — `v0.11.0`'s lightweight commit-tag is itself a defect to consider
  fixing, not a precedent to follow. An annotated tag carries the close-ceremony message and is the
  registry-parity artefact.
- **NO declaring the wire deployed from the committed artefact alone.** N.W4 proved the compose CAN
  transact (the docker mutation proof PASSED — `PROGRESS.md:18`); that is NOT the wire serving HEAD.
  The §Hard-gate clause 5 demands a LIVE mutation against `api.color.babb.dev` with a HEAD-format
  envelope. "The artefact is correct" ≠ "the wire is deployed" — inv-N-5 is a DEPLOYED-truth invariant
  (`N.md §6` inv-N-5: "The production wire serves HEAD-lineage code"). The ceremony FIRES the deploy.
- **NO editing the docs to match a stale belief instead of the tree.** RELEASE.md/CLAUDE.md must be
  rewritten to match the OBSERVED tree (parse-that `^0.9.0` from `package.json`, indexes 22 from
  `api/src/db.ts`, port 8130 from `compose.yaml`, the collapsed `ci.yml` not the dead `node.js.yml`).
  The doc-truth discipline is measure-the-tree-then-write, never write-from-memory (the drift root —
  the docs froze at the v0.9.0/G world while the tree moved to 0.12.0/N).
- **NO acting on the V5-refuted kill-list claims.** `Katex.vue` (11 docs consume it) and
  `ImagePaletteExtractor.vue` (PaletteDialog renders it) are KEEP (`N.md §2`; `WAVES-2.md §N.W8′`
  "NOT Katex, NOT ImagePaletteExtractor — V5 stands"). Deleting them would be a refuted-claim
  regression; the kill-list is EXACTLY `useCardMenu` + `useCodeFormatting` + the `usePaletteExport`
  duplicate.
- **NO re-running or re-measuring N.W7's perf benches under the doc-truth lane.** The tarball gate
  (`docs/RELEASE.md:133`, `npm pack --dry-run`) and the prettier-eviction number were N.W7.B's
  measurement; W8′ DOCUMENTS them into RELEASE.md from the recorded truth, it does not re-bench (a
  re-bench here would be unconsumed scaffolding — the measure-first discipline applies to the wave
  that makes the claim, and W8′ makes no perf claim).

---

## §Folds (the rows this wave discharges, each citing its lane + finding-id)

| Fold row | What it discharges | Lane / finding-id |
|---|---|---|
| **F1 — the charter N.W8 absorbed + re-sequenced** | The five charter-W8 lanes (merge/CI/retro-tag · staged-deletions/`$OUT`/gitignore · submodule · doc-truth · kill-list) run here, AFTER the WAVES-2 block, with the wire-deploy ceremony folded in. | `N.md §4` row N.W8 (the five lanes); the row's own re-sequence annotation |
| **F2 — the 13-file dirty-tree cleanup** | The W6-death residue (`.w6a-audit*.mjs`, the data-url dumps, `$OUT`) + the staged CHANGELOG/CONTRIBUTING/VENDOR-POLICY deletions + the precepts-submodule dirt — all swept; `.gitignore` the audit-script class. | `EXECUTION-ORCHESTRATION.md §2` (the dirty-tree ¶); `WAVES-2.md §N.W8′` (the file-by-file list) |
| **F3 — the wire-deploy ceremony (X1/X2/X3 + N-P0-2/3 + X5)** | The single largest un-fired closure cluster: HEAD api to prod (X1/N-P0-3), the NCSU-alias retirement (X2/DEC-9), the first CF-Pages run (X3/CH-14a/A5), N-P0-2's wire half, X5's rollback note. inv-N-5 completes on the WIRE. | `WAVES-2.md §N.W8′` (the wire-deploy bullet); `WAVES-2.md §5` rows "N-P0-2 wire half · N-P0-3 · N-P0-5 → W8′"; `PROGRESS.md:18` (the W4-defers-the-wire-to-W8 record) |
| **F4 — the retro-tag (N-P0-5) → tags==registry** | `v0.11.2`/`v0.12.0` retro-tagged annotated so git == the registry; the published versions get their git anchors. | `WAVES-2.md §5` row "N-P0-5 → W8′"; the §State-verified tags-gap |
| **F5 — the doc-truth exact lists (RM-1..8 + CM-1..7 + X13 + R4-3 + X10 + X4)** | RELEASE.md rewrite (the dead-workflow + excised-ladder + stale-map), CLAUDE.md drift (parse-that/indexes/port/typecheck/docs-pages/new-scripts), demo/CLAUDE.md, DESIGN.md refresh + dead `useMetaballRenderer` comments, the CI glass-ui FULL-build confirm, the openapi table-vs-source decision. | `WAVES-2.md §N.W8′` (the doc-truth bullet); `WAVES-2.md §5` rows "RM-1..8 + CM-1..7 doc drift → W8′ · X13 DESIGN.md refresh → W8′ · R4-3 dead comments → W8′ · X10 CI full-build → W8′ · X4 openapi drift → W8′" |
| **F6 — the kill-list (useCardMenu · useCodeFormatting · the usePaletteExport duplicate)** | The three dead composables deleted; Katex + ImagePaletteExtractor KEPT (V5-refuted, not acted on). | `WAVES-2.md §5` row "kill-list (useCardMenu et al.) → W8′"; `N.md §2` (the V5 refutations) |
| **F7 — the master-merge gate (X10 CI glass-ui full-build + the vite-8 / retired-proof CI parity)** | master merged via PR with CI green — the vite-8 build holds, no dead `proof:*` step remains, glass-ui's FULL build is confirmed in CI. | `WAVES-2.md §5` row "X10 CI full-build → W8′"; `N.md §4` row N.W8.A ("the vite-8 fix + retired proof refs") |
| **F8 — the X5 rollback runbook (BOOK-with-trigger → discharged into the runbook)** | The rollback note folded into `docs/dev-deploy-standard.md` (the runbook), discharging the W8′-folded BOOK. | `WAVES-2.md §3` "X5 rollback runbook (folded W8′)"; `WAVES-2.md §5` row "X5 rollback runbook → W8′ (BOOK)" |

This wave discharges NO U-row from the user audit (U1–U33) — those are demo/glass-ui/color findings
owned by N.W10–N.W17 (`WAVES-2.md §5`). W8′ is the hygiene/ceremony/doc-truth close-cluster, disjoint
from the U-axis; its obligations are the X-lane closure rows, the doc-drift sets, and the close
ceremony itself.

---

## §Hand-off (the BINDING cross-wave + cross-repo boundaries)

**Cross-wave (within value.js N):**

- **{N.W10..N.W17} — the GREEN PREREQUISITE (the inbound DAG-gate).** W8′'s master-merge CANNOT
  run until the design body is green (`WAVES-2.md §2` DAG: "W8′ ← {W10..W17 green}"). A red design wave
  blocks the merge (CI would red on master). This is the one hard inbound gate — W8′ is a close wave,
  it consumes green. (Mechanically: the merge PR's CI run IS the {W10..W17 green} verification — if any
  design wave's test/typecheck/abrogation step reds, the PR is not mergeable, and W8′ stalls until the
  design wave is repaired.)
- **N.W18 (the BA-cut consume) — PARALLEL, not blocking.** W18 may LAG on the glass-ui BA cut without
  blocking W8′ (`WAVES-2.md §2`: "W18 may lag on the BA cut without blocking W8′"). W8′'s hygiene +
  wire-deploy + doc-truth are BA-independent (no glass-ui pin move in W8′ — the pin is W18.A's, the
  registry-consumption inv-N-6 discharge). W8′ and W18 can run concurrently; only W9′ waits for BOTH.
  **The one coordination seam:** W8′'s CLAUDE.md/DESIGN.md doc-truth must NOT pre-state the BA pin
  (W18 owns it) — W8′ documents the TREE AS-IS (still `file:../glass-ui` or `^3.13.0` at W8′ time);
  W9′/W18 amends the pin doc at the BA discharge.
- **N.W9′ (v1.0.0 close) — the OUTBOUND consumer.** W9′ consumes everything W8′ leaves: a green master
  (W9′ tags v1.0.0 on it), a HEAD-lineage wire (the deployed-truth substrate W9′'s π lane re-confirms),
  a clean tree + reconciled docs (W9′'s FINAL.md cites them). W9′ owes W8′ nothing back; W8′ is the
  penultimate wave. The pin (inv-N-6, target = the BA cut) is discharged by W18.A and BOOK-gated in
  W9′ — NOT W8′'s (`WAVES-2.md §N.W9′` A: "the registry pin is discharged by W18.A").

**Cross-repo (the acyclic constellation spine — W8′ is a CONSUMER terminus, no produce-edge):**

- **glass-ui — NO W8′ edge (W18/W9′ own the BA consume).** W8′ does not pin, consume, or produce for
  glass-ui. The BA-cut registry pin is W18.A's; W8′'s only glass-ui touch is the X10 CI "glass-ui FULL
  build confirm" (verify the CI still builds glass-ui correctly post-merge — a read-only confirmation,
  not a pin move). The acyclic spine holds: glass-ui → value.js → keyframes; W8′ produces nothing
  downstream and pins nothing upstream. NEVER a `file:` link to a sibling's WIP, NEVER a vendored copy
  (`cross-repo-dev-resolution.md §2.4` prohibitions — no hard `dist/` alias, no self-alias, no
  phantom devDep; W8′'s `package.json` touch is the changesets version bump only).
- **keyframes.js — NO W8′ edge (the 0.12.0 notify was DISCHARGED; 0.13.0 is W11/W11′'s).** kf-K
  consumes value.js's PUBLISHED cuts one tranche behind (0.12.0 already feeds K.W1/K.W6 — DISCHARGED,
  `EXECUTION-ORCHESTRATION.md §0`; 0.13.0's scroll-grammar + ramp feed K.W9/K.W10 — those are N.W11/
  N.W11′'s cuts, NOT W8′'s). W8′ publishes NO library cut, so it lights NO kf consume edge. The
  retro-tag (`v0.11.2`/`v0.12.0`) is a git-history reconciliation, not a new publish — kf already
  consumes those versions from the registry. NEVER a `file:` link to kf, never a vendored grammar.
- **fourier — NO W8′ produce-edge.** The fourier-owned asks (conformance-matrix corrections, the
  fourier-web pin bump) are sibling-owned, not W8′ writes (`N.md §8` "fourier-owned"); W8′ records the
  X4 openapi table-vs-source DECISION (value.js side) but produces nothing for fourier. CH-13 fourier
  quiescence stays BOOK-with-trigger (fourier-owned — `WAVES-2.md §3`).
- **The prod wire (the deploy targets, not a repo).** W8′'s wire-deploy ceremony writes to
  `api.color.babb.dev` (the api wire — via `scripts/deploy.sh api` / the deploy-hook over the rs0
  compose) and `color.babb.dev` (the CF-Pages SPA — via `deploy-pages.yml`, green-CI-gated). These are
  DEPLOY edges, not constellation produce-edges; the rollback note (X5) into `docs/dev-deploy-standard.md`
  is the runbook half. The NCSU on-host alias retirement (X2) is an on-host op recorded honestly
  (DEC-9), not a repo write.

---

## §Design-decisions (the trade-offs RESOLVED)

- **D1 — `.gitignore` the class vs enumerate each file (resolved: a CLASS rule for the untracked,
  `git rm` for the tracked).** The W6-audit residue is a RECURRING class (5 `.w6a-audit*.mjs`
  iterations already; a sixth could appear in any future live-debug session). A per-file `.gitignore`
  enumeration re-rots the moment a `.w6a-audit6.mjs` appears. **Resolution:** a glob class rule
  (`.w6a-audit*.mjs`, `*-dataurl.txt`, `$OUT`) for the UNTRACKED debris — it pre-empts the whole
  class (`EXECUTION-ORCHESTRATION.md §2`: "`.gitignore` the audit-script class"). The two TRACKED
  `w6a-shell-*.json` are a SEPARATE op — a `.gitignore` does not untrack; they are `git rm`'d. The two
  mechanisms are not interchangeable (the §No-workaround keystone).
- **D2 — commit the staged deletions vs restore the docs (resolved: COMMIT the deletions — no-legacy).**
  CHANGELOG/CONTRIBUTING/VENDOR-POLICY were last touched at v0.10.0 (`074df9c`, "H close ceremony");
  they are superseded by the standardized `docs/` set (`docs/RELEASE.md`, `docs/dev-deploy-standard.md`)
  + the precept instructions + the changesets-managed CHANGELOG (`.changeset/`). Restoring them would
  be legacy-beside-replacement. **Resolution:** commit the `D` — the deletion is the no-legacy
  discharge (`WAVES-2.md §0` "no-legacy"). (If a future CHANGELOG is wanted, it is the changesets-
  generated one, not the hand-maintained fossil.)
- **D3 — the wire-deploy as part of W8′ vs a standalone deploy wave (resolved: FOLD into W8′ — the
  ceremony rides the merge).** The wire-deploy is structurally COUPLED to the master-merge: the
  CF-Pages deploy is green-CI-gated on a master push (`deploy-pages.yml:11-13`), so it CANNOT fire
  until W8′.A's merge greens. Splitting it into a separate wave would create a dependency on W8′'s
  merge with no work of its own. **Resolution:** the wire-deploy is W8′ Lane D.1, fired immediately
  post-merge-green; N.W4's ARTIFACTS-DONE explicitly deferred the wire to "the W8 ceremony"
  (`PROGRESS.md:18`) — W8′ IS that ceremony. The api-wire half (`scripts/deploy.sh api`) and the
  CF-Pages half (`deploy-pages.yml`) are the two deploy edges of the one ceremony.
- **D4 — retro-tag now vs let the next publish carry the tags (resolved: RETRO-TAG now — the
  tags==registry gate is W8′'s).** The registry has `0.11.2`/`0.12.0` with no git anchors; waiting for
  v1.0.0 to "carry" them would leave the gap through W9′ and violate the W8′ hard gate ("tags ==
  registry"). **Resolution:** retro-tag `v0.11.2`/`v0.12.0` annotated in W8′.A, on the commits that
  published them, so git == registry BEFORE the v1.0.0 cut (which W9′ tags fresh). The retro-tag is a
  reconciliation, not a re-publish — no npm op, no kf consume-edge change.
- **D5 — doc-truth from the tree vs from the close narrative (resolved: from the OBSERVED tree).** The
  drift root is docs frozen at the v0.9.0/G world (the version map `docs/RELEASE.md:5`, the
  parse-that `^0.7.0` `CLAUDE.md:113`, the "27 indexes") while the tree moved to 0.12.0/N (`^0.9.0`, 22
  indexes, port 8130, the collapsed `ci.yml`). **Resolution:** every doc claim is rewritten to match a
  COMMAND's output against the tree (the §State-verified probes ARE the rewrite source) — measure-then-
  write, never write-from-memory. This is the only durable fix; a write-from-the-narrative rewrite
  would re-drift the moment the next number moves.
- **D6 — W8′ vs W9′ boundary (resolved: W8′ does everything-but-the-cut; W9′ pins + π + cuts).** The
  close decomposes: W8′ owns the HYGIENE + RECONCILIATION + CEREMONY + DOC-TRUTH (mechanical, artefact-
  bearing, BA-independent); W9′ owns the PIN (inv-N-6, BA-cut target, discharged by W18) + the π
  paired before/after lane + the v1.0.0 publish + FINAL.md (`WAVES-2.md §N.W9′`). The boundary is clean:
  W8′ leaves a green-master + HEAD-wire + clean-tree + true-docs; W9′ does the four close-only acts on
  that substrate. W8′ NEVER pins glass-ui (that is W18.A/W9′) and NEVER cuts v1.0.0 (that is W9′) —
  keeping W8′ BA-independent so it runs the moment {W10..W17} green, not waiting on the BA cut.

---

**Status: RATIFIED** — this spec is DEV-phase, RATIFIED (the WAVES-2 second block ratified 2026-06-15;
`EXECUTION-ORCHESTRATION.md §0`); IMPL + the master-merge/wire-deploy ceremony dispatch on explicit
user authorization, on the run-plan's R5 (close), after {N.W10..N.W17} green and beside/after N.W18.
Every claim herein is grounded in a value.js `src/`/infra file:line or a command+output re-verified on
the working tree 2026-06-15 at `0.12.0` (§State-verified); every hard-gate clause is born-RED against
that output TODAY and greens at close (inv ε on every claim).
