claude-opus-5[1m]

# CHALLENGE — `AdminUserList.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminUserList.vue` (529 lines; script 1–232, template 234–525, style 527–529)
**Date** 2026-08-04 · **Posture** component presumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and dies if the falsifier fires.
**Tooling** static + source-derived only. No browser. One typecheck was run (`npx vue-tsc --noEmit`, zero writes) and its result is reported as evidence **against** two of my own hypotheses (§4).

**Read whole (read-only):** the target; `web/src/composables/useOffsetPagination.ts` (83); `web/src/composables/useToast.ts` (38); `web/src/stores/auth.ts` (143); `web/src/lib/api.ts` (672); `web/src/lib/api-problem.ts` (61); `web/src/lib/types.ts` §AdminUser/§Batch; `@mkbabb/glass-ui@4.0.0` `package.json#exports` (80 subpaths), `dist/components/ui/checkbox/Checkbox.vue.d.ts`, `dist/components/ui/select/Select.vue.d.ts`, `src/styles/theme/bridges.css`, `src/styles/utilities/components.css`, `src/styles/cards.css`; `lucide-vue-next` (icon-only, no analysis surface).
**Read for corroboration:** `GalleryView.vue`, `AdminAuditLog.vue`, `AdminFlaggedPanel.vue`, `GalleryCard.vue`, `GalleryCardModal.vue`, `GalleryDraftsSection.vue`, `stores/gallery.ts`, `web/src/style.css`, `api/routers/admin.py`, `api/models/admin.py`, `web/package.json`, `web/tsconfig.json`, `web/e2e/`.

**Corpus folded (not re-derived):** `formation/fourier/lane-frontend.md:102` (529 LOC row, "Admin user table + role dialogs"), `:189` (`useOffsetPagination.ts` 83), `:332–335` (this file's four glass-ui specifiers), `:358` (the retired `./pagination` note); `formation/fourier/CENSUS-2026-08-03.md` §3a (Canvas2D throughout, **WebGL/WebGPU ABSENT**; three canvases + 12 SVG surfaces), §2 C-5 (2 079 LOC shadow aggregate); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125` (**R5-7**, TRUE / ADOPT-AS-FACT / carry → F.W4), `:140` (**R6-5/R6-6**, `NATIVE_TEMPLATE_LOOP` cure), `:184`, `:222`.

**Tally — 23 defects · 1 BLOCKER · 6 superlatives · 4 killed hypotheses.**

---

## §1 — The roster

| # | Sev | Claim (one line) | Anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | Selection survives a search/sort refilter; batch-delete then hard-deletes users the admin cannot see | `:72–78`, `:125–156`, `:101–109` |
| L-2 | MAJOR | The composable's `error` is never destructured — a failed list load renders as "No users found" | `:43–53`, `:422–425` |
| L-3 | MAJOR | Stale-response race: `adminFetch` keys the abort registry on the full path, so each keystroke's request is un-cancellable | `api.ts:250`, `:55–66` |
| L-4 | MAJOR | Post-delete `loadPage()` never re-clamps `page` → phantom page ("3 / 2", empty list) | `:173/184/195/206`, `useOffsetPagination.ts:38–39` |
| L-5 | MAJOR | No unmount teardown: `searchTimer` uncleared, in-flight request unaborted, under `v-if` tab churn | `:41,:72–75`, `GalleryView.vue:375–377` |
| L-6 | MAJOR | Abort errors are toasted as red failures; the repo's own `isAbortError` filter is not applied | `:174–176`, `stores/gallery.ts:78` |
| L-7 | MAJOR | 529 LOC / ~7 responsibilities; `AdminAuditLog.vue` is a near line-for-line clone of the pagination block | whole file |
| L-8 | MAJOR | `timeAgo` is duplicated 5× in two **drifting** dialects; this file's variant renders "0m ago" where a sibling on the same route renders "just now" | `:223–231` +4 |
| L-9 | MAJOR | Three hand-rolled destructive-confirm dialogs across the repo while glass-ui ships `./confirm-dialog` with **zero** consumers | `:459–523` |
| L-10 | MAJOR | Zero automated coverage over irreversible destructive operations (no vitest in `web/`; no admin-users e2e spec) | `package.json`, `e2e/` |
| L-11 | MINOR | `result.errors` branch is unreachable — the backend never emits an `errors` key | `:169–171`, `admin.py` |
| L-12 | MINOR | `auth.getAdminToken()!` ×6 is a type lie that leaks a developer string into an admin-facing toast | `:56,159,180,191,202,213` |
| L-13 | MINOR | `AdminUserInfo.status: string` is looser than the two-member domain the same file compares against | `types.ts:127` |
| L-14 | MINOR | `confirmPending` nulls `pending` *after* the await → a second confirm during an in-flight mutation silently no-ops | `:111–119` |
| L-15 | MINOR | `data-some` / `data-selected` have zero consumers; the `"indeterminate"` branches are unreachable; the block comment asserts a mechanism that does not exist | `:282–295`, `:363` |
| L-16 | MINOR | `shadow-cartoon` stacked on `cartoon-card` — two competing box-shadow token families on one element; the repo's sole such site | `:308` |
| L-17 | MINOR | `catch (e: any)` ×5, `ApiProblem.detail`/`.type` discarded, and **no linter exists in the repo** to catch either | `:174,185,196,207,218` |
| L-18 | MINOR | The response's authoritative `page`/`pages` are discarded, and the page number is re-derived by inverting the offset the composable just computed | `:57–63` |
| L-19 | MINOR | Every mutation blanks the whole list while the stale select-all header survives | `:277`, `:286`, `:353` |
| L-20 | MINOR | `useOffsetPagination` ships a 25 %-dead export surface (`error`, `reset`, `pageSize`: 0 consumers across both call sites) | `useOffsetPagination.ts:68–82` |
| L-21 | INFO | **R5-7 class applies, with a refinement the intake row does not draw** | `:358–360` |
| L-22 | INFO | `timeAgo` is non-reactive, unbounded at the top, and unguarded at the bottom | `:223–231` |
| L-23 | INFO | Batch-suspend's `affected` is `modified_count`; already-suspended rows are silently uncounted in the success toast | `:168`, `admin.py` |

---

## §2 — The findings

### L-1 · BLOCKER — the selection outlives the result set it was made against

**Claim.** `clearSelection()` is wired to exactly one invalidation event — `watch(page, …)` at `:156`. Search (`:72–75`) and sort (`:78`) both invalidate the result set by calling `loadPage(1)`. When the admin is already on page 1 — the overwhelmingly common case, and the *only* case reachable immediately after a search, because `loadPage(1)` is what a search does — `page.value` is assigned `1` over `1`. Vue does not fire a watcher on an unchanged value. `selected` therefore survives intact into a completely different result set, the floating toolbar (`:304`) keeps rendering `{{ selected.size }} user(s) selected`, and `askBatch` (`:101–109`) snapshots those now-invisible slugs.

**Consequence is not recoverable.** `api/routers/admin.py` `batch_users` → `action == "delete"` is a **hard** delete: `db.flags.delete_many` → `db.visualizations.delete_many({"owner_slug": slug})` → `db.sessions.delete_many` → `db.users.delete_one`. No soft-delete, no grace window, no restore path (contrast the `visualizations` batch, which routes through `soft_delete`). And the confirm dialog for the batch branch (`:486–489`) says only "the selected users" — it never enumerates the slugs, so the admin's last checkpoint before an irreversible cascade shows him nothing he could use to notice.

**Provenance.**
- `AdminUserList.vue:72–78` — the two invalidators, both `loadPage(1)`.
- `AdminUserList.vue:156` — `watch(page, () => clearSelection())`, the sole clear-on-invalidate.
- `useOffsetPagination.ts:39` — `page.value = Math.max(1, Math.min(p, pageCount.value || 1))`; with `p = 1` on page 1 this is an identity assignment.
- `AdminUserList.vue:121–124` — the block comment states the invariant the code fails: *"Page changes clear the selection to prevent stale slugs persisting across views."* A refilter **is** a change of view.
- `api/routers/admin.py` `batch_users` delete branch — the hard cascade.

**The repo convicts itself.** `GalleryView.vue:204` carries `watch(() => gallery.adminMode, (on) => { if (!on) clearGallerySelection(); })` — the sibling component, holding the structurally identical `selectedHashes` Set, *does* clear on the state change that invalidates its selection. The author knows the rule. This file applies it to one of the three invalidating events.

**Falsifier (fired? no).** This dies if any of: (a) something else clears `selected` on search/sort — grep across the file yields `clearSelection` at exactly `:154` (definition), `:156` (page watch), `:172` (post-batch), `:345` (the X button); nothing on `searchQuery` or `sortMode`; (b) `loadPage(1)` triggers the page watcher from page 1 — it cannot, Vue's `watch` on a `ref` is `Object.is`-gated and `1 === 1`; (c) the batch API filters the payload to the currently-visible page server-side — `batch_users` takes `body.slugs` verbatim, no page context is even transmitted. **All three checked; none fires.**

---

### L-2 · MAJOR — a failed load is indistinguishable from an empty database

**Claim.** `useOffsetPagination` catches every fetch failure into `error` (`:47–48`) and exposes it (`:76`). The destructure at `AdminUserList.vue:43–53` takes ten members and omits `error`. `loading` goes false, `items` stays `[]`, and the template falls to `:422–425` — a `Users` glyph and the words **"No users found."** A 401 from an expired admin token, a 500, a network partition, and a genuinely empty user table all render identically.

**Sharpness.** This is the *only* silent path in the file. Every other failure — suspend, unsuspend, delete, prune, batch — raises a toast (`:175, 186, 197, 208, 219`). The one operation an admin performs first, and depends on to know the system's state, is the one that lies.

**Provenance.** `AdminUserList.vue:43–53`, `:422–425`; `useOffsetPagination.ts:31, 47–48, 76`.
**Falsifier (fired? no).** Dies if a global interceptor toasts fetch failures. There is none: `coreFetch` (`api.ts:180–182`) throws `ApiProblem`; `loadPage` is the sole catcher; `useToast` (`useToast.ts:21–29`) is call-site-driven only. Also dies if `error` were surfaced by the sibling consumer — `AdminAuditLog.vue:14–26` omits it identically, so the defect is a *family* posture, not a one-off slip.

---

### L-3 · MAJOR — the search races itself, because the abort registry is keyed so that it cannot fire

**Claim.** `api.ts:52–59` builds a per-key `AbortController` registry: `abortable(key)` aborts any in-flight request under `key`. Every `apiFetch` call site passes a **stable literal** key — `"listVisualizations"`, `"getMe"`, `"createSession"`, `"uploadImage"` — so a second call cancels the first, which is the whole point. `adminFetch` alone passes the **path**: `coreFetch<T>(path, /* abortKey */ path, …)` at `api.ts:250`. `listAdminUsers` (`api.ts:566–580`) builds that path with the query string baked in, so `?…&q=ad` and `?…&q=adm` are different keys and neither cancels the other.

**Consequence.** The 300 ms debounce at `:73–74` bounds the *rate* of requests, not their *ordering*. Type "adm", pause 300 ms, type "in": two requests fly; if the first resolves last, `items.value = res.data` (`useOffsetPagination.ts:45`) writes the "adm" result set under the "adm**in**" query, and `loading` was already flipped false by the first settle. The list shows results that do not match the box. Every subsequent single-user action then targets a row the admin believes matched his search.

**A second, smaller cost rides the same line.** `inflight` is never pruned on settle — `abortable` only ever `set`s (`api.ts:57`); the only deletion is the explicit `abortInflight` (`:61–66`), whose four call sites are all in `stores/workspace.ts` and name compute/contour keys. With stable literal keys the Map is bounded by call-site count. Keyed on the path, AdminUserList's search makes it unbounded in the admin's *input space* — one retained `AbortController` per distinct query string per session. Small, real, and homed upstream at `api.ts:52–59`; recorded here because this component is its only unbounded producer.

**Provenance.** `api.ts:250` vs `api.ts:215–225` + the ~20 stable-literal call sites; `api.ts:52–66`; `AdminUserList.vue:55–66, 72–75`; `useOffsetPagination.ts:44–46`.
**Falsifier (fired? no).** Dies if `listAdminUsers` passed a stable key (it does not — `adminFetch`'s signature has no key parameter at all), or if the debounce made the race unreachable (it cannot; 300 ms is far under a slow-3G admin round-trip), or if the composable serialised loads (it does not — `loadPage` has no in-flight guard, `loading` is a boolean not a token).

---

### L-4 · MAJOR — deleting the tail of the list strands the admin on a page that no longer exists

**Claim.** `performBatch` (`:173`), `handleSuspend` (`:184`), `handleUnsuspend` (`:195`) and `performDelete` (`:206`) all call `loadPage()` with **no argument**. `useOffsetPagination.ts:39` clamps only when an argument is supplied: `if (p != null) page.value = …`. So after a delete that shrinks `total` past a page boundary, `page` keeps its old value while `pageCount` shrinks under it. `offset` (`:34`) now exceeds `total`, the server returns `[]`, the nav renders `{{ page }} / {{ pageCount }}` as e.g. **"3 / 2"**, `hasNext` is false, and the list shows "No users found" (colliding with L-2's rendering of a genuine failure).

**The author's own counterexample.** `performPrune` — the one mutation whose blast radius is obviously page-space-wide — calls `loadPage(1)` at `:217`. The rule was known and applied at exactly one of four sites. That asymmetry is the finding, not an accident of style.

**Provenance.** `AdminUserList.vue:173, 184, 195, 206` vs `:217`; `useOffsetPagination.ts:33–39`.
**Falsifier (fired? no).** Dies if `loadPage()`'s no-arg path clamped, or if the server clamped `page` to `pages` and echoed it back — `admin.py` `list_users` accepts `page: int = Query(default=1, ge=1)` with **no upper bound**, computes `skip = (page - 1) * limit`, and returns the requested `page` verbatim in the envelope. It over-skips and returns an empty `items`. Confirmed reachable.

---

### L-5 · MAJOR — no teardown, under a mount pattern that guarantees teardown happens

**Claim.** `searchTimer` (`:41`) is set at `:74` and cleared only by the *next* keystroke (`:73`). The component imports `{ ref, computed, watch }` (`:2`) — there is no `onUnmounted`, no `onScopeDispose`, and no abort on unmount. `loadPage(1)` also fires at setup top level (`:69`), outside any lifecycle hook.

**Why this is live and not theoretical.** `GalleryView.vue:31` loads this component via `defineAsyncComponent`, and `GalleryView.vue:375` mounts it under `v-if="activeTab === 'users' && gallery.adminMode"` with **no `<KeepAlive>`**. Every tab switch destroys and recreates it. Typing in the search box and switching tabs inside 300 ms leaves a timer that fires `loadPage(1)` against a dead component: a network request the admin cannot see, writing into refs nothing renders. `gallery.adminMode` flipping false (`stores/gallery.ts:119`, `deactivateAdmin`) unmounts it the same way — and that path *also* clears the admin token, so the orphan request runs `auth.getAdminToken()!` on `null` and lands on L-12.

**Provenance.** `AdminUserList.vue:2, 41, 69, 72–75`; `GalleryView.vue:31, 375–377`; `stores/gallery.ts:117–120`.
**Falsifier (fired? no).** Dies if `<KeepAlive>` wrapped the tab panels (grep: no `KeepAlive`/`keep-alive` anywhere in `GalleryView.vue`), or if Vue auto-cancelled `setTimeout` (it does not — only `watch`/`computed` effects are scope-disposed; a raw timer handle is not), or if the composable aborted on scope dispose (`useOffsetPagination.ts` has no `onScopeDispose`).

---

### L-6 · MAJOR — benign aborts are shown to the admin as errors

**Claim.** Because `adminFetch` keys on the path (L-3), two calls to the *same* path do abort each other — most reachably a double-clicked "Prune empty" (`:270` → `askPrune` → `performPrune`, path `/api/admin/users/prune-empty`), or a mutation's `loadPage()` colliding with a debounced `loadPage(1)` on an identical query. The first request rejects with a `DOMException{name:"AbortError"}`, the catch at `:218` reads `e.message` — *"The user aborted a request."* or *"signal is aborted without reason"* — and toasts it **red**, as a failure of an operation that in fact succeeded or was superseded.

**The cure exists in this repo and was not applied.** `stores/gallery.ts:78, 99, 174, 185` all guard `if (!api.isAbortError(e)) toast(…)`. `stores/workspace.ts` guards at seven further sites. `EquationView.vue:122,143` and `EquationPanel.vue:53` guard too. `api.ts:69–71` exports `isAbortError` for exactly this. AdminUserList's five catch blocks (`:174, 185, 196, 207, 218`) do not import it and do not guard.

**Provenance.** `AdminUserList.vue:174–176, 185–187, 196–198, 207–209, 218–220`; `api.ts:69–71`; `stores/gallery.ts:78`.
**Falsifier (fired? no).** Dies if the admin paths were never abort-signalled — `coreFetch:161` assigns `options?.signal ?? abortable(abortKey)` and `adminFetch` passes no signal, so every admin call is registry-signalled. Dies if no two admin calls could share a path — `performPrune`'s path is a constant, and `loadPage()`'s path is a pure function of (page, sort, q), all of which are stable across a mutation-triggered reload.

---

### L-7 · MAJOR — Goldilocks: 529 lines carrying seven concerns, and a sibling that clones one of them

**Claim.** Script 232 lines, template 291. The concerns: (1) debounced search; (2) sort; (3) offset-pagination wiring; (4) multi-select set algebra; (5) five mutation handlers of one identical shape; (6) a three-variant confirm-dialog state machine; (7) `timeAgo`; plus the whole table markup. `lane-frontend.md:102` records 529 — **1.86× `AdminFlaggedPanel.vue` (285) and 2.78× `AdminAuditLog.vue` (190)**, its two nearest siblings by role.

**The seams are not speculative — one is already cut wrong.** `AdminAuditLog.vue:14–40` reproduces this file's `:43–69` almost token-for-token: the same ten-member destructure in the same order, the same `auth.getAdminToken()!`, the same `page: Math.floor(offset / limit) + 1` offset-inversion, the same bare `loadPage(1)` at setup, the same `v-if="loading"` spinner markup. Two more seams are clean extractions: `useAdminMultiSelect` (this file's `:125–156` **is** `GalleryView.vue:144–167`, retyped) and `useAdminAction(fn, successMsg)` (the five handlers at `:158–221` differ only in the api call and two strings).

**Provenance.** `AdminUserList.vue` whole; `AdminAuditLog.vue:14–40`; `GalleryView.vue:144–167`; `lane-frontend.md:102`.
**Falsifier (fired? no).** Dies if the file were cohesive-by-necessity — it is not; the three extractions above each have a second existing consumer today, which is the standard bar for pulling a seam. Dies if 529 were unremarkable for the tree — `lane-frontend.md`'s gallery table puts it at the top of its directory by a factor of ~1.9.

---

### L-8 · MAJOR — `timeAgo` ×5, in two dialects that disagree on screen

**Claim.** Five independent copies:

| Site | Bottom bucket | Null guard |
|---|---|---|
| `AdminUserList.vue:223` | *(none)* → `0m ago` | none |
| `AdminFlaggedPanel.vue:137` | *(none)* → `0m ago` | `iso: string \| null` |
| `GalleryCard.vue:53` | `m < 1 → "just now"` | none |
| `GalleryCardModal.vue:58` | `m < 1 → "just now"` | none |
| `GalleryDraftsSection.vue:28` | `m < 1 → "just now"` | none |

Dialect B (3 copies) has a "just now" bucket; dialect A (2 copies, this file among them) does not. `AdminFlaggedPanel` additionally hardened its signature to `string | null` — a fix that never propagated to the four peers. Since `GalleryView` renders `GalleryCard` and `AdminUserList` on the same route under the same admin session, a user active thirty seconds ago reads **"just now"** on his gallery tile and **"seen 0m ago"** in the admin list.

**Provenance.** The five line anchors above.
**Falsifier (fired? no).** Dies if the two shapes were deliberate per-surface phrasing — nothing in either file says so, the four non-null-guarded copies are byte-identical within their dialect (mechanical copy, not authored variation), and `AdminFlaggedPanel`'s divergence is a bug fix, which is the signature of drift rather than intent.

---

### L-9 · MAJOR — three hand-rolled confirm dialogs against a producer primitive with zero consumers

**Claim.** `@mkbabb/glass-ui@4.0.0` exports **80 subpaths**, among them `./confirm-dialog`. `grep -rn "confirm-dialog\|ConfirmDialog" web/src/` returns **nothing**. Meanwhile the repo hand-assembles the same `Dialog`+`DialogContent surface="opaque" class="max-w-sm"`+`Header`/`Title`/`Description`/`Footer`+ghost-Cancel/variant-Confirm structure three times:
- `AdminUserList.vue:459–523` (65 lines, 3 action variants)
- `GalleryView.vue:399–437` (39 lines, 3 action variants)
- `AdminFlaggedPanel.vue` (same `DialogFooter` idiom)

The `max-w-sm` sizing, the `surface="opaque"` prop, the "This shall permanently delete … The action is irrevocable." copy register, and the `:variant="… ? 'destructive' : 'default'"` computation are replicated by hand at each site.

Related, and already censused: `useOffsetPagination.ts:9–18` documents its own fork from glass-ui v0.9.3 after `./pagination` was retired (`lane-frontend.md:358`), and the template comment at `:428–429` names *"a canonical glass-ui `<Pagination>` primitive"* as an outstanding carry. The `./confirm-dialog` gap is the same shape but with the opposite sign: the primitive **exists and ships today**.

**Provenance.** `glass-ui/package.json#exports` (80 keys, incl. `./confirm-dialog`, `./data-table`, `./sortable-list`); `AdminUserList.vue:459–523`; `GalleryView.vue:399–437`; `AdminFlaggedPanel.vue`.
**Falsifier (fired? partially — recorded).** Dies if `./confirm-dialog`'s API could not express three action variants with per-action copy. I cannot prove that statically without reading the producer's component source, which is outside this challenge's read set — so **this row's remedy is a CANDIDATE, not a verdict**; the *duplication* (three hand-assemblies of one structure) stands on the tree alone and is what the MAJOR is for. Marked **UNPROVEN-NEEDS-LIVE (SS-13)** for the substitution question only.

---

### L-10 · MAJOR — irreversible operations with zero automated coverage

**Claim.** `web/package.json#scripts` = `dev · build · preview · test:e2e · test:e2e:ui`. There is **no vitest** (`devDependencies.vitest` absent) and no unit-test file anywhere under `web/`. The e2e suite is eight specs (`contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`); `grep -rn "users\|Prune\|Suspend" web/e2e/*.spec.ts` returns **zero hits**. The users tab, the prune-empty control, the suspend/unsuspend pair, the single delete and the batch delete are wholly unexercised. The single static gate is `vue-tsc` (`build: "vue-tsc -b && vite build"`), and there is **no linter of any kind** in the tree (`eslint`/`oxlint`/`biome` configs all absent at repo root and in `web/`).

This is the multiplier on L-1 and L-4: both are ordinary regression-test catches, and nothing in this repo could catch them.

**Provenance.** `web/package.json`; `web/e2e/` listing; `find . -name "*.test.ts" -not -path "./node_modules/*"` → empty; `web/tsconfig.json`.
**Falsifier (fired? no).** Dies if `api/tests/` covered the frontend contract — it covers the Python layer (`test_visualization_crud.py` etc.) and cannot observe a selection set living in a Vue ref.

---

### L-11 · MINOR — a dead error-reporting branch

`:169–171` iterates `result.errors` and toasts each. `BatchResponse.errors?: string[]` (`types.ts:191–195`) is optional; `grep -n '"errors"' api/routers/admin.py` returns **zero hits** — `batch_users` returns `_json({"ok": True, "affected": affected})` and `batch_visualizations` the same. The branch can never execute against this backend. **Falsifier:** dies if any admin endpoint emitted `errors` — none does; the field is contract-aspirational, and `api.ts:617–620` documents the `{ok, affected, errors?}` ratification without the server ever having implemented the third member.

### L-12 · MINOR — six non-null assertions, one of which reaches the UI as a developer string

`auth.getAdminToken()` returns `string | null` (`stores/auth.ts:96–98`). This file asserts it non-null six times (`:56, 159, 180, 191, 202, 213`). If it is null, `coreFetch` throws `new Error("coreFetch: auth='admin' requires adminToken")` (`api.ts:127–129`) — which `:219`'s `toast(e.message ?? …)` renders verbatim into the admin's notification stack. **The repo disagrees with itself:** `stores/gallery.ts:125` writes `const token = useAuthStore().getAdminToken(); if (!token) return;` on the identical call. **Falsifier:** dies if the token were unconditionally present whenever the component is mounted. `gallery.adminMode` is a plain non-persisted `ref(false)` (`gallery.ts:39`) while `adminToken` is localStorage-backed (`auth.ts:16`) — they are two independent state cells, and `auth.adminLogout` is publicly exported (`auth.ts:137`), so the token can be cleared without the mode following. Reachable, though narrowly.

### L-13 · MINOR — the status field is typed wider than its domain

`AdminUserInfo.status: string` (`types.ts:127`) while `setAdminUserStatus` takes `"active" | "suspended"` (`api.ts:585`) and the template branches on `user.status === 'suspended'` at `:375` and `:387`. A typo in either template comparison typechecks clean and silently renders every user as unsuspended. `admin.py`'s projection already guarantees the two-member domain (`{"$ifNull": ["$status", "active"]}`). **Falsifier:** dies if a third status existed — the server's only writers are `set_user_status` (`"active"|"suspended"` via `SetUserStatusRequest`) and `batch_users` (the same two literals). Two members, exactly.

### L-14 · MINOR — the confirm handler wipes a successor's pending action

`confirmPending` (`:111–119`) closes the dialog, awaits the mutation, and *then* sets `pending.value = null`. If the admin re-opens the dialog during that await (`askDelete` on another row — nothing blocks it; the list stays interactive, only `loading` gates the rows and the mutation handlers set no busy flag), the new `pending` is written and then destroyed by the first invocation's trailing null. The second confirm hits `if (!action) return` and does nothing, with no feedback. **Falsifier:** dies if the UI were blocked during the mutation — it is not; there is no per-row or global disable, and `loading` only flips inside `loadPage`, which runs *after* the api call resolves.

### L-15 · MINOR — three dead mechanisms and a comment that documents one of them into existence

- `:288` sets `:data-some="…"` on the select-all row. `grep -rn "data-some" web/src/` → this file only. **No CSS or JS consumes it.** `<style scoped>` (`:527–529`) contains a single `@reference "tailwindcss";` and no rules at all.
- `:363` sets `:data-selected` on each row. `grep -rn "data-selected" web/src/` → this file plus `GalleryCard.vue:76`, whose companion rule `GalleryCard.vue:221` (`.gallery-card[data-selected]`) is *scoped to GalleryCard*. This file's rows therefore carry a styling hook with **no rule behind it** — a selected row is visually identical to an unselected one except for the checkbox glyph.
- The comment at `:282–284` asserts *"the indeterminate visual state is carried by the `data-some` attribute on the row so the checkbox reflects partial selection in CSS."* No such CSS exists, and the attribute is on the *wrapper*, not "the row".
- `Checkbox` emits `boolean | "indeterminate"` (`Checkbox.vue.d.ts`, via reka-ui 2.9.10 `CheckboxRootProps`) but this file only ever *passes in* booleans (`:291`, `:366`), so the `"indeterminate"` case in `toggleSelected` (`:127–132`) and `toggleSelectAllOnPage` (`:142–150`) is unreachable, and the select-all box is never `mixed` — visually or via `aria-checked`.

**Falsifier:** dies if a global stylesheet carried `[data-some]`/`[data-selected]` — `web/src/style.css` is the tree's only CSS file (`find src -name "*.css"` → 1 result) and contains neither selector.

### L-16 · MINOR — two box-shadow families stacked on one element

`:308` applies `cartoon-card shadow-cartoon` together. `style.css:107–111` declares `@utility cartoon-card { @apply cartoon-surface; … }`, and `glass-ui/src/styles/cards.css:35` gives `cartoon-surface` `box-shadow: var(--shadow-cartoon-md)` (`-4px 3px 1px …` stack). `shadow-cartoon` is generated by Tailwind v4 from `--shadow-cartoon` in glass-ui's `@theme inline` (`bridges.css:287` → `3px 3px 0px 0px color-mix(…)`). Two `box-shadow` declarations, two *different* token families, same specificity class — the winner is emission-order, not authorial intent. This is the only site in the repo combining them: `grep -rn "shadow-cartoon" web/src/` yields this line plus three `var(--shadow-cartoon…)` reads inside `GalleryCard.vue`'s scoped block. **Falsifier:** dies if `shadow-cartoon` did not exist as a utility — it does (see §4 K-4, a hypothesis of mine that this evidence killed).

### L-17 · MINOR — untyped catches, discarded problem detail, and no linter to notice

Five `catch (e: any)` (`:174, 185, 196, 207, 218`) under `"strict": true` — `any` is the one hole `strict` does not close, and there is no ESLint in the tree to close it either. Each reads `e.message`, which for an `ApiProblem` is the constructor's `super(title)` (`api-problem.ts:27`) — so `detail` (the field RFC 7807 reserves for the human-actionable explanation), `type` (the URN the whole `is()` helper at `:50–52` exists to switch on), and `status` are all discarded. A 403 on a suspended-admin token and a 409 on a concurrent edit both surface as their bare `title`. **Falsifier:** dies if `ApiProblem` folded `detail` into `message` — `super(title)` at `:27`, unambiguous. Dies if a linter existed — `ls -a` at repo root and `web/` shows no eslint/oxlint/biome config.

### L-18 · MINOR — the response's own pagination is thrown away and then re-derived

`AdminUserListResponse` carries `{items, total, page, pages}` (`types.ts:130–135`); the server computes `pages = math.ceil(total / limit)` and echoes `page` (`admin.py` `list_users`). The `fetchFn` returns `{ data: result.items, total: result.total }` (`:63`), discarding both. `pageCount` is then recomputed client-side (`useOffsetPagination.ts:33`). Symmetrically, the fetchFn reconstructs the page number as `Math.floor(offset / limit) + 1` (`:58`) — inverting the `offset = (page - 1) * pageSize` the composable computed one line earlier (`useOffsetPagination.ts:34`) from the `page` ref it already owns and already handed the component at `:46`. The composable's `fetchFn(limit, offset)` signature is the sole cause. **Falsifier:** dies if server and client `pageCount` could ever disagree harmlessly — they agree today by construction, which is precisely why the round-trip is pure ceremony rather than a defect with teeth; MINOR, on the contract-shape count.

### L-19 · MINOR — every mutation blanks the list while a stale header survives

`:353` gates the entire list on `v-if="!loading"` and `:277` swaps in a full-panel spinner. Because every mutation handler calls `loadPage()`, suspending one user replaces the whole table with a spinner and loses scroll position. Meanwhile `:286`'s select-all row is gated on `v-if="users.length"` — `items` is not cleared during load (`useOffsetPagination.ts:45` assigns only on success), so during the blank the header keeps rendering `{{ selected.size }} selected` above nothing. **Falsifier:** dies if the reload were fast enough to be imperceptible — it is a full server round-trip including a `$lookup` aggregation over `visualizations` (`admin.py` `list_users`), not a local recompute.

### L-20 · MINOR — the composable's dead export surface

`useOffsetPagination` returns twelve members (`:68–82`). `error`, `reset` and `pageSize` have **zero** consumers: the only two call sites are `AdminUserList.vue:43–53` and `AdminAuditLog.vue:14–26`, and both destructure the same ten. Twenty-five percent of the public surface is unreachable. `:9–18` documents the module as a verbatim fork of glass-ui v0.9.3 — the dead members are fork residue, and `error`'s deadness is the mechanism of L-2. **Falsifier:** dies if a third consumer existed — `grep -rn "useOffsetPagination" web/src/` returns exactly the definition plus those two imports.

---

## §3 — The viz render path, and R5-7

### The render path: this component does not touch it, and that is a load-bearing negative

`CENSUS-2026-08-03.md` §3a records **"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces [FE §6]."** `AdminUserList.vue` contains no `<canvas>`, no `<svg>`, no `getContext`, no rAF, and no import reaching `components/visualization/lib/canvas-drawing/` (1 315 LOC per §2 C-5). Its heaviest render primitives are eight lucide glyphs.

Nor does it *contend* with the render path. `GalleryView.vue` gates the gallery grid on `v-if="activeTab === 'gallery'"` (`:242`) and this component on `v-if="activeTab === 'users' && gallery.adminMode"` (`:375`) — mutually exclusive. While the admin user list is mounted, the `GalleryCard` tiles are unmounted. So the sticky toolbar's `z-10` (`:308`) cannot stack against a canvas overlay, and the mutation-triggered full-list blanking of L-19 cannot evict a running rAF. **This is the whole of the L-axis render-path surface for this component: nil, by construction.** I state it rather than omit it because the alternative — silence — reads as an unexamined gap.

The one render-path *cost* it does carry is L-5's: `defineAsyncComponent` + `v-if` with no `KeepAlive` means a full remount and a full server round-trip on every tab return, and the teardown gap rides that churn.

### R5-7 — applies, with a refinement the intake row does not draw

`lane-fourier-r3-r6.md:125` adjudicated **R5-7 TRUE / ADOPT-AS-FACT / carry → F.W4**: *"template-loop evidence keyed to component callsites is blind to native HTML element loops,"* proven on `PaperSidebar.vue`'s three nested `<li v-for>` (leaf `instance.loop.paper-sidebar` = `[]`), and cured at R6 by the `NATIVE_TEMPLATE_LOOP` family (`:140`, R6-5/R6-6).

`AdminUserList.vue` has exactly one `v-for`, at `:359`, on a native `<div>` — same class. Two refinements the corpus row does not distinguish, both of which sharpen the F.W4 carry rather than contradict it:

1. **Partial visibility, not total.** `PaperSidebar`'s loops are *pure* native — nothing inside them registers, so the leaf is literally `[]`. This loop's **body** contains four component callsites (`Checkbox` `:365`, `Button` `:386`, `:397`, `:408`). A component-callsite-keyed deriver would therefore emit four populated leaf rows *under* a loop whose own expression (`user in users`) has no registered owner. That is worse than an empty leaf for a mutation-testing model: an empty leaf is visibly empty and invites suspicion; a populated-but-mis-parented leaf reads as covered. F.W4's per-component D/L/C audit needs to count native loops **and** re-parent the component callsites underneath them, or it will report this file as loop-covered.
2. **The cure family is named for the wrong thing.** R6-5's family is `NATIVE_TEMPLATE_LOOP`, motivated by `<li>`. This loop's element is `<div role="listitem">` inside `<div role="list">` (`:352–364`) — there is **no `<li>` in this file at all**. Any implementation that keys on list-semantic element names rather than "any native element bearing a `v-for` directive" re-inherits the blind spot on precisely the repo's largest admin surface. Cheap to check at F.W4; expensive to discover after.

---

## §4 — Killed hypotheses (L-18 runs both ways: what I could not sustain)

**K-1 — "`Checkbox` should import from a subpath like its three siblings."** `:4` imports `Checkbox` from the bare root while `Button`/`Dialog`/`Select` come from `./button`/`./dialog`/`./select` (`lane-frontend.md:332–335` records exactly this asymmetry). **Killed:** glass-ui@4.0.0's 80 export keys contain no `./checkbox` — `Checkbox` is reachable *only* through the root barrel. The component made the sole available choice. (Secondary hypothesis, that the root barrel bloats this lazy chunk: also killed — `GalleryCard.vue:5` imports `Checkbox` from the root and `GalleryCard` is eagerly imported by `GalleryView`, so the barrel is already in the main graph and the marginal cost is zero.) **Not a defect. This belongs in the producer's backlog, not the consumer's.**

**K-2 — "`<Select v-model="sortMode">` narrows `AcceptableValue` into a three-member union and breaks the typecheck."** `Select.vue.d.ts` emits `"update:modelValue": (value: AcceptableValue) => any` while `sortMode` is `Ref<"newest" | "last_seen" | "entries">` (`:40`). **Killed by measurement:** `npx vue-tsc --noEmit` over the whole app (`strict: true`, `verbatimModuleSyntax: true`) reports exactly **one** error tree-wide — `PaperView.vue(12,8): TS2882`, an unrelated `@mkbabb/latex-paper/theme` side-effect import. Zero errors in `AdminUserList.vue`.

**K-3 — "`timeAgo(user.last_seen_at)` renders `NaNm ago` on legacy user docs."** The Mongo projection `"last_seen_at": 1` (`admin.py` `list_users`) would omit an absent field, and `new Date(undefined).getTime()` is `NaN`. **Killed:** `api/models/admin.py:19` declares `last_seen_at: datetime` as **required**, so Pydantic would 500 server-side before the client saw anything, and `api/scripts/migrate_visualization.py:395` backfills it from `created_at`. The failure mode is a server error, not a client NaN. (L-22 retains only the claims that survive: no month/year bucket, no negative-diff guard, no reactivity.)

**K-4 — "`shadow-cartoon` at `:308` is a non-existent class (glass-ui ships only `-sm`/`-md`/`-lg`)."** `glass-ui/src/styles/utilities/components.css:275–292` does indeed declare only the three rungs. **Killed:** `bridges.css:287` declares `--shadow-cartoon` inside `@theme inline`, from which Tailwind v4 generates the bare `.shadow-cartoon` utility. The class exists; the defect is the *conflict* with `cartoon-card`'s own `box-shadow`, which is what L-16 now claims — a materially weaker charge than the one I set out to make.

---

## §5 — Superlatives (six; the axis runs both ways)

**S-1 — The batch payload is snapshotted at ask-time, not read at confirm-time.** `askBatch` (`:101–109`) writes `slugs: Array.from(selected.value)` into `pending`, and `confirmPending` (`:117`) passes `action.slugs`. The dialog's payload is therefore immune to any mutation of `selected` while it is open. This is the correct discipline for a destructive confirm, it is not the obvious implementation (reading `selected.value` at confirm-time is shorter), and `GalleryView.vue:167` uses the identical idiom — a deliberate shared invariant, not an accident. **Falsifier (did not fire):** a re-read of `selected` inside `confirmPending` or `performBatch` would kill it; neither touches it except `clearSelection()` after success (`:172`).

**S-2 — Type-clean under the strictest configuration the tree can express.** `tsconfig.json` sets `strict`, `verbatimModuleSyntax`, `isolatedModules`, `moduleResolution: "bundler"`, `noEmit`. A full `vue-tsc --noEmit` produces zero diagnostics for this file (see K-2), including the six `!` assertions, the discriminated `PendingAction` union (`:83–88`), and the narrowing at `:464/477/486/490/494` — the union is well-formed enough that the template's `pending.action` and `pending.slugs` accesses narrow correctly inside each `v-else-if`. **Measured, not asserted.**

**S-3 — Native `confirm()` is fully extirpated, and the replacement's severity is derived rather than hardcoded.** `:80–82` records the intent; `:502–506` computes the confirm button's variant from the action (`pending.action !== 'delete' ? 'default' : 'destructive'`) instead of stamping `destructive` on every path. Six of the seven dialog states carry bespoke irreversibility copy naming the exact consequence ("and all their gallery entries", "their active sessions shall be revoked"). The one gap — the batch branch not enumerating slugs — is charged at L-1; the surrounding discipline is above the tree's median.

**S-4 — `performPrune` alone resets to page 1, and it is the one place where that is correct.** `:217`. Prune is the only mutation whose blast radius is the whole page space, and it is the only one that resets. This is simultaneously the strongest evidence *for* L-4 (the author knew the rule) and a genuinely correct local decision that a mechanical "always `loadPage()`" refactor would have destroyed.

**S-5 — Set updates are copy-on-write, consistently.** `:128–131`, `:143–149`, `:153` all build `const next = new Set(selected.value)` and reassign. Vue 3.5's `ref(new Set())` does track in-place mutation via the collection proxy, so this is not *required* — it is the explicit, refactor-proof idiom (survives a later `shallowRef` or a `readonly` wrapper), applied without exception at all three mutation sites. The computeds at `:134–140` read `selected.value.has(...)` and are correspondingly correct.

**S-6 — Every destructive control is individually addressable.** All eight lucide glyphs carry `aria-hidden="true"`; every icon-only button carries a slug-interpolated label — `` :aria-label="`Suspend user ${user.user_slug}`" `` (`:391`), `Unsuspend` (`:402`), `Delete` (`:412`), plus `aria-label` on the search input (`:247`), the sort trigger (`:254`), the prune button (`:268`), both checkboxes (`:292`, `:367`), the batch toolbar (`:307`), the clear button (`:344`), and both pager buttons (`:440`, `:451`). The `role="toolbar"` (`:306`) and `aria-live="polite"` pager readout (`:445`) are present. For a surface with **zero test coverage** (L-10), this is also the ready-made selector vocabulary an e2e spec would need — the remediation for L-10 is cheaper here than it would be almost anywhere else in the tree.

---

## §6 — What I would put first

1. **L-1** — one line (`watch([searchQuery, sortMode], clearSelection)`, or move the clear into the `fetchFn`) stands between the current tree and an irreversible cascade the admin cannot see coming. Nothing else on this list is in that category.
2. **L-2** + **L-6** — the error posture is inverted in both directions at once: the one failure that must speak is silent, and benign cancellations shout.
3. **L-3** — the abort registry is present, correct, and defeated by a single argument at `api.ts:250`. Cross-repo fix, one line, and it retires the unbounded-Map growth with it.
4. **L-10** — everything above is ordinary regression-test material, and there is no harness. S-6 means the harness is unusually cheap to build here.
5. **L-7 / L-8 / L-9** — the three duplications (`useAdminMultiSelect`, `timeAgo`, confirm-dialog) each already have a second consumer today, which is the bar for cutting the seam.

**Carries out of this challenge:** the R5-7 refinement at §3 → **F.W4** (count native-element loops by *directive*, not element name; re-parent component callsites under them). The `./confirm-dialog` zero-consumer gap and the `./pagination` retirement → the standing glass-ui BH-inbox relay.
