SERVED MODEL: claude-opus-5-5

# F-REL.d — re-sit 2026-10-13 (19:11Z): read-only readings of the live host; no deploy fired

Status ESCALATED (ESC-FREL-d-1 stands). `origin/master` = `ad62881` (unmoved since 10-06); `m/w1-bump-migration` = `c6a242d`, 439 ahead, NOT merged (`.g` sitting 3 ESCALATED, ESC-FREL-g-4). Both deploy paths are fail-closed on a green master CI, so neither fired and the live host is the pre-F.REL one.

| file | command | reading |
|---|---|---|
| `pages-smoke.log.txt` | `bash scripts/pages-smoke.sh` | rc 0, PASS; bundle `/assets/index-BYSiPuAh.js` (the hotfix build, same hash as 10-09) |
| `certs.txt` | `openssl s_client … \| openssl x509 -noout -enddate` | api.fourier `Jan 4 15:19:06 2027 GMT`; fourier `Dec 22 20:13:07 2026 GMT` |
| `openapi-reading.txt`, `openapi-paths.txt` | `curl …/openapi.json` | 34 paths, version 0.2.0, none of publish/remix/diff; path list identical to `../openapi-paths-now.txt` |
| `patch-preflight.txt` | `curl -X OPTIONS …/api/visualizations/x` with `Access-Control-Request-Method: PATCH`, headers `if-match,content-type,x-session-token` | `HTTP/1.1 400`; allow-methods `GET, POST, PUT, DELETE, OPTIONS`; allow-headers lack `If-Match` |

Not run: `scripts/prod-verify.mjs`. The host is byte-identical to the 10-09 BEFORE read (`../d-verify-before/`, 10/20), and the probe writes to production; a second BEFORE run adds rows and no information. G-outage has no deploy to poll through.
