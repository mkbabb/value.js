# H.W4 Lane D — CI release/publish process docs

**Wave**: H.W4 — Micro-polish + flake mitigation + close docs.
**Lane**: D — CI release/publish process docs.
**Status**: closed.
**Branch**: `tranche-h` @ `d5d570b`.

---

## §1 — Mission

Per `H.W4.md §Lane D` + `audit/H-AUDIT-6 §3.4`: the release/publish process is undocumented. CONTRIBUTING.md (authored at G.W4 close) covers the dev quickstart and codemod pattern but says nothing about how `npm publish` runs, when it runs, who runs it, or how to roll back a bad release.

H-AUDIT-6 §3.4 inventoried the workflow state and surfaced the gap: `.github/workflows/node.js.yml` has a `deploy` job for gh-pages on master push, but **no `npm publish` step, no `release.yml`, no `workflow_dispatch`, no tag-triggered job**. Publishing is manual — by inference from `package.json version: "0.9.0"` matching `CHANGELOG.md ## [0.9.0] — 2026-05-22 (G close)`.

This lane authors `docs/RELEASE.md` as the canonical publish process and adds the audit record. No file in `.github/workflows/` is touched (the user did not authorize automating publish).

---

## §2 — Why Option (a) manual + documented, not Option (b) automated workflow

H-AUDIT-6 §3.4 framed the choice:

- **Option (a)** — document the manual process. Lower risk; keeps publish as a deliberate human action aligned with the tranche-close ceremony.
- **Option (b)** — add a tag-triggered `release.yml` that runs `npm publish` on `v*` tags. Automates a class of error.

This lane chooses Option (a) for these reasons:

1. **Cadence**: value.js publishes roughly once per tranche close (≈ monthly). v0.6.0 closed D, v0.7.0 closed E, v0.8.0 closed F, v0.9.0 closed G. The publish frequency does not justify automation surface — it's not a multi-release-per-day CI pipeline.

2. **Tag-trigger automation has a class of error**: a tag pushed mid-tranche (e.g. a working tag, an accidental push) would auto-publish; a tag pushed despite a soft regression that didn't fail a hard CI gate would auto-publish. Manual publish keeps a human cut between "gates passed" and "consumers see this".

3. **No user authorization**: H.W4's lane prompt is explicit — "DO NOT automate via a release.yml workflow — the user has not authorized that scope expansion." This honors the precept-bound directive (NO scope expansion without user authorization).

4. **The CI gate matrix already catches regressions** — `npm pack --dry-run --legacy-peer-deps` (CI step 18) + `proof:codemod-publication` (step 19) inspect the publish artifact shape; lint + vitest + vue-tsc + bench gates + playwright already block bad merges. By the time master is GREEN, the only remaining decision is "publish now or later" — a single human keystroke.

5. **Parallel with D-RELEASE-PLAN.md precedent**: `docs/tranches/D/D-RELEASE-PLAN.md §3` already documented the merge ceremony at D close in worked-example form. `docs/RELEASE.md` lifts that pattern to a tranche-agnostic canonical doc — fewer copy-paste replicas across future tranche `D-RELEASE-PLAN.md`-style files.

---

## §3 — The codified ceremony steps

`docs/RELEASE.md §3` codifies the ceremony as 7 sequential steps:

1. **Version bump + CHANGELOG** — bump `package.json` `version` and add a `## [N.N.N] — YYYY-MM-DD (X close)` section. The last commit of the tranche branch.
2. **Merge `tranche-X → master` with `--no-ff`** — preserves the tranche history; first-parent path on master stays the wave-by-wave story.
3. **Tag annotated `vN.N.N`** — `git tag -a vN.N.N -m "<one-line thesis>"`. Annotated, not lightweight.
4. **Push** — `git push origin master --follow-tags`.
5. **Verify the CI gate on master** — `gh run watch`. If RED, stop the ceremony.
6. **`npm publish --legacy-peer-deps`** — the `--legacy-peer-deps` flag is necessary because the constellation pins Vite 8 while some peer-deps declare Vite ^7. Documented in `CONTRIBUTING.md`.
7. **Verify on npm** — `npm view @mkbabb/value.js version` matches the new tag.

Plus a §4 rollback path: **deprecate, not unpublish** (npm policy). `npm deprecate "@mkbabb/value.js@<bad>" "..."` annotates the version; a follow-up patch release ships the fix via the same ceremony.

---

## §4 — Sub-gate evidence

Per the lane prompt's 5 sub-gate items:

| # | Sub-gate | Evidence |
|---|---|---|
| 1 | `docs/RELEASE.md` exists + covers the full ceremony reproducibly | Authored at `/Users/mkbabb/Programming/value.js/docs/RELEASE.md` — 6 sections: Prerequisites, Pre-merge gate matrix, The ceremony (7 steps), Rollback, Cross-repo consumption updates, Authority. |
| 2 | No new file in `.github/workflows/` | Verified: `ls .github/workflows/` returns only `node.js.yml` (unchanged). |
| 3 | The doc cites real script names | Verified against `package.json` `scripts:` — every cited `npm run *` command (`lint`, `build`, `proof:dts-layout`, `proof:resolution`, `proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:as-unknown-as-budget`, `proof:no-deep`, `proof:no-bare-builtins`, `proof:codemod-publication`, `bench`) exists in `package.json`. The `prepare` hook + `npm pack --dry-run --legacy-peer-deps` are also real shapes. |
| 4 | The doc cites real CI step names | Verified against `.github/workflows/node.js.yml` — every cited step (the 19 build-and-test gates plus the CHANGELOG-changed PR-only gate, the 5 playwright projects, the `npm pack --dry-run` step) is present and bit-accurate. |
| 5 | The doc covers the rollback path (deprecate-not-unpublish per npm policy) | `docs/RELEASE.md §4 — Rollback` cites the `npm deprecate` command form, the 72-hour `npm unpublish` window restriction, and the follow-up patch-release pattern. |

---

## §5 — Files touched

| File | Change |
|---|---|
| `docs/RELEASE.md` | NEW (~140 lines) |
| `docs/tranches/H/audit/H.W4-lane-d-release-docs.md` | NEW (this file) |

**Not touched** (per file bounds + per "NO IMPLEMENTATION SHORTCUTS"):

- `.github/workflows/node.js.yml` — no `release.yml`, no publish step added.
- `package.json` — no `publish:` script added.
- `CONTRIBUTING.md` — Lane E (separate lane) owns the CONTRIBUTING reference to RELEASE.md.

---

## §6 — Cross-references

- `docs/tranches/H/audit/H-AUDIT-6-api-e2e-ci.md §3.4` — the source diagnosis that surfaced the gap.
- `docs/tranches/H/waves/H.W4.md §Lane D` — the lane prompt.
- `docs/tranches/D/D-RELEASE-PLAN.md` — the D-tranche worked-example precedent; `docs/RELEASE.md` lifts the canonical shape from D's tranche-specific doc.
- `docs/tranches/G/FINAL.md §5` — the canonical "Pre-merge gate matrix" form; `docs/RELEASE.md §2` references "the tranche's FINAL.md §5" as the authoritative per-tranche gate inventory rather than re-deriving it.
- `CONTRIBUTING.md` — Lane E will add a `docs/RELEASE.md` reference + the `npx playwright install` quickstart line.

---

## §7 — Verdict

Lane D sub-gate: **PASS**. `docs/RELEASE.md` codifies the manual publish ceremony reproducibly; no automation surface added; all cited script + CI step names cross-checked against the actual `package.json` + `.github/workflows/node.js.yml`; rollback path covers `npm deprecate` per npm policy.
