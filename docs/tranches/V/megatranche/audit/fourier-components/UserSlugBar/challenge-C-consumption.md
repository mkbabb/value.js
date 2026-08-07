claude-opus-5[1m]

# CHALLENGE — `UserSlugBar.vue` · axis C (CONSUMPTION)

**Subject** `fourier-analysis/web/src/components/visualization/gallery/UserSlugBar.vue` (168 lines)
**Axis** how this component consumes value.js (0.13 pinned), keyframes.js (4.3), glass-ui (^4.0.0), the
fourier API (45-op surface), and its props/emits + integration seams.
**Posture** assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and
every falsifier was run. Two claims died on their falsifiers and are recorded as such (m-6, i-3).
**Method** static + source-derived only. No browser. Livable-only arms are marked `UNPROVEN-NEEDS-LIVE`
for SS-13.

**Read whole (read-only):** the component; `web/src/stores/auth.ts`; `web/src/composables/useToast.ts`;
`web/src/composables/useSafeStorage.ts`; `web/src/lib/api.ts`; `web/src/lib/api-problem.ts`;
`web/src/App.vue`; `web/src/components/layout/AppHeader.vue`; `web/src/components/visualization/GalleryView.vue`;
`web/tsconfig.json`; `web/package.json`; glass-ui 4.0.0 `package.json` exports map + `dist/index.d.ts` +
`dist/forms.d.ts` + `dist/dom.d.ts` + `dist/components/ui/button/*` + `dist/components/ui/input/*` +
`dist/composables/dom/useClipboard.d.ts` + the `useClipboard` runtime in `dist/useViewportReady-CvBcCYDf.js`;
`api/routers/sessions.py`; `api/lib/crud/slugs.py`; `api/lib/crud/slug_words.json`; `nginx/fourier.conf`;
`web/e2e/gallery.spec.ts`.

**Hitherto corpus folded:** `formation/fourier/lane-frontend.md:108` (census row: 168 lines / "Slug edit +
`useClipboard`") and `:349-350` (the two glass-ui import lines) · `formation/fourier/CENSUS-2026-08-03.md:343-345`
(the 45/30/13 triple) and `:363` (F.W5 carries) · `intakes/lane-fourier-r3-r6.md` rows **R6-8** (operation↔client
leaf coupling) and **R3-7c** (36 client edges / 9 gaps of 45 ops). Overlaps cited inline. One explicit
contradiction of the census framing is recorded at **i-3**.

**Tally** — 16 defects (2 BLOCKER · 5 MAJOR · 6 MINOR · 3 INFO) · 6 superlatives.

---

## §0 — What this component actually consumes

| Producer | Consumed here | Verdict |
|---|---|---|
| **value.js 0.13** | **nothing** | correct — see i-3 (a claim that died) |
| **keyframes.js 4.3** | **nothing** | correct — the only motion is a 150 ms CSS swap (162-167) |
| **glass-ui ^4.0.0** | `Button` (`/button`, L4) · `useClipboard` (root barrel, L5) · `toast`+`useToast` (via `@/composables/useToast` → `/toast`) · `--ease-standard` (L165) | 3 defects + 3 superlatives |
| **fourier API (45 ops)** | `createSession` · `loginWithSlug` · `deleteSession` — all via `stores/auth` | 3 defects; the sessions arm is the un-migrated error envelope |
| **props / emits** | zero of each | correct by construction (S-5), but see i-1 |

The API leaf is 3 of the 4 session operations. The fourth, `getMe` (`api.ts:477-479` ↔
`api/routers/sessions.py:84-89`), has a client function and **zero call sites repo-wide** — it is one of
**R3-7c**'s nine client-gap operations, and the gap is load-bearing here: `auth.ts:14` rehydrates
`userSlug` from `localStorage` and *never validates it against the server*, so `isLoggedIn` — the single
predicate that drives this component's entire template (L85, L115) — is an unvalidated client assertion.

---

## §1 — BLOCKERS

### B-1 · BLOCKER · "Logged in!" is asserted over a persistence path documented to fail silently, on the one credential the user is never shown

`UserSlugBar.vue:48-60` (`handleGenerate`) → `auth.ts:43-50` (`register`) → `auth.ts:35-41` (`persistUser`)
→ `useSafeStorage.ts:13-19` (`safeSetItem`).

`safeSetItem` is `void`-returning and swallows every throw; its own docblock names the failure modes
("Safari private browsing or quota exceeded", `useSafeStorage.ts:17`; header `:1-4`). `persistUser` sets
the in-memory refs **first** (`auth.ts:36-37`) and then attempts persistence, so `userSlug.value` is
truthy regardless. `handleGenerate` therefore toasts `"Logged in!"` (L54) unconditionally.

The slug is the **sole** credential: `api/routers/sessions.py:56-81` logs in by slug alone — no password,
no email, no recovery. And this component never shows it. L90 renders only `abbreviatedSlug` and is
`hidden sm:inline`; L87 puts the full slug in a `title=` attribute, which does not render on touch.

**Failure scenario.** iOS Safari, Private Browsing, phone width. User taps the dice (L153). `register()`
mints `harsh-leaps-teal-otter`, `safeSetItem` throws and is swallowed, the pill renders `h-l-t-o` — except
that span is `hidden` below `sm`, so the user sees a person icon and two round buttons. Toast: "Logged in!".
User reloads. `safeGetItem` returns `null` (`auth.ts:14`). The account, its drafts, and its published
visualizations are gone, and the user never saw the string that would have recovered them.

**Falsifier (run — survives).** Dies if any of: (a) `safeSetItem` propagated failure — it does not, it is
`void` and catches bare (`useSafeStorage.ts:16-18`); (b) `handleGenerate` surfaced the returned slug —
`register()` is `Promise<string>` (`auth.ts:43`) and `useToast`'s `addToast` already accepts
`options.slug` and renders `` `${message} (${slug})` `` (`useToast.ts:21-22`), and L51 discards both; (c) the
slug were rendered anywhere else on the generate path — grep for `userSlug` across `src/` returns only
`GalleryView.vue:40` (`isLoggedIn` only) and this file. None hold.

**Split.** The "generated slug is never surfaced" arm is **CONFIRMED** statically. The private-browsing arm
is `UNPROVEN-NEEDS-LIVE` (SS-13) — but it is the exact scenario `safeSetItem`'s own comment was written for,
so the component is asserting success across a seam its dependency documents as lossy.

---

### B-2 · BLOCKER · Enter has no in-flight guard, and the per-key AbortController turns the second Enter into a `DOMException` rendered as the user-facing error text

`UserSlugBar.vue:72-73` — `if (e.key === "Enter") handleLogin();`. `handleLogin` (L33-46) guards only
`canSubmit`, never `loggingIn`. The input is not `:disabled` (L129-136); `loggingIn` reaches only the two
Buttons (L142, L151).

`loginWithSlug` passes no `signal` (`api.ts:470-475`), so `coreFetch` falls through to
`abortable("loginWithSlug")` (`api.ts:161`), and `abortable` **aborts any in-flight request under the same
key** (`api.ts:54-59`). The second Enter therefore aborts the first; the first `await login(...)` rejects
with `DOMException{name:"AbortError"}`; L41-42 toasts `e.message` — Chromium's
`"signal is aborted without reason"`.

The repo exports `isAbortError` (`api.ts:69-71`) precisely for this, and **every other async consumer in the
tree uses it**: `stores/gallery.ts:78, 99, 174, 185`; `stores/workspace.ts:128, 183, 226, 255, 277, 302, 331`;
`EquationPanel.vue:53`; `EquationView.vue:122, 143` — **14 guarded call sites across 4 files**. UserSlugBar
is the sole omission: **3 unguarded** await/catch sites (L37/41, L51/55, L63). This is not a judgement call
about house style; it is a house rule with exactly one violation, and this file is it.

The in-flight window is wide by construction, which is what makes the double-Enter likely rather than
theoretical:
- the server sleeps a deliberate constant **0.2 s on every login path** (timing-attack mitigation,
  `sessions.py:67, 74`);
- `coreFetch` retries 429 **inside** the await, sleeping up to `min(RateLimit-Reset, 30) s` twice
  (`api.ts:112-113, 172-178`), i.e. up to ~60 s of transport-internal silence;
- during all of it the UI is inert: no spinner, the `LogIn` icon at L145 never changes, and the input
  stays live.

**Failure scenario.** User types their slug, presses Enter, sees nothing change for ~2 s (login budget
throttled → 429 → `coreFetch` sleeps), presses Enter again. Request #2 aborts request #1. Toast 1:
red "Error — signal is aborted without reason". Request #2 then succeeds. Toast 2: "Success — Logged in!".
The user is logged in *and* was told the operation failed.

**Falsifier (run — survives).** Dies if `apiFetch` passed a per-call `signal` (it does not —
`api.ts:470-475` sets only `method` and `body`), or if `abortable` were keyed per-invocation (it is keyed
by the literal string `"loginWithSlug"`, `api.ts:471`), or if `handleLogin` were re-entrancy-safe (L33-35
returns only on `!canSubmit`). None hold. **CONFIRMED.**

**Second head, same defect.** `handleGenerate` (L48) calls `register()` under abort key `"createSession"`
(`api.ts:464-468`). `stores/gallery.ts:241` reaches the same operation via `auth.ensureUser()`, which has a
single-flight guard (`auth.ts:73-82, _ensurePromise`) — **that UserSlugBar bypasses** by calling `register()`
directly (L51). `ensureUser` only fires when `!userSlug` and the dice button only renders when
`!isLoggedIn` (`auth.ts:21` — the same predicate), so the two paths are *exactly co-resident*: an anonymous
user who triggers a gallery save and then taps the dice races two `createSession` calls under one abort key,
and whichever loses is rendered as an error.

---

## §2 — MAJOR

### M-1 · MAJOR · `e.message` throws away the only actionable text the sessions API sends, because sessions is the un-migrated error arm

`UserSlugBar.vue:41-42` and `:55-56` render `e.message`. For an `ApiProblem`, `message` **is `title`** —
`super(title)` at `api-problem.ts:27`.

`api/routers/sessions.py` is the arm that **never migrated to the RFC 9457 envelope**. It raises bare
FastAPI `HTTPException(status_code=404, detail="User not found")` (`:77`) and
`HTTPException(status_code=400, detail="Slug required")` (`:68`) — contrast `routers/visualizations.py:16`
and `routers/admin.py:15`, which both document "every non-2xx response is an RFC 9457
`application/problem+json` body" built from `api/lib/crud/errors.py`. FastAPI's default serialisation is
`application/json` `{"detail": "..."}` with **no `title` member**.

`ApiProblem.from` then walks its fallbacks (`api-problem.ts:38-46`): `title` is absent → `title =
response.statusText` (`:41`); `detail` is present → `detail = "User not found"` (`:43`). So the actionable
string lands in `.detail` and the component renders `.message`. Repo-wide, **no call site ever reads
`.detail` off an `ApiProblem`** — the only `.detail` hit in `src/` is `flag.detail` at
`AdminFlaggedPanel.vue:192`, an unrelated moderation field.

**Failure scenario (CONFIRMED arm).** User mistypes their slug. Server: 404 `{"detail":"User not found"}`.
Toast: **"Not Found"**. The user cannot tell "you typed it wrong" from "the server is down".

**Failure scenario (UNPROVEN-NEEDS-LIVE arm, SS-13).** Per the Fetch spec, `Response.statusText` is the
empty string over HTTP/2 (h2 carries no reason phrase). `nginx/fourier.conf:20` is `listen 80` behind the
host-Apache TLS terminator described at `:3-8`, so the browser-facing hop is plausibly h2. Then
`title = ""` → `ApiProblem.message === ""` → and `e.message ?? "Login failed"` (L42) **does not fire the
fallback**, because `??` guards only `null`/`undefined`, not `""`. Result: a red "Error" toast with an empty
body. Needs one live response header to settle; the `??`-vs-`""` hole itself is CONFIRMED at L42 and L56.

**Falsifier (run — survives the CONFIRMED arm).** Dies if sessions emitted problem+json with a populated
`title`. Read `sessions.py` whole: no `errors.*` import, no `ProblemDetails`, no custom handler for this
router (`main.py:114` handles only unhandled `Exception`). Does not hold.

**Corpus.** This is the **R6-8** lesson landing on the sessions leaf: `client:loginWithSlug` and
`operation:POST:/api/sessions/login` are non-isolable — the defect is authored on the client (`e.message`)
but is only *visible* because of a server-side envelope gap. R6-8's carry to F.W5 ("operation identity must
stay independent of client identity") should be read to include: **the client's error-rendering grain must be
specified against the envelope, not against `Error.message`.**

### M-2 · MAJOR · glass-ui's `Input` is exported and unused; the credential field is a bare `<input>` with a hand-rolled 190-char re-derivation of glass-ui's own recipe

`UserSlugBar.vue:129-136` is a raw `<input>` carrying
`w-44 rounded-md border border-foreground/12 bg-card px-2 py-1 text-sm text-foreground outline-none fira-code transition-[border-color] duration-150 focus:border-foreground/30 placeholder:text-muted-foreground/40`
— a from-scratch restatement of the border / surface / focus / placeholder recipe the design system owns,
in a file that imports `Button` from that same design system two lines earlier (L4).

`Input` **is** reachable from the pinned 4.0.0: `package.json` exports `./forms` →
`dist/forms.d.ts` → `export * from "./components/ui/input"` → `export { default as Input } from './Input.vue'`.
Its prop surface (`dist/components/ui/input/Input.vue.d.ts`) is exactly what this field needs and does not
have: `modelValue`, `type`, `placeholder`, `disabled`, `required`, **`autocomplete`**, **`pattern`**,
`inputmode`, `readonly`. The same `./forms` subpath also exports **`useUserInvalidAria`** — the primitive
for the login-failure state this component never expresses.

Concretely missing on a credential field: no `autocomplete` (password managers and browser autofill cannot
assist on the only credential the user has), no `pattern` (see M-4), no `aria-invalid` on failure.

**Falsifier (run — survives, with a scope correction).** Dies if `Input` were unreachable from 4.0.0 — it
is reachable (verified above). Note that `Input` is **not** in the root barrel (`dist/index.d.ts` lists
`./components/ui/*` for 36 families and omits `input`, `textarea`, `combobox`), so a developer reaching for
it from the root specifier would find nothing — that is a real discoverability trap and it partly explains
the miss. **Scope correction (honest):** this is repo-wide, not a UserSlugBar invention — 13 components use
bare `<input>` (`PaperSearchInput`, `BasisSelector`, `PaperSearchModal`, `ImageUpload`, `VisualizationView`,
`AdminAuditLog`, `AdminUserList`, `GallerySearchBar`, `UserSlugBar`, `SliderControl`, `FunctionInput`,
`HarmonicLevelGrid`, `MorphPhaseConfig`) and **zero** import glass-ui `Input`. UserSlugBar is where the
missing props cost the most, because its field is the credential.

### M-3 · MAJOR · `register()`'s return value is discarded, and the two toasts are indistinguishable

`register(): Promise<string>` returns the newly minted slug (`auth.ts:43-50`). `UserSlugBar.vue:51` calls
`await register();` and drops it. The toast at L54 is `"Logged in!"` — **byte-identical to the login-path
toast at L40**.

So the two most semantically different outcomes in the component — "you re-entered your existing account"
and "an account you have never seen has just been created and its name is your only credential" — are
reported with the same eight characters.

The affordance to fix it exists on **both** sides and is used on neither: `useToast`'s `addToast` accepts
`options.slug` and renders `` `${message} (${slug})` `` (`useToast.ts:21-22`), and `register()` returns the
value that would fill it.

**Falsifier (run — survives).** Dies if the slug were surfaced elsewhere on the generate path. It is not:
L90's abbreviation is `hidden` below `sm` and is lossy anyway (m-1); L87's `title` is hover-only.
**CONFIRMED.** Compounds B-1 directly.

**Seam note.** That same `addToast` signature also accepts `options.duration` (`useToast.ts:21`) and
**silently drops it** — it never reaches `glassToast` (`:24-28`). A dead parameter on the seam this
component sits on.

### M-4 · MAJOR · `CopyResult` is discarded on the one control that is the mobile-only path to the credential

`UserSlugBar.vue:67-70` — `copy(userSlug.value);`. No `await`, no `.then`, no `onCopyError`.

glass-ui's contract is unusually explicit that this is wrong. `dist/composables/dom/useClipboard.d.ts`
defines `CopyFailureReason = "clipboard-api" | "exec-command" | "no-api"`, `CopyResult { ok, reason? }`, and
`UseClipboardOptions.onCopyError`, with the docblocks *"Surfaces the failure instead of swallowing it"* and
*"the failure is REPORTED, never silently swallowed."* The consumer swallows it.

The runtime confirms there is no other channel: `useClipboard` (`dist/useViewportReady-CvBcCYDf.js`,
`function f`) sets `copied` **only** on `ok`, and `copy` never rejects — it resolves `{ok:false, reason}`.
So on failure the Check icon never appears (L99), nothing is logged, nothing is toasted. Silence.

**Failure scenario.** Non-secure origin, or a locked-down WebView, or a browser that gates
`navigator.clipboard` behind transient activation the `Transition`-wrapped click does not satisfy →
`clipboard-api` fails → the `execCommand` fallback fails under a `<textarea>` CSP → `reason:"exec-command"`.
User taps Copy on their only credential; the icon does not change; they assume they mis-tapped and try
again. Per B-1 this button is the *only* way to read the full slug on a phone.

**Falsifier (run — survives).** Dies if `copy()` rejected — an unhandled rejection would at least reach the
console. It does not reject (runtime read above). **CONFIRMED.**
**Scope correction (honest):** repo-wide — `EquationResult.vue:31` and `useMorphConfig.ts:58` discard it too.
Three of three `useClipboard` sites. But those two copy a LaTeX string and a JSON config; this one copies a
bearer credential with no recovery path, so it is the site where the swallow is not survivable.

### M-5 · MAJOR · No client-side slug-shape validation, on a rate-limited credential path

`canSubmit` (L25) is `slugInput.value.trim().length > 0`. Typing `x` and pressing Enter is a valid
submission.

The shape contract is published, pure, and trivially mirrorable: `SLUG_PATTERN = ^[a-z]+(-[a-z]+){3}$`
(`api/lib/crud/slugs.py:15`) with a pure predicate `validate_slug` (`:46-48`). The client already mirrors
contract types wholesale (`api.ts:26-38`, "one source of truth"), so mirroring a regex is in-idiom.

Every malformed submission costs: a network round trip; a deliberate **0.2 s** server sleep on all paths
(`sessions.py:67, 74`); a token against the nginx `api_general` budget (30 r/s, burst 50 —
`nginx/fourier.conf:16, 47`); and a token against the app-level login budget (`sessions.py:59`). The
`<input>` carries no `pattern` and no `aria-invalid`, so neither the browser's own constraint validation nor
assistive technology ever learns the shape.

**Failure scenario.** A user who half-remembers their slug tries `harsh-otter`, `harsh-teal-otter`,
`harsh leaps teal otter`, `Harsh-Leaps-Teal-Otter` … Each is a guaranteed 404 that the client could have
rejected for free, and the burst pushes them into the login budget — locking them out of the **only** path
to their account.

**Falsifier (run — survives, one arm dies).** The case arm **dies**: `sessions.py:64` does
`(body.get("slug") or "").strip().lower()`, so iOS auto-capitalisation of the field (no `autocapitalize`
attribute — see M-2) is harmless. Recorded as a killed sub-claim. The shape arm survives: `.strip().lower()`
does not repair word count, spaces, or digits, and the server has no fuzzy match.

---

## §3 — MINOR

### m-1 · MINOR · the abbreviation is ~1,066× lossy as an identity

`UserSlugBar.vue:28-31` renders `slug.split("-").map(w => w[0]).join("-")`. Slug space, from
`api/lib/crud/slug_words.json` (128 words each in `adjective`/`verb`/`color`/`animal`, enforced ≥64 and
unique at `slugs.py:29-34`): **128⁴ = 268,435,456**. Abbreviation space, counting distinct initials per list
(23 × 19 × 24 × 24): **251,712**. Mean collision class ≈ **1,066 users per rendered identity**.

That would be fine for a decorative badge. It is not decorative: it is the *only* logged-in identity
affordance, and it is `hidden` below `sm` (L90) while the full slug is hover-only (L87).

**Falsifier (run — survives).** Dies if the full slug were visible anywhere at rest. It is not.

### m-2 · MINOR · the docstring's worked example is unreachable under the server contract

`UserSlugBar.vue:27` — `/** Abbreviate "jasper-newt-of-rampant-courage" → "j-n-o-r-c" */` — a **five**-word
slug. `generate_slug()` mints exactly four (`adjective-verb-color-animal`, `slugs.py:22, 40-42`) and
`SLUG_PATTERN` (`:15`) forbids five. The documented example cannot occur.

**Falsifier (partly survives).** Dies for the *legacy* arm if pre-contract 5-word slugs exist in
`db.users` — `sessions.py:56-81` never re-validates shape on login, so such a row *could* survive. That arm
is `UNPROVEN-NEEDS-LIVE`. The doc↔contract mismatch itself is CONFIRMED from the tree.

### m-3 · MINOR · three of five icon-only controls name themselves with `title` alone, two with `aria-label`, inside sixty lines

`title` only: L95 "Copy slug", L107 "Log out", L152 "Generate new slug".
`aria-label`: L121 "Log in", L141 "Submit slug and log in".

**Falsifier (run — fires, hence MINOR not MAJOR).** `title` *is* a valid accessible-name source (accname
§5.2 step I), so axe's `button-name` rule passes and the repo's `@axe-core/playwright` gate would not catch
this. The residual defect is real but narrower: `title` is not announced by VoiceOver/TalkBack on touch,
which is exactly where these three controls live — and per B-1 the Copy button is the mobile-only path to
the credential. The inconsistency inside one file is the reviewable part.

### m-4 · MINOR · Escape tears down the form without aborting the in-flight login

`UserSlugBar.vue:74-77` clears `showLogin` and `slugInput` but does not cancel. `abortInflight(keys)` is
exported for exactly this (`api.ts:61-66`) and is the house cancel pattern (`workspace.ts:90, 140, 202, 270`).

**Failure scenario.** User presses Enter, changes their mind, presses Escape. The form vanishes. ~2 s later
either a success toast fires and they are silently logged in as someone they decided not to be, or an error
toast fires for a form that no longer exists.

**Falsifier (run — survives).** Dies if silent completion were intended — nothing states that, and the
`slugInput = ""` reset at L76 shows discard intent.

### m-5 · MINOR · `text-green-500` is a raw palette literal in a token-themed app

`UserSlugBar.vue:99`. The app otherwise routes accent colour through glass-ui's `--viz-*` bridge
(`EditorControlsDock.vue:199-208`, `EquationView.vue:421-422`, `CanvasControlsDock.vue:128-129`), and
`style.css:114-124` shows the repo actively rebaselining those tokens for contrast. A raw `green-500` does
not participate in that bridge and does not respond to the dark-mode `MutationObserver` re-resolution
installed at `App.vue:10-18`.

**Falsifier (run — fires partly, hence MINOR).** Repo-wide house pattern, not a UserSlugBar invention:
`EquationResult.vue:46`, `AdminFlaggedPanel.vue:211`, `AdminUserList.vue:401`. Cite as a fleet-level token
carry, not a component indictment.

### m-6 · MINOR · root barrel specifier for `useClipboard` beside a deep subpath for `Button`, in the same file — **and the bundle-cost claim dies**

`UserSlugBar.vue:4` imports `Button` from `@mkbabb/glass-ui/button` (`dist/button.js`, 95 B).
`UserSlugBar.vue:5` imports `useClipboard` from the bare root `@mkbabb/glass-ui` (`dist/glass-ui.js`,
33,527 B of re-export hub, statically importing ~40 chunks). The narrow home exists:
`package.json` exports `./dom` → `dist/dom.js` (585 B) which re-exports `useClipboard` explicitly.

`lane-frontend.md:335-355` shows deep subpaths are the house convention (`/button`, `/badge`, `/select`,
`/dialog`, `/metric-badge`, `/infinite-scroll`, `/toast`) with only **four** root-specifier sites in the
whole app — `GalleryCard.vue:5`, `UserSlugBar.vue:5`, `useMorphConfig.ts:9`, `router/index.ts:2`.

**Falsifier (run — FIRES; the claim is downgraded).** I wanted to call this a production bundle blowup. It
is not: glass-ui declares `"sideEffects": ["*.css"]`, so the JS graph is Rollup-tree-shakeable and the
barrel collapses in a production build. What survives is (a) the convention break, (b) the dev-server cost —
Vite does not tree-shake in dev, so the whole barrel enters the module graph on every cold start, and (c) the
in-file inconsistency, which is the reviewable defect. **Recorded as MINOR, downgraded from MAJOR by its own
falsifier.**

---

## §4 — INFO

### i-1 · INFO · zero props, zero emits, zero unit tests, and e2e that asserts only visibility

The component takes nothing and emits nothing. That is *correct* here (S-5), but the consequence is that it
can only be exercised through the real Pinia store and the real `@/lib/api` module — there is no seam to
inject a fake at. There are no unit tests for it in the tree, and the only e2e coverage
(`e2e/gallery.spec.ts:71-81`) asserts that the input and the dice button *become visible* after clicking
"Log in". It never logs in, never logs out, never copies, never exercises an error path. Every defect in
§1–§2 is outside the test net.

### i-2 · INFO · the bearer credential is written into a `title` attribute on a globally-mounted element

`UserSlugBar.vue:87` puts the full slug into `title=` on the pill. `AppHeader.vue:140` mounts UserSlugBar,
and `App.vue:25` mounts AppHeader outside `<RouterView>` — so the credential string is in the DOM on every
route, for the whole session. With no password and no second factor (`sessions.py:56-81`), that string *is*
the account. Recorded as INFO, not MAJOR, because the session token already sits in `localStorage`
(`auth.ts:15`) and is the higher-value target; the `title` adds surface without adding the worst case.

### i-3 · INFO · **zero value.js and zero keyframes.js consumption — and this is correct** (a claim that died)

I opened this axis expecting the F.W2 migration surface to bite here. It does not, and I record the negative
explicitly because the census framing invites the opposite assumption.

- **value.js:** not imported. The repo's entire value.js surface is `easeInOutSine` and `timingFunctions`
  (`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `equation/lib/harmonics.ts:5`, `lib/easings.ts:9-16`)
  — four files, none of them a UI-chrome component. Nothing in UserSlugBar animates a numeric or colour
  value; the only motion is a 150 ms opacity/scale swap in scoped CSS (L162-167).
- **keyframes.js:** not imported. Correct for the same reason — the two consumers are
  `useFourierMorph.ts:14` and `stores/animation.ts:47`.
- **Consequence for the pin.** The `^0.13.0 → ^2.0.0` peer-floor question relayed on `cd26c65` is **inert for
  this component**: it consumes neither library, so it neither blocks nor is blocked by the F.W2 migration.
  Do not book it into the F.W2 surface.
- **Bare-specifier note.** The bare-specifier defect on this component is a *glass-ui* one (m-6), not a
  value.js one. The two should not be conflated when the F.W2 surface is enumerated.

**Falsifier (run — the "value.js consumption is defective" hypothesis DIES).** I grepped `@mkbabb/value.js`
and `@mkbabb/keyframes` across all of `web/src` and read every hit. Neither reaches this component or any of
its five imports. The correct verdict is absence-as-correctness.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · the Pinia consumption is exactly right
`UserSlugBar.vue:11-12` splits `storeToRefs(auth)` for the reactive state (`userSlug`, `isLoggedIn`) from a
plain destructure for the actions (`login`, `logout`, `register`). That is the precise idiom — actions are
plain functions and survive destructuring; refs do not, and `storeToRefs` is the only thing that preserves
them. This is the single most commonly botched Pinia line in a Vue codebase and it is correct here.
*Falsifier:* would die if `userSlug` were destructured directly (reactivity loss) or if the actions were
pulled through `storeToRefs` (they would arrive as refs). Neither.

### S-2 · the `useClipboard` migration is a genuine improvement with its provenance written down
`UserSlugBar.vue:19-23` documents the P.W5 Lane B.2 migration from `navigator.clipboard.writeText` + a
hand-rolled `copied` ref + `setTimeout` to the glass-ui composable, and preserves the 1.5 s reset from HEAD.
The migration is not cosmetic: the runtime (`dist/useViewportReady-CvBcCYDf.js`, `function f`) registers
`onScopeDispose(clearTimer)`, so the component gained timer-teardown-on-unmount for free — a leak the
hand-rolled version had. The comment records *what was replaced and why the constant survived*, which is
exactly what a later auditor needs.
*Falsifier:* would die if the composable leaked its timer. It does not — the dispose registration is in the
compiled output.

### S-3 · the cross-repo motion token actually resolves — verified, not assumed
`UserSlugBar.vue:163-167` uses named transition properties (`opacity`, `transform`) rather than
`transition: all`, and reaches for `var(--ease-standard)`. I traced it: `style.css:3` imports
`@mkbabb/glass-ui/styles` → `dist/styles/index.css` → the token is defined at
`dist/styles/theme/bridges.css:325` and `dist/styles/tokens/scheme-motion.css:216` as
`--ease-standard: var(--motion-ease-standard)`. This is aspirational-token consumption done right: the
component reaches across a repo boundary for a design token and the token is genuinely there under the
pinned 4.0.0.
*Falsifier:* would die if the token were undefined — the transition would silently fall back to `ease` with
no error. Ran it; it resolves.

### S-4 · the toast seam is closed end-to-end
`useToast.ts:1-5` adapts glass-ui's toast to a local three-value vocabulary (`error`/`info`/`success`) with
explicit `VARIANT_MAP`/`TITLE_MAP` tables rather than leaking `ToastVariant` into 20 call sites, and
`App.vue:29` mounts `<Toaster />` at the root. A very common failure mode is calling `toast()` with no
renderer mounted — silence at runtime, green in CI. Not the case here.
*Falsifier:* would die if `<Toaster />` were absent or scoped inside a route component. It is at App root,
outside `<RouterView>`.

### S-5 · the zero-emits design is load-bearing-correct — and it kills the obvious complaint
The easy finding to write is "a component that mutates global auth state and emits nothing has no contract."
I went looking and it dies: `GalleryView.vue:101-108` watches `isLoggedIn` and handles **both** directions —
clears `workspace.drafts` and switches off the drafts tab on logout, calls `workspace.refreshDrafts()` on
login. Coordination is store-mediated by design, and an emit here would be a second, weaker channel for the
same fact. The residual staleness window is also closed: `GalleryView.vue:83-89`'s `onMounted` calls
`refreshDrafts()`, and `App.vue:21-31` has no `<keep-alive>`, so a route round-trip always remounts and
refetches.
*Falsifier:* ran it — the naive complaint dies on `GalleryView.vue:101`. Recorded so the next auditor does
not re-file it.

### S-6 · `handleLogout`'s missing try/catch is correct by construction, not an oversight
`UserSlugBar.vue:62-65` awaits `logout()` with no error handling — which reads like a bug next to the two
guarded handlers above it. It is not: `auth.ts:60-71` is total. It wraps the only throwing call
(`deleteSession()`) in its own `try/catch` with the comment "Session may already be expired", and then
clears local state unconditionally on every path. There is nothing to catch, and adding a catch would
suggest a failure mode that cannot occur.
*Falsifier:* would die if `safeRemoveItem` or `setSessionToken` could throw. `safeRemoveItem` catches bare
(`useSafeStorage.ts:21-27`); `setSessionToken` is a module-scope assignment (`api.ts:44-46`). Neither throws.

---

## §6 — Carries

| # | Carry | Target |
|---|---|---|
| C-1 | B-1 + M-3: the generate path must surface the minted slug and must not assert persistence it cannot observe. Minimum: render `register()`'s return through `addToast`'s existing `options.slug`, and make `safeSetItem` report failure so `persistUser` can. | F.W4 (component) + F.W5 (store/storage seam) |
| C-2 | B-2: add the `isAbortError` guard (12th consumer) **and** an in-flight guard on the Enter path; the abort-key collision between `UserSlugBar.register()` and `auth.ensureUser()` is a store-level bug — route the component through `ensureUser`'s single-flight. | F.W4 + F.W5 |
| C-3 | M-1: the sessions router is the un-migrated problem+json arm. Either migrate `sessions.py` to `lib/crud/errors.py`, or teach every consumer to prefer `.detail` over `.message`. Folds into **R6-8**'s F.W5 carry — the co-signed contract must specify the *client's error-rendering grain*, not just operation identity. Also fix `?? ` → `||` (or an explicit empty check) at L42 and L56. | F.W5 |
| C-4 | M-2: glass-ui's `Input`/`useUserInvalidAria` are exported only at `./forms`, not the root barrel — 13 fourier components hand-roll inputs and 0 adopt it. This is a **producer discoverability gap** and is relay-worthy to the glass-ui BH inbox per the standing relay law. | F.W4 + glass-ui BH relay |
| C-5 | M-4: three of three `useClipboard` consumers discard `CopyResult`. glass-ui went to real trouble to make the failure nameable and nobody reads it — worth a one-line note in the glass-ui adoption guide as well as the three fixes. | F.W4 + glass-ui BH relay |
| C-6 | i-3 (negative carry): **do not** book UserSlugBar into the F.W2 value.js migration surface. It imports neither value.js nor keyframes.js; the bare-specifier defect here is glass-ui's (m-6). | F.W2 |
| C-7 | §0: `getMe` is one of **R3-7c**'s nine client-gap operations, and the gap is load-bearing — `isLoggedIn` is an unvalidated `localStorage` assertion (`auth.ts:14, 21`) that drives this component's whole template. Wire `getMe` into the auth bootstrap or accept the stale-session state explicitly. | F.W5 |
| C-8 | i-1: the component has no unit tests and `e2e/gallery.spec.ts:71-81` asserts visibility only. Every §1–§2 defect is outside the net. | F.W4 |
