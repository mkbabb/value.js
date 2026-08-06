claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `GalleryCardModal.vue`

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryCardModal.vue` (261 lines)
**Axis** CONSUMPTION — value.js `0.13.0` · keyframes `4.3` · glass-ui `^4.0.0` (inst 4.0.0) · the 45-operation fourier API · props/emits contract · integration seams
**Method** static + source-derived only. No browser. Two claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13. Every runtime assertion about value.js was executed against the *installed* `node_modules/@mkbabb/value.js@0.13.0` (a read of the shipped bytes, not of product source).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Each claim carries its own falsifier; the falsifiers were run.

**Tally — 17 defects (2 BLOCKER · 8 MAJOR · 4 MINOR · 3 INFO) · 4 superlatives.**

---

## §0 — the consumption surface, enumerated

| Producer | What this file actually consumes | Sites |
|---|---|---|
| **glass-ui 4.0.0** | `Badge`, `Button`, `Dialog`, `DialogContent` — all via deep subpaths | `:3`, `:4`, `:5` |
| **glass-ui tokens** | `--shadow-modal`, `--tier-featured`, `--tier-saved`, `--like`, `--foreground`, `--muted-foreground`, `@utility cm-serif`, `@utility fourier-f` | `:202`, `:215-216`, `:229`, `:126/137/146`, `:187` |
| **value.js 0.13.0** | **nothing directly.** Reached only transitively as the *absent* substrate under `lib/colors.ts`'s hand-rolled arms | — |
| **keyframes 4.3** | **nothing.** Motion is delegated wholly to `DialogContent`'s `popover-animate` | `:217-219` (the retirement comment) |
| **fourier API (45 ops)** | exactly **one** read: `overlayUrl` → `GET /api/images/{imageSlug}/overlay` | `:7`, `:79` |
| **fourier API (implied)** | `set-tier` → `PATCH /api/admin/visualizations/{slug}/tier` (via parent); **`like` → NOTHING** | `:115`, `:164`, `:174` |

The 45-operation denominator is re-derived live and matches X-3 / R3-7 exactly:
`contours 4 + admin 13 + equations 2 + gallery 1 + sessions 4 + main 1 + visualizations 13 + images 7 = 45`.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · the Like control has no operation behind it anywhere in the 45

**Claim.** `:109-120` renders an `aria-pressed` toggle button that emits `like`. There is **no like operation in the API**, there never was, and the store's handler is a pure local counter bump that hard-codes `liked = true`.

**Provenance.**
- `GalleryCardModal.vue:109-120` — `<Button variant="ghost" … :aria-pressed="isLiked" @click="emit('like', entry.slug)">` with `<Heart :fill="isLiked ? 'currentColor' : 'none'">` and `{{ entry.likes }}`.
- `web/src/lib/api.ts` — `grep -n "like"` over all 672 lines returns **zero hits**. The client has no like wrapper at all.
- `api/routers/*.py` + `main.py` — of the 45 decorators, **zero** match `like`.
- `web/src/stores/gallery.ts:189-199` — the whole implementation:
  ```
  const liked = true;
  const likes = (entries.value[idx].likes ?? 0) + 1;
  entries.value[idx] = { ...entries.value[idx], likes };
  return { liked, likes };
  ```
  with the self-incriminating comment at `:190-192`: *"no dedicated toggle endpoint under the CRUD shape — optimistic local bump."*
- `api/models/visualization.py:152` — `likes: int = 0`, a field only ever read.
- `api/lib/crud/cursors.py:17,22` — `"likes"` is a **live sort key**, and `api/services/database.py:111` builds a compound index `(visibility, likes, _id)` for it. The gallery can sort by a counter that no client on earth can increment.
- `api/routers/visualizations.py:80,318` / `gallery.py:34,58` / `admin.py:87,555` — a `liked_ips` field is *excluded* from every projection in six places, i.e. the write-side dedup set was designed. `grep -rn "liked_ips"` over `api/` returns **only** those exclusions — never an `$addToSet`, `$push`, or `$set`. The field is a phantom.

**Failure scenario.** An anonymous visitor opens a card, clicks the heart. The count goes `12 → 13`, the heart fills, `aria-pressed` flips to `true`. Nothing is sent. A refresh restores `12`. The button cannot un-like — `liked` is a literal `true`, so `s.delete(hash)` at `GalleryView.vue:128` is dead code. A screen-reader user is told the entry is "pressed"; the assertion is false the moment the page reloads. Meanwhile the `likes` sort key ranks the whole gallery by a column frozen at whatever the migration seeded (`api/scripts/migrate_visualization.py:240`).

**Falsifier.** Any like/unlike route in `api/` (a 46th decorator), or any `like`-named export in `web/src/lib/api.ts`, or a single write to `liked_ips`. All three greps are clean over the whole tree.

**Carry.** F.W5 — this is the sharpest instance yet of R3-7c's *"36 client edges, nine gaps"*: here the gap runs the **other way** — a shipped interactive affordance with **no operation at all**. The census's operation↔client join must count client-side orphans, not only operation-side ones, or this hole is invisible to it.

---

### C-2 · BLOCKER · the `entry` prop is an orphaned object — views, likes and tier can never update, and the admin tier toggle is a one-shot latch

**Claim.** The parent hands the modal an object reference that every mutation path in the store immediately replaces. The modal therefore renders a permanently frozen snapshot, and the two admin tier buttons compute their *next* value from that frozen snapshot — so they can only ever emit one of the two values, forever.

**Provenance.**
- `GalleryView.vue:44` — `const selectedEntry = ref<Visualization | null>(null);`
- `GalleryView.vue:116-122` — `openModal(entry)` does `selectedEntry.value = entry` (the object out of `gallery.entries`), then fires `gallery.recordView(entry.slug)`.
- `stores/gallery.ts:207-208` — `recordView` does `entries.value[idx] = { ...entries.value[idx], views: data.views }` — **a new object**. `selectedEntry.value` still holds the old one.
- `stores/gallery.ts:197` — `like` likewise: `entries.value[idx] = { ...entries.value[idx], likes }`.
- `stores/gallery.ts:84-97` — `resetAndFetch` does `entries.value = []` and then `entries.value = result.items.filter(…)` — the array *and* every element are replaced wholesale.
- `stores/gallery.ts:138-148` — `setTier` calls `api.setVisualizationTier(…)` then `await resetAndFetch()`.
- `GalleryView.vue:132-135` — `handleSetTier` never touches `selectedEntry`.
- `GalleryCardModal.vue:106,118` — `{{ entry.views }}`, `{{ entry.likes }}`.
- `GalleryCardModal.vue:164,174` — `emit('set-tier', entry.slug, entry.tier === 'featured' ? 'normal' : 'featured')`.

**Failure scenario (three, one file).**
1. *Views.* `openModal` records the view; the server returns `views + 1`; `entries[idx]` gets it; the grid card underneath updates; **the modal, which is the thing that caused the increment, shows the pre-increment number.** Close it and the card behind reads one higher.
2. *Likes.* Under C-1 the count is fictional anyway, but even the fiction doesn't land — the modal's `{{ entry.likes }}` is bound to the orphan, so it never even shows the optimistic bump. Only the heart fill (driven by the separate `likedHashes` Set at `GalleryView.vue:45,393`) responds. **The heart fills and the number beside it does not move.**
3. *Tier — the latch.* An admin opens an un-curated entry (`entry.tier === undefined`, see C-3). Click **Featured** → emits `'featured'` → server sets it → `resetAndFetch` → the modal's orphan still reads `undefined`. `aria-pressed` still `false`. Click **Featured** again → `undefined === 'featured'` is still false → emits `'featured'` **again**. *The Featured button in this modal can never emit `'normal'`.* Symmetrically, an entry that was already `featured` when the list was fetched can only ever emit `'normal'`. Un-featuring from the detail view is structurally impossible; the second click is always a no-op repeat of the first.

**Falsifier.** Make `selectedEntry` a `computed` that re-looks-up by slug over `gallery.entries` (three lines at `GalleryView.vue:44`), **or** have `like`/`recordView` mutate in place rather than spread-replace, **or** have `handleSetTier` re-point `selectedEntry`. Any one kills all three. None is present. A second falsifier: if `entries` elements were shared by reference across `resetAndFetch`, (3) would survive — but `:85` empties the array and `:95` rebuilds from a fresh `listVisualizations` payload, so no element identity survives.

**Note on the sibling.** `GalleryCard.vue` does not suffer this: it re-renders from `gallery.entries` through `v-for`, so its own tier overlay buttons (`:162,:171`) always see fresh data. The defect is created *by the modal's prop seam*, not by the store.

---

## §2 — MAJOR

### C-3 · MAJOR · the tier badge fires on **every** entry and asserts "saved" on entries that have no tier at all

**Claim.** The server never emits `tier` for an uncurated visualization. The modal's guard is `!== 'normal'`, which `undefined` passes, and its icon fallback is a bare `v-else`, which resolves to `Bookmark`. Every uncurated entry therefore shows a bookmark badge with an **empty label**.

**Provenance.**
- `api/models/visualization.py` — `grep -n "tier"` returns **nothing**. The Pydantic document model (which carries `views`, `likes`, `pinned`, `bytes`, `set_hash`, …, and `model_config = ConfigDict(extra="forbid")` at `:169`) has no `tier` field.
- `api/routers/admin.py:183` — `tier` is written **only** by the admin op: `{"$set": {"tier": body.tier, …}}`. Also `:432,:438` for the batch feature/unfeature.
- `api/routers/visualizations.py:78-80` — `_public_doc` is `{k: v for k, v in doc.items() if k not in ("_id","liked_ips")}`; the raw Mongo doc is serialised with `json.dumps` at `:334`, bypassing the Pydantic model. So `tier` reaches the client **iff an admin has ever set it** and is simply **absent** otherwise.
- No creation path sets a default: `grep -n "\"tier\"" api/routers/visualizations.py api/scripts/migrate_visualization.py` → zero hits.
- `web/src/lib/types.ts:232` — `tier?: GalleryTier;` — correctly optional on the client.
- `GalleryCardModal.vue:85-92`:
  ```
  v-if="entry.tier !== 'normal'"           ← undefined passes
  <Crown v-if="entry.tier === 'featured'" />
  <Bookmark v-else />                      ← undefined lands here
  <span>{{ entry.tier }}</span>            ← renders ""
  ```

**Failure scenario.** The default state of the gallery — every entry no admin has touched — renders, over the image, a rounded pill containing a bookmark glyph and no text. `:data-tier="entry.tier"` with `undefined` makes Vue **omit** the attribute entirely, so neither `.modal-tier-badge[data-tier="featured"]` (`:215`) nor `[data-tier="saved"]` (`:216`) matches and the glyph inherits the ambient foreground. The result reads as "this is Saved" on entries that are not.

**Contrast — the sibling got it right.** `GalleryCard.vue:149-151`:
```
<div v-if="entry.tier !== 'normal'" …>
    <Crown v-if="entry.tier === 'featured'" … />
    <Bookmark v-else-if="entry.tier === 'saved'" … />   ← v-else-IF
</div>
```
The card uses `v-else-if`, so `undefined` renders an empty wrapper — still a defect (an empty 24×24 circle), but it never *asserts* a tier. Two adjacent files, same author, same condition; the modal picked the branch that lies.

**Falsifier.** A `tier` field with a default on `api/models/visualization.py`'s `Visualization`, or a create/migration path that seeds `"tier": "normal"`, or a client-side default. Three greps, all clean. Alternatively `v-else-if="entry.tier === 'saved'"` at `:90` plus `entry.tier &&` at `:85` kills it.

---

### C-4 · MAJOR · [FOLD] the Harmonics readout renders grey — the `oklch()` blind spot in `cssVarToHex`

**FOLD.** `formation/fourier/lane-docs.md:400-401` (the four-arm enumeration and the `#888888` fallthrough) and `audit/fourier-components/App/challenge-D-design.md:98` (the App-level failure scenario, which already names `GalleryCardModal.vue:150`). **Not re-invented — corroborated and executed.**

**Component-specific incidence.** `:150` — `<span … :style="{ color: VIZ_COLORS.fourier }">N={{ entry.n_harmonics }}</span>`. This is the modal's only live read of the reactive palette.

**Execution (new evidence).** `lib/colors.ts:22-53`'s four arms were replayed verbatim against the *actual* token strings glass-ui ships:

| token (glass-ui `src/styles/tokens/light-dark.css:145-147`, `color-radius.css:263-265`) | value | `cssVarToHex` result |
|---|---|---|
| `--viz-fourier` | `light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))` | `#888888` |
| `--viz-fourier` (`.dark` arm, `dark-arm.css:113`) | `oklch(0.693 0.151 28.1)` | `#888888` |
| `--viz-chebyshev` | `oklch(0.484 0.163 265.5)` | `#888888` |
| `--viz-legendre` | `oklch(0.532 0.180 317.5)` | `#888888` |
| `--viz-amber` (**fourier's own override**, `style.css:120`) | `hsl(35 76% 35%)` | HSL arm — **works** |

The accidental survivor is instructive: `--viz-amber` parses *only* because fourier overrode it locally at `style.css:113-127` for an unrelated WCAG carry. Every token still sourced from the producer is `oklch()` and every one of them collapses.

**Failure scenario.** `App.vue:11` runs `resolveVizColors()` on mount, overwriting the sane seed literal `#bf4040` (`colors.ts:78`) with `#888888`. `:150` then paints "N=64" grey. `App.vue:13-17`'s `MutationObserver` re-asserts the grey on every theme flip, so it never self-heals.

**Falsifier.** An `oklch()` arm in `cssVarToHex`, or a fourier-local `hsl()`/hex override of `--viz-fourier` (the `--viz-amber` precedent shows the mechanism exists). `grep -rn -- "--viz-fourier:" web/src` → the only hit is `colors.ts:91`, the *reader*. A second falsifier: if browsers resolved `oklch()` to `rgb()` in `getPropertyValue` for **unregistered** custom properties, the `rgb()` arm would catch it — but `grep -rn "@property" glass-ui/src/styles` shows registrations only for `--dock-morph-t`, `--fade-start`, `--fade-end`; no `<color>` registration exists for any `--viz-*`.

---

### C-5 · MAJOR · [NEW — CONTRADICTS the corpus] `basis-display.ts` **snapshots** the reactive palette at module-eval, so the Decomposition pills and the Harmonics readout show two different colours for the same basis

**Explicit contradiction.** `audit/fourier-components/DarkModeToggle/challenge-C-consumption.md:220` lists `lib/basis-display.ts:1,4-6` among the *"fifteen-plus consumers [that] obey"* the runtime-read contract, and names `DarkModeToggle.vue:30-31` as *"the **only** surface that freezes viz-palette channels into literals."* **That is wrong.** `basis-display.ts` is a second freezing surface, and it is the one this modal's pills read.

**Provenance.** `web/src/components/visualization/lib/basis-display.ts` in full (7 lines):
```
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon: string; label: string; color: string}> = {
    fourier:   { icon: "ℱ", label: "Fourier",   color: VIZ_COLORS.fourier },
    chebyshev: { icon: "Tₙ", label: "Chebyshev", color: VIZ_COLORS.chebyshev },
    legendre:  { icon: "Pₙ", label: "Legendre",  color: VIZ_COLORS.legendre },
};
```
`VIZ_COLORS` is a `reactive()` object (`colors.ts:76-86`) whose members are **string primitives**. Reading `VIZ_COLORS.fourier` into an object literal at **module top level** copies the value. Module evaluation happens at import time — strictly before `App.vue:10`'s `onMounted`. `resolveVizColors()` mutates the reactive; `basisDisplay.fourier.color` is a detached copy and never changes again.

**The consequence is a divergence inside a single 28 rem card.** In this modal:
- `:135` — `:style="{ '--pill-c': b.color }"` where `b.color` came from `basisDisplay` → **frozen at `#bf4040`** (the seed literal, `colors.ts:78`).
- `:150` — `:style="{ color: VIZ_COLORS.fourier }"` reads the live reactive → **`#888888`** after mount (C-4).

So the "ℱ Fourier" pill at `:129-139` is dark red and the "N=…" figure at `:150-152`, which denotes the same basis, is grey. Neither is the token's true value.

**Second consequence.** The pills do not track theme. Toggling dark mode fires the `MutationObserver`, `resolveVizColors()` runs, `VIZ_COLORS` updates — and the three pill colours stay at their light-mode-ish literals `#bf4040` / `#3d72b8` / `#9545b8`. Whether those clear AA against the dark surface is `UNPROVEN-NEEDS-LIVE`; the **staleness itself is proven statically**.

**Falsifier.** Any live read in `basis-display.ts` — a getter, a `computed`, a `toRef`, or exporting a function `basisDisplay()` instead of a frozen record. There is none: the file is 7 lines and has no function. Second falsifier: if Vue's `reactive` returned boxed refs for string members, the copy would stay live — it does not; `reactive` unwraps to raw primitives on property access.

---

### C-6 · MAJOR · the dialog has no accessible name, emits a guaranteed `console.warn` on every open, and carries a dangling `aria-labelledby`

**FOLD/EXTEND.** `audit/fourier-components/ExportModal/challenge-C-consumption.md:186` already names *"ExportModal and `GalleryCardModal` [as] the two outliers"* among Dialog consumers with no `DialogTitle`. Extended here with the producer mechanism and the coverage blind spot.

**Provenance.**
- `GalleryCardModal.vue:71-74` — `<DialogContent surface="opaque" class="…">`. No `DialogTitle`, no `DialogHeader`, no `aria-label`, no `aria-labelledby`. `glass-ui/dist/DialogContent-DDE6pQBU.js` spreads the rest-props to reka-ui, so an `aria-label` *would* forward — none is passed.
- `reka-ui@2.9.10 dist/Dialog/utils.js` — `useWarning` runs `onMounted`, does `document.getElementById(titleId)`, and on miss fires
  `Warning: \`DialogContent\` requires a \`DialogTitle\` for the component to be accessible for screen reader users.`
- `reka-ui@2.9.10 dist/index.js` — `"aria-labelledby": unref(rootContext…)` is emitted **unconditionally**. With no title mounted, the attribute references an id that provably does not exist.
- Every peer supplies one: `GalleryView.vue:415-426` (`DialogHeader`+`DialogTitle`+`DialogDescription`), `AdminFlaggedPanel.vue:268-272`, `AdminUserList.vue:461-ff`.

**Failure scenario.** A screen reader announces the dialog with no name. axe would raise `aria-dialog-name` **and** `aria-valid-attr-value` (the labelledby target is absent) — the axe verdict itself is `UNPROVEN-NEEDS-LIVE`; the *absence of any naming mechanism* and the *unconditional labelledby* are confirmed from the shipped bytes.

**The coverage blind spot is exact.** `web/e2e/visualization-ux.spec.ts:148-163` is "Keystone 3 — ExportModal Dialog open is a11y-clean" — the suite has an axe keystone for the *other* untitled dialog and none for this one. `web/e2e/gallery.spec.ts` has 6 tests (`:4,:25,:43,:67,:85,:118`) and **not one opens a card** — `grep -n "modal\|dialog\|Open Visualizer"` over it returns zero. And `gallery.spec.ts:118-138`, the "no console errors" guard, filters on `msg.type() === "error"` only, so a `console.warn` would slip past even if the modal were reached. The defect is invisible to the suite three ways over.

**Falsifier.** A `DialogTitle` (even `VisuallyHidden`-wrapped, per reka's own guidance in the warning text), or an `aria-label` on `:71`. Neither exists. A grep for `VisuallyHidden` in `web/src` returns nothing.

---

### C-7 · MAJOR · both ℱ glyphs in this modal resolve through fonts the application never loads — and through **two different** ones

**Claim.** The modal renders U+2131 SCRIPT CAPITAL F twice. `:137` routes it through `cm-serif`; `:187` routes it through `fourier-f`. Both utilities resolve to stacks containing zero loaded faces, and the two stacks are disjoint.

**Provenance.**
- `GalleryCardModal.vue:137` — `<span class="cm-serif font-semibold text-[1.1em]">{{ b.icon }}</span>`, where `b.icon` is `"ℱ"` (`basis-display.ts:4`).
- `GalleryCardModal.vue:187` — `<span class="fourier-f">&Fscr;</span>` (`&Fscr;` **is** U+2131).
- `glass-ui/src/styles/typography/utilities.css:65-67` — `@utility cm-serif { font-family: var(--font-serif-math, serif); }`
- `grep -rn -- "--font-serif-math:" web/src node_modules/@mkbabb/glass-ui/{src,dist/glass-ui.css} public index.html` → **zero declarations.** `cm-serif` therefore resolves to the bare `serif` keyword.
- `glass-ui/src/styles/typography/utilities.css:77-85` — `@utility fourier-f { font-family: var(--font-display); font-style: italic; … }`
- `glass-ui/src/styles/theme/bridges.css:67` — `--font-display: var(--font-stack-display)`; `tokens/scheme-motion.css:44` — `--font-stack-display: var(--font-stack-text)`; `:43` — `--font-stack-text: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`.
- `web/public/fonts.css` declares exactly three families: **Computer Modern Serif** (`:15`), **Fraunces** (`:45`), **Fira Code** (`:69`). Plus Jakarta Sans is not among them, and `glass-ui/src/fonts/` ships only `fira-code` and `plus-jakarta-sans` — the latter is never imported by fourier (`grep -rn "plus-jakarta" web/src web/index.html` → nothing).

**Failure scenario.** `:137`'s ℱ falls to the platform `serif` (Times New Roman / Liberation Serif). `:187`'s ℱ falls through two unloaded Jakarta entries to `system-ui` (SF Pro / Segoe UI / Roboto), then — since `system-ui` faces generally lack U+2131 — to whatever the platform's last-resort symbol font is. **The same character, twice in one card, in two different and both-unintended faces**, inside an application that loads Computer Modern Serif specifically so that its mathematical marks are consistent. Which concrete glyphs render is `UNPROVEN-NEEDS-LIVE` (per-platform fallback); the *stack resolution* is confirmed from the shipped CSS.

**FOLD.** `audit/fourier-components/ExportModal/challenge-D-design.md:210-235` established the `cm-serif` → `--font-serif-math` break as a 3.1→4.0 producer regression and cited `GalleryCardModal.vue:126` as a carrier. This extends it: (a) the modal carries `cm-serif` at **three** sites (`:126`, `:137`, `:146`), not one; (b) `fourier-f` is a **second, independent** break the ExportModal row did not reach, since `--font-display` *is* declared — it just points at a font fourier never loads.

**Falsifier.** A `--font-serif-math` declaration anywhere reachable, or a Plus Jakarta Sans `@font-face` in `public/fonts.css` / `index.html` / the glass-ui bundle. Both greps are clean across `web/src`, `web/public`, `web/index.html`, `glass-ui/src`, `glass-ui/dist/glass-ui.css`.

---

### C-8 · MAJOR · glass-ui's own `cn()` cannot dedupe glass-ui's own semantic radius aliases — this file lands two competing `border-radius` utilities on one element

**Claim.** `:73` passes `rounded-xl`. `DialogContent` composes `rounded-dialog`. glass-ui does **not** use `tailwind-merge`; it ships a hand-rolled merge whose `rounded` matcher is a closed enum that excludes every semantic radius alias the design system mints. Both classes survive onto the element and the winner is decided by Tailwind's internal emit order rather than by the author.

**Provenance.**
- `glass-ui/dist/DialogContent-DDE6pQBU.js` — the class expression is
  `cn("fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 p-6", spring ? "" : "…popover-animate", cn(useSurfaceAxis(surface,"floating"), "rounded-dialog"), props.class)`.
- `glass-ui/dist/cn-DJXf4yaB.js` — `cn = (…t) => dedupe(clsx(t))`. **No `tailwind-merge` import** (`import { clsx } from "clsx"` is the only import). The dedupe table's rounded row is:
  `["rounded", /^rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|t|r|b|l|tl|tr|bl|br))?$/]`
  and the loop at `dist/cn-DJXf4yaB.js` `function a(e)` does `if (l === null) continue` — an unmatched class is **never** a dedupe candidate.
- `rounded-dialog` does not match that regex. `rounded-xl` does. Neither displaces the other → **both are emitted.**
- `glass-ui/src/styles/theme/radius.css:19,21,34` — `--radius-xl: 12px`, `--radius-2xl: 1rem`, `--radius-dialog: var(--radius-2xl)`. So `.rounded-xl` = **12 px** and `.rounded-dialog` = **16 px** — a real 4 px divergence, same specificity `(0,1,0)`, same utilities layer.

**Failure scenario.** The author writes `rounded-xl` intending 12 px. Whether they get it depends on which of the two `border-radius` rules Tailwind v4 emits last — an engine-internal ordering the source cannot see and no test asserts. The rendered radius is `UNPROVEN-NEEDS-LIVE`; the **unresolvable conflict** is confirmed statically from the merge table.

**Blast radius beyond this file.** The same regex is blind to *every* semantic alias glass-ui declares at `radius.css:33-45`: `rounded-card`, `rounded-panel`, `rounded-input`, `rounded-button`, `rounded-field`, `rounded-control`, `rounded-badge`, `rounded-dock`, `rounded-dock-card`, `rounded-tooltip`. Any consumer overriding any of them silently double-declares. **This is a producer defect surfaced by a consumer** — carry it to the glass-ui BH relay per the standing fond.

**A claim I withdrew under its own falsifier.** I first read this as a *squircle* loss: `glass-ui/src/styles/glass/squircle.css:40` scopes the Chrome-139 enhancement to the compound `.glass-floating.rounded-dialog`, so a merge that *dropped* `rounded-dialog` would silently strip it. The falsifier — read `cn`'s actual regex — showed `rounded-dialog` is **retained**, so the squircle still matches. The claim dies; recorded here because L-18 runs both ways and the near-miss is exactly the shape a lazier audit would have shipped.

**Falsifier for what remains.** Add `dialog` (or a general `[a-z-]+` tail) to the `rounded` alternation in `cn.ts`, or swap the hand-rolled dedupe for `tailwind-merge` with glass-ui's theme registered. Either resolves the pair. Note `web/package.json:34` *does* list `tailwind-merge@^3.6.0` — it is simply not what glass-ui's `cn` uses.

---

### C-9 · MAJOR · every identity parameter in this component's emit contract is named `hash` and carries a **slug**, contradicting the repo's own written §1 rule

**Provenance.**
- `web/src/lib/types.ts:211` — `content_hash: string; // dedup key, **never identity** (§1)`. `:208` — `slug: string;` is the identity.
- `GalleryCardModal.vue:26` — `like: [hash: string];`   `:28` — `"set-tier": [hash: string, tier: …];`
- `GalleryCardModal.vue:115,164,174` — all three call sites pass `entry.slug`.
- `GalleryView.vue:124` `handleLike(hash: string)`, `:132` `handleSetTier(hash: string, …)`, `:136` `handleDelete(hash: string)` — every body then calls a store method whose parameter is correctly named `slug` (`gallery.ts:138,150,189,201`).
- The mis-naming is systemic on the client side: `likedHashes` (`GalleryView.vue:45`), `viewedHashes` (`:118`), `selectedHashes` (`:150`), `pendingBatch.hashes` (`:406-414`) — all Sets/arrays of slugs.

**Failure scenario.** Not a runtime break today — the store re-names correctly at the boundary. It is a **contract-integrity** defect: the file's public interface advertises a hash where the API demands a slug, and `content_hash` *is* a real, distinct, adjacent field on the same object (`types.ts:211`). Any future reader wiring a new emit consumer has a 50/50 shot at reaching for `entry.content_hash`, which the server will reject as a 404 — and the admin routes it feeds (`admin.py:161-185`, ETag-guarded) will fail closed with an opaque error.

**Falsifier.** Rename the two emit parameters to `slug` at `:26,:28`; nothing else changes. Or show that the API accepts a `content_hash` at `PATCH /api/admin/visualizations/{slug}/tier` — `admin.py:164` binds `slug: str` and `:183` filters on the slug field, so it does not.

**Carry.** F.W5, alongside R6-8. R6-8's lesson was that an operation record embedding client back-references cannot attribute a defect to one side of the seam; this is the vocabulary twin — a client seam whose *nouns* disagree with the operation's nouns is equally un-attributable.

---

## §3 — MINOR

### C-10 · MINOR · `:class="{ active: … }"` on both tier buttons is a dead binding

`:162` and `:172` bind `active`. The scoped block styles `.tier-btn` (`:238`), `.tier-btn:hover` (`:244`), and `.tier-btn[aria-pressed="true"]` (`:245-248`) — **there is no `.active` rule anywhere in the file**, nor in `style.css`, nor in glass-ui. The state is projected twice (once dead, once live) and only the attribute selector does anything.

*Contrast, same file:* `:113` binds `liked` and `:230-233` **does** style `.like-btn.liked`. The author used the class-hook idiom correctly ten lines earlier, then switched to an attribute hook and left the class binding behind.

**Falsifier.** A `.tier-btn.active` or `.active` rule reachable by this element. `grep -n "\.active" GalleryCardModal.vue` → only the two `:class` bindings. `grep -rn "\.active" web/src/style.css` → none.

### C-11 · MINOR · `p-0` + the primitive's built-in close button = an unplated X over a user image that scrolls away

`:73` passes `p-0`, defeating `DialogContent`'s base `p-6`, so the `aspect-[16/10]` image frame at `:77` runs edge to edge. `DialogContent` defaults `showClose: true` (`glass-ui/dist/DialogContent-DDE6pQBU.js`, `showClose: { type: Boolean, default: !0 }`) and renders `<DialogClose class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 …">` with a 16 px X in `currentColor`. Two consequences:
1. That X lands at 1 rem/1 rem — **inside the image**, with no scrim, at 70 % opacity, over arbitrary user-uploaded content. (Contrast the component's own tier badge at `:86`, which is at `top-2 left-2` and *does* carry `backdrop-blur-sm bg-background/70`. The author plated their own overlay and not the primitive's.) Contrast against a specific image is `UNPROVEN-NEEDS-LIVE`; the unplated geometry is static.
2. `:73` also passes `overflow-y-auto` on the same element that hosts the absolutely-positioned close. An absolutely-positioned child of a scroll container scrolls with the content — so on a viewport where the card exceeds `max-h-[90vh]`, **scrolling to the admin controls scrolls the close button off the top**.

**Falsifier.** Pass `:show-close="false"` and compose a plated dismiss, or move `overflow-y-auto` to the inner `:75` wrapper so the close stays pinned. Neither is done. Note that Escape and outside-click still dismiss (reka-ui), so this is degradation, not entrapment — hence MINOR.

### C-12 · MINOR · `timeAgo` ×5 in one directory, in two behaviourally different variants; `basisLabels` duplicated verbatim

`timeAgo` is defined five times under `web/src/components/visualization/gallery/`: `GalleryCard.vue:53`, `AdminFlaggedPanel.vue:137`, `AdminUserList.vue:223`, `GalleryDraftsSection.vue:28`, `GalleryCardModal.vue:58`. They are **not** all equivalent — `AdminFlaggedPanel`/`AdminUserList` omit the `if (m < 1) return "just now"` branch and render **"0m ago"** for a fresh timestamp, while the other three say "just now". Same directory, same concept, two answers.

`basisLabels` is worse: `GalleryCardModal.vue:41-56` is **byte-identical** to `GalleryCard.vue:36-50` — the same `startsWith("fourier")` key-folding, the same `Epicycles`/`Series` special-casing, the same `.filter(Boolean) as …` cast. R3-12 already books *"`GalleryCard` basisLabels"* among the seven duplicated open-family rows that make any instance denominator over-count by 20 %; this is the twin that makes it a pair.

**Falsifier.** A shared `web/src/lib/` (or `gallery/lib/`) export for either. `grep -rn "export function timeAgo\|export function basisLabels" web/src` → nothing.

### C-13 · MINOR · `.filter(Boolean) as {…}[]` is a cast where a predicate belongs

`:55` — under `strict`, `Array<X|null>.filter(Boolean)` still types as `(X|null)[]`, so the author reached for `as`. The correct idiom is `.filter((x): x is X => x !== null)`, which the compiler verifies. The cast is load-bearing (`b.color`, `b.icon`, `b.label` are all dereferenced at `:131-138`), so a future refactor that widens the map's return silently keeps compiling.

**Falsifier.** Any type predicate in the chain, or a `tsconfig` setting that makes `filter(Boolean)` narrowing. `web/package.json:44` pins `typescript@^6.0.3`; no such narrowing exists.

---

## §4 — INFO

### C-14 · INFO · [cross-repo carry, value.js side] the F.W2 migration has a silent-wrong-answer trap in `color2`

Recommending value.js as the cure for C-4 obliges naming the trap. Executed against the installed `@mkbabb/value.js@0.13.0`:

```
color2(new OKLCHColor(0.579, 0.201, 30.4, 1), "rgb")
    → { r: 0.3256, g: 0.5389, b: 0.3242 }      ← a GREEN. No throw.
colorUnit2(parseCSSValue("oklch(0.579 0.201 30.4)"), "rgb")
    → { r: 0.8433, g: 0.2084, b: 0.1372 }      ← the RED. Correct.
```
Hand-computed ground truth (OKLab → linear sRGB → gamma, by the standard matrices): `r 0.84335 g 0.20862 b 0.13727`. **`colorUnit2` is exact to four places; `color2` on a directly-constructed `OKLCHColor` is a different hue entirely.**

Root cause: `color2` operates on **[0,1]-normalised** components, while the `OKLCHColor` constructor is a bare field-setter with no normalisation and no range validation. `normalizeColor(new OKLCHColor(0.579, 0.201, 30.4, 1))` → `{l: 0.579, c: 0.402, h: 0.0844}`, and `color2` on *that* returns the correct red. The constructor accepts values that are perfectly in-range per `COLOR_SPACE_RANGES.oklch` (`c ∈ [0, 0.5]`, `h ∈ [0, 360]`) and yields a wrong colour rather than an error.

**Migration prescription for F.W2, then:** `colorUnit2(parseCSSValue(raw), "rgb")` — never `color2` over a hand-constructed `Color`. Verified as covering *both* shipped token shapes, including the `light-dark()` wrapper:
```
parseCSSValue("light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))")
    → FunctionValue{ name: "light-dark", values: [OKLCHColor, OKLCHColor] }
```
i.e. value.js 0.13.0 already parses the exact strings on which `cssVarToHex` returns `#888888`. The 117-line hand-rolled file (`colors.ts:22-117`) is fully subsumable, matching W.L5 (`lane-docs.md:474`) — with the entry point pinned.

**Falsifier.** Show `color2` normalising internally, or `OKLCHColor` validating/normalising its constructor arguments. Both probes above are the falsifier, run.

### C-15 · INFO · the modal's only API call is unauthenticated and publicly cacheable

`:79` → `api/routers/images.py:168-209`. `GET /{imageSlug}/overlay` takes no session, performs **no visibility check** against the owning visualization, and returns `Cache-Control: public, max-age=86400`. A `draft` or `unlisted` visualization's source image is world-readable to anyone holding the image slug, and is then cached by every intermediary for a day. This is the R3-7b family (`securityGate: RED_0_OF_45`) made concrete at a leaf. **Falsifier.** A `resolve_session` / visibility guard in `get_image_overlay` — `:169-178` goes straight from the path parameter to `get_image_asset` to bytes.

### C-16 · INFO · five runtime-imported packages are declared as `devDependencies`

`:10-16` imports `lucide-vue-next` — declared at `web/package.json:38`, in **`devDependencies`**. The same holds for `reka-ui` (`:39`, reached through every glass-ui primitive this file mounts), `clsx`, `class-variance-authority`, `tailwind-merge`. Defensible for a `private: true` app bundled to static assets; still a misdeclaration that makes the dependency graph lie about what ships. Note the CENSUS pin row (`CENSUS-2026-08-03.md:37`) audits `dependencies` only.

### C-17 · INFO · dead `@reference "tailwindcss"` at `:198`

The scoped block uses `color-mix`, `var()`, and plain properties — **no `@apply`, no `theme()`**. The `@reference` import is therefore inert, and in Tailwind v4 it forces a theme re-parse per SFC style block at build time (cost `UNPROVEN-NEEDS-LIVE`; no build was run). Not an outlier: **7 of 12** gallery SFCs carry a `@reference` with zero `@apply` (only `GalleryCard.vue` and `GallerySearchBar.vue` actually use it). Recorded as a house tic, not a component fault. **Falsifier.** An `@apply` or `theme()` anywhere in `:197-261` — there is none.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · the `<Dialog>` re-point is real, complete, and has outrun the documentation

`:31-35` claims the hand-rolled `Teleport` + `Transition` + Escape listener was retired for the glass-ui primitive. **The claim is true and the file is clean.** `grep -n "Teleport\|Transition\|keydown\|addEventListener\|onUnmounted" GalleryCardModal.vue` → zero hits across all 261 lines. The component now inherits `role="dialog"`, `aria-modal`, focus trap, Escape-close and return-focus from reka-ui, and its motion from `popover-animate` — and `:217-219` records the retirement of the bespoke `.modal-enter/leave` classes rather than leaving them to rot.

Two independent confirmations that this is genuine and not a comment: (a) `web/DESIGN.md:31` still reads `- [ ] Replace custom Teleport modals (ExportModal, GalleryCardModal) with glass-ui Dialog/DialogContent (A.W3 territory).` — **the file finished the migration the roadmap still lists as open**, exactly as `audit/fourier-components/ExportModal/challenge-C-consumption.md:297-301` observed; (b) `R3-11` / `X-6` independently enumerate the tree's Teleports as *exactly two* — `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105` — and this file is in neither.

**Falsifier.** A `<Teleport>`, a `<Transition>`, or a manual Escape handler in the file. None.

### S-2 · uniform deep-subpath imports — 3/3

`:3-5` import from `@mkbabb/glass-ui/badge`, `/button`, `/dialog` — never the root barrel. The sibling `GalleryCard.vue` mixes: `:3` `/button`, `:4` `/badge`, but `:5` `import { Checkbox } from "@mkbabb/glass-ui"` — pulling the whole barrel in for one primitive. glass-ui's `package.json` declares per-component `typesVersions`/exports precisely so subpaths tree-shake; this file uses that surface as designed, and its immediate neighbour does not.

**Falsifier.** Any root-barrel `from "@mkbabb/glass-ui"` in this file. None.

### S-3 · the `--pill-c` projection is the correct one-variable-three-channels idiom

`:135` passes a **single** inline custom property, and `:207-211` derives three channels from it:
```
.basis-tint {
    background:    color-mix(in srgb, var(--pill-c) 12%, transparent);
    border-color:  color-mix(in srgb, var(--pill-c) 30%, transparent);
    color:         var(--pill-c);
}
```
This is right on four counts: one inline write instead of three; the derived alphas live in CSS where they are themeable rather than baked into a JS `rgba()`; the custom property crosses the scoped-CSS boundary onto the child `<Badge>`'s root, which a scoped class alone could not do for arbitrary values; and `hexToRgba` (`colors.ts:101-107`) — one of the very hand-rolled arms W.L5 marks for deletion — is **not** reached. The component's tint path needs no migration at all.

**Falsifier.** Three inline style properties on `:135`, or a `hexToRgba(...)` call, or hard-coded `rgba()` in the scoped block. None.

### S-4 · all three toggles carry `aria-pressed` — the markup is right even where the data is not

`:114` (like), `:163` (Featured), `:173` (Saved). Vue emits `aria-pressed="false"` rather than dropping the attribute, so the toggle role is correctly announced in both states. Across the gallery directory this is not universal — `GalleryCard.vue:160,169` renders the same two tier actions as bare icon buttons with **no** `aria-pressed`. The modal is the more accessible of the two surfaces on exactly the axis it shares with its sibling.

**Caveat, stated so the superlative is honest.** The *values* those three attributes report are unreliable — `isLiked` is a one-way latch (C-1) and both tier flags are read off an orphaned object (C-2). The markup contract is right; the data feeding it is the defect. Fixing C-1/C-2 makes this superlative load-bearing rather than decorative.

**Falsifier.** Any of the three missing `aria-pressed`, or an `aria-pressed` on a non-toggle control in the file.

---

## §6 — corpus reconciliation

| Corpus row | Disposition here |
|---|---|
| `lane-docs.md:400-401` (`cssVarToHex` four arms, no `oklch()`, `#888888` fallthrough) | **FOLDED + EXECUTED** → C-4. Replayed against the five real token strings; adds the `--viz-amber` accidental-survivor mechanism. |
| `lane-docs.md:474` (W.L5 — delete `colors.ts:22-117`, NOT EXECUTED) | **FOLDED** → C-4, C-14. C-14 pins the correct value.js entry point (`colorUnit2 ∘ parseCSSValue`) and names the `color2` trap the migration would otherwise hit. |
| `App/challenge-D-design.md:98` (`#888888` failure scenario, names `GalleryCardModal.vue:150`) | **FOLDED** → C-4. Confirmed at the cited line. |
| `DarkModeToggle/challenge-C-consumption.md:220` (`basis-display.ts:1,4-6` "obeys"; DarkModeToggle is "the **only**" freezing surface) | **CONTRADICTED** → C-5. `basis-display.ts` reads the reactive at module-eval and copies primitives; it is a second freezing surface, and the one this modal's pills depend on. |
| `ExportModal/challenge-C-consumption.md:186` (ExportModal + GalleryCardModal are the two title-less Dialog outliers) | **FOLDED + EXTENDED** → C-6. Adds the reka-ui `useWarning` mechanism, the unconditional dangling `aria-labelledby`, and the threefold e2e blind spot. |
| `ExportModal/challenge-C-consumption.md:283` (this file's `computed({get:()=>true,…})` always-open trick, D-5/D-18) | **CONFIRMED at `:36-39`.** Out of scope for axis C (it is a design-idiom divergence, not a consumption defect) — noted so the row is not double-counted. |
| `ExportModal/challenge-C-consumption.md:297-301` (`DESIGN.md:31` is stale for both named files) | **CONFIRMED and re-used** → S-1, as positive evidence. |
| `ExportModal/challenge-D-design.md:210-235` (`cm-serif` → undeclared `--font-serif-math`) | **FOLDED + EXTENDED** → C-7. Three carrier sites here, not one; plus the independent `fourier-f` → unloaded-Jakarta break. |
| `R3-7c` (36 client edges / 9 gap operations) | **EXTENDED** → C-1. The inverse gap — a client affordance with **no** operation — is not counted by that denominator. |
| `R3-7b` (`securityGate: RED_0_OF_45`) | **INSTANTIATED** → C-15 at this component's one API leaf. |
| `R3-12` (7 duplicated open-family rows incl. "GalleryCard basisLabels") | **PAIRED** → C-12. This file holds the byte-identical twin. |
| `R6-8` (operation records embedding client back-references defeat attribution) | **VOCABULARY TWIN** → C-9. |
| `CENSUS-2026-08-03.md:38` (value.js = 5 imports / 4 files, easing-only, all bare-root) | **CONSISTENT.** This file is in none of the four; it consumes value.js at zero sites. The `colors.ts` arms are the *absence* the census's F.W2 row (`:187-188`) targets. |
| `CENSUS-2026-08-03.md:37` (pins `^0.13.0`/0.13.0, `^4.0.0`/4.0.0, `^4.3.0`/4.3.0) | **CONFIRMED** from `web/package.json:19-23` and the installed manifests. |

---

## §7 — what F.W2 must do to this file, in dependency order

1. **C-2 first.** Every other data-correctness claim is downstream of the orphaned prop. Three lines at `GalleryView.vue:44`.
2. **C-1** — either ship the 46th operation or delete the affordance. A control that reports pressed state it cannot persist is worse than no control.
3. **C-5 before C-4.** Un-freezing `basis-display.ts` is a 7-line file; leaving it frozen while curing `cssVarToHex` would flip the divergence's polarity rather than close it (the pills would then be the stale ones against a newly-correct readout).
4. **C-4 / C-14** — `colorUnit2(parseCSSValue(raw), space)`, per the executed probe. This retires `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` whole (W.L5).
5. **C-3, C-6, C-10** — three small template edits, one of which (C-6) is the only one in this file an axe keystone would catch, and only if a keystone is written for it.
6. **C-8 relays to glass-ui** (BH inbox, standing fond): the `cn` merge table must know the design system's own semantic aliases, or every consumer override of a semantic radius silently double-declares.
