# F.W3 — Lane C — vue-tsc baseline lowering (strict zero gate)

**Date**: 2026-05-21
**Lane**: F.W3 Lane C — CI hygiene (vue-tsc baseline 126 → 0).
**Authority**: F.W3.md Lane C + F-AUDIT-3 §3 + F-AUDIT-6 §6.
**Dispatch HEAD**: `df0650c` (F.W2 close).
**Files touched**: `.github/workflows/node.js.yml` (gate step), `VENDOR-POLICY.md` (policy doc).

---

## §1 — Motivation

The vue-tsc error trajectory across tranches:

| Event | vue-tsc count |
|-------|---------------:|
| E.W4 close (accept + document, baseline 126) | 126 |
| Post-W12 dep lockstep | 120 |
| F.W0 Lane A (post-cleanup) | 118 |
| **F.W1 Lane C (zero-consumer vendor sweep)** | **0** |
| At F.W3 Lane C verify | 0 (confirmed by `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'`) |

Per F-AUDIT-3 §3 + F-AUDIT-6 §6, with the count at 0 and stable across two waves, the CI gate baseline should harden to `≤ 0` (strict zero-error). The previous gate accepted any value ≤ 126, which would silently allow regressions back into the deleted-subdir noise band.

---

## §2 — Diff applied

### A. node.js.yml — vue-tsc gate step

#### Before (E.W4 Lane C — accept + document, ≤ 126)

```yaml
            - name: Typecheck (vue-tsc --noEmit, error count <= 126)
              run: |
                  set +e
                  npx vue-tsc --noEmit 2>&1 | tee vue-tsc-output.txt
                  set -e
                  COUNT=$(grep -cE 'error TS' vue-tsc-output.txt || true)
                  echo "vue-tsc error count: $COUNT"
                  echo "vue-tsc baseline (per VENDOR-POLICY.md): 126"
                  if [ "$COUNT" -gt 126 ]; then
                      echo "::error::vue-tsc errors rose: $COUNT > 126 (regression vs. accepted-noise baseline)"
                      exit 1
                  fi
                  if [ "$COUNT" -lt 126 ]; then
                      echo "::notice::vue-tsc errors dropped: $COUNT < 126 (informational; consider updating VENDOR-POLICY.md baseline)"
                  fi
```

#### After (F.W3 Lane C — strict zero gate)

```yaml
            - name: Assert vue-tsc error count (strict zero gate post-F.W1 Lane C)
              run: |
                  COUNT=$(npx vue-tsc --noEmit 2>&1 | grep -c 'error TS' || true)
                  if [ "$COUNT" -gt 0 ]; then
                      echo "vue-tsc count rose: $COUNT (gate ≤ 0 post-F.W1 vendor sweep)"
                      exit 1
                  fi
                  echo "vue-tsc: $COUNT errors (≤ 0 gate PASS)"
```

### B. VENDOR-POLICY.md — "How we manage" + "Successor lanes"

Updated the "How we manage" paragraph to state the baseline is now **0** (strict zero-error). Added a new "F.W3 Lane C (DONE, 2026-05-21)" entry in the "Successor lanes" list referencing this doc.

---

## §3 — Verification matrix

| Check | Method | Outcome |
|-------|--------|---------|
| Local vue-tsc count | `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'` | 0 |
| YAML syntax valid | `python3 -c "import yaml; yaml.safe_load(...)"` | PASS |
| VENDOR-POLICY.md baseline language updated | grep `gate baseline.*0` / `strict zero-error` | PRESENT |
| VENDOR-POLICY.md successor lane entry | F.W3 Lane C line present | PRESENT |

The gate is now a hard 0-error CI requirement; any net-new vue-tsc error will fail the build.

---

## §4 — Sub-gate verdict

**Lane C sub-gate: PASS**

vue-tsc CI gate baseline hardened from 126 → 0 to match the post-F.W1 Lane C zero-error state. VENDOR-POLICY.md updated.
