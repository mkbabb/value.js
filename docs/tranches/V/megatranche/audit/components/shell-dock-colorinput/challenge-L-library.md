# CHALLENGE-L — library structure under `demo/shell/dock/ColorInput.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context). The seat was spawned with an
explicit Opus 5 declaration and the declaration matches the served model. No inherited or undeclared
seat. **Not a defect.**

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/shell/dock/ColorInput.vue` (377 lines), area `demo/shell`.
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Dev server probed live at `http://localhost:9000` (Playwright, chromium, 1440×900).

---

## Verdict: **DEFECTIVE**

Eleven findings, one BLOCKER. They are not eleven independent bugs; they are **three mechanisms**
wearing eleven faces.

**Mechanism A — the failure-explicit contract is inverted at the demo boundary.**
`@mkbabb/value.js` is, by its own `package.json#description`, *"Immutable, **failure-explicit** CSS
color…"* and by `docs/tranches/V/ARCHITECTURE.md` every factory *"returns `Result<Color<S>,ColorIssue>`
rather than throwing."* The demo's first consumer module, `demo/color-session/picker-color.ts`,
converts that entire `Result` surface back into exceptions (`valueOrThrow`, 18 call sites), and the
next layer up catches them with a bare `catch {}` that cannot distinguish a user typo from a library
crash. **This is why MT-F001 shipped.** Reproduced live below.

**Mechanism B — the library's public surface is described by three divergent maps and one stale twin.**
`package.json#exports` (7 keys), `tsconfig.demo.json#paths` (8 keys — 3 phantom, 2 real keys missing),
and `vite.config.ts#resolve.alias` (generated from #1). Plus a real, frozen, published copy of
value.js 4.0.0 sitting in the repo's own `node_modules`, whose `css.d.ts` differs from the local build
by 1,580 bytes.

**Mechanism C — a forbidden forwarding layer sits between this component and the design system.**
`demo/ui/` is 19 one-line glass-ui re-export directories. `docs/tranches/V/ARCHITECTURE.md:39` names
this exact construct and forbids it: *"There is no `panes/` dumping ground, `demo/@`, TS/Vite project
alias, `@src`, or **one-line glass-ui forwarding directory**."* ColorInput imports three of them.

---

## 1. Import trace — every edge, with a ruling

`ColorInput.vue` lines 116–136. Each edge traced to its physical home and judged against the import
lattice in `docs/tranches/V/ARCHITECTURE.md` (`shell → color-session / platform / shared`):

| # | Line | Specifier | Resolves to | Ruling |
|---|---|---|---|---|
| 1 | 116 | `vue` | `node_modules/vue` | OK |
| 2 | 117 | `@mkbabb/glass-ui` (`writeClipboard`) | root barrel `dist/glass-ui.js` | **DEFECT** — `writeClipboard` is exported by the granular `@mkbabb/glass-ui/dom` (`dist/dom.js:134`). Root barrel = 66-module graph; `/dom` = 8. See L-2. |
| 3 | 122 | `../../ui/popover` | `demo/ui/popover/index.ts` → `@mkbabb/glass-ui` root barrel | **DEFECT** — forbidden forwarding dir (`ARCHITECTURE.md:39`); also root-barrel instead of `@mkbabb/glass-ui/popover`. See L-2. |
| 4 | 128 | `../../ui/tooltip` | `demo/ui/tooltip/index.ts` → root barrel | **DEFECT** — same. |
| 5 | 129 | `../../ui/separator` | `demo/ui/separator/index.ts` → root barrel | **DEFECT** — same. |
| 6 | 130 | `@lucide/vue` | peer of glass-ui | OK |
| 7 | 131 | `./ParseEchoReadout.vue` | sibling | OK |
| 8 | 132 | `../../color-session/color-names` (`proposeColorName`) | `demo/color-session/color-names.ts:35` | **DEFECT of ownership** — the *write* half of a domain whose *read* half lives in `useCustomColorNames.ts`. Direction-legal, ownership-wrong. See L-7. |
| 9 | 133 | `../../platform/auth/useSession` | `demo/platform/auth/` | Direction-legal; a shell leaf orchestrating session bootstrap is an ownership defect. See L-7. |
| 10 | 134 | `type { EditTarget }` | `demo/color-session/color-model.ts` | `import type` ✓ (`verbatimModuleSyntax` satisfied) — but the prop it types is **never read**. See L-8. |
| 11 | 135 | `serializePickerColor` | `demo/color-session/picker-color.ts` | OK as an edge; but it renders a **second, different** spelling of the same colour the component already shows. See L-9. |
| 12 | 136 | `COLOR_MODEL_KEY, SAFE_ACCENT_KEY` | `demo/color-session/keys.ts` | OK as an edge; `COLOR_MODEL_KEY` injects a 40-member god object. See L-9. |

**No `@src/*` reach, no `demo/@`, no deep import into `src/`.** The T.W1 demo-dogfood keystone holds
at this component: ColorInput touches `@mkbabb/value.js` only transitively, through
`picker-color.ts`, which uses `@mkbabb/value.js/color` and `@mkbabb/value.js/css` — both real keys in
`package.json#exports`. **A real consumer could write those imports.** That half is sound; see
§Negative proof.

---

## 2. Findings

### L-1 — BLOCKER — MT-F001 is *swallowed*, and the swallow is indistinguishable from a typo

**What the user actually sees.** Scripted live reproduction against `http://localhost:9000/#/`
(full gesture chain: click dock *Tools* trigger → click *Open color input* → click the field → type
`oklch()` → Enter). Pasted output:

```
STATE after reveal: {"inert":[],"text":"lab(92% 88.8 20 / 82.7%)","ariaLabel":"Enter a CSS color"}
AFTER TYPE 'oklch()':  {"text":"oklch()","err":false}
  pageErrors so far: []
AFTER ENTER: {"text":"oklch()","errorBadge":"not a valid color","errorClass":true,
              "borderColor":"rgb(219, 36, 36)","title":"lab(92% 88.8 20 / 82.7%) — Color Picker"}
AFTER DEBOUNCE WINDOW: {"text":"oklch()","errorBadge":null}
CONSOLE errors/warnings: ["warning: No available adapters.", <2 WebGL perf warnings>]
PAGE ERRORS: []
```

**Answer to the seat question: it neither guards nor crashes — it swallows.** The user sees a red
2px ring and a "not a valid color" badge for 2 s, then the badge vanishes and the invalid text
*stays in the field*. **Zero page errors. Zero console errors.** Nothing anywhere records that a
library function threw a `TypeError`.

**That the throw is real**, against the *published* surface (`dist/subpaths/css.js`, the exact bytes
a consumer installs):

```
"oklch("             -> failure(css_syntax)      ← correct Result
"oklch()"            -> THROWS TypeError: Cannot read properties of undefined (reading 'replace')
"rgb()"              -> THROWS TypeError: …
"hsl()"              -> THROWS TypeError: …
"lab()"              -> THROWS TypeError: …
"lch()"              -> THROWS TypeError: …
"color()"            -> THROWS TypeError: …
"oklab()"            -> THROWS TypeError: …
"hsl(  )"            -> THROWS TypeError: …
"oklch(0.7 0.1 200)" -> OK
```

Origin `src/css/grammar.ts:181`:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

`splitTopLevel("", "/")` returns `[]`, so `slash[0]` is `undefined` and the `!` is a lie. The
repo compiles with `noUncheckedIndexedAccess: true` (`tsconfig.base.json:9`) — the compiler *told*
the author this index could be `undefined`, and `!` overrode it.

**The swallow mechanism, exactly.**

1. `demo/color-session/picker-color.ts:109–113` — the boundary converts `Result` → exception:
   ```ts
   export function parsePickerColor(source: string): CssColor {
       const result = parseCssColor(source.trim());
       if (result.ok) return result.value;
       throw new PickerColorError("Invalid CSS color", result.diagnostics);
   }
   ```
   The `TypeError` is thrown *inside* `parseCssColor`, so it escapes before `result.ok` is ever read.
2. `demo/color-session/useColorParsing.ts:84–87` — the undifferentiated catch:
   ```ts
   } catch {
       previousInvalid = input;
       if (!initialParse) flashParseError();
   }
   ```
   A bare `catch {}` with no binding. A library `TypeError`, a `RangeError`, a stack overflow and a
   genuine user typo all render the identical hardcoded string `"not a valid color"`
   (`ColorInput.vue:88`).
3. `useColorParsing.ts:62` — a suppression cache built on top of the mask:
   `if (!input || input === previousInvalid) return;` — after the first `oklch()` the *second*
   attempt is a silent no-op, so even the badge stops appearing.

**The diagnostics loss is total and deliberate-looking.** The library computes structured
`ParseIssue[]`; `parsePickerColor` faithfully attaches them to `PickerColorError.issues`
(`picker-color.ts:97–101`); and then `useColorParsing`'s bare `catch` **discards the error object
entirely** and the UI substitutes a literal. The library did the expensive, careful work of being
failure-explicit and the demo throws every bit of it away.

**Mechanism.** Contract inversion. The library was designed `Result`-returning *so that a UI could
render a specific diagnostic*; the demo re-throws at the boundary, catches undifferentiated, and
renders a constant. The information channel that would have made MT-F001 visible on day one
(a `TypeError` is not a `ParseIssue`) was designed out of the app by construction.

**Proposed cure (transposition, not patch).** Delete `valueOrThrow` and `PickerColorError` from
`picker-color.ts`. `picker-color.ts` returns `Result` unchanged — it is a *thin naming* layer over
the library, not an exception adapter. `useColorParsing.parseAndSetColor` becomes:

```ts
const result = parseCssColor(input);
if (!result.ok) { showDiagnostics(result.diagnostics); return; }
```

No `try`, no `catch`, no `previousInvalid` cache. A `TypeError` from the library then propagates to
Vue's error handler and shows up as a page error in the very audit harness that produced
`REPORT.md` — where "pageErrors — 0" would have been a *real* green instead of a mask. The badge
text comes from `diagnostics`, so `"oklch("` reads *"expected 3 channels"*, not *"not a valid color"*.
(The library-side fix — `slash[0] ?? ""`, or better, `splitTopLevel` returning a non-empty tuple type
— belongs to the `src/css` seat and is out of this seat's write scope.)

---

### L-2 — MAJOR — `demo/ui/` is 19 forwarding directories the architecture explicitly forbids; ColorInput uses three, and all of them route through the root barrel

**Evidence — the spec.** `docs/tranches/V/ARCHITECTURE.md:39`:

> Route leaves live with their feature. There is no `panes/` dumping ground, `demo/@`, TS/Vite
> project alias, `@src`, or **one-line glass-ui forwarding directory**.

**Evidence — the tree.** `ls -d demo/ui/*/ | wc -l` → **19**. `wc -l demo/ui/*/index.ts` → **29 lines
total**. Every one is a bare re-export. Verbatim:

```ts
// demo/ui/popover/index.ts   (entire file)
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
// demo/ui/separator/index.ts (entire file)
export { Separator } from "@mkbabb/glass-ui";
// demo/ui/tooltip/index.ts   (entire file)
export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@mkbabb/glass-ui";
```

There is no local implementation, no variant, no wrapper — nothing but indirection. This is
simultaneously an **edict-2 violation** (aliases / dual paths / shims), an **edict-3 violation**
(contrivance: a directory layer that adds nothing), and an **edict-4 violation** (glass-ui is the
design system — consume it, do not proxy it).

**The dual dialect is live inside one directory.** `demo/shell/dock/` contains both:

- `ActionBarLayer.vue:8` → `import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";` — direct, granular. ✔
- `ColorInput.vue:122,128,129` → `../../ui/popover`, `../../ui/tooltip`, `../../ui/separator` — shim → root barrel. ✘

Two sibling components in the same dock speak two different dialects to the same design system.

**Measured cost.** glass-ui 7.0.0's `exports` map ships granular subpaths for all three
(`'./popover'`, `'./tooltip'`, `'./separator'`, `'./dom'` — verified by reading
`node_modules/@mkbabb/glass-ui/package.json`). Transitive relative-import graph, measured by walking
each entry's `from "./…"` edges:

| entry the shim uses | modules | bytes | entry it should use | modules | bytes |
|---|---:|---:|---|---:|---:|
| `dist/glass-ui.js` (root barrel) | **66** | **224,193** | `dist/popover.js` | 7 | 13,960 |
| " | " | " | `dist/tooltip.js` | 5 | 8,702 |
| " | " | " | `dist/separator.js` | 4 | 6,193 |
| " | " | " | `dist/dom.js` (`writeClipboard`) | 8 | 12,599 |

Honest scoping: glass-ui declares `sideEffects: ["*.css"]`, so the *production* bundle tree-shakes
the JS. The 66-module graph is paid in **dev-server transform + request count** (every ColorInput
HMR touch), and in **`vue-tsc` program size** (the root `index.d.ts` graph is loaded to typecheck a
`Separator`).

**Proposed cure.** Delete `demo/ui/` entirely — all 19 directories, 29 lines. Rewrite the ~14 import
sites (enumerated below) to the granular glass-ui subpaths. `demo/ui/input/index.ts` already proves
the pattern (`from "@mkbabb/glass-ui/forms"`). ColorInput's four edges become:

```ts
import { writeClipboard } from "@mkbabb/glass-ui/dom";
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
import { Separator } from "@mkbabb/glass-ui/separator";
```

Full consumer list (`grep -rn "ui/popover\|ui/tooltip\|ui/separator" demo/ | grep -v "^demo/ui/"`):
`scenes/about/AboutPane.vue:63`, `scenes/about/ColorNutritionLabel.vue:173,179`,
`picker/controls/ComponentSliders/ConsoleRail.vue:90`, `shell/dock/ActionButton.vue:54`,
`shell/dock/ColorInput.vue:122,128,129`, `palettes/browser/slug/PaletteSlugBar.vue:134`,
`palettes/browser/card/CurrentPaletteEditor.vue:181`, `palettes/browser/card/SwatchHoverMenu.vue:61`,
`palettes/browser/search/{TagEditPopover,SearchFilterBar,MiniColorPicker}.vue`.

---

### L-3 — MAJOR — the published type surface duplicates the whole colour model per subpath, and `CssColor` is keyed on a *private duplicate*

This is on ColorInput's own parse path: `picker-color.ts` imports `AnyColor` from
`@mkbabb/value.js/color` and `CssColor` from `@mkbabb/value.js/css`, then feeds one into the other.

**Evidence.** `grep -n "declare type Color\|declare type SpaceId" dist/subpaths/css.d.ts`:

```
 34:    [S in SpaceId]: Color<S>;
102: declare type Color<S extends SpaceId> = Readonly<{ … }>;
108: declare type Color_2<S extends SpaceId_2> = Readonly<{ … }>;
135: export declare type CssColor = {
136:     [S in CssColorSpace]: Color_2<S>;     ← the EXPORTED type keys on the duplicate
137: }[CssColorSpace];
321: declare type SpaceId   = "rgb" | "hsl" | … | "jzazbz";
323: declare type SpaceId_2 = "rgb" | "hsl" | … | "jzazbz";   ← byte-identical duplicate
```

Per-subpath re-declaration count across the whole published surface:

```
color.d.ts       SpaceId=1  Color=3  Channel=2   4,275 B
css.d.ts         SpaceId=2  Color=3  Channel=4  12,490 B
quantize.d.ts    SpaceId=1  Color=1  Channel=2   2,400 B
value.d.ts       SpaceId=1  Color=1  Channel=2   2,271 B
```

Four of the seven public subpaths each carry a *private copy* of the colour model. There is no shared
declaration. A consumer who writes `function f(c: Color)` against `/color` and passes the result of
`/css`'s `parseCssColor` is relying on structural compatibility between two unrelated nominal
declarations that the library never promised to keep aligned.

**It is a regression since publish.** `diff` of the published 4.0.0 twin against the local build:

```
$ diff node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts dist/subpaths/css.d.ts
2a3,4   > declare type Alpha_2 = number | "none";
36a39,40 > declare type Channel_2 = number | "none";
56a61,80 > declare type ChannelsBySpace_2 = { … 17 spaces … };
83a108,113 > declare type Color_2<S extends SpaceId_2> = Readonly<{ … }>;
106c136
<     [S in CssColorSpace]: Color<S>;        ← published 4.0.0: keyed on Color
---
>     [S in CssColorSpace]: Color_2<S>;      ← local build: keyed on the duplicate
291a322,323 > declare type SpaceId_2 = …;
```

Published 4.0.0 has **one** model in `css.d.ts`. The current build has **two**. +1,580 bytes of pure
duplication (10,910 → 12,490).

**Mechanism.** `vite.config.ts` sets `dts({ …, rollupTypes: true })` and lists seven independent
entry points. `rollupTypes` flattens each entry's graph *independently*, so every shared source
declaration is re-emitted per entry, and when one entry reaches the same source module by two paths
the flattener de-conflicts by suffixing (`_2`) rather than unifying. The public API's nominal
identity is therefore an artefact of the bundler's traversal order.

**Reproduction:** `npm run build` then `grep -c "declare type SpaceId" dist/subpaths/css.d.ts` → `2`.

**Proposed cure.** The colour model is one concept and must have one declaration. Either (a) add an
eighth internal entry (`src/subpaths/_model.ts`) exporting `SpaceId`/`Color`/`Channel`/`Alpha`/
`ChannelsBySpace`, have the other seven `export type { … } from "./_model"`, and drop `rollupTypes`
for those re-exports; or (b) drop `rollupTypes: true` outright and ship the real module graph — the
declarations then reference one physical `color/model.d.ts` and `Color_2` cannot exist. (b) is the
KISS answer: `rollupTypes` exists to hide the module graph, and hiding the graph is what manufactured
the duplicate.

---

### L-4 — MAJOR — `tsconfig.demo.json#paths` is a hand-maintained third copy of the exports map: 3 phantom keys, 2 missing keys

`package.json#exports` is a closed **7**-key set: `./color ./value ./css ./easing ./math ./transform
./quantize`. There is **no `.` root key**. `vite.config.ts` generates its alias set from that map
(good — the comment at `vite.config.ts:26-34` says so explicitly and explains why).

`tsconfig.demo.json` then hand-declares **8** keys. Cross-checked against the map:

| tsconfig `paths` key | in `exports`? | target file exists? |
|---|---|---|
| `@mkbabb/value.js` (bare root) | **NO** | **NO** — `ls dist/index.d.ts` → *No such file or directory* |
| `@mkbabb/value.js/parsing` | **NO** | **NO** — no `dist/subpaths/parsing.d.ts` |
| `@mkbabb/value.js/units` | **NO** | **NO** — no `dist/subpaths/units.d.ts` |
| `@mkbabb/value.js/color` | yes | yes |
| `@mkbabb/value.js/math` | yes | yes |
| `@mkbabb/value.js/easing` | yes | yes |
| `@mkbabb/value.js/transform` | yes | yes |
| `@mkbabb/value.js/quantize` | yes | yes |
| **`@mkbabb/value.js/css`** | yes | **MISSING from `paths`** |
| **`@mkbabb/value.js/value`** | yes | **MISSING from `paths`** |

Three phantom keys advertise a public surface the runtime cannot serve: Vite's generated alias set
has no `.`, `/parsing` or `/units` entry, and `package.json#exports` has no `.` key, so a demo file
that writes `import … from "@mkbabb/value.js"` would be *type-legal per `paths`* (pointing at a
non-existent `.d.ts`) and a **hard boot break** at runtime. The config actively misdescribes the
package to its own consumer.

**`/css` — the subpath ColorInput's entire parse path depends on — has no `paths` entry at all, and
typechecks only by accident.** `npx tsc -p tsconfig.demo.json --noEmit --traceResolution`:

```
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '…/demo/color-session/package.json' does not exist.
File '…/demo/package.json' does not exist.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.     ← the repo's OWN
Entering conditional exports.  Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … successfully resolved to '…/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`paths` misses; TypeScript falls through to **Node self-name resolution** and finds the repo's own
`package.json#exports`. It lands on the right file — *by luck of the fallback order*, not by design.
Compare the other five, which come from `paths` and carry no Package ID:

```
'@mkbabb/value.js/color'    → …/dist/subpaths/color.d.ts        (no Package ID — paths hit)
'@mkbabb/value.js/css'      → …/dist/subpaths/css.d.ts   with Package ID @4.0.0  (self-resolution)
```

**Proposed cure.** Delete the entire value.js `paths` block from `tsconfig.demo.json`. It is not
load-bearing — the trace above proves self-name resolution through `package.json#exports` already
resolves the subpaths correctly and is the *only* map that cannot drift, because it is the same map
npm publishes. One source of truth, zero hand-maintained mirrors. (The Vite alias set is likewise
redundant with self-reference under Vite 5+, but that is a wider blast radius; at minimum it is
*generated* from the map, so it cannot drift the way `paths` has.)

---

### L-5 — MAJOR — a stale published twin of value.js 4.0.0 lives in the repo's own `node_modules`, and `vitest.config.ts` has no alias to steer around it

```
$ ls -la node_modules/@mkbabb/
drwxr-xr-x  glass-ui        REAL DIRECTORY (installed copy)
drwxr-xr-x  keyframes.js    REAL DIRECTORY (installed copy)
drwxr-xr-x  value.js        REAL DIRECTORY (installed copy)   ← the repo, installed into itself
```

Not a symlink. A real, frozen, registry-installed copy of `@mkbabb/value.js@4.0.0` dated **Jul 17**,
while the local build is **Jul 24**. `@mkbabb/value.js` appears **nowhere** in this repo's
`dependencies` or `devDependencies` — it is hoisted from a sibling:

```
node_modules/@mkbabb/keyframes.js/package.json → dependencies: { "@mkbabb/value.js": "4.0.0" }
node_modules/@mkbabb/glass-ui/package.json     → peerDependencies: { "@mkbabb/value.js": "^4.0.0" }
```

The twin's bytes differ from the local build:

```
$ cmp dist/subpaths/css.js    node_modules/@mkbabb/value.js/dist/subpaths/css.js    → DIFFERENT
$ cmp dist/subpaths/css.d.ts  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts  → DIFFERENT
   local 12,490 B (Jul 24)   vs   twin 10,910 B (Jul 17)     ← the L-3 delta
```

Today the twin is dodged by three separate accidents: Vite's anchored-regex alias set wins at
runtime; TS self-name resolution wins at typecheck (L-4); and the Vite alias also intercepts
glass-ui's and keyframes' own bare `@mkbabb/value.js/{color,css,easing}` specifiers (verified: those
are the only three specifiers glass-ui's dist emits — all real keys). **`vitest.config.ts` has no
`@mkbabb/value.js` alias at all** (read in full: it aliases only `@src`), so the test program's
resolution of the published surface is governed by a fourth, entirely different mechanism than the
one the app uses.

**Mechanism.** A package that consumes its own published surface through bare specifiers has an
inherent identity hazard: `node_modules` will always try to satisfy the name, and every tool
(vite / vue-tsc / vitest / node / eslint-import) must be *individually* taught not to. Four tools,
three maps, one stale twin.

**Proposed cure.** One generated map, consumed by all three configs. `vite.config.ts` already derives
`valueJsSelfAlias` from `package.json#exports`; lift that eight-line derivation into
`vite.self-alias.ts` and import it from `vite.config.ts` **and** `vitest.config.ts`; delete the
`paths` mirror per L-4. Then there is exactly one description of the public surface in the repo, and
it is `package.json#exports`.

---

### L-6 — MAJOR — the component hand-rolls a text input the design system already ships, reimplementing three native platform features

ColorInput is a `<span contenteditable role="textbox">` (line 11–27). Consequences, each a
reimplementation:

1. **`placeholder`** — reimplemented as `data-placeholder` + CSS (`ColorInput.vue:261,264` set/remove
   the attribute imperatively; `:321-325` renders it via `.color-input:empty[data-placeholder]::before`).
2. **`input.select()`** — reimplemented in 10 lines with the Range/Selection API (`:168-177`),
   including a hand-rolled idempotence guard (`if (selection?.toString() === target.innerText) return`).
3. **Value binding** — reimplemented as **four separate imperative `innerText` writes**:
   `:191` (blur snap-back), `:240` (post-propose), `:260`/`:265` (mode watch), `:272` (formatted
   watch), `:278` (`onMounted`). Five sites, one concept: *what text is in the field*. The comment at
   `:185-189` is a nine-line explanation of why the blur write is needed to defeat the focused-skip
   in the `:270` watch — a repair for a problem that only exists because the DOM holds state Vue does
   not own.

glass-ui ships `Input` — `demo/ui/input/index.ts` is literally
`export { Input } from "@mkbabb/glass-ui/forms";` — so the design-system primitive is not merely
available, it is *already forwarded in this repo*.

**The dual path is threefold.** `grep -rln contenteditable demo/` → **3** hand-rolled implementations:
`shell/dock/ColorInput.vue`, `picker/display/ColorComponentDisplay/ColorComponentDisplay.vue:23`
(also `contenteditable` + `role="textbox"` + `aria-label`, with an inline
`(e.target as any).innerText` handler at `:32`), and
`workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue:88`. Three implementations of
"editable text", no shared primitive, three different casts of `e.target`.

**Proposed cure.** Replace the `<span contenteditable>` with glass-ui `Input` bound to a
`shallowRef` (the `defineModel` async round-trip caveat applies — memory records it for
`useColorModel`). That deletes: `selectAll()` (native `select()`), the `data-placeholder` attribute
dance and its CSS (`placeholder=`), `role="textbox"` (native), and four of the five `innerText`
writes (one `v-model`). Net ≈ −60 lines from a 377-line file. If the centred/masked overflow presentation
is the reason for `contenteditable`, that is a **glass-ui `Input` variant** (edict 4: variants belong
in the design system), not a bespoke DOM widget in a dock leaf.

---

### L-7 — MAJOR — the colour-name domain is split across two homes; the write half lives in a shell leaf and discards a typed RFC-7807 error

`useCustomColorNames.ts` owns the colour-name registry: `loadFromAPI`, `findCustomName`,
`getMetadata`, `reset`, plus module-level state (`customNameRegistry`, `normalizedCustomNames`,
`loaded`). That is the **read** half.

The **write** half — `submitProposedName` — lives at `ColorInput.vue:230-247`, in a dock component:

```ts
async function submitProposedName() {
    if (!proposedName.value.trim() || proposing.value) return;
    proposing.value = true;
    try {
        await session.ensureSession();
        const cssStr = serializePickerColor(currentPhysicalColor.value);
        await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
        …
    } catch (e: any) {
        console.warn("[ColorInput] Failed to propose name:", e?.message);
    } finally { proposing.value = false; }
}
```

Three defects in fifteen lines:

- **Split ownership.** One concept ("the custom colour-name registry") has two homes, and the shell
  one owns session bootstrap, normalisation (`.trim().toLowerCase()`), serialisation and transport
  orchestration. `demo/color-session/color-names.ts:1-9` states the intended law in its own header —
  *"This is a color-session concern, not a palette concern"* — and the write half still escaped to
  `shell/`.
- **`catch (e: any)`** at `:242`. `tsconfig.base.json:6` sets `strict: true`, which implies
  `useUnknownInCatchVariables` — the annotation is an explicit opt-*out* of the repo's own strictness.
  It is a repo-wide idiom (10+ sites: `SlugEditLayer.vue:57`, `palettes/useColorNameQueue.ts` ×5, …),
  which is the tell that `platform/transport` is not exposing its error type usefully.
- **The error information is thrown away — again (Mechanism A).** `demo/platform/transport/client.ts`
  throws a **typed `ApiProblem` (RFC 7807)** carrying `title`/`detail`/`status`/`type`, or a typed
  `ApiUnavailableError`. The leaf reduces all of it to `e?.message` on the console. **The user is
  given no feedback whatsoever** — the spinner stops, the field does not clear, and nothing says the
  proposal failed. Same shape as L-1: a carefully typed failure channel, collapsed to nothing at
  the leaf.

**Proposed cure.** Move `submitProposedName` into `useCustomColorNames` as
`proposeName(name, color): Promise<Result<ProposedColorName, ApiProblem>>` — one home for the
registry, read and write. The composable owns normalisation, `ensureSession`, serialisation and the
in-flight flag; ColorInput binds `proposing` and renders `problem.title` in the same error-badge slot
it already has. Delete `catch (e: any)`.

---

### L-8 — MINOR — dead public surface: a prop drilled two layers into nothing, two dead injections, and a five-member `defineExpose` with zero readers

| Dead surface | Evidence |
|---|---|
| `editTarget` prop | Declared `ColorInput.vue:139`. `grep -n "editTarget\|edit-target" ColorInput.vue` returns **exactly that one line** — never destructured, never read in template or script. `ActionBarLayer.vue:14` declares it, `:118` binds `:edit-target="editTarget"`, and `Dock.vue` passes it down. Three layers of plumbing to a hole. An injection key for the very same concept already exists and is unused here: `EDIT_TARGET_KEY` (`color-session/keys.ts:16`). |
| `cssColorOpaque` | Destructured from the inject at `:146`, referenced nowhere else. |
| `canProposeName` | Destructured at `:150`, referenced nowhere else. |
| `defineExpose` (5 members) | `:282-288` exposes `focus`, `inputIsFocused`, `copyAndSetInputColor`, `onSubmitColor`, `submitProposedName`. `ActionBarLayer.vue:28` declares `colorInputRef` and `:116` binds it — **and never reads it**. `grep -rn "copyAndSetInputColor\|inputIsFocused" demo/ \| grep -v ColorInput.vue` → **zero hits**. The whole exposed API is dead, including `copyAndSetInputColor` (`:219-223`), which is the *only* reason `writeClipboard` and `updateModel` are imported. |
| `actionToolbarRef` | `ActionBarLayer.vue:29` — same pattern, bound at `:103`, never read. |

Deleting the dead surface removes ColorInput's `@mkbabb/glass-ui` root-barrel import (L-2 edge #2) and
its `updateModel` dependency outright.

---

### L-9 — MINOR — god-object injection, and two spellings of "the current colour" in one component

`COLOR_MODEL_KEY` is typed `InjectionKey<UseColorPipelineReturn>` (`keys.ts:6`), and
`useColorPipeline`'s return is a **40-member** object (`useColorPipeline.ts:281-332`, 335 lines).
ColorInput injects the whole thing to use 11 names, of which 2 are dead (L-8) and 1 more dies with
`copyAndSetInputColor`. There is no encapsulation boundary: every dock leaf can reach every pipeline
capability, so the pipeline can never be decomposed without auditing every consumer.

Related, inside this component: the field renders `formattedCurrentColor` (which prefers a *custom
name* — `useColorNameResolution.ts:34-47`) while the popover eight lines below renders
`serializePickerColor(currentPhysicalColor)` (`ColorInput.vue:104`) — the raw CSS spelling. Two
different answers to "what colour is this?" in one 377-line component, sourced from two different
places. The popover value is not derivable from the field value.

**Proposed cure.** Narrow the injection to a purpose-shaped interface — `ActionBarContext` already
exists in `keys.ts:18-28` as the pattern — and put the raw-vs-named distinction in the pipeline as
two named computeds (`cssSpelling` / `displayLabel`) rather than one composed inline at the leaf.

---

### L-10 — MINOR — the send button has no accessible name (matches the visual audit's live row)

`ColorInput.vue:67-82`: two icon-only `<button>`s (`Loader2`/`ArrowRight`), no `aria-label`, no text.
The propose-toggle two files up carries a carefully computed three-way `:aria-label`
(`ActionBarLayer.vue:130`); this one has none.

**Live confirmation** at `http://localhost:9000/#/` — enumerating every `<button>` with no
`aria-label` and no text:

```json
{ "cls": "send-btn btn-interactive",
  "parentCls": "relative w-full flex items-center cursor-default",
  "rect": "24x24" }
```

`.send-btn` inside `.relative w-full flex items-center cursor-default` is exactly `ColorInput.vue:67`
+ `:10`. This corresponds to the `namelessButtons — 18` block in
`docs/tranches/V/megatranche/audit/visual/REPORT.md:94-113` (`safari-desktop-light /#/: 1`, and one
on every desktop route the dock renders on). Measured 24×24 — at the tap-target floor.

---

### L-11 — MINOR — `ActionBarLayer` re-implements the retired glass-ui `useLayerTransition` locally (named suspect: confirmed)

`ActionBarLayer.vue:63-84` defines a local `function useLayerTransition(...)` — the challenge brief's
named historical suspect, confirmed present. Its own header comment (`:53-62`) documents it honestly:
glass-ui 7 folded the composable into `DockCrossfade` and offers no public successor, so the demo
holds a shim with "signature parity with the retired producer composable" — including
`void opts.containerEl;`, a parameter accepted only to match a signature nothing else uses.

The load-bearing defect is the constant:

```ts
const SUB_LAYER_CROSSFADE_MS = 260;
```

a JS timer that must stay equal to a CSS transition duration owned by glass-ui, in another repo, that
this file cannot read. Nothing enforces the equality. When glass-ui retimes the crossfade, this
silently desynchronises and `leavingLayer` clears early or late.

Relay-worthy under the standing BH/BI edict: **glass-ui should expose either a content-swap composable
or the duration as a token** so the consumer reads it instead of copying it.

---

## 3. The greenfield lattice

If I were structuring this today with no legacy, ColorInput's neighbourhood would be:

```text
@mkbabb/value.js/css ── parseCssColor(): Result<CssColor, ParseIssue[]>
        │  (Result crosses every boundary; nothing converts it to an exception)
        ▼
color-session/
  color.ts              # PickerColor/PickerSpace naming over the library. NO valueOrThrow,
                        # NO PickerColorError. Result in, Result out. (~120 lines,
                        # from picker-color.ts minus the exception adapter)
  useColorParsing.ts    # parse(input) -> Result; no try, no catch, no `previousInvalid` cache
  useColorNames.ts      # ONE home: read (registry/find/meta) AND write (proposeName ->
                        # Result<ProposedColorName, ApiProblem>) — merges today's
                        # useCustomColorNames + useColorNameResolution + ColorInput's
                        # submitProposedName
  session.ts            # the narrow context a dock leaf may inject:
                        #   { displayLabel, cssSpelling, parse, propose, meta }
                        # NOT the 40-member pipeline
        ▼
shell/dock/
  ColorInput.vue        # ~140 lines. glass-ui <Input v-model> (shallowRef).
                        # No contenteditable, no Range/Selection, no data-placeholder,
                        # no innerText writes, no defineExpose, no editTarget prop.
                        # Renders diagnostics from the Result it is handed.
  ParseEchoReadout.vue  # unchanged — it is already correctly shaped
```

with **no `demo/ui/` layer at all**: `@mkbabb/glass-ui/{popover,tooltip,separator,forms,dom,dock}`
imported directly at every leaf, one dialect.

And, at the repo level, **one** description of the published surface:

```text
package.json#exports  ─┬─ vite.self-alias.ts  (generated; imported by vite.config.ts AND vitest.config.ts)
                       └─ TS self-name resolution  (no `paths` mirror at all)
```

Three transpositions carry most of the value, in order:

1. **Stop converting `Result` to exceptions.** Deleting `valueOrThrow`/`PickerColorError` and the two
   bare `catch` blocks is a net *deletion* that turns MT-F001 from an invisible mask into a page error
   the existing audit harness already reports, and turns "not a valid color" into a real diagnostic.
2. **Delete `demo/ui/`.** 19 directories, 29 lines, ~14 import sites rewritten. Removes a forbidden
   construct, collapses the dual dialect inside `shell/dock/`, and shrinks the dev module graph 66→7
   for a popover.
3. **Delete the `paths` mirror and hoist the alias generator.** One map, four tools, zero drift, and
   the stale self-installed twin becomes structurally unreachable rather than accidentally dodged.

---

## 4. Negative proof — what is genuinely sound here

Stated positively so the report is not read as uniformly damning:

- **The published-surface discipline holds at this component.** ColorInput reaches
  `@mkbabb/value.js` only through `picker-color.ts`, which imports `@mkbabb/value.js/color` and
  `@mkbabb/value.js/css` — both real keys in `package.json#exports`. `grep -rn '@src/' demo/shell/`
  and the trace in §L-4 confirm **no deep import into `src/`**, no `demo/@`, no path alias. The T.W1
  demo-dogfood keystone is intact on this path: **every value.js import in this component's graph is
  one a real npm consumer could write verbatim.** The public-surface defects found (L-3, L-4) are in
  how the surface is *described and emitted*, not in how this component consumes it.
- **The import direction law is not violated.** `shell → color-session / platform / shared`
  (`ARCHITECTURE.md:60-66`) holds for all twelve edges; there is no `shell → feature` or
  `shell → picker` reach, and no cross-feature internal import.
- **`verbatimModuleSyntax` is satisfied.** The one type-only import (`EditTarget`, `:134`) is
  `import type`. `npx tsc -p tsconfig.demo.json --noEmit` completes with no diagnostics on this file.
- **Vue 3.5 idioms are used correctly in the component itself**: `useTemplateRef` (`:159`), reactive
  props destructure (`:138`). (`ActionBarLayer` still uses `ref<InstanceType<…>>` for its two dead
  refs — but they are dead.)
- **The animation law is honoured.** `input-mode-flash` and `crown-appear` are scoped keyframes that
  legitimately remain in the component; the `T.W5-R5` comment block (`:327-334`) documents a
  bespoke hover/press recipe *retired onto* the producer `btn-interactive` atom with the seat geometry
  kept — that is the edict-6 "moved or tokenized, never deleted" pattern executed correctly, and it
  is a model for how L-6 should be resolved.
- **The app does not crash on MT-F001.** 0 page errors, 0 console errors across the full typing
  sequence. The defect is that this green is manufactured by a mask, not that the app is unstable.

---

## Appendix — reproduction scripts

Both are in the session scratchpad and are self-contained (require only the dev server on `:9000`
for the second):

- `…/scratchpad/repro.mjs` — the 10-input `parseCssColor` matrix against the **published**
  `dist/subpaths/css.js`. `node repro.mjs`.
- `…/scratchpad/mt-f001.mjs` — the full live gesture chain (Playwright/chromium 1440×900):
  open dock action bar → reveal ColorInput → click → type `oklch()` → Enter → observe badge, border,
  console, page errors, and the post-debounce state. `node mt-f001.mjs`.

---
---

# CHALLENGE-L · SECOND PASS

## Model receipt (second pass)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`). Explicitly declared, matches the served
seat. **Not a defect.**

This section is an **additive second pass over the same axis and the same component**. The first
pass above (L-1 … L-11) stands; I re-derived its central claims independently and they hold. What
follows is what the first pass did not have: **two new defects** (one of which *refutes* a line in
the first pass's negative proof), **one measurement** that upgrades L-1 from an anecdote to a
characterised idiom, and **a durable, re-runnable reproduction harness** replacing the two one-shot
scratchpad scripts (which do not survive the session).

---

## L-12 — MAJOR — the crown entrance animation is **dead by construction**: a `<style scoped>` `@keyframes` referenced from an *inline* `style` attribute

**This refutes §4's "The animation law is honoured."** `input-mode-flash` is honoured.
`crown-appear` is not — it never runs, on any device, in any browser, and has not since it was
written.

`ColorInput.vue:36-39` binds the animation **inline on the element**:

```html
<Crown :key="crownKey" class="absolute right-2 top-1/2 …"
       style="animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards;" />
```

`ColorInput.vue:369-376` defines `@keyframes crown-appear` inside `<style scoped>`. Vue's SFC
compiler **hash-suffixes scoped keyframe names** and rewrites `animation`/`animation-name`
declarations *within the same style block* — it does **not** process `style` attributes in the
template. The compiled stylesheet the dev server actually serves shows both halves of the divergence
in one file:

```
$ curl -s "http://localhost:9000/@fs/Users/mkbabb/Programming/value.js/demo/shell/dock/ColorInput.vue?vue&type=style&index=0&scoped=55dadc03&lang.css"
…
.color-input-mode-flash[data-v-55dadc03] {
  animation: input-mode-flash-55dadc03 var(--duration-slow) var(--ease-decelerate);   ← class-driven: REWRITTEN, works
}
@keyframes input-mode-flash-55dadc03 { … }
…
@keyframes crown-appear-55dadc03 { 0% { opacity: 0; … }                              ← definition renamed
```

The inline attribute still asks for the **unhashed** `crown-appear`. Enumerating every registered
`CSSKeyframesRule` in the live document (all stylesheets, all 54 rules):

```js
// evaluated at http://localhost:9000
{ "exactCrownAppear": false, "crownLike": ["crown-appear-55dadc03"], "totalKeyframes": 54 }
```

And there is no global fallback definition — `grep -rn "crown-appear" demo/` returns exactly three
hits: `ColorInput.vue:38` (the inline reference), `ColorInput.vue:369` (the scoped definition), and
`DESIGN.md:213` (prose: *"`var(--duration-panel)` — 550 ms (dock expand, ColorInput crown-appear)"*).
`demo/styles/animations.css` — the declared home for global keyframes — does not contain it.

`animation-name: crown-appear` therefore resolves to nothing. The Crown appears by a hard cut. The
design intent (`0% scale(0) rotate(-15deg)` → `40% scale(1.4)` gold drop-shadow overshoot → settle)
is authored, reviewed, documented in `DESIGN.md`, and **has never been seen by anyone**.

**Mechanism.** Wrong home for a keyframe, forced by a per-instance inline style. A scoped
`@keyframes` can only be consumed from a *class rule in the same block*; an inline `style` attribute
can only consume a *global* keyframe. Pairing the two is unsatisfiable by construction. This is
**edict 6** in substance (an animation deleted by construction, not by anyone's decision) and
**edict 5** (a per-instance inline override where a root-level class belongs).

**Cure.** `crown-appear` is a design-language beat, not seat geometry: promote it to
`demo/styles/animations.css` (which exists and is the declared home) and drive it from a
`.crown-badge` class. The inline `style` attribute dies with it. Rule of thumb the codebase should
adopt: *if it is inline, the keyframe must be global; if the keyframe is scoped, the reference must
be a class in the same block.* No third combination is legal.

**Reproduction.** `curl` the scoped-style module URL above (dev server on `:9000`), and evaluate the
`document.styleSheets` keyframe census in any live page.

---

## L-13 — INFO — the library has **zero** negative-space coverage for the degenerate functional colour

```
$ grep -rn 'oklch()\|"lab()"\|rgb()' test/
(no matches)
```

Six files in `test/` mention `parseCssColor` at all (`v4-c1`, `v4-css-public`,
`gradient-v4-consume`, `ink`, `preview-chips`, `view-accents`). The single input class that crashes
the shipping library — an empty or whitespace-only functional body — is untested on the public
surface. A four-line table closes it permanently:

```ts
it.each(["oklch()", "rgb()", "hsl()", "lab()", "lch()", "color()", "oklab()", "hsl(  )"])
  ("%s fails as a Result, never a throw", (s) => expect(parseCssColor(s).ok).toBe(false));
```

This is a library-structure finding rather than a component one, but it is the reason MT-F001 could
reach a shipping blocker through *this* component: neither side of the boundary was watching. The
demo masks the throw (L-1); the library never asserted it could not happen.

---

## L-1 supplement — the `!` is not a typo, it is a characterised idiom in the wrong module

The first pass correctly names `noUncheckedIndexedAccess: true` and the `slash[0]!` lie. Measured
density, per `src/` file (`]!` index non-null assertions, count and file length):

```
113  609  src/transform/decompose.ts     18.6 / 100 lines   (internally-constructed matrices)
 70  483  src/css/grammar.ts             14.5 / 100 lines   ← THE untrusted-input boundary
 35  564  src/transform/path.ts
 18  139  src/quantize.ts
 12  899  src/css/stylesheet.ts
 11  377  src/color/anchors.ts
```

`grammar.ts` is the **only** module in the package that consumes an arbitrary user-supplied string,
and it is the second-densest `!` site in the tree. `decompose.ts` outranks it in raw count but
operates exclusively on values the library itself constructed; there is no adversary on that path.
The compiler was configured to model exactly this risk (`tsconfig.base.json:10`) and was overridden
70 times in the one file where it was right.

**Cure (structural, one line of config).** An eslint override banning
`@typescript-eslint/no-non-null-assertion` for `src/css/grammar.ts` and `src/css/syntax.ts` alone.
The parser is where the type system must be allowed to win; the current posture is defensible
everywhere else. This is the enforcement half of the first pass's L-1 cure — the demo stops masking,
and the library stops manufacturing the thing being masked.

---

## Durable reproduction harness (replaces the scratchpad scripts)

The first pass's `repro.mjs` / `mt-f001.mjs` live in a session scratchpad and will not survive.
Committed equivalents now sit beside this report and can be re-run by any later seat:

- `docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/probe.vitest.config.ts`
- `docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/parse-swallow.probe.ts`

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/probe.vitest.config.ts
 ✓ docs/…/parse-swallow.probe.ts (5 tests) 8ms
 Test Files  1 passed (1)
      Tests  5 passed (5)
```

It drives the **real** `useColorParsing` composable and the **real** `picker-color` façade against
the **published** `dist/subpaths/{color,css}.js`, and proves five propositions:

1. `parseCssColor` throws `TypeError` on all eight degenerate bodies, while `"oklch("` and
   `"notacolor"` correctly return `ok:false`. **The crash is narrower than the failure path and
   therefore invisible beside it** — this is precisely why it survived review.
2. `parsePickerColor` re-throws a raw `TypeError`, **not** `PickerColorError`. The typed error and
   its `issues` payload never fire on this path, so even a diagnostics-reading consumer would learn
   nothing.
3. With the `initialParse` gate already burned, all eight crashers leave the model **object-identical**
   (`toBe`) and set the same boolean a typo sets. `library crashed` and `user mistyped` are the same
   value.
4. In isolation, the **first** `parseAndSetColor` of a composable's life leaves `parseError === false`
   — total silence. *In the shipping app this gate is burned during boot* by the
   `model.value.inputColor` watcher (`ColorPicker.vue:356-361`), which is why the first pass's live
   run correctly observed the badge. The gate is a latent silencer, not the live one — recorded so a
   later seat does not "fix" the wrong half.
5. A **repeat** of the same crasher early-returns on `previousInvalid` (`useColorParsing.ts:62`):
   the second Enter does *literally nothing* — no badge, no console, no model change. This is the
   user-visible silence, and it is the state a frustrated user reaches within two seconds of the
   first failure.

---

## Second-pass corrections to §4 (negative proof)

- **"The animation law is honoured"** — **withdrawn for `crown-appear`** per **L-12**, measured. It
  stands for `input-mode-flash` and for the `T.W5-R5` `btn-interactive` retirement, both of which are
  genuinely exemplary.
- Everything else in §4 I independently re-verified and confirm. In particular the published-surface
  claim, which I re-derived by a full transitive cone walk from `ColorInput.vue` (26 internal
  modules: 14 `color-session`, 6 `platform`, 3 `demo/ui` barrels, 2 `shell`, 1 `shared`). The
  complete set of value.js specifiers anywhere in that cone is:

  ```
  @mkbabb/value.js/color  ← demo/color-session/{picker-color,generate-color}.ts
  @mkbabb/value.js/css    ← demo/color-session/{picker-color,generate-color}.ts
  ```

  Both are real `exports` keys; zero `@src` edges; zero deep paths. **A real npm consumer could write
  every value.js import in this component's graph verbatim.** That half of the challenge premise does
  not hold, and it deserves to be said twice.

- One additional datum for the cone: **23 of the 26 modules are outside `demo/shell`**. The component
  is filed under the shell but is, by mass, a `color-session` view that the dock merely hosts — which
  is the structural argument behind §3's greenfield placement, now with a number attached.

---

## Second-pass finding index

| id | severity | one line |
|---|---|---|
| L-12 | MAJOR | `crown-appear` never runs — scoped `@keyframes` referenced from an inline `style` attribute; measured live (54 keyframes registered, unhashed name absent). Refutes §4. |
| L-13 | INFO | Zero library tests cover the eight degenerate functional bodies; the public surface never asserted the throw could not happen. |
| L-1 suppl. | — | The `!` is a characterised idiom: 70 index-assertions in 483 lines of `grammar.ts`, the package's only untrusted-input boundary. Cure is one eslint override. |

---
---

# CHALLENGE-L · THIRD PASS

## Model receipt (third pass)

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context). The seat was spawned with an
explicit Opus 5 declaration and the declaration matches the served model. Not an inherited or
undeclared seat. **Not a defect.**

**Additive, same axis, same component.** I re-derived L-1 (the swallow), L-2 (`demo/ui/`), L-4
(`paths` drift), L-5 (the self-installed twin), L-8 (dead surface), L-10 (nameless send button) and
L-11 (the local `useLayerTransition`) independently before reading the first two passes, and every
one of them holds — my numbers agree with theirs. I do **not** restate them.

What follows is the part of the *library-structure* axis the first two passes did not reach:
**four new findings** (one MAJOR, two MINOR, one that is a live behavioural bug caused by Mechanism A
and therefore raises its stakes), plus one hard negative proof that the first pass's §3 assumed
rather than measured.

The organising claim of this pass: **the first two passes indicted how the surface is *described* and
how the demo *handles failure*. They did not ask whether the surface is *wide enough*. It is not —
the library privately owns four primitives that the demo is currently re-writing by hand, and the
duplication is measurable.**

---

## L-14 — MAJOR — the library holds four primitives private; the demo is forced to re-derive them, and the CSS-space set now has three homes

`src/color/model.ts` already contains the generic constructor and the space registry that
`demo/color-session/picker-color.ts` spends ~57 lines re-implementing (lines 40-70, 92-95, 123-144).
They are written, exercised internally, and **not exported**:

| Symbol | Written at | Re-exported by `src/color/index.ts`? | In `src/subpaths/color.ts`? |
|---|---|---|---|
| `SPACE_SCHEMA` | `src/color/model.ts:57` | **no** | **no** |
| `SPACE_IDS` | `src/color/model.ts:76` | **no** | **no** |
| `isAnyColor` | `src/color/model.ts:127` | **no** | **no** |
| `makeColor` | `src/color/model.ts:136` | **no** | **no** |

Proven against the shipped bundle, not the source:

```
$ node -e "const m = await import('./dist/subpaths/color.js');
           console.log('makeColor:', typeof m.makeColor, '| SPACE_SCHEMA:', typeof m.SPACE_SCHEMA,
                       '| isAnyColor:', typeof m.isAnyColor, '| SPACE_IDS:', typeof m.SPACE_IDS);
           console.log('exports:', Object.keys(m).join(' '))" --input-type=module

makeColor: undefined | SPACE_SCHEMA: undefined | isAnyColor: undefined | SPACE_IDS: undefined
exports: a98Rgb convertColor displayP3 hsl hsv hwb ictcp interpolateHue jzazbz kelvin lab lch
         linearSrgb mapColorToGamut mixColors oklab oklch prophotoRgb rec2020 rgb safeAccentColor
         toRgba8 xyz
```

Three consequences, all inside this component's dependency cone.

**(a) `buildColor` is `makeColor` re-typed by hand.** `picker-color.ts:123-144` — a 22-line, 17-arm
`switch` that dispatches a `SpaceId` onto the seventeen named factories, one arm per space, purely
because the generic constructor is private:

```ts
function buildColor(space: SpaceId, channels: readonly Channel[], alpha: Alpha): AnyColor {
    const c = (index: number) => channels[index] ?? "none";
    switch (space) {
        case "rgb": return valueOrThrow(rgb(c(0), c(1), c(2), alpha));
        …15 more…
        case "jzazbz": return valueOrThrow(jzazbz(c(0), c(1), c(2), alpha));
    }
}
```

`src/color/model.ts:136` is that function, already written, already `Result`-returning:

```ts
export function makeColor<S extends SpaceId>(space: S, channels: ChannelsBySpace[S], alpha: Alpha):
    Result<Color<S>, ColorIssue> { return createColor(space, channels, alpha); }
```

One line replaces twenty-two. `buildColor` is also the sole reason `picker-color.ts:1-27` imports all
seventeen named factories — deleting it deletes seventeen import bindings.

**(b) `PICKER_CHANNELS` re-declares channel names and hue positions that `SPACE_SCHEMA` freezes.**

```ts
// src/color/model.ts:65 (private)
oklch: { channels: ["l", "c", "h"], hueIndex: 2, css: true },
// demo/color-session/picker-color.ts:60 (the hand-kept twin)
oklch: [percent("l"), unit("c", 0, 0.5), hue()],
```

Seventeen rows, hand-synchronised, no compiler linking them. The min/max/unit half is legitimate UI
knowledge — except that `docs/tranches/V/ARCHITECTURE.md` §2's space table *normatively fixes every
one of those numbers* ("rgb `[r,g,b]`, each 0–255"; "oklch … c numeric/raw 0–0.5"). So it is library
knowledge transcribed into a component tree, with the spec as the only join.

**(c) "Which spaces are CSS-serializable" has THREE homes.** All three currently agree on the same
thirteen spaces; none is derived from another:

1. `src/color/model.ts:57-75` — the `css: true` flag on `SPACE_SCHEMA` (private)
2. `src/css/grammar.ts:161-164` — `CSS_COLOR_SPACES` (private to `src/css`)
3. `demo/color-session/picker-color.ts:92-95` — `CSS_PICKER_SPACES` (the demo's own third copy)

Copy 3 exists only because copies 1 and 2 are unreachable. It gates
`serializePickerColor` (`picker-color.ts:207`) — the function `ColorInput.vue:104` calls in its
template — so a drift between the demo's list and the parser's list silently changes what the dock
displays.

**Mechanism (new — call it D):** *a public surface narrower than the library's own internal
abstraction*. Mechanisms A–C in the first pass are about the surface being wrongly **described**,
wrongly **handled**, and wrongly **forwarded**. D is about it being wrongly **sized**. It is the one
that produces duplication rather than confusion.

**Cure.** Export `SPACE_SCHEMA`, `SPACE_IDS`, `makeColor`, `isAnyColor` through
`src/color/index.ts` + `src/subpaths/color.ts`. Add the channel-domain table (min/max/unit) beside
`SPACE_SCHEMA` — ARCHITECTURE §2 already owns those numbers, so it is a transcription with a home,
not a new concept. Then `CSS_PICKER_SPACES` and `CSS_COLOR_SPACES` both collapse into
`SPACE_SCHEMA[space].css`, and `buildColor` and `PICKER_CHANNELS`'s structural half are deleted
outright. Combined with the first pass's transposition 1 (stop converting `Result` to exceptions),
`picker-color.ts` goes from **217 lines to roughly 70** — `PICKER_SPACE_NAMES`, the `"hex"` display
encoding, and `pickerColorToHex`, which are the only genuinely demo-owned concepts in the file.

---

## L-15 — MAJOR — the demo's own justification for owning a private `debounce` rests on a root export that does not exist; `useColorParsing` depends on it

`demo/shared/utils.ts` is in ColorInput's parse cone (`useColorParsing.ts:2` imports `debounce` from
it; `ColorInput.vue:199` calls the result). Its header, verbatim (`shared/utils.ts:8-20`):

> `debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier — the
> full-barrel import that drags the scroll-timeline grammar chunk (~36 KiB gz) into the eager graph
> for a 40-line timer utility. The utility tail has no rightful subpath home … so the demo owns its
> copy; **the library's root-barrel export stands for external consumers.**

**There is no root-barrel export.** `package.json#exports` (lines 18-47) is a closed 7-key set —
`./color ./value ./css ./easing ./math ./transform ./quantize` — with **no `"."` key**. That is the
primary fact, readable in the file. Confirmed by resolution, from a throwaway consumer package
outside the repo depending on it by path (`file:/Users/mkbabb/Programming/value.js`):

```
$ cd <scratchpad>/consumer     # package.json: {"type":"module","dependencies":{"@mkbabb/value.js":"file:/Users/mkbabb/Programming/value.js"}}
$ node --input-type=module -e "import('@mkbabb/value.js')
        .then(m => console.log('ROOT OK', Object.keys(m).length))
        .catch(e => console.log('ROOT FAIL:', e.code, '|', e.message.split('\n')[0]))"

ROOT FAIL: ERR_PACKAGE_PATH_NOT_EXPORTED | No "exports" main defined in
           <scratchpad>/node_modules/@mkbabb/value.js/package.json

$ node -e "try { console.log(require.resolve('@mkbabb/value.js')) } catch (e) { console.log('RESOLVE FAIL', e.code) }"
RESOLVE FAIL ERR_PACKAGE_PATH_NOT_EXPORTED
```

`import … from "@mkbabb/value.js"` is **unwritable by any consumer**, external or internal. This is
the third independent assertion in the repo that a root barrel exists — the other two are
`tsconfig.demo.json:42` (`"@mkbabb/value.js": ["./dist/index.d.ts"]`, and
`ls dist/index.d.ts` → *No such file or directory*, already filed as L-4) and this comment. L-4 found
the phantom in the config; this finding is that the phantom is also **load-bearing doctrine**: it is
the stated reason a duplicated utility exists in `demo/shared/`.

Compounding: `@vueuse/core@^14.3.0` is a **direct dependency of this same `package.json`** and ships
`useDebounceFn`. The demo hand-rolls a 40-line timer beside a dependency that already provides it,
justified by a fact that is false. Edict 3 (KISS, no contrivance) and edict 2 (no dual paths).

**Cure.** Either add `"."` to `exports` or delete both assertions that one exists. Then either drop
`shared/utils.ts#debounce` for `useDebounceFn`, or keep it and give it an honest one-line rationale
that does not cite a non-existent surface.

---

## L-16 — MINOR — the "Parse-Lab echo" echoes the committed model, not the parse; it cannot report the failure it exists to explain

`ColorInput.vue:107-109` labels the readout in its own comment:

```html
<!-- E4 (Q10): the Parse-Lab echo (AST + gamut verdict). -->
<ParseEchoReadout />
```

`ParseEchoReadout.vue:29` injects `astEcho` and `gamutVerdict` from `COLOR_MODEL_KEY`. Their
definitions, `demo/color-session/useColorParsing.ts:94-96`:

```ts
const astEcho = computed<{ space: string; parts: string[] }>(() => {
    const color = model.value.color;          // ← the CONVERTED, COMMITTED model
    const parts = PICKER_CHANNELS[color.space].map(…)
```

It reads the model, not any AST, and not the source string. When the typed text fails to parse —
the precise case the readout exists to illuminate, and the case MT-F001 puts a user in — `astEcho`
displays the **previous** colour's channels. The field says `oklch()`, the badge says
"not a valid color", and the echo confidently reports `LAB l 92% a 88.8 b 20`.

This is the same ownership failure as Mechanism A seen from the display side: the library *does*
produce structured failure detail (`parseCssColor` returns `diagnostics: readonly ParseIssue[]`;
`ParseIssue` is a public type in `src/subpaths/css.ts`), `picker-color.ts:112` captures it into
`PickerColorError`, and `useColorParsing.ts:84`'s bare `catch` drops it. The one component built to
render parse structure is therefore wired to the only thing that survives — the committed model.

**Cure (falls out of the first pass's transposition 1 for free):** once `parseAndSetColor` branches
on `Result` instead of catching, `astEcho` takes the `Result` as its input — channels on `ok`,
`diagnostics` on failure — and the readout becomes what its comment already claims.

*(Hypothesis, not reproduced.* `gamutVerdict`, `useColorParsing.ts:107-117`, calls
`convertPickerColor(model.value.color, "oklab")` and `mapPickerOklabToSrgb`, both of which throw
through `valueOrThrow`, inside a `computed` that `ParseEchoReadout.vue:29` renders unguarded. A
conversion failure surfaces as a Vue render error, not a readout. I did not find a reachable colour
that fails, so this is labelled a hypothesis; the `astEcho` finding above is confirmed by reading.)*

---

## L-17 — MINOR (but it raises Mechanism A's stakes) — the `Result → throw` inversion has already produced a live behavioural bug outside this component

The first two passes established that Mechanism A *masks* MT-F001. It has also, independently,
*caused* a defect. `demo/color-picker/composables/usePaletteWiring.ts:85-89` — same
`picker-color.ts` adapter, one layer over:

```ts
const existingIdx = savedColors.findIndex((c) => {
    try {
        return serializePickerColor(c) === newStr;
    } catch { return false; }
});
```

Because `serializePickerColor` throws (`picker-color.ts:210`, `valueOrThrow`) rather than returning a
`Result`, the comparison needs a `try`. The `catch` answers **`false` — "not a duplicate"**. Any
saved colour that fails to serialize is therefore invisible to the de-duplication scan and the same
colour is appended to the palette again. A masking fallback (edict 2) sitting in the middle of a
correctness predicate.

This is one of **twelve** `catch` blocks I verified by reading as wrapping a `picker-color.ts` call
(i.e. a library call re-exceptioned by `valueOrThrow`). The full list, so the next seat has one place
to look:

```
demo/color-session/useColorParsing.ts:44, 81, 84       (convertPickerColor ×2, parsePickerColor)
demo/color-session/useColorUrl.ts:44                    (parsePickerColor from the URL query)
demo/color-session/useColorPipeline.ts:93, 222, 232     (convertPickerColor, parseColor ×2)
demo/color-session/useCustomColorNames.ts:30            (parsePickerColor per registry entry)
demo/color-picker/composables/boot/hydrate.ts:107, 123  (modelFrom → parsePickerColor, url + storage)
demo/color-picker/composables/usePaletteWiring.ts:88, 101 (serializePickerColor, parsePickerColor)
```

(`hydrate.ts:73` is excluded — it guards a `JSON.parse`, not a library call.)

```
$ grep -rn "} catch {" demo/ | wc -l
      47
```

Twelve of those forty-seven exist solely to defend against a library that declares itself
failure-explicit. The point for this axis is not the count — it is that **a consumer cannot write a
correct `===` against this library without a `try` block**, which is a statement about the library's
shape, not the consumer's discipline.

---

## Third-pass negative proofs

Recorded so a fourth seat does not re-derive them.

| Claim | How I proved it |
|---|---|
| The **Vite** half of the self-alias cannot drift — only the tsconfig half did (L-4) | `vite.config.ts:36-49` *reads* `package.json` and derives the alias array from `exports` at config time (`const specifier = "@mkbabb/value.js" + subpath.slice(1)`). The generator is correct; the hand-written `paths` mirror beside it is the defect. Worth stating explicitly because the fix is "delete the mirror", not "fix both". |
| The **"three parallel `useDark` stores"** suspect named in the seat brief is **DEAD** | `grep -rn "useDark" demo/` → exactly 2 hits, **both comments** (`scenes/about/markdown/composables/useMarkdownColors.ts:16`, `…/useMarkdownHighlighting.ts:76`, the latter being the line the brief cites). Zero live `useDark(` call sites remain anywhere in `demo/`. The historical suspect has been cured; the comments are epistemic records. |
| The **`demo/palettes/export.ts` vs `export/serializers.ts`** dual path named in the brief is **LIVE**, but **outside this component's cone** | `ls demo/palettes/` shows both `export.ts` (file) and `export/` (directory, 11 modules: `bytes canonical css digest json png reload rfc8785 serializers svg tailwind types`). Neither appears in ColorInput's 26-module transitive cone. Filed here only so the `demo/palettes` seat inherits the confirmation. |
| The two library copies (L-5) are **semantically identical at this commit**, so L-5 is a latent hazard rather than a live miscompile | `diff <(fold -w120 dist/subpaths/css.js) <(fold -w120 node_modules/@mkbabb/value.js/dist/subpaths/css.js)` → the only differences are minifier symbol names (`r as f` vs `r as ee`, `var g` vs `var _`). Both copies **do** contain the MT-F001 crasher (`grep -c "replace(/,/g" → 3` in each), and both throw on `oklch()` (verified by running the installed copy directly). L-5's severity is correctly MAJOR-as-structure, not BLOCKER-as-behaviour — worth pinning so it is not over- or under-fixed. |
| ColorInput's own **`verbatimModuleSyntax`** compliance (edict 8) | `ColorInput.vue:134` is the file's only type-only import and is spelled `import type`. Confirms the first pass. |

---

## Third-pass finding index

| id | severity | mechanism | one line |
|---|---|---|---|
| L-14 | MAJOR | **D — surface too narrow** | `SPACE_SCHEMA` / `SPACE_IDS` / `makeColor` / `isAnyColor` are written in `src/color/model.ts` and never exported (proven against `dist/`), forcing `buildColor`'s 17-arm switch, `PICKER_CHANNELS`'s hand-kept twin, and a **third** home for the CSS-serializable-space set. |
| L-15 | MAJOR | B — surface mis-described | `demo/shared/utils.ts:16` justifies a duplicated `debounce` on "the library's root-barrel export", which does not exist: a clean consumer gets `ERR_PACKAGE_PATH_NOT_EXPORTED`. `@vueuse/core@14` — already a direct dependency — ships `useDebounceFn`. |
| L-16 | MINOR | A — failure inverted | The "Parse-Lab echo" reads `model.value.color`, not the parse; on the exact failure it exists to explain it renders the *previous* colour's channels, because the library's `ParseIssue[]` was discarded two layers down. |
| L-17 | MINOR | A — failure inverted | The `Result → throw` inversion has produced a live behavioural bug outside this component: `usePaletteWiring.ts:88`'s `catch { return false }` makes an unserializable colour read as "not a duplicate" and be appended twice. |

**Consolidated mechanism count across all three passes: four.**
A — the failure-explicit contract is inverted at the demo boundary (L-1, L-7, L-16, L-17).
B — the public surface is described by divergent maps and a stale twin (L-3, L-4, L-5, L-15).
C — a forbidden forwarding layer sits between the component and the design system (L-2, L-6, L-10).
D — **the public surface is narrower than the library's own internal abstraction (L-14).**

The single highest-leverage transposition is unchanged from the first pass — make `parseCssColor`
total and let `Result` cross the boundary unconverted — and L-14 adds the second: **export the four
primitives the library already wrote.** Together they are net deletions: `valueOrThrow`,
`PickerColorError`, `buildColor`, `CSS_PICKER_SPACES`, twelve `catch` blocks, seventeen factory
imports, and the "not a valid color" constant string all go away, and `picker-color.ts` — the module
every path in this component's cone runs through — drops from 217 lines to about 70.

---
---

## Model receipt (fourth pass)

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with. Declared, not inherited. **Not a defect.**

Fourth pass, independent re-run of CHALLENGE-L at the same coordinate (branch `tranche-u`,
HEAD `c654824e`, subject `demo/shell/dock/ColorInput.vue`). This pass is an **addendum, not a
patch** (E-3): passes 1–3 stand unedited above. It contributes **two new MAJOR findings the prior
passes did not reach** (L-18, L-19), four independent live confirmations of prior findings, and one
sharpening of L-5's mechanism.

Live probes this pass, all isolated Chromium contexts against `http://localhost:9000`:
`CHL-colorinput-probe.mjs` (MT-F001 keystroke repro + control + in-graph library probe),
`CHL-probe2.mjs` (keyframe-registry + `getAnimations()` + accessible-name), `CHL-graph.mjs`
(glass-ui ESM graph walk). Scripts in the session scratchpad; every output below is pasted verbatim.

---

## L-18 — MAJOR (NEW) — `picker-color.ts` re-derives a type the library **does** export, and pays for it with an `as unknown as` erasure on the single conversion funnel this component reads

This is adjacent to L-14 but is its **opposite**: L-14 is the library holding primitives private.
L-18 is the demo re-deriving a primitive the library **publishes**, and paying a type-safety price
for the re-derivation. Passes 1–3 did not reach it — `grep -c "as unknown as" challenge-L-library.md`
→ 0 before this pass.

`demo/color-session/picker-color.ts:38`:

```ts
export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;
```

`/color` already publishes the generic. Verified against the shipped declarations, not the source:

```
$ grep -oE "^export declare type [A-Za-z_0-9]+" dist/subpaths/color.d.ts | sort -u
export declare type Alpha
export declare type AnyColor
export declare type Channel
export declare type ChannelsBySpace
export declare type Color          ← the generic the demo re-derives
export declare type ColorIssue
export declare type HueInterpolationMethod
export declare type RGBA8
export declare type Result
export declare type RgbGamut
export declare type SpaceId
```

The re-derived form does not typecheck, so `picker-color.ts:116` erases through `unknown`:

```ts
return valueOrThrow(convertColor(color, space)) as unknown as PickerColorIn<S>;
```

**Proven, not asserted.** A two-function probe compiled standalone with the demo program's exact
compiler options — arm A is the demo's `Extract<>` shape *without* the cast, arm B is the identical
body typed against the library's exported `Color<S>`:

```
$ npx tsc --ignoreConfig --noEmit --strict --target ES2022 --module ESNext \
    --moduleResolution bundler --verbatimModuleSyntax --lib ES2023,DOM --skipLibCheck \
    docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/.probe-cast.ts

.probe-cast.ts(12,5): error TS2322: Type 'Readonly<{ space: S; channels: ChannelsBySpace[S];
  alpha: Alpha; }>' is not assignable to type 'PickerColorIn<S>'.
  Type 'Readonly<{ space: S; channels: ChannelsBySpace[S]; alpha: Alpha; }>' is not assignable to
  type 'Extract<Readonly<{ space: "jzazbz"; channels: readonly [jz: Channel, az: Channel,
  bz: Channel]; alpha: Alpha; }>, { readonly space: S; }>'.
```

Line 12 is arm A. **Arm B produced no diagnostic.** `Extract<AnyColor, {space: S}>` is not provably
equal to `Color<S>` for a *generic* `S` (TS cannot distribute the conditional through the unresolved
parameter), while `Color<S>` is what `convertColor` literally returns. The cast exists solely to
paper over a locally re-derived alias of an already-public type. The probe was removed after the
run; the tree is unchanged.

**Blast radius.** `PickerColorIn` has **23 usages** across `demo/`. It types
`convertPickerColor`, `withChannel`, `withNormalizedChannel`, `withAlpha`, `mapPickerOklabToSrgb`
— i.e. the single funnel through which ColorInput's readout, `astEcho`, `gamutVerdict`, and every
slider value flow. One `as unknown as` at the top of that funnel erases the discriminant for
everything downstream: any mismatch between the space tag and the channel tuple is unprovable past
line 116, which is precisely the invariant `ARCHITECTURE.md:96` exists to guarantee
("`ChannelsBySpace` is an **exhaustive** mapping from every ID to its immutable channel tuple").

**And the demo already knows better, one file away.** `demo/color-session/ink.ts:6` imports
`type Color` from `@mkbabb/value.js/color`. Two spellings of one concept inside a single directory
— unique semantic ownership, edict 2. `grep -rn "as unknown as" demo/color-session/` returns
exactly one hit, line 116: the whole cost of the re-derivation is concentrated at the one place
the re-derivation happens.

**Second cast, same file, different cause.** `picker-color.ts:208` — `color as CssColor` after a
runtime `CSS_PICKER_SPACES.has(color.space)` test. The library ships the closed `CssColorSpace`
union and the `CssColor` discriminated union, but **no narrowing predicate**
(`grep -c "isCssColor" dist/subpaths/css.d.ts` → 0), so the consumer must assert what the runtime
check just proved. That is a real gap in `/css`: the type guard for a closed discriminated union
belongs with the union, not re-invented per consumer. It is also the third home for the
CSS-serializable-space set that pass 3's L-14 already counted — this cast is *why* the third home
exists.

**Cure.** Delete `PickerColorIn`; use `Color<S>` from `@mkbabb/value.js/color` at all 23 sites.
The `as unknown as` dies with it — a net deletion, no new abstraction. File `isCssColor(c): c is
CssColor` as a `/css` addendum (E-3), which retires `CSS_PICKER_SPACES` and the line-208 cast
together. Combined with pass 3's L-14 cure, `picker-color.ts` loses its last two casts and both
of its hand-rolled type aliases.

---

## L-19 — MAJOR (NEW) — the composition root is a **feature directory**, so 137 of the app's own modules are served through Vite's `/@fs/` escape hatch, and the tree has two live URL namespaces

Not reached by passes 1–3 (`grep -c "@fs" ` → 1 before this pass, and that hit is a `curl` URL in
the reproduction appendix, not a finding).

`vite.config.ts` sets `root: "./demo/color-picker/"` for **both** the dev and the `gh-pages` builds.
But `demo/color-picker/` contains only the composition root:

```
$ ls demo/color-picker/
App.vue  ErrorBoundary.vue  composables/  index.html  public/  router/  vite.d.ts  (+ 3 images)
```

Every feature tree — `shell/`, `color-session/`, `picker/`, `palettes/`, `workbenches/`, `scenes/`,
`platform/`, `shared/`, `styles/`, `ui/` — lives one level **up**, i.e. *outside the server root*.
Vite must therefore serve them through `/@fs/`. Measured on `/#/` from the live resource timeline:

```js
{ total: 250,
  viaAtFs: 227,
  demoModulesViaAtFs: 137,
  rootRelativeSample: ["/router/index.ts", "/App.vue", "/ErrorBoundary.vue",
                       "/composables/usePaletteWiring.ts", "/composables/boot/hydrate.ts", …] }
```

**137 of the demo's own modules** — including this component, served as
`/@fs/Users/mkbabb/Programming/value.js/demo/shell/dock/ColorInput.vue` — reach the browser through
the filesystem-escape route, while the ~10 modules that happen to sit inside `demo/color-picker/`
are served root-relative as `/App.vue`. **One source tree, two URL namespaces.**

**This is not theoretical. It blocked the app during this pass.** First navigation produced a Vite
error overlay that made the dock unclickable:

```
ENOENT: no such file or directory, open '/shell/dock/ColorInput.vue'
    at Object.readFileSync (node:fs:436:20)
    at getDescriptor (…/@vitejs/plugin-vue/dist/index.mjs:80:72)
    at LoadPluginContext.handler (…/@vitejs/plugin-vue/dist/index.mjs:1692:25)
```

`/shell/dock/ColorInput.vue` is the *root-relative* spelling resolved against `demo/color-picker/`
— a path that has never existed on disk. 22 sibling `[vite] Failed to reload /@fs/…` errors sat in
the same buffer (ColorInput's among them, plus `App.vue`, `ColorPicker.vue`, `HeroBlob.vue`,
`PaletteCard.vue`, `Markdown.vue`, …). It cleared on hard reload and the working tree is clean
(`git status --porcelain` → no `demo/` or `src/` modification), so **this occurrence is a stale
long-running-server artefact, not a durable repo break** — labelled as such. But the artefact is
only *possible* because the two namespaces exist and a module can be addressed by either. A
single-root tree cannot produce it.

**It also contradicts the tranche's own declared architecture on two counts.** `ARCHITECTURE.md:9`
names the composition root `demo/app/` — "entry, composition root, router, app shell" — and
`ARCHITECTURE.md:10-11` puts the pre-paint seed at `demo/public/prepaint-seed.js`. Both live under
`demo/color-picker/` today. And `color-picker` is a **route** (`/#/`, one of eleven in the closed
inventory at `ARCHITECTURE.md:41`), not the shell: the app's entry point is named after one of its
own leaves, which is the naming form of the same category error `ARCHITECTURE.md:39` forbids for
`panes/`.

Third consequence, quieter: every demo→demo import is a `../../` count *from inside a sibling of the
root*. `ActionBarLayer.vue:4` reaches `color-session` as `../../../color-session/keys`; ColorInput
reaches it as `../../color-session/keys`. The declared lattice
(`shell → color-session / platform / shared`, `ARCHITECTURE.md:47`) is unreadable from the import
text because the depth carries no information about the direction.

**Cure.** `demo/color-picker/` → `demo/app/`; Vite `root: "./demo"`. `/@fs/` then disappears from the
demo graph entirely (227 → the node_modules tail only), the HMR path ambiguity that produced the
ENOENT becomes structurally impossible, and `ARCHITECTURE.md:9-33`'s physical tree becomes true as
written. This is the cheapest of the four cures in this document and the only one that is purely a
move.

---

## Fourth-pass confirmations (independent re-derivation of prior findings)

**L-1 (BLOCKER) — re-reproduced end-to-end, and the swallow is bit-identical.** Fresh Chromium
context, dock → `Toggle action bar` → `Open color input`, then `oklch(` `)` typed character-by-character
and `Enter`:

```
input present: 1   text-at-open: "lab(92% 88.8 20 / 82.7%)"

AFTER ENTER:   { "text": "oklch()", "errorBadge": 1, "errorBadgeText": "not a valid color",
                 "errorClass": true, "newConsoleErrors": [], "newPageErrors": [],
                 "title": "lab(92% 88.8 20 / 82.7%) — Color Picker" }

CONTROL zzzzz: { "text": "zzzzz",   "errorBadge": 1, "errorBadgeText": "not a valid color",
                 "errorClass": true, "newConsoleErrors": [], "newPageErrors": [] }

LIVE-GRAPH parseCssColor (re-imported from the running app's own module instance):
  "oklch()" -> THROWS TypeError: Cannot read properties of undefined (reading 'replace')
  "rgb()"   -> THROWS TypeError: Cannot read properties of undefined (reading 'replace')
  "zzzzz"   -> ok:false + diagnostics
```

A library `TypeError` and a legitimate `ok:false` produce **byte-identical UI and byte-identical
console output (empty)**. Confirmed: the component *swallows*. Screenshot of the user-visible state
at `…/scratchpad/CHL-oklch.png` — the badge, absolutely positioned at `right: 0.5rem`
(`ColorInput.vue:348-352`), occludes the typed text down to one glyph at dock width, so the user is
told they are wrong while being prevented from reading what they typed.

**L-12 (dead `crown-appear`) — confirmed live at runtime, not only at compile time.** Pass 3 proved
it from the compiled style block; this pass proves it from the browser's own keyframe registry with
the input layer mounted:

```json
{ "totalKeyframeNames": 54,
  "crownNames": ["crown-appear-55dadc03"],
  "flashNames": ["input-mode-flash-55dadc03"],
  "crownAnimationsRunning": 0 }
```

Of 54 keyframe names in every loaded stylesheet, the only `crown` entry is the **hashed** one; the
unhashed `crown-appear` the template's inline `style` attribute (`ColorInput.vue:38`) names exists
nowhere. An element carrying that exact declaration returns `getAnimations().length === 0`.
`input-mode-flash-55dadc03` is the working control — declared *and* consumed inside the scoped
block, so correctly rewritten. L-12 upgraded from compile-time proof to observed runtime fact.

**L-10 (send button has no accessible name) — confirmed in the mounted state.** The mega-tranche
visual sweep's `namelessButtons: 1` on `/#/` is **not** this button — ColorInput is not mounted at
rest (`document.querySelector('.color-input')` → `null` on a fresh load; the row belongs to a dock
capsule button). With the input layer open:

```json
"sendButtons": [ { "tag": "BUTTON", "text": "", "ariaLabel": null, "title": null } ]
```

No accessible name of any kind, in either branch (`ColorInput.vue:67-82`). Every sibling dock
control has one — enumerated live: `Toggle action bar`, `Open color input`, `Switch to slug`,
`Generate new slug`, `Cancel`, `Select view`, `Save palette`, `Copy colors`, `Menu`. L-10 stands,
with the correction that the visual audit's row is a different element.

**L-2 — the root-barrel cost, measured as a transitive graph rather than a top-level count.** Pass 1
gave module counts; this pass walks the full relative-import closure of
`node_modules/@mkbabb/glass-ui/dist`:

```
root barrel (glass-ui.js)                    : 66 modules, 224,193 bytes
{popover,tooltip,separator,dom}.js granular  : 21 modules,  33,150 bytes
excess                                       : 45 modules, 191,043 bytes   (6.76×)
```

And the systemic share: of the 36 demo modules importing the bare glass root barrel, **18 are the
`demo/ui/` shims** — the forbidden forwarding layer is exactly half of the app's entire root-barrel
pressure. Honest caveat: glass-ui declares `sideEffects: ["*.css"]`, so the rolldown `gh-pages`
build can shake much of the JS; the 66 modules are real fetches in the dev graph the live app
serves and real work for the bundler. L-2's severity is unchanged.

**Negative proof — the demo→library direction is sound, re-verified by resolution trace.** The
premise "wrong direction of dependency / a demo import a real consumer could not write" is **false**
for this component's cone, and it is worth stating positively:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "Module name '@mkbabb/value.js"
@mkbabb/value.js/color    -> /Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts
@mkbabb/value.js/css      -> /Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts
@mkbabb/value.js/easing   -> /Users/mkbabb/Programming/value.js/dist/subpaths/easing.d.ts
@mkbabb/value.js/math     -> /Users/mkbabb/Programming/value.js/dist/subpaths/math.d.ts
@mkbabb/value.js/quantize -> /Users/mkbabb/Programming/value.js/dist/subpaths/quantize.d.ts
```

Every specifier lands on the **published `dist/` trust boundary**, never on `src/`, and never on
the `node_modules` twin. Note `/css` resolves with *no* `paths` entry at all — through the repo's
own `package.json#exports` self-reference under `moduleResolution: bundler`. That is the correct
mechanism, and it is why L-4's three phantom `paths` keys are dead config rather than live drift.
All 30 symbols `picker-color.ts` imports are present in the published declarations (25/25 in
`color.d.ts`, 5/5 in `css.d.ts`; zero absent). The T.W1 demo-dogfood keystone **holds**.

---

## Fourth-pass sharpening of L-5 — the *cause* of the self-install, named

Pass 1 established the twin exists and is dodged by three accidents. The cause is now pinned to a
single hard edge, which matters because it determines the cure:

```
$ node -e "…" # read from the installed manifests
keyframes.js  deps: {"@mkbabb/value.js":"4.0.0"}          ← HARD dependency, exact pin
glass-ui      deps: {}   peer: {"@mkbabb/value.js":"^4.0.0"}  ← peer only, does not install

$ grep -n '"node_modules/@mkbabb/value.js"' -A3 package-lock.json
  "version": "4.0.0",
  "resolved": "https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz",
```

`@mkbabb/keyframes.js@^6` — a **direct dependency of this repo** — carries an exact
`"@mkbabb/value.js": "4.0.0"`, so npm materialises the registry tarball unconditionally. glass-ui's
peer declaration is innocent. This falsifies, in one line, the premise both resolution configs are
built on:

- `vite.config.ts:26-28` — "**A package does not install itself**, so these exact aliases point the
  seven public specifiers at this checkout's freshly-built published surface."
- `tsconfig.demo.json` header — "a package **never** installs itself, so the demo aliases that
  specifier…"

The comments are false as written and are load-bearing for two configs. Confirming pass 3's ruling
that the hazard is latent rather than live: the installed copy carries the **identical** MT-F001
crasher —

```
$ node --input-type=module -e "import {parseCssColor} from
    './node_modules/@mkbabb/value.js/dist/subpaths/css.js'; try{parseCssColor('oklch()')}catch(e){…}"
THROWS Cannot read properties of undefined (reading 'replace')
```

— which is what every real downstream consumer of `@mkbabb/keyframes.js@6` has in their tree today.
That is the strongest argument for fixing `src/css/grammar.ts:181` at the library, not the demo:
the crash is already distributed, and no demo-side guard can reach it.

**Cure, sharpened.** Pass 1's "one generated map for all four tools" stands. Add: a
`package.json#overrides` entry pinning `@mkbabb/value.js` to `file:.` makes the invariant the
comments assert *actually true*, at which point the four tools no longer need to be individually
taught to dodge a twin that no longer exists.

---

## Fourth-pass finding index

| id | severity | mechanism | one line |
|---|---|---|---|
| L-18 | MAJOR | **E — surface re-derived where it is already public** | `picker-color.ts:38` re-derives `PickerColorIn<S> = Extract<AnyColor,{space:S}>` for the exported `Color<S>`, and pays with `as unknown as` at line 116 — **proven** unnecessary (arm A `TS2322`, arm B clean); 23 usages ride the erased funnel; `ink.ts:6` already uses `Color`. Plus: `/css` ships no `isCssColor` guard, forcing the line-208 cast. |
| L-19 | MAJOR | **F — the composition root is a feature directory** | Vite `root: "./demo/color-picker/"` while the whole app tree lives at `demo/`: **137 of 250** module requests on `/#/` go through `/@fs/`; two URL namespaces for one tree; observed live as a blocking `ENOENT '/shell/dock/ColorInput.vue'` overlay. `ARCHITECTURE.md:9` names the root `demo/app/`. |

**Consolidated mechanism count across four passes: six.**
A — the failure-explicit contract is inverted at the demo boundary (L-1, L-7, L-16, L-17).
B — the public surface is described by divergent maps and a stale twin (L-3, L-4, L-5, L-15).
C — a forbidden forwarding layer sits between the component and the design system (L-2, L-6, L-10).
D — the public surface is narrower than the library's own internal abstraction (L-14).
E — **the demo re-derives a surface that is already public, and pays in erased types (L-18).**
F — **the composition root is a feature directory, splitting the tree into two namespaces (L-19).**

D and E are a matched pair and should be cured in one cut: export the four private primitives
(L-14), delete the two re-derived aliases (L-18), and `picker-color.ts` loses `buildColor`,
`PickerColorIn`, `CSS_PICKER_SPACES`, and both casts together.

The single highest-leverage transposition is unchanged across all four passes: **make
`parseCssColor` total and let `Result` cross the boundary unconverted.** Every pass has now
re-derived it independently. F (L-19) is the cheapest — a directory rename and a one-line config
change — and is the only finding in this document whose cure moves no logic at all.

---
---

# CHALLENGE-L · FIFTH PASS

## Model receipt (fifth pass)

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with. The declaration is present and matches the served model. Not inherited, not
undeclared. **Not a defect.**

Fifth independent run of CHALLENGE-L at the same coordinate (branch `tranche-u`, HEAD `c654824e`,
subject `demo/shell/dock/ColorInput.vue`). **Addendum, not patch** (E-3): passes 1–4 stand unedited
above.

**Method note, stated so its value is legible.** I ran the whole axis blind — full import trace,
barrel census, `traceResolution`, MT-F001 node repro, live browser probes — and *then* read the four
prior passes. Everything I derived independently was already filed: the `Result`→throw laundering
(L-1), the 19-directory `demo/ui/` forwarder (L-2), the `paths`/`exports` divergence (L-4), the
`node_modules` twin (L-5), the dead prop + dead `defineExpose` (L-8), the 38/40-member injection
(L-9), the nameless send button (L-10), the dead `crown-appear` (L-12), the stale root-barrel
doctrine in `shared/utils.ts` (L-15). **Five independent Opus 5 seats converging on the same set is
itself a measurement**: this document's finding list is saturated on the axes it has covered. That is
worth recording, because it changes what a sixth pass should do — stop re-auditing the import graph
and start auditing the *runtime states* the component can be driven into.

Which is what this pass did. All five new findings are on the **boot and display** paths rather than
the import graph, and four of them are the same Mechanism A the prior passes named, wearing faces the
prior passes did not reach. One is a **correction to pass 4**.

Live probes: isolated Playwright/Chromium contexts against `http://localhost:9000`; node against
`dist/subpaths/{color,css}.js`; `npx tsc --traceResolution` against `tsconfig.demo.json`. Every
output below is pasted verbatim.

---

## L-20 — MAJOR (NEW) — the malformed-URL boot path: the tab title asserts a colour the app is not showing, the bad link survives, and MT-F001's only observable trace in the entire app is emitted at a severity the mega-tranche audit does not grade

Passes 1–4 drove MT-F001 through the **keystroke** path. There is a second path into the same crash
that requires no interaction at all — a **shared link** — and it behaves differently in three
user-visible ways.

**Reproduction.** Navigate to `http://localhost:9000/#/?space=oklch&color=rgb()` (`rgb()` is one of
the eight MT-F001 crashers), settle 2.5 s, then read the page:

```json
{ "url":                "http://localhost:9000/#/?space=oklch&color=rgb()",
  "title":              "rgb() — Color Picker",
  "colorInputPresent":  true,
  "colorInputText":     "oklch(72% 0.19 25deg)",
  "namelessButtons":    ["send-btn btn-interactive"],
  "bodyEmpty":          1652,
  "mainCount":          1 }
```

Three separate defects in one load:

**(a) The tab title states a colour the app is not showing.** `document.title` is
`"rgb() — Color Picker"`; the model is `oklch(72% 0.19 25deg)` (the persisted seed). The title is the
browser tab, the bookmark name, the history entry and the share-preview string. Source —
`demo/color-picker/router/useDocumentTitle.ts:62`:

```ts
const apply = (to) => { document.title = composeTitle(to.name, to.query.color); };
```

and `composeTitle` (`:43-45`) takes the raw query verbatim:

```ts
const colorVoice = typeof color === "string" && color.trim() ? color.trim() : null;
```

No validation. The router `afterEach` guard fires **independently of** whether
`useColorUrl.applyUrlToModel()` succeeded, so the title is derived from a string the model rejected.
The module's own header comment (`:18-19`) states the assumption this breaks, verbatim:

> `to.query.color` is the resolved colour voice (a named colour like `tomato`, or a hex / CSS string)
> — **the exact string the app uses as the colour's shareable identity everywhere**.

It is not resolved and it is not the app's identity. It is unvalidated user input rendered as
chrome.

**(b) The bad link survives.** `useColorUrl`'s model→URL writer (`useColorUrl.ts:52-64`) is debounced
300 ms **and fires only on model change**. `applyUrlToModel` returned `false`, the model never moved,
so `syncModelToUrl` never navigates and `?color=rgb()` stays in the address bar indefinitely
(measured at t=2500 ms above). The link is therefore **stably reproducible**: anyone it is sent to
sees the same title/body divergence, forever.

**(c) MT-F001's one observable trace is a `console.warn`.** `useColorUrl.ts:44-46` is the *only*
place in the running app where the MT-F001 stack reaches an output channel:

```
[WARNING] [useColorUrl] Invalid color in URL: rgb() TypeError: Cannot read properties of undefined (reading 'replace')
    at ae (…/dist/subpaths/css.js:265:17)
    at T  (…/dist/subpaths/css.js:354:13)
    at parsePickerColor (…/demo/color-session/picker-color.ts:157:17)
    at applyUrlToModel  (…/demo/color-session/useColorUrl.ts:22:41)
```

A perfect diagnosis — library frame, adapter frame, caller frame — logged at **`warn`**. The
mega-tranche visual audit grades exactly eight categories:

```
$ grep -n "^### " docs/tranches/V/megatranche/audit/visual/REPORT.md
7:### blankOrNearBlank   11:### pageErrors        15:### consoleErrors    19:### horizontalOverflow
23:### darkClassMissing  27:### mainCountNotOne   31:### smallTapTargets  94:### namelessButtons
```

`consoleWarnings` is *captured* per route into `REPORT.json` but has **no defect section and no
threshold** — it is collected and never read. So the single line in the entire application that
correctly names the shipping blocker is emitted at the one severity the audit does not grade.

**Mechanism.** Mechanism A (failure inverted) with a **split-brain** consequence: two consumers read
the same query parameter, one validates it (`useColorUrl`, and correctly reports failure) and the
other does not (`useDocumentTitle`, and renders it as fact). The library's `Result` was available to
both; only one asked.

**Cure.** The title must read the **model**, not the query — the model is the only thing that has
been through the parser. `composeTitle` takes `cssSpelling` from the colour session (the same
computed the field renders), so a malformed link produces a correct title for the colour actually
shown. Separately, `applyUrlToModel` returning `false` should *repair* the URL rather than leave it —
one `router.replace` with the seeded model's spelling, so a broken share link heals on open instead
of propagating. And `useColorUrl.ts:44`'s `console.warn` should be `console.error` **only once
Mechanism A is cured**; while the swallow exists, promoting it would turn a real audit signal into
noise on every legitimate typo.

---

## L-21 — MAJOR (NEW) — `serializePickerColor` answers a *different question* rather than failing, and `ColorInput.vue:104` renders the substitution under the words "*Any* valid CSS color string is accepted"

This is Mechanism A's most dangerous face and no prior pass reached it. Passes 1–4 catalogued the
**18 `valueOrThrow` sites** where `picker-color.ts` converts `Result` → throw. There is one place
where it does something worse: it suppresses a `Result` and **substitutes a plausible wrong answer**.

`demo/color-session/picker-color.ts:206-211`:

```ts
export function serializePickerColor(color: AnyColor): string {
    const cssColor = CSS_PICKER_SPACES.has(color.space)
        ? color as CssColor
        : convertPickerColor(color, "oklch");   // ← silent space substitution
    return valueOrThrow(serializeCssColor(cssColor));
}
```

The library is explicit that four of the seventeen spaces are not CSS colours. Measured against the
published bundle:

```
$ node --input-type=module -e "…"
hsv ok= true {"space":"hsv","channels":[25,0.8,0.95],"alpha":1}
serializeCssColor(hsv)      -> {"ok":false,"error":{"code":"color_invalid_input"}}
demo substitute (oklch)     -> "oklch(71.818014636356% 0.164583951889 51.616475581492deg)"
kelvin(3200) substitute     -> "oklch(83.541309110086% 0.113041061705 60.63464406001deg)"
```

`serializeCssColor` returns a correct, structured `{ok:false, code:"color_invalid_input"}` — *"HSV is
not a CSS colour"*. The demo discards that verdict and returns an oklch string instead.

**Where ColorInput renders it.** `ColorInput.vue:94-105` — the popover, verbatim:

```html
<p class="font-display font-medium text-subheading">Enter a color</p>
<p><span class="italic">Any</span> valid CSS color string is accepted.</p>
<Separator class="my-2" />
<div class="fira-code w-full flex justify-center">
    {{ serializePickerColor(currentPhysicalColor) }}
</div>
```

Two lines below a sentence promising CSS fidelity, the component prints a **different colour space
than the one the user selected**, with no marker that a substitution occurred. All four non-CSS
spaces are user-selectable: `DISPLAY_COLOR_SPACE_NAMES` (`color-model.ts:75-78`) is
`{...PICKER_SPACE_NAMES, hex}`, and `PICKER_SPACE_NAMES` (`picker-color.ts:72-90`) enumerates all
seventeen — HSV, Kelvin, ICtCp and Jzazbz among them.

**The same repo already knows the right answer, one file away.** `ColorSpaceSelector.vue:154-165`
calls the identical function and **guards** the identical case:

```ts
if (CSS_PICKER_SPACES.has(converted.space)) return serializePickerColor(converted);
const channels = converted.channels.map(c => typeof c === "number" ? Number(c.toFixed(4)) : c);
return `${converted.space} · ${channels.join(" · ")}`;     // ← honest non-CSS spelling
```

The dropdown says `hsv · 25 · 0.8 · 0.95`. The popover, for the very same model colour, says
`oklch(71.818014636356% …)`. **Two consumers of one function, one guarded and one not, disagreeing
about what colour the app is showing** — and the guarded one is a *dropdown specimen*, while the
unguarded one is the surface that claims to speak CSS.

**Mechanism — a new face, worth naming: A′, failure answered with a plausible wrong answer.** A throw
is at least loud somewhere (pass 4 proved the `catch` swallows it, but the exception object exists). A
substitution is loud nowhere: it returns a well-formed string that passes every downstream check.
This is precisely the "masking fallback" edict 2 forbids, and it sits at the bottom of the funnel
every colour readout in the app runs through.

**Cure.** `serializePickerColor` returns `Result<string, ColorIssue>` and never converts. Callers that
want the oklch projection ask for it by name (`serializeAsOklch`), so the substitution becomes a
*request* instead of a silent default. `ColorInput.vue:104` then renders either the CSS spelling or
the honest non-CSS spelling the selector already implements — one helper, one home, both call sites.
This falls out of pass 1's transposition 1 at zero extra cost, and it retires the third home for the
CSS-serializable-space set that pass 3's L-14 counted.

---

## L-22 — MAJOR (NEW) — the propose-submit path has zero automated coverage at any level, and the e2e spec that skips it cites a unit test file that does not exist

`submitProposedName` (`ColorInput.vue:230-247`) is the only authenticated network **mutation** owned
by a `.vue` file in this repo (pass 1's L-7 established the ownership defect; this is its
verification consequence, which no pass reached).

`e2e/smoke/flows/color-propose.spec.ts:15-24` documents the skip and asserts a fallback:

> COVERAGE NOTE (E-AUDIT-6 §10 follow-up): the final POST `/colors/propose` submission step is NOT
> exercised here because the propose-mode `<span role="textbox" contenteditable>` … is not reliably
> reachable via accessible-name selectors during the cross-fade. … **The contenteditable submission
> has unit coverage in `test/parsing/extract.test.ts` via the underlying `submitProposedName`
> handler.**

Both halves fail:

```
$ ls test/parsing/extract.test.ts
ls: test/parsing/extract.test.ts: No such file or directory

$ grep -rn "submitProposedName\|proposeColorName" --include=*.ts --include=*.vue . \
    | grep -v node_modules | grep -v '^./docs'
demo/color-session/color-names.ts:35:export function proposeColorName(
demo/shell/dock/ColorInput.vue:71,132,206,230,236,287
demo/palettes/api/index.ts:7:        (a comment)
e2e/smoke/flows/color-propose.spec.ts:24:  (the claim itself)
```

**The file does not exist and there are zero test references anywhere in the repo.** Unit: none.
Component: none (there is no component-test harness for `demo/` — `demo/test/` holds three files,
none of them a `.vue` mount). E2e: explicitly skipped.

**And the two reasons for the skip are themselves findings already in this document.** The spec says
the control is "not reliably reachable via accessible-name selectors" — it has **no accessible name
at all** (L-10, and L-23 below). It says the cross-fade makes it flaky — that is the
`SUB_LAYER_CROSSFADE_MS` JS/CSS duplication (L-11). So the untested path is untested *because of*
two other filed defects, and the coverage note papers over the gap with a citation that was never
true.

**Why it belongs on the library-structure axis.** A mutation with no composable home (L-7) is also a
mutation with no *testable seam*: there is nothing to call except by mounting a dock leaf inside a
dock inside an app. Move it to `useColorNaming.proposeName()` per L-7's cure and it becomes a
four-line unit test with a stubbed transport — the coverage gap closes as a side effect of the
ownership cure, which is the argument for doing the ownership cure.

**Live corroboration that the silent-failure path is not hypothetical.** The dev server this pass
probed emits, on every load:

```
[ERROR] [value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is
targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
excludes localhost — every palette request will be blocked.
```

Every `/colors/propose` POST from this environment fails at CORS. Per `ColorInput.vue:242-245` the
user is told **nothing** — no badge (the `.error-badge` is gated `parseError && !proposeMode`,
`:87`), no state change, only a `console.warn`. The failure mode is live on the machine this audit
ran on, and it is invisible.

---

## L-23 — CORRECTION to the fourth pass's retraction of L-10 — ColorInput *is* mounted at rest, and `.send-btn` *is* the visual audit's nameless button

Pass 4 (§Fourth-pass confirmations) retracted pass 1's attribution:

> The mega-tranche visual sweep's `namelessButtons: 1` on `/#/` is **not** this button — ColorInput is
> not mounted at rest (`document.querySelector('.color-input')` → `null` on a fresh load; the row
> belongs to a dock capsule button).

**That retraction is wrong.** Measured on two independent settled clean navigations this pass, with
no prior interaction in the context:

*Load 1 — `http://localhost:9000/#/`, enumerating every `<button>` with no `aria-label`, no text and
no `title`:*

```json
{ "namelessCount": 1,
  "nameless": [{ "cls": "send-btn btn-interactive",
                 "html": "<svg data-v-55dadc03=…",
                 "rect": "24x24",
                 "inertAncestor": true }],
  "colorInputPresent": true,
  "colorInputAria": "Enter a CSS color" }
```

*Load 2 — `…/#/?space=oklch&color=rgb()`, settled 2500 ms (the L-20 probe):*

```json
{ "colorInputPresent": true, "namelessButtons": ["send-btn btn-interactive"] }
```

**ColorInput is in the DOM at rest, and `.send-btn` is the document's only nameless button — exactly
the count the visual audit records for `/#/` on both desktop matrices.** Pass 1's attribution was
correct.

**Why pass 4 measured otherwise, and why this matters more than the attribution.** ColorInput is
rendered inside an inert dock layer (`inertAncestor: true`, `visibility: hidden`, `opacity: 0` —
measured), and `ActionBarLayer` itself is behind `v-if="actionBar"` (`Dock.vue:156`), where
`actionBar` is `colorPickerRef?.actionBarContext ?? null` (`App.vue:38`) — a **template-ref-derived**
prop that is `null` until `ColorPicker` has mounted and the parent has re-rendered. So presence is a
*settling* question. A probe that reads too early sees `null`; a probe that reads after settle sees
the button. And the settle is not fast: `REPORT.json` records `settleMs: 18905` for
`safari-desktop-light /#/`.

I also reproduced pass 4's `null` — but only in a **dirty** context, after prior clicks had driven the
dock into its edit face (`aria-label`s enumerated: `Save edit`, `Cancel edit`, …, `hasColorInput:
false`). Both observations are real; they are different states.

**The structural finding underneath the disagreement is new and is the reason to record this.** *An
a11y sweep over this app is nondeterministic*, because whether a component is in the DOM depends on a
template-ref round-trip whose completion the harness does not wait on. Two independent Opus 5 seats
measured opposite values for the same row of the same audit. Any category the harness counts by
`document.querySelectorAll` — `namelessButtons`, `smallTapTargets`, `counts.button` — inherits that
nondeterminism.

**Cure (harness, not component).** The capture must wait on an app-emitted readiness signal, not a
timeout: the dock already exposes `[data-morphing]` (used by `e2e/smoke/flows/color-propose.spec.ts:49`
for exactly this reason) and the shell can set a `data-app-ready` attribute once the composition root
has resolved its refs. Then `namelessButtons: 1` means one thing on every run. (The component-side
cure is unchanged: L-10 — give the button a name.)

---

## L-24 — MINOR (NEW) — JS timing constants have no home; the parse debounce and the error-badge lifetime are equal by coincidence, in a file that uses a third value for the same class of interaction

Pass 1's L-11 found one instance of this (`SUB_LAYER_CROSSFADE_MS = 260`, a JS constant that must
equal a CSS duration owned by another repo). It is not one instance; it is the general condition, and
two of them are load-bearing on ColorInput's own parse path.

`demo/color-session/useColorParsing.ts`:

```
:57   parseErrorTimer = setTimeout(() => { parseError.value = false; }, 2000);   ← badge lifetime
:92   const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000);        ← typing debounce
```

Two independent `2000`s, unnamed, in one file. They are not the same concept — one is *how long the
user must stop typing before the app parses*, the other is *how long the rejection is shown* — and
nothing records that their equality is or is not intentional. The immediately adjacent spine uses a
different value for the same interaction class:

```
demo/color-session/useColorPipeline.ts:209   debounce(updateColorComponent, 500)   ← slider commit
demo/color-session/useColorUrl.ts:64         debounce(…, 300)                      ← model→URL
```

So the demo commits a **slider** drag after 500 ms and a **typed colour** after 2000 ms — a 4× spread
across two ways of expressing the same intent, with no stated rationale for either. Measured
consequence on the live app: after typing an invalid colour, the user waits a full **2 s** before any
feedback appears, and my L-1 probe had to sleep 2600 ms to observe the badge at all.

Census of the class (`grep` for `debounce(…, N)`, `setTimeout(…, N≥100)`, `*_MS = N` under `demo/`):
**21 sites, 21 distinct literals at 21 call sites, zero shared home** — and that is a *lower bound*,
since the single-line pattern misses multi-line calls such as `useColorUrl.ts:64`'s `}, 300)`. A
representative slice:

```
demo/color-session/useColorParsing.ts:57,92        2000, 2000
demo/color-session/useColorPipeline.ts:209         500
demo/color-session/useColorUrl.ts:64               300
demo/shell/dock/ColorInput.vue:256                 300     (mode-flash, must match --duration-slow = 0.45s → it does NOT)
demo/shell/dock/layers/ActionBarLayer.vue:62       260     (L-11)
demo/picker/ColorPicker.vue:288,378                120, 850
demo/workbenches/extract/…/useExtractSession.ts:161 300
demo/color-picker/composables/usePaletteWiring.ts:162 400
```

The `ColorInput.vue:256` row is a live instance of exactly L-11's failure shape, inside the subject
component:

```ts
modeTransition.value = true;
setTimeout(() => { modeTransition.value = false; }, 300);
```

and the CSS it gates (`:312-314`) runs at `var(--duration-slow)`, measured live at **0.45 s**:

```json
{ "durationSlow": "0.45s", "durationPanel": "0.55s", "durationFast": "0.2s" }
```

**The JS clears the class 150 ms before the animation it gates finishes.** The animation is cut short
on every mode toggle. (Reproduction: read `--duration-slow` off `document.documentElement` — pasted
above — and compare to the literal.)

**Mechanism.** glass-ui owns the *design-token* half of timing (`--duration-fast/slow/panel`,
`--spring-smooth-duration`) and the demo consumes it correctly in CSS. The **JavaScript** half has no
home at all, so every site that must coordinate with a CSS duration copies a number and hopes. There
is no compiler, lint rule or test linking the two.

**Cure.** One module — `demo/styles/durations.ts` — reading the tokens at runtime
(`getComputedStyle(document.documentElement).getPropertyValue('--duration-slow')`, parsed once) and
exporting named constants. Then `ColorInput.vue:256`, `ActionBarLayer.vue:62` and every
transition-coupled timeout read the *same* value the CSS uses, and retiming a token retimes the JS.
The pure-behaviour debounces (parse, URL, slider) are a separate, genuinely demo-owned concern and
belong in one named table with a stated rationale per row — not as bare literals at nine call sites.
Relay to glass-ui: exporting the duration tokens as a JS map from `@mkbabb/glass-ui/tokens` would let
consumers skip the `getComputedStyle` read entirely.

---

## Fifth-pass negative proof — pass 3's `gamutVerdict` hypothesis is REFUTED for reachable colours

Pass 3 filed, explicitly labelled a hypothesis:

> *(Hypothesis, not reproduced.* `gamutVerdict`, `useColorParsing.ts:107-117`, calls
> `convertPickerColor(…, "oklab")` and `mapPickerOklabToSrgb`, both of which throw through
> `valueOrThrow`, inside a `computed` that `ParseEchoReadout.vue:29` renders unguarded. … I did not
> find a reachable colour that fails.*

Resolved by exhaustive sweep of the oklab domain — including well outside the valid range — against
the published bundle:

```
$ node --input-type=module -e "…729-point sweep of oklab(L∈[-0.5,1.5], a∈[-1,1], b∈[-1,1])…"
tested 729   failures 0   []
oklab(NaN,0,0)       ok=false color_non_finite
oklab(Infinity,0,0)  ok=false color_non_finite
oklab(-Infinity,0,0) ok=false color_non_finite
```

`mapColorToGamut(…, "srgb")` did not fail once across the entire sampled domain, including
out-of-range lightness and chroma. The **only** failing inputs are non-finite, and those are gated
before the model: `useColorPipeline.ts:195` — `if (Number.isNaN(value) || !Number.isFinite(value))
return;` — and `picker-color.ts:170,191` (`withChannel`, `withAlpha`) both reject non-finite before
constructing.

**Ruling: the hypothesis does not hold. `gamutVerdict` cannot throw for any colour reachable through
the app's write gates.** Recorded so a sixth pass does not re-derive it. (This does *not* soften
Mechanism A — it narrows one speculative face of it, which makes the confirmed faces, L-20 and L-21,
the ones worth the cure budget.)

---

## Fifth-pass confirmations of prior findings (independent re-derivation, my numbers)

| prior finding | independently re-derived this pass | agreement |
|---|---|---|
| **L-1** (swallow) | node repro of all 8 crashers against `dist/subpaths/css.js`; live type of `oklch()` → badge `"not a valid color"`, `windowErrors: []`, `pageErrors: []` | **exact** |
| **L-1** (`previousInvalid` silence) | after the 2 s badge timer cleared, pressed Enter on the still-invalid `oklch()`: `{badgeAfterEnter:false, classAfter:false, textStill:"oklch()"}` — **zero feedback of any kind** | **exact** |
| **L-2** (`demo/ui/`) | 19/19 barrels are pure re-exports, zero local components; **46** demo files import `../ui/*`; **26** import both the shim and `@mkbabb/glass-ui` directly | agrees; adds the dual-dialect file count |
| **L-4** (`paths` drift) | `ls` misses on all 3 phantom targets; `traceResolution` shows `/css` resolving via `exports` self-reference with `Package ID …@4.0.0` while `/color` hits `paths` | **exact** |
| **L-5** (the twin) | real dir, not a symlink; `dist/subpaths/css.js` 43,973 B (Jul 27) vs twin 43,972 B (Jul 17); `diff` shows minifier-symbol differences only | agrees; my local `dist` is one rebuild newer than pass 1's |
| **L-8** (dead surface) | `grep colorInputRef` → 2 hits, declaration + binding, **never dereferenced**; `editTarget` appears exactly once in ColorInput | **exact** |
| **L-9** (god injection) | machine-parsed the return literal (`useColorPipeline.ts:281-332`): **38** members. Pass 1 states 40; I did not reproduce 40 and do not know which two it counted | minor numeric discrepancy, argument unaffected |
| **L-12** (dead `crown-appear`) | live: `animation: crown-appear …` → `getAnimations().length === 0`; control `crown-appear-55dadc03` → `1`; document registers only the hashed name | **exact** |
| **L-15** (phantom root barrel) | `package.json` has no `.`, no `main`, no `module`, no `types`; **no `src/index.ts` exists**; `grep "function debounce" src/` → zero hits | **exact** |
| §Negative proof (published-surface discipline) | ColorInput imports no library specifier at all; its cone uses only `@mkbabb/value.js/{color,css}`, both real `exports` keys; alias set is *generated* from that map | **exact** |

One numeric correction worth pinning: **`UseColorPipelineReturn` has 38 members, not 40** (machine
count of the return object literal, `useColorPipeline.ts:281-332`). The argument is unaffected.

---

## Fifth-pass finding index

| id | severity | mechanism | one line |
|---|---|---|---|
| L-20 | MAJOR | **A — failure inverted** (new face: split-brain readers of one input) | `?color=rgb()` → tab title `"rgb() — Color Picker"` while the app shows `oklch(72% 0.19 25deg)`; the bad link never heals; MT-F001's only observable trace in the whole app is a `console.warn` — the one severity the mega-tranche audit collects but does not grade. |
| L-21 | MAJOR | **A′ — failure answered with a plausible wrong answer** | `serializePickerColor` suppresses `serializeCssColor`'s `{ok:false, color_invalid_input}` for the 4 non-CSS spaces and substitutes oklch; `ColorInput.vue:104` prints it two lines under "*Any* valid CSS color string is accepted"; the sibling `ColorSpaceSelector.vue:161` guards the identical call. |
| L-22 | MAJOR | G — no testable seam | The only component-owned authenticated mutation has **zero** coverage at unit, component and e2e level, and `color-propose.spec.ts:24` cites `test/parsing/extract.test.ts`, which does not exist. Both stated reasons for the e2e skip are themselves filed defects (L-10, L-11). |
| L-23 | — | **correction to pass 4** | ColorInput **is** in the DOM at rest (measured twice, settled clean loads) and `.send-btn` **is** the visual audit's `namelessButtons: 1`. Pass 1's attribution was right. Underneath: presence depends on a template-ref round-trip the harness does not wait on, so **a11y counts in the sweep are nondeterministic** — two seats measured opposite values for one row. |
| L-24 | MINOR | H — the JS half of the timing contract has no home | 21 bare timing literals under `demo/`, zero shared home. Two unnamed `2000`s in `useColorParsing.ts` (debounce + badge lifetime) beside `500` for sliders. `ColorInput.vue:256` clears the mode-flash class at **300 ms** while the CSS it gates runs `--duration-slow = 0.45s` (measured live) — the animation is cut short on every toggle. Generalizes L-11. |
| — | — | negative proof | Pass 3's `gamutVerdict`-throws hypothesis **refuted**: 729-point oklab sweep, 0 failures; only non-finite inputs fail and all three write gates reject those. |

**Consolidated mechanism count across five passes: eight.**
A — the failure-explicit contract is inverted at the demo boundary (L-1, L-7, L-16, L-17, **L-20**).
A′ — **failure answered with a plausible wrong answer, not an error (L-21).**
B — the public surface is described by divergent maps and a stale twin (L-3, L-4, L-5, L-15).
C — a forbidden forwarding layer sits between the component and the design system (L-2, L-6, L-10).
D — the public surface is narrower than the library's own internal abstraction (L-14).
E — the demo re-derives a surface that is already public, and pays in erased types (L-18).
F — the composition root is a feature directory, splitting the tree into two namespaces (L-19).
G — **domain writes owned by leaves have no testable seam (L-22).**
H — **the JS half of the timing contract has no home (L-11, L-24).**

**The ranking is unchanged and is now five-for-five.** Make `parseCssColor` total and let `Result`
cross the boundary unconverted. This pass strengthens the case twice over: A′ (L-21) shows the
inversion does not merely hide errors, it manufactures **confident wrong output** on the app's
primary readout; and L-20 shows the one place the app *does* diagnose MT-F001 correctly is a
`console.warn` nobody grades. Both are net deletions under the same cure.

**Recommendation for a sixth pass, if one is spawned.** Do not re-audit the import graph — five
independent seats have now saturated it and agree. Audit the **state space**: this pass's three new
findings all came from driving the component into states no prior pass entered (a malformed deep
link, a non-CSS colour space, an unmounted-then-settled dock). The remaining unexplored states are
the propose leg under a failing backend (L-22 says it is untested *and* silent — nobody has watched
it fail), and the mobile dock, where `ActionBarLayer` never mounts at all.

