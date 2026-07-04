# S-11 — "the palette API seems broken" (against dev :9000) — root-cause lane

**Slug:** `api-broken-rootcause` · **Mode:** AUDIT ONLY · **Repo:** value.js @ `c5aa091` (tranche-q)
**Probed:** live dev `http://localhost:9000` (in-browser) + prod `https://api.color.babb.dev` (curl + browser fetch)

---

## TL;DR verdict

The dev-server breakage is **broken-by-CORS**, full stop. Every other hypothesis is
secondary or false:

| Hypothesis | Verdict | Evidence |
|---|---|---|
| **broken-by-CORS** | **PRIMARY ROOT CAUSE** | Prod `Access-Control-Allow-Origin` is *fixed* to `https://color.babb.dev`; `localhost:9000` is not whitelisted → browser blocks every response. LIVE console error below. |
| broken-by-latch-misbehavior | **FALSE** (latch is correct) | Latch trips because the CORS block makes `fetch()` reject; browser security makes CORS-refusal indistinguishable from network-down. Spec-correct. One cosmetic wrongness (P2). |
| broken-by-stale-prod | **TRUE — but hits the REAL frontend (color.babb.dev), not the :9000 CORS symptom** | Prod is I-era: `/health`,`/diff`,`/openapi`,`/publish` = 404; `/palettes`,`/colors/*`,`/palettes/mine` present. This is what **X1 fixes**. |
| real-client-bug | **NO transport bug** | `client.ts` BASE_URL resolution, retry, latch are all correct. The real defect is a **dev-workflow/ops design gap** (below). |

**The one-sentence chain:** live `:9000` was started with bare `npm run dev` (`vite --port 9000`, PID 88836) → no local api, no mongo, `VITE_API_URL` unset → `BASE_URL` falls through to prod `api.color.babb.dev` (`client.ts:34-35`) → prod's CORS allow-list excludes `localhost:9000` → browser blocks → `fetch()` rejects → the availability latch trips to `unavailable` → **every** palette surface (browse/save/publish/color-names) silently degrades to "backend offline — working locally."

---

## Evidence

### 1. Live in-browser (the app's own startup call), captured at `:9000`
```
Access to fetch at 'https://api.color.babb.dev/colors/approved' from origin
'http://localhost:9000' has been blocked by CORS policy: Response to preflight
request doesn't pass access control check: The 'Access-Control-Allow-Origin'
header has a value 'https://color.babb.dev' that is not equal to the supplied
origin.
Failed to load resource: net::ERR_FAILED @ .../colors/approved
```
Manual browser fetch from the `:9000` page context:
```
GET https://api.color.babb.dev/palettes   -> TypeError: Failed to fetch
GET https://api.color.babb.dev/health      -> TypeError: Failed to fetch
```
The `/palettes` line is the definitive CORS proof: **curl returns HTTP 200 with a
full palette payload** for that exact URL, but the browser converts the response to
a network-level `Failed to fetch` — purely because ACAO ≠ origin.

### 2. Prod CORS returns a FIXED origin regardless of requester
```
curl -D- https://api.color.babb.dev/palettes -H 'Origin: http://localhost:9000'
  access-control-allow-origin: https://color.babb.dev     # NOT reflected
curl ... -H 'Origin: http://localhost:5173'  -> ACAO: https://color.babb.dev
curl ... (no Origin)                          -> ACAO: https://color.babb.dev
OPTIONS preflight, Origin localhost:9000 -> 204, ACAO: https://color.babb.dev
```
Mechanism: `api/src/middleware/cors.ts:24-30` — with a non-empty `ALLOWED_ORIGINS`
allow-list, a non-matching request origin falls back to *the first allowed origin*
(`ALLOWED_ORIGINS.values().next().value`). Prod's host `.env` sets
`ALLOWED_ORIGINS=https://color.babb.dev,https://fourier.babb.dev`
(`api/.env.example:14`; landed I.W0 + fourier-E.W1 host edit). `localhost:9000` is
absent → the fixed-fallback guarantees a mismatch on every request from dev.

### 3. Prod is stale (I-era) — the X1 concern, orthogonal to the CORS symptom
```
/health -> 404     /diff -> 404     /openapi -> 404     /openapi.json -> 404
/palettes -> 200   /colors/approved -> 200   /colors/tags -> 200
/palettes/mine -> 401 (route present, auth-gated)
POST /palettes/:slug/publish -> 404 (route absent — pre-J deploy)
root / -> {"status":"ok","service":"palette-api"}
```

### 4. The dev launch was the footgun path, not the honest one
- `package.json:71` — `"dev": "vite --port 9000"` — bare vite. No backend, no
  `VITE_API_URL`. This is what documentation (`demo/CLAUDE.md`) calls "the dev server."
- `lsof :9000` → the live listener is `node` PID 88836 (bare vite). **No** `tsx watch`
  / hono process; ports 8130/8090/8787/3000/8080 have no api; docker daemon down.
- `client.ts:35` — `BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL`
  and `client.ts:34` — `DEFAULT_REMOTE_API_URL = "https://api.color.babb.dev"`.
  Unset env → prod. Confirmed live (fetch went to `api.color.babb.dev`).
- The **honest** dev-backend path already exists and wires everything correctly:
  `scripts/dev.sh` (`start_backend` @ L279-289 sets `ALLOWED_ORIGINS=http://localhost:$FRONTEND_PORT`;
  `start_frontend` @ L291-296 sets `VITE_API_URL=http://localhost:$BACKEND_PORT`; provisions
  mongo rs0 via docker). It is simply **not reachable through any `npm run` script** and
  was not used to launch the live `:9000`.

---

## What Browse / Save / Publish actually do right now

- **Against live `:9000` (bare `npm run dev`, VITE_API_URL unset):** ALL of
  browse / save / publish / color-name lookups fail identically — CORS-blocked at
  the browser, `fetch` rejects, latch trips, UI shows the degraded "working locally"
  state. Save still persists to localStorage (the save-P0 kernel), so no data loss;
  but nothing round-trips to the backend.
- **Against the REAL frontend `color.babb.dev` (allowed origin, prod I-era code):**
  browse (`GET /palettes`) and save (`POST /palettes`) **work**; publish / diff /
  remix **404** because those routes aren't deployed. That subset is the stale-prod
  breakage — the only part **X1 fixes**.

---

## What X1's completion fixes — and what it does NOT

**X1 = the R.W7 deploy of R-era api code to prod (pending; host webhook returned "Hook not found").**

- **FIXES:** prod gains `/health`, `/diff`, `/publish`, `/unpublish`, `/openapi`, etc.
  → on `color.babb.dev`, publish/diff/remix stop 404-ing. Resolves the stale-prod class.
- **DOES NOT FIX the dev `:9000` breakage.** Two reasons:
  1. CORS `ALLOWED_ORIGINS` is a **host `.env`** value applied at the deploy host, not
     shipped in the git artifact — a code deploy doesn't change it.
  2. Prod **should not** whitelist `localhost` anyway (production CORS should not admit
     dev origins — security smell). So even a perfect X1 leaves dev-against-prod
     CORS-dead by design. **The correct fix is that dev must stop targeting prod.**

---

## SHOULD dev target a local api? — the honest dev-backend story

**Yes — and the design already exists (`scripts/dev.sh`); it's just not wired into
the `npm` surface, so the path of least resistance (`npm run dev`) is a silent
prod-pointing footgun.** The gap:

- `npm run dev` → bare vite → prod api → CORS-dead (silent latch to "unavailable").
- `scripts/dev.sh up` → local api :BACKEND_PORT + mongo rs0 + `VITE_API_URL` wired +
  `ALLOWED_ORIGINS=localhost:9000` → everything round-trips.

Two divergent entrypoints, one documented and broken-for-palette, one correct and
undiscoverable. Per the no-silent-handling precept, the demo must **not** quietly
degrade when it's actually mis-configured (pointed at a cross-origin prod with no
`VITE_API_URL`); it should fail loud, or the entrypoint should just boot the stack.

---

## Findings + root-routing

### P0 — S-11.A · Unify the dev entrypoint; kill the silent prod-target footgun
**Route: value.js repo tooling** (`package.json` scripts + `scripts/dev.sh` +
`demo/CLAUDE.md`). Not a product-code bug — a dev-workflow defect.
`npm run dev` (`package.json:71`) must boot the full stack (delegate to
`scripts/dev.sh up`) so palette features work out of the box; if a frontend-only mode
is still wanted, name it explicitly (`dev:web-only`) and document that palette/API
features require the full stack. The current bare-vite `dev` silently points at prod
and CORS-dies — this is the direct cause of "the API seems broken."

### P1 — S-11.B · Complete X1: land R-era api on prod
**Route: api deploy / ops** (host webhook, not value.js code). The "Hook not found"
failure is a host-side adnanh/webhook config issue (`WEBHOOK_URL=deploy.babb.dev/hooks/value-js`,
`.env.example`). Completing it fixes `/health`,`/diff`,`/publish` on `color.babb.dev`.
Does nothing for dev (see above). Independent of S-11.A.

### P2 — S-11.C · Make the availability latch origin-honest (no silent mislabel)
**Route: value.js demo** (`demo/@/lib/palette/api/availability.ts` + `client.ts`).
The latch message "Backend unreachable — working locally." is *false* in the CORS
case (the backend is reachable; it refuses this origin). The latch cannot distinguish
CORS-refusal from network-down at the fetch layer (browser security), but the demo
CAN detect the *pre-condition*: `VITE_API_URL` unset **and** origin is `localhost`
**and** `BASE_URL` is cross-origin prod → surface an explicit dev-misconfig error
("dev is pointed at the prod API — CORS will block; run `scripts/dev.sh`"), not the
generic degraded affordance. Per no-silent-handling. (Largely subsumed once S-11.A
lands, but worth an explicit guard for the mixed case.)

### P2 (reject) — do NOT add localhost to prod ALLOWED_ORIGINS
**Route: api — explicitly NOT.** Whitelisting `localhost` on the production host `.env`
would "fix" dev-against-prod but is a security smell and mixes environments. The
correct fix is S-11.A (dev never targets prod). Recording this so it isn't proposed
as a shortcut.

---

## Candidate wave-items (for S)

- **S-11.A (P0, value.js tooling):** `npm run dev` → full stack via `scripts/dev.sh`;
  add explicit `dev:web-only` if a no-backend mode is retained; document the palette
  features → local-stack requirement in `demo/CLAUDE.md` + root `CLAUDE.md` Build section.
- **S-11.B (P1, api ops):** repair the deploy webhook ("Hook not found") and land X1;
  verify `/health`,`/diff`,`/publish` = 200 on prod post-deploy.
- **S-11.C (P2, value.js demo):** origin-aware explicit dev-misconfig failure in the
  availability path instead of the misleading "Backend unreachable" degraded state.

**Not implicated:** parse-that, glass-ui, keyframes, value.js `src/` — no routing there.
The break is entirely dev-workflow (value.js tooling) + a stale prod deploy (ops).
