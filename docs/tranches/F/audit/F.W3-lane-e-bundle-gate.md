# F.W3 — Lane E — Bundle-size gate (`dist/value.js` ≤ 145 KB raw)

**Date**: 2026-05-21
**Lane**: F.W3 Lane E — CI hygiene (bundle-size budget).
**Authority**: F.W3.md Lane E + F-AUDIT-6 §6.
**Dispatch HEAD**: `df0650c` (F.W2 close).
**File touched**: `.github/workflows/node.js.yml` (CI step added after `npm run build`).

---

## §1 — Motivation

Per **F-AUDIT-6 §6**, the library bundle should stay within a soft budget so dep-drift, accidental re-bundling, or scope creep regressions surface at PR time rather than at consumer publish time.

Current measurements (post-F.W2 close, df0650c, fresh build):

| Bundle | Size (bytes) | Size (KB) |
|--------|------------:|----------:|
| `dist/value.js` (raw) | 124,936 | ~122.0 KB |

The dispatch spec sets the budget at **≤ 145 KB raw (148,480 bytes)** — ~20 KB headroom over current measurements. Generous enough to absorb normal feature growth but tight enough to surface bundling regressions.

---

## §2 — Diff applied

Inserted as a new CI step in `.github/workflows/node.js.yml` immediately after `npm run build` + `Log dist sizes` + the Lane D dts-layout proof step:

```yaml
            # ─── Bundle-size gate (F.W3 Lane E) ─────────────────────
            # dist/value.js post-F.W1 raw is ~125 KB. Budget: ≤ 145 KB
            # raw (148480 bytes) with ~20 KB headroom. The stat -c%s
            # (Linux/Ubuntu CI) || stat -f%z (macOS local) fallback
            # handles both platforms.
            - name: Assert dist/value.js size budget (≤ 145 KB raw)
              run: |
                  SIZE=$(stat -c%s dist/value.js 2>/dev/null || stat -f%z dist/value.js)
                  if [ "$SIZE" -gt 148480 ]; then
                      echo "dist/value.js size budget exceeded: $SIZE bytes (gate ≤ 148480 = 145 KB raw)"
                      exit 1
                  fi
                  echo "dist/value.js size: $SIZE bytes (gate ≤ 148480 PASS)"
```

The `stat -c%s` (Linux GNU coreutils, CI Ubuntu) || `stat -f%z` (BSD/macOS local dev) fallback keeps the step portable across CI Ubuntu and local macOS development without `wc -c` indirection or `node -e` overhead.

---

## §3 — Verification matrix

| Check | Method | Outcome |
|-------|--------|---------|
| YAML syntax valid | `python3 -c "import yaml; yaml.safe_load(...)"` | PASS |
| Current bundle size | `stat -f%z dist/value.js` | 124,936 bytes |
| Budget threshold | 148,480 bytes (145 × 1024) | configured |
| Headroom | 148,480 − 124,936 = 23,544 bytes (~23 KB) | OK |
| Local simulate-gate | `SIZE=124936; [ "$SIZE" -gt 148480 ] && echo FAIL \|\| echo PASS` | PASS |

The `2>/dev/null` on the `stat -c%s` invocation silences the BSD-stat "illegal option" error on macOS so the `||` falls through cleanly to the BSD form. On CI Ubuntu, the GNU form succeeds and the BSD form is never invoked.

---

## §4 — Sub-gate verdict

**Lane E sub-gate: PASS**

Bundle-size gate added; current measurement (124,936 bytes) sits ~23 KB under the 148,480-byte budget. Any future regression that pushes `dist/value.js` above 145 KB raw will fail CI on the matrix job, before merge.
