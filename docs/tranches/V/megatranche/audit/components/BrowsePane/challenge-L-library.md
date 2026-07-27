# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue` · PASS 3

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with an explicit declaration for. Declared seat, not inherited. No DEFECT.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief named HEAD `c654824e`; at
read time HEAD is `5c13465d` (one docs-only commit — `docs(V): M-15 — Codex abrogated`). No source
difference on this axis.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

**Scope discipline:** this seat wrote only under
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. No source edits. Three build probes ran;
all three wrote to the session scratchpad with `outDir` redirected — the repo's `dist/` was never
touched. Probe configs are preserved at `./probe/vite.probe{A,B,C}.mts` + `./probe/probe-entry.ts`.

---

## Provenance — two seats had already run this axis

On arrival this path held a 17-finding pass-1 report (13:47) and a 21-finding pass-2 report (17:39)
that rolled pass 1 forward. **Both are preserved byte-identically** at
`challenge-L-library-pass1.md` and `challenge-L-library-pass2.md`. Nothing is lost.

I re-derived the axis independently before reading either. Where we converge I say so and defer to
whichever evidence is stronger. I do not re-litigate what a prior pass proved better than I did —
pass 1's slugifier divergence table, its `import.meta.resolve` root-export proof, pass 2's
`--print-config` proof and its live-commons `curl` are each strictly better than anything I produced
on those points.

**This pass carries what neither prior pass contains.** Novelty is measured, not asserted:

```
$ for t in gh-pages sideEffects main.ts "composition root" rolldown modulepreload empty-mount; do
      grep -ci "$t" challenge-L-library-pass1.md challenge-L-library-pass2.md; done
gh-pages          pass1=0  pass2=0
sideEffects       pass1=0  pass2=0
main.ts           pass1=0  pass2=0
composition root  pass1=0  pass2=0
rolldown          pass1=0  pass2=0
modulepreload     pass1=0  pass2=0
empty-mount       pass1=0  pass2=0
```

Neither prior pass examined the build. Both audited the structure of a tree, correctly. Neither
asked whether that tree reaches production. It does not.

§A rolls both passes forward so this document alone is sufficient. §B carries what is new — one
BLOCKER that outranks every finding in either prior pass, plus three supporting findings. §C is the
joint verdict across all three passes.

**Verdict: DEFECTIVE.**

---

# §A — Passes 1 and 2, rolled forward

Full text: `challenge-L-library-pass1.md`, `challenge-L-library-pass2.md`. Spot-checks I re-derived
independently are marked ✔.

| # | sev | finding | my check |
|---|---|---|---|
| L-1 | BLOCKER | The V.W51 byte-exact export contract (`demo/palettes/export/`, 12 modules, 1,046 L) ships to **nobody**. `usePaletteExport.ts:9` resolves `./export` → the 132-line pre-contract `demo/palettes/export.ts`, which is what `BrowsePane.vue:115,324` runs. Sole consumer of the contract set: `demo/test/export/byte-exact.test.ts:23`. | ✔ **and strengthened — see N-2** |
| L-2 | MAJOR | Three slugifiers (`utils.ts:3-12`, `export.ts:9-11`, `canonical.ts:52-58`), 6-of-6 divergence on non-ASCII, against a contract clause saying *"no slugifier exists"*. | not re-derived; pass-1 evidence stronger |
| L-3 | MAJOR | `demo/ui/**` is pure re-export barrels of glass-ui; BrowsePane reaches the design system **both ways** in one import block (`:180-181` barrel, `:195` subpath). | ✔ **and quantified — see N-3** |
| L-4 / N-2ʹ | MAJOR | G-DEMO-1/3a/3b in `eslint.config.js:220-303` are inert; `--print-config` on the subject file → `no-restricted-imports = undefined`. | ✔ `ls -d demo/@` → No such file or directory; `npx eslint demo/palettes/BrowsePane.vue` → clean |
| L-5 | MAJOR | No `"."` in `package.json#exports`; `import.meta.resolve("@mkbabb/value.js")` → `ERR_PACKAGE_PATH_NOT_EXPORTED`, yet `demo/shared/utils.ts:15-17` asserts a root barrel. | ✔ 7 subpaths, no root |
| L-6 | MAJOR | `BROWSE_PORT_KEY` lives in the provider module, so a leaf pane importing the key pulls the whole 275-line assembly. | ✔ `BrowsePane.vue:182` |
| L-7 | MAJOR | The port smuggles whole sub-composables; the god facade was renamed, not dissolved. | ✔ `browsePort` = **32** members (`usePalettePorts.ts:157-192`); `grep -o "pm\.[a-zA-Z]*" BrowsePane.vue \| sort -u \| wc -l` → **30** direct + `ensureUser`/`ensureSession` transitively = **32/32** |
| L-8 / N-3ʹ | MAJOR | OKLab distance has no home: `BrowsePane.vue:339-349` and `api/.../crud-list.ts:159-180` hand-roll it with the same `0.15`; the typed seam has zero callers; measured, 5 of 10 live palettes are silently excluded. | ✔ re-derived; **extended — see N-4** |
| L-9 | MAJOR | `useDialogBrowseActions` is the duplicate it was written to kill; carries a `modalStack` shim for a host that no longer exists. | ✔ 3 of its 5 members are browse-filter setters over state owned by `useBrowsePalettes.ts:40-41,63` |
| L-10 | MAJOR | `remotePalettes` has no owner — 9 hand-rolled slug-index mutations across 6 modules. | ✔ `BrowsePane.vue:281-282,314-318` |
| L-11 | MAJOR | The typed error vocabulary is discarded at the pane boundary. | ✔ `useBrowsePalettes.ts:79` sets the constant `"Failed to load palettes"` and drops `e` to `console.warn:82`, while `BrowsePane.vue:57-59` promises *"the raw machine string"* on the detail line |
| L-12 | MAJOR | The card-feedback rail is implemented twice and leaks in both copies. | ✔ `BrowsePane.vue:94,209` ≡ `PalettesPane.vue:84,177`; `(el) => el && (…)` short-circuits Vue's `null`-on-unmount call and no `delete` exists in either file |
| L-13 | MINOR | "ONE card species" is a copy-pasted 7-utility string on 8 sites. | ✔ `BrowsePane.vue:2` |
| L-14 | MINOR | `MiniColorPicker.vue` hand-rolls HSV↔RGB↔hex inside a colour library's own demo. | ✔ sibling `SearchFilterBar.vue:206` does reach the library |
| L-15 | MINOR | `.search-seated .input-bar-field` (`demo/styles/utils.css:152`) styles a glass-ui internal class, deliberately unlayered to beat the producer recipe. | ✔ applied at `BrowsePane.vue:12`; exactly **one** consumer tree-wide |
| L-16 | INFO | Masking fallback at the leaf for an untyped wire payload (`availableTags`, `:215-220`). | ✔ |
| L-17 | MINOR | The pane owns half its data lifecycle, app-boot the other half. | ✔ `:222-224` |
| N-1 | MAJOR | `.pane-scroll-fade` — a nine-consumer, four-feature global recipe — lives in `PaneHeader.vue`'s unscoped `<style>`, a component that renders none of its consumers; inverts `DESIGN.md:388`; blocks L-13's cure. | ✔ `BrowsePane.vue:2` is one of the nine |
| N-4 | MINOR | Colour-search state split across the pane/child boundary; `onClearAll` double-fires and nulls the same ref twice. | ✔ `BrowsePane.vue:23-25,329-332,357-359` |
| N-5 | INFO | `./value` and `./transform` are published with zero demo consumers. | ✔ |

---

# §B — New in pass 3

## N-6 · BLOCKER — the composition root has no module home; the production build ships zero application code

**Not in either prior pass** (novelty table above). This outranks pass-1 L-1.

### The defect

`demo/color-picker/index.html:205-213` **is** the application entry. There is no `main.ts`:

```html
<script type="module">
    import { createApp } from "vue";
    import App from "./App.vue";
    import { router } from "./router/index";

    const app = createApp(App);
    app.use(router);
    app.mount("#app");
</script>
```

Eight lines of JavaScript with no file. Under this repo's pinned toolchain (`vite@8.0.16` +
rolldown) the inline module's **body is dropped at build time**. The build still emits an entry
chunk and still rewrites the tag to point at it — but the chunk contains only Vite's modulepreload
polyfill:

```
$ ls -la dist/gh-pages/assets/ | grep -Ev "woff|ttf"
  1128    favicon-BpOvZXpk.svg
132943    glass-fonts-DH5GtBvs.css     # deferGlassFonts plugin — emitted independently of the graph
   698    index-Dezn_h7o.js            # the "entry": modulepreload polyfill, nothing else
 11774    quantize-worker-xMwe415C.js  # a separate worker entry, unaffected
```

No `index-*.css`. No Vue. No router. No panes. `dist/gh-pages/index.html` still carries
`<div id="app">` and `<script type="module" crossorigin src="./assets/index-Dezn_h7o.js">`. That
script mounts nothing.

### Three probes

Each differs from the repo config in exactly one respect; all write to the scratchpad.
Configs preserved at `./probe/`.

| probe | delta from repo config | JS chunks | total JS bytes | `BrowsePane` chunk |
|---|---|---:|---:|---|
| **A** | none (only `outDir` redirected) | 2 | **12,472** | **absent** |
| **B** | `+ treeshake: { moduleSideEffects: true }` | 2 | 12,472 | absent |
| **C** | composition root moved into a **file** | 45 | **1,595,550** | `BrowsePane-bS6gps-Y.js` 22,321 B + `BrowsePane-B-2cz1Cw.css` 799 B |

**Probe A reproduces the committed artifact byte-for-byte** — same 698-byte entry, same content hash
`index-Dezn_h7o.js`. The reproduction is honest: the config is the repo's, unmodified except for
where the bytes land.

```
$ npx vite build --mode gh-pages --config probe/vite.probeA.mts
✓ built in 5.99s
$ ls -lS outA/assets/*.js
11774  quantize-worker-xMwe415C.js
  698  index-Dezn_h7o.js
$ ls outA/assets/ | grep -i browse
(none)
```

**Probe B falsifies the obvious hypothesis.** `package.json:12` declares `"sideEffects": false` for
the whole package — including `demo/**`, whose SFC `<style>` blocks are side-effecting imports. I
expected that to be the mechanism. Forcing `treeshake: { moduleSideEffects: true }` changed
**nothing**: byte-identical output, same hash. `sideEffects` is a latent hazard (N-7) but it is not
this. Recorded because a wrong cure here would have shipped and looked green.

**Probe C is decisive.** It changes one thing: those eight lines are transcribed verbatim into a
real file (`probe/probe-entry.ts`) and passed as `build.rolldownOptions.input`. Same mode, same
plugins, same everything else:

```
$ npx vite build --mode gh-pages --config probe/vite.probeC.mts
✓ built in 6.56s
$ ls -la outC/assets/ | grep -i browse
  799  BrowsePane-B-2cz1Cw.css
22321  BrowsePane-bS6gps-Y.js
$ cat outC/assets/*.js | wc -c
1595550                       # vs 12472 → 127.9× of the application was missing
$ ls outC/assets/*.js | wc -l
     45                       # vs 2
```

Also emitted in C and absent in A: `AboutPane`, `AdminPane`, `AuroraPane`, `BlobPane`,
`ConfigSliderPane`, `EmptyState`, `ExtractPane`, `GeneratePane`, `GradientPane`, and 36 more. The
entire application.

### Mechanism

A composition root that lives inside HTML has no file, and therefore sits outside every system that
owns correctness in this repo:

- **typecheck** — `tsconfig` cannot `include` an `.html`. `npm run typecheck` runs `vue-tsc` over
  `tsconfig.lib.json` + `tsconfig.demo.json`; neither sees `createApp`, `app.use`, or `app.mount`.
- **lint** — ESLint's file set is TS/Vue. The boot is not linted. (It is also, per L-4/N-2, in a
  tree with no import governance at all.)
- **bundle** — under vite 8 / rolldown the inline module body does not survive entry analysis.

Three independent enforcement systems miss the same eight lines for the same reason: those lines
have no module home. That is a library-structure defect in the most literal sense the brief asks
for — **wrong module boundary, applied to the one module that boots everything.**

### Why it survived

The live site renders correctly
(`audit/visual/shots/LIVE-color.babb.dev.png`, read — full picker, About pane, dock all present), so
the deployed artifact predates this toolchain. And the entire visual audit ran against the **dev
server** (`audit/visual/REPORT.md:3` — `Origin: http://localhost:9000`), where Vite serves inline
module scripts as virtual modules and everything works. **Dev is green, prod is empty, and no gate
compares them.** The next deploy from this tree ships a blank page.

This is the `gh-pages` prod-preview empty-mount carried in `CARRY-LEDGER.md` §F and named there as
"the first deep-audit probe." The mechanism is now measured and the cure is five lines.

### Cure

Give the composition root a file. `demo/color-picker/main.ts` holds those eight lines verbatim;
`index.html` carries `<script type="module" src="./main.ts">`. That single move restores bundler
entry analysis, typecheck coverage and lint coverage of the application boot simultaneously.

Do **not** pursue a bundler workaround. The entry having no module home is the defect; the bundler
merely stopped tolerating it. And add the gate that would have caught this on the day it broke: a CI
step that builds `gh-pages` and asserts the entry chunk exceeds a floor (say 50 KB) — a 698-byte
entry must fail loudly, not deploy quietly.

---

## N-7 · MAJOR — `"sideEffects": false` is declared for a package that contains a non-library tree

`package.json:12` — `"sideEffects": false`, package-wide. `package.json:60-64` then carves the demo
back out of the publish surface by negation:

```json
"files": ["dist", "!dist/gh-pages", "!dist/gh-pages/**"]
```

Two exclusion rules to keep a build target out of a package that should never have contained it.
The `sideEffects` claim is true of `src/` and false of `demo/` — every SFC `<style>` is a side
effect, and `demo/palettes/browser/index.ts:5-7` already names this as a live hazard:

> the PI-6 eager-chunk hygiene residual (the `./demo/**` sideEffects mark defeats the named-re-export
> tree-shake) is BOOKED to the bundle-config reconciliation

Probe B shows the claim is not currently *firing*, which makes it more dangerous, not less: it is an
untrue declaration that happens to be inert under today's tree-shaker and will not stay inert.

This is not a hypothesis about where the boundary should be — the negation glob in `files` **is** the
boundary being patched instead of drawn. `demo/` is a separate package wearing the library's
`package.json`.

**Cure** — the root move of §D: `demo/` becomes its own private workspace package. The library keeps
`sideEffects: false` truthfully and drops both negation globs; the demo declares
`sideEffects: ["*.css", "*.vue"]` and consumes `@mkbabb/value.js` as a workspace dependency through
its real `exports` map — which also retires the self-alias apparatus (`vite.config.ts:22-49`) and
converts "the demo proves the public API" from policy into a fact of resolution.

---

## N-8 · MAJOR (extends L-1) — live resolution proof, semantic divergence, and the inversion that makes it worse

Pass 1 proved the export dual-path by grep. Two things strengthen it.

**(a) Live resolution, from the running dev server** — not inferred from file layout:

```
$ curl -s "http://localhost:9000/@fs/…/demo/palettes/usePaletteExport.ts" | head -1
import { exportAsJSON, exportAsCSSCustomProperties, exportAsTailwindConfig, exportAsSVG,
  exportAsPNG, downloadExport } from "/@fs/…/demo/palettes/export.ts";
```

Vite's own resolver, on the process serving the app, names the legacy file. `BrowsePane.vue:115` →
`usePaletteExport.ts:9` → `export.ts`. Not ambiguous.

**(b) The two are not stylistic variants — they emit different bytes.** Beyond pass-1 L-2's
slugifier divergence, the CSS serializers disagree on identifier grammar *and* on colour spelling:

| | `export.ts:26-30` (live) | `export/css.ts:12-15` (contract, dead) |
|---|---|---|
| custom property | `--palette-{nameSlug}-{i}` | `--{identifierPrefix}-{positionalId(i+1)}` |
| value | `${c.css}` — raw author string | `canonicalColor(color)` — integer-encoded OKLCH |

So the byte-exactness regression lock (`byte-exact.test.ts`, fixtures derived from
`PALETTE-CONTRACT.md` Appendix W51) is green over bytes no user can obtain, while the bytes every
user obtains are untested. That is the worst available orientation for a test suite: maximum
confidence pointed at the unreachable half.

**(c) The inversion.** The **dead** path is the one that dogfoods the library —
`export/png.ts:11` imports `oklch, toRgba8` from `@mkbabb/value.js/color`. The **live** path
(`export.ts:1`) imports nothing but `./types`, and renders PNG by round-tripping its own SVG through
a `<canvas>` (`export.ts:84-117`). The library's own demo ships an export button that never touches
the library, while the version that does is unreachable. For a seat auditing whether the demo proves
the public API, this is the sharpest single instance in the tree.

**Cure** (extends pass-1 L-1): delete `demo/palettes/export.ts`; rename `export/serializers.ts` →
`export/index.ts` so `./export` resolves to the contract set; rewrite `usePaletteExport.ts` onto
`ExportSnapshot`. One home, one suite, one set of bytes — and the export path starts dogfooding.

---

## N-9 · MINOR (quantifies L-3) — the design-system route census, measured

Pass 1 established that `demo/ui/**` is pure re-export barrels. The size of the problem was not
measured. It is three parallel routes, and `BrowsePane` uses two of them eleven lines apart
(`:180-181` shim, `:195` subpath):

```
$ grep -rn 'from "\(\.\./\)*ui/[a-z-]*"' demo | wc -l      →  90   # via the demo/ui shims
$ grep -rn 'from "@mkbabb/glass-ui/' demo | wc -l          →  82   # via published subpaths
$ grep -rn 'from "@mkbabb/glass-ui"' demo | wc -l          →  37   # via the root barrel
```

209 import sites, three conventions, no rule distinguishing them (L-4/N-2: there is no rule at all).
Of the 20 shim barrels, **19 re-export the root barrel**; only `demo/ui/input/index.ts` uses a
subpath. Cost of that indirection:

```
$ ls -la node_modules/@mkbabb/glass-ui/dist/{glass-ui,card,button}.js
25239  glass-ui.js     # the root barrel
  217  card.js
   71  button.js
```

glass-ui publishes **68** subpaths and marks `sideEffects: ["*.css"]`. The split exists so importing
a `Card` pulls 217 bytes of module graph rather than a 25 KB barrel; the shims defeat it for 90
sites. And `demo/ui/alert/index.ts:3-9` records that this directory once held real shadcn
re-implementations and was converted to re-exports — the conversion stopped one step short of
deleting the directory, which is precisely the "alias barrel" shape edict 2 forbids.

**Cure**: delete `demo/ui/` (20 barrels, 90 sites → `@mkbabb/glass-ui/<subpath>`), and — once
L-4/N-2's globs are re-homed onto the live tree — ban the root barrel from `demo/**` by
`no-restricted-imports`, which makes edict 4 mechanically checkable for the first time.

---

# §C — Joint verdict across three passes

**DEFECTIVE.** 25 findings across three independent passes; 15 MAJOR-or-worse; two BLOCKERs.

The through-line pass 2 identified holds and extends: *one concept, two or three homes, and the
shipping home is the wrong one* — exports (L-1/N-8), slugs (L-2), the design system (L-3/N-9),
colour distance (L-8/N-3), the remote row list (L-10), the feedback rail (L-12), the pane surface
(L-13/N-1), colour-search state (N-4), the package boundary (N-7).

Pass 3 adds the degenerate case of that same mechanism: **the application entry has *zero* homes.**
Every prior finding describes a concept with too many owners; N-6 describes one with none, and the
consequence is that none of the other 24 findings currently reach a user, because the tree they
live in does not ship.

**Strongest defect overall (pass 3's, and it displaces the prior ranking):** **N-6** — the
production `gh-pages` build emits 12,472 bytes of JS and no `BrowsePane` chunk; the same config with
the composition root given a file emits 1,595,550 bytes across 45 chunks including
`BrowsePane-bS6gps-Y.js`. 127.9× of the application is missing from the artifact. It is the only
finding in this blast radius whose cure is five lines and whose absence makes every other cure
unobservable.

**Strongest defect in the prior passes:** pass-1 L-1 (the byte-exact export contract ships to
nobody), now strengthened by N-8's live-resolver proof and the dogfood inversion. Closely followed by
L-4/N-2, the guard whose death let the rest accumulate.

**A structural note the three passes agree on, from three directions.** L-4/N-2 found a lint rule
that stopped matching and said nothing. N-6 found a build that stopped bundling and said nothing —
`✓ built in 5.99s`, exit 0, 698-byte entry. N-7 found a `sideEffects` claim that is false and
currently inert. Every one of these is a *silent* failure of an invariant that was believed held.
Pass 1's meta-rule is the right one and should be lifted to the tranche: **a structural invariant is
only real if a green build fails without it.**

**The negative, proved — and it survives pass 3.** The brief's headline charge — a demo import a
real consumer could not write — does **not** hold. `BrowsePane.vue`'s full import list (`:179-199`,
14 imports) is `vue`, demo-relative paths, and the published subpath `@mkbabb/glass-ui/search`.
Zero bare-root value.js imports (`grep -rn 'from "@mkbabb/value.js"' demo/` → 0), zero `@src/` or
`../../src/` reaches from `demo/` → 0, and all 49 value.js specifiers are keys that exist in
`package.json#exports`. The mechanism is structural, not disciplinary: `vite.config.ts:38-49`
*generates* the self-alias set from `package.json#exports` by anchored regex, so an alias cannot
drift from the export map nor prefix-match into a subpath, and `tsconfig.demo.json` carries no
`@src/*` path. A non-published specifier is not merely absent — it is **unauthorable**. That
mechanism remains the single best-engineered thing in this component's library posture and must
survive any restructure verbatim. N-7's package split would strengthen it further (real resolution
replacing generated aliases), never weaken it.

---

# §D — The lattice, greenfield (pass 3's amendment)

Passes 1 and 2 produced a demo-internal lattice that stands unchanged. Pass 3 adds the two moves
that must come **first**, because they are the ones that make the rest observable:

```
0. SPLIT THE PACKAGE (N-7)
   demo/ becomes a private workspace package.
     - library keeps "sideEffects": false truthfully; both !dist/gh-pages negations delete
     - demo declares  "sideEffects": ["*.css", "*.vue"]
     - demo depends on @mkbabb/value.js as a workspace dep → real exports-map resolution
     - vite.config.ts:22-49 self-alias apparatus deletes (superseded by real resolution)

1. GIVE THE APPLICATION AN ENTRY MODULE (N-6)
   demo/color-picker/main.ts        ← the 8 lines currently inline in index.html
   index.html                       ← <script type="module" src="./main.ts"> and nothing else
   CI                               ← gh-pages build + entry-chunk floor assertion (>50 KB)

2..n  — passes 1 & 2's lattice, unchanged:

demo/palettes/browse/
  BrowsePane.vue        template + wiring only; ROOT is <PaneHeader>            (N-1, L-13)
  useBrowseQuery.ts     THE query owner: search · sort · tier · tags · colour(L,a,b,radius)
                        → api/palettes.ts params. No client-side re-filter.     (L-8, N-3)
  useBrowseActions.ts   fork · vote · rename · visibility · delete;
                        ONE replaceRemote(slug, next)                           (L-9, L-10)
  useModalTarget.ts     open/target/show/hide × 3 (the 3 hand-rolled ref pairs, :269-320)
demo/palettes/export/index.ts   ← promoted from serializers.ts; the byte-exact set IS the export
                                                                                (L-1, N-8)
demo/shared/ui/PaneHeader.vue   renders the Card root + sticky header + slot     (N-1)
demo/styles/                    owns .pane-scroll-fade + --pane-scroll, with the
                                DESIGN.md:388 residence comment                 (N-1)
src/color/operations.ts         deltaEOK — the distance metric gets a home in the library;
                                api/ consumes it, retiring its hand-rolled OKLab matrix
                                (api/.../oklab.ts:16-21 already books this)      (L-8, N-3)

DELETED: demo/ui/** (20 barrels, 90 sites)                                      (L-3, N-9)
         demo/palettes/export.ts + its slugifier                                (L-1, L-2, N-8)
         BrowsePane's displayedBrowse + colorSearchParams                       (L-8, N-3, N-4)
         useDialogBrowseActions.onRevert + modalStack                           (L-9)
         both cardRefs registries (leak dies with them)                         (L-12)
FIXED:   eslint.config.js globs → live tree + a zero-match-glob assertion       (L-4, N-2)
         no-restricted-imports bans the glass-ui root barrel from demo/**       (N-9)
         Palette.oklabColors non-optional on the searchable projection          (N-3)
```

Direction of dependency after the transposition: `pane → feature composables → api client → wire`,
with `shared/ui` and glass-ui the only upward reaches and `@mkbabb/value.js/*` the only downward one.
No component owns arithmetic. No CSS class is owned by a component that does not render it. No
concept has two homes — and the one concept that had none has a file.

`BrowsePane.vue` at the end is roughly 200 lines: a header, a search bar, three states, a grid,
three portalled surfaces, and no logic another module could own.

---

## Evidence index (pass 3)

| claim | command / artifact |
|---|---|
| N-6 committed artifact is an empty mount | `ls -la dist/gh-pages/assets/` → `index-Dezn_h7o.js` **698 B**, no `index-*.css`, no pane chunks |
| N-6 that entry is only the preload polyfill | `head -c 900 dist/gh-pages/assets/index-Dezn_h7o.js` → `link.relList.supports('modulepreload')` IIFE, nothing else |
| N-6 probe A reproduces it byte-for-byte | `npx vite build --mode gh-pages --config probe/vite.probeA.mts` → 2 chunks, 12,472 B, same hash `index-Dezn_h7o.js` |
| N-6 `sideEffects` is NOT the mechanism | probe B (`treeshake:{moduleSideEffects:true}`) → byte-identical to A |
| N-6 a file-homed entry fixes it | probe C → 45 chunks, **1,595,550 B**, `BrowsePane-bS6gps-Y.js` 22,321 B + `BrowsePane-B-2cz1Cw.css` 799 B |
| N-6 the inline entry | `demo/color-picker/index.html:205-213`; `ls demo/color-picker/` → no `main.ts` |
| N-6 dev-only coverage | `audit/visual/REPORT.md:3` — `Origin: http://localhost:9000`; `LIVE-color.babb.dev.png` (read) renders, so prod predates this toolchain |
| N-7 untrue package claim | `package.json:12` `"sideEffects": false`; `package.json:60-64` `["dist","!dist/gh-pages","!dist/gh-pages/**"]` |
| N-8 live resolver names the legacy file | `curl -s "http://localhost:9000/@fs/…/usePaletteExport.ts" \| head -1` → `… from "/@fs/…/demo/palettes/export.ts"` |
| N-8 byte divergence | `export.ts:26-30` vs `export/css.ts:12-15` |
| N-8 dogfood inversion | `export/png.ts:11` imports `@mkbabb/value.js/color`; `export.ts:1` imports only `./types` |
| N-9 route census | `grep -rn` × 3 → 90 shim / 82 subpath / 37 root-barrel sites |
| N-9 barrel cost | `ls -la node_modules/@mkbabb/glass-ui/dist/{glass-ui,card,button}.js` → 25239 / 217 / 71 |
| L-7 ✔ port fully consumed | `browsePort` = 32 members (`usePalettePorts.ts:157-192`); `grep -o "pm\.[a-zA-Z]*" BrowsePane.vue \| sort -u \| wc -l` → 30 (+2 transitive) |
| L-4 ✔ no governance | `ls -d demo/@` → No such file or directory; `npx eslint demo/palettes/BrowsePane.vue` → clean |
| route renders clean in all 4 matrices | `audit/visual/REPORT.md:121,136,151,166` — overflowX 0, main 1, pageErr 0, consoleErr 0 |
| probe configs | `./probe/vite.probe{A,B,C}.mts`, `./probe/probe-entry.ts` |
| pass 1 & 2, preserved | `challenge-L-library-pass1.md`, `challenge-L-library-pass2.md` |
