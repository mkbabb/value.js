# U.W-SEC — CLOSE ARTEFACTS (THE SECURITY / API-RUNTIME WAVE — the gate package)

**Verdict**: **CLOSED-`complete_with_misses`** (2026-07-13).
**Gate**: `CLOSE_WITH_MISSES` — the 5-row `U.W-SEC.md §Hard gate` (G-SEC-1..5) returned
**5 PASS (all born-RED flipped GREEN at cure), zero FAIL**; the wave carries the
PP-16-designed structural miss (U-F41's VPN-gated re-verify — gates-pass-goal-unmet)
plus three recorded misses (§3), all booked/routed, zero silent drops.
**Wave head**: `33391b2` (Cluster 4, the terminal SEC lane commit) atop the Cluster 1/2/3
commits `469f840` / `2c35f6f` / `217cd16` on `tranche-u`.
**Gate of record**: the composite `U.W-SEC.md §Hard gate` (5 born-RED rows), each
re-verified GREEN live at this close against the landed tree.
**Spec of record**: owner verbatim → `audit/registry.md` (§12 U-F36/F37/F38/F39/F40/F41 ·
§15 CONFIRMED F36/F37/F38 · §17 U-F67 · §19 mongo-discipline fold → U-F37) → `U.md` →
`waves/U.W-SEC.md`. Where they could diverge, the registry wins; above both, the owner's
verbatim.

**Reconstruction note (honest)**: the orchestrator's `gate` and `laneResults` objects
arrived at this scribe as un-interpolated template strings (`${JSON.stringify(gate)}`),
so the gate verdict and the per-family commit/miss facts below were **reconstructed from
the landed tree** — the four SEC cluster commits + a **live re-run of all five born-RED
gates** (all GREEN, §1) + a live `cd api && npx tsc --noEmit` (the RED miss, §3 MISS-3).
Nothing here is asserted from a machine-passed gate object; every row is tree-verified.

---

## §0 The verdict + its honest reconciliation

This is a **STRUCTURAL** wave — zero visual claims, no π-frame, no real-GPU annex. Every
gate is a mechanical assertion (an auth-path drive, a raw-DB read, a config parse, a
deploy-artefact check, an `npm audit` floor). All five born-RED gates were **ARMED against
a LIVE defect and flip GREEN only at the cure** — the born-RED honesty law (E-3) held on
each.

`complete_with_misses` is the **designed** terminal state, not a shortfall: `U.W-SEC.md
§Completion` pre-binds **PP-16** — *"gates-pass-goal-unmet closes `complete_with_misses`
(U-F41's VPN-gated re-verify is the structural miss-candidate — an on-host action outside
the CI env)."* The five build/fold gates reach their root cure; U-F41 (escalate) reaches
its decided disposition (a structural fact + a named deploy-ceremony action item + a booked
owner-attested re-verify) — a decided home, **not** a headless false-green. That gap
between gates-green and goal-fully-live-on-wire is exactly `_with_misses`.

Two DELTAs are attested-not-verified by design (§BOOKS): U-F41's on-wire re-verify
(VPN-gated, off-repo) and U-F39's live-header confirmation (deploy-dependent). Both are
**booked to U.W-CLOSE / U-F61**, never asserted green in the CI env. Two further honest
misses surfaced at execution (the hono-companion typecheck-RED in sibling-owned route
files; the `_headers` `.gitignore` force-add) — recorded in §3, routed, not laundered.

**Zero silent drops**: all 7 families reach a decided home (5 build · 1 fold · 1 escalate).

---

## §1 The 5 §Hard-gate rows — VERBATIM disposition (each born-RED → GREEN at cure)

Each gate was authored RED against the live defect (capture recorded in its lane commit),
and each was **re-run GREEN live at this close**. Test invocations and pass counts below
are from this session's re-run.

### G-SEC-1 — U-F36 (+ U-F40 sub-assertion) · the impersonation credential AUTHENTICATES → **PASS**

> `api/src/modules/admin/__tests__/admin-impersonate.test.ts` — **5 tests GREEN**. The gate
> drives the REAL auth path: a token minted by `POST /admin/impersonate` resolves through
> `findAndTouch(token)` (not `null`) and carries a live `expiresAt`. **RED today** (captured
> in `469f840`): `service/impersonate.ts` omitted `expiresAt`; `findAndTouch`
> (`session.ts:25-31`) filters `expiresAt: { $gt: now }` → the token was dead-on-arrival
> (HTTP 200 with a functionally-inert row), masked by the no-expiry `findByToken`
> row-existence assertion at `admin-impersonate.test.ts:133`. **CURE**: the mint sets
> `expiresAt = now + SESSION_TTL_MS` (the canonical 30-day horizon, single-sourced into
> `session/model.ts`, lifted from `service/auth.ts` — no duplicated literal); the
> green-over-broken assertion is REPLACED by the auth-driving one. **Paired sub-assertion
> (U-F40)**: a bearer-only privileged admin op records a resolvable `admin_audit.actorSlug`
> (NOT `null`) — the `adminAuth` gate now surfaces the synthetic `system:admin` identity
> (colon-delimited, cannot collide with a generated user slug) on `c.var.adminActor`,
> threaded through the WHOLE admin-route class (E-3 — fix the class, not one call site).
> **DELTA (U-F36)**: impersonation-token auth inert (`findAndTouch`→null, 401) → live (200);
> the green-over-broken test → auth-driving. **DELTA (U-F40)**: privileged-action `actorSlug`
> null → attributable.

### G-SEC-2 — U-F37 · the DB config tells the truth (+ precept residual) → **PASS**

> `api/test/config-truth.test.ts` — **2 tests GREEN**. (a) NO `.env.example` `MONGO_*` var is
> unreferenced by `compose.yaml`; (b) the Mongo-discipline divergence carries either wired
> SCRAM OR a written justified-residual. **RED today** (captured in `2c35f6f`):
> `.env.example:2-5` advertised 4 `MONGO_*` creds `compose.yaml` never wired, and the precept
> `domains.md:149-155` SCRAM+bind requirement diverged with no residual. **CURE** (path (b)
> of the SCRAM-vs-residual fork — the prod-safe repo-side election; SCRAM+keyFile stays the
> owner's deploy-time call per §BOOKS): the 4 unwired vars + their false comment DELETED; the
> **written justified-residual** added to `api/CLAUDE.md` (the bounded internal-bridge posture
> — mongo publishes no host port, api loopback-bound `127.0.0.1:8130`, read_only + cap_drop
> ALL + no-new-privileges — recorded as an EXPLICIT documented divergence, not a silent one);
> a truth-comment near the `mongod` command points at the residual. **DELTA (U-F37)**: unwired
> `.env.example` `MONGO_*` vars 4 → 0; precept residual absent → written.

### G-SEC-3 — U-F38 · session tokens hashed at rest → **PASS**

> `api/src/modules/session/__tests__/session-token-at-rest.test.ts` — **1 test GREEN**. Mint a
> session, read the RAW collection, assert the stored `_id` ≠ the returned token (a DB dump
> cannot be replayed; the test independently recomputes the SHA-256), and `findAndTouch(raw)`
> still resolves. **RED today** (captured in `469f840`): `model.ts` + `session.ts` stored/
> queried the cleartext token as `_id`; the raw stored value == the client token → any DB read
> leaked every live token. **CURE**: a dedicated `hashSessionToken` helper SHA-256s the raw
> token at the model boundary; every mint stores the digest, every repository lookup re-hashes
> the incoming raw token before filtering. `asSessionToken` stays a pure brand (zero-runtime-
> cost claim intact — the double-transform-safe locus per registry §15/§28 R-2); grep confirmed
> every call site takes a RAW token → no double-hash. The client wire contract is unchanged
> (raw token returned; only the DB holds the digest). **DELTA (U-F38)**: at-rest token exposure
> cleartext (`_id`==token) → digest (raw-read ≠ token).

### G-SEC-4 — U-F39 · the frontend serves a real header suite → **PASS** (repo-artefact; live confirm BOOKED)

> `test/frontend-headers.test.ts` (root vitest, fs-artefact model) — **10 tests GREEN**.
> Assert `demo/color-picker/public/_headers` EXISTS and declares CSP + HSTS + X-Frame-Options
> at api-origin parity. **RED today** (captured in `217cd16`, 9 fail / 1 vacuous pass, no
> `_headers` file). **CURE**: the idiomatic CF-Pages `public/_headers` artefact — a CSP DERIVED
> from the demo's real resource graph (`connect-src` self + `https://api.color.babb.dev`;
> `img-src` self data: blob: + `avatars.githubusercontent.com`; `font-src` self;
> `script/style-src` self + `'unsafe-inline'`, no `'unsafe-eval'`; `object-src 'none'`;
> `base-uri 'self'`; `frame-ancestors 'none'`), with the transport headers mirroring the api
> referent (`apache-vhost.conf:52-59`). **DELTA (U-F39)**: frontend security headers 1
> (`x-content-type-options`) → suite; `_headers` absent → present. **BOOKED**: the LIVE on-wire
> confirmation (a GET to color.babb.dev showing the suite) is deploy-dependent → **U.W-CLOSE /
> U-F61** (owner-attested, never asserted green pre-deploy).

### G-SEC-5 — U-F67 · the api runtime carries no reachable advisory → **PASS**

> `api/test/hono-advisory-floor.test.ts` — **2 tests GREEN**. A deterministic, network-free
> resolved-version floor parse of `package-lock.json` asserting `hono >= 4.12.25`. **RED today**
> (captured in `33391b2`, against `hono@4.12.2`): the LIVE-REACHABLE bodyLimit-bypass advisory
> (GHSA-9vqf-7f2p-gf9v — `bodyLimit()` bypassed for chunked / unknown-length requests),
> reachable via `app.ts:54` `app.use("*", bodyLimit({ maxSize: 64*1024 }))`. Other hono CVEs
> unreachable (no serveStatic/toSSG/hono-cors; the Lambda bodyLimit GHSA-rv63-4mwf-qqc2 needs
> the Lambda adapter). **CURE** (E-3 — bump in range, don't pin around): floor the spec to
> `^4.12.25` (the version at which `npm audit --omit=dev` reports ZERO hono advisories) + lock
> refreshed to `4.12.30` (< 5.0.0, no major cut). **DELTA (U-F67)**: reachable hono advisory 1
> (bodyLimit-bypass) → 0; `npm audit --omit=dev` clean.

**Final gate tally**: G-SEC-1 PASS · G-SEC-2 PASS · G-SEC-3 PASS · G-SEC-4 PASS · G-SEC-5
PASS → **all 5 born-RED gates GREEN at cure, zero FAIL**. The `_with_misses` verdict is the
PP-16-designed gates-pass-goal-unmet state (§0), carried by U-F41's escalate + the §3 misses,
never a weakened gate.

---

## §2 The per-family disposition walk (7 families → decided home · commit · DELTA)

| Family | Disposition | Commit | DELTA (before → after) | Gate |
|---|---|---|---|---|
| **U-F36** `impersonation-dead-credential` | **build** (mint + auth-driving test) | `469f840` | inert token (`findAndTouch`→null, 401) → live (200); green-over-broken test → auth-driving | G-SEC-1 |
| **U-F40** `admin-audit-attribution` | **fold** → U-F36 | `469f840` | `actorSlug` null (bearer-only) → attributable (`system:admin` on `c.var.adminActor`, whole admin-route class) | G-SEC-1 sub |
| **U-F38** `db-token-at-rest` | **build** (SHA-256 at rest, lookup by hash) | `469f840` | cleartext (`_id`==token) → digest (raw-read ≠ token); wire contract unchanged | G-SEC-3 |
| **U-F37** `db-trust-boundary` | **build** (config-truth + written residual; path (b)) | `2c35f6f` | unwired `.env.example` `MONGO_*` vars 4 → 0; precept residual absent → written (`api/CLAUDE.md`) | G-SEC-2 |
| **U-F39** `frontend-missing-security-headers` | **build** (CF-Pages `_headers`) | `217cd16` | headers 1 → suite; `_headers` absent → present (live confirm BOOKED → U-F61) | G-SEC-4 |
| **U-F41** `duplicate-ncsu-origin` | **escalate** (structural fact + deploy-ceremony item; re-verify BOOKED) | `217cd16` | alive-on-wire (byte-identical) → `[U-F41-DEPLOY]` action item named + owner-attested re-verify booked → U-F61 (ties X2) | none (correct — off-repo/VPN-gated; a headless assertion would be a false-green) |
| **U-F67** `api-hono-advisory` | **build** (in-range minor bump) | `33391b2` | reachable hono advisory 1 (bodyLimit-bypass, `4.12.2`) → 0 (in-range `^4.12.25`; `npm audit --omit=dev` clean) | G-SEC-5 |

**The four cluster lanes** (each born-RED → GREEN, path-scoped, pull-rebased):
Cluster 1 (AUTH/SESSION TRUST — U-F36/F40/F38) `469f840` · Cluster 2 (DB TRUST BOUNDARY —
U-F37) `2c35f6f` · Cluster 3 (EDGE/TRANSPORT — U-F39/F41) `217cd16` · Cluster 4 (DEPENDENCY
— U-F67) `33391b2`. The **U-F41 escalate record** is at
`docs/tranches/U/audit/sec/F41-ncsu-origin-escalate.md` (the structural fact + the
`[U-F41-DEPLOY]` action item + the U-F61 book).

---

## §3 The misses — named, routed, zero laundered

Four misses. The first is the PP-16-designed structural miss; the second is the by-design
deploy-dependent book; the third and fourth surfaced honestly at execution and route to a
named remediation.

### MISS-1 (structural · PP-16-designed) — U-F41 VPN-gated on-wire re-verify

The `mbabb.fi.ncsu.edu/colors/` alias is alive-on-wire + byte-identical to
api.color.babb.dev, but lives in the **NCSU host's Apache config** — off-repo, uncurable
from this tree. The disposition is the honest **escalate**: the structural fact is
presented, the `[U-F41-DEPLOY]` deploy-ceremony action item is named for the FINAL.md
ledger, and the on-wire re-verify (a VPN-gated GET → 301→api.color.babb.dev or dead) is
**owner-attested, BOOKED to U.W-CLOSE / U-F61** (attested-not-verified; ties the X2
residual). **This is the PP-16 miss the wave doc pre-declared** — an on-host action outside
the CI env. **No born-RED** (correct — a headless assertion of an off-repo VPN-gated wire
state would be the false-green the charter forbids). Record:
`docs/tranches/U/audit/sec/F41-ncsu-origin-escalate.md`.

### MISS-2 (deploy-dependent · booked) — U-F39 live-header confirmation

The `_headers` repo-artefact is the born-RED (G-SEC-4 GREEN); the LIVE proof (color.babb.dev
serving the CSP/HSTS/X-Frame-Options suite on the wire) is **deploy-dependent** → owner-
attested at close, **BOOKED to U.W-CLOSE / U-F61**, never asserted green pre-deploy.

### MISS-3 (out-of-write-fence · api typecheck RED) — the hono-companion narrowing sites

The hono `4.12.x` bump (U-F67, `33391b2`) tightened `c.req.param()` to `string | undefined`,
surfacing **2 latent narrowing sites in sibling-owned palette-route files** —
`api/src/modules/palette/routes/crud.ts:100` (TS2345) and
`api/src/modules/palette/routes/publish.ts:42` (TS2322). Verified live at this close:
`cd api && npx tsc --noEmit` returns **RED** (2 errors). These sites were **OUT OF the SEC
lane's write-fence** (Cluster 4 owns the hono pin, not the palette routes) and are flagged
verbatim in `33391b2`'s message. The **runtime suite is unaffected** (vitest does not
typecheck — full api suite **210/210 GREEN**, §5). **Named remediation**: a 1-line slug
narrowing at each site (e.g. a guard/`?? ""`/typed extractor per the api's typed-narrowing
convention) restores `npx tsc --noEmit` to green — a small, mechanical fix that lands under
the palette-routes owner (a U.W-CANON/DEMO hygiene row or the next api-touching lane), never
an `as any`. Recorded here as a real current-tree RED, not laundered.

### MISS-4 (hygiene · flagged) — the `_headers` `.gitignore` force-add

`demo/color-picker/public/_headers` matches the `.gitignore:9` `_*` glob and was
force-added (`git add -f`) so it ships (confirmed tracked: `git ls-files` returns it). It is
one un-negated glob away from silently vanishing on a future `git add .` The **named
remediation**: add a durable negation line to `.gitignore` (the same pattern as the
`!**/__tests__/` negations at `.gitignore:12-13`, minted for the T.W1 colocation) — e.g.
`!demo/color-picker/public/_headers`. A demo/config-tree hygiene row (a U.W-CANON-class
sweep item), not a SEC re-open.

**All four misses are booked/routed; zero silent drops.**

---

## §4 The cross-repo RELAY declaration (E-2 — CHECKED, found NOT-triggered)

The E-2 owner relay edict fires when a U wave "touches a glass-ui component or the
glass-ui-level contract (shared exports, token conventions, the
mixColors/sampleColorRamp/color2 raw-channel convention, the producer surfaces)." **U.W-SEC
is checked against each clause and found entirely api-runtime / deploy-config / repo-internal
— NO glass-ui BH RELAY row is triggered.** The honest declaration (not a blanket
"no cross-repo ask"):

- **Every family lives in `api/` (the Hono backend), the CF-Pages deploy config, or a package
  dependency** — none touches `src/` (the value.js library surface glass-ui/keyframes
  consume), none changes a shared export or the mixColors/sampleColorRamp/color2 channel
  convention, none is a glass-ui producer surface. The touched-file census confirms it:
  Cluster 1 → `api/src/modules/{admin,session}/**` + `api/src/types.ts`; Cluster 2 →
  `api/.env.example` + `api/CLAUDE.md` + `api/compose.yaml`; Cluster 3 →
  `demo/color-picker/public/_headers` + `test/frontend-headers.test.ts` +
  `docs/tranches/U/audit/sec/`; Cluster 4 → `api/package.json` + `api/package-lock.json` +
  `api/test/`. **No `src/`, no `../glass-ui`, no `../keyframes.js`, no
  `demo/@/components/ui/`.** U-F67's hono pin is the api's own dependency — glass-ui and
  keyframes do not depend on hono.
- **U-F37's precept-residual arm** landed the justified-divergence in `api/CLAUDE.md` (the
  in-tree api-local locus), **not** in the foreign precept submodule (`docs/precepts/infra/
  domains.md` was a READ only — the divergence evidence) — so no foreign-submodule fence was
  crossed and no PRECEPT dev-process relay was needed.

**No glass-ui convention change, no producer surface, no consumed-export break ships from
this wave** → **E-2 discharged by the CHECK (the honest not-triggered declaration)**, not by
a communiqué row. The U-formation BH communiqué (`17e0f522`) already carries the cross-repo
coupling other waves own; U.W-SEC adds nothing to it.

---

## §5 Suites + evidence (at close)

- **Full api runtime suite**: **210/210 GREEN** (38 files; `cd api && npx vitest run`) —
  including the affected session-seed tests updated to store the at-rest digest
  (`session.test.ts`, `admin-users.test.ts`, and 3 conformance seeds).
- **The 5 born-RED gates, re-verified GREEN live at this close**: G-SEC-1
  `admin-impersonate.test.ts` (5) · G-SEC-2 `config-truth.test.ts` (2) · G-SEC-3
  `session-token-at-rest.test.ts` (1) · G-SEC-4 `test/frontend-headers.test.ts` (10) ·
  G-SEC-5 `hono-advisory-floor.test.ts` (2).
- **`npm audit --omit=dev` (api)**: no hono advisory (U-F67 cure; reachable advisory 1 → 0).
- **api typecheck**: `cd api && npx tsc --noEmit` returns **RED — 2 errors** (crud.ts:100,
  publish.ts:42), the hono-companion narrowing in sibling-owned palette routes (§3 MISS-3,
  out-of-write-fence, named remediation).
- **Foreign-tree fence held**: no edit to `src/`, `../glass-ui`, `../keyframes.js`,
  `demo/@/components/ui/`, or the foreign precept submodule. This close commit is docs-only,
  path-scoped to `docs/tranches/U/**`.

---

## §6 Books carried into U.W-CLOSE / U-F61 (books, never gates — zero silent drops)

- **U-F41 on-wire re-verify → U.W-CLOSE / U-F61 (attested-not-verified).** The
  `mbabb.fi.ncsu.edu/colors/` alias retire is an off-repo NCSU-host action
  (`[U-F41-DEPLOY]`); the VPN-gated re-verify (301→api.color.babb.dev or dead) is
  owner-attested at close, ties the X2 residual.
- **U-F39 live-header confirmation → U.W-CLOSE / U-F61 (deploy-dependent).** The `_headers`
  repo-artefact is the born-RED (G-SEC-4 GREEN); the LIVE proof (color.babb.dev serving the
  suite) is deploy-dependent → owner-attested, not asserted green pre-deploy.
- **The U-F37 SCRAM-vs-residual decision — recorded, owner-held.** Path (b) (delete the
  unwired vars + write the residual) landed the repo-side config-truth resolution; the
  SCRAM+keyFile wiring stays the owner's deploy-time election (recorded, not re-booked as a
  successor family).
- **The hono-companion typecheck-RED (§3 MISS-3) → a named api-hygiene remediation row.** A
  1-line slug narrowing at `crud.ts:100` + `publish.ts:42` restores `npx tsc --noEmit` green;
  under the palette-routes owner (a U.W-CANON/DEMO-class or next api-touching lane).
- **The `_headers` `.gitignore` negation (§3 MISS-4) → a named hygiene row.** Add
  `!demo/color-picker/public/_headers` (the T.W1 `!**/__tests__/` pattern) so the artefact
  cannot silently vanish.
- **U-F67 rolling hono advisories → a rolling `npm audit --omit=dev` concern**, not a standing
  churn-gate (distinct from U-F71's dev-toolchain batch, which never ships in dist).

**Hand-off**: U.W-SEC is a leaf feeding U.W-CLOSE's ledger walk. It closes
`complete_with_misses` — 5 born-RED gates GREEN at cure, U-F40 folded, U-F41 escalate
decided; the two by-design attested-not-verified DELTAs + the two execution-surfaced misses
booked; zero silent drops.
