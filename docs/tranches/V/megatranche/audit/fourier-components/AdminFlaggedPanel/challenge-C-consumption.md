claude-opus-5[1m] (served model id)

# CHALLENGE C — CONSUMPTION · `AdminFlaggedPanel.vue` (285 lines)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminFlaggedPanel.vue`
**Axis.** How this component consumes value.js `0.13.0` · keyframes.js `4.3.0` · glass-ui `^4.0.0` (installed 4.0.0) ·
the fourier API's 45-operation surface; props/emits contract; integration seams.
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity ·
file:line provenance · its own falsifier. Superlatives carry the same burden (L-18 runs both ways).
**Method.** Static + source-derived only. No browser tooling. Read whole: the component and every module it
imports (`stores/auth.ts` 143 · `composables/useToast.ts` 38 · `lib/api.ts` 672 · `lib/types.ts` 391 ·
`lib/api-problem.ts` 61), plus the four API operations it calls at their Python definitions, the two sibling
admin panels, the parent `GalleryView.vue`, `stores/gallery.ts`, the installed glass-ui 4.0.0 `.d.ts` surface,
and the glass-ui producer `CHANGELOG.md` / `MIGRATION.md`. Livable-only claims are marked
**UNPROVEN-NEEDS-LIVE (SS-13)**.

**Consumption inventory (measured).**

| dependency | sites in this file | evidence |
|---|---:|---|
| `@mkbabb/value.js` | **0** | no import; the repo's whole value.js surface is 5 sites (lane-frontend §5) — none here |
| `@mkbabb/keyframes.js` | **0** | no import; the only motion is `animate-spin` (tw-animate-css) at :152, :256 |
| `@mkbabb/glass-ui` | **7 symbols / 2 subpaths** | `Button` :3 · `Dialog`+5 parts :4-11; zero root-barrel imports |
| fourier API | **4 of 45 operations** | `listFlaggedVisualizations` :38 · `adminDeleteVisualization` :92 · `dismissVisualizationFlags` :104 · `setVisualizationTier` :119 |
| `lucide-vue-next` | 5 icons :16 | inside the 35-site `@lucide/vue` rename (lane-frontend §5) |
| props / emits | **0 / 0** | no `defineProps`, no `defineEmits` anywhere in the file |

**Tally — 20 defects · 2 BLOCKER · 10 MAJOR · 7 MINOR · 1 INFO · 4 superlatives.**

---

## §0 — THE HEADLINE

The two worst findings are not *in* the component; they are in what it consumes. This panel is a
**moderation queue whose queue has no producer, offering three remedies none of which can remove the
reported artifact.** Both are consumption-axis facts, both are exhaustively derived from the tree, and
both are invisible from inside the file — which is exactly why the CONSUMPTION axis is where they surface.

Everything else — and there is a lot of it — is ordinary client-quality debt: a race, a dead-cache seam,
an error channel thrown away, and a design-system primitive re-hand-rolled 15 metres from where it ships.

---

## §1 — DEFECTS

### D-1 · BLOCKER · The flagged stream has no producer anywhere in the product

`GET /api/admin/flagged` (`api/routers/admin.py:509-585`) builds its result by aggregating `db.flags`
(`:530-548`) and joining to live visualizations (`:553-560`). **Nothing in the product writes to `db.flags`.**

Exhaustive search of the fourier tree:

- `grep -rn "flags.insert\|flags.replace\|flags.update"` → **4 hits, all non-production**: `api/tests/test_janitor_audit.py:167,306`, `api/tests/conformance/test_admin.py:122,124`, plus a historical `$rename` in `docs/tranches/D/waves/W3.md:61`.
- Every production `db.flags` reference is a **reader or a deleter**: `admin.py:219, 358, 469, 530, 607` — four `delete_many`, one `aggregate`. Zero inserts.
- `api/models/admin.py:57-59` defines `class FlagRequest(BaseModel){reason, detail}` — and `grep -rn "FlagRequest" api/` returns **only that definition**. No router imports it.
- The 45-operation surface (re-derived live: `grep -rn "^@.*\.\(get\|post\|put\|patch\|delete\)(" api/` → **45**, matching intake `R3-7` / `R4-8` / §0 exactly) contains **no flag-creation operation**. `visualizations.py` 13 ops enumerated at :164, :244, :287, :350, :400, :430, :488, :669, :675, :686, :733, :799, :860 — no `/flag`.
- Client side: `grep -rn "flag" web/src` outside this file's own icon/type names → **zero**. No component posts a flag.

⇒ `flaggedEntries` (:30) is populated from a collection with no writer. In production this component renders
`"No flagged content"` (:232-235) in perpetuity, and its other three consumed operations (:92, :104, :119) —
all keyed off a listed row — are unreachable *through this component*.

This is the concrete instance of intake **R3-7c** ("36 client edges, **nine gap operations**") and **R4-8**
("**2 clients without an operation**") — here inverted: an operation family with a client and no producer.
Contradiction note: lane-crud.md:336-339 books `POST /:slug/flag` on the **value.js** side and states
"Neither has the other's" — the tree agrees; fourier has the *admin* half of flagging and not the *user* half.

**Falsifier.** Any production write into `db.flags`: a route, a janitor arm, a script, a seed, a migration
that creates rather than renames. I searched all four and found only `migrate_flags_field.py` (renames
`snapshot_hash`→`content_hash` on **existing** docs, `:104`) and test fixtures. Produce one insert outside
`api/tests/` and this row falls.

---

### D-2 · BLOCKER · No action this panel offers can take the reported artifact offline

The panel's three remedies are Dismiss (:104), Set-tier (:119) and Delete (:92). Trace what each does to the
*reported content* — the uploaded image, which is what a `copyright` / `inappropriate` flag is about:

1. **Delete → soft-delete.** `adminDeleteVisualization(token, slug)` (`lib/api.ts:522-532`) omits the third
   parameter, so `hard` defaults `false` and the request is `DELETE /api/admin/visualizations/{slug}` with no
   `?hard=true`. Server: `admin.py:193-231` — "Default is a soft-delete (`deleted_at` write, restorable within
   grace)". The visualization row survives.
2. **Even the hard arm** (`admin.py:215-222`, unreachable from any UI — see D-5) cascades `db.flags` and deletes
   the *visualization* doc. It never touches `db.images` or the blob on disk.
3. **The blob is served unauthenticated.** `api/routers/images.py:132-147` — `@router.get("/{imageSlug}/blob")`,
   no `Depends`, no visibility check, `Cache-Control: public, max-age=86400`. `images.py` carries 7 operations
   (`:93, :117, :126, :132, :149, :168, :212`) and **zero `DELETE`** — there is no image-removal operation in
   the 45-op surface at all.
4. **The janitor cannot reap it while it is being fetched.** `services/janitor.py:166-168` prunes
   `{"pinned": False, "last_accessed_at": {"$lt": cutoff}}` with `cutoff = now − asset_max_age_days`
   (`:115`; default **30 days**, `api/config.py:29`). But `api/dependencies.py:50-76` ends
   `get_image_asset` with `await touch_document("images", …)` (`:75`) — **every anonymous blob GET bumps
   `last_accessed_at`.** The retention predicate is a recency predicate: content that is actively being
   requested is precisely the content the janitor will never prune.

⇒ After a moderator clicks Delete and reads "Entry deleted" (:93), a previously-disclosed
`/api/images/{image_slug}/blob` URL keeps returning the reported bytes, publicly and cached, for as long as
anyone keeps requesting it. And the panel prints **that very handle** as the row's title (:175) and inside the
confirmation copy (:270) — see D-3.

**Scope discipline (not overclaimed):** soft-delete *does* remove the visualization from the gallery listing
(`admin.py` soft-delete + `not_deleted_filter`), so the item stops being *browsable*. The claim is narrower and
exact: **no operation reachable from this panel removes the stored artifact, and no such operation exists.**

**Falsifier.** An image-delete/quarantine route; an auth or visibility gate on `/blob`; a janitor arm keyed on
something other than `last_accessed_at`; or a `touch_document` that skips the blob path. All four checked —
none holds.

---

### D-3 · MAJOR · The row identity is the asset FK, not the entity identity — and forks collide by construction

The file's own header states the law (:18-20): *"The single user-facing identity is the visualization `slug`."*
Then every human-readable surface renders `item.image_slug ?? item.slug`:

- row title :175 · save label :202 · dismiss label :212 · delete label :222 · `askDelete(…, item.image_slug ?? item.slug)` :224 → the confirm dialog's `{{ pendingDelete?.label }}` :270.

Only `:key` (:164) and the four API calls use `item.slug`. `image_slug` is an **asset FK**, declared as such in
the contract twin (`lib/types.ts:212` — `image_slug: string; // image asset FK — kept`) against
`content_hash` "dedup key, never identity (§1)" (:211).

Collision is guaranteed, not hypothetical: `VisualizationRemix` (`lib/types.ts:354-365`) declares **no**
`image_slug`, and `POST /{slug}/remix` (`api/routers/visualizations.py:488`) inherits absent atoms from the
source HEAD — so every fork shares its parent's `image_slug`. Two flagged forks of one image render as two
identical rows, with two identical aria-labels, and a delete confirmation that names the shared image rather
than the entity being destroyed.

**Falsifier.** Show `image_slug` unique per visualization (remix would have to mint a new one), or show the
confirm copy naming `slug`. Neither holds.

---

### D-4 · MAJOR · "Mark acceptable (save)" never dequeues — and the comment claims it does

`handleSetTier(item.slug, 'saved')` (:204 → :116-125) issues `PUT /api/admin/visualizations/{slug}/tier`
(`lib/api.ts:506-516`). The server (`admin.py:160-190`) sets `tier` and nothing else — no flag mutation.
The flagged listing's only predicates are `not_deleted_filter()` (`admin.py:522-524`) and
`content_hash ∈ flagged.keys()` (`:553`). **There is no tier predicate.** After the `await reload()` (:121)
the row returns byte-identical except for the tier text at :181.

The in-file comment (:112-115) asserts the opposite: *"A reviewer who deems flagged content acceptable may
'save' it (clearing the flag pressure while keeping it live)."* The flag pressure is not cleared; `flag_count`
(:177) is unchanged. Of the three remedies, only Dismiss (`delete_many` at `admin.py:607`) and Delete actually
drain the queue — the one **non-destructive** triage action is a no-op with respect to the queue it sits in.

**Falsifier.** A `tier` exclusion in `list_flagged`, or a flag cascade in `set_tier`. Read both whole
(`admin.py:160-190`, `:509-585`) — neither exists.

---

### D-5 · MAJOR · The delete dialog asserts irrevocability over a restorable operation; the §7 grace-bypass has zero callers

Copy at :269-271: *"This shall permanently delete the flagged entry … The action is irrevocable."*
Both halves are false against the operation actually invoked:

- The call omits `hard` (`lib/api.ts:522-526`, `hard = false`), so the server soft-deletes (`admin.py:193-231`).
- `POST /api/visualizations/{slug}/restore` (`visualizations.py:430`; client `lib/api.ts:452-460`) undoes it
  inside `soft_delete_grace_days` = **30** (`api/config.py:44`).
- Soft-delete does **not** cascade `db.flags` — only the hard arm does (`admin.py:215-219`). A restored
  visualization therefore returns to the flagged queue carrying its original flags.
- `?hard=true`, the §7 grace-bypass documented for exactly this case ("the admin grace-bypass for illegal
  content", `lib/api.ts:519-521`), has **zero callers repo-wide**: `grep -rn "adminDeleteVisualization" web/src`
  → `stores/gallery.ts:154` and this file's :92; neither passes the third argument. A live, documented,
  purpose-built API leaf with no client edge — another concrete instance of intake **R3-7c**.

**Falsifier.** A caller passing `hard`, or a server default of `hard=True`. `admin.py:196` is
`hard: bool = Query(default=False)`.

---

### D-6 · MAJOR · Bypasses the store actions it duplicates, so the gallery's cache goes stale

`confirmDelete` (:84-99) and `handleSetTier` (:116-125) are near-verbatim copies of
`useGalleryStore.deleteEntry` (`stores/gallery.ts:150-160`) and `setTier` (`:138-148`) — same endpoints, same
toast strings ("Entry deleted", `Tier set to ${tier}`) — with **one deletion**: the store's
`await resetAndFetch()` (`gallery.ts:143, 155`).

Both stores are live simultaneously: `GalleryView.vue` holds the gallery store and renders the tabs as sibling
`v-if` templates (`:242, :375, :380, :385`). `resetAndFetch` fires only at mount (`:83-90`), on the search
debounce (`:95-97`), on the sort/filter watch (`:111-113`), and at `:193`. The `activeTab` watcher
(`:205`) clears selection and nothing else — **switching tabs never refetches.** So after moderating from the
Flagged tab, `gallery.entries` still contains the deleted row and the pre-change tier until an unrelated
refetch or a page reload.

**Falsifier.** A refetch on tab change, or a shared invalidation channel. `GalleryView.vue:205` is the only
`activeTab` watcher and it calls `clearGallerySelection()` only.

---

### D-7 · MAJOR · Abort-blind error path: `isAbortError` is used 0 of 4 times here and 4 times in the store

`adminFetch` keys its AbortController on the **path** (`lib/api.ts:250` — `coreFetch<T>(path, /* abortKey */ path, …)`),
and `abortable` (`:54-59`) aborts any in-flight request under the same key. Both `reload()` calls resolve to the
same key (`/api/admin/flagged?limit=20`, from `:38-41` with `cursor: undefined`).

Two moderation clicks in quick succession — each handler awaits its mutation then `await reload()` (:94, :106,
:121) — put two reloads in flight; the second aborts the first; the first's `await` rejects with a
`DOMException` whose `.message` the catch at :51-52 pipes verbatim into an **error toast**
("signal is aborted without reason"). `api.isAbortError` exists for precisely this (`lib/api.ts:69-71`) and
`stores/gallery.ts` guards with it at **four** sites (`:78, :99, :174, :185`). This file guards at **zero** of four
(:51, :66, :95, :107, :122 — five catches, no guard).

Secondary: `loading` (:33) is a plain boolean shared by concurrent reloads, so the loser's `finally` (:53-55)
clears the spinner while the winner is still in flight.

**Falsifier.** A unique abort key per call (there is none — `adminFetch` hard-codes `path`), or `AbortError`
being swallowed upstream (`coreFetch` does not catch it).

---

### D-8 · MAJOR · `reload()` and `loadMore()` cannot cancel each other and share no generation guard

Their abort keys differ by construction — `?limit=20` versus `?limit=20&cursor=…` (`lib/api.ts:543-549`
appends `cursor` to the query, and the query *is* the key) — so they never abort each other, and there is no
epoch/generation token anywhere in the file.

Interleaving: user clicks "Load more" (:252), then dismisses a row before it lands. `reload()` replaces the
array (:48). The in-flight `loadMore` then resolves and executes `flaggedEntries.value.push(...result.items)`
(:63) — a page computed against the **pre-mutation** cursor — and clobbers `nextCursor`/`hasMore` (:64-65) with
stale values. Because a row was removed between the two reads, the cursor window shifts and a slug can appear
on both sides of the boundary, producing duplicate `:key="item.slug"` (:164) → Vue duplicate-key warning and
undefined patch behaviour. The `loadingMore` guard (:59) does not help: it gates *entry*, not *completion*.

**Falsifier.** A shared abort key, a request-generation check before the `push`, or a server guarantee of
stable cursors under deletion. `api/lib/crud/cursors.paginate` is keyed on the sort field, not a snapshot —
none of the three holds.

---

### D-9 · MAJOR · Every mutation resets the accumulated stream to page 1

`reload()` assigns rather than merges (`:48` — `flaggedEntries.value = result.items`) and every mutation awaits
it (:94, :106, :121). A moderator who has pressed "Load more" four times (80 rows) and then dismisses one flag
is returned to the first 20 rows, losing scroll position and the other 60 rows of context. The panel's own
accumulate-forever model (:63, and the comment at :28-29) makes this maximally costly: the deeper you work, the
more each action destroys.

**Falsifier.** An in-place row removal (`splice` on success, as `gallery.ts:170-171` does for `softDelete`) or a
re-fetch of the accumulated window. Neither exists here.

---

### D-10 · MAJOR · A failed load is indistinguishable from an empty queue

`reload()`'s catch (:51-52) toasts and leaves `flaggedEntries` untouched; there is no `error` ref and no retry
affordance. The template's empty state lives **inside** the `v-else` (:232-235), so the very next frame renders
`"No flagged content"`. On a moderation surface, a transport failure reads as *"nothing to moderate."* The only
retry control is the load-more `<nav>`, which is `v-if="hasMore"` (:242) — `false` after a failed first load.

**Falsifier.** An error state, a retry button, or a distinct empty-vs-error branch. The template has none;
`hasMore` initialises `false` (:32).

---

### D-11 · MAJOR · The RFC 7807 typed error surface is built, then discarded at all five catch sites

`lib/api-problem.ts` exists to give consumers `type` (the `urn:contract:*` closed catalog), `status`, `detail`,
extension members, and `is(typeUrn)`. `coreFetch` throws it on every non-2xx (`lib/api.ts:180-183`). The server
populates `detail` richly — `errors.not_found(detail=f"no live visualization {slug!r}")` (`admin.py:177`,
`:212`, `:604`), against `ProblemDetails` (`api/lib/crud/errors.py:18-27`).

All five catches here are `catch (e: any) { toast(e.message ?? "…", "error") }` (:51, :66, :95, :107, :122).
`ApiProblem`'s constructor is `super(title)` (`api-problem.ts`), so `.message` is **only the title** —
"Resource not found" — never the `detail` that names *which* entry, never the `type` that would let the panel
distinguish a 404 (stale row: re-reload) from a 403 (token expired: re-auth) from a 429. And `e: any` discards
the type layer entirely, in a file that otherwise type-imports its contract twins (:15).

Honesty note: this is a **repo-wide pattern** (`stores/gallery.ts:77, 98, 112, 145, 157, 173, 184, 232, 260`
do the same), so the durable fix is at the seam, not in this file. Severity stays MAJOR because this file is
where an admin's only failure feedback lives.

**Falsifier.** Show `.message` carrying `detail`. `ApiProblem`'s `super(title)` says otherwise; the 412/428
path is worse still — `require_if_match` raises `HTTPException(detail=<json string>)`
(`api/lib/crud/etag.py:34-42`), which FastAPI serialises as `application/json` (**not** problem+json), so
`ApiProblem.from` falls back to `about:blank` + `statusText` and the toast reads a bare "Precondition Failed".

---

### D-12 · MAJOR · The confirm dialog closes before the request, so a slow or failed delete is silent

`confirmDelete` sets `dialogOpen.value = false` at **:86**, before the `await` at :92. There is no in-flight
state anywhere in the dialog: no `loading`, no disabled confirm, no dismiss guard. Consequences:

- A slow DELETE gives zero feedback; the row stays on screen (the `reload()` at :94 has not run) and a
  moderator's natural response is to press Delete again on the same row.
- A **failed** DELETE toasts (:96) after the dialog has already gone, so the error is attached to nothing; the
  entry remains listed and looks unactioned.
- The pinned glass-ui ships the fix as a prop — `ConfirmDialog`'s `loading?: boolean`
  (`node_modules/@mkbabb/glass-ui/dist/components/custom/confirm-dialog/ConfirmDialog.vue.d.ts`) — see D-13.

**Falsifier.** Any in-flight state in the dialog. `pendingDelete` (:76) and `dialogOpen` (:77) are the only two
refs, and `:275-276` binds no `:disabled`.

---

### D-13 · MINOR · Hand-rolls a destructive-confirm that the pinned glass-ui exports as a primitive (0 imports repo-wide)

Installed glass-ui **4.0.0 exports `./confirm-dialog`** (`node_modules/@mkbabb/glass-ui/package.json` exports
keyset) → `ConfirmDialog` with exactly this contract:

```ts
{ title: string; description?: string; confirmLabel: string; destructive?: boolean; loading?: boolean }
+ v-model:open + @confirm
```

(`dist/components/custom/confirm-dialog/ConfirmDialog.vue.d.ts`). `grep -rn "confirm-dialog" web/src` → **0**.
This file re-implements it in ~15 script lines (:75-99) + 16 template lines (:264-279); `AdminUserList.vue`
re-implements it a second time.

**The nuance that keeps this MINOR, stated plainly:** `./confirm-dialog` is **RETIRED at glass-ui 5.0.0** —
"becomes a Dialog preset" (`glass-ui/CHANGELOG.md:219`), the consumer composition being the sanctioned form
(`glass-ui/MIGRATION.md:1165`). So the hand-roll is *accidentally forward-compatible*. But it implements only
two of the preset's four named parts: the sanctioned preset is
`<DialogContent surface="…" :show-close="false" @escape-key-down @interact-outside>` **plus the loading
dismiss-guard**, and this file passes neither `:show-close="false"` (`showClose` defaults `true`,
`dist/components/ui/dialog/DialogContent.vue.d.ts:53,75` — so a destructive confirm carries a stray top-right X
alongside its explicit Cancel) nor any in-flight guard (D-12).

**Falsifier.** Show `./confirm-dialog` absent at 4.0.0 (it is present), or show the 5.0.0 preset lacking the
loading guard (`MIGRATION.md:1165` names it explicitly).

---

### D-14 · MINOR · Bypasses the token layer for raw palette literals; the light-mode red is a contrast failure

Nine raw-palette utilities on a codebase whose colour layer is CSS-variable driven:
`border-red-500/20 bg-red-500/5` (:166) · `text-red-400` (:172) · `bg-red-500/20 text-red-300` (:176) ·
`text-red-300` (:191) · `hover:text-blue-400 hover:bg-blue-500/10` (:201) ·
`hover:text-green-400 hover:bg-green-500/10` (:211) · `hover:text-red-400 hover:bg-red-500/10` (:221).

The repo resolves its palette from custom properties at boot and re-resolves on the `.dark` toggle
(`web/src/lib/colors.ts:83-92` `resolveVizColors`, called at `App.vue:11`, with a `MutationObserver` on the
class), and `style.css:119/:123` defines a `:root` (light) and `.dark` pair — **light is the default**. Fixed
palette literals do not participate in either mechanism. `text-red-300` = `#fca5a5`; relative luminance
0.503 ⇒ contrast against white ≈ **1.90:1**, far under WCAG 1.4.3's 4.5:1 — and it is applied to the
flag-count pill (:176) and every flag reason (:191), i.e. the two pieces of text a moderator must read. In dark
mode the same literals are fine, which is why this survived: the component was authored in one theme.
**UNPROVEN-NEEDS-LIVE (SS-13)** for the exact composite over the resolved `--card` + `bg-red-500/5`; the hex
arithmetic and the token bypass are static-provable.

Same row, same cause: six `size="icon"` buttons each hand-override to `class="h-7 w-7"` (:200-201, :210-211,
:220-221) when the pinned CVA already publishes `size: "icon-sm"`
(`dist/components/ui/button/index.d.ts:5`).

**Falsifier.** A theme token resolving to those reds (grep `--destructive`/`--viz-*` — none maps to
`red-300`), or the app shipping dark-only (`style.css:119` says otherwise).

---

### D-15 · MINOR · `timeAgo` parses a non-ISO wire format with no NaN guard — and the sibling file guards

`timeAgo(iso)` (:137-146) guards null but never `Number.isNaN(d.getTime())`. Its parameter is named `iso`; the
wire is **not** ISO-8601: `admin.py:90-96` serialises with `json.dumps(body, default=str)`, so a
`datetime` arrives as `"2026-08-04 15:56:02.260428+00:00"` — space separator, 6-digit fraction — outside the
ECMA-262 Date Time String Format, hence implementation-defined parsing. Measured on V8: parses correctly
(`new Date("2026-08-04 12:34:56.789000+00:00")` → valid, correct UTC). JSC/Safari acceptance is
**UNPROVEN-NEEDS-LIVE (SS-13)**; a rejection renders `"NaNm ago"` once per row (:182) plus once per flag (:193).
The sibling in the same directory does guard — `AdminAuditLog.vue:54-65`:
`if (Number.isNaN(d.getTime())) return iso;`.

Same function, three lesser defects: no seconds bucket (a fresh flag reads "0m ago"); no
`Intl.RelativeTimeFormat` (hard-coded English, no locale, no pluralisation); and a server clock ahead of the
client yields `"-1m ago"` (`:139-141` never clamps).

**Falsifier.** Show the API emitting `T`-separated ISO (it does not — `default=str` is `datetime.__str__`), or
show JSC accepting the space form universally.

---

### D-16 · MINOR · `getAdminToken()!` × 4 discards the store's own nullable contract

`auth.getAdminToken()!` at :37, :88, :102, :117. The store returns `string | null`
(`stores/auth.ts:96-98`); its other consumers **guard** — `stores/gallery.ts:124-125, 139-140, 151-152` all do
`const token = …getAdminToken(); if (!token) return;`. When the assertion is wrong the failure is ugly, not
silent: `coreFetch` throws `new Error("coreFetch: auth='admin' requires adminToken")` (`lib/api.ts:127-129`)
and :52 puts that internal string in a user-facing toast.

Reachability is narrow — the mount is gated on `gallery.adminMode` (`GalleryView.vue:380`), which is set beside
`adminLogin` (`gallery.ts:105-115`) — so MINOR, not MAJOR. The gap is cross-tab: `adminLogout` clears
`localStorage` (`auth.ts:91-94`) but another tab's `adminMode` ref keeps this panel mounted with a null token.

**Falsifier.** Prove `adminMode === true ⟹ adminToken !== null` across tabs. `auth.ts` registers no `storage`
listener, so it does not hold.

---

### D-17 · MINOR · `reasonLabel` widens a closed literal union back to `string`

`FlagReason` is a closed 4-member `Literal` on both sides of the wire (`lib/types.ts:139`;
`api/models/admin.py:54`) and `FlagInfo.reason` is typed with it (`lib/types.ts:143`). `reasonLabel` takes
`reason: string` and a `Record<string, string>` (:127-134), so the compiler cannot check exhaustiveness: add a
fifth reason server-side and the UI silently renders the raw enum token via `?? reason` (:134). Typing the
parameter `FlagReason` and the map `Record<FlagReason, string>` makes the next reason a **compile error** —
which is the entire point of the Literal.

**Falsifier.** Show `FlagReason` open-ended. `api/models/admin.py:54` is a closed `Literal`.

---

### D-18 · MINOR · Zero props, zero emits — the seam that makes D-6 inevitable

No `defineProps`, no `defineEmits`. The component reaches straight into `useAuthStore` (:25) and the `api`
module (:14) and reports nothing outward. Consequences, all observable in the tree:

- The parent cannot badge the tab with a pending count — `GalleryView.vue:57` renders a bare
  `{ label: "Flagged", value: "flagged" }`, and `AdminStats` (`lib/types.ts:110-118`) has no flagged field, so
  the count exists nowhere in the UI.
- No moderation event escapes the component → D-6's stale gallery.
- `reload()` runs at **setup** top-level (:73), not `onMounted`, inside a `defineAsyncComponent`
  (`GalleryView.vue:32`), so the parent cannot defer, key, or re-trigger the fetch.
- Untestable in isolation: mounting requires a Pinia instance plus a stubbed network. `web/e2e/` has 7 specs
  and `grep -rn "admin" e2e/*.ts` → **0** — nothing exercises this panel at any level.

**Falsifier.** Any prop, emit, or exposed method. There are none.

---

### D-19 · MINOR · The dismiss toast does not pluralise, in a file that pluralises correctly 100 lines away

`toast(\`Dismissed ${result.dismissed} flags\`, "success")` (:105) → "Dismissed 1 flags". The row pill gets it
right in the same file: `{{ item.flag_count === 1 ? "flag" : "flags" }}` (:177). The server's response is
literally `{"dismissed": <n>}` with `n = 0` on an idempotent no-op (`admin.py:590-609`), so "Dismissed 0 flags"
is also a reachable success message.

**Falsifier.** Read :105 and :177.

---

### D-20 · INFO · Type-twin drift across three hand-maintained copies of one shape

`FlaggedVisualization` (`lib/types.ts:152-160`) omits `content_hash`, which the endpoint does emit
(`admin.py:576`) — so the client cannot reach the key the flag stream is actually joined on. Meanwhile the
server's own Pydantic model `FlaggedEntryInfo` (`api/models/admin.py:69-79`) is imported by nothing and has
**diverged**: it declares `user_slug` where the hand-built body emits `owner_slug` (`admin.py:578`) and the TS
twin declares `owner_slug` (`types.ts:157`). The TS comment at `types.ts:148-151` is admirably honest about the
cause ("admin.py hand-builds the body; no `response_model`") — three copies of one shape, no generator, one
already rotted.

**Falsifier.** A `response_model=FlaggedEntryInfo` on `list_flagged` (`admin.py:509` has none), or a codegen
step (none in `web/package.json`).

---

## §2 — SUPERLATIVES (same evidentiary burden)

### S-1 · The most complete accessibility contract of the three admin panels

6 interactive controls, **6 aria-labels** (:202, :212, :222, :251 + the two dialog buttons named by their text
:275-276), and every one of the 8 icons `aria-hidden="true"` (:173, :206, :216, :226, :233, :257). The loading
region is announced — `role="status" aria-live="polite"` + `.sr-only` text (:151-153); the list carries list
semantics (`role="list"` + `aria-label`, :159-160; `role="listitem"` :165); the pagination is a labelled
`<nav>` (:241-244). Distinctively, the three row labels **interpolate the row identity**
(`` `Delete entry ${…}` ``), so a screen-reader user gets a unique accessible name per row rather than three
identical "Delete" buttons.

Measured contrast: `grep -c "aria-label"` → AdminFlaggedPanel **6** (6 Buttons) · AdminUserList 14 (12
Buttons) · **AdminAuditLog 0** (2 Buttons); `grep -n "role=\|sr-only\|aria-live"` → AdminAuditLog **0 hits**,
its spinner (`:119-121`) unannounced and its Prev/Next bare `<button>`s (`:168-182`).

**Falsifier (L-18).** One unlabelled interactive element in this file. There is none. (The labels *do* name the
wrong identity — that is D-3, a correctness defect, not a completeness one.)

### S-2 · Already on the current glass-ui axes, and barrel-clean

`<DialogContent surface="opaque">` (:265) uses the **post-4.0.0 `{glass|veil|opaque}` surface axis**
(`dist/components/ui/_shared/useSurfaceAxis.d.ts:15`, `DialogContent.vue.d.ts:4,12`) — not the retired binary
`variant: glass|opaque` that the BA.W-SURFACE-AXIS clean break replaced. And both imports are **subpath**
specifiers (`/button` :3, `/dialog` :4-11) with zero root-barrel usage — contrast `AdminUserList.vue:4`,
`import { Checkbox } from "@mkbabb/glass-ui"`, which pulls the barrel into the same admin chunk. This file's
whole 4→7 uplift exposure is therefore **one line**: `variant="destructive"` → `tone="destructive"`
(:276; `glass-ui/MIGRATION.md:1196-1199`, BI.W-BUTTON-TONE).

**Falsifier.** A root-barrel import or a retired prop spelling in this file. `grep '@mkbabb/glass-ui"'` → 0
hits here.

### S-3 · Consumes the design system's semantic typography scale instead of arbitrary sizes

`text-admin-label` × 3 (:176, :180, :189) resolves to glass-ui's own
`@utility text-admin-label` (`dist/styles/typography/semantic.css:213`, reachable via
`style.css:3` `@import "@mkbabb/glass-ui/styles"`; also registered in the library's class-merge table,
`dist/cn-DJXf4yaB.js:8`). The sibling reaches for arbitrary values for the same register —
`AdminAuditLog.vue:134,143` hard-code `text-[0.65rem]` twice.

**Falsifier.** If the utility were undefined the class would be a silent no-op — checked: it is defined in the
installed package and imported by the app's single stylesheet.

### S-4 · Correctly refused the offset-pagination composable for a cursor endpoint

Both siblings ride `useOffsetPagination` (`AdminUserList.vue:20`, `AdminAuditLog.vue:4`) against endpoints that
genuinely are offset-paginated (`admin.py` users/audit return `{total, page, pages}`). `GET /api/admin/flagged`
is **not** — it takes `cursor` and returns `{items, next_cursor, has_more}` (`admin.py:509-512, 585`). The panel
implements the envelope faithfully (:30-32, :47-50, :62-65), gates the affordance on `has_more` (:242), and —
notably — **fabricates no page count**, documenting the reason in situ (:238-240). Reusing the shared composable
here would have required inventing a `total` the server never sends. Refusing a shared abstraction that does not
fit is the harder call, and it was made correctly.

**Falsifier.** Show `/api/admin/flagged` emitting `total`/`page`. `admin.py:585` returns exactly
`{items, next_cursor, has_more}`.

---

## §3 — MIGRATION EXPOSURE OF THIS FILE (the tri-package atomic bump)

Folded from lane-frontend §5 (`glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` is one indivisible
transaction — `keyframes@4.3.0` optional-deps `glass-ui ~4.0.0`). This component's total budget:

| row | sites here | disposition |
|---|---:|---|
| `<Button variant="destructive">` → `tone="destructive"` | 1 (:276) | `MIGRATION.md:1196-1199` BI.W-BUTTON-TONE |
| `lucide-vue-next` → `@lucide/vue` | 5 icons (:16) | part of the repo's 35 sites |
| `./confirm-dialog` retirement | 0 imports (D-13) | already composed as the 5.0.0 preset — needs `:show-close="false"` + the loading guard |
| `./button`, `./dialog` subpaths | 2 | survive at 7.0.0 (producer exports keyset verified) |
| `value.js` / `keyframes.js` | **0** | this file carries none of the deadlock's risk |

`DialogContent surface` and `text-admin-label` both survive the uplift. **This is one of the cheapest files in
the tree to migrate** — which is worth recording precisely because §1 shows how much else is wrong with it.

---

## §4 — CORPUS RECONCILIATION

- **Extends** intake `R3-7c` (36 client edges / 9 gap operations) and `R4-8` (2 clients without an operation)
  with two named, tree-verified instances: `?hard=true` (D-5) and the absent flag-creation operation (D-1).
- **Extends** `R6-8`'s lesson (operation identity must not embed client identity) with its mirror on this
  surface: the *client* here embeds an operation assumption — that `set_tier` dequeues (D-4) and that
  `admin delete` is permanent (D-5) — that no operation honours. Contract prose (the in-file `CRUD-CONTRACT §7`
  citations at :18-23, :90-91, :112-115) was consumed as if it were the API.
- **Re-derived independently:** the 45-operation count (§0 of the intake) — `grep` → 45, exact.
- **Contradiction with lane-crud.md:336-339:** it books `POST /:slug/flag` on the value.js side and says
  "Neither has the other's." The tree agrees and the consequence is sharper than the lane states — fourier
  holds the admin half of flagging with **no** user half, which is D-1.
- **Net-new against lane-frontend §4** ("Bespoke components shadowing glass-ui primitives — FLAGGED"): the
  hand-rolled destructive-confirm (D-13) is a shadow of `./confirm-dialog` that §4 does not list, present in
  **two** files (this one and `AdminUserList.vue`).
- No corpus row was contradicted on a matter of fact.

## §5 — METHOD AND LIMITS

Read-only throughout `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`. The
only write is this file. No browser tooling; no dev server; no test run. Two claims are marked
**UNPROVEN-NEEDS-LIVE (SS-13)**: the exact rendered light-mode contrast of D-14, and JSC/Safari's acceptance of
the non-ISO datetime in D-15 (V8 acceptance was measured directly via `node -e`). Every other claim is derived
from source bytes at the paths and lines cited.
