claude-opus-5[1m]

# CHALLENGE · `GalleryCard.vue` · AXIS C — CONSUMPTION

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GalleryCard.vue` (309 lines)
**Axis** how this component consumes value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · the fourier API
(45-op surface); props/emits contract quality; integration seams.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier;
the superlatives carry them too (L-18 both ways).
**Method** static + source-derived only. No browser tooling. Live-only claims are marked
`UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally** 14 defects · 2 BLOCKER · 7 MAJOR · 3 MINOR · 2 INFO · 5 SUPERLATIVES.
One further observation (I-1) is examined and **ruled NOT a defect** — it is excluded from the 14.

---

## §0 — The import surface, whole

Nine imports; three are first-party packages, five are local, one is `lucide-vue-next`.

| line | specifier | verdict |
|---|---|---|
| 3 | `@mkbabb/glass-ui/button` | live — `Button` used ×4 (135, 157, 166, 175) |
| 4 | `@mkbabb/glass-ui/badge` | live — `Badge` used ×1 (115) |
| 5 | `@mkbabb/glass-ui` (barrel) | live — `Checkbox` used ×1 (90). See **I-1** |
| 6 | `@/lib/types` — `Visualization` | live |
| 7 | `@/lib/api` — `thumbnailUrl` | live (100) — the **only** API-surface touch |
| 8 | `../lib/basis-display` | live (40) — the value.js/glass-ui colour seam. See **C-3/C-4** |
| 9 | `@/lib/colors` — `VIZ_COLORS` | **DEAD**. See **C-10** |
| 10 | `@/components/ui/PathPreview.vue` | **DEAD**. See **C-6** |
| 11-17 | `lucide-vue-next` ×5 | live |

**value.js consumption: zero, direct.** The card imports nothing from `@mkbabb/value.js`. Its entire
colour consumption is transitive, through `basis-display.ts → lib/colors.ts` — the hand-rolled arm named
in the F.W2 migration surface. That transitive path is where the two most consequential colour defects
live (C-3, C-4).

**keyframes.js consumption: zero.** Correctly so — see **S-4**.

**API consumption: 1 of 45 operations** (`thumbnailUrl`, a URL builder, not even a fetch). The card's
five emits are the real API coupling, resolved one and two levels up. That is where C-1 lands.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · The `like` affordance consumes an operation that does not exist

`GalleryCard.vue:135-145` renders a `Button` carrying `:aria-pressed="isLiked"` and `emit('like', entry.slug)`.
`aria-pressed` is the ARIA toggle contract: it asserts a persistent two-state control.

Trace the emit to ground:

- `GalleryCard.vue:141` → `GalleryInfiniteGrid.vue:38` → `GalleryView.vue:123` `handleLike(hash)`
- → `stores/gallery.ts:189-198`:

```ts
async function like(slug: string): Promise<{ liked: boolean; likes: number } | null> {
    const idx = entries.value.findIndex((e) => entrySlug(e) === slug);
    if (idx === -1) return null;
    const liked = true;                                   // ← hardcoded
    const likes = (entries.value[idx].likes ?? 0) + 1;    // ← monotonic
    entries.value[idx] = { ...entries.value[idx], likes };
    return { liked, likes };
}
```

No `apiFetch`. No network. `liked` is a literal `true`.

Corroboration that this is a *missing operation*, not a deliberate client-only feature:

- `grep -n "like" web/src/lib/api.ts` → **0 hits**. The 45-op client surface has no like operation.
- `grep -rn '@router\.(get|post|patch|put|delete)' api/routers/ -A1 | grep -i like` → **0 hits**.
  Nothing in the API serves a like verb. `api/routers/gallery.py` has **no routes at all**.
- The server nonetheless carries the *substrate*: `Visualization.likes: int = 0`
  (`api/models/visualization.py:152`), a `liked_ips` field projected out of four read paths
  (`visualizations.py:80,318,705`, `admin.py:87,555`, `gallery.py:34,58`), a `likes` sort key
  (`api/lib/crud/cursors.py:17,22`), and a dedicated compound index
  (`api/services/database.py:111` — `[("visibility",1),("likes",-1),("_id",-1)]`).
  A like feature was designed to the storage layer and the write verb was never built.
- The UI *ships the sort*: `GallerySearchBar.vue:16` offers `sort: "newest" | "views" | "likes"`.
  Sorting the gallery by "likes" therefore orders an all-zero column.

**Consequences, all source-derivable.** (a) The heart never persists — the increment is discarded by the
next `resetAndFetch()`, which `setTier` (`gallery.ts:141`) and `deleteEntry` (`gallery.ts:154`) both call
unconditionally, and by any reload. (b) There is no un-like path: `liked` is `true` forever, so
`GalleryView.vue:128`'s `result.liked ? s.add(hash) : s.delete(hash)` can only ever add.
Re-clicking a liked heart increments again — a user can drive the visible count arbitrarily high.
(c) `aria-pressed` announces a persistent state to assistive tech that no store or server holds.

**Falsifier.** Any of: a like route under a path I did not grep; a like call in a composable rather than
`lib/api.ts`; or a documented decision that likes are session-ephemeral. I grepped `api/routers/` for all
five HTTP verb decorators and the whole of `web/src/lib/api.ts` for the substring `like` — both empty. A
session-ephemeral design would still not explain the persisted `likes` column, the `liked_ips` field, the
`likes` sort key and the `(visibility, likes, _id)` index. The falsifier does not fire.

**Card's own share of the fault.** The card is the surface that *makes the promise* — `aria-pressed` plus
a live counter. A component may legitimately emit and let the owner decide; it may not advertise a
toggle-with-state contract it has no way to honour.

---

### C-2 · BLOCKER · `@keydown.space.prevent` on the host kills every nested glass-ui control

`GalleryCard.vue:70-80` lifts the card to the ARIA button-on-non-button pattern:

```
role="button" tabindex="0"
@click="emit('click')"
@keydown.enter.prevent="emit('click')"
@keydown.space.prevent="emit('click')"
```

Inside that host sit four native-button descendants:

- the reka `Checkbox` at line 90 — `reka-ui/dist/Checkbox/CheckboxRoot.js` defaults `as: "button"`, and
  the compiled source contains **no `keydown` handler at all** (grepped: zero `keydown` occurrences).
  It relies entirely on the platform's native button activation.
- three glass-ui `Button`s at 157/166/175 — `glass-ui/dist/button-BNDWhAZb.js` renders a native
  `"button"` element.

Keydown **bubbles**. A Space press with focus on the admin Delete button dispatches `keydown` on that
`<button>`, which bubbles to `.gallery-card`, where `.prevent` calls `preventDefault()`. Space activation
of a native `<button>` fires on keyup and is cancelled by `preventDefault()` on the keydown — this is the
platform behaviour the ARIA authoring practices explicitly warn about. So:

**Failure mode 1 (Space).** Pressing Space on the Crown / Bookmark / Trash2 admin buttons, or on the
multi-select Checkbox, performs **no** button action and instead opens the card modal. Admin curation and
batch-select are keyboard-unreachable via Space.

**Failure mode 2 (Enter).** Enter on a native `<button>` fires `click` on keydown. That click bubbles into
the `@click.stop` wrappers at lines 85-89 and 156, so the card does **not** open from the click — but the
card's own `@keydown.enter.prevent` still fires from the bubbled keydown, because the `.stop` guards are on
`click` only and have no `keydown` twin. Result: Enter on Delete both fires the delete emit **and** opens
the modal. Double-activation.

The `@click.stop` at 85-89 and 156 proves the author knew events had to be contained; the containment was
applied to exactly one of the two event families.

**Secondary, same root.** ARIA specifies `button` in the *Children Presentational: True* set. Placing four
interactive controls inside `role="button"` means conforming AT may flatten them out of the accessibility
tree entirely, independent of the keydown bug.

**Falsifier.** Any of: reka's `CheckboxRoot` calling `stopPropagation()` on keydown (it registers no
keydown listener — falsifier dead); glass-ui's `Button` stopping keydown (it renders a bare native
`button`, grep shows no keydown handler — dead); or Vue's `.space` modifier not matching (it matches
`key === ' '`). The `.prevent`-cancels-Space-activation mechanism is the one arm that is *behavioural*
rather than purely structural — the source proves the listener topology, and the cancellation is
well-specified platform behaviour. Marked `UNPROVEN-NEEDS-LIVE` for the exact per-engine keyup suppression
only; the double-activation arm (failure mode 2) is fully static and needs no live proof.

---

## §2 — MAJOR

### C-3 · MAJOR · `basisDisplay` snapshots `VIZ_COLORS` at module-eval, destroying its reactivity

`GalleryCard.vue:40` reads `basisDisplay[key]` and projects `cfg.color` into the pill as
`:style="{ '--pill-c': b.color }"` (line 121).

`components/visualization/lib/basis-display.ts:3-7`:

```ts
export const basisDisplay: Record<string, {icon: string; label: string; color: string}> = {
    fourier:   { icon: "ℱ", label: "Fourier",   color: VIZ_COLORS.fourier },
    chebyshev: { icon: "Tₙ", label: "Chebyshev", color: VIZ_COLORS.chebyshev },
    legendre:  { icon: "Pₙ", label: "Legendre",  color: VIZ_COLORS.legendre },
};
```

`VIZ_COLORS` is `reactive({...})` (`lib/colors.ts:77-87`) seeded with hardcoded literals
`#bf4040 / #3d72b8 / #9545b8`, and is rewritten by `resolveVizColors()` (`lib/colors.ts:90-96`), called
from `App.vue:11` `onMounted` and again from a `MutationObserver` on theme toggle (`App.vue:13`).

`basisDisplay` reads `.fourier` **once, at module evaluation**, and stores a plain `string` **copy**.
Module evaluation strictly precedes `onMounted`. The copy is therefore permanently `#bf4040` and is
inert to every subsequent `resolveVizColors()` — including the dark-mode toggle the whole mechanism exists
to serve.

The tree contains its own counter-example, in the same colour system: `useCoeffHover.ts:65` reads
`VIZ_COLORS.amber` **at render time**, with a comment (lines 60-64) explicitly documenting that a
module-time read would be premature — *"the canonical fallback used when `resolveVizColors` has not yet
run (mounted before paint)"*. The correct idiom is known here and not applied there.

**Blast radius beyond this card** — all six `basisDisplay` consumers inherit the freeze:
`GalleryCard.vue:40`, `GalleryCardModal.vue:45`, `GallerySearchBar.vue:31`, `BasisSelector.vue:139`,
`BasisCanvas.vue:251`, `canvas-drawing/labels.ts:30`.

**The split-brain this produces.** One semantic colour, three simultaneous values in one running app:

| consumer | mechanism | value |
|---|---|---|
| `GalleryCard.vue:121` (`--pill-c`) | `basisDisplay` snapshot | `#bf4040`, both themes, forever |
| `EditorControlsDock.vue:205,208` | CSS `var(--viz-fourier)` | glass-ui oklch, theme-correct |
| `BasisSelector.vue:176` (`--track-color`) | live `VIZ_COLORS.fourier` | `#888888` — see C-4 |

**Falsifier.** If some code reassigned `basisDisplay[k].color` after boot, or if the map were a getter /
`computed`, reactivity would survive. Grepped all 15 `basisDisplay` references tree-wide (`labels.ts`,
`BasisCanvas`, `BasisSelector`, `GallerySearchBar`, `GalleryCard`, `GalleryCardModal`,
`GalleryDraftsSection`): every one is a **read**. The object literal has no accessors. Falsifier dead.

---

### C-4 · MAJOR · `cssVarToHex` has no `oklch()` arm — every glass-ui 4.0.0 viz token resolves to `#888888`

This is the F.W2 value.js migration surface, stated at its sharpest.

`lib/colors.ts:22-54` `cssVarToHex()` parses exactly four shapes: leading `#`; `hsl(h,s%,l%)`;
a bare Tailwind-v3-era HSL triplet `"6 72% 49%"`; and `rgb(r,g,b)`. Anything else returns the literal
`"#888888"` (line 53).

glass-ui **4.0.0** ships every token this function is pointed at as `oklch()`:

```
glass-ui/dist/styles/tokens/color-radius.css:263  --viz-fourier:   oklch(0.579 0.201 30.4);
glass-ui/dist/styles/tokens/color-radius.css:264  --viz-chebyshev: oklch(0.484 0.163 265.5);
glass-ui/dist/styles/tokens/color-radius.css:265  --viz-legendre:  oklch(0.532 0.180 317.5);
glass-ui/dist/styles/tokens/dark-arm.css:113-115  (dark arm, also oklch)
glass-ui/dist/styles/tokens/light-dark.css:145-147 (light-dark(oklch,oklch) — a fifth unparsed shape)
```

Custom properties are **unregistered** here — glass-ui's only `@property` registrations are
progress/phase/ripple/specular/glass-level/ui-scale (`tokens/property-regs.css:2`), and
`tokens/light-dark.css:52-56` documents in prose that a `<color>` `@property` is deliberately *not* used.
An unregistered custom property's computed value is its token sequence, so
`getComputedStyle(root).getPropertyValue("--viz-fourier")` returns the string
`"oklch(0.579 0.201 30.4)"` — not an `rgb()` serialization. It matches none of the four arms.

So after boot: `VIZ_COLORS.fourier === VIZ_COLORS.chebyshev === VIZ_COLORS.legendre === "#888888"`.
Only `--viz-amber` survives, because fourier's own `style.css:120,125` happens to override it in `hsl()`.

`@mkbabb/value.js@0.13.0` is a **direct declared dependency** (`web/package.json:14`; `node_modules`
confirms `0.13.0` installed), and the tree **already imports it** four times for easings
(`lib/easings.ts:9,16`; `ConvergencePlot.vue:5`; `equation/lib/harmonics.ts:5`;
`useCurveTransition.ts:8`). A 96-line hand-rolled CSS colour parser that cannot read the design system's
own token format sits on top of an installed, already-imported colour library.

**The interlock — the reason C-3 and C-4 must be reported together.** At `GalleryCard` specifically,
C-3 *masks* C-4: because `basisDisplay` snapshots before `resolveVizColors()` runs, the pills carry the
hardcoded `#bf4040` rather than the `#888888` the resolver would install. **Curing C-3 alone turns every
basis pill grey.** They are one repair, not two. This is the single most important structural fact in
this challenge.

And even under the mask, the frozen literals are wrong: `#bf4040` is a mid-dark red, while glass-ui's dark
arm is `oklch(0.693 0.151 28.1)` — substantially lighter. In dark mode the pill wears a light-mode-weight
red against a dark plate, mismatching every sibling that reads the token through CSS.

**Falsifier.** If some engine serialized unregistered custom properties to `rgb()`, `cssVarToHex` would
work. That would contradict CSS Variables' computed-value rule, and glass-ui's own `light-dark.css:52-56`
prose asserts the opposite for exactly this reason. If `--viz-*` were redefined in fourier's `style.css`
in an `hsl()` form, the arm would hit — grepped: `style.css` defines **only** `--viz-amber` (lines 120,
125); `--viz-fourier`/`chebyshev`/`legendre`/`green` are never redefined. Falsifier dead.

---

### C-5 · MAJOR · The tier badge renders an empty circle for every un-curated entry

`GalleryCard.vue:149-152`:

```html
<div v-if="entry.tier !== 'normal'" class="flex items-center justify-center w-6 h-6 rounded-full" :data-tier="entry.tier">
    <Crown v-if="entry.tier === 'featured'" ... />
    <Bookmark v-else-if="entry.tier === 'saved'" ... />
</div>
```

`Visualization.tier` is **optional** — `web/src/lib/types.ts:232` `tier?: GalleryTier`. When it is
`undefined`, `undefined !== 'normal'` is `true`, the wrapper renders, and **neither** inner branch matches.
A bare 1.5rem circle appears in the footer.

`undefined` is the *normal* case, not an edge case:

- The backend `Visualization` pydantic model (`api/models/visualization.py`) has **no `tier` field** —
  grepped the whole file, zero hits — and closes with `model_config = ConfigDict(extra="forbid")`.
- `POST /api/visualizations` builds `viz = Visualization(...)` (`routers/visualizations.py:195`) and
  inserts `viz.model_dump()` (line ~213). The inserted document therefore has **no `tier` key**.
- `tier` is written *only* by admin curation: `routers/admin.py:183` (`set_tier`), `:432`, `:438`.
- The list read is `_public_doc(d)` (`routers/visualizations.py:80`) — a raw pass-through minus
  `_id`/`liked_ips`, no model coercion, no default injection.

So every visualization is served **without** `tier` until an admin touches it. The empty circle is the
default rendering for the gallery.

The same `undefined` also silently disables the card's tier styling: `:data-tier="entry.tier"` (line 75)
omits the attribute, so `.gallery-card[data-tier="featured"]` / `[data-tier="saved"]` (lines 228-236)
never match — which is correct-by-accident, but it means the *only* observable effect of the missing
default is the empty circle.

**Falsifier.** A migration or boot task backfilling `tier: "normal"`. `api/scripts/migrate_visualization.py:204`
carries only the comment *"counters and `tier` come from the gallery row **when present**"* — conditional,
and it covers migrated legacy rows only, never natively-created ones. `api/services/database.py` boot
creates indexes, not defaults. Falsifier does not fire.

**Correct guard.** `v-if="entry.tier === 'featured' || entry.tier === 'saved'"` — test for what you render,
not against one of three values in an optional field.

---

### C-6 · MAJOR · `PathPreview` is imported and never rendered — an orphaned component and a lost integration

`GalleryCard.vue:10` imports `PathPreview` from `@/components/ui/PathPreview.vue`. The identifier appears
**nowhere** in the template or script body.

`grep -rn "PathPreview" web/src` returns exactly **one** hit tree-wide: this dead import. `PathPreview.vue`
(69 lines, a self-contained SVG polyline renderer with `pathX`/`pathY`/`size`/`strokeWidth`/`strokeColor`/
`padding` props and a `<style scoped>` block) has **no live consumer anywhere in the application**. Its
sole reference is a binding that is never read.

Two costs:

1. **Bundle.** The SFC's `<style scoped>` (lines 64-69) compiles to a side-effect CSS import that Vite
   retains regardless of whether the JS binding shakes out. The `.path-preview` rule ships to every user.
   *(The JS half may or may not be shaken — I mark that arm `UNPROVEN-NEEDS-LIVE`; the CSS arm follows
   from Vite's default CSS side-effect treatment and needs no live proof.)*
2. **Signal — the larger cost.** The card renders a raster thumbnail (`thumbnailUrl(entry.image_slug)`,
   line 100) while `entry.contour_hash` — the vector path identity — sits unused on the entity
   (`types.ts:212`). An imported-but-unrendered `PathPreview` is the fossil of an intended vector-preview
   integration that was abandoned mid-wire. Every other integration in this card is annotated with its
   wave (`A.W2.e`, `A.W3.d`, `A.W5.c`, `D.W4.c`, `J.W4`); this one has no comment at all, which is what a
   forgotten line looks like.

**Why the build does not catch it.** `web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`
and **not** `noUnusedParameters`. `npm run build` is `vue-tsc -b && vite build` (`package.json:8`), so the
project's own type gate is structurally incapable of seeing either dead import.

**Falsifier.** If `PathPreview` were used in a slot, a dynamic `<component :is>`, or a render function, the
identifier would still have to appear. It appears zero times outside line 10. Falsifier dead. If the
intended severity is "harmless dead code", downgrade to MINOR — but the sole-importer-of-an-orphan fact
means deleting this line orphans a whole component, which is a finding either way.

---

### C-7 · MAJOR · The entire props/emits contract names its payloads `hash`; every payload is a slug

`GalleryCard.vue:19-32`:

```ts
defineProps<{ entry: Visualization; adminMode?: boolean; likedHashes?: Set<string>; selected?: boolean }>();
defineEmits<{
    click: [];
    like: [hash: string];
    "set-tier": [hash: string, tier: "featured" | "saved" | "normal"];
    delete: [hash: string];
    "toggle-select": [hash: string, checked: boolean];
}>();
```

Every actual payload is `entry.slug` — lines 94, 141, 162, 171, 180. The membership test is
`props.likedHashes?.has(props.entry.slug)` (line 34). Not one hash is ever passed.

This is not pedantry in *this* codebase. `web/src/lib/types.ts:210` annotates the sibling field in the
very same interface:

```ts
content_hash: string; // dedup key, never identity (§1)
```

and the store the emits terminate in says the opposite of the emit names
(`stores/gallery.ts:136-137`): *"`slug` is the converged visualization identity (the value the gallery
cards emit from their `:key`)"*. The contract's vocabulary contradicts both the type file's §1 precept
and its own consumer's documentation.

**Concrete failure.** `likedHashes` is a `Set<string>` with no branding. A future caller who reads the
prop name and populates it from `content_hash` — the field the codebase actually calls a hash — gets a
silent, permanent, type-safe `false` from `Set.has`. No error, no warning; the heart just never lights.
This is the exact failure class §1 exists to prevent.

**Falsifier.** If `slug` and `content_hash` were the same value, the naming would be harmless. They are
distinct fields on the same interface (`types.ts:208` vs `:210`), and `content_hash` is derived by
`_content_hash()` over `{image_slug, contour_hash, sorted(active_bases), n_harmonics}`
(`routers/visualizations.py:83-97`) — a sha256, deliberately **not** the identity. Falsifier dead.

Cheapest cure: rename to `slug` / `likedSlugs`; better, brand the type
(`type VizSlug = string & {__brand:'VizSlug'}`) as value.js did with `UserSlug`/`SessionToken` at L.W2.

---

### C-8 · MAJOR · `timeAgo` is byte-duplicated five times, and parses a wire format that is not ISO 8601

**(a) Duplication.** `GalleryCard.vue:53-61` defines `timeAgo`. Byte-identical or near-identical copies:

| file:line | signature |
|---|---|
| `GalleryCard.vue:53` | `(iso: string)` |
| `GalleryCardModal.vue:58` | `(iso: string)` — **byte-identical** to GalleryCard's |
| `GalleryDraftsSection.vue:28` | `(iso: string)` |
| `AdminUserList.vue:223` | `(iso: string)` |
| `AdminFlaggedPanel.vue:137` | `(iso: string \| null)` — **already diverged** |

Five copies in one directory, and the signatures have **already** drifted: `AdminFlaggedPanel`'s accepts
`null`, the other four do not. This is a live divergence, not a hypothetical one.

**(b) The wire format.** `created_at` reaches the client through
`json.dumps(body, default=str)` (`routers/visualizations.py:337`). The document's `created_at` is a BSON
date read back as a Python `datetime`, so `default=str` serializes via `str(datetime)`, which produces a
**space**-separated string:

```
2026-08-06 12:34:56.789012+00:00      ← str(datetime)  (space)
2026-08-06T12:34:56.789012+00:00      ← .isoformat()   (T)  — what the parameter name `iso` asserts
```

`new Date(iso)` on the space form does not match the ECMA-262 §21.4.3.2 Date Time String Format, so parsing
falls to *implementation-specific heuristics* — explicitly unspecified. When a heuristic declines, the
result is `NaN` and the card renders **`NaNd ago`**, since none of the `<1 / <60 / <24` guards catch `NaN`
(all comparisons against `NaN` are false, so control reaches the final `return`).

The parameter is literally named `iso` and the value is not ISO. Every one of the five copies inherits it.

**Falsifier.** If `_public_doc` ran the document through a pydantic serializer, the output would be
`isoformat()`. It does not — `routers/visualizations.py:78-80` is a raw dict comprehension, and line 337
hands the result straight to `json.dumps(..., default=str)`. The per-engine outcome (which browsers'
heuristics accept the space form) is `UNPROVEN-NEEDS-LIVE`; the *spec-undefined* status of the input is
fully static and stands on its own.

---

### C-9 · MAJOR · `:key="b.label"` collides because `active_bases` is an unconstrained `list[str]`

`GalleryCard.vue:36-51` maps `active_bases` to pills, collapsing every `fourier*` member to one config:

```ts
const key = b.startsWith("fourier") ? "fourier" : b;
const cfg = basisDisplay[key];
const label = b === "fourier-epicycles" ? "Epicycles"
            : b === "fourier-series"    ? "Series"
            : cfg.label;                                 // ← every other fourier* → "Fourier"
```

and keys the `v-for` on the label (line 117: `:key="b.label"`).

Only two `fourier*` suffixes are special-cased. Every other member starting with `"fourier"` — including
plain `"fourier"` — falls through to `cfg.label === "Fourier"`. Two such members in one `active_bases`
therefore produce two badges with the **same** `:key`, which is a Vue duplicate-key warning and a patch
hazard on reorder.

The server does not prevent it. `api/models/visualization.py:186`:

```python
active_bases: list[str] = Field(min_length=1, max_length=16)
```

`list[str]` — no `Literal`, no enum, no validator. Any 16 arbitrary strings are accepted on
`POST /api/visualizations`. `["fourier", "fourier-x"]` is a legal payload and produces the collision. The
identical shape recurs on the PATCH body (`:280`).

Sixteen members is also more than the single `flex-wrap` row at line 114 was laid out for
`UNPROVEN-NEEDS-LIVE`.

**Corpus fold.** The adjudicated intake row **R3-12**
(`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:86`, verdict TRUE / ADOPT-AS-FACT) names
*"`GalleryCard` basisLabels"* as one of the seven duplicated open-family records that collapse 35 rows to
28. **This finding supplies the mechanism behind that row**: the duplication is not a census artefact, it
is `basisDisplay`'s `startsWith("fourier")` many-to-one collapse re-keyed on a non-unique label. I neither
re-derive nor contradict R3-12 — I explain it.

**Falsifier.** A validator elsewhere in the write path. Grepped `active_bases` across
`api/models/visualization.py` (lines 75, 125, 186, 241, 280): five declarations, all `list[str]`, zero
`Literal`, zero `field_validator`. `web/src/lib/bases.ts` dispatches on three names but is a *client
evaluator*, not a write gate. Falsifier dead.

---

## §3 — MINOR

### C-10 · MINOR · Dead `VIZ_COLORS` import

`GalleryCard.vue:9` imports `VIZ_COLORS`; it appears zero further times in the file (grepped: line 9 only).
The card's colours all arrive pre-resolved through `basisDisplay`. Same root cause as C-6's invisibility:
`tsconfig.json` omits `noUnusedLocals`, so `vue-tsc -b` cannot flag it.
*Falsifier:* a template reference — there is none.

### C-11 · MINOR · `alt` and `aria-label` are built from a machine slug

`:alt="entry.image_slug"` (line 101) and `:aria-label="\`Open ${entry.image_slug}\`"` (line 74) render a
four-word generated slug. A screen-reader user hears the slug, not a description of the image. The entity
carries better material: `title?: string | null` (`types.ts:227`, server-side
`Field(max_length=200)` at `api/models/visualization.py:132`) and `description?: string | null`
(`types.ts:228`). Neither is consulted.
*Falsifier:* if `title` were unpopulated in practice the point would be moot — see I-2, which establishes
that it is unpopulated **and** shows that fixing this requires fixing the write path first. That is why
this is MINOR here and INFO there, rather than MAJOR in either place.

### C-12 · MINOR · `timeAgo` never ticks, and is hardcoded English

`timeAgo` is a plain function called from the template (line 110), so it re-evaluates on re-render — but
nothing schedules a re-render. A card sitting in a viewport shows `2m ago` indefinitely. `Intl.RelativeTimeFormat`
would give both correct localization and a canonical vocabulary; the tree already targets `ES2022` + `DOM`
(`tsconfig.json`), so it is available.
*Falsifier:* if the owner re-fetched on an interval the timestamps would refresh — `stores/gallery.ts` has
no interval; refetch is user-triggered (`resetAndFetch` on filter/sort change, `GalleryView.vue:111-114`).

---

## §4 — INFO (defects, at INFO severity)

### I-2 · INFO · The card's entity consumption is a strict subset of a mostly-dormant contract

`Visualization` (`types.ts:207-239`) carries 26 fields. The card renders **six**: `image_slug`, `created_at`,
`active_bases`, `views`, `likes`, `tier` — plus `slug` as an emit payload.

Never rendered anywhere in `web/src/components/visualization/gallery/`: `title`, `description`, `tags`,
`palette_slug`, `fork_of`, `fork_of_hash`, `fork_count`, `version_count`, `set_hash`, `owner_slug`,
`visibility`, `pinned`. Grep for `.title` across the whole gallery directory: **zero hits**.

They are dormant on the **write** side too. `VisualizationPatch` (`types.ts:256-262`) declares
`visibility`/`title`/`description`/`tags`/`palette_slug`, and both `updateVisualization` call sites send
**only** `{ visibility }` — `stores/gallery.ts:224-228` (publish) and `stores/workspace.ts:378-382`
(setVisibility). No client code anywhere writes a title.

The fork substrate is the sharpest instance: `types.ts:213-222` documents it as *"the fork substrate
fourier inherits from value.js's `Palette` shape"*, the API serves a `most-forked` sort key
(`api/lib/crud/cursors.py:17`), and `fork_count` is invisible in the only component that renders list
results — so `most-forked` would order by a quantity the user cannot see. The client does not even offer
that sort: `GallerySearchBar.vue:16` exposes `"newest" | "views" | "likes"` against a server `SortKey` of
`"newest" | "popular" | "most-forked" | "views" | "likes"` — **two of five sort operations unreachable**.

**Corpus fold.** Intake row **R3-7c** (`lane-fourier-r3-r6.md:81`, TRUE, CARRY→F.W5) books *"36 client
edges, nine gaps"* of 45 operations, cross-checked against fourier's own `docs/tranches/M/M.md §7`
*"inv-15 consumer gap (7 endpoints, 0 callers)"*. This card is a terminal leaf of that gap, and it adds a
shape the edge count does not capture: **field-level dormancy inside operations that are wired.** The
`PATCH` edge is live; four of its five fields are dead. An operation-level census scores that edge green.

**Card's own share.** Small and honest: a card cannot render a title nothing can set. Filed at INFO for
the card, flagged for the wave because the *seam* is where it must be repaired.

### I-3 · INFO · The card is the sole read path for two write-only server capabilities

Following from C-1 and I-2: `likes` has a persisted column, a sort key and a dedicated compound index
(`api/services/database.py:111`) with no write verb; `fork_count` has a sort key with no reader. In both
cases `GalleryCard` is the component where the absence becomes user-visible.

This is the client↔operation coupling that intake row **R6-8** (`lane-fourier-r3-r6.md:142`, TRUE +
ADOPT-AS-FACT + CARRY→F.W5) rules on: *"an API-operation model that embeds derived client back-references
cannot attribute a defect to one side of the seam."* **This challenge supplies the reciprocal case.** R6-8's
C31 showed a client edit that mutates the operation leaf because the operation record embeds
`"clients": ["client:updateVisualization"]`. Here the traffic runs the other way: `like` and `most-forked`
are **operations with no client at all**, so they are invisible to any derivation keyed on
client↔operation joins — the leaf is empty rather than ambiguous, which is R5-7's empty-leaf failure mode
transposed from template loops onto API operations. F.W5's shared-provenance contract needs to distinguish
*no client edge* from *no operation* or it will score both as clean.

---

## §5 — Examined and ruled NOT a defect (excluded from the 14)

### I-1 · `Checkbox` from the barrel while `Button`/`Badge` come from subpaths

`GalleryCard.vue:3-5` mixes import depths — `@mkbabb/glass-ui/button`, `@mkbabb/glass-ui/badge`, then the
bare barrel `@mkbabb/glass-ui` for `Checkbox`. `formation/fourier/lane-frontend.md:338-340` records these
three lines verbatim. The obvious reading is consumer sloppiness costing a whole-index pull.

**That reading is wrong.** Reading glass-ui 4.0.0's `exports` map: `./button` and `./badge` exist;
**`./checkbox` does not**. The component ships (`dist/components/ui/checkbox/Checkbox.vue.d.ts` is
present) but is reachable only through the root entry. The barrel import is **forced**.

Correct attribution: an **upstream export-map gap in glass-ui 4.0.0**, relayed per the standing BH/BI
relay edict — not a fourier consumption defect. Recorded here because a consumption audit that stopped at
the three import lines would have filed a confident false positive, and L-18 obliges the challenge to be
falsifiable in the direction that costs it a finding.

---

## §6 — SUPERLATIVES (each with its falsifier)

### S-1 · The `content-visibility` integration is the best cross-package claim in the file

`GalleryCard.vue:199-206` applies glass-ui's `.deferred-section` utility and sets
`--deferred-section-size: 17rem`, with a comment deriving the estimate from the card's own geometry
(4:3 thumbnail ≈ 11rem at a ~15rem cell + meta footer) and asserting that
*"`contain-intrinsic-size: auto …` caches the real size after first paint (no scroll-jump)"*, with an
explicit no-support floor citing `inv-29`.

**Verified against the shipped utility.** `glass-ui/dist/styles/utilities/base.css:477-480`:

```css
.deferred-section {
    content-visibility: auto;
    contain-intrinsic-size: auto var(--deferred-section-size, 30rem);
}
```

The `auto` keyword is genuinely there, so the caching semantics the comment claims are real, not
aspirational; the token name and its 30rem default are correct; and 17rem is a defensible estimate for a
14rem-minimum grid cell (`GalleryInfiniteGrid.vue:29`, `minmax(14rem, 1fr)`): 4:3 image ≈ 10.5rem +
header ≈ 2rem + pills ≈ 1.5rem + footer ≈ 2.2rem ≈ 16.2rem. Under-estimating by ~0.8rem is the correct
direction of error.

*Falsifier:* if glass-ui shipped `contain-intrinsic-size` **without** `auto`, the "no scroll-jump" claim
would be false and this would be a MAJOR mis-citation. It ships with `auto`. The falsifier fires against
the defect reading, not against the superlative.

### S-2 · `:data-selected="selected || undefined"` — the correct attribute-omission idiom

Line 76. Vue omits an attribute bound to `undefined`; binding `false` would render `data-selected="false"`,
which the presence selector `.gallery-card[data-selected]` (line 221) would match, inverting the styling.
The one-token guard makes the presence selector correct.
*Falsifier:* if `selected` could be `0` or `""` the coercion would misfire — it is typed `boolean | undefined`
(line 23). Holds.

### S-3 · Reactivity through a `Set` prop is done correctly at the owner

`likedHashes: Set<string>` (line 22) read via `.has()` in a `computed` (line 34) is the idiom that usually
breaks, because in-place `Set` mutation does not retrigger a plain `ref`. The owner replaces rather than
mutates — `GalleryView.vue:127-129`:

```ts
const s = new Set(likedHashes.value);
result.liked ? s.add(hash) : s.delete(hash);
likedHashes.value = s;
```

*Falsifier:* an in-place `likedHashes.value.add(hash)` anywhere would break the chain. Grepped all
`likedHashes` sites (`GalleryView.vue:45,127,129,253,273,295,393`; the three card consumers) — the only
writes are the replacement above. Holds. *(That the mechanism is correct while the feature underneath it
is a fiction — C-1 — is the fact worth carrying: correctness at one altitude does not imply it at
another.)*

### S-4 · Correct restraint on keyframes.js

`@mkbabb/keyframes.js@^4.3.0` is a direct dependency, and the card uses **none** of it: `like-bounce`
(lines 298-302) is a 300ms three-stop CSS `@keyframes` with a `prefers-reduced-motion: reduce` guard
(304-308). That is the right instrument — keyframes.js is a JS interpolation engine, and reaching for it
here would have put a JS tick loop behind a 300ms scale bounce, forfeiting compositor animation. The tree's
own use of keyframes.js is correspondingly disciplined and lazy-loaded
(`useFourierMorph.ts:14,148` behind `loadAnimationEngine()`).
The comment (293-295) even self-declares the carry: *"`like-bounce` is a fourier-local keyframe (no
glass-ui shadow); CONSTELLATION carry candidate (P-tranche)"* — an honest under-consumption note rather
than a silent one.
*Falsifier:* if glass-ui already shipped a bounce utility, hand-rolling would be duplication. The comment
asserts "no glass-ui shadow"; nothing in `glass-ui/dist/styles/utilities/` contradicts it. Holds.

### S-5 · The documented cross-file focus-ring dependency is real

Lines 65-69 state that the card was lifted from a bare `<div @click>` to `role`+`tabindex`+`keydown`+
`aria-label`, and that *"Focus ring lands globally via `.gallery-card:focus-visible` in style.css."*
Verified: `web/src/style.css:139-142` defines exactly that rule with `outline: 2px solid var(--ring)`,
`outline-offset: 2px`, `border-radius: inherit`.
A comment pointing at another file's rule is normally where audits find rot; here the rule exists, matches
the selector, and uses the design-system `--ring` token rather than a literal.
*Falsifier:* absence of the rule would make the a11y remediation cosmetic-only. It is present. Holds.
*(Note the tension with C-2: the same remediation that got the focus ring right introduced the keydown
suppression. A11y lifts are not atomic.)*

---

## §7 — Arithmetic

| severity | ids | n |
|---|---|---|
| BLOCKER | C-1, C-2 | 2 |
| MAJOR | C-3, C-4, C-5, C-6, C-7, C-8, C-9 | 7 |
| MINOR | C-10, C-11, C-12 | 3 |
| INFO (defect) | I-2, I-3 | 2 |
| **defects** | | **14** |
| ruled NOT a defect | I-1 | (1, excluded) |
| SUPERLATIVE | S-1 … S-5 | 5 |

`UNPROVEN-NEEDS-LIVE` arms, for SS-13: C-2 (per-engine Space-keyup suppression only — the double-activation
arm is static); C-6 (JS-half tree-shaking only — the CSS arm is static); C-8 (per-engine `Date` heuristics
only — the spec-undefined input is static); C-9 (16-pill wrap overflow).

## §8 — The single repair that matters

**C-3 and C-4 are one repair.** Make `basisDisplay` a `computed`/getter over `VIZ_COLORS` **and** give
`lib/colors.ts` an `oklch()` path — from `@mkbabb/value.js@0.13.0`, already installed and already imported
four times in this tree. Doing the first alone turns every basis pill in the application `#888888`.

That is the F.W2 migration surface, stated concretely: a 96-line hand-rolled CSS-colour parser that cannot
read its own design system's token format, load-bearing for six components, sitting directly on top of an
unused first-party colour library.
