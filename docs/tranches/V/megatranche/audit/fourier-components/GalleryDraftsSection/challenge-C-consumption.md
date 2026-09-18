claude-opus-5[1m]

# CHALLENGE · `GalleryDraftsSection.vue` · AXIS C — CONSUMPTION

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GalleryDraftsSection.vue` (108 lines)
**Axis** how this component consumes value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the fourier API
(45-operation surface; operation↔client leaf coupling R6-8 where reachable); props/emits contract quality;
integration seams.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier;
the superlatives carry them too (L-18 runs both ways).
**Method** static + source-derived only. No browser tooling. Live-only claims marked
`UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally** 20 defects · **2 BLOCKER** · 8 MAJOR · 6 MINOR · 4 INFO · **5 SUPERLATIVES**.
Three further observations are examined and **ruled NOT defects** (§5) — excluded from the 20.

---

## §0 — The consumption surface, whole

Eight imports. Three are first-party packages, three local, one `vue`, one `lucide-vue-next`.

| line | specifier | verdict |
|---|---|---|
| 2 | `vue` — `ref`, `computed` | live (20, 22) |
| 3 | `@/lib/types` — `WorkspaceDraft` | live (11, 16, 38) — type-only, correctly `import type` |
| 4 | `@/lib/api` — `thumbnailUrl` | live (77) — the **only** API-surface touch. See **C-8/C-9** |
| 5 | `../lib/basis-display` | live (44) — the value.js/glass-ui colour seam. See **C-3**, **S-3** |
| 6 | `lucide-vue-next` — `ChevronDown`, `Upload` | live (59, 98). See **C-11** |
| 7 | `@mkbabb/glass-ui/button` | live — `Button` ×2 (52, 91) |
| 8 | `@mkbabb/glass-ui/metric-badge` | live — `MetricBadge` ×1 (58). See **C-12** |

**value.js consumption: zero, direct — and zero, transitive.** The component imports nothing from
`@mkbabb/value.js`, and its one colour-adjacent edge (`basis-display.ts` → `lib/colors.ts`) reads only
`.label`, never `.color`. All five live value.js consumer sites in the tree
(`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`, `easings.ts:9,16` — matching
`formation/fourier/lane-frontend.md:480`) are in the equation subtree, none here.

That accident of restraint makes this the **only `basisDisplay` consumer immune to the sibling
challenge's C-3 and C-4** (`audit/fourier-components/GalleryCard/challenge-C-consumption.md:157,205` —
the module-eval `VIZ_COLORS` snapshot, and `cssVarToHex`'s missing `oklch()` arm that resolves every
glass-ui 4.0.0 viz token to `#888888`). I re-verified the substrate of both and confirm them: glass-ui
ships the tokens in oklch (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-265`,
`dark-arm.css:113-115`, `light-dark.css:145-147`) and `lib/colors.ts:31-52` carries `hsl(...)` / bare-triplet /
`rgb(...)` arms only. I do **not** re-file them here; I fold them by citation and record only the
component-local consequence (**C-3**).

**keyframes.js consumption: zero.** Correct in kind — see **S-4** — but the disclosure it declines to
animate is **C-7**.

**glass-ui consumption: 2 of 80 exports**, both by subpath, both prop-conformant (**S-1**, **S-5**) —
against three separate misuses of the primitives it did import (**C-7**, **C-11**, **C-12**).

**API consumption: 1 of 45 operations** — `GET /api/images/{imageSlug}/thumbnail`
(`api/routers/images.py:149-165`), reached as a **string, in a template `src` binding**, never through
`apiFetch`. That single edge carries **C-8** and **C-9**.

**The seam that actually breaks is the store seam**, not the package seam: two of the three files this
component's emits terminate in (`stores/gallery.ts`, `stores/workspace.ts`, `lib/draftStorage.ts`) carry
a reconciliation channel that is written but never read as designed (**C-1**) and a delete verb with zero
callers (**C-2**).

---

## §1 — BLOCKERS

### C-1 · BLOCKER · Publishing a draft never removes it from this list — `savedSnapshots` is a write-only-empty channel, and the panel is permanently wrong

`GalleryDraftsSection.vue:96` emits `publish` with the whole draft. Trace it to ground:

- `:96` → `GalleryView.vue:369` `@publish="handlePublishDraft"` → `GalleryView.vue:207-216`
- → `stores/gallery.ts:237-261` `publishDraft(draft)` → `api.createVisualization({ visibility: "public", … })`
  → `resetAndFetch()`.

The list this component renders is `GalleryView.vue:76-81`:

```ts
const unpublishedDrafts = computed(() =>
    workspace.drafts.filter((d) =>
        !d.savedSnapshots?.length ||
        !d.savedSnapshots.every((h) => publishedHashes.value.has(h)),
    ),
);
```

`savedSnapshots` has **exactly four occurrences in the entire web tree**
(`grep -rn savedSnapshots web/src`): the type declaration (`lib/types.ts:90`), those two reads, and
**one writer** — `stores/workspace.ts:102`:

```ts
const raw: WorkspaceDraft = structuredClone({
    …
    savedSnapshots: [],          // ← literal, unconditional, every save
    lastOpenedAt: new Date().toISOString(),
});
```

It is never appended to, anywhere. Therefore `!d.savedSnapshots?.length` is **always true**, the second
clause never evaluates, and `unpublishedDrafts === workspace.drafts` for every input. The filter is a
no-op and the "unpublished" predicate is vacuous.

Worse, the write is *unconditional*: `_saveDraftNow()` is also called from `loadWorkspace`
(`stores/workspace.ts:181`) and `uploadImage` (`:126`), so **merely opening a draft re-zeroes
`savedSnapshots`**. Even a correct future writer would be erased on the next open.

Consequences, all source-derivable:

1. **The row never disappears after a successful publish.** `publishDraft` calls `resetAndFetch()`
   (`gallery.ts:257`) but never `saveDraft` and never `workspace.refreshDrafts()`. Nothing about the
   draft record changes.
2. **Re-clicking Publish creates a second gallery entry.** `createVisualization` is an unconditional
   `POST`; there is no idempotency key and no "already published" guard anywhere on the path. The button
   re-enables the moment `publishing` flips back (`GalleryView.vue:214`).
3. **Even a slug-based filter would not save it.** The new entity's slug is a freshly minted 4-word
   *visualization* slug (`api/lib/crud/slugs.py:40-42`), unrelated to `draft.imageSlug` — so
   `publishedHashes` (built from `e.slug`, `GalleryView.vue:73-75`) can never contain the draft's key.

*Falsifier.* If any code path appended the published slug to `draft.savedSnapshots` and re-persisted the
draft, the filter would work and this would be at most a refresh-ordering nit. `grep -rn "savedSnapshots"
web/src` returns four lines; one is the type, two are the reads above, one is the literal `[]`. There is
no such path. It would also be falsified if `publishDraft` awaited `workspace.refreshDrafts()` and the
store recomputed a published flag — it does neither (`gallery.ts:237-261` end-to-end).

*Attribution.* The defect is co-owned: the vacuous predicate is `GalleryView.vue:76-81` and the empty
writer is `workspace.ts:102`, but **this component is the sole UI the failure is visible through**, and
it is the component that offers the Publish affordance without any published-state channel in its props
contract. A props contract carrying `publishedSlugs: Set<string>` — or a `published: boolean` per row —
would have made the hole undeclarable.

---

### C-2 · BLOCKER · There is no way to delete a draft — `deleteDraft` has zero callers, and this panel is the only drafts UI

`lib/draftStorage.ts:87-95` exports `deleteDraft(key)`. `grep -rn "deleteDraft" web/src web/e2e` returns
**one** line: its own definition. `stores/workspace.ts:14` imports `{ saveDraft, loadDraft, listDrafts }`
— the delete verb is deliberately not wired.

`GalleryDraftsSection.vue` renders exactly three affordances per row: open-via-thumbnail (`:74`),
open-via-body (`:83`), Publish (`:96`). No remove, no archive, no overflow menu. And it is the only
consumer of the drafts list (`grep -rn "GalleryDraftsSection" web/src` → `GalleryView.vue:29,365`).

Composed with **C-1**, the terminal state is a monotonically growing, unremovable list. And the rows are
not cheap: each `WorkspaceDraft` (`lib/types.ts:83-92`) carries `epicycleData: EpicycleData | null` and
`basesData: AnimationData | null` — the full harmonic/coefficient payloads — `structuredClone`d into
IndexedDB on every debounced settings change (`workspace.ts:81-84`, 1000 ms debounce; `:93-106`).

The only escape hatch is logout, which clears the in-memory array but **not** the store:
`GalleryView.vue:101-104` sets `workspace.drafts = []` and never touches IndexedDB, so the records
survive and reappear on the next `refreshDrafts()` (`workspace.ts:408-410` → `listDrafts()`).

*Falsifier.* If any other surface offered draft deletion, this would be a placement complaint, not a
blocker. It does not: `deleteDraft` is unreferenced, `workspace.ts` never imports it, `reset()`
(`workspace.ts:412-427`) clears only refs, and no route or dialog in the tree names a draft-delete
action. It would also be falsified if drafts were bounded — there is no eviction, no cap, no LRU in
`draftStorage.ts` (whole file read, 114 lines).

*Live half, disclosed.* Whether the accumulation actually reaches a quota rejection — and what the app
does when `saveDraft` rejects (`workspace.ts:105` swallows it into `console.warn`, so the user is told
nothing) — is `UNPROVEN-NEEDS-LIVE` for SS-13. The unbounded-and-unremovable *structure* is fully
source-derived.

---

## §2 — MAJOR

### C-3 · MAJOR · The basis label diverges from the two sibling cards rendering the same data, one tab away

`GalleryDraftsSection.vue:38-47`:

```ts
const key = b.startsWith("fourier") ? "fourier" : b;
return basisDisplay[key]?.label ?? b;
```

`GalleryCard.vue:36-50` and `GalleryCardModal.vue:41-55` are byte-identical to each other and **both**
disambiguate the two fourier modes:

```ts
const label = b === "fourier-epicycles" ? "Epicycles"
            : b === "fourier-series"    ? "Series"
            : cfg.label;
```

`fourier-epicycles` and `fourier-series` are two distinct, user-selectable modes:
`BasisSelector.vue:11` declares them (`const fourierModes = ["fourier-epicycles", "fourier-series"]`) and
`:93-106` cycles between them. This panel renders both as the single word **"Fourier"**, erasing the mode
the user chose — in the Drafts tab, immediately adjacent to the Gallery tab where the same underlying
`active_bases` array renders "Epicycles" or "Series".

Three further divergences on the same three lines:

| behaviour | DraftsSection:44 | GalleryCard:41-49 / Modal:46-54 |
|---|---|---|
| unknown basis id | renders the **raw id** (`?? b`) | **dropped** (`if (!cfg) return null` + `.filter(Boolean)`) |
| `icon` channel (`ℱ`/`Tₙ`/`Pₙ`) | discarded | rendered |
| `color` channel | discarded | rendered as `--pill-c` |

Discarding `.color` is the reason this component is immune to the sibling's C-3/C-4 — but it is immunity
by omission, and it costs a module-graph edge to `lib/colors.ts` (via `basis-display.ts:1`) for a label
lookup that needs none of it.

*Falsifier.* If `basisDisplay` itself carried the epicycles/series split, all three consumers would agree
and this would be dead. It does not — `components/visualization/lib/basis-display.ts` is 7 lines and has
exactly three keys (`fourier`, `chebyshev`, `legendre`), no mode arm. It would also be falsified if the
two fourier modes could never both reach a draft — irrelevant: the defect is that *either* one renders
as the generic parent label, not that both appear at once. (They cannot: `BasisSelector.vue:96-106`
filters `b.startsWith("fourier")` before pushing exactly one, so "Fourier, Fourier" is unreachable from
the UI. That sub-claim is correctly *not* filed.)

*Fold.* This is the third independent copy of the same 12-line mapping. `formation/fourier/lane-frontend.md`
records `basis-display.ts` as the shared seam; the shared seam is being bypassed by copy-paste that has
already drifted.

---

### C-4 · MAJOR · Publish is offered on drafts that are statically known to fail

`GalleryDraftsSection.vue:91-100` renders the Publish button for every row, gated only on the list-wide
`publishing` flag. `stores/gallery.ts:238`, the **first statement** of the handler, before its `try`:

```ts
async function publishDraft(draft: WorkspaceDraft) {
    if (!draft.contour) throw new Error("Draft has no contour");
```

`WorkspaceDraft.contour` is typed `ContourAsset | null` (`lib/types.ts:85`) and is genuinely nullable —
`workspace.ts:100` writes `contour: contour.value`, and `contour.value` is `null` after
`uploadImage` (`workspace.ts:115`) and before extraction completes, and `loadWorkspace` writes
`contour.value = null` on the no-draft branch (`workspace.ts:176`). A draft saved in that window has
`contour: null` on disk.

The component holds `draft.contour` in hand at `:96` and consults none of it. The user clicks a live,
enabled, primary-affordance button and receives an error toast — for a state the renderer could have
disabled deterministically.

*Falsifier.* If `contour` were non-nullable in practice, the guard in the store would be dead and this
would be defensive noise. It is not: the type admits `null`, `_saveDraftNow` (`workspace.ts:93-106`) has
no contour precondition (only `if (!imageSlug.value) return`), and `scheduleDraftSave`
(`workspace.ts:78-84`) fires on `animationSettings` changes that can precede any extraction. It would
also be falsified if the throw were caught before reaching the user — it is not: it is outside the
handler's `try`, propagates to `GalleryView.vue:210`, and surfaces as `toast(e.message …, "error")` at
`:212`.

---

### C-5 · MAJOR · `publishing: boolean` is the wrong shape — one list-wide flag for a per-row operation

`GalleryDraftsSection.vue:12` declares `publishing: boolean`; `:95` binds it to **every** row's
`:disabled`. The producer is a single `ref(false)` (`GalleryView.vue:47`) toggled around one call
(`:208`/`:214`).

Three consequences from the shape alone:

1. Publishing draft *A* disables the Publish button on drafts *B…N*. With N drafts (and C-1/C-2
   guaranteeing N only grows) the whole column greys out on any single action.
2. **No busy affordance on the acting row.** The button keeps the `Upload` icon and the word "Publish";
   nothing spins, nothing says "Publishing…". The only feedback is that everything dims. The component
   receives no row identity, so it *cannot* render one.
3. The correct contract is `publishingSlug: string | null` — same one-token cost, exact row attribution,
   and it makes the busy state renderable. The tree already has this idiom:
   `stores/gallery.ts:139-141` keys ETags per slug in a `Map`, and `lib/api.ts:52-57` keys abort
   controllers per operation.

*Falsifier.* If publishing were structurally exclusive — a queue that genuinely admits one at a time —
a boolean would be defensible and the greyed column intentional. Nothing enforces exclusivity:
`handlePublishDraft` (`GalleryView.vue:207-216`) is a plain `async` function with no queue and no
re-entrancy guard beyond the flag it sets, and `publishDraft` swallows its own errors
(`gallery.ts:258-260`, `catch → toast`, no rethrow) so the parent's `catch` at `:211` is reachable only
via the C-4 precondition throw.

---

### C-6 · MAJOR · The primary affordance is a bare `<div @click>` — it bypasses both glass-ui and vue-router, which this file already depends on

Two of the three interactive targets per row are `<div>`s:

```
:72-75   <div class="… cursor-pointer …" @click="emit('open', draft.imageSlug)">   ← thumbnail
:83      <div class="… cursor-pointer …" @click="emit('open', draft.imageSlug)">   ← title + meta
```

Neither has `role`, `tabindex`, or a key handler. Opening a draft — the panel's **main** purpose — is
mouse-only.

This is a consumption defect, not merely an a11y one, because both escape hatches are already imported
or in-tree:

- glass-ui `Button` exposes `as` and `asChild`
  (`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js`, props `asChild: { type: Boolean }`,
  `as: { default: "button" }`, rendering through reka-ui `Primitive`). `<Button variant="ghost" as-child>`
  wrapping a link is one line, and this file already imports `Button` at `:7` and uses it twice.
- `vue-router` 5 is a dependency and `RouterLink` is the tree's own idiom. The emit terminates in
  `GalleryView.vue:370` `@open="router.push(\`/w/${$event}\`)"` — an imperative push in an inline
  template handler. Consequence: no `href`, so the row is not middle-clickable, not
  open-in-new-tab, not copy-link-able, and invisible to a crawler or to Playwright's `getByRole("link")`.

*Falsifier.* If the row had a *separate* keyboard-reachable open control, the divs would be redundant
mouse shortcuts and this would drop to MINOR. It does not — the only focusable elements in a row are the
header `Button` (`:52`, outside the rows) and the row's Publish `Button` (`:91`). Tabbing through the
panel reaches Publish and never reaches Open.

---

### C-7 · MAJOR · The disclosure is hand-rolled, while glass-ui's `Collapsible` is exported, imported twice in-tree, and wrapped locally

`:20` `const collapsed = ref(false)`; `:55` `@click="collapsed = !collapsed"`; `:66` `<div v-if="!collapsed">`.

glass-ui 4.0.0's `exports` map carries `./collapsible` (verified: 80 entries, `./collapsible` present),
and the tree consumes it in two places already:

- `paper/PaperSidebar.vue:7` — `import { Collapsible, CollapsibleContent } from "@mkbabb/glass-ui/collapsible"`
- `visualization/ContourSettings.vue:9-12` — `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

and wraps it locally at `components/ui/CollapsibleSection.vue:2` — a 70-line component that already
solves this exact problem, consumed by `ContourPreview.vue:4`.

What the hand-roll gives up, each verified in the wrapper's own source:

| lost | evidence |
|---|---|
| the `data-state` animation channel | `CollapsibleSection.vue:58-63` — `[data-state="open"] { animation: collapsible-open 0.2s var(--ease-out) }` |
| the canonical glass-ui keyframes | `CollapsibleSection.vue:54-56` names `collapsible-open`/`collapsible-close` as canonical (`@mkbabb/glass-ui/styles/animations.css`), reachable because `src/style.css:3` imports `@mkbabb/glass-ui/styles` |
| the reduced-motion arm | `CollapsibleSection.vue:64-69` — `@media (prefers-reduced-motion: reduce) { animation: none }` |
| `aria-expanded` / `aria-controls` | supplied by reka-ui's `CollapsibleTrigger`; absent here — the header `<button>` announces nothing about the region it governs |
| `overflow: hidden` on the content | `CollapsibleSection.vue:51-53` |

The visible symptom of the missing animation channel is a **half-animated disclosure**: the chevron gets
`transition-transform duration-200 ease-in-out` (`:61`) and rotates smoothly, while the content it
governs is a `v-if` that pops in and out with no transition at all.

*Falsifier.* If the panel needed a shape `Collapsible` cannot express — a non-boolean state, a
virtualised body, a controlled/uncontrolled split — the hand-roll would be justified. It needs a plain
boolean with `v-model:open`, exactly `CollapsibleSection.vue:15`'s shape. It would also be falsified if
`CollapsibleSection` were unsuitable because it hard-codes a `ChevronRight` and a title span — a real
constraint, which is precisely why the *primitive* (`@mkbabb/glass-ui/collapsible`, as
`ContourSettings.vue:255-307` uses it directly) is the citation that survives.

---

### C-8 · MAJOR · Private, unpublished drafts render their thumbnails through a public, unauthenticated, 24-hour-`public`-cached endpoint

`:77` `:src="thumbnailUrl(draft.imageSlug)"` → `lib/api.ts:292-294` →
`GET ${BASE}/api/images/{imageSlug}/thumbnail`.

The server side (`api/routers/images.py`):

```py
:38   router = APIRouter(prefix="/api/images", tags=["images"])        # no dependencies=[…]
:149  @router.get("/{imageSlug}/thumbnail")
:150  async def get_image_thumbnail(imageSlug: str) -> FileResponse:   # no session dependency
:161-165  return FileResponse(…, headers={"Cache-Control": "public, max-age=86400"})
```

No `Depends(...)` on the route, none on the router, and `api/main.py:105` includes it plainly. The only
protection is slug secrecy: 4 words × 128-word lists (`api/lib/crud/slug_words.json` — adjective 128,
verb 128, colour 128, animal 128) = 2²⁸ ≈ 2.68 × 10⁸, minted with `secrets.choice`
(`api/lib/crud/slugs.py:40-42`). **28 bits is a capability URL, and a weak one** — enumerable, and
`Cache-Control: public` explicitly authorises shared/intermediary caches to retain it.

This matters *here* specifically because the Drafts panel is by definition the pre-publication surface:
`draftStorage.ts:2-4` frames drafts as a "local-first CACHE of `visibility=draft` rows". The visibility
model is enforced on the `visualizations` collection, and bypassed entirely by the image-asset route the
draft thumbnail rides.

*Corpus overlap.* This is a concrete instance of **R3-7b** (`intakes/lane-fourier-r3-r6.md:80`) —
`securityGate: RED_0_OF_45`, zero of 45 operations declare OpenAPI security. The thumbnail operation is
one of the 45 and declares none, and the drafts panel is where that gate has an actual privacy
consequence rather than a documentation one.

*Falsifier.* If the endpoint required a session token, an `<img src>` could not send it and the panel
would show broken images instead — so the component's *usage* is consistent with the endpoint as built.
The defect is the seam, not the call. It would be falsified if drafts were never private — but the
entire draft mechanism exists to hold work before `visibility: "public"` is set at
`gallery.ts:245`. `UNPROVEN-NEEDS-LIVE`: whether a deployed instance fronts `/api/images` with an
auth proxy (the `vite.config.ts` dev proxy does not, `:68`+).

---

### C-9 · MAJOR · The one operation this component consumes is invisible to the client-edge model — an R5-7-class blindness on the API axis

`:77` reaches `GET /api/images/{imageSlug}/thumbnail` by **string construction inside a template
attribute binding**. `thumbnailUrl` (`lib/api.ts:292-294`) is a three-line template-literal builder: no
`fetch`, no `apiFetch`, no `abortable`, no headers, no `sessionToken` (`lib/api.ts:41-46`), no
problem+json decoding (`lib/api-problem.ts`).

The adjudicated corpus quantifies the client↔operation join as **36 client edges with 9 gap
operations** over 45 (**R3-7c**, `intakes/lane-fourier-r3-r6.md:81`) and **20 client functions, 2 clients
without an operation** (**R4-8**, `:106`). Both denominators are *function*-keyed.

An operation reached only by a template `src` binding is therefore **structurally invisible to that
model** — the same failure mode as **R5-7** (`:125`), where loop evidence keyed to *component* callsites
was blind to native `<li v-for>` elements and dropped the whole `PaperSidebar` TOC subtree. The API axis
has the identical hole: evidence keyed to *client functions* is blind to *template URL bindings*.

I state the correction precisely, and only as far as the evidence carries:

- `thumbnailUrl` **is** an exported function in `lib/api.ts`, so a function-level census may well count
  it among the 20. What it is **not** is a client *edge* — it never calls the operation. Whether the
  deriver's `currentClientEdges = 36` counts a URL builder as an edge is not determinable from the
  intake (the serialization is unpublished; see R4-2/R4-3, `:100-101`).
- What **is** determinable: three sibling URL builders (`imageUrl` `:288`, `thumbnailUrl` `:292`,
  `overlayUrl` `:296`) address three of the 45 operations with zero fetch semantics, and every consumer
  of them is a template binding. Any operation↔client relation built from call graphs will
  either miss them or mis-attribute them.

*Fold, not re-invention.* **R6-8** (`:142`) established that an operation record embedding derived client
back-references cannot attribute a defect to one side of the seam. This is the dual: an operation whose
only consumer is *not a client function at all* cannot be attributed to either side. Both constrain the
F.W5 shared-provenance contract, and this row supplies the second, previously unnamed case.

*Falsifier.* If any component fetched the thumbnail through `apiFetch`, the edge would be visible and
this would be a nit about one call style. `grep -rn "thumbnailUrl" web/src` → `GalleryCard.vue:100`,
`GalleryCardModal.vue`, `GalleryDraftsSection.vue:77` — all three are `<img :src>` bindings. It would
also be falsified if the intake published its edge-serialization such that template bindings were shown
to be counted — it explicitly does not (R4-3, adjudicated UNPROVEN for exactly that reason).

---

### C-10 · MAJOR · The draft key seam: `imageSlug` is documented to hold a *visualization* slug post-save, and this component would break if that documentation were ever true

`draftStorage.ts:6-16` states the contract verbatim:

> "a draft is keyed by its `visualizationSlug` once it has been saved (the slug minted by
> `POST /visualizations`). … The object-store `keyPath` stays `imageSlug` (the `WorkspaceDraft` field
> that holds the session handle: **the `visualizationSlug` once saved, else the `image_slug`**)."

`:39` acts on it, creating a DB-v2 index `by-visualization-slug` on the property `visualizationSlug`.

The tree contradicts the doc on both halves:

1. **`WorkspaceDraft` has no `visualizationSlug` field.** `lib/types.ts:83-92` — eight fields, none named
   that. So the DB-v2 index is over a property no record carries: **permanently empty**, and its sole
   reader `loadDraftByVisualizationSlug` (`:74-84`) has zero callers
   (`grep -rn "loadDraftByVisualizationSlug" web/src` → the definition only).
2. **The only writer always writes the image slug.** `workspace.ts:100` — `imageSlug: imageSlug.value`,
   where `imageSlug.value` is assigned from `meta.image_slug` (`:123`) or the route slug (`:150`).
   `visualizationSlug` is a *separate* ref (`workspace.ts:39`) and never enters a draft record.

The component's two uses of the key are consequently **correct only because the documentation is
wrong**:

- `:77` `thumbnailUrl(draft.imageSlug)` → `/api/images/{slug}/thumbnail`. Given a visualization slug this
  404s (`api/routers/images.py:151` `get_image_asset` resolves against the `images` collection's unique
  `image_slug` index).
- `:74`/`:83` `emit('open', draft.imageSlug)` → `router.push('/w/' + slug)` (`GalleryView.vue:370`), and
  `/w/:imageSlug?` loads via `loadWorkspace(slug)` → `api.getImageMeta(slug)` (`workspace.ts:144`) —
  same 404. The visualization route is a *different* record, `/v/:visualizationSlug`
  (`router/index.ts:58`).

So the panel is one honest `saveDraft` away from rendering broken thumbnails and dead links for every
saved draft.

*Attribution.* The defect is in `draftStorage.ts` (a doc + a dead index describing behaviour no writer
implements) and in `lib/types.ts` (a type that cannot express the documented union). The component is the
party that breaks. It is filed here because a consumption audit that only read the component would
conclude the key usage is safe; it is safe by accident.

*Falsifier.* If a `visualizationSlug` field existed on `WorkspaceDraft` and any writer set it, the doc
would be live and this row would collapse to "dead index". `grep -rn "visualizationSlug" web/src`
returns 14 lines: 9 in `stores/workspace.ts` (all on the standalone ref), 4 in `draftStorage.ts` (doc +
index + the dead reader), 1 in `router/index.ts` (the route param). Zero on a draft record.

---

## §3 — MINOR

### C-11 · MINOR · `:size` is inert on both lucide icons — glass-ui's `Button` CVA overrides it

`:60` `<ChevronDown :size="16" …>` and `:98` `<Upload :size="14" />`, both inside a glass-ui `Button`.

lucide-vue-next 1.0.0 renders `size` as **presentation attributes**
(`node_modules/lucide-vue-next/dist/esm/Icon.js:29-32` — `h("svg", { …, width: size, height: size, … })`).

The glass-ui Button CVA base string (`dist/button-BNDWhAZb.js`, the `cva(...)` first argument) contains:

```
[&_svg:not([class*=size-])]:size-(--ui-glyph)
```

which compiles to `… svg:not([class*=size-]) { width: var(--ui-glyph); height: var(--ui-glyph) }`. CSS
declarations beat presentation attributes unconditionally, and neither icon's class list contains the
substring `size-` — `:61` is `ml-auto text-muted-foreground transition-transform duration-200
ease-in-out`, `:98` has no class, and lucide's own auto-added classes are
`lucide lucide-chevron-down-icon lucide-chevron-down` (`Icon.js:35-40`).

So both render at `--ui-glyph` = `calc(1rem * var(--ui-scale))`
(`dist/styles/tokens/offsets-sizing.css:177`). At the desktop identity `--ui-scale: 1` (`:136`) that is
16px — the chevron is coincidentally right and the Upload is 14→16, wrong by design intent. On coarse
pointers the library lifts `--ui-scale` to `var(--ui-coarse-scale, 1.5)`
(`dist/styles/tokens/light-dark.css:19`, default `1.5` at `offsets-sizing.css:142`) and **both render at
24px**, still ignoring the props.

The escape hatch the library documents (`offsets-sizing.css:173-176`: *"KEEPING the
`:not([class*=size-])` host-sized-icon escape intact (an explicit `size-9` still wins)"*) is a `size-*`
Tailwind class, not the lucide `size` prop.

*Falsifier.* If lucide set `style="width:…"` instead of attributes, the inline style would win and the
props would be live. It does not — `Icon.js:29-31` writes them into the vnode props object as plain
attributes, and there is no `style` key. It would also be falsified if the icons carried a `size-*`
class — neither does.

*Note, not filed as a separate row:* the repo-wide idiom `class="h-3.5 w-3.5"` (e.g. `GalleryView.vue:340`)
is **also** overridden, since it too lacks the `size-` substring. That is a tree-wide pattern issue and
belongs to the F.W3 glass-ui migration budget, not to this component.

---

### C-12 · MINOR · `<MetricBadge>` renders a `<div>` inside a native `<button>` — a content-model violation

`:58` `<MetricBadge :value="sortedDrafts.length" size="sm" />` sits inside the `<Button>` opened at `:52`.

- `Button` renders a **native `<button>`**: reka-ui `Primitive` with `as: { default: "button" }`
  (`dist/button-BNDWhAZb.js`, props block), and no `as`/`as-child` is passed at `:52-56`.
- `MetricBadge`'s root is a **`<div>`**: `dist/MetricBadge-BpC0R_Ec.js` — `o("div", { class: …("metric-badge
  cursor-pointer", "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", …) })`.

`<button>`'s content model is *phrasing content*; `<div>` is flow content. Browsers recover, but the
nesting is invalid and the parser's recovery is not specified to preserve layout.

Two secondary signals from the same two lines: the badge root hard-codes `cursor-pointer` and a
`focus-visible` outline ring — styling for a standalone interactive element — on a non-focusable `div`
nested inside an already-focusable button. Nothing is functionally broken; the primitive is being used
outside the shape it was designed for.

*Falsifier.* If `MetricBadge` accepted an `as`/`asChild` prop it could render a `<span>` and this would
be a one-token fix rather than a defect. It does not: `MetricBadgeProps`
(`dist/components/custom/metric-badge/MetricBadge.vue.d.ts:5-35`) declares exactly
`value, unit, label, abbreviation, labelPosition, color, placeholder, size, class` — no polymorphic root.
Correct attribution is therefore **shared**: a glass-ui gap (relay per the standing BH/BI edict) plus a
consumer that nested it in a button anyway. It would be falsified if `Button` rendered a non-button
element — it does not, at this callsite.

---

### C-13 · MINOR · `timeAgo` is a non-reactive `Date.now()` read — every label freezes at first paint

`:28-36` computes from `Date.now()` inside a plain function called from the template (`:88`). `Date.now()`
is not a reactive source, so Vue never re-renders on its change. There is no `setInterval`, no
`useNow`/`useTimeAgo` (`@vueuse/core@^14.3.0` **is** a dependency, `web/package.json`), no tick ref.

A draft saved thirty seconds ago renders "just now" and stays "just now" until something unrelated
invalidates the subtree. The panel's re-render triggers are: a `props.drafts` identity change (only
`refreshDrafts()`, called on mount `GalleryView.vue:89` and on login `:106`), a `publishing` flip, and
`collapsed` toggling. On a tab left open, none fire.

*Falsifier.* If the drafts tab remounted frequently the staleness window would be small.
`GalleryView.vue:356` gates the tab with `v-if="activeTab === 'drafts'"`, so switching tabs *does*
remount and refresh the labels — which bounds the defect to "stale while the tab is open" rather than
"stale forever". That is why this is MINOR and not MAJOR.

---

### C-14 · MINOR · The sort key uses `localeCompare` on ISO-8601, and defends a nullish case two lines above the code that does not

`:25`:

```ts
.sort((a, b) => (b.lastOpenedAt ?? "").localeCompare(a.lastOpenedAt ?? ""))
```

Two distinct problems on one line.

**(a) Locale-dependent ordering of a machine identity.** This is exactly the defect class adjudicated at
**R3-14** (`intakes/lane-fourier-r3-r6.md:88`): `localeCompare` inside `canonicalSourceIdentity` was TRUE
as a reproducibility defect, and the cure adopted downstream was
`ordering = "UTF8_BYTEWISE_CODEPOINT"`. ISO-8601 timestamps are fixed-width, zero-padded, lexicographically
ordered by construction; `a < b` is correct, locale-independent, and roughly two orders of magnitude
cheaper than an ICU collation call per comparison. Using ICU collation to order timestamps imports a
host-locale dependency for nothing.

**(b) Asymmetric nullish defence.** `:25` guards `lastOpenedAt` with `?? ""`. `lib/types.ts:91` declares
it **non-optional** `string`. Three lines later, `:88` calls `timeAgo(draft.lastOpenedAt)` with **no**
guard, and `:28-35` on a nullish input yields:

`new Date(undefined).getTime()` → `NaN` → `ms`/`m`/`h` all `NaN` → every `<` comparison false → the
function falls through to the last line and returns **`"NaNd ago"`**.

So the file simultaneously asserts the field may be missing (`:25`) and that it may not (`:88`). One of
the two is wrong, and the failure mode of the optimistic one is a visible `NaN`.

*Falsifier.* Can the field actually be absent? Every record written by the current app has it
(`workspace.ts:103`). But `draftStorage.ts:22`'s `DB_VERSION = 2` with an `oldVersion < 2` upgrade branch
(`:38-40`) proves a v1 schema existed, and that branch adds an index **without migrating data** — so a
pre-existing v1 record survives intact. Whether v1's shape carried `lastOpenedAt` is **not determinable
from the tree** and is marked `UNPROVEN`. The *internal inconsistency* between `:25` and `:88` is fully
proven regardless, and is what carries the row. If `lastOpenedAt` is genuinely non-nullable, `:25`'s
`?? ""` is dead defence and should go; if it is nullable, `:88` prints `NaN`. Both readings are defects;
only their severity differs.

---

### C-15 · MINOR · The `<img>` has no error path, no intrinsic size, and a slug for alt text

`:76-81`. Three omissions on one element:

- **No `@error`.** Given C-1 (rows persist forever) and the API's `last_accessed_at` field
  (`lib/types.ts:60`), a draft can outlive its image asset. The failure renders as an empty `bg-muted`
  box (`:73`) indistinguishable from a slow load — no retry, no placeholder glyph, no signal.
- **No `width`/`height` (or aspect-ratio).** The box is fixed `w-12 h-12` on the parent, so CLS is
  contained — but `loading="lazy"` without intrinsic dimensions on the `<img>` itself is the
  pattern the spec warns about, and there is no `decoding="async"`.
- **`:alt="draft.imageSlug"`** — the alt text is a 4-word machine slug (`api/lib/crud/slugs.py:40-42`,
  `adjective-verb-colour-animal`), which a screen reader will read as a nonsense phrase. The adjacent
  `<span>` at `:84` renders the *same* string visually, so the image alt duplicates visible text —
  `alt=""` (decorative) would be strictly better here.

*Falsifier.* If the thumbnail endpoint could not 404, the error path would be unnecessary. It can:
`get_image_asset` (`api/routers/images.py:151`) raises on a missing asset, and `_resolve`
(`:156`/`:159`) reads a filesystem path that `FileResponse` will 404 on if absent.

---

### C-16 · MINOR · `getBasisLabel(draft)` runs twice per row per render

`:86` `{{ getBasisLabel(draft) }}` and `:87` `v-if="getBasisLabel(draft)"` — the identical call, twice,
inside the `v-for` at `:68`. The function allocates: `?? []` (`:39`), `.map` (`:42`) and `.join` (`:46`)
per call. Function calls in templates are not cached, so the cost is 2N allocations on **every** render
of the panel, including renders caused by the unrelated `publishing` flip (`:95`) — which, per C-5,
touches every row.

The fix is one line: hoist to `computed(() => new Map(...))` keyed by `imageSlug`, or bind
`:key`-scoped once via a `v-for` over a precomputed rows array. The tree already prefers this shape —
`GalleryCard.vue:36` and `GalleryCardModal.vue:41` both wrap the same mapping in a `computed`.

*Falsifier.* If N were bounded and small the cost would be immaterial — but C-1/C-2 guarantee N is
unbounded and monotonic, which is precisely what turns a nit into a compounding one. Still MINOR: even at
N = 500 this is microseconds.

---

## §4 — INFO (defects, at INFO severity)

### C-17 · INFO · The outer `v-if` is dead — the parent already gates on the same predicate

`:51` `v-if="sortedDrafts.length > 0"`. The only consumer renders the component as
`GalleryView.vue:365-371` `<GalleryDraftsSection v-else …>`, where the `v-if` it is `v-else` to is
`:358` `v-if="!unpublishedDrafts.length"` — and `:367` passes that same array as `:drafts`. The component
therefore never mounts with an empty list, and `sortedDrafts.length > 0` is invariantly true.

*Falsifier.* A second consumer without the guard would make it live. There is exactly one consumer
(`grep -rn "GalleryDraftsSection" web/src` → `GalleryView.vue:29,365`). Harmless as defence-in-depth;
recorded because it hides the fact that the empty-state copy lives in the parent (`:361-363`) rather than
in the component that owns the list.

### C-18 · INFO · The scoped `<style>` block contains only `@reference "tailwindcss"` and no rules

`:106-108`. `@reference` exists to make Tailwind's theme available to `@apply` inside a scoped block;
there is no `@apply` and no rule. The block still causes the SFC compiler to emit a `__scopeId` and stamp
`data-v-*` on every element in the template, for zero CSS.

Its three gallery siblings carry the identical preamble **followed by real rules** —
`GalleryCard.vue` (`.gallery-card { box-shadow: … }`), `GalleryAdminBanner.vue` (`.admin-stat { … }`) —
and `UserSlugBar.vue` omits `@reference` entirely because it uses no `@apply`. This file is the
leftover shell of a deleted rule set.

### C-19 · INFO · `drafts-header` has zero readers anywhere; `draft-item` is load-bearing

`:54` declares `drafts-header`; `grep -rn "drafts-header" web/src web/e2e` → the declaration only. Dead
hook.

Its sibling is **not** dead and must not be swept with it: `draft-item` (`:70`) is a live Playwright
selector at `e2e/gallery.spec.ts:38` (`page.locator(".draft-item")`), inside the assertion that the
drafts tab renders. Any cleanup that removes both breaks the e2e suite. Recorded specifically because the
two look identical and only one is safe to delete.

### C-20 · INFO · The props/emits payloads are far wider than the render needs

`:11` takes `WorkspaceDraft[]`. The template reads exactly three fields — `imageSlug` (`:69,74,77,78,83,84`),
`animationSettings.active_bases` (via `:39`), `lastOpenedAt` (`:25,88`). The type
(`lib/types.ts:83-92`) also carries `contour`, `contourSettings`, `epicycleData`, `basesData`,
`savedSnapshots` — of which `epicycleData` and `basesData` are the full harmonic payloads.

`:16` then emits the **whole entity** back up (`publish: [draft: WorkspaceDraft]`), which the parent
forwards verbatim to the store (`GalleryView.vue:210`). That is defensible — the store genuinely needs
`contour.contour_hash`, `contourSettings` and `animationSettings` (`gallery.ts:245-255`) — but it means
the presentational component is coupled to the persistence shape in both directions. A row-view type
(`{ slug, basisLabel, lastOpenedAt, canPublish }`) plus `publish: [slug: string]` would sever it and
would have made **C-4** (the `contour: null` precondition) undeclarable-and-therefore-unmissable.

*Falsifier.* If the component projected the fields itself this would be pure nit — it does not; it holds
the full objects and hands them back. Filed at INFO because nothing observable breaks.

---

## §5 — Examined and ruled NOT defects (excluded from the 20)

### I-1 · `rounded-none` versus glass-ui's `.btn-pill` border-radius — the cascade resolves it correctly

`:54` puts `rounded-none` on a `Button` whose CVA base includes `btn-pill`, and glass-ui defines
`.btn-pill { … border-radius: var(--radius-pill); … }`
(`dist/styles/glass/surfaces.css:119-135`). `cn`/tailwind-merge does not know `btn-pill` and cannot strip
it, so the obvious reading is a non-deterministic shape override — a pill header inside a
`rounded-lg overflow-hidden` container (`:51`).

**That reading is wrong.** `surfaces.css:6` opens `@layer components`, and Tailwind v4 orders
`theme, base, components, utilities`. `rounded-none` is a utility; the utilities layer wins over the
components layer regardless of specificity. The same reasoning clears `py-2 px-3` against
`.btn-pill`'s `padding`, `gap-1.5` against its `gap`, and `justify-start` against its
`@apply … justify-center`. Not a defect.

Recorded because a consumption audit that stopped at "twMerge can't see `btn-pill`" would have filed a
confident false positive, and L-18 obliges the falsifier to run in the direction that costs a finding.

### I-2 · The toggle `<Button>` carries no `type="button"`

`:52-56` passes no `type`, so reka-ui's `Primitive` renders `<button>` with `type` unset — HTML's default
is `submit`. Inside a `<form>` that would submit on every collapse toggle.

There is no ancestor `<form>`: `GalleryView.vue` (whole file read) contains none, and the drafts subtree
is `div`-rooted from `:220`. Not a defect **at this callsite**. Not generalised into a finding because
the risk is entirely contextual and the context is clean.

### I-3 · Zero value.js consumption

The component imports nothing from `@mkbabb/value.js` and performs no colour or easing math. That is
correct, not a gap: it renders text and a `<img>`. It is also what makes it the only `basisDisplay`
consumer immune to the sibling's C-3/C-4 (§0). The *cost* of the transitive edge it does carry is filed
under C-3, not here.

---

## §6 — SUPERLATIVES (each with its falsifier)

### S-1 · Both glass-ui imports are subpath imports, and both subpaths genuinely exist

`:7` `@mkbabb/glass-ui/button`, `:8` `@mkbabb/glass-ui/metric-badge`. I read glass-ui 4.0.0's `exports`
map (80 entries) and confirmed both:

```
"./button":       { types: "./dist/button.d.ts",       import: "./dist/button.js" }
"./metric-badge": { types: "./dist/metric-badge.d.ts", import: "./dist/metric-badge.js" }
```

This is the correct posture, and it avoids the barrel pull that the sibling challenge had to rule
*forced* for `Checkbox` (I-1 there — `./checkbox` is absent from the map). Here nothing forces a barrel
and none is taken.

*Falsifier, and it partly fires.* The app-wide benefit is nullified by one other file:
`components/ui/CollapsibleSection.vue:2` imports `Collapsible, CollapsibleTrigger, CollapsibleContent`
from the bare barrel, and `vite.config.ts:51-55` names `"@mkbabb/glass-ui"` in `manualChunks`, so the
whole index reaches `vendor-ui` regardless. The superlative therefore stands as **component discipline**,
not as a delivered byte saving — and it names the one edit that would convert it into one. Notably,
`CollapsibleSection` is the very component C-7 says this file should have used, and it is the file
holding the barrel edge; fixing C-7 and S-1's caveat is one coordinated change.

### S-2 · `props.drafts.slice().sort(...)` — the non-mutating sort, correctly

`:23-25`. `Array.prototype.sort` mutates in place. `props.drafts` is the parent's `computed`
(`GalleryView.vue:76-81`); sorting it in place would mutate a computed's cached array, producing an
order-dependent value that Vue would not invalidate. The `.slice()` at `:24` is exactly right, and it is
placed before `.sort`, not after.

*Falsifier.* If `props.drafts` were always a fresh array, the copy would be redundant. It is a `computed`
whose `.filter` output is cached until its deps change — so between changes, every read returns the
**same** array instance, and an in-place sort would persist into the parent's cache. The guard is
load-bearing. Holds.

### S-3 · `basisDisplay[key]?.label ?? b` — the optional chain is the right shape for an open vocabulary

`:44`. `active_bases` is typed `string[]` (`lib/types.ts:50`), not a union — the API accepts any string
(`gallery.ts:250-252` forwards it unvalidated). `basisDisplay` is `Record<string, {…}>`
(`basis-display.ts:3`), whose index signature makes TypeScript hand back a non-optional value that is
`undefined` at runtime for an unknown key. The `?.` closes that hole and the `?? b` degrades to the raw
id rather than to `undefined` or a crash.

*Falsifier, and it names its own cost.* The two sibling implementations chose the opposite policy —
`if (!cfg) return null` + `.filter(Boolean)` (`GalleryCard.vue:41,50`) — i.e. *drop* unknown bases. Both
policies are defensible; showing the raw id is arguably the better one for a drafts panel where the user
owns the data. The superlative is that the runtime hole is closed at all, under a `Record` index
signature that TypeScript would not have flagged. The *divergence* between the two policies is filed
against this file at C-3, and this row does not excuse it.

### S-4 · Zero keyframes.js consumption is the correct call

`@mkbabb/keyframes.js@^4.3.0` is a dependency with exactly one live import in the tree —
`composables/useFourierMorph.ts:14` (`loadAnimationEngine`) — and one documented *removal*
(`stores/animation.ts:47`: "The previous incarnation imported `Animation` from `@mkbabb/keyframes.js`").
A disclosure needs a CSS `data-state` channel, not a JS animation engine; importing keyframes.js here
would have pulled the `vendor-keyframes` chunk (`vite.config.ts:56`) into the gallery route for a height
transition.

*Falsifier, and it fires halfway.* "Correctly zero" is only half a compliment, because the component
ships **no** collapse transition at all while animating its chevron (`:61`) — so the restraint reads as
omission rather than judgement. The correct target was glass-ui's `collapsible-open`/`collapsible-close`
(C-7), not keyframes.js. The superlative survives narrowly: of the two ways to get this wrong, it avoided
the expensive one.

### S-5 · Every glass-ui prop passed is type-valid against the shipped 4.0.0 definitions

Four prop bindings, all checked against the installed package rather than assumed:

| callsite | prop | verified against |
|---|---|---|
| `:53` | `variant="ghost"` | Button CVA variants: `default, solid, primary-audacious, gold-audacious, destructive, outline, secondary, accent, ghost, glass, glass-wash, ai, link` |
| `:92` | `variant="outline"` | same list — present |
| `:93` | `size="sm"` | Button CVA sizes: `default, xs, sm, lg, icon, icon-sm` |
| `:58` | `:value` (number), `size="sm"` | `MetricBadgeProps` — `value: MetricValue`, `size?: 'sm' \| 'md' \| 'lg' \| 'xl'` (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts:5-35`) |

`MetricBadge` is additionally the *semantically* right primitive for a count: its own doc comment states
*"A valid `0` renders `"0"`, never the placeholder"* (`MetricBadge.vue.d.ts:6-7`), and the compiled
`coalesceMetric` path (`MetricBadge-BpC0R_Ec.js`, `g = i(() => t(c.value, c.placeholder))`) confirms the
zero/empty distinction is real, not aspirational.

*Falsifier.* If `variant="outline"` or `size="sm"` had been dropped in 4.0.0 — plausible, since the
CVA carries an unusual variant set — the bindings would silently fall through to `defaultVariants`
(`variant: "default"`, `size: "default"`) with no type error, because CVA variant props are typed from
the config and a stale name would fail at build, not at runtime. I enumerated the shipped config rather
than trusting the names. Both are present. The falsifier does not fire — and separately, the *nesting*
of the type-valid `MetricBadge` is a defect (C-12), which is why this row is scoped to prop conformance
only.

---

## §7 — Arithmetic

| severity | rows | count |
|---|---|---:|
| BLOCKER | C-1, C-2 | **2** |
| MAJOR | C-3 … C-10 | **8** |
| MINOR | C-11 … C-16 | **6** |
| INFO | C-17 … C-20 | **4** |
| **defects** | | **20** |
| ruled NOT defects | I-1, I-2, I-3 | 3 (excluded) |
| SUPERLATIVES | S-1 … S-5 | **5** |

**Corpus rows cited** (folded, not re-derived): R3-7b (`:80`) at C-8 · R3-7c (`:81`) at C-9 ·
R3-14 (`:88`) at C-14 · R5-7 (`:125`) at C-9 · R6-8 (`:142`) at C-9 · R4-2/R4-3 (`:100-101`) at C-9
(as the reason the edge-serialization claim stays UNPROVEN) · the sibling challenge's C-3/C-4
(`GalleryCard/challenge-C-consumption.md:157,205`) at §0 and C-3.

**Corpus contradicted:** none. C-9 *extends* R3-7c's 36-edges/9-gaps figure with a case the
function-keyed denominator cannot see; it does not claim the published number is wrong, because the
serialization required to check that is unpublished (R4-3, adjudicated UNPROVEN).

**`UNPROVEN-NEEDS-LIVE` (SS-13):** the IndexedDB quota behaviour under C-2's unbounded growth; whether a
deployed instance fronts `/api/images` with an auth proxy (C-8). Both are named inline.

---

## §8 — The single repair that matters

**C-1.** Everything else in this file is a quality gradient; C-1 is the panel telling the user a lie.
Two lines fix the visible half — have `publishDraft` push the returned `data.slug` onto
`draft.savedSnapshots` and re-`saveDraft` before `resetAndFetch()` — but the durable fix is the contract:
stop reconciling published state through a field the only writer unconditionally zeroes
(`stores/workspace.ts:102`), and give this component the `published` bit in its props. That one change
also disarms **C-2** (a published draft becomes removable), makes **C-5**'s per-row identity natural, and
turns **C-4**'s precondition into a rendered state rather than a toast.
