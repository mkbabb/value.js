claude-opus-5[1m]

# CHALLENGE — `ContourSettings.vue` · axis **L** (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourSettings.vue` — 470 LOC
(187 script · 131 template · 148 style), census row `formation/fourier/lane-frontend.md:84`.
**Repo posture** `/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY evidence; branch `m/w1-bump-migration`,
HEAD `cd26c65`, subject file **not** in the dirty set (`git status --porcelain` — clean at read time).
**Method** static + source-derived only. No browser. Where a claim needs a live browser to close, it is marked
**UNPROVEN-NEEDS-LIVE (SS-13)** and is excluded from the BLOCKER count.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; each claim below carries its own
falsifier, and §7 records the two hypotheses the tree *falsified* (I was wrong; the record says so).

**Tally — defects 17 (BLOCKER 3 · MAJOR 6 · MINOR 6 · INFO 2) · superlatives 3.**

---

## §0 — Read set (whole-file reads, all read-only)

Component + every module it imports, plus the modules that close each falsifier:

| File | Why in the set |
|---|---|
| `web/src/components/visualization/ContourSettings.vue` | subject |
| `web/src/stores/workspace.ts` (471) | `useWorkspaceStore` — the sole collaborator |
| `web/src/lib/defaults.ts` (33) | `CONTOUR_DEFAULTS` |
| `web/src/lib/colors.ts` (117) | `VIZ_COLORS` |
| `web/src/lib/types.ts` §29-42, §70-81 | `ContourSettings`, `ContourAsset` |
| `web/src/lib/api.ts` §40-140, §300-330 | per-key abort registry + `extractContour` |
| `web/src/components/ui/SliderControl.vue` (150) | the 5 slider callsites |
| `web/src/components/ui/tooltip/Tooltip.vue` (38) | the 6 tooltip callsites (R3-7a's budget) |
| `web/src/components/visualization/VisualizationView.vue` §1-70, §230-300 | the two mount callsites |
| `web/src/components/visualization/composables/useWorkspaceLoader.ts` (136) | declared compute owner; the error watcher |
| `web/src/components/visualization/BasisSelector.vue` §19-23 | the correct `v-model` counterpart |
| `web/src/router/index.ts` §36-120 | reachability of the load paths |
| `node_modules/@vueuse/shared/dist/index.js` §302-357, §979-982, §1843-1849 | `watchDebounced` teardown |
| `node_modules/@mkbabb/glass-ui/dist/useConfiguratorState-*.js` | `ConfiguratorLayer` root/attrs/`inert` |
| `api/models/shared.py`, `api/models/computation.py`, `api/routers/images.py` §212-250 | wire contract |
| `src/fourier_analysis/contours/{models,processing,structure}.py` | the parameter semantics |

**Hitherto corpus folded** — `formation/fourier/{lane-frontend,lane-crud,CENSUS-2026-08-03}.md` and the adjudicated
intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Rows cited inline: **R3-7a** (35 Tooltip callsites,
ContourSettings owns 6), **R5-7 / R6-5** (the native-template-loop invisibility class), **X-5** (66 SFC), **X-2**
(9 route records), and lane-crud `:65` (the 12-field `ContourSettings` atom). Contradictions are flagged explicitly.

---

## §1 — BLOCKERS

### L-B1 — the “Min Area %” slider is unit-wrong; every position but one hard-fails extraction with HTTP 422 · **BLOCKER**

**Provenance.** `ContourSettings.vue:269-277` binds `minContourArea` to a slider `:min="0" :max="20" :step="0.5"`
labelled `Min Area %`. That value is written verbatim to the wire at `ContourSettings.vue:116`
(`min_contour_area: minContourArea.value`), shipped by `lib/api.ts:300-311` as
`{ contour_settings: { ...settings } }`, and consumed as-is.

The backend semantics are unambiguous and stated in the tree:

- `src/fourier_analysis/contours/models.py:194-195` — `min_contour_area: float = 0.001` /
  *“Minimum contour area **as a fraction of total image area**.”*
- `src/fourier_analysis/contours/models.py:244` — `min_contour_area=max(0.0, min(1.0, float(...)))` — clamped to **[0,1]**.
- `api/models/shared.py:27-30` and `api/models/computation.py:25-28` — the same `[0,1]` clamp at the wire edge.
- `src/fourier_analysis/contours/processing.py:72` — `area_threshold = config.min_contour_area * image.image_area`;
  `:93` — `if area_threshold > 0 and area < area_threshold: continue`.
- `src/fourier_analysis/contours/structure.py:44` — the identical multiply on the multi-threshold path.
- `api/routers/images.py:244-248` — an empty contour list raises **422** *“No contours extracted — try lowering min
  area or changing strategy.”*

**The defect.** The control's domain is `[0, 20]`; the parameter's domain is `[0, 1]` *as a fraction*. Enumerating the
reachable slider positions (step 0.5 from min 0):

| slider | wire value | server `area_threshold` | outcome |
|---|---|---|---|
| `0.0` | 0.0 | 0 — filter disabled | works |
| `0.5` | 0.5 | **50 % of the whole image** | survivors must satisfy `0.5·A ≤ area ≤ 0.92·A` (`processing.py:93` + `:95`) — effectively empty ⇒ **422** |
| `1.0 … 20.0` (39 positions) | clamped to 1.0 | **100 % of the image** | `area < A` is true for every non-degenerate contour ⇒ **always empty ⇒ 422** |

So **40 of the 41 reachable positions are broken**, 39 of them *identically* broken (the clamp collapses them), and
the shipped default `0.001` (`lib/defaults.ts:11`) is not on the step grid at all — the slider cannot express it.
The label compounds the error: a user reading “Min Area %” and choosing `0.5` believes they asked for half a percent
and actually asks for half the image — a **100×** unit error in the dangerous direction.

**Blast radius.** The 422 is thrown *before* `store.contour` is reassigned (`workspace.ts:247-252`), so the canvas keeps
the previous contour and nothing visibly changes. The error surface is L-B2's dead banner plus a transient toast. Net
observable behaviour: *the slider does nothing, forever, except flash a toast.*

**Falsifier (and why it fails).** The claim dies if any layer rescales the value — e.g. a `/100` at the wire edge, a
percent→fraction adapter, or a separate `min_contour_area_pct` field. Searched: `grep -rn "min_contour_area"` over the
whole repo returns 12 sites (`api/models/shared.py:16,27,54`, `api/models/computation.py:14,25`,
`api/services/image_storage.py:259`, `contours/models.py:194,244,263,297`, `contours/structure.py:44`,
`contours/processing.py:72`, `contours/masks.py:336`, plus `tests/test_contours.py:76,199`) — **every one is a
passthrough or a multiply against image area; there is no division by 100 anywhere.** `tests/test_contours.py:76`
independently pins the intended magnitude at `min_contour_area=0.001`. The claim survives.

**UNPROVEN sub-part (SS-13).** Whether the *first* off-zero drag 422s or merely thins the contour set depends on the
subject image's contour-area distribution; only positions ≥ 1.0 are provably total. This does not weaken the finding —
the ≥ 1.0 band is 39 of 41 positions and is closed by arithmetic alone.

---

### L-B2 — the retry banner is unreachable by construction: the panel's only error-recovery affordance is dead code · **BLOCKER**

**Provenance.** `ContourSettings.vue:310-318` renders `<div v-if="store.error" class="retry-banner">` with a `Retry`
button bound to `runCompute`; `:79-84` computes `shortError` (a bespoke 503/`fetch`/60-char truncator); `:407-453`
styles it; `:455-469` supplies its `slide-down` transition. That is **~60 lines of template + CSS + one computed** whose
sole guard is `store.error`.

`store.error` has exactly three consumers in the whole app
(`grep -rn "store.error" web/src --include=*.vue --include=*.ts`):

1. `VisualizationView.vue:162` — `v-else-if="store.error && !store.imageSlug"` — the full-page error state.
2. `useWorkspaceLoader.ts:125-133` — `watch(() => store.error, (err) => { if (err && store.imageSlug) { toast(err,"error"); store.error = null; } })`.
3. `ContourSettings.vue:311` — **ungated**.

Consumers (1) and (2) *partition the space exactly on `store.imageSlug`*. Consumer (2) **nulls the state it read**, so
the banner can only survive in the `!store.imageSlug` half. But `ContourSettings` is mounted behind
`v-if="hasImage"` (`VisualizationView.vue:260, 270`, `hasImage = !!store.imageMeta` at `:123`), and **every write of
`imageMeta` in the store is paired with a write of `imageSlug` in the same synchronous statement pair** —
`workspace.ts:123-124` (upload), `:148-149` (loadWorkspace), `:210-211` (loadVisualization); `reset()` at `:412-418`
nulls both. Therefore:

> `imageMeta ≠ null` ⇒ `imageSlug ≠ null` ⇒ consumer (2) fires ⇒ `store.error` is nulled.
> `ContourSettings` exists ⇔ `imageMeta ≠ null`.
> **∴ the half in which the banner could render is exactly the half in which the component does not exist.**

A second, independent argument closes the same door on ordering grounds: watcher (2) is registered in
`VisualizationView`'s `setup` (via `useWorkspaceLoader`), a `pre`-flush job whose scheduler id is the *ancestor's*
instance uid — strictly lower than the `ContourSettings` render effect queued by the same mutation. The null lands
before the child re-renders.

**The defect.** A panel that owns the app's compute pipeline (see L-M5) ships a retry affordance that can never appear,
and the user's actual error channel is a transient toast with no retry. Combined with L-M2 (`lastComputedKey` recorded
without a success predicate) this removes the last manual escape from a failed compute.

**Aggravator (independent, same file).** Even in a counterfactual where the banner rendered, it is inside
`<ConfiguratorLayer label="Contour" :default-open="false">` (`:190`). The compiled substrate
(`@mkbabb/glass-ui/dist/useConfiguratorState-kiIlun8I.js`, `ConfiguratorLayer` body vnode) binds
`"aria-hidden": !i.value, inert: !i.value || void 0` on the body — so in the layer's **default** state the banner is
`inert`, `aria-hidden`, and zero-height. The Retry button would be unclickable even if it existed.

**Falsifier (and why it fails).** The claim dies if (a) a code path sets `imageMeta` without `imageSlug`, or (b) any
path sets `store.error` while `imageMeta ≠ null ∧ imageSlug = null`, or (c) watcher (2) is `flush: 'post'`. (a) and (b)
are closed by enumerating all four `imageMeta` assignment sites above. (c) is closed by inspection — no `flush` option
is passed at `useWorkspaceLoader.ts:125-133`, and Vue's default is `pre`. The claim survives.

---

### L-B3 — the mount-time `runCompute()` races `loadWorkspace`, aborts the load by revision bump, and overwrites the user's saved draft with defaults · **BLOCKER**

**Provenance.** `ContourSettings.vue:152-169`:

```ts
watch(() => store.imageMeta, (meta) => {
    ...
    if (!store.epicycleData && !store.basesData && !store.computing) {
        runCompute();
    }
}, { immediate: true });
```

The guard reads `store.computing`. It does **not** read `store.loading` — the flag `loadWorkspace` holds for its entire
duration (`workspace.ts:136` set, `:187` cleared).

`loadWorkspace` is not atomic across the settings assignment. `workspace.ts:143-181`:

```
143  const [meta, draft] = await Promise.all([api.getImageMeta(slug), loadDraft(slug)]);
148  imageSlug.value = slug;
149  imageMeta.value = meta;                    // ← hasImage flips; ContourSettings mounts on the next flush
154  if (draftContour && !draftContour.image_bounds) {
157      draftContour = await api.getContour(draftContour.contour_hash);   // ← a full network round-trip
160      if (revision.value !== rev) return;    // ← the abort door
163  contourSettings.value = { ...defaultContourSettings(), ...draft.contourSettings };
171  epicycleData.value = ...; basesData.value = ...;
181  await _saveDraftNow();
```

`ContourAsset.image_bounds` is `ImageBounds | null` (`lib/types.ts:76`), and `workspace.ts:152-153` documents the
missing-bounds branch as the live legacy-backfill path. On that branch the sequence is:

1. `:149` sets `imageMeta` → Vue flushes in a microtask, long before the `:157` fetch resolves → **`ContourSettings`
   mounts** and seeds its six local refs (`:33-39`) from `store.contourSettings`, which is still the constructor value
   `defaultContourSettings()` (`workspace.ts:46`) — **not** the draft's.
2. Its `{ immediate: true }` watcher fires. `epicycleData`/`basesData` are still `null` (a fresh page load;
   `loadWorkspace` does not assign them until `:171`), `computing` is `false`, `loading` is **true but unread** →
   **`runCompute()` runs.**
3. `runCompute` writes the *default* settings into `store.contourSettings` (`:112-123`) and calls
   `store.extractContour()`, which does `const rev = ++revision.value` (`workspace.ts:246`).
4. `loadWorkspace` resumes at `:160`: `revision.value !== rev` → **`return`**. The draft's `contourSettings`,
   `epicycleData`, `basesData` and the `_saveDraftNow()` at `:181` are **all skipped**.
5. `extractContour`'s success path calls `scheduleDraftSave()` (`workspace.ts:253`), and the store's
   `watch([contourSettings, animationSettings], scheduleDraftSave, { deep: true })` (`:108`) fires on the `:112` write —
   so the **defaults are persisted over the user's saved draft** (`_saveDraftNow` → `saveDraft`, `:93-106`).

Net: opening a legacy workspace silently discards the stored tuning, recomputes on defaults, and writes the loss to
disk. There is no error, no toast, no signal.

**Why this is the component's defect and not only the store's.** The proximate cause is a leaf panel firing an
expensive, store-mutating pipeline off a *single* store field (`imageMeta`) while an ancestor-initiated load is
mid-flight, using local state it snapshotted before that load finished. The store publishes the interlock the guard
needs — `store.loading` — and the guard already reads its sibling `store.computing`. The miss is one identifier wide.

**Falsifier (and why it fails).** The claim dies if (a) `loadWorkspace` assigns `contourSettings` before `imageMeta`,
(b) the `:157` await is unreachable, or (c) `ContourSettings` cannot mount before `:163`. (a) is read directly — `:149`
precedes `:163`. (b) requires `image_bounds` to be non-null on every persisted draft; the type says otherwise
(`types.ts:76`) and the store's own comment (`:152-153`) says the branch exists to trigger a lazy backend backfill. (c)
is closed by Vue's flush model — `imageMeta` is a `ref`, its mutation queues the parent's render job, which flushes on
the next microtask; the `:157` fetch cannot resolve in the same microtask. The claim survives.

**Scope honesty.** On the *common* path (draft present **with** `image_bounds`, or no draft) `:149`→`:172` is fully
synchronous, the flush sees `epicycleData` already set, and no race occurs. That is precisely why this is latent rather
than constant — and why it will present as an unreproducible “my settings reset themselves.”

---

## §2 — MAJOR

### L-M1 — the panel is a write-only mirror of `store.contourSettings`; it never re-seeds · **MAJOR**

`ContourSettings.vue:33-39` snapshots six store fields into six local `ref`s **once, at setup**. There is no
`watch(() => store.contourSettings, …)` anywhere in the file (`grep -n "store.contourSettings"` → `:33-39` reads,
`:112` write, and nothing else). Data flows *out* of the panel (`:112-123`) and never back in.

The author demonstrably knew the identity transition mattered — `:171-177` adds a dedicated
`watch(() => store.imageSlug, …)`. But that watcher resets only the **guards** (`suppressSettingsRecompute`,
`lastComputedKey`); it leaves the six **values** stale. That is a half-implemented contract, not an oversight of
kind.

Consequence when the store is replaced beneath a live instance (`workspace.ts:163-166` in `loadWorkspace`, `:213-216`
in `loadVisualization`, `:420` in `reset`): the panel displays workspace A's settings over workspace B's store,
`isDefault` (`:61-68`) reports on A, and the first slider nudge writes **A's entire settings object** over B
(`:112-123`) and persists it (`workspace.ts:108` → `scheduleDraftSave`).

**Falsifier / reachability — partially open.** The corruption needs a `store.contourSettings` replacement *without* an
unmount. I could not construct one statically: gallery navigation goes `/w/A → /gallery → /w/B` (different route
records ⇒ `VisualizationView` remounts); `uploadImage`'s `router.push` (`workspace.ts:125`) hits the param watcher's
`slug === store.imageSlug` short-circuit (`useWorkspaceLoader.ts:44`); `/s/:slug`'s redirect (`router/index.ts:117-118`)
arrives on a cold load; `reset()` nulls `imageMeta` and unmounts the panel. So: **the missing re-seed contract is
PROVEN; the live corruption is UNPROVEN-NEEDS-LIVE (SS-13)** — it needs a param-only `/w/A → /w/B` transition, which
`useWorkspaceLoader.ts:33-47` exists to serve and which history back/forward or a future in-view switcher supplies.
Not counted as a blocker for exactly that reason.

### L-M2 — `lastComputedKey` records the *scheduling* fact, never the *result* fact · **MAJOR**

`ContourSettings.vue:128-133`:

```ts
await Promise.allSettled([store.computeEpicycles(), store.computeBases()]);
lastComputedKey = currentComputeKey();
```

`allSettled` cannot reject, and neither store action reports success — `runComputeEpicycles` returns early on
`!contour.value` (`workspace.ts:286`) and on the stale-revision guard (`:298`); `runComputeBases` likewise (`:311`,
`:327`). `extractContour` has the same early return at `:251`. So the key is stamped identically whether the compute
produced `epicycleData` or produced **nothing at all**. The debounced watcher then short-circuits on
`nextKey === lastComputedKey` (`:145`) and will not retry until an *unrelated* setting changes — and the manual escape
hatch is L-B2's dead banner.

**Falsifier.** Dies if any of the three store actions signals failure to the caller. Read: all three return `void`;
`runComputeEpicycles`/`runComputeBases` rethrow only on a *real* error, which `allSettled` swallows. The missing
success predicate is PROVEN. The fully-silent wedge (a revision bump that early-returns `extractContour` without
itself re-scheduling) is **UNPROVEN-NEEDS-LIVE (SS-13)** — the three bump sources I traced (`uploadImage`,
`loadWorkspace`, a second `extractContour`) each re-schedule or abort-and-throw, so the wedge needs a live interleave I
cannot close on paper.

### L-M3 — `v-model:n-harmonics` / `v-model:n-points` on a component with no `defineEmits`: a dead two-way binding plus two orphan listeners on the substrate root · **MAJOR**

`VisualizationView.vue:260` and `:270` mount the panel as
`<ContourSettings v-if="hasImage" v-model:n-harmonics="nHarmonics" v-model:n-points="nPoints" />`. The component
declares props only (`ContourSettings.vue:26-29`) and contains **zero** `defineEmits` and **zero** `emit(` calls
(`grep -n "defineEmits\|emit(" ContourSettings.vue` → empty). The sibling six lines above it,
`BasisSelector` (`VisualizationView.vue:265-267`), takes the *same* `v-model` pair and does declare them
(`BasisSelector.vue:19-23`) — so this is a copy-paste of a working line onto a component that cannot honour it.

Two consequences:

1. **The contract is a lie.** `v-model` advertises writeback; the panel can only read. Any future author who "fixes" a
   harmonics control here by mutating `props.nHarmonics` gets a Vue warning and silence.
2. **Orphan listeners.** With no `emits` declaration, `onUpdate:nHarmonics` and `onUpdate:nPoints` fall through.
   `ConfiguratorLayer`'s compiled render function has a **single** root `<div data-slot="configurator-layer">` and does
   **not** set `inheritAttrs: false` (verified: `grep -c inheritAttrs` over
   `useConfiguratorState-kiIlun8I.js` → 0). Vue therefore attaches two permanent DOM listeners for the non-existent
   events `update:nHarmonics` / `update:nPoints` on that div — dead wiring on every mount, and (because the root is a
   single element, not a fragment) with no dev-mode warning to surface it.

**Falsifier.** Dies if `ContourSettings` emits either event, or if `ConfiguratorLayer` declares them in `emits` or sets
`inheritAttrs: false`. Its compiled `emits` array is exactly `["update:open"]`. Claim survives.

### L-M4 — `runCompute` has no re-entrancy guard and is invoked un-awaited and un-caught from two watchers · **MAJOR**

`runCompute` (`:104-137`) is `async`, mutates global store state, and issues three network calls. It is called bare —
no `await`, no `.catch()` — at `:146` (debounced watcher) and `:165` (imageMeta watcher). Both are Vue watcher
callbacks that *do not return* the promise, so `callWithAsyncErrorHandling` never sees it: any rejection is a genuine
**unhandled promise rejection**. `store.extractContour` rethrows on every failure path including
`AbortError` (`workspace.ts:254-257` — `isAbortError` suppresses only the *error state assignment*, then `throw e`
runs unconditionally).

Re-entrancy is unguarded: `store.computing` is depth-counted (`workspace.ts:60-69`), so it cannot serve as a mutex, and
`runCompute` checks nothing else. Two overlapping invocations collide on the per-key abort registry —
`lib/api.ts:54-59` `abortable("extractContour")` aborts the first call's fetch — which produces exactly the
`ERR_ABORTED` signature that `useWorkspaceLoader.ts:90-94` records as a previously-fixed regression. Aborting the
client fetch does **not** cancel the server pipeline: `api/routers/images.py:228-241` has already spawned the
extraction, and the cache (`:219-226`) only helps *after* completion — so the duplicate is paid in full server-side.

**Falsifier.** Dies if either call site awaits or catches, or if Vue attaches a rejection handler to watcher callbacks
that discard the promise. Read: `:146` is `runCompute();` and `:165` is `runCompute();` — bare statements returning
`undefined`. Claim survives.

### L-M5 — teardown: the app's compute orchestrator lives in a conditionally-mounted leaf, and its pending 1 s debounce survives unmount · **MAJOR**

**Colocation.** `useWorkspaceLoader.ts:90-94` states the design: *“Auto-compute is owned solely by ContourSettings.vue,
which holds the canonical settings state.”* The app's entire compute pipeline is therefore owned by a leaf panel that
is (a) `v-if="hasImage"`-gated (`VisualizationView.vue:260, 270`) and (b) rendered inside
`<Transition name="panel-swap" mode="out-in">` (`:254`) — i.e. it is **unmounted and remounted every time the user
toggles edit mode**, and during `out-in`'s gap nothing owns compute at all.

**The teardown leak (proven from the installed dependency).** `watchDebounced` (`:140-149`, 1000 ms) resolves as
`watchDebounced → watchWithFilter → watch(source, createFilterWrapper(debounceFilter(1000), cb))`
(`@vueuse/shared@14.3.0/dist/index.js:1843-1849`, `:979-982`, `:302-313`). `debounceFilter` (`:320-357`) holds its
`setTimeout` in a plain closure and registers **no** `onScopeDispose`/`tryOnScopeDispose` — nothing in either function
clears a pending timer when the effect scope dies. Vue's `watch` stop halts the *effect*; the already-scheduled
`setTimeout` at `:349` still runs `resolve(invoke())` → `fn.apply(...)` → the component's callback.

Live consequence: change a slider, then click Edit within 1 s. The panel unmounts; ~1 s later the ghost timer fires
`runCompute()` from a dead instance — three network calls and a wholesale `store.contourSettings` write issued by a
component that no longer exists, reading `props.nHarmonics`/`props.nPoints` frozen at unmount rather than current.
This is the classic "work outliving its owner" teardown defect, and it exists *because* the orchestrator was placed in
a transient leaf.

**Falsifier.** Dies if `debounceFilter` or `createFilterWrapper` registers scope cleanup, or if `watchDebounced` in
14.3.0 routes through a different filter. All three functions were read in full at the versions installed
(`@vueuse/core` `package.json` → `"version": "14.3.0"`); no cleanup hook appears in any of them. Claim survives.

### L-M6 — two hand-maintained parallel `Record`s stand in for the backend strategy enum; `adaptive_threshold` is unreachable and unrepresentable · **MAJOR**

`ContourSettings.vue:41-48` (`strategyLabels`) and `:50-57` (`strategyDescriptions`) are two independent
`Record<string, string>` literals over the same key set. The option list iterates the **descriptions**
(`:218` `v-for="(desc, key) in strategyDescriptions"`) while the visible name comes from the **labels**
(`:220` `{{ strategyLabels[key] }}`) and the trigger from a third derivation (`:59` `strategyLabel`). Three readers,
two writable sources, no single authority:

- a key added to `strategyLabels` only → never appears in the list;
- a key added to `strategyDescriptions` only → appears with an **empty** name (`:220` renders `undefined` as `""`);
- neither is derived from the backend `ContourStrategy` enum (`src/fourier_analysis/contours/models.py:17-26`), and
  **they already disagree with it**: `ADAPTIVE_THRESHOLD = "adaptive_threshold"` (`:21`) is a legal server strategy
  with no UI row.

The wire type is `strategy: str` with no enum constraint (`api/models/shared.py:9`; `web/src/lib/types.ts:30`), so
`"adaptive_threshold"` round-trips through a saved visualization or a draft. When it does, `:59` falls back to the raw
slug (`strategyLabels[strategy] ?? strategy`) — the trigger shows `adaptive_threshold` — while `SelectContent` has no
matching `SelectItem`, so the value is displayed but not present in the option set and **cannot be re-selected once
changed away**.

**Falsifier.** Dies if the UI list is generated from a shared enum, or if `adaptive_threshold` is unreachable
server-side. Both records are inline object literals with no import; `ContourStrategy.ADAPTIVE_THRESHOLD` is a live
enum member consumed by `normalized()` (`models.py:218-220`). Claim survives.

---

## §3 — MINOR

### L-m1 — `as any` over an already-correctly-typed field · **MINOR**
`:118` `smooth_contours: smoothContours.value as any`. `smoothContours` is `Ref<number>` (`:37`, seeded from
`CONTOUR_DEFAULTS.smooth_contours: number`) and the target is `smooth_contours: number` (`lib/types.ts:39`); the
backend agrees (`api/models/shared.py:18`, `contours/models.py:200`). The cast converts nothing and buys nothing — it
purely deletes type-checking on the one field of the payload whose units are a *fraction of contour length*
(`contours/models.py:201`). It is a fossil of a former `boolean` shape; leaving it in means a future type change on
this field lands silently. **Falsifier:** dies if any layer types `smooth_contours` as non-`number` — none does.

### L-m2 — six dead optional chains, six unreachable fallbacks, and a phantom `?? 16` that contradicts the declared default · **MINOR**
`:33-39` guards every read as `store.contourSettings?.X ?? CONTOUR_DEFAULTS.X`. `contourSettings` is
`ref<ContourSettings>(defaultContourSettings())` (`workspace.ts:46`) — non-nullable by type and non-null at every
instant of its life. All six `?.` and all six `??` are dead. Worse, `:36` chains a second fallback,
`?? CONTOUR_DEFAULTS.max_contours ?? 16`, and the literal `16` is repeated at `:65` and `:74`: three copies of a magic
number that **contradicts the shipped default of 24** (`lib/defaults.ts:12`). It is unreachable today only because
`max_contours` is typed `number | null` (`types.ts:38`) while the constant is a non-null literal — i.e. it is a
fallback that can only ever fire by disagreeing with the source of truth. **Falsifier:** dies if `contourSettings` can
be null — it cannot; `reset()` (`workspace.ts:420`) reassigns rather than nulls.

### L-m3 — two defaults sit off their own slider's step grid; `isDefault` is unrestorable by dragging · **MINOR**
`min_contour_area` default `0.001` against `:step="0.5"` (`:272`), and `smooth_contours` default `0.03` against
`:step="0.05"` (`:299`). reka-ui snaps to `min + k·step` on interaction, so neither default is reachable once touched;
`isDefault` (`:61-68`) uses strict float `===` against them, so the reset affordance's `is-default` state can be
restored only by the reset button, never by returning the slider. The same strict equality is fragile against
step-arithmetic residue generally (`0.1·3 = 0.30000000000000004`), and the identical values are `JSON.stringify`d into
`currentComputeKey` (`:88-98`), so a bit-level difference the user cannot see produces a distinct key and a spurious
recompute. **Falsifier:** partially mitigated — `SliderControl`'s numeric `<input>` (`:71-79`) clamps to `[min,max]`
but not to the grid (`SliderControl.vue:44-49`), so a user *typing* `0.03` can restore it. Slider-only restoration
remains impossible.

### L-m4 — five inline `format-value` arrows are re-allocated on every render and are proven un-cached by the compiler · **MINOR**
`:237, :250, :276, :289, :302` each pass `:format-value="(v: number) => …"`. Compiling the SFC template with the
project's own `@vue/compiler-sfc` yields, for every one of the five:

```
"format-value": (v) => v.toFixed(2)
}, null, 8 /* PROPS */, ["modelValue", "color", "format-value"])
```

— the arrow is emitted inline and `"format-value"` is listed in the **dynamic props array**, while sibling static nodes
in the same file *are* hoisted (`_cache[7]`, `_cache[8]`, `_cache[9]`, `_cache[10]`) and every `onUpdate:modelValue`
*is* cached (`_cache[0..6]`). So the compiler cached everything it could and deliberately did not cache these. Every
`ContourSettings` render — triggered by `store.error`, `store.computing`, `strategy`, or any of the six refs —
allocates five closures and forces all five `SliderControl` children to re-render, invalidating their `displayValue`
computed (`SliderControl.vue:58-60`). **Falsifier:** dies if the compiler hoists the arrows; the emitted code above is
the direct refutation.

### L-m5 — the reset button is disabled in CSS only · **MINOR**
`:399-402` `.reset-icon-btn.is-default { opacity: 0.25; pointer-events: none; }` applied via `:class` at `:199`. The
element is a real `<button>` (`@mkbabb/glass-ui/button`) with no `:disabled` binding, so it stays in the tab order and
stays activatable by Enter/Space while looking and behaving as disabled to the mouse. `pointer-events: none` also kills
the wrapping `Tooltip` trigger (`:194-205`), so the "Reset to defaults" hint disappears in exactly the state where it
would explain itself. The correct expression is `:disabled="isDefault"`. **Falsifier:** dies if glass-ui's `Button`
derives `disabled` from a class — it does not; `disabled` is a prop.

### L-m6 — a leaf panel writes two pieces of global store state directly · **MINOR**
`:108` `store.error = null` and `:112-123` `store.contourSettings = { … }`. The store exposes no `clearError` and no
`setContourSettings` action (`workspace.ts:428-470` return list), so the panel is the de-facto owner of two globals it
does not declare and cannot be tested against. The `store.error = null` write is the mirror image of L-B2's
`useWorkspaceLoader.ts:130` write — **two components racing to clear one global error flag, neither aware of the
other**, which is precisely the mechanism that makes L-B2's banner unreachable. **Falsifier:** dies if the store
exports an action for either — it exports neither.

---

## §4 — INFO (counted as defects)

### L-i1 — `ml_detail_threshold` is a magic derivation with no authority · **INFO**
`:122` `ml_detail_threshold: mlThreshold.value * 0.6`. The `0.6` appears nowhere else in either repo; it happens to
reproduce the shipped pair (`0.5 × 0.6 = 0.3`, `lib/defaults.ts:14-15`) but is undocumented, unnamed, and excluded from
`isDefault` (`:61-68`) and from `currentComputeKey` (`:88-98`) — so the panel's idempotence key does not cover a field
it writes. **Falsifier:** dies if `0.6` is defined anywhere as a named ratio — `grep -rn "0\.6" web/src/lib` returns no
such constant.

### L-i2 — 3 of the 12-field settings atom are unexposed, leaving one strategy with no controls at all · **INFO**
lane-crud.md:65 pins `contour_settings` as a **12-field atom** (`api/models/shared.py:8-62`). The panel exposes 6
(`strategy`, `blur_sigma`, `min_contour_area`, `max_contours`, `smooth_contours`, `ml_threshold`), derives 1
(`ml_detail_threshold`), forwards 2 from props (`n_harmonics`, `n_points`), and passes 3 through untouched by spread
(`resize`, `n_classes`, `min_contour_length`, `:113`). The consequence is user-visible: selecting **Multi-threshold**
(`:44`, `:53`) surfaces **zero** strategy-specific controls, because its only knob is `n_classes`
(`api/models/shared.py:57` → `ThresholdConfig(n_classes=…)`), which the panel never exposes. **Falsifier:** dies if
`n_classes` is bound anywhere in `web/src` — it is not (`grep -rn "n_classes" web/src` → `lib/types.ts:35`,
`lib/defaults.ts:9` only).

---

## §5 — the viz render path, and the R5-7 class

**Render-path contact.** The census pins the architecture: *“Canvas2D throughout, **WebGL/WebGPU ABSENT**; three
independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated
rAF; FrequencyGraph watch-driven)”* (`CENSUS-2026-08-03.md:85-87`), with `BasisCanvas.vue` at 547 LOC as *“the primary
Fourier renderer”* (`lane-frontend.md` viz table).

`ContourSettings` never touches a canvas, a context, or a frame — its contact with the render path is exclusively as
**the sole producer of the renderer's input**. `BasisCanvas.vue` reads `store.epicycleData` / `store.basesData`
(`:61, :94-96, :204-205, :378-386`) and redraws off them; those two `shallowRef`s (`workspace.ts:44-45`) are written
only by `runComputeEpicycles`/`runComputeBases` (`:299`, `:328`), which are called from exactly one place in the
application — `ContourSettings.vue:129-130`. **The Canvas2D renderer has one upstream, and it is a collapsible settings
panel inside an `out-in` Transition.** That is the architectural weight behind L-M5: L-B1 (bad parameter), L-B3
(clobbered load), L-M2 (wedged key), and L-M4 (double/aborted compute) all express themselves as *the canvas not
updating* with no error surface, because L-B2 removed the error surface.

The panel does respect the renderer's memory contract by non-interference: it never writes `epicycleData`/`basesData`
directly, so the `markRaw` + `shallowRef` discipline (`workspace.ts:44-45, 299, 328`) that keeps large coefficient
arrays out of the reactivity graph is preserved. No leak found on that axis.

**R5-7 — NOT APPLICABLE here, and the reason is worth recording.** The adjudicated class (intake `lane-fourier-r3-r6.md`
row **R5-7**, ADOPT-AS-FACT + CARRY→F.W4; cured by **R6-5**'s `NATIVE_TEMPLATE_LOOP` family) is: *template-loop evidence
keyed to component callsites is blind to native HTML element loops.* `ContourSettings.vue` contains exactly one `v-for`
(`:218`), and its subject is `<SelectItem>` — a **component** callsite, therefore visible to any callsite-keyed
derivation. Zero native-element `v-for` in the file. The class does not bite.

**But its dual does**, and it is L-M6 restated in derivation terms: the loop's *source* is a module-local object literal
(`strategyDescriptions`, `:50-57`) with no type relation to the backend `ContourStrategy` enum. A derivation that counts
the loop will report 6 options and will be *correct about the loop and wrong about the domain* — the missing
`adaptive_threshold` row is invisible to callsite-keyed and native-loop-keyed derivations alike, because the gap is
between the literal and the enum, not between the template and the registry. **Recommendation for F.W4:** the
per-component D/L/C audit needs a third counter beside `componentTemplateLoops` and `nativeTemplateLoops` —
*loop-source provenance* (literal vs. typed domain) — or it will inherit a blind spot of exactly R5-7's shape one level
up.

**Corroboration of R3-7a.** The intake's live sum credits `ContourSettings` with **6** Tooltip callsites. Re-counted
against the tree: `:194`, `:229`, `:242`, `:268`, `:281`, `:294` = **6**. Exact. R3-7a's F.W3 migration budget stands
unchanged for this component.

---

## §6 — SUPERLATIVES (L-18 runs both ways)

### L-S1 — the content-addressed compute key mirrors the server's own cache key · **superlative**
`currentComputeKey()` (`:86-99`) serialises the exact tuple that determines the result — image identity, all six
settings, the two prop-borne parameters — into a stable string (object-literal key order is fixed, so
`JSON.stringify` is deterministic here), and normalises the `0 → null` sentinel *before* hashing (`:87`) so the "All"
position and the server's `None` agree. It is then used as a pure idempotence guard at `:144-145`. This is materially
better than the usual `isDirty` boolean, and it is **the same idea the backend independently reached**:
`api/routers/images.py:219` keys its extraction cache on `extraction_cache_key(asset.sha256, cs)`. Client and server
arrived at the same content-address for the same computation. **Falsifier (checked):** the key would be unsound if it
omitted a field that affects the result — it omits only `resize`, `n_classes`, `min_contour_length`, and
`ml_detail_threshold`, and of those only the first three are user-immutable in this UI; `ml_detail_threshold` is a pure
function of `mlThreshold`, which *is* in the key. The guard is sound for everything the panel can change. (L-M2 is a
defect in *where the key is stamped*, not in the key.)

### L-S2 — this file is on the correct side of the census's reduced-motion ledger, with cited provenance · **superlative**
`:370-375` gates both collapsible animations behind `@media (prefers-reduced-motion: reduce)`; `:455-461` uses named
transition properties with canonical easing tokens and explicitly forswears `transition: all` (with the `A.W3.d`
citation); `:354-360` records *why* the hand-rolled `adv-open`/`adv-close` keyframes were retired in favour of the
substrate's `collapsible-open`/`collapsible-close` reading `--reka-collapsible-content-height`. The census flags the
opposite posture elsewhere in this app — *“the two rAF clocks themselves are **ungated** under reduced-motion”*
(`CENSUS-2026-08-03.md:111-112`) — and `lane-frontend.md:619` counts this file among only 8 `prefers-reduced-motion`
blocks in 66 SFCs (X-5). Decision-recording comments of this quality are the reason the retirement is auditable at all.
**Falsifier (checked):** the praise would be hollow if the substrate keyframes did not exist or the `data-state` channel
were absent — `ConfiguratorLayer`'s compiled body binds `data-state`, and `CollapsibleContent` is imported from the
substrate at `:8-12`.

### L-S3 — a pure-CSS odd-tail spanner, no wrapper element and no JS · **superlative, with a caveat**
`:383-385` `.advanced-grid > :last-child:nth-child(odd) { grid-column: 1 / -1; }` makes the final control span both
columns when the count is odd, using only the cascade — no wrapper `<div>`, no `computed`, no index arithmetic in the
template. It is the right instinct exactly where the codebase's stated law lives (`feedback_kiss_no_contrivance`).
**Honest caveat:** the grid's child count is a literal 3 (`:268-304`), so today the rule can only ever match the third
child and is inert generality rather than live logic. It is correct and it is cheap; it is not yet load-bearing.

---

## §7 — negative results (hypotheses the tree falsified; not counted)

Recorded because L-18 discipline means publishing the misses.

1. **“The mount-time `runCompute()` races `loadVisualization` and discards the saved (possibly hand-edited) contour.”**
   The mechanism is real — `loadVisualization` (`workspace.ts:197-232`) captures `rev` at `:203`, sets `imageMeta` at
   `:211`, then awaits `api.getContour` at `:222` with a revision guard at `:223` — exactly L-B3's shape. **But it
   cannot fire: `loadVisualization` and its alias `loadSnapshot` have zero consumers** (`grep -rn
   "loadVisualization\|loadSnapshot" web/src --include=*.vue --include=*.ts`, excluding the store, returns nothing).
   The hypothesis is **FALSIFIED**. It surfaces a different defect outside this component's boundary and outside this
   axis: `/v/:visualizationSlug` (`router/index.ts:57-67`, and X-2's 9-record count) mounts `VisualizationView`, whose
   loader reads only `route.params.imageSlug` (`useWorkspaceLoader.ts:25`) — **the saved-visualization route never
   loads a visualization.** Referred to the D (data/route) axis, not claimed here.

2. **“`VIZ_COLORS.amber` is mutated post-mount by `resolveVizColors()` and the five `:color` bindings go stale on theme
   toggle.”** `lib/colors.ts:94` does mutate it, but `VIZ_COLORS` is `reactive(...)` (`:77-87`) and the compiled
   template lists `"color"` in the dynamic props array (see L-m4's output). The bindings update. **FALSIFIED.**

---

## §8 — disposition

| id | severity | one-line | verdict |
|---|---|---|---|
| L-B1 | BLOCKER | "Min Area %" is a `[0,1]` fraction driven by a `[0,20]` step-0.5 slider; 40/41 positions 422 | CONFIRMED (arithmetic) |
| L-B2 | BLOCKER | retry banner unreachable — ancestor pre-flush watcher nulls `store.error` on the only branch where the panel exists | CONFIRMED (partition + ordering) |
| L-B3 | BLOCKER | mount-time `runCompute()` reads `computing` but not `loading`; bumps `revision`, aborts `loadWorkspace`, persists defaults over the draft | CONFIRMED (legacy-`image_bounds` branch) |
| L-M1 | MAJOR | no re-seed from `store.contourSettings`; the `imageSlug` watcher resets guards, not values | contract CONFIRMED / corruption UNPROVEN-NEEDS-LIVE |
| L-M2 | MAJOR | `lastComputedKey` stamped after `allSettled` with no success predicate | CONFIRMED / silent wedge UNPROVEN-NEEDS-LIVE |
| L-M3 | MAJOR | `v-model:n-harmonics`/`n-points` with no `defineEmits`; two orphan listeners on `ConfiguratorLayer`'s root | CONFIRMED |
| L-M4 | MAJOR | no re-entrancy guard; bare un-caught async calls ⇒ unhandled rejections + duplicated server extraction | CONFIRMED |
| L-M5 | MAJOR | orchestrator in an `out-in` leaf; `debounceFilter` registers no scope cleanup ⇒ post-unmount compute | CONFIRMED (dep source read) |
| L-M6 | MAJOR | two parallel `Record`s stand in for `ContourStrategy`; `adaptive_threshold` unreachable/unrepresentable | CONFIRMED |
| L-m1 | MINOR | `as any` over a correctly-typed `number` | CONFIRMED |
| L-m2 | MINOR | 6 dead `?.` + 6 dead `??` + a triplicated phantom `?? 16` vs. the declared 24 | CONFIRMED |
| L-m3 | MINOR | two defaults off their own step grid; `isDefault` unrestorable by dragging | CONFIRMED |
| L-m4 | MINOR | 5 un-cached inline `format-value` arrows in the dynamic props array | CONFIRMED (compiler output) |
| L-m5 | MINOR | reset button disabled in CSS only; kills its own tooltip, stays keyboard-activatable | CONFIRMED |
| L-m6 | MINOR | leaf writes two globals the store exposes no action for | CONFIRMED |
| L-i1 | INFO | `× 0.6` magic ratio, absent from `isDefault` and from the compute key | CONFIRMED |
| L-i2 | INFO | 3 of the 12-field atom unexposed; Multi-threshold ships zero controls | CONFIRMED |
| L-S1 | superlative | content-addressed compute key, convergent with the server's `extraction_cache_key` | — |
| L-S2 | superlative | reduced-motion gating + named transitions + cited keyframe-retirement provenance | — |
| L-S3 | superlative | pure-CSS odd-tail spanner (caveat: currently inert) | — |

**Verdict.** The component is DEFECTIVE and the assumption stands. The three blockers are independent — a unit error
against the wire contract (L-B1), an error-recovery surface that provably cannot render (L-B2), and a mount-time
race that destroys persisted user state (L-B3) — and they compose badly: L-B1 fails, L-B2 hides the failure, L-M2
records the failure as success, and L-M5 means the retry that would have fixed it may fire from a dead instance. The
single structural cause behind L-B3/L-M1/L-M2/L-M4/L-M5 is one decision recorded at `useWorkspaceLoader.ts:90-94`:
**the app's compute orchestration was concentrated into a conditionally-mounted, transition-wrapped leaf panel to fix
an earlier race.** That fix moved the race rather than removing it. The disposition is a `useContourCompute()`
composable (or a store action) owned at the route shell, with the panel reduced to what it names itself: settings.
