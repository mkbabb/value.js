# CHALLENGE-C — AdminPane implementation audit

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant), the
tier declared at spawn. Not inherited, not undeclared.

**Subject**: `demo/palettes/admin/AdminPane.vue` (135 lines, area `palettes`)
**Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e` (worktree at `e39da983`)
**Date**: 2026-07-28
**Verdict**: **DEFECTIVE** — 12 findings: 2 BLOCKER, 4 MAJOR, 5 MINOR, 1 INFO (vacuous gate).

---

## 0. What I actually ran

Every number in this report is measured. The reproduction artifacts live beside this file.

| artifact | what it is |
|---|---|
| `probe-C-mount.test.ts` + `probe-C-vitest.config.ts` | 7 isolated mounts of the REAL SFC via `@vue/test-utils`, all green |
| `probe-C-search-leak.mjs` | live Chromium: type in **Browse**, walk to **admin/users**, read the admin console |
| `probe-C-populated.mjs` | live Chromium with the populated admin fixture's route mocks; badge/row/prune-dialog reads |
| `probe-C-unauthed.mjs` | live Chromium, unauthenticated `localhost:9000/#/admin/users` |

Isolated-mount run:

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/AdminPane/probe-C-vitest.config.ts
 ✓ docs/.../probe-C-mount.test.ts (7 tests) 37ms
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

Verbatim stdout:

```
C-1 badge=4 rowsRendered=4
C-2 badge=4 rowsRendered=1 totalUsersProp=4
C-3 badgeExists=true text="0"
C-4 title="" bodyControls=0
C-4 html=<div tier="resting" class="pane-scroll-fade …"> <h3 class="stub-head"> <!--v-if--> </h3>
     <div class="px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0"> … <!--v-if--> <!--v-if-->
     <!--v-if--> <!--v-if--> <!--v-if--> <!--v-if--> </div> </div>
C-5 cssColorOpaque prop delivered to AdminNamesPanel = "#abc"
C-6 port.searchQuery after typing in AdminPane = "verdant"
C-7 ariaLive=0 ariaLabelled=0
```

Live-browser note: `localhost:9000` runs `dev:web-only`, so
`demo/platform/transport/availability.ts:112` latches `misconfigured` and **no request is ever
issued** — route mocks cannot fire from a loopback origin. The populated probes therefore drive the
same dev server from its LAN origin `http://192.168.1.166:9000` (`isLoopbackHost()` false ⇒ the
latch stays clear ⇒ the mocks intercept). Nothing was written to the app; every probe is read-only.

---

## 1. The negative proof first — what is NOT wrong

I read the whole file, both direct children (`AdminUsersPanel.vue` 390 L, `AdminNamesPanel.vue`
152 L), the three lazy sibling panels, the injected port (`usePalettePorts.ts` 275 L), both
data composables (`useAdminUsers.ts`, `useColorNameQueue.ts`), the mount host
(`shell/PaneSlot.vue`), the route table (`shell/usePaneRouter.ts`, `shell/viewSchema.ts`), the
server op (`api/src/modules/admin/service/users.ts`), and all 10 admin e2e specs.

The named local hazards are **absent**, verified by reading, not assumed:

- **no `defineModel`** anywhere in the file ⇒ the async-round-trip stale-read class does not apply.
- **no `requestAnimationFrame`**, no `setInterval`, no `setTimeout`, no `addEventListener`, no
  `ResizeObserver`/`IntersectionObserver`, no `onMounted`/`onUnmounted` ⇒ **zero leak surface**;
  there is nothing to clean up and nothing is left uncleaned. `grep -nE 'requestAnimationFrame|addEventListener|setInterval|setTimeout|Observer' demo/palettes/admin/AdminPane.vue` → no matches.
- **no async, no `await`, no fetch** in the component ⇒ no unguarded promise, no race of its own.
- **no `ValueUnit`**, no colour conversion, no oklch↔HSV, no `parseCssColor`, no WebGL, no parsing
  ⇒ the nesting-accumulation, hue-drift, parser-crash and context-loss classes are out of scope here.
- **no reka-ui slider** ⇒ no pointer-capture recovery obligation.
- `verbatimModuleSyntax` (edict 8): the two imports (`vue`, and five component modules) are all
  value imports. **Compliant.**
- Reactive props destructure `const { subView } = defineProps<…>()` (line 90) is the correct Vue 3.5
  idiom (edict 7), and the three `computed()`s read it through the compiler's `__props.subView`
  rewrite, so they stay reactive.
- Visual matrix: **0** page errors, **0** console errors, **0** horizontal overflow, **0** nameless
  buttons, `main` count 1, across all **20** admin captures
  (`REPORT.json`, matrices `safari-{desktop,mobile}-{light,dark}` × 5 admin routes).
- The 4 `smallTapTargets` on every admin route (`160×23` input + three `22×22` buttons) are the
  **dock slug-switcher**, not this pane: the identical four appear on `/#/admin/audit`, which
  renders no `SearchBar`. AdminPane's own search input measures **378×25** — above the 24px floor.
  **AdminPane contributes zero tap-target defects.**

The defects below are all in the *composition*: what this pane chooses to hand its children, what
state it binds to, and what it asserts about the server.

---

## 2. Findings

### C-1 · BLOCKER — the pane hands a FILTERED list to a panel that sizes a GLOBAL destructive op from it

**Evidence.**

`AdminPane.vue:28` and `:33` deliberately split the two denominators:

```vue
:users="pm.filteredAdminUsers.value"      <!-- line 28: the search-filtered subset -->
:total-users="pm.adminUsers.value.length" <!-- line 33: the unfiltered roster size -->
```

`AdminUsersPanel.vue:241` derives the prune scope from the **filtered** prop:

```ts
const emptyCount = computed(() => users.filter((u) => !(u.paletteCount ?? 0)).length);
```

and prints it into the irreversible-confirm copy (`AdminUsersPanel.vue:290-291`):

```ts
title: `Prune ${emptyCount.value} empty users?`,
description: `This will permanently delete ${emptyCount.value} user…`,
```

The server op is **global and unfiltered** — `api/src/modules/admin/service/users.ts:228-250`:

```ts
export async function pruneEmptyUsers(services, actorSlug): Promise<number> {
    const slugs = await users.findEmptyUserSlugs();   // ← every empty user, no filter argument
    …
    const deleted = await services.withTransaction(async (session) => {
        await sessions.deleteByUserSlugs(slugs, session);
        return users.deleteMany(slugs, session);
    });
```

**Reproduction** (`probe-C-populated.mjs`, 4 seeded users, 2 of them empty):

```
=== 4. UNFILTERED prune dialog copy ===
Prune 2 empty users? This will permanently delete 2 users with 0 palettes and their sessions.
This cannot be undone. Cancel Prune

=== 5. FILTERED ('verdant') prune dialog copy — server prunes 2, dialog says? ===
Prune 1 empty users? This will permanently delete 1 user with 0 palettes and their sessions.
This cannot be undone. Cancel Prune
```

A confirm dialog for an **un-undoable cross-collection delete** (users + their sessions, in one
transaction) states **1** while the click deletes **2**. The understatement is
`|global empty| − |filtered empty|`, unbounded. Note that the filter need not even be typed by the
admin — see C-2; a query left in the Browse pane produces exactly this state.

The same wiring also *hides* the operation: with `azure` in the query, the probe measured
`pruneDisabled: true` while two empty users exist — the admin sees a greyed-out "Prune empty" with
no explanation, and the toolbar's `· 2 empty` segment vanishes while the `4 users` line beside it
(fed from the unfiltered `totalUsers`) does not. Two halves of one sentence, two denominators.

**Mechanism.** A destructive-scope count crossing a prop boundary whose filtering semantics are not
part of the contract. `AdminPane` is the only site that sees both lists, and it hands the panel the
one that does *not* match the server op.

**Cure (gestalt, not patch).** The panel must not compute destructive scope at all. Move the prune
scope to the port as a first-class, filter-independent cell — `pm.emptyUserCount` derived from
`adminUsers` (never `filteredAdminUsers`) — and let `AdminUsersPanel` render it. Better still,
have the server return the prune preview (`GET /admin/users/prune-empty/preview → { count }`) so
the confirm quotes the number the transaction will actually use, closing the client/server drift by
construction. Then the filtered/unfiltered pair stops crossing the boundary at all: the panel gets
one list to render and one count to confirm against.

---

### C-2 · BLOCKER — the admin console's search field is not its own state; it is one global ref shared with two other panes

**Evidence.**

`usePalettePorts.ts:54` creates **one** module-scope ref and exports it through **three** ports —
`libraryPort.searchQuery` (`:141`), `browsePort.searchQuery` (`:183`), `adminPort.searchQuery`
(`:224`). Three components bind it as a two-way model:

| file:line | binding |
|---|---|
| `demo/palettes/admin/AdminPane.vue:13` | `v-model="pm.searchQuery.value"` |
| `demo/palettes/PalettesPane.vue:34` | `v-model="pm.searchQuery.value"` |
| `demo/palettes/BrowsePane.vue:11` | `v-model="pm.searchQuery.value"` |

Nothing ever resets it: `grep -rn 'searchQuery.value = ' demo/` returns **no assignment site** —
the ref is written only by the three `v-model`s.

`viewSchema.ts:188-232`: **every** admin view declares `right: "palettes"`. On desktop that means
`AdminPane` and `PalettesPane` are mounted **side by side**, each rendering a `SearchBar` bound to
the same cell. The shipped Safari capture shows both fields in one frame:
`audit/visual/shots/safari-desktop-light/admin-users.png` — "Search users…" (left) and
"Search your palettes…" (right).

**Reproduction A — two visible fields, one state** (`probe-C-unauthed.mjs`, live `localhost:9000`):

```
AFTER typing ONLY in the admin search box:
 "inputs": [ {"ph":"enter slug or token...","val":""},
             {"ph":"Search users...","val":"zzz-no-such-user"},
             {"ph":"Search your palettes...","val":"zzz-no-such-user"} ]
```

and it survives the sub-view switch:

```
AFTER subview switch to admin-names:
 "inputs": [ …, {"ph":"Search color names...","val":"zzz-no-such-user"},
                {"ph":"Search your palettes...","val":"zzz-no-such-user"} ]
```

**Reproduction B — the leak INTO the admin console** (`probe-C-search-leak.mjs`, populated):

```
A1 browse after typing 'azure':
 {"hash":"#/browse","inputs":["Search the commons...=\"azure\"","Search your palettes...=\"azure\""], …}

A2 ARRIVED at admin/users (admin typed NOTHING):
 {"hash":"#/admin/users",
  "inputs":["Search users...=\"azure\"","Search your palettes...=\"azure\""],
  "left":"Users 4 Manage accounts and permissions. 4 users Prune empty Refresh azure- fox-01 4 Palettes"}
```

The admin opens the console and finds it **already filtered to one of four users** by a string
typed in a different pane, minutes earlier, with the badge still reading 4 and the prune affordance
silently disabled (C-1). `probe-C-mount.test.ts` C-6 confirms the write direction in isolation:
typing in AdminPane's field mutates the injected port cell (`port.searchQuery = "verdant"`).

The code even records that the team saw the twin and fixed only its label —
`PalettesPane.vue:25-27`: *"S.W5-7: the twin placeholder ("Search palettes..." in BOTH side-by-side
panes) is scoped — this one owns YOUR list."* The **placeholder** was scoped. The **state** was not.

**Mechanism.** A cross-cutting UI cell promoted to shared module state because three consumers
happened to want "a search box". `usePalettePorts.ts:22-31` describes the file as the dissolution
of a god facade into five narrow ports; `searchQuery` is the god facade's last surviving member,
re-aggregated into three of the five.

**Cure.** Each search surface owns its own query. Keep one `useFilteredList` helper (already exists,
`useFilteredList.ts`) and give each pane a local `ref("")` fed into it — `adminUserQuery`,
`colorNameQuery`, `libraryQuery`, `browseQuery` — living beside the list each one filters. The
Browse pane's debounced server reload (`usePaletteWiring.ts:159-166`) then watches its own cell
instead of a global one, and the `currentView === "browse"` guard inside that watcher — which
exists solely to stop the *other* panes' typing from firing network requests — disappears with it.
That guard is the tell: the shared cell was already being worked around.

---

### C-3 · MAJOR — the header badge counts a different set than the pane body renders

**Evidence.** `AdminPane.vue:117-131`:

```ts
case "admin-users":
    return pm.loadingUsers.value ? null : pm.adminUsers.value.length;   // UNFILTERED
```

while line 28 renders `pm.filteredAdminUsers.value`. The `admin-names` arm two lines below uses the
**filtered** list (`pm.filteredColorQueue.value.length`) — the same computed applies two opposite
rules to its two data arms.

**Reproduction** — isolated mount, `probe-C-mount.test.ts` C-2:

```
C-2 badge=4 rowsRendered=1 totalUsersProp=4
```

and live, `probe-C-search-leak.mjs` A2: header `Users 4`, one row (`azure-fox-01`) on screen.

**Mechanism.** Two denominators for one count, chosen per-arm rather than by a stated rule.
Line 126's comment (`S.W5-7 (F-12): the header badge is the ACTIONABLE queue — the old
pending+approved sum matched neither visible list`) records the rule for `admin-names`; the
`admin-users` arm violates the very rule the comment states.

**Cure.** One rule, stated once: the badge counts **what the body renders**. Both arms read the
filtered collection. If the unfiltered roster size is also wanted it is a *second*, separately
labelled datum, not the same numeral in a different place — and note the panel already prints it
(`AdminUsersPanel.vue:8-10`, `{{ totalUsers }} user…`), so the header Badge is a third rendering of
a number that already appears twice on the same card.

---

### C-4 · MAJOR — a never-attempted load renders as an authoritative zero: the unauthenticated admin console fabricates server state

**Evidence.** `useAdminUsers.ts:54-57` returns **before** touching either state cell when there is
no admin token:

```ts
async function loadAdminUsers() {
    const token = getAdminToken();
    if (!token) return;                  // ← loadingUsers untouched, usersLoadError untouched
    loadingUsers.value = true;
```

`AdminPane.vue:121-122` guards the badge on `loadingUsers` **only**:

```ts
// A-3: suppress the badge while the roster/queue loads — a "0" over
// the loading skeletons lies (the length is 0 before data arrives).
case "admin-users":
    return pm.loadingUsers.value ? null : pm.adminUsers.value.length;
```

Never-attempted is neither *loading* nor *error*, so it falls through to the success rendering.

**Reproduction** — live, unauthenticated, `probe-C-unauthed.mjs` against `localhost:9000`:

```
"panes": [
 "Users 0 Manage accounts and permissions. 0 users Prune empty Refresh · ROSTER CLEAR · No users found.",
 …]
```

and in the shipped visual matrix, both schemes and both form factors:
`shots/safari-desktop-light/admin-users.png` (dock reads **Login** — no admin session) and
`shots/safari-mobile-dark/admin-users.png`, both rendering `Users ⓪` / `0 users` /
`· ROSTER CLEAR · No users found.` The mobile dock shows no "Login" affordance at all, so a mobile
visitor gets **zero** signal that the zero is fictional.

Isolated confirmation, `probe-C-mount.test.ts` C-3: `badgeExists=true text="0"`.

**Mechanism.** A tri-state (`loading | error | data`) rendered from a four-state world
(`never-attempted | loading | error | data`). The A-3 comment names the exact failure — *"a '0' over
the loading skeletons lies"* — and the guard it authorises misses the one path that produces the lie
in production.

**Cure.** Make the fourth state real, in the port, not in the pane: `usersLoadState:
"idle" | "loading" | "error" | "loaded"` on `useAdminUsers`, set to `"idle"` when the token check
fails. AdminPane suppresses the badge on anything but `"loaded"`, and `AdminUsersPanel` renders an
unauthenticated `EmptyState` (`variant="error"`, "Sign in as an administrator to view the roster")
instead of "roster clear". A console that cannot see the server must say so; it must never speak
for it. This also disarms the "Prune empty"/"Refresh" buttons that currently render live to an
anonymous visitor.

---

### C-5 · MAJOR — the pane has no live region, and its heading's accessible name mutates with async data

**Evidence.** `probe-C-mount.test.ts` C-7, isolated:

```
C-7 ariaLive=0 ariaLabelled=0
```

and live on the **populated** console (`probe-C-populated.mjs`): `"liveRegions": 0`.

Everything on this pane arrives asynchronously — the badge count, the roster, the error state, the
queue — and none of it is announced. Screen-reader users get silence between "Users" and a
fully-populated table.

Second half: `PaneHeader.vue:22` is `<h3 class="pane-header-title font-display"><slot /></h3>`, and
AdminPane puts **both** the title and the `<Badge>` in that slot (`AdminPane.vue:4-5`). The
heading's accessible name is therefore the concatenation, and it *changes* when data lands.
Measured live:

```
"headings": ["H3 · Users 0", "H3 · My Palettes"]     (unauthenticated)
"badgeHeading": "Users 4"                            (populated)
```

A heading whose name is `Users 0` on arrival and `Users 4` a second later is an unstable landmark
for heading-navigation, and it is why `admin-walk.spec.ts`'s `getByRole("heading", { name: "Users" })`
passes at all — Playwright's `name` option is substring-by-default.

**Mechanism.** Async status rendered as decoration rather than as announced state; a numeric datum
placed inside a heading's naming slot.

**Cure.** The count leaves the heading and becomes a labelled, polite status beside it —
`<p role="status" aria-live="polite">{{ adminCount }} users</p>` — which simultaneously kills the
triple rendering noted in C-3 (header Badge + panel `N users` line + heading name) by leaving
exactly one. Since glass-ui is the design system (edict 4), the right home is a `Badge` variant
that already carries `role="status"`, not a per-instance `aria-live` sprinkled in demo/.

---

### C-6 · MINOR — no `h1` on any admin route; the pane title is an `h3`

**Evidence.** `REPORT.json` `counts.h1 = 0` on **all 60** captures; measured live:
`{"h1": 0, "headings": ["H3 · Users 0", "H3 · My Palettes"]}`. The document's first heading is an
`<h3>` (`PaneHeader.vue:22`), with no `h1` or `h2` above it.

**Mechanism.** Inherited from `PaneHeader`, shared by all 9 panes — AdminPane's contribution is
that it is the page's primary content and still opens at level 3.

**Cure.** Belongs to `PaneHeader` (level as a prop, or `h1` for the left/primary pane and `h2` for
the right), not to AdminPane. Filed here for the cross-component ledger, not as this pane's repair.

---

### C-7 · MINOR — a prop is delivered to a child that never reads it

**Evidence.** `AdminPane.vue:52` passes `:css-color-opaque="cssColorOpaque"`.
`AdminNamesPanel.vue:140` declares it. `grep -n 'cssColorOpaque' demo/palettes/browser/admin/AdminNamesPanel.vue`
returns **exactly one line — the declaration**. It is read nowhere in the template or the script.

Measured delivery, `probe-C-mount.test.ts` C-5: `cssColorOpaque prop delivered to AdminNamesPanel = "#abc"`.

**Mechanism.** A prop that outlived its consumer — dead surface area that makes the child re-render
on every colour change of the picker for no rendered effect.

**Cure.** Delete the prop at both ends. (No-legacy edict 2: unused contract members are not kept
"in case".)

---

### C-8 · MINOR — the pane titles are a second source of truth for names `viewSchema` already owns, and they have already drifted

**Evidence.** `AdminPane.vue:97-105` hardcodes five titles. `viewSchema.ts:188-232` already owns
them per view:

| view | `viewSchema.label` | `viewSchema.leftLabel` | `AdminPane.headerTitle` |
|---|---|---|---|
| admin-users | `Users` | `Users` | `Users` |
| admin-names | `Names` | `Names` | `Names` |
| **admin-audit** | **`Audit Log`** | **`Audit`** | **`Audit Log`** |
| admin-flagged | `Flagged` | `Flagged` | `Flagged` |
| admin-tags | `Tags` | `Tags` | `Tags` |

Three strings for one concept, two of which already disagree.

**Mechanism.** Duplicated naming authority across the route table and the pane.

**Cure.** The pane reads its own name from the route table it is already routed by — pass
`label`/`description` down with `subView` in `usePaneRouter.leftProps()` (which already builds the
props object at `usePaneRouter.ts:140`), or inject the current `ViewConfig`. The description strings
belong there too, next to `icon` and `accentHueShift`, which are already view metadata.

---

### C-9 · MINOR — the imperative panel back-channel: a string template ref aliased onto an injected module-scope ref

**Evidence.** `AdminPane.vue:27` and `:134`:

```vue
<AdminUsersPanel ref="adminUsersPanelRef" … />
```
```ts
// Sync the admin panel ref for prune operations
const adminUsersPanelRef = pm.adminUsersPanelRef;
```

`pm.adminUsersPanelRef` is created in `useAdminUsers.ts:27` — module-scope, outliving every mount —
and is poked imperatively from **four** sites in the composable plus one in the port:

| site | call |
|---|---|
| `useAdminUsers.ts:99` | `adminUsersPanelRef.value?.updatePaletteTier(slug, tier)` |
| `useAdminUsers.ts:121` | `adminUsersPanelRef.value?.removeUserPalette(slug)` |
| `useAdminUsers.ts:136` | `adminUsersPanelRef.value?.clearUserPalettes(slug)` |
| `useAdminUsers.ts:150` | `adminUsersPanelRef.value?.clearUserPalettes(slug)` |
| `usePalettePorts.ts:123` | `admin.adminUsersPanelRef.value?.onPruneDone(pruned)` |

Two problems. (a) **Idiom**: edict 7 names `useTemplateRef` as the Vue 3.5 form; this is the string
ref, and it only works because the compiler classifies `const x = pm.y` as a *maybe-ref* setup
binding and the runtime's `proxyRefs` setter happens to unwrap it. It functions by runtime
introspection, not by declaration. (b) **Architecture**: the panel owns `userPalettes` privately
(`AdminUsersPanel.vue:237`) and the composable reaches through five `?.` optional calls to keep it
consistent — every one of which silently no-ops if the ref is null. That is the god-facade
remnant `usePalettePorts.ts:22-31` claims to have dissolved.

**HYPOTHESIS (not reproduced).** With `PaneSlot`'s `<KeepAlive :max="6">` (desktop-left,
`App.vue:105`) and 11 distinct left panes, an evicted AdminPane unmounts and Vue nulls the shared
ref; a `prune` whose response lands after that eviction loses its `onPruneDone` report. I could not
manufacture the eviction window on the live server, so this is labelled a hypothesis, not a finding.

**Cure.** The expanded-user palette list is port state, not panel state. Move `userPalettes` /
`expandedUserSlug` into `useAdminUsers`, and the five imperative pokes become ordinary reactive
updates — the ref, the `defineExpose` (`AdminUsersPanel.vue:389`) and this line 134 alias all
disappear together.

---

### C-10 · MINOR — an out-of-union `subView` renders a completely blank card, and the type system cannot see the crossing

**Evidence.** `usePaneRouter.ts:107` types the props hand-off as `Record<string, unknown>`, builds
`{ subView: name }` from a plain `string` at `:140`, and `PaneSlot.vue:125` spreads it with
`v-bind="liveProps"`. AdminPane declares a 5-member union (`AdminPane.vue:91`). **Nothing checks the
join** — not `vue-tsc`, not the runtime (no prop `validator`).

**Reproduction** — isolated mount with `subView="admin-webhooks"`, `probe-C-mount.test.ts` C-4:

```
C-4 title="" bodyControls=0
C-4 html=… <h3 class="stub-head"> <!--v-if--> </h3> <div class="px-4 …">
     <!--v-if--> <!--v-if--> <!--v-if--> <!--v-if--> <!--v-if--> <!--v-if--> </div>
```

An empty heading and six `v-if` comments: a titleless, bodyless, silent card. `componentFor()`
routes **any** `admin-*` name here (`usePaneRouter.ts:93`), so a sixth admin view added to
`viewSchema` without touching this file ships that blank card.

**Not reachable today** — `viewSchema.ts` exposes exactly the five, and `isViewId` gates the hash —
so this is latent, and labelled as such.

**Cure.** Type the crossing instead of asserting it: give `PaneSlot` a generic props type, or
derive AdminPane's union from the schema (`Extract<ViewId, \`admin-${string}\`>`) so adding a view
to `viewSchema` is a compile error here until the pane handles it. Deriving is the KISS move — the
union is already written down once.

---

### C-11 · MINOR — the three lazy panels load on `onMounted` under `<KeepAlive>`, so a revisited audit log is silently stale

**Evidence.** `PaneSlot.vue:120` wraps the pane in `<KeepAlive :max="max">`; deactivation is not
unmount, so `onMounted` never runs again. All three panels load there and only there:
`AdminAuditPanel.vue:119`, `AdminFlaggedPanel.vue:152`, `AdminTagsPanel.vue:125`. `onActivated`
appears nowhere: `grep -rn 'onActivated' demo/` → no matches.

**Reproduction** (`probe-C-search-leak.mjs`, section B, populated):

```
B1 audit first mount:  "left":"Audit Log View admin action history. 1 entry PALETTE.FEATURE …"
  audit hits: 1
B2 audit re-visited:   "left":"Audit Log View admin action history. 1 entry PALETTE.FEATURE …"
  audit hits after return: 1
ALL: ["GET /colors/approved","GET /palettes","GET /colors/tags","GET /palettes",
      "GET /admin/users","GET /admin/audit","GET /admin/tags"]
```

One `GET /admin/audit` across mount → leave → return. A pane AdminPane titles *"Audit Log — View
admin action history"* can show an arbitrarily old ledger after the admin performs the very actions
it logs. Mitigated (not cured) by each panel's manual Refresh button.

**Mechanism.** Mount-scoped fetching under an activation-scoped host. AdminPane is the mount site
that composes all three under `v-if` with no activation contract.

**Cure.** One rule for the whole admin surface, owned by the port: a `staleAfter` timestamp per
collection and an `onActivated` refresh in the panels (or, better, hoist activation-refresh into
`PaneSlot` as an `onActivate` callback beside the existing `onMount` one — the seam already exists
at `PaneSlot.vue:52`). Do not add a fourth caching discipline: the roster is guarded by
`length === 0`, approved by `!approvedLoaded`, the three panels by mount, and browse by an
unguarded reload (`usePaletteWiring.ts:143-153`).

---

### C-12 · INFO — vacuous gate: the badge, the counts and the descriptions are untested

**Evidence.** I enumerated every assertion in all 10 admin e2e specs
(`grep -rn 'await expect\|expect(' e2e/smoke/admin/`, 58 assertions). **None** reads the header
Badge, a count, or a description. There is no vitest unit test for AdminPane
(`find demo/test test -iname '*admin*'` → only `test/demo/palettes/api/admin-palettes.test.ts`, an
API-client test). The description strings appear in no test at all:

```
$ grep -rn "Manage accounts and permissions\|Review and approve color names\|View admin action history\
\|Review reported palettes\|Manage palette tag taxonomy" e2e/ test/ demo/test/
(no output)
```

**Mutations that keep the entire suite green:**

1. **Delete `AdminPane.vue:5` and lines 117–131 entirely** — the whole `<Badge>` and the
   `adminCount` computed, 16 lines encoding two named rulings (A-3 and S.W5-7 · F-12). Green.
2. Swap `pm.adminUsers` ↔ `pm.filteredAdminUsers` in `adminCount` (either direction), or return a
   constant `0`. Green.
3. Replace all five `headerDescription` strings with `""`. Green.
4. Delete `:css-color-opaque` (line 52) or `:total-users` (line 33). Green — the missing required
   prop raises `console.warn`, and `admin-populated.spec.ts:33` only fails on `console.error`.

Only `headerTitle` is gated, by `admin-walk.spec.ts`'s five `getByRole("heading", { name })` rows —
and even that passes with the badge concatenated in, because Playwright's `name` matching is
substring-by-default.

**Cure.** A single mounted unit test (`probe-C-mount.test.ts` is a working template) asserting the
badge/body invariant — *the badge equals the number of rows the body renders* — plus the
never-attempted suppression. That one assertion would have failed C-3 and C-4 on the day they
landed.

---

## 3. Strongest defect

**C-1.** Everything else on this pane is a lie about a number; C-1 is a lie about a number that
governs an irreversible, cross-collection, server-global delete. Measured: the confirm dialog says
*"Prune 1 empty users? … This cannot be undone."* while `pruneEmptyUsers` deletes **2** users and
their sessions in one transaction — and via C-2 the filter that causes the understatement can be a
string the admin typed into a completely different pane and forgot about.

---

## 4. Defect families (for the arbiter)

| family | findings | one-line shape |
|---|---|---|
| **denominator drift** | C-1, C-3 | a filtered and an unfiltered collection cross the same boundary; the wrong one reaches the count |
| **shared mutable UI state** | C-2 | one module-scope ref serves three simultaneously-visible fields; never reset |
| **missing fourth state** | C-4 | `never-attempted` rendered through the `loaded` path |
| **async state unannounced / mis-homed** | C-5, C-6 | no live region; a count inside a heading's naming slot; no `h1` |
| **dead & duplicated surface** | C-7, C-8 | an unread prop; three sources for one name, already drifted |
| **imperative back-channel** | C-9 | panel-private state repaired by five optional method pokes through a global ref |
| **untyped / unbounded contract** | C-10, C-11 | props crossing as `Record<string, unknown>`; four caching disciplines on one surface |
| **vacuous gate** | C-12 | the two rulings this file cites are enforced by nothing |

## 5. Files

- Subject: `/Users/mkbabb/Programming/value.js/demo/palettes/admin/AdminPane.vue`
- Probes: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminPane/probe-C-{mount.test.ts,vitest.config.ts,search-leak.mjs,populated.mjs,unauthed.mjs}`
- This report: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminPane/challenge-C-implementation.md`

No source file was edited. No `INBOX.md`, no `scripts/dev/dev.sh`, no `vnext/**` was touched.
