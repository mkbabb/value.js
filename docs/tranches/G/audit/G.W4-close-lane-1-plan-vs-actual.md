# G.W4 close-audit Lane 1 — plan-vs-actual

**Audit type**: read-only. No git operations, no code/artefact modification.
**Auditor**: G.W4 close-audit Lane 1 (plan-vs-actual).
**Date**: 2026-05-22.
**HEAD at audit**: `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26`, branch `tranche-g`.
**Scope**: every G wave's PLANNED scope (G.md §3, waves/G.W0..G.W4.md) vs what ACTUALLY landed (`git log 704195e..HEAD` + PROGRESS.md close sections).

---

## Pre-flight

- `git rev-parse HEAD` = `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26` — MATCH (`3a25f32...`).
- branch = `tranche-g` — MATCH.
- Pre-flight **PASS**. Audit proceeds.

---

## Commit ledger (the G window)

`git log --oneline b745c0e^..HEAD` — full G commit history:

| SHA | Wave | Subject |
|---|---|---|
| `b745c0e` | G.W0 | open Tranche G (planning-only) |
| `0b9832c` | G.W0 | user ratification received — G.W0 closed, G.W1 unblocked |
| `a2e03de` | G.W0 | peer-repo deep audits — glass-ui + keyframes.js + speedtest |
| `704195e` | G.W0 | G scope expansion — 11 peer-audit FOLD items ratified |
| `96894eb` | G.W1 | Lane A — CI CHANGELOG-gate base-ref fix |
| `413b47e` | G.W1 | Lane B — decompose color/utils.ts 1430 → 9 modules |
| `195b834` | G.W1 | Lane C — api/CLAUDE.md services drift fix |
| `27f2183` | G.W1 | Lane B remediation — assets/docs repointing |
| `ab6c744` | G.W1 | Lane D — state-at-G-open baseline + G.W1 close |
| `23ec904` | G.W2 | Lanes A+B — typed getColorSpaceBound + DIRECT_PATHS |
| `ef8a80b` | G.W2 | Lanes C+D — typed Color<T> accessor + unwrapDeep + as-any → 0 |
| `bda584c` | G.W2 | Lane E — useBreakpoint adoption (4 demo sites) |
| `1be6d15` | G.W2 | Lane F — PaletteSlugBar Button shim |
| `c57ec01` | G.W2 | G.W2 close |
| `61314fa` | G.W3 | Lanes A,B,C,D,H,I,J,K — 6 proof scripts + proof:resolution ext |
| `277e04a` | G.W3 | Lanes E+F — withTransaction expansion + engines.node |
| `affbe0e` | G.W3 | Lane G — mobile-walk spec |
| `3a25f32` | G.W3 | G.W3 close |

Every commit is traceable to a wave + lane. **Zero orphan commits.**

---

## Wave-by-wave plan-vs-actual

### G.W0 HEADLINE — open + 6 audits + plan substrate + ratification ask

| Planned (G.W0.md / G.md §3) | Landed | Verdict |
|---|---|---|
| 6 read-only audit lanes (G-AUDIT-1..6) | All 6 docs present in `audit/` | PASS |
| Substrate authoring (G.md, G-PROMPTS.md, findings.md, Q.md, AGENT.md, 5 wave specs, PROGRESS.md) | All present | PASS |
| Ratification ask (G1 binding) | `0b9832c` records user ratification; PROGRESS.md "G.W0 close" section | PASS |
| Peer-audit scope expansion (3 G-PEER docs, +11 FOLD items) | `a2e03de` + `704195e`; 3 G-PEER docs present | PASS |
| Q.md §2.1.1/§2.1.2/§6.A substrate items | Recorded as DONE in PROGRESS.md scope-expansion section | PASS (not separately re-verified — out of Lane 1 scope) |

**Commit-plan note**: G.W0.md §"Commit plan" specified a *single* open commit. Actual = 4 commits (`b745c0e`, `0b9832c`, `a2e03de`, `704195e`). This is an expected, benign deviation — the peer-audit scope-expansion round was issued by the user *after* the initial open, and PROGRESS.md documents it explicitly ("2026-05-21 — Peer-audit scope expansion (post-ratification)"). Documented + adjudicated. Not a discrepancy.

**G.W0 verdict: PASS.**

---

### G.W1 — substrate hygiene + architectural decomposition

| Planned lane (G.W1.md) | Landed commit | Verdict |
|---|---|---|
| A — CI-1 CHANGELOG-gate base-ref fix | `96894eb` | PASS |
| B — G-OPP-1 color/utils.ts decomposition (planned 7 modules) | `413b47e` — 9 modules + `conversions/index.ts` barrel | PASS (deviation ratified — see below) |
| B-remediation — assets/docs repointing | `27f2183` | PASS (in-wave remediation, documented) |
| C — DOCS-1 api/CLAUDE.md services drift | `195b834` | PASS |
| D — state-at-G-open baseline | `ab6c744` | PASS |

**Adjudicated deviations** (all documented in G.W1.md §"Execution adjudication" + PROGRESS.md):
1. **9 modules vs planned 7** — RATIFIED. `G.md §2 G3`, `§1 Axis 2`, `§3`, `dispatch/AGENT.md`, `G.W4.md` all updated to the 9-module count. Consistent across docs.
2. **`dist/value.js` +306 B vs ±100 sub-clause** — ACCEPTED (Rolldown `//#region` markers). Absolute gate ≤ 148,480 holds.
3. **assets/docs/ regression** — REMEDIATED in-wave per F1, commit `27f2183`. Documented.

**Lane A commit-message deviation**: the commit plan said `origin/main → origin/master`; the actual fix (`96894eb`, and PROGRESS.md Lane A row) used `origin/main → origin/${{ github.base_ref }}`. This is the *more idiomatic* option the wave spec explicitly permitted ("or use `${{ github.base_ref }}` for branch-agnosticism; pick the more idiomatic option"). Within spec. Not a discrepancy.

**G.W1 verdict: PASS.**

---

### G.W2 — typed strengthening (`as any` corpus retirement)

| Planned lane (G.W2.md) | Landed commit | Verdict |
|---|---|---|
| A — G-OPP-2 typed getColorSpaceBound | `23ec904` | PASS |
| B — G-OPP-3 typed DIRECT_PATHS mapped-type | `23ec904` | PASS |
| C — G-OPP-4 typed Color<T> channel accessor | `ef8a80b` | PASS (INTERNAL decision documented) |
| D — G-OPP-5 ValueUnit.unwrapDeep() static | `ef8a80b` | PASS |
| E — FOLD-1 useBreakpoint adoption (4 demo sites) | `bda584c` | PASS |
| F — FOLD-2 PaletteSlugBar Button shim | `1be6d15` | PASS |

A+B and C+D each collapsed into one commit (intermingled shared files — F.W3 precedent; per-lane audit docs preserve evidence). Documented in PROGRESS.md.

**Verified at HEAD**: `as any` in src/ = **0** (G2 target ≤ 5 — satisfied at 0). `as unknown as` = **4** (≤ 4 wave gate). `@ts-ignore` = 0, `@deprecated` = 0.

**BREAKING decision**: INTERNAL — v0.9.0 carries no BREAKING. Documented in `audit/G.W2-lane-c-color-channel-typing.md` + PROGRESS.md.

**G.W2 verdict: PASS — but see Discrepancy 1 (G3 LoC regression introduced here, not caught by the G.W2 wave gate).**

---

### G.W3 — invariant codification + CI/api/e2e hygiene

| Planned lane (G.W3.md) | Landed commit | Verdict |
|---|---|---|
| A — SCRIPTS-1 proof:resolution types-key probe | `61314fa` | PASS |
| B — SCRIPTS-2 proof:no-deprecated | `61314fa` | PASS |
| C — SCRIPTS-3 proof:no-ts-ignore | `61314fa` | PASS |
| D — SCRIPTS-4 proof:as-any-budget | `61314fa` | PASS |
| E — API-1 withTransaction 4-site expansion | `277e04a` | PASS |
| F — API-2 engines.node | `277e04a` | PASS |
| G — E2E-1 mobile-walk spec | `affbe0e` | PASS (path deviation documented — see below) |
| H — CI-2 npm pack --dry-run | `61314fa` | PASS |
| I — G-PUB-1 codemod-publication invariant | `61314fa` | PASS |
| J — FOLD-S1 proof:no-deep | `61314fa` | PASS |
| K — FOLD-S2 proof:no-bare-builtins | `61314fa` | PASS |

All 11 planned lanes landed. 8 proof scripts present + wired into `package.json` scripts + CI workflow (`.github/workflows/node.js.yml` lines 71/105/116-139). All 5 spot-run proof scripts exit 0:
`proof:no-deprecated` PASS · `proof:no-ts-ignore` PASS · `proof:as-any-budget` PASS (count 0) · `proof:no-deep` PASS · `proof:no-bare-builtins` PASS (71 files).

**Lane G path deviation**: G.W3.md Lane G + G.W4.md §2 named the spec `e2e/smoke-mobile/walk.spec.ts`. Actual landed path = `e2e/smoke/mobile/walk.spec.ts`. This is **documented + adjudicated** in `audit/G.W3-lane-g-mobile-walk.md §"path correction"`: there is no `e2e/smoke-mobile/` directory; the `smoke-mobile` Playwright *project* has `testDir: "./e2e/smoke/mobile"`. The agent corrected the spec's wrong path to match the actual project layout. Within the "idiomatic, no-workaround" mandate. Not a discrepancy — but see Discrepancy 3 (the G.W4.md spec text still carries the stale path).

**E2E spec count**: `find e2e -name '*.spec.ts' | wc -l` = **36** at HEAD (G.W3.md gate: "36, was 35"). Matches.

**G.W3 verdict: PASS.**

---

### G.W4 HEADLINE close — in progress

Wave-log row correctly marked `planned`. Close ceremony (FINAL.md, merge, v0.9.0 tag) not yet executed — consistent with this very audit being a G.W4 close-audit lane. No plan-vs-actual to assess; G.W4 is the wave under execution.

**G.W4 verdict: IN PROGRESS (as expected).**

---

## PROGRESS.md wave-log table audit

```
| G.W0 | closed  | 2026-05-21 | 2026-05-21 | `b745c0e` open + `<ratification-commit>` |
| G.W1 | closed  | 2026-05-22 | 2026-05-22 | `96894eb` `413b47e` `195b834` `27f2183` + close |
| G.W2 | closed  | 2026-05-22 | 2026-05-22 | `23ec904` `ef8a80b` `bda584c` `1be6d15` + close |
| G.W3 | closed  | 2026-05-22 | 2026-05-22 | `61314fa` `277e04a` `affbe0e` + close |
| G.W4 | planned | —          | —          | — |
```

- Zero rows marked `planned` **except G.W4** — CONFIRMED (G.W4 is the in-progress close wave).
- G.W1/G.W2/G.W3 commit SHAs in the wave-log all match `git log` exactly. The G.W1 close commit (`ab6c744`), G.W2 close (`c57ec01`), G.W3 close (`3a25f32`) are abbreviated as "+ close" — verified present.
- The dated PROGRESS.md sections ("G.W1 executed + closed", "G.W2 …", "G.W3 …") cite per-lane SHAs that all match `git log` — verified one-by-one against the commit ledger above.

**See Discrepancy 2** (the G.W0 wave-log row carries the literal placeholder `` `<ratification-commit>` ``).

---

## Discrepancy list

### Discrepancy 1 — `dispatch.ts` breaches the ratified G3 ≤ 350 LoC hard sub-gate (391 LoC at HEAD); the G.W2 wave gate did not re-check it

- G3 (ratified at G.W1 Lane B) is a **hard ≤ 350 LoC per-module sub-gate**. PROGRESS.md G.W1-close states "All 9 modules ≤ 350 LoC (max 336)"; `G.md §2 G3` repeats "All 9 modules ≤ 350 LoC (max 336)". The "max 336" was `dispatch.ts` at G.W1 close (`git show 413b47e:src/units/color/dispatch.ts | wc -l` = 336).
- G.W2 Lane A/B (`23ec904`) added the typed `getColorSpaceBound` + `DIRECT_PATHS` mapped-type **into `dispatch.ts`**, growing it 336 → **391 LoC** (`git show 23ec904:src/units/color/dispatch.ts | wc -l` = 391; HEAD = 391).
- **391 > 350.** The G3 hard sub-gate is breached at HEAD.
- The G.W2 PROGRESS.md close section + G.W2.md wave gate do **not** mention the G3 LoC sub-gate or this regression. G3 is an inherited invariant that every subsequent wave must hold; G.W2's typed-strengthening lane silently breached a prior wave's hard gate.
- **Severity: MEDIUM.** Not a correctness defect — `dispatch.ts` is the dispatch-glue module and the 41-LoC overage is typed-helper additions, not god-module sprawl. But it is a real, undocumented invariant breach: either (a) `dispatch.ts` should be slimmed back ≤ 350, or (b) G3 must be formally re-ratified with `dispatch.ts` at 391 (analogous to the 7→9 module re-ratification), with `G.md §2 G3` + PROGRESS.md corrected away from the now-false "max 336" claim. **G.W4 close must resolve this — it cannot ship FINAL.md asserting "all 9 modules ≤ 350" while one is 391.**

### Discrepancy 2 — PROGRESS.md wave-log G.W0 row carries an unresolved literal placeholder

- The wave-log G.W0 row reads: `` `b745c0e` open + `<ratification-commit>` ``.
- The G.W0 ratification commit is `0b9832c` ("docs(tranche-g/w0-close): user ratification received"). The placeholder `` `<ratification-commit>` `` was never substituted with the real SHA.
- Additionally the G.W0 row omits the two scope-expansion commits `a2e03de` + `704195e`, both of which PROGRESS.md's prose section attributes to G.W0 ("G.W0: +2 substrate items … DONE").
- **Severity: LOW (doc-hygiene).** Should be corrected at the G.W4 PROGRESS.md reconciliation to `` `b745c0e` `0b9832c` `a2e03de` `704195e` ``.

### Discrepancy 3 — G.W4.md §2 (close-audit lane-2 description) still cites the stale `e2e/smoke-mobile/` path

- G.W4.md §2 "substrate-without-consumer" lists "The mobile-walk spec (G.W3 Lane G)"; G.W3.md Lane G named it `e2e/smoke-mobile/walk.spec.ts`. The spec actually landed at `e2e/smoke/mobile/walk.spec.ts` (correctly, per `playwright.config.ts` `testDir`). The deviation is fully adjudicated in `audit/G.W3-lane-g-mobile-walk.md`, but the **wave-spec text itself was not corrected** (unlike the 7→9 module deviation, where `G.md`/`AGENT.md`/`G.W4.md` were all retro-updated).
- **Severity: LOW (doc-hygiene).** Stale path text in `G.W3.md` Lane G + file-bounds table. Cosmetic — the audit doc carries the authoritative corrected path. G.W4 doc-drift lane (Lane 3) should note it.

### Discrepancy 4 — minor: G.W3.md gate text says "8 sub-gates" but the wave has 11 lanes

- G.W3.md §Gate reads "Conjunction of sub-gates A + B + C + D + E + F + G + H" — it omits the three NEW lanes I, J, K from the conjunction list (they were appended to the wave after the original 8-lane gate text was written; the lane headers + file-bounds table *do* include I/J/K). PROGRESS.md G.W3-close correctly enumerates all 11 lanes and "8 proof scripts exit 0".
- **Severity: INFORMATIONAL.** All 11 lanes demonstrably landed (`61314fa` carries I/J/K); the gate-list text is just stale. No execution gap.

---

## Cross-checks performed (all clean)

- Every commit `704195e..HEAD` maps to a wave + lane — **zero orphan commits**.
- Every planned lane across G.W0/W1/W2/W3 has a corresponding commit — **zero missing lanes**.
- `as any` src/ = 0, `as unknown as` = 4, `@ts-ignore` = 0, `@deprecated` = 0 — all match PROGRESS.md G.W2/G.W3 claims.
- 8 proof scripts present + wired in `package.json` + CI; 5 spot-run scripts exit 0.
- E2E spec count = 36 (matches G.W3 gate "35 → 36").
- `withTransaction` lane E: all 4 claimed sites present (`deletePalette` in `palette/crud.ts:194`, `revertToVersion` in `palette/versions.ts:126`, `batchPalettes`/`batchUsers` in `admin/batch.ts`); `api/test/services/withTransaction-rollback.test.ts` present.
- `git stash list` empty; `git reflog` shows only ordinary commits — no agent-attributed mutating git ops.
- PROGRESS.md dated sections' per-lane SHAs all verified against `git log`.
- 8 of 9 decomposed color modules ≤ 350 LoC (`hex` 44, `kelvin` 123, `transfer` 109, `oklab` 156, `cylindrical` 193, `direct` 210, `xyz-extended` 220, `lab` 239); `dispatch.ts` = 391 — see Discrepancy 1.

---

## Overall verdict

**ISSUES.**

All 4 executed waves (G.W0–G.W3) landed every planned lane; every commit is lane-traceable; the wave-log has zero stray `planned` rows beyond the in-progress G.W4; PROGRESS.md's per-lane SHAs all reconcile with `git log`. The tranche is structurally sound and substantively complete.

However, **one MEDIUM discrepancy must be resolved before G.W4 ships FINAL.md**: `dispatch.ts` is 391 LoC, breaching the ratified G3 hard ≤ 350 sub-gate, and the "max 336" claim in `G.md §2 G3` + `PROGRESS.md` G.W1-close is now false. G.W4 close must either slim `dispatch.ts` ≤ 350 or formally re-ratify G3 and correct the stale "max 336" docs. The 3 remaining discrepancies (2, 3, 4) are LOW/INFORMATIONAL doc-hygiene items the G.W4 reconciliation + doc-drift lanes should sweep.
