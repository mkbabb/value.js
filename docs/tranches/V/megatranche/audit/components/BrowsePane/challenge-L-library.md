# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared, not inherited.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

**Verdict: DEFECTIVE.** 17 findings; 11 MAJOR-or-worse. The premise holds — but not where the
challenge brief guessed. The demo does *not* deep-import `src/`; that axis is clean and I prove
the negative below (§Negative proof). The rot is one layer up: **a concept in this component's
graph routinely has two or three homes, and the shipping home is the wrong one.**

---

## Method

Static import trace with type-only edges erased (`import type` / all-inline-`type` clauses are
compiled away and create no runtime edge), rooted at `BrowsePane.vue`, following `.ts`/`.vue`/
`index.ts` resolution. Script: `/private/tmp/claude-504/.../scratchpad/trace3.mjs`.

```
RUNTIME MODULES REACHED FROM BrowsePane.vue: 82
demo/palettes 67 · demo/ui 11 · demo/platform 9 · demo/color-session 5 · demo/shared 2
```

Counterfactual runs (same script, one edge cut) give the measured numbers cited in L-6.
Live DOM probes against `http://localhost:9000` are marked as such; the shared browser was under
concurrent use by other seats mid-session, so I report only the two reads that reproduced and I
label the one that did not.

---

## Findings

### L-1 · BLOCKER — the byte-exact export contract ships to nobody; the pre-contract copy is what users get

`demo/palettes/export/` is a 12-module, contract-backed serializer set (V.W51, byte authority
`docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51): an immutable `ExportSnapshot` grammar
(`export/types.ts:52-62`), one shared canonical facility (`export/canonical.ts`), RFC-8785 JSON
canonicalization, domain-separated digests, and five byte-exact serializers.

It is dead. Its **only** consumer in the tree is a test:

```
$ grep -rn "export/serializers" demo src test
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

What BrowsePane actually runs, at `BrowsePane.vue:324`:

```
BrowsePane.vue:198  import { usePaletteExport } from "./usePaletteExport";
BrowsePane.vue:324  const { onExport } = usePaletteExport();
usePaletteExport.ts:9   } from "./export";          →  demo/palettes/export.ts  (132 lines, pre-contract)
```

The new barrel names its own rival in prose — `demo/palettes/export/serializers.ts:6-9`:

> "the sibling legacy `../export.ts` (the pre-contract routed seat that W50 will replace) still
> resolves `./export`; the byte-exact set is addressed by its explicit paths here so the two never
> collide."

Two implementations of one concept, alive simultaneously, deliberately kept from colliding by
filename. The **tested** one ships nothing; the **shipping** one has no byte test. `demo/test/
export/byte-exact.test.ts` is therefore a false proof: it is green against code no user reaches.

Second-order: `export/png.ts:11` imports `oklch, toRgba8` from `@mkbabb/value.js/color` — the dead
path dogfoods the library. The live path (`export.ts:85-119`) rasterizes SVG through an `Image` +
canvas and touches value.js not at all. The demo's export feature currently proves nothing about
the published color surface.

- **Reproduction**: `grep -rn "export/serializers" demo src test` → 1 hit, a test file.
  `grep -rn 'from "./export"' demo` → 1 hit, `usePaletteExport.ts:9`.
- **Cure**: delete `demo/palettes/export.ts` and `usePaletteExport.ts`. `onExport` becomes a
  snapshot build (`Palette` → `ExportSnapshot`) plus `serializePng|Json|Css|Svg|Tailwind` +
  `filenameFor`/`mimeFor` from `export/canonical.ts`. The download side-effect is the only thing
  the component keeps, and it belongs in `export/download.ts`, not in a `use*` wrapper.

### L-2 · MAJOR — three slugifiers, measured divergence on every non-ASCII input, and the contract says none should exist

| home | code | role |
|---|---|---|
| `demo/palettes/utils.ts:3-12` | NFKD normalize → strip combining → `[^a-z0-9 -]` | the palette **slug** authority (`createSlug`) |
| `demo/palettes/export.ts:9-11` | `toLowerCase().replace(/[^a-z0-9]+/g,"-")` — no normalize | the **live export filename** |
| `demo/palettes/export/canonical.ts:52-58` | `identifierPrefix` — returns `source.slug` verbatim | the contract's answer |

`canonical.ts:51` states the contract's position in one clause: *"The prefix already satisfies the
token grammar; **no slugifier exists**."* The live tree has two.

Measured divergence (both functions extracted verbatim and run):

```
"Café Noir"        utils: "cafe-noir"       export.ts: "caf-noir"
"Ångström Blues"   utils: "angstrom-blues"  export.ts: "ngstr-m-blues"
"naïve  palette"   utils: "naive-palette"   export.ts: "na-ve-palette"
"Müller-Röhm 2"    utils: "muller-rohm-2"   export.ts: "m-ller-r-hm-2"
"日本 sunset"       utils: "-sunset"         export.ts: "sunset"
"A—B"              utils: "ab"              export.ts: "a-b"
```

6 of 6 disagree. A palette stored at slug `angstrom-blues-a1b2c3d4` exports as
`ngstr-m-blues.json`; the round-trip identity the W51 contract exists to guarantee is broken on the
live path before the serializer is even reached.

- **Cure**: one home. `createSlug` in `demo/palettes/utils.ts` mints the slug at creation; every
  downstream identifier reads `palette.slug`. `export.ts`'s copy dies with L-1.

### L-3 · MAJOR — `demo/ui/*` is a pure alias layer, and BrowsePane reaches glass-ui both ways inside one 20-line import block

All 19 directories under `demo/ui/` are one-line re-export barrels:

```
demo/ui/card/index.ts    → export { Card, CardHeader, … } from "@mkbabb/glass-ui";
demo/ui/button/index.ts  → export { Button } from "@mkbabb/glass-ui";
demo/ui/input/index.ts   → export { Input } from "@mkbabb/glass-ui/forms";
… 19 dirs, 1 file each, 1 re-export line each (only `alert` has 2)
```

They add nothing: no wrapper component, no variant, no default props, no styling. They are the
preserved shadcn-vue import path — precisely the *alias / migration shim* standing edict 2 forbids,
and the contrivance edict 3 forbids.

Measured spread:

```
$ grep -rEn 'from "(\.\./)+ui/[a-z-]+"' demo | grep -v '^demo/ui/' | wc -l   →  90 statements
$ …                                                | files                   →  48 files
$ files importing glass-ui BOTH through the shim AND directly                →  24 files
```

BrowsePane is one of the 24, and the split is inside a single import block:

```
BrowsePane.vue:180   import { Card } from "../ui/card";              ← via shim
BrowsePane.vue:181   import { Button } from "../ui/button";          ← via shim
BrowsePane.vue:195   import { SearchBar } from "@mkbabb/glass-ui/search";  ← direct
```

Two ways to reach one design system, 15 lines apart, in the subject component.

- **Cure**: mechanical codemod — rewrite the 90 statements to their `@mkbabb/glass-ui[/subpath]`
  target and delete `demo/ui/` whole. Zero behaviour change; `demo/ui/*` re-exports exactly the
  producer symbols.

### L-4 · MAJOR — the structural guard that protects this component's barrel seam is inert

`eslint.config.js:220-303` carries three boundary rules — G-DEMO-1, G-DEMO-3a, G-DEMO-3b — described
in their own comments as *"Wired STANDING so a future feature edit cannot silently re-invert the
demo module graph."* G-DEMO-3b is the rule that makes BrowsePane's `./browser/card` and
`./browser/dialog` barrel imports (lines 184-199) a *contract* rather than a habit.

Every one of its file globs and ban patterns is dead:

```
$ ls -d demo/@                       →  No such file or directory
$ find demo/@/components -type f     →  0
$ find demo/@/lib        -type f     →  0
$ find demo/@/composables -type f    →  0
$ grep -rn "@components" vite.config.ts tsconfig*.json   →  (no matches; alias undefined)
$ find demo -type d -name palette-browser                →  (none)
```

The globs (`demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**`) match **0 files** —
`demo/@/` was deleted at W43/RF-15. The ban group `@components/custom/palette-browser/**/*.vue`
names an alias that resolves nowhere and a directory that does not exist (the feature lives at
`demo/palettes/browser/`). Two of the three rule objects also have `files:` sets that are entirely
`demo/@/…`, so they are never even selected.

Today's tree happens to satisfy the intent — `grep -rn 'from "[^"]*browser/[^"]*\.vue"' demo` finds
0 external raw-`.vue` reaches — but it satisfies it *by accident*. The enforcement is theatre.
This is the same species as L-1: a codified proof that proves nothing.

- **Cure**: rewrite the three objects against the real tree —
  `files: ["demo/{shell,scenes,workbenches,picker,color-session}/**"]`,
  `group: ["**/palettes/browser/**/*.vue", "**/palettes/*Pane.vue"]` — or delete them. An inert
  guard is worse than no guard: it reads as coverage.

### L-5 · MAJOR — the published surface has no root, and two live files assert that it does

```
$ node -e 'console.log(Object.keys(require("./package.json").exports))'
[ './color','./value','./css','./easing','./math','./transform','./quantize' ]
has root ".": false ;  main/module/types: undefined undefined undefined

$ node --input-type=module -e 'await import.meta.resolve("@mkbabb/value.js")'
RESOLUTION FAILED: ERR_PACKAGE_PATH_NOT_EXPORTED
```

A real consumer cannot write `import … from "@mkbabb/value.js"`. Yet:

- `demo/shared/utils.ts:15-17` — *"the library's root-barrel export stands for external consumers."*
  It does not exist.
- `docs/colors/quantization.md:6` — `import { quantizePixels, dominantColor } from "@mkbabb/value.js";`
  A documented import that throws at resolution.

- **Cure**: decide. Either add `"."` to `exports` (and build a root entry), or delete both claims.
  The current state documents an API the package refuses to serve.

### L-6 · MAJOR — the injection key lives in the provider module, so a leaf pane imports the whole port assembly

`BrowsePane.vue:182` — `import { BROWSE_PORT_KEY } from "./usePalettePorts";`

`usePalettePorts.ts` is the *provider*: it imports 15 composables (`useAdminUsers`,
`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useColorNameQueue`, `useSlugMigration`,
`usePaletteStore`, the three `platform/auth` composables …) and calls `provide()` five times. The
pane needs one `Symbol`.

Measured (same tracer, that one edge cut):

```
full graph from BrowsePane.vue                   :  82 modules
with the usePalettePorts runtime edge removed    :  62 modules
                                        dropped  :  20
```

The 20 that exist *solely* because a leaf pane wanted a Symbol:

```
useAdminAudit · useAdminFlagged · useAdminTags · useAdminUsers · useColorNameQueue
useSlugMigration · usePaletteStore · usePaletteActions · useVersionHistory · useTagEdit
useBrowsePalettes · useFilteredList · usePalettePorts
platform/auth/{useAdminAuth,useSession,useUserAuth,sessions,sessionToken}
platform/storage/useSafeStorage · platform/transport/api-problem
```

The correct pattern is already in the repo, one directory over, and **BrowsePane uses it on the
very next line**: `BrowsePane.vue:183` — `import { CSS_COLOR_KEY } from "../color-session/keys";`.
`demo/color-session/keys.ts` is a leaf: type-only imports, keys and nothing else. `demo/palettes`
has no `keys.ts`.

- **Cure**: `demo/palettes/keys.ts` holding the five `InjectionKey`s and the five port *types*
  (`import type` from the composables — type edges erase). `usePalettePorts.ts` imports the keys to
  `provide()`; consumers import keys + types only. Direction restored: consumers → keys ← provider.

### L-7 · MAJOR — the port smuggles whole sub-composables; the god facade was renamed, not dissolved

`usePalettePorts.ts:22-31` states the refactor's thesis: the old `usePaletteManager` was *"ONE
cross-everything injected blob"*, dissolved into *"FIVE narrow, feature-owned ports"*, and *"no
consumer injects a member outside the port it named."*

Three members break it. `usePalettePorts.ts:189-191`:

```
        versions,     ← the full useVersionHistory() return  (8 members)
        tagEdit,      ← the full useTagEdit() return         (5 members)
        flagged,      ← the full useAdminFlagged() return   (16 members)
```

`flagged` is the sharp one. `useAdminFlagged` is, by its own docstring, *"flagged palettes CRUD +
pagination"* — 15 of its 16 members call `getToken()` from `useAdminAuth` and drive the moderation
queue (`dismiss`, `deletePalette`, `loadFlagged`, `nextPage`, …). Exactly one member,
`report` (`useAdminFlagged.ts:118`, annotated *"User-facing flag/report — no admin token required"*),
is what the public Browse pane needs. BrowsePane calls it at `BrowsePane.vue:298`:

```
await pm.flagged.report(flagPalette.value.slug, reason, detail);
```

To get one user-facing verb, the unauthenticated community wall is handed a live handle to the
admin moderation surface. Same shape at `BrowsePane.vue:218,223` (`pm.tagEdit.allTags`,
`pm.tagEdit.loadAllTags`) and `:279` (`pm.versions.revert`).

- **Cure**: split `useAdminFlagged` at the authority line — `useFlagReport()` (the one anonymous
  verb, owned by `demo/palettes`) and `useAdminFlagQueue()` (token-gated, owned by
  `demo/palettes/admin`). The browse port lists flat members (`reportFlag`, `revertVersion`,
  `availableTags`, `loadTags`), never a composable object.

### L-8 · MAJOR — OKLab colour distance has no home: hand-rolled twice, and the typed seam to the real one is dead

`BrowsePane.vue:339-349`:

```ts
const radius = 0.15;
return palettes.filter((p: any) => {
    const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
    if (!oklabColors || oklabColors.length === 0) return false;
    return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
});
```

`api/src/modules/palette/service/crud-list.ts:159-180` — the same predicate, same default radius
`0.15`, expanded to `Math.sqrt(dL*dL + da*da + db*db)`.

Neither uses value.js. There is no distance/ΔE export on any published subpath
(`src/subpaths/color.ts` lists 24 symbols; none is a metric), while `src/quantize.ts:116` and
`src/color/anchors.ts:203` each hand-roll their own `Math.hypot` in OKLab/OKLCh. The repo's product
is a colour library and the perceptual metric has four private copies and no public home.

The seam to the server implementation exists and is **dead**:

```
demo/palettes/api/palettes.ts:27-30   colorL? colorA? colorB? colorRadius?   (typed)
demo/palettes/api/palettes.ts:50-53   params.set("colorL", …)                (wired)
$ grep -rn "colorL" demo | grep -v '^demo/palettes/api/'
demo/palettes/BrowsePane.vue:354:    // (API also supports server-side via colorL/colorA/colorB params, but client-side is instant)
```

Zero callers. A comment stands in for the call.

Two further defects fall out of the same structure:

1. **The pane-local filter is invisible to the port.** `displayedBrowse` (`:339`) narrows
   `pm.filteredBrowse` *after* the port has computed everything. So with a colour search active:
   `pm.hasMore` (`:133`) and the "More from the commons" button (`:136-143`) page the **unfiltered**
   cursor, and `PaletteCardGrid`'s empty copy (`:85`) reads *"No published palettes here yet."* —
   a statement about the commons — when the truth is "no loaded palette matched your colour."
2. **A gratuitous `any`.** `Palette.oklabColors` is declared at `demo/palettes/types.ts:32` as
   `{ L: number; a: number; b: number }[] | undefined`. The `(p: any)` at `:344` and the `as`
   at `:345` widen a field that is already exactly that type. Two type holes for nothing.

- **Cure**: publish `oklabDistance` (or `deltaEOk`) on `@mkbabb/value.js/color`; `src/quantize.ts`
  and `src/color/anchors.ts` consume it; the api service imports it; the pane stops filtering
  client-side and passes `colorL/A/B/Radius` through the seam that already exists, so paging,
  `hasMore` and the empty copy all describe the same query.

### L-9 · MAJOR — the anti-duplication composable is now the duplicate, and carries a shim for a deleted host

`useDialogBrowseActions` (`demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts`) was
created *"collapsed to the ONE shared implementation at S.W2 W2-5 (F1/F2) — `BrowsePane` no longer
hand-rolls a drifted second copy"* (`:4-6`).

```
$ grep -rn "useDialogBrowseActions" demo | grep -v /composables/
demo/palettes/BrowsePane.vue:199   (import)
demo/palettes/BrowsePane.vue:261   (call)
demo/palettes/browser/index.ts:41  (re-export)
demo/palettes/browser/dialog/index.ts:9  (re-export)

$ find demo -name "PaletteDialog*"   →  (none)
```

One consumer. The dialog it is named for, homed under, and shaped around no longer exists. What
survives of that host:

- `modalStack?` (`:38`) — optional, **0 suppliers**.
- `onRevert` (`:76-84`) — `if (!modalStack) return;` — **unreachable**.
- `onForkError?` with an `else console.warn` fallback (`:71-72`) — the masking branch for the
  absent host.

And BrowsePane hand-rolls the revert the composable was supposed to own, at `BrowsePane.vue:277-284` —
the same `findIndex` / index-assign body as the dead `:79-82`. The drifted second copy is back,
because the shared copy's version of it is unreachable.

Meanwhile the composable's live content is **fork + three browse-filter setters** — nothing about
dialogs — yet it is exported from `browser/dialog/index.ts` and BrowsePane's filter handlers must
be imported from a barrel named `dialog` (`:199`).

- **Cure**: delete `modalStack`, `onRevert` and the `onForkError` fallback (edict 2). Make
  `onForkError` required. Move the survivor to `demo/palettes/browser/useBrowseActions.ts` — a name
  that describes what it does. `browser/dialog/` returns to being three dialog SFCs.

### L-10 · MAJOR — `remotePalettes` has no owner: 9 hand-rolled slug-index mutations across 6 modules

```
$ grep -rn "findIndex((p) => p.slug" demo
demo/palettes/BrowsePane.vue:281
demo/palettes/BrowsePane.vue:314
demo/palettes/useBrowsePalettes.ts:130   (onVote)
demo/palettes/useBrowsePalettes.ts:166   (onRename)
demo/palettes/useBrowsePalettes.ts:197   (onSetVisibility)
demo/palettes/useAdminUsers.ts:87
demo/palettes/browser/admin/AdminUsersPanel.vue:372
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:60
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:80
```

The browse wall's row collection is a shared mutable `Ref<Palette[]>` handed out through the port,
and six modules each re-derive "find the row for this slug and replace it". Every one repeats the
same `idx >= 0 && existing` guard dance; `BrowsePane.vue:314-318` gets it subtly different
(`findIndex` before the guard, then `remotePalettes.value[idx]` read *before* the `idx >= 0` test —
harmless today only because `undefined` short-circuits the `&&`).

- **Cure**: `useBrowsePalettes` owns the collection and exposes `patchRow(slug, patch)` /
  `prependRow(p)` / `removeRow(slug)`. No consumer holds the array. `Palette` rows keyed by slug in
  a `Map` would make all nine sites O(1) and one line.

### L-11 · MAJOR — the typed error vocabulary is discarded at the pane boundary, re-creating the exact mislabel the platform layer was built to prevent

`demo/platform/transport/availability.ts` defines two distinct typed failures and goes to real
lengths to keep them apart. `:167-169`:

```ts
export function markApiUnreachable(): void {
    // A designed misconfig is NOT an unreachable backend — never mislabel it.
    if (apiAvailability.value === "misconfigured") return;
```

and `:119-129` builds a loud, actionable message naming the origin, the base URL and the fix.

`demo/palettes/useBrowsePalettes.ts:77-82` throws all of it away:

```ts
} catch (e) {
    if (gen !== loadGeneration) return;
    browseError.value = "Failed to load palettes";
```

One hardcoded string for `DevMisconfigError`, `ApiUnavailableError`, `ApiProblem` and any HTTP
status alike. BrowsePane then paints `message="The commons is unreachable."` (`:65`) with that
string as `:detail` (`:66`) — the mislabel `availability.ts:168` forbids by name.

Both halves are visible **in the same viewport**:

- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` — the Browse
  plate reads **"The commons is unreachable." / "Failed to load palettes"**.
- Live read against `http://localhost:9000/#/browse` (Playwright, `document.querySelector`):
  the dock lamp reads **`dev misconfigured — run \`npm run dev\``**
  (`class="dock-status-lamp fira-code"`, `[data-variant="misconfigured"]`).

The platform layer diagnosed it correctly; the dock reported it correctly; the pane that owns the
failing surface reported the one thing the platform layer says is false.

Note also what this does to the audit evidence: every `#/browse` row in
`docs/tranches/V/megatranche/audit/visual/REPORT.md:121,136,151,166` (text 280 desktop / 124 mobile,
4 small tap targets, overflowX 0) was measured on the **error state**. The wall — cards, grid,
swatches, menus, load-more — has never been captured. The corrected state matrix given to this
seat describes an error plate, not the component.

- **Cure**: `browseError` becomes `Ref<Error | null>`; `EmptyState` selects its `message` from the
  error's `name` (`DevMisconfigError` → the loud dev copy, `ApiUnavailableError` → "the commons is
  unreachable", `ApiProblem` → its `title`). The typed hierarchy already exists; the pane just has
  to stop flattening it.

### L-12 · MAJOR — the card-feedback rail is implemented twice and leaks in both copies

| | BrowsePane | PalettesPane |
|---|---|---|
| map | `:209` `reactive<Record<string, InstanceType<typeof PaletteCard>>>({})` | `:177` identical |
| ref fn | `:94` `:ref="(el: any) => el && (cardRefs[palette.slug] = el)"` | `:84` identical modulo `palette.id` |
| dispatch | `:228-230`, `:237-239`, `:249`, `:264` | `:205-207` |

One concept (imperative per-card feedback), two homes, and the only thing `PaletteCard` exposes for
it is `defineExpose({ showFeedback })` (`PaletteCard.vue:244`).

Both copies leak. Vue invokes a function-ref with `null` on unmount; `el && (…)` swallows that call,
so the key is never deleted and `cardRefs` retains a torn-down component proxy forever. Every
search keystroke past the 400 ms debounce calls `loadRemotePalettes(true)`
(`usePaletteWiring.ts:160-162`), which *replaces* `remotePalettes` — unmounting the whole wall. Over
a session, `Object.keys(cardRefs).length` grows monotonically in the number of distinct slugs ever
rendered. (Hypothesis label: I did not measure the growth live — the shared dev browser was under
concurrent use. The mechanism is exact from Vue's function-ref contract and the two source lines.)

- **Cure**: one `usePaletteCardFeedback()` in `demo/palettes/browser/card/composables/` returning
  `{ bind(key), notify(key, msg, variant) }`, whose `bind` deletes on the `null` call. Both panes
  consume it. Better still: `PaletteCard` takes a `feedback?: {message,variant}` prop and the
  imperative rail dies entirely — the port already returns `{success, message}` from
  `onDeleteOwned`/`onSetVisibility`, so the data to render it is already declarative.

### L-13 · MINOR — the "ONE card species" is a copy-pasted class string on 8 sites

`demo/DESIGN.md:97` declares rung 1 PLATE as *"ONE card species — `<Card tier="resting">` with its
defaults … the picker card AND all 9 pane cards"*. In the tree it is a 7-utility string, pasted:

```
$ sed -n 2p demo/palettes/{BrowsePane,PalettesPane}.vue demo/palettes/admin/AdminPane.vue | md5
332778c403757a8b0ae48f19817ab037   (all three, byte-identical)
```

plus near-copies at `workbenches/gradient/GradientPane.vue:20`, `workbenches/mix/MixPane.vue:62`,
`workbenches/generate/GeneratePane.vue:31`, `picker/ColorPicker.vue:6`. The species is asserted in
prose and re-typed per instance — edict 5 (root-level styling, never per-instance) and edict 4
(the variant belongs in glass-ui, which already owns `Card`'s `tier` prop).

- **Cure**: `<Card tier="resting" variant="pane">` in glass-ui, carrying the scroll/overflow/min-w
  recipe. One prop replaces 8 pasted strings; the DESIGN.md claim becomes structurally true.

### L-14 · MINOR — a hand-rolled HSV↔RGB↔hex converter inside a colour library's own demo

`demo/palettes/browser/search/MiniColorPicker.vue` — reached from BrowsePane via
`SearchFilterBar` (`:190` → `SearchFilterBar.vue:6`) — implements the full sexant HSV→RGB switch
(`:26-47`) and the RGB→HSV inverse (`:50-68`) by hand, including a re-derivation of the achromatic
hue-preservation rule (`:59` `if (d === 0) return; // keep existing hue`) that the project already
solved once at library level (`stableHue`, MEMORY §HSV hue drift).

`@mkbabb/value.js/color` publishes `hsv`, `rgb`, `convertColor` and `toRgba8`. The component imports
none of them; its only imports are `vue`, `../../../ui/popover` and `../../../ui/button`.

- **Cure**: `convertColor(hsv(h,s,v), "srgb")` + the existing `demo/color-session/color-utils.ts`
  serializer. ~45 lines of arithmetic deleted, and the picker becomes a real dogfood of the
  published surface instead of a silent vote of no confidence in it.

### L-15 · MINOR — a demo-side descendant override of a glass-ui internal class

`demo/styles/utils.css:132-154` defines `.search-seated`, applied at `BrowsePane.vue:12` (and
`PalettesPane.vue:35`, `admin/AdminPane.vue:14`). Its third rule reaches into the producer:

```css
.search-seated .input-bar-field { font-family: inherit; }
```

`.input-bar-field` is glass-ui's internal (the comment cites `components.css:235`). A consumer
styling a producer's private class is edict 4 (variants belong in glass-ui) plus edict 5. It is
knowingly booked — `demo/DESIGN.md:107-113` marks it *"INTERIM demo seat — booked onto the P3
seated field-chrome rung (ASK-D, with ASK-B font + ASK-C cap seams)"* — so this is a **known
residual**, recorded for completeness, not a new discovery.

- **Cure**: the already-filed ask — a `seated` variant on glass-ui's `SearchBar`/`InputBar`.

### L-16 · INFO — a masking fallback at the leaf for an untyped wire payload

`BrowsePane.vue:215-220`:

```ts
const availableTags = computed<Tag[]>(() => {
    const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
    return Array.isArray(tags) ? tags : Object.values(tags);
});
```

The comment (`:211-214`) is honest: `/colors/tags` can resolve an object-shaped payload, and the
`Tag[]` declaration is a lie. The repair is applied in the *view*, six modules downstream of the
`getTags` transport call (`demo/palettes/api/colors.ts`). Edict 2 names this — a masking fallback
that keeps the wrong shape alive rather than fixing it at the root.

- **Cure**: normalize (or validate) in `api/colors.ts`, so `allTags` is honestly `Tag[]` and the
  cast, the widening and the computed all disappear.

### L-17 · MINOR — the pane owns half its data lifecycle; the app-boot directory owns the other half

`BrowsePane.vue:222-224` loads its tag catalog itself:

```ts
onMounted(() => { pm.tagEdit.loadAllTags(); });
```

Its *primary* content is loaded from the boot tree —
`demo/color-picker/composables/usePaletteWiring.ts:142-146` (note the directory:
`demo/color-picker/` is the app root — `App.vue`, `index.html`, `router/`, `boot/`):

```ts
watch(viewManager.currentView, (view) => {
    if (view === "browse") { ports.browse.loadRemotePalettes(); }
    …
}, { immediate: true });
```

So "acquire this pane's data" has two homes, one of them a route-keyed watcher in the boot
directory. Consequences: the pane cannot be mounted anywhere the shell doesn't also switch
`currentView` to `"browse"`; `#/browse` is a two-pane view (`viewSchema.ts:124-131`,
`left: "browse", right: "palettes"`), so the coupling is to a *view name*, not to the component
that needs the data; and `usePaletteWiring.ts` accumulates per-view load policy for browse, admin-
users and admin-names (`:143-153`) — a boot-resident switch over feature internals.

- **Cure**: `useBrowseWall()` owns its own `onMounted` load + slug/query watchers, colocated with
  the pane. `usePaletteWiring` keeps only the genuinely cross-port watchers (`:165-171`, admin
  logout → view switch) and moves out of `demo/color-picker/` into `demo/shell/`.

---

## Negative proof — the axis that is clean

**The demo does not deep-import `src/`.** Every value.js specifier in BrowsePane's 82-module runtime
graph is a published subpath from `package.json#exports`:

```
demo/color-session/color-utils.ts:1     "@mkbabb/value.js/color"
demo/color-session/generate-color.ts:33 "@mkbabb/value.js/color"
demo/color-session/generate-color.ts:34 "@mkbabb/value.js/css"
demo/color-session/ink.ts:7,11          "@mkbabb/value.js/color", "@mkbabb/value.js/css"
demo/color-session/picker-color.ts:27,34 "@mkbabb/value.js/color", "@mkbabb/value.js/css"
demo/palettes/mix.ts:14                 "@mkbabb/value.js/color"
demo/palettes/export/png.ts:11          "@mkbabb/value.js/color"

$ grep -rn '"@src/|\.\./\.\./src/|value\.js/dist' demo   →  0
```

Two `.bbnf`-grade structural facts back it up: `vite.config.ts:37-50` *generates* the self-alias set
from `package.json#exports` by anchored regex, so an alias cannot drift from the export map or
prefix-match into a subpath; and `tsconfig.demo.json` carries no `@src/*` path. A demo import a real
consumer could not write is therefore impossible to author here by accident. That axis of the
challenge premise does **not** hold, and the mechanism that closes it is worth preserving verbatim
through any restructure.

---

## The lattice, greenfield

If I were structuring this today with no legacy, five layers, strictly one-directional
(`↓` = may import):

```
  5  shell/            App, router, view schema, dock, pane slots
     ↓                 — owns ROUTING ONLY. No feature data policy lives here.
  4  features/         palettes/ · picker/ · workbenches/{extract,mix,generate,gradient} · scenes/
     ↓                 — each owns its own load lifecycle (onMounted, watchers), colocated.
  3  domain/           palette model · export contract · colour session
     ↓                 — pure TS. No Vue component, no transport.
  2  platform/         transport (typed errors, availability) · auth · storage
     ↓
  1  @mkbabb/value.js  +  @mkbabb/glass-ui        (published surfaces, imported by name only)
```

Concretely, for the palettes feature:

```
demo/palettes/
  keys.ts                 ← the 5 InjectionKeys + 5 port TYPES. Leaf. Type-only imports.
  ports.ts                ← providePalettePorts(); imports keys.ts; NOTHING imports it but App.
  model/                  ← Palette, PaletteColor, Tag, createSlug, getPaletteKind
  wall/                   ← BrowsePane.vue + useBrowseWall.ts (its OWN load lifecycle)
       useBrowseWall.ts     owns remotePalettes; exposes patchRow/prependRow/removeRow;
                            builds the FULL server query incl. colorL/A/B/Radius (L-8)
  library/                ← PalettesPane.vue + useLibrary.ts
  admin/                  ← AdminPane.vue + the token-gated composables. Nothing outside imports it.
  card/                   ← PaletteCard + grid + skeleton + useCardFeedback
  search/                 ← SearchBar seat + filter bar + tag popover
  export/                 ← the W51 contract, sole implementation, + download.ts
  api/                    ← the typed client; normalizes wire shapes so no leaf casts (L-16)
```

Six structural rules, each of which kills a finding above:

1. **Keys are leaves.** An `InjectionKey` module imports types only. Consumers import keys; the
   provider imports keys. (kills L-6)
2. **Ports list flat members, never composable objects.** If a consumer needs one verb from a
   composable, the port names that verb. (kills L-7)
3. **A collection has exactly one mutator module.** `remotePalettes` lives in `useBrowseWall` and
   leaves it only as a readonly computed. (kills L-10)
4. **A concept has one implementation.** No `x.ts` beside `x/`. No second slugifier. No second
   distance metric — that one is published from `@mkbabb/value.js/color` and the api imports it.
   (kills L-1, L-2, L-8, L-9, L-14)
5. **The design system is imported by name.** `@mkbabb/glass-ui[/subpath]` everywhere; no
   `demo/ui/`; variants land in glass-ui, never as a consumer-side descendant override.
   (kills L-3, L-13, L-15)
6. **Errors keep their type to the pixel.** Transport throws typed; composables store `Error`;
   components branch on `name`. No string flattening. (kills L-11)

And one meta-rule, from L-4: **a structural invariant is only real if a green build fails without
it.** Every boundary above should be an ESLint `no-restricted-imports` object whose `files:` glob
matches a non-zero count today — assert that count in CI, so the guard cannot rot into theatre the
next time a directory is renamed.

---

## Evidence index

| ref | file:line |
|---|---|
| L-1 | `demo/palettes/BrowsePane.vue:198,324` · `demo/palettes/usePaletteExport.ts:9` · `demo/palettes/export/serializers.ts:6-9` · `demo/test/export/byte-exact.test.ts:23` |
| L-2 | `demo/palettes/utils.ts:3-12` · `demo/palettes/export.ts:9-11` · `demo/palettes/export/canonical.ts:51-58` |
| L-3 | `demo/palettes/BrowsePane.vue:180,181,195` · `demo/ui/*/index.ts` (19 dirs) |
| L-4 | `eslint.config.js:220-303` |
| L-5 | `package.json#exports` · `demo/shared/utils.ts:15-17` · `docs/colors/quantization.md:6` |
| L-6 | `demo/palettes/BrowsePane.vue:182,183` · `demo/palettes/usePalettePorts.ts:4-19` · `demo/color-session/keys.ts` |
| L-7 | `demo/palettes/usePalettePorts.ts:189-191` · `demo/palettes/useAdminFlagged.ts:22-43,118` · `demo/palettes/BrowsePane.vue:218,223,279,298` |
| L-8 | `demo/palettes/BrowsePane.vue:339-354` · `api/src/modules/palette/service/crud-list.ts:159-180` · `demo/palettes/api/palettes.ts:27-30,50-53` · `demo/palettes/types.ts:32` |
| L-9 | `demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:38,71-72,76-84` · `demo/palettes/BrowsePane.vue:261,277-284` |
| L-10 | 9 sites, listed in the finding |
| L-11 | `demo/platform/transport/availability.ts:112-129,167-169` · `demo/palettes/useBrowsePalettes.ts:77-82` · `demo/palettes/BrowsePane.vue:61-78` · `…/visual/shots/safari-desktop-light/browse.png` |
| L-12 | `demo/palettes/BrowsePane.vue:94,209,228-264` · `demo/palettes/PalettesPane.vue:84,177,205-207` · `…/card/PaletteCard/PaletteCard.vue:244` |
| L-13 | `demo/DESIGN.md:97` · 8 `<Card tier="resting">` sites |
| L-14 | `demo/palettes/browser/search/MiniColorPicker.vue:26-68` · `src/subpaths/color.ts` |
| L-15 | `demo/styles/utils.css:132-154` · `demo/DESIGN.md:107-113` |
| L-16 | `demo/palettes/BrowsePane.vue:211-220` |
| L-17 | `demo/palettes/BrowsePane.vue:222-224` · `demo/color-picker/composables/usePaletteWiring.ts:129-162` · `demo/shell/viewSchema.ts:124-131` |
