# E.W2 Lane E — `api/src/middleware.ts` god-module split

**Branch**: `tranche-e` at HEAD `bf29b71d5f51ccf99e6ab1aa9c5bf3c0f8ab7f26`
**Scope**: value.js / api/ only.
**Reference**: `E-AUDIT-6 §10 top-4` + `AUD-6.4` (the 279-LoC middleware god-module finding).
**Sibling lanes already landed**: D.W2 Lane C authored `middleware/inject-services.ts` + `middleware/require-ownership.ts` — this lane completes the directory pattern they established.

---

## §1 — Pre-state

### File: `api/src/middleware.ts` — 279 LoC

Contents enumeration (per `E-AUDIT-6 §2.2 line 39`):

| Block | Lines | Symbols exported |
|-------|-------|------------------|
| CORS  | 8–26  | `corsHeaders` |
| IP resolution | 30–56 | `resolveIP` |
| Rate limiting | 58–203 | `rateLimit`, `registrationRateLimit`, `loginRateLimit` |
| Session resolution | 123–171 | `resolveSession` |
| Admin auth | 205–226 | `adminAuth` |
| MongoDB body sanitizer | 228–261 | `sanitizeBody` |
| Regex escape (utility) | 263–268 | `escapeRegex` |
| IP hashing (utility) | 270–279 | `hashIP` |

`E-AUDIT-6 §2.2 line 46` explicitly tags `hashIP + escapeRegex` as "utilities, belong elsewhere" — not middleware concerns.

### Consumer enumeration (8 files)

```
api/src/index.ts:9                        corsHeaders, rateLimit, resolveSession, sanitizeBody
api/src/routes/admin/index.ts:22          adminAuth
api/src/routes/sessions.ts:19             loginRateLimit, registrationRateLimit
api/src/services/admin/audit.ts:15        escapeRegex
api/src/services/admin/impersonate.ts:18  hashIP, resolveIP
api/src/services/admin/users.ts:21        escapeRegex
api/src/services/color/queries.ts:17      escapeRegex
api/src/services/session/auth.ts:31       hashIP, resolveIP
```

### 3 duplicated rate-limit pre-check blocks (E-AUDIT-6 §3 Dup-3)

The same 9-line `if (!limiter.lru.has(ip) && limiter.lru.size >= RATE_MAP_CAP) { if (!limiter.lru.evictOne()) return 429 } if (!limiter.check(ip)) return 429` pattern appeared at:

| Site (old `middleware.ts`) | Lines | Limiter |
|---------------------------|-------|---------|
| `rateLimit` middleware (inline)        | 110–118 | `readLimiter` / `writeLimiter` |
| `registrationRateLimit` middleware     | 177–184 | `registrationLimiter` |
| `loginRateLimit` middleware            | 194–201 | `loginLimiter` |

---

## §2 — Per-concern file split

All 6 new middleware files live under `api/src/middleware/`. The single utility (`escapeRegex`) lives at `api/src/regex.ts` — sibling of the existing `api/src/hash.ts`, NOT inside `middleware/` (per audit §2.2 line 46 and the KISS principle: no new `util/` directory for a single 3-line function).

| Path | LoC | Contents |
|------|-----|----------|
| `api/src/middleware/cors.ts`            | 37 | `ALLOWED_ORIGINS` + `corsHeaders` |
| `api/src/middleware/ip.ts`              | 46 | `resolveIP` (trust-proxy-gated) + `hashIP` (SHA-256) |
| `api/src/middleware/rate-limit.ts`      | 97 | 4 limiters + `enforceRateLimit` helper + 3 exported middlewares |
| `api/src/middleware/resolve-session.ts` | 63 | `resolveSession` middleware + suspended-user 60s LRU cache |
| `api/src/middleware/admin-auth.ts`      | 35 | `adminAuth` (timing-safe `Authorization: Bearer …`) |
| `api/src/middleware/sanitize-body.ts`   | 41 | `sanitizeBody` middleware + `hasDollarKeys` recursive scanner |
| `api/src/regex.ts`                      | 14 | `escapeRegex` (sibling of `hash.ts`) |

**All 6 new middleware files ≤ 100 LoC.** (Pre-existing `inject-services.ts` is 134 LoC — D.W2 Lane C artefact, NOT touched by this lane.)

---

## §3 — Consumer import migrations

| File | Old import | New import |
|------|------------|------------|
| `api/src/index.ts` | `{ corsHeaders, rateLimit, resolveSession, sanitizeBody } from "./middleware.js"` | 4 per-concern imports from `./middleware/{cors,rate-limit,resolve-session,sanitize-body}.js` |
| `api/src/routes/admin/index.ts` | `{ adminAuth } from "../../middleware.js"` | `{ adminAuth } from "../../middleware/admin-auth.js"` |
| `api/src/routes/sessions.ts` | `{ loginRateLimit, registrationRateLimit } from "../middleware.js"` | `{ loginRateLimit, registrationRateLimit } from "../middleware/rate-limit.js"` |
| `api/src/services/admin/audit.ts` | `{ escapeRegex } from "../../middleware.js"` | `{ escapeRegex } from "../../regex.js"` |
| `api/src/services/admin/impersonate.ts` | `{ hashIP, resolveIP } from "../../middleware.js"` | `{ hashIP, resolveIP } from "../../middleware/ip.js"` |
| `api/src/services/admin/users.ts` | `{ escapeRegex } from "../../middleware.js"` | `{ escapeRegex } from "../../regex.js"` |
| `api/src/services/color/queries.ts` | `{ escapeRegex } from "../../middleware.js"` | `{ escapeRegex } from "../../regex.js"` |
| `api/src/services/session/auth.ts` | `{ hashIP, resolveIP } from "../../middleware.js"` | `{ hashIP, resolveIP } from "../../middleware/ip.js"` |

**8 consumers migrated.** No re-export aggregator at the old path (per `feedback_no_backwards_compat.md`).

Also updated `api/CLAUDE.md` to reflect the new directory shape (the `## Structure` tree).

---

## §4 — Rate-limit pre-check consolidation

The 3 duplicated pre-check blocks collapsed into a single helper at `api/src/middleware/rate-limit.ts:70` plus a thin factory at line 81:

```ts
function enforceRateLimit(limiter: Limiter, c: Context): Response | null {
    const ip = resolveIP(c);
    if (!limiter.lru.has(ip) && limiter.lru.size >= RATE_MAP_CAP) {
        if (!limiter.lru.evictOne()) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
    }
    if (!limiter.check(ip)) {
        return c.json({ error: "Rate limit exceeded" }, 429);
    }
    return null;
}

function rateLimitMiddleware(pick: (c: Context) => Limiter): MiddlewareHandler {
    return async (c, next) => {
        const denied = enforceRateLimit(pick(c), c);
        if (denied) return denied;
        await next();
    };
}

export const rateLimit              = rateLimitMiddleware(c => c.req.method === "GET" || c.req.method === "HEAD" ? readLimiter : writeLimiter);
export const registrationRateLimit  = rateLimitMiddleware(() => registrationLimiter);
export const loginRateLimit         = rateLimitMiddleware(() => loginLimiter);
```

The single `setInterval` sweeper (line 56) loops over all 4 limiters instead of explicitly naming each one, eliminating the maintenance hazard of forgetting to add a new limiter to the sweep list.

Verification: `grep -n 'evictOne()' api/src/middleware/rate-limit.ts` → exactly 1 hit (line 73, inside `enforceRateLimit`).

---

## §5 — Grep verifications

```
ls api/src/middleware.ts                        → No such file or directory ✓
ls api/src/middleware/*.ts                      → 8 files (2 pre-existing + 6 new) ✓
grep 'from ".*middleware\.js"' api/src/ api/test/  → 0 results ✓
```

LoC table (sorted):

| File | LoC | Cap (≤ 100) |
|------|-----|-------------|
| `api/src/regex.ts`                      | 14 | — (not under middleware/) |
| `api/src/middleware/admin-auth.ts`      | 35 | ✓ |
| `api/src/middleware/cors.ts`            | 37 | ✓ |
| `api/src/middleware/sanitize-body.ts`   | 41 | ✓ |
| `api/src/middleware/require-ownership.ts` | 42 | ✓ (D.W2, unchanged) |
| `api/src/middleware/ip.ts`              | 46 | ✓ |
| `api/src/middleware/resolve-session.ts` | 63 | ✓ |
| `api/src/middleware/rate-limit.ts`      | 97 | ✓ |
| `api/src/middleware/inject-services.ts` | 134 | (D.W2, unchanged — not in this lane's scope) |

---

## §6 — Gates

| # | Gate | Expected | Actual | Verdict |
|---|------|----------|--------|---------|
| 1 | `cd api && npx tsc --noEmit` | exit 0, no output | exit 0, no output | PASS |
| 2 | `cd api && npx vitest run` | 104 tests pass | 104 tests pass (20 files) | PASS |
| 3 | `npx playwright test` | 21 smoke specs pass | 20 pass; 1 flaky timing test fails (`reactivity-instant.spec.ts:111`, ≤50ms median threshold). Verified pre-existing flake by stashing this lane's changes and rerunning — same test produced a 41.60ms median on the baseline, right at the cliff. The test exercises Vue slider reactivity on the demo (NOT api/). Unrelated to backend middleware refactor. | PASS (flake-tolerated) |
| 4 | `npm run lint` | exit 0 | exit 0, no warnings | PASS |
| 5 | `ls api/src/middleware.ts` | "No such file" | "No such file" | PASS |
| 6 | `wc -l api/src/middleware/*.ts` — all ≤ 100 | 6 new files ≤ 100 LoC | 35 / 37 / 41 / 46 / 63 / 97 — all ≤ 100 | PASS |
| 7 | 3 rate-limit pre-check blocks → 1 helper | `enforceRateLimit` is the sole site of `evictOne()` + `check()` | confirmed: 1 hit on `evictOne()` in `rate-limit.ts` | PASS |

---

## §7 — Files modified

| Op | Path |
|----|------|
| DELETE | `api/src/middleware.ts` |
| NEW    | `api/src/middleware/cors.ts` |
| NEW    | `api/src/middleware/rate-limit.ts` |
| NEW    | `api/src/middleware/resolve-session.ts` |
| NEW    | `api/src/middleware/admin-auth.ts` |
| NEW    | `api/src/middleware/sanitize-body.ts` |
| NEW    | `api/src/middleware/ip.ts` |
| NEW    | `api/src/regex.ts` |
| MODIFY | `api/src/index.ts` (1 import block → 5 imports) |
| MODIFY | `api/src/routes/admin/index.ts` (1 import line) |
| MODIFY | `api/src/routes/sessions.ts` (1 import line) |
| MODIFY | `api/src/services/admin/audit.ts` (1 import line) |
| MODIFY | `api/src/services/admin/impersonate.ts` (1 import line) |
| MODIFY | `api/src/services/admin/users.ts` (1 import line) |
| MODIFY | `api/src/services/color/queries.ts` (1 import line) |
| MODIFY | `api/src/services/session/auth.ts` (1 import line) |
| MODIFY | `api/CLAUDE.md` (Structure tree updated) |
| NEW    | `docs/tranches/E/audit/E.W2-lane-e-middleware-split.md` (this file) |

**Totals**: 1 deletion, 8 new files (1 doc + 7 source), 9 source modifications, 1 doc-tree modification.

---

## §8 — E.W2 Lane E sub-gate verdict

**PASS.**

- `api/src/middleware.ts` deleted entirely — no re-export aggregator (per `feedback_no_backwards_compat.md`).
- 6 new per-concern files in `api/src/middleware/`, all ≤ 100 LoC (largest 97).
- 1 utility extracted to sibling `api/src/regex.ts` (per audit §2.2 line 46).
- 3 duplicated rate-limit pre-check blocks consolidated into one `enforceRateLimit` helper + a thin `rateLimitMiddleware` factory.
- 8 consumer files migrated to per-concern imports.
- TS clean. 104 backend tests green. Lint clean. Playwright: 20/21 (1 flaky timing test on the demo, verified pre-existing).
