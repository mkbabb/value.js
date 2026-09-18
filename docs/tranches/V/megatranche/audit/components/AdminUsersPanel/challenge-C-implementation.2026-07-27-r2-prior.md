# CHALLENGE-C — AdminUsersPanel.vue · the implementation is defective

## Model receipt

I observe myself to be **Opus 5**, model ID `claude-opus-5[1m]` — the tier this seat was explicitly
spawned with. Not inherited, not undeclared.

**Subject** `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines) · **Area** palettes ·
**Route** `#/admin/users` · **Date** 2026-07-27 · **Tree HEAD** `7cae8bd0` (the parent named
`c654824e`; `7cae8bd0` is the harvest-banking commit that landed on top of it — the subject file is
byte-identical between the two, `git diff c654824e..HEAD -- demo/palettes/browser/admin/AdminUsersPanel.vue`
is empty).

**This is a re-deploy after the wall interrupt.** The first C seat's report is preserved verbatim at
`challenge-C-implementation.2026-07-27-prior.md` (C-1 … C-14). Nothing in it is retracted; §3 below
records what I independently re-verified. **This document adds eight rows the first seat did not
test — C-15 … C-22 — every one of them reproduced in BOTH chromium and webkit.**

---

## 1 · Method (and the environment finding the first seat paid for)

The first seat could not render a single user row on `:9000` and stood up a second dev server. That
is avoidable, and recording the cheaper route matters for every seat that follows.

`demo/platform/transport/client.ts:36-43`:

```ts
const DEFAULT_REMOTE_API_URL = "https://api.color.babb.dev";
export const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;
initApiEnvironment(BASE_URL);
```

`detectDevMisconfig` (`availability.ts:112-116`) trips the latch on *loopback page + unset
`VITE_API_URL` + cross-origin BASE_URL*. Rewriting the **module source** in flight removes the third
leg, so `:9000` renders fully with no second server:

```js
await page.route(/transport\/client\.ts/, async (r) => {
    const res = await r.fetch();
    let t = await res.text();
    t = t.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
    await r.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body: t });
});
```

(The technique is the D seat's, in `probe-D2d-prune-failure.mjs`; it is faster and more faithful than
a parallel server, because it exercises the same served bundle the visual REPORT captured.)

Probes written by this seat, all re-runnable, all two-engine:

| probe | covers |
|---|---|
| `probe-C2-implementation.mjs` / `.json` | C-15 · C-16 · C-17 · C-18 · C-19 · C-20 |
| `probe-C2b-controls.mjs` / `.json` | the **controls** — single-click, prune double-fire, re-expand |
| `probe-C2c-window.mjs` / `.json` | the measured double-fire window + witness frames |

Frames under `frames-C2/`. Playwright chromium + webkit bundled with `@playwright/test ^1.60.0`,
viewport 1440×900. No finding below depends on macOS Full Keyboard Access, so **MT-F022 absorbs none
of them**.

---

## 2 · Verdict

**DEFECTIVE.** Carrying the prior seat's two BLOCKERs and adding one more, plus five MAJORs, one
MINOR and one INFO of my own.

New rows only:

| id | severity | one line |
|---|---|---|
| **C-15** | **BLOCKER** | the destructive confirm button stays live ~160–290 ms after it fires — one human double-click = **two whole-collection prunes** |
| **C-16** | MAJOR | user search is client-side over a hard-coded 50-row window; the server's `q` param is wired and never sent → an existing user reports **"No users found."** |
| **C-17** | MAJOR | with no admin token the roster renders **"· roster clear · No users found."** and Refresh issues **zero** requests |
| **C-18** | MAJOR | an open disclosure is never invalidated by Refresh — the admin refreshes and keeps reading pre-refresh palettes |
| **C-19** | MAJOR | collapse-mid-flight: a fetch the operator **cancelled** later overwrites a settled, correct disclosure, with no loading state in between |
| **C-20** | MINOR | `aria-label` on `role=generic` loading containers is discarded by both engines; what is announced is `Loading` ×3 |
| **C-21** | MAJOR | a **failed** prune is reported as **"No empty users to prune"** (corroborates the D seat; adds a second path into the same string) |
| **C-22** | INFO | `tier as "standard"\|"featured"\|"archived"` — an unchecked cast on a server-supplied string, twice |

Carried from the prior seat, re-verified at this HEAD: **C-1** (expand race → wrong owner deleted),
**C-2** (filtered count / global destruction), C-3, C-4, C-5, C-6, C-7, C-8, C-9, C-10, C-11, C-12,
C-13, C-14.

**Strongest defect in the component overall: C-1.** Strongest *new* defect: **C-15**.

---

## 3 · What I re-verified from the prior report (independently)

| prior row | how I re-checked it | result |
|---|---|---|
| C-1 (expand race) | **C-19** reaches the same broken end-state by a *different* gesture (expand-A → collapse-A → expand-B). Independent corroboration of the mechanism. | **HOLDS** — and C-19 shows it is worse than filed |
| C-3 (`res.total` discarded, no paging) | `grep -rn 'listUsers(' demo/` → the **only** call site is `useAdminUsers.ts:59` `listUsers(token, 50)`; `admin-users.ts:21-32` declares `offset` and `q` — both dead | **HOLDS**, and C-16 sharpens it |
| C-4 (`catch → return []`) | `useAdminUsers.ts:156-161` unchanged | **HOLDS** |
| C-12 (test truth) | `grep -c 'plugin-vue\|plugins' vitest.config.ts` → **0**; `grep -rn 'from ".*\.vue"' test/ demo/test/ \| wc -l` → **0**; `@vue/test-utils` importers → **0**; `AdminUsers\|prune` in unit tests → **0** | **HOLDS at HEAD** |
| negative proof (tap targets / names) | `REPORT.json` route `/#/admin/users`: `namelessButtons 0`, `imgNoAlt 0`, `overflowX 0`, `consoleErrors []`, `pageErrors []`, `bodyTextLength 273`; the 4 `smallTapTargets` are `Switch to slug` 22×22, `Generate new slug` 22×22, `Cancel` 22×22, `input` 160×23 — **all dock, none in this file** | **HOLDS** |

---

## 4 · C-15 · BLOCKER — the confirm button survives its own click for ~160–290 ms

### The code

`AdminUsersPanel.vue:283-286`:

```ts
function onConfirm() {
    confirmAction.value?.();     // fire
    confirmOpen.value = false;   // then ask the dialog to close
}
```

`confirmOpen.value = false` is synchronous, but DOM removal is a `nextTick` away and the Glass 7
Dialog plays a leave transition first. Nothing disables the button, nothing clears `confirmAction`,
nothing guards re-entry. The button is therefore **still mounted, still hit-testable, still bound to
the same closure** for the length of the exit animation.

### The measurement (`probe-C2c-window.mjs`, both engines)

Click the confirm button once, then poll `document.elementFromPoint(cx, cy)` every ~20 ms:

```
chromium   t=  4ms dialog:true  live:true
           …
           t=249ms dialog:true  live:true
           t=271ms dialog:true  live:true      ← LAST LIVE
           t=294ms dialog:false live:false
  lastLiveAtMs: 271   firstDeadAtMs: 294

webkit     t=  4ms … t=159ms dialog:true live:true   ← LAST LIVE
           t=181ms dialog:false live:false
  lastLiveAtMs: 159   firstDeadAtMs: 181
```

`live` means: the element under the cursor closes to a `<button>` whose text matches `Prune` and
which is not `disabled`.

### The reproduction — two destructions from one gesture

`probe-C2b-controls.mjs`, two real mouse clicks 30 ms apart at the same point:

```json
"K2b_doubleClickPrune": {
  "prunePosts": ["POST /admin/users/prune-empty", "POST /admin/users/prune-empty"],
  "atSecondClick": { "dialogPresent": true,
                     "elementUnderCursor": "button.button",
                     "elementText": "Prune" },
  "beat": "Pruned 2 users"
}
```

Byte-identical in chromium and webkit. The same shape on the per-user delete
(`probe-C2-implementation.json → N2_doubleConfirm`):

```json
"deleteRequests": ["DELETE /admin/users/alpha-keeper-0001",
                   "DELETE /admin/users/alpha-keeper-0001"]
```

### The control (this is what makes it a finding and not a probe artefact)

`probe-C2b-controls.json → K2a_singleClickDeleteUser`, both engines:

```json
{ "deletes": ["DELETE /admin/users/alpha-keeper-0001"] }
```

**One click → exactly one request.** The second request is caused by the second click landing on a
button that should no longer exist.

### Why this is a BLOCKER and not a nuisance

`POST /admin/users/prune-empty` takes no scope (`demo/palettes/api/admin-users.ts:69`) and deletes
every empty user the *server* finds. Firing it twice is not idempotent in effect: between the two
POSTs, other traffic may have emptied further accounts, so the second call destroys a set the
operator never saw, never described and never confirmed. A 30 ms double-click is not exotic — it is
the default behaviour of an impatient click, a trackpad bounce, or an accessibility switch with
repeat enabled, and this is the most destructive control in the application.

The receipt hides it: **`beat: "Pruned 2 users"` — one message for two executions**, because
`onPruneDone` is called twice and the second overwrites the first. It also arms two overlapping 3 s
timers, so C-7's truncation is now reachable from a single gesture.

### Cure (transposition, not a patch)

Do not add `if (busy) return` to `onConfirm` — that leaves the button clickable and merely
swallows the second event, which is a different lie. The confirm control must not be able to
outlive its own activation. Two structural moves, both already idiomatic in this repo:

1. `onConfirm` becomes `async` and the footer button binds `:disabled` to the pending state, so
   the button is *visibly* inert the instant it fires (and stays inert while the action is in
   flight — which the current code cannot express, because `confirmAction` returns `void`).
2. `confirmAction.value = null` on fire, so a late event has nothing to invoke. Store it in a
   `shallowRef` — a closure in a deep `ref` is a Vue-3.5 anti-idiom (edict 7) and this is the
   right moment to fix it.

Because every `showConfirm` caller is in this one file, the whole confirm engine (`:254-286`) is
the natural extraction: it is 33 lines of state machine embedded in a roster panel, and it is
duplicated in spirit across the admin directory. Hoisting it removes a concern from a 391-line SFC
rather than adding to one (edict 1).

---

## 5 · C-16 · MAJOR — search is a 50-row client-side filter, so an existing user reads "No users found."

### The code

- `demo/palettes/api/admin-users.ts:21-32` — `listUsers(token, limit = 20, offset = 0, q?: string)`;
  `q` is forwarded to the server as a query parameter.
- `demo/palettes/useAdminUsers.ts:59` — **the only call site in the tree**:
  ```ts
  const res = await listUsers(token, 50);      // no offset, no q, ever
  ```
  ```
  $ grep -rn 'listUsers(' demo/
  demo/palettes/useAdminUsers.ts:59:            const res = await listUsers(token, 50);
  demo/palettes/api/admin-users.ts:21:export function listUsers(
  ```
- `useAdminUsers.ts:29-34` — the search is a client-side `filter` over `adminUsers.value`, i.e. over
  the 50 rows that happen to be on page one.

### The reproduction (`probe-C2-implementation.mjs → N4_search`, both engines identical)

Server holds **60** users; 10 of them (`zed-offpage-user-000x`) sort outside the first 50. Type
`zed-offpage` into "Search users…":

```json
{ "serverTotal": 60, "serverReturned": 50, "offpageUsers": 10,
  "listRequests": ["GET /admin/users?limit=50&offset=0"],
  "qParamSent": false,
  "requestsAfterTyping": 0,
  "afterSearch": { "rows": 0, "emptyPlate": true, "countLine": "50 users" } }
```

Witness `frames-C2/N4-webkit-search-false-negative.png` (and `-chromium-`). On one screen,
simultaneously:

```
Users [50]                 ← header badge
50 users                   ← toolbar count
· ROSTER CLEAR ·
No users found.            ← ten matching users exist on the server
[Prune empty]  (disabled)  ← three empty users exist on the server
```

`requestsAfterTyping: 0` is the load-bearing number: typing in the search field of an admin console
**issues no query at all**. The server's search capability is dead code the client declined to call.

### Consequence

An admin looking up an account to delete is told the account does not exist. The correct operator
response to "No users found." — conclude the user is already gone — is exactly wrong. And because
`emptyCount` (`:241`) is derived from the same filtered list, the filter simultaneously *disables*
the Prune button while empty users exist (visible in the frame), which is the inverse arm of the
prior seat's C-2.

### Cure

The parameters already exist. Debounce `searchQuery` into `listUsers(token, limit, offset, q)` and
consume `res.total` (prior C-3), mounting the `PaginationBar.vue` that already sits in this
component's own directory unused. No new module, no new dir (edict 3). Deleting the client-side
`filter` at `useAdminUsers.ts:32-34` is part of the cure, not a casualty of it — two search
authorities for one concern is the defect.

---

## 6 · C-17 · MAJOR — no admin token renders "· roster clear · No users found." and a Refresh that does nothing

### The code

`useAdminUsers.ts:54-57`:

```ts
async function loadAdminUsers() {
    const token = getAdminToken();
    if (!token) return;              // ← before loadingUsers, before usersLoadError
    loadingUsers.value = true;
```

The early return never sets `usersLoadError`, never sets `loadingUsers`. Downstream, the panel's
state ladder (`:46` loading → `:51` loadError → `:63` `users.length === 0`) falls through to the
third arm, which is the *success-with-no-data* plate.

### The reproduction (`probe-C2-implementation.json → N5_noToken`, both engines identical)

```json
{ "mainText": "Users 0 Manage accounts and permissions. 0 users Prune empty Refresh
                · ROSTER CLEAR · No users found. …",
  "rows": 0,
  "hasUnreachable": false,
  "hasSignIn": false,
  "refreshDisabled": false,
  "adminRequestsBefore": 10, "adminRequestsAfterRefresh": 10 }
```

`hasSignIn: false` — nothing on the page mentions authentication. `refreshDisabled: false` with
`adminRequestsBefore === adminRequestsAfterRefresh` — the Refresh button is fully enabled and
pressing it issues **zero** requests, forever, with no feedback of any kind. Witness
`frames-C2/N5-{chromium,webkit}-no-token-roster-clear.png`.

This is not an exotic state: it is what **every** unauthenticated visitor to `#/admin/users` sees,
and it is what an authenticated admin sees the moment their token is cleared.

### Cure

Same discriminated union the prior seat prescribed for C-5, with `unauthenticated` as a member. The
guard `if (!token) return` is the bug: a function that can fail three ways
(*no credential* / *request failed* / *succeeded*) must not return `void` for two of them.
`AdminPane.vue` already gates on `pm.isAdminAuthenticated` elsewhere; the panel's own arm should be
a sign-in affordance, not the clear-roster plate.

---

## 7 · C-18 · MAJOR — Refresh does not invalidate the open disclosure

### The code

`toggleUserExpand` (`:352-365`) is the **only** writer of `userPalettes`. Nothing watches the
`users` prop; nothing watches `loading`. So `emit("refresh")` (`:37`) re-fetches the roster and
leaves the expanded row's contents untouched.

### The reproduction (`probe-C2-implementation.json → N3_staleAcrossRefresh`, both engines)

Expand `alpha-keeper-0001` while the server serves generation 1; change the server to generation 2;
press Refresh:

```json
{ "gen1Rendered": true,
  "paletteFetches": ["GET /admin/users/alpha-keeper-0001/palettes"],     ← exactly one, ever
  "afterRefresh": { "stillExpanded": true, "showsGen1": true, "showsGen2": false } }
```

### The control (`probe-C2b-controls.json → K3_reexpandControl`, both engines)

```json
{ "afterFirstExpand": "GEN-1",
  "afterRefresh":     "GEN-1",
  "afterCollapseReexpand": "GEN-2",
  "paletteFetches": ["GET /admin/users/.../palettes", "GET /admin/users/.../palettes"] }
```

Collapsing and re-expanding **does** pull GEN-2. So the server's truth genuinely changed and the
transport is healthy — Refresh simply does not reach the disclosure. This is staleness, not caching.

The admin presses Refresh precisely when they suspect the screen is stale, and the one region they
are actively reading is the one region the button does not touch.

### Cure

Falls out of the prior C-1 cure. Once the disclosure is a keyed resource
(`useAdminUserPalettes(slugRef)`), invalidation is a `watch` on the roster's fetch generation, and
"Refresh" means one thing on the whole pane instead of two things on two halves of it.

---

## 8 · C-19 · MAJOR — a cancelled fetch overwrites a settled, correct disclosure

This is the prior C-1's mechanism reached by a different gesture, with a strictly worse signature.

### The code

`AdminUsersPanel.vue:352-357` — the collapse arm returns early and **does not touch
`loadingUserPalettes`**, and there is no cancellation of the in-flight request it is collapsing:

```ts
if (expandedUserSlug.value === slug) {
    expandedUserSlug.value = null;
    userPalettes.value = [];
    return;                       // in-flight fetch keeps its claim on userPalettes
}
```

### The reproduction (`probe-C2-implementation.json → N6_collapseMidflight`, both engines identical)

alpha's palettes served with a 1500 ms delay, beta's with 40 ms. Expand alpha → wait 250 ms →
**collapse alpha** → wait 100 ms → expand beta:

```json
"midway":  { "openRow": "beta-drifte r-0002 2 Palettes",
             "region":  "BETA-DRIFTER-0002-PALETTE 2 0" },     ← correct
"settled": { "openRow": "beta-drifte r-0002 2 Palettes",
             "region":  "ALPHA-KEEPER-0001-PALETTE 2 0" }      ← alpha's data, in beta's row
```

### Why it is worse than C-1 as filed

1. The operator **explicitly cancelled** alpha — they clicked it closed. The application then honours
   the cancelled request over the current one.
2. beta's disclosure had already **settled correctly** and was showing beta's palette with no
   loading state. ~1.2 s later the content silently mutates under a stable UI. There is no skeleton,
   no flicker, no signal that anything re-rendered — the prior C-1's version at least passed through
   a loading state.
3. `AdminUsersPanel.vue:150` then binds the admin delete on that mis-attributed card to
   `user.slug` — beta — so the prior seat's measured wrong-owner destruction
   (`DELETE /admin/palettes/alpha-p-1` issued from beta's row) is reachable from this gesture too.

### Cure

The same `AbortController`-keyed resource as C-1. Note specifically that a sequence counter alone
would **not** fix this variant cleanly: the collapse arm must also cancel, which a counter placed only
on the fetch path forgets. Making the response for a non-current key unrepresentable is what closes
both triggers at once.

---

## 9 · C-20 · MINOR — the loading containers' `aria-label` is discarded; the roster announces "Loading" three times

### The code

`AdminUsersPanel.vue:46` and `:135`:

```html
<div v-if="loading" class="grid gap-3" aria-label="Loading users">
    <AdminListSkeleton v-for="i in 3" :key="i" />
```
```html
<div v-if="loadingUserPalettes" class="grid gap-2" aria-label="Loading palettes">
    <AdminListSkeleton v-for="i in 2" :key="i" />
```

A `<div>` with no `role` maps to ARIA `generic`. **ARIA 1.2, §5.2.8.4 "Roles which cannot be named"**
lists `generic` among the roles for which `aria-label` is *prohibited*; the accessible name is
discarded.

### The measurement (`probe-C2-implementation.json → N1_loadingAria`, both engines identical)

DOM:

```json
[{ "tag": "div", "role": null, "ariaLabel": "Loading users",
   "childRoles": ["status", "status", "status"] },
 { "tag": "div", "role": "status", "ariaLabel": "Loading", "childRoles": [] },  ×3 ]
```

Accessible tree (Playwright ARIA snapshot, chromium **and** webkit):

```
ariaSnapshotLoadingLines : ["  - status \"Loading\"",
                            "  - status \"Loading\"",
                            "  - status \"Loading\""]
snapshotMentionsLoadingUsers : false
```

The author's name — the only string that would tell a screen-reader user *what* is loading — is
absent from both engines' trees. What is announced instead is `AdminListSkeleton.vue:10-11`'s
`role="status" aria-label="Loading"`, rendered three times by `v-for="i in 3"`: three identical live
regions firing "Loading. Loading. Loading."

Pair this with the prior seat's C-7 (the *result* of destroying users is announced **zero** times)
and the panel's announcement budget is exactly inverted.

### Cure

`role="status"` belongs on the **container** (once), carrying the name; the repeated skeletons are
decoration and should be `aria-hidden="true"` rather than three competing live regions. Since
`AdminListSkeleton.vue` is consumed by five admin panels, moving the announcement off the atom and
onto the container is one edit that corrects five surfaces (edict 1: fix at the shared atom, not per
instance).

---

## 10 · C-21 · MAJOR — a failed prune is reported as "No empty users to prune"

Filed independently by the **D seat** (`challenge-D-design.md`, probe `probe-D2d-prune-failure.mjs`,
frame `frames-D2/G-prune-FAILED-desktop-light.png`). I re-file it on the implementation axis because
its mechanism is a code defect, not a design one, and because I found a **second path into the same
string** that the D seat did not record.

`useAdminUsers.ts:186-199`:

```ts
async function onPruneEmpty(): Promise<number> {
    const token = getAdminToken();
    if (!token) return 0;                                   // ← PATH 2
    try { … return result.pruned; }
    catch (e: any) { console.warn(…); return 0; }           // ← PATH 1 (D seat's)
}
```

`AdminUsersPanel.vue:303-309` maps `0` to `"No empty users to prune"`. So **three** distinct
outcomes — *the server refused* / *the credential is gone* / *there was genuinely nothing to
prune* — collapse into one reassuring sentence. D's measurement:

```
[warn] Failed to prune empty users: Internal Server Error
PRUNE-FAILURE: { "message": "No empty users to prune", … "anyErrorRole": false }
```

with the toolbar simultaneously reading "· 2 empty". `onPruneDone(count: number)` is the signature
defect: a `number` cannot express failure, so no downstream code can.

---

## 11 · C-22 · INFO — an unchecked cast on a server-supplied string, twice

`AdminUsersPanel.vue:371-380`:

```ts
function updatePaletteTier(paletteSlug: string, tier: string) {
    …
    userPalettes.value[idx] = { ...existing, tier: tier as "standard" | "featured" | "archived" };
```

and the caller, `useAdminUsers.ts:92`, casts `result.tier` the same way. The parameter is typed
`string` and then asserted into a three-member union with no validation. A server that returns any
fourth tier value lands an off-union string in `Palette.tier`, which `PaletteCard` then branches on.
INFO because today's server is constrained; recorded because a cast is the type system being told to
stop looking, and this file has two of them on the same value.

---

## 12 · Test truth — updated for the new rows

Re-measured at this HEAD:

```
$ grep -c 'plugin-vue\|plugins' vitest.config.ts                  → 0
$ grep -rn 'from ".*\.vue"' test/ demo/test/ | wc -l              → 0
$ grep -rln '@vue/test-utils' test/ demo/test/ e2e/ | wc -l       → 0
$ grep -rln 'AdminUsers\|prune' test/ demo/test/ | wc -l          → 0
```

`vitest.config.ts` declares no `plugins` key, so no `.vue` file is transformable under `npm test`;
`@vue/test-utils` and `jsdom` are devDependencies with zero importers. **The prior seat's C-12 holds
verbatim.**

The only coverage is `e2e/smoke/admin/{admin-walk,admin-populated,a11y-authed-admin}.spec.ts` and
`flows/user-status.spec.ts`. The mutations that keep them green, one per new row:

| row | mutation that stays GREEN |
|---|---|
| C-15 | delete `confirmOpen.value = false` from `onConfirm` entirely and close the dialog on a 400 ms timer instead — every spec that asserts "one DELETE fires" still passes, because it fires |
| C-16 | replace `useAdminUsers.ts:33` with `users = users.filter(() => true)` — search becomes a no-op; no spec asserts a filtered row count |
| C-17 | change `if (!token) return` to `if (!token) { adminUsers.value = []; return; }` — identical rendering, no spec is unauthenticated |
| C-18 | make `emit("refresh")` a no-op on the panel side; no spec presses Refresh with a row expanded |
| C-19 | no spec expands a row twice, so *any* change to the collapse arm is invisible |
| C-20 | delete both `aria-label`s; `a11y-authed-admin.spec.ts` asserts `nameless == []` over **buttons**, not containers |
| C-21 | make `onPruneEmpty` `return 0` unconditionally — the prune POST still fires, which is all `user-status.spec.ts` checks |

Seven of eight new rows are invisible to the entire gate. That is the same vacuous-gate finding the
prior seat filed as C-12, now with seven more instances behind it.

---

## 13 · Negative proof — what I attacked at this HEAD and could not break

- **The visual REPORT charges this component nothing.** `REPORT.json`, route `/#/admin/users`,
  safari-desktop-light and -dark: `namelessButtons 0`, `imgNoAlt 0`, `overflowX 0`,
  `consoleErrors []`, `consoleWarnings []`, `pageErrors []`, `failedRequests []`,
  `bodyTextLength 273`. The four `smallTapTargets` are `input` 160×23, `Switch to slug` 22×22,
  `Generate new slug` 22×22, `Cancel` 22×22 — **all dock controls, none from this file**.
- **The named local hazards have no site here.** `grep` over the subject file: `defineModel` 0 ·
  `ValueUnit` 0 · `parseCssColor` 0 · `requestAnimationFrame` 0 · `addEventListener` 0 · `Observer`
  0 · `setInterval` 0 · WebGL 0 · reka-ui slider 0. The PRM-RAF epidemic does not touch this
  component; there is no oklch→HSV roundtrip and no pointer capture to leak.
- **`verbatimModuleSyntax` is satisfied.** `:199` `import type { Palette, User }` is the sole
  type-only import and is correctly marked. `import { Transition } from "vue"` at `:186` is a value
  import of a built-in component — redundant (the compiler resolves `<Transition>` without it) but
  not a violation.
- **`vj-celebrate` is a real, defined transition, not a dead class name.** `grep -rn vj-celebrate demo/`
  → 24 hits including `demo/styles/animations.css:142-165` (`-enter-active`, `-leave-active`,
  `-enter-from`, `-leave-to`, `-enter-to`, `-leave-from`) and the token contract
  `--vj-celebrate-x/-y/-scale/-collapse/-expanded`. Edict 6 is satisfied; the beat animates.
- **No unbounded growth, no leaked handle.** `userPalettes` is replaced wholesale (`:361`, `:368`,
  `:375`), never appended. `confirmAction` is overwritten per `showConfirm`. The file's only
  scheduled work is the single `setTimeout` at `:308` (prior C-7).
- **The keydown guard at `:344-350` is correct**, as the prior seat found. I add one measurement it
  lacked: `e.repeat` is unguarded (`grep -rn '\.repeat' demo/` returns only `String.prototype.repeat`
  hits in a test), so a held Enter would re-fire expand/collapse and a fetch per repeat. I did **not**
  drive OS-level auto-repeat and therefore label this a **HYPOTHESIS**, not a finding.
- **`emit("refresh")` is correctly gated** by `:disabled="loading"` — I could not produce concurrent
  `loadAdminUsers` calls from the button.

---

## 14 · Family grouping — the new rows fold into the two known mechanisms, plus one new one

**Mechanism A · a value is sourced from a different authority than the one that acts on it** —
prior C-1, C-2, C-3; **new C-16** (search authority is the client's 50-row cache; the corpus is the
server's), **new C-18** (the disclosure's authority is one gesture; the roster's is another),
**new C-19** (the response's key is not the row's key).
*Cure*: bind a value to its key, and take a destructive action's scope from its executor.

**Mechanism B · failure, absence and emptiness are the same value** — prior C-4, C-5, C-8, C-9;
**new C-17** (`if (!token) return` → the clear-roster plate), **new C-21**
(`return 0` for three different outcomes). `void` and `0` are being used as error channels.
*Cure*: a discriminated union at the composable boundary — `unauthenticated | loading | error |
resolved` — so "count" and "empty" cannot be written in a state that has neither.

**Mechanism C (new) · a control outlives its own activation** — **C-15**. The confirm button, the
prune timer (`:308`, prior C-7) and the in-flight disclosure fetch (C-19) are three instances of the
same shape: work that is started is never given a way to be *finished, cancelled, or made
unrepeatable*. All three cures are the same move — make the thing that started the work own its
termination (disable + null the closure; keep the timer handle; abort on key change).

---

## 15 · Owner-edict compliance (implementation axis)

| edict | finding |
|---|---|
| 1 · no god modules | 391 lines carrying seven concerns (toolbar, roster, disclosure, **confirm engine**, feedback timer, keyboard, slug formatting). C-15's cure extracts the confirm engine; C-1/C-18's extracts the disclosure. Both **remove** concerns. The panel also hand-rolls its row (`:78-132`) while `AdminListItem.vue` sits unused in the same directory — noted as corroboration of the adjudicated MT-AU1 scope, not filed anew. |
| 2 · no legacy code | Clean. No shim, alias, dual path or masking fallback **in this file**. Note that `useAdminUsers.ts:186-199`'s `return 0` **is** a masking fallback (C-21) — one file out. |
| 3 · KISS | Every cure above reuses something that already exists: `PaginationBar.vue` (C-16), `ActionFeedback.vue` (C-7), `AdminListSkeleton.vue` (C-20), `AdminListItem.vue`. No new shared dir is required by anything I found. |
| 4 · glass-ui first | C-15 is a **consumer** defect, not a Glass 7 one — the Dialog's leave transition is correct behaviour; the panel is wrong to leave a live destructive closure inside it. The focus-restoration rider the prior seat routed to the BH relay (INBOX I-20) remains glass-owned. |
| 5 · root-level styling | `:99` and `:168` set `color`/`borderColor` inline per instance on `.slug-pill`. Re-verified: `demo/styles/foundation.css:585-587` is `@apply text-mono-small font-bold px-2 py-0.5 rounded-full border;` — no colour at all, and `:584` says so in prose ("Consumers set `color` / `border-color` per-instance via :style"). The recipe *documents* the per-instance override rather than owning the token. Corroborates the adjudicated L-9; no new row. |
| 6 · animations never deleted | Clean — `vj-celebrate` verified live (negative proof). |
| 7 · idiomatic Vue 3.5 | Reactive props destructure at `:205-220` is correct; `defineModel` unused so its stale-read hazard does not arise. **New**: `confirmAction = ref<(() => void) \| null>(null)` (`:261`) stores a closure in a deep `ref` — should be `shallowRef` (folded into C-15's cure). The `defineExpose` imperative surface at `:389` is the adjudicated L-1/L-2 anti-idiom. |
| 8 · `verbatimModuleSyntax` | Clean (negative proof). |

---

## 16 · Reproduction index

```bash
# Dev server already live at :9000 — no second server needed (see §1).
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-C2-implementation.mjs  # C-15..C-20
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-C2b-controls.mjs       # the controls
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-C2c-window.mjs         # C-15 window + frames

# prior seat's probes (require VITE_API_URL=http://localhost:9077 npx vite --port 9077)
node .../probe-impl.mjs  .../probe-impl-c3.mjs  .../probe-impl-c3b.mjs
node .../probe-impl-c8.mjs  .../probe-impl-c9.mjs  .../probe-impl-c9b.mjs  .../probe-impl-c10.mjs
```

**Witness-tracking warning** (inherits the arbiter's G-8): `.gitignore:34` is `*.png`, so frames
under `frames-C2/` need `git add -f` to enter the record. Every finding above is fully carried by
its `.json` output, so none depends on an untracked image.
