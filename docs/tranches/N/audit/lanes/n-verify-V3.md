# LANE V3 — Production Wire-Truth Audit
*Branch: tranche-f-handoff, HEAD: 0cb5dd2, Date: 2026-06-11*

---

## Probe (a): api.color.babb.dev root + /health, /docs, /openapi.json

| Endpoint | Status | Body |
|----------|--------|------|
| `GET /` | **200** | `{"status":"ok","service":"palette-api"}` |
| `GET /health` | **404** | `{"type":"urn:palette-api:problem:not_found","title":"Not Found","status":404,"instance":"/health"}` |
| `GET /docs` | **404** | same problem+json envelope |
| `GET /openapi.json` | **404** | same problem+json envelope |

**Verdict**: Root is alive and matches HEAD `api/src/index.ts:78` (`app.get("/", ...)`). No `/health`, `/docs`, or `/openapi.json` routes exist at HEAD or in the deployed code — these were never implemented.

---

## Probe (b): /palettes?limit=1 — envelope field analysis

**Wire payload fields (confirmed via `python3 -c "print(list(p.keys()))"`)**:
```
["id", "name", "slug", "colors", "tags", "versionCount", "forkCount", "forkOf",
 "forkOfHash", "currentHash", "oklabColors", "voteCount", "userSlug", "status",
 "visibility", "tier", "deletedAt", "createdAt", "updatedAt", "isLocal", "voted"]
```

**HEAD `api/src/format/palette.ts` (commit 0cb5dd2) emits**:
```
["name", "slug", "colors", "tags", "versionCount", "forkCount", "forkOf",
 "forkOfHash", "currentHash", "oklabColors", "voteCount", "userSlug", "visibility",
 "tier", "deletedAt", "createdAt", "updatedAt", "published", "atomSetHash", "isLocal", "voted"]
```

**Discrepancies: wire vs HEAD**

| Field | Wire | HEAD |
|-------|------|------|
| `id` | PRESENT (`"69c4ae56e79f84da7d646e42"`) | ABSENT — removed in K.W2 (commit `59aab42`) |
| `status` | PRESENT (`"published"`, `"featured"`) | ABSENT — removed in L.W3 (commit `17b6148`) |
| `published` | ABSENT | PRESENT — added K.W2 (commit `59aab42`) |
| `atomSetHash` | ABSENT | PRESENT — added K.W2 (commit `59aab42`) |

**The `id` field** was `String(_id)` (MongoDB ObjectId serialized to hex string). Confirmed removed in K.W2 `format/palette.ts` diff:
```diff
-    id: string;
...
-        id: String(_id),
```

**The `status` field** is the legacy 4-state enum (`published`, `featured`, `unlisted`, `private`). Confirmed removed in L.W3 (the "full-stack excision" commit). The wire shows it carried alongside `visibility`/`tier`, which exactly matches the I.W1-era plan ("retained for backward-compat during I.W1 transition; drop at I.W4") — but the drop never made it to production.

**Lane D5 verdict on field presence**: CONFIRMED. The payload carries legacy `id` and `status` and lacks `published` and `atomSetHash`. The deployed API is running **pre-K.W2 code** (before commit `59aab42`, 2026-06-03).

---

## Probe (c): J-era endpoint probes (read-only GETs)

| Endpoint | HTTP Status | Interpretation |
|----------|-------------|----------------|
| `GET /palettes/hey-v2-cd3e1e3b/diff?to=x` | **404** | Route not registered in deployed code; defined only in HEAD `api/src/routes/palettes/diff.ts` (added K.W2, commit `59aab42`) |
| `GET /palettes/hey-v2-cd3e1e3b/remix` | **404** | Route not registered; defined in `forks.ts` (added K.W2) |
| `GET /palettes/hey-v2-cd3e1e3b/publish` | **404** | Route not registered; defined in `publish.ts` (added K.W2) |
| `GET /palettes/hey-v2-cd3e1e3b/versions` | **200** | Route exists (D.W2 era, present since commit `491a5d8`) |
| `GET /palettes/hey-v2-cd3e1e3b/forks` | **200** | Route exists (D.W2 era), response uses pre-K.W2 envelope (has `id`, `status`) |
| `GET /palettes/hey-v2-cd3e1e3b/provenance` | **200** | Route exists (D.W2 era); returns the old shape without `published`/`atomSetHash` |

**The deployed palettes router** has exactly 5 concern-routers (crud, versions, forks, votes, flags) as defined in commit `491a5d8` and unchanged through I.W4/I.W5. HEAD adds two more (`diffRouter`, `publishRouter`) — neither is reachable on the wire.

**Narrowing the deployed version**: The deployed code has:
- problem+json 404 envelopes (added I.W3+I.W4, commit `23a7b27`)  
- ETag on `GET /palettes/:slug` in format `"<updatedAt ISO string>"` when `currentHash` is null (added I.W3+I.W4, commit `23a7b27`)
- ratelimit-limit/remaining/reset response headers (added I.W3+I.W4)
- `deletedAt` field in envelope (added I.W2, commit `d22a9d1`)
- **NO** diffRouter, publishRouter, remix route (added K.W2, commit `59aab42`)

**Conclusion**: Deployed code matches code from **I.W3+I.W4 (commit `23a7b27`, 2026-05-29) through I.W5/G/H era, before K.W2 (2026-06-03)**. The `format/palette.ts` did not change between I.W3+I.W4 and K.W2 (`git log d22a9d1..59aab42 -- api/src/format/palette.ts` = one commit, K.W2 only). The router index didn't add diffRouter/publishRouter until K.W2.

---

## Probe (d): mbabb.fi.ncsu.edu/colors/ — "retired" claim

| Check | Result |
|-------|--------|
| `GET https://mbabb.fi.ncsu.edu/colors/` status | **200** — `{"status":"ok","service":"palette-api"}` |
| `GET https://mbabb.fi.ncsu.edu/colors/palettes` status | **200** |
| IP of `api.color.babb.dev` | `34.197.214.67` |
| IP of `mbabb.fi.ncsu.edu` | `34.197.214.67` |
| Response `diff /tmp/babb_dev_palettes.json /tmp/ncsu_palettes.json` | **IDENTICAL** (byte-for-byte) |
| Rate-limit bucket | Same bucket — sequential hits to babb.dev then NCSU decremented the same counter |

**The NCSU hostname is NOT retired.** Both `api.color.babb.dev` and `mbabb.fi.ncsu.edu` resolve to the same AWS EC2 instance at `34.197.214.67`. The responses are byte-identical and they share the same in-process rate-limit state, proving they hit the **same Hono server process**.

The `api/CLAUDE.md` claim that "the `mbabb.fi.ncsu.edu/colors/` :3100 NCSU topology was retired at K.W2 / DEC-9" is **false on the wire**. The NCSU hostname is alive. It may be served from the same Docker container now (the old :3100 vhost config now possibly routes to the same :8130 backend) or the NCSU DNS continues to point to the same AWS IP as `api.color.babb.dev`. The `api/apache-vhost.conf` in the repo still points to `http://localhost:3100/` — the old topology config was never updated to reflect :8130.

Additionally: the `api/README.md:121` still says "Production: https://mbabb.fi.ncsu.edu/colors/" — another unretired reference.

---

## Probe (e): DEC-9 retirement claims — verdict

**api/CLAUDE.md claims (DEC-9 retirement)**:
1. "the `mbabb.fi.ncsu.edu/colors/` :3100 NCSU topology retired at K.W2/DEC-9" — **FALSE**. NCSU URL is alive, same server.
2. "Deploy: `scripts/deploy.sh api` ... git-push → adnanh/webhook ... `docker compose up` → bounded `/` health-gate. No rsync, no SSH" — **Cannot confirm** (no direct server access, read-only). The webhook URL `https://deploy.babb.dev/hooks/value-js` returns 404 on GET (expected — it's a POST-only HMAC endpoint), so existence is plausible but unconfirmed.
3. The J-era endpoints (`/diff`, `/publish`, `/unpublish`, `/remix`) are **NOT live** on the wire — the DEC-9 deploy either never ran after K.W2, or K.W2 was never deployed.

**Overarching finding: The deployed API is running I.W3+I.W4-era code** (from approximately 2026-05-29), not the current master HEAD (0cb5dd2). The last deployed commit is somewhere between `23a7b27` (I.W3+I.W4) and `59aab42` (K.W2), most likely deployed when the I-tranche was completed (late May 2026).

---

## Primary evidence chain

| Claim | Evidence source |
|-------|----------------|
| Wire `id` field exists | `curl https://api.color.babb.dev/palettes?limit=1` → field `id` in JSON |
| Wire `status` field exists | Same curl output |
| Wire lacks `published`, `atomSetHash` | Same curl output |
| HEAD `format/palette.ts` lacks `id`, `status` | `api/src/format/palette.ts:66-88` at HEAD |
| `id` removed in K.W2 | `git show 59aab42 -- api/src/format/palette.ts` diff |
| `status` removed in L.W3 | `git show 17b6148 --stat` commit message + `api/src/models.ts` (no status field on Palette at HEAD) |
| `published`/`atomSetHash` added K.W2 | `git show 59aab42 -- api/src/format/palette.ts` diff |
| `/diff` route added K.W2 | `api/src/routes/palettes/index.ts` + K.W2 commit; wire returns 404 |
| NCSU not retired | `curl -v mbabb.fi.ncsu.edu/colors/` → IP `34.197.214.67` = same as `api.color.babb.dev` |
| Same rate-limit pool | Sequential hits to both URLs show shared counter (observed `ratelimit-remaining` decrements) |
| Problem+json 404 = post-I.W4 | `git show 23a7b27:api/src/index.ts` → `app.notFound` with `urn:palette-api:problem:not_found` envelope |
| ETag = post-I.W4 | Wire `GET /palettes/neon-cyberpunk` → `etag: "2026-03-06T21:13:16.458Z"`; etag.ts added at `23a7b27` |

---

## Summary verdicts

1. **`/` → 200 (alive)** — api.color.babb.dev root is live; matches HEAD.
2. **`/health` → 404** — no /health route was ever implemented; consistent with HEAD.
3. **`/docs`, `/openapi.json` → 404** — never implemented; consistent with HEAD.
4. **Palette envelope carries legacy `id` + `status`; lacks `published` + `atomSetHash`** — confirms deployed code is pre-K.W2 (before 2026-06-03).
5. **J-era routes (`/diff`, `/publish`, `/remix`) return 404** — not present in deployed code; confirms deployed code is pre-K.W2.
6. **`mbabb.fi.ncsu.edu/colors/` is ALIVE** — same server (34.197.214.67), same API instance, same rate-limit bucket. DEC-9 retirement claim is FALSE on the wire.
7. **Deployed API is running I.W3+I.W4-era code** (post `23a7b27` 2026-05-29, pre `59aab42` 2026-06-03) — at least 8 days of git history (K.W2 through L through M through tranche-f-handoff HEAD) have never been deployed to production.
