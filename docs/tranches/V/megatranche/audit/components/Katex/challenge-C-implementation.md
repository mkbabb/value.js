# CHALLENGE-C — `demo/scenes/about/katex/Katex.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M-context variant), spawned
with an explicit Opus 5 declaration. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Twelve findings, one BLOCKER, five MAJOR. The component is 49 lines of which 21 are
apology-comments for two previously-cured bugs; the 20 lines of live code contain a broken reactive
contract, a masking error fallback with zero test or typecheck coverage behind it, an invalid HTML
content model, and — the strongest — an accessibility defect that makes **every one of the 64
formulas in the corpus announce its own raw LaTeX source to a screen reader on WebKit**, which is
the exact opposite of what the component's own comment at `Katex.vue:34-40` says the MathML layer is
there to do.

Two of the proposed cures were **validated live in real WebKit** (see K-1, K-2).

---

## Subject and its call-site census

| fact | value | evidence |
|---|---|---|
| file | `demo/scenes/about/katex/Katex.vue`, 49 lines (20 live, 21 comment, 8 blank/structural) | `wc -l` |
| barrel | `demo/scenes/about/katex/index.ts` (1 line) | — |
| consumers | **0 inside `demo/`**; 11 markdown SFCs at `assets/docs/*.md:2` | `grep -rn 'from "./katex"' demo` → exit 1 |
| `<Katex>` tags | **64** across 11 docs | `grep -o "<Katex" assets/docs/*.md \| wc -l` → `64` |
| display mode | **37** (the `displayMode = true` default) | 64 − 27 |
| inline mode | **27** (`:display-mode="false"`) | `grep -o ':display-mode="false"' assets/docs/*.md \| wc -l` → `27` |
| katex | `0.16.47` | `node -e "require('katex/package.json').version"` |
| tests | **zero** | `grep -rniI katex test/ demo/test/ e2e/` → exit 1, no output |
| typechecked call sites | **zero of 64** | `vue-tsc -p tsconfig.demo.json --listFilesOnly \| grep -c assets/docs` → `0` |

Route reached: the About pane is the **default right pane on `/#/`** (`demo/shell/viewSchema.ts:107`
`right: "about"`), so this component is on the home route's first render, not behind navigation.

---

## Findings

### K-1 · BLOCKER — On WebKit the raw LaTeX source is inside the accessible name of every formula

`Katex.vue:41` sets `output: "htmlAndMathml"`. The comment at `:34-40` states the MathML layer
"remains for the accessibility tree (hidden by the same stylesheet — `.katex-mathml { clip;
position: absolute }`)". KaTeX's MathML layer is `<semantics><mrow>…</mrow><annotation
encoding="application/x-tex">RAW TEX</annotation></semantics>`. **Chromium's UA MathML stylesheet
gives that `<annotation>` `display: none`; WebKit's does not** — it computes `display: block` with
zero height inside the 1px-clipped `.katex-mathml`, which is precisely the "visually hidden but
exposed to assistive tech" pattern. The raw TeX therefore lands in the accessible name.

Measured, live, both engines (`probes/KTX-probe7.mjs`):

```
=== webkit ===
{ "annotationDisplay": "block", "annotationVisible": false, "mathDisplay": "block" }
ariaSnapshot: "- math: \"f ( t ) = { t 3 t > ϵ κ t + 16 116 otherwise f(t) = \\begin{cases} \\sqrt[3]{t} & t > \\epsilon \\\\ \\frac{\\kappa\\, t + 16}{116} & \\text{otherwise} \\end{cases}\""
aria contains raw TeX: true

=== chromium ===
{ "annotationDisplay": "none", "annotationVisible": false, "mathDisplay": "block math" }
ariaSnapshot: "- math: \"f ( t ) = { t 3 t > ϵ κ t + 16 116 otherwise\""
aria contains raw TeX: false
```

A VoiceOver user on Safari hears the formula, then hears it **again** as "f open paren t close paren
equals backslash begin brace cases…". 64 formulas × 11 documents. Under the repo's own S-22
Safari-truth law this is the primary engine, and the component's comment at `:38-40` explicitly
flags "WebKit's MathML-Core is the least mature, an S-22 (Safari-truth) risk" — the risk was named
and then shipped unmeasured.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/Katex/probes/KTX-probe7.mjs`
(dev server on :9000; loads `/#/`, scrolls the first display formula into view, takes
`locator.ariaSnapshot()` in webkit and chromium).

**Mechanism.** A vendor option chosen for accessibility, whose accessibility behaviour was never
measured on the declared target engine. The component trusts a third-party stylesheet to hide a
node that the third-party stylesheet does not hide.

**Cure — VALIDATED LIVE.** One rule alongside the existing global katex stylesheet import
(`Katex.vue:20`), or in `demo/styles/`:

```css
.katex-mathml annotation { display: none; }
```

`probes/KTX-cure.mjs`, real WebKit, injected at runtime with `page.addStyleTag`:

```
BEFORE:        "- math: \"f ( t ) = { … otherwise f(t) = \\begin{cases} \\sqrt[3]{t} …\""
AFTER css cure: "- math: \"f ( t ) = { t 3 t > ϵ κ t + 16 116 otherwise\""
still contains raw TeX: false
```

---

### K-2 · MAJOR — 19 of 37 display formulas lose content at the mobile pane width, in a scroll container WebKit cannot reach by keyboard

`Katex.vue:2` renders `<div class="inline-block">`. `Markdown.vue:301-306` then reaches in with
`> div.inline-block:has(> .katex-display) { display: block; @apply overflow-x-auto; }`. The result
is a horizontal scroll container with `tabindex = -1`, no `role`, no `aria-label`.

Measured **live in real WebKit** at 1440×900 (`probes/KTX-probe5.mjs webkit`), after
`scrollIntoView` (see the measurement trap below):

```
{ "expr": "L^* = 116\\, f\\!\\left(\\frac{Y}{Y_n}\\right",  "sw": 778, "cw": 462, "hidden": 316, "tabIndex": -1 }
{ "expr": "X = X_n \\cdot f^{-1}(f_x), \\quad Y = Y_n",      "sw": 505, "cw": 462, "hidden":  43, "tabIndex": -1 }
webkit katex scroller reachable by Tab (90 presses): false
```

Same probe under Chromium:

```
chromium TAB reached the katex scroller at press 17
chromium katex scroller reachable by Tab (90 presses): true
```

Chrome's *keyboard-focusable scrollers* feature silently supplies the affordance the component omits.
**WebKit does not.** 90 Tab presses never land on it. That is a WCAG 2.1.1 (Level A) failure on the
declared truth engine, with measured content loss.

Corpus-wide, rendered in a real browser at the three measured container widths
(`probes/KTX-corpus.mjs`; container widths taken from the live app: 332 px mobile pane, 440 px at
1024, 462 px at 1440):

```
=== container 332px === display formulas: 37, overflowing: 19
   290px hidden  lab.md  L^* = 116\, f\!\left(\frac{Y}{Y_n}\right) - 16
   290px hidden  xyz.md  L^* = 116\, f\!\left(\frac{Y}{Y_n}\right) - 16
   279px hidden  hex.md  R = \frac{\text{parseInt}(h_1 h_2, 16)}{255},
   250px hidden  hsl.md  C = (1 - |2L - 1|) \cdot S, \quad X = C(1 - |(
   145px hidden  hsv.md  V = L + S \cdot \min(L,\; 1 - L), \quad S_V =
   …19 rows total
=== container 440px === overflowing: 9   (max 338px hidden)
=== container 462px === overflowing: 8   (max 316px hidden)
```

The harness is faithful: it predicts 290 px hidden for the lab `L^*` row at 332 px, and the live
mobile probe (`probes/KTX-probe4.mjs`) measured `rootScrollW 622, rootClientW 332, maxScrollLeft 290`
— exact match; it predicts 316 px at 462 px and real WebKit measured 316.

Visual proof: `evidence/E1-mobile-390-formula-clipped.png` — the Lab `L* = 116 f(Y/Yₙ) − 16, a* = 500
[` row is sheared off at the card edge mid-bracket; the `f_z` of the next block is cut in half.

**Measurement trap worth recording.** Naïve probes (`KTX-probe1.mjs`, `KTX-probe3.mjs`) reported
`scrollWidth === clientWidth === 462` for all four formulas — zero overflow. That is false: it is
`content-visibility: auto` (`Markdown.vue:106-109`) skipping layout for the off-screen blocks, so
`scrollWidth` returns the `contain-intrinsic-size` placeholder. Any future gate that measures katex
overflow must `scrollIntoView` first or it will certify a green that is not there.

**Reproduction.** `node …/probes/KTX-probe5.mjs webkit` and `node …/probes/KTX-corpus.mjs`.

**Cure — partially validated.** The component knows `displayMode`; it should own the scroll box
and its a11y contract rather than have a `:has()` selector in another component's scoped stylesheet
decide it:

```vue
<component :is="displayMode ? 'div' : 'span'"
           ref="katexElement"
           :class="displayMode ? 'block overflow-x-auto' : 'inline-block'"
           :tabindex="displayMode ? 0 : undefined"
           :role="displayMode ? 'group' : undefined"
           :aria-label="displayMode ? 'Formula' : undefined" />
```

`probes/KTX-cure.mjs`, real WebKit: with `tabindex="0"` injected, **the scroller is reached at Tab
press 10** (was: unreachable in 90). Honest caveat: in the same headless WebKit run `ArrowRight`
after focus left `scrollLeft` at `0 → 0`, so focusability alone may not be the whole cure under
headless WebKit; the reachability half is proven, the arrow-key-scroll half needs a real Safari
confirmation or an explicit keydown handler.

---

### K-3 · MAJOR — `displayMode` is a render input that nothing watches; the component will not re-render for it

`Katex.vue:48` is `watch(() => expression, renderKatex);`. `renderKatex` consumes **two** props
(`:31-32` — `expression` and `displayMode`). The watcher tracks one.

Reproduction (`probes/KTX-repro.test.ts`, R1, run with `probes/KTX-vitest.config.ts`):

```
✓ KTX repro > R1 — displayMode prop change does NOT re-render (watch only sees `expression`) 13ms
```

The test mounts with `displayMode: true`, asserts `katex-display` present, calls
`setProps({ displayMode: false })`, waits two ticks, and the markup **still contains `katex-display`**.

```bash
npx vitest run --config docs/tranches/V/megatranche/audit/components/Katex/probes/KTX-vitest.config.ts
```

**Live reachability, stated honestly:** all 64 call sites pass a literal, so no consumer flips
`displayMode` today. This is a confirmed broken contract with no current trigger — the defect is the
hand-maintained dependency list, which is wrong the moment a third render input is added and is
exactly what the gestalt cure (below) deletes.

**Mechanism.** Manual dependency tracking in place of derivation. `onMounted` + a partial `watch` is
a hand-rolled `computed`.

---

### K-4 · MAJOR — the root is a `<div>` even for inline math: an invalid content model that a serialize→reparse round-trip destroys

`Katex.vue:2` is unconditionally `<div>`. 27 of the 64 call sites are inline; **8 of those sit inside
a markdown paragraph** (`hex.md:62`, `hsl.md:75` ×2, `kelvin.md:65`, `hwb.md:77` ×2, `lab.md:74` ×2)
and 19 inside list items. HTML Living Standard §4.4.1: the content model of `p` is *phrasing
content*; `div` is flow content and is not permitted.

Live, lab.md at 1440 (`probes/KTX-probe1.mjs`): `"divInsideP": 2, "divInsideLi": 3`, with

```html
<p>where <div class="inline-block"><span class="katex">…
```

The tree exists only because Vue builds it with `createElement`, bypassing the HTML parser. Serialize
it and parse it back (`probes/KTX-reparse.mjs`):

```json
{ "liveTag": "P", "liveChildDivs": 2,
  "reparsed_p_count": 2,
  "reparsed_first_p_html": "<p>where </p>",
  "reparsed_body_children": "P,DIV,DIV,P",
  "reparsed_divInP": 0,
  "li": { "reparsed_divInLi": 1, "liveDivInLi": 1 } }
```

One sentence — "where ε = 216/24389 and κ = 24389/27." — becomes **four sibling blocks**. Any path
that serializes and re-parses (SSR/prerender, an `innerHTML` round-trip, a sanitizer, a paste into a
rich-text target) shreds the paragraph. `<li>` survives (it accepts flow content), so the defect is
the paragraph subset specifically.

**Reproduction.** `node …/probes/KTX-reparse.mjs` (dev server on :9000).

**Mechanism.** The component knows whether it is inline, and refuses to use that knowledge for the
one decision — the element type — that it determines. It then pays for the mistake twice: a
hardcoded `inline-block` utility at `:2` and a `:has()` override in a different file.

**Cure.** Render `<span>` when `!displayMode` (folded into the K-2 cure above). `span > span.katex`
is valid phrasing content, `Markdown.vue:286-289`'s `p div.inline-block:has(> .katex)` patch dies
with it.

---

### K-5 · MAJOR — `throwOnError: false` is a masking fallback with no console signal, no test and no typecheck behind it

`Katex.vue:33`. KaTeX's contract (`node_modules/katex/dist/katex.js:17865-17873`): on a `ParseError`
with `throwOnError` false it returns a `span.katex-error` styled `color:#cc0000` carrying the raw
source, and **logs nothing**.

Reproduction (`probes/KTX-repro.test.ts`, R3 — passes):

```
R3 html: <span class="katex-error" title="ParseError: KaTeX parse error: Unexpected end of input in a macro argument, expected '}' at end of input: \frac{1}" style="color:#cc0000">\frac{1}</span>
R3 console.error calls: 0 warn: 0
```

Now stack the gates behind it:

* `grep -rniI katex test/ demo/test/ e2e/` → **exit 1, no output**. No unit test, no e2e spec.
* `vue-tsc -p tsconfig.demo.json --noEmit --listFilesOnly | grep -c "assets/docs"` → **`0`**
  (`| grep -c "katex/Katex.vue"` → `1`). `tsconfig.demo.json:57` is `"include": ["demo/",
  "src/vite-env.d.ts"]`; the 64 call sites live in `assets/docs/`, outside every typechecked program,
  and vue-tsc does not check `.md` SFCs regardless.
* the visual audit does not cover it: `audit/visual/REPORT.md` enumerates 15 routes and there is no
  `/#/about`; the About pane is the home route's right pane and every home capture
  (`shots/safari-desktop-light/picker.png`, read) stops at the nutrition label, well above the first
  formula.

**Net:** a one-character typo in any of the 11 documents ships to production as red `#cc0000` raw
LaTeX and **nothing anywhere goes red** — not `npm test`, not `npm run typecheck`, not the visual
matrix. This is edict 2 ("no masking fallbacks") with the whole gate stack absent behind it.

**Cure.** Fail loudly in development and quietly-but-observably in production: `throwOnError: false`
is acceptable only if the render is wrapped and a `ParseError` is surfaced (`console.error` +
`import.meta.env.DEV && throw`). Better: a build-time gate — the 64 expressions are static; a vitest
suite that `renderToString`s every `<Katex expression="…">` extracted from `assets/docs/*.md` and
fails on any `katex-error` is ~20 lines and turns the whole class into a compile-time error.
`probes/KTX-corpus.mjs` already contains the extractor.

---

### K-6 · MAJOR — non-`ParseError` throws bypass `throwOnError` *after* the node has already been wiped

`katex.render` (`node_modules/katex/dist/katex.js:17827-17831`):

```js
let render = function (expression, baseNode, options) {
  baseNode.textContent = "";                       // ← wipe happens FIRST
  const node = renderToDomTree(expression, options).toNode();
  baseNode.appendChild(node);
};
```

and `renderError` (`:17865-17867`) **re-throws** anything that is not a `ParseError`, regardless of
`throwOnError`. So a `TypeError` or `RangeError` leaves the element permanently blank *and* throws
into the Vue lifecycle.

Confirmed in node:

```
$ node -e "…"
typo \frac{1}       => OK len 196 [katex-error span]
deep nesting 20000  => THREW RangeError : Maximum call stack size exceeded
undefined expr      => THREW TypeError  : KaTeX can only parse string typed expression
null expr           => THREW TypeError  : KaTeX can only parse string typed expression
```

Confirmed through the component (`probes/KTX-repro.test.ts`, R4/R5 — the two "failing" rows are the
finding: the throw escapes the mount and the watcher):

```
FAIL R4 — TypeError: KaTeX can only parse string typed expression
 ❯ renderKatex demo/scenes/about/katex/Katex.vue:31:15
 ❯ callWithAsyncErrorHandling …/runtime-core.cjs.js:207:17
 ❯ hook.__weh.hook.__weh …/runtime-core.cjs.js:3053:19          ← escapes onMounted

FAIL R5 — RangeError: Maximum call stack size exceeded
[Vue warn]: Unhandled error during execution of watcher callback   ← escapes the watch
```

**Reachability, stated honestly:** the `RangeError` half is a **hypothesis** for the current corpus —
it needs pathological input the 11 static docs do not contain. The `TypeError` half is one authoring
slip away and is *not* caught by any gate (K-5): `<Katex :expression="undefined" />` in a `.md`
typechecks nowhere. Vue emits `[Vue warn]: Invalid prop: type check failed for prop "expression"`
and then calls `katex.render` with it anyway.

**Mechanism.** The component delegates its entire error policy to one vendor flag whose contract it
never read. `throwOnError: false` is not "never throws"; it is "swallows exactly one error class".

**Cure.** Guard at the boundary (`typeof expression === "string"`), and let the gestalt cure below
put the render inside a `computed` where a `try` is natural and the DOM is never left half-wiped.

---

### K-7 · MAJOR — zero tests: the vacuous-gate finding

`grep -rniI "katex" test/ demo/test/ e2e/` returns nothing. `vitest.config.ts:21` includes
`["test/**/*.ts", "demo/test/**/*.ts"]` — neither tree mentions the component. The e2e corpus
(`e2e/smoke/`, 19 specs + subdirs) never opens the About guide; the only About references are
`o11-header-gates.spec.ts:19,133`, which measure *header collision*, not content.

**The exact mutation that keeps every gate green:** delete the entire body of `renderKatex`
(`Katex.vue:29-44`) so the component renders an empty `<div>`. `npm test` passes (nothing mounts it),
`npm run typecheck` passes (no unused-local error; `katexElement` is still referenced by the
template), `npm run lint` passes, and the Safari visual matrix passes (no capture reaches a formula).
Every one of the 64 formulas silently disappears from the product.

A gate that cannot distinguish "renders 64 formulas" from "renders 64 empty divs" is not a gate.

---

### K-8 · MINOR — the component's own layout is decided by a `:has()` selector in another component's scoped stylesheet

`Katex.vue:2` hardcodes `class="inline-block"`. `Markdown.vue:301-306` overrides it back to
`display: block` for display mode, and `:286-289` adds `mx-1` for inline mode — both by matching on
`div.inline-block` plus a `:has()` structure test on KaTeX's *internal* class names
(`.katex-display`, `.katex`).

The comment at `Markdown.vue:291-300` is a 10-line post-mortem of the first time this coupling broke
(`:has(> .katex)` was a direct-child test that never matched, so the scroll container was dead). The
coupling is the defect: **the boolean that decides the layout is a prop of `Katex.vue`, and the
layout is written in `Markdown.vue`, keyed off a vendor's DOM shape.** That is three modules deep for
one `if`.

Edict 5 (root-level styling) and edict 3 (KISS) both point the same way, and the K-2/K-4 cure
resolves all three at once.

---

### K-9 · MINOR — the error surface is theme-blind and hard-coded

KaTeX's default `errorColor` is `#cc0000`, emitted as an inline `style="color:#cc0000"` (K-5 output).
The component does not override it. In the dark theme that is a fixed red on the dark glass card,
outside the token system entirely, with an inline style that no stylesheet can reach without
`!important`. Any error surface must speak the app's ink; see the F7/AB-3 rulings already in the
Markdown record for the same class.

---

### K-10 · INFO — `htmlAndMathml` costs +37 % elements across the corpus (a justified cost, recorded for the budget)

Measured over all 64 extracted expressions:

```
formulas: 64
htmlAndMathml bytes: 309812  elements: 8271
html-only     bytes: 257876  elements: 6037
mathml overhead: bytes +51936 (20.1%), elements +2234 (37.0%)
```

Per formula (the widest lab row, `probes/KTX-repro.test.ts` R6): `235` elements total, `49` in the
MathML subtree.

This is **not** a defect to cure by dropping MathML — MathML is the accessibility layer and dropping
it would trade K-1 for something worse. It is recorded because 8 271 elements enter the DOM on the
home route's default pane, and because the `aria-hidden="true"` HTML layer (confirmed live:
`"htmlLayerAriaHidden": "true"`) is the 186-of-235 majority that exists purely for pixels.

Asset weight on the same path: `katex.min.js` 272 537 B, `katex.min.css` 23 827 B, `dist/fonts/`
1.1 MB / 60 files (20 `.woff2`). Live at 1440 the page requests
`node_modules/.vite/deps/katex.js` and `node_modules/katex/dist/katex.min.css` on first paint of `/#/`
(`probes/KTX-probe3.mjs`, `katex net:` line) — the About pane is the default right slot, so this is
the home route's critical path, not a lazy detour. `document.fonts` shows `KaTeX_Main loading`,
`KaTeX_Math loading`, 18 others `unloaded` — subsetting is working; the JS is not.

### K-11 · INFO — the vendor stylesheet imported at `Katex.vue:20` leaks exactly one global rule

Audited, because a leaf component importing a 231-rule global stylesheet is a leak surface:

```
total selectors: 383
NOT anchored on .katex*: 1  →  ["body"]
```

The single unanchored rule is `body{counter-reset:katexEqnNo mmlEqnNo}` — named counters no other
consumer uses. The other 382 selectors are all anchored on `.katex`/`.katex-display`/`.katex-mathml`.
The generic class names in the file (`base`, `root`, `inner`, `overlay`, `accent`, `tag`, `strut`,
`newline`, `size1`…`size11`) are **all** descendant-scoped and cannot collide. The AB-1 decision at
`:8-20` to move this import script-side is correct and is *not* a finding.

### K-12 · INFO — the component is unreachable from the demo module graph and invisible to the typecheck program

`vue-tsc -p tsconfig.demo.json --listFilesOnly | grep -c "katex/Katex.vue"` → `1` (the component
itself is checked) while `grep -c "assets/docs"` → `0`. Combined with the DEFECT-LEDGER:4099
reachability probe (`Katex.vue` is one of exactly two unreachable `.vue` files in the demo graph),
the component sits in a blind spot of every static gate: reachability says "dead", the typecheck
sees the definition but no use, and the 64 uses are compiled by Vite alone.

This is the *enabling condition* for K-3, K-5, K-6 and K-7 — not a separate bug, but the reason none
of them were caught. It is already ruled KEEP-with-reason
(`excavation/CONTRIVANCE-REGISTER.md:128`, `C-10`), which remains correct; the ruling should carry
the rider that KEEP does not mean UNGATED.

---

## The gestalt cure

The 20 live lines are an imperative re-implementation of `computed` + `v-html`. Every finding except
K-1 and K-9 dissolves in one transposition:

```vue
<template>
    <component
        :is="displayMode ? 'div' : 'span'"
        :class="displayMode ? 'block overflow-x-auto' : 'inline-block'"
        :tabindex="displayMode ? 0 : undefined"
        :role="displayMode ? 'group' : undefined"
        :aria-label="displayMode ? 'Formula' : undefined"
        v-html="html"
    />
</template>

<script setup lang="ts">
import { computed } from "vue";
import katex from "katex";
import "katex/dist/katex.min.css";   // AB-1 — keep the comment, keep the import

const { expression, displayMode = true } = defineProps<{
    expression: string;
    displayMode?: boolean;
}>();

const html = computed(() =>
    katex.renderToString(expression, { displayMode, throwOnError: import.meta.env.DEV, output: "htmlAndMathml" }),
);
</script>
```

What it kills:

* **K-3** — `computed` tracks both props by construction. No watcher, no dependency list to forget.
* **K-4** — the element type follows `displayMode`; `<span>` inside `<p>` is valid phrasing content.
* **K-2** — the scroll box and its `tabindex`/`role`/`aria-label` are owned by the component that
  knows it is a scroll box; `Markdown.vue:286-306` (21 lines of `:has()` patching plus its
  post-mortem comment) can be deleted.
* **K-6** — `renderToString` is pure: a throw leaves the previous DOM intact instead of wiping first.
* **K-8** — one file owns one decision.
* `useTemplateRef`, `onMounted` and `watch` all go; 20 live lines become 8.

`v-html` is safe here: KaTeX with the default `trust: false` escapes its output and refuses
`\href`/`\htmlClass`; `renderToString` is KaTeX's own documented server-side surface. This is the
same shape `Markdown.vue` already uses for compiled content.

Then, orthogonally: **K-1** needs the one CSS rule (validated), **K-5/K-7** need the corpus test, and
**K-9** needs the error ink tokenized.

---

## Negative results — what I checked and found sound

Recorded so a later seat does not re-spend the probes:

* **No leaked listeners, observers, rAF loops or timers.** The component registers none;
  `katex.render` is synchronous DOM construction. The PRM-RAF epidemic does not touch this file.
* **No `defineModel` stale-read hazard.** No `defineModel`, no two-way binding, no local cache needed.
* **No `ValueUnit` nesting, no oklch→HSV hue drift, no reka-ui pointer capture, no WebGL.** None of the
  repo's five known local hazards are present in this file. (The one console error in the visual
  REPORT — `safari-desktop-light /#/: WebGL: context lost.` — is the blob's, not this component's.)
* **No XSS.** `trust` defaults false; `\href`, `\url`, `\htmlClass`, `\htmlId` are all refused. The
  expressions are repo-authored statics, and the proposed `v-html` cure does not change this.
* **The stylesheet import at `:20` is correct** and its 21 lines of AB-1 commentary describe a real
  cure; the CSS is live (`getComputedStyle(".katex .mord").fontFamily` → `KaTeX_Main, "Times New
  Roman", serif`) and the MathML layer is properly hidden visually
  (`position: absolute`, 1×1 px) with `.katex-html[aria-hidden=true]`.
* **The `<li>` case of K-4 is fine** — `li` accepts flow content; the re-parse round-trip preserves
  `li > div` (`reparsed_divInLi: 1`).
* **Empty expression is safe** — `katex.renderToString("")` returns a valid 258-byte empty katex span.
* **Vue 3.5 idioms are correct** — `useTemplateRef` (`:27`), reactive props destructure with a default
  (`:22`). `verbatimModuleSyntax` is satisfied: all three imports are value imports; there is no
  type-only import to mark.
* **No god module, no legacy shim, no back-compat alias, no new `shared/` directory, no glass-ui
  bypass** — edicts 1, 2 (aliases half), 3, 4, 6 are clean. `Katex.vue` declares no animation.

---

## Probe inventory

All under `docs/tranches/V/megatranche/audit/components/Katex/probes/`. All read-only; **no source
file was edited by this seat.**

| probe | what it decides |
|---|---|
| `KTX-repro.test.ts` + `KTX-vitest.config.ts` | K-3, K-5, K-6, K-10 — mounted-component reproductions. Run: `npx vitest run --config docs/tranches/V/megatranche/audit/components/Katex/probes/KTX-vitest.config.ts` |
| `KTX-probe1.mjs` | live DOM census at 1440: 9 roots, `divInsideP: 2`, `divInsideLi: 3`, stylesheet liveness, MathML hiding |
| `KTX-probe3.mjs` | 1440 / 1024 / 390 sweep; inline `display` resolution; the katex network requests on the home critical path |
| `KTX-probe4.mjs` | mobile 390 geometry — `scrollWidth 622 / clientWidth 332 / maxScrollLeft 290`; produced `evidence/E1` |
| `KTX-probe5.mjs <engine>` | the K-2 core: post-`scrollIntoView` overflow + the 90-press Tab walk. `webkit` → unreachable; `chromium` → press 17 |
| `KTX-probe7.mjs` | the K-1 core: `annotation` computed display + `ariaSnapshot` in both engines |
| `KTX-cure.mjs` | cure validation in real WebKit for K-1 (CSS) and K-2 (tabindex) |
| `KTX-corpus.mjs` | extracts all 64 expressions from `assets/docs/*.md` and measures overflow at 332/440/462 px |
| `KTX-reparse.mjs` | the K-4 serialize→reparse proof: `P,DIV,DIV,P` |

Evidence images under `evidence/`: `E1-mobile-390-formula-clipped.png`.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| K-1 | **BLOCKER** | WebKit puts the raw LaTeX source in the accessible name of all 64 formulas; cure validated |
| K-2 | MAJOR | 19/37 display formulas lose content at 332 px in a scroller WebKit cannot Tab to (Chromium can) |
| K-3 | MAJOR | `displayMode` is a render input no watcher tracks |
| K-4 | MAJOR | `<div>` root inside `<p>` × 8 call sites; a reparse splits one sentence into four blocks |
| K-5 | MAJOR | `throwOnError: false` masks parse failures with no console, no test, no typecheck behind it |
| K-6 | MAJOR | non-`ParseError` throws escape the flag *after* the node is wiped, into `onMounted`/watcher |
| K-7 | MAJOR | zero tests; gutting `renderKatex` keeps every gate green |
| K-8 | MINOR | this component's layout is decided by a `:has()` rule in `Markdown.vue` |
| K-9 | MINOR | `#cc0000` error ink, inline-styled, theme-blind |
| K-10 | INFO | `htmlAndMathml` = +37 % elements / +20 % bytes corpus-wide; 272 KB JS on the home critical path |
| K-11 | INFO | the vendor stylesheet leaks exactly one global rule (`body{counter-reset}`); everything else is scoped |
| K-12 | INFO | unreachable from the demo graph and absent from the typecheck program — the enabling condition for K-3/5/6/7 |
