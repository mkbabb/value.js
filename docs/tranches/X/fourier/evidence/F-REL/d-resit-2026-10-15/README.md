SERVED MODEL: claude-opus-5-5

# F-REL.d re-sit 2026-10-15 — read-only production readings (ESC-FREL-d-1)

No deploy fired: origin/master is `ad62881`, `m/w1-bump-migration` (`512f5a9`) is not merged (`git merge-base --is-ancestor` rc 1), and no master CI run succeeded (`deploy-pages` 38824392708 skipped). `.g` sitting 4 is ESCALATED (ESC-FREL-g-5).

| file | reading |
|---|---|
| `pages-smoke.txt` | `scripts/pages-smoke.sh` rc 0, PASS on the hotfix SPA `index-BYSiPuAh.js` (unchanged) |
| `certs.txt` | api notAfter Jan 4 2027 · SPA notAfter Dec 22 2026 (> 14 d) |
| `openapi.json`, `openapi-summary.txt` | 34 paths, v0.2.0, no publish/remix/diff; sorted paths identical to `../openapi-paths-now.txt` |
| `patch-preflight.txt` | OPTIONS with PATCH + if-match → 400; allow-methods lacks PATCH (pre-`.c` host) |

`prod-verify.mjs` not run (host unchanged; the probe writes to production). Health poller not started (no deploy to poll through).
