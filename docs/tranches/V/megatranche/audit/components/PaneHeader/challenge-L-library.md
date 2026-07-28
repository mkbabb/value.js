# CHALLENGE-L — `demo/shared/ui/PaneHeader.vue` · library structure · **PASS 2**

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
The seat was spawned with an explicit Opus 5 declaration and the declaration matches the model
actually serving this turn. **DECLARED, not inherited.**

Subject: `demo/shared/ui/PaneHeader.vue`, 224 lines, area core, 9 consumers, 11 live host sites.
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.

**HEAD at read time was `fe8785e5`** ("docs(megatranche): bank the consumer CRUD and Goldilocks DAG
audit"), not the `c654824e` named in the brief — the tree advanced between the brief being written
and this seat running. Every line number below is against `fe8785e5`.

---

## Provenance — this is a second pass

A prior CHALLENGE-L pass exists, authored earlier today (11:07) at HEAD `c654824e`. It is preserved
verbatim at **`challenge-L-library.pass-1-2026-07-28-prior.md`** and is **not superseded** — it is
carried. Pass 1 found the strongest defect in this component and I could not improve on it.

This pass did three things:

1. **Independently re-derived** pass 1's load-bearing claims from scratch, without reading its probe
   scripts, and reports the verification ledger below.
2. **Corrected one** of pass 1's negatives (its 9/9 host-contract compliance claim).
3. **Added five findings pass 1 did not have**, one of which is the *mechanism* that explains how
   pass 1's L-2 was able to happen at all and will cause it to recur if left alone.

### Verification ledger — pass-1 claims re-tested by this seat

| pass-1 claim | my independent test | result |
|---|---|---|
| WebKit `atan2()`→`tan()` unit-carry defect | my own 5-declaration CSS repro (`trig-verify.mjs`), written before reading `probe-L-structure.mjs` | **CONFIRMED, digit-for-digit** |
| WebKit mobile title *grows* 1.4338× at 390px | `ratio-verify.mjs`, `/#/gradient`, webkit 390×844 | **CONFIRMED — `matrix(1.433843, …)`, exact match** |
| `transform-origin: left top` breaks RTL | `rtl-verify.mjs`, webkit 1440×900, `/#/gradient` (pass 1 used `/#/about`) | **CONFIRMED on a second route** |
| `@reference` at `:61` is a dead edge | `grep -n "@apply\|theme(" demo/shared/ui/PaneHeader.vue` | **CONFIRMED — no output.** My own first read had provisionally cleared this; pass 1 is right and I was wrong |
| producer feather is tokenized | `grep -o -- "--card-pad-title-gap:[^;]*;" …/card/styles.css` → `calc(var(--card-pad-inline) / 2.618);` | **CONFIRMED** |
| glass-ui nests `@supports` inside `no-preference` everywhere | `grep -c` on `dist/styles/scroll-driven.css` (2) and `scroll-choreography.css` (3) | **CONFIRMED** |
| `<ScrollCardHeader>` absent from 7.0.0 | `grep -rl ScrollCardHeader node_modules/@mkbabb/glass-ui/` | **CONFIRMED — no output** |
| `.card-scroll-host` exists upstream, byte-identical | `dist/styles/utilities/base-misc.css` → `.card-scroll-host { contain: layout style paint; }` | **CONFIRMED** |
| `package.json` has no `"."` export | `'.' in p.exports` → `false`; `main`/`module`/`types` all `undefined`; `src/index.ts` absent | **CONFIRMED** |
| demo value.js imports are all published subpaths | `grep -rho "@mkbabb/value\.js[a-z/.-]*" demo/ \| sort \| uniq -c` | **CONFIRMED — 50 hits, 0 bare-root (the 1 apparent bare hit is inside a code comment), 0 deep** |
| host-class compliance is 9/9 | `hosts.mjs` — live DOM on `/#/blob`, `/#/atmosphere`, `/#/gradient` | **CORRECTED — see L2-3** |

Pass 1's headline repro, reproduced by my own script:

```
$ node trig-verify.mjs
webkit    {"a":"310.796875px","b":"618.03125px","c":"311.34375px","d":"31717.265625px","e":"618px"}
chromium  {"a":"618.016px",   "b":"618.031px",  "c":"311.344px",  "d":"31717.3px",     "e":"618px"}
```

`a = tan(atan2(1.618rem, 2.618rem))`, `c = tan(31.71776rad)`. WebKit's `a` lands on `c`. `atan2()`
alone (`d`), `tan(<deg>)` (`b`) and `atan`→`tan` (`e`) are all correct. The defect is isolated to
`atan2`→`tan` nesting, and `PaneHeader.vue:141` is the only site in the repository that depends on
it. **Two independently authored repros, identical to the sixth figure.** Pass 1's L-1 stands as a
BLOCKER without qualification.

**New data on that defect.** Pass 1 measured the endpoint ratio. I measured mid-range, on a second
route, and the divergence is present at *every* scroll offset, not only at the range end:

```
$ node ratio-verify.mjs                       # /#/gradient, scrollTop := 200 (clamps to pane overflow)
webkit    1440x900  fs=41.888px  rest matrix(1,…) w=462  ->  stuck matrix(0.655404,…) w=303
chromium  1440x900  fs=41.888px  rest matrix(1,…) w=462  ->  stuck matrix(0.805831,…) w=372
webkit     390x844  fs=25.888px  rest matrix(1,…) w=324  ->  stuck matrix(1.433843,…) w=465
chromium   390x844  fs=25.888px  rest matrix(1,…) w=324  ->  stuck matrix(1,…)        w=324
```

Identical viewport, identical computed `font-size`, identical tokens
(`--type-heading: 1.618rem`, `--type-display-1: clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)`), and the
two engines paint title boxes **303px vs 372px wide** at the same scroll position. On mobile,
Chromium holds the designed `1.0` no-op while WebKit **enlarges by 43%** inside a 390px viewport —
324px → 465px. (The 1440 figures are mid-range, ~60px of a 120px range: solving
`scale = 1 + p(r−1)` gives `p ≈ 0.50` against pass 1's endpoint ratios `r = 0.618` Chromium /
`0.3108` WebKit, so the two passes are arithmetically consistent.)

---

## Verdict

**DEFECTIVE.** Unchanged from pass 1, on strictly more evidence.

Strongest defect remains **pass-1 L-1** — the condensed type rung is derived by nested browser trig
in a leaf component, and WebKit, the app's primary engine, computes it wrong by roughly 2× on
desktop and *in the wrong direction* on mobile.

What pass 2 adds is the answer to the question pass 1 did not ask: **why was any of this
possible?** Because the demo's module lattice is enforced by nothing at all. Every
`no-restricted-imports` boundary rule in `eslint.config.js` matches zero live files or bans a
specifier nobody can write. A cure that lands the transposition without restoring the gate will be
re-broken by the next tranche, exactly as W44's whole-adoption of glass-ui 7.0.0 failed to retire
the forks it obsoleted.

---

## Consolidated defect ledger

Provenance column: **P1** = found by pass 1 (carried, verification status above); **P2** = new in
this pass.

| id | prov | sev | defect |
|---|---|---|---|
| **L-1** | P1 | **BLOCKER** | condensed type rung derived by `tan(atan2(…))` in a leaf; WebKit gets it wrong (13.0px desktop title; 43% mobile *enlargement*) |
| **L-2** | P1 | **BLOCKER** | triplicate ownership of one design-system concept; the canonical home has zero consumers; both forks' justifying premise is false against 7.0.0 |
| **L2-1** | **P2** | **MAJOR** | **the module lattice is enforced by nothing — 100% of `no-restricted-imports` boundary rules are dead** |
| **L-3** | P1 | MAJOR | physical `transform-origin: left top` in a document with a live RTL seam |
| **L-4** | P1 | MAJOR | inverted, untyped, silently-failing global-class edge; the class already exists upstream |
| **L-5** | P1 | MAJOR | heading level hardcoded `<h3>`; `h1 = 0` on all 60 visual captures; the fork discarded `CardTitle`'s `as` seam and the `data-slot` grammar |
| **L2-2** | **P2** | MINOR | **the public prop cannot be passed optionally under the repo's own `exactOptionalPropertyTypes`** |
| **L2-3** | **P2** | MINOR | **the host-class contract is violated on 2 of 11 sites — corrects pass 1's 9/9** |
| **L2-4** | **P2** | MINOR | **the dead producer surface is not merely unused, it is shipped and parsed: 9 rules, 0 matching elements, every route** |
| **L-6** | P1 | MINOR | one feather concept, three magnitudes, seven literals |
| **L-7** | P1 | MINOR | dead `@reference` edge (systemic: 15 of 17 demo SFCs) |
| **L-8** | P1 | MINOR | dangling `<ScrollCardHeader>` reference in both forks |
| **L2-5** | **P2** | INFO | **the `demo/ui/card` barrel silently narrows the design system, dropping `CardAction`** |
| **L-9** | P1 | INFO | the `demo/ui/*` barrel layer is an alias tier and a false proof of the glass-ui surface |
| **L-10** | P1 | INFO | `demo/shared/` is a three-file residue colliding with `demo/ui/` |
| **L2-6** | **P2** | INFO | `demo/shared/utils.ts:17` asserts a root barrel that does not exist (pass 1 filed this for the library seat; I re-file it here because it sits *inside* `shared/`, two files from the subject) |

Carried findings are documented in full in the preserved pass-1 file. Below I write up only what is
new or corrected.

---

## L2-1 · MAJOR — the module lattice is enforced by nothing *(new)*

`docs/tranches/V/ARCHITECTURE.md` §1 ratifies an import-direction lattice —

```
app → shell / color-session / feature / platform / shared
shell → color-session / platform / shared
feature → color-session / own descendants / platform / shared / published packages
color-session → platform / shared / published packages
platform → shared / external packages
shared → external packages
```

— and states: *"Cross-feature internal imports are **forbidden by construction**."*

They are not forbidden by construction. They are forbidden by paragraph.

```
$ npx eslint --print-config demo/shared/ui/PaneHeader.vue | jq '.rules["no-restricted-imports"]'
"ABSENT"
$ npx eslint --print-config demo/workbenches/mix/MixPane.vue | jq '.rules["no-restricted-imports"]'
"ABSENT"
```

`eslint.config.js` carries four config objects with `no-restricted-imports`. Their `files` globs, in
full:

```
"demo/@/components/**/*.ts"    "demo/@/components/**/*.vue"
"demo/@/composables/**/*.ts"   "demo/@/composables/**/*.vue"
"demo/@/lib/**/*.ts"           "demo/@/lib/**/*.vue"
"demo/color-picker/**/*.ts"    "demo/color-picker/**/*.vue"
```

```
$ ls -d "demo/@"
ls: demo/@: No such file or directory
$ find "demo/@" -name "*.ts" -o -name "*.vue" | wc -l
0
$ find demo -name "*.ts" -o -name "*.vue" | wc -l
250
$ find demo/color-picker -name "*.ts" -o -name "*.vue" | wc -l
16
```

Three of the four objects match **zero files** — `demo/@` was dissolved and ARCHITECTURE.md §1 now
names it as forbidden (*"There is no … `demo/@` …"*), but the rules that policed it were never
re-keyed. The fourth object covers **16 of 250** demo TS/Vue files (6.4%), and its single pattern
bans `@components/custom/palette-browser/**/*.vue` — an alias `vite.config.ts:68` records as killed
at W43/RF-15:

```
$ grep -rn 'from "@components' demo/ | wc -l
0
```

So the one surviving live rule bans a specifier that can no longer be written.

**Net: 100% of the demo's import-direction law is unenforced, and 93.6% of demo files sit outside
every boundary glob.**

The contrast is instructive. The repo *does* have one working structural gate — `inv-K-1`,
`eslint.config.js:206-217`, which forbids `src/` from importing glass-ui:

```js
group: ["@mkbabb/glass-ui", "@mkbabb/glass-ui/*"],
message: "inv-K-1: the value.js LIBRARY (src/) must never import glass-ui — the topology is glass-ui → value.js(lib), one direction, no cycle."
```

That direction has held for tranches. The demo→design-system direction, which is where pass-1's L-2
happened, has nothing watching it.

**Why this is the keystone.** Pass 1 correctly framed L-2 as *"legacy that survived its own
supersession"* — W44 adopted glass-ui 7.0.0 whole and neither fork was retired. That is not a lapse
of attention; it is the predictable output of a lattice with no gate. The forks were invisible to
every automated check in the repository. Land pass-1's transposition without this and the next
whole-adoption produces fork C.

**Cure.** Re-key the boundary objects to the live tree — `demo/shell/**`, `demo/picker/**`,
`demo/palettes/**`, `demo/workbenches/**`, `demo/scenes/**`, `demo/platform/**`, `demo/shared/**`,
`demo/color-picker/**` — and encode §1's lattice as real patterns: feature↔feature bans,
`demo/shared/**` restricted to external packages only (which is exactly the rule `PaneHeader.vue`
would need to satisfy), `platform/**` barred from feature reaches. The lattice is already written.
It needs to be typed into the linter rather than into a markdown table. Add one further rule that
would have caught L-2 directly: ban demo-local redefinition of published glass-ui utility class
names (`stylelint`, or a CI grep asserting that no `demo/**` selector duplicates a
`node_modules/@mkbabb/glass-ui/dist/styles/utilities/**` selector's declaration block).

---

## L2-2 · MINOR — the public prop cannot be passed optionally *(new)*

```ts
// PaneHeader.vue:35-37
defineProps<{ description?: string }>();
```

`tsconfig.base.json:11` sets `"exactOptionalPropertyTypes": true`. Under EOPT, `description?: string`
admits *absent* but rejects an explicit `undefined`. Every consumer forwarding an optional
description must therefore contrive around the component's own public surface.
`demo/scenes/ConfigSliderPane.vue:107`:

```vue
<PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>
```

The pane's own prop at `:50` is `description?: string` — the identical shape it cannot forward to
the identical shape. The ternary `v-bind` exists for no other reason; `PaneHeader.vue:22` already
guards with `v-if="description"`, so `:description="description"` is runtime-identical.

This is a public-surface defect, not a call-site defect: a shared component whose optional prop is
un-passable pushes contrivance into every conditional consumer, and contrivance is what edict 3
forbids.

**Cure.** `description?: string | undefined`. Under the L-2 transposition the prop becomes
`<CardDescription>` and the question dissolves.

---

## L2-3 · MINOR — the host-class contract is violated on 2 of 11 sites *(corrects pass 1)*

Pass 1 reported *"Compliance today is 9/9"* and specifically cleared the one non-obvious case:
*"I checked the one non-obvious case, `ConfigSliderPane.vue:106-107`, where the host is an inner
`<div>` and PaneHeader is its first child — correct."*

That is correct against the *functional* requirement (`scroll-timeline` name lookup needs an
ancestor that scrolls) but **not against the contract the file itself states**.
`PaneHeader.vue:43-45`:

> *"The `.pane-scroll-fade` host class lives on the **ROOT element of each pane Card**."*

Measured live, three routes:

| route | host tag | `data-slot` | is Card root | parent `data-slot` | `overflow-y` | `scroll-timeline` | `.pane-header` inside |
|---|---|---|---|---|---|---|---|
| `/#/blob` | `DIV` | `null` | **false** | `card` | `auto` | `--pane-scroll` | 1 |
| `/#/atmosphere` | `DIV` | `null` | **false** | `card` | `auto` | `--pane-scroll` | 1 |
| `/#/gradient` | `DIV` ×2 | `card` | true | — | `auto` | `--pane-scroll` | 1 each |

`ConfigSliderPane.vue:106` places the class on an inner scroll `<div>` nested *inside* the Card, so
the two routes it serves break the stated contract. The ConfigSliderPane seat reached the same
conclusion independently (`ConfigSliderPane/jury-2-architecture.md:154`, A-23: *"this component is
the only one of the nine that puts it on an inner div rather than the pane Card root"*).

**Why the correction matters rather than being pedantry.** Pass 1's own strongest argument in L-4 is
that the edge *cannot fail loudly* — that a pane which forgot the class produces byte-identical
telemetry to a pane that is correctly dormant. This is the empirical proof of that argument: the
contract has *already* drifted on 18% of its sites, silently, and it took a cross-seat comparison to
notice. An unenforceable prose contract does not stay 9/9; it decays, and nothing reports the decay.

The stakes are not cosmetic. `.pane-scroll-fade` carries `contain: layout style paint` — a
paint/layout containment decision with real consequences for portals, sticky descendants and scroll
anchoring. On `/#/blob` and `/#/atmosphere` that containment lands on an inner div; on the other
nine sites it lands on a route-level Card. Two different containment topologies, authored by a leaf
component's stylesheet, chosen by whoever typed the class.

**And the coupling has already reached the shell.** `demo/color-picker/App.vue:399-408`:

```css
/* Ghost pane: always in DOM to preserve scroll-timeline state, but invisible
   and non-interactive. content-visibility:auto (W3-4) … */
.pane-wrapper--ghost { visibility: hidden; position: absolute; pointer-events: none; opacity: 0; content-visibility: auto; }
```

Route-level DOM **lifetime** is dictated by a leaf's CSS mechanism. Confirmed live: `/#/browse` and
`/#/generate` each mount **2** `.pane-scroll-fade` hosts and **2** `.pane-header` elements, one real
and one ghost. The shell pays a permanent DOM cost to preserve a named scroll-timeline defined three
layers down. Under the L-2 cure that retention should be re-derived on routing grounds — KeepAlive
scroll restoration is a routing concern with a routing solution. It may well survive. It must not
survive *for this reason*.

---

## L2-4 · MINOR — the dead producer surface is shipped and parsed on every route *(new)*

Pass 1 established from `grep` that glass-ui's shrink primitive has zero demo consumers. Measured
live, it is worse than unused — it is **loaded**. `demo/styles/foundation.css:56-57` imports both
glass-ui distribution surfaces, and `card-scroll.css` rides the Card JS chunk
(`dist/card-Bk96VI2R.js` imports it), so the rules are parsed into `document.styleSheets` on every
route while matching nothing:

| route | `.card-scroll-host` **elements** | `.card-header--shrink` **elements** | `.card-scroll-host` **rules shipped** | `.card-header--shrink` **rules shipped** |
|---|---:|---:|---:|---:|
| `/#/` | 0 | 0 | 1 | 8 |
| `/#/mix` | 0 | 0 | 1 | 8 |
| `/#/browse` | 0 | 0 | 1 | 8 |
| `/#/generate` | 0 | 0 | 1 | 8 |

Against which the demo ships **8** `.pane-header*` rules and **9** `.picker-header*` rules doing the
same job, on the same routes, in the same cascade. Nine producer rules parsed for nothing; seventeen
fork rules parsed instead.

The rule counts come from a full `document.styleSheets` walk (including nested `@supports` /
`@media` groups) in `paneheader-lattice.mjs`. This is the runtime confirmation of pass-1 L-2's
`grep`: the design system's header primitive is not merely unreferenced in source, it is **live in
the shipped cascade with zero matching elements**.

One more measurement, on the call site itself: `demo/picker/ColorPicker.vue:21-27` renders glass-ui's
`<CardHeader>` and declines `shrink`, passing `:class="['picker-header …', condensed ? 'is-condensed' : '']"`
instead. Live DOM confirms: `[data-slot=card-header]` count 1 on `/#/`, `.card-header--shrink` count
0. The prop is one identifier away from the fork it was replaced by.

---

## L2-5 · INFO — the barrel silently narrows the design system *(new)*

`demo/ui/card/index.ts`, in full:

```ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

glass-ui exports **seven** card members (`dist/components/card/index.d.ts`): `Card, CardHeader,
CardTitle, CardDescription, CardContent, CardFooter, **CardAction**`. The barrel re-exports six.

Pass-1 L-9 correctly names the barrel tier as an alias tier and a false proof of the glass-ui
surface. The narrowing is the second-order harm and it is the concrete mechanism by which
`CardHeader`'s `shrink` prop and `CardTitle`'s `as` prop went unnoticed for three tranches: a
consumer reading `demo/ui/card/index.ts` sees a flat list of six names and no props, no docblocks,
no `.d.ts`. A forwarding layer that silently subsets the design system does not merely add a name —
it **hides** the design system.

---

## L2-6 · INFO — a false claim about the library's public surface, inside `shared/` *(re-filed)*

Pass 1 filed this for the library seat. I re-file it here because it lives in
`demo/shared/utils.ts`, the same three-file directory as the subject, and because it is the same
species as L-8 (a fork parked against a producer surface that does not exist).

`demo/shared/utils.ts:12-18`:

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier …
> so the demo owns its copy; **the library's root-barrel export stands for external consumers.**"*

```
$ node -e "const p=require('./package.json');
           console.log('has . export:', '.' in (p.exports||{}));
           for (const k of ['main','module','types','typings']) console.log(k,'=',p[k])"
has . export: false
main = undefined
module = undefined
types = undefined
typings = undefined
$ ls src/index.ts
ls: src/index.ts: No such file or directory
```

There is no root barrel — no `"."` key, no `main`/`module`/`types` fallback, no source file, no
built artifact. `import { debounce } from "@mkbabb/value.js"` is unresolvable for any external
consumer. A subpath-only export map is a defensible design; the defect is a stale justification
asserting a surface that was removed, which is precisely the kind of comment that licenses the next
local copy.

---

## The `@mkbabb/value.js` question — proved negative, twice

Both passes reach the same answer and I record the mechanism because it is the one part of the
lattice that works, and the cure for L2-1 should copy it.

`PaneHeader.vue` has **zero** JavaScript or TypeScript imports — its entire `<script setup>` is the
four-line `defineProps`. There is no import edge to violate. (Which is exactly why L-4/L2-3 matter:
this component's real cross-boundary coupling is a global CSS class, the one kind of edge no
import-graph lint can see.)

Demo-wide:

```
$ grep -rho "@mkbabb/value\.js[a-z/.-]*" demo/ | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
   1 @mkbabb/value.js          ← inside a code comment, demo/shared/utils.ts:14
$ grep -rn "value\.js/dist\|value\.js/src\|\.\./\.\./\.\./src/" demo/
(no output)
```

Fifty specifiers, all declared subpaths, zero bare-root imports, zero deep reaches. **And it is
structural, not disciplinary** — `vite.config.ts:37-50` *generates* the self-alias set by reading
`package.json#exports` at config time:

```ts
const valueJsSelfAlias = Object.entries(VALUE_JS_PKG.exports).map(([subpath, conditions]) => {
    const specifier = "@mkbabb/value.js" + subpath.slice(1);
    ...
    return { find: new RegExp(`^${escaped}$`), replacement: path.resolve(..., conditions.import) };
});
```

An import a real consumer could not write **cannot resolve in the demo**. Add a subpath to
`exports` and the alias follows; remove one and every demo import of it breaks immediately. That is
what "forbidden by construction" actually looks like, and it is the template for L2-1's cure:
derive the gate from the declaration, do not restate the declaration in a second place.

Two further negatives, checked and cleared so the jury does not chase them:

- **`z-header` (`:11`) is a live utility, not an inert class.** Live computed on `.pane-header`:
  `z-index: 35`, `position: sticky`, `top: 0px`. `--z-header: 35` comes from glass-ui
  `dist/styles/tokens/scheme-motion.css` and is bridged as `--z-index-header` in
  `dist/styles/theme/bridges.css`, which is what makes the bare Tailwind v4 `z-header` utility
  resolve. `DESIGN.md:299` documents the `z-[var(--z-header)]` spelling; the bare utility is
  equivalent. Not a defect.
- **Scoped `@keyframes` do not leak globally (edict 6).** Live computed
  `animation-name: pane-header-veil-19daabcf` / `pane-title-shrink-19daabcf` — the SFC compiler
  hashes them. Global keyframes correctly live in `demo/styles/animations.css`. Not a defect.
- **`verbatimModuleSyntax` (edict 8)** is vacuously satisfied — no imports of any kind.

---

## Standing born-RED · MT-F023

**ADOPTED**, on the root's ruled disposition: **STRUCTURE, not gate.** The three scroll-timeline
declarations (`PaneHeader.vue:178-193`) move inside
`@media (prefers-reduced-motion: no-preference)`, matching the existing idiom at
`demo/styles/animations.css:43`. Not weakened into another override stacked on the blunt guard at
`animations.css:184`.

Pass 1 supplied the producer-side reinforcement (glass-ui nests `@supports` inside `no-preference`
throughout — verified above: 2 occurrences in `scroll-driven.css`, 3 in `scroll-choreography.css`).
This pass adds the **consumer-side census** and two sharpenings.

**The census.** `PaneHeader.vue` is the demo's *only* `animation-timeline` site:

```
$ grep -rn "animation-timeline" demo/
demo/shared/ui/PaneHeader.vue:177   @supports (animation-timeline: scroll()) {
demo/shared/ui/PaneHeader.vue:180       animation-timeline: --pane-scroll;
demo/shared/ui/PaneHeader.vue:186       animation-timeline: --pane-scroll;
demo/shared/ui/PaneHeader.vue:191       animation-timeline: --pane-scroll;
```

Four hits, one file. Meanwhile **five** other demo files already ride the correct additive idiom —
`SpectrumCanvas.vue`, `DockStatusLamp.vue`, `animations.css:43`, `overture.css`,
`ApiOfflineChip.vue`. The app has exactly one scroll-driven animation site, and exactly that site
opted out of the house idiom in favour of the global guard's coverage — coverage the guard cannot
supply, because a scroll-driven animation has `animation-duration: auto` and the guard overrides
only `animation-duration`, `animation-iteration-count`, `transition-duration`, `scroll-behavior`.

**Sharpening 1 — nest, do not stack.** Wrap the existing `@supports (animation-timeline: scroll())`
block *inside* the `no-preference` media query — one nested gate, not two siblings. Both gates
express the same predicate ("this scroll choreography is permitted here"); emitting them as peers
reproduces in miniature the dual-path species this whole report is about, and glass-ui's own
`scroll-driven.css` / `scroll-choreography.css` already nest rather than stack. The
`from`-state = base-state construction guarantees the rest header is byte-identical when either gate
fails, so nesting costs nothing, and `e2e/smoke/oracles/o11-header-gates.spec.ts:312-346` (no
`--pane-scroll` binding outside the `@supports` gate) still passes on a nested block.

**Sharpening 2 — demote the guard, do not extend it.** `animations.css:178` claims the block
*"Neutralises CSS keyframe animations and transitions app-wide."* That headline is false and cannot
be made true: the guard is a **subtractive** policy over an **open** set of animation mechanisms —
scroll timelines today, view timelines / `animation-trigger` / scroll-state container queries next —
so every new mechanism escapes it by default. The `no-preference` idiom is **additive** and
therefore total. The guard's honest scope is *"a backstop for third-party CSS we do not author"*
(glass-ui, reka-ui) and its comment must say so. Its narrower claims about the WebGL rAF loops are
true and were verified by the root probe; those stand unchanged.

**And under the L-2 cure, F023 cannot recur.** The producer's grammar is discrete transitions with a
`reduce` arm already in `card-scroll.css`, so `animation-duration: auto` never enters the picture
for this surface and the blunt guard's blind spot stops mattering. The gate fix is correct and
should land now; the transposition is what makes it permanent. If the `shrink="scrub"` variant is
sent upstream (below), the `no-preference` wrapper goes upstream with it — once, for every consumer
in the constellation.

---

## The greenfield lattice

Pass 1 stated it and I endorse it without change: **`PaneHeader.vue` does not exist.** The concept
"sticky card header that condenses as its card scrolls" belongs to the design system in every
respect — geometry, material, type rung, motion policy, semantics — and glass-ui 7.0.0 already ships
all five.

```
@mkbabb/glass-ui — the ONE home
  components/card/
    Card.vue             tier/material/surface
    CardHeader.vue       shrink?: "threshold" | "scrub"     ← boolean today; mode is the one addition
    CardTitle.vue        as?: keyof HTMLElementTagNameMap    ← ALREADY SHIPS (default "h3")
    CardDescription.vue                                      ← ALREADY SHIPS data-slot grammar
    card-scroll.css      ONE veil (--card-pad-title-gap) · ONE token step (display-2 → display-1)
                         · ONE PRM arm, nested no-preference ⊃ @supports
  styles/utilities/base-misc.css
    .card-scroll-host { contain: layout style paint; }       ← ALREADY SHIPS

demo/
  <feature>/<Pane>.vue   <Card tier="resting" class="card-scroll-host …">
                           <CardHeader shrink="scrub">
                             <CardTitle :as="frame.level">Gradient</CardTitle>
                             <CardDescription>Build gradients …</CardDescription>
                           </CardHeader>
                           <CardContent>…</CardContent>
                         </Card>
  shell/route-frame/     owns heading level, document title, the single <h1>   ← L-5's real home
  styles/                tokens + app keyframes ONLY; zero header geometry
```

Deleted from `demo/`: `shared/ui/PaneHeader.vue` (224 lines) · `picker/composables/useHeaderCondense.ts`
(127) · `picker/header.css` Row B (~96) · the `.pane-scroll-fade` / `.is-condensed` /
`.header-sentinel` vocabulary · the `--pane-scroll` named timeline · the `pane-header-veil` /
`pane-title-shrink` / `pane-desc-shrink` keyframe trio · the `@supports` gate · nineteen
`demo/ui/*/index.ts` barrels · `demo/shared/ui/` itself once `EmptyState` is homed. **≈447 lines of
demo-owned CSS/TS, plus the barrel tier.**

Sent upstream, once: a `shrink` **mode** (`"threshold"` = today's `data-condensed` crossing,
`"scrub"` = the scroll-timeline variant if the scrubbed veil is judged worth keeping) plus three
custom properties — `--card-header-veil-rest` (default `0`; fork A's constitutive `0.52`),
`--card-scroll-range`, `--card-header-title-scale-condensed` — through the standing BH relay, per
edict 4. **Nothing comes back into `demo/`.**

Deleted *problems*: L-1 (no trig ⇒ no engine divergence ⇒ no 13px Safari title, no 43% mobile
inversion), L-2, L-3 (no `scale()` ⇒ no `transform-origin` ⇒ RTL correct by construction),
L-4/L2-3 (host contract resolved in code via `closest(".card-scroll-host")`, fails loudly),
L-5 (`as` restores the outline seam; `data-slot` re-attaches the panes to the producer grammar),
L2-2 (prop dissolves into `CardDescription`), L2-4 (the shipped rules acquire consumers),
L-6 (one tokenized feather), L-7 (no `@reference`), L-8, L2-5, MT-F023, and half of L-10.

Three parallel implementations → one. Seven hardcoded feather literals → zero. Two motion policies
→ one, owned where policy belongs.

**What pass 2 adds to the plan.** The transposition is necessary and insufficient. Add, as a
first-class wave item and not a follow-up:

> **Restore the gate (L2-1).** Re-key `eslint.config.js`'s boundary objects to the live tree and
> encode ARCHITECTURE.md §1 as patterns, deriving the rule set from the lattice the way
> `vite.config.ts:41-50` derives the alias set from `package.json#exports`. Add the
> duplicate-utility check that would have caught `.pane-scroll-fade` ≡ `.card-scroll-host` on the
> day it was written.

Without it, W44's failure mode repeats: a whole-adoption lands, obsoletes demo-local code, and
nothing in the repository notices.

**Two things the transposition owes measurement**, carried from pass 1 unchanged:

1. `useHeaderCondense.ts`'s §0.8/BR-9 claim must be re-tested against 7.0.0's *actual*
   `padding-block-start` + `font-size` grammar. My reading of `card-scroll.css` agrees with pass 1
   that the producer satisfies it; the picker's specific geometry (readout line-lock, blob
   reservation release) is fork B's business and deserves its own measurement.
2. Any genuine residual delta goes to glass-ui as a variant/knob, never back into `demo/`.

---

## Reproduction

```bash
# dev server live on :9000 (verified: curl -o /dev/null -w "%{http_code}" → 200)
# NOTE the app is HASH-routed. A first probe pass using path URLs (/about, /mix) silently
# served the same page for every route and was discarded; all figures use /#/….

# ── pass-2 verification of pass-1 L-1 (independent repro, 5 CSS declarations, no app)
node <scratchpad>/trig-verify.mjs
#   webkit   a=310.796875px  c=311.34375px   b,d,e correct   ⇒ atan2→tan consumes deg as rad
#   chromium a=618.016px     c=311.344px

# ── pass-2 cross-engine in-app ratio, desktop + mobile, /#/gradient
node <scratchpad>/ratio-verify.mjs
#   1440: webkit 0.655404 vs chromium 0.805831 (mid-range, same scroll offset)
#    390: webkit 1.433843 vs chromium 1.000000 (the inversion)

# ── pass-2 verification of pass-1 L-3 (RTL), webkit 1440, /#/gradient
node <scratchpad>/rtl-verify.mjs
#   RTL rest   title l:754 r:1216   transformOrigin 0px 0px
#   RTL 200px  title l:754 r:1057   ← left edge PINNED, right edge (the inline-start
#                                     the text is aligned to) drifts 159px inward
#   LTR rest/200: l:224 pinned, r:686→527  ← correct

# ── L2-1  the enforcement void
npx eslint --print-config demo/shared/ui/PaneHeader.vue  | jq '.rules["no-restricted-imports"]'  # "ABSENT"
npx eslint --print-config demo/workbenches/mix/MixPane.vue | jq '.rules["no-restricted-imports"]' # "ABSENT"
ls -d "demo/@"                                                    # No such file or directory
find demo -name "*.ts" -o -name "*.vue" | wc -l                   # 250
find demo/color-picker -name "*.ts" -o -name "*.vue" | wc -l      # 16
grep -rn 'from "@components' demo/ | wc -l                        # 0

# ── L2-3 / L2-4  live lattice facts (element counts, shipped-rule counts, host descriptors)
node <scratchpad>/paneheader-lattice.mjs      # /#/ /#/mix /#/browse /#/generate
node <scratchpad>/hosts.mjs                   # /#/blob /#/atmosphere /#/gradient

# ── L2-2  the EOPT contrivance
grep -n exactOptionalPropertyTypes tsconfig.base.json     # :11 true
sed -n '107p' demo/scenes/ConfigSliderPane.vue

# ── L2-5  the barrel narrows the producer
cat demo/ui/card/index.ts
cat node_modules/@mkbabb/glass-ui/dist/components/card/index.d.ts   # 7 members vs the barrel's 6

# ── L2-6  no root barrel
node -e "const p=require('./package.json'); console.log('.' in (p.exports||{}), p.main, p.types)"
ls src/index.ts

# ── carried pass-1 verifications
grep -n "@apply\|theme(" demo/shared/ui/PaneHeader.vue                        # no output  (L-7)
grep -o -- "--card-pad-title-gap:[^;]*;" node_modules/@mkbabb/glass-ui/dist/components/card/styles.css  # (L-6)
grep -rl "ScrollCardHeader" node_modules/@mkbabb/glass-ui/                    # no output  (L-8)
grep -c "prefers-reduced-motion: no-preference" node_modules/@mkbabb/glass-ui/dist/styles/scroll-driven.css        # 2
grep -c "prefers-reduced-motion: no-preference" node_modules/@mkbabb/glass-ui/dist/styles/scroll-choreography.css  # 3
grep -rn "animation-timeline" demo/                                           # 4 hits, one file (MT-F023)
sed -n '118,178p' docs/tranches/V/megatranche/audit/visual/REPORT.md          # h1 = 0, all 60 rows (L-5)
```

---

## Artifacts

- `docs/tranches/V/megatranche/audit/components/PaneHeader/challenge-L-library.md` — this file (pass 2)
- `docs/tranches/V/megatranche/audit/components/PaneHeader/challenge-L-library.pass-1-2026-07-28-prior.md`
  — pass 1, preserved verbatim and **carried**, not superseded
- `docs/tranches/V/megatranche/audit/components/PaneHeader/probe-L-structure.mjs` — pass 1's
  cross-engine / cross-direction structural probe (retained)

Pass-2 probe scripts (`trig-verify.mjs`, `ratio-verify.mjs`, `rtl-verify.mjs`,
`paneheader-lattice.mjs`, `hosts.mjs`) were written to this session's scratchpad; their full bodies
are short enough to reconstruct from the reproduction block above, and the seat's write permission
covers only this directory, so they are not banked here.

**No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh`, or any `INBOX.md` was modified.** The two writes in this directory — this
report and the preserved pass-1 copy — are the only changes this seat made to the repository.
