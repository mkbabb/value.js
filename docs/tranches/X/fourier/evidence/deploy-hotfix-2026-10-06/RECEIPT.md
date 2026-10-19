# fourier production API-base hotfix: receipt (2026-10-06)

Authority: value.js `docs/tranches/X/COHESION.md` §0eh. Repo: `mkbabb/fourier-analysis`.

## Root cause (confirmed)
- `web/src/lib/api.ts`: `const BASE = import.meta.env.VITE_API_URL || ""`. Nothing in
  `deploy-pages.yml` → `scripts/pages-deploy.sh` set `VITE_API_URL`.
- The live bundle `assets/index-BI13Q2EH.js` (CF deployment `7906cefa`, 2026-06-01, master
  `1fd67c86`) contained `const R1=""`. Every API call went to Pages, and its `/* /index.html 200`
  rewrite answered `GET /api/health` with `200 text/html`.
- Production branch = `master`: CF project `fourier` has `production_branch: master`, and the
  workflow gate requires `head_branch == 'master'`. The last successful deploy-pages run was
  2026-06-02. Master CI has been red (e2e) since J, so the SPA never re-shipped.

## Fix (deploy path only, no app code)
- `scripts/pages-deploy.sh`: a master deploy builds with `VITE_API_URL=https://api.fourier.babb.dev`
  and refuses any other value. It also refuses to upload a bundle that lacks the base.
- `scripts/pages-smoke.sh` (new): fails unless the served bundle carries the base, `/api/health`
  is 200 JSON `{"status":"ok"}` over strict TLS with ACAO for the site, and the cert has more than 14 days left.
- `deploy-pages.yml`: a post-deploy smoke step. `.gitignore` un-ignores the smoke script.
- Commits: master `ad62881` (direct push, following repo practice: no PR has ever been opened);
  `hotfix/pages-api-base` `9eed6ae` = live code `1fd67c86` + the fix; `m/w1-bump-migration`
  `983cbbf` (cherry-pick, local only; see owner items).

## Deploy
- `workflow_dispatch` on `hotfix/pages-api-base`, run 37498222293. Attempt 1 deployed `52dbfe1f`.
  Its smoke then failed red on an API 503, which the master push caused (see owner items).
  Attempt 2 is green: **CF deployment `db51e089`** (canonical production, commit `9eed6ae`).
- `1fd67c86` was shipped rather than master tip `9d7c387` for two reasons. The live API (host at
  `f2fe447`) lacks J's `/publish`, `/remix` and `/diff` routes, and master's e2e is red.

## Verification (from outside, headless only)
- Bundle `index-BYSiPuAh.js` carries `https://api.fourier.babb.dev`. The smoke passed locally and in CI.
- API: `/api/health` 200 `application/json` `{"status":"ok"}`. ACAO is `https://fourier.babb.dev`
  with credentials. The cert (LE YE1, SAN includes api.fourier.babb.dev) expires 2027-01-04.
- Headless Chrome on `/w/`: UI upload of `assets/portraits/daraksha.jpg` →
  `POST /api/images` 200 (slug `faded-darting-onyx-yak`), and thumbnail and overlay load 200.
  `/gallery` → `GET /api/visualizations` 200. No API console errors, apart from extract-contour below.
- The test image cannot be deleted: there is no image DELETE route. It is unpinned, so the janitor
  prunes it after 30 days (`asset_max_age_days`).

## CORS state
- Works: GET, POST, PUT and DELETE, with the headers Content-Type, Authorization and X-Session-Token,
  and credentials.
- Gap (code, `api/main.py`): `PATCH`, `If-Match` and `Idempotency-Key` are missing, and `ETag` is
  not exposed. Visualization PATCH, and the If-Match DELETE from the browser, will fail preflight.
  The ETag captured by `api.ts` reads null cross-origin.

## Owner items
1. **Contour extraction 500s in production.** `POST /api/images/{slug}/extract-contour` raises
   `OSError: [Errno 30] Read-only file system: '/home/app/.cache'`. `ml.py` caches the u2netp
   model at `Path.home()/.cache`, but `docker-compose.prod.yml` has `read_only: true` with only
   `/tmp` as tmpfs. The 500 lacks ACAO, so the browser reports it as a CORS error. This is not
   fixed on master or on m/w1. The fix is code or compose (bake the model, or make the cache dir
   env-configurable onto a writable mount).
2. **Every push to master triggers an API outage of about 3 minutes.** The host webhook deployed
   `ad62881`, failed its health gate, and rolled back to `f2fe447` (16:45:30–16:48:44Z). The host
   has been pinned at `f2fe447` (last green 2026-05-31). Master's API does not come up healthy there.
3. The CORS gap above.
4. `m/w1-bump-migration` `983cbbf` is committed locally, unpushed. It sits on Track C's own
   unpushed `2935a81`, so pushing it would publish their commit too. Track C or the owner pushes.
