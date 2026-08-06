claude-opus-5[1m]

# CHALLENGE D · DESIGN — `PaperSearchInput.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchInput.vue` (69 lines)
**Axis** DESIGN — spacing/margin/proportion (Aristotelian) · glass-ui conformance **under the old pin** (`^4.0.0` installed, producer latest 7.0.0) · typography · motion incl. `prefers-reduced-motion` · a11y (roles, aria, focus, token-decidable contrast) · prose · state coverage (empty/error/loading)
**Date** 2026-08-06 · **Pin** `@mkbabb/glass-ui@^4.0.0` (`web/package.json:13`; `node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`), producer latest **7.0.0** (read read-only from `/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/glass-ui@7.0.0`)
**Method** static + source-derived only. No browser. Contrast computed by hand from resolved token values (HSL → sRGB → WCAG 2.x relative luminance), arithmetic shown. Cascade outcomes derived from the shipped stylesheets and the **shipped build artifact** (`web/dist`, 2026-06-12), not from intent. Livable-only consequences marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).

**Read whole (read-only).** The target; its import closure — `@mkbabb/glass-ui/button` (`dist/button-BNDWhAZb.js`), `lucide-vue-next@1.0.0` (`dist/esm/defaultAttributes.js`), `./usePaperSearch`; the stylesheet that owns it, `PaperSearch.vue:41-397`; both mount arms, `PaperSidebar.vue` and `MobileFloatingToc.vue`, and the layout that sizes them, `PaperView.vue:553-565`; the siblings that share its class hooks, `PaperSearchDropdown.vue` / `PaperSearchModal.vue`; the entry cascade `src/style.css` (143 lines, whole); the installed glass-ui surface — `dist/styles/index.css`, `dist/styles/components.css`, `dist/styles/tokens/{color-radius,light-dark,offsets-sizing,scheme-motion}.css`, `dist/styles/utilities/{base,btn,a11y-overrides}.css`, `dist/components/custom/search/{SearchBar,FuzzySearch}.vue.d.ts`; the producer 7.0.0 Button (`dist/button-Bu9F4uU6.js`) and its `[data-size]` surface; the shipped build (`web/dist/assets/PaperView-{FJog9X2r.css,CS2UAWt8.js}`); the a11y gate `web/e2e/visualization-ux.spec.ts`.

**Tally** — 19 defects (2 BLOCKER · 8 MAJOR · 6 MINOR · 3 INFO) · 4 superlatives.

---

## §0 · Corpus fold — what is already owned, and what this file adds

This component already carries a C-axis challenge and sits inside a D-axis challenge of its mobile host. **Nothing below re-derives their mechanisms.** Where a finding descends from one of theirs it is labelled and attributed; where it is independent it says so.

| Prior row | Owned by | This challenge's relation |
|---|---|---|
| **C-1** — the parent's scoped rules cannot cross the component boundary; 3 of the 4 emitted class hooks can never match (`PaperSearchInput/challenge-C-consumption.md:34-70`) | C axis | **FOLDED WHOLE — mechanism not re-litigated.** I add the build-artifact confirmation (§0.1) and, on the design axis, the two proportional consequences it never priced: the column-fit failure (D-B1) and the colour failure latent in its repair (D-M1). |
| **D-B2** — the same scope death read from the mobile host, incl. the dropdown Fragment and the modal Teleport arms (`MobileFloatingToc/challenge-D-design.md:93-138`) | MobileFloatingToc D axis | **FOLDED.** That challenge analysed the **floating** arm. The **sidebar** arm (220px grid track, `PaperView.vue:562`) is unanalysed anywhere; D-B1 is that arm. Its explicit *"Not claimed: the raw-UA-input horror"* narrowing is correct and I hold to it. |
| **C-4** — required prop `variant` never read | C axis | Not re-filed. Its *design* residue — the variant's visual contract is delivered by an ancestor selector that reaches the wrap and nothing inside it — is folded into D-M8. |
| **C-6** — "Clear search" calls `close()`: four state writes, tears down the modal | C axis | **EXTENDED, not duplicated.** D-M7 adds the consequence C-6 does not state: the control deletes *itself* under the pointer, so focus is destroyed. |
| **C-7** — hand-rolled combobox, zero ARIA, icon buttons named by `title` | C axis | **EXTENDED.** D-M4 is the visual half: the selection state the ARIA would announce has no rendered marker either, in either variant. D-m5 adds the input-mode hygiene C-7 does not cover. |
| **C-11** — opens the shared state, owns no close edge | C axis | Not re-filed. |
| **C-12** — zero automated coverage | C axis | Sharpened at D-i3 with the specific gate evidence: `@axe-core/playwright` runs, but only on `/visualize`. |
| **C-2 / `CENSUS-2026-08-03.md:99` / `lane-frontend.md:438`** — the PaperSearch family is a shadow of `./search` (`SearchBar`, `FuzzySearch`, `useFuzzySearch`), present at 4.0.0 **and** 7.0.0 | C axis + census | Adopted as the disposition frame (§5). The design axis adds one datum C-2 did not need: `SearchBar.vue.d.ts` takes `icon?: Component` — i.e. the producer parameterises the very glyph whose sizing is the subject of D-M2. |
| **`CENSUS-2026-08-03.md:102-106`** — the uplift break surface: `metric-badge` ×7 files, `hover-card`/`hover-popover` ×4, dock members ×3, `ToastVariant`, lucide rename ×35, pencil-boil | census | **CONTRADICTED BY OMISSION — D-M3.** The enumeration is of *removed subpaths and members*. `./button` survives, so the component reads as safe; but the Button's **props** were replaced wholesale at 7.0.0 (`variant` deleted, `size: "icon"` deleted). That is a fourth break surface, 113 `variant="…"` sites in Button-importing SFCs and 38 `size="icon"` sites wide, and it is not in the census ledger. |
| **`lane-fourier-r3-r6.md` R3-11 / X-6** (both TRUE) — exactly two Teleports, `PaperSearchModal.vue:41` + `FullscreenViewer.vue:105` | intake | Corroborated incidentally (the modal arm read while tracing the shared `.paper-search-action-btn` hook). No contradiction. |
| **`lane-frontend.md:602`** — `style.css:133-143` puts `:focus-visible` rings at the *global* layer precisely "because Vue's scoped styles add a data-attribute selector" | lane | The repo diagnosed this exact mechanism in wave D.W4.d, named four classes, and did not name this component's. Cited in D-M8 and S-1. |
| **C-axis S-5** — `outline: none` never matching is the one place the scope failure *helps* | C axis | **PATTERN EXTENDED, D-M1.** S-5 found one latent a11y regression in the naive repair. There are **two**: the placeholder and icon colours the repair would also switch on measure 1.89:1 and 2.04:1. |

### §0.1 Build-artifact confirmation of the folded mechanism (new evidence, not a new claim)

The 2026-06-12 build in `web/dist` closes the loop that C-1 proved by SSR and D-B2 proved from `runtime-core` source. Both halves are visible in the shipped bytes:

```
$ # the CSS side — every rule is attribute-qualified
$ python3 -c "…" web/dist/assets/PaperView-FJog9X2r.css
.paper-search-input-wrap[data-v-a7d16b8c]{ …
.paper-search-icon[data-v-a7d16b8c]{ …
.paper-search-input[data-v-a7d16b8c]{ …
.paper-search-action-btn[data-v-a7d16b8c]{ …

$ # the JS side — exactly one component carries that id, and it is not this one
$ grep -o '.\{80\}a7d16b8c.\{80\}' web/dist/assets/PaperView-CS2UAWt8.js
… ei = lt(jr, [["__scopeId","data-v-a7d16b8c"]]);          ← PaperSearch.vue
$ # this component's compiled record, same chunk:
_r = ve({__name:"PaperSearchInput", props:{search:{},variant:{},canExpand:{type:Boolean}}, …})
br = {class:"paper-search-input-wrap"}                       ← static hoist, no data-v
```

No unscoped redeclaration exists in any built stylesheet (scanned all 8 emitted `.css` files for `paper-search-icon|paper-search-input|paper-search-action-btn` outside a `[data-v-…]` qualifier → zero hits). **Consequence for this axis:** every proportional, chromatic and typographic decision the author wrote for the interior of this component is unexpressed. §2 prices that, and prices what its repair would cost.

---

## §1 · Aristotelian reading — the mean this field misses

A search field is a *lintel*: a horizontal member whose whole job is to hold a clear span between two small marks — a glyph that says *what this is*, and one or two controls that say *what you may do*. Its proportion is governed by one number, the height of the text it accepts, and everything else is a ratio to that: the glyph a little smaller, the controls a little larger, the padding a fraction, the span everything that is left.

The author knew this. The authored ratios are a coherent classical set, and they read as one hand:

| Member | Authored | Ratio to the 0.78rem type |
|---|---|---|
| input type | `0.78rem` (`PaperSearch.vue:75`) | 1.00 |
| glyph box | `0.8rem` (`:63-64`) | 1.03 |
| gap | `0.375rem` (`:50`) | 0.48 |
| padding | `0.3rem 0.5rem` (`:54`) | 0.38 / 0.64 |
| action padding | `0.15rem` (`:88`) | 0.19 |
| radius | `calc(var(--radius) - 2px)` = `2px` (`:52`) | — |

That is a field about **24px tall** with a 12.5px glyph, a 12.5px label, and two ~17px controls. It is well-judged, it is proportionate to the 220px sidebar it lives in, and **not one of those six numbers reaches the DOM except the padding and the radius** — the two that belong to the wrap, the only element the scope hash reaches.

What renders instead is not a different mean; it is three unrelated means colliding. The glyph comes from lucide's own default (24px — twice the label it fronts, `defaultAttributes.js:10`). The label comes from the document root (16px desktop, **18px** below 768px — `style.css:41-51`), 1.4–1.5× its intended size. The controls come from glass-ui's *default control ladder* (`--control-h-md`, 40px fine-pointer, **67.5px** coarse — `offsets-sizing.css:151` + `light-dark.css:19-21`), 2.4–4× their intended size. Three authorities, none of them the author, each sizing one member of a three-member composition.

The result fails the most basic proportional test available: **it does not fit its own column.** The sidebar track is 220px (`PaperView.vue:562`); the row's min-content is ~292px (D-B1). And it fails the comparative test one panel over: the *identical* control — `<Button variant="ghost" size="icon">` with a `h-3 w-3` lucide glyph — appears 130 lines below in `PaperSidebar.vue:53-62`, in a file whose scoped styles *do* reach it, where the author wrote `width: 1.25rem; height: 1.25rem` (`:190-191`) to bring it to heel. Two of the same control, 8mm apart on the same panel, one 20px and one 40px, because one of them is inside a component boundary and the other is not.

That is the finding of this axis, stated once: **the component's proportional system exists, is good, and is entirely unexpressed; and the two repairs it obviously invites — re-scope the CSS, keep `size="icon"` — respectively ship a WCAG failure and leave the largest proportion violation in place.**

---

## §2 · Findings

### BLOCKER

---

**D-B1 · [BLOCKER] The field cannot fit the column it is mounted in. The dead `min-width: 0` leaves an unshrinkable `<input>` in a 220px grid track.**

`PaperSearch.vue:69-78` authors the canonical flex-item repair:

```css
.paper-search-input {
    flex: 1;
    min-width: 0;      /* ← the whole point */
    …
}
```

Both declarations are inert (folded C-1 / D-B2). An `<input>` is a flex item with `min-width: auto`, whose automatic minimum size resolves to its **content size suggestion** — for a text input with no `size` attribute and no author width, its intrinsic `size=20` box. It therefore cannot shrink, and `flex: 1` is not there to make it grow. This is the exact failure mode `min-width: 0` exists to prevent.

The budget, derived (light of the shipped tokens; fine pointer, desktop, `--ui-scale: 1`):

| Term | px | Source |
|---|---|---|
| grid track | 220 | `PaperView.vue:562` `grid-template-columns: 220px minmax(0, 48rem)` |
| − `.sidebar-nav` padding `0.625rem` ×2 | −20 | `PaperSidebar.vue:161` |
| − `.sidebar-nav` border `2px` ×2 | −4 | `PaperSidebar.vue:163` |
| − `.paper-search-input-wrap` padding `0.5rem` ×2 | −16 | `PaperSearch.vue:54` (alive — wrap is the child root) |
| − border `1.5px` ×2 | −3 | `PaperSearch.vue:51` |
| **available for the row** | **≈177** | |
| glyph (lucide default) | 24 | `defaultAttributes.js:10` |
| gap ×3 | 18 | `PaperSearch.vue:50` `gap: 0.375rem` |
| `<input>` min-content (`size=20`, serif, 16px) | ~170 | intrinsic; **UNPROVEN-NEEDS-LIVE** for the exact figure |
| expand `Button` `size="icon"` | 40 | `button-BNDWhAZb.js:71` → `--control-h-md` |
| clear `Button` `size="icon"` | 40 | ibid. |
| **row min-content** | **≈292** | |

**≈292 into ≈177.** `.sidebar-nav` sets `overflow-y: auto` (`PaperSidebar.vue:155`) and no `overflow-x`; per CSS Overflow 3, a `visible` value on one axis computes to `auto` when the other is not visible — so the whole table of contents acquires a horizontal scrollbar, or the row spills, depending on which of the two the UA resolves first. Either way the search field is wider than the navigation panel that contains it.

The floating arm is the same arithmetic with worse constants: on a 375px viewport, `.floating-toc-bar` padding `0.625rem 1rem` (`MobileFloatingToc.vue:211`) plus the close button leaves ≈270px, while `@media (pointer: coarse)` lifts `--ui-scale` to `1.5` (`light-dark.css:19-21`) making each action button `max(2.5rem × 1.5, 2.75rem)` = `3.75rem` = **67.5px** at the 1.125rem mobile root — a row min-content of ≈347px. The host even reaches for the fix at the wrong level: `MobileFloatingToc.vue:261-264` writes `.floating-toc-bar--search > :first-child { flex: 1; min-width: 0 }` — correct, alive (that child is `PaperSearch`'s root), and useless, because the `min-width: 0` chain breaks one level deeper, at the exact declaration that is dead.

*Provenance*: `PaperSearch.vue:47-56`, `:69-78`; `PaperSearchInput.vue:35-46`; `PaperView.vue:562`; `PaperSidebar.vue:155,161,163`; `MobileFloatingToc.vue:205-221`, `:254-264`; `button-BNDWhAZb.js:71`; `offsets-sizing.css:149-151`; `light-dark.css:19-21`; `lucide-vue-next/dist/esm/defaultAttributes.js:10`.
*Falsifier* (three, all must fail): (a) an author or UA rule giving `.paper-search-input` a definite width or `min-width: 0` — none: no `width`/`min-width` for `input` in Tailwind v4 preflight, none in glass-ui's `utilities/base.css`, and the only authored one is the dead rule; (b) a `size` attribute on the input shrinking its intrinsic box — `PaperSearchInput.vue:37-46` sets none; (c) the row fitting anyway because the intrinsic input box is under ~95px — falsified by construction (`size=20` is ≥ 20 average advance widths).
*Severity rationale*: BLOCKER. The primary navigation aid of the desktop reading surface does not fit its own container, in the default state, on the default viewport, with no user action required. It is also the one defect here that is *invisible* to the C axis, which correctly identified the dead `flex: 1` but priced it as "does not grow to fill the row" — the true consequence is the opposite sign.

---

**D-B2 · [BLOCKER] The two action controls render at 2.4×–4× their authored size — and unlike everything else here, fixing the scope does not fix it. The conformant token was shipped and not used.**

`PaperSearchInput.vue:47-67` passes `size="icon"` twice. Under the pin that resolves to (`button-BNDWhAZb.js:71`):

```js
icon: "h-(--control-h-md) w-(--control-h-md) p-0",
```

with `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` (`offsets-sizing.css:151`). Resolved:

| Context | `--ui-scale` | `--control-floor` | root px | rendered |
|---|---|---|---|---|
| desktop, fine pointer | 1 | `0px` (`:148`) | 16 | **40 × 40 px** |
| touch (`@media (pointer: coarse)`, `light-dark.css:19-21`) | 1.5 | `2.75rem` | 18 | **67.5 × 67.5 px** |

Against an authored control of `padding: 0.15rem` around a `0.75rem` glyph ≈ **17px**. And against the *literal same control* in the same panel: `PaperSidebar.vue:53-62` is `<Button variant="ghost" size="icon">` + `<ChevronUp class="h-3 w-3">`, and because that file's scoped styles reach their own template, `.sidebar-top-btn` at `:185-199` hand-corrects it — `width: 1.25rem; height: 1.25rem` (`:190-191`) = **20 px**. Two instances of one primitive, one panel, 2× apart, and the difference is a component boundary.

**The part that survives the obvious repair.** `.paper-search-action-btn` (`PaperSearch.vue:84-95`) sets `padding`, `border`, `background`, `color`, `border-radius`, `cursor`, `transition` — and **no `width`/`height`**. Re-scoping it (moving the rules global, or adding `:deep()`, or giving the child its own `<style>`) therefore changes the buttons' colour and radius and leaves them 40px/67.5px, because `padding: 0.15rem` cannot overcome `height: var(--control-h-md)` — it is a different property, not a losing one. The sidebar sibling proves the author already knew the correct compensation and did not apply it here.

**The conformant fix exists under the pin.** `button-BNDWhAZb.js:72` ships a second icon arm:

```js
"icon-sm": "h-(--control-h-xs) w-(--control-h-xs) p-0",
```

`--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor))` (`offsets-sizing.css:149`) = **28px** fine-pointer, `44px` on touch (the WCAG 2.5.5 floor, deliberately — `light-dark.css:6-18` documents it). `grep -rn 'size="icon-sm"' web/src` → **0 sites**; `size="icon"` → **38 sites**. The library shipped the small arm and the app never found it.

*Provenance*: `PaperSearchInput.vue:50`, `:61`; `PaperSearch.vue:84-95`; `PaperSidebar.vue:53-62`, `:185-199` (esp. `:190-191`); `button-BNDWhAZb.js:71-72`; `offsets-sizing.css:148-151`; `light-dark.css:19-21`.
*Falsifier*: a rule giving these buttons a smaller box. Two candidates, both refuted — (a) `.paper-search-action-btn` sets no box (quoted above, and it is dead regardless); (b) a global `[data-size="icon"]` override in the app — `style.css` (143 lines, read whole) contains none. Third: show `--ui-scale`/`--control-floor` overridden in fourier — `grep -rn "ui-scale\|control-floor" web/src` → no match, so the producer defaults stand.
*Severity rationale*: BLOCKER, and independently so. It is the dominant term in D-B1's overflow (80px of a 115px overrun desktop; 135px of ~77px overrun on touch), it is visible without measurement beside its 20px twin, and it is the one defect on this axis that the headline repair silently leaves behind.

---

### MAJOR

---

**D-M1 · [MAJOR] The authored colour system fails WCAG by 2.4× at the placeholder — and because the placeholder is the field's only label, repairing the scope *ships* the failure.**

Two of the dead rules are colour rules:

```css
.paper-search-icon        { color: color-mix(in srgb, var(--muted-foreground) 50%, transparent); }   /* :66 */
.paper-search-input::placeholder { color: color-mix(in srgb, var(--muted-foreground) 45%, transparent); } /* :81 */
```

Resolution (light arm — `style.css` forces no `.dark`; `--muted-foreground: var(--neutral-5)` `color-radius.css:85`, `--background: var(--neutral-0)` `:57`):

- `--neutral-5 = hsl(30 22% 40%)` (`:45`) → rgb(124, 102, 80) → Y = 0.2126·0.2016 + 0.7152·0.1329 + 0.0722·0.0782 = **0.1436**
- `--neutral-0 = hsl(40 30% 98%)` (`:40`) → rgb(251, 250, 248) → Y = **0.9612**
- *(sanity check: full-opacity muted-on-background = (1.0112)/(0.1936) = **5.22:1** — the token's own comment at `color-radius.css:45` self-reports 5.21:1. The pipeline is calibrated.)*

Composite over the field background (the wrap sets `background: var(--background)`, `:53`):

| Element | α | composite rgb | Y | contrast vs field | requirement | verdict |
|---|---|---|---|---|---|---|
| placeholder (`:81`) | 0.45 | (194, 184, 172) | 0.4864 | **1.89 : 1** | 4.5:1 (1.4.3 — it is the only label) | **FAIL, by 2.4×** |
| search glyph (`:66`) | 0.50 | (188, 176, 164) | 0.4450 | **2.04 : 1** | 3:1 (1.4.11, meaningful non-text) | **FAIL** |
| action glyph (`:91`) | 0.45 | (194, 184, 172) | 0.4864 | **1.89 : 1** | 3:1 (1.4.11) | **FAIL** |

**The compound.** Today none of these renders — the rules are dead, so the placeholder falls to the UA grey and the glyph inherits full `--foreground`. The bug is *masking* an accessibility violation. This is the same shape as C-axis **S-5** (`outline: none` never matching preserves the UA focus ring), and it means the repair surface has **two** latent regressions, not one: re-scoping `PaperSearch.vue:62-100` simultaneously removes the input's focus ring and drops the label to 1.89:1. The repair must re-tokenise, not merely re-scope.

The repo has already fought this exact fight one file up: `style.css:119-131` darkens light-mode `--viz-amber` from `hsl(35 70% 42%)` (≈3.54:1) to `hsl(35 76% 35%)` (≈4.6:1) with the note *"fails WCAG AA for normal text"* (folded from `lane-frontend.md:602`). The wave that did that did not visit this component.

*Provenance*: `PaperSearch.vue:53`, `:62-67`, `:80-82`, `:84-95` (`:91`); `color-radius.css:40,45,57,84,85`; `style.css:119-131`; C-axis S-5.
*Falsifier*: (a) a different substrate under the text — the wrap's own `background: var(--background)` is the composite base, and in the floating arm `PaperSearch.vue:206` sets `background: transparent` over `.floating-toc-bar … glass-resting`, a *lighter* wash, which moves the ratio the wrong way, not the right one; (b) the dark arm rescuing it — `--neutral-5` dark is `hsl(34 14% 62%)` on `hsl(24 9% 4%)`, full-opacity 7.64:1 per its own comment (`dark-arm.css:47`), but at α=0.45 over an L=4 substrate the composite *darkens* toward the background: ≈2.3:1. Both arms fail; (c) placeholder text being exempt from 1.4.3 — it is not exempt here, because there is no `<label>`, no `aria-label`, and no visible name (C-7), so the placeholder is the accessible name **and** the visible label.
*Severity rationale*: MAJOR not BLOCKER only because it does not render today. It is BLOCKER-on-repair, and must be attached to whatever ticket carries C-1.

---

**D-M2 · [MAJOR] The glyph that fronts the field renders at lucide's 24px default — twice the label, three times its authored box, at full foreground weight.**

`PaperSearchInput.vue:36` — `<Search class="paper-search-icon" />` — is the one member of the composition with no fallback authority but the icon library itself. `lucide-vue-next@1.0.0` `dist/esm/defaultAttributes.js:10-15` sets `width: 24, height: 24, "stroke-width": 2` as SVG presentation attributes; the authored `width/height: 0.8rem` (`PaperSearch.vue:63-64`) is dead, and nothing else sizes it:

- glass-ui's Button base carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`button-BNDWhAZb.js:49`) — but this glyph is **not inside a Button**, and in any case that utility is absent from every built stylesheet in `web/dist` (scan for `ui-glyph` across all 8 emitted `.css` → 0 hits) and absent from glass-ui's own shipped `components.css`;
- Tailwind v4 preflight gives `svg` only `display: block; vertical-align: middle`, no box;
- `style.css` (read whole) has no `svg` rule.

So: a 24px, `stroke-width: 2`, full-`currentColor` glyph, beside a ~16–18px label (D-M5), inside a field authored at ~24px total height. `flex-shrink: 0` (`:65`) is dead with it, so under D-B1's overflow the glyph is also the first member to be squeezed.

Note the producer's contrast: `SearchBar.vue.d.ts` takes `icon?: Component` — glass-ui parameterises this glyph and owns its box. This is the shadow row (C-2) showing up as a *design* symptom.

*Provenance*: `PaperSearchInput.vue:36`; `PaperSearch.vue:62-67`; `lucide-vue-next/dist/esm/defaultAttributes.js:10-15`; `button-BNDWhAZb.js:49`; `web/dist/assets/*.css` (negative scan); `dist/components/custom/search/SearchBar.vue.d.ts`.
*Falsifier*: any rule sizing a bare `svg` or `.paper-search-icon` outside the scoped block — enumerated above, none exists. Second: lucide v1 defaulting to something other than 24 — quoted from the installed package.
*Severity rationale*: MAJOR. Purely visual, no functional loss, but it is the single most conspicuous proportional error on the surface and it compounds D-B1's arithmetic by 12px.

---

**D-M3 · [MAJOR] glass-ui 7.0.0 deletes **both** Button props this component passes. The two flat ghost controls become filled glass capsules — and the census break surface does not list this.**

The pin's Button is a CVA over `variant` + `size` (`button-BNDWhAZb.js:49-79`). The producer's 7.0.0 Button is a different contract (`button-Bu9F4uU6.js:10-31`):

```js
props: { emphasis:{default:"secondary"}, tone:{default:"neutral"}, size:{default:"md"},
         iconOnly:{type:Boolean,default:!1}, loading:{…}, type:{}, disabled:{…}, class:{…}, asChild:{…}, as:{default:"button"} }
```

No `variant`. No `icon` in the size scale — `grep -o '\[data-size=[a-z]*\]'` over 7.0.0's stylesheet yields exactly `sm`, `md`, `lg`. What happens to `PaperSearchInput.vue:49-50` and `:60-61` after F.W1:

1. `variant="ghost"` matches no prop ⇒ falls through as a literal DOM attribute `variant="ghost"` on the `<button>`. Harmless, inert, and invisible to `vue-tsc` only if the props type is loose — it is not, so this is also a **typecheck break**, the same class as `ToastVariant` in the census ledger.
2. The defaults then apply: `emphasis="secondary"`, `tone="neutral"`. In 7.0.0's setup (`:44`) that makes the glass predicate true and the class list becomes `button tap-squish focus-ring glass-wash glass-capsule` (+ `glass-capsule-hover`). `glass-capsule` is a live recipe in 7.0.0's shipped styles (`dist/styles/glass/{surfaces,glass-atom,ladder,liquid-fill}.css`). **The two deliberately-flat ghost affordances inside a text field become filled, hover-lit glass capsules.**
3. `size="icon"` reaches `data-size="icon"`, matching no `[data-size]` rule ⇒ the buttons fall to the `md` geometry with no icon-only correction; `iconOnly` — the prop that now carries that meaning — is never passed.

**Scale of the omission.** `CENSUS-2026-08-03.md:102-106` enumerates the break surface as *removed subpaths and removed members*: `metric-badge` ×7 files, `hover-card`/`hover-popover` ×4, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant`, lucide ×35, pencil-boil. `./button` survives the hop, so this component reads as clean. But the prop contract did not survive, and the surface is:

```
$ grep -rl 'from "@mkbabb/glass-ui/button"' web/src --include=*.vue | wc -l        → 35   files
$ grep -rl … | xargs grep -h 'variant="' | wc -l                                   → 113  sites
$ grep -rn 'size="icon"' web/src --include=*.vue | wc -l                           → 38   sites
$ grep -rho 'variant="[a-z-]*"' web/src --include=*.vue | sort | uniq -c | head -3 → 49 ghost · 29 outline · 14 standard
```

An order of magnitude above the 14 sites the census books, and `variant="standard"` (14 sites) is not even a member of the **4.0.0** union — a pre-existing silent no-op the hop will surface. **This is a contradiction-by-omission of `CENSUS:102-106`, and F.W1's budget is wrong without it.**

*Provenance*: `PaperSearchInput.vue:49-50`, `:60-61`; `button-BNDWhAZb.js:49-79`; producer `button-Bu9F4uU6.js:10-31`, `:44`; 7.0.0 `glass-ui.css` (`[data-size=sm|md|lg]` only), `dist/styles/glass/surfaces.css` (`glass-capsule`); `CENSUS-2026-08-03.md:102-106`; the four greps above.
*Falsifier*: (a) a 7.0.0 compat shim accepting `variant` — the props object is quoted whole above, there is none; (b) `[data-size=icon]` existing in 7.0.0 CSS — scanned, absent; (c) the tri-package transaction being avoidable — `CENSUS`'s own RESOLUTION DEADLOCK forbids it (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is atomic).
*Severity rationale*: MAJOR here (2 call sites in this file), **P0-shaped at formation level** (113 sites). Filed at the component's severity; escalated in §5.

---

**D-M4 · [MAJOR] Nothing on this surface renders the state it is driving. The keyboard selection has no visual marker in either variant, and the field shows no result count.**

C-7 owns the ARIA absence. This is the visual half, and it is worse than the ARIA half because it affects sighted mouse users too.

`PaperSearchInput.vue:44` routes `ArrowDown`/`ArrowUp`/`Enter` into `usePaperSearch.ts:63-92`, which moves `selectedIndex` over a result list. The only rendering of that index is `PaperSearchDropdown.vue:46` — `:class="{ 'is-selected': i === search.selectedIndex.value }"` — and `.paper-search-result.is-selected` lives at `PaperSearch.vue:132-135`, inside the same scoped block, applied to elements inside a **multi-root** child component. Per the mechanism folded from D-B2, it never matches in either variant. So:

- the user presses ↓ four times and nothing anywhere changes;
- `Enter` then navigates to a result that was never indicated;
- the field itself — the one surface always on screen — shows no count, no "n results", no state at all beyond the presence of a second icon button.

The component owns the input event and the keydown route; it renders zero feedback for either. Even a result count in the field (the pattern glass-ui's `FuzzySearch` uses) would make the keyboard route legible.

*Provenance*: `PaperSearchInput.vue:37-46` (esp. `:44`); `usePaperSearch.ts:63-92`; `PaperSearchDropdown.vue:41-60` (esp. `:46`); `PaperSearch.vue:118-135`; folded D-B2.
*Falsifier*: any live rule painting `.is-selected` — `grep -rn "is-selected" web/src` returns the two application sites (`PaperSearchDropdown.vue:46`, `PaperSearchModal.vue:88`), the two `querySelector(".is-selected")` scroll hooks, and the single scoped declaration. No global. *(The modal arm is likewise Teleported out of scope — R3-11's Teleport, adjudicated TRUE.)*
*Severity rationale*: MAJOR. A keyboard interaction the component actively wires up and never renders.

---

**D-M5 · [MAJOR] Three type systems in one 220px panel — and the authored value is below the iOS zoom threshold, so the repair introduces a mobile regression.**

The panel's type comes from three unrelated ladders:

| Surface | Declaration | System |
|---|---|---|
| `.paper-search-input` | `font-size: 0.78rem` (`PaperSearch.vue:75`) | raw magic number |
| `.sidebar-label` | `@apply text-sm` (`PaperSidebar.vue:177`) | Tailwind scale |
| `.paper-search--floating .paper-search-input` | `@apply text-base` (`PaperSearch.vue:212`) | Tailwind scale |
| glass-ui control text | `--control-text: calc(var(--type-small) * var(--ui-scale))` (`offsets-sizing.css:170`) | the design system's own |

`0.78rem` is a number with no provenance: it is not a Tailwind step, not `--type-small`, not `--control-text`, and it appears exactly once in the repo. The same file three declarations later reaches for `@apply text-base` — so the author had the token vocabulary in hand and used a magic number anyway. And the geometry keeps the pattern: `border: 1.5px` (`:51`), `border-radius: 3px` on the action button (`:93`) beside `calc(var(--radius) - 2px)` on the wrap (`:52`), `padding: 0.3rem 0.5rem` (`:54`), `padding: 0.15rem` (`:88`) — six literals where `--radius`, `--control-text`, `--control-h-xs` and the spacing scale exist and are imported (`style.css:3`).

**The regression latent in the repair.** `style.css:41-51` sets the document root to `1.125rem` below 768px. `0.78rem × 18px = 14.04px`. iOS Safari auto-zooms the viewport on focus of any form control below **16px**. glass-ui ships the guard — `utilities/base.css:310-315`:

```css
.ios input, .ios select, .ios textarea, .ios [contenteditable] { font-size: max(1rem, 1em); }
```

— gated on an `.ios` class the app never sets (`grep -rn "\"ios\"\|'ios'" web/src` → no match). So today the input inherits ~18px and does not zoom **because the rule is dead**; the moment `font-size: 0.78rem` starts applying, the mobile floating search zooms the page on every focus. That is the *third* latent repair regression on this file (with C-S5 and D-M1).

*Provenance*: `PaperSearch.vue:51-54`, `:75`, `:88`, `:93`, `:211-213`; `PaperSidebar.vue:177`; `style.css:3`, `:41-51`; `offsets-sizing.css:170`; `utilities/base.css:310-315`.
*Falsifier*: (a) `0.78rem` being a token — `grep -rn "0.78rem" web/src node_modules/@mkbabb/glass-ui/dist/styles` → the single site; (b) the app setting `.ios` — grepped, absent; (c) iOS not zooming ≥16px — the threshold is documented by the guard glass-ui ships for it. *(The zoom itself is UNPROVEN-NEEDS-LIVE, SS-13; the arithmetic and the inert guard are not.)*
*Severity rationale*: MAJOR. Token-bypass alone is MINOR; the mobile regression armed inside the repair path is what lifts it.

---

**D-M6 · [MAJOR] The hand-rolled `@input` binding destroys IME composition. Every intermediate keystroke of a composed character searches the paper.**

`PaperSearchInput.vue:42-43`:

```html
:value="search.query.value"
@input="search.query.value = ($event.target as HTMLInputElement).value"
```

Vue's `v-model` on `<input>` is not sugar for this pair. The `vModelText` directive installs `compositionstart`/`compositionend` listeners and a `composing` flag, and *suppresses* the `input` handler while a composition is active — the documented behaviour that makes CJK, Vietnamese and accent-key input work. A raw `@input` handler receives none of that. Consequence: typing a Japanese word writes every romaji intermediate into `search.query`, each firing the 120ms debounce (`usePaperSearch.ts:28-33`) and a full re-scan of the index, and the committed characters arrive as a *sequence of wrong searches* before the right one. The same defect is duplicated verbatim at `PaperSearchModal.vue:57-58`.

For a mathematics paper — where the search corpus includes theorem names and notation — this is not a hypothetical locale: it is the case for every non-Latin-keyboard reader.

*Provenance*: `PaperSearchInput.vue:42-43`; `PaperSearchModal.vue:57-58`; `usePaperSearch.ts:28-33`; Vue 3.5.38 `vModelText` composition guards.
*Falsifier*: a `compositionstart`/`compositionend`/`isComposing` guard anywhere in the closure — `grep -rn "composition\|isComposing" web/src` → no match. Second: `v-model="search.query.value"` being illegal on a ref member expression — it is legal and compiles to `vModelText`; the producer's own `SearchBar.vue` uses `modelValue`/`update:modelValue` for exactly this reason.
*Severity rationale*: MAJOR. Silent, locale-scoped, invisible to every gate the repo runs, and a two-character fix.

---

**D-M7 · [MAJOR] The clear control deletes itself under the pointer, destroying focus.**

C-6 established that `title="Clear search"` (`:64`) invokes `close()` (`:63`), which performs four state writes (`usePaperSearch.ts:48-53`). The design consequence it does not state:

`PaperSearchInput.vue:59` guards the very same button with `v-if="search.query.value"`. `close()` sets `query.value = ""`. So activating the control **unmounts the control**. The focused element is removed from the document, and focus resets to `<body>` — the keyboard user is ejected from the search field to the top of the page, and the screen-reader focus context is lost mid-announcement.

The correct shape is already in the file: clear the query (`:43` shows the component knows how) and call the exposed `focus()` (`:31`) — return the cursor to the field the user was using. Every mainstream search field does this; it is the difference between "clear" and "dismiss".

*Provenance*: `PaperSearchInput.vue:31`, `:43`, `:58-67` (esp. `:59`, `:63`, `:64`); `usePaperSearch.ts:48-53`; extends C-6.
*Falsifier*: a focus-restoration path after `close()` — `grep -n "focus" usePaperSearch.ts` → no match; the component's watcher (`:20-25`) fires on `isOpen` **false→true** and `close()` moves it the other way, so it cannot rescue this. Second: the browser retaining focus on a removed node — it does not; focus falls to `body`. *(The exact post-removal `activeElement` is UNPROVEN-NEEDS-LIVE, SS-13; the DOM removal is static.)*
*Severity rationale*: MAJOR — WCAG 2.4.3 (Focus Order) and 3.2.x, on the component's only destructive control.

---

**D-M8 · [MAJOR] The floating variant deletes the component's only focus affordance and puts nothing in its place.**

The one interior-facing rule that survives the scope boundary is the wrap's focus state — `PaperSearch.vue:58-60`:

```css
.paper-search-input-wrap:focus-within { border-color: color-mix(in srgb, var(--primary) 50%, transparent); }
```

It is alive (the wrap is the child root), it is well-chosen (`:focus-within` covers the input *and* both buttons from one declaration), and it measures out: `--primary: hsl(24 10% 10%)` (`color-radius.css:98`) at 50% over the field = rgb(140,138,136), Y = 0.2553, **3.31:1 against the field background** — clears 1.4.11. It is this component's best design decision (S-1).

The floating variant deletes the border it rides on — `PaperSearch.vue:204-209`:

```css
.paper-search--floating .paper-search-input-wrap { border: none; border-radius: 0; background: transparent; padding: 0; }
```

`border-color` on `border: none` paints nothing. So on the arm served to phones and tablets — where an external keyboard is entirely ordinary on iPad — the component has **no** focus affordance of its own. The fallbacks do not cover it either: the input's UA ring survives only by the accident C-S5 documents, and `style.css:133-143`'s global `:focus-visible` block names `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card` and no search class. The variant prop that selects this arm is, per C-4, never read by the component — so the component cannot compensate for a variant it cannot see.

*Provenance*: `PaperSearch.vue:58-60`, `:204-209`; `color-radius.css:40,98`; `style.css:133-143`; `MobileFloatingToc.vue:110-111`; folds C-4, C-S5, `lane-frontend.md:602`.
*Falsifier*: (a) an `outline`/`box-shadow` focus rule reaching the floating wrap or its input — none in `PaperSearch.vue`, none in `MobileFloatingToc.vue:205-275`, none in `style.css`; (b) `border-color` rendering on a `none` border — it does not.
*Severity rationale*: MAJOR. A keyboard-operable text field with no focus indication on one of its two arms.

---

### MINOR

---

**D-m1 · [MINOR] The row re-lays itself 120ms after the user stops typing.**
`canExpand` is `!!search.query.value && search.results.value.length > 0` (`PaperSearch.vue:28`), and `results` is computed off the **debounced** query (`usePaperSearch.ts:28-37`, 120ms). So the expand button (`PaperSearchInput.vue:47-57`) mounts 120ms *after* the last keystroke, inserting 40px (67.5px on touch) into a row that — per D-B1 — has no slack. There is no transition, no reserved space, and no `v-show`. The clear button mounts on a different clock again (`:59`, undebounced), so a fast typist sees the row jump twice per query. *Falsifier*: a reserved slot or a mount transition — neither exists; `PaperSearch.vue:225-236` transitions the dropdown only. *Severity*: MINOR — jitter, not breakage, and invisible until D-B1/D-B2 are fixed.

**D-m2 · [MINOR] The two transitions in this component are the file's only untokenised ones.**
`PaperSearch.vue:55` `transition: border-color 0.15s ease` and `:94` `transition: color 0.12s, background 0.12s` use the raw `ease` keyword and a bare default, while the *same file* at `:224-236` and `:358-378` carries the wave note *"A.W3.d — bezier→`--ease-out-expo`"* and uses `var(--ease-standard)` / `var(--ease-out-expo)` / `var(--ease-in)`. The sibling `.sidebar-top-btn` (`PaperSidebar.vue:197-198`) and `.floating-toc-search-btn` (`MobileFloatingToc.vue:245-246`) both carry the same A.W3.d comment *and* the tokens. This component's two rules are the wave's misses. (`:94` is dead besides, so the miss is currently free.) *Falsifier*: `--ease-standard` being undefined — it resolves, `scheme-motion.css` ships it via `style.css:3`. *Severity*: MINOR — consistency, no user-visible cost.

**D-m3 · [MINOR] No empty state, no error state, on either surface this component fronts.**
`PaperSearchDropdown.vue:37` guards the inline results with `… && search.results.value.length > 0`. A query that matches nothing therefore produces **silence** in both the sidebar and floating arms — no "No results", no count, no dimming of the field. The empty state exists (`PaperSearchModal.vue:104-106`, `.search-modal-empty`) but only in the expanded modal, which per `PaperSearch.vue:28` the user cannot open unless there *are* results — the empty state is unreachable from the empty condition. Loading is genuinely N/A (the index is built synchronously at composable construction, `usePaperSearch.ts:18`) and worth stating as a negative; error is not — `buildSearchIndex` has no failure path and no boundary, so a malformed section tree fails the whole `PaperView`. *Falsifier*: an empty-state branch reachable from the inline arms — grep of the three SFCs finds one, gated on `isExpanded`. *Severity*: MINOR at this component's boundary (the branch lives in the sibling), but it is a state-coverage hole the axis must record.

**D-m4 · [MINOR] Six geometry literals where the imported system has tokens.**
`1.5px` border (`:51`), `3px` radius (`:93`), `0.3rem 0.5rem` padding (`:54`), `0.15rem` padding (`:88`), `0.375rem` gap (`:50`), `0.8rem` glyph (`:63-64`) — against `--radius: 0.25rem` (`components.css:30`), `--control-h-xs`, `--control-text`, `--ui-glyph` (`offsets-sizing.css:149,170,177`), all imported at `style.css:3`. The wrap's radius *does* use `calc(var(--radius) - 2px)` (`:52`), so the file mixes both idioms within four declarations. Under the F.W1 uplift the tokenised member tracks the producer's ladder and the five literals do not — the composition will drift apart rather than break loudly. *Falsifier*: any of the six being a token alias — none is. *Severity*: MINOR.

**D-m5 · [MINOR] No mobile input hygiene on a field whose corpus is mathematical notation.**
`PaperSearchInput.vue:37-46` declares `type="text"` and nothing else: no `type="search"` (no native clear affordance, no search semantics), no `enterkeyhint="search"`, no `inputmode`, no `autocapitalize="off"`, no `autocorrect="off"`, no `spellcheck="false"`, no `autocomplete="off"`. On iOS the first character of every query is capitalised and the whole token is autocorrect-eligible — searching `sin`, `dft`, `Ln` or a theorem label in a paper about Fourier analysis. The floating variant exists *only* for that device class. *Falsifier*: a UA that does not autocapitalise a bare `type="text"` — iOS Safari's default is `autocapitalize="sentences"`. *(The corrupted query is UNPROVEN-NEEDS-LIVE, SS-13; the missing attributes are not.)* *Severity*: MINOR — degrades, does not break. Complements C-7 (which covers naming, not input mode).

**D-m6 · [MINOR] Prose: a three-period ellipsis, a duplicated string, and labels that do not exist on touch.**
`placeholder="Search paper..."` (`:41`) uses `...` rather than `…`, in an application whose entire typographic thesis is Computer Modern typesetting (`style.css:13-15`) and which renders KaTeX beside it. The identical string is hard-duplicated at `PaperSearchModal.vue:56` — two places to change one voice. And all three control labels (`:53` `'Collapse'`/`'Expand'`, `:64` `'Clear search'`) are `title` attributes only: a `title` tooltip never appears on a touch device, which is the sole pointer type the floating arm serves, so on mobile these controls are two unlabelled glyphs. (C-7 owns the accessible-name half; this is the visible-label half.) *Falsifier*: a visible or `aria-label` name on any of the three — `grep -c 'aria-' PaperSearchInput.vue` → 0. *Severity*: MINOR.

---

### INFO

**D-i1 · [INFO] Focus and open are mutually causal, with no guard.** `:45` `@focus` sets `isOpen = true`; `:20-25` watches `isOpen` and calls `focus()` on the rising edge. Idempotent today (focusing a focused element is a no-op and fires no second `focus` event), but it is a cycle with no `if (document.activeElement !== el)` guard, and it will re-enter the moment `focus()` becomes more than a bare DOM call — e.g. if it grows a `select()` or a scroll-into-view. Records the shape; no defect claimed today. *Falsifier*: a second `focus` event on an already-focused element — the DOM does not fire one.

**D-i2 · [INFO] The focus state change is only 1.71:1 even where the indicator itself passes.** S-1's `:focus-within` border measures 3.31:1 against the field background (clearing 1.4.11) but only **1.71:1 against its own resting colour** (`--border` = `hsl(32 26% 70%)` → Y 0.4713 vs focused Y 0.2553). WCAG measures the indicator against adjacent colours, not against its prior state, so this passes — but a 1.7× luminance step on a 1.5px hairline is a weak *perceptual* signal, and it is the only signal in the sidebar arm. Records the margin; no failure claimed.

**D-i3 · [INFO] The a11y gate exists and never visits this route.** `@axe-core/playwright ^4.11.3` is installed and genuinely wired — `e2e/visualization-ux.spec.ts:26-40` defines a serious/critical assertion helper and calls it at four keystone states. Every call sits behind `page.goto("/visualize")` (`:47`, and `visualization-crud.spec.ts:120,165`). No spec navigates the paper route. So D-M1, D-M4, D-M7, D-M8 and C-7 are, collectively, ungated by a gate the repo already owns and runs. Sharpens C-12 with the route evidence. *Falsifier*: a spec navigating `/paper` — `grep -rn 'goto(' web/e2e` → `/visualize`, `/v/:slug`, `/gallery`, `/`; no paper route.

---

## §3 · glass-ui conformance ledger

**Under the pin (4.0.0) — what conformance would have looked like, and what was used instead**

| Concern | Producer surface shipped at 4.0.0 | This component | Verdict |
|---|---|---|---|
| the whole component | `./search` → `SearchBar.vue` (`{modelValue, placeholder, icon?, tag}`, exposes `inputRef`) and `FuzzySearch.vue` | hand-rolled | shadow — owned by C-2 / `CENSUS:99` |
| icon-only control size | `size="icon-sm"` → `--control-h-xs` (28px / 44px touch) | `size="icon"` → `--control-h-md` (40px / 67.5px) | **D-B2** — 0 uses of `icon-sm` repo-wide |
| glyph box | `--ui-glyph` (`offsets-sizing.css:177`), or `icon?: Component` on `SearchBar` | `width/height: 0.8rem`, dead ⇒ lucide 24 | **D-M2** |
| control type size | `--control-text` (`:170`) | `0.78rem` literal, dead | **D-M5** |
| radius | `--radius`, used correctly at `:52` | `3px` literal at `:93` | **D-m4** |
| touch floor | `--control-floor` → `--touch-target` 2.75rem under `(pointer: coarse)` (`light-dark.css:19-21`) | inherited, uncorrected | contributes to **D-B1** |
| motion gating | `utilities/a11y-overrides.css:6` gates `tap-squish`/press transforms under `prefers-reduced-motion: reduce` | inherited, not re-forked | **S-3 (superlative)** |
| iOS zoom guard | `utilities/base.css:310-315`, gated on `.ios` | app never sets `.ios` | **D-M5** |
| focus ring | `focus-ring` recipe on the Button base (`button-BNDWhAZb.js:49`) | inherited on the buttons; the *input* has none | **D-M8** |

**At the F.W1 uplift (7.0.0) — what breaks, what improves**

| Item | Direction | Detail |
|---|---|---|
| `variant="ghost"` ×2 (`:49`, `:60`) | **BREAKS** | prop deleted; typecheck break + silent fallthrough; defaults render `glass-wash glass-capsule` — D-M3 |
| `size="icon"` ×2 (`:50`, `:61`) | **BREAKS** | value deleted from the scale (`sm`/`md`/`lg` only); replacement is `iconOnly` + `size="sm"` — D-M3 |
| `lucide-vue-next` → `@lucide/vue` (`:4`) | mechanical | 1 of the census's 35 sites; folded from C-8 |
| `./search` (`SearchBar`, `FuzzySearch`, `useFuzzySearch`) | **IMPROVES** | survives 4.0.0 → 7.0.0 and gains `useDockSearch`; adopting it deletes D-B1, D-B2, D-M2, D-M4, D-M5, D-m4 outright (`lane-frontend.md:438`) |
| `--control-h-*` / `--ui-glyph` / `--control-text` ladder | neutral | tokens survive the hop; the five literals in D-m4 will drift, not break |
| census break-surface rows (`metric-badge`, `hover-card`/`-popover`, dock members, `ToastVariant`) | **N/A here** | grep of this SFC: zero hits for all four. Recorded as the load-bearing negative so F.W1 does not budget this file for them. |

---

## §4 · Superlatives (L-18 both ways — each with its falsifier)

**S-1 · The one rule that crosses the boundary is the one that most needed to.** Of the six declarations authored for this component's interior, exactly one applies: `.paper-search-input-wrap:focus-within { border-color: … }` (`PaperSearch.vue:58-60`). It is on the child's root, so it survives; it is `:focus-within`, so a single declaration covers the input **and** both action buttons without a line per control; it composites to **3.31:1** against the field, clearing WCAG 1.4.11 on measure (arithmetic in D-M8); and it is a border-colour change rather than an outline, so it costs no layout and cannot be clipped by the wrap's `overflow`. Given that the input's `outline: none` (`:73`) would otherwise have removed the UA ring, container-level focus was the structurally correct choice, not merely a stylistic one.
*Falsifier*: show it inert (it is the child root — proven alive in §0.1), or below 3:1 (arithmetic shown), or made redundant by another focus rule (`style.css:133-143` names four classes, none of them here). Withdrawn in the floating arm only, where the border it rides on is deleted — that is D-M8, and it does not touch the sidebar claim.

**S-2 · Named-property transitions, no `transition: all`.** `:55` transitions `border-color`; `:94` transitions `color, background`. Neither reaches for `all`, in a 397-line stylesheet with 14 transition declarations and none of them `all`. That is the A.W3.d hygiene wave's rule (`PaperSearch.vue:224`) holding under pressure — and it matters compositionally here, because `transition: all` on a `:focus-within` wrap would animate the border *width* and *padding* changes the floating variant applies, producing a reflow on focus.
*Falsifier*: one `transition: all` in the closure — `grep -rn "transition: all" web/src/components/paper/` → no match. (The tokenisation half of the same wave *was* missed — D-m2. The superlative is scoped to the property discipline, which is the half that carries the layout consequence.)

**S-3 · Reduced-motion compliance is inherited rather than re-forked.** The only transform-motion on this surface is glass-ui's `tap-squish` + `active:scale-(--scale-press-btn)` (`button-BNDWhAZb.js:49`), which the producer gates centrally at `utilities/a11y-overrides.css:6` (`@media (prefers-reduced-motion: reduce)`, documented there as *"transitions snap under `prefers-reduced-motion` (accessibility is absolute)"*). The component authors no keyframes, no transform, no rAF, and therefore needs and declares no PRM block — correctly. Contrast `lane-frontend.md:624`, which books two *ungated* animation clocks elsewhere in the app (`stores/animation.ts`, `ConvergencePlot.vue`); this component is on the right side of that ledger by construction, and the two colour transitions it does author are outside 2.3.3's scope.
*Falsifier*: a transform, keyframe or rAF in the file — none (`grep -n "transform\|animation\|requestAnimationFrame" PaperSearchInput.vue` → no match); or glass-ui's gate not covering the press recipe — quoted above.

**S-4 · Progressive disclosure by `v-if`, not by `disabled`.** Both action controls are conditionally *rendered* (`:48` `v-if="canExpand"`, `:59` `v-if="search.query.value"`) rather than rendered-and-disabled. That is the correct affordance grammar for a field this small: a disabled control still consumes 40px of a 177px row, still draws a shape the eye must resolve, and still lands in the tab order in some UAs, whereas an absent one costs nothing and says exactly as much. It also means the expand affordance appears *only* when expansion is meaningful (`PaperSearch.vue:28` requires a query **and** results) — the condition is semantically right, not merely non-empty.
*Falsifier*: a case where the absent control is the one the user needs — the near-miss is "query typed, zero results, no way to reach the modal's `No results` panel", which is real and filed as D-m3, but its cause is the *condition on the panel*, not the disclosure idiom. Second falsifier: the layout cost of mounting/unmounting — real, filed as D-m1; it is a consequence of D-B1's zero slack, not of the idiom.

---

## §5 · Disposition

| # | Severity | Claim | Corpus relation |
|---|---|---|---|
| D-B1 | BLOCKER | dead `min-width: 0` ⇒ ~292px row min-content in a 177px sidebar budget; horizontal overflow of the ToC panel | **new** (C-1 priced the same dead rule with the opposite sign; D-B2 analysed the floating arm only) |
| D-B2 | BLOCKER | `size="icon"` renders 40px / 67.5px vs 17px authored and 20px on the identical sibling control; **survives the scope repair**; `icon-sm` shipped and unused (0/38) | **new** |
| D-M1 | MAJOR | authored placeholder 1.89:1 · glyph 2.04:1 · action glyph 1.89:1; repairing C-1 *ships* the failure | **new**; extends C-S5's pattern; parallels `style.css:119-131` |
| D-M2 | MAJOR | search glyph at lucide's 24px default, full foreground | sharpens a line noted in passing by D-B2 |
| D-M3 | MAJOR | 7.0.0 deletes `variant` **and** `size:"icon"` ⇒ glass capsules + typecheck break; 113 `variant=` / 38 `size="icon"` / 35 files | **CONTRADICTS-BY-OMISSION `CENSUS:102-106`**; F.W1 budget is wrong without it |
| D-M4 | MAJOR | keyboard selection has no rendered marker in either arm; field shows no result state | visual half of C-7 |
| D-M5 | MAJOR | three type systems in one panel; `0.78rem` × 1.125rem root = 14px ⇒ iOS auto-zoom armed in the repair; glass-ui's `.ios` guard inert | **new** |
| D-M6 | MAJOR | raw `@input` instead of `v-model` ⇒ IME composition writes intermediate keystrokes; duplicated in the modal | **new** |
| D-M7 | MAJOR | the clear control unmounts itself ⇒ focus destroyed | extends C-6 |
| D-M8 | MAJOR | floating variant deletes the only focus affordance; no replacement in `style.css:133-143` | **new**; folds C-4, C-S5, `lane-frontend.md:602` |
| D-m1 | MINOR | 120ms-debounced mount of the expand button re-lays the row twice per query | **new** |
| D-m2 | MINOR | raw `ease` at `:55`/`:94` vs the file's own `--ease-*` tokens — A.W3.d misses | **new** |
| D-m3 | MINOR | no empty state on either inline arm; the one that exists is gated behind having results | **new** |
| D-m4 | MINOR | six geometry literals where imported tokens exist | **new** |
| D-m5 | MINOR | no `type="search"`, `enterkeyhint`, `autocapitalize`, `autocorrect`, `spellcheck` | complements C-7 |
| D-m6 | MINOR | `...` not `…`; string duplicated in the modal; `title`-only labels invisible on touch | **new** |
| D-i1 | INFO | unguarded focus ↔ `isOpen` cycle | **new** |
| D-i2 | INFO | focus indicator passes at 3.31:1 but the state *change* is 1.71:1 | **new** |
| D-i3 | INFO | axe runs, only on `/visualize`; every a11y finding here is ungated | sharpens C-12 |

**Repair ordering, if this component is repaired rather than replaced.** The scope cure (C-1) is *not* the first move — it is a trigger. Landing it alone activates three regressions: the placeholder and glyph drop to 1.89:1 / 2.04:1 (D-M1), the input loses its UA focus ring (C-S5), and the mobile field crosses under 16px (D-M5). The correct order is: **(1)** re-tokenise the colour and type declarations to `--muted-foreground` at full opacity / `--control-text` and drop `outline: none`; **(2)** swap `size="icon"` → `size="icon-sm"` (D-B2, the only fix that does not need the scope at all); **(3)** then move the rules where they can match, with `min-width: 0` intact (D-B1); **(4)** the contract pass — `v-model` (D-M6), clear-not-close + refocus (D-M7/C-6), `type="search"` + input-mode attributes (D-m5), ARIA (C-7). D-M3 is not on this ladder: it is F.W1's, and it is 113 sites wide.

**But the shadow row argues the ladder is wasted motion.** `CENSUS:99` / `lane-frontend.md:438` / C-2 establish that `@mkbabb/glass-ui/search` ships `SearchBar` (`{modelValue, placeholder, icon?, tag}` + `inputRef`) and `FuzzySearch` at the **installed** 4.0.0 and again at 7.0.0. Adoption deletes D-B1, D-B2, D-M2, D-M4, D-M5, D-m3, D-m4 and D-m6 outright — every proportional, typographic and state-coverage finding on this axis except the colour tokens, which move upstream where the producer's own contrast baseline governs — and it moves D-M6/D-m5 to a surface the producer maintains for all consumers. On the design axis the conclusion is the same one the consumption axis reached by a different road: **the best repair of this component is its deletion.**

---

*Evidence written outside this file: none. Read-only across `/Users/mkbabb/Programming/fourier-analysis` (source; `web/dist` build artifact dated 2026-06-12; `web/node_modules/@mkbabb/glass-ui@4.0.0`, `lucide-vue-next@1.0.0`, `tailwindcss@4.3.1`, `vue@3.5.38`), `/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/glass-ui@7.0.0` (producer comparison only), and the value.js megatranche corpus. One scratchpad script (`sfc.mjs`) ran `@vue/compiler-sfc` over `PaperSearch.vue` to re-derive the emitted scoped selectors; it imported nothing from product source and wrote nothing into either repo. No browser was used; every livable-only consequence is marked UNPROVEN-NEEDS-LIVE for SS-13.*
