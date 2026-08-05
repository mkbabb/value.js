claude-opus-5[1m]

# CHALLENGE · `FourierShapeExtractor.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/FourierShapeExtractor.vue`
(191 lines; **no `<style>` block** — the file ends at `:191` with `</script>`).
**Method** static + source-derived only; **no browser tooling**. Read whole: the target, its three
imports (`@mkbabb/glass-ui/button`, `@mkbabb/pencil-boil`, `@/lib/svg-contours`), the shell that hosts
it (`App.vue`, `style.css`, `router/index.ts`), the installed glass-ui **4.0.0** cascade at
`web/node_modules/@mkbabb/glass-ui/dist/styles/**`, the producer glass-ui **7.0.0** at
`/Users/mkbabb/Programming/glass-ui/` (`package.json` → `7.0.0`, HEAD `51cfdfaf`) and pencil-boil
**0.12.0** at `/Users/mkbabb/Programming/pencil-boil/` for uplift analysis, and the repo's only design
record for this route: the three checked-in J·π captures at
`docs/tranches/J/audit/screenshots/before/shape-extractor-{375x667,1280x800,1440x900}.png`
(commit `57624fa`, 2026-06-04). Screenshot claims are **pixel-measured** (PIL, colour histograms +
bbox scans), not eyeballed. Contrast ratios are WCAG 2.x relative luminance computed from the declared
token values; every figure is reproducible from the cited token line.
**Posture** assumed DEFECTIVE until the tree proved otherwise. **Five** hypotheses that read as
obvious defects died to their own falsifiers and are recorded in §5 as superlatives or as dismissals
rather than banked as findings.

**Evidence-currency note (load-bearing).** The component's last commit is `262c3d0` (2026-06-02); the
J·π captures are `57624fa` (2026-06-04). **The captures are of this exact source.** What has moved
underneath it is the *pin*: `git show 57624fa:web/package.json:14` → `"@mkbabb/glass-ui": "^3.1.0"`,
while the working tree carries an **uncommitted** `^3.1.0 → ^4.0.0` uplift (`git diff web/package.json`)
with `node_modules` already at 4.0.0. Every screenshot-derived claim below is therefore labelled with
the pin that produced it, and the 4.0.0 consequence is derived from the installed cascade.

**The uplift already swept this repo and skipped this file.** `git status --porcelain` lists **25
modified `web/src/**.vue` files** — `EquationView`, `InfoCard`, `HarmonicLevelGrid`, `MorphPhaseConfig`,
`GalleryView`, `AnimationControls`, … — the 3.1→4.0 rename pass (`lane-frontend.md:494-499`: 24 files,
46/46 lines, `variant="glass-scrubber"`→`"standard"`, `UnderlineTabs`→`SegmentedTabs`).
`FourierShapeExtractor.vue` **is not in that list**, and its sibling `FourierMorphDemo.vue` is not
either. This component was not audited by the hop that touched everything around it.

---

## §0 · The component's true surface

Structurally the file is four things and nothing else:

1. **Two hand-authored inline `<svg>` subjects** (`:9-66` sun, `:72-121` moon) — 16 shape elements
   total, every one of them `stroke="red"` or `fill="red"`, in 200×200 boxes with
   `style="border: 1px solid #ccc"` (`:15`, `:78`).
2. **Five inline `style=` blocks and zero classes** — `:2` (`padding: 2rem`), `:5`
   (`display:flex; gap:2rem; margin:2rem 0`), `:15`, `:78`, `:129-137` (the `<pre>`). The component
   names **no design token, no utility class, and no scoped rule anywhere in 191 lines**.
3. **One glass-ui surface**: `<Button id="extract-btn" variant="default" size="default">` (`:125`).
   That is the component's entire adoption of the design system.
4. **An imperative output seam**: `document.getElementById("output")` (`:176`) →
   `el.textContent = JSON.stringify(output)` (`:178`) → `(window as any).__fourierShapeData` (`:180`),
   fired by `setTimeout(…, 200)` on mount (`:187-189`).

The design consequence of (2)+(4) is the spine of this challenge: **everything visual on this page is
inherited, and the one thing that is stateful is invisible to Vue.** The component owns no type scale,
no colour, no spacing rhythm, no surface, no state model. It is a page-shaped hole into which the
shell's cascade falls — which is exactly why a *pin change* rewrites it end to end without touching a
byte of it.

**Route reality.** `/demo/shape-extractor` (`router/index.ts:111-115`) is a real, lazily-imported,
production-reachable route with **no `meta` block** — the only route of the nine without one
(`:47-51`, `:62-66`, `:74-78`, `:85-89`, `:95-99`, `:105-109` all carry `title`+`description`). It is
absent from `VALID_TABS` (`:29`), so no nav links it, and `afterEach` never persists it (`:177-188`).
Route-record provenance folds the adjudicated intake **X-2** (`lane-fourier-r3-r6.md:153`, ADOPTED:
"9 route records = 7 lazy component + 2 redirect, + 1 alias") — this component is one of the 7.

**Corpus fold.** `formation/fourier/lane-frontend.md:174` books the file at **191 lines** — re-counted
live, exact. `:277` books the Button import at `FourierShapeExtractor.vue:143` — exact. `:481` books
the pencil-boil peer floor row naming `:144` — exact, and §5/S-1 below settles what that bump actually
costs. `CENSUS-2026-08-03.md:102-106` (the uplift break surface) and `:184-186` (F.W1) are folded into
§6, **and contradicted on one row**: the break table has no `Button` entry, and it needs one (D-2).
The intake `lane-fourier-r3-r6.md` was searched for
`ShapeExtractor|shape-extractor|Button|variant|inline|#ccc|contrast|aria|reduced-motion` → the only
hit is **X-2** (route registry, folded above). No adjudicated row reaches this component's design
surface; nothing below duplicates the intake, and nothing below contradicts it.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · One of the two subjects is clipped off-screen at 375px — and the repo's occlusion gate is *structurally* incapable of seeing it

**Claim.** At the mobile viewport the Moon — one of exactly two things this page exists to show — is
cut off mid-crescent with no wrap, no scroll affordance, and no indication that anything is missing.

**Arithmetic (source-derived, exact).** `style.css:40-43` sets `html { font-size: 1.125rem }` below
768px, so **`1rem = 18px` on mobile**. The row is `display:flex` with no `flex-wrap` (`:5`), holding
two SVGs at fixed `width="200" height="200"` (`:13-14`, `:76-77`):

```
padding-left 2rem (36px) + 200 + gap 2rem (36px) + 200 + padding-right 2rem (36px) = 508px
508px content in a 375px viewport  ⇒  133px of the Moon box is off-screen (≈67% of the Moon visible)
```

**Confirmed in the record.** `shape-extractor-375x667.png`: the Moon box's right border is absent and
the crescent is sliced vertically at the viewport edge. (The same capture puts the sun box fully
inside, so this is not a capture artifact.)

**Why no gate caught it — the part that generalises.** The route *is* in the visual harness
(`e2e/visual-baseline.spec.ts:36`), and that harness carries an occlusion gate
(`:62-68`): `document.documentElement.scrollWidth - clientWidth ≤ 2`. But `App.vue:24-28` wraps every
route in `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">` inside an `overflow-hidden`
`h-dvh` shell. Per CSS Overflow 3 §3.1, a computed `overflow-y: auto` forces the *other* axis's
`visible` to compute to **`auto`** — so the 133px overflow is consumed *inside* `main` and never
reaches `documentElement`. **The gate reads ≤ 2 and passes while a subject is amputated.** This is not
a one-page problem: the same `main` construction wraps all nine routes, so the occlusion gate is
reporting green from a container it cannot measure, repo-wide.

**Provenance.** `FourierShapeExtractor.vue:5,13-14,76-77` · `style.css:40-49` · `App.vue:24-28` ·
`e2e/visual-baseline.spec.ts:36,40-42,62-68` · `docs/tranches/J/audit/screenshots/before/shape-extractor-375x667.png`.

**Falsifier (applied, survived).** *Does the SVG shrink?* No: `width`/`height` are presentation
attributes with no `max-width:100%` and no CSS to override them — the component ships zero CSS. *Does
`main` scroll horizontally so the user can reach it?* Only by an undiscoverable horizontal drag inside
a container with no visible scrollbar on iOS/macOS overlay-scrollbar defaults, and the page offers no
affordance saying so. *Is 375px out of scope?* It is one of the three viewports the repo's own harness
declares (`visual-baseline.spec.ts:40-42`).

**Falsify me.** Show either (i) a rule anywhere in the served cascade that constrains these two SVGs
below 200px, or (ii) an occlusion measurement taken on `main` (not `documentElement`) at 375px
returning ≤ 2. Either kills D-1.

---

### D-2 · BLOCKER · `variant="default" size="default"` is a hard 7.0.0 typecheck break, and the census break-surface table has **no Button row at all**

**Claim.** `:125` is `<Button id="extract-btn" variant="default" size="default" @click="extractAndOutput">`.
glass-ui **7.0.0 deletes both props**. This is a compile break the F.W1 budget does not carry.

**Producer evidence (read-only, live).** `/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-40`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  type?: …;  disabled?: …;  class?: …;
}
```

There is **no `variant` member**, and `"default"` is **not a `ButtonSize`**. `src/components/button/index.ts`
exports only `Button`, `ButtonProps`, `ButtonEmphasis`, `ButtonSize` — **`buttonVariants` is gone**.
The producer books it as a breaking row in its own changelog: `glass-ui/CHANGELOG.md:63-64` —
"`/button`: `ButtonVariants` → `ButtonProps` / `ButtonEmphasis` / `ButtonSize`".

**Blast radius, measured live in fourier.** `grep -rn 'variant="default"' web/src --include='*.vue'`
→ **4 sites** (`FourierShapeExtractor.vue:125`, `FourierMorphDemo.vue:71`, `ExportModal.vue:75`,
`FunctionInput.vue:144`); `grep -rn 'size="default"'` → **6 sites** (the four above minus
`FunctionInput`, plus `ExportModal.vue:74`, `FourierMorphDemo.vue:75`, `HarmonicLevelGrid.vue:58`).
35 files import `@mkbabb/glass-ui/button`. The subpath survives at 7.0.0 (`exports["./button"]` present),
so this fails as a **prop-type break inside a still-resolving import** — the worst kind for a budget
built from an export-map diff.

**The census gap (explicit contradiction).** `lane-frontend.md:450-484` enumerates the "Rows that hit
fourier-analysis TODAY" — `metric-badge`, `hover-card`, `hover-popover`, `DockIconButton`,
`DockDropdownTrigger`, `ToastVariant`, lucide, and the three peer floors. **`Button` appears in no
row**, and `CENSUS-2026-08-03.md:102-106` + `:184-186` reproduce that list verbatim into F.W1's
charter. The export-map diff at `lane-frontend.md:456-466` cannot see this break by construction: it
diffs *subpath names*, and `./button` is present on both sides. **F.W1's break budget is short by a
whole primitive, and by the single most-imported one in the repo (35 files).**

**Runtime shape of the failure (not just typecheck).** Unknown props fall through to the root element,
so post-uplift the DOM carries literal `variant="default" size="default"` attributes while the button
renders with `emphasis="secondary"`, `tone="neutral"`, `size="md"` — i.e. it **silently changes
geometry and emphasis** rather than failing loudly at runtime. A `vue-tsc`-only gate that someone
suppresses will ship a visually different button with no error.

**Provenance.** `FourierShapeExtractor.vue:125` · producer `src/components/button/Button.vue:15-40`,
`src/components/button/index.ts:1-6`, `CHANGELOG.md:63-64` · installed `dist/components/ui/button/index.d.ts`
(4.0.0 still has `variant`/`size:"default"`) · `lane-frontend.md:450-484` · `CENSUS-2026-08-03.md:102-106`.

**Falsify me.** Produce a `variant` prop, a `"default"` `ButtonSize`, or a compat alias in
glass-ui 7.0.0's `src/components/button/`. Or show the Button row in the census break table. Either
kills D-2.

---

## §2 · MAJOR

### D-3 · MAJOR · This page's typography is 100% inherited — and at the installed pin it is inherited from an **unlayered** glass-ui `body` rule that beats the app's own brand register

**Claim.** The component declares no family, size, weight, colour or leading. At glass-ui 4.0.0 those
five properties are all set by a **single unlayered rule the app cannot outrank**:

```
web/node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css:13-18
body { font-family: var(--font-text); color: var(--foreground);
       font-size: var(--type-body); line-height: var(--type-leading-body); }
```

`typography/semantic.css` contains **no `@layer`** (grep → empty) and `index.css:150` imports it with
no `layer()` function, so it is **unlayered**. fourier's counterpart is
`style.css:17-22` — `@layer base { html, body { @apply bg-background text-foreground font-serif; … } }`.
Per CSS Cascade 5 §Cascade Sorting Order, **unlayered normal declarations win over every layer**.
⇒ glass's `body` rule wins outright; `@apply … font-serif` on `body` is **dead**.

**What that resolves to.** `theme/bridges.css:66-70` (`@theme inline`) sets
`--font-text: var(--font-stack-text)` and `--font-serif: var(--font-stack-text)`;
`tokens/scheme-motion.css:43` sets `--font-stack-text: "Plus Jakarta Sans", …, sans-serif`.
So at the 4.0.0 pin the page's body face is **Plus Jakarta Sans** at
`--type-body = clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` (`typography/scale.css:110-114`).

**And the brand fork never reaches it either way.** `style.css:5-15` states its own intent —
"the brand fork remaps the `font-sans` Tailwind utility onto Computer Modern Serif" — and `@theme`
overrides **`--font-sans` only**. But the shell applies **`font-serif`**, not `font-sans`
(`style.css:20`). The remapped token is never used by the element that carries the app's text. At the
3.1.0 pin this landed on Tailwind's default `--font-serif` (`ui-serif, Georgia, …`), which is exactly
what `shape-extractor-1440x900.png` shows: a Georgia-class serif, **not** Computer Modern. At 4.0.0 the
same markup lands on Plus Jakarta Sans. **The page's voice flips faces across the in-flight pin bump,
and neither face is the one the brand comment claims.**

**Why this component is the maximal case.** Pages like `/paper` re-declare their own register
(`.cm-serif`, KaTeX faces, scoped rules). This file declares nothing, so it is 100% exposed: it is the
cleanest instrument in the repo for reading what the shell actually serves.

**Provenance.** `FourierShapeExtractor.vue` (no `<style>`, no class attr, 191 lines) ·
`glass-ui@4/dist/styles/typography/semantic.css:13-18` (unlayered) · `dist/styles/index.css:150` (no
`layer()`) · `theme/bridges.css:66-70` · `tokens/scheme-motion.css:43` · `typography/scale.css:110-114` ·
`style.css:5-22,40-49` · capture `shape-extractor-1440x900.png`.

**Falsifier (applied, survived).** *Does fourier's `@theme` beat glass's?* For `--font-sans`, yes
(later source order in the same theme layer) — and it is irrelevant, because the shell never applies
`font-sans`. *Does `@layer base` outrank an unlayered rule?* No — that is backwards; layered loses to
unlayered. *Could the `html` rule at `style.css:40-49` carry the family?* It sets only `font-size` and
`line-height`, and `body`'s own `font-size` overrides the inherited one for everything below it.

**Falsify me.** A computed-style readback of `font-family` on `h1` at `/demo/shape-extractor` under the
4.0.0 pin returning a serif stack kills the 4.0.0 half of D-3. **UNPROVEN-NEEDS-LIVE (SS-13)** — the
cascade derivation is complete and static, but the served result has not been observed at 4.0.0.

---

### D-4 · MAJOR · Zero typographic hierarchy: `<h1>` and `<h2>` render at body size and body weight — and the prior audit's diagnosis of this is *wrong*

**Claim.** The page has three heading-shaped strings (`:3` `<h1>Shape Extractor (internal tool)</h1>`,
`:8` `<h2>Sun</h2>`, `:71` `<h2>Moon</h2>`) and **no type scale at all**: h1, h2 and body text render
identically.

**Mechanism (exact).** `style.css:1` imports Tailwind v4, whose preflight
(`node_modules/tailwindcss/preflight.css:68-80`) is:

```css
/* Remove the default font size and weight for headings. */
h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
```

Nothing restores it: glass-ui ships heading treatment only as **opt-in utilities**
(`typography/semantic.css:22+` — `@utility text-display-*`, `text-heading-*`), never as bare-element
rules (`grep -rn "^h1" dist/styles/` → empty), and this component applies none. ⇒ h1 = h2 = body,
inheriting `--type-body` from D-3's rule.

**Confirmed by measurement.** In `shape-extractor-1440x900.png` the cap-heights of "Shape Extractor
(internal tool)", "Sun" and "Moon" are indistinguishable, and all three sit on the same optical weight
as the `<pre>` line below them.

**CONTRADICTION of the hitherto corpus — two rows.** `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json`:

- **SE-06** (high) — "raw `<h1>` and `<h2>` with **browser defaults**", evidence at `:1582`: "the
  screenshots show **browser-default serif `<h1>` and `<h2>`**". **FALSE.** Browser defaults for `h1`
  are `2em` + `bold`; preflight zeroes both. The headings are *flattened*, which is a **worse and
  categorically different** defect than "unstyled large": an unstyled `h1` would at least establish
  hierarchy. The repair the finding implies (tokenise the sizes) is right; the diagnosis is not, and
  a reader who trusts it will look for the wrong thing.
- **SE-14** (medium) — "`<h1>`/`<h2>` **carry no serif font family** — visual register disconnected
  from every other page". **FALSE at 3.1.0.** They inherit the same `body` family as every other page
  (D-3); the capture shows the identical serif face used by `/gallery`'s empty-state copy in
  `gallery-1440x900.png`. The family was never the disconnect — the *scale* is. (At 4.0.0 the family
  changes, but it changes for **every page at once**, so it is still not a disconnect.)

**Provenance.** `FourierShapeExtractor.vue:3,8,71` · `tailwindcss/preflight.css:68-80` ·
`glass-ui@4/dist/styles/typography/semantic.css` · captures · `raw-findings.json` SE-06, SE-14.

**Falsify me.** Any served rule giving `h1`/`h2` a font-size or weight on this route. Kills D-4 and
resurrects SE-06.

---

### D-5 · MAJOR · The page's only CTA renders with **no visible label** in the repo's only visual record

**Claim.** In all three J·π captures the "Extract Shape Contours" button (`:125-127`) is a solid dark
pill containing **zero label pixels**.

**Pixel measurement (reproducible).** From `shape-extractor-1440x900.png`:

- pill bounding box ≈ **180 × 40 px** at (32, 400);
- interior sample (45,400)–(200,440) = 6 200 px: the dominant colour is **rgb(28, 25, 23)** at 5 425 px,
  with the next four colours within **±1 unit** of it (544 / 80 / 65 / 43 px — anti-alias dither);
  33 distinct colours total, **none of them light**;
- `hsl(24 10% 10%)` → rgb(28, 25, 23) **exactly** — i.e. the fill is `--primary`
  (`glass-ui@4/dist/styles/tokens/color-radius.css:98`).

A rendered label in `--primary-foreground` (`= var(--neutral-0) = hsl(40 30% 98%)`,
`tokens/color-radius.css:99,40`) would contribute hundreds of light and mid-tone anti-aliased pixels.
There are none. **The button is a blank pill.**

**Control experiment.** `gallery-1440x900.png`, same commit, same pin: the glass-ui `<Button>`
"Open the Visualizer →" renders its label normally. So the failure is not "glass Buttons had no slots
at 3.1.0"; it is specific to the `variant="default"` opaque register on this page.

**Most likely mechanism (hypothesis, not banked as fact).** At 3.1.0 `default` was the shadcn-shaped
`bg-primary text-primary-foreground` (the producer's own 4.0.0 note at `CHANGELOG.md:460` — "the
Button `default` is now glass; `solid` is the opaque escape" — confirms `default` *used* to be
opaque). If the 3.1.0 bundle lacked the `--color-primary-foreground` theme bridge that 4.0.0 ships
(`theme/bridges.css:85`), then `text-primary-foreground` → `color: var(--color-primary-foreground)`
is invalid at computed-value time → `color` falls back to **inherited `--foreground`** = dark ink on a
`--primary` pill = invisible. I could not read the 3.1.0 bundle (not installed), so this remains a
hypothesis; **the measurement above does not depend on it.**

**Status at the current pin.** The installed 4.0.0 CVA base
(`dist/button-BNDWhAZb.js`, `f = cva(…)`) gives `default` =
`glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting) …` — no `--primary` fill, no
`text-primary-foreground`. **The specific failure mode is structurally gone at 4.0.0**, which is why
this is MAJOR and not a blocker. What is *not* gone is the governance fact: this page's only control
was unlabelled for two months in the repo's only design record, across three viewports, and every gate
covering the route stayed green (D-1's occlusion gate is the only assertion the harness makes; there
is no snapshot comparison and no axe run — see D-8).

**Provenance.** `FourierShapeExtractor.vue:125-127` · captures (all three) ·
`tokens/color-radius.css:98,99,40` · `dist/button-BNDWhAZb.js` (4.0.0 CVA) · `CHANGELOG.md:460` ·
`git show 57624fa:web/package.json:14` (`^3.1.0`) · control: `gallery-1440x900.png`.

**Falsify me.** Re-render `/demo/shape-extractor` at glass 4.0.0 and read the button's
`textContent` + computed `color`. A legible label kills the *present-tense* half of D-5 and converts it
to a closed historical record; it cannot kill the measurement. **UNPROVEN-NEEDS-LIVE (SS-13)** for the
4.0.0 state.

---

### D-6 · MAJOR · Zero state coverage — empty, loading and error are **unrepresentable**, and the failure path is a silent `return`

**Claim.** The page has exactly one state: "whatever text was last stuffed into a `<pre>` from
outside Vue". It cannot express any other.

**Mechanism.** `:129-137` declares `<pre id="output">` with **no interpolation, no `v-text`, no bound
ref** — it is permanently empty as far as Vue's render is concerned. Content arrives only through
`document.getElementById("output")` + `el.textContent = …` (`:176-178`). Because no reactive value
backs it:

- **Empty state**: between mount and `+200ms` (`:187-189`) the page shows a 0-height blank strip below
  the button, with nothing that says "computing" or "no data yet". There is no skeleton, no
  placeholder, no `min-height`.
- **Loading state**: unrepresentable. There is no flag to bind one to.
- **Error state**: unrepresentable — **and reachable**. `:166` is
  `if (!sunSvgRef.value || !moonSvgRef.value) return;` — a **silent** early return. If either ref is
  null when the timer fires, the page stays blank forever with no message, no console warning, and no
  visual difference from "still loading". The `<pre>` also stays blank if `extractContours` returns
  `[]` for every element (`svg-contours.ts:52-54` drops any shape with < 3 points).
- **Success state**: also unannounced (see D-7).

**Provenance.** `FourierShapeExtractor.vue:129-137,166,176-178,187-189` · `lib/svg-contours.ts:52-56`.

**Falsifier (applied, survived).** *Is `id`+`textContent` merely stylistic, given Vue never re-renders
this subtree?* It is not stylistic — it is **why** the states cannot exist: the design has no place to
put them. And it is fragile on its own terms: any future reactive dependency in the template would let
Vue re-render `<pre>` and silently erase the output, because Vue's vdom believes the element is empty.
*Does the 200ms timer make loading "short enough to ignore"?* It is a fixed bet, not a signal
(the corpus books this as **SE-03**, medium — folded, and re-aimed here at the *design* consequence
rather than the timing one).

**Falsify me.** Point at any DOM node on this route that changes when extraction fails. There is none.

---

### D-7 · MAJOR · The CTA is affordance-less: pressing it writes byte-identical DOM and announces nothing

**Claim.** `extractAndOutput` already ran on mount (`:185-190`). Clicking "Extract Shape Contours"
(`:125`) re-runs the **same pure computation over the same static SVGs with the same hard-coded
seeds** and writes the **same string** to the same node. Nothing on screen changes. There is no
timestamp, no contour count, no toast, no transient state.

`sunRayPoints` / `starPolygonPoints` / `sunSparklePoints` are `computed` over literal seed arguments
(`:151-163`) with no reactive input, so the SVG geometry is invariant; `extractContours` is a pure
function of the DOM geometry (`svg-contours.ts:10-57`). ⇒ output is deterministic and identical.

**Design consequence.** The only interactive control on the page violates the most basic feedback
contract: an activated command must produce a perceivable result. For a sighted mouse user the button
"does nothing"; for a screen-reader user it does nothing *and* says nothing, because the `<pre>` is
not a live region (no `aria-live`, no `role="status"`, `:129-137`) and no focus moves.

The corpus books the adjacent complaint as **SE-08** (low) — "no visual annotation that it auto-fires
on mount". **I contradict the severity and the framing**: the defect is not a missing annotation, it
is that the control has **no observable effect at all**, which is a WCAG-adjacent feedback failure and
a design failure, not a low-severity documentation gap.

**Provenance.** `FourierShapeExtractor.vue:125,151-163,165-182,185-190` · `lib/svg-contours.ts:10-57` ·
`raw-findings.json` SE-08.

**Falsify me.** Show any byte of rendered output that differs between the mount-time write and a
subsequent click. (Both writes are `JSON.stringify` of the same object graph.)

---

### D-8 · MAJOR · Two nameless graphics, an unannounced output region, and a route that axe never visits

**Claim.** Both `<svg>` elements (`:9-16`, `:72-79`) carry **no `role`, no `aria-label`, no
`aria-labelledby`, no `<title>`, and no `aria-hidden`**. They are the entire content of the page and
they are anonymous to assistive technology. The adjacent `<h2>Sun</h2>` / `<h2>Moon</h2>` (`:8`, `:71`)
are *visually* captions but are not programmatically associated with anything — no `id`, no
`aria-labelledby` pointing at them, no `<figure>`/`<figcaption>`.

`<svg>` has no stable implicit ARIA role across engines, so the elements are exposed either as an
unnamed `graphics-document` or as generic — and their `path`/`polygon`/`circle` children may leak into
the tree as unlabelled graphics. Neither outcome names the subject.

**Compounding: the output region is not announced.** `<pre id="output">` (`:129-137`) has no
accessible name, no `role`, no `aria-live`. Its content appears 200ms after mount and again on every
click, entirely silently (D-7).

**Why nothing caught it.** The repo owns `@axe-core/playwright`, but `AxeBuilder` is instantiated in
exactly two specs (`grep -rl AxeBuilder e2e/` → `visualization-ux.spec.ts`, `visualization-crud.spec.ts`),
and both navigate the visualization surfaces. **`/demo/shape-extractor` is never axe-scanned**, though
it *is* in the visual harness (`visual-baseline.spec.ts:36`) — the route is design-observed and
a11y-unobserved. Axe's `svg-img-alt` / `image-alt` family fires here on first contact.

**Provenance.** `FourierShapeExtractor.vue:8,9-16,71,72-79,129-137` · `e2e/visualization-ux.spec.ts:28`,
`e2e/visualization-crud.spec.ts:85` · `e2e/visual-baseline.spec.ts:36`.

**Falsifier (applied, survived).** *Are these decorative, so `aria-hidden` would be the right answer
and its absence harmless?* No — they are the page's subject matter (the h2s name them, the whole route
exists to display and sample them), so hiding them is not the honest fix; naming them is. And in any
case *neither* attribute is present, so the current state is the one outcome that is wrong under both
readings.

**Falsify me.** An axe run over `/demo/shape-extractor` returning zero image/svg-name violations.

---

### D-9 · MAJOR · The harness ships to production wearing the treatise's marketing copy

**Claim.** `router/index.ts:111-115` is the only route object of nine with **no `meta`**:

```ts
{ path: "/demo/shape-extractor", name: "shape-extractor",
  component: () => import("@/components/morph/FourierShapeExtractor.vue") },
```

`applyRouteMeta` (`:153-164`) therefore falls through to `DEFAULT_TITLE = "Fourier Analysis"` and
`DEFAULT_DESCRIPTION` = *"An interactive treatise on Fourier analysis and orthogonal decomposition —
epicycle visualizations, an equation explorer, and a full typeset paper…"* (`:149-151`), and writes
that description into `<meta name="description">` for a page whose visible content is two red debug
sketches and a raw JSON line.

**Design/prose consequences, all provable:**
1. The browser tab, history entry and bookmark for the tool read "Fourier Analysis" — indistinguishable
   from the five real routes; a developer with the tool open cannot find it by tab title.
2. Any crawler that reaches the URL indexes debug scaffolding under the product's own marketing
   sentence. There is **no `noindex`**, no `robots` meta, and no `import.meta.env.DEV` gate on the
   route (`grep -n "import.meta.env" router/index.ts` → only `BASE_URL` at `:37`).
3. The page's own `<h1>` hedges instead of orienting: **"Shape Extractor (internal tool)"** — a
   parenthetical apology doing the job that `meta.title` + a `noindex` should do. It tells the reader
   what the page *isn't*, and never says what to do with the output, where it goes, or which artifact
   consumes it.

**Prior art folded, extended.** `DA-design-A4-equation-morph-chrome.md:52` (2026-05-27) already
proposed the `import.meta.env.DEV` gate and is still undischarged 70 days later; `raw-findings.json`
SE-01-adjacent evidence at `:1527-1528` books the missing `meta`. **What is new here** is that the
fallback is not neutral — it is *the product's marketing description*, which makes this a brand-surface
leak rather than a missing-title nit.

**Provenance.** `router/index.ts:111-115,149-164,37` · `FourierShapeExtractor.vue:3` ·
`DA-design-A4-equation-morph-chrome.md:34-52` · `raw-findings.json:1527-1528`.

**Falsify me.** Show a `meta` block, a `noindex`, or a DEV gate on this route in the live tree.

---

## §3 · MINOR / INFO

### D-10 · MINOR · The only two containers are token-bankrupt, and the border's weight **inverts** across modes

**Claim.** `style="border: 1px solid #ccc"` (`:15`, `:78`) is the page's only surface treatment, and it
is a raw hex.

**Contrast arithmetic** (WCAG 2.x relative luminance; light bg = `--background` = `--neutral-0` =
`hsl(40 30% 98%)` → rgb(252,249,248), Y = 0.9522; dark bg = `hsl(24 9% 4%)` → rgb(11,10,9), Y = 0.00308;
`tokens/color-radius.css:40,57`, `tokens/dark-arm.css:42`):

| border | light ratio | dark ratio | read |
|---|---|---|---|
| `#ccc` (Y = 0.6039) | **1.53 : 1** | **12.3 : 1** | vanishes in light, glares in dark |
| `var(--border)` = `--neutral-4` light `hsl(32 26% 70%)` / dark `hsl(30 16% 34%)` | 1.94 : 1 | 2.84 : 1 | calm in both |

So the hardcoded value is *weaker* than the token it should have used in light mode **and** ~4× louder
in dark — the exact inverted-weight signature of a colour chosen against one background only. The
corpus books the dark-mode half as **SE-11** (medium, `raw-findings.json:1637`); the light-mode half
(1.53:1, i.e. weaker than the token, not merely "not a token") is **new here**, and it means the fix is
not cosmetic — the frames are barely visible on the shipped light theme.

**Companion.** All 16 shapes use raw `stroke="red"` / `fill="red"` while the repo owns a house wrapper
for exactly this — `decorative/FourierMorphSvg.vue:22-31` renders a path with
`:style="{ color: strokeColor }"` + `stroke="currentColor"`, defaulting to **`var(--accent-red)`**
(light `oklch(0.574 0.216 27.5)`, dark `oklch(0.644 0.165 22.9)` — `tokens/color-radius.css:258`,
`tokens/dark-arm.css:111`). Raw `red` is `oklch(0.628 0.258 29.2)`: ~20% more chromatic than the light
token and, unlike the token, it does not lighten for dark. See **S-3** for the part of this that is
*not* a defect.

**Provenance.** `:15,78` + all shape elements `:19-64,82-119` · `tokens/color-radius.css:40,57,258` ·
`tokens/dark-arm.css:42,111` · `decorative/FourierMorphSvg.vue:22-31` · `raw-findings.json` SE-11.

**Falsify me.** Recompute either ratio from the cited token lines and get a different number.

---

### D-11 · MINOR · A declared scroll affordance that can never engage

**Claim.** `:129-137` declares `max-height: 300px; overflow: auto` on the `<pre>` — a 300px scrolling
log. It never happens. `:178` is `JSON.stringify(output)` with **no space argument**, so the payload is
a **single line**; `<pre>`'s `white-space: pre` never wraps it. The element's height is therefore ~1
line forever, `max-height` is inert, and `overflow:auto` yields a *horizontal* scroller instead —
visible in `shape-extractor-1440x900.png`, where the JSON runs off the right edge mid-number
(`…,[156.1999969482422,9`).

The result is the least readable presentation of the data the page exists to produce: ~16 contours ×
up to 128 samples × 2 floats, at full float precision, on one line, at 12px, with no wrap, no copy
button, and no selection affordance beyond a horizontal drag.

**Density inversion (folds into D-12).** `font-size: 0.75rem` resolves against the **root**, which
`style.css:40-49` sets to 18px below 768px and 16px at ≥768px ⇒ **13.5px on mobile, 12px on desktop**.

**Provenance.** `:129-137,178` · `style.css:40-49` · capture.

**Falsify me.** Any wrapping rule on this `<pre>` in the served cascade, or a spacer argument at `:178`.

---

### D-12 · MINOR · Every dimension in the file is 12.5% **larger** on mobile than on desktop

**Claim.** The component's five inline styles express every dimension in `rem` (`padding: 2rem`,
`gap: 2rem`, `margin: 2rem 0`, `margin-top: 1rem`, `font-size: 0.75rem`), and `rem` resolves against the
root, which the app **inverts** for small screens (`style.css:40-49`: 1.125rem/18px below 768px,
1rem/16px above). ⇒ on the *smallest* viewport the chrome is the *largest*: padding 36px vs 32px, gap
36px vs 32px, `<pre>` text 13.5px vs 12px.

That inversion is a global decision (and defensible for *prose* legibility), but this component is
100% `rem` chrome and 0% prose, so it inherits the cost with none of the benefit — and it is the
proximate cause of D-1's 508px: at the desktop root the same layout would need 464px, still over 375
but by 89px instead of 133px.

**Provenance.** `:2,5,129-137` · `style.css:40-49`.

**Falsify me.** Show a `rem`-independent dimension in the file, or a different root size below 768px.

---

### D-13 · MINOR · At the installed pin the button's press-scale is **not** neutralised under `prefers-reduced-motion` (producer-side, surfaced here)

**Claim.** The page authors zero motion, so its entire motion contract is the Button's. At glass-ui
4.0.0 that contract leaks.

**Chain (all four links verified):**
1. The 4.0.0 CVA base string includes the Tailwind utility **`active:scale-(--scale-press-btn)`**
   (`dist/button-BNDWhAZb.js`, the `cva(…)` base).
2. The PRM neutraliser is `.tap-squish:active { scale: 1 }` inside
   `@media (prefers-reduced-motion: reduce)` at `dist/styles/utilities/base.css:273-278`, and that file
   opens `@layer components` at `:43`.
3. The utility is emitted **unlayered**: `dist/styles/components.css` contains
   `.active\:scale-\(--scale-press-btn\):active{scale:var(--scale-press-btn)}` and the file has **no
   `@layer` at all** (regex scan → zero matches); `index.css:201` imports it with no `layer()`.
   (The `@source "../*.js"` backstop at `index.css:222` would additionally regenerate the same utility
   in the consumer's own `@layer utilities` — which also outranks `components`.)
4. Unlayered normal declarations beat every layer; `@layer utilities` beats `@layer components`.
   ⇒ **under either path the press scale wins and the PRM reset loses.**

**Direction of the uplift.** 7.0.0 removes the inline utility entirely — its host class list is
`cn("button tap-squish focus-ring", …)` (`glass-ui/src/components/button/Button.vue:66-73`) and press is
driven by `useLiquidPress` (`src/composables/motion/spring/useLiquidPress.ts:15,154` — "PRM-INSTANT",
`respectReducedMotion` snaps the value), with the specular seam PRM-aware too
(`src/composables/glass/useSpecularTracking.ts:23`). **The uplift fixes this.** Booked here so F.W1
gets the credit and the census gets the row.

**Provenance.** installed `dist/button-BNDWhAZb.js` · `dist/styles/utilities/base.css:43,258-278` ·
`dist/styles/components.css` (unlayered) · `dist/styles/index.css:201,222` · `style.css:3` (imported
with no `layer()`) · producer `Button.vue:66-73`, `useLiquidPress.ts:15,154`, `useSpecularTracking.ts:23`.

**Falsify me.** Wrap glass-ui's `components.css` in a layer at or below `components`, or read a
computed `scale: 1` on `#extract-btn:active` under emulated `prefers-reduced-motion: reduce`. Either
kills D-13. **UNPROVEN-NEEDS-LIVE (SS-13)** for the readback; the cascade derivation is complete.

---

### D-14 · MINOR · The drawn subjects collide with each other — measured, not eyeballed

**Claim.** The two illustrations are assembled from magic coordinates with nothing governing their
placement, and four collisions are numerically demonstrable:

1. **Sparkle-on-dot, exact co-location.** `wobbleDiamond(55, 170, 5, 9, 30)` (`:162`) is centred on
   **(55, 170)** — the identical centre as the tiny dot `<circle cx="55" cy="170" r="2.5">` (`:64`).
   The dot is drawn *inside* the diamond. Visible in the crop of `shape-extractor-1440x900.png` at the
   sun box's lower-left.
2. **Second sparkle-on-dot.** `wobbleDiamond(35, 40, 6, 10, 10)` (`:160`) vs `<circle cx="30" cy="45" r="2">`
   (`:63`) — centres 7.1px apart, dot radius 2 against a diamond half-width 6 ⇒ the dot sits on the
   diamond's stroke.
3. **Ray valley inside the disc stroke.** Recomputing `generateSunRays(42)` from the installed
   generator: the 20 vertices have radii 46.98 … 96.66 from (100,100). The disc is `r="48"` with
   `stroke-width="3"` (`:27-34`) ⇒ its stroke band is **[46.5, 49.5]**, and **1 of the 20 ray vertices
   (r = 46.98) lands inside it** — that valley is drawn on top of the circle.
4. **Spiral terminus fused to the disc.** The last cubic of `:37` is `C96,56 126,56 138,76` from
   (80,76); its maximum radius is **44.9** at t = 1. With `stroke-width="3"` on both, the spiral's outer
   stroke edge is at 46.4 and the disc's inner edge at 46.5 — **0.1px of clearance**, i.e. at any real
   rasterisation they fuse into one thick blot (visible at 1–2 o'clock in the capture).

For a tool whose output is *contours*, (3) and (4) also mean two shapes that read as one line are
emitted as two independent contours — the picture and the data disagree.

**Provenance.** `:27-34,37,63,64,160,162` · `pencil-boil@0.4.1/src/celestial.ts:4-19,45-97` ·
recomputation of `generateSunRays(42)` (radii min 46.98 / max 96.66) · capture crop.

**Falsify me.** Recompute `generateSunRays(42)` and get different radii, or show the diamond/dot
centres differ.

---

### D-15 · INFO · A single-value spacing rhythm, and no measure control

Every gap in the file is **2rem** (`:2` padding, `:5` gap **and** vertical margin) plus one **1rem**
(`:130`). There is no scale, no relationship between the heading and the thing it labels (the h2 sits
`0` from its SVG and 2rem from everything else), and no `max-width`, `margin-inline: auto`, or grid.
On the 1440×900 capture the entire page occupies a **464 × ~470** region in the top-left corner — 10%
of the field — with the `<pre>` line then shooting the full width to the right edge. The composition
reads as an unaligned stack because there is nothing to align to.

**Provenance.** `:2,5,130` · `shape-extractor-1440x900.png`.

### D-16 · INFO · Dead seams and stale prose

- **Three test hooks, zero readers.** `id="extract-btn"` (`:125`), `id="output"` (`:130`), and
  `(window as any).__fourierShapeData` (`:180`, with the comment "Also put it on window for Playwright
  to access"). `grep -rn "__fourierShapeData\|extract-btn" /Users/mkbabb/Programming/fourier-analysis`
  outside this file and the audit docs → **zero**. The only spec that visits the route
  (`visual-baseline.spec.ts:36`) screenshots it and reads `documentElement.scrollWidth`. The corpus
  books the global as **SE-05** and notes 0 e2e readers; re-verified at HEAD, still 0. Both `id`s are
  also document-global, so a second mount would collide.
- **A comment whose arithmetic contradicts its own call.** `:150` —
  `// Use seed 42 for canonical shapes (first frame = seed * 100 + 42 = 42)` — sits directly above
  `generateSunRays(42)` (`:151`). `seed * 100 + 42 = 42` holds only for `seed = 0`, and
  `grep -rn "\* 100 +" web/src` returns **exactly one hit: this comment**. It names a frame-seed
  convention that exists nowhere in the tree (checked `pencil-boil/src/vue.ts`'s `useLineBoil`
  scheduler and `decorative/SvgFilters.vue`).
- **Half the generator's design is computed and discarded.** `generateSunRays` returns
  `{ outerPoly, innerPoly }` (`celestial.ts:45,93-96`); `:151` keeps the whole object and the template
  binds only `sunRayPoints.outerPoly` (`:20`). The sun's inner ray band — the generator's second,
  offset ray outline — is computed on every evaluation and never drawn, so the "canonical sun" is half
  the shape its own generator describes.

---

## §4 · Superlatives (L-18 runs both ways)

### S-1 · The seed-42 shape canon **survives** the pencil-boil uplift — verified by diff, not assumed

`lane-frontend.md:481` books the peer-floor bump (`pencil-boil` 0.4.1 installed → glass-ui 7.0
optional-peers `^0.11.2`) and names `FourierShapeExtractor.vue:144` as one of its sites. The obvious
worry — a bumped seeded RNG silently re-rolls this page's "canonical shapes" and every downstream
contour — **is false**:

```
$ diff -u web/node_modules/@mkbabb/pencil-boil/src/random.ts   /Users/mkbabb/Programming/pencil-boil/src/random.ts
(empty — byte-identical mulberry32)
$ diff -u web/node_modules/@mkbabb/pencil-boil/src/celestial.ts /Users/mkbabb/Programming/pencil-boil/src/celestial.ts
-import { mulberry32 } from './random';
+import { mulberry32 } from './random.js';        ← the ONLY difference in 97 lines
$ grep -n "generateSunRays\|wobbleDiamond\|wobbleStarPolygon" /Users/mkbabb/Programming/pencil-boil/src/index.ts
17: export { wobbleDiamond, wobbleStarPolygon, generateSunRays } from './celestial.js';
```

Producer version is **0.12.0**, above the `^0.11.2` floor. Identical PRNG, identical generators,
identical export surface ⇒ **the canon is bit-stable across the uplift.** This is worth banking
positively because it is the *only* dependency in this component's uplift path that carries no risk,
and F.W1 can drop it from the risk register with a citation instead of a re-baseline.

**Falsifier.** Any diff in `mulberry32` or in the three generators. Applied: empty.

### S-2 · The seed-42 sun fits its viewBox with real clearance

`outerR = 75 + rng() * 25` (`celestial.ts:57`) can reach 100 — the exact half-extent of the 200×200
viewBox — so with `stroke-width="3"` a bad seed would spill and clip. Recomputing the actual seed:
**max vertex radius 96.66**, x ∈ [20.1, 187.5], y ∈ [10.9, 179.2]; **no vertex within 1.5px (the stroke
half-width) of any edge.** The chosen seed is not merely arbitrary — it is a fitting one, and the
capture confirms uncut ray tips. (Fragility noted, not banked: the fit is a property of `42`, not of
the code.)

**Falsifier.** Recompute `generateSunRays(42)` and find a vertex outside [1.5, 198.5]. Applied: none.

### S-3 · The untokenised `red` **passes** WCAG 1.4.11 in **both** modes — the prior audits' framing is wrong on this point

`#FF0000` (Y = 0.2126) against the light page (Y = 0.9522) = **3.82 : 1**; against the dark page
(Y = 0.00308) = **4.95 : 1**. The non-text contrast threshold is **3 : 1**. So the red strokes — the
loudest "this is unstyled" signal on the page — are *conformant graphics in both themes*.
`DA-design-A4-equation-morph-chrome.md:36` characterises the surface as "hardcoded `stroke="red"` …
zero theme awareness … reads as unstyled on the dark shell", which is true as *register* criticism and
false if read as an accessibility failing. D-10 is therefore a **token-discipline** finding, not an
a11y one, and F.W-frontend should not budget it as a contrast fix.

**Falsifier.** Recompute either ratio from `tokens/color-radius.css:40` / `tokens/dark-arm.css:42`.

### S-4 · The page's single control has a conformant, token-driven focus indicator — for free

Because A.W3 migrated this call site from a native `<button>` to glass-ui's `<Button>`
(`docs/tranches/A/audit/W3-button-ledger.md:41` books exactly this line), the control inherits
`.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill);
box-shadow: var(--focus-ring-shadow) }` (`dist/styles/utilities/base.css:174-178`) plus
`disabled:` handling and `whitespace-nowrap` from the CVA base. In a 191-line file that names **zero**
tokens and ships **zero** CSS, keyboard focus is nonetheless correct and theme-aware. It is the single
strongest argument in this component for the glass-first precept: the one thing it adopted is the one
thing it got right.

**Falsifier.** Show the focus ring failing to paint on `#extract-btn`, or a local rule overriding it
(the file has no CSS).

### S-5 · The harness costs a chunk, not a payload

`router/index.ts:114` imports the component through `() => import(…)` like every other route, so the
prod cost of shipping this debug surface is one lazily-fetched chunk that no user path reaches — not
main-bundle weight. `r2-fourier-A-refinement.md:111` warns it "ships unstyled to mobile production
users" and `DA-design-A4-equation-morph-chrome.md:52` conditions on "if kept in the prod bundle";
both over-read the cost. **The correct complaint is D-9's (governance/brand-surface), not payload** —
and F.W-frontend should not spend a performance budget line on it.

**Falsifier.** A static (non-dynamic) import of this component anywhere in the graph. `grep -rn
"FourierShapeExtractor" web/src` → one hit, the dynamic import at `router/index.ts:114`.

---

## §5 · Hypotheses that died to their own falsifiers

Recorded so the next seat does not re-spend them:

1. **"The pencil-boil bump re-rolls the shapes."** Dead — S-1 (byte-identical PRNG + generators).
2. **"The sun's rays clip the viewBox."** Dead — S-2 (max radius 96.66 of 100, ≥1.5px clearance).
3. **"`stroke="red"` is a contrast failure."** Dead — S-3 (3.82:1 / 4.95:1, both ≥ 3:1).
4. **"The unstyled route is a production payload cost."** Dead — S-5 (lazy chunk, no static importer).
5. **"The headings are browser defaults / lack the app's serif face"** (the corpus's SE-06/SE-14).
   Dead — D-4 (preflight flattens size *and* weight; the family is inherited and identical to every
   other page). The defect is real; the two published diagnoses of it are not.

---

## §6 · The old-pin ledger for THIS component (4.0.0 installed · 7.0.0 producer)

This component touches **one** glass-ui subpath (`./button`) and **zero** members of the census break
surface — no `metric-badge` (7 files elsewhere), no `hover-card`/`hover-popover` (2+2 elsewhere), no
dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1), no `ToastVariant`
(`lane-frontend.md:471-479`, `CENSUS-2026-08-03.md:102-106`). Its exposure is entirely through the
Button and through the **shell cascade** — which is precisely why it is a useful instrument.

| Seam | at 3.1.0 (the record) | at 4.0.0 (installed, in-flight) | at 7.0.0 (producer) | verdict |
|---|---|---|---|---|
| `<Button variant="default">` fill | opaque `--primary` pill, **label invisible** (D-5) | `glass-wash btn-glass text-foreground` — translucent, `--foreground` label | **`variant` prop deleted**; renders `emphasis="secondary"` and leaks `variant`/`size` as DOM attributes | 4.0 **improves**; 7.0 **breaks** (D-2) |
| `size="default"` | valid | valid (`ButtonVariants['size']`) | **not a `ButtonSize`** (`xs\|sm\|md\|lg`) — typecheck break | 7.0 **breaks** (D-2) |
| Button press under PRM | — | **leaks** (unlayered utility beats the layered reset) | PRM-aware `useLiquidPress` | 7.0 **improves** (D-13) |
| Loading/disabled state | absent | absent | `loading` prop ships | 7.0 **improves** — the D-6 loading state becomes expressible without local state |
| Body typography | Tailwind default serif (≈Georgia) | **Plus Jakarta Sans** via unlayered `body` + `--font-text` | (same register) | 4.0 **already changed the page's voice**, silently (D-3) |
| `pencil-boil` generators | 0.4.1 | 0.4.1 | ^0.11.2 floor, producer 0.12.0 | **no change** — S-1 |
| `#ccc` borders, raw `red`, inline styles, `<pre>` dump | unchanged by any pin | unchanged | unchanged | pin-independent (D-10..D-12) |

**Two asks for F.W1, both citable:**
- **Add the Button row to `lane-frontend.md` §5.** `./button` survives the export-map diff, so the
  break is invisible to the method that produced the table. Rows to add: `variant` → `emphasis`
  (4 `variant="default"` sites, plus a triage of the repo's 121 `variant="…"` attribute occurrences —
  `grep -rhno 'variant="[a-z-]*"' web/src --include='*.vue' | sort | uniq -c` → 49 `ghost`, 29 `outline`,
  14 `standard`, 12 `glass`, 4 `destructive`, 4 `default`, 3 `underline`, 2 `variant`, 1 each
  `sidebar`/`secondary`/`link`/`floating` — an upper bound, since some belong to non-Button primitives),
  `size="default"` → `size="md"` (6 sites, all Buttons — enumerated above), `buttonVariants` export
  removed (0 fourier consumers — safe).
- **Book the two free wins** (`loading`, PRM press) so the uplift's credit side is not empty.

---

## §7 · UNPROVEN-NEEDS-LIVE (the SS-13 ask)

Static analysis is complete for every claim; three need a served frame to close, and **one browser
session at the 4.0.0 pin closes all three**:

1. **D-3** — computed `font-family` + `font-size` on `h1` at `/demo/shape-extractor`. Predicted:
   Plus Jakarta Sans at `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)`.
2. **D-5** — the Button's rendered `textContent` and computed `color`/`background`. Predicted: label
   visible, `glass-wash` surface (the 3.1.0 blank pill cured).
3. **D-13** — computed `scale` on `#extract-btn:active` under emulated
   `prefers-reduced-motion: reduce`. Predicted: `var(--scale-press-btn)` ≠ 1, i.e. the leak is live.

Also worth one axe pass over the route (D-8) — no assertion in the repo has ever run one there.

---

## §8 · Tally

| Severity | ids | n |
|---|---|---|
| BLOCKER | D-1, D-2 | **2** |
| MAJOR | D-3 … D-9 | 7 |
| MINOR | D-10 … D-14 | 5 |
| INFO | D-15, D-16 | 2 |
| **Defects total** | | **16** |
| **Superlatives** | S-1 … S-5 | **5** |

**Corpus contradictions filed:** SE-06 and SE-14 (diagnosis false — D-4), SE-08 (severity and framing —
D-7), `DA-design-A4-equation-morph-chrome.md:36/52` and `r2-fourier-A-refinement.md:111` (payload
framing — S-5; contrast framing — S-3), `lane-frontend.md:450-484` + `CENSUS-2026-08-03.md:102-106`
(break table missing the Button row — D-2).
**Corpus rows folded unchanged:** `lane-frontend.md:174,277,481`; intake **X-2**; SE-02, SE-03, SE-05,
SE-07, SE-11; `raw-findings.json:1527-1528`.
