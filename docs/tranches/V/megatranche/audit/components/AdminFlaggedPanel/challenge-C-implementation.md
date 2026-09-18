# CHALLENGE-C · `AdminFlaggedPanel.vue` — the implementation is defective

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

- Subject: `demo/palettes/browser/admin/AdminFlaggedPanel.vue` (153 L) + its port
  `demo/palettes/useAdminFlagged.ts` (150 L)
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. **HEAD at read time was
  `e39da983`, not the `c654824e` in the work-order** — the branch moved under the formation; every
  line number below is against `e39da983`.

---

## Verdict — **DEFECTIVE**

Fifteen defects, **nine of them MAJOR or above**, every one of them *executed* — 19 reproductions
run and pasted below (8 SFC-mount, 6 composable, 1 DOM, 4 a11y), plus a real-Mongo probe of the
server aggregation and the live Safari capture.

The panel's own comments are the indictment. It carries five in-code claims — *"error ≠ empty — a
dead backend never costumes as a clear moderation queue"* (L20-21), *"a null palette is a DELETED
palette — never a silent bare slug with an empty strip"* (L68-70), *"the pair weighted
asymmetrically… the delete is a QUIET icon… never its equal-weight red twin"* (L86-89) — and **all
three are false at runtime**. The first is false through the auth path *and* through the render
chain; the second is dead code that the wire shape can never reach; the third describes a visual
hierarchy that `glass-ui@7`'s Button API cannot express from the props this file passes.

**Strongest single defect: F-3.** The Delete button does not clear the flag queue. The server
soft-deletes the palette and never touches the `flags` collection, while the panel optimistically
splices the row out of the local list — so a moderator deletes an abusive palette, watches it
vanish, and on the next refresh it is *back, fully populated, looking alive*. Proven end-to-end
below.

---

## What I actually ran

| # | Probe | Result |
|---|---|---|
| 1 | Real MongoDB (`mongodb-memory-server`, the repo's own dep) driving the **exact** `aggregateFlaggedPalettes` pipeline | wire shape is `palette: {}`, and soft-deleted palettes still join |
| 2 | `@vue/test-utils` mount of the real SFC, 8 states | R1-R7 all confirmed |
| 3 | The real `useAdminFlagged` composable with the api module mocked, 6 scenarios | C1-C6 all confirmed |
| 4 | Rendered-DOM dump of every `<button>` the panel emits | `variant` is a dead attribute |
| 5 | a11y mount probes (focus, live regions, confirmation) | A1-A4 all confirmed |
| 6 | Live Safari capture + `REPORT.json` row for `/#/admin/flagged` | the false-empty, on screen |
| 7 | Live Chrome/Playwright against `http://localhost:9000` | route renders; API latch is dev-misconfigured (see H-1) |

Runnable sources for 1-5 are in the appendix; they were executed from the scratchpad, **no repo
file was created or modified** outside this directory.

---

## Findings

| ID | Sev | Defect |
|---|---|---|
| **F-1** | **MAJOR** | No admin token ⇒ zero requests, zero error, and the panel *asserts* an empty moderation queue |
| **F-2** | **MAJOR** | The wire never sends `palette: null` — it sends `palette: {}`; the "palette deleted" cure is unreachable dead code |
| **F-3** | **MAJOR** | Delete does not clear the queue: no server-side flag cascade + optimistic local splice ⇒ the row returns on refresh, looking alive |
| **F-4** | **MAJOR** | The row `v-for` is outside the `v-if/v-else-if` chain ⇒ "The flag queue is unreachable." renders *on top of* a live, clickable moderation list; skeletons render on top of stale rows |
| **F-5** | **MAJOR** | Emptying the last page strands the panel: 0 rows, `total` 20, and `PaginationBar` unmounts — no control back |
| **F-6** | **MAJOR** | No request identity: an out-of-order response paints the **wrong page**; double-clicking Next skips a page |
| **F-7** | **MAJOR** | A failed Dismiss/Delete is invisible — `console.warn` only, no error state, no announcement |
| **F-8** | **MAJOR** | `variant="outline"/"ghost"` is not a `glass-ui@7` Button prop; all three buttons render `data-emphasis="secondary" data-tone="neutral"` — the F-8 "asymmetric weighting" comment describes a DOM that does not exist |
| **F-9** | **MAJOR** | One click permanently deletes a user's palette — no confirmation, while the sibling panel in the same directory confirms the *same* operation |
| **F-10** | **MAJOR** | Vacuous gate: 0 unit tests; the e2e asserts only that a name and a Dismiss button are *visible*. Six named mutations keep it green |
| **F-11** | MINOR | `formatDate` renders the literal `"Invalid Date"`; its `try/catch` is dead code |
| **F-12** | MINOR | Loading emits **two** identical `role="status"` "Loading" regions; the wrapper's `aria-label` sits on a role-less `div` (ignored by AT) |
| **F-13** | MINOR | Removing a row strands focus on `<body>` |
| **F-14** | MINOR | The flag-count badge is a bare unlabelled number; the toolbar count contradicts the A-3 precedent |
| **F-15** | MINOR | Per-instance styling + inline `style` where the design system and a token exist (edicts 4, 5) |

---

### F-1 · MAJOR — an unauthenticated visitor is told the moderation queue is empty

`useAdminFlagged.ts:59-62`

```ts
async function loadFlagged() {
    const token = getToken();
    if (!token) return;          // ← no request, no error, no state
```

`loading` stays `false`, `loadError` stays `null`, `items` stays `[]` — so the template falls
through `v-if`(L16) → `v-else-if`(L22) → **`v-else-if="items.length === 0"`(L37)** and paints the
TRUE-EMPTY plate: eyebrow `· nothing flagged ·`, statement `No flagged palettes.`, and the toolbar
counts **`0 flagged`**.

**Reproduction (executed):**

```
C5 requests = 0 | loading = false | loadError = null | items = 0 → template branch = "No flagged palettes."
```

**And it is already on film.** `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-flagged.png`
— an unauthenticated Safari, rendering `0 flagged` · `· NOTHING FLAGGED ·` · `No flagged palettes.`
with `REPORT.json → results[/#/admin/flagged].consoleErrors: []` and `failedRequests: []`. Not one
request was issued; the confident claim was manufactured locally.

This is precisely the P0 the file's own L20-21 comment forbids, arriving through the door the
comment did not watch. The panel is not auth-gated either (`AdminPane.vue:64` mounts it on route
alone), so this is the *default* state for every non-admin who reaches `/#/admin/flagged`.

**Family:** identical guard at `useAdminAudit.ts:49-50`, `useAdminUsers.ts:56`, and six more sites
in `useAdminUsers.ts` (73, 84, 107, 118, 133…).

**Cure:** the composable must model *unauthenticated* as a state, not as an early return. See the
gestalt cure below — one discriminated `state`, five exhaustive render arms.

---

### F-2 · MAJOR — the wire shape is `{}`; the "palette deleted" branch is dead code

`AdminFlaggedPanel.vue:68-75` believes the client type at `demo/palettes/types.ts:110-115`:

```ts
export interface FlaggedPalette {
    palette: Palette | null;      // ← a lie about the wire
```

The server's aggregation (`api/src/modules/palette/repository/flag.ts:71-115`) `$project`s a
*computed sub-document*:

```js
palette: { name: "$palette.name", slug: "$palette.slug", colors: "$palette.colors", … }
```

When the `$lookup` misses, every sub-expression resolves to *missing*, and MongoDB emits the key as
an **empty document** — never `null`, never absent.

**Reproduction (executed against real MongoDB, the exact pipeline copied verbatim):**

```
slug=p1  'palette' in row = true  palette={"name":"Alive",…}  Boolean(palette)=true
   → template v-if="!item.palette" fires: false | header renders: Alive
slug=p2  'palette' in row = true  palette={"name":"SoftDeleted",…}  Boolean(palette)=true
   → template v-if="!item.palette" fires: false | header renders: SoftDeleted
slug=p3  'palette' in row = true  palette={}  Boolean(palette)=true  name=undefined
   → template v-if="!item.palette" fires: false | header renders: p3
```

Fed that shape, the real component renders (executed):

```
R3 text = "1 flagged sunset-riot-9a3f2 Dismiss spamjunkJul 4"
R3 swatch count = 0
```

— a **bare slug with an empty strip and no annotation**: verbatim the thing L68-70 says must never
happen. And R3b proves the branch itself is correct — fed the *declared* `palette: null`, the
annotation appears. The cure was written against a shape the backend has never sent.

**Cure:** stop branching on object truthiness. Either fix the projection
(`$cond`/`$ifNull` → real `null`) or branch on a field that only a live palette has
(`item.palette?.slug`), and correct the client type to the wire (`palette?: Partial<Palette>`).
Both halves are in this repo; ship them together or the annotation stays dead.

---

### F-3 · MAJOR — Delete does not clear the queue (and the panel lies that it did)

Three facts, each from source:

1. `useAdminFlagged.ts:93-103` — on success it **splices the row locally** and decrements `total`.
   No reload, no server truth.
2. `api/src/modules/admin/service/palettes.ts:53-79` — `deletePalette` soft-deletes the palette and
   **never touches `flags`**. (Its own module docstring, L6, claims *"delete palette + cascade
   votes/flags"*. The cascade does not exist in the function.)
3. `api/src/modules/palette/repository/flag.ts:88-95` — the `$lookup` joins on `slug` with **no
   `deletedAt` filter**, so a soft-deleted palette still joins *fully populated*.

So `total` (server-side `countDistinctPalettes()` over `flags`) is **unchanged** by a delete, and
the next `loadFlagged()` returns the identical row — with its name, its colours and its owner
intact, indistinguishable from a live palette.

**Reproduction (executed):**

```
C6 after delete → items = 0 | total = 0
C6 after refresh → items = 1 | total = 1
```

and the "looks alive" half is the `p2` row of the Mongo probe above (`deletedAt` set, joined with
`name:"SoftDeleted"`, `colors:[…]`).

**Consequence:** the flag queue is unclearable by its own primary destructive action. A moderator
who deletes an abusive palette sees success, and every later visit re-presents the same report as
untriaged. The only way to clear it is Dismiss — which is the *opposite* verdict.

**Cure:** moderation actions must be server-truthed — `await` the mutation, then `loadFlagged()`
(with page clamping), never splice-and-decrement. And the backend must cascade the flags inside
`deletePalette`'s existing `withTransaction` (`deleteByPaletteSlug` already exists, one line away)
and filter `deletedAt` in the `$lookup`. Relay to the API owner.

---

### F-4 · MAJOR — the error plate and the stale rows render *together*

The template's exhaustive-looking chain is not exhaustive. `v-if`(L16) / `v-else-if`(L22) /
`v-else-if`(L37) covers three siblings — and then **L44's `v-for` is an independent element**, not
part of the chain. `loadFlagged`'s `catch` (`useAdminFlagged.ts:72-78`) never clears `items`.

**Reproduction (executed, the real SFC):**

```
R1 skeletons = 2 | stale row rendered = true
R2 text = "1 flagged The flag queue is unreachable.Backend unreachable Retry Sunset Riotcrimson-owl-772 Dismiss spamjunkJul 4"
```

R2 is the F-2 law re-broken in the mirror direction: an unreachable backend costuming as a
**working** moderation queue. The `role="alert"` (EmptyState L17) announces the outage while a full
row sits below it offering Dismiss and Delete — buttons that will now fail *silently* (F-7) against
the dead backend the alert just named. R1 is the cosmetic twin: refresh paints two skeleton rows
above the list that is still there.

**Cure:** one chain, one arm each. See the gestalt cure.

---

### F-5 · MAJOR — emptying the last page strands the panel with no way back

`pageCount = ceil(total/20)` (`useAdminFlagged.ts:55`), `dismiss`/`deletePalette` decrement `total`
(L87, L99), and `PaginationBar.vue:3` renders **only** `v-if="pageCount > 1"`.

Take 21 flagged palettes; go to page 2 (one row); dismiss it.

**Reproduction (executed):**

```
C3 page = 2 | items = 0 | total = 20 | pageCount = 1 | hasPrev = true | PaginationBar rendered = false
```

The panel now shows **"No flagged palettes."** while 20 flagged palettes remain, `hasPrev` is
`true` but the control that would use it has unmounted, and Refresh re-requests `offset=20` and
returns empty forever. The only escape is unmounting the panel (route away and back). A moderation
queue that traps you on an empty page and calls itself clear is a work-stopping defect.

**Cure:** the same one — reload from the server after a mutation, clamping
`page = min(page, pageCount)`.

---

### F-6 · MAJOR — no request identity: the wrong page's rows win

`loadFlagged` has no sequence number, no `AbortController`, and `nextPage`/`prevPage`
(L105-117) fire it without awaiting.

**Reproduction (executed):**

```
C1 page = 2 | rendered slug = [ 'page1-row' ] | loading = false
C2 page = 3 | offsets requested = [ 20, 40 ]
```

C1: the page-1 response lands last and paints page-1 rows under a page-2 pager. C2: two clicks of
Next fire two flights, skip page 2 entirely, and leave the loser in the air — its late resolution
will overwrite page 3 with page 2. The `loading` flag is a plain boolean, so the first `finally`
clears it while a second request is still running: the skeleton disappears early, and the Refresh
button stays armed for spamming (it has no `disabled`, no `loading` prop — `glass-ui@7`'s Button
has one).

**Cure:** a monotonic request token in the composable; drop any response that is not the newest.
Disable the affordances while a flight is open (`:loading` on the glass Button, which exists).

---

### F-7 · MAJOR — a failed destructive action is invisible

`useAdminFlagged.ts:88-90, 100-102` — both moderation catches are `console.warn` and nothing else.
There is no error ref for mutations (only `loadError`, which is load-scoped), no toast (vue-sonner
was removed repo-wide), and no live region (F-12).

**Reproduction (executed):**

```
C4 after two FAILED moderation actions → loadError = null | items = 2 | total = 2
```

A 403 (expired admin token) or a 500 produces **exactly the same UI as a no-op click**: the row
stays, nothing is said. The moderator's only feedback channel is the devtools console.

**Cure:** the mutation must resolve into the same single state machine that drives the render, with
an announced result — see below.

---

### F-8 · MAJOR — the panel still speaks shadcn to a `glass-ui@7` Button

`demo/ui/button/index.ts` is one line: `export { Button } from "@mkbabb/glass-ui";`. The glass 7
`ButtonProps` (`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19`) are
`emphasis | tone | size | iconOnly | loading | type | disabled | class`. **There is no `variant`.**

`AdminFlaggedPanel.vue` passes `variant="outline"` three times (L10, L29, L90) and `variant="ghost"`
once (L93). They fall through as raw DOM attributes.

**Reproduction (executed — the actual rendered DOM):**

```
BUTTON: <button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="sm" … class="… h-7 px-2" … variant="outline" aria-label="Refresh flagged palettes">
BUTTON: <button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="sm" … class="… h-7 px-2 text-caption font-display" … variant="outline"> Dismiss </button>
BUTTON: <button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="sm" … class="… hover:text-destructive …" … variant="ghost"
D1 emphases as RENDERED = [ 'secondary', 'secondary', 'secondary' ]
```

Three consequences:

1. **The design claim at L86-89 is false.** "The pair weighted asymmetrically — the labeled neutral
   Dismiss is the primary affordance; the delete is a QUIET icon" — both render at
   `emphasis="secondary"`, `tone="neutral"`. The only differentiation is four hand-written hover
   utilities. `glass-ui@7` ships exactly these axes (`emphasis="quiet"`, `tone="destructive"`,
   `size="xs"`, `iconOnly`) and none is used.
2. **Edict 5 (root-level styling).** The geometry is hand-rolled per instance — `h-7 px-2` on all
   four buttons (and again in `AdminAuditPanel.vue:30`, `AdminTagsPanel`, …) instead of
   `size="xs"`; `iconOnly` is never set, so the icon buttons get no square geometry from the system.
3. Invalid `variant` attributes are emitted into the document on every admin button.

**Blast radius (measured):** `grep -rno 'variant="[a-z]*"' demo --include=*.vue | grep -v demo/ui/`
→ **29 `outline` + 28 `ghost` across 36 files**; 21 of them in
`demo/palettes/browser/admin/` alone. `ghost` is not a valid variant of the glass Badge either, so
essentially all 28 are dead Button props. This is a W44 glass-7 adoption residue and belongs in the
carry ledger as a family, not as one file's typo.

**Contrast, same directory:** `AdminUsersPanel.vue:174-176` speaks glass 7 correctly —
`<Button emphasis="text">`, `<Button :tone="confirmDestructive ? 'destructive' : 'neutral'">`.

---

### F-9 · MAJOR — the destructive delete has no confirmation

`AdminFlaggedPanel.vue:93-101` → `flagged.deletePalette(item.paletteSlug)` on a single click. It
soft-deletes another user's palette (30-day reaper window) with no dialog, no undo, no
announcement, and — per F-7 — no visible failure.

**Reproduction (executed):**

```
A4 deletePalette called with = [ 'a' ] | dialogs in DOM = 0
```

The sibling panel in the same directory gates the *same class of operation* behind
`Dialog` + `showConfirm` (`AdminUsersPanel.vue:157-178, 263-333`) — and the comment above it
(`AdminUsersPanel.vue:310-313`) is from **the same W5-12 · F-8 wave that wrote this panel's
"asymmetric weighting" comment**:

> "the shift-click confirm bypass is EXCISED — an invisible, undocumented, un-undoable fast path on
> the two most destructive actions in the app"

That wave hardened one panel and left the other with a one-click un-undoable delete. Internal
contradiction, not a matter of taste.

**Cure:** route it through the same `Dialog` confirm the sibling already owns (KISS — reuse, do not
invent a new wrapper).

---

### F-10 · MAJOR — the gate is vacuous

```
--- unit tests naming the component or composable ---
0
```

There is no component test and no composable test. The entire gate is three e2e assertions:

- `e2e/smoke/admin/admin-populated.spec.ts:101-105` — heading "Flagged" visible; text "Sunset Riot"
  visible; *a* button matching `/Dismiss/i` visible.
- `e2e/smoke/admin/admin-walk.spec.ts:42-44` — a button named "Refresh flagged palettes" exists.
- `e2e/smoke/admin/o10d-admin-title-voice.spec.ts` — the name's `font-family`.

**Mutations that keep every test green** (each is a shipped-bug class):

1. Swap L90's handler to `flagged.deletePalette(item.paletteSlug)` — the **Dismiss button now
   deletes the palette**. Green.
2. Delete the entire flag-details block (L106-122) — reasons, details and dates gone. Green.
3. Make `dismiss()`/`deletePalette()` `return` immediately — both moderation actions become no-ops.
   Green.
4. Delete the `v-else-if` on L37 — error and empty render simultaneously. Green.
5. Remove `:aria-label` from the delete button (L97) — a nameless destructive control. Green
   (`a11y-authed-admin.spec.ts` only visits the route; the populated fixture is a different spec).
6. Delete the `PaginationBar` (L126-133). Green.

Nothing clicks Dismiss or Delete anywhere in the suite.

**Fixture rot found while checking (family, MAJOR for the gate):**

- `e2e/smoke/admin/fixtures/admin-populated.ts:153` answers `DELETE /admin/palettes/*` with
  `json("", 204)`, while the real route returns `200 {deleted:true}`
  (`api/src/modules/admin/routes/palettes.ts:38-41`). `adminRequest` calls `res.json()`
  unconditionally (`demo/platform/transport/client.ts:155`), and an empty body throws —
  measured: `node -e 'new Response("",{status:200}).json()'` → `THREW: SyntaxError Unexpected end of
  JSON input`. So under the fixture the Delete button is *broken*, and no test notices.
- `e2e/smoke/admin/fixtures/admin-populated.ts:28` imports its types from
  `"../../../../demo/@/lib/palette/types"` — `ls` → **No such file or directory**. A type-only
  import, erased by the transpiler, so the fixture's shapes are entirely unchecked. That is how the
  fixture came to model `palette: {…}` and `204` — nothing was ever verified against the wire.

---

### F-11 · MINOR — `"Invalid Date"` ships to screen; the `try/catch` is dead

`dateFormat.ts:16-25` wraps `toLocaleDateString` in `try/catch`, but that method **does not throw**
on an invalid date — it returns the string `"Invalid Date"`:

```
node -e '…new Date("garbage").toLocaleDateString(…)' → "Invalid Date"
node -e '…new Date(undefined).toLocaleDateString(…)' → "Invalid Date"
```

**Reproduction (executed, the real SFC, `flag.createdAt` missing):**

```
R4 text = "1 flagged Sunset Riotcrimson-owl-772 Dismiss spamInvalid Date"
```

The catch is unreachable code pretending to be a guard (edict 2 — masking fallback that masks
nothing). Cure: validate `Number.isNaN(d.getTime())` and render an explicit em-dash or the raw
value; delete the dead `try`.

---

### F-12 · MINOR — duplicated loading announcements on a role-less label

`AdminFlaggedPanel.vue:16` puts `aria-label="Loading flagged palettes"` on a bare `<div>` — ARIA
does not expose `aria-label` on a `role="generic"` element, so that string is never spoken. Inside
it, two `AdminListSkeleton`s each carry `role="status" aria-label="Loading"`
(`AdminListSkeleton.vue:10-12`), so AT hears **"Loading" twice** and never the useful sentence.

**Reproduction (executed):**

```
A1 role=status count = 2 | labels = [ 'Loading', 'Loading' ]
A1 wrapper role = undefined | aria-label = "Loading flagged palettes"
```

Cure: one `role="status"` on the wrapper carrying the real sentence; `aria-hidden` the shadows.

---

### F-13 · MINOR — focus is stranded on `<body>` after a row is removed

**Reproduction (executed):**

```
A2 focus before = Dismiss
A2 focus after  = BODY | rows left = 1
```

Dismiss unmounts the control the keyboard user is standing on; focus falls to `<body>` and the next
Tab restarts from the top of the document. The repo already knows this pattern
(`ErrorBoundary.vue:62-64` explicitly focus-manages on catch, citing WCAG 2.4.3). Cure: move focus
to the next row's Dismiss, or to the toolbar Refresh when the list empties.

---

### F-14 · MINOR — unlabelled count badge, and a toolbar count that contradicts A-3

`L81-83` renders the flag count as a bare number inside a `tone="destructive"` Badge:

```
A3 badge outerHTML = <div data-slot="badge" data-tone="destructive" class="badge-atom …">
```

No accessible name — a screen reader hears "2" next to the palette name. (`tone="destructive"` *is*
a valid glass 7 Badge prop — verified in `badge/index.d.ts`; that half is correct.)

`L5-7` renders `{{ flagged.total.value }} flagged` unconditionally, so it publishes `0 flagged`
while loading and — proven live — while unreachable:

```
R5 text = "0 flagged The flag queue is unreachable.Backend unreachable Retry"
```

The host pane already establishes the counter-precedent: `AdminPane.vue:117-131` suppresses the
count badge while loading because *"a '0' over the loading skeletons lies"* (A-3), and
`S.W5-7 · F-12` re-aimed the names badge for the same reason. This panel's toolbar count is exempt
from a law its own parent enforces.

---

### F-15 · MINOR — per-instance styling where the system (or a token) exists

- `style="font-variant: small-caps"` inline at L75 — a raw inline style for what the file itself
  calls "the K-INV5 small-caps annotation register"; a register is a class, not a one-off
  declaration (edict 5, edict 6's tokenization spirit).
- `cursor-pointer` on L96 only — the other three buttons don't carry it, so either the glass
  `.button` class already provides it (making this noise) or three buttons are missing it.
  Inconsistent either way.
- `h-7 px-2 text-caption font-display` repeated per button instead of `size="xs"` (see F-8).
- L10 binds `@click="flagged.loadFlagged"` (passing the `MouseEvent` as arg 1) while L29 binds
  `@click="flagged.loadFlagged()"`. Harmless today because the signature takes no params — a latent
  trap the moment it does, and gratuitously inconsistent. Same split on L131-132 (`@prev`/`@next`).

---

## Mechanism families

| Family | Defects | The underlying mechanism |
|---|---|---|
| **M-A · the state machine is not a machine** | F-1, F-4, F-14 | Four independent refs (`loading`, `loadError`, `items`, `total`) plus an unmodelled *unauthenticated* state, rendered by a `v-if` chain that does not cover the row list. Nothing forces the arms to be mutually exclusive or exhaustive, so impossible states are reachable and reached. |
| **M-B · optimistic mutation without server truth** | F-3, F-5, F-7 | Mutations edit local arrays and decrement local counters instead of re-deriving from the server, so client state silently diverges from the queue it claims to show — and failures have nowhere to land. |
| **M-C · no request identity** | F-6 | Async loads are fire-and-forget with a boolean in-flight flag; last-write-wins by arrival order. |
| **M-D · contract fiction** | F-2, F-10 (fixture half) | Types and fixtures were written from the *intended* shape, never checked against the wire (`palette: {}` vs `null`; `204` vs `200 {deleted:true}`; an import path that no longer exists). Cures were then built on the fiction, so they are inert. |
| **M-E · design-system vocabulary drift** | F-8, F-15 | The file still speaks shadcn `variant` + utility classes at a `glass-ui@7` API that exposes `emphasis`/`tone`/`size`/`iconOnly`. Comments assert visual hierarchy the props cannot deliver. |
| **M-F · a11y bolted on per element** | F-12, F-13, F-14 | Labels were added element-by-element (an `aria-label` here, an `aria-hidden` there); nobody owns the panel's live region, its focus continuity, or its counts. |
| **M-G · vacuous gate** | F-9, F-10 | The suite asserts presence, never behaviour, so every behavioural defect above shipped green. |

---

## The gestalt cure — one transposition, seven defects

Do not patch the seven render arms. **Move the state into the composable as a single discriminated
value, and make the template total over it.**

```ts
// useAdminFlagged.ts — one cell, computed, exhaustive
type FlaggedState =
    | { kind: "unauthenticated" }
    | { kind: "loading" }
    | { kind: "error"; message: string; retry: () => void }
    | { kind: "empty" }
    | { kind: "rows"; rows: FlaggedPalette[]; total: number; page: number; pageCount: number };
```

- `unauthenticated` is a state, not an early `return` — **F-1 dies.**
- The template becomes `v-if / v-else-if / v-else-if / v-else-if / v-else` over `state.kind` with
  the row list *inside* the `rows` arm — **F-4 and F-14 die** (the count only exists on `rows`).
- Every load carries a monotonic id; a stale resolution is dropped — **F-6 dies.**
- Every mutation is `await mutate() → reload({ clampPage: true })`, so the list, the total and the
  pager are always the server's — **F-3 (client half), F-5 and F-7's silence die** (a failed
  mutation resolves to `{kind:"error"}` like any other).
- The panel gains **one** `role="status" aria-live="polite"` region announcing the count and each
  moderation result, and moves focus to the next row on removal — **F-12, F-13 die.**
- Buttons speak glass 7: `size="xs"`, `emphasis="quiet"`, `tone="destructive"`, `iconOnly`,
  `:loading` — **F-8 and most of F-15 die**, and the L86-89 hierarchy becomes true for the first
  time. Delete routes through the sibling's existing `Dialog` confirm — **F-9 dies.**

Two asks leave the component:

1. **Backend (relay to the API owner):** cascade `flags.deleteByPaletteSlug(slug)` inside
   `deletePalette`'s existing `withTransaction`, and filter `deletedAt` in the flagged `$lookup`.
   Then fix the `$project` to emit a real `null` (`$cond`) and correct
   `demo/palettes/types.ts:112`. **F-2 and F-3's server half die.**
2. **Gate:** a component spec over the five states + a click-through of Dismiss and Delete
   (the six mutations above must fail it); repair `admin-populated.ts` (`200 {deleted:true}`, live
   type path, one `palette: {}` row). **F-10 dies.**

---

## Negative proof — what I checked and cleared

Not everything is broken; these were interrogated and are sound.

- **Tap targets.** `h-7 px-2` = 28×28 CSS px for the icon buttons — above the 24×24 AA floor
  (WCAG 2.5.8). `REPORT.json` for `/#/admin/flagged` lists 4 small targets, and all four
  (`Switch to slug`, `Generate new slug`, `Cancel`, an unlabelled 160×23 `input`) belong to the
  slug bar, **not** to this component. `namelessButtons: 0` on all four matrices.
- **`tone="destructive"` on Badge** is a real glass 7 prop (`badge/index.d.ts` `TONE`), correctly
  used — only the missing accessible name is a defect (F-14).
- **`EmptyState` error variant** carries `role="alert"` (`EmptyState.vue:17`), and every prop this
  panel passes (`variant`, `eyebrow`, `message`, `detail`, `#action`) exists.
- **`verbatimModuleSyntax`** — the SFC's imports are all value imports; nothing type-only is
  imported without `type`. Clean.
- **No local-hazard exposure:** no `defineModel` (so no stale-read round-trip), no oklch→HSV
  roundtrip, no `ValueUnit` wrapping, no reka-ui slider, **no `requestAnimationFrame`**, no WebGL,
  no `parseCssColor` — the swatch strip passes `c.css` straight to `backgroundColor`, where a
  malformed value is dropped by CSS rather than throwing. This component is not a PRM-RAF site.
- **`deletePaletteAdmin`'s `Promise<void>` vs `res.json()`** — I suspected a 204 crash; the real
  route returns `200 {deleted:true}` (`admin/routes/palettes.ts:40`), so the shipping path is safe.
  Only the *fixture* models the dangerous shape (F-10).
- **Listeners / timers / observers:** the component registers none, so there is nothing to leak.
  `onMounted(() => loadFlagged())` (L152) is the whole lifecycle; the port is a composition-root
  singleton, so remounting the panel does not multiply state.

---

## Hypotheses (labelled — not findings)

- **H-1 · a cold-boot render throw on `/#/admin/flagged`.** My first live navigation
  (22:51:23, Chrome/Playwright, a tab left open by an earlier seat with `probe-admin-token` in
  `localStorage`) rendered the app-wide error boundary with
  `detail = "Cannot read properties of undefined (reading 'replace')"`. Three subsequent cold loads
  did **not** reproduce it, and `ErrorBoundary.vue:59-69` swallows the throw without logging, so no
  stack survives. Unattributed and unreproduced — recorded so the next seat can hunt it. Note the
  boundary's silence is itself worth a finding in *its* seat: a caught render throw leaves no
  console trace at all.
- **H-2 · a repeating admin poll.** During one live load the console showed
  `Failed to load color queue` / `Failed to load approved colors` repeating at ~1.26 s intervals
  (02:52:46 log, t = 1370 ms, 2634 ms). That is `AdminNamesPanel`'s territory, not this seat's, but
  it smells like a remount loop or an ungated retry.
- **H-3 · route/pane disagreement.** `http://localhost:9000/?cold=1#/admin/flagged` rendered the
  **Names** pane while `document.title` said "Flagged — Color Picker". A query string before the
  hash appears to defeat route resolution. Router seat, not this one.

Environment note: the live dev server runs `dev:web-only` and its availability latch is
`misconfigured` (`[value.js] value.js dev is MISCONFIGURED … targeting the cross-origin production
API`), so **no admin panel can load a row on `localhost:9000` at present**. That is why the visual
matrix has never once photographed this component with data — every capture is the F-1 false-empty.
Populated-state evidence in this report therefore comes from the mounted-component reproductions,
which drive the real SFC.

---

## Appendix — the reproductions (runnable)

Executed with the repo's own toolchain; **no source file was created or modified**. The six
scripts live beside this report, in
`docs/tranches/V/megatranche/audit/components/AdminFlaggedPanel/repro/` — inert to both
tsconfig programs (`src/`, `demo/`) and to the vitest globs (`test/**`, `demo/test/**`).

```bash
R=docs/tranches/V/megatranche/audit/components/AdminFlaggedPanel/repro

# 1 · the Mongo wire-shape probe (resolves mongodb + mongodb-memory-server from api/node_modules)
cd api && node ../$R/probe-flagged.mjs

# 2-5 · the component + composable reproductions (edit `include` in the config to select a file)
npx vitest run --config $R/repro.vitest.config.ts
```

`repro.vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";
const REPO = "/Users/mkbabb/Programming/value.js";
export default defineConfig({
    root: REPO,
    plugins: [vue()],
    resolve: { alias: { "@src": path.resolve(REPO, "src") } },
    test: { include: ["<abs path to the test file>"], environment: "jsdom", css: false },
});
```

**`probe-flagged.mjs`** — inserts a live palette (`p1`), a soft-deleted palette (`p2`) and a flag
with no palette row (`p3`), then runs the pipeline copied verbatim from
`api/src/modules/palette/repository/flag.ts:71-115` and prints
`"palette" in row`, `JSON.stringify(row.palette)`, `Boolean(row.palette)` and the two template
expressions (`!item.palette`, `item.palette?.name ?? item.paletteSlug`). Output is quoted in F-2.

**`flagged-repro.test.ts`** (8 tests, all pass) — mounts the real
`AdminFlaggedPanel.vue` with a fake `ADMIN_PORT_KEY` port:
R1 loading+items ⇒ 2 skeletons *and* the row · R2 loadError+items ⇒ error plate *and* the row *and*
Dismiss · R3 `palette:{}` ⇒ bare slug, 0 swatches, no "palette deleted" · R3b `palette:null` ⇒ the
annotation appears · R4 missing `createdAt` ⇒ `"Invalid Date"` · R5 `total:0` + loadError ⇒
`"0 flagged"` beside "unreachable" · R6 0 `aria-live` nodes with rows present · R7 a 400-char flag
detail is `truncate` with no `title`.

**`flagged-composable.test.ts`** (6 tests, all pass) — the real `useAdminFlagged` with
`demo/palettes/api/index.ts` and `useAdminAuth` mocked: C1 out-of-order ⇒ stale page wins · C2
double-Next ⇒ page 1→3, offsets [20,40] · C3 last-page dismiss ⇒ stranded · C4 failed
dismiss+delete ⇒ `loadError` null, rows unchanged · C5 no token ⇒ 0 requests, empty-plate branch ·
C6 delete then refresh ⇒ the row returns.

**`flagged-dom.test.ts`** (1 test) — dumps every rendered `<button>`; output quoted in F-8.

**`flagged-a11y.test.ts`** (4 tests, all pass) — A1 duplicate `role="status"` + role-less
`aria-label` · A2 focus → `BODY` after dismiss · A3 unlabelled count badge · A4 delete fires with 0
dialogs.

---

*Seat: CHALLENGE-C (implementation). Model: Opus 5. Report:
`docs/tranches/V/megatranche/audit/components/AdminFlaggedPanel/challenge-C-implementation.md`.
No source file was edited by this seat.*
