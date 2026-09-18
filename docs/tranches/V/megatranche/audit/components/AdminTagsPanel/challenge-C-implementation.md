# CHALLENGE-C — `AdminTagsPanel.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context) — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Scope + method

Subject: `demo/palettes/browser/admin/AdminTagsPanel.vue` (126 L) and the composable that holds
100% of its state and logic, `demo/palettes/useAdminTags.ts` (110 L). Read in full, together with
`demo/palettes/usePalettePorts.ts`, `demo/palettes/api/admin-colors.ts`,
`demo/platform/transport/client.ts`, `demo/platform/transport/availability.ts`,
`demo/platform/auth/useAdminAuth.ts`, `demo/palettes/admin/AdminPane.vue`,
`demo/shell/PaneSlot.vue`, `demo/shared/ui/EmptyState.vue`, the two e2e specs that touch it, and
the mega-tranche visual REPORT rows + PNGs for `/#/admin/tags`.

**Live evidence.** The dev server at `http://localhost:9000` runs in the `misconfigured` availability
state (`demo/platform/transport/availability.ts:110-115` — loopback origin + no `VITE_API_URL` +
cross-origin prod BASE_URL), so every admin transport call short-circuits *before* `fetch` and no
request interception is possible on that origin. Vite is bound with `server.host: true`, so I drove
the same server through its LAN origin `http://192.168.1.166:9000` — a non-loopback hostname makes
`detectDevMisconfig` return `false`, real requests are issued, and `page.route` can serve them. All
probes below ran against **real WebKit** (the repo's declared target; the visual matrix is Safari)
at the capture matrix (`devices["iPhone 14"]`, 390×664 @3, and 1440×900), with one Chromium
cross-check where a WebKit-specific behaviour had to be separated from an app defect.

Probe scripts (kept, re-runnable):
`…/scratchpad/tags-probe.mjs`, `tags-probe2.mjs`, `tags-probe3.mjs`, `tags-probe4.mjs`,
`tags-probe5.mjs`, `mutcheck.mjs`.

**Verdict: DEFECTIVE.** Three BLOCKERs, six MAJORs, nine MINOR/INFO. The strongest is C-1: the panel
publishes an affirmative claim about the tag ledger — *"0 tags · NO TAGS MINTED · No tags yet."* —
after issuing **zero requests**, which is the exact "error ≠ empty" P0 class (F-2 / W5-5) the
composable's own comment at `useAdminTags.ts:57` claims to have cured.

---

## BLOCKER

### C-1 — The empty plate lies: `0 tags / · NO TAGS MINTED · / No tags yet.` with zero requests issued

`useAdminTags.ts:49-51`

```ts
async function loadTags() {
    const token = getToken();
    if (!token) return;              // ← no request, no error, no loading, no state change
```

With no admin token, `loadTags()` returns before touching `loading`, `loadError`, or `tags`. The
template then falls through `v-if="loading"` (false) and `v-else-if="loadError"` (null) into
`v-else-if="tagsApi.tags.value.length === 0"` (`AdminTagsPanel.vue:82`) — the **TRUE-EMPTY specimen
plate**, the one register the codebase reserves for a verified-empty collection
(`EmptyState.vue:5-12`, Q6). The panel asserts a fact about the server it never asked.

**Reproduction (measured).** WebKit, iPhone 14, `localStorage` empty, all `api.color.babb.dev`
traffic intercepted:

```
"unauth": {
  "adminRequests": [ …only Vite module URLs; NO api.color.babb.dev entry… ],
  "probe": { "mainText": "Tags\n\nManage palette tag taxonomy.\n\n0 tags\n\n· NO TAGS MINTED ·\n\nNo tags yet." }
}
```

This is not a theoretical path — it is **the state the certified visual matrix captured**. The
Safari desktop+mobile, light+dark shots at
`docs/tranches/V/megatranche/audit/visual/shots/*/admin-tags.png` all show the dock reading
**"Login"** (unauthenticated) and the panel reading **"0 tags / · NO TAGS MINTED · / No tags yet."**
`REPORT.json` records `bodyTextLength: 244` (desktop) / `92` (mobile) for the route, with
`consoleErrors: []` and `failedRequests: []` — the audit's own instrument recorded a clean,
affirmatively-empty admin console that had never contacted the backend.

The same hole swallows the **create** action. `createTagAction` has the identical guard
(`useAdminTags.ts:67`), but the button's `:disabled` (`AdminTagsPanel.vue:42`) tests only the two
input strings and `creating` — **not the token**. Measured:

```
"unauthCreate": {
  "disabledBeforeClick": false,          // the primary action is ENABLED
  "apiRequests": [ "GET https://api.color.babb.dev/colors/approved" ],   // no POST /admin/tags
  "nameAfter": "orphan",                  // inputs not cleared
  "mainText": "Tags … 0 tags\n\n· NO TAGS MINTED ·\n\nNo tags yet.",
  "console": []                           // not even a warning
}
```

A fully-enabled primary action that does nothing, says nothing, and logs nothing: a dead control.

**Cure (gestalt).** Make "have I asked?" a state of the port, not an absence. `loadTags` should set
`loadError` (or a distinct `unauthenticated` cell) on the no-token path so the panel renders the
*plain* register with an actionable "Sign in as admin" affordance, and the create button's
`:disabled` must include the token. Better still: model the panel's state as one discriminated
union (`idle | loading | error | unauthenticated | ready(tags)`) and drive a single `v-if` chain
from it — the current four independent booleans are what makes an unreachable-but-representable
state (`!loading && !loadError && tags=[]` meaning *two different things*) inevitable.

---

### C-2 — Any shape drift in `GET /admin/tags` takes down the entire main region

`useAdminTags.ts:54` assigns the parsed JSON straight into `tags` with no validation:

```ts
tags.value = await getAdminTags(token);   // typed Promise<Tag[]>; unchecked at runtime
```

`getAdminTags` is `adminRequest(…)` → `return res.json()` (`client.ts:154`). The declared type is a
compile-time fiction. `groupedTags` immediately iterates it (`useAdminTags.ts:41`) and the template
immediately reads `.length` (`AdminTagsPanel.vue:6`).

**Reproduction (measured, WebKit 1440×900, authenticated, route-fulfilled):**

| server body | result |
|---|---|
| `{"items":[],"total":0}` | pane crash — `This panel hit an unexpected error. / {} is not iterable` |
| `null` | pane crash — `This panel hit an unexpected error. / null is not an object (evaluating '$setup.tagsApi.tags.value.length')` |
| `204` no body | error plate reads `The string did not match the expected pattern.` (a raw `JSON.parse` SyntaxError shown to the admin as the API's diagnosis) |
| `[{"category":"c"},{"category":"c"}]` | renders `2 tags`, category header `C`, **two blank pills**, both with `:key` = `undefined` |

The `{items:…}` case is not a strawman: this same API module returns exactly that envelope for its
sibling endpoints (`PaginatedResponse` — `api/…/admin-colors.ts:21-27, 41-50`).

**Blast radius.** The crash is caught by the app-wide `ErrorBoundary` that wraps the *whole* pane
region (`demo/color-picker/App.vue:50` … `:140`), not the panel. In the `{items:[]}` run the probe's
`main.innerText` was reduced to `"This panel hit an unexpected error. / {} is not iterable / Try
again"` — the right-hand *My Palettes* pane vanished with it. One malformed admin response destroys
the entire application main region.

**Cure.** Narrow at the boundary, once: `getAdminTags` returns `unknown` and a total parser
(`Array.isArray(x) ? x.filter(isTag) : []`, throwing a typed `ApiProblem` otherwise) produces `Tag[]`.
Never let an unvalidated `res.json()` reach a template.

---

### C-3 — Unguarded concurrency: the panel deterministically settles on STALE data

`loadTags` (`useAdminTags.ts:49-63`) has no in-flight guard, no request sequence number, and no
`AbortController`. Every invocation issues a request and every resolution unconditionally writes
`tags.value`. **Last-to-resolve wins, not last-issued.**

**Reproduction (measured).** Three clicks on *Refresh tags* → three concurrent GETs:

```
"rapidRefresh": { "requests": [ "GET …/admin/tags", "GET …/admin/tags", "GET …/admin/tags" ] }
```

Sequenced to force the inversion — request #2 delayed 2500 ms returning `STALE-OLD`, request #3
immediate returning `FRESH-NEW`:

```
"raceMidflight": { "pills": ["FRESH-NEW"], "skeletonVisible": false },
"raceFinal":     { "pills": ["STALE-OLD"], "countLine": "1 tag", "skeletonVisible": false },
"raceRequestCount": 3
```

The list shows the correct value, then **spontaneously reverts to the older one 2.5 s later**, with
no loading indication at any point — `skeletonVisible: false` at midflight because the fast
response's `finally` (`useAdminTags.ts:60-62`) cleared `loading` while the slow one was still
running. An admin who double-taps Refresh is shown a stale ledger and is given no signal that it is
stale.

**Cure.** One monotonic `reqId` captured before the await and compared after
(`if (id !== latestId) return;`), plus an `AbortController` stored on the composable and aborted on
re-entry. `loading` becomes a count of in-flight requests, not a boolean.

---

## MAJOR

### C-4 — An invisible, sub-minimum, unconfirmed, undoable destructive control

`AdminTagsPanel.vue:98-104`:

```html
<button
    class="ml-0.5 p-0.5 rounded-sm opacity-0 transition-all group-hover:opacity-100 …"
    :aria-label="`Delete tag ${tag.name}`"
    @click="tagsApi.deleteTag(tag.name)"
>
```

Measured, WebKit, authenticated, 3 seeded tags — identical at 390 px and 1440 px:

```
{ "label": "Delete tag moody", "w": 16, "h": 16, "opacity": "0",
  "visibility": "visible", "hitTestIsSelfOrChild": true, "belowWcag24": true }
```

Four compounding facts:

1. **16 × 16 px.** WCAG 2.2 SC 2.5.8 (Target Size, Minimum, AA) floor is 24 × 24. The visual
   REPORT's own probe flags 22 × 22 dock buttons as `smallTapTargets` — this control is smaller
   still.
2. **`opacity: 0`, and still hit-testable** (`document.elementFromPoint` at its centre returns the
   button itself). An invisible live target.
3. **Reveal is hover-only in practice on the declared target.** On iOS Safari there is no hover, so
   the control never appears. The template's `focus-visible:opacity-100` *does* work — I verified it
   after the 200 ms `transition-all` settles in Chromium (`opacity: "1"`, `fv: true`) and record
   here that my first reading of `opacity: "0"` was a transition-timing artefact, not a defect. But
   in **WebKit** the button is never reached by Tab at all: a 25-press Tab walk cycles
   `New tag name → New tag category → Search your palettes… → BODY → …` and
   `deleteFocused: null`. (Safari excludes buttons from the default Tab order absent
   *Press Tab to highlight each item*.) So on the repo's primary browser the reveal path is
   hover-or-nothing, and on its touch variant there is no hover.
4. **No confirmation, no undo, no error surface.** Contrast the sibling console:
   `AdminUsersPanel.vue:289-300` gates *every* destructive admin action behind a Glass-7
   `ConfirmDialog` with an explicit *"This cannot be undone."* A tag is corpus-wide taxonomy —
   `e2e/smoke/admin/fixtures/admin-populated.ts:45` shows palettes carrying `tags: ["moody"]` — and
   it is deleted here by a single click on a 16 px invisible box.

**Cure.** The pill + dismiss is a design-system primitive, not an inline recipe: a glass-ui `Badge`
(the name already exists in this repo — `demo/ui/badge`, used at `AdminPane.vue:6`) gaining a
`dismissible` variant whose target meets 24 px and whose affordance is persistent, routed through
the same `ConfirmDialog` the users console already uses.

---

### C-5 — Create and delete fail silently; only *load* has an error surface

`useAdminTags.ts:80-84` and `:93-95` both end in `console.warn(...)` and nothing else. There is no
`createError`/`deleteError` cell, so a 409 duplicate, a 403, a 429, or a network drop produces:
inputs cleared or not, list unchanged, **no visible change whatsoever**. The asymmetry is internal
to the same 110-line file — `loadError` (`:19, :34, :58`) exists precisely because
"a dead backend must never read as *no tags yet*" (`:57`). The same reasoning was never applied to
the two write paths.

Evidence: the C-1 unauth-create run recorded `"console": []` and an unchanged panel; the
`GET-500 + POST-200` run (below) recorded a *successful* create that was equally invisible.

---

### C-6 — Branch ordering hides a successfully-created tag behind a stale load error

Template chain: `loading` (`:52`) → `loadError` (`:69`) → `length === 0` (`:82`) → list (`:85`).
`loadError` outranks the list and is only ever cleared inside a *successful* `loadTags`
(`useAdminTags.ts:55`). So after a failed load, a successful create mutates `tags` but can never
render.

**Reproduction (measured)** — `GET /admin/tags` → 500, `POST /admin/tags` → 200, then create
`ghost/limbo`:

```
"pillsAfterCreate": [],            // the created tag is nowhere
"nameInputAfter": "",              // …but the inputs were cleared, implying success
"mainText": "Tags … 1 tag\n\nThe tag ledger is unreachable.\n\nboom\n\nRetry"
```

The toolbar counts the tag (`1 tag`) while the body says the ledger is unreachable. Two
contradictory truths in one 300-px column.

---

### C-7 — Duplicate create produces a duplicate pill and a duplicate `v-for` key

`useAdminTags.ts:75-77` appends unconditionally: `tags.value = [...tags.value, tag].sort(...)`. When
the server responds to a re-create with the existing row (the ordinary idempotent-POST shape), the
list gains a second identical entry, and `:key="tag.name"` (`AdminTagsPanel.vue:93`) is duplicated
*within the same category group*.

**Reproduction (measured)** — seed `[moody/mood, warm/temperature, cool/temperature]`, then create
`moody/mood`:

```
"duplicate": {
  "tagNames": ["moody","moody","cool","warm"],
  "mainText": "Tags … 4 tags\nMOOD\nmoody\nmoody\nTEMPERATURE\ncool\nwarm"
}
```

Note the second defect visible in the same output: the load path preserves **server order**
(`warm, cool`) while create re-sorts the *entire* list with `localeCompare` (`cool, warm`). Creating
one tag silently reorders every other tag on screen. Two orderings for one list.

**Cure.** Reconcile by identity, not by append — `const next = new Map(tags.value.map(t => [t.name, t]));
next.set(tag.name, tag);` — and settle on ONE ordering, applied in the `groupedTags` computed where
it belongs, so load and create cannot disagree.

---

### C-8 — The count asserts `0 tags` over the loading skeletons and over the error plate

`AdminTagsPanel.vue:5-7` renders `tags.value.length` unconditionally. Measured states:

- loading → `0 tags` above five chip skeletons;
- error → `0 tags` above *"The tag ledger is unreachable."* (see C-6 output).

The codebase has already ruled on this exact question, in the parent component:
`AdminPane.vue:119-122` — *"A-3: suppress the badge while the roster/queue loads — a `0` over the
loading skeletons lies (the length is 0 before data arrives)."* The rule is applied to the users and
names badges and to nothing else; `adminCount` returns `null` for `admin-tags`
(`AdminPane.vue:127`), so the header is silent while the panel's own toolbar tells the lie the rule
forbids.

---

### C-9 — No `aria-live` on any result; the only status region is destroyed at the moment of news

Measured live-region inventory on the authenticated, loaded mobile panel: `"liveRegions": []`.

The `role="status"` at `AdminTagsPanel.vue:54` sits on the **skeleton container**, which is removed
from the DOM the instant loading completes. A status region must be present *before* its content
changes to be announced; here the sequence is exactly inverted — a static `aria-label="Loading tags"`
while nothing is happening, then removal at the one moment there is something to say. Consequently
**none** of: load-complete ("3 tags"), create-success, delete-success, or load-failure is announced.
The error plate does carry `role="alert"` (`EmptyState.vue:18`) — but only because `EmptyState`
supplies it; the panel contributes no live region of its own.

The in-repo idiom exists three files away: `PaginationBar.vue:17` —
`aria-live="polite" aria-atomic="true"` on its count span. The tag count span is the same shape and
has neither.

---

### C-10 — Vacuous gates: two e2e specs, zero unit tests, and a proven no-op mutation

`grep -rln "useAdminTags\|AdminTags" test/` → **no hits**. `test/demo/palettes/` contains exactly
one file (`api/admin-palettes.test.ts`). The composable that holds all of this component's logic has
no unit test at all.

The only coverage is two e2e flows, and their assertion sets are exhaustively:

- `e2e/smoke/admin/flows/tag-create.spec.ts:39-40` — `postBody?.name` and `postBody?.category`.
  Nothing else. **Mutation that keeps it green:** delete `useAdminTags.ts:75-79` entirely (the list
  append, the sort, and both input clears). The POST still fires with the correct body; the spec
  never looks at the DOM afterwards. The entire client-side effect of "create a tag" can be removed
  without turning the gate red.
- `e2e/smoke/admin/flows/tag-delete.spec.ts:49` — `deleteCalled === true`. Nothing else. **Mutation
  that keeps it green:** add `pointer-events: none` to the delete button — a control no human can
  ever operate.

That second mutation is not reasoned, it is measured (`mutcheck.mjs`, real WebKit):

```
{ "dispatchEventFired": 1,
  "realUserClick": "TimeoutError: locator.click: Timeout 2000ms exceeded." }
```

`dispatchEvent("click")` fires the handler on an `opacity:0; pointer-events:none` button while a
real user click times out. The spec's own comment (`tag-delete.spec.ts:39-44`) explains that it uses
`dispatchEvent` deliberately "without an actionability hover synthesis" — i.e. **the gate was
authored around the C-4 defect rather than catching it.** A test that documents why it cannot
exercise the control it tests is a vacuous gate by construction.

Also uncovered by any gate: `loadError` (C-1/C-6), the empty-vs-error distinction the W5-5 comment
celebrates, the create/delete failure paths (C-5), the duplicate append (C-7), and every response
shape in C-2.

---

## MINOR

### C-11 — Both create-form placeholders clip on the capture matrix, contradicting the comment above them

`AdminTagsPanel.vue:17-19` states *"the pair sized honestly (name vs category was ~5×; the category
well **no longer clips its own placeholder**)."* Measured, real WebKit, `devices["iPhone 14"]`
(the exact matrix that produced `shots/safari-mobile-*/admin-tags.png`):

| input | box | client | padding | available text | natural placeholder | overflow |
|---|---|---|---|---|---|---|
| `Tag name...` | 136 px | 133 | 24/24 | **85 px** | **121 px** | **+36 px** |
| `Category...` | 144 px | 141 | 24/24 | **93 px** | **121 px** | **+28 px** |

Both `clipped: true`, at `font-size: 18.2685px`, Fira Code. The certified screenshot shows it: the
name well renders `Tag nam‸` and the category well renders `Category` with the ellipsis cut. At
1440 px neither clips (`overflowPx: -143.8 / -13.8`) — the category well is only 13.8 px from
clipping on the desktop matrix too.

Mechanism: `flex-1 min-w-0` (`:26`) against a hard `w-36` (`:34`) plus a larger mobile padding rung
(24 px vs 16 px) in a three-item flex row. The fixed-width sibling is what starves the flexible one.

### C-12 — `h-7` is an inert per-instance override (dead style + edict-5 violation)

`AdminTagsPanel.vue:10` and `:40` both pass `class="h-7 px-2"` to a glass-ui `Button size="sm"`.
Measured computed geometry of *Refresh tags*: **28 × 36 at 1440 px** and **28 × 54 at 390 px**.
`h-7` = 28 px. The height never takes; glass-ui's own size rung (a `min-height`) wins. `px-2` does
take (28 px width = 8 + 12 + 8). So the file carries a per-instance style override that (a) the
standing law forbids and (b) does not even do anything — the worst of both.

### C-13 — The tag pill is a hand-rolled design-system primitive inside `demo/`

`AdminTagsPanel.vue:91-105` builds a chip-with-dismiss out of 14 utilities on a bare `<div>` plus 11
more on a bare `<button>`, including a bespoke re-implementation of the focus ring
(`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`). Glass-ui is the
design system and `Badge` is an existing component-type name in this very tree
(`AdminPane.vue:6`, `demo/ui/badge`). A dismissible chip belongs there as a `Badge` variant, once,
for all consumers — not inline, per-instance, per-panel.

### C-14 — `UseAdminTags.groupedTags` is typed as a writable `Ref` but is a readonly `ComputedRef`

`useAdminTags.ts:23` declares `groupedTags: Ref<[string, Tag[]][]>`; `:39` assigns a `computed`.
TypeScript accepts it (readonly modifiers are not assignability-checked on properties), so the port's
published contract advertises a writable cell that throws *"Write operation failed: computed value
is readonly"* at runtime. `loading`/`creating`/`tags` are honestly `Ref`; only this one lies. Declare
it `ComputedRef` (or `Readonly<Ref<…>>`).

### C-15 — `onMounted` under `KeepAlive` — the refresh-on-entry is conditional on cache eviction (HYPOTHESIS)

`AdminTagsPanel.vue:125` is `onMounted(() => tagsApi.loadTags())`. The pane is rendered inside
`<KeepAlive :max="6">` (`demo/shell/PaneSlot.vue`, template) with a per-view key
(`usePaneRouter.ts:163-166`), and `useAdminTags` is instantiated **once** at the composition root
(`usePalettePorts.ts:74`) so its state outlives any panel instance. Re-entering `admin-tags` from a
cached `AdminPane` therefore re-*activates* rather than re-*mounts*, and `onMounted` does not fire —
while an LRU eviction (6 slots, 11 possible left panes) makes the same navigation re-mount and
re-fetch. Whether the ledger refreshes on re-entry depends on cache pressure. `onActivated` is the
correct hook and is used exactly once in the whole demo (`demo/picker/visual/HeroBlob.vue:246`).

**Labelled a hypothesis**: my attempt to reproduce it was confounded. Driving the re-entry by hash
(`#/admin/users` → `#/admin/tags`) crashed the pane *before* the tags panel could be observed —
`"Spread syntax requires ...iterable not be null or undefined"` then
`"undefined is not an object (evaluating '$setup.pm.adm…')"`, i.e. the `ADMIN_PORT_KEY` injection
was gone. That crash is real and reproducible but belongs to `AdminPane`/`AdminUsersPanel` and the
hash router, not to this component; it is reported here only so the next seat does not re-run into
it. (Repro: with an admin token set, `page.goto('…/#/admin/tags')`, wait, then
`page.goto('…/#/admin/users', {waitUntil:'commit'})`.)

### C-16 — `catch (e: any)` and a leaked `JSON.parse` message as the API's diagnosis

`useAdminTags.ts:56` is the file's only `any`. It feeds `loadError.value = e?.message` (`:58`)
straight into the error plate's `detail` slot (`AdminTagsPanel.vue:72`). Because `adminRequest` ends
in a bare `res.json()` (`client.ts:154`), a `204 No Content` surfaces to the admin as
**"The string did not match the expected pattern."** (measured). The typed `ApiProblem` machinery
exists and is used on the `!res.ok` path; the ok-but-unparseable path bypasses it.

### C-17 — `@click="tagsApi.loadTags"` passes the `MouseEvent` as the first argument

`AdminTagsPanel.vue:10` passes the function reference; `:75` calls it. `loadTags` currently ignores
arguments so nothing breaks today, but the two call sites in one file disagree, and the reference
form silently forwards a DOM event into a port method — the shape that breaks the moment the
signature grows a parameter.

### C-18 — Rows missing `name` render as blank pills with `:key === undefined`

Measured (C-2 table, row e): `[{"category":"c"},{"category":"c"}]` renders `2 tags`, header `C`, two
empty pills, both keyed `undefined`, both with `aria-label="Delete tag undefined"`. Silent corruption
where a guard belongs.

### C-19 — INFO: `inject(ADMIN_PORT_KEY)!` with a non-null assertion and no guard

`AdminTagsPanel.vue:122`. If the port is absent the component throws during `setup` and, per C-2's
blast radius, takes the whole main region with it. Systemic across the admin cluster rather than
specific to this panel — recorded, not charged.

---

## What is NOT wrong (the negative, proved)

To keep the charge sheet honest, these were tested and are sound:

- **Accessible names.** Every icon-only control carries an `aria-label` (`:10`, `:24`, `:31`, `:41`,
  `:100`) and every decorative glyph carries `aria-hidden="true"`. `REPORT.json` records
  `namelessButtons: 0` and `imgNoAlt: 0` on all four `/#/admin/tags` matrices. This panel contributes
  zero nameless buttons.
- **`focus-visible` reveal works.** Chromium, real Tab, after the 200 ms `transition-all` settles:
  `{ label: "Delete tag alpha", fv: true, opacity: "1" }` with a visible 2 px ring. My first reading
  of `opacity: "0"` was a transition-timing artefact and is retracted.
- **No layout overflow, no console errors, no page errors** on the route in any of the four Safari
  matrices (`overflowX: 0`, `consoleErrors: []`, `pageErrors: []`).
- **No dead style hooks.** `skeleton-ink-register` and `section-label` resolve in
  `demo/styles/utils.css`; `text-mono-small` and `border-card-edge` in `demo/styles/foundation.css`.
- **`verbatimModuleSyntax` clean.** Every import in the SFC is value-position; no type-only import is
  missing `import type`.
- **No god module, no legacy shim, no back-compat path.** The panel is 126 L, the composable 110 L,
  and `usePalettePorts.ts:22-31` documents the deliberate refusal of a compatibility re-export.
- **No rAF loop, no WebGL, no listener/observer to leak, no `defineModel`, no `ValueUnit`, no colour
  parsing.** The repo's named local hazards (PRM-RAF, `defineModel` stale reads, oklch→HSV hue drift,
  `ValueUnit` nesting, reka-ui pointer-capture, eager WebGL boot, the `parseCssColor` crash class) do
  **not** apply to this component. It is defective on its own terms, not by inheritance.

---

## Family grouping — three mechanisms produce nineteen symptoms

1. **Absence is not modelled as a state.** C-1, C-6, C-8, C-9 all follow from four independent
   booleans (`loading`, `loadError`, `tags.length`, token-presence) being asked to encode five
   situations. One discriminated union kills all four.
2. **The transport boundary is unnarrowed and unsequenced.** C-2, C-3, C-7, C-16, C-18 all follow
   from `res.json()` reaching reactive state unvalidated, unordered, and unreconciled. One typed
   parse + one request sequence number + reconcile-by-identity kills all five.
3. **The design system is bypassed at the leaf.** C-4, C-11, C-12, C-13 all follow from a chip, a
   dismiss control, and a size rung being hand-built in `demo/` instead of taken from glass-ui. One
   `Badge` `dismissible` variant with a 24 px target and a `ConfirmDialog` route kills all four.

C-5, C-10, C-14, C-15, C-17, C-19 are independent.
