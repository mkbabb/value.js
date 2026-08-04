claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `AdminUserList.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminUserList.vue` (529 lines)
**Axis** CONSUMPTION — value.js 0.13 / keyframes 4.3 / glass-ui ^4.0.0 / the 45-operation fourier API surface; props-emits contract; integration seams.
**Posture** Component assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its falsifier.
**Method** Static + source-derived only. No browser. Read whole: the component, all 8 direct imports, the glass-ui 4.0.0 installed manifest + `.d.ts` surface, the value.js 0.13.0 manifest, the backing `api/routers/admin.py` + `api/models/admin.py`, the mount site, and the sibling admin panels. One executed probe: `npx vue-tsc --noEmit` (read-only).
**Scoreboard** 4 BLOCKER · 7 MAJOR · 9 MINOR = **20 defects**; 4 INFO; **5 superlatives**.

---

## §0 · What this component actually consumes

| Producer | Declared | Consumed **by this file** | Evidence |
|---|---|---|---|
| `@mkbabb/glass-ui` | `^4.0.0` (installed 4.0.0) | `Button` (`/button`), `Dialog*` ×6 (`/dialog`), `Select*` ×5 (`/select`), `Checkbox` (**root barrel**) | `AdminUserList.vue:3–19` |
| `@mkbabb/glass-ui/toast` | — | transitively via `@/composables/useToast` | `useToast.ts:1–5` |
| `@mkbabb/value.js` | `^0.13.0` (installed 0.13.0) | **ZERO** | `grep '@mkbabb/value.js' src/` → 5 hits, none in this file |
| `@mkbabb/keyframes.js` | `^4.3.0` (installed 4.3.0) | **ZERO** | `grep '@mkbabb/keyframes' src/` → 2 hits, neither in this file |
| fourier API | 45 operations / 13 admin (intake **X-3**) | 5 leaves: `listAdminUsers`, `setAdminUserStatus` ×2, `deleteAdminUser`, `pruneEmptyUsers`, `batchUsers` | `api.ts:566–645` |
| local | — | `useOffsetPagination` (forked from glass-ui 0.9.3), `useAuthStore`, `useToast` | `AdminUserList.vue:20–24` |

**Props/emits contract: there is none.** No `defineProps`, no `defineEmits`, no `defineExpose` anywhere in `AdminUserList.vue:1–232`. The mount is a bare `<AdminUserList />` (`GalleryView.vue:376`) behind `v-if="activeTab === 'users' && gallery.adminMode"` (`GalleryView.vue:375`). Every input reaches the component through a Pinia singleton (`useAuthStore()`) or a module-level side-channel (`api.setSessionToken` mutates a module `let` at `api.ts:42`). This is the root of **C-B2** and it colours the whole axis: the component has no seam that a caller or a test can hold.

---

## §1 · BLOCKERS

### C-B1 · BLOCKER — a search or sort change does **not** clear the batch selection, so the destructive batch fires against slugs the admin cannot see

`AdminUserList.vue:156`
```ts
watch(page, () => clearSelection());
```
That is the **only** selection-invalidation edge. But the search and sort watchers do not go through `page`:

- `AdminUserList.vue:72–75` — `watch(searchQuery, …)` → `setTimeout(() => loadPage(1), 300)`
- `AdminUserList.vue:78` — `watch(sortMode, () => loadPage(1))`

and `loadPage(1)` (`useOffsetPagination.ts:39`) assigns
```ts
page.value = Math.max(1, Math.min(p, pageCount.value || 1));
```
which with `p = 1` and `pageCount ≥ 1` (clamped by `Math.max(1, …)` at `useOffsetPagination.ts:33`) is **always exactly `1`**. Vue's `ref` setter is `Object.is`-guarded, so writing `1` into a ref already holding `1` does not trigger the watcher. **On page 1 — the default and by far the most common view — the selection survives a full result-set replacement.**

The failure: check 20 users on page 1 → type into the search box → 300 ms later a completely different 20 users render → `selected` still holds the *original* 20 slugs → the floating toolbar (`AdminUserList.vue:304–312`) reads "20 user(s) selected" → click Delete → `askBatch('delete')` snapshots `Array.from(selected.value)` (`AdminUserList.vue:106`) → the dialog title reads `Delete 20 user(s)?` (`:468`) and the body reads *"This shall permanently delete the selected users and all their gallery entries. The action is irrevocable."* (`:486–489`) — **it never enumerates a single slug** → confirm → `batchUsers` cascade-deletes 20 users, their visualizations, their flags and their sessions (`admin.py:460–474`).

No visual cross-check exists to catch it, because **C-m2** kills the only one: the row's `:data-selected` (`:363`) styles nothing, and the per-row checkboxes for the retained off-view slugs are all *unchecked* — so the toolbar says 20 and the screen shows 0, with no way to learn which 20.

**Falsifier (attempted, survives):** if `page` changed on a search-triggered `loadPage(1)` the watcher would fire — it does not, per the `Object.is` guard and the `Math.min(1, …)` clamp above. If the search watcher called `clearSelection()` — it does not (`:72–75`, four lines, no such call). If the batch dialog enumerated slugs — it does not (`:486–489`). If the mount were transient across searches — it is not; `activeTab`/`adminMode` are unchanged by typing. If page ≠ 1 the watcher *does* fire and the defect vanishes — this is a page-1-only defect, which is the default view.

---

### C-B2 · BLOCKER — the product's only cascade-delete surface has zero automated coverage in either direction, and its zero-prop/zero-emit self-wiring makes it un-harnessable

`web/package.json:6–12` declares exactly four scripts: `dev`, `build`, `preview`, `test:e2e` (+ `test:e2e:ui`). **There is no `vitest`, no `@vue/test-utils`, no `test` script** in either `dependencies` or `devDependencies` (`web/package.json:14–43`). The only automated surface is Playwright, and:

```
$ grep -rn "admin" /Users/mkbabb/Programming/fourier-analysis/web/e2e/
(empty)
```

Eight e2e specs (`e2e/gallery.spec.ts`, `visualization-crud.spec.ts`, …) — **zero admin references**. The Python side (`api/tests/`) covers `test_visualization_soft_delete.py`, `test_visualization_crud.py`, `test_janitor_audit.py` etc., but nothing exercises `POST /api/admin/users/batch` end-to-end against this client.

What is uncovered: `delete_user` cascade-deletes `flags` + `visualizations` + `sessions` + the user row (`admin.py:344–370`); `batch_users` does the same for **up to 50 slugs per call** (`api/models/admin.py:47` `max_length=50`), un-transactionally, in a Python `for` loop with no rollback (`admin.py:460–474`). This is the most destructive operation in the product and nothing tests it.

The self-wiring is why it stays uncovered: with no props and no emits, a test cannot mount `AdminUserList` without standing up a Pinia instance, a `localStorage` shim, a fetch double, and the module-level `sessionToken` in `api.ts:42`. Compare `GalleryDraftsSection` (`GalleryView.vue:365–371`), which takes `:drafts` / `:publishing` props and emits `@publish` / `@open` — a mountable, assertable seam. This component's 529 lines are behind an untestable façade by construction.

**Falsifier (attempted, survives):** if a vitest config existed elsewhere — `find` over `web/` shows only `playwright.config.ts`, and `package.json` has no vitest dep. If Playwright covered admin behind a fixture without the literal string "admin" — the grep is case-insensitively empty for the token, and the admin surface is unreachable without an admin token that no spec supplies. If manual QA suffices — it does not for a 50-slug un-transactional cascade whose partial failures are silent (**C-M4**).

---

### C-B3 · BLOCKER — every list-fetch failure renders as "No users found"; the composable's `error` is produced and never consumed

`useOffsetPagination.ts:31,47–49` produces the error and returns it (`:75`):
```ts
const error = ref<string | null>(null);
…
} catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load";
}
```
`AdminUserList.vue:43–54` destructures **nine** members and pointedly not that one:
```ts
const { items: users, total, page, pageCount, loading, hasNext, hasPrev, loadPage, nextPage, prevPage } = useOffsetPagination<AdminUserInfo>({…});
```
`grep -n "error" AdminUserList.vue` → **zero hits.** The template's only terminal state is the empty state at `:422–425`:
```html
<div v-if="!users.length" …><Users …/><p class="text-sm">No users found</p></div>
```

So every one of these renders as *"No users found"*, indistinguishable from a genuinely empty user table:
- a **stale/rotated admin token** in `localStorage` → 401 `ApiProblem` (`api.ts:182`);
- the raw `throw new Error("coreFetch: auth='admin' requires adminToken")` when `getAdminToken()` is null (`api.ts:127–129`, reached via **C-M6**);
- any 5xx — including the guaranteed-500 of **C-B4**;
- a network drop;
- a `res.json()` parse failure (`api.ts:191–200`).

This is not the repo's convention. Its sibling list loader toasts the error: `gallery.ts:98–99` — `catch (e: any) { if (!api.isAbortError(e)) toast(e.message ?? "Failed to load gallery", "error"); }`. And this very component toasts on all **five** mutation paths (`:175, 186, 197, 208, 219`). The read path is the sole silent one, on the sole surface where "there are no users" is a security-relevant assertion.

**Falsifier (attempted, survives):** if `loadPage` rethrew, the caller could catch — it does not; `useOffsetPagination.ts:47–51` swallows into `error` and the `finally` clears `loading`, so `loadPage(1)` at `AdminUserList.vue:69` resolves successfully on failure. If the spinner persisted as a signal — it does not; `loading` is cleared in `finally` (`:50`). If a global fetch-error interceptor existed — there is none; `coreFetch` is the only path and it throws to the caller.

---

### C-B4 · BLOCKER — one user document missing `last_seen_at` or `created_at` 500s the entire admin user list, and the client renders that 500 as an empty database (compounding C-B3) or as `NaNm ago`

Backend. `api/models/admin.py:16–21`:
```python
class AdminUserInfo(BaseModel):
    user_slug: str
    created_at: datetime        # REQUIRED — no default
    last_seen_at: datetime      # REQUIRED — no default
    entry_count: int = 0        # defaulted
    status: str = "active"      # defaulted
```
The aggregation projects with inclusion flags (`admin.py:274–282`): `"created_at": 1, "last_seen_at": 1` — MongoDB **omits an absent field** rather than emitting null. `admin.py:307` then constructs `AdminUserListResponse(items=items, …)`, validating `list[AdminUserInfo]` **inside the handler**. A missing required datetime raises `pydantic.ValidationError` → an unhandled exception in the route → **500 for the whole page**, not a per-row skip. The author defaulted the two soft fields and left the two hard ones undefended.

Such documents are reachable and are not cleaned up:
- `api/tests/test_visualization_soft_delete.py:61` and `api/tests/test_visualization_crud.py:64` insert `{"_id": "alpha-beta-gamma-delta"}` — no `created_at`, no `last_seen_at`;
- `api/scripts/migrate_visualization.py:395` back-fills `"last_seen_at": doc["created_at"]`, which is direct evidence that pre-migration user docs lacked the field;
- `api/services/database.py:81` creates an index on `last_seen_at` but indexes do not enforce presence, and there is no schema validator;
- `api/services/janitor.py:204` reaps via `find({"last_seen_at": {"$lt": user_cutoff}})` — a query that **skips** docs lacking the field, so malformed rows accumulate permanently rather than aging out.

Client twin, same assumption, no defence. `types.ts:122–128` declares both as required `string`; `AdminUserList.vue:381–382` calls `timeAgo(user.created_at)` / `timeAgo(user.last_seen_at)`; `timeAgo` (`:223–231`) does `Date.now() - new Date(iso).getTime()` → `new Date(undefined).getTime()` is `NaN` → `Math.floor(NaN/60000)` is `NaN` → the row renders **`seen NaNm ago`**. Neither side validates; each assumes the other did.

Compound: the 500 arrives at `loadPage`'s `catch` (`useOffsetPagination.ts:47`), is written to the unread `error` (**C-B3**), and the admin sees *"No users found."* A single malformed document takes down user management for every admin, and the UI reports it as an empty database.

**Falsifier (attempted, survives):** if `AdminUserInfo` had defaults on those fields it would degrade per-row — it does not (`api/models/admin.py:18–19`, contrast `:20–21`). If FastAPI turned this into a 422 — no; the model is constructed in the handler body, not bound as a request/response model, so it is an unhandled `ValidationError` → 500. If a `$ifNull` guarded the projection — only `status` is guarded (`admin.py:279`), the two datetimes are not. If no such documents exist in production — unprovable either way from the tree (**UNPROVEN-NEEDS-LIVE** for the *incidence*), but the *reachability* is proven by the three insert/migrate sites above and the janitor's blind spot; the defect is the absent defence, not the row count.

---

## §2 · MAJOR

### C-M1 · MAJOR — `adminFetch` keys the abort registry on the **full path including the query string**, so the debounced search never cancels itself and the last request to *resolve* wins

The registry is correct (`api.ts:52–59`): `abortable(key)` aborts the prior controller registered under `key`. Every `apiFetch` call site passes a **stable literal**:
```ts
api.ts:409  return apiFetch<VisualizationListResponse>(`/api/visualizations${query ? `?${query}` : ""}`, "listVisualizations");
```
— path varies, key constant. Correct: a new list request cancels the old one.

`adminFetch` does the opposite (`api.ts:250`):
```ts
return coreFetch<T>(path, /* abortKey */ path, { …, auth: "admin", adminToken });
```
and `listAdminUsers` builds `path` **with the query string** (`api.ts:571–579`): `/api/admin/users?page=1&limit=20&sort=newest&q=ab`. Two searches with different `q` (or different `page`, or different `sort`) are two **different keys**, so `abortable` never aborts either. They race, `loadPage` assigns unconditionally (`useOffsetPagination.ts:45–46`), and **whichever resolves last paints** — not whichever was sent last.

Concretely: type `a` → 300 ms debounce fires request A → type `b` → 300 ms fires request B → A is slow (cold aggregation with `$lookup` over `visualizations`, `admin.py:266–302`) and resolves after B → the list shows results for `a` while the input reads `ab`. The admin then selects rows from a result set that does not match the query — which is precisely the input condition for **C-B1**.

The explicit `/* abortKey */` comment shows the parameter was considered and the wrong value chosen. This is an R6-8-class defect in the opposite direction: intake row **R6-8** establishes that fourier's operation record embeds a derived client back-reference so a client-side edit mutates the operation leaf; here the client's *cancellation identity* is derived from the operation's *path*, so per-operation cancellation is silently degraded to per-URL cancellation for all 13 admin operations. Both are the same root error — **deriving one leaf's identity from the other's shape.**

**Falsifier (attempted, survives):** if the 300 ms debounce serialised requests — it does not; it only rate-limits *starts*, and nothing awaits the prior in-flight. If `loading` gated re-entry — it does not; `loadPage` has no in-flight guard (`useOffsetPagination.ts:38–52`), and see **C-m4**. If only this component were affected — the key defect is in `adminFetch` and touches all 13 admin operations, but this component is the only admin surface with a debounced free-text search, so it is the one that materially exhibits it.

### C-M2 · MAJOR — `deleteAdminUser`'s declared return type disagrees with the backend on **both** field names

```ts
api.ts:594–603
export async function deleteAdminUser(token, slug): Promise<{ deleted: boolean; entries_deleted: number }>
```
```python
admin.py:370
return _json({"ok": True, "deleted_entries": viz_result.deleted_count})
```
`deleted` vs `ok`; `entries_deleted` vs `deleted_entries` — a transposition. Neither declared key is ever emitted. The consumer discards the result (`AdminUserList.vue:204` — `await api.deleteAdminUser(token, slug);`), so the lie is latent today: `result.entries_deleted` would be `undefined` at runtime while type-checking clean. This is the exact hazard **R6-8** names — a client-side declaration of an operation's response shape that nothing re-derives from the operation.

**Falsifier (attempted, survives):** if a middleware renamed the keys — `_json` (`admin.py:90`) is a bare `Response(json.dumps(body))`, no key transform. If the type were merely aspirational — it is `Promise<{…}>`, load-bearing for every future consumer, and `vue-tsc` confirms nothing catches the drift (§4).

### C-M3 · MAJOR — `setAdminUserStatus`'s declared return type invents a `slug` field the backend never sends

```ts
api.ts:582–592  Promise<{ slug: string; status: string }>
```
```python
admin.py:333    return _json({"ok": True, "status": body.status})
```
`slug` is absent from the wire; `ok` is absent from the declaration. Same class as C-M2, same latency (consumer discards at `AdminUserList.vue:182,193`), same R6-8 lesson. Two of the three singular admin-user wrappers are wrong; the third (`pruneEmptyUsers`, `api.ts:605–613` → `{pruned}`) matches `admin.py:403` `{"ok": True, "pruned": …}` on the field the client reads. **Read together with S4:** the batch family was repaired under A.W5.c with a dated comment naming the wrong shape, the right shape and the ratifying document (`api.ts:617–624`) — and the two singular wrappers sitting 20 lines above were left broken in the same pass.

### C-M4 · MAJOR — `BatchResponse.errors` is never populated by the backend, so the error-surfacing branch is dead and partial batch failure is silent

`AdminUserList.vue:168–171`:
```ts
toast(`${verb} ${result.affected} user(s)`, "success");
if (result.errors?.length) { for (const err of result.errors) toast(err, "error"); }
```
`batch_users` returns exactly `{"ok": True, "affected": affected}` (`admin.py:501`) — no `errors` key on any of the three branches. `batch_visualizations` likewise (`admin.py:448`). `BatchResponse.errors?: string[]` is optional (`types.ts:191–195`), so the branch type-checks and never runs.

The consequence is not merely dead code. `affected` counts **actual** effects — `delete_one().deleted_count` summed (`admin.py:472–473`), `update_many().modified_count` (`:481, :491`) — and the component never compares `result.affected` against `slugs.length`. Select 20, delete, 19 slugs already gone (stale page — see **C-B1**): the admin gets a green **"Deleted 1 user(s)"** and no error. Worse for `unsuspend`: `modified_count` excludes already-active rows, so unsuspending 20 users of whom 19 were already active reports "Unsuspended 1 user(s)" — a success toast that reads like a failure. There is no `matched_count` vs `modified_count` distinction anywhere.

The dead loop is duplicated verbatim at the sibling call site `GalleryView.vue:189–191` for `batchGallery` — so the idiom is systemic (2 of 2 batch consumers), which is evidence it was written against a contract document rather than against the router.

**Falsifier (attempted, survives):** if `errors` were populated on some path — all three branches of `batch_users` (`admin.py:460–493`) reach the single `return` at `:501`; there is no other return. If `ok: false` signalled failure — the component never reads `ok` (`grep "result.ok" AdminUserList.vue` → 0), and the backend hardcodes `True`.

### C-M5 · MAJOR — post-mutation `loadPage()` never re-clamps `page`, stranding the admin on an out-of-range page

All five mutation handlers refresh with a bare `loadPage()` (`AdminUserList.vue:173, 187, 198, 208` — and `:220` uses `loadPage(1)`). With `p == null`, `useOffsetPagination.ts:39` skips the clamp entirely:
```ts
if (p != null) page.value = Math.max(1, Math.min(p, pageCount.value || 1));
```
`total` then shrinks (`:46`), `pageCount` recomputes downward (`:33`), and **`page` is never revisited** — there is no `watch(total, …)` clamp in the composable. Delete the only user on page 3 of 3: `total` 41 → 40, `pageCount` 3 → 2, `page` stays 3, `offset` = 40, the fetch returns `items: []`, and the admin sees "No users found" under a pager reading **"3 / 2"** with `hasNext` false and `hasPrev` true. Recovery requires clicking Previous.

Note the interaction with **C-B3**: the same blank screen means "load failed" and "you are off the end of the list" and "there are no users", with nothing distinguishing them.

**Falsifier (attempted, survives):** if `loadPage()` re-clamped on the null path — it does not, per the `if (p != null)` guard. If `pageCount` were floored at the current page — `Math.max(1, Math.ceil(total/pageSize))` floors at 1, not at `page`. If the mutation handlers passed a page — four of five pass nothing.

### C-M6 · MAJOR — six `getAdminToken()!` assertions; this file holds 6 of the tree's 11, and the null path leaks a raw developer string into a user-facing toast

`auth.ts:96–98` returns `string | null`. This component asserts it away six times: `AdminUserList.vue:56, 159, 180, 191, 202, 213`. When the assertion is wrong, `adminFetch` passes `null` into `coreFetch`, which throws (`api.ts:127–129`):
```ts
throw new Error("coreFetch: auth='admin' requires adminToken");
```
That message reaches the user two ways: in the four mutation handlers via `catch (e: any) { toast(e.message ?? …, "error") }` (`:175, 186, 197, 208, 219`), rendering **`coreFetch: auth='admin' requires adminToken`** in a toast titled "Error" (`useToast.ts:17`); and in the list path, silently, via **C-B3**.

Whole-tree census of `getAdminToken` (11 call sites):

| Posture | Sites |
|---|---|
| `if (!token) return` / early-out | `gallery.ts:124, 139, 151` |
| `if (!token) { toast("Admin token missing", "error"); return; }` | `GalleryView.vue:173–177` |
| `!` assertion | `AdminUserList.vue:56,159,180,191,202,213` (**6**), `AdminFlaggedPanel.vue:37,88,102,117` (4), `AdminAuditLog.vue:28` (1) |

`GalleryView.vue:173–177` is the correct guard on the **identical batch flow** (`batchGallery`, same shape, same file family) — so the right posture exists in this repo, in this feature, on the sibling of this exact call. The token can be stale rather than absent, too: `auth.adminToken` is persisted to `localStorage` (`auth.ts:88`) while `gallery.adminMode` — the sole mount gate (`GalleryView.vue:375`) — is a non-persisted `ref(false)` (`gallery.ts:39`). Two sources of truth for one authorisation, and this component reads the one it does not check.

**Falsifier (attempted, survives):** if the mount gate guaranteed a token — `activateAdmin` sets both (`gallery.ts:105–111`), but a *rotated or server-revoked* token stays non-null in `localStorage`, so `!` passes and the 401 lands in the unread `error`. If TypeScript caught it — `!` is precisely the escape hatch that suppresses the check; `vue-tsc` is green (§4).

### C-M7 · MAJOR — glass-ui-first violation: `@mkbabb/glass-ui/confirm-dialog` ships an exact-fit `ConfirmDialog` at the pinned version; this file hand-rolls 65 lines of raw `Dialog`

Installed glass-ui **4.0.0** exports `./confirm-dialog` (verified in `node_modules/@mkbabb/glass-ui/package.json` exports map, and in the `typesVersions` block). Its surface (`dist/components/custom/confirm-dialog/ConfirmDialog.vue.d.ts`):
```ts
props:  { title: string; description?: string; confirmLabel: string; destructive?: boolean; loading?: boolean }
model:  "open"?: boolean
emits:  "update:open": (value: boolean) => any;  confirm: () => any
slots:  default, action
```
The hand-rolled block (`AdminUserList.vue:459–523`) is a 1:1 re-implementation of that contract: `v-model:open="dialogOpen"` ≡ the model; a `<template v-if>` ladder computing the title (`:463–475`) ≡ `title`; a second ladder computing the description (`:476–497`) ≡ `description`; a `:variant` ternary picking `destructive` vs `default` (`:502–506`) ≡ `destructive`; a third ladder computing the button text (`:509–519`) ≡ `confirmLabel`; `@click="confirmPending"` ≡ `@confirm`.

Two costs beyond the 65 lines. First, `ConfirmDialog` has a **`loading` prop** and the hand-rolled version has no in-flight state at all — `confirmPending` (`:111–119`) sets `dialogOpen = false` and *then* awaits, so between that assignment and Vue's async DOM patch the confirm button is still live and a double-click double-fires the batch. Second, the three parallel `v-if` ladders are three places to forget a `kind`: the description ladder (`:476–497`) has five branches with **no `v-else`**, so an unhandled `pending.kind` renders a titled destructive dialog with an **empty description body**.

This is a direct hit on the standing glass-ui-first precept (memory: `feedback_glass_ui_first_class` — "add variants/primitives there, not in demo/ui/"; "reuse existing component-type names"). The census (`formation/fourier/lane-frontend.md §4`) flags `GlassTimeline` and `EasingPicker` as hard shadows; **`confirm-dialog` is a third, un-booked, and unlike `EasingPicker` it is available at the *pinned* version — no upgrade required.** `lane-frontend.md:462` lists `./confirm-dialog` in the export-subpath dump without connecting it to a consumer. Contradiction booked explicitly: the census's shadow table is incomplete on this row.

**Falsifier (attempted, survives):** if the local dialog needed richer content than `ConfirmDialog` allows — it needs `title` + `description` + `confirmLabel` + `destructive`, all four of which are props, and `ConfirmDialog` additionally exposes `default` and `action` slots for anything else. If `./confirm-dialog` were 7.0.0-only — the installed 4.0.0 manifest lists it, and `dist/confirm-dialog.js` exists on disk. If the ladders encoded logic a prop cannot — they compute three strings from `pending`, which a `computed` feeds to three props.

---

## §3 · MINOR

**C-m1 · MINOR — the documented indeterminate mechanism does not exist.** `AdminUserList.vue:282–284` states: *"The indeterminate visual state is carried by the `data-some` attribute on the row so the checkbox reflects partial selection in CSS."* The attribute is emitted (`:288`). `grep -rn "data-some" web/src/` returns **exactly two hits — the comment and the emission.** No CSS anywhere consumes it, and this file's `<style scoped>` (`:527–529`) contains only `@reference "tailwindcss";` — zero rules. Meanwhile glass-ui's `Checkbox` takes reka-ui `CheckboxRootProps`, whose `update:modelValue` is typed `(value: boolean | "indeterminate")` (`dist/components/ui/checkbox/Checkbox.vue.d.ts:10`) — the component's own handler signature acknowledges this (`:127`, `:142`) — yet `:model-value="allOnPageSelected"` passes a bare boolean (`:291`). The primitive supports the state natively; the component invented a CSS mechanism instead, then did not write the CSS. Partial page selection therefore renders as fully-unchecked. *Falsifier:* a global stylesheet could define it — `src/style.css` is the only CSS file in `web/src` and does not mention `data-some`.

**C-m2 · MINOR — `:data-selected` on the row styles nothing.** `AdminUserList.vue:363`. The only `[data-selected]` rule in the tree is `.gallery-card[data-selected]` (`GalleryCard.vue:221`), inside a *different component's scoped block*, keyed to a class this row does not carry (this row is `.cartoon-card`, `:362`). Selected rows have no visual affordance at all — the sole feedback is the checkbox glyph. This is the missing cross-check that would have made **C-B1** visible.

**C-m3 · MINOR — `Checkbox` imported from the root barrel while its three siblings use subpaths.** `AdminUserList.vue:4` vs `:3, :12, :19`. glass-ui 4.0.0 exposes **79** subpaths and no `./checkbox` — verified against the exports map. So this is a **producer gap, not a consumer error**, and the same forced-barrel appears at `GalleryCard.vue:5`, `UserSlugBar.vue:5`, `useMorphConfig.ts:9`, `CollapsibleSection.vue:2`, `router/index.ts:2` (census `lane-frontend.md:333, 337, 349, 351`). Runtime cost is bounded — `"sideEffects": ["*.css"]` (glass-ui manifest) lets Rollup tree-shake the barrel — but the type-graph cost is real: the root `index.d.ts` is 51 `export *` lines pulling every UI family into every consumer's check. **Relay upstream: add `./checkbox` to the glass-ui exports map** (BH/BI relay law, memory: `feedback-glassui-bhbi-relay`).

**C-m4 · MINOR — `loading` is a boolean, not a counter.** `useOffsetPagination.ts:30, 41, 50`. Two concurrent `loadPage` calls (routine under **C-M1**) both set it true; the first to settle clears it in `finally` while the second is still in flight, so `v-if="!loading"` (`:353`) re-mounts the list over stale items mid-request.

**C-m5 · MINOR — the list unmounts wholesale on every refetch while the batch toolbar stays mounted.** `AdminUserList.vue:353` (`v-if="!loading"`) versus `:305` (`v-if="selected.size > 0"`) and `:286` (`v-if="users.length"`, which stays because `users` still holds the previous page). During any page change, search, sort or post-mutation refresh, the admin sees a floating *"N user(s) selected"* toolbar and a select-all row hovering over an empty region, then a full remount that discards scroll position.

**C-m6 · MINOR — `searchTimer` is never cleared on unmount.** `AdminUserList.vue:41, 73–74`; no `onUnmounted` anywhere in the file. The component is `defineAsyncComponent`-loaded behind a `v-if` (`GalleryView.vue:31, 375`), so it genuinely unmounts on tab switch or on `deactivateAdmin()`. A raw `setTimeout` is not bound to Vue's effect scope, so a pending timer fires `loadPage(1)` after unmount — issuing a network request from a dead component, and, if the unmount was `deactivateAdmin()` (which clears the token, `gallery.ts:118`), fetching with `getAdminToken()!` = `null` straight into **C-M6**.

**C-m7 · MINOR — the server's own `page`/`pages` are discarded and re-derived, and the fetch round-trips `page → offset → page`.** `AdminUserListResponse` carries `page` and `pages` (`types.ts:130–135`, `admin.py:305–307`); the `fetchFn` returns only `{ data, total }` (`AdminUserList.vue:63`) and `pageCount` is recomputed client-side (`useOffsetPagination.ts:33`). They agree only because `pageSize: 20` (`:65`) happens to match the router's `limit` default *and* its `le=100` ceiling admits 20 (`admin.py:242`). Separately, `:58` reconstructs `page: Math.floor(offset / limit) + 1` from `(limit, offset)` — inverting `offset = (page - 1) * pageSize` (`useOffsetPagination.ts:34`) to recover a value the composable already holds in `page.value`. Two sources of truth for pagination, one of them derived twice.

**C-m8 · MINOR — a third colour arm.** The file hardcodes raw Tailwind palette literals: `border-amber-500/30 bg-amber-500/10 text-amber-300` (`:267`), `bg-red-500/20 … text-red-400` (`:376`), `hover:text-amber-400 hover:bg-amber-500/10` (`:390`), `hover:text-green-400 hover:bg-green-500/10` (`:401`), `hover:text-red-400 hover:bg-red-500/10` (`:411`). The repo already runs two colour systems: `lib/colors.ts` (`--viz-*` resolved through hand-rolled `hslToHex`/`rgbToHex`, `colors.ts:22–74`) and glass-ui's semantic tokens (`destructive`, `muted-foreground` — which this same file uses at `:240, :379, :390`). These literals are a third, unthemed arm that bypasses both. The repo has already paid for exactly this class of hardcoding once: `style.css:113–125` books a light-mode `--viz-amber` darken as an **axe contrast carry** because the shipped value measured ≈3.54:1. `text-amber-300` on `bg-amber-500/10` is the same untested territory, and it is un-audited here (contrast **UNPROVEN-NEEDS-LIVE**, SS-13). Fold: this is the component-level instance of the census's "hand-rolled colors.ts arms".

**C-m9 · MINOR — `timeAgo` is unbounded above and unguarded below.** `AdminUserList.vue:223–231`: no seconds tier (anything under 60 s renders `0m ago`), no week/month/year tier (a two-year-old account renders `730d ago`), and no clamp on negative diffs, so any clock skew between server and client renders `-1m ago`. Consumed at `:381–382` for both `created_at` and `last_seen_at`. Compare **C-B4**: the same two lines render `NaNm ago` on a missing field.

---

## §4 · INFO

**C-i1 · INFO — value.js and keyframes consumption is ZERO here, and that is correct.** `grep '@mkbabb/value.js' web/src/` yields five sites (`ConvergencePlot.vue:5`, `equation/lib/harmonics.ts:5`, `useCurveTransition.ts:8`, `lib/easings.ts:9,16`), all importing `easeInOutSine` / `timingFunctions` — an easing-only consumption arm. `@mkbabb/keyframes.js` yields two (`useFourierMorph.ts:14` live, `stores/animation.ts:47` a comment). Neither reaches an admin table, and nothing in this component wants colour math, parsing, or interpolation. **The F.W2 migration surface does not touch this file** — recorded so the migration census does not over-scope it. On the "bare specifiers" note: value.js 0.13.0's exports map is a single `"."` root (`{types, import, default}` → `./dist/value.js`) with **no subpaths at all**, so the bare specifier is producer-imposed, not a consumer choice — contrast glass-ui's 79. If subpath-level consumption is a megatranche goal, the work is on the value.js side.

**C-i2 · INFO — the sort seam is type-unchecked end to end.** `v-model="sortMode"` (`:251`) binds `Ref<"newest" | "last_seen" | "entries">` (`:40`) to a component whose `update:modelValue` emits reka-ui's `AcceptableValue` (`dist/components/ui/select/Select.vue.d.ts:8`) = `string | number | boolean | Record<string, any> | null`. `vue-tsc` accepts it (§5), so the narrow type is decorative: a typo'd `<SelectItem value="oldest">` would compile, ship, and land in `admin.py:258`'s `sort_map.get(sort, {"created_at": -1})` — a **silent fallback to newest** with no client or server signal. Three unvalidated hops (ref → `qs.set("sort", …)` at `api.ts:573` → `Query(default="newest")` untyped `str` at `admin.py:243`) for a value that is a closed three-member set on both ends.

**C-i3 · INFO / UNPROVEN-NEEDS-LIVE — `<SelectValue />` carries no `placeholder`** (`:256`). Whether the closed trigger renders the item label ("Last seen") or the raw model value (`last_seen`) before `SelectContent` has ever mounted depends on reka-ui's item-registration timing. Static analysis cannot settle it. Flag for SS-13.

**C-i4 · INFO — runtime imports resolved from `devDependencies`.** `lucide-vue-next` (`AdminUserList.vue:25–34`) and `reka-ui` sit in `web/package.json:26–42` devDependencies while being reached by shipped source. Harmless for a Vite-bundled SPA built from a full install; fatal under `npm ci --omit=dev`.

---

## §5 · Probe executed

```
$ cd web && npx vue-tsc --noEmit -p tsconfig.json
src/components/paper/PaperView.vue(12,8): error TS2882: Cannot find module or type
  declarations for side-effect import of '@mkbabb/latex-paper/theme'.
```
One error, tree-wide, unrelated to this component. **Every defect above is invisible to the type gate** — C-M2/C-M3 are declared-vs-actual wire drift that no schema check re-derives; C-M6 is `!` by construction; C-i2 passes on an `any`-shaped seam; C-B1/C-M1/C-M5 are runtime ordering. This is the strongest single fact about the component: the gates are green and the surface is broken, which is exactly the evidence standard intake row **R3-3** ratifies (*"a registry audit that re-hashes bytes but never re-derives products proves the bytes unchanged, not the summary true"*).

---

## §6 · Superlatives (L-18 runs both ways)

**S1 — `useOffsetPagination.ts:9–18` is the best fork-provenance record in the fourier tree.** It names the source version (`glass-ui v0.9.3`), the source path (`src/composables/pagination/useOffsetPagination.ts`), the retirement event (`the upstream subpath @mkbabb/glass-ui/pagination was retired`), the *reason* (`zero production consumers across the constellation`), the clause authorizing the copy (`MIGRATION.md §3.1`), and then **pre-refutes the obvious reviewer objection** with the precise technical reason — *"vueuse's `useOffsetPagination` is intentionally NOT a 1:1 swap — it is a passive page-state primitive (external `total` ref, no fetch loader). The admin call sites in this repo are active-loader-shaped."* Every fork should carry this. *Falsifier attempted:* the claim is checkable and checks out — vueuse's `useOffsetPagination` is indeed passive; the version lineage is 0.9.3 → 1.0 → the installed 4.0.0, three majors of drift honestly disclosed rather than hidden. The header is exemplary even though the code under it carries **C-M5** and **C-B3**.

**S2 — the destructive-action state machine (`:83–119`) is right.** One discriminated union `PendingAction` over three shapes, three `ask*` entry points, **one** `pending` ref, **one** `dialogOpen`, **one** `confirmPending` dispatcher, **one** `<Dialog>` instance. The comment at `:80–82` states the design intent (*"supplants native `confirm()`"*; *"`batch` actions ride the same dialog as the singular destructive flow"*). Most admin panels ship three dialogs and three booleans; this ships one of each and never has an inconsistent state. Note the honesty of the grade: the *shape* is excellent and the *primitive* is wrong (**C-M7**) — glass-ui's `ConfirmDialog` is the same design, already built.

**S3 — the ARIA surface is complete for a hand-rolled table, with no icon-only button left unlabelled.** Per-row `:aria-label` interpolating the actual slug on all four row controls (`:367, 391, 402, 412` — e.g. `` `Suspend user ${user.user_slug}` ``); `role="toolbar"` + `aria-label` on the batch bar (`:306–307`); `role="list"` / `role="listitem"` (`:355, 361`); `aria-live="polite"` on **both** the spinner (`:277`) and the page counter (`:445`); `sr-only` loading text (`:279`); `aria-hidden="true"` on all eleven decorative icons (`:241, 319, 328, 337, 347, 395, 406, 416, 423, 443, 453`); labelled search input (`:247`) and sort trigger (`:254`). *Falsifier attempted:* I looked for the usual misses — an unlabelled icon button, a live region on the wrong element, a `role="list"` with non-`listitem` children — and found none. (Live contrast on the amber/red literals of **C-m8** is a separate, unproven axis.)

**S4 — `api.ts:617–624` is a model contract-repair record**, and it is what makes C-M2/C-M3 provable. It names the defect (`the wrappers previously declared a {processed} shape`), the disagreement (`that disagreed with the backend's {ok, affected, errors?}`), the backend evidence *with line numbers* (`api/routers/admin.py:362-451`), the ratifying authority (`the CRUD CONTRACT ratifies BatchResponse`), and the follow-on migration (`B.W4 — the batch endpoint moved onto the converged entity`). A reviewer can verify every clause without leaving the file. The finding it enables is the indictment: the same author, in the same pass, repaired the batch family and left the two singular wrappers twenty lines above declaring shapes the router never emits.

**S5 — `auth.ts:73–82` single-flights registration correctly**, on this component's token path. `_ensurePromise` coalesces concurrent `ensureUser()` callers onto one in-flight `register()` and clears the latch in `.finally` so a *rejected* attempt does not poison the next one. This is the pattern **C-M1** needed and did not get, in the same dependency graph — the repo demonstrably knows how to do request coalescing.

---

## §7 · Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:102` — AdminUserList "529 · Admin user table + role dialogs" | **Contradicted on substance.** There are no *role* dialogs. The dialogs are destructive-confirm only (delete / prune / batch, `AdminUserList.vue:83–87`); the status axis is `active`\|`suspended` (`api.ts:585`, `api/models/admin.py:32`), which is suspension, not role. Line count 529 confirmed. |
| `lane-frontend.md:332–335` — the four glass-ui import lines | **Confirmed exactly**, and extended: the root-barrel `Checkbox` is a *producer* gap (no `./checkbox` among 79 subpaths), not a consumer error → **C-m3**, relay upstream. |
| `lane-frontend.md §4` shadow table (`GlassTimeline`, `EasingPicker`, `DarkModeToggle`) | **Extended, and the table declared incomplete.** `ConfirmDialog` is a fourth shadow (**C-M7**) and the only one already available at the *pinned* 4.0.0 — no upgrade required to discharge it. `lane-frontend.md:462` lists `./confirm-dialog` in the subpath dump without joining it to a consumer. |
| `lane-frontend.md:358` — "`@mkbabb/glass-ui/pagination` retired at v1.0" | Confirmed; no `./pagination` in the 4.0.0 exports map, so the `AdminUserList.vue:428–429` carry ("a canonical glass-ui `<Pagination>` primitive is the named carry") is **live and correctly booked**. The nearest 4.0.0 relative is `./data-table`. |
| Intake **R6-8** (ADOPT-AS-FACT + CARRY → F.W5) — *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* | **Three live instances, from the opposite direction.** **C-M2** and **C-M3** are client declarations of operation response shapes that nothing re-derives (both wrong, both latent). **C-M1** derives the client's *cancellation identity* from the operation's *path*, degrading per-operation abort to per-URL abort across all 13 admin operations. Same root error: one leaf's identity derived from the other's shape. |
| Intake **X-3** (CONFLICT-RESOLVED) — "45 total / 30 public-non-admin / **13 admin**"; *"The security gate (R3-7b) is 0 of 45, so the admin arm is inside the defect"* | Re-derived live: `grep -c` over `api/routers/admin.py` → **13** decorators, matching. This component consumes **5** of those 13 (`api.ts:566–645`). |
| Intake **R3-7b** — `securityGate: RED_0_OF_45` | Corroborated at the consumer: not one of the five operations this component calls declares OpenAPI security, and the client compensates with `Bearer` assembled by hand at `api.ts:126–131`, guarded only by the six `!` of **C-M6**. |
| Intake **R3-7c** — 36 client edges / 9 gaps | Not contradicted. All 5 operations this component needs have client wrappers, so this file contributes 0 to the gap count — but 2 of its 5 wrappers (**C-M2**, **C-M3**) declare wrong response shapes, so *edge existence* is not *edge correctness*: the 36 is an upper bound on a weaker property than it appears to measure. |
| `lane-crud.md:380` — "Pagination \| opaque cursors … \| offset/limit + `total`" | Confirmed at this consumer: the admin arm is offset/limit + `total` (`admin.py:239–307`), while the public visualization arm is cursor-based (`types.ts:377–381`). Two pagination regimes, and this component's forked composable serves only the offset one. |
| `formation/fourier/` (all four lanes) on the admin **user** batch contract | **Silent.** `grep 'batchUsers\|BatchResponse\|affected\|deleted_entries'` over the formation corpus and the intake lane → **zero hits**. C-M2 / C-M3 / C-M4 / C-B4 are net-new to the corpus. |

---

## §8 · Verdict

**DEFECTIVE on the consumption axis.** The glass-ui consumption is *shape*-correct and *primitive*-wrong: four subpath imports, one producer-forced barrel, and a 65-line hand-roll of a primitive the pinned version already ships with a `loading` prop that would have closed the double-fire window (C-M7). The value.js / keyframes consumption is zero and correctly zero (C-i1) — the F.W2 migration surface does not reach this file, and value.js 0.13.0's single-root exports map means "bare specifier" is a producer property, not a consumer choice. The **API consumption is the failure**: two of five wrappers declare response shapes the router never emits (C-M2, C-M3), a third's error channel is dead so partial cascade-deletes report success (C-M4), the shared `adminFetch` derives its abort key from the query-bearing path so the debounced search races itself (C-M1), and a required-but-unenforced backend field can 500 the whole surface (C-B4). The **props/emits contract is absent**, which is not a stylistic complaint: it is why a surface that cascade-deletes up to 50 users per call has zero automated tests (C-B2). And two independent state-invalidation misses — selection not cleared on search (C-B1), page not re-clamped after delete (C-M5) — meet an unread error channel (C-B3) at the same blank screen, so *"the load failed"*, *"you are past the last page"* and *"there are no users"* are one indistinguishable render.

The type gate is green (§5). Every defect above passed it.

**Highest-leverage discharges, in order:** (1) `clearSelection()` in the search and sort watchers — one line each, kills C-B1; (2) destructure and render `error` — kills C-B3 and unmasks C-B4/C-M5/C-M6; (3) pass a stable literal `abortKey` to `adminFetch` — one argument, kills C-M1 for all 13 admin operations; (4) re-derive the three admin-user wrapper return types from `admin.py` and compare `affected` to `slugs.length` — kills C-M2/C-M3/C-M4; (5) swap in `@mkbabb/glass-ui/confirm-dialog` — deletes 65 lines and closes the double-fire.
