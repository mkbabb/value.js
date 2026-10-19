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

## ADDENDUM 2026-10-09 (a) — escalations ruled (COHESION §0ew); order `.mem → .w → .vb → .g → .d`
- **`.mem`:** peak RSS ≤ 1.6 GB per default extraction of every model on every harness image, and a container smoke under `memory: 2G`. Subject-mask IoU against the 1024 ensemble: mean ≥ 0.97, min ≥ 0.93. Raising the cap is not a cure. Writable: `contours/ml.py`, its tests, and the harness memory probe.
- **`.w`:** consumer e2e defects cured in `web/src` under §0ev.3. Producer-owned failures go only into `web/e2e/producer-held.json` (test id, O-id, expiry), which CI's deploy gate excludes and prints. Relay each one to glass BK.
- **`.vb`:** visual checkpoints re-baselined at HEAD, darwin locally and linux in the Playwright docker image, under the heavy-run lock. The redesigned frames are the accepted state.
- `.g` then `.d` as specified, gated on `.mem` and the e2e being GREEN outside the manifest.

## ADDENDUM 2026-10-13 (b) — ESC-FREL-mem-1 ruled (COHESION §0ey)
`.mem2` tries the routes in order, and the first one meeting both gates wins: (a) our own BiRefNet-lite export (dynamic axes, or 768/512; `scripts/export-birefnet-lite.py`, with torch at export time only; a release asset `models-2026-10`, sha-pinned, licence recorded); (c) a measured alternative second model, ISNet-general-use first; (b) the best memory-conforming candidate, with each image under 0.93 handed by name to F.CT3. Then `.w → .vb → .g → .d`. Grant: `scripts/export-birefnet-lite.py`, `contours/ml.py`, its tests, the memory probe, and the release asset.

## ADDENDUM 2026-10-15 (c): ESC-FREL-mem2-1 RULED (COHESION §0ff)
- **Unit `.mem3`** re-premises `test_person_cut_removes_what_stands_beside_the_sitter`. The mask is the model mask united with a committed fixture: the 1024-era leaf region beside the sitter, as a boolean PNG under `tests/fixtures/` with its provenance named.
- **Every assertion is kept verbatim.** Falsifier: RED with the person cut disabled, GREEN ×2 on the product.
- **Also granted:** the `.gitignore` negation `!scripts/export-birefnet-lite.py`.
- **Landing:** `.mem2` and `.mem3` land together on `m/w1-bump-migration`, then `.w → .vb → .g → .d`.
- **F.CT3's worktree is never touched.** F.CT3 takes the re-premised test on merge-forward, keeping the union of assertions.
- **Heavy runs** go through `~/.claude/guard/guarded`, with the API at `COMPUTE_CONCURRENCY=1`.

## ADDENDUM 2026-10-16 (d): ESC-FREL-w-1 and ESC-FREL-vb-1 RULED (COHESION §0fk)
- **`.w2` (w-1 (a)).** Grant: `web/e2e/contrast-pairs.ts`, `producer-held.json`, the F-W4 §4 list addendum, and a BK relay.
  - Stale rows are re-pointed to today's paint. Each keeps its floor and is graded live; a RED here is cured in `web/src`.
  - FR-USB-5 is retired (R-e-2) and relayed.
  - GAB-1 `--tier-*` and HLG-37 are held BY PAIR ID and relayed.
  - The six awaiting stacks are authored.
  - Gate: contrast-floor GREEN ×2 outside the pair-level manifest.
- **`.vb2` (vb-1 (a)+(b)+(c)).**
  - A deterministic gallery detail-route stub in `fixtures/gallery.ts`; item 5 is re-baselined only on a read lawful diff.
  - The CI e2e job runs in `mcr.microsoft.com/playwright:v1.61.0-noble`.
  - A report artefact is uploaded on failure.
  - Gate: visual-checkpoint GREEN ×2 locally and on a fresh m/w1 CI.
- **Then:** `.g` (merge, as ruled), then `.d` (deploy), then close, then check. g-6 and d-1 dissolve in that order.
- R-4 and R-6 are owner items and do not block. R-8 is cured by the orchestrator.

## ADDENDUM 2026-10-16 (e): ESC-FREL-vb2-1 RULED (COHESION §0fo)
- `.x5`: first diagnose the 2 px `/equation` dock-run overflow at 390 in `playwright:v1.61.0-noble`, separating consumer content from glass `dock-layer` sizing.
  - **(a) Consumer cause:** cure `/equation` dock content in `web/src`. Use the priority-prefix with the overflow going to the existing menu; seats stay ≥ 44 px. No clipping and no fitted widths.
  - **(b) Glass cause:** hold X-5 @390 by test id in `producer-held.json` with a new O-id, expiring at the 10.2.0 repin, and relay it to BK.
- In either arm: X-5 ×2 in the container, darwin stays GREEN, and a fresh m/w1 CI is GREEN outside the manifest.
- Then `.g` (merge), `.d` (deploy), the close and the check.

## ADDENDUM 2026-10-16 (f): ESC-FREL-d-3 RULED (COHESION §0fq)
- `.pd`:
  - PD-1 arm (a): `application/json` leaves `nginx/fourier.conf` `gzip_types`, so the strong ETag survives the edge. Strong If-Match comparison is kept. Test: GET → PATCH with If-Match under gzip gives 200, a stale tag gives 412, in local nginx-docker and on prod ×2.
  - PD-2: `CORSMiddleware` is registered outermost in `api/main.py`, so a 429 carries CORS and `RateLimit-*` is exposed. Pytest RED → GREEN ×2.
- `.g2`: merge to master, then master CI GREEN ×2.
- `.d`: deploys once the owner sets R-h1 (`FOURIER_DEPLOY_ALERT_WEBHOOK`); until then BLOCKED-ON-OWNER. After the deploy, prod-verify 21/21 ×2.
