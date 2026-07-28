# CHALLENGE-L · library structure — `demo/palettes/browser/slug/PaletteSlugBar.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

**Run note — this is run 3.** Two prior Opus 5 CHALLENGE-L runs exist and **nothing in them is
superseded**:

| run | file | landed |
|---|---|---|
| 1 | `challenge-L-library.run-1.md` (L-1 … L-9) | 2026-07-27 |
| 2 | `challenge-L-library.run-2.md` (L2-1 … L2-6) — archived by this run before writing | 2026-07-28 |

§Reconciliation states exactly which prior findings I re-measured, and the **six findings this run
adds**. Run 3's contribution is a shift of altitude: runs 1 and 2 audited the *module* boundaries
around this file. This run audits the two boundaries neither reached — the **package manifest**
(what a real consumer of `@mkbabb/value.js` installs) and the **whole-graph reachability** of the
demo (250 modules, measured, with the CI gate run 2 asked for delivered as a runnable script).

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief names HEAD
`c654824e`; the branch has advanced to `f36f780c` (`git merge-base --is-ancestor c654824e HEAD` →
YES). All measurements below were taken at `f36f780c`. **No source edits were made.** The only
writes are this file, the run-2 archive, and `probes/L3-demo-reachability.{mjs,out.txt}` — all under
this component's audit directory.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The premise holds, and the fault is not local to this component. `PaletteSlugBar.vue` is one of
exactly **two unreachable `.vue` files in a 250-module demo** (measured, §L3-2) — but the same
audit, run at package altitude, shows the defect it exemplifies repeated at three larger scales:

1. **The published library ships the demo's dependency graph.** `@mkbabb/value.js@4.0.0` declares
   `@mkbabb/glass-ui` and `@mkbabb/keyframes.js` as runtime `dependencies` while `src/` imports
   neither. `npm ls --omit=dev` prints a **package-level cycle** — value.js → glass-ui →
   value.js — and drags Vue, reka-ui and Tailwind into every consumer's install. The specifier that
   proves it is on line 132 of the subject file. (§L3-1)
2. **A second, better implementation of palette export is alive, tested, and unreachable.** The
   brief named `demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers` as a
   suspect. It is real, and worse than a dual path: the shipped implementation has **no tests**, and
   the tested implementation is **not shipped**. `demo/test/export/byte-exact.test.ts` is a green
   gate over code the application never loads — proven against the live dev server. (§L3-3)
3. **The barrel idiom that hid this component's death also produced the demo's only runtime import
   cycle.** One SCC in 250 modules: `Dock.vue` ↔ `dock/index.ts`. (§L3-4)

The cure for the file is deletion (run 1, L-1). The cure for the *structure* is three gates and one
manifest split, stated in §L3-8.

---

## L3-1 · BLOCKER (new) — the published package's runtime dependencies are the DEMO's dependencies; installing this pure library installs a Vue design system, and npm prints a package cycle

This is the challenge's own question — *"Does it import from `@mkbabb/value.js` correctly … The
published surface is in `package.json` `exports`"* — asked one level up. `PaletteSlugBar.vue`
imports no value.js symbol, but it imports the design system twice:

```
demo/palettes/browser/slug/PaletteSlugBar.vue:132  import { SearchBar } from "@mkbabb/glass-ui/search";
demo/palettes/browser/slug/PaletteSlugBar.vue:145  import { writeClipboard } from "@mkbabb/glass-ui";
```

Trace that specifier to its home in the manifest and it is not a devDependency.

**The manifest.**

```
$ node -e "const p=require('./package.json'); console.log('name',p.name,p.version);
           console.log('dependencies:',JSON.stringify(p.dependencies));
           console.log('peerDependencies:',p.peerDependencies);
           console.log('files:',JSON.stringify(p.files))"
name @mkbabb/value.js 4.0.0
dependencies: {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}
peerDependencies: undefined
files: ["dist","!dist/gh-pages","!dist/gh-pages/**"]
```

Two **runtime `dependencies`**. Not `devDependencies`, not `peerDependencies`, not `optional`.

**The library does not use either of them.**

```
$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src
(no output — exit 1)

$ grep -rl "@mkbabb/glass-ui" dist/*.js dist/subpaths/*.js
(no output)

$ grep -rl "@mkbabb/keyframes" demo src test | wc -l
0
```

`src/` — the only thing `files` ships — references neither, and `@mkbabb/keyframes.js` has **zero
importers anywhere in the repository**, demo included. `tsconfig.lib.json`'s own header states the
invariant this manifest breaks: *"This is the ONLY value.js program that may see glass-ui; the
library program (tsconfig.lib.json) never does (inv-K-1 — **structurally glass-ui-free**)."* The
*compiler* program is glass-ui-free; the *package* is not.

**What a consumer installs — `npm ls --omit=dev`, the production tree, pasted verbatim:**

```
$ npm ls --omit=dev --depth=2
@mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
├─┬ @mkbabb/glass-ui@7.0.0
│ ├─┬ @lucide/vue@1.17.0
│ │ └── vue@3.5.35 deduped
│ ├── @mkbabb/keyframes.js@6.0.0 deduped
│ ├── @mkbabb/value.js@4.0.0                 ← the cycle, printed by npm itself
│ ├─┬ @vueuse/core@14.3.0
│ ├─┬ reka-ui@2.9.9
│ │ ├── @floating-ui/dom@1.7.6
│ │ ├── @internationalized/date@3.12.2
│ │ ├── @tanstack/vue-virtual@3.13.28
│ │ …
│ ├── tailwindcss@4.3.0
│ ├── tw-animate-css@1.4.0
│ └─┬ vue@3.5.35
└─┬ @mkbabb/keyframes.js@6.0.0
  └── @mkbabb/value.js@4.0.0 deduped
```

**(a) The cycle is real and structural.** glass-ui declares value.js as a peer:

```
$ node -e "const p=require('./node_modules/@mkbabb/glass-ui/package.json');
           console.log(JSON.stringify(p.peerDependencies,null,1))"
{ "@lucide/vue": "^1.16.0", "@mkbabb/keyframes.js": "^6.0.0", "@mkbabb/pencil-boil": "^0.9.2",
  "@mkbabb/value.js": "^4.0.0", "@vueuse/core": "^14.0", "embla-carousel": "^8.0",
  "embla-carousel-vue": "^8.0", "reka-ui": "^2.0", "tailwindcss": "^4.0",
  "tw-animate-css": "^1.2.5", "vue": "^3.5" }
```

value.js → glass-ui (`dependencies`) → value.js (`peerDependencies`). glass-ui's edge is the correct
one: a design system built *on* a colour library should peer-depend on it. value.js's edge is the
inverted one, and it closes the loop. This is the challenge's "wrong direction of dependency" in its
purest available form — at the only boundary a real consumer can observe.

**(b) The weight is demo weight, charged to library consumers.**

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
```

Of glass-ui's peers, **four are non-optional** — `@lucide/vue`, `reka-ui`, `tailwindcss`, `vue`
(`peerDependenciesMeta` marks only `@vueuse/core`, `embla-carousel`, `embla-carousel-vue`,
`@mkbabb/keyframes.js`, `@mkbabb/pencil-boil`, `@mkbabb/value.js`, `tw-animate-css` optional). npm 7+
auto-installs non-optional peers. So `npm i @mkbabb/value.js` — a colour/units/easing library whose
own `dist` is framework-free — installs Vue 3, reka-ui, Tailwind 4 and a lucide icon set.

**(c) The mechanism: one manifest serving two programs.** The repository has exactly one
`package.json`. It is simultaneously the published library's manifest and the demo's manifest. The
demo needs glass-ui; the library's `dependencies` field is where that need was recorded. Every other
demo need was recorded correctly in `devDependencies` (`vue`, `vue-router`, `reka-ui`,
`@lucide/vue`, `tailwindcss`, `@vueuse/core` — 33 entries), which makes these two the anomaly, not
the pattern. The likely proximate cause is that `dependencies` is npm's default install target
(`npm i @mkbabb/glass-ui` without `-D`).

**Aggravating: `dependencies` and `devDependencies` disagree about the same graph.** `@lucide/vue`
is a `devDependency` of value.js *and* a non-optional peer of value.js's own runtime dependency.
Inside this checkout npm reconciles that; for a consumer it is a peer resolved from nowhere.

**Reproduction.** The five commands above, in the repository root.

**Proposed cure — architectural transposition, not a field edit.**

- Move `@mkbabb/glass-ui` and `@mkbabb/keyframes.js` to `devDependencies`. The published surface is
  `dist/`, which references neither; the demo is a dev program and dev deps are exactly its home.
  This alone kills the cycle and the 5.8 MB.
- Then make the split structural so it cannot regress: give the demo its own
  `demo/package.json` (an npm workspace) and let the root manifest describe **only** the library. A
  demo dependency then has no syntactic path into the published manifest. This is the same argument
  `tsconfig.lib.json` already makes for the *compiler* — inv-K-1 gives the library its own program so
  it is structurally glass-ui-free; the package needs the identical treatment, and today it is the
  one axis where the dogfood story is unguarded.
- Gate: assert in CI that `dependencies` is `{}` (this library has no runtime deps) — one line, and
  the exact class of drift that produced a self-referential package.

---

## L3-2 · BLOCKER (new) — whole-graph reachability, measured: 250 modules, 239 reachable, and exactly TWO unreachable `.vue` files — this component is one of them

Run 1 (L-1) proved this component never mounts by exhaustive grep. Run 2 (L2-1) asked for the gate:
*"one script that starts from the entry module and the router's component map, walks
template/`h()`/dynamic-import edges, and prints every `.vue` under `demo/` that it never reaches. Run
it in CI."* This run wrote it, ran it, and lands it as an artefact.

`probes/L3-demo-reachability.mjs` (under this component's audit directory) builds the demo import
graph over all 250 `.ts`/`.vue` files, following `import … from`, `export … from` (barrels are
edges — the omission that hides orphans behind seams) and dynamic `import(…)`, **dropping
type-only edges** so a result is a runtime result. Roots are taken from the real entry,
`demo/color-picker/index.html:205-213`.

```
$ node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/L3-demo-reachability.mjs
files scanned: 250
runtime SCCs (size>1): 1
--- SCC size 2
   demo/shell/dock/Dock.vue
   demo/shell/dock/index.ts

entry roots: [ 'demo/color-picker/App.vue', 'demo/color-picker/router/index.ts' ]
reachable modules: 239 / 250
UNREACHABLE .vue (2):
   demo/palettes/browser/slug/PaletteSlugBar.vue
   demo/scenes/about/katex/Katex.vue

UNREACHABLE .ts (24):
   demo/color-picker/vite.d.ts
   demo/palettes/browser/index.ts
   demo/palettes/browser/slug/index.ts
   demo/palettes/browser/status/index.ts
   demo/palettes/export/bytes.ts
   demo/palettes/export/canonical.ts
   demo/palettes/export/css.ts
   demo/palettes/export/digest.ts
   demo/palettes/export/json.ts
   demo/palettes/export/png.ts
   demo/palettes/export/reload.ts
   demo/palettes/export/rfc8785.ts
   demo/palettes/export/serializers.ts
   demo/palettes/export/svg.ts
   demo/palettes/export/tailwind.ts
   demo/palettes/export/types.ts
   demo/palettes/types.ts
   demo/scenes/about/katex/index.ts
   demo/test/export/byte-exact.test.ts
   demo/test/glass/aurora-bracket.test.ts
   demo/test/glass/aurora-motion.test.ts
   demo/ui/label/index.ts
   demo/ui/switch/index.ts
   demo/workbenches/extract/quantize-worker.ts

value-importers of demo/palettes/browser/index.ts: []
value-importers of demo/palettes/browser/slug/index.ts: ["demo/palettes/browser/index.ts"]
value-importers of demo/palettes/browser/status/index.ts: ["demo/palettes/browser/index.ts"]
```

Full output preserved at `probes/L3-demo-reachability.out.txt`.

**What the numbers say that a grep cannot.**

- **95.6 % of the demo is reachable.** The tree is not rotten; the orphan is an outlier, which makes
  it a *detectable* outlier — the gate has an almost-zero false-positive floor. Two `.vue` misses in
  250 modules is a CI signal, not noise. (`Katex.vue` is the second: `demo/scenes/about/katex/index.ts`
  has zero importers — `grep -rn 'from "./katex"\|from "../katex"' demo` returns nothing —
  and `Markdown.vue:291-293` refers to `<Katex>` only inside a CSS comment. A second orphan, same
  shape, same barrel mechanism; out of this seat's scope but printed by the same run.)
- **The `slug/` sub-barrel is reachable only through a barrel that nothing imports.** `slug/index.ts`
  has exactly one value-importer — `demo/palettes/browser/index.ts` — which itself has **zero**.
  Run 1's L-5 asserted the seam is unimported; this is the graph-level proof, and it shows the
  orphan is protected by *two* layers of unreferenced indirection, not one.
- **The gate run 2 asked for would have fired on the orphaning commit.** Run 2 localised the death to
  `95993197`, whose stated protocol was "grep all imports before delete" and which was defeated by a
  barrel edge and an `import type` edge. This script discounts both classes **by construction**: the
  barrel is followed as an edge (so a barrel-only reference cannot make a module look alive), and
  type-only imports are dropped (so `useSlugMigration.ts:6` cannot either).

**Cost.** 250 files, one pass, no compiler:

```
$ time node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/L3-demo-reachability.mjs > /dev/null
node > /dev/null  0.08s user 0.02s system 99% cpu 0.100 total
```

**Proposed cure.** Adopt the script as a CI step (`node scripts/check-demo-reachability.mjs`, exit
non-zero on any unreachable `.vue`) with a tiny allowlist for genuinely intentional lazy roots. Its
first output is the deletion list: `demo/palettes/browser/slug/` (this component + barrel),
`demo/palettes/browser/index.ts`, and — after a separate ruling — `Katex.vue`. This is a *structural*
answer to a class of defect the repository has now hit at least three times (`ImagePaletteExtractor`
correctly caught in `95993197`; `PaletteSlugBar` missed by the same sweep; `Katex` never noticed).

---

## L3-3 · BLOCKER (new) — the dual path the brief named is real, and inverted: the SHIPPED export implementation has no tests; the TESTED one is unreachable

The brief lists among named historical suspects: *"`demo/palettes/export.ts` + `usePaletteExport.ts`
vs `export/serializers`."* Both prior runs record zero mentions of it
(`grep -c "usePaletteExport\|export/serializers"` → `0` in run 1 and run 2). It is live, and the
inversion is worse than a plain duplicate.

**Two implementations of one concept, in one directory:**

```
$ wc -l demo/palettes/export.ts demo/palettes/usePaletteExport.ts demo/palettes/export/*.ts
     132 demo/palettes/export.ts
      27 demo/palettes/usePaletteExport.ts
      45 demo/palettes/export/bytes.ts
      98 demo/palettes/export/canonical.ts
      17 demo/palettes/export/css.ts
      77 demo/palettes/export/digest.ts
      29 demo/palettes/export/json.ts
     213 demo/palettes/export/png.ts
     235 demo/palettes/export/reload.ts
      46 demo/palettes/export/rfc8785.ts
      47 demo/palettes/export/serializers.ts
      23 demo/palettes/export/svg.ts
      22 demo/palettes/export/tailwind.ts
      62 demo/palettes/export/types.ts
```

| | `export.ts` (132 L) | `export/` (12 modules, 914 L) |
|---|---|---|
| API | `exportAsJSON` · `exportAsCSSCustomProperties` · `exportAsTailwindConfig` · `exportAsSVG` · `exportAsPNG` · `downloadExport` | `serializeJson` · `serializeCss` · `serializeTailwind` · `serializeSvg` · `serializePng` + `canonicalizeJson` (RFC 8785) · `digest` · `reloadSnapshot` |
| reached by the app | **yes** | **no** (unreachable — §L3-2) |
| covered by tests | **no** | yes — `demo/test/export/byte-exact.test.ts:23` |

**Which one the application actually loads — proven against the LIVE dev server**, not inferred.
`usePaletteExport.ts:9` imports the ambiguous specifier `"./export"`, which could resolve to either
`export.ts` or `export/index.ts`. Vite's own resolution, read off `http://localhost:9000`:

```
$ curl -s "http://localhost:9000/@fs/Users/mkbabb/Programming/value.js/demo/palettes/usePaletteExport.ts" | head -1
import { exportAsJSON, exportAsCSSCustomProperties, exportAsTailwindConfig, exportAsSVG,
  exportAsPNG, downloadExport } from "/@fs/Users/mkbabb/Programming/value.js/demo/palettes/export.ts";
```

`export.ts`. There is no `export/index.ts` (`ls demo/palettes/export/` above), so the directory can
never win that resolution. And the consumers are the two live panes:

```
$ grep -rn "usePaletteExport" demo
demo/palettes/BrowsePane.vue:198   import { usePaletteExport } from "./usePaletteExport";
demo/palettes/BrowsePane.vue:324   const { onExport } = usePaletteExport();
demo/palettes/PalettesPane.vue:152 import { usePaletteExport } from "./usePaletteExport";
demo/palettes/PalettesPane.vue:211 const { onExport } = usePaletteExport();
```

**The only importer of the tested tree is the test:**

```
$ grep -rn "palettes/export\|from \"./export\|from \"../export" demo
demo/test/export/byte-exact.test.ts:23  } from "../../palettes/export/serializers";
demo/palettes/usePaletteExport.ts:9     } from "./export";
```

**How it happened — same day, four hours apart, no rewire:**

```
$ git log -1 --format="%h %ci %s" bc06a0cd
bc06a0cd 2026-07-17 12:02:01 -0400 feat(v-w43b)!: demo @-alias death + colocation/promotion moves (RF-15 §b 1-2)
$ git log -1 --format="%h %ci %s" d881eefc
d881eefc 2026-07-17 15:58:21 -0400 feat(v-w51): byte-exact palette export serializers over ExportSnapshot
```

W43b re-homed the old flat `export.ts` at 12:02; W51 landed the byte-exact serializer tree at 15:58
**beside** it and never migrated `usePaletteExport.ts:9`. That is precisely the standing
no-legacy/no-dual-path edict's failure mode — the replacement landed, the original stayed, both are
alive in the tree, and neither is marked.

**Why this is a BLOCKER and not a cleanup.** The consequence is a **false green gate**. The
repository's export correctness evidence is `demo/test/export/byte-exact.test.ts` — canonical JSON,
RFC-8785 canonicalisation, PNG byte digests. Every assertion in it holds against code the user can
never invoke. The code the user *does* invoke — `export.ts`, including a 36-line
`exportAsPNG` that round-trips SVG through an `Image` and a canvas — has **no test at all**. A
regression in the shipped path is invisible to CI; a regression in the tested path is impossible to
observe in the product. Coverage and behaviour have been decoupled by a module boundary.

**Proposed cure.** Delete `demo/palettes/export.ts`; point `usePaletteExport.ts` at
`./export/serializers`; adapt `onExport`'s five cases to the `serialize*` API and keep exactly one
download sink. The test then covers the shipped path by construction, and the 914-line tree stops
being a museum. Guard it with the §L3-2 reachability gate extended to `.ts` (this tree is 11 of the
24 unreachable `.ts` modules — the largest single cluster in the output).

---

## L3-4 · MAJOR (new) — the demo's ONLY runtime import cycle is a barrel↔member cycle, produced by the same idiom that hid this component

The reachability run reports exactly one strongly-connected component of size > 1 in 250 modules:

```
runtime SCCs (size>1): 1
--- SCC size 2
   demo/shell/dock/Dock.vue
   demo/shell/dock/index.ts
```

The edges:

```
demo/shell/dock/Dock.vue:4      import { GlassDock, DockLayerGroup, DockLayer } from "./";
demo/shell/dock/index.ts:2      export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
demo/shell/dock/index.ts:5      export { default as Dock } from "./Dock.vue";
```

`Dock.vue` reaches its own barrel to get three symbols that the barrel merely forwards from
`@mkbabb/glass-ui/dock`; the barrel re-exports `Dock.vue`. A module that imports itself through one
hop. It works today only because the cycle's payload is three re-exported foreign symbols with no
initialisation order requirement — a property nobody declared and no gate protects. Add one
module-scope `const` to `index.ts` that `Dock.vue` reads at setup time and it becomes a TDZ error.

**This is the same idiom, one directory over.** `demo/palettes/browser/slug/index.ts:1-3` calls
itself a *"hardened public surface"*; `demo/palettes/browser/index.ts:1-20` calls itself the
*"TOP-LEVEL SEAM"* with a 20-line rationale. Neither has a value importer (§L3-2). The barrel layer
in this demo currently delivers: **0 enforced boundaries** (the ESLint rules that would enforce them
are vacuous — run 1's L-4, re-confirmed below), **1 runtime cycle**, and **1 concealed orphan**.

The correct reach is the one glass-ui already publishes:

```
$ node -e "console.log(Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports).length)"
74
```

74 subpaths, `./dock` among them. `Dock.vue` should import `GlassDock, DockLayerGroup, DockLayer`
from `@mkbabb/glass-ui/dock` directly — the cycle disappears with the pass-through line, and
`index.ts` shrinks to the one thing a barrel is for.

**Proposed cure.** Barrels re-export **local** modules only; never forward a foreign package's
symbols. A barrel that forwards a dependency is an alias layer, and this repository already has a
19-directory example of what that becomes (§L3-6). Add the SCC check — it is nine lines in the same
probe script and it is already written.

---

## L3-5 · MAJOR (new) — the credential-shape contract has no module home, is therefore untestable by construction, and the palettes area's test directory is empty

Runs 1 and 2 established that `looksLikeSlug` / `normalizeTokenInput` exist in two byte-identical
copies (`PaletteSlugBar.vue:184-196`, `SlugEditLayer.vue:25-37`) and that the concept belongs in
`demo/platform/auth/`. This run adds **where the contract actually originates** and **why no test
could ever have caught the divergence**.

**The contract is generated on the server.** `api/src/modules/session/slugWords.ts:80-86`:

```ts
export function generateSlug(): string {
    const adj    = ADJECTIVES[secureRandomIndex(ADJECTIVES.length)]!;
    const verb   = VERBS[secureRandomIndex(VERBS.length)]!;
    const color  = COLOR_TERMS[secureRandomIndex(COLOR_TERMS.length)]!;
    const animal = ANIMALS[secureRandomIndex(ANIMALS.length)]!;
    return `${adj}-${verb}-${color}-${animal}`;
}
```

Four lowercase `[a-z]` words, hyphen-joined — four hand-maintained word lists, 120–128 entries each.
The client's shadow of that contract is a regex typed twice into two view files:

```
/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/
```

The two agree **today**. Nothing keeps them agreeing: a fifth word, a hyphenated entry, or a digit
added to any list on the server silently converts every newly-issued slug into what the client
classifies as an admin token.

**And the classifier is not a classifier — it is a negation.** `PaletteSlugBar.vue:205` /
`SlugEditLayer.vue:46`:

```ts
const isAdmin = !looksLikeSlug(normalized);
```

*Anything* that is not a 4-word slug is treated as an admin credential and handed to
`useAdminAuth.login`, which validates nothing (`useAdminAuth.ts:34-37` — assign ref, write
localStorage) and flips `isAdminAuthenticated` for the whole app; the branch first calls
`clearUserSlug()`, wiping the real identity (`useSlugMigration.ts:52-56`). **The CHALLENGE-C seat of
this formation reproduced the consequence live** (`challenge-C-implementation.md:361-367`: a 3-word
typo wrote `palette-admin-token: "brisk-leaping-azure"` and flipped the UI to admin). I do not
re-litigate it; I record its **structural** cause, which is this seat's business:

**No module owns the concept, so no test can reach it.** Both copies are non-exported function
declarations inside `<script setup>` blocks. A `<script setup>` block's local bindings are not part
of the component's module exports — there is no specifier any test file can write to call
`looksLikeSlug("brisk-leaping-azure")`. A pure, total, security-relevant predicate with a two-line
body is **untestable by construction** because of where it was placed.

**And the area has nowhere to put such a test anyway:**

```
$ git ls-files demo/test
demo/test/export/byte-exact.test.ts
demo/test/glass/aurora-bracket.test.ts
demo/test/glass/aurora-motion.test.ts

$ find demo/test -type d -empty
demo/test/glass/__scratch__
demo/test/palettes/api        ← the palettes test home: an empty, untracked directory

$ grep -n "include" vitest.config.ts
21:  include: ["test/**/*.ts", "demo/test/**/*.ts"],
```

Three demo test files exist; one of them tests unreachable code (§L3-3). The palettes area — 19
composables (`find demo/palettes -name "use*.ts" | wc -l` → 19) and 32 components
(`find demo/palettes -name "*.vue" | wc -l` → 32) — has **zero**, and its test directory is an empty shell git does not
even track.

**Proposed cure.** One module, `demo/platform/auth/credential.ts`, exporting a *positive*
discriminated classifier beside the existing `useUserAuth`/`useAdminAuth`/`useSession` trio:

```ts
export type Credential =
    | { kind: "slug";  slug: string }
    | { kind: "token"; token: string }
    | { kind: "invalid"; reason: "empty" | "unrecognised" };

export function classifyCredential(raw: string): Credential;
```

`invalid` is the case the negation erased and the reason a typo currently becomes an admin login.
Both view sites collapse to one call; the predicate becomes importable, hence testable; and
`demo/test/palettes/` gets its first inhabitant. Longer term the word-shape contract should be
served or shared from the API rather than transcribed — but a single client-side home is the
prerequisite for that conversation, and today there is none.

---

## L3-6 · MINOR (new) — measured: three coexisting reach styles for one design system, and 2 of the 19 `demo/ui/` alias barrels have no importer at all

Run 1's L-6 named `demo/ui/` as 19 alias barrels. This run measures the resulting fan-out and finds
two of them entirely dead.

```
$ grep -rlE 'from "(\.\./)+ui/' demo | wc -l          # via a demo/ui shim barrel
48
$ grep -rlE 'from "@mkbabb/glass-ui"' demo | wc -l    # via the glass-ui ROOT barrel
36
$ grep -rlE 'from "@mkbabb/glass-ui/' demo | wc -l    # via a glass-ui SUBPATH
54
$ ls demo/ui | wc -l
19
```

Three reach styles for one package, and **`PaletteSlugBar.vue` uses all three within fourteen
lines**:

```
132  import { SearchBar } from "@mkbabb/glass-ui/search";        // subpath  — correct
133  import { Button } from "../../../ui/button";                 // shim → root barrel
134  import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
145  import { writeClipboard } from "@mkbabb/glass-ui";           // root barrel
```

The shims are one-line forwards to the **root** barrel even though glass-ui 7.0.0 publishes the
per-component subpath:

```
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
$ cat demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
$ node -e "const e=Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports);
           console.log(['./button','./popover'].map(k=>k+': '+e.includes(k)).join('  '))"
./button: true  ./popover: true
```

So a demo file reaching `Button` traverses `demo/ui/button` → glass-ui root barrel → the button
module: two indirections to reach a published subpath, for a symbol the shim renames not at all.
That is the definition of an alias layer, which the standing no-legacy edict forbids.

**Two of the nineteen have zero importers:**

```
$ grep -rn "ui/label\|ui/switch" demo
(no output — exit 1)
```

`demo/ui/label/index.ts` and `demo/ui/switch/index.ts` — dead alias barrels for a dead alias layer,
independently confirmed by the reachability run (both appear in its UNREACHABLE `.ts` list).

**Proposed cure.** Delete `demo/ui/` outright; rewrite its 48 consumers to the glass-ui subpath they
actually want (`@mkbabb/glass-ui/button`, `/popover`, …). It is a mechanical codemod over one
directory, it removes an entire layer from the lattice, it makes the design-system boundary
one-hop-visible in every file, and it is the only version of this tree consistent with edict 4
(glass-ui *is* the design system — not a thing the demo re-exports under its own name).

---

## L3-7 · confirmations — prior-run findings I independently re-measured

Recorded briefly; the prior runs remain the citation of record.

**Zero render sites** (run 1 L-1, run 2 L2-5). Confirmed three ways: exhaustive grep for the tag in
any casing returns nothing; there is no global registration (`demo/color-picker/index.html:205-213`
is the entire bootstrap — `createApp(App)`, `app.use(router)`, `app.mount("#app")`, no
`app.component(...)` anywhere in `demo`); and the graph walk in §L3-2 never reaches the file.

```
$ grep -rn "palette-slug-bar\|<PaletteSlugBar" demo src test e2e ; echo "exit=$?"
exit=1
$ grep -rn "app.component" demo ; echo "exit=$?"
exit=1
```

**The ESLint seam rules are vacuous** (run 1 L-4). Re-proven by resolved config rather than by
reading the file — the rule is not merely mis-globbed, it is *absent* for this file:

```
$ npx eslint --print-config demo/palettes/browser/slug/PaletteSlugBar.vue \
    | node -e "…console.log(JSON.parse(s).rules['no-restricted-imports'])"
undefined
```

The three objects that declare `G-DEMO-1` / `G-DEMO-3a` / `G-DEMO-3b` glob
`demo/@/components/**` and `demo/@/composables/**` (`eslint.config.js:232-239, 274-277`) —

```
$ ls -d demo/@ ; echo "exit=$?"
ls: demo/@: No such file or directory
exit=1
```

— a directory `a61094e3` deleted, and they ban the specifier prefix `@components/custom/…`, an alias
`tsconfig.demo.json:33` records as killed. The rule that exists to force consumers through this
component's seam matches no file and bans no writable specifier. `npx eslint
demo/palettes/browser/slug/PaletteSlugBar.vue demo/palettes/useSlugMigration.ts` exits `0`.

**Four homes for one concept** (run 1 L-2). Confirmed: `PaletteSlugBar.vue` (orphan) ·
`SlugEditLayer.vue` (live, byte-identical helpers) · `ProfileSection.vue` · `MobileMenuDropdown.vue`,
plus the `.slug-pill` recipe at 8 call sites across 4 files. §L3-5 adds the fifth home — the server
generator — and the reason no test spans them.

**Direction of dependency is inverted** (run 1 L-7). Measured, with the census the graph run
produces:

```
shell↔palettes runtime edges: 8
   shell→palettes  demo/shell/dock/Dock.vue                  ->  demo/palettes/usePalettePorts.ts
   shell→palettes  demo/shell/dock/DockViewSelect.vue        ->  demo/palettes/usePalettePorts.ts
   shell→palettes  demo/shell/dock/layers/SlugEditLayer.vue  ->  demo/palettes/usePalettePorts.ts
   shell→palettes  demo/shell/dock/menus/MobileMenuDropdown.vue -> demo/palettes/usePalettePorts.ts
   shell→palettes  demo/shell/dock/menus/ProfileSection.vue  ->  demo/palettes/usePalettePorts.ts
   shell→palettes  demo/shell/usePaneRouter.ts               ->  demo/palettes/PalettesPane.vue
   shell→palettes  demo/shell/usePaneRouter.ts               ->  demo/palettes/BrowsePane.vue
   shell→palettes  demo/shell/usePaneRouter.ts               ->  demo/palettes/admin/AdminPane.vue
```

Eight edges, all one-way (the reverse edge, `usePalettePorts.ts:19 import type { ViewId } from
"../shell/useViewManager"`, is type-only and vanishes at build — hence no SCC). Five of the eight
exist so that the **shell** can obtain the app's **identity** surface from a *palette* module:
`SESSION_PORT_KEY` lives in `demo/palettes/usePalettePorts.ts`. Session identity is not a palette
concept; it is the reason the slug UI could sit in `palettes/browser/slug/` and in `shell/dock/`
simultaneously and look right in both places.

**The seam barrel is bypassed even internally.** `demo/palettes/browser/status/index.ts:2` documents
its own defeat — *"ApiOfflineChip's live consumer is CurrentPaletteEditor (internal…)"* — and
`CurrentPaletteEditor.vue:193` reaches the raw file: `import ApiOfflineChip from
"../status/ApiOfflineChip.vue"`. The seam law is unenforced (above) and unobserved.

---

## L3-8 · the lattice, stated concretely — including the package layer neither prior run reached

Runs 1 (L-8) and 2 (L2-6) each state a *module* lattice for the demo; I do not restate theirs. What
follows is the layer above it, which is where this run's findings concentrate, plus the three gates
that make any lattice hold.

**Packages — two manifests, one direction.**

```
value.js (repo root)
├── package.json          ← the LIBRARY only.  dependencies: {}   (dist is framework-free)
│                            devDependencies: typescript, vite, vitest, vue-tsc …
└── demo/package.json     ← the DEMO.  dependencies: vue, vue-router, @mkbabb/glass-ui,
                             @lucide/vue, reka-ui, tailwindcss, @mkbabb/keyframes.js
                             + "@mkbabb/value.js": "workspace:*"   ← the dogfood edge, explicit
```

One npm workspace. The demo depends on the library; the library depends on nothing. `glass-ui`
cannot appear in the published manifest because it is not in that file. The value.js ⇄ glass-ui
cycle is unrepresentable. And the dogfood claim becomes *checkable*: `workspace:*` resolves through
the real `exports` map, so a demo import the exports map does not publish fails at install-graph
level rather than being papered over by a hand-rolled `tsconfig` path (run 2's L2-3 defect, whose
generated-paths cure this arrangement subsumes).

**The identity module — where this component's concept belongs.**

```
demo/platform/auth/
    credential.ts     classifyCredential(raw) → {kind:"slug"|"token"|"invalid"}   [pure, tested]
    useSession.ts     useUserAuth.ts   useAdminAuth.ts   sessionToken.ts          [existing]
    ui/
        IdentityBar.vue      ONE presenter — slug pill · login · account menu
```

`IdentityBar.vue` is rendered by the dock (the app's chrome, which is where identity has actually
lived since `95993197`) and receives `useSession()` directly. `SESSION_PORT_KEY` leaves
`palettes/usePalettePorts.ts` entirely: five of the eight shell→palettes edges dissolve, and the
palette feature stops being the app's identity provider. `PaletteSlugBar.vue`, `SlugEditLayer.vue`
and the slug halves of `ProfileSection.vue` / `MobileMenuDropdown.vue` collapse into it — four
homes → one.

**Export — one implementation.** `demo/palettes/export/` survives; `export.ts` and the flat
`exportAs*` API die; `usePaletteExport.ts` calls `serialize*` + one download sink.
`demo/test/export/byte-exact.test.ts` then tests the shipped path without changing a line.

**Design system — no alias layer.** `demo/ui/` deleted; 48 consumers rewritten to
`@mkbabb/glass-ui/<component>`. Barrels re-export local modules only, which also removes the
`Dock.vue` ↔ `dock/index.ts` cycle.

**Three gates, all cheap, each closing a defect class this audit found:**

| gate | closes | cost |
|---|---|---|
| reachability walk from the entry — fail on any unreachable `.vue` | orphan components (`PaletteSlugBar`, `Katex`) and orphan trees (`export/`) | 0.10 s, script already written (`probes/L3-demo-reachability.mjs`) |
| SCC check in the same pass | barrel↔member cycles (`Dock`) | free — same graph |
| `dependencies === {}` assertion on the library manifest | the package cycle and 5.8 MB of demo weight on consumers | one line |

None of these is a lint rule over specifier text, which is the mechanism that has now failed three
times in this tree (`G-DEMO-1`, `G-DEMO-3a`, `G-DEMO-3b` — all vacuous). They are checks over the
*graph*, which is the thing the rules were trying to describe.

---

## Reconciliation with runs 1 and 2

| prior finding | this run |
|---|---|
| run 1 **L-1** zero render sites | **confirmed** by a third method (whole-graph reachability, §L3-2) and quantified: 2 of 250 |
| run 1 **L-2** four homes, two byte-identical | **confirmed**; §L3-5 adds the server generator as the contract's true origin and explains the untestability |
| run 1 **L-3** silent login failure | **not re-run** (run 1's live reproduction stands); §L3-5 gives the structural cause |
| run 1 **L-4** vacuous ESLint seam rule | **confirmed** by resolved config (`--print-config` → `undefined`) |
| run 1 **L-5** seam barrel has no importers | **confirmed** at graph level, and sharpened: the orphan sits behind *two* unimported layers |
| run 1 **L-6** `demo/ui` is 19 alias barrels | **confirmed + measured** (§L3-6): 48/36/54 reach-style census; 2 barrels entirely dead |
| run 1 **L-7** inverted shell→feature dependency | **confirmed + enumerated**: 8 runtime edges listed; no runtime cycle (the reverse edge is type-only) |
| run 1 **L-8** / run 2 **L2-6** greenfield lattice | **extended upward** (§L3-8) to the package layer + the three gates |
| run 1 **L-9** defects inside the dead file | **not re-run**; stands |
| run 2 **L2-1** orphaning commit + defeated gate | **not re-run**; stands. §L3-2 **delivers the gate it specified**, and shows it discounts both signal classes L2-1 named |
| run 2 **L2-2** production build emits no app code | **not re-run** (unchanged at `f36f780c`: `dist/gh-pages/assets/index-Dezn_h7o.js` is still 698 bytes, mtime Jul 27 18:46; `grep -c "Switch account"` → 0). I attempted the bundle-presence measurement for §L3-3 and hit the same wall, which is why that finding is proven against the **dev server** instead |
| run 2 **L2-3** tsconfig paths wider than `exports` | **confirmed as stated**; §L3-8 subsumes its cure — a workspace edge makes the drift unrepresentable rather than generated-and-checked |
| run 2 **L2-4** `.slug-pill` home + uncertified ink | **not re-run**; stands |

**Nothing is downgraded.** All six of this run's findings are new ground.

---

## Defect table (this run)

| id | severity | defect | evidence | reproduction |
|---|---|---|---|---|
| **L3-1** | BLOCKER | the published library declares the demo's design system as a runtime `dependency`; `src/`+`dist` use neither dep; npm prints a package cycle value.js → glass-ui → value.js and pulls Vue/reka-ui/Tailwind (5.8 MB) into every consumer | `package.json` `dependencies`; `grep -rn "@mkbabb/glass-ui" src` → exit 1; `npm ls --omit=dev --depth=2` (pasted) | 5 commands, §L3-1 |
| **L3-2** | BLOCKER | whole-graph reachability: 250 modules, 239 reachable, **2 unreachable `.vue`** — this component is one; its barrel and the "TOP-LEVEL SEAM" above it are also unreachable | `probes/L3-demo-reachability.{mjs,out.txt}` | `node probes/L3-demo-reachability.mjs` (0.10 s) |
| **L3-3** | BLOCKER | dual export path, inverted: shipped `export.ts` (132 L) is untested; tested `export/` (914 L) is unreachable — the byte-exact gate is green over code the app never loads | `curl` of the live dev server showing Vite resolving `"./export"` → `export.ts`; `grep -rn "palettes/export"`; `git log` 12:02 vs 15:58 on 2026-07-17 | §L3-3 |
| **L3-4** | MAJOR | the demo's only runtime import cycle: `Dock.vue:4` ↔ `dock/index.ts:5` — a barrel forwarding a foreign package's symbols back to its own member | SCC output of the probe; the three cited lines | same probe run |
| **L3-5** | MAJOR | the credential-shape contract has no module home — a non-exported `<script setup>` predicate duplicated twice, shadowing `api/.../slugWords.ts:80-86`; untestable by construction, and `demo/test/palettes/api/` is an empty untracked directory | `slugWords.ts:80-86`; `PaletteSlugBar.vue:184-205`; `SlugEditLayer.vue:25-46`; `git ls-files demo/test`; `find demo/test -type d -empty` | §L3-5 (consequence reproduced live by the CHALLENGE-C seat, `challenge-C-implementation.md:361-367`) |
| **L3-6** | MINOR | three coexisting reach styles for one design system (48 shim / 36 root / 54 subpath) — this file uses all three in 14 lines; 2 of 19 `demo/ui` alias barrels have zero importers | 4 `grep -rl … | wc -l` counts; `demo/ui/{button,popover}/index.ts`; glass-ui `exports` includes `./button`, `./popover` | §L3-6 |

**Strongest defect: L3-1.** The others are all internal to a demo that ships to one URL. L3-1 is the
only finding whose blast radius is *every consumer of the published package* — it inverts the
dependency direction at the one boundary the outside world can see, and npm itself prints the cycle.
It is also the cheapest to cure (move two lines from `dependencies` to `devDependencies`) and the
easiest to keep cured (assert `dependencies === {}`), which is exactly the profile of a defect that
survives only because nobody has looked at the manifest from a consumer's side.
