# U.W-CANON — the wave ledger walk (close artefacts · zero-drop disposition roll)

**Wave**: U.W-CANON — CANON · HYGIENE · BUILD-TOOLING · LEDGER-TRUTH · **STRUCTURAL** (no visual
claim; every family carries a mechanical DELTA in lieu of a π-frame). **Spec of record**:
`registry.md §4/§5/§13/§17/§19` + `../waves/U.W-CANON.md`. **Assembled by**: the LEDGER-and-PRECEPT
lane, from the four sibling lanes' materialized returns (their landed commits) + this lane's own
U-F17/U-F75 authorship. **Feeds**: U.W-CLOSE's tranche-wide zero-drop ledger walk (and the eventual
tranche `FINAL.md`).

**PP-16 binds** — gates-pass / goal-not-fully-landed closes `complete_with_misses`: recorded
honestly below, **zero silent drops** — all **18 CANON-native families + the inherited U-F19 AB-1
residue = 19 family homes** reach a DECIDED disposition; the families whose cure is an out-of-fence
Lane-C/D action or an owner-decidable are named with their execution-state, not dropped.

---

## §1 Goal criterion (recap) · the wave's verdict

*"The tree tells the truth about itself."* The canon docs regenerably in sync with the tree; the
library's own barrels coherent under a standing parity gate; the one ratified-then-reversed decision
(Q4 WELL → glass-ui veil) **honestly amended**; the boot GroundRecord single-sourced; the
build/pack/lint/typecheck/size tooling **measures what it claims**; the repo-hygiene traps closed.

**Verdict**: **13 of 19 homes LANDED + gate-GREEN** at this stamp (the four sibling lanes' commits +
this lane's two authored artefacts); **1 RETIRE-into-census** (U-F19 AB-1, cure already in the tree);
**4 execution-pending** out-of-fence Lane-C/D actions (U-F23 boot single-source · U-F51 branch
delete · U-F52 scratch sweep · U-F53 worktree prune), each DECIDED + named with its execution-state;
**1 relayed-and-recorded** owner-decidable residual (U-F75 precept pin-advance). No silent drop.

---

## §2 The §Dispositions roll — all 19 family homes (7 build · 3 fold · 8 retire + AB-1 residue)

Legend for **state**: **LANDED** (committed this wave, gate GREEN) · **AUTHORED** (this lane's
ledger row, GREEN by content) · **RETIRE-census** (cure in tree, census not-red) · **PENDING**
(decided; cure is an out-of-fence Lane-C/D action, gate still RED at this stamp) · **RELAY-record**
(discharged at source, residual booked).

### Cluster 1 — LEDGER-TRUTH

| Family | Disp | State | DELTA (before → after) | Gate | Evidence |
|---|---|---|---|---|---|
| **U-F17** `q4-well-veil-silent-reversal` | build | **AUTHORED** (this lane) | §4-amendment-rows **0 → 1** (T.md "STANDS" superseded); reversal-locus named | **G-CANON-1** born-RED → **GREEN** | `canon/q4-well-amendment.md`; `T.md:391,682` · `ComponentSliders.vue:26 surface="veil"` (`ad301e7`) |
| **U-F23** `ground-record-forked-read` | build | **PENDING** (Lane D · `demo/**` fence) | hand-duplicated boot constants **2 → 0** (single-sourced) — **RED at stamp**: `index.html:173 var VERSION = 1` still hand-typed | **G-CANON-4** born-RED (still RED) | `demo/color-picker/index.html:169,173`; single-source (vite-inline / codegen) is Lane D's cure; re-probe at U.W-CLOSE |

### Cluster 2 — CANON-SYNC

| Family | Disp | State | DELTA | Gate | Evidence |
|---|---|---|---|---|---|
| **U-F21 + U-F69** `canon-structure-drift` + `parse-that-doc-lie` | build (F69 joins F21) | **LANDED** `a31f2d1` | canon-sync-lies **4 → 0** (root+api Structure regen · README "15"→17 @ :11,:68,:77 · parse-that "shipped 2.0.1" struck → pinned `^1.0.0`/1.0.0) + `demo/CLAUDE.md` (10→11 DESIGN sections) + `demo/DESIGN.md` facilities reconciled | **G-CANON-2** born-RED (7/8 assertions RED) → **GREEN** | `test/dist/canon-sync.test.ts` (regenerable: counts DERIVE from the tree — `spaces.ts`, `package.json` pin, `db.ts`/`collections.ts`, DESIGN §-count, every Structure path resolved on-disk) |
| **U-F22** `barrel-parity-drift` | build (cure 10 + MINT the crown gate) | **LANDED** `43a196e` (+ wired `6bed451`) | barrel-drift symbols **10 → 0** (ADDITIVE); parity-gate **absent → present (CI-wired)** | **G-CANON-3** born-RED (15 violations) → **GREEN** (0) — **STANDING, CI-wired** | `scripts/gates/proof-barrel-parity.mjs`; `src/index.ts` +19 · `src/subpaths/color.ts` +6 (ICtCp/Jzazbz) · `src/subpaths/parsing.ts` +10 (timeline List/Named + raytrace/boundary); allowlist = 12 parse-that-COUPLED omissions |
| **U-F75** `precept-stale-label` | retire | **RELAY-record** (this lane) | stale precept label **1 → 0 at source** (upstream `origin/main` `8781ebb` already removed the `palette` row; +40 from the pinned `63240e6`) | none (one-shot) | `canon/precept-label-relay.md`; fork-on-stale-base REJECTED (E-3 no-shim + would orphan the gitlink); pin-advance BOOKED owner-decidable |

### Cluster 3 — BUILD-TOOLING

| Family | Disp | State | DELTA | Gate | Evidence |
|---|---|---|---|---|---|
| **U-F63** `npm-pack-ships-demo` | build | **LANDED** `6bed451` | tarball demo payload **9 `dist/gh-pages/` entries → 0** | **G-CANON-6** born-RED → **GREEN** | `package.json files` negation globs (`!dist/gh-pages`, `!dist/gh-pages/**`); `scripts/gates/proof-pack-manifest.mjs` (config + behavioral clause) wired into `test:dist`; deploy UNAFFECTED (reads `dist/gh-pages/` off disk) |
| **U-F64** `size-gate-blind` | retire/re-anchor | **LANDED** `6bed451` | size-gate coverage **14.9 KB facade → chunk-graph total** (real `.` = 192 387 B over 11 chunks; budget ≤ 210 KB, ~12% headroom) | **G-CANON-8** born-RED (facade 15 226 B passed while real 192 387 B) → **GREEN** — **STANDING, CI-wired** | `scripts/gates/proof-size-graph.mjs` replaces the facade byte-count step in `ci.yml` |
| **U-F65** `lint-vacuity` | fold (owner call) | **LANDED** `a31f2d1` — **ACCEPT path** | lint depth ~0 rules → **types+review posture formally ACCEPTED** (recorded) | none (owner-call, ACCEPT → no gate) | **Owner-call DECISION: ACCEPT** (not restore) — `eslint.config.js` unchanged/permissive; one-line lint-depth rationale landed in `CLAUDE.md §Test+verify`, reconciled with the existing "type system + eslint + review" framing (not duplicated) |
| **U-F66** `typecheck-stale-dist` | fold (owner call) | **LANDED** `6bed451` — **PRETYPECHECK path** | typecheck freshness **stale-dist → fresh** (`pretypecheck: npm run build`) | **G-CANON-10** (conditional) armed → **GREEN** | **Owner-call DECISION: PRETYPECHECK** (not documented-dependence) — a src type change is now visible to the demo typecheck against a fresh dist; the value.js library build is substrate-independent (`src/` never imports glass-ui, inv-K-1) |
| **U-F70** `root-zod-orphan` | retire | **LANDED** `6bed451` | root unused deps **1 (zod) → 0** | **G-CANON-9** born-RED (present + 0-import) → **GREEN** (absent) | `package.json:152` zod removed + lock refresh; api's own zod untouched (separate tree) |
| **U-F71** `dev-toolchain-advisories` | fold (batch bump) | **LANDED** `6bed451` | dev-audit hits **2 → 1**; production audit (`--omit=dev`) **clean (0)** | none (verification, not a standing gate — dev advisories churn) | within-range lock refresh cleared the js-yaml moderate; residual esbuild low is dev/build-only (transitive via vite/vitest, effects=[], no safe within-range fix) |

### Cluster 4 — REPO-HYGIENE

| Family | Disp | State | DELTA | Gate | Evidence |
|---|---|---|---|---|---|
| **U-F49** `gitignore-auth-unanchored` | build | **LANDED** `e57f541` | silent-drop trap **1 unanchored `auth/` → 0** (`/auth/` anchored); tracked-source guard green | **G-CANON-5** born-RED → **GREEN** | `.gitignore:8` `auth/`→`/auth/`; `test/dist/gitignore-auth.test.ts`; also carved `test/dist/` out of the equally-unanchored `dist/` ignore |
| **U-F24** `dead-orphans` + `over-export-hygiene` | retire (orphans) + **RULE** (over-export) | **LANDED** `e57f541` | dead orphans **3-4 → 0**; over-export **RULED leave-as-is** | none (orphan-delete verify-at-execution; over-export RULED not built) | retired: api `migrate-soft-delete.ts` (delete-after-run convention), `__resetServicesForTest` (`inject-services.ts`, dead seam), the prng radii trio (`hashString`/`randomRadii`/`radiiToCSS`; `mulberry32` kept LIVE). **RULE rationale** (BOOKED to the walk): the ~150 over-exports are **idiomatic type aliases + testability seams**, not accidental leaks — the registry's own candidate verdict; leave-as-is is an explicit decision, not an un-audited gap |
| **U-F50** `tracked-binary-bloat` | retire | **LANDED** `e57f541` | tracked-binary MB **58 → 0**; shot-policy **absent → present** (no tracked file > 4 MB outside allowlist) | **G-CANON-7** born-RED → **GREEN** | `git rm` the 58 MB N-tranche heapsnapshot from the tip; `test/dist/shot-policy.test.ts`; history-rewrite out-of-scope (BOOKED owner-decidable, §4) |
| **U-F51** `stale-local-branches` | retire | **PENDING** (Lane C · git action) | orphan branches (0-unique-merged) → 0 (live DELETE-LAW) | none (one-shot) | candidate at stamp: `post-refactor` (`fafb403` "tmp partial commit"); published `tranche-*` + origin-tracked branches PROTECTED. `git branch -d` after a `--merged master` + `git cherry` proof, at a T.W8-safe moment |
| **U-F52** `scratch-accumulation` | retire | **PENDING** (Lane C · working-tree sweep; `docs/tranches/T/**` NOT this lane's fence) | untracked scratch 1.8 GB → swept (0.5 MB exposure triaged) | none (working-tree sweep) | `docs/tranches/T/audit/pi/` still untracked-present at stamp; the `*.png` ignore guards the bulk re-accumulation; sweep is Lane C's, at a T.W8-safe moment |
| **U-F53** `worktree-prune-proof` | retire | **PENDING** (Lane C · git action) | prunable worktrees (4-clause-passing) → 0 WITH proof; protected left | none (moment-in-time) | multiple ACTIVE lane worktrees at stamp (oracle-testint, wf_237d5120-d5a-1/2, …) → prune-law 4th clause (NOT while lanes land) DEFERS to a safe moment; the 4-clause proof (`git worktree list` + per-worktree `git status` + `git cherry`) delivered at execution |
| **U-F70** — build-tooling (above) | | | | | |

### Inherited W8-census residue

| Family | Disp | State | DELTA | Gate | Evidence |
|---|---|---|---|---|---|
| **U-F19 AB-1** `about-katex-boot-scope` | **build-if-CENSUS-RED** → resolves **RETIRE-census** | **RETIRE-census** | About-KaTeX scope-dead seam: doubled render layers **2 → 1**; brace SVG **6400px → contained** — a DOM/SVG-geometry DELTA, GPU-INDEPENDENT | none (one-shot build-if-RED; census verdict is the trigger) | **Census did NOT red it**: `census.md:65` static pointer to U.W-CANON, "**Not a VISUAL material row**"; sibling T-53 material half **CENSUS-GREEN** (`census.md:48`, row 11). The boot-scope cure is **ALREADY IN THE TREE** — `Katex.vue:8-20` the KaTeX stylesheet is a **GLOBAL script-side import** (T.W8 remediation_1, un-scopeable by construction → the 231 dead-scoped rules now match; MathML hidden by `.katex-mathml{clip}`; brace SVG contained). → **RETIRES into the census record**; no CANON boot-scope build seam needed. Closes the two-wave "T-53/AB-1 → VISUAL/CANON" routing (both sides carry it) |

---

## §3 The born-RED gate ledger (G-CANON-1..10)

| Gate | Family | Born-RED (wave-open) | GREEN evidence | Standing? |
|---|---|---|---|---|
| **G-CANON-1** | U-F17 | no §4 amendment; `T.md:391`/`:682` read "STANDS" | amendment row authored U-side (locus named · WELL superseded · lesson-15 law · T.md pointer BOOKED) — `canon/q4-well-amendment.md` | ledger-content (one-shot) |
| **G-CANON-2** | U-F21+F69 | 7/8 canon-check assertions RED (live lies) | `test/dist/canon-sync.test.ts` GREEN — every count/structure/pin regenerated from the tree | test:dist |
| **G-CANON-3** | U-F22 | 15 barrel violations | `proof:barrel-parity` GREEN (0); wired into `test:dist` | **CI-wired STANDING** |
| **G-CANON-4** | U-F23 | `index.html:173 var VERSION=1` hand-typed | **RED at stamp** — flips GREEN at Lane D's single-source cure | boot-read (one-shot; Lane D) |
| **G-CANON-5** | U-F49 | `.gitignore:8 auth/` unanchored matches the source dir | `test/dist/gitignore-auth.test.ts` GREEN | test/dist |
| **G-CANON-6** | U-F63 | 9 `dist/gh-pages/` entries in the tarball | `proof:pack-manifest` GREEN (0); wired into `test:dist` | test:dist |
| **G-CANON-7** | U-F50 | 58 MB tracked heapsnapshot | `test/dist/shot-policy.test.ts` GREEN (>4 MB outside allowlist ⇒ fail) | test/dist |
| **G-CANON-8** | U-F64 | facade 15 226 B passed ≤148 480 while real 192 387 B | `proof:size-graph` re-anchored to the chunk-graph total in `ci.yml` | **CI-wired STANDING** |
| **G-CANON-9** | U-F70 | root zod present + 0-import | zod removed + lock refresh | one-shot |
| **G-CANON-10** | U-F66 | no `pretypecheck`; typecheck resolves stale dist | `pretypecheck: npm run build` (PRETYPECHECK path chosen) | one-shot |

**No born-RED for**: U-F65 (owner-call ACCEPT → no gate) · U-F71 (verification `npm audit --omit=dev` clean, not a standing gate) · U-F24 over-export (RULED leave-as-is) · U-F51/F52/F53/F75 (retires — one-shot verify-at-execution done-states) · U-F19 AB-1 (census-verdict-triggered, resolved RETIRE).

**The two STANDING CI-wired gates → BOOKED to U.W-CLOSE's re-probe**: **G-CANON-3** (barrel-parity)
and **G-CANON-8** (size-graph) are re-probed live at close (GREEN and STILL guarding) — the crown
deliverable is a live standing guard, not a one-shot fix.

---

## §4 §BOOKS (what rides forward — by name, zero drop)

1. **The `T.md §4` pointer-line → T.W8 / T-close** (U-F17). U authored the amendment U-side; the
   one-line `T.md §4` pointer ("superseded — see U-F17 amendment; the console material is the
   glass-ui veil, `ComponentSliders.vue:26`/`ad301e7`; the ratified rung-2 WELL no longer live") is
   BOOKED to T's own close (T owns its ledger edit; U's path-scope forbids the foreign edit).
   Exact text in `canon/q4-well-amendment.md §5`.
2. **The precepts pin-advance (U-F75) → owner-decidable / constellation precepts-adopt.** The stale
   label is already superseded upstream (`origin/main` `8781ebb`, +40); advancing value.js's gitlink
   `63240e6 → origin/main` is a broad precepts-adopt event, out of this label-lane's scope.
   `canon/precept-label-relay.md §4`.
3. **The pack-history reduction (U-F50) → owner-decidable.** Tip-removal + shot-policy landed; the
   git-HISTORY rewrite (to reclaim the packed 58 MB) is a coordinated force-push event, out-of-scope.
4. **The over-export leave-as-is RULE rationale (U-F24) → this walk (recorded above, §2 Cluster 4)**
   so no successor re-audits the ~150 as an open gap.
5. **The barrel-parity + size-graph gates (U-F22/F64) → U.W-CLOSE re-probe** (the two STANDING
   CI-wired guards; §3).
6. **U-F71 dev-dep advisories → a rolling `npm audit` watch** (not re-booked as a U family; dev-dep
   churn is not a tranche defect).
7. **The chronic cross-repo spec-status 7-set** (CH-10 · CH-13 · FN-7 · kf `resolveEasing` · R8-23 ·
   R-5 · R-10) **→ a rolling spec-status WATCH.** KEEP-BOOKED: **no fired trigger crosses value.js's
   consume-edge**; `random()` Safari-only, scroll-timeline Firefox-behind (NOT Baseline), kf's easing
   touch is a kf-internal subpath refactor — none a value.js-consume decision. A watch, not an ask;
   §5 stays not-triggered. Recorded so no successor mistakes the 7-set for dropped.

---

## §5 §Cross-repo RELAY — CHECKED, found NOT-triggered (the honest declaration)

U.W-CANON is checked against each E-2 relay clause and found **entirely value.js-repo-internal**:

- **U-F17** records a glass-ui-veil REVERSAL but changes **no** glass-ui surface — a value.js-side
  ledger amendment (the material still-red is U-F10's row in U.W-VISUAL, which carries its own
  producer RELAY). Truth-recording, not a component change → no relay.
- **U-F22** changes value.js's OWN barrel exports but the fix is **ADDITIVE ONLY** (removes/renames
  no consumed symbol; none of the 10 drifted symbols is on glass-ui's or keyframes' consumed
  surface) → the "shared exports" clause is checked and not-triggered.
- **U-F75** edits a PRECEPT tree (already superseded upstream); relayed-and-recorded via the precept
  dev process under the foreign-tree fence — a precept-tree concern, not a glass-ui-component change.

**No convention change, no producer surface, no consumed-export break ships from this wave** → E-2
discharged by the CHECK (the honest declaration), not by a communiqué row. The U-formation BH
communiqué (`17e0f522`) already carries the cross-repo coupling other waves own; U.W-CANON adds
nothing to it.

---

## §6 Landed-commit index (the sibling lanes' materialized returns)

| Commit | Lane | Families |
|---|---|---|
| `a31f2d1` docs(canon-sync.p1) | A (canon-docs) | U-F21 · U-F69 · U-F65 (ACCEPT rationale) · G-CANON-2 |
| `43a196e` fix(U-F22 barrel-parity) | B (build-tooling) | U-F22 · G-CANON-3 (MINT) |
| `6bed451` build(pack/size/typecheck/deps) | B (build-tooling) | U-F63 · U-F64 · U-F66 · U-F70 · U-F71 · wire G-CANON-3/6 into CI |
| `e921994` fix(package.json conflict) | B (build-tooling) | test:dist chain conflict-marker resolve (merged proof:dts-surface + barrel-parity + pack-manifest) |
| `e57f541` chore(repo-hygiene) | C (hygiene) | U-F49 · U-F50 · U-F24 · G-CANON-5/7 |
| *(this commit)* docs(ledger + precept) | LEDGER (this lane) | U-F17 (amendment) · U-F75 (relay) · this walk |

**Execution-pending at this stamp** (out-of-fence Lane-C/D actions, decided + named, not dropped):
U-F23 (Lane D boot single-source) · U-F51 (branch delete) · U-F52 (scratch sweep) · U-F53 (worktree
prune) — each re-probed at U.W-CLOSE.

---

## §7 PP-16 close honesty

Gates that landed are GREEN (G-CANON-1/2/3/5/6/7/8/9/10 — nine of ten; G-CANON-4 is Lane D's
execution-pending boot single-source, RED at this stamp by design). The wave's structural goal —
*the tree tells the truth about itself* — is met for every LANDED surface and honestly recorded for
every PENDING one. No family is silently dropped: **19 homes decided**. Per PP-16, the CANON wave's
contribution closes **`complete_with_misses`** at the tranche level only if a gate-passes /
goal-unmet residual survives to U.W-CLOSE (the four Lane-C/D execution-pending actions + the two
owner-decidable BOOKs are the honest residuals); each is named here so U.W-CLOSE's walk inherits a
zero-drop ledger.
