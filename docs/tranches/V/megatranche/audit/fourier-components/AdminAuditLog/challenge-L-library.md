claude-opus-5[1m]

# CHALLENGE — `AdminAuditLog.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminAuditLog.vue` (190 lines; census books it at 190 — `formation/fourier/lane-frontend.md:107`)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Livable-only claims marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole** subject + every transitive import: `@/composables/useOffsetPagination` (83), `@/stores/auth`, `@/lib/api` (`listAuditLog` → `adminFetch` → `coreFetch` → `abortable`), `@/lib/types` (`AuditEntry`), `@mkbabb/glass-ui/button`, `lucide-vue-next`. Plus the producing backend — `api/routers/admin.py`, `api/services/janitor.py`, `api/models/admin.py` — because the component's two dispatch functions are stringly-coupled to it.
**Mount site** `web/src/components/visualization/GalleryView.vue:33` (async) + `:385` (`v-if` tab).

**Tally — defects 20 · blockers 2 · superlatives 5.**

---

## §0 · Provenance fold (hitherto corpus — consumed, not re-invented)

| Corpus row | Where | How this challenge uses it |
|---|---|---|
| **R5-7** — *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — ADOPT-AS-FACT + CARRY-TO-WAVE → F.W4 | `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125` | **L-17.** Applied and confirmed present here. The intake's exemplar is `PaperSidebar.vue`'s three nested native `<li v-for>`. `AdminAuditLog` is the *same class, worse ratio*: **100 %** of its repeating surface is native. |
| **F.W4 disposition** — *"R5-7 (count native element loops or inherit the blind spot)"* | `formation/fourier/CENSUS-2026-08-03.md:362` | L-17 discharges this instruction for this component and records the count. |
| **R6-5** — the `NATIVE_TEMPLATE_LOOP` family that cured R5-7 | via `lane-fourier-r3-r6.md:125` | L-17 states the shape a cure must take for this file. |
| **Viz architecture — §6 the render path**: *"Canvas2D throughout. WebGL/WebGPU: **ABSENT**"*; Path A clock gated `if (!playing \|\| !anyCanvasVisible) return`; Path B = `ConvergencePlot`'s **second, ungated** clock | `formation/fourier/lane-frontend.md:514`, `:520-527`, `§6 Path B`; census `lane-frontend.md:26-28` (Canvas2D 4 / WebGL **0** / `<canvas>` 3) | **S-3.** The axis asks where this component touches the viz render path. Answer, proven three ways: **it does not.** Recorded as a superlative *with its falsifier*, not waved through. |
| Sibling sizes **529 / 285 / 190** | `lane-frontend.md:102,104,107` | S-2 (Goldilocks) and L-9 (the degraded copy). |
| `useOffsetPagination.ts` **83 LOC**; `@mkbabb/glass-ui/pagination` retired — *"PROSE COMMENT — subpath retired upstream"* | `lane-frontend.md:189,226,358` | S-4 and L-9's named carry. |

**Contradiction of the corpus: none.** Every row above survives contact with the live tree at this component. One row is *sharpened*: `lane-frontend.md:107` calls this file an "Audit-log list" — it is a `div`-grid, not a list, which is precisely why R5-7's deriver sees nothing (L-17).

---

## §1 · BLOCKERS

### L-1 · BLOCKER — every fetch failure renders as *"No audit entries"*. The audit log lies by omission.

`useOffsetPagination` catches **everything** and parks it in an `error` ref:

```ts
// web/src/composables/useOffsetPagination.ts:47-51
} catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load";
} finally {
    loading.value = false;
}
```
`error` is returned (`useOffsetPagination.ts:74`). The subject **does not destructure it** — the destructure at `AdminAuditLog.vue:15-26` takes `items,total,page,pageCount,loading,hasNext,hasPrev,loadPage,nextPage,prevPage` and stops. Mechanical proof: `grep -c "error" AdminAuditLog.vue` → **0**.

Consequence: 401 on an expired admin token, 500, DNS failure, offline, malformed JSON (`ApiProblem "Invalid JSON response"`, `lib/api.ts:200-206`), a 429 that exhausts both retries (`lib/api.ts:112,148-153`) — every one leaves `items` at `[]`, flips `loading` false, and the template falls into:

```html
<!-- AdminAuditLog.vue:151-159 -->
<div v-if="!entries.length" …>
    <ScrollText …/>
    <p class="text-sm">No audit entries</p>
```

On a **security-review surface**, "we could not reach the server" is rendered as the affirmative claim "no administrative actions were taken." There is no signal of any kind — no toast, no banner, no console path. This is the single worst defect in the file.

**The sibling in the same directory does it correctly**, which kills any "the repo has no idiom" defence: `AdminFlaggedPanel.vue:52` and `:67` both surface *load* failure — `toast(e.message ?? "Failed to load flagged entries", "error")` — via `useToast` (`AdminFlaggedPanel.vue:13,26`). `AdminUserList.vue:170,175,186,197,208,219` does the same for mutations. `AdminAuditLog.vue` imports no toast at all.

**Falsifier** — any reference to `error`, `useToast`, `try/catch`, or an error branch in the subject's template or script. Searched: zero occurrences of `error` and zero of `toast`. Not falsified.

---

### L-2 · BLOCKER — `getAdminToken()!` is an unsound assertion that manufactures a bare developer-string `Error`, which L-1 then paints as an empty audit log.

```ts
// AdminAuditLog.vue:28
const token = auth.getAdminToken()!;
```
The store declares the honest type:
```ts
// web/src/stores/auth.ts:96-98
function getAdminToken(): string | null {
    return adminToken.value;
}
```
The `!` deletes the `null` arm at the type level; nothing deletes it at runtime. `null` flows to `adminFetch(path, token)` → `coreFetch(..., {auth:"admin", adminToken:null})` → `lib/api.ts:127-130`:
```ts
if (!options?.adminToken) {
    throw new Error("coreFetch: auth='admin' requires adminToken");
}
```
That is a **developer-facing invariant string**, not an `ApiProblem` (`lib/api.ts:182` is the typed path for real HTTP failure) — so even a caller that *did* handle `error` would surface prose no admin can act on.

The reachable window is real, not theoretical. The mount is guarded by `v-if="activeTab === 'audit' && gallery.adminMode"` (`GalleryView.vue:385`) — a guard on **`gallery.adminMode`**, not on token presence. `adminLogout()` (`stores/auth.ts:91-94`) nulls the token; any token-clearing path (logout in another tab writing `localStorage`, a manual clear, an expiry sweep) while the audit tab is open leaves the component mounted and its **`nextPage()` / `applyFilters()` handlers live** (`AdminAuditLog.vue:42-50,168-182`). Next click → `null` token → developer-string throw → L-1 → "No audit entries."

Compounding: the identical `!` exists at `AdminUserList.vue:57`, so the unsoundness is a *two-site pattern*, not a one-off — but `AdminUserList` at least renders its failures elsewhere.

**Falsifier** — a null-guard before line 28, a non-null return type on `getAdminToken`, or a mount guard that provably implies a non-null token. `stores/auth.ts:96-98` returns `string | null`; `GalleryView.vue:385` guards on `adminMode`; `AdminAuditLog.vue:27-36` has no guard. Not falsified.

---

## §2 · MAJOR

### L-3 · MAJOR — `actionTone` is blind to the entire `janitor:` namespace. The nine most destructive rows in the log render with the benign informational tone.

```ts
// AdminAuditLog.vue:67-81
if (action.startsWith("delete") || action === "prune_empty_users") { /* red */ }
…
return "text-sky-300 bg-sky-500/10 border-sky-500/20";   // ← default: "informational"
```

`admin_audit` has **two writers**. The second is documented as such in the backend: *"A peer writer into the same collection `admin.py:log_audit` writes"* (`api/services/janitor.py:69`), emitting under a dedicated `janitor:<sweep>` namespace (`janitor.py:71`, `:92-98`). Its nine actions — enumerated in source and pinned by a test that fails loudly on drift (`api/tests/test_janitor_audit.py:45-53,63-78`):

`janitor:hard_delete_visualizations` (`janitor.py:133`) · `janitor:prune_contours` (`:161`) · `janitor:prune_images` (`:177`) · `janitor:delete_expired_sessions` (`:195`) · `janitor:cascade_soft_delete_visualizations` (`:224`) · `janitor:cascade_delete_flags` (`:243`) · `janitor:cascade_delete_sessions` (`:258`) · `janitor:delete_stale_users` (`:269`) · `janitor:prune_audit` (`:285`)

`"janitor:hard_delete_visualizations".startsWith("delete")` → **false**. Not one of the nine matches any branch. All nine take the sky/default tone — the same tone a benign read gets. An automated **hard delete of user visualizations** and an automated **prune of the audit log itself** are colour-coded as routine.

`janitor:prune_audit` deserves separate emphasis: it is the row that records the audit log deleting its own history, and the UI renders it as unremarkable.

**Falsifier** — any branch matching `janitor:`, or a substring test (`includes("delete")`) instead of `startsWith`, or a shared action-taxonomy module. All five branches use `startsWith`/`===` on bare admin-namespace prefixes (`AdminAuditLog.vue:68,71,74,77`); no shared taxonomy exists (the strings are hand-copied literals). Not falsified.

**Class:** stringly-typed cross-tier coupling with no single source of truth and no test on either side of the seam. The backend has a source-grep test that enforces its nine names; the frontend has nothing (L-18).

---

### L-4 · MAJOR — the `action` filter is an **exact** server-side match while the input's own placeholder advertises prefixes. The documented example `set_tier` can never match a row.

Placeholder (`AdminAuditLog.vue:92`):
```html
placeholder="action (e.g. delete, set_tier)"
```
Backend (`api/routers/admin.py:637-638`):
```python
if action:
    filter_doc["action"] = action          # exact equality
```
Contrast the very next clause, which *is* a substring match — and whose placeholder is honest (`AdminAuditLog.vue:99` says "substring match"):
```python
if target:
    filter_doc["target"] = {"$regex": re.escape(target), "$options": "i"}
```

Emitted action strings (`routers/admin.py`): `set_tier:{body.tier}` (`:185`) · `set_user_status:{body.status}` (`:332`) · `batch_visualizations:{body.action}` (`:442`) · `batch_users:{body.action}` (`:495`) · `delete:hard` (`:221`) · `delete:noop` (`:227`) · `delete` (`:230`) · `delete_user` (`:364`) · `prune_empty_users` (`:402`) · `dismiss_flags` (`:608`).

So the placeholder's second worked example, **`set_tier`, matches zero rows for all time** — every tier row is `set_tier:free`/`set_tier:pro`/etc. Its first example, `delete`, matches the bare `delete` rows only and silently drops `delete:hard`, `delete:noop`, `delete_user` and all nine `janitor:*` deletions. An admin filtering for deletions gets a confidently incomplete answer.

Composed with **L-1**, the three states *"no matches" / "malformed query" / "server unreachable"* are pixel-identical.

**Falsifier** — a regex/prefix filter on `action` server-side, or a placeholder that says "exact match". `routers/admin.py:637-638` is bare equality; `AdminAuditLog.vue:92` advertises prefixes. Not falsified.

---

### L-5 · MAJOR — the **Apply** button is bypassable: `nextPage()` fetches with *unapplied* filters against an *unfiltered* page count.

`fetchFn` closes over the raw input refs and dereferences them **at fetch time**, not at Apply time:
```ts
// AdminAuditLog.vue:31-33
action: actionFilter.value || undefined,
target: targetFilter.value || undefined,
```
`nextPage()` → `loadPage(page.value + 1)` → `options.fetchFn(pageSize.value, offset.value)` (`useOffsetPagination.ts:55,44`) — a path that never passes through `applyFilters` (`AdminAuditLog.vue:42-44`). There is **no applied-filter snapshot anywhere in the component.**

Reproduction, entirely static-derivable:
1. Load. `total = 500`, `pageCount = 20`, no filters.
2. Type `dismiss_flags` into the action box. Do **not** press Apply. Displayed rows are still unfiltered, `pageCount` still 20 — correct so far.
3. Click **Next**. `page → 2`; the request goes out **with `action=dismiss_flags`**. The response's `total` (say 3) overwrites `total`; `pageCount` collapses to 1 — but `page` was already set to 2 synchronously at `useOffsetPagination.ts:39`.
4. Result: `page=2`, `pageCount=1`. `hasNext` false, `hasPrev` true, footer hidden entirely (`v-if="pageCount > 1"`, `AdminAuditLog.vue:165`) — **the user is stranded on page 2 of a 1-page result with the pagination control gone**, and `offset` was 25 into a 3-row set, so `entries` is empty and the empty state fires.

The same live-ref read makes `hasFilters` (`AdminAuditLog.vue:52`) describe the *inputs*, not the *result set*: type a filter without applying and both the Clear-filters `X` (`:107`) and the "Try clearing filters to widen the search" hint (`:157`) appear over unfiltered results; conversely, blank the box after applying and the hint that would *explain* an empty list disappears.

**The sibling avoids this by construction.** `AdminUserList.vue:70-74` has no Apply button at all — a 300 ms debounced `watch(searchQuery, … loadPage(1))` keeps input and result convergent. The Apply-button variant is the one that diverges permanently.

**Falsifier** — an applied-filter snapshot ref, or a `fetchFn` parameterised by explicit arguments rather than closure reads, or a `loadPage(1)` forced on any filter mutation. `AdminAuditLog.vue:12-13,31-33,42-50` has none of the three. Not falsified.

---

### L-6 · MAJOR — abort-as-error and a loading/page desync, both caused by an abort key that includes the query string.

`abortKey` is the **full path with query** (`lib/api.ts:250` — `coreFetch<T>(path, /* abortKey */ path, …)`), and `listAuditLog` builds that path from the page and both filters (`lib/api.ts:660-670`). The registry (`lib/api.ts:54-58`):
```ts
function abortable(key: string): AbortSignal {
    inflight.get(key)?.abort();
    const ac = new AbortController();
    inflight.set(key, ac);
    return ac.signal;
}
```

**Arm (a) — identical key ⇒ the predecessor is aborted, and the abort is recorded as a failure.** Double-click **Apply** with unchanged filters, or click Apply while the setup-time `loadPage(1)` (`AdminAuditLog.vue:40`) is still in flight: both produce `/api/admin/audit?page=1&limit=25`, same key, first request aborted. Its `fetch` rejects `AbortError`, which `useOffsetPagination.ts:47-51` treats as a real failure — `error.value = "The user aborted a request."` — and, worse, its `finally` sets `loading.value = false` **while the replacement is still in flight**. The template's `v-if="loading"` (`:119`) therefore falls through to `v-else` (`:124`) with `entries` still `[]`, flashing the "No audit entries" empty state mid-load.

The repo ships the exact discriminator for this and the composable never calls it:
```ts
// lib/api.ts:67-69
export function isAbortError(e: unknown): boolean {
    return e instanceof DOMException && e.name === "AbortError";
}
```
`grep -n "isAbortError" useOffsetPagination.ts` → no hits.

**Arm (b) — differing keys ⇒ no cancellation at all, last-resolver-wins.** `?page=2` and `?page=3` are different keys, so a fast Next-Next leaves **both** in flight. `page.value` is assigned synchronously *before* the await (`useOffsetPagination.ts:39,44`), so if the page-2 response lands after page-3's, `items` holds page-2 rows under the header `3 / N`. An audit log that attributes rows to the wrong page is an integrity failure, not a cosmetic one.

`UNPROVEN-NEEDS-LIVE` — the visible flash duration and the interleaving window need SS-13 timing. The state machine itself is fully static-proven from the four cited line ranges.

**Falsifier** — an endpoint-stable abort key (e.g. `"/api/admin/audit"`), a request-generation guard in `loadPage`, or an `isAbortError` early-return. `lib/api.ts:250` passes the full query path; `useOffsetPagination.ts:38-52` has neither guard nor discriminator. Not falsified.

---

### L-7 · MAJOR — the module-global `inflight` Map grows without bound, and this component's free-text filter is the amplifier.

```ts
// lib/api.ts:52-65
const inflight = new Map<string, AbortController>();
function abortable(key: string) { inflight.get(key)?.abort(); const ac = new AbortController(); inflight.set(key, ac); return ac.signal; }
export function abortInflight(keys: string[]) { for (const key of keys) { inflight.get(key)?.abort(); inflight.delete(key); } }
```
`inflight.set` at `:57` is **never paired with a completion delete**. The only `delete` is `:64`, inside the explicitly-invoked `abortInflight`. `coreFetch` has no `finally { inflight.delete(key) }` (`lib/api.ts:161-206`) — the whole `while(true)` body returns or throws with the registry untouched.

Every *distinct key* therefore retains an `AbortController` for the page's lifetime. For most call sites the key set is small and bounded. **Not here:** the key embeds a user-typed free-text `target` (`AdminAuditLog.vue:33` → `lib/api.ts:666`). Each Apply with a new substring — `abc`, `abcd`, `abcde` while an admin narrows a search — mints a permanent new entry. Cross-multiply with `page`, and the subject is the only surface in the app that can grow this Map arbitrarily from ordinary use.

Small per entry, unbounded in count, never reaped, and never called with `abortInflight` by any consumer of it: `grep -rn "abortInflight" web/src/` finds the export and no call site in this component (which imports `* as api`, so it *could* call it).

**Falsifier** — a `finally`-clause delete in `coreFetch`, a bounded/LRU registry, or an `abortInflight` call on unmount. None of the three exists. Not falsified. `UNPROVEN-NEEDS-LIVE` for the growth *rate* under a real session (SS-13 heap snapshot); the absence of the reap path is static-certain.

---

### L-8 · MAJOR — no teardown of any kind. The setup-time fetch is fire-and-forget and survives unmount.

```ts
// AdminAuditLog.vue:40
loadPage(1);
```
Bare, at setup top level: unawaited, outside any lifecycle hook, with no `onMounted`, no `onUnmounted`, no `onScopeDispose`, no `AbortController`, no `abortInflight`. `grep -E "onMounted|onUnmounted|onScopeDispose|onBeforeUnmount"` on the subject → **zero hits**; the entire `vue` import is `{ ref, computed }` (`:2`).

The tab is `v-if`-gated (`GalleryView.vue:385`), so switching tabs **unmounts** this component. An in-flight audit request then completes against a dead scope: it writes `items.value` / `total.value` / `loading.value` on refs nobody reads, and — per L-7 — leaves its controller in the module-global Map. The request itself is never cancelled, so the wasted round-trip and its bandwidth are charged to a surface the user has left.

`AdminUserList.vue` is again the better neighbour: it at least clears its debounce timer state (`:41`, `:71-74`) — though it, too, omits unmount teardown, so this is a **two-site pattern**, and the cure belongs in `useOffsetPagination` (a `getCurrentScope()` + `onScopeDispose` abort), not in either consumer.

**Falsifier** — any lifecycle hook or abort registration in the subject or the composable. `AdminAuditLog.vue:1-82` and `useOffsetPagination.ts:1-83` contain none. Not falsified.

---

### L-9 · MAJOR — the pagination footer is a **degraded copy** of its sibling's, and it dropped the sibling's documented carry along with its accessibility.

Subject (`AdminAuditLog.vue:164-184`):
```html
<div v-if="pageCount > 1" class="flex items-center justify-center gap-2 text-xs text-muted-foreground">
    <button :disabled="!hasPrev" class="rounded border px-2 py-1 disabled:opacity-30" @click="prevPage()">Prev</button>
    <span>{{ page }} / {{ pageCount }}</span>
    <button :disabled="!hasNext" class="rounded border px-2 py-1 disabled:opacity-30" @click="nextPage()">Next</button>
    <span class="ml-2">{{ total }} total</span>
</div>
```
Sibling (`AdminUserList.vue:428-457`) — same directory, same composable, same `v-if="pageCount > 1"`, same `{{ page }} / {{ pageCount }}`, same `{{ total }} total`, same `class="ml-2"` — but with everything the copy lost:

| Sibling has | Subject has | Line |
|---|---|---|
| `<nav aria-label="User list pagination">` | `<div>` | `AdminUserList.vue:430-434` vs `AdminAuditLog.vue:164` |
| glass-ui `<Button variant="ghost" size="icon">` ×2 | raw `<button class="rounded border …">` ×2 | `:435,446` vs `:168,176` |
| `<ChevronLeft/> <ChevronRight/>` `aria-hidden="true"` | text "Prev"/"Next" | `:443,454` vs `:173,181` |
| `aria-label="Previous/Next page"` | *(none)* | `:440,451` vs `:169,177` |
| `<span aria-live="polite">` on the page counter | plain `<span>` | `:445` vs `:175` |
| the carry comment: *"a canonical glass-ui `<Pagination>` primitive is the named carry"* | *(none)* | `:428-429` |

That last row is the sharpest: the sibling **records the debt**; the copy silently re-incurs it. The census independently books this seam — `@mkbabb/glass-ui/pagination` is a *"PROSE COMMENT — subpath retired upstream"* (`lane-frontend.md:226`, `:358`), i.e. there is a known upstream gap and exactly one of the two consumers is tracking it.

**Falsifier** — a shared `<AdminPagination>` component, or divergent structure that makes the two footers genuinely different requirements. Both render identical semantics with identical class strings; no shared component exists (`ls gallery/` → 12 files, none a pagination primitive). Not falsified.

---

### L-10 · MAJOR — design-system split-brain **inside a single 190-line file**.

`AdminAuditLog.vue:3` imports `{ Button } from "@mkbabb/glass-ui/button"` and uses it at `:103` (`variant="secondary" size="sm"`) and `:106` (`variant="ghost" size="icon"`). Sixty lines later the same file hand-rolls two raw `<button class="rounded border px-2 py-1 disabled:opacity-30">` (`:168`, `:176`) — with a bare `border` utility carrying **no colour class at all**, so the border resolves to the Tailwind default rather than the `border-muted/30` token the rest of the file uses (`:87,93,100,128,134`).

No plausible reason exists: the exact variants needed (`ghost` + `icon`) are already imported and already used two elements earlier, and the sibling proves the glass-ui `<Button>` renders correctly in this exact slot (`AdminUserList.vue:435-455`). Directly against the standing law that glass-ui is the design system and variants belong there, not in ad-hoc consumer markup.

**Falsifier** — a glass-ui `Button` that cannot express a disabled text button, or a documented escape hatch. `:103-115` demonstrates both variants working in-file. Not falsified.

---

## §3 · MINOR

### L-11 · MINOR — `error` and `reset` are **dead exports** of `useOffsetPagination`: zero consumers, repo-wide.

`useOffsetPagination` has exactly two consumers — `AdminAuditLog.vue:4,26` and `AdminUserList.vue:20,54` (`grep -rn "useOffsetPagination" web/src/`). It returns twelve members (`useOffsetPagination.ts:68-82`). Neither consumer destructures `error` (`:74`) or `reset` (`:81`); `pageSize` (`:71`) is likewise never read out (both consumers only pass it *in* as config — `AdminAuditLog.vue:37`, `AdminUserList.vue:65`).

So `error` (declared `:31`, written `:40,48`, returned `:74`) and the whole `reset` function (`:62-66`) are dead weight — and `error` being dead is the *mechanism* of L-1: the composable does capture the failure, and no one has ever wired it up. `reset` is genuinely unreachable code, deletable today.

**Falsifier** — a third consumer anywhere. `grep -rn "useOffsetPagination" web/src/` → 4 hits across 3 files (definition + 2 consumers ×2 lines). Not falsified.

---

### L-12 · MINOR — UTC-sourced audit timestamps are rendered in host-local time with **no timezone marker** and a host-default locale.

Both writers stamp tz-aware UTC — `datetime.now(UTC)` at `routers/admin.py:77` and `services/janitor.py:94` — and `models/admin.py:95` types the field `datetime`, so the wire value carries an explicit offset. The renderer discards that:
```ts
// AdminAuditLog.vue:57-64
return d.toLocaleString(undefined, { year:"numeric", month:"short", day:"2-digit",
                                     hour:"2-digit", minute:"2-digit", second:"2-digit" });
```
`undefined` locale → the host's; no `timeZone`; no `timeZoneName`. Two admins in different zones read the same incident at different wall-clock times with **nothing on screen to reconcile them**, and neither string can be pasted into the `after`/`before` API filters (`lib/api.ts:655-656,664-665`), which take ISO. For forensic reconstruction — the only reason this screen exists — an unmarked local rendering of a UTC record is a correctness defect, not a preference.

Cheap cure: add `timeZoneName: "short"`, or render UTC explicitly.

**Falsifier** — a `timeZone`/`timeZoneName` option, a `title` carrying the raw ISO (the `title` attributes on this row go to `entry.target` `:139` and `entry.ip_hash` `:144`, never the timestamp), or a documented single-timezone deployment. None present. Not falsified.

---

### L-13 · MINOR — a hex-shaped fixed-width truncation applied to a column that carries a non-hash sentinel.

```html
<!-- AdminAuditLog.vue:146 -->
{{ entry.ip_hash.slice(0, 10) }}
```
`ip_hash` is not always a hash. The janitor writes a literal sentinel actor:
```python
# services/janitor.py:51-56
# ``AuditEntry`` (``api/models/admin.py``) requires a string ``ip_hash``. A …
_JANITOR_ACTOR = "system:janitor"
```
`"system:janitor".slice(0,10)` → **`"system:jan"`** — the actor identity truncated mid-word into something that reads like a garbled hash. The one column that answers *"who did this?"* renders the automated actor illegibly, on exactly the nine rows (L-3) whose actor most needs to be unambiguous. Same root cause as L-3: the frontend was written against one of the collection's two writers.

The full value is recoverable via `:title` (`:144`), so this is degradation, not loss — hence MINOR.

**Falsifier** — a sentinel-aware branch, or a truncation keyed on shape rather than a fixed 10. `:142-147` is an unconditional `.slice(0, 10)`. Not falsified.

---

### L-14 · MINOR — `actionTone` hardcodes raw-palette Tailwind classes in a file that is otherwise fully tokenised.

`AdminAuditLog.vue:67-81` returns twelve literal palette classes (`text-red-300 bg-red-500/10 border-red-500/20`, amber, emerald, violet, sky). Every other colour in the same file is a semantic token: `text-muted-foreground` (`:88,130,143,153,166`), `border-muted/40` (`:87`), `bg-muted/5` (`:87,128`), `text-foreground/80` (`:139`). The `*-300` foregrounds are dark-mode-tuned literals with no light-mode counterpart, so their contrast is theme-dependent in a way the tokens are not.

Secondary: fifteen distinct class literals live inside a `.ts` function body rather than in `:class` bindings or a token map, so neither Tailwind's static extractor nor a design-token audit can see them as *tone semantics* — they read as opaque strings.

**Falsifier** — a token-based tone map, a `dark:` variant pairing, or a documented dark-only admin surface. `:67-81` returns bare literals with no variants. Not falsified. `UNPROVEN-NEEDS-LIVE` for the measured light-mode contrast ratio (SS-13 / A-axis).

---

### L-15 · MINOR — an empty `<style scoped>` block: zero CSS emitted, `data-v-*` stamped on every node.

```html
<!-- AdminAuditLog.vue:188-190 -->
<style scoped>
@reference "tailwindcss";
</style>
```
`@reference` is a compile-time directive that emits **nothing**. The block's only runtime effect is that the SFC compiler marks the component scoped and stamps a `data-v-<hash>` attribute on every element in the template — here ~8 static nodes plus **4 per row × 25 rows = 100** more per page, for a stylesheet with no rules.

Repo-wide sweep (rule-lines inside `<style>` after excluding blanks/`@reference`): **4 files at zero** — `AdminAuditLog.vue`, `AdminFlaggedPanel.vue`, `AdminUserList.vue`, `GalleryDraftsSection.vue`; the next-lowest is 11. A bounded four-line deletion, not a systemic issue.

**Falsifier** — any rule in the block, or a `:deep()`/CSS-var declaration relying on the scope id. The block is two lines, one of which is the directive. Not falsified.

---

### L-16 · MINOR — the total-entry count is gated behind `pageCount > 1`, so a small audit log never reports its size.

`{{ total }} total` lives at `AdminAuditLog.vue:183`, inside the block gated by `v-if="pageCount > 1"` (`:165`). With `pageSize: 25` (`:37`), any result of ≤ 25 rows — including **every filtered query that actually narrows well** — hides the count entirely. The one number that tells an auditor "this is the complete set, not a truncated view" disappears precisely when the set is small enough to be trustworthy. Inherited verbatim from the copy source (`AdminUserList.vue:431,456`), so the cure is shared with L-9.

**Falsifier** — the count rendered outside the gate, or a separate header count. `grep "total"` in the template → one occurrence, `:183`, inside the gate. Not falsified.

---

### L-17 · MINOR (class-defining) — **R5-7 applies here at 100 %**: the component registers *zero* loop evidence to any component-callsite-keyed deriver, and pays a re-render cost for it.

The intake row (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT): *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* — proven there by `DERIVED-REGISTRIES.json.leafValues["instance.loop.paper-sidebar"] === []` against the populated, callsite-keyed `instance.loop.presets`. The census carries the instruction forward: *"R5-7 (count native element loops or inherit the blind spot)"* (`CENSUS-2026-08-03.md:362`, F.W4).

**Applied to this component — the count the census asked for:**

| Repeating / interactive surface | Element | Line | Component callsite? |
|---|---|---|---|
| log-row loop, `v-for="(entry, i) in entries"` | native `<div>` | `:125-128` | **no** |
| timestamp cell | native `<span>` | `:130` | no |
| action-tone chip | native `<span>` | `:133` | no |
| target cell | native `<span>` | `:139` | no |
| ip-hash cell | native `<span>` | `:142` | no |
| action filter | native `<input v-model>` | `:89` | no |
| target filter | native `<input v-model>` | `:96` | no |
| Prev / Next | native `<button>` ×2 | `:168,176` | **no** (see L-10) |
| loading spinner | native `<div>` | `:120` | no |

**Loops on native elements: 1 (the only loop in the file). Component-callsite loops: 0.** A deriver keyed to component callsites therefore sees `AdminAuditLog` as ~4 instances (`Button` ×2, `FilterIcon`/`X`/`ScrollText`) and **zero** repeating surface — while the component actually renders up to **25 rows × 4 cells = 100 nodes**, plus 2 inputs and 2 buttons, all invisible. This is worse than the `PaperSidebar.vue` exemplar, where at least the loops were semantic `<li>`; here even the element choice (`div`-grid, not `ul`/`li`) hides the list-ness. The census's own label for this file — *"Audit-log list"* (`lane-frontend.md:107`) — describes a list the DOM does not contain. Any cure must take R6-5's `NATIVE_TEMPLATE_LOOP` shape (`lane-fourier-r3-r6.md:125`).

**The invisibility has a runtime corollary.** Because the rows are native elements inlined in the *parent's* render function rather than a child component, Vue has no props-diff bailout for them: any reactive change in this component's scope re-runs the entire block. `actionFilter`/`targetFilter` are `v-model`-bound in that same scope (`:90,97`), and neither `formatTimestamp` (`:131`) nor `actionTone` (`:135`) is memoised — both are plain function calls in the template. So **every keystroke in either filter box re-executes 25 `new Date(…).toLocaleString(…)` constructions and 25 tone-prefix dispatches**, for a filter that does not even take effect until Apply (L-5). Extracting the row to a child component with an `entry` prop, or precomputing formatted rows in a `computed`, fixes the perf and the derivation blindness at once.

**Falsifier** — any component-based row, any memoisation, or a deriver that already counts native loops. The `v-for` is on a native `div` (`:126`); both helpers are unmemoised calls in the template; R6-5 confirms the deriver had to be *extended* to see them. Not falsified. `UNPROVEN-NEEDS-LIVE` for the magnitude of the per-keystroke cost (25 rows is small; the mechanism is certain, the milliseconds are not — SS-13).

---

## §4 · INFO

### L-18 · INFO — zero test coverage, either side of the seam.

`web/src` contains **no** `*.test.ts` / `*.spec.ts` (`find web/src -name "*.test.ts" -o -name "*.spec.ts"` → empty). The nine e2e specs (`web/e2e/`) never touch the audit tab (`grep -rn "audit\|Audit" e2e/*.spec.ts` → 4 hits, all prose references to `docs/tranches/*/audit/` paths, none exercising the surface). Notably the **backend** *does* pin its half — `api/tests/test_janitor_audit.py:63-78` fails loudly if the nine janitor action names drift — so the seam is guarded on exactly one side, which is why L-3 and L-4 could open and stay open.

**Falsifier** — any unit or e2e test asserting on this component. None found. Not falsified.

### L-19 · INFO — the positional `:key` is *forced by the contract*, not sloppy, and the hazard is latent.

`:key="`${entry.timestamp}-${i}`"` (`:127`) is position-dependent, which would mis-patch any in-place list mutation. But the backend model carries **no identity field** — `AuditEntry` is `timestamp/action/target/ip_hash` only (`api/models/admin.py:94-98`), and pydantic drops the Mongo `_id` on serialisation (`routers/admin.py:655`, `AuditListResponse(items=items,…)` against `models/admin.py:101-102`). With no stable id available, a composite key is the correct available choice, and the composable only ever *wholesale-replaces* `items.value` (`useOffsetPagination.ts:45`) — never splices — so the hazard cannot fire today. Recorded as latent, and as a contract gap should the row list ever gain in-place updates.

**Falsifier** — an id on the wire, or a splice/push against `items.value`. `models/admin.py:94-98` has four fields; `useOffsetPagination.ts:45,65` are the only writes and both are assignments. Not falsified.

### L-20 · INFO — page changes blank the list rather than keeping the previous page.

`v-if="loading"` (`:119`) / `v-else` (`:124`) means every page turn and every Apply replaces the entire table with a centred spinner. The composable exposes a single `loading` flag with no `refreshing`/`initial` distinction (`useOffsetPagination.ts:30,41,50`), so a consumer cannot express keep-previous-while-loading without adding state. Combined with L-6 arm (a), the blank interval can additionally *end early* and flash the empty state. `UNPROVEN-NEEDS-LIVE` for the perceived layout shift (SS-13).

---

## §5 · SUPERLATIVES (L-18 runs both ways — each with its falsifier)

### S-1 · The mount is exemplary: async-chunked **and** `v-if`-gated, so non-admins pay nothing.
`GalleryView.vue:33` — `defineAsyncComponent(() => import("./gallery/AdminAuditLog.vue"))` — and `:385` — `v-if="activeTab === 'audit' && gallery.adminMode"`. Both admin conditions on the gate, and a separate chunk behind them: a non-admin never downloads the bytes and never mounts the tree. All three admin panels get identical treatment (`:31,32,33`), so this is a deliberate house pattern, not an accident. **Falsifier** — a static import, or `v-show` instead of `v-if`. Neither. (This also earns the L-8 teardown gap its severity: `v-if` means real unmounts happen.)

### S-2 · Genuine Goldilocks sizing against sprawling siblings.
190 lines total — ~82 script, ~103 template — with one responsibility and no god-module drift, against `AdminUserList.vue` **529** and `AdminFlaggedPanel.vue` **285** in the same directory (`lane-frontend.md:102,104,107`). Nothing in the file wants extraction on size grounds; the two extractions this challenge *does* argue for (L-9's shared footer, L-17's row component) are correctness- and duplication-driven, not size-driven. **Falsifier** — a second responsibility, or > 300 lines. Neither.

### S-3 · Provably **off** the viz render path — the axis's canvas/WebGL question, answered negatively and closed.
The census establishes the whole app is Canvas2D with **WebGL/WebGPU ABSENT** (`lane-frontend.md:514`; counts at `:26-28` — Canvas2D contexts 4, WebGL 0, `<canvas>` 3). Three independent proofs that none of it reaches this component: (i) the subject contains no `getContext`, no `requestAnimationFrame`, no canvas import — its entire dependency closure is `vue`, `glass-ui/button`, one composable, the api client, a type, and three lucide icons (`:1-8`); (ii) the gallery route mounts no canvas at all — `GalleryCard.vue:99` renders an `<img>`, and `BasisCanvas`/`ConvergencePlot`/`FrequencyGraph` live on the `/v/:slug` and equation routes (`lane-frontend.md:83,131,133`); (iii) the tabs are mutually-exclusive `v-if`s (`GalleryView.vue:242` gallery vs `:385` audit), so even the gallery grid is unmounted while the audit tab is open. Consequently Path A's shared clock self-gates — `if (!playing || !anyCanvasVisible) return` (`lane-frontend.md:520-523`, `stores/animation.ts:48-53`) with `anyCanvasVisible` reference-counted to 0 here — and Path B's *ungated* second clock (`ConvergencePlot.vue:67-69`, the corpus's standing concern) is on another route entirely. **This is why L-17's per-keystroke re-render stays MINOR: it competes with nothing.** **Falsifier** — any `getContext`, rAF, or canvas-mounting component reachable from this subtree, or a `v-show`-based tab host that would keep the grid alive. Searched all four; none.

### S-4 · The composable's provenance comment is a model dependency-decision record.
`useOffsetPagination.ts:9-18` states the fork source and version (`glass-ui v0.9.3`, `src/composables/pagination/useOffsetPagination.ts`), why it was forked (the `@mkbabb/glass-ui/pagination` subpath was retired at v1.0 for zero constellation consumers), the governing authority (`MIGRATION.md §3.1`, "copy from v0.9.3 source"), **and** the rejected alternative with its reason (*"vueuse's `useOffsetPagination` is intentionally NOT a 1:1 swap — it is a passive page-state primitive … The admin call sites in this repo are active-loader-shaped"*). The census corroborates the retirement independently (`lane-frontend.md:226,358`). Most forks in most repos carry none of this. **Falsifier** — an undocumented fork, or a claim in the comment the tree contradicts. Both retirement and shape claims check out.

### S-5 · `formatTimestamp` degrades to the truth, not to a lie — and is the tree's *only* date formatter.
`if (Number.isNaN(d.getTime())) return iso;` (`:56`) — an unparseable timestamp renders as the **raw wire value** rather than the browser's `"Invalid Date"`. On an audit surface that is exactly right: the operator sees what the server actually stored. And the duplication hypothesis this axis invites is **refuted by the tree**: `grep -rn "toLocaleString\|toLocaleDate\|formatDate\|formatTimestamp" web/src/` returns **3 hits, all three inside this file** — there is no competing formatter to converge on and no drift to report. (L-12 stands regardless: being the only formatter does not make an unmarked local rendering of a UTC record correct.) **Falsifier** — an unguarded `toLocaleString`, or a second date formatter elsewhere in `web/src`. Neither.

---

## §6 · Hypotheses tested and **REFUTED** by the tree (recorded so they are not re-litigated)

| Hypothesis | Verdict | Evidence |
|---|---|---|
| The date formatter duplicates one elsewhere in `web/src` | **REFUTED** | 3 grep hits, all in-file. It is the only one. → S-5 |
| The component competes with a live rAF/canvas loop | **REFUTED** | Three independent proofs at S-3; the shared clock self-gates, the second clock is off-route |
| The empty `<style scoped>` is a systemic repo idiom (so out of scope) | **REFUTED as systemic** | Only 4 files at zero rule-lines; next-lowest is 11. Bounded → L-15 stays a real, cheap finding |
| `ip_hash.slice(0,10)` risks hash collisions across distinct actors | **REFUTED** | 10 hex chars ≈ 40 bits; not a practical collision surface. The *real* defect is the non-hash sentinel → L-13 |
| The positional `:key` is careless | **REFUTED** | No identity field exists on the wire (`models/admin.py:94-98`); the composite key is the correct available choice → L-19 (latent only) |
| `loadPage`'s `Math.min(p, pageCount || 1)` clamp mis-clamps on first load | **REFUTED** | `total=0` → `pageCount=1` → `min(1,1)=1`. The clamp is harmless here; the *page/pageCount* desync arrives from L-5's route instead |

---

## §7 · Disposition

**Blockers (2) — L-1, L-2** are one composed failure and must land together: surface `error` (the composable already captures it, L-11) *and* remove the `!` in favour of a real null branch. Until then this screen can display "No audit entries" while the audit log is unreachable, unauthorised, or full.

**Cross-tier seam (L-3, L-4, L-13)** — three defects, one root cause: the frontend was written against *one* of `admin_audit`'s two documented writers and against a filter semantics it never checked. The backend already pins its half with a loud test (`test_janitor_audit.py:63-78`); the frontend pins nothing (L-18). A shared action taxonomy is the structural cure.

**Request lifecycle (L-5, L-6, L-7, L-8)** — all four live in `useOffsetPagination` + `lib/api`'s abort registry, not in the subject's own lines, and all four are shared with `AdminUserList`. Fix once in the composable (applied-filter snapshot; `isAbortError` early-return; request-generation guard; `onScopeDispose` abort) and in `coreFetch` (`finally` reap of `inflight`).

**Duplication (L-9, L-10, L-16)** — the pagination footer wants extracting to one component; the sibling already names the carry this challenge is re-deriving (`AdminUserList.vue:428-429`).

**R5-7 (L-17)** discharges `CENSUS-2026-08-03.md:362`'s F.W4 instruction for this component: **1 native loop, 0 component-callsite loops, ~104 uncounted nodes per page.** Extracting the row to a child component satisfies the derivation model and the re-render cost in one move.
