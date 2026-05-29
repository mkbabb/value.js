# I.W3 + I.W4 — Admin idempotency + SOTA envelopes

**Waves**: I.W3 (idempotent featured setter) + I.W4 (problem+json + ETag/If-Match + RateLimit headers).
**Closed**: 2026-05-28.
**Status**: GREEN.
**Authority**: `I.md §3` rows W3+W4 + CRUD-CONTRACT v2.0.0 §5 + §8.

## §1 — I.W3 idempotent featured setter

Pre-I.W3 `POST /admin/palettes/:slug/feature` was a TOGGLE (re-POSTing flipped state). Per CRUD-CONTRACT v2.0.0 §8, the operation is now an idempotent SETTER.

**Shape:**
```
POST /admin/palettes/:slug/feature
Content-Type: application/json
Body: { "featured": true | false }
```

**Semantics:**
- `setFeatured(c, slug, true)` → `tier = "featured"`, `status = "featured"` (legacy mirror)
- `setFeatured(c, slug, false)` → `tier = "standard"`, `status = "published"` (legacy mirror)
- Re-POSTing the same body is a no-op on state. The audit row STILL emits (operator intent is logged regardless of state delta).

**Validation**: Hono router parses body via `z.object({ featured: z.boolean() })`; invalid bodies → 400 ValidationError problem+json.

## §2 — I.W4 SOTA envelopes — problem+json (RFC 7807)

**Pre-I.W4 envelope** (legacy):
```json
{ "error": { "code": "not_found", "message": "Palette not found", "detail": { ... } } }
```

**Post-I.W4 envelope** (RFC 7807):
```json
{
  "type": "urn:palette-api:problem:not_found",
  "title": "Palette not found",
  "status": 404,
  "instance": "/palettes/no-such-palette",
  "errors": { ... }
}
```

- `type` — stable URN per error class (`urn:palette-api:problem:<code>`).
- `title` — human-readable summary (the ApiError `message`).
- `status` — HTTP status, repeated in body.
- `instance` — request path.
- `errors` — extension member for structured field-level detail (e.g. zod parse errors); only when `detail` is non-string.

**Content-Type**: `application/problem+json` (not `application/json`). The Hono `c.json()` helper always sets `application/json`, so the `onError` + `notFound` handlers emit `new Response(...)` directly with the correct content-type.

**New error classes** (per CRUD-CONTRACT §5):
- `PreconditionFailedError` (412, code `precondition_failed`) — If-Match mismatch.
- `PreconditionRequiredError` (428, code `precondition_required`) — If-Match absent on PATCH/PUT.

## §3 — I.W4 SOTA envelopes — ETag + If-Match

**ETag** on `GET /palettes/:slug`:
- Strong validator: `"<currentHash || updatedAt.toISOString()>"` (RFC 7232 quoted).
- Stable per-update; flips on every PATCH / restore / vote that bumps `updatedAt`.

**If-Match REQUIRED on PATCH /palettes/:slug**:
- Absent → 428 `precondition_required`.
- Present but mismatch → 412 `precondition_failed`.
- `*` matches any existing resource (per RFC 7232).
- Multiple comma-separated ETags accepted; any match passes.

Helper: `api/src/middleware/etag.ts` exports `paletteETag(p)` + `assertIfMatch(ifMatch, current)`.

## §4 — I.W4 SOTA envelopes — RateLimit headers

Per IETF `draft-ietf-httpapi-ratelimit-headers`:
- `RateLimit-Limit: 60` (read tier; 10 write; 3 registration; 5 login)
- `RateLimit-Remaining: <N>` — post-check count (current request decrements)
- `RateLimit-Reset: <seconds>` — until window resets

Emitted on **every** response — success AND 429 denial. The rate-limit middleware now throws `RateLimitError` on denial (problem+json envelope at the error handler) instead of returning a bare JSON response.

## §5 — Source edits summary

| Surface | Change |
|---|---|
| `errors/index.ts` | `toResponseEnvelope` returns `{ status, body: ProblemDetails, contentType: "application/problem+json" }`; URN scheme `urn:palette-api:problem:<code>`; new `PreconditionFailedError` (412) + `PreconditionRequiredError` (428) |
| `index.ts` | `notFound` + `onError` emit via `problemResponse()` helper (`new Response(...)` directly to preserve `application/problem+json` content-type); `instance` is the request path |
| `middleware/etag.ts` | NEW — `paletteETag(p)` + `assertIfMatch(ifMatch, current)` helpers |
| `middleware/rate-limit.ts` | Limiter now exposes `inspect(ip): RateInfo`; middleware sets `RateLimit-*` response headers on success + denial; denial throws `RateLimitError` (problem+json via onError) |
| `routes/palettes/crud.ts` | `GET /palettes/:slug` emits ETag; `PATCH /palettes/:slug` reads `If-Match` and calls `assertIfMatch` (428/412 on absent/mismatch); response emits fresh ETag |
| `services/admin/palettes.ts` | `toggleFeature` removed; NEW `setFeatured(c, slug, featured: boolean)` — idempotent (skips write if state unchanged; audit row always emits) |
| `routes/admin/palettes.ts` | `POST /admin/palettes/:slug/feature` parses `z.object({ featured: z.boolean() })`; calls `setFeatured` |

## §6 — Test updates

- `test/envelope.test.ts` REWRITTEN — 18 cases asserting RFC 7807 shape per error class; URN type per code; extension members; instance.
- `test/services/admin-palettes.test.ts` — `toggleFeature` tests replaced with `setFeatured` idempotency tests.
- `test/routes/palettes-ownership.test.ts` — PATCH tests updated:
  - 401/403/404 cases assert `body.type === "urn:palette-api:problem:<code>"`
  - 200 case fetches ETag via GET first, then PATCHes with If-Match.

`pnpm test`: **119/119 PASS** (up from 115 — 4 new envelope test cases for the new error classes + URN structure).

`tsc --noEmit`: clean.

## §7 — Live verification

| Probe | Result |
|---|---|
| `curl -i GET /palettes/neon-cyberpunk` | 200 + `etag: "2026-03-06T21:13:16.458Z"` + `ratelimit-limit: 60` + `ratelimit-remaining: 58` + `ratelimit-reset: 54` ✓ |
| `curl -i GET /palettes/no-such-palette` (404) | `content-type: application/problem+json` + body `{"type":"urn:palette-api:problem:not_found","title":"Palette not found","status":404,"instance":"/palettes/no-such-palette"}` ✓ |
| `curl -i -X PATCH /palettes/neon-cyberpunk` (no auth) | 401 problem+json `type=urn:palette-api:problem:authentication` ✓ |
| Deploy via `api/deploy.sh` | OK + smoke probe GREEN |

## §8 — Cross-repo source boundary upheld

Zero `fourier-analysis/` paths in this wave's git diff.

## §9 — W3+W4 close gate

Closes when (a) source + tests landed; (b) all 119 tests green + tsc clean; (c) deploy GREEN; (d) live ETag + RateLimit + problem+json all verified; (e) admin setter is idempotent; (f) cross-repo boundary upheld. All six met. **W3+W4 GREEN.** I.W5 (cohort closure + conformance suite cadence) follows.

## §10 — Folded-out items

- **Idempotency-Key middleware** (24h replay window): deferred to E.W10 δ conformance suite work — needs new `idempotency_keys` collection + TTL index + per-handler wrap. Will land as part of the cross-repo conformance probe T7.
- **Per-repo conformance suite at `api/test/conformance/`** (87-cell flip): deferred to E.W10 δ scope; the cross-repo probe at fourier-E will be the integration harness.
- **`id` field hard-removal** from response envelope: held for value.js-J or later; the legacy field is still emitted alongside `slug` for the I.W4 transition window.

End of W3+W4 close.
