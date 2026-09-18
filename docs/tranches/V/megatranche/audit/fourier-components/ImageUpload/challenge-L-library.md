claude-opus-5[1m]

# CHALLENGE — `ImageUpload.vue` · axis L (LIBRARY)

**Subject** `fourier-analysis/web/src/components/visualization/ImageUpload.vue` (207 lines)
**Import closure read whole** `./composables/useImageUpload.ts` (106) · `@/stores/workspace.ts` (471) ·
`@/lib/api.ts` (672, upload/thumbnail/coreFetch arms) · `lucide-vue-next` (3 icons) · `vue`.
**Corroborating (read-only, not imported)** `VisualizationView.vue` (the sole mount, line 263) ·
`composables/useImageOverlay.ts` (the Canvas2D seam) · `gallery/GalleryCard.vue` ·
`api/routers/images.py` · `api/services/image_storage.py` · `nginx/fourier.conf` · `web/tsconfig.json` ·
`web/package.json` · 9 `e2e/*.spec.ts` files.
**Method** static + source-derived only. No browser. Every livable-only claim is tagged
`UNPROVEN-NEEDS-LIVE` for SS-13.

**Verdict — DEFECTIVE.** 22 defects (2 BLOCKER · 7 MAJOR · 10 MINOR · 3 INFO). 6 superlatives
(L-18 runs both ways). The component's *internals* are better than average — the FileReader
lifecycle is one of the cleanest in the tree — and its *seams* are where it fails: an async
callback passed through a `void` contract, a nested drop zone with no composition rule, and a
watcher keyed on an identity the backend deliberately made stable.

**Hitherto folded, not re-invented.** The R5-7 native-template-loop class
(`intakes/lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT → F.W4) is ruled **NOT-APPLICABLE** here; see
§5. The census viz-architecture rows (`CENSUS-2026-08-03.md:85-86, 96-97, 101` — *"Canvas2D
throughout, **WebGL/WebGPU ABSENT**; three independent canvases"*) are the frame for §4. The
lane-frontend inventory rows (`lane-frontend.md:91` ImageUpload 207 / `:116` useImageUpload 106)
are confirmed byte-exact at HEAD.

---

## 1 · BLOCKERS

### L-B1 — the async callback is passed through a `void` contract; a failed replace-upload leaves the panel and the canvas disagreeing about which image is loaded, with the contour already destroyed

**Severity** BLOCKER
**Provenance** `ImageUpload.vue:12-16` · `useImageUpload.ts:14` · `useImageUpload.ts:38-41` ·
`useImageUpload.ts:69-72` · `stores/workspace.ts:114-132` · `ImageUpload.vue:20-23, 65` ·
`composables/useImageOverlay.ts:95-118`

> **Self-correction, recorded rather than hidden.** My first pass claimed "no error message
> anywhere." That is **false** and the tree refutes it: `useWorkspaceLoader.ts:125-133` watches
> `store.error` and toasts it whenever `store.imageSlug` is truthy, and
> `VisualizationView.vue:162` renders a full-pane error when it is falsy. The *notification* arm is
> covered. What follows is the claim that survives that falsifier.

```ts
// useImageUpload.ts:14
export function useImageUpload(onFile: (file: File) => void) {
// useImageUpload.ts:40-41  (and identically 70-71)
            setPreview(file);
            onFile(file);            // ← return value discarded
// ImageUpload.vue:13-16
    useImageUpload(async (file: File) => {
        imgError.value = false;
        await store.uploadImage(file);   // ← rejects; nobody catches
    });
```

TypeScript's return-type bivariance for `void` lets an `async` function satisfy
`(file: File) => void`. The composable therefore *cannot* await or catch, and it doesn't
(`useImageUpload.ts:41, 71` discard the return). The store **rethrows** (`workspace.ts:129`). The
rejection escapes to `window.unhandledrejection`, where nothing is listening
(`grep -rn "unhandledrejection" web/src` → **0**).

The rejection itself is only the mechanism. The damage is the state the un-awaited failure leaves —
a **split identity** between the two surfaces that render the source image:

1. `uploadImage` nulls `contour` / `epicycleData` / `basesData` **before** the await
   (`workspace.ts:116-118`) and never restores them in the `catch` (`:127-129`). A failed upload has
   already destroyed the extracted contour, and there is no undo path in the UI.
2. `imageSlug` / `imageMeta` are untouched on failure (`workspace.ts:123-124` unreached), so they
   still name the **old** image. The Canvas2D underlay is keyed on exactly those
   (`useImageOverlay.ts:95, 118`), so the canvas keeps rendering the old image.
3. But `setPreview(file)` already ran **before** `onFile` (`useImageUpload.ts:40`, `:70`), so
   `preview` holds a data URL of the **new, rejected** file — and `ImageUpload.vue:65`
   (`:src="preview || …thumbnailUrl…"`) prefers it. `ImageUpload.vue:20`'s watcher, which would
   clear it, is keyed on `store.imageSlug` — unchanged — so it never fires.

Net: the Image panel displays file **B**, the canvas renders image **A**, the contour pipeline is
keyed to **A**, and the contour for **A** has just been deleted. A transient toast fires and
disappears; the split persists until the next successful upload or a reload. The panel is the
component whose stated job (`ImageUpload.vue:47`, *"— source input"*) is to tell the user which
image is the source, and after this sequence it is the one surface that is wrong.

**Falsifier — attempted three ways.**
(i) *"A global handler catches the rejection."* `grep -rn "unhandledrejection" web/src` → 0.
(ii) *"The toast makes the state legible."* `useWorkspaceLoader.ts:127-131` toasts `err` — the raw
`e.message` from `workspace.ts:128` — and then nulls `store.error`. It says *what* failed, never
that the preview is now lying or that the contour was dropped; and it is gone in seconds while the
split state is durable.
(iii) *"An AbortError makes this benign."* The opposite — `workspace.ts:128` skips `error.value` for
aborts (`if (!api.isAbortError(e))`) but `:129` rethrows them anyway. So the abort path produces the
unhandled rejection **and no toast at all**. That is precisely the path L-B2 fires on every drop.

**Fix shape (not applied — read-only law).** Type the seam `(file: File) => void | Promise<void>`,
have `handleDrop`/`handleFileSelect` `await` it inside a `try`, expose an `error` ref from the
composable, and stop clearing `contour` until `api.uploadImage` resolves.

---

### L-B2 — nested drop zone with no composition contract: the panel's drag handlers are either dead or double-firing, and both branches are defects

**Severity** BLOCKER
**Provenance** `ImageUpload.vue:37-43` (four handlers, no `stopPropagation`) ·
`useImageUpload.ts:36-41` · `VisualizationView.vue:140-143` (ancestor drop zone) ·
`VisualizationView.vue:146-147` (fixed overlay, its own `@drop`) · `VisualizationView.vue:263`
(`<ImageUpload />` is a descendant of both) · `lib/api.ts:52-58` + `:161` (the shared abort key).

`ImageUpload`'s root `<div>` binds `@drop @dragover @dragenter @dragleave` in the bubble phase and
`useImageUpload.handleDrop` calls only `e.preventDefault()` (`useImageUpload.ts:37`) — never
`stopPropagation()`. Its sole mount is inside `VisualizationView`'s root `<div>`, which binds the
same four events to a *second, independent* `useImageUpload()` instance (`VisualizationView.vue:41-42`).
The first `dragenter` on the panel therefore raises **both** `isDragging` refs, and the second one
mounts a `fixed inset-0 z-[var(--z-overlay)]` overlay (`VisualizationView.vue:146`) that carries no
`pointer-events-none` and its own `@drop="globalDrop"`.

Exactly one of these must hold, and both are defects:

**(a) The overlay wins hit-testing.** Then `ImageUpload.vue:39-42`'s four handlers, the drag ring
at `:55`, the `bg-primary/10` wash at `:73`, and the entire "Drop to replace" chip at `:77-83` are
**unreachable dead code** — a whole designed affordance that cannot be exercised. *And* the drop
lands on the overlay, whose `@drop="globalDrop"` fires and then bubbles to the root's
`@drop="globalDrop"` (`:141`) → `globalDrop` runs **twice per drop**.

**(b) The overlay does not win.** Then `ImageUpload.handleDrop` fires, bubbles, and `globalDrop`
fires too → two independent `store.uploadImage(file)` calls.

Either way two `store.uploadImage` invocations enter the same tick. Both route through
`apiFetch("/api/images", "uploadImage", …)` (`api.ts:275-282`), whose signal comes from
`abortable(abortKey)` (`api.ts:161`), and `abortable` **aborts the prior controller for the same
key** (`api.ts:53-58`). So the second call *cancels the first*. The first rejects with `AbortError`,
`workspace.ts:128` deliberately suppresses `error.value` for aborts, `:129` rethrows anyway, and
L-B1's floating promise turns it into an unhandled rejection **on every panel drop — with no toast,
because the abort branch is the one branch that sets no error**. The first call's
`finally { loading.value = false }`
(`workspace.ts:130-131`) also runs while the second is still in flight, so `store.loading` is false
during a live upload. Both invocations also run `invalidateInFlightComputation()`
(`workspace.ts:115`), double-bumping `revision`/`epicycleRevision`/`basesRevision`.

**Falsifier.** *"Vue de-duplicates handlers across ancestor/descendant."* It does not — these are two
separate `addEventListener` registrations on two different elements; DOM bubbling is unconditional.
*"The overlay has `pointer-events-none`."* `grep -n "pointer-events" VisualizationView.vue` → no
match on line 146. *"`abortable` keys per-request."* `api.ts:53-58` keys by the literal string
`"uploadImage"` passed at `api.ts:278`.

**Which branch holds is `UNPROVEN-NEEDS-LIVE`** (SS-13 probe: drag a file onto the Image panel and
count `POST /api/images` in the network panel + watch for `Unhandled Promise Rejection`). The
*disjunction* is proven statically; the challenge does not depend on resolving it.

---

## 2 · MAJOR

### L-M1 — the file input is never reset, so re-picking the same file is a silent no-op
**Provenance** `useImageUpload.ts:66-73` · `ImageUpload.vue:120-127` · contrast `VisualizationView.vue:133-136`

`handleFileSelect` reads `input.files?.[0]` and returns. `<input type="file">` fires `change` only
when the selected file *set* differs. After any failed upload (L-B1 leaves no error and no state
change), the user clicking the preview and re-picking the identical file produces **zero events** —
the app appears frozen.

**Falsifier — refuted in-tree.** *"That's this codebase's convention."* No: the sibling handler
twenty lines away does it correctly — `VisualizationView.vue:135`
`if (canvasFileInput.value) canvasFileInput.value.value = "";`. Two file inputs, two conventions,
one of them wrong.

### L-M2 — the copy promises a 10 MB ceiling that nothing on the client enforces
**Provenance** `ImageUpload.vue:109` (*"PNG/JPG/SVG ≤ 10 MB"*) · `useImageUpload.ts:7-12, 66-73` ·
`nginx/fourier.conf:43, 54` (`client_max_body_size 10M`) · `api/config.py:11`
(`max_upload_mb: int = 10`) · `api/routers/images.py:105-108`

The component *states* the limit and then never checks `file.size`. An 11 MB drop is
`readAsDataURL`'d in full (`useImageUpload.ts:85`) — a base64 string ≈ 1.37× the file, ~15 MB
retained in a Vue ref — and the whole 11 MB body is uploaded before nginx returns 413 or FastAPI
returns 400. The rejection is then invisible per L-B1. Every ingredient of the guard already exists
in the module (`isImageFile` at `:7-12` proves the validate-then-act shape is idiomatic here).

**Falsifier.** *"`accept="image/*"` handles it."* `accept` filters *type*, never *size*, and is
bypassable by switching the picker to "All Files" and by drag-and-drop entirely.

### L-M3 — the reset watcher is keyed on an identity the backend deliberately holds stable, so a dedup re-upload strands a multi-megabyte data URL
**Provenance** `ImageUpload.vue:20-23` · `stores/workspace.ts:119-124` ·
`api/services/image_storage.py:105-127`

```ts
// ImageUpload.vue:20
watch(() => store.imageSlug, () => { imgError.value = false; clearPreview(); });
```

`store_image_asset` deduplicates by sha256 (`image_storage.py:105`) and returns the **existing**
`image_slug`. The store's own comment says so out loud (`workspace.ts:119-121`: *"store_image_asset
deduplicates by sha256 and regenerates the thumbnail"*). So re-uploading the same bytes assigns
`imageSlug.value` its current value — Vue's watcher does not fire on an unchanged primitive —
`clearPreview()` never runs, and `preview` (up to ~13.7 MB of base64 at the 10 MB ceiling) is
retained for the component's remaining lifetime. Not a classic leak — bounded by unmount and by the
next *distinct* upload — but an unbounded-in-time retention of the largest string the app produces.

**Falsifier — refuted.** *"No stable non-slug key exists."* The store already exports `revision`
(`workspace.ts:56`, bumped at `:115`, returned at the state block) and `imageMeta` (a fresh object
identity on every successful upload, `:124`). Either would have fired. The key chosen is the one
key guaranteed *not* to change on the dedup path.

### L-M4 — the `.ring-dashed` rule hand-rolls Tailwind **private** internals, is invalid-at-computed-value-time under v4, and out-specifies (thus kills) the four utilities it was meant to decorate
**Provenance** `ImageUpload.vue:55` · `ImageUpload.vue:178-184` · `web/package.json:29, 38`
(`tailwindcss ^4.3.1`) · `node_modules/tailwindcss/dist/lib.mjs` (v4 emits `var(--tw-ring-inset,)`
— note the empty fallback — and registers `--tw-ring-inset` via `@property` with **no**
`initial-value`)

```css
/* ImageUpload.vue:179-181 */
--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
--tw-ring-shadow:        var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
```

Tailwind **v3** initialised `--tw-ring-inset: ;` (empty) in its `*,::before,::after` preflight rule,
which made a bare `var(--tw-ring-inset)` substitute to an empty token stream. **v4 removed that
initialiser** and instead writes the fallback inline at every use site (`var(--tw-ring-inset,)`).
This rule is a v3-era transcription that did not survive the v4 upgrade. Under v4, `--tw-ring-inset`
resolves to the guaranteed-invalid value, and a bare `var()` on it with no fallback makes the whole
`box-shadow` declaration **invalid at computed-value time** → `box-shadow: none`.

Compounding it: Vue scopes the rule to `.ring-dashed[data-v-…]` (specificity 0,2,0), which beats
Tailwind's `.ring-2` (0,1,0). So the dead declaration *wins the cascade* and then evaporates,
taking `ring-2 ring-primary ring-offset-2 ring-offset-card` (`ImageUpload.vue:55`) with it. Four
utility classes on the hot drag path are inert; only `outline: 2px dashed` (`:182`) survives.

**Falsifier.** *"Something sets `--tw-ring-inset` on an ancestor."*
`grep -rn "tw-ring-inset" web/src` → this file only (lines 179, 180). *"The property is
unregistered, so `var()` just drops the value."* An unregistered, unset custom property is also
guaranteed-invalid → the same IACVT outcome. **Both branches of the falsifier land on the same
verdict.** The *rendered pixel* is `UNPROVEN-NEEDS-LIVE` (SS-13: computed `box-shadow` on the
preview wrapper while dragging must read `none`); the CSS-semantics claim is proven from source.

### L-M5 — rejected files vanish without a word
**Provenance** `useImageUpload.ts:38-42` · `useImageUpload.ts:69-72` · contrast
`VisualizationView.vue:106-112` (`useToast`)

`if (file && isImageFile(file)) { … }` — the `else` is empty in both handlers. Drop a `.pdf`, drop a
folder, drop nothing (`e.dataTransfer?.files[0]` undefined): the drag ring clears and absolutely
nothing else happens.

**Falsifier — and why it fails here specifically.** *"The `store.error` toast covers it"*
(`useWorkspaceLoader.ts:127-131`, the mechanism that refuted my first L-B1 draft). It cannot: this
path never reaches the store at all — `onFile` is not called, `uploadImage` never runs,
`store.error` is never written, so no watcher fires. This is the one error class in the component
with **zero** notification surface, and `useToast()` (`web/src/composables/useToast.ts`, used at
`VisualizationView.vue:110-112` for publish failures) was available and declined. Second falsifier:
*"the UI conveys it by not changing"* — an unchanged UI is indistinguishable from a slow upload
(L-M7) and from a frozen input (L-M1); three faults collapsing to one observation is the definition
of an unusable error posture.

### L-M6 — the replace affordance is a bare `<div @click>`; the empty state, ten lines below, is a proper `<button>`
**Provenance** `ImageUpload.vue:70-76` (div, `cursor-pointer`, `@click="openFilePicker"`) vs
`ImageUpload.vue:92-100` (`<button type="button">`, with a real `:focus-visible` ring at `:199-202`)

Same action (`openFilePicker`), two postures. The preview-state target has no `role`, no `tabindex`,
no keydown handler — it is unreachable by keyboard and invisible to AT. This is *not* a
design-axis-only complaint: it is one component holding two contradictory implementations of one
function, which is the duplication the LIBRARY axis exists to catch.

**Falsifier.** *"The `<img>` is decorative, keyboard users use the strip."* The strip is `v-else`
(`:93`) — once an image exists the button does not render at all, so the div is the **only** replace
path.

### L-M7 — no upload progress signal; the one progress element in the card keys on a flag `uploadImage` never sets
**Provenance** `ImageUpload.vue:114-118` (`v-if="store.computing"`) · `stores/workspace.ts:111-132`
(sets `loading`, never `computing`) · `workspace.ts:61-69` (`beginCompute`/`endCompute` own
`computing`, called only by `extractContour`/`saveContourPoints`/`runComputeEpicycles`/`runComputeBases`)

`store.loading` — the flag that *is* true for the duration of the upload — is read nowhere in this
component (`grep -n "store.loading" ImageUpload.vue` → 0 hits). A 10 MB upload on a slow link
renders zero motion in the Image card. This is what makes L-B1, L-M1 and L-M5 mutually
indistinguishable in the live UI.

---

## 3 · MINOR

| id | claim | provenance | falsifier |
|---|---|---|---|
| L-m1 | `computed` imported, never used — dead code, and nothing in the toolchain catches it | `ImageUpload.vue:2`; `grep -c "computed" ImageUpload.vue` → 1 (the import). `tsconfig.json` sets `strict` but **not** `noUnusedLocals`; `package.json:6-12` has no lint script and the repo has no ESLint config → `build` is `vue-tsc -b && vite build` only | *"tree-shaking makes it free"* — true at runtime, but the point is the **absent gate**: the same hole passes any future unused local. Falsifier for the gate claim: produce an eslint config or a `lint` script; none exists |
| L-m2 | `hasPreview()` is typed `boolean \| string \| null`, not `boolean` | `ImageUpload.vue:25` `!!store.imageMeta \|\| preview.value` | `v-if` coerces, so no runtime bug — the defect is the *type*, a predicate that isn't one. Falsifier would be an explicit annotation; there is none |
| L-m3 | the composable returns `preview` as a mutable `Ref`, so any consumer can corrupt it | `useImageUpload.ts:98` (no `readonly()`), vs `clearPreview` at `:99` being the *intended* mutator | *"no consumer writes it"* — true today (2 consumers), but the contract permits it while simultaneously shipping a dedicated mutator, which is the contradiction |
| L-m4 | `onFile: (file: File) => void` is the type that enables L-B1 | `useImageUpload.ts:14`; both call sites pass `async` fns (`ImageUpload.vue:13`, `VisualizationView.vue:42`) | *"`void` is idiomatic for callbacks"* — not when 2 of 2 call sites are async |
| L-m5 | unchecked `as string` on the reader result | `useImageUpload.ts:83` `e.target?.result as string` | safe *because* `readAsDataURL` is used at `:85` — but the cast, not the call, is what the type system sees; swap to `readAsArrayBuffer` and it silently lies |
| L-m6 | the `<img>` has no `loading`, `decoding`, or intrinsic dimensions | `ImageUpload.vue:63-69`; sibling `gallery/GalleryCard.vue:103` sets `loading="lazy"` | above-the-fold, so `lazy` is arguably wrong here — but the missing intrinsic size against `max-h-[200px]` (`:67`) is an unforced CLS on every workspace load |
| L-m7 | `src=""` is reachable | `ImageUpload.vue:65` — `hasPreview()` is true on `store.imageMeta` alone (`:25`), so `imageMeta` set + `imageSlug` null + `preview` null yields `:src="''"` | reachable only via a partial reset; `workspace.ts:412-426` clears both together, so this is a latent invariant leak, not a live path — hence MINOR |
| L-m8 | drag-counter desync in the Safari `dragover` fallback | `useImageUpload.ts:43-49` sets `dragCounter = 1` on a synthetic path, while `:57-64` decrements on every `dragleave` — a leave-from-child on a browser that skipped `dragenter` zeroes the counter and drops the ring | self-healing on the next `dragover` (hence MINOR), but the observable is a flickering drag affordance |
| L-m9 | template-ref uses the pre-3.5 idiom, and the file input itself is duplicated across the seam | `ImageUpload.vue:9, 121` (`ref<HTMLInputElement>()`) vs the project's Vue 3.5 baseline; second input at `VisualizationView.vue:201` with divergent reset (`:135`) and divergent error handling (`:134` no `isImageFile` check at all) | *"two inputs are needed for the two entry points"* — plausible, but then they must share one handler; they share nothing, and the panel one is the *weaker* of the two |
| L-m10 | `!!store.imageMeta` is derived twice across the seam, once as a `computed` and once as a plain call | `ImageUpload.vue:25` vs `VisualizationView.vue:123` (`const hasImage = computed(() => !!store.imageMeta)`) | *"different predicates"* — `hasPreview` adds the `\|\| preview` arm, but the shared `!!store.imageMeta` half is the store's business and belongs in the store as a getter |

---

## 4 · INFO — the viz render-path seam

The census fixes the architecture: **`CENSUS-2026-08-03.md:85-86`** — *"Canvas2D throughout,
**WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a
store rAF clock…)"* — and **`:96-97, 101`** — *"`BasisCanvas` + `canvas-drawing/` (1 311 LOC
Canvas2D) vs glass-ui's GPU-backed `FourierField`… Aggregate 2 079 LOC incl. canvas lib"*.

**`ImageUpload` renders no canvas and touches no GL context.** Its only contact with the render path
is causal: `store.uploadImage` (`ImageUpload.vue:15`) sets `imageSlug`/`imageMeta`
(`workspace.ts:123-124`), which is the key that `useImageOverlay` watches to load the Canvas2D
underlay (`composables/useImageOverlay.ts:95, 105, 118`). That contact carries one defect and one
non-defect worth recording:

**L-i1 (INFO — defect, owned by `useImageOverlay.ts`, triggered by this component).** The overlay
cache is module-scoped, keyed `${imageSlug}:${resize}` and capped at 10
(`useImageOverlay.ts:6, 9, 98-100, 106-113`). On the dedup re-upload path the slug is unchanged
(L-M3), so the watcher *does* fire — `store.contour` was nulled at `workspace.ts:116` — but
`cacheKey()` hits and hands back the **pre-regeneration** `HTMLImageElement`. The backend went out
of its way to regenerate (`image_storage.py:117-127`, and `workspace.ts:121`: *"Skipping the upload
on hash match would leave stale thumbnails"*); the client then serves the stale one anyway. The
same slug-stable-URL problem hits this component's own `<img>` through
`Cache-Control: public, max-age=86400` on the thumbnail route (`api/routers/images.py:164`) — masked
today only because `preview` happens to survive (L-M3), i.e. one defect is hiding another.
*Falsifier:* *"the watcher never fires so nothing is served"* — refuted, `contour` is nulled first,
so the watcher fires and the cache hit is taken.

**L-i3 (INFO — defect found while falsifying L-B1; owned by `useWorkspaceLoader.ts`).** The
error-toast watcher nulls the store field it just read: `useWorkspaceLoader.ts:127-131` does
`toast(err, "error"); store.error = null;`. It is a default-`flush: "pre"` watcher registered in
`VisualizationView`'s setup, so it runs before that component's render and therefore before its
child `ContourSettings` re-renders. `ContourSettings.vue:311`'s `v-if="store.error"` retry banner —
with its own `shortError` formatter (`:79-84`) and a `Retry` button wired to `runCompute` (`:313`) —
consequently sees `store.error === null` at render time whenever `store.imageSlug` is truthy, which
is exactly the condition under which `ContourSettings` is mounted at all
(`VisualizationView.vue:260, 270`, `v-if="hasImage"`). A designed, formatted, retryable error
affordance is unreachable because a sibling watcher consumes its input first. Two error postures
were built for one field and they race. *Falsifier:* *"post-flush ordering saves it"* — the
scheduler ordering is `UNPROVEN-NEEDS-LIVE` (SS-13: force a 503 on `extractContour` and check
whether `.retry-banner` ever paints); the double-ownership of `store.error` is proven from source
either way. Out of `ImageUpload`'s import closure, so INFO here — but it is the reason my first
L-B1 draft was wrong, and it should be carried to whoever audits `ContourSettings`.

**L-i2 (INFO — coverage shape, not a component defect).** Nine e2e specs drive this component
(`e2e/workspace-flow.spec.ts:15, 38, 59, 103, 154, 185`, `contour-extraction.spec.ts:18, 50, 99,
152`, `visualization-crud.spec.ts:173`, `gallery.spec.ts:89`, `settings-persistence.spec.ts:52`,
`visualization-ux.spec.ts:48`) and **all of them** go through
`getByTestId("image-file-input").setInputFiles(...)`. That path structurally cannot reproduce L-M1
(Playwright dispatches `change` unconditionally), L-B2 (no drag events are generated), or L-M2 (the
fixture is small). The heaviest-tested component in the visualization tree has zero coverage of its
two blockers. *Falsifier:* *"a drag test exists elsewhere"* —
`grep -rn "dataTransfer\|dragenter" e2e/` → 0 hits.

---

## 5 · R5-7 applicability ruling — NOT-APPLICABLE, and why the ruling is itself evidence

`intakes/lane-fourier-r3-r6.md:125` (ADOPT-AS-FACT, CARRY → F.W4) establishes that
**template-loop evidence keyed to *component* callsites is blind to native HTML element loops** —
`instance.loop.paper-sidebar` derived to `[]` while `PaperSidebar.vue` renders its whole TOC through
three nested native `<li v-for>` (live 65/87/105); R6-5 cured it with a `NATIVE_TEMPLATE_LOOP`
family and `nativeTemplateLoops: 16`.

**`ImageUpload.vue` contributes 0 to both sides of that count.**
*Falsifier, run:* `grep -c "v-for" ImageUpload.vue` → **0**. The template has no iteration of any
kind — component or native. So the R5-7 blind spot is *silent* here, not *absent-by-luck*: there is
nothing for either deriver model to miss.

What the component *does* contribute to the component-callsite model is 5 callsites — `ImagePlus`
(`:45`), `Upload` (`:81`), `Upload` again (`:101`), `ImageOff` (`:60`), `Transition` (`:114`) — and
one of those is a repeat identity, so any denominator that keys on *component name* rather than
*callsite id* undercounts this file by one. That is R5-7's sibling failure mode (identity vs
callsite), and F.W4's per-component D/L/C audit should count it: **`ImageUpload` = 5 component
callsites over 4 component identities, 0 template loops, 0 native loops.**

---

## 6 · SUPERLATIVES (L-18 both ways — each carries its own falsifier)

**S-1 · The FileReader lifecycle is genuinely, unusually correct.** `useImageUpload.ts:20-27`
(abort on unmount, guarded by `readyState === FileReader.LOADING`), `:76-79` (abort the prior read
before starting a new one), `:88-94` (abort on explicit clear, then null the handle). Three exit
paths, all covered, all guarded. *Falsifier attempted and failed:* I looked for the classic
holes — a reader retained after `load` (no: `activeReader` is nulled at `:92`), an `onload` that
writes after abort (no: `abort()` fires `abort`/`loadend`, never `load`), an unmount race (no:
`onUnmounted` at `:20`). This is better than the majority of upload composables in any tree.

**S-2 · `isImageFile`'s Safari MIME fallback is a real, correctly-scoped browser fix.**
`useImageUpload.ts:5-12` — a named `Set` of 9 extensions consulted **only** when
`file.type.startsWith("image/")` fails, with the reason in the doc comment. *Falsifier:* *"it's a
permissive hole that lets non-images through"* — bounded, because the server re-validates by magic
bytes (`api/routers/images.py:102-104`), so the client's leniency cannot become a security surface.
The fallback is generous exactly where generosity is free.

**S-3 · Counter-based drag tracking is the right algorithm, not the naive one.**
`useImageUpload.ts:33, 51-64` with the explanatory comment at `:32`. The naive
`dragenter → true / dragleave → false` flickers on every child boundary crossing; this doesn't.
*Falsifier:* the desync at L-m8 is real — but it is a defect *in the Safari fallback bolted onto*
the algorithm, not in the algorithm, which is sound.

**S-4 · This is the only `<img>` in the entire web tree with a broken-image posture.**
`ImageUpload.vue:31-33, 58-62, 68` — an `@error` handler, a dedicated `ImageOff` fallback, and two
reset paths (`:14`, `:21`). *Falsifier, run:* `grep -rn "@error=" web/src/components/` → exactly one
hit, `ImageUpload.vue:68`. The three sibling asset renderers — `GalleryCard.vue:100`,
`GalleryCardModal.vue:79`, `GalleryDraftsSection.vue:77` — all render a raw `<img>` with no fallback.
This component is the fleet's *positive* outlier; the pattern should propagate outward, not be
trimmed.

**S-5 · Goldilocks, measured.** 207 lines (`lane-frontend.md:91`) split as 34 script / 95 template /
77 style, with the 106-line lifecycle (`lane-frontend.md:116`) extracted rather than inlined.
Compare the same directory's `VisualizationView.vue` at 300+ script lines carrying eight concerns.
*Falsifier:* *"it's under-split — the style block is 77 lines."* Those 77 lines are three cohesive
scoped recipes (`rainbow-*`, `.ring-dashed`, `.source-strip`); extracting them would create the
wrapper-file contrivance the KISS precept forbids. The size is right.

**S-6 · The reversible-decision provenance is in the source, where it belongs.**
`ImageUpload.vue:87-91` and `:186-189` both record *why* the full-card dashed dropzone was retired at
D.W4.b (hero primacy yields to the canvas placeholder) — not what the code does, but what was
rejected and on what ground. *Falsifier:* *"stale comments are worse than none."* Checked: the
comment's claims still hold at HEAD — the strip is `v-else` (`:93`), the canvas placeholder is the
hero (`VisualizationView.vue:198`, `canvas-clickable` gated on `!hasImage && !hasData`), and the
dashed affordance is indeed reserved for the canvas. Accurate, therefore load-bearing.

---

## 7 · Ledger

| severity | count | ids |
|---|---|---|
| BLOCKER | 2 | L-B1, L-B2 |
| MAJOR | 7 | L-M1 … L-M7 |
| MINOR | 10 | L-m1 … L-m10 |
| INFO (defect) | 3 | L-i1, L-i2, L-i3 |
| **defects total** | **22** | |
| SUPERLATIVE | 6 | S-1 … S-6 |
| ruling (non-defect) | 1 | R5-7 NOT-APPLICABLE (§5) |
| claim retracted under its own falsifier | 1 | L-B1 "no message anywhere" — see §1 |

**Livable-only, deferred to SS-13 (`UNPROVEN-NEEDS-LIVE`):** (i) which branch of L-B2's disjunction
holds — count `POST /api/images` per panel drop; (ii) L-M4's rendered `box-shadow` on the preview
wrapper during drag (must compute to `none`); (iii) L-i1's stale overlay after a dedup re-upload of
a re-processed asset; (iv) L-i3's watcher-vs-render ordering (does `.retry-banner` ever paint).
Everything else in this challenge is proven from source at HEAD.

**Greps run, so the falsifiers are checkable rather than asserted.**
`grep -c "v-for" ImageUpload.vue` → 0 · `grep -rn "@error=" web/src` → 1 (this file) ·
`grep -rn "unhandledrejection" web/src` → 0 · `grep -rn "dataTransfer\|dragenter" web/e2e` → 0 ·
`grep -rn "tw-ring-inset" web/src` → 2 (both in this file) ·
`grep -rn "store.error" web/src` (ex-store) → 7, over 3 files.

**Contradictions with the hitherto corpus:** none. `lane-frontend.md:91` (207) and `:116` (106) are
byte-exact at HEAD. The R5-7 carry (`lane-fourier-r3-r6.md:125` → F.W4) is honoured by explicit
ruling rather than silence (§5). The census viz rows (`CENSUS-2026-08-03.md:85-86`) are confirmed
from this component's side: it touches no canvas and no GL context, only the store keys the Canvas2D
underlay reads.

**Contradiction with my own first pass, recorded per the "survive its own falsifier" law:** the
draft L-B1 asserted an unnotified failure. `useWorkspaceLoader.ts:125-133` refutes it. The blocker
was rewritten to the claim that survives — a durable panel/canvas identity split with a destroyed
contour — and the refuting mechanism was itself audited into L-i3.
