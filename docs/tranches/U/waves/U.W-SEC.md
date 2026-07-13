# U.W-SEC — THE SECURITY / API-RUNTIME WAVE

**Wave**: U.W-SEC · **designHeavy**: no (STRUCTURAL — precise gates, born-RED where the defect is
LIVE, mechanical rigor; ZERO visual claims → no frontend-design loop, no π-frame, no real-GPU
annex) · **Families**: U-F36 · U-F37 · U-F38 · U-F39 · U-F40 · U-F41 · U-F67 (7 families).

**Opens after**: **root** (U.md §The wave DAG — `dependsOn: root`). No upstream wave gates this
wave; it opens at formation and runs in parallel with U.W-CANON / U.W-ORACLE / U.W-DEMO (all
root-dependent). The ONE forward coupling is a BOOK, not a dependency: U-F41's VPN-gated on-host
re-verify + U-F39's deploy-dependent live-header confirmation ride to **U.W-CLOSE / U-F61**
(single-sourced-claims, attested-not-verified). **Runs concurrently with T.W8 remediation on the
shared `tranche-t` branch → every commit pull-rebases first and is path-scoped to
`docs/tranches/U/**` (planning) / to the SEC-owned api + deploy-config files (execution).**

**The spec of record is `../audit/registry.md`** (§12 U-F36/F37/F38/F39/F40/F41 · §15 verdicts
CONFIRMED for F36/F37/F38 · §17 U-F67 · §19 the `mongo-discipline-divergence` precept fold → U-F37).
Where this doc and the registry could diverge, **the registry wins**; above both, **the owner's
verbatim wins**. Precedence: owner verbatim → registry → `U.md` → this wave doc.

---

## §Goal criterion

The api runtime and its edges tell the truth about their own trust boundaries, and no privileged
credential is dead-on-arrival, cleartext-at-rest, unattributable, or advertised-but-unwired. Every
security family reaches its root cure or a decided escalate, with zero silent drops:

- **Auth/session trust** — the impersonation credential AUTHENTICATES (mints a session the auth
  middleware accepts, not a functionally-inert row a green-over-broken test masks); session tokens
  are hashed at rest (a DB read no longer yields every live token); privileged admin actions are
  attributably logged (no `actorSlug` sinking to `null`).
- **DB trust boundary** — the config tells the truth (no `.env.example` advertising `MONGO_*`
  creds `compose.yaml` never wires); the Mongo-discipline precept is either SATISFIED (SCRAM + a
  restricted bind) or carries a WRITTEN justified-residual for the bounded internal-bridge posture
  (never a silent divergence + a false config comment).
- **Edge/transport** — the frontend origin (color.babb.dev) serves a real security-header suite
  (CSP/HSTS/X-Frame-Options), at parity with the api origin's already-complete suite; the retired-
  on-paper-but-alive-on-wire NCSU duplicate origin is presented to the owner as a structural fact
  with a deploy-ceremony action item (VPN-gated re-verify).
- **Dependency** — the api's hono runtime carries no reachable advisory (the bodyLimit-bypass class,
  live because `hono/body-limit` is mounted, cleared by an in-range minor bump).

## §Completion criterion

- Every family (the 7 above) reaches its decided disposition (§Dispositions); zero silent drops.
- Every **build** family that guards a LIVE defect carries a **born-RED** gate (armed now, flips
  GREEN only at the cure) — G-SEC-1..5 (§Hard gate), each registry-cited to its live evidence.
- The two auth-trust gates (G-SEC-1 impersonation, G-SEC-3 token-at-rest) DRIVE the real auth path
  (the `findAndTouch` / `resolveSession` middleware round-trip, or the raw-collection read),
  **never the no-expiry `findByToken` row-existence assertion** the current test uses — the cure
  is precisely to replace the green-over-broken masking with a test that fails when the credential
  is inert.
- The **escalate** family (U-F41) is presented to the owner as a structural fact (the alias lives
  in the NCSU box's Apache config, NOT this repo — it cannot be retired from the tree) with a
  named deploy-ceremony action item; its on-wire re-verify is VPN-gated and BOOKED to
  U.W-CLOSE / U-F61 as attested-not-verified (never a headless CI assertion).
- **This wave has NO visual claim** — nothing renders, nothing is eyeballed; no π-frame, no
  real-GPU/owner-attested annex (that discipline is U.W-VISUAL's). Every claim is
  api-runtime / config / deploy-artefact / dependency — mechanically measurable — so each family
  carries a **DELTA count/state** in lieu of a π-frame (§π/DELTA).
- PP-16 binds: gates-pass-goal-unmet closes `complete_with_misses` (U-F41's VPN-gated re-verify is
  the structural miss-candidate — an on-host action outside the CI env).

---

## §Scope — the families this wave builds (each with its cure APPROACH; E-3 binds — no workaround, no legacy)

The 7 families cluster into four coherent surfaces. E-3 (no quick solution / no legacy shim /
idiomatic gestalt; architectural transposition for elegance / simplicity / security is DESIRABLE)
binds every cure: the impersonation fix is not a test-patch that re-greens the mask but a real
`expiresAt` mint + an auth-driving test; the DB boundary is not a comment-out but a truth-restoring
config; the header gap is not a per-response middleware hack but the idiomatic CF-Pages `_headers`
declaration; the hono advisory is not pinned-around but bumped in-range.

### Cluster 1 — AUTH / SESSION TRUST (the credential must be real, hashed, attributable)

#### U-F36 — `impersonation-dead-credential` · **build (fix the mint + a test that DRIVES the auth middleware — the wave's named headline)**

**Evidence** (registry §12 + §15 CONFIRMED): `POST /admin/impersonate` (route
`api/src/modules/admin/routes/impersonate.ts:14-22` → mounted `app.ts:80`, behind the `adminAuth`
bearer gate) mints a session with **NO `expiresAt`** — `impersonate.ts:44-52`
(`sessions.insert({ _id, ipHash, userSlug, createdAt, lastSeenAt })`, the `expiresAt` field
absent). The auth path FILTERS on it: `SessionRepository.findAndTouch` (`session.ts:25-31`) queries
`{ _id: token, expiresAt: { $gt: new Date() } }` — the read `resolve-session.ts:36` consumes as
the session-validation middleware. A document with no `expiresAt` field **never matches** → the
impersonation token is **dead-on-arrival** (returns HTTP 200 with a functionally-inert token, §15).
The missing field ALSO defeats the TTL reaper (`db.ts:82-83`, `expireAfterSeconds: 0` on
`expiresAt`) → dead rows accumulate. The route test **masks the break**: `admin-impersonate.test.ts:133`
asserts row-existence via `findByToken` (`session.ts:17-19`, the NO-expiry `_id`-only read) — green
over broken. The healthy `registerSession`/`loginSession` paths DO set `expiresAt`
(`auth.ts:103,151`, `now + SESSION_TTL_MS`); impersonate is the lone omission.

**Cure APPROACH** (E-3 — fix the mint, not the mask): (1) `impersonate.ts` mints `expiresAt = now +
SESSION_TTL_MS` — the SAME 30-day horizon `auth.ts` uses (the docstring's "Lane D may revisit
expiry policy" is DISCHARGED here: the impersonation session gets the canonical TTL, no special
policy); (2) the born-RED **DRIVES the auth middleware** — either `findAndTouch(token)` returns the
session (not `null`), or a full round-trip: impersonate → present the token as `X-Session-Token` to
an authed route → assert 200 not 401. The `findByToken` row-existence assertion is REPLACED (it is
the green-over-broken instrument). No `expiresAt`-optional shim survives.

#### U-F40 — `admin-audit-attribution` · **fold into U-F36's remediation (attributable privileged logging)**

**Evidence** (registry §12): admin auth is **bearer-token-only** (`admin-auth.ts` — `Authorization:
Bearer ADMIN_TOKEN`, `timingSafeEqual`); the impersonate route passes `c.var.userSlug`
(`impersonate.ts:20`) as the actor, which is `undefined` for a pure-admin bearer call (no session).
`emitAuditEvent` (`audit-log.ts:36`) coerces `actorSlug ?? null` → the privileged `impersonate`
action (and every bearer-only admin op) is recorded with `actorSlug: null` — a privileged action
with no attributable actor.

**Cure APPROACH** (E-3 — attribute the actor, don't paper it): folds into U-F36's remediation — the
admin actor is attributed at the audit boundary (a resolvable admin identity for bearer-only
privileged ops, not `null`). The idiomatic gestalt: the `adminAuth` gate already establishes "this
is THE admin bearer" — surface that identity to the audit (a synthetic `admin`/`system` actor slug,
or the bearer-key fingerprint) so `admin_audit.actorSlug` is never `null` for a privileged action.
Rides G-SEC-1's gate as a paired sub-assertion (§Hard gate); no independent row.

#### U-F38 — `db-token-at-rest` · **build (SHA-256 at rest, lookup by hash)**

**Evidence** (registry §12 + §15 CONFIRMED): session tokens are stored **cleartext** as
`sessions._id` (`model.ts:63-64` — "`_id` is the session token (uuid)"); every lookup queries the
raw token (`session.ts:18` `findByToken` `{ _id: token }`, `session.ts:27` `findAndTouch`
`{ _id: token, … }`), every mint inserts it raw (`impersonate.ts:47`, `auth.ts:103,151`). Any DB
read yields **every live token** (mass hijack). Entropy is fine (UUIDv4); the defect is at-rest
storage. §15: mitigated only by the network boundary — which U-F37 shows is itself unauthenticated;
**the two compound**.

**Cure APPROACH** (E-3 — hash at the model boundary, the architectural transposition): store
`SHA-256(token)` as `sessions._id` (or a dedicated hashed key), and hash the incoming token at the
repository filter boundary before every lookup — the `asSessionToken` model-boundary helper
(`model.ts:40`) is the natural single site to thread the hash through, so cleartext never reaches
the collection. The client still receives the raw token (unchanged wire contract); the DB holds
only the digest. The born-RED reads the RAW collection after a mint and asserts the stored `_id` ≠
the returned token (i.e., a leaked DB dump cannot be replayed). This is the same brand-boundary
transposition L.W2 already established — hash slots in at the mint/lookup seam, no scatter.

### Cluster 2 — DB TRUST BOUNDARY (the config must tell the truth)

#### U-F37 — `db-trust-boundary` · **build (wire creds OR delete the unwired vars + write the mongo-discipline precept residual)**

**Evidence** (registry §12 + §15 CONFIRMED + §19 precept fold): Mongo runs with **NO auth** —
`compose.yaml:67` `["mongod", "--replSet", "rs0", "--bind_ip_all"]` (no `--auth`/`--keyFile`), and
`MONGODB_URI` (`compose.yaml:12`) carries no credentials. Meanwhile `.env.example:2-5` advertises
**4 `MONGO_*` vars** (`MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`, `MONGO_USER`, `MONGO_PASSWORD`) that
`compose.yaml` **never references** — a config-truth lie. The precept
`docs/precepts/infra/domains.md:153-155` ("The Mongo discipline") REQUIRES "Verified-TLS server-only
+ SCRAM-SHA-256 auth" and "**Never `0.0.0.0`**"; the prod compose diverges with `--bind_ip_all` +
no SCRAM + **no written justified-residual** + the false `.env.example` comment (§19 fold).
**Bounded** (§15): the `mongo` service publishes NO host port (no `ports:` block → internal bridge
only), and the api is loopback-bound (`compose.yaml:5` `127.0.0.1:8130:3000`) — a defense-in-depth
gap, not a host-exposed break. The compose ALSO carries genuine hardening (read_only, cap_drop ALL,
no-new-privileges) — so the divergence is a documented-residual candidate, not a raw hole.

**Cure APPROACH** (E-3 — restore the truth; the precept picks the gestalt): the config-truth lie is
resolved EITHER way, and the born-RED asserts no `.env.example` `MONGO_*` var goes unreferenced by
`compose.yaml`. The precept-arm is owner-decidable between two honest ends: (a) **wire SCRAM** —
add `MONGO_INITDB_ROOT_*` + a keyFile, thread credentials into `MONGODB_URI`, restrict the bind
(the full precept-satisfying gestalt, the `.env.example` vars become REAL); OR (b) **delete the
unwired vars** + write the **justified-residual** into the precept/api-CLAUDE.md (the bounded
internal-bridge posture recorded as an explicit documented divergence, per `domains.md`'s own
defense-in-depth framing). E-3 forbids the third path (leave the false comment). The registry's
"write the residual or wire the auth" is the exact fork; the owner-call is RECORDED (§BOOKS).

### Cluster 3 — EDGE / TRANSPORT (the origins at parity)

#### U-F39 — `frontend-missing-security-headers` · **build (CF-Pages `_headers` — CSP/HSTS/X-Frame-Options at api-origin parity)**

**Evidence** (registry §12): color.babb.dev (the Cloudflare-Pages demo origin) serves HTML with
only `x-content-type-options` — no CSP/HSTS/X-Frame-Options. The CONTRAST is stark: the **api**
origin already sets a full suite (`apache-vhost.conf:52-59` — CSP `default-src 'none'; frame-
ancestors 'none'`, HSTS `max-age=63072000; includeSubDomains`, X-Frame-Options DENY, Referrer-
Policy, Permissions-Policy). The frontend has **no `_headers` file** — verified absent:
`demo/color-picker/public/` holds only `CNAME`, `robots.txt`, `fonts/` (the CF-Pages build root
copies `public/`, so a `_headers` there is the honored locus).

**Cure APPROACH** (E-3 — the idiomatic CF-Pages primitive, not a runtime hack): add a
`demo/color-picker/public/_headers` file declaring the frontend suite — a CSP appropriate to the
demo (self + the api origin + the inline/worker needs the app actually has — the WebGL blob, KaTeX,
the palette API fetch to api.color.babb.dev), HSTS, X-Frame-Options/`frame-ancestors`,
Referrer-Policy, Permissions-Policy. The CSP is DERIVED from the app's real resource graph (not a
copy of the api's `default-src 'none'`, which would break the demo). The born-RED is a
repo-artefact assertion (the `_headers` file exists + declares CSP/HSTS/X-Frame-Options); the LIVE
confirmation (a GET to color.babb.dev showing the headers) is **deploy-dependent** → attested at
deploy, BOOKED to U.W-CLOSE / U-F61 (never asserted green pre-deploy).

#### U-F41 — `duplicate-ncsu-origin` · **escalate (present the structural fact + a deploy-ceremony action item; VPN-gated re-verify)**

**Evidence** (registry §12): `apache-vhost.conf:19-27` documents (honestly) that DEC-9 declared the
`mbabb.fi.ncsu.edu/colors/` alias RETIRED, but the N.W4 verification (V3) found it **alive and
byte-identical** to api.color.babb.dev — same upstream, sharing the rate-limit pool. The file
itself records that **retiring it is an ON-HOST action** (it lives in the NCSU box's Apache config,
NOT this repo — "it CANNOT be retired from this file"). NCSU-VPN-gated, unverified this audit.
**Ties to the X2 residual** (the two-oldest-owner-orders NCSU-301 win, attested-not-verified).

**Cure APPROACH** (escalate — the structural fact, not a phantom repo fix): U cannot cure this from
the tree (the alias is off-repo). The disposition is the honest **escalate**: (1) PRESENT the owner
the structural fact — the alias is alive on-wire, retiring it is a deploy-ceremony on-host action
(remove the `mbabb.fi.ncsu.edu/colors/` proxy block from the NCSU host's vhost; let its DNS/cert
lapse) once color.babb.dev is confirmed serving HEAD-lineage code; (2) name the action item in the
FINAL.md ledger; (3) the on-wire re-verify (a VPN-gated GET to `mbabb.fi.ncsu.edu/colors/`
asserting 301→api.color.babb.dev or dead) is **owner-attested**, BOOKED to U.W-CLOSE / U-F61. NO
headless born-RED (VPN-gated, off-repo — a headless assertion would be the close-class lie the
charter forbids).

### Cluster 4 — DEPENDENCY (the runtime advisory)

#### U-F67 — `api-hono-advisory` · **build (in-range minor bump — the bodyLimit-bypass class is reachable)**

**Evidence** (registry §17): the api runtime pins `hono` `^4.7.0` (`api/package.json:18`), resolved
**4.12.2** (`api/package-lock.json:1466`), which carries an open advisory set — the **bodyLimit-
bypass class is LIVE-REACHABLE**: `app.ts:54` mounts `app.use("*", bodyLimit({ maxSize: 64 * 1024
}))` (the `hono/body-limit` middleware imported at `app.ts:12`), the exact surface the advisory
bypasses. Other hono CVEs are unreachable (no `serveStatic`/`toSSG`/`hono-cors` in use).

**Cure APPROACH** (E-3 — bump in range, don't pin around): bump `hono` to the patched version within
the `^4.7.0` caret (the advisory's fixed minor is `< 5.0.0`, in-range — no major cut, no API
change) + lock refresh. The born-RED asserts the production dependency surface (`npm audit
--omit=dev` in `api/`, or a resolved-version floor check) reports NO reachable hono advisory. A
verification gate at execution, not a standing churn-gate (dev advisories are U-F71's rolling
concern in U.W-CANON — the hono runtime advisory is a distinct SHIPPED-surface fix).

---

## §Hard gate (born-RED where the defect is LIVE — registry-cited; ZERO visual gates, no annex)

**Five born-RED gates**, each ARMED now against a LIVE defect and flipping GREEN only at the cure.
This is a STRUCTURAL wave: every gate is a mechanical assertion (an auth-path drive, a raw-DB read,
a config parse, a deploy-artefact check, a `npm audit`) — **none is a visual/headless assertion**,
so none rides the U-F54 real-GPU annex (this wave has no visual surface). U-F41 is the lone
non-born-RED family (escalate — its re-verify is VPN-gated/off-repo, owner-attested, booked).

### G-SEC-1 — U-F36 (+ U-F40 sub-assertion) · the impersonation credential AUTHENTICATES · **born-RED (drives the auth middleware)**

Assert a token minted by `POST /admin/impersonate` **authenticates through the real auth path** —
`findAndTouch(token)` returns the session (not `null`), OR a round-trip: impersonate → present the
token as `X-Session-Token` to an authed route → 200 not 401. **RED today**: `impersonate.ts:44-52`
omits `expiresAt`; `findAndTouch` (`session.ts:27`) filters `expiresAt: { $gt: now }` → returns
`null` → the token is inert (the current test's `findByToken` row-existence assertion at
`admin-impersonate.test.ts:133` is the green-over-broken mask, REPLACED). Flips GREEN when
impersonate mints `expiresAt = now + SESSION_TTL_MS` + the auth-driving assertion passes.
**Paired sub-assertion (U-F40)**: a privileged bearer-only admin action records a resolvable
`admin_audit.actorSlug` (NOT `null`) — RED today (`audit-log.ts:36` `actorSlug ?? null` with the
bearer-only `undefined`), GREEN when the admin actor is attributed.

### G-SEC-2 — U-F37 · the DB config tells the truth (+ precept residual) · **born-RED**

Assert (a) NO `.env.example` `MONGO_*` var is unreferenced by `compose.yaml` (config-truth) AND (b)
the Mongo-discipline divergence carries either wired SCRAM auth OR a written justified-residual.
**RED today**: `.env.example:2-5` advertises 4 `MONGO_*` creds `compose.yaml` never wires
(`compose.yaml:12,67` — no `--auth`, no creds in `MONGODB_URI`); the precept `domains.md:153-155`
SCRAM+bind requirement is diverged with no residual. Flips GREEN when the vars are wired (real) or
deleted (+ the residual written) — the config-truth lie resolved, no false comment surviving.

### G-SEC-3 — U-F38 · session tokens hashed at rest · **born-RED (raw-DB read)**

Assert the stored `sessions._id` (or lookup key) is a DIGEST, not the raw token: mint a session,
read the RAW collection, assert the stored key ≠ the returned token (a DB dump cannot be replayed).
**RED today**: `model.ts:63-64` + `session.ts:18,27` store/query the cleartext token as `_id`; the
raw stored value == the client token. Flips GREEN when tokens are SHA-256'd at the model boundary
(hash on mint + on lookup) + the raw-read assertion passes.

### G-SEC-4 — U-F39 · the frontend serves a real header suite · **born-RED (repo-artefact; live confirm booked)**

Assert `demo/color-picker/public/_headers` EXISTS and declares CSP + HSTS + X-Frame-Options
(the frontend suite, at api-origin parity). **RED today**: no `_headers` file (`public/` holds only
`CNAME`/`robots.txt`/`fonts/`); the origin serves only `x-content-type-options`. Flips GREEN when
the `_headers` file lands with an app-derived CSP + the transport headers. **The LIVE confirmation**
(a GET to color.babb.dev showing the headers) is **deploy-dependent → attested at deploy, BOOKED to
U.W-CLOSE / U-F61** (never asserted green pre-deploy — the born-RED is the repo artefact, the wire
proof is the owner-attested close leg).

### G-SEC-5 — U-F67 · the api runtime carries no reachable advisory · **born-RED (npm audit / version floor)**

Assert the api production dependency surface (`cd api && npm audit --omit=dev`, or a resolved-hono
version-floor check) reports NO reachable hono advisory. **RED today**: `hono@4.12.2` (spec
`^4.7.0`, `package.json:18` / lock `:1466`) carries the bodyLimit-bypass class, LIVE-reachable via
`app.ts:54` `bodyLimit(...)`. Flips GREEN when hono bumps in-range (`^4.7.0`, `< 5.0.0` — the
advisory's patched minor) + the audit is clean.

**No born-RED for**: **U-F41** (escalate — the re-verify is VPN-gated + off-repo, owner-attested,
booked to U.W-CLOSE/U-F61; a headless assertion would be a false-green). **U-F40** rides G-SEC-1 as
a paired sub-assertion (it folds into U-F36's remediation — no independent gate).

---

## §π / DELTA obligations (no π-frame — ZERO visual claims; every family carries a mechanical DELTA)

**This wave has NO visual claim** — nothing renders, nothing is eyeballed; there is no before/after
π-frame obligation and no real-GPU/owner-attested annex (that discipline is U.W-VISUAL's). In lieu
of a π-frame, every family carries a **mechanical DELTA** — a before→after count/state, measurable
without a GPU (an auth round-trip, a config parse, a raw-DB read, a deploy-artefact check, a
`npm audit`):

| Family | DELTA measurement (before → after) | Evidence anchor |
|---|---|---|
| U-F36 | impersonation-token auth: inert (`findAndTouch`→null, 401) → live (200); the green-over-broken test → auth-driving | `impersonate.ts:44-52` · `session.ts:25-31` · `admin-impersonate.test.ts:133` |
| U-F40 | privileged-action `actorSlug`: null → attributable (resolvable admin identity) | `audit-log.ts:36` · `impersonate.ts:20` |
| U-F37 | unwired `.env.example` `MONGO_*` vars: 4 → 0 (config-truth); precept residual: absent → written OR SCRAM wired | `.env.example:2-5` · `compose.yaml:12,67` · `domains.md:153-155` |
| U-F38 | at-rest token exposure: cleartext (`_id`==token) → digest (raw-read ≠ token) | `model.ts:63-64` · `session.ts:18,27` |
| U-F39 | frontend security headers: 1 (`x-content-type-options`) → suite (CSP/HSTS/X-Frame-Options); `_headers`: absent → present | `demo/color-picker/public/` · `apache-vhost.conf:52-59` (api-parity referent) |
| U-F41 | NCSU duplicate origin: alive-on-wire (byte-identical) → deploy-ceremony action item named + owner-attested re-verify booked | `apache-vhost.conf:19-27` |
| U-F67 | reachable hono advisory: 1 (bodyLimit-bypass, `4.12.2`) → 0 (in-range patched); `npm audit --omit=dev` clean | `package.json:18` · lock `:1466` · `app.ts:54` |

No claim in this wave is gated by a headless-visual assertion; there is nothing visual to gate. The
one deploy-dependent DELTA (U-F39's live headers) + the one VPN-gated DELTA (U-F41's on-wire
re-verify) are attested at close (§BOOKS), not asserted green in the CI env.

---

## §Cross-repo RELAY (the E-2 owner edict — CHECKED, found NOT-triggered; the honest declaration)

The E-2 relay edict fires when a U wave "touches a glass-ui component or the glass-ui-level contract
(shared exports, token conventions, the mixColors/sampleColorRamp/color2 raw-channel convention, the
producer surfaces)." **U.W-SEC is checked against each clause and found entirely api-runtime /
deploy-config / repo-internal — NO glass-ui BH RELAY row is triggered.** The check, honestly
recorded (not a blanket "no cross-repo ask"):

- **Every family lives in `api/` (the Hono backend), the CF-Pages deploy config, or a package
  dependency** — none touches `src/` (the value.js library surface glass-ui/keyframes consume),
  none changes a shared export or the mixColors/sampleColorRamp/color2 channel convention, none is a
  glass-ui producer surface. U-F36/F38/F40 are api-auth internals; U-F37 is the api's Docker
  config; U-F39 is the demo's CF-Pages `_headers`; U-F41 is an off-repo NCSU host action; U-F67 is
  the api's own hono pin (glass-ui/keyframes do not depend on hono). The glass-ui-level contract is
  UNTOUCHED → no relay.
- **U-F37's precept-residual arm** edits a PRECEPT (`docs/precepts/infra/domains.md §Mongo
  discipline`) IF the residual is written there — the SAME foreign-submodule fence discipline
  U.W-CANON's U-F75 records: if the precepts live in a foreign submodule tree, the residual is
  path-scoped / relayed via the **PRECEPT dev process** under the foreign-tree fence (a precept-tree
  edit, NOT a glass-ui-component change) — noted for execution, not a glass-ui BH relay. (The
  residual may equally land in `api/CLAUDE.md` as the api-local justified-divergence, keeping it
  in-tree.)

**No glass-ui convention change, no producer surface, no consumed-export break ships from this
wave** → E-2 discharged by the CHECK (the honest declaration), not by a communiqué row. The
U-formation BH communiqué (`17e0f522`) already carries the cross-repo coupling that OTHER waves own;
U.W-SEC adds nothing to it.

---

## §Dispositions (each family → the exact build/fold/retire/escalate + rationale)

| Family | Disposition | Rationale |
|---|---|---|
| **U-F36** | **build** (fix the mint + auth-driving test) | The impersonation token is dead-on-arrival (no `expiresAt` → `findAndTouch` filters it out) behind a green-over-broken `findByToken` test; mint the canonical TTL + a test that drives the auth middleware (G-SEC-1). |
| **U-F37** | **build** (config-truth + precept residual) | Mongo runs no-auth + `.env.example` advertises 4 unwired `MONGO_*` vars (config-truth lie) + the precept diverges with no residual; wire SCRAM OR delete the vars + write the residual (owner-call, recorded). Bounded (internal-bridge-only) → residual is a real option (G-SEC-2). |
| **U-F38** | **build** (SHA-256 at rest) | Session tokens stored cleartext as `sessions._id` → any DB read = every live token; hash at the model boundary, lookup by hash (G-SEC-3). Compounds with U-F37's unauthenticated boundary. |
| **U-F39** | **build** (CF-Pages `_headers`) | color.babb.dev serves only `x-content-type-options`; add an app-derived CSP/HSTS/X-Frame-Options suite via the idiomatic CF-Pages `_headers` file (G-SEC-4; live confirm booked). |
| **U-F40** | **fold** into U-F36 | `admin_audit.actorSlug` sinks to `null` for bearer-only privileged actions; attribute the admin actor at the audit boundary — rides G-SEC-1 as a paired sub-assertion, no independent row. |
| **U-F41** | **escalate** | The `mbabb.fi.ncsu.edu/colors/` alias is alive-on-wire but off-repo (NCSU host's Apache config); present the owner the structural fact + a deploy-ceremony action item; the VPN-gated on-wire re-verify is owner-attested, booked to U.W-CLOSE/U-F61 (ties X2). No headless born-RED. |
| **U-F67** | **build** (in-range hono bump) | `hono@4.12.2` carries the reachable bodyLimit-bypass advisory (`hono/body-limit` mounted at `app.ts:54`); bump in-range within `^4.7.0` + `npm audit --omit=dev` clean (G-SEC-5). |

Zero silent drops: all 7 families reach a decided home (5 build · 1 fold · 1 escalate).

---

## §Dependencies

- **Root** (U.md §The wave DAG — `dependsOn: root`). No upstream wave gates U.W-SEC; it opens at
  formation and runs in parallel with U.W-CANON / U.W-ORACLE / U.W-DEMO (all root-dependent).
- **T.W8 concurrent-landing coupling** (NOT a wave dependency — a branch-hygiene law): T.W8
  remediation lands commits on the shared `tranche-t` branch; every U.W-SEC commit **pull-rebases
  first** and is path-scoped to `docs/tranches/U/**` (planning) / to the SEC-owned api + deploy-
  config files (execution). U.W-SEC touches `api/**` + `demo/color-picker/public/_headers` +
  (optionally) a precept/`api/CLAUDE.md` residual — surfaces T.W8's visual remediation does NOT
  touch, so no execution-time collision (T.W8 is a demo-visual campaign; U.W-SEC is api/deploy).
- **No downstream wave depends on U.W-SEC** — it is a leaf feeding U.W-CLOSE's ledger walk + the
  U-F61 attested-not-verified flags (U-F41 on-wire re-verify + U-F39 live-header confirmation).
- **U-F37's precept read** (`docs/precepts/infra/domains.md`) — a READ (the divergence evidence);
  the residual WRITE is either in-tree (`api/CLAUDE.md`) or foreign-submodule-fenced (§Cross-repo
  RELAY), never a silent precept edit.

---

## §BOOKS (what rides to a later wave — by name)

- **U-F41 on-wire re-verify → U.W-CLOSE / U-F61 (attested-not-verified).** The
  `mbabb.fi.ncsu.edu/colors/` alias retire is an off-repo NCSU-host action; the VPN-gated
  re-verify (301→api.color.babb.dev or dead) is owner-attested at close, ties the X2 residual.
  Named, not dropped — the escalate's structural fact + deploy-ceremony action item ride the
  FINAL.md ledger; the wire proof rides U-F61.
- **U-F39 live-header confirmation → U.W-CLOSE / U-F61 (deploy-dependent).** The `_headers`
  repo-artefact is the born-RED (G-SEC-4); the LIVE proof (color.babb.dev serving the suite) is
  deploy-dependent → owner-attested at close, not asserted green pre-deploy.
- **The U-F37 SCRAM-vs-residual decision → owner call at execution.** The precept-arm fork (wire
  SCRAM auth vs delete-the-vars + write-the-residual for the bounded internal-bridge posture) is
  owner-decidable; the DECISION rides to the execution moment (recorded there), not a successor
  tranche. The config-truth lie (the 4 unwired vars) is resolved EITHER way (G-SEC-2).
- **U-F67 rolling hono advisories → a rolling verification (not a standing gate).** The in-range
  bump clears the CURRENT reachable advisory; future hono advisories are a rolling `npm audit
  --omit=dev` concern (the api's production surface), not re-booked as a U family — distinct from
  U-F71 (U.W-CANON's dev-toolchain-advisory batch, which never ships in dist).
