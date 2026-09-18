# CHALLENGE-L — library structure · `PaletteCardSkeleton.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. Seat is declared, not inherited.

- **Axis:** CHALLENGE-L (library structure — module boundaries, ownership, dependency direction,
  public surface)
- **Subject:** `demo/palettes/browser/card/PaletteCardSkeleton.vue` (125 lines; area *palettes*)
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- **Verdict:** **DEFECTIVE** — 1 BLOCKER, 4 MAJOR, 3 MINOR, 2 INFO
- **Strongest defect:** the component's entire two-register design is addressed at a
  `@mkbabb/glass-ui` API surface that **does not exist in the pinned `^7.0.0`**. Measured: both
  registers render pixel-identical, and every custom property the component writes is read by
  nothing.

---

## 0. What this component imports, and where it lands

One import:

```ts
// demo/palettes/browser/card/PaletteCardSkeleton.vue:85
import { Skeleton } from "../../../ui/skeleton";
```

Traced to its home:

```
demo/palettes/browser/card/PaletteCardSkeleton.vue
  → ../../../ui/skeleton            = demo/ui/skeleton/index.ts
demo/ui/skeleton/index.ts (entire file, 1 line):
  export { Skeleton } from "@mkbabb/glass-ui";
```

- **No `@mkbabb/value.js` import at all.** Negative-proof for the "deep-path into `src/`" limb of
  this axis: this component never touches the library, so it cannot false-proof the public API.
  The repo-wide posture is already correct here — `vite.config.ts:63-66` records that T.W1 retired
  every `@src/*` import from the demo tree, and the seven `package.json#exports` subpaths are
  machine-derived into the self-alias set (`vite.config.ts:37-50`). No violating edge on that limb.
- **Relative traversal is correct-by-ruling.** `vite.config.ts:68-70` records W43/RF-15 killing the
  demo `@…` path aliases; every demo import is relative to its physical home. `../../../ui/skeleton`
  is therefore *not* a style defect.
- **The barrel it traverses to is.** See L-4.

---

## L-1 · BLOCKER — the component addresses a producer API that does not exist; both registers render identically

**Mechanism:** dependency direction inverted. The *consumer* has authored the *producer's* public
surface — four props and four custom properties — and glass-ui never published any of them. The
component's own comments admit the invention in the present tense: *"the choreography goes live the
day glass-ui's shimmer reads them"* (`PaletteCardSkeleton.vue:20-21`), *"tuned ONLY through the
published seams"* (`:118`). They are not published seams. They are wishes.

### Evidence 1 — glass-ui 7.0.0's `Skeleton` declares exactly one prop

`node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts`:

```ts
import { type HTMLAttributes } from "vue";
type __VLS_Props = {
    class?: HTMLAttributes["class"];
};
```

Compiled implementation, `node_modules/@mkbabb/glass-ui/dist/data-table-BygKg6ZA.js:135-149`:

```js
props: { class: { type: [Boolean, null, String, Object, Array] } },
setup(t) {
  let n = t, r = C(), a = i(() => Object.fromEntries(
      Object.entries(r).filter(([e]) => e !== "role" && !e.startsWith("aria-"))));
  return (t, r) => (h(), s("div", p(a.value, {
      "data-slot": "skeleton", "aria-hidden": "true", class: S(e)("skeleton", n.class)
  }), null, 16));
}
```

No `surface`. No `variant`. Unknown attributes are *not* dropped — they pass through `useAttrs()`
(only `role` and `aria-*` are filtered) and land on the DOM as literal HTML attributes.

### Evidence 2 — the four custom properties have zero readers in the producer

```
$ grep -ro "skeleton-shimmer-delay" node_modules/@mkbabb/glass-ui/dist/ | wc -l
       0
$ grep -ro "skeleton-shimmer-tint"  node_modules/@mkbabb/glass-ui/dist/ | wc -l
       0
$ grep -rl "skeleton-glass-bg"      node_modules/@mkbabb/glass-ui/dist/     # (no output)
$ grep -rl "pulse-aura-opacity-max" node_modules/@mkbabb/glass-ui/dist/     # (no output)
```

The producer's actual skeleton CSS (`dist/glass-ui.css`, the whole of it):

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg, transparent 24%, color-mix(in oklab, var(--foreground) 10%, transparent) 48%, transparent 72%);position:absolute;inset:0}
.skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;will-change:transform;transform:translate(-110%)}
```

Background is hard-wired to `var(--muted)`. The *only* published seam is `--duration-shimmer`.
There is no delay seam, no tint seam, no background seam, no easing seam, no `breath` keyframe.

### Evidence 3 — live measurement on the running dev server

Mounted the real SFC twice (`variant="shadow"` and `variant="developing"`, `count=5`) into
`http://localhost:9000` via Playwright and read the computed styles of the first strip segment:

| probe | `variant="shadow"` | `variant="developing"` |
|---|---|---|
| rendered segment | `<div … surface="glass" variant="breath" data-slot="skeleton" aria-hidden="true" class="skeleton h-full rounded-none" style="width: 20%; --i: 0; --skeleton-shimmer-delay: 0s;">` | `<div … surface="glass" variant="shimmer" … class="skeleton h-full rounded-none specimen-seg skeleton-seg" …>` |
| `backgroundColor` | `rgb(246, 243, 239)` | `rgb(246, 243, 239)` |
| element `animation-name` | `none` | `none` |
| `::after` `animation-name` | `skeleton-scan-cd03d0b0` | `skeleton-scan-cd03d0b0` |
| `::after` `animation-delay` | `0s` | `0s` |
| `::after` `animation-duration` | `5s` | `5s` |
| resolved `--skeleton-glass-bg` | *(resolves, read by nothing)* | *(resolves, read by nothing)* |
| resolved `--pulse-aura-opacity-max` | `0.75` *(read by nothing)* | `0.75` *(read by nothing)* |

`identicalRender: true`.

`rgb(246,243,239)` is `--muted` (`light-dark(hsl(38 26% 95%), …)`), **not** `--skeleton-ink`
(`color-mix(in oklab, var(--well-bg), var(--foreground) 15%)`). The "ONE muted-ink family" the
component's header comment (`:3-5`) and `demo/styles/utils.css:36-56` both claim to enforce is not
on the pixels.

### What is therefore dead

| line(s) | construct | reader |
|---|---|---|
| `:43,:57,:63,:74` | `surface="glass"` ×4 | none — lands as a literal HTML attribute |
| `:45,:58,:64,:75` | `:variant="blockVariant"` ×4 | none — lands as a literal HTML attribute |
| `:46` | `variant === 'developing' && 'specimen-seg skeleton-seg'` | classes feed only dead custom props |
| `:50,:60,:66,:77` | `--skeleton-shimmer-delay` writes ×4 | none |
| `:93` | the `variant?: "shadow" \| "developing"` prop | only `blockVariant` |
| `:99` | `blockVariant` computed | only the dead `:variant` binding |
| `:110-112` | `.skeleton-seg { --skeleton-glass-bg: … }` | none |
| `:120-123` | `[data-slot="palette-card-skeleton"] { --pulse-aura-opacity-max; --animate-ambient-pulse-easing }` | none |

**≈22 of the 66 non-comment lines (33%) are inert.** File composition, measured:
`total=125 commentLines=53 blank=6 codeLines=66 commentPct=42.4%`.

### Blast radius beyond this component

The same dead contract is written at **12 `<Skeleton>` call sites in 4 files**:

```
demo/palettes/browser/card/PaletteCardSkeleton.vue   :40 :56 :62 :71   (surface + :variant)
demo/palettes/browser/admin/AdminListSkeleton.vue    :13 :15 :16 :18   (surface="glass" variant="breath")
demo/palettes/browser/admin/AdminTagsPanel.vue       :57              (surface="glass" variant="breath", v-for 5)
demo/scenes/about/markdown/Markdown.vue              :4 :6 :7         (surface="glass" variant="shimmer")
```

**Reproduction:** `npm run dev`; open `http://localhost:9000/#/extract`, process an image, inspect
any `[data-slot="skeleton"]` inside `[data-slot="palette-card-skeleton"]`. The element carries
`surface="glass" variant="breath"` as raw attributes and `background-color: rgb(246,243,239)`.
Verified by the Playwright evaluate above.

**Cure (transposition, not patch).** Two legal moves; pick one, never both (edict 2 forbids the
dual path):

1. **Producer-side (preferred, edict 4).** The register belongs *in the design system*. glass-ui's
   `Skeleton` gains `variant: "shimmer" | "breath"` and reads `--skeleton-glass-bg` /
   `--skeleton-shimmer-delay`. This is a glass-ui change and must go out on the standing BH/BI
   relay before any demo line moves.
2. **Consumer-side (if the producer declines).** Delete every dead prop and property write. The
   demo already has a *working* mechanism for exactly this — `ShadowPalette.vue:103-114` paints
   `background: var(--skeleton-ink)` on its own elements and staggers with real
   `animationDelay` inline. That is the survivor; `PaletteCardSkeleton`'s mechanism is the corpse.

Until one of those lands, `variant` must be deleted from this component's props: a prop that
selects between two indistinguishable renders is a lie in the public shape of the component.

---

## L-2 · MAJOR — three independent implementations of the "palette card lattice"; already drifted

**Mechanism:** the card's geometry has **no owner**. It is hand-copied into three files that no
tool relates to each other.

| concept | `PaletteCard` (real) | `PaletteCardSkeleton` | `ShadowPalette` |
|---|---|---|---|
| file | `card/PaletteCard/PaletteCard.vue` (+ `PaletteColorStrip`, `PaletteCardSwatches`) | `card/PaletteCardSkeleton.vue` (125 L) | `card/ShadowPalette.vue` (115 L) |
| root surface | `group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer` (`:19`) | `rounded-card border border-card-edge bg-well overflow-hidden shadow-cartoon-sm` (`:34`) | `shadow-palette skeleton-ink-register rounded-card border border-card-edge bg-well overflow-hidden shadow-cartoon-sm` (`:43`) |
| strip row | `flex h-10 w-full` (`PaletteColorStrip.vue:10`) | `flex h-10 w-full` (`:39`) | `flex h-10 w-full gap-px` (`:51`) |
| meta row | `px-3 py-2.5 flex items-center justify-between gap-2 min-w-0` (`:43`) | `px-3 py-2.5 flex items-center gap-2` (`:55`) | `px-3 py-2.5 flex items-center gap-2` (`:60`) |
| meta blocks | — | `h-5 w-32 rounded-md`, `h-5 w-6 rounded-md` (`:58,:64`) | `h-5 w-32 rounded-md`, `h-5 w-6 rounded-md` (`:62,:66`) |
| swatch row | `px-3 pb-3 flex flex-wrap gap-2 items-start pt-3 min-w-0` + `border-t border-border/15` (`PaletteCardSwatches.vue:22-23`) | `px-3 pb-3 flex flex-wrap gap-2` (`:70`) | `px-3 pb-3 flex flex-wrap gap-2` (`:71`) |
| swatch size | `w-9 h-9 sm:w-10 sm:h-10` default (`PaletteCard.vue:197`) | `w-12 h-12 sm:w-14 sm:h-14` (`:76`) | `w-12 h-12 sm:w-14 sm:h-14` (`:75`) |
| stagger arithmetic | — | `(i-1)*0.12` / `count*0.12+0.1` / `+0.22` / `+0.34+(i-1)*0.1` (`:50,60,66,77`) | **byte-identical** (`:56,63,67,77`) |

`PaletteCardSkeleton` and `ShadowPalette` are the *same component* written twice — same three rows,
same seven geometry constants, same four stagger expressions, same `count = 5` default. The only
difference is the fill mechanism: `ShadowPalette` uses plain `<div>`s with real backgrounds (works),
`PaletteCardSkeleton` uses glass-ui `<Skeleton>` with the dead contract of L-1 (does not work).

Two of the divergences from the real card are semantic regressions, not cosmetics:

- **`overflow-hidden` on the root.** `PaletteCard.vue:16-18` records the deliberate removal:
  *"NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip rasterizes 1-bit at compositing
  -layer bounds; the strip clips its OWN corners below."* Both ghosts reintroduce it (`:34`, `:43`),
  so the ghost's corners are anti-aliased differently from the card they become. Measured live:
  real card `overflow: visible`, skeleton `overflow: hidden`.
- **`shadow-cartoon-sm` vs `cartoon-surface`.** The card uses the producer's cartoon atom; the
  ghosts hand-roll a static shadow. Measured live: real card `box-shadow: … -3px 3px 0px`,
  skeleton `… -2px 2px 0px`. Different depth, same nominal plate.

**Reproduction:** `diff <(sed -n '32,81p' demo/palettes/browser/card/PaletteCardSkeleton.vue) <(sed -n '41,81p' demo/palettes/browser/card/ShadowPalette.vue)` — the row structure, padding, block
sizes and delay arithmetic align line-for-line.

**Cure.** Mint the shell once and slot it. Concretely (this is the greenfield lattice asked for):

```
demo/palettes/browser/card/
  PaletteCardShell.vue    ← NEW. Geometry ONLY: strip row / meta row / swatch row as three named
                            slots, `swatchClass` + `count` props, zero color, zero motion, zero
                            semantics. Owns h-10, px-3 py-2.5, px-3 pb-3 gap-2, border-t, the
                            no-overflow-hidden rule, and cartoon-surface — once.
  PaletteCard.vue         ← PaletteCardShell + live content (unchanged props/emits)
  PaletteCardSkeleton.vue ← PaletteCardShell + <Skeleton> fills; `count`, nothing else
  ShadowPalette.vue       ← DELETED. It is PaletteCardSkeleton at Extract's seat.
```

`ShadowPalette`'s 115 lines and `PaletteCardSkeleton`'s 22 dead lines both evaporate; the drift in
the table above becomes structurally impossible.

---

## L-3 · MAJOR — measured layout pop: the ghost is 25% taller than the card it stands in for

**Mechanism:** L-2's duplication, cashed out. Because the skeleton hardcodes one seat's geometry
while serving two seats, it is wrong at the other.

`ExtractWorkbench.vue:150` passes `swatch-class="w-12 h-12 sm:w-14 sm:h-14"` to the real card — so
the skeleton's hardcoded `w-12 h-12 sm:w-14 sm:h-14` (`:76`) matches **at Extract**. The magic
string is duplicated verbatim across the two files with nothing binding them.

`BrowsePane.vue:90-93` passes **no** `swatch-class`, so the browse wall's cards use the default
`w-9 h-9 sm:w-10 sm:h-10` (`PaletteCard.vue:197`) — and `PaletteCardSwatches` renders
`v-if="expanded"` (`PaletteCard.vue:140`), which is false for every card at mount.

**So on the browse wall the skeleton depicts a card state that never exists at rest.**

Live measurement, `http://localhost:9000/#/palettes`, viewport 1440, both plates constrained to the
same 462 px column:

```
realCard  : { h: 120,  w: 462, overflow: "visible", boxShadow: "… -3px 3px 0px …", borderRadius: "16px" }
skeleton  : { h: 150,  w: 462, overflow: "hidden",  boxShadow: "… -2px 2px 0px …", borderRadius: "16px" }
heightDeltaPx: 30
heightDeltaPct: 25
skeletonSwatchBox: { w: 56, h: 56 }      // sm:w-14
realCard default swatchClass sm:w-10 →  40px  (skeleton is +40%)
```

`SKELETON_COUNT = 4` (`BrowsePane.vue:207`), so the browse wall reserves **4 × 30 = 120 px of
phantom vertical space** that collapses the instant data lands — under a `<Transition
name="vj-morph" mode="out-in">` whose own comment claims the opposite: *"skeleton→content is 'ONE
surface, NEW content' … the developing plates SETTLE into the wall on the snappy spring instead of
a hard v-if POP"* (`BrowsePane.vue:30-39`). The morph is animating between two plates of different
size and different corner-clip.

**Reproduction:** the Playwright evaluate above — mount `PaletteCardSkeleton` with `count: 5` into
the `/#/palettes` card column and compare `getBoundingClientRect().height` against the sibling
`[role="article"][aria-label^="Palette:"]`.

**Cure.** Falls out of L-2's `PaletteCardShell`: the skeleton takes the *same* `swatchClass` prop
the card takes, threaded from the same call site, and renders the swatch row only when the card
beside it would. One home for "how big is a swatch here".

---

## L-4 · MAJOR — `demo/ui/` is 19 alias-only barrels re-exporting glass-ui

**Mechanism:** an aliasing indirection layer with zero content, standing exactly where edict 4 says
nothing should stand.

```
$ for d in demo/ui/*/; do …; done
alert | files=index.ts | totalLines=11 | vueFiles=0
avatar | files=index.ts | totalLines=1  | vueFiles=0
badge  | files=index.ts | totalLines=1  | vueFiles=0
button | files=index.ts | totalLines=1  | vueFiles=0
… (19 directories, 0 .vue files anywhere, 18 of them exactly one line)
skeleton | files=index.ts | totalLines=1 | vueFiles=0
```

```
$ cat demo/ui/skeleton/index.ts
export { Skeleton } from "@mkbabb/glass-ui";
```

- **Edict 2 (no aliases / dual paths).** This is a pure alias. A reader of
  `PaletteCardSkeleton.vue:85` cannot tell that `Skeleton` is a *published package* component —
  the three-dot traversal reads like a demo-local file. That misreading is the proximate cause of
  L-1: the author wrote demo-side CSS against it as if it were demo-owned.
- **Edict 4 (glass-ui is the design system, not `demo/ui/`).** `demo/ui/` exists solely to make
  glass-ui look like it lives in the demo.
- **False proof of the public API.** Four files import `Skeleton` and *none* of them writes the
  specifier a real consumer would write. Zero occurrences of `Skeleton` imported directly from
  `@mkbabb/glass-ui` in the demo tree.

**Reproduction:** `grep -rn "ui/skeleton" demo/` → 4 hits, all relative; `grep -rn "Skeleton" demo/
| grep glass-ui` → 0 hits.

**Cure.** Delete all 19 directories. `import { Skeleton } from "@mkbabb/glass-ui";` at each of the
four sites. The specifier then states the truth — *this is a design-system component, its surface
is the package's, and you may not extend it from here.* (`demo/ui/alert/index.ts` at 11 lines is
the one that needs reading before deletion; the other 18 are mechanical.)

---

## L-5 · MAJOR — a global utility block in `demo/styles/utils.css` exists only to feed dead seams

**Mechanism:** the "ONE loading-ink recipe" was lifted to the global utility file (per DESIGN.md's
global-utility rule) to serve consumers that cannot read it.

`demo/styles/utils.css:56-83`:

```css
.skeleton-ink-register {
    --skeleton-ink: color-mix(in oklab, var(--well-bg), var(--foreground) 15%);
    --skeleton-glass-bg: var(--skeleton-ink);            /* ← 0 readers, anywhere */
    --skeleton-shimmer-tint: color-mix(in srgb, var(--muted-foreground) 24%, transparent); /* ← 0 readers */
}
.specimen-seg { --specimen-ink: var(--skeleton-ink); }   /* ← consumed only by the dead .skeleton-seg */
@supports (color: oklch(from red calc(l) c calc(h + 36deg))) {
    .specimen-seg { --specimen-ink: color-mix(in oklab, var(--skeleton-ink) 78%,
        oklch(from var(--accent-live) l 0.12 calc(h + var(--i, 0) * 36deg))); }
}
```

`--skeleton-shimmer-tint` reader census, whole repo:

```
$ grep -rn "skeleton-shimmer-tint" demo/ src/ test/ e2e/
demo/styles/utils.css:40:   * The `--skeleton-shimmer-tint` line is the letter-L9 producer seam
demo/styles/utils.css:59:    --skeleton-shimmer-tint: color-mix(…);
demo/palettes/browser/card/PaletteCardSkeleton.vue:18:  `--skeleton-shimmer-delay` / `--skeleton-shimmer-tint`
```

Two of those three are prose. The token has **zero** readers.

`--skeleton-ink` itself is live — but only for `ShadowPalette.vue:104-113`, which reads it directly
as a `background`. The three `Skeleton`-based consumers (`PaletteCardSkeleton`, `AdminListSkeleton`,
`AdminTagsPanel`) put `.skeleton-ink-register` on their wrappers and get `var(--muted)` on the
pixels regardless.

**Reproduction:** the live probe in L-1 — `--skeleton-glass-bg` resolves to the full `color-mix`
chain on the segment while `backgroundColor` is `rgb(246,243,239)` = `--muted`.

**Cure.** Delete `--skeleton-glass-bg` and `--skeleton-shimmer-tint` from
`.skeleton-ink-register`; delete `.specimen-seg` and its `@supports` block outright (its only
consumer is the dead `.skeleton-seg` in the subject file). Keep `--skeleton-ink` — it has one real
reader. If L-1's producer-side cure lands, re-add the two seams *at that time*, not before: a token
minted for a future reader is speculative generality, which is edict 3.

---

## L-6 · MINOR — per-instance override of producer tokens at the component root (edict 5)

```css
/* PaletteCardSkeleton.vue:120-123 */
[data-slot="palette-card-skeleton"] {
    --pulse-aura-opacity-max: 0.75;
    --animate-ambient-pulse-easing: var(--ease-standard);
}
```

The comment (`:114-119`) frames this as "tuned ONLY through the published seams … never a demo
re-declaration of the producer keyframes". Both named tokens have **zero occurrences in
`node_modules/@mkbabb/glass-ui/dist/`** (grep above), so it is neither a seam nor a re-declaration —
it is a no-op. Were it live, it would still be a per-instance override of a design-system motion
token, which edict 5 sends to the root/producer level.

Measured: element `animation-name: none` on both registers; the producer's `::after` uses a
hard-coded `ease-in-out`, not a token.

**Cure.** Delete the block. If a quieter breath is genuinely wanted, it is a glass-ui `Skeleton`
variant (L-1 cure 1), not a demo selector.

---

## L-7 · MINOR — the "loading" announcement has two homes

`PaletteCardSkeleton.vue:35-36` puts `role="status" aria-label="Loading palette"` on **every**
ghost. `BrowsePane.vue:44-48` wraps `SKELETON_COUNT = 4` of them in a container that *also* carries
`aria-label="Loading palettes"`; the load-more block (`:126-130`) repeats the pattern with 2.

So the browse wall opens with **five** overlapping loading announcements for one event.

The correct rule is already written down in the sibling — `ShadowPalette.vue:36-40`: *"the ghost is
`aria-hidden`, carries NO role="status" and NO 'Loading' label … the host's seated caption carries
the text."* The subject file argues the opposite at `:28-31`. Two components in the same directory,
two contradictory rulings on one concept.

**Reproduction:** source; `v-for="i in SKELETON_COUNT"` over a `role="status"` root is
unconditionally 4 live regions. (Not browser-confirmed — the API was unreachable during this
session, so the loading branch could not be reached on `/#/browse`. Labelled: **structurally
certain from source, not observed live**.)

**Cure.** Announcement is a *wall* concern, not an *item* concern. One `role="status"` on the
container; ghosts `aria-hidden="true"`. Falls out of L-2's shell (the shell is geometry only and
carries no semantics; the host decides).

---

## L-8 · INFO — the type gate is structurally blind to this class of defect

`package.json`: `"typecheck": "vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit"`, and per the tranche record this step is **hard** in CI and currently green.

It cannot catch L-1: Vue templates treat undeclared attributes on a component as fallthrough attrs,
which are always type-legal. `surface="glass"` on a component whose props are `{ class }` is a
well-typed program. Likewise no linter checks that a written CSS custom property has a reader.

This is why 12 dead call sites survived the glass-ui 7.0.0 adoption with every gate green.

**Cure.** Not a demo change. Either glass-ui's components declare
`inheritAttrs: false` + an explicit attr allowlist (so a stray `variant` is *visible* rather than
silently reflected to the DOM), or the mega-tranche adds a mechanical gate: for every custom
property written in `demo/`, assert ≥1 reader across `demo/**` ∪ `node_modules/@mkbabb/glass-ui/dist/**`.
The second is ~20 lines and would have caught all of L-1, L-5 and L-6.

---

## L-9 · INFO — the visual-audit corpus contains zero frames of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.md` has no row attributable to
`PaletteCardSkeleton`. Reading `shots/safari-desktop-light/browse.png` shows why: the API was
unreachable during capture, so `/#/browse` rendered the `EmptyState variant="error"` branch
("The commons is unreachable." / "Failed to load palettes" / Retry) — the same branch I hit live
this session. `/#/extract` captures the pre-upload state. The loading register is transient and
the harness samples after settle, so it is invisible to the whole matrix in all four
light/dark × desktop/mobile cells.

Consequence: a component that renders both of its registers identically and paints the wrong ink
passed a full Safari matrix without a single frame of evidence either way.

**Cure.** The matrix needs a *held-state* pass: a capture mode that stalls the transport (the
`window.fetch` delay shim I used is four lines) and shoots the loading branch of every route.
Without it, every skeleton in the app is permanently outside the audit's reach.

---

## L-10 · MINOR — a prior mega-tranche record asserts the opposite of the measured fact

`docs/tranches/V/megatranche/excavation/CONTRIVANCE-REGISTER.md:27`:

> The bound `:variant=` sites (7 repo-wide) were receiver-checked: SwatchHoverMenu ×2 →
> WatercolorDot (valid), **PaletteCardSkeleton ×4 → Skeleton (valid)**, PaletteCard :125 →
> ActionFeedback (app-owned) — **none on Button**.

`PaletteCardSkeleton ×4 → Skeleton (valid)` is **falsified** by the `.d.ts` and the compiled
`props: { class: … }` above. The "receiver check" evidently confirmed that a receiver *exists*, not
that the receiver *declares the prop*. The register's adopted correction ("the codemod population
is 51 sites / 22 files, Button-only") therefore **undercounts by at least 12** — the 4 bound
`:variant` sites here plus the 8 static `variant="breath"|"shimmer"` sites in `AdminListSkeleton`,
`AdminTagsPanel` and `Markdown`, and by a further 12 if `surface="glass"` is counted.

**Cure.** Re-run the receiver check against each receiver's declared prop set (`.d.ts` for package
components, `defineProps` for app components), not against the receiver's existence. This is a
correction to a *banked* record and should be relayed, not silently amended.

---

## L-11 · MINOR — 42% of the file is prose, and the prose is now false

```
total=125 commentLines=53 blank=6 codeLines=66 commentPct=42.4%
```

The 30-line header block (`:2-31`) documents a two-register design that does not render, cites four
seams that do not exist, and narrates five tranche decisions (S.W5-1, S-10.4, T.W3-2, T.W6.5, R12).
`:20-22` explicitly defers correctness to a future producer release: *"the choreography goes live
the day glass-ui's shimmer reads them — never re-defined here (§No-workaround)."* That sentence is
the defect's charter: it converts a broken render into a documented waiting posture, which is why
no gate and no prior audit pass flagged it.

**Cure.** Comments describe what the code does. A comment describing what a *dependency will
someday do* is a TODO wearing a design rationale, and belongs in the tranche ledger with a ticket,
not in the component. When L-1 lands, the header collapses to ~4 lines.

---

## Greenfield module lattice (concrete, no hedge)

```
@mkbabb/glass-ui                      ← Skeleton owns register + timing. If the demo wants a
  components/skeleton/Skeleton.vue      `breath` register and a stagger seam, they are declared
                                        HERE (props + documented custom properties) or nowhere.
                                        Relay via the standing BH/BI inbox before any demo edit.

demo/palettes/browser/card/
  PaletteCardShell.vue                ← NEW, ~40 lines. THE lattice: three rows, named slots,
                                        `swatchClass` + `showSwatches` props. Geometry only —
                                        no color, no motion, no aria. Sole owner of h-10 /
                                        px-3 py-2.5 / px-3 pb-3 gap-2 / border-t / the
                                        no-overflow-hidden rule / cartoon-surface.
  PaletteCard.vue                     ← PaletteCardShell + live content. Unchanged surface.
  PaletteCardSkeleton.vue             ← PaletteCardShell + <Skeleton> fills. Props: `count`,
                                        `swatchClass`, `showSwatches`. NO `variant` until the
                                        producer declares one. aria-hidden. ~35 lines.
  ShadowPalette.vue                   ← DELETED (115 lines). It is PaletteCardSkeleton at
                                        Extract's seat with count=k.

demo/ui/**                            ← DELETED (19 alias barrels). Consumers write
                                        `import { Skeleton } from "@mkbabb/glass-ui";`

demo/styles/utils.css
  .skeleton-ink-register              ← keeps --skeleton-ink (1 real reader). Loses
                                        --skeleton-glass-bg + --skeleton-shimmer-tint.
  .specimen-seg + @supports block     ← DELETED (only consumer is the dead .skeleton-seg).

BrowsePane.vue / ExtractWorkbench.vue ← own the single role="status" live region; pass the same
                                        swatchClass to card and ghost from one constant.
```

Net: **−115 lines** (ShadowPalette) **−22 dead lines** (subject) **−19 barrel files** **−28 CSS
lines**, **+~40 lines** (`PaletteCardShell`), and the drift documented in L-2's table becomes
unrepresentable.

---

## Negative findings (things this axis checked and cleared)

- **No `src/` deep import.** The component imports nothing from `@mkbabb/value.js`. The demo-wide
  posture is enforced structurally: `vite.config.ts:37-50` derives the seven subpath aliases from
  `package.json#exports` at config time, so the alias set cannot drift from the published map, and
  `tsconfig.demo.json` has no `@src/*` path (`vite.config.ts:63-66`).
- **No feature → shell / component → boot edge.** The only import is the design-system barrel.
- **`verbatimModuleSyntax` clean.** The single import (`{ computed } from "vue"`, `:84`) is a value
  import; the file has no type-only imports to mark.
- **Vue 3.5 idioms present.** Reactive props destructure with defaults at `:87`. No `defineModel`
  round-trip, so the `shallowRef` caveat does not apply. No template refs needed.
- **Not a god module.** 66 code lines, one responsibility. Its defect is the opposite —
  under-abstraction across three files, not over-accumulation in one.
- **Animations not deleted.** The scoped `@keyframes`-free style block only sets custom properties;
  nothing was removed, so edict 6 is not implicated. (The *effect* of `variant="shadow"`'s breath
  is absent, but that is L-1's dead contract, not a deletion.)
