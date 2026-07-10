# T.W0 — X-HOST OPS RECORD (X1 + X2)

**Lane**: T.W0 X-HOST OPS — fix ALL deploy hooks + execute X1/X2.
**Authored**: 2026-07-10 (UTC), branch `tranche-t`.
**Governing law**: RATIFICATION-2026-07-09 §0 verbatim + §2 (the CI/DEPLOY MANDATE
rider) → MANDATE-2026-07-06 → SYNTHESIS → R FINAL §7 (X1/X2 instructions).
**Verdict**: **X1 LANDED · X2 LANDED.** api.color.babb.dev restored to HEAD lineage
and left I-era; the value.js deploy webhook repaired end-to-end; the NCSU
`/colors/` alias retired to a 301-redirect to color.babb.dev. All executed on
`mbabb.fridayinstitute.net` (the babb.dev spine host) over the granted SSH access.

> **§Recovery-rider note.** A prior instance of this lane died BEFORE any durable
> work (no `w0-xhost-record.md`, no recorded survey). This run inherited NOTHING:
> the read-only survey was re-run from scratch. Host/VPN state is irreversible-
> adjacent, so the CAUTION LAW was held throughout — read-only survey → plan →
> execute → verify; nothing destructive fired until the survey confirmed the
> documented state; every command + output is on the record below.

---

## §0 — The decisive reframe (what the survey overturned)

R FINAL §7 recorded X1/X2 as "maintainer-on-host residuals" reachable only from
the NCSU network, with a **dead deploy webhook** and an **I-era prod api**. The
live survey (2026-07-10) overturned three of those premises:

1. **One host serves both.** `mbabb.fridayinstitute.net` (SSH `mbabb@…:1022`)
   resolves to the AWS box `ip-10-0-2-253` / public `34.197.214.67` — and it is
   the **babb.dev spine host itself**: it runs every constellation container
   (palette-api, fourier, csp-solver, floridify) AND terminates TLS for
   `*.babb.dev` AND hosts the `mbabb.fi.ncsu.edu` Apache vhost. So X1 and X2 are
   the same box; the granted SSH access discharges both.
2. **The prod api was not "I-era" — it was CRASH-LOOPING.** `api.color.babb.dev`
   returned **503** (Apache up, Docker upstream on :8130 dead), not R-era's 404.
   `palette-api-api-1` was `Restarting (1)` on a MongoDB `IndexOptionsConflict`.
3. **The webhook was not "dead" — it was mis-probed and mis-routed.** R FINAL
   probed `deploy.babb.dev/hooks/value-js` (**hyphen**) → "Hook not found." The
   GitHub webhook actually posts to `…/hooks/value.js` (**dot**, active, "OK").
   That hook EXISTS but still routed through the legacy `dispatch.sh` arm to a
   dead directory — the Ask-3 host migration was never completed.

---

## §1 — SURVEY (read-only)

### 1.1 SSH client config + connectivity

`~/.ssh/config` carries a live stanza:

```
Host mbabb.fridayinstitute.net
    HostName mbabb.fridayinstitute.net
    User mbabb
    Port 1022
```

plus a matching `known_hosts` line `[mbabb.fridayinstitute.net]:1022 ssh-ed25519 …`.

Connectivity probe (read-only):

```
$ ssh -o ConnectTimeout=12 -o BatchMode=yes mbabb.fridayinstitute.net 'hostname; whoami; uname -a'
ip-10-0-2-253
mbabb
Linux ip-10-0-2-253 6.8.0-1047-aws … x86_64 GNU/Linux      → exit 0
```

`id`: `uid=1002(mbabb) … groups=…,113(admin),998(docker)` — docker group + `admin`
(passwordless sudo confirmed later). Public IP `34.197.214.67`.

### 1.2 Live wire state (before)

| Endpoint | Result (before) |
|---|---|
| `https://api.color.babb.dev/health` | **503** Service Unavailable (Apache error page) |
| `https://api.color.babb.dev/` | **503** |
| `https://color.babb.dev/` | **200** (CF Pages frontend healthy) |
| `https://mbabb.fi.ncsu.edu/colors/` | **503** (same crash-looping upstream) |
| `https://mbabb.fi.ncsu.edu/colors/health` | **503** |
| `https://deploy.babb.dev/hooks/value-js` (hyphen) | **404** "Hook not found." |
| `https://deploy.babb.dev/hooks/value.js` (dot) | **200** "Hook rules were not satisfied." (hook present, rules enforced) |
| `https://deploy.babb.dev/` | **200** (receiver reachable) |

### 1.3 Host survey — docker + deploy dir

`docker ps` (excerpt):

```
palette-api-api-1     Restarting (1) 56 seconds ago      ← CRASH-LOOP
palette-api-mongo-1   Up 14 minutes (healthy)   27017/tcp
palette-api-backup-1  Up 5 weeks                27017/tcp
… (fourier-analysis-*, csp-solver-*, floridify-* also present) …
```

Deploy dir `/srv/constellation/palette-api` is a full git checkout on `master`:

```
$ git -C /srv/constellation/palette-api rev-parse --abbrev-ref HEAD → master
$ git -C … log -1 --oneline → 0441aba ci(fix): remove the phantom //interaction-to-next-paint assertion key …
$ git -C … status -b → ## master...origin/master   (clean)
$ git fetch origin master; git rev-parse origin/master → 0441abaf…  (deployed == true tip)
```

`scripts/deploy-hook.sh` present (`-rwxrwxr-x`, 9722 bytes). Host `.env` keys
(values unread): `ADMIN_TOKEN`, `ALLOWED_ORIGINS`, `COMPOSE_PROJECT_NAME`
(`MONGODB_URI` is compose-default `mongodb://mongo:27017/palette-db?replicaSet=rs0&directConnection=true`).

### 1.4 X1 root cause — the crash-loop

`docker logs palette-api-api-1` terminated repeatedly on:

```
Failed to start: MongoServerError: An equivalent index already exists with a
different name and options. Requested index: { v:2, key:{expiresAt:1},
name:"sessions_ttl_expiresAt", expireAfterSeconds:0 }, existing index:
{ v:2, key:{expiresAt:1}, name:"expiresAt_1" }   (code 85, IndexOptionsConflict)
    at … getDb (dist/db.js:35) → main (dist/index.js:124)
```

Cause: the live `palette-db.sessions` collection carries a stale plain index
`expiresAt_1`; current code (`api/src/db.ts:81-83`) declares the **canonical**
TTL index on the same key:

```ts
db.collection("sessions").createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: "sessions_ttl_expiresAt" },
```

The comment at `db.ts:79` states this TTL index REPLACED "the plain `{expiresAt}`
index" — i.e. `expiresAt_1` is exactly the superseded legacy index. `createIndex`
refuses a same-key index under a new name/options (code 85), so `getDb()` throws
and the process exits every boot. The app has **no migration runner** (per
`deploy-hook.sh` header; `migrations/check.ts` is a smoke probe, not a migrator),
so it cannot self-heal — the stale index must be dropped once on the live DB.

Confirmed live indexes (before):

```
{"v":2,"key":{"_id":1},"name":"_id_"}
{"v":2,"key":{"lastSeenAt":1},"name":"lastSeenAt_1"}
{"v":2,"key":{"expiresAt":1},"name":"expiresAt_1"}      ← the blocker
```

### 1.5 Webhook truth — the value.js hook

GitHub webhook config (`gh api repos/mkbabb/value.js/hooks`):

```
id=603157404  url=https://deploy.babb.dev/hooks/value.js  events=['push']  active=True  last_status="active OK"
```

`/opt/deploy/hooks.json` (webhook daemon `-hooks … -hotreload`, systemd
`webhook.service` active, port 9000) defines 5 hooks. The `value.js` hook
(id matches GitHub's dot-URL) routed through the **legacy** path:

```
BEFORE:  execute-command = /opt/deploy/scripts/dispatch.sh
         command-working-directory = /opt/deploy
         trigger-rule = HMAC-sha256(<secret>) AND ref==refs/heads/master
```

`dispatch.sh`'s `mkbabb/value.js` arm runs `deploy "$HOME/Programming/palette-api" 8130 /`
— and `$HOME/Programming/palette-api` is an **empty stale directory** (2 entries,
mtime May 29). This is precisely the "latent-broken arm" the `deploy-hook.sh`
header warns of ("V3 found the wire serving pre-K.W2 code"). The correct target
is the hardened `deploy-hook.sh` inside the git checkout (as the `fourier-analysis`
hook already does).

### 1.6 X2 survey — the NCSU `/colors/` alias

The alias lives on THIS box, in the `mbabb.fi.ncsu.edu` vhost
`/etc/apache2/sites-enabled/default-ssl.conf` (root-owned real file):

```apache
        # Palette / Colors API Proxy
        ProxyPass /colors/ http://localhost:8130/
        ProxyPassReverse /colors/ http://localhost:8130/

        <Location /colors/>
            ProxyPreserveHost On
            RequestHeader set X-Forwarded-Proto "https"
            RequestHeader set X-Forwarded-Port "443"
        </Location>
```

(An earlier maintainer already re-pointed it from the stale `:3100` to `:8130`;
that is why the alias 503'd in lockstep with the crash-looping api.) The block is
surgically isolable — the surrounding `/words` (301) and `/fourier/` rules are
independent, and `RewriteEngine On` is already active in this vhost (the `/words`
rule uses it), so a redirect is idiomatic here. `sudo -n true` → **passwordless
sudo confirmed**, so the apache edit is feasible.

---

## §2 — X1: restore the api + fix the deploy webhook

### 2.1 Plan

1. **Migration** — drop the stale `sessions.expiresAt_1` index (the honest DB-side
   root cure; reconciles the live DB to the canonical `db.ts` definition). NOT a
   workaround: the workaround would be renaming the code's index back to match the
   stale DB (legacy-compat) — rejected.
2. **Deploy (documented path, not improvised)** — run
   `scripts/deploy-hook.sh mkbabb/value.js`: rebuild + `up -d` +
   DEPLOY_COMMIT_SHA + bounded `/health` gate + green-marker record.
3. **Webhook** — repoint the `value.js` hook in `/opt/deploy/hooks.json` from the
   legacy `dispatch.sh` arm to the git-checkout `deploy-hook.sh`, preserving the
   GitHub-matched HMAC secret + master-ref trigger verbatim. Back up first;
   `-hotreload` picks it up.

### 2.2 Execute + verify

**Migration:**

```
$ docker exec palette-api-mongo-1 mongosh --quiet palette-db --eval 'db.sessions.dropIndex("expiresAt_1")'
  { nIndexesWas: 3, ok: 1 }
AFTER: indexes = _id_ , lastSeenAt_1   (expiresAt_1 gone)
```

**Deploy (`scripts/deploy-hook.sh`):**

```
[deploy-hook:palette] Image palette-api-api Built  (all layers CACHED — same commit)
[deploy-hook:palette] api brought up at lineage 0441abafba8437a29dbe3d366f05111c6792ad4b
[deploy-hook:palette] health gate GREEN on :8130 (attempt 14/30; /health ok, / -> 200)
[deploy-hook:palette] DEPLOY OK 0441aba… -> 0441aba… (recorded green)
```

**Verify:**

```
$ curl https://api.color.babb.dev/health   → 200
  {"status":"ok","service":"palette-api","version":"2.0.0",
   "commit":"0441abafba8437a29dbe3d366f05111c6792ad4b","checks":{"mongo":"ok"},"uptime":11}
$ curl https://api.color.babb.dev/          → 200
$ docker ps (palette-api-api-1)             → Up (healthy)   [stable, no restart loop]
$ /opt/deploy/palette-last-green            → 0441abafba8437a29dbe3d366f05111c6792ad4b
sessions indexes now:
  {"key":{"expiresAt":1},"name":"sessions_ttl_expiresAt","expireAfterSeconds":0}   ← canonical, recreated
api logs: "Connected to MongoDB / [migrations] schema invariants OK (10 palettes) / Palette API running"
```

The `/health` `commit` stamp = `0441aba` == `origin/master` tip ⇒ **prod left
I-era** and now tracks HEAD.

**Webhook repoint** (`/opt/deploy/hooks.json`, backup
`hooks.json.bak.pre-x1-t-20260710T044202Z`):

```
AFTER:  execute-command = /srv/constellation/palette-api/scripts/deploy-hook.sh
        command-working-directory = /srv/constellation/palette-api
        pass-arguments-to-command = [{source:string, name:"mkbabb/value.js"}]
        trigger-rule = <unchanged: HMAC-sha256(<secret>) AND ref==master>
```

**Verify webhook:**

```
webhook journal: "hooks file … modified → reload → found 5 hook(s) → loaded: value.js"   (hot-reloaded)
systemctl is-active webhook → active
$ curl -X POST https://deploy.babb.dev/hooks/value.js → 200 "Hook rules were not satisfied."
   (hook present; unsigned poke correctly rejected ⇒ HMAC secret intact)
```

The pipeline is now end-to-end correct: `git push origin master` → GitHub POST
`…/hooks/value.js` (HMAC-signed, ref==master) → webhook verifies → runs the
git-checkout `deploy-hook.sh` → `reset --hard origin/master` + build + up +
health-gate + green-marker. **X1 LANDED.**

---

## §3 — X2: retire the NCSU `/colors/` alias

Sequencing precondition (R FINAL §7 X2: "after X1 confirms color.babb.dev +
api.color.babb.dev serve HEAD lineage") — **met** (both 200, api on HEAD).

### 3.1 Plan

Replace the `/colors/` proxy block in `default-ssl.conf` with a `301` redirect to
`https://color.babb.dev/`. This satisfies both the R FINAL "remove the `/colors/`
reverse-proxy block" instruction AND the RATIFICATION/task "retire/redirect to
color.babb.dev" — a redirect is strictly more graceful than a bare removal (no
leak to the vhost default). Backup → edit → `configtest`-gated reload (restore on
any syntax failure).

### 3.2 Execute + verify

Backup: `~/default-ssl.conf.bak.pre-x2-t-20260710T044301Z`. Replacement block:

```apache
        # Palette / Colors API - RETIRED (tranche T W0-X2, 2026-07-10).
        # Canonical: https://color.babb.dev (CF Pages) + https://api.color.babb.dev.
        # NCSU alias 301-redirects to the canonical frontend; DNS/cert may lapse.
        RewriteRule ^/colors(/.*)?$ https://color.babb.dev/ [R=301,L]
```

```
$ sudo apache2ctl configtest → Syntax OK
$ sudo systemctl reload apache2 → RELOAD_OK
```

**Verify:**

```
$ curl -I https://mbabb.fi.ncsu.edu/colors/        → HTTP/1.1 301 ; Location: https://color.babb.dev/
$ curl -I https://mbabb.fi.ncsu.edu/colors/health  → 301 ; Location: https://color.babb.dev/
$ curl -L  https://mbabb.fi.ncsu.edu/colors/        → final 200 at https://color.babb.dev/
canonical unaffected: api.color.babb.dev/health=200 ; color.babb.dev/=200
```

**X2 LANDED** — the alias no longer serves the palette API; it retires to a
permanent redirect at the canonical frontend. DNS/cert lapse is NCSU-side and
out of host scope (recorded, not blocking).

---

## §4 — Findings & recommendations (out of this lane's commit scope)

1. **`scripts/deploy.sh` `WEBHOOK_URL` uses the hyphen form**
   (`deploy.babb.dev/hooks/value-js`) while the live/GitHub hook id is the dot
   form (`value.js`). Non-load-bearing: the manual poke is explicitly non-fatal
   ("relying on the git-push webhook trigger", `deploy.sh:54`), and the
   authoritative GitHub push webhook uses the dot form and works. Recommend a
   future in-scope lane correct the default to `…/hooks/value.js`. NOT changed
   here (commit scope = the record doc only).
2. **`dispatch.sh` residual.** value.js's arm has now LEFT `dispatch.sh` (its
   `mkbabb/value.js` case is dead code). But `words`, `speedtest`, `csp-solver`
   still route through it, so `dispatch.sh` cannot yet be deleted — it remains a
   sibling-repo migration book, unchanged by this lane.
3. **`sessions.lastSeenAt_1` orphan.** Current `db.ts` no longer declares a
   `lastSeenAt` index; the live `lastSeenAt_1` lingers harmlessly (no conflict —
   nothing recreates it under a different spec). Left in place deliberately
   (dropping it is out of the X1 boot-fix scope and risks an index a query may
   use); recorded as a minor cleanup candidate.
4. **Other crash-looping containers** — `csp-solver-frontend-1` was also
   `Restarting`. Out of scope (sibling repo); noted only.

---

## §5 — Final verification matrix

| Item | Before | After |
|---|---|---|
| `api.color.babb.dev/health` | 503 | **200**, `commit=0441aba`, `mongo:ok` |
| `api.color.babb.dev/` | 503 | **200** |
| `palette-api-api-1` container | Restarting (crash-loop) | **Up (healthy)** |
| `sessions` TTL index | stale `expiresAt_1` only | **`sessions_ttl_expiresAt` (canonical)** |
| green marker | (absent/stale) | **`0441aba`** |
| `value.js` webhook target | legacy `dispatch.sh` → empty dir | **git-checkout `deploy-hook.sh`** |
| webhook hook presence (dot) | present but mis-routed | **present, correctly routed, HMAC intact** |
| `mbabb.fi.ncsu.edu/colors/` | 503 (proxy to crash-loop) | **301 → color.babb.dev** |
| `color.babb.dev/` | 200 | 200 (unaffected) |

**X1 LANDED · X2 LANDED.** No fallbacks, no legacy-compat shims: the DB was
reconciled to the canonical code; the deploy path is the documented
`deploy-hook.sh`; the alias retires to the canonical origin.

---

## §6 — On-host change ledger (reversible artefacts left on the box)

| Change | Location | Backup |
|---|---|---|
| dropped stale index | `palette-db.sessions.expiresAt_1` (app recreated canonical TTL on boot) | — (idempotent; recreated by `getDb`) |
| redeployed api | `/srv/constellation/palette-api` @ `0441aba` via `deploy-hook.sh` | prior green marker → now `0441aba` |
| repointed webhook | `/opt/deploy/hooks.json` (`value.js` hook) | `/opt/deploy/hooks.json.bak.pre-x1-t-20260710T044202Z` |
| retired NCSU alias | `/etc/apache2/sites-enabled/default-ssl.conf` (`/colors/` block) | `~/default-ssl.conf.bak.pre-x2-t-20260710T044301Z` |

All secrets (HMAC webhook secret, `.env` values) were read only where necessary
and are **redacted** from this record; no secret is transcribed here.
