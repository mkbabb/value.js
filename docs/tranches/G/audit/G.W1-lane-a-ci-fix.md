# G.W1 Lane A — CI-1: CHANGELOG-gate base-ref defect fix

**Mode**: EXECUTION (workflow defect repair).
**Date**: 2026-05-22.
**Branch / HEAD**: `tranche-g` @ `704195e`.
**Finding origin**: `G-AUDIT-6 §3.2` (G-OPP-CI-1 — highest-ratio G-target, defect repair).
**File changed**: `.github/workflows/node.js.yml`.
**Author**: G.W1 Lane A execution agent.

---

## §1 — The defect (before-state)

F.W3 Lane B added a PR-only "CHANGELOG-changed" gate to
`.github/workflows/node.js.yml`. The gate computes the set of
files a PR changed and, if any library-significant path is touched
(`src/`, top-level `package.json`, `vite.config.ts`, `tsconfig.json`,
`api/src/`, `api/package.json`), requires `CHANGELOG.md` to also be in
the diff.

The gate's diff command (pre-fix, **line 224**):

```yaml
- name: Assert CHANGELOG touched when src/, package.json, vite/ts config, or api/ is touched
  if: github.event_name == 'pull_request'
  run: |
      git diff --name-only origin/main...HEAD > diff-files.txt
```

**The defect**: `origin/main` does not exist in this repository.
value.js's default branch is `master`:

```
$ git symbolic-ref refs/remotes/origin/HEAD
refs/remotes/origin/master

$ git rev-parse --verify origin/main   → fails (no such ref)
$ git rev-parse --verify origin/master → 6b3a41b... (exists)
```

`git diff --name-only origin/main...HEAD` therefore fails to resolve
the left operand of the symmetric-difference range. On a GitHub
Actions runner this errors with
`fatal: ambiguous argument 'origin/main...HEAD'` — but because the
`run:` block is a multi-line script and the failing `git diff` is the
**first** statement, its non-zero exit propagates as the step's exit
code only if `set -e`-equivalent strictness is in effect. This step
has no `set -euo pipefail`; under default `bash` behaviour the
pipeline's exit status is that of the **last** command. The
subsequent `if grep -q ... diff-files.txt` runs against an
empty/absent `diff-files.txt`, the `grep` finds nothing, the `if`
body is skipped, and the step exits `0`.

**Net effect**: the gate is **INERT** on every PR. It has never once
enforced the CHANGELOG-update invariant since F.W3 Lane B authored
it. The bug was introduced by authoring the gate against a
`main`-defaulting GitHub boilerplate and never validating it
end-to-end on a real PR after the F.W3 Lane B broadening.

This is `G-AUDIT-6 §3.2`'s finding and the §7 #1-ranked G-target by
(invariant-tightening / LoC) ratio.

---

## §2 — The fix (after-state)

The gate now diffs against the PR's actual base branch via the
GitHub Actions `github.base_ref` context expression (**line ~233**
after the comment block):

```yaml
- name: Assert CHANGELOG touched when src/, package.json, vite/ts config, or api/ is touched
  if: github.event_name == 'pull_request'
  run: |
      git diff --name-only "origin/${{ github.base_ref }}...HEAD" > diff-files.txt
```

A clarifying comment block precedes the step recording the defect
origin and why `github.base_ref` is safe under the `if:` guard.

The `actions/checkout` step's comment was also updated (lines 25-31)
to name `origin/${{ github.base_ref }}` rather than `origin/master`
so the documentation tracks the gate. **No `fetch-depth` change was
required** — see §4.

### Before / after — exact changed line

| | |
|---|---|
| **Before** (line 224) | `git diff --name-only origin/main...HEAD > diff-files.txt` |
| **After**  | `git diff --name-only "origin/${{ github.base_ref }}...HEAD" > diff-files.txt` |

---

## §3 — Rationale: option 1 (`origin/master`) vs option 2 (`origin/${{ github.base_ref }}`)

Two idiomatic repairs were available:

| Option | Form | Properties |
|---|---|---|
| 1 | `origin/master` | Simple; hardcodes the current default branch name. Correct **only** while/where the PR targets `master`. Breaks silently again if the default branch is ever renamed (e.g. a future `master`→`main` migration) or if a PR targets a release/maintenance branch. |
| 2 | `origin/${{ github.base_ref }}` | `github.base_ref` is the PR's **actual target branch** — populated by GitHub for `pull_request` events and `pull_request_target` events. The gate always diffs against precisely the branch the PR will merge into. Survives a default-branch rename and correctly handles PRs that target a non-default branch. |

**Decision: Option 2 (`origin/${{ github.base_ref }}`).**

Rationale:

1. **Defect-class elimination, not defect-instance repair.** The bug
   we are fixing *is* a hardcoded-branch-name defect (`origin/main`
   hardcoded). Replacing it with another hardcoded name
   (`origin/master`) repairs this instance but leaves the same
   failure mode armed for the next default-branch change. Option 2
   removes the hardcoded name entirely, so the class of defect
   cannot recur.

2. **`github.base_ref` is guaranteed defined here.** The step is
   already guarded by `if: github.event_name == 'pull_request'`.
   `github.base_ref` is set by GitHub for exactly that event type
   (it is empty for `push` events — which is precisely why the `if:`
   guard exists). The expression therefore never expands to an empty
   string at the point it is used. There is no new failure mode.

3. **Branch-agnostic correctness.** The `on:` block currently scopes
   `pull_request` to `branches: ["master"]`, so today every PR run
   targets `master` and options 1 and 2 are behaviourally identical.
   But that scope can broaden (release branches, `next`, etc.).
   Option 2 stays correct under any such broadening with no further
   edit; option 1 would require remembering to revisit this line.

4. **Idiomatic for GitHub Actions.** `github.base_ref` is the
   canonical, documented context value for "the PR's target
   branch". Using it is the GitHub-native idiom; hardcoding a branch
   name is the anti-pattern that caused this very bug. This aligns
   with the workflow's existing style, which already uses context
   expressions throughout (`${{ matrix.node }}`, `${{ runner.os }}`,
   `${{ hashFiles(...) }}`, `${{ github.event_name }}`,
   `${{ github.ref }}`).

The G.W1.md scope line ("replace `origin/main` with `origin/master`
*or* use `${{ github.base_ref }}` for branch-agnosticism; pick the
more idiomatic option") explicitly licenses option 2; the more
robust, defect-class-eliminating choice is taken.

---

## §4 — Fetch-depth analysis + verdict

The gate's `git diff --name-only "origin/<base>...HEAD"` needs the
local git object store to contain the `origin/<base>` ref **and**
enough history to compute the merge-base of `origin/<base>` and
`HEAD` (the `A...B` symmetric-difference form diffs B against the
merge-base of A and B).

A shallow checkout (`actions/checkout` default `fetch-depth: 1`, or
any small fixed depth) fetches only the tip commit(s) and **omits the
remote-tracking refs for other branches** plus the history needed to
locate a merge-base. Under a shallow clone this `git diff` would fail
with `fatal: bad revision 'origin/<base>...HEAD'` or be unable to
find a merge-base.

**Inspection of the existing `actions/checkout` step** (lines 24-31):

```yaml
- uses: actions/checkout@v4
  with:
      # CHANGELOG-changed gate needs the PR base branch ...
      fetch-depth: 0
```

The step **already specifies `fetch-depth: 0`** — a full,
unshallowed clone with all branches and complete history. This was
put in place by F.W3 Lane B alongside the gate (the pre-fix comment
already read "CHANGELOG-changed gate needs origin/master available
for the merge-base diff"). `fetch-depth: 0` is the correct and
sufficient configuration: with it, `origin/<base_ref>` resolves and
the merge-base is computable.

**Verdict: NO fetch-depth change required.** The checkout was already
correctly configured for a base-ref diff; only the diff command's
base-ref token was wrong. The single substantive change is the
base-ref token on the gate line. The checkout step's **comment** was
updated for accuracy (it named `origin/master`; it now names
`origin/${{ github.base_ref }}` to match the repaired gate), but the
`fetch-depth: 0` value itself is unchanged.

No explicit `git fetch` is needed either — `fetch-depth: 0` already
populates every remote-tracking ref including `origin/<base_ref>`.

---

## §5 — PR-simulation reasoning

Behaviour of the repaired gate on three PR shapes. The gate fires
only for `pull_request` events; on those runs `github.base_ref` is
the target branch and `fetch-depth: 0` guarantees
`origin/<base_ref>` is present, so `git diff --name-only
"origin/<base_ref>...HEAD"` yields exactly the files the PR changes
relative to the merge-base.

### Sim 1 — docs-only PR (no library-significant path)

A PR touching only `docs/**` produces a diff-file list with no entry
matching the path regex
`^(src/|package\.json$|vite\.config\.ts$|tsconfig\.json$|api/(src/|package\.json$))`.
The outer `if grep -qE ...` is false; the step exits `0`. **PASS** —
correct: a docs-only PR needs no CHANGELOG entry.

Verified live against the current branch (`tranche-g` vs
`origin/master` — itself a docs-only delta):

```
$ git diff --name-only origin/master...HEAD | grep -E \
    "^(src/|package\.json$|vite\.config\.ts$|tsconfig\.json$|api/(src/|package\.json$))"
  → (no output) → NO MATCH → gate passes
```

### Sim 2 — PR touches `src/` but NOT `CHANGELOG.md`

The diff-file list contains a `src/...` entry → the path regex
matches → the inner `grep -q "^CHANGELOG\.md$"` finds nothing → the
`|| (echo ... && exit 1)` branch runs → **the step exits `1`**. The
PR is blocked until `CHANGELOG.md` is updated. This is the gate's
entire purpose and was never reachable before the fix.

Verified empirically with a synthetic two-commit repo
(`base-branch` → commit touching `src/foo.ts` only):

```
$ git diff --name-only base-branch...HEAD     → src/foo.ts
$ <gate logic>                                → GATE EXIT 1  ✓
```

Also verified against real value.js history: commit `6c6c0ea`
touches `src/utils.ts` with no `CHANGELOG.md` change — exactly the
shape that would (correctly) trip the repaired gate.

### Sim 3 — PR touches `src/` AND `CHANGELOG.md`

The path regex matches **and** `grep -q "^CHANGELOG\.md$"` succeeds
→ the `||` short-circuits → no `exit 1` → step exits `0`. **PASS** —
correct: the contributor updated the changelog.

Verified empirically (same synthetic repo, follow-up commit adding
both `src/foo.ts` and `CHANGELOG.md`):

```
$ git diff --name-only base-branch...HEAD     → CHANGELOG.md, src/foo.ts
$ <gate logic>                                → GATE PASSED  ✓
```

The gate is now genuinely live: it fires `exit 1` on a PR that
touches `src/` without `CHANGELOG.md`, and passes when both are
touched or when no library-significant path is touched.

---

## §6 — Sub-gate A evidence

| Sub-gate A clause | Result | Evidence |
|---|---|---|
| Workflow YAML still parses as valid YAML | **PASS** | `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/node.js.yml'))"` → loads cleanly; top-level keys present, `jobs` = `[build-and-test, deploy]`. |
| Gate references a base-ref that genuinely exists at workflow runtime | **PASS** | Base-ref is now `origin/${{ github.base_ref }}` — the PR's target branch, always defined under `if: github.event_name == 'pull_request'` and present in the object store because `actions/checkout` uses `fetch-depth: 0`. (`origin/master`, today's `base_ref` value, verified to exist; `origin/main` verified absent — the old defect.) |
| A `src/`-touching, non-CHANGELOG PR now causes the gate to `exit 1`; a PR touching both passes | **PASS** | §5 Sim 2 → synthetic-repo run produced `GATE EXIT 1`; §5 Sim 3 → produced `GATE PASSED`. Real-history confirmation: `6c6c0ea` (src/-only) would trip it. |

**Sub-gate A: PASS (all three clauses).**

---

## §7 — Files modified

- `.github/workflows/node.js.yml`
  - Gate step (`Assert CHANGELOG touched ...`): base-ref
    `origin/main` → `origin/${{ github.base_ref }}`; added a
    comment block recording the defect origin.
  - `actions/checkout` step: comment updated to name
    `origin/${{ github.base_ref }}` (the `fetch-depth: 0` value is
    unchanged — already correct).
- `docs/tranches/G/audit/G.W1-lane-a-ci-fix.md` (this document, NEW).

No other files touched. No git operations performed — the
orchestrator owns the index.
