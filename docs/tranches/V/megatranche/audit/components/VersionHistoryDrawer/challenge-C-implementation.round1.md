# CHALLENGE-C — implementation · `VersionHistoryDrawer.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

Subject: `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` (168 lines, area `palettes`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

**Verdict: DEFECTIVE.** The premise holds and does not need charity. The component's primary
function — showing a palette's version history — **does not work the first time a user asks for
it**, in the shipping code, at both viewports, with zero console errors to hint at it. Fifteen
further defects sit under that one, four of them independently confirmed against a live browser.

---

## Evidence index (every probe I ran)

| # | Probe | Where | Receipt |
|---|---|---|---|
| E1 | Component-level executable probes — real SFC mounted via `@vue/test-utils`+jsdom, scratchpad vitest config, **no repo file written** | scratchpad `vhd*.test.ts` | C-1, C-6, C-7, C-15 |
| E2 | **Live browser**, Chromium, real dev build, second vite on `:9701` with `VITE_API_URL` set + a stub API on `:9713` (the running `:9000` server is latched `misconfigured`, so it issues no requests at all — `demo/platform/transport/availability.ts:151-164`) | scratchpad `vhd-live2.mjs` | C-1, C-3, C-9, C-10 |
| E3 | Live revert probe, 403 and 200 paths | scratchpad `revert.mjs` | C-2, C-4 |
| E4 | Computed-style + served-CSS interrogation of the drawer root | scratchpad `width{,2,3}.mjs` | C-10 |
| E5 | API service read (`api/src/modules/palette/service/{versions,crud}.ts`, `repository/paletteVersion.ts`) | — | C-4, C-7 |
| E6 | `Intl` micro-benchmark, 20 000 iterations | `node -e` | C-12 |
| E7 | Cold-load resource census on `/#/` | scratchpad `eager.mjs` | C-13 |
| E8 | Visual-audit REPORT + `shots/safari-mobile-light/browse.png` read | audit tree | §Reachability |
| E9 | Test-tree census (`test/**`, `e2e/**`) | `grep`/`ls` | C-14 |

Durable evidence copied to `evidence-C/`: `vhd-first-open-EMPTY.png`,
`vhd-second-open-LOADED.png`, `vhd-hover-revert.png`, `live2.log`.

**Independent corroboration.** The sibling L seat (`challenge-L-library.md`, L-1/L-2/L-5/L-6/L-8/
L-9/L-12) reached the first-open failure and several structural cousins from the module-lattice
side with different instruments. Where our findings meet I say so; C-2, C-3 (measured), C-6, C-7,
C-8, C-9, C-14, C-15 and C-16 are this seat's own.

### Reachability — why these severities are what they are

`/#/browse` is live and mounts; the commons is unreachable in the capture matrix
(`shots/safari-mobile-light/browse.png` shows the designed *"The commons is unreachable"* plate), so
the drawer never appears in a route capture and contributes nothing to REPORT.json's tap-target or
accessible-name rows. It is reachable in production: `PaletteCardMenu.vue:93-102` shows the
**Versions** item for any remote palette with `versionCount > 1` — **owned or not**. Every defect
below was therefore reproduced against a real build with a real backend shape, not asserted.

---

## Defects

### C-1 · BLOCKER — the first open of the drawer always shows "0 versions". CONFIRMED, live, both viewports.

**Mechanism.** The fetch is bound to the *edge* of `open`, and the host creates the component with
`open` already `true`, so the edge never happens.

```
VersionHistoryDrawer.vue:158-167
watch(
    () => open,
    (isOpen) => { if (isOpen && paletteSlug) { … loadVersions(); } },
);                    // ← no `immediate`, no init call
```
```
BrowsePane.vue:157-164   <VersionHistoryDrawer v-if="versionPalette" :open="versionDrawerOpen" …>
BrowsePane.vue:272-275   function onVersions(palette) {
                             versionPalette.value = palette;      // ← mounts the component …
                             versionDrawerOpen.value = true;      // ← …already open, one tick
                         }
```
`versionPalette` starts `null` and is never reset, so the very first `onVersions()` mounts the
drawer with `open === true`. Vue batches both writes into one render: no false→true transition
exists for the watcher to see.

**Reproduction (live).** `node scratchpad/vhd-live2.mjs`, Chromium, real dev build, 30 versions
served with a 250 ms delay, waited 1.4 s:

```
########## desktop-1280 ##########
FIRST OPEN:  {"head":"Version HistoryWall Palette 1 — 0 versions…","rowCount":0,…} calls: []
SECOND OPEN: {"head":"Version HistoryWall Palette 1 — 30 versions v30 (current)…","rowCount":20,…}
             calls: ["/palettes/wall-palette-1/versions?limit=20&offset=0"]
########## mobile-375 ##########
FIRST OPEN:  {"head":"Version HistoryWall Palette 1 — 0 versions…","rowCount":0,…} calls: []
SECOND OPEN: {…"rowCount":20…}
CONSOLE ERRORS: []
```

`calls: []` on first open — **no request is issued at all**. Frame:
`evidence-C/vhd-first-open-EMPTY.png` (a drawer titled "Wall Palette 1 — 0 versions", body blank,
for a palette whose own card badge next to it reads 30).

**Reproduction (component).** Same result with the real SFC in jsdom, host replicating
`onVersions()` exactly: `FIRST OPEN fetchVersions calls: 0` / `"Version HistoryP — 0 versions"`;
after close+reopen `calls: 1` / `"P — 2 versions …"`.

**Proposed cure — architectural, not `{ immediate: true }`.** `immediate` would paper over the
symptom and leave C-6 (races) and the "slug changed while open" hole. Bind the load to the
*identity being displayed*, not to a visibility edge, and let it be re-entrant-safe:

```ts
watch(() => (open ? paletteSlug : null), (slug) => { if (slug) load(slug); }, { immediate: true });
```

The gestalt cure is one level up and is the same cure as C-11: the drawer should not own this state
machine at all. `pm.versions` already **is** the state machine (`useVersionHistory.ts:45-128`,
whose `versions`/`total`/`loading`/`loadVersions`/`loadMore`/`reset` have zero consumers). Delete
the copy; have the drawer render `pm.versions.versions` and call `pm.versions.loadVersions(slug)`,
keyed by slug. One implementation, one place for the fix.

---

### C-2 · MAJOR — `Revert` is offered to users who cannot revert, and the 403 fails silently. CONFIRMED, live.

**Mechanism.** The drawer takes no ownership input — its whole prop surface is
`{ open, paletteSlug, paletteName, currentHash }` (`:118-123`) — and renders a Revert button on
every row whose hash isn't current (`:75-84`). The menu that opens it gates on content, not
ownership (`PaletteCardMenu.vue:94`: `v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"`).
The server does enforce ownership (`api/src/modules/palette/routes/…` + `require-ownership.ts`), so
a non-owner's click is a guaranteed 403 — and the failure is swallowed two layers deep
(`useVersionHistory.ts:88-95` → `console.warn`; `BrowsePane.vue:277-284` → `if (!updated) return`).

**Reproduction (live).** `node scratchpad/revert.mjs 403` — anonymous visitor, palette owned by
`gallery`, clicked the first Revert:

```
BEFORE: {"drawer":"Version HistoryWall Palette 1 — 4 versions v4 (current)Jul 1, 08:00 AM","card":"Wall Palette 1241"}
AFTER : {"drawer":"Version HistoryWall Palette 1 — 4 versions v4 (current)Jul 1, 08:00 AM","card":"Wall Palette 1241"}
NET: ["POST revert -> 403"]
LOGS: ["error: Failed to load resource: … 403 (Forbidden)",
       "warning: Failed to revert: ApiProblem: Forbidden …"]
```

The UI is byte-identical before and after. The only trace is a `console.warn` the user never sees.

**Proposed cure.** Two seams already exist and are unused here: BrowsePane computes ownership for
the cards, and `cardRefs[palette.slug]?.showFeedback(message, "error")` (`BrowsePane.vue:264`) is
the repo's own failure-surfacing idiom (`ActionFeedback.vue`). Pass `:is-owned`, render Revert only
for the owner, and route a rejected revert into `showFeedback`. Do not add a new toast system — the
affordance exists.

---

### C-3 · MAJOR — 28 of the drawer's 30 focusable controls are `opacity: 0`, still hit-testable, with no focus reveal. CONFIRMED, live, measured.

```
VersionHistoryDrawer.vue:79
class="mt-2 h-7 text-caption opacity-0 transition-opacity group-hover:opacity-100"
```

**Measured (live, both viewports):**

```
FOCUS: {"focusableCount":30,"invisibleFocusable":28,"firstInvisibleText":"Revert"}
REVERT KEYBOARD/HIT-TEST: {"focused":true,"opacity":"0","outline":"none 3px",
                           "hitTestIsSelf":true,"rect":{"w":89,"h":36}}
buttons: [{"name":"Revert","w":89,"h":36,"opacity":"0","pointerEvents":"auto","visibility":"visible"}, …]
```

Three separate failures in one class string:

1. **Keyboard.** `focus()` succeeds, `opacity` stays `0`, `outline-style: none` → a keyboard user
   tabs through 28 controls that are invisible while focused (WCAG 2.4.7 Focus Visible, AA). There
   is no `group-focus-within`/`focus-visible` escape.
2. **Touch.** `:hover` never resolves on a coarse pointer, so on iOS the button is *permanently*
   invisible — yet `pointerEvents: auto` and `document.elementFromPoint()` at its centre returns
   the button itself. A tap on the blank band under a row's swatches performs a **destructive
   revert with no visible control there**. `evidence-C/vhd-hover-revert.png` shows the reserved
   blank band on the three non-current rows (and its absence on the current row — the row heights
   are ragged as a side effect).
3. **Intra-repo drift.** Every other `group-hover:opacity-100` site in `demo/` pairs the hide with a
   focus escape — `MixSourceSelector.vue:153` (`focus-visible:opacity-100`), `ImageDropZone.vue:58`
   (`group-focus-visible:opacity-100`), `AdminTagsPanel.vue:99` (`focus-visible:opacity-100`).
   This is the only one of the four that does not. (L-8 reaches the same control from the idiom
   side; the focus census, hit test and touch proof are this seat's.)

**Proposed cure.** Stop hiding a destructive control. The honest shapes, in repo-idiomatic order:
(a) a permanently visible `Button variant="ghost" size="sm"` on each row — the drawer already
reserves the space, so nothing moves; (b) if the reveal must stay, it belongs at the glass-ui
`Button` level as a `reveal="hover"` variant that ships `group-hover`+`group-focus-within` together
(edict 4/5), never as a per-instance class string; (c) put Revert behind the row's own menu, which
is where every other destructive palette action lives.

---

### C-4 · MAJOR — the card badge and the drawer subtitle count versions differently, and diverge on every revert. CONFIRMED, live.

**Mechanism.** Two counters over one concept:
* card badge = `palette.versionCount` (`PaletteCardMeta.vue:27-32`), a monotone `$inc`;
* drawer subtitle = `page.total` (`:11`, `:146`) = `countByPaletteSlug` — the true row count.

The server increments `versionCount` on revert (`service/versions.ts:172 $inc: { versionCount: 1 }`)
but `createVersionRecord` is content-hash-idempotent and returns early when the hash already exists
(`service/versions.ts:38-44`) — and on a revert the hash *always* already exists, by definition.
The same holds for an edit back to earlier content (`service/crud.ts:188-193`). So each revert adds
1 to the badge and 0 to the row count. The drawer also never refetches after emitting `revert`
(no watcher on `currentHash`; `BrowsePane.vue:283` only swaps the object).

**Reproduction (live).** `node scratchpad/revert.mjs 200`, stub modelling the server exactly
(`versionCount 4 → 5`, versions list unchanged):

```
BEFORE: card "Wall Palette 1 2 4 1"   drawer "… — 4 versions"
AFTER : card "Wall Palette 1 2 5 1"   drawer "… — 4 versions"
```

Card says 5, drawer says 4, both on screen at once, one click apart.

**Proposed cure.** One counter. The drawer's subtitle should read the palette's `versionCount`
(passed in with the other palette facts it already receives) *or* the API should stop double-
counting deduped reverts; and the row ordinal should come from the record (`PaletteVersion.depth`,
which the server computes and the client throws away — see C-7), not from two disagreeing totals.

---

### C-5 · MAJOR — a failed fetch is rendered as "this palette has no history"; a failed page is a silently no-oping button.

**Mechanism.** `useVersionHistory.fetchVersions` swallows every error and returns `undefined`
(`useVersionHistory.ts:56-62`); the drawer's `if (!page) return` (`:141`) exits inside the `try`,
`finally` clears `loading`, and nothing records that anything failed:

```
ERROR-PATH text: "Version HistoryP — 0 versions"      ← identical to a genuinely empty history
```

Load-more failure is worse: `versions.length < total` still holds, so the button remains and each
click re-issues the same doomed request with no feedback. Probe with a server that answers page 2
with `{data: [], total: 40}` (the shape a concurrent delete produces, since `listVersions` reads
`find` and `count` in an untransacted `Promise.all` — `service/versions.ts:92-95`):

```
LOADMORE calls: 9  [["s",20,0],["s",20,2],["s",20,2],["s",20,2],["s",20,2],["s",20,2],["s",20,2],["s",20,2],["s",20,2]]
LOADMORE still present: true
```

Eight identical requests at a frozen offset, button never retiring. Nothing in the component
bounds progress.

**Proposed cure.** The app already ships the vocabulary: `EmptyState` (`demo/shared/ui/EmptyState.vue`,
used by BrowsePane), the `apiAvailability` latch, and the `ApiOfflineChip`. Let `fetchVersions`
reject (or return a discriminated result), give the drawer three honest states — *loading* /
*empty* / *failed + retry* — and stop the load-more button when a page returns fewer rows than it
asked for, regardless of `total`.

---

### C-6 · MAJOR — no request identity: a late response overwrites the list of a different palette. CONFIRMED (component-level).

`loadVersions` writes `versions.value`/`total.value` unconditionally on resolution (`:142-147`).
Nothing tags, cancels or discards a superseded request; `listVersions` takes no `AbortSignal`
(`demo/palettes/api/versions.ts:24-32`). Because the host never unmounts the drawer
(`v-if="versionPalette"`, and `versionPalette` is never nulled), one instance serves every palette.

**Reproduction.** Component probe, palette A opened → closed → palette B opened, then B's response
resolved *before* A's:

```
RACE calls: [ [ 'A', 20, 0 ], [ 'B', 20, 0 ] ]
RACE rendered text: "Version HistoryB — 2 versions  v2 …  v1 …"   ← header B, rows and total from A
```

The user sees palette B's name over palette A's versions — and every Revert button in that list
emits a hash from A while `BrowsePane.onRevert` posts it to **B's** slug (`BrowsePane.vue:279`).
With a real server that's a 404, not a corruption; on a shared content-hash it is not.
(In production the ordering needs a slow first request — labelled: mechanism confirmed, wall-clock
frequency unmeasured.)

**Proposed cure.** A monotonic request token (`const seq = ++reqId; … if (seq !== reqId) return;`)
is the minimum; threading an `AbortController` through `listVersions` is the honest one, and it
belongs in the single owner (`useVersionHistory`), not in a per-drawer copy.

---

### C-7 · MINOR — the version ordinal is invented from array position, so it lies whenever the array does.

`v{{ total - i }}` (`:37`) derives a user-facing identifier from *index in a mutable array* and a
*separately fetched total*. `PaletteVersion.depth` — the server's computed lineage index
(`service/versions.ts:46-57`, `types.ts:76`) — is fetched and discarded.

Three observed failure modes:

| Input | Render | Probe |
|---|---|---|
| `total` missing from the payload | `vNaN` for every row, subtitle `"Wall Palette 1 — versions"` | live run 1 (a wrong-shaped page reached the drawer): `"… — versions vNaN Jul 4, 08:00 PM…"` — no validation, no error, three rows all keyed `undefined` |
| page 2 re-serves a row already loaded (a version created between pages; server sorts `createdAt:-1` + `skip`, `repository/paletteVersion.ts:22-27`) | the same hash renders twice, labelled **v20 and v19** | probe B: 4 rows, no Vue duplicate-key warning |
| `versions.length > total` | `v0`, `v-1`, … | probe (double-append) |

**Proposed cure.** Label from the record, not the position — `depth` is exactly this number and is
already on the wire; or drop the pseudo-version-number and identify rows by short hash + time, the
way the fork line already does (`:71`).

---

### C-8 · MINOR — an empty history renders a blank rectangle.

`total === 0` → the `v-if="loading"` block is gone, the `v-for` has nothing, the load-more `v-if`
is false: the body is empty (`EMPTY: "Version HistoryP — 0 versions"`). The repo has an
`EmptyState` component and a documented dashed-well idiom for exactly this
(`demo/DESIGN.md:98`); the drawer uses neither. This is also the state C-1 and C-5 both land in,
which is why *broken*, *failed* and *genuinely empty* are indistinguishable to a user.

---

### C-9 · MINOR — accessibility of the rendered drawer: measured.

Live, drawer open, 20 rows:

```
role="dialog" present (glass-ui) · aria-live/role=status count: 0 · <ul>/<li> count: 0
closeBtn: {"w":16,"h":16}   swatch: {"w":20,"h":20} (decorative <div>, not exposed, not labelled)
```

* **No `aria-live`.** The list arrives asynchronously and announces nothing; the `Loader2` spinner
  (`:18`) is a bare icon with no `role="status"`, no name — a screen-reader user gets silence, then
  20 unannounced rows.
* **No list semantics.** 20 sibling `<div class="group">` rows; a screen reader gets no count and no
  "item 3 of 20".
* **The current-version marker is colour + a decorative bar only** (`:29-32` `ring-2 ring-primary`
  plus a 4×1 `<div>`); the "(current)" text at `:38` saves it, but the row exposes no `aria-current`.
* **Close button 16×16** — below the 24×24 minimum (WCAG 2.5.8) and below the visual REPORT's own
  tap-target bar; this is glass-ui's `showClose` affordance, so per edict 4 the cure is a glass-ui
  fix, not a demo override.
* Per C-3, 28 of the 30 focusables are invisible while focusable.

---

### C-10 · MINOR — the width the component declares is not the width it gets: dead per-instance overrides.

```
:3   <DialogContent placement="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
```

Measured on the live element (`getComputedStyle`), viewport 1280:

```
className: "… glass-floating w-[380px] sm:max-w-[420px] flex flex-col"
width: "384px"   maxWidth: "384px"   inlineSize: "384px"   inset: "0px 0px 0px 896px"
```

and at viewport 375: `width 281px`, `overflowX 0`. The utilities *are* emitted — the served CSS
contains `.w-\[380px\]{width:380px}` and `.sm\:max-w-\[420px\]{@media (width>=40rem){max-width:420px}}`
— they simply never win against the glass-ui side-sheet geometry. So the component ships two
width declarations that do nothing: dead code, and precisely the per-instance override edict 5
forbids. (L-9 counts four such bespoke recipes across the dialog cluster; this is the measurement
that they are inert.)

**Note (falsified hypothesis, kept as negative proof):** `w-[380px]` with no mobile clamp *looks*
like a 375 px-viewport overflow. It is not — glass-ui clamps the sheet to 281 px and
`document.documentElement.scrollWidth - innerWidth === 0`. No overflow exists.

---

### C-11 · MAJOR — the paging state machine is implemented twice; the shipped copy is the broken one.

`VersionHistoryDrawer.vue:137-155` is `useVersionHistory.ts:65-86` with one line removed:

```
drawer  :137  async function loadVersions(offset = 0) {           composable :65  async function loadVersions(slug, offset = 0) {
        :138      loading.value = true;                                      :66      loading.value = true;
        :139      try {                                                      :67      try {
                                                                             :68          paletteSlug.value = slug;
        :140          const page = await pm.versions.fetchVersions(…)        :69          const page = await fetchVersions(slug, 20, offset);
        :141          if (!page) return;                                     :70          if (!page) return;
        :142-147      … identical offset-0 / append branches …              :71-76      … identical …
        :148      } finally { loading.value = false; }                       :77      } finally { loading.value = false; }
```

`grep` of every `pm.versions.*` call site in `demo/`: exactly three — `fetchVersions`
(drawer `:140`), `revert` (`BrowsePane.vue:279`), `fork` (`useDialogBrowseActions.ts:55`). The other
**seven** members (`versions`, `total`, `loading`, `paletteSlug`, `loadVersions`, `loadMore`,
`reset`) have zero consumers. The comment at `:130-131` records the fork as a decision
("keep per-drawer local list") — it is the dual path the no-legacy/KISS edicts forbid, and it is
where C-1, C-5 and C-6 live. Corroborates L-2 from the implementation side.

**Proposed cure.** Delete the drawer's copy; consume the composable. If per-drawer isolation is
genuinely wanted, then the composable is the dead thing and its seven orphan members should go
instead — but one of the two must die.

---

### C-12 · INFO — `formatTime` builds a fresh `Intl` formatter per row per render.

`dateFormat.ts:2-13` calls `new Date(iso).toLocaleString(undefined, {…})` — no cached
`Intl.DateTimeFormat`. Measured, 20 000 iterations:

```
toLocaleString per call: 24.39 µs | cached Intl.DateTimeFormat: 2.18 µs | ratio 11.2×
20 rows per render: 0.488 ms vs 0.044 ms
```

0.5 ms per render is not a user-visible cost at 20 rows; it is 11× more than it needs to be, in a
helper shared by the whole palette surface. Hoist one module-level formatter.

---

### C-13 · INFO — eagerly loaded on every route (confirms DEFECT-LEDGER:13805).

Cold load of `/#/`, `performance.getEntriesByType("resource")`: 250 resources, including
`demo/palettes/browser/dialog/VersionHistoryDrawer.vue` and `demo/palettes/useVersionHistory.ts`, on
a route that never mounts either. Already booked; recorded here as a fresh receipt.

---

### C-14 · MINOR — vacuous gate: the component has no test that could fail, and the shipped bug proves it.

* Unit tests: **none.** `test/**` and `demo/test/**` contain no reference to the drawer,
  `useVersionHistory`, or `listVersions` (`ls test/demo/palettes/api` → `admin-palettes.test.ts` only).
* e2e: **one** touch — `e2e/smoke/oracles/o10d-display-voice-census.spec.ts:326-337`. It opens the
  drawer *for the first time* and asserts only `fontFamily` matches the display face and
  `fontWeight ≤ 500` on the title, then presses Escape.

**The exact mutation that keeps the suite green:** replace the body of `loadVersions` with `{}`.
That is functionally what ships today (C-1: the first open issues no request), and o10d is green —
so the gate is not merely weak, it is *currently* passing over a blocker. Also green under: deleting
every `Revert` button, `.slice(0, 8)` → `.slice(0, 1)`, `v{{ total - i }}` → `v{{ i }}`, removing
the `(current)` marker, and deleting the load-more button.

**Proposed cure.** One component test at the seam the L seat and I both used — mount the real SFC
with a stubbed `BROWSE_PORT_KEY`, host it exactly as `BrowsePane` does, assert one row per version
on **first** open. It is ~30 lines and would have caught C-1, C-5, C-6 and C-7 in a single file.

---

### C-15 · MINOR — the date guard is dead code, and bad timestamps render as confident lies.

`dateFormat.ts:2-13` wraps `toLocaleString` in `try/catch`. `toLocaleString` does not throw on an
invalid date in V8/JSC — it returns the string `"Invalid Date"`. The catch is unreachable. Measured
rendering of five boundary rows:

```
TIMESTAMPS: "… v5 Invalid Date …  v4 Invalid Date …  v3 Dec 31, 07:00 PM …  v2 Jun 30, 08:00 PM …  v1 Dec 31, 06:59 PM"
             ("not-a-date")        ("")                (null → epoch!)                              (1969-12-31Z)
```

`createdAt: null` renders as **"Dec 31, 07:00 PM"** — `new Date(null)` is the epoch, so a missing
timestamp is displayed as a real, wrong date. `createdAt: undefined` renders "Invalid Date". A
`colors: null` row throws in the render function outright
(`TypeError: Cannot read properties of null (reading 'slice')`, `:53`) — the component performs no
payload validation anywhere.

---

### C-16 · MINOR — the load-more progress indicator renders where the user is not looking.

The spinner is the **first** child of the scroll container (`:17-19`), before the `v-for`. "Load
older versions" is the **last** (`:88-97`), reached by scrolling to the bottom of an
`overflow-y-auto` column. Clicking it therefore renders the only progress feedback off-screen above
the fold, while the button itself merely goes `disabled` with no busy state. Deterministic from DOM
order; no live timing needed.

---

## What is genuinely sound (positive evidence, not silence)

I looked for these and did not find them:

* **No leaks.** The component registers no listener, observer, timer, or rAF; there is nothing to
  clean up, and nothing to gate. It touches no WebGL. Unmounting mid-flight resolves without a
  throw (probe: `UNMOUNT: resolved after unmount without throw; calls: 1`).
* **No `defineModel`.** `open` is an explicit prop + `update:open` emit (`:118-128`), so the
  documented `WritableComputedRef` stale-read hazard cannot apply here.
* **No colour parsing.** `:style="{ backgroundColor: c.css }"` hands the string to CSSOM, which
  drops an invalid value silently — the live `parseCssColor` crash class is not reachable from this
  component. No `ValueUnit` wrapping, no oklch→HSV roundtrip, no slider, no pointer capture.
* **`verbatimModuleSyntax` clean** — `import type { PaletteVersion }` (`:116`) is the file's only
  type-only import and it is marked. Reactive props destructure (`:118`) is idiomatic 3.5.
* **The 8-swatch cap is the good precedent** — `.slice(0, 8)` plus an honest `+{{ n-8 }}` chip
  (`:53-63`), measured live as `overflowChip: "+3"` on 11-colour versions. The scalability audit
  cites this component as the pattern the flagged panel should have copied.
* **No horizontal overflow** at 375 px (`scrollWidth - innerWidth === 0`), and **zero console or
  page errors** across every live drawer session I ran.
* **Escape and focus restoration work** (glass-ui `DialogContent` restores focus to the trigger;
  o10d asserts the hidden transition), and `role="dialog"` is present.

---

## Files cited

```
demo/palettes/browser/dialog/VersionHistoryDrawer.vue        :3 :11 :17-19 :29-32 :37-38 :53-63 :71 :75-84 :88-97 :104-116 :118-128 :130-155 :158-167
demo/palettes/BrowsePane.vue                                 :113 :157-164 :264 :269-284
demo/palettes/useVersionHistory.ts                           :45-128 (:56-62 :65-86 :88-95)
demo/palettes/api/versions.ts                                :24-39
demo/palettes/browser/dateFormat.ts                          :2-13
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue   :93-102
demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue   :27-32
demo/palettes/usePalettePorts.ts                             :75 :189 :273
demo/platform/transport/availability.ts                      :151-172
demo/workbenches/mix/MixSourceSelector.vue                   :153
demo/workbenches/extract/ImageDropZone.vue                   :58
demo/palettes/browser/admin/AdminTagsPanel.vue               :99
api/src/modules/palette/service/versions.ts                  :32-75 :86-97 :121-181 (:172)
api/src/modules/palette/service/crud.ts                      :186-205 (:193)
api/src/modules/palette/repository/paletteVersion.ts         :17-28
e2e/smoke/oracles/o10d-display-voice-census.spec.ts          :326-337
docs/tranches/V/megatranche/audit/visual/REPORT.md           :121 :151 (browse rows)
docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/browse.png
```

Probe scripts live in the session scratchpad
(`/private/tmp/claude-504/…/scratchpad/{vhd.test.ts,vhd2.test.ts,vhd3.test.ts,vhd-live2.mjs,revert.mjs,width3.mjs,eager.mjs,stub-api.mjs}`);
nothing outside `docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/` was written,
and no `src/`, `demo/`, `api/`, `test/` or `e2e/` file was modified.
