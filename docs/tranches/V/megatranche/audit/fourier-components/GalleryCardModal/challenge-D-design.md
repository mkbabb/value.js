claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryCardModal.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryCardModal.vue`
(261 lines; census [FE §2] row "Card detail `Dialog`", `formation/fourier/lane-frontend.md:105`).

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Thirty-four claims below; each carries a
severity, a `file:line` provenance, and the falsifier that would kill it. Seven superlatives carry the
same burden (L-18 runs both ways). Unqualified bare `:NN` line refs are `GalleryCardModal.vue`.

**Method / limits.** Static + source-derived only. Read whole and read-only: the SFC; its five first-party
imports (`@/lib/types`, `@/lib/api`, `../lib/basis-display`, `@/lib/colors`, `lucide-vue-next`); its three
glass-ui imports resolved into the **installed 4.0.0 dist** (`badge-UILT_3pZ.js`, `button-BNDWhAZb.js`,
`DialogContent-DDE6pQBU.js`, `cn-DJXf4yaB.js`, `useSurfaceAxis-CMnF2zHb.js`, plus
`dist/styles/{tokens,typography,utilities,glass,theme}/*.css`); the reka-ui 2.9.10 `Dialog/` primitives it
delegates to; the app entry `web/src/style.css`; its sibling `GalleryCard.vue` and its host `GalleryView.vue`;
and — as the **uplift oracle only** — the glass-ui **7.0.0** working tree at
`/Users/mkbabb/Programming/glass-ui` (`src/components/dialog/{DialogContent.vue,styles.css}`,
`src/components/{badge,button}/`, `MIGRATION.md`, `package.json`). No browser tooling was used; three claims
are marked **UNPROVEN-NEEDS-LIVE** for SS-13. One write only: this file.

**Contrast figures** are computed from the token sources, not eyeballed: Oklch→sRGB (Ottosson) → WCAG 2.x
relative luminance → ratio, over `dist/styles/tokens/color-radius.css` (light arm),
`tokens/dark-arm.css` (dark arm), with alpha compositing for `/70` and `/30` plates. The script is
reproducible from the token values quoted inline; the falsifier for every contrast row is "recompute from
the quoted `oklch()`/`hsl()` triples".

---

## §0 — The verdict in one paragraph

The D.W4.c re-point onto the glass-ui `<Dialog>` primitive was the **right** move and is honestly documented
in-file (`:31-35`) — it is why Escape-close, the focus trap and the scrim are correct here for free. But the
re-point stopped at the primitive's *boundary* and never crossed into the primitive's *grammar*. The
component is the **only one of the app's five `<DialogContent>` sites that ships no `DialogTitle`** — so the
detail view of the gallery is an **unnamed** dialog with **zero** headings. It then hand-rolls the geometry
the library owns (`w-full`, `max-h-[90vh]`, `p-0`, `rounded-xl` on `:73`) while the other four sites pass a
bare `class="max-w-sm"`, and every one of those hand-rolls is either wrong now (flush-to-edge at 393px; `vh`
where the app's own entry uses `dvh`) or will **defeat** the F.W1 uplift's cure for it. Spacing runs twelve
distinct rungs with two off-scale arbitraries and no repeated interval for a repeated relationship. In the
light arm the tier badge reads at **1.59:1** and the default `fourier` basis pill at **3.77:1**. And the
component's headline motion claim — "modal transitions ride on the glass-ui `<Dialog>` primitive" (`:258-260`)
— is **half unreachable by construction**: `open` is a constant `true` (`:36-39`) and the parent `v-if`
unmounts the tree synchronously, so the exit animation the comment credits can never run.

Tally: **2 BLOCKER · 14 MAJOR · 13 MINOR · 5 INFO = 34 defects · 7 superlatives.**

---

## §1 — BLOCKERS

### D-01 · BLOCKER · a11y — the dialog has **no accessible name**; it is the only one in the app that does not
`:69-195` renders `<Dialog><DialogContent …>` with **no** `DialogTitle`, no `DialogDescription`, no
`aria-label`, no `aria-labelledby`.

reka-ui's `DialogContentImpl` sets the naming hooks **unconditionally**:
`node_modules/reka-ui/dist/Dialog/DialogContentImpl.js:49-50` mints `rootContext.titleId` /
`descriptionId`, and `:78-79` binds `"aria-describedby": descriptionId, "aria-labelledby": titleId` onto the
`role="dialog"` element. With no title rendered, `aria-labelledby` points at an id that exists nowhere →
accessible-name computation yields **nothing**, and `aria-describedby` dangles. `Dialog/utils.js:13-18` fires
`console.warn("Warning: \`DialogContent\` requires a \`DialogTitle\` …")` on every open in dev.

This is not a library gap. glass-ui 4.0.0 exports the component —
`dist/components/ui/dialog/index.d.ts` lists `DialogTitle`, `DialogHeader`, `DialogDescription` — and **four
of the app's five `DialogContent` callsites use it**: `ExportModal.vue:51`, `GalleryView.vue:404`,
`AdminUserList.vue:463`, `AdminFlaggedPanel.vue:267`. `GalleryCardModal.vue:71` is the sole abstainer, and it
is the one dialog a *non-admin* user actually reaches.

**Severity rationale.** Compounded by D-13 (zero headings) and D-14 (alt = slug), a screen-reader user who
opens this dialog is placed inside a focus trap that announces no name, exposes no structure, and whose only
visible dismissal control is a 16px unlabelled-by-position glyph (D-03) that is the *last* tab stop (§6 I-1).

**Falsifier.** Produce any `<DialogTitle>`, `role="heading"`, `aria-label` or `aria-labelledby` inside
`:69-195`; **or** show reka omits `aria-labelledby` when no title element exists (it does not —
`DialogContentImpl.js:79` is unconditional).

---

### D-02 · BLOCKER · a11y/contrast — the light-arm tier badge reads at **1.59:1**
`:84-92` renders the tier chip as `text-sm font-semibold` text over `backdrop-blur-sm bg-background/70`,
inked by `:215-216`:

```
.modal-tier-badge[data-tier="featured"] { color: var(--tier-featured); }
.modal-tier-badge[data-tier="saved"]    { color: var(--tier-saved); }
```

Light-arm tokens (`dist/styles/tokens/color-radius.css:270-271`) are
`--tier-featured: oklch(0.841 0.173 84.2)` → `#ffbf00` (L 0.5864) and
`--tier-saved: oklch(0.676 0.176 252.3)` → `#3499ff` (L 0.3077). `--background` is `--neutral-0` =
`hsl(40 30% 98%)` → `#fbfaf8` (L 0.9602), `:57` / `:40` of the same file.

| chip | ratio vs the **best case** (plate fully opaque over page bg) | WCAG 1.4.3 AA at 14px/600 |
|---|---:|---|
| `featured` | **1.59 : 1** | needs 4.5 : 1 |
| `saved` | **2.82 : 1** | needs 4.5 : 1 |

And 1.59 is the **ceiling**, not the figure: the plate is `bg-background/70`, so 30 % of an *arbitrary user
contour render* bleeds through underneath. `text-sm` is 14px at ≥768px and 15.75px below it (`style.css:40-50`
sets `html { font-size: 1.125rem }` → `1rem` at 768px) — both under the 18.66px large-bold bound, so the full
4.5:1 is owed. The 16px `Crown`/`Bookmark` beside it (`:89-90`) fails the 3:1 non-text floor too.

The dark arm is fine (13.13:1 / 8.87:1 from `tokens/dark-arm.css:141-142`). **This is a light-mode-only
defect**, and the repo has already conceded exactly this class of problem once: `style.css:113-127` (D.W4.d)
locally darkens `--viz-amber` from ≈3.54:1 to ≈4.6:1 "axe contrast carry", holding the dark arm put. The
same carry is owed here — and `--tier-featured` starts **twice as far** from AA as `--viz-amber` did.

**Falsifier.** Show a fourier-local override of `--tier-featured`/`--tier-saved` (there is none — the only
token overrides in the app are `style.css:119-127`, `--viz-amber` and `--section-color-5`); **or** recompute
from the quoted `oklch()` triples and get ≥4.5:1; **or** show the chip is decorative and duplicated in text
(it is not — `:91` `{{ entry.tier }}` is the *only* place the tier word appears in the modal).

---

## §2 — MAJOR

### D-03 · MAJOR · a11y — the close ✕ is a **16 × 16** target
glass-ui 4.0.0 renders `showClose` (default `true`) as
`DialogClose class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 …"` wrapping
`<X class="w-4 h-4">` + `<span class="sr-only">Close</span>` (`dist/DialogContent-DDE6pQBU.js`, the
`S.showClose ? …` branch). No padding, no min-size; the `sr-only` span is `1px` and absolutely positioned
(`dist/styles/components.css:48`). The button box is therefore **16 × 16 CSS px** — below WCAG 2.2 SC 2.5.8
(AA) *Target Size (Minimum)* at 24 × 24, and far below 2.5.5 at 44 × 44.

glass-ui 4's coarse-pointer floor does **not** reach it: `dist/styles/utilities/a11y-overrides.css:113-120`
lifts only `[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger`. The reka
`DialogClose` carries none of those.

Counted against this component (not the library) because the component *chose* to leave `showClose` at its
default over a bleed image (D-04) and added no compensating dismissal affordance in the content it does own.

**Falsifier.** Find a rule in glass-ui 4's emitted CSS giving the reka `DialogClose` padding or a min box;
or show the touch-hit-area utility (`a11y-overrides.css:125+`) is composed onto it (it is not — that utility
is opted into by six named form atoms).

---

### D-04 · MAJOR · design/contrast — the ✕ floats over an arbitrary user image with **no backdrop plate**
`:75-93` makes a full-bleed `<img>` the first child of the plate. The library's ✕ is positioned
`absolute right-4 top-4` **relative to `DialogContent`** (it is a sibling of the slot, not of the wrapper),
so it lands *inside the image frame*, top-right, at `opacity-70`, inheriting `--foreground` — near-black in
light, near-white in dark — over unconstrained image pixels.

The component **knows** how to solve this: 10px away, its own tier chip carries
`backdrop-blur-sm bg-background/70` (`:86`) for precisely this reason. The ✕ got no such plate.

**Falsifier.** Show the overlay renders are guaranteed to be light (or dark) in their top-right corner —
they are user contour renders composited over `--muted`, so they are not. Partly
**UNPROVEN-NEEDS-LIVE** for the measured worst-case ratio; the *structural* claim (a floating glyph over
unbounded image content with no plate, beside a sibling chip that has one) is fully source-provable.

---

### D-05 · MAJOR · a11y/design — the ✕ **scrolls out of the viewport**
`:73` puts `max-h-[90vh] overflow-y-auto` on `DialogContent` — making it the scroll container. The ✕ is an
absolutely-positioned **descendant of that same scroller**, so its containing block is the scroller's padding
box and it scrolls with the content. Past the first screenful, the only visible dismissal control is gone.

Reachability: at a 393 px viewport the image frame alone is `aspect-[16/10]` → 246 px, plus the meta stack
(`:95-191`: two 14px rows, a stat row, two plates, the optional admin row, a `size="lg"` CTA) ≈ 260 px+ →
≈ 510 px. On a 360 px-tall landscape phone `90vh` = 324 px; the plate scrolls from the first frame.

Escape and outside-press still dismiss (D.W4.c's real win, S-1), so this is MAJOR not BLOCKER — but a
touch user has neither.

**Falsifier.** Show the content can never exceed `90vh` (the arithmetic above says otherwise), or show
CSS positions abspos descendants of a scroll container against the *visible* box rather than the scrolled
padding box (it does not).

---

### D-06 · MAJOR · motion — the exit animation is **unreachable by construction**, and the in-file comment credits it anyway
`:36-39`:

```ts
const open = computed({
    get: () => true,
    set: (v: boolean) => { if (!v) emit("close"); },
});
```

`open` is a **constant `true`**. Dismissal round-trips through the parent: `GalleryView.vue:389`
`v-if="selectedEntry"`, `:395` `@close="selectedEntry = null"`. So on close the whole subtree — `DialogRoot`,
`Portal`, `ModalOverlay`, content — unmounts **synchronously while `open` is still `true`**. `data-state`
never becomes `"closed"`.

glass-ui 4's plate composes `popover-animate` when no `spring` prop is passed
(`DialogContent-DDE6pQBU.js`, the `w` constant), and that utility is *entirely* data-state-keyed —
`dist/styles/utilities/animate.css:10-15`:
`data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 … zoom-out-95`.
The `closed` half can never fire. The modal **blooms in and hard-cuts out**, scrim included.

The SFC's closing comment (`:258-260`) reads: *"modal transitions ride on the glass-ui `<Dialog>` primitive
(CONSTELLATION recipe — DialogContent ships its own data-state animation). The bespoke `.modal-enter/leave`
classes retired with the Teleport+Transition."* Half of what was retired was not in fact replaced.

**Falsifier.** Show reka's `DialogRoot`/`Presence` retains a closing node when its **parent component
instance** is removed by `v-if` (it cannot — Vue tears the subtree down first); or show `popover-animate`
has a non-data-state exit leg (`animate.css:10-15` says it does not).

---

### D-07 · MAJOR · state coverage — an entry with **no tier** renders a phantom "saved" chip with an empty label
`web/src/lib/types.ts:232` types the field **optional**: `tier?: GalleryTier`
(`GalleryTier = "featured" | "saved" | "normal"`, `:96`). `:85` guards with
`v-if="entry.tier !== 'normal'"` — which is **`true` for `undefined`**. The branch then runs:

- `:89` `<Crown v-if="entry.tier === 'featured'">` → false;
- `:90` `<Bookmark v-else>` → **renders**;
- `:91` `<span>{{ entry.tier }}</span>` → renders **empty**;
- `:88` `:data-tier="entry.tier"` → attribute absent, so neither `:215` nor `:216` matches and the chip
  inherits `--foreground`.

Result: a full-strength bookmark chip asserting "saved" about an entry that claims no tier, with no word
beside it. `GalleryCard.vue:149-152` carries the same faulty guard but degrades to an empty 24 × 24 box
(`v-if` / `v-else-if`, no `v-else`) — **the modal is strictly worse than the card it details.**

**Falsifier.** Prove the API always populates `tier`. The repo's own TS twin says it may not, and the twin is
the contract fourier's frontend is typechecked against.

---

### D-08 · MAJOR · state coverage — no loading and no error state on the hero image
`:78-82`:

```html
<img :src="overlayUrl(entry.image_slug)" :alt="entry.image_slug" class="w-full h-full object-contain" />
```

No `@error`, no `@load`, no skeleton, no fallback. `overlayUrl(imageSlug, resize = 1024)`
(`web/src/lib/api.ts:296`) is a **1024 px** render — an order above the card's `thumbnailUrl` (`:292`). Until
it lands the frame is a bare `bg-muted` rectangle; if it 404s (a live state — `image_slug` is an asset FK,
`types.ts:212`, and overlay generation is server-side) it is a broken-image glyph, permanently, with no other
copy in the modal identifying what failed.

The card is more careful than the detail view: `GalleryCard.vue:104` sets `loading="lazy"` and `:102`
`opacity-85`.

**Falsifier.** Find an error/placeholder branch in `:75-93`, or show `overlayUrl` cannot 404.

---

### D-09 · MAJOR · state coverage — the "Decomposition" plate has no empty state
`:41-56` builds `basisLabels` and **filters unknown keys to `null`** (`:46 if (!cfg) return null` … `:55
.filter(Boolean)`). `basisDisplay` (`../lib/basis-display.ts:3-7`) holds exactly **three** keys
(`fourier`, `chebyshev`, `legendre`) while `active_bases` is an unconstrained `string[]`
(`types.ts:214`). So `basisLabels` is empty whenever `active_bases` is `[]` **or** carries only
bases the map does not know — the very case `:46` was written to defend against.

`:124-141` then renders the plate unconditionally: a `bg-muted/30` box, the heading "Decomposition", and an
**empty** `flex flex-wrap gap-1` row. A titled container with nothing in it reads as a rendering failure, not
as "no bases".

**Falsifier.** Show `active_bases` is non-empty and closed over the three keys — the component's own guard at
`:46` is the admission that it is neither.

---

### D-10 · MAJOR · state coverage — no in-flight state on `like` / `set-tier`
`:109-120` and `:158-177` emit and return. The host awaits with no guard:
`GalleryView.vue:124-130 handleLike` and `:132-135 handleSetTier` are bare `async` bodies. The buttons never
`disabled`, never show a pending affordance, never suppress re-entry — N clicks in the round-trip window are
N mutations. glass-ui 7 ships the exact affordance as a first-class prop (`Button.vue:28`, `loading?: boolean`
— *"Marks an in-flight command and suppresses activation until it settles"*); glass-ui 4 has no equivalent,
so this must be authored locally today.

Compare the one place the app *does* guard: `GalleryView.vue:137-141 handleDelete` gates behind `confirm()`.

**Falsifier.** Find a `:disabled`, a pending ref, or a debounce on `:109-120` / `:158-177`, or a guard inside
`gallery.like` / `gallery.setTier`.

---

### D-11 · MAJOR · design/proportion — mobile geometry: flush to both viewport edges, and `vh` where the app uses `dvh`
`:73` `class="modal-card max-w-[28rem] w-full max-h-[90vh] overflow-y-auto p-0 border-2 …"`.

**(a) No gutter.** glass 4's plate base is `… grid w-full max-w-lg gap-4 p-6` (`DialogContent-DDE6pQBU.js`,
the `C` constant); `cn` (`cn-DJXf4yaB.js`) dedupes by category, so `max-w-[28rem]` replaces `max-w-lg` and
`w-full` survives. The element is `fixed` → its containing block is the viewport → at a 393 px iPhone the
plate is **393 px wide, flush to both edges**, with a `border-2` and `rounded-xl` corners hard against the
screen. The other four `DialogContent` sites in the app pass only `class="max-w-sm"`
(`GalleryView.vue:402`, `AdminFlaggedPanel.vue:265`, `AdminUserList.vue:461`) and are unaffected.

This is the exact defect glass-ui 7 names and cures — `src/components/dialog/styles.css:17-19`: *"The inline
gutter clamp is load-bearing — at 393 the plate sat flush to both viewport edges (x 0, w 393), and two
consumers hand-rolled their own gutter and disagreed."* **This component is one of the hand-rollers, and its
hand-roll has no gutter at all.** See §6 U-3 for why the cure will not reach it.

**(b) Wrong viewport unit.** `max-h-[90vh]`. On iOS Safari `vh` is the **large** viewport, so with the URL bar
shown a `90vh` plate centred by `top-1/2 -translate-y-1/2` overflows the *visual* viewport at both ends —
clipping the ✕ at the top (compounding D-05) and the CTA at the bottom. The repo's own entry already knows
better: `web/src/style.css:21` `min-height: 100dvh`. glass-ui 7 uses `calc(100dvh - 2rem)`
(`DialogContent.vue:172`).

**Falsifier.** For (a): find an ancestor constraining the fixed plate's width (there is none — it is
portaled to `body`), or show `cn` drops `w-full` (its `width` row keeps the last `w-` token). For (b):
show `90vh ≤ visual viewport` on a URL-bar-visible iOS Safari (it is not). The *pixel* consequence of (b)
is **UNPROVEN-NEEDS-LIVE**; the unit divergence from the repo's own entry is source-provable.

---

### D-12 · MAJOR · design/typography — every authored icon size inside a `<Button>` is **dead**, and the sizes invert on touch
glass-ui 4's Button CVA base (`dist/button-BNDWhAZb.js`) contains:

```
… [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none
```

which compiles to a descendant selector at specificity **(0,2,1)** setting `width`/`height`. That beats both
(i) the SVG's *presentational* `width`/`height` attributes — which is all lucide's `:size` prop sets
(`lucide-vue-next/dist/esm/defaultAttributes.js:8-18`) — and (ii) a `.h-4 .w-4` utility at **(0,1,0)**.

So inside a Button:

| site | authored | actually rendered |
|---|---|---|
| `:117` `<Heart :size="16">` | 16 | `--ui-glyph` |
| `:166` `<Crown :size="14">` | 14 | `--ui-glyph` |
| `:176` `<Bookmark :size="14">` | 14 | `--ui-glyph` |
| `:189` `<ArrowRight class="h-4 w-4">` | 16 | `--ui-glyph` |

`--ui-glyph: calc(1rem * var(--ui-scale))` (`dist/styles/tokens/offsets-sizing.css:177`), and
`dist/styles/tokens/light-dark.css:17-21` sets `--ui-scale: var(--ui-coarse-scale, 1.5)` under
`@media (pointer: coarse)` → **16 px fine-pointer, 24 px coarse.**

The two icons *outside* a Button are untouched and stay 16 px at every pointer: `:89` `<Crown :size="16">` in
the `.modal-tier-badge` div, `:105` `<Eye :size="16">` in a plain span. **Net: on a phone the button glyphs
render 24 px while the stat and tier glyphs beside them stay 16 px — a 1.5× inversion the source cannot
show, on a surface whose author believed they were 14 and 16.**

**Falsifier.** Give any of the four SVGs a class matching `[class*=size-]` (none has one), or show the CVA
base string is not emitted (glass-ui's `dist/styles/index.css:222` declares `@source "../*.js"`, so it is).

---

### D-13 · MAJOR · a11y — the dialog contains **zero headings**
`:126` and `:146` render the two section titles as
`<span class="cm-serif text-sm font-semibold tracking-tight">Decomposition</span>` /
`…>Parameters</span>` inside a `<div class="pb-1">`. No `<h1>`–`<h6>`, no `role="heading"`, no `aria-level`.
Combined with D-01 there is no name and no structure: a screen-reader user inside the focus trap gets an
unnamed region and an undifferentiated run of text. Every heading in this component is a **visual** heading
only.

**Falsifier.** Find any heading element or role in `:69-195`.

---

### D-14 · MAJOR · a11y/prose — the image `alt` is an identifier, and it is duplicated verbatim as visible text
`:80` `:alt="entry.image_slug"`; `:98` renders `{{ entry.image_slug }}` as visible `font-mono` text sixteen
lines later. A screen reader announces the same opaque slug twice — once as the description of the hero
image, once as the caption.

The model carries real prose for exactly this: `types.ts:226-227` has `title?: string | null` and
`description?: string | null`. Neither is rendered anywhere in the modal (see D-22). The correct authoring
is either a real description from those fields or `alt=""` (decorative-by-duplication) — this is neither.

**Falsifier.** Show `image_slug` is human-meaningful prose rather than an asset key (`types.ts:212` calls it
"image asset FK").

---

### D-15 · MAJOR · a11y/contrast — three more light-arm rows below AA
Same method as D-02. Light plate under the section boxes is `bg-muted/30` over `--background` ⇒ `#faf8f6`.

| element | ink | computed | required |
|---|---|---:|---|
| `:129-139` basis pill, **`fourier`** — text `var(--pill-c)` on its own `12 %` tint (`:208-212`) | `--viz-fourier oklch(0.579 0.201 30.4)` | **3.77 : 1** | 4.5 : 1 |
| `:117-119` like counter when hovered/liked (`:227-231`) at `font-size: .875rem` (`:224`) | `--like oklch(0.633 0.200 24.9)` | **3.66 : 1** | 4.5 : 1 |
| `:150-152` `N={{ n_harmonics }}`, `text-base font-semibold` | `VIZ_COLORS.fourier` (= `--viz-fourier`) | **4.48 : 1** | 4.5 : 1 |

Passing, for completeness (the recipe is not uniformly wrong): `chebyshev` pill **5.27:1**, `legendre` pill
**4.59:1**, muted body text on the plate **5.11:1**, and the entire dark arm (6.6–13.1:1).

`fourier` is the *default and most common* basis (`basis-display.ts:4`; the `b.startsWith("fourier")` branch
at `:43` folds two of the three fourier modes onto it), so the failing pill is the one most often on screen.
The pill's type is `text-[length:var(--control-text-sm)]` = `calc(--type-caption × --ui-scale)` with a 12 px
floor (`badge-UILT_3pZ.js` size `sm`; `typography/scale.css:100-104`) — comfortably normal text.

**Falsifier.** Recompute from the quoted `oklch()` triples; or show the pill/like ink is ≥18.66 px bold
(it is 12–16 px at 500–600).

---

### D-16 · MAJOR · glass-ui conformance (uplift) — **`Button variant` does not exist at 7.0.0**; four callsites here go dead
This component passes `variant="ghost"` (`:110`) and `variant="outline"` (`:159`, `:169`, `:182`).

glass-ui 7.0.0's `Button` has **no `variant` prop**. `src/components/button/Button.vue:15-31`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  …
}
```

`MIGRATION.md:167` records `/button`: `ButtonVariants` → `ButtonProps` / `ButtonEmphasis` / `ButtonSize`;
`:445` marks `ButtonVariants` **removed at 7.0.0**.

Post-uplift, `variant="…"` falls through as a stray DOM attribute and **all four buttons collapse to the
default `emphasis="secondary"` glass capsule**. The three scoped recipes then re-tint a chassis they were
never written against: `.like-btn` (`:220-231`) was narrowing a *transparent* ghost; `.tier-btn`
(`:235-244`) was softening `variant="outline"`'s `border border-input bg-background`; `.callout-btn`
(`:248-256`) was thickening the same. All three become tint-over-glass.

**This break is not in the census's enumerated break surface.** `CENSUS-2026-08-03.md:102-105` lists removed
subpaths (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), removed dock members
(`DockIconButton` ×2, `DockDropdownTrigger` ×1), `ToastVariant` (hard typecheck break),
`lucide-vue-next → @lucide/vue` ×35, and pencil-boil. The `Button` `variant`→`emphasis` axis rename is
absent from it. Repo-wide the exposure is **124 occurrences of `variant="ghost"|"outline"|"glass"` or
`size="icon"` across 36 files** (`grep -rn` over `web/src`), against a census prior-art rate of "the 3.1→4.0
hop cost 46 lines" (`CENSUS:106`).

**Recommendation to the formation.** Amend the census break surface with this row before F.W1 budgets.

**Falsifier.** Show glass-ui 7's `Button` accepts `variant` (`ButtonProps` at `Button.vue:18-31` has no such
key, and `index.ts` exports only `ButtonProps`/`ButtonEmphasis`/`ButtonSize`); or show F.W1's plan already
books it (the census does not).

---

## §3 — MINOR

### D-17 · MINOR · design/proportion — twelve spacing rungs, two off-scale, no repeated interval for a repeated relationship
Distinct spacing values inside `:69-195`: `0` (`p-0`), `gap-[0.2rem]` = 3.2 px (`:134`), `4` (`py-1`, `pb-1`,
`gap-1`, `:103/:125/:128/:148`), `gap-[0.3rem]` = 4.8 px (`:104`), `6` (`gap-1.5`, `:97/:184`), `8`
(`top-2 left-2 :86`; `gap-2 :95/:157`), `10` (`px-2.5 :86`; `pt-2.5 :95`; `mt-2.5 :184`), `12`
(`px-3 :124/:144`), `14` (`px-3.5 pb-3.5 :95`), `16` (`gap-4 :103`) — **twelve values, two of them arbitrary
non-scale literals**, in a 261-line card.

The Aristotelian objection is not excess but the absence of a mean: **the same relationship gets different
intervals.** Section-to-section is 8 px (`gap-2`, `:95`) — except before the CTA, where `mt-2.5` (`:184`)
compounds the parent gap to **18 px** for no stated reason. The outer gutter is 14 px (`:95`), the tier
chip's gutter is 8 px (`:86`), the plates' inner gutter is 12 px (`:124`) — three gutters, one card, no ratio
between them.

**Falsifier.** Name the rule that makes 14 / 12 / 10 / 8 the right four gutters here, or find the token/scale
that generates them. glass-ui 7 does exactly this — every dialog space value is a named rung with a single
mobile transposition (`dialog/styles.css:8-11`).

### D-18 · MINOR · design — the modal **drifted** from `GalleryCard`'s identical recipe by non-round deltas
Same two adjacent elements, same visual job, four different numbers across two files:

| | GalleryCard | GalleryCardModal |
|---|---|---|
| stat-span gap | `gap-1` = 4 px (`GalleryCard.vue:131`) | `gap-[0.3rem]` = 4.8 px (`:104`) |
| `.like-btn` gap | `gap: 0.25rem` (`GalleryCard.vue:284`) | `gap: 0.3rem` (`:224`) |

The two must optically align (they sit side by side in the same stat row) and in neither file do they agree
with each other. **Falsifier.** Show 0.3 vs 0.25 rem is intentional and motivated.

### D-19 · MINOR · duplication — `basisLabels` and `timeAgo` are byte-identical copies of the card's
`:41-56` ≡ `GalleryCard.vue:36-51`; `:58-66` ≡ `GalleryCard.vue:53-61`. Neither is imported from a shared
module even though `basisDisplay` — the data half — already lives in one (`../lib/basis-display.ts`).

Fold: the adjudicated intake **R3-12** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:86`) names
*"`GalleryCard` basisLabels"* as one of the seven duplicated open-family rows that made the Codex instance
denominator over-count by 20 %. This file is why that row is a duplicate. R3-12's verdict is TRUE /
ADOPT-AS-FACT; this challenge supplies its cause.

**Falsifier.** `diff` the two ranges.

### D-20 · MINOR · design/proportion — nested **equal** radii inside a 2 px border
`:73` puts `border-2 rounded-xl` on `DialogContent`; `:75` puts `rounded-xl` on the inner wrapper. With
`--radius-xl: 12px` (glass-ui `dist/styles/theme/radius.css:20`), concentric nesting requires
inner = outer − border-width = 10 px. Equal radii leave a sliver of the parent's surface visible at each
corner. **Falsifier.** Measure a corner (UNPROVEN-NEEDS-LIVE for the pixel; the geometry is arithmetic).

### D-21 · MINOR · glass-ui conformance — the plate de-rungs off `--radius-dialog`, and `cn` cannot see the conflict
glass 4 composes `cn(base, surfaceClass, "rounded-dialog", props.class)`
(`DialogContent-DDE6pQBU.js`, the `D` computed), where `--radius-dialog: var(--radius-2xl)`
(`theme/radius.css:34`) — the library's **named dialog rung**. The consumer overrides it to `rounded-xl`, the
*panel* rung (`theme/radius.css:33`).

Worse, the override is not clean. glass-ui's `cn` is a hand-written category merge, and its `rounded` row
(`cn-DJXf4yaB.js`) is
`/^rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|t|r|b|l|tl|tr|bl|br))?$/` — the **stock Tailwind scale only**.
`rounded-dialog` matches nothing, is therefore uncategorised, and **survives the merge**. Both classes ship
on the element at equal (0,1,0) specificity in the same layer; the corner is decided by Tailwind's utility
emission order, not by the author.

**Falsifier.** Build and inspect the emitted order of `.rounded-dialog` vs `.rounded-xl`
(**UNPROVEN-NEEDS-BUILD**). The *source* claim — that `cn`'s table cannot see glass-ui's own semantic rung,
so two conflicting radii ship — is fully provable from the regex above. (Note: `web/dist/assets/*.css` is
dated **Jun 12** and predates D.W4.c — it contains no `.modal-card`/`.basis-tint` at all — so it is **not**
admissible evidence here, and is not cited as such.)

### D-22 · MINOR · prose/state — the detail view shows **less** than the model carries
`Visualization` (`types.ts:207-238`) carries `title`, `description`, `tags`, `owner_slug`, `fork_of`,
`fork_count`, `version_count`, `pinned`, `updated_at`. The modal renders **none** of them. Its entire content
is: slug, relative time, views, likes, basis pills, `N=`. That is the card's payload (`GalleryCard.vue:107-153`)
plus a bigger image and a CTA — so opening the detail view buys the user a 1024 px render and nothing else.
Notably absent: **who made it** (`owner_slug`) and **what it is** (`title`/`description`).

**Falsifier.** Show those fields are never populated — `VisualizationCreate`/`VisualizationPatch`
(`types.ts:250-253`, `:258-261`) accept all three, so the write path exists.

### D-23 · MINOR · glass-ui conformance — the component re-implements a pressed state the primitive already ships
`:241-244` `.tier-btn[aria-pressed="true"] { background: color-mix(… --foreground 6% …); color: var(--foreground); }`.
glass 4's `outline` variant already carries `aria-pressed:bg-accent aria-pressed:text-accent-foreground`
(`button-BNDWhAZb.js`). The scoped rule wins — Vue scoped `<style>` is **unlayered** and unlayered beats any
`@layer utilities` rule regardless of specificity — so the private recipe silently replaces the shipped one
without saying so. It is also the recipe that will be left over a glass capsule after D-16.
**Falsifier.** Delete `:241-244` and check the primitive's pressed treatment appears.

### D-24 · MINOR · glass-ui conformance — a redundant global focus ring for a button that already has one
`web/src/style.css:136-143` lists `.callout-btn:focus-visible` beside three sidebar/TOC classes, hoisted
global "because Vue's scoped styles add a data-attribute selector". But `.callout-btn` is a glass-ui
`<Button>` (`:181-190`), and the Button CVA base already begins `btn-pill tap-squish focus-ring …`
(`button-BNDWhAZb.js`). The global entry adds a second, differently-shaped ring to the one element in that
list that did not need one. **Falsifier.** Remove the `.callout-btn` selector from `style.css:138` — the ring
survives via `focus-ring`. (The other three selectors in that rule *are* needed; only this one is not.)

### D-25 · MINOR · prose — `timeAgo` truncates at days forever, and is an impure render call
`:58-66` terminates at `` `${Math.floor(h / 24)}d ago` ``: a two-year-old entry reads **"730d ago"**. No
week/month/year rung. It also reads `Date.now()` **during render** (`:59`) with no reactive clock, so the
string freezes at whatever render happened to run and never ticks while the modal is open — and re-runs
non-deterministically on any unrelated re-render. Duplicated defect (D-19): the same code is in
`GalleryCard.vue:53-61`.

### D-26 · MINOR · a11y — the ornamental `𝓕` is inside the CTA's accessible name
`:187` `<span class="fourier-f">&Fscr;</span>` sits inside `<Button>` with no `aria-hidden`. The accessible
name becomes "𝓕 Open Visualizer" — most screen readers voice the codepoint ("script capital F" / "math
script F"). Both neighbours get this right by contrast: lucide auto-adds `aria-hidden="true"` when there is
no a11y prop and no default slot (`lucide-vue-next/dist/esm/Icon.js:41`), and glass-ui 7's dialog glyph is
explicitly `aria-hidden="true"` (`glass-ui/src/components/dialog/DialogContent.vue:217`). `.fourier-f` is a
pure decoration utility (`glass-ui dist/styles/typography/utilities.css:77-85` — font-family, italic, 1.35em).
**Falsifier.** Show `&Fscr;` carries meaning the words "Open Visualizer" do not.

### D-27 · MINOR · a11y — the like button renames itself on every activation
`:114-119`: `:aria-pressed="isLiked"` on a button whose accessible name is
`"{{ entry.likes }} likes"`. Pressing it flips `pressed` **and** renames it ("41 likes" → "42 likes") in the
same beat; AT announces a rename on top of a state change. The count belongs in an
`aria-live`/described-by channel, or the button needs a stable `aria-label`.
**Falsifier.** Show the count is not in the name (`:118-119` are both inside the `<Button>` slot).

### D-28 · MINOR · hygiene — dead `@reference "tailwindcss"` in the scoped block
`:198`. The block `:200-256` contains no `@apply` and no `theme()`, so the reference does nothing. Its
sibling *does* need one (`GalleryCard.vue:190` + `:258` `@apply h-7 w-7 rounded-full …`) — this is a copied
directive. **Falsifier.** Delete `:198` and rebuild.

### D-29 · MINOR · design — the detail view drops the grid's visual motif, and changes three image axes at once
`:77` frames the hero on a flat `bg-muted`. The card frames the *same asset* on a ruled graph-paper gradient
(`GalleryCard.vue:239-251` `.card-image-frame`, two 1 px `--foreground 4%` gradients at 16 px) — the motif
that reads as "this is a plotted contour". With `object-contain` (`:81`) the modal's letterbox bars are the
one place a ruled ground would matter most, and they are blank.

Three independent axis flips between the two views of one asset, none of them stated:
aspect `4/3` → `16/10`; fit `object-cover` → `object-contain`; opacity `85 %` → `100 %`
(`GalleryCard.vue:98-104` vs `:77-82`). **Falsifier.** Name the reason any one of the three changes.

---

## §4 — INFO

- **D-30 · INFO · prose** — the emit signatures name the parameter `hash` (`:26`, `:28`) while every call site
  passes a **slug** (`:115`, `:164`, `:174`). `types.ts:208-211` makes the distinction load-bearing
  (`content_hash: dedup key, never identity (§1)`). Same slip at `GalleryCard.vue:29`; the host propagates it
  (`GalleryView.vue:124 handleLike(hash: string)` receiving `entry.slug`).
- **D-31 · INFO · hygiene** — `:75` `<div class="relative overflow-hidden rounded-xl">` is a redundant
  wrapper: `DialogContent` (`:73`) is already the positioned, clipping, rounded box. Its only net effect is
  D-20's double radius. Residue of the retired Teleport.
- **D-32 · INFO · hygiene** — template indentation breaks from `:76` to `:192`: the wrapper's children sit at
  20 spaces and its own `</div>` closes at 17. Same residue.
- **D-33 · INFO · design** — glyph grammar collides: `Crown`/`Bookmark` are the tier **read-out** at `:89-90`
  and the tier **command** at `:166`/`:176`, with no visual differentiation between "this is featured" and
  "make this featured". A user who sees a crown twice on one plate must infer which one is clickable from
  chrome alone.
- **D-34 · INFO · glass-ui conformance (uplift)** — the `Badge` base drops the `border` keyword at 7.0.0. glass
  4's `outline` = `"text-foreground"` over a base that includes `border` (`badge-UILT_3pZ.js`); glass 7's base
  drops it and `outline` becomes `badge-atom--outline`, whose rim is a `box-shadow: var(--glass-material-rim)`
  **plus** `border: 1px solid color-mix(--foreground 14%)`
  (`glass-ui/src/components/badge/index.ts:6-11`, `src/styles/glass/glass-atom.css:109-122`). `.basis-tint`
  (`:208-212`) sets `border-color` only — post-uplift it re-tints a foreground-keyed hairline it did not
  author, and inherits an unanticipated warm rim shadow. Cosmetic, 1–3 pills per plate.

---

## §5 — SUPERLATIVES (L-18 runs both ways; each carries its falsifier)

- **S-1 · The D.W4.c re-point is correct, and the comment is honest about what it retired.** `:31-35` names
  the primitive, the two prior consumers it follows (`GalleryView.vue:381`, `AdminFlaggedPanel.vue:264`) and
  the four affordances it inherited. Retiring a hand-rolled `Teleport` + `Transition` + Escape listener for
  the library primitive is the glass-ui-first precept executed exactly, and it is *why* Escape-close, the
  focus trap and the scrim are correct here for free. **Falsifier:** show the hand-rolled version was better
  on any axis — reka's `DismissableLayer` + `FocusScope` (`DialogContentImpl.js:66-80`) is strictly more than
  a keydown listener.
- **S-2 · Motion is PRM-safe by inheritance, and the component adds nothing that escapes it.** The entry rides
  `popover-animate` (`utilities/animate.css:10-15`) under glass 4's blanket
  `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: .01ms !important } }`
  (`utilities/a11y-overrides.css:6-31`). The SFC authors **zero** `@keyframes` and **zero** `transition`
  declarations — notably it did *not* copy `GalleryCard.vue:292-302`'s `like-bounce`, which is the one place
  the card needed its own PRM guard (`GalleryCard.vue:304-308`). Fewer moving parts, nothing to guard.
  **Falsifier:** find an animation or transition in `:197-261` (there is none).
- **S-3 · Every colour is a token; not one literal.** `--pill-c` per-instance (`:135`), `--tier-featured` /
  `--tier-saved` (`:215-216`), `--like` (`:229`), `--foreground` via `color-mix` (`:237-255`),
  `VIZ_COLORS.fourier` (`:150`) which itself resolves `--viz-*` off computed style (`lib/colors.ts:1-6`). All
  resolve upstream (`tokens/color-radius.css:264-272`, `tokens/dark-arm.css:141-143`); nothing dangles. The
  dark arm consequently passes **every** leg I could compute (tier-featured 13.13:1, tier-saved 8.87:1,
  like 6.62:1, muted body 7.43:1) — the light arm is the whole of D-02/D-15. **Falsifier:** find a hex or a
  bare `rgb()` in the SFC.
- **S-4 · All three toggles carry `aria-pressed`, and the like state has a non-colour channel.** `:114`,
  `:163`, `:173` — more than most of this cluster does — and `:117` `:fill="isLiked ? 'currentColor' : 'none'"`
  encodes the pressed state as *shape*, so it survives a colour-blind reading and a forced-colors palette,
  where `color: var(--like)` (`:229`) would not. **Falsifier:** name a toggle in `:69-195` without
  `aria-pressed`.
- **S-5 · The scoped block documents each override against the primitive it overrides.** `:205-212`,
  `:218-219`, `:233-234`, `:246-247` each name the chassis (`<Button variant="ghost" size="sm">` …) and state
  what is being narrowed and why. That is the standard the rest of this audit should be held to — and it is
  what made D-16's blast radius cheap to establish. **Falsifier:** find an undocumented scoped override.
- **S-6 · The component is OFF the census's enumerated uplift break surface.** Its three glass imports are
  `/badge`, `/button`, `/dialog` (`:3-5`); all three still exist at 7.0.0
  (`glass-ui/package.json` exports). It touches none of `metric-badge` (×7 files, → `/metric`),
  `hover-card`/`hover-popover` (×4, removed), the dock members (×3), or `ToastVariant`
  (`CENSUS-2026-08-03.md:102-105` / lane-frontend §5). Its only listed exposure is the
  `lucide-vue-next → @lucide/vue` rename, one import (`:10-16`) of the 35. **Falsifier:** find a removed
  subpath in `:1-16`. *(D-16 is a break the census does not list — that is a census gap, not a contradiction
  of this superlative.)*
- **S-7 · The image box is reserved before the bytes arrive.** `:77` `aspect-[16/10]` fixes the frame, so the
  1024 px overlay cannot shift the plate as it decodes — a real CLS discipline the card also keeps
  (`GalleryCard.vue:98`). *(The absence of a loading affordance **inside** that reserved box is D-08; the
  reservation itself is right.)* **Falsifier:** show the frame is height-indeterminate before load.

---

## §6 — THE OLD-PIN LEDGER: what F.W1's tri-package uplift breaks and improves **here**

Pin state: `web/package.json:14` `"@mkbabb/glass-ui": "^4.0.0"`, installed 4.0.0
(`node_modules/@mkbabb/glass-ui/package.json`); producer at **7.0.0**
(`/Users/mkbabb/Programming/glass-ui/package.json`, HEAD `51cfdfaf`). Census §5 🔴: glass 4→7 ∧ keyframes
4.3→6 ∧ value 0.13→4.0 is **one atomic transaction**.

### Breaks

| # | surface | evidence | disposition |
|---|---|---|---|
| **U-1** | `Button variant` removed → **4 dead callsites in this file**, 124 occurrences / 36 files repo-wide | `glass-ui/src/components/button/Button.vue:15-31`; `MIGRATION.md:167,445`; `:110,159,169,182` | = **D-16**. **NOT in the census break surface** (`CENSUS:102-105`) — recommend amendment |
| **U-2** | `size="icon"` removed (`ButtonSize = xs\|sm\|md\|lg` → `iconOnly`) | `Button.vue:16` | Not this file (`sm`/`lg` survive) — but `GalleryCard.vue:159,167,176` ×3, **and** glass 4's coarse 44 px floor keys off `[data-size="icon"]` (`a11y-overrides.css:113-120`), so unmigrated icon buttons silently **lose** the touch floor |
| **U-3** | the **gutter cure is defeated here** | glass 7 authors `inline-size: min(100% - 2*var(--space-section), 32rem)` at `:where([data-slot="dialog-content"])` — **zero specificity** (`dialog/styles.css:22-26`). The consumer's `w-full` (`:73`) is (0,1,0) and **outranks it** | F.W1 will appear to fix flush-to-edge everywhere *except* this modal. Retiring `w-full` is the whole fix. See D-11(a) |
| **U-4** | the **room radius is defeated here**, same mechanism | glass 7 `border-radius: var(--radius-3xl)` at `:where(…)` (`dialog/styles.css:22-23`); consumer `rounded-xl` (`:73`) outranks | The app's other four dialogs move to the room rung; this one stays at 12 px. See D-21 |
| **U-5** | `Badge` outline rim changes shape | `badge/index.ts:6-11`; `glass/glass-atom.css:109-122` | = **D-34**, cosmetic |

Also in scope but not component-specific: `p-0` / `max-w-[28rem]` / `max-h-[90vh]` (`:73`) were written
against glass 4's **inline** base string `grid w-full max-w-lg gap-4 p-6`; at 7.0.0 that string is gone —
geometry moved wholesale into `dialog/styles.css` at `:where()` specificity — so those neutralisers become
overrides of nothing, and `p-0` in particular now *fights* an authored `--space-family` pad the library
intends. All still resolve in the consumer's favour (utilities beat `:where()`), which is exactly the problem
in U-3/U-4: **the uplift's cures cannot reach a plate that hand-rolls its geometry.**

### Improves (free wins, if the hand-rolls are retired)

| # | what gets fixed | evidence |
|---|---|---|
| **I-1** | **Tab order stops disagreeing with visual order.** glass 4 renders the ✕ *after* the slot, so it is the LAST tab stop while reading first — and initial focus lands on the like button (`:109`, the first tabbable). glass 7 authors it FIRST and names the bug: *"The ✕ was reachable last by Tab while reading first visually; it is authored first so tab order, DOM order and visual order agree."* | `DialogContent-DDE6pQBU.js` (slot-then-close) vs `glass-ui/src/components/dialog/DialogContent.vue:202-208` |
| **I-2** | **D-03 dies.** The ✕ becomes `--touch-target` × `--touch-target` (44 px) with a real `:focus-visible` outline and distinct hover/press | `dialog/styles.css:100-131` |
| **I-3** | `opacity-70` retires — *"the shipped `opacity-70` compounded every state into the same wash"* | `dialog/styles.css:97` |
| **I-4** | `scroll` prop owns `max-h-[calc(100dvh-2rem)] overflow-y-auto` — the `dvh` half of D-11(b) | `DialogContent.vue:37,172` |
| **I-5** | the motion axis reacts to a **live** `prefers-reduced-motion` flip; glass 4's spring knob *"was captured non-reactively at setup, so a live flip lost both the bloom AND the spring"* | `DialogContent.vue:66-74` |
| **I-6** | `dismiss: "free" \| "deliberate" \| "locked"` replaces `showClose`. This modal wants `free` = the default — **no migration owed** | `DialogContent.vue:29,43-47,144` |
| **I-7** | curing **D-01** gets *cheaper* post-uplift: `DialogHeader`/`Title`/`Description` gain authored geometry, a √φ type interval, and a `:has()`-scoped ✕ gutter reservation so a long title cannot run under the glyph | `dialog/styles.css:35-84` |

**Net:** three of this file's fourteen MAJORs (D-03, and half each of D-04 and D-11) improve or die at the
uplift *for free*; two (D-11a, D-21) are **actively defeated** by the file's own utility classes; one new
MAJOR (D-16) is created by it. **D-01, D-06, D-07, D-08, D-09, D-10, D-13, D-14 are version-independent and
must be authored either way.**

---

## §7 — CORPUS FOLD (hitherto; cited, not re-invented)

| corpus row | how this challenge relates |
|---|---|
| `lane-frontend.md:105` — "`GalleryCardModal.vue` \| 261 \| Card detail `Dialog`" | Confirmed exactly: 261 lines, `Dialog` + `DialogContent`. **AGREE** |
| `lane-frontend.md:341-343` — the file's three glass imports (`/badge`, `/button`, `/dialog`) | Confirmed at `:3-5`. **AGREE** |
| `CENSUS-2026-08-03.md:102-105` — the uplift break surface | This component is **off** it (S-6) — but the census's list is **incomplete**: the `Button` `variant`→`emphasis` removal (D-16 / U-1) hits 4 callsites here and 124 repo-wide and is unlisted. **EXTENDS the census** |
| `CENSUS:90-91` — the two local upstream carries (`cartoon-card` shim, `--viz-amber` WCAG darken), both glass-BH-relay | D-02 is a **third** carry of the same kind, and a worse one: `--tier-featured` at 1.59:1 vs `--viz-amber`'s 3.54:1. Route it the same way (BH inbox relay per standing law) |
| intake `R3-12` (`lane-fourier-r3-r6.md:86`) — *"`GalleryCard` basisLabels"* among 7 duplicated open-family rows, 20 % over-count | **D-19 supplies the cause**: `:41-56` is a byte-identical copy of `GalleryCard.vue:36-51`. The duplicate row is this file. **AGREE + explains** |
| intake `R5-7` (`:125`) — loop evidence keyed to *component* callsites is blind to native element loops | Bears directly on this file: its only two loops are `v-for` on a **`<Badge>`** (`:130`) and nothing else — so a component-keyed deriver sees this component's loop coverage as *complete*, which is a false negative in the other direction. Flagged for F.W4's per-component denominator |
| intake `X-9` (`:160`) — "the formation must pick and publish one scope law" | Reinforced: I could not state a defect *rate* for this file without one. All counts here are absolute, none are percentages |
| `CENSUS:256` — "[P2] Uplift lands with no unit-test net"; only gates are `vue-tsc` + 29 single-chromium Playwright tests | Sharpened: **eleven** of this file's 34 defects (D-01, D-03, D-04, D-05, D-06, D-07, D-09, D-11, D-12, D-13, D-14) are invisible to both gates. `vue-tsc` will not see D-16 as an error either, because an unknown prop falls through as an attribute |
| `CENSUS:90-91` / `style.css:129-143` — the D.W4.d focus-ring hoist | D-24: the `.callout-btn` member of that rule is redundant against glass-ui's own `focus-ring`; the other three members are not |

**Explicit contradiction of the corpus:** none found. The one *extension* is D-16/U-1 (census break surface
incomplete). The one *correction* offered is to `CENSUS:102-105`, by amendment, not by dispute.

---

## §8 — TALLY

| severity | ids | n |
|---|---|---:|
| **BLOCKER** | D-01, D-02 | **2** |
| **MAJOR** | D-03 … D-16 | **14** |
| **MINOR** | D-17 … D-29 | **13** |
| **INFO** | D-30 … D-34 | **5** |
| | **defects** | **34** |
| **SUPERLATIVE** | S-1 … S-7 | **7** |

**Marked UNPROVEN-NEEDS-LIVE (SS-13):** the measured worst-case ✕-over-image ratio (D-04); the iOS-Safari
`90vh` clip in pixels (D-11b); the rendered corner sliver (D-20). **UNPROVEN-NEEDS-BUILD:** which of
`rounded-dialog` / `rounded-xl` wins emission order (D-21). Every other claim is source-derivable from the
files cited.

**Read-only compliance.** `/Users/mkbabb/Programming/fourier-analysis` and
`/Users/mkbabb/Programming/glass-ui` were read only. No product source in any repo was written. This file is
the single write.
