# CHALLENGE-L — library structure under `MigratePalettesDialog.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]` — the tier this seat was
explicitly spawned with. Declared, not inherited.

- **Axis:** library structure — module boundaries, ownership, dependency direction, public surface.
- **Subject:** `demo/palettes/browser/dialog/MigratePalettesDialog.vue` (97 lines, area `palettes`).
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict: DEFECTIVE.** 2 BLOCKER · 5 MAJOR · 4 MINOR · 2 INFO.

---

## 0. The premise question, answered first

> *"A dialog named Migrate\* deserves scrutiny against the standing rule: NO legacy code, no
> migration shims, no dual paths, no masking fallbacks."*

**Ruling: the dialog is a LEGITIMATE user-facing data-disposition prompt, NOT a compatibility shim.**

It fires at an *identity boundary* — the user switching to a different slug
(`useSlugMigration.ts:51 onSlugSwitch`) or regenerating their anonymous slug
(`useSlugMigration.ts:91 onRegenerateSlug`) — and asks what to do with palettes that live only in
`localStorage`. Nothing is being migrated between schema versions, API versions, or code paths. It
does not exist to keep old data readable. It is a one-shot decision the user must make because the
data has no home after the identity changes. It stays.

**But the word "Migrate" is a misnomer that manufactured exactly this suspicion**, and it is not the
only naming lie in the cluster: the choice literal `discard` discards nothing (§ L-11). The rename
is in the proposed lattice (§ 3).

The *real* legacy violations in this component's neighbourhood are elsewhere and are severe — a dead
duplicate component (L-2), a dead lint boundary guarding a deleted alias (L-5), and a 20-directory
re-export shim layer (L-4). Those are below.

---

## 1. What the component imports, and whether it should

`MigratePalettesDialog.vue:47-54` — three import edges, verified against the dev server's own
transformed module graph:

```
$ curl -s "http://localhost:9000/@fs/…/demo/palettes/browser/dialog/MigratePalettesDialog.vue" | grep -n "^import"
3:import { Dialog, DialogContent, … } from "…/demo/ui/dialog/index.ts";
4:import { Button }                    from "…/demo/ui/button/index.ts";
5:import { Globe, ArrowRightLeft, SkipForward } from "…/node_modules/.vite/deps/@lucide_vue.js";
```

### Negative proofs (recorded so the absence is evidence, not silence)

| Probe | Command | Result |
|---|---|---|
| Deep `src/` reach from the demo | `grep -rn 'from "@src\|from "\.\./\.\./src/\|from "../../../src/' demo/` | **0** |
| Demo reaches value.js only via the published exports map | `grep -rho '@mkbabb/value\.js[a-z/]*' demo/ \| sort \| uniq -c` | `./color` 25 · `./css` 10 · `./easing` 5 · `./math` 6 · `./quantize` 4 — every one is a key in `package.json#exports` |
| This component imports value.js at all | — | **No.** Its published-surface conformance is *vacuous*. It is a pure presentational shell over glass-ui; it touches zero library code. The "false proof of the public API" risk this seat exists to catch does **not** apply here. |
| eslint on the file | `npx eslint demo/palettes/browser/dialog/MigratePalettesDialog.vue` | clean, 0 findings |
| Named historical suspects (`ActionBarLayer`/`useLayerTransition`, `palettes/export.ts` vs `usePaletteExport.ts` vs `export/serializers`, the three `useDark` stores) | import-graph trace | **none touch this component**; not this seat's findings |

The demo's *library* discipline is genuinely sound. Every defect below is in the **demo's own module
lattice**, and two of them are live runtime breaks.

---

## 2. Findings

### L-1 · BLOCKER — `setActiveTab("saved")` throws: `"saved"` is not a `ViewId`, and an `as ViewId` cast launders it past the compiler

`useSlugMigration.ts` calls `setActiveTab("saved")` at **lines 55, 69, and 76**. Lines 69 and 76 are
on the paths this dialog's response drives.

`"saved"` is not a member of `ViewId`:

```
demo/shell/viewSchema.ts:35  export type ViewId =
                        36      | "picker"
                        37      | "palettes"
                        38      | "browse"
                        39      | "extract"
                        40      | "atmosphere"
                        41      | "blob"   …
$ grep -n '"saved"\|saved:' demo/shell/viewSchema.ts     →  (no output)
```

`useViewManager.switchView(id: ViewId)` pushes `router.push({ name: id })`, and vue-router 5 **throws**
on an unknown route name.

**Why the compiler does not catch it — the structural defect.** `useSlugMigration` widens the brand
away at its own boundary:

```ts
// demo/palettes/useSlugMigration.ts:8-17
export function useSlugMigration(deps: {
    activeTab: Ref<string>;                                   // ← ViewId erased to string
    setActiveTab?: ((tab: string) => void) | undefined;       // ← ViewId erased to string
```

and `usePalettePorts` casts the erased value straight back:

```ts
// demo/palettes/usePalettePorts.ts:87-88
        activeTab: currentView as Ref<string>,
        setActiveTab: (tab: string) => depsSwitchView(tab as ViewId),   // ← the launder
```

`viewSchema.ts` is documented as *"the single source of truth for `ViewId`"* (`viewSchema.ts:4`) and
*"the 4-copy `ViewId` enumeration that grew across the demo"* was collapsed into it — yet this edge
re-opens the hole with a widen-then-cast pair. **Unique semantic ownership is broken at precisely the
seam the schema was built to seal.**

**Live reproduction (dev server, `http://localhost:9000`).** Seeded 2 local palettes, opened the dock
slug editor, submitted `audit-probe-slug`:

```
Error: No match for {"name":"saved","query":{},"params":{}}
    at createRouterError (…/vue-router.js:90:16)
    at switchView   (…/demo/shell/useViewManager.ts:46:10)
    at setActiveTab (…/demo/palettes/usePalettePorts.ts:50:26)
    at setActiveTab (…/demo/palettes/useSlugMigration.ts:9:11)
    at Object.onSlugSwitch (…/demo/palettes/useSlugMigration.ts:36:4)
    at onSlugSubmit (…/demo/shell/dock/layers/SlugEditLayer.vue:57:8)
```

The stack's line numbers are the dev-transformed module's; I mapped them back by fetching the
transformed source. Transformed `:9` = `if (fn) fn(tab);` (source `useSlugMigration.ts:16`);
transformed `:36` = `setActiveTab("saved");` (source **`useSlugMigration.ts:55`**, the `isAdmin`
branch). Verified:

```
$ curl -s "http://localhost:9000/@fs/…/demo/palettes/useSlugMigration.ts" | sed -n '33,40p'
        if (isAdmin) { deps.clearUserSlug(); deps.adminLogin(value); setActiveTab("saved"); return; }
```

The throw is **unhandled**: `SlugEditLayer.vue:54` calls `pm.onSlugSwitch(…)` **without `await`**
inside its own `try`, so the rejection of the `async` function escapes the `catch` at
`SlugEditLayer.vue:55-63` entirely and surfaces as a bare page error.

**Cure.** Delete the widening. `useSlugMigration` takes `setActiveTab: (id: ViewId) => void`,
importing `ViewId` from `demo/shell/viewSchema.ts` — the shell already owns it and the palettes
feature already depends on the shell. Delete the `as ViewId` at `usePalettePorts.ts:88`. Then
`"saved"` becomes a compile error at all three sites and the author must pick the real destination
(`"palettes"`). One type, one home, one direction.

---

### L-2 · BLOCKER — `PaletteSlugBar.vue` is a dead 243-line duplicate; the error surface this flow routes to is never mounted

```
$ grep -rn "<PaletteSlugBar\|<palette-slug-bar" demo/ e2e/ test/ | wc -l
0
$ grep -rn "PaletteSlugBar" demo/
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:  const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

`PaletteSlugBar.vue` (243 lines) is **never rendered by any template in the repository**. The live
slug-edit surface is `demo/shell/dock/layers/SlugEditLayer.vue` (119 lines), mounted at
`Dock.vue:149`. The two files are a near-verbatim fork:

| Concept | Dead copy | Live copy |
|---|---|---|
| `looksLikeSlug` | `PaletteSlugBar.vue:184-186` | `SlugEditLayer.vue:25-27` — **byte-identical regex** `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/` |
| `normalizeTokenInput` | `PaletteSlugBar.vue:188-…` | `SlugEditLayer.vue:29-37` |
| `onSlugSwitch`/`onSlugSubmit` | `PaletteSlugBar.vue:198-224` | `SlugEditLayer.vue:39-66` |
| error mapping | `PaletteSlugBar.vue:217-220` | `SlugEditLayer.vue:59-62` |

**Three consequences, each independently a defect:**

1. **`slugBarRef` is permanently `null`.** `useSlugMigration.ts:84-87` routes typed `ApiProblem`
   status errors through `slugBarRef.value?.setError(…)`. The optional-chain silently no-ops. Four
   authored error strings can never render.
2. **The bug the code claims to have fixed is alive in the live copy.** `useSlugMigration.ts:79-82`
   carries a long comment: *"S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message`
   substrings — the server titles … never contain '409'/'404'/'429', so those branches matched
   nothing and the authored copy below never showed."* That exact broken idiom is what
   `SlugEditLayer.vue:59-61` runs today:
   ```ts
   if (msg.includes("409")) slugError.value = "Already signed in.";
   else if (msg.includes("404")) slugError.value = "Slug not found.";
   ```
   The fix landed in the copy nobody mounts. **This is the canonical dual-path failure: the repair
   went to the dead twin.**
3. **The live copy's `catch` is dead anyway** — `SlugEditLayer.vue:54` does not `await` the async
   call (see L-1), so its `try/catch` cannot observe the rejection.

Net: **slug-switch failure feedback has three implementations and zero working ones.**

**Cure.** Delete `demo/palettes/browser/slug/` entirely (component, barrel, and the
`browser/index.ts:44` re-export). `SlugEditLayer` is the sole surface; the shell owns identity. Then
delete `slugBarRef` from `useSlugMigration` and let the composable surface a plain
`slugError: Ref<string>` that `SlugEditLayer` binds — data down, no component-instance handle
crossing a layer boundary. Port the typed-`ApiProblem` mapping to the surviving site.

---

### L-3 · MAJOR — every dialog response failure is masked by a `console.warn`

`useSlugMigration.ts:106-116`:

```ts
async function onMigrateRespond(choice: "publish" | "transfer" | "discard") {
    …
    try { await action(choice); }
    catch (e: any) { console.warn("Migration action failed:", e?.message); }
}
```

**Live reproduction.** With 2 local palettes, submitted the 4-segment slug `alpha-beta-gamma-delta`
(so `looksLikeSlug` is true and the switch path is taken). The dialog opened in `switch` mode with
all three buttons. Clicked **"Just switch"**, with `console.warn`/`console.error` instrumented:

```json
{ "logs": [["warn", "Migration action failed: User not found"]],
  "dialogStillOpen": false,
  "route": "#/palettes",
  "savedCount": 2 }
```

The login 404'd. The dialog closed. **The user was shown nothing.** They remain signed in as their
previous identity with no indication that anything failed, and no path to retry — because
`MigratePalettesDialog.onRespond()` (`:68-71`) sets `open.value = false` *before* emitting, so the
dialog is already gone when the action rejects.

This is a masking fallback under the standing no-legacy edict, and structurally it is an **ownership
gap**: the dialog owns the *decision*, the composable owns the *action*, and **nobody owns the
outcome**.

**Cure.** `onRespond` must not close the dialog. Make the emit awaitable (or have the parent drive an
`inFlight`/`error` model), keep the dialog mounted through the action, and render the failure inside
it. The dialog is the only surface the user is looking at at that instant; it is the correct home for
the result.

---

### L-4 · MAJOR — `demo/ui/` is a 20-directory pure re-export shim of glass-ui, and it creates a live dual entrypoint

Two of this component's three imports (`:47-55`) go through it:

```ts
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
```

Every one of those 20 barrels is a naked re-export:

```
$ for d in demo/ui/*/; do echo "=== $(basename $d)"; head -1 $d/index.ts; done
=== button   export { Button } from "@mkbabb/glass-ui";
=== dialog   export { Dialog, DialogClose, … } from "@mkbabb/glass-ui";
=== select   export { Select, SelectTrigger, … } from "@mkbabb/glass-ui";
… (20 total; `input` alone points at a subpath: "@mkbabb/glass-ui/forms")
```

`demo/ui/alert/index.ts` states its own provenance: *"This barrel previously held a local shadcn-vue
re-implementation."* **`demo/ui/` is the residue of a completed migration** — the exact "alias layer
left behind" the no-legacy edict forbids, and it is the layer the glass-ui-first edict names by name.

**It is a live dual path, not merely redundant.** In the *same directory* as this component:

```
demo/palettes/browser/dialog/MigratePalettesDialog.vue:52   from "../../../ui/dialog"  → @mkbabb/glass-ui        (ROOT barrel)
demo/palettes/browser/dialog/FlagReportDialog.vue:63        from "../../../ui/dialog"  → @mkbabb/glass-ui        (ROOT barrel)
demo/palettes/browser/dialog/VersionHistoryDrawer.vue:111   from "../../../ui/dialog"  → @mkbabb/glass-ui        (ROOT barrel)
demo/palettes/PalettesPane.vue:148                          from "@mkbabb/glass-ui/dialog"                       (SUBPATH)
demo/palettes/browser/admin/AdminUsersPanel.vue:197         from "@mkbabb/glass-ui/dialog"                       (SUBPATH)
```

Same three symbols, two published entrypoints of the same package.

**Measured cost (dev server, real).** The transformed module for `demo/ui/dialog/index.ts` resolves to
`node_modules/.vite/deps/@mkbabb_glass-ui.js` — the prebundled **root** barrel:

```
$ ls -l node_modules/.vite/deps/@mkbabb_glass-ui{,_dialog}.js
231357  @mkbabb_glass-ui.js
   274  @mkbabb_glass-ui_dialog.js
```

Static-closure walk of the dev deps (JS only, `.map` excluded):

| Reach | modules | bytes |
|---|---|---|
| `@mkbabb/glass-ui/dialog` (subpath) | **17** | **1,755,918** |
| `@mkbabb/glass-ui` (root, i.e. `demo/ui/dialog`) | **56** | **2,468,810** |

`+39 modules · +712,892 bytes (+40.6 %)` on every dev page load, for a dialog. The 39 extra modules
are visibly unrelated: `slider-*`, `select-*`, `popover-*`, `tooltip-*`, `chip-*`, `configurator-*`,
`fading-scroll-*`, `DropdownMenuTrigger-*`, `usePointerVelocityField-*`, `dockContext-*`.

**Two hypotheses I tested and must record as REFUTED** (this is not a prod-bundle finding):

- *Duplicate component identity.* Refuted. `node_modules/@mkbabb/glass-ui/dist/glass-ui.js:12` and
  `dist/dialog.js:1` both import the same chunk `./dialog-TNRDkcE4.js`. One instance, one reka-ui
  context. No duplication.
- *CSS side-effect retention.* Refuted. Closure walk of the **published** dist finds **0** `.css`
  imports reachable from either `glass-ui.js` or `dialog.js`; styles ship as separate `./styles`
  entries. With `sideEffects: ["*.css"]`, rollup tree-shakes the root barrel in the prod build.

So L-4's cost is dev-time ergonomics plus the standing-edict violation. The edict violation is the
substance; the bytes are corroboration.

**Cure.** Delete `demo/ui/` wholesale. Import glass-ui by its **subpath** at every site
(`@mkbabb/glass-ui/dialog`, `@mkbabb/glass-ui/button`) — the shape two files in this very directory
already use. This is a mechanical rewrite of ~5 lines in the dialog cluster and removes 20
directories.

---

### L-5 · MAJOR — the `G-DEMO-3b` barrel-seam boundary is DEAD: it guards a deleted alias and does not guard the live path

Both `dialog/index.ts:1-4` and `browser/index.ts:1-17` carry long comments asserting that the raw
`.vue` reach is *"the G-DEMO-3b boundary (eslint.config.js) enforced standing."* It is not.

`eslint.config.js:232-238` scopes the rule to file globs that **no longer exist**:

```js
files: [ "demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
         "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
         "demo/@/lib/**/*.ts",        "demo/@/lib/**/*.vue" ],
```
```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

and bans a specifier pattern built on the `@components` alias that **W43 · RF-15 deleted**
(`tsconfig.demo.json:33` — *"No `@styles`/`@components`/…"*; `vite.config.ts` alias array keeps only
`@src` + the value.js self-aliases):

```js
group: [ "@components/custom/palette-browser/**/*.vue" ],
```

**Proof by lint run** (stdin, nothing written to `demo/`):

```
$ printf 'import X from "../palettes/browser/dialog/MigratePalettesDialog.vue";\nimport Y from "@components/custom/palette-browser/dialog/MigratePalettesDialog.vue";\nexport { X, Y };\n' \
    | npx eslint --stdin --stdin-filename demo/color-picker/__probe.ts

  2:1  error  '@components/custom/palette-browser/dialog/MigratePalettesDialog.vue' import is restricted…  no-restricted-imports
✖ 1 problem (1 error, 0 warnings)
```

**Line 1 — the real, current-tree raw reach — passes clean.** Line 2 — a path that no file in the
repository can even resolve — is the only thing flagged. The same dead pattern is repeated in the
`G-DEMO-1` / `G-DEMO-3a` block (`eslint.config.js:279-300`), which is scoped to
`demo/@/composables/**` — also a directory that does not exist.

So the three-tier barrel apparatus around this component (raw `.vue` → `dialog/index.ts` →
`browser/index.ts`) is **ceremony with no enforcement**: two barrels, two long provenance comments,
zero guarantee. That is the KISS/no-contrivance edict inverted — structure whose only justification
is a rule that does not run.

**Cure.** Either re-point the globs and patterns at the real tree
(`files: ["demo/**/*.{ts,vue}"]`, `group: ["**/palettes/browser/*/*.vue"]`) and keep the seam, **or**
delete the seam. Do not keep both a dead rule and the barrels it was supposed to justify. Given L-7,
I recommend re-pointing after the component moves.

---

### L-6 · MAJOR — the component's own public type is unreachable through the seam, so the composable hand-copies it

`MigratePalettesDialog.vue:56` declares the domain vocabulary:

```ts
export type MigrateChoice = "publish" | "transfer" | "discard";
```

Neither barrel re-exports it:

```
demo/palettes/browser/dialog/index.ts:8   export { default as MigratePalettesDialog } from "./MigratePalettesDialog.vue";
demo/palettes/browser/index.ts:38-43      export { …, MigratePalettesDialog, … } from "./dialog";
```

The only way to obtain `MigrateChoice` is to import the raw `.vue` — which the seam law (L-5) forbids.
The consequence is mechanical and visible:

```
demo/palettes/useSlugMigration.ts:29   ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>(null)
demo/palettes/useSlugMigration.ts:106  async function onMigrateRespond(choice: "publish" | "transfer" | "discard")
```

The union is written out by hand **twice** in the composable. Three copies of one vocabulary, in two
files, with no compiler edge between them. Add a fourth choice and only the dialog knows.

**This is the ownership defect in its purest form:** a *domain* type is homed inside a *presentation*
file, and the seam that governs presentation cannot export types. `MigrateChoice` is not a component
concern; it is the palette-disposition vocabulary. It belongs in `demo/palettes/types.ts` beside
`Palette` / `PaletteColor`, which both the dialog and the composable already may import freely.

---

### L-7 · MAJOR — wrong home: the component lives inside `browser/`, and nothing in `browser/` uses it

```
$ grep -rn "MigratePalettesDialog" demo/palettes/browser/
demo/palettes/browser/index.ts:13:   # (a comment)
demo/palettes/browser/index.ts:40:   MigratePalettesDialog,
demo/palettes/browser/dialog/index.ts:3,8   # (a comment + the re-export)
```

Every reference inside `browser/` is a **barrel line or a comment**. No component, pane, or composable
under `demo/palettes/browser/` renders or reads it. Its two real relations both live outside:

- **Mounted by the shell:** `demo/color-picker/App.vue:152` (under `<!-- Global modals -->`), reaching
  *down three levels* into a sub-feature of a feature.
- **Driven by the feature root:** `demo/palettes/useSlugMigration.ts`, itself invoked from
  `demo/palettes/usePalettePorts.ts:79`.
- **Triggered by the shell dock:** `demo/shell/dock/layers/SlugEditLayer.vue:54`,
  `demo/shell/dock/menus/ProfileSection.vue:87`, `demo/shell/dock/menus/MobileMenuDropdown.vue:61`.

The dialog is not part of the palette **browser**. It is part of the **session/identity** flow. Its
physical location forces (a) a shell → feature-internal-sub-feature edge, (b) the two-barrel
apparatus of L-5 to make that edge respectable, and (c) the `useSlugMigration.ts:6`
`import type { PaletteSlugBar } from "./browser/slug"` edge — a feature-root composable reaching
*down* into a sub-feature for a component handle (see L-2).

---

### L-8 · MINOR — `rounded-dialog` is applied twice: the per-instance class restates a glass-ui default

`MigratePalettesDialog.vue:3`:

```html
<DialogContent class="rounded-dialog max-w-sm">
```

glass-ui's `DialogContent` already computes it
(`node_modules/@mkbabb/glass-ui/dist/dialog-TNRDkcE4.js`):

```js
let Y = P(h, m), X = a(() => e(t("floating"), "rounded-dialog")), …
```

**Live DOM proof** — `className` of the rendered `[role="dialog"]`:

```
… glass-reveal glass-floating rounded-dialog rounded-dialog max-w-sm
                              ^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^
```

`rounded-dialog` appears **twice**. It is the only occurrence in the whole demo
(`grep -rn "rounded-dialog" demo/ | wc -l` → `1`), and neither sibling dialog does it
(`FlagReportDialog.vue:3` = `class="sm:max-w-md"`; `VersionHistoryDrawer.vue:3` uses `placement`).
Dead markup, and a per-instance restatement of a root default — the root-level-styling edict.

Note the correct idiom is already in the tree: `PalettesPane.vue:103` configures
`<DialogContent surface="glass" :show-close="false">` by **prop**, not by class.

---

### L-9 · MINOR — `rounded-full` bypasses the glass-ui `--radius-pill` design token

`MigratePalettesDialog.vue:16, 25, 34` — all three buttons carry `rounded-full`.

```
$ grep -c "rounded-full" node_modules/@mkbabb/glass-ui/dist/styles/components.css \
                          node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
0
```

glass-ui ships `.rounded-pill{border-radius:var(--radius-pill)}` (and `rounded-button`,
`rounded-card`, `rounded-dialog`, `rounded-tooltip`, …). `rounded-full` is Tailwind core, and it
resolves to a hard constant — measured live:

```json
{ "label": "Publish, then switch",  "computed borderRadius": "1.67772e+07px" }
{ "label": "Just switch",           "computed borderRadius": "1.67772e+07px" }
```

The pill radius of every other capsule in the app rides `--radius-pill`; these three do not. If the
token moves, this dialog does not. Design-system bypass — use `rounded-pill`.

---

### L-10 · MINOR — dead `computed`: both ternary arms are the identical string

`MigratePalettesDialog.vue:73-77`:

```ts
const title = computed(() =>
    mode === "switch"
        ? "What about your palettes?"
        : "What about your palettes?",
);
```

A reactive computed over a constant, with a branch that cannot differ. Confirmed live: the dialog
renders the same title in both modes (`regenerate` probe and `switch` probe both read
`"What about your palettes?"`). It is `const title = "What about your palettes?"`, and once L-6 moves
the copy out (§ 3) it is a plain string in the choice table.

---

### L-11 · MINOR — `transfer` and `publish` are the same operation; `discard` discards nothing

`useSlugMigration.ts:62-71`:

```ts
pendingMigrateAction.value = async (choice) => {
    if (choice === "publish")  { await publishAllLocal(); }   // publish under the OLD identity
    await deps.userLogin(value);
    if (choice === "transfer") { await publishAllLocal(); }   // publish under the NEW identity
    setActiveTab("saved");
};
```

`publish` and `transfer` invoke the **identical** `publishAllLocal()`; they differ only in ordering
relative to `userLogin`. The UI presents them as two distinct destinations ("Publish, then switch"
vs "Transfer to new account") with different icons, and does not say which account receives them —
which is the *only* thing that actually differs.

`discard` runs neither branch. Nothing is cleared: `localStorage["color-palettes"]` is untouched.
Verified live — after clicking "Just switch", `savedCount` was still `2`. The *label* ("Just switch")
is honest; the *type literal* `"discard"` is a lie that a reader of `MigrateChoice` will believe.

**Cure.** Rename the vocabulary to what it means:
`type PaletteDisposition = "publish-as-current" | "publish-as-new" | "keep-local"`.

---

### L-12 · INFO — `publishAllLocal` swallows every per-palette failure

`useSlugMigration.ts:35-51`:

```ts
for (const palette of deps.savedPalettes.value) {
    try { await createAndSavePalette({ … }); }
    catch { /* Skip failures (e.g. duplicate slugs) */ }
}
```

A bare `catch {}` per palette. A user who clicks "Publish, then switch" with 12 palettes and has 11
fail on duplicate slugs is told nothing and shown nothing — the dialog has already closed (L-3). The
dialog's contract ("Publish, then switch") is not one the implementation keeps. It should return a
`{ published, failed }` tally and the dialog should render it.

---

### L-13 · INFO — zero visual-audit coverage; the component cannot appear in the matrix by construction

`docs/tranches/V/megatranche/audit/visual/REPORT.md` has no row that involves this component, in any
of the 4 matrices × 15 routes. The reason is structural: the dialog is gated on
`deps.savedPalettes.value.length > 0` (`useSlugMigration.ts:60, 92`) **and** an interaction. The
captured `/#/palettes` shots are all in the empty state — I read
`shots/safari-desktop-light/palettes.png` and it renders *"EMPTY PLATE · No saved palettes yet."*

Every finding above that required rendering came from my own live probes against
`http://localhost:9000`, not from the matrix. **Recommendation:** the visual harness needs a seeded-
storage variant, or this dialog (and every other gated modal) stays permanently unaudited.

---

## 3. The greenfield lattice

Stated concretely, no hedging. Four moves.

**(1) Retire `demo/ui/` and `demo/palettes/browser/slug/`.**
Import glass-ui by subpath at every call site. `SlugEditLayer` is the sole slug surface.
*Deletes: 20 directories + 1 component (243 lines) + 2 barrel lines.*

**(2) Re-home the dialog to the identity flow it belongs to.**

```
demo/color-session/identity/
    types.ts               ← PaletteDisposition, IdentityChangeKind ("switch" | "regenerate")
    useIdentityChange.ts   ← the flow: gate → prompt → dispose → navigate  (from useSlugMigration)
    PaletteDispositionDialog.vue
```

Renamed from `Migrate*` — nothing migrates; the user *disposes of* local palettes at an identity
change. `demo/palettes/useSlugMigration.ts` dissolves; `usePalettePorts` consumes the new composable.
This kills the shell → `palettes/browser/dialog` edge (L-7), kills the two-barrel apparatus around
it (L-5), and gives `PaletteDisposition` a real type home (L-6).

**(3) Make the dialog a pure, data-driven choice surface.**

The component's entire job is: title, description, N choices. Collapse the four `computed` copy-
switches (`:73-96`, incl. the dead one from L-10) into one table owned by the flow:

```ts
// demo/color-session/identity/types.ts
export type PaletteDisposition = "publish-as-current" | "publish-as-new" | "keep-local";
export interface DispositionChoice {
    id: PaletteDisposition;
    label: string;
    icon: Component;
    variant: "default" | "outline" | "ghost";
}
```

The SFC becomes `props: { open, title, description, choices }` + `emit: choose` — ~35 lines, no
`computed`, no mode branching, no copy. The two call sites (`switch` / `regenerate`) each supply
their own `choices` array, which makes L-11's degeneracy *visible at the point of authorship*: the
two "publish" rows sit adjacent in one literal and the author must state the difference in the label
or delete one.

**(4) Restore the types the boundary erased, and keep the dialog open through the action.**

`useIdentityChange` takes `switchView: (id: ViewId) => void` — no `Ref<string>`, no `as ViewId`
(L-1). `emit("choose")` is awaited by the parent; the dialog stays mounted with an `inFlight` /
`error` model and renders the `{ published, failed }` tally from `publishAllLocal` (L-3, L-12).
Styling: `rounded-pill` not `rounded-full` (L-9), no `class="rounded-dialog"` (L-8), `surface` by
prop.

**Estimated net: −20 directories, −243 lines of dead component, −2 barrels, −3 duplicated type
unions, −2 forked slug implementations, −1 dead lint block; +1 types module, +1 flow composable.**

---

## 4. Severity roll-up

| ID | Sev | One line | Anchor |
|---|---|---|---|
| L-1 | BLOCKER | `setActiveTab("saved")` throws; `ViewId` erased to `string`, cast back with `as ViewId` | `useSlugMigration.ts:55,69,76` · `usePalettePorts.ts:88` |
| L-2 | BLOCKER | `PaletteSlugBar.vue` dead 243-line fork; the S.W2 repair landed in the unmounted twin | `browser/slug/PaletteSlugBar.vue` vs `shell/dock/layers/SlugEditLayer.vue:59-61` |
| L-3 | MAJOR | every dialog-response failure is a silent `console.warn` | `useSlugMigration.ts:112` |
| L-4 | MAJOR | `demo/ui/` = 20 re-export shims; live dual entrypoint into glass-ui | `demo/ui/dialog/index.ts:1` · `MigratePalettesDialog.vue:52` |
| L-5 | MAJOR | `G-DEMO-3b` lint boundary guards a deleted alias; raw `.vue` reach passes clean | `eslint.config.js:232-253` |
| L-6 | MAJOR | `MigrateChoice` not exported by either barrel → union hand-copied twice | `MigratePalettesDialog.vue:56` · `useSlugMigration.ts:29,106` |
| L-7 | MAJOR | dialog homed in `browser/`; nothing in `browser/` uses it | `App.vue:152` |
| L-8 | MINOR | `rounded-dialog` rendered twice (per-instance restates glass-ui default) | `MigratePalettesDialog.vue:3` |
| L-9 | MINOR | `rounded-full` bypasses `--radius-pill` | `MigratePalettesDialog.vue:16,25,34` |
| L-10 | MINOR | `title` computed: both ternary arms identical | `MigratePalettesDialog.vue:73-77` |
| L-11 | MINOR | `transfer` ≡ `publish`; `discard` discards nothing | `useSlugMigration.ts:62-71` |
| L-12 | INFO | `publishAllLocal` bare `catch {}` per palette | `useSlugMigration.ts:44` |
| L-13 | INFO | zero visual-matrix coverage; gated modal unreachable by the harness | `visual/REPORT.md` |

**Strongest defect: L-1** — a live, reproducible unhandled page error on the primary slug-switch path,
whose root cause is exactly the library-structure defect this seat was chartered to find: a type
boundary that widens away a branded union, and a cast on the other side that launders the widened
value back in.

---

## 5. Reproduction appendix

Dev server live at `http://localhost:9000`. Read-only; no source touched.

```js
// 1 — seed local palettes so the disposition gate opens
localStorage.setItem("color-palettes", JSON.stringify({ palettes: [ /* 2 entries */ ] }));
location.reload();

// 2 — L-1: 3-segment slug fails looksLikeSlug → isAdmin branch → setActiveTab("saved") throws
const inp = document.querySelector('input[placeholder="enter slug or token..."]');
Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(inp,'audit-probe-slug');
inp.dispatchEvent(new Event('input',{bubbles:true}));
inp.closest('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
// → console: Error: No match for {"name":"saved",…}  at useSlugMigration.ts:36 (src :55)

// 3 — L-3/L-8/L-9: 4-segment slug → switch-mode dialog
Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(inp,'alpha-beta-gamma-delta');
inp.dispatchEvent(new Event('input',{bubbles:true}));
inp.closest('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
document.querySelector('[role="dialog"]').className;
// → "… rounded-dialog rounded-dialog max-w-sm"            (L-8)
[...document.querySelectorAll('[role="dialog"] button')].map(b => getComputedStyle(b).borderRadius);
// → ["1.67772e+07px", "1.67772e+07px", "1.67772e+07px", "4px"]   (L-9)

// 4 — L-3: click a choice, observe the silent failure
[...document.querySelectorAll('[role="dialog"] button')].find(b=>b.innerText.trim()==="Just switch").click();
// → console.warn "Migration action failed: User not found"; dialog closed; no user-visible feedback
```

```bash
# L-5 — the dead boundary (writes nothing)
printf 'import X from "../palettes/browser/dialog/MigratePalettesDialog.vue";\n' \
  | npx eslint --stdin --stdin-filename demo/color-picker/__probe.ts
# → clean.  The raw reach the barrels exist to forbid is not forbidden.
```
