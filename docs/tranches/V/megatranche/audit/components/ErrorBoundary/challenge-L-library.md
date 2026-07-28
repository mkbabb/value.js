# CHALLENGE-L (round 2) — library structure · `demo/color-picker/ErrorBoundary.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`) — the model this seat was explicitly
spawned with. The declaration was named in my spawn prompt and matches the model I am. Not
inherited, not substituted.

**Repo state.** The commission names HEAD `c654824e`. The branch has advanced:
`git log --oneline -1` → `f36f780c docs(V·mega): STATE — three OM censuses complete, findings at
MT-F043`. `demo/color-picker/ErrorBoundary.vue` is untouched across that range (last write
`a61094e3`, three commits *before* `c654824e`), so nothing below is affected by the drift.

**Round handling.** A round-1 CHALLENGE-L report existed at this path (committed, authored by a
declared Opus 5 seat). It is preserved verbatim as `challenge-L-library-r1.md`. This file is the
round-2 report. My probes live in `probes-L-r2/`; r1's live in `probes/`. I re-ran r1's suite before
writing a word — **13/13 pass**, so every r1 claim I cite is reproducible, not taken on trust.

---

## Verdict

**DEFECTIVE — BLOCKER.**

Round 1 found that the boundary is *too coarse*: it wraps the whole pane grid, so one pane's throw
kills both panes and latches the application dead across navigation. That is confirmed and
reproduced.

Round 2's contribution is the other half of the same defect, which round 1 did not reach: **the
boundary is simultaneously too narrow, and there is no layer beneath it.** It is a *sibling* of the
Dock, of the aurora canvas, and of the global dialog — a throw in any of them is not caught
(measured, R2-A). And when it does catch, nothing downstream ever learns: the live app has
`app.config.errorHandler === undefined` and `window.onerror === null` (measured on
`localhost:9000`), and even with a handler installed the boundary's `return false` means it is
called **zero** times (measured, R2-C).

The reason no reporting layer exists is structural and, as far as I can find, unrecorded anywhere in
this audit directory: **there is no boot module.** `demo/` contains no `main.ts`. The single
`createApp` in the entire repository is an inline `<script type="module">` inside
`demo/color-picker/index.html:206-212`. There is no module in which `app.config.errorHandler` could
be installed, which is why it is not installed, which is why this 87-line component is the app's
only failure net — at one fixed altitude that is wrong in both directions.

---

## Method — what I actually ran

| # | Probe | Artifact | Result |
|---|---|---|---|
| 1 | r1's suite, re-run for reproducibility | `probes/` (13 tests) | 13/13 pass — pasted below |
| 2 | Altitude probes (3, raw `createApp`, not VTU) | `probes-L-r2/altitude.test.ts` | 3/3 pass — pasted below |
| 3 | Live error-net read on the running dev server | `probes-L-r2/live-net.mjs` | pasted below |
| 4 | TypeScript module resolution of the published surface | `probes-L-r2/ts-resolve.mjs` | pasted below |
| 5 | **Production** bundle cost, root barrel vs subpath | `probes-L-r2/vite.measure.config.ts` + 2 entries | pasted below |
| 6 | Effective ESLint import boundary for this file | `npx eslint --print-config` | pasted below |
| 7 | Visual matrix, the `/#/does-not-exist` capture | `audit/visual/shots/…/notfound-redirect.png` | read; finding L2-7 |

```
$ npx vitest run --config docs/.../ErrorBoundary/probes/vitest.config.ts
 ✓ docs/.../ErrorBoundary/probes/boundary.test.ts (6 tests) 56ms
 ✓ docs/.../ErrorBoundary/probes/challenge-c-impl.test.ts (7 tests) 112ms
 Test Files  2 passed (2)
      Tests  13 passed (13)

$ npx vitest run --config docs/.../ErrorBoundary/probes-L-r2/vitest.config.ts
 ✓ docs/.../ErrorBoundary/probes-L-r2/altitude.test.ts (3 tests) 122ms
 Test Files  1 passed (1)
      Tests  3 passed (3)
```

Everything is read-only. The probes mount the shipped SFC through a `@demo` alias and stub only
`Button` / `CircleAlert` / `RotateCcw`. **No source edits land from this seat.** Nothing under
`src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any
`INBOX.md` was written.

---

## Position relative to round 1

Stated up front so the wave author is not left reconciling two documents.

| r1 finding | r2 disposition |
|---|---|
| L-1 latch / blast radius (BLOCKER) | **CONFIRMED** — r1's probes reproduce 13/13. Subsumed into **L2-1**, which adds the opposite-direction half. |
| L-2 plate duplicated from `EmptyState` | **CONFIRMED** independently (constants re-diffed below). **Cure amended** — see **L2-5**: r1's `demo/shared/ui/ErrorPlate.vue` keeps a design-system primitive in the demo, which is edict 4 the wrong way round. |
| L-3 terminal unreportable sink | **CONFIRMED and root-caused** — **L2-2**. r1 prescribed a cure site (`boot/useErrorReporting.ts`) that cannot exist: there is no boot module to call it. |
| L-4 `demo/ui/` shim + 231 KB root-barrel cost | **SPLIT.** The edict-2 shim finding is **CONFIRMED**. The **cost claim is REFUTED by measurement** — see **L2-6**. Production bundles are byte-length identical. 231 KB is a dev-prebundle artifact and must not enter a wave spec as a shipped-bytes argument. |
| L-5 dead ESLint globs | **CONFIRMED** independently, and **escalated**: the dead rules now have **live violations** — see **L2-3**. |
| L-6 mis-homed in the Vite root | **CONFIRMED**, and root-caused: the directory is not merely "the boot dir with an outlier"; it is a **cycle participant** (L2-3). |
| L-7 dead public surface · L-8 `.plate-ink` ×5 · L-9 dead class · L-10 dead retry · L-11 test coupling | **CONFIRMED**, not re-derived. L-11 sharpened by **L2-9**. |
| "value.js consumption — clean by absence" | **CONTESTED** — see **L2-4**. The axis is clean, but the *proof* is vacuous: the demo's TypeScript view of the published surface is misdeclared in 3 of 8 entries and silent on 2 real ones. |

---

## The import graph, traced

`ErrorBoundary.vue:39-41` — three edges:

| Import | Resolves to | Verdict |
|---|---|---|
| `vue` → `ref, nextTick, onErrorCaptured, useTemplateRef` | framework | fine |
| `@lucide/vue` → `CircleAlert, RotateCcw` | `devDependencies`; glass-ui declares it `peerDependencies: {"@lucide/vue": "^1.16.0"}` | fine — the constellation's icon set |
| `../ui/button` → `Button` | `demo/ui/button/index.ts`, **one line**: `export { Button } from "@mkbabb/glass-ui";` | **L2-6** |

Zero imports from `@mkbabb/value.js`, zero `@src/*`, zero reach into `src/`. But that edge is not
absent — it is *transitive*: `Button` → the glass-ui root barrel → glass-ui's `Chip`/`Surface`/etc.
→ `@mkbabb/value.js/{color,css,easing}`. Measured:

```
$ grep -ohE 'from "@mkbabb/value\.js[^"]*"' node_modules/@mkbabb/glass-ui/dist/*.js | sort | uniq -c
   5 from "@mkbabb/value.js/color"
   3 from "@mkbabb/value.js/css"
   1 from "@mkbabb/value.js/easing"
```

So this component *does* consume the library — through glass-ui, through the one layer in the demo
that has no subpath discipline. That is the shape of L2-4 and L2-6.

---

# Findings

## L2-1 · **BLOCKER** — containment is wrong in *both* directions: too coarse for the pane, too narrow for the shell

Round 1 proved the coarse half. This is the narrow half, and together they show the defect is not a
missing `:key` but a component owning a responsibility at a fixed altitude that no single altitude
can discharge.

`App.vue`'s template, by line:

```
$ grep -n '^\s*<nav\|^\s*</nav>\|^\s*<main\|^\s*</main>\|<ErrorBoundary\|</ErrorBoundary>\|<MigratePalettesDialog\|^</template>' demo/color-picker/App.vue
24:        <nav                         ← the Dock — the app's ONLY navigation
44:        </nav>
47:        <main class="pane-main" aria-label="Color tool panes">
50:        <ErrorBoundary message="This panel hit an unexpected error.">
140:        </ErrorBoundary>
141:        </main>
152:    <MigratePalettesDialog           ← the global modal
158:</template>
```

The boundary opens at `:50` and closes at `:140`. Everything at `:24-44` and `:152-158` is outside
it. The live tree confirms a third uncontained sibling the source read alone does not show — the
aurora canvas:

```
$ node docs/.../ErrorBoundary/probes-L-r2/live-net.mjs
{
  "containment_coverage": {
    "elements_under_app": 1695,
    "elements_inside_main_the_only_guarded_region": 1535,
    "pct": 90.6
  },
  "app_mounted": true,
  "errorHandler": "undefined",
  "warnHandler": "undefined",
  "window_onerror": "object",              ← i.e. null
  "onErrorCaptured_carriers": [ { "name": "ErrorBoundary", "depth": 1, "path": "App" } ],
  "app_layout_children": [ "canvas", "nav", "main" ],
  "main_present": true,
  "uncontained_top_level": [ "div", "div.app-layout", "span", "div", "div", "div" ]
}
```

**Exactly one** `onErrorCaptured` carrier exists in the whole mounted application. `.app-layout` has
three children — `canvas`, `nav`, `main` — and containment covers a subtree of the third only. Five
of the six top-level nodes under `#app` (the teleport hosts for every portaled dialog, popover and
tooltip) sit outside `.app-layout` entirely.

The guarded 90.6% is the pane grid. The **unguarded 9.4% is every affordance a user would need to
recover with.** When the boundary fires, the 1,535 guarded elements vanish and what survives is the
dock — which, per r1's live probe, still accepts clicks and silently changes nothing.

That a sibling throw is not caught is measured, not inferred. R2-A replicates App.vue's exact
containment shape and throws in the `<nav>` position:

```
$ npx vitest run --config docs/.../probes-L-r2/vitest.config.ts
{"probe":"R2-A","boundary_announced":false,
 "errors_escaped_to_app_root":["dock render throw"],"rendered_html_len":1066}
```

`boundary_announced: false`. The error walked past the boundary to the app root — where, in the real
app, `errorHandler` is `undefined`.

**Mechanism.** Unique semantic ownership violated twice over. *"Which unit is currently failing"* is
a fact about a **pane**, stored on the **app**; *"has the shell failed"* is a fact about the
**shell**, owned by **nobody**. One component named `ErrorBoundary` at one fixed depth cannot hold
both, and holding one at the wrong depth produces the latch.

**Cure — transposition, three altitudes, three owners:**

1. **Pane containment → `demo/shell/PaneSlot.vue`**, where `liveKey` already lives
   (`PaneSlot.vue:113-125`). Keying the boundary on `liveKey` makes `caught` structurally incapable
   of outliving its subject; blast radius falls from *the application* to *one slot*.
2. **Shell containment → above `App`**, at the mount site — which requires L2-2's boot module.
3. **Reporting → the boot module**, which is the only layer that can also see the async half no
   `onErrorCaptured` can (L2-2).

`App.vue` then holds **zero** boundary markup, which is correct: an application root is not an error
handler.

---

## L2-2 · **BLOCKER** — there is no boot module, so error reporting has nowhere to live

This is the root cause of r1's L-3, and it changes the cure.

```
$ find demo -name "main.ts" -o -name "main.js"
(no output)

$ grep -rn "createApp" demo/ --include="*.ts" --include="*.vue" --include="*.html"
demo/color-picker/index.html:206:            import { createApp } from "vue";
demo/color-picker/index.html:210:            const app = createApp(App);
```

The entire boot is seven lines inside an HTML file (`index.html:205-213`):

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

There is no module here. There is no importable unit, nothing a test can call, nothing to which a
composable can be attached. `demo/color-picker/composables/boot/` holds nine files — every one of
them is called from `App.vue`'s `setup()`, i.e. from *inside* the component tree, *after* the app
object is gone. `app.config.errorHandler` cannot be installed from there.

The consequence is measured three ways:

- **Live** (above): `errorHandler: "undefined"`, `warnHandler: "undefined"`,
  `window.onerror: "object"` (`null`).
- **R2-C** — the boundary is a terminal sink even when a reporter *does* exist:

  ```
  {"probe":"R2-C","boundary_announced":true,"app_errorHandler_calls":0}
  ```

  An `app.config.errorHandler` was installed on a real `createApp` instance. The boundary caught the
  pane throw and announced it. The handler was called **zero** times — `return false` at
  `ErrorBoundary.vue:68` halts propagation before Vue reaches it
  (`@vue/runtime-core` `handleError`: early `return` on a `false` hook result, so `logError` at the
  tail is never reached either).
- **Static**: `grep -rn "errorHandler\|onErrorCaptured\|unhandledrejection\|window.onerror" demo/ src/`
  matches only `ErrorBoundary.vue:39` and `:59`.

So the demo's error contract is: *one boundary, one altitude, one screen-painted string, and no
record*. And the one failure class the visual matrix actually captured —
`safari-desktop-light /#/: WebGL: context lost.` (`audit/visual/REPORT.md` §consoleErrors) — is
asynchronous, therefore structurally invisible to `onErrorCaptured`, therefore lost entirely.

**Cure.** Create `demo/color-picker/main.ts`. `index.html` reduces to
`<script type="module" src="./main.ts"></script>` (Vite's canonical form; the fouc-guard classic
script at `:159-203` is unaffected). `main.ts` owns exactly what only it can own:

```ts
const app = createApp(App);
app.config.errorHandler = report;          // the sync half the boundary suppresses
window.addEventListener("unhandledrejection", report);   // the async half it cannot see
window.addEventListener("error", report);
app.use(router);
app.mount("#app");
```

Then `PaneErrorBoundary` emits `caught: [err, info]` and stops owning the decision, and r1's
`useErrorReporting` has, for the first time, a caller.

---

## L2-3 · **MAJOR** — a live directory-level dependency **cycle** through the boot root, in the exact region whose guard rule is dead

Round 1 established that the ESLint demo-boundary rules point at the deleted `demo/@` tree. I
confirmed that independently:

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ npx eslint --print-config demo/color-picker/ErrorBoundary.vue   # (import rules only)
no-restricted-imports = [2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],
  "message":"G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file."}]}]
```

One rule survives, and it bans a specifier under the `@components` alias — which
`tsconfig.demo.json:33-34` states was itself deleted at W43. The file is governed by zero enforceable
boundaries.

The escalation: **the rule that died has live violations.** G-DEMO-1 exists to stop lower layers
reaching *up* into `demo/color-picker/`. They do:

```
$ grep -rn "color-picker/" demo/ --include="*.ts" --include="*.vue" | grep -v "^demo/color-picker/" | grep -E 'from "|import\('
demo/scenes/atmosphere/aurora-harmony-stops.ts:23:import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
demo/test/glass/aurora-bracket.test.ts:14:} from "../../color-picker/composables/boot/atmosphere-calibration";
demo/picker/ColorPicker.vue:129:import { OVERTURE_KEY } from "../color-picker/composables/boot/useOverture";
```

Against the downward direction (`App.vue:164` `import { ColorPicker } from "../picker";`) this
closes a cycle at the directory level:

```
demo/color-picker  ──App.vue:164──▶  demo/picker
        ▲                                 │
        └────── ColorPicker.vue:129 ───────┘

demo/color-picker ─▶ demo/shell ─▶ demo/scenes/atmosphere ─▶ demo/color-picker
                                   (aurora-harmony-stops.ts:23)
```

`demo/color-picker/` is therefore **not the boot root**. It is the boot root *and* a shared library
that three feature files depend on. That ambiguity is precisely why a generic presentational
component "fits" there — r1's L-6 read the mis-homing; this is why the directory accepts it. A leaf
would have rejected the file; a de-facto shared layer does not.

**Cure.** Split the two identities. `demo/color-picker/` keeps `index.html`, `main.ts` (L2-2),
`App.vue`, `router/`. The three genuinely shared boot units that features import
(`atmosphere-calibration`, `useOverture`'s injection key, `ground`) move down to a layer the features
may legally reach — `demo/platform/` already exists and is exactly that stratum. Then re-aim the
three ESLint objects at the live physical homes and add the invariant that would have caught this:
`demo/color-picker/**` may be imported by **nothing**. A rule whose glob matches zero files should
fail CI as loudly as a rule that is violated.

---

## L2-4 · **MAJOR** — the demo's TypeScript view of the published surface is misdeclared: 3 dead entries, 2 real subpaths undeclared

Round 1 recorded "clean by absence" and cited `package.json#exports` as "a closed 8-key set
(7 subpaths + root)". Measured, it is a closed **7**-key set with **no root**:

```
$ node -e "const p=require('./package.json');console.log(JSON.stringify(Object.keys(p.exports)));
           console.log('has root \".\":',Object.prototype.hasOwnProperty.call(p.exports,'.'))"
["./color","./value","./css","./easing","./math","./transform","./quantize"]
has root ".": false
```

`vite.config.ts:52-62` generates its self-alias set *from that map* — deliberately, and the comment
says why: *"GENERATED (not hand-rolled) so the alias set can never drift from the exports map."* The
TypeScript half of the same contract was left hand-rolled. It drifted. Resolved with the TS compiler
API under `tsconfig.demo.json`'s exact options:

```
$ node docs/.../ErrorBoundary/probes-L-r2/ts-resolve.mjs
@mkbabb/value.js                 UNRESOLVED                   -
@mkbabb/value.js/color           local checkout               dist/subpaths/color.d.ts
@mkbabb/value.js/value           local checkout               dist/subpaths/value.d.ts
@mkbabb/value.js/css             local checkout               dist/subpaths/css.d.ts
@mkbabb/value.js/easing          local checkout               dist/subpaths/easing.d.ts
@mkbabb/value.js/math            local checkout               dist/subpaths/math.d.ts
@mkbabb/value.js/transform       local checkout               dist/subpaths/transform.d.ts
@mkbabb/value.js/quantize        local checkout               dist/subpaths/quantize.d.ts
@mkbabb/value.js/parsing         UNRESOLVED                   -
@mkbabb/value.js/units           UNRESOLVED                   -
```

`tsconfig.demo.json:42-49` declares eight `paths` entries. Three of them name files that do not
exist:

```
$ test -f dist/index.d.ts || echo "dist/index.d.ts MISSING"
dist/index.d.ts MISSING
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
```

No `parsing.*`, no `units.*`, no `index.d.ts`. And two subpaths that **are** published and **are**
used — `./value` and `./css`, the latter by 10 demo imports —

```
$ grep -rhoE '"@mkbabb/value\.js(/[a-z-]+)?"' demo/ --include="*.ts" --include="*.vue" | sort | uniq -c | sort -rn
  25 "@mkbabb/value.js/color"
  10 "@mkbabb/value.js/css"
   6 "@mkbabb/value.js/math"
   5 "@mkbabb/value.js/easing"
   4 "@mkbabb/value.js/quantize"
```

— have **no `paths` entry at all**. They typecheck only because Node/TS *self-reference* resolution
kicks in (a package may import itself by name when it has an `exports` field). That is luck, not
design: the declared contract and the working contract are different objects, and the working one is
a language feature nobody wrote down.

Compounding it, `node_modules/@mkbabb/value.js` is a **real registry copy of 4.0.0**, not a symlink:

```
$ python3 -c "import os;print(os.path.islink('node_modules/@mkbabb/value.js'))"
False
```

so a *fourth* candidate resolution exists for any specifier the self-reference misses.

**Why this is a CHALLENGE-L finding for this component.** My seat is asked whether the demo import
of the library is one a real consumer could write. For `ErrorBoundary.vue` the answer is trivially
yes — it imports nothing from value.js. But the axis on which r1 declared it clean is an axis where
the *instrument is broken*: the demo cannot be a proof of the published surface while its declared
view of that surface contains three names that do not exist and omits two that do. The clean bill is
vacuous, and it will stay vacuous for every one of the remaining 87 component seats.

**Cure.** Generate `tsconfig.demo.json#paths` from `package.json#exports`, the same way
`vite.config.ts` already generates the runtime aliases — or delete the `paths` block entirely and let
self-reference be the single mechanism, declared in one comment. Two encodings of one contract, one
generated and one hand-rolled, is the drift. Add a `test/dist/` gate (that directory already exists
for exactly this species of repo-hygiene invariant, per `vitest.config.ts:23-27`) asserting
`keys(exports) === basenames(src/subpaths/)` and that every `paths` target resolves.

---

## L2-5 · **MAJOR** — failure presentation has three demo homes and zero design-system home; the plate belongs in glass-ui

I confirm r1's L-2 duplication independently — the constants have diverged:

| | `EmptyState.vue` (`variant="error"`) | `ErrorBoundary.vue` |
|---|---|---|
| container | `gap-2.5 py-8` (`:16`) | `gap-3 py-10 px-6` (`:18`) |
| glyph | `CircleAlert w-6 h-6 text-destructive/80` (`:19`) | `CircleAlert w-7 h-7 text-destructive/80` (`:23`) |
| statement | `font-display text-heading … max-w-[26ch]` (`:20`) | `font-display text-heading … max-w-[28ch]` (`:24`) |
| detail | `text-mono-small plate-ink max-w-[44ch] break-words` (`:23`) | `text-mono-small plate-ink max-w-[46ch] break-words` (`:27`) |
| `.plate-ink` rule | `color: var(--ink-muted, var(--muted-foreground));` (`:102`) | **byte-identical** (`:85`) |
| action | `<slot name="action" />` (`:26`) | hard-coded `<Button>` (`:30-33`) |

Three demo surfaces publish `role="alert"`:

```
$ grep -rn 'role="alert"' demo/ --include="*.vue"
demo/shared/ui/EmptyState.vue:17
demo/color-picker/ErrorBoundary.vue:19
demo/palettes/browser/status/ApiOfflineChip.vue:13
```

And the design system ships **no** error plate at all:

```
$ grep -oE "ErrorBoundary|EmptyState|ErrorPlate" node_modules/@mkbabb/glass-ui/dist/*.js | sort -u
(no output)
$ grep -oE "Alert[A-Za-z]*" node_modules/@mkbabb/glass-ui/dist/glass-ui.js | sort -u
Alert
AlertDescription
AlertTitle
```

glass-ui exports `Alert` / `AlertTitle` / `AlertDescription` — from the **root barrel only**; its 74
`exports` keys contain no `./alert`. Two demo files consume it
(`ColorNutritionLabel.vue:181`, `markdown/Markdown.vue:35`) and neither error surface does.

**This is where I part from round 1.** r1's cure extracts `demo/shared/ui/ErrorPlate.vue`. That
resolves the duplication but leaves a design-system primitive living in the demo, which is edict 4
the wrong way round — *"Glass-ui is the design system; add variants/primitives there, not in
demo/ui/. Reuse existing component-type names."* An announced failure plate is not application
logic; it is the failure register of the design language, and glass-ui is the only place a change to
it can reach every consumer in the constellation.

**Cure.** glass-ui gains the plate — reusing the existing component-type name rather than inventing
one: `Alert` acquires a `plate` variant (glyph + statement + machine-truth detail + `#action` slot),
and a `./alert` subpath is published so it can be reached narrowly. This is a glass-ui-owned change
and therefore a **BH/BI relay item** under the standing mail edict, not a value.js wave item. In the
demo: `EmptyState` sheds its `error` branch and its `variant` prop and becomes what its name says;
`PaneErrorBoundary` composes `<Alert variant="plate">` and fills `#action` with the retry the shell
listens to; `ApiOfflineChip` composes the same. `.plate-ink` — copy-pasted byte-identically into five
scoped blocks (r1's L-8) — dies with them, because the rung becomes the plate's own.

---

## L2-6 · **MAJOR (shim) / REFUTED (cost)** — `demo/ui/` is a 19-directory back-compat alias layer, but its measured production cost is zero

The shim finding stands, and the component rides it. `ErrorBoundary.vue:41` reads
`import { Button } from "../ui/button";`, and that file is one line:

```ts
// demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

Eighteen of the nineteen barrels are exactly this shape (only `demo/ui/input/index.ts` reaches a
subpath, `@mkbabb/glass-ui/forms`). The layer documents its own provenance at
`demo/ui/alert/index.ts:1-10`: *"This barrel previously held a local shadcn-vue re-implementation …
B.W2 converted it to a re-export … The two consumers import from this barrel **UNCHANGED**."*
"Consumers import unchanged" is the definition of a back-compat shim under edict 2. Nineteen of them.

**The cost argument, however, does not survive measurement.** Round 1 cited 231,357 bytes from
`node_modules/.vite/deps/`. That is a **dev-server prebundle**, not shipped output. I built both
forms with the repo's real bundler (Rolldown via Vite 8), peers externalised, minified:

```
$ MEASURE_ENTRY=entry-barrel.ts  npx vite build --config docs/.../probes-L-r2/vite.measure.config.ts
✓ 76 modules transformed.
…/out-entry-barrel/m.js   15.66 kB │ gzip: 5.62 kB

$ MEASURE_ENTRY=entry-subpath.ts npx vite build --config docs/.../probes-L-r2/vite.measure.config.ts
✓ 13 modules transformed.
…/out-entry-subpath/m.js  15.66 kB │ gzip: 5.62 kB

$ wc -c out-entry-barrel/m.js out-entry-subpath/m.js
   15665 out-entry-barrel/m.js
   15665 out-entry-subpath/m.js
```

Byte-length identical. A byte-level diff shows the only differences are minified identifier
assignment and import ordering (3,689 differing bytes, zero length delta):

```
A: … import { Primitive as _ } from "reka-ui";  import { SpringProgress as v } from "@mkbabb/ke…
B: … import { SpringProgress as _ } from "@mkbabb/keyframes.js"; import { Primitive as v } fro…
```

Rolldown tree-shakes the root barrel completely. **The shipped cost of `demo/ui/button` is zero.**

What is real is the **dev** cost — 76 modules transformed against 13, a 5.8× cold-transform and HMR
graph for one button — and the edict-2 violation. Both are sufficient to delete the layer. The
231 KB figure is not, and a wave spec that carries it will be refuted at the gate.

**Cure unchanged from r1, for the correct reason.** Delete `demo/ui/` outright; every consumer
imports `@mkbabb/glass-ui/<subpath>` directly (`ErrorBoundary` → `@mkbabb/glass-ui/button`). Where a
symbol is root-barrel-only — `Alert` (L2-5) — the missing subpath is a glass-ui relay item, not a
reason to keep a shim.

---

## L2-7 · **MAJOR** — the third failure state has no plate at all: an unknown route silently renders the picker

The component's own first line claims the contract: *"NEVER a silent white-screen dead plate"*
(`ErrorBoundary.vue:2-3`). Its sibling failure state is worse than a dead plate — it is a **wrong**
plate presented as correct.

```
$ grep -n "pathMatch" demo/color-picker/router/index.ts
36:    // Catch-all: redirect unknown routes to picker
37:    { path: "/:pathMatch(.*)*", redirect: "/" },
```

and, independently, in the pane resolver (`demo/shell/usePaneRouter.ts:81-95`), `componentFor` ends:

```ts
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;                 // ← any unknown slot name
```

Two masking fallbacks for one concept. The visual matrix captured the result: the route
`/#/does-not-exist` is in the 15-route matrix as `notfound-redirect.png`. I read it
(`audit/visual/shots/safari-desktop-light/notfound-redirect.png`): it renders the Lab colour picker
and the About pane, with no indication whatsoever that the requested URL does not exist. The
`REPORT.md` summary records it as clean — `pageErrors 0`, `blankOrNearBlank 0` — because from the
matrix's point of view it *is* clean. It is a correct render of the wrong thing.

Edict 2 bans masking fallbacks. The demo has an error plate and an empty plate and no not-found
plate, and the gap was filled with a redirect.

**Cure.** The failure-presentation family is one lattice, not three accidents: `Alert variant="plate"`
(L2-5) serves *empty*, *error* and *not-found*. The catch-all route resolves to a `NotFound` view
that renders the plate with a real navigation affordance; `componentFor` returns `null` for an
unknown name and `PaneSlot` renders the plate rather than substituting a component the caller did
not ask for.

---

## L2-8 · **MAJOR** — the chunk-404 class lands in this boundary, and "Try again" cannot cure it

All ten panes are bare async components — no `errorComponent`, no `onError`, no retry policy:

```
$ sed -n '69,78p' demo/shell/usePaneRouter.ts
const AboutPane = defineAsyncComponent(() => import("../scenes/about/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("../palettes/PalettesPane.vue"));
… (10 total, every one a bare one-argument call)
```

On a deployed gh-pages build (`vite.config.ts` `gh-pages` mode: `base: "./"`, hashed chunk names) a
client holding a stale `index.html` after a redeploy requests a chunk that no longer exists. That is
a `Failed to fetch dynamically imported module` — a routine, expected, *recoverable* production
event. R2-B measures where it lands:

```
{"probe":"R2-B",
 "caught_on_load_failure":true,
 "detail_shown":true,
 "loader_attempts_after_retry":2,
 "still_announced_after_retry":true,
 "pane_present_after_retry":false,
 "text_after_retry":"\"This panel hit an unexpected error.Failed to fetch dynamically imported module Try again\""}
```

Two honest results, one of which corrects my own hypothesis:

1. **Retry *does* re-invoke the loader** (`attempts` 2). I had predicted `defineAsyncComponent`
   memoisation would make it a no-op; measured, it does not. Recorded so the claim is not repeated.
2. **It still does not recover.** The plate stays, the pane never mounts, and the user is shown
   `Failed to fetch dynamically imported module` — a message that is *machine truth for the wrong
   machine*. The only action that cures a stale-chunk failure is a page reload, and the boundary's
   sole affordance is the one action that cannot.

**Mechanism.** A generic boundary cannot distinguish *"this render is broken"* from *"this build is
stale"*, because the discriminating information lives in the async loader it does not own. So it
offers one affordance for two classes and it is wrong for one of them.

**Cure.** The load-failure class belongs to the loader:

```ts
const AboutPane = defineAsyncComponent({
    loader: () => import("../scenes/about/AboutPane.vue"),
    onError: (err, retry, fail, attempts) => (attempts <= 2 ? retry() : fail()),
    errorComponent: PaneLoadFailed,      // offers RELOAD, the affordance that works
});
```

Ten call sites, one factory in `usePaneRouter.ts` — the file already owns the registry table. The
boundary is then left with the class it can genuinely own: a synchronous render throw.

---

## L2-9 · **MINOR** — the demo's component-test home exists, is wired into `npm test`, and this component is absent from it

Round 1 (L-11) found the only coverage is `e2e/smoke/admin/a11y-authed-admin.spec.ts:107-156`, which
induces the throw through an `AdminUsersPanel` feature bug. Confirmed. The sharpening: no new
infrastructure is required, because the home already exists and already runs.

```
$ sed -n '21p' vitest.config.ts
        include: ["test/**/*.ts", "demo/test/**/*.ts"],
$ find demo/test -type f
demo/test/glass/aurora-bracket.test.ts
demo/test/glass/aurora-motion.test.ts
demo/test/export/byte-exact.test.ts
```

`demo/test/**/*.ts` is in the default vitest include. Three demo suites live there. A core-shell
component's containment contract is not among them, which is why every defect in this report and
r1's survived. My `probes-L-r2/altitude.test.ts` and r1's `probes/boundary.test.ts` are 9 working
tests that need no browser, no auth and no fixture; they are `demo/test/shell/` contents, not audit
artefacts.

---

## L2-10 · **MINOR** — two directories named `ui`, two named for the picker; the naming carries no information

```
demo/ui/            19 barrels, each one re-export line from @mkbabb/glass-ui   (L2-6)
demo/shared/ui/     EmptyState.vue, PaneHeader.vue — demo-owned plates
demo/color-picker/  the Vite root: index.html, App.vue, router/, boot composables — and this file
demo/picker/        the actual colour picker (19 files)
```

`ErrorBoundary.vue` imports its `Button` from the first `ui`, while its concept-sibling
`EmptyState.vue` lives in the second, and it is itself homed in the `color-picker` that is not the
colour picker. Four directory names, two distinctions, zero mnemonic value. Under the greenfield
lattice below, `demo/ui/` ceases to exist (L2-6), `demo/shared/ui/` keeps the demo-owned plates, and
`demo/color-picker/` narrows to boot (L2-3) — at which point renaming it `demo/app/` costs one
`vite.config.ts` line and removes the collision permanently.

---

# The greenfield lattice

Structured today with no legacy. Four responsibilities that this one file currently holds two and a
half of, four homes, one direction of dependency:

```
demo/app/                        BOOT — the Vite root; only what boots the app
    index.html                     <script type="module" src="./main.ts">
    main.ts                      ← NEW (L2-2). The ONLY createApp. Owns the error CONTRACT:
                                   app.config.errorHandler + unhandledrejection + window.error.
                                   Mounts <AppErrorBoundary><App/></AppErrorBoundary> so a shell
                                   throw is contained too (L2-1, half two).
    App.vue                        layout only — ZERO boundary markup
    router/                        + the NotFound route (L2-7)

demo/platform/                   PLATFORM — the layer features may legally reach
    atmosphere-calibration.ts    ← moved down from boot (L2-3: kills the cycle)
    overture-key.ts              ← moved down from boot (L2-3)

demo/shell/                      SHELL — layout, routing-to-panes, pane lifecycle
    PaneSlot.vue                   owns <PaneErrorBoundary :key="liveKey">; the key is the whole
                                   cure for the latch — caught cannot outlive its subject (L2-1)
    PaneErrorBoundary.vue        ← NEW: onErrorCaptured → emit("caught", err, info) → emit("retry").
                                   ~20 lines. ZERO presentation, ZERO decision, no `return false`.
    usePaneRouter.ts               defineAsyncComponent({loader, onError, errorComponent}) ×10 —
                                   the load-failure class goes home to the loader (L2-8)

demo/shared/ui/                  PRESENTATION — demo-owned plates, no behaviour
    EmptyState.vue                 sheds `variant` and its error branch — becomes its name
    PaneHeader.vue
    (no ErrorPlate — it is not the demo's to own)

@mkbabb/glass-ui                 DESIGN SYSTEM  ← BH/BI relay item (L2-5)
    Alert + variant="plate"        glyph · statement · machine-truth detail · #action slot.
                                   ONE set of constants for every failure register in the
                                   constellation. Published at ./alert (the subpath is missing today).

(demo/ui/ is DELETED — L2-6. Every consumer: @mkbabb/glass-ui/<subpath>, narrow, direct.)
(tsconfig.demo.json#paths is GENERATED from package.json#exports, or deleted — L2-4.)
```

Dependency direction, single and acyclic:
**boot → shell → features → platform → shared/ui → glass-ui → value.js.** Nothing reaches up; the
three edges that do today (L2-3) are cut by moving two files down one layer.

The whole of `ErrorBoundary.vue` under this lattice is ~20 lines of `PaneErrorBoundary` plus an
`<Alert variant="plate">` tag. Every finding in this report and in r1's — L2-1 through L2-10, L-1
through L-11 — dissolves, not because each was patched, but because each is an artefact of one file
holding containment, presentation, decision and reporting at a single fixed altitude in a directory
that is simultaneously the entry and a shared library.

---

# Negative proofs

The seat's premise is that the structure is wrong. These axes are **clean**; the evidence that proves
the negative is recorded so no later seat re-litigates them.

- **No deep-path library reach.** `ErrorBoundary.vue:39-41` is three imports: `vue`, `@lucide/vue`,
  `../ui/button`. No `@mkbabb/value.js`, no `@src/*`, no path into `src/`. A real external consumer
  holding `vue` + `@lucide/vue` + `@mkbabb/glass-ui` could write this file verbatim.
  **Caveat recorded, not withdrawn:** this clean bill is real but its *instrument* is broken — see
  L2-4. The axis is clean; the proof that it is clean is weaker than r1 stated.
- **No `src/`-belongs logic, and no library code doing this component's job.** Nothing in the file
  is colour, parsing, maths, easing or transform. The 87 lines are Vue lifecycle and template.
- **Not a god module.** 87 lines, no composables of its own, one exported component, one hook.
- **`verbatimModuleSyntax` — nothing to violate.** Every imported binding is a value
  (`ref`, `nextTick`, `onErrorCaptured`, `useTemplateRef`, `CircleAlert`, `RotateCcw`, `Button`).
  There is no type-only import to have mis-declared.
- **Vue 3.5 idioms present and correct.** `useTemplateRef<HTMLElement>("alertRef")` (`:57`), not the
  legacy same-name `ref`; reactive props destructure with defaults (`:43-51`); typed
  `defineEmits<{ reset: [] }>()` (`:53`).
- **None of the named historical suspects touch this file.** No local `useLayerTransition`
  reimplementation; no `usePaletteExport` / `export/serializers` dual path; none of the three
  parallel `useDark` stores. It imports no composable at all.
- **`@lucide/vue` as a devDependency is correct.** glass-ui declares it
  `peerDependencies: {"@lucide/vue": "^1.16.0"}`, and `package.json#files` is
  `["dist","!dist/gh-pages","!dist/gh-pages/**"]` — the demo is never published, so a devDependency
  is the right declaration for a demo-only runtime import.
- **The plate itself is correct when it paints.** Announced (`role="alert"` +
  `aria-live="assertive"`), focus-managed (`tabindex="-1"` + `nextTick` focus), with a visible
  affordance. The U-F58 a11y contract genuinely shipped. Across the 4×15 = 60-capture Safari matrix
  the boundary never fired: `pageErrors 0`, `blankOrNearBlank 0`, one console error
  (`safari-desktop-light /#/: WebGL: context lost.`) which is the async class no boundary can catch.
  **The defect is never that the plate is wrong. It is that the plate is at the wrong altitude, in
  the wrong directory, offering an affordance that does not work, with nothing beneath it.**

---

# Defect table

| ID | Severity | Defect | Anchor / evidence |
|---|---|---|---|
| **L2-1** | **BLOCKER** | Containment wrong in both directions: too coarse for the pane (r1 L-1, confirmed) **and** too narrow for the shell — `<nav>`/canvas/global dialog are siblings, uncaught | `App.vue:24-44,47-50,140-141,152-158` · `probes-L-r2/altitude.test.ts` R2-A · `live-net.mjs` (`app_layout_children:[canvas,nav,main]`, 1 carrier) |
| **L2-2** | **BLOCKER** | No boot module anywhere — the only `createApp` is inline in `index.html`; error reporting has no home. Live: `errorHandler undefined`, `onerror null`. R2-C: handler called **0** times | `find demo -name main.ts` → ∅ · `index.html:206-212` · `live-net.mjs` · R2-C |
| **L2-3** | MAJOR | Live directory-level **cycle** through the boot root (`App.vue:164` ↔ `ColorPicker.vue:129`; `aurora-harmony-stops.ts:23`) — the G-DEMO-1 rule that forbids it is dead | 3 × `grep` hits · `ls demo/@` → ENOENT · `eslint --print-config` |
| **L2-4** | MAJOR | Demo TS view of the published surface misdeclared: 3 of 8 `paths` targets do not exist; `./value` + `./css` (10 imports) undeclared, resolving only by Node self-reference | `probes-L-r2/ts-resolve.mjs` · `tsconfig.demo.json:42-49` · `ls dist/subpaths/` · `package.json#exports` (7 keys, no root) |
| **L2-5** | MAJOR | Failure presentation: 3 demo homes, 0 design-system home; constants already diverged. Plate belongs in glass-ui (`Alert variant="plate"` + missing `./alert` subpath) — **BH/BI relay** | `EmptyState.vue:15-26,102` vs `ErrorBoundary.vue:15-34,85` · 3 × `role="alert"` · glass-ui grep: no ErrorPlate/EmptyState |
| **L2-6** | MAJOR (shim) / **REFUTED** (cost) | `demo/ui/` = 19-dir back-compat alias layer (edict 2). **Cost claim refuted**: production bundles byte-length identical, 15,665 B both ways; 231 KB is a dev prebundle | `demo/ui/button/index.ts:1` · `demo/ui/alert/index.ts:1-10` · 2 × `vite build` (76 vs 13 modules, 15.66 kB both) |
| **L2-7** | MAJOR | No not-found state: unknown routes silently render the picker — two masking fallbacks for one concept (edict 2) | `router/index.ts:36-37` · `usePaneRouter.ts` `componentFor` tail · `shots/safari-desktop-light/notfound-redirect.png` |
| **L2-8** | MAJOR | Chunk-404 class (all 10 panes are bare `defineAsyncComponent`) lands in this boundary; Retry re-invokes the loader but cannot recover — the only cure is reload, which is not offered | `usePaneRouter.ts:69-78` · R2-B (`attempts 2`, `pane_present_after_retry false`) |
| **L2-9** | MINOR | The demo component-test home exists and is wired into `npm test`; this component is absent from it | `vitest.config.ts:21` · `find demo/test` (3 suites) · r1 L-11 |
| **L2-10** | MINOR | Two directories named `ui`, two named for the picker; naming carries no information | `demo/ui/` vs `demo/shared/ui/` · `demo/color-picker/` vs `demo/picker/` |

**Strongest defect: L2-1.** Round 1's latch and this report's uncontained-shell half are one defect
seen from two sides — a single component holding "containment" at a single fixed altitude. Fixing
either half alone leaves the other; the transposition (three altitudes, three owners) is what
dissolves both. **L2-2 is the enabling condition** — until a boot module exists, the shell half has
nowhere to be fixed and reporting has nowhere to live.

---

## Probe artifacts (this directory)

| Path | What it is |
|---|---|
| `probes-L-r2/altitude.test.ts` + `vitest.config.ts` | R2-A/B/C. `npx vitest run --config docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes-L-r2/vitest.config.ts` → 3/3 |
| `probes-L-r2/live-net.mjs` | read-only Playwright probe of the live error net + containment coverage. `node docs/.../probes-L-r2/live-net.mjs` |
| `probes-L-r2/ts-resolve.mjs` | TS compiler-API resolution of all 10 candidate value.js specifiers under `tsconfig.demo.json` |
| `probes-L-r2/vite.measure.config.ts` + `entry-barrel.ts` + `entry-subpath.ts` | production bundle measurement. `MEASURE_ENTRY=entry-barrel.ts npx vite build --config …` |
| `challenge-L-library-r1.md` | round 1, preserved verbatim |
| `probes/` | round 1's suite — re-run at 13/13 before this report was written |

All read-only. **No source edits landed from this seat.**
