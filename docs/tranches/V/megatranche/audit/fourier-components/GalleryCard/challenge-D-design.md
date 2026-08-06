claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryCard.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryCard.vue` (309 lines)
**Substrate.** fourier `cd26c65` (unmoved — intake §0), glass-ui pin `^4.0.0` / installed **4.0.0**, producer **7.0.0** at `/Users/mkbabb/Programming/glass-ui`.
**Method.** Static + source-derived only. No browser. Contrast figures are computed from the shipped token values (OKLCH→sRGB→WCAG relative luminance) — token-decidable, therefore in scope; anything needing a live paint is marked `UNPROVEN-NEEDS-LIVE`.
**Law.** fourier-analysis and glass-ui were read-only. The only write is this file.

**Read whole:** the SFC; `visualization/lib/basis-display.ts`; `lib/colors.ts`; `lib/types.ts` (`Visualization`); `lib/api.ts` (`thumbnailUrl`); `components/ui/PathPreview.vue`; `style.css`; glass-ui 4.0.0 `dist/{badge,button}.d.ts` + the compiled `badge-UILT_3pZ.js` / `button-BNDWhAZb.js` CVA tables + `cn-DJXf4yaB.js` + the Checkbox render fn + `dist/styles/{index,tokens/*,utilities/*,cards}.css`; producer 7.0.0 `src/components/{badge,button}/*` + `src/components/_shared/class-names.ts` + `src/styles/{tokens,theme,utilities}/*`; siblings `GalleryCardModal.vue`, `GalleryInfiniteGrid.vue`, `GalleryView.vue`, `App.vue`; `api/routers/visualizations.py`.

**Verdict.** The component is DEFECTIVE. Two of its three motion declarations are dead CSS; its keyboard contract disables every control nested inside it; its selection state is invisible on exactly the cards an admin selects; its pill colours are frozen at module-eval and fail AA in dark mode by measurement; and the F.W1 uplift breaks all four of its `<Button>` callsites through a prop-API rename the CENSUS break-surface does not enumerate. Against that: its `content-visibility` adoption, its token discipline, and its consumer-side variant-projection idiom are genuinely exemplary and are recorded as such (L-18 runs both ways).

**Tally.** 23 defects — **2 BLOCKER**, 6 MAJOR, 10 MINOR, 5 INFO — and 4 superlatives.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · `--ease-apple-spring` does not exist — the card's entire motion layer is dead CSS

`GalleryCard.vue:194-198`

```css
transition:
    transform 0.25s var(--ease-apple-spring),
    box-shadow 0.2s var(--ease-standard),
    border-color 0.2s var(--ease-standard);
```

`GalleryCard.vue:295` — `animation: like-bounce 0.3s var(--ease-apple-spring);`

**The token is defined nowhere reachable.**

| probe | result |
|---|---|
| `grep -rn "ease-apple-spring" web/src` | 6 hits, **all consumers**, 0 definitions |
| `grep -rn "ease-apple-spring" web/node_modules/@mkbabb/` | 1 hit — `README.md:211`, a **doc claim**, not CSS |
| glass-ui 4.0.0 `dist/styles/tokens/scheme-motion.css:216-227` | ships `--ease-standard`, `--ease-out`, `--ease-in`, `--ease-out-expo`, **`--ease-apple`**, `--ease-spring`, `--ease-decelerate`, `--ease-accelerate` — **no `-apple-spring`** |
| producer 7.0.0 `src/styles/tokens/scheme-spring.css:158-166` + `theme/bridges.css:355-359` | same eight; **still absent at 7.0.0** |

**Consequence — sharper than the prior art.** fourier's own `docs/audits/runs/2026-06-17-M-critique-audit/findings-index.txt:444` books this as `E5-08` and says the sites "resolve to `unset`, degrading those transitions to browser-default `ease`". **I contradict that reading.** A `var()` reference to an undefined custom property makes the declaration *invalid at computed-value time*, and IACVT applies to the **whole shorthand**, not the one longhand:

- `:195-198` → `transition-property`/`-duration`/`-timing-function`/`-delay` all reset to initial ⇒ `transition-duration: 0s`. The hover lift (`:209-213`), the border-colour change, and the shadow swap are **instantaneous jumps**, not a 0.25s spring. Not "degraded easing" — **no transition at all**, including the two `--ease-standard` legs that are themselves perfectly valid.
- `:295` → `animation-name` resets to `none`. **`like-bounce` (`:298-302`) never plays.** The keyframe block is unreachable code, and the reduced-motion guard at `:304-308` guards nothing (see D-9).

**Falsifier.** Define `--ease-apple-spring` anywhere in the cascade above the SFC and both declarations become valid. Nothing in `web/src/**` (incl. `style.css`, read whole) or `@mkbabb/*` does. **The F.W1 uplift does NOT cure this** — I checked the producer, not just the pin. It must be cured by hand: `--ease-spring` (= `var(--spring-snappy)`) or `--spring-bouncy` are the in-catalogue substitutes.

**Cross-repo.** `@mkbabb/glass-ui/README.md:211` advertises a token the library has not shipped in at least four majors. Per the standing BH/BI relay law this is a glass-ui inbox item, not a fourier one.

---

### D-2 · BLOCKER · The card's keydown handlers disable every control nested inside it

`GalleryCard.vue:70-80`

```html
<div class="gallery-card …" role="button" tabindex="0"
     @click="emit('click')"
     @keydown.enter.prevent="emit('click')"
     @keydown.space.prevent="emit('click')">
```

There is no `.self` modifier and no `event.target` guard. The card hosts **five focusable descendants**:

| descendant | lines |
|---|---|
| `<Checkbox>` (reka-ui → `<button role="checkbox">`) | `:90-95` |
| like `<Button variant="ghost">` | `:135-145` |
| admin `<Button>` ×3 (featured / saved / delete) | `:157-165`, `:166-174`, `:175-183` |

`keydown` from any of them **bubbles to the card**. Two things then happen at once: `emit('click')` fires (the parent opens the detail modal — `GalleryInfiniteGrid.vue:35` → `GalleryView`), and `.prevent` calls `preventDefault()`. Per the HTML activation model a `<button>`'s Enter activation is a *default action* of the keydown, run after dispatch completes and only if the canceled flag is unset — so the ancestor's `preventDefault()` **cancels the descendant's own click**.

**Net user-visible defect: keyboard-activating the Like button, the multi-select checkbox, or any of the three admin buttons opens the card modal instead of performing the action.** The mouse path is fine (`@click.stop` at `:89`, `:141`, `:156`), which is exactly why this survives casual testing.

The comment at `:65-69` claims the element was "lifted to the canonical ARIA button-on-non-button pattern". It was lifted to *half* of it. The canonical pattern additionally requires that a `role="button"` contain **no focusable descendants** (ARIA: a `button` is a leaf widget) — a rule this markup violates five times over — and that the synthetic handler be scoped to the host.

**Falsifier.** `@keydown.enter.self` / `@keydown.space.self`, or `@keydown="e => { if (e.target !== e.currentTarget) return; … }"`, closes it. Neither is present. Enter is CONFIRMED-BY-SPEC; the Space leg additionally depends on the engine's keydown-canceled gate before its keyup activation — Chromium/Gecko/WebKit all honour it, but I mark the Space half `UNPROVEN-NEEDS-LIVE` for SS-13 and stand on Enter alone, which is sufficient.

---

## §2 — MAJOR

### D-3 · MAJOR · Batch-selection is invisible on featured and saved cards — and the comment asserts the opposite

`:219-236`

```css
/* A.W5.c — selected-for-batch state. The ring projects the focus token over
   the card surface so the selection registers without competing with tier. */
.gallery-card[data-selected] { border-color: var(--ring); box-shadow: 0 0 0 2px …, var(--shadow-cartoon); }   /* :221 */
.gallery-card[data-tier="featured"] { border-color: var(--tier-featured); box-shadow: 0 0 12px …; }            /* :228 */
.gallery-card[data-tier="saved"]    { border-color: var(--tier-saved);    box-shadow: 0 0 8px …; }             /* :233 */
```

All three selectors are `.class[attr]` + Vue's scope attribute — **identical specificity (0,3,0)**. Source order therefore decides, and `[data-selected]` is declared **first**. Tier wins `border-color` *and* `box-shadow`, so a selected featured/saved card loses **both** selection channels and is pixel-identical to an unselected one.

The prose says the ring "registers without competing with tier". The cascade does the exact opposite: it loses the competition outright.

**Falsifier.** Move `:221-225` below `:236`, or raise it to `.gallery-card[data-selected][data-selected]`. Neither is done. Ordinary cards (`tier === 'normal'`, the majority) DO show selection — which is why this reads as working. It fails precisely on the tier-bearing cards an admin is most likely to batch-operate.

---

### D-4 · MAJOR · The basis-pill inks are frozen at module-eval and fail AA in dark mode (measured)

`basis-display.ts:1-7`

```ts
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon: string; label: string; color: string}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },   // reads the STRING at import time
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

`lib/colors.ts:77-86` seeds `VIZ_COLORS` (a `reactive()`) with hard-coded light-ish hexes `#bf4040 / #3d72b8 / #9545b8`; `resolveVizColors()` (`:89-96`) rewrites them from `--viz-*`, and it is wired correctly — `App.vue:11` on mount plus a `MutationObserver` on the theme class at `App.vue:13`. But `basisDisplay` **copied the strings into a plain object during module evaluation**, outside any effect. No dependency was tracked. `GalleryCard.vue:48` reads `cfg.color` → `:121` binds `--pill-c`. **The pill ink is permanently the seed hex, in both themes.**

Measured (OKLCH→sRGB, WCAG 2.x; text = `var(--pill-c)` over the composited plate `color-mix(--pill-c 12%, transparent)` over `--card`):

| basis | frozen ink | light | **dark** | if the token were read live (dark) |
|---|---|---:|---:|---:|
| Fourier | `#bf4040` | 4.17 | **2.55** | 4.17 |
| Chebyshev | `#3d72b8` | 3.97 | **2.67** | 4.70 |
| Legendre | `#9545b8` | 4.40 | **2.42** | 4.83 |

Dark `--card` = `hsl(24 8% 16%)` (`tokens/dark-arm.css:64`). The pill's type size is `--control-text-sm` (= `--type-caption`, badge `size="sm"`, `badge-UILT_3pZ.js`) — normal text, floor **4.5:1**. All three dark figures are below even the 3:1 large-text floor. Light mode is marginal-failing too (3.97–4.40), so the `.basis-tint` recipe (`:270-274`) is contrast-fragile by construction — tinting the plate *with the ink's own hue* means the plate always drifts toward the text.

**In-tree corroboration that this is a deviation, not a house style:** `GalleryCardModal.vue:154` binds `:style="{ color: VIZ_COLORS.fourier }"` — reading the reactive object **directly**, which tracks correctly. The modal got it right; the card (and the modal's own pill row, which re-imports `basisDisplay`) did not.

**Falsifier.** Make `color` a getter, or have `basisLabels` read `VIZ_COLORS[key]` at compute time. Either restores reactivity. Also: if the seed hexes happened to equal the resolved dark tokens the drift would be cosmetic — they do not (`--viz-fourier` dark = `oklch(0.693 0.151 28.1)`, `tokens/dark-arm.css:113`).

---

### D-5 · MAJOR · The tier indicator fails WCAG 1.4.11 in light mode (1.56:1)

`:149-152` — the tier glyph is the *only* footer indication of tier:

```html
<div v-if="entry.tier !== 'normal'" class="… w-6 h-6 rounded-full" :data-tier="entry.tier">
  <Crown    v-if="entry.tier === 'featured'" :size="12" class="text-tier-featured" />
  <Bookmark v-else-if="entry.tier === 'saved'" :size="12" class="text-tier-saved" />
```

Non-text graphic conveying information ⇒ SC 1.4.11 floor **3:1**. Computed against `--card`:

| token | light value (`tokens/color-radius.css:270-271`) | light | dark (`dark-arm.css:141-142`) |
|---|---|---:|---:|
| `--tier-featured` | `oklch(0.841 0.173 84.2)` | **1.56** ✗ | 9.68 ✓ |
| `--tier-saved` | `oklch(0.676 0.176 252.3)` | **2.77** ✗ | 6.54 ✓ |

The same inks carry the card's *other* two tier channels — the border at `:229`/`:234` and the admin Crown/Bookmark at `:160`/`:169` — so in light mode the entire featured/saved signal is a pale wash at ~1.6:1. There is no redundant text, no `aria-label`, no `title` on the glyph: an amber-blind or low-contrast-display user has **no** channel for tier at all.

**Falsifier.** Computed against `--card` (`hsl 36 48% 97%`). Against the page `--background` (`hsl 40 30% 98%`) it is *worse*, not better. Dark mode passes both. The defect is light-mode-specific and token-decidable; nothing about the live paint can rescue 1.56:1.

---

### D-6 · MAJOR · Zero error and loading state on the one element the card exists to show

`:98-105`

```html
<div class="card-image-frame relative aspect-[4/3] overflow-hidden …">
  <img :src="thumbnailUrl(entry.image_slug)" :alt="entry.image_slug"
       class="w-full h-full object-cover opacity-85" loading="lazy" />
</div>
```

`thumbnailUrl` (`lib/api.ts:292-294`) is a bare URL builder — no existence guarantee, and `image_slug` is a foreign key to a separately-lifecycled asset (`types.ts:212` "image asset FK"). There is **no `@error` handler, no `@load`, no placeholder, no skeleton, no `decoding` hint, and no intrinsic `width`/`height`**. A 404 / expired / migrating asset paints the UA broken-image glyph plus the raw slug as alt text, on top of the grid plate — the worst-looking of the three possible failure renderings.

Nothing upstream covers it either: `GalleryInfiniteGrid.vue:44-49` provides a page-level spinner and `GalleryView.vue:281` a cold-empty CTA, but per-card image failure has no owner anywhere in the chain.

**Falsifier.** If `thumbnailUrl` were server-guaranteed (a placeholder-on-miss endpoint) the handler would be redundant. It is not — it is a plain template string over `${BASE}/api/images/${imageSlug}/thumbnail`.

---

### D-7 · MAJOR · The card never renders the entry's human identity

`types.ts:207-239` gives `Visualization` a `title`, a `description`, `tags`, an `owner_slug`, `n_harmonics`, `fork_count`, `version_count`. The card renders exactly two facts about the entry: `entry.image_slug` (`:109`) and a relative timestamp (`:110`).

`image_slug` is documented in its own type as an **asset foreign key** (`types.ts:212`), i.e. a machine token. It is rendered `font-mono … truncate` — a truncated hash-shaped string is the browse surface's primary label, its `alt` text (`:101`), and its accessible name (`:74`, `Open ${entry.image_slug}`).

`grep -rn "entry.title\|viz.title\|item.title" web/src` → **0 hits** repo-wide. Even `GalleryCardModal.vue` omits it (it surfaces `n_harmonics` at `:151` and nothing else identity-bearing). So the API's authoring fields are write-only: a user can title and describe a visualization and never see it anywhere in the product.

Compounding: `n_harmonics` — arguably *the* identifying parameter of a Fourier reconstruction, and the one thing the modal does show — is absent from the card, while a relative timestamp of near-zero discriminative value occupies a full quarter of the header row's width at equal weight.

**Falsifier.** If `title` were always null in practice the omission would be moot — but `VisualizationCreate` (`types.ts:241-255`) and `VisualizationPatch` (`:256-262`) both accept it, and `VisualizationRemix` (`:354-366`) carries it forward across the provenance chain, so it is a first-class field of the CRUD union F.W-* is chartered to prove.

---

### D-8 · MAJOR (uplift) · F.W1 breaks all four `<Button>` callsites here — via a rename the CENSUS break surface does not enumerate

CENSUS-2026-08-03 `:102-105` and `:184-186` enumerate the 4→7 break surface as: removed **subpaths** (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), removed **dock members** (×3), `ToastVariant`, the lucide rename, pencil-boil. **The `Button` prop-API re-cut is not on that list.** It should be, and it is larger than everything on it combined.

Producer `src/components/button/Button.vue:15-31`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← `variant` is GONE
    tone?: Tone;
    size?: ButtonSize;           // ← "icon" and "default" are GONE
    iconOnly?: boolean;          // ← the new seat for square geometry
    loading?: boolean;
    …
```

versus the pin (`dist/components/ui/button/index.d.ts`), which ships `variant: link|default|solid|primary-audacious|gold-audacious|destructive|outline|secondary|accent|ghost|glass|glass-wash|ai` and `size: default|xs|sm|lg|icon|icon-sm`. **Every value fourier passes is retired.**

This file, 4 callsites, 8 breaking attributes:

| line | today | status at 7.0.0 |
|---|---|---|
| `:136-137` | `variant="ghost" size="sm"` | `variant` absent → **typecheck break**; `size="sm"` survives |
| `:158-159` | `variant="glass" size="icon"` | both absent → **two breaks** |
| `:167-168` | `variant="glass" size="icon"` | both absent → **two breaks** |
| `:176-177` | `variant="glass" size="icon"` | both absent → **two breaks** |

Repo-scale, scanned by parsing `<Button …>` open tags across `web/src/**/*.vue`: **96 `variant=` attributes and 77 `size=` attributes over 35 files** — including 48 `ghost`, 25 `outline`, 11 `glass`, 37 `size="icon"`, 32 `size="sm"`. Against the census's named surface (7 + 2 + 2 + 3 + 1 = **15 sites**), the Button re-cut is **an order of magnitude larger**, and unlike a subpath rename it is not mechanically greppable-and-substitutable — `ghost`→`quiet`, `glass`→`secondary`, `outline`→? are *design* decisions per callsite.

**Falsifier.** A back-compat `variant` alias on the 7.0.0 Button would void this. I read `Button.vue:15-40` whole — `withDefaults(defineProps<ButtonProps>(), { emphasis: "secondary", … })`, no alias, no deprecation shim; and the repo's standing `feedback_no_backwards_compat` law says there will not be one. The Badge, by contrast, keeps `variant="outline"` and `size="sm"` (see S-2) — so this is a Button-specific break, correctly scoped.

**Uplift IMPROVE at the same seam:** 7.0.0's `loading?: boolean` is the missing state for the three admin commands here (`:157-183` fire `set-tier` / `delete` with no in-flight or optimistic feedback whatsoever — see D-15's sibling concern), and `iconOnly` is a better-named seat than the retired `size="icon"`.

---

## §3 — MINOR

### D-9 · MINOR · The scoped reduced-motion block is doubly redundant; the real PRM residue is elsewhere

`:304-308` guards `like-bounce`. It is redundant twice:

1. **Dead animation** (D-1) — `animation-name` is already `none`.
2. **Already covered globally** — glass-ui 4.0.0 `dist/styles/utilities/a11y-overrides.css:6-16` ships
   ```css
   @media (prefers-reduced-motion: reduce) {
     *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
     *:not([data-allow-motion]) { transition-duration: .1s !important;
       transition-property: opacity, color, background-color, border-color, box-shadow !important; }
   }
   ```
   which neutralises every animation in the document.

**This CORRECTS the direction a naive read of the file invites.** The card's `transform` hover (`:210`) and press (`:216`) and `.admin-overlay-btn`'s `scale(1.1)`/`scale(0.95)` (`:260-265`) look "unguarded" but are not: the global rule forces `transition-property` off `transform`, so under PRM those become **instant, non-animated** offsets — which is the correct PRM outcome, not a violation. The honest residue is only that the 4px lift + 2% scale still *happens* as a jump; that is a design-judgement call, not an SC failure.

Recommendation: delete `:304-308`; it is dead code that documents a guarantee the house sheet already owns and the file's own broken token had already voided.

### D-10 · MINOR · Six unreconciled gap values and three unreconciled vertical rhythms in a 224px tile

`gap-1.5` (`:108`) · `gap-1` (`:114`) · `gap-3` (`:130`) · `gap-1` (`:131`) · `gap-1` (`:156`) · `gap-[0.2rem]` (`:120`) · `gap: 0.25rem` (`:282`). Vertical: `pt-2 pb-1` (`:108`) → `py-0.5` (`:114`) → `pt-1.5 pb-2` (`:129`). Horizontal is the one disciplined axis (`px-3` throughout).

That is 0.2/0.25/0.25/0.375/0.75 rem of gap and 0.125/0.25/0.375/0.5 rem of vertical padding, in a cell whose minimum track is 14rem (`GalleryInfiniteGrid.vue:28`). No modular relationship holds between any pair; the `gap-[0.2rem]` arbitrary value at `:120` is the tell — it exists to shave 0.175rem off the Badge base's `gap-1.5`, a delta below the perceptual threshold at that type size. glass-ui ships a `--space-*` scale these could ladder onto.

### D-11 · MINOR · Two dead imports, one of them CSS-bearing

`:9` `import { VIZ_COLORS } from "@/lib/colors";` — zero references in script or template (the pill colours come via `basisDisplay`, which does its own import).
`:10` `import PathPreview from "@/components/ui/PathPreview.vue";` — zero references in the template.

`PathPreview.vue` carries a `<style scoped>` block, so the SFC module has a CSS side effect and is not reliably eliminated by Rollup's side-effect analysis. Beyond bytes: an unused `PathPreview` import on a *gallery card* strongly implies a designed-and-abandoned contour-preview affordance — which would have been the one genuinely fourier-specific thing the card could show (cf. D-7).

### D-12 · MINOR · No typographic hierarchy — every text token on the card is the same size and the same colour

`:109` slug → `text-sm text-muted-foreground`. `:110` timestamp → `text-sm text-muted-foreground`. `:131` views → `text-sm text-muted-foreground`. `:283-284` `.like-btn` → `font-size: 0.875rem; color: var(--muted-foreground)`. That is 100% of the card's prose at one size and one ink.

`--muted-foreground` itself is fine — measured **5.12:1** light (`neutral-5` `hsl(30 22% 40%)` over `--card`) and **5.68:1** dark (`hsl(34 14% 62%)`), clearing AA with margin. The defect is not legibility, it is **rank**: the identifier, the timestamp, and two stat counters are typographically indistinguishable, so the eye has no entry point and the tile reads as a caption block rather than a titled object. The Aristotelian complaint is proportion of *emphasis*, not of space.

### D-13 · MINOR · `timeAgo()` is non-reactive, unbounded, machine-illegible, and silent on skew

`:53-61`

- Called directly in the template (`:110`), so it is a render-time snapshot; a card sitting in an open grid says "just now" indefinitely (there is no ticking clock and no `key` churn — `GalleryInfiniteGrid.vue:31` keys on `entry.slug`).
- No `<time :datetime>` wrapper and no `title` with the absolute date ⇒ no machine-readable timestamp, no hover disambiguation, nothing for an AT to read as a date.
- The day bucket is unbounded: `${Math.floor(h / 24)}d ago` renders `"612d ago"`. No week/month/year rollover.
- Negative deltas fall into `m < 1 → "just now"` (`:56`). A future-dated `created_at` — or a client clock behind the server, or a naive (tz-less) timestamp read back from Mongo and parsed by JS as **local** time — silently renders every recent entry as "just now" rather than surfacing anything. The write path is tz-aware (`api/routers/visualizations.py:184` `datetime.now(UTC)`), so this is a robustness gap rather than a live break; flagged `UNPROVEN-NEEDS-LIVE` pending the driver's `tz_aware` setting.

### D-14 · MINOR · `class="h-4 w-4"` on the Checkbox is a no-op that reads as an override

`:93`. glass-ui 4.0.0's Checkbox already declares, in its own base string (`dist/glass-ui.js`, checkbox render fn): `group tap-squish focus-ring peer relative touch-hit-area h-4 w-4 shrink-0 rounded-control border border-primary transition-control …`.

The consumer class is byte-identical to the base and changes nothing. **This corrects an attractive-looking finding I initially drafted and then falsified:** a 16px checkbox looks like a WCAG 2.5.5 / 2.5.8 target-size failure, but glass-ui's `touch-hit-area` utility (`utilities/a11y-overrides.css:150-170`) mints a centred 44×44 `::before` halo under `@media (pointer: coarse)` — the target is compliant on touch and byte-identical on fine pointers by design. **No a11y defect here.** The residual defect is only the redundancy, plus the trap it sets: if the base ever moves off `h-4 w-4`, this restatement silently pins the old size (and `cn()`'s conflict table buckets `h-`/`w-` separately from `size-`, so a base switch to `size-4` would leave both in play).

### D-15 · MINOR · Empty and unknown basis lists leave a phantom padded strip

`:114` — the wrapper renders unconditionally with `px-3 py-0.5`:

```html
<div class="flex flex-wrap gap-1 px-3 py-0.5">
  <Badge v-for="b in basisLabels" …>
```

`basisLabels` (`:36-51`) is empty when `active_bases` is `[]` **or** when every entry misses `basisDisplay` — and unknown keys are dropped *silently* at `:41` (`if (!cfg) return null` → filtered at `:50`). `basisDisplay` (`basis-display.ts:3-7`) knows exactly three keys: `fourier`, `chebyshev`, `legendre`. Any future basis renders as *nothing*, indistinguishable from a card with no bases, and the card silently loses 0.25rem of height mid-grid.

No `v-if="basisLabels.length"` on the row, no em-dash/"no bases" affordance, no dev warning on the drop.

### D-16 · MINOR · `z-5` is off the house z-scale

`:87` and `:156`. glass-ui ships a named z register — `z-dock`, `z-popover`, `z-modal`, `z-overlay`, `z-toast`, `z-tooltip`, `z-hovercard`, all backed by `--z-*` (`dist/styles/components.css`). Two bare integers inside a stacking context minted by `content-visibility: auto` (`:199`) is exactly the situation the named scale exists to keep legible. Valid Tailwind v4 (bare `z-<number>` is supported); non-conformant to the design system.

### D-17 · MINOR (uplift-adjacent) · On a coarse pointer the admin chrome consumes most of the thumbnail's top band

`:156` pins three buttons `top-1.5 right-1.5` with `gap-1`; `:257-259` sizes them `@apply h-7 w-7` (28px). But glass-ui's Button stamps `data-size="icon"` on the DOM node (`button-BNDWhAZb.js`, `:data-size="size"`), and `utilities/a11y-overrides.css:115-122` says:

```css
@media (pointer: coarse) {
  [data-size="icon"], … { min-block-size: var(--touch-target, 2.75rem); min-inline-size: var(--touch-target, 2.75rem); }
}
```

`min-block-size` beats `height`, so on touch each button is **44×44**, not 28×28. Three of them plus two 4px gaps ≈ **140px** of a 224px minimum track (62%), with the 24px checkbox wrapper pinned opposite at `:87`. The `:hover { transform: scale(1.1) }` at `:260-262` pushes the row to ~148px.

The scoped `h-7 w-7` is therefore not "a 1.75rem circle" as `:253-256` claims — it is 28px on desktop and 44px on touch, and the comment does not know that. **The house sheet rescues the touch target (so there is no 2.5.5 defect — a second attractive finding I falsified), but the layout was proportioned for the desktop number only.** `UNPROVEN-NEEDS-LIVE` for the exact overlap; the cascade mechanism is proven from the two files above.

### D-18 · MINOR · `:alt` and `aria-label` both spend the same opaque token

`:74` `:aria-label="`Open ${entry.image_slug}`"` and `:101` `:alt="entry.image_slug"`. The alt text is a content-addressed asset slug, not a description of the image — it fails the purpose of alt entirely (a screen-reader user learns nothing about a *visualization* from its FK). And because the container carries its own `aria-label`, the slug is the only thing an AT user hears about the card, twice over in browse mode. Since the card's accessible name already covers the object, the image is decorative in context and `alt=""` would be the correct call — or, better, the alt should carry what D-7 says the card should be showing anyway.

---

## §4 — INFO

### D-19 · INFO · Four stale or false prose claims in the comment blocks

| line | claim | tree |
|---|---|---|
| `:253-256` | "The base `<Button variant="glass" size="icon">` ships an `h-10 w-10` square" | 4.0.0 ships `h-(--control-h-md) w-(--control-h-md)` — token-driven, `--ui-scale`-aware, coarse-floored (`button-BNDWhAZb.js`; `tokens/offsets-sizing.css:151`). Numerically 2.5rem at scale 1, but the claim mis-states the *mechanism*, which is what D-17 turns on. |
| `:267-269` | "Outline ships transparent-bg + border-input" | 4.0.0's badge `outline` variant is exactly the string `"text-foreground"` (`badge-UILT_3pZ.js`). No bg utility. No `border-input`. The border-*width* comes from the base's bare `border`; the colour was `currentColor` before `.basis-tint` set it. |
| `:219-220` | "the ring … registers without competing with tier" | Inverted by the cascade — D-3. |
| `:65-69` | "Lifted to the canonical ARIA button-on-non-button pattern" | Half of it — D-2. |

Comment prose in this file is unusually dense and unusually load-bearing (it carries wave provenance `A.W2.e` / `A.W3.d` / `A.W5.c` / `D.W4.c` / `J.W4`), which raises rather than lowers the cost of a stale claim: a future wave will trust it instead of the dist.

### D-20 · INFO · `rounded-full` does not dedupe the base's `rounded-badge` at the pin — the producer's own "O-7" defect, fixed at 7.0.0

`:120` passes `rounded-full`. glass-ui 4.0.0's `cn()` radius rule (`cn-DJXf4yaB.js`) is
`["rounded", /^rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|t|r|b|l|tl|tr|bl|br))?$/]` — `rounded-badge` **matches nothing**, falls through unbucketed, and both classes ship; stylesheet order, not call order, decides. The producer names and fixes this at 7.0.0 (`_shared/class-names.ts:143-175`: per-corner/per-side buckets plus an open-value shorthand, with a comment calling out `rounded-badge` by name as "the O-7 defect: the override silently no-ops").

**Inert here**: `--radius-badge: var(--radius-pill)` at both 4.0.0 (`theme/radius.css:46`) and 7.0.0 (`theme/radius.css:163`), so the two classes compute the same pill. Cost is bytes, not pixels — and the class can simply be dropped.

### D-21 · INFO · The uplift will silently mirror the card's stamp shadow

`:193` / `:212` consume `--shadow-cartoon` / `--shadow-cartoon-hover`. Both survive to 7.0.0, but the **value flips sign**:

| | 4.0.0 (`tokens/shadow.css:9-10`) | 7.0.0 (`tokens/shadow.css:13-14`) |
|---|---|---|
| `--shadow-cartoon` | `3px 3px 0 0 color-mix(--foreground 8%, transparent)` | `-3px 3px 0 0 var(--cartoon-ink-lead)` |
| `--shadow-cartoon-hover` | `4px 4px 0 0 color-mix(--foreground 10%, transparent)` | `-4px 4px 0 0 var(--cartoon-ink-lead)` |

Every `.gallery-card` stamp moves from bottom-**right** to bottom-**left** at F.W1, with no source change and no typecheck signal. Worth a visual-regression checkpoint in the uplift wave (and it touches the 25 `@utility cartoon-card` shim sites at `style.css:107` too).

### D-22 · INFO · `:key="b.label"` is a derived, collision-capable key

`:117`. The key is the display label, computed at `:42-47`, not the source basis id. `["fourier-epicycles", "fourier-epicycles"]` yields duplicate `"Epicycles"` keys. Directly cited by the adjudicated intake — **`lane-fourier-r3-r6.md` row R3-12** names "`GalleryCard` basisLabels" as one of the seven duplicated open-family records behind the 35→28 collapse (verdict TRUE, ADOPT-AS-FACT). Keying on `b` (the raw basis string) is free and exact.

### D-23 · INFO · The thumbnail is permanently veiled and unconditionally cropped

`:102` `class="w-full h-full object-cover opacity-85"`. The card's entire reason to exist is dimmed 15% at rest with no hover-restore, and `object-cover` inside a hard `aspect-[4/3]` frame (`:98`) crops any contour whose bounding box is not 4:3 — which, for extracted contours, is most of them. The `.card-image-frame` grid plate (`:239-251`) is designed as an underlay for a *contained* image; `object-cover` guarantees it is never seen.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The `content-visibility` adoption is the best-reasoned thing in the file

`:199-206`. It consumes glass-ui's `.deferred-section` utility rather than hand-rolling `content-visibility`; it sets a **per-consumer** `--deferred-section-size: 17rem` against the utility's 30rem default; and its comment names the exact trap the utility's own author documents — that plain `contain-intrinsic-size: <len>` freezes the section and thrashes the scrollbar while `auto <len>` caches the real size (`utilities/base.css:466-480`). It also books the no-support floor (`inv-29`) and defers the measurement to a named wave rather than asserting a win.

**Verified, not taken on trust:** the utility exists at `utilities/base.css:477-480` at the pin and survives to 7.0.0 (`utilities/base-misc.css`); the 17rem estimate is sane against the grid's `minmax(14rem, 1fr)` track (`GalleryInfiniteGrid.vue:28`) plus a 4:3 image and three text rows.
**Falsifier I ran:** a single-value `contain-intrinsic-size` also floors the *inline* axis, which would corrupt an intrinsically-sized grid. The grid uses `repeat(auto-fill, minmax(14rem, 1fr))` — definite tracks — so the inline contribution is never consulted. The claim survives.

### S-2 · GalleryCard is clean on **every** member of the census's declared 4→7 break surface

Its three glass-ui imports (`:3-5`) are `@mkbabb/glass-ui/button`, `/badge`, and root `Checkbox`. Cross-checked against CENSUS `:102-105`: **zero** `metric-badge`, **zero** `hover-card`, **zero** `hover-popover`, **zero** dock members, **zero** `ToastVariant`. All three subpaths/symbols still exist at 7.0.0 (`./button`, `./badge` in the producer's export map; `Checkbox` at `src/index.ts:124`).

Better: the **Badge** contract survives the 7.0.0 re-cut *unchanged*. The producer collapsed `variant` from seven values to three and moved the semantic set to a new `tone` axis plus a new `surface` axis (`src/components/badge/index.ts:8-31`) — and `variant="outline"` and `size="sm"`, the exact pair this file passes (`:118-119`), are both retained. Its lucide surface is 5 symbols (`:11-17`), squarely inside the mechanical `lucide-vue-next → @lucide/vue` rename. **The only thing that breaks this file at F.W1 is the Button prop re-cut (D-8) — which the census does not list.**

### S-3 · Token discipline in the `<style>` block is near-total

Zero hard-coded colour literals, zero `!important`, zero raw `cubic-bezier()`, zero magic hex. Every colour is a house token, and I verified each one present in **both** 4.0.0 and 7.0.0 rather than assuming: `--shadow-cartoon` / `--shadow-cartoon-hover` (`tokens/shadow.css:9-10` → `:13-14`), `--tier-featured` / `--tier-saved` (`color-radius.css:270-271` → `:333`), `--like` (`:272` → `:335`), `--delete` (`:276`), `--ring`, `--muted`, `--foreground`, and the `.cm-serif` typography utility (`typography/utilities.css:60`) used at `:123`. `color-mix(in srgb, …)` is used consistently for every tint rather than a second token. The measured body-text contrast clears AA in both themes (5.12 / 5.68 — D-12).

**One exception, and only one:** `--ease-apple-spring`. The discipline is real; the audit found exactly one hole in it, and that hole is D-1.

### S-4 · The consumer-side variant projection is the correct glass-ui-first idiom

`.basis-tint` (`:267-274`), `.like-btn` (`:276-290`), `.admin-overlay-btn` (`:253-265`) all follow the same shape: keep the glass-ui component, project the delta through a scoped class, and drive the per-instance colour through a CSS custom property (`--pill-c`, `:121`) rather than an inline `style` colour or a forked component. Each carries a comment stating what the base ships and what the override adds.

This is precisely what the standing `feedback_glass_ui_first_class` law asks for — no `demo/ui`-level fork, no duplicated primitive — and it is *why* the pill survives the 7.0.0 `variant`→`tone`/`surface` re-cut untouched (S-2) while the Button callsites, which lean on the prop API, do not (D-8). The idiom earned its keep at exactly the moment the audit tested it.

---

## §6 — Corpus reconciliation

| corpus row | this challenge |
|---|---|
| CENSUS `:103` "`GalleryCard.vue` \| 309 \| Gallery tile (`Badge` + `Checkbox` + `Button`)" | **AGREE** — 309 lines, three components, verified. |
| CENSUS `:102-105` "the uplift break surface" | **EXTENDED — the enumeration is incomplete.** It lists removed subpaths + dock members + `ToastVariant` (15 sites). It omits the Button `variant`→`emphasis` / `size="icon"`→`iconOnly` re-cut: 96 + 77 attributes over 35 files, 8 of them in this one component. **CARRY → F.W1** (D-8). |
| CENSUS `:184-186` F.W1 scope | **INSUFFICIENT as written** — "cure the break surface (metric-badge ×7 files, hover-card/-popover ×4, dock members ×3, `ToastVariant`)" under-scopes the wave by roughly an order of magnitude. Add the Button prop map, plus D-21's silent `--shadow-cartoon` sign flip. |
| CENSUS `:619` (lane-frontend) "`gallery/GalleryCard.vue:304` — 8 `@media (prefers-reduced-motion: reduce)` blocks" | **PRESENT but INERT** — the block is real; it guards a `@keyframes` that never runs (D-1) and duplicates glass-ui's global `*:not([data-allow-motion])` neutraliser (D-9). Counting PRM blocks over-states PRM coverage here. |
| intake `lane-fourier-r3-r6.md` **R3-12** (TRUE / ADOPT-AS-FACT) — "`GalleryCard` basisLabels" among the 7 duplicated open-family rows | **CONFIRMED at source** — the duplication is `:117` `:key="b.label"`, a derived non-unique key over a computed built at `:36-51`. Cited at D-22. |
| fourier `docs/audits/.../2026-06-17-M-critique-audit/findings-index.txt:444` **E5-08** — "`--ease-apple-spring` token absent from glass-ui 4.0 — six fourier sites resolve to unset/initial" | **CONFIRMED and CORRECTED.** The absence is real and reproduces (and I extend it: **still absent at producer 7.0.0**, so F.W1 does not cure it). But its stated consequence — "degrading those transitions to browser-default `ease`" — is wrong. IACVT drops the **whole shorthand**: `transition-duration → 0s` (no transition at all, including the two valid `--ease-standard` legs) and `animation-name → none` (the keyframe never runs). D-1. |
| CENSUS §"Hygiene banked" — "18 reduced-motion references" | **Sample of one says the count over-reads.** This file's reference is doubly redundant. Suggest the F.W-motion wave audit the other 17 for liveness before banking them as coverage. |

---

## §7 — Wave routing

- **F.W1 (tri-package uplift)** — D-8 (Button prop map, 35 files), D-20 (`--shadow-cartoon` sign flip → visual-regression checkpoint), D-19a/b (comment corrections that ride the same edit), D-20/D-16 hygiene.
- **F.W-motion / hand-cure (NOT curable by uplift)** — D-1 (`--ease-apple-spring` → `--ease-spring` or `--spring-bouncy`, 6 sites), D-9 (delete the dead PRM block).
- **F.W-a11y** — D-2 (BLOCKER: `.self` guards + the nested-interactive restructure), D-5 (light-mode tier contrast, token-decidable), D-18 (alt/aria).
- **F.W-frontend-design** — D-3 (cascade order), D-4 (frozen pill inks + dark AA), D-6 (image error state), D-7 (title/identity — couples to the CRUD-union charter), D-10, D-12, D-13, D-15, D-17, D-23.
- **glass-ui BH inbox relay (standing law)** — `README.md:211` advertises `--ease-apple-spring`, which the library has never shipped; and the `.badge-atom--outline` / `Button.emphasis` re-cut wants a published 4→7 migration map, since fourier is not the only consumer holding 96 `variant=` attributes.
