# RELEASE — value.js publish process

**Authority**: this document is the canonical publish process for `@mkbabb/value.js`. It is referenced from `CONTRIBUTING.md` and from each tranche's `FINAL.md` close section. **There is no GitHub Actions release workflow** — publishing is a deliberate, human-driven action aligned with the tranche-close ceremony.

**Cadence**: once per tranche close (roughly monthly at current cadence — not per-PR, not weekly). v0.6.0 closed Tranche D, v0.7.0 closed E, v0.8.0 closed F, v0.9.0 closed G. The version bump and the merge-to-master are a single ceremony.

**Distribution shape**: `@mkbabb/value.js` is a public-scoped npm package. There is no `.npmrc` and no `package.json` `publishConfig`; publishing is implicitly public via the npm default for `@mkbabb/*`.

---

## §1 — Prerequisites

Before opening the release ceremony, confirm:

1. **npm authentication** — the publishing user is logged in as `mkbabb` (or a delegate with publish rights on the `@mkbabb` scope):

    ```bash
    npm whoami
    # → mkbabb
    ```

    If not logged in: `npm login`.

2. **Clean working tree on the tranche branch** (e.g. `tranche-g`, `tranche-h`). `git status` shows no unstaged or untracked files except documented build outputs.

3. **`gh` CLI installed and authenticated** (used for the `npm pack --dry-run` shape inspection and for any post-merge release-notes publishing):

    ```bash
    gh auth status
    ```

4. **Sibling repos checked out at `../glass-ui` and `../keyframes.js`** per `CONTRIBUTING.md` — required for `npm install --legacy-peer-deps` to resolve the `file:` devDependencies.

5. **Node 22 or 24** — matches the CI matrix (`.github/workflows/node.js.yml`) and `package.json` `engines.node: ">=22"`.

---

## §2 — Pre-merge gate matrix (the wave-gate inheritance)

The release ceremony **does not re-derive** the merge-readiness gates. The canonical per-tranche gate inventory lives in that tranche's `FINAL.md §5` (e.g. `docs/tranches/G/FINAL.md §5 — Pre-merge gate matrix`). Confirm every row in that matrix reads PASS before the merge.

By construction the FINAL.md gate matrix subsumes every CI step in `.github/workflows/node.js.yml`. For reference, the CI workflow runs:

- `npm run lint` (`--max-warnings=0`)
- `vue-tsc --noEmit` (strict-zero gate)
- `npm run build`
- `npm run proof:dts-layout`
- `dist/value.js` size budget (≤ 145 KB raw)
- `npx vitest run`
- backend tests (`cd api && npm install && npm test`)
- `npm run proof:resolution`
- `npm run proof:no-deprecated`
- `npm run proof:no-ts-ignore`
- `npm run proof:as-any-budget`
- `npm run proof:as-unknown-as-budget`
- `npm run proof:no-deep`
- `npm run proof:no-bare-builtins`
- `npm pack --dry-run --legacy-peer-deps` (publish-shape inspection)
- `npm run proof:codemod-publication`
- `npm run bench` + bench-gate assertions (L8 ≥ 5×, HSL→RGB ≥ 2×, nameParser ≥ 5×)
- `npx playwright test` (5 projects: smoke, smoke-admin, smoke-mobile, smoke-reactivity, smoke-safari)
- CHANGELOG-changed gate (PR-only)

Every step is hard-gated; the tranche's FINAL.md cites which step satisfied which row of the matrix.

---

## §3 — The ceremony

These steps execute **sequentially**. Each step's success is the precondition for the next.

### 3.1 — Version bump + CHANGELOG (the last commit of the tranche)

On the tranche branch, with all wave work merged in and the close audit clean:

```bash
# on tranche-X, at close
$EDITOR package.json    # bump "version" per semver (typically MINOR for a tranche close)
$EDITOR CHANGELOG.md    # author the new "## [N.N.N] — YYYY-MM-DD (X close)" section
git add package.json CHANGELOG.md
git commit -m "chore(release): vN.N.N — X close ceremony + version bump"
```

The CHANGELOG entry follows the existing header pattern (see `CHANGELOG.md` for the v0.6.0 / v0.7.0 / v0.8.0 / v0.9.0 templates): a header line with date and tranche letter, then BREAKING / FEATURES / PERFORMANCE / INTERNAL / DEPS sections as appropriate.

### 3.2 — Merge tranche → master (`--no-ff`)

```bash
git checkout master
git pull --ff-only origin master
git checkout tranche-X
git rebase master                          # no-conflict path; if conflicts, resolve per tranche-X-binds-master
git checkout master
git merge --no-ff tranche-X -m "Merge tranche-X into master — Tranche X close (vN.N.N)"
```

The `--no-ff` is load-bearing: it preserves the tranche history. The merge commit's first-parent path on master is the clean wave-by-wave story. Each prior tranche close uses the same shape (see `docs/tranches/D/D-RELEASE-PLAN.md §3` for the canonical worked example).

### 3.3 — Tag annotated `vN.N.N`

```bash
git tag -a vN.N.N -m "vN.N.N — X close (one-line thesis: e.g. type-system completion + architectural decomposition + invariant codification)"
```

Annotated tags (`-a`) carry the tagger identity and a message; lightweight tags (`git tag vN.N.N`) do not. Use `-a` so the tag is itself a discoverable artefact.

### 3.4 — Push master + tags

```bash
git push origin master --follow-tags
```

`--follow-tags` pushes annotated tags reachable from the commits being pushed. This is the single push command for the ceremony; do not split master and the tag.

### 3.5 — Verify the CI gate on master

The push fires the `Node.js CI` workflow on master. Confirm GREEN before publishing:

```bash
gh run watch                       # or: gh run list --branch=master --limit=1
```

If CI RED on master, **stop the ceremony**. Do not publish a version whose source-of-truth CI failed.

### 3.6 — `npm publish` (with `--legacy-peer-deps`)

```bash
npm publish --legacy-peer-deps
```

**Why `--legacy-peer-deps`**: the constellation pins Vite 8 (`devDependencies` in `package.json`) while some peer-deps still declare Vite ^7. Without the flag, `npm` aborts on the peer-dep conflict at the prepublish-install step. This is documented in `CONTRIBUTING.md`. The flag is necessary for `npm install`, `npm pack`, AND `npm publish` until the peer-dep ecosystem catches up; the `npm pack --dry-run` CI step uses the same flag.

The published tarball shape is asserted in CI by `npm pack --dry-run --legacy-peer-deps` + `npm run proof:codemod-publication`. The published file set is defined by `package.json` `files:`:

- `dist/` — the library build (`value.js` ESM + `*.d.ts` flat layout + the gh-pages demo is NOT shipped)
- `scripts/migrate-*.mjs` — published codemods for consumer-migration (e.g. `scripts/migrate-keyframes-js-lerp.mjs`)

The `prepare` script (`test -f dist/value.js || npm run build`) ensures the library is built if `dist/` is absent at publish time.

### 3.7 — Verify on npm

```bash
npm view @mkbabb/value.js version
# → N.N.N

npm view @mkbabb/value.js dist-tags
# → latest: N.N.N
```

Optional further verification:

```bash
# Smoke-install in a scratch dir
mkdir /tmp/value-js-verify && cd /tmp/value-js-verify
npm init -y
npm install @mkbabb/value.js --legacy-peer-deps
node -e "import('@mkbabb/value.js').then(m => console.log(Object.keys(m).length, 'exports'))"
```

---

## §4 — Rollback

**Policy**: npm strongly discourages `unpublish` (and forbids it after 72 hours / once the version has install activity, per `npm-unpublish` policy). The published-artifact contract should not be broken once a consumer can install it.

**Use `npm deprecate` instead**:

```bash
npm deprecate "@mkbabb/value.js@<bad-version>" "Reason: <one-line description>. Use @mkbabb/value.js@<replacement-version> instead."
```

`deprecate` annotates the version with a warning that `npm install` surfaces but does not remove the package from the registry — consumers who have already pinned to the bad version still resolve, but new installs see the warning. This is the npm-recommended path for a regressed-release recovery.

The follow-up is a **new patch release** with the fix:

1. Branch off master at the merge commit.
2. Land the fix on the tranche branch (or a hotfix branch if mid-tranche).
3. Bump patch (e.g. `0.9.0` → `0.9.1`), CHANGELOG entry, commit, merge with `--no-ff`, tag `v0.9.1`, push, publish — the same ceremony as §3.

`npm unpublish` is reserved for the narrow 72-hour-window recovery of an unambiguously broken first-publish-of-a-version (e.g. tarball missing `dist/`). Even then, prefer `deprecate` + a follow-up patch release.

---

## §5 — Cross-repo consumption updates

After publishing, `file:`-pinned consumers (notably `keyframes.js`) may need to bump their pin to the new published version OR continue consuming via `file:../value.js`. The consumer-update routing is:

- **`file:` consumers**: changes are immediately visible at the consuming repo's HEAD. No publish round-trip needed for local development.
- **Pinned consumers (semver)**: the consuming repo's maintainer bumps `"@mkbabb/value.js": "^N.N.N"` in their `package.json` and runs `npm install --legacy-peer-deps`. If the release carries breaking changes (see CHANGELOG `BREAKING` section), the consumer may need a migration step — codemods are shipped under `scripts/migrate-*.mjs` and documented in CONTRIBUTING.md §"Sibling-cwd codemod execution".

Cross-repo writes by value.js maintainers stay narrowly bounded per the F3 invariant: **value.js does not write into consumer repos** except through published codemods invoked locally by the consumer, or under explicit user authorization (e.g. F-window's keyframes.js codemod application — `LOCAL-ONLY commit; user-discretionary push`).

---

## §6 — Authority

This document IS the publish process. The merge-and-publish ceremony is owned by the orchestrator at tranche close. Agents do not perform mutating git operations or `npm publish` invocations on their own — these are deliberate human actions, recorded against the tranche-close FINAL.md.

The decision to keep publish manual (rather than automating via `.github/workflows/release.yml`) is intentional: per `docs/tranches/H/audit/H-AUDIT-6 §3.4`, a tag-triggered automated publish workflow would automate a class of error (e.g. publishing a tag pushed mid-tranche, or publishing despite a soft regression that didn't fail a hard gate) and adds more surface than the project needs at its current cadence (one publish per tranche close ≈ once per month). The CI gate matrix already catches regressions; the human publish step is the deliberate cut between "the gates passed" and "consumers will see this".
