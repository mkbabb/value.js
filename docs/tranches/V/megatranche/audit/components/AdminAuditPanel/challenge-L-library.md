# CHALLENGE-L — library structure · `demo/palettes/browser/admin/AdminAuditPanel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

## Provenance

| field | value |
|---|---|
| repo | `/Users/mkbabb/Programming/value.js` |
| branch | `tranche-u` |
| HEAD at read | `e39da983` (**the brief named `c654824e`; the tree moved under me — every line reference below is against `e39da983`**) |
| subject | `demo/palettes/browser/admin/AdminAuditPanel.vue`, 120 lines |
| axis | library structure: module boundaries, ownership, dependency direction, public surface |
| live probes | 1 Playwright navigation + 1 `evaluate` against `http://localhost:9000/#/admin/audit`; 2 `tsc --traceResolution` runs |
| verdict | **DEFECTIVE** |

---

## 0. The subject's complete import set, traced to its home

`AdminAuditPanel.vue:95-104` — ten edges, every one traced:

| line | specifier | resolves to | judgement |
|---|---|---|---|
| 95 | `vue` | `node_modules/vue@3.5.35` | OK |
| 96 | `../../../ui/button` | `demo/ui/button/index.ts` → 1-line re-export of `@mkbabb/glass-ui` | **L-6** legacy barrel |
| 97 | `../../../ui/input` | `demo/ui/input/index.ts` → `@mkbabb/glass-ui/forms` | **L-6** |
| 98 | `../../../ui/badge` | `demo/ui/badge/index.ts` → `@mkbabb/glass-ui` | **L-6** |
| 99 | `@lucide/vue` | devDependency `^1.16.0` | OK (demo is unpublished) |
| 100 | `../../../shared/ui/EmptyState.vue` | `demo/shared/ui/EmptyState.vue` | raw `.vue`; `demo/shared/` has no barrel (**L-6b**) |
| 101 | `./AdminListSkeleton.vue` | sibling, cluster-internal, not barrel-exported | OK |
| 102 | `./PaginationBar.vue` | sibling, cluster-internal, not barrel-exported | OK |
| 103 | `../dateFormat` | `demo/palettes/browser/dateFormat.ts` | OK — single home, 3 consumers |
| 104 | `../../usePalettePorts` | `demo/palettes/usePalettePorts.ts` | **L-1** closes a cycle; **L-10** god-port |

**Zero value.js imports.** The subject touches no library surface at all — so the "deep import
into `src/`" charge does not land here. Positive proof in §Negative proof.

---

## Findings

### L-1 · MAJOR · The subject sits on a module cycle: the composable layer imports the component barrel

Four edges, each grepped:

```
demo/palettes/usePalettePorts.ts:9          import { useAdminUsers } from "./useAdminUsers";
demo/palettes/useAdminUsers.ts:14           import type { AdminUsersPanel } from "./browser/admin";
demo/palettes/browser/admin/index.ts:5      export { default as AdminAuditPanel } from "./AdminAuditPanel.vue";
demo/palettes/browser/admin/AdminAuditPanel.vue:104  import { ADMIN_PORT_KEY } from "../../usePalettePorts";
```

`usePalettePorts → useAdminUsers → browser/admin/index → AdminAuditPanel → usePalettePorts`.
The subject is a node on it.

The inverting edge is line 14 of `useAdminUsers.ts`: the *state/composable* layer reaches UP into
the *component* barrel to type `adminUsersPanelRef`
(`useAdminUsers.ts:27` — `ref<InstanceType<typeof AdminUsersPanel> | null>(null)`), and then calls
four imperative methods on the component instance (`:99,:121,:136,:150`). Features depend on
shared; shared must not depend on features. This is the exact inversion the repo already wrote a
law against — `G-DEMO-3a`, `eslint.config.js:290-292`: *"the shared composables layer must not
import feature internals — features depend on shared, never the reverse."* The law does not fire
(see L-2).

**Precision, in fairness:** the edge is `import type`, and `verbatimModuleSyntax: true`
(`tsconfig.base.json:8`) erases it. The **runtime** graph is acyclic. The defect is in the type
graph and in ownership direction, not in bundling.

**Reproduction:** the four grep lines above (each verified by `grep -n`).

**Cure (transposition, not patch):** delete `adminUsersPanelRef` and the four
`adminUsersPanelRef.value?.…` imperative calls. Every one of them is a *push* of a result the
composable already owns (`updatePaletteTier`, `removeUserPalette`, `clearUserPalettes`,
`onPruneDone`). Move that state into `useAdminUsers` and let `AdminUsersPanel` render it. The
component-instance ref, the barrel import, and the cycle all vanish together — and
`providePalettePorts` loses its `onPrune` bridge (`usePalettePorts.ts:126-129`), which exists only
to service the ref.

---

### L-2 · MAJOR · The boundary law that protects this component is dead code

`eslint.config.js` carries three standing demo-layering bans. Every glob and every banned pattern
addresses a tree that no longer exists:

| line | glob / pattern | status |
|---|---|---|
| 235-238 | `demo/@/components/**`, `demo/@/lib/**` | `ls demo/@` → `No such file or directory` |
| 275-276 | `demo/@/composables/**` | same |
| 247, 295 | `"@components/custom/palette-browser/**/*.vue"` | `grep -rn "@components/" demo/` → **2 hits, both prose** (`demo/DESIGN.md:384`, `demo/palettes/browser/status/index.ts:5`); 0 import specifiers |

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ grep -rn "@components/" demo/ | wc -l
2
```

W43 (RF-15) moved the demo to physical-home relative imports (`vite.config.ts` documents the move;
`tsconfig.demo.json:31-34` documents the alias kill) and the eslint boundary block was not moved
with it. So:

- **G-DEMO-3b** (reach `palette-browser` through its barrel seam, never a raw `.vue`) — unenforced.
  `demo/palettes/browser/index.ts:1-16` still advertises it as *"the `G-DEMO-3b` boundary
  (eslint.config.js) enforces it standing."* It does not.
- **G-DEMO-3a** (composables must not import feature internals) — unenforced, and **already
  breached** by L-1.
- **G-DEMO-1** (shared color layer must not import app-root boot) — unenforced.

The only surviving live rule is `inv-K-1` at `eslint.config.js:204-218` (`src/` may not import
glass-ui), whose glob `src/**/*.ts` is still correct.

**Reproduction:** the two commands above.

**Cure:** rewrite the three globs to the current tree — `demo/palettes/**`, `demo/workbenches/**`,
`demo/scenes/**`, `demo/picker/**`, `demo/shell/**` for the consumer region;
`demo/shared/**`, `demo/platform/**`, `demo/color-session/**` for the lower layer — and re-express
the barrel-seam ban as a relative pattern (`**/palettes/browser/**/*.vue`). L-1 is then a lint
error on the next run, which is the point.

---

### L-3 · MAJOR · The demo declares a *second*, hand-maintained public surface for value.js, and it has drifted

`vite.config.ts:30-49` **generates** its seven value.js self-aliases from `package.json#exports`,
with a comment stating the reason: *"GENERATED (not hand-rolled) so the alias set can never drift
from the exports map."*

`tsconfig.demo.json:40-49` does the same job **by hand**, and has drifted:

```
$ python3 (set-diff of package.json#exports vs tsconfig.demo.json paths)
exports  : ['…/color', '…/css', '…/easing', '…/math', '…/quantize', '…/transform', '…/value']
tsconfig : ['@mkbabb/value.js', '…/color', '…/easing', '…/math', '…/parsing', '…/quantize', '…/transform', '…/units']
in tsconfig NOT in exports: ['@mkbabb/value.js', '@mkbabb/value.js/parsing', '@mkbabb/value.js/units']
in exports NOT in tsconfig: ['@mkbabb/value.js/css', '@mkbabb/value.js/value']
```

Three of the tsconfig's targets do not exist on disk:

```
dist/index.d.ts                    MISSING
dist/subpaths/parsing.d.ts         MISSING
dist/subpaths/units.d.ts           MISSING
dist/subpaths/value.d.ts           EXISTS
dist/subpaths/css.d.ts             EXISTS
```

The file's own header (`tsconfig.demo.json:4-7`) claims *"the demo speaks only the 8 public keys."*
There are seven, and this block names three that are not among them. That is a false statement of
the public API sitting inside the gate that is supposed to certify it.

**The block is also unnecessary.** Self-reference through the package's own `exports` already
resolves correctly — measured:

```
$ npx tsc -p <probe extending tsconfig.demo.json> --noEmit --traceResolution | grep -A14 "value.js/css"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/ink.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID @4.0.0. ========
```

`/css` is not in `paths`; TS fell through to the real `exports` map and landed on the correct live
artifact. The five keys that *are* in `paths` resolve to the same files by a different route.

**Cure:** delete all eight `@mkbabb/value.js*` entries from `tsconfig.demo.json` `paths`. One
authority (`package.json#exports`) then governs both type-time and run-time, exactly as Vite
already does. A future subpath rename becomes a typecheck error instead of a phantom key.

**Adjacent, filed for the record:** `node_modules/@mkbabb/value.js/` is a real installed 4.0.0
tarball (distinct inodes from `dist/`; `stat` shows separate directories, not a symlink). TS never
consults it — self-reference wins the upward `package.json` walk — and Vite aliases past it. It is
inert today and byte-identical (`md5 dist/subpaths/color.d.ts` ==
`md5 node_modules/@mkbabb/value.js/dist/subpaths/color.d.ts` == `5a71fb2b2121cc96492bc561b2ce93f4`),
but it is a second copy of the library that `npm run build` does not refresh. INFO-grade; no
mechanism currently reads it.

---

### L-4 · MAJOR · Unauthenticated renders as "ledger clear" — the state machine is split across the boundary and one state is lost

`useAdminAudit.ts:49-50`:

```ts
const token = getToken();
if (!token) return;          // ← state discarded: no flag, no error, no "never fetched"
```

The composable's public surface (`UseAdminAudit`, `useAdminAudit.ts:15-33`) exposes
`loading | loadError | entries` — three states. The real machine has four:
*loading · failed · loaded-and-empty · **never attempted (no token)***. The fourth has no
representation, so the view's `v-if/v-else-if` chain (`AdminAuditPanel.vue:35, 42, 56`) falls
through to the TRUE-EMPTY plate.

Measured live, `http://localhost:9000/#/admin/audit`:

```json
{ "adminToken": null,
  "bodyText": "…Audit Log\nView admin action history.\n0 entries\n· LEDGER CLEAR ·\nNo audit entries found.…" }
```

Corroborated in all four Safari matrices of the mega-tranche visual audit — the shot
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-audit.png` shows the
dock in its logged-out state (`→] Login`) beside a plate reading **"0 entries · LEDGER CLEAR · No
audit entries found."**; `REPORT.json` records `bodyTextLength: 259` and zero page/console errors
for every matrix, i.e. the app reports perfect health while asserting a falsehood.

This defeats the very contract the two files document themselves as satisfying:
`AdminAuditPanel.vue:41-42` — *"W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
costumes as a clear ledger"*; `useAdminAudit.ts:64` — *"never costume a dead backend as an empty
ledger."* The auth early-return sits **in front of** the try/catch that implements the cure, so the
cure cannot fire. The same `if (!token) return;` appears in `useAdminFlagged.ts:62`,
`useAdminTags.ts:52` and `useAdminUsers.ts` — four panels, one hole.

**Reproduction:** clear `localStorage['palette-admin-token']`, load `#/admin/audit`. Done above.

**Cure:** the auth precondition is not the data layer's to swallow. Either
(a) lift it — `pm.session.isAdminAuthenticated` already exists (`usePalettePorts.ts:139`); the
*panel* should render an "authenticate to read the ledger" plate and never mount the fetch; or
(b) make the state total — replace the three loose refs with one discriminated
`status: "idle" | "unauthenticated" | "loading" | "error" | "ready"` on `UseAdminAudit`, and let
the template switch on it exhaustively. (b) is the KISS answer for four panels at once and makes
the missing arm a TypeScript error rather than a rendered lie.

---

### L-5 · MAJOR · Two live homes for "export a palette" — the newer lattice is wired only to a test

The brief named this suspect; it is real, and it is in this component's area.

```
$ ls demo/palettes/export.ts                       # 4184 bytes, exportAsJSON/CSS/Tailwind/SVG/PNG
$ ls demo/palettes/export/                         # 12 modules: json css tailwind svg png
                                                   #   canonical digest rfc8785 bytes reload types serializers
$ ls demo/palettes/export/index.ts                 # DOES NOT EXIST
$ grep -rn 'from "./export"' demo/
demo/palettes/usePaletteExport.ts:9:} from "./export";
```

`./export` has no directory `index.ts`, so it resolves to **`export.ts`, the file** — the older,
non-canonical implementation. That is the only path the application ever takes.

The `export/` lattice — the W51 byte-exact serializer work, with RFC-8785 canonicalisation and
digests — has exactly one consumer in the entire tree:

```
$ grep -rn "export/serializers|export/json|export/png|…" demo/ test/ e2e/ src/ | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

Zero application consumers. Two implementations of one concept; the good one is dead weight the
test suite keeps green, and a resolution accident (file-beats-directory) decides which one ships.

**Scope note:** not on `AdminAuditPanel`'s import graph — this is an *area* finding for
`demo/palettes/`, filed because the brief named it and because it is the sharpest ownership
duplication in the area.

**Cure:** delete `demo/palettes/export.ts`. Give `demo/palettes/export/` an `index.ts` that
re-exports `serializers.ts` named-only (matching the `browser/index.ts` PI-6 discipline), and point
`usePaletteExport.ts` at it. One home, and the byte-exact guarantees reach production.

---

### L-6 · MINOR · `demo/ui/` is a 19-directory alias layer with no implementation left in it

Nineteen directories, nineteen files; **eighteen are a single line**:

```
$ for d in demo/ui/*/; do … done
alert :: lines=11   (10 of them a comment explaining it used to hold code)
avatar badge button card checkbox collapsible dialog dropdown-menu input label
popover radio-group select separator skeleton slider switch tooltip :: lines=1 each

$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
$ cat demo/ui/input/index.ts
export { Input } from "@mkbabb/glass-ui/forms";
```

The demo now uses **two** idioms for one design system:

```
$ grep -rn 'from "(\.\./)*ui/' demo/ | wc -l        # 90  via the barrel
$ grep -rn 'from "@mkbabb/glass-ui'  demo/ | wc -l  # 119 direct
```

`EmptyState.vue:130` imports `WatercolorDot` direct from `@mkbabb/glass-ui/watercolor-dot`; nine
files import `useGlobalDark` direct from `@mkbabb/glass-ui/dark`; `AdminPane.vue:84` imports
`SearchBar` direct from `@mkbabb/glass-ui/search` — while importing `Card` and `Badge` through the
barrel two lines earlier. The split is not by kind or by policy; it is by which shadcn component
name happened to exist in 2026-02.

`demo/ui/alert/index.ts:1-9` is a signed confession: *"This barrel previously held a local
shadcn-vue re-implementation … B.W2 converted it to a re-export … The two consumers import from
this barrel unchanged."* Keeping the import path stable for existing consumers is precisely the
back-compat alias standing law forbids (owner edict 2), and 19 directories to save 19 renames is
the contrivance edict 3 forbids.

**L-6b:** conversely `demo/shared/` — the true shared-primitive home, with `EmptyState` at 8
consumers and `PaneHeader` — has **no barrel at all**, so all 8 reach a raw `.vue`. The repo
mandates barrels where the implementation is gone and forbids them where it lives.

**Cure:** delete `demo/ui/` (19 files, ~21 lines) and rewrite the 90 import sites to
`@mkbabb/glass-ui[/subpath]` — a mechanical codemod, one specifier per line. Add
`demo/shared/ui/index.ts` with two named re-exports. Result: one idiom, one direction, minus 19
directories.

---

### L-7 · MINOR · The admin row grammar exists three times; the subject hand-rolls it and drops the cure

```
$ grep -rn "px-3 py-2.5 rounded-md border border-card-edge" demo/
AdminListItem.vue:11      flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0
AdminListSkeleton.vue:9   skeleton-ink-register flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge
AdminAuditPanel.vue:62    flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge transition-colors duration-fast hover:bg-accent/50
```

`AdminListItem.vue` is the declared atom (`swatch` / `content` / `actions` slots). Of the five
admin panels, exactly **one** composes it (`AdminNamesPanel.vue:44,:94`); the other four — including
the subject — re-type the utility string.

The subject's copy is missing **`min-w-0`**, which is not decoration: `AdminListItem.vue:6-10`
records it as the S.W5-12 / F-1 cure — *"the row is a grid item, and its min-width:auto automatic
minimum resolves to the flex row's min-content …, blowing the track to ~850px at 390."* The
subject's rows are grid items of the same `grid gap-3` container (`AdminAuditPanel.vue:2`) and do
not carry it.

Second-order: the loading shadow and the real row disagree. `AdminListSkeleton.vue:14,19` promises a
leading `w-8 h-8` circular swatch and a trailing `h-7 w-14` action lozenge; the audit row
(`:62-79`) has neither — no swatch, no action. Three skeletons resolve into three rows of a
different shape.

**Evidence:** the class diff above (hard). **The 390 px overflow consequence is a labelled
HYPOTHESIS** — the live ledger is empty (measured: `0 entries`), so no long-`action` row exists to
exercise it, and `REPORT.json` records `overflowX: 0` for `/#/admin/audit` on both mobile matrices
*with zero rows rendered*. The visual audit has never seen this row with data.

**Cure:** compose `AdminListItem` (`<template #content>` two lines, no `#swatch`, no `#actions`),
and give the skeleton an `actions`/`swatch` boolean so the shadow matches the row it shadows. The
utility string then has one home.

---

### L-8 · MINOR · An unnamed size rung, defined at 13 call sites

```
$ grep -rn "h-7 px-2" demo/ | wc -l
13
```

All 13 are inside `demo/palettes/browser/admin/` — `AdminAuditPanel.vue:30` among them:

```html
<Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh audit log" …>
```

`size="sm"` is a glass-ui rung; `h-7 px-2` immediately overrides it. Measured live, the rendered
control is **28 × 36 px** — the height came from glass-ui, the width from the override; the two are
fighting. Separately, a hand-rolled destructive-ghost recipe
(`text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10`)
is re-typed at **7** call sites — `grep -rn "hover:text-destructive" demo/ | wc -l` → 7:
`AdminTagsPanel.vue:103`, `AdminUsersPanel.vue:125`, `AdminFlaggedPanel.vue:96`,
`AdminNamesPanel.vue:64`, `AdminNamesPanel.vue:109`, `PalettesPane.vue:67`,
`GradientStopEditor.vue:28`.

This is edict 5 (style at the root, never per-instance) and edict 4 (variants belong in glass-ui)
in one line. There is a real design-system ask here — a `size="xs"` icon rung and a `variant="ghost-destructive"`
— and under the standing BH/BI relay law it must go to glass-ui, not into `demo/ui/`.

**Checked and clean:** glass-ui 7.0.0's export map (69 subpaths, read from
`node_modules/@mkbabb/glass-ui/package.json`) contains **no** `pagination` and **no** `empty`
subpath, and `grep "declare const (Pagination|Empty)"` over its dist returns nothing. So
`PaginationBar.vue` and `EmptyState.vue` living in the demo is correct today — they are relay
candidates, not violations.

---

### L-9 · MINOR · The filter policy lives in the view, over refs the composable owns

`AdminAuditPanel.vue:109-118`:

```ts
let filterTimeout: ReturnType<typeof setTimeout>;
watch([audit.actionFilter, audit.targetFilter], () => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => { audit.page.value = 1; audit.loadAuditLog(); }, 300);
});
```

`actionFilter`, `targetFilter`, `page` and `loadAuditLog` are all owned by `useAdminAudit`
(`useAdminAudit.ts:41-42, 38, 48`) and are *already folded into the request* there
(`:56-57`). The rule that binds them — debounce 300 ms, reset to page 1, refetch — is the
composable's invariant, parked in a view. A second consumer of `pm.audit` reimplements it or
silently gets un-debounced, page-preserving behaviour.

Two consequences:
- `@vueuse/core@^14.3.0` is a declared dependency used in six demo files
  (`useStorage`, `useMediaQuery`, `useEventListener`, `useMagicKeys`) and ships `watchDebounced`.
  A raw `setTimeout` here is a hand-rolled version of an installed primitive.
- The timer has no `onUnmounted(() => clearTimeout(filterTimeout))`. `AdminPane.vue:61` mounts this
  panel under `v-if`, so switching sub-view within 300 ms of a keystroke leaves a live timer that
  will mutate app-root port state (`audit.page.value = 1`) for an unmounted panel. **HYPOTHESIS on
  the observable network call** (unauthenticated, `loadAuditLog` early-returns at
  `useAdminAudit.ts:50`, so nothing is sent); the missing teardown is fact.

**Cure:** move the debounce into `useAdminAudit` as `watchDebounced([actionFilter, targetFilter],
…, { debounce: 300 })` inside the composable, and delete lines 109-118. The view then contains no
policy at all.

---

### L-10 · MINOR · A 34-member port injected to read one member

```
$ (parse usePalettePorts.ts adminPort literal)
34
['adminUsers', 'adminUsersPanelRef', 'filteredAdminUsers', 'loadAdminUsers', … 'audit', 'flagged', 'tags']
```

`AdminAuditPanel.vue:107-108` injects the whole thing and uses `pm.audit`. Its declared type is
`AdminPort = ReturnType<typeof providePalettePorts>["admin"]`
(`usePalettePorts.ts:255-259`) — which forces TypeScript to instantiate the return type of the
*entire* five-port composition root to describe a component that reads one 15-member object.

`usePalettePorts.ts:23-31` calls itself the dissolution of the `usePaletteManager` god facade into
"FIVE narrow, feature-owned ports." Port 4 is a console-wide aggregate of three unrelated
sub-domains (users · colour-name queue · audit/flagged/tags) plus `searchQuery`, `expandedId` and a
component ref. It is narrower than one god object and wider than a boundary.

Worse, the parent uses **two wiring idioms at once**: `AdminPane.vue:20-60` passes 8 and 12 props
respectively into `AdminUsersPanel` and `AdminNamesPanel`, while `:61, :64, :67` mount
`AdminAuditPanel`, `AdminFlaggedPanel`, `AdminTagsPanel` bare and lets each reach through
`inject(ADMIN_PORT_KEY)!` for itself. Same parent, same row of the template, opposite contracts.

`inject(ADMIN_PORT_KEY)!` (`:107`) also discards the failure: mounted outside the provider it is a
bare `TypeError` on property access with no diagnostic. Consistent with the rest of the tree, so
graded INFO within this finding, not separately.

**Cure:** split port 4. `AUDIT_PORT_KEY: InjectionKey<UseAdminAudit>`,
`FLAGGED_PORT_KEY`, `TAGS_PORT_KEY`, `ADMIN_USERS_PORT_KEY`, `COLOR_QUEUE_PORT_KEY` — five keys the
composition root already builds as five separate objects (`usePalettePorts.ts:68-76`). Each panel
injects its own and nothing else; the type instantiation collapses to the sub-composable's own
interface. Then either all five panels inject or all five take props — pick one.

---

### L-11 · INFO · Doc drift: laws cited by name that no longer exist

- `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76` — *"one of three parallel
  dark stores"*. **Cured, not updated.** All nine consumers now use one store:
  `grep -rn "useGlobalDark" demo/` returns 9 imports, every one `from "@mkbabb/glass-ui/dark"`
  (`App.vue:190`, `useAtmosphere.ts:34`, `useViewAccents.ts:43`, `useContrastSafeColor.ts:9`,
  `useMarkdownColors.ts:1`, `ConsoleRail.vue:92`, `HeroBlob.vue:39`, `ProfileSection.vue:8`,
  `MobileMenuDropdown.vue:6`). The named suspect is dead; the comment that names it is not.
- `demo/DESIGN.md:384` and `demo/palettes/browser/status/index.ts:5` cite the retired
  `@components/…` alias.
- `demo/palettes/browser/index.ts:7` asserts eslint enforcement that does not run (L-2).

### L-12 · INFO · Two `admin` homes in one area

`demo/palettes/admin/AdminPane.vue` (one file, the host) and `demo/palettes/browser/admin/`
(the five panels, `AdminListItem`, `AdminListSkeleton`, `PaginationBar`, `index.ts`). The pane sits
outside the cluster it composes and reaches back in via `../browser/admin` (`AdminPane.vue:78-84`).
Nothing about the audit panel is "browser"; the panels are console, not browse.

---

## The lattice I would build greenfield

Concretely, for this area:

```
demo/palettes/
  model/            types.ts  constants.ts                     ← no Vue
  api/              (unchanged — 8 endpoint modules, already right)
  export/           index.ts + the 12 byte-exact serializers    ← ONE home (L-5)
  state/
    usePaginatedResource.ts   ← page/pageSize/total/pageCount/hasNext/hasPrev/next/prev
                                 + status: "idle"|"unauthenticated"|"loading"|"error"|"ready"
    useAdminAudit.ts          ← usePaginatedResource(getAuditLog) + actionFilter/targetFilter
    useAdminFlagged.ts        ← usePaginatedResource(getFlaggedPalettes) + dismiss/delete
    useAdminTags.ts  useAdminUsers.ts  useColorNameQueue.ts
  console/          AdminPane.vue  AuditPanel.vue  FlaggedPanel.vue  TagsPanel.vue
                    UsersPanel.vue  NamesPanel.vue
                    parts/ ListRow.vue  ListRowSkeleton.vue  Pagination.vue
                    index.ts
  browse/           (card / dialog / search / slug / status — unchanged)
  ports.ts          five narrow InjectionKeys, one per sub-domain
```

Four moves carry it, and each one kills a finding:

1. **`usePaginatedResource`** — `useAdminAudit.ts:36-46,73-86` and `useAdminFlagged.ts:49-58,105-118`
   are the same 22 lines twice (`grep -c` confirms two identical `pageCount` computeds, two
   `nextPage`, two `prevPage`, two `Math.max(1, Math.ceil(total/pageSize))`). The repo already has
   the precedent — `useFilteredList.ts` is 12 lines extracted for exactly this reason. Put the
   total `status` union in it and **L-4 becomes unrepresentable**: there is no way to render rows
   without naming which of the five states you are in.
2. **`console/` as one directory** — the pane joins its panels (L-12), `ListRow` becomes the single
   row grammar (L-7), `Pagination` moves out of `admin/` since it is not admin (it is used twice,
   both admin, but it is a generic control that will be wanted in browse).
3. **`ports.ts`, five keys** — L-10 dissolves; L-1's cycle cannot re-form because `state/` sits
   below `console/` in the directory order and the lint rule (rewritten per L-2) can express that
   as one glob pair.
4. **Delete `demo/ui/`** (L-6) and **delete the `paths` block** (L-3). Two deletions, minus 19
   directories and 8 config lines, and both surfaces get exactly one authority: glass-ui's export
   map and value.js's export map respectively.

Note what is *not* in the lattice: no new `shared/` directory, no wrapper components, no compat
re-exports. Every move is a rename, a merge, or a deletion.

---

## Negative proof — what I checked and found sound

| claim | evidence |
|---|---|
| The subject does not deep-import `src/` | `grep -rn "@src/" demo/ \| grep -v .md` → **0**; `grep -rn "\.\./\.\./src/\|from \"src/" demo/` → **0** |
| Every demo value.js specifier is a real published subpath | `grep -rhno "@mkbabb/value\.js[a-z/]*" demo/` → `/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4. All five are in `package.json#exports`. **Zero bare-root, zero deep, zero dead subpath.** A real consumer could write every one of them. |
| Sibling packages also consume only published subpaths | glass-ui dist: `/color` ×7, `/css` ×4, `/easing` ×2. keyframes.js dist: `/css` ×28, `/color` ×5, `/easing` ×4, `/value` ×3, `/math` ×2, `/transform` ×1. The two apparent bare hits in keyframes are JSDoc prose (`keyframes.d.ts:809, :2149`), not imports. No package imports a `.` root key that value.js does not publish. |
| No raw `.vue` reach into `browser/admin/` from outside | `grep -rn "browser/admin/[A-Za-z]*\.vue" demo/` → **0**. Every external consumer goes through `browser/admin/index.ts` or `browser/index.ts`. The seam is honoured *de facto* even though L-2 means nothing enforces it. |
| `formatTime` has exactly one home | `grep -rn "toLocaleString\|toLocaleDateString\|Intl.DateTimeFormat" demo/ src/` → 2 hits, both in `demo/palettes/browser/dateFormat.ts`. Three consumers, no duplicate. |
| The three-parallel-`useDark` suspect is dead | 9 consumers, all `useGlobalDark` from `@mkbabb/glass-ui/dark` (L-11). |
| `verbatimModuleSyntax` satisfied in the subject | All three of `inject`, `onMounted`, `watch` (`:95`) are value imports; the subject has no type-only import to mis-declare. `useAdminAudit.ts:11` correctly uses `type AuditLogOptions` inline and `import type { AuditEntry }`. |
| The subject's controls are **not** the route's tap-target defects | Measured live: filter inputs **128×36** and **109×36**, refresh button **28×36**. The four `smallTapTargets` `REPORT.json` records for `/#/admin/audit` are `input 160×23 placeholder="enter slug or token…"` and three 22×22 buttons labelled *Switch to slug / Generate new slug / Cancel* — all `PaletteSlugBar`. This component is clean on that axis in all four matrices. |
| No console or page errors attributable to the subject | `REPORT.json` `/#/admin/audit`: `consoleErrors: []`, `pageErrors: []`, `failedRequests: []`, `overflowX: 0` in all four matrices. The 3 Chrome-side errors on my probe are the `dev:web-only` VITE_API_URL misconfiguration and two Vite dep-optimiser 404s — server state, not component. |

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| L-1 | MAJOR | composable→component-barrel edge closes a cycle through the subject |
| L-2 | MAJOR | all three demo boundary lint rules glob a tree deleted at W43 |
| L-3 | MAJOR | `tsconfig.demo.json` `paths` is a drifted second copy of the exports map: 3 phantom keys, 3 dangling targets, 2 real subpaths missing |
| L-4 | MAJOR | unauthenticated renders "· ledger clear ·"; the lost state defeats the F-2 cure |
| L-5 | MAJOR | `export.ts` vs `export/` — two homes, the good one wired only to a test |
| L-6 | MINOR | `demo/ui/` — 19 dirs of pure alias; two idioms for one design system |
| L-7 | MINOR | row grammar ×3; the subject hand-rolls it and drops `min-w-0` |
| L-8 | MINOR | 13 per-instance `h-7 px-2` overrides of the glass-ui `sm` rung |
| L-9 | MINOR | debounce/page-reset policy in the view, over composable-owned refs; no unmount teardown |
| L-10 | MINOR | 34-member port injected for 1 member; two wiring idioms in one parent |
| L-11 | INFO | comments cite cured/deleted laws |
| L-12 | INFO | two `admin` homes |

**Strongest:** L-4 — it is measured, live, visible in all four capture matrices, and it is a
*library-structure* defect wearing a UX costume: the audit ledger asserts "clear" because a state
was dropped at a module boundary the panel cannot see across. L-1 and L-3 are the purest structural
faults and both are one deletion away from cured.
