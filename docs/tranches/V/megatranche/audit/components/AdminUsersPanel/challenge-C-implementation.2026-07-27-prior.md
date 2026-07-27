# CHALLENGE-C — AdminUsersPanel.vue · the implementation is defective

## Model receipt

I observe myself to be **Opus 5**, model ID `claude-opus-5[1m]` — the declaration this seat was
spawned with, not an inherited or undeclared tier.

**Subject**: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines) · **HEAD** `c654824e`
(working tree at `9bcd5d91`) · **Date** 2026-07-27 · **Area** palettes · **Route** `#/admin/users`.

## Environment disclosure (what this seat could and could not reach)

The dev server the parent named (`:9000`) is **structurally unable to render a single user row**.
`demo/platform/transport/availability.ts:112-116` trips the `misconfigured` latch when
`VITE_API_URL` is unset on a loopback page, and `client.ts:74` (`assertApiAttemptAllowed`)
short-circuits **before `fetch`** — so Playwright's `page.route` never sees a request. Measured on
`:9000`:

```
mainText = "Users 0 … 0 users Prune empty Refresh The roster is unreachable.
            value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL …"
rows = 0
```

This is why every populated capture in this component's folder to date is empty (the sibling
`probe-populated.json` records `rowCount: 3` — those three are the dock's own
`[role="button"][aria-expanded]` elements; `slugPill.text` is `" admin "`, the dock pill, and
`expanded.paletteCards` is `0`). Recorded so it is not re-discovered.

Every measurement below was taken against a **second dev server** stood up the way the repo's own
e2e does it (`playwright.config.ts:121` — `env: { VITE_API_URL: E2E_ORIGIN }`):

```
VITE_API_URL=http://localhost:9077 npx vite --port 9077
```

Probes committed beside this report, each re-runnable:
`probe-impl.mjs` / `.json` (C1–C7, chromium + webkit) · `probe-impl-c3.mjs` / `.json` (the race,
both engines) · `probe-impl-c3b.mjs` / `.json` (the race's data consequence) ·
`probe-impl-c8.mjs` / `.json` (pagination) · `probe-impl-c9.mjs` + `c9b.mjs` (a **refuted**
hypothesis + its control) · `probe-impl-c10.mjs` / `.json` (malformed input, both engines).
Frames under `frames-impl/`. **Every a11y and structural claim below was reproduced in BOTH
chromium and webkit**, per the parent's two-engine rule; none of them depends on macOS Full
Keyboard Access, so MT-F022 does not absorb any of them.

Playwright versions: chromium + webkit bundled with `@playwright/test ^1.60.0`. Viewports
1440×900 (desktop) and 390×844 (mobile).

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, seven MAJORs, three MINORs, one INFO. The strongest is C-1: a
concurrent-expand race that renders one user's palettes inside another user's open disclosure, and
then routes the admin delete against the **wrong owner** — reproduced end-to-end in both engines,
with the destroying HTTP request captured.

| id | severity | one line |
|---|---|---|
| C-1 | BLOCKER | expand race → wrong user's palettes in an open row → admin delete destroys the wrong owner's data |
| C-2 | BLOCKER | the prune confirm quotes a **search-filtered** count for a **globally scoped** destruction |
| C-3 | MAJOR | the roster prints a total it never measured; 87 of 137 users unreachable, no pagination |
| C-4 | MAJOR | a failed disclosure fetch costumes as "No palettes." — in the file that forbids exactly that |
| C-5 | MAJOR | "0 users" printed above "The roster is unreachable." — the file's own A-3 invariant, unguarded |
| C-6 | MAJOR | every row is a `role="button"` containing two focusable descendants; no `aria-controls` |
| C-7 | MAJOR | the destructive action's only receipt is un-announced and truncated by the prior action's timer |
| C-8 | MAJOR | one malformed row denies the whole console; zero row-level tolerance at the crash site |
| C-9 | MAJOR | an empty slug yields a destructive control named `"Delete user "` |
| C-10 | MINOR | raw `paletteCount` truthiness leaks `-1` / `9007199254740991` into interaction and layout |
| C-11 | MINOR | duplicate slugs → duplicate `v-for` keys; one expand opens both rows |
| C-12 | MAJOR | **test truth**: the vitest tier cannot mount any component; the e2e stays green through nearly all of the above |
| C-13 | MINOR | **test truth**: the only populated admin fixture types against a deleted path and models a response the server never emits |
| C-14 | INFO | a hypothesis of mine, **REFUTED** by measurement, with its control |

---

## C-1 · BLOCKER — the concurrent-expand race destroys the wrong user's data

### The code

`AdminUsersPanel.vue:352-365`:

```ts
async function toggleUserExpand(slug: string) {
    if (expandedUserSlug.value === slug) { … return; }
    expandedUserSlug.value = slug;
    loadingUserPalettes.value = true;
    try {
        userPalettes.value = await pm.loadUserPalettes(slug);   // ← no generation guard
    } finally {
        loadingUserPalettes.value = false;                      // ← first-to-settle wins
    }
}
```

`expandedUserSlug` and `userPalettes` are two independent cells joined only by wall-clock order.
Nothing captures which request the resolved value belongs to. `finally` clears the loading flag for
whichever request settles first, even while another is in flight.

### The reproduction (both engines)

`probe-impl-c3.mjs` — two users, `alpha-keeper-0001` served with a 1500 ms delay,
`beta-drifter-0002` with 40 ms. Click alpha, wait 300 ms, click beta.

```
chromium / webkit — IDENTICAL
t_afterAlphaClick : { openRow: "alpha-keeper-00014Pale", disclosure: "" }
t_betaSettled     : { openRow: "beta-drifter-00022Pale", disclosure: "BETA-PALETTE-BBB 2 0" }
t_alphaLanded     : { openRow: "beta-drifter-00022Pale", disclosure: "ALPHA-PALETTE-AAA 2 0" }
RACE_REPRODUCED   : true
```

beta's row is open, `aria-expanded="true"`, and it is showing **alpha's palette**. Witness:
`frames-impl/C3b-chromium-beta-shows-alpha.png`, `frames-impl/C3b-webkit-beta-shows-alpha.png`.

### The consequence (measured, not argued)

`AdminUsersPanel.vue:150` binds the card's admin delete to the **row's** slug, never the palette's
owner:

```html
@admin-delete="emit('adminDeleteUserPalette', $event, user.slug)"
```

`probe-impl-c3b.mjs` drives the card menu ("Palette menu" → "Delete (admin)") on the mis-attributed
card inside beta's disclosure, with the DELETE answered in the **server-true** shape
(`api/src/modules/admin/routes/palettes.ts:41` → `c.json({ deleted: true })`):

```json
"afterRace":  { "openRow": "beta-drifter-00022Pa", "disclosure": "ALPHA-PALETTE-AAA 2 0" },
"deleteRequests": [ "http://localhost:9077/admin/palettes/alpha-p-1" ],
"VERDICT": { "betaBadgeBefore": "2", "betaBadgeAfter": "1",
             "alphaBadgeBefore": "4", "alphaBadgeAfter": "4" }
```

Three separate wrongs in one gesture:

1. **`DELETE /admin/palettes/alpha-p-1` was issued from beta's row** — an admin who believes they
   are cleaning up beta destroys alpha's palette on the server. Soft-delete
   (`api/src/modules/admin/routes/palettes.ts:36-41`) gives a grace window; it does not make the
   click correct.
2. `useAdminUsers.ts:118-121` decrements the **owner passed by the row**, so beta's count falls
   2 → 1 for a palette beta never owned.
3. alpha's count stays 4 while alpha now has 3. Both numbers on screen are now wrong, in opposite
   directions, with no error and no console warning.

### Cure (transposition, not a patch)

Do not add a sequence counter to the existing shape — the shape is the defect. The disclosure is a
*keyed resource*, so express it as one: a colocated `useAdminUserPalettes(slugRef)` whose fetch is
driven by `watch(slugRef, …, { flush: 'post' })` with an `AbortController` cancelled on key change,
returning `{ palettes, loading, error }` bound to the key it was fetched for. A response for a key
that is no longer current then has nowhere to land — the race becomes unrepresentable rather than
policed. It also gives C-4 its missing `error` cell for free, and removes `userPalettes` /
`removeUserPalette` / `updatePaletteTier` / `clearUserPalettes` from `defineExpose` (the L-1/L-2
inversion) as a side effect rather than as separate work.

---

## C-2 · BLOCKER — the prune confirm quotes a filtered count for a global destruction

### The code

- `AdminUsersPanel.vue:241` — `const emptyCount = computed(() => users.filter((u) => !(u.paletteCount ?? 0)).length);`
- `AdminPane.vue:28` — `:users="pm.filteredAdminUsers.value"` (the **search-filtered** list;
  `useAdminUsers.ts:30-34`).
- `AdminUsersPanel.vue:288-299` composes the confirm copy from `emptyCount.value` and then emits
  `prune`.
- `demo/palettes/api/admin-users.ts:69` — `pruneEmptyUsers(token)` — **`POST /admin/users/prune-empty`
  takes no filter, no body, no slug list.**

The number that *describes* and *gates* the destruction is derived from a client-side view filter.
The number that *is* destroyed is whatever the server finds.

### The reproduction (both engines, identical)

`probe-impl.mjs` C2 — 5 users, **3** with zero palettes. Type `gamma` into "Search users…":

```
C2 unfiltered      : countLine "5 users"  emptyLine "· 3 empty"  rowsRendered 5
C2 filtered        : countLine "5 users"  emptyLine "· 1 empty"  rowsRendered 1
C2 pruneDialog     : "Prune 1 empty users? This will permanently delete 1 user with 0 palettes
                      and their sessions. This cannot be undone. Cancel Prune"
```

The dialog promises **1**; pressing Prune deletes **3**. Witness:
`frames-impl/C2-chromium-prune-dialog-filtered.png`, `frames-impl/C2-webkit-…`.

At scale (`probe-impl-c8.mjs`, 137-user roster, 50 returned, 10 empty on page 1):

```
pruneDialog: "Prune 10 empty users? This will permanently delete 10 users with 0 palettes …"
```

— against an unknown number of empty users across the other 87.

The **inverse** failure is on the same measurement (`C2_filteredNoEmpty`, search `alpha`):

```
countLine "5 users"  emptyLine null  toolbar [{Prune empty, disabled: true}, {Refresh, false}]
```

Prune is **disabled** while three empty users exist. So `:25`'s `:disabled="emptyCount === 0 || pruning"`
both over-permits and under-permits, from the same wrong source.

Two riders, both visible in the pasted dialog text: the title never pluralises
(**"Prune 1 empty users?"**) while the description does ("1 user"); and `pruneResult` reports the
server's real number (`Pruned 3 users`) which will not match the promise the operator accepted.

### Cure

A destructive action's stated scope must come from the authority that executes it. Either the server
answers a preview (`GET /admin/users/prune-empty` → `{ count }`) that the dialog quotes and the
button gates on, or the client sends the explicit slug list it just described. Deriving the
description from a view filter and the effect from the whole corpus is the defect; renaming the
computed does not fix it.

---

## C-3 · MAJOR — a total that was never measured; 87 users unreachable

`useAdminUsers.ts:59-60`:

```ts
const res = await listUsers(token, 50);
adminUsers.value = res.data;                 // res.total DISCARDED
```

`AdminPane.vue:31` — `:total-users="pm.adminUsers.value.length"` → panel `:8-10` prints
`{{ totalUsers }} user{{ totalUsers !== 1 ? 's' : '' }}`.

`probe-impl-c8.mjs`, server answers `{ data: 50 rows, total: 137, limit: 50, offset: 0 }`:

```json
"listRequests": ["http://localhost:9077/admin/users?limit=50&offset=0"],
"read": { "countLine": "50 users", "headerBadge": "50", "rowsRendered": 50,
          "paginationControls": [] },
"VERDICT": { "claimsTotal": "50 users", "actualTotal": "137 users",
             "pagingOffered": 0, "unreachableUsers": 87 }
```

The sibling contrast is the proof this is an omission, not a design: `useAdminAudit.ts:62` and
`useAdminFlagged.ts:70` both do `total.value = res.total`, both panels mount `PaginationBar`
(`AdminAuditPanel.vue:83`, `AdminFlaggedPanel.vue:126`), and `PaginationBar.vue` sits **in this
component's own directory, unused by it**. Users is the only admin roster with no second page and
the only one that labels a page size as a population.

**Cure**: consume `res.total`, thread `limit`/`offset` through the existing composable, and mount
the `PaginationBar` that already exists two files away. No new component, no new directory (KISS).

---

## C-4 · MAJOR — a failed disclosure fetch costumes as "No palettes."

`useAdminUsers.ts:154-161`:

```ts
async function loadUserPalettes(slug: string): Promise<Palette[]> {
    const token = getAdminToken();
    if (!token) return [];
    try { return await getUserPalettes(token, slug); }
    catch (e: any) { console.warn("Failed to load user palettes:", e?.message); return []; }
}
```

Failure and emptiness are the same value. The panel has no third branch —
`:135-138` is loading → empty, nothing else — while the roster above it has a full
`loadError` path (`:51-62`).

`probe-impl.mjs` C4, disclosure endpoint answering 500, both engines:

```json
{ "disclosureText": "· NONE PINNED · No palettes.",
  "saysNoPalettes": true, "saysUnreachableOrError": false, "hasRetryButton": false }
consoleErrors: ["Failed to load resource: the server responded with a status of 500 …"]
```

An admin looking at a user with 12 palettes, during a backend fault, is told the user has none —
and the row's badge still says 12 two lines above. The file's own comment at `:49-50` is the
indictment:

> W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never costumes as an empty roster.

The invariant was written for the roster and never carried to the disclosure the same component
owns.

**Cure**: falls out of C-1's keyed-resource composable — `{ palettes, loading, error }` and an
`EmptyState variant="error"` + Retry, the identical pair already at `:51-62`.

---

## C-5 · MAJOR — "0 users" above "The roster is unreachable."

`AdminUsersPanel.vue:5-10`:

```html
<!-- A-3: the count speaks only once the roster resolves — a "0 users" line above three
     loading skeletons is a self-contradiction (totalUsers is 0 before the data arrives). -->
<span v-if="!loading" class="text-mono-small text-muted-foreground">
```

The guard covers `loading` and not `loadError`. In the error state `loading` is false and
`totalUsers` is 0, so the contradiction the comment names is reintroduced verbatim one state over.

`probe-impl.mjs` C1, users endpoint 500, **both engines byte-identical**:

```
mainText  : "Users 0 Manage accounts and permissions. 0 users Prune empty Refresh
             The roster is unreachable. Internal Server Error Retry …"
countLine : "0 users"      hasUnreachable: true      rowsRendered: 0
toolbar   : [{Prune empty, disabled:true}, {Refresh, disabled:false}]
```

The header badge repeats it — `AdminPane.vue:118-121` guards `adminCount` on `pm.loadingUsers`
only, so `Users 0` is printed over an unreachable backend by the same omission in a second file.
Witness `frames-impl/C1-chromium-error-toolbar.png`.

**Cure**: not `&& !loadError` in two places. The roster has four states (unresolved / loading /
error / resolved) modelled as three independent booleans plus a nullable string, which is what lets
"count" exist inside "error". A discriminated union returned by the composable makes the count a
member of the *resolved* variant only, and the contradiction becomes unrepresentable in both
consumers at once.

---

## C-6 · MAJOR — `role="button"` rows containing focusable descendants; no `aria-controls`

`AdminUsersPanel.vue:78-131`: the row div takes `role="button"` + `tabindex="0"` +
`aria-expanded`, and at `:106-131` it **contains** the action cluster — a "Palettes" button and a
"Delete user …" button.

`probe-impl.mjs` C5, **both engines identical**:

```json
[{ "ariaExpanded": "false", "ariaControls": null, "focusableDescendants": 2,
   "descendantLabels": ["Palettes", "Delete user beta-drifter-0002"],
   "accName": "beta-drifte r-0002 2 Palettes" },
 { … "focusableDescendants": 2, "descendantLabels": ["Palettes", "Delete user alpha-keeper-0001"] }]
```

Three defects in one structure:

1. **Nested interactive content** — WAI-ARIA forbids focusable descendants inside `role="button"`
   (axe rule `nested-interactive`, WCAG 4.1.2). AT that flattens button content will not expose the
   two inner controls reliably; this is a DOM-structural fact, identical in both engines, wholly
   independent of Full Keyboard Access.
2. **No `aria-controls`** — `ariaControls: null` on every row. The disclosure region (`:134`) has no
   id and is never associated with the control that toggles it.
3. **The accessible name is computed from contents**, so the disclosure control announces itself as
   `"beta-drifter-0002 2 Palettes"` — it absorbs the label of the destructive button sitting inside
   it. `frames-impl/…` and `probe-impl.json → C5_a11y.rows[].accName`.

The comment at `:70-77` argues the whole row must be the affordance because "there is NO other
keyboard path to a user's palettes". That premise is the thing to fix, not to build on.

**Cure**: hoist the disclosure into a real sibling `<button>` (a chevron carrying
`aria-expanded` + `aria-controls="…"` and its own name), leaving the row a plain container. This is
exactly the `interactive` prop the adjudicated MT-AU1 scope already moves into `AdminListItem.vue`
— it should carry the corrected shape, not the current one.

---

## C-7 · MAJOR — the destructive receipt is unannounced, and the prior action's timer kills it

### Unannounced

`AdminUsersPanel.vue:16-20` — the prune result is a bare `<span>` inside a `Transition`. No `role`,
no `aria-live`, no live ancestor.

`probe-impl.mjs` C5, both engines:

```
C5_beatLiveRegion : []                     ← zero live regions contain the beat text
C5_a11y.liveRegions (within <main>) : 1    ← and it is the OTHER pane's empty plate
```

WCAG 4.1.3 (Status Messages, AA). The contrast inside this one directory settles it: the *loading*
state is announced **three times over** (`AdminListSkeleton.vue:10` `role="status"`, rendered
`v-for="i in 3"` at `:47`), while the result of destroying users is announced **zero** times.
`PaginationBar.vue:17` (`aria-live="polite" aria-atomic="true"`) and `AdminTagsPanel.vue:54`
(`role="status"`) are the correct idiom, two files away.

### Truncated by the previous beat's timer

`AdminUsersPanel.vue:303-309`:

```ts
function onPruneDone(count: number) {
    pruning.value = false;
    pruneResult.value = count > 0 ? `Pruned ${count} …` : "No empty users to prune";
    setTimeout(() => { pruneResult.value = null; }, 3000);   // no handle, never cleared
}
```

Measured (`probe-impl.json → C5_doubleBeat`, both engines), prune stubbed to `{pruned: 0}`:

```
chromium: beat1 "No empty users to prune"  beat2 set at t0+2332ms
          at t0+3350 → present      at t0+4300 → null
webkit  : beat2 set at t0+2045ms
          at t0+3350 → present      at t0+4300 → null
```

Beat 2 was armed at t0+2332 ms and is therefore entitled to live until t0+5332 ms. It is gone by
t0+4300 ms — killed by beat 1's timer, armed at ≈t0+900 ms and never cancelled. Roughly a second of
a destructive action's only receipt, silently removed.

There is also no `onUnmounted` in the file (`grep -c onUnmounted` → **0**), so the closure writes to
a dead ref after unmount within the 3 s window. Harmless today; it is the same missing teardown.

**Cure**: the existing `ActionFeedback.vue` atom already does the `clearTimeout`-before-re-arm
correctly and is the right home — but it must gain the `onUnmounted` teardown it lacks
(`grep -c onUnmounted demo/palettes/browser/card/PaletteCard/ActionFeedback.vue` → **0**) and a
`role="status"` before twelve consumers inherit the hole.

---

## C-8 · MAJOR — one malformed row denies the entire console

`AdminUsersPanel.vue:247-252`:

```ts
function slugHead(slug: string): string {
    return slug.length > SLUG_TAIL ? slug.slice(0, -SLUG_TAIL) : slug;   // unguarded
}
```

`probe-impl-c10.mjs`, one row with `slug: null` (the exact contract violation the repo's own
`e2e/smoke/admin/a11y-authed-admin.spec.ts:100-135` documents):

```
chromium: alert=True  rows=0  bodyLen=125
          "This panel hit an unexpected error. Cannot read properties of null (reading 'length') Try again"
webkit  : alert=True  rows=0  bodyLen=118
          "This panel hit an unexpected error. null is not an object (evaluating 'slug.length') Try again"
```

`ErrorBoundary.vue` catches it (U-F58 is GREEN — recorded), and that is the whole problem: **one bad
row out of fifty takes down the entire admin console** — roster, Prune, Refresh, every delete, gone
(`deleteLabels: []`, `rows: 0`). The panel has no row-level tolerance whatever, and the operator is
shown a raw JS engine string that differs per browser.

**Cure**: the crash belongs to the component, not the boundary. A row whose slug is not a string is
a row the panel should not render (or should render as a flagged, non-actionable row) — the
boundary is the last resort, not the design.

---

## C-9 · MAJOR — an empty slug produces a destructive control named `"Delete user "`

Same probe, `slug: ""`, both engines:

```
rows=1  interactive=1  alert=False
deleteLabels: ["Sort users", "Delete user "]
mainText: "Users 1 … 1 user Prune empty Refresh   1 Palettes …"
```

`:126` `:aria-label="\`Delete user ${user.slug}\`"` yields a trailing-space label; the slug pill
(`:97-101`) renders empty (`slugHead("")` → `""`, `slugTail("")` → `""`), and the confirm dialog's
pill at `:165-169` will render empty too. A destructive control whose accessible name does not
identify its target, and a confirmation that confirms nothing nameable. Not caught by the
`accessible-name` a11y battery leg, which tests for *emptiness*, not for *identifying content*.

---

## C-10 · MINOR — raw `paletteCount` truthiness at the domain boundary

`:81`, `:87`, `:112` branch on `user.paletteCount` raw; `:103` prints `user.paletteCount ?? 0`;
`:241` counts `!(u.paletteCount ?? 0)`. Measured (both engines):

| input | badge | row interactive | "Palettes" bulk-delete offered | counted empty (`:241`) |
|---|---|---|---|---|
| `-1` | `-1` | yes | yes | no |
| `Number.MAX_SAFE_INTEGER` | `9007199254740991` | yes | yes | no |

A negative count makes the row a live disclosure and offers "delete all palettes" for a user with
none; the huge value renders unformatted into a `Badge` sized for two digits.

---

## C-11 · MINOR — duplicate slugs collide in the `v-for` key and in the expansion state

`:67` `:key="user.slug"`. Two rows with `slug: "dupe-0001"` (both engines):

```
rows=2  interactive=2  deleteLabels: ["Sort users", "Delete user dupe-0001", "Delete user dupe-0001"]
```

Duplicate Vue keys, two identically-named destructive controls, and — certain from `:134`
`v-if="expandedUserSlug === user.slug"` — expanding either opens **both** disclosures showing the
same single fetch. Slug uniqueness is a server invariant, so this is a robustness row, not a
correctness one; it is listed because `:67` has a naturally unique alternative to hand and because
C-8 shows the panel's response to contract violations is currently "die".

---

## C-12 · MAJOR (test truth) — no unit test can mount this component, and the e2e would not catch it

Measured:

```
$ grep -c 'plugin-vue\|plugins' vitest.config.ts
0
$ grep -rn 'from ".*\.vue"' test/ demo/test/ | wc -l
0
$ find test demo/test -name '*.ts' | wc -l
25
$ grep -rln '@vue/test-utils' test/ demo/test/ e2e/
(no output)
$ grep -rln 'AdminUsers\|prune' test/ demo/test/
(no output)
```

`vitest.config.ts` declares **no `plugins` key at all**, so `.vue` is untransformable under
`npm test`; `@vue/test-utils@^2.4.10` and `jsdom@^26.1.0` are devDependencies with **zero
importers**. The entire 25-file vitest corpus contains **zero** SFC imports. No component in this
repo has a mounting unit test; this one has none by name either.

The only coverage is three e2e specs. **The exact mutation that keeps them green** — replace
`:241`:

```ts
const emptyCount = computed(() => users.filter((u) => !(u.paletteCount ?? 0)).length);
// →
const emptyCount = computed(() => users.length);
```

The panel now says "Prune 5 empty users?" for a roster of five, enables Prune whenever any user
exists, and prunes globally. `e2e/smoke/admin/flows/user-status.spec.ts` (asserts only that
`DELETE /admin/users/<slug>` fires), both `a11y-authed-admin.spec.ts` battery tests (assert
`nameless == []` and `undersized == []`, both already true — see the negative proof below), the
BR-9 keyboard test (asserts role/tabindex/`aria-expanded`/Enter, all untouched) and the U-F58
boundary test all stay **GREEN**. That is a vacuous gate over the highest-severity behaviour in the
file.

The same mutation-immunity covers C-1 (no spec expands two rows), C-3 (no spec serves a
`total ≠ data.length`), C-4 (no spec fails the disclosure endpoint), C-5 (no spec asserts the
count's absence under `loadError`), C-6 (no leg tests `nested-interactive`) and C-7 (no leg tests
live regions or timer cancellation).

Note also `expect(report.controlsChecked).toBeGreaterThan(0)`, the spec's own guard against an
empty-scope false green: the toolbar's Prune / Refresh / Sort buttons satisfy it **with zero user
rows present**, so it does not do the job it was written for.

---

## C-13 · MINOR (test truth) — the populated admin fixture types against a deleted path and models a response the server never sends

`e2e/smoke/admin/fixtures/admin-populated.ts:22-28` imports from `../../../../demo/@/lib/palette/types`.

```
$ ls demo/@
NO demo/@
$ npx tsc --noEmit --skipLibCheck --ignoreConfig --moduleResolution bundler \
      --module esnext --target es2022 --strict e2e/smoke/admin/fixtures/admin-populated.ts
e2e/smoke/admin/fixtures/admin-populated.ts(28,8): error TS2307:
  Cannot find module '../../../../demo/@/lib/palette/types' or its corresponding type declarations.
$ grep -rn 'e2e' tsconfig*.json
(no output)
```

`e2e/` is in **no** typecheck program (`tsconfig.lib.json` = six `src/subpaths` entries;
`tsconfig.demo.json` = `["demo/", "src/vite-env.d.ts"]`), and the import is type-only so esbuild
erases it — the fixture runs green while its envelope shapes are checked against nothing. The
`Mar-2026` restructure that deleted `demo/@/` left this behind and no gate noticed.

It also **models a response shape the server never emits**: `admin-populated.ts:154`
answers palette DELETE with `json("", 204)`, while `api/src/modules/admin/routes/palettes.ts:41`
returns `c.json({ deleted: true })` (200). I measured the difference by accident — running
`probe-impl-c3b.mjs` with the fixture's 204 first:

| DELETE response | badge before → after | `deleteRequests` |
|---|---|---|
| `204` (fixture's shape) | 2 → **2** (no decrement) | issued |
| `200 {deleted:true}` (server's shape) | 2 → **1** | issued |

Cause: `client.ts:152` ends `adminRequest` with an unconditional `return res.json()`, which throws
`SyntaxError` on an empty 204 body; `useAdminUsers.ts:122-124` catches it and `console.warn`s, so a
**successful** delete is processed as a failure and the list never updates. Against today's server
this is unreachable — hence MINOR — but the fixture is teaching every admin flow spec a path the
production client cannot survive, and it is one route change away from being real.

---

## C-14 · INFO — a hypothesis of mine, REFUTED

I predicted that leaving the Users sub-view mid-prune would destroy the receipt: `AdminPane.vue:25-26`
mounts the panel behind `v-if="subView === 'admin-users'"`, and `usePalettePorts.ts:123` delivers
the result imperatively through `admin.adminUsersPanelRef.value?.onPruneDone(pruned)` into
script-setup state.

`probe-impl-c9.mjs` — prune delayed 1500 ms; switch to `#/admin/names` 200 ms in; return:

```json
"VERDICT": { "receiptWhenStaying": "Pruned 2 users",
             "receiptWhenLeaving":  "Pruned 2 users",
             "RECEIPT_LOST": false }
```

Control (`probe-impl-c9b.mjs`) confirms the navigation was real and not a no-op:

```json
"after": { "hash": "#/admin/names", "head": "Names 0\n\nReview and approve color names.",
           "usersPanelPresent": false }
```

**REFUTED.** The pane-keyed `KeepAlive` deactivates rather than unmounts, so the ref stays bound and
the `?.` call lands. Recorded because it independently corroborates the arbiter's L-1 no-harm
mechanism by a third, live route — and because a challenge seat that reports only its hits is not
reporting.

---

## Negative proof — what I attacked and could not break

Recorded so the next seat does not re-spend the budget:

- **Tap targets and accessible names — this component contributes ZERO defects.**
  `probe-impl.json → C7_mobile`, 390×844, both engines: `under24: []` across **10** visible buttons;
  `docScrollW 390 == innerW 390` (no horizontal overflow); zero nameless buttons. Desktop rows
  measure `56 px` tall, `460 px` wide. The four `smallTapTargets` the visual REPORT charges to
  `/#/admin/users` (`REPORT.json → results[9]`) are **all dock controls** — `Switch to slug` 22×22,
  `Generate new slug` 22×22, `Cancel` 22×22, and a 160×23 `input` — none of them in this file.
  `namelessButtons: 0`, `imgNoAlt: 0`, `overflowX: 0`, `consoleErrors: []`, `pageErrors: []` on that
  route. (The C-9 `"Delete user "` case is a *content*, not *geometry*, defect and is invisible to
  the REPORT's leg, which is why it needed the malformed-input probe.)
- **The named local hazards do not apply.** `grep` over the file: `defineModel` 0 · `ValueUnit` 0 ·
  `parseCssColor` 0 · `requestAnimationFrame` 0 · `addEventListener` 0 · `Observer` 0 ·
  `setInterval` 0 · WebGL 0. No oklch→HSV roundtrip, no reka-ui slider, no pointer capture. The
  PRM-RAF epidemic has no site here.
- **No unbounded growth, no leaked handles.** `userPalettes` is replaced wholesale (`:361`, `:368`,
  `:375`), never appended; `confirmAction` is overwritten per `showConfirm`. The file's only
  scheduled work is the single `setTimeout` at `:308` (C-7).
- **`verbatimModuleSyntax` is satisfied.** `:199` `import type { Palette, User }` is the only
  type-only import and it is correctly marked; no type is imported as a value.
- **The keydown guard at `:344-350` is correct.** `e.target !== e.currentTarget` genuinely prevents
  a nested button's Enter from also toggling the row; the comment at `:337-343` describes real
  behaviour. (It lacks an `e.repeat` guard — `grep -rn '\.repeat' demo/ --include='*.vue' --include='*.ts'`
  returns only two `String.prototype.repeat` hits in a test — so a held Enter re-fires
  expand/collapse and a fetch per repeat. **Labelled a HYPOTHESIS**: I did not drive OS-level key
  auto-repeat and will not assert it unmeasured.)
- **Focus after a destructive confirm lands on `<body>`** (`C6_focusAfter`, both engines:
  `isBody: true`, `rowStillPresent: false`). I am *not* filing this against this component: the
  trigger button is legitimately removed with its row, and focus restoration when a dialog's trigger
  is destroyed belongs to the Glass 7 Dialog family (a **GLASS-OWNED rider** for the standing BH
  relay, INBOX I-20), not to a per-instance workaround here.

---

## Family grouping — the two mechanisms behind eleven rows

Nine of the thirteen product rows reduce to two mechanisms, and both cures are structural:

**Mechanism A — a number or a value is sourced from a different authority than the one that acts on
it.** C-1 (palettes fetched for key X rendered under key Y, deleted against key Y) · C-2 (count from
the view filter, effect from the corpus) · C-3 (count from the page, label claims the population).
Cure: bind the value to its key, and take a destructive action's stated scope from the executor.

**Mechanism B — failure, emptiness and absence are the same value.** C-4 (`catch → return []`) ·
C-5 (`v-if="!loading"` with no error arm) · C-8 (`slugHead` has no non-string arm, so the whole
panel is the arm) · C-9 (empty slug is a valid render). Cure: model the states as a discriminated
union at the composable boundary — resolved / loading / error — so "count" and "empty" cannot be
written in a state that has neither.

The remainder are announcement (C-6, C-7), boundary hygiene (C-10, C-11) and the gate that lets all
of it through (C-12, C-13).

## Owner-edict compliance (implementation axis only)

| edict | finding |
|---|---|
| 1 · no god modules | The file is 391 lines carrying six concerns (toolbar, roster, disclosure, confirm engine, feedback timer, keyboard). C-1/C-4's cure and the adjudicated MT-AU1 scope both remove concerns rather than add. No new god module is created by this file, but it **is** one at the SFC level. |
| 2 · no legacy code | Clean. No shim, alias or dual path in this file. |
| 3 · KISS | C-3's cure reuses the existing `PaginationBar.vue`; C-7's reuses the existing `ActionFeedback.vue`. No new shared dir is required by anything I found. |
| 4 · glass-ui first | The focus-restoration rider (negative-proof section) is correctly glass-owned, not patchable here. |
| 5 · root-level styling | `:99` and `:168` set `color`/`borderColor` inline per instance on `.slug-pill`, whose rule (`demo/styles/foundation.css:585-587`) declares no colour at all. Corroborates the adjudicated L-9 (two transports for one colour concern); no new row filed from this seat. |
| 6 · animations never deleted | Clean — `vj-celebrate` is used, not removed. |
| 7 · idiomatic Vue 3.5 | Reactive props destructure at `:205-220` is correct. `defineModel` unused, so its stale-read hazard does not arise. The `defineExpose` imperative surface at `:389` is the anti-idiom and is already adjudicated (L-1/L-2). |
| 8 · `verbatimModuleSyntax` | Clean (see negative proof). |

## Reproduction index

```
VITE_API_URL=http://localhost:9077 npx vite --port 9077     # :9000 cannot render a row — see disclosure
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl.mjs      # C1,C2,C4,C5,C6,C7 (2 engines)
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c3.mjs   # C1 race        (2 engines)
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c3b.mjs  # C1 consequence
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c8.mjs   # C3 pagination
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c9.mjs   # C14 refuted
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c9b.mjs  # C14 control
node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-impl-c10.mjs  # C8,C9,C10,C11  (2 engines)
```

**Witness-tracking warning (inherits the arbiter's G-8)**: `.gitignore:34` is `*.png`, so every
frame under `frames-impl/` requires `git add -f` to exist in the record. The `.mjs` probes and
`.json` outputs track normally and each carries its own measurements, so no finding above depends on
an untracked image.
