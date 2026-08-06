claude-opus-5[1m]

# Challenge · `PaperSearch` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSearch.vue` (397 lines)
**Read whole, read-only** — plus every import: `search/PaperSearchInput.vue` (69), `search/PaperSearchDropdown.vue` (70),
`search/PaperSearchModal.vue` (124), `search/usePaperSearch.ts` (108), `search/searchHelpers.ts` (74),
`search/index.ts` (4), and the substrate it renders against: `web/src/style.css` (143),
`@mkbabb/glass-ui@4.0.0` (`dist/button.js`, `dist/styles/**`, `src/styles/**`).
**Consumers read for context** — `paper/PaperSidebar.vue`, `paper/MobileFloatingToc.vue`.
**Pin** `@mkbabb/glass-ui: ^4.0.0` (`web/package.json:14`), resolved **4.0.0** (`node_modules/@mkbabb/glass-ui/package.json`); producer latest **7.0.0**.
**No browser tooling used.** Every pixel-level consequence is marked `UNPROVEN-NEEDS-LIVE` (SS-13); every *mechanism* is proven from the tree.

**Ledger — 32 defects · 3 BLOCKER · 6 superlatives.**

---

## §0 · Verdict

`PaperSearch.vue` is **not a component**. It is a 17-line pass-through host bolted to a **356-line orphaned
stylesheet**. At commit `ffba307` (`feat(A.W1.a.1): land web migration cohort`) the monolithic search component
was split into `search/PaperSearchInput.vue` + `search/PaperSearchDropdown.vue` + `search/PaperSearchModal.vue`
— **the markup moved, the `<style scoped>` block did not**. Because Vue's scope attribute reaches a child
component's *root element only*, roughly **93 % of the stylesheet no longer matches anything in the DOM**.

Everything the DESIGN axis normally judges — proportion, elevation, colour semantics, motion, focus treatment —
is therefore split into two registers, and this challenge is organised accordingly:

- **§2 — what actually renders today.** The design as shipped. Three BLOCKERs.
- **§3 — what the authored stylesheet *intends*.** Latent defects that go **live the instant the scoping is
  repaired**. Two of them (D-16 focus indicator, D-8 highlight) mean a *naïve* repair is a **regression**, not a fix.
  F.W1 must not simply add `:deep()` and walk away.

The component is DEFECTIVE. The tree does not exculpate it. It does, however, contain six pieces of genuinely
superlative craft (§9) — all six in the *TypeScript*, none in the CSS.

---

## §1 · D-1 — the load-bearing defect

### D-1 · BLOCKER · 330 of 356 style lines are dead code

**Provenance** `PaperSearch.vue:41` (`<style scoped>`) against `PaperSearch.vue:22-39` (a template containing
exactly one element — `div.paper-search` — plus three component tags).

**Mechanism (proven, static).** Vue 3's `setScopeId` (runtime-core renderer) applies a parent's scope id to a
child component's element **only when that element vnode *is* the child's `subTree`** — i.e. only to a
*single-root* child's root node. Descendants never inherit it.

| Child | Root shape | Parent scope id reaches | Verdict |
|---|---|---|---|
| `PaperSearchInput.vue:35` | single root `div.paper-search-input-wrap` | that div, and nothing inside it | root **LIVE**, internals **DEAD** |
| `PaperSearchDropdown.vue:35,65` | **two** roots (`<Transition>` + `div.paper-search-backdrop`) → Fragment subTree | *nothing* | **ALL DEAD** |
| `PaperSearchModal.vue:41` | single root `<Teleport>` (not an element) | *nothing* | **ALL DEAD** |

None of the three children declares a `<style>` block of its own, so their descendants carry **no `data-v-*`
attribute at all** — the scoped selectors cannot match by any route.

**Surviving rules (26 lines, 7 %):** `.paper-search` (43-45), `.paper-search-input-wrap` + `:focus-within`
(47-60), `.paper-search--sidebar` (199-201), `.paper-search--floating .paper-search-input-wrap` (204-209).
**Dead (330 lines, 93 %):** everything else — every icon, input, action button, result row, badge, number,
label, `mark`, backdrop, both dropdown transitions, the entire modal (overlay, panel, header, input, results,
empty state, footer, `kbd`) and all four modal transition rules.

**Falsifier.** Build `web/` and grep the emitted CSS for `.paper-search-icon[data-v-`; then render and query
`document.querySelector('.paper-search-icon').getAttributeNames()`. If the icon element carries the same
`data-v-*` hash as `div.paper-search`, D-1 is refuted and §2 collapses. It will not: the icon is a descendant
inside `PaperSearchInput.vue`'s template, and that file has no style block to mint a hash of its own.

**Corroboration from the tree itself.** `style.css:129-135` documents this exact mechanism in prose — *"Because
Vue's scoped styles add a data-attribute selector, the ring lives at the global layer so it applies regardless
of the component scope hash"* — and hoists focus rings for four other scoped classes to the global layer.
The team **knows** the rule. The paper-search classes are simply absent from that hoist list (`style.css:136-139`
names `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card` — and nothing from this family).

**Blast radius.** `MobileFloatingToc.vue:111` (mobile) and `PaperSidebar.vue:51` (desktop ≥1024px) — i.e. the
entire `/paper` route, both breakpoints.

---

## §2 · What actually renders today

### D-2 · BLOCKER · The expand modal renders as an unstyled block at the end of `<body>`

**Provenance** `PaperSearch.vue:239-250` (`.search-modal-overlay { position: fixed; inset: 0; z-index: var(--z-modal); … backdrop-filter: blur(6px) }`) and `252-264` (`.search-modal { width: min(36rem, calc(100dvw - 2rem)); max-height: 70vh; border; background; box-shadow; overflow: hidden }`) — **both dead per D-1** — against `PaperSearchModal.vue:41` (`<Teleport to="body">`) and `:43-48`.

**Mechanism (proven).** With every `.search-modal*` rule dead, the teleported subtree inherits **no positioning,
no z-index, no overlay tint, no backdrop blur, no width bound, no max-height, no border, no background, no
shadow, no `overflow: hidden`**. `Teleport to="body"` appends it as the **last child of `<body>`**, so it becomes
a normal static block laid out *after the entire document* — a treatise page.

**Consequence (UNPROVEN-NEEDS-LIVE).** Clicking Expand (`PaperSearchInput.vue:47-57`) produces no visible modal;
`PaperSearchModal.vue:19-24` then calls `.focus()` on the teleported input, which scroll-anchors the viewport to
the bottom of the document. The user's apparent experience: *the search UI vanishes and the page jumps to the
end.* `@click.self="search.toggleExpanded()"` (`:46`) is unreachable (no overlay to click), so the only exits are
the two icon buttons and `Escape` while focus is in the modal input.

**Falsifier.** Set `search.isExpanded = true` and read
`getComputedStyle(document.querySelector('.search-modal-overlay')).position`. `"fixed"` refutes D-2; `"static"`
confirms it. Also assert `document.body.lastElementChild.className === 'search-modal-overlay'`.

### D-3 · BLOCKER · The inline dropdown is not positioned — it reflows its host

**Provenance** `PaperSearch.vue:103-116` (`.paper-search-results { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: var(--z-bar); max-height: 50vh; overflow-y: auto; … }`) and `215-221` (the floating override) — dead — against `PaperSearchDropdown.vue:36-40`.

**Mechanism (proven).** `.paper-search { position: relative }` (`:43-45`) survives, but the element it was meant
to position no longer takes `position: absolute`. The results div is a **static block in flow**, with no
`max-height`, no `overflow-y`, no `overscroll-behavior`, no border, no radius, no shadow, no z-index — carrying
up to **30 rows** (`usePaperSearch.ts:36`, `searchIndex(index, …, 30)`).

The **one** class that still bites is `glass-floating` (`PaperSearchDropdown.vue:39`) — a *global* glass-ui class
(`src/styles/glass/ladder.css:83,200`), unaffected by scoping. So the dropdown gets the glass **material**
(backdrop tint, specular track) with **none of the geometry**: a floating plate that isn't floating.

**Consequence (UNPROVEN-NEEDS-LIVE).**
*Sidebar* — the results block is injected above `.sidebar-header` inside `.sidebar-nav`, itself an
`overflow-y: auto` sticky panel (`PaperSidebar.vue:151-166`); the entire table of contents is pushed down by up
to 30 rows and the dropdown scrolls *with* the ToC rather than over it.
*Floating (mobile)* — it lands inside `.floating-toc-bar--search` (`MobileFloatingToc.vue:109-113`), a
horizontal bar, expanding it into a full-height slab over the article.

**Falsifier.** With ≥1 result, read `getComputedStyle($('.paper-search-results')).position` — `"absolute"`
refutes. Or: assert the ToC's first item does **not** move when a query is typed.

### D-4 · MAJOR · Result rows render as glass **pill** buttons, not rows

**Provenance** `PaperSearchDropdown.vue:41-46` / `PaperSearchModal.vue:83-88` — `<Button variant="ghost">` with
**no `size` prop**, so glass 4.0.0's `defaultVariants: { size: "default" }` (`dist/button-BNDWhAZb.js`) applies
`h-(--control-h-md) px-4 py-2 has-[>svg]:px-3`, on a base of
`btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium …`.
`.btn-pill` (`src/styles/glass/surfaces.css:119-125`) is
`inline-flex items-center justify-center … border-radius: var(--radius-pill)` with
`padding: calc(0.5rem * var(--ui-scale)) calc(1rem * var(--ui-scale))`.
`--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`; `--radius-pill: 9999px`.

The authored intent — `.paper-search-result { display: flex; width: 100%; align-items: baseline;
padding: 0.35rem 0.5rem; border-radius: calc(var(--radius) - 4px); text-align: left }`
(`PaperSearch.vue:118-130`) — is **dead**. Every one of those seven declarations is contradicted by the glass
default that now governs:

| Authored | Live (glass 4.0.0) |
|---|---|
| `display: flex` + `width: 100%` | `inline-flex`, content-width ⇒ rows **flow inline and wrap** |
| `align-items: baseline` (badge/number/label sit on one baseline) | `items-center` ⇒ the 0.6rem badge floats mid-row |
| `padding: 0.35rem 0.5rem` (5.6 px / 8 px) | `0.5rem 1rem` **and** a hard `h-2.5rem` ⇒ 40 px rows, **2.9× the intended vertical rhythm** |
| `border-radius: calc(var(--radius) - 4px)` = 6 px | `9999px` — **pills** |
| `background: none` + `hover: --muted 50%` | `bg-transparent` + `hover:bg-foreground/8` (a different hover value) |
| `transition: background 0.1s ease` | the glass six-leg transition (surfaces on `--ease-standard`, `scale` on `--spring-smooth`) |

**Consequence (UNPROVEN-NEEDS-LIVE).** 30 content-width pills wrapping across the container instead of a scannable
vertical list. In a ~240 px sidebar column this is not a degraded list; it is not a list.

**Falsifier.** `getComputedStyle($('.paper-search-result')).display` → `"flex"` refutes; `"inline-flex"` confirms.
Likewise `borderRadius` → `"6px"` refutes, `"9999px"` confirms.

### D-5 · MAJOR · Result labels cannot truncate — they overflow

**Provenance** three interacting facts, all proven statically:
1. `.paper-search-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }` (`PaperSearch.vue:174-183`) — **dead**.
2. `.btn-pill > * { @apply flex-shrink-0 }` (`glass-ui/src/styles/glass/surfaces.css:158-160`) — **global, live**; the label span is a direct child of the Button and is pinned non-shrinkable.
3. The Button base carries `whitespace-nowrap` (`dist/button-BNDWhAZb.js`) — **live**.

`resultLabel()` slices to **120 characters** (`searchHelpers.ts:26-27`).

**Consequence (UNPROVEN-NEEDS-LIVE).** A 120-character theorem statement renders as one unbreakable 120-char
line inside a non-shrinking flex child inside a content-width pill. Combined with D-3 (no `overflow-y`, no
`max-height`, static flow) the dropdown has **no containment in either axis**. The `min-width: 0` on line 175 —
the correct fix for exactly this trap — is the very declaration that died.

**Falsifier.** Query a long section title and read `$('.paper-search-label').scrollWidth` vs `clientWidth`; equal
widths with a visible ellipsis refute. Or read `getComputedStyle($('.paper-search-label')).flexShrink` → `"1"`
refutes, `"0"` confirms.

### D-6 · MAJOR · The mobile dismiss backdrop is inert

**Provenance** `.paper-search-backdrop { position: fixed; inset: 0; z-index: var(--z-bar) }`
(`PaperSearch.vue:192-196`) — dead — against `PaperSearchDropdown.vue:65-69`, whose sole purpose is
`@click="search.close()"`.

**Mechanism (proven).** Without `position: fixed; inset: 0` the element is an empty static div of **zero height**.
It occupies no hit area. Tap-outside-to-dismiss does not exist on the floating (mobile) variant.

**Consequence.** On mobile the only dismissals are the `X` button (`PaperSearchInput.vue:58-67`, rendered only
while `query` is non-empty) and a hardware `Escape` (`usePaperSearch.ts:83-90`) — which phones do not have.

**Falsifier.** `$('.paper-search-backdrop').getBoundingClientRect().height` → `0` confirms; any non-zero refutes.

### D-7 · MAJOR · The sidebar variant has no outside-dismiss **by design**

**Provenance** `PaperSearchDropdown.vue:66` — the backdrop is gated `variant === 'floating'`. `isOpen` is set
`true` on focus (`PaperSearchInput.vue:45`) and cleared only by `close()`, `Escape`, or selecting a result
(`usePaperSearch.ts:48-53,83-90`). **There is no `@blur` handler and no outside-click listener for the sidebar.**

**Consequence.** On desktop, focusing the input and then clicking anywhere else in the article leaves the
dropdown open indefinitely over (today: *inside*, per D-3) the table of contents. This is a design-contract
defect independent of D-1 — it would persist after a scoping repair.

**Falsifier.** Focus input, type, click the article body; assert `search.isOpen.value === false`. It will be `true`.

### D-8 · MAJOR · Fuzzy-match highlighting falls back to the UA `mark` colour

**Provenance** `.paper-search-label :deep(mark) { background: hsl(50 100% 60% / 0.35); color: inherit;
border-radius: 1px; padding: 0 1px }` (`PaperSearch.vue:185-190`). `:deep()` compiles to
`.paper-search-label[data-v-x] mark` — the attribute still lands on `.paper-search-label`, which per D-1 does
not carry it. **Dead.** The `<mark>` elements are minted by `highlightFuzzy()` (`searchHelpers.ts:61`) and
injected via `v-html` (`PaperSearchDropdown.vue:58`, `PaperSearchModal.vue:100`).

**Consequence (UNPROVEN-NEEDS-LIVE).** Highlights render with the **user-agent** `mark { background-color: Mark;
color: MarkText }` — saturated yellow with forced black text — inside a warm-cream (`--neutral-0:
hsl(40 30% 98%)`) or near-black (`hsl(24 9% 4%)`) glass surface. In dark mode this is a full-saturation yellow
block bearing black text dropped into a dark plate: the single highest-chroma element on the page, and the one
element the palette never sanctioned. `color: inherit` — the declaration that would have *prevented* the forced
black text — is the one that died.

**Falsifier.** `getComputedStyle($('.paper-search-label mark')).backgroundColor` → an `hsl(50 100% 60% / .35)`
equivalent refutes; the UA `Mark` system colour confirms.

---

## §3 · Latent — what a scoping repair makes live

Each row below is currently inert. **F.W1 must treat these as part of the repair, not after it** — D-16 and D-8
in particular mean a mechanical `:deep()` sweep *lowers* accessibility.

Contrast figures are computed from glass-ui 4.0.0 tokens (`dist/styles/tokens/*`), WCAG 2.x relative luminance,
sRGB compositing. Light: `--background = --neutral-0 = hsl(40 30% 98%)`; `--muted-foreground = --neutral-5 =
hsl(30 22% 40%)` (the token file itself annotates *"WCAG AA: 5.21:1 vs page"*); `--muted = --neutral-1 =
hsl(38 26% 95%)`. Dark: `hsl(24 9% 4%)` / `hsl(34 14% 62%)` / `hsl(28 12% 11%)`.

### D-14 · MAJOR · The `color-mix(… X %, transparent)` idiom destroys text contrast — six sites

The file dilutes an **already-minimum-contrast** token. `--muted-foreground` clears AA at **5.21:1**; every use
here multiplies it down.

| Site | Line | Declaration | Computed (light) | Required | Verdict |
|---|---|---|---|---|---|
| input placeholder | 80-82 | `--muted-foreground 45%` | **1.88 : 1** | 4.5 : 1 | FAIL |
| search icon | 62-67 | `--muted-foreground 50%` | **2.04 : 1** | 3 : 1 (1.4.11 graphic) | FAIL |
| action-button glyph | 84-95 | `--muted-foreground 45%` | **1.88 : 1** | 3 : 1 | FAIL |
| result number | 168-172 | `--muted-foreground 60%` | **2.41 : 1** | 4.5 : 1 | FAIL |
| modal placeholder | 292-294 | `--muted-foreground 40%` | **≈1.75 : 1** | 4.5 : 1 | FAIL |
| modal hint / `kbd` label | 336-342 | `--muted-foreground 45%` | **1.88 : 1** | 4.5 : 1 | FAIL |
| modal empty state | 321-326 | `--muted-foreground 50%` | **2.04 : 1** | 4.5 : 1 | FAIL |
| badge label | 137-148 | `--muted-foreground 70%` over `--muted` | **2.78 : 1** | 4.5 : 1 (9.6 px) | FAIL |

**Falsifier.** Revive the scoping, then run the repo's already-installed `@axe-core/playwright ^4.11.3`
(`lane-frontend.md §8`) `color-contrast` rule over `/paper` with the search open. Any of the eight passing at
AA refutes that row. Note the "empty state" row is the app's *only* zero-result message (D-12) — rendered at the
worst contrast in the file.

**Note the inversion.** The action-button glyph row is currently *saved* by D-1: glass `variant="ghost"` supplies
`text-foreground/70` (`dist/button-BNDWhAZb.js`), a far higher contrast than the authored 45 % muted. Reviving
`.paper-search-action-btn` (`PaperSearch.vue:91`) **regresses** it.

### D-15 · MAJOR · Hardcoded badge hues, no dark variant, two of them fail AA

**Provenance** `PaperSearch.vue:158-166`:
`[data-type="definition"] { background: hsl(210 80% 55% / 0.12); color: hsl(210 80% 45%) }`,
`[data-type="equation"] { background: hsl(280 60% 55% / 0.12); color: hsl(280 60% 45%) }`.
Raw HSL literals — no token, no `.dark` override, no `light-dark()`, while every neighbouring value in the file
routes through tokens.

| Badge | Light | Dark | Required (9.6 px bold) |
|---|---|---|---|
| `definition` blue | **4.06 : 1** FAIL | **3.67 : 1** FAIL | 4.5 : 1 |
| `equation` purple | 5.47 : 1 pass | **2.72 : 1** FAIL | 4.5 : 1 |

**Falsifier.** Sample the rendered badge foreground/background with `getComputedStyle` in each theme and run the
WCAG ratio. Any result ≥ 4.5 : 1 refutes that cell.

### D-16 · MAJOR · The input's focus indicator is suppressed and its replacement fails SC 2.4.11

**Provenance** `.paper-search-input { … outline: none … }` (`PaperSearch.vue:73`) with the substitute
`.paper-search-input-wrap:focus-within { border-color: color-mix(in srgb, var(--primary) 50%, transparent) }`
(`:58-60`) over a resting `border: 1.5px solid var(--border)` (`:51`).

`--border = --neutral-4 = hsl(32 26% 70%)` (light); `--primary = hsl(24 10% 10%)` (light — *identical to
`--foreground`*). Unfocused-vs-focused border **change contrast = 1.71 : 1**. WCAG 2.2 SC 2.4.11 *Focus
Appearance* requires ≥ **3 : 1** between focused and unfocused states.

**This is the sharpest instance of the §0 inversion.** `outline: none` on line 73 is *dead*, so today the input
shows the **native UA focus ring** — compliant. Reviving the stylesheet **removes a working focus indicator and
replaces it with a failing one**. Note `.paper-search-input-wrap:focus-within` (`:58-60`) is one of only four
surviving rules — the *substitute* is live while the *suppression* is dead, which is why the defect is invisible
today.

**Falsifier.** After a scoping repair, `getComputedStyle($('.paper-search-input')).outlineStyle === 'none'` while
focused, plus the 1.71 : 1 border-delta computation. A repair that also drops line 73 refutes.

### D-17 · MAJOR · Hardcoded black shadows — elevation disappears in dark mode

**Provenance** `PaperSearch.vue:114` (`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1)`) and `:260-262`
(`0 8px 40px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.06)`). Literal black at 6-14 % alpha, no token.

The app's dark page surface is `hsl(24 9% 4%)` — **luminance 0.0096**. Black-on-near-black at 10 % alpha is
below the perceptual threshold: the two floating surfaces have **no elevation cue at all** in dark mode, on a
route whose entire chrome is glass. Contrast this with the sibling `PaperSidebar.vue:166`, which builds its
shadow from `color-mix(in srgb, var(--foreground) 8%, transparent)` — theme-reactive, the correct idiom, in the
same directory.

**Falsifier.** Flip `.dark` and compare the rendered plate edge against its backdrop; a measurable luminance
step at the shadow band refutes.

### D-18 · MINOR · The type-colour system collapses in light mode and inverts between themes

**Provenance** `PaperSearch.vue:150-156` (`theorem`/`lemma`/`proposition`/`corollary` → `color: var(--primary)`
on `color-mix(--primary 12%, transparent)`) against `TYPE_LABELS` (`searchHelpers.ts:8-22`, **13 types**).

`--primary` is `light-dark(hsl(24 10% 10%), oklch(0.739 0.134 318.1))` — in **light mode it is byte-identical to
`--foreground`**. So the four "accented" badges render as **plain near-black text on a grey tint**, visually
indistinguishable from the default badge; in **dark mode the same four turn magenta-pink**. The encoding
therefore means one thing in one theme and another in the other.

Aggregate: 13 semantic types → **4 colour buckets** (4 primary-tinted, 1 blue, 1 purple, 7 undifferentiated
grey: `section`, `figure`, `code`, `proof`, `bibliography`, `aside`, `example`), **half token-derived and half
hardcoded**, with **no legend anywhere**. A reader cannot learn the code because the code is not consistent.

**Falsifier.** Read the light-mode computed `color` of a `[data-type="theorem"]` badge and of `--foreground`.
Different values refute.

### D-19 · MINOR · Three typographic systems, no scale

**Provenance** raw rem at `:75` (`0.78rem`), `:64-65` (`0.8rem`), `:139` (`0.6rem`), `:170` (`0.68rem`),
`:310` (`0.65rem`), `:314` (`0.72rem`), `:354` (`0.6rem`); Tailwind utilities via `@apply` at `:177`
(`text-sm`), `:212`, `:287`, `:318`, `:326` (`text-base`), `:337` (`text-sm`); and **zero** use of glass-ui's
control register `--control-text` (`calc(var(--type-small) * var(--ui-scale))`) which the sibling `<Button>`
elements in the same subtree already paint with.

Successive ratios across the raw set — 0.6 → 0.65 → 0.68 → 0.72 → 0.78 → 0.8 — are 1.083, 1.046, 1.059, 1.083,
1.026. **No modular relationship.** These are eyeballed values, not a scale. Aristotelian proportion requires a
common measure; there is none, and mixing in a second (Tailwind) and ignoring a third (glass) guarantees the
three drift apart under any future `--ui-scale` change — precisely the axis glass-ui built `--control-text` to
ride (`surfaces.css:127-132`).

Concretely: the badge at `0.6rem` is **9.6 px** at the ≥768 px root (`style.css:45-50` sets `html { font-size:
1rem }` there), **uppercase, weight 700, letter-spaced 0.04em** — below any reasonable legibility floor and, per
D-14, at 2.78 : 1.

**Falsifier.** Exhibit a documented ratio (1.125/1.2/1.25/φ) that generates the six raw sizes from a base.

### D-20 · MINOR · Off-grid spacing

**Provenance** the padding/gap/margin set across `:50,54,88,116,123,143,270,302,306,311,330,332,350`:
`0.1 · 0.125 · 0.15 · 0.25 · 0.3 · 0.35 · 0.375 · 0.5 · 0.625 · 0.75 · 0.875 · 1 rem`.

Tailwind v4's 4 px grid (which `style.css:1` imports and this file `@reference`s) yields `0.25 / 0.5 / 0.75 / 1`.
Five values — `0.1`, `0.15`, `0.3`, `0.35`, `0.625` — are off-grid, and `0.3rem`/`0.35rem` differ from the
adjacent `0.375rem` by ~1 px, a distinction no viewer can perceive but every future editor must preserve. There
is no vertical rhythm to speak of: the wrap's `0.3rem` and the row's `0.35rem` are two different answers to the
same question, 0.8 px apart.

**Falsifier.** Point to a spacing token or documented step that generates `0.3`/`0.35`/`0.625`.

### D-21 · MINOR · Six transitions, zero `prefers-reduced-motion` guards

**Provenance** `PaperSearch.vue:224-236` (dropdown enter/leave: `opacity` + `translateY(-4px)`) and `:358-396`
(modal enter/leave: `opacity` + `scale(0.96) translateY(-8px)` / `scale(0.97) translateY(-4px)`). The file
contains **no** `@media (prefers-reduced-motion: reduce)` block. `style.css:92-96` guards only the tab-panel
animation.

This **extends** `lane-frontend.md §8`'s enumeration: that census lists 8 CSS `reduce` blocks across 8 files and
flags two ungated *rAF clocks*, but does not register PaperSearch as a **ninth CSS motion site needing a guard**.
It is latent today only because D-1 killed the transitions — which is also why the census's grep-based sweep
would not have surfaced it. **Contradiction, explicit:** the lane's implicit "CSS motion is covered" reading is
incomplete; a scale+translate modal entrance is exactly the vestibular trigger WCAG 2.3.3 addresses, and the
repo already cites that SC by name at `GalleryMarquee.vue:126-128` (*"D.W4.c — prefers-reduced-motion guard.
WCAG 2.3.3 / A3 #9 finding"*). The precedent exists in-tree and was not applied here.

**Falsifier.** `grep -c "prefers-reduced-motion" PaperSearch.vue` → non-zero refutes. (It is 0.)

### D-22 · MINOR · The motion vocabulary is half-migrated

**Provenance** the file's own annotations — `:224` *"A.W3.d — bezier→`--ease-out-expo`"* and `:363`
*"A.W3.d — bezier→canonical tokens"* — sit beside **nine hardcoded durations**: `0.15s` (`:55,229,371,376`),
`0.12s` (`:94` ×2), `0.1s` (`:129`), `0.2s` (`:360,366`), `0.25s` (`:367`). glass-ui 4.0.0 ships the duration
half of the same vocabulary (`--duration-fast`, `--duration-slow`, used by `.btn-pill`'s own transition at
`surfaces.css:139-146`). A.W3.d migrated the **easings** and left the **durations**; the file now speaks half a
token language, and the annotation implies the migration is complete when it is not.

**Falsifier.** Show a glass-ui 4.0.0 duration token whose value is `0.12s`, or evidence A.W3.d scoped itself to
easings only.

### D-32 · MINOR · Mixed viewport units in the modal

**Provenance** `PaperSearch.vue:246` (`padding-top: min(12vh, 6rem)`), `:254` (`max-height: 70vh`) — `vh` —
against `:253` (`width: min(36rem, calc(100dvw - 2rem))`) — `dvw`. One box, two viewport models.

On iOS Safari, `vh` resolves against the *largest* viewport while `dvw` tracks the dynamic one; the panel is
sized and offset against a taller box than it occupies, pushing its bottom edge (and the footer hints at
`:328-334`) under the browser chrome. The author reached for the dynamic unit on one axis and not the other.

**Falsifier.** Compare `100vh` and `100dvh` on a real iOS Safari session with the URL bar expanded; equality
refutes.

---

## §4 · glass-ui conformance under the OLD PIN — and what F.W1 changes

### D-23 · MINOR · A hand-rolled button skin layered over the design-system Button

**Provenance** `.paper-search-result` (`:118-135`) and `.paper-search-action-btn` (`:84-100`) re-declare
`display`, `padding`, `border`, `background`, `cursor`, `text-align`, `border-radius`, `transition` and a hover
state — **every one of which** `btn-pill` (`surfaces.css:119-146`) + `variant="ghost"`
(`bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12`)
already own, on the same elements (`PaperSearchDropdown.vue:41-46`, `PaperSearchInput.vue:47-67`,
`PaperSearchModal.vue:61-78,83-88`).

Two are direct contradictions of the design language rather than refinements:
`border-radius: 3px` (`:93`) and `calc(var(--radius) - 4px)` = 6 px (`:128`) against `--radius-pill: 9999px`;
and `align-items: baseline` (`:120`) against `.btn-pill`'s `items-center`.

This is the `feedback_glass_ui_first_class` violation in its classic form: the variant that was wanted (a
left-aligned, full-width, small-radius **list row**) does not exist upstream and was re-implemented locally as
an override sheet instead of being added to glass-ui as a Button variant.

**Falsifier.** Show a glass-ui 4.0.0 Button variant/size producing a full-width left-aligned 6 px-radius row;
its absence confirms the shape of the finding.

### D-24 · MINOR · Icon sizing uses a class the Button base explicitly overrides

**Provenance** `PaperSearchInput.vue:55,56,66` (`class="h-3 w-3"`) and `PaperSearchModal.vue:68,77`
(`class="h-3.5 w-3.5"`) against the Button base
`[&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0` (`dist/button-BNDWhAZb.js`).

The escape hatch glass ships is a class **containing the substring `size-`**. `h-3 w-3` does not contain it, so
the `:not()` matches and the generated `… svg:not([class*=size-]) { width: var(--ui-glyph); height: var(--ui-glyph) }`
— specificity (0,2,1) — beats `.h-3` (0,1,0). The authored 12 px is silently discarded; icons render at
`--ui-glyph` = `calc(1rem * var(--ui-scale))` = 16 px. **The `h-3.5 w-3.5`/`h-3 w-3` distinction the author drew
between the modal and the inline chrome does not exist at runtime.**

**Falsifier.** `getComputedStyle($('.paper-search-action-btn svg')).width` → `"12px"` refutes; `"16px"` confirms.
The fix is `size-3` / `size-3.5`.

### D-25 · MINOR · Two different surface languages inside one component

**Provenance** `PaperSearchDropdown.vue:39` uses the glass ladder (`glass-floating`) for the inline dropdown,
while `PaperSearch.vue:252-264` hand-builds the **modal** plate from `background: var(--background)` +
`border: 1.5px solid var(--border)` + two literal rgba shadows — and `:247-249` hand-builds an overlay from
`color-mix(--background 55%)` + `backdrop-filter: blur(6px)` rather than glass's `.glass-overlay` rung
(`ladder.css:166,192,200`). The *same* search results, in the *same* component, sit on two unrelated materials.

**Falsifier.** Show a glass-ui 4.0.0 rung the modal deliberately declines with a written rationale; none exists
in-file.

### D-26 · MINOR · Focus-ring geometry cannot match the authored radii

**Provenance** `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill);
box-shadow: var(--focus-ring-shadow) }` (`glass-ui/src/styles/utilities/base.css:174-178`) — the base class on
every Button here. The ring **forces pill geometry on focus**. Against the authored 6 px rows (`:128`), 3 px
action buttons (`:93`) and 0.75 rem modal (`:257`), a repaired component would show a rounded-rect row whose
focus ring is a pill. Under the OLD PIN there is no opt-out.

**Falsifier.** Point to a glass 4.0.0 mechanism that inherits the host radius into `.focus-ring`.

### The F.W1 tri-package uplift — surfaces this component touches

Citing `lane-frontend.md §5` / `CENSUS-2026-08-03.md:425-445` (the break surface: **`metric-badge` ×7,
`hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant`
definition-absent, `lucide-vue-next → @lucide/vue` ×35, `pencil-boil` 0.4.1→^0.11.2**):

| Break-surface row | Hits PaperSearch? | Consequence |
|---|---|---|
| `metric-badge` → `metric` | **No** | this family imports only `./button` (`lane-frontend.md:288-290`) — 3 sites, all `Button` |
| `hover-card` / `hover-popover` → `Popover` | **No** | no overlay-primitive import here; the dropdown/modal are hand-rolled (D-25) — which is *why* it dodges the break |
| `DockIconButton` / `DockDropdownTrigger` | **No** | no dock members |
| `ToastVariant` (hard typecheck break) | **No** | no toast surface |
| **`lucide-vue-next → @lucide/vue`** | **YES — 3 files, 8 symbols** | `PaperSearchInput.vue:4` (`Search, X, Maximize2, Minimize2`), `PaperSearchModal.vue:4` (`Search, X, Minimize2`). Part of the 35-site sweep. |
| tri-package deadlock (`glass 4→7` ∧ `keyframes 4.3→6` ∧ `value 0.13→4.0`) | indirectly | this component cannot uplift alone; it rides the atomic transaction |

**Improved by the uplift:** producer 7.0.0 ships **`./search`** (`SearchBar.vue`, `composables/`,
`searchVariants.ts`) — *already present at 4.0.0 and unimported* — plus `useDockSearch` composing `useFuzzySearch`
("the VSCode subsequence scorer — **NO re-fork**"). `lane-frontend.md:438` files this family as a
**🟡 CANDIDATE SHADOW, 397 + 435 = 832 LOC**.

**Design-axis reinforcement of that row, from this audit:** the shadow is not merely duplicative, it is
**duplicative *and* broken** (D-1/D-2/D-3). The 832 LOC being carried locally do not currently produce a working
dropdown or a working modal. The cost-benefit on `lane-frontend.md:438` should be re-scored: the "keep local"
side of the ledger is defending a surface that does not render as designed at either breakpoint.

**Broken by the uplift:** nothing in this family beyond the lucide rename — *because* it consumes almost nothing
from glass-ui. That immunity is itself the indictment (D-23/D-25).

---

## §5 · Accessibility

### D-9 · MAJOR · No combobox semantics — the entire pattern is invisible to assistive tech

**Provenance** `PaperSearchInput.vue:37-46` — a bare `<input type="text">` with no `role="combobox"`, no
`aria-expanded`, no `aria-controls`, no `aria-activedescendant`, no `aria-autocomplete`, no `aria-haspopup`.
`PaperSearchDropdown.vue:36-40` — no `role="listbox"`; `:41-60` — no `role="option"`, no `aria-selected`, no `id`.

`ArrowDown`/`ArrowUp` (`usePaperSearch.ts:64-76`) move `selectedIndex`, which paints `.is-selected`
(`PaperSearchDropdown.vue:46`) — a **purely visual** cursor. Focus never leaves the input and **nothing is
announced**. A screen-reader user types a query and receives silence, then presses Enter and is navigated
somewhere unannounced (`usePaperSearch.ts:43-46`).

**Falsifier.** `$('.paper-search-input').getAttribute('role')` → `"combobox"` refutes. Or run the repo's
`@axe-core/playwright` `aria-required-attr` / `aria-input-field-name` rules over the open dropdown.

### D-10 · MAJOR · The expand modal is not a dialog

**Provenance** `PaperSearchModal.vue:43-48` — `<div class="search-modal-overlay">` / `<div class="search-modal">`
with **no `role="dialog"`, no `aria-modal="true"`, no `aria-label`/`aria-labelledby`, no focus trap, no
`inert`/`aria-hidden` on the background, and no focus restoration on close**.

Four consequences, each independently provable from the source:
1. **No trap** — `Tab` from the last modal control exits into the underlying document (which is not hidden).
2. **Teleported to the end of `<body>`** (`:41`), so `Shift+Tab` from the modal input walks *backwards through the
   entire article* — the worst possible ordering for a search overlay.
3. **`Escape` is bound to the inputs only** (`:59` and `PaperSearchInput.vue:44`). Move focus to a result Button
   and `Escape`, `ArrowUp`, `ArrowDown` and `Enter`-to-select-highlighted all stop working.
4. **No focus restore** — `close()` (`usePaperSearch.ts:48-53`) unmounts the subtree; focus falls to `<body>`
   and the user's place in the document is lost.

**Falsifier.** Open the modal, `Shift+Tab` twice, read `document.activeElement`. Anything inside `.search-modal`
refutes. Then `close()` and assert `document.activeElement !== document.body`.

### D-11 · MAJOR · No live region — result counts are never announced

**Provenance** no `aria-live`, `role="status"` or `aria-atomic` anywhere in the four files. `results` recomputes
on a 120 ms debounce (`usePaperSearch.ts:26-37`); the count changes silently.

**Falsifier.** `document.querySelectorAll('[aria-live]').length` within the search subtree → non-zero refutes.

### D-30 · INFO · Icon-only buttons are named by `title` alone

**Provenance** `PaperSearchInput.vue:53` (`:title="… ? 'Collapse' : 'Expand'"`), `:64` (`title="Clear search"`),
`PaperSearchModal.vue:66,75`. `title` does supply a last-resort accessible name, but it is not exposed to touch
users, is announced inconsistently, and introduces a tooltip delay. `aria-label` is the correct instrument;
`title` is the fallback. Contrast `PaperSidebar.vue:49` — same pattern, same weakness — versus
`EasingPicker.vue:9-15`, which `lane-frontend.md §8` singles out for its *written* ARIA rationale. The discipline
exists in this repo; it did not reach here.

**Falsifier.** Inspect the accessible name in a platform AT tree; a correct name from `title` alone refutes the
severity but not the recommendation.

---

## §6 · State coverage

### D-12 · MAJOR · The inline dropdown has no empty state

**Provenance** `PaperSearchDropdown.vue:37` — `v-if="search.isOpen && !search.isExpanded && search.results.value.length > 0"`.
A query with zero matches renders **nothing**: no message, no border, no acknowledgement. The user cannot
distinguish *"no matches"* from *"the search is broken"* from *"my keystrokes were dropped"*.

The modal **does** have one (`PaperSearchModal.vue:104-106`, "No results") — so the empty state exists, is
styled (`PaperSearch.vue:321-326`), and is simply **unreachable from the primary surface**. Both variants that
users actually meet (sidebar, floating) lack it.

**Falsifier.** Type `zzzzqqq` in the sidebar search and observe any rendered feedback.

### D-13 · MINOR · No loading/pending state; 120 ms of stale results

**Provenance** `usePaperSearch.ts:26-37` — a 120 ms debounce feeding `debouncedQuery`, with `results` computed
from the debounced value only. There is no `isPending` flag and no skeleton/spinner.

For 120 ms after every keystroke the dropdown displays results for the **previous** query while the input shows
the new one — a state the UI asserts is current. Below-`n`-character behaviour is also unhandled: a single
character runs the full fuzzy index and renders 30 rows.

**Falsifier.** Expose `debouncedQuery` and assert it equals `query` synchronously after a keystroke.

### D-29 · MINOR · The expand affordance and the dropdown disagree for 120 ms

**Provenance** `PaperSearch.vue:28` — `:can-expand="!!search.query.value && search.results.value.length > 0"`
mixes the **undebounced** `query` with the **debounced** `results`.

Clearing the final character sets `query` to `""` immediately → `canExpand` false → the Expand button unmounts
(`PaperSearchInput.vue:48`) — while `results` stays populated for another 120 ms, so the dropdown remains open
beneath it. The button vanishes out from under the cursor. Symmetrically, on the first keystroke the button
appears one debounce *after* the text.

**Falsifier.** Instrument both refs and assert they transition on the same tick.

### D-27 · MINOR · Prose

- **`"Search paper..."`** (`PaperSearchInput.vue:41`, `PaperSearchModal.vue:56`) — three ASCII periods, not `…`,
  in an application whose entire identity is Computer Modern typesetting (`style.css:14`, `index.html` preloads
  `cmunrm/cmunbx/cmunti`). A treatise renderer that cannot set an ellipsis. The string is also **duplicated
  verbatim across two files** with no shared constant, while `searchHelpers.ts` exists precisely to host such
  shared display concerns (and already exports `TYPE_LABELS`).
- **`"No results"`** (`PaperSearchModal.vue:105`) — no echo of the query, no recovery path, no suggestion. Two
  words at 2.04 : 1 contrast (D-14) after a 2 rem pad (`:322`).
- **Register drift in the hints** (`PaperSearchModal.vue:110-118`) — `↑↓ navigate`, `↵ select`, `esc close`:
  glyph-glyph-word for two, lowercase-word-word for the third. Either all keys are glyphs or all are words.
- **Discovery asymmetry** — the keyboard hints exist **only in the modal**, i.e. only after the user has already
  discovered the modal. The inline dropdown, where arrow-key navigation is equally live
  (`usePaperSearch.ts:64-76`), advertises nothing.

**Falsifier.** Any of these is refuted by a copy-deck or i18n constraint mandating ASCII; none is present in the
tree (`grep -rn "i18n\|vue-i18n" web/src` → empty).

### D-28 · INFO · Dead API surface

**Provenance** `PaperSearchDropdown.vue:12-14` and `PaperSearchModal.vue:12-14` both declare
`const emit = defineEmits<{ select: [id: string] }>()` — **never called** in either file, and **never listened
for** by the host (`PaperSearch.vue:31-37` binds no `@select`). `PaperSearchDropdown.vue:30`
`defineExpose({ resultsRef })` — never read by the host. `PaperSearch.vue:8` `const props = defineProps<…>()` —
`props` is never referenced (the template reads `search`/`variant` directly).

None break the build: `web/tsconfig*.json` sets `strict: true` but **not** `noUnusedLocals`, so `vue-tsc -b`
stays green. This is a documented contract that lies about the component's interface — a reader of
`PaperSearchDropdown.vue` reasonably concludes selection is emitted upward; it is not (selection is a side
effect of `search.selectResult` reaching into `navigateTo`, `usePaperSearch.ts:43-46`).

**Falsifier.** `grep -n "emit(" web/src/components/paper/search/*.vue` → any hit refutes. (Only the `expand`
emit in `PaperSearchInput.vue:52` exists.)

### D-31 · MINOR · The modal/dropdown proportion is asserted twice, not derived

**Provenance** `PaperSearch.vue:304-319` — `.search-modal-result .paper-search-badge { font-size: 0.65rem;
padding: 0.125rem 0.375rem }`, `… .paper-search-number { font-size: 0.72rem }`, `… .paper-search-label
{ @apply text-base }` — a second full type/space scale for the same three atoms, written as context overrides.

The relationship the author wanted is *"the modal is one step larger than the dropdown"* — a **single ratio**.
It is instead encoded as six independent magic numbers that must be kept in sync by hand with their six
counterparts at `:137-183`. One custom property (`--search-scale`) applied once at `.search-modal` would carry
the whole relation and make the intent legible.

**Falsifier.** Derive `0.65/0.6`, `0.72/0.68`, `0.375/0.3` — 1.083, 1.059, 1.25. Not one ratio. A consistent
factor refutes.

---

## §9 · Superlatives (L-18 runs both ways)

All six are in the TypeScript. None is in the CSS — which is itself the finding.

**S-1 · `searchHelpers.ts:52-70` — a `v-html` sink done exactly right.**
`highlightFuzzy` escapes **each fragment before assembly** (`:61` escapes the matched slice, `:64` the unmatched
char) rather than escaping the finished string — so `<mark>` tags survive while every byte of user/document text
is neutralised, with no double-escape path. The two early returns (`:35`, `:49`) also route through
`escapeHtml`, closing the "no match ⇒ raw passthrough" hole that this idiom usually leaves open. Content is
element-content, never attribute, so omitting `"`/`'` from `escapeHtml` (`:73`) is correct rather than an
oversight. **Falsifier:** feed a section title containing `<img src=x onerror=alert(1)>` through
`highlightFuzzy` with a matching query and search the output for an unescaped `<`. There is none.

**S-2 · `usePaperSearch.ts:39-41` — the cursor can never dangle.**
`watch(results, () => { selectedIndex.value = 0 })` resets on every result-set identity change, so
`results.value[selectedIndex.value]` is total. Narrowing 30 → 1 with the cursor at 29 would otherwise paint a
phantom selection and hand `undefined` to `selectResult`; the guard at `:79` is then belt-and-braces rather than
the only defence. **Falsifier:** drive `selectedIndex` to 29, then narrow to 1 result, and assert `Enter`
navigates to result 0 rather than throwing.

**S-3 · `PaperSearchDropdown.vue:19-28` + `PaperSearchModal.vue:27-37` — a correctly partitioned watcher.**
The pre-split monolith had **one** watcher branching on `isExpanded` (`git show ffba307^:…/PaperSearch.vue`).
The split turned that branch into **two mutually exclusive guards** (`if (props.search.isExpanded.value) return`
/ `if (!props.search.isExpanded.value) return`) — exactly one container scrolls, no double-scroll race, and each
lives with the DOM it owns. `block: "nearest"` avoids the re-centring jolt that `"center"` would cause on every
arrow press. This is the one place the `ffba307` split **improved** the design.

**S-4 · `PaperSearch.vue:296-302` — the flexbox min-content trap, defused.**
`.search-modal-results { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain }`. `min-height: 0`
alongside `flex: 1` in a `flex-direction: column` panel is the single most-omitted declaration in scrollable
modal bodies — without it the pane grows past `max-height: 70vh` instead of scrolling. It is present, and
`overscroll-behavior: contain` appears on **both** scroll containers (`:111` and `:300`), preventing scroll
chaining to the article behind. Whoever wrote this knew the failure modes.

**S-5 · `PaperSearch.vue:260-262` — a correctly *shaped* elevation pair.**
`0 8px 40px rgba(0,0,0,.14)` (broad ambient) + `0 2px 8px rgba(0,0,0,.06)` (tight contact) is the two-layer
physical model, with the right ratio between spread and alpha. The *shape* is right even though the *colour
space* is wrong (D-17) — worth preserving through the repair rather than replacing wholesale: swap `rgba(0,0,0,…)`
for `color-mix(in srgb, var(--foreground) …%, transparent)` per `PaperSidebar.vue:166` and keep the geometry.

**S-6 · `PaperSearch.vue:224` and `:363` — motion changes carry their provenance.**
`/* A.W3.d — bezier→--ease-out-expo. */` and `/* A.W3.d — bezier→canonical tokens. */` name the wave that made
the edit, in the stylesheet, at the site. Most of this tree does not do this, and it is the reason D-22 (the
half-migration) is *provable* rather than merely suspected. Self-documenting to the point of self-indictment.

---

## §10 · Reconciliation with the hitherto corpus

**Folded, agreed, cited:**

- `lane-frontend.md:154,159-163` — the roster (397 + 69 + 70 + 124 + 108 + 74 + 4). **Confirmed exactly.**
- `lane-frontend.md:288-290` — all three children import `Button` from `@mkbabb/glass-ui/button` and nothing
  else from glass-ui. **Confirmed;** this is the root of D-23/D-25 and the reason the §5 break surface barely
  touches this family.
- `lane-frontend.md:438` / `CENSUS-2026-08-03.md:99` — 🟡 CANDIDATE SHADOW vs producer `./search`, 832 LOC.
  **Agreed and reinforced** (§4): the shadowed surface is additionally *non-functional* at both breakpoints.
- `CENSUS-2026-08-03.md:336` and intake rows **R3-11** / **X-6** (`lane-fourier-r3-r6.md:41,85,157,175`) —
  exactly two `<Teleport>` in the tree, one of them `PaperSearchModal.vue:41`. **Confirmed at that exact line.**
  This audit adds the design consequence the registry rows do not carry: **that Teleport is the mechanism by
  which D-1 escalates into D-2**, because a Teleport root is never a scope-id-bearing subTree element. The
  `INSTANCE-STATE-REGISTRY` join defect carried to F.W4 (R3-11) and this defect share a subject; F.W4 should
  read them together.
- `lane-frontend.md §5` break table + `CENSUS-2026-08-03.md:437-441` — the uplift break surface
  (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1,
  `ToastVariant`, lucide ×35, pencil-boil). **Mapped row-by-row in §4:** this family is hit by **exactly one**
  row — the lucide rename, 3 files / 8 symbols.
- `lane-frontend.md §9 carry 1` + `CENSUS-2026-08-03.md:442-445` — the tri-package deadlock. **Accepted as
  binding sequencing** for any F.W1 repair here.

**Extended (census-silent, filled here):**

- `lane-frontend.md §8`'s `prefers-reduced-motion` table enumerates 8 CSS `reduce` blocks and 2 ungated rAF
  clocks. **PaperSearch.vue is a ninth CSS motion site with six unguarded transitions and no guard** (D-21).
  The grep-based sweep could not see it because the rules are dead (D-1).
- `lane-frontend.md §8`'s style-surface summary treats `style.css` (143 lines) as the only non-scoped cascade
  entry and scoped SFC blocks as functioning. **This audit contradicts that assumption for this file:**
  `PaperSearch.vue`'s scoped block is 356 lines of which 330 never match. Any census metric that counted scoped
  CSS as *effective* styling over-counts by 330 lines here. Worth a targeted re-sweep: **every SFC in the tree
  whose `<style scoped>` names classes that appear only in child components.**

**Contradicted:** nothing in the corpus is contradicted on fact. `lane-frontend.md:154`'s one-line
characterisation — *"Search host — SHADOW candidate"* — is accurate but understates: it is a search host whose
**modal and dropdown do not render as designed**, which materially changes the keep-vs-adopt calculus at
`lane-frontend.md:438`.

---

## §11 · Ledger

| # | Sev | Title | Provenance | Register |
|---|---|---|---|---|
| D-1 | **BLOCKER** | 330/356 style lines dead (scope-kill) | `PaperSearch.vue:41` vs `:22-39`; children `:35`/`:35,65`/`:41` | LIVE |
| D-2 | **BLOCKER** | Modal renders unstyled at end of `<body>` | `:239-264` dead; `Modal.vue:41-48` | LIVE |
| D-3 | **BLOCKER** | Dropdown unpositioned; reflows host | `:103-116,215-221` dead; `Dropdown.vue:36-40` | LIVE |
| D-4 | MAJOR | Rows render as glass pills, not list rows | `:118-135` dead vs `button-BNDWhAZb.js`, `surfaces.css:119-146` | LIVE |
| D-5 | MAJOR | Labels cannot truncate → overflow | `:174-183` dead; `surfaces.css:158`; `helpers:26` | LIVE |
| D-6 | MAJOR | Mobile dismiss backdrop inert | `:192-196` dead; `Dropdown.vue:65-69` | LIVE |
| D-7 | MAJOR | Sidebar has no outside-dismiss by design | `Dropdown.vue:66`; `usePaperSearch.ts:48-53` | LIVE |
| D-8 | MAJOR | `mark` falls back to UA yellow | `:185-190` dead; `Dropdown.vue:58` | LIVE |
| D-9 | MAJOR | No combobox/listbox semantics | `Input.vue:37-46`; `Dropdown.vue:36-60` | LIVE |
| D-10 | MAJOR | Modal is not a dialog (no role/trap/restore) | `Modal.vue:41-48,59` | LIVE |
| D-11 | MAJOR | No `aria-live` result announcement | all four files | LIVE |
| D-12 | MAJOR | Inline dropdown has no empty state | `Dropdown.vue:37` vs `Modal.vue:104-106` | LIVE |
| D-13 | MINOR | No loading state; 120 ms stale results | `usePaperSearch.ts:26-37` | LIVE |
| D-14 | MAJOR | 8 contrast failures from `color-mix(…, transparent)` | `:62-67,80-82,84-95,137-148,168-172,292-294,321-326,336-342` | LATENT |
| D-15 | MAJOR | Hardcoded badge hues; 3 of 4 theme-cells fail AA | `:158-166` | LATENT |
| D-16 | MAJOR | `outline:none` + 1.71:1 focus delta (SC 2.4.11) | `:73` + `:58-60` | LATENT |
| D-17 | MAJOR | Literal black shadows; no elevation in dark | `:114,260-262` vs `PaperSidebar.vue:166` | LATENT |
| D-18 | MINOR | Type-colour collapses in light, inverts by theme | `:150-156`; `helpers:8-22` | LATENT |
| D-19 | MINOR | Three type systems, no scale; 9.6 px badge | `:75,64,139,170,310,314,354,177,212,287,318,326,337` | LATENT |
| D-20 | MINOR | Off-grid spacing (5 off-scale values) | `:50,54,88,116,123,143,270,302,306,311,330,332,350` | LATENT |
| D-21 | MINOR | 6 transitions, 0 reduced-motion guards | `:224-236,358-396` | LATENT |
| D-22 | MINOR | Motion vocabulary half-migrated (9 raw durations) | `:55,94,129,229,360,366,367,371,376` vs `:224,363` | LATENT |
| D-23 | MINOR | Hand-rolled button skin over glass Button | `:84-100,118-135` vs `surfaces.css:119-146` | LATENT |
| D-24 | MINOR | `h-3 w-3` loses to `:not([class*=size-])` | `Input.vue:55,56,66`; `Modal.vue:68,77` | LIVE |
| D-25 | MINOR | Two surface languages in one component | `Dropdown.vue:39` vs `:247-264` | LATENT |
| D-26 | MINOR | Focus ring forced to pill radius | `base.css:174-178` vs `:93,128,257` | LIVE |
| D-27 | MINOR | Prose: `...` not `…`; duplicated string; thin empty copy; register drift; hint asymmetry | `Input.vue:41`; `Modal.vue:56,105,110-118` | LIVE |
| D-28 | INFO | Dead API: unused `emit`×2, `defineExpose`, `props` | `Dropdown.vue:12-14,30`; `Modal.vue:12-14`; `:8` | LIVE |
| D-29 | MINOR | `can-expand` mixes debounced/undebounced state | `:28` | LIVE |
| D-30 | INFO | Icon buttons named by `title` only | `Input.vue:53,64`; `Modal.vue:66,75` | LIVE |
| D-31 | MINOR | Modal scale asserted twice, not derived | `:304-319` vs `:137-183` | LATENT |
| D-32 | MINOR | Mixed `vh`/`dvw` in the modal box | `:246,253,254` | LATENT |

**Totals — 32 defects · 3 BLOCKER · 12 MAJOR · 15 MINOR · 2 INFO · 6 superlatives.**

### Direction for F.W1 (design-axis, non-binding)

1. The repair is **not** `:deep()`. Move each block to the SFC that owns its markup — `Input`, `Dropdown`,
   `Modal` — where `scoped` becomes true again. The 26 surviving lines stay in the host.
2. **Repair D-16 and D-8 in the same change.** Reviving `:73` (`outline: none`) and `:185-190` without fixing
   them trades a compliant UA focus ring for a 1.71 : 1 border, and re-themes a highlight that is currently
   merely ugly into one that is merely wrong. A naïve revival is a net accessibility regression.
3. Reconsider revival at all, per `lane-frontend.md:438`: producer `./search` ships `SearchBar.vue` +
   `searchVariants.ts` **at the current pin**, and 7.0.0 adds `useFuzzySearch` under an explicit no-re-fork
   instruction. 832 LOC of locally-carried, non-rendering shadow is a poor thing to spend the repair budget on.
   The 3 lucide symbols are the only uplift cost either way.
