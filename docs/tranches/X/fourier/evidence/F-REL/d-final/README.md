SERVED MODEL: claude-opus-5-5

# F.REL `.d`, final sitting (2026-10-16): deploy and verify after `.g` merged `79f1a43`

Receipt: `docs/tranches/X/execution/C/F-REL.md`, section `### F-REL.d — sitting (RESUME 2026-10-16 (e))`.

| File | What it holds |
|---|---|
| `webhook-journal-r-h2.log` | Host webhook journal, read-only over ssh: the push of `79f1a43` (18:19:55Z) ran the host's old `f2fe447` in-place hook (R-h2). Build until 18:21:09, `up -d` (recreate) at 18:21:09, nginx started 18:21:19, health gate GREEN at 18:21:31, migrations OK, `DEPLOY OK f2fe447 -> 79f1a43` at 18:21:39. |
| `health-poll.sh`, `health-poll.log` | `GET /health` every ~2 s, 18:22:07 to 19:31:10Z: 1994 polls, 0 non-200. This covers the SPA deploy (deploy-pages run 38952830238, 19:09:34 to 19:11Z). It does **not** cover the R-h2 recreate window, 18:21:09 to 18:21:31, because the push fired before this seat opened. |
| `pages-smoke.log` | `scripts/pages-smoke.sh` against the new SPA: bundle `index-BSzuH9o_.js` (the old one was `index-BYSiPuAh.js`), health 200, ACAO, cert, PASS. |
| `openapi-after.json` | 42 paths, version 0.2.0, including `/publish`, `/unpublish`, `/remix` and `/diff`. Before: 34 paths, none of them. |
| `preflight.txt` | PATCH preflight (`if-match, idempotency-key, content-type`) returns 200; DELETE preflight returns 200. |
| `pre-spa/` | Probe at `08a236a` against the new API and the old SPA: 14/21. |
| `verify-1-unpaced/`, `verify-2-unpaced/` | Probe on the new SPA before the pacing and owner-preview fixes: 13/21 and 14/21. These runs show defects in the probe itself (an unauthenticated draft preview, and a burst past the 10/60 s write budget) and PD-2. |
| `verify-3/`, `verify-4/` | Probe at `06c2d92` on the new SPA: **15/21 ×2**. The 6 RED rows all come from PD-1. |
| `pd1-weak-etag-repro.txt` | curl repro: with `Accept-Encoding: identity` the GET ETag is strong and PATCH returns 200; with gzip the GET ETag is `W/"…"` and PATCH returns 412. |

## Product defects measured (both outside `.d`'s writable set)
- **PD-1 (blocks 6 of 21 rows).** The edge `nginx/fourier.conf:75-76` gzips `application/json`, and nginx weakens a strong ETag to `W/"…"` when it compresses. The API's `require_if_match` (`api/lib/crud/etag.py:41`) compares strongly, so every If-Match a browser replays from a GET returns 412. This breaks publish, PATCH and DELETE in the real SPA too (`web/src/stores/workspace.ts` replays the GET validator).
- **PD-2.** `RateLimitHeaderMiddleware` is registered last, so it is the outermost middleware (`api/main.py:115`). Its 429 never passes through `CORSMiddleware`, and browsers report it as a CORS error. This is the same class of defect as §Why 3.
