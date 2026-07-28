# CHALLENGE-L — PaletteCard: the library structure underneath (pass 4)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `7775473b` (task named
  `c654824e`; the tree advanced by docs-only commits — no file in this component's cone differs)
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` (364 L) + its five folder
  siblings + `card/composables/` (4 modules) + the two `card/` siblings they consume
- Design system under test: `@mkbabb/glass-ui@7.0.0`, read from the installed tree
- Live probes: dev server `http://localhost:9000`, Playwright/WebKit, read-only except
  `localStorage` seeding in an isolated browser profile
- Owner marks in scope: **MT-F036** (`OM-11-palette-card-shadow-artifacts.png`,
  `OM-12-palette-card-shadow-artifact-closeup.png`) — read, root-caused, and dispositioned in §7
- Verdict: **DEFECTIVE** — **1 new BLOCKER (reproduced live), 4 new MAJOR, 3 new MINOR**

### Supersession notice — nothing lost

Three CHALLENGE-L reports have occupied this path. All are preserved verbatim:

- `challenge-L-library.pass-1-2026-07-24.md` — L-1..L-14
- `challenge-L-library.pass-2-2026-07-27.md` — L-15..L-24
- `challenge-L-library.pass-3-2026-07-27.md` — L-25..L-33

Pass 4 numbers from **L-34**. It does not re-derive their evidence; §6 re-verifies their dockets.
Where pass 4 lands on ground a prior pass touched, the section says so explicitly and states what is
new.

---

## 0. What pass 4 went at

Three questions no prior pass asked:

1. **Is the seam real?** Every prior pass reasoned about "the barrel seam" as if it were enforced.
   Nobody ran the linter. I ran it. It is not enforced — the rule's file globs address a directory
   tree deleted three waves ago.
2. **Does the card touch the library it exists to demonstrate?** Nobody counted the edges. The
   answer is **zero**, and the one module in the whole palettes feature that *is* a real value.js
   consumer is the module the application does not load.
3. **What does the wrong-home export actually emit?** Pass 2 found the dual path and named the
   winner. Nobody drove it with adversarial input. I did. It injects.

Two more come from the owner's new marks (MT-F036), which postdate pass 3: the **faceted shadow
slab** and the **absent hover register**. Both are measured here, and both root-cause into the
producer, not into this file — which is exactly the disposition the owner ordered.

---

## L-34 · BLOCKER (new, reproduced live) — the card's Export→SVG writes attacker-controlled markup into a downloadable document, because the escaping implementation lives in the module the app does not load

### The two homes

The concept *"serialize a palette to a document"* has two implementations in this repository:

| | live (wired to PaletteCard's menu) | contracted (app-dead) |
|---|---|---|
| module | `demo/palettes/export.ts` (132 L) | `demo/palettes/export/` (12 files) |
| reached by | `usePaletteExport.ts:9` → `BrowsePane.vue:198`, `PalettesPane.vue:152` | **nothing but `demo/test/export/byte-exact.test.ts:23`** |
| colour spelling | raw `c.css` pass-through | `canonicalColor()` (`export/canonical.ts:28`) |
| XML escaping | **none** | `xmlEscape()` (`export/canonical.ts:39`) |
| PNG encoder | `<img>` → canvas → `toBlob` (`export.ts:84-116`) | deterministic, `import { oklch, toRgba8 } from "@mkbabb/value.js/color"` (`export/png.ts:11`) |
| governed by | nothing | `docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51 |

`export/serializers.ts:6-9` admits the split in its own header:

> This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`.

Consumer census:

```
$ grep -rn "usePaletteExport\|export/serializers" demo --include="*.ts" --include="*.vue"
demo/palettes/BrowsePane.vue:198:import { usePaletteExport } from "./usePaletteExport";
demo/palettes/PalettesPane.vue:152:import { usePaletteExport } from "./usePaletteExport";
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

Two app consumers of the legacy path. **Zero app consumers of the contracted path.**

### The reproduction

`export.ts:60-82` builds SVG by string interpolation with no escaper on either axis:

```ts
(c, i) => `  <rect … fill="${c.css}" />`,          // export.ts:66-67  — colour string, unescaped
`  <text …>${palette.name}</text>`,                 // export.ts:73     — palette NAME, unescaped
```

The palette name is set by **PaletteCard's own Rename action** (`PaletteCard.vue:298` →
`PaletteRenameInput.vue`). The colour string arrives from the browse feed for any remote palette.

Probe: `probe-L4b.mjs` (seeds one palette, then drives PaletteCard's menu → Export → SVG Swatch on
the running dev server; the downloaded file is read back verbatim).

Seed:

```js
name  = 'Ridge</text><rect x="0" y="0" width="999" height="999" fill="#f0f"/><text>'
color = '#ff6b6b" onload="0'
```

Measured output (`evidence/L4b-ridge-text-rect-….svg`, full file):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="110" viewBox="0 0 120 110">
  <rect x="0" y="0" width="60" height="80" fill="#ff6b6b" onload="0" />
  <rect x="60" y="0" width="60" height="80" fill="#123456" />
  <text … fill="#333">Ridge</text><rect x="0" y="0" width="999" height="999" fill="#f0f"/><text></text>
</svg>
```

```json
{ "escaped": false, "injectedElementCount": 3, "rawColorAttrPresent": true }
```

Two independent breakouts in one document: the colour string escaped its `fill` attribute and became
an **`onload` attribute** on a rendered element; the name escaped its text node and injected a
full-canvas `<rect>`. A standalone `.svg` is an active document — this is a delivered payload, not a
cosmetic glitch.

### Why this is a library-structure finding and not merely a bug

The correct implementation **already exists, is already correct, and is already tested**:

```ts
// demo/palettes/export/svg.ts:16,19
`  <title id="title">${xmlEscape(snapshot.displayName)}</title>\n`
out += `  <rect x="${i}" … fill="${xmlEscape(canonicalColor(color))}"/>\n`;
```

```ts
// demo/test/export/byte-exact.test.ts:187
it("escapes the display name and never renders text/font/script", () => { … })
```

**That test is green. It is a green gate over code the application does not load.** The suite proves
a property the shipped product does not have. That is the structural defect: *unique semantic
ownership* is violated, the wrong home won the wiring, and the test suite's greenness now
actively conceals it.

This is pass-2 **L-18**'s dual path, escalated: L-18 established *which* path is wired; L-34
establishes *what the wired path emits* and *that the unwired path is the one the contract, the
tests and the library all live in*.

**Cure (architectural transposition, not a patch).** Delete `demo/palettes/export.ts` and
`usePaletteExport.ts` outright. Rename `export/serializers.ts` → `export/index.ts` (the header's
stated reason for the odd name dies with the legacy module). Route the card's five export actions
through the contracted serializers. Do **not** add an escaper to `export.ts` — that would preserve
two homes for one concept, which is the actual defect.

---

## L-35 · MAJOR (new) — the card's clipboard is the *third* palette→text implementation, and the whole card cone has **zero** edges to `@mkbabb/value.js`

`PaletteCard.vue:294`:

```ts
copyAll: () => void writeClipboard(props.palette.colors.map((c) => c.css).join(", ")),
```

That is a third serialization of "this palette as text", sitting on the **same dropdown** as the
Export items (L-34's path 2) while the contract's `canonicalColor` (path 3) is unreachable. Three
spellings of one concept, two of them reachable from one menu, all three disagreeing on output.

The library edge census is the sharper half of this finding:

```
$ grep -rn "@mkbabb/value.js" demo/palettes/browser/card/
(no matches)

$ grep -rln "@mkbabb/value.js" demo/palettes/
demo/palettes/export/png.ts
demo/palettes/mix.ts
```

- The **entire card cone** — six SFCs, four composables, two `card/` siblings — imports the
  published library **zero times**.
- The palettes feature has exactly **two** library consumers, and one of them (`export/png.ts:11`,
  `import { oklch, toRgba8 } from "@mkbabb/value.js/color"`) is inside L-34's dead branch.

So the feature's *only* export-path library edge is in the module the app does not load, and the
shipped PNG encoder is instead a `<img>`→canvas→`toBlob` rasterization (`export.ts:84-116`) whose
output depends on the user agent's SVG renderer.

`T.W1`'s stated keystone is that the demo is the library's dogfood surface (`vite.config.ts:60-64`).
The flagship palette surface does not dogfood: every colour string it holds, copies, or exports is
an opaque `string` that never passes through `parseCssColor`/`serializeCssColor`. On the *public
surface* question this seat is charged with: there is no incorrect deep import to report, because
there is no import at all. That is a worse answer than a deep-path violation — a deep import would
at least be evidence the API is exercised.

**Cure.** `PaletteColor.css` stops being `string`. The palette store parses on ingest through
`@mkbabb/value.js/css` and holds a parsed colour; clipboard, export and swatch rendering all
serialize from that one representation through the contracted facility. One parse, one
serialization, one home.

---

## L-36 · MAJOR (new; owner mark MT-F036, hover half) — the interaction register the root claims is *measurably* absent, and the producer's own typing says it was never there

`PaletteCard.vue:7-15` is the recorded rationale for the current root:

```
// T.W5-R4 (T-14 / D7): the producer CARTOON REGISTER — the
// `cartoon-surface` atom owns the hover/press choreography
// (translate/scale on --ease-cartoon-punch @ --duration-normal,
// shadow bezier md→lg, :active squash, 2px border) …
// The hand-rolled shadow-only hover on the dead 150ms default (F1/F3) is retired.
```

**The whole of `cartoon-surface` in glass-ui 7.0.0** —
`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css:1`:

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

Three declarations. No `:hover`, no `:active`, no `transition`. And there is no attribute-keyed
companion:

```
$ grep -rno "data-cartoon" node_modules/@mkbabb/glass-ui/dist/**/*.css
(no matches)
```

The producer's own typed documentation states the intent
(`dist/components/card/Card.vue.d.ts`):

```ts
/** Static Memphis edge treatment; it does not add command behavior. */
cartoon?: boolean;
```

**Measured on the live card** (`probe-L4.mjs` §A, `/#/palettes`, two seeded palettes, WebKit,
computed style read at rest, during `hover()`, and during a held `mousedown`):

```json
"hoverDelta": {},
"pressDelta": { "scale": { "rest": "none", "press": "1.0091 0.9512" } },
"groupHoverRulesLoaded": []
```

**Zero** computed-style properties change on hover — box-shadow, translate, scale, transform,
border-colour, background, filter and opacity are all byte-identical at rest and on hover. The press
squash exists only because `useLiquidPress` writes an inline `scale` from JS; nothing in the cascade
participates.

This is the measured form of pass-3 **L-27** (which established from source that `Card`'s comment is
counter-factual). What is new here is (a) the measurement, (b) that it is now an **owner mark
ORDERED FIXED**, and (c) the corollary in L-37.

**Disposition — this is a BJ ask, not a local patch.** The owner's standing law: the hover register
is designed at the glass/card root; a missing glass variant becomes a marked ask. The ask is stated
verbatim in §7.

---

## L-37 · MINOR (new, corollary of L-36) — `group` on the card root is a dead marker class

`PaletteCard.vue:19` opens the class expression with `group`. Tailwind's `group` is a *hook*: it
does nothing unless some descendant carries a `group-*` variant.

```
$ grep -rn "group-hover\|group/" demo/palettes/browser/card/
(no matches)
```

Measured in the running document (49 stylesheets, recursive through `@layer`/`@media`):

```json
"groupHoverRulesLoaded": []
```

Not one `.group…hover` rule is loaded anywhere in the app. `group` is residue of the
"hand-rolled shadow-only hover" the comment on line 11 says was retired — the retirement deleted the
rules and left the hook. Under edict 2 (no legacy) this is a one-token deletion; it is filed because
it is the visible tombstone of L-36's regression, and because its presence makes the class list read
as though a hover register exists.

---

## L-38 · MAJOR (new; owner mark MT-F036, shadow half) — the faceted slab is three zero-blur producer shadow layers, painted by a class the demo hand-rolls outside the primitive that compensates for it

Measured resolved `box-shadow` on the live card root (`probe-L4.mjs` §A):

```
oklab(0.28 0.01676 0.024882 / 0.32) -3px 3px 0px 0px,
oklab(0.28 0.01676 0.024882 / 0.26) -5px 5px 0px 0px,
oklab(0.28 0.01676 0.024882 / 0.18) -7px 7px 0px 0px
```

Three layers, **blur radius `0px`**, offsets `-3/-5/-7 px`, alphas `.32/.26/.18`. Three hard-edged
translated copies of the card's silhouette, stepped — that is precisely the "hard-edged faceted
shadow slab" in `OM-11` and, at 1:1, the stepped down-left corner in `OM-12`.

The token is **producer property**, not demo CSS (`dist/styles/tokens/shadow.css`):

```css
--shadow-cartoon-md: -3px 3px 0 var(--cartoon-ink-lead),
                     -5px 5px 0 var(--cartoon-ink-mid),
                     -7px 7px 0 var(--cartoon-ink-contact);
```

Two library-structure consequences follow, and both are caused by hand-rolling the class instead of
using the primitive:

1. **Double-shadow risk is real and the primitive already guards it.** `<Card>` passes
   `shadow: n.shadow && !n.cartoon` to `Surface` (`dist/card-Bk96VI2R.js`) — i.e. the producer
   *turns off* the material shadow whenever the cartoon slab is on. The demo's hand-rolled root gets
   no such coordination; it stacks `cartoon-surface` on its own `bg-well border-card-edge` fork
   (pass-3 L-28) with nothing arbitrating.
2. **`.cartoon-cast` remains inert.** Re-measured this pass, unchanged from pass-3 L-25:
   `{"position":"static","zIndex":"auto","boxShadow":"none","display":"inline","w":0}`. The card
   renders a span for a rule that is not in the cascade. Whatever the slab is, it is not the cast.

`--cartoon-press-t` resolves to `0` while the card writes `--card-press-t: 0.0000` — pass-3 L-26
re-verified.

**Disposition — root cure at the producer (BJ), per the owner's order.** See §7.

---

## L-39 · MAJOR (new) — the barrel seam that makes this a "six-file internal folder" is enforced by nothing: the lint rule's globs address a tree deleted at W43

`demo/palettes/browser/index.ts:6-8` states as fact:

> External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces it standing.

The rule (`eslint.config.js`, the two demo objects) is scoped to:

```js
files: ["demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
        "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
        "demo/@/lib/**/*.ts", "demo/@/lib/**/*.vue"],
files: ["demo/@/composables/**/*.ts", "demo/@/composables/**/*.vue"],
```

and bans the pattern `"@components/custom/palette-browser/**/*.vue"`.

```
$ ls demo/@
ls: demo/@: No such file or directory

$ git log --oneline -1 -- demo/@
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)

$ grep -rn "@components" demo --include="*.vue" --include="*.ts"
demo/palettes/browser/status/index.ts:5:// (@components/custom/dock/DockStatusLamp.vue);   ← a comment
```

`demo/@` was deleted at W43; the `@components` alias was retired with it (`vite.config.ts:68-72`
records the deletion). Both the rule's file region and its banned specifier address a tree that no
longer exists.

Measured, per file, with the linter itself:

```
$ npx eslint --print-config <file> | jq -c '.rules["no-restricted-imports"]'
demo/palettes/BrowsePane.vue                                           null
demo/palettes/browser/card/PaletteCard/PaletteCard.vue                 null
demo/workbenches/extract/ExtractWorkbench.vue                          null
demo/palettes/browser/card/composables/useSwatchActions.ts             null
```

**`null` — the rule is not in effect for a single live demo file.** Nothing prevents any consumer
from importing `browser/card/PaletteCard/PaletteCardMenu.vue` directly tomorrow. (The `src/**`
`inv-K-1` object in the same config *is* live and correct; only the demo half is dead.)

This matters more than a stale comment, because the entire justification for PaletteCard's six-file
shape is "these five are internal, the barrel is the surface." That distinction is currently
enforced by convention alone — and pass-1 L-3 already measured that cross-feature consumers do
whatever they like with the surface that *is* exported.

This is the third instance of pass-1 L-12's stale-citation mechanism (pass-3 L-33 was the second),
and the first that is **load-bearing**: the other two were prose, this one is a guarantee the
codebase asserts and does not hold.

**Cure.** Re-aim the globs at the real trees (`demo/palettes/**`, `demo/workbenches/**`,
`demo/picker/**`, `demo/scenes/**`, `demo/shell/**`) and re-express the ban against the real
specifier shape (`**/palettes/browser/**/*.vue`, with the barrels exempt). If the boundary is not
worth re-aiming, delete the rule and the paragraph that cites it — an unenforced invariant recorded
as enforced is worse than an absent one.

---

## L-40 · MAJOR (new) — the card hard-requires an app-**boot** provider through a non-null-asserted inject; the dependency runs backwards and no lint rule can see it

`PaletteCard.vue:229` unconditionally, at setup top level:

```ts
const { safeCss } = useSafeAccentFn("well");
```

`demo/color-session/useContrastSafeColor.ts:347`:

```ts
const ambient = inject(INK_AMBIENT_KEY)!;
```

The **only** provider (`grep -rn "provide(INK_AMBIENT_KEY"`):

```
demo/color-picker/composables/boot/useAtmosphereBoot.ts:92:    provide(INK_AMBIENT_KEY, derivedLightness);
```

So the dependency edge is:

```
demo/palettes/browser/card/PaletteCard/PaletteCard.vue   (a leaf presentational card)
      → demo/color-session/useContrastSafeColor.ts
      → INK_AMBIENT_KEY
      → demo/color-picker/composables/boot/useAtmosphereBoot.ts   (APP-ROOT BOOT)
```

`demo/color-picker/` is the app root. This is exactly the edge G-DEMO-1 was written to forbid —
its own message: *"the shared color layer must never import app-root boot (demo/color-picker) — the
spine is a clean lower layer."* The edge survives because it is expressed through
`provide`/`inject`, which no `no-restricted-imports` rule can observe, and because the rule that
would have caught the import form is dead (L-39).

Three concrete consequences:

1. **The card cannot be mounted outside the boot tree.** The `!` assertion means a missing provider
   yields `undefined`; the first `safeCss()` call then throws on `ambient.value`. That call is
   deferred until `expanded` renders `PaletteCardSwatches` (`PaletteCard.vue:143`), so the failure
   is *latent*: mount succeeds, first expand crashes. Unit-testing or isolating this component
   requires standing up the atmosphere boot.
2. **Per-card global cache invalidation.** `useSafeAccentFn` calls `bumpProbeEpochOnMount()`
   (`useContrastSafeColor.ts:76-81`), which registers an `onMounted` that increments a
   **module-global** `probeEpoch`. `resolveLiveTintCached` (`:239-249`) keys a module-global
   `liveTintCache` on `(darkClass, epoch)`. Mounting *N* cards therefore performs *N* epoch bumps,
   each invalidating the cached tint of **every** surface rung for **every** consumer in the app.
   `BrowsePane` pages 50 rows (`BrowsePane.vue`, the load-more seam), and each invalidation costs a
   `getComputedStyle` plus two canvas `getImageData` readbacks per surface on the next read.
3. **The value bought is one string on the collapsed card: nothing.** `safeFirstColor`
   (`PaletteCard.vue:230`) is consumed only inside the `v-if="expanded"` subtree. Collapsed cards
   pay the provider coupling and the epoch bump for a computed they never read.

**Cure.** The certified ink for a palette's first colour is a property of the *palette row*, not of
the card chrome — hoist it to the list owner (`usePaletteStore`/`PaletteCardGrid`) and pass it in as
a plain prop, or compute it lazily inside `PaletteCardSwatches` where it is used. Either way the
card stops reaching up into boot, one instrument instance serves the whole grid, and the epoch bump
happens once.

---

## L-41 · MINOR (new) — a host wraps the card in a native `<button>`; the card ships interactive descendants

`demo/workbenches/mix/MixSourceSelector.vue:246-268`:

```html
<button v-for="palette in savedPalettes" type="button" :aria-pressed="…" @click="togglePalette(palette)">
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

Measured interactive descendants of a collapsed card (`probe-L4.mjs` §C): **1** (the
`aria-label="Palette menu"` trigger — itself a glass-ui `<Button>`, i.e. a real `<button>` element).
On the expanded card it is still 1 plus a slug-copy `<button>` whenever `show-slug` is set
(`PaletteCardSwatches.vue:13`).

`<button>` has *interactive content* excluded from its content model (HTML Living Standard, §4.10.6
"Content model: phrasing content, but there must be no interactive content descendant"). A
`<button>` inside a `<button>` is invalid, has undefined activation behaviour across engines, and
makes the inner control unreachable in some AT modes.

**Live-nesting status: NOT reproduced.** `/#/mix` rendered `0` `[role="article"]` elements in the
isolated profile (`probe-L4.mjs` §B: `{"articles": 0}`) — the mix source list did not surface the
seeded palettes on that route. The nesting is therefore established by **source reading plus the
measured descendant count**, not by a live DOM capture. Labelled a hypothesis on that one axis.

The structural point stands regardless of the live capture: PaletteCard's contract is
`role="article"` + a root `@click` + interactive children, and it publishes no statement that it
contains interactive content. A host reading only the emit list reasonably concluded "this is a
clickable tile" and wrapped it. Pass-1 L-3 and pass-3 L-32 found hosts under-wiring the emit
surface; this is a host *over*-wrapping it. Same root cause: the card's public surface does not
describe what the card is.

**Cure.** The card's activation belongs to the card. Drop the `click` emit, make the *title row* the
single activator (a real `<button>` around the name), and let hosts pass `@activate`. Selection
state (`aria-pressed`) becomes a prop the card renders, not a wrapper element the host invents —
glass-ui already ships `Card`'s `variant="selection"` + `selected` for exactly this
(`Card.vue.d.ts`: `variant?: CardVariant; selected?: boolean`).

---

## L-42 · MINOR (new) — `card/composables/` is a mixed-ownership folder, and the "feature" it belongs to is a flat 19-module drawer the seam does not cover

`demo/palettes/browser/card/composables/` holds four modules. Three are card-generic
(`useHoverPopover`, `useHeightTransition`, `useLeaveTimer`). The fourth is not:

```
$ grep -rn "useSwatchActions" demo --include="*.ts" --include="*.vue"
demo/palettes/browser/card/CurrentPaletteEditor.vue:194:import { useSwatchActions } from "./composables/useSwatchActions";
```

`useSwatchActions` has exactly one consumer, is not the card's, and reaches sideways into the colour
domain and up into the feature root:

```ts
// useSwatchActions.ts:3-7
import type { EditTarget } from "../../../../color-session/color-model";
import { EDIT_TARGET_KEY } from "../../../../color-session/keys";
import { CURRENT_PALETTE_ID } from "../../../constants";
```

The wider shape: `demo/palettes/` root is a **flat 19-module drawer** (`types`, `utils`,
`constants`, `export.ts`, `mix`, `dateFormat`, and 13 `use*` composables) beneath which
`demo/palettes/browser/` (42 files) declares "the mega-feature's TOP-LEVEL SEAM". The leaves reach
back up through it:

```
$ grep -rhno 'from "\(\.\./\)\{1,4\}\(types\|utils\|constants\|export\|usePaletteStore\|usePaletteActions\
|usePaletteExport\|mix\|useBrowsePalettes\|useFilteredList\|dateFormat\)"' demo/palettes/browser \
  | sed 's/.*from //' | sort | uniq -c | sort -rn
   5 "../../types"
   5 "../../../types"
   3 "../dateFormat"
   2 "../../../utils"
   1 "../../../constants"
```

16 upward edges from inside the declared seam to modules **outside** it. A seam that its own
internals reach around is a directory convention, not a module boundary. (`utils.ts` is itself a
two-concept drawer: slug minting + palette-kind classification.)

---

## 1. The decomposition, judged (pass-4 reading)

Pass-1 L-6 called the six-file split "markup shards with pass-through props". Pass 4 sharpens the
diagnosis with a prop-flow count, because the owner's question is whether the split earns its files.

| file | own state | props in | emits out | verdict |
|---|---:|---:|---:|---|
| `PaletteCard.vue` | 5 refs + 2 composables + press drive | 10 | 18 | the god module |
| `PaletteCardSwatches.vue` | **0** | **8** | **8** | pure conduit — 8 in, 8 out, no decision |
| `PaletteCardMenu.vue` | 2 computed | 5 | 2 | the one real seam (own data dependency) |
| `PaletteCardMeta.vue` | 0 | 1 | 1 | legitimate leaf (renders `palette`, emits `vote`) |
| `PaletteRenameInput.vue` | 1 ref | 1 | 2 | legitimate leaf |
| `ActionFeedback.vue` | timer | 4 | 1 | should not exist (glass-ui ships `./toast` — pass-3 L-29) |

`PaletteCardSwatches` is the proof that the split is not along seams: **eight props in, eight emits
out, zero state, zero decisions.** Every one of its eight props is a value `PaletteCard` computed
and every one of its eight emits is forwarded straight back. It is a `<template>` extraction wearing
a component's costume — and the cost is real: `swatchClass`, `floatingStyle`, `canHover`,
`openPopoverIndex` and `safeFirstColor` are all now part of a *published* prop contract that a
future refactor must honour, purely because a template got long.

The two seams that *are* real are the two the split did not make: **the popover machine** (hover
timer + positioning + open index, currently split across `useHoverPopover` and five props) and
**the menu's data dependency** (the only child with a reason to exist independently).

Against edict 3 (KISS, no contrivance): the folder is not a `shared/` dir, so it does not trip the
letter of the rule — but `PaletteCardSwatches` is exactly the wrapper-that-earns-nothing the edict
is aimed at.

---

## 2. The lattice I would build greenfield

Stated concretely, as asked — no hedging.

```
@mkbabb/value.js/css                    parse + serialize; the ONE colour representation
      ↑
demo/palettes/model/                    Palette, PaletteColor(parsed), kind, slug   ← types + utils merged, no drawer
demo/palettes/export/                   the contracted serializers, renamed index.ts, sole home
demo/palettes/store/                    usePaletteStore + ports; owns rows, owns certified ink per row
      ↑
demo/palettes/browser/index.ts          the seam — and a LIVE lint rule that names the real tree
      ↑
PaletteGrid.vue                         list; owns selection, drag, expansion, the ONE ink instrument
PaletteRow.vue                          ← the card, ~120 L
   ├ <Card cartoon material="well" variant="selection" :selected>   glass-ui ./card, no hand-roll
   ├ <PaletteColorStrip>                                            already correct
   ├ header: <button> around the name = the ONE activator; <Chip> ×N; <Toast> via useToast()
   ├ <PaletteRowMenu>                                               the real seam; keeps its own data dep
   └ <ExpandableContainer v-model:open>                             glass-ui ./expandable-container
        └ <SwatchStrip>                                             owns the popover machine WHOLE
```

Deletions this implies: `PaletteCardSwatches.vue` (conduit), `ActionFeedback.vue` (→ `./toast`),
`useHeightTransition.ts` (→ `./expandable-container`), `useLeaveTimer.ts` (folds into the popover
machine), `demo/palettes/export.ts` + `usePaletteExport.ts` (L-34), the `.cartoon-cast` span
(L-38), the `group` class (L-37), the 19 `demo/ui/*` forwarding dirs (pass-1 L-2).

Surface change: **18 emits → 2**. One `activate`, one `action: PaletteAction` where `PaletteAction`
is a discriminated union, not `string` (pass-1 L-4's silent-drop default becomes a type error). The
host handles the union exhaustively or the compiler objects — which is the structural cure for every
"host wires 3 of 18" finding in this docket.

Performance consequence, stated because it is the reason to prefer this shape: the certified-ink
instrument goes from *N* instances and *N* global cache invalidations (L-40) to one, and the
expand animation goes from three hand-forced reflows per card
(`useHeightTransition.ts:32,56,63` — `void htmlEl.offsetHeight`) to the producer's container.

---

## 3. What I checked and found sound (pass-4 negatives)

- **`verbatimModuleSyntax` (edict 8).** All six SFCs and all four composables use `import type` or
  inline `type` modifiers for every type-only import. `PaletteCard.vue:168-169`,
  `PaletteCardMenu.vue:177-178`, `PaletteCardSwatches.vue:72`, `PaletteCardMeta.vue:59`,
  `useSwatchActions.ts:2-3`. Zero violations.
- **No deep `src/` import anywhere in the cone.** `grep -rn "@src\|\.\./\.\./src" demo/palettes/browser/card/`
  → no matches. The T.W1 ban holds here.
- **The `card/` sub-barrel reach is legal.** `MixSourceSelector.vue:8` imports from
  `"../../palettes/browser/card"` — a sub-barrel the top-level seam re-exports, which the seam's own
  contract permits. (That it is *unenforced* is L-39; the import itself is correct.)
- **`inv-K-1` is live and correct.** `npx eslint --print-config src/css/grammar.ts` returns the
  glass-ui ban intact. Only the demo half of the config is dead.
- **`AdminUsersPanel.vue:201` reaches the barrel**, not a raw file. Correct.
- **The press drive is real.** Measured `scale: 1.0091 0.9512` under a held pointer — `useLiquidPress`
  works; it is the *CSS* register that is absent (L-36), not the JS one.

---

## 4. Probe log (pass 4)

| # | probe | file | result |
|---|---|---|---|
| 1 | eslint effective config, 4 live demo files | `npx eslint --print-config` | `no-restricted-imports: null` ×4 → **L-39** |
| 2 | `demo/@` existence + deletion commit | `ls`, `git log` | absent; deleted at `a61094e3` → **L-39** |
| 3 | card root computed style at rest / hover / press | `probe-L4.mjs` §A | `hoverDelta {}`; 3× zero-blur shadow; cast inert → **L-36/L-37/L-38** |
| 4 | loaded `.group…hover` rules, 49 sheets | `probe-L4.mjs` §A | `[]` → **L-37** |
| 5 | interactive descendants, collapsed + expanded | `probe-L4.mjs` §C | 1 / 1 → **L-41** |
| 6 | `/#/mix` card nesting | `probe-L4.mjs` §B | `articles: 0` — **not reproduced**, L-41 labelled |
| 7 | Export→SVG with hostile name + colour | `probe-L4b.mjs` | `escaped:false`, 3 rects, `onload` attribute → **L-34** |
| 8 | `@mkbabb/value.js` edge census | `grep -rln` | card cone 0; feature 2, one of them dead → **L-35** |
| 9 | upward edges out of the seam | `grep -rhno` | 16 → **L-42** |
| 10 | owner marks OM-11 / OM-12 | image read | slab matches the measured token exactly → **L-38** |
| 11 | visual matrix rows for this component | `shots/safari-desktop-{light,dark}/{palettes,browse}.png` | palettes = "No saved palettes yet"; browse = "The commons is unreachable" → **zero coverage, pass-1 L-13 unchanged** |

Artifacts: `probe-L4.mjs`, `probe-L4-results.json`, `probe-L4b.mjs`,
`evidence/L4b-ridge-text-rect-….svg`, `evidence/L4-card-rest.png`.

---

## 5. Pass-4 ranked docket

| id | sev | one line | cure altitude |
|---|---|---|---|
| **L-34** | BLOCKER | Export→SVG injects; the escaping implementation is in the app-dead contract module, under a green test | delete `export.ts`, rename `serializers.ts`→`index.ts`, rewire |
| **L-35** | MAJOR | third palette→text path (clipboard); card cone has **0** `@mkbabb/value.js` edges | parse on ingest; one colour representation |
| **L-36** | MAJOR | hover register measurably absent; producer typing says `cartoon` adds no command behaviour | **BJ ask** (§7) |
| **L-38** | MAJOR | faceted slab = 3 zero-blur producer shadow layers; hand-roll forfeits `<Card>`'s shadow arbitration | **BJ ask** (§7) + adopt `<Card>` |
| **L-39** | MAJOR | the barrel-seam lint rule addresses a tree deleted at W43; `null` for every live file | re-aim globs or delete the claim |
| **L-40** | MAJOR | leaf card → app-root boot via `inject(...)!`; per-card global tint-cache invalidation | hoist ink to the list owner |
| **L-41** | MINOR | a host wraps the card in `<button>`; card ships interactive descendants (live nesting not reproduced) | one activator + `variant="selection"` |
| **L-42** | MINOR | `card/composables/` mixed ownership; 16 upward edges out of the declared seam | merge `types`/`utils` into `model/` |
| **L-37** | MINOR | `group` marker class with zero consumers in the whole app | delete one token |

---

## 6. Carried dockets, re-verified at pass 4

Re-checked by direct read at HEAD `7775473b`; all **still open** unless noted.

- **Pass 1** L-1 (throwing wrapper on untrusted colour), L-2 (19 `demo/ui/` forwarding dirs — still
  present, `demo/ui/badge/index.ts` and `demo/ui/button/index.ts` are one-line re-exports of
  glass-ui while `PaletteCard.vue:170` imports glass-ui directly four lines away), L-3 (host
  wiring 3/18, 4/18, 0/18 — re-confirmed at `AdminUsersPanel.vue:148-150`,
  `ExtractWorkbench.vue:152-155`, `MixSourceSelector.vue:264-267`), L-4 (`handleMenuAction`'s
  untyped `Record<string, () => void>` + silent `if (!fn) return`, `PaletteCard.vue:290-319`), L-5
  (`defineExpose({ showFeedback })` at `PaletteCard.vue:244`, harvested through
  `:ref="(el: any) => …"` at `BrowsePane.vue:94` into the `cardRefs` record at `BrowsePane.vue:209`),
  L-6 (see §1),
  L-7, L-8 (two `slugify`: `export.ts:9` vs `utils.ts:3` — different normalization), L-9, L-10,
  L-11 (`ActionFeedback.vue:37-47` still has no `onUnmounted`), L-12, **L-13 re-verified this pass
  (§4 #11)**, L-14.
- **Pass 2** L-15..L-24 — all open. L-18 is **escalated by L-34**.
- **Pass 3** L-25..L-33 — all open. L-25 and L-26 re-measured live this pass (§4 #3). L-27 receives
  its measurement in L-36.

Stale-citation instances now at four: pass-1 L-12, pass-3 L-33, **L-39** (load-bearing), and
`PaletteDialog.vue` — a file that does not exist, cited 10 times including a line number
(`demo/palettes/constants.ts:6` "inlined in `PaletteDialog.vue:403`";
`useHoverPopover.ts:8` "Used by PaletteDialog").

---

## 7. Verdict and the marked asks

**DEFECTIVE.** One reproduced BLOCKER, four MAJOR, three MINOR new this pass, on top of 33 open
findings from passes 1–3.

The strongest single defect is **L-34**: the card's Export→SVG emits an unescaped, attacker-shaped
document, and the module that would have escaped it — the contract-governed, library-consuming,
byte-exact serializer set — is loaded by the test suite and by nothing else. A green test named
*"escapes the display name and never renders text/font/script"* currently certifies code the product
does not run. That is the mechanism this whole docket keeps rediscovering: **the concept has two
homes and the wrong one won the wiring.**

### Owner mark MT-F036 — root cause and disposition

Both halves of the mark root-cause into `@mkbabb/glass-ui@7.0.0`, not into `PaletteCard.vue`. Per
the owner's standing law, they are relayed as **BJ asks**, not patched locally.

> **BJ ask 1 — a hover register for the card root.**
> `cartoon-surface` (`dist/components/card/styles.css:1`) is three declarations with no `:hover`,
> no `:active` and no `transition`; `Card.vue.d.ts` documents `cartoon` as *"Static Memphis edge
> treatment; it does not add command behavior."* Measured on a live PaletteCard: **zero** computed
> style change on hover. Interactive cards therefore have no hover affordance anywhere in the app.
> Ask: an interaction register on `Card` — e.g. `interactive` / `<Card interactive>` — that carries
> hover lift + shadow step + `:active` squash on the producer's own easing tokens, composable with
> `cartoon` and with every `material`/`tier`. glass-ui already ships `.hover-lift{,-md,-lg}`
> (`dist/styles/utilities/components.css`); the ask is to seat that register on `Card` so consumers
> stop hand-rolling it.

> **BJ ask 2 — the faceted slab.**
> `--shadow-cartoon-md` is three **zero-blur** layers at `-3/-5/-7 px` (`dist/styles/tokens/shadow.css`),
> measured live as `… -3px 3px 0px 0px, … -5px 5px 0px 0px, … -7px 7px 0px 0px`. At the card's scale
> this reads as a hard-edged, stepped slab trailing the silhouette (witnesses OM-11, OM-12) rather
> than as a cast shadow. Ask: retune the cartoon shadow ramp at the producer — fewer layers, or a
> non-zero blur on the trailing layers, or a size-aware ramp — and confirm the interaction with
> `Surface`'s own shadow (the `shadow: shadow && !cartoon` arbitration in `Card` is invisible to any
> consumer that applies `cartoon-surface` by hand, which is what this demo does).

**Demo-side companions to those asks** (no source lands from this formation): adopt
`<Card cartoon material="well" as="div">` in place of the hand-rolled root (pass-3 L-27/L-28),
delete the inert `.cartoon-cast` span (L-38) and the dead `group` hook (L-37). The demo's job is to
stop hand-rolling the class; the register's job stays at the producer.
