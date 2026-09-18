# CHALLENGE-L — library structure under `PaletteCardMenu.vue` (PASS 4)

> Pass 4. The three predecessors are preserved verbatim:
> `challenge-L-library.pass-1-2026-07-28.md` (HEAD `32b4040e`),
> `challenge-L-library.pass-2-2026-07-28.md` (HEAD `e79fcd43`),
> `challenge-L-library.pass-3-2026-07-28.md` (HEAD `9268f054`).
>
> Like pass 3, this pass was worked **blind**: I traced the import cone, the export chain, the
> resolution graph and the open-state model from source, ran my probes, and only then read the three
> predecessors. Contribution: **six new findings** (L-19…L-24), **two corrections to the standing
> record** — one of which **overturns a pass-3 negative result** — and the **first visual capture of
> this component ever taken** (the whole 60-shot visual matrix rendered the empty state).

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
matches the explicit declaration this seat was spawned with. The seat is **DECLARED, not inherited**;
no defect on the receipt axis.

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD `9268f054`** — the commission names `c654824e`; the branch has moved four times under four
  passes. Every file:line below is against `9268f054`:
  ```
  $ git log --oneline -1
  9268f054 docs(V·mega): picker band COMPLETE 12/12 validated — flagship corpus banked; two bands remain
  ```
- `PaletteCardMenu.vue` — 228 lines, unchanged since pass 1.
- Dev server live at `http://localhost:9000`, `VITE_API_URL` unset → the app boots into the
  **`misconfigured`** availability state. Load-bearing for L-17 (pass 3) and for my visual capture.
- New probes in this directory: `probe-L4-slug-and-open.mjs` (+ `probe-L4-results.json`),
  `probe-L4-resolve.mjs` (+ `probe-L4-resolve-results.json`), and two screenshots under
  `evidence/pass4/`.

**Verdict: DEFECTIVE.** Carrying the standing record (3 BLOCKERs, 6 MAJORs, 6 MINORs from passes
1–3) plus **four new MAJORs, one new MINOR, one new INFO**, and two corrections.

---

## Part I — corrections to the standing record

### C-4 — the `demo/ui/` bundle question, settled by an actual build: **zero bytes**

Three passes have now argued about this. Pass 2 (L-15) claimed deleting `demo/ui/` removes a
234,309-byte glass-ui root-barrel chunk. Pass 3 withdrew the number by *argument* (dev pre-bundle ≠
build artifact; `sideEffects: ["*.css"]`). Neither built anything. I built both.

Two entry files importing the **same nine** DropdownMenu symbols, one through the root barrel
(what `demo/ui/dropdown-menu/index.ts` does), one through the published `./dropdown-menu` subpath.
Same Vite/Rollup pipeline, `minify: "esbuild"`, `external: [vue, reka-ui, @vueuse/core]`:

```
$ ENTRY=root npx vite build --config <scratchpad>/vite.barrel.ts
$ ENTRY=sub  npx vite build --config <scratchpad>/vite.barrel.ts
$ ls -la out-root/ out-sub/
-rw-r--r--  20333  root.js      ← via "@mkbabb/glass-ui"            (the demo/ui path)
-rw-r--r--  20337  sub.js       ← via "@mkbabb/glass-ui/dropdown-menu"
```

**20,333 vs 20,337 bytes — a 4-byte difference, and the *subpath* build is the larger one.** Rollup
tree-shakes the pure re-export root barrel completely. The production cost of the root reach is nil.

The dev-mode cost is also not attributable to `demo/ui/`:

```
$ grep -rl 'from "@mkbabb/glass-ui"' demo --include="*.vue" --include="*.ts" | wc -l
36
$ grep -rn "ui/dropdown-menu" demo --include="*.vue" --include="*.ts"
demo/shell/dock/menus/ProfileSection.vue:12
demo/shell/dock/menus/MobileMenuDropdown.vue:10
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:190
demo/palettes/browser/search/UserSortMenu.vue:48
```

36 demo modules reach the glass-ui root **directly**. Deleting all 19 `demo/ui/` barrels changes the
dev pre-bundle graph by nothing at all — `node_modules/.vite/deps/@mkbabb_glass-ui.js` is requested
either way.

**Disposition:** the `demo/ui/` finding stands at **MAJOR on edict 2/3/4 grounds only** — 19
directories, 19 one-line files, zero behaviour, interposed between the demo and its design system,
with no policy (18 reach the root, `input/` alone reaches `/forms`). Pass 2's byte justification is
now falsified by measurement, not just by argument. Delete it because it is an alias layer, and say
nothing about bytes.

### C-5 — pass 3's negative result *"published-surface forgery — none … this axis is clean"* is **wrong**, and it is wrong in the direction the challenge premise points

Pass 3 closed the published-surface axis with: *"A real consumer could write every library import the
demo writes. This axis is clean, and it is the axis the challenge premise most directly targets — the
premise fails here."*

The **specifiers** are clean. The **artifact behind them is not the published one**, and one of its
files is measurably different. See L-19 and L-20 below. Pass 3 checked that the demo writes the right
import strings; it did not check what those strings resolve to. They resolve to an untracked local
build that differs from the npm package of the same version number.

---

## Part II — new findings

### L-19 — MAJOR — the demo-dogfood keystone proves a surface that does not exist on npm: `dist/` is untracked, locally regenerated, and **not byte-equal to the published 4.0.0**

The T.W1 keystone is the reason this whole area is shaped the way it is —
`tsconfig.demo.json:5-9`: *"Resolves the value.js library through its PUBLISHED subpath `exports` … →
the `dist/*.d.ts` trust boundary (the T.W1 demo-dogfood keystone …)"*. `vite.config.ts:37-50`
generates the runtime aliases from `package.json#exports` so they *cannot* drift.

All of that machinery points at `dist/`. And:

```
$ git check-ignore -v dist
.gitignore:17:dist/	dist
$ git ls-files dist | wc -l
0
```

`dist/` is **not in the repository**. The "trust boundary" is a local build artifact. Meanwhile the
actual published package is installed in the tree — npm pulled it to satisfy glass-ui's peer
dependency (`@mkbabb/glass-ui` → `peerDependencies: { "@mkbabb/value.js": "^4.0.0", … }`) — so both
artifacts sit side by side, both claiming version 4.0.0:

```
$ node docs/.../probe-L4-resolve.mjs        # excerpt; full output in probe-L4-resolve-results.json
"repoPackageVersion":       "4.0.0",
"installedPackageVersion":  "4.0.0",
```

They are **not the same build**:

```
$ diff -rq dist node_modules/@mkbabb/value.js/dist
Only in dist: gh-pages
Files dist/subpaths/css.d.ts and node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts differ
Files dist/subpaths/css.js  and node_modules/@mkbabb/value.js/dist/subpaths/css.js  differ
```

The `.js` difference is minifier identifier churn (`var g = Object.freeze(…)` vs
`var _ = Object.freeze(…)`) — two runs of the same source, 43,973 B vs 43,972 B. Benign in itself,
but it proves the artifacts were produced by different builds.

The `.d.ts` difference is **structural, and it is 1,580 bytes of surface**:

```
$ wc -c dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
   12490 dist/subpaths/css.d.ts                                  ← what the demo typechecks against
   10910 node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts    ← what a real consumer gets

$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
< declare type Alpha_2 = number | "none";
< declare type Channel_2 = number | "none";
< declare type ChannelsBySpace_2 = { rgb: readonly [r: Channel_2, …]; … };
< declare type Color_2<S extends SpaceId_2> = Readonly<{ space: S; channels: …; alpha: Alpha_2 }>;
< declare type SpaceId_2 = "rgb" | "hsl" | … ;
136c106
<     [S in CssColorSpace]: Color_2<S>;
---
>     [S in CssColorSpace]: Color<S>;
```

The local build emits a `_2`-suffixed **duplicate of the entire colour type family** (a rollup-dts
name-collision artifact) and wires `CssColorMap` to `Color_2<S>`; the published copy has the single
clean `Color<S>`. Structural typing keeps this from being a red build — which is exactly why nobody
noticed — but the demo is certifying a `.d.ts` that npm has never seen.

**Which one wins is not even config-dependent** — it is Node package self-reference, so it wins in
*every* regime inside this repo (Vite alias, vitest's externalised deps, plain node):

```
"@mkbabb/value.js/css"  ->  <repo>/dist/subpaths/css.js   sha256:ca87007bf75062e8   (the LOCAL one)
```

(The installed copy is therefore dead weight, never loaded. That part is fine; the divergence is not.)

**Mechanism.** The trust boundary was defined as a *path* (`dist/`) rather than as an *artifact*
(a published tarball). A path can be regenerated; a tarball cannot. With `dist/` gitignored there is
no pin, no checksum and no CI step that could ever notice the two drifting.

**Reproduction:** the three commands above, all deterministic, all against `9268f054`.

**Owner-edict violation:** #2 — a second live copy of the library, selected by resolution rules rather
than by intent, is a dual path.

**Cure (transposition).** Stop dogfooding a directory; dogfood the package. Two moves, both
subtractive:
1. `npm pack` in CI and install the resulting tarball into the demo typecheck job, or add
   `"@mkbabb/value.js": "file:."`-style self-linkage so `node_modules/@mkbabb/value.js` **is** the
   thing under test. Then delete the entire `valueJsSelfAlias` generator (`vite.config.ts:24-50`,
   ~27 lines + 14 lines of comment) — a package that resolves itself needs no alias.
2. Fix the `_2` emission at its source (the rollup-dts collision in the `css` subpath build) and add
   a `test/dist/` gate asserting `dist/subpaths/*.d.ts` contains no `_2`-suffixed declaration. There
   is already a `test/dist/` convention for exactly this class of repo-hygiene gate
   (`vitest.config.ts:24-28`).

### L-20 — MAJOR — `@mkbabb/value.js` has **no root export at all**, and `tsconfig.demo.json` declares one; the config comment that justifies it is false in two separate claims

Pass 1's L-5 called the bare-root `paths` entry a "phantom" and labelled its bite a HYPOTHESIS
("reproduction: NONE — no such import exists today"). It is now reproduced. `package.json#exports`
has **seven** keys and no `"."`:

```
$ node -e "console.log(Object.keys(require('./package.json').exports))"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]
```

so the specifier is not merely unbuilt — it is **refused**:

```
"specifier": "@mkbabb/value.js",
"error": "ERR_PACKAGE_PATH_NOT_EXPORTED: No \"exports\" main defined in
          /Users/mkbabb/Programming/value.js/package.json"
```

`tsconfig.demo.json:42` nonetheless declares `"@mkbabb/value.js": ["./dist/index.d.ts"]`. Any demo
file that writes the bare import typechecks against a phantom and cannot run.

Two further claims in that file's header comment are **false as measured**:

> `tsconfig.demo.json:22-25` — *"glass-ui's published `dist/` imports the value.js core by the bare
> `@mkbabb/value.js` specifier (aurora/color paths, inv-K-2); a package never installs itself, so the
> demo aliases that specifier to value.js's own published `dist/value.js`…"*

```
$ grep -ho '"@mkbabb/value\.js[^"]*"' node_modules/@mkbabb/glass-ui/dist/*.js | sort | uniq -c
   5 "@mkbabb/value.js/color"
   3 "@mkbabb/value.js/css"
   1 "@mkbabb/value.js/easing"
```

glass-ui imports **only subpaths**, never the bare root — so the alias the comment says is needed is
not needed; and the target it names (`dist/value.js`) is not an exports key either (`./value` maps to
`dist/subpaths/value.js`). A load-bearing config comment asserting a mechanism that is neither
required nor implemented is how L-19 stayed invisible for four passes.

**Cure:** delete the `@mkbabb/value.js*` `paths` block wholesale (8 lines) and its 23 lines of comment.
Self-reference resolution already does the work correctly and — unlike a hand-copied mirror — cannot
drift. This is pass 1's cure; L-20 supplies the reproduction that makes it non-optional.

### L-21 — MAJOR — two slugify algorithms for one concept; the divergence is user-visible three clicks from this menu, and I reproduced it live

`demo/palettes/utils.ts:3-12` mints the slug a palette is **stored** under (NFKD-folding). `demo/palettes/export.ts:9-11`
mints the slug the **exported file is named** with (no normalisation). They are different functions:

```ts
// utils.ts:3        s.normalize("NFKD").replace(/[̀-ͯ]/g,"").trim().toLowerCase()
//                    .replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")
// export.ts:9       name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")
```

Divergence table (computed):

| palette name | store slug (`utils.ts`) | export filename stem (`export.ts`) |
|---|---|---|
| `Café Noir` | `cafe-noir` | **`caf-noir`** |
| `Ünderscore_Mix` | `underscoremix` | **`nderscore-mix`** |
| `中文 palette` | `-palette` | `palette` |

**Reproduced live** through this component's Export sub-menu (`probe-L4-slug-and-open.mjs`,
results in `probe-L4-results.json`) — seed two saved local palettes, open the card menu, hover
Export, click JSON, intercept the anchor:

```json
"seededSlugs":        ["cafe-noir-aabbccdd", "underscoremix-aabbccdd"],
"menuInclSubmenu":    ["Publish","Rename","Export","Delete",
                       "JSON","CSS Custom Properties","Tailwind Config","SVG Swatch","PNG Swatch"],
"downloadFilenames":  ["caf-noir.json"]
```

The palette lives at `cafe-noir-aabbccdd`; its export lands as `caf-noir.json`. The `é` is *deleted*
rather than folded. The CSS export is worse than a filename: the same broken stem becomes the
custom-property namespace (`export.ts:27` → `--palette-caf-noir-0`).

A third home for the same concept exists and is correct — `export/canonical.ts:52-58`
`identifierPrefix`, whose comment reads *"The prefix already satisfies the token grammar; **no
slugifier exists**"* — because the byte-exact contract set deliberately uses the server slug. It is
the one that never ships (pass 1 L-1).

**Owner-edict violation:** #2 (dual path) and unique-semantic-ownership.

**Cure:** one exported `slug()` in the palette domain module, consumed by both the store minter and
the export filename builder — or, under pass 1's L-1 cure, no second slugifier at all, because the
contract serializers take the slug from the snapshot.

### L-22 — MAJOR — `paletteKind` is a **derived prop**: a total pure function of the `palette` prop, passed alongside it, then bypassed by the component that receives it

```ts
// PaletteCardMenu.vue:206-212
const { palette } = defineProps<{
    palette: Palette;
    paletteKind: PaletteKind;   // ← getPaletteKind(palette). Nothing else.
    …
}>();
```

`getPaletteKind` is total, pure, and depends on nothing but `palette` (`utils.ts:22-31`: `isLocal`
plus three id prefixes). There is exactly one call site in the repository, and it passes precisely
that:

```
$ grep -rn "palette-kind\|:paletteKind" demo --include="*.vue"
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:85:  :palette-kind="kind"
# PaletteCard.vue:225 — const kind = computed<PaletteKind>(() => getPaletteKind(props.palette));
```

So the seam carries a value **and** a function of that value, with the invariant `paletteKind ===
getPaletteKind(palette)` unstated and unchecked. And the component does not trust it: eight template
sites branch on `paletteKind` (`:16, :28, :49, :64, :74, :84, :134, :144`) while `:94` re-derives the
same discriminator independently —

```html
<!-- :94 -->  v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
```

`!isLocal` **is** `kind === "remote"` by `utils.ts:23`. One file, one concept, two spellings, plus a
prop carrying a third copy.

*(Pass 2's L-13 found the two spellings. The redundant-prop mechanism beneath them is new: the
spellings are a symptom of the kind having no single home at the seam.)*

**Reproduction of the redundancy:** the grep above (fact). **Reproduction of a desync: NONE — this is
a HYPOTHESIS.** With one call site it cannot happen today; it becomes reachable the moment a second
consumer renders the menu, which pass 2's L-11 shows is already the shape of the `isOwned` bug.

**Cure:** delete the prop. `const kind = computed(() => getPaletteKind(palette))` inside the menu —
one line, one home, and `:94` becomes `kind === "remote" && …`. The seam narrows from 5 props to 4
and the invariant becomes unstateable-because-unnecessary.

### L-23 — MAJOR — the open-state model is hand-rolled over a primitive that already ships the correct one, it is not `v-model`-compatible, and the guard it exists to serve is provably dead

glass-ui's `DropdownMenu` publishes the canonical Vue model:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/DropdownMenu.vue.d.ts
export interface DropdownMenuClickProps extends DropdownMenuBaseProps {
    open?: boolean;         /** Controlled open state. */
    defaultOpen?: boolean;  /** Initial open state when the menu is uncontrolled. */
}
export interface DropdownMenuEmits { "update:open": [value: boolean]; }
```

`v-model:open` works on it. `PaletteCardMenu` wraps that and republishes it as:

```ts
// PaletteCardMenu.vue:209, 224-227
menuOpen: boolean;
defineEmits<{ action: [action: string]; updateOpen: [value: boolean] }>();
```

`updateOpen` is **not** `update:menuOpen`, so `v-model:menu-open` is impossible on this component;
the single consumer must hand-wire both halves (`PaletteCard.vue:87` `:menu-open="menuOpen"`,
`:89` `@update-open="menuOpen = $event"`). A wrapper that strictly **downgrades** the API it wraps —
edict 7 (`defineModel` is the Vue 3.5 idiom for exactly this) and a public-surface defect.

And the state it hoists is not needed. `PaletteCard.vue:290-318`:

```ts
function handleMenuAction(action: string) {
    // `rename` opens an inline input — keep the menu open visually until the
    // input takes focus; all other actions close the menu immediately.
    …
    const fn = actions[action];
    if (!fn) return;
    if (action !== "rename") menuOpen.value = false;   // :317
    fn();                                              // :318
}
```

For `action === "rename"`, `fn` is `startRenaming` — whose **first statement** is
`menuOpen.value = false` (`:281`). Both branches set the same value one line apart. The guard at
`:317` is dead, and the comment at `:291-292` describes behaviour the code two lines below
contradicts.

**Reproduced live** (`probe-L4-results.json`) — open the second card's menu, choose Rename:

```json
"menuStateBeforeRename": ["open"],
"openMenusAfterRename":  0,
"renameInputsVisible":   2
```

Zero open menus. The menu closes, exactly as it would with no controlled state at all (reka's
`MenuItem` closes on select regardless).

**Owner-edict violations:** #7 (not the 3.5 idiom), #2 (dead branch), #3 (four moving parts —
prop, emit, parent ref, guard — re-implementing what the primitive already does).

**Cure:** delete `menuOpen`, `updateOpen`, the parent `ref`, and the `:317` guard. The menu owns its
own open state via `defaultOpen`; if any consumer ever needs control, `const open =
defineModel<boolean>("open")` gives them `v-model:open` and matches the primitive's vocabulary
exactly. Net: −1 prop, −1 emit, −1 ref, −1 dead branch, −2 lines of false comment.

### L-24 — MINOR — the area root is a 21-file flat drawer, and the type module this leaf imports from spans four domains

`demo/palettes/` is the feature root this component's `Palette` and `PaletteKind` come from:

```
$ find demo/palettes -maxdepth 1 -type f | wc -l        → 21
$ find demo/palettes -maxdepth 1 -name 'use*.ts' | wc -l → 14
$ grep -cE '^export (interface|type)' demo/palettes/types.ts → 12
```

Fourteen composables, a `types.ts`, a `utils.ts` ("misc" by name), a `constants.ts`, a `mix.ts`, and
`export.ts` — the last of which **collides by name with the `export/` directory beside it**. That
collision is documented as deliberate in `export/serializers.ts:5-9`: *"This module is intentionally
NOT named `index.ts`: the sibling legacy `../export.ts` (the pre-contract routed seat that W50 will
replace) still resolves `./export`"*. A dual path with a deferred-migration promise in its header is
edict 2 in its purest written form (pass 1 L-1 owns the finding; the *naming* half is the part that
makes it invisible to a reader).

`types.ts` itself spans four domains: palette (`Palette`, `PaletteColor`, `PaletteVersion`,
`ProvenanceNode`, `PaletteStore`), identity (`User`), moderation/admin (`Flag`, `FlaggedPalette`,
`Tag`, `AuditEntry`), and **transport** (`PaginatedResponse<T>`, `CursorPaginatedResponse<T>` —
generic HTTP envelopes living inside a feature). Costless at runtime under `import type`, but it is
the ownership question the challenge asks: pagination envelopes belong to `platform/transport/`, not
to palettes.

**Cure:** the lattice below. `types.ts` splits along its four seams; the twelve `use*` composables
move under the sub-feature they serve; `utils.ts` dissolves into the domain module (`getPaletteKind`,
`slug`) — a "utils" module is where unique ownership goes to die.

### L-25 — INFO — the first visual evidence of this component in the entire audit, and it corroborates L-17 pictorially

Pass 1's L-9 recorded that all 60 visual-matrix captures rendered the empty state. Confirmed —
`visual/shots/safari-desktop-light/palettes.png` shows "EMPTY PLATE · No saved palettes yet." with
zero cards, so the matrix contains **no** evidence about `PaletteCardMenu`.

`evidence/pass4/menu-open-saved-misconfigured.png` and `evidence/pass4/menu-open-export-submenu.png`
are the first captures of it rendered (2× DPR, 1440×1000, seeded local palettes). The second one puts
pass 3's L-17 on screen:

- top-right dock chip: **`DEV MISCONFIGURED — RUN 'NPM RUN DEV'`** (red lamp);
- the open card menu on the same frame: **Publish in full-strength ink, enabled, with no `offline`
  annotation** — the K-INV5 register this file's own comment (`:24-26`) promises.

One app, one frame, two contradictory statements about backend reachability. That is the picture of
`availability.value === "unavailable"` being written against a four-member union.

---

## Part III — corroborations, with new evidence

- **L-17 (pass 3) independently re-reproduced** on a different seed (2 saved local palettes,
  `/#/palettes` rather than `/#/browse`) and now also captured visually — see L-25.
- **L-10 (pass 2) is route-scoped, and the scope matters.** Pass 3 measured Export→JSON firing **no**
  download at `/#/mix`. At `/#/palettes` the same item **does** fire
  (`"downloadFilenames": ["caf-noir.json"]`). The dead affordances are not a property of the menu —
  they are a property of the consumers that mount `PaletteCard` without wiring its 17 emits
  (`MixSourceSelector`, `ExtractWorkbench`, `GenerateControls`). That strengthens pass 2's cure
  (`actions: Partial<Record<PaletteCardAction, …>>` makes non-wiring visible) and it is why L-22's
  desync hypothesis is not idle: the same "consumer forgot half the contract" mechanism is already
  firing on emits and on `isOwned` (pass 2 L-11).
- **Sub-menu enumeration reconfirmed at 9 items** (4 top-level + 5 export), matching pass 3's C-1
  correction.

---

## Greenfield module lattice

Pass 3's lattice (itself pass 2's, plus Amendment 3) is right. I adopt it and add two amendments that
L-19/L-20 and L-23 force.

```
shell/            router, dock, panes — the only role that composes features
  └── palettes/                                     ← feature; owns the palette DOMAIN
        index.ts   Palette, PaletteColor, PaletteVisibility, PaletteKind,
                   getPaletteKind, isOwnedBy, isPubliclyVisible, slug     ← ONE slugifier (L-21)
        api/       endpoints
        export/    index.ts = the byte-exact serializers + the one download effect
                   (…/export.ts and usePaletteExport.ts deleted — pass 1 L-1)
        browser/card/
          actions.ts          PALETTE_ACTIONS descriptors + PaletteCardAction union
          PaletteCard.vue     props: palette, viewer, actions: Partial<Record<…>>
          PaletteCardTile.vue inert; no menu, no emits   (Mix source, Extract preview)
          PaletteCardMenu.vue v-for over PALETTE_ACTIONS ∩ actions — ~30 template lines
                              props: palette, viewer, availability;  model: v-model:open
  └── platform/
        transport/index.ts  useApiClient, ApiClient, ApiAvailability, describeAvailability,
                            Paginated<T>, CursorPaginated<T>          ← envelopes come home (L-24)
        auth/ · storage/
  └── shared/     role-free utilities
  └── (no demo/ui/ — glass-ui subpaths consumed directly)
                    ↓
@mkbabb/glass-ui/<subpath>       design system — primitives + variants live HERE
                    ↓
@mkbabb/value.js  — consumed as an INSTALLED PACKAGE, not as ./dist  (L-19)
                    no self-alias generator, no tsconfig paths block  (L-20)
```

**Amendment 4 (L-19/L-20) — a trust boundary must be an artifact, not a path.** "The demo consumes
the published surface" is only true if the thing it consumes is the published tarball. Today it is a
gitignored directory that demonstrably differs from npm. The lattice change is subtractive: delete
`valueJsSelfAlias` (`vite.config.ts:24-50`) and the `@mkbabb/value.js*` `paths` block
(`tsconfig.demo.json:41-49`), install the package, and let one resolver answer for compile and
runtime. Every line of drift-prevention machinery in both configs exists only because the boundary
was drawn around a path.

**Amendment 5 (L-23) — a wrapper may never publish a weaker model than the primitive it wraps.**
If the wrapped component exposes `v-model:open`, the wrapper exposes `v-model:open` — same name, same
emit spelling — or it exposes nothing and lets the primitive own its state. The rule is checkable:
a prop/emit pair that is two-way in intent but not spelled `x` / `update:x` is a lintable pattern,
and it is the same class of defect as Amendment 3's `===`-against-one-member — a hand-rolled
narrowing of a contract that already exists one layer down.

**Order of value (revised).** Pass 3's ordering stands for the demo-side work; L-19/L-20 slot in
ahead of item 3 because they are pure deletions that make two configs honest:

1. **p2 L-10 + p1 L-3 + p3 L-17 + L-22 + L-23** — `actions.ts`, the handler-map inversion,
   `describeAvailability`, delete the derived `paletteKind` prop, delete the hand-rolled open model.
   One wave; they are the same seam (which actions exist · which are doomed · who owns kind · who
   owns open). Fixes 22 dead affordances, one live enabled-doomed action, one dead guard.
2. **p1 L-1 + L-21** — delete `export.ts` + `usePaletteExport.ts`, promote `export/serializers.ts`
   to `index.ts`, and the second slugifier dies with it. 914 lines of contract code move from
   test-only to shipping; the `caf-noir.json` bug disappears without being separately fixed.
3. **L-19 + L-20** — consume the package, delete both alias mechanisms, gate the `_2` emission.
4. **p2 L-15 + p1 L-2** — delete `demo/ui/`, re-encode the eslint boundary by role. On edict
   grounds; **not** on bytes (C-4).

---

## Negative results (checked this pass)

- **Duplicate library instance in the page — none.** glass-ui imports value.js only via `/color`,
  `/css`, `/easing`, all three of which the Vite self-alias set covers, so the demo holds exactly one
  value.js. Pass 3's `probe-L2-value-instances-results.json` shows only `<repo>/dist/subpaths/*`. The
  installed copy is present but never loaded. (This is the *good* half of L-19: the divergence is
  between an artifact and its own publication, not between two copies in one page.)
- **Split resolution between the app and the test suite — none.** `vitest.config.ts` carries no
  `@mkbabb/value.js` alias and no `dedupe`, which looked like a second regime. It is not: Node
  package self-reference resolves `@mkbabb/value.js/*` to `<repo>/dist/subpaths/*` for any importer
  inside the package, which `demo/test/**` is (`probe-L4-resolve.mjs`). App and tests agree. The
  hypothesis is disproved, and I record it because it is the natural next suspicion after L-19.
- **`dist/` staleness relative to `src/` — none.**
  `find src -name '*.ts' -newer dist/subpaths/color.js | wc -l` → `0`. The local build is current
  with the source; it simply is not the published one.
- **This component imports nothing from `@mkbabb/value.js`** — it cannot falsely prove the public API
  at its own edge. Its cone reaches the library at depth 2, through `export/png.ts:11`
  (`import { oklch, toRgba8 } from "@mkbabb/value.js/color"`) — in the contract set that does not
  ship.
- **`verbatimModuleSyntax`** — clean. `:177` `Palette` and `:178` `PaletteKind` are `import type`;
  everything else at `:176`, `:179`–`:204` is a genuine value import.
- **God module** — not one. 228 lines, 53 of script, two `computed`s, no business logic. Its defects
  are under-specification and leaked dependencies, not accumulation.
- **Animations (edict 6)** — this file defines and deletes no keyframes.
- **Feature → shell direction** — no upward import. `platform/transport` is *below* the feature; the
  defect there is altitude (pass 3 L-18), not direction.

---

## Probes in this directory (pass 4)

| file | what it establishes |
|---|---|
| `probe-L4-slug-and-open.mjs` / `probe-L4-results.json` | L-21 (`cafe-noir-aabbccdd` stored → `caf-noir.json` exported) and L-23 (`openMenusAfterRename: 0`); also re-reproduces L-17 and the 9-item sub-menu |
| `probe-L4-resolve.mjs` / `probe-L4-resolve-results.json` | L-19 (local vs installed artifact comparison, per subpath, js + d.ts) and L-20 (`ERR_PACKAGE_PATH_NOT_EXPORTED` on the bare root) |
| `evidence/pass4/menu-open-saved-misconfigured.png` | first-ever capture of `PaletteCardMenu` rendered; `DEV MISCONFIGURED` chip + enabled un-annotated Publish on one frame |
| `evidence/pass4/menu-open-export-submenu.png` | the Export sub-menu open — the five items whose handlers are the legacy serializers (p1 L-1) |
| *(scratchpad)* `vite.barrel.ts` + `root-entry.js` / `sub-entry.js` | C-4: root-barrel 20,333 B vs subpath 20,337 B — the `demo/ui/` byte claim is dead |
