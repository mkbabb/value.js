# SEED w0-dev-backend — the honest dev-backend (S.W0 W0-1 · the S-11 root cure)

**Lane**: Tranche S PROTOTYPE SEED · **Worktree**: `wf_01c28a82-3c2-1` cut from `tranche-q` HEAD
**Date**: 2026-07-04 · **Verdict**: **VIABLE** (fail-explicit half proven LIVE; full-stack half proven by config + typecheck — docker/mongo absent in this env)

---

## §Intent (exact spec cite)

`SYNTHESIS.md §3.2` item **W0-1** (transcribed verbatim in `waves/S.W0.md` scope table):

> **Dev-backend truth** (S-11): `npm run dev` delegates to `scripts/dev.sh up` (local api + mongo
> rs0 + `VITE_API_URL` + dev CORS); explicit `dev:web-only`; origin-honest failure in the
> availability path (detect the unset-env + localhost + cross-origin-prod precondition → loud
> dev-misconfig message, never "backend unreachable"); demo/CLAUDE.md + root CLAUDE.md Build
> section updated. **REJECTED**: adding localhost to prod `ALLOWED_ORIGINS`.
> Anchors: `package.json:71`, `client.ts:34-35`, `scripts/dev.sh:279-296`, `availability.ts`.

Root cause (`audit/lanes/api-broken-rootcause.md`): bare `npm run dev` (`vite --port 9000`) leaves
`VITE_API_URL` unset → `BASE_URL` falls through to the prod `api.color.babb.dev` → prod CORS
allow-list excludes `localhost` → every palette `fetch` preflight-dies → the availability latch
trips to `unavailable` and MISLABELS the cause as "backend unreachable — working locally". A silent
prod fallback — the exact prohibited class. The honest path (`scripts/dev.sh`) already exists but is
unreachable from any `npm` script.

No-workaround prohibition honored: **NOT** adding `localhost` to prod `ALLOWED_ORIGINS` (recorded).

---

## §What was built (file:line map)

| File | Change |
|---|---|
| `package.json:71-72` | `"dev"` now delegates → `scripts/dev.sh up` (full local stack); NEW `"dev:web-only": "vite --port 9000"` (the explicit, named frontend-only escape hatch) |
| `demo/@/lib/palette/api/availability.ts` | The origin-honest failure path. NEW: `ApiAvailability` gains a 4th designed state `"misconfigured"`; pure `detectDevMisconfig()` + `isLoopbackHost()` + `isCrossOrigin()`; `devMisconfigMessage()` (loud, actionable); `DevMisconfigError` (distinct from `ApiUnavailableError`); `initApiEnvironment(baseUrl)` (resolves the dev-config truth once, browser-guarded). `assertApiAttemptAllowed()` throws `DevMisconfigError` in the misconfig state (no fetch issued, state never degrades to `unavailable`); `markApiUnreachable()` guards against overwriting the designed misconfig state |
| `demo/@/lib/palette/api/client.ts:36-42` | after `BASE_URL` (`:35`) resolves, calls `initApiEnvironment(BASE_URL)` at module load — co-located with the `BASE_URL` owner, fires before any fetch can trip the latch |
| `demo/@/lib/palette/api/index.ts:29-35` | barrel re-exports `DevMisconfigError` + `devMisconfigMessage` |
| `demo/@/components/custom/palette-browser/ApiOfflineChip.vue` | renders the `misconfigured` register DISTINCTLY (a `role="alert"`, filled warning lamp, `dev misconfigured — run \`npm run dev\``) from the honest `unavailable` "backend offline — saved locally" status chip |
| `CLAUDE.md` §Build | `dev` / `dev:web-only` documented + the dev-backend honesty contract + the REJECTED localhost-in-prod-CORS shortcut |
| `demo/CLAUDE.md` §Build modes | same, plus a "dev-backend honesty contract" subsection describing the availability-path mechanism |

**Design note (in-consumer vs. owner):** every atom here is value.js-owned (demo tooling + the demo
palette client). Nothing lands in glass-ui; the fence was not touched.

---

## §Verdict — **VIABLE**

The risky mechanism (an honest dev-backend that never silently falls back to prod) is **proven end
to end**.

### Fail-explicit half — proven LIVE (worktree vite on `:9100`, `VITE_API_URL` genuinely unset)

Playwright-driven browser against the running dev server, the exact footgun reproduction:

1. **Loud, origin-honest console error** fired at startup (verbatim):
   `[ERROR] [value.js] value.js dev is MISCONFIGURED: http://localhost:9100 has no VITE_API_URL and
   is targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
   excludes localhost — every palette request will be blocked. Run \`npm run dev\` … instead of
   \`npm run dev:web-only\` … This is a dev-config error, NOT "backend offline".`
2. **Zero network requests to `babb.dev`** — the assert short-circuits *before* any fetch. This is
   the decisive "never the silent prod fallback" proof: no doomed cross-origin request is even
   issued (the mainline code would have issued one → CORS-blocked → mislabeled `unavailable`).
3. **`apiAvailability === "misconfigured"`** (the designed distinct state, NOT `unavailable`).
4. **Both palette read paths throw `DevMisconfigError`** (not `ApiUnavailableError`):
   `listPalettes()` → `DevMisconfigError`; `getApprovedColorNames()` → `DevMisconfigError`.

### Guard truth table — proven LIVE (pure `detectDevMisconfig`, no false positives)

| Case | Result |
|---|---|
| unset + `localhost` + cross-origin prod (the footgun) | **true** ✓ |
| unset + `127.0.0.1` + cross-origin prod | **true** ✓ |
| `VITE_API_URL` set (operator owns the endpoint) | false ✓ |
| production page (`color.babb.dev`, non-loopback) | false ✓ (never fires in prod) |
| honest proxy: same-origin `/api` | false ✓ |
| honest local api: `VITE_API_URL=http://localhost:3000` | false ✓ |

The guard fires on exactly the footgun and nothing else. It is provably inert in production (the
loopback clause) and on the honest full-stack path (the `VITE_API_URL`-set clause).

### Full-stack half — proven by CONFIGURATION + typecheck (docker/mongo absent in this env)

This environment has **docker DOWN, `mongosh` absent, `api/node_modules` absent**, so the local
replica-set api could not be stood up to LIVE round-trip a palette. Proven instead by construction:

- `package.json` `dev` → `scripts/dev.sh up`, and `scripts/dev.sh` already wires the honest stack:
  `start_backend` (`:282`) `ALLOWED_ORIGINS=http://localhost:$FRONTEND_PORT`; `start_frontend`
  (`:289`) `VITE_API_URL=http://localhost:$BACKEND_PORT`; mongo single-node `rs0` (`ensure_mongo`).
- On that path `VITE_API_URL` IS set → the truth table row "honest local api" → `detectDevMisconfig`
  returns **false** → no misconfig false positive; the latch behaves normally and flips to
  `available` on the first successful local fetch.
- `dev.sh` is already executable (`rwxr-xr-x`) with a `#!/usr/bin/env bash` shebang; `npm run dev`
  delegation resolves cleanly.

The live create→list→read round-trip against the local api is a **W0-1 hard-gate item for the wave**
(requires the real stack), not a seed requirement. The seed's *risk* — that the honest-state
mechanism exists and is correct — is retired.

### Evidence bar

- `npm run typecheck` → **EXIT 0** (baseline clean before changes; clean after, whole tree — the
  new `"misconfigured"` `ApiAvailability` member flows to both consumers without error).
- `npx eslint` on all 4 changed code surfaces → **EXIT 0** (`--max-warnings=0`).
- Live browser probe (above) against the worktree dev server.

---

## §Learnings

1. **Empty-string ≠ unset.** `VITE_API_URL=` (empty) is a *different* case from unset: Vite exposes
   empty process-env `VITE_*` vars, so `import.meta.env.VITE_API_URL ?? DEFAULT` keeps `""` →
   `BASE_URL=""` (same-origin) → the guard correctly does NOT fire. The real footgun requires
   `VITE_API_URL` genuinely absent. The guard keys on `Boolean(import.meta.env.VITE_API_URL)`, so
   empty-string is treated as "unset" for the operator-owns clause but yields a same-origin BASE_URL
   → honest either way. (This bit the first probe run; the fix was `env -u VITE_API_URL npx vite`.)
2. **Module-load init is test-safe here.** No unit test imports `demo/@/lib/palette/api` (grep-zero
   in `test/`), so `initApiEnvironment(BASE_URL)` as a `client.ts` module-load side effect fires only
   in the real browser (dev + e2e), never in vitest. The `typeof window === "undefined"` guard
   covers any node-context import defensively.
3. **`dev:web-only` cold-checkout gotcha (pre-existing, not introduced).** Bare vite will not boot on
   a fresh checkout with no `dist/value.js`, because glass-ui's published dist imports
   `@mkbabb/value.js` (aliased to this repo's own `dist/value.js` in `vite.config.ts`). `scripts/dev.sh`
   handles this via `start_self_watch_build` (a one-shot build if dist is missing); bare
   `dev:web-only` does not. This is the same reason the honest entrypoint is the full script. Worth a
   docs note or a `predev:web-only` build guard (see amendments).
4. **The latch guard is honest by construction.** Because `assertApiAttemptAllowed` throws before any
   fetch in the misconfig state, `markApiUnreachable` is never reached on that path — but its
   `misconfigured`-preserving guard is cheap, honest defense against any future call path that skips
   the assert. Kept minimal (only the mislabel-preventing guard).

---

## §Risks retired

- **S-11 root risk RETIRED**: bare web-only dev no longer silently targets prod. The precondition is
  detected up front and surfaced as a distinct, loud, actionable `misconfigured` state; no doomed
  cross-origin fetch is issued; palette reads throw a distinct `DevMisconfigError`, never the
  mislabeling `ApiUnavailableError`. Proven LIVE.
- **False-positive risk RETIRED**: the guard is inert in production and on the honest full-stack
  path (truth table proven LIVE across 6 cases).
- **Automation-breakage risk RETIRED**: playwright's `webServer` uses `npx vite --port 8090`
  directly and CI never invokes `npm run dev`, so delegating `dev` → `scripts/dev.sh up` does not
  break the e2e/CI surface (verified by grep).
- **Circular-import risk RETIRED**: `availability.ts` imports nothing from `client.ts`;
  `initApiEnvironment(baseUrl)` takes the base URL as a parameter, preserving the existing
  `client → availability` dependency direction.

---

## §Spec amendments suggested

W0-1 as written is buildable exactly as specified. Two optional refinements the wave author may fold in:

1. **(minor) UI surface visibility.** `ApiOfflineChip` mounts only inside `CurrentPaletteEditor`
   under `v-if="savedColorStrings.length > 0"`, so the misconfig chip is not guaranteed visible at
   first paint. The console error is unconditional and load-bearing; if the wave wants the misconfig
   state *always* visible, add a dev-only App-level banner bound to `apiAvailability === "misconfigured"`.
   Suggested clause add to W0-1: "…surface the `misconfigured` state in an always-mounted dev banner
   (not only the save-conditional `ApiOfflineChip`)." (The seed proves the state + the distinct chip
   register; the mount site is a design choice.)
2. **(minor) `dev:web-only` cold boot.** Consider a `"predev:web-only": "test -f dist/value.js || npm run build"`
   guard (mirrors the existing `"prepare"` idiom) so the named escape hatch boots on a cold checkout
   without the operator hitting the glass-ui-self-alias `UNLOADABLE_DEPENDENCY` error. Optional — the
   honest entrypoint (`dev` → `dev.sh`) already handles this.

Otherwise: **none**.

---

## §Replay

From the mainline repo root (`/Users/mkbabb/Programming/value.js`, branch `tranche-q`):

```bash
git apply docs/tranches/S/audit/seeds/w0-dev-backend.patch
```

**Expected result:** 7 files patched (package.json, availability.ts, client.ts, index.ts,
ApiOfflineChip.vue, CLAUDE.md, demo/CLAUDE.md). Then:

- `npm run typecheck` → exit 0.
- `npm run lint` → exit 0.
- **Fail-explicit half (LIVE, no backend needed):**
  ```bash
  npm run build                      # populate dist/value.js (glass-ui self-alias)
  env -u VITE_API_URL npx vite --port 9100 --strictPort
  ```
  Load `http://localhost:9100/` in a browser → the console shows the loud
  `[value.js] … MISCONFIGURED …` error; `apiAvailability` is `"misconfigured"`; palette reads throw
  `DevMisconfigError`; NO request is issued to `api.color.babb.dev`.
- **Full-stack half (requires docker + mongo + `npm ci --prefix api`):**
  ```bash
  npm run dev                        # → scripts/dev.sh up
  ```
  Boots local api (:3000) + mongo rs0 + `VITE_API_URL=http://localhost:3000` +
  `ALLOWED_ORIGINS=http://localhost:9000`; palettes round-trip; the guard stays inert
  (`VITE_API_URL` set). Not runnable in the seed env (docker down, mongosh + api deps absent).

**Reverse:** `git apply -R docs/tranches/S/audit/seeds/w0-dev-backend.patch`.
