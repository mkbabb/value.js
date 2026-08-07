claude-opus-5[1m]

# CHALLENGE — `UserSlugBar.vue` · axis **L (LIBRARY)**

**Target** `fourier-analysis/web/src/components/visualization/gallery/UserSlugBar.vue` (168 LOC, `wc -l` verified — matches census row `formation/fourier/lane-frontend.md:108`)
**Posture** component assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier and is discharged only if the falsifier fails.
**Method** static + source-derived only. No browser tooling. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Repos read (read-only)** `fourier-analysis/` (web + api), `@mkbabb/glass-ui@4.0.0` dist in `web/node_modules`.

## 0 · Import closure actually read

| File | Why in closure |
|---|---|
| `web/src/components/visualization/gallery/UserSlugBar.vue` | target |
| `web/src/stores/auth.ts` (143) | `:6` |
| `web/src/composables/useToast.ts` (38) | `:7` |
| `web/src/composables/useSafeStorage.ts` (27) | transitive via auth store |
| `web/src/lib/api.ts` (21 182 B) | transitive via auth store |
| `web/src/lib/api-problem.ts` (61) | transitive via `api.ts:85` |
| `node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts` | `:5` contract |
| `node_modules/@mkbabb/glass-ui/dist/useViewportReady-CvBcCYDf.js:29-91` | `:5` implementation |
| `node_modules/@mkbabb/glass-ui/dist/button.js` → `button-BNDWhAZb.js` | `:4` |
| `node_modules/@mkbabb/glass-ui/dist/toast.js` → `Toaster-Bm_HQSpc.js` | via `useToast.ts:1-5` |
| `web/src/components/layout/AppHeader.vue` | sole consumer (`:7`, `:140`) |
| `api/routers/sessions.py`, `api/main.py`, `api/dependencies.py`, `api/services/rate_limiter.py`, `api/config.py` | the error/expiry/budget contracts the two `catch` arms consume |

Counts used below: **17 defects · 1 BLOCKER · 4 superlatives · 7 cleared claims.**

---

## 1 · BLOCKER

### L-1 — `isLoggedIn` is a localStorage-presence check, not a session-validity check; this component is the sole renderer *and* sole repair path for the resulting lie · **BLOCKER**

**Claim.** `UserSlugBar.vue:85` (`v-if="isLoggedIn"`) is the only place in the app that renders authenticated identity, and the predicate behind it cannot distinguish "logged in" from "holds a 30-day-expired token in localStorage."

**Provenance chain, each link verified:**
1. `stores/auth.ts:14` — `const userSlug = ref(safeGetItem(localStorage, USER_SLUG_KEY))`. Restored, never validated.
2. `stores/auth.ts:21` — `const isLoggedIn = computed(() => !!userSlug.value)`. Presence, not validity.
3. `api/config.py:40` — `session_ttl_days: int = 30`.
4. `api/dependencies.py:214,219` — session lookup is `{"_id": token, "expires_at": {"$gt": now}}`; miss ⇒ `HTTPException(401, "Invalid or expired session")`.
5. `web/src/lib/api.ts:477-479` — `getMe()` (`GET /api/sessions/me`), the exact endpoint that would validate, **exists and has zero call sites**: `grep -rn "getMe" web/src/` returns only its own definition and body.
6. `grep -rn "401" --include=*.ts --include=*.vue web/src/` → **zero hits**. There is no interceptor, no `coreFetch` 401 arm, no store handler. `api.ts:180-183` throws `ApiProblem` for every non-2xx and the callers only `toast` it.
7. `stores/auth.ts:76` — `ensureUser()` short-circuits on the stale value: `if (userSlug.value) return userSlug.value`. The one function whose contract is "guarantee a usable identity" is defeated by the unvalidated string, so `stores/gallery.ts:241` (`await auth.ensureUser()`) hands a dead slug to the publish path forever.
8. `grep -rn "logout" --include=*.ts --include=*.vue web/src/` → the only user-reachable call is **`UserSlugBar.vue:63`**.

**Failure trace.** User returns after >30 days. Header shows the pill (`:84-112`) with their abbreviated slug and a working Copy button — the UI asserts an authenticated session. Every authed write 401s. `ensureUser()` never re-registers. Nothing self-heals. The single escape is the Log-out button at `:108` → `handleLogout` → `logout()` → `deleteSession()` 401s → swallowed by `auth.ts:61-65`'s empty catch → local state cleared. The user must guess that "log out" is the fix for "my saves fail."

**Falsifier (run, failed to save the claim).** *If any of these held, L-1 dies:* (a) a 401 interceptor clearing auth — killed by link 6, zero `401` occurrences in `web/src` TS/Vue; (b) `getMe()` called on boot or on the component — killed by link 5, zero call sites; (c) `ensureUser()` revalidating — killed by link 7, `auth.ts:76` early-returns; (d) an `App.vue`/router guard revalidating — killed by (b) plus `grep -rn "ensureSession\|ensureUser" web/src/` returning only `gallery.ts:241` and the definitions. All four fail. Claim stands.

**Why BLOCKER and not MAJOR.** The defect is not a degraded message; it is a state machine with no edge back to truth. The component owns the predicate's only render and the only repair, and the repair is not discoverable from the symptom. `UNPROVEN-NEEDS-LIVE` sub-part: the precise 401 body/toast text a user sees, and whether Mongo TTL-evicts the session doc before `expires_at` filtering matters — both need a live 30-day-old token. The *unreachability of revalidation* is fully static and is the blocking half.

---

## 2 · MAJOR

### L-2 — `copy()`'s `CopyResult` is discarded; the composable's central contract ("REPORTED, never silently swallowed") is defeated at the call site · **MAJOR**

`UserSlugBar.vue:23` `const { copied, copy } = useClipboard({ resetMs: 1500 })` — **no `onCopyError`**.
`UserSlugBar.vue:67-70` `function copySlug() { if (!userSlug.value) return; copy(userSlug.value); }` — the returned `Promise<CopyResult>` is dropped on the floor.

The contract the component chose to depend on is explicit (`dist/composables/dom/useClipboard.d.ts`):
- `CopyFailureReason = "clipboard-api" | "exec-command" | "no-api"` with a docblock naming each channel;
- `onCopyError?: (reason) => void` — *"Surfaces the failure instead of swallowing it."*;
- `copy(): Promise<CopyResult>` — *"Resolves `{ ok }` on success or `{ ok: false, reason }` naming the channel that failed — the failure is **REPORTED, never silently swallowed**."*

Implementation confirms both channels can fail without throwing (`useViewportReady-CvBcCYDf.js:30-71`): `navigator.clipboard.writeText` absent or rejecting ⇒ `{ok:false,reason:"clipboard-api"|"no-api"}`, then the `execCommand` fallback ⇒ `{ok:false,reason:"exec-command"}`, and `u()` at `:62-71` *returns* the failure rather than throwing.

**Failure trace.** Non-secure origin / permissions-denied clipboard (the `clipboard-api` arm) + `execCommand("copy")` returning false: `copied` never flips ⇒ the `<Transition>` at `:98-101` never swaps `Copy`→`Check`, and no toast fires. The user sees a button that does nothing. This is precisely the case where the slug — the user's **only** credential (§L-6) — silently fails to reach the clipboard.

**Aggravating.** `toast` is already in scope at `:13`. The one-line sink (`useClipboard({ resetMs: 1500, onCopyError: r => toast(\`Copy failed (${r})\`, "error") })`) was available and unused.

**Class, not isolate.** The twin migration made the identical omission: `web/src/composables/useMorphConfig.ts:73-75` `function copyToClipboard() { copy(toJSON()); }`, same `P.W5 Lane B.2` provenance comment (`:55-57` there, `:19-22` here). Both sites of the wave dropped the affordance the wave was performed to gain.

**Falsifier (failed).** *If `copy()` could reject, this would be an unhandled-rejection finding instead* — it cannot: `u()` at `:62-71` and `s()` at `:83-88` catch every arm. *If the component surfaced failure elsewhere* — it does not; `copySlug` is the whole handler and `copied` is its only observable. *If glass-ui logged the failure itself* — `:68` is `t?.(i)`, i.e. it calls the caller-supplied hook and nothing else; with no hook, nothing is emitted. Claim stands.

### L-3 — the `<input>` Enter path has no in-flight guard; the second Enter aborts the first request through the shared `abortable()` registry and raises a spurious error toast · **MAJOR**

`UserSlugBar.vue:72-78`
```ts
function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") handleLogin();
```
`handleLogin` (`:33-46`) guards only `canSubmit` (`:34`); it sets `loggingIn.value = true` at `:35` but **never reads it**. The `<input>` at `:129-136` has no `:disabled`. The *button* is correctly guarded (`:142 :disabled="!canSubmit || loggingIn"`) — the keyboard path is not.

`slugInput` is cleared only at `:39`, *after* the await, so `canSubmit` is still true while the first request is in flight. Two Enters ⇒ two `login()` ⇒ two `loginWithSlug()` (`api.ts:470-475`) ⇒ two `apiFetch` with the same `abortKey`.

`api.ts:52-59` is the load-bearing link:
```ts
const inflight = new Map<string, AbortController>();
function abortable(key: string): AbortSignal {
    inflight.get(key)?.abort();      // ← the second call kills the first
```
`api.ts:161` `const signal = options?.signal ?? abortable(abortKey)`.

**Failure trace.** Enter, Enter. Call #2 aborts call #1. Call #1's `fetch` rejects `AbortError` ⇒ `handleLogin`'s catch at `:41-43` ⇒ `toast(e.message ?? "Login failed", "error")` ⇒ a red **"signal is aborted without reason"** / `"The user aborted a request."` toast. Call #1's `finally` at `:44-45` sets `loggingIn = false`, re-enabling both buttons *while call #2 is still in flight*. Call #2 succeeds ⇒ a green "Logged in!" toast. Net: the user sees an error and a success for one intent, and the form is interactive mid-request.

**Compounds with L-11.** `api/services/rate_limiter.py:163` `login_limiter = SlidingWindowLimiter(max_requests=5, window_seconds=60)`; `:190-191` routes `/api/sessions/login` to it. Each Enter spends budget, so a double-fire halves the user's already-tight 5-per-minute allowance on a form whose input is a five-word hyphenated phrase.

**Falsifier (partly failed, partly held — reported honestly).** *If the input were disabled during flight* — it is not (`:129-136` has no `:disabled`). *If `handleLogin` early-returned on `loggingIn`* — it does not (`:34` tests `canSubmit` only). *If the catch filtered aborts* — it does not (see L-4). Core claim stands. **`UNPROVEN-NEEDS-LIVE`:** whether the aborted request had already reached the server (and therefore consumed a rate-limit token) is a network race not decidable from source; the double-fire and the spurious toast are not.

### L-4 — `isAbortError` is the repo's established posture at 12 sites and is absent from both of this component's catches · **MAJOR**

`api.ts:69-71` exports `isAbortError(e)` with the docblock *"Check if an error is an abort (not a real failure)."* Every other network catch in the app consults it:

`stores/gallery.ts:78, 99, 174, 185` · `stores/workspace.ts:128, 183, 226, 255, 277, 302, 331` · `components/equation/EquationView.vue:122, 143` · `components/visualization/EquationPanel.vue:53` — all of the shape `if (!api.isAbortError(e)) toast(...)`.

`UserSlugBar.vue:41-43` and `:55-57` do not. The component never imports it (`:1-8` has no `@/lib/api` import at all).

**Failure trace.** Any abort reaching these two handlers — L-3's self-abort, an `abortInflight()` sweep (`api.ts:61-66`), or a cross-component `createSession` collision (§L-3 note below) — is presented to the user as an authentication error. The posture the repo wrote and applied twelve times is the falsifier for "this is fine."

**Cross-component collision (same defect, second vector).** `handleGenerate` (`:48-60`) → `auth.register()` → `createSession()` → `abortKey "createSession"` (`api.ts:464-468`). `stores/gallery.ts:241` `await auth.ensureUser()` → `register()` → the **same key**. A Dices click during a gallery publish aborts one of the two. `UNPROVEN-NEEDS-LIVE` for the timing window; the shared key is static fact (`api.ts:52-59, 464-468`).

**Falsifier (failed).** *If aborts were impossible on these paths* — killed by `api.ts:161`, which routes every `apiFetch` through the shared registry by default; `options.signal` is never passed by `createSession`/`loginWithSlug`/`deleteSession` (`api.ts:464-485`). Claim stands.

### L-5 — `ApiProblem.detail` — the only actionable half of the server's error — is dropped; `??` cannot rescue the empty `title` it is paired with · **MAJOR**

`UserSlugBar.vue:42` `toast(e.message ?? "Login failed", "error")` and `:56` `toast(e.message ?? "Generation failed", "error")`.

Trace what `e.message` actually holds:
1. `api.ts:180-183` — every non-2xx ⇒ `throw await ApiProblem.from(res)`.
2. `api-problem.ts:36-47` — `from()` destructures the JSON body; `title` falls back to **`response.statusText`** when the body has no `title` key (`:41`); `detail` is taken from `body.detail` (`:43`).
3. `api-problem.ts:27` — `super(title)`. **`.message === title === statusText`.** `detail` is a separate readonly field (`:23`) and is never read by this component.
4. `api/main.py:114-122` — the *only* registered exception handler is a generic 500 logger. There is **no** `problem+json` handler, so FastAPI's default applies.
5. `api/routers/sessions.py:76-77` — a wrong slug is `HTTPException(status_code=404, detail="User not found")` ⇒ body `{"detail": "User not found"}`, `content-type: application/json`.

**Failure trace (HTTP/1.1 — `nginx/fourier.conf:20` `listen 80`).** `title = statusText = "Not Found"`; `detail = "User not found"` is discarded. The user who mistyped a five-word slug is told **"Not Found"**. The server's actionable string exists, is parsed, is stored on the thrown object, and is thrown away one line from the toast.

Same for `sessions.py:66-68` (`400 "Slug required"` ⇒ toast reads "Bad Request") and for a 429 (⇒ "Too Many Requests", with `RateLimit-Reset` — emitted at `rate_limiter.py:207-210` and already parsed by `readRateLimitResetSeconds`, `api-problem.ts:56-61` — never surfaced).

**Wrong-operator sub-claim (static, independent of transport).** `??` falls back only on `null`/`undefined`. `ApiProblem.title` is typed `string` and is assigned `response.statusText`, which is `""` for HTTP/2 responses per the Fetch spec (no reason phrase on the wire) and `""` for any 204/empty-status path. `"" ?? "Login failed"` evaluates to `""` ⇒ an **Error toast with a blank description**. `||` would have been correct; `??` cannot be. The operator choice is a defect on its face.
`UNPROVEN-NEEDS-LIVE`: whether the production edge terminates h2 to the browser (`nginx/fourier.conf` listens on 80 behind an unseen terminator) — i.e. whether the blank-toast escalation is live or latent. The `detail`-dropping half is live on every transport.

**Falsifier (failed).** *If the API emitted `problem+json` with a useful `title`* — killed by link 4, no such handler exists. *If `e.message` carried `detail`* — killed by link 3, `super(title)`. *If the repo narrowed to `ApiProblem` anywhere and read `detail`* — `grep -rn "instanceof ApiProblem" web/src/` returns **only the docblock at `api-problem.ts:15`**; zero runtime uses repo-wide. Claim stands, and is systemic (see L-8).

### L-6 — the generate path mints a credential and never shows it; `useToast`'s purpose-built `{ slug }` option is used elsewhere and not here · **MAJOR**

`UserSlugBar.vue:48-60` `handleGenerate()` → `register()` (`auth.ts:43-50`) → `POST /api/sessions` (`sessions.py:35-53`) creates a **brand-new user** whose `_id` is a generated slug, persisted to localStorage, and reports success as `:54` `toast("Logged in!", "success")` — the identical string the *login* path emits at `:40`. The freshly minted slug appears nowhere in that message.

After the branch flips, the full slug is reachable only through:
- `:90` the **abbreviated** span (`j-n-o-r-c` — `abbreviatedSlug`, `:28-31`), and only at `sm:` and up (`hidden sm:inline`);
- `:87` `:title="userSlug ?? ''"` — a hover tooltip, i.e. **nothing on touch**;
- `:96` the Copy button, whose failure is silent (§L-2).

So on a phone, a user who clicks Dices receives an account whose identifier is never displayed, in a UI that says only "Logged in!". Clearing site data ⇒ the account and everything published under it is unrecoverable — `sessions.py:56-81` login requires knowing the slug.

**The affordance exists and is used.** `composables/useToast.ts:21-22`:
```ts
function addToast(message, type = "info", options?: { duration?: number; slug?: string }) {
    const description = options?.slug ? `${message} (${options.slug})` : message;
```
and it is exercised at `stores/gallery.ts:230` and `:258` — `toast("Published!", "success", { slug })`. The one call site in the codebase that *creates* a slug is the one that omits it. `register()` even returns it (`auth.ts:49 return res.user_slug`) and `handleGenerate` discards the return value at `:51`.

**Falsifier (failed).** *If the slug were surfaced elsewhere on generate* — the only post-generate render is the pill at `:84-112`, and its full form is `title`-only. *If `{ slug }` were vestigial* — killed by the two live gallery call sites. *If the toast were the wrong channel* — killed by precedent: the repo already publishes an identifier through exactly this option. Claim stands. (Shares a boundary with the DESIGN axis; the library-side fact is the unused typed option at an author-intended call site.)

---

## 3 · MINOR

### L-7 — `handleLogin` / `handleGenerate` are the same function twice · **MINOR**
`:33-46` and `:48-60`: identical `loggingIn = true` → `await X` → `showLogin = false` → `slugInput = ""` → `toast("Logged in!", "success")` → `catch → toast(msg, "error")` → `finally loggingIn = false`. Seven of nine statements are byte-identical; the deltas are the awaited call and one fallback string. Every fix in this challenge (in-flight guard L-3, `isAbortError` L-4, `detail` L-5) must therefore be written twice or it will be applied once. **Falsifier (failed):** *if the bodies diverged materially* — they do not; diff the two blocks. *If a shared `runAuth(fn, failMsg)` would lose the `canSubmit` guard* — that guard is one line and belongs to the login arm only; it survives extraction.

### L-8 — `catch (e: any)` deliberately defeats `strict`'s `useUnknownInCatchVariables`, and there is no lint gate behind it · **MINOR (systemic)**
`:41` and `:55`. `web/tsconfig.json` sets `"strict": true`, which since TS 4.4 implies `useUnknownInCatchVariables: true` — the annotation is an explicit opt-out that is what permits the unchecked `e.message` of L-5. The repo authored `ApiProblem` specifically for the alternative (`api-problem.ts:14-15`: *"callers can `try { … } catch (e) { if (e instanceof ApiProblem) { … } }`"*) and then never used it — 0 runtime `instanceof ApiProblem`, ≥20 `catch (e: any)` sites (`stores/workspace.ts` ×10, `stores/gallery.ts` ×9, `GalleryView.vue:195`, here ×2). **Nothing enforces it:** `web/package.json` scripts are `dev/build/preview/test:e2e/test:e2e:ui` — **no `lint`** — and there is no eslint/biome/oxlint config or devDependency in `web/` or at the repo root. `vue-tsc -b` is the sole static gate and `: any` is invisible to it. **Falsifier (failed):** *if a lint gate flagged it* — none exists, verified by the two checks above. Scored MINOR because it is a repo-wide idiom this component merely joins, not an origination.

### L-9 — `useClipboard` imported from the root barrel while `Button` in the same block uses a subpath, and a `/dom` subpath for exactly this symbol exists · **MINOR**
`:4` `from "@mkbabb/glass-ui/button"` (95 B re-export) vs `:5` `from "@mkbabb/glass-ui"` (`dist/glass-ui.js`, 33 527 B, 60 static imports). The package publishes **80 export keys**, among them **`./dom`** → `dist/dom.js` (585 B) which re-exports `useClipboard` by name. The narrower specifier was available and matched the file's own convention one line above; repo-wide the subpath form dominates (35× `/button`, 7× `/slider`, 7× `/metric-badge`, … vs 6 root-barrel imports total — census `lane-frontend.md:349-350` records this exact pair).
**Falsifier — partly succeeds, reported honestly.** `package.json` declares `"sideEffects": ["*.css"]`, so Rollup **can** tree-shake the barrel in `vite build`; the production-bundle-weight version of this claim is **dead**. What survives: the dev module graph (Vite pre-bundles and transforms the 60-import barrel), and the intra-file inconsistency. Hence MINOR, not MAJOR. Twin: `composables/useMorphConfig.ts:9` does the same.

### L-10 — a dead subsystem inside the directly-imported auth store, carrying a latent identity-mixing hazard · **MINOR**
`grep -rn` across `web/src` excluding `stores/auth.ts`: **`ensureSession` → 0 hits. `clearSession` → 0 hits. `userToken` → 0 hits. `sessionToken` → 0 hits** (the four `api.ts` hits are its own module-local variable). Dead surface in a 143-line store: `:9` `SESSION_TOKEN_KEY`, `:17` the `sessionToken` ref, `:29-31` the bootstrap `else if` arm, `:102-110` `ensureSession`, `:112-119` `clearSession`, plus `:126` / `:140-141` on the public return — ~25 lines, ~17 % of the store, reachable from this component's `auth` handle (`:10`) and from nothing else.

**Latent hazard the dead code hides.** `logout()` (`:60-71`) clears `userSlug`/`userToken` and calls `setSessionToken(null)` but does **not** call `clearSession()`. The bootstrap at `:27-31` is `if (userToken) … else if (sessionToken) setSessionToken(sessionToken)`. So the instant `ensureSession()` gets wired, "log out → reload" silently re-attaches the app to a *different* (anonymous) identity and attributes subsequent writes to it. Today unreachable — `sessionToken` is only ever written by the dead `ensureSession`. **Falsifier (holds against the live claim, fails against the dead-code claim):** *if `ensureSession` had a call site*, this would be MAJOR data-attribution; it has none, so it is dead code with a booby trap. Both halves reported.

### L-11 — the component opts into a silent, unbounded-feeling 429 auto-retry on a 5-per-minute budget, with no feedback and no cancel · **MINOR**
`api.ts:162` `const retryOn429 = options?.retryOn429 ?? true` — default **on**; `:172-178` sleeps `min(RateLimit-Reset, 30)` seconds and retries, `MAX_RATE_LIMIT_RETRIES = 2` (`:112-113`). `login` is budgeted at **5 requests / 60 s** (`rate_limiter.py:163`, routed at `:190-191`); the reset header is real (`rate_limiter.py:207-210`).
**Failure trace.** Sixth login attempt inside a minute (trivially reached: a five-word slug retyped, doubled by L-3's unguarded Enter) ⇒ `handleLogin` awaits up to **60 s** with `loggingIn` true, both buttons disabled, no spinner, no "retrying", no cancel — then most likely still 429 ⇒ a toast reading "Too Many Requests" with no reset time (L-5). `abortInflight` (`api.ts:61-66`) exists and is never wired to an Escape/cancel here; `:74-77` Escape only closes the form and does not abort.
**Falsifier (failed):** *if the component passed `retryOn429: false` or a signal* — `auth.ts:52-58` → `api.ts:470-475` pass neither. `UNPROVEN-NEEDS-LIVE`: the exact stall duration (depends on the server's emitted reset).

### L-12 — `useToast` is not a composable, returns a dead handle, and accepts an option it drops · **MINOR**
`composables/useToast.ts:31-38`: `useToast()` calls `glassUseToast()` solely to obtain `dismiss` and re-export it; `addToast` (`:21-29`) is a module-level function with no reactive or lifecycle state. **`dismiss` has zero consumers repo-wide** — `grep -rn "dismiss" web/src/` returns only its own `:32`/`:36` plus unrelated identifiers (`dismissDropdown`, `dismissVisualizationFlags`, a comment). So `UserSlugBar.vue:13`'s `const { toast } = useToast()` pays a `glassUseToast()` invocation, and setup-scope semantics, for a value it discards, wrapping a function that could be a plain import.
Second half: `:21` declares `options?: { duration?: number; slug?: string }` and `:24-28` forwards **only** `title`/`description`/`variant`. **`duration` is accepted and silently dropped** — a lying signature; zero call sites pass it (grep for a third argument yields only `gallery.ts:230,258`, both `{ slug }`).
**Falsifier (failed):** *if `glassUseToast()` supplied required context* — `dist/toast.js` re-exports `toast` and `useToast` off a module singleton chunk; `addToast` calls the module-level `glassToast` directly at `:24` and never touches the composable's return.

### L-13 — colocation: filed under `visualization/gallery/`, consumed only by `layout/AppHeader.vue`, whose sibling of identical role lives in `layout/` · **MINOR**
`grep -rn "UserSlugBar" web/src/` → exactly two hits, both in `AppHeader.vue` (`:7` import, `:140` render). The component performs no visualization and no gallery work: it renders identity in the app chrome. `AppHeader.vue:6-7` is the indictment in adjacent lines — `import DarkModeToggle from "./DarkModeToggle.vue"` beside `import UserSlugBar from "@/components/visualization/gallery/UserSlugBar.vue"` — and `:140-141` renders them side by side in the same `ml-auto` cluster. `web/src/components/layout/` contains exactly two files (`AppHeader.vue`, `DarkModeToggle.vue`); this is the third.
**Falsifier (failed):** *if it were also used from a gallery view* — zero other consumers. *If it read gallery state* — its script imports `@/stores/auth` only (`:6`); `useGalleryStore` appears in `AppHeader.vue`, not here. Census `lane-frontend.md:108` files it under the gallery block, inheriting the tree's misplacement rather than contradicting it.

---

## 4 · INFO

### L-14 — `abbreviatedSlug` is typed `string` but can contain element-level `undefined` · **INFO**
`:28-31` `userSlug.value.split("-").map((w) => w[0]).join("-")`. `web/tsconfig.json` sets `strict: true` but **not** `noUncheckedIndexedAccess`, so `w[0]` types as `string` while an empty segment (`"a--b"`, leading/trailing `-`) yields `undefined`. `Array.prototype.join` coerces `undefined` to `""`, so no crash — the type is simply a lie. **Falsifier — succeeds against reachability:** slug shape is server-controlled (`api/slugs.py` `generate_slug`, echoed at `sessions.py:53,81`, lowercased/trimmed at `:64`), so an empty segment is not producible through the API today. Filed INFO for the type-truth record only, not as a live bug.

### L-15 — glass-ui `Button` forwards `type: undefined`; the rendered `<button>` defaults to `type="submit"` · **INFO (latent)**
`dist/button-BNDWhAZb.js`: props declare `type: {}` with **no default**, `as: { default: "button" }`, and setup binds `{ type: u.type, disabled: u.disabled }`. None of the five `<Button>` uses here (`:91, :103, :116, :137, :147`) passes `type`, so each renders a bare `<button>` — HTML default `submit`. **Falsifier — succeeds today:** `grep -n "<form"` over `UserSlugBar.vue`, `AppHeader.vue` and `App.vue` returns nothing, so there is no ancestor form and no implicit submission. Latent: becomes live the moment `:128-157` is wrapped in a `<form>` (which is also the correct fix for L-3's keyboard path — the two interact).

### L-16 — R5-7 class disposition: the **loop** member is vacuous here; the **native-element** superclass has a live member · **INFO**
Intake `lane-fourier-r3-r6.md:125` (R5-7, adjudicated **TRUE**, `ADOPT-AS-FACT` + `CARRY → F.W4`) establishes that instance/loop evidence keyed to *component callsites* is blind to native HTML element loops (`PaperSidebar.vue` `<li v-for>` at 65/87/105 deriving an empty `instance.loop.paper-sidebar` leaf).
**Applied honestly to this component:** `grep -nE "v-for" UserSlugBar.vue` → **zero**. The loop member of R5-7 is **vacuous**, and any derivation reporting a loop leaf for this file is reporting noise.
**But the superclass is live.** R5-7's root cause is *native element, not component callsite*. This component's only text-entry surface — and the exact locus of L-3 — is a **native `<input>`** at `:129-136` carrying `v-model` (`:130`) and `@keydown` (`:135`). Under the same callsite-keyed model, it registers nowhere, while the six `lucide-vue-next` icons and five `<Button>`s do. A per-component D/L/C denominator built that way will count this file's decorative components and miss its only stateful control. Adjacent intake row **R3-10** (six live dynamic-`:is` families, `lane-fourier-r3-r6.md:84`) is likewise vacuous here: `grep -n ":is=" UserSlugBar.vue` → 0.
**Falsifier (failed for the superclass):** *if the `<input>` were a glass-ui `Input` component* — it is not; `:5` imports no input and `dist/Input-DVG_J0ne.js` is unreferenced by this file. Filed INFO as an evidence-model caveat for F.W4, not as a component defect.

### L-17 — the component does not touch the viz render path; the census rows are cited to close the question, not to open one · **INFO**
CENSUS-2026-08-03 `:85-86`: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock…)"*, aggregate 2 079 LOC incl. `canvas-drawing/` (`:96`, `:101`; per-file LOC at `lane-frontend.md` canvas rows). Measured against this file: `grep -nE "canvas|getContext|requestAnimationFrame|WebGL|addEventListener|setTimeout|setInterval|onMounted|onUnmounted"` over `UserSlugBar.vue` returns **one** hit — `:20`, the word `setTimeout` inside the migration comment. **Zero code contact.** It renders inside `<header class="app-header sticky …">` (`AppHeader.vue:54`, closing `:144`), in the `ml-auto` cluster at `:136-142` — a sibling of the route view, not an overlay on any canvas.
Remaining coupling is one hop and speculative: `toast` (`:40, 42, 54, 56, 64`) mounts glass-ui `Toaster` overlays that composite over a rAF-driven canvas — `UNPROVEN-NEEDS-LIVE` (needs a trace against the store rAF clock; not claimed).

---

## 5 · Superlatives (L-18, both directions)

### S-1 — zero owned teardown surface, achieved by *deleting* a timer rather than adding one · **superlative**
The component owns no listener, timer, observer, or rAF: the grep in L-17 returns only a comment. The single timer in its dependency closure is `useClipboard`'s reset, and glass-ui clears it correctly — `useViewportReady-CvBcCYDf.js:76-91`: `clearTimer` nulls the handle, `s()` clears before re-arming, and `n(o)` registers it on `onScopeDispose` (import alias confirmed at `:1`, `onScopeDispose as n`). `:19-22` records that this replaced a hand-rolled `ref + setTimeout` — the wave removed lifecycle surface instead of accreting it. **Falsifier for the superlative (must also survive):** *if `onScopeDispose` were called outside an active scope it would no-op and leak* — this component calls `useClipboard` at top-level setup (`:23`), where a scope is guaranteed; contrast `useTokenColor` in the same chunk, which defensively guards with `getCurrentScope()` at `:24` — the guard is unnecessary here. Superlative holds.

### S-2 — correct Pinia state/action split · **superlative**
`:11` `const { userSlug, isLoggedIn } = storeToRefs(auth)` for state and derived; `:12` `const { login, logout, register } = auth` for actions. The near-universal defect — destructuring state directly off the store and silently losing reactivity — is absent, and it matters: `isLoggedIn` drives the top-level `v-if` at `:85`, so a lost ref would freeze the entire component in one branch. Actions are closure-bound in a setup store (`auth.ts:11`, `defineStore(id, setup)`), so plain destructuring is correct and `storeToRefs` on them would be wrong. **Falsifier (failed):** grep for a bare `const { userSlug } = auth` anywhere in the file — none.

### S-3 — animation discipline: named properties, canonical token, no `transition: all` · **superlative**
`:162-167` — `transition: opacity 0.15s var(--ease-standard), transform 0.15s var(--ease-standard)` on the enter/leave-active classes, with the `A.W3.d` provenance stated. `grep -n "transition: all" UserSlugBar.vue` → 0. The transition is also correctly `mode="out-in"` on a single-element swap (`:98-101`), which is the only mode that does not double-render the icon slot.

### S-4 — right-sized: keep whole, do not split · **superlative (and a standing refusal)**
168 LOC over one cohesive concern. In its own directory cluster it sits low-middle — 529 (`AdminUserList`) / 309 / 285 / 261 / 223 / 190 / **168** / 134 / 108 / 107 / 91 / 54 (`lane-frontend.md:102-113`). **Falsifier run in the *other* direction (a split proposal must survive too, and does not):** the two template branches share `slugInput`, `showLogin`, `loggingIn` and one store handle; extracting a `<SlugLoginForm>` would convert three local refs into props+emits and buy nothing, violating the standing KISS/no-contrivance posture. The correct decomposition here is L-7's *function*-level extraction, not a component split.

---

## 6 · Claims raised and killed (falsifiers that ran the other way)

| # | Candidate | Killed by |
|---|---|---|
| C-1 | `handleLogout` (`:62-65`) lacks try/catch ⇒ unhandled rejection | `auth.ts:60-71`: `deleteSession()` is inside a try/catch, `safeRemoveItem` is total (`useSafeStorage.ts:21-27`), `setSessionToken` is a plain assignment. `logout()` cannot reject. **Not a defect.** |
| C-2 | Floating `handleLogin()` at `:73` ⇒ unhandled rejection | `:36-45` wraps every await in try/catch/finally; the function never rejects. The real defect there is the missing in-flight guard (L-3), not the floating call. **Downgraded, not dropped.** |
| C-3 | `useClipboard` leaks its reset timer | `useViewportReady-CvBcCYDf.js:76-91` clears on re-arm and on `onScopeDispose`. **Not a defect** — promoted to S-1. |
| C-4 | The post-success resets at `:38-39` / `:53` are dead writes (the branch unmounts anyway) | `showLogin`/`slugInput` are setup refs living for the component's lifetime, not the branch's; without the resets the form would reopen pre-filled after logout. **Load-bearing. Not a defect.** |
| C-5 | Root-barrel import bloats the production bundle | `sideEffects: ["*.css"]` ⇒ Rollup tree-shakes it. The bundle-weight claim is **dead**; only the dev graph + intra-file inconsistency survive (L-9, MINOR). |
| C-6 | `abbreviatedSlug` can emit a malformed label | `join` coerces `undefined` to `""`, and slug shape is server-controlled. **Type-truth only** (L-14, INFO). |
| C-7 | `catch (e: any)` is this component's origination | ≥20 sibling sites across `stores/workspace.ts`, `stores/gallery.ts`, `GalleryView.vue`. **Systemic, not local** (L-8, MINOR). |

---

## 7 · Ledger

| id | severity | anchor | one line |
|---|---|---|---|
| L-1 | **BLOCKER** | `:85` / `auth.ts:14,21,76` | authenticated UI keyed to unvalidated localStorage; `getMe` dead, zero 401 handling, no edge back to truth |
| L-2 | MAJOR | `:23,67-70` | `CopyResult` discarded, `onCopyError` unset — the composable's stated contract inverted |
| L-3 | MAJOR | `:72-78,129-136` | Enter path unguarded ⇒ self-abort via shared `abortable()` ⇒ spurious error toast + budget burn |
| L-4 | MAJOR | `:41-43,55-57` | `isAbortError` (12 sibling sites) absent from both catches |
| L-5 | MAJOR | `:42,56` | `ApiProblem.detail` dropped; `??` cannot rescue an empty `title` |
| L-6 | MAJOR | `:48-60` | new identity minted and never displayed; `useToast`'s `{ slug }` unused at its author-intended site |
| L-7 | MINOR | `:33-46,48-60` | two near-identical handlers ⇒ every fix must be written twice |
| L-8 | MINOR | `:41,55` | `catch (e: any)` defeats strict catch narrowing; no lint gate exists |
| L-9 | MINOR | `:4-5` | root barrel vs the published `/dom` subpath, contradicting the adjacent line |
| L-10 | MINOR | `auth.ts:9,17,29-31,102-119` | dead session subsystem (~17 % of the store) hiding a latent identity-mixing bootstrap |
| L-11 | MINOR | `api.ts:162,172-178` | silent ≤60 s 429 retry on a 5/60 s budget, no feedback, no cancel |
| L-12 | MINOR | `useToast.ts:21,31-38` | dead `dismiss`, dropped `duration`, a "composable" with no state |
| L-13 | MINOR | `AppHeader.vue:6-7,140-141` | filed under `visualization/gallery/`, belongs beside `DarkModeToggle` in `layout/` |
| L-14 | INFO | `:28-31` | `string` type over a possibly-`undefined` element; unreachable today |
| L-15 | INFO | `:91,103,116,137,147` | `Button` renders implicit `type="submit"`; latent, no form ancestor |
| L-16 | INFO | `:129-136` | R5-7 loop member vacuous (0 `v-for`); native-element superclass live on the `<input>` |
| L-17 | INFO | `:20` | zero contact with the Canvas2D render path (CENSUS `:85-86`); question closed |
| S-1..S-4 | superlative | `:19-23,11-12,162-167` | zero teardown surface · correct Pinia split · token-named transition · right-sized, keep whole |

**Verdict.** The component is DEFECTIVE on the LIBRARY axis and the defect is not distributed evenly: its *craft* is good (S-1..S-4 are real and survive their own falsifiers) and its *contracts with everything it imports* are not. Six of the seven top findings are the same shape — a dependency published a typed affordance (`CopyResult`/`onCopyError`, `isAbortError`, `ApiProblem.detail`, `getMe`, `toast({slug})`, `retryOn429`) and this call site declined it. That is the repair theme, and L-7 is why the repair must be structural rather than pointwise.
