# CHALLENGE-L — library structure · `demo/palettes/browser/search/SearchFilterBar.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. Declared, not inherited.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/search/SearchFilterBar.vue`, 249 lines, area `palettes`.

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, both of the same mechanism: **the component speaks a design-system
API that glass-ui 7.0.0 does not have.** `variant="ghost"` is not a prop of `Button`;
`:checked` / `@update:checked` are not the prop/emit of `Checkbox`. Both were measured live, not
inferred. The second one makes the **Tags filter completely inert** — the checkbox toggles
visually and never tells anyone.

Underneath that sits the real structural finding: **the five filters this one component emits
have four different owners**, one of them (`colour`) never reaches the wire at all and instead
re-implements, client-side over a single 50-row page, a matcher the API already ships
byte-for-byte.

---

## 1. The import trace — every edge, and where it lands

`SearchFilterBar.vue:127-145`:

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 128 | `vue` | `node_modules/vue` | ✔ |
| 129 | `../../../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` | shim layer — **L-9** |
| 130 | `../../../ui/input` | `demo/ui/input/index.ts` → `export { Input } from "@mkbabb/glass-ui/forms"` | shim layer — **L-9** |
| 131 | `../../../ui/popover` | → `@mkbabb/glass-ui` | shim layer |
| 132 | `./MiniColorPicker.vue` | sibling SFC, not in the `search/index.ts` barrel | **L-6**, **L-11** |
| 133 | `../../../ui/radio-group` | → `@mkbabb/glass-ui` | shim layer |
| 134 | `../../../ui/checkbox` | → `@mkbabb/glass-ui` | shim layer |
| 135-143 | `@lucide/vue` (7 icons) | `@lucide/vue@^1.16.0` | ✔ all seven used |
| 144 | `import type { Tag } from "../../types"` | `demo/palettes/types.ts` | ✔ `import type`, `verbatimModuleSyntax`-clean |
| 145 | `parseColorIn` from `../../../color-session/color-utils` | `demo/color-session/color-utils.ts` | ✔ correct layer |
| 236 (style) | `@reference "../../../styles/foundation.css"` | Tailwind-4 reference | ✔ matches the 18-site house idiom |

**No boundary is crossed the wrong way.** `palettes/` (feature) → `color-session/` (spine) →
`@mkbabb/value.js/{color,css}` (library) is the correct direction; nothing reaches up into
`demo/shell/` or `demo/color-picker/` (boot). No `@src/*` deep import. That half of the axis is
**sound** and I say so explicitly in §5.

The library reach is likewise correct, and I traced it to the resolver rather than assuming:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -B25 "value.js/css' was successfully"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … successfully resolved to '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

Self-name resolution through the repo's **own `package.json#exports`** — the exact edge a real
npm consumer traverses. `@mkbabb/value.js/color` resolves through the `paths` shortcut to the same
`dist/`. **This is a real proof of the public API, not a false one.** (One caveat: **L-10**.)

---

## 2. Findings

### L-1 · BLOCKER · The Tags filter is inert — `Checkbox` speaks a retired glass-ui API

`SearchFilterBar.vue:51-55`:

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

glass-ui 7.0.0's `Checkbox` has neither. Quoted spec,
`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts:4-12,19`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    …
}
…  "update:modelValue": (value: CheckedState) => any;
```

Measured against the shipped runtime, not the types:

```
$ node -e 'const m=await import("./node_modules/@mkbabb/glass-ui/dist/glass-ui.js"); …'
props: ["modelValue","defaultValue","disabled","value","id","class","asChild","as","name","required"]
emits: ["update:modelValue"]

$ grep -rl "update:checked" node_modules/@mkbabb/glass-ui/dist/
(no matches)
```

**Reproduction** (real mount, real click, real emit ledger). Probe at
`…/scratchpad/L-probe/cb.test.ts`, run with a scratch vitest config against the repo root:

```
$ npx vitest run --config …/vitest.probe.config.ts
EMITTED: ["update:modelValue"]
DOM: <button data-slot="checkbox" class="checkbox control-surface glass-control-edge focus-ring tap-squish"
     checked="false" role="checkbox" type="button" aria-checked="true" … data-state="checked">
 ✓ glass-ui Checkbox emit surface (SearchFilterBar.vue:51-55 seam) (1 test) 75ms
```

Read the DOM line: `checked="false"` landed as a **raw fallthrough HTML attribute** (it is not a
prop, so Vue passed it to the host element), and after one click `data-state="checked"` — the
control flipped its **own uncontrolled internal state** while `onUpdate:checked` was never called.

**The failure chain.** `modelValue` is never bound → the Checkbox is uncontrolled → it renders
*unchecked regardless of `selectedTags`*, ticks on click, and never emits anything
`SearchFilterBar` listens for. `toggleTag` (`:197-203`) is unreachable, therefore
`emit("update:selectedTags")` never fires, therefore `useDialogBrowseActions.onTagsChange`
(`demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:91-94`) never runs, therefore
`pm.selectedTags` stays `[]` and `currentFilterOpts()`
(`demo/palettes/useBrowsePalettes.ts:59`) never puts `tags` on the wire. The user ticks three tags,
the badge stays at 0 (`activeFilterCount` counts `selectedTags.length`, `:189-195`), and the wall
does not change. Then "Clear all filters" resets `pm.selectedTags` to `[]`
(`useDialogBrowseActions.ts:96-100`) while the uncontrolled checkboxes **stay ticked** — the UI
desynchronises permanently.

**Blast radius.** These are the demo's **only two** `Checkbox` call sites, and both are wrong:

```
$ grep -rn ":checked\|update:checked\|v-model:checked" demo/
demo/palettes/browser/search/TagEditPopover.vue:28  :checked="currentTags.includes(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:29  @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
demo/palettes/browser/search/SearchFilterBar.vue:52 :checked="selectedTags.includes(tag.name)"
demo/palettes/browser/search/SearchFilterBar.vue:53 @update:checked="toggleTag(tag.name)"
```

`TagEditPopover` is the *write* path — assigning tags to a palette. Same directory, same defect,
so tag **read** filtering and tag **write** are both dead. There is no correct usage anywhere in
the tree to have caught the drift by comparison.

**The gate does not see it.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`. Vue's
component typing admits unknown attributes as fallthrough and unknown `on*` handlers as native
listeners, so a prop/emit rename in the design system passes the demo typecheck silently. That
blindness is what let glass-ui 7 land (W44, "ADOPTED WHOLE") with this un-migrated.

**Cure.** `v-model`-shaped, controlled:
`<Checkbox :model-value="selectedTags.includes(tag.name)" @update:model-value="() => toggleTag(tag.name)" />`.
Same at `TagEditPopover.vue:27-30`. Then make the class of defect impossible — see L-2's cure.

---

### L-2 · BLOCKER · `variant="ghost"` is not a glass-ui 7 prop — 51 sites repo-wide

`SearchFilterBar.vue:5` and `:111-115` both pass `variant`. Quoted spec,
`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:3-9`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. */
    tone?: Tone;
```

There is no `variant`. `"ghost"`, `"outline"`, `"destructive"`, `"default"` are shadcn-era names;
glass-ui 7 replaced the single axis with orthogonal `emphasis` × `tone`.

**Reproduction — live DOM, dev server at :9000, `/#/browse`:**

```js
const btn = document.querySelector('button[aria-label="Filters"]');
→ {
  hasVariantAttr : "ghost",                 // landed as a raw DOM attribute
  dataEmphasis   : "secondary",             // glass-ui's DEFAULT, not ghost
  dataTone       : "neutral",
  bg             : "oklab(0.915626 0.00551148 0.0130686 / 0.52)",   // a filled wash
  class          : "button tap-squish focus-ring glass-wash glass-capsule …",
  size           : "32x40"
}
```

`data-emphasis="secondary"` is glass-ui's default
(`Button.props.emphasis.default === "secondary"`, measured from the bundle). The authored
`ghost` intent is discarded; the button renders `glass-wash` — a translucent **fill**.

**This is visible in the shipped screenshots.** In
`audit/visual/shots/safari-desktop-light/browse.png` the `⋮` trigger is a filled light chip inside
the search pill, not a bare ghost glyph; in the same frame BrowsePane's "Retry"
(`BrowsePane.vue:69-76`, `variant="outline"`) renders as a **solid filled pill** with no outline.
`safari-mobile-light/browse.png` shows the same filled chip. The design intent of every one of
these buttons is silently gone.

**Blast radius, measured:**

```
$ perl -0777 -ne 'while(/<Button\b([^>]*?)>/gs){ print "$1\n" if $1=~/variant="/ }' $(grep -rl "<Button" demo/) | wc -l
51
   28 outline
   19 ghost
    2 primary-audacious
    1 destructive
    1 default
```

51 sites across 20 files (`AdminUsersPanel` 5, `AdminNamesPanel` 5, `AdminFlaggedPanel` 4,
`GenerateControls` 3, `ProfileSection` 3, `MigratePalettesDialog` 3, `CurrentPaletteEditor` 3,
`AdminTagsPanel` 3, … `SearchFilterBar` 2, `MiniColorPicker` 1). `primary-audacious` is not even a
shadcn name — it is a third vocabulary. **Every glass-ui Button in the demo renders
`secondary`/`neutral`.**

**Why the per-instance overrides exist.** The measured geometry is `32x40`: the authored
`class="relative h-8 w-8"` (`:5`) won the width (32) and **lost the height** (40) to glass-ui's own
`data-size="md"` rule. That is edict 5 (root-level styling) violated *and* half-failing. The
override is there precisely because the real axis (`size="sm"`, `emphasis="quiet"`) was never
reached for.

**Cure.** Migrate the axis, do not add a compat map (edict 2 forbids the shim):
`ghost → emphasis="quiet"`, `outline → emphasis="secondary"`, `default → emphasis="primary"`,
`destructive → emphasis="primary" tone="danger"`. Then delete the per-instance
`h-8 w-8` / `h-7 w-full` overrides in favour of `size`. **And close the gate**: glass-ui should
declare its SFC props under `defineOptions({ inheritAttrs: false })` where a prop rename is
semantic, or the demo's eslint should carry a `vue/no-undef-properties`-class rule for glass-ui
components — because vue-tsc exits 0 on all 51 of these today.

---

### L-3 · MAJOR · The colour filter is the one filter that never reaches the wire, and it re-implements the server's own matcher

`SearchFilterBar` emits `colorSearch: [L, a, b]` (`:159`). `BrowsePane` catches it into pane-local
state and filters the already-loaded page:

```ts
// demo/palettes/BrowsePane.vue:336-349
const colorSearchParams = ref<{ L: number; a: number; b: number } | null>(null);
const displayedBrowse = computed(() => {
    const palettes = pm.filteredBrowse.value;
    if (!colorSearchParams.value) return palettes;
    const { L, a, b } = colorSearchParams.value;
    const radius = 0.15;
    return palettes.filter((p: any) => {
        const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
    });
});
```

The API already ships this exact function —
`api/src/modules/palette/service/crud-list.ts:159-180`:

```ts
function colorMatcherFor(query: ListQuery): ((p: WithId<Palette>) => boolean) | null {
    …
    const radius = query.colorRadius ?? 0.15;
    return (p) => {
        const oklabColors: OklabTriple[] = p.oklabColors;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => {
            const dL = c.L - tL; const da = c.a - tA; const db = c.b - tB;
            return Math.sqrt(dL * dL + da * da + db * db) <= radius;
        });
    };
}
```

Same predicate, same `0.15` default, same empty-array rule, same `.some()`. Two homes, one
concept. And the transport for it is **already built and already wired** —
`demo/palettes/api/palettes.ts:27-31` declares `colorL/colorA/colorB/colorRadius` on
`ListPalettesOptions` and `:50-53` serialises them; `api/src/modules/palette/schema.ts:89-92`
validates them.

**Nobody ever sets them.** `useBrowsePalettes.currentFilterOpts()` (`:52-60`) puts `limit`, `sort`,
`q`, `tier`, `tags` on the query and stops. `grep -rn "colorL" demo/` returns exactly two hits:
the type declaration and the serialiser. The wire param is dead plumbing.

**Consequence.** The colour filter searches only the loaded page. `BROWSE_PAGE_SIZE = 50`
(`useBrowsePalettes.ts:19`). A palette on keyset page 2 that matches the picked colour is
invisible, and the wall reads "no results" for a commons that contains them. The comment at
`BrowsePane.vue:353-354` — *"API also supports server-side …, but client-side is instant"* — is the
whole defect written down: an optimisation note that became the only implementation.

**Cure.** Delete `colorSearchParams` and `displayedBrowse`. Put `color: {L,a,b,radius} | null` in
the filter state next to `tier`/`tags`, add three lines to `currentFilterOpts()`, and let
`crud-list.ts` be the single home for OKLab distance. One matcher, on the server, over the whole
commons. `Math.hypot` disappears from the demo entirely.

---

### L-4 · MAJOR · Five filters, four owners — the search feature's handlers live in the *dialog* feature

`SearchFilterBar` is *the* filter surface. Trace where each of its five signals actually lands:

| signal | handler | home | scope |
|---|---|---|---|
| `update:sort` | `pm.onSortChange` | `demo/palettes/useBrowsePalettes.ts:116` | server |
| `update:tier` | `onTierChange` | `demo/palettes/browser/**dialog**/composables/useDialogBrowseActions.ts` | server |
| `update:selectedTags` | `onTagsChange` | `…/**dialog**/composables/useDialogBrowseActions.ts:91` | server (dead, L-1) |
| `clearFilters` | `onClearFilters` | `…/**dialog**/composables/useDialogBrowseActions.ts:96` | server |
| `colorSearch` | `onColorSearch` | `demo/palettes/BrowsePane.vue:351` | pane-local, client (L-3) |
| *(text, via `SearchBar`)* | `pm.searchQuery` | `useBrowsePalettes.ts:43` **and** `:57` | **both** (L-7) |

Three of the six are homed in `browser/dialog/composables/useDialogBrowseActions.ts` — the
**dialog** sub-feature. Browse filters are not dialogs. `BrowsePane.vue:255-265` imports them from
`./browser/dialog` to make the search bar work. The file's own header
(`useDialogBrowseActions.ts:17-18`) documents the mismatch without noticing it: *"Browse filter
handlers (`onTierChange` / `onTagsChange` / `onClearFilters`): mutate `pm.tierFilter` /
`pm.selectedTags` and reload."*

The active-count is split the same way. `activeFilterCount` (`SearchFilterBar.vue:189-195`) reads
`tier` and `selectedTags` from **props** but `colorSearchActive` from a **local ref** (`:171`),
because the colour filter's truth lives nowhere shared. So the child owns one fifth of the filter
state, the parent owns another fifth, and `useBrowsePalettes` owns the rest. `onClearAll`
(`:227-232`) has to fire **two** events to reset one concept.

There is no `useBrowseQuery`. `useBrowsePalettes` is a 240-line module holding filter state *and*
keyset pagination *and* vote/rename/delete/publish CRUD — a god module by the standard the owner
edicts name, and the reason the filter concept had nowhere clean to land.

---

### L-5 · MAJOR · A hand-rolled hex regex sits in front of the full CSS parser and silently substitutes a different colour

`SearchFilterBar.vue:213-225`:

```ts
const text = colorText.value.trim();
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
const lab = hexToOklab(hex);
```

`hexToOklab` (`:205-211`) calls `parseColorIn(hex, "oklab")` — the **full CSS Color Level 4
parser**, reached one line later. The regex in front of it accepts exactly one of the five forms
the parser handles:

```
$ node --input-type=module -e 'import {parseCssColor} …; import {convertColor} …'
hsl(210 60% 50%)                   oklab 0.5883 -0.0443 -0.1319
oklch(0.7 0.15 250)                oklab 0.7000 -0.0513 -0.1410
rebeccapurple                      oklab 0.4403 0.0882 -0.1339
#48c                               oklab 0.6136 -0.0415 -0.1175
color(display-p3 0.2 0.4 0.8)      oklab 0.5340 -0.0363 -0.1775
```

All five parse. The regex rejects four of them — including **3-digit hex**, and including
`hsl(...)`, which the field's own placeholder advertises: `placeholder="#hex, hsl(...)"`
(`:92`).

**And the rejection is silent and wrong.** It does not error, it does not clear — it falls back to
`pickerHex.value` and emits a `colorSearch` for **the swatch colour instead of the typed colour**.

**Reproduction:** type `rebeccapurple` into the Find-by-Colour field, press Search. The wall filters
by `#4488cc` (the `pickerHex` default, `:170`) — a blue. No message, no visual difference from a
successful search; `colorSearchActive` even goes true and the badge increments.

The dead half of the same function makes the intent unmistakable. `hexToOklab:207-209` throws
`"Hex color produced missing OKLab channels"` if any channel is `"none"` — but `"none"` can only
arise from a literal `none` keyword in the source, and the regex guarantees the input is a 6-digit
hex. **The guard defends the impossible while the possible failure is silenced.**

**Cure.** Delete the regex. `parseColorIn(text, "oklab")` inside a `try`, and surface
`PickerColorError` as field-invalid state (glass-ui's `Input` already has an `invalid` prop —
measured in its props list). The library is a total parser; stop putting a partial one in front of
it.

---

### L-6 · MAJOR · One component, two colour engines

`SearchFilterBar` reaches the library for colour (`:145`, `:206`). Its only non-primitive child —
`MiniColorPicker.vue`, imported at `:132` and rendered at `:66-81` — reaches for nothing:

```
$ grep -n "^import" demo/palettes/browser/search/MiniColorPicker.vue
import { ref, computed, watch, useTemplateRef } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Button } from "../../../ui/button";
```

`MiniColorPicker.vue:88-114` is a hand-written HSV→RGB sextant switch plus a `toHex` padder;
`:118-134` is the RGB→HSV inverse, carrying its own hue-preservation hack
(`:126  if (d === 0) return; // keep existing hue`). This is inside the demo of a colour library
whose `@mkbabb/value.js/color` subpath publishes `hsv`, `rgb`, `convertColor`, `toRgba8`
(`src/subpaths/color.ts`), and whose demo spine `demo/color-session/picker-color.ts:56` already
declares HSV channel metadata.

The hue-drift hack is the tell: MEMORY records **"HSV hue drift — oklch→HSV roundtrip loses hue at
low chroma (`Math.atan2(0,0)=0`); `stableHue` ref in `useColorModel` is the source of truth"**.
That lesson was learned once, at library level, and then re-learned badly at `:126`.

**The seam this creates inside SearchFilterBar.** One user-visible concept — "the colour I am
searching for" — has two producers. Typing goes through `parseCssColor` (library). Dragging the SV
canvas goes through the sextant switch. They meet in `pickerHex`/`colorText` via a
`watch(currentHex) → emit → prop → watch(hex) → recompute` round trip
(`MiniColorPicker.vue:116,118`, `SearchFilterBar.vue:175-178`) that only settles because hex→HSV→hex
happens to be a fixed point.

(Recorded independently as L-14 in `../BrowsePane/challenge-L-library.md:54`; I raise the severity
because the duplication is *inside* the subject component's own subtree, not merely nearby.)

**Cure.** Delete both conversion blocks. `convertPickerColor(color, "hsv")` and
`colorToCss(color)` from `demo/color-session/` do all of it, and the SV canvas becomes a thin
`h/s/v` view over one `AnyColor`.

---

### L-7 · MAJOR · Text search runs two incompatible matchers in series

Not `SearchFilterBar`'s own markup — it is the field `SearchFilterBar` is slotted into
(`BrowsePane.vue:10-27`) — but it is the same seam and the same ownership defect, so it belongs in
this report.

Server (`api/src/modules/palette/service/crud-list.ts:95-96`):

```ts
const q = query.q?.trim();
if (q) f.$text = { $search: q };          // MongoDB $text — stemmed, whole-word, index-driven
```

Client (`demo/palettes/useBrowsePalettes.ts:43-45`):

```ts
const filteredBrowse = useFilteredList(remotePalettes, deps.searchQuery, (p, q) =>
    p.name.toLowerCase().includes(q) || p.slug.includes(q),   // substring
);
```

Gate (`useBrowsePalettes.ts:57`): `...(q.length >= 2 ? { q } : {})`.

**Three regimes for one field.** 0 chars → no filter either side. 1 char → client substring only.
≥2 chars → server `$text` **then** client substring over its result.

**Reproduction:** search `blu`. `$text` tokenises and stems; there is no whole-word token `blu`, so
the server returns nothing and the wall is empty even though "Blue Ridge" is published. Search
`ocean sunset`: `$text` OR-matches both terms and returns rows; the client then requires the
literal contiguous string `"ocean sunset"` in `name` or `slug` and discards nearly all of them.

**Cure.** One matcher. The API has the index; delete `filteredBrowse` from the browse path and
lower the `q` gate to 1. `useFilteredList` stays for `PalettesPane`'s genuinely local list.

---

### L-8 · MINOR · The `Channel = number | "none"` guard has four divergent homes

`SearchFilterBar.vue:205-211` writes one:

```ts
const [L, a, b] = parseColorIn(hex, "oklab").channels;
if (L === "none" || a === "none" || b === "none") throw new Error("Hex color produced missing OKLab channels");
```

Three other demo sites write three other disciplines for the same library type:

| site | discipline |
|---|---|
| `SearchFilterBar.vue:207` | **throw** (ad-hoc message) |
| `demo/color-session/useContrastSafeColor.ts:127-128` | **return null** |
| `demo/scenes/about/markdown/composables/useMarkdownColors.ts:39-42,52` | **throw** on `L`/`C`, **coerce `H → 0`** |
| `demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:39-41` | **pass `"none"` through** as display text |

The library forces every consumer to invent a policy and none of them agree. `src/subpaths/color.ts`
exports `Channel` but no projection off it.

**Cure — library side.** Publish the projection from `@mkbabb/value.js/color`:
`resolveChannels(color): Result<readonly [number, number, number], ColorIssue>`. One home, one
policy, four call sites collapse. (Pairs naturally with the L-3 cure: the library should also own
`deltaE(a, b)` — `grep -rn "deltaE\|colorDistance" src/` returns **zero** hits in a colour library
whose demo and API each hand-roll OKLab Euclidean distance.)

---

### L-9 · MINOR · `demo/ui/` is a 19-file, 20-line alias layer, and 24 files bypass it in the same breath

Every barrel SearchFilterBar imports is a single re-export line:

```
demo/ui/button/index.ts        export { Button } from "@mkbabb/glass-ui";
demo/ui/input/index.ts         export { Input } from "@mkbabb/glass-ui/forms";
demo/ui/popover/index.ts       export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
demo/ui/radio-group/index.ts   export { RadioGroup, RadioGroupItem } from "@mkbabb/glass-ui";
demo/ui/checkbox/index.ts      export { Checkbox } from "@mkbabb/glass-ui";
```

```
$ find demo/ui -name "*.ts" | wc -l                                    19
$ cat demo/ui/*/index.ts | grep -v '^\s*//\|^\s*\*\|^\s*/\*\|^\s*$' | wc -l   20
```

19 directories, 19 files, **20 lines of substance**. Edict 2 names exactly this shape ("no
aliases, migration shims, dual paths"). `demo/DESIGN.md:384` defends it — *"The barrel exists for
ergonomics; the implementation is upstream"* — while citing `@components/ui/alert`, a path alias
**W43/RF-15 deleted** (`grep -rn '"@components/' demo/ src/` → 0 hits). The doc defends the layer
in a spelling that no longer resolves.

I tested the "dual path" hypothesis and it is **refuted for these five symbols**: `Button` 22
files via the shim / 0 direct; `Input` 4/0; `Popover` 5/0; `Checkbox` 2/0; `RadioGroup` 2/0. The
barrels are used consistently for what they cover. The defect is the *arbitrary coverage line*:

```
$ for f in $(grep -rl "@mkbabb/glass-ui" demo/ | grep -v '^demo/ui/'); do grep -q 'from "\.\..*ui/[a-z-]*"' $f && echo $f; done | wc -l
24
```

**24 files reach glass-ui through the shim and directly, in the same file.** `BrowsePane.vue` is
one: `Card` from `../ui/card` (`:180`) and `SearchBar` from `@mkbabb/glass-ui/search` (`:194`).
Two idioms, one design system, one file. The barrel also **hides which subpath a symbol lives on**
— an author reading `SearchFilterBar.vue:129-134` cannot tell that `Input` is on
`@mkbabb/glass-ui/forms` while the other four are on the root.

**Cure.** Delete `demo/ui/` (19 files, −20 lines) and import glass-ui by its real specifier. Zero
behaviour change, one idiom, and the subpath becomes legible at the import site.

---

### L-10 · MINOR · `tsconfig.demo.json` `paths` names three specifiers the package does not export and omits two it does

```
$ node -p "Object.keys(require('./package.json').exports).join(' ')"
./color ./value ./css ./easing ./math ./transform ./quantize            (7 keys, NO root ".")

$ node -e '…tsconfig.demo.json…'
@mkbabb/value.js  @mkbabb/value.js/color  /parsing  /math  /easing  /units  /transform  /quantize
```

| `paths` key | in `exports`? | substitution target exists? |
|---|---|---|
| `@mkbabb/value.js` (bare root) | **no** | `dist/index.d.ts` — **absent** (`ls dist/` → `subpaths/` + 3 chunks) |
| `@mkbabb/value.js/parsing` | **no** | `dist/subpaths/parsing.d.ts` — **absent** |
| `@mkbabb/value.js/units` | **no** | `dist/subpaths/units.d.ts` — **absent** |
| `@mkbabb/value.js/css` | yes | **not listed** — works only via self-name resolution |
| `@mkbabb/value.js/value` | yes | **not listed** |

The file's own header asserts *"the bare `.` root + the 7 subpath barrels … a CLOSED 8-key set"*
and enumerates `{color,parsing,math,easing,units,transform,quantize}`. Five of the ten distinct
names in play are wrong: three phantoms, two omissions. `vite.config.ts:41-50` **generates** its
alias set from `package.json#exports` precisely so it "can never drift from the exports map" — and
then `tsconfig.demo.json` hand-maintains a second, drifted copy beside it.

**Live consequence is small but real.** A demo author who writes
`import { … } from "@mkbabb/value.js"` gets a `paths` entry that says the specifier is legal;
Vite's generated alias set has no entry for it (there is no `.` export), so it falls through to
`node_modules/@mkbabb/value.js@4.0.0`, whose `exports` map has no `.` either →
`ERR_PACKAGE_PATH_NOT_EXPORTED` at build. The demo currently has **zero** such imports
(`grep -rn '"@mkbabb/value.js"' demo/` → one prose mention in `demo/shared/utils.ts:12`), so this is
a latent trap, not a live break — but it is a **false public surface** advertised to demo authors
by the very config whose job is to be the trust boundary.

**Cure.** Delete the six `@mkbabb/value.js*` `paths` entries entirely. The `/css` trace above
proves TypeScript already resolves the whole map through Node self-name resolution, honouring
`exports` exactly as a real consumer would — which is strictly *more* faithful than the `paths`
shortcut. Removing them makes the demo typecheck the published surface, and drift becomes
impossible rather than merely discouraged.

*(Aside, INFO: the locally-built `dist/subpaths/css.d.ts` is 382 lines vs the published 4.0.0
tarball's 350, because the local build re-declares the core type graph per subpath —
`Alpha_2`, `Channel_2`, `SpaceId_2`, `ChannelsBySpace_2`, `Color_2`. `AnyColor` from `/color` and
`CssColor` from `/css` are therefore two nominally distinct declarations that typecheck only by
structural identity. `demo/color-session/picker-color.ts:110-118` — the module directly under
`SearchFilterBar`'s `parseColorIn` — passes values across exactly that seam. Worth a subpath
bundling fix in the library, out of scope for this seat.)*

---

### L-11 · MINOR · The "hardened seam" is documented, not enforced — three eslint globs point at deleted directories

`demo/palettes/browser/index.ts:1-18` states: *"External consumers reach the feature through THIS
seam … never a raw internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces it
standing."*

It does not.

```
$ for g in demo/color-picker demo/@/components demo/@/lib demo/@/composables; do
    printf "%-24s %s\n" "$g" "$([ -d $g ] && echo EXISTS || echo MISSING)"; done
demo/color-picker        EXISTS
demo/@/components        MISSING
demo/@/lib               MISSING
demo/@/composables       MISSING

$ grep -rn '"@components/' demo/ src/ | wc -l
0
```

`eslint.config.js:230-256` scopes G-DEMO-3b to four `files` globs, **three of which are deleted
trees** (W43/RF-15 killed `demo/@` and every `@…` alias), and bans the group
`@components/custom/palette-browser/**/*.vue` — a specifier that cannot occur, since the alias no
longer exists and the feature moved to `demo/palettes/browser/`. G-DEMO-1 and G-DEMO-3a
(`:257-303`) are scoped entirely to `demo/@/composables/**` and are therefore **inert**.
`demo/palettes/**` — where the mega-feature actually lives — is in **no** rule's scope.

Honest counter-evidence: the convention is currently *held*.
`grep -rn 'from "[^"]*browser/[a-z]*/[A-Z][A-Za-z]*\.vue"' demo/` returns nothing — no external
raw-`.vue` reach exists today. It holds by discipline, with the guardrail disconnected.

Secondary: `browser/search/index.ts` calls itself a *"hardened public surface (T.W1 F7)"* and
exports `SearchFilterBar` / `UserSortMenu` / `TagEditPopover`. `MiniColorPicker` is deliberately
absent — correct, it is internal — but nothing enforces that either.

**Cure.** Re-point the three globs at the real trees (`demo/palettes/**`, `demo/picker/**`,
`demo/shell/**`, `demo/workbenches/**`, `demo/scenes/**`) and re-express the ban as a relative-path
group (`**/palettes/browser/*/*.vue`), or delete the rules and stop claiming enforcement in the
barrel headers. A rule whose glob does not exist is worse than no rule: it reads as green.

---

### L-12 · INFO · Vestigial root wrapper

`SearchFilterBar.vue:2` `<div class="flex items-center gap-1.5">` wraps exactly one child (the
`<Popover>`, `:3-123`). A flex container with `gap` and one item is a no-op; it also blocks
attribute fallthrough to the trigger. It is the residue of a "bar" that once had several controls —
the component is now a single popover trigger and its name no longer describes it. In the greenfield
lattice below it becomes `<FilterMenu>`, root = the Popover.

---

## 3. Out-of-chain suspects — checked, reported honestly

The brief named three historical suspects. None is reachable from `SearchFilterBar`; I verified
rather than assumed, and record the state so the seat's negative is real.

- **`demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers`** — the dual home is
  **live**: a file `demo/palettes/export.ts` (132 lines) *and* a directory `demo/palettes/export/`
  (12 modules incl. `serializers.ts`) coexist; `./export` resolves to the file, so `export/` is
  reachable only by explicit deep path. `usePaletteExport.ts` (27 lines) is a `switch` over five
  formats that adds nothing but a `try/catch`. **Not in this component's chain** — `BrowsePane.vue:196`
  imports it, `SearchFilterBar` does not. Belongs to the `CurrentPaletteEditor` / `PaletteCard` seats.
- **Three parallel `useDark` stores** — confirmed present and self-documented at
  `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76` ("one of three parallel dark
  stores") and `useMarkdownColors.ts:16` ("parallel stores raced the initial scheme resolution").
  `SearchFilterBar` touches no dark-mode store. Out of chain.
- **`ActionBarLayer`'s local `useLayerTransition` reimplementation** — out of chain; `SearchFilterBar`
  has no transition logic at all.

---

## 4. The greenfield lattice

If I were structuring this today with no legacy, concretely:

```
src/  (the published library, 7 subpaths — unchanged shape)
  color/ …
    + deltaE(a: AnyColor, b: AnyColor): number            ← ONE home for colour distance
                                                            (kills BrowsePane's Math.hypot AND
                                                             crud-list.ts's Math.sqrt duplicate)
    + resolveChannels(c): Result<[number,number,number]>  ← ONE home for the "none" policy
                                                            (kills 4 divergent guards, L-8)

demo/color-session/                    the demo's ONLY colour engine — already correct, keep
  picker-color.ts                      parse · convert · serialize · gamut
  color-utils.ts                       parseColorIn / colorToCss / colorToRgb255

demo/palettes/browse/                  ← the browse feature, one directory
  useBrowseQuery.ts        NEW · the ONE home for the whole query object:
                             { text, sort, tier, tags, color: AnyColor | null, radius }
                             + toListOptions(): ListPalettesOptions   (all five on the wire)
                             + activeCount: ComputedRef<number>       (one derivation, one place)
                             + clear()                                (ONE event, not two)
  useBrowsePage.ts          keyset paging + fetch ONLY  (was useBrowsePalettes, −filters −CRUD)
  usePaletteMutations.ts    vote · rename · delete · visibility · fork  (lifted out of the god module)
  BrowsePane.vue            renders `page.items` directly — no displayedBrowse, no client filter
  FilterMenu.vue            was SearchFilterBar: root = Popover, `v-model:query`, ZERO local state
  ColorField.vue            was MiniColorPicker: an h/s/v view over one AnyColor,
                            every conversion from color-session — no sextant switch

demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts   DELETED
                            filter half → useBrowseQuery · fork half → usePaletteMutations

demo/ui/                    DELETED (19 files, 20 lines). Import `@mkbabb/glass-ui` and
                            `@mkbabb/glass-ui/forms` at the point of use.

@mkbabb/glass-ui (upstream, edict 4)
  SearchBar                 + a NAMED `#filters` slot with reserved inline-end space
                            (today: an anonymous `default` slot with `{}` scope —
                             SearchBar.vue.d.ts:14-16 — which is why the mobile placeholder
                             clips to "Search the common", DEFECT-LEDGER:2571)
  Button                    the `variant` → `emphasis`/`tone` migration is the CONSUMER's job;
                            glass-ui's part is to make the drift loud, not silent
```

**Why this is the right transposition, not a reshuffle.**

1. *One query object* collapses L-3, L-4 and half of L-1's blast radius at a stroke. Five filters
   with one owner, one serialiser, one `activeCount`, one `clear()`. The double-fired clear
   (`SearchFilterBar.vue:227-232` → two events → `BrowsePane.vue:328-332` + `:357-359`) becomes
   arithmetically impossible.
2. *The filter goes on the wire.* The commons is searched, not the page. `Math.hypot` leaves the
   demo; `colorMatcherFor` becomes the single home; `colorL/colorA/colorB` stop being dead plumbing.
3. *`FilterMenu` becomes stateless.* `colorText`, `pickerHex`, `colorSearchActive`, `miniPickerOpen`,
   `searching` (`:169-173`) are five refs that exist only because the component owns state it
   should be shown. A stateless popover over `v-model:query` cannot desynchronise from the wall —
   which is precisely the L-1 failure mode, cured structurally rather than by fixing one prop name.
4. *One colour engine.* Every hex/HSV/OKLab conversion in the browse feature routes through
   `color-session/`, which routes through `@mkbabb/value.js`. A colour library's demo should be its
   loudest dogfood; today its filter bar contains a hand-written sextant switch.
5. *Deleting `demo/ui/`* removes an indirection whose only measurable effect is hiding which
   glass-ui subpath a symbol lives on.

---

## 5. Negative results — what I checked and found sound

Stated explicitly so the absence of a finding is evidence, not silence.

- **No wrong-direction edge.** Every one of the 11 import specifiers in
  `SearchFilterBar.vue:127-145` resolves within or below its own layer. Nothing reaches into
  `demo/shell/`, `demo/color-picker/` (boot), or `src/` internals. `feature → spine → library` holds.
- **The library reach is honest.** Traced with `tsc --traceResolution`:
  `@mkbabb/value.js/css` resolves through the repo's own `package.json#exports` self-name
  resolution — the same edge an npm consumer traverses. This is a **true** proof of the public API.
  My "stale self-installed tarball" hypothesis was **refuted**: the resolver never reaches
  `node_modules/@mkbabb/value.js`.
- **`verbatimModuleSyntax` clean.** `import type { Tag }` at `:144` is the only type-only import
  and it is correctly marked. All seven `@lucide/vue` icons are used as values.
- **Vue 3.5 idioms correct.** Reactive props destructure at `:147`; `useTemplateRef` in the sibling
  `MiniColorPicker.vue:98-99`. No `defineModel` stale-read hazard (no `defineModel` here).
- **Tokens all resolve.** My "dead CSS token" hypothesis was **refuted** by live measurement:
  `--type-small` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)`, `--leading-small` = `1.4`,
  `--radius-md` = `6px`, `--duration-fast` = `0.2s`, `--ease-standard` = `cubic-bezier(.4,0,.2,1)`,
  `--font-serif` = `"Plus Jakarta Sans"…`, `--accent` = `light-dark(hsl(33 30% 82%), …)`. The scoped
  block at `:238-248` is live.
- **Every other glass-ui prop is correct.** Measured props/emits vs authored markup:
  `Popover(open,…/update:open)` ✔, `PopoverTrigger(asChild)` ✔, `PopoverContent(align,class)` ✔,
  `RadioGroup(modelValue/update:modelValue)` ✔, `RadioGroupItem(value,class)` ✔,
  `Input(modelValue,type,size,placeholder,class)` ✔, `Button(iconOnly)` ✔. Only `variant` (L-2) and
  `Checkbox`'s `checked` (L-1) are wrong.
- **`@reference` idiom correct.** `:236` matches all 18 house sites; no redundant
  `foundation.css`/`utils.css` runtime import (the `Markdown.vue:37-38` defect is absent here).
- **Animations intact.** No keyframe deleted; the one transition (`:246`) is tokenised
  (`var(--duration-fast) var(--ease-standard)`), per edict 6.
- **Tap targets pass.** `REPORT.json` `safari-desktop-light /#/browse` lists four
  `smallTapTargets` — an unlabelled 160×23 `input` and three 22×22 slug-bar buttons. The `⋮`
  trigger measures 32×40 live and is **not** among them. (Its 32×40 asymmetry is L-2's override
  evidence, not an a11y defect.)
- **No console/page errors from this component.** All four browse captures report
  `consoleErrors: []`, `pageErrors: []`; the single warning is
  `"Failed to load remote palettes: SyntaxError…"` — the API being unreachable in the capture
  environment, unrelated to `SearchFilterBar`.

---

## 6. Ledger

| id | sev | defect | anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | Tags filter inert — `:checked`/`@update:checked` are not glass-ui 7's Checkbox API; uncontrolled control desyncs permanently | `SearchFilterBar.vue:51-55` · `TagEditPopover.vue:27-30` |
| L-2 | **BLOCKER** | `variant="ghost"` is not a Button prop — `data-emphasis="secondary"` measured live; 51 sites / 20 files repo-wide | `SearchFilterBar.vue:5,111` · `Button.vue.d.ts:3-9` |
| L-3 | MAJOR | colour filter never reaches the wire; duplicates `colorMatcherFor` client-side over 1 page of 50 | `BrowsePane.vue:339-349` · `crud-list.ts:159-180` |
| L-4 | MAJOR | five filters, four owners; browse-filter handlers homed in the **dialog** feature | `useDialogBrowseActions.ts:91-100` · `useBrowsePalettes.ts:40-60` |
| L-5 | MAJOR | `^#[0-9a-f]{6}$` gate in front of the full CSS L4 parser; silent substitution of `pickerHex` | `SearchFilterBar.vue:218` |
| L-6 | MAJOR | two colour engines in one component — hand-rolled HSV↔hex beside `parseColorIn` | `MiniColorPicker.vue:88-134` |
| L-7 | MAJOR | text search = `$text` (server) ∘ substring (client), three regimes | `crud-list.ts:95-96` · `useBrowsePalettes.ts:43-45,57` |
| L-8 | MINOR | `Channel = number \| "none"` guard has four divergent homes; library owns no projection | `SearchFilterBar.vue:207` +3 |
| L-9 | MINOR | `demo/ui/` = 19 files / 20 lines of pure re-export; 24 files mix it with direct glass-ui | `demo/ui/*/index.ts` · `DESIGN.md:384` |
| L-10 | MINOR | `tsconfig.demo.json` `paths` ≠ `package.json#exports`: 3 phantom keys, 2 omissions, header wrong | `tsconfig.demo.json:38-50` |
| L-11 | MINOR | G-DEMO-1/3a/3b inert — 3 of 4 globs are deleted trees, banned specifier cannot occur | `eslint.config.js:230-303` · `browser/index.ts:1-18` |
| L-12 | INFO | vestigial single-child flex root; component name no longer describes it | `SearchFilterBar.vue:2` |

**Strongest defect: L-1.** The Tags filter is visibly interactive and functionally dead, it fails
silently in both directions (never applies, never resets), the same break sits on the tag *write*
path in the sibling file, these are the demo's only two `Checkbox` usages so there is no correct
example to have caught it, and `vue-tsc` exits **0**.
