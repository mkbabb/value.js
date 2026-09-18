claude-opus-5[1m]

# CHALLENGE — `GalleryCardModal.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GalleryCardModal.vue` (261 lines)
**Census row** `formation/fourier/lane-frontend.md:105` — "`GalleryCardModal.vue` | 261 | Card detail `Dialog`"
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its falsifier.
**Method** static + source-derived only (no browser). Read whole: the component, `lib/types.ts`,
`lib/api.ts`, `lib/colors.ts`, `visualization/lib/basis-display.ts`, the sole consumer
`GalleryView.vue`, the sibling `GalleryCard.vue`, `stores/gallery.ts`, `stores/workspace.ts`,
`composables/useWorkspaceLoader.ts`, `lib/draftStorage.ts`, `router/index.ts`, `App.vue`, the
glass-ui `dialog` d.ts + compiled chunk, `reka-ui/dist/Dialog/{DialogRoot,DialogContentImpl,utils}.js`,
glass-ui `tokens/{color-radius,light-dark,property-regs}.css`, and the FastAPI arm
(`api/models/visualization.py`, `api/routers/{visualizations,admin}.py`).

**Tally — 16 defects · 1 BLOCKER · 4 superlatives** (+2 required-coverage non-defect findings).

---

## §0 — Verdict in one line

The component is a competent, leak-free, well-commented glass-ui consumer whose *presentation* is
sound and whose *data contract* is broken at both ends: it reads a detached snapshot that never
refreshes, it renders two provably different colours for the one semantic hue, and its single
call-to-action navigates to the route that throws the saved visualization away.

---

## §1 — BLOCKER

### L-1 · BLOCKER — "Open Visualizer" opens the *pre-save workspace*, discarding the saved visualization

`GalleryCardModal.vue:185`
```
@click="emit('open-visualizer', entry.image_slug)"
```
`GalleryView.vue:396`
```
@open-visualizer="(slug) => { selectedEntry = null; router.push(`/w/${slug}`); }"
```

The chain, each link read:

1. `/w/:imageSlug?` (`router/index.ts:69`) mounts `VisualizationView.vue`, whose loader is
   `useWorkspaceLoader.ts:24-31` / `:35-47` — both branches call **`store.loadWorkspace(imageSlug)`**.
2. `loadWorkspace` (`stores/workspace.ts:135-189`) fetches `getImageMeta(slug)` and
   **`loadDraft(slug)` — the caller's own IndexedDB row** (`lib/draftStorage.ts:17-46`, DB
   `fourier-drafts`, keyPath `imageSlug`). If no local draft exists it hard-resets to defaults:
   `contour.value = null; contourSettings = defaultContourSettings(); animationSettings =
   defaultAnimationSettings(); epicycleData = null; basesData = null` (`workspace.ts:173-179`).
3. The correct loader exists and is documented: `loadVisualization(slug)`
   (`workspace.ts:191-232`) — "Load a saved visualization by its converged `slug`
   (CRUD-CONTRACT §1)" — restores `contour_settings`, `animation_settings`, the `contour_hash`
   asset, and captures `visualizationSlug` + the `If-Match` ETag.
4. **`loadVisualization` has zero live call sites.** `grep -rn "loadVisualization" web/src` →
   the definition (`:197`), the alias body (`:238`), the store export (`:447`). Nothing invokes it,
   because nothing in the tree ever navigates to `/v/:visualizationSlug`
   (`grep -rn 'push(\`/v/' web/src` → 0 hits; the only two `/w/` pushes are
   `workspace.ts:125` and `GalleryView.vue:370,396`).

Consequences, in ascending severity:

- **Every parameter the modal just displayed is discarded.** The modal renders `N={{ entry.n_harmonics }}`
  (`:151`) and the decomposition pills (`:129-139`); `/w/` reads none of them.
- **A viewer opening *someone else's* entry gets an empty canvas.** Drafts are per-browser IndexedDB,
  so `loadDraft` returns `null` for a foreign `image_slug` → `contour = null` → the visualizer opens on
  a blank stage for an entry the gallery presented as a finished artwork.
- **Browsing writes into the viewer's drafts.** `loadWorkspace` ends with `await _saveDraftNow()`
  (`workspace.ts:181` → `:93-106`), so merely following the CTA `put`s a draft row keyed on the
  *other user's* `image_slug` into the viewer's DB, which then surfaces in their own Drafts tab
  (`GalleryView.vue` drafts tab / `workspace.refreshDrafts`, `workspace.ts:408-410`).
- **Entity identity is not established.** `loadWorkspace` never sets `visualizationSlug` /
  `visualizationETag` and never clears them either. Any subsequent save goes through
  `saveVisualization()` (`workspace.ts:344-365`), which unconditionally `POST`s a **new** entity —
  no `fork_of`, no remix provenance, despite the fork substrate existing (`types.ts:216-225`).

**Falsifier A** — *"`/w/:imageSlug` is right; the modal should emit the image slug."* The payload is
right (see superlative **S-3**); the *route* is wrong. `router/index.ts:53-56` states the rule
verbatim: "B.W4 — one slug per noun (CRUD-CONTRACT §1). `/v/:visualizationSlug` addresses a **SAVED
visualization entity**; `/w/:imageSlug` is the **pre-save working session** over an image asset."
The gallery modal's `entry` is a saved `Visualization` (`types.ts:207-239`). The correct emit is
`entry.slug` to `/v/`. **Falsifier fails.**

**Falsifier B** — *"`VisualizationView` reconciles the entity from the image slug."* It does not:
`grep -n "visualizationSlug" VisualizationView.vue` → 0 hits; its seven `store.imageSlug` reads
(`:56,107,112,156,162,205,284`) are the whole of its identity handling. **Falsifier fails.**

**Falsifier C** — *"`/s/:slug` redirect covers it."* `router/index.ts:117-119` redirects
`/s/:slug → /w/${slug}` — into the same wrong arm. **Falsifier fails.**

**Repair (single line, at the modal):** emit `entry.slug`, route to `/v/${slug}`, and point
`useWorkspaceLoader` at `route.params.visualizationSlug → store.loadVisualization`. The dead
function is already written and already correct.

---

## §2 — MAJOR

### L-2 · MAJOR — the modal reads a **detached snapshot**; likes / views / tier never refresh

`GalleryView.vue:44` `const selectedEntry = ref<Visualization | null>(null);`
`GalleryView.vue:117` `selectedEntry.value = entry;` — an *object reference* captured out of
`gallery.entries`, never re-pointed (`grep -n "selectedEntry" GalleryView.vue` → `44, 117, 140, 390,
391, 393, 394, 396` — the only writes are the capture and three `= null`s).

Every store mutation that touches an entry **replaces the array element with a new object**:

| store call | `stores/gallery.ts` | mechanism |
|---|---|---|
| `like()` | `:197` | `entries.value[idx] = { ...entries.value[idx], likes }` |
| `recordView()` | `:208` | `entries.value[idx] = { ...entries.value[idx], views: data.views }` |
| `setTier()` | `:143` | `await resetAndFetch()` → `entries.value = result.items…` (`:94`) — whole array replaced |

So the snapshot goes stale immediately, and three separate readings in this component freeze:

1. **View count (`:106` `{{ entry.views }}`) is wrong the instant the modal opens.**
   `openModal` (`GalleryView.vue:116-122`) sets `selectedEntry` **then** fires
   `gallery.recordView(entry.slug)`, which awaits the GET and swaps in the incremented count at
   `gallery.ts:208`. The grid card behind the scrim shows `n+1`; the modal in front shows `n`.
   Two contradictory numbers for the same datum on one screen.
2. **Like count (`:118` `{{ entry.likes }}`) never moves.** Clicking the heart calls `handleLike`
   (`GalleryView.vue:124-130`) → `gallery.like` bumps the *array element*. The heart *does* fill,
   because `:is-liked` is bound to `likedHashes.has(...)` (`GalleryView.vue:393`), which is reactive.
   So the modal shows a filled heart next to a frozen number — the worst possible affordance, since
   it reads as "the like was recorded but the count is authoritative and unchanged".
3. **Admin tier controls appear dead (`:157-178`).** `handleSetTier` → `gallery.setTier` →
   `resetAndFetch()`. `selectedEntry` still holds the pre-mutation object, so
   `:class="{ active: entry.tier === 'featured' }"` (`:162`), `:aria-pressed` (`:163`) and the tier
   badge (`:85-92`) all keep the old value. Worse, the toggle expression
   `entry.tier === 'featured' ? 'normal' : 'featured'` (`:164`) re-reads the stale tier, so the
   second click re-sends the *same* request. An admin clicks Featured twice and sees nothing happen
   both times, while the server has been correctly written twice.

**Falsifier** — *"Vue reactivity propagates through the shared object."* It would, if the store
mutated in place. It does not: all three sites construct a **new object** (`{ ...spread }`) or a new
array. `selectedEntry` holds the *old* object, which is now unreferenced by the store and receives
no further writes. **Falsifier fails.**

**Root shape.** The prop contract is wrong, not the parent's discipline: a modal over a
store-owned collection must take the **identity** (`slug`) and derive the row, not take a detached
row. `entrySlug()` already exists (`gallery.ts:22-24`). The one-line parent fix is
`selectedSlug: ref<string|null>` + `computed(() => gallery.entries.find(e => e.slug === selectedSlug.value))`.

---

### L-3 · MAJOR — `VIZ_COLORS.fourier` at `:150` resolves to grey `#888888`, not the Fourier hue

`GalleryCardModal.vue:150`
```
<span class="text-base font-semibold font-mono" :style="{ color: VIZ_COLORS.fourier }">
```

Proof chain, every link read in the tree:

1. `--viz-fourier` is authored **in `oklch()`**: `@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263`
   `--viz-fourier:   oklch(0.579 0.201 30.4);` (dark arm `dark-arm.css:113`; `light-dark.css:145`
   uses `light-dark(oklch(…), oklch(…))`). `web/src/style.css:3` imports `@mkbabb/glass-ui/styles`;
   `style.css` never redefines `--viz-fourier` (`grep -n -- "--viz-" web/src/style.css` → only the
   `--viz-amber` carry at `:120`/`:125`).
2. It is **not** a registered custom property, so `getPropertyValue` returns the raw token stream,
   not a computed colour. glass-ui's only `@property` registrations are
   `progress-crescendo / phase-tint-amount / specular-{x,y,intensity} / glass-level / ui-scale`
   (`tokens/property-regs.css:38,44,76,82,88,111,126`), and `light-dark.css:52-56` states outright
   that there is deliberately **no colour `@property`**.
3. `cssVarToHex` (`web/src/lib/colors.ts:22-54`) matches exactly four forms — leading `#` (`:29`),
   `hsl(…)` (`:32-37`), a bare Tailwind HSL triplet (`:40-43`), `rgb(…)` (`:46-51`) — and has
   **no `oklch()` branch**. Fall-through returns the sentinel `"#888888"` (`:53`).
4. `resolveVizColors()` (`colors.ts:90-96`) therefore writes `#888888` into
   `VIZ_COLORS.fourier`, `.chebyshev`, `.legendre`, and `.green` — on mount (`App.vue:11`) **and on
   every dark-mode class flip** via the `MutationObserver` (`App.vue:13-17`).

So the "N=" harmonics readout — the modal's single quantitative datum — renders **grey** from first
paint onward.

**Falsifier A** — *"`getPropertyValue` returns a resolved colour."* Only for registered properties.
Refuted at step 2. **Fails.**

**Falsifier B** — *"the sentinel never fires; the mechanism is theoretical."* The tree contains the
control experiment. `--viz-amber` is the **one** viz token authored in `hsl()` —
`web/src/style.css:120` `--viz-amber: hsl(35 76% 35%);` / `:125` `hsl(37 73% 67%)`, the WCAG-darken
carry the census books at `CENSUS-2026-08-03.md:86-88` — and it is the one token the `hslMatch`
branch (`colors.ts:32-37`) can parse. Three oklch tokens collapse; the one hsl token survives.
The asymmetry *is* the proof. **Fails.**

**Falsifier C** — *"a `|| fallback` catches it."* `useCoeffHover.ts:65` does
`VIZ_COLORS.amber || VIZ_COLORS.golden` — `"#888888"` is truthy, so the guard is inert; and the
modal has no guard at all. **Fails.**

**UNPROVEN-NEEDS-LIVE (SS-13)** — the *rendered* pixel. The derivation above is complete from
source, but a single live read of `getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")`
would settle it in one line. Flagged for the live pass.

**Ownership note.** The bug is in `lib/colors.ts`, not this file. The modal is the **witness** and
one of the loudest: it is the only surface that puts the frozen path and the resolved path
side-by-side (see L-4).

---

### L-4 · MAJOR — `basisDisplay` snapshots `VIZ_COLORS` at module-eval; the pills never track the theme

`visualization/lib/basis-display.ts:3-7`
```ts
export const basisDisplay: Record<string, { icon: string; label: string; color: string }> = {
    fourier:   { …, color: VIZ_COLORS.fourier },
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

This is a **plain object literal**. It copies the *initial literal values* declared at
`colors.ts:78-80` (`#bf4040` / `#3d72b8` / `#9545b8`) at module-evaluation time, which happens
strictly before `App.vue`'s `onMounted` (`App.vue:10-18`). `resolveVizColors()` mutates the
`reactive()` object; `basisDisplay` holds detached strings and is never rewritten.

Two independent failures follow:

- **No reactive dependency.** `basisLabels` (`GalleryCardModal.vue:41-56`) reads `cfg.color`
  (`:53`) off a *non-reactive* record, so the `computed` never invalidates on theme change. Its only
  dep is `props.entry.active_bases`. The `MutationObserver` re-resolve (`App.vue:13`) reaches
  `:150` and cannot reach `:136`.
- **Wrong value even if it did invalidate.** The stored string is the pre-resolve literal, not the
  token.

The intended idiom is documented three files away and violated here:
`equation/composables/useCoeffHover.ts:60-65` — *"read the resolved `--viz-amber` hex via
`VIZ_COLORS` **at render time** (the runtime token-shadow pattern documented at `lib/colors.ts:11`)."*

**The composition of L-3 and L-4 is the sharpest single-file contradiction in this component.**
Inside one 261-line file, for the one semantic hue "Fourier":

| site | binding | rendered after mount |
|---|---|---|
| `:136` basis pill | `--pill-c: b.color` ← frozen `basisDisplay` | **`#bf4040`** (a red) |
| `:150` "N=" readout | `color: VIZ_COLORS.fourier` ← live reactive | **`#888888`** (grey) |

The stale path is the one that *looks* correct; the live path is the one that fails. Either bug
alone is invisible-ish; together they render the same concept in two different colours, six template
lines apart.

**Falsifier** — *"`basisDisplay` is reactive because `VIZ_COLORS` is."* Reactivity does not survive
property *reads* into a plain literal. `VIZ_COLORS.fourier` at `basis-display.ts:4` evaluates to a
`string` at module init; the object it lands in is never passed to `reactive()`. **Fails.**

**Repair:** make `basisDisplay` a function (`basisDisplayFor(key)`) or a `computed`, so the read
happens at render time — exactly the `useCoeffHover` pattern. Both consumers benefit (see L-6).

---

### L-5 · MAJOR — unguarded `v-else` renders an empty tier chip on every un-curated entry

`GalleryCardModal.vue:84-92`
```html
<div v-if="entry.tier !== 'normal'" class="modal-tier-badge …" :data-tier="entry.tier">
    <Crown v-if="entry.tier === 'featured'" :size="16" />
    <Bookmark v-else :size="16" />
    <span>{{ entry.tier }}</span>
</div>
```

`tier` is **optional**: `types.ts:232` `tier?: GalleryTier;`. When it is `undefined`:
`undefined !== 'normal'` → the badge mounts; `Crown` is false; the **unguarded `v-else` fires**;
`{{ entry.tier }}` interpolates to the empty string. Result: a floating bookmark glyph with no label
pinned over the image of an entry that has no tier.

And `undefined` is the **normal** case, not an edge:

- The Python response model has **no `tier` field at all** —
  `api/models/visualization.py:109-168`, and `model_config = ConfigDict(extra="forbid")` (`:168`)
  means the create path physically cannot emit one (`routers/visualizations.py:228` serialises the
  saved model).
- `tier` only ever enters the Mongo document through the admin arm:
  `routers/admin.py:183` (`$set {"tier": body.tier}`), `:432`, `:438`.
- The list endpoint passes the raw doc through: `_public_doc` (`routers/visualizations.py:78-80`)
  strips only `_id` and `liked_ips`.

⇒ **any entry an admin has never touched arrives with no `tier` key**, and the modal renders the
empty chip for it.

**Falsifier** — *"the backend defaults `tier` to `'normal'`."* Refuted twice over: no field on the
model, and `extra="forbid"` forecloses a stray write on the create path. **Fails.**

**Contradicts the sibling recipe.** `GalleryCard.vue:149-151` guards correctly:
```html
<div v-if="entry.tier !== 'normal'" …>
    <Crown v-if="entry.tier === 'featured'" … />
    <Bookmark v-else-if="entry.tier === 'saved'" … />   ← v-else-IF
```
So this is an unforced regression introduced at the copy site — the same copy event as L-6.
(The sibling's outer `v-if` is still loose: it mounts an empty 6×6 wrapper. Fix both by testing
`entry.tier === 'featured' || entry.tier === 'saved'`.)

---

### L-6 · MAJOR — `basisLabels` + `timeAgo` are byte-identical duplicates of `GalleryCard.vue`

| block | `GalleryCardModal.vue` | `GalleryCard.vue` |
|---|---|---|
| `basisLabels` computed | `41-56` (16 lines) | `36-51` (16 lines) |
| `timeAgo` | `58-66` (9 lines) | `53-61` (9 lines) |
| `<Badge v-for>` pill markup | `129-139` | `115-125` |
| `.basis-tint` CSS rule | `208-212` | (same recipe, per the `:205-207` comment) |

Diffed: identical, including the `.filter(Boolean) as {…}[]` assertion and the nested ternary. ~41
duplicated lines across the two files — **16 % of this component**.

**Already booked in the hitherto corpus.** `lane-fourier-r3-r6.md:86` (**R3-12**, ADOPT-AS-FACT):
"35 open-family records collapse to 28 unique records … Duplicated rows per `R3-HA-004`: both
Paper-search callsites, **`GalleryCard` basisLabels**, `MorphPhaseConfig` easingNames." This
challenge supplies the second half of that row: the twin is `GalleryCardModal.vue:41-56`.

The colocation point already exists — `visualization/lib/basis-display.ts` (7 lines,
`lane-frontend.md:124` "display-name map"). Hoisting the derivation there kills the duplication
**and** L-4 in one move (make it `basisLabelsFor(activeBases)` reading `VIZ_COLORS` at call time).
`timeAgo` belongs in `lib/` beside `easings.ts` / `figureDimensions.ts`.

**Falsifier** — *"they are separate components and duplication is idiomatic in SFCs."* Idiomatic for
*markup*; not for a 16-line derivation with a type assertion and a nested ternary that must stay in
lockstep. L-5 is the empirical proof that lockstep already broke: the two copies of the tier logic
diverged and the modal's copy is the buggy one. **Fails.**

---

### L-7 · MAJOR — no `DialogTitle` / `DialogDescription`; dangling `aria-labelledby` + unconditional dev warning

`GalleryCardModal.vue:71-73` opens `<DialogContent surface="opaque" …>` with no
`<DialogHeader>`/`<DialogTitle>`/`<DialogDescription>` anywhere in the subtree
(`grep -n "DialogTitle\|DialogDescription" GalleryCardModal.vue` → 0 hits).

- reka-ui `DialogContentImpl.js:78-79` always emits `aria-labelledby={rootContext.titleId}` on the
  content element. With no `DialogTitle` mounted, the id resolves to no element — the dialog is
  **unnamed** to assistive tech (a dangling IDREF is not a name; there is no fallback).
- reka-ui `DialogContentImpl.js:55` calls `useWarning(...)` under
  `process.env.NODE_ENV !== "production"`; `Dialog/utils.js:14-15` —
  `const hasTitle = document.getElementById(titleId); if (!hasTitle) console.warn(TITLE_MESSAGE)`.
  So **every open in dev logs** "`DialogContent` requires a `DialogTitle` … accessible for screen
  reader users".

**This component is the sole offender in the tree.** Every other `DialogContent` consumer ships a
title: `GalleryView.vue:404`, `ExportModal.vue:51`, `AdminFlaggedPanel.vue:267`,
`AdminUserList.vue:463`. The component's own D.W4.c comment (`:31-35`) claims the primitive brings
`role="dialog"` "for free" — it brings the *role*, not the *name*.

**Falsifier A** — *"glass-ui's `DialogContent` injects a default title."* It does not. The compiled
chunk `dist/DialogContent-DDE6pQBU.js:7` imports only
`{ DialogClose, DialogContent, DialogPortal, DialogRoot, injectDialogRootContext, useForwardPropsEmits }`
— no `DialogTitle`, no `VisuallyHidden`. Its only `sr-only` string is `"Close"` on the built-in ✕
(`:88`). **Fails.**

**Falsifier B** — *"the e2e no-console-errors test would have caught it."*
`web/e2e/gallery.spec.ts:118` is that test, but none of its five preceding cases opens a card
(`grep -n "test(" gallery.spec.ts` → `4, 25, 43, 67, 85, 118`; no card click). It also filters
errors, not warnings. See L-14. **Fails.**

**Repair:** `<DialogTitle class="sr-only">{{ entry.title ?? entry.image_slug }}</DialogTitle>` —
which also lands L-16.

---

## §3 — MINOR / INFO

### L-8 · MINOR — the `open` v-model is a constant-`true` getter: `@close` is a mandatory but unenforced contract

`GalleryCardModal.vue:36-39`
```ts
const open = computed({
    get: () => true,
    set: (v: boolean) => { if (!v) emit("close"); },
});
```

Because `open` is bound, reka-ui runs **fully controlled**: `DialogRoot.js:31-34`
`useVModel(props, "open", emit, { defaultValue: props.defaultOpen, passive: props.open === void 0 })`
— `props.open` is `true`, so `passive: false` and there is no internal state. The getter has **zero
reactive dependencies**, so it can never invalidate: Escape, scrim-click and the built-in ✕ all route
to `set(false)` → `emit("close")` → and the dialog stays open unless the *parent* unmounts it.

It works today only because `GalleryView.vue:390` guards with `v-if="selectedEntry"`. Any consumer
that uses `v-show`, keeps it mounted for animation, or forgets `@close` gets a **permanently
undismissable modal** with a focus trap — and neither the prop types (`:18-22`) nor the emit types
(`:24-29`) express that `close` is mandatory.

**Falsifier** — *"reka-ui keeps its own state, so close works regardless."* Refuted by the `passive`
expression above. **Fails.**

MINOR (not MAJOR): single consumer, correct today, no live symptom. It is a latent contract, and the
cheap fix is a local `ref(true)` set to `false` in the setter *before* emitting, so the primitive
plays its exit animation and the component is correct standalone.

### L-9 · MINOR — emit payload names say `hash`; the payload is a `slug`

`:26-28`
```ts
like: [hash: string];
"set-tier": [hash: string, tier: "featured" | "saved" | "normal"];
```
Both call sites pass `entry.slug` (`:115`, `:164`, `:174`), which is **correct** — CRUD-CONTRACT §1
retired the hash as identity (`types.ts:200-201`: "`slug` is the one user-facing identity … ;
`content_hash` is a non-identity dedup key"), and `Visualization` has no `hash` field at all
(`types.ts:207-239`). No runtime effect; this is a pure post-migration naming residue.

It is not cosmetic in consequence, though: this exact wording propagated the dead vocabulary through
the whole parent — `handleLike(hash)` (`GalleryView.vue:124`), `likedHashes`, `viewedHashes`,
`selectedHashes` (`:150`, with the apologetic comment at `:144-145` "carries the visualization
**slugs**"), `pendingBatch.hashes` (`:167`), and four user-visible strings
`"{{ pendingBatch.hashes.length }} entr(ies)"` (`:405,408,411`). `GalleryCard.vue:27-31` carries the
same five mislabels. Rename at the source.

### L-10 · MINOR — `timeAgo` is a non-reactive render-time function call

`:58-66` / `:99` `{{ timeAgo(entry.created_at) }}`. `Date.now()` (`:59`) is sampled during render and
never re-sampled; there is no ticker. A modal left open reads "just now" indefinitely. There is no
`onUnmounted` cost to fix it (`useIntervalFn` from `@vueuse/core`, already a dependency), but the
honest minimal fix is to drop the duplicate (L-6) and centralise a single ticking `useTimeAgo`.

### L-11 · MINOR — the `<img>` has no error, loading, or layout posture

`:78-82`
```html
<img :src="overlayUrl(entry.image_slug)" :alt="entry.image_slug" class="w-full h-full object-contain" />
```
`overlayUrl` (`lib/api.ts:296-298`) returns `${BASE}/api/images/${slug}/overlay?resize=1024` — a
**server-side render**, not a static asset. There is no `@error`, no skeleton/loading state, no
`width`/`height` (so the 16:10 frame at `:77` is the only CLS guard), no `decoding`, no
`fetchpriority`. A 404, a render timeout, or a purged asset yields the browser's broken-image glyph
inside an otherwise fully-populated modal. The sibling at least sets `loading="lazy"`
(`GalleryCard.vue:103`); this file sets nothing. (Eager is correct *here* — the omission is the
error posture, not the eagerness.)

### L-12 · MINOR — `.filter(Boolean) as {…}[]` is an unchecked assertion where a predicate is free

`:55`. `filter(Boolean)` does not narrow `(T | null)[]` in TypeScript, so the `as` papers over it.
`.filter((x): x is {icon:string;label:string;color:string} => x !== null)` is the same length and
actually checked. Duplicated verbatim at `GalleryCard.vue:50` (L-6). `strict: true` is on
(`web/tsconfig.json:8`), so this is the file's only assertion-shaped hole.

### L-13 · MINOR — `:key="b.label"` collides on duplicate bases

`:131`. Keys are derived from the *display label*, not from the source token. `active_bases` is an
unconstrained `string[]` (`types.ts:214`; server-side `list[str] = Field(default_factory=list)`,
`api/models/visualization.py:125` — no uniqueness constraint, no enum). Two `"fourier-epicycles"`
entries → two `"Epicycles"` keys → a Vue duplicate-key warning and undefined patch order. Key on the
source token (`b` from the map) instead.

### L-14 · MINOR — zero test coverage at every level

`find web -name "*.test.ts" -not -path "*/node_modules/*"` → **no unit test files exist anywhere in
`web/`**. The eight Playwright specs are the entire suite, and `web/e2e/gallery.spec.ts` (139 lines,
6 cases at `:4,25,43,67,85,118`) never clicks a gallery card, so `GalleryCardModal` — including the
admin tier controls (`:157-178`), the like affordance (`:109-120`) and the CTA (`:181-190`) — is
untested at unit, component and e2e level. Every defect above (L-1, L-2, L-5, L-7 especially) is a
straightforward assertion in a test that does not exist.

### L-15 · INFO — dead-scaffold indentation residue

`:76-192` are indented one level (4 spaces) deeper than their parent `<div>` at `:75` requires — the
leftover shape of the `Teleport` + `Transition` wrappers the D.W4.c comment (`:31-35`) says were
retired. Cosmetic, but it is the visible fingerprint of a refactor that removed nodes without
re-flowing, and it makes the `:75`/`:192` `<div>` pair read as unbalanced.

### L-16 · INFO — the modal titles itself with an asset FK and drops the entity's own identity fields

`:98` renders `{{ entry.image_slug }}` as the heading and `:80` reuses it as `:alt`. But
`entry.title` (`types.ts:226`), `entry.description` (`:227`), `entry.tags` (`:228`) and
`entry.owner_slug` (`:209`) all exist on the prop and none is rendered — so the detail view of a
*saved, user-named, user-owned* artwork is headed by its **image asset foreign key** and carries no
attribution. `:alt="entry.image_slug"` is also a filename-shaped string, not alternative text, on
the modal's single largest element. Fixing this and L-7 is the same edit.

---

## §4 — Required-coverage findings (NOT defects)

### L-17 · R5-7 template-loop invisibility — **the class does NOT apply here; a sibling class does**

**R5-7** (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY→F.W4): *"template-loop evidence keyed to
**component** callsites is blind to **native HTML element** loops."*

`GalleryCardModal.vue` has exactly **one** `v-for` (`:130`, `v-for="b in basisLabels"`) and it is on
`<Badge>` — a **component**. It therefore registers by callsite exactly as
`instance.loop.presets` does (`"callsiteId": "callsite:…/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`,
R5-7's cited contrast case). There are **zero** native-element `v-for`s in this file. R5-7's blind
spot does not reach this component, and R6-5's `NATIVE_TEMPLATE_LOOP` cure
(`lane-fourier-r3-r6.md:139`) adds nothing here.

**But the modal's loop is invisible for the adjacent reason**, and this is the finding worth carrying:
**R3-12** (`:86`) records that 35 open-family records canonicalise to 28, with "`GalleryCard`
basisLabels" among the 7 collapsed duplicates. Per **L-6**, `GalleryCardModal.vue:41-56` +
`:129-139` is a **byte-identical twin** of `GalleryCard.vue:36-51` + `:115-125`. So the two Badge
loops collapse to one canonical row and the modal's callsite drops out of the denominator — not by
native-element blindness, but by **canonical-form collapse over duplicated derivations**.

Generalisation for F.W4: *R5-7 is one of at least two ways a real loop callsite leaves the instance
denominator. The second is duplication + canonicalisation, and it is exactly co-extensive with the
DRY defects — every fix to L-6 also restores a row to the denominator.* R3-12's own conclusion,
"any instance denominator built on these rows over-counts by 7 (20 %)", has a mirror: **on the
component side it under-counts**, and this component is one of the 7 missing callsites.

### L-18 · viz render path — the modal touches it only as a raster consumer; **no canvas/WebGL surface, so no leak class**

Census `CENSUS-2026-08-03.md:85-87` (from `lane-frontend §6`): *"Canvas2D throughout, **WebGL/WebGPU
ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock;
ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces."*
`GalleryCardModal` is none of those three. Its entire contact with the render path is one
`<img src=overlayUrl(...)>` (`:78-79`) — a **server-rendered raster** of the overlay, produced by
`GET /api/images/{slug}/overlay?resize=1024` (`lib/api.ts:296-298`), not by any client canvas.
It imports nothing from `visualization/lib/canvas-drawing/*` (764 LOC, `lane-frontend.md:123`) and
nothing from `composables/useCanvasSetup.ts` / `useCanvasHover.ts`.

Consequently the whole teardown-defect family is **structurally absent**, verified by exhaustion of
the file's ten imports (`:1-16`) and its script body: no `addEventListener`, no `setTimeout` /
`setInterval`, no `requestAnimationFrame`, no `ResizeObserver` / `MutationObserver` / `IntersectionObserver`,
no `AbortController`, no `watch`, no `onMounted`/`onUnmounted`, no WebGL context. **Nothing to leak.**
See superlative **S-1** — this is a property the D.W4.c refactor *earned*, not an accident.

*(One indirect coupling worth recording for the viz lane: `overlayUrl`'s `resize=1024` default means
the modal always requests the full 1024 px overlay into a `max-w-[28rem]` frame (`:73`) — a ~2.3×
linear over-fetch. Not an L-axis defect; noted for the performance lane.)*

---

## §5 — Superlatives (L-18 runs both ways)

### S-1 · The `<Dialog>` re-point (D.W4.c) eliminated an entire defect class, and the tree proves it

`:31-35` records retiring a hand-rolled `Teleport` + `Transition` + Escape listener for the glass-ui
primitive. That is the *correct* call and the receipt is the exhaustive scan in **L-18**: the
component now has **zero** listeners, timers, observers, rAF handles and abort controllers, hence
**zero** `onUnmounted` obligations — the leak/teardown half of the LIBRARY axis is not merely clean
here, it is *uninstantiable*. A hand-rolled Escape listener is precisely the artefact that leaks when
a modal unmounts mid-transition; delegating to reka-ui's `DialogRoot` focus-trap /
`DialogContentImpl` dismiss stack removed the possibility rather than the instance.
**Falsifier** (*"the primitive leaks instead"*): reka-ui's dismiss/focus-scope teardown is
`onScopeDispose`-bound inside the portaled `DialogContentImpl`, which unmounts with the controlled
`open` flip — and the modal is the only consumer with **no** listener to unbind. It survives.

### S-2 · The CSS block names the primitive it narrows, every time

`:205-207`, `:218-219`, `:233-234`, `:246-247`, `:258-260` — five comments, each stating the glass-ui
chassis (`<Badge variant="outline">`, `<Button variant="ghost" size="sm">`, `variant="outline"
size="sm"`, `size="lg"`, `DialogContent`'s own `data-state` animation) and *why* the local rule
narrows it. `:205-207` even justifies the primitive choice ("the badge is decorative read-only here
(no click handler), so `<Badge>` is the precise primitive"). This is the discipline
`CENSUS-2026-08-03.md:82-85` credits fourier with — "deepest, cleanest consumer in the constellation
… 0 direct reka-ui; 0 shadcn copies" — expressed at the line level. It is also *how* L-4 was
findable: the comments make the intended colour semantics explicit enough to falsify.
**Falsifier** (*"comments that drift are worse than none"*): all five were checked against the
imports at `:3-5` and the compiled glass-ui surface; none has drifted.

### S-3 · The `open-visualizer` payload is *right* — the naive reading is refuted

The obvious L-axis accusation is "`open-visualizer` emits `image_slug` where a `slug` belongs"
(the emit is even typed `[imageSlug: string]`, `:27`). **That reading is wrong.** The receiving
route is `/w/:imageSlug?` (`router/index.ts:69`) and `useWorkspaceLoader.ts:25` reads
`route.params.imageSlug` — so the payload matches its consumer exactly, and the emit type names the
parameter honestly (unlike L-9's `hash`). The defect (L-1) is that the *destination route* is the
pre-save arm; the modal's contract with the route it targets is internally consistent. Recording this
because a shallower audit lands on the payload and misses the routing, and because the emit type here
is the file's one piece of *correct* post-CRUD-§1 naming.

### S-4 · `.basis-tint` projects three channels from one custom property

`:134-136` binds a single `:style="{ '--pill-c': b.color }"`; `:208-212` derives background,
border-colour and text-colour from it via `color-mix(in srgb, var(--pill-c) …)`. One binding, three
derived channels, no inline colour triplet, no per-variant class explosion, and automatically
correct under any future token change — the modern CSS idiom done exactly right, matching the value.js
house recipe. It is undone here only by its *source* (L-4's frozen literal), not by its *shape*;
fixing `basis-display.ts` makes this block correct with no edit to the component.
**Falsifier** (*"`color-mix(in srgb)` on an `oklch()` token loses fidelity"*): `b.color` is a hex
string by the time it reaches `--pill-c`, so `srgb` is the correct interpolation space here — the
choice is right for the value it actually receives.

---

## §6 — Carries

| # | Carry | Target |
|---|---|---|
| C-1 | **L-1** — route the gallery CTA to `/v/:visualizationSlug` + `loadVisualization`; the dead-but-correct loader (`workspace.ts:197-232`) is the whole fix. Retire `loadSnapshot` (`:237-239`). | F.W4 · BLOCKER |
| C-2 | **L-2** — modals over store collections take the identity, not the row. Audit every `ref<Entity \| null>` snapshot held against a Pinia collection (`AdminFlaggedPanel`, `AdminUserList` share the shape). | F.W4 |
| C-3 | **L-3** — `cssVarToHex` needs an `oklch()` branch (or replace the whole parser with a 1×1 canvas 2D `fillStyle` resolve — the idiom value.js already ships in `demo/`). Four tokens are currently grey. | F.W4 · cross-repo (glass-ui token-form ↔ consumer parser) |
| C-4 | **L-4 + L-6** — hoist `basisLabelsFor()` into `visualization/lib/basis-display.ts` reading `VIZ_COLORS` at call time. One edit lands the DRY defect, the theme defect, and restores the R3-12-collapsed callsite (L-17). | F.W4 |
| C-5 | **L-5** — the `tier` field is absent from the Python `Visualization` model while the admin arm writes it into the doc. Frontend guard + backend field. | F.W4 (frontend) / F.W5 (CRUD model) |
| C-6 | **L-7** — `DialogTitle` audit across all `DialogContent` consumers; this is the only offender, so it is a one-line close. | F.W4 |
| C-7 | **L-14** — `web/` has **no unit-test infrastructure at all**. Every defect above is a cheap assertion in a suite that does not exist. | F.W4 |
| C-8 | **L-17** — record the second loop-invisibility mechanism (canonical-form collapse over duplicated derivations) alongside R5-7's native-element blindness, so F.W4's instance denominator accounts for both. | F.W4 |

---

## §7 — Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:105` — "`GalleryCardModal.vue` \| 261 \| Card detail `Dialog`" | **CONFIRMED** — 261 lines exact; the `Dialog` characterisation is right. |
| `lane-frontend.md:341-343` — the three glass-ui imports | **CONFIRMED** — `:3-5`, exact, and clean (no reka-ui, no shadcn copy). |
| `lane-frontend.md:124` — `basis-display.ts` \| 7 \| "display-name map" | **AMENDED** — it is also a **colour-value map**, and that is the L-4 defect: the display half is static and fine, the colour half must not be. |
| **R3-12** (`lane-fourier-r3-r6.md:86`) — "`GalleryCard` basisLabels" among 7 collapsed duplicates | **EXTENDED** — the twin is `GalleryCardModal.vue:41-56`; L-6 names the second half of the collapsed pair and L-17 draws the denominator consequence. |
| **R5-7** (`:125`) — native-loop invisibility, CARRY→F.W4 | **NOT APPLICABLE here** (the only `v-for` is over a component); a *sibling* mechanism applies instead — see L-17. Stated explicitly rather than silently skipped. |
| **X-2** (`:153`) — "9 route records = 7 lazy component + 2 redirect + 1 alias"; census's "8 routes" wrong | **CORROBORATED and sharpened.** Re-counted `router/index.ts:40-119`: 7 lazy + 2 redirect + 1 alias. **New**: of the 7 lazy component routes, `/v/:visualizationSlug` (`:58`) is **unreachable from the UI** — no `router.push('/v/…')` anywhere in `web/src`. Codex's record-count model was right; neither side noticed one record is orphaned. That orphan **is** L-1. |
| `CENSUS-2026-08-03.md:85-87` — "Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases" | **CONFIRMED** and used as the falsifier for L-18: this component is none of the three, so the teardown class is structurally absent. |
| `CENSUS-2026-08-03.md:86-88` — the `--viz-amber` WCAG darken held as a local carry | **RE-READ AS EVIDENCE.** The carry rewrote `--viz-amber` into `hsl()` (`style.css:120,125`), which is why amber is the one viz token `cssVarToHex` can parse. The carry accidentally masked L-3 for one token out of four. |
| `lane-frontend.md:42` / census §3a — "8 routes, all lazy" | **CONTRADICTED** (with X-2): 9 records, 7 lazy. Re-verified independently against the live tree. |
