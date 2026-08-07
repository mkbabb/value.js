claude-opus-5[1m] (served model id)

# CHALLENGE · `PaperSidebar.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSidebar.vue` (283 lines)
**Axis** spacing/proportion (Aristotelian) · glass-ui conformance UNDER THE OLD PIN · typography · motion incl. PRM · a11y · prose · state coverage
**Mode** static + source-derived. Read-only. No browser tooling, no dev server, no install. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and L-18 runs both ways (§5 superlatives, §6 the checks that cleared).

**Substrate pins (measured, not quoted).**

| thing | value | probe |
|---|---|---|
| fourier `web/package.json` glass pin | `@mkbabb/glass-ui: ^4.0.0` | `web/package.json:14` |
| installed glass-ui | **4.0.0** | `node -e` over `node_modules/@mkbabb/glass-ui/package.json` |
| producer glass-ui | **7.0.0** | `/Users/mkbabb/Programming/glass-ui/package.json` |
| root font-size at the sidebar's breakpoint | `1rem` = 16px (`≥768px` arm) | `web/src/style.css:41-49` |
| sidebar visibility | `≥1024px` only | `PaperSidebar.vue:135, 138-149` |
| built CSS artifact on disk | `web/dist/assets/*.css`, 2026-06-12, **glass-3.1.0-era** (no `--control-h-md` anywhere) | `ls -la web/dist/assets`; `grep -c -- --control-h-md` → 0 |

**Read whole (read-only):** the subject; `components/ui/tooltip/Tooltip.vue` (38); `components/paper/PaperSearch.vue` (397, surveyed); `components/paper/search/usePaperSearch.ts` (108); `lib/paperContent.ts` (7); `components/paper/PaperView.vue` (685, the sole consumer); `components/paper/useScrollNavigation.ts` (246); `components/paper/MobileFloatingToc.vue` (397, the sibling); `web/src/style.css`; `web/vite.config.ts`; `e2e/paper-performance.spec.ts`; and, in `node_modules` (evidence, not product): glass-ui 4.0.0's `button-BNDWhAZb.js`, `CollapsibleContent-C_s6fG7r.js`, `dist/composables/sidebar/useSidebarState.d.ts`, `dist/styles/**` (tokens, glass/surfaces.css, utilities/base.css, utilities/a11y-overrides.css, animations.css, components.css); `@mkbabb/latex-paper` `flattenPaperSections-*.d.ts`; `tw-animate-css/dist/tw-animate.css`; plus glass-ui **7.0.0** source for the forward flags.

---

## §0 · VERDICT + TALLY

**Verdict — DEFECTIVE, and defective in a specific and instructive way.** The authored CSS in this file is careful, commented, and internally coherent; the *rendered* component is not, because almost every load-bearing declaration is in a silent argument with the glass-ui `Button` it is painted onto. The component's own scoped rules (unlayered, Vue-scoped, specificity `(0,2,0)`) win every property they *declare* and lose every property they *forget* — and what they forget is `height`, `white-space`, and the transition's `scale` leg. The result is a table of contents authored at ~24px row rhythm that renders at 40px, authored to wrap that cannot wrap, and authored with a press-squish that snaps.

Layered on top of that are four hard blockers: a disclosure animation that does not exist (while a code comment asserts it does), a section heading below half the required contrast, a 20 × 20 px scroll-to-top control that fails three separate success criteria at once, and a disclosure widget with no ARIA whatsoever.

**Tally.** BLOCKER **4** · MAJOR **11** · MINOR **13** · INFO **5** ⇒ **33 defects**. Superlatives **8**. Hypotheses raised and falsified against the tree **5** (§6).

**The one-line summary for the wave board.** `PaperSidebar` is *cheap* to uplift (§4 D-I2: all four glass subpaths survive at 7.0.0 — it is off the census break surface entirely) and *expensive* to leave alone (four AA/AAA-graded a11y blockers on the primary navigation of the flagship document route, none of which any gate in the repo can see).

---

## §1 · BLOCKERS

### D-B1 — The subsection disclosure has **no animation at all**, and the code comment asserts that it does
**Severity BLOCKER** · `PaperSidebar.vue:83-85, 255-260`

The template comment at `:83-84` reads *"Subsections — glass-ui Collapsible drives the expand/collapse animation via `data-state`"*, and the style comment at `:255-257` records *"W3.5.c — Collapsible animation driven by glass-ui `CollapsibleContent` (reka-ui's `--reka-collapsible-content-height` CSS var). The previous hand-rolled `grid-template-rows: 0fr → 1fr` shim is retired."* The scoped rule left behind is the whole of the local contribution:

```
.sidebar-sublist-wrapper { overflow: hidden; }      /* :258-260 */
```

The claim is false under the installed pin. The chain, each link measured:

1. glass-ui 4.0.0's `CollapsibleContent` hard-codes its class list — it is not consumer-overridable:
   `node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js` → `class: "overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"`.
2. glass-ui's own shipped utility sheet does **not** define them. `dist/styles/components.css` → `animate-collapsible-down` **ABSENT**, `animate-collapsible-up` **ABSENT**, `transition-collapse` **ABSENT** (`rounded-control` from the sibling `CollapsibleTrigger` string *is* present, so the sheet is otherwise complete — this is a targeted gap, not a missing file).
3. glass-ui 4.0.0 *does* ship `@keyframes collapsible-open` and `@keyframes collapsible-close` (`dist/styles/animations.css:18, 29`) — **differently named**, and grep across the whole of `dist/styles/` finds **zero** `animation:` declarations binding either. They are orphan keyframes.
4. The only other definition site is `tw-animate-css`, which fourier does import (`src/style.css:2`) and which *does* declare `--animate-collapsible-down` / `--animate-collapsible-up` + matching `@keyframes` (`node_modules/tw-animate-css/dist/tw-animate.css:1`). But a Tailwind v4 theme key only becomes a rule when the **class string is scanned**, and `grep -rn "animate-collapsible\|collapsible-down\|transition-collapse" web/src/` → **0 hits**. The string exists only inside `node_modules`.
5. Nothing widens the scan. `web/src/style.css` contains **no `@source` directive** (grep → empty); there is **no `tailwind.config.*`** (`ls tailwind.config*` → no matches); `vite.config.ts:31-35` wires `@tailwindcss/postcss` with **no options object at all**. Tailwind v4's automatic source detection excludes `node_modules` by default.

⇒ `data-state` flips a class that resolves to no rule. reka unmounts/mounts the region; the `--reka-collapsible-content-height` custom property is published and read by nobody. **The chapter subtree pops in and out instantly.** The retired `grid-template-rows: 0fr → 1fr` shim was, on this evidence, the only thing that ever animated it — W3.5.c is a silent motion regression that also left a false statement in the tree.

Two aggravating factors. First, the false comment is *load-bearing for the next wave*: F.W1 will read "glass-ui drives the animation" and not budget for it. Second, `overflow: hidden` at `:258-260` is now a rule whose only stated purpose ("needed for the collapsible animation") no longer obtains — it survives as cargo.

**Falsifier.** Run `npm run build` on the working tree and grep the emitted CSS for `.animate-collapsible-down` or `@keyframes collapsible-down`. If either is present, this finding dies. (Equivalently: adding `@source "../node_modules/@mkbabb/glass-ui/dist";` to `src/style.css` would resurrect it, which is itself the cheapest cure.) The stale on-disk `web/dist` (glass-3.1.0-era) is *corroborative only* and is not offered as proof of the current pin: it contains `.sidebar-sublist-wrapper[data-v-08f0e133]{overflow:hidden}` (post-W3.5.c source) and `@keyframes collapsible-open` (glass's orphan) while `collapsible-down` is absent from all eight sheets — i.e. the same gap already shipped once.

**Relay.** Item (2) is an upstream glass-ui packaging defect, not a fourier one: a library component emitting utility classes its own published stylesheet does not define. Per the standing BH/BI relay law this belongs in the glass-ui inbox regardless of what fourier does. It is *cured* at 7.0.0 by a different route (§4 D-I1).

---

### D-B2 — The "Contents" heading fails WCAG 1.4.3 AA in both colour arms (2.39:1 light / 3.00:1 dark)
**Severity BLOCKER** · `PaperSidebar.vue:53, 176-183`

```
.sidebar-label {
    @apply text-sm;                                               /* 0.875rem = 14px */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: color-mix(in srgb, var(--muted-foreground) 60%, transparent);   /* :181 */
}
```

The label paints on `.sidebar-nav`'s `background: var(--card)` (`:164`). Token values resolved from the installed producer (fourier overrides none of them — `grep -- "--muted:\|--card:\|--border:\|--muted-foreground:" web/src/style.css` → empty):

- light: `--card: hsl(36 48% 97%)` (`tokens/color-radius.css:72`); `--muted-foreground: var(--neutral-5) = hsl(30 22% 40%)` (`:85`, `:45`)
- dark: `--card: hsl(24 8% 16%)` (`tokens/dark-arm.css:64`); `--neutral-5: hsl(34 14% 62%)` (`:47`)

`color-mix(in srgb, X 60%, transparent)` yields X at α 0.6; composited over the card that is `0.6·X + 0.4·card`. Computed (method + script in §7):

| arm | composited label | vs `--card` | AA floor (14px/700 is **not** large text) | verdict |
|---|---|---|---|---|
| light | — | **2.39:1** | 4.5:1 | **FAIL by 47%** |
| dark | — | **3.00:1** | 4.5:1 | **FAIL by 33%** |

14px bold clears the "large text" bar only at ≥18.66px, so the 3:1 concession does not apply. This is the *only* heading of the navigation landmark and the only piece of chrome that names the region visually.

The aggravation is provenance: `src/style.css:117-127` records **D.W4.d**, an axe-driven contrast remediation that darkened `--viz-amber` from `hsl(35 70% 42%)` (≈3.54:1) to `hsl(35 76% 35%)` (≈4.6:1) because it "fails WCAG AA for normal text". The same wave then added `:focus-visible` rings to `.sidebar-link` (`style.css:135-146`) — i.e. it was *inside this file's surface* — and did not measure the label sitting 12 lines above the class it was fixing. The reason is visible in §4 D-I5: axe runs in `visualization-crud.spec.ts` and `visualization-ux.spec.ts` only. **No axe pass has ever visited `/paper`.**

**Falsifier.** Compute the composite with a different blend interpretation (e.g. treating `color-mix(… , transparent)` as a straight colour interpolation toward black/white rather than an alpha) — under any interpretation that raises the ratio above 4.5:1, this dies. It does not: `in srgb … transparent` is defined premultiplied, alpha 0.6, and the backdrop is fixed and opaque. Second falsifier: if a `.dark`/`:root` override in an unread stylesheet raises `--muted-foreground`. Grep says none exists in `web/src`.

---

### D-B3 — The scroll-to-top control fails three success criteria simultaneously
**Severity BLOCKER** · `PaperSidebar.vue:54-62, 185-205`

```html
<Button variant="ghost" size="icon" class="sidebar-top-btn"
        @click="scrollToTop" title="Scroll to top">
    <ChevronUp class="h-3 w-3" />
</Button>
```
```
.sidebar-top-btn { width: 1.25rem; height: 1.25rem;                       /* :190-191 */
    border: 1px solid color-mix(in srgb, var(--border) 40%, transparent);  /* :193 */
    color: color-mix(in srgb, var(--muted-foreground) 45%, transparent); } /* :195 */
```

**(a) Target size — WCAG 2.5.8 (AA, WCAG 2.2).** `1.25rem` at the 16px desktop root = **20 × 20 px**. The minimum is 24 × 24 px, and the exceptions do not apply: it is not inline in a sentence, not user-agent-controlled, not essential, and there is no ≥24px-spaced equivalent (the only other route to the top is scrolling). Note the scoped width/height `(0,2,0)` overrides the Button's own `size="icon"` → `h-(--control-h-md) w-(--control-h-md)` — which would have been **40 px** and compliant. The local rule shrinks a conformant control below the floor.

**(b) Non-text contrast — WCAG 1.4.11 (AA).** The glyph is the control's only content and its border is the control's only boundary. Over `--card`:

| element | light | dark | floor | verdict |
|---|---|---|---|---|
| glyph `muted-foreground @45%` | **1.87:1** | **2.29:1** | 3:1 | FAIL |
| border `--border @40%` (rest) | **1.27:1** | **1.32:1** | 3:1 | FAIL |
| border `--border` (hover, `:203`) | **1.90:1** | — | 3:1 | FAIL |

There is no state in which this control's silhouette or its icon reaches 3:1. It is, at rest, a barely-there smudge.

**(c) Accessible name.** The button's sole child is a `lucide` `<svg>`; the only naming source is the native `title` attribute (`:59`). `title` is the *last* fallback in accname computation, is not announced by all AT/verbosity combinations, and is unavailable to touch and keyboard users as a visible affordance. Every other interactive element in this file gets a proper glass `Tooltip` (`:70`, `:88`) — this one, uniquely, does not (see D-N4).

**(d) Bonus — the sizing intent is silently defeated.** `<ChevronUp class="h-3 w-3" />` asks for 12px. The Button base carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`button-BNDWhAZb.js`, cva base string); `h-3 w-3` does not contain the substring `size-`, so the variant matches, and its generated selector `.…\:size-\(--ui-glyph\) svg:not([class*=size-])` is `(0,2,0)` against `.h-3`'s `(0,1,0)`. The glyph therefore renders at `--ui-glyph = calc(1rem * var(--ui-scale))` = **16px inside a 20px box** — 2px of breathing room per side, not the 4px the author specified.

**Falsifier.** (a) dies if `--ui-scale` is ≠1 at this breakpoint — it is not (`tokens/offsets-sizing.css:136` `--ui-scale: 1`; the `1.5` arm at `tokens/light-dark.css:19` is gated on `(pointer: coarse)`, and the sidebar is `min-width:1024px` desktop chrome). (b) dies if the composite math is wrong — see §7. (c) dies if `lucide-vue-next@1` injects an `aria-label`/`<title>` into its SVGs; it does not (it forwards attrs only). (d) dies if Tailwind emits the arbitrary-variant selector at lower specificity than a plain utility; it does not.

---

### D-B4 — The disclosure widget exposes **no** ARIA: no `aria-expanded`, no `aria-controls`, no `aria-current`
**Severity BLOCKER** · `PaperSidebar.vue:66-82, 94, 111`

The section row is a bare glass `Button` (`:71-81`) placed as a *sibling* of `CollapsibleContent` inside `Collapsible`, with the open state driven externally:

```html
<Collapsible :open="sidebarState.isExpanded(section.id)"
             @update:open="sidebarState.toggleSection(section.id)">      <!-- :66-69 -->
    <Tooltip …><Button … @click="scrollTo(section.id); sidebarState.toggleSection(section.id)" …>
```

`CollapsibleTrigger` is **never rendered** (`grep -c CollapsibleTrigger PaperSidebar.vue` → 0; the import at `:6` pulls only `Collapsible, CollapsibleContent`). reka-ui attaches `aria-expanded` + `aria-controls` on the *trigger*; with no trigger, neither attribute exists anywhere in the subtree. The state does reach the DOM — but only as `data-state`, a styling/testing hook, which the e2e helper duly uses (`e2e/paper-performance.spec.ts:125-129`, `closest("[data-state]")`). Assistive technology cannot read `data-state`.

Consequences, concretely: a screen-reader user tabbing the TOC hears eleven buttons named after chapters, with no indication that any of them (i) is expandable, (ii) is currently expanded, or (iii) governs the list of buttons that just appeared below it. Pressing one both navigates *and* silently mutates the list length beneath the cursor (D-M5) with no announcement.

Second half: **the current location is never exposed.** `activeRootId === section.id` drives a colour and a weight (`:76-77`) and `isActive(sub.id, activeId)` drives an inline style (`:95-97`, `:111-113`). No `aria-current="location"` (or `"true"`) is emitted anywhere in the file. So the active entry is conveyed by **colour and weight only** — which is also a WCAG 1.4.1 (Use of Colour) problem for sighted low-vision users, since the paired background signal is invisible (D-M3) and the weight delta 500→600 is sub-perceptual at 16px in a serif face.

The sibling component does it no better but at least does it in CSS: `MobileFloatingToc.vue:370-378` binds `.is-active` to real rules rather than inline styles.

**Falsifier.** Render the component and inspect a section button for `aria-expanded`. If reka's `CollapsibleRoot` forwards ARIA onto its first interactive descendant, this dies — it does not (`CollapsibleContent-C_s6fG7r.js`: `Collapsible` renders `CollapsibleRoot` with `data-slot` only; all ARIA lives on `CollapsibleTrigger`'s `d` binding). Marked source-derived, not UNPROVEN-NEEDS-LIVE, because the attribute's *origin* is readable in the dist.

---

## §2 · MAJOR

### D-M1 — Every row is locked to **40 px** while the CSS is authored for ~24 px, and `display:block` defeats the vertical centring
**Severity MAJOR** · `PaperSidebar.vue:216-233, 268-271, 279-282`

The glass `Button`'s cva default is `size: "default"` → `"h-(--control-h-md) px-4 py-2 has-[>svg]:px-3"` (`button-BNDWhAZb.js`, `defaultVariants`). `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` = **2.5rem = 40px** at the desktop identity (`tokens/offsets-sizing.css:151, 136, 148`).

`.sidebar-link` (`:216-233`) overrides `padding`, `border-radius`, `color`, `font-size`, `font-weight`, `line-height`, `background`, `border`, `display`, `width`, `text-align`, `cursor` and `transition`. It does **not** declare `height`. Vue-scoped CSS is unlayered; Tailwind utilities live in `@layer utilities`; unlayered beats layered unconditionally. So every local override lands — and `height: var(--control-h-md)` survives untouched, because nothing contests it. The built artifact confirms the shape of the rule verbatim:

```
.sidebar-link[data-v-08f0e133]{text-align:left;cursor:pointer;width:100%;font-size:var(--text-base,1rem);…;padding:.28rem .625rem;font-weight:500;line-height:1.35;display:block}
```
(`web/dist/assets/PaperView-FJog9X2r.css` — no `height`.)

The authored intent is unambiguous: `padding: 0.28rem 0.625rem` (`:226`) + `line-height: 1.35` on 16px text = **4.5 + 21.6 + 4.5 ≈ 30.6 px**, and the list `gap: 0.0625rem` (`:213`, 1px) says "dense". The sub-levels go further — `.sidebar-sublink` `padding: 0.2rem 0.45rem` on 12.5px text ≈ 22px; `.sidebar-subsublink` `padding: 0.15rem 0.32rem` on 11.5px ≈ 17px. **All three render at 40 px.** The entire three-level density gradient — the file's principal design gesture — is inert.

Worse: `.btn-pill` (composed into the Button base, `glass/surfaces.css:119-121`) supplies `inline-flex; align-items: center; justify-content: center`. `.sidebar-link { display: block }` (`:217`) replaces the flex formatting context, so `align-items:center` no longer applies. With `padding-top: 0.28rem` and a 40px box, the text baseline sits high and roughly **10 px of dead space hangs beneath every label** — the rows are neither the compact rhythm authored nor a balanced 40px control. Aristotelian proportion fails at the level of the single unit before the composition is even considered.

Arithmetic on the whole: 11 chapters × 40px + gaps ≈ 452px for level 1 alone, inside a column whose `max-height` is the scroller's client height minus 2.5rem (`:145-154`). Expanding one chapter of 8 subsections adds another 320px. The compact authored rhythm would have fit roughly a third more of the tree in the same sticky viewport.

**Falsifier.** If `.sidebar-link` declared `height: auto` or `min-height`, or if Vue scoped styles were emitted inside `@layer utilities` (they are not — SFC `<style scoped>` output is unlayered), this dies. Verify live by reading the computed `height` of `.sidebar-link` — **UNPROVEN-NEEDS-LIVE only for the 10px figure**; the 40px lock and the lost centring are source-determined.

---

### D-M2 — `white-space: nowrap` is inherited from the Button base: TOC titles cannot wrap, and the nav gains a horizontal scroll axis
**Severity MAJOR** · `PaperSidebar.vue:151-166, 216-233`

The cva base string begins `"btn-pill tap-squish focus-ring whitespace-nowrap …"` (`button-BNDWhAZb.js`). `.sidebar-link` never resets it. The paper's chapter titles are long — `\chapter{Eigentheory Applied: SVD, PCA, and Compression}`, `\chapter{The Web Companion: Computational Pipeline}` (`paper/fourier_paper.tex:2803, 3239`) — and the subsection titles longer still.

`.sidebar-nav` sets `overflow-y: auto` (`:155`) and declares nothing for `overflow-x`. Per CSS Overflow §3, when one axis is not `visible` the computed value of the other becomes `auto`. So the sidebar acquires a horizontal scrollbar and its content is clipped at the card edge. The author appears to have half-anticipated this — `overscroll-behavior-x: contain` is present at `:157` — but containment of *chaining* is not prevention of *overflow*.

`line-height: 1.35` (`:225`) is the tell: a line-height is only meaningful for multi-line text. The rule is written for a wrapping label that cannot wrap.

**Falsifier.** Measure `scrollWidth > clientWidth` on `.sidebar-nav` at a 1024–1280px viewport — **UNPROVEN-NEEDS-LIVE for the exact overflow amount**, but the cascade (base utility, unopposed) and the overflow computation are both source-determined. Dies if some ancestor sets `white-space: normal` at higher specificity than a `(0,1,0)` utility on the element itself — nothing in `PaperView.vue` or `style.css` does.

---

### D-M3 — The hover surface is **invisible** (1.02:1), and the active row has no hover feedback at all
**Severity MAJOR** · `PaperSidebar.vue:235-243, 95-97, 111-113`

```
.sidebar-link:hover      { color: var(--foreground);
                           background: color-mix(in srgb, var(--muted) 50%, transparent); }  /* :235-238 */
.sidebar-link.is-active  { background: none; font-weight: 600; }                             /* :240-243 */
```

`--muted = var(--neutral-1)`: light `hsl(38 26% 95%)`, dark `hsl(28 12% 11%)` (`tokens/color-radius.css:84, 41`; `dark-arm.css:43`). At 50% over `--card`:

| arm | hover surface vs resting card | perceptible? |
|---|---|---|
| light | **1.02:1** | no — `hsl(38 26% 95%)` blended halfway into `hsl(36 48% 97%)` is a ~1% luminance move |
| dark | **1.08:1** | barely |

So the *background* half of the hover affordance does nothing. The colour half (`--muted-foreground` → `--foreground`) carries it for inactive rows. But for **active** rows:

- root active: the inline `:style` at `:77` pins `color` to `var(--section-color-N)`. Inline styles beat any selector without `!important`, so the hover colour change never applies; and `.is-active { background: none }` (`:241`) is declared *after* `.sidebar-link:hover` at equal `(0,2,0)` specificity, so it wins the background too. **The currently-active chapter has zero hover response.**
- active sub / sub-sub: the inline `:style` at `:96` and `:112` pins *both* `color` and `background` (`color-mix(in srgb, var(--muted) 40%, transparent)` — weaker still, ≈1.01:1). Same outcome.

The row a reader is most likely to point at — the one they are currently reading — is the one that gives no feedback. And the "highlight" that marks it is a 1% luminance tint: the active-state background is, for practical purposes, not drawn.

There is also an unnecessary token inconsistency: the hover surface is `--muted @50%` while the active surface is `--muted @40%` — two magnitudes for one conceptual "raised row", neither tokenized, one inline.

**Falsifier.** Any fourier-side override of `--muted` or `--card` kills the numbers. `grep -- "--muted:\|--card:" web/src/style.css` → empty; the only `:root` overrides in the app are `--viz-amber` and `--section-color-5` (`style.css:119-127`). Perceptibility of 1.02:1 is not a judgement call — it is below every published JND threshold for large-area luminance discrimination.

---

### D-M4 — Three of the eleven live section colours fail AA on `--card`; D.W4.d fixed exactly one stop, and measured it against the wrong surface
**Severity MAJOR** · `PaperSidebar.vue:77, 96, 112` · `web/src/style.css:112-127`

The active entry paints `color: var(--section-color-<si>)` where `si` is the root index. glass-ui ships a 13-stop ramp (`tokens/color-radius.css:241-253` light, `dark-arm.css:95-107` dark); the paper has **11** `\chapter`s (`grep -c "^\\chapter" paper/fourier_paper.tex` → 11), so the live set is stops 0–10 (see §6 F-2: the overflow hypothesis is falsified). Text renders at 16px / weight 600 — **not** large text; AA floor 4.5:1. Over `--card`:

| stop | hue | vs `--card` (light) | vs active-sub bg | verdict |
|---|---|---|---|---|
| 0 | rose | 5.06 | 4.97 | pass |
| 1 | purple | 6.10 | 5.99 | pass |
| 2 | indigo | 6.28 | 6.17 | pass |
| 3 | teal-cyan | 4.61 | 4.53 | pass (thin) |
| **4** | **forest** | **4.36** | **4.28** | **FAIL** |
| 5 | amber → fourier override | 4.62 | — | pass (see below) |
| **6** | **tomato-red** | **4.48** | **4.40** | **FAIL** |
| 7 | violet | 5.44 | 5.35 | pass |
| 8 | ruby | 5.74 | 5.64 | pass |
| 9 | slate-blue | 5.82 | 5.72 | pass |
| **10** | **olive** | **4.33** | **4.25** | **FAIL** |

(Dark arm clears comfortably: 4.98–8.21:1 across all thirteen. This is a light-mode-only defect.)

The provenance sharpens it. `style.css:112-127` (D.W4.d) darkened `--viz-amber` **and aliased `--section-color-5` to it** because glass's light amber "≈3.54:1 against `--background` — fails WCAG AA for normal text". My computation reproduces that number as 3.49:1 vs `--card` and the repaired 4.62:1 — the remediation is real and correct. But it was measured against `--background` (`--neutral-0`, the page), while in the sidebar the same text sits on `--card`. Three further stops sit in the same 4.3–4.5 band and were never checked, because the fix was aimed at one axe finding rather than at the ramp.

Second-order: the override forks one ramp stop out of the ramp's colour model — twelve stops are `oklch(L C H)` with a disciplined lightness band; stop 5 is now `hsl(35 76% 35%)`. And it binds a *paper section identity* token to a *visualization series* token (`--viz-amber`), two unrelated semantics that will diverge the moment either is retuned.

**Falsifier.** Recompute with a different white point or a different oklch→sRGB matrix; the failing stops sit 0.02–0.17 below the 4.5 line, so a materially different transform could move stops 4 and 6 across. Stop 10 (4.33) and the active-sub-background column would still fail. Script and constants in §7 — reproducible in one command.

---

### D-M5 — Navigation and disclosure are conflated on a single control; the e2e suite is architected around the hazard
**Severity MAJOR** · `PaperSidebar.vue:74`

```html
@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"
```

One click does two unrelated things: it scrolls the article to the chapter, and it flips the chapter's subtree open/closed. Therefore **clicking the chapter you are currently reading collapses its subsections** — the navigation gesture destroys the context it just established. There is no separate affordance for either action; no chevron, no `CollapsibleTrigger`, no split hit-region.

This is not speculative. The project's own e2e helper documents it as a hazard it must engineer around (`e2e/paper-performance.spec.ts:119-121`):

> *"Only OPEN closed sections — `toggleSection` flips state, so clicking an already-open chapter would collapse it (churning the tree across the serial tests). Expand-if-closed is idempotent."*

— and the helper's whole `closest("[data-state]")` dance (`:125-129`) exists to avoid triggering it. When a test suite has to hand-roll a guard against a component's primary interaction, the interaction is the defect.

Note also that `toggleSection` fires for **every** chapter, including leaves with no `subsections` (nothing at `:74` checks). Those rows carry hidden, meaningless disclosure state.

**Falsifier.** Dies if `toggleSection` is idempotent-open rather than a flip. `useSidebarState.d.ts` declares `toggleSection(id: string): void` with no semantics; the e2e comment (written against the live behaviour) asserts flip, and the `@update:open` binding at `:68` also routes to the same flip. Both sources agree.

---

### D-M6 — The scoped `transition` shorthand clobbers `.btn-pill`/`.tap-squish` — the exact cascade bug glass-ui documents and warns against
**Severity MAJOR** · `PaperSidebar.vue:229-232`

```
transition: color 0.25s var(--ease-out-expo),
            background-color 0.25s var(--ease-out-expo),
            font-weight 0.15s var(--ease-standard);
```

glass-ui composes two classes onto every Button that each carry the **full coherent transition set**, and says so in a comment written specifically to prevent this:

> *"CRITICAL: `.tap-squish` (composed alongside on the button base, utilities.css) ALSO lists this full coherent set, so neither class's `transition` shorthand can clobber the other down to a scale-only animation — the cascade bug that left every button transitioning ONLY `scale` (the live-readback RED, RED witness 5). The doctrine: surface-props→bezier, transform→spring."*
> — `glass/surfaces.css:133-148`

`.btn-pill` (`glass/surfaces.css:119`, inside `@layer components`) and `.tap-squish` (`utilities/base.css:258`, layered) both end with `scale var(--spring-smooth-duration) var(--spring-smooth)`. `.sidebar-link`'s scoped shorthand is **unlayered** and therefore wins outright — it replaces the whole list, and it does not list `scale`.

The Button base still applies `active:scale-(--scale-press-btn)` and `.tap-squish:active { scale: var(--scale-press) }`. With the transition gone, the press-squish becomes an **instant snap to the pressed size and an instant snap back** — the harshest possible reading of a gesture glass-ui spent a wave tuning. Ten degrees off-doctrine besides: the surface legs run at `0.25s` where glass's register is `--duration-fast: 0.2s` (`tokens/scheme-motion.css:67`), and `--ease-out-expo` — a dramatic decelerating curve — is applied to a *colour cross-fade*, which the same comment explicitly rules against ("a colour cross-fade reads as a wobble on a spring… surface legs ride the bezier `--ease-standard`"). The file's own comment at `:229` reads *"A.W3.d — bezier→`--ease-out-expo`"*, i.e. the wave deliberately moved *toward* the off-doctrine curve.

Silver lining, recorded honestly: the PRM guard survives, because `.tap-squish:active { scale: 1 }` under `@media (prefers-reduced-motion: reduce)` (`utilities/base.css:273-278`) sets a *property*, not a transition. Reduced-motion users get the correct no-squish behaviour by accident.

**Falsifier.** Dies if Vue SFC scoped styles were emitted into `@layer components` or later — they are not; `<style scoped>` output is unlayered, and unlayered wins over any `@layer` regardless of specificity (CSS Cascade 5 §6.4.4). Confirmed empirically in the built sheet: `.sidebar-link[data-v-08f0e133]{…transition:color .25s var(--ease-out-expo),background-color .25s var(--ease-out-expo),font-weight .15s var(--ease-standard)…}` sits outside every `@layer` block.

---

### D-M7 — `:focus-visible` squares the row's corners and stacks a second ring on glass's own
**Severity MAJOR** · `web/src/style.css:129-146` × `PaperSidebar.vue:227`

D.W4.d added, at the global (unlayered) level:

```
.sidebar-link:focus-visible, … {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
    border-radius: inherit;          /* style.css:144 */
}
```

Two consequences.

**(a) The row changes shape on keyboard focus.** `.sidebar-link` sets `border-radius: calc(var(--radius) - 2px)` (`:227`); `--radius` resolves to `0.625rem` in the built cascade (`grep -o -- "--radius:[^;]*" web/dist/assets/index-*.css` → `.625rem`, all four occurrences), so the resting radius is **8px**. On focus, `border-radius: inherit` takes the parent's value — the parent chain is `Collapsible`'s `<div>` → `<li>` → `<ol class="sidebar-list">`, none of which declares a radius — so it computes to **0**. The button's background plate and its outline both go square the instant a keyboard user arrives, and round again when they leave. Focus should reveal a control, not restyle it.

**(b) Two rings.** The Button base composes `focus-ring`, whose rule is `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` (`utilities/base.css:174-178`). The local rule overrides `outline` and `border-radius` but says nothing about `box-shadow` — so glass's ring shadow still paints, *under* a 2px `--ring` outline offset 2px. The result is a doubled indicator whose two halves disagree about the corner radius (one pill, one square).

The comment at `style.css:135-142` explains the intent — *"Mirrors the canonical pattern at AppHeader.vue:174-177 (the only pre-W4 conformant site)"* — but the canonical pattern was authored for elements that are not glass Buttons. Composed onto one that already ships `focus-ring`, it is duplication, not conformance.

**Falsifier.** Dies if `--focus-ring-shadow` resolves to `none`, or if the two rules' equal `(0,2,0)` specificities resolve in the *other* order (scoped `.sidebar-link[data-v-…]` is also `(0,2,0)`; source order decides, and Vue injects SFC styles after the entry stylesheet in dev but ordering is bundler-dependent in prod). If the scoped rule wins, (a) reverses and the radius stays 8px — **(b) is unaffected either way**. Marked UNPROVEN-NEEDS-LIVE for the (a)/(b) split; the double-ring is source-certain.

---

### D-M8 — The sidebar hand-rolls a weaker copy of the app's own `cartoon-card` idiom (1.36:1 edge)
**Severity MAJOR** · `PaperSidebar.vue:161-165`

```
border-radius: 0.75rem;
border: 2px solid color-mix(in srgb, var(--foreground) 15%, transparent);
background: var(--card);
box-shadow: 3px 3px 0px 0px color-mix(in srgb, var(--foreground) 8%, transparent);
```

This is unmistakably the app's neo-brutalist card: 2px edge + hard offset stamp + card fill. The app already has that recipe as a first-class utility — `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }` (`style.css:107-111`), the D.W4.a resurrection shim, consumed at **25 application sites across 13 files** per lane-frontend §3/§8 and visible in the tree at `ImageUpload.vue:38`, `EquationView.vue:230,239,243,251,308`, `InfoCard.vue:18`, `FunctionInput.vue:93,175`, `HarmonicLevelGrid.vue:2`, `MorphPhaseConfig.vue:2`, `ContourPreview.vue:33`, `BasisCanvas.vue:521`, `EqCoefficientsPanel.vue:12`, `GalleryView.vue:312`, `AdminUserList.vue:308,362`, `MorphShapePreview.vue:4`.

The local copy is not merely redundant — it is **materially weaker**. `cartoon-card` uses `border-color: var(--border)` = `--neutral-4` = **1.90:1** against the page. The local `--foreground @15%` computes to **1.36:1**, and the offset stamp at `--foreground @8%` is fainter still. The single largest surface in the paper route's chrome therefore has the *least* defined edge of any card in the app, and diverges from the design language at exactly the moment it is quoting it.

Same for the radius: `0.75rem` raw, where the shim inherits glass's semantic card radius.

**Falsifier.** Dies if `cartoon-surface` (`glass-ui/dist/styles/cards.css:33`) resolves to a *weaker* edge than `--foreground @15%` — it does not; it is the 2px + offset-stamp + hover-lift recipe re-bound by the shim to `var(--border)`. Also dies if a scrolling container cannot take the shim (it can; the shim is decoration-only).

---

### D-M9 — Level 3 exists only while active, `.is-active-sub` is a dead class, and the in-chain state has no visual expression
**Severity MAJOR** · `PaperSidebar.vue:94, 104`

```html
:class="{ 'is-active-sub': isActive(sub.id, activeId) || isInActiveChain(sub.id, activeId) }"   <!-- :94 -->
…
<ol v-if="sub.subsections && isInActiveChain(sub.id, activeId)" class="sidebar-subsublist">     <!-- :104 -->
```

**(a) `.is-active-sub` is styled nowhere.** `grep -rn "is-active-sub" web/src/ web/dist/assets/*.css` → exactly **one** hit, the binding at `:94`. There is no rule in the scoped block (`:130-283`), none in `style.css`, none in the built CSS. The class is computed on every subsection on every activeId change and discarded.

**(b) The in-chain state therefore has *no* expression.** The class was evidently meant to carry it (`isActive || isInActiveChain`), but the only thing that actually paints is the inline `:style` at `:95-97`, gated on `isActive` **alone**. So a subsection whose own sub-subsection is the reading position looks identical to one twelve chapters away — the reader loses their place at exactly the depth where the tree is hardest to navigate.

**(c) Level 3 is undiscoverable.** `:104` mounts sub-subsections only when their branch is already the active chain. A reader cannot see what is *inside* a subsection until they are already inside it; there is no way to survey the tree. The e2e helper again documents the consequence (`paper-performance.spec.ts:79-82`): *"3rd-level `subsub` entries only mount when their branch is the active chain. So a nested appendix entry's `[data-toc-id]` does not exist in the DOM until its ancestor section is expanded."* And unlike level 2 — which at least has a (broken, D-B1) Collapsible around it — level 3 has no wrapper at all, so it appears and vanishes with no transition even in principle.

**Falsifier.** (a) dies on any `.is-active-sub` rule in an unread sheet — grep covers `web/src` and every built artifact. (b)/(c) die if `isInActiveChain` is folded into the inline style — it is not; read `:95` and `:111`, both `isActive(...)` only.

---

### D-M10 — Both of the sidebar's actions smooth-scroll the viewport with `prefers-reduced-motion` ungated
**Severity MAJOR** · `useScrollNavigation.ts:191, 242` (reached from `PaperSidebar.vue:58, 74, 92, 109`)

Every TOC click routes to `scrollTo` → `PaperView`'s `navigateTo` → `performScroll`, and the chevron routes to `scrollToTop`. Both end in:

```ts
s.scrollTo({ top, behavior: "smooth" });     // :191  — short-jump path
scroller.scrollTo({ top: 0, behavior: "smooth" });  // :242 — scroll-to-top
```

Neither consults `prefers-reduced-motion`. A long-form typeset paper is precisely the content where an animated multi-thousand-pixel scroll is a vestibular trigger.

The idiom is *known to this codebase and applied fifteen lines away*: `PaperView.vue:173-177` reads `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and refuses to arm the progress-bar fallback under it. The paper route thus reduces the motion of a 4px progress bar and leaves the full-viewport scroll animated. `grep -rn "prefers-reduced-motion" web/src/components/paper/` returns exactly two hits — both in `PaperView.vue`, both about the progress bar. The component's own `<style scoped>` block contains **zero** `@media (prefers-reduced-motion)` rules.

Interesting asymmetry worth recording: the far-jump path (`:194-198`, `teleportTo`) is `behavior: "instant"`, so the *longest* scrolls are already unanimated. Only short jumps animate — the wiring is one conditional away from correct.

**Falsifier.** Dies if the app sets `scroll-behavior` globally under a PRM media query (which would not help — the explicit `behavior` option in `scrollTo` overrides CSS). `grep -rn "scroll-behavior" web/src/` → no PRM-gated declaration. Dies if some ancestor patches `Element.prototype.scrollTo`; nothing does.

---

### D-M11 — No empty, loading, or error state; and `v-if="section.subsections"` is truthy for `[]`
**Severity MAJOR** · `PaperSidebar.vue:64-65, 85, 104`

The component renders `<ol class="sidebar-list">` unconditionally and iterates `sections` with no `v-else`. If `sections` is empty the reader gets a card containing a search box, the word "CONTENTS", a chevron, and nothing — no message, no skeleton, no explanation. There is no loading state and no error state anywhere in the file.

The mitigation is real and should be stated: `paperSections` is a **build-time** virtual module (`lib/paperContent.ts:7`, `export { paperSections } from "virtual:paper-content"`, compiled by `@mkbabb/latex-paper/vite` from `../paper/fourier_paper.tex` per `vite.config.ts:8-20`), so at runtime it is a constant and cannot be empty in a successful build. That downgrades the severity of the *empty* case from "will happen" to "cannot happen while the pipeline holds" — but it does not make the component's contract safe, and the prop is typed `PaperSectionData[]` with no non-empty guarantee. A future consumer (a preview route, a second paper, a storybook) gets a silently blank navigation.

The live defect in the same family: `PaperSectionData.subsections?: PaperSectionData[]` (`latex-paper/dist/flattenPaperSections-CN98CCOQ.d.ts:168`) is optional, and `v-if="section.subsections"` (`:85`) is **truthy for an empty array**. Any chapter the parser emits with `subsections: []` gets a mounted `CollapsibleContent` wrapping an empty `<ol class="sidebar-sublist">` — which still contributes `margin: 0.0625rem 0 0.125rem` (`:265`) — i.e. a toggle that "expands" to a 3px sliver of nothing. The correct guard is `section.subsections?.length`. `:104` gets this right for level 3 (`sub.subsections && isInActiveChain(…)` still has the same `[]` hole, but the chain guard usually masks it).

**Falsifier.** Dies if the latex-paper parser provably never emits `subsections: []` (I could not establish either way from the shipped bundle — the emitter is minified and the `.tex` shape does not settle it). Marked **UNPROVEN-NEEDS-LIVE** for whether the sliver is currently observable; the type-level hole and the missing states are source-certain.

---

## §3 · MINOR

- **D-N1 · Non-uniform typographic scale.** `.sidebar-link` `@apply text-base` = 1rem (`:223`) → `.sidebar-sublink` `0.78rem` (`:269`) → `.sidebar-subsublink` `0.72rem` (`:280`). The steps are **−22.0%** then **−7.7%** — no ratio, no scale, no relationship. Three levels of a hierarchy should read as a progression; these read as two levels and a rounding error. *Falsifier:* any intentional modular ratio that produces 1 / 0.78 / 0.72 — none exists (1.25 → 0.8/0.64; 1.2 → 0.833/0.694; 1.333 → 0.75/0.563).
- **D-N2 · 11.52px body text at level 3, and the number stops subordinating.** `0.72rem` = 11.52px, below the practical legibility floor for extended reading, in Computer Modern Serif (`cm-serif`, a high-contrast face whose thin strokes suffer most at small sizes). Compounding: `.sidebar-number` is *also* `0.72rem` (`:246`) — at level 1 it is 72% of the body and reads as subordinate metadata; at level 3 it is **100%** of the body and competes with the title it prefixes. *Falsifier:* if `--text-base` were larger than 1rem at this breakpoint; it is not (`style.css:41-49`, root = 1rem ≥768px).
- **D-N3 · Magic-number spacing, off every grid.** `0.28rem`, `0.22rem`, `0.2rem`, `0.45rem`, `0.15rem`, `0.32rem`, `0.0625rem`, `0.03125rem`, `0.75rem`, `1.25rem` (`:213, 226, 247, 264-265, 270, 275-276, 281, 162, 190-191`). At 16px these are 4.48 / 3.52 / 3.2 / 7.2 / 2.4 / 5.12 / 1 / 0.5 px — no 4px grid, no 8px grid, no `--spacing` multiples, no relationship to each other. Two of them are sub-pixel and will round inconsistently across DPRs. *Falsifier:* a stated house grid these satisfy; none is documented.
- **D-N4 · Native `title` on the one control that isn't given a glass Tooltip.** `:59` uses the browser tooltip while `:70` and `:88` use the project's `Tooltip` shim. Two tooltip systems, different delay (`TooltipProvider :delay-duration="400"`, `App.vue`) vs the UA's ~1s, different styling, different placement, in one 60-line template.
- **D-N5 · Tooltip absent at level 3.** `:70` and `:88` wrap their Buttons in `<Tooltip :text="getPreview(…)" side="right">`; `:106-117` does not. Sub-subsections — the entries with the least self-explanatory titles — are the only ones with no preview. Corroborates intake row **R3-7a** exactly ("PaperSidebar 2" of the 35 Tooltip callsites over 9 consumers).
- **D-N6 · `transition: font-weight`.** `:232`. Computer Modern Serif is shipped as three discrete `.woff` faces (`index.html:22-32` preloads), not a variable font, so weight cannot interpolate — the leg is inert. Where a variable face *is* substituted, it becomes worse: a 500→600 weight tween reflows the text's advance width for 150ms on every activation, i.e. a text-jitter animation on the reading-position indicator, and one that no `prefers-reduced-motion` rule guards.
- **D-N7 · `touch-action: pan-y` on desktop-only chrome.** `:160`, inside a component that is `display: none` below 1024px (`:135`). Dead declaration, and a misleading one — it implies a touch surface that the breakpoint has already excluded.
- **D-N8 · The `max-height` calc is written twice, verbatim.** `:145-147` (on `.paper-sidebar`, inside the media query) and `:152-154` (on `.sidebar-nav`). Identical three-term expression, two maintenance points, and the second is unconditional while the first is not.
- **D-N9 · `any` in the public prop surface, on a prop that is never read.** `treeIndex: Map<string, any>` (`:21`). `grep -c "treeIndex" PaperSidebar.vue` → 1 (the declaration). `PaperView.vue:341` dutifully passes it. glass-ui types it properly — `TreeIndexEntry<T>` (`useSidebarState.d.ts`) — so the `any` is a choice, not a necessity.
- **D-N10 · Three props duplicate the composable's own return.** `sidebarState` (`:38-45`) is a `GenericSidebarState<PaperSectionData>` which returns `treeIndex`, `isActive(id)`, `isInActiveChain(id)` (`useSidebarState.d.ts:28-38`) — and the component *also* takes `treeIndex`, `isActive`, `isInActiveChain` as props (`:21-23`) and uses the props. Two sources of the same truth, kept in sync by hand; the prop-passed pair take an extra `activeId` argument the composable's versions close over. The delegation is half-done.
- **D-N11 · Physical, not logical, properties.** `text-align: left` (`:219`), `padding: 0 0 0 0.625rem` (`:264`), `padding: 0 0 0 0.5rem` (`:275`), `margin-right` (`:247`), `box-shadow: 3px 3px` (`:165`). `text-align: start` / `padding-inline-start` / `margin-inline-end` are drop-in. Low urgency for an English LaTeX paper — recorded for completeness, not urgency.
- **D-N12 · The landmark's heading is a `<p>`.** `:53`, `<p class="sidebar-label">Contents</p>` — styled as a heading (uppercase, 700, tracked) but not one, so it is absent from the document outline and from every "list headings" AT command. `<h2>` would cost nothing (the `<nav>` already carries `aria-label`, so the duplication is mild and could be resolved with `aria-labelledby`).
- **D-N13 · Tooltips open over the article.** `side="right"` (`:70, :88`) on a left-hand sidebar puts every preview panel on top of the column the reader is reading, at up to 50 rows' worth of hover targets. `side="left"` would put them off-canvas; the honest answer is probably `top`/`bottom` with `collision-padding`, or previews rendered inside the card. *Falsifier:* the layout may leave enough gutter — `PaperView.vue:332-334` (`max-w-5xl` grid) suggests it does not. **UNPROVEN-NEEDS-LIVE.**

---

## §4 · INFO — the F.W1 tri-package uplift ledger for this component

### D-I1 — **NEW at 7.0.0:** eleven dangling `aria-labelledby` IDREFs, unless a `CollapsibleTrigger` is adopted
**Severity INFO (becomes MAJOR the day F.W1 lands)**

glass-ui 7.0.0 rewrites the disclosure family. `glass-ui/src/components/collapsible/Collapsible.vue:31` calls `provideDisclosureIds()`; `CollapsibleContent.vue:38-49` now renders

```html
<RekaCollapsibleContent … role="region" :id="ids.content" :aria-labelledby="ids.trigger" … class="disclosure-content">
```

and `CollapsibleTrigger.vue:36` is the sole element that renders `:id="ids.trigger"`. **PaperSidebar renders no trigger.** After the uplift, each of the eleven chapter regions will emit `role="region" aria-labelledby="glass-disclosure-trigger-…"` pointing at an element that does not exist — an `aria-valid-attr-value` / IDREF violation ×11, and a `region` landmark with no accessible name, which is *worse* for AT than today's silence.

The cure is the same cure as D-B4: make the section row a `CollapsibleTrigger as-child` (which also delivers `aria-expanded` + `aria-controls` for free and lets D-M5 be split into two affordances). That makes D-B4's fix a **prerequisite** of F.W1, not a nice-to-have.

Note also that 7.0.0 drops the phantom `animate-collapsible-*`/`transition-collapse` strings entirely in favour of a `disclosure-content` class with a co-located stylesheet (`Collapsible.vue:64`, `<style src="../_shared/disclosure/disclosure.css">`) — so D-B1 may *self-cure* at the uplift. F.W1 must verify rather than assume: if the animation returns, `overflow: hidden` at `:258-260` becomes live again and the 40px rows (D-M1) will make the height animation much larger than intended.

*Falsifier:* if 7.0.0's `Collapsible` root also renders the trigger id when no trigger mounts, or if reka drops `aria-labelledby` when the IDREF is unresolvable (it does not — it is a literal binding).

### D-I2 — **This component is OFF the census break surface.** All four glass subpaths survive 4→7
**Severity INFO (a positive finding)**

The census break surface [CENSUS §3a, FE §5] is `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` (hard typecheck break). PaperSidebar imports **none** of them. Its four subpaths — `@mkbabb/glass-ui/button` (`:5`), `/collapsible` (`:6`), `/sidebar` (`:7`), and `/tooltip` via the local shim (`ui/tooltip/Tooltip.vue:15-19`) — are **all present in 7.0.0's export map** (verified against `/Users/mkbabb/Programming/glass-ui/package.json` `exports`). And `useSidebarState`'s `getChildren` override — the whole basis of the W3.5.c delegation — **survives**: `glass-ui/src/composables/sidebar/useSidebarState.ts:36` still declares `getChildren?: (node: T) => T[] | undefined` and forwards it into `useTreeIndex` at `:67`.

Practical consequence for the wave board: PaperSidebar is one of the *cheapest* components in the tree to carry across the atomic tri-package transaction. Its uplift cost is entirely in the a11y/motion repairs above, not in import churn.

### D-I3 — Every scoped override in this file is a bet on glass-4 internals that the uplift re-rolls
**Severity INFO**

The file wins its cascade fights by out-specifying utilities it never names. That is a stable arrangement only while the utilities stay the same. Between 4.0.0 and 7.0.0: `--radius-control` moves from `var(--radius-md)` (4.0.0 `theme/radius.css:45`) to `var(--radius-pill)` (7.0.0 `theme/radius.css:162`); `.btn-pill`'s transition doctrine has been re-tuned twice by its own comments (AX.W51/AX.W52); `--control-h-md` may be re-based. `.sidebar-link`'s eleven declarations, `.sidebar-top-btn`'s six, and the `focus-visible` triple in `style.css` are all silent bets. F.W1 should re-derive each override's necessity against 7.0.0 rather than port them.

Related token-hygiene note: `border-radius: calc(var(--radius) - 2px)` (`:227`) is a **shadcn-era** idiom (subtract-from-the-one-radius) in a system that ships semantic radius tokens (`--radius-control`, `--radius-card`, `--radius-pill`). It resolves fine today (8px, §6 F-3) but it is off-language.

### D-I4 — The `--section-color-5` fork is a design-system smell independent of its contrast merit
**Severity INFO** · `web/src/style.css:112-127`

Recorded separately from D-M4's contrast arithmetic: aliasing a *paper section identity* (`--section-color-5`) to a *visualization series colour* (`--viz-amber`) couples two semantics that have no reason to move together, and expresses one of thirteen ramp stops in a different colour model (`hsl` vs the ramp's `oklch`). The right repair is upstream (rebaseline glass's light amber, which the comment already books as a coordination ask) plus a fourier-side override of *all* failing stops in the ramp's own model.

### D-I5 — No gate in the repo can see any of §1
**Severity INFO** · `e2e/*.spec.ts`

`grep -rln "axe" web/e2e/*.spec.ts` → `visualization-crud.spec.ts`, `visualization-ux.spec.ts`. The paper route's only spec is `paper-performance.spec.ts` (performance + TOC navigation), and it runs on a single chromium project [FE §0]. **vitest is ABSENT** [FE §0, §9]. So: no axe pass on `/paper`, no contrast gate, no ARIA gate, no unit test, no visual regression on the sidebar. Every blocker in §1 is invisible to CI and would remain invisible after the uplift. Adding `@axe-core/playwright` (already a devDependency, `package.json:26`) to a `/paper` spec is a ~10-line change that would have caught D-B2 and D-B3(b) automatically, and D-B4/D-I1 partially.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

- **S-1 · The `useSidebarState` delegation is exemplary producer-first practice.** `:29-45`. Rather than fork the expand/collapse logic (which had been duplicated in `PaperSidebar` *and* `MobileFloatingToc`), the consumer pushed the need upstream and glass-ui grew a `getChildren` override — and the producer's own doc comment names fourier's exact shape: *"Pass when your tree stores children under a different property (e.g. `subsections`) — symmetric with `useTreeIndex` / `useScrollTracker`"* (`useSidebarState.d.ts:38-42`). This is the anti-shadow act, done correctly, and it survives the uplift intact (D-I2). It should be cited in F.W3 as the pattern for the `GlassTimeline`/`EasingPicker` retirements.
- **S-2 · The viewport-height plumbing is the correct solution to a genuinely hard layout problem.** `PaperView.vue:124` publishes `--paper-scroll-viewport-height` from the *scroller's* `clientHeight` (`:201`), and `PaperSidebar.vue:145-154` derives both max-heights from it with a `100dvh` fallback. A sticky sidebar inside a nested scroll container cannot use `100dvh` correctly — this is the classic bug, and the component does not have it. The fallback keeps it degrading sanely.
- **S-3 · `overscroll-behavior-y/x: contain` + `scrollbar-gutter: stable`.** `:156-158`. The first prevents the TOC's scroll from chaining into the article at the ends (the single most common nested-scroller annoyance); the second reserves the gutter so the list does not reflow when the scrollbar appears. Both are the fastidious choice and neither is common.
- **S-4 · The A.W3.d motion remediation had the right *intent*, precisely recorded.** `:197`, `:229`: named transition properties instead of `transition: all`, canonical ease tokens instead of raw beziers, with the wave id in the comment. That D-M6 shows the execution collides with `.btn-pill` does not diminish the discipline — `transition: all` on a 50-row list would have been materially worse, and the comment made the collision *findable*.
- **S-5 · `data-toc-id` is a clean, presentation-free hook.** `:73, 91, 108`. The e2e suite (`paper-performance.spec.ts:94, 122, 193-197`) and the scroll-spy both key off it, so neither is coupled to a styling class that a redesign would rename. Compare the same file's `.sidebar-list > li` structural selectors, which *are* so coupled — the attribute hook is the better half.
- **S-6 · The navigation semantics are right where they are cheapest to get wrong.** `<aside>` → `<nav aria-label="Table of contents">` → `<ol>` → `<li>` (`:49-50, 64-65`), with real nested `<ol>`s at both sub-levels (`:86, 104`). An *ordered* list is the correct element for a numbered TOC, the landmark is named, and there is no `<div>` soup. The ARIA that is missing (D-B4) is the ARIA that requires a widget pattern; the ARIA that comes free from good HTML is all present.
- **S-7 · The inset customs are single-sourced and genuinely earn their keep.** `--sidebar-top-inset` / `--sidebar-bottom-inset` (`:133-134`) are consumed in **six** derived positions (`:142, 146-147, 153-154, 159, 161`) — sticky offset, two max-height calcs, scroll-padding, and the asymmetric bottom padding. This is exactly what a local custom property is for, and it is why the file's *own* geometry is internally consistent even where it fights the library's.
- **S-8 · The resting link colour clears AA in both arms with room.** `.sidebar-link { color: var(--muted-foreground) }` (`:228`) computes to **5.12:1** light / **5.68:1** dark against `--card`. Given how many of the file's other colour decisions fail (§1–§2), the one that governs ~95% of the pixels is correct — and correct because it used a token at full strength instead of a `color-mix` fade.

---

## §6 · HYPOTHESES RAISED AND FALSIFIED BY THE TREE

Recorded so the next reader does not re-run them, and as evidence that the falsifier discipline bit.

- **F-1 · `scrollbar-thin` is NOT a dead class.** I suspected `:50`'s `class="sidebar-nav scrollbar-thin"` was orphaned, because the only *fourier* definition is scoped inside `FrequencyGraph.vue:236-245`. **Falsified:** glass-ui ships it — `dist/styles/utilities/base.css:160-170`, `.scrollbar-thin` + `::-webkit-scrollbar-thumb` with `--scrollbar-track`/`--scrollbar-thumb` tokens. The class is live and correct. (The *duplicate* local copy in `FrequencyGraph.vue` is that component's problem, not this one's.)
- **F-2 · `--section-color-N` is fully defined, and the paper does not overflow the ramp.** I suspected only `--section-color-5` existed (it is the only one in `web/src/style.css`), which would have made every other active entry's colour an IACVT `inherit`. **Falsified:** glass-ui ships a **13-stop** ramp, `--section-color-0..12`, in both arms (`tokens/color-radius.css:241-253`, `dark-arm.css:95-107`, `light-dark.css:126-138`) and bridges them to Tailwind (`theme/bridges.css:168-180`); all thirteen are present in the built sheet. The paper has **11** chapters (`grep -c "^\\chapter" paper/fourier_paper.tex`), so `si` ∈ 0..10 — comfortably inside. The finding that *survives* is the contrast one (D-M4), not an undefined-token one.
- **F-3 · `calc(var(--radius) - 2px)` resolves deterministically.** glass-ui declares `--radius` twice (`theme/radius.css:16` = `0.625rem`; `components.css:30` = `0.25rem`), which looked like a cascade coin-flip. **Falsified:** the built sheet carries `--radius:.625rem` at all four occurrences, so the row radius is a stable **8px**. Downgraded to the off-language note in D-I3.
- **F-4 · There is no `Collapsible` double-toggle.** `:68` (`@update:open="toggleSection"`) and `:74` (`@click="… toggleSection"`) looked like they would both fire and cancel. **Falsified:** reka emits `update:open` from the *trigger*, and no `CollapsibleTrigger` is rendered — the root is purely controlled, so `:68` never fires in practice. (This is the same absence that causes D-B4 and D-I1: the bug that *isn't* here is the direct consequence of the bug that is.)
- **F-5 · `v-if="section.number"` is not an optional-chain hazard.** `PaperSectionData.number` is **required** `string` (`flattenPaperSections-CN98CCOQ.d.ts:153`), so the guard only ever suppresses an empty string — deliberate, for starred/unnumbered headings. Correct as written.

---

## §7 · CORPUS RECONCILIATION + METHOD

### Hitherto corpus — folded, not re-invented

| source | row | this challenge |
|---|---|---|
| **CENSUS §3a / FE §5** — break surface (`metric-badge` ×7 files, `hover-card`/`-popover` ×4, dock members ×3, `ToastVariant`) | — | **CONFIRMED and extended by exclusion:** PaperSidebar touches none of them; all four of its subpaths survive at 7.0.0 (**D-I2**). It is off the break surface — and the surface it *is* on (the disclosure ARIA contract) is not in the census. **New material for F.W1.** |
| **CENSUS §2 C-4** — metric-badge is 7 *files* not 6 | — | not applicable here; recorded as read. |
| **CENSUS §3a** — "the `@utility cartoon-card` resurrection shim (25 sites)" | — | **CONFIRMED at 25 sites** and turned into a finding: PaperSidebar is the surface that quotes the idiom **without** using the shim, at a weaker edge (**D-M8**). |
| **CENSUS §3a / FE §8** — "18 reduced-motion references" as banked hygiene | — | **CONTRADICTED at this surface.** `grep -rn "prefers-reduced-motion" web/src/components/paper/` → **2 hits, both `PaperView.vue`, both the progress bar.** The sidebar's own actions are ungated (**D-M10**) and its scoped block has zero PRM rules. The aggregate hygiene count masks a per-component hole. |
| **CENSUS §3a / FE §3** — "deepest, cleanest consumer in the constellation" | — | **CONFIRMED for adoption breadth, QUALIFIED for adoption depth.** The imports are idiomatic; the *cascade relationship* is not (**D-M1, D-M2, D-M6**). Depth of import ≠ conformance of composition. Recommend F.W4 measure "overrides that fight the primitive" as a distinct metric. |
| **Intake `lane-fourier-r3-r6.md` · R5-7 / R6-5** (ADOPT-AS-FACT) — three native `<li v-for>` at lines **65 / 87 / 105**, expressions `(section, si) in sections` / `sub in section.subsections` / `subsub in sub.subsections` | R5-7, R6-5 | **RE-VERIFIED line-for-line** against the live tree; see `:65, :87, :105` throughout §1–§3. The blind-spot lesson generalizes to *this* axis too: a design audit keyed to component callsites would have inspected the two `Tooltip` sites and missed the three loops that render 100% of the TOC. |
| **Intake · R3-7a** (CARRY → F.W3) — 35 Tooltip callsites / 9 consumers, "PaperSidebar 2" | R3-7a | **CONFIRMED exactly** — `:70` and `:88`, and the count is *why* **D-N5** exists: the third level has none. The `ui/tooltip` migration budget should note that PaperSidebar needs a third callsite added, not just two migrated. |
| **Intake · R3-10 / X-2 / X-9** (F.W4 audit-model constraints) | — | honoured: this challenge counts native element loops (R5-7), states its member scope explicitly (one SFC + its transitive import closure), and makes no percentage claims. |
| **CENSUS §5 risk 10** — "uplift lands with no unit-test net" | — | **SHARPENED for this route: no axe pass has ever visited `/paper`** (**D-I5**). The gap is not only unit tests; the a11y gate that *does* exist is scoped to two visualization specs. |

### Method — how the contrast numbers were produced

Script: `/private/tmp/claude-504/…/scratchpad/contrast.js` (scratch, not a repo artifact). `oklch → OKLab → linear sRGB (Björn Ottosson's matrices) → gamma-encoded sRGB`, clamped to gamut; `hsl → sRGB` per CSS Color 4; WCAG 2.x relative luminance `0.2126R + 0.7152G + 0.0722B` on linearized channels; contrast `(L₁+0.05)/(L₂+0.05)`. `color-mix(in srgb, X p%, transparent)` treated as X at α = p/100 composited over the opaque backdrop — `c = α·X + (1−α)·bg` — which is the premultiplied definition in CSS Color 5.

Inputs, all read from the **installed** producer (fourier overrides none of them except `--section-color-5`):
`--card` light `hsl(36 48% 97%)` / dark `hsl(24 8% 16%)`; `--muted-foreground = --neutral-5` light `hsl(30 22% 40%)` / dark `hsl(34 14% 62%)`; `--muted = --neutral-1` light `hsl(38 26% 95%)` / dark `hsl(28 12% 11%)`; `--border = --neutral-4` light `hsl(32 26% 70%)` / dark `hsl(30 16% 34%)`; `--foreground` light `hsl(24 10% 10%)` / dark `hsl(48 10% 90%)`; the 13-stop `--section-color-*` ramps; fourier's `--section-color-5` overrides `hsl(35 76% 35%)` / `hsl(37 73% 67%)`.

**Cross-check that validates the method:** the script reproduces D.W4.d's own recorded figures — glass's light amber at **3.49:1** (D.W4.d says "≈3.54:1"), fourier's darkened replacement at **4.71:1 vs `--background`** (D.W4.d says "≈4.6:1"). Both within 0.1 of the wave's independently measured, axe-sourced numbers.

Full output table: light `--card` — label 2.39 · top-btn glyph 1.87 · top-btn border 1.27 (rest) / 1.90 (hover) · card edge 1.36 vs page · hover surface 1.02 · resting link 5.12 · section stops 5.06/6.10/6.28/4.61/**4.36**/4.62†/**4.48**/5.44/5.74/5.82/**4.33**/3.58/5.74. Dark `--card` — label 3.00 · glyph 2.29 · border 1.32 · hover surface 1.08 · resting link 5.68 · section stops 4.98–8.21. († = fourier override.)

### Scope + law compliance

`/Users/mkbabb/Programming/fourier-analysis` was read only (`cat`/`sed`/`grep`/`ls`/`node -e` over files; zero writes, zero installs, zero git mutations). `/Users/mkbabb/Programming/glass-ui` was read only, for the 7.0.0 forward flags. No browser tooling was used; the four claims that require a live surface are marked **UNPROVEN-NEEDS-LIVE (SS-13)**: D-M1's 10px dead-space figure, D-M2's measured overflow, D-M7's (a)/(b) source-order split, D-M11's empty-`subsections` sliver, and D-N13's gutter question. Every other claim is source- or artifact-determined. The sole write is this file.

---

## §8 · WHAT F.W4 SHOULD DO WITH THIS

Ordered by cost-to-benefit, not by severity.

1. **Wire the section row as `CollapsibleTrigger as-child`** (`:71`). One structural change discharges D-B4 (aria-expanded/controls arrive free), pre-empts D-I1 (the 7.0.0 IDREF break), and makes D-M5 *fixable* by splitting navigate from disclose. It is a prerequisite of F.W1, not a follow-on.
2. **Add `height: auto` (or delete `display: block` in favour of `justify-content: flex-start`) to `.sidebar-link`, and `white-space: normal`.** Three declarations retire D-M1 and D-M2 and give the file the density it was authored for.
3. **Raise the two faded colours to full-strength tokens.** `.sidebar-label` → `var(--muted-foreground)`; `.sidebar-top-btn` → `var(--muted-foreground)` + `var(--border)`; and take the 20px control to 24px minimum. Retires D-B2 and D-B3 in five lines.
4. **Decide D-B1 explicitly at the uplift** — either add `@source "../node_modules/@mkbabb/glass-ui/dist";` today, or land 7.0.0 and verify `disclosure-content` animates. Either way, correct the two false comments at `:83-84` and `:255-257` in the same commit. A wrong comment is worse than none.
5. **Gate `behavior: "smooth"` on PRM** in `useScrollNavigation.ts:191, 242` — the matchMedia idiom is already in the neighbouring file.
6. **Replace the hand-rolled card with `cartoon-card`** (`:161-165`) and delete the dead `.is-active-sub` binding (`:94`) or give it a rule.
7. **Add an axe pass to a `/paper` spec.** `@axe-core/playwright` is already installed; this is the gate that makes items 3 and 1 stay fixed.
8. **Relay upstream** (glass BH inbox, standing law): glass-ui 4.0.0's `CollapsibleContent` emits three utility classes its own published stylesheet does not define, and ships two orphan `@keyframes` under different names. Fixed at 7.0.0 by rewrite — worth a note so the 4.x line is known-broken rather than silently so.

*Single-file challenge. No product source in any repo was modified.*
