# CHALLENGE-L — library structure under `demo/scenes/ConfigSliderPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

## Provenance

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD drift, recorded:** the brief names `c654824e`; the working tree is at
  `f36f780c5938390b8dc93cd87920418e82cdd81a` (`docs(V·mega): STATE — three OM censuses
  complete, findings at MT-F043`). Nothing under `demo/`, `src/` or `eslint.config.js` moved
  between them; every line reference below was read at `f36f780c`.
- This is **r4**. The r3 report that occupied this path is preserved verbatim at
  `challenge-L-library.pass-3-2026-07-28-prior.md`; r2 at
  `challenge-L-library.pass-2-2026-07-28-prior.md`.
- Subject: `demo/scenes/ConfigSliderPane.vue`, 252 lines. Two consumers:
  `scenes/atmosphere/AuroraPane.vue` (3 sliders), `scenes/blob/BlobPane.vue` (31 sliders).
  **34 rows ride this one component.**

**Verdict: DEFECTIVE.**

r3 is a strong pass. I re-derived its measurements independently from a fresh probe and
**corroborate its two BLOCKERs and five of its MAJORs** (§3). I do not re-litigate them; §3 is
a corroboration ledger, not a restatement. This report earns its place on three things r3 did
not have:

1. **L4-1 · BLOCKER (NEW).** The ESLint lattice that enforces the demo's module boundaries is
   **dead and reports green.** `no-restricted-imports` resolves to `undefined` for every file
   under `demo/`, including this one. Two of the three demo-side blocks have file globs
   pointing at `demo/@/**`, a tree W43/RF-15 deleted; the third block's *banned pattern* names
   the `@components` alias, which the same wave deleted. `npm run lint --max-warnings=0`
   passes. This is the mechanism by which r2's and r3's structural findings — the `demo/ui/`
   shim, the bare-file-at-an-area-root placement — survived a restructure that should have
   caught them.
2. **L4-2 · MAJOR (NEW MEASUREMENT, corrects both r2 and r3).** r2 claimed the glass-ui root
   barrel costs shipped bytes; r3 refuted that and recorded *"no cost."* Both are half right.
   I re-measured with esbuild metafiles: the barrel costs **842 shipped bytes (2.5%) — r3 is
   right** — but it costs **37.6× the modules and 6.3× the input bytes at build time**, and
   **54× the transferred bytes in dev**. The barrel is free at runtime and expensive
   everywhere else. Neither prior pass measured that axis.
3. **L4-3 · MAJOR (NEW REPRODUCTION).** r3's §4.5 certifies *"every slider key is live … no
   dead key today."* True, and a snapshot. The structural fact is the **failure mode**:
   `writePath` (`:66-73`) walks intermediates unchecked, so a bad dot-path **throws
   `TypeError`**, it does not no-op. Reproduced below. This sharpens r3's L-14 from a
   typing-hygiene MINOR to a real hazard on the one consumer (AuroraPane) that has no guard.

---

## §1 · L4-1 · BLOCKER (NEW) — the demo's module-boundary lattice is dead and reports green

`eslint.config.js` carries four `no-restricted-imports` blocks. One guards the library; three
guard the demo's module graph. The three demo-side blocks are the codified form of the
architectural invariants this whole audit axis exists to check:

- **G-DEMO-1** — *"the shared composables layer must never import app-root boot — the spine is
  a clean lower layer"* (`eslint.config.js:290-292`)
- **G-DEMO-3a** — *"the shared composables layer must not import feature internals — features
  depend on shared, never the reverse"* (`:294-296`)
- **G-DEMO-3b** — *"reach palette-browser through its barrel seam, never a raw `.vue` file"*
  (`:249-251`, `:299-301`)

Their file globs (`:232-238`, `:275-278`):

```
demo/color-picker/**/*.ts        ← exists
demo/color-picker/**/*.vue       ← exists
demo/@/components/**/*.{ts,vue}  ← DELETED
demo/@/lib/**/*.{ts,vue}         ← DELETED
demo/@/composables/**/*.{ts,vue} ← DELETED
```

```
$ ls -d demo/@ demo/@/components demo/@/composables demo/@/lib
ls: demo/@: No such file or directory
ls: demo/@/components: No such file or directory
ls: demo/@/composables: No such file or directory
ls: demo/@/lib: No such file or directory

$ ls demo/
DESIGN.md  color-picker  color-session  palettes  picker  platform
scenes  shared  shell  styles  test  ui  workbenches
```

`vite.config.ts:68` records the cause in one line: *"W43 (RF-15) killed the demo `@…` path
aliases"*. The tree was restructured into
`demo/{picker,scenes,shared,palettes,workbenches,shell,color-session}/`. The lint globs were
not moved with it.

**Resolved config, this component and two neighbours:**

```
$ npx eslint --print-config demo/scenes/ConfigSliderPane.vue \
    | jq '.rules["no-restricted-imports"]'
undefined

$ npx eslint --print-config demo/palettes/browser/card/PaletteCard/PaletteCard.vue     → undefined
$ npx eslint --print-config demo/picker/controls/ComponentSliders/ComponentSliders.vue → undefined
```

**The one demo block whose glob still matches bans a specifier that no longer exists:**

```
$ npx eslint --print-config demo/color-picker/App.vue | jq '.rules["no-restricted-imports"]'
[2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],
  "message":"G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file."}]}]

$ grep -rn 'from "@components' demo/ --include="*.vue" --include="*.ts" | wc -l
0
```

The `@components` alias was deleted by the same wave. The rule is armed, matched, and pointed
at nothing.

**Only the library-side ban survives**, because its glob (`src/**/*.ts`) was never renamed:

```
$ npx eslint --print-config src/index.ts | jq '.rules["no-restricted-imports"]'
[2,{"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"],
  "message":"inv-K-1: the value.js LIBRARY (src/) must never import glass-ui —
             the topology is glass-ui → value.js(lib), one direction, no cycle."}]}]
```

**Why this is a BLOCKER and not a chore.** An absent guard is honest. A guard that resolves to
`undefined` while `npm run lint --max-warnings=0` exits 0 is a **false green**: the demo's
module lattice reads as *structurally enforced* in CI, in `eslint.config.js`'s own 40 lines of
prose, and in every tranche document that cites G-DEMO-1/3a/3b as discharged. It is enforced
nowhere. Every architectural invariant those blocks name — clean lower layer, features depend
on shared not the reverse, barrel seams over raw `.vue` — is currently unverified prose.

And it is *this component's* story specifically. r3's L-16 finds ConfigSliderPane sitting as a
bare file at an area root, reached by two sibling features via `../ConfigSliderPane.vue`; r3's
L-14 finds both consumers importing a **type out of a raw `.vue`**
(`AuroraPane.vue:34`, `BlobPane.vue:15`) — the exact shape G-DEMO-3b was written to forbid.
r3 diagnosed both as placement defects. They are placement defects *that a live lattice would
have refused*. The guard did not fail to fire; it was not there.

**Cure (structural, not a patch).**

1. Re-point the three globs at the current tree
   (`demo/{picker,scenes,shared,palettes,workbenches,shell,color-session}/**`) and re-express
   the bans against current module names.
2. Add the two bans this audit's findings call for: bare `@mkbabb/glass-ui` (force the subpath,
   §2) and `**/demo/ui/*` (so the alias layer of r3's L-5 cannot grow back after deletion).
3. **Make a zero-match glob a build failure.** A ten-line preflight that asserts every
   configured `files` glob resolves to ≥1 file would have caught this at W43 and would keep
   catching it. Without it, the next restructure silently disarms whatever the next wave
   codifies. This is the one-home principle applied to enforcement itself: a rule and the tree
   it guards must not be able to drift apart in silence.

---

## §2 · L4-2 · MAJOR (NEW MEASUREMENT) — the root barrel is free at runtime and expensive everywhere else

This corrects the record on both prior passes. r2 claimed the `demo/ui/` shim's root-barrel
channel costs shipped weight. r3 refuted it and recorded, in §4.5, *"Root-barrel byte cost: no
cost… The L-5 barrel finding is coherence/one-home only; no byte claim is made."*

I built both channels and read the metafiles, rather than adopting either claim.

```
$ cat a-barrel.mjs
import { Button, Card, Slider, writeClipboard } from "@mkbabb/glass-ui";
$ cat b-subpath.mjs
import { Button }        from "@mkbabb/glass-ui/button";
import { Card }          from "@mkbabb/glass-ui/card";
import { Slider }        from "@mkbabb/glass-ui/slider";
import { writeClipboard } from "@mkbabb/glass-ui/dom";

$ npx esbuild <each> --bundle --format=esm --minify --external:vue --external:reka-ui \
      --outfile=/dev/null --metafile=…
```

| | total inputs | glass-ui modules | input bytes parsed | **output bytes** |
|---|---:|---:|---:|---:|
| A · root barrel | **1807** | 68 | **2,040,675** | **34,127** |
| B · four subpaths | **48** | 33 | **323,867** | **33,285** |
| ratio | **37.6×** | 2.06× | **6.30×** | **1.025×** |

**r3 is right about the shipped byte** — 842 B, 2.5%. glass-ui declares
`sideEffects: ["*.css"]`, so Rollup/esbuild shake the barrel down to the same live set. No
runtime claim should be made, and I make none.

**The cost that was never measured is upstream of the output.** The barrel channel makes the
bundler **read and parse 2.04 MB across 1807 modules to emit 33 KB** — 37.6× the module graph
for a 2.5% larger artifact. That is paid on every cold build, every CI run, and every
dep-optimizer pass.

And it is paid *per request* in development, where nothing is shaken:

```
$ ls -la node_modules/.vite/deps/@mkbabb_glass-ui{,_dom,_dock,_configurator}.js
231357  @mkbabb_glass-ui.js          ← what ConfigSliderPane.vue:23 pulls for writeClipboard
  4256  @mkbabb_glass-ui_dom.js      ← where writeClipboard actually lives (dist/dom.js:134)
 43369  @mkbabb_glass-ui_dock.js
   309  @mkbabb_glass-ui_configurator.js
```

**54× transferred, in dev, for one clipboard call.** Confirmed live — a Chromium probe of
`/#/blob` on the running dev server records `@mkbabb_glass-ui.js` among the 10 glass-ui module
requests the route makes.

**The repo has already ruled on this question, for its own package, in the opposite
direction.** `demo/shared/utils.ts:10-22`:

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js`
> specifier — the full-barrel import that drags the scroll-timeline grammar chunk (~36 KiB gz)
> into the eager graph for a 40-line timer utility."*

A whole utility was forked into the demo to shed a 36 KiB root-barrel edge from `value.js`.
Meanwhile `ConfigSliderPane.vue:23` and the three `demo/ui/` shims it imports hold a 231 KiB
root-barrel edge to `glass-ui` open. One law, applied to one dependency and not the other.

**This does not upgrade r3's L-5; it re-grounds it.** The `demo/ui/` deletion is still
justified primarily on one-home/no-alias grounds (edict 2). But it is no longer *only*
aesthetic: the four symbols this file needs all have published subpath homes
(`@mkbabb/glass-ui/{button,card,slider,dom}` — verified present in glass-ui@7.0.0's 75-entry
exports map), and taking them there is measurably cheaper to build and to serve.

---

## §3 · L4-3 · MAJOR (NEW REPRODUCTION) — the unguarded path writer throws; it does not no-op

r3's §4.5 records *"Every slider key is live … No dead key today."* Verified, and correct as a
snapshot. The structural question is what happens when that stops being true — and the answer
is worse than r3's L-14 implies.

`ConfigSliderPane.vue:66-73`, verbatim:

```ts
function writePath(obj: Record<string, unknown>, path: string, value: unknown) {
    const segs = path.split(".");
    let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) {
        cur = cur[segs[i]!] as Record<string, unknown>;
    }
    cur[segs[segs.length - 1]!] = value;
}
```

No intermediate is checked. Reproduction, the function verbatim against the live aurora shape:

```
$ node -e "<writePath copied verbatim from ConfigSliderPane.vue:66-73>
           const cfg = { colorEnergy: 0.5, noise: 0.2, zones: { count: 3 } };
           writePath(cfg, 'zone.count', 4);"
THROWS on typo path: TypeError: Cannot set properties of undefined (setting 'count')

$ … writePath(cfg, 'colorEnergy.deep', 4)
silent no-op on scalar mid-path: {"colorEnergy":0.5,"noise":0.2,"zones":{"count":3}}
```

Two distinct failure modes from one unguarded walker: a **throw** on a missing branch, a
**silent no-op** on a scalar mid-path. `read()` (`:76-78`) has the mirror hole —
`readPath(config, key) as number` hands `undefined` to `:model-value="[read(def.key)]"`.

The asymmetry r3 identified is what makes this live rather than theoretical.
`BlobPane.vue:36-48` pays for the component's untyped surface with a 12-line homomorphic
mapped type, so its 31 keys cannot rot. `AuroraPane.vue:97-105` has no equivalent:

```ts
const SECTIONS: SliderSection[] = [
    { … defs: [
        { key: "colorEnergy",  … },
        { key: "noise",        … },
        { key: "zones.count",  … },   // bare string literal; SliderDef.key is `string`
    ]},
];
```

`AuroraAtoms` is a **producer type** (`@mkbabb/glass-ui/aurora`) on a package tracked at
`^7.0.0`. A minor-version rename of `zones` — precisely the kind of drift `BlobPane.vue:29-35`
documents having already absorbed once (*"glass-ui's atoms now carry OPTIONAL nested members
too … the producer's live tranche/BG surface grew them under us"*) — compiles clean here and
throws on first drag of the Zones slider. That is a defect the component's public surface
*chose* by typing `key: string`, and it lands only on the consumer that did not privately
re-derive the guard.

r3's cure is right and I endorse it unchanged: `SliderDef<T> { key: NumericPath<T> }` in a
`.ts` module, component generic over `T`, `NumericPath<T>` promoted out of BlobPane. Adding
only this: the promotion is not optional polish. It is the difference between a throw and a
compile error on a dependency this repo has already watched move underneath it.

---

## §4 · Corroboration ledger — r3's findings, re-derived independently

I ran my own probe (Chromium, dev server `:9000`, desktop 1440×900 + mobile 390×844 with
`isMobile`/`hasTouch`) without consulting r3's numbers, then compared. Recorded so the parent
can weight r3's claims by independent replication rather than by assertion.

| r3 finding | my independent measurement | verdict |
|---|---|---|
| **L-1 BLOCKER** — `Reset` destroys the live picker→blob `color.paletteStops` because `Object.assign` is a whole-subtree overwrite (`:93`) | Re-read `:92-94` and `BlobPane.vue:8-9`; `Object.assign` semantics over `BLOB_CONFIG_DEFAULTS.color` confirm the mechanism. `useAtmosphere.ts:381` mints the live config, `:393` writes the derived stops. r3's node reproduction is sound. | **CORROBORATED** |
| **L-2 BLOCKER** — `variant="spectrum"` is the wrong variant | Live: `dataVariant "spectrum"` on all 31; `rangeBg "rgba(0, 0, 0, 0)"` (the fill paints **nothing** — `[data-variant=spectrum] .slider-range{background:0 0}`); `trackH 24`; `thumbSizes ["12x24"]` on 31/31. Independently tied to the visual matrix: `REPORT.json` `safari-desktop-light /#/blob` `smallTapTargets` contains **exactly 31** `{w:12,h:24,tag:"span"}` rows, one per BlobPane slider label — and `/#/blob` is the worst route in all 60 captures at 39, against a next-worst of 8. Visible in `shots/safari-desktop-light/blob.png`: uniform dark slabs against the picker's genuine gradients in the same frame. | **CORROBORATED + extended** |
| **L-3 MAJOR** — glass-ui `./configurator` ships primitives built for these two panes by name; the demo consumes one, re-rolls the rest | `ConfiguratorLayer.vue.d.ts` docblock names them: *"aurora has Medium / Palette / Flow / Texture / Comp / Nuclei; **blob has Mood / Body / Surface / Color / Motion / Pointer / Render**"*. `useConfiguratorState.d.ts:42` ships `resetCurrent()` with an injectable `clone` hook — the exact seam L-1's derived state needs. | **CORROBORATED** |
| **L-4 MAJOR** — the published library declares a 5.2 MB Vue design system and an unimported package as runtime `dependencies`; the graph is cyclic | `grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/` → **0 hits**. `package.json` `dependencies` = `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`. `du -sh` → 5.2M + 608K. Every consumer of a *"failure-explicit CSS color"* library installs 5.8 MB it can never reach. | **CORROBORATED** |
| **L-6 MAJOR** — "THE ONE RHYTHM SOURCE" exists twice and the clamp is inert | Live: `rowCount 31`, `rowHeights [61]` — uniform 61 px against a clamp maximum of `2.625rem` = 42 px. The rule (`:215-217`) never binds. Separately confirmed the mechanism is *not* a missing container: `demo/styles/shell.css:83` declares `.pane-wrapper{container-type:inline-size}`, measured live as `"paneWrapperContainerType":"inline-size"`, so `7cqi` resolves as designed — the constant band is simply below the floor it was written to raise. | **CORROBORATED** |
| **L-10 MAJOR** — `/#/blob` renders 0 of 31 rows below `lg` | Live at 390×844: `configConsolePresent false`, `sliderRows 0`, `bodyTextLen 68`, `firstHeading null`, with `hash "#/blob?space=lab&color=…"` — the route resolves, the pane never mounts. Independently corroborated by the matrix (`bodyTextLength` 69 mobile vs 713 desktop) and by `shots/safari-mobile-light/blob.png`, which shows the **Picker** pane with the tab strip parked on "Picker". Mechanism at `usePaneRouter.ts:178-184`: `mobile` returns `desktopLeft` unless a route-independent `mobilePaneIndex === 1`. | **CORROBORATED** |
| **L-12 MINOR** — two `:deep()` reaches across the package boundary | Sharpened: `.configurator-row` is a producer **SFC-scoped** class — every rule for it in `glass-ui.css` carries `[data-v-7044aa73]`; `.font-mono` is a Tailwind utility inside the producer's own markup (`configurator-M5OaIlJd.js`: `font-mono text-muted-foreground/70`). Neither is declared API, and `ConfiguratorRow`'s docblock says the `name` prop exists so consumers need *"**WITHOUT** a `:deep()` reach"*. **The coupling is doubly load-bearing:** `e2e/smoke/oracles/o18-contrast-census.spec.ts:955` selects `.config-console .configurator-row .font-mono` and `:1170` selects `…​.slider-track` — a producer rename silently reverts the ink **and** leaves the born-RED gate selecting nothing. | **CORROBORATED + extended** |
| **L-14 MINOR** — types in a `.vue`; `Record<string, unknown>` forces four double casts | Independently found the same four sites (`BlobPane.vue:124,126`; `AuroraPane.vue:111,113`) and the same guard asymmetry, before reading r3. Severity re-argued upward at §3. | **CORROBORATED, severity contested** |
| **L-15 INFO** — the `exactOptionalPropertyTypes` forwarding ternary at `:107` | Confirmed the cause: `tsconfig.base.json:11` sets `exactOptionalPropertyTypes: true`, so `:description="description"` is a genuine type error against `description?: string`. Confirmed it is the **only** one of PaneHeader's **nine** call sites needing the escape (the other eight pass string literals or a computed). r3's root-level cure — widen the prop — is right. | **CORROBORATED** |
| r3 §4.5 — *root-barrel byte cost: no cost* | Re-measured rather than adopted. Shipped bytes: r3 is right (842 B, 2.5%). Build and dev cost: unmeasured by either pass, and large (§2). | **REFINED** |
| r3 §4.5 — dot-path traversal has exactly one home | `grep -rn "readPath\|writePath\|getPath\|setPath\|split(\".\")" demo/ src/` → hits only in `ConfigSliderPane.vue:57,66,77,81`. No second walker anywhere. | **CORROBORATED** |
| r3 §4.5 — `--slider-track-bg` is a public producer token | Confirmed: two `var(--slider-track-bg, …)` fallback sites in `dist/glass-ui.css` (`--muted-medium`, `--secondary`); four demo feed sites (`ExtractControls.vue:32,75`, `GenerateControls.vue:305`, `ComponentSliders.vue:197`). The seam is sound; the *role* is the L-2 defect. | **CORROBORATED** |

**Additional negative proofs of my own** (recorded so absence reads as evidence):

- **No `@mkbabb/value.js` import, deep or shallow.** Zero hits in the file. The published
  surface — `package.json` `exports`, 7 subpaths → `dist/subpaths/*` — is untouched. This
  component is therefore **not** a false proof of the public API: it makes no claim on it. Every
  import in the file except the four demo-relative ones is writable by a real external consumer.
- **`verbatimModuleSyntax` is honoured** (edict 8): all eight of this file's imports are value
  imports of values; both consumers' `SliderSection` imports are `import type`.
- **`Card tier="resting"` is real API** — `CardProps extends SurfaceProps`,
  `CardTier = SurfaceTier` (`components/card/Card.vue.d.ts:1-8`).
- **The three named historical suspects are absent from this component's import closure** —
  `ActionBarLayer`/`useLayerTransition`, `demo/palettes/export.ts` + `usePaletteExport.ts` vs
  `export/serializers`, and the three parallel `useDark` stores. The
  `JSON.stringify(config, null, 2)` at `:89` is a two-line clipboard call, not a second
  serializer: `demo/palettes/export.ts` serialises *palettes* with filenames and MIME types — a
  different concept, correctly housed elsewhere.

---

## §5 · The greenfield lattice — r3's, plus the enforcement layer it omits

r3's §5 lattice is correct and I adopt it without amendment: the studio concept belongs in
`@mkbabb/glass-ui/configurator` (`Configurator` frame + footer/reset · `ConfiguratorLayer`
section · `ConfiguratorRow` row · `useConfiguratorState<T>` state), the demo keeps only the
knob tables the two scenes declare, `demo/ui/`'s 19 shims are deleted, and the component moves
out of an area root into a real seam with its types in a `.ts` module.

What that lattice is missing is the thing §1 proves it cannot survive without: **the lattice
has to be executable.** Every prior structural ruling in this repo — G-DEMO-1, G-DEMO-3a,
G-DEMO-3b — was written down, codified in `eslint.config.js`, and then silently disarmed by a
directory rename. A greenfield module lattice that lives only in prose and a stale glob will be
disarmed the same way by the next restructure.

So the lattice is four things, not three:

```
@mkbabb/glass-ui/configurator              ← the design system owns the studio  (r3 §5)
demo/shared/config-pane/{index.ts,types.ts,ConfigSliderPane.vue}   ← seam + typed contract
demo/scenes/{atmosphere,blob}/             ← knob tables only
eslint.config.js                           ← THE LATTICE, EXECUTABLE
    · globs re-pointed at the current tree
    · ban bare `@mkbabb/glass-ui`  (force the subpath — §2)
    · ban `**/demo/ui/*`           (the alias layer cannot grow back)
    · PREFLIGHT: every configured `files` glob must match ≥1 file, or the build fails
```

The last line is the smallest change in this report and the one with the longest half-life. It
is the one-home principle turned on enforcement itself: a rule and the tree it guards must not
be able to drift apart in silence. Without it, every cure this audit programme lands is one
rename away from becoming prose.

**The single sharpest transposition remains r3's:** `config: Record<string, unknown>` →
`config: T`. One prop deletes four `as unknown as` casts, one 12-line consumer-side mapped
type, the guard asymmetry that leaves AuroraPane's keys unchecked (§3), and it is the
precondition for moving the component into glass-ui at all — a design-system primitive cannot
ship `Record<string, unknown>` as its config type.

---

## Appendix · Reproduction commands (r4 only; r3's are in the preserved r3 file)

```
# L4-1 — the dead lattice
npx eslint --print-config demo/scenes/ConfigSliderPane.vue | jq '.rules["no-restricted-imports"]'
    → undefined
npx eslint --print-config demo/color-picker/App.vue        | jq '.rules["no-restricted-imports"]'
    → bans "@components/custom/palette-browser/**/*.vue"
grep -rn 'from "@components' demo/ --include="*.vue" --include="*.ts" | wc -l   → 0
ls -d demo/@ demo/@/components demo/@/composables demo/@/lib                   → 4× ENOENT
npx eslint --print-config src/index.ts | jq '.rules["no-restricted-imports"]'  → inv-K-1 live

# L4-2 — barrel vs subpath, esbuild metafiles
npx esbuild a-barrel.mjs  --bundle --format=esm --minify --external:vue --external:reka-ui \
    --outfile=/dev/null --metafile=mA.json      → 1807 inputs · 2,040,675 B in · 34,127 B out
npx esbuild b-subpath.mjs --bundle --format=esm --minify --external:vue --external:reka-ui \
    --outfile=/dev/null --metafile=mB.json      →   48 inputs ·   323,867 B in · 33,285 B out
ls -la node_modules/.vite/deps/@mkbabb_glass-ui{,_dom}.js  → 231,357 B vs 4,256 B

# L4-3 — the path writer
node -e "<writePath verbatim from ConfigSliderPane.vue:66-73>; writePath({zones:{count:3}}, 'zone.count', 4)"
    → TypeError: Cannot set properties of undefined (setting 'count')

# §4 — independent live probe (chromium, dev server :9000)
#   scratchpad/probe-l.mjs  — 1440×900 + 390×844(isMobile,hasTouch)
desktop: rowCount 31 · thumbSizes ["12x24"] · rowHeights [61] · dataVariant "spectrum"
         dataSize null · rowClass "configurator-row flex flex-col gap-1.5 py-1"
         trackH 24 · trackBg oklch(0.447121 0.00386159 34.63) · rangeBg rgba(0,0,0,0)
         paneWrapperContainerType "inline-size" · actionBarButtons ["Copy JSON","Reset"]
mobile:  configConsolePresent false · sliderRows 0 · bodyTextLen 68 · firstHeading null

# §4 — inverted runtime dependency
grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/            → 0
node -e "console.log(require('./package.json').dependencies)"  → both declared
du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js → 5.2M · 608K
```

Visual evidence read: `audit/visual/shots/safari-desktop-light/blob.png`,
`audit/visual/shots/safari-mobile-light/blob.png`, `audit/visual/REPORT.md`,
`audit/visual/REPORT.json` (`safari-desktop-light` `/#/blob` `probe.a11y.smallTapTargets`).

No source file was edited. This report and the preserved r3 copy are the only artifacts
written.
