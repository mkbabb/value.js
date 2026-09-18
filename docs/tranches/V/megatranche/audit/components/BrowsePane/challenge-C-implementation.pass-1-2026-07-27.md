# CHALLENGE-C · `demo/palettes/BrowsePane.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was
explicitly spawned with. Not inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** 18 findings: 2 BLOCKER, 9 MAJOR, 6 MINOR, 1 INFO (a negative proof).

The route's own console record already says so: **all four Safari matrices logged
`Failed to load remote palettes: SyntaxError: The string did not match the expected pattern.`
on `/#/browse`**, and the captured screenshot is the error plate, not the wall. The wall was never
photographed by the visual audit. This seat routed a commons into the live dev server and drove the
wall for the first time; everything below except where explicitly labelled is measured, not read.

Frontier of the defect: the pane is a thin template over `BROWSE_PORT_KEY`, and the port hands it
**shared mutable singletons** (`searchQuery`, `expandedId`) plus a **generation-guarded loader whose
guard is applied to the wrong variable**. The pane then adds a **write-only ref registry**, a
**second copy of the server's colour filter**, and an **error gate that can never fire when it
matters**.

---

## Evidence apparatus

| artefact | what it is |
| --- | --- |
| `probe-C-webkit-json.mjs` | WebKit vs Chromium `Response.json()` failure-message identification |
| `probe-C1-loadingMore-stuck.test.ts` | 4 unit probes against the real `useBrowsePalettes` (all pass) |
| `probe-C4-cardrefs-leak.test.ts` | 2 unit probes on the verbatim `cardRefs` idiom (both pass) |
| `probe-C-live-r2.mjs` | live wall a11y + stranded `loadingMore` + zero-result search |
| `probe-C-live-r3.mjs` | shared `searchQuery`, colour-search, cursor/filter drift |
| `probe-C-live-r4.mjs` | shared `expandedId`, measured geometrically |
| `r2-*.png`, `r3-*.png`, `r4-*.png` | frames for each state |

**Probe-environment note (load-bearing).** `http://localhost:9000` **cannot be probed at all**:
`detectDevMisconfig` (`demo/platform/transport/availability.ts:114`) latches any *loopback* page with
no `VITE_API_URL` into `misconfigured`, and `assertApiAttemptAllowed` (`:180`) then throws *before*
`fetch` — so no palette request is ever issued and nothing is interceptable. Every live probe here
reaches the same dev server over its LAN host (`http://192.168.1.166:9000`), which clears the latch,
and intercepts the resulting `https://api.color.babb.dev` traffic. Recorded so the next seat does not
lose an hour to it.

```
$ node .../probe-C-live-r2.mjs      # first attempt, on localhost:9000
locator.waitFor: Timeout 25000ms exceeded.
  - waiting for getByRole('main').getByRole('article').first() to be visible
```

---

## BLOCKERS

### C-1 · The wall is dead in Safari, and the pane reports the wrong cause

`request()` ends with a bare `return res.json()` — no `content-type` check, no typed wrap:

```ts
// demo/platform/transport/client.ts:112-119
    if (!res.ok) { … throw await ApiProblem.from(res); }
    return res.json();
```

`loadRemotePalettes` then **discards the error object entirely** and substitutes a constant:

```ts
// demo/palettes/useBrowsePalettes.ts:77-82
        } catch (e) {
            if (gen !== loadGeneration) return;
            browseError.value = "Failed to load palettes";   // ← the ONLY value this ref ever takes
```

and `BrowsePane.vue:62-67` renders that constant under the display line
**"The commons is unreachable."**

**Chain of evidence.**

1. `audit/visual/REPORT.json` — `/#/browse`, **4 of 4** matrices
   (`safari-desktop-light|dark`, `safari-mobile-light|dark`):
   `consoleWarnings: ["Failed to load remote palettes: SyntaxError: The string did not match the expected pattern."]`,
   `consoleErrors: []`, `bodyTextLength: 280` desktop / `124` mobile.
2. `shots/safari-desktop-light/browse.png` — the rendered pane is
   *"⚠ The commons is unreachable. / Failed to load palettes / [Retry]"*. Zero cards.
3. That exact string is **WebKit's `Response.json()` parse failure**, identified by probe:

```
$ node docs/.../BrowsePane/probe-C-webkit-json.mjs
== WebKit (Safari engine) ==
  /good      PARSED OK
  /empty     SyntaxError: The string did not match the expected pattern.
  /html      SyntaxError: The string did not match the expected pattern.
  /trailing  SyntaxError: The string did not match the expected pattern.
```

4. A 200-with-non-JSON body is trivially reachable in this very tree — the dev origin's SPA
   fallback answers the palette path with HTML:

```
$ curl -s -D - -o /tmp/pal.out "http://localhost:9000/palettes?limit=50&sort=newest" | head -3
HTTP/1.1 200 OK
Vary: Origin
Content-Type: text/html
```

So the backend (or whatever answered) returned **200 with a body that is not JSON**, the client threw
a raw parse error, and the user was told **the server is unreachable**. It was reached. It answered.

The taxonomy loss is total: the transport carefully mints four distinguishable failures —
`DevMisconfigError` (a *loud, designed* dev state with an actionable message),
`ApiUnavailableError`, `ApiProblem` (RFC 7807, with `status`/`title`/`detail`), and now a raw
`SyntaxError` — and `useBrowsePalettes.ts:79` collapses all four into one 24-character string. The
`EmptyState` `detail` slot exists precisely to carry "the machine truth in Fira"
(`EmptyState.vue:14`); it is fed the same constant as the headline, so the detail line is a
tautology.

- **Severity** BLOCKER — the route has **no content at all** in the only matrix that was captured,
  and the surfaced diagnosis is false.
- **Cure** `request()` guards the parse (`content-type` check → throw a typed
  `ApiProblem`/`ApiMalformedResponse` carrying status + the first 200 chars of the body);
  `browseError` becomes `Ref<ApiProblem | Error | null>` and the plate renders `problem.title` /
  `problem.detail`. The DevMisconfig message — already written to be actionable — reaches the plate
  instead of dying in the console.

### C-2 · `loadingMore` is stranded TRUE for the session; load-more dies permanently

```ts
// demo/palettes/useBrowsePalettes.ts:97-113
    async function loadMoreRemotePalettes() {
        if (!hasMore.value || nextCursor.value == null || loadingMore.value) return;   // :98
        const gen = loadGeneration;                                                    // :99
        …
        } finally {
            if (gen === loadGeneration) loadingMore.value = false;                     // :112
        }
```

The generation guard is right for the **append** (a stale page must not land) and wrong for the
**flag**: `loadingMore` is owned solely by this continuation, and **no other code path ever writes it
false**. Any concurrent reload — the 400 ms search debounce (`usePaletteWiring.ts:162`), a sort /
tier / tag change (`useDialogBrowseActions.ts:88/93/99`), a slug change (`:139`), or simply switching
back to the browse view (`:145`) — bumps `loadGeneration` and orphans the flag. Line `:98` then
rejects every future click. The pane is `KeepAlive`d (`demo/shell/PaneSlot.vue:126`), so the state
survives view switches: **dead for the whole session.**

Unit probe (against the real composable):

```
$ npx vitest run --config <scratch>/probe-c.vitest.config.ts
 ✓ probe-C1-loadingMore-stuck.test.ts (4 tests) 29ms
 ✓ probe-C4-cardrefs-leak.test.ts (2 tests) 193ms
 Test Files  2 passed (2)   Tests  6 passed (6)
```

End-to-end in the running app (`probe-C-live-r2.mjs` — click "More from the commons", type one
character while page 2 is in flight, release page 2, clear the box):

```json
"afterRace": { "cards": 50, "strandedSkeletonVisible": true, "loadMoreButtonCount": 0 }
```

Two developing plates sit at the foot of a fully-loaded wall forever, the affordance is gone, and
palettes 51+ are unreachable. Frame: `r2-stranded-loadmore.png`.

- **Severity** BLOCKER — permanent, session-scoped loss of the pane's only pagination affordance,
  with a permanent false "loading" signal, reachable by typing a character at the wrong moment.
- **Cure** the flag is not generational state. `finally { loadingMore.value = false; }`
  unconditionally; keep the `gen` guard on the append only. (Idiomatically: fold cursor + inflight +
  error into one `usePagedResource` state machine so "in flight" cannot outlive its request.)

---

## MAJOR

### C-3 · A keyset cursor minted under filter-set A is sent with filter-set B

`loadMoreRemotePalettes` re-derives the filter params **at send time**
(`listPalettes({ ...currentFilterOpts(), cursor })`, `:103`) while `cursor` was minted by a request
issued under the *previous* params. The 400 ms search debounce is a wide-open window. Measured — I
typed `ab` and clicked "More" inside the debounce:

```json
"G_debounceWindow": { "requests": [
  "?limit=50&cursor=page-2&sort=newest&q=ab",     ← cursor from the UNFILTERED stream + the new q
  "?limit=50&sort=newest&q=ab"
]}
```

The server applies `q=ab` to a keyset window opened on the unfiltered `(createdAt,_id)` stream
(`api/src/modules/palette/service/crud-list.ts:147-151`), so the "next page" is not the continuation
of the `q=ab` result set: rows are skipped, silently.

- **Cure** capture the filter set together with the cursor
  (`nextCursor: { cursor, opts }`) and send the captured `opts`; drop the cursor whenever the filter
  set changes.

### C-4 · The error plate can never render when the wall is non-empty

```vue
<!-- BrowsePane.vue:62 -->
v-else-if="pm.browseError.value && displayedBrowse.length === 0"
```

`loadRemotePalettes` never clears `remotePalettes` on failure (`:77-82`), so after a **failed search
/ sort / tier reload** the previous wall is still on screen and `displayedBrowse.length !== 0` — the
plate is suppressed and the failure is *invisible*. Simultaneously the load-more button is gated on
`!pm.browseError.value` (`:133`) and vanishes. Net: stale content, no error, no pagination, no
recovery affordance. Probe `C-3`:

```ts
expect(b.browseError.value).toBe("Failed to load palettes");
expect(b.filteredBrowse.value.length).toBe(50);   // → the error plate NEVER renders
```

- **Cure** the failure of a *reload* is a distinct state from an empty wall. Render a non-blocking
  band over the retained wall (retry inline), and let the full plate own only the
  empty-and-failed case.

### C-5 · `cardRefs` is a write-only registry of dead component instances

```vue
<!-- BrowsePane.vue:94 -->
:ref="(el: any) => el && (cardRefs[palette.slug] = el)"
<!-- BrowsePane.vue:209 -->
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
```

Vue calls a function ref with `null` on unmount; the `el &&` short-circuit **swallows that call**, so
no key is ever deleted. Inside a `KeepAlive`d pane the map grows for the entire session and every
entry pins an unmounted component instance. Probe `C-4` (verbatim idiom):

```ts
expect(Object.keys(cardRefs).length).toBe(154);   // 3 + 1 + 150, none released
expect(cardRefs.a.$.isUnmounted).toBe(true);
cardRefs.a.showFeedback("Saved!");                // no throw, no DOM, silently lost
```

Consequence beyond the leak: `onSave` / `onDeleteOwned` / `onSetVisibility` / `onForkError`
(`:228,237,249,264`) all route their verdicts through this map. Any slug whose card was re-rendered
under a different identity gets its verdict written to a corpse — **the user is told nothing**. The
identical idiom is copy-pasted at `PalettesPane.vue:84`, so it is a family, not an instance.

- **Cure** `:ref="(el) => { if (el) cardRefs[palette.slug] = el; else delete cardRefs[palette.slug] }"`
  — or better, delete the registry: feedback is card-local state and belongs in the card, driven by
  a prop/event, not by an imperative reach through a parent-held instance handle.

### C-6 · "Find by Color" searches the 50 loaded rows, in a second copy of the server's filter

```ts
// BrowsePane.vue:339-355
const displayedBrowse = computed(() => { … const radius = 0.15;
    return palettes.filter((p: any) => { … return oklabColors.some(
        (c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius); }); });
function onColorSearch(L, a, b) { colorSearchParams.value = { L, a, b };
    // API also supports server-side via colorL/colorA/colorB params, but client-side is instant
}
```

This is a **line-for-line re-implementation** of `colorMatcherFor` in
`api/src/modules/palette/service/crud-list.ts:159-181`, including the magic `0.15` default, against a
wire field the API already ships (`format.ts:78`) and the client already types
(`api/palettes.ts:47-50`). Two copies of one predicate, two copies of one constant, no shared source
— and the copy that runs sees ≤ 50 of the commons. Measured: the colour search issues **zero**
network requests (`requestsIssuedByColorSearch: 3`, unchanged from before the search).

- Violates the no-second-copy / one-path posture the sibling composable
  (`useDialogBrowseActions`, "the ONE shared implementation … no hand-rolled second copy") was
  extracted to enforce.
- **Cure** thread `colorL/colorA/colorB/colorRadius` into `currentFilterOpts()` and delete
  `displayedBrowse` + `colorSearchParams` outright. The filter then composes with the cursor, the
  sort, and the tag/tier set instead of fighting them.

### C-7 · A zero-**result** search renders the true-**empty** invitation, with load-more still offered

Measured twice, on a wall of 50 (`probe-C-live-r2/r3`):

```json
"zeroResultSearch":  { "cards": 0, "eyebrow": true, "copy": true, "hint": true }
"H_colorSearchNoMatch": { "wallCards": 0, "trueEmptyInvitation": true, "hint": true,
                          "loadMoreStillOffered": 1 }
```

The user searches the commons, finds nothing, and is told
*"· the commons · / **No published palettes here yet.** / Publish one from My Palettes and start the
wall."* — on a commons with fifty published palettes in it. Directly under that invitation sits the
button **"More from the commons"** (the load-more block at `:132-144` lives *outside* the
`PaletteCardGrid`, so `empty` never suppresses it). Frames: `r2-zero-result-search.png`,
`r3-color-search-empty.png`.

- **Cure** three distinct states, three distinct plates: empty commons / no results for *this* query
  (with a clear-filters action) / error. Gate the load-more block on `displayedBrowse.length > 0`.

### C-8 · One `searchQuery` ref drives two simultaneously-visible panes

`browse` is a **two-pane view** — `viewSchema.ts:124` `{ left: "browse", right: "palettes" }` (visible
in `shots/safari-desktop-light/browse.png`: Browse left, My Palettes right). Both `SearchBar`s
`v-model` the same ref (`usePalettePorts.ts:54` → browse port `:183`, library port `:141`). Measured:

```json
"E_before":  { "myPalettes_KitchenReds": 1, "myPalettes_ZephyrBlues": 1 }
"E_afterTypingInCommonsSearch": {           ← typed "zephyr" into "Search the commons…"
   "myPalettes_KitchenReds": 0,             ← the RIGHT pane silently lost a palette
   "myPalettes_ZephyrBlues": 1,
   "myPalettesSearchBoxValue": "zephyr" }   ← and the right pane's own box was overwritten
```

The file's own comment claims the opposite — *"the twin placeholder is scoped — this one searches the
public wall"* (`BrowsePane.vue:5-7`). Only the *placeholder* is scoped. Frame:
`r3-shared-search-query.png`.

- **Cure** the query is pane state, not app state. `useBrowsePalettes` owns its own `searchQuery`;
  the library and admin surfaces own theirs.

### C-9 · One `expandedId` ref for two simultaneously-visible walls

`actions.expandedId` is handed to both the library port (`usePalettePorts.ts:144`) and the browse
port (`:177`); `toggleExpand` (`usePaletteActions.ts:27-29`) assigns exclusively. Measured
geometrically (`probe-C-live-r4.mjs`; cards carry no `aria-expanded` to read):

```json
"2_afterExpandingWallCard":        { "Palette: Wall Palette 1": 196, "Palette: Kitchen Reds": 120 }
"3_afterExpandingMyPalettesCard":  { "Palette: Wall Palette 1": 100, "Palette: Kitchen Reds": 172 }
```

Opening a card in **My Palettes** (right) silently collapses the open card in the **wall** (left).
Frame: `r4-shared-expandedid.png`.

- **Cure** expansion is per-wall. One `expandedId` per list surface.

### C-10 · Every entry into the browse view discards all pages past the first

```ts
// demo/color-picker/composables/usePaletteWiring.ts:143-152
    watch(viewManager.currentView, (view) => {
        if (view === "browse") { ports.browse.loadRemotePalettes(); }          // ← no guard
        if (view === "admin-users" && ports.admin.adminUsers.value.length === 0) …  // ← guarded
```

`loadRemotePalettes` **replaces** the array (`useBrowsePalettes.ts:74`
`remotePalettes.value = res.data`). The pane is `KeepAlive`d, so its scroll offset is preserved while
its content is cut back to 50 rows: a user who paged to 150 palettes, switched to Extract, and
switched back finds two-thirds of the wall gone under an unchanged scrollbar. The guard idiom the
same watcher applies to the admin loads three lines below is simply missing here.

- **Cure** guard on `remotePalettes.value.length === 0` (or a freshness stamp), as the sibling admin
  branches already do.

### C-11 · No live region anywhere in the pane; the loading blocks are named illegally

Measured on the fully-loaded wall (103 operable controls in the pane):

```json
"wallA11y": { "operableControls": 103, "namelessButtons": 0,
              "smallTapTargets": [], "liveRegionsInPane": 0, "overflowX": 0 }
"loadingBlockRoles": { "loadingMore": [ { "tag": "div", "role": null,
    "ariaLabel": "Loading more palettes", "ariaLive": null, "ariaBusy": null } ] }
```

`BrowsePane.vue:47` and `:128` put `aria-label` on a bare `<div>`. A `div` with no role maps to
`generic`, and **ARIA in HTML forbids naming `role="generic"`** — the label is discarded by AT, so
the two loading states are *nameless and silent*. There is no `aria-busy` on the grid and no
`role="status"` / `aria-live` on the result container, so none of the pane's async transitions are
announced: 50 cards arriving, a search collapsing the wall to zero, a page appending 12 rows. The
error plate is the pane's *only* announced state (`EmptyState.vue:22` `role="alert"`), which is why
the a11y story looks fine in the only frame the visual audit captured.

- **Cure** `role="status" aria-live="polite"` on one stable result-status node that announces
  "Loading palettes" / "50 palettes" / "No results for …"; `aria-busy` on the grid; drop the
  prohibited labels.

### C-12 · The colour field silently searches a *different colour* than the one typed

```ts
// demo/palettes/browser/search/SearchFilterBar.vue:212-219
const text = colorText.value.trim();
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

The input's own placeholder is `#hex, hsl(...)` (`:88`) and its label is "Search by CSS color"
(`:90`). Anything that is not exactly six hex digits — `hsl(200 50% 50%)`, `red`, `#f00`,
`oklch(0.7 0.1 200)` — is **discarded without a word** and replaced by the swatch's current hex
(default `#4488cc`). The user asks for green and is shown results for blue, with no error, no
validation state, and no hint that the text was ignored. This repo's `parseColorIn` (already imported
two lines above, `:145`) parses every one of those forms.

*Reproduction: static and deterministic from the quoted ternary — not separately driven in-browser.*
Related, same function: `hexToOklab` (`:203-209`) `throw`s inside an `async` function wrapped in
`try/finally` with **no `catch`** → an unhandled rejection rather than a surfaced error.

- **Cure** parse with `parseColorIn`; on failure mark the field invalid and say so. Never substitute.

---

## MINOR

### C-13 · A masking fallback for a wire-shape lie, planted in the pane

```ts
// BrowsePane.vue:215-220
const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
return Array.isArray(tags) ? tags : Object.values(tags);
```

The comment states the problem plainly ("the declared type is `Tag[]`, but the `/colors/tags` read
can resolve an object-shaped payload at runtime") and then compensates instead of fixing it. That is
the no-masking-fallback edict, and it is in the wrong layer besides: the wire shape is `getTags`'
responsibility (`demo/palettes/api/colors.ts`), where one narrowing would serve all consumers
(BrowsePane, PaletteDialog, TagEditPopover) instead of one pane.

### C-14 · Gratuitous `any` that the lint gate does not see

`(p: any)` at `:344` reaches `oklabColors`, a field **declared on `Palette`** (`types.ts:32`) — the
cast buys nothing and disables checking on the whole predicate. `(el: any)` at `:94` erases the ref
type that `:209` then re-asserts. `npx eslint demo/palettes/BrowsePane.vue demo/palettes/useBrowsePalettes.ts`
→ **no output**: neither is flagged.

### C-15 · "Saved!" is reported for operations that saved nothing

```ts
// BrowsePane.vue:226-232
function onSave(palette) { pm.onSaveRemote(palette); … card.showFeedback("Saved!", "success"); }
```

`onSaveRemote` → `addPublishedPalette` (`usePaletteStore.ts:121-139`) is a **no-op in both dedupe
branches** (same name+colors → reorder only; existing slug → `return`). The card celebrates
regardless. Nothing in the call chain can report failure: `addPublishedPalette` returns `void`.

### C-16 · Three silent-failure paths

- A failed **load-more** logs and returns (`useBrowsePalettes.ts:109-111`): no `browseError`, no
  flag, no message, button unchanged. Probe `C-2` asserts exactly this.
- `onFlagSubmit` (`BrowsePane.vue:296-300`) `await`s `pm.flagged.report(...)` with **no `try`** — a
  rejection leaves the dialog open and raises an unhandled rejection.
- `useTagEdit.loadAllTags` swallows (`useTagEdit.ts:56 catch {}`) → `availableTags` stays `[]` →
  `SearchFilterBar.vue:47` `v-if="availableTags.length > 0"` → the **entire Tags filter section
  silently disappears** with no indication it exists.

### C-17 · Test truth — the gates are vacuous, and the fixture is unchecked

The only coverage is two Playwright specs (`e2e/smoke/views/browse-pagination.spec.ts`,
`browse-loading.spec.ts`). No unit test exists for the pane or for `useBrowsePalettes`.

**The exact mutation that keeps them green:** delete line `useBrowsePalettes.ts:112`
(`if (gen === loadGeneration) loadingMore.value = false;`) entirely. `loadingMore` then latches true
after the first click; `browse-pagination.spec.ts` asserts `cards → 62` (passes, the append already
happened) and `await expect(more).toHaveCount(0)` (passes — the button is hidden by
`v-if="pm.loadingMore.value"` instead of by cursor exhaustion). `browse-loading.spec.ts` uses a
`hasMore: false` fixture and never reaches the path. **The gate for C-2 asserts the button's absence
without distinguishing "retired" from "broken".**

Further mutations no gate would catch: removing the client colour filter; inverting the error-plate
gate; never calling `showFeedback`; changing either `aria-label`; deleting the `cardRefs` map.

And the fixture itself is outside every typecheck program:

```
$ npx tsc -p <scratch>/tsconfig.e2e.json
e2e/smoke/fixtures/browse-palettes.ts(19,30): error TS2307:
  Cannot find module '../../../demo/@/lib/palette/types' or its corresponding type declarations.
```

`demo/@/` was deleted in the W43 restructure. `npm run typecheck` is
`vue-tsc -p tsconfig.lib.json && vue-tsc -p tsconfig.demo.json` — `include` is `src/…` and `demo/`;
**`e2e/` is in neither program**, so the dead import survives indefinitely and the fixture's `Palette`
shape is validated by nothing. Consequence: the fixtures omit `oklabColors` entirely, so no gate can
ever exercise the colour-search path (C-6) even in principle.

---

## INFO — negative proof (what is NOT wrong)

### C-18 · BrowsePane's a11y-geometry contribution is zero

The visual REPORT lists 4 `smallTapTargets` at `/#/browse`. **None are BrowsePane's.** The identical
four appear on all 15 routes:

```
/#/palettes  [('input',160,20,''), ('button',23,23,'Switch to slug'),
              ('button',23,23,'Generate new slug'), ('button',23,23,'Cancel')]
/#/browse    [ … identical … ]
/#/admin/tags[ … identical … ]
```

They are the dock's slug widget. Scoped to the pane on a fully-loaded wall (103 operable controls,
50 cards, filter popover reachable): `smallTapTargets: []`, `namelessButtons: 0`, `overflowX: 0`,
`imgNoAlt: 0`. Consistent with the brief's corrected state matrix (text 280/124, overflowX 0
everywhere). Per **MT-F022** this seat did **not** touch keyboard reachability: the 7/12 Chromium gap
is roving-tabindex-shaped and would need a two-engine proof this seat did not run.

Also verified sound: `verbatimModuleSyntax` is honoured (`import type { Palette, Tag }` at `:197`);
no `ValueUnit` wrapping, no `defineModel`, no `requestAnimationFrame`, no WebGL, no observers, no
timers, and no listeners in the pane — the PRM-RAF / stale-`defineModel` / context-loss hazard
classes are genuinely absent here. The `Transition` state machine is correctly keyed
(`developing`/`error`/`wall`) and `mode="out-in"` is safe at this seat (the `PaneSlot` dev-mode
out-in defect is a *slot*-level issue and does not apply to an in-pane transition).

---

## Family view — three mechanisms, not eighteen bugs

| mechanism | findings |
| --- | --- |
| **Typed failure collapsed to a constant / swallowed** | C-1, C-4, C-12, C-15, C-16 |
| **Lifecycle state guarded by the wrong variable, or never released** | C-2, C-3, C-5, C-10 |
| **App-scoped singletons standing in for pane-scoped state** | C-8, C-9 (+ C-7, C-6 as its data-shape cousins) |

The transposition that dissolves most of the ledger: **`useBrowsePalettes` should own one
`usePagedResource`-shaped state machine** (`status: idle|loading|refreshing|paging|error`, cursor
bound to the filter set that minted it, a typed `error`) and **own its own `searchQuery`**, with the
pane rendering `status` exhaustively instead of assembling five booleans (`browsing`, `sortLoading`,
`loadingMore`, `hasMore`, `browseError`) into a five-branch template where three combinations are
unreachable and one is permanent.

---

*Seat: CHALLENGE-C · implementation. No source edits; no files written outside
`docs/tranches/V/megatranche/audit/components/BrowsePane/`.*
