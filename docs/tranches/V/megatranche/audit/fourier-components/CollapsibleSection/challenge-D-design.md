claude-opus-5[1m] (served model id)

# CHALLENGE — `CollapsibleSection.vue` · axis **D** (DESIGN)

**Subject.** `fourier-analysis/web/src/components/ui/CollapsibleSection.vue` (73 lines incl. trailing
newline; lane-frontend §"bespoke wrappers" calls it 72). Read whole, plus every file it imports and
every file that resolves its class surface:

| read (read-only) | why |
|---|---|
| `web/src/components/ui/CollapsibleSection.vue` | the subject |
| `web/node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js` | the INSTALLED (4.0.0) implementation of all three primitives |
| `…/dist/components/ui/collapsible/{Collapsible,CollapsibleTrigger,CollapsibleContent}.vue.d.ts` + `index.d.ts` | the 4.0.0 prop/slot contract |
| `…/dist/styles/animations.css:18,29` · `utilities/base.css:174,258,270` · `utilities/a11y-overrides.css:6-17,115-121` · `utilities/btn.css:55,67` · `typography/utilities.css:60-67` · `tokens/color-radius.css:40,45,57,72` · `tokens/dark-arm.css:42,47` · `theme/bridges.css:67-70,326` · `index.css:190-222` · `components.css` | every token / keyframe / utility the subject's classes resolve against |
| `web/src/style.css` (whole) · `web/package.json` | the cascade entry + the pins |
| `web/node_modules/tw-animate-css/dist/tw-animate.css` | `--animate-collapsible-down/up` provenance |
| `/Users/mkbabb/Programming/glass-ui` @ **7.0.0** — `src/components/collapsible/*.vue`, `src/components/_shared/disclosure/{disclosure.css,disclosure-context.ts}`, `src/styles/**` | the F.W1 target |
| the four consumers: `equation/FunctionInput.vue:94,176`, `equation/EqCoefficientsPanel.vue:13`, `visualization/ContourPreview.vue:34`; hosts `equation/EquationView.vue:198,213,374`, `visualization/VisualizationView.vue:257`, `App.vue:26`; the sibling disclosure `visualization/ContourSettings.vue:340-374` | proportion + state + scroll-parent evidence |

**Corpus folded** (not re-invented): `formation/fourier/CENSUS-2026-08-03.md` §3a/§5, `lane-frontend.md`
lines 182, 215-245, 285-307, 345-372, 619; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`
(38/52 TRUE). Overlaps and one contradiction are cited inline.

**Method / limits.** Static + source-derived only. No browser tooling (L: probe parsimony). Contrast
figures are computed from the token graph by hand (WCAG 2.x relative-luminance), not measured.
Anything that needs a live paint is marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Posture.** Assumed defective until the tree proved otherwise. Claims I had drafted that were **killed
by their own falsifiers** are recorded in §4 — the axis runs both ways.

**Two passes.** §1–§6 are pass 1. §7–§9 are an independent **pass 2** (same seat, same served model,
re-spawned) that re-derived the component from scratch without reading pass 1 first, then reconciled.
Pass 2 **independently corroborated** B-1 (cascade/layer mechanics), M-3 (`@apply` vs `closest()`),
M-5 (`--font-serif-math` undeclared), S-1 (contrast tokens) and §4.1 (the blanket PRM killswitch);
it **falsified one of its own load-bearing claims** against pass 1 (§8 F-4); and it adds **5 defects**,
**1 superlative**, and **1 correction to the hitherto corpus** that pass 1 did not carry. Nothing in
§1–§6 was removed. Where pass 2 amends a pass-1 row it says so by id.

**Tally: 24 defects (2 BLOCKER · 7 MAJOR · 11 MINOR · 4 INFO) · 5 superlatives · 1 corpus correction.**

---

## §1 — BLOCKERS

### B-1 · The F.W1 uplift silently kills this component's motion — and the local rule kills its replacement too

**Severity BLOCKER.** `CollapsibleSection.vue:60-65`.

At the installed pin the two keyframes exist and resolve: `@keyframes collapsible-open`
(`glass-ui@4.0.0/dist/styles/animations.css:18`) and `collapsible-close` (`:29`), both reading
`var(--reka-collapsible-content-height)`. The file's comment (`:57-59`) is therefore **true today**.

At the producer's current cut it is false. In `glass-ui@7.0.0`:

```
$ grep -rn "collapsible" src/styles/        →  0 hits
```

The disclosure grammar moved out of the global stylesheet into a component-scoped file with **new
keyframe names and a new size channel**:
`src/components/_shared/disclosure/disclosure.css:1` `@keyframes disclosure-open`, `:15`
`@keyframes disclosure-close`, driven by `--disclosure-content-size` (`:99-101`), shipped via
`<style src="../_shared/disclosure/disclosure.css">` at `Collapsible.vue:62`.

So after the tri-package uplift, `animation: collapsible-open 0.2s var(--ease-out)` names a keyframe
that does not exist. That alone would be a silent no-op. The compounding defect is that it is written
as the **`animation` SHORTHAND**, and the SFC `<style scoped>` block is emitted **unlayered** while
glass's replacement lives in `@layer components` (`disclosure.css:26`). Unlayered beats every layer
regardless of specificity — so the local shorthand does not merely fail, it **overwrites
`.disclosure-content[data-state="open"] { animation-name: disclosure-open }`** (`disclosure.css:104-110`)
with an unresolvable name. Net effect at F.W1: the panel snaps open and closed with **no height
animation and no fade**, on all four callsites.

No gate can see this. `vue-tsc` does not typecheck CSS; **vitest is ABSENT** [CENSUS §5 risk 10 · FE
§0/§9]; the 29 single-chromium Playwright tests assert no animation. It is a pure-visual regression
that lands invisibly inside the largest bump in the repo's history (prior art: 3.1→4.0 cost 46 lines
[FE §5]).

**Falsifier.** Produce `@keyframes collapsible-open` (or `collapsible-close`) in anything glass-ui
7.0.0 ships, or in `tw-animate-css` — the latter defines `--animate-collapsible-**down**` /
`--animate-collapsible-**up**` with keyframes `collapsible-down` / `collapsible-up`
(`tw-animate.css`, `@theme inline` block), *different names*, so it does not rescue this. Or show the
scoped rule losing the cascade to `@layer components` — it cannot; unlayered wins.

**Cure (F.W1).** Delete `:54-71` entirely and let `.disclosure-content` own the motion (see M-1 — the
block is already redundant *today*), or, if the opacity fade is wanted, keep exactly one longhand
`animation-name` declaration bound to the producer's current name.

---

### B-2 · Four styled headings, zero heading semantics — WCAG 1.3.1 (Level A) on the app's primary control surface

**Severity BLOCKER.** `CollapsibleSection.vue:38-41`.

The title is a bare `<span class="cm-serif text-sm font-semibold tracking-tight">` nested in a second
bare `<span>`, inside the trigger `<button>`. There is no `<h2>`/`<h3>`, no `role="heading"`, no
`aria-level`, and no `role="region"`/`aria-labelledby` binding the panel to its label. Verified across
the whole consumption path: none of the four callsites wraps the component in a heading — all three
consumers wrap it in `<div class="cartoon-card px-3 py-2">` (`FunctionInput.vue:93,175`,
`EqCoefficientsPanel.vue:12`, `ContourPreview.vue:33`).

It is presentationally a heading — a distinct family, 600 weight, its own tracking, a muted 12px
deck — which is exactly the F2/H42 failure condition for SC 1.3.1: visual heading, no programmatic
heading. A screen-reader user navigating the equation view by heading finds *nothing* for "Function",
"Controls", "Coefficients", "Preview" — the four sections that ARE the left panel. `@axe-core/playwright`
(a devDep here) cannot detect this class of failure, so the repo's own a11y gate is blind to it.

The producer agrees: glass-ui 7.0.0 ships `.disclosure-header { display: flex; margin: 0 }`
(`disclosure.css:33-36`) precisely so a heading element can host the trigger row, and its
`CollapsibleContent` now emits `role="region"` + `:aria-labelledby="ids.trigger"` + `:id`
(`CollapsibleContent.vue:44-47`) with `CollapsibleTrigger` emitting the matching `:id` + `aria-controls`
(`CollapsibleTrigger.vue:37-39`). The uplift hands back the region binding for free; it does **not**
hand back the heading — that is this component's to add.

**Falsifier.** Point at a heading element, `role="heading"`, or `aria-level` anywhere on the path from
`<CollapsibleSection>` down to `{{ title }}`, or argue the title is not presented as a heading — the
weight/family/size/deck combination above is the counter-evidence.

---

## §2 — MAJOR

### M-1 · The scoped `<style>` block IS the consumer-side shadow its own comment says was excised

**Severity MAJOR.** `CollapsibleSection.vue:54-71`, comment at `:57-59`.

glass-ui 4.0.0's `CollapsibleContent` already hard-codes, in the component itself:

```js
// dist/CollapsibleContent-C_s6fG7r.js — component `h`
i(t, { class: "overflow-hidden transition-collapse
        data-[state=closed]:animate-collapsible-up
        data-[state=open]:animate-collapsible-down" })
```

Those classes are **reachable in fourier**, not dead: glass's cascade entry declares
`@source "../*.js"` (`dist/styles/index.css:222`) which in the shipped context resolves to
`dist/*.js` — the flat compiled chunks that carry exactly these class strings (the file's own
`:190-221` comment documents this as the deliberate consumer backstop) — and `tw-animate-css`
(imported at `web/src/style.css:2`) supplies `--animate-collapsible-down` / `--animate-collapsible-up`
plus their keyframes.

And glass ships a **global** reduced-motion killswitch with `!important`:

```css
/* dist/styles/utilities/a11y-overrides.css:6-17 */
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
                               transition-property: opacity,color,background-color,border-color,box-shadow !important; }
}
```

So all four local rules are redundant against the installed primitive: `:54-56` duplicates
`overflow-hidden`; `:60-65` re-states an animation the primitive already declares; `:66-71` re-states a
guarantee the producer already enforces with `!important`. The **sole** delta the shadow buys is an
opacity fade — `collapsible-open` animates `height` *and* `opacity` (`animations.css:18-27`), the
Tailwind `collapsible-down` is height-only. One declaration of value, eighteen lines of shadow, and a
comment asserting the shadows "have been excised".

**Falsifier.** Name a second visual the block produces that the primitive does not. (I looked; the
opacity fade is the only one.) Or show `@source "../*.js"` failing to reach `dist/*.js` in a consumer
— glass's own `index.css:203-221` argues the opposite and calls it "locked by `proof:emission`".

*Cross-ref: lane-frontend:356 already flags this comment as one of two prose references to
`@mkbabb/glass-ui/styles/animations` that are "PROSE COMMENTS, not imports" (the other is the verbatim
copy at `ContourSettings.vue:357`). This challenge adds the material half: the comment's claim is
inverted.*

### M-2 · The reduced-motion guard is CSS-only; the component's largest motion is JS and unguarded

**Severity MAJOR.** `CollapsibleSection.vue:26` vs `:66-71`.

`el.scrollIntoView({ behavior: 'smooth', block: 'end' })` fires on every open. Per CSSOM-View, an
explicit `behavior` in `ScrollIntoViewOptions` **overrides** the CSS `scroll-behavior` property — so
neither a `@media (prefers-reduced-motion)` rule in this file, nor glass's global `!important`
killswitch (M-1), nor any `html { scroll-behavior }` override can reach it. The component thus
carefully suppresses a 200 ms 16-px-tall height animation under `reduce` and then performs a
full-viewport smooth scroll — the vestibularly significant one — unconditionally.

This is the only one of `lane-frontend:619`'s eight `@media (prefers-reduced-motion: reduce)` blocks
(`ui/CollapsibleSection.vue:66` is named there) that sits in the same file as an unguarded JS motion.

**Falsifier.** Show a `matchMedia('(prefers-reduced-motion: reduce)')` guard on the path to `:26`
(there is none in the file, and `grep -rn "matchMedia" web/src` does not put one in this call chain),
or cite a spec clause making `behavior:'smooth'` yield to the user preference.

### M-3 · The scroll-parent probe can never match this app's scroll containers

**Severity MAJOR.** `CollapsibleSection.vue:24`.

```js
const scrollParent = el.closest('.overflow-y-auto, .overflow-auto') ?? el.parentElement;
```

This couples to Tailwind class **names in the DOM**. The real scroll container for the two
`FunctionInput` sections and for `EqCoefficientsPanel` is `.eq-panel-left`, declared as

```css
/* EquationView.vue:374 (scoped) */
.eq-panel-left { @apply flex flex-col gap-3 w-full pb-8 overflow-y-auto min-h-0 flex-1; }
```

`@apply` inlines declarations; it does **not** add `overflow-y-auto` to the element's class list. So
`closest()` walks straight past the actual clipping box and matches `App.vue:26`
`<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">` instead — a different element with a
different bottom edge. The `ContourPreview` callsite is worse: `VisualizationView.vue` contains **zero**
literal `overflow-y-auto`/`overflow-auto` classes (`grep` → none), so it too falls through to `<main>`.
Repo-wide the only literal-class scrollers are `App.vue:26`, `GalleryView.vue:220`,
`EquationPanel.vue:106`, `GalleryCardModal.vue:73`, `CoefficientsSpectrum.vue:78` — none of them an
ancestor-and-clipper of a `CollapsibleSection` except `<main>`.

The predicate at `:25` therefore compares the section's bottom against the **wrong** boundary: it asks
"does this overflow the viewport-height `<main>`?" when the box that actually clips is the left panel.
The affordance is not merely mis-tuned, it is testing a different question than the one it was written
to answer.

**Falsifier.** Show `.eq-panel-left`'s live `class` attribute containing `overflow-y-auto` (it cannot
— `@apply` is a declaration inliner), or name an ancestor between a `CollapsibleSection` and `<main>`
carrying a literal `overflow-y-auto`/`overflow-auto` class. The *visual consequence* (whether a user
ever notices) is **UNPROVEN-NEEDS-LIVE (SS-13)**; the selector/DOM mismatch is statically proven.

### M-4 · The trigger has no hover affordance — and the uplift does not cure it

**Severity MAJOR.** `CollapsibleSection.vue:36`.

The trigger carries `cursor-pointer select-none` and nothing else interactive. `.collapsible-trigger`
has **zero** rules anywhere (see m-1). `group` is present but no `group-hover:`/`group-*` variant
appears in the file — dead. From glass 4.0.0 it inherits `focus-ring` (real class,
`utilities/base.css:174` → `box-shadow: var(--focus-ring-shadow)` on `:focus-visible`) and `tap-squish`
(real class, `:258`/`:270` → `scale: var(--scale-press)` on `:active`, PRM-neutralized at `:273-279`) —
but glass ships **no `:hover` rule reachable from `[data-slot="collapsible-trigger"]`**
(`grep -rn 'collapsible-trigger' dist/styles/` → 0 hits).

So on a fine pointer, the four section headers — the primary means of operating the left panel — give
**no hover feedback at all**. The same app disagrees with itself one directory over:
`ContourSettings.vue:350-352` gives its hand-rolled disclosure trigger a real hover
(`color-mix(--foreground 40%→60%)`). Two disclosure idioms, one with feedback and one without.

F.W1 does not fix it: glass 7.0.0's `.disclosure-trigger` (`disclosure.css:38-49`) supplies only
radius + `touch-action` + focus-visible + disabled; the hover (`background: var(--control-surface-bg-hover)`)
lives on `.disclosure-group-trigger` (`:52-71`), which `CollapsibleTrigger` does **not** apply.

**Falsifier.** Produce a `:hover` rule that reaches this button in either 4.0.0 or 7.0.0 shipped CSS,
or a `group-hover:`/`hover:` utility on `:36-41`.

### M-5 · `cm-serif` resolves to the generic `serif` — the title's declared voice is a no-op

**Severity MAJOR.** `CollapsibleSection.vue:39`.

```css
/* glass-ui@4.0.0 dist/styles/typography/utilities.css:65-67 */
@utility cm-serif { font-family: var(--font-serif-math, serif); }
```

`--font-serif-math` is defined **nowhere** — not in glass-ui's token graph (`grep -rn -- "--font-serif-math"
dist/styles/` → exactly one hit, the fallback usage above) and not in fourier (`grep -rn -- "--font-serif-math"
web/src` → 0). The title therefore renders in the UA's generic `serif` (Times on most platforms) — the
one face nobody in this repo chose.

The irony is load-bearing: `style.css:13-15` deliberately remaps `--font-sans` onto
`"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif`, but `body` is set to
`font-serif` (`style.css:20`), which bridges to `--font-stack-text` = `"Plus Jakarta Sans", …`
(`glass tokens/scheme-motion.css:43` via `theme/bridges.css:68`). Three serif intentions in play —
brand CM on `font-sans` (unused by body), Plus Jakarta on `font-serif` (used by body), generic `serif`
on `cm-serif` (this title) — and the section header lands on the accident. On a Fourier-analysis app
whose whole typographic identity is Computer Modern, the *math voice* class is the one that fails to
deliver it.

**Falsifier.** Find `--font-serif-math` declared in either tree, or in `katex.min.css` /
`@mkbabb/latex-paper` reaching `:root`. I looked in glass's `tokens/`, `theme/`, `typography/` and
fourier's only stylesheet; there is no declaration. Exact rendered face is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the missing custom-property is proven.

### M-6 · The `250 ms` timer is **100 ms short** at 7.0.0 — and unbounded thereafter *(pass 2; amends m-4/m-5)*

**Severity MAJOR.** `CollapsibleSection.vue:19-20,28` ↔ `:61` ↔ glass-ui@7.0.0 `tokens/scheme-spring.css:149,157`.

m-4 records the literals as untokenized. The sharper fact is that the constant becomes **wrong**, not
merely unowned:

```js
// :19-20 — "Scroll into view after the open animation completes"
setTimeout(() => { … }, 250)
```

250 is hand-tuned to clear the local `0.2s` at `:61`. After F.W1 the duration is the substrate's:

```css
--spring-smooth-settle:  0.35s;                                           /* scheme-spring.css:149 */
--spring-smooth-duration: calc(var(--spring-smooth-settle) * var(--motion-tempo));  /* :157        */
--motion-tempo: 1;                                                        /* scheme-motion.css:262 */
```

**350 ms at default tempo.** The callback fires 100 ms *before* the animation completes and measures a
partially-expanded `getBoundingClientRect()` — precisely the measurement the comment at `:19` claims to
be avoiding. And `--motion-tempo` is a *documented consumer knob* (`scheme-motion.css:251`: "a consumer
sets `:root { --motion-tempo: 0.85 }`"), so no constant can be correct: at tempo 1.5 the true duration
is 525 ms.

**Corpus fold + re-grade.** fourier's own `docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:32`
(row **A8-17**) already booked this at **LOW** — *"the `setTimeout(250)` scroll heuristic is fragile
(animation timing coupled to magic number) … address as a cleanup, not M-blocking"*, cure `ontransitionend`/
`onanimationend`, routed M.W3. I re-grade to **MAJOR** on two facts A8-17 could not have had: (a) the
target duration becomes token-derived *and* tempo-scalable, so the coupling stops being fragile and
starts being unsatisfiable; (b) the cure A8-17 named is available **unchanged at both pins**, so it has
zero uplift coupling and can land today.

**Falsifier.** Show 7.0.0's `.disclosure-content` resolving to ≤ 250 ms, or `--motion-tempo` fixed.
`disclosure.css:88-89` reads both tokens; `scheme-motion.css:251-262` documents tempo as settable.

### M-7 · No controlled `open` ⇒ the route's primary result lands in a **closed** drawer *(pass 2; extends m-6)*

**Severity MAJOR.** `CollapsibleSection.vue:9,11,14` ↔ `EquationView.vue:212-214` ↔ `EqCoefficientsPanel.vue:13`.

m-6 records the missing controlled `open` as an API gap. Traced to its consequence it is a design
defect on the equation route:

```html
<!-- EquationView.vue:212-214 -->
<Transition name="slide-down">
  <EqCoefficientsPanel v-if="components.length" :components="components" />
</Transition>
```
```html
<!-- EqCoefficientsPanel.vue:13 -->
<CollapsibleSection title="Coefficients" subtitle="Fourier spectrum" :default-open="false">
```

The Coefficients panel **mounts only after Compute succeeds** — and mounts **collapsed**. The user
presses the route's single primary action (`FunctionInput.vue:151-159`, the full-width `Compute`
button), a card slides in, and the thing they asked for is behind a second click, with no count, badge,
or cue that it now holds data. `open = ref(props.defaultOpen)` at `:14` is initialize-once and there is
no `v-model:open` passthrough, so the call site **cannot** express "open me, I just filled with the
answer" — the component's API gap is what forces the closed default to be terminal.

**Falsifier.** Show a call site driving the state: all four pass only `:default-open`
(`ContourPreview.vue:34` true, `EqCoefficientsPanel.vue:13` false, `FunctionInput.vue:94,176` true).
Both 4.0.0 and 7.0.0 `Collapsible` accept controlled `open` + `update:open`, so the passthrough is a
two-line, version-independent cure.

---

## §3 — MINOR / INFO

| id | sev | claim | file:line | falsifier |
|---|---|---|---|---|
| **m-1** | MINOR | **Three dead hooks.** `.collapsible-section` and `.collapsible-trigger` have zero rules in the SFC, zero rules anywhere in `web/src`, and zero test selectors (`grep -rn "collapsible-section\|collapsible-trigger" web/src ../tests` → only their own two definitions). `group` has no `group-*` consumer in the file. Three naming commitments that pay nothing — and `.collapsible-section` in particular reads as a styling seam that was never opened. | `:34`, `:36` | Produce any rule or selector, in any repo, matching either class. |
| **m-2** | MINOR | **The padding contract is split between component and consumers.** The component owns `pb-1` (4 px) and no top padding (`:46`); the gap above the body is whatever `py-1.5` (6 px) leaves. Each consumer then re-invents the top gutter: `FunctionInput.vue:95` `pt-1`, `:177` `pt-1`, `ContourPreview.vue:35` `p-2`, `EqCoefficientsPanel.vue:14` nothing. Four callsites, three different above-body gaps. Aristotelian: a 6 : 4 above/below ratio, both sub-8 px, neither tokenized, and the component does not own the proportion it exists to impose. | `:36`, `:46` + consumers | Show a shared token or a single owner for the trigger↔body gap. |
| **m-3** | MINOR | **No subordination of body to header.** The label starts at x ≈ 24 px (16 px chevron + `gap-2`); the body starts at x = 0 (`:46`). No indent, no hairline, no left rule — the disclosure's content is not visually *under* its heading, and two nested `CollapsibleSection`s would be typographically indistinguishable (same size, same weight, same inset). glass 7.0.0's own body recipe indents: `.disclosure-content-body { padding: 0 .25rem 1rem }` (`disclosure.css:112-114`). | `:46` | Show an indent, rule, or size step distinguishing depth. |
| **m-4** | MINOR | **Motion literals, untokenized and silently coupled.** `0.2s` twice (`:61`,`:64`), `250` in JS (`:28`), `duration-200` on the chevron (`:37`). The `250` is the `200` plus an unexplained 50 ms — a comment says "after the open animation completes", so the two must move together, but nothing links them. glass ships `--duration-fast/normal/control`; 7.0.0 drives the same animation from `--spring-smooth-duration` (`disclosure.css:102-103`). | `:28`,`:37`,`:61`,`:64` | Point at a token. |
| **m-5** | MINOR | **Uncleared timer.** `setTimeout` at `:20` is never captured, never cleared, and has no `onScopeDispose`. Toggling a section N times in under 250 ms queues N callbacks, each of which can fire a smooth scroll; unmounting inside the window leaves a callback running against a detached node (it is *benign* — a detached `closest()` returns null and the guard at `:25` holds — but it is unowned). | `:20-28` | Show a clear/guard. |
| **m-6** | MINOR | **State coverage: 1 of 4 states modelled.** No `disabled` passthrough although both 4.0.0 (`Collapsible.vue.d.ts` → `CollapsibleRootProps`) and 7.0.0 (`Collapsible.vue:11`) accept it. No controlled `open` and no `update:open` emit, so a parent cannot drive expand-all/collapse-all or persist state. `defaultOpen` is read **once** into `ref` at `:14`, so a later prop change is silently ignored. An empty slot yields a bare 4 px `pb-1` box with no empty affordance — `EqCoefficientsPanel` has to delegate that to `CoefficientsSpectrum`'s `empty-text` (`:14`) and is additionally `v-if`-gated by its host (`EquationView.vue:213`). No loading and no error surface. | `:6-14`, `:46` | Show a passthrough, emit, or `watch(() => props.defaultOpen)`. |
| **m-7** | MINOR | **Sole bare-root glass import among the collapsible consumers.** `:2` imports the three symbols from `'@mkbabb/glass-ui'` while the repo's other two collapsible consumers use the subpath — `PaperSidebar.vue:7` and `ContourSettings.vue:12` both `from "@mkbabb/glass-ui/collapsible"`. lane-frontend:237-243 records the same three symbols under **both** the root row and the `/collapsible` row: a duplicated entry in a 21-subpath discipline. It will **not** break at F.W1 (the root export survives at 7.0.0), so this is consistency, not breakage. | `:2` | Show the root barrel is the house convention — the 95-import census says otherwise. |
| **m-8** | MINOR | **Trigger is ~32 px tall against the producer's own 44 px floor for this exact role.** `py-1.5` + a 14 px/`text-sm` line ⇒ ≈ 32 px. Clears WCAG 2.5.8 (24 px, AA) and fails 2.5.5 (44 px, AAA). glass's coarse-pointer floor (`utilities/a11y-overrides.css:115-121`) enumerates `[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger` — the collapsible trigger is not in the set — while glass 7.0.0's canonical section trigger sets `min-block-size: 2.75rem` outright (`disclosure.css:57`). The producer's answer for a titled section header is 44 px; this is 32. | `:36` | Recompute the box, or produce a coarse-pointer floor reaching `[data-slot="collapsible-trigger"]`. |
| **m-9** | MINOR | **`#actions` is a dead API surface.** `grep -rn "#actions\|v-slot:actions" web/src` → **0 consumers**. The flex row at `:35` exists solely to host it; with no consumer the wrapper is one div of pure speculation, and the slot's layout contract (alignment, gap, focus order relative to the trigger) has never been exercised. | `:43` | Name a consumer. |
| **m-10** | MINOR | **The subtitle is folded into the control's accessible name.** `:39-41` puts both spans inside the `<button>`, so the accname is `"Function — f(x)"` / `"Controls — harmonics & display"` — an em dash and a decorative deck inside the operable name, where `aria-describedby` is the idiomatic home. (Vue's default `whitespace: 'condense'` drops the inter-element newline, so `ml-1.5` at `:40` is the *only* separator — deliberate and correct as layout; it is the semantics that are wrong.) | `:38-41` | Argue the deck belongs in the name; note glass 7.0.0's id plumbing makes `aria-describedby` cheap. |
| **i-1** | INFO | **Prose: a 3-line cross-repo provenance claim with no pin, guarding 2 lines of CSS.** `:57-59` asserts a fact about another repository's shipped stylesheet ("canonical … see `@mkbabb/glass-ui/styles/animations.css`") without recording the version it was true at. It was true at 4.0.0 and is false at 7.0.0 (B-1). The comment is longer than the rules it explains and it is the exact sentence that made the shadow look already-retired (M-1). The identical paragraph is copy-pasted at `ContourSettings.vue:353-360` — two comments, one shelf life. | `:57-59` | — |
| **i-2** | INFO | **Dead defensive branch.** `rootEl.value?.$el ?? rootEl.value` at `:21`: `rootEl` is typed `InstanceType<typeof Collapsible> \| null` and `Collapsible` is a single-root component at both 4.0.0 and 7.0.0, so `$el` is always present when the ref is non-null. The `??` right arm is unreachable, and it is the arm that would hand a *component instance* to `getBoundingClientRect()` at `:23`. | `:21` | Show a render path where `Collapsible`'s instance lacks `$el`. |
| **m-11** | MINOR | *(pass 2)* **F.W1 imposes a new body typographic register on all four sections.** glass 7.0.0's `.disclosure-content` sets `color: var(--muted-foreground-strong); font-size: var(--type-small); line-height: var(--leading-small)` (`disclosure.css:85-87`) — today the bodies inherit `--foreground` at the ambient size. Blast radius is small but non-zero: `FunctionInput` re-asserts `text-sm`/`text-foreground` on every input and label (`:97,112,125,136,158,171`), `ContourPreview`'s SVG uses a literal stroke (`:44`), and `CoefficientsSpectrum` sets `text-xs`/`text-muted-foreground` per row (`:73,84,86,101`) — but `Button` labels (`FunctionInput.vue:151,167,196`) and `Tooltip` bodies rendered inside the region inherit unless those primitives re-assert. A visual-diff row for F.W1, not a code-review row. | 7.0.0 `disclosure.css:85-87` | Show every text node inside the four bodies setting an explicit colour *and* size. |
| **i-3** | INFO | *(pass 2)* **`#actions` being dead CONTRADICTS the M-audit's stated basis for a booked glass-ui ask.** m-9 records the slot as unconsumed. The consequence is larger than hygiene: `findings-index.txt:373`, `raw-findings.json:2905` and `design-synth.json:357` all assert *"ConfiguratorLayer has NO header trailing/actions slot — **the sole reason fourier keeps a parallel CollapsibleSection**"*, and route a **high**-priority glass-ui ask (A-3-new) off that premise. Against the tree at `cd26c65` + WT the premise is false: the slot has **zero** consumers (`grep -rn "#actions\|v-slot:actions" web/src` → 0). The correction cuts *in the audit's favour* — the retirement case no longer depends on the ask landing — but the ask itself now needs a re-argued justification before F.W3 books it upstream. | `:43` ↔ corpus | Name one `#actions` consumer. |
| **i-4** | INFO | *(pass 2)* **Call-site count drift in the corpus.** A8-17 (`2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:32`) says "Used at 5 sites"; `design-synth.json:1725` says 3. The tree has **4 usages in 3 files**: `ContourPreview.vue:34`, `EqCoefficientsPanel.vue:13`, `FunctionInput.vue:94,176` (`grep -c "<CollapsibleSection" web/src/components` → 4). `ContourSettings.vue:358` is a **comment reference only**. Same class of small drift CENSUS §2 C-3/C-4/C-5 already corrected in the lanes — budget 4/3 and re-measure at wave-open. | 4 call sites | Recount. |

---

## §4 — Falsified candidates (L-18 discipline: what I could not make stick)

Recorded so F.W4 does not re-file them.

1. **"The chevron's `transition-transform duration-200` (`:37`) escapes the reduced-motion guard, which
   only covers `.collapsible-content`."** — **FALSE.** glass's global block
   (`utilities/a11y-overrides.css:11-16`) rewrites `transition-property` to
   `opacity,color,background-color,border-color,box-shadow !important` under `reduce`, which strips the
   `transform` leg outright. The chevron is covered — by the producer, not by this file.
2. **"`CollapsibleSection` is a shadow of glass-ui's shipped `./expandable-container`."** — **FALSE.**
   `dist/components/custom/expandable-container/ExpandableContainer.vue.d.ts` is a **fullscreen**
   expander (`expandLabel`/`collapseLabel`, `surface: glass|opaque|veil`, `v-slot="{ fullscreen }"`),
   not a disclosure. No shadow. lane-frontend:368's "thin API-shape adapter, not a shadow — keep"
   verdict **stands** on this axis; my defects are all *inside* the adapter, none of them "delete it".
3. **Contrast.** Not a defect — see S-1; it passes, computed, in both arms.
4. *(pass 2, and this one nearly shipped)* **"The substrate's collapse animation is INERT in fourier, so
   the scoped block at `:54-71` is load-bearing rather than a shadow — therefore M-1 is inverted and
   deleting the block before F.W1 would itself be a regression."** — **FALSE.** Pass 2 built this on
   `src/styles/index.css:195-214`, whose comment calls `@source "../*.js"` a no-op, and on
   `grep`s of `src/styles/` that found no blanket PRM reset and no `--animate-collapsible-*`
   declaration. **The wrong tree.** `package.json` `exports["./styles"]` → **`./dist/styles/index.css`**,
   and `web/src/style.css:3` imports the package specifier, so the *dist* copy is the one in fourier's
   cascade. In dist, the very same comment (`dist/styles/index.css:203-221`) says the opposite about
   its own context — *"`../*.js` reaches the compiled render-functions PRECISELY in the SHIPPED context:
   in dist it is `dist/*.js` … Locked by `proof:emission`"* — and `dist/styles/utilities/a11y-overrides.css`
   (which has no `src/` counterpart) carries the blanket `!important` killswitch at `:6-17`. So
   `transition-collapse` / `animate-collapsible-{up,down}` **are** reachable, the block **is** redundant
   but for the opacity fade, and **M-1 and §4.1 stand as written**. Recorded at length because the
   `src/` ↔ `dist/` divergence in this package is a live trap for any subsequent lane: **grep `dist/styles/`,
   never `src/styles/`, when reasoning about what a consumer actually receives.**

---

## §4b — Correction to the hitherto corpus *(pass 2)*

### X-1 · The booked `:inert` remediation is **FALSE** against the installed tree — do not land it

`docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:2675-2677` asserts:

> "Collapsed `<CollapsibleContent>` subtrees are visually hidden (height: 0) but **remain in the tab
> order and a11y tree**. Screen-reader users and keyboard navigators reach hidden controls inside closed
> ContourSettings advanced section and CollapsibleSection panels."

— and proposes `:inert="!open || undefined"` plus `aria-hidden` on this component's content wrapper.

The tree disagrees. reka-ui 2.9.10's `CollapsibleContent` renders, when closed:

```js
// node_modules/reka-ui/dist/Collapsible/CollapsibleContent.js:82
hidden: !present ? (unref(rootContext).unmountOnHide.value ? "" : "until-found") : void 0,
```

glass-ui 4.0.0 declares `unmountOnHide: { type: Boolean }` with no default
(`dist/CollapsibleContent-C_s6fG7r.js`, component `p`), so it is `false` and the closed content receives
**`hidden="until-found"`**. Where that is implemented it applies `content-visibility: hidden` and removes
the subtree from **both** the accessibility tree and the tab order (find-in-page reachable only); where
it is not, the UA rule `[hidden] { display: none }` removes it outright. Either way the described failure
does not occur and **no `:inert` is required**. The animation is unaffected: reka's `Presence` holds
`present` true for the duration of the close animation, so `hidden` is applied only after it ends — the
attribute and the collapse do not race.

**Why this matters beyond one row.** The proposed cure is not inert (pun intended): adding
`aria-hidden="true"` to a subtree that the platform has *already* removed is the classic
`aria-hidden-focus` regression vector if the state ever desynchronises from `data-state`. Landing a fix
for a non-existent bug here would be a net a11y loss.

**Falsifier.** Name an engine supporting neither `hidden=until-found` nor the plain-`hidden` fallback —
there is none. **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact Safari-version matrix of the `until-found`
path only; the `display:none` fallback is a11y-safe regardless, so the *conclusion* is version-independent
even where the *mechanism* is not.

**Scope.** The sibling half of that finding — `ContourSettings.vue:255` — was **not** re-verified here
(out of this component's scope) and may or may not survive the same test. F.W4 should run it before
striking the whole row.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

**S-1 · Contrast is a token-decidable PASS in both arms, with margin.** `text-muted-foreground` on the
`.cartoon-card` surface: light `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`
(`tokens/color-radius.css:45,85`) on `--card` = `hsl(36 48% 97%)` (`:72`) → **5.11 : 1**; dark
`hsl(34 14% 62%)` (`dark-arm.css:47`) on `hsl(24 8% 16%)` (`:64`) → **5.68 : 1**. Both clear SC 1.4.3
(4.5:1) for the 12 px deck at `:40` and SC 1.4.11 (3:1) for the chevron glyph at `:37`. Computed by
hand from the token graph. *Falsifier: recompute; or show the component rendered on a surface other
than `--card` — all four callsites are inside `cartoon-card` (`FunctionInput.vue:93,175`,
`EqCoefficientsPanel.vue:12`, `ContourPreview.vue:33`), and the shim binds `background: var(--card)`
at `style.css:110`.*

**S-2 · The motion is primitive-native, not hand-rolled.** The animation is driven off the primitive's
`data-state` channel and the primitive's own `--reka-collapsible-content-height`, with
`overflow: hidden` on the content — not a JS height measurement, not a `max-height` guess, not a
ResizeObserver. That is the correct idiom, and it is what makes B-1's cure a *deletion* rather than a
rewrite. Zero direct `reka-ui` imports, consistent with the census's "deepest, cleanest consumer in the
constellation" [CENSUS §3a · FE §3].

**S-3 · The actions slot is outside the button.** `:43` places `<slot name="actions" />` as a **sibling**
of `CollapsibleTrigger` inside the flex row (`:35`), not inside it. The obvious implementation of
"a header row with a title and some buttons" nests interactive content inside the disclosure `<button>`
— invalid HTML, unreachable-by-keyboard children, and a swallowed activation. This component got it
right on the first try, and the row wrapper at `:35` exists precisely to make that possible. (It is
also currently unused — m-9 — so the right structure is banked ahead of its first consumer.)

**S-4 · It is NOT on the F.W1 break surface.** Checked directly against the 7.0.0 tree: `Collapsible`,
`CollapsibleTrigger`, `CollapsibleContent` still export from **both** the root (`exports["."]`) and
`./collapsible`; `v-model:open` survives (`Collapsible.vue:20-27` declares `open` + `update:open`);
`class` is a first-class prop on all three and is merged via `cn()`, so `:34`/`:36`/`:45` keep landing.
Nothing here touches the census's enumerated break set — `metric-badge` ×7 files [CENSUS §2 C-4],
`hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant`
[FE §5]. The only uplift casualty is CSS (B-1), and it is self-inflicted, not API drift. `lucide-vue-next`
at `:4` is in the ×35-site `@lucide/vue` rename, which is mechanical.

**S-5 · It inherits the collapsed-subtree a11y closure for free — by delegating instead of hand-rolling.**
*(pass 2; the positive face of X-1.)* Because the component forwards to the primitive rather than
managing visibility itself, closed content gets `hidden="until-found"` from reka
(`CollapsibleContent.js:82`) — removed from the tab order and the a11y tree, still findable by
find-in-page, and still animatable because `Presence` defers the attribute past `animationend`. That is
a genuinely hard thing to get right by hand: the naive `height: 0; overflow: hidden` disclosure (which is
what `ContourSettings.vue:340-374` builds) leaves focusable controls in the tab order behind a zero-height
box. This component never had that bug, never wrote a line to avoid it, and — per X-1 — an audit
subsequently proposed patching a bug it does not have. *Falsifier: show `unmountOnHide` truthy (it is not
— `{ type: Boolean }`, no default) or the `hidden` attribute absent on a closed panel.*

---

## §6 — Routing

| finding | wave | note |
|---|---|---|
| B-1 | **F.W1** (gate) | must land *with* the bump; add a CSS-regression check or the uplift ships a silent visual RED that no existing gate sees [CENSUS §5 risk 10] |
| B-2, M-4, m-8, m-10 | **F.W4** | the a11y/affordance cluster; B-2 gets cheaper after F.W1 (7.0.0 supplies the region binding, `.disclosure-header`, and a 44 px trigger recipe) |
| M-1, i-1, m-7 | **F.W3** | shadow retirement + glass suffusion; the `ContourSettings.vue:340-374` twin is the same object and should be dispositioned in the same stroke |
| M-2, M-3, m-5, i-2 | **F.W4** | the whole `watch`/`setTimeout` block wants re-grounding, not patching — M-3 says the predicate asks the wrong question |
| M-5 | **F.W4** (+ glass BH relay) | `--font-serif-math` is an unfilled producer seam; per the standing BH/BI relay law this is a glass-inbox row as well as a fourier one |
| m-2, m-3, m-4, m-6, m-9, m-1 | **F.W4** | proportion + API surface; m-2/m-3 are the Aristotelian core and want one owner for the section's vertical rhythm |
| **M-6** | **F.W1** (gate) *(pass 2)* | the `250` becomes wrong (350 ms) *at the moment of the bump*; the cure (`animationend`) is version-independent, so land it **before** F.W1 and the bump inherits a correct timer |
| **M-7** | **F.W4** | the controlled-`open` passthrough; the visible payoff is `EqCoefficientsPanel` opening on a successful Compute |
| **m-11** | **F.W1** (visual diff) *(pass 2)* | not a code change — an expected-delta row for the F.W1 screenshot pass |
| **i-3** | **F.W3** *(pass 2)* | before booking glass-ui ask A-3-new upstream, re-argue it: its stated premise (the actions slot) is dead in the tree |
| **i-4** | **F.W0/F.W4** *(pass 2)* | count reconciliation; fold into the CENSUS §2 drift register |
| **X-1** | **F.W4** — **STRIKE, do not implement** *(pass 2)* | the booked `:inert` cure addresses a bug the platform already handles; verify the `ContourSettings.vue:255` half before striking the whole corpus row |

### Standing note for every subsequent fourier lane *(pass 2, from §4.4)*

`@mkbabb/glass-ui` ships **two divergent style trees**, and `exports["./styles"]` resolves to the
**dist** one: `dist/styles/utilities/a11y-overrides.css` has no `src/` counterpart, and
`src/styles/index.css:195-214` and `dist/styles/index.css:203-221` carry **opposite** statements about
whether `@source "../*.js"` is a no-op — each true of its own context. A pass-2 claim that reached
BLOCKER draft status died on exactly this. **Reason about consumer-visible CSS from `dist/styles/` only.**

---

*Read-only throughout. This file is the only write. Pass 1 + pass 2, same seat, `claude-opus-5[1m]`.*
