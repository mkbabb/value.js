# R.W0 — SUBSTRATE (hygiene + truth; mechanical, one session)

**Name**: W0 — Substrate (hygiene + truth)
**Opens after**: owner ratification of the Q-table (`audit/pass2/PASS3-VERDICT.md §3`). W0 is the DAG root; R.W1 / R.W2 / R.W6 all open on its close (`SYNTHESIS-v2.md §3.2`).
**Spec of record**: `docs/tranches/R/audit/pass2/SYNTHESIS-v2.md §3 R.W0` · authoritative inventory `docs/tranches/R/audit/pass2/w0-truth.md §c` (every row re-verified against the live tree 2026-07-02).
**Agents**: 1 serial — the work order is one mechanical session; each row's Disposition + Gate columns are that row's paired goal/completion criteria (item-level).
**Hard gate**: composite (§Hard gate) — clean `git status` · `git tag` == registry (≥ v0.6.0) · `master` carries 1.2.0 · P/Q/N records exist · docs spot-check true · worktrees cleaned.
**Status**: DISPATCHABLE (RATIFIED-2026-07-03 — Q4 ratified as speced; Q3 closed on the record; the Q1 FLIP makes W0-1 `color-picker.md`-only — `hero-lab.md` was deleted at ratification, owner order).

---

## §Goal criterion

The tree tells the truth before any R work stands on it: the untracked `color-picker.md` treatment is committed (it is the R.W3 spec; `hero-lab.md` was deleted at the 2026-07-03 ratification — Q1 FLIP); the probe scratch is gone and self-ignoring; the proof-purge tail is committed; the ten published-but-untagged versions carry annotated tags; `master` carries what its released tags reference; the P/Q/N close records exist; the docs say true things (parse-that pin, the `/math` load-bearing leaf, the pin policy); and the pass-2 worktree evidence is safely in-tree before the worktrees die.

## §Completion criterion

The composite gate below verifies from `git status`, `git tag`, the registry list, and file presence alone — no runtime observation needed. Mechanical, one session.

---

## §Scope — the work order (W0-1..W0-14, the full inventory; verify-steps live per w0-truth §c)

| # | Item | Verify-step (done, live) | Disposition | Gate |
|---|---|---|---|---|
| W0-1 | `docs/frontend-design/` treatment — **`color-picker.md` ONLY** (the Q1 FLIP, RATIFIED-2026-07-03: `hero-lab.md` deleted at ratification per owner order — it was untracked, never committed; nothing to commit, nothing to fold) | `?? docs/frontend-design/` untracked; `color-picker.md` 25 KB (the "sizes swapped" R1-ASBUILT note is historical) | **COMMIT `color-picker.md`**, then **apply the overlay-amendment packet P1–P10** (`audit/pass2/overlay-amendment.md §5`, incl. the pass-3 P8 `:140` clause) as a **second commit** — the merged treatment is the R.W3 spec | `color-picker.md` tracked; amendment commit present |
| W0-2 | `.w6a-audit{,2..5}.mjs` (5 probe scripts) | untracked; SHIM at `.w6a-audit.mjs:8-14` | **DISCARD**; the SHIM-oracle knowledge survives in the R.W2/R.W3 **gate wording** (the falsifiable "renders without the w6a shim" bar), never as tracked source | files gone; oracle wording present in R.W2/R.W3 |
| W0-3 | `mix-1440-snapshot.md`, `shot3-dataurl.txt`, `suffuse-dataurl.txt` | 3 untracked scratch (a11y snapshot + base64 PNG frames) | **DISCARD** (findings canonized in LEDGER) | gone |
| W0-4 | `$OUT` (66 KB botched `> $OUT` redirect, 2026-06-03) | untracked | **DISCARD** (superseded; lives on branch `docs/constellation-grand-audit-2026-06-03`) | gone |
| W0-5 | `.gitignore` probe-scratch class | `*.png` (`.gitignore:17`) already ignores the w6 corpus | **MINT** the class: `.w6a-audit*.mjs`, `*-dataurl.txt`, `$OUT`, `mix-*-snapshot.md` | class present; future probe deposits self-ignore |
| W0-6 | `CONTRIBUTING.md` / `VENDOR-POLICY.md` | ` D` **unstaged** worktree deletions (not "staged" as pass-1 wrote); still in index; the 2026-06-02 proof-purge tail | **`git rm` + COMMIT** the deletion | both gone from HEAD; index clean |
| W0-7 | `docs/precepts` submodule | ` m`; HEAD `63240e6`; 2 uncommitted edits inside (`instructions/LESSONS-LEARNED.md`, `instructions/tranche/SPEC.md`) | **RESOLVE INSIDE the submodule** (commit or revert; bump the parent gitlink if committed) — never dangle across a tranche close | ` m docs/precepts` cleared |
| W0-8 | `@mkbabb/keyframes.js` devDep | VERIFIED non-phantom (w0-truth §a): glass-ui peer-requires `keyframes.js ^5.0.0`; the demo consumes glass-ui `/dock`(×16)/`/motion`/`/aurora`/`/goo-blob` whose dist imports keyframes; keyframes' dist imports `@mkbabb/value.js/math` (`clamp`/`lerpArray`/`scale`, `sequence-C_DCiOIQ.js`); grep direct import in `src/`+`demo/` = 0 | **KEEP + RECORD** (refutes the N.W9′ "phantom" premise): record under the §3.4 pin policy; add the RELEASE.md `/math` load-bearing-leaf line (KF-4: keyframes consumes it — it must never break; non-npm hosts must map it) | devDep retained + recorded; RELEASE.md `/math` line present |
| W0-9 | Retro-tags | **10** published-but-untagged versions (0.11.2 → 1.0.2), all publish commits pinned (table below); P/Q tags (v1.1.0/v1.1.1/v1.2.0) already exist; pre-modernization carve-out = 11 registry versions 0.1.0–0.5.1 under the single `pre-modernization` tag | **ANNOTATED tags ×10** at the exact publish commits | `git tag` == registry for **≥ v0.6.0**; carve-out recorded |
| W0-10 | Master-merge | `git rev-list --count master..tranche-q` = **3** (`23d1a91` P 1.1.0 / `fd3c7ce` Q 1.1.1 / `e80b359` Q 1.2.0); the already-minted v1.1.0/v1.1.1/v1.2.0 tags point at unmerged commits | **MERGE `tranche-q` → master** — heals the 3-commit debt AND the tag/branch skew in one move | `master` carries 1.2.0; all tags resolve on master's history |
| W0-11 | P/Q/N close records | `docs/tranches/{P,Q}` **do not exist** (not "empty"); `docs/tranches/N/FINAL.md` absent | **AUTHOR** lean `P/FINAL.md`, `Q/FINAL.md`, `N/FINAL.md` (N's is a fold-forward pointer to R, dropping the obsolete v1.0.0 framing) | three records exist, lean |
| W0-12 | Doc-truth pass | CLAUDE.md Deps § says parse-that `^0.7.0`; live pin is `^0.13.0` | **AMEND** CLAUDE.md (parse-that `^0.13.0`; record the §3.4 pin policy — see Q4 below) + the RELEASE.md `/math` line (with W0-8) | docs spot-check true |
| W0-13 | w6 shots corpus (80 PNGs) | `*.png`-gitignored (`.gitignore:17`); never surfaces in status | **NO ACTION** — salvageable N-era visual baseline, already ignored | n/a |
| W0-14 | Pass-2 worktree evidence | **The hoist half AND the seed preservation are ALREADY DONE at pass 3** (L2 §4): `gamut-bound.md`, `boot-blast-radius.md`, `kf1-grammar.md` hoisted into `docs/tranches/R/audit/pass2/` with provenance lines; the KF-1 diff + cured vite config preserved at `docs/tranches/R/audit/pass2/seeds/` (`kf1.patch`, `vite-config-boot-cure.patch`, `vite.config.cured.ts`) | **Residual: worktree cleanup only** — `git worktree remove` the three pass-2 lane worktrees (`wf_d9a4e4d9-899-{1,2,3}`) once W0 confirms the hoisted reports + seeds are committed | `git worktree list` carries no pass-2 lanes; hoisted reports + seeds tracked |

### The retro-tag table (W0-9 — annotated tags at the exact publish commits)

| # | version | commit | # | version | commit |
|---|---|---|---|---|---|
| 1 | 0.11.2 | `0cb5dd2` | 6 | 0.15.0 | `1670c90` |
| 2 | 0.12.0 | `3f4f0ed` | 7 | 0.16.0 | `0b0d9ee` |
| 3 | 0.13.0 | `9fce504` | 8 | 1.0.0 | `dd9beb5` |
| 4 | 0.13.1 | `650a8cd` | 9 | 1.0.1 | `f1d9bab` |
| 5 | 0.14.0 | `9ae9df0` | 10 | 1.0.2 | `15b0382` |

---

## §Triumvirate dispatch

A triumvirate (research + plan-augment + redress, per `ORCHESTRATION.md §Triumvirate Auto-Triggers`) is mandatory — never a solo redispatch — on:

- **bounds expansion**: any fix requiring a `src/`, `demo/`, or `api/` code write invalidates this docs+git-hygiene wave (scope reveal, per `SPEC.md §Scope Reveal`);
- **non-local gate failures**: a retro-tag whose cited publish commit fails verification against the registry (the W0-9 table premise), or a `tranche-q`→master merge (W0-10) that conflicts rather than fast-forwarding the 3 commits;
- **loop halt**: the third iteration of any diagnostic loop on the submodule resolution (W0-7) halts and routes.

## §File bounds · disjointness · worktrees

| Path | Access |
|---|---|
| `docs/frontend-design/color-picker.md` | commit + amend (W0-1) |
| `.gitignore` | modify (W0-5) |
| `CONTRIBUTING.md`, `VENDOR-POLICY.md` | delete (W0-6) |
| `docs/precepts` (submodule) | resolve inside + gitlink bump (W0-7) |
| `CLAUDE.md`, `docs/RELEASE.md` | modify (W0-8/W0-12) |
| `docs/tranches/{P,Q,N}/FINAL.md` | create (W0-11) |

Do NOT touch: `src/`, `demo/`, `api/`, the R audit records. Untracked-scratch discards (W0-2..W0-4) and the tag/merge/worktree git ops write no tracked paths. Single writer — no sibling worktrees (`WAVE_SPEC.md §4b` binds only when more than one agent writes); disjointness is trivial.

## §Agent unit

### R.W0.1 the tree-truth work order

- **Goal**: per §Goal criterion — the tree tells the truth before any R work stands on it.
- **Mechanism**: the W0-1..W0-14 work order above, each row's verify-step re-run live per `w0-truth §c`.
- **Files**: per §File bounds.
- **Sub-gate**: every row's Gate column holds; composite per §Hard gate.

## §Ratification rows riding this wave

- **Q4 — RATIFIED 2026-07-03 as speced** (pin policy, encoded here): **keep `file:../glass-ui` + `file:../keyframes.js` deliberately** and RECORD it in CLAUDE.md at W0-12 — registry pins during active co-development are theater ("3.13.0" and "BA 4.0.0" both went stale before mattering); the protecting discipline is the adopt-event BOOKS + the by-name MIGRATION tables + **`boot-smoke` cold** as the named-export drift catch-all. The alternative (registry-pin at 5.0.0) makes every glass-ui break an explicit version event at the price of twice-disproven pin staleness. W0-8's KEEP is the same policy applied to the peer-provision chain.
- **Q3 — closed on the record** (no owner action): retro-tags ×10, gate scoped ≥ v0.6.0, carve-out recorded (W0-9).

## §Hard gate (composite — verbatim per SYNTHESIS-v2 §3 R.W0)

Clean `git status`; `master` carries 1.2.0; `git tag` == registry (≥ v0.6.0); P/Q/N records exist; `color-picker.md` committed + amended (hero-lab.md deleted at ratification — its absence is part of the clean-status check); keyframes devDep kept + recorded; docs spot-check true; pass-2 evidence hoisted (already done — verify tracked) + worktrees cleaned.

## §Format + lint cadence

Docs+git-hygiene wave: `git diff --check` before each commit; the available document checks at close. One full `npm run lint` + `npm test` pass before the master merge (W0-10) confirms the merged tree lands green.

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): per-row commit hashes; the `git tag -n1` capture vs the registry version list (W0-9); the empty `git status --porcelain` capture; the post-cleanup `git worktree list` capture (W0-14); the three FINAL.md paths (W0-11).

## §Commit plan

W0-1 lands as two commits (the treatment, then the P1–P10 amendment packet); one hygiene commit covers the discards + the `.gitignore` class (W0-2..W0-5); the proof-purge deletion commit (W0-6); the submodule resolve + gitlink bump (W0-7); one docs-truth commit (W0-8 + W0-12); the P/Q/N records commit (W0-11); W0-9/W0-10/W0-14 are git ops (tags, merge, worktree removal), not tracked-file commits; a doc/status commit closes the wave.

## §Dependencies

- **Depends on**: owner ratification of the Q-table (2026-07-03).
- **Blocks**: R.W1 / R.W2 / R.W6 (the DAG root); R.W3 via the amended treatment (W0-1's second commit).

## §Evidence packets consumed

`audit/pass2/w0-truth.md` (the inventory + §c work-order) · `audit/pass2/overlay-amendment.md` (the W0-1 P1–P10 merge packet) · `audit/pass2/seeds/` (preserved implementation seeds for R.W1/R.W2) · `audit/pass2/PASS3-VERDICT.md §2.2` (the W0-14 already-done note).

## §Hand-off

R.W1 consumes `seeds/kf1.patch`; R.W2 consumes `seeds/vite-config-boot-cure.patch` + `vite.config.cured.ts`; R.W3 consumes the amended `docs/frontend-design/color-picker.md` (W0-1's second commit). (`hero-lab.md` + R.W5 were KILLED at the 2026-07-03 ratification — no consumer.) The SHIM-oracle wording (W0-2) is owed to the R.W2/R.W3 gate text — this wave discards the files, never the knowledge.
