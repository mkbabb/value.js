# CHALLENGE-L — PaletteCard: the library structure underneath (pass 5)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. Task named HEAD `c654824e`;
  the tree is at **`fe8785e5`** (`docs(megatranche): bank the consumer CRUD and Goldilocks DAG
  audit`). The advance touches three demo files, none of them in this component's cone:
  `git diff --stat c654824e..fe8785e5 -- demo/ src/` → `demo/palettes/api/admin-palettes.ts`,
  `demo/palettes/api/index.ts`, `demo/palettes/useAdminUsers.ts`; the same command over
  `demo/palettes/browser/card/ demo/color-session/ demo/ui/ demo/styles/` is **empty**. Every prior
  pass's source citation still resolves.
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` (364 L) + its five folder
  siblings + `card/composables/` (4 modules) + the two `card/` siblings they consume.
- Design system under test: `@mkbabb/glass-ui@7.0.0`, read from the installed tree.
- Published library surface under test: `package.json#exports`, `src/subpaths/`, `dist/`,
  `tsconfig.demo.json#paths`, `vite.config.ts` self-alias generator.
- Live probes: dev server `http://localhost:9000`, Playwright/WebKit, read-only except
  `localStorage` seeding in an isolated profile. Artifacts: `probe-L5.mjs`,
  `evidence/L5-results.json`.
- Owner marks in scope: **MT-F036** (`OM-11-palette-card-shadow-artifacts.png`,
  `OM-12-palette-card-shadow-artifact-closeup.png`) — both read at 1:1, both re-measured, and the
  **shadow half is re-dispositioned** in §7 on new evidence.
- Verdict: **DEFECTIVE** — **3 new MAJOR, 3 new MINOR, 1 new INFO**, on top of 42 open findings.

### Supersession notice — nothing lost

Four CHALLENGE-L reports have occupied this path. All are preserved verbatim:

- `challenge-L-library.pass-1-2026-07-24.md` — L-1..L-14
- `challenge-L-library.pass-2-2026-07-27.md` — L-15..L-24
- `challenge-L-library.pass-3-2026-07-27.md` — L-25..L-33
- `challenge-L-library.pass-4-2026-07-27.md` — L-34..L-42

Pass 5 numbers from **L-43**. Where it lands on ground a prior pass touched, the section says so and
states exactly what is new. §6 re-verifies the carried dockets; §3 records what I *tried* to
convict and could not.

Housekeeping, recorded because it happened: a prior seat's shell-quoting accident had left an empty
directory tree named
`challenge-L-library.md (pass 2; the prior seat's pass-1 report is preserved verbatim at /Users/…/PaletteCard`
inside this folder — 12 nested empty dirs, **zero files** (`find … -type f` → 1 leaf dir, no
regular files). Removed. No report content existed in it.

---

## 0. What pass 5 went at

Pass 4 asked whether the seam was enforced, whether the card touches the library, and what the
wrong-home exporter emits. Three questions it did **not** ask:

1. **Is the shell one recipe or three?** Every pass reasoned about "the card"; DESIGN.md calls
   PaletteCard + its skeleton "**one shared shell**". Nobody diffed the three class strings against
   each other or against the token DESIGN.md normatively assigns. They have already diverged in two
   properties, and one of the divergences **is** the owner's shadow mark.
2. **Is the published `@mkbabb/value.js` surface map correct?** Pass 4 counted the card's edges to
   the library (zero). Nobody audited the *map an author would consult to add one*. Four of its
   eight entries are wrong, and the whole block turns out to be unnecessary.
3. **Who owns a palette row's identity?** The card takes `expanded: boolean` and lets each host
   invent the key. Three hosts invented **two different key spaces** against **one** shared ref.

Plus one refinement the owner's mark forces: pass-3 L-25 established that `.cartoon-cast`'s rule is
in an orphaned producer file. It is not merely orphaned — the same rule has a **second home inside
glass-ui that IS reachable**, and that changes the BJ ask.

---

## L-43 · MAJOR (new; owner mark MT-F036, shadow half — **re-dispositioned**) — the rung-2 "one shared shell" has three homes and has already drifted; the card paints a shadow rung its own normative spec forbids

### The normative assignment

`demo/DESIGN.md:98`, §Surfaces — **THE MATERIAL LADDER (NORMATIVE — T.W3-1 / SYNTHESIS §2 D1)**,
rung 2 · WELL:

> … dashed edge / **`--shadow-cartoon-sm`** where the affordance calls for it | `.dashed-well` ·
> **PaletteCard (+skeleton — one shared shell)** · …

`demo/styles/utils.css:122` says it again, naming the component:

> `stamp   — --shadow-cartoon-sm, the chip-scale elevation PaletteCard rides;`

### What the three files actually declare

| file:line | root class string | shadow | border |
|---|---|---|---|
| `PaletteCard.vue:19` | `group rounded-card **cartoon-surface** border-card-edge bg-well cursor-pointer` | `--shadow-cartoon-**md**` (via the utility) | **2px** (via the utility) |
| `PaletteCardSkeleton.vue:34` | `skeleton-ink-register rounded-card **border** border-card-edge bg-well overflow-hidden **shadow-cartoon-sm**` | `--shadow-cartoon-**sm**` | **1px** |
| `ShadowPalette.vue:43` | `shadow-palette skeleton-ink-register rounded-card **border** border-card-edge bg-well overflow-hidden **shadow-cartoon-sm**` | `--shadow-cartoon-**sm**` | **1px** |

`cartoon-surface` is not a demo class. It is a producer Tailwind `@utility`
(`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css`), and it hard-codes the rung:

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

### Measured live (`probe-L5.mjs` §A, `evidence/L5-results.json`)

```json
"cardBoxShadow":            "oklab(… / 0.32) -3px 3px 0px 0px, oklab(… / 0.26) -5px 5px 0px 0px, oklab(… / 0.18) -7px 7px 0px 0px",
"token_shadow_cartoon_sm":  "oklab(… / 0.32) -2px 2px 0px 0px, oklab(… / 0.26) -3px 3px 0px 0px, oklab(… / 0.18) -4px 4px 0px 0px",
"token_shadow_cartoon_md":  "oklab(… / 0.32) -3px 3px 0px 0px, oklab(… / 0.26) -5px 5px 0px 0px, oklab(… / 0.18) -7px 7px 0px 0px",
"cardShadowEqualsSm": false,
"cardShadowEqualsMd": true,
"cardBorderWidth": "2px",
"cardBorderStyle": "solid"
```

The card's shadow is **byte-identical to `md` and unequal to `sm`**. The contact layer sits at
**7 px vs the specified 4 px — 75 % deeper**, across three zero-blur layers. That *is* the
"hard-edged faceted shadow slab" of `OM-11`, and at 1:1 in `OM-12` the three discrete steps are
individually countable. The owner marked a real, spec-violating paint.

### Why this is a library-structure finding

The concept is *"the rung-2 WELL card shell"*. DESIGN.md asserts it has **one** home ("one shared
shell"). In the tree it has **three**, each an independently hand-typed class string, and they have
already drifted on two of the four properties that define the material (shadow rung, border weight).
Nothing can detect the drift: a class string is not a type, and `vue-tsc` never sees it.

The concrete cost beyond the owner's mark: the loading skeleton and the loaded card are **not the
same shell**. When rows arrive, every card's border snaps 1px→2px and its shadow steps
−2/−3/−4 → −3/−5/−7. `PaletteCardSkeleton.vue:6-8` exists precisely to prevent that, and says so:

> The shell speaks the same card grammar as PaletteCard (hairline + glass rung + **chip-scale
> cartoon stamp**) so the ghost reads as "a palette card developing", not a foreign grey box.

"Chip-scale cartoon stamp" is `--shadow-cartoon-sm`. The skeleton kept the contract; the card left
it.

The demo already owns the correct home and only built the dashed half of it.
`demo/styles/utils.css:90` defines `.dashed-well` as exactly this recipe —
`border: 1.5px dashed var(--card-edge); border-radius: var(--radius-card); background: var(--well-bg);
box-shadow: var(--shadow-cartoon-sm);` — and its header (`:86`) records that `.dashed-well` was
itself once *"a never-defined phantom (inv-N-7)"* before being minted. **The solid sibling was never
written**, so three components inline it by hand. That is not a missing abstraction to be invented
(edict 3 forbids inventing one); it is an existing utility with a missing member.

### Why the producer cannot express it either

`CardProps.cartoon` is a **boolean** (`dist/components/card/Card.vue.d.ts:10-11`):

```ts
/** Static Memphis edge treatment; it does not add command behavior. */
cartoon?: boolean;
```

There is no rung selector, so `<Card cartoon>` also yields `md`. And neither producer axis carries
the WELL material at all — `SurfaceMaterial = "content" | "elevated" | "functional" | "overlay"`
(`dist/components/surface/Surface.vue.d.ts:5`), `SurfaceTier = "wash" | "quiet" | "resting" |
"floating" | "overlay"` (`dist/components/_shared/axes.d.ts:5-6`).

**Disposition — split, not wholly BJ.** Pass-4 L-38 routed the entire shadow half of MT-F036 to the
producer. On this evidence that is half right:

- **Demo-side, curable now, no producer dependency**: the component rides `md` where its own
  normative ladder says `sm`. Give `utils.css` the solid `.well-card` sibling of `.dashed-well`
  (ONE home, ONE token, `--shadow-cartoon-sm`, `--card-edge`, `--well-bg`, `--radius-card`) and have
  PaletteCard, PaletteCardSkeleton and ShadowPalette all consume it. Three hand-typed strings → one
  named material. This is root-level styling (edict 5), not a per-instance override.
- **BJ ask (§7)**: the cartoon axis is under-parameterised — `cartoon?: boolean` cannot address the
  `sm/md/lg` rungs the producer's own tokens define. `cartoon?: boolean | "sm" | "md" | "lg"`.

---

## L-44 · MAJOR (new; refines pass-3 L-25) — `.cartoon-cast` has **two** homes inside glass-ui 7.0.0, and the one that reaches consumers is descendant-scoped, so repairing the orphan import would create a conflict rather than a cure

Pass-3 L-25 established that the demo's `<span class="cartoon-cast">` (`PaletteCard.vue:30`) is dead
markup because `dist/styles/glass/glass-atom.css` is imported by nothing. True, and re-confirmed.
What it did not establish is that the producer ships the same private child **twice**.

Orphan census, measured over the whole published stylesheet graph:

```
$ python3 - <<'EOF'   # walk every .css in dist, collect @import "...glass/..."
files in dist/styles/glass: 21
imported by some stylesheet: 19
ORPHANS: ['glass-atom.css', 'glass-chip.css']
importer of ladder.css: node_modules/@mkbabb/glass-ui/dist/styles/glass.css
EOF
```

Two orphans, not one. And the *reachable* copy lives in `dist/styles/glass/liquid-enter.css`
(imported by `glass.css`), where the identical declarations are scoped to a parent class:

```css
.liquid-enter.is-cel > .cartoon-cast {
    position: absolute; inset: 0; z-index: -1;
    border-radius: inherit; box-shadow: var(--shadow-cartoon-md); pointer-events: none;
}
```

Enumerated from the **live cascade** on a rendered card (`probe-L5.mjs` §B — 40 stylesheets, 0
unreadable):

```json
"castSelectorsInCascade": [
  "[SURFACE] .cartoon-surface",
  ".liquid-enter.is-cel > .cartoon-cast",
  ".liquid-enter.is-cel > .cartoon-cast",
  ".liquid-enter.is-cel > .cartoon-cast",
  ".liquid-enter.is-cel > .cartoon-cast"
],
"castElementPresent": true,
"castMatchesAnyCastRule": false,
"castComputed": { "position": "static", "zIndex": "auto", "boxShadow": "none",
                  "display": "inline", "inset": "auto", "borderRadius": "0px",
                  "width": 0, "height": 0 },
"cartoonPressT": "0",
"cardPressT": "0.0000"
```

Four `.cartoon-cast` rules are loaded; the card's span matches **none** of them
(`castMatchesAnyCastRule: false`), because the card root carries no `liquid-enter is-cel`. It
computes `static / inline / no shadow / 0 × 0` — a `<span>` rendered for a contract that, in this
consumer, does not exist in either of its two producer homes.

The same block re-confirms pass-3 L-26 live: **`--cartoon-press-t` = `0`** (the registered
`@property` initial) while the component writes **`--card-press-t` = `0.0000`**. `useLiquidPress`
writes exactly `{[pressVar]: value}` and nothing else
(`dist/useLiquidPress-BOxuDkKa.js`, the `pressStyle` computed) — so the press drive
`PaletteCard.vue:263-267` feeds a custom property no stylesheet in the app reads. Grep confirms the
name is a demo invention:

```
$ grep -rn "card-press-t" demo src | cut -c1-120
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:29:  … rides --card-press-t, PRM-zeroed. -->
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:260: // … writing --card-press-t for
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:264:     pressVar: "--card-press-t",
$ grep -rl "card-press-t" node_modules/@mkbabb/glass-ui/dist/    # → (no output)
```

**Why this changes the ask.** Pass-3's relay was "the orphan import is missing; add it." Adding it
would put an **unscoped** `.cartoon-cast` rule into the cascade alongside the existing
`.liquid-enter.is-cel > .cartoon-cast` rule — two definitions of one private child, differing in
specificity and in whether they animate. The correct producer cure is consolidation plus
encapsulation: **one** cast definition, **emitted by `<Card>` itself**, so no consumer ever types
the class name. A private DOM contract a consumer must hand-forge is the defect; a second copy of it
is the aggravation.

The demo-side half needs no producer at all: **delete the span and the `pressVar` line.** Both are
inert today; keeping inert markup that documents a false guarantee ("PRM-zeroed", `:29`) is worse
than not having it.

---

## L-45 · MAJOR (new) — the map of the published `@mkbabb/value.js` surface is 3/8 phantom, the map has no root at all, and the whole block is unnecessary

This seat is asked whether the component imports the library "through the published subpath export
map… The published surface is in `package.json` `exports` + `src/subpaths/`." The card cone has zero
value.js edges (pass-4 L-35). So I audited the map an author would consult **to add one**.

### The three declarations of the surface, side by side

```
$ python3 -c "import json;print(list(json.load(open('package.json'))['exports'].keys()))"
['./color', './value', './css', './easing', './math', './transform', './quantize']

$ ls src/subpaths/
color.ts  css.ts  easing.ts  math.ts  quantize.ts  transform.ts  value.ts
```

Seven keys. **No `"."` root.** `src/subpaths/` matches the map exactly — the library's own two
declarations agree.

`tsconfig.demo.json` disagrees, and its header states the disagreement as fact (verbatim, the
comment immediately above the `paths` block):

> `The value.js published surface: the bare "." root + the 7 subpath barrels, each → its
> dist/*.d.ts (the T.W1 demo-dogfood keystone; TS paths needs an explicit per-subpath entry — there
> is no .../* wildcard because the exports map is a CLOSED 8-key set). Mirrors the vite.config.ts
> runtime self-alias generated from the same map.`

There is no bare `"."` root in the map to mirror, and the vite generator — which reads the same map
— accordingly emits no bare alias.

It declares eight entries: bare, `/color`, `/parsing`, `/math`, `/easing`, `/units`, `/transform`,
`/quantize`. Against the real map: **`/value` and `/css` are absent, and `/parsing`, `/units` and
the bare root are inventions.** Their targets do not exist:

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts \
           dist/subpaths/value.d.ts dist/subpaths/css.d.ts; do printf "%-34s " $f; \
      [ -f "$f" ] && echo EXISTS || echo MISSING; done
dist/index.d.ts                    MISSING
dist/subpaths/parsing.d.ts         MISSING
dist/subpaths/units.d.ts           MISSING
dist/subpaths/value.d.ts           EXISTS
dist/subpaths/css.d.ts             EXISTS
```

Neither the checkout's `dist/` nor the published tarball (`node_modules/@mkbabb/value.js@4.0.0`,
installed as glass-ui's peer) contains any of the three.

### Both runtimes agree the root is not public

```
$ node -e "import('@mkbabb/value.js').then(m=>console.log('BARE OK',Object.keys(m).length)).catch(e=>console.log('BARE FAIL:',e.code,'|',e.message.split('\n')[0]))"
BARE FAIL: ERR_PACKAGE_PATH_NOT_EXPORTED | No "exports" main defined in /Users/mkbabb/Programming/value.js/package.json

$ node -e "import('@mkbabb/value.js/color').then(m=>console.log('SUBPATH OK',Object.keys(m).length))"
SUBPATH OK 23
```

And TypeScript, resolved with the demo program's own parsed options
(`ts.resolveModuleName`, `moduleResolution = Bundler`, containing file
`demo/color-session/ink.ts` — the card's only route to the library, via `useSafeAccentFn`):

```
@mkbabb/value.js               UNRESOLVED
@mkbabb/value.js/color         dist/subpaths/color.d.ts
@mkbabb/value.js/css           dist/subpaths/css.d.ts
@mkbabb/value.js/value         dist/subpaths/value.d.ts
@mkbabb/value.js/parsing       UNRESOLVED
@mkbabb/value.js/units         UNRESOLVED
@mkbabb/value.js/math          dist/subpaths/math.d.ts
@mkbabb/value.js/easing        dist/subpaths/easing.d.ts
@mkbabb/value.js/quantize      dist/subpaths/quantize.d.ts
@mkbabb/value.js/transform     dist/subpaths/transform.d.ts
```

### The block is not merely wrong — it is unnecessary

Look at the `/css` and `/value` rows. They have **no `paths` entry** and they still resolve to the
checkout's own `dist/subpaths/*.d.ts` (absolute paths verified:
`/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts`, `isExternalLibraryImport: false`).
That is Node/TypeScript **package self-reference**: a package whose `package.json` has a `name` and
an `exports` map may import itself by name. The keystone the header attributes to the hand-written
`paths` block is delivered by the `exports` map alone.

So the block buys nothing and costs drift — which is exactly the drift measured above. And the
runtime half is already immune for the right reason: `vite.config.ts:37-50` **generates** its alias
set from `package.json#exports`, so it cannot drift; it emits seven anchored regexes and, correctly,
no bare entry.

Two further stale claims in the same header, both measurable:

- *"glass-ui's published `dist/` imports the value.js core by the bare `@mkbabb/value.js`
  specifier (aurora/color paths, inv-K-2)."* False at glass-ui 7.0.0 — every one of its six
  value.js-importing chunks uses subpaths only:
  `accent-tone-solve-Cw7WkRD9.js → {/color,/css}`, `value-DMhh2R94.js → {/color,/css}`,
  `color.js → {/color}`, `aurora.js → {/color}`, `easing.js → {/css,/easing}`,
  `dock.js → {/color}`. Nothing in the installed tree imports the bare specifier.
- *"a CLOSED 8-key set"* / *"the 8 public keys"* — the set is seven, and does not include a root.

**Cure (transposition).** Delete the eight value.js entries from `tsconfig.demo.json#paths` entirely.
Self-reference then makes `package.json#exports` the single source of truth for both the type
resolver and (via the existing generator) the bundler, and the class of drift found here becomes
structurally impossible. If a bare root is genuinely wanted, add `"."` to `exports` — do not keep a
`paths` entry that grants a specifier the package refuses to serve. Correct the header's three
factual claims or delete them.

---

## L-46 · MINOR (new) — one host wires 15 of 16 emits, another 1 of 16; the surface is measured, and the prior denominator was wrong

Pass-1 L-3 and pass-4 §1 both quote "18 emits". The parsed surface is **16 emits / 10 props**:

```
emits: 16 ['click','delete','publish','save','vote','rename','editColor','addColor','feature',
           'adminDelete','setVisibility','fork','versions','flag','editTags','export']
props: 10 ['palette','expanded','cssColor','isOwned','editableName','isAdmin','showSlug',
           'draggable','layout','swatchClass']
```

Wiring, all six hosts, counted by kebab-cased listener presence:

| host | wired | unhandled |
|---|---:|---|
| `demo/palettes/BrowsePane.vue` | **15/16** | `publish` |
| `demo/palettes/PalettesPane.vue` | 7/16 | save, vote, feature, adminDelete, setVisibility, fork, versions, flag, editTags |
| `demo/palettes/browser/admin/AdminUsersPanel.vue` | 3/16 | 13 |
| `demo/workbenches/extract/ExtractWorkbench.vue` | 4/16 | 12 |
| `demo/workbenches/mix/MixSourceSelector.vue` | **1/16** | 15 |
| `demo/workbenches/generate/GenerateControls.vue` | **1/16** | 15 |

Mean 5.2/16 — **67 % of the published surface is unhandled at the average call site**. Two hosts
consume the component for exactly one event (`click`) and inherit fifteen silently-dropped menu
actions, because `PaletteCardMenu` renders from `paletteKind`/`isOwned`/`isAdmin`, never from what
the host can service. Combined with pass-1 L-4's untyped `Record<string, () => void>` +
`if (!fn) return` (`PaletteCard.vue:315-316`), a user in Mix can open the menu and pick Delete and
nothing happens, with no diagnostic anywhere.

This is the carried finding with a corrected denominator and its first full census; the structural
cure is pass-4 §2's: one `activate` + one discriminated-union `action`, so an unhandled member is a
compile error rather than a no-op.

---

## L-47 · MINOR (new) — one shared `expandedId` ref, two identity key spaces; the card's `expanded: boolean` pushes row identity out to hosts that disagree

`demo/palettes/usePaletteActions.ts:24` declares one cell:

```ts
const expandedId = ref<string | null>(null);
function toggleExpand(id: string) { expandedId.value = expandedId.value === id ? null : id; }
```

`usePaletteActions` is instantiated **once** (`usePalettePorts.ts:92`) and the same ref is handed to
all three ports (`usePalettePorts.ts:144, 177, 226`). The consumers key it differently:

```
demo/palettes/PalettesPane.vue:87        :expanded="pm.expandedId.value === palette.id"     @click="pm.toggleExpand(palette.id)"
demo/palettes/BrowsePane.vue:97          :expanded="pm.expandedId.value === palette.slug"   @click="pm.toggleExpand(palette.slug)"
demo/palettes/browser/admin/AdminUsersPanel.vue:144  :expanded="expandedId === palette.slug"
```

The two axes are disjoint by construction — `usePaletteStore.ts:85` mints `id: crypto.randomUUID()`
while `utils.ts:14` mints `slug` as `${slugify(name)}-${uuid.slice(0,8)}` — and the writers inside
the composable use the **id** axis (`usePaletteActions.ts:76` `expandedId.value = palette.id`;
`:81` `expandedId.value = id`).

**Reproduction: NONE — labelled a hypothesis for the cross-talk half.** I did not drive a case where
one pane's key spuriously matches another's; a UUID colliding with a slug is not reachable in
practice. What is *not* a hypothesis is the structural fact: one untyped `string` cell carries two
key spaces, `toggleExpand(id: string)` accepts either, and the type system cannot tell them apart.
The observable consequence is that an expansion opened in Palettes is silently un-expandable in
Browse and vice versa, because the surviving value can never match in the other pane.

**Root cause in the component's surface.** `PaletteCard` takes `expanded?: boolean` and emits a
payload-free `click`. It publishes `palette: Palette` — it *holds* the row's identity — and then
declines to use it, so every host must re-derive a key and they chose differently. Cure: the card
owns row identity (`@activate: [palette: Palette]`, host compares `palette` or a branded
`PaletteRowKey`), or the list owner owns expansion entirely (pass-4 §2's `PaletteGrid`). Either way
the string cell dies.

---

## L-48 · MINOR (new) — a dead `@source` directive in the stylesheet that emits every utility on the card's root

`demo/styles/foundation.css:91-92`:

```css
@source "../../color-picker/**/*.{vue,ts,html}";
@source "../**/*.{vue,ts,html}";
```

Tailwind v4 resolves `@source` relative to the containing CSS file. This file is at
`demo/styles/foundation.css`, so `../../color-picker` is **`<repo>/color-picker`**:

```
$ ls -d color-picker;      ls: color-picker: No such file or directory
$ ls -d demo/color-picker; demo/color-picker
```

The block comment above it still describes the file's pre-W43 home — *"The paths resolve relative to
THIS file (`demo/@/styles/`): `../../color-picker` reaches the App.vue shell, `..` reaches the `@/`
component/composable tree"* — a tree deleted at W43 (`demo/@` does not exist).

Not currently breaking: the sibling `@source "../**"` is `demo/**`, which subsumes
`demo/color-picker/**`. But the file's own header explains at length that the explicit scan exists
so coverage is *"EXPLICIT and git-independent"* and names a CI probe
(`scripts/ci/css-emission-probe.mjs`) that asserts it. One of the two directives it relies on is a
no-op, and the probe passes on the other. This is card-relevant because **every utility on
`PaletteCard.vue:19`** — `rounded-card`, `bg-well`, `border-card-edge`, `cartoon-surface`,
`cursor-pointer` — is JIT-emitted from this scan.

This is the fifth instance of pass-1 L-12's stale-citation mechanism (after pass-3 L-33, pass-4
L-39, and the ten `PaletteDialog.vue` citations to a file that does not exist).

---

## L-49 · INFO (new; quantifies pass-1 L-2) — the shim census, and the dual path inside one file

`demo/ui/` is 19 directories. Every one contains exactly one file, `index.ts`, and every one of those
is a pure re-export of glass-ui with **zero local implementation**:

```
$ for d in demo/ui/*/; do echo "$(basename $d): $(ls $d | tr '\n' ' ')"; done
alert: index.ts      avatar: index.ts     badge: index.ts      button: index.ts
card: index.ts       checkbox: index.ts   collapsible: index.ts dialog: index.ts
dropdown-menu: index.ts  input: index.ts  label: index.ts      popover: index.ts
radio-group: index.ts    select: index.ts separator: index.ts  skeleton: index.ts
slider: index.ts     switch: index.ts     tooltip: index.ts

$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

Measured reach across the demo:

```
$ grep -rn 'from "[^"]*ui/(alert|avatar|badge|…|tooltip)"' demo | wc -l   →  92
$ grep -rn 'from "@mkbabb/glass-ui"' demo | wc -l                          →  37
```

**92 import sites go through the forwarding layer; 37 files import the design system directly.** Two
live paths to one set of symbols — the shim being exactly the *"legacy-compat shim / alias"* edict 2
forbids and the *"wrapper component that earns nothing"* edict 3 forbids.

PaletteCard walks **both, five lines apart**:

```ts
// PaletteCard.vue:165-171
import { Badge } from "../../../../ui/badge";        // → @mkbabb/glass-ui
import { Button } from "../../../../ui/button";      // → @mkbabb/glass-ui
import { Award, MoreHorizontal, GripVertical } from "@lucide/vue";
import type { Palette, PaletteColor } from "../../../types";
import { getPaletteKind, type PaletteKind } from "../../../utils";
import { writeClipboard } from "@mkbabb/glass-ui";   // ← direct
```

`demo/DESIGN.md:384` still instructs authors to use the shim ("consume `Alert` … from
`@components/ui/alert` … The barrel exists for ergonomics"), citing an alias retired at W43.
`sed -i` on 92 sites is a mechanical, reviewable change; the shim's only argument is that it is
already there.

---

## 1. The decomposition, judged (pass-5 reading)

Pass-4 §1 tabulated prop-flow and convicted `PaletteCardSwatches` as a pure conduit (8 in / 8 out /
0 state). I re-derived the table and agree on every row. Pass 5 adds the axis pass 4 did not measure
— **what each file owns of the card's *material*** — because the owner's question is whether the
six-file split is along real seams.

| file | owns behaviour | owns material | verdict |
|---|---|---|---|
| `PaletteCard.vue` | 5 refs, 2 composables, press drive, menu dispatch, 3 popover handlers | **the whole shell** (`:19`) + 2 scoped rules | the god module; also the sole material owner |
| `PaletteCardSwatches.vue` | none | 6 hand-typed button recipes (`:14,44,51,58`) | conduit — 8 in / 8 out / 0 decisions |
| `PaletteCardMenu.vue` | `apiOffline`, `isPublic` | menu item classes | **the one real seam** — own data dependency |
| `PaletteCardMeta.vue` | none | chip + vote-button recipes | legitimate leaf |
| `PaletteRenameInput.vue` | 1 ref, focus/select on mount | `.input-bar` + 2 button recipes | legitimate leaf |
| `ActionFeedback.vue` | dismiss timer | chip recipe + 3 CSS vars | should not exist (glass-ui ships `./toast` — pass-3 L-29) |

The material column is the new information and it is the sharper indictment. **The split moved
markup and left material ownership entirely undistributed**: the parent owns the shell, and each
child independently hand-types its own interactive recipe. `PaletteCardSwatches.vue:44,51,58` repeat
the same 9-utility button string three times verbatim; `PaletteRenameInput.vue:20,26` repeat a
near-identical pair; `PaletteCardMeta.vue:45` a third variant. Six files, **nine hand-typed
icon-button recipes**, in a repository whose edict 4 says the design system owns variants and whose
`demo/ui/button/index.ts` re-exports a `Button` with an `icon-only` prop that
`PaletteCard.vue:96-104` already uses correctly. The one file that consumes the primitive is the
parent; every child hand-rolls.

So the answer to the owner's question is: **the split is along markup length, not along seams, and it
is worse than pass 4 said** — it did not merely fail to distribute behaviour, it multiplied material
ownership from one home to nine. Against edict 1 (no god modules): the parent is still the god
module *and* the children each acquired a small private one.

Against edict 3 (KISS, no contrivance): the folder is not a `shared/` dir, so the letter is intact.
`PaletteCardSwatches` and `ActionFeedback` are the wrapper-that-earns-nothing the edict aims at.

---

## 2. The lattice I would build greenfield

Pass-4 §2 stated one. I concur with its shape and state it again with the three corrections this
pass earned; the deltas are marked **←new**.

```
@mkbabb/value.js/css                    parse + serialize; the ONE colour representation.
                                        Reached by SELF-REFERENCE off package.json#exports —
                                        no tsconfig `paths` block at all.               ←new (L-45)
      ↑
demo/palettes/model/                    Palette, PaletteColor(parsed), PaletteRowKey (branded),
                                        kind, slug — types + utils merged, no flat drawer.
                                        PaletteRowKey kills the id/slug split.           ←new (L-47)
demo/palettes/export/                   the contracted serializers, renamed index.ts, sole home
demo/palettes/store/                    usePaletteStore + ports; owns rows, owns certified ink per row
      ↑
demo/styles/utils.css  ·  .well-card    the rung-2 WELL material, ONE home, the solid sibling of
                                        the existing .dashed-well; --shadow-cartoon-sm.  ←new (L-43)
      ↑
demo/palettes/browser/index.ts          the seam — with a LIVE lint rule naming the real tree
      ↑
PaletteGrid.vue                         list; owns selection, drag, expansion (by PaletteRowKey),
                                        and the ONE certified-ink instrument
PaletteRow.vue                          ← the card, ~120 L
   ├ .well-card                         no cartoon-surface, no .cartoon-cast span, no pressVar
   ├ <PaletteColorStrip>                already correct
   ├ header: <button> around the name = the ONE activator; <Chip> ×N; <Toast> via useToast()
   ├ <PaletteRowMenu>                   the real seam; keeps its own data dependency
   └ <ExpandableContainer v-model:open> glass-ui ./expandable-container
        └ <SwatchStrip>                 owns the popover machine WHOLE; <Button icon-only> ×3,
                                        not three hand-typed 9-utility strings          ←new (§1)
```

Deletions this implies: `PaletteCardSwatches.vue`, `ActionFeedback.vue`, `useHeightTransition.ts`,
`useLeaveTimer.ts`, `demo/palettes/export.ts` + `usePaletteExport.ts`, the `.cartoon-cast` span, the
`pressVar: "--card-press-t"` line, the `group` class, the 19 `demo/ui/*` forwarding dirs, and the
eight `@mkbabb/value.js` entries in `tsconfig.demo.json#paths`.

Surface change: **16 emits → 2** (one `activate`, one `action: PaletteAction` discriminated union),
and `expanded: boolean` → the grid owning expansion. The 5.2/16 mean wiring rate (L-46) becomes a
compile error rather than a silent drop.

Performance consequence, stated because it is the reason to prefer the shape: the certified-ink
instrument goes from *N* instances with *N* global cache invalidations (pass-4 L-40) to one; the
expand animation goes from three hand-forced reflows per card (`useHeightTransition.ts:32,56,63` —
`void htmlEl.offsetHeight`) to the producer's container; and the shell goes from three drifting class
strings to one utility, so the skeleton→card swap stops repainting a different border and shadow.

---

## 3. What I tried to convict and could **not** (pass-5 negatives)

Recorded because a seat that only reports hits is not measuring.

- **"The hand-rolled root forfeits the producer's contrast compensation."** *Refuted by
  measurement.* The card is not a `glass-atom` (`isGlassAtom: false`, `data-surface: null`,
  `data-slot: null`), so I expected `@media (prefers-contrast: more)` compensation to miss it.
  Under WebKit `emulateMedia({contrast:"more"})` it **does** compensate — border α `0.12 → 0.55`,
  shadow α `0.32/0.26/0.18 → 0.42/0.34/0.24` (`probe-L5.mjs` §C). The compensation is token-level,
  not `.glass-atom`-scoped. No finding.
- **"`onPopoverAdd/Edit/Copy` poke `openPopoverIndex.value = null` instead of the composable's
  `close()`, leaving the 250 ms leave-timer armed."** (`PaletteCard.vue:322,327,332` vs
  `useHoverPopover.ts:42-45`.) A duplicated idiom, yes — but both re-entry points call
  `cancelLeave()` first (`useHoverPopover.ts:26` `onHover`, `:51` `onSwatchClick`), so no stale
  timer can close a freshly-opened popover. Duplication only; **no defect**.
- **"`:style="press.pressStyle.value"` (`PaletteCard.vue:25`) double-unwraps."** It does not.
  `press` is a `SETUP_MAYBE_REF` const binding; the compiler emits `_unref(press).pressStyle`, which
  is still the `ComputedRef`, so `.value` is required. Correct as written.
- **"`@import "@mkbabb/glass-ui/styles"` + `"@mkbabb/glass-ui/styles.css"` is a double import"**
  (`foundation.css:56-57`). They are different files — `dist/styles/index.css` (Tailwind-source) and
  `dist/glass-ui.css` (compiled SFC-scoped). Complementary, as the comment says. No finding.
- **"The demo typechecks against the registry copy of value.js while bundling the local `dist/`."**
  *Refuted.* `ts.resolveModuleName` returns `/Users/mkbabb/Programming/value.js/dist/subpaths/*.d.ts`
  for every resolvable specifier, including the two with no `paths` entry. Self-reference wins over
  `node_modules`. No split-brain. (The local `dist/subpaths/css.{js,d.ts}` does differ from the
  published 4.0.0 tarball by one byte — below the threshold of a finding.)
- **`verbatimModuleSyntax` (edict 8).** Re-verified across all six SFCs and all four composables:
  every type-only import carries `import type` or an inline `type` modifier. Zero violations.
- **No deep `src/` reach.** `grep -rn "@src\|\.\./\.\./src" demo/palettes/browser/card/` → no
  matches. The T.W1 ban holds in this cone.
- **The `card/` sub-barrel reach is legal.** `MixSourceSelector.vue:8` imports from
  `"../../palettes/browser/card"` — a sub-barrel the top-level seam re-exports.
- **`inv-K-1` is live.** `npx eslint --print-config demo/color-picker/App.vue` returns the
  G-DEMO-3b object intact for that region; the `src/**` glass-ui ban is likewise live. Only the
  *content* of the demo ban is dead (pass-4 L-39, re-verified below).

---

## 4. Probe log (pass 5)

| # | probe | command / file | result |
|---|---|---|---|
| 1 | shell recipe, card root, live | `probe-L5.mjs` §A | shadow ≡ `--shadow-cartoon-md`, ≠ `-sm`; border `2px solid` → **L-43** |
| 2 | shell recipe, skeleton + shadow-palette | source read `PaletteCardSkeleton.vue:34`, `ShadowPalette.vue:43` | `shadow-cartoon-sm`, `border` (1px) → **L-43** |
| 3 | `.cartoon-cast` selectors in the live cascade | `probe-L5.mjs` §B, 40 sheets | only `.liquid-enter.is-cel > .cartoon-cast` ×4; `castMatchesAnyCastRule:false` → **L-44** |
| 4 | orphan census over `dist/styles/glass/` | python walk of every `@import` | 21 files, 19 imported; orphans `glass-atom.css`, `glass-chip.css` → **L-44** |
| 5 | press var, live | `probe-L5.mjs` §B | `--cartoon-press-t: 0`, `--card-press-t: 0.0000` → **L-44** (pass-3 L-26 confirmed) |
| 6 | `useLiquidPress` writes only `pressVar` | `dist/useLiquidPress-BOxuDkKa.js` `pressStyle` | `{[u]: e.toFixed(4)}` + `--flex-vel` + `scale` → **L-44** |
| 7 | bare specifier, Node | `node -e "import('@mkbabb/value.js')"` | `ERR_PACKAGE_PATH_NOT_EXPORTED` → **L-45** |
| 8 | 10 specifiers, TS resolver, demo options | `ts.resolveModuleName` | 3 UNRESOLVED, 7 → local `dist/` → **L-45** |
| 9 | `paths` target existence | `[ -f ]` ×5 | `index.d.ts`/`parsing.d.ts`/`units.d.ts` MISSING → **L-45** |
| 10 | glass-ui's value.js specifiers | python regex over 6 chunks | subpaths only; **no bare import** → **L-45** |
| 11 | emit/prop surface + 6-host wiring | python parse of `defineEmits`/`defineProps` | 16 emits, 10 props; 15/7/3/4/1/1 → **L-46** |
| 12 | `expandedId` key spaces | `grep -rn expandedId demo/` | one ref (`usePaletteActions.ts:24`), `id` in Palettes, `slug` in Browse+Admin → **L-47** |
| 13 | `@source` path resolution | `ls -d color-picker` vs `demo/color-picker` | `<repo>/color-picker` absent → **L-48** |
| 14 | `demo/ui/*` census + reach | `for d in demo/ui/*/`, two greps | 19 dirs, 1 file each, 0 impls; 92 shim vs 37 direct → **L-49** |
| 15 | hover register, live | `probe-L5.mjs` §D | `changedKeys: []` across 9 properties → MT-F036 hover half confirmed |
| 16 | `prefers-contrast: more`, live | `probe-L5.mjs` §C | border α .12→.55, shadow α raised — **hypothesis refuted** (§3) |
| 17 | owner marks OM-11 / OM-12 | image read at 1:1 | three countable hard steps down-left = the `md` rung exactly → **L-43** |
| 18 | skeleton captured live | `probe-L5.mjs` §E | `NO SKELETON OBSERVED` on `/#/browse` — L-43's skeleton row is source-derived + token-measured, not live-captured |

Artifacts: `probe-L5.mjs`, `evidence/L5-results.json`.

---

## 5. Pass-5 ranked docket

| id | sev | one line | cure altitude |
|---|---|---|---|
| **L-43** | MAJOR | the "one shared shell" is three drifting class strings; the card paints `--shadow-cartoon-md` where DESIGN.md + utils.css assign `-sm` (7px vs 4px contact) | demo: `.well-card` beside `.dashed-well`; BJ: `cartoon` rung param |
| **L-44** | MAJOR | `.cartoon-cast` has two producer homes; the reachable one is descendant-scoped, so the card's span matches nothing | delete span + `pressVar`; BJ: consolidate + Card-emit the cast |
| **L-45** | MAJOR | the published-surface map is 3/8 phantom, has no root, and the whole `paths` block is redundant under self-reference | delete the `paths` block; fix 3 header claims |
| **L-46** | MINOR | 16 emits (not 18); mean host wiring 5.2/16, two hosts at 1/16 | discriminated-union `action` |
| **L-47** | MINOR | one `expandedId` ref, two key spaces (`id` vs `slug`) across three hosts | branded `PaletteRowKey`; grid owns expansion |
| **L-48** | MINOR | dead `@source "../../color-picker/**"` in the stylesheet that emits the card's own utilities | re-aim to `../color-picker/**` or delete |
| **L-49** | INFO | 19 forwarding `demo/ui/*` dirs, 0 implementations; 92 shim sites vs 37 direct; PaletteCard uses both, 5 lines apart | mechanical rewrite; delete the dirs + DESIGN.md:384 |

---

## 6. Carried dockets, re-verified at pass 5

Re-checked by direct read at `fe8785e5`; **all still open** unless noted.

- **Pass 1** L-1..L-14 open. L-2 quantified this pass (**L-49**). L-3 re-measured with the corrected
  denominator (**L-46**). L-8 re-confirmed: two `slugify` implementations with different
  normalisation — `demo/palettes/export.ts:9` (ASCII-only, no NFKD) vs `demo/palettes/utils.ts:3`
  (NFKD + combining-mark strip). L-11 re-confirmed: `ActionFeedback.vue:37-47` still has no
  `onUnmounted`, so the dismiss timer outlives the component. L-13 (zero visual-matrix coverage)
  re-confirmed at §4 #18 — the captured routes render empty states, so no shipped screenshot shows
  this component at all.
- **Pass 2** L-15..L-24 open. L-18 remains escalated by pass-4 L-34.
- **Pass 3** L-25..L-33 open. **L-25 refined by L-44** (two homes, not merely one orphan).
  **L-26 re-measured live** (`--cartoon-press-t: 0` vs `--card-press-t: 0.0000`).
- **Pass 4** L-34..L-42 open, all re-verified:
  - **L-34** (Export→SVG injection): the wiring is unchanged. `demo/palettes/usePaletteExport.ts:9`
    imports from `"./export"` — the legacy module — and `BrowsePane.vue:115` /
    `PalettesPane.vue:96` are its only call sites. The contracted set has exactly **one** importer
    in the whole repository: `grep -rn "export/serializers" demo test src` →
    `demo/test/export/byte-exact.test.ts:23`. **Zero production consumers.** Confirmed.
  - **L-39** (dead lint globs): re-run this pass.
    `npx eslint --print-config demo/palettes/browser/card/PaletteCard/PaletteCard.vue`
    → `no-restricted-imports => null`. And the ban is inert even where the rule *is* live — a raw
    reach written the modern way passes clean:
    ```
    $ printf '<script setup lang="ts">\nimport PaletteCard from "../palettes/browser/card/PaletteCard/PaletteCard.vue";\n</script>…' \
        | npx eslint --stdin --stdin-filename demo/color-picker/__probe.vue --no-warn-ignored
    EXIT=0
    ```
    The banned pattern is `@components/custom/palette-browser/**/*.vue`; that alias was retired at
    W43, so no import string in the tree can ever match it.
  - **L-36 / MT-F036 hover half** re-measured: `changedKeys: []` across boxShadow, translate, scale,
    transform, backgroundColor, borderColor, filter, opacity, transitionProperty. The root does
    declare `transition-property: all` — a transition for a register that never fires.

Stale-citation instances now at **six**: pass-1 L-12, pass-3 L-33, pass-4 L-39 (load-bearing),
`PaletteDialog.vue` (a file that does not exist, cited 10 times with line numbers — e.g.
`demo/palettes/constants.ts:6`, `useHoverPopover.ts:8`), **L-45** (three false claims in
`tsconfig.demo.json`'s header, load-bearing), **L-48** (`foundation.css:91` + its comment).

---

## 7. Verdict and the marked asks

**DEFECTIVE.** Three new MAJOR, three new MINOR, one new INFO, on top of 42 open findings from
passes 1–4.

The strongest single defect this pass is **L-43**, and it matters more than its severity suggests
because it *changes a disposition the previous pass had already sent upstream*. Pass 4 read the
faceted slab, matched it to a producer token, and routed the whole of MT-F036's shadow half to
glass-ui. The token is indeed the producer's — but the demo's own **normative** material ladder
assigns this component the `sm` rung and the component is riding `md`, because it consumes a producer
utility that hard-codes the rung. The owner marked a shadow that is 75 % deeper than the demo's own
law permits, and roughly half of that is curable in `demo/styles/utils.css` today, with no producer
dependency, by writing the solid sibling of a well that already exists.

That is this docket's recurring mechanism in its purest form. **The concept has more than one home,
and the wrong one won the wiring** — export (pass-2/4), clipboard (pass-4), the `.cartoon-cast` rule
(pass-3/5), the surface map (pass-5), the shell recipe (pass-5). Every finding in five passes is an
instance.

### Owner mark MT-F036 — root cause and disposition (revised)

**Shadow half — SPLIT.** Pass-4's "wholly BJ" reading is superseded on the evidence in L-43.

> **Demo-side, no producer dependency (the majority of the visible defect).** `PaletteCard.vue:19`
> drops `cartoon-surface` and consumes a new solid `.well-card` in `demo/styles/utils.css`, written
> beside the existing `.dashed-well` and using the tokens DESIGN.md §Surfaces rung 2 already
> specifies: `--well-bg`, `--card-edge`, `--radius-card`, **`--shadow-cartoon-sm`**.
> `PaletteCardSkeleton.vue:34` and `ShadowPalette.vue:43` consume the same class, which retires the
> 1px/2px and sm/md drift and makes the skeleton→card swap invisible. This is root-level styling
> (edict 5) in an existing home (edict 3) with one owner (edict 1). The `.cartoon-cast` span and the
> `pressVar: "--card-press-t"` line are deleted in the same change — both measurably inert.
>
> **BJ ask 1 — the cartoon axis is under-parameterised.** `CardProps.cartoon` is `boolean`
> (`dist/components/card/Card.vue.d.ts:11-12`) while the producer's own tokens define three rungs
> (`--shadow-cartoon-sm/-md/-lg`, `dist/styles/tokens/*.css`). A consumer that wants the chip-scale
> stamp has no way to ask for it and must hand-roll — which is how this defect arose. Ask:
> `cartoon?: boolean | "sm" | "md" | "lg"`.
>
> **BJ ask 2 — `.cartoon-cast` has two homes and neither is encapsulated.** The unscoped rule is in
> `dist/styles/glass/glass-atom.css`, which no stylesheet imports (one of two orphans in that
> directory, with `glass-chip.css`); a duplicate scoped to `.liquid-enter.is-cel >` is in
> `dist/styles/glass/liquid-enter.css` and IS reachable. Measured on a live consumer: four
> `.cartoon-cast` rules in the cascade, zero matching the element. Merely adding the missing
> `@import` would create two conflicting definitions. Ask: consolidate to one definition and have
> `<Card>` **emit** the caster itself, so no consumer ever types the class name or the press
> variable.

**Hover half — BJ, unchanged, re-measured.**

> **BJ ask 3 — an interaction register for the card root.** `cartoon-surface` is three declarations
> with no `:hover`, no `:active`, no `transition`; `Card.vue.d.ts` documents `cartoon` as *"Static
> Memphis edge treatment; it does not add command behavior."* Measured on a live PaletteCard: zero
> computed-style change on hover across nine properties, while the root declares
> `transition-property: all` and `cursor: pointer`. Every interactive card in the app therefore has
> no hover affordance. Ask: an interaction register on `Card` — `interactive` / `<Card interactive>`
> — carrying the hover/press choreography at the glass root. Per the owner's standing law this is
> a marked BJ ask and **not** a local patch; the demo must not grow a `.well-card:hover` fork.

Relay all three to the active glass-ui BH inbox per the standing formation invariant
(`feedback-glassui-bhbi-relay`).
