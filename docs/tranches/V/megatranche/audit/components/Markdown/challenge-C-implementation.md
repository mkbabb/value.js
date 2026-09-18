# CHALLENGE-C — `demo/scenes/about/markdown/Markdown.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, as
declared at spawn. Not an inherited or undeclared seat.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- Spawn HEAD was `c654824e`; the working tree had advanced to `80fc5c40` when this seat
  opened (`git log --oneline -1` → `80fc5c40 docs(V·mega): shell band COMPLETE-TRUE 12/12`).
  `demo/scenes/about/markdown/**` is byte-identical between the two; no source edits land
  from this seat.
- Subject: `Markdown.vue` (408 lines) + `composables/useMarkdownColors.ts` (83) +
  `composables/useMarkdownHighlighting.ts` (93) + `index.ts` (8).
- Live probes written under this directory only: `probe-C1..C12.mjs`; frames under
  `frames/C*.png`. Dev server `http://localhost:9000` (HTTP 200), driven read-only.

**Verdict: DEFECTIVE.** Two BLOCKERs, five MAJORs, four MINORs, one INFO. The strongest is
C-1: a single failed markdown fetch tears down the entire two-pane application, and the
component's own designed "we couldn't find the documentation" fallback is unreachable code.

---

## Scope note on the visual REPORT

The About pane is not a route. `usePaneRouter.ts:89` returns `AboutPane` for the name
`about`, which `rightProps` (`usePaneRouter.ts:148-155`) mounts as the **desktop-right slot
of `/#/`** — captured as `shots/safari-desktop-{light,dark}/picker.png`. I read those.
The markdown body sits below the fold in every one of the 60 captures: the frame stops
inside `ColorNutritionLabel` ("Key Properties"). So this component contributes **zero rows**
to REPORT.md's defect tables — not because it is clean, but because the matrix never
scrolled to it. `REPORT.md:15` (`consoleErrors 1 — /#/: WebGL: context lost`) and the
`/#/: 8` smallTapTargets row belong to the picker and dock, not here. **That is a coverage
gap in the matrix, not a clean bill for this component**, and everything below was found by
driving the live tree instead.

---

## Findings

### C-1 · BLOCKER · A failed doc fetch escalates into an app-wide crash; the component's own error branch is dead code

```
Markdown.vue:55-62
const currentDoc = ref<Awaited<ReturnType<DocModule>> | null>(null);
const isLoading = ref(true);
const loadDocs = async () => {
    isLoading.value = true;
    currentDoc.value = await module();     // ← unguarded
    isLoading.value = false;
};
Markdown.vue:69-71
onMounted(async () => { await loadDocs(); });
```

`module()` is a dynamic `import()` of a network chunk (`AboutPane.vue:82-92`). There is no
`try`/`catch`, no `finally`, no rejection path. Vue routes a rejection thrown from an async
`mounted` hook through `callWithAsyncErrorHandling` to the nearest `onErrorCaptured` —
which is `ErrorBoundary.vue:59`, mounted at `App.vue:50` **around the entire `<main>`
two-pane grid** (`App.vue:47-140`).

Reproduction (`probe-C3.mjs`, `node docs/…/Markdown/probe-C3.mjs abort`):

```
$ node docs/tranches/V/megatranche/audit/components/Markdown/probe-C3.mjs abort
{
  "mode": "abort",
  "state": {
    "aboutCardPresent": false,
    "aboutCardHTMLLen": 24712,
    "tailHTML": "… class=\"lucide lucide-rotate-ccw-icon …\"> Try again</button></div></main>…",
    "trap": { "rejections": [], "errors": [] },
    "skeletons": 0, "mdBody": false, "wrapper": false
  },
  "console": []
}
```

The probe aborts only `/assets/docs/*.md`. `frames/C3-abort.png` is the result: the picker
pane, the About card, the nutrition label, the conversion graph — **all gone**, replaced by
a bare "Try again" button on the raw gradient. One content sub-section's fetch failure
takes the whole tool offline.

And the component *already has* the correct fallback, sitting unreachable:

```
Markdown.vue:19-31
<div v-else>
    <Alert>
        <AlertTitle class="font-display text-heading">Oh snap...</AlertTitle>
        <AlertDescription>
            We couldn't find the documentation for the selected color space.
        </AlertDescription>
    </Alert>
</div>
```

`v-else` requires `!isLoading && !currentDoc`. On rejection, line 61 never executes, so
`isLoading` stays `true` forever *and* the component is destroyed by the boundary before it
could ever re-render. The branch has no reachable input. Probe C3 confirms it: `ohSnap`
never appears, `skeletons: 0` (not even the infinite spinner survives).

**Cure (gestalt, not patch):** the loader must be total.

```ts
const loadDocs = async () => {
    try { currentDoc.value = await module(); }
    catch (e) { currentDoc.value = null; console.warn("[Markdown] doc load failed", e); }
    finally { isLoading.value = false; }
};
```

That single change restores the designed Alert *and* collapses the blast radius from
"both panes" to "one card section".

---

### C-2 · BLOCKER · `content-visibility: auto` makes the About pane's scroll geometry a ~2× lie and slides ~3.9k px of content under the reader

```
Markdown.vue:104-109
.markdown-wrapper :deep(.markdown-body) {
    /* Skip layout/paint for off-screen sections (KaTeX formulas, code blocks) */
    > *:not(:first-child) {
        content-visibility: auto;
        contain-intrinsic-size: auto 200px;
    }
```

This is applied to **every** direct child — measured 33 of 34 (lab doc) and 41 of 42 (hex
doc) — including `<hr>` elements that are 1px tall and `<h3>`s that are 32px tall. Each
off-screen child is assumed to be **200px**.

Chromium (`probe-C9.mjs`, hex doc, 1440×1000):

```
{
  "childCount": 42,
  "top":    { "scrollHeight": 8990, "bodyH": 7724.3 },
  "bottom": { "scrollHeight": 5451, "bodyH": 4185.3 },
  "truth":  { "scrollHeight": 5131, "bodyH": 3864.6 },   ← content-visibility forced visible
  "overstatementPx": 3859.7,
  "overstatementPct": 99.9,
  "kidHeightsAtTop_first12": [32, 136.4, 32, 196, 1, 36, 214.3, 32, 192.4, 32, 248.4, 200]
}
```

The 12th child measures a literal `200` — the placeholder, not the content.
**The document reports itself as 99.9% taller than it is.**

WebKit (`probe-C8.mjs`, hex doc) shows the user-facing consequence — the position of a
fixed target as a function of how far you have scrolled:

| card `scrollTop` | `card.scrollHeight` | offset of the **last `<h2>`** inside the body |
|---:|---:|---:|
| 0 | 9607 | **7988.6** |
| 1000 | 9285 | 7603.4 |
| 2000 | 8542 | 6860.2 |
| 3000 | 6852 | 5170.0 |
| 4000 | 5168 | **3540.2** |

The heading you are scrolling toward **moves 4448.4px back up the document while you scroll
toward it**. The scrollbar thumb grows continuously; the content runs away. WebKit on the
lab doc reproduces the same class at +64.9% (`probe-C5.mjs`: 8023 → 4866). Two engines,
three documents, one mechanism.

The stated justification is also half-void. Line 105 cites "KaTeX formulas, **code
blocks**" — `probe-C7.mjs` censuses **`pre: 0`** across all eleven documents this component
can ever be given (see C-4). There are no code blocks to skip.

**Cure:** delete the blanket rule. If the optimisation is wanted at all, it belongs on the
only genuinely heavy children — the 37 KaTeX display blocks — with a real
`contain-intrinsic-size`, never `auto 200px` applied to `<hr>`.

---

### C-3 · MAJOR · 7 of 18 selectable color spaces render an empty "Detailed Guide"; the "not found" Alert is structurally unreachable

`DISPLAY_COLOR_SPACE_NAMES` = `PICKER_SPACE_NAMES` (17 entries, `picker-color.ts:72-90`)
`+ hex` = **18**. `ColorSpaceSelector.vue:150` iterates it whole
(`const spaceEntries = Object.entries(DISPLAY_COLOR_SPACE_NAMES)`), so all 18 are
selectable — confirmed visually in `frames/C4-docless-space.png` (ProPhoto RGB selected in
both the picker title and the About title).

`AboutPane.vue:79-98` covers **11**:

```ts
type MarkdownSpace = "rgb" | "hex" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "xyz" | "kelvin";
const markdownModules: Record<MarkdownSpace, DocModule> = { … };
const activeMarkdownModule = computed(() =>
    markdownModules[model.value.selectedColorSpace as MarkdownSpace],   // ← the mask
);
```

`probe-C4.mjs`, driving the real About selector:

```
"Display P3":   { "childCount": 1, "childTags": ["H2.font-display"], "sectionText": "Detailed Guide",
                  "sectionHeight": 133.1, "mdWrapper": false, "mdBodyLen": 0, "ohSnap": false }
"Rec. 2020":    { … identical … }
"Jzazbz":       { … identical … }
"sRGB Linear":  { … identical … }
"Adobe RGB":    { … identical … }
"ProPhoto RGB": { … identical … }
```

Six confirmed live (the seventh, ICtCp, mis-clicked in that run; it is the same missing
key by inspection). **133.1px of a heading over nothing.** `<Markdown v-if="activeMarkdownModule">`
(`AboutPane.vue:51`) means the component does not mount at all, so its `v-else` Alert —
written *for exactly this case*, with the copy "We couldn't find the documentation for the
selected color space" — can never render.

The `as MarkdownSpace` cast at `AboutPane.vue:97` is precisely the masking fallback the
no-legacy edict forbids: it converts a compile-time exhaustiveness error into a silent
runtime `undefined`.

**Cure:** `Record<DisplayColorSpace, DocModule | null>` — the compiler then demands a row
for every space and `null` is an explicit authored decision. Widen the prop to
`module: DocModule | null`, delete the `v-if` and the cast, and route `null` to the Alert
the component already owns.

---

### C-4 · MAJOR · 136 of 331 style lines (41%) have no subject in the component's entire input domain; 67 of them are structurally unreachable

The input domain is closed and enumerable: exactly the 11 files in `AboutPane.vue:82-92`.
`probe-C7.mjs` mounts each and censuses the stylesheet's selectors against the real DOM:

```
"aggregateAcrossAll11Docs": {
  "pre": 0, "preCode": 0, "table": 0, "th": 0, "blockquote": 0, "img": 0,
  "taskList": 0, "callout": 0, "dl": 0, "footnotes": 0, "footnoteRef": 0,
  "toc": 0, "h1": 0, "h5": 0, "h6": 0,
  "a": 3, "inlineCodeP": 83, "katexDisplay": 37, "katexInline": 8,
  "hr": 44, "ol": 30, "ul": 37
}
```

Dead ranges in `Markdown.vue`:

| lines | selector | subjects |
|---|---|---:|
| 143-146 | `> h5, > h6` margins | 0 |
| 157-159 | `> h1` | 0 |
| 176-178 | `> h5` | 0 |
| 180-182 | `> h6` | 0 |
| 229-238 | `pre` (+ its AB-3 comment) | 0 |
| 255-260 | `blockquote` | 0 |
| 262-266 | `table` | 0 |
| 268-272 | `th, td` | 0 |
| 274-276 | `th` | 0 |
| 278-283 | `img` | 0 |
| 315-329 | `dl` / `dt` / `dd` | 0 |
| 331-342 | `ul.contains-task-list` | 0 |
| 344-357 | `.callout` | 0 |
| 359-378 | `.footnotes` / `.footnote-ref` / `.footnote-item` | 0 |
| 380-406 | `.toc` (+ its F6 comment) | 0 |

**136 lines of 331 = 41.1%.**

Worse, 67 of those lines can *never* fire. `vite.config.ts:162` is `Markdown({})` — no
`markdownItSetup`, and `package.json:112` lists only `unplugin-vue-markdown@^32.0.0` with
no `markdown-it-*` plugin. Footnotes, definition lists, task lists and TOC are markdown-it
**plugin** syntaxes; without the plugins they cannot be emitted regardless of what the docs
contain. The `.toc` block alone is 27 lines of CSS with a five-line historical comment
explaining a sticky-band bug in an element the pipeline is incapable of producing.

The `pre` rule (234-238) is the sharpest: it exists, it is dead, and its neighbouring
comment (229-233) asserts a build-time highlighting story for code blocks that the corpus
does not contain.

---

### C-5 · MAJOR · a11y — the injected document's heading levels collide with the host outline, in all 11 docs

`probe-C7.mjs` heading sequences (digit = level), per doc:

```
rgb    3323332332332      hex    332333233323332    hsl    33233232332
hsv    3323322233332      hwb    3323222332         lab    3323332332332
lch    33222232332        oklab  3323332332332      oklch  33222233233332
xyz    33222233233332     kelvin 33233222332
```

Every document opens `3, 3, 2` — an `<h3>` followed later by a jump **up** to `<h2>`.
`probe-C5.mjs` reads the enclosing card outline:

```
"cardHeadingSeq": [
  "H3:About the color spaces",  "H2:Basic Information", "H2:Components",
  "H2:Key Properties", "H2:Conversion Graph", "H2:Usage",
  "H2:Detailed Guide",          ← the host heading for this component
  "H3:Attributes", "H3:Historical Context",
  "H2:Key Characteristics",     ← now a SIBLING of "Detailed Guide", not a child
  "H3:Advantages", …
]
```

Two separate failures: the card's own title is an `<h3>` while its sections are `<h2>`
(the outline opens at level 3 and rises to level 2), and the injected document's `<h2>`s
escape the "Detailed Guide" section entirely — a screen-reader rotor shows "Key
Characteristics", "Color Model", "Color Conversions", "Applications" as peers of "Detailed
Guide", so the guide appears to contain only two subsections. WCAG 1.3.1; axe
`heading-order`.

`Markdown.vue` is the injection point and does nothing to reconcile absolute markdown
levels with its host depth.

**Cure:** offset heading levels at render (a markdown-it heading rule / `headingLevelOffset`
in the plugin config), so the doc's top level lands one below the host heading — one
change, all 11 docs, all future docs.

---

### C-6 · MAJOR · a11y — the async swap is silent, and `<mark>` is used purely as a paint device

**Silent swap.** `probe-C5.mjs`:

```
"wrapperAttrs": ["data-v-b622b24b", "class=markdown-wrapper", "style=--md-color-h2: …"],
"wrapperAriaBusy": null
```

No `role`, no `aria-busy`, no `aria-live`. The loading branch (`Markdown.vue:3-9`) is three
bare `<Skeleton>`s — `Skeleton` is a straight re-export of the glass-ui primitive
(`demo/ui/skeleton/index.ts:1`) and the call sites pass no a11y props. Content arrives and
replaces the skeleton with nothing announced, and it happens again on **every** space
switch because `AboutPane.vue:52` forces a remount with `:key="model.selectedColorSpace"`.
WCAG 4.1.3.

**`<mark>` abuse.** `useMarkdownHighlighting.ts:55-57` creates `<mark class="cs-name">`, and
`Markdown.vue:185-189` immediately nulls the element's only visual affordance:

```css
mark.cs-name {
    background: transparent;
    color: var(--md-color-accent);
    font-weight: 600;
}
```

Measured (`probe-C5.mjs`): `bg: "rgba(0, 0, 0, 0)"`, `hasLabel: false`. The element was
chosen for colour, not semantics — the stylesheet says so. Meanwhile VoiceOver and NVDA
announce `<mark>` boundaries. Per-doc counts (`probe-C7.mjs`): kelvin 3, hsl 4, lch 4,
hwb 5, oklab 6, oklch 7, rgb 9, lab 9, hsv 11, hex 15, **xyz 16** — up to sixteen spurious
"highlight … end highlight" interruptions per document, none of which carries information.

**Cure:** `role="status" aria-busy` on the loading branch, `aria-live="polite"` on the
wrapper; and `<span class="cs-name">` instead of `<mark>` — the CSS rule is unchanged except
for the selector, and the deliberately-transparent background disappears with it.

---

### C-7 · MAJOR · test truth — the highlighting subsystem has zero tests; here is the exact mutation that keeps every gate green

```
$ grep -rln "useMarkdownHighlighting\|useMarkdownColors\|highlightColorSpaceName" test/ e2e/ demo/
demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts
demo/scenes/about/markdown/Markdown.vue
demo/scenes/about/markdown/composables/useMarkdownColors.ts
```

Only the sources. **No test file anywhere references either composable.** The sole e2e that
touches the component is `e2e/smoke/oracles/o18-contrast-census.spec.ts:745-777`, which
asserts prose and code **contrast ratios**; `o10d-display-voice-census.spec.ts` mentions
markdown only inside a comment (`:22`).

**Vacuous-gate mutation #1** — add one line at `useMarkdownHighlighting.ts:10`:

```ts
function highlightColorSpaceName(container, colorSpaceName) {
    return;                      // ← every mark in the app disappears
    if (!container || !colorSpaceName) return;
```

o18 still passes (it censuses `p` and `p > code`, never `mark`). o10d still passes. vitest
has no test to fail. The whole feature can be silently deleted and the suite stays green.

**Vacuous-gate mutation #2** — delete the two `pattern.lastIndex = 0` statements at
`useMarkdownHighlighting.ts:35` and `:37`. That reintroduces verbatim the stateful-regex bug
the comment at `:31-34` documents as previously shipped ("design-docs-about.md P3" — a
`g`-flagged pattern leaving a stale offset that skips the next text node's first match).
Zero gate response. A bug this codebase has already shipped once has no regression test.

**Bonus vacuity:** o18's `about-code` selector is
`".markdown-wrapper .markdown-body pre code, .markdown-wrapper .markdown-body p > code"`.
`pre code` matches **0** elements across all 11 docs (probe-C7). Half that selector is
decoration, and the test's `if (code)` skip-if-absent guard means a future doc losing all
inline code would silently zero the assertion.

**Cure:** a vitest file for `highlightColorSpaceName` over a jsdom fixture — regex
metacharacter escaping, the two `lastIndex` resets, multi-match splitting within one text
node, `pre`/`code`/`mark`/`.katex` exclusion, and idempotence on re-entry. It must go RED
under mutation #1.

---

### C-8 · MINOR · `module` and `colorSpaceName` are not reactive; correctness is delegated to an undocumented caller obligation

`loadDocs` is called from exactly one place — `onMounted` (`Markdown.vue:69-71`). There is
no `watch(() => module, …)`. A `module` prop change is ignored: the component keeps
rendering the first document forever.

`applyHighlighting` runs only in `onUpdated` (`Markdown.vue:73-75`), and
`highlightColorSpaceName` early-returns whenever *any* mark already exists:

```
useMarkdownHighlighting.ts:14-15
/* Skip if already highlighted */
if (body.querySelector("mark.cs-name")) return;
```

so a `colorSpaceName` change can never re-mark either. Both props are threaded as **getters**
(`Markdown.vue:52-53`), which advertises reactivity the component does not implement.

Both are masked solely by `:key="model.selectedColorSpace"` at `AboutPane.vue:52`. Remove
that one attribute and the pane shows the wrong document with the wrong highlights — a
correctness invariant that lives in the caller and is written down nowhere.

*Label: LATENT — the mechanism is static-verified; there is no live reproduction while the
sole caller supplies the key.*

**Cure:** `watch(() => module, loadDocs, { immediate: true })` replacing `onMounted`, and a
`watch` on `[markdownContent, () => colorSpaceName]` replacing `onUpdated`. The `:key` in
AboutPane then becomes redundant rather than load-bearing.

---

### C-9 · MINOR · the component runtime-imports the app's global CSS foundation

```
Markdown.vue:37-38
import "../../../styles/foundation.css";
import "../../../styles/utils.css";
```

`App.vue:199-200` already imports both. Grepping `demo/` for these two paths returns
**Markdown.vue as the only non-root component with a runtime `import`** — every other
component (ColorPicker, Dock, PaneHeader, AuroraPane, SpectrumCanvas, …) uses the
compile-time `@reference` directive inside `<style>`, which is a Tailwind resolution hint,
not a stylesheet load. A leaf scene component is asserting ownership of the application's
global CSS foundation. Vite dedupes by module id so nothing breaks today, but the ownership
inversion is real and it is exactly what makes the style block below feel free to grow.

---

### C-10 · MINOR · three `throw`s on the render path, inside a `computed` bound to `:style`

`useMarkdownColors.ts:27-42` — `mdColorVars` is a `computed`, bound at `Markdown.vue:15`
(`:style="mdColorVars"`), and it throws on three conditions (`:33`, `:37`, `:41`). A throw
from a render-path computed lands in the same App-wide `ErrorBoundary` proven by C-1 — it
would take down both panes, not just the markdown.

**Reachability today: NOT reachable.** `cssColor` is machine-serialised:
`useColorPipeline.ts:102` → `serializePickerColor` → `picker-color.ts:206-211`, which
converts non-CSS spaces to `oklch` before serialising. `probe-C6.mjs` drove eight malformed
colors through the shareable-URL vector (`#/?space=oklch&color=…`):

```
oklch(none 0.2 30)           → PAGEERROR color_missing_channel  (app never mounts; upstream)
oklch(0.6 none 30)           → PAGEERROR color_missing_channel
oklch(0.6 0.2 none)          → PAGEERROR color_missing_channel
oklch(none none none)        → PAGEERROR color_missing_channel
color(display-p3 none .5 .5) → "[useColorUrl] Invalid color in URL" + fallback; markdown renders
lab(none 20 30)              → "[useColorUrl] Invalid color in URL" + fallback
oklch(NaN 0.2 30)            → "[useColorUrl] Invalid color in URL" + fallback; markdown renders
oklch(1e400 0.2 30)          → "[useColorUrl] Invalid color in URL" + fallback; markdown renders
```

In no case did the composable's guards fire — the pipeline rejects upstream.
*Label: LATENT, mechanism-only.* (The first four rows are a real BLOCKER-class white-screen,
but it is `useColorUrl`/`useColorPipeline`'s, not this component's — recorded here as a
cross-reference for whoever owns that seat.)

**Cure:** a render-path computed must be total. Return `{}` and `console.warn`; never throw.

---

### C-11 · MINOR · duplicated selector block, dead assignment, unreachable guard

- **Duplicate block.** `Markdown.vue:104` and `:198` declare the *identical* selector
  `.markdown-wrapper :deep(.markdown-body)`. Two blocks that must be kept in sync, with the
  second silently winning any property they ever come to share. There is no reason for the
  split — the first holds headings/paragraphs, the second everything else.
- **Dead assignment.** `Markdown.vue:59` `isLoading.value = true` — the ref initialises to
  `true` at `:56` and `loadDocs` is invoked exactly once.
- **Unreachable guard.** `Markdown.vue:64-67` — `markdownContent`'s
  `if (!currentDoc.value) return null` can never be taken: the template only evaluates
  `<component :is="markdownContent" />` inside `v-else-if="currentDoc"` (`:15-17`). The whole
  computed is a rename of `currentDoc.value.default`.

---

### C-12 · INFO · `any` in the public type of the only required prop

```
index.ts:3
export type DocModule = () => Promise<{ default: any }>;
```

A `strict: true` repo with `verbatimModuleSyntax` carries an untyped `any` in the contract
of this component's one required prop. `<component :is>` accepts it without a murmur.
`Component` from `vue` is the correct type.

---

## Proven negatives

Evidence law cuts both ways; these hypotheses were tested and **disproved**.

| hypothesis | result | evidence |
|---|---|---|
| PRM-RAF / leaked listeners / observers / timers | **none exist** | `grep -n "addEventListener\|requestAnimationFrame\|setInterval\|setTimeout\|ResizeObserver\|IntersectionObserver\|MutationObserver\|onUnmounted\|onBeforeUnmount"` over `Markdown.vue` + both composables → no matches |
| `onUpdated`-driven highlight churns per reactive tick | **it does not** | `probe-C5.mjs` counts `document.createTreeWalker` (called from exactly one site in the app's markdown path): `walkAfterBoot: 1`, then 12 live color changes via the picker sliders (`sliderCount: 4`) → `walkAfterColorChanges: 1`. The `mark.cs-name` early-return holds. |
| direct DOM mutation corrupts the tree Vue owns | **it does not** | `probe-C12.mjs`, 6 space switches lab→OKLCh→Lab→XYZ→Lab→HSL→Lab: `wrappers` stayed 1, `bodies` stayed 1, mark counts returned exactly to their per-doc values every time (lab 9 / 4041 chars, three separate visits), `seamDupes: []` on every step |
| the `.markdown-body` rule at line 98 is dead (no `:deep()`) | **it is LIVE** | `probe-C7.mjs` `bodyAttrs: ["data-v-b622b24b", "class"]` on all 11 docs — the compiled doc root does carry the parent scope id, exactly as the comment at `:85-91` claims |
| `parsed.diagnostics[0].code` can throw on an empty diagnostics array | **it cannot** | `src/css/types.ts:25-27` — the failure arm is `readonly [ParseIssue, ...ParseIssue[]]`, a non-empty tuple |
| `defineModel` stale-read hazard | **N/A** | no `defineModel` in this component |
| `ValueUnit` nesting accumulation | **N/A** | nothing here wraps a `ValueUnit` |
| reka-ui slider pointer-capture leak | **N/A** | no sliders |
| eager WebGL on the critical path | **N/A** | no WebGL |
| a long skeleton window on space switch | **not observed** | `probe-C8.mjs` sampled the section at 25ms granularity from t=370ms after the click; `body: true, skeleton: false` at every sample. The chunk is warm in dev; the code path exists but I have no measurement of it and do not claim one. |

---

## Is this a god module? — the honest answer, and a split that is L-1 completable

**Not a god *script* module.** The `<script setup>` is 43 lines and does four things, all of
them this component's business: load a doc, expose it, compute ink vars, re-mark on update.

**It is a global content stylesheet wearing a component's name.**

```
$ awk 'NR<=32{t++} NR>=34&&NR<=76{s++} NR>=78{c++} END{print t,s,c}' Markdown.vue
32 43 331          # template / script / style
```

**331 of 408 lines (81.1%) are `<style scoped>`** — the 3rd-largest `.vue` file in the
non-shadcn demo tree (`App.vue` 417, `ColorPicker.vue` 414, this 408). And *every rule that
targets an element inside the compiled document* — lines 104 through 407 — reaches out
through `:deep()`. Scoping is inert for 100% of them. The only genuinely scoped rule is the
three-declaration `.markdown-body` block at 98-102.

That is the tell. A stylesheet that must escape its own scope for every content rule is a
global stylesheet, and `demo/styles/` — which already holds `foundation.css`,
`animations.css`, `hljs.css`, `shell.css`, `utils.css`, `focus-ring.css` — is where it
belongs. No new directory, no new wrapper component, no shared/ invention: the destination
already exists and already holds a sibling markdown-adjacent sheet (`hljs.css`).

### Proposed waves — each closeable in one session on its own measured evidence

**W-MD-1 · containment.** C-1 + C-3. `try/catch/finally` in `loadDocs`; widen `module` to
`DocModule | null`; make `markdownModules` a `Record<DisplayColorSpace, DocModule | null>`
so the compiler demands all 18 rows; delete the `v-if` and the `as MarkdownSpace` cast.
*Gate:* re-run `probe-C3.mjs abort` → `.vj-error-boundary` absent, `aboutCardPresent: true`,
"Oh snap" present, the picker still mounted; re-run `probe-C4.mjs` → all 7 doc-less spaces
report the Alert, none reports `childCount: 1`.

**W-MD-2 · geometry.** C-2. Retire the blanket `content-visibility`; if kept at all, scope
it to `> div.inline-block:has(> .katex-display)` with a measured intrinsic size.
*Gate:* `probe-C9.mjs` `overstatementPct ≤ 2`; `probe-C8.mjs` `lastH2OffsetInBody` constant
within ±2px across all nine scroll stops.

**W-MD-3 · stylesheet transposition.** C-4 + C-9 + C-11. Move lines 78-408 to
`demo/styles/markdown.css`, rooted on `.markdown-body` with no `:deep()` and no duplicate
block; delete the 136 measured-dead lines; delete the two runtime CSS imports at 37-38.
*Gate:* a computed-style diff across 11 docs × {light, dark} × the 12 selectors that
actually have subjects, byte-identical before/after (probe-C7 and probe-C11 already emit
exactly this shape). Markdown.vue lands at **~77 lines**.

**W-MD-4 · a11y.** C-5 + C-6. `role="status"`/`aria-busy` on the loading branch,
`aria-live="polite"` on the wrapper; `<mark>` → `<span class="cs-name">`; heading-level
offset at the markdown-it render rule.
*Gate:* axe `heading-order` clean on `/#/`; `probe-C5.mjs` `wrapperAriaBusy` non-null;
`probe-C7.mjs` heading sequences never rise above the host level.

**W-MD-5 · gate truth.** C-7. A vitest suite for `highlightColorSpaceName`.
*Gate:* the suite is RED under `return;` at `useMarkdownHighlighting.ts:10` and RED under
deletion of either `pattern.lastIndex = 0`.

Each is a single concern with a single measured close condition and no dependency on the
others except W-MD-3 following W-MD-2 (so the dead `content-visibility` is not carried into
the new file). None is a refactor arc wearing a wave's name.

---

## Artefacts

All under `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/Markdown/`:

| file | what it establishes |
|---|---|
| `probe-C1.mjs` | baseline: the doc mounts, 9 marks, ink vars painted |
| `probe-C2.mjs` | first (mis-scoped) error probe — superseded by C3 |
| `probe-C3.mjs` | **C-1**: chunk abort → App-wide ErrorBoundary; `frames/C3-abort.png` |
| `probe-C4.mjs` | **C-3**: 6 doc-less spaces → `childCount: 1`; `frames/C4-docless-space.png` |
| `probe-C5.mjs` | **C-2** (WebKit/lab), **C-6**, **C-5**, and the churn negative |
| `probe-C6.mjs` | **C-10** reachability: 8 malformed URL colors, none reaches the composable |
| `probe-C7.mjs` | **C-4** + **C-5**: the 11-doc live element census and heading sequences |
| `probe-C8.mjs` | **C-2**: the last-`<h2>` drift table (WebKit, hex) |
| `probe-C9.mjs` | **C-2**: Chromium +99.9% overstatement + the literal 200px placeholder |
| `probe-C10.mjs` / `probe-C11.mjs` | frames + ink readback, light and dark |
| `probe-C12.mjs` | the DOM-mutation-integrity negative across 6 space switches |

---
---

# SECOND SEAT — independent CHALLENGE-C pass

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, as declared at
spawn. Not an inherited or undeclared seat.

This is a **second, independently-run CHALLENGE-C seat** on the same component. I was spawned
against `c654824e`; the tree had advanced to `fe8785e5` when I opened
(`fe8785e5 docs(megatranche): bank the consumer CRUD and Goldilocks DAG audit`).
`demo/scenes/about/markdown/**` is byte-identical across `c654824e`, `80fc5c40` and `fe8785e5`.

I found the first seat's report already on disk after completing my own probes. **I have not
overwritten it.** Its findings are correct, its evidence is stronger than mine on four axes, and
destroying it to install a near-duplicate would lose evidence for no gain. What follows is only
(a) independent corroboration where two seats measured the same thing separately, (b) findings
the first seat did not make, (c) one finding the first seat explicitly declined to claim which I
was able to measure, and (d) a retraction of one of my own claims that the first seat's
source-reading disproves.

My probes are under the session scratchpad, not this directory (they were written before I saw
the first seat's artefacts): `md-challenge-c-probe.mjs`, `md-c-probe3.mjs`, `md-c-probe4.mjs`,
`md-c-probe5.mjs`, `md-c-probe6.mjs`, `md-p3-empty.png`.

---

## Independent corroboration

Two seats, separately written probes, same live tree. Where the numbers agree exactly, the
finding is no longer a single measurement.

| claim | first seat (`probe-C7.mjs`) | this seat (`md-c-probe5.mjs`) | agree |
|---|---:|---:|:--:|
| `pre` across all 11 docs | 0 | 0 | ✅ |
| `table` / `th` / `td` | 0 | 0 / 0 / 0 | ✅ |
| `blockquote` | 0 | 0 | ✅ |
| `img` | 0 | 0 | ✅ |
| `dl` / `dt` / `dd` | 0 | 0 / 0 / 0 | ✅ |
| task lists | 0 | 0 | ✅ |
| `.callout` | 0 | 0 | ✅ |
| `.footnotes` / `.footnote-ref` / `.footnote-item` | 0 | 0 / 0 / 0 | ✅ |
| `.toc` | 0 | 0 | ✅ |
| `> h1` / `> h4` / `> h5` / `> h6` | 0 / — / 0 / 0 | 0 / 0 / 0 / 0 | ✅ |
| `a` | 3 | 3 | ✅ |
| `p > code` | 83 | 83 | ✅ |
| KaTeX display boxes | 37 | 37 | ✅ |
| `hr` | 44 | 44 | ✅ |
| `ol` | 30 | 30 | ✅ |
| `ul` | 37 | 39 | ~ |

The single divergence (`ul` 37 vs 39) is a selector-scope difference — I counted all `ul`
descendants, the first seat's census excludes two nested lists. Immaterial.

I also independently reproduced, by separate script:

- **C-3 (7 doc-less spaces).** Selecting **Display P3** yields
  `sectionHTML: "<h2 class=\"font-display text-title mb-phi-3\">Detailed Guide</h2><!--v-if-->"`,
  `sectionChildCount: 1`, `markdownWrapperPresent: false`, `ohSnapPresent: false`. Screenshot:
  `md-p3-empty.png`. I enumerated the selector's live option list at **18 rows** and confirmed the
  7 uncovered keys are `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`,
  `ictcp`, `jzazbz` — including the **ICtCp** row the first seat mis-clicked and left inferred.
  That row is now measured, not inspected.
- **C-5 (heading collision).** `.about-card` sequence measured
  `H3` (pane title) → `H2`×5 → `H2:Detailed Guide` → `H3:Attributes` → `H3:Historical Context` →
  `H2:Key Characteristics` → … , with `docH2Count: 4` per doc. Source-side cross-check:
  `grep -oE "^#{1,6} " assets/docs/*.md` emits only `##` and `###` — zero `#` in all 11 files.
- **C-6 (silent swap).** `wrapperRole: null`, `wrapperAriaLabelledby: null`, `wrapperAriaBusy:
  null`, `landmarkAncestors: ["MAIN"]`, `guideH2HasId: false`. The last one is new: even if a
  seat wanted to add `aria-labelledby`, the host heading has no `id` to point at.
- **C-4's structural half.** Verified `vite.config.ts:162` is `Markdown({})` and `package.json:112`
  carries `unplugin-vue-markdown@^32.0.0` with no `markdown-it-*` dependency. The first seat's
  "67 lines structurally unreachable" claim holds.

---

## Retraction of one of my own claims

I initially recorded that `useMarkdownColors.ts:33`'s `parsed.diagnostics[0].code` could throw a
`TypeError` on an empty diagnostics array. **That is wrong.** `src/css/types.ts:26-27` types the
failure arm as `readonly [ParseIssue, ...ParseIssue[]]` — a non-empty tuple. The first seat's
proven-negatives table already had this right. Withdrawn.

---

## New findings

### C-13 · MAJOR — the skeleton reserves 199px for a 5 887px document, and its shape is a copy-pasted avatar stub

The first seat's proven-negatives table records, honestly:

> a long skeleton window on space switch — **not observed** … The chunk is warm in dev; the code
> path exists but I have no measurement of it and do not claim one.

I was able to force the window open and measure it. `md-c-probe3.mjs` PROBE B holds
`assets/docs/lab.md` for 5 s with a `page.route` delay handler, then samples the Detailed Guide
section's height in both phases:

```json
DURING skeleton: { "phase": "skeleton", "sectionH": 199 }
AFTER  content:  { "sectionH": 6036, "bodyH": 5887 }
```

**A 5 837px layout shift inside an `overflow-y: auto` card** (`AboutPane.vue:4`). Anything the
reader has scrolled to below the Detailed Guide is thrown 5 837px up the instant the doc resolves.

The shape is separately wrong. `Markdown.vue:3-9`:

```
<div v-if="isLoading" class="flex items-center space-x-4 h-full">
    <Skeleton surface="glass" variant="shimmer" class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
        <Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
        <Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
```

One 48×48 **circle** and two 16px bars — the stock shadcn `Skeleton` demo (an avatar plus two
comment lines), verbatim, in a prose surface that renders 5 headings, 4 rules, 24 list items and
4 KaTeX blocks. There is no avatar anywhere in this component's output. The DOM dump from the
skeleton phase confirms the primitives carry `aria-hidden="true"`, so the placeholder is both
visually and semantically nothing.

This interacts with C-2: `content-visibility` inflates the *post*-load geometry by ~100%, and the
skeleton understates the *pre*-load geometry by ~30×. The two defects push the scroll position in
opposite directions across the same swap.

**Cure.** The reservation must derive from the content, not from a demo snippet: reserve the last
known body height (or a per-doc constant), and replace the avatar+2-lines with a heading bar plus
N paragraph runs. The circle should never have shipped here.

*Note for W-MD-2: the first seat's gate (`overstatementPct ≤ 2`) does not catch this, because the
skeleton phase is not sampled. Add the two-phase height sample to that wave's close condition.*

---

### C-14 · MAJOR — `currentDoc = ref()` deep-proxies the compiled SFC and destroys component identity

`Markdown.vue:55`:

```
const currentDoc = ref<Awaited<ReturnType<DocModule>> | null>(null);
```

`ref()` calls `reactive()` on any plain object assigned to it. A compiled SFC module is
`{ default: { __name, setup, render, __scopeId, … } }` — a plain object — so Vue walks it and
returns a **proxy of the component definition**, which `markdownContent` (`:64-67`) then hands to
`<component :is>` at `:16`.

Measured against Vue's own reactivity (`npx tsx`, simulating the exact assignment shape):

```
ref()      -> module isProxy: true  | .default isProxy: true | .default isReactive: true
shallowRef -> module isProxy: false | .default isProxy: false
identity preserved with ref()?   false
identity preserved with shallow? true
```

Identity is **broken**: the object reaching `<component :is>` is `!==` the module's real export.
`<component :is>` keys component resolution, `keep-alive` caching and HMR on definition identity.
Every property access on the definition during patch also traverses a Proxy trap, and reactive
tracking is installed on `render`, `setup` and the compiled static VNode trees — which are exactly
the objects Vue's fast paths assume are raw.

This is the repo's own standing edict 7 — *`shallowRef` where deep reactivity is wrong* — and the
miss is isolated: the same file uses `useTemplateRef` (`:50`) and reactive props destructure
(`:44`) correctly.

**Cure.** `shallowRef`. There is no consumer of deep reactivity here: the only read is
`currentDoc.value.default`, and `markdownContent` already re-derives on ref replacement. One word.

*Fits W-MD-1 (containment) — same function, same edit site as the `try/catch/finally`.*

---

### C-15 · MINOR — `parseCssColor` still throws a raw `TypeError`, re-confirmed at `fe8785e5`

The first seat's C-10 correctly establishes that the three `throw`s in `useMarkdownColors` are on
the render path and currently unreachable. It did not test the parser itself. Measured
(`npx tsx`, importing `./src/css/index.ts` directly):

```
"oklch()"               => THREW TypeError Cannot read properties of undefined (reading 'replace')
""                      => ok= false  diagLen= 1
"not-a-color"           => ok= false  diagLen= 1
"oklch(none none none)" => ok= true
"rgb(0 0 0 / NaN)"      => ok= false  diagLen= 1
```

`parseCssColor("oklch()")` **throws instead of returning `{ ok: false }`** — the R1 shipping-crash
class from `apotheosis/parser-proof/GATE-VERDICT.md`, still live at `fe8785e5`.
`useMarkdownColors.ts:32` calls it bare, with no `try`. So the composable's total-function
contract is broken one level deeper than the first seat's C-10 found: even making
`mdColorVars` return `{}` instead of throwing would not make it total, because the call itself can
throw before any guard runs.

This does not change C-10's reachability verdict (the pipeline still serialises upstream), but it
does change C-10's **cure**: `return {}` is insufficient; the call must be wrapped.

---

### C-16 · MAJOR (test truth) — the entire certified-ink apparatus can be replaced by a constant and every gate stays green

The first seat's C-7 gives two vacuous-gate mutations, both against the *highlighting* subsystem.
There is a third, against the *colour* subsystem, and it is worse.

```
$ grep -rn "md-color|markdown-body > h|cs-name" e2e/
(no matches)
```

Nothing anywhere asserts heading ink. `o18-contrast-census.spec.ts:745-777` measures
`.markdown-body p` (which inherits `--foreground`) and `pre code, p > code` — precisely the two
surfaces `useMarkdownColors` does **not** control.

**Vacuous-gate mutation #3.** Replace `color: var(--md-color-h2)` (`Markdown.vue:163`) and
`--md-color-h3` (`:168`, `:173`) with `var(--foreground)`.

**Vacuous-gate mutation #4.** Delete `useMarkdownColors` entirely and drop `:style="mdColorVars"`
from `:15`. Its only other consumers are `mark.cs-name` (`:187`) and `hr` (`:312`) — neither
asserted.

Either mutation deletes the whole chain — `parseCssColor` → `convertColor` →
`INK_AMBIENT_KEY` inject → `resolveSurfaceLightnessLive` → `certifyAccentInk` (distance guard +
gamut map + WCAG floor walk, `ink.ts:130-141`) — and **every gate in the repository still passes.**

A certified-ink composable with no gate on its certification is vacuous by construction. This
matters more than mutations #1/#2 because the machinery being protected is the *contrast-safety*
machinery: the one thing a contrast census exists to guarantee is the one thing this contrast
census does not measure.

*W-MD-5 must therefore also carry a heading-ink oracle: for each of the 11 docs, assert
`--md-color-h2` resolves to a value distinct from `--foreground` and clears the text floor against
the live resting-plate ground. That is the same shape as the existing o18 helper and belongs in
the same file.*

---

### C-17 · MINOR — inline code renders at 12px against 16px body copy, 207 times

`Markdown.vue:241` — `code { @apply text-xs font-mono bg-well rounded }`. Measured live:

```json
{ "bodyFontSize": "16px", "inlineCodeFontSize": "12px", "inlineCodeCount": 14 }
```

A 25% size drop mid-sentence on the spans carrying the document's technical payload — channel
names, ranges, CSS function syntax. `text-xs` is the smallest rung in the scale; body copy sits at
`text-base`. Corpus-wide this fires **207 times** (`code` census, above); `p > code` alone is 83.
The neighbouring `p > code` rule at `:249-253` adds padding and accent ink but does not restore
size.

*Belongs in W-MD-3 alongside the transposition — it is a one-token change and the computed-style
diff gate that wave already specifies will catch it.*

---

## Second-seat verdict

**DEFECTIVE — concurring.** The first seat's ranking stands: C-1 (fetch failure → app-wide
teardown) and C-2 (`content-visibility` geometry lie) are the BLOCKERs, and C-3 (7 doc-less
spaces) is the most user-visible defect on the default route.

Net change from this seat: **+2 MAJOR (C-13 skeleton geometry, C-14 `ref()` identity), +1 MAJOR
test-truth (C-16 heading-ink vacuity), +2 MINOR (C-15 parser throw, C-17 12px code), −1 of my own
claims retracted.** One negative the first seat declined to claim (the skeleton window) is now
measured and is a MAJOR.

On the god-module question I concur with the first seat's answer and want to sharpen one point.
The script is not a god module — 43 lines, two composables already extracted. The style block is,
and it is not "several modules wearing one name": it is **one real module (markdown content
typography for 11 enumerable documents) plus one phantom module (a general-purpose markdown
stylesheet for a CMS this project does not have and, per `Markdown({})` with no markdown-it
plugins, cannot have)**. That distinction matters for the cure: a *split* would be contrivance
under edict 3 — three files of which 136 lines are still dead is worse than one, and a
`markdown-tables.css` for zero tables is a wrapper for nothing. The first seat's W-MD-3
(transposition to `demo/styles/markdown.css` **plus deletion of the measured-dead 136**) is
correct precisely because it is subtraction carrying a move, not decomposition.

One addition to W-MD-3's close condition: land the corpus selector-census as a standing oracle,
not just as a one-shot diff. Both seats' probes already emit the exact shape. A gate that fails
when any selector the stylesheet declares has zero matches across all 11 documents is what stops
the phantom module from regrowing — and it is the only one of the five waves whose gate is a
*permanent* guard rather than a one-time before/after comparison.
