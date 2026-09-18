# CHALLENGE-C — AdminUsersPanel.vue · the implementation is defective (r3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
explicitly spawned with ("You are powered by the model named Opus 5 (1M context)"). Declared, not
inherited, not undeclared.

**Subject** `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines) · **Area** palettes ·
**Route** `#/admin/users` · **Date** 2026-07-28 · **Tree HEAD** `4f78e57b` (the parent named
`c654824e`; the subject file is byte-identical —
`git diff c654824e..HEAD -- demo/palettes/browser/admin/AdminUsersPanel.vue` is empty).

**This is the third C deployment.** Both prior reports stand unretracted:

- `challenge-C-implementation.2026-07-27-prior.md` — rows **C-1 … C-14**
- `challenge-C-implementation.2026-07-27-r2-prior.md` — rows **C-15 … C-22**

I re-derived this component's defects **without reading either prior report until my own probes had
run**, then reconciled. §3 is the reconciliation: seven of the standing rows now carry a second,
independently-produced two-engine receipt from a different probe harness — including both BLOCKERs.
§§4–7 are what neither prior seat tested: **three new rows C-23 … C-25**, plus **one evidence
correction C-26** against a claim in the r2 report that my measurement does not support.

---

## 1 · Method

The dev server on `:9000` short-circuits every API call before a request leaves the page —
`detectDevMisconfig` (`demo/platform/transport/availability.ts:112-116`) trips on *loopback page +
unset `VITE_API_URL` + cross-origin `BASE_URL`, so `loadAdminUsers` throws `DevMisconfigError` and no
route interception can reach the panel. Verified live:

```
$ node probe/dbg.mjs                      # :9000, admin token seeded, routes mocked
[warning] Failed to load users: DevMisconfigError: value.js dev is MISCONFIGURED …
TEXT: Users 0 | Manage accounts and permissions. | 0 users | Prune empty | Refresh |
      The roster is unreachable. | … | Retry
```

The r2 seat's cure — rewriting `transport/client.ts` in flight — works. I chose the other leg of the
same latch instead, because it needs no source rewriting at all and keeps the probe honest about
which bytes it exercised: a **private read-only vite** with the variable set,
`VITE_API_URL=http://localhost:9124 npx vite --port 9124`, which also makes the API **same-origin**.
That last property turned out to be load-bearing and is worth recording for every seat that follows:

> **WebKit does not expose CORS preflights to Playwright's router.** With a cross-origin mock, every
> non-simple admin verb (`DELETE`, `POST` with `Authorization`) fails in WebKit only —
> `"Failed to delete user: Backend unreachable"`, zero rows removed — while Chromium passes. That is
> a *probe artefact* that will manufacture a false engine-divergence finding. Receipt:
> `probe/dbg2.mjs` run cross-origin (`API GET /admin/users` … then nothing; `rows: 2`) versus the
> same script same-origin (`API DELETE /admin/users/crimson-owl-77`; `rows: 1`).

Playwright 1.60, chromium + webkit, viewport 1440×900. Probes, all re-runnable, all two-engine where
the claim requires it:

| probe | covers |
|---|---|
| `probe/aup-probe.mjs` | R1 unauth · R2 nested error · R3 race · R4 prune failure · R5 blast radius · R7 structure |
| `probe/aup-probe2.mjs` | F1 focus loss · F3 timer truncation · **F4 slug pill (C-24)** · F5 live regions + nested interactives |
| `probe/aup-probe3.mjs` | G2 discarded total · **G3 AX tree on the loading container (C-26)** |
| `probe/aup-probe4.mjs` | **H1 terminal spinner (C-23)** · H2 double-fire |
| `probe/aup-probe5.mjs` | live-region census, loading state and post-action state |
| `probe/dbg3.mjs` | the end-to-end wrong-owner delete receipt for C-1 |

No finding below depends on macOS Full Keyboard Access; **MT-F022 absorbs none of them.**

---

## 2 · Verdict

**DEFECTIVE.** The two standing BLOCKERs (C-1, C-2) and the r2 BLOCKER (C-15) all reproduce at this
HEAD from an independent harness. Three new MAJORs and one evidence correction.

| id | severity | one line |
|---|---|---|
| **C-23** | MAJOR | a request that never answers leaves the prune control **terminally** spinning — `pruning` is cleared only by `onPruneDone`, and there is **no `AbortController` or timeout anywhere in `demo/`** |
| **C-24** | MAJOR | the tail-priority slug pill splits the identifier into two block boxes: **selecting and copying a slug yields `azure-\nfox-01`** — and this is the measured root of the mangled accessible names both prior seats recorded as incidental |
| **C-25** | MAJOR | the app ships a working `Idempotency-Key` replay store, uses it on **palette saves**, and withholds it from **every admin destructive verb** — the missing server-side half of C-15's double-fire, already built, three files away |
| **C-26** | INFO · correction | r2's C-20 states the loading container's `aria-label` "is discarded by **both** engines". Chromium's real AX tree exposes it: `{"role":"generic","ignored":false,"name":"Loading users"}`. The row survives on its other two legs; the mechanism claim must not enter the ledger unqualified. |

**Strongest defect in the component overall: C-1** (unchanged — it is the only row that writes wrong
data to the server). **Strongest new row: C-25**, because it is the one finding whose cure is already
written, tested and deployed in this repository and simply not called.

---

## 3 · Independent re-verification of the standing rows

Produced before reading either prior report, from `probe/aup-probe*.mjs`. Every line is a fresh
two-engine measurement, not a re-reading of the prior evidence.

### C-1 (BLOCKER, expand race → wrong owner destroyed) — **HOLDS**, with a stronger end-to-end receipt

`toggleUserExpand` (`:352-365`) awaits and assigns with no key check. Azure's palettes delayed
1500 ms, crimson's 30 ms; click azure, then crimson 100 ms later:

```
== chromium R3 ==                                == webkit R3 == (byte-identical)
  R3 t+0.4s crimson shows its own data: true | azure leaked: false
  R3 t+2.4s expanded row = "crimson- owl-77 1 Palettes"
  R3 t+2.4s AZURE rows visible under it: true | CRIMSON visible: false
```

The prior seats stopped at the mis-attributed render and reasoned the delete forward. I drove it
(`probe/dbg3.mjs`) — opening the leaked card's menu inside **crimson's** region and confirming:

```
MENU: ["AZURE ONE\nSave\nRemix\nExport\nReport\nADMIN\nFeature\nDelete (admin)", …]
CONFIRM DIALOG: "(none)"                                   ← no confirmation on this path at all
CALLS: ["GET /admin/users",
        "GET /admin/users/azure-fox-01/palettes",
        "GET /admin/users/crimson-owl-77/palettes",
        "DELETE /admin/palettes/azure-one-11aa"]
BADGES: ["azure-fox-014Palettes","azure-fox-01","crimson-owl-77"]
```

After the delete only **one** row still carries `role=button` — azure's, still reading **4**. Crimson's
row lost its interactive role because `useAdminUsers.ts:118-121` decremented `ownerSlug` =
crimson from 1 → 0. One click destroyed azure's palette, left azure's count overstated, and zeroed
crimson's count while crimson still owns a palette. The reasoned consequence is now a measured one.

Rider worth recording: the palette-menu "Delete (admin)" fires with **no confirmation dialog**
(`CONFIRM DIALOG: "(none)"`), while every destructive verb the panel itself owns is confirmed. The
panel's own W5-12 §No-workaround doctrine is not enforced on the path it wires at `:150`.

### C-2 (BLOCKER, filtered count / global destruction) — **HOLDS**, now with the execution receipt

The prior seat measured the promise. I executed it (`probe/aup-probe.mjs R5`; two empty users, search
filtered to one, server answers `{pruned: 2}`):

```
== chromium R5 ==                              == webkit R5 == (identical)
  R5 dialog: "Prune 1 empty users? This will permanently delete 1 user with 0 palettes and
              their sessions. This cannot be undone. Cancel Prune"
  R5 request actually sent: ["POST /admin/users/prune-empty"]
  R5 result banner: "Pruned 2 users"
```

The dialog promised one, the app destroyed two, **and the app printed the true number afterwards** —
the contradiction is on screen, after the irreversible act. Server side confirmed unfiltered and
unbounded: `api/src/modules/admin/service/users.ts:228-237`, `users.findEmptyUserSlugs()` → `deleteMany`
inside a transaction that also `deleteByUserSlugs` the sessions.

### C-3 / C-16 (total discarded, no paging, client-side search) — **HOLDS**

`probe/aup-probe3.mjs G2`, server answers 50 rows with `total: 1372`:

```
  G2 panel header: "Users 50 |  | Manage accounts and permissions. |  | 50 users | · 17 empty"
  G2 pagination controls in the panel: 0
```

Both the header badge (`AdminPane.vue:33`) and the toolbar (`:8-10`) assert 50 for a 1372-user
corpus. `PaginationBar.vue` sits unused in this component's own directory while
`AdminAuditPanel.vue:83` and `AdminFlaggedPanel.vue:126` both mount it.

### C-4 (nested error costumes as empty) — **HOLDS**

`probe/aup-probe.mjs R2`, `/admin/users/*/palettes` → 500:

```
== chromium R2 ==                                == webkit R2 == (identical)
  R2 after 500: "· 2 empty | Palettes | · NONE PINNED · | No palettes. | …"
  R2 shows 'No palettes.': true
  R2 shows any error affordance: false
```

The file forbids exactly this at `:49-50` ("error ≠ empty — a dead backend never costumes as an empty
roster") and honours it for the roster only. The operator's next act after "No palettes." is
"Delete user" — safe on an empty user, catastrophic on one whose palettes merely failed to load.

### C-17 (no token → clear-roster plate, dead Refresh) — **HOLDS**

`probe/aup-probe.mjs R1`, no admin token:

```
  R1 text/head: "Users 0 |  | Manage accounts and permissions. |  | 0 users | Prune empty | Refresh"
  R1 admin API calls on load: []
  R1 shows 'No users found.': true
  R1 shows any error/retry: false
  R1 Refresh -> new admin API calls: 0 []
  R1 text unchanged after Refresh: true
```

This is the state the shipped visual audit captured:
`audit/visual/shots/safari-desktop-light/admin-users.png` — dock reads "Login", panel reads
"0 users … · ROSTER CLEAR · … No users found." A control that can neither succeed nor fail is
furniture.

### C-7 (focus + un-announced receipt) — **HOLDS**, both halves re-measured

Focus after a destructive confirm, `probe/aup-probe2.mjs F1`:

```
== chromium F1 ==                                == webkit F1 ==
  focus before:        BUTTON "Delete user crimson-owl-77"      (identical)
  focus in dialog:     BUTTON "Cancel"                          (identical)
  focus AFTER confirm: BODY  {"isBody":true}                    (identical)
  rows left: 1                                                  (identical)
```

Timer truncation, `probe/aup-probe2.mjs F3` (two prunes ~1.7 s apart; each banner is specified for
3000 ms):

```
  F3 banner1 alive at +1816ms: true
  F3 banner2 set at +2109ms: true
  F3 banner alive 1303ms after banner2: true
  F3 banner alive 2207ms after banner2: false      ← killed at t≈3.4s by banner1's orphan timer
```

Banner 2 died ≈1.9 s early. And the receipt is outside every live region — `probe/aup-probe5.mjs`,
identical in both engines:

```
  AFTER prune failure: {"bannerText":"No empty users to prune",
                        "bannerInLiveRegion":false, "liveRegionsNow":1}
```

### C-6 (`role=button` rows with focusable descendants) — **HOLDS**

`probe/aup-probe2.mjs F5`, identical in both engines:

```
{"panelLiveRegions":0,"rowsWithNestedButtons":[2,2],"inertRowsInTabOrder":2}
```

Two rows, two real `<button>` descendants each. WAI-ARIA 1.2 gives `button` **Children Presentational:
True**. One DOM, two engines — no Full-Keyboard-Access dependency.

### C-15 (confirm outlives its own click) — **HOLDS**

`probe/aup-probe4.mjs H2`, a single `dblclick` on the confirm footer:

```
== chromium H2 ==
  H2 prune POSTs after ONE dblclick: ["POST /admin/users/prune-empty","POST /admin/users/prune-empty"]
```

Two corpus-wide prunes from one gesture, reproduced from a different harness than the r2 seat's.
**C-25 below is the half of this defect that no seat has filed.**

### C-21 (failed prune reported as success) — **HOLDS**

`probe/aup-probe.mjs R4`, `POST /admin/users/prune-empty` → 500:

```
  R4 toolbar before: "Users 4 | …"        (roster shows "· 2 empty")
  R4 dialog: "Prune 2 empty users? …"
  [console.error] the server responded with a status of 500
  R4 after a 500 the panel says: "No empty users to prune"
  R4 still lists empty users: true
```

### C-5 (the A-3 count printed over the error plate) — **HOLDS**

Incidentally captured while diagnosing the `:9000` latch (`probe/dbg.mjs`): the count span is gated
on `!loading` only (`:8`), so the error arm renders beneath it —

```
TEXT: Users 0 | Manage accounts and permissions. | 0 users | Prune empty | Refresh |
      The roster is unreachable. | …
```

"0 users" above "The roster is unreachable." is exactly the self-contradiction the comment at `:5-7`
claims to have cured for the loading case and left open for the error case.

---

## 4 · C-23 · MAJOR — a request that never answers leaves the prune control terminally spinning

### The code

`pruning` has exactly two writers: `true` at `AdminUsersPanel.vue:295` (inside the confirm action) and
`false` at `:304`, the first line of `onPruneDone`. `onPruneDone` is called from exactly one place —
`usePalettePorts.ts:121-124`:

```ts
async function onPrune() {
    const pruned = await admin.onPruneEmpty();          // ← if this never settles…
    admin.adminUsersPanelRef.value?.onPruneDone(pruned); // ← …this never runs
}
```

So the button's enabled state is hostage to a promise with no deadline. And there is no deadline
anywhere:

```
$ grep -rn "AbortController\|AbortSignal" demo/ | wc -l
0
```

`fetchWithRateLimitRetry` (`demo/platform/transport/client.ts:67-92`) calls `fetch(input, init)` with
no `signal`, inside a retry loop. The transport can wait forever, and two `finally`-cleared flags in
this panel (`pruning`, `loadingUserPalettes` at `:359-364`) inherit that.

### The reproduction (`probe/aup-probe4.mjs H1` — `prune-empty` accepted and never answered)

```
== chromium H1 ==
  H1 t+1000ms  prune button: {"disabled":true,"spinner":true}
  H1 t+5000ms  prune button: {"disabled":true,"spinner":true}
  H1 t+10000ms prune button: {"disabled":true,"spinner":true}
```

Terminal. Only a reload recovers; there is no cancel affordance and no message. The identical shape
exists on the disclosure: a hung `GET …/palettes` leaves `loadingUserPalettes` true and the two
skeletons up forever, with `expandedUserSlug` pinned so the row cannot even be collapsed back to a
clean state without a second click that the operator has no reason to try.

### Why it is a MAJOR and not a MINOR

A hung request is the *normal* failure mode of the state this console is used in — a slow admin
backend under a long transaction is precisely what `pruneEmptyUsers` provokes
(`api/src/modules/admin/service/users.ts:233-236` runs `deleteByUserSlugs` + `deleteMany` inside one
`withTransaction`). The operator sees a spinner that means "in progress" and has no way to learn that
it means "abandoned". The panel's other failure surfaces at least resolve to *something*; this one
resolves to nothing, forever.

### Cure

The deadline belongs in the transport, once, not in this panel: give `fetchWithRateLimitRetry` an
`AbortSignal.timeout(ms)` (composed with any caller signal), so every one of the ~30 API wrappers
inherits a bounded wait and `ApiProblem`/`ApiUnavailableError` becomes reachable on a hang. The panel
then stops hand-toggling `pruning` at two call sites and derives it from the port's in-flight state —
which is the same move C-1's keyed-resource cure already requires, so the two collapse into one
change. Adding a local `setTimeout` watchdog inside this component would be the contrivance (edict 3):
a per-component timeout is a second, divergent authority on what "too long" means.

---

## 5 · C-24 · MAJOR — the tail-priority slug pill breaks the identifier: copying a slug yields `azure-\nfox-01`

### The code

`AdminUsersPanel.vue:97-101` splits the slug into two spans inside a flex container:

```html
<span class="slug-pill flex items-baseline min-w-0 max-w-full" :style="…" :title="user.slug"
><span class="truncate min-w-0">{{ slugHead(user.slug) }}</span><span class="shrink-0">{{ slugTail(user.slug) }}</span></span>
```

The author deliberately elided the whitespace between the tags — so the *source* is careful about not
introducing a gap. But `display: flex` on the parent makes both children **block-level boxes**, and
block boxes are line-breaking boundaries for `innerText`, for the selection/copy serializer, and for
the accessible-name algorithm's text concatenation. The care taken in the markup is undone by the
layout mode.

### The measurement (`probe/aup-probe2.mjs F4`) — byte-identical in chromium and webkit

```json
{ "pillTitle":         "azure-fox-01",
  "pillInnerText":     "azure-\nfox-01",
  "pillTextContent":   "azure-fox-01",
  "selectionToString": "azure-\nfox-01\n",
  "rowInnerText":      "azure-⏎fox-01⏎4⏎Palettes",
  "childDisplays":     ["block","block"],
  "pillDisplay":       "flex" }
```

`selectionToString` is produced by selecting the pill's contents and reading `window.getSelection()`
— i.e. it is what the clipboard receives.

### Consequence

1. **The identity token cannot be copied.** In an admin console the slug is the string you select and
   paste into the next query, a support ticket, or a CLI. Here it arrives with an embedded newline.
   The `title` attribute holds the correct string but is mouse-hover-only and not copyable.
2. **It is the root of a defect both prior seats recorded as noise.** r2's C-15 witness prints
   `"openRow": "beta-drifte r-0002 2 Palettes"` and the r1 report prints
   `"beta-drifter-0002 2 Palettes"` with the same break; both treated the mangling as a probe
   artefact of `innerText`. It is not an artefact — it is the rendered accessible name. A screen
   reader announces the disclosure control as *"azure dash, fox zero one, four, Palettes, button"*:
   the identifier as two words, plus the label of a control the row is not.
3. It compounds the r1 seat's C-9 (an empty slug yields a destructive control named `"Delete user "`):
   this component has two independent paths by which a user's identity fails to reach the operator.

### Cure

Keep one text node and let CSS do the tail-priority truncation. The idiomatic single-element form is
`direction: rtl; unicode-bidi: plaintext; overflow: hidden; text-overflow: ellipsis` on one span —
the head ellipsises, the tail survives, and the DOM keeps exactly one text node, so copy, `innerText`
and the accessible name are all the real slug. The W5-12 / F-13 intent (two prune candidates must stay
distinguishable on a phone) is fully preserved; what goes away is the two-box implementation of it.
`slugHead` / `slugTail` (`:246-252`) delete with it, taking a `SLUG_TAIL = 6` magic constant out of the
SFC.

---

## 6 · C-25 · MAJOR — the shipped replay protection is used by palette saves and withheld from every admin destructive verb

### The finding

This repository already implements idempotent mutation, end to end.

**Server** — a body-hash replay store mounted globally, so it covers `/admin/*`:

```ts
// api/src/app.ts:69-73
app.use("*", idempotency);          // after injectServices + resolveSession
// api/src/platform/http/idempotency.ts:93-99
const idempotencyKey = c.req.header("Idempotency-Key");
if (!idempotencyKey || idempotencyKey.trim() === "") { await next(); return; }   // opt-in
```

**Transport** — both request helpers forward the header:

```ts
// demo/platform/transport/client.ts:112-114 (request) and :145-147 (adminRequest)
if (init?.idempotencyKey) headers["Idempotency-Key"] = init.idempotencyKey;
```

**Callers** — and here is the defect:

```
$ grep -rn "idempotencyKey" demo/palettes/api/
demo/palettes/api/palettes.ts:80:        idempotencyKey: crypto.randomUUID(),
demo/palettes/api/palettes.ts:145:       idempotencyKey: crypto.randomUUID(),
demo/palettes/api/palettes.ts:161:       idempotencyKey: crypto.randomUUID(),

$ grep -rln idempotencyKey demo/palettes/api/admin-*.ts | wc -l
0
```

**Saving a palette** — the most recoverable action in the application — is replay-protected. **Pruning
every empty user in the corpus** is not:

```ts
// demo/palettes/api/admin-users.ts:69-71
export function pruneEmptyUsers(token: string): Promise<{ pruned: number }> {
    return adminRequest("/admin/users/prune-empty", token, { method: "POST" });
}
```

Nor is `deleteUser`, nor `deleteUserPalettes`, nor `deletePaletteAdmin`, nor `featurePalette`.

### Why this is a finding on this component

C-15's measured double-fire —

```
  H2 prune POSTs after ONE dblclick: ["POST /admin/users/prune-empty","POST /admin/users/prune-empty"]
```

— reaches the server as **two genuinely distinct prunes**, not one request replayed. Between them,
other traffic may have emptied further accounts, so the second POST destroys a set the operator never
saw and never confirmed. With an `Idempotency-Key` the second POST would replay the first response and
destroy nothing, and the panel's `"Pruned N"` receipt would stop being ambiguous. The defence exists,
is mounted, is tested, and is declined by exactly the verbs that need it most.

This is not merely "the client should be more careful": the asymmetry itself is the defect. One
concern (mutation safety) has two contradictory implementations in the same `api/` directory —
present in `palettes.ts`, absent in `admin-*.ts` — which is the shape edict 2 exists to prevent.

### Rider (honest scope limit)

The replay key is scoped `identity:method:path:key` where
`identity = c.var.sessionToken ?? c.var.userSlug ?? "anon"`
(`api/src/platform/http/idempotency.ts:108`). An admin request authenticated by `Authorization:
Bearer` may resolve neither, collapsing to `"anon"` — correctness-preserving for replay (the key is a
UUID) but it puts all admins in one bucket. Adding the admin identity to the scope key is part of the
cure, not a reason to defer it. **I did not run the server**, so this rider is source-derived and
labelled as such; the client-side half above is grep-exact.

### Cure

Two lines per admin mutation — `{ method: "POST", idempotencyKey: crypto.randomUUID() }` — using the
mechanism, the helper and the header that already ship. Zero new modules, zero new directories
(edict 3). It does not replace C-15's UI cure (the button must still not outlive its click); it makes
the failure of that cure survivable, which is what a destructive console requires.

---

## 7 · C-26 · INFO (evidence correction) — r2's C-20 mechanism claim is not supported in Chromium

r2's C-20 states (§9): *"A `<div>` with no `role` maps to ARIA `generic` … the accessible name is
discarded"*, evidenced by
`snapshotMentionsLoadingUsers: false` from Playwright's `ariaSnapshot`, and concluded **"discarded by
both engines"**.

`ariaSnapshot` is Playwright's own tree approximation, not the browser's accessibility tree. Querying
Chromium's real tree over CDP (`probe/aup-probe3.mjs G3`, `Accessibility.getFullAXTree`) while the
roster is loading:

```
  G3 DOM: {"present":true,"role":null,"ariaLive":null,"ariaBusy":null}
  G3 Chromium AX nodes whose computed NAME is 'Loading users': 1
     [{"role":"generic","ignored":false,"name":"Loading users"}]
  G3 (AX tree has 134 nodes; 19 unignored generics)
```

Chromium computes and exposes the name on the unignored `generic` node. The name is **not** discarded
there.

**The row still stands**, on its other two legs, both of which I re-measured:

1. ARIA 1.2 prohibits `aria-label` on `generic`, so what an AT does with this name is *undefined* and
   engine-dependent — which is a defect in its own right, and is now demonstrated rather than
   asserted (Chromium exposes it; Playwright's normalised view does not).
2. The duplicate live regions are real and unqualified: `probe/aup-probe5.mjs`, identical in both
   engines —
   ```
   LOADING-state live regions in main: [{"role":"status","label":"Loading"},
                                        {"role":"status","label":"Loading"},
                                        {"role":"status","label":"Loading"},
                                        {"role":"status","label":null,"txt":"· EMPTY PLATE ·…"}]
   ```
   three identical `role="status"` regions (`AdminListSkeleton.vue:10-11` × `v-for="i in 3"`, `:47`)
   announcing "Loading. Loading. Loading."

The cure r2 prescribed is correct and unchanged: `role="status"` once on the container carrying the
name, skeletons `aria-hidden="true"`. Only the stated mechanism needs correcting before it is
adjudicated — a ledger row that says "both engines discard it" invites the wrong fix (add a role *and*
keep three live regions) and will not survive a re-measurement.

---

## 8 · Test truth — re-measured, unchanged, with the new rows mapped

```
$ grep -rn "prune\|Prune" e2e/ test/ | grep -v node_modules
e2e/smoke/admin/fixtures/admin-populated.ts:17:  * Mutation verbs (POST feature, DELETE palette/flags, POST prune) answer a
e2e/smoke/admin/fixtures/admin-populated.ts:160:  if (url.includes("/prune-empty")) return json(JSON.stringify({ pruned: 1 }));
$ grep -rln "AdminUsers\|adminUsers" test/ | wc -l
0
```

The most destructive control in the application appears in the test tree exactly twice, both times as
a **route-table entry**, never as an assertion. No unit test can mount this component at all
(r1's C-12, re-verified: `vitest.config.ts` declares no `plugins`, so no `.vue` is transformable).

| gate | asserts | mutation that stays GREEN |
|---|---|---|
| `a11y-authed-admin.spec.ts:63` (BR-9) | row has `role=button` / `tabindex` / `aria-expanded`; Enter flips it to `"true"` | replace `userPalettes.value = await pm.loadUserPalettes(slug)` with `userPalettes.value = []`, or with a hard-coded *other* slug. The spec never asserts the disclosure's **contents** — C-1 and C-4 live entirely outside its scope. |
| `a11y-authed-admin.spec.ts` battery | no nameless / sub-24px control in `main` | every row in this report. It ran green on shipped code while C-6, C-7 and C-24 were live. |
| `flows/user-status.spec.ts:14` | one DELETE reached the backend (`expect.poll(() => deleteCalled).toBe(true)`) | fire `confirmAction` twice (C-15) — still `true`; drop focus restoration (C-7) — still `true`; never close the dialog — still `true`. |
| — | **C-23** | remove the `finally` from `toggleUserExpand` entirely; no spec ever observes a settled loading flag |
| — | **C-24** | change `SLUG_TAIL` to any value, or drop the tail span; no spec asserts a slug's text integrity, only `getByText("azure-fox-01")` which matches on the *combined* text |
| — | **C-25** | delete the three `idempotencyKey: crypto.randomUUID()` lines in `palettes.ts`; nothing asserts the header is sent |

Rider, unchanged from my own reading: `e2e/smoke/admin/fixtures/admin-populated.ts:27` imports from
`../../../../demo/@/lib/palette/types`, a path that does not exist (`ls demo/@/lib/palette/types.ts`
→ *No such file or directory*; the live module is `demo/palettes/types.ts`). It is an `import type`,
elided at runtime, so the fixture works — a dead reference only a typecheck over `e2e/` would catch.

---

## 9 · Negative proof — what I attacked at this HEAD and could not break

- **The visual REPORT charges this component nothing.** `audit/visual/REPORT.json`, route
  `/#/admin/users`, all four matrices: `namelessButtons 0`, `imgNoAlt 0`, `overflowX 0`,
  `pageErrors []`, `consoleErrors []`, `failedRequests []`. The four `smallTapTargets` are `input`
  160×23, `Switch to slug` 22×22, `Generate new slug` 22×22, `Cancel` 22×22 — **all dock chrome, none
  from this file**. The component's own icon-only control measures **28 × 36 px** and is named
  (`probe/aup-probe.mjs R7`: `"deleteBtnBox":{"w":28,"h":36}`, `aria-label="Delete user <slug>"`).
- **The BR-9 keyboard cure is genuinely correct.** `role`/`tabindex`/`aria-expanded` apply only when
  `paletteCount > 0` (`:85-87`) so inert rows never enter the tab order — measured
  `inertRowsInTabOrder: 2` for 2 non-empty rows out of 4 users — and the `e.target !== e.currentTarget`
  guard (`:345`) genuinely prevents a nested button's Enter from toggling the row.
- **The destructive dialog opens focus on Cancel, not on the destructive button**, in both engines
  (`F1`: `focus in dialog: BUTTON "Cancel"`). That is the correct default and I could not make it
  open on the destructive action.
- **The roster's own error path is right** — `loadError` → `EmptyState variant="error"` with a real
  Retry (`:51-62`), and `EmptyState.vue:17` carries `role="alert"`. C-4 is the *absence* of that
  pattern one level down, not a defect in the pattern itself.
- **`vj-celebrate` is a real, defined transition.** `demo/styles/animations.css:142-157` defines
  `-enter-active`, `-leave-active`, `-enter-from`, `-leave-to`, plus the
  `--vj-celebrate-x/-y/-scale` token contract. Edict 6 satisfied; the beat animates.
- **The named local hazards have no site here.** Over the subject file: `defineModel` 0 · `ValueUnit`
  0 · `parseCssColor` 0 · `requestAnimationFrame` 0 · `addEventListener` 0 · `Observer` 0 ·
  `setInterval` 0 · WebGL 0 · reka-ui slider 0. No PRM-RAF instance, no oklch→HSV roundtrip, no
  pointer capture to leak, nothing that wraps a possibly-already-wrapped value.
- **`verbatimModuleSyntax` satisfied** — `:199` `import type { Palette, User }` is the only type-only
  import and is correctly marked.
- **No unbounded growth, no leaked handle beyond the known one.** `userPalettes` is replaced wholesale
  (`:361`, `:368`, `:375`), never appended; `confirmAction` is overwritten per `showConfirm`; the
  file's only scheduled work is the single `setTimeout` at `:308` (C-7).
- **I could not produce concurrent `loadAdminUsers` calls** from the Refresh button — `:disabled="loading"`
  holds.

---

## 10 · Family grouping — the new rows against the standing mechanisms

The r2 seat's three mechanisms absorb two of my three new rows, and C-24 exposes a fourth.

**Mechanism A · a value is sourced from a different authority than the one that acts on it** —
C-1, C-2, C-3, C-16, C-18, C-19. *No new members.*

**Mechanism B · failure, absence and emptiness are the same value** — C-4, C-5, C-8, C-9, C-17, C-21.
*No new members.*

**Mechanism C · work is started with no way to be finished, cancelled or made unrepeatable** —
C-15 (the live confirm button), C-7 (the un-owned timer), C-19 (the un-cancelled fetch); **new
C-23** (the unbounded request whose only clearing path is its own success) and **new C-25** (the
un-keyed destructive POST, i.e. the *server's* half of the same absence). C-25 is the sharpest
instance because the termination mechanism is already built and simply not called.
*Cure*: one transport-level `AbortSignal.timeout`, one `idempotencyKey` per admin mutation, one
disable-on-fire, one owned timer handle. Four instances, four one-line applications of machinery that
already exists in this repository.

**Mechanism D (new) · a presentation transform destroys the datum it presents** — **C-24**. The
tail-priority split is a layout decision that silently rewrites the identifier for the clipboard, for
`innerText`, and for the accessibility tree. It is worth naming separately because it is invisible to
every gate the project owns — the pixels are correct, the `textContent` is correct, and only the
serialisations a machine reads are wrong. Both prior seats saw its output and read it as noise.
*Cure*: perform visual truncation with CSS on one text node; never with DOM surgery on the string.

---

## 11 · Owner-edict compliance (new rows only; the standing table in r2 §15 is unchanged)

| edict | new finding |
|---|---|
| 1 · no god modules | C-23's cure **removes** the hand-toggled `pruning` flag from the SFC by deriving it from the port; C-24's cure deletes `slugHead`/`slugTail`/`SLUG_TAIL` (`:243-252`) from a 391-line file. Both shrink the component. |
| 2 · no legacy code | **C-25 is an edict-2 finding in substance**: one concern (mutation replay safety) with two contradictory implementations in one directory — present in `api/palettes.ts`, absent in `api/admin-*.ts`. A dual path, even though neither half is a shim. |
| 3 · KISS | Every new cure calls machinery that already ships: `AbortSignal.timeout` in the one transport helper, `idempotencyKey` in `RequestOptions`, CSS truncation on the existing `.slug-pill` recipe. No new dir, no new wrapper. |
| 4 · glass-ui first | C-23 · C-24 · C-25 are all demo-side; none is a Glass 7 defect and none needs a BH relay. |
| 5 · root-level styling | C-24's cure lands in `demo/styles/foundation.css:585-587`, where `.slug-pill` already lives (`@apply text-mono-small font-bold px-2 py-0.5 rounded-full border;`) — the truncation rule belongs on the recipe, not on each instance. Corroborates the standing L-9 note that this recipe documents its own per-instance colour override rather than owning a token. |
| 6 · animations | untouched by all three new rows. |
| 7 · idiomatic Vue 3.5 | C-23's cure replaces two hand-set boolean writes with port-derived state — the same direction as the standing L-1/L-2 note on the `defineExpose` imperative surface at `:389` (whose exported `userPalettes` ref, I confirm, has **zero** consumers: `grep -rn "\.userPalettes" demo/` finds only the definition and the expose). |
| 8 · `verbatimModuleSyntax` | clean (negative proof). |

---

## 12 · Reproduction index

```bash
# One private, read-only dev server — same-origin API so WebKit can be routed (see §1).
VITE_API_URL=http://localhost:9124 npx vite --port 9124 --strictPort &

cd docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe
node aup-probe.mjs  chromium R1   # C-17 unauth + dead Refresh      (and webkit)
node aup-probe.mjs  chromium R2   # C-4  nested error costume
node aup-probe.mjs  chromium R3   # C-1  the race
node aup-probe.mjs  chromium R4   # C-21 failed prune reads success
node aup-probe.mjs  chromium R5   # C-2  blast radius, executed
node aup-probe2.mjs chromium F1   # C-7  focus → BODY               (and webkit)
node aup-probe2.mjs chromium F3   # C-7  timer truncation, measured
node aup-probe2.mjs chromium F4   # C-24 slug pill / clipboard      (and webkit)
node aup-probe2.mjs chromium F5   # C-6  nested interactives, live regions
node aup-probe3.mjs chromium G2   # C-3  total discarded (1372 → "50 users")
node aup-probe3.mjs chromium G3   # C-26 real Chromium AX tree
node aup-probe4.mjs chromium H1   # C-23 terminal spinner
node aup-probe4.mjs chromium H2   # C-15 double-fire
node aup-probe5.mjs chromium      # C-7/C-20 live-region census     (and webkit)
node dbg3.mjs                     # C-1  end-to-end wrong-owner delete
```

Every probe drives the private server only; nothing in the repository is mutated and no shared dev
server is touched. All findings are carried by pasted stdout — none depends on an untracked image
(`.gitignore:34` is `*.png`).
