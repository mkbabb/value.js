# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractPane.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was explicitly spawned with. Seat declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/extract/ExtractPane.vue` (37 lines).
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Write scope honoured: this file is the only artifact produced. No `src/`, `demo/`, `api/`,
  `test/`, `e2e/`, `vnext/`, `dev.sh`, or `INBOX.md` was edited.

**Verdict: DEFECTIVE.** 4 MAJOR, 4 MINOR, 3 INFO. The strongest defect is **L-1**: a 37-line
presentational shell reaches into another feature's 92-module god facade to obtain one `Symbol`,
dragging the entire admin API + auth stack into its own module closure.

---

## Method / evidence provenance

| tool | what it produced |
|---|---|
| static closure walker (`scratchpad/graph.mjs`, `delta.mjs`, `delta2.mjs`) | transitive module closures, two variants: all-edges and value-edges-only (type imports excluded, since they are erased) |
| `node --input-type=module -e 'import.meta.resolve(...)'` | ground-truth Node resolution of the published specifiers |
| `npx vue-tsc -p tsconfig.demo.json --noEmit` | `EXIT=0` (demo program green) |
| Playwright (live dev server `:9000`, 2 probes) | computed DOM: button naming, `.pane-scroll-fade` timeline registration, loaded module list on `/#/extract` |
| `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` + `shots/**` | the 4-matrix Safari capture rows for `/#/extract` |

Where a claim rests on a hypothesis rather than a run, it is labelled **HYPOTHESIS**.

---

## The component's six edges, traced

`demo/workbenches/extract/ExtractPane.vue:23-28`

| # | import | home | verdict |
|---|---|---|---|
| 1 | `vue` | — | clean |
| 2 | `../../ui/card` | `demo/ui/card/index.ts` (1-line re-export of `@mkbabb/glass-ui`) | **L-4** dual path |
| 3 | `./ExtractWorkbench.vue` | sibling | clean (but see **L-7**) |
| 4 | `../../shared/ui/PaneHeader.vue` | `demo/shared/ui/` | **L-5** inverted style ownership |
| 5 | `../../palettes/usePalettePorts` | `demo/palettes/` — 92-module facade | **L-1 BLOCKING-class coupling** |
| 6 | `@mkbabb/value.js/color` (`type SpaceId`) | published subpath | **clean** — see negative proof N-1 |

---

## Findings

### L-1 · MAJOR — a `Symbol` import welds ExtractPane to a 92-module palettes facade

**Evidence.**

`demo/workbenches/extract/ExtractPane.vue:27`

```ts
import { COLOR_TARGET_PORT_KEY } from "../../palettes/usePalettePorts";
```

The key is *co-located with the provider factory*. `demo/palettes/usePalettePorts.ts:275` declares it;
`:43` declares `providePalettePorts()`, which imports 15 sub-composables (`:4-20`) covering auth,
admin users, admin audit, admin flagged, admin tags, colour-name queue, version history, slug
migration, browse, and palette actions.

Measured closures (`scratchpad/delta2.mjs`, value-edges only — `import type` excluded because it is
erased at runtime):

```
RUNTIME closure of ExtractPane (value imports only): 45 modules, 206496 bytes
RUNTIME closure of ExtractWorkbench:                 22 modules
RUNTIME marginal from the COLOR_TARGET_PORT_KEY import: 22 modules, 84995 bytes
  demo/palettes/api/index.ts          demo/palettes/useAdminAudit.ts
  demo/palettes/constants.ts          demo/palettes/useAdminFlagged.ts
  demo/palettes/useAdminTags.ts       demo/palettes/useAdminUsers.ts
  demo/palettes/useBrowsePalettes.ts  demo/palettes/useColorNameQueue.ts
  demo/palettes/useFilteredList.ts    demo/palettes/usePaletteActions.ts
  demo/palettes/usePalettePorts.ts    demo/palettes/useSlugMigration.ts
  demo/palettes/useTagEdit.ts         demo/palettes/useVersionHistory.ts
  demo/platform/auth/sessionToken.ts  demo/platform/auth/sessions.ts
  demo/platform/auth/useAdminAuth.ts  demo/platform/auth/useSession.ts
  demo/platform/auth/useUserAuth.ts   demo/platform/storage/useSafeStorage.ts
  demo/platform/transport/api-problem.ts  demo/platform/transport/client.ts
```

Counting type edges too (the *compilation* coupling, which governs incremental rebuild and the
typecheck program) the marginal is **41 modules / 161,227 bytes**, adding all 7 admin panel SFCs
(`AdminUsersPanel.vue`, `AdminAuditPanel.vue`, `AdminFlaggedPanel.vue`, `AdminNamesPanel.vue`,
`AdminTagsPanel.vue`, `AdminListItem.vue`, `PaginationBar.vue`), 4 admin API clients, and the shell's
`useViewManager` / `viewSchema`.

Runtime confirmation on the live server — Playwright `performance.getEntriesByType('resource')` on
`http://localhost:9000/#/extract`:

```json
"adminModules": ["useDockAdminMode.ts","useAdminAuth.ts","useAdminAudit.ts","useAdminUsers.ts",
                 "useAdminTags.ts","useAdminFlagged.ts","admin-users.ts","admin-palettes.ts",
                 "admin-colors.ts","admin-audit.ts"],
"authModules":  ["useAdminAuth.ts","useUserAuth.ts","useSession.ts","sessionToken.ts"],
"palettePorts": 1
```

**Honest scoping — the marginal cost is currently masked.** `demo/color-picker/App.vue:351` calls
`usePaletteWiring(...)` unconditionally, which calls `providePalettePorts` (`usePaletteWiring.ts:24,60`).
So the facade is already in the eager boot graph today, and removing ExtractPane's edge alone would
free zero bytes *right now*. That does not soften the finding — it sharpens it: **ExtractPane's edge
is one of the five that make the eager-boot defect uncurable.** Deferring the admin graph out of boot
is impossible while five lazy panes hard-import the module that defines it.

The pattern is systemic, not a one-off:

```
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:27  LIBRARY_PORT_KEY
demo/workbenches/mix/MixSourceSelector.vue:6                            LIBRARY_PORT_KEY
demo/workbenches/mix/MixPane.vue:10                                     LIBRARY_PORT_KEY
demo/workbenches/generate/GeneratePane.vue:6                            LIBRARY_PORT_KEY
demo/workbenches/extract/ExtractPane.vue:27                             COLOR_TARGET_PORT_KEY
```

Five workbench files, five imports of a `Symbol`, five copies of the same 92-module coupling.

A secondary asymmetry falls out of the same trace: the three consumers of `COLOR_TARGET_PORT_KEY`
handle absence three different ways —
`ExtractPane.vue:36 inject(...)!`, `PalettesPane.vue:165 inject(...)!`, `ColorPicker.vue:198 inject(...)`
(no assertion). One key, three contracts.

**Mechanism.** Injection-key co-location with the provider. The key is a leaf value (a `Symbol` and a
type) but it lives inside the module that constructs the whole subsystem, so every *consumer* pays the
*producer's* cost.

**Cure (transposition, not patch).** Extract a leaf `demo/palettes/keys.ts` holding the five
`InjectionKey` symbols and their five port interfaces — exactly the idiom the demo already runs in
`demo/color-session/keys.ts` (which is why `ExtractWorkbench.vue:190`'s `CSS_COLOR_KEY` import costs
nothing). `usePalettePorts.ts` then *imports* its keys instead of exporting them. The port interfaces
must be hand-declared rather than `ReturnType<typeof providePalettePorts>` (`usePalettePorts.ts:264-269`) —
the derived-type idiom is precisely what forces the consumer to see the constructor. Five call sites
change to `from "../../palettes/keys"`; the boot-graph split becomes possible for the first time.

---

### L-2 · MAJOR — `DisplayColorSpace` has four homes; ExtractPane declares one of them

**Evidence.** `ExtractPane.vue:30`

```ts
type DisplayColorSpace = SpaceId | "hex";
```

```
$ grep -rn 'SpaceId | "hex"' demo src
demo/workbenches/extract/ExtractWorkbench.vue:202:type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ExtractPane.vue:30:type DisplayColorSpace = SpaceId | "hex";
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:21:export type DisplayColorSpace = SpaceId | "hex";
```

The canonical home already exists and is already exported:

```
demo/color-session/color-model.ts:29:export type DisplayColorSpace = PickerSpace | "hex";
demo/color-session/picker-color.ts:37:export type PickerSpace = SpaceId;
```

`PickerSpace` *is* `SpaceId`, so all four declarations are structurally identical. The producer of the
value is `demo/shell/usePaneRouter.ts:139` —
`return { colorSpace: model.value.selectedColorSpace }` — typed by the *color-session* definition. The
consumer re-derives its own. Three redundant declarations, one of them exported (`useImageSampler.ts:21`)
and therefore a fourth competing public name for the same concept.

`PickerSpace = SpaceId` is itself a bare alias of a library type — a standing edict-2 violation in its
own right (`no aliases`), and the reason the duplication reads as harmless: two names for one type
make a third and fourth feel free.

**Aggravating.** The prop contract is unchecked end-to-end regardless:
`usePaneRouter.ts:62-66` types `PaneSlot.props` as `Record<string, unknown>` and
`demo/shell/PaneSlot.vue:121-126` binds it with `v-bind="liveProps"` onto `<component :is>`. So
ExtractPane's `colorSpace` prop type is decoration — it constrains nothing at the only call site.

**Cure.** Delete all three extract-local declarations and `useImageSampler.ts`'s export; import
`type DisplayColorSpace` from `demo/color-session/color-model`. Retire `PickerSpace` in favour of
`SpaceId` from `@mkbabb/value.js/color` — the demo should speak the library's name for the library's
concept. Separately, give the pane registry a discriminated union of per-pane prop shapes so
`Record<string, unknown>` stops erasing the contract.

---

### L-3 · MAJOR — glass-ui does not own the accessible name of its own control; the demo invented two conventions and this component picked the broken one

**Evidence.** The visual audit reports `namelessButtons: 3` for `/#/extract` in **all four** matrices
(`REPORT.md:98,105,110,112`) — the highest count of any non-blob route; every other pane reports 0 or 1.

Live DOM probe, `http://localhost:9000/#/extract` (Playwright `page.evaluate`, all visible `<button>`):

```
aria-label "Save edit"          inExtract=false
aria-label "Cancel edit"        inExtract=false
aria-label "Switch to slug"     inExtract=false
aria-label "Generate new slug"  inExtract=false
aria-label "Cancel"             inExtract=false
aria-label "Select view"        inExtract=false
aria-label "Toggle action bar"  inExtract=false
aria-label "Menu"               inExtract=false
title "Upload image"  aria-label=null  inExtract=TRUE
title "Open camera"   aria-label=null  inExtract=TRUE
title "Reset"         aria-label=null  inExtract=TRUE
```

The three unnamed buttons are exactly the three `DockControl`s of `ExtractControls.vue:40,49,83`, and
they are the only three buttons on the page that use `title` instead of `aria-label`.

The split is not random — it follows an area boundary precisely:

```
DockControl with aria-label: 8   (all under demo/shell/dock/)
DockControl with ONLY title: 11  (all under demo/workbenches/)
DockControl with NEITHER:    0
```

The root cause is in the design system. `node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`
declares `__VLS_Props = { shape, compact, active, type, disabled, as, asChild, class }`. There is **no
`label` / `ariaLabel` prop**. `title` is an undeclared fallthrough attribute. The doc block on that
same file is explicit that "Role rides the consumer" — the primitive stamps `aria-pressed` and
`data-active` itself but leaves naming entirely unowned.

Caveat on the probe: `capture.mjs:102-105` computes `namelessButtons` from
`aria-label || aria-labelledby || textContent` and ignores `title`. The accname spec does admit `title`
as a last-resort source, so on a strict reading these buttons are weakly named rather than unnamed.
That does not rescue the finding — `title` is unreliable under VoiceOver, invisible to touch, and the
demo itself treats `aria-label` as the correct idiom at 8 of 19 sites. **A design system that permits
two spellings of one concept has not defined the concept.**

**Cure.** Add a required-when-iconic `label?: string` to glass-ui `DockControl`, rendered as
`aria-label` on the host button and reused for the tooltip — one prop, one name, one home
(edict 4: variants and primitives belong in glass-ui, not in the consumer). Then delete all 19
`title=` / `aria-label=` spellings in favour of `label=`. This is a glass-ui BH-relay item under the
standing relay edict, not a demo patch.

---

### L-4 · MAJOR — `demo/ui/*` is a 19-directory shim layer over glass-ui, and ExtractPane routes through it

**Evidence.** `demo/ui/card/index.ts` is one line, in full:

```ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

Every one of the 19 directories under `demo/ui/` is the same shape (18 are exactly 1 line; `alert` is
11):

```
alert avatar badge button card checkbox collapsible dialog dropdown-menu input
label popover radio-group select separator skeleton slider switch tooltip
```

Both paths are live simultaneously: 12 files import `Card` via `../ui/card`, while 36 demo files
import from `@mkbabb/glass-ui` directly. ExtractPane takes the shim (`:24`); its own sibling
`ExtractWorkbench.vue:187` takes the direct path (`@mkbabb/glass-ui/dock`). Two spellings inside one
component tree.

Two of the barrels — `label` and `switch` — have **zero** consumers outside `demo/ui/` itself.

This is the fossil of the pre-migration shadcn-vue tree (`demo/@/components/ui/`, ~178 files). The
components moved to glass-ui; the directory stayed as an alias. That is precisely the shape edict 2
forbids: an alias layer whose only function is to let old import paths keep working.

**Aggravating for the design-system law.** The shim also flattens glass-ui's own subpath map: `Card`
comes from the barrel `@mkbabb/glass-ui` rather than `@mkbabb/glass-ui/card`, so the shim path pulls
the full barrel where the direct path would pull one chunk. `ExtractPane`'s closure carries 9 of these
barrels (`badge`, `button`, `card`, `dropdown-menu`, `input`, `popover`, `skeleton`, `slider`,
`tooltip`).

**Cure.** Delete `demo/ui/` entirely. Rewrite the ~90 import sites to the glass-ui subpath that owns
each component (`@mkbabb/glass-ui/card`, `/slider`, …). This is mechanical, has no runtime behaviour
delta, and removes an entire directory from the lattice.

---

### L-5 · MINOR — inverted style ownership: the pane declares a timeline whose rule lives in its child

**Evidence.** `ExtractPane.vue:5` puts `pane-scroll-fade` on the root `Card`. The class is defined in
an **unscoped** `<style>` block inside the child it wraps — `demo/shared/ui/PaneHeader.vue:54-57`:

```css
.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

PaneHeader's own animations (`:186-201`) then consume `animation-timeline: --pane-scroll`. So the
*producer* of the named timeline is the pane root, the *rule that makes it a producer* is owned by the
child, and the contract between them is a bare string with no type, no prop, no compile-time check.

Nine sibling roots opt in by hand (`GradientPane.vue:20`, `MixPane.vue:62`, `ExtractPane.vue:5`,
`GeneratePane.vue:31`, `ConfigSliderPane.vue:106`, `AboutPane.vue:4`, `BrowsePane.vue:2`,
`PalettesPane.vue:2`, `AdminPane.vue:2`). A tenth pane that forgets the class loses the entire header
choreography silently — no error, no type failure, just a dead scroll effect.

It does currently work. Live probe on `/#/extract`:

```json
{"paneScrollFadeCount": 2, "scrollTimeline": "--pane-scroll", "contain": "content"}
```

`demo/DESIGN.md:388` records the colocation as deliberate ("No new global utility class for one
consumer"). The rationale is sound about *globals*; it picked the wrong remedy. The concept is not
"a header style" — it is **"a pane"**, and a pane has no component.

**Cure.** Make the pane a component. A `<PaneShell>` in `demo/shared/ui/` owning the `Card
tier="resting"`, the scroll host class, and a `<PaneHeader>` slot collapses nine hand-copied
class-lists into one, turns the stringly contract into structure, and deletes the
`w-full overflow-y-auto overflow-x-hidden min-w-0 h-full` incantation from nine files. Note this is a
*wrapper that earns itself by deleting nine copies* — it is not the speculative wrapper edict 3
forbids. Under that shell, `ExtractPane.vue` collapses to its actual content: a header string, a
description string, and one `<ExtractWorkbench>`.

---

### L-6 · MINOR — `.plate-ink` is declared five times, identically

**Evidence.**

```
demo/workbenches/extract/ExtractWorkbench.vue:290
demo/workbenches/extract/ImageDropZone.vue:109
demo/workbenches/extract/ExtractControls.vue:148
demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
```

Each body is byte-identical: `color: var(--ink-muted, var(--muted-foreground));`. Three of the five are
in the extract subtree. Each carries the same explanatory comment describing it as "the certified
de-emphasis rung" — i.e. every author knew it was a *token*, and every author re-declared it locally
anyway because `<style scoped>` gave them nowhere else to put it.

This is a per-instance override of a design-system concept (edict 5: root-level styling) duplicated
five ways (edict 1). `demo/styles/foundation.css:88` documents that glass-ui supplies the
`@utility` registrations for this family (`text-mono-small` &c.) — so the vacancy is on the glass-ui
side.

**Cure.** One `@utility plate-ink` registration in glass-ui alongside the existing ink utilities;
delete all five scoped blocks. If glass-ui declines, one registration in `demo/styles/foundation.css`.
Either way: one home.

---

### L-7 · MINOR — dead API surface on the component ExtractPane wraps

**Evidence.** `ExtractWorkbench.vue:204-209`

```ts
const { layout = "column", colorSpace = "hex" } = defineProps<{
    /** `column` — the pane's single flow; `split` — the dialog's two columns. */
    layout?: "column" | "split";
```

The `split` branch is live in four template sites (`:5`, `:13`, `:18`, `:148`). Its consumer count is
**zero** — `ExtractWorkbench` has exactly one caller in the tree:

```
$ grep -rn 'ExtractWorkbench' demo
demo/workbenches/extract/ExtractPane.vue:11   <ExtractWorkbench
demo/workbenches/extract/ExtractPane.vue:25   import ExtractWorkbench from "./ExtractWorkbench.vue";
```

and that caller hardcodes `layout="column"` (`ExtractPane.vue:13`) — which is also the default, so the
binding is doubly redundant. The "dialog" the comment refers to is the retired
`ImagePaletteExtractor` twin; `useExtractSession.ts:5` still says "both shells now consume this
session", but only one shell survives. This is the residue of an otherwise-complete collapse
(see negative proof N-5).

**Cure.** Delete the `layout` prop and its four conditional branches; delete `layout="column"` from
`ExtractPane.vue:13`. ~15 lines of template conditionals disappear.

---

### L-8 · MINOR — the demo's declared view of the published surface has drifted from the surface

**Evidence.** `package.json` `exports` is a **7-key** map with no root:

```
./color ./css ./easing ./math ./quantize ./transform ./value
```

`tsconfig.demo.json` declares a different, **8-key** set:

```
"@mkbabb/value.js"        -> ./dist/index.d.ts        (file does not exist; dist/ root has only 3 chunk files)
"@mkbabb/value.js/parsing"-> ./dist/subpaths/parsing.d.ts  (not in exports; file does not exist)
"@mkbabb/value.js/units"  -> ./dist/subpaths/units.d.ts    (not in exports; file does not exist)
```

and **omits** `./css`, which has 10 live demo import sites — two of them inside this component's own
subtree (`ImageEyedropper/composables/useImageSampler.ts` and `composables/useExtractSession.ts`).

Ground truth from Node:

```
$ node --input-type=module -e "for (const s of [...]) { try { console.log('OK  ', s, '->', import.meta.resolve(s)) } catch(e) { console.log('FAIL', s, e.code) } }"
FAIL @mkbabb/value.js         ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/color   -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/color.js
OK   @mkbabb/value.js/css     -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js
FAIL @mkbabb/value.js/parsing ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/units   ERR_PACKAGE_PATH_NOT_EXPORTED
```

The prose is stale in three places, all of which assert facts that are now false:

- `tsconfig.demo.json` — "the `exports` map is a CLOSED 8-key set" (it is 7) and "the 8 public keys"
  (there are 7, and 2 of the 8 listed do not exist).
- `tsconfig.demo.json` / `vite.config.ts:23-36` — "glass-ui's published `dist/` imports the value.js
  core by the bare `@mkbabb/value.js` specifier". Measured against the installed glass-ui 7.0.0:
  `@mkbabb/value.js/color` ×7, `/css` ×4, `/easing` ×2, **bare ×0**. glass-ui migrated to subpaths; the
  self-alias rationale outlived its cause.

This is currently inert — `vue-tsc -p tsconfig.demo.json --noEmit` exits `0`, because `./css` resolves
through Node's package self-reference rule under `moduleResolution: bundler`, and nothing imports the
two phantom subpaths. It is nevertheless a **false map of the public surface**, which is the exact
failure mode this axis exists to catch: three configuration files and their comments describe an API
the package does not have.

**Cure.** Generate the `tsconfig.demo.json` `paths` block from `package.json#exports` the same way
`vite.config.ts:37-50` already generates the Vite aliases — one source of truth, drift impossible by
construction. Delete the three phantom entries. Rewrite the two stale comment blocks against glass-ui 7.

---

### L-9 · MINOR — the library has no root entry, and a demo fork is still justified by it

**Evidence.** `import.meta.resolve("@mkbabb/value.js")` → `ERR_PACKAGE_PATH_NOT_EXPORTED` (above).
`package.json` has no `main`, no `module`, no `types`, and no `"."` key in `exports`. `dist/` root
contains only `anchors-C_wdoOYd.js`, `operations-CB_1wGy4.js`, `result-CZJK1CwL.js` — three shared
chunks, no entry.

`demo/shared/utils.ts:10-19` forks `debounce` into the demo and justifies it thus:

> `debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier — the
> full-barrel import that drags the scroll-timeline grammar chunk (~36 KiB gz) into the eager graph…
> the demo owns its copy; **the library's root-barrel export stands for external consumers.**

Both halves are now false. There is no root-barrel export for external consumers to reach, and
`grep -rn 'debounce' src/` returns **nothing** — the symbol is gone from the library entirely. The
"fork" is now the only implementation, and the comment documents a trade-off against an alternative
that no longer exists.

`demo/shared/utils.ts` is in ExtractPane's closure (verified), so this reasoning is load-bearing on
the subject component's own dependency path.

**Cure.** Either publish a `"."` export (and let the demo dogfood it), or accept the subpath-only
surface and rewrite the comment to say so. Do not leave a fork standing on a rationale that cites a
non-existent export.

---

### L-10 · INFO — 2 of the 7 published subpaths have zero dogfood

```
./color    : 23 demo files
./css      :  9
./math     :  6
./easing   :  3
./quantize :  3
./value    :  0   demo, 0 test/, 0 e2e/
./transform:  0   demo, 0 test/, 0 e2e/
```

The demo is the repo's proof that the public API is usable. Two published entry points — including
`./value`, the library's namesake — are exercised by nothing. **HYPOTHESIS** (not reproduced): a
breaking change to either would ship green.

---

### L-11 · INFO — the gh-pages build emits no application chunk (known §F carry; blocks prod measurement)

`dist/gh-pages/assets/` contains exactly two `.js` files:

```
12K  quantize-worker-xMwe415C.js
4.0K index-Dezn_h7o.js
```

`index-Dezn_h7o.js` is the Vite modulepreload polyfill and nothing else (read in full: 1 IIFE, no Vue,
no app code). `index.html` references one `<script type="module" src="./assets/index-Dezn_h7o.js">`
and zero `modulepreload` links. Every referenced asset exists — the build did not fail loudly, it
emitted an app with no application.

This is the W44 §F "gh-pages prod-preview empty-mount" carry. Recorded here because it is the reason
**L-1's chunk-level cost could not be measured against a real production bundle** — the static
closure and the dev-server module list are the best available evidence, and both are stated as such.

---

## Negative proofs — what this component gets right

These are positive findings, verified, not absence of inspection.

- **N-1 · The value.js public surface is consumed correctly, with zero deep imports.** Every value.js
  specifier in the entire extract subtree is a published subpath — `@mkbabb/value.js/color` (×3),
  `/css` (×2), `/quantize` (×3). Zero `@src/…` imports, zero relative reaches into `../../../src/`.
  `grep -rn '@src' demo/workbenches/` returns nothing. A real external consumer could write every one
  of these lines, and Node resolves all of them (`import.meta.resolve` OK, above). The
  T.W1 demo-dogfood keystone holds here.
- **N-2 · `verbatimModuleSyntax` is clean.** Every type-only import in the subtree is spelled
  `import type` — `ExtractPane.vue:28`, `ExtractWorkbench.vue:189`, `useImageSampler.ts` (both),
  `useExtractSession.ts` (both), `useImageQuantize.ts` (both), `useInertiaGesture.ts`. No mixed
  imports.
- **N-3 · `vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`.** The demo program typechecks green at
  HEAD.
- **N-4 · `tier="resting"` is a real prop, not a fallthrough attribute.**
  `glass-ui/dist/components/card/Card.vue.d.ts` declares `CardProps extends SurfaceProps`, and
  `Surface.vue.d.ts:9` declares `tier?: SurfaceTier`. The pane is speaking the design system's own
  vocabulary.
- **N-5 · The historical dual path is genuinely dead.** `useExtractSession.ts:4` records that
  `ExtractPane` and `ImagePaletteExtractor` once "duplicated ~90%" of this state. There is now exactly
  one implementation; `grep -rn 'ImagePaletteExtractor' demo` finds only the comment. The named
  suspect classes in the brief (`ActionBarLayer`'s local `useLayerTransition`, `palettes/export.ts` vs
  `usePaletteExport.ts`, the three `useDark` stores) are **not** present in this component's closure —
  the only `useDark` references in `demo/` are two comments under `scenes/about/markdown/`, and every
  live site uses the single `useGlobalDark` from `@mkbabb/glass-ui/dark` (9 call sites, one home).
- **N-6 · Vue 3.5 idioms are correct.** Reactive props destructure with defaults
  (`ExtractPane.vue:32`, `ExtractWorkbench.vue:204`), `useTemplateRef` in the siblings
  (`ImageDropZone.vue`, `ExtractWorkbench.vue:223`, `useLoupeCanvas.ts`), `shallowRef` in
  `useExtractSession.ts:1`.
- **N-7 · Visual: no rendering defect.** `/#/extract` reports `overflowX 0`, `main 1`, `pageErrors 0`,
  `consoleErrors 0`, `blankOrNearBlank` clear in all four Safari matrices
  (`REPORT.md:122,137,152,167`). Both screenshots read correctly — desktop split (Extract | My
  Palettes), mobile single-pane with the segmented tab. The layout is sound; the defects on this axis
  are all structural.

---

## The greenfield lattice

Structuring this today with no legacy, stated concretely.

```
@mkbabb/value.js            8 subpaths incl. "."; no phantom keys; paths generated from exports
@mkbabb/glass-ui            Card · Slider · DockControl{label} · @utility plate-ink · PaneShell?
──────────────────────────────────────────────────────────────────────────────────────────────
demo/color-session/         THE colour domain. Owns DisplayColorSpace (one declaration, re-exporting
                            SpaceId, no PickerSpace alias). Owns keys.ts. Depends on nothing in demo.
demo/palettes/keys.ts       leaf: 5 InjectionKeys + 5 hand-declared port interfaces. Zero imports
                            beyond `vue` and the domain types.
demo/palettes/…             the palette feature. IMPORTS palettes/keys; does not export it.
demo/workbenches/extract/   ExtractWorkbench (the whole capability) + composables. Imports
                            palettes/keys, color-session/keys, glass-ui, value.js subpaths.
                            NEVER palettes/usePalettePorts, NEVER shell.
demo/shell/                 PaneShell, routing, dock. May import features. Features never import shell.
```

Direction is enforced by one rule with no exceptions: **a module that *defines* a subsystem may never
be the module that *names* it.** Keys, types, and tokens live in leaves; constructors live above them;
consumers reach only for leaves. Under that rule L-1, L-2 and the type-only shell edge are all
structurally impossible, and the eager-boot admin graph becomes splittable.

`ExtractPane.vue` itself does not survive this lattice, and should not. Once `PaneShell` owns the
card + scroll host + header (L-5) and `ExtractWorkbench` owns the capability, the pane is a
three-line registry entry — a title, a description, and a component. Thirty-seven lines whose only
irreducible content is the string `"Pull palettes from any image."` are thirty-four lines of
scaffolding that a shell component deletes across all nine panes at once.

## Ranked

| id | severity | one line |
|---|---|---|
| L-1 | MAJOR | one `Symbol` import welds ExtractPane to a 92-module facade (+22 modules / 85 KB runtime, +41 / 161 KB compile); 5 workbench files share the pattern; blocks the boot-graph split |
| L-2 | MAJOR | `DisplayColorSpace` declared 4× (3 in this subtree) over an already-exported canonical type; prop contract erased at the router by `Record<string, unknown>` |
| L-3 | MAJOR | glass-ui `DockControl` has no naming prop → shell uses `aria-label` (8/8), workbenches use `title` (11/11); this component owns 3 of the 3 unnamed buttons on `/#/extract` in all 4 matrices |
| L-4 | MAJOR | `demo/ui/*` = 19 one-line re-export shims of glass-ui; both paths live (12 vs 36 sites); 2 barrels unused; ExtractPane takes the shim, its sibling takes the direct path |
| L-5 | MINOR | `.pane-scroll-fade` declares the scroll-timeline from inside the child that consumes it; 9 pane roots opt in by hand-copied string |
| L-6 | MINOR | `.plate-ink` declared 5× identically; a design token living in 5 scoped style blocks |
| L-7 | MINOR | `ExtractWorkbench`'s `layout="split"` branch: 4 template sites, 0 consumers; sole caller redundantly passes the default |
| L-8 | MINOR | `tsconfig.demo.json` paths ≠ `package.json` exports: 2 phantom keys, 1 missing key with 10 live sites, 3 stale comment blocks asserting a glass-ui bare-import that glass-ui 7 does not make |
| L-9 | MINOR | no root export exists (`ERR_PACKAGE_PATH_NOT_EXPORTED`); `demo/shared/utils.ts` still justifies its `debounce` fork by citing it; `debounce` is gone from `src/` |
| L-10 | INFO | `./value` and `./transform` published with zero consumers in demo/, test/, e2e/ |
| L-11 | INFO | gh-pages build emits a 4 KB polyfill and no app chunk (known §F carry; blocks prod-bundle measurement of L-1) |
