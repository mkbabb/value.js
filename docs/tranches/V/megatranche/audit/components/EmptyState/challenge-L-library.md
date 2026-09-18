# CHALLENGE-L — library structure under `demo/shared/ui/EmptyState.vue` (PASS 2, consolidated)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat. The
spawn declaration was explicit and matches the tier I observe. This seat is not inherited and not
undeclared.

**Substrate note.** The work order names `HEAD c654824e`. Actual HEAD at read time:

```
$ git rev-parse HEAD
f36f780c5938390b8dc93cd87920418e82cdd81a
$ git log --oneline -1
f36f780c docs(V·mega): STATE — three OM censuses complete, findings at MT-F043
```

The subject file is byte-identical across that range — `git diff --stat c654824e -- demo/shared/ui/EmptyState.vue`
is empty, and `git status --short` on it is clean. Every line number below is against the working
tree, which equals `c654824e` for this file.

**Prior pass.** A pass-1 challenge-L report existed at this path (written against `80fc5c40`). It
is preserved verbatim at **`challenge-L-library.pass1.md`** and is superseded — not discarded — by
this document. This report carries every pass-1 finding forward, records which I independently
**confirmed**, which I **corrected**, and adds seven that pass 1 did not reach. Where pass 1's
long-form evidence is better than a summary, I cite it rather than restate it.

**One citation correction to pass 1:** it cites the import block as `EmptyState.vue:65-66`. The
file is unchanged and the imports are at **`:69-70`**. Its `:45-47` citations are correct.

---

## Verdict

**DEFECTIVE.** The component's *import graph* is clean — this is the finding the challenge premise
does not predict, and it is worth stating first. Every edge is legal, every specifier is one a real
consumer could write, `demo/shared/` is a pure sink with 24 inbound and zero outbound feature
edges, and value.js's own published surface holds under adversarial grep.

The defects are all in the layers the module graph cannot see: the **attribute contract** at the
glass-ui boundary, a **CSS side channel** to the app-shell boot, a **dead configuration axis** that
a certified oracle forbids anyone to use, a **directory whose name inverts its contents**, and a
**second hand-rolled declaration of the export surface** beside a generated one.

**Strongest defect: L-1 (carried from pass 1, independently confirmed) — `tag=` is dead at the
glass-ui boundary.** Runner-up, and new in this pass: **N-1 — the `dots` prop.**

---

## Confirmation ledger for pass 1

| pass-1 finding | pass-2 disposition |
|---|---|
| **L-1** `tag=` dead prop, glass 7 boundary | **CONFIRMED independently.** `grep -o "tag" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` → **zero occurrences** in the shipped 7.0.0 bundle; `inheritAttrs:` present. `EmptyState.vue:45-47` still pass `tag="div"` ×3. |
| **L-2** package cycle + 5.8 MB phantom deps | **CONFIRMED, same numbers.** `du -sh` → glass-ui 5.2M + keyframes.js 608K against `dist/subpaths` 132K = **44×**. glass-ui `peerDependencies["@mkbabb/value.js"]: "^4.0.0"` ⇒ declared cycle. `src/`'s only external bare import is `vue`, and only in an ambient `.d.ts`; all 7 built bundles import nothing. |
| **L-3** error plate has two implementations | **CONFIRMED and EXTENDED — there are three.** See N-2. |
| **L-4** two species wearing one name | **CONFIRMED**, and its `dots` remark is sharpened into a standalone blocker-class finding. See N-1. |
| **L-5** leaf → boot CSS side channel | **CONFIRMED, and its hypothesis half converted to a measurement.** See N-3. |
| **L-6** `.plate-ink` ×5 | **CONFIRMED** (identical md5 ×5). Cure amended: `demo/styles/foundation.css`, not `utils.css` — see N-3. |
| **L-7** `PaletteCardGrid` `empty*` prefix | **CONFIRMED and EXTENDED** — the rename also *truncates* the surface, which is the mechanism behind N-1. |
| **L-8** per-instance styling | **CONFIRMED for the 6 `font-display` Retry overrides. Third bullet CORRECTED** — see N-4. |
| **L-9** glass-ui has no empty-state | **CONFIRMED** (74 export keys, none empty-ish; `dist/components/` has no such dir). Its judgement — decline to file, propose `./plate` via BH relay — I endorse. |
| **L-10** `shared/` is a residue bucket | **CONFIRMED and INVERTED** — the sharper fact is what `demo/ui/` contains. See N-4. |
| §7 negative proofs (published surface, god module, `useDark`/`useLayerTransition`, visual) | **CONFIRMED**, and extended with a resolution-level proof pass 1 did not run. See N-5. |

---

## New findings

### N-1 · MAJOR — `dots` is a dead configuration axis, unreachable by construction, and a certified oracle forbids its use

Pass 1's L-4 notes that `dots` "defaults `true` on a variant that has no dots." That is true and
incomplete. The prop is dead in four independent senses.

**(a) Zero call sites.** `grep -rn ":dots\|dots=" demo/` returns **nothing**. Every occurrence of
the bare token in the demo tree belongs to something else:

```
$ grep -rn "\bdots\b" demo/ | grep -v "^demo/shared/ui/EmptyState.vue"
demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:5,125,127,233   # specimen-dots
demo/styles/utils.css:169                                                            # MixResultDisplay
```

**(b) The condition it models cannot occur.** `EmptyState.vue:83-90` says to shed the trio "ONLY
where a card-scale instrument ghost seats beside this caption." `ShadowPalette` — that ghost — has
exactly one seat in the tree, `demo/workbenches/extract/ExtractWorkbench.vue:159`, and
`demo/workbenches/extract/` imports no `EmptyState`.

**(c) It is unreachable from the one plate that has a second ghost register.** `PaletteCardGrid.vue`
forwards only `message`/`eyebrow`/`hint` (`:24-26`) and its `defineProps` (`:38-44`) has no `dots`.
`PalettesPane.vue:75` therefore cannot pass it. Measured live on `/#/palettes`, 1440×900:

```json
{"ghostRegistersOnPlate":[
  {"cls":"dashed-well","w":462,"h":114},
  {"cls":"add-slot-ghost btn-interactive w-11 h-11 sm:w-12 …","w":48,"h":48},
  {"cls":"watercolor-ghost-stroke","w":48,"h":48},
  {"cls":"watercolor-ghost-stroke","w":32,"h":32},
  {"cls":"watercolor-ghost-stroke","w":44,"h":44},
  {"cls":"watercolor-ghost-stroke","w":24,"h":24}]}
```

Four dashed watercolor ghosts across two registers plus the dashed well — and the two registers
sit at **48px and 44px**, i.e. the *same* scale, not "two scales". Visible in
`audit/visual/shots/safari-desktop-light/browse.png` and `…/admin-users.png`, right pane.

**(d) The oracle certifies the state the prop exists to prevent.**
`e2e/smoke/oracles/o9-shadow-palette.spec.ts:265-269`:

```
    // Positive control: the sibling My Palettes pane KEEPS its true-empty
    // trio — the error exemption is scoped to the erroring surface, never
    // a global amputation.
    await assertTrio(pane(page, "My Palettes"));
```

The N-3 clause quoted at `EmptyState.vue:29-38` has been superseded by owner ruling and by test.
`dots` is not under-used — it is **forbidden to be used** on the only plate where it would apply.

**Cure.** Delete the prop, its default, its `v-if` branch, and its eight-line doc block. The trio
is unconditional. This is deletion, not patch: it removes a configuration axis no caller can set
and no test may exercise. It folds cleanly into pass-1 L-4's `EmptyPlate`/`ErrorPlate` split —
`EmptyPlate` simply always paints the trio.

---

### N-2 · MAJOR — the error register has **three** implementations, not two

Pass 1's L-3 finds `EmptyState` (error) and `ErrorBoundary`. There is a third:
`demo/scenes/about/markdown/Markdown.vue:19-30` renders `<Alert><AlertTitle class="font-display
text-heading">`, and its own comment **admits the copy**:

> T.W4-6 (T-15/F7 census): an error HEADLINE is a title surface — it joins the EmptyState
> error-statement register verbatim (`font-display text-heading`, S.W5-5), retiring the stock
> `text-4xl` body-voice one-off …

So the register is hand-replicated in a third file, by design, with the duplication documented as
intentional. `Markdown.vue:35` reaches it through `../../../ui/alert` — which is itself an alias
barrel (N-4).

For the record, the `EmptyState`/`ErrorBoundary` divergence is four numbers:
`26ch→28ch` (`:20` vs `:24`), `44ch→46ch` (`:23` vs `:27`), `w-6→w-7` (`:19` vs `:23`),
`gap-2.5 py-8 → gap-3 py-10 px-6` (`:16` vs `:18`). The `.plate-ink` scoped rule is byte-identical.

**Cure.** As pass-1 L-3, plus: `Markdown.vue` composes the same `ErrorPlate`. One error register,
one set of ch-widths, one ink rule, zero hand-copied class strings.

---

### N-3 · MAJOR — the masking fallback measured: **3.753:1** where the certified rung measures **5.213:1**

Pass 1's L-5 establishes the side channel and quotes the component's own `3.84:1` comment, then
labels the blast-radius half a hypothesis. I measured the real thing.

Structure first, confirming pass 1: `--ink-muted` has **no declaration in the stylesheet layer at
all** — `grep -rn -- "--ink-muted\s*:" demo/` returns zero hits across CSS *and* Vue SFCs, not just
`demo/styles/`. Sole producer: `useAtmosphereBoot.ts:103` `setProperty` on `documentElement`.

Measured live, `http://localhost:9000/#/palettes`, 1440×900, light, `deviceScaleFactor: 1`. Plate
ground sampled by screenshotting a 16×12 bare-plate strip 40px left of the eyebrow box and
averaging its pixels; both ink rungs resolved through a 1×1 canvas 2D context; WCAG 2.x relative
luminance:

```json
{"platePixel":[244,206,203],
 "contrast_boot_inkMuted":5.213,
 "contrast_fallback_mutedForeground":3.753,
 "wcag_small_text_floor":4.5}
```

- boot rung `oklch(44.712054906087% 0.003861589952 34.629978305623deg)` → `rgb(86,84,83)` → **5.213:1**, passes.
- fallback `--muted-foreground` = `light-dark(hsl(30 22% 40%), hsl(34 14% 62%))` → light `rgb(124,102,80)` → **3.753:1**, **fails**.

So the masked value is a real, measured WCAG failure on the real plate — no longer a quotation from
a comment. It is masked identically in five files (pass-1 L-6's md5 proof).

**Cure — amended from pass 1.** Pass 1 sends `.plate-ink` to `demo/styles/utils.css`. Prefer
**`demo/styles/foundation.css`**, because that file already hosts exactly this species of shared
demo class — `.console-well` (`:350`), `.slug-pill` (`:585-586`) — and already declares the sibling
token `--accent-live` at `:231` as a pre-hydration literal. So:

1. `:root { --ink-muted: <certified literal>; }` in `foundation.css`, beside `--accent-live`. The
   boot writer then **refines** a declared token instead of **originating** an undeclared one.
2. One unscoped `.plate-ink` in `foundation.css`, **with no fallback** — there is nothing left to
   mask. Delete all five scoped blocks and ~40 lines of repeated rationale prose.

Neither step invents a file, a directory, or an abstraction. Both use idioms already in the tree.

---

### N-4 · MAJOR — inverted `ui/` ownership, and a correction to pass-1 L-8

Pass 1's L-8 third bullet states: *"Two Button sources coexist: `demo/ui/button/index.ts` (local
shadcn) and glass-ui's published `./button` … The shadcn tree is a standing sanctioned structure."*
**That is not true at this HEAD.** The entire file is:

```
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

There is exactly **one** Button source — glass-ui. `demo/ui/button` is an alias in front of it. The
generalisation:

```
$ find demo/ui -name "*.vue" | wc -l
       0
```

**Nineteen directories, zero components.** Every `demo/ui/*/index.ts` is a pure glass-ui re-export
(measured per file: one `from "@mkbabb/glass-ui"` line, one `export` line; `alert` adds a type
re-export). `demo/ui/alert/index.ts` documents its own nature: *"ui/alert — re-export of the
glass-ui Alert primitive … B.W2 … converted it to a re-export."*

That is the alias layer edict 2 forbids, and it produces an **inverted lattice**: the directory
named `ui/` holds no UI, and the directory holding the demo's two real UI atoms is named
`shared/ui/`. In one file — `AdminUsersPanel.vue` — a reader sees `../../../shared/ui/EmptyState.vue`
(`:202`) next to a `ui/` import and cannot tell which is demo-owned.

**Sharper still:** 13 of the 19 barrels import the glass-ui **root** where a granular subpath for
that exact component exists in glass-ui's 74-key map:

```
badge button card collapsible dialog dropdown-menu label popover
select separator slider switch tooltip      → SUBPATH-EXISTS, barrel imports root
alert avatar checkbox radio-group skeleton  → no granular subpath in glass-ui at all
input                                        → correctly uses "@mkbabb/glass-ui/forms"
```

`EmptyState.vue:70` gets this right (`@mkbabb/glass-ui/watercolor-dot`); the barrels get it wrong
in 13 cases. The five with no subpath (`alert`, `avatar`, `checkbox`, `radio-group`, `skeleton`)
are a **glass-ui export-map gap** — a BH relay item under the standing relay edict, not a value.js
edit.

**Cure.** Dissolve the 19 barrels (already booked — `apotheosis/armB/WAVE-REGISTRY.md:20-26`,
"`demo/ui/` 19-barrel dissolution + stale `components.json` deletion"), importing glass-ui by
granular subpath at each call site. `demo/ui/` then becomes the one home for demo-owned atoms and
`demo/shared/` dissolves, which is the same destination pass-1 L-10 and §8 argue for, reached by a
different and stronger road.

---

### N-5 · MINOR — a drifted second declaration of the export surface, and the negative proof that it is inert

`vite.config.ts:37-50` **generates** its alias set from `package.json#exports`, with the rationale
stated in the file: *"GENERATED (not hand-rolled) so the alias set can never drift from the exports
map."* `tsconfig.demo.json:36-50` hand-rolls the same map. It has drifted:

```
in tsconfig NOT in exports: [ '@mkbabb/value.js', '@mkbabb/value.js/parsing', '@mkbabb/value.js/units' ]
in exports NOT in tsconfig: [ '@mkbabb/value.js/value', '@mkbabb/value.js/css' ]
```

Three of the eight mapped targets do not exist after a full build:

```
MISSING dist/index.d.ts   MISSING dist/subpaths/parsing.d.ts   MISSING dist/subpaths/units.d.ts
EXISTS  dist/subpaths/css.d.ts    EXISTS dist/subpaths/value.d.ts
```

The file's own header claims *"the demo speaks only the 8 public keys"*; the published map has 7.

**This is NOT a live mis-resolution — and the negative proof matters, because the drift looks
dangerous and is not.** I hypothesised that `/css` (imported 10× by the demo, with no `paths`
entry) would fall through to the installed `node_modules/@mkbabb/value.js@4.0.0` self-copy — which
is real, and whose `css.d.ts` is **10,910 bytes against the local build's 12,490**. A
`tsc --traceResolution` run against the real `tsconfig.demo.json`, from a probe inside the repo,
falsifies it (`evidence/resolution-trace.txt`):

```
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
… Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.  Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … successfully resolved to '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' …
```

TypeScript **self-name resolution** walks to the repo's own `package.json`, sees
`name: "@mkbabb/value.js"`, and resolves through its `exports` to the local build. `/color`, which
*does* match a `paths` pattern, resolves to the same place by the other road. The unmapped keys are
handled correctly by the exports map itself.

(Positional caveat worth recording: the answer depends on the probe's location. Run from **outside**
the repo the same specifier resolves to `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` —
the frozen 4.0.0 tarball. Demo files live inside the repo, so the demo program is safe; anything
that ever typechecks demo sources from an out-of-tree config would not be.)

**Cure.** Delete the value.js `paths` entries from `tsconfig.demo.json`. They are redundant, three
are dead, and their existence is the only thing that can drift. One authority for the export
surface: `package.json#exports` — generated for Vite, self-named for tsc. This is the same
single-ownership principle the vite config already applies, extended to the config that did not.

---

### N-6 · MINOR — the e2e oracle asserts on glass-ui private internals, at the boundary that just moved

`e2e/smoke/oracles/o9-shadow-palette.spec.ts:74-78`:

```
    await expect(trio.locator('[data-variant="ghost"]')).toHaveCount(3);
    await expect(trio.locator(".watercolor-ghost-stroke")).toHaveCount(3);
```

Neither selector is published. The whole public API of the subpath is:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/index.d.ts
export { default as WatercolorDot } from "./WatercolorDot.vue";
export { useWatercolorBlob, type UseWatercolorBlobOptions, type WatercolorBlob, } from "./useWatercolorBlob";
export { mulberry32, hashString, randomRadii, radiiToCSS } from "./prng";
```

This compounds pass-1 L-1 rather than sitting beside it: the same boundary that silently swallowed
`tag=` across 18 bindings is one a value.js **test** reaches through by private class name. A
glass-ui refactor that renames `.watercolor-ghost-stroke` turns value.js's e2e red for no
behavioural reason — the mirror-image failure of L-1, where a glass-ui change turned value.js's
markup dead with no failure at all.

**Cure.** Assert on value.js's own contract — the child count of `[data-slot="empty-state-trio"]`,
which `EmptyState.vue:40` owns — and relay to glass-ui (BH inbox) a request to publish a stable
`data-slot` on the ghost stroke, carried on the same letter as the L-1 `tag=` migration.

---

### N-7 · MINOR — Vue 3.5 idiom fork between the twins; `| undefined` cancels `exactOptionalPropertyTypes`

`EmptyState.vue:72-91` uses the legacy form with `?: T | undefined` on every prop:

```ts
withDefaults(
    defineProps<{ message?: string | undefined; variant?: "empty" | "error" | undefined; … }>(),
    { variant: "empty", eyebrow: "· empty plate ·", dots: true },
);
```

Its near-twin `ErrorBoundary.vue:43-51` uses the Vue 3.5 reactive-props destructure with inline
defaults and plain `?: T`:

```ts
const { message = "This panel hit an unexpected error.", retryLabel = "Try again" } =
    defineProps<{ message?: string; retryLabel?: string }>();
```

Two idioms for one job in two files that paint the same plate — edict 7. Separately,
`tsconfig.base.json:13` sets `"exactOptionalPropertyTypes": true`; writing `?: string | undefined`
re-admits explicit `undefined` and **cancels that flag across this component's entire prop
surface**. Pass 1 quotes these types in L-4 but reads them only as a union-shape problem.

**Cure.** Adopt the destructure form, drop every `| undefined`, matching `ErrorBoundary`. Folds
into pass-1 L-4's split at no extra cost.

---

### N-8 · INFO — no unit test; the harness is installed with zero consumers

```
$ grep -rn "@vue/test-utils" test/ e2e/ demo/ src/
(no output)
```

`@vue/test-utils` is a devDependency with **zero consumers repo-wide**. `EmptyState` — 12
referencing files, two species, five conditional branches, and the WCAG-critical ink rung of N-3 —
has no unit coverage. Its only coverage is an e2e oracle, which is why N-3's contrast gap is
invisible to `npm test`, and why pass 1 had to label its mount-outside-boot blast radius a
hypothesis: **the mount context that would prove it is exactly the one no test exercises.** A
mounted `EmptyState` with no boot writer, asserting the computed colour of `.plate-ink`, converts
that hypothesis into a gate.

### N-9 · INFO — the two branches duplicate the root class list

`EmptyState.vue:16` and `:28` carry the byte-identical string
`flex flex-col items-center justify-center gap-2.5 py-8 text-center`. After the L-4/N-2 split there
is one plate shell; this becomes a single scoped `.plate` class.

---

## Negative proofs — what came back clean

Carrying pass-1 §7 forward (published surface, god module, `src/` doing this component's job,
`useDark`/`useLayerTransition`, the 60-capture visual matrix), all re-confirmed, plus four more:

1. **The import graph is sound in both directions.** `demo/shared/` has **24 inbound** edges and
   **zero outbound** edges into any feature, shell, or boot module — its complete outbound set is
   `@lucide/vue`, `@mkbabb/glass-ui/watercolor-dot`, `clsx`, `tailwind-merge`. No feature → shell,
   no component → boot, no demo → `src/` internal. The premise of this challenge — a violating
   import edge — has no instance here.
2. **`@mkbabb/glass-ui/watercolor-dot` is a real published key**, not a deep path. A real consumer
   could write `EmptyState.vue:70` verbatim. (Its *payload* is another matter — L-1.)
3. **No bespoke empty-state bypasses the component.** Scanning every `.vue` matching seven
   empty-phrase patterns (`No results`, `No matches`, `Nothing here`, `is empty`, `No items`,
   `No colors`, `No palettes`, `No entries`) and filtering to files that do **not** reference
   `EmptyState` returns the empty set. The empty species genuinely has one home; only the *error*
   species is forked (N-2).
4. **Attribute fallthrough across the root `v-if`/`v-else` works** — the one thing about this
   two-root template that could silently fail. Measured on the rendered DOM: the `EmptyState` root
   under `PaletteCardGrid` carries `"flex flex-col items-center justify-center gap-2.5 py-8
   text-center col-span-full"`, `hasColSpanFull: true`, `role: "status"`.

---

## The greenfield lattice

Pass-1 §8 states this well; here it is with N-1/N-4/N-5 folded in.

```
demo/ui/                       ← the ONE home for demo-owned atoms.
  empty-plate/EmptyPlate.vue     The 19 alias barrels are DELETED; glass-ui is imported
  error-plate/ErrorPlate.vue     by GRANULAR subpath at every call site.
  pane-header/PaneHeader.vue
demo/platform/                 ← debounce moves here (auth/ storage/ transport/ already exist)
demo/styles/foundation.css     ← :root declares --ink-muted statically beside --accent-live (:231);
                                 .plate-ink joins .console-well (:350) / .slug-pill (:585) as ONE rule
demo/shared/                   ← DISSOLVED (cn() retirement already booked)
```

Ownership rules:

1. **Two plates, one home.** `EmptyPlate` (role=status · eyebrow · display · hint · `#action` ·
   always paints the trio — N-1 retires the axis) and `ErrorPlate` (role=alert · glyph · display ·
   detail · `retryLabel` prop, `@retry` emit). `variant` is retired outright, no alias. Six admin
   call sites collapse to one line each. `ErrorBoundary` and `Markdown` compose `ErrorPlate`;
   `ErrorBoundary` keeps only its a11y and lifecycle.
2. **No renaming wrappers.** `PaletteCardGrid` owns grid layout and exposes an `#empty` slot; hosts
   render the plate into it with its real prop names. No prop can be lost in transit because
   nothing is in transit — which is what made N-1(c) possible.
3. **Tokens are declared where they are consumed from, statically.** Runtime writers refine
   declared tokens; they never originate undeclared ones. No consumer writes `var(x, y)` for a
   token the design system owns. The leaf → boot edge becomes a cascade contract that holds in
   every mount context, including the one N-8 says nobody tests.
4. **One authority per surface.** `package.json#exports` is the export surface: Vite generates from
   it, tsc self-name-resolves through it, and no hand-rolled third copy exists.
5. **`dependencies` lists what the bundles import.** For this library that is `{}`.
6. **Cross-repo assertions use published contracts only** — value.js's own `data-slot`s, never
   glass-ui's internal class names. The L-1 `tag=` migration and the N-6 selector request ride one
   BH relay letter, together with the five missing glass-ui subpaths from N-4 and the `./plate`
   primitive proposal from pass-1 L-9.

Net motion is deletion: one prop, four wrapper props, one slot rename, four scoped style blocks,
one forked component and one hand-copied register, 19 barrels, eight tsconfig path entries, two
package dependencies, 18 `tag=` bindings. `EmptyPlate.vue` lands near 45 lines with no scoped
style at all.

---

## Evidence index

- **`challenge-L-library.pass1.md`** — pass 1 verbatim, at `80fc5c40`. Long-form evidence for L-1
  (the glass-ui `490cc46e` diff and the live `hasTagAttr:false` probe), L-2, L-5, L-6 md5s.
- **`evidence/resolution-trace.txt`** — `tsc --traceResolution` against the real
  `tsconfig.demo.json` (N-5 negative proof). Reproduce: write a two-line probe importing
  `@mkbabb/value.js/css` and `…/color` **inside the repo**, point a tsconfig at it with
  `"extends": "<repo>/tsconfig.demo.json"` and `"traceResolution": true`, run
  `node_modules/.bin/tsc -p`.
- **Live probes** (N-1 ghost census, N-3 contrast, negative proof 4) — headless chromium against
  `http://localhost:9000/#/palettes`, 1440×900, `deviceScaleFactor: 1`, 4.5 s settle. Outputs
  pasted inline above.
- **Screenshots read**: `audit/visual/shots/safari-desktop-light/browse.png` and `…/admin-users.png`
  — both show the two species side by side, and the two-ghost-register My Palettes plate of N-1(c).
