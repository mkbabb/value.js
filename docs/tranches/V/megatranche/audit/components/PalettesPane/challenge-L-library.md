# CHALLENGE-L — PalettesPane: library structure

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
variant. This matches the explicit declaration under which this seat was spawned. The seat is
declared, not inherited.

## Amendment notice — pass 2

This file was first written by an earlier Opus-5 seat at HEAD `32b4040e`. **This is a second
Opus-5 pass.** I re-verified the prior pass's findings and carried every one forward — its
browser-measured reorder reproduction (L-1) and module-closure walk (L-3) are evidence I
could not cheaply re-derive (the shared Playwright browser was held by another seat this
run) and are preserved verbatim in substance.

Pass 2 adds **six findings pass 1 missed** (L-11 … L-16) and issues **one correction to
pass 1's negative proof**: pass 1 certified the demo → `@mkbabb/value.js` edge as clean *by
construction*. The runtime half of that claim holds. The **type** half does not —
`tsconfig.demo.json` is hand-written, has drifted from the export map, and declares three
specifiers that exist neither in `package.json#exports` nor on disk (L-11). Pass 2 also
finds that the cure pass 1 proposed for its own BLOCKER L-1 is an edict-4 violation, because
the design system already ships the primitive (L-13).

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD at pass 2 is `e79fcd43`** (`docs(V·mega): core band COMPLETE 21/21 validated …`).
  The work order states `c654824e`; pass 1 recorded `32b4040e`. The tree has now moved twice
  under this workflow. Pass-1 citations were against `32b4040e`; pass-2 citations are against
  `e79fcd43`. I re-checked every pass-1 line citation I carry forward and all still resolve.
- Subject: `demo/palettes/PalettesPane.vue`, 212 lines, area `palettes`.

## Verdict

**DEFECTIVE.** Two BLOCKERs, nine MAJORs, four MINORs, one INFO.

The strongest finding is unchanged from pass 1: **the one piece of behaviour this component
owns outright (drag-to-reorder) is structurally miswired and deterministically persists a
corrupted order**, reproduced 3/3. Pass 2 sharpens its cure — the fix is not to move the
hand-rolled `useSortable` wiring down into the grid, it is to delete it for
`@mkbabb/glass-ui/sortable-list`, which glass-ui 7.0.0 already publishes (L-13).

The second is that **the palette export the app ships and the palette export the test suite
proves are different implementations that disagree by construction** (L-2).

Pass 2's headline addition: **the library's public surface is smaller than the repo believes
it is.** `package.json#exports` has no `"."` key at all — the library cannot be imported by
its own bare name — while `tsconfig.demo.json` declares that name plus two more phantom
subpaths, and `demo/shared/utils.ts` asserts in prose that a root barrel exists "for external
consumers." It does not (L-11).

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
| 6 | `@vueuse/integrations/useSortable` | vueuse + `sortablejs@1.15.7` | **misused (L-1); superseded by glass-ui (L-13)** |
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

# Findings — pass 1 (carried forward, re-verified)

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

### Reproduction (measured, deterministic — pass 1)

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

### Cure — **amended by pass 2, see L-13**

Pass 1 proposed moving the sortable binding down into `PaletteCardGrid` and adding a
`movePalette(fromId, toId)` port member. The ownership half of that is right and stands. The
mechanism half is wrong: **glass-ui 7.0.0 already ships the primitive**, so the correct cure
deletes `@vueuse/integrations/useSortable` and `sortablejs` from the tree entirely rather
than relocating them. See L-13.

---

## L-2 — BLOCKER — two live export implementations; the shipped one and the tested one disagree

**Where:** `demo/palettes/export.ts` (132 L, flat file) **and** `demo/palettes/export/` (12 files,
914 L) both exist as siblings. `demo/palettes/usePaletteExport.ts:9` imports `"./export"`.
`export/` has **no `index.ts`**, so `./export` resolves to the flat file. Consumed at
`PalettesPane.vue:96` (`@export="(p, fmt) => onExport(p, fmt)"`) and `:211`.

**Consumer census — exactly one each, and they do not overlap:**

```
$ grep -rn "export/serializers" --include=*.ts --include=*.vue demo/ src/ test/ e2e/
  demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";

$ grep -rn 'from "\./export"' --include=*.ts --include=*.vue demo/ test/ e2e/
  demo/palettes/usePaletteExport.ts:9:} from "./export";
```

Re-verified at pass 2 by the complementary probe — no application module anywhere produces the
tested module's input type:

```
$ grep -rn "ExportSnapshot" demo/ --include='*.ts' --include='*.vue' | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:21,43,81,82,83,443     ← and nothing else
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

**Pass 2 addition — the two are not even the same domain.** `export/types.ts:30-50` declares
`SnapshotSource = device-draft | workspace | release` with `workspaceRevision`, `releaseNo`,
`basedOnReleaseId`, `deviceDraftRevision`, `contentDigest`. The live `Palette`
(`demo/palettes/types.ts:14-64`) has **none** of those concepts — no workspace, no release, no
revision, no draft. So `export/` is not a stricter version of `export.ts`; it is a specification
for a product the app is not. No `Palette → ExportSnapshot` adapter exists, and none can be
written without inventing the missing model. This raises the cost of "migrate to it" and lowers
the cost of "delete one of them" — the choice must be made deliberately, not deferred again.

**Secondary consequence:** the shipped `exportAsPNG` (`export.ts:85-119`) hand-rolls an
`<img>` + Canvas-2D SVG rasterizer and touches **no** value.js. The unshipped `export/png.ts:11`
correctly does `import { oklch, toRgba8 } from "@mkbabb/value.js/color"`. The one export path that
dogfoods the library is the one that is dead.

**Proposed cure:** execute D57 as a *decision*, not a deferral. Either (a) delete
`demo/palettes/export/` and its 453-line test if the workspace/release domain is not being
built, or (b) delete `export.ts` + `usePaletteExport.ts`, rename `export/serializers.ts` →
`export/index.ts` so `./export` resolves to the contract set, and land the `Palette →
ExportSnapshot` projection. Do not ship both. `usePaletteExport` is a 27-line `switch` wrapper
with no state — it is not a composable, it is a function, and it belongs as `export/download.ts`.

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

**Pass 2 addition — the shell is reaching through `palettes/` for something `palettes/` does
not own.** `usePalettePorts.ts:5-7` imports `useAdminAuth`, `useUserAuth` and `useSession` from
`../platform/auth/`, and `SESSION_PORT` (lines 127-135) is a **pure pass-through
re-publication** of them — seven members, every one forwarded unchanged. Identity lives in
`demo/platform/auth/`, which is exactly where the shell should read it. The feature module is a
tollbooth on a road between two other places.

**Pass 2 addition — `demo/palettes/` is the demo's god directory.** The directory named for one
feature holds five unrelated domains:

```
demo/palettes/
  api/            admin-audit.ts admin-colors.ts admin-palettes.ts admin-users.ts
                  colors.ts index.ts palettes.ts versions.ts     ← the app's WHOLE HTTP client
  useAdminAudit.ts useAdminFlagged.ts useAdminTags.ts useAdminUsers.ts
  useColorNameQueue.ts                                            ← the admin console
  useBrowsePalettes.ts useSlugMigration.ts                        ← remote browse + identity
  mix.ts                                                          ← colour-mixing math
  export.ts export/                                               ← serialization (L-2)
  usePalettePorts.ts                                              ← the app composition root
```

Inbound fan-in from areas that are not palettes — 23 edges from 7 areas:

```
demo/shell/dock/*                   ×5   SESSION_PORT_KEY
demo/shell/usePaneRouter.ts         ×3   PalettesPane / BrowsePane / AdminPane
demo/picker/ColorPicker.vue         ×1   COLOR_TARGET_PORT_KEY
demo/workbenches/mix/*              ×5   LIBRARY_PORT_KEY, mix.ts, types, browser/card
demo/workbenches/generate/*         ×3   LIBRARY_PORT_KEY, types, browser/card
demo/workbenches/extract/*          ×3   COLOR_TARGET_PORT_KEY, usePaletteStore, types
demo/workbenches/gradient/*         ×1   LIBRARY_PORT_KEY
demo/color-picker/*                 ×2   providePalettePorts, MigratePalettesDialog
```

`usePalettePorts.ts:22-31` claims to have dissolved a god facade into "FIVE narrow, feature-owned
ports". It did not dissolve it; it renamed it. `browsePort` (156-192) carries 27 members,
`adminPort` (194-231) carries 32, and both re-export slices from `actions`, `admin`, `browse`,
`versions`, `tagEdit`, `flagged`. One module still knows every domain in the app.

**Measured cost (pass 1).** Transitive relative-import closure (`scratchpad/closure.mjs`):

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
which also makes the port contract checkable rather than inferred. The five shell files stop
importing from `palettes` altogether and read `platform/auth` directly, which is where identity
lives. The `ViewId` edge inverts: `PalettePortsDeps` takes an opaque `currentView: Ref<string>`
supplied by the composition root (`usePaletteWiring.ts:60` already is that root), so palettes
stops naming the shell at all.

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

`demo/ui/alert/index.ts:1-9` states outright that its local implementation was converted to a
re-export at B.W2 — the shim is a migration artefact that outlived its migration. 31 demo files
import through them. They are aliases with no added surface — a **standing-edict-2 violation**
(no aliases / migration shims / dual paths) and **edict-3** (no wrapper components that add
nothing).

**PalettesPane refutes them in a single import block.** `:129-131` take `Card`/`Button`/`Badge`
through the shim; `:148-149` take `Dialog*` and `SearchBar` straight from
`@mkbabb/glass-ui/dialog` and `@mkbabb/glass-ui/search` — **even though `demo/ui/dialog` exists**.
Two module paths to the same design system inside one 24-line block. `demo/ui/input/index.ts`
already breaks ranks a third way: it alone uses a subpath (`@mkbabb/glass-ui/forms`).

Not merely cosmetic. Measured at pass 2:

```
$ node -e "p=require('@mkbabb/glass-ui/package.json'); console.log(p.exports['.'])"
{ types: './dist/index.d.ts', import: './dist/glass-ui.js', default: './dist/glass-ui.js' }

$ grep -oE 'from *"[^"]+"' node_modules/@mkbabb/glass-ui/dist/glass-ui.js | sort -u | wc -l
46                              # 43 internal chunks + vue + reka-ui + @lucide/vue

$ cat node_modules/@mkbabb/glass-ui/dist/card.js
import { a as e, ... } from "./card-Bk96VI2R.js";       # one 5299-byte chunk
```

glass-ui 7.0.0 publishes 70 export keys. The shims route every one of them through the 43-chunk
root barrel. `sideEffects: ["*.css"]` means the barrel is shakeable in a production Rolldown
build, so this is a dev-graph and correctness-of-intent cost rather than a shipped-bytes one —
but the intent is wrong either way.

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

Re-measured at pass 2 — total occurrences of each identifier in the whole file, import line included:

```
watch: 1   onMounted: 1   nextTick: 1      ← 1 = the import statement only, 0 uses
reactive: 2   computed: 2                  ← live
```

Type-only discipline is otherwise correct: `import type { Palette }` at `:151` is properly
`import type`, and it is the file's only type-only import.

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

Import-site census of `package.json#exports` against `demo/` (re-verified at pass 2:
`grep -rc "value.js/value\|value.js/transform" demo/` → zero sites):

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

# Findings — pass 2 (new)

## L-11 — MAJOR — the export map has no root key, and `tsconfig.demo.json` declares three specifiers that do not exist

**This corrects pass 1's negative proof §2.** Pass 1 certified that the alias set "cannot drift
from the export map, because it is generated from it." That is true of `vite.config.ts` and only
of `vite.config.ts`. The **TypeScript** half of the same contract is hand-written, and it has
drifted.

`tsconfig.demo.json` declares eight value.js path keys, and its own header prose claims "the demo
speaks only the 8 public keys." Three of the eight exist nowhere:

```
$ node -e "p=require('./package.json'); for (const k of ['.','./parsing','./units'])
           console.log(k, p.exports[k]===undefined?'ABSENT':'present')"
.          ABSENT
./parsing  ABSENT
./units    ABSENT

$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

`package.json#exports` has exactly **seven** keys — `./color ./value ./css ./easing ./math
./transform ./quantize` — and **no `"."`**.

Three consequences:

1. **`@mkbabb/value.js` cannot be imported by anyone**, in the demo or externally. There is no
   root entry to import. `vite.config.ts:38-48` generates its alias array from the exports map,
   so it contains no bare entry either; the `paths` entry pointing at a nonexistent
   `dist/index.d.ts` is dead config.
2. **`@mkbabb/value.js/parsing` and `/units` are declared to TypeScript and ship nowhere.** A
   demo author who writes either is working against a config that *claims* a public API the
   package does not have — precisely the false-proof failure mode this challenge names. Pass 1
   proved no such import exists *today*; it did not check whether the config would permit one.
   The config invites it.
3. **The repo asserts the opposite in prose.** `demo/shared/utils.ts:12-19`:

   > "`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js`
   > specifier — the full-barrel import … The utility tail has no rightful subpath home … so the
   > demo owns its copy; **the library's root-barrel export stands for external consumers.**"

   There is no root-barrel export. That sentence is false at HEAD `e79fcd43`. And the file it
   appears in is the symptom: because the export map is domain-incomplete, the demo forked a
   40-line utility rather than reach a surface that does not exist.

- **Reproduction:** the two commands above, at HEAD `e79fcd43`.
- **Proposed cure:** the same construction that already protects the Vite half. Generate
  `tsconfig.demo.json`'s `paths` block from `package.json#exports` (a `tsconfig.demo.json` emitted
  by a tiny script, or a `paths`-less config relying on real node resolution against the
  `dist/` symlink). Then decide the root: either add `"."` to `exports` with a real
  `dist/index.{js,d.ts}` — which also gives `debounce` a home and lets `demo/shared/utils.ts`
  delete its fork — or remove the three phantom keys and the false prose. One source, zero drift,
  by construction rather than by discipline.

---

## L-12 — MAJOR — the published package forces glass-ui and keyframes.js on every consumer, and imports neither

```
$ node -e "console.log(require('./package.json').dependencies)"
{ '@mkbabb/glass-ui': '^7.0.0', '@mkbabb/keyframes.js': '^6.0.0' }

$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/
NONE in src/

$ grep -ohE 'from *"[^"]+"' dist/subpaths/*.js dist/*.js | sort -u
from "../anchors-C_wdoOYd.js"
from "../operations-CB_1wGy4.js"
from "../result-CZJK1CwL.js"
```

`src/` imports neither package. The built `dist/` has **zero external imports**. Yet both are
runtime `dependencies`, so `npm i @mkbabb/value.js` — a package that sells itself as "Immutable,
failure-explicit CSS color, value, easing, transform, math, and quantization capabilities" —
installs an entire Vue design system and an animation library.

`tsconfig.demo.json`'s own header states the invariant being broken: *"the library program
(tsconfig.lib.json) never [sees glass-ui] (inv-K-1 — structurally glass-ui-free)."* Structurally
free in the source graph; declared as a hard runtime dependency in the manifest. The invariant is
enforced everywhere except the one file consumers actually read.

This is directly this component's business: `PalettesPane` is the reason glass-ui is in the tree
at all, and it is a **demo** consumer.

- **Reproduction:** the three commands above.
- **Proposed cure:** move both to `devDependencies` beside the other ~30 demo-only packages
  (`@vueuse/*`, `clsx`, `tailwind-merge`, `sortablejs`, `reka-ui`, …). Published `dependencies`
  becomes `{}`, which is the truth. `files: ["dist", "!dist/gh-pages"]` already excludes the demo
  build, so nothing published needs them.

---

## L-13 — MAJOR — glass-ui already ships the sortable primitive; L-1's hand-roll is an edict-4 violation, and so was pass 1's proposed cure

glass-ui 7.0.0 publishes `./sortable-list` as a first-class component family:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/sortable-list/index.d.ts
export { default as SortableList }   from "./SortableList.vue";
export { default as SortableItem }   from "./SortableItem.vue";
export { default as SortableHandle } from "./SortableHandle.vue";
export type { SortableId } from "./composables/types";

$ head -20 node_modules/@mkbabb/glass-ui/dist/sortable-list.js
… //#region src/components/sortable-list/composables/dropResolver.ts   ← its own drop resolver,
                                                                          with cross-group support
```

Against that, the demo carries a whole third-party drag library for **one** call site:

```
$ grep -rn "useSortable" demo/ --include='*.ts' --include='*.vue'
demo/palettes/PalettesPane.vue:133      import { useSortable } from "@vueuse/integrations/useSortable";
demo/palettes/PalettesPane.vue:183      useSortable(sortableEl, pm.filteredSaved.value, {…});
demo/palettes/browser/card/PaletteCardGrid.vue:10   (a comment about the above)
```

`sortablejs@^1.15.7` and `@types/sortablejs@^1.15.9` are in the tree for those two lines. Edict 4
is explicit: variants and primitives belong in glass-ui, and the demo reuses existing
component-type names. `SortableList` is the existing name.

**The encapsulation damage is documented inside the victim.** `PaletteCardGrid.vue:8-12`, in its
own template:

> "This comment is the div's first CHILD, not a sibling: a leading comment node would make this a
> multi-root component, and **PalettesPane reads `$el` for useSortable** — a fragment root resolves
> $el to the comment node, not the `<div>`."

A child whose comment-node *placement* is load-bearing for a parent's private DOM reach has no
encapsulation left. The `as any` at `PalettesPane.vue:181` is the type system being told to stand
down at exactly the point the boundary is crossed.

**Amendment to L-1's cure.** Pass 1 proposed relocating the `useSortable` binding into
`PaletteCardGrid`. That fixes ownership and would fix the data corruption — but it keeps a
hand-rolled drag implementation and two third-party packages that the design system supersedes,
which trades a correctness defect for an edict-4 defect. The correct cure:

- `PaletteCardGrid` renders `<SortableList>` with `<SortableItem>` per card and `<SortableHandle>`
  in place of the `.drag-handle` class contract, emitting `@reorder="(ids: SortableId[]) => …"`.
- The library port exposes `movePalette(fromId, toId)`; `usePaletteStore` performs the splice on
  the store array, the only mutable owner of order.
- Deleted: `useSortable` import, `sortableGridRef`, `sortableEl`, the `as any`, the `$el` read,
  the `onEnd` index arithmetic, the `PaletteCardGrid` comment-node constraint, `sortablejs`,
  `@types/sortablejs`, and — because no view ever holds the list — the entire vueuse ref/non-ref
  branch that L-1's corruption came from.

---

## L-14 — MAJOR — `savedColorStrings` reaches this subtree by two transports at once

One reactive datum, two independent wires into the same component tree, from one origin:

**Route A — prop, de-reffed, through the pane router:**
```
demo/color-session/useColorPipeline.ts:166               computed savedColorStrings
demo/color-picker/App.vue:341                            savedColorStrings: () => savedColorStrings.value
demo/shell/usePaneRouter.ts:155                          savedColorStrings: deps.savedColorStrings()
demo/palettes/PalettesPane.vue:154                       defineProps<{ savedColorStrings: string[] }>
demo/palettes/browser/card/CurrentPaletteEditor.vue:~26  the same prop again
```

**Route B — `Ref`, through the ports deps:**
```
demo/color-picker/App.vue:356                            savedColorStrings
demo/color-picker/composables/usePaletteWiring.ts:31,63  savedColorStrings: Ref<string[]>
demo/palettes/usePalettePorts.ts:36,47,94                savedColorStrings: Ref<string[]>
demo/palettes/usePaletteActions.ts:13,101,103            deps.savedColorStrings.value
```

`PalettesPane` already injects `LIBRARY_PORT_KEY` and `COLOR_TARGET_PORT_KEY` at lines 164-165. It
could read this list from a port. Instead it takes it as a prop, and the port graph *also* takes
it, from the same origin, by a second path, in a second type spelling (`string[]` vs
`Ref<string[]>`). Unique semantic ownership is the invariant; one concept has two transports.

The prop is also the sole reason `usePaneRouter.rightProps` special-cases `"palettes"`
(`usePaneRouter.ts:150-158`) — a router that knows one pane's prop names.

- **Reproduction:** `grep -rn "savedColorStrings" demo/ --include='*.ts' --include='*.vue'` → 22
  hits across the two chains above.
- **Proposed cure:** delete the prop. The true owner is `useColorPipeline`; expose
  `currentColors` on the colour-session port and let `PalettesPane` and `CurrentPaletteEditor`
  read it there. `rightProps("palettes")` collapses to `{}`.

---

## L-15 — MAJOR — commit/cancel-edit has two mechanisms, and the second needs a 2-second mount poll to work

`PalettesPane.vue:51-52` emits `commitEdit` / `cancelEdit` up to the router, which calls into a
**component instance**:

```
demo/shell/usePaneRouter.ts:156-157
  "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),
  "onCancel-edit": () => deps.colorPickerRef()?.cancelEdit(),
```

Meanwhile `COLOR_TARGET_PORT` — which this same component injects at line 165 — already exposes
the operation:

```
demo/palettes/usePalettePorts.ts:239    commitColorEdit: actions.commitColorEdit,
```

Two mechanisms, one gesture. And `PalettesPane` is not the only emitter: `demo/shell/dock/Dock.vue:143-144`
emits the same pair, handled at `demo/color-picker/App.vue:41-42` by calling
`colorPickerRef?.commitEdit()`. Three call sites, one concept, routed through a component handle.

**The cost of that instance coupling is written down.**
`demo/color-picker/composables/usePaletteWiring.ts:31-58`: the ports cannot be constructed until
`colorPickerRef` mounts, so the wiring polls for it every 50 ms, 40 times (~2 s), then
`console.warn`s and gives up:

```ts
const PICKER_WAIT_ATTEMPTS = 40; // 40 × 50ms ≈ 2s
…
if (attempts++ >= PICKER_WAIT_ATTEMPTS) {
    console.warn(`[usePaletteWiring] gave up waiting for the color picker to mount (${label}).`);
    return;
}
setTimeout(poll, 50);
```

That poll exists only because state is being reached through a component instance instead of
through the store that owns it. It is the same species as L-5's `cardRefs` — pass 1 caught the
card half; this is the picker half, and it sits on the boot path.

- **Reproduction:** `grep -rn "commitEdit\|cancelEdit\|commitColorEdit" demo/` → three emitters,
  one unused port member, one ref-call at `usePaneRouter.ts:156`, one bounded poll.
- **Proposed cure:** edit state is session state. Put `editTarget` + `commit()` + `cancel()` on
  the colour-session store; dock, pane and picker all call the store. `colorPickerRef`,
  `PaneRouterDeps.colorPickerRef`, `whenColorPickerReady`, the 2 s poll and its `console.warn` all
  delete — and with them the mount-order race they exist to paper over.

---

## L-16 — MINOR — "Palette" has three homes and none of them is the library, which advertises it as a keyword

- `demo/palettes/types.ts:14-64` — the client model (`id?`, `slug`, `colors`, `visibility`,
  `tier`, `atomSetHash`, `forkOf`, `currentHash`, …).
- `api/src/modules/palette/repository/palette.ts` — the server model.
- `demo/palettes/export/types.ts:52-65` — a third, incompatible model (L-2).

And the library:

```
$ find src -iname "*palette*"
(empty)
$ grep -rln "palette" src/
(empty)
```

`package.json:16` lists `"palette"` among the package keywords. `src/` contains no palette code of
any kind — not a type, not a comment. The demo's central domain object (an ordered, named,
addressable colour set with canonical serialization) is exactly what a colour library should own,
and it is the one concept this library does not touch.

This is the structural reason `PalettesPane.vue` imports nothing from `@mkbabb/value.js` at all
(see the import table): every colour that flows through it is an opaque `string` —
`cssColorOpaque`, `savedColorStrings: string[]`, `PaletteColor.css: string`. The library is not
in this component's vocabulary.

- **Proposed cure:** either give the library a `./palette` subpath owning the immutable
  `Palette`/`PaletteColor` value types and the canonical serializers — making the demo *and* the
  API consumers of one definition, which is exactly what `export/canonical.ts` was reaching for —
  or drop `"palette"` from the keywords. The present state advertises ownership the code does not
  hold.

---

# Negative proof — what is genuinely SOUND here (amended)

The challenge's headline hypothesis is that the demo imports the library through paths a real
consumer could not write. **At runtime, it does not.** Positive evidence:

1. **Every value.js import in `demo/` is a bare published subpath specifier.** Exhaustive census —
   all 49 sites, no exceptions:
   ```
   $ grep -rhn 'from ".*value\.js.*"' --include=*.vue --include=*.ts demo/ | sed 's/.*from //' | sort | uniq -c
     24 "@mkbabb/value.js/color";
     10 "@mkbabb/value.js/css";
      6 "@mkbabb/value.js/math";
      5 "@mkbabb/value.js/easing";
      4 "@mkbabb/value.js/quantize";
   ```
   Zero `../../src/…`, zero `@src/…`, zero `dist/…`, zero root-barrel imports. Every one of these
   five specifiers **is** in `package.json#exports`. A real consumer could write all 49.
2. **The Vite alias set cannot drift from the export map**, because it is *generated from it*.
   `vite.config.ts:37-50` reads this repo's own `package.json#exports` at config time and derives
   one anchored-regex alias per subpath. The anchoring is deliberate and load-bearing — the
   comment at `:30-36` records the R-era demo boot break caused by the prefix-matching string form.
   **⚠ Amended by L-11: this property belongs to the Vite half only. The TypeScript half
   (`tsconfig.demo.json` `paths`) is hand-written and has drifted by three keys.**
3. **`tsconfig.demo.json` has no `@src/*` path**, so a deep import would not typecheck from the
   demo tree; `@src` survives only for the exempt `assets/docs/*.md` source-embedding plugin.
   This part stands.
4. **`PalettesPane.vue`'s own closure** reaches value.js only through `@mkbabb/value.js/color` and
   `/css` (`demo/palettes/mix.ts:14`,
   `demo/color-session/{picker-color,view-accent,ink,color-utils,generate-color}.ts`) — all bare
   subpaths. This part stands.

So: the demo does not reach into `src/`, and what it *does* import it imports legitimately. The
defect is on the other side of the boundary — the published surface is incomplete (no root, L-11),
over-declared in the demo's type config (three phantom keys, L-11), over-specified in the manifest
(two unused runtime deps, L-12), and missing the one domain this component exists to demonstrate
(L-16).

Two further soundnesses worth recording so a later seat does not re-litigate them:

- **`demo/shared/ui/PaneHeader.vue` is not an edict-3 contrivance.** `demo/shared/` predates this
  work (3 files total), and PaneHeader has 9 real consumers with genuine encapsulation (it owns
  `--pane-scroll`, the named scroll-timeline, and its only consumers). It *would* be a glass-ui
  primitive under edict 4 — the file repeatedly books `ScrollCardHeader` as pending — but
  re-verified at pass 2: `grep -rl "ScrollCard" node_modules/@mkbabb/glass-ui/dist/` → **empty**.
  No `ScrollCardHeader` exists in glass-ui 7.0.0. So this is a *proposal to glass-ui*, not a
  violation. Note the contrast with L-13, where the primitive **does** exist and the demo
  hand-rolled anyway — that is what makes L-13 a finding and this not one.
- **`../color-session/keys` (`PalettesPane.vue:135`) is a correct cross-area edge.** Colour state is
  genuinely owned by `color-session`; the key module is a leaf; 26 consumers; no cycle. This is the
  pattern L-3 asks `palettes` to adopt.

---

# The greenfield lattice

Structured today with no legacy, this is four strata with a strict downward dependency direction
and no cycles. Pass 2 lifts `platform` and `domain` out as explicit floors, because L-3, L-12 and
L-16 are all the same disease: things that should be at the bottom of the stack are living inside
one feature.

```
  ┌─ platform/                          NO imports from anything above
  │    http/          the ONE typed fetch client + error boundary
  │    auth/          useSession · useUserAuth · useAdminAuth        (already here)
  │    storage/       the localStorage binding  (usePaletteStore moves OUT of palettes/)
  │
  ├─ domain/  (pure, no Vue, no DOM)
  │    palette/       the Palette algebra + ONE slugifier; slugs minted at creation,
  │                   never re-derived. Ideally re-exported FROM @mkbabb/value.js/palette (L-16)
  │    export/        the W51 byte contract, index.ts as its barrel — the ONLY serializer
  │                   set; download.ts is a function, not a composable (L-2)
  │    mix/           mix.ts moves here
  │
  ├─ features/  (Vue reactivity; each owns its keys.ts LEAF)
  │    library/       keys.ts (InjectionKeys + hand-written port interfaces, type-only imports —
  │                   the ONLY module another area may import)
  │                   store.ts   sole owner of palette ORDER; movePalette(fromId,toId).
  │                              No caller ever computes a permutation.  (kills L-1 by construction)
  │                   feedback.ts  Map<paletteKey, Feedback> — one home for card feedback (L-5)
  │                   PalettesPane.vue + browser/card/
  │    browse/        remote projection
  │    admin/         its own composables AND its own api/ — imported by NOTHING outside admin/,
  │                   mounted async, never in another pane's closure  (kills 18 of L-3's 97)
  │    session/       colour pipeline, edit target, commit()/cancel()  (kills L-14, L-15)
  │    workbenches/{mix,generate,gradient,extract}
  │
  └─ shell/           dock, router, view manager. Imports feature keys.ts leaves and
                      platform/auth DIRECTLY. Never the reverse.
     app/             App.vue: mounts stores, mounts shell. No component instance refs.
```

Seven properties this buys, each of which kills a finding above **by construction** rather than by
vigilance:

1. **Each feature's `keys.ts` is a leaf** → the shell↔palettes cycle (L-3) cannot form, and
   `PalettesPane`'s closure drops from 97 modules to roughly its own card subtree plus `session`.
2. **The shell reads `platform/auth` directly** → `SESSION_PORT`'s seven-member pass-through
   deletes; identity is read where it lives.
3. **The store is the sole owner of order, and the grid is `<SortableList>`** → L-1 cannot recur
   (no view holds a list to splice, so the vueuse ref/non-ref branch is unreachable) and L-13
   closes, taking `sortablejs` and `@types/sortablejs` out of the tree.
4. **`export/index.ts` is the barrel** → `./export` resolves to the contract set, `export.ts` has
   no name to occupy, and L-2 and L-4 both close by deletion rather than migration.
5. **Ports declared as interfaces, not `ReturnType<typeof …>`** → the port contract becomes
   checked rather than inferred, and typechecking a pane stops requiring inference over the admin
   console.
6. **Session owns edit state** → L-14's second transport and L-15's whole mechanism (including the
   2 s mount poll and its `console.warn`) delete; no component instance is ever a dependency.
7. **`domain/palette` is one definition** → whether it lives in the library or the demo, the API,
   the exporter and the store stop each having their own (L-16, L-4).

`PalettesPane.vue` at the end of that is roughly: template + `const library = useLibraryStore()` +
`const session = useColorSession()`. No props, no emits, no injects of aggregate ports, no refs
into children, no `as any`, no inline token aliasing — and one import convention.

**Ordering note for whoever executes.** **L-3 first** (extract `keys.ts`): mechanical, no behaviour
change, and it unblocks the closure reduction that makes everything else cheap to verify.
**L-11 and L-12 next**: both are manifest/config edits measured in lines, and L-11 in particular
should land before anyone writes a new library import, because the config currently invites an
import that cannot resolve. L-1/L-13 and L-2 are independent of those and of each other.

---

# Summary table

| ID | Pass | Severity | Defect | Anchor |
|---|---|---|---|---|
| L-1 | 1 | **BLOCKER** | Drag-to-reorder persists a corrupted order (fwd) / silently drops it (back) — dereferenced computed passed to `useSortable`, `onEnd` not overriding `onUpdate`, computed cache mutated in place | `PalettesPane.vue:180-197` |
| L-2 | 1 | **BLOCKER** | Dual export impls; app ships `export.ts`, 78 assertions test `export/` — they disagree in prefix, index base, colour spelling, and (pass 2) in domain model | `export.ts` ∥ `export/`; `usePaletteExport.ts:9` |
| L-3 | 1+2 | MAJOR | palettes ⇄ shell cycle from co-locating InjectionKeys with the provider; 97-module closure, 18 admin, on the eager boot path; shell reaches through palettes for `platform/auth` | `usePalettePorts.ts:5-7,19,271-275`; `Dock.vue:18` |
| L-4 | 1 | MAJOR | Three slugifiers; filename disagrees with the slug inside the file it names | `utils.ts:3`, `export.ts:9`, `canonical.ts:50` |
| L-5 | 1 | MAJOR | `cardRefs` imperative feedback registry duplicated, keyed by `id` here and `slug` in BrowsePane; both leak | `PalettesPane.vue:177,84,205` |
| L-6 | 1 | MAJOR | 19 pure re-export shims in `demo/ui/`; this file uses both the shim and the direct subpath in one block | `demo/ui/*/index.ts`; `PalettesPane.vue:129-131` vs `:148-149` |
| L-11 | **2** | MAJOR | `exports` has no `"."`; `tsconfig.demo.json` declares 3 specifiers absent from the map and missing on disk; `demo/shared/utils.ts:19` asserts a root barrel that does not exist. **Corrects pass 1's negative proof §2** | `package.json#exports`; `tsconfig.demo.json`; `demo/shared/utils.ts:12-19` |
| L-12 | **2** | MAJOR | glass-ui + keyframes.js are runtime `dependencies` of a package whose `src/` and `dist/` import neither | `package.json#dependencies`; `src/`; `dist/subpaths/*.js` |
| L-13 | **2** | MAJOR | glass-ui 7.0.0 ships `SortableList`/`SortableItem`/`SortableHandle`; the pane hand-rolls `useSortable` + `sortablejs` and reaches a child's `$el`. **Amends L-1's cure** | `glass-ui/sortable-list`; `PalettesPane.vue:133,181,183`; `PaletteCardGrid.vue:8-12` |
| L-14 | **2** | MAJOR | `savedColorStrings` reaches the subtree as a de-reffed prop AND as a `Ref` ports dep, from one origin | `usePaneRouter.ts:155`; `PalettesPane.vue:154`; `usePalettePorts.ts:36` |
| L-15 | **2** | MAJOR | Commit-edit has two mechanisms; the instance-ref one needs a 40×50 ms mount poll that gives up with a `console.warn` | `usePaneRouter.ts:156-157`; `usePalettePorts.ts:239`; `usePaletteWiring.ts:31-58` |
| L-7 | 1 | MINOR | Per-instance `:style` override of a root recipe, duplicating the oklch triple | `PalettesPane.vue:15,171-175` vs `utils.css:195-197` |
| L-8 | 1 | MINOR | `watch` / `onMounted` / `nextTick` imported, 0 uses | `PalettesPane.vue:128` |
| L-9 | 1 | MINOR | Dead `@composables/…` alias cited as live in 6 files | `PalettesPane.vue:6` + 5 |
| L-16 | **2** | MINOR | `Palette` has three homes and none is the library; `src/` has zero palette code while `package.json:16` advertises the keyword | `demo/palettes/types.ts`; `api/src/modules/palette`; `export/types.ts`; `src/` |
| L-10 | 1 | INFO | `./value` and `./transform` published with 0 demo dogfood sites | `package.json#exports` |

**Reproduction artefacts:** `scratchpad/reorder-probe.mjs`, `scratchpad/reorder-probe2.mjs`
(L-1, headless Chromium vs `localhost:9000`, pass 1); `scratchpad/closure.mjs` (L-3, module-graph
walker, pass 1). All pass-2 findings reproduce from the shell commands pasted inline — no artefact
needed. **No source file was modified by either seat.**

**Visual evidence checked (pass 2):**
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/palettes.png` read directly.
The route renders correctly — no blank, no horizontal overflow, `main`=1, 0 page errors, 0 console
errors across all four Safari matrices (`REPORT.md` per-capture table, `/#/palettes` rows). The
`namelessButtons: 1` on desktop light/dark with `0` on mobile tracks the left picker pane, not this
component — `PalettesPane`'s only icon-only button carries `aria-label="Delete all saved palettes"`
(`:68`). **No library-structure defect is visible in the render**, which is exactly why this seat
exists: every finding above is invisible to the eye and to the visual matrix both.
