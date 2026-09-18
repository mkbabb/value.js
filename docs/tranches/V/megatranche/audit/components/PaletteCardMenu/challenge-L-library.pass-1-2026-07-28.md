# CHALLENGE-L — library structure under `PaletteCardMenu.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), matching the explicit
declaration this seat was spawned with. Seat is DECLARED, not inherited. No defect on the receipt axis.

## Scope + substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD is `32b4040e`, not the `c654824e` named in the commission.**
  `git log --oneline -1` → `32b4040e docs(V·mega): r3 DELTA COMPLETE — 3 apotheoses merged in place;
  scenes promoted from queue`. All file:line citations below are against `32b4040e`.
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue`, 228 lines.

**Verdict: DEFECTIVE.** One BLOCKER (a live dual export path where the shipping implementation is the
legacy one and the 914-line contract implementation is test-only), four MAJORs, four MINORs.

---

## 0. The import cone, traced to its home

Every import in `PaletteCardMenu.vue:176-204`, resolved:

| # | Specifier (`:line`) | Physical home | Crosses | Verdict |
|---|---|---|---|---|
| 1 | `vue` (`:176`) | `node_modules/vue` | — | clean |
| 2 | `../../../types` (`:177`) | `demo/palettes/types.ts` | leaf → feature root, 3 levels, **no seam exists** | see L-6 |
| 3 | `../../../utils` (`:178`) | `demo/palettes/utils.ts` | leaf → feature root, 3 levels, **no seam exists** | see L-6 |
| 4 | `../../../../platform/transport/useApiClient` (`:179`) | `demo/platform/transport/useApiClient.ts` | **feature → platform**, 4 levels, **raw file, no barrel** | see L-6 |
| 5 | `../../../../ui/dropdown-menu` (`:180-190`) | `demo/ui/dropdown-menu/index.ts` → `@mkbabb/glass-ui` **bare root** | feature → demo/ui alias layer → glass-ui | **L-4** |
| 6 | `@lucide/vue` (`:191-204`) | devDependency | — | clean |

`verbatimModuleSyntax` (edict 8): **compliant** — `:177` and `:178` are `import type`; `:176`, `:179`,
`:180`, `:191` are all value imports. No violation.

`@mkbabb/value.js` reach: **this component imports nothing from value.js, directly or through
`demo/palettes/*`.** `demo/palettes/types.ts` is pure interfaces with zero imports;
`demo/palettes/utils.ts` imports only `type { Palette } from "./types"`. Its only transitive reach into
value.js is through glass-ui's own dist, which uses correct published subpaths:

```
$ grep -ho 'from"@mkbabb/value\.js[^"]*"' node_modules/@mkbabb/glass-ui/dist/*.js | sort -u
from "@mkbabb/value.js/color"
from "@mkbabb/value.js/css"
from "@mkbabb/value.js/easing"
```

All three are live keys in `package.json#exports`. **No deep-path forgery of the public API on this
component's edge.** The public-surface defect that does exist is one level up, at the tsconfig — L-5.

---

## L-1 — BLOCKER — the five Export items ship the LEGACY serializers; the 914-line byte-exact contract set has zero production consumers

`PaletteCardMenu.vue:107-130` renders the Export sub-menu — JSON, CSS Custom Properties, Tailwind
Config, SVG Swatch, PNG Swatch. Those five items are the entire user-facing entry point to palette
export. Traced, statically, end to end:

```
PaletteCardMenu.vue:113   @select="() => $emit('action', 'exportJSON')"
  → PaletteCard.vue:88    @action="handleMenuAction"
  → PaletteCard.vue:307   exportJSON: () => emit("export", props.palette, "json")
  → BrowsePane.vue:115    @export="(p, fmt) => onExport(p, fmt)"      (and PalettesPane.vue:96)
  → BrowsePane.vue:324    const { onExport } = usePaletteExport()     (and PalettesPane.vue:211)
  → usePaletteExport.ts:9 import { exportAsJSON, … } from "./export"  ← demo/palettes/export.ts
```

`demo/palettes/export.ts` (132 lines) is the legacy pre-contract implementation.
`demo/palettes/export/` (12 files, **914 lines**) is the V.W51 byte-exact contract set whose byte
authority is `docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51.

**The contract set has exactly one consumer in the entire repository, and it is a test:**

```
$ grep -rn "export/serializers\|export/json\|export/css\|export/tailwind\|export/svg\|export/png\
|export/reload\|export/digest\|export/canonical" demo/ src/ test/ e2e/ | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

Zero production consumers. 914 lines of contract-conformant code ship in no bundle.

The module admits the dual path in its own header — `demo/palettes/export/serializers.ts:5-9`:

> "This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`; the byte-exact set is
> addressed by its explicit paths here so the two never collide."

The two implementations are not near-variants; they are different schemas:

| | shipping (`export.ts:13-24`) | contract (`export/json.ts:11-29`) |
|---|---|---|
| top-level keys | `{name, slug, colors}` | `{schema, source, displayName, contentDigest, colors, canonicalTags}` |
| colour atom | `{css, position, name}` | `{id, name, oklch:{l,c,h,a}, css}` |
| encoding | `JSON.stringify(v, null, 2)` | `canonicalizeJson` (RFC 8785) + trailing LF |
| return | `{content: string\|Blob, filename, mime}` | `Uint8Array` |

**Mechanism:** dual implementation of one concept with the seam left un-cut. `usePaletteExport.ts`
is the routing seat and it still points at the retired module; W50 (the swap) never landed, so the
contract lives only in a test that no shipping code path touches.

**Reproduction:** the grep above (zero non-test importers of `export/`) + the trace chain above.
Both are static and complete — every link is a literal in the tree.

**Owner-edict violation:** #2, *no legacy code — no dual paths*. Verbatim.

**Proposed cure (transposition, not patch):** delete `demo/palettes/export.ts` and
`demo/palettes/usePaletteExport.ts` outright. Rename `export/serializers.ts` → `export/index.ts` (the
comment's only stated reason for the odd name is the collision it is supposed to prevent, and the
collision dies with the legacy file). Add `export/download.ts` holding the one browser-side effect
(`Uint8Array` + `filenameFor` + `mimeFor` → object URL → anchor click) that the legacy
`downloadExport` currently owns. The panes then reach `snapshotFromPalette(palette)` +
`serialize[Format]` + `download` — pure functions plus one effect, with `demo/test/export/byte-exact.test.ts`
suddenly covering the shipping path instead of a parallel one.

---

## L-2 — MAJOR — the barrel-seam boundary this component's cluster claims to be governed by is DEAD; `no-restricted-imports` resolves to `null` on this file

`demo/palettes/browser/index.ts:6-8` states the governance:

> "External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a raw
> internal `.vue` file — the G-DEMO-3b boundary (**eslint.config.js**) enforces it standing."

It does not.

```
$ npx eslint --print-config demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue \
    | python3 -c "import json,sys; print('no-restricted-imports =', json.load(sys.stdin)['rules'].get('no-restricted-imports'))"
no-restricted-imports = None
```

The rule is **not configured at all** for this file. Two independent reasons, both verifiable:

1. **The file globs address a tree that no longer exists.** `eslint.config.js:232-238` scopes G-DEMO-3b
   to `demo/@/components/**`, `demo/@/lib/**` (and `eslint.config.js:275-277` scopes G-DEMO-1/3a to
   `demo/@/composables/**`).
   ```
   $ ls -d demo/@
   ls: demo/@: No such file or directory
   ```
   W43 (RF-15) moved the tree to `demo/{palettes,platform,shell,scenes,shared,ui,color-session,picker,workbenches}/`.
   Three of the four globs match zero files.
2. **The banned pattern addresses a specifier alias that was killed.** The ban group is
   `"@components/custom/palette-browser/**/*.vue"` (`eslint.config.js:246-251`, repeated `:294-298`).
   `tsconfig.demo.json:33` records the kill: *"the demo `@…` path aliases were killed — every demo
   import is relative to its physical home. No `@styles`/`@components`/… project alias survives."*
   ```
   $ grep -rn "@components" demo/ src/ vite.config.ts tsconfig*.json
   demo/DESIGN.md:384: … consume Alert … from `@components/ui/alert` …
   demo/palettes/browser/status/index.ts:5: … (@components/custom/dock/DockStatusLamp.vue) …
   tsconfig.demo.json:33: … No `@styles`/`@components`/ …
   ```
   Three hits, all prose. **Zero import specifiers.** The pattern is unmatchable.

**Mechanism:** the boundary was encoded against the *addressing scheme* (path aliases + a directory
layout) rather than against the *module graph*. When W43 changed the addressing, the boundary silently
evaporated while its documentation stayed authoritative-sounding. This is worse than having no rule:
`browser/index.ts` and `card/index.ts` both spend paragraphs justifying a discipline (PI-6 named
re-exports, the seam contract) that nothing checks, so a reviewer reads the prose as a guarantee.

**Reproduction:** the `--print-config` command above. `null` is the whole proof.

**Cure:** re-encode the boundary structurally, not lexically. Move to `eslint-plugin-boundaries` (or
`import/no-restricted-paths`) keyed on *directory role* — `feature`, `platform`, `shell`, `ui`,
`shared` — with the legal edge set declared once: `shell → feature → {platform, shared, ui} → lib`,
never upward, never feature↔feature. A role-keyed rule survives a rename because it names roles, not
paths. Then delete the three dead glob objects rather than repairing them: two of them (`demo/@/lib`,
`demo/@/composables`) govern directories that were deleted in W43 and have no successor to point at.

---

## L-3 — MAJOR — the action vocabulary has no home; `action: [action: string]` erases it at the seam, and a dead handler proves the erasure bites

`PaletteCardMenu.vue:224-227`:

```ts
defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
```

The action names are string literals in the menu template (`:18`, `:31`, `:52`, `:66`, `:76`, `:86`,
`:96`, `:113`, `:116`, `:119`, `:123`, `:126`, `:136`, `:146`, `:158`, `:166`), and independently a
`Record<string, () => void>` key set in the consumer (`PaletteCard.vue:293-311`). Nothing types the
correspondence.

Producer set, extracted from the template — 17 names:

```
adminDelete delete editTags exportCSS exportJSON exportPNG exportSVG exportTailwind
feature flag fork makePrivate makePublic publish rename save versions
```

Consumer set, `PaletteCard.vue:293-311` — 18 keys: the 17 above **plus `copyAll`**.

```
$ grep -rn "copyAll" demo/ src/ e2e/ test/
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294:        copyAll: () => void writeClipboard(props.palette.colors.map((c) => c.css).join(", ")),
```

One hit in the whole repository, and it is the handler itself. **`copyAll` has no producer.** It is a
dead dispatch branch carrying a live `writeClipboard` call that can never fire from this menu.
`vue-tsc` cannot see it, because `Record<string, () => void>` accepts any key and `action: [string]`
emits any string. The failure this permits *has already happened*.

**Mechanism:** unique semantic ownership violated — the action vocabulary is a real concept with two
partial homes (a template's literals, a record's keys) and no canonical one.

**Reproduction:** the grep above; plus, at the type level, adding `@click="$emit('action','frobnicate')"`
to the menu typechecks clean today and no-ops at runtime via `PaletteCard.vue:313 if (!fn) return;` —
a masking fallback that is itself edict-2 shaped.

**Cure:** give the vocabulary one home next to the kind it discriminates —
`demo/palettes/browser/card/PaletteCard/actions.ts`:
```ts
export const PALETTE_CARD_ACTIONS = [
    "save","publish","makePublic","makePrivate","fork","rename","editTags","versions",
    "exportJSON","exportCSS","exportTailwind","exportSVG","exportPNG",
    "delete","flag","feature","adminDelete",
] as const;
export type PaletteCardAction = (typeof PALETTE_CARD_ACTIONS)[number];
```
Emit `action: [action: PaletteCardAction]`; type the consumer
`Record<PaletteCardAction, () => void>`. That single change (a) makes `copyAll` a compile error,
(b) makes `if (!fn) return;` unreachable and deletable, and (c) makes any future action addition a
two-sided compile obligation. Better still, fold `exportJSON|exportCSS|…` into
`{kind:"export"; format: ExportFormat}` so the export format union has exactly one home — the
`ExportFormat` already declared at `demo/palettes/export/types.ts:8`. That kills a second duplicated
vocabulary (`"json"|"css"|"tailwind"|"svg"|"png"` currently re-spelled at `PaletteCard.vue:307-311`,
`usePaletteExport.ts:15-19`, and `export/types.ts:8`).

---

## L-4 — MAJOR — `demo/ui/` is a 19-module pure-alias layer over glass-ui, and this component reaches it at the BARE ROOT when a published subpath exists

`demo/ui/dropdown-menu/index.ts` is one line, in full:

```ts
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@mkbabb/glass-ui";
```

This is not a component and not a variant home. It is a **module alias** — the exact construct edict 2
bans. And it is not one: every one of the 19 directories under `demo/ui/` is the same shape.

```
$ for d in demo/ui/*/; do echo "$(basename $d): $(ls $d | tr '\n' ' ')($(wc -l < $d/index.ts) lines)"; done
alert(11)  avatar(1)  badge(1)  button(1)  card(1)  checkbox(1)  collapsible(1)  dialog(1)
dropdown-menu(1)  input(1)  label(1)  popover(1)  radio-group(1)  select(1)  separator(1)
skeleton(1)  slider(1)  switch(1)  tooltip(1)
```

Nineteen directories, nineteen `index.ts` files, no `.vue`, no `.css`, no variants. `alert/index.ts` is
eleven lines only because ten are a comment explaining that it *used* to hold a real implementation.
90 relative import sites across `demo/` reach this alias layer (`button` 22, `card` 12, `popover` 7,
`badge` 7, `select` 6, `slider` 5, `tooltip`/`skeleton`/`input`/`dropdown-menu` 4 each, …).

Separately, the alias re-exports from the **bare root** `@mkbabb/glass-ui`, although
`@mkbabb/glass-ui/dropdown-menu` is a published key whose `.d.ts` exports exactly the fourteen names
plus their prop/emit types (`node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/index.d.ts`).
The root is a 42-line `export *` fan-out (`node_modules/@mkbabb/glass-ui/dist/index.d.ts`).

Measured cost of the root reach for exactly the nine symbols this component uses:

```
$ npx esbuild <entry> --bundle --format=esm --minify --external:vue --external:reka-ui \
    --external:@mkbabb/value.js --external:@mkbabb/keyframes.js --metafile=…
root barrel  ("@mkbabb/glass-ui")               : 17794 bytes, 1793 modules
subpath      ("@mkbabb/glass-ui/dropdown-menu") : 16825 bytes, 1736 modules
delta        : +969 bytes (+5.8%), +57 modules
```

**I am stating this honestly: the measured bundle delta is ~1 kB, which is MINOR on its own.** The MAJOR
is the alias layer, not the byte count. The byte count is included because `card/index.ts:2-4` and
`browser/index.ts:16-18` spend nine lines of prose justifying named-over-star re-exports *precisely on
tree-shake grounds* — and then the layer they protect reaches the widest possible specifier. The
discipline is asserted at the seam the authors wrote and abandoned at the seam they inherited.

**Mechanism:** an indirection layer with no content. It exists as sediment from the shadcn-vue era
(`alert/index.ts:3-5` records the conversion) and was never removed after the last local
implementation died.

**Cure:** delete `demo/ui/` entirely; rewrite the 90 import sites to the glass-ui published subpaths
(`@mkbabb/glass-ui/dropdown-menu`, `/button`, `/card`, …). This is a pure `sed`-shaped migration with
no behaviour change, it removes 19 modules, it makes "glass-ui is the design system" structurally true
rather than nominally true, and it deletes the last place a hand-rolled primitive could be smuggled
back in under a familiar path. If a demo-local variant is ever genuinely needed, edict 4 says it goes
*into glass-ui*, so the directory has no future tenant either.

---

## L-5 — MAJOR — `tsconfig.demo.json` `paths` and `package.json` `exports` have drifted: 3 phantom keys pointing at files that do not exist, 2 live export keys undeclared

The commission asks whether the demo speaks the published surface. On this component's own edge, yes
(§0). One level up, the *declaration* of that surface is wrong in both directions.

`package.json#exports` — 7 keys: `./color ./value ./css ./easing ./math ./transform ./quantize`.
`src/subpaths/` — 7 files, exactly matching.

`tsconfig.demo.json:41-49` — 8 keys, and they are a *different set*:

```
$ npx tsc --showConfig -p tsconfig.demo.json | python3 -c "import json,sys; print(json.load(sys.stdin)['compilerOptions']['paths'])"
… "@mkbabb/value.js": ["./dist/index.d.ts"],
   "@mkbabb/value.js/color":     ["./dist/subpaths/color.d.ts"],
   "@mkbabb/value.js/parsing":   ["./dist/subpaths/parsing.d.ts"],
   "@mkbabb/value.js/math":      ["./dist/subpaths/math.d.ts"],
   "@mkbabb/value.js/easing":    ["./dist/subpaths/easing.d.ts"],
   "@mkbabb/value.js/units":     ["./dist/subpaths/units.d.ts"],
   "@mkbabb/value.js/transform": ["./dist/subpaths/transform.d.ts"],
   "@mkbabb/value.js/quantize":  ["./dist/subpaths/quantize.d.ts"]
```

Three of those eight targets **do not exist on disk**:

```
$ ls dist/index.d.ts dist/subpaths/
ls: dist/index.d.ts: No such file or directory
color.d.ts  css.d.ts  easing.d.ts  math.d.ts  quantize.d.ts  transform.d.ts  value.d.ts
```

No `index.d.ts`, no `parsing.*`, no `units.*`. And the two live keys `./value` and `./css` are absent
from `paths` — `./css` is the demo's second-most-used subpath (10 import sites).

The comment at `tsconfig.demo.json:37-40` asserts the opposite of all of this:

> "The value.js published surface: the bare `.` root + the 7 subpath barrels, each → its `dist/*.d.ts`
> … TS `paths` needs an explicit per-subpath entry — there is no `.../*` wildcard because the `exports`
> map is a **CLOSED 8-key set**. Mirrors the `vite.config.ts` runtime self-alias **generated from the
> same map**."

The Vite alias set *is* generated from the map (`vite.config.ts:41-50`) and therefore has 7 anchored
entries with the right names. The tsconfig set is hand-maintained, has 8 with the wrong names, and
mirrors nothing.

**Why this is not currently a red build:** TypeScript falls through to *self-reference* resolution when
no `paths` pattern matches, and that path is correct —

```
$ npx tsc --noEmit --traceResolution -p tsconfig.demo.json | grep "@mkbabb/value.js/css"
… Module name '@mkbabb/value.js/css' was successfully resolved to
  '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID '…@4.0.0'.
```

So `/css` and `/value` typecheck correctly *by accident*, through the mechanism the `paths` block was
written to replace. And no demo file imports bare `@mkbabb/value.js` today
(`grep -rn 'from "@mkbabb/value\.js"' demo/ src/` → no matches), so the phantom root entry is latent.

**Mechanism:** a derived artefact (the TS `paths` mirror) was hand-copied instead of generated, then
drifted when the exports map changed, and its comment was never re-read against the map. The Vite side
solved exactly this problem by generating; the TS side did not.

**The latent bite, labelled as a HYPOTHESIS (reproduction: NONE — no such import exists today):** the
first demo file to write `import { … } from "@mkbabb/value.js"` will typecheck *green* against a
`paths` entry pointing at a missing `dist/index.d.ts`… no — it will fail to typecheck, because the
target file is absent; but it will fail with a resolution error rather than the honest
`ERR_PACKAGE_PATH_NOT_EXPORTED` the runtime would give, and the fix will look like "build dist" rather
than "there is no root export". `/parsing` and `/units` are worse: they name subpaths the package
never published, so their presence in `paths` documents a public API that does not exist.

**Cure:** generate the TS `paths` from `package.json#exports` the way `vite.config.ts:37-50` already
does. `tsconfig.json` cannot run code, so the honest transposition is to *delete the whole
`@mkbabb/value.js*` block* and rely on self-reference resolution, which the trace above proves is
already doing the work correctly for `/css` and `/value` and is by construction incapable of drifting.
That deletes 8 hand-maintained lines and 23 lines of now-false comment, and makes exactly one
authority — the `exports` map — govern both compile and runtime.

---

## L-6 — MINOR — no seam at the palette feature root, an elaborate seam where there is no coupling

The seam discipline is inverted relative to where the coupling actually is.

- `demo/palettes/browser/index.ts` — 26 lines of prose + 6 named re-export groups, guarding six
  component sub-clusters. `demo/palettes/browser/card/index.ts` — a further 6-symbol barrel with its
  own PI-6 rationale.
- `demo/palettes/` root — **21 files, 2958 lines, no `index.ts`.** It holds the feature's entire shared
  vocabulary: `types.ts`, `utils.ts`, `constants.ts`, `export.ts`, `mix.ts`, and 13 `use*.ts`
  composables.
- `demo/platform/transport/` — 4 files, **no `index.ts`**.

Measured coupling: **17 modules under `demo/palettes/` reach `types` by relative climb**
(`grep -rn 'from "\(\.\./\)*types"' demo/palettes | wc -l` → 17); `utils` has 2. Neither has a seam.
Meanwhile `PaletteCardMenu` — a leaf three directories deep — writes `../../../types`,
`../../../utils`, and `../../../../platform/transport/useApiClient`.

**Mechanism:** the barrel was applied to the *visible* surface (components, which look like an API) and
not to the *load-bearing* one (the domain vocabulary, which everything actually imports). Combined with
L-2 (nothing enforces either), the result is that the guarded surface is the one nobody crosses.

**Cure:** invert it. `demo/palettes/index.ts` exporting `{Palette, PaletteColor, PaletteVersion,
PaletteKind, getPaletteKind, createSlug, …}` is the seam that 17 modules need;
`demo/platform/transport/index.ts` exporting `{useApiClient, provideApiClient, type ApiClient,
type ApiAvailability}` is the seam that turns edge #4 above from a raw-file reach into a platform-API
reach. The component-level barrels can then thin out — `card/index.ts` exists to be reached from
outside `card/`, and `PaletteCardMenu` is reached only by its sibling `PaletteCard.vue` (`:176`,
`import PaletteCardMenu from "./PaletteCardMenu.vue"`), which is correct and needs no barrel.

Also on this axis: `useApiClient.ts:22-23` writes `from "./client.js"` / `"./availability.js"`
(extensioned) while `PaletteCardMenu.vue:177-190` writes extensionless. Two module-specifier
conventions in one dependency chain; pick one.

---

## L-7 — MINOR — the availability latch is consulted ad hoc per item; there is no home for "which actions are network-bound"

`PaletteCardMenu.vue:216-217` injects `availability` and derives `apiOffline`. It is applied to exactly
**two** of the menu's items — Publish (`:30`) and the visibility flip (`:51`).

Not gated, though every one of them issues a network call (`demo/palettes/api/palettes.ts`,
`versions.ts`, `admin-palettes.ts`): `save`, `fork`, `rename`, `editTags`, `versions`, `delete`,
`flag`, `feature`, `adminDelete`. Nine actions.

**Mechanism:** "is this action network-bound" is a property of the action, but the action has no
descriptor (see L-3) — so the property is re-decided by hand at each `<DropdownMenuItem>` and was
decided nine times by omission.

**Reproduction: NONE — labelled a HYPOTHESIS on the behavioural claim.** Verifying that e.g. `fork`
actually fails while offline needs a live card, and §L-9 shows no card renders in any captured state.
The *structural* claim — that only 2 of 11 network-bound items read the latch — is direct from the
template and is not a hypothesis.

**Cure:** the L-3 action descriptor carries it: `{ id, label, icon, requiresNetwork, visibleWhen }`.
The template becomes one `v-for` over the visible descriptors, `:disabled="a.requiresNetwork &&
apiOffline"` written once, and the K-INV5 small-caps annotation rendered once from a single
`degradedNote(a)`. 228 lines of template collapse to roughly 30, and the offline policy stops being
copy-paste.

---

## L-8 — MINOR — per-instance styling at scale; the item recipe is re-declared 11 times and two inline `style=` overrides carry it

Edict 5 is "style at the shadcn/glass root component level, never per-instance overrides."

- `class="gap-2 cursor-pointer"` appears on **11 of the 11** `DropdownMenuItem`/`DropdownMenuSubTrigger`
  elements in this file (`:17`, `:29`, `:50`, `:65`, `:75`, `:85`, `:95`, `:108`, `:135`, `:145`,
  `:158`, `:164`). A class applied to 100% of instances of a component is that component's root
  styling, misfiled.
- `style="font-variant: small-caps"` — raw inline style, `:38` and `:58`. Not a token, not a class, not
  overridable by theme.
- The K-INV5 annotation recipe `class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"`
  is spelled twice verbatim (`:37`, `:57`) with the inline style attached to each.

**Mechanism:** glass-ui's `DropdownMenuItem` root does not carry the icon-gap/pointer recipe, so every
call site re-declares it; and the K-INV5 degraded-state annotation — a *design-system concept* with a
named invariant — has no primitive, so it is hand-assembled per use.

**Cure:** `gap-2 cursor-pointer` moves into glass-ui's `DropdownMenuItem` root (edict 4: it belongs
upstream, and every other consumer in the constellation wants it too). The annotation becomes a
glass-ui `DropdownMenuShortcut` variant — **that primitive already exists and is already exported**
(`node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/index.d.ts`, `DropdownMenuShortcut`) and
is precisely the "right-aligned muted trailing text" slot this file is hand-rolling with `ml-auto`.
Reusing it satisfies edict 4's "reuse existing component-type names" exactly. `font-variant: small-caps`
becomes a token in glass-ui's dropdown styles, not an inline attribute.

---

## L-9 — INFO — the visual audit contains ZERO evidence about this component; all 60 captures rendered the empty/unreachable state

I read `docs/tranches/V/megatranche/audit/visual/REPORT.md`, the `REPORT.json` rows for `/#/palettes`
and `/#/browse` across all four matrices, and the screenshots
`shots/safari-desktop-light/browse.png` and `shots/safari-desktop-dark/palettes.png`.

The screenshots show **"The commons is unreachable. / Failed to load palettes"** on Browse and
**"· EMPTY PLATE · / No saved palettes yet."** on My Palettes. The JSON corroborates:
`/#/palettes` `bodyTextLength: 237`, `/#/browse` `bodyTextLength: 280`, and neither route's
`smallTapTargets` list contains the `"Palette menu"` accessible name that `PaletteCard.vue:98` sets
on the menu trigger.

**No `PaletteCard` — and therefore no `PaletteCardMenu` — exists in any of the 60 captures.**

Two consequences worth recording for the formation:

1. Any statement of the form "PaletteCardMenu renders correctly per the visual matrix" is unfounded.
   The matrix is silent on this component.
2. The irony is load-bearing: the state the matrix *did* capture is API-offline, which is exactly the
   state `PaletteCardMenu:36-39` and `:56-59` were built to annotate. The K-INV5 "offline" affordance
   is unobserved in the one scenario that would exercise it, because when the API is down the browse
   list renders an error panel instead of cards — so the per-item offline annotation is only ever
   reachable on `/#/palettes` with pre-existing *local* palettes, a state no capture seeded.

**Cure (evidence, not code):** the matrix needs a seeded fixture state — either a local-storage
pre-seed of 2–3 saved palettes before capture, or an API-up matrix — otherwise the palette feature,
which is ~84 files and the largest in `demo/`, is entirely unaudited visually.

---

## Greenfield module lattice

Stated concretely, as commissioned. Five roles, one legal direction of dependency, no exceptions:

```
shell/            router, dock, panes — the only role allowed to compose features
  └── palettes/                                   ← feature; owns the palette DOMAIN
        index.ts          Palette, PaletteColor, PaletteKind, getPaletteKind, createSlug
        api/              endpoints (already correct — keep as is)
        export/           index.ts = the byte-exact serializers + download effect (L-1)
        browser/
          card/
            actions.ts    PaletteCardAction + descriptors (L-3, L-7)
            PaletteCard.vue
            PaletteCardMenu.vue   ← v-for over descriptors; no literals, no per-item policy
  └── platform/                                   ← cross-feature infrastructure
        transport/index.ts   useApiClient, ApiClient, ApiAvailability   (L-6)
        auth/index.ts
        storage/index.ts
  └── shared/       role-free utilities
  └── (no demo/ui/ — glass-ui subpaths are consumed directly)        (L-4)
                    ↓
@mkbabb/glass-ui/<subpath>            design system — primitives + variants live HERE
                    ↓
@mkbabb/value.js/<exports-map-key>    library — reached ONLY through the exports map,
                                      with tsconfig paths deleted in favour of
                                      self-reference so one authority governs both
                                      compile and runtime                (L-5)
```

Edges, declared once and enforced by role (not by path glob, so a rename cannot kill them — L-2):

| from | may import | must never import |
|---|---|---|
| `shell` | feature, platform, shared, glass-ui, value.js | — |
| feature (`palettes`) | own subtree, platform, shared, glass-ui, value.js | `shell`, another feature |
| `platform` | shared, value.js | any feature, `shell`, glass-ui |
| `shared` | value.js | everything else |
| `src/` (library) | nothing in `demo/` | glass-ui (already enforced, `eslint.config.js:206-218`) |

The three changes that carry most of the value, in order: **(1)** delete `demo/palettes/export.ts` +
`usePaletteExport.ts` and route the menu to `export/` — this is the BLOCKER and it is a deletion, not
a build; **(2)** `actions.ts` — one descriptor list dissolves L-3, L-7, and ~180 of this file's 228
template lines; **(3)** delete `demo/ui/` and re-encode the eslint boundary by role — this makes
edicts 2 and 4 structurally true instead of documentary.

---

## Negative results (things this seat checked and did NOT find)

Recorded so the absence is evidence rather than silence:

- **`verbatimModuleSyntax`** — clean. Both type-only imports are `import type` (`:177`, `:178`).
- **Vue 3.5 idioms (edict 7)** — `const { palette } = defineProps<…>()` (`:206`) is the reactive-props
  destructure. No `defineModel` here, so no stale-read hazard, so no `shallowRef` obligation.
  `useTemplateRef` not needed — no template refs.
- **Deep-path forgery of the value.js public API** — none. This component and its entire
  first-order cone import zero value.js symbols; the transitive reach through glass-ui uses published
  subpath keys only (§0).
- **The named historical suspects** — `ActionBarLayer`'s local `useLayerTransition`
  (`demo/shell/dock/layers/ActionBarLayer.vue:63`) and the three parallel `useDark` stores
  (`demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76`) are both real and both
  **outside this component's cone**; they belong to the `shell` and `scenes` seats, not this one.
  `useHeightTransition` — checked for duplication, has exactly one home
  (`demo/palettes/browser/card/composables/useHeightTransition.ts`), no second implementation.
- **God module** — `PaletteCardMenu.vue` is not one: 228 lines, 53 of them script, one injected seam,
  zero business logic beyond two `computed` predicates. Its defect is the opposite of a god module —
  it is *under*-specified, holding a vocabulary that should be typed and a policy that should be data.
  `demo/palettes/utils.ts` (30 lines, 3 exports) and `demo/palettes/types.ts` (pure interfaces) are
  likewise clean.
- **Console/page errors, horizontal overflow, dark-class, main-count** on `/#/palettes` and `/#/browse`
  — all zero in all four matrices (`REPORT.md` per-capture table, rows 120-121, 135-136, 150-151,
  165-166). Those clean rows describe the empty state only (L-9).
