# V · pass-1 · SPEC — Family 6 · BIG-BANG CODEMOD TRANSPOSITION

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer.**
Distilled from `f6-big-bang-codemod.md` (Family 6, measured — blast surface counted by regex over
`.ts`/`.vue`/`.css` specifiers; glass-ui's `CODEMOD-SPEC.md` + `codemod-glass-alias.mjs` read READ-ONLY).
Mechanism concrete for D1–D4; no ranking.

---

## §0 The mechanism (what structure is DERIVED FROM)

**ATOMIC TRANSFORMATION via codemod.** Design the FINAL tree fully on paper (spec-complete, per surface),
then execute each surface as ONE atomic codemod-driven move: a script rewrites every import specifier,
`git mv` relocates files, and the whole surface lands in a SINGLE reviewable commit — no strangler, no
dual paths, clean break. This is the **big-bang** pole of the charter's axis (F6 vs F5). The substrate is
the codemod, not the gate or the graph.

**The load-bearing tooling correction (gap a — `ts-morph` is the WRONG substrate)**:

| tool | present? | `.vue` `<script setup>` | verdict |
|---|---|---|---|
| ts-morph | **NOT installed** | CANNOT parse SFCs (TS AST only) | wrong tool |
| jscodeshift | 17.3.0 installed | CANNOT parse SFC natively | partial |
| **glass-ui regex codemod** | proven in BH | handles `.vue` as **text** + fail-closed audit | **the mechanism to reuse** |

**The 67% fact**: the `@`-blast is **351 import specifiers**, split **`.vue` 236 (67%) / `.ts` 115 (33%)**.
Two-thirds live inside `.vue` `<script setup>`, which neither AST tool parses without an SFC extract
wrapper — an AST codemod silently SKIPS 236 of 351 sites. glass-ui's proven mechanism
(`codemod-glass-alias.mjs`) regex-rewrites the quoted **specifier position** over all `CODE_EXT` treating
`.vue` as text, **paired with an exhaustive fail-closed audit** (`ANY_SRC_RE` finds every alias occurrence;
any not covered by a specifier-rewrite must reduce to 0 unsafe). **The audit, fail-closed, is the
correctness proof; the regex is just the edit.** Its dryrun: 492 rewrites / 166 files / `SAFE:true`.

---

## §1 · D1 — demo/ frontend (F6's strongest surface: the 351-site `@` abrogation)

Author the target demo tree spec; ONE codemod rewrites all 351 `@`-imports → relative/flat and `git mv`s
the tree; demo flattens in one commit. **Measured blast surface** (the move budget):

| surface | count | note |
|---|---|---|
| import specifiers to rewrite | **351** | `@components` 162 / `@lib` 87 / `@composables` 95 / `@utils` 7 |
| — of which `.vue` / `.ts` | **236 / 115** | 67% inside SFC `<script setup>` |
| physical files to `git mv` (`demo/@/**`, non-vendored) | **221** | 242 total − 21 vendored `ui/` |
| — of which `.vue` / `.ts` / `.css` | 90 / 145 / 7 | |
| alias DEFINITIONS to remove | **2 files** | `tsconfig.demo.json` `paths` + `vite.config.ts:87–91` |
| test-mirror files referencing `@` | **4** (~7 sites) | `test/{aurora-bracket,value-domain-clamp,ink,session-single-source}.test.ts` |
| CSS `@import` alias sites | **0** | value.js CSS is simpler than glass-ui's |

**The divergence from glass-ui (heavier class)**: glass-ui's `@glass` was a SINGLE alias prefix over `src/`
(its demo "rides the alias," no move-map); value.js abrogates **6 physical alias prefixes rooted at a
PHYSICAL `demo/@/` dir**. So value.js's D1 = glass-ui's **resolve-and-recompute + physical-move class**,
not its alias-only segment-drop — but a strict SUBSET of what glass-ui already shipped atomically (568
files + 91 moves). The codemod is: (1) 6 `PREFIX_RE`s `@components/…`→relative (or the `elide()` segment-
drop `demo/@/`→`demo/`), (2) the physical move-map (221 files), (3) the same fail-closed audit.

## §2 · D2 — api/ backend

One commit IF api needs the `api/model/lib` reshape — but F1/F3 measured api as verify-not-restructure
(0 boundary violations), so D2 under F6 is likely a **no-op** unless the vocabulary conform is elected.

## §3 · D3 — src/ library

One commit per god-module carve: the codemod extracts own-exports to kind-named siblings + rewrites
importers. The concrete carves it executes (supplied by the shape families): the `units/index.ts`
value-model carve (F4), the color-SCC carve (F2: redirect 11 `from ".."` + move `ch` → `channel.ts`), the
`src/index.ts`/`parsing/index.ts` barrel-purity carves (F1). **CC-caveat**: any src export-map
DE-INDIRECTION (killing `subpaths/` to expose flat peers, the glass-ui-5.1.0 class) inherits the
atomic-vs-publish hazard — for src, follow the ZERO-export-churn posture (carve behind the untouched 8-key
map; defer de-indirection exactly as glass-ui did).

## §4 · D4 — repo hygiene

One sweep deletes `plugins/` (AFTER wiring-verify — both plugins are live-wired, so relocate/inline, not
bare delete), the 39 PNGs, `.lighthouseci/`, the overfit gates. **CC-2 fold**: any dead-code deletion in
the sweep MUST union `{product ∪ test ∪ e2e}` reachability (else it deletes `conversions/index.ts`, the
test-only-alive barrel).

---

## §5 · Reviewability + the fence (gaps b, c — both portfolio hazards REFUTED by measurement)

- **Fence (gap b)**: the portfolio feared "a 214-file move is a merge-conflict BOMB vs the concurrent
  U.W-CLOSE." Measured: **1** distinct `demo/@/` product file touched across the last 30 `tranche-u`
  commits; U.W-CLOSE is docs-scoped (audit/manifest/FINAL). **The conflict surface is ~1 file, not 214** —
  and moot regardless: charter §2 defers the codemod to the eventual wave, not mid-close.
- **Reviewable (gap c)**: YES, via ORACLE not eyeball. `vue-tsc --noEmit` **exit 0** after the flatten IS
  the completeness+correctness proof (every rewritten specifier resolving). The human reviews the SCRIPT +
  the dryrun JSON (`totalRewrites`, `filesTouched`, `unmatchedREVIEW_unsafeIfNonzero: 0`), NOT the 221-file
  diff. **Phase-1-rewrite-in-place / Phase-2-physical-move** ordering preserves git rename detection
  (`git log --follow` survives). Per-surface atomicity is viable; sub-split only for review ergonomics,
  which the oracle removes.

## §6 · Reuse (gap d — glass-ui's CODEMOD-SPEC is DIRECTLY reusable, + 3 pre-mapped bugs)

- **REUSE directly**: the `SPECIFIER_RE` + `ANY_SRC_RE` fail-closed audit pair; the dryrun-report shape;
  the `elide()` "one segment-drop, tail preserved, NO module resolver needed" insight (`demo/@/`→`demo/`).
- **ADAPT**: swap the single `@glass/` prefix for value.js's **6 alias prefixes → relative**; add the
  **physical move-map** (glass-ui's demo needed none).
- **The 3 glass-ui execution bugs, PRE-MAPPED to value.js**: (1) mirror-tree corruption — value.js's **4
  `test/*.ts`** files import demo composables via `@` (~7 sites) → MUST flatten atomically in the same
  pass (e2e/ is clean, 0 `@`-refs); (2) no-dist TS2307 noise — demo imports `@mkbabb/value.js[/subpath]`
  from `dist/*.d.ts` → the flatten proof MUST build/symlink `dist` first, or scope pass/fail to
  `@components|@lib|…` specifiers, else `typecheck` shows phantom errors; (3) meta-gate self-reference —
  any `@`-ban gate exempts its own file.

## §7 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree — never merged)

1. **Adapt glass-ui's codemod** for value.js's 6 prefixes + move-map; **run DRYRUN** → report
   `totalRewrites` (expect ~351), `filesTouched`, and `unmatchedREVIEW_unsafeIfNonzero` (MUST be **0**).
   The dryrun JSON IS the reviewable evidence artifact.
2. **Execute for real** in the isolated worktree (build/symlink `dist` first per bug 2; flatten the 4
   `test/*.ts` in the same pass per bug 1) → **`npm run typecheck` (vue-tsc) exit 0** as the completeness
   oracle. Evidence: the dryrun JSON + the typecheck exit code. The worktree is EVIDENCE, never a landing.
3. **Confirm git rename detection**: `git log --follow` survives on a sampled moved file (Phase-1/Phase-2
   ordering).

## §8 · Honest current weaknesses

- **F6 is HOW, not WHAT** — its correctness is only as good as the target-tree SPEC it executes. The
  residual risk that SURVIVES both refuted legs: **if the paper target tree is wrong, the whole leap is
  wrong.** The codemod faithfully executes a design; it does not validate it.
- **Mitigation (from glass-ui's practice)**: gate the commit on the DRYRUN report
  (`unmatchedREVIEW_unsafeIfNonzero == 0` + expected `totalRewrites`/`filesTouched`) BEFORE the real run,
  so a wrong pass fails loud in dryrun, not in the landed tree.
- **The src export-map de-indirection** (if attempted) inherits the atomic-vs-publish hazard — F6 must
  follow the zero-export-churn posture for src (§3), same as F1.

## §9 · Composition (facts, NOT a ranking)

F6 answers **HOW** (the big-bang execution vehicle) for whichever SHAPE thesis (F1/F2/F3/F4) supplies the
target tree. It literally reuses glass-ui's `CODEMOD-SPEC.md` + `codemod-glass-alias.mjs` (aligns on
MECHANISM), and pairs with a minimal F5 born-RED gate to hold the line after the leap — f6's own stated
convergence: "one shape thesis × F6 execution × a minimal F5 gate." **Convergence facts**: the carves F6
executes on src (units/index.ts, the color-SCC, the barrel-purity siblings) are the SAME nodes F1/F2/F4
reach; the dryrun-report-gate mechanism is the same fail-closed audit discipline glass-ui proved and F5
would wire as standing.
