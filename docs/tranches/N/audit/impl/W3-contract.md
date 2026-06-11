# N.W3 lane W3-CONTRACT — contract honesty (diff serve · idempotency body-hash · URN convergence · conformance gap)

**Slice**: W3.F (remix `/diff` serve) · W3.G (idempotency body-hash 409) · W3.H (URN convergence)
· W3.H-tests (close the conformance gap). Ownership: `api/**` only. No commit.

**Gates**: `cd api && npx tsc --noEmit` → **0**. `cd api && npm test` → **214/214 green, 36 files**
(was ~182 at this slice's start after the W3-data/W3-txns slices; **+32** from 4 new wire-level
test files — count GREW, never shrank). No new `as any` / `as unknown as` / escape casts (the lone
`index.ts:185` `as unknown as` is the pre-existing policy-documented `server.close()` irreducible,
untouched).

---

## W3.F — the remix `/diff` surface: SERVE (the default held, sharpened to the honest site)

**Decision: SERVE the stored `atomDiff` honestly on the VERSION READ, keep persisting; do NOT
serve it on `/diff?from&to` (that endpoint must recompute), do NOT stop persisting.**

D4 found `PaletteVersion.atomDiff` "write-only dead storage": the `/diff?from&to` endpoint
`computePaletteDiff` recomputes via `diffAtoms(fromVersion.colors, toVersion.colors)` and never
reads the stored field. That observation is correct **for `/diff`** — and it is correct that `/diff`
SHOULD recompute: it answers an *arbitrary pair* on the single-parent chain, which a single stored
source→child edge-diff structurally cannot serve. Forcing the stored field onto `/diff` would be a
*wrong* serve. So the prompt's default ("make GET `/diff` serve the stored atomDiff") is honored in
spirit but routed to the site where the stored edge-diff is actually meaningful: the **version
read**. `GET /:slug/versions/:hash` already spreads the full `PaletteVersion` doc (incl. `atomDiff`)
onto the wire (`routes/palettes/versions.ts:48`) — the field WAS flowing, just untested and
undocumented. W3.F makes that serve **load-bearing**: a route-level test (`palettes-forks.test.ts`)
asserts a remix's recorded atom-diff round-trips identically through `GET /:slug/versions/:hash`
(`versionBody.atomDiff` deep-equals the remix response's `atomDiff`, non-empty). The field is no
longer dead storage. No source change was needed (the serve already existed) — the honest fix was
to bind it with a test + record the decision. The demo diff view lands at W6.D (the K-W3DIFF carry).

**Why not stop persisting (the cohort-only alternative):** the stored edge-diff is the provenance
record the remix HTTP response already returns (`{...formatted, remixedFrom, atomDiff}`, consumed
live) AND the per-edge diff a version read serves; it is the value.js twin of fourier's
`atomdiff.py` per `J-diff-shape §6`. It is not dead — it was untested. The evidence did not convince
me serving is wrong; it convinced me the serve site was mis-identified (D4 conflated "`/diff`
recomputes" with "the field is never read", but the field IS read on the version read).

## W3.G — idempotency body-hash (CS3.2 row)

`middleware/idempotency.ts` now records a sha256 of the raw request body alongside the stored
response. On a HIT: **same body-hash → verbatim replay** (unchanged); **different body-hash → 409
`urn:contract:idempotency-replay-conflict`** (new). This closes the CS3.2 row + the D2 §3 P2
divergence (value.js previously replayed the FIRST result regardless of body — a silent wrong-body
replay where the contract mandates a loud 409). The body is read once up front via `c.req.text()`
(Hono memoizes body access, so the handler's later `c.req.json()` resolves from the same cache — no
stream double-consume). A dedicated `IdempotencyConflictError` (409) carries the contract URN; it is
a distinct class from `ConflictError` (slug-conflict) so the per-class URN mapping stays honest. The
in-process LRU backing is unchanged — the sanctioned single-replica KISS relaxation (D2 §3 P2); the
body-hash conflict is now contract-faithful regardless of backing.

The prior conformance test that asserted the OLD violating behavior ("replay short-circuits even
when the second body differs") was rewritten into two honest tests: same-body → verbatim replay;
different-body → 409 `urn:contract:idempotency-replay-conflict`.

## W3.H — URN convergence: ADOPT `urn:contract:*` (the default held, with contract authority)

**Decision: converge value.js onto the shared `urn:contract:<kebab>` namespace.** This is not a free
choice — it is the **fourier-owned conformance matrix's own disposition**. `CONFORMANCE-MATRIX.md
§V2.1` dispositions value.js's adoption of `urn:contract:*` as **DEFERRED-TO-VALUE.JS (wave "I.W4"
in the matrix's naming)** (rows CS5.2, U-errors-3, U-slugs-3); `CRUD-CONTRACT.md §2 C2.5` *literally
binds value.js* to emit `urn:contract:slug-conflict`. The divergence was never deliberate — it was a
value.js debt the matrix already wrote down as owed. The default and the contract authority agree.

**Mechanism (KISS):** each `ApiError` subclass now carries a `typeUrn` field set to the contract URN
for its primary semantic; `toResponseEnvelope` emits `err.typeUrn`. The full map:
`validation→validation-failed`, `authentication→session-invalid`, `ownership→not-owner`,
`forbidden→admin-forbidden`, `not_found→not-found`, `conflict→slug-conflict`, `gone→soft-deleted`,
`precondition_failed→etag-mismatch`, `unprocessable→visibility-illegal-transition`,
`precondition_required→precondition-required`, `rate_limit→rate-limited`,
`configuration→admin-not-configured`, plus the new `idempotency_replay_conflict→
idempotency-replay-conflict`. The lone repo-local URN that remains is the **non-catalogued
internal-bug sentinel** `urn:palette-api:problem:internal` (there is no `urn:contract:internal` row;
an unhandled 500 is a value.js bug, not a contract-shaped condition) — and the per-class default
fallback for any future custom subclass that does not declare a `typeUrn`. The 404-fallback handler
(`index.ts` notFound) was also moved to `urn:contract:not-found` to match the `NotFoundError` class.

A few value.js error classes serve more than one contract row (documented at each subclass):
`OwnershipError` (wrong-owner + suspended-account), `ConflictError` (slug-conflict + flag-duplicate),
`ValidationError` (body-validation + flag-self), `UnprocessableEntityError` (visibility-transition +
diff-divergent-chain). The URN reflects the PRIMARY row; the per-call `title`/`detail` disambiguates.
This is the KISS shape (one stable URN per class) over a contrived per-call-site URN override — for
which the wire has **zero consumer**: I verified the demo's `ApiProblem` (`demo/@/lib/palette/api/
api-problem.ts`) branches on HTTP `status`, **never** on the literal `type` string (`.is(urn)` is
never called with any URN literal anywhere in `demo/` or `e2e/`). The URN change is wire-transparent
to every value.js consumer — confirming it is safe unilateral api-only work, exactly as the matrix's
DEFERRED-TO-VALUE.JS disposition intends.

All existing URN assertions were updated: `envelope.test.ts` (13 rows → contract URNs + the sentinel
+ the custom-fallback default), `crud.test.ts` (404 + 428 + 412), `palettes-ownership.test.ts`
(401 + 404 + 403), `idempotency.test.ts` (the new 409).

## W3.H-tests — close the conformance gap (inv-N-8)

Four new route-level (`buildTestApp` + real router) conformance files, closing the D5 §3.2 + E4 §5
"shipped route, no wire coverage" gaps:

| File | Tests | Closes |
|---|---|---|
| `test/routes/sessions-colors.test.ts` | 11 | sessions register→me→logout→login round-trip (real `resolveSession` against the DB) + the 401/400 envelopes; colors propose + approved/search/tags shapes (both were ZERO-coverage at any layer, D5) |
| `test/routes/palettes-forks.test.ts` | 9 | fork/remix/forks/provenance HTTP surface (auth gates, optional-body, the `{remixedFrom, atomDiff}` composite, list+provenance wire shapes) + **revert→200** (the E4-named gap) + the **W3.F stored-atomDiff serve** |
| `test/routes/palettes-votes-flags.test.ts` | 7 | votes (401/toggle/404) + flags (401/201/double-flag-409/flag-own-400) — service-level-only before |
| `test/routes/admin-impersonate.test.ts` | 5 | **impersonate** HTTP surface + the **`adminAuth` bearer gate** (401 no-auth / 403 wrong-token / 503 unconfigured) — D5: "adminAuth is not exercised by any test" |

Each test asserts the **contract URN** on its error envelopes, so the conformance suite now binds the
W3.H convergence at the wire too. A test-harness note: Hono's `app.request` does not auto-populate
`Content-Length`, which the fork/remix routes use to distinguish empty-body from malformed-JSON; the
forks test sets it explicitly via a `withBody` helper (a real HTTP client always sends it). Not a
source bug.

---

## The cross-repo ask (fourier-owned — do NOT edit `../fourier-analysis`)

The conformance matrix (`fourier-analysis/docs/tranches/B/coordination/CONFORMANCE-MATRIX.md`) cites
value.js test paths under a `test/conformance/<domain>/<name>.test.ts` layout that **does not exist**
(D2's "fictional value.js test paths"). value.js's real conformance suite lives at
`test/conformance/{crud,diff,idempotency}.test.ts` + the new `test/routes/*.test.ts` route-level
files; there is **no `npm run test:conformance` script** (the matrix §10 names one) — value.js runs
`npm test` (vitest). The matrix's value.js-column corrections (re-point the ~7 fictional paths to the
real files; flip the now-ADDRESSED CS3.2 idempotency-replay-conflict + the CS5.2/U-errors-3 URN rows
from DEFERRED-TO-VALUE.JS to ADDRESSED now that value.js emits `urn:contract:*`) are **fourier's ask**
per the matrix's own §V2.4 per-repo-flip discipline ("fourier does NOT flip value.js's column on
value.js's behalf"; value.js's column flips on value.js's own conformance run). This slice does NOT
touch `../fourier-analysis`. Recorded here as the cross-repo coordination item for N.W8/cohort.

## Decisions recorded (one paragraph each — above)

1. **W3.F SERVE, at the version-read site** — D4's "dead storage" was a mis-identified serve site,
   not a reason to stop persisting; `/diff` correctly recomputes for arbitrary pairs.
2. **W3.G dedicated `IdempotencyConflictError`** — a distinct 409 class keeps the per-class URN map
   honest (vs overloading `ConflictError` with a 4th semantic).
3. **W3.H ADOPT `urn:contract:*`** — the matrix's own DEFERRED-TO-VALUE.JS disposition + C2.5's
   literal binding make this the contract-authoritative direction, not a coin-flip; wire-transparent
   (demo branches on status, never URN).
4. **Per-class URN, not per-call-site** — KISS; the primary-row URN + title disambiguation, for a
   wire field with zero string-matching consumers.
5. **Conformance tests assert contract URNs** — binding the W3.H convergence at the wire, closing the
   inv-N-8 gap for sessions/colors/forks/remix/votes/flags/impersonate/revert + the adminAuth gate.
