claude-opus-5[1m]

# CHALLENGE · `GalleryView.vue` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/GalleryView.vue` (442 lines)
**Axis** how this component consumes value.js `0.13.0` · keyframes.js `4.3.0` · glass-ui `^4.0.0` · the 45-operation fourier API · its own props/emits contracts · the integration seams between them.
**Mode** static + source-derived, read-only. No browser, no dev server, no install. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Substrate** fourier HEAD `cd26c65`, branch `m/w1-bump-migration`, 28 uncommitted paths — the exact tree the adjudicated intake lane (`lane-fourier-r3-r6.md` R4-9, X-4) proved byte-identical to the Codex-audited scope. Nothing below is stale-at-HEAD.

**Read whole (read-only):** the component; `stores/{gallery,auth,workspace}.ts`; `composables/useToast.ts`; `lib/{api,types,colors,draftStorage}.ts`; `components/visualization/lib/basis-display.ts`; all 7 eager gallery children (`GallerySearchBar`, `GalleryFeaturedCarousel`, `GalleryInfiniteGrid`, `GalleryMarquee`, `GalleryCard`, `GalleryCardModal`, `GalleryAdminBanner`, `GalleryDraftsSection`); `App.vue`; `main.ts`; `router/index.ts`; `api/routers/{visualizations,admin}.py`; `api/lib/crud/cursors.py`; the installed `@mkbabb/{glass-ui@4.0.0,value.js@0.13.0}` dist typings + token CSS.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It is defective — but not in the places the census predicted, and it is *excellent* in three places the census did not name. Every row below carries its own falsifier.

---

## §0 — Verdict

| | count |
|---|---:|
| BLOCKER | **3** |
| MAJOR | **10** |
| MINOR | **14** |
| INFO | **3** |
| **defects total** | **30** |
| superlatives (L-18 reverse) | **5** |

**Headline.** `GalleryView` is a *clean glass-ui consumer* and a *broken API consumer*. Its glass-ui surface is contract-exact at the pinned 4.0.0 (§4, S-1/S-2) — the in-flight 3.1→4.0 rename sweep landed here without a single drift. Its API surface is where it fails: **three of its four filter controls are wired to nothing** (C-2), **its publish path can mint duplicate public rows** (C-3), and — the finding that matters most to value.js — **its colour arm is already dead against the installed producer's tokens** (C-1): `lib/colors.ts` cannot parse `oklch()`, and glass-ui 4.0.0 authors every `--viz-*` token in `oklch()`. The hand-rolled `colors.ts` arm named in the F.W2 charter is not a *future* migration surface. It is a **live break at the current pin**.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · The `--viz-*` colour arm is dead at the current pin: `cssVarToHex` is oklch-blind and glass-ui 4.0.0 ships oklch

**Claim.** Every colour `GalleryView`'s subtree renders through `VIZ_COLORS` resolves to the failure sentinel `#888888`.

**Provenance.**
- `web/src/lib/colors.ts:22-54` — `cssVarToHex()` matches exactly four token shapes: leading `#` (`:29`), `hsl(...)` (`:32-37`), a bare Tailwind HSL triplet (`:40-43`), `rgb(...)` (`:46-51`). Anything else falls through to `return "#888888"` (`:53`).
- `web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-265` (light arm) — `--viz-fourier: oklch(0.579 0.201 30.4); --viz-chebyshev: oklch(0.484 0.163 265.5); --viz-legendre: oklch(0.532 0.180 317.5);`
- `.../dist/styles/tokens/dark-arm.css:113` (dark arm) — `--viz-fourier: oklch(0.693 0.151 28.1);`
- `color-radius.css:267` — `--viz-green: var(--section-color-4);` (an indirection, resolving to the same oklch family).
- `web/src/style.css:3` — `@import "@mkbabb/glass-ui/styles";` is the **only** glass-ui CSS entry, so these are the authoring sites in force.
- `web/src/App.vue:10-18` — `onMounted(() => { resolveVizColors(); new MutationObserver(() => resolveVizColors()) … })`. `resolveVizColors()` (`colors.ts:90-96`) *overwrites* the five reactive fields with `cssVarToHex()` output, discarding the sane hardcoded defaults at `colors.ts:78-82`.
- Consumers under `GalleryView`: `GalleryCardModal.vue:150` `:style="{ color: VIZ_COLORS.fourier }"`; `basis-display.ts:4-6` (feeding `GalleryCard.vue:36-51` and `GalleryCardModal.vue:41-56` basis pills).

**Blast radius inside this component's subtree.** Every basis pill (`GalleryCard.vue:115-125`, `GalleryCardModal.vue:129-139`, whose `--pill-c` drives `background`, `border-color` *and* `color` via `color-mix`) and the modal's harmonics readout render grey-on-grey.

**Falsifier (and why it does not fire).**
1. *"Maybe `getComputedStyle().getPropertyValue()` resolves oklch to rgb."* — Only for `@property`-registered custom properties. `grep -rn "@property --viz" web/node_modules/@mkbabb/glass-ui/dist/` → **zero hits**. Unregistered custom properties serialise as their substituted token stream, i.e. `oklch(…)`. Even under registration a `<color>` serialises as `oklch(…)`/`color(…)` — still no regex match.
2. *"Maybe the app overrides the tokens in hsl."* — It overrides exactly **one**: `style.css:120,125` sets `--viz-amber` to `hsl(35 76% 35%)` / `hsl(37 73% 67%)`. So `VIZ_COLORS.amber` survives; `fourier`, `chebyshev`, `legendre`, `green` do not. The asymmetry is itself the proof.
3. *"Maybe this is a 7.0.0-only regression."* — No. The **installed 4.0.0** tree is the citation above. Producer 7.0.0 (`/Users/mkbabb/Programming/glass-ui/src/styles/tokens/color-radius.css:326`, `light-dark.css:172`) carries the same authoring, so the bump does not cure it either.
4. `UNPROVEN-NEEDS-LIVE` residual: the *rendered* grey is a runtime observation. The static chain (token authoring → regex non-match → `#888888` → reactive overwrite) is complete and each link is a file:line fact.

**The value.js seam — this is the F.W2 keystone.** `colors.ts` is 96 lines of hand-rolled `hslToHex`/`rgbToHex`/`hexToRgba`/`hexToRgb` in a tree that *already depends on* `@mkbabb/value.js@0.13.0`, whose sole root export declares `parseCSSColor` (`web/node_modules/@mkbabb/value.js/dist/index.d.ts:42` — `export { CSSColor, parseCSSColor, registerColorNames, … } from './parsing/color'`) and the `colorUnit2`/`normalizeColor` family (`:21`). `grep -c oklch node_modules/@mkbabb/value.js/dist/value.js` → **31** occurrences: 0.13.0's grammar *knows* oklch. **But do not book the cure blind:** the megatranche parser-proof gate books **R1 — a live `parseCssColor("oklch()")` shipping crash** on the value.js side. F.W2 must land the parser cure *before* fourier's colour arm can re-home. This is the sharpest value.js↔fourier coupling this component exposes, and it runs in the direction the census did not: fourier's break is *blocked on* a value.js defect, not merely waiting on a version bump.

---

### C-2 · BLOCKER · Search, tier-filter and basis-filter are inert end-to-end — client has no parameter, server has no parameter

**Claim.** `GallerySearchBar`'s search box, tier `Select` and basis chips mutate store state that (a) is never sent to the API and (b) is never applied client-side. Every keystroke costs a full network round-trip that returns the *identical* first page.

**Provenance — the whole chain, both sides of the seam.**
- Component wires all four controls: `GalleryView.vue:228-238` binds `:search-query` / `:sort` / `:tier-filter` / `:basis-filter` and writes all four back into the store.
- Component *re-fetches* on all four: `GalleryView.vue:95-98` (300 ms debounce on `gallery.searchQuery` → `resetAndFetch()`), `GalleryView.vue:111-114` (immediate on `sort`, `tierFilter`, `basisFilter` → `resetAndFetch()`).
- Store forwards **only two**: `stores/gallery.ts:90-94` (`resetAndFetch`) and `:64-69` (`fetchNextPage`) pass `{ limit, sort, cursor?, owner }`. `searchQuery` (`:37`), `tierFilter` (`:33`), `basisFilter` (`:38`) are declared, exported (`:269-272`) and **read nowhere except the template binding**.
- Client can't send them: `lib/api.ts:397-413` — `listVisualizations(params: { limit?; sort?; cursor?; owner? })`; the `URLSearchParams` builder at `:403-407` has four `set` calls and no fifth.
- Server can't receive them: `api/routers/visualizations.py:288-294` — `list_visualizations(request, limit, sort, cursor, owner)`. Four query params. No `search`, no `tier`, no `basis`, no text index consulted anywhere in `:300-342`.
- No client-side fallback: `GalleryView.vue:64-70` partitions on `e.tier === "featured"` only. `gallery.tierFilter` is **never dereferenced** in any `computed`, `filter` or template guard. Repo-wide proof: `grep -rn "tierFilter\|basisFilter\|searchQuery" web/src/` returns 26 lines, and every one is a declaration, an export, or a prop/emit plumbing line — zero consumption sites. (`AdminUserList.vue:39,61,72,244` is a *different*, correctly-wired `searchQuery` → `api.listAdminUsers({ q })` → `admin.py` `q` param. The contrast is the falsifier passing: the codebase knows how to do this and does it one file away.)

**Falsifier.** Show one call path where `tierFilter`, `basisFilter` or `searchQuery` changes what is fetched or what is rendered. There is none: the two producers (`GallerySearchBar` emits) and the two consumers (`resetAndFetch`, the render computeds) do not intersect. `sort` is the control group — it *is* forwarded (`gallery.ts:91`), *is* validated (`visualizations.py:300-301` against `cursors.SORT_KEYS`, which at `api/lib/crud/cursors.py:20-23` admits `newest|popular|most-forked|views|likes` ⊇ the store's `newest|views|likes`), and *does* work. Three of four controls are dead; one is live.

**Consumption reading.** This is not a missing feature — it is a **manufactured contract**. `GallerySearchBar.vue:40` even computes `hasActiveFilters` from `tierFilter !== "all" || sort !== "newest" || basisFilter !== ""` and surfaces a "filters active" affordance for state that filters nothing.

---

### C-3 · BLOCKER · Draft publish is non-idempotent, and its "already published" guard is a tautology → duplicate public visualizations

**Claim.** A draft can be published an unbounded number of times, each mint creating a new public `visualization` row with a fresh slug; and the filter that was written to prevent the offer can never fire.

**Provenance — three independent links, all required, all broken.**

1. **The dedup filter is a tautology.** `GalleryView.vue:76-81`:
   ```
   workspace.drafts.filter((d) =>
       !d.savedSnapshots?.length ||
       !d.savedSnapshots.every((h) => publishedHashes.value.has(h)))
   ```
   `savedSnapshots` is declared `string[]` at `lib/types.ts:90` and **written exactly once in the entire tree** — as `[]` at `stores/workspace.ts:102`. Repo-wide: `grep -rn "savedSnapshots" web/src` → 4 hits: the type decl, the `[]` initialiser, and the two lines above. **No code path ever appends to it.** Therefore `!d.savedSnapshots?.length` is `!0` → `true` for every draft, the `||` short-circuits, and `unpublishedDrafts === workspace.drafts` unconditionally. The authored comment at `:72` ("Filter out drafts whose snapshots are already published") describes behaviour that cannot occur.
   - *Second-order:* even if populated, `publishedHashes` (`:73-75`) is a `Set` of `e.slug` — **visualization slugs** — while `savedSnapshots` would carry snapshot/contour hashes. A cross-namespace comparison that could never match. Two independent reasons the guard is inert.
2. **Publish never removes the draft.** `stores/gallery.ts:237-263` (`publishDraft`) POSTs, toasts, and calls `resetAndFetch()`. It never calls `deleteDraft()` (`lib/draftStorage.ts:87`) nor `workspace.refreshDrafts()`. The draft therefore stays in `workspace.drafts` and, by (1), stays rendered with a live **Publish** button (`GalleryDraftsSection.vue:91-100`).
3. **The create call is non-idempotent although the API offers idempotency.** `lib/api.ts:372-380` (`createVisualization`) passes `{ method: "POST", body }` and **no `idempotencyKey`**. `coreFetch` only emits the header when supplied (`api.ts:138-140`), and the option is documented at `api.ts:98-99` / `:210-211`. Server-side, `api/routers/visualizations.py:236` wraps the create in `idempotency.replay_or_record(request, _store(), f"user:{owner_slug}", _handler)` — the replay map exists and is keyed off the header the client never sends. There is also **no `content_hash` dedup on insert**: `_compute_content_hash` (`:184`) is computed and stored (`:198`) but never used as a uniqueness predicate; `slugs.slug_with_retry(_insert)` (`:224`) mints a *new* slug each call.

**Net.** Press Publish twice on the same draft → two public rows, two slugs, identical `content_hash`, both in the gallery.

**Falsifier.** (a) `GalleryDraftsSection.vue:95` `:disabled="publishing"` blocks a *double-click during flight* only — `GalleryView.vue:208-215` clears `publishing` in `finally`, and by (1)+(2) the button returns enabled with the draft still listed. (b) A Mongo unique index on `content_hash` would refuse the second insert — `visualizations.py` declares none, and `_insert` catches nothing but `DuplicateKeyError` via `slug_with_retry`, which retries the *slug*, not the content. (c) `UNPROVEN-NEEDS-LIVE`: the duplicate rows themselves. The three static links are each file:line-complete.

---

## §2 — MAJOR

### M-1 · `basis-display.ts` snapshots the reactive palette at module-eval — pill colours are non-deterministic in navigation order

`lib/colors.ts:77` builds `VIZ_COLORS` with `reactive({...})` precisely so `resolveVizColors()` (`:89-96`, "Call on mount + theme toggle") can re-drive consumers on the dark-mode flip. `components/visualization/lib/basis-display.ts:3-6` then **destroys that** by reading the fields into a plain `Record<string, {icon,label,color}>` at module evaluation:
```
fourier: { icon: "ℱ", label: "Fourier", color: VIZ_COLORS.fourier },
```
`GalleryCard.vue:40-48` and `GalleryCardModal.vue:44-53` consume `cfg.color` from that frozen object. Consequence: **basis pill colours never respond to the dark-mode `MutationObserver`** (`App.vue:13`), and worse — their *value* depends on module-evaluation order. The gallery route is lazy (`router/index.ts:81-83`), and `main.ts:11` mounts behind `router.isReady()`:
- **Deep-link to `/gallery`** → the route chunk (hence `basis-display`) evaluates *before* `app.mount()` hence before `App.vue`'s `onMounted` → pills capture the hardcoded `#bf4040` / `#3d72b8` / `#9545b8`.
- **SPA-navigate to `/gallery`** → the chunk evaluates *after* `resolveVizColors()` → pills capture `#888888` (per C-1).

Same build, same user, two different colour languages depending on how they arrived. *Falsifier:* if `basisDisplay` were a `computed`/getter this would not hold — it is a bare object literal at `:3`. If `VIZ_COLORS.fourier` were a getter on the reactive proxy the read would still be a one-time unwrap into a plain string at `:4`.

### M-2 · `GalleryMarquee` is structurally unreachable, and the authored comment asserts behaviour that cannot occur

`GalleryView.vue:266` gates the empty state on `!gallery.entries.length && !gallery.loading`. Inside it, `:269-278` renders `<GalleryMarquee v-if="featuredEntries.length >= 4" :entries="featuredEntries">`. But `featuredEntries` (`:64-66`) is `gallery.entries.filter(e => e.tier === "featured")`, so `featuredEntries.length ≤ gallery.entries.length = 0`. **The guard can never be true.** The 134-line `GalleryMarquee.vue` is dead in its only callsite. The comment at `:259-264` — *"the marquee gracefully hides itself when entries.length < 4 (its own template guard), so a true cold-empty DB renders the CTA alone"* — describes a *design intent* (a living preview band over a cold gallery) that the data flow forbids: a marquee of featured entries cannot render when there are no entries. *Falsifier:* find any path where `gallery.entries` is empty while `featuredEntries` is not. Set-theoretically impossible given `:64-66`. (`grep -rn "GalleryMarquee" web/src/` → 2 hits: the import and this one callsite.)

### M-3 · The like affordance never reaches the API; its un-like branch is unreachable and its counter drifts monotonically

`GalleryView.vue:124-130` awaits `gallery.like(hash)` then branches on `result.liked`. `stores/gallery.ts:189-199` performs **no network call at all**: it hardcodes `const liked = true` (`:195`), bumps `likes` by 1 on a local copy (`:196-197`), and returns. Consequences:
- `result.liked ? s.add(hash) : s.delete(hash)` (`GalleryView.vue:128`) — the `delete` arm is **unreachable**; a like cannot be undone in-session.
- Repeated clicks increment `entry.likes` without bound (`GalleryCard.vue:144` renders it).
- The next `resetAndFetch()` — which every tier/delete/batch/publish path triggers — silently reverts every like to the server value.
- `GalleryAdminBanner.vue:78` reports `stats.total_likes` from `/api/admin/stats`, which will disagree with the on-screen card counts.

The store's own comment (`:190-192`) is honest — "no dedicated toggle endpoint under the CRUD shape — optimistic local bump" — but the *component* consumes it as if it were authoritative, with `aria-pressed="isLiked"` (`GalleryCard.vue:140`, `GalleryCardModal.vue:114`) publishing a false toggle state to assistive tech. *Falsifier:* find a `POST/DELETE .../like` in `api.ts` or `visualizations.py`. Neither exists; `liked_ips` is projected *out* of every response (`visualizations.py:78`, `:318`).

### M-4 · Leaving admin mode strands `activeTab` on a removed tab → an empty pane; the sibling watcher does the right thing

`tabOptions` (`:49-62`) only appends `users`/`flagged`/`audit` when `gallery.adminMode`. Every admin panel is double-gated on `activeTab === X && gallery.adminMode` (`:375`, `:380`, `:385`). The admin-mode watcher (`:204`) clears the selection but **does not reset `activeTab`**. So: admin on the Users tab presses Logout (`GalleryAdminBanner` `@logout` → `gallery.deactivateAdmin()`, `:247`) → `adminMode = false` → `tabOptions` drops to 2 → `activeTab` stays `"users"` → the gallery block (`:242`), the drafts block (`:356`) and all three admin blocks are false → **the pane renders the tab strip and nothing else**, with no option matching the model value passed to `SegmentedTabs` (`:225`). The correct pattern is one screen up in the same file: the `isLoggedIn` watcher (`:101-108`) explicitly does `if (activeTab.value === "drafts") activeTab.value = "gallery"`. The asymmetry is the defect. *Falsifier:* `SegmentedTabs` auto-correcting an out-of-range `modelValue` would mask it — its typing (`dist/components/custom/tabs/SegmentedTabs.vue.d.ts`) declares `modelValue: string` with a single `"update:modelValue"` emit and no coercion contract; and the empty pane holds regardless of what the strip paints. Recoverable by clicking a tab → MAJOR, not BLOCKER.

### M-5 · The gallery discards visualization identity on open — `/v/:visualizationSlug` is a live route with zero producers

`GalleryCardModal.vue:185` emits `open-visualizer` with `entry.image_slug`; `GalleryView.vue:396` pushes `/w/${slug}`. `router/index.ts:69-72` is `/w/:imageSlug?`, and `composables/useWorkspaceLoader.ts:24-30` loads `store.loadWorkspace(imageSlug)` — **keyed on the image asset**. But the gallery lists `Visualization` rows, and a single `image_slug` backs arbitrarily many of them, differing in `n_harmonics`, `active_bases`, `contour_settings` and `animation_settings` (all carried on the entry the card just rendered — `GalleryCard.vue:37`, `GalleryCardModal.vue:151`). Opening any gallery entry therefore **throws away everything that distinguishes it**. Meanwhile `router/index.ts:58-59` declares `/v/:visualizationSlug` — the entity permalink, one of the 9 route records the intake lane adopted (X-2) — and repo-wide `grep -rn '/v/' web/src/` returns **only comments** (`VisualizationView.vue:303`, `router/index.ts:4-5,53`). Zero code pushes it; the modal has no copy-link affordance. The one route that addresses the noun this component lists is unreachable from this component. *Falsifier:* a `router.push` or `<RouterLink :to>` producing `/v/…` anywhere. The full `router.push|router.replace` census (11 sites) contains none.

### M-6 · Seven of the thirteen `/api/visualizations` operations have zero client function, and `GalleryView` is their designated seat

`api/routers/visualizations.py` declares 13 operations (`@router` at `:164, 244, 287, 350, 400, 430, 488, 669, 675, 686, 733, 799, 860`). `lib/api.ts:365-460` implements exactly six client functions. The seven with **no client function anywhere** are `POST /{slug}/remix` (`:488`), `POST /{slug}/publish` (`:669`), `POST /{slug}/unpublish` (`:675`), `GET /{slug}/forks` (`:686`), `GET /{slug}/provenance` (`:733`), `GET /{slug}/diff` (`:799`), `GET /{slug}/versions` (`:860`).

This **corroborates, at file:line, three prior independent counts**: intake `R3-7c` ("36 client edges, nine gaps" of 45), the census cross-check `X-3`, and fourier's own `docs/tranches/M/M.md:24` — *"J's seven CORE endpoints (`remix`, `/forks`, `/provenance`, `/diff`, `/versions`, `publish`, `unpublish`) have ZERO `web/src` callers"* — booked for discharge at `M.md:129` (M.W10) with `M.md:63` naming *"the gallery + the new `/v/:slug` host"* as the consumer. **The tree agrees exactly**, and the seat is empty: `GalleryView` renders a per-entry modal (`GalleryCardModal`) with room for exactly these affordances (remix, fork lineage, version history, provenance breadcrumb) and offers none.

Coupled to `R6-8` (the intake's adjudicated finding that the API-operation record embeds derived client back-references, so a defect cannot be attributed to one side of the seam): here the seam has **no client side at all** for 7 of 13 operations, which is the degenerate case of the same model defect — `operation:POST:/api/visualizations/{slug}/remix` carries an empty `clients` set and nothing in the tree can falsify whether that is a client gap or a dead operation. F.W5's shared-provenance contract must be able to say which.

Also within scope: the one non-`/api/visualizations` gallery operation, `api/routers/gallery.py` (1 decorator, per the intake §0 census), has **zero callers** in `api.ts` — and this component is named `GalleryView`.

### M-7 · `selectedEntry` is a detached snapshot; every mutation path replaces the array beneath the open modal

`GalleryView.vue:44` holds `Visualization | null`; `:117` assigns the object *identity* out of `gallery.entries`. But `resetAndFetch` (`stores/gallery.ts:84-103`) replaces `entries.value` with **freshly parsed objects**, and `recordView` (`:201-212`) / `like` (`:197`) replace individual elements with spread copies. `handleSetTier` (`:132-135`) → `gallery.setTier` → `resetAndFetch` (`:143`). So promoting an entry to Featured *from inside the open modal* (`GalleryCardModal.vue:164`) refetches the world and leaves the modal bound to the pre-mutation object: the tier badge (`GalleryCardModal.vue:85-92`) and the `aria-pressed` states (`:163`, `:172`) keep reporting the old tier until the user closes and reopens. Same for `recordView`'s view bump, which lands on the array element (`gallery.ts:208`) and not on `selectedEntry`. *Falsifier:* if `selectedEntry` were a `computed` keyed on a slug, or if the store mutated in place, this would not hold. It is a `ref` holding a stale reference, and every store write path is copy-on-write.

### M-8 · The batch **Unfeature** action is structurally incapable of unfeaturing, and silently demotes `saved` → `normal`

Selection exists only on the non-featured grid: `GalleryView.vue:296,302` pass `:selected-hashes` / `@toggle-select` to `GalleryInfiniteGrid` (which declares both, `GalleryInfiniteGrid.vue:12,21`), while `GalleryFeaturedCarousel` (`:249-258`) and `GalleryMarquee` (`:269-278`) receive neither — and their prop/emit contracts declare neither (`GalleryFeaturedCarousel.vue:6-17`, `GalleryMarquee.vue:6-17`). The grid renders `nonFeaturedEntries` (`:290`, `:68-70`). Therefore **no featured entry can ever enter `selectedHashes`**, and the `Unfeature` button (`:326-333`) can only ever act on entries that are already not featured. What it *does* do is real and destructive: `api/routers/admin.py:435-440` sets `tier: "normal"` unconditionally, so unfeaturing a `saved`-tier entry **erases the saved tier**. The confirm copy is honest about the mechanism (`GalleryView.vue:424` "returned to the normal tier") while the button label is not. *Falsifier:* a selection affordance on the featured carousel. `GalleryCard.vue:86-96` renders the checkbox on `adminMode` alone — so a *featured* card in the carousel does render a checkbox, but the carousel neither binds `:selected` nor forwards `@toggle-select`, so the click is swallowed (`GalleryFeaturedCarousel.vue:32-40` forwards four events, not five). That is the same defect seen from the other side: a rendered, clickable, permanently no-op checkbox on every featured card.

### M-9 · An admin bearer token is accepted from the URL query string, then persisted to `localStorage` forever, while `adminMode` never rehydrates from it

`GalleryView.vue:83-88`: `const adminToken = route.query.admin as string | undefined; if (adminToken) { await gallery.activateAdmin(adminToken); router.replace({ query: {} }) }`. That token is a real `Authorization: Bearer` credential (`stores/gallery.ts:107` → `api.verifyAdmin` → `api.ts:492` → `coreFetch:126-131`), and on success it is written to `localStorage` (`stores/auth.ts:86-89`, `ADMIN_TOKEN_KEY`) with no expiry. Two seam defects:
1. **Exposure.** A `?admin=<bearer>` URL lands in browser history, in the `Referer` of any subsequent cross-origin subresource, and in any proxy/nginx access log. `router.replace({ query: {} })` at `:87` scrubs the address bar *after* the fact and does not unwind history or logs.
2. **Desync.** `adminMode` (`stores/gallery.ts:39`) is a plain in-memory `ref`. On reload the token is still in `localStorage` and `auth.isAdminAuthenticated` (`stores/auth.ts:22`) is `true`, but `adminMode` is `false` and `GalleryView` never consults `isAdminAuthenticated`. The admin sees a non-admin gallery while holding a live credential; `performBatchGallery` (`:175`) meanwhile reads `auth.getAdminToken()` *directly*, so the batch path is authorised off state the UI claims is inactive.
*Falsifier:* a header/POST admin-login flow, or a rehydration of `adminMode` from `isAdminAuthenticated`. Neither exists — `activateAdmin` is called from exactly one site, `GalleryView.vue:85`.

### M-10 · The publish success toast reports the **user** slug as if it were the entry slug

`stores/gallery.ts:241` `const slug = await auth.ensureUser();` — `ensureUser` returns the **user** slug (`stores/auth.ts:75-82` → `register()` → `res.user_slug`, `:49`). `:246` then receives the created entity as `data`, whose `data.slug` is correctly used for the ETag cache (`:257`) — and `:258` toasts `toast("Published!", "success", { slug })` with the *user* slug. `composables/useToast.ts:22` renders it as `` `${message} (${options.slug})` ``, so the user is shown their own account handle labelled as the published entry. The sibling path gets it right: `gallery.ts:230` toasts the visualization slug. *Falsifier:* if `ensureUser` returned the viz slug. It cannot — it runs *before* the create call at `:246`.

---

## §3 — MINOR

| # | claim | provenance | falsifier |
|---|---|---|---|
| m-1 | `fetchNextPage` and `resetAndFetch` share the abort key `"listVisualizations"`, so an infinite-scroll trigger **cancels an in-flight reset** (and vice versa). `fetchNextPage`'s guard checks `hasMore`/`loadingMore` but not `loading`. | `lib/api.ts:409-412` (both calls pass the same `abortKey`), `api.ts:54-59` (`abortable` aborts the prior controller for that key), `stores/gallery.ts:61` (guard omits `loading`) | Distinct abort keys, or a `loading` guard. Neither present. Debounced-search resets *want* this; reset↔page does not. |
| m-2 | `searchTimer` is never cleared on unmount — a pending 300 ms timer fires `resetAndFetch()` on a destroyed component's store, issuing a network call nobody renders. | `GalleryView.vue:94-98`; the file declares no `onUnmounted`/`onScopeDispose` (only `onMounted`, `:83`) | An `onUnmounted(() => clearTimeout(searchTimer))`. Absent. |
| m-3 | Dead import: `GalleryCard.vue:9` imports `VIZ_COLORS` and never references it (`grep -n VIZ_COLORS GalleryCard.vue` → 1 hit, the import). | `GalleryCard.vue:9` | A usage site. None. |
| m-4 | Three `Set` refs in one file, two idioms: `viewedHashes` mutates in place (`:119`), `likedHashes` (`:127-129`) and `selectedHashes` (`:155-158`) are copy-on-write. | `GalleryView.vue:45-46, 119, 127-129, 155-158` | Both work under Vue 3 collection reactivity — this is a consistency defect, not a correctness one. Stated as such. |
| m-5 | `handlePublishDraft`'s `try/catch` (`:207-216`) is near-dead: `publishDraft` swallows and toasts its own errors (`gallery.ts:260-262`), so only the pre-`try` `throw new Error("Draft has no contour")` (`gallery.ts:238`) escapes. A real API failure toasts once from the store; a contourless draft toasts once from the component. Two error channels for one action. | `GalleryView.vue:207-216`, `gallery.ts:237-263` | Rethrow from the store, or drop the component catch. Neither. |
| m-6 | `router.replace({ query: {} })` (`:87`) drops **every** query param, not just `admin` — any deep-link state a future caller adds is silently destroyed on admin entry. | `GalleryView.vue:87` | A destructured `{ admin, ...rest }` replace. Absent. |
| m-7 | The batch error-fan-out (`:189-191`) is unreachable: `admin.py:448` returns `_json({"ok": True, "affected": affected})` on every branch — `errors` is never emitted. | `GalleryView.vue:189-191`, `api/routers/admin.py:411-448` | An `errors` key in any `batch_visualizations` return. None. (The optional field on `BatchResponse` is defensible; the *loop* is dead.) |
| m-8 | `"{{ entries.length }} loaded"` (`GalleryInfiniteGrid.vue:27`) counts **non-featured** entries while pagination accumulates all — the number under-reports by the featured count on every page. | `GalleryView.vue:290` binds `nonFeaturedEntries`; `gallery.ts:74` pushes all | Bind `gallery.entries.length`. Not done. |
| m-9 | View inflation: `viewedHashes` (`:45`) is component-local and resets on every mount, while `GET /api/visualizations/{slug}` **unconditionally** `$inc: {views: 1}` (`visualizations.py:268-270`). Navigate away and back, reopen the same card → a second view. No client dedup survives the route. | `GalleryView.vue:45, 117-121`; `gallery.ts:201-212`; `visualizations.py:268-270` | Server-side IP/session dedup. `visualizations.py:268` has none (contrast `liked_ips`, which exists for likes and is unused, `:78`). |
| m-10 | `onMounted` serialises an IndexedDB read before the network fetch: `await workspace.refreshDrafts()` then `await gallery.resetAndFetch()` (`:89-90`). The gallery's first paint waits on a drafts read it does not need. | `GalleryView.vue:89-90`; `stores/workspace.ts:408-409` → `listDrafts()` | `Promise.all`. Not used. |
| m-11 | The subtree carries **2 of the census's 7** `./metric-badge` sites — removed at glass-ui 7.0.0. | `GalleryAdminBanner.vue:5`, `GalleryDraftsSection.vue:8`; census `CENSUS-2026-08-03.md:65`; lane-frontend §5 | The subpath surviving at 7.0.0. It does not (lane-frontend export-map diff). Latent, not live at 4.0.0. |
| m-12 | `useToast` — this component's only error channel, 5 call sites (`:177, 188, 190, 196, 212`) — imports `type ToastVariant` (`useToast.ts:4`, used `:9`), which is **definition-absent** in producer 7.0.0. The hard typecheck break lands transitively on `GalleryView`. | `composables/useToast.ts:1-13`; lane-frontend §9 carry 3 | The symbol existing at 7.0.0. Producer `grep` → empty. Latent, not live at 4.0.0. |
| m-13 | `basisLabels` `.filter(Boolean)` (`GalleryCard.vue:50`, `GalleryCardModal.vue:55`) silently drops any basis absent from the 3-key `basisDisplay` map (`basis-display.ts:3-6`) — an entry decomposed on an unknown basis renders **no** pills and no diagnostic, indistinguishable from an entry with none. | `basis-display.ts:3-6`; `GalleryCard.vue:36-51` | A fallback pill. None. |
| m-14 | `GalleryMarquee`'s duplicate track wraps a *live* `GalleryCard` — with focusable `Button`s and (in admin mode) a `Checkbox` — inside `aria-hidden="true"` (`GalleryMarquee.vue:51-66`), the canonical focusable-inside-aria-hidden violation. Moot only because of **M-2**; book it before the marquee is ever made reachable. | `GalleryMarquee.vue:51-66`; `GalleryCard.vue:90, 135, 157` | `inert`, or a non-interactive clone. Neither. |

---

## §4 — INFO

- **i-1 · `GalleryView` consumes value.js zero times — directly or transitively.** Repo-wide the entire value.js surface is 5 import statements over 4 files, all easing (`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`, `easings.ts:9,16`), all through the bare root specifier — which is the *only* specifier 0.13.0 exports (`node_modules/@mkbabb/value.js/package.json.exports` = `{".": …}`, no subpaths). None is in this subtree. **The component's only colour work is the hand-rolled `colors.ts` arm** — which is exactly the F.W2 target, and exactly what C-1 shows is already broken. Same for keyframes.js: 1 real import repo-wide (`useFourierMorph.ts:14`), zero in this subtree.
- **i-2 · The three admin panels are `defineAsyncComponent`-loaded (`:31-33`) with no `errorComponent` / `loadingComponent` / `timeout`.** A chunk-load failure (stale deploy, offline) renders nothing at all, with no toast — the component's own error channel is unreachable from the async loader. `UNPROVEN-NEEDS-LIVE` for the failure mode; the missing options are static.
- **i-3 · Naming drift at the modal seam.** `GalleryCardModal` declares `"open-visualizer": [imageSlug: string]` (`:27`) and emits `entry.image_slug` (`:185`) — correct. `GalleryView.vue:396` receives it as `(slug)`. The route is right; the name invites the M-5 confusion.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

Assumed defective, tested, and found genuinely good. Each carries its own falsifier.

**S-1 · glass-ui 4.0.0 conformance is exact — zero drift across the in-flight major.** Every glass-ui contract this component touches is valid at the *installed* 4.0.0, verified against the shipped typings, not the docs:
- `SegmentedTabs variant="underline"` + `:options` + `:model-value` + `@update:model-value` (`:223-227`) ↔ `dist/components/custom/tabs/SegmentedTabs.vue.d.ts` — `SegmentedTabsProps { options: SegmentedTabOption[]; variant?: "pill"|"underline" }`, `__VLS_ModelProps { modelValue: string }`, emit `"update:modelValue": (value: string)`. Exact, including the `{label, value}` option shape (`:50-59`).
- `DialogContent surface="opaque"` (`:402`) ↔ `dist/components/ui/dialog/DialogContent.vue.d.ts` `surface?: Surface` — the **post-4.0.0** axis whose own doc-comment records that it *"replaces the retired binary `variant: glass|opaque` (clean break)"*. The component uses the new API, not the retired one.
- All four `Button` variants used (`outline`, `destructive`, `ghost`, `default` at `:282, 317, 334, 343, 429, 431`) are in the 4.0.0 union (`dist/components/ui/button/index.d.ts`: `default|destructive|ghost|glass|link|outline|secondary`).
*Falsifier:* one drifted prop name or an out-of-union variant. Searched all 14 glass-ui-bound attributes in the file; none. Lane-frontend §5 measured the whole 3.1→4.0 sweep at 24 files / 46±46 lines — this file is one of the 24 and it landed clean.

**S-2 · The batch-confirm flow is a model destructive-action seam.** A typed union `GalleryBatchAction` (`:148`) rather than a string; a `pendingBatch` capture (`:152`) so the confirm dialog reads a frozen intent; per-action title *and* description copy (`:405-426`), not a generic "Are you sure"; `:variant="… === 'delete' ? 'destructive' : 'default'"` (`:431`) so the affirmative button's affordance tracks the action's danger; `finally { pendingBatch = null }` (`:198`); and it types against `BatchResponse` — the shape the CRUD contract ratified after `api.ts:617-620` records the *fixed* contract bug ("the wrappers previously declared a `{processed}` shape that disagreed with the backend's `{ok, affected, errors?}`"). *Falsifier:* the dialog reading live state instead of the capture (it does not — `:405` reads `pendingBatch`), or the confirm firing before the dialog closes (`:173` closes first). The one weakness is m-7's dead `errors` loop — a defensive read against a contract the server does not yet honour, which is the right direction to be wrong in.

**S-3 · Correct code-splitting at the privilege boundary.** The three admin panels (`AdminUserList` 529 + `AdminFlaggedPanel` 285 + `AdminAuditLog` 190 = **1,004 LOC**, per lane-frontend §2) are `defineAsyncComponent` (`:31-33`) while all 7 non-privileged children are static imports (`:23-29`). A non-admin visitor to `/gallery` never downloads the moderation surface. *Falsifier:* an eager admin import, or a static child that should have been lazy. Neither — the split falls exactly on the `adminMode` gate.

**S-4 · Selection lifecycle is disciplined.** `selectedHashes` is cleared on admin-mode exit (`:204`) *and* on any tab change away from the gallery (`:205`) *and* after a successful batch (`:192`) — three independent invalidation triggers for a set that arms a destructive action. This is more careful than the surrounding code, and the accompanying comment (`:202-203`) states the invariant rather than the mechanism. *Falsifier:* a path that leaves a stale selection armed. The remaining one — navigating away and back — remounts the component and re-initialises the `ref` (`:150`).

**S-5 · Copy-on-write `Set` replacement for the props that cross a component boundary.** `handleLike` (`:127-129`) and `toggleEntrySelected` (`:155-158`) build a new `Set` rather than mutating, which is the robust idiom for a collection handed to children as a prop (`GalleryInfiniteGrid.vue:11-12` → `GalleryCard.vue:22-23`) — it does not depend on the child having captured the reactive proxy rather than a raw snapshot. *Falsifier, and it half-fires:* Vue 3 instruments `Set.add`/`.has`, so in-place mutation would also work — which is precisely what `viewedHashes` does at `:119`. Booked as m-4. The superlative stands for the two prop-crossing sets; the third is the inconsistency.

---

## §6 — Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `R3-7c` "36 client edges, nine gap operations" · `X-3` 45/30/13 | **CORROBORATED and localised** — M-6 names the 7 client-less `/api/visualizations` operations by decorator line (`:488, 669, 675, 686, 733, 799, 860`) plus `gallery.py`'s single op. |
| `R6-8` "an operation record embedding derived client back-references cannot attribute a defect to one side of the seam" | **EXTENDED** — M-6: for 7 of 13 operations the client side is *empty*, the degenerate case. F.W5's contract must distinguish "client gap" from "dead operation"; nothing in the tree can. |
| fourier `docs/tranches/M/M.md:24, 63, 129` "inv-15 consumer gap (7 endpoints, 0 callers; publish PATCHes)" | **CONFIRMED verbatim against the tree**, and sharpened: `gallery.publish` (`gallery.ts:219-235`, the PATCH path M.md indicts) has exactly one caller — `VisualizationView.vue:112` — and it is **not** `GalleryView`. This component's publish path is a third route (`createVisualization`), which is how C-3 becomes possible. |
| census `CENSUS-2026-08-03.md:65` "7 `metric-badge` sites, budget 7 files" | **CONFIRMED**; 2 of the 7 sit in this subtree (m-11). |
| census `:100` "GalleryMarquee stays local" (uplift retires `./scrolling-text` at 5.0.0) | **CONTRADICTED IN CONSEQUENCE, not in fact.** The disposition is right; but M-2 shows the component is unreachable from its only callsite, so the convergence budget for it is zero until the callsite is fixed. Book the callsite, not the component. |
| lane-frontend §9 carry 5: "value.js `0.13 → 4.0` consumer surface is tiny (5 sites, easing only) — the cheapest leg of the deadlock" | **CONTRADICTED as a *scope* claim.** The *import* surface is 5 easing sites, true. But the value.js-shaped surface is larger: `lib/colors.ts` (96 LOC of hand-rolled CSS-colour parsing) is a value.js consumer that never imports value.js, and C-1 proves it is **already failing** at the current pin. The cheapest leg is also the one with a live break — and its cure is gated on value.js's own R1 oklch parse defect. This is the row F.W2 should re-plan around. |
| lane-frontend §9 carry 3: `ToastVariant` is a hard 7.0.0 typecheck break | **CONFIRMED, and localised** — 5 `toast()` sites in this file route through it (m-12). |
| census §6.7 / intake §0 "measurements enter the substrate; the authority does not" | Followed. No R3–R6 figure is cited as authority here; three (45 ops, 9 routes, 13 viz ops) were independently re-derived from the tree above. |

---

## §7 — Method and limits

- Read-only throughout. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` were treated as evidence; **no product source in any repo was written**. The single write of this lane is this file.
- No browser tooling. Every claim is derived from file bytes: `Read`, `grep`, `sed`, `find`, and `node -e` over installed `package.json` `exports` maps and `.d.ts` typings.
- Four claims carry an explicitly named `UNPROVEN-NEEDS-LIVE` residual for SS-13 — the *rendered* grey of C-1, the *observed* duplicate rows of C-3, the marquee's non-appearance in M-2 (static proof is complete; visual confirmation is not), and the async-chunk failure mode of i-2. Every other claim's chain is closed statically at file:line.
- Severity law: **BLOCKER** = a shipped affordance that does nothing, or that corrupts data; **MAJOR** = wrong output, dead-end state, or a contract the component publishes and cannot honour; **MINOR** = leak, drift, dead code, or latent break at the next pin; **INFO** = a fact the formation should carry with no action at this wave.
