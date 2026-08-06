claude-opus-5[1m] (served model id)

# CHALLENGE · `ImageUpload.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ImageUpload.vue` (207 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Pin under audit** `@mkbabb/glass-ui ^4.0.0` installed **4.0.0** while the producer is **7.0.0** (`web/package.json:14`; census §1 / [FE §1]).
**Substrate** fourier HEAD `cd26c653`, tree `9a66411d` — byte-identical to the audited scope per intake **R4-9** (ADOPT-AS-FACT, "the load-bearing row"). Nothing below is stale-at-HEAD.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its own falsifier. Five superlatives are filed on the same evidentiary bar (L-18 runs both ways).

**Read whole (read-only):** the SFC; `composables/useImageUpload.ts` (106); `stores/workspace.ts` (471, relevant arms); `lib/api.ts` (`uploadImage`/`thumbnailUrl`/`ImageMeta`); `lib/types.ts:53-61`; `src/style.css` (143); `VisualizationView.vue` (the mount host, 486); glass-ui 4.0.0 `dist/styles/{tokens,cards,animations,typography,theme}`; glass-ui 7.0.0 `package.json` exports; `api/routers/images.py`; `api/config.py`; `e2e/*.spec.ts`.

**Tally — 27 defects (3 BLOCKER · 8 MAJOR · 12 MINOR · 4 INFO) · 5 superlatives.**

---

## §0 — The one-paragraph verdict

`ImageUpload.vue` is a well-mannered *surface* wrapped around a **broken state machine**. Its token
discipline in the empty state is exemplary (S-4), its focus ring is the canonical one (S-2), its
broken-image fallback is the only one in the repository (S-1) — and yet the component **cannot tell
the truth about failure** (B-1), **advertises a format the API refuses** (B-2), and **loses its
primary action entirely for keyboard users the moment it succeeds once** (B-3). Beneath that, its
whole drag-over vocabulary — five separate authored treatments — is painted underneath a
full-viewport ancestor overlay and can never be seen (M-1), and its only loading affordance is wired
to a store flag its own action never sets (M-2). The design intent recorded at lines 87–91 is
genuinely good; the wiring beneath it is not. Under the F.W1 tri-package uplift this file is a
**net beneficiary with a near-nil break surface** (U-1/U-2): four of the eight MAJORs are cured by
adopting glass 7's `./progress` and `./toast`, and it imports none of the census break surface
(no `metric-badge`, no `hover-card`/`-popover`, no dock member, no `ToastVariant`).

---

## §1 — BLOCKERS

### B-1 · The component renders a **false success** on every upload failure — BLOCKER

**Claim.** A failed upload leaves the card showing the rejected image as though it had landed, and
the error text is rendered nowhere on screen.

**Provenance / chain.**
1. `useImageUpload.ts:69-72` and `:36-39` call `setPreview(file)` **before** `onFile(file)` — the
   local data-URL preview is committed ahead of the network round-trip.
2. `ImageUpload.vue:25` — `hasPreview()` is `!!store.imageMeta || preview.value`; `preview` alone
   flips the card into its preview branch (`:52`).
3. `workspace.ts:111-132` — on failure `uploadImage` sets `error.value = e.message ?? "Upload
   failed"` (`:128`) and **never assigns `imageSlug`** (`:123` is inside the try, after the throw).
4. `ImageUpload.vue:20-23` — the only `clearPreview()` call is inside `watch(() => store.imageSlug, …)`.
   A failed upload does not change `imageSlug`, so the watcher does not fire, so `preview` is
   **never cleared**.
5. `grep -rn "store.error" web/src` → the sole error surfaces are `ContourSettings.vue:311` (contour
   retry banner) and `VisualizationView.vue:162`, and the latter is gated
   `v-else-if="store.error && !store.imageSlug"`. On a **replace** failure (`imageSlug` already set)
   that branch is false — the error string is rendered **nowhere in the application**.

**Net.** Upload a 40 MB PNG or an SVG (B-2) as a *replacement*: the strip is replaced by a thumbnail
of the file, the card looks identical to a success, no message appears anywhere, and the workspace
still points at the previous image. The user's mental model and the store diverge silently.

**Falsifier.** Produce (a) any code path that clears `preview` on rejection, or (b) any rendered
consumer of `store.error` that is reachable while `store.imageSlug !== null`.
**Result of running the falsifier:** (a) `clearPreview` has exactly two callers — the watcher
(`ImageUpload.vue:22`) and the composable's own `return` block (`useImageUpload.ts:99`); neither is
reachable from the catch arm. (b) `VisualizationView.vue:162` is the only stage-level consumer and it
is negated by `!store.imageSlug`. **CONFIRMED, static.**

---

### B-2 · The advertised format set is wrong in **both directions**, and the wrongness is silent — BLOCKER

**Claim.** The strip copy promises SVG, which the API refuses; and omits seven formats the API accepts.

**Provenance.**
- `ImageUpload.vue:109` — *"Drop or click to upload — PNG/JPG/SVG ≤ 10 MB"*.
- `api/routers/images.py:61-64` — `ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tiff",
  ".tif", ".webp", ".gif", ".heic", ".heif", ".avif"}`. **`.svg` is absent.**
  `:99-100` raises `400 "Unsupported format: .svg"`.
- `useImageUpload.ts:3-5` — the client gate `IMAGE_EXTENSIONS` **does** contain `"svg"`, so an SVG
  passes `isImageFile` (`:8-12`) and reaches `setPreview` → the `<img>` renders it fine.
- `ImageUpload.vue:124` — `accept="image/*"`, which offers `.svg` in the OS picker.

**Net.** An SVG clears every client-side check, produces a convincing preview, is POSTed, is refused,
and the refusal is invisible per **B-1**. Symmetrically, seven accepted formats (BMP/TIFF/WEBP/GIF/
HEIC/HEIF/AVIF) are never mentioned — the copy under-promises the mechanism *and* over-promises it.

**Falsifier.** Find `.svg` in `ALLOWED_EXTENSIONS`, or an SVG-rasterisation arm before storage.
**Result:** `grep -rn "svg\|SVG" api/routers/images.py api/services/*.py` → **zero hits**. `_valid_image_magic`
(`images.py:52`) is a magic-byte check with no XML/SVG arm. **CONFIRMED.**

---

### B-3 · Once an image exists, the replace control is **keyboard- and AT-inaccessible** — BLOCKER

**Claim.** In the component's steady state there is no focusable, named control to replace the image.

**Provenance.**
- `ImageUpload.vue:92-111` — the real `<button type="button">` is `v-else`, i.e. it exists **only**
  while `hasPreview()` is false. It disappears the moment an image lands.
- `ImageUpload.vue:70-76` — the replacement affordance is a bare `<div class="absolute inset-0 …
  cursor-pointer" @click="openFilePicker">`. No `role`, no `tabindex`, no `@keydown`, no
  `aria-label`. It is not in the tab order and exposes no accessible name or role to AT.
- `ImageUpload.vue:120-127` — the `<input type="file">` carries `class="hidden"` (`display:none`),
  so it is not focusable either.
- The only other path is drag-and-drop — pointer-only by construction.

**Net.** WCAG 2.1.1 (Keyboard) and 4.1.2 (Name, Role, Value) fail on the panel's primary action in
its most common state. The `is-dragging`/`focus-visible` care lavished on the *empty* state
(`:199-202`) has no counterpart in the state the user actually lives in.

**Falsifier.** Name any focusable element inside the `v-if="hasPreview()"` subtree (`:51-85`).
**Result:** the subtree contains `div`, `div`, `ImageOff`, `p`, `img`, `div`, `div`, `Upload` — **no
`button`, no `a`, no `[tabindex]`, no `[role]`**. **CONFIRMED.**

---

## §2 — MAJOR

### M-1 · Every drag-over state this component authors is **occluded by an ancestor overlay** — MAJOR

**Claim.** All five of ImageUpload's drag treatments are painted underneath a full-viewport `z:50`
overlay owned by its mount host, and are therefore never visible.

**Provenance.**
- `VisualizationView.vue:41` instantiates a **second** `useImageUpload()`; `:140-142` binds
  `@drop/@dragover/@dragenter/@dragleave` on the **route root `<div>`**, which is an ancestor of
  `<ImageUpload/>` (`:263`).
- `VisualizationView.vue:146-147` — while `globalDragging`, a
  `fixed inset-0 z-[var(--z-overlay)] … bg-background/80 backdrop-blur-sm` div renders with the
  "Drop image anywhere" hero. `--z-overlay: 50` (glass-ui `dist/styles/tokens/scheme-motion.css:341`).
- `dragenter`/`dragover`/`drop` bubble, and `ImageUpload.vue:39-42` never calls `stopPropagation`,
  so **one** `dragenter` flips **both** `isDragging` refs.
- ImageUpload's own treatments all live in the z-index:0 band: the dashed ring (`:54-56`), the
  `bg-primary/10` wash (`:72-74`), the "Drop to replace" chip (`:77-83`), `.source-strip.is-dragging`
  (`:96-98` + `:203-206`), and the icon `text-primary` flip (`:103-106`). The host card's
  `.cartoon-card`→`cartoon-surface` sets `translate: 0` (glass-ui `cards.css:39`), which **mints a
  stacking context at `z-index: auto`** — so the card and everything in it paints in the `z:0` band,
  strictly below the `z:50` fixed overlay.
- The drop itself is intercepted too: the overlay carries its own `@drop="globalDrop"`
  (`VisualizationView.vue:147`), so `ImageUpload`'s `handleDrop` (and thus its `setPreview`) is dead
  on the pointer path.

**Net.** A meaningful fraction of the component's authored design — including the `.ring-dashed`
scoped rule (`:178-184`) written specifically for it — is unreachable. The comment at `:87-91`
argues the panel should be "a secondary cue"; in fact it is *no* cue.

**Falsifier.** Show a portal/`z-index`/`isolation` on ImageUpload that lifts its chip above `z:50`, or
show that the overlay does not mount while dragging over the panel.
**Result:** `grep -n "z-\|isolate\|Teleport" ImageUpload.vue` → no `z-*`, no `isolate`, no portal
(and intake **R3-11**/**X-6** enumerate the repo's only two Teleports — `PaperSearchModal.vue:41`,
`FullscreenViewer.vue:105` — neither is this file). The stacking argument is static-complete;
**the pixel outcome is UNPROVEN-NEEDS-LIVE** (SS-13: drag a file over the left panel and screenshot).

---

### M-2 · The component's only loading affordance **never fires for its own action** — MAJOR

**Claim.** The rainbow bar is gated on a store flag that `uploadImage` does not set.

**Provenance.**
- `ImageUpload.vue:114-118` — `<Transition name="rainbow-fade"><div v-if="store.computing" …>`.
- `workspace.ts:62-68` — `computing` is written **only** by `beginCompute`/`endCompute`.
- Their call sites: `workspace.ts:243, 265, 287, 312` (+`:259, 281, 306, 335`) = `extractContour`,
  `saveContour`, `computeEpicycles`, `computeBases`; plus `reset` (`:424-425`).
- `uploadImage` (`workspace.ts:111-132`) writes **`loading`** (`:112`, `:131`), never `computing`.
  `invalidateInFlightComputation()` (`:86`, called at `:115`) bumps revision counters — it does not
  call `beginCompute`.

**Net.** During the actual POST (the slowest, most failure-prone step, up to 10 MB) the card shows
nothing at all; the bar appears afterwards, for a *different* operation, in a card labelled "Image".
The strip also stays enabled throughout, so a second click re-opens the picker mid-flight
(no `:disabled`, no `aria-busy`) — a double-submit affordance.

**Falsifier.** Find a `beginCompute()` reachable from `uploadImage`.
**Result:** `grep -n "beginCompute()" web/src/stores/workspace.ts` → `243, 265, 287, 312` only; none
is on `uploadImage`'s path. **CONFIRMED.**

---

### M-3 · The loading state has **no accessible or textual channel** — MAJOR

**Provenance.** `ImageUpload.vue:114-118` + `:133-160`. The indicator is `<div class="rainbow-track">
<div class="rainbow-bar"/></div>` — no `role="progressbar"`, no `role="status"`, no `aria-busy`, no
`aria-live`, no visible label, no `<span class="sr-only">`. `grep -c "aria-" ImageUpload.vue` → **0**.
Screen-reader and reduced-vision users receive **zero** signal that work is in flight; combined with
M-2 they receive zero signal even visually during the upload itself.
**Uplift note:** glass-ui **4.0.0 already ships `Progress`** (`node_modules/@mkbabb/glass-ui/dist/Progress-hAT4gqGH.js`)
and 7.0.0 exports it as `./progress`. The bar is hand-rolled against an available primitive under the
*current* pin, not merely the future one.
**Falsifier.** Any `aria-*`/`role` on the indicator, or an `sr-only` sibling. **None exists.** CONFIRMED.

---

### M-4 · The rainbow bar fails WCAG 1.4.11 non-text contrast, in the theme it was designed for — MAJOR

**Claim.** With the state carried *solely* by this graphic (M-3), the 3:1 non-text floor applies, and
two of its seven stops are at ~1.5–1.9:1 in light mode.

**Computation (sRGB relative luminance, WCAG 2.x formula).**

| surface | token / literal | resolved | L |
|---|---|---|---:|
| track | `--muted` → `--neutral-1` (`tokens/color-radius.css:41,84`) | `hsl(38 26% 95%)` | 0.9001 |
| card | `--card` (`tokens/color-radius.css:72`) | `hsl(36 48% 97%)` | 0.9425 |
| bar stop 17% | `#fbbf24` (`ImageUpload.vue:151`) | — | 0.5789 |
| bar stop 33% | `#34d399` (`ImageUpload.vue:152`) | — | 0.4861 |

- `#fbbf24` vs track = `(0.9001+0.05)/(0.5789+0.05)` = **1.51 : 1**
- `#fbbf24` vs card  = **1.58 : 1**
- `#34d399` vs track = **1.79 : 1**; vs card = **1.85 : 1**

All four are below the 3:1 floor. The palette is seven **hardcoded Tailwind-3-era hexes**
(`ImageUpload.vue:148-157`) that are identical in light and dark — they do not consult
`prefers-color-scheme`, `.dark`, or any token, so they cannot be repaired by theming.

**Standing-law overlap.** This is precisely the class of defect `style.css:113-127` (D.W4.d) already
cured once for `--viz-amber` (light `hsl(35 70% 42%)` ≈ 3.54:1 → `hsl(35 76% 35%)` ≈ 4.6:1). The
sweep reached the token; it did not reach this literal. It is also the sharpest live instance of
fourier's own **inv-33** ("all runtime colour derives from value.js", census §3c [DOCS §3]) —
seven literals in a single gradient, the W.L5/F.W2 design-surface hook.

**Falsifier.** Show a text or ARIA alternative that carries the state (then 1.4.11 does not bind), or
show the stops resolve from tokens.
**Result:** M-3 establishes there is no alternative; `grep -n "var(--" ImageUpload.vue:148-157` → the
gradient block contains **zero** `var()`. **CONFIRMED (token-decidable).**

---

### M-5 · No `prefers-reduced-motion` carve — on an **infinite** animation — MAJOR

**Provenance.**
- `ImageUpload.vue:159` — `animation: rainbow-slide 1.4s linear infinite;` on a 6px full-width bar.
  No PRM gate in the scoped block (`:131-207` contains no `@media`).
- `:167-176` — `rainbow-fade-enter/leave-active` transitions, also ungated.
- `:53` — `animate-scale-in`, which resolves to `--animate-scale-in: scale-in var(--duration-normal)
  var(--spring-smooth)` (glass-ui `theme/literals.css:19`). glass-ui's three PRM carves
  (`animations.css:239, 279, 369`) cover `scrim-breath`, `[data-scrim-animation]` and
  `.glass-top-layer` — **none** covers the `animate-*` utility family.
- `src/style.css:92-96` gates exactly one selector, `[data-state="active"][role="tabpanel"]`.

**Standing-law overlap.** Eight sibling files honour PRM (`ContourSettings.vue:370`,
`AnimationControls.vue:178`, `GalleryMarquee.vue:129`, `GalleryCard.vue:304`, `ConvergencePlot.vue:405`,
`CollapsibleSection.vue:66`, `DarkModeToggle.vue:104`, `VisualizationView.vue:310`). `GalleryMarquee.vue:126-129`
carries the comment *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding"* — the same
D.W4 sweep that authored **this component's own** `.source-strip` (`:186-189`) and **missed its own
infinite animation two blocks below**. WCAG 2.3.3 (AAA) / 2.2.2 spirit.

**Falsifier.** A blanket `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { … } }`
anywhere in the cascade. **Result:** `grep -rn "prefers-reduced-motion" web/src node_modules/tw-animate-css/dist`
→ 15 hits, every one selector-scoped; no blanket rule exists. **CONFIRMED.**

---

### M-6 · Re-selecting the **same file** is silently inert — MAJOR

**Provenance.** `useImageUpload.ts:66-73` — `handleFileSelect` reads `input.files?.[0]` and **never**
resets `input.value`. An `<input type="file">` fires no `change` when the identical file is chosen
again. The tree's own counter-example is three files away: `VisualizationView.vue:132-136`
(`onCanvasFileSelect`) does `if (canvasFileInput.value) canvasFileInput.value.value = "";` — the
codebase knows the idiom and this path omits it.

**Net.** Compose with **B-1**: an upload fails, the card shows a false-success preview, the user
clicks to re-pick the same file — and *nothing at all happens*. The single most natural recovery
gesture is a dead input.
**Falsifier.** Find an input-value reset on ImageUpload's path. **Result:** `grep -n "\.value = \"\"\|input.value"
web/src/components/visualization/composables/useImageUpload.ts` → no reset. **CONFIRMED.**

---

### M-7 · Rejected files are **swallowed without any feedback** — MAJOR

**Provenance.** `useImageUpload.ts:36-39` and `:69-72` — both are
`if (file && isImageFile(file)) { setPreview(file); onFile(file); }` with **no `else`**. Drop a PDF,
a `.txt`, a folder: nothing renders, nothing logs, nothing announces. The `isDragging` state simply
resets and the panel looks as though the gesture never occurred.
**Available remedy already mounted:** `App.vue` mounts `<Toaster/>` app-wide ([FE §1]); glass-ui 7
exports `./toast`.
**Falsifier.** Any error/warn/toast on the rejection branch. **Result:** none in `useImageUpload.ts`
(106 lines read whole) and none in `ImageUpload.vue`. **CONFIRMED.**

---

### M-8 · The "≤ 10 MB" promise has **no client-side enforcement** — MAJOR

**Provenance.** `ImageUpload.vue:109` states the limit. The sole enforcement is
`api/routers/images.py:105-108` — `if len(content) > settings.max_upload_mb * 1024 * 1024` with
`max_upload_mb: int = 10` (`api/config.py:11`) — i.e. **after** the entire body has been read
server-side. `grep -rn "file.size\|MAX_" web/src/components/visualization/composables/useImageUpload.ts`
→ no size check anywhere on the client.

**Net.** A 40 MB HEIC is uploaded in full over the user's connection, rejected with a 400, and the
400 is invisible per B-1. `File.size` is in hand at `useImageUpload.ts:36`/`:69`; `ImageMeta.bytes`
exists at `lib/types.ts:58`. The guard is one comparison away.
**Falsifier.** A client-side size gate. **None.** **CONFIRMED.**

---

## §3 — MINOR

| id | severity | claim | provenance | falsifier + result |
|---|---|---|---|---|
| **m-1** | MINOR | **Progress bar misaligns with the content column.** `.rainbow-track` insets `left/right: 0.5rem` (8px) while the card is `px-3` (12px) — the bar overhangs the type column by 4px each side; and `bottom: 0` drops a 6px bar into an 8px gutter, leaving 2px of air. No token backs `0.5rem`. | `ImageUpload.vue:135-137` vs `:38` | Show `px-2` on the card, or a token deriving 0.5rem. **Result:** `:38` is `px-3 py-2`; the value is a literal. CONFIRMED |
| **m-2** | MINOR | **Nested-rhythm inversion (Aristotelian proportion).** The heading's `mb-3` (12px) exceeds the card's own `py-2` (8px) frame — the inner gap is 1.5× the outer, so the title reads as floating off its own card. Inner spacing should nest *inside* the container's, not exceed it. | `ImageUpload.vue:44` vs `:38` | Show a spacing scale where 12 ≤ 8. Arithmetic. CONFIRMED |
| **m-3** | MINOR | **Dead classes.** `group` (`:53`) with zero `group-*` variants in the file; `mb-0` (`:53`) restating the default. Consequence, not just tidiness: the preview region is `cursor-pointer` with `bg-black/0` (`:71`) and **no hover treatment at all** — the `group` was evidently intended to drive one. | `ImageUpload.vue:53, 71` | `grep -c "group-" ImageUpload.vue` → **0**. CONFIRMED |
| **m-4** | MINOR | **Dead import + un-memoised template call.** `computed` is imported and never used; `hasPreview` is a plain function invoked as `hasPreview()` in the template, re-evaluated every render — exactly what the unused import was for. | `ImageUpload.vue:2, 25, 52` | `grep -c "computed" ImageUpload.vue` → **1** (the import). CONFIRMED |
| **m-5** | MINOR | **Motion-token nonconformance.** Five distinct durations, none from the scale: `duration-150` (`:95,102`), `duration-200` (`:53,71`), `duration-300` (`:67`), `0.3s ease-out` (`:168`), `0.4s ease-in` (`:171`), `1.4s linear` (`:159`). glass-ui ships `--duration-instant/fast/normal/slow` = 0.1/0.2/0.3/0.45s and a `--spring-*`/`--ease-*` family. The file's own `animate-scale-in` (`:53`) *does* ride the scale — the literals sit beside a conformant token. | `ImageUpload.vue` as cited; glass-ui `tokens/scheme-motion.css:66-69` | Show these literals resolve from tokens. They are literals. CONFIRMED |
| **m-6** | MINOR | **`transition-all` ×2** on elements whose content changes intrinsic size — animates every animatable property, including layout-affecting ones, on the `<img>` whose `src` swaps between a data URL and a network thumbnail. `transition-property` should be enumerated. | `ImageUpload.vue:53, 67` | Show `transition-all` is scoped to non-layout properties here. It is not. CONFIRMED |
| **m-7** | MINOR | **No dimension reservation on the `<img>` ⇒ CLS.** `w-full max-h-[200px] object-contain` with no `width`/`height`/`aspect-ratio`; the card height jumps from ~0 to up to 200px on decode. No `loading`/`decoding` hints. The irony is local: the comment 65 lines below advertises *"absolutely positioned … no layout shift"* for the **6px** bar. | `ImageUpload.vue:63-69` vs `:132` | Show a reserved box. `:63-69` has none. CONFIRMED |
| **m-8** | MINOR | **Heading level unanchored.** `<h3>` is the **only** heading in the entire `/w` + `/v` reachable tree; there is no `<h1>` or `<h2>` anywhere in `components/visualization/**` or `components/layout/**`. The document outline opens at level 3. axe `page-has-heading-one`. | `ImageUpload.vue:44` | `grep -rn "<h1\|<h2" web/src/components/visualization web/src/components/layout web/src/App.vue` → **zero**; the repo's only `<h1>`s are `paper/PaperView.vue:353`, `morph/FourierMorphDemo.vue:5`, `morph/FourierShapeExtractor.vue:3` — all off-route. CONFIRMED |
| **m-9** | MINOR | **Generic `alt`.** `alt="Uploaded image"` is identical for every image, though `ImageMeta.original_name` is in scope via `store.imageMeta`. | `ImageUpload.vue:66`; `lib/types.ts:56` | Show `original_name` is unavailable. It is on the store's `imageMeta`. CONFIRMED |
| **m-10** | MINOR | **Decorative subtitle absorbed into the accessible name.** The `<span>— source input</span>` lives *inside* the `<h3>`, so the heading's name is "Image — source input" and the em-dash enters the AT outline. `aria-hidden` on the span, or hoisting it out of the heading, keeps the outline clean. | `ImageUpload.vue:44-48` | Show the span is outside the heading. It is inside. CONFIRMED |
| **m-11** | MINOR | **Prose quality.** (a) `:109` gives the constraint list the same visual weight as the verb — "Drop or click to upload" and a format/size spec share one `text-sm font-medium` run, so the CTA and the fine print are typographically indistinguishable. (b) `:61` "Image unavailable" states a condition with no recovery verb, although the region *is* clickable (`:70-76`) — "Image unavailable — click to re-upload" would make the affordance discoverable and would partially mitigate B-3's discoverability half. | `ImageUpload.vue:61, 109` | Subjective-but-anchored: (b)'s clickability is proven at `:75`. CONFIRMED |
| **m-12** | MINOR | **`.ring-dashed` hand-copies Tailwind internals and double-draws.** The scoped rule re-implements the ring box-shadow from `--tw-ring-offset-shadow`/`--tw-ring-shadow`/`--tw-ring-color`/`--tw-ring-offset-*` — private v4 implementation details, not a public contract — **and** adds `outline: 2px dashed` at `outline-offset: 3px`, so a 2px ring and a 2px dashed outline draw together. It is also reached only through the state M-1 says is never visible. | `ImageUpload.vue:178-184`, applied at `:55` | **Falsifier run and partly self-refuting:** I checked whether these custom properties still exist — Tailwind **4.3.1** does define `ring-offset`, `--tw-ring-offset-width/-color/-shadow`, `--tw-ring-color`, `--tw-ring-shadow` (probe over `node_modules/tailwindcss/dist/lib.js`). **The rule works today**; the defect is the private-API coupling and the double ring, **not** a break. Filed MINOR, not MAJOR, for that reason. |

---

## §4 — INFO · the old-pin / F.W1-uplift surface

### U-1 · Zero glass-ui imports; four primitives hand-rolled against ones already installed — INFO
`grep -c "@mkbabb/glass-ui" ImageUpload.vue` → **0**. Against 95 named-import statements over ≈51
files repo-wide ([FE §3]; census §2 C-3), this is one of the least glass-suffused components in the
deepest glass consumer in the constellation. It hand-rolls: a **card** (via the fourier-local
`@utility cartoon-card` shim, `style.css:98-111` — 1 of the 14 shim sites), a **progress bar**
(`:133-165`), a **button-shaped strip** (`:92-111` + `:190-206`), and an **overlay chip** (`:77-83`).
`Progress` is present in the **installed 4.0.0 dist** (`dist/Progress-hAT4gqGH.js`); 7.0.0 exports
`./progress`, `./card`, `./surface`, `./button`, `./chip`, `./toast`.
**Uplift verdict: net IMPROVEMENT.** Adopting `./progress` cures **M-3 + M-4 + M-5** in one move
(a token-driven, PRM-aware, `role`-bearing primitive); adopting `./toast` cures **M-7**.

### U-2 · Break surface for the F.W1 tri-package uplift: **NIL** on the census list — INFO
Checked against the census break surface ([FE §5] / census §5 risk 1 / §4 F.W1): this file imports
**no** `metric-badge` (the ×7-file cure, corrected by census C-4), **no** `hover-card`, **no**
`hover-popover`, **no** dock member (`DockIconButton`/`DockDropdownTrigger`), and **no**
`ToastVariant` (the hard typecheck break at `useToast.ts:3,9`). Its only uplift exposure is
`lucide-vue-next → @lucide/vue` (`ImageUpload.vue:6`, three symbols — `ImagePlus`, `Upload`,
`ImageOff` — part of the ×35-site rename) and the `.cartoon-card` shim, which must be re-verified
against glass 7 (`cartoon-surface` survives — 7.0.0 exports `./surface`). Confirmed absent from the
7.0.0 export list: `./hover-card`, `./hover-popover`, `./metric-badge` (superseded by `./metric`).

### U-3 · The `cartoon-card` shim imports a hover-lift the component does not want — INFO
`style.css:107-111` re-binds `.cartoon-card` onto `cartoon-surface`, which carries
`&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg); }`
(glass-ui `cards.css:44-47`). So the **whole panel lifts** on hover although only the inner strip
(`:92`) or preview overlay (`:70`) is clickable — an affordance the card cannot honour. That upstream
lift is itself **not PRM-gated** in `cards.css`. Both halves are glass-BH-inbox relay candidates
under the standing per-component relay law.

### U-4 · Two `useImageUpload()` instances over nested elements — INFO
`ImageUpload.vue:12` and `VisualizationView.vue:41` each own an independent `dragCounter` +
`isDragging`, both driven by the same bubbling events. Not a break in itself — it is the mechanism
behind **M-1**, and the reason ImageUpload's `handleDrop` is dead on the pointer path. Any F.W4
remediation of M-1 must decide which instance owns the drag vocabulary; two is one too many.

---

## §5 — SUPERLATIVES (L-18 runs both ways — same evidentiary bar)

**S-1 · The broken-image fallback is the only one in the repository.** `imgError` (`:10`), `onImgError`
(`:31-33`), the `ImageOff` fallback (`:59-62`), and — crucially — **two** reset sites (`:14` in the
upload callback, `:21` in the slug watcher) so the fallback cannot latch across images.
*Falsifier:* find another `@error` handler on any `<img>` in the tree.
*Result:* `grep -rn "@error" web/src` → **exactly one hit, `ImageUpload.vue:68`.** Across 66 SFCs
(R4-8/X-5, live-confirmed) this component is the sole author of a broken-asset state. **UPHELD.**

**S-2 · The focus ring is the canonical one, shipped natively.**
`.source-strip:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }` (`:199-202`).
*Falsifier:* show it diverges from the house pattern.
*Result:* it is **byte-identical** to the rule `style.css:136-143` had to **retrofit globally** at
D.W4.d onto four components that lacked it (`.sidebar-link`, `.floating-toc-item`, `.callout-btn`,
`.gallery-card` — PaperSidebar, MobileFloatingToc, PaperArticleWindow, GalleryCard), whose own
comment names `AppHeader.vue:174-177` as "the only pre-W4 conformant site". This component needed no
rescue. **UPHELD.**

**S-3 · Correct cross-component invalidation, documented at the seam.** `watch(() => store.imageSlug,
…)` (`:18-23`) with the comment *"including uploads initiated from the global dropzone or canvas
click target"* — it names both foreign entry points (`VisualizationView.vue:41` global dropzone,
`:127-136` canvas click) and resets both `imgError` and `preview` for them.
*Falsifier:* show either foreign path reciprocates. *Result:* neither `VisualizationView.vue:41-42`
nor `:132-136` touches ImageUpload's state; the traffic is one-way and **this** component is the one
doing the work. It is also the only thing that keeps B-1's stale-preview window bounded to failures
rather than permanent. **UPHELD.**

**S-4 · The empty state is 100% token-driven and therefore theme-correct by construction.**
`.source-strip` (`:190-206`) uses `color-mix(in srgb, var(--muted) 40%, transparent)`, `var(--border)`,
`color-mix(… var(--foreground) 25% …)`, `var(--ring)`, `var(--primary)` — **zero literal colours** in
17 lines covering rest / hover / focus / dragging.
*Falsifier:* find a hex or named colour in the block. *Result:* none.
*Additional check run and reported as a non-defect:* I tested whether the strip's `text-muted-foreground`
label clears AA over that composite background. `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`,
documented at `tokens/color-radius.css:45` as **5.21:1 vs page / 4.90:1 vs muted**; the strip's
composite (0.4·muted + 0.6·card) sits between, ≈ **5.0:1** — **PASSES** 4.5:1 for 14px normal text.
No contrast defect here. This block is also the counter-example that makes the rainbow bar's seven
hardcoded hexes (M-4) indefensible rather than merely inconsistent — the same author, the same file,
40 lines apart. **UPHELD.**

**S-5 · Design intent argued and recorded at the point of use.** The D.W4.b comment (`:87-91`) states
a *hierarchy* argument — the canvas placeholder is the hero, the dashed-border affordance is
**reserved** for the hero, the panel's cue is deliberately flat and secondary — and the code obeys
it (a one-line `button`, no dashed border, flat fill).
*Falsifier:* show the code contradicts the comment. *Result:* it does not; `:92-111` is exactly the
"slim source-strip" described, and the dashed treatment appears only in the preview branch.
The reasoning is sound and rare in this tree. Its tragedy is M-1: the hero it defers to is the very
overlay that erases the deferral. **UPHELD — as authored intent, not as delivered effect.**

---

## §6 — Corpus reconciliation (fold, don't re-invent)

| corpus row | this challenge |
|---|---|
| **R4-9** (ADOPT-AS-FACT, "the load-bearing row") — audited scope byte-identical to live at `cd26c653`/`9a66411d` | **RELIED ON.** Every line cite above is against that exact tree; no finding here is stale-at-HEAD. |
| **X-5 / R4-8 / R3-7** — 66 `.vue` workflows, live-confirmed | **USED AS DENOMINATOR** for S-1 ("only `@error` in 66 SFCs"). |
| **R3-11 / X-6** — the repo's only 2 Teleports are `PaperSearchModal.vue:41` + `FullscreenViewer.vue:105` | **USED AS FALSIFIER** for M-1: ImageUpload is not portalled, so no Teleport escapes the `z:0` band. |
| **R5-7** (native-template-loop blindness → F.W4) | **NOT APPLICABLE** — this component has no `v-for`, native or component. Recorded so the F.W4 exhaustiveness model can tick it off. |
| **R3-10** (6 dynamic `:is` families → F.W4) | **NOT APPLICABLE** — no `<component :is>` here. Recorded for the same reason. |
| **R3-7a** (35 Tooltip callsites / 9 consumers → F.W3) | **CONTRADICTED-BY-ABSENCE, deliberately.** ImageUpload is **not** among the nine consumers and uses no Tooltip — and it *should*: the icon-only, unlabelled replace target (B-3) is exactly the case a Tooltip + accessible name would serve. Filed as an F.W3 *addition* to the 35/9 budget, not a correction of it. |
| **[FE §5]** break surface (`metric-badge` ×7 files per C-4, `hover-card`/`-popover` ×4, dock ×3, `ToastVariant`) | **U-2: NIL overlap.** This file touches none of it. Its uplift cost is 3 lucide symbols out of the ×35 rename. |
| **census §5 risk 1** — the tri-package atomic deadlock | **CONCURRED, and re-pointed:** for *this* file the uplift is a net cure (U-1), so it should be an early adopter in F.W1's verification set rather than a risk item. |
| **census §3c [DOCS §3]** — inv-33, "all runtime colour derives from value.js" | **SHARPENED with a live instance:** `ImageUpload.vue:148-157`, seven literals in one gradient. The most concentrated inv-33 breach found in this component set; W.L5 / F.W2 hook. |
| **census §3a [FE §8]** — "18 reduced-motion references, but the two rAF clocks are ungated" | **EXTENDED:** the gap is wider than the two rAF clocks. **M-5** adds a third ungated engine — a CSS `infinite` animation — which the D.W4.c PRM sweep authored *two blocks above* and missed. |
| **census §2 C-4** (metric-badge is 7 *files*, not 6) | **NO CONTACT** — cited only to confirm U-2's negative. |

---

## §7 — Method, limits, disposition

- **Read-only throughout.** `/Users/mkbabb/Programming/fourier-analysis` was read, never written. The
  sole write of this lane is this file.
- **No browser tooling.** The one claim whose *rendered* outcome cannot be settled statically —
  **M-1**'s occlusion — is marked **UNPROVEN-NEEDS-LIVE** and carries its exact SS-13 reproduction
  (drag a file over the left panel on `/w`, screenshot the panel and the overlay together). Its
  stacking-order argument (bubbling + `--z-overlay: 50` + the `translate: 0` stacking context) is
  static-complete and independently checkable.
- **One claim was raised and then killed by its own falsifier** and is reported at the reduced
  severity the evidence supports, not suppressed: **m-12**. I expected Tailwind v4 to have dropped
  `ring-offset-*`, which would have made `:55`'s `ring-offset-2 ring-offset-card` a dead utility and
  the scoped `.ring-dashed` a break. Probing `node_modules/tailwindcss/dist/lib.js` (v4.3.1) showed
  `ring-offset`, `--tw-ring-offset-width/-color/-shadow`, `--tw-ring-color`, `--tw-ring-shadow` all
  present, and `--color-card` is bridged at glass-ui `theme/bridges.css:108`. **The rule works.**
  Filed MINOR (private-API coupling + double ring), not MAJOR.
- **A second expected finding was killed and is reported as a non-defect** inside **S-4**: the strip
  label's contrast **passes** AA (≈5.0:1) — the muted-on-muted composition that usually fails does
  not fail here.
- **Test-net context for the state findings.** vitest is ABSENT ([FE §0, §9]); the only gates are
  `vue-tsc` and 29 Playwright tests on a single chromium project. This component's e2e coverage
  (`workspace-flow.spec.ts:15,38,59,103,154,185`; `settings-persistence.spec.ts:52`;
  `gallery.spec.ts:89`; `visualization-ux.spec.ts:48`; `visualization-crud.spec.ts:154-159`) drives
  `setInputFiles` on `data-testid="image-file-input"` **exclusively on the happy path** — no
  rejected-format case, no oversize case, no failure case, no drag-and-drop case, no keyboard case.
  **B-1, B-2, B-3, M-6 and M-7 are all in the blind spot of the existing suite** — which is why they
  survived to this audit, and why F.W4's unit-test-floor decision should treat this file as its
  motivating example.
- **Suggested routing.** B-1/B-2/B-3/M-2/M-6/M-7/M-8 → **F.W4** (per-component D/L/C on the uplifted
  tree; these are pre-uplift defects that the uplift does not touch). M-3/M-4/M-5 → **F.W1/F.W3**
  (cured by `./progress` adoption; M-4 additionally an **inv-33 / W.L5-F.W2** row). U-3 → the
  **glass-ui BH inbox** relay (cartoon-surface hover-lift PRM). m-1..m-12 → F.W4 cleanup batch.
