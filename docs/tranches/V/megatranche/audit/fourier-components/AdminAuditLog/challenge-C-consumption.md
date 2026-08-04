claude-opus-5[1m]

# CHALLENGE · AdminAuditLog.vue · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminAuditLog.vue` (190 lines)
**Date** 2026-08-04 · **Method** static + source-derived only; no browser tooling. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries its own falsifier; three hypotheses died against the tree and are recorded as kills rather than deleted (§4).

## §0 · Read surface (whole, read-only)

| File | Lines read | Why |
|---|---|---|
| `web/src/components/visualization/gallery/AdminAuditLog.vue` | 1–190 (whole) | target |
| `web/src/composables/useOffsetPagination.ts` | 1–83 (whole) | sole composable import |
| `web/src/stores/auth.ts` | 1–143 (whole) | `useAuthStore` / `getAdminToken` |
| `web/src/lib/api.ts` | 1–672 (whole) | `listAuditLog`, `adminFetch`, `coreFetch`, `abortable`, `isAbortError` |
| `web/src/lib/types.ts` | 173–195 | `AuditEntry`, `AuditListResponse` |
| `@mkbabb/glass-ui@4.0.0` `button` / `badge` / export map | d.ts + dist cva | consumed + shadowed primitives |
| `lucide-vue-next` | import site only | uplift surface |
| — corroborating, not imported — | | |
| `web/src/components/visualization/GalleryView.vue` | 1–60, 350–400 | the sole mount site + admin gate |
| `web/src/components/visualization/gallery/AdminUserList.vue` | 1–70, 150–240, 430–460 | the sibling that uses the *same* composable |
| `web/src/components/visualization/gallery/AdminFlaggedPanel.vue` | 1–60 | the sibling that does *not* |
| `web/src/components/visualization/gallery/GalleryCard.vue` | 108–130, 260–275 | in-repo `Badge` precedent |
| `api/routers/admin.py` | 60–90, 180–235, 320–500, 600–655 | the 10 `log_audit` writers + `GET /api/admin/audit` |
| `api/models/admin.py` | 1–106 | the response contract |
| `api/services/database.py` | 10–30 | motor `tz_aware` |
| `web/src/style.css`, `web/src/lib/colors.ts`, `web/package.json` | token/pin surface | consumption baseline |

**Consumption baseline, measured.** value.js symbols: **0**. keyframes symbols: **0**. glass-ui symbols: **1** (`Button`, `:3`). fourier API operations: **1 of 45** (`listAuditLog`). This matches the corpus: lane-frontend §5 records the whole repo's value.js surface as *5 statements / 4 files / 6 symbols, easing-only* (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) and AdminAuditLog is in none of them. CENSUS-2026-08-03 §agree-row 38 concurs. **The F.W2 migration surface (bare specifiers → `/easing`; delete the `colors.ts` hand-rolled arms) does not touch this file** — but §2 D-3/D-4 argue the *second* half of F.W2's charter (hand-rolled colour) has a second, undeclared home right here.

---

## §1 · BLOCKER

### D-1 · BLOCKER · The pagination error channel is destructured away; a failed audit fetch renders as a silent, stale *success*
`AdminAuditLog.vue:15-26` · `useOffsetPagination.ts:31,44-52,71` · `api/routers/admin.py` (server side)

`useOffsetPagination` returns `error` (`useOffsetPagination.ts:31` declares it, `:71` exports it). The component's destructure at `:15-26` takes ten members and **omits `error`**. It also imports no `useToast` — verified by grep, zero hits in the file — while *both* sibling admin panels do (`AdminUserList.vue:22,37`; `AdminFlaggedPanel.vue:53-55`). There is no global fallback: `grep -rn "errorHandler\|onErrorCaptured" web/src` → **empty**, and in any case the composable *catches*, so no boundary could fire.

The composable's catch (`:47-49`) sets **only** `error`. It does **not** reset `items` or `total`. And `page.value` was already mutated at `:39` — *before* the fetch is issued at `:44`.

**Failure scenario.** An operator is on page 2 of a 10-page audit log and clicks **Next**. The admin bearer token has expired server-side → `coreFetch` throws `ApiProblem` (`api.ts:172`) → the composable catches → `loading` returns false (`:51`). The footer now reads `3 / 10` and `250 total` (`AdminAuditLog.vue:175,183`) while the rows on screen are **still page 2's**, and nothing anywhere indicates a failure. The same path covers 401/403 (token revoked), 500, a 429 that exhausted its 2 retries (`api.ts:165-171`), and the `adminToken`-missing throw at `api.ts:128-130`.

On an audit log — the compliance surface of record, the one screen whose entire purpose is *this is what happened* — presenting stale rows under a fresh page number with no error is worse than a blank screen. That is what promotes this above MAJOR.

**Falsifier (survived).** The claim dies if any one of: (a) the composable cleared `items` on error → it does not, `:47-49` touches only `error`; (b) the component rendered `error` → not destructured, `:15-26`; (c) a global handler surfaced it → none exists; (d) `page` were assigned after a successful fetch → it is assigned first, `:39`. All four checked against the tree.

**Repair shape.** Destructure `error`, render it where the empty state lives (`:151-160`), and gate the empty state on `!error`. Or adopt the sibling idiom: `useToast` + `isAbortError`, matching `AdminFlaggedPanel.vue:52-55`.

---

## §2 · MAJOR

### D-2 · MAJOR · The `action` filter is exact-match server-side; the placeholder promises otherwise, and the example it gives can never match
`AdminAuditLog.vue:32,92` · `api/routers/admin.py:640-643` · `api/routers/admin.py:185,221,227,230,332,364,402,442,495,608`

The server treats the two filters **asymmetrically**:

```
admin.py:640-641   if action:  filter_doc["action"] = action                       # exact equality
admin.py:642-643   if target:  filter_doc["target"] = {"$regex": re.escape(target), "$options": "i"}
```

The client's placeholders are `"action (e.g. delete, set_tier)"` (`:92`) and `"target (substring match)"` (`:99`). The target placeholder is **correct**. The action placeholder implies the same substring/prefix semantics and is **wrong** — and worse, one of its two worked examples is unreachable.

I enumerated every `log_audit` writer in the repo (`grep -rn "log_audit(" api/` → 10 sites, all in `admin.py`). The complete stored vocabulary:

| Stored `action` | Site | Exactly typeable? |
|---|---|---|
| `set_tier:{tier}` | :185 | ✗ — `set_tier` alone matches nothing |
| `delete:hard` / `delete:noop` / `delete` | :221 / :227 / :230 | ✓ (each, verbatim) |
| `set_user_status:{status}` | :332 | ✗ |
| `delete_user` | :364 | ✓ |
| `prune_empty_users` | :402 | ✓ |
| `batch_visualizations:{action}` | :442 | ✗ |
| `batch_users:{action}` | :495 | ✗ |
| `dismiss_flags` | :608 | ✓ |

**Four of the six action families are unfilterable by their family name.** The placeholder's own example, `set_tier`, is one of them.

**Failure scenario.** An operator investigating a curation dispute types `set_tier` and presses Enter (`:94`). The request goes out with `action=set_tier`, Mongo matches zero documents, and the component renders `"No audit entries"` plus *"Try clearing filters to widen the search."* (`:156-158`). The operator's reasonable reading: **no tier changes were logged.** The truth: every tier change was logged, under `set_tier:featured` / `set_tier:normal`. The UI actively coached a false negative on a moderation-evidence surface.

This is an operation↔client leaf-coupling defect in the R6-8 sense (intake row R6-8: *operation identity is independent of client identity; the join is a separate relation*). The operation's `action` parameter is exact-match; the client leaf advertises fuzzy. Nothing in the tree joins the two, so the drift is invisible to both sides.

**Falsifier (survived).** Dies if any `log_audit` call writes a bare `set_tier` / `set_user_status` / `batch_*` → enumerated all 10 sites above, none does. Dies if the server ever regexes `action` → `:640-641` is a bare assignment, no `$regex`. Dies if the client pre-expanded the input (e.g. appending `:`) → `:32` forwards `actionFilter.value` verbatim.

**Note for F.W5.** This row belongs in the 45/30/13 join. Either the placeholder becomes honest (`action (exact, e.g. delete, set_tier:featured)`), or the operation's `action` filter becomes a prefix/regex match to match its own client. The second is the better repair and is a **contract change**, so it is co-signed work, not a client-local fix.

---

### D-3 · MAJOR · The action chip hand-rolls `glass-ui/badge`, which ships at the PINNED 4.0.0 and is already imported twice in the same folder
`AdminAuditLog.vue:67-81,133-138` · `@mkbabb/glass-ui@4.0.0` `dist/components/ui/badge/index.d.ts`, `dist/badge-UILT_3pZ.js` · `GalleryCard.vue:4,115-125,267-274`

`:133-138` builds a pill from raw markup —
```
class="rounded border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide"
:class="actionTone(entry.action)"
```
— and `actionTone` (`:67-81`) is a 5-arm colour decision function feeding it.

Glass-ui at the **installed, pinned 4.0.0** exports `./badge` (one of 80 subpaths; verified from the installed `package.json` exports map). Its cva (read from `dist/badge-UILT_3pZ.js`) declares:

```
variant: default | secondary | destructive | outline | success | warning | info
size:    sm | md | lg
base:    "focus-ring inline-flex items-center gap-1.5 rounded-badge border font-semibold
          transition-control wrap-anywhere …"
sm:      "text-[length:var(--control-text-sm)] leading-4 px-2 py-0.5"
```
and stamps `data-slot="badge" data-variant data-size` on the root.

**Four of `actionTone`'s five arms are 1:1 with a shipped variant:**

| `actionTone` arm | Line | Shipped variant |
|---|---|---|
| red (`delete*`, `prune_empty_users`) | :68-69 | `destructive` |
| amber (`set_user_status*`) | :71-72 | `warning` |
| emerald (`set_tier*`, `dismiss*`) | :74-75 | `success` |
| sky (fallthrough) | :80 | `info` |
| violet (`batch*`) | :77-78 | *no direct analogue* |

The fifth has a **documented in-repo precedent**: `GalleryCard.vue:115-125` renders `<Badge variant="outline" size="sm" :style="{ '--pill-c': b.color }">` with a scoped `.basis-tint` recipe at `:267-274` (`color-mix(in srgb, var(--pill-c) 12%, transparent)` plate + 30 % border + text) — authored under a comment that names the pattern explicitly. That is exactly the shape the violet batch arm wants.

The hand-roll loses, concretely: `focus-ring`, `rounded-badge`, `transition-control`, `wrap-anywhere`, the `data-variant`/`data-size` test hooks, and `--control-text-sm` — replaced by a magic `text-[0.65rem]` (`:134`) that ignores glass-ui's `--ui-scale`.

**Falsifier (survived).** Dies if `./badge` were absent at 4.0.0 → it is present (installed export map; `dist/badge.js` re-exports `Badge` + `badgeVariants`). Dies if no repo precedent existed → `GalleryCard.vue:4` and `GalleryCardModal.vue:3` both import it. Dies if `Badge` lacked the tones → the cva above lists them. Dies if `./badge` were removed at 7.0.0 (making the shadow moot post-uplift) → lane-frontend §5's measured REMOVED list (21 subpaths) does **not** contain `./badge`.

**Corpus fold.** lane-frontend §4 tabulates *"9 components / ~1 990 LOC"* of shadow surface (GlassTimeline, EasingPicker, BasisCanvas, …). **This chip is not in that table** — it is sub-component-sized, so a file-granular shadow census misses it. Recommend the census gain a *fragment shadow* row; on the same logic `:119-120`'s hand-rolled spinner and `:168-182`'s raw pagination buttons (D-10) are also fragment shadows.

---

### D-4 · MAJOR · The five tone triples are single-theme raw palette classes, bypassing the exact token discipline this repo documents and enforces elsewhere
`AdminAuditLog.vue:69,72,75,78,80` · `web/src/style.css:113-127` · `components/layout/DarkModeToggle.vue` · `lib/colors.ts`

The five arms hard-code Tailwind palette literals: `text-red-300 bg-red-500/10 border-red-500/20`, and the amber / emerald / violet / sky analogues. `-300` foregrounds on 10 %-alpha plates are **dark-mode-tuned values**. The app is not dark-only: it ships `DarkModeToggle.vue` (109 LOC, consuming `useGlobalDark` from `@mkbabb/glass-ui/dark`), `style.css` declares both `:root` (`:119`) and `.dark` (`:123`), and `lib/colors.ts:89-96` re-resolves the viz palette on theme toggle via a `MutationObserver`.

The repo's own standard is written down four lines above the `:root` block:

> *`--background` — fails WCAG AA for normal text. The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA). Dark-mode value stays put.* — `style.css:113-118`

So this tree already (a) knows the AA bar, (b) measures ratios, (c) accepted a light/dark split token to clear it, and (d) filed the upstream glass-ui carry. `AdminAuditLog` opts out of all of it.

**Density measurement.** `grep -rhoE "text-(red|amber|emerald|violet|sky)-[0-9]{3}" web/src | sort | uniq -c`: repo-wide there are **8** `-300`-weight tone sites; **AdminAuditLog owns 5 of them**, and is the **sole** owner of `violet-300`, `sky-300`, and `emerald-300`. It is the densest raw-palette colour-decision site in the frontend outside `lib/colors.ts` itself.

**This is F.W2's charter, at a second address.** CENSUS-2026-08-03 §F.W2 reads *"delete the `colors.ts` hand-rolled arms (declared 3-line hex residual)"*, and §risk-174 records `colors.ts` as *"a 117-line hand-rolled regex file … no `oklch()` arm."* The census scopes hand-rolled colour to one file. `actionTone` is a second hand-rolled colour authority — smaller, but on the *semantic* axis (severity→tone) rather than the parse axis, and therefore not curable by the same repair. **F.W2 should be widened, or this row explicitly excluded with reasons.** Recorded as a contradiction-to-corpus, per lane law.

**Falsifier (partially survived).** Dies if the app were dark-only → it is not (four independent proofs above). Dies if `-300` classes were theme-remapped → they are stock Tailwind v4 palette entries, `style.css` remaps only `--viz-*` / `--section-color-*`. The *exact* contrast ratios in light mode are `UNPROVEN-NEEDS-LIVE` (no browser this pass) — but the ratio is not the claim; the claim is that a single-theme literal was used where a two-theme token exists and the repo's own comment says why that matters. That half is fully static-proved.

---

### D-5 · MAJOR · Filter changes and page changes cannot cancel each other, because the abort key embeds the query string — last write wins
`AdminAuditLog.vue:40,43,49` · `api.ts:53-58,229` · `useOffsetPagination.ts:38-52`

`adminFetch` passes the **full path, query string included**, as the abort key:

```
api.ts:229    return coreFetch<T>(path, /* abortKey */ path, { …auth:"admin"… });
api.ts:53-58  function abortable(key) { inflight.get(key)?.abort(); … }
```

`listAuditLog` builds `path` as `/api/admin/audit?page=…&limit=…&action=…&target=…` (`api.ts:656-660`). So **every distinct page/filter combination is a distinct key**, and `abortable()` never fires across them. Meanwhile `useOffsetPagination` carries no request-sequence guard: `loadPage` (`:38-53`) is re-entrant, and the winner is simply whoever assigns `items.value` last (`:45`).

**Failure scenario.** The component fires `loadPage(1)` at setup (`AdminAuditLog.vue:40`) — unfiltered, key `…?page=1&limit=25`. The operator immediately types `delete` and presses Enter (`:94` → `applyFilters` → `loadPage(1)`) — key `…?page=1&limit=25&action=delete`. Different keys ⇒ **both requests run**. The filtered query is narrow and returns fast; the unfiltered 25-row page returns second and **overwrites it** (`:45`). The operator now sees unfiltered audit rows while `actionFilter` reads `delete` and `hasFilters` is true (`:52`). Worse, `loading` was already cleared by the *first* `finally` (`:51`), so the second repaint happens with **no spinner** — nothing on screen marks it as a change. Same shape for `clearFilters` (`:46-50`) racing an in-flight page, and for rapid Prev/Next (`:171,179`), which have no `loading` guard either (`:55-62`).

**Falsifier (survived).** Dies if the abort key were the query-stripped path → `api.ts:229` passes `path` unmodified. Dies if the composable held a sequence token → `:38-53` has none. Dies if `loading` gated re-entry → `nextPage`/`prevPage` check only `hasNext`/`hasPrev` (`:55-62`), and `applyFilters` checks nothing. Dies if Vue's reactivity happened to serialize them → these are independent promises.

**Note.** The *identical-key* case (double-clicking Apply with unchanged text) does abort correctly — and that path leads straight into D-6.

---

## §3 · MINOR

### D-6 · MINOR · `useOffsetPagination` misclassifies `AbortError` as a load failure; `api.ts` exports the predicate and 10 other call sites use it
`useOffsetPagination.ts:47-49` · `api.ts:66-68` · `stores/gallery.ts:78,99,174,185` · `stores/workspace.ts:128,183,226,255,277,302`

```
useOffsetPagination.ts:47-49
  } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load";
```
No `isAbortError` check — yet `api.ts:66-68` exports exactly that predicate, and **10 call sites** across `stores/gallery.ts` and `stores/workspace.ts` consume it in precisely this position (`if (!api.isAbortError(e)) toast(…)`). The composable is the odd one out.

Consequence today is masked **only by D-1**: the spurious error is never rendered. **The two defects hide each other**, which is the interesting part — repairing D-1 in isolation would immediately surface bogus *"signal is aborted without reason"* messages on every double-Apply. Sequence the repairs: D-6 first, then D-1.

**Falsifier (survived).** Dies if abort could not reach this catch → same-key aborts do occur (`api.ts:53-58`, D-5's identical-key case). Dies if the predicate did not exist → `api.ts:66-68`.

**Scope honesty.** This is a **shared-composable** defect. `AdminUserList.vue:42-64` inherits it identically. File as a consumer-lane carry, not an AdminAuditLog-local fix.

### D-7 · MINOR · `getAdminToken()!` discards the one type-level guarantee the auth store offers; the runtime guarantee lives in a different module with no compile-time link
`AdminAuditLog.vue:28` · `auth.ts:97-99` · `GalleryView.vue:385` · `stores/gallery.ts:106-121` · `api.ts:128-130`

`getAdminToken(): string | null` (`auth.ts:97-99`). `:28` writes `auth.getAdminToken()!`. The runtime safety actually comes from `GalleryView.vue:385` (`v-if="activeTab === 'audit' && gallery.adminMode"`) plus `gallery.ts:106-114`, which sets `adminMode = true` only after `verifyAdmin` succeeds and `adminLogin(token)` has run. **No type or lint rule binds the mount gate to the assertion.** If null ever reaches it, `coreFetch` throws `"coreFetch: auth='admin' requires adminToken"` (`api.ts:128-130`) — straight into D-1's silent-empty-log.

**Falsifier (partially killed — honest downgrade).** I attempted to construct a live null path and **failed**: `adminMode` and `adminToken` are set together (`gallery.ts:106-114`) and cleared together (`:117-121`), `adminMode` is a non-persisted `ref(false)` (`gallery.ts:39`) so a reload cannot resurrect the tab without the token, and cross-tab localStorage clearing does not mutate this store instance's ref. **So this is a structural type-lie, not a proven crash.** MINOR, not MAJOR. It is also the repo idiom (`AdminUserList.vue:57,159,181,192,203,214`; `AdminFlaggedPanel.vue:38`) → lane carry.

### D-8 · MINOR · Batch *deletes* render in the non-destructive violet tone — the most destructive operation in the vocabulary is coloured like `unsuspend`
`AdminAuditLog.vue:68,77-78` · `api/routers/admin.py:442-446,461-475,495-498`

`actionTone` tests `action.startsWith("delete")` **first** (`:68`). But batch writes are `f"batch_users:{body.action}"` (`admin.py:495-498`) and `f"batch_visualizations:{body.action}"` (`admin.py:442-446`). `batch_users:delete` does not *start with* `delete`, so it falls through to `startsWith("batch")` (`:77`) → **violet**.

`batch_users:delete` is the single most destructive operation in the whole audit vocabulary — `admin.py:461-475` cascades, per slug: `flags.delete_many` → `visualizations.delete_many` → `sessions.delete_many` → `users.delete_one` → `invalidate_suspension_cache`. It renders in **exactly the same tone** as `batch_users:unsuspend`. On an audit log, colour *is* the severity signal; this inverts it for the highest-severity row class.

**Falsifier (survived).** Dies if the red arm matched a substring rather than a prefix → `:68` is `.startsWith`. Dies if `batch` were tested after a destructive-suffix test → `:77` is the fourth arm, unconditionally reached for all `batch_*`. Dies if `batch_users:delete` were never written → `admin.py:495-498` writes it on every batch-delete.

### D-9 · MINOR · Timestamps render in the *viewer's* local zone with no timezone indicator
`AdminAuditLog.vue:54-64`

`d.toLocaleString(undefined, { year, month, day, hour, minute, second })` — the locale is `undefined` (host default) and **no `timeZone` is pinned and no `timeZoneName` is requested**. Two admins in different zones reading the same audit row see different times, and neither rendered string says which zone it is. For an evidentiary log correlated against server logs and incident timelines, an unlabelled local rendering is a real defect.

**Falsifier (survived, and one sub-hypothesis killed — see §4 K-1).** Dies if the app pinned UTC — it does not. Dies if the format string carried a zone — it does not (`:57-64`).

### D-10 · MINOR · Pagination uses raw `<button>` while the sibling on the same composable uses glass-ui `Button`; inconsistent within a single 190-line file
`AdminAuditLog.vue:103-115 vs :168-182` · `AdminUserList.vue:435-455`

The filter bar uses glass-ui `Button` correctly (`:103` `variant="secondary" size="sm"`, `:106-115` `variant="ghost" size="icon"`). Sixty lines later the pagination uses raw `<button … class="rounded border px-2 py-1 disabled:opacity-30">` (`:168-174`, `:176-182`). The sibling on the *same composable* does it the other way: `AdminUserList.vue:435-455` uses `<Button … :disabled="!hasPrev" aria-label="Previous page">` with `ChevronLeft`/`ChevronRight`.

Lost: `focus-ring`, glass-ui's disabled recipe (replaced by hand-rolled `disabled:opacity-30`), `transition-control`, and the `data-slot` hooks.

**Falsifier (partially killed — scope honesty).** I checked whether this is an a11y hole: it is **not**. The visible text `Prev`/`Next` supplies the accessible name, and `:disabled` is a native attribute on a native button, so keyboard and AT behaviour are correct. The claim is therefore **design-system drift + focus-ring loss**, not an a11y break. Dies if glass-ui `Button` lacked a `disabled` passthrough — it is a button wrapper and `AdminUserList.vue:439` already relies on it.

### D-11 · MINOR · The result count is unreachable in exactly the case an operator most needs it
`AdminAuditLog.vue:164-165,183`

The whole pagination block, including `{{ total }} total` (`:183`), sits behind `v-if="pageCount > 1"` (`:165`). With ≤25 matching rows — i.e. **every well-targeted filter query, and every zero-result query** — the operator is never told how many rows matched. *"How many `delete_user` events are there?"* is the primary question an audit filter answers, and the number is present in the payload (`result.total`, `:35`) and bound to a ref (`:17`) that never renders under those conditions.

**Falsifier (partially survived).** The rendered row count is countable by eye for ≤25 rows, so the number is *inferable*. But it is never *stated*, and at 0 results there is nothing to count — leaving `"No audit entries"` (`:156`) ambiguous between *the query ran and matched nothing* and *the query never ran* (which, per D-1, is a live possibility).

### D-12 · MINOR · Two of the operation's six parameters are unreachable from any UI; the date-range filter exists end-to-end except for the client leaf
`api.ts:649-667` · `api/routers/admin.py:624-640` · `AdminAuditLog.vue:29-34`

`listAuditLog` declares `{page, limit, action, after, before, target}` (`api.ts:650-657`) and serialises `after`/`before` (`api.ts:663-664`). The server implements them fully: `Query(default="")` at `admin.py:624-625`, and a real range filter at `:634-640` (`ts_filter["$gte"] = datetime.fromisoformat(after)`, `["$lte"] = …before`, applied as `filter_doc["timestamp"]`).

**AdminAuditLog is the sole caller** — `grep -rn "listAuditLog" web/src` returns exactly two hits: the definition (`api.ts:649`) and this call site (`:29`). It passes four parameters and never `after`/`before`. Therefore the date-range capability of this operation is **dead across the entire product**, despite being implemented on both the transport and the server.

A date range is the most-used affordance on any audit log ("what happened during the incident window?"). This is an R6-8-shaped gap: operation identity ≠ client identity, and here the join has a hole that neither side's own inventory reveals. **Route to F.W5's 45/30/13 join** — it is a concrete instance of the census's *36/9 client-gap* row (R3-7c).

---

## §4 · INFO — and the three hypotheses that died

### D-13 · INFO · The envelope's `page`/`pages` are discarded and silently re-derived client-side
`AdminAuditLog.vue:35` · `useOffsetPagination.ts:33` · `types.ts:180-185` · `admin.py:649`

`AuditListResponse` carries `{items, total, page, pages}` (`types.ts:180-185`; `models/admin.py:101-105`). `:35` forwards only `{data: result.items, total: result.total}`; the composable recomputes `pageCount = Math.max(1, Math.ceil(total / pageSize))` (`:33`). **Today the two agree exactly** — the server computes `pages = math.ceil(total / limit)` (`admin.py:649`) from the same inputs. So this is redundancy, not divergence.

**Falsifier (kills the severity, not the row).** It becomes a divergence the instant the server clamps `limit` (it declares `le=100`, `admin.py:622`) or changes its paging rule; the client would keep its own arithmetic in silence. `pageSize` is 25, well under 100 — **no live divergence**. INFO.

### D-14 · INFO · `page` is round-tripped through `offset` and back, losslessly
`AdminAuditLog.vue:30` · `useOffsetPagination.ts:34`

`page: Math.floor(offset / limit) + 1` where `offset` was itself computed as `(page - 1) * pageSize` (`:34`). A no-op that exists only because `fetchFn`'s signature is offset-shaped while the operation is page-shaped. **Falsifier:** with integer `pageSize` the round trip is exact — legibility cost, not a bug. Same shape at `AdminUserList.vue:59`; if the composable is ever revised, adding a page-shaped `fetchFn` overload retires both.

### D-15 · INFO · The row key is self-cancelling: index-contaminated *and* timestamp-contaminated
`AdminAuditLog.vue:126-127`

`:key="`${entry.timestamp}-${i}`"`. Because `i` is in the key the key is positional, so the timestamp adds nothing a bare `i` would not. Conversely, two rows *can* share a timestamp (BSON ms precision), so `i` is what makes it unique. Neither half is doing honest work. **Falsifier (kills severity):** `entries` is only ever wholly reassigned (`useOffsetPagination.ts:45`), never patched in place, so no misapplied-patch scenario is reachable. INFO.

### D-16 · INFO · An empty `<style scoped>` still stamps a scope id on every rendered element
`AdminAuditLog.vue:188-190`

The block contains only `@reference "tailwindcss";` — zero rules — yet the SFC compiler emits `__scopeId` whenever a `scoped` block is *present*, so every element in the 25-row list carries a `data-v-*` attribute. **Repo idiom, not a local defect**: identical rule-less blocks in `AdminFlaggedPanel.vue`, `AdminUserList.vue`, `GalleryDraftsSection.vue`, `GalleryInfiniteGrid.vue` (measured: 5 gallery components with 0 non-`@reference` style lines). **Falsifier:** dies if Vue elided the scope id for rule-less blocks — it keys off block presence, not content. The DOM-weight half is `UNPROVEN-NEEDS-LIVE`. Lane carry.

### D-17 · INFO · No runtime validation at the API boundary — and the component's defensiveness is inconsistent rather than principled
`AdminAuditLog.vue:56,135,140,146` · `types.ts:173-178` · `admin.py:651`

`AuditEntry` is a compile-time-only contract; `entry.ip_hash.slice(0, 10)` (`:146`) would throw a render-time `TypeError` on a missing field, taking the whole tab down.

**Falsifier (largely kills it).** The server does guarantee the shape: `return AuditListResponse(items=items, …)` (`admin.py:651`) runs pydantic validation over the raw Mongo docs, and `AuditEntry` (`models/admin.py:94-98`) declares all four fields as required with no `model_config`/`ConfigDict` anywhere in the file (grep → empty). A legacy row missing `ip_hash` yields a **500**, never a malformed 200. So the crash is unreachable through the live server → INFO.

**What survives, and is worth recording:** the component guards `timestamp` (`:56`, NaN → return raw ISO) and `target` (`:140`, `|| "—"`), and guards **neither** `action` (`:135`) nor `ip_hash` (`:146`). The defensiveness is uneven, so a future contract change lands with an uneven blast radius.

---

### Killed hypotheses (recorded so they are not re-raised)

**K-1 · Timestamps are *not* offset-less; there is no UTC→local shift.** I hypothesised that Mongo returned tz-naive datetimes, that FastAPI serialised them without an offset, and that `new Date(iso)` (`:55`) would then parse them as **local** per ECMA-262 — a silent hours-wide shift on every audit row. **FALSE.** `api/services/database.py:26-28` constructs the production client as `AsyncIOMotorClient(settings.mongo_uri, serverSelectionTimeoutMS=5000, tz_aware=True)`, with the rationale in the comment above it. Aware UTC round-trips, FastAPI emits `+00:00`, `new Date()` parses correctly. The repo demonstrably understands the distinction: `api/tests/test_crud_lib_softdelete.py:19-33` pins a throwaway `tz_aware=False` client *specifically* to exercise the naive case, noting the conftest client "re-attaches UTC on read, hiding the naive case." Only the presentational half survives → D-9.

**K-2 · The raw `<input>` filters are *not* an AdminAuditLog defect.** Glass-ui 4.0.0 exports `./forms` (→ `components/ui/input`, `textarea`, `combobox`, `useUserInvalidAria`), so a producer `Input` exists. But `AdminUserList.vue:243` uses a raw `<input>` too, and `grep -rn "glass-ui/forms" web/src` → **empty**: the repo has *never* adopted `./forms`. This is a repo-wide non-adoption row for the lane census, not a per-component challenge. L-18 both ways — I decline to charge it here.

**K-3 · `actionTone`'s default arm is unreachable, not a fallback gap.** I expected an unhandled-action gap. Enumerating all 10 `log_audit` writers (§D-2 table) shows **every** live action matches a non-default arm; the sky fallthrough at `:80` is dead code today. That is a *superlative* (S-2), not a defect — with D-8 as its one genuine mis-routing.

---

## §5 · Superlatives (L-18 runs both ways)

**S-1 · `useOffsetPagination`'s fork provenance is the reference standard for a consumer-owned fork.** `useOffsetPagination.ts:3-19` states the upstream path (`glass-ui/src/composables/pagination/useOffsetPagination.ts`), the exact version forked from (v0.9.3), the retirement event (the v1.0 cut), the retirement *reason* (zero production consumers across the constellation), the sanctioned procedure it followed (`MIGRATION.md §3.1`, "copy from v0.9.3 source"), **and** it pre-empts the obvious reviewer objection with a correct technical distinction: vueuse's `useOffsetPagination` is a *passive* page-state primitive with an external `total` ref and no fetch loader, while these call sites are active-loader-shaped. **Falsifier: run against the tree.** `./pagination` is genuinely absent from glass-ui 4.0.0's 80 export subpaths (checked the installed exports map directly). Every load-bearing claim in that comment verified. This is exactly what a fork comment should look like, and it is why D-6 below it reads as an oversight rather than negligence.

**S-2 · `actionTone` is exhaustive over the live backend vocabulary.** All **10** `log_audit` writers repo-wide (`admin.py:185,221,227,230,332,364,402,442,495,608`) map to a non-default arm; the fallthrough at `:80` is unreachable today. Achieving exhaustiveness across two repos with no shared enum and no generated type is a real, unusual discipline. **Falsifier:** enumerated by exhaustive grep, not sampling — see the §D-2 table. (D-8 is a mis-*routing* within an exhaustive map, which is a strictly smaller defect than a gap.)

**S-3 · The component is uplift-cheap by construction.** Against lane-frontend §5's measured 4.0.0→7.0.0 break table, F.W1's atomic tri-package uplift (`glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0`) costs this file **one line**: `lucide-vue-next` → `@lucide/vue` at `:8`. It imports none of the 21 removed subpaths (`./button` is not in the removed list), no `MetricBadge`, no `HoverPopover`, no `DockIconButton`, no `ToastVariant`, no value.js symbol, no keyframes symbol. **Falsifier:** cross-checked the file's four external import statements (`:3` glass-ui/button, `:4` local, `:5` local, `:8` lucide) against lane-frontend §5's "Rows that hit fourier-analysis TODAY" table, row by row. Note the tension this creates with D-3/D-4: the file is uplift-cheap *because* it hand-rolls rather than consumes. Cheap uplift bought with design-system debt is not free — but the uplift cost is real and should be banked.

**S-4 · `formatTimestamp` refuses to fabricate.** `:55-56` — `if (Number.isNaN(d.getTime())) return iso;` returns the **raw ISO string** rather than `"Invalid Date"` or a blank. On an evidentiary surface, degrading to the unparsed source value is the correct failure mode: the operator still sees the true bytes. Small, and exactly right.

**S-5 · Every truncation is paired with the full value.** `:139` `:title="entry.target"` beside `{{ entry.target || "—" }}` with `truncate`; `:142-146` `:title="entry.ip_hash"` beside `{{ entry.ip_hash.slice(0, 10) }}`. Truncation that silently hides evidence would be a defect on an audit log; both sites recover it. **Falsifier (honest limit):** `title` is hover-only — not keyboard-reachable and not announced by all AT — so the recovery is mouse-privileged. The *instinct* is right; the mechanism is the weakest one that satisfies it.

**S-6 · The audit envelope redacts `_id` structurally, without needing the helper.** `_public_doc` (`admin.py:85-87`) strips `_id`/`liked_ips`, and the audit path never calls it — `:648` passes raw Mongo docs straight into `AuditListResponse(items=items, …)` (`:651`). It leaks nothing anyway: `AuditEntry` (`models/admin.py:94-98`) declares four fields with **no `model_config`/`ConfigDict`** in the file (grep → empty), so pydantic's default extra-ignore drops `_id` before serialisation. **Falsifier:** dies if the model allowed extras — it does not. Structural redaction beats a helper you have to remember to call; the client's `AuditEntry` (`types.ts:173-178`) is a byte-for-byte mirror of it.

---

## §6 · Tally & routing

| Severity | Count | IDs |
|---|---|---|
| BLOCKER | **1** | D-1 |
| MAJOR | **4** | D-2, D-3, D-4, D-5 |
| MINOR | **7** | D-6, D-7, D-8, D-9, D-10, D-11, D-12 |
| INFO | **5** | D-13, D-14, D-15, D-16, D-17 |
| **Defects total** | **17** | |
| Killed hypotheses | 3 | K-1, K-2, K-3 |
| Superlatives | **6** | S-1 … S-6 |

**Routing.**
- **F.W2 (value.js consumption to spec)** — widen or explicitly exclude: **D-4** (`actionTone` is a second hand-rolled colour authority, semantic axis; the census scopes hand-rolled colour to `colors.ts` alone). *Contradicts CENSUS-2026-08-03 §F.W2 as written; stated explicitly per lane law.*
- **F.W4 (per-component audit)** — **D-1** (blocker, fix after D-6), **D-3**, **D-5**, **D-8**, **D-10**, **D-11**.
- **F.W5 (45/30/13 join, R6-8)** — **D-2** (client leaf advertises fuzzy over an exact-match operation — needs a contract co-signature), **D-12** (`after`/`before` implemented end-to-end, unreachable from any UI), **D-13**.
- **Consumer-lane carries (shared, not AdminAuditLog-local)** — **D-6** and **D-7** (`useOffsetPagination` + the `getAdminToken()!` idiom, both inherited by `AdminUserList.vue`), **D-16** (rule-less scoped-style idiom, 5 gallery components).
- **Census amendment proposed** — lane-frontend §4's shadow table is file-granular ("9 components / ~1 990 LOC") and therefore **cannot see fragment shadows**. AdminAuditLog contributes three: the action chip (D-3), the hand-rolled spinner (`:119-120`), the raw pagination buttons (D-10). Recommend a *fragment shadow* row in the next census cut.
- **Intake-lane cross-citation** — **R5-7** (*template-loop evidence keyed to component callsites is blind to native HTML element loops*, adjudicated TRUE) applies directly: this component's entire content loop is a **native `<div v-for>`** at `:125-127`, not a component callsite. Its 25 rows are invisible to any instance denominator built the way `DERIVED-REGISTRIES.json` builds one. Budget it in F.W4's loop census exactly as R5-7's adjudication directs.

---

*Read-only pass. `/Users/mkbabb/Programming/fourier-analysis` untouched — no product source in any repo was modified. This file is the only write.*
