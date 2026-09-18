# CHALLENGE-L — library structure · `VersionHistoryDrawer.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

Subject: `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` (168 lines, area `palettes`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

**Verdict: DEFECTIVE.** The premise holds. The module lattice under this component is inverted:
a leaf presentational drawer owns remote-fetch state that the composition root already owns, reaches
the composition root to get it, and drags 36 runtime modules — including the entire admin console
and both auth composables — into its graph to obtain one `Symbol`. The inversion is not cosmetic:
it produces an executable, confirmed failure of the component's primary function on first use.

---

## Evidence index (what I ran)

| # | Probe | Receipt |
|---|---|---|
| E1 | Executable component probe (vitest + `@vue/test-utils`, scratchpad config, no repo write) | §L-1 |
| E2 | Transitive import crawl of the drawer's module graph | §L-3 |
| E3 | `grep` census of every `pm.versions.*` call site | §L-2 |
| E4 | `npx tsc -p tsconfig.demo.json --traceResolution` | §L-10 |
| E5 | Live `GET https://api.color.babb.dev/palettes?limit=50` | §Reachability |
| E6 | Live Playwright drive of `http://localhost:9000/#/browse` | §Reachability |
| E7 | Visual-audit report + `shots/safari-desktop-light/browse.png` read | §Reachability |
| E8 | API source read (`api/src/modules/palette/service/{versions,crud}.ts`) | §L-6 |

---

## The component's import ledger

`VersionHistoryDrawer.vue:104-116`:

| Import | Physical home | Boundary crossed | Verdict |
|---|---|---|---|
| `vue` | package | — | OK |
| `../../../ui/dialog` | `demo/ui/dialog/index.ts` | feature leaf → demo-root alias barrel | **DEFECT L-4** |
| `../../../ui/button` | `demo/ui/button/index.ts` | same | **DEFECT L-4** |
| `@lucide/vue` | package | — | OK |
| `../dateFormat` | `demo/palettes/browser/dateFormat.ts` | sibling, feature-local | OK |
| `../../usePalettePorts` | `demo/palettes/usePalettePorts.ts` | feature leaf → **composition root** | **DEFECT L-3** |
| `type { PaletteVersion } from "../../types"` | feature-local types | — | OK (`import type`, edict 8 satisfied) |

### Negative proof on the published-surface question

The drawer imports `@mkbabb/value.js` **zero times** — no subpath, no deep `src/` path, no `@src`
alias. There is no false proof of the public API here. Verified:

```
$ grep -n "value.js\|@src" demo/palettes/browser/dialog/VersionHistoryDrawer.vue
(no output)
```

The wider demo is likewise clean on this axis — every demo reach is a real `exports` key:

```
$ grep -rn "@mkbabb/value.js" demo --include=*.ts --include=*.vue | awk -F'from ' '{print $2}' | sort | uniq -c
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";
```

All five are keys of `package.json#exports`. `tsc --traceResolution` confirms they resolve through
the package's own `exports` self-reference to `dist/subpaths/*.d.ts`, i.e. the same trust boundary a
real consumer gets. **This axis is SOUND.** (The stale `paths` block is a separate, smaller finding —
§L-10.)

---

## Reachability (context for every severity below)

The component is **currently unreachable in the running product.** The gate is
`PaletteCardMenu.vue:94`:

```
v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
```

Live commons, measured:

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50"   # → {'nextCursor': None, 'hasMore': False}
hey-v2-cd3e1e3b-remix-fecce815 versionCount= 1
hey-v2-cd3e1e3b-remix-2a95820d versionCount= 1
hey-v2-cd3e1e3b                versionCount= 1
hey-7600d315                   versionCount= 1
audit-test-palette-51f63f52    versionCount= 1
lavender-dreams                versionCount= 1
forest-canopy                  versionCount= 1
neon-cyberpunk                 versionCount= 1
ocean-depths                   versionCount= 1
sunset-blaze                   versionCount= 1
```

Ten public palettes, `hasMore: false`, **every one at `versionCount === 1`** — the gate is false for
the entire commons. The only place the drawer renders today is the e2e fixture that hand-sets
`versionCount: 3` (`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:125`), and that spec asserts
only the title's typeface, never a row.

The local dev server compounds it: driving `http://localhost:9000/#/browse` with Playwright shows the
`misconfigured` latch ("dev misconfigured — run `npm run dev`") and the browse wall in its
`The commons is unreachable. / Failed to load palettes / Retry` state — matching
`audit/visual/shots/safari-desktop-light/browse.png`, which I read. No remote card ever mounts, so
no card menu, so no drawer. Local palettes carry `4 versions` / `9 versions` badges in the live DOM
snapshot but are excluded by `!palette.isLocal`.

This is why the confirmations below come from an **executable component probe** rather than a UI
drive: the UI path to this component does not exist in any running environment.

---

## Defects

### L-1 · BLOCKER — the drawer never loads on its first open. CONFIRMED, executable.

`VersionHistoryDrawer.vue:158-167` is the sole load trigger:

```ts
watch(
    () => open,
    (isOpen) => {
        if (isOpen && paletteSlug) { versions.value = []; total.value = 0; loadVersions(); }
    },
);
```

No `immediate`. The host mounts the component **already open** — `BrowsePane.vue:275-278`:

```ts
function onVersions(palette: Palette) {
    versionPalette.value = palette;      // flips the v-if
    versionDrawerOpen.value = true;      // flips the :open
}
```

Both cells are written in one synchronous handler, so the drawer's **first render already has
`open === true`** (`BrowsePane.vue:157-165`: `v-if="versionPalette"` + `:open="versionDrawerOpen"`).
A non-immediate watcher records `true` as its initial value and never fires. `versionPalette` is
never reset to `null`, so the component stays mounted afterwards and the *second* open works.

**Reproduction (run, output pasted):**

```
$ npx vitest run --config <scratchpad>/vhd-L/probe.config.ts
[probe] mounted with open=true → fetchVersions calls = 0 | rendered version rows = 0
        | body text = "Version HistorySunset — 0 versions"
[probe] mounted closed → opened → fetchVersions calls = 1
        | body text = "Version HistorySunset — 1 version v1 (current)Jun 30, 08:00 PMSunset"
 Test Files  1 passed (1)
      Tests  3 passed (3)
```

The first-ever open of Version History in a session renders the header, the words
**"— 0 versions"**, and an empty body. No spinner (`loading` stays `false`), no error, no rows.
The component's entire reason to exist fails on invocation #1.

**Mechanism — this is a structure defect, not a `watch` typo.** "When does the version list load?"
has no owner. The host owns *when the drawer opens*; the drawer owns *when the list loads*; the two
are coupled only by a prop edge whose mount-time value the drawer's watcher is blind to. The
composable that was built to own the whole concern (`useVersionHistory`) is bypassed — see L-2.
Had the host called `pm.versions.open(slug)` in `onVersions`, this failure class is unconstructible.

**Cure:** delete the drawer's watcher, its local state, and its fetch. `BrowsePane.onVersions`
calls the composable. See §Proposed lattice.

---

### L-2 · MAJOR — two live implementations of one paging state machine; 7 of 10 composable members are dead.

`useVersionHistory.ts:45-86` owns `versions` / `total` / `loading` / `paletteSlug` and an
accumulating `loadVersions(slug, offset)` + `loadMore()`.

`VersionHistoryDrawer.vue:133-155` re-declares `versions` / `total` / `loading` and re-implements
the identical accumulate-or-replace body:

| `useVersionHistory.ts` | `VersionHistoryDrawer.vue` |
|---|---|
| `const versions = ref<PaletteVersion[]>([])` (46) | `const versions = ref<PaletteVersion[]>([])` (133) |
| `const total = ref(0)` (47) | `const total = ref(0)` (134) |
| `const loading = ref(false)` (48) | `const loading = ref(false)` (135) |
| `if (offset === 0) versions.value = page.data; else versions.value = [...versions.value, ...page.data]` (71-75) | identical, verbatim (142-146) |
| `loadMore()` → `loadVersions(slug, versions.value.length)` (82-86) | `loadMore()` → `loadVersions(versions.value.length)` (153-155) |

The escape hatch that permits the duplication is `fetchVersions`, whose own doc comment names the
inversion out loud (`useVersionHistory.ts:27`):

> `/** Fetch a single page of versions (raw; drawers manage their own list). */`

Grep census of every consumer of the port (E3):

```
$ grep -rn "\.versions\b\|useVersionHistory\|loadVersions\|fetchVersions\|listVersions" demo test e2e
demo/palettes/BrowsePane.vue:279:                     await pm.versions.revert(...)
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:55: await pm.versions.fork(...)
demo/palettes/browser/dialog/VersionHistoryDrawer.vue:140:            pm.versions.fetchVersions(...)
(no other consumer)
```

**3 of 10 exported members are used.** `versions`, `total`, `loading`, `paletteSlug`,
`loadVersions`, `loadMore`, `reset` — the composable's entire *stateful half*, the reason it is a
composable rather than three functions — have **zero consumers**. That is a dual path plus dead code
in one object: standing edict 2 ("no dual paths, no legacy") violated twice over.

The split also chops the revert flow in half: the drawer emits `revert` (line 80) and the host calls
`pm.versions.revert` (`BrowsePane.vue:279`) — so for *revert* the drawer is a dumb view and the
composable is the owner, while for *list* the drawer is the owner and the composable is bypassed.
One concern, two opposite ownership conventions, in one 168-line file.

---

### L-3 · MAJOR — a leaf drawer imports the composition root; 36 runtime modules to obtain one `Symbol`.

`VersionHistoryDrawer.vue:115` imports `BROWSE_PORT_KEY` from `demo/palettes/usePalettePorts.ts` —
the module that constructs and `provide()`s all five application ports (`usePalettePorts.ts:242-246`)
and that wires auth, storage, transport, the palette store, slug migration and the admin console.
`BROWSE_PORT_KEY` is a runtime value, so the whole module executes.

**Measured** (transitive crawl, type-only edges pruned):

```
=== demo/palettes/browser/dialog/VersionHistoryDrawer.vue — RUNTIME imports ===
modules in graph: 36
bare packages: ['@lucide/vue', '@mkbabb/glass-ui', '@vueuse/core', 'vue']
```

The 36 include the drawer's own file, both `demo/ui` barrels, and:

```
demo/palettes/api/{admin-audit,admin-colors,admin-palettes,admin-users,colors,index,palettes,versions}.ts
demo/palettes/use{AdminAudit,AdminFlagged,AdminTags,AdminUsers,BrowsePalettes,ColorNameQueue,
                  FilteredList,PaletteActions,PalettePorts,PaletteStore,SlugMigration,TagEdit,
                  VersionHistory}.ts
demo/platform/auth/{sessionToken,sessions,useAdminAuth,useSession,useUserAuth}.ts
demo/platform/storage/useSafeStorage.ts
demo/platform/transport/{api-problem,availability,client}.ts
```

A drawer that lists version rows pulls in the **admin user console, the admin audit log, the admin
colour-name queue, the admin tag editor, admin flagging, the slug-migration machine, and both auth
composables.**

**Counterfactual, measured on the same crawler:** the drawer's actual data need is `listVersions`,
which lives at `demo/palettes/api/versions.ts` — a 4-module graph
(`versions.ts` + `transport/{client,api-problem,availability}.ts`). Drawer + `dateFormat` + the two
UI barrels on top ⇒ **8 modules instead of 36, a 4.5× reduction**, with no behaviour change.

This is the "feature → shell" edge the challenge names, and the port abstraction is what disguises
it: `BrowsePort` is a 32-member cross-slice object (`usePalettePorts.ts:157-192`), so *any* leaf
that injects it depends structurally on all 32. The RF-15 note at `usePalettePorts.ts:21-31` claims
the old god facade was dissolved into "FIVE narrow, feature-owned ports"; `browsePort` is 32 members
spanning browse + actions + admin + auth + versions + tagEdit + flagged. It is a god module wearing
a port's name — edict 1.

---

### L-4 · MAJOR — `demo/ui/` is 19 pure-alias barrels over glass-ui. Zero content, 48 consumers.

```
$ ls demo/ui/*/index.ts | wc -l          → 19
$ find demo/ui -type f ! -name index.ts | wc -l → 0
$ cat demo/ui/*/index.ts | wc -l         → 29
$ cat demo/ui/dialog/index.ts
export { Dialog, DialogClose, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@mkbabb/glass-ui";
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

Every one of the 19 is a bare re-export. 48 demo files import through them. This is exactly the
construct edicts 2 and 3 forbid: an alias layer / wrapper directory that adds nothing, kept alive
only because the imports were never migrated to the root. The `demo/ui/alert/index.ts` comment even
records that this directory *used* to hold real re-implementations and was converted to re-exports —
the correct final step, deleting the barrel, was never taken.

Consequence at the subject: `import { Dialog … } from "../../../ui/dialog"` is a three-level climb
out of `browser/dialog/` into a demo-root directory to reach a package the file could name directly.
The path itself encodes a boundary that has no reason to exist.

**Cure:** delete `demo/ui/` (19 files, 29 lines); rewrite the 48 consumers to
`from "@mkbabb/glass-ui"` / `"@mkbabb/glass-ui/forms"`. Mechanical, no behaviour change, and it
removes 2 of the drawer's 36 graph modules.

---

### L-5 · MAJOR — the drawer never refetches on a slug/hash change while open. CONFIRMED; latent cross-palette revert.

Same watcher (`:158`) keys **only** on `open`. `paletteSlug` and `currentHash` are live props that
the host reassigns (`BrowsePane.vue:283`: `versionPalette.value = updated`).

**Reproduction (run, output pasted):**

```
[probe] props swapped while open → fetches before = 1  after = 1
        | body text = "Version HistorySunset — 1 version v1 Jun 30, 08:00 PMSunset Revert"
```

After `paletteSlug` was swapped to `"other"`, the drawer still displays palette `sunset`'s version
row **and now offers a `Revert` button for it** — the `(current)` marker has dropped off (the new
`currentHash` matches nothing in the stale list), which is precisely what un-suppresses the Revert
control at `:76` (`v-if="version.hash !== currentHash"`).

The emitted hash would flow to `BrowsePane.onRevert` → `pm.versions.revert(versionPalette.slug, hash)`
→ `POST /palettes/other/revert {hash: <sunset's hash>}`. The API does **not** scope the lookup:

- `api/src/modules/palette/repository/paletteVersion.ts:13-15` — `findByHash` is `findOne({_id: hash})`, unscoped.
- `api/src/modules/palette/service/versions.ts:103` + the `$set` that follows — `revertToVersion` never asserts `version.paletteSlug === slug`; it copies `version.name` and `version.colors` onto the target palette.

**Status of the cross-palette write: HYPOTHESIS, not reproduced.** Today's single host happens to
close the drawer between palettes (`versionDrawerOpen` false→true re-fires the watcher), so the
slug never changes mid-open in practice. It is a loaded trap, not a live bug — but the trap exists
only because prop-driven identity and locally-owned data live on opposite sides of a boundary that
should not be there. The API-side missing scope check is a real, independent hardening item.

---

### L-6 · MAJOR — "how many versions" has two homes that provably diverge.

Two numbers claim the same concept:

| Number | Source | Rendered at |
|---|---|---|
| `palette.versionCount` | the `palettes` document | `PaletteCardMenu.vue:101` (menu badge), `PaletteCardMeta` ("4 versions" chip) |
| `page.total` from `listVersions` | `count({paletteSlug})` over `palette_versions` | `VersionHistoryDrawer.vue:11` header, `:37` `v{{ total - i }}` labels, `:89` load-more gate |

They are written by different code and drift by construction:

- `api/src/modules/palette/service/versions.ts` (`revertToVersion`) `$inc: { versionCount: 1 }` **unconditionally** inside the transaction.
- `createVersionRecord` (`versions.ts:40-44`) early-returns when a record with that content hash already exists: `const existing = await …findByHash(hash); if (existing) return hash;`

A revert restores prior content, so its hash **already exists** → no new row is inserted → the
`palette_versions` count is unchanged while `versionCount` is incremented. After one revert the card
badge says N+1 and the drawer header says N, permanently. Every `v{{ total - i }}` label is then
off by one relative to the badge the user just clicked.

Deeper: version identity **is** the content hash globally (`_id: hash`, `versions.ts:60`), not
per-palette. Two palettes with identical `(name, colors)` share one version row, owned by whichever
palette created it first; `listVersions` filters `{paletteSlug}` (`repository/paletteVersion.ts:22`)
and will therefore omit that row for the second palette. The live data shows the shape: the two
remixes `hey-v2-cd3e1e3b-remix-fecce815` and `…-2a95820d` carry the **same** `currentHash 6691aae4`.

Unique semantic ownership is the invariant, and "version count" violates it across the API/demo seam.

---

### L-7 · MAJOR — `demo/palettes/export.ts` vs `demo/palettes/export/`: the app ships one, the tests prove the other.

Confirmed instance of the named historical suspect, inside the subject's own module:

```
$ grep -rn "from \"./export\"\|palettes/export/" demo test e2e
demo/palettes/usePaletteExport.ts:9:            } from "./export";          ← the APP
demo/test/export/byte-exact.test.ts:23:      } from "../../palettes/export/serializers";  ← the TESTS
$ ls demo/palettes/export/index.ts
ls: demo/palettes/export/index.ts: No such file or directory
```

`./export` has no directory index, so it resolves to `export.ts` (132 lines, 5 serializers +
`downloadExport`). The 12-file `export/` directory (914 lines: `serializers`, `canonical`, `digest`,
`rfc8785`, `bytes`, `png`, `svg`, `css`, `json`, `tailwind`, `reload`, `types`) has **no runtime
consumer at all** — only `demo/test/export/byte-exact.test.ts`.

The byte-exactness suite therefore certifies an implementation the product does not run, and the
implementation the product does run is untested. Two homes for "serialize a palette", and the test
gate is pointed at the wrong one. Edict 2, and a false green.

*Scope note: module-level (`demo/palettes/`), not component-local. Recorded because the challenge
names it and because it is the same mechanism as L-2 at a larger radius.*

---

### L-8 · MAJOR — the destructive `Revert` control is hover-only, with a drifted twin idiom.

`VersionHistoryDrawer.vue:79`:

```
class="mt-2 h-7 text-caption opacity-0 transition-opacity group-hover:opacity-100"
```

The only other instance of this idiom in the demo has an extra state:

```
$ grep -rn "opacity-0 transition-opacity group-hover:opacity-100" demo --include=*.vue
demo/workbenches/extract/ImageDropZone.vue:58: … group-hover:opacity-100 group-focus-visible:opacity-100
demo/palettes/browser/dialog/VersionHistoryDrawer.vue:79: … group-hover:opacity-100
```

Two hand-rolled copies of "reveal on hover", drifted: one handles keyboard, one does not. There is
no shared home for the idiom, so drift is the default outcome — the structural point.

Consequences of the drawer's copy: `opacity-0` does not remove the element from the tab order or
from hit-testing, so (a) a keyboard user can focus an invisible destructive button, and (b) on
touch — mobile Safari, half of the audit matrix — there is no hover, so `Revert` is simultaneously
**invisible and tappable**: a tap in its box performs a destructive revert with no visible
affordance. *Status: mechanism-proven from source; not live-reproduced, because §Reachability.*

Edict 4/5: a `row-action` / reveal-on-interaction primitive belongs in glass-ui with one definition,
not two inline recipes in two features.

---

### L-9 · MINOR — four bespoke width recipes on one glass root component (edict 5).

```
$ grep -rn "DialogContent" demo --include=*.vue
PalettesPane.vue:103:            <DialogContent surface="glass" :show-close="false">
AdminUsersPanel.vue:159:         <DialogContent surface="glass" :show-close="false">
FlagReportDialog.vue:3:          <DialogContent class="sm:max-w-md">
VersionHistoryDrawer.vue:3:      <DialogContent placement="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
MigratePalettesDialog.vue:3:     <DialogContent class="rounded-dialog max-w-sm">
```

Five call sites, four different per-instance sizing recipes. The drawer's is the only one that also
carries layout (`flex flex-col`) and a raw arbitrary pixel value (`w-[380px]`). glass-ui already owns
the drawer *placement* concept (`placement="right"`, the Glass 7 Sheet-onto-Dialog fold noted at
`VersionHistoryDrawer.vue:5-8`); it does not own the drawer *size*, so every consumer invents one.
Styling at the root component level means a glass-ui `DialogContent` `size` variant, not four
class-string dialects.

---

### L-10 · MINOR — `tsconfig.demo.json` `paths` is 3/8 phantom and its comment is false.

`tsconfig.demo.json:31-46` declares eight value.js keys. `package.json#exports` declares seven, and
`src/subpaths/` holds exactly those seven (`color value css easing math transform quantize`).

| tsconfig `paths` key | target | reality |
|---|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | — | **file does not exist**; `"."` is not an `exports` key |
| `@mkbabb/value.js/parsing` → `dist/subpaths/parsing.d.ts` | — | **file does not exist**; not an `exports` key |
| `@mkbabb/value.js/units` → `dist/subpaths/units.d.ts` | — | **file does not exist**; not an `exports` key |
| `/color /math /easing /transform /quantize` | ok | real |
| `/value`, `/css` | **absent from `paths`** | real `exports` keys |

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

Resolution still lands correctly for the two omitted keys, via package self-reference — proven:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "value.js/css"
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID
         '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

So the harm is not miscompilation — it is three dead map entries plus a load-bearing comment that is
now false. `tsconfig.demo.json:18-22` asserts *"glass-ui's published `dist/` imports the value.js
core by the bare `@mkbabb/value.js` specifier … so the demo aliases that specifier"*. It does not:

```
$ grep -rho 'from "@mkbabb/value.js[^"]*"' node_modules/@mkbabb/glass-ui/dist/*.js | sort | uniq -c
   5 from "@mkbabb/value.js/color"
   3 from "@mkbabb/value.js/css"
   1 from "@mkbabb/value.js/easing"
```

Subpaths only. And `vite.config.ts:37` calls the map a *"CLOSED 8-key set"* while generating exactly
seven aliases from it. Configuration that documents a shape the tree no longer has is legacy under
edict 2. (Also noted: `node_modules/@mkbabb/value.js` is a *physically installed 4.0.0 copy*, not a
symlink, and its `dist/subpaths/css.js` hash differs from the repo's — `8b53813…` vs `ca87007…`. It
is currently shadowed by self-reference in both Vite and tsc, so it is inert; it is a live footgun
if either alias set is ever loosened.)

---

### L-11 · MINOR — `useDialogBrowseActions.onRevert` and its `modalStack` dep are dead.

`useDialogBrowseActions.ts:38` declares an optional `modalStack`; `:77` returns immediately when it
is absent. The composable has exactly one consumer, `BrowsePane.vue:261`, which does not pass it —
its own comment (`:39`) says the pane "keeps its own version-drawer revert". The migration-source
docblock cites `PaletteDialog/composables/useDialogModalStack.ts`, which does not exist in the tree.
So `onRevert` is an unreachable branch guarding a dep no caller supplies: a third partial owner of
"revert", alongside the drawer's emit and `useVersionHistory.revert`.

---

### L-12 · MINOR — a failed version fetch is indistinguishable from "no versions".

`useVersionHistory.ts:59-62` catches, `console.warn`s and returns `undefined`;
`VersionHistoryDrawer.vue:141` does `if (!page) return` inside a `try/finally` that clears `loading`.
Net rendering on any network failure: the same empty drawer as L-1. The feature already owns a
proper degraded affordance one level up — `browseError` → *"The commons is unreachable. / Retry"*
(visible in `shots/safari-desktop-light/browse.png`) — but the error state is not routed into the
drawer, because the drawer, not the port, owns the fetch.

---

## What is genuinely sound

- **Published-surface hygiene.** No `@mkbabb/value.js` deep path, no `@src`, no `src/` internal reach.
  Nothing in this component is a false proof of the public API.
- **`verbatimModuleSyntax`** (edict 8): the single type-only import is `import type` (`:116`). PASS.
- **Vue 3.5 idiom** (edict 7): reactive props destructure at `:118`, correct; no stale-read
  `defineModel` pattern is in play, so no `shallowRef` is owed.
- **Animations** (edict 6): nothing deleted; `animate-spin`, `transition-colors`, `transition-opacity`
  are framework utilities, no scoped `@keyframes` to move.
- **Barrel discipline**: the component is reached through `dialog/index.ts` → `browser/index.ts`, per
  G-DEMO-3b; `BrowsePane.vue:194` imports the barrel, not the raw `.vue`. PASS.
- **The component's own size**: 168 lines, one screen, no god module *inside* the file. The god is
  entirely upstream of it.

---

## Proposed lattice (greenfield, stated concretely)

The concept is **"the version history of a palette"**. It gets exactly one home.

```
demo/palettes/
  api/versions.ts                 (unchanged) — transport only: listVersions / revertPalette / forkPalette
  useVersionHistory.ts            THE owner. Surface shrinks to:
      versions, total, loading          (state — now actually consumed)
      open(slug)                        resets + loads page 0        ← absorbs the drawer's watcher
      loadMore()                        offset paging
      revert(hash)  →  revertPalette(); then re-open(slug)   ← invalidation lives WITH the mutation
      fork(slug, …)
      close()
    DELETED: fetchVersions (the escape hatch that licensed the duplicate)
  browser/dialog/VersionHistoryDrawer.vue   PURE VIEW
      props:  { open, paletteName, currentHash, versions, total, loading }
      emits:  { "update:open", loadMore, revert }
      zero inject · zero fetch · zero local list state · zero watcher
```

`BrowsePane.onVersions(palette)` becomes `pm.versions.open(palette.slug); versionDrawerOpen = true`.

What this buys, each item traceable to a defect above:

1. **L-1 becomes unconstructible.** Loading is triggered by the same call that opens the drawer;
   there is no mount-time-value blind spot to have.
2. **L-5 becomes unconstructible.** Identity (`slug`) and data live in one cell; they cannot disagree.
3. **L-2 collapses.** One implementation; the composable's 7 dead members become the live ones.
4. **L-3 collapses.** The drawer stops importing `usePalettePorts`; its runtime graph drops from
   **36 → ~6** (drawer, `dateFormat`, two glass-ui specifiers post-L-4, `types`).
5. **L-11 dies with it** — `modalStack`/`onRevert` deleted; revert has one owner.
6. **L-12 is fixable in one place** — the composable gains an `error` cell and the drawer renders it,
   the same way `browseError` already works one level up.

Adjacent, same session, same mechanism:

- **Delete `demo/ui/` (19 files / 29 lines)**; rewrite 48 consumers to `@mkbabb/glass-ui`. (L-4)
- **Delete one of `demo/palettes/export.ts` / `demo/palettes/export/`**; repoint `usePaletteExport`
  and `byte-exact.test.ts` at the survivor, so the tested and shipped serializers are one module. (L-7)
- **glass-ui**: add a `DialogContent` `size` variant covering the drawer width, and one
  reveal-on-interaction row-action primitive that pairs `group-hover` with `group-focus-visible`.
  Both are design-system concepts; neither belongs in `demo/`. (L-8, L-9)
- **API**: scope `revertToVersion`'s lookup to the palette (`version.paletteSlug === slug`), and make
  `versionCount` derived rather than `$inc`-ed, so "how many versions" has one home. (L-5, L-6)

**Bootstrap prerequisite, or all of the above ships blind:** the commons has no palette with
`versionCount > 1` and the local dev stack cannot reach any API, so this component has no
non-fixture environment in which it renders. A seeded versioned palette (or a fixture route in the
dev stack) is the precondition for any of these cures being observable.

---

## Files cited

- `/Users/mkbabb/Programming/value.js/demo/palettes/browser/dialog/VersionHistoryDrawer.vue`
- `/Users/mkbabb/Programming/value.js/demo/palettes/useVersionHistory.ts`
- `/Users/mkbabb/Programming/value.js/demo/palettes/usePalettePorts.ts`
- `/Users/mkbabb/Programming/value.js/demo/palettes/BrowsePane.vue`
- `/Users/mkbabb/Programming/value.js/demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts`
- `/Users/mkbabb/Programming/value.js/demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue`
- `/Users/mkbabb/Programming/value.js/demo/palettes/api/versions.ts`
- `/Users/mkbabb/Programming/value.js/demo/palettes/export.ts` · `/Users/mkbabb/Programming/value.js/demo/palettes/export/serializers.ts`
- `/Users/mkbabb/Programming/value.js/demo/ui/dialog/index.ts` · `/Users/mkbabb/Programming/value.js/demo/ui/button/index.ts`
- `/Users/mkbabb/Programming/value.js/api/src/modules/palette/service/versions.ts` · `.../service/crud.ts` · `.../repository/paletteVersion.ts`
- `/Users/mkbabb/Programming/value.js/tsconfig.demo.json` · `/Users/mkbabb/Programming/value.js/vite.config.ts` · `/Users/mkbabb/Programming/value.js/package.json`
- `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/REPORT.md` · `.../shots/safari-desktop-light/browse.png`

Probe artifacts (scratchpad, outside the repo, no repo write performed):
`…/scratchpad/vhd-L/drawer.probe.test.ts`, `…/scratchpad/vhd-L/probe.config.ts`, `…/scratchpad/vhd-L/crawl.py`

---
---

# ADDENDUM · CHALLENGE-L SECOND PASS (independent re-audit)

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. Declared, not inherited. This is a **second, independent L-seat** on the
same subject at the same HEAD (`c654824e`).

**Standing edict E-3 (addenda-not-patch)**: the first pass above is preserved verbatim. Nothing in it
is edited or deleted. This addendum records (a) an independent re-derivation of the blocker with a
receipt that is **runnable from the repo**, (b) five findings the first pass did not reach, and
(c) one correction to a "sound" claim in the first pass.

**Addendum verdict: DEFECTIVE** — concurs with the first pass, on partly different evidence.

---

## A-0 · Independent confirmation of L-1, with an in-repo receipt

I derived the first-open failure independently (before reading the first pass) and reached the same
mechanism: non-immediate `watch(() => open)` at `VersionHistoryDrawer.vue:158-167` against a host that
flips `v-if` and `:open` in one synchronous tick (`BrowsePane.vue:272-275`, `:157-159`).

The first pass's receipt lives in a scratchpad that no longer exists for a future reader. Mine is
committed beside this report and re-runs from a clean checkout — real Vue 3.5.35 + jsdom, no vitest
config, no repo state:

```
$ node docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/repro-L1-first-open.mjs
after FIRST open  → loadVersions calls = 0 (expected 1)
after SECOND open → loadVersions calls = 1 (expected 2)
exit=1
```

**L-1 is CONFIRMED twice, by two seats, on two independent harnesses.** Artifact:
`docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/repro-L1-first-open.mjs`.

Independently reproduced from the first pass and concurred without restatement: **L-2** (7 of 10
`UseVersionHistory` members dead — my grep census matched theirs exactly), **L-3** (26 members counted
on `browsePort` by `sed`/`grep -c`, versus their 32 by hand; either way the "FIVE narrow ports"
charter at `usePalettePorts.ts:25-30` is contradicted by `usePalettePorts.ts:176-178`, which publishes
`versions`, `tagEdit`, `flagged` as whole sub-composable **handles**), **L-4**, **L-10**, **L-12**.
I also independently verified two of their cross-module claims that a reader might discount:
`demo/palettes/export.ts` vs the 12-file `demo/palettes/export/` with `byte-exact.test.ts:23` as the
directory's only consumer (**L-7, real**), and the `PaletteCardMenu.vue:94` reachability gate
(**real**).

---

## A-1 · MAJOR (NEW) — glass-ui's `scroll` axis is centre-only, so every side sheet hand-rolls scrolling

The first pass's L-9 catches the *width* dialects. It misses the larger half: `DialogContent`
publishes a `scroll` prop, default `true`
(`node_modules/@mkbabb/glass-ui/dist/components/dialog/DialogContent.vue.d.ts:13`) — and the compiled
implementation gates it on **centre placement**:

```js
// node_modules/@mkbabb/glass-ui/dist/dialog-TNRDkcE4.js
g = a(() => f.placement ?? "center"), _ = a(() => g.value === "center"),
…
oe = a(() => f.scroll && _.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : ""),
se = a(() => _.value ? e(ne, O.value ? "" : re, X.value, oe.value, f.class)   // centre → gets `oe`
                     : e(ie, ae[g.value], t("floating"), f.class))            // side  → NEVER gets `oe`
```

For `placement="right"` the `scroll` prop is a **no-op**. So the consumer must rebuild the scroll
frame by hand, which is exactly what this component does across three elements —
`VersionHistoryDrawer.vue:3` (`flex flex-col` on the glass root), `:4` (`shrink-0` on the header),
`:15` (`flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin` on the body). Five layout
utilities per instance to restore a behaviour the primitive already names, forced by a gap in the
primitive.

This reframes L-9's cure. It is not only "add a `size` variant": `DialogContent` already carries five
design axes (`surface`, `placement`, `motion`, `stage`, `backdrop`) and **two of them are incomplete
for the side-sheet path**. Both halves are glass-ui-owned:

1. move `oe` out of the centre-only branch so `scroll` honours `top`/`bottom`/`left`/`right`;
2. add `size` as the sixth axis, tokenised, so `w-[380px] sm:max-w-[420px]` / `sm:max-w-md` /
   `max-w-sm` collapse to `size="sm"`.

Then `VersionHistoryDrawer.vue:3` becomes `<DialogContent placement="right" size="sm">` and lines 4
and 15 shed their layout classes entirely. **Standing BH/BI relay edict applies** — this is a
glass-ui-level change and must reach the active glass-ui BH inbox.

---

## A-2 · MAJOR (NEW) — the swatch-overflow row is duplicated, and the duplicate missed the a11y fix

Neither the first pass nor its lattice mentions the drawer's swatch row. It is a verbatim fork:

```html
<!-- VersionHistoryDrawer.vue:51-64 -->
<div class="mt-2 flex -space-x-0.5">
    <div v-for="(c, ci) in version.colors.slice(0, 8)" :key="ci"
         class="h-5 w-5 rounded-full border border-background" :style="{ backgroundColor: c.css }" />
    <span v-if="version.colors.length > 8" …>+{{ version.colors.length - 8 }}</span>
</div>

<!-- AdminFlaggedPanel.vue:52-58 -->
<div class="flex -space-x-1 shrink-0">
    <div v-for="(c, i) in (item.palette?.colors ?? []).slice(0, 5)" :key="i"
         class="h-5 w-5 rounded-full border border-background" :style="{ backgroundColor: c.css }" />
</div>
```

Identical swatch class string, identical `:style` binding; different overlap, different cap (8 vs 5),
overflow chip on one only. Meanwhile the same feature ships **two** components that already own
swatch presentation: `demo/palettes/browser/card/PaletteColorStrip.vue` and
`card/PaletteCard/PaletteCardSwatches.vue`.

**The cost of the duplication is measurable, not theoretical.** `PaletteColorStrip.vue:2-5` carries
the W5-a11y fix:

```html
<!-- W5-a11y: color strip is a decorative visual, hidden from AT -->
<div aria-hidden="true" role="presentation" …>
```

Neither hand-rolled copy has it. A screen reader walks 8 anonymous `<div>`s in this drawer. One home
received the fix; the two forks could not, because nothing connects them. That is the whole argument
for unique semantic ownership, stated as a defect rather than a principle.

**Second, subtler — the one place this component would touch the library, and does not.** The drawer
paints server-supplied `PaletteVersion.colors[].css` **raw** into `backgroundColor` (`:56`). The same
feature has a guarded path — `PaletteCard.vue:230`:

```ts
const safeFirstColor = computed(() => safeCss(firstColor.value));
```

`safeCss` (from `useSafeAccentFn`; 10 call sites across `scenes/`, `workbenches/`, `shell/`) is the
demo's value.js-backed "this string is paintable" boundary. An unparseable value paints transparent
and the swatch silently vanishes. The first pass's negative proof — *"the drawer imports
`@mkbabb/value.js` zero times"* — is correct as stated, but it is not neutral: this is precisely where
the library boundary **should** have been crossed and was not.

**Cure**: one `PaletteSwatchRow` in `browser/card/` (the existing home of swatch presentation) —
`:colors :limit`, `aria-hidden`, `safeCss` applied, overflow chip included. Consumed by this drawer
and by `AdminFlaggedPanel`. Not a new `shared/` directory (edict 3) — an existing directory that
already owns the concept.

---

## A-3 · MAJOR (NEW) — the barrel-seam invariant is **unenforced**; correction to a first-pass PASS

The first pass records under *What is genuinely sound*:

> **Barrel discipline**: the component is reached through `dialog/index.ts` → `browser/index.ts`, per
> G-DEMO-3b … PASS.

The *behaviour* is compliant. The *enforcement* it credits is dead. G-DEMO-3b targets a tree deleted
at W43:

```
eslint.config.js:232-239   files: ["demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
                                   "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
                                   "demo/@/lib/**/*.ts",        "demo/@/lib/**/*.vue"]
eslint.config.js:246-248   group: ["@components/custom/palette-browser/**/*.vue"]

$ ls -d demo/@
ls: demo/@: No such file or directory
```

`demo/@/**` matches zero files. The banned specifier `@components/custom/…` can no longer be written
by anyone: the `@components` alias was deleted at W43 (`vite.config.ts:68-70`, and `tsconfig.demo.json`
— *"No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/`@assets` project alias survives"*), so
the one live glob (`demo/color-picker/**`) bans a string that cannot resolve. The same holds for
**G-DEMO-1** and **G-DEMO-3a** (`eslint.config.js:276-278`, glob `demo/@/composables/**`).

Three structural invariants, all vacuous. And both barrels *cite them as the standing guard* —
`demo/palettes/browser/dialog/index.ts:2-4` and `browser/index.ts:5-7`. The seam holds today by
convention alone, which is the failure mode the memory's own law names: invariants are enforced
structurally, never by prose. **Amended verdict on that row: PASS by convention, enforcement DEAD.**

**Cure**: retarget the globs at the live tree (`demo/**`) and ban `**/palettes/browser/**/*.vue`, or
delete the rules and stop citing them. A dead rule that is cited is worse than no rule.

---

## A-4 · MAJOR (NEW) — `browser/dialog/` groups by widget kind; the shell reaches two levels in

The first pass finds the leaf → composition-root edge (L-3). The **inverse** edge is also live and is
the same defect from the other end.

`demo/palettes/browser/dialog/` holds three components whose only shared property is that they render
a `<Dialog>`. Their domains, and their state owners, are three different places:

| file | domain owner | actual consumer |
|---|---|---|
| `VersionHistoryDrawer.vue` | `demo/palettes/useVersionHistory.ts` | `BrowsePane.vue:157` (sibling) |
| `FlagReportDialog.vue` | `demo/palettes/useAdminFlagged.ts` | `BrowsePane.vue` |
| `MigratePalettesDialog.vue` | `demo/palettes/useSlugMigration.ts` | **`demo/color-picker/App.vue:176`** |

Every one is **split across two homes**: logic at `demo/palettes/use*.ts`, view at
`browser/dialog/`. Nothing in the tree says they belong together — which is exactly the condition
that let L-1/L-2 happen.

The third row is the sharpest edge. `usePalettePorts.ts:213-216` states the ownership itself:

> *"The slug-migration handle is NOT an injected port: the migrate dialog is a **composition-root
> concern (App.vue)** that reads it directly from this return."*

The file nevertheless lives four directories deep inside the palette-**browser** feature, and boot
imports it from there:

```
demo/color-picker/App.vue:176
    import { MigratePalettesDialog } from "../palettes/browser/dialog";
```

Boot reaching into a feature's internal sub-cluster for a component the feature neither owns nor uses.
`browser/index.ts:12-16` argues for the deeper reach on tree-shake grounds — the tree-shake argument
is sound and is being used to justify a **home** that is wrong for an unrelated reason.

**Cure**: `dialog/` dissolves. `VersionHistoryDrawer` → `demo/palettes/versions/`; `FlagReportDialog`
→ `demo/palettes/flagging/`; `MigratePalettesDialog` → `demo/platform/identity/`, at boot's altitude,
beside `useSlugMigration`. Each feature becomes one directory: wire calls, state, view. No consumer
reaches past a seam, because there is nothing behind the seam it wants.

---

## A-5 · MINOR (NEW) — three stale citations that govern this component's edicts

**(a) `demo/DESIGN.md` — the styling authority for edicts 4/5/6 — points at the deleted tree in every
citation it makes about component structure:**

```
demo/DESIGN.md:384  "consume Alert / AlertTitle / AlertDescription from `@components/ui/alert` …
                     The barrel exists for ergonomics; the implementation is upstream."
demo/DESIGN.md:273  "Custom keyframes live in `demo/@/styles/animations.css` …"
demo/DESIGN.md:304  "…the two `z-[1]` survivors live in `demo/@/components/ui/` …"
```

`demo/@` does not exist and `@components` does not resolve. Line 384 is the doc that blesses the
`demo/ui/` shim the first pass condemns in L-4 — so the shim's only written justification cites a
specifier no one can write. Line 273 is the doc a future author consults to satisfy edict 6
(*animations are never deleted, only moved*), and it names a file that is gone.

**(b) The `demo/ui/` cure should target subpaths, not the root barrel.** L-4's cure says rewrite the
48 consumers to `from "@mkbabb/glass-ui"`. Sharper: 18 of the 19 barrels already re-export the **root**
barrel (only `input` uses `@mkbabb/glass-ui/forms`), while glass-ui publishes **69** subpath keys
including `./dialog` and `./button`. Rewriting to the root barrel preserves the wrong half of the
defect. Rewrite to the subpath: `@mkbabb/glass-ui/dialog`, `@mkbabb/glass-ui/button`.

*Honesty note*: I looked for a bundle cost and did not find one. glass-ui declares
`sideEffects: ["*.css"]` and its JS chunks carry no CSS side-effect imports (`grep -o 'import"[^"]*\.css"'`
→ 0 in both `glass-ui.js` and `dialog-TNRDkcE4.js`), so rollup drops the unused graph. The defect is
architectural — two names for one thing, and the narrow specifier the producer designed goes unused —
**not** payload. No number is claimed where none was measured.

**(c) The dual path is live in one file.** L-4 counts 48 shim consumers. The counter-count makes it a
dual path rather than a stale convention:

```
$ grep -rEln '"\.\.?(/\.\.)*/ui/[a-z-]+"' demo --include='*.vue' --include='*.ts' | wc -l
48        ← through the shim
$ grep -rln '@mkbabb/glass-ui' demo --include='*.vue' --include='*.ts' | grep -v '^demo/ui/' | wc -l
60        ← directly
```

`Dialog` specifically arrives both ways: via the shim in all three `browser/dialog/` files, directly
in `BrowsePane.vue`, `PalettesPane.vue`, `AdminUsersPanel.vue`, `App.vue`. `BrowsePane.vue` does both
**in one file** — `Card`/`Button` through `../ui/*` (`:206-207`), `SearchBar` through
`@mkbabb/glass-ui/search` (`:219`).

**(d) Naming.** glass-ui ships a *distinct* `Drawer` family at `@mkbabb/glass-ui/drawer`
(`Drawer`/`DrawerContent`/`DrawerHeader`/…, with `DrawerDirection`/`DrawerMode`/`DrawerStage` snap
semantics — `dist/components/drawer/index.d.ts`). This file is named `…Drawer` but is a placed
`Dialog`; its two siblings are named `…Dialog`. Two design-system concepts, one word. Per edict 4
("reuse existing component-type names") it should be `VersionHistoryPanel.vue` — or become a real
`Drawer`.

---

## A-6 · Sharpening L-10 — the drift contradicts a **CI-enforced** gate

L-10 records the `tsconfig.demo.json` `paths` drift and correctly rules the harm inert. Two facts
raise it from "stale comment" to "contradiction with an enforced contract":

**(a) CI pins the export map exactly.** `scripts/ci/verify-packed-surface.mjs:86-88` installs the
packed tarball into a clean workspace and hard-fails on any deviation:

```js
if (JSON.stringify(installedPackage.exports) !== JSON.stringify(expectedExportMap)) {
    throw new Error(`unexpected export map: ${JSON.stringify(installedPackage.exports)}`);
}
```

So `package.json#exports` is the **enforced** authority at 7 keys, while the demo program declares 8 —
three of which (`.`, `/parsing`, `/units`) that gate would reject outright. And `vite.config.ts:174-175`
forecloses the root permanently: *"The seven literal package capabilities are the complete library
graph; **there is no root or compatibility entry**."*

**(b) A third false assertion, in a place that governs demo import policy.**
`demo/shared/utils.ts:18` justifies the demo owning its own `debounce` with:

> *"the library's root-barrel export stands for external consumers."*

There is no root export. `import { debounce } from "@mkbabb/value.js"` throws
`ERR_PACKAGE_PATH_NOT_EXPORTED` for every real consumer. The conclusion (demo owns its debounce) is
right; the stated reason is false, and it is the reason a future author would rely on.

**(c) The cure is deletion, not repair.** `@mkbabb/value.js/css` has 10 live demo imports and **no
`paths` entry at all**, and `npx vue-tsc -p tsconfig.demo.json --noEmit` is a hard CI gate
(`.github/workflows/ci.yml:35`). Package self-reference through `exports` is therefore already doing
the work — proved by construction, on green CI. **Delete the `paths` block.** If one is wanted for
editor speed, generate it from `package.json#exports` with the same three lines `vite.config.ts:41-50`
already uses. One authority, generated, cannot drift.

---

## Addendum lattice delta

The first pass's lattice (§Proposed lattice) is correct and I adopt it. Four additions, each tied to
a finding above:

```
demo/palettes/
├─ versions/          api.ts · useVersionHistory.ts · VersionHistoryPanel.vue   ← A-4, A-5(d)
├─ flagging/          api.ts · useFlagReports.ts    · FlagReportDialog.vue      ← A-4
└─ browser/card/      … · PaletteSwatchRow.vue      ← A-2: the ONE swatch row
                                                      (aria-hidden + safeCss + overflow chip)
demo/platform/identity/
                      useSlugMigration.ts · MigratePalettesDialog.vue           ← A-4: boot's concern,
                                                                                  at boot's altitude
(deleted) demo/palettes/browser/dialog/                grouping by widget kind  ← A-4
(deleted) tsconfig.demo.json#paths                     exports is the authority ← A-6
glass-ui: DialogContent gains `size`; `scroll` honours side placements          ← A-1  [BH relay]
eslint:   G-DEMO-1/3a/3b retargeted at demo/** or deleted                       ← A-3
docs:     demo/DESIGN.md:273/304/384 rewritten against the post-W43 tree        ← A-5(a)
```

Every item removes code or removes a class-string. The proposal is net-negative in lines at each
step — the signal that the structure, not the component, was carrying the weight.

---

## Addendum scope note

No source edits landed from this seat. Writes confined to
`docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/`:

- this addendum (appended; the first pass preserved verbatim)
- `repro-L1-first-open.mjs` — the in-repo, re-runnable L-1 receipt

New evidence cited by this addendum, not in the first pass:
`node_modules/@mkbabb/glass-ui/dist/dialog-TNRDkcE4.js` · `dist/components/dialog/DialogContent.vue.d.ts` ·
`dist/components/drawer/index.d.ts` · `demo/palettes/browser/admin/AdminFlaggedPanel.vue` ·
`demo/palettes/browser/card/PaletteColorStrip.vue` · `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` ·
`demo/DESIGN.md` · `eslint.config.js` · `scripts/ci/verify-packed-surface.mjs` ·
`.github/workflows/ci.yml` · `demo/shared/utils.ts` · `demo/color-picker/App.vue`
