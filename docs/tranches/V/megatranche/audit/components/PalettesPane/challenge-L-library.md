# CHALLENGE-L — PalettesPane: library structure

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
variant. This matches the explicit declaration under which this seat was spawned. The seat is
declared, not inherited.

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD is `32b4040e`** (`docs(V·mega): r3 DELTA COMPLETE — 3 apotheoses merged in place`), **not
  `c654824e` as the work order states**. The tree moved under the workflow. All file:line citations
  below are against `32b4040e`.
- Subject: `demo/palettes/PalettesPane.vue`, 212 lines, area `palettes`.

## Verdict

**DEFECTIVE.** Two BLOCKERs, four MAJORs, three MINORs, one INFO.

The strongest finding is not a boundary crossing — it is that **the one piece of behaviour this
component owns outright (drag-to-reorder) is structurally miswired and deterministically persists a
corrupted order**, reproduced 3/3. The second is that **the palette export the app ships and the
palette export the test suite proves are different implementations that disagree by construction**.

The demo → `@mkbabb/value.js` edge — the axis this challenge most expects to be rotten — is
**clean**, and I prove it below rather than merely failing to find fault.

---

## The import graph, edge by edge

`PalettesPane.vue:127-152`. Every specifier traced to its home:

| # | Specifier | Resolves to | Verdict |
|---|---|---|---|
| 1 | `vue` | framework | ok — but 3 of 7 named imports unused (L-8) |
| 2 | `../ui/card` | `demo/ui/card/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 3 | `../ui/button` | `demo/ui/button/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 4 | `../ui/badge` | `demo/ui/badge/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 5 | `@lucide/vue` | icon package | ok |
| 6 | `@vueuse/integrations/useSortable` | vueuse | **misused (L-1)** |
| 7 | `./usePalettePorts` | `demo/palettes/usePalettePorts.ts` | **cycle anchor (L-3)** |
| 8 | `../color-session/keys` | `demo/color-session/keys.ts` | ok — leaf keys module, correct idiom |
| 9 | `./browser/card` | `demo/palettes/browser/card/index.ts` | ok — own feature |
| 10 | `@mkbabb/glass-ui/dialog` | granular published subpath | ok — **and it contradicts #2-4** |
| 11 | `@mkbabb/glass-ui/search` | granular published subpath | ok — **and it contradicts #2-4** |
| 12 | `../shared/ui/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | ok — 9 real consumers |
| 13 | `./types` (`import type`) | own feature | ok — correct `import type` |
| 14 | `./usePaletteExport` | `demo/palettes/usePaletteExport.ts` | **legacy path (L-2)** |

No import from `@mkbabb/value.js` appears in this file directly; it enters the closure through
`../color-session/*` and `./mix.ts` (see the negative proof).

---

# Findings

## L-1 — BLOCKER — drag-to-reorder is structurally miswired and persists a corrupted order

**Where:** `demo/palettes/PalettesPane.vue:180-197`.

```ts
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);

useSortable(sortableEl, pm.filteredSaved.value, {   // ← .value: a DEREFERENCED computed
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onEnd(evt) {                                     // ← onEnd does NOT override vueuse's onUpdate
        …
        const ids = pm.filteredSaved.value.map((p) => p.id);
        const [moved] = ids.splice(evt.oldIndex, 1);
        …
        pm.reorderPalettes(ids);
    },
});
```

### Reproduction (measured, deterministic)

Script: `scratchpad/reorder-probe2.mjs` — headless Chromium against the live dev server at
`http://localhost:9000`, `localStorage["color-palettes"]` seeded with four local palettes
`A,B,C,D`, reload, pointer-drag one `.drag-handle` onto another, read the persisted store back.

```
run1  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run2  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run3  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run4  drag 3->1  STORE=[A,B,C,D]  DOM=[PalA,PalB,PalC,PalD]

expected for 0->2 : BCAD
observed 0->2 set : ["CBDA"]
expected for 3->1 : ADBC  (D moves to index 1)
observed 3->1     : ABCD
```

- **Forward drag (0→2): every one of the four positions is wrong**, deterministically, 3/3.
- **Backward drag (3→1): the reorder is silently discarded** — a total no-op.

The corrupted order is written through to `localStorage` and survives reload. This is not a visual
glitch; it is data loss of user intent.

### Mechanism — three compounding structural errors

Pasted from `node_modules/@vueuse/integrations/dist/useSortable.js`:

```js
const defaultOptions = { onUpdate: (e) => {
    moveArrayElement(list, e.oldIndex, e.newIndex, e);
} };
…
sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
…
function moveArrayElement(list, from, to, e = null) {
	if (e != null) { removeNode(e.item); insertNodeAt(e.from, e.item, from); }
	const _valueIsRef = isRef(list);
	const array = _valueIsRef ? [...toValue(list)] : toValue(list);   // ← NO COPY when not a ref
	if (to >= 0 && to < array.length) {
		const element = array.splice(from, 1)[0];                     // ← SYNCHRONOUS removal
		nextTick(() => { array.splice(to, 0, element); if (_valueIsRef) list.value = array; });
	}
}
```

1. **The list argument is a dereferenced computed, not a ref.** `isRef(list)` is `false`, so vueuse
   takes the no-copy branch and splices the caller's array *in place*, and never writes back. The
   whole write-back half of vueuse's contract is dead.
2. **`onEnd` does not override `onUpdate`.** The spread is `{...defaultOptions, ...resetOptions}` —
   different keys, so vueuse's `onUpdate` survives alongside the custom `onEnd`. Both fire.
   sortablejs fires `onUpdate` *before* `onEnd`, and `moveArrayElement`'s removal is synchronous
   while its reinsertion is deferred to `nextTick`. So by the time `onEnd` reads
   `pm.filteredSaved.value`, the array is one element short and the indices `evt.oldIndex` /
   `evt.newIndex` no longer address what the user dragged.
3. **The array being mutilated is a live computed cache.** `demo/palettes/useFilteredList.ts:9`:
   `if (!q) return items.value;` — with an empty search box the computed returns
   `savedPalettes.value` *by reference*. `demo/palettes/usePaletteStore.ts:51` `savedPalettes` is
   itself a `computed`. Nothing invalidates it during the drag, so `onEnd` re-reads the same
   already-spliced cached array. A `computed` is being mutated from the outside.

### Proposed cure — architectural, not a patch

Delete `PalettesPane.vue:179-197` entirely. Reorder is a **store** concern and the store already
owns it (`usePaletteStore.ts:153 reorderPalettes`). The view's job is to report an *intent*, not to
compute a permutation:

- `PaletteCardGrid` owns the sortable binding (it already owns the `$el` the pane reaches through —
  see its own comment at `demo/palettes/browser/card/PaletteCardGrid.vue:10`, which documents the
  pane reaching into its `$el` as a known wart) and emits `@reorder="(fromId, toId) => …"`.
- The library port exposes `moveePalette(fromId, toId)`; `usePaletteStore` performs the splice on
  the *store array*, which is the only mutable owner of order.
- No component ever holds a dereferenced computed, and the vueuse write-back branch is never
  entered because the view never owns the list.

This removes the `@vueuse/integrations` import from the pane, removes `ref`/`computed`/`$el`
reach-through, and puts order-mutation in exactly one place.

---

## L-2 — BLOCKER — two live export implementations; the shipped one and the tested one disagree

**Where:** `demo/palettes/export.ts` (132 L, flat file) **and** `demo/palettes/export/` (12 files,
914 L) both exist as siblings. `demo/palettes/usePaletteExport.ts:9` imports `"./export"`.
`export/` has **no `index.ts`**, so `./export` resolves to the flat file. Consumed at
`PalettesPane.vue:96` (`@export="(p, fmt) => onExport(p, fmt)"`) and `:211`.

**Consumer census — exactly one each, and they do not overlap:**

```
$ grep -rn "export/serializers|export/json|export/css|…" --include=*.ts --include=*.vue demo/ src/ test/ e2e/
  demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";

$ grep -rn 'from "\./export"|palettes/export"' --include=*.ts --include=*.vue demo/ test/ e2e/
  demo/palettes/usePaletteExport.ts:9:} from "./export";
```

**Measured:** `demo/palettes/export/*.ts` = **914 lines**. `demo/test/export/byte-exact.test.ts` =
**453 lines, 78 `expect(` assertions**. All of it guards code **no running page ever loads**.

The code admits it — `demo/palettes/export/serializers.ts:5-9`:

> *"This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`…"*

And `docs/tranches/V/reformation/CARRY-LEDGER.md:25` books the retirement under **D57 / W50**, which
has not executed.

**The two disagree by construction.** CSS export, byte-for-byte:

| | shipped (`export.ts:26-37`) | tested (`export/css.ts:9-17` + `canonical.ts`) |
|---|---|---|
| token prefix | `palette-<slugify(palette.name)>` | `identifierPrefix(snapshot)` = the stored `slug`, or `palette-<digest>` for a draft |
| index | `0`-based, unpadded (`-0`, `-1`) | `1`-based, zero-padded (`color-001`) |
| colour spelling | `c.css` — the raw user string, verbatim | `canonicalColor()` — fixed-point `oklch(92.000% 0.012345 88.800 / 1.000000)` |

Asserted by the test at `demo/test/export/byte-exact.test.ts:156-158`:
`":root {\n  --s-color-001: oklch(92.000% 0.012345 88.800 / 1.000000);\n}\n"`.
Produced by the app: `":root {\n  --palette-my-set-0: #ff0000;\n}\n"`.

**This is a false proof of the export surface.** 78 green assertions certify bytes that no user can
obtain. `docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51 is the byte authority and the shipping
path does not implement it.

**Secondary consequence:** the shipped `exportAsPNG` (`export.ts:85-119`) hand-rolls an
`<img>` + Canvas-2D SVG rasterizer and touches **no** value.js. The unshipped `export/png.ts:11`
correctly does `import { oklch, toRgba8 } from "@mkbabb/value.js/color"`. The one export path that
dogfoods the library is the one that is dead.

**Proposed cure:** execute D57 as a *deletion*, not a migration. `rm demo/palettes/export.ts` and
`demo/palettes/usePaletteExport.ts`; rename `export/serializers.ts` → `export/index.ts` so
`./export` resolves to the contract set; give the card menu a `format` intent that the port turns
into a snapshot + serializer call. `usePaletteExport` is a 27-line `switch` wrapper with no state —
it is not a composable, it is a function, and it should be `export/download.ts`.

---

## L-3 — MAJOR — a palettes ⇄ shell dependency cycle, created purely by where the injection keys live

**Where:** `demo/palettes/usePalettePorts.ts` holds *both* the provider `providePalettePorts` (43-259)
*and* the five `InjectionKey` symbols (271-275). `PalettesPane.vue:134` imports two of those keys.

**The cycle, both directions:**

```
palettes → shell:  demo/palettes/usePalettePorts.ts:19
                   import type { ViewId } from "../shell/useViewManager";

shell → palettes:  demo/shell/dock/Dock.vue:18
                   demo/shell/dock/DockViewSelect.vue:8
                   demo/shell/dock/layers/SlugEditLayer.vue:5
                   demo/shell/dock/menus/ProfileSection.vue:14
                   demo/shell/dock/menus/MobileMenuDropdown.vue:13
                   import { SESSION_PORT_KEY } from "…/palettes/usePalettePorts";
```

Five shell components reach into a feature module to read one `Symbol`. `Dock.vue:37` uses exactly
one thing from that import — `inject(SESSION_PORT_KEY)`.

**Measured cost.** Transitive relative-import closure (`scratchpad/closure.mjs`):

```
=== demo/palettes/PalettesPane.vue ===
  modules in closure: 97
  by area: {"palettes":57,"color-session":17,"platform":10,"ui":8,"shared":3,"shell":2}
  ADMIN modules (18): api/admin-audit.ts, api/admin-colors.ts, api/admin-users.ts,
                      api/admin-palettes.ts, useAdminTags.ts, platform/auth/useAdminAuth.ts …
  SHELL modules (2): demo/shell/useViewManager.ts, demo/shell/viewSchema.ts

=== demo/palettes/usePaletteStore.ts ===
  modules in closure: 3
```

**97 modules — 18 of them admin — to render a list of the user's own saved palettes.** The store it
actually needs is 3. 92 of the 97 arrive through the `./usePalettePorts` key import.

The type coupling is unavoidable as written: `LibraryPort = ReturnType<typeof providePalettePorts>["library"]`
(`usePalettePorts.ts:264-266`), so typechecking this pane requires inferring the full return of a
function that calls `useAdminUsers`, `useAdminAudit`, `useAdminFlagged`, `useAdminTags`,
`useColorNameQueue`, `useBrowsePalettes`, `useVersionHistory`, `useTagEdit`, `useSlugMigration`, all
three `platform/auth/*`, and `shell/useViewManager`.

**And it is on the boot critical path.** `demo/color-picker/App.vue:167` statically imports
`{ Dock } from "../shell/dock"` (mounted at `:35`, not async — contrast `usePaneRouter.ts:70-76`,
which *does* use `defineAsyncComponent` for the panes). So the app's synchronous entry graph
includes the admin API modules because the dock needs a Symbol.

**The repo already knows the cure and applies it one directory over.** `demo/color-session/keys.ts`
is a pure leaf: type-only imports, seven `InjectionKey` symbols, **26 consumers, zero cycle**.
`PalettesPane.vue:135` imports `CSS_COLOR_KEY` from it and pays nothing.

**Proposed cure:** `demo/palettes/keys.ts` — the five `InjectionKey` symbols and their port
interfaces, declared *structurally* (hand-written interfaces, not `ReturnType<typeof …>`), with
type-only imports. `usePalettePorts.ts` then *imports* those keys and satisfies the interfaces —
which also makes the port contract checkable rather than inferred. The five shell files import
`palettes/keys`, a leaf. The `ViewId` edge inverts: `PalettePortsDeps` takes an opaque
`currentView: Ref<string>` supplied by the composition root (`usePaletteWiring.ts:60` already is
that root), so palettes stops naming the shell at all. Cycle gone, closure for `PalettesPane`
drops to roughly the palettes-card + color-session set, and the dock's Symbol import costs one file.

---

## L-4 — MAJOR — three homes for "name → identifier", with measured divergence

| # | Home | Algorithm |
|---|---|---|
| 1 | `demo/palettes/utils.ts:3-13` `slugify` | NFKD normalize, strip combining marks, `[^a-z0-9 -]` drop |
| 2 | `demo/palettes/export.ts:9-11` `slugify` | naive `[^a-z0-9]+` → `-` |
| 3 | `demo/palettes/export/canonical.ts:50-59` `identifierPrefix` | none — *"no slugifier exists"*; uses the stored slug |

Measured (`node -e` over the two live regex chains):

```
"Café Noir"      export.ts=> "caf-noir"      utils.ts=> "cafe-noir"
"Grüne Töne"     export.ts=> "gr-ne-t-ne"    utils.ts=> "grune-tone"
"Mötley 2.0"     export.ts=> "m-tley-2-0"    utils.ts=> "motley-20"
```

The store mints `palette.slug` with #1 (`usePaletteStore.ts:87` → `createSlug`). The download path
uses #2. So `exportAsJSON` writes `slug: palette.slug` into the payload (`export.ts:17`) while
naming the file with a *different* slugification of `palette.name` (`export.ts:21`): a palette
"Café Noir" downloads as `caf-noir.json` containing `"slug": "cafe-noir-<uuid8>"`.

**Proposed cure:** #3 is right — identifiers are *minted once at creation and stored*. Deleting
`export.ts` (L-2) deletes #2 and leaves exactly one slugifier, in `utils.ts`, invoked only by
`createPalette`.

---

## L-5 — MAJOR — the imperative card-feedback registry is duplicated with two different key schemes

**Where:**

```
PalettesPane.vue:177   const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
PalettesPane.vue:84    :ref="(el: any) => el && (cardRefs[palette.id] = el)"        ← keyed by id
PalettesPane.vue:205   const card = cardRefs[id]; card.showFeedback(…)

BrowsePane.vue:209     const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
BrowsePane.vue:94      :ref="(el: any) => el && (cardRefs[palette.slug] = el)"      ← keyed by slug
BrowsePane.vue:228/237/249/264   cardRefs[palette.slug]?.showFeedback(…)
```

A third site is documented at `demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:41`
(*"the palette card's `showFeedback` (the same surface `onSave`/`onDeleteOwned`…"*).

One concept — "tell the card that owns this palette that its operation succeeded or failed" — with
two literal copies, two identity schemes (`id` vs `slug`), an `any`-cast ref callback in each, and a
`defineExpose({ showFeedback })` escape hatch at `PaletteCard.vue:244`. Both copies also leak: the
`ref` callback writes on mount but nothing deletes on unmount, so `cardRefs` accumulates dead
instances for the session.

**Proposed cure:** the feedback is a *property of the palette*, not of the component instance.
`PaletteCard` takes `:feedback="feedbackFor(palette)"` and renders `ActionFeedback` declaratively
(that component already exists at `browser/card/PaletteCard/ActionFeedback.vue`). A single
`usePaletteFeedback()` composable holds `Map<paletteKey, {message, variant, at}>`, keyed by the one
identity the domain already has. `defineExpose`, both `cardRefs` registries, both `any` casts, and
the leak all disappear.

---

## L-6 — MAJOR — `demo/ui/` is 19 pure re-export shims; this file disproves them in its own import block

Every one of the 19 barrels under `demo/ui/` is a one-line re-export of glass-ui. Verbatim:

```
badge     export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
button    export { Button } from "@mkbabb/glass-ui";
card      export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
dialog    export { Dialog, DialogClose, DialogTrigger, DialogHeader, … } from "@mkbabb/glass-ui";
…  (avatar, checkbox, collapsible, dropdown-menu, input, label, popover, radio-group,
    select, separator, skeleton, slider, switch, tooltip, alert)
```

31 demo files import through them. They are aliases with no added surface — a **standing-edict-2
violation** (no aliases / migration shims / dual paths) and **edict-3** (no wrapper components that
add nothing).

**PalettesPane refutes them in a single import block.** `:129-131` take `Card`/`Button`/`Badge`
through the shim; `:148-149` take `Dialog*` and `SearchBar` straight from
`@mkbabb/glass-ui/dialog` and `@mkbabb/glass-ui/search` — **even though `demo/ui/dialog` exists**.
Two module paths to the same design system inside one 24-line block.

Not merely cosmetic: glass-ui 7.0.0 publishes 60+ granular subpaths
(`node_modules/@mkbabb/glass-ui/package.json#exports`), and the shims all route through the root
barrel, whose `dist/glass-ui.js` opens with **46 static chunk imports** over a 5.2 MB dist. The
subpath form (`dialog.js` = 265 bytes, re-exporting `./dialog-TNRDkcE4.js`) addresses one chunk.
`sideEffects: ["*.css"]` means the barrel is shakeable in a production Rollup build, so this is a
dev-graph and correctness-of-intent cost rather than a shipped-bytes one — but the intent is wrong
either way.

**Proposed cure:** delete `demo/ui/` wholesale; rewrite the 31 importers to the granular glass-ui
subpath. A one-shot codemod, no behaviour change, 19 files and one directory removed.

---

## L-7 — MINOR — per-instance style override of a root-level recipe (edict 5), duplicating the token triple

**Where:** `PalettesPane.vue:15` binds `:style="rampTitleVars"`, defined at `:171-175`:

```ts
const rampTitleVars = {
    "--palettes-ramp-0": "var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5))",
    "--palettes-ramp-1": "var(--palettes-ramp-title-1, oklch(0.632 0.214 13.5))",
    "--palettes-ramp-2": "var(--palettes-ramp-title-2, oklch(0.632 0.214 53.5))",
} as const;
```

The identical three `oklch` fallbacks are already the recipe's own fallbacks at
`demo/styles/utils.css:195-197`. Two homes for one constant triple, and an inline-style override of
a class recipe — which edict 5 forbids by name.

**Proposed cure:** a `.palettes-ramp-text--title` modifier in `utils.css` that sets the three slots
from `--palettes-ramp-title-*`. The pane's template becomes
`class="palettes-ramp-text palettes-ramp-text--title"`, the `:style` bind and the whole
`rampTitleVars` object vanish, and the constant lives once. Note `useViewAccents.ts:153/163` already
writes both token families on `:root` at boot, so the fallbacks are a first-paint concern only —
exactly what a CSS `var()` fallback in the recipe is for.

---

## L-8 — MINOR — three unused imports (`verbatimModuleSyntax` hygiene)

`PalettesPane.vue:128`: `import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";`

Measured non-import occurrences in the file: `watch` **0**, `onMounted` **0**, `nextTick` **0**.
(`reactive` 1, `ref` 3, `computed` 1, `inject` 3 — those are live.) Type-only discipline is
otherwise correct: `import type { Palette }` at `:151` is properly `import type`.

---

## L-9 — MINOR — a dead path alias is cited as if live, in this file and five others

`PalettesPane.vue:6` cites the ramp resolver as `` `@composables/color/palettes-ramp` ``. The
`@composables` alias was killed by W43/RF-15 — it is defined in **no** config
(`grep -rn "@composables" vite.config.ts tsconfig*.json vitest.config.ts` returns only two comments
recording its death), and no such file exists. The real home is
**`demo/color-session/palettes-ramp.ts`**.

Five more files carry the same dead cite: `demo/styles/utils.css:187`,
`demo/color-picker/composables/boot/useViewAccents.ts:14`,
`demo/color-picker/composables/boot/view-accents.ts:9`,
`demo/workbenches/generate/composables/useColorGeneration.ts:7`,
`demo/shell/useViewManager.ts:15`.

These are navigational comments that misdescribe the module lattice — a reader who follows one finds
nothing. Cure: rewrite the six cites to the real relative path.

---

## L-10 — INFO — 2 of 7 published subpaths have zero demo dogfood

Import-site census of `package.json#exports` against `demo/`:

```
./color      25      ./css       10      ./math       6
./easing      5      ./quantize   4
./value       0   ← never imported by the demo
./transform   0   ← never imported by the demo
```

The demo is this library's dogfood proof (`vite.config.ts:63-66`: *"the demo consumes value.js ONLY
through the published subpaths"*). Two published subpaths therefore ship with no consumer-shaped
exercise at all. Not a defect *of this component* — recorded because the export surface is in this
seat's charter.

---

# Negative proof — what is genuinely SOUND here

The challenge's headline hypothesis is that the demo imports the library through paths a real
consumer could not write. **It does not.** Positive evidence:

1. **Every value.js import in `demo/` is a bare published subpath specifier.** Exhaustive census —
   all 49 sites, no exceptions:
   ```
   $ grep -rhn 'from ".*value\.js.*"|from "\.\./\.\./src|from "@/src|from "~/src' --include=*.vue --include=*.ts demo/ | sed 's/.*from //' | sort | uniq -c
     24 "@mkbabb/value.js/color";
     10 "@mkbabb/value.js/css";
      6 "@mkbabb/value.js/math";
      5 "@mkbabb/value.js/easing";
      4 "@mkbabb/value.js/quantize";
   ```
   Zero `../../src/…`, zero `@src/…`, zero `dist/…`, zero root-barrel `@mkbabb/value.js` imports.
2. **The alias set cannot drift from the export map**, because it is *generated from it*.
   `vite.config.ts:37-50` reads this repo's own `package.json#exports` at config time and derives
   one anchored-regex alias per subpath. Adding or renaming a subpath moves the alias automatically.
   The anchoring is deliberate and load-bearing — the comment at `:30-36` records the R-era demo boot
   break caused by the prefix-matching string form.
3. **`tsconfig.demo.json` has no `@src/*` path**, so a deep import would not even typecheck from the
   demo tree; `@src` survives only for the exempt `assets/docs/*.md` source-embedding plugin.
4. **`demo/palettes/PalettesPane.vue`'s own closure** reaches value.js only through
   `@mkbabb/value.js/color` and `/css` (`demo/palettes/mix.ts:14`,
   `demo/color-session/{picker-color,view-accent,ink,color-utils,generate-color}.ts`) — all bare
   subpaths.

A real consumer could write every value.js import this component's subtree writes. That edge is
correct, and it is correct *by construction* rather than by discipline, which is the stronger
property.

Two further soundnesses worth recording so a later seat does not re-litigate them:

- **`demo/shared/ui/PaneHeader.vue` is not an edict-3 contrivance.** `demo/shared/` predates this
  work (3 files total), and PaneHeader has 9 real consumers with genuine encapsulation (it owns
  `--pane-scroll`, the named scroll-timeline, and its only consumers). It *would* be a glass-ui
  primitive under edict 4 — the file repeatedly books `ScrollCardHeader` as pending — but I checked
  `node_modules/@mkbabb/glass-ui/dist/components/` and **no `ScrollCardHeader` exists in glass-ui
  7.0.0** (`grep -rl "ScrollCard" dist/` → empty). So this is a *proposal to glass-ui*, not a
  violation. Recorded as such, not as a finding.
- **`../color-session/keys` (`PalettesPane.vue:135`) is a correct cross-area edge.** Colour state is
  genuinely owned by `color-session`; the key module is a leaf; 26 consumers; no cycle. This is the
  pattern L-3 asks `palettes` to adopt.

---

# The greenfield lattice

Structured today with no legacy, `palettes` is four strata with a strict downward dependency
direction and no cycles:

```
  ┌─ demo/palettes/keys.ts                    LEAF. InjectionKeys + hand-written port
  │                                           interfaces. Type-only imports. The ONLY
  │                                           module the shell may import.
  │
  ├─ domain/  (pure, no Vue)
  │    types.ts        the Palette algebra
  │    identity.ts     ONE slugifier; slugs minted at creation, never re-derived
  │    export/         the W51 byte contract, index.ts as its barrel — the only
  │                    serializer set; download.ts is a function, not a composable
  │
  ├─ state/  (Vue reactivity, no DOM, no components)
  │    store.ts        the localStorage binding; SOLE owner of palette order.
  │                    Exposes movePalette(fromId, toId) — no caller computes a permutation.
  │    library.ts      saved-list projection + filter
  │    browse.ts       remote projection
  │    feedback.ts     Map<paletteKey, Feedback> — the one home for card feedback
  │    admin/          the admin console's own composables, imported by NOTHING outside admin/
  │
  └─ view/
       PalettesPane.vue      injects LibraryPort + ColorTargetPort from keys.ts. Template
                             + three event forwards. No refs registry, no sortable wiring,
                             no export switch, no inline style object.
       browser/card/         PaletteCardGrid owns its own sortable and emits @reorder(from,to)
       admin/                mounted async; never in another pane's closure
```

Four properties this buys, each of which kills a finding above by construction:

1. **`keys.ts` is a leaf** → the shell↔palettes cycle (L-3) cannot form, and `PalettesPane`'s
   closure drops from 97 modules to roughly its own card subtree plus `color-session`.
2. **The store is the sole owner of order** → L-1 cannot recur, because no view holds a list to
   splice and the vueuse ref/non-ref branch is never reachable from a component.
3. **`export/index.ts` is the barrel** → `./export` resolves to the contract set, `export.ts` has no
   name to occupy, and L-2 and L-4 both close by deletion rather than by migration.
4. **Ports declared as interfaces, not `ReturnType<typeof …>`** → the port contract becomes checked
   rather than inferred, and typechecking a pane stops requiring inference over the admin console.

Ordering note for whoever executes: **L-3 first**. Extracting `keys.ts` is mechanical, unblocks the
closure reduction that makes the rest cheap to verify, and does not touch behaviour. L-1 and L-2 are
independent of it and of each other.

---

# Summary table

| ID | Severity | Defect | Anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | Drag-to-reorder persists a corrupted order (fwd) / silently drops it (back) — dereferenced computed passed to `useSortable`, `onEnd` not overriding `onUpdate`, computed cache mutated in place | `PalettesPane.vue:180-197` |
| L-2 | **BLOCKER** | Dual export impls; app ships `export.ts`, 78 assertions test `export/` — they disagree in prefix, index base, and colour spelling | `export.ts` ∥ `export/`; `usePaletteExport.ts:9` |
| L-3 | MAJOR | palettes ⇄ shell cycle from co-locating InjectionKeys with the provider; 97-module closure, 18 admin, on the eager boot path | `usePalettePorts.ts:19,271-275`; `Dock.vue:18` |
| L-4 | MAJOR | Three slugifiers; filename disagrees with the slug inside the file it names | `utils.ts:3`, `export.ts:9`, `canonical.ts:50` |
| L-5 | MAJOR | `cardRefs` imperative feedback registry duplicated, keyed by `id` here and `slug` in BrowsePane; both leak | `PalettesPane.vue:177,84,205` |
| L-6 | MAJOR | 19 pure re-export shims in `demo/ui/`; this file uses both the shim and the direct subpath in one block | `demo/ui/*/index.ts`; `PalettesPane.vue:129-131` vs `:148-149` |
| L-7 | MINOR | Per-instance `:style` override of a root recipe, duplicating the oklch triple | `PalettesPane.vue:15,171-175` vs `utils.css:195-197` |
| L-8 | MINOR | `watch` / `onMounted` / `nextTick` imported, 0 uses | `PalettesPane.vue:128` |
| L-9 | MINOR | Dead `@composables/…` alias cited as live in 6 files | `PalettesPane.vue:6` + 5 |
| L-10 | INFO | `./value` and `./transform` published with 0 demo dogfood sites | `package.json#exports` |

**Reproduction artefacts:** `scratchpad/reorder-probe.mjs`, `scratchpad/reorder-probe2.mjs`
(L-1, headless Chromium vs `localhost:9000`); `scratchpad/closure.mjs` (L-3, module-graph walker).
No source file was modified by this seat.
