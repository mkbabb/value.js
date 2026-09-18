claude-opus-5[1m]

# CHALLENGE · `ImageUpload.vue` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ImageUpload.vue` (207 lines)
**Axis** how this component consumes value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the 45-operation fourier API; props/emits contract; integration seams.
**Mode** static, read-only. No dev server, no browser. Live-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below — defect *and* superlative (L-18 runs both ways) — carries severity, `file:line` provenance, and the falsifier that would kill it.

**Read whole (read-only):**
`ImageUpload.vue` · `composables/useImageUpload.ts` (106) · `@/stores/workspace.ts` (471) · `@/lib/api.ts` (672) · `@/lib/types.ts` §ImageMeta · `@/lib/colors.ts` (117) · `web/package.json` · `web/tsconfig.app.json` · `web/src/style.css` §cartoon-card · `VisualizationView.vue` (the sole mount site) · `api/routers/images.py` · `api/dependencies.py` · `api/config.py` · `e2e/visualization-crud.spec.ts` · glass-ui 4.0.0 installed `dist/` + producer 7.0.0 `src/`.

**Hitherto corpus folded, not re-invented:** `formation/fourier/lane-frontend.md` (§1 pins, §3 glass-ui census, §5 break surface, §9 carries), `CENSUS-2026-08-03.md`, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (38/52 TRUE). Row ids cited where they overlap; contradictions stated explicitly.

---

## §0 · Headline

**ImageUpload consumes none of the three first-party packages the tranche is migrating.** Zero `@mkbabb/glass-ui`, zero `@mkbabb/keyframes.js`, zero `@mkbabb/value.js` — in a 207-line file that hand-rolls an indeterminate progress bar, an animation, a palette, and a drop-zone card, every one of which has a producer counterpart available **at the currently pinned version**. lane-frontend §3 measured 51 of 66 SFCs importing glass-ui and called the posture "the cleanest glass-ui consumer in the constellation." **This file is one of the 15 that do not, and it is not a bespoke-with-no-analogue case** — `./progress` (with `indeterminate`) and `./card` both ship at 4.0.0 and at 7.0.0.

The sharpest consequence is a tranche-planning one, and it is new:

> **The F.W2 value.js migration inventory is grep-defined.** lane-frontend §5/§9-5 sizes the value.js leg as "tiny — 5 sites, `easeInOutSine` + `timingFunctions`", derived from `grep "@mkbabb/value.js" src/`. `ImageUpload.vue` inlines six literal hexes (`:150-156`) that are byte-identical to `lib/colors.ts:13-16` `STATIC.rainbow`, the palette registry. It has **no import**, so it appears in no migration inventory, and it will survive F.W2 untouched — silently diverging from whatever `VIZ_COLORS` becomes. A migration scoped by import sites cannot see its own copies.

Second: the component's two live API edges are consumed through **two different channels with two different hardening levels**, and one of them is not a client function at all — extending intake **R6-8** rather than repeating it (§4).

Third, and worst: an **advertised-but-rejected upload format** (`SVG`) meets a **structurally unrenderable error path**, producing a silent, reproducible, source-derived failure (§1 C-1/C-2).

**Tally: 22 defects (3 BLOCKER / 8 MAJOR / 8 MINOR / 3 INFO) · 7 superlatives.**

---

## §1 · BLOCKERS

### C-1 — BLOCKER · The empty-state strip advertises a format the API rejects with 400

`ImageUpload.vue:108-110` renders the only format contract the user ever sees:

```
Drop or click to upload — PNG/JPG/SVG ≤ 10 MB
```

`api/routers/images.py:62-65` is the server's whole allow-list:

```python
ALLOWED_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".tif", ".webp",
    ".gif", ".heic", ".heif", ".avif",
}
```

`.svg` is **absent**. `images.py:99-101` raises `HTTPException(400, f"Unsupported format: {ext}")`. `_valid_image_magic` (`images.py:41-59`) carries no SVG signature either — SVG is text, so it would fail the magic gate even if the extension were admitted.

The client-side gate *passes* SVG: `useImageUpload.ts:4-6` puts `"svg"` in `IMAGE_EXTENSIONS`, and `isImageFile` (`:9`) short-circuits on `file.type.startsWith("image/")` — the browser reports `image/svg+xml`. The `<input accept="image/*">` (`ImageUpload.vue:124`) also admits it. So an SVG traverses every client gate, is rendered as a local preview (`useImageUpload.ts:77-83` → `readAsDataURL`), and only then 400s at the server.

**Falsifier.** Any of: (a) `.svg` present in `ALLOWED_EXTENSIONS`; (b) an SVG branch in `_IMAGE_MAGIC`/`_valid_image_magic`; (c) a pre-upload SVG rasterisation step between `ImageUpload.vue:15` and `api.uploadImage`. None exists — `grep -n "svg" api/routers/images.py` returns nothing.

**Coupling note (this is not a free fix).** `e2e/visualization-crud.spec.ts:167-171` asserts `getByText("Drop or click to upload", { exact: false })` as the ImageUpload mount signal. The prefix survives an edit to the format list, but `settings-persistence.spec.ts` and `visualization-ux.spec.ts` also drive this input; re-word the tail only.

### C-2 — BLOCKER · A failed *replace* upload is structurally invisible, and rejects unhandled

Two independent mechanisms conspire.

**(a) The error is unrenderable.** `stores/workspace.ts:127-129` stores the message (`error.value = e.message ?? "Upload failed"`) and re-throws. The **only** render site for `store.error` in the entire visualization surface is `VisualizationView.vue:162`:

```html
<div v-else-if="store.error && !store.imageSlug" ...>
```

`!store.imageSlug` gates it. On the first-ever upload `imageSlug` is null and the error shows. On **every replace** — the exact flow this component's populated state exists to serve (`:70-84`, "Drop to replace") — `imageSlug` is already set, the branch is dead, and `ImageUpload.vue` itself renders no error state anywhere in its 94 template lines.

**(b) The rejection is unhandled.** `useImageUpload.ts:13` types the callback `onFile: (file: File) => void`. `ImageUpload.vue:13-16` passes an `async` function (assignable — `Promise<void>` widens to `void`). The composable invokes it bare at `useImageUpload.ts:38` and `:69` — no `await`, no `.catch`. `store.uploadImage`'s `throw e` (`workspace.ts:129`) therefore lands on an unobserved promise: an `unhandledrejection` in the console and nothing on screen.

**The composed failure**, fully source-derived: with an image already loaded, drop an SVG. `setPreview` renders it locally (`useImageUpload.ts:37`, `:77-83`) → `hasPreview()` is true → the user sees their SVG in the card. The POST 400s. The error is stored but unrenderable (a). The rejection is swallowed (b). `store.imageSlug`, `store.imageMeta` and `store.contour` still hold the **previous** image. Every downstream operation — `extractContour`, `computeEpicycles`, `computeBases` (`workspace.ts:241-337`) — runs against the old image while the panel displays the new one. **No error is shown at any point.**

**Falsifier.** Any of: a `store.error` render inside `ImageUpload.vue`; a `try/catch` around `await store.uploadImage(file)` at `:13-16`; a `.catch` at `useImageUpload.ts:38`/`:69`; or a second `store.error` render site whose condition does not require `!store.imageSlug` (`grep -rn "store.error\|\.error" web/src/components/visualization/` → `VisualizationView.vue:162,165` only).

### C-3 — BLOCKER · The replace affordance is keyboard- and AT-unreachable

`ImageUpload.vue:70-76` — the populated state's only path to `openFilePicker`:

```html
<div class="absolute inset-0 ... cursor-pointer" :class="{...}" @click="openFilePicker">
```

A bare `<div>` with a click handler: no `role="button"`, no `tabindex`, no `@keydown.enter/@keydown.space`, no `aria-label`. It is not in the tab order and exposes no accessible role or name. Once an image is loaded, **replacing it requires a mouse** (or a drag, which C-8 puts in doubt).

The asymmetry is the proof of intent: the *empty* state at `:92-111` is a correct `<button type="button">` with a matching `:focus-visible` ring at `:199-202`. The author knew the right shape and did not apply it to the populated branch.

**Aggravating provenance.** `git log -- web/src/components/visualization/ImageUpload.vue` shows `9bd80b3 feat(F.W4-W5): δ a11y + SEO + perf — aria-labels, meta-description, robots.txt, ...` touched this file. A dedicated a11y wave passed over it and left the div-button standing. WCAG 2.1.1 (Keyboard, Level A) and 4.1.2 (Name/Role/Value, Level A).

**Falsifier.** A `role`/`tabindex`/keydown binding on `:70-76`, or an alternate keyboard route to `openFilePicker` while `hasPreview()` is true. The `<input>` at `:120-127` is `class="hidden"` (`display:none`), so it is not focusable and is not that route. The `<button>` at `:92` is `v-else` — it does not exist in this state.

---

## §2 · MAJOR — store / API seam

### C-4 — MAJOR · The progress affordance is wired to a flag the component's own operation never sets

`ImageUpload.vue:114-118` gates the rainbow bar on `store.computing`. But `workspace.ts:111-133` `uploadImage` sets **`loading`**, not `computing`:

```
:112  loading.value = true
:131  finally { loading.value = false }
```

`computing` is moved only by `beginCompute`/`endCompute` (`workspace.ts:62-69`), called from `extractContour`, `saveContourPoints`, `runComputeEpicycles`, `runComputeBases` — never from `uploadImage`. `invalidateInFlightComputation` (`:86-91`) does not touch it either.

So the *image upload* card shows **no progress during an image upload** — a multipart POST of up to 10 MB with zero feedback — and shows a busy bar during contour/epicycle compute, which is not its operation and is already surfaced elsewhere in the panel.

**Falsifier.** A `beginCompute()` in `uploadImage`, or a `store.loading` reference in `ImageUpload.vue`. `grep -n "loading" web/src/components/visualization/ImageUpload.vue` → no match.

### C-5 — MAJOR · The file input is never reset, so re-selecting the same file is a no-op

`ImageUpload.vue:120-127` binds `@change="handleFileSelect"`. `useImageUpload.ts:65-72` reads `input.files?.[0]` and never clears `input.value`. `change` does not fire when the same file is re-chosen, so the second selection is silently dead.

This is not hypothetical friction — the store **documents that flow as the desired one** (`workspace.ts:119-121`):

> `// Always upload: store_image_asset deduplicates by sha256 and regenerates the thumbnail with current processing (EXIF transpose). Skipping the upload on hash match would leave stale thumbnails.`

And the sibling input in the same tree **does** reset: `VisualizationView.vue:141` — `if (canvasFileInput.value) canvasFileInput.value.value = "";`. Two inputs, same store action, one correct.

**Falsifier.** An `input.value = ""` in `handleFileSelect` (`useImageUpload.ts:65-72`) or a `:key` forcing input re-creation. Neither exists.

### C-6 — MAJOR · Same-slug re-upload pins a multi-MB data URL forever and defeats the thumbnail regeneration

`ImageUpload.vue:20-23` is the only `clearPreview()` caller, and it fires on `store.imageSlug` **change**. `store_image_asset` deduplicates by sha256, so re-uploading the same image returns the same `image_slug`; the ref does not change; the watcher does not fire; `preview` is never cleared.

Consequences, both real:

1. **Retention.** `preview` holds the `readAsDataURL` result (`useImageUpload.ts:77-83`) — base64, ≈1.33× the file, so up to **~13.3 MB of string** for a 10 MB upload — retained for the component's lifetime with no path to release it. `clearPreview` (`:85-90`) exists and is unreachable in this state.
2. **The regeneration is defeated at the consumer.** `:65` prefers `preview` over `thumbnailUrl(...)`. The store re-uploaded specifically to regenerate the thumbnail; the panel then shows the *client-side* bytes instead and never displays the regenerated server thumbnail. Compounded by cache: `images.py:159-163` serves the thumbnail with `Cache-Control: public, max-age=86400` at a **stable, un-busted URL** (`api.ts:292-294` — no `?v=`, no sha256 query), so even after a reload the browser can serve the pre-regeneration thumbnail for 24 h.

**Falsifier.** A `clearPreview()` on upload success, a `watch` on `store.imageMeta.sha256` rather than `imageSlug`, or a cache-busting parameter in `thumbnailUrl`. `api.ts:292-294` is a three-line template literal with none.

### C-7 — MAJOR · Every drop on the card invokes `store.uploadImage` twice; the abort registry masks it into an unhandled rejection

Neither `handleDrop` nor the three drag handlers call `stopPropagation()` (`useImageUpload.ts:32-63` — `preventDefault()` only). `VisualizationView.vue:140-143` puts the **second** `useImageUpload` instance's handlers on the template's **root** element:

```html
<div class="flex flex-col flex-1 min-h-0"
     @drop="globalDrop" @dragover="globalDragOver"
     @dragenter="globalDragEnter" @dragleave="globalDragLeave">
```

and `<ImageUpload />` is a descendant at `:263`. `VisualizationView.vue:41-42` binds `globalDrop` to `async (file) => { await store.uploadImage(file); }`. A `drop` reaching the card therefore runs the target handler and then, by bubbling, the ancestor handler — **two `store.uploadImage(file)` calls for one gesture.**

The registry hides it rather than preventing it. `api.uploadImage` (`api.ts:275-282`) passes `abortKey = "uploadImage"`; `coreFetch` calls `abortable(abortKey)` (`api.ts:161`) **synchronously**, before its first `await`, and `abortable` (`:54-59`) aborts the prior controller for that key. So call 2 kills call 1. Call 1 rejects `AbortError` → `workspace.ts:128` correctly suppresses the message (`isAbortError`) but `:129` still re-throws → per C-2(b) that lands unobserved. Net observable: one successful upload, **one guaranteed unhandled `AbortError` per card drop**, `revision`/`epicycleRevision`/`basesRevision` each incremented twice (`workspace.ts:86-91`), `contour`/`epicycleData`/`basesData` nulled twice, and `loading` toggled by two interleaved `finally` blocks.

**Falsifier.** A `stopPropagation()` in `useImageUpload.handleDrop`, a `.self` modifier at `ImageUpload.vue:39`, or a non-descendant relation between `VisualizationView.vue:140` and `:263`. All three are contradicted by the cited lines. (The *degree* of harm depends on C-8's overlay interposition — but the structural double-binding is proven statically regardless.)

### C-8 — MAJOR · The card's entire drag affordance is architecturally shadowed by the ancestor's full-viewport overlay — **UNPROVEN-NEEDS-LIVE (SS-13)**

`ImageUpload.vue:54-56`, `:70-84`, `:96-107` implement a per-card drag state: a dashed primary ring, a `bg-primary/10` wash, a "Drop to replace" chip, and an `.is-dragging` strip tint. All of it keys off `isDragging`.

`VisualizationView.vue:146-147` mounts, on the first `globalDragging` flip, a **full-viewport** interposer:

```html
<div v-if="globalDragging" class="fixed inset-0 z-[var(--z-overlay)] ..." @drop="globalDrop" @dragover.prevent>
```

`fixed inset-0`, no `pointer-events: none`, its own `@drop`. Once mounted it is the drag target for the whole viewport, including the region the card occupies.

Statically provable preconditions: (i) the overlay covers the card; (ii) `useImageUpload.ts:36-38` (`handleDrop`) and `:56-63` (`handleDragLeave`) are the **only** two resets of `dragCounter`/`isDragging`; (iii) if the drop is consumed by the ancestor, neither runs on the card's instance.

Two live manifestations follow, and static analysis cannot choose between them:
- the card's `dragleave` fires when the overlay interposes → `isDragging` returns to false and the whole per-card affordance is **dead decoration** that no user can see for more than a frame; or
- `dragleave` does not fire → `dragCounter` stays at 1 and `isDragging` **sticks true**, leaving the dashed ring and "Drop to replace" chip pinned on screen after the drag ends.

**Falsifier / live test.** Drag an image file over the ImageUpload card in a running app with an image already loaded, then drop. Confirm which of `ImageUpload`'s `handleDrop` vs `VisualizationView`'s `globalDrop` receives the event, and read `isDragging` after the drop. Either outcome confirms the defect; a third outcome (card handler receives it *and* `isDragging` resets *and* no double-invocation) would refute both this row and C-7.

---

## §3 · MAJOR — producer non-consumption (glass-ui / keyframes / value.js)

### C-9 — MAJOR · A hand-rolled indeterminate progress bar with zero a11y, while `glass-ui/progress` ships one **at the pinned version**

`ImageUpload.vue:114-118` + `:133-176` = 47 lines of markup and CSS implementing an indeterminate busy indicator. It carries **no `role="progressbar"`, no `aria-busy`, no `aria-label`, no `aria-valuetext`** — to a screen reader the component is silent while the app is busy.

The producer primitive exists **at the installed pin**, not only at 7.0.0:

```
$ node -e 'Object.keys(require("@mkbabb/glass-ui/package.json").exports)'   # installed 4.0.0
… ./progress …
$ cat node_modules/@mkbabb/glass-ui/dist/components/ui/progress/Progress.vue.d.ts
    variant?: "default" | "gradient" | "sectioned";
    /** Gradient only — indeterminate sweep opt-in. */
    indeterminate?: boolean;
```

`<Progress variant="gradient" indeterminate />` is the exact shape, and it is built on reka-ui `ProgressRoot` (producer `glass-ui/src/components/progress/Progress.vue:3`), which supplies the ARIA the local version lacks. **This is not a 4→7 uplift item and not a shadow-of-an-absent-primitive** — unlike lane-frontend §4's `EasingPicker` (`./easing` ABSENT at 4.0.0). It is available today.

**Falsifier.** Show `./progress` absent from the installed 4.0.0 export map, or `indeterminate` absent from the 4.0.0 `.d.ts`. Both are quoted above from `web/node_modules/`.

### C-10 — MAJOR · An infinite animation with no `prefers-reduced-motion` guard

`ImageUpload.vue:159` — `animation: rainbow-slide 1.4s linear infinite;` — with no reduced-motion gate anywhere in the file (`grep -n "prefers-reduced-motion" ImageUpload.vue` → no match).

lane-frontend §8 enumerated the tree's eight `@media (prefers-reduced-motion: reduce)` blocks and booked the gap as carry §9-9, naming only `stores/animation.ts` and `ConvergencePlot.vue`. **This is a third, previously unnamed site**, and it is a CSS one — cheaper to fix than either of the two the lane booked. `store.computing` stays true across sequential compute steps by design (`workspace.ts:61-69` depth counter), so the animation routinely runs well past the WCAG 2.2.2 five-second threshold for auto-starting moving content, with no pause control.

**Falsifier.** A reduced-motion block in `ImageUpload.vue:131-207`, a global `@media (prefers-reduced-motion) * { animation: none }` in `style.css` (its 143 lines contain no such rule — see lane-frontend §8's enumeration), or evidence that `computing` cannot exceed 5 s.

### C-11 — MAJOR · Six palette literals duplicated from the registry that owns them — and invisible to the F.W2 value.js inventory

`ImageUpload.vue:150-156`:

```css
#f87171 0%, #fbbf24 17%, #34d399 33%, #60a5fa 50%, #c084fc 67%, #f472b6 83%, #f87171 100%
```

`lib/colors.ts:13-16`:

```ts
rainbow: [ "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#c084fc", "#f472b6" ] as const,
```

Byte-identical, same order. `colors.ts:82-92` exposes them as the reactive `VIZ_COLORS.rainbow`, and `App.vue:11-17` re-resolves `VIZ_COLORS` on every dark-mode flip via `MutationObserver`. The inlined copy participates in none of that.

**Why this is a CONSUMPTION defect and not merely a DRY nit.** `colors.ts:19-73` is precisely the hand-rolled arm the axis brief names — `cssVarToHex` / `hslToHex` / `rgbToHex`, a bespoke CSS-colour parser and two colour-space converters, in a tree that already depends on `@mkbabb/value.js@0.13.0`, whose root export map (the only entry: `{".": …}`) carries `Color`, `ColorSpace`, `colorUnit2`, `mix`, `mixColors`, `interpolate`, `interpolateHue`. F.W2's job is to retire those arms onto the library. **`ImageUpload.vue` will not appear in that work order**: the inventory is `grep "@mkbabb/value.js" web/src` → 5 sites (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`), and this file has no import. It sits one level *below* the migration surface — a copy of the thing being migrated, with no edge to it. After F.W2 the registry moves and the literals do not.

**Falsifier.** Show the two hex sequences differ, or a `VIZ_COLORS`/`--viz-*` reference in `ImageUpload.vue:131-207` (there is none; the rainbow block uses `var(--muted)` for the *track* at `:141` and raw hex for the *bar*), or a documented reason the busy bar must not follow the theme.

---

## §4 · The API seam — the 45-operation surface, folded against R6-8 / R3-7c

ImageUpload's reachable slice of the 45-operation surface is exactly **2 of the 7 `images.py` operations** (intake §0: `images.py` 7):

| operation | client channel | hardening it gets |
|---|---|---|
| `POST /api/images` | `store.uploadImage` → `api.uploadImage` (`api.ts:275-282`) → `apiFetch` → `coreFetch` | session header, abort registry, 429 retry, `ApiProblem`, typed `ImageMeta` |
| `GET /api/images/{slug}/thumbnail` | `thumbnailUrl()` (`api.ts:292-294`) interpolated into `:src` at `ImageUpload.vue:65` | **none of the above** |

### C-12 — INFO · `thumbnailUrl` is a URL builder, not a client — an API operation consumed with the client layer bypassed entirely

`api.ts:292-294` returns a template string. The GET is issued by the browser's image loader, so it traverses none of `coreFetch` (`api.ts:115-203`): no `X-Session-Token` (`:132-134`), no entry in the `inflight` abort registry (`:52-59`) — meaning `abortInflight` in `invalidateInFlightComputation` (`workspace.ts:90`) can never cancel it — no `retryOn429` (`:172-178`), no RFC 7807 `ApiProblem` (`:182`), no ETag capture (`:185`). Its **only** failure channel in the whole system is `ImageUpload.vue:68` `@error="onImgError"`.

**This extends intake R6-8 rather than repeating it.** R6-8 established that an operation record embedding derived client back-references cannot attribute a defect to one side of the seam (C31: a client-side `PATCH→PUT` edit mutated `client.method.visualization-update` **and** `operation.method.visualization-update`). The complementary hole is here: for `GET /api/images/{slug}/thumbnail` the client "edge" is a **string interpolation in a template**, not a client function at all. A deriver that forms client edges from `apiFetch` call-sites — which is how `api.ts`'s 20 client functions (R4-8 `clientFunctions: 20`) are enumerated — cannot see it. This is the same structural blind spot R5-7 found for template loops (component-callsite-keyed evidence blind to native element loops), one layer up.

**Live coupling the tranche must budget.** `get_image_thumbnail` (`images.py:150-165`) takes no auth dependency — `get_image_asset` (`dependencies.py:52-77`) does slug validation, 404/410 and a `last_accessed_at` touch, and no session check. So thumbnails are readable by slug without a session, for an entity model with `draft`/`unlisted`/`public` visibility. Cross-reference **R3-7b** (`OpenAPI security 0 of 45`, `securityGate: RED_0_OF_45`, CARRY → F.W5). The consumption consequence: if F.W5 hardens this operation, **the `<img src>` channel cannot carry a token**, so every consumer breaks at once — 4 sites (`ImageUpload.vue:65`, `GalleryCard.vue:100`, `GalleryDraftsSection.vue:77`, plus `overlayUrl` at `GalleryCardModal.vue:79` and `useImageOverlay.ts:69`). Auth hardening on any image GET is a client-architecture change, not a header addition.

**Falsifier.** Show `thumbnailUrl` routing through `coreFetch`, or an auth dependency on `images.py:149-165`. Neither exists.

### C-13 — INFO · Three dead client functions in the images arm — two of R3-7c's nine gap operations, now named

```
$ grep -rn "imageUrl\|checkImageHash\|computeSha256" web/src | grep -v "web/src/lib/api.ts"
(empty)
```

`api.ts:260-266` `computeSha256`, `:268-273` `checkImageHash`, `:288-290` `imageUrl` have **zero consumers**. `checkImageHash` + `computeSha256` are the residue of a client-side dedup path the store explicitly retired — `workspace.ts:119-121` documents the decision ("Always upload: store_image_asset deduplicates by sha256…"). The functions were left behind.

Consequence for the operation census: `GET /api/images/by-hash/{sha256}` (`images.py:114`) and `GET /api/images/{slug}/blob` (`images.py:133`) have **no live client edge at all**. Intake **R3-7c** (TRUE, CARRY → F.W5) quantifies "36 client edges, 9 gap operations" without naming them; **two of the nine are these**, and one more (`GET /{slug}/thumbnail`) is an edge only in the C-12 sense. Fourier's own `docs/tranches/M/M.md §7` books "inv-15 consumer gap (7 endpoints, 0 callers)" for M.W10 — this row supplies two of the seven by name.

**Falsifier.** Any call site outside `api.ts`. The grep above is exhaustive over `web/src`.

### C-14 — MINOR · `checkImageHash` bypasses the fetch core it sits next to

Not this component's edge, but it is the operation adjacent to the one ImageUpload drives and it is the counter-example that makes C-12 sharp. `api.ts:268-273` calls raw `fetch` — no session header, no abort key, no `ApiProblem`, and a bare `throw new Error("Hash check failed: …")` instead of the RFC 7807 path every sibling uses. It is the one images-arm client written *outside* the E.W5 parametric core (`api.ts:73-84`).

**Falsifier.** Show `checkImageHash` calling `apiFetch`/`coreFetch`. `api.ts:269` is `const res = await fetch(...)`.

---

## §5 · MINOR — contract, types, and the remaining producer seams

### C-15 — MINOR · No props, no emits: the contract is absent

`<ImageUpload />` is mounted once, at `VisualizationView.vue:263`, with **zero props and zero listeners**. The component has no `defineProps`, no `defineEmits`, no `defineExpose`. It reads three store fields (`imageSlug`, `imageMeta`, `computing`) and writes one action (`uploadImage`) directly against the global Pinia singleton (`:8`).

Set against every sibling in the same template — `BasisSelector` (`:265-267`, 3 props + 2 v-models + 1 emit), `CanvasControlsDock` (`:211-226`, 8 props + 6 emits), `EditorControlsDock` (`:238-248`, 8 props + 11 emits), `ContourEditorCanvas` (`:204-206`, 3 props + 1 emit) — this is the only panel component with no interface at all. It cannot be mounted in a second context, cannot be tested without a live store, and cannot have its upload target redirected. lane-frontend §9-11 records there is **no unit-test runner** (vitest ABSENT), so the only gate over it is three Playwright specs driving `data-testid="image-file-input"` end-to-end.

**Falsifier.** A second mount site, or any `defineProps`/`defineEmits` in `:1-34`. `grep -rn "ImageUpload" web/src` → the import at `VisualizationView.vue:14` and the mount at `:263`, nothing else.

### C-16 — MINOR · `computed` imported and unused; `hasPreview` is a re-invoked function returning `boolean | string | null`

`ImageUpload.vue:2` imports `computed`; it appears nowhere else in the file. `:25` is what it was presumably imported for:

```ts
const hasPreview = () => !!store.imageMeta || preview.value;
```

Two consequences. (i) As a function called from the template (`:52`), it re-evaluates on every render of the component rather than caching against its two reactive reads. (ii) `||` returns the right operand, so the inferred return type is `boolean | string | null`, not `boolean` — a predicate-named function that returns a data URL. `v-if` coerces, so nothing breaks today; the type is simply wrong at the boundary.

The unused import does **not** fail the build: `web/tsconfig.app.json` sets `strict: true` but **not** `noUnusedLocals`/`noUnusedParameters`, and `npm run build` is `vue-tsc -b && vite build`.

**Falsifier.** A `computed` reference in `:1-34` (none), or `noUnusedLocals` in `tsconfig.app.json` (quoted whole above — absent).

### C-17 — MINOR · The alt text discards the metadata the store already holds

`ImageUpload.vue:66` — `alt="Uploaded image"` on every image. `store.imageMeta.original_name` is a required field (`types.ts:53-61`) already loaded (`workspace.ts:124`). For a workspace addressed by an opaque 4-word slug, the filename is the only human handle to which image is loaded, and it is dropped.

**Falsifier.** Any binding of `imageMeta.original_name` in the template. `grep -n "original_name" ImageUpload.vue` → no match.

### C-18 — MINOR · The size and format copy is a hardcoded duplicate of server configuration

`:109` hardcodes "≤ 10 MB". `api/config.py:11` — `max_upload_mb: int = 10` — is a pydantic `Settings` field, i.e. **environment-overridable**. Any deployment that raises or lowers it makes the UI copy a lie with no build-time link. The same line also under-advertises: the server accepts 11 extensions (`images.py:62-65`) including WEBP, AVIF, HEIC, GIF, TIFF and BMP; the strip names three, one of which is rejected (C-1).

**Falsifier.** A build-time injection of `max_upload_mb` into the client (`grep -rn "max_upload\|MAX_UPLOAD\|VITE_MAX" web/` → no match), or a client-side size pre-check. Neither exists — an oversize file is uploaded in full and rejected at the server, wasting the whole transfer.

### C-19 — MINOR · Rejected drops and rejected selections produce no feedback at all

`useImageUpload.ts:36-40` and `:65-72` both guard `if (file && isImageFile(file))` and, when the guard fails, do **nothing** — no return value, no callback, no error ref. `ImageUpload.vue` has no channel to learn about it. Dropping a PDF, a folder, or a `.txt` on the card is indistinguishable from dropping nothing. The composable exposes no `onReject` and returns no failure signal (`:92-102`).

**Falsifier.** An error/rejection channel in the composable's return object (`:92-102` lists nine members, all state or handlers), or a rejection UI in the component.

### C-20 — MINOR · Consumes the local `cartoon-card` resurrection shim rather than a glass-ui surface

`:38` — `class="cartoon-card px-3 py-2 relative"`. `style.css:99-112` re-declares `@utility cartoon-card` because glass-ui removed the recipe at C.W5; the block's own comment records it as "the fourier-local KISS stop-gap" with a "cross-repo re-publish recorded as a coordination ask". lane-frontend §3 counts 25 application sites and books it as carry §9-8. This is one of them; it is listed here so the per-component ledger is complete and the carry's denominator is auditable. `./card` ships at 4.0.0 and 7.0.0; `./surface` is added at 7.0.0.

**Falsifier.** Show `cartoon-card` defined by glass-ui at 4.0.0 rather than by `style.css`. The shim and its rationale are quoted from `style.css:99-112`.

### C-21 — MINOR · The scoped block reaches into Tailwind's private `--tw-ring-*` internals

`ImageUpload.vue:178-184` hand-writes three Tailwind-internal custom properties (`--tw-ring-offset-shadow`, `--tw-ring-shadow`, `--tw-shadow`) to synthesise a dashed ring, then sets `outline: 2px dashed var(--primary)` on the next line — which achieves the effect on its own. The `box-shadow` composition is both redundant and a consumption of undocumented internals of `tailwindcss@^4.3.1` (a declared dependency, `package.json:33`), re-declared at scoped-selector specificity over the `ring-2 ring-primary ring-offset-2 ring-offset-card` utilities applied at `:55`.

**Falsifier.** Tailwind documenting `--tw-ring-*` as public API, or removal of `:182-183` changing the rendered result. The `outline` pair at `:182-183` is unconditional and self-sufficient.

### C-22 — MINOR · `<img src="">` is reachable only by an unenforced store invariant

`:52` gates on `store.imageMeta`; `:65` reads `store.imageSlug`. If `imageMeta` were set with `imageSlug` null, `src` becomes `""`, which browsers resolve against the document URL — fetching the SPA's own HTML as an image and firing `@error`. Today the pair is kept in lockstep purely incidentally, by four call sites that assign both adjacently (`workspace.ts:123-124`, `:148-149`, `:211-212`, `:416-417`). Nothing in the store's type or API enforces it: both are independent `ref`s (`workspace.ts:37`, `:42`), both are individually writable through the returned store object (`:430`, `:433`), and `hasPreview`'s use of one field to guard a read of the other makes the component depend on an invariant that is not stated anywhere.

**Falsifier.** A single source of truth for "an image is loaded" (a store getter over both), or a `:src` guard on `imageMeta` rather than `imageSlug`. Neither exists. Rated MINOR, not MAJOR, precisely because no current write path breaks the pairing — this is a latent coupling, not a live bug.

---

## §6 · Superlatives (L-18 · these are real, and load-bearing)

### S-1 — The FileReader lifecycle is genuinely, unusually correct

`useImageUpload.ts:19-26` aborts an in-flight read on scope teardown, guarded on `readyState === FileReader.LOADING`; `:74-76` aborts the previous read when a new file arrives; `:86-89` aborts and nulls on `clearPreview`. Three abort points, all correct, all guarded. Most drop-zone composables leak the reader on rapid re-selection and on unmount; this one leaks on neither. It is the best-engineered thing in the ImageUpload seam — which makes C-6's unreachable `clearPreview` the more frustrating: the correct release path exists and the caller cannot reach it.

**Falsifier.** An unguarded `abort()` (would throw on a settled reader) or a missing teardown. All three sites are guarded and present.

### S-2 — `isImageFile` handles the Safari empty-MIME case, and says so

`useImageUpload.ts:8-12`: `/** Safari-safe image detection: fall back to extension when MIME type is empty. */` with a nine-entry extension set. Safari genuinely delivers `type: ""` for some drag sources; the fallback is correct and the comment names the reason rather than leaving a mystery constant. (That the set admits `svg` is C-1's problem — the *mechanism* is right; the membership is wrong.)

**Falsifier.** Show Safari always populating `File.type` on drag.

### S-3 — Counter-based drag tracking with an explicit Safari `dragover` fallback

`useImageUpload.ts:29` (`let dragCounter = 0`), `:51-55` (increment), `:56-63` (decrement, clamped at 0) is the correct, non-obvious solution to the child-element `dragenter`/`dragleave` flicker that naive implementations get wrong. `:42-49` adds a documented Safari path — `// Safari fallback: dragenter may not fire reliably` — that only sets state when the counter is genuinely at rest. Clamping at `<= 0` also survives the unbalanced-event case. This is careful work.

**Falsifier.** A sequence of enter/leave events that strands the counter above 0 *without* an interposing ancestor. (With one, see C-8 — a different defect, and not this composable's.)

### S-4 — A real broken-image fallback, and it is the only failure channel the operation has

`ImageUpload.vue:68` `@error="onImgError"` → `:31-33` → `:59-62` renders an `ImageOff` glyph and "Image unavailable". Per C-12 the thumbnail operation traverses none of the client's error machinery, so this handler is **the entire error surface** for `GET /api/images/{slug}/thumbnail` in this component. Most consumers of a URL-builder API leave `<img>` failures as a browser broken-glyph. And `imgError` is correctly reset at both entry points — `:14` before an upload and `:21` on slug change — so the fallback cannot get stuck.

**Falsifier.** Show `imgError` unreachable or never reset. Both resets are cited.

### S-5 — The scoped CSS is token-derived and theme-correct — everywhere except the bar

`:190-206` `.source-strip` styles entirely through `color-mix(in srgb, var(--muted) 40%, transparent)`, `var(--border)`, `var(--foreground)`, `var(--ring)`, `var(--primary)`. Zero hardcoded colour, correct in both themes for free, and `:199-202` supplies a real `:focus-visible` ring on the interactive element. This is exactly the discipline the design system wants — and it makes C-11 and C-3 sharper rather than softer: the author demonstrably knew the right pattern 40 lines below the six inlined hexes, and demonstrably knew the focus-ring pattern for the element that has one but not for the div-button that does not.

**Falsifier.** A hardcoded colour in `:186-206`. There is none.

### S-6 — A `data-testid` that earns its keep

`:122` `data-testid="image-file-input"`, cited with an explicit rationale in `e2e/visualization-crud.spec.ts:156-157`: *"The testid disambiguates the panel upload input from the mobile canvas-click input (VisualizationView)."* Two hidden file inputs exist in one route (`ImageUpload.vue:120` and `VisualizationView.vue:201`); the testid resolves the ambiguity and three specs depend on it (`visualization-crud.spec.ts:173`, `visualization-ux.spec.ts:48`, `settings-persistence.spec.ts:52`). A test hook with a stated reason, not decoration.

**Falsifier.** Only one file input in the route, or no spec consuming the testid. Both contradicted.

### S-7 — The author anticipated the multi-instance seam and wrote it down

`:18-19`: *"Reset component-local preview when the workspace image changes, including uploads initiated from the global dropzone or canvas click target."* This is a correct diagnosis of a genuinely subtle problem — three independent upload entry points (`ImageUpload`'s own instance, `VisualizationView.vue:41` global, `VisualizationView.vue:138-142` canvas) mutating one store, with only this component holding a local preview. The `watch(() => store.imageSlug)` is the right *idea*: watch the shared truth, not the local event. C-6 shows the chosen key does not cover the same-slug case, but the seam was seen before it bit, and named. Credit for the diagnosis stands independently of the mechanism.

**Falsifier.** Show the sibling instances do not exist. `VisualizationView.vue:41-42` and `:138-142` are quoted.

---

## §7 · Contradictions with the hitherto corpus (stated explicitly)

1. **lane-frontend §9-5 — "the value.js consumer surface is tiny (5 sites)".** Contradicted in scope, not in count. The five import sites are correct; the *migration* surface is larger than the import surface, because `ImageUpload.vue:150-156` duplicates the registry (`colors.ts:13-16`) with no import. F.W2's inventory method — grep by specifier — is structurally blind to its own copies. Recommend F.W2 additionally sweep the tree for the `STATIC` literals in `colors.ts` before declaring the value.js leg closed.
2. **lane-frontend §9-9 — the reduced-motion gap names two sites** (`stores/animation.ts`, `ConvergencePlot.vue`). **A third exists**: `ImageUpload.vue:159`, an ungated `infinite` CSS animation. The carry's denominator is understated.
3. **lane-frontend §3 — "the cleanest glass-ui consumer posture in the constellation" (51/66 SFCs).** Not refuted, but the denominator hides this file. ImageUpload is glass-ui-free while `./progress` and `./card` both ship **at the pinned 4.0.0** (C-9, C-20) — i.e. it is not a 4→7 uplift item and not covered by lane-frontend §5's break surface. Per-component adoption, not per-tree, is the measure this file fails.
4. **lane-frontend §4 hard/soft shadow table.** ImageUpload's rainbow bar is a **new candidate shadow** not in that table, and it is the cheapest one in the tree: 47 lines against an available primitive, with a11y gained rather than merely LOC lost. Recommend adding it as a 🟡 row.
5. **Intake R3-7c ("36 client edges, nine gap operations", CARRY → F.W5).** Not contradicted — **extended**. Two of the nine are named here: `GET /api/images/by-hash/{sha256}` and `GET /api/images/{slug}/blob` (C-13). A third operation, `GET /api/images/{slug}/thumbnail`, has an edge only as a template-string interpolation (C-12) and may be counted or not depending on the deriver's model; the formation should state which.
6. **Intake R6-8 (operation↔client leaf coupling, CARRY → F.W5).** Not contradicted — **complemented**. R6-8 shows the join is too tight (a client edit mutates the operation leaf). C-12 shows the join is also *incomplete*: an operation consumed by `<img src>` has no client function to join to. Both defects are in the same relation; the F.W5 shared-provenance contract must model non-fetch client channels or its client-edge census will keep understating.

---

## §8 · Tally

| severity | ids | n |
|---|---|---:|
| **BLOCKER** | C-1, C-2, C-3 | **3** |
| **MAJOR** | C-4, C-5, C-6, C-7, C-8, C-9, C-10, C-11 | **8** |
| **MINOR** | C-14, C-15, C-16, C-17, C-18, C-19, C-20, C-21, C-22 | **9** |
| **INFO** | C-12, C-13 | **2** |
| **total defects** | | **22** |
| **superlatives** | S-1 … S-7 | **7** |

**UNPROVEN-NEEDS-LIVE (SS-13): 1** — C-8 (which handler receives the drop, and the resulting `isDragging` state). Every other row is derived from source and carries a static falsifier.

**Producer consumption on this component: value.js 0 sites · keyframes.js 0 sites · glass-ui 0 sites · fourier API 2 of 45 operations, through 2 channels of unequal hardening.**

## §9 · Method and limits

- **Read-only** throughout `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`. This file is the only write. No product source in any repo was modified.
- Evidence: file reads · `grep` · `sed` · `find` · `wc` · `git log` (read-only) · `node -e` over `package.json` export maps in `web/node_modules/` and the glass-ui producer tree.
- No browser tooling, no dev server, no install. The one claim requiring a live DOM is fenced at C-8.
- Version pins are the working-tree ones (lane-frontend's `[WT]`): glass-ui 4.0.0 installed, keyframes.js 4.3.0, value.js 0.13.0, verified from `web/node_modules/@mkbabb/*/package.json`. The `[HEAD]` pins differ (glass-ui `^3.1.0`); every producer-availability claim above was checked against the **installed 4.0.0**, the weaker and therefore safer denominator.
