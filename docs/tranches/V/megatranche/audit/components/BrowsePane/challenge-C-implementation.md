# CHALLENGE-C · `demo/palettes/BrowsePane.vue` — implementation · **PASS 3**

> Pass 1 preserved verbatim at `challenge-C-implementation.pass-1-2026-07-27.md`.
> Pass 2 preserved verbatim at `challenge-C-implementation.pass-2-2026-07-28-prior.md`.
>
> This pass is an **independent re-run against the REAL production commons**. Both prior passes had
> to *stub* the wall, because neither origin that boots the client can reach the API: `localhost`
> is latched by `detectDevMisconfig` so no request is ever issued, and a LAN host is rejected by
> the API's CORS allow-list (measured below). Pass 3 removes the stub — it **proxies**
> `api.color.babb.dev` through Node and fulfils the page with the real bytes. Every wall, every
> search result and every empty plate below is the live commons and the live Mongo query planner
> answering. Findings are **NEW**, **UPGRADE**, **CONVERGE** or **CORRECTION** relative to passes 1–2.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited, not downgraded.

---

## Verdict

**DEFECTIVE.**

Passes 1–2 stand except where corrected below. Pass 3 adds **two NEW BLOCKERs**, **two NEW MAJORs**,
**two NEW MINORs**, **one UPGRADE** and **one CORRECTION**.

The headline is that the one state production users actually see is a trap:

> **Pressing `Retry` on the error plate permanently destroys the Browse wall.** The pane's body goes
> to zero DOM element children and stays there — through a search keystroke, through clearing the
> search, through leaving `/#/browse` and coming back, and through the backend coming back up. Only
> a full page reload recovers. `Retry` is the *only* affordance on the error plate, and the error
> plate is the *only* state the Safari visual matrix ever photographed
> (`audit/visual/shots/safari-desktop-light/browse.png`, 4-of-4 matrices).

And the second, which is what the wall does when it *is* reachable:

> **Typing the second character of a word empties the commons.** Measured live: `o` → **3 cards**;
> `oc` → **0 cards + "No published palettes here yet."**; `oce` → 0; `ocea` → 0; `ocean` → **1 card**.
> The pane composes two mutually incompatible search predicates — a client substring filter below
> two characters, a Mongo `$text` **whole-word** search at and above two — and hands over between
> them at `q.trim().length >= 2` (`useBrowsePalettes.ts:57`).

Environment: brief cites `c654824e`; working HEAD is `f36f780c`; `BrowsePane.vue` is unmodified
since 2026-07-17 in both. All live probes drive the user's own dev server over its LAN host
`http://192.168.1.166:9000`.

---

## Evidence apparatus (pass 3)

All artefacts under `./probe-C3/`. Every number below was read out of a running process or a live
HTTP response.

| # | Probe | Method | Headline result |
|---|---|---|---|
| P1 | `probe-c3-debug-state.mjs` | boot `/#/browse`, walk `#app.__vue_app__._instance` to BrowsePane, dump state + console | identified why neither prior pass could use the real API (CORS) |
| P2 | `probe-c3-live-proxy.mjs` | **real commons**, proxied through Node; type `ocean` one char at a time | the 2-character cliff, table below |
| P3 | `probe-c3-slug-and-retry.mjs` | slug-only fragments (`7600d315`, `cd3e1e3b`) against the real commons | slug search dead at ≥2 chars |
| P4 | `probe-c3-retry-timeline.mjs` | poll the pane at 100 ms after activating `Retry` | error plate gone at **t = 315 ms**, never returns through t = 6075 ms |
| P5 | `probe-c3-retry-blanks-the-pane.mjs` | read pane state **and** grid DOM together, t = 0.4/1/3/5/10 s | state says "render the error plate", DOM holds `<!---->` and 0 elements |
| P6 | `probe-c3-blank-recovery.mjs` | after the blank: search / clear / leave+return / restore backend | **unrecoverable in all four** |
| P7 | `curl` × live API | `GET /palettes?q=…` against `api.color.babb.dev` | server-side `$text` semantics, measured |

Reproduce (dev server on `:9000`; the probes reach it over the LAN host — see the CORS note):

```
node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C3/probe-c3-live-proxy.mjs
node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C3/probe-c3-blank-recovery.mjs
node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C3/probe-c3-retry-blanks-the-pane.mjs
node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C3/probe-c3-slug-and-retry.mjs
```

**Probe-environment note, corrected and extended.** Pass 1 recorded that `localhost:9000` cannot be
probed (the `detectDevMisconfig` latch, `availability.ts:112-118`) and that the LAN host clears it.
True — but the LAN host does **not** get you a working wall. Measured this pass:

```
error: Access to fetch at 'https://api.color.babb.dev/palettes?limit=50&sort=newest' from origin
       'http://192.168.1.166:9000' has been blocked by CORS policy: Response to preflight request
       doesn't pass access control check …
REQFAIL https://api.color.babb.dev/palettes?limit=50&sort=newest :: net::ERR_FAILED
warning: Failed to load remote palettes: ApiUnavailableError: Backend unreachable — working locally.
```

That is why passes 1–2 stubbed. The cure used here — a `page.route` handler that re-issues the
request from **Node** (no CORS) and fulfils with the real bytes — is 20 lines and gives every
subsequent seat the real commons. It is in `probe-c3-live-proxy.mjs:31-55`.

---

## BLOCKER

### P-1 · **NEW** — one press of `Retry` permanently blanks the Browse pane; the state machine is correct and the DOM is empty

`BrowsePane.vue:61-78` renders the error plate, whose only control is:

```vue
<!-- BrowsePane.vue:69-76 -->
<Button variant="outline" size="sm" class="font-display" @click="pm.loadRemotePalettes()">
    Retry
</Button>
```

This is the state 4-of-4 Safari matrices captured. I drove it.

**Timeline** (`probe-c3-retry-timeline.mjs`, 100 ms polling, state transitions only):

```json
[ { "t": 0,   "note": "before Retry", "errorPlate": true,  "retryBtn": true,  "skeletons": 0, "focus": "BODY"   },
  { "t": 5,                            "errorPlate": true,  "retryBtn": true,  "skeletons": 0, "focus": "BUTTON" },
  { "t": 315,                          "errorPlate": false, "retryBtn": false, "skeletons": 0, "focus": "BODY"   } ]
totalSampledMs: 6075   samples: 61
```

Three transitions in 61 samples: at **315 ms** the plate, the button and the skeletons are all gone,
focus is on `<body>`, and **nothing changes for the remaining 5.7 seconds**.

**It is not the composable.** `probe-c3-retry-blanks-the-pane.mjs` reads BrowsePane's own reactive
state and its grid container in the same evaluate, at t = 0.4 / 1 / 3 / 5 / 10 s. Identical at every
sample:

```json
"state": { "browsing": false, "browseError": "Failed to load palettes",
           "remoteRows": 0, "displayedRows": 0, "loadingMore": false }
"domActually": { "elementChildren": 0, "innerTextLen": 0,
                 "childNodes": [ "<!-- T.W5-R8 … -->", "#text", "#text",
                                 "<!---->",                      ← the Transition's child slot
                                 "<!-- S.W5 · the LOAD-MORE trigger … -->", "<!--v-if-->" ] }
```

`pm.browseError` is truthy and `displayedBrowse.length === 0`, so `BrowsePane.vue:62`
`v-else-if="pm.browseError.value && displayedBrowse.length === 0"` is **TRUE**. The template says
render `EmptyState`. Vue renders an empty comment anchor. The `SearchBar` above it (outside the
`<Transition>`) still renders and still accepts typing — so the component is alive and patching; only
the `<Transition name="vj-morph" mode="out-in">` subtree at `BrowsePane.vue:40` is dead. By exclusion
that transition is the fault site.

**Mechanism.** `mode="out-in"` defers the incoming branch until the outgoing one finishes leaving.
`Retry` sets `browsing = true` (`useBrowsePalettes.ts:66`) → key flips `error` → `developing` → the
leave starts. But the second attempt fails **synchronously**: the availability latch is already
tripped by the first failure, and `assertApiAttemptAllowed()` throws before any `fetch`
(`client.ts:71-73`). Measured in the console tail — the first warning's stack is
`at fetchWithRateLimitRetry`, the second is `at assertApiAttemptAllowed`. So `browsing` returns to
`false` and the key returns to `error` **within microtasks, while the `error` leave is still in
flight**. `out-in` then holds `isLeaving` and the pending child never mounts. The latch — designed to
stop doomed requests — is what makes the retry fail fast enough to deadlock the transition. *The
faster the failure, the more certain the blank.*

**Unrecoverable.** `probe-c3-blank-recovery.mjs`:

| step | grid element children | error plate | Retry | cards |
|---|---|---|---|---|
| 0 · error plate on entry | 1 | ✅ | ✅ | 0 |
| 1 · after `Retry` | **0** | ❌ | ❌ | 0 |
| 2 · after typing `ocean` | **0** | ❌ | ❌ | 0 |
| 3 · after clearing the search | **0** | ❌ | ❌ | 0 |
| 4 · after leaving `/#/browse` and returning | **0** | ❌ | ❌ | 0 |
| 5 · **backend restored**, re-entered | **0** | ❌ | ❌ | 0 |

The pane is `KeepAlive`d (`PaneSlot.vue:126`), so the dead transition survives every soft navigation.
Only a document reload clears it. Frame: `./probe-C3/c3-retry-blanked-pane.png` — the Browse card is
a header, a search field, and 500 px of nothing.

- **Severity** BLOCKER. The most-photographed state of this route offers exactly one control, and
  that control silently and permanently destroys the surface. Focus is simultaneously thrown to
  `<body>` (`focusAfter: "BODY"`, `probe-c3-slug-and-retry.mjs`), there is no `aria-live` in the pane
  (`liveRegionsInPane: 0`), and the plate's `role="alert"` node is the thing that just vanished — so
  a screen-reader user gets nothing at all: no announcement, no focus, no content.
- **Reproduction** `node ./probe-C3/probe-c3-blank-recovery.mjs`. Manually: load `/#/browse` with the
  API unreachable, press `Retry` once.
- **Cure — architectural, not a patch.** Three moves, in order of strength:
  1. **The three wall states are not three elements.** `mode="out-in"` exists to cross-fade
     *different* content; here the same node (`EmptyState`) is being asked to leave and immediately
     re-enter under the same key. Render **one** result surface whose *content* is driven by an
     exhaustive `status` discriminant (pass 1's `usePagedResource` prescription), and the transition
     has nothing to sequence — the deadlock is unreachable by construction.
  2. If the animation is kept, `mode="out-in"` must go. A default (simultaneous) `Transition` has no
     deferred-mount state to strand, and the three branches occupy the same grid cell anyway.
  3. `Retry` must not re-enter the *initial-load* state. `pm.loadRemotePalettes()` with no argument
     sets `browsing`, which is the branch flip that starts the leave. A retry is a refresh, not a
     first load — the same distinction the sort path already makes with `isSort`.

---

### P-2 · **NEW** — the search runs two incompatible predicates and hands over at 2 characters; typing the second character of a word empties the commons

BrowsePane renders `pm.filteredBrowse` (`BrowsePane.vue:340`, its only consumer in the tree). That is
a **client-side substring** filter, applied at any query length, **untrimmed**:

```ts
// demo/palettes/useFilteredList.ts:8-12          demo/palettes/useBrowsePalettes.ts:43-45
const q = searchQuery.value.toLowerCase();        (p, q) => p.name.toLowerCase().includes(q)
if (!q) return items.value;                                || p.slug.includes(q)
return items.value.filter((item) => predicate(item, q));
```

The rows it filters come from a **server-side Mongo full-text** query, sent only past a length gate:

```ts
// demo/palettes/useBrowsePalettes.ts:52-61
const q = deps.searchQuery.value.trim();
… ...(q.length >= 2 ? { q } : {}),
```
```ts
// api/src/modules/palette/service/crud-list.ts:95-96
const q = query.q?.trim();
if (q) f.$text = { $search: q };
```
```ts
// api/src/platform/db/db.ts:57-60
db.collection("palettes").createIndex({ name: "text" }, { name: "palettes_text_name" }),
```

`$text` is **word/stem** matching over an index on **`name` only**. `includes` is **substring**
matching over **name or slug**. They are not narrowings of each other in either direction.

**Measured on the live production commons** (`probe-c3-live-proxy.mjs`; the wall holds 10 public
palettes, one of them `Ocean Depths` / `ocean-depths`):

| typed | request BrowsePane issued | cards on the wall | plate |
|---|---|---|---|
| `o` | `/palettes?limit=50&sort=newest` — **no `q`** | **3** | wall |
| `oc` | `…&q=oc` | **0** | **"No published palettes here yet."** |
| `oce` | `…&q=oce` | **0** | same |
| `ocea` | `…&q=ocea` | **0** | same |
| `ocean` | `…&q=ocean` | **1** | wall |
| *(cleared)* | `…&sort=newest` | **10** | wall |

The `3` at one character is the client predicate exactly: `['Forest Canopy','Neon Cyberpunk','Ocean
Depths']` — verified independently against the raw JSON. The `0`s are the server: measured directly,

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50&sort=newest&q=oc"    → 0 rows
$ curl -s "https://api.color.babb.dev/palettes?limit=50&sort=newest&q=ocean" → 1 row  ['Ocean Depths']
```

Two further faces of the same seam, both measured live:

```json
"leadingSpace":  { "typed": "' o'",     "serverQuery": ["/palettes?limit=50&sort=newest"], "cards": 0,
                   "trueEmptyInvitation": true }
"trailingSpace": { "typed": "'Ocean '", "serverQuery": ["…&q=Ocean"],                      "cards": 1 }
```

A **leading space** puts the server back below the 2-char gate (it trims, `" o"` → `"o"`, length 1) so
the full commons comes back — and then the client filter, which does *not* trim, evaluates
`name.includes(" o")` and deletes all ten. The user typed one letter and got the "the commons is
empty" invitation.

- **Severity** BLOCKER. Search is the pane's primary discovery affordance and it returns zero for
  every partial word — which is every keystroke of every real query except the last. The zero is not
  even reported as a zero-result: `PaletteCardGrid`'s `empty` plate says *"· the commons · / No
  published palettes here yet. / Publish one from My Palettes and start the wall."* on a commons with
  ten published palettes in it (pass 1 C-7 predicted this state; this pass shows it is the **normal**
  state of typing, not a corner). Frame: `./probe-C3/c3-cliff-at-oc.png`.
- **Reproduction** `node ./probe-C3/probe-c3-live-proxy.mjs`, or type `oc` into "Search the
  commons…" against any reachable backend.
- **Cure — one predicate, one place.** Either the server owns search (then `filteredBrowse` is
  deleted outright and `remotePalettes` renders directly, and `$text` is replaced by a prefix-capable
  matcher — a `name`+`slug` anchored regex or an Atlas autocomplete index — because `$text` cannot
  answer a type-ahead), or the client owns it (then `q` never goes on the wire and the wall is
  explicitly "search what is loaded"). What cannot stand is a length threshold that *swaps* which
  engine answers, because the two engines disagree about what a match is. Note the pane already
  carries the honest version of this seam in `displayedBrowse`, and pass 1 C-6 asks for that one to
  move server-side too: the fix is the same fix.

---

## MAJOR

### P-3 · **NEW** — slug search is advertised by the code and dead in the product

`useBrowsePalettes.ts:44` explicitly offers `|| p.slug.includes(q)`. The server's `$text` index covers
`name` only, so any query of 2+ characters is answered before the slug predicate is ever reached.
Isolated with a slug fragment that appears in **no** palette name (`probe-c3-slug-and-retry.mjs`):

| typed | request | cards | plate |
|---|---|---|---|
| `7` | no `q` | **1** — `hey-7600d315` | wall |
| `76` | `…&q=76` | **0** | "No published palettes here yet." |
| `7600d315` *(the exact, complete slug suffix)* | `…&q=7600d315` | **0** | same |
| `cd3e1e3b` *(present in 3 slugs)* | `…&q=cd3e1e3b` | **0** | same |

Slug search works at exactly one character and nowhere else. A user who copies a palette's slug —
the identifier the pane itself renders (`show-slug`, `BrowsePane.vue:101`) — and pastes it into the
search box gets the empty-commons invitation.

- **Cure** subsumed by P-2. Whichever engine wins must cover the fields the UI displays.

### P-4 · **NEW / UPGRADE of C-6** — colour search is structurally blind to half the live commons, measured

`displayedBrowse` (`BrowsePane.vue:339-349`) rejects any row without `oklabColors`:

```ts
if (!oklabColors || oklabColors.length === 0) return false;
```

Measured against the live production wall:

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50&sort=newest" | …
rows 10  hasMore False
rows with EMPTY oklabColors: 5 / 10
```

**Five of the ten public palettes carry `oklabColors: []`** and are therefore invisible to "Find by
Color" for *every* colour, forever. This is not a tuning problem with the `0.15` radius — it is a
`return false`. Pass 1 C-6 established that the client filter is a second copy of
`colorMatcherFor` (`crud-list.ts:159-181`) running over ≤ 50 loaded rows; pass 3 adds that on the
actual data it is running over, it can address at most half of them. (The blank rows are the ones
whose colours are `lab(…)` — e.g. `hey v2 (remix)`, `"css":"lab(12.23% 2.53 0.5 / 100%)"` — so the
producer-side `computeOklabColors` has its own gap. That is the API's finding, not the pane's; the
pane's finding is that it silently treats "no data" as "no match" and reports the result as an empty
commons.)

- **Cure** as C-6: thread `colorL/colorA/colorB/colorRadius` into `currentFilterOpts()` and delete
  `displayedBrowse` + `colorSearchParams`. The server at least pages honestly across a colour filter
  (`crud-list.ts:211-270` fetch-ahead loop); the client copy cannot.

---

## MINOR

### P-5 · **NEW** — the "defensive" tag coercion is the only crash site in the file, and it is strictly less safe than writing nothing

```ts
// BrowsePane.vue:215-220
const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
return Array.isArray(tags) ? tags : Object.values(tags);
```

Pass 1 C-13 called this a masking fallback in the wrong layer; pass 2 N-7 proved the object-shaped
payload it defends against is not producible. Both are right, and both understate it. Compare the
two behaviours on the input the comment claims to fear:

- **Without** the coercion: a non-array reaches an `Array`-typed prop. Vue logs a dev warning;
  `SearchFilterBar.vue:47` `v-if="availableTags.length > 0"` reads `undefined > 0` → `false` → the
  Tags section hides. **The pane renders.**
- **With** the coercion, on `null`/`undefined`: `Array.isArray(null)` is `false`, so
  `Object.values(null)` runs — `TypeError: Cannot convert undefined or null to object` (verified:
  `node -e "Object.values(null)"`) — thrown from inside a `computed`, during render. **The pane does
  not render.**

The shim converts a benign warning into a hard render failure on a strictly wider input set. It is
the single `throw` site in a 360-line file. Live shape confirmed unchanged: `curl
https://api.color.babb.dev/colors/tags` → `[]`.

- **Cure** delete lines 213-220 and bind `:available-tags="pm.tagEdit.allTags.value"`. (Also worth
  recording: because the live catalog *is* empty, `availableTags.length > 0` is false in production
  and the entire Tags filter section is invisible on the shipped site today.)

### P-6 · **NEW** — a colour search survives every subsequent filter change and silently intersects with it

`colorSearchParams` (`BrowsePane.vue:336`) is cleared in exactly two places: `onClearColorSearch`
(`:357`) and `onClearFilters` (`:329-332`). It is **not** cleared by `pm.onSortChange`
(`:20`), `onTierChange` (`:21`), `onTagsChange` (`:22`), or any text search — all of which run a
fresh server query and replace `remotePalettes` wholesale. So a colour filter set once keeps
silently intersecting every later result set, and because it is pane-local it appears in no request
URL, no filter chip the user can see clearing, and no server response. Combined with P-4 (half the
rows can never match) the visible outcome is an empty wall with a stale, invisible cause.

*Reproduction: static and deterministic from the five handler bindings at `:20-25` versus the two
clear sites — not separately driven in-browser.*

- **Cure** subsumed by P-4/C-6: once the colour target is part of `currentFilterOpts()`, it is one
  filter among the others and every filter transition handles it uniformly.

---

## CORRECTION

### P-7 · **CORRECTION of pass-2 N-4** — BrowsePane mounts **once**, not twice; the `cardRefs` leak is not doubled

Pass 2 reports `cardRefs entries = [30,30]` and reads the pair as *"`/#/browse` mounts the pane in
**both** responsive slots — the leak is doubled."* That does not reproduce. A DOM-level count (which
includes hidden elements) at both viewports:

```json
"instanceCount": { "desktop1440_commonsInputs": 1,
                   "mobile390_commonsInputs":  1,
                   "mobile390_cards":          10 }
"paneInstances":  { "commonsSearchInputs": 1, "myPalettesSearchInputs": 1 }   // 1440×900
```

There is exactly **one** `input[placeholder="Search the commons..."]` in the document at 1440×900 and
exactly one at 390×844, so there is one BrowsePane. My own instance walk found one. The `[30,30]`
pair is an artefact of pass 2's traversal visiting the pane twice (`subTree` and `children` both
reached), not two mounts.

**The leak itself is unaffected** — pass 2's `6 → 30 → 54` growth with a constant six visible cards,
and its `$el.isConnected === false` detachment proof, stand on their own; only the ×2 multiplier is
withdrawn. C-5's mechanism (`BrowsePane.vue:94`, `el &&` swallowing Vue's unmount `null`) is
unchanged.

### C-1 · **UPGRADE** — the typed error that gets thrown away, named

Pass 1 proved C-1 from the Safari console record (`SyntaxError: The string did not match the expected
pattern`). This pass caught a *different* typed error dying at the same line, which strengthens the
finding by showing the collapse is total rather than specific to one transport failure:

```
warning: Failed to load remote palettes: ApiUnavailableError: Backend unreachable — working locally.
    at assertApiAttemptAllowed (…/demo/platform/transport/availability.ts)
```

The transport minted a precise, designed, human-readable diagnosis. `useBrowsePalettes.ts:79`
replaced it with `"Failed to load palettes"`, which `BrowsePane.vue:66` then renders **as the detail
line under its own headline** — so the plate reads *"The commons is unreachable. / Failed to load
palettes"*, which is one sentence said twice and neither of them true (the commons was reachable;
CORS refused the browser). Visible in the shipped capture,
`audit/visual/shots/safari-desktop-light/browse.png`. The *dev-misconfig* case is worse still: that
error's whole reason to exist is a 400-character actionable message (`availability.ts:122-131`) which
this line deletes.

---

## CONVERGE — prior findings I re-derived independently this pass

| finding | my independent path | agreement |
|---|---|---|
| **C-1** typed failure → constant | see UPGRADE above; a second, differently-typed error collapsed at the same line | full |
| **C-4** error plate can never fire on a non-empty wall | read directly at `BrowsePane.vue:62` against measured state; also the reason P-1's blank has no fallback plate | full |
| **C-5** write-only `cardRefs` | live instance walk, `cardRefs: 0` on the error path and growing on the wall path; correction at P-7 is to the multiplier only | full (multiplier corrected) |
| **C-6** colour search is a second copy, client-only | upgraded at P-4 with the live 5/10 blank-`oklabColors` measurement | full |
| **C-7** zero-**result** renders the true-**empty** invitation | measured at six separate query states this pass (`oc`,`oce`,`ocea`,`" o"`,`76`,`7600d315`) — it is the *default* outcome of typing, not a corner | upgraded |
| **C-10 / C-2** every browse entry reloads; `loadingMore` strand | re-read `usePaletteWiring.ts:142-152` (`{immediate:true}`, unguarded `browse` branch, guarded `admin-*` branches three lines below) and `useBrowsePalettes.ts:112` | full |
| **C-11 / N-5** no live region | `liveRegionsInPane: 0` on the error plate, `role="alert"` count 1 — and P-1 removes that one node without announcing anything | full |
| **N-2** a control that deletes itself on activation ejects focus | independently measured on **`Retry`** rather than load-more: `focusBefore: "Retry"` → `focusAfter: {tag:"BODY"}` | full, second instance |
| **N-7** `/colors/tags` always returns an array | `curl … /colors/tags` → `[]`; strengthened at P-5 | full |

---

## Test truth — the two BLOCKERs are in territory no gate visits

```
$ grep -rln "Search the commons" e2e test demo | grep -v node_modules
demo/palettes/BrowsePane.vue
$ grep -rln "commons is unreachable\|'Retry'\|name: \"Retry\"" e2e test demo | grep -v node_modules
e2e/smoke/oracles/o9-shadow-palette.spec.ts        ← a different component
demo/palettes/BrowsePane.vue
$ ls demo/test/palettes
api                                                 ← no composable tests at all
```

**No test in this repository ever types into the browse search box, and none ever renders or presses
the error plate's `Retry`.** The only browse coverage is two Playwright specs
(`views/browse-pagination.spec.ts`, `views/browse-loading.spec.ts`), both on a stubbed
`{data,nextCursor,hasMore}` fixture, neither touching search or failure.

**Exact mutations that keep every gate green:**

| mutation | why the gates do not notice |
|---|---|
| delete `filteredBrowse` and render `remotePalettes` directly | nothing types into the search box, so the client predicate is never exercised |
| change `q.length >= 2` to `q.length >= 20` (or `>= 0`) | same — the threshold is never crossed under test |
| swap `mode="out-in"` for `mode="in-out"`, or delete the `<Transition>` | `browse-loading.spec.ts` asserts *skeletons, not a spinner*, which survives any transition mode; no spec ever drives two branch flips inside one leave |
| delete the `Retry` button entirely | no spec renders the error branch |
| make `onColorSearch` a no-op | fixtures omit `oklabColors` (pass 1 C-17), so the path is unreachable even in principle |

Add pass-1 C-17's still-standing result — deleting `useBrowsePalettes.ts:112` keeps
`browse-pagination.spec.ts` green — and the gate set is vacuous with respect to every finding in
passes 1, 2 and 3 except the plain "the wall renders" case.

The *first* gate this component needs is not a unit test: it is one Playwright spec that loads
`/#/browse` with `**/palettes*` aborted, presses `Retry`, and asserts the error plate is **still
there**. That is four lines and it is red today.

---

## INFO — negative proof (what this seat could not break)

- **The brief's hazard list remains genuinely absent.** `grep` over `BrowsePane.vue`: no
  `defineModel`, no `requestAnimationFrame`, no `ValueUnit`, no WebGL, no `IntersectionObserver` /
  `ResizeObserver`, no `setTimeout` / `setInterval`, no `addEventListener`, no slider. The
  stale-`defineModel`, PRM-RAF, `ValueUnit`-nesting, reka-slider pointer-capture and
  context-loss classes do not apply here. Confirms pass 1 C-18 and pass 2's INFO.
- **`verbatimModuleSyntax` is honoured.** `import type { Palette, Tag }` (`:197`); the value imports
  at `:179-199` are all used as values.
- **The `TagEditPopover` ETag path is correct** — contrary to what the shape of the call site
  suggests, `TagEditPopover.vue:73-74` reads the row out of `pm.remotePalettes` and derives
  `paletteETag(source)` *before* the optimistic emit, and a tags-only PATCH leaves `currentHash`
  unchanged (`api/.../crud.ts:187-193`, `contentChanged` is false), so repeated toggles do not
  stale-validate. I looked for a lost-update window here and there is not one.
- **The keyset/generation guard on the fetch is correct**; the defect is its scope (C-2), not its
  presence. My racing probes produced no out-of-order `remotePalettes` write.
- **Tap targets and accessible names: still zero contribution.** Consistent with C-18 and the brief's
  corrected matrix; nothing new measured, nothing withdrawn.
- **Keyboard reachability was not born-RED, per MT-F022.** The route's 7/12 Chromium gap is
  roving-tabindex-shaped and this seat ran one engine. The focus finding I do file (inside P-1) is
  focus **destruction** on activation, `"Retry"` → `BODY`, which no roving-tabindex design produces.

---

## Family view — pass 3 confirms the fourth mechanism and adds a fifth

| mechanism | passes 1–2 | pass 3 |
|---|---|---|
| Typed failure collapsed to a constant / swallowed | C-1, C-4, C-12, C-15, C-16, N-3 | **C-1 upgrade** (a second typed error, named) |
| Lifecycle state guarded by the wrong variable, or never released | C-2, C-3, C-5, C-10, N-4 | **P-6** (colour params outlive every filter transition); **P-7** corrects N-4's multiplier |
| App-scoped singletons standing in for pane-scoped state | C-8, C-9 | — |
| A component invoked outside the contract it was built for | N-1, N-2 | **P-1** (`mode="out-in"` asked to sequence a branch that leaves and re-enters under the same key) |
| **Two engines answering one question, composed in series** | (C-6 as a data-shape cousin) | **P-2**, **P-3**, **P-4** |

The fifth mechanism is pass 3's addition and it is the one that explains the most user-visible
damage. Three times in this pane, one question is answered by two different implementations wired in
sequence: **text search** (Mongo `$text` word-match, then a JS substring re-filter), **colour search**
(the server's `colorMatcherFor`, shadowed by a hand-copied client re-implementation that never
runs on the server's result), and **slug search** (offered by the client predicate, pre-empted by the
server's name-only index). In each case the composition is not a narrowing — it is an *intersection
of disagreeing predicates*, and the intersection is usually empty. The idiomatic transposition is a
single sentence: **one predicate per question, evaluated in exactly one place.**

Combined with pass 1's prescription and pass 2's, the whole three-pass ledger collapses to five
moves: **one state machine** (which also dissolves P-1 by removing the branch swap), **one search
predicate**, **one search scope**, **one persistent pagination node**, **one anchorless tag surface.**

---

*Seat: CHALLENGE-C · implementation · pass 3. No source edits. No files written outside
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. Pass 1 preserved at
`challenge-C-implementation.pass-1-2026-07-27.md`; pass 2 at
`challenge-C-implementation.pass-2-2026-07-28-prior.md`.*
