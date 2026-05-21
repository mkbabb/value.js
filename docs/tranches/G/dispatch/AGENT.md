# G tranche — agent dispatch (deltas vs F)

G inherits **F's hardened dispatch contract verbatim** (`docs/tranches/F/dispatch/AGENT.md`, which itself inherits E + D + B). This doc carries only the G-specific deltas; binding clauses (hardened git, runtime evidence, worktree isolation, build hygiene, sub-gates, proof docs, hard caps, prose) are unchanged.

## G1-G4 — invariants added (`G.md §2`)

### G1 — Relay before ratification (binding)

**Every carry-forward item identified at G.W0 is presented to the user with an explicit ratification ask BEFORE any execution-phase wave dispatches.** Strengthens F1 ("No deferrals as binding") by adding the user-as-explicit-decision-maker for carry-forward dispositions.

Workflow:
1. G.W0 closes with a ratification ask block in `G.md §7` + `PROGRESS.md` "Open dependencies".
2. G.W1+ does NOT dispatch until user ratifies (or modifies) the proposed dispositions.
3. The ratification record is preserved in `coordination/Q.md` + the wave-opening commit message.

### G2 — `as any` corpus retires (target ≤ 5 in src/)

Sharpens F.W1 Lane A ("@ts-ignore=0"). The 36-site `as any` corpus in `src/` retires to ≤ 5 sites at G close. Irreducible residue (~5) is external-library boundary casts (parse-that signatures, DOM event surfaces) — POLICY-documented in module header comments + listed in `VENDOR-POLICY.md`-analogue section.

Pre-condition: G.W1 Lane B (color/utils.ts decomposition) complete (easier to type-strengthen 7 focused modules than 1 god-module).

### G3 — Color utils decomposition (target ≤ 7 modules ≤ 350 LoC each)

`src/units/color/utils.ts` (1,430 LoC) decomposes into 7 focused modules per `feedback_no_god_modules.md`. The barrel (`src/units/color/index.ts`) re-exports all public functions; no consumer change.

### G4 — Invariant codification (4 proof scripts)

Add corpus-grep proof scripts that codify F's and G's invariants as runtime artefacts:
- `scripts/proof-no-deprecated.mjs` (codifies F2; ≤ 50 LoC).
- `scripts/proof-no-ts-ignore.mjs` (codifies F.W1 Lane A; ≤ 50 LoC).
- `scripts/proof-as-any-budget.mjs` (codifies G2; ≤ 80 LoC — includes budget tracker).
- `scripts/proof-resolution-contract.mjs` extension (F.W3 Lane F successor; types-key probe).

Each script wires into `package.json` scripts + CI workflow (post-build).

## Cross-repo writes — G default ZERO

Per `G.md §5` file ownership: G makes ZERO cross-repo writes by default. The keyframes.js peer commit `470814e` (LOCAL ONLY at F close per F3 invariant) push is a RATIFICATION ITEM (G.md §7 R11), not a G-authorized cross-repo write.

F3 invariant inherited verbatim: cross-repo writes require explicit authorization + the codemod-style narrowness (parity-asserting + idempotent + dry-run-safe).

## Worktree-base pinning (carried verbatim from E.W1 D-lesson)

When dispatching with `isolation: "worktree"`, the agent's prompt MUST cite the target HEAD SHA explicitly. The agent verifies `git -C <repo> log -1 --format=%H HEAD` matches BEFORE doing any work; mismatch escalates immediately.

## Library transposition reviews (G.W1 Lane B + G.W2 lanes)

G.W1 Lane B (color/utils.ts decomposition) is the SINGLE LARGEST agent dispatch in G. The dispatching agent receives:
- Strict module boundaries (per G3 plan in `G.md §2` + `waves/G.W1.md`).
- The barrel hygiene contract — `src/units/color/index.ts` re-exports all public functions; consumer-side tests unchanged.
- A vitest re-run after the move (must remain 1584/34 GREEN).
- A `dist/value.js` byte comparison before/after (Rolldown-side moves preserve tree-shaking — the bundle MUST stay ≤ 148,480 bytes; expect ~0 byte change since deletes + re-exports are byte-equivalent).

G.W2 lanes (4 typed strengthening lanes) each close on:
- Pre/post `grep 'as any' src/ | wc -l` count delta (must drop per the lane's target).
- vitest 1584/34 still GREEN.
- `npx vue-tsc --noEmit | grep -c 'error TS'` = 0 (must not regress).

## v0.9.0 release (G.W4)

G.W4 lands the close ceremony + v0.9.0 tag. Per `G.md §8`:
- **BREAKING decision** at G.W2 Lane C dispatch: if `Color<T>` typed channel accessor is BREAKING, v0.9.0 is minor-bump with one BREAKING. Otherwise INTERNAL-only minor-bump.
- All G.W3 changes are INTERNAL.

Pre-merge gate matrix at G.W4 extends F's 14-item matrix with up to 4 G-NEW items:
- G-NEW: `proof:no-deprecated` GREEN (codifies F2).
- G-NEW: `proof:no-ts-ignore` GREEN (codifies F.W1 Lane A).
- G-NEW: `proof:as-any-budget` GREEN (`grep 'as any' src/ | wc -l` ≤ 5).
- G-NEW: `proof:resolution` extended types-key probe GREEN.

Plus the inherited 14 from F.W4.

Total G.W4 pre-merge matrix: **18 items**.

## CW Phase-2 (not in G scope, RETIRED as value.js participation)

Per `coordination/Q.md §4.1`: speedtest does NOT consume value.js. CW Phase-2 framing is INFORMATIONAL ONLY at G open. G does NOT activate; user-discretionary.

## Parallelism

- G.W0: 6 audit lanes (DONE) + substrate authoring (orchestrator).
- G.W1: 4 lanes (A: CI fix, B: color/utils decomposition, C: api/CLAUDE.md fix, D: state-at-open). A + C + D dispatch in parallel; B is the longest single-actor lane (dispatch separately).
- G.W2: 4 lanes (one per G-OPP). Sequential by default — typed strengthening builds on the decomposed modules. May parallelize G-OPP-2 + G-OPP-5 (file-disjoint).
- G.W3: 8 lanes. Largely file-disjoint; can parallelize as Group 1 (SCRIPTS-1/2/3/4 — all in `scripts/` + `package.json`) + Group 2 (API-1/2 — both in `api/`) + Group 3 (E2E-1 — `e2e/smoke-mobile/`) + Group 4 (CI-2 — `.github/workflows/`).
- G.W4: 7 close-audit lanes (read-only parallel) + close-ceremony writes (orchestrator).
