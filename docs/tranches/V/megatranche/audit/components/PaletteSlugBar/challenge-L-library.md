# CHALLENGE-L · library structure — `demo/palettes/browser/slug/PaletteSlugBar.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
this seat was explicitly spawned with. Declared, not inherited.

**Run note.** This is **run 2** of CHALLENGE-L on this component. A prior Opus 5 run wrote this
file on 2026-07-27 18:04; it is preserved verbatim at
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/challenge-L-library.run-1.md`
and **its findings are not superseded** — §Reconciliation below states exactly which of its
findings I independently confirmed, which four findings this run adds, and the one claim I
downgrade. Nothing from run 1 is lost.

Repository `/Users/mkbabb/Programming/value.js`. The brief names HEAD `c654824e`; the branch has
since advanced (`git log --oneline -1` → `32b4040e docs(V·mega): r3 DELTA COMPLETE …`). All
measurements below were taken at `32b4040e`; every finding reproduces at both. No source edits
were made; only this component's audit directory was written.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The premise is that the library structure under this component is wrong. It is worse than wrong:
**the component is not in the application.** Zero render sites. Run 1 established that and proved
its user-facing consequence (login failure is silent) in a live browser. This run adds the four
things run 1 did not have:

1. **The exact commit that orphaned it, and the mechanism by which the gate that should have
   caught it was defeated** — `95993197`, whose own sweep protocol was satisfied by the barrel
   that exists to protect the component, and which *improved* the orphan in the same commit.
2. **The production build emits zero application code** — measured, reproduced at HEAD, and
   root-caused to the demo having no entry module. Run 1 labelled its bundle question an unmeasured
   hypothesis; the measurement's answer is that there is no bundle to measure.
3. **The demo's declared `@mkbabb/value.js` surface is wider than the published `exports` map by
   three specifiers** — the "false proof of the public API" this challenge names, sitting live in
   `tsconfig.demo.json`.
4. **`.slug-pill` is a demo-local design primitive glass-ui should own**, and this component paints
   it with the *raw* colour pick that a live sibling measured at ≤1.28:1 contrast and abandoned.

Every gate in the repository passes on this file: `npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue
demo/palettes/useSlugMigration.ts` exits `0`. None of what follows is machine-visible today.

---

## L2-1 · BLOCKER (new) — the orphaning commit, and how the sweep's own "verify-dead-first" gate was defeated by the barrel

Run 1 (L-1) proved the component never mounts and dated it loosely to "at least three tranches."
This run localises it to a single commit and names the mechanism, which is the part a cure must
address — otherwise the next sweep repeats it.

**The commit.**

```
$ git log --oneline -S"<PaletteSlugBar" -- demo | head -1
95993197 refactor(T.W0 · lane t-legacy-sweep): W0-3 excisions — the dead named set + CC-6 orphan removed, code grep-zero

$ git show 95993197 -- demo | grep -n "PaletteSlugBar"
 36:    - §8  PaletteSlugBar iconOnly migration — the TODO's named condition (glass-ui
800:-        <PaletteSlugBar
874:-import PaletteSlugBar from "@components/custom/palette-browser/PaletteSlugBar.vue";
921:-const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
```

Lines 800/874/921 of that diff are all deletions inside one file:
`demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteControlsBar.vue`, which
`95993197` deleted whole as part of its `CC-6 PaletteDialog orphan` excision. `PaletteSlugBar` was
a `PaletteDialog`-only render child — structurally identical to `ImagePaletteExtractor.vue`, which
the **same commit correctly identified and deleted** as "dead-by-cascade":

> "CASCADE (forced consequence of CC-6, grep-confirmed): `ImagePaletteExtractor.vue` was a
> PaletteDialog-ONLY render child … dead-by-cascade → DELETED + its now-empty
> `image-palette-extractor/index.ts` barrel."

**The mechanism — why the cascade stopped one component short.** That commit states the gate it
ran, twice:

> "t-legacy-sweep LEG-1..8 + CC-6, all **VERIFY-DEAD-FIRST (grep all imports before delete)**"
> … "the dialog-era shell has ZERO render path (**the barrel re-export was its only reference**;
> nothing consumes it)."

The protocol was *grep for importers*. For `ImagePaletteExtractor` the grep came back with only a
barrel, and the barrel was deleted with it. For `PaletteSlugBar` the grep came back **non-empty
with two survivors that look like consumers and are not**:

| survivor | why it defeated the gate |
|---|---|
| `demo/palettes/browser/index.ts:44` (then `palette-browser/index.ts`) | a barrel re-export — the *same* signal the commit correctly discounted for `PaletteDialog` ("the barrel re-export was its only reference"), not discounted here |
| `useSlugMigration.ts:6` `import type { PaletteSlugBar }` | a **type-only** import, erased at build, in a live file — indistinguishable from a real importer in a text grep |

So the structural machinery erected to protect the component (the "hardened public surface" barrel,
`slug/index.ts:1-3`) is precisely what hid its death. A seam whose only remaining function is to
make a dead module look alive.

**The aggravating detail.** `95993197` did not merely fail to delete the orphan — its `§8` *worked
on* it:

> "§8 PaletteSlugBar iconOnly migration — the TODO's named condition (glass-ui shipped the
> iconOnly×size rung, BH.W-SIZE-UNIFY) is MET; the stale TODO excised + both icon buttons migrated
> off the hand-sized `h-6 w-6` onto the shipped `<Button iconOnly size="xs">`. **GEOMETRY DELTA
> FLAGGED**: 24px → the xs rung (~28px desktop / WCAG-44 coarse-pointer floor)"

A geometry delta was flagged and reasoned about, for buttons no user can reach. `f2c8f565` (the
glass-ui 7.0.0 adoption) then touched the file again:

```
$ git log --oneline -- demo/palettes/browser/slug/PaletteSlugBar.vue
f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)
```

Two tranches of review attention spent on 243 unreachable lines, and one wave (`a61094e3`) that
carefully re-homed them into a new directory structure.

**Reproduction.** The three commands above.

**Proposed cure — structural, aimed at the gate, not the file.** Deleting
`demo/palettes/browser/slug/` (run 1, L-1) is necessary and insufficient: the *gate* is what
failed. A liveness gate over a Vue tree must be a **reachability** check from the mount roots, not
a text grep, and it must discount two signal classes by construction:

- barrel re-exports of the module under test, and
- `import type` edges (erased at build; they cannot keep a component alive).

Concretely: one script that starts from the entry module and the router's component map, walks
template/`h()`/dynamic-import edges, and prints every `.vue` under `demo/` that it never reaches.
Run it in CI. At HEAD it would print `PaletteSlugBar.vue` — and, per run 1's L-5 and my L2-5, also
`demo/palettes/browser/index.ts`. That script is the deliverable this finding asks for; the
deletion is its first output.

---

## L2-2 · BLOCKER (new) — the production build emits ZERO application code; the demo has no entry module

Run 1's L-6 raised the bundle question and honourably labelled it unmeasured:

> *"Hypothesis (labelled, not measured): the 43-chunk root reach inflates the dev module graph …
> I did not run a comparative build; the bytes claim is unproven."*

I ran the build. The comparative measurement is impossible for a reason larger than the hypothesis.

**Measurement.** Built to a scratch outDir so the repository's `dist/` was untouched:

```
$ npx vite build --mode gh-pages --outDir <scratch>/ghp --emptyOutDir
✓ built in 8.14s

$ ls -la <scratch>/ghp/assets/*.js
-rw-r--r--    698  index-Dezn_h7o.js
-rw-r--r--  11774  quantize-worker-xMwe415C.js

$ find <scratch>/ghp -name "*.js" | wc -l
2

$ head -c 120 <scratch>/ghp/assets/index-Dezn_h7o.js
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;…
```

The entry chunk is **698 bytes of Vite's modulepreload polyfill and nothing else.** Application
strings, probed across the entire output:

```
$ for s in "Switch account" "unique identity" "enter slug or token" "My Palettes" "EMPTY PLATE"; do
      grep -rc "$s" <scratch>/ghp/assets/*.js ; done
0 0 0 0 0

$ grep -n "createApp\|App.vue\|app.mount" <scratch>/ghp/index.html
(no match — exit 1)

$ grep -o '<script[^>]*>' <scratch>/ghp/index.html
<script>
<script type="module" crossorigin src="./assets/index-Dezn_h7o.js">
```

The committed `dist/gh-pages` is byte-identical in kind — same chunk name, same 698 bytes, mtime
`Jul 27 18:46`. This is the W44 §F carry ("the gh-pages prod-preview empty-mount = the first
deep-audit probe"), reproduced and now localised.

**Root cause candidate — a missing module boundary at the composition root.** The demo has **no
entry module file.** Its root lives inline in markup, `demo/color-picker/index.html:205-213`:

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

```
$ git log --oneline --all -- demo/color-picker/main.ts
(empty — a real entry module has never existed in this repository's history)
```

The build consumes that inline block (it is absent from the emitted HTML, replaced by the
`index-*.js` reference) and emits a chunk containing none of its graph. Dev mode is unaffected —
Vite serves inline modules directly — which is why the visual audit captured 60 healthy dev
renders (`REPORT.md`: `blankOrNearBlank — 0`, `pageErrors — 0`) and why the deployed site still
renders (`shots/LIVE-color.babb.dev.png`, deployed by an earlier successful CI run of the same
script, `.github/workflows/deploy-pages.yml:109-133`). Dev/prod divergence with the composition
root as the fault line.

*Labelled hypothesis:* the proximate trigger is rolldown-vite's handling of inline
`<script type="module">` in `index.html`. Falsifiable in one step, which this seat may not perform
(no `demo/` edits): extract `demo/color-picker/main.ts` holding those seven lines, replace the
inline block with `<script type="module" src="./main.ts"></script>`, rebuild, assert the entry
chunk exceeds 698 bytes and contains `createApp`.

**Why this is a CHALLENGE-L finding and not a build ticket.** "Where does the application begin" is
a module-boundary question, and here the answer is "inside a markup file." The composition root has
no module home, therefore: no place in the module lattice; not typechecked as an entry
(`tsconfig.demo.json:57` includes `demo/`, not HTML); not importable by a test; invisible to every
structural rule in `eslint.config.js`. Its silent disappearance from a production build is the
predictable consequence of the missing boundary, not an unrelated toolchain accident.

**Consequence for this seat, and for every sibling seat in this formation:** no component in this
demo — orphan or live — can currently be certified against a production artefact. Run 1's
tree-shake question, and my own D-10-class question about whether the empty `<style scoped>` block
costs bytes, are both **unanswerable at HEAD** for this reason. Recorded as unmeasured, not clean.

**Proposed cure.** Create `demo/color-picker/main.ts` as the real entry, referenced by `src=`. The
fouc-guard boot script (`index.html:159-203` — pre-paint, intentionally inline and blocking) stays
inline; the *application* root becomes a module. Then add the gate that would have caught this at
the wave it landed: assert the emitted entry chunk contains `createApp`. Three lines of CI.

---

## L2-3 · MAJOR (new) — the demo's declared `@mkbabb/value.js` surface is WIDER than the published `exports` map by three specifiers

The challenge asks whether this component reaches the library through the published subpath map, and
names the failure mode: *"A demo import that a real consumer could not write is a library-structure
defect and a false proof of the public API."* `PaletteSlugBar.vue` imports nothing from
`@mkbabb/value.js` — correct for an identity presenter — but tracing the dogfood contract surfaced
that false proof, live, one keystroke away. Run 1 does not address the value.js surface.

**The published surface:**

```
$ node -e "console.log(Object.keys(require('./package.json').exports))"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]

$ node -e "const p=require('./package.json'); console.log('main:',p.main,'types:',p.types)"
main: undefined types: undefined
```

Seven keys, **no `.` root**, and no `main`/`types` fallback — so `import … from "@mkbabb/value.js"`
fails for a real consumer with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

**The declared surface** — `tsconfig.demo.json:42-49`:

```json
"@mkbabb/value.js":           ["./dist/index.d.ts"],            // ← NOT in exports
"@mkbabb/value.js/color":     ["./dist/subpaths/color.d.ts"],
"@mkbabb/value.js/parsing":   ["./dist/subpaths/parsing.d.ts"], // ← NOT in exports
"@mkbabb/value.js/math":      [...],
"@mkbabb/value.js/easing":    [...],
"@mkbabb/value.js/units":     ["./dist/subpaths/units.d.ts"],   // ← NOT in exports
"@mkbabb/value.js/transform": [...],
"@mkbabb/value.js/quantize":  [...]
```

Three of eight are published nowhere, and the targets do not exist either:

```
$ ls src/subpaths/
color.ts  css.ts  easing.ts  math.ts  quantize.ts  transform.ts  value.ts
$ ls dist/subpaths/ | grep -c "parsing\|units"
0
```

And the map **omits `/css`**, which *is* published and which 10 demo files import. So the type
surface and the runtime surface disagree in both directions: 3 phantom keys, 1 missing live key.

**The mechanism is an asymmetry in how the two surfaces are derived.** The Vite alias set is
*generated* from the exports map and therefore cannot drift —

```ts
// vite.config.ts:37-50 — "GENERATED (not hand-rolled) so the alias set can never drift from the
// exports map: add or rename a subpath in `package.json#exports` and the alias follows."
const valueJsSelfAlias = Object.entries(VALUE_JS_PKG.exports).map(([subpath, conditions]) => {…});
```

— while the tsconfig `paths` are hand-rolled, and their own comment describes a set that no longer
exists: *"the bare `.` root + the 7 subpath barrels … the `exports` map is a **CLOSED 8-key set**"*
(`tsconfig.demo.json:37-41`). The map has 7 keys and no root. The comment documents a contract that
was silently narrowed underneath it.

**Current blast radius is zero, and that is the whole risk:**

```
$ grep -rn 'from "@mkbabb/value.js"\|@mkbabb/value.js/parsing\|@mkbabb/value.js/units' demo src test e2e
(no output)

$ grep -rn 'from "@mkbabb/value.js' demo | sed 's/.*from //' | sort | uniq -c | sort -rn
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";
```

All 49 demo imports use the five real subpaths. But a future demo author who writes
`@mkbabb/value.js/parsing` — a plausible reach, given the V·π parser mini-tranche in flight — is
writing an import no consumer of the published package can write, and `tsconfig.demo.json` tells
them it is public. The dogfood proof would be false at exactly the moment it mattered most.

**Proposed cure.** Generate the tsconfig `paths` from `package.json#exports` the same way the Vite
aliases already are: a small prebuild step emitting a generated `tsconfig.paths.json` that
`tsconfig.demo.json` extends. Drift becomes structurally impossible instead of comment-enforced —
the identical argument `vite.config.ts:28-30` already makes for itself. Then rule explicitly on the
bare root: either add `"."` to `exports` or delete it from the paths map. Today it is claimed and
unshipped.

---

## L2-4 · MINOR (new) — `.slug-pill` is a demo-local design primitive glass-ui should own, and this component paints it with the *uncertified* ink a live sibling measured and abandoned

**(a) Wrong home.** `demo/styles/foundation.css:583-587`:

```css
/* … the admin users panel, and the slug bar (was copy-pasted at 5+ sites).
 * Consumers set `color` / `border-color` per-instance via :style. */
.slug-pill {
    @apply text-mono-small font-bold px-2 py-0.5 rounded-full border;
}
```

Five consumers: `PaletteSlugBar.vue:48,65`, `MobileMenuDropdown.vue:48,67`,
`ProfileSection.vue:73,96`, `AdminUsersPanel.vue:98,167`. The `@apply` extraction was the right
*move* away from copy-paste but stopped one layer short of the right *home*: a rounded, bordered,
mono, colour-parameterised token is a **chip/badge**, and glass-ui 7.0.0 publishes both
(`./chip` and `./badge` are in its `exports` map — verified against
`node_modules/@mkbabb/glass-ui/package.json`). Owner edict 4 puts the variant in glass-ui under the
existing component-type name, not in a demo utility class whose contract ("consumers set
`color`/`border-color` per-instance via `:style`") is documented in a CSS comment and enforced
nowhere. The per-instance `:style` contract is itself the root-level-styling violation (edict 5):
five consumers each re-derive the ink.

**(b) And this component re-derives it wrongly.** `PaletteSlugBar.vue:49`:

```html
:style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
```

The raw pick, straight onto text and border. Two of the five consumers do it *correctly*, through
the certified-ink instrument — `ProfileSection.vue:26-31`:

```ts
const { safeCss: chromeSafeCss } = useSafeAccentFn("chrome");
const { safeCss: floatingSafeCss } = useSafeAccentFn("floating");
const triggerInk = computed(() => chromeSafeCss(cssColorOpaque));
const menuInk    = computed(() => floatingSafeCss(cssColorOpaque));
```

…backed by `demo/color-session/useContrastSafeColor.ts`, whose docstring records that its guard is
`certifyAccentInk` — *"the library's OKLab distance guard + gamut-map + a WCAG floor walk … sourced
ENTIRELY from the library (S.W2-2 ⊣ W1-6: the demo carries NO norm/denorm color math)"*. That is the
one correct home for this concept, and it is the one place where this component's area *should*
touch value.js and does not.

`ProfileSection.vue:21-25` records the measurement that condemns the raw idiom:

> "the raw pick as text/border measured **≤1.28:1** on the real menu ground for roughly half of all
> picks per scheme. Two hosts, two referents … each ink certifies against the surface it actually
> composites over."

So `PaletteSlugBar` carries a known-uncertified contrast path whose cure was measured, authored and
shipped in a sibling. This is the same shape as run 1's L-2/L-9 findings and my L2-1: **the live
sibling fixed it; the orphan kept the pre-fix code.** Four independent instances of that pattern now
sit in this report and run 1 combined (error mapping, `border-primary/30`, `useTemplateRef`,
certified ink) — which is the strongest available argument that the cure is deletion, not revival.

---

## L2-5 · confirmations — findings I re-measured independently

These reproduce run 1's results by different or overlapping commands. Recorded because independent
confirmation is what a re-run is for; see §Reconciliation for the mapping.

**Zero render sites** (run 1 L-1). Exhaustive search, four hits, none a mount:

```
$ grep -rn "PaletteSlugBar\|palette-slug-bar" --include="*.vue" --include="*.ts" \
    --include="*.js" --include="*.html" demo src test e2e
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
```

Visual confirmation, `shots/safari-desktop-light/palettes.png` (I read the image): the `/#/palettes`
pane renders "My Palettes", the search field, "Start a new palette" and the EMPTY PLATE state — **no
slug pill, no account kebab, no in-pane Login.** The only identity affordance on screen is the
`Login` pill in the dock band, which is `ProfileSection.vue:110-119`. Identical across
`safari-desktop-dark`, `safari-mobile-light`, `safari-mobile-dark`.

**`slugBarRef` is permanently null** (run 1 L-3). Every reference:

```
$ grep -rn "slugBarRef" demo
useSlugMigration.ts:30    declaration
useSlugMigration.ts:84-87 the four setError calls
useSlugMigration.ts:121   returned
```

`usePalettePorts.ts:133-134` forwards only `onRegenerateSlug` / `onSlugSwitch` onto the session
port; the returned `migration` object's only consumer reads three members
(`App.vue:153,155,156`). No template writes `ref="slugBarRef"`. The S.W2 W2-6 typed-`ApiProblem`
fix (`useSlugMigration.ts:75-80`) landed in a dead channel.

**13 byte-identical lines with the live twin** (run 1 L-2), same command, same result:

```
$ sed -n '184,196p' demo/palettes/browser/slug/PaletteSlugBar.vue > a.txt
$ sed -n '25,37p'   demo/shell/dock/layers/SlugEditLayer.vue      > b.txt
$ diff a.txt b.txt && echo "IDENTICAL (0 differing lines)"
IDENTICAL (0 differing lines)
```

`looksLikeSlug` + `normalizeTokenInput`. The known-broken substring branch survives in both twins:
`PaletteSlugBar.vue:218` and `SlugEditLayer.vue:59`, both `msg.includes("409")`.

**The top-level seam has zero importers** (run 1 L-5):

```
$ grep -rn 'from "[^"]*palettes/browser"\|from "\./browser"' demo --include="*.vue" --include="*.ts"
(no output)
```

All real consumers reach sub-barrels. Sub-barrel file counts, showing `slug/` as the outlier:
`admin/` 9, `card/` 9, `dialog/` 5, `search/` 5, `status/` 2, **`slug/` 2** — one dead SFC plus a
3-line barrel.

**The seam's lint rule cannot fire** (run 1 L-4). Confirmed by glob analysis rather than
`--print-config`: `eslint.config.js:232-238,275-277` scope to `demo/@/components/**`,
`demo/@/lib/**`, `demo/@/composables/**` —

```
$ ls -d demo/@
ls: demo/@: No such file or directory      (deleted at a61094e3, "demo/@ dies (D-c)")
```

— and the banned pattern `"@components/custom/palette-browser/**/*.vue"` targets an alias killed at
W43/RF-15 (`tsconfig.demo.json:32-34`: *"No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/
`@assets` project alias survives"*). I additionally verified that the 17 surviving
`@components/`/`@lib/`/`@styles/` occurrences in `demo/` are **all inside prose comments**, not
imports (read each; e.g. `demo/palettes/browser/status/index.ts:5-6`,
`demo/shell/dock/status-lamp.ts:15`, `demo/color-session/palettes-ramp.ts:12`). G-DEMO-1 and
G-DEMO-3a match zero files; G-DEMO-3b's one live glob bans an unwritable pattern.

**`demo/ui/` is a pure alias layer** (run 1 L-6), with one measurement run 1 did not take —
the *granularity* of the reach:

```
$ find demo/ui -name "*.vue" | wc -l                              → 0
$ cat demo/ui/*/index.ts | wc -l                                  → 29
$ ls demo/ui | wc -l                                              → 19
$ grep -l 'from "@mkbabb/glass-ui";' demo/ui/*/index.ts | wc -l   → 18
$ grep -l 'from "@mkbabb/glass-ui/' demo/ui/*/index.ts            → demo/ui/input/index.ts
```

19 barrels, 0 SFCs, 29 lines. **18 of 19 reach the glass-ui root barrel; exactly one reaches a
subpath** — although glass-ui 7.0.0 publishes 60+ per-component subpaths including `./button`,
`./popover`, `./dropdown-menu`, `./tooltip`. So this file, which already writes
`@mkbabb/glass-ui/search` correctly at line 132, pulls `Button` and `Popover` through shims that
reach the root — **three reach idioms for one dependency inside one 14-line import block**
(lines 132, 133-134, 145).

**Shell → feature inversion** (run 1 L-7). Confirmed at the two files this component's concept
touches: `SlugEditLayer.vue:5` and `ProfileSection.vue:15` both import `SESSION_PORT_KEY` from
`../../../palettes/usePalettePorts`, and the key is `Symbol("palette.session")`
(`usePalettePorts.ts:271`) although its inputs come from `demo/platform/auth/`.

**Dead public surface** (run 1 L-9), re-verified: `hasSavedPalettes` required at `:150`, read
nowhere; `copy: []` declared at `:155`, emitted nowhere (`onCopySlug` at `:168-170` calls
`writeClipboard` directly); `resetEditMode` exposed at `:236`, called nowhere
(`grep -rn resetEditMode demo` → declaration + expose only). Note the contradiction the pair
`copy` + `writeClipboard` encodes: the component simultaneously declares clipboard writing to be the
parent's job and performs it itself. The live twins duplicate the *ambiguity* too —
`SlugEditLayer.vue:69` writes locally, `ProfileSection.vue:37,78` emits upward.

---

## L2-6 · the greenfield lattice

Run 1's L-8 lattice is correct and I adopt it: identity becomes its own module below both areas
(`demo/platform/auth/` — `slugFormat.ts` for the 13 duplicated lines, `useIdentity.ts` owning
`lastError` as reactive state instead of a template ref), the chrome collapses to one
`IdentityMenu.vue` plus `SlugEditLayer.vue` under `demo/shell/dock/identity/`, and
`demo/palettes/browser/slug/`, `demo/palettes/browser/index.ts`, `demo/ui/**` are deleted. Its
edge-set claim — shell ⇄ palettes goes from bidirectional to zero — is the right invariant.

This run adds **two nodes run 1's lattice omits**, both from findings above:

```
demo/color-picker/main.ts          ← NEW. THE ENTRY MODULE.                        (L2-2)
    the seven lines currently inline in index.html:205-213. Typechecked, importable,
    testable, and present in the module graph. The fouc-guard boot script stays inline;
    the APPLICATION root stops living in markup.

tsconfig.paths.json (generated)    ← NEW. Derived from package.json#exports.        (L2-3)
    the same generation vite.config.ts:37-50 already performs, so the type surface
    and the runtime surface cannot disagree. Deletes 3 phantom specifiers and
    restores the missing /css entry by construction.
```

and **one relocation** run 1's lattice implies but does not state:

```
.slug-pill  →  glass-ui Chip/Badge variant                                          (L2-4)
    the demo keeps zero design primitives. Consumers pass the CERTIFIED ink from
    demo/color-session/useContrastSafeColor (the one certifier), never the raw pick.
```

Four rules make the lattice hold, each replacing something that is presently a comment or a dead
lint rule:

1. **Direction is one-way: `platform ← color-session ← shell / palettes`,** expressed in
   `no-restricted-imports` against **relative paths** so the rule can match the post-alias tree
   (today it cannot — L2-5).
2. **glass-ui is reached by subpath, always, directly.** No `demo/ui/`, no root-barrel reach, no
   relative climb for a primitive; new variants authored in glass-ui.
3. **One home per concept, at the lowest layer that needs it.** Pure functions (slug grammar) go to
   `platform/`; error state belongs to the composable that makes the request and is exposed as
   *data*, never harvested upward through `defineExpose` + a template ref; ink has exactly one
   certifier.
4. **Both boundaries are machine-checked, not documented:** the reachability sweep of L2-1 (which
   prints orphans) and the entry-chunk assertion of L2-2 (which fails an empty build). Three of the
   four defects in this report survived multiple tranches specifically because the only enforcement
   was prose.

Most of this is deletion. The only *additions* are `main.ts` — the one module the application has
always been missing — and one generated tsconfig fragment.

---

## Reconciliation with run 1

| run 1 finding | this run |
|---|---|
| L-1 zero mounts, 243 dead lines | **CONFIRMED** independently (grep + `/#/palettes` screenshot read). **EXTENDED** by L2-1: the orphaning commit `95993197`, the defeated gate, and the two later commits that maintained the orphan. |
| L-2 four homes, 13 identical lines | **CONFIRMED** (same `diff`, 0 differing lines). Run 1's extra findings — the `"Already signed in as this slug."` / `"Already signed in."` copy divergence, the `ProfileSection`/`MobileMenuDropdown` breakpoint-forked twins — stand and I add nothing. |
| L-3 login failure is silent | **CONFIRMED** statically (`slugBarRef` unbound; `App.vue` binds 3 members). Run 1's **live browser reproduction** (`destructive:0`, `slugInputValue:""`, un-awaited `pm.onSlugSwitch`) is the stronger evidence and remains the primary citation for this defect. I did not re-drive the browser. |
| L-4 vacuous lint rule | **CONFIRMED** by glob/alias analysis; run 1's `npx eslint --print-config … → null` is the cleaner proof. **EXTENDED**: the 17 surviving `@components/`-style strings in `demo/` are all comments, so no import can match. |
| L-5 top seam, 0 importers | **CONFIRMED** (`grep` → no output). |
| L-6 `demo/ui/` alias layer | **CONFIRMED** (19 files / 29 lines / 0 SFCs). Run 1's 92-imports-across-81-files debt figure and 43-vs-7 chunk fan-out stand. **EXTENDED**: 18 of 19 barrels reach the glass-ui *root* while glass-ui publishes per-component subpaths. **DOWNGRADE**: run 1 flagged its bundle-cost claim as an unmeasured hypothesis; L2-2 shows it is currently **unmeasurable** — there is no production bundle. Keep it labelled a hypothesis. |
| L-7 shell → feature inversion | **CONFIRMED** at the two identity files; run 1's five-file / eight-edge enumeration and the `ViewId` back-edge stand. |
| L-8 greenfield lattice | **ADOPTED**, plus two new nodes (`main.ts`, generated `tsconfig.paths.json`) and one relocation (`.slug-pill` → glass-ui). |
| L-9 in-file defects | **CONFIRMED** for the dead prop / dead emit / retired error idiom / pre-3.5 template ref / hand-rolled buttons / Popover-as-menu / empty scoped style. Run 1's `isAdmin` shadow at `:205` and `setTimeout(…, 50)` are its own finds and I confirm both by reading. **DOWNGRADE**: run 1 states the empty `<style scoped>` "still emits a `data-v-*` scope id" as fact; I could not measure it (no production bundle — L2-2) and label it a hypothesis with the falsifiable test stated. |
| L-9b server slug-format contract | **CONFIRMED as run 1's own find** (512/512 words pass; latent). Not re-measured. |
| — | **NEW L2-2**: production build emits zero application code; no entry module. |
| — | **NEW L2-3**: `tsconfig.demo.json` declares 3 unpublished value.js specifiers and omits a live one. |
| — | **NEW L2-4**: `.slug-pill` should be a glass-ui chip/badge; this component paints it with the uncertified raw pick (≤1.28:1 measured by the sibling). |
| — | **NEW L2-1**: the orphaning commit and the defeated liveness gate. |

---

## Defect table (this run)

| id | severity | defect | evidence |
|---|---|---|---|
| L2-1 | BLOCKER | Orphaned at `95993197` when its sole parent `PaletteControlsBar.vue` was deleted; the sweep's "grep all imports before delete" gate was defeated by the barrel re-export + an `import type`; the same commit *improved* the orphan (§8) and `f2c8f565` touched it again | `git log -S"<PaletteSlugBar"`; `git show 95993197` lines 36/800/874/921; `git log -- …/PaletteSlugBar.vue` |
| L2-2 | BLOCKER | `vite build --mode gh-pages` emits a 698-byte entry containing only the modulepreload polyfill — zero application code; the composition root is an inline `<script type="module">` and no `main.ts` has ever existed | pasted build output; `find … -name "*.js" | wc -l` → 2; `grep createApp` on built HTML → no match; `git log --all -- demo/color-picker/main.ts` → empty |
| L2-3 | MAJOR | `tsconfig.demo.json:42-49` declares 3 value.js specifiers absent from `package.json#exports` (bare root, `/parsing`, `/units`) and omits `/css`, which 10 demo files import; Vite aliases are generated from exports, tsconfig paths are hand-rolled | `Object.keys(exports)` → 7 keys, no `.`; `ls src/subpaths/`; `vite.config.ts:37-50` vs `tsconfig.demo.json:37-49` |
| L2-4 | MINOR | `.slug-pill` is a demo-local chip/badge glass-ui should own (5 consumers, per-instance `:style` contract); this component paints it with the raw pick the sibling measured at ≤1.28:1 and replaced with certified ink | `foundation.css:583-587`; `PaletteSlugBar.vue:49` vs `ProfileSection.vue:21-31`; `useContrastSafeColor.ts:9-38` |
| L2-5 | — | Independent confirmation of run 1 L-1/2/3/4/5/6/7/9 | commands pasted in §L2-5 |

**Strongest defect (this run): L2-2** — the production build ships no application. It outranks the
component-local findings on every axis: it is a BLOCKER for the entire demo rather than one
component, it silently invalidates the tree-shaking and byte-cost questions that both runs of this
seat wanted to answer, and its cause is exactly the defect class this challenge exists to find — a
missing module boundary, here at the composition root, where "the application" has no module home
at all. It also explains why the empty-mount carry survived W44 as prose: no boundary, no gate.

**Strongest defect overall, across both runs: run 1's L-3** — login failure is silent in the live
application because the only error surface was assigned to a component the shell cannot mount. It
remains the cleanest demonstration that this boundary is wrong: no amount of correct code inside
`PaletteSlugBar.vue` could have prevented it. L2-1 now supplies its missing half — *when* the
boundary broke, and *why* the gate that should have caught it did not.
