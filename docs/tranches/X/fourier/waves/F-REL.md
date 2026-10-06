# F.REL — fourier production release: a green master, a healthy API on the host, the new contour pipeline served, CORS complete (minted 2026-10-06, COHESION §0em)

## State
- **Opens after:** F.W14V CLOSED and F.CT phase 2 CLOSED (the tournament winner is production code). **Track:** C. **Model:** Opus 5.5 every seat. **Record:** `docs/tranches/X/execution/C/F-REL.md`.
- **Repo:** fourier-analysis (`api/**`, `Dockerfile*`, `docker-compose*.yml`, `.github/workflows/**`, `scripts/**`, and the merge of `m/w1-bump-migration` into `master`). The host deploy runs over the existing webhook. Owner authorization: publish, push and deploy (the begin-word).
- **Law:** browsers headless only (§0ei); no force-push; the host is changed only through its deploy path and config, never by hand-editing the running container.

## Why (measured by the hotfix seat, receipt `docs/tranches/X/fourier/evidence/deploy-hotfix-2026-10-06/RECEIPT.md`, `ca7d74f2`)
1. **Production served a dead SPA** (an empty `VITE_API_URL`). It is now hotfixed (master `ad62881`; hotfix branch `9eed6ae` live as Cloudflare `db51e089`; post-deploy smoke `scripts/pages-smoke.sh`), but **the SPA live is the June build** (`1fd67c86` plus the fix), because **master CI has been RED on e2e since tranche J**, so no newer SPA ships.
2. **The host API is stuck at `f2fe447` (2026-05-31).** Every master push makes the webhook deploy, fail its health check and roll back (about 3 minutes of API outage per push; observed 16:45:30–16:48:44Z for `ad62881`). Production lacks J's `/publish`, `/remix` and `/diff`, and everything since.
3. **Contour extraction is 500 in production:** `OSError: Read-only file system: '/home/app/.cache'`. `ml.py` caches models in `$HOME`, while `docker-compose.prod.yml` makes the container read-only except `/tmp`. The 500 carries no CORS header, so browsers misreport it as a CORS error.
4. **The CORS gap in code** (`api/main.py`): `PATCH`, `If-Match` and `Idempotency-Key` are not allowed and `ETag` is not exposed, so a browser visualization edit or delete fails its preflight.
5. `983cbbf` (the deploy-file cherry-pick onto `m/w1-bump-migration`) is local and unpushed, because it sits on Track C's unpushed `2935a81`.

## Units
- **`.m`: models are baked, not fetched.**
  - The image build downloads and verifies (sha256 from the `SubjectModelSpec`s) every model the production pipeline uses, including the F.CT phase-2 winner's (YuNet and BiSeNet), into an image path.
  - `ml.py` reads a configurable model dir (`FOURIER_MODEL_DIR`, defaulting to the user cache dir in development), so production never writes to a read-only filesystem.
  - Errors return the API's typed problem with CORS headers (a 500 path must not masquerade as CORS).
  - Falsifier: an api test with a read-only HOME and the model dir set extracts contours; a container smoke runs extraction under `read_only: true`.
- **`.c`: CORS complete.** Allow `PATCH`, `If-Match`, `Idempotency-Key`, `X-Session-Token`, `Authorization` and `Content-Type`; expose `ETag`, from one source of truth with the client's request headers. Falsifier: preflight tests for every client verb and header, plus a headless browser edit and delete against a local stack.
- **`.h`: a healthy host deploy.**
  - Reproduce why master's API fails the host health check (the image builds and boots locally with the production compose and env; read the host's deploy log through the webhook's own output).
  - Cure the cause, whether env, migrations, the health route, compose or resource limits.
  - The deploy must be health-gated with no outage: start the new container, health-check it, then switch, so a failed deploy never takes the old one down.
  - Falsifier: a production-compose boot plus health on CI.
- **`.g`: master green.** Merge `m/w1-bump-migration` to `master` (no force; a merge commit or PR per the repo's practice) once F.W14V and F.CT have closed. The master e2e goes GREEN (the named honest-RED set carries its glass ADOPT-AT-LANDING rows explicitly in the config, never as silent skips), so the SPA's CI-gated deploy ships again.
- **`.d`: deploy and verify.** The SPA via the standing workflow (smoke GREEN); the API via the webhook (health GREEN, zero-downtime). Verify headlessly in production:
  - upload `assets/portraits/daraksha.jpg` and the EXIF-6 original;
  - contour extraction with the new pipeline;
  - the epicycle preview;
  - publish, remix and diff;
  - edit and delete (CORS);
  - the gallery.

## Gates
pytest and the api tests GREEN ×2; web vue-tsc, vitest and e2e GREEN ×2 (the named set explicit); production smoke GREEN; the end-to-end production check GREEN; the cert more than 14 days out; no API outage during the deploy (health polled through it).
