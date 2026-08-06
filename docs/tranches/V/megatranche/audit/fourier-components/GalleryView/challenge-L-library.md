claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryView.vue` · axis **L (LIBRARY)**

**Target** `fourier-analysis/web/src/components/visualization/GalleryView.vue` (442 lines)
**Substrate** fourier-analysis @ `cd26c65` (census §1/§2 C-1), branch `m/w1-bump-migration`, working tree as found — READ-ONLY.
**Method** Static + source-derived only. No browser tooling. Component read whole; every first-order import read whole (`stores/gallery.ts`, `stores/workspace.ts`, `stores/auth.ts`, `composables/useToast.ts`, `lib/api.ts`, `lib/types.ts`, the 7 eager `gallery/*.vue` children, the 3 async admin panels); second-order reads where a claim depends on them (`lib/scheduler.ts`, `lib/draftStorage.ts`, `components/ui/PathPreview.vue`, `router/index.ts`, `api/routers/visualizations.py`, `web/tsconfig.json`, `web/e2e/gallery.spec.ts`).
**Posture** The component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries severity + `file:line` + **the falsifier that would kill it**. Per **L-18** the superlatives (§4) carry falsifiers too.

**Tally — defects 25 · blockers 4 · superlatives 5** (plus 2 structural records, §3, not counted as defects).

**Corpus folded, not re-invented.** Hitherto rows cited where they touch: `formation/fourier/CENSUS-2026-08-03.md` §3a (`[FE §1/§3/§6/§8/§9]`), `lane-frontend.md:85,103,105,106,113,321-323,338-348,619`, `lane-crud.md` via census §3b, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-12**, **R5-7**, **R6-5**, **R6-6**, **X-1**. Two places where the live tree contradicts or extends the corpus are marked **CONTRADICTS-CORPUS** / **EXTENDS-CORPUS** and argued explicitly.

---

## §1 — BLOCKERS (4)

### L-1 · BLOCKER · The search bar and both filters are inert end-to-end — proven on both sides of the wire

`GalleryView.vue:95-98` debounces `gallery.searchQuery` at 300 ms into `gallery.resetAndFetch()`. `GalleryView.vue:111-114` watches `[gallery.sort, gallery.tierFilter, gallery.basisFilter]` and calls `gallery.resetAndFetch()` immediately.

`resetAndFetch` (`stores/gallery.ts:84-103`) issues exactly:

```ts
api.listVisualizations({ limit: 20, sort: sort.value, owner: ownerParam() })
```

`listVisualizations` (`lib/api.ts:397-413`) serialises **only** `limit`, `sort`, `cursor`, `owner`. `searchQuery`, `tierFilter` and `basisFilter` are never read by the store, never serialised, and never applied client-side: the only entry partitions are `featuredEntries` / `nonFeaturedEntries` (`GalleryView.vue:64-70`), which key off `e.tier === "featured"` and are wholly independent of `tierFilter`.

The server half closes it: `api/routers/visualizations.py:288-293` declares `limit | sort | cursor | owner` and nothing else; the only query narrowing is `visibility`/`owner_slug` (`:305-312`). There is **no** search, tier, or basis parameter anywhere in the stack.

**User-visible consequence.** Typing into `GallerySearchBar` (`GallerySearchBar.vue:48-54`, placeholder `"Search by slug..."`) does not filter — it *destroys work*: `resetAndFetch` sets `entries.value = []` (`gallery.ts:85`) and resets the cursor, so every keystroke-burst silently discards every infinite-scroll page the user had accumulated and re-renders the identical unfiltered page 1. Picking a tier or a basis pill does the same. Three visible controls, `hasActiveFilters` state (`GallerySearchBar.vue:39-41`), and an `aria-pressed` toggle advertise a capability that no layer implements.

**Falsifier.** Show any read of `searchQuery`/`tierFilter`/`basisFilter` in `stores/gallery.ts`, any `q`/`search`/`tier`/`basis` key in `listVisualizations`' `URLSearchParams` (`api.ts:403-407`), or any consumer of those refs that narrows `entries`. `grep -n "searchQuery\|tierFilter\|basisFilter" web/src/stores/gallery.ts` returns only the three `ref` declarations (`:33,:37,:38`) and the three re-exports (`:270-272`) — zero readers.

---

### L-2 · BLOCKER · `unpublishedDrafts` is dead by construction — published drafts never leave the Drafts tab, and re-publishing is one click away

`GalleryView.vue:72-81`:

```ts
const publishedHashes = computed(() => new Set(gallery.entries.map((e) => e.slug)));
const unpublishedDrafts = computed(() =>
    workspace.drafts.filter((d) =>
        !d.savedSnapshots?.length ||
        !d.savedSnapshots.every((h) => publishedHashes.value.has(h)),
    ),
);
```

`savedSnapshots` has exactly **one writer in the entire `web/src` tree** — `stores/workspace.ts:102`, inside `_saveDraftNow`, where it is hard-coded `savedSnapshots: []` on *every* autosave. (`grep -rn "savedSnapshots" web/src` → 4 hits total: the type at `lib/types.ts:90`, the hard-coded `[]` at `workspace.ts:102`, and the two read sites here.) Therefore `d.savedSnapshots.length === 0` for every draft, forever ⟹ the first disjunct `!d.savedSnapshots?.length` is unconditionally `true` ⟹ **`unpublishedDrafts ≡ workspace.drafts`**.

The whole guard is dead code that nonetheless re-runs `publishedHashes` (an O(n) `Set` build over every gallery entry) on every `gallery.entries` mutation — i.e. after every page-append, every like, every `resetAndFetch`.

**Second, independent kill.** Even if `savedSnapshots` were populated, it would be compared against `publishedHashes` = the set of **visualization 4-word `slug`s** (`gallery.ts:22-24`, `types.ts:` `Visualization.slug`). `savedSnapshots: string[]` is named for snapshot/contour hashes and the neighbouring draft identity is `imageSlug` (`types.ts:84`) — three different identity domains, none reconciled. The B.W4 convergence comment (`gallery.ts:10-19`) declares `slug` the sole handle; this filter is a survivor of the pre-convergence scheme.

**User-visible consequence.** `handlePublishDraft` (`GalleryView.vue:207-216`) → `gallery.publishDraft` (`gallery.ts:237-263`) POSTs a **new** `visualization` (`api.ts:372-380`, no `Idempotency-Key` sent despite `coreFetch` supporting one at `api.ts:99,138-140`). The draft row remains in the Drafts tab with its Publish button live. Two clicks ⇒ two `POST /api/visualizations`. Whether that yields two gallery rows depends on server-side `content_hash` dedup (`types.ts` "dedup key, never identity") — **UNPROVEN-NEEDS-LIVE (SS-13)** for the row-count outcome; the client-side "no idempotency key, no draft retirement, button stays live" half is fully proven.

**Falsifier.** Produce a second writer of `savedSnapshots`, or show `publishDraft` (or any caller) pushing the created `data.slug` back onto the draft record. `gallery.ts:257` captures `data.slug` only into the module-local `etags` map and discards it; `workspace.refreshDrafts()` (`workspace.ts:408-410`) is never even called after a publish, so the in-memory draft list is not re-read either.

---

### L-3 · BLOCKER · The like affordance is a UI fiction: no server call, un-like structurally impossible, count inflatable without bound

`GalleryView.vue:124-130`:

```ts
const result = await gallery.like(hash);
if (!result) return;
const s = new Set(likedHashes.value);
result.liked ? s.add(hash) : s.delete(hash);
```

`gallery.like` (`gallery.ts:189-199`) performs **no network I/O at all**: it finds the index, hard-codes `const liked = true`, bumps `likes` locally, and returns `{ liked: true, likes }`. Consequences, each statically provable:

1. `result.liked` is a compile-time constant `true` ⟹ the `s.delete(hash)` arm at `GalleryView.vue:128` is **unreachable code**. Un-liking cannot happen.
2. Every click increments `entries[idx].likes` by 1 with no guard on `likedHashes` — spam-clicking the heart on `GalleryCard.vue:135-145` inflates the displayed counter arbitrarily.
3. Nothing persists. The next `resetAndFetch` (which L-1 shows fires on any filter touch, and which `setTier`/`deleteEntry` also fire) reverts the counter to the server value and `likedHashes` still says "liked" — the heart stays filled (`GalleryCard.vue:139,143`, `aria-pressed` at `:140`) over a count that just snapped back.

**I credit the store's honesty and locate the defect precisely.** `gallery.ts:190-192` states plainly that no like endpoint exists, and the tree agrees: `api/routers/visualizations.py` declares 13 routes (`:164,244,287,350,400,430,488,669,675,686,733,799,860`) and **none** is a like toggle. So the store is not hiding a missing call — the defect is that the *view* renders a persistent-looking, `aria-pressed`, count-bearing toggle over a capability the stack does not have. The correct postures are "omit" or "disabled with an explanatory title", not "fake it".

**Falsifier.** Show a `POST`/`DELETE` like route in `api/routers/`, or any `api.*` call inside `gallery.like`, or any reachable path that sets `liked: false`.

---

### L-4 · BLOCKER · Leaving admin mode while on an admin tab renders a blank view with no recovery affordance

`activeTab` (`GalleryView.vue:43`) admits five values. The admin trio is added to `tabOptions` **only when `gallery.adminMode`** (`:54-60`), and each admin tab body is gated `v-if="activeTab === '…' && gallery.adminMode"` (`:375,380,385`). The gallery and drafts bodies are gated on `activeTab === 'gallery'` / `'drafts'` (`:242,356`).

The two `adminMode`-adjacent watchers do **not** reset the tab:

```ts
watch(() => gallery.adminMode, (on) => { if (!on) clearGallerySelection(); });   // :204
watch(activeTab,              (tab) => { if (tab !== "gallery") clearGallerySelection(); }); // :205
```

So: admin is on `activeTab === "audit"`, clicks Logout in `GalleryAdminBanner` (`GalleryView.vue:247` → `gallery.deactivateAdmin()` → `gallery.ts:117-121` sets `adminMode.value = false`). Now every one of the five content blocks evaluates `false`. The route renders the tab strip and **nothing else** — no gallery, no drafts, no empty state, no error. Recovery requires the user to notice the strip lost three tabs and re-click Gallery.

The same hole opens whenever `activateAdmin` fails *after* a tab switch, and the mirror-image hole exists at `:101-108`: the `isLoggedIn` watcher does reset `activeTab` off `"drafts"` on logout (`:104`) — proving the author knew this class of bug and fixed exactly one of its two instances.

**Falsifier.** Show any `activeTab` reset in the `adminMode` watcher, a fallback `v-else` under the tab region, or a `SegmentedTabs` contract that coerces an out-of-range `modelValue` back into `options`. `SegmentedTabs.vue.d.ts` (`glass-ui@4.0.0`) declares `modelValue: string` with a one-way `"update:modelValue": (value: string) => any` emit and no clamping — the parent owns the value and this parent never re-clamps it.

---

## §2 — MAJOR (8)

### L-5 · MAJOR · The search debounce timer is never cleared on unmount — a live post-teardown network write into a singleton store

```ts
let searchTimer: ReturnType<typeof setTimeout> | null = null;   // :94
watch(() => gallery.searchQuery, () => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => gallery.resetAndFetch(), 300);   // :97
});
```

There is **no `onUnmounted`** anywhere in the file (`grep -n "onUnmounted\|onBeforeUnmount" GalleryView.vue` → 0 hits; the sole lifecycle import at `:2` is `onMounted`). Vue auto-stops the `watch`; it does not cancel an already-scheduled `setTimeout`. Type a character, navigate off `/gallery` within 300 ms ⟹ the callback fires against the **Pinia singleton**, wiping `gallery.entries` to `[]` (`gallery.ts:85`) and firing a `GET /api/visualizations` for a view that no longer exists. Returning to the gallery then shows whatever that orphan fetch left behind.

Nothing else compensates: `api.abortInflight` exists (`api.ts:61-66`) and is used by `workspace.ts:395` for the compute path, but **is never called for `"listVisualizations"`** anywhere in the tree.

**This is a repeated idiom, not a slip** — `AdminUserList.vue:41,74` has the byte-identical un-cleared `searchTimer`, and none of the three admin panels registers an unmount hook either (`grep -n "onUnmounted" gallery/Admin*.vue` → 0 hits). **EXTENDS-CORPUS**: census §3a `[FE §8]` banks "off-screen rAF gating, `scheduler.yield()` INP floor, 18 reduced-motion references" as hygiene *credit*; the debounce-teardown surface is a second, uncounted hygiene axis on which this subtree is uniformly 0-for-2.

**Falsifier.** Show an `onUnmounted(() => clearTimeout(searchTimer))`, or a `watch` option that cancels pending timers (none exists), or `abortInflight(["listVisualizations"])` on a route guard.

---

### L-6 · MAJOR · Native `confirm()` for single-entry delete, in a component whose own siblings document that they retired it

`GalleryView.vue:137-141`:

```ts
async function handleDelete(hash: string) {
    if (!confirm("Delete this gallery entry?")) return;
```

Forty lines away, the **same component** routes batch delete through the glass-ui `<Dialog>` with a typed `pendingBatch` payload, a destructive variant, and per-action copy (`:401-440`). And both async siblings carry the explicit in-tree law:

- `AdminFlaggedPanel.vue:75` — `// Destructive-confirm dialog state — supplants native `confirm()`.`
- `AdminUserList.vue:80` — identical comment, and `:459` `<!-- Destructive-confirm dialog — replaces native `confirm()`. -->`

So the retirement of `confirm()` is a ratified, commented, executed decision everywhere in this directory **except** the one call site in the parent. Beyond the inconsistency: `confirm()` blocks the main thread (an INP cliff on the very view that census §3a `[FE §8]` singles out as the INP-sensitive consumer), is suppressible after repeated dialogs in Chrome/Firefox — in which case `confirm()` returns `false` and delete silently stops working — and cannot be styled, focus-trapped, or reached by the Playwright suite.

**Falsifier.** Find a second surviving `confirm()`/`alert()`/`prompt()` in `gallery/` that would make this the house style rather than the holdout. `grep -rn "confirm(\|alert(\|prompt(" web/src/components/visualization/` → this is the only one.

---

### L-7 · MAJOR · The empty-state marquee is provably unreachable — a 28-line ratified design branch that can never execute, plus a comment that asserts the opposite

```html
<div v-if="!gallery.entries.length && !gallery.loading" …>        <!-- :265-268 -->
    <GalleryMarquee v-if="featuredEntries.length >= 4" … />        <!-- :269-278 -->
```

with `featuredEntries = gallery.entries.filter(e => e.tier === "featured")` (`:64-66`).

`featuredEntries` is a filter of `gallery.entries` ⟹ `featuredEntries.length ≤ gallery.entries.length`. The container demands `gallery.entries.length === 0` ⟹ `featuredEntries.length === 0` ⟹ `0 >= 4` is `false`. **`GalleryMarquee` can never mount from this site**, and this is its only mount site in the tree (`grep -rn "GalleryMarquee" web/src` → the import at `GalleryView.vue:26`, the tag at `:269`, and the SFC itself). `GalleryMarquee.vue` (135 lines, plus a third redundant `v-if="entries.length >= 4"` at `:27`) is dead weight in the `/gallery` chunk.

The D.W4.c comment at `:259-264` states the design intent and is **factually wrong about its own mechanism**: *"The marquee gracefully hides itself when entries.length < 4 (its own template guard), so a true cold-empty DB renders the CTA alone."* The marquee's guard is on `featuredEntries`, not `entries`, and the outer guard already forces `entries.length === 0`. Every state renders the CTA alone; "option A" has never shipped.

**CONTRADICTS-CORPUS.** Census §3a `[FE §4]` lists "GalleryMarquee stays local (producer retired `./scrolling-text` at 5.0.0)" as a *keep* under the shadow-inventory. That verdict presumes the component is live. On the live tree it is unreachable, so the convergence question for `GalleryMarquee` is not "keep local vs adopt producer" but "does the empty-state design get repaired or does the component get deleted" — a strictly cheaper wave item. The shadow row should be re-graded before any adoption budget is spent on it.

**Falsifier.** Find a second `<GalleryMarquee>` mount site outside the empty-state div, or show `featuredEntries` sourced from anything other than `gallery.entries`.

---

### L-8 · MAJOR · Logout clears the drafts array from the view but not the device — the next user on the same browser inherits them

`GalleryView.vue:101-108`:

```ts
watch(isLoggedIn, (loggedIn) => {
    if (!loggedIn) {
        workspace.drafts = [];                                    // :103
        if (activeTab.value === "drafts") activeTab.value = "gallery";
    } else {
        workspace.refreshDrafts();
    }
});
```

Two defects in eight lines.

**(a) Encapsulation.** The view writes another store's state field directly (`:103`). `useWorkspaceStore` exposes `drafts` and `refreshDrafts` (`workspace.ts:439,463`) but no `clearDrafts` action — so the invariant "drafts are empty when logged out" lives in a component watcher, where no other consumer of the store can see or rely on it. Any other route that touches `workspace` after a logout gets whatever this watcher happened to leave.

**(b) The clear is cosmetic.** Drafts are persisted in IndexedDB (`lib/draftStorage.ts`, DB `fourier-drafts`), and `refreshDrafts` is `drafts.value = await listDrafts()` — an unfiltered `getAll()` over the whole object store (`draftStorage.ts:97-105`). `WorkspaceDraft` (`types.ts:83-92`) has **no owner field**. So logout empties an array; login as a *different* slug immediately re-hydrates the previous user's drafts, thumbnails and all (`GalleryDraftsSection.vue:74-84` renders `draft.imageSlug` and its thumbnail). On a shared device this is a cross-user disclosure of the prior user's working set.

**Falsifier.** Show a `deleteDraft`/`clear()` call on the logout path, an owner/user-slug field on `WorkspaceDraft`, or a `listDrafts` variant that scopes by user. None exists; `deleteDraft` (`draftStorage.ts:87-95`) has no caller on any auth path.

---

### L-9 · MAJOR · Admin mutations no-op silently when the token is missing — after the user has already confirmed a destructive action

`gallery.setTier` (`gallery.ts:138-140`) and `gallery.deleteEntry` (`:150-152`) both open:

```ts
const token = useAuthStore().getAdminToken();
if (!token) return;
```

Bare `return` — no toast, no throw, no return value. `handleDelete` (`GalleryView.vue:137-141`) has already shown a `confirm()` and gotten a "yes"; then `await gallery.deleteEntry(hash)` resolves, `selectedEntry` is nulled at `:140`, the modal closes, and the entry is still there. `handleSetTier` (`:132-135`) is the same shape.

This is reachable in normal use, not a contrived state: `adminMode` (a plain `ref`, `gallery.ts:39`) and `adminToken` (localStorage-backed, `auth.ts:16`) are **two independent sources of truth** that no code keeps in sync. `activateAdmin` sets both (`gallery.ts:108-109`); `deactivateAdmin` clears both (`:118-119`); but `adminToken` also lives in `localStorage` across tabs, so logging out of admin in tab B leaves tab A with `adminMode === true` and no token — every admin control visible and every one a silent no-op.

Contrast `performBatchGallery` (`GalleryView.vue:175-179`), which handles exactly this case correctly with `toast("Admin token missing", "error")`. The correct posture exists in the file and was not applied to the two single-entry paths.

**Falsifier.** Show a toast/throw on the `!token` branch of `setTier`/`deleteEntry`, or a mechanism that makes `adminMode === true ⟹ getAdminToken() !== null` an enforced invariant.

---

### L-10 · MAJOR · `publishDraft` reports the **user** slug as the published visualization's slug

`gallery.ts:237-263`:

```ts
const auth = useAuthStore();
const slug = await auth.ensureUser();          // :241  ← USER slug
…
const { data, etag } = await api.createVisualization({ … });
if (etag) etags.set(data.slug, etag);          // :257  ← VISUALIZATION slug, correct
toast("Published!", "success", { slug });      // :258  ← user slug, wrong
```

`ensureUser()` returns `userSlug` / `register()`'s `res.user_slug` (`auth.ts:75-82, 43-50`). `useToast` renders `{ slug }` as `` `${message} (${slug})` `` (`useToast.ts:22`), so the success toast reads **"Published! (some-user-slug)"** — handing the user their own account handle at the exact moment they need the new entry's address. `data.slug` is in scope one line earlier and is the correct value.

Corroborating: the sibling `gallery.publish` (`:230`) toasts with the *visualization* slug, so the two publish paths disagree with each other about what `{ slug }` means. The one user-facing handle under CRUD-CONTRACT §1 (per this store's own header, `gallery.ts:17-19`) is silently swapped for a different noun's identity.

**Falsifier.** Show `ensureUser()` returning a visualization slug, or a `useToast` option that means "user slug". `auth.ts:75-82` and `useToast.ts:21-22` both refute it.

---

### L-11 · MAJOR · The J.W3 `scheduler.yield()` INP floor is inert on its own named sole consumer — `chunkSize (24) > page limit (20)`

`stores/gallery.ts:60-82`:

```ts
const result = await api.listVisualizations({ limit: 20, … });     // :65
const fresh = result.items.filter((v) => v.deleted_at == null);
await processInChunks(fresh, (v) => entries.value.push(v), { chunkSize: 24 });   // :74
```

`processInChunks` (`lib/scheduler.ts:42-54`) yields only when `(i + 1) % chunkSize === 0 && i + 1 < items.length`. With `items.length ≤ 20` and `chunkSize === 24`, `(i+1) % 24 === 0` is **never true for any `i < 20`**. `yieldToMain()` is never invoked. The loop is an ordinary synchronous `for` wrapped in a promise.

`scheduler.ts:14-18` names this exact call site as the whole feature's justification: *"The genuine unbounded consumer is the gallery infinite-scroll accumulation (`stores/gallery.ts`) — `processInChunks` yields between card batches so a long scroll never monopolises the main thread."* It does not, and cannot at the configured constants. `resetAndFetch` (`:95`) does not even route through `processInChunks` — it assigns the array wholesale.

**CONTRADICTS-CORPUS.** Census §3a `[FE §8]` banks *"`scheduler.yield()` INP floor"* on the hygiene-credit side of the ledger. On the live tree the floor exists as a correctly-written, correctly-feature-detected utility (`scheduler.ts:29-35` — genuinely good, see S-5) that its sole consumer has mis-parameterised into a no-op. The credit is for a mechanism that never runs. The wave repair is one constant, not a redesign — but the census row must move from "banked" to "banked-but-inert-pending-one-line".

**Falsifier.** Show a `listVisualizations` call with `limit > 24`, or a `chunkSize < 20`, or another `processInChunks` caller in the tree (`grep -rn "processInChunks" web/src` → the definition and this single call site). **UNPROVEN-NEEDS-LIVE (SS-13)** for the *measured* INP delta; the "zero yields execute" half is arithmetic and needs no browser.

---

### L-12 · MAJOR · The card's visible identity is `image_slug` — the FK the contract explicitly demoted — while search promises slugs and the entire shipped provenance surface renders nowhere

The store's own convergence header (`gallery.ts:16-19`) states: *"Card identity (`:key`, like/view/delete handlers) routes through `slug` — the single user-facing handle (§1)."* The handlers do. The **display** does not:

- `GalleryCard.vue:74` `:aria-label="`Open ${entry.image_slug}`"` · `:100` `:alt` · `:109` the card's title line — all `image_slug`.
- `GalleryCardModal.vue:98` the modal's title line — `image_slug`.
- `GalleryCard.vue:82-95` the admin checkbox `aria-label` — `image_slug`.

`image_slug` is typed and commented as *"image asset FK — kept"* (`types.ts`), i.e. deliberately **not** identity. So every visible string is the non-identity handle, while `GallerySearchBar.vue:51` promises *"Search by slug…"*. A user typing what the card shows could not match a slug search even after L-1 is repaired — the repair would ship a search that appears broken.

Wider, and this is the commission-relevant half: `Visualization` ships `fork_of`, `fork_of_hash`, `fork_count`, `version_count`, `set_hash`, `palette_slug`, `title`, `description`, `tags`, `owner_slug` (`types.ts`), and the API ships `/remix`, `/forks`, `/provenance`, `/diff`, `/versions` (`api/routers/visualizations.py:488,686,733,799,860`). A grep across the whole gallery subtree for any of `fork_of|fork_count|version_count|remix|provenance|palette_slug|entry.title|entry.description|entry.tags|owner_slug` returns **exactly one hit**, and it is in the admin flagged panel (`AdminFlaggedPanel.vue:181`). The public browse surface — the only browse surface — renders **none** of the provenance chain, no author attribution, and no human title, showing instead an asset FK and two counters.

**Folds census §3b / R-2 / F-α.** Lane-crud proves fourier's version chain never deepens (`_write_root_version`, always `depth=0`). This finding is its frontend twin and is *strictly worse*: even the provenance that **is** persisted and **is** served has no consumer. The union prototype's "history walk" horizon has no surface to land on.

**Falsifier.** Produce any provenance/title/owner binding in `GalleryView.vue` or `gallery/*.vue` outside `AdminFlaggedPanel.vue:181`. The grep above is the whole answer.

---

## §2b — MINOR (11)

### L-13 · MINOR · Two dead imports in `GalleryCard`, one of which is the *only* import of a whole unmounted module

`GalleryCard.vue:9-10`:
```ts
import { VIZ_COLORS } from "@/lib/colors";
import PathPreview from "@/components/ui/PathPreview.vue";
```
Neither symbol appears anywhere else in the file (`grep -n "VIZ_COLORS\|PathPreview" GalleryCard.vue` → lines 9 and 10 only; `<PathPreview` occurs in zero templates tree-wide).

`components/ui/PathPreview.vue` (70 lines, an SVG contour-path renderer) has **exactly one importer in the entire tree** — this dead line — so the module is wholly unmounted. It is nevertheless bundled into the `/gallery` chunk, and `VIZ_COLORS` drags in `lib/colors.ts`'s `reactive()` palette graph for nothing.

`web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`/`noUnusedParameters`, so `vue-tsc -b` (`package.json:8`) cannot see this, and there is **no ESLint config in `web/`** at all (`ls -a web | grep eslint` → nothing). Dead imports are structurally uncatchable here.

**Falsifier.** Any use of either symbol in `GalleryCard.vue`, or a second importer of `PathPreview.vue`, or `noUnusedLocals` in a tsconfig that covers `src/**/*.vue`.

### L-14 · MINOR · `timeAgo` triplicated verbatim; `basisLabels` duplicated verbatim — and this is the mechanical source of intake row **R3-12**

`timeAgo` is byte-identical at `GalleryCard.vue:53-61`, `GalleryCardModal.vue:58-66`, `GalleryDraftsSection.vue:28-36` — three copies, same bug surface (no `Intl.RelativeTimeFormat`, no invalid-date guard: `new Date("").getTime()` is `NaN` ⟹ `NaN` propagates to `` `${NaN}d ago` ``).

The `basisLabels` computed — including the `b.startsWith("fourier")` key-folding and the `"Epicycles"`/`"Series"` special cases — is byte-identical at `GalleryCard.vue:36-51` and `GalleryCardModal.vue:41-56`.

**Folds R3-12 (ADOPT-AS-FACT).** That row records "35 open-family records collapse to 28 unique; duplicates per `R3-HA-004`: both Paper-search callsites, **`GalleryCard` basisLabels**, `MorphPhaseConfig` easingNames" — and concludes any instance denominator over these rows over-counts by 7 (20%). This is the live-tree mechanism behind the `GalleryCard basisLabels` entry: it is not one record seen twice, it is **two verbatim copies in two files**. Extracting one `useBasisLabels()`/`timeAgo` module removes 4 of the 7 duplicate records at the source rather than de-duplicating them downstream.

**Falsifier.** Show the two `basisLabels` bodies differing in any respect, or a shared helper either file imports.

### L-15 · MINOR · `route.query.admin` cast lies about the array case; `router.replace({ query: {} })` wipes every unrelated param

`GalleryView.vue:84-88`. `RouteLocationNormalized["query"]` values are `string | string[] | null`; the cast `as string | undefined` (`:84`) silently mis-types `?admin=a&admin=b`, which reaches `verifyAdmin(token)` as an array and stringifies into `Authorization: Bearer a,b` (`api.ts:130`). Separately, `router.replace({ query: {} })` (`:87`) discards **all** query params, not just `admin` — any co-arriving deep-link state (a future `?tab=`, `?sort=`, tracking params) is destroyed by an admin activation. Correct: `const { admin, ...rest } = route.query; router.replace({ query: rest })`.

**Falsifier.** Show vue-router narrowing repeated keys to `string`, or a documented decision that the gallery owns the whole query string.

### L-16 · MINOR · `catch (e: any)` discards the typed `ApiProblem` the API layer builds

`GalleryView.vue:195,211` — and 10 more across the subtree (`AdminUserList.vue:174,185,196,207,218`; `AdminFlaggedPanel.vue:51,66,95,107,122`). `lib/api-problem.ts` exports a typed `ApiProblem` with `type`/`status`/`detail`/`instance`, thrown at `api.ts:182,194`; every consumer flattens it to `e.message ?? "…"`. RFC 7807 `type` URNs like `urn:contract:etag-mismatch` (`api.ts:418`) — the one machine-readable signal the contract went to the trouble of specifying — are unreachable to every handler in this subtree.

**Falsifier.** Any `instanceof ApiProblem` narrowing in `GalleryView.vue` or `gallery/*.vue` → zero.

### L-17 · MINOR · Three different `Set`-mutation idioms for three `Set`-valued refs in one file

`likedHashes` copy-on-write (`:127-129`), `selectedHashes` copy-on-write (`:155-158, 162`), `viewedHashes` **mutated in place** (`:119`). All three are `ref(new Set())`. In-place mutation *is* reactive (Vue's `reactive` collection instrumentation), so this is not a bug — it is an inconsistency that makes the file read as if `viewedHashes` were non-reactive on purpose, and it breaks the referential-identity guarantee the other two deliberately provide to child props (`GalleryInfiniteGrid.vue:11-12`, `GalleryCard.vue:22`).

**Falsifier.** Show `viewedHashes` passed as a prop anywhere (it is not — which is precisely why the inconsistency is invisible today and will bite whoever first passes it down).

### L-18 · MINOR · `"N loaded"` counts a different set than pagination does; an all-featured page can drive a load-more cascade

`GalleryInfiniteGrid.vue:27` renders `{{ entries.length }} loaded` where `entries` is `nonFeaturedEntries` (`GalleryView.vue:289-291`), while `hasMore`/`nextCursor` track the full `gallery.entries`. The number under-reports by the featured count on every page.

Sharper: if a page returns rows that are *all* `tier === "featured"`, `nonFeaturedEntries` is empty, the grid renders zero cards, and `InfiniteScroll`'s sentinel sits immediately in view — plausibly re-firing `load-more` until `hasMore` goes false. `fetchNextPage`'s `loadingMore` guard (`gallery.ts:61`) serialises but does not stop the cascade.

**Falsifier.** For the count drift: none — it is arithmetic. For the cascade: `InfiniteScroll`'s sentinel/threshold behaviour under a zero-height default slot is **UNPROVEN-NEEDS-LIVE (SS-13)**; `InfiniteScroll.vue.d.ts` exposes only `hasMore`/`isLoading`/`threshold` and a `sentinelRef`, insufficient to settle it statically.

### L-19 · MINOR · Session-scoped `viewedHashes` means every remount re-increments the server's view counter

`openModal` (`:116-122`) dedups views against `viewedHashes`, a plain in-memory `ref` reset on every mount. `recordView` (`gallery.ts:201-212`) is `GET /api/visualizations/{slug}`, which the comment states increments server-side. Navigate gallery → visualizer → gallery, reopen the same card, and the view count increments again. Both `Set`s also grow unbounded for the session with no cap. The dedup is real but its scope is one mount, so the counter it protects is inflated by ordinary browsing.

**Falsifier.** Show `viewedHashes` persisted (sessionStorage/store) — it is declared at `:46` and never written elsewhere. Server-side idempotency (e.g. an IP/session guard) would soften it: `liked_ips` is projected out at `visualizations.py:318`, hinting such a guard exists for likes — **UNPROVEN-NEEDS-LIVE (SS-13)** for views.

### L-20 · MINOR · Goldilocks: 442 lines carrying four responsibilities, with a 40-line dialog that is the third copy of one pattern

`GalleryView.vue` is simultaneously the route shell, the gallery-tab orchestrator (7 handlers, 5 refs, 4 computeds), the drafts-tab orchestrator, the admin-tab router, **and** the inline batch-confirm dialog (`:400-440`) — 40 lines of `<template v-if="pendingBatch?.action === …">` triplication across title, description, and button label, which is structurally the same dialog already written in `AdminUserList.vue:459+` and `AdminFlaggedPanel.vue:263+`. Census `lane-frontend.md:85` records the 442-line size; the finding here is the *composition*: the batch surface (`:143-205` script + `:305-352` toolbar + `:400-440` dialog ≈ 140 lines) is a self-contained feature with its own type, its own state trio, and zero coupling to the tabs — a clean `useGalleryBatch()` + `<GalleryBatchDialog>` seam that would take the shell to ≈300 lines and retire the third copy.

**Falsifier.** Show state shared between the batch feature and the tab/drafts logic beyond `gallery.adminMode` and `activeTab` (both already watched in isolation at `:204-205`).

### L-21 · MINOR · The marquee's duplicated track puts focusable cards inside an `aria-hidden` subtree

`GalleryMarquee.vue:51-56` wraps the loop-duplicate cards in `aria-hidden="true"`, but `GalleryCard`'s root is `role="button" tabindex="0"` (`GalleryCard.vue:71-80`). A focusable element inside an `aria-hidden` subtree is the canonical `aria-hidden-focus` violation: keyboard users tab into an element with no accessible name in an ignored subtree. The duplicates also mount live `@click`/`@like`/`@delete` handlers (`:61-64`) — the "decorative" copies are fully interactive. Currently latent because L-7 proves the marquee never mounts; it becomes live the moment L-7 is repaired, so it must be fixed **in the same wave**.

**Falsifier.** Show `inert` or `tabindex="-1"` applied to the duplicate track, or a `GalleryCard` prop that suppresses focusability (none exists).

### L-22 · MINOR · `onMounted` serialises three independent round-trips

`GalleryView.vue:83-91` awaits `activateAdmin` → `refreshDrafts` → `resetAndFetch` in strict sequence. `refreshDrafts` (IndexedDB) and `resetAndFetch` (network) share nothing and could be `Promise.all`'d; `activateAdmin` additionally awaits `refreshAdminStats` internally (`gallery.ts:111`), so an admin deep-link pays four sequential latencies before the first card paints — on the route census §3a `[FE §8]` flags as the INP-sensitive one.

**Falsifier.** Show an ordering dependency — `resetAndFetch` reads `visibilityFilter`/`sort` only, and `refreshDrafts` writes `workspace.drafts` only; the sole real edge is `activateAdmin` before `resetAndFetch` (owner-scoped listing), which `Promise.all([refreshDrafts(), resetAndFetch()])` after it preserves.

### L-23 · MINOR · `publish` uses `PATCH {visibility}` while dedicated `/publish` + `/unpublish` routes ship unused

`gallery.publish` (`gallery.ts:219-235`) does a `PATCH /api/visualizations/{slug}` with `{ visibility: "public" }` behind an ETag round-trip that costs an extra `GET` when the cache misses (`:223`). `api/routers/visualizations.py:669,675` ship `POST /{slug}/publish` and `POST /{slug}/unpublish`; `lib/api.ts` has no wrapper for either. Two representations of one transition, the semantically precise one unreachable from the client, and no unpublish affordance anywhere in the gallery.

**Falsifier.** Show a `publishVisualization`/`unpublishVisualization` wrapper in `lib/api.ts` → absent.

---

## §2c — INFO (2)

### L-24 · INFO · Every defect above is structurally invisible to the only gates that exist

`web/` has **no vitest** (census §3a `[FE §0,§9]`, corroborated: no `vitest` in `package.json` scripts, no `*.test.ts` under `web/src`), **no ESLint config**, and `tsconfig.json` omits `noUnusedLocals`. The gallery's entire automated coverage is `e2e/gallery.spec.ts` — 6 tests, of which **three are conditionally vacuous**: `:58 if (await filterToggle.isVisible())`, `:72 if (await loginBtn.isVisible()…)`, `:51 if (…isVisible().catch(() => false))` — each passes silently when its element is absent. Zero tests exercise search, filtering, like, publish, batch, admin, or the drafts filter. The `"no console errors"` test (`:118-138`) filters out `404` and `ERR_CONNECTION_REFUSED`, so it passes against a dead API. Its stale comment at `:18` ("Search bar (GlassDock)") describes a dock `GallerySearchBar` does not render, saved only by the `.or()` at `:22`.

**Falsifier.** Point at a unit-test runner or a lint config under `web/`.

### L-25 · INFO · Two import paths for one type inside one subtree

`GalleryView.vue:10` imports `Visualization` from `@/lib/types`; `stores/gallery.ts:4` imports it from `@/lib/api` (a re-export, `api.ts:31-38`); the children (`GalleryInfiniteGrid.vue:2`, `GalleryCard.vue:6`, `GalleryCardModal.vue:6`) use `@/lib/types`. The re-export exists for the "~14 call sites" note at `api.ts:28-30`, but inside this subtree it just gives one type two names. Harmless today; it is the sort of split that makes a later type move a 14-file change instead of a 1-file change.

**Falsifier.** Show the two paths resolving to different declarations — they do not (`api.ts:31-38` is a pure `export type` passthrough).

---

## §3 — Structural records (not counted as defects)

### SR-1 · The **R5-7** template-loop invisibility class, quantified for this subtree

Folding intake rows **R5-7** (ADOPT-AS-FACT, CARRY-TO-WAVE → F.W4: *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*) and **R6-5**/**R6-6** (the `NATIVE_TEMPLATE_LOOP` family that cured it, live-corroborated at `PaperSidebar.vue:65,87,105`).

Full `v-for` census of the `GalleryView` subtree (`grep -n "v-for" GalleryView.vue gallery/*.vue`), classified by host element:

| Site | Host | Visible to a component-callsite deriver? |
|---|---|---|
| `GalleryView.vue` | — (**zero** `v-for`) | n/a |
| `GalleryFeaturedCarousel.vue:28` | `<div>` | **NO** |
| `GalleryMarquee.vue:29` | `<div>` | **NO** |
| `GalleryMarquee.vue:36` | `<div>` | **NO** |
| `GalleryMarquee.vue:52` | `<div>` | **NO** |
| `GalleryDraftsSection.vue:68` | `<div>` | **NO** |
| `AdminAuditLog.vue:126` | `<div>` | **NO** |
| `AdminFlaggedPanel.vue:163` | `<div>` | **NO** |
| `AdminFlaggedPanel.vue:187` | `<div>` | **NO** |
| `AdminUserList.vue:359` | `<div>` | **NO** |
| `GalleryInfiniteGrid.vue:31` | `<GalleryCard>` | yes |
| `GalleryCard.vue:116` | `<Badge>` | yes |
| `GalleryCardModal.vue:130` | `<Badge>` | yes |
| `GallerySearchBar.vue:114` | `<Button>` | yes |

**9 native / 4 component — a component-callsite-keyed denominator sees 31 % of this subtree's loops.** This is materially worse than the `PaperSidebar` case R5-7 was derived from (3 of 3 lost there; 9 of 13 here, spread over 7 files), and it is the *browse* surface — the loops that actually scale with data. F.W4's per-component D/L/C audit inherits the blind spot unless it adopts R6-5's `NATIVE_TEMPLATE_LOOP` family.

One extra wrinkle R5-7 does not cover: `GalleryMarquee.vue:36` and `:52` are the **same logical row rendered twice** (the seamless-loop duplicate). A component-callsite deriver that *does* see the inner `<GalleryCard>` callsites would count that row twice — an over-count stacking on top of R3-12's 7-duplicate over-count (L-14). Native-loop blindness and component-callsite double-counting are opposite-signed errors in the same subtree; neither cancels the other.

### SR-2 · Viz-render-path posture — the gallery is a pure raster consumer, and its one would-be client viz surface is unmounted

Census §3a `[FE §6]`: *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces."*

Verified against the live tree, the `GalleryView` subtree contributes **zero** of the three canvases and **zero** rAF loops (`grep -n "canvas\|requestAnimationFrame\|WebGL\|getContext" GalleryView.vue gallery/*.vue` → no hits). It touches the viz render path in exactly three ways, all server-rasterised or navigational:

1. `thumbnailUrl(entry.image_slug)` → `<img loading="lazy">` (`GalleryCard.vue:99-104`, `api.ts:292-294`) — server-rendered raster.
2. `overlayUrl(entry.image_slug)` → `<img>` at `resize=1024` (`GalleryCardModal.vue:78-82`, `api.ts:296-298`) — server-rendered raster, **no `loading` attribute and no width/height**, so it is a full-size eager fetch inside a modal (a CLS + bandwidth note for the perf lane).
3. Navigation into `VisualizationView` via `router.push('/w/…')` (`GalleryView.vue:370,396`), which owns the canvases.

The consequence for the census: the gallery route's cost is **images + DOM**, not GPU/canvas — so the two ungated rAF clocks flagged in `[FE §8]` are *not* on this route, and the gallery's perf lever is card count × two raster fetches. Conversely, the subtree's **only** client-side viz surface is `PathPreview.vue`, an SVG contour renderer that L-13 proves is imported once and mounted never. If the census's "12 SVG surfaces" count includes `PathPreview.vue`, it counts a surface that no template renders — worth re-checking before the SVG inventory is used as a convergence denominator.

**Falsifier for both halves.** `grep -rn "canvas\|getContext\|requestAnimationFrame" web/src/components/visualization/GalleryView.vue web/src/components/visualization/gallery/` → zero hits; `grep -rn "PathPreview" web/src` → the definition plus one dead import.

---

## §4 — Superlatives (5) — L-18 runs both ways

Each carries its own falsifier; none is offered as consolation.

**S-1 · `performBatchGallery` is a genuinely careful async handler — the best-written function in the file.** `GalleryView.vue:171-200`: it snapshots `pendingBatch.value` into a local `const pending` **before** the first `await` (`:172`), so a re-opened dialog cannot tear the in-flight payload; closes the dialog immediately (`:173`) so no double-submit is possible; checks the admin token with an *explicit toast* on the miss (`:175-179`) — the posture L-9 shows the single-entry paths lack; surfaces per-item `result.errors` individually (`:189-191`) rather than collapsing them; clears the selection only on the success path (`:192`); and resets `pendingBatch` in `finally` (`:198`) so an error cannot strand the dialog state. That is five distinct correctness properties, all of them load-bearing, all of them easy to omit. *Falsifier:* find a path where `pendingBatch` survives an exception, or where the dialog can be double-submitted — `:173` and `:198` close both.

**S-2 · The `content-visibility` application on `GalleryCard` is correctly sized, correctly floored, and correctly documented.** `GalleryCard.vue:200-207` applies glass-ui's `.deferred-section` utility with `--deferred-section-size: 17rem`, and the comment *derives* that number from the actual geometry (aspect-4/3 thumbnail ≈ 11rem at a ~15rem cell + meta footer) rather than guessing. It names the progressive-enhancement floor (`inv-29`: absent `content-visibility`, the card renders as before) and explicitly defers the measured delta to W6 instead of claiming an unmeasured win. This is the correct use of the platform primitive on the correct element — the repeated grid item, not the container. *Falsifier:* show `contain-intrinsic-size` materially mismatching the rendered card height (the 4:3 frame + ~6rem of text at a 14rem minimum column is ~17rem — it checks out), or a scroll-anchoring regression (`auto` in the utility caches the real size after first paint, which is the anchoring-safe form).

**S-3 · `GalleryCardModal`'s migration onto the glass-ui `<Dialog>` deleted a whole class of teardown bug, and the adapter is honest.** `GalleryCardModal.vue:31-39` retires a hand-rolled `Teleport` + `Transition` + Escape listener in favour of the primitive, gaining `role="dialog"`, focus trap, Escape-close and return-focus. Given L-5 proves this subtree has **no** `onUnmounted` anywhere, the removed hand-rolled Escape listener was almost certainly an un-removed global listener — this migration deleted a leak the codebase demonstrably does not know how to avoid by hand. The `computed({ get: () => true, set: v => { if (!v) emit("close") } })` bridge (`:36-39`) is the minimal correct adapter for a `v-if`-mounted modal driven by a parent-owned `selectedEntry` (`GalleryView.vue:389-398`) — no shadow state, no sync watcher, no double source of truth. *Falsifier:* show the modal reachable in a state where `open` reads `false` while mounted (impossible: the getter is constant and the parent unmounts it), or a leaked listener the migration failed to remove.

**S-4 · The copy-on-write `Set` idiom for prop-passed selections is the right call, deliberately made.** `GalleryView.vue:127-129, 155-158, 162` rebuild `likedHashes`/`selectedHashes` rather than mutating. Vue's reactive-collection instrumentation would make in-place mutation reactive *within* the component, but these `Set`s cross a prop boundary into `GalleryInfiniteGrid` → `GalleryCard` (`GalleryInfiniteGrid.vue:11-12,36`; `GalleryCard.vue:22,34`), where consumers do `props.selectedHashes?.has(...)` inside computeds. Copy-on-write makes the prop referentially honest, so child invalidation is deterministic and does not depend on the parent's `Set` being a `reactive` proxy that survives prop-passing unwrapped. That is the subtle, correct choice. *Falsifier:* show a child relying on identity stability of these props across unrelated updates (none does — both read them positionally inside computeds).

**S-5 · The three admin panels are code-split at exactly the right seam, and `scheduler.ts`'s feature-detection ladder is textbook.** `GalleryView.vue:31-33` `defineAsyncComponent`s `AdminUserList` (19.8 KB), `AdminFlaggedPanel` (11.6 KB) and `AdminAuditLog` (6.5 KB) — ≈38 KB of source that the overwhelmingly non-admin visitor never downloads, and the `v-if="… && gallery.adminMode"` gating (`:375,380,385`) means the chunks are never even requested. Separately, `lib/scheduler.ts:29-35` implements the three-rung ladder `scheduler.yield()` → `scheduler.postTask()` → `setTimeout(0)` with a typed `SchedulerLike` shim and a real universal floor — no library, no polyfill, correct degradation, exactly as `inv-29`/`inv-30` require. The *utility* is right; only its caller's constants are wrong (L-11), which is why that finding is a one-constant repair rather than a redesign. *Falsifier for the split:* show the admin chunks eagerly imported elsewhere (`grep -rn "AdminUserList\|AdminFlaggedPanel\|AdminAuditLog" web/src` → only these three async sites). *Falsifier for the ladder:* name a fourth rung worth having, or a detection order that would be safer — `yield` before `postTask` before `setTimeout` is the correct precedence.

---

## §5 — Ordered repair ledger (for the wave author)

| # | Finding | Sev | Cost | Note |
|---|---|---|---|---|
| 1 | L-1 filters inert | BLOCKER | server + client | Needs API params first (`visualizations.py:288-293`); until then the honest move is to hide the controls, not ship them dead |
| 2 | L-3 fake like | BLOCKER | server + client | No like route exists; decide capability-or-omit before touching the UI |
| 3 | L-2 dead draft filter | BLOCKER | small | Write `data.slug` back onto the draft **and** stop `_saveDraftNow:102` wiping it; add `Idempotency-Key` |
| 4 | L-4 blank admin tab | BLOCKER | 2 lines | Reset `activeTab` in the `adminMode` watcher (`:204`), mirroring `:104` |
| 5 | L-5 timer leak | MAJOR | 2 lines ×2 | `onUnmounted` here **and** in `AdminUserList.vue` |
| 6 | L-9 silent token no-op | MAJOR | 4 lines | Copy the posture already at `:175-179` |
| 7 | L-10 wrong slug in toast | MAJOR | 1 line | `data.slug`, not `slug` (`gallery.ts:258`) |
| 8 | L-11 inert yield floor | MAJOR | 1 constant | `chunkSize < limit`; re-grade the census hygiene row |
| 9 | L-6 native `confirm()` | MAJOR | small | The dialog already exists twice in the directory |
| 10 | L-7 unreachable marquee | MAJOR | design | Repair or delete — and fix L-21 in the same wave if repairing |
| 11 | L-8 unscoped drafts | MAJOR | medium | Owner-scope the IDB store, or clear it on logout |
| 12 | L-12 identity + provenance | MAJOR | medium | Commission-relevant: the union's history walk has no surface |
| 13 | L-13/L-14 dead code + triplication | MINOR | small | Extract `timeAgo` + `useBasisLabels`; kills 4 of R3-12's 7 duplicates |
| 14 | L-24 gate gap | INFO | — | No vitest / no ESLint / no `noUnusedLocals`; 3 of 6 e2e tests vacuous |

**Standing caveat.** Every claim above is static or source-derived. The three items that need a live surface to settle are marked **UNPROVEN-NEEDS-LIVE (SS-13)**: L-2's duplicate-row outcome, L-11's measured INP delta, L-18's sentinel-cascade, L-19's server-side view idempotency. Nothing else in this document depends on a browser.
