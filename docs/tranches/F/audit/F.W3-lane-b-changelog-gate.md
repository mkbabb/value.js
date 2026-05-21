# F.W3 — Lane B — CHANGELOG-changed gate broadening

**Date**: 2026-05-21
**Lane**: F.W3 Lane B — CI hygiene (gate filter broadening).
**Authority**: F.W3.md Lane B + F-AUDIT-6 §5+§7.
**Dispatch HEAD**: `df0650c` (F.W2 close).
**File touched**: `.github/workflows/node.js.yml` (single replacement).

---

## §1 — Motivation

Per **F-AUDIT-6 §5+§7**, the W8–W12 dep-only commits slipped through E.W4 Lane B's CHANGELOG-changed gate because the existing `^src/` regex didn't fire on `package.json`, `vite.config.ts`, `tsconfig.json`, or `api/` changes alone. A dep-bump PR could land without a CHANGELOG entry, leaving the historical record incomplete.

F.W3 Lane B broadens the gate's filter to catch:

- `src/**` — already covered.
- `package.json` (top-level) — dep/version drift.
- `vite.config.ts` — build behaviour drift.
- `tsconfig.json` — compiler-flag drift.
- `api/src/**` — backend source drift.
- `api/package.json` — backend dep drift.

**Lockfile-only changes (`package-lock.json` only) remain excluded** — pure version-resolution updates don't need CHANGELOG entries.

---

## §2 — Diff applied

### Before (E.W4 Lane B step)

```yaml
            - name: CHANGELOG-changed gate (PR-only)
              if: github.event_name == 'pull_request'
              run: |
                  set -euo pipefail
                  git diff --name-only origin/${{ github.base_ref }}...HEAD > diff-files.txt
                  echo "Files changed in PR:"
                  cat diff-files.txt
                  if grep -q '^src/' diff-files.txt; then
                      if ! grep -q '^CHANGELOG.md$' diff-files.txt; then
                          echo "::error::CHANGELOG.md must be updated when src/ is touched"
                          exit 1
                      fi
                      echo "src/ touched; CHANGELOG.md also touched — gate PASS."
                  else
                      echo "src/ not touched; CHANGELOG gate skipped."
                  fi
```

### After (F.W3 Lane B replacement, verbatim from F.W3.md spec)

```yaml
            - name: Assert CHANGELOG touched when src/, package.json, vite/ts config, or api/ is touched
              if: github.event_name == 'pull_request'
              run: |
                  git diff --name-only origin/main...HEAD > diff-files.txt
                  if grep -qE "^(src/|package\.json$|vite\.config\.ts$|tsconfig\.json$|api/(src/|package\.json$))" diff-files.txt; then
                      grep -q "^CHANGELOG\.md$" diff-files.txt || (echo "CHANGELOG.md must be updated when src/, package.json, vite.config.ts, tsconfig.json, or api/ source/manifest is touched" && exit 1)
                  fi
```

---

## §3 — Verification matrix

| Check | Method | Outcome |
|-------|--------|---------|
| YAML syntax valid | `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/node.js.yml'))"` | PASS |
| Regex semantics — `src/` | grep -E `^(src/...` matches `src/index.ts` | PASS |
| Regex semantics — `package.json` | grep -E `^...package\.json$` matches top-level only | PASS |
| Regex semantics — `vite.config.ts` | matches top-level only | PASS |
| Regex semantics — `tsconfig.json` | matches top-level only | PASS |
| Regex semantics — `api/src/` | matches `api/src/foo.ts` | PASS |
| Regex semantics — `api/package.json` | matches | PASS |
| Lockfile exclusion | `package-lock.json` does NOT match | PASS |

The regex `^(src/|package\.json$|vite\.config\.ts$|tsconfig\.json$|api/(src/|package\.json$))` uses anchored alternations so a top-level `package.json` line matches while a nested `demo/package.json` (if one existed) would not.

---

## §4 — Sub-gate verdict

**Lane B sub-gate: PASS**

The CHANGELOG-changed PR gate now fires on the F-AUDIT-6 §5 broadened scope. The W8–W12 dep-bump shape (which historically slipped through the `^src/` filter) is now caught at the PR check.
