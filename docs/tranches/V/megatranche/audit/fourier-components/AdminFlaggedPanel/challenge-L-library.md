claude-opus-5[1m]

# CHALLENGE — `AdminFlaggedPanel.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/visualization/gallery/AdminFlaggedPanel.vue` (285 lines: 147 script / 133 template / 3 style)
**Sole consumer** `web/src/components/visualization/GalleryView.vue:32` (`defineAsyncComponent`), mounted at `:381` under `v-if="activeTab === 'flagged' && gallery.adminMode"` — no `<KeepAlive>`.
**Method** static + source-derived only. Read whole: the component, `stores/auth.ts`, `composables/useToast.ts`, `lib/api.ts`, `lib/api-problem.ts`, `lib/types.ts`, `composables/useOffsetPagination.ts`, the three sibling gallery panels, `stores/gallery.ts`, and the server arm (`api/routers/admin.py`, `api/routers/visualizations.py`, `api/models/admin.py`, `api/models/visualization.py`, `api/services/database.py`, `api/lib/crud/cursors.py`, `api/lib/crud/softdelete.py`). Installed `@mkbabb/glass-ui@4.0.0` d.ts consulted for prop existence. No browser.
**Posture** DEFECTIVE-until-proven. Every claim carries a falsifier; six of my own hypotheses died against the tree and are recorded in §4 rather than shipped.

**Tally — 27 defects (2 BLOCKER · 9 MAJOR · 13 MINOR · 3 INFO) · 4 superlatives.**

---

## §1 — BLOCKERS

### L-1 · [BLOCKER] The moderation queue has no producer. Nothing in production writes `db.flags`; the panel is structurally unreachable past its empty state.

`AdminFlaggedPanel.vue:36-42` reads `GET /api/admin/flagged`, whose entire body is derived from `db.flags` (`api/routers/admin.py:529-548`). Every write to that collection in the repository is a test fixture or a migration:

| site | kind |
|---|---|
| `api/tests/test_janitor_audit.py:167,306` | test fixture |
| `api/tests/conformance/test_admin.py:122,124` | test fixture |
| `api/scripts/migrate_flags_field.py:104` | `update_many` rename, not a create |

There is **no `POST .../flags` route in any router** (`grep '@.*router\.\(get\|post\|put\|patch\|delete\)(' api/routers/*.py api/main.py | grep -i flag` → exactly two hits: `admin.py:509` GET `/flagged`, `admin.py:590` DELETE `/{slug}/flags`). The body model for the missing endpoint exists and is orphaned: `FlagRequest` is declared at `api/models/admin.py:57-59` and referenced **zero** times repo-wide. The web client has no flag-submission function either — `grep -n flag web/src/lib/api.ts` returns only the two admin wrappers (`api.ts:535`, `:552`), and no component in `web/src` renders a report/flag affordance (the only "flag" hits outside this file are a boolean named `copied` flag comment at `UserSlugBar.vue:21` and the tab label at `GalleryView.vue:57`).

Consequence for this component: of its five renderable states, exactly one is reachable in production — the empty state at `:232-235`. Unreachable in production: the 20-row loop `:162-230`, the flag sub-loop `:186-194`, all three row handlers (`handleSetTier` `:116-125`, `handleDismiss` `:101-110`, `confirmDelete` `:84-99`), `reasonLabel` `:127-135`, the load-more `<nav>` `:241-261`, and the confirm `<Dialog>` `:264-279`. That is **~110 of 285 lines dead by reachability**, plus the four `api.ts` wrappers and the two admin endpoints that serve them.

*Falsifier* — any production insert into `db.flags`, or any UI that submits one. Both searched exhaustively above; the orphaned `FlagRequest` model is affirmative evidence that the producer was designed and never built. This is falsified the instant a `POST /api/visualizations/{slug}/flags` route appears.

*Overlap* — this is a **new** finding; it is not in `lane-frontend.md`, `lane-crud.md`, `CENSUS-2026-08-03.md §5`, or any adjudicated row of `lane-fourier-r3-r6.md`. It is adjacent to intake row **R3-7c** ("36 client edges, nine gaps" / "inv-15 consumer gap (7 endpoints, 0 callers)") but is its **mirror**: R3-7c counts endpoints with no client; L-1 is a client (plus two endpoints, plus an admin tab, plus a Pinia-gated route branch) with **no writer at all**. The gap ledger should carry both directions.

### L-2 · [BLOCKER] The irreversible-delete confirm dialog names a *different entity* than the one it deletes — and the file's own header states the law it breaks.

`:224` `askDelete(item.slug, item.image_slug ?? item.slug)` → the dialog label is `image_slug`. `:270` renders `{{ pendingDelete?.label }}` inside "This shall permanently delete the flagged entry … The action is irrevocable." `:92` then deletes `target.slug` — the *visualization*.

`image_slug` is the image FK, not the entity identity. It is **not** 1:1 with `slug`: `api/routers/visualizations.py:175-215` inserts a fresh row with a fresh slug on every POST and performs **no dedup** — N visualizations of the same uploaded image all carry the same `image_slug`. The component's own header comment says so, at `:18-23`: *"The single user-facing identity is the visualization `slug`"* (CRUD-CONTRACT §7). The destructive path violates the law declared 200 lines above it.

The failure is not cosmetic once composed with **L-3**: two visualizations sharing an image *and* a `content_hash` render as two rows with an identical label (`:175`), an identical flag badge (`:177`), and an identical flag list (`:186-194`). The operator has **no rendered field that distinguishes them** and is asked to irrevocably delete one.

*Falsifier* — a uniqueness constraint making `image_slug` 1:1 with `slug`. `api/services/database.py:94-98` creates `visualizations.create_index("content_hash")` with **no** `unique=True` (contrast `:140`, which passes `unique=True` for the flags compound — the file demonstrably knows the keyword), and there is no unique index on `image_slug` at all. Cure is one token: pass `item.slug` as the label.

---

## §2 — MAJOR

### L-3 · [MAJOR] Flag fan-out: flags are keyed by `content_hash`, so one flagged artefact renders as N duplicate rows each claiming the full flag count.

`api/routers/admin.py:529-548` groups `db.flags` by `content_hash`; `:553` joins `{**base_query, "content_hash": {"$in": …}}` against `visualizations`; `:573` re-reads the *same group* per doc (`agg = flagged.get(doc["content_hash"], {})`). `content_hash` is `sha256({image_slug, contour_hash, sorted(active_bases), n_harmonics})` (`visualizations.py:83-97`) — it excludes `owner_slug` and `slug` by construction, and `models/visualization.py:112-113` states it outright: *"`content_hash` is a dedup / ETag substrate, **never identity**"*. Two users saving the same image with the same configuration collide.

The panel renders `item.flag_count` per row (`:177`) and `item.flags` per row (`:187`). Three colliding rows carrying three real flags present to the moderator as **three rows × "3 flags" = an apparent nine**.

*Falsifier* — a unique index on `visualizations.content_hash`, or a dedup-on-create. Neither exists (`database.py:98` non-unique; `visualizations.py:183-215` unconditional insert).

### L-4 · [MAJOR] "Dismiss flags on {slug}" has a blast radius the label denies.

`:212` labels the button `Dismiss flags on ${item.image_slug ?? item.slug}` — row-scoped. `:104` calls `dismissVisualizationFlags(token, slug)` → `api/routers/admin.py:590-609`, which resolves the slug to its `content_hash` and then `db.flags.delete_many({"content_hash": doc["content_hash"]})` (`:607`). Every sibling visualization sharing that hash is silently cleared. The success toast (`:105`, `Dismissed ${result.dismissed} flags`) reports the *group* count with no indication that other rows were affected; those rows simply vanish on the `reload()` at `:106`.

*Falsifier* — same as L-3: `content_hash` uniqueness. Also falsified if the endpoint scoped the delete by slug — it does not; `:607` is the only delete and it is hash-scoped.

### L-5 · [MAJOR] Five catch blocks surface `AbortError` as a user-facing failure toast; the repo's own guard is used in 15 sites and not one of them is here.

`lib/api.ts:69` exports `isAbortError`. It is applied at `stores/gallery.ts:78,99,174,185`, `stores/workspace.ts:128,183,226,255,277,302,331`, `components/visualization/EquationPanel.vue:53`, `components/equation/EquationView.vue:122,143`. `AdminFlaggedPanel.vue` imports `* as api` (`:14`) and uses it **zero** times across its five catch blocks (`:51, :66, :95, :107, :122`), each of which does the unconditional `toast(e.message ?? "…", "error")`.

This is not theoretical, because `adminFetch` keys the abort registry on the **request path**: `api.ts:250` `coreFetch<T>(path, /* abortKey */ path, …)`, and `api.ts:161` `abortable(abortKey)` aborts any in-flight request under that key (`api.ts:53-58`). Two reliable triggers:

1. **Tab toggle.** The panel has no `KeepAlive` (`GalleryView.vue:380-382`), so leaving and re-entering the Flagged tab destroys and recreates it; `reload()` runs at setup top level (`:73`) on each mount. Mount B's GET `/api/admin/flagged?limit=20` aborts mount A's identical path. A's rejection lands in the catch at `:51` **on the unmounted instance** and toasts the browser's internal abort string ("The user aborted a request." / "Fetch is aborted") as an error.
2. **Double-click any row action.** Two `setVisualizationTier` PUTs to `/api/admin/visualizations/{slug}/tier` share a key; the first is aborted and toasts.

*Falsifier* — a unique abort key per call (it is literally the path, `api.ts:250`), or an `isAbortError` guard in this file (absent), or `AbortError.message` being empty so `?? "Failed to load…"` engages (it is not — DOMException carries a non-empty message in every engine).

### L-6 · [MAJOR] `getAdminToken()!` ×4 turns a null token into a developer string in the operator's toast.

`:37, :88, :102, :117` all write `const token = auth.getAdminToken()!`. `auth.ts:96-98` returns `string | null`. On null, `coreFetch` reaches `api.ts:127-129` and throws `new Error("coreFetch: auth='admin' requires adminToken")` — a plain `Error`, not an `ApiProblem` — which the catch at `:51/:95/:107/:122` renders verbatim via `e.message`. The operator sees `coreFetch: auth='admin' requires adminToken`.

The tree carries two correct postures for exactly this: `stores/gallery.ts:124-125, 139-140, 151-152` (`const token = …getAdminToken(); if (!token) return;`) and `GalleryView.vue:175-178` (`if (!token) { toast("Admin token missing", "error"); return; }`). The panel adopts neither, and the `!` is precisely what prevents `vue-tsc` from catching it.

*Falsifier* — a guarantee that `adminToken` is non-null whenever the panel mounts. The mount guard is `gallery.adminMode` (`GalleryView.vue:380`), a **separate** ref (`gallery.ts:39`) from `auth.adminToken`; `gallery.deactivateAdmin()` (`gallery.ts:117-121`) clears both, but nothing re-synchronises `adminMode` if `adminToken` is cleared by another tab's `localStorage` write or an `adminLogout()` from elsewhere. The invariant is coincidental, not enforced.

### L-7 · [MAJOR] Every mutation destroys the list subtree, ejecting keyboard focus to `<body>`.

`reload()` sets `loading.value = true` (`:45`). The template's `v-if="loading"` / `v-else` pair (`:151` / `:156`) is a **subtree swap**, not an overlay: the entire `role="list"` container and all its Buttons unmount. All three row handlers end in `await reload()` (`:93/:106/:120`), so the button the operator just activated is destroyed while focused. Vue does not restore focus; it falls to `document.body`. A keyboard-only moderator is returned to the top of the document after every single dismiss, tier-set, or delete.

*Falsifier* — a focus-restoration hook (none: the file has no `nextTick`, no `useTemplateRef`, no focus call), or the spinner being an overlay rather than a `v-if`/`v-else` swap (`:151`/`:156` are unambiguous), or the row Buttons living outside the swapped subtree (`:198-227` are inside `:156`'s `v-else`).

*Axis note* — logged here rather than on D because the mechanism is a lifecycle/teardown fact of the component's render structure, not a visual-design choice.

### L-8 · [MAJOR] Every mutation discards all accumulated pages.

`:48` `flaggedEntries.value = result.items` after a cursor-null fetch. `handleSetTier`, `handleDismiss` and `confirmDelete` all `await reload()`. A moderator who has pressed "Load more" four times (80 rows) and dismisses one flag is returned to 20 rows and must re-page from the top — with the row they were working through now somewhere in the discarded tail.

*Falsifier* — an in-place splice path (none exists; `reload()` is the only post-mutation update), or `loadMore` state surviving reload (`:49-50` overwrite `nextCursor`/`hasMore` unconditionally).

### L-9 · [MAJOR] There is no error state; a failed load is indistinguishable from an empty queue.

The component declares `loading`, `loadingMore`, `nextCursor`, `hasMore`, `flaggedEntries` (`:30-34`) — and **no** `error` ref. On a failed initial `reload()` (expired admin token, network down, 500), the catch at `:51-53` fires a transient toast and `flaggedEntries` stays `[]`, so `:232` renders the reassuring "No flagged content". Once the toast auto-dismisses, a broken panel is visually identical to a clean queue.

The repo's own pagination seat models the correct shape: `useOffsetPagination.ts:31` declares `error`, `:48` populates it, `:75` exports it.

*Falsifier* — a persistent error surface anywhere in the template (`grep -n error AdminFlaggedPanel.vue` → zero hits). **Honesty qualifier:** this is not unique to the panel — `AdminAuditLog.vue:15-25` and `AdminUserList.vue` both destructure `useOffsetPagination` *without* `error`, so all three admin panels drop it. The panel is the worst case only because it lacks the ref entirely.

### L-10 · [MAJOR] The panel that moderates *images* renders no image. It is the only gallery component that holds `image_slug` and prints it as text.

`:175` `{{ item.image_slug ?? item.slug }}` inside `font-mono text-xs truncate`. Every sibling that displays an entry renders the asset:

| component | line | call |
|---|---|---|
| `GalleryCard.vue` | `:100` | `thumbnailUrl(entry.image_slug)` |
| `GalleryCardModal.vue` | `:79` | `overlayUrl(entry.image_slug)` |
| `GalleryDraftsSection.vue` | `:77` | `thumbnailUrl(draft.imageSlug)` |
| `ImageUpload.vue` | `:65` | `thumbnailUrl(store.imageSlug)` |
| `ContourEditorCanvas.vue` | `:95` | `overlayUrl(props.imageSlug, resize)` |

`thumbnailUrl` is `api.ts:292` and takes exactly the field the panel already has in hand. A moderator adjudicating `reason: "inappropriate"` is shown a four-word slug and a reporter's free-text `detail`, and must act on an irreversible delete without ever seeing the content.

*Falsifier* — a deliberate policy of not rendering flagged media to moderators. No such note exists in the file, in `CRUD-CONTRACT` references cited by the file (`:18-23`, `:90-91`, `:112-115`), or in `api/routers/admin.py`'s docstrings. The header comments are unusually thorough elsewhere, which makes their silence here evidence of omission rather than intent.

*Viz-render-path finding* — per `CENSUS-2026-08-03.md §3a` [FE §6], fourier is "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument; ConvergencePlot; FrequencyGraph) + 12 SVG surfaces." `AdminFlaggedPanel` touches **none** of the three canvases and none of the SVG surfaces — `grep -n 'canvas\|WebGL\|getContext' components/visualization/gallery/` returns zero across the whole gallery directory. The panel's only contact with the render path is the `<img>`-tier thumbnail idiom above, and it declines it. Its intersection with the census's rAF/reduced-motion carries [FE §8] is therefore empty — correctly, and I record that as a non-defect.

### L-11 · [MAJOR] `reload()` and `loadMore()` are concurrent and do **not** cancel each other; the loser corrupts the list.

Because the abort key is the full path *including the query string* (`api.ts:250`; `api.ts:542-549` appends `cursor=` only when present), `/api/admin/flagged?limit=20` and `/api/admin/flagged?limit=20&cursor=X` are **distinct keys**. Sequence: operator clicks "Load more", then immediately clicks a row's Dismiss. `handleDismiss` → `reload()` replaces `flaggedEntries` with page 1 (`:48`) and sets `nextCursor`/`hasMore` from that response (`:49-50`). The still-in-flight `loadMore` then resolves and executes `:63` `flaggedEntries.value.push(...result.items)` — appending *stale page-2* rows onto the fresh page-1 array — followed by `:64-65`, which overwrite the just-computed cursor with the stale one. The list now contains a page-2 slice of pre-dismissal state and will page forward from the wrong cursor.

`loadMore`'s guard (`:59` `if (!hasMore.value || loadingMore.value) return`) protects only against loadMore-vs-loadMore. Nothing guards loadMore-vs-reload; `reload()` (`:44-56`) has no guard at all.

*Falsifier* — a shared abort key (they differ, by construction of `api.ts:542-546`), a generation/epoch token (none), or an in-flight cancel on mutation (none). Also falsified if `loadingMore` blocked `reload` — it does not; `reload` inspects neither flag.

---

## §3 — MINOR

### L-12 · [MINOR] Third hand-rolled pagination implementation; the repo has a pagination seat and this file bypasses it.
`useOffsetPagination.ts` is the consumer-owned seat (its header, `:9-18`, documents the fork rationale and why vueuse is not a swap). Both sibling admin panels use it: `AdminAuditLog.vue:4,26`, `AdminUserList.vue:20,54`. This panel hand-rolls 5 refs + 2 functions inline (`:30-71`); `stores/gallery.ts:42-107` hand-rolls the *same cursor loop a second time*. There is no `useCursorPagination`. *Falsifier* — a cursor composable somewhere in `composables/` (the directory holds exactly five files, none of them one).

### L-13 · [MINOR] `timeAgo` duplicated five times, in two mutually inconsistent dialects.
`AdminFlaggedPanel.vue:137`, `AdminUserList.vue:223`, `GalleryDraftsSection.vue:28`, `GalleryCard.vue:53`, `GalleryCardModal.vue:58`. The first two return `"0m ago"` for sub-minute deltas; the last three return `"just now"`. Same gallery, same session, two different renderings of the same instant. This panel's copy additionally accepts `string | null` while the other four take `string` — a sixth signature variant. *Falsifier* — a shared formatter in `lib/` (`grep -rn 'function timeAgo'` → exactly these five).

### L-14 · [MINOR] Row actions have no in-flight guard, though `loadMore` in the same file does.
`:59` guards `loadMore` on `loadingMore`. `handleSetTier` (`:116`), `handleDismiss` (`:101`) and `confirmDelete` (`:84`) have no equivalent, and their Buttons carry no `:disabled` (`:198-227`) — contrast `:250`, which does disable the load-more Button. Double-activation issues duplicate mutations and, per L-5, self-aborts into a spurious error toast. *Falsifier* — a disabled/pending binding on the row buttons (`:198-227` carry `variant`, `size`, `class`, `:aria-label`, `title`, `@click` only).

### L-15 · [MINOR] `reasonLabel(reason: string)` widens `FlagReason` and defeats exhaustiveness.
`:127` takes `string`; the call site `:191` passes `flag.reason`, typed `FlagReason = "inappropriate" | "spam" | "copyright" | "other"` (`types.ts:139`, mirroring `api/models/admin.py:54`). Adding a fifth reason compiles clean and silently renders the raw enum token via the `?? reason` fallback at `:134`. Typing the parameter `FlagReason` and the map `Record<FlagReason, string>` would make the addition a `vue-tsc` error. *Falsifier* — an existing exhaustiveness gate (there is no ESLint config in `web/` at all; see L-17).

### L-16 · [MINOR] `FlaggedVisualization` drifts from the shape the endpoint actually emits — in two directions.
`types.ts:152-160` declares `image_slug: string | null`. The server model requires it: `api/models/visualization.py:122` `image_slug: str`. The nullable declaration makes the `?? item.slug` fallbacks at `:175, :202, :212, :222, :224` **five dead branches** — and note that this dead-branch nullability is exactly what makes L-2's label look defensible at a glance. In the other direction, `admin.py:571-582` emits `"content_hash"` on every item and the client type omits it, so the field the flag stream is actually keyed by (L-3/L-4) is invisible to the component. The type's own comment (`types.ts:148-151`) claims to be "the canonical lift"; it is neither complete nor faithful. *Falsifier* — a code path that produces a null `image_slug` (the field is required at insert, `visualizations.py:199-206`, and validated at `:175`).

### L-17 · [MINOR] `catch (e: any)` ×5 with no lint gate anywhere in the repo to notice.
`:51, :66, :95, :107, :122`. `lib/api-problem.ts:14-15` documents the intended posture — `if (e instanceof ApiProblem) { … }` — and `ApiProblem` carries `status`, `type`, `detail` and an `is()` discriminator (`:18-52`) that would let the panel distinguish 401 (token dead → prompt re-auth) from 404 (row already gone → drop it locally) from 409/412 from 500. All five sites collapse every case into one toast string. `web/` has **no** ESLint configuration (`ls eslint* .eslintrc*` → none) and `package.json.scripts` is `{dev, build: "vue-tsc -b && vite build", preview, test:e2e, test:e2e:ui}` — so nothing gates `any`. *Falsifier* — a root-level flat config reaching `web/` (searched; absent).

### L-18 · [MINOR] `role="list"` with a non-`listitem` child in the empty state.
`:156-161` sets `role="list"`; `:162` supplies `role="listitem"` children; but `:232-235` places a bare `<div>` (icon + `<p>`) as a **direct child of the same `role="list"`**. ARIA requires `list` to own only `listitem`. The violation manifests exactly when `flaggedEntries.length === 0` — which, per L-1, is the only state that occurs in production. *Falsifier* — moving the empty state outside the list container, or the container dropping `role="list"` when empty. Neither is done.

### L-19 · [MINOR] `<style scoped>` with zero rules still stamps a scope attribute on every element.
`:283-285` is `@reference "tailwindcss";` and nothing else. `@reference` exists to make `@apply`/theme functions resolvable inside the block — and the block applies nothing. The `scoped` attribute nonetheless makes the SFC compiler emit `data-v-*` on all ~40 template elements for zero matching rules. Repo-wide the pattern appears in exactly four files, all in this directory: `AdminFlaggedPanel.vue`, `AdminAuditLog.vue`, `AdminUserList.vue`, `GalleryDraftsSection.vue`. *Falsifier* — any rule in the block (there is none) or a build step that requires the marker (Vite's Vue plugin does not).

### L-20 · [MINOR] The flag sub-loop is unbounded on both ends.
`api/routers/admin.py:534-544` `$push`es **every** flag into the group with no `$slice` and no `$limit`; `:187-194` renders every element with no cap, no "show more", and no virtualisation. One artefact flagged 500 times renders 500 sub-rows inside one card. Compounded by L-3: with three colliding rows that is 1,500. *Falsifier* — a server-side slice (absent), a client-side cap (absent), or a rate limit on flag creation (moot — there is no creation path at all, L-1).

### L-21 · [MINOR] Three dead server-side contract models that contradict the live shape.
`api/models/admin.py:57-85` declares `FlagRequest`, `FlaggedEntryInfo`, `FlaggedListResponse` — all zero-referenced (`grep -rn` over `--include="*.py"` returns only their declarations and `FlaggedListResponse`'s internal reference to `FlaggedEntryInfo`). They encode the **retired** contract: `FlaggedEntryInfo` uses `content_hash` as identity with no `slug` and names the owner `user_slug`; `FlaggedListResponse` is the offset envelope `{items, total, page, pages}` that the client type explicitly retired (`types.ts:162-164`). The live endpoint hand-builds its body with no `response_model` (`admin.py:571-584`), which the client type also documents (`types.ts:148-149`) — so the only *typed* server description of this component's payload is wrong, and nothing checks it. *Falsifier* — any `response_model=` referencing them (`grep -rn "response_model" api/routers/admin.py` → these three never appear).

### L-22 · [MINOR] Each "Load more" re-runs the full unpaginated flag aggregate.
`api/routers/admin.py:529-548` groups the **entire** `db.flags` collection into an in-memory dict on every request, before `:553` narrows by `$in` over every key. The component's cursor loop (`:58-71`) therefore costs O(pages × |flags|) server-side. `db.flags` has no `content_hash`-prefixed grouping index that would make this cheap; `database.py:140-142` indexes `(content_hash, reporter_slug)` unique, `content_hash`, `created_at`. *Falsifier* — a `$match` bounding the aggregate to the current page's hashes (the join runs the other way round, `:553`). *Marked UNPROVEN-NEEDS-LIVE for the magnitude* (SS-13): the shape is source-certain, the wall-clock cost is not measurable statically.

### L-23 · [MINOR] `timeAgo` is a plain function called during render, so timestamps freeze.
`:182` and `:193` call `timeAgo(...)` in interpolations over `flaggedEntries`, which changes only on `reload()`. There is no interval, no `useNow`, no `computed` clock. A panel left open for an hour keeps saying "3m ago". *Falsifier* — a reactive time source (none imported; the script's only `vue` import is `ref`, `:2`).

### L-24 · [MINOR] `pendingDelete` is not cleared on Cancel or Escape.
`:275` Cancel sets `dialogOpen = false` only; closing via Escape/overlay goes through `v-model:open` (`:264`) and likewise does not clear. `pendingDelete` (`:76`) retains the last target indefinitely. No functional consequence today — `confirmDelete` is reachable only from `:276`, and `askDelete` overwrites on every open — but it is a state leak in a destructive-confirm path, which is the worst place for one. *Falsifier* — a `@update:open` handler or a watcher clearing it (neither exists).

---

## §3b — INFO

### L-25 · [INFO] R5-7 applies here in full: both of this component's loops are native-element loops, invisible to a component-callsite-keyed deriver.
Per the adjudicated intake row **R5-7** (`lane-fourier-r3-r6.md:125`, verdict TRUE, ADOPT-AS-FACT + CARRY → F.W4): *"template-loop evidence keyed to component callsites is blind to native HTML element loops."* `AdminFlaggedPanel`'s two loops are hosted on native `<div>` (`:162-163` and `:186-187`), not on components — so under the pre-R6 model they contribute **zero** loop evidence, exactly as `PaperSidebar.vue`'s `<li>` loops did.

I classified all 33 `v-for` sites in `web/src` by host element (nearest enclosing open tag; lowercase ⇒ native): **17 NATIVE / 16 COMPONENT**. Native hosts: `div` ×11, `li` ×4, `circle` ×1, `template` ×1. This panel supplies 2 of the 17 — the largest single-file share in the gallery directory after `GalleryMarquee.vue` (3).

Two consequences the F.W4 board should carry:
1. R5-7 is **not** a `<li>`-specific defect. The intake's prose fairly emphasises `PaperSidebar`'s `<li>`, but `<div v-for>` is the dominant native form (11 of 17), and it is the form used by four of the five admin/gallery list surfaces (`AdminAuditLog.vue:126`, `AdminFlaggedPanel.vue:163,187`, `AdminUserList.vue:359`, `GalleryDraftsSection.vue:68`). A cure keyed on `li` would still be blind to the entire admin surface.
2. R6's cure appears to be **one short**. Intake row **R6-6** (`:141`) records R6 adding `nativeTemplateLoops: 16` and `nativeTemplateLoopDiagnostics: 17`. My live count of native-hosted `v-for` is **17**, and the one host that is not a real DOM element is `MobileFloatingToc.vue:149`'s `<template v-for>` — a plausible exact account of the 16 vs 17 split. If so, `<template v-for>` (a real iteration, no element) is uncounted by the *cured* family too.
*Falsifier / status* — **UNPROVEN-NEEDS-LIVE (artifact)**: the R6 registry is unreadable from here (`ls /Users/mkbabb/Documents/Codex/2026-08-02/` → `Operation not permitted`; `find … -name DERIVED-REGISTRIES.json` → nothing), so the 16-vs-17 reconciliation rests on the intake's quoted counts plus my live classification, not on the artifact. The live 17/16 classification itself is reproducible from the tree and is *not* UNPROVEN. My classifier resolves the host by nearest preceding open tag within 12 lines, which mis-assigns any `v-for` more than 12 lines below its own tag — none of the 33 is.

### L-26 · [INFO] The component has zero automated coverage of any kind.
`CENSUS-2026-08-03.md §3a` [FE §0, §9] and `§5` item 10 record "**vitest ABSENT** — the only frontend gates are `vue-tsc` + 29 Playwright tests on a single chromium project." Confirmed live: `web/package.json.scripts` has no unit-test script, and `web/e2e/` holds 8 spec files, **none of which mentions "flag"** (`grep -rni flag web/e2e/` → zero). So every defect above — including both blockers — is invisible to every gate the repository runs. `vue-tsc` cannot see L-6 (silenced by `!`), L-15 (silenced by the widened parameter), or L-16 (the drift is in a hand-written type, and the endpoint has no `response_model` to check it against, L-21).

### L-27 · [INFO] The component sits on the uplift break surface transitively, but is **not** broken today.
`CENSUS-2026-08-03.md §3a` [FE §5] books "`ToastVariant` definition-absent → **hard typecheck break** (`useToast.ts:3,9`)". `AdminFlaggedPanel.vue:13` imports `useToast`, so it inherits that break. **Qualifier for the record:** at the *installed* `@mkbabb/glass-ui@4.0.0` the symbol resolves — `ToastVariant` is present in `node_modules/@mkbabb/glass-ui/dist/components/ui/toast/index.d.ts`, `Toast.vue.d.ts`, `use-toast.d.ts`, `api/index.d.ts`. The census is describing the **4→7 uplift target**, not the current tree, and reads correctly in context; I note it only so a reader of this file does not mistake it for a present-tense break. `package.json:14` declares `^4.0.0`; installed is 4.0.0. The panel's other two producer surfaces are clean at 4.0.0 — see S-3.

---

## §4 — Hypotheses I raised and the tree killed (recorded so they are not re-raised)

L-18 runs both ways; so does a challenge. Six candidate defects died against evidence:

1. **"Soft-deleted rows linger in the flagged queue, so Delete appears to do nothing."** FALSE — `admin.py:522` seeds the query from `not_deleted_filter()` (`api/lib/crud/softdelete.py:21-23` → `{"deleted_at": None}`), and the docstring says so at `:517`. Deleted rows leave the listing.
2. **"Cursor paging duplicates the boundary row, producing Vue duplicate-key warnings against `:key="item.slug"`."** FALSE — `api/lib/crud/cursors.py:63-70` uses a strict `$lt` with an `_id` tie-break, and `:71` sorts on the same compound. Exclusive and total; no duplicates possible.
3. **"`text-admin-label` (used 3× here, 7× repo-wide) is undefined and inert."** FALSE — it resolves through glass-ui's typography layer (`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`, `…/scale.css`, `…/theme/bridges.css` define `--type-admin-label` / `--text-admin-label`), and the built stylesheet carries a real `.text-admin-label` rule.
4. **"`<DialogContent surface="opaque">` (`:265`) passes an unknown prop that falls through to a stray HTML attribute."** FALSE — `surface?: Surface` exists at the installed version (`dist/components/ui/dialog/DialogContent.vue.d.ts`), with `opaque` documented as the solid-card escape. See S-3.
5. **"`flaggedEntries.value.push(...result.items)` (`:63`) skips the repo's `scheduler.yield` floor that `stores/gallery.ts:74` observes."** IMMATERIAL — the store's `processInChunks(..., {chunkSize: 24})` (`gallery.ts:74`) would not yield at a 20-item page either (`gallery.ts:68`, limit 20). No behavioural difference at the configured page size; I decline the finding.
6. **"`flag_count` can disagree with `flags.length`."** FALSE — `admin.py:533-544` derives both from the same `$group` (`$sum: 1` and `$push`), so they are equal by construction. The inflation in L-3 is across *rows*, not within one.

---

## §5 — Superlatives (4)

**S-1 · The cursor-envelope migration is complete and correct on the client — and the client is ahead of its own server.**
`:18-23` and `:238-240` document the offset→cursor transposition; `:30-34, :44-71` implement it faithfully against `FlaggedCursorResponse` (`types.ts:165-169`); the retired `{total, page, pages}` shape is gone from the client entirely. Meanwhile the server still carries the dead offset model `FlaggedListResponse` (`api/models/admin.py:82-85`, L-21). A consumer that finished a contract migration its producer left half-done is worth naming. *Falsifier* — any residual `total`/`page`/`pages` reference in this file or in `FlaggedCursorResponse` (none).

**S-2 · Icon-button labelling is the best in its directory, and is entity-interpolated rather than generic.**
All three icon-only Buttons carry a computed `:aria-label` naming the target — `Mark ${…} acceptable (save tier)` `:202`, `Dismiss flags on ${…}` `:212`, `Delete entry ${…}` `:222` — not the usual bare "Delete". All five decorative icons carry `aria-hidden="true"` (`:173, :206, :216, :226, :233`, plus `:257`). The load-more Button is labelled (`:251`) and disabled while pending (`:250`). The spinner is a proper live region: `role="status"` + `aria-live="polite"` + `sr-only` text (`:151-153`). *Falsifier* — an unlabelled icon-only control anywhere in the file (there is none). **Caveat that keeps this honest:** `:212`'s label is *accurate about scope only if L-4 is fixed*, and all three interpolate `image_slug`, which is L-2's identity bug — the labels are exemplary in *form* and inherit the file's identity defect in *content*.

**S-3 · `confirm()` was genuinely replaced, and with the current producer API rather than the retired one.**
`:75` and `:263` record the intent; `:264-279` is a real focus-trapped `<Dialog>` with `DialogTitle`/`DialogDescription` wired for the accessible name and description; `GalleryCardModal.vue:32-33` independently records the same rationale. It uses `surface="opaque"` — the **current** `{glass·veil·opaque}` axis — not the "retired binary `variant: glass|opaque`" that the installed `DialogContent.vue.d.ts` explicitly names as superseded. A consumer on the right side of a producer clean-break. *Falsifier* — `variant=` on the dialog (absent) or `surface` being unsupported at 4.0.0 (it is supported; §4 item 4).

**S-4 · The admin token is read fresh at each call site, not captured at setup.**
`:37, :88, :102, :117` each call `auth.getAdminToken()` at invocation. For an async component that stays mounted across a token rotation (`auth.ts:86-89` `adminLogin` overwrites the ref), capturing once in setup would pin a stale token. The panel does the right thing four times out of four. *Falsifier* — a hoisted `const token = auth.getAdminToken()` at setup scope (there is none). This is orthogonal to L-6, which faults the `!`, not the freshness.

---

## §6 — Corpus reconciliation

- **New relative to the whole hitherto corpus:** L-1, L-2, L-3, L-4, L-11 and L-21. None of `lane-frontend.md`, `lane-crud.md`, `lane-docs.md`, `CENSUS-2026-08-03.md` (incl. its 2026-08-03 addendum) or `lane-fourier-r3-r6.md` mentions `AdminFlaggedPanel`, the `flags` collection, or `content_hash`-keyed moderation.
- **Folded, not re-derived:** census `§3a` [FE §6] (canvas inventory → L-10's viz-path verdict), [FE §5] (`ToastVariant` uplift break → L-27), [FE §0/§9] + `§5` item 10 (vitest absent, 29 Playwright → L-26); intake `R5-7` (`:125`) → L-25; intake `R6-6` (`:141`) → L-25's 16-vs-17 note.
- **Mirror of an adjudicated row, filed as its complement:** intake `R3-7c` (`:81`, TRUE, CARRY → F.W5) counts endpoints with no client. L-1 is the same census defect inverted — a client, two endpoints, an admin tab, a route branch and an orphaned request model, with no writer. F.W5's consumer-gap ledger should count both directions or it will report this surface as fully wired.
- **No contradiction of the corpus was found.** The one place I qualify a census line (L-27, `ToastVariant`) is a tense clarification, not a disagreement: the census books it under the uplift break surface [FE §5] and is correct there.
- **Contradiction of the tree's own prose, found:** the component's header law at `:18-23` ("The single user-facing identity is the visualization `slug`") is violated by the component's own destructive path at `:224`/`:270` (L-2), and by its five `?? item.slug` fallbacks whose nullability premise is false (L-16).
