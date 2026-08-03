# CHALLENGE-L — library structure under `AdminFlaggedPanel.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. No inheritance, no
undeclared seat.

---

## Subject and scope

- Component: `/Users/mkbabb/Programming/value.js/demo/palettes/browser/admin/AdminFlaggedPanel.vue` (153 lines)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: **library structure** — module boundaries, ownership, direction of dependency, public surface.

**Verdict: DEFECTIVE.** Nine structural defects, one of them a shipping BLOCKER visible in the
existing Safari capture. The component itself is well-behaved prose; almost every defect is in the
lattice underneath it, which is exactly the seat's premise.

---

## The import graph, traced

`AdminFlaggedPanel.vue:137-150`:

| # | Specifier | Resolves to | Boundary verdict |
|---|---|---|---|
| 1 | `vue` | peer | OK |
| 2 | `../../../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` | **L-2** — alias shim onto the root barrel; `@mkbabb/glass-ui/button` exists |
| 3 | `../../../ui/badge` | `demo/ui/badge/index.ts` → root barrel | **L-2** — same; `@mkbabb/glass-ui/badge` exists |
| 4 | `@lucide/vue` | devDependency `^1.16.0` | OK |
| 5 | `../../../shared/ui/EmptyState.vue` | raw `.vue`, 3 levels up, across a feature boundary, no barrel | **L-3** — the exact edge the dead lint rule bans |
| 6 | `./AdminListSkeleton.vue` | sibling | OK (but see **L-7**) |
| 7 | `./PaginationBar.vue` | sibling | OK (but see **L-7**) |
| 8 | `../dateFormat` | `demo/palettes/browser/dateFormat.ts` | OK |
| 9 | `../../usePalettePorts` | 275-line port factory | **L-4** — 34-member port injected to consume 1 member |

`@mkbabb/value.js`: **not imported, correctly.** The panel renders opaque `css` strings.

---

## Findings

### L-1 · BLOCKER — authorization has two homes and neither owns the unauthenticated render state

The `admin` concept is declared in the router and re-implemented, scattered, in the composables.
Neither declaration is the owner, and the gap between them ships a false clean moderation queue.

**Declaration 1 — dead.** `demo/color-picker/router/index.ts:31-35` puts `meta: { admin: true }` on
all five admin routes. It has **zero readers**:

```
$ grep -rn "\.meta\b\|meta:" demo/ --include="*.ts" --include="*.vue"
demo/shell/dock/DockStatusLamp.vue:31:const isDev = import.meta.env.DEV;
demo/platform/transport/client.ts:37:export const BASE_URL = import.meta.env.VITE_API_URL ?? …
demo/color-picker/router/index.ts:31:  { path: "/admin/users",   …, meta: { admin: true } }
demo/color-picker/router/index.ts:32:  { path: "/admin/names",   …, meta: { admin: true } }
demo/color-picker/router/index.ts:33:  { path: "/admin/audit",   …, meta: { admin: true } }
demo/color-picker/router/index.ts:34:  { path: "/admin/flagged", …, meta: { admin: true } }
demo/color-picker/router/index.ts:35:  { path: "/admin/tags",    …, meta: { admin: true } }

$ grep -rn "meta.admin\|beforeEach" demo/ --include="*.ts" --include="*.vue"
(no matches)
```

Five authority declarations; no navigation guard; `installDocumentTitle(router)` is the router's
only guard registration (`router/index.ts:47`).

**Declaration 2 — scattered, 21 copies.**

```
$ grep -rn "if (!token) return" demo/ --include="*.ts" | wc -l
21
```
across `useAdminUsers.ts` (10), `useColorNameQueue.ts` (5), `useAdminFlagged.ts` (3),
`useAdminTags.ts` (2), `useAdminAudit.ts` (1).

**The consequence.** `useAdminFlagged.ts:59-63`:

```ts
async function loadFlagged() {
    const token = getToken();
    if (!token) return;          // ← returns BEFORE loading=true, BEFORE any fetch
    loading.value = true;
```

With no token: `loading` stays `false`, `loadError` stays `null`, `items` stays `[]`. The panel's
`v-else-if` chain (`AdminFlaggedPanel.vue:17,24,38`) therefore falls through to branch 3 — the
**true-empty specimen plate**:

```html
<EmptyState eyebrow="· nothing flagged ·" message="No flagged palettes." />
```

The component's own comment at line 22-23 states the invariant this violates:

> `W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never costumes as a clear moderation queue.`

The panel implements F-2 faithfully. The composable one layer below defeats it, because a **fourth
state — unauthorized — has no owner anywhere in the lattice.** The panel models three
(loading / error / empty); the composable models three; the route declares `admin` and is ignored.

**Reproduction — already captured, no new probe needed.**
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-flagged.png` (also
`safari-desktop-dark`, `safari-mobile-light`, `safari-mobile-dark`). Read it: the dock reads
**"Login"** (unauthenticated) and the left pane reads **"0 flagged"** / **"· NOTHING FLAGGED ·"** /
**"No flagged palettes."** The capture harness sets only the colour scheme —
`docs/tranches/V/megatranche/audit/visual/capture.mjs:71` is its single `localStorage.setItem`, and
it is `vueuse-color-scheme`. No admin token was seeded. That screenshot **is** the defect.

Confirming the inverse: with a token present, the error path works. Live probe at
`http://localhost:9000/#/admin/flagged` with `localStorage['palette-admin-token']` set —
`/unreachable/.test(document.body.innerText) === true`, `/nothing flagged/ === false`. So the two
states are distinguishable and the code chooses the wrong one only when unauthenticated.

Cure (transposition, not patch): **one owner for `admin`.** A `router.beforeEach` that reads
`meta.admin` against `useAdminAuth().isAuthenticated` and redirects, so the panel is never mounted
unauthorized. Then delete all 21 `if (!token) return` early returns and let the admin composables
assume a token — the guard is their precondition. If an unauthorized *render* is ever wanted, it
becomes a fourth explicit `EmptyState variant="unauthorized"` branch, not a silent fallthrough.

---

### L-2 · MAJOR — `demo/ui/` is a 19-directory alias layer that owns nothing

18 of 19 barrels under `demo/ui/` are a **single line** re-exporting the glass-ui **root**:

```
demo/ui/button/index.ts   → export { Button } from "@mkbabb/glass-ui";
demo/ui/badge/index.ts    → export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
demo/ui/card/index.ts     → export { Card, CardHeader, … } from "@mkbabb/glass-ui";
… 15 more, each one line
demo/ui/alert/index.ts    → 8 lines of comment + one re-export
```

This is a pure back-compat alias for the retired shadcn import path — **owner edict 2** (no aliases,
no migration shims, no dual paths) and **edict 4** (glass-ui *is* the design system; the demo should
name it). glass-ui 7.0.0 publishes a **fine-grained subpath for every one of them** — verified in
`node_modules/@mkbabb/glass-ui/package.json#exports`: `./button`, `./badge`, `./card`, `./skeleton`,
`./dialog`, `./select`, `./slider`, `./switch`, `./popover`, `./separator`, `./label`, `./tooltip`,
`./collapsible`, `./dropdown-menu` — 70+ entries.

**The dual path is live, not theoretical.** Measured across `demo/`:

| reach | sites |
|---|---:|
| `demo/ui/*` shim (button/badge/card alone) | 41 |
| bare `@mkbabb/glass-ui` root | 37 |
| `@mkbabb/glass-ui/<subpath>` | 82 |

Same primitive, two spellings, same repo: `Dialog` comes from `demo/ui/dialog` (root barrel) at some
call sites and from `@mkbabb/glass-ui/dialog` at 2 others; `Input` from `demo/ui/input` which itself
forwards to `@mkbabb/glass-ui/forms`; `Tabs` only ever via subpath (3 sites, no shim). Even the
sibling `AdminPane.vue:87` mixes both in one `<script setup>`: `SearchBar` from
`@mkbabb/glass-ui/search` two lines below `Card`/`Badge` from `../../ui/*`.

**Cost, measured honestly.** Live dev server, `performance.getEntriesByType('resource')` on
`localhost:9000`:

| module | bytes |
|---|---:|
| `@mkbabb_glass-ui.js` (root barrel) | **234,309** |
| `@mkbabb_glass-ui_aurora.js` | 202,667 |
| `@mkbabb_glass-ui_dock.js` | 45,241 |
| `@mkbabb_glass-ui_watercolor-dot.js` | 5,128 |

The root barrel's static fan-out in the published dist is **43 distinct chunks / 168,303 bytes**
(`grep -oE 'from *"\./[^"]+"' glass-ui.js | sort -u | wc -l` → 43); `button.js` is **71 bytes and 1
chunk**, `badge.js` **92 bytes and 1 chunk**.

Honesty clause: glass-ui declares `"sideEffects": ["*.css"]` and **no dist JS chunk imports a
`.css`** (`grep -c '\.css"' dist/glass-ui.js` → 0), so Rollup *can* tree-shake the root barrel in the
production build. **This is therefore a structural defect (wrong surface, dual path, an alias layer
that owns nothing), and a measured 234 KB dev-server cost — not a proven production byte
regression.** Labelled as such.

Cure: **delete `demo/ui/` entirely.** Rewrite the 41 import sites to name the glass-ui subpath they
actually want. The shim layer holds zero logic, zero variants, zero tokens; every directory in it is
a redirect. Nothing is lost and one whole layer of the lattice disappears.

---

### L-3 · MAJOR — the three "standing" boundary lint rules are dead; the seam they guard is prose

`demo/palettes/browser/index.ts:8-9` claims:

> External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a raw
> internal `.vue` file — **the G-DEMO-3b boundary (eslint.config.js) enforces it standing.**

It does not. `eslint.config.js:234-241` scopes G-DEMO-3b to:

```js
files: [
    "demo/color-picker/**/*.ts",  "demo/color-picker/**/*.vue",
    "demo/@/components/**/*.ts",  "demo/@/components/**/*.vue",
    "demo/@/lib/**/*.ts",         "demo/@/lib/**/*.vue",
],
```

```
$ ls demo/@
ls: demo/@: No such file or directory
```

`demo/@` was deleted by W43/RF-15 — `vite.config.ts:68-70` says so in its own words: *"W43 (RF-15)
killed the demo `@…` path aliases: every demo import is now relative to its physical home."* The
same wave also moved the feature from `@components/custom/palette-browser/` to
`demo/palettes/browser/`.

So the **banned pattern** (`"@components/custom/palette-browser/**/*.vue"`,
`eslint.config.js:249,297`) names a specifier form that can no longer resolve, and the **file globs**
(`demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**`) match zero files. All three rules
— G-DEMO-1, G-DEMO-3a, G-DEMO-3b — are inert. The lattice's only structural enforcement is a
no-op that its own barrel headers cite as live law.

**And the class it bans is present in the subject.** `AdminFlaggedPanel.vue:142`:

```ts
import EmptyState from "../../../shared/ui/EmptyState.vue";
```

A raw `.vue`, three levels up, into a *different* area (`demo/shared/`), which has **no `index.ts`**
(`demo/shared/ui/` contains exactly `EmptyState.vue` and `PaneHeader.vue`). Eight sites do this:
`MixSourceSelector.vue:9`, `BrowsePane.vue:189`, `PaletteCardGrid.vue:36`, and all five admin panels.

`demo/shared/` also *is* the "new shared/ dir" that **edict 3** forbids, holding two components that
are both design-system concepts (an empty-state plate and a pane header) — **edict 4** puts them in
glass-ui, not in a demo `shared/`.

Cure: retarget the three rules onto the current tree (`demo/palettes/**`, `demo/workbenches/**`,
`demo/scenes/**` × the relative raw-`.vue` group), **or** delete the rules and stop citing them. A
dead invariant that documentation swears is live is worse than no invariant. Then relocate
`EmptyState` and `PaneHeader` into glass-ui (`@mkbabb/glass-ui/empty-state`, `/pane-header`) and
delete `demo/shared/ui/`.

---

### L-4 · MAJOR — the "god facade dissolution" produced two larger god objects and a dual injection path

`usePalettePorts.ts:22-31` describes itself:

> the RF-15 §b 6 dissolution of the old `usePaletteManager` god facade (**153 L**, ONE
> cross-everything injected blob) into **FIVE narrow, feature-owned ports** … **no consumer injects a
> member outside the port it named.**

Measured:

```
$ wc -l demo/palettes/usePalettePorts.ts
275
```

| port | members |
|---|---:|
| `sessionPort` | 7 |
| `libraryPort` | 15 |
| **`browsePort`** | **32** |
| **`adminPort`** | **34** |
| `colorTargetPort` | 5 |

The replacement is **275 lines** where the god module was 153, and two of the five "narrow" ports
carry 32 and 34 members. `AdminFlaggedPanel.vue:149-150` injects the 34-member `adminPort` and
consumes **one**: `flagged`. The other 33 (`adminUsers`, `adminColorQueue`, `onApproveColor`,
`onPrune`, `adminUsersPanelRef`, …) are pure over-dependency — a type-level coupling to the whole
admin console for a moderation list.

**The header's own invariant is falsified.** Cross-port member overlap, measured by parsing the five
literals:

```
OVERLAP sessionPort ∩ browsePort = [ensureSession, ensureUser, isAdminAuthenticated, userSlug]
OVERLAP libraryPort ∩ browsePort = [expandedId, onEditColor, searchQuery, toggleExpand]
OVERLAP libraryPort ∩ adminPort  = [expandedId, searchQuery, toggleExpand]
OVERLAP browsePort  ∩ adminPort  = [expandedId, flagged, onFeaturePalette, searchQuery, toggleExpand]
```

`flagged` is on **two** ports, and both reaches are live:

- `AdminFlaggedPanel.vue:149-150` — `inject(ADMIN_PORT_KEY).flagged`
- `BrowsePane.vue:202,298` — `inject(BROWSE_PORT_KEY)` … `await pm.flagged.report(…)`

One concept, two injection keys, same singleton instance. That is a **dual path** (edict 2) inside
the very refactor that claimed to abolish dual paths, and it is the god module reconstituted under
five names — five overlapping views onto one blob is not a partition.

Cure: ports must be a **partition**, not a covering. Members that genuinely straddle
(`searchQuery`, `expandedId`, `toggleExpand`, `isAdminAuthenticated`, `userSlug`) belong in their own
narrow port (`UI_STATE_PORT`, `SESSION_PORT`) injected *alongside*, never copied into siblings. And
`flagged` should not be on `browsePort` at all — see L-5.

---

### L-5 · MAJOR — `useAdminFlagged` owns two concepts with two audiences

`useAdminFlagged.ts:1-11` admits it in its own docstring:

> Wraps `getFlaggedPalettes`, `dismissFlags`, `deletePaletteAdmin` … **and the user-facing
> `flagPalette` report endpoint.** … Migration source: `AdminFlaggedPanel.vue` (admin) **+**
> `PaletteDialog/composables/useDialogModalStack.ts` (the user-facing `flagPalette` report).

Two migration sources folded into one module. `useAdminFlagged.ts:120-122`:

```ts
/** User-facing flag/report — no admin token required. */
async function report(paletteSlug: string, reason: string, detail?: string) {
```

So a **module named `useAdmin*`, whose every other method begins `getToken(); if (!token) return`,
also owns the one unauthenticated write path in the area** — and it is a single shared instance
(constructed once at `usePalettePorts.ts:75`). The admin panel's `items` / `page` / `loading` /
`loadError` live in the same object a browsing visitor's flag dialog reaches through `browsePort`.
Unique semantic ownership — exactly one home per concept — fails twice here: the module has two
owners, and the report concept has no home of its own.

Cure: split. `useFlagReport()` (unauthenticated, one method, owned by the browse feature) and
`useFlaggedQueue()` (token-gated moderation, owned by admin). Then `flagged` leaves `browsePort`
and L-4's dual injection path dies with it.

---

### L-6 · MAJOR — offset pagination is reimplemented per-composable

`useAdminFlagged.ts:49-57, 105-118` and `useAdminAudit.ts:36-46, 73-88` carry byte-identical
arithmetic:

```ts
const page = ref(1);
const pageSize = 20;
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize)));
const hasNext  = computed(() => page.value < pageCount.value);
const hasPrev  = computed(() => page.value > 1);
function nextPage() { if (hasNext.value) { page.value++; load…(); } }
function prevPage() { if (hasPrev.value) { page.value--; load…(); } }
```

A `diff` of the two regions differs only in the ref names and the fetch call. Both then re-declare
the same seven members in their `UseAdmin*` interface and re-list them in their return object.

The wire shape is **already generic** — `demo/palettes/types.ts` ships
`PaginatedResponse<T> { data: T[]; total: number; limit: number; offset: number }`. And the
extraction idiom is **already established in this exact directory**: `useFilteredList.ts` is a
13-line generic over `Ref<T[]>`. So the lattice knows how to do this and did not.

Cure: one `useOffsetPagination<T>(fetcher: (limit, offset) => Promise<PaginatedResponse<T>>)`
returning `{ items, total, page, pageCount, hasNext, hasPrev, loading, loadError, load, next, prev }`.
`useAdminFlagged` and `useAdminAudit` each shrink to their genuinely distinct part: the endpoint and
the mutations. Roughly 60 duplicated lines die.

---

### L-7 · MINOR — `PaginationBar` and `AdminListSkeleton` are in the wrong home and outside the seam

Both live under `demo/palettes/browser/admin/`. Neither contains a single admin-specific concept:

- `PaginationBar.vue` — `page` / `pageCount` / `hasNext` / `hasPrev` props, prev/next emits. Generic.
- `AdminListSkeleton.vue` — a swatch + two lines + a lozenge. Generic list-row shadow.

Neither is exported from `demo/palettes/browser/admin/index.ts`, which exports exactly the five
panels. So a consumer outside `admin/` that needs a paginator has two options: raw-reach the `.vue`
(the edge L-3's dead rule bans) or copy it. That is how duplication is manufactured.

Per **edict 4**, a paginator is a design-system control — glass-ui already ships `./pager-dots`, the
dotted cousin of exactly this. `PaginationBar` belongs in glass-ui beside it (reusing the existing
component-type name, e.g. a `Pagination` primitive), not in a demo feature's admin folder.

---

### L-8 · MINOR — four parallel implementations of "render palette colours"

| site | shape |
|---|---|
| `browser/card/PaletteColorStrip.vue` | the named, seam-exported concept (`browser/index.ts:24`) — weighted proportional strip |
| `AdminFlaggedPanel.vue:52-59` | hand-rolled overlapping stack, `-space-x-1`, cap `.slice(0, 5)` |
| `dialog/VersionHistoryDrawer.vue:51-58` | hand-rolled overlapping stack, `-space-x-0.5`, cap `.slice(0, 8)` |
| `AdminNamesPanel.vue:46, 96` | hand-rolled single dot, `w-8 h-8 rounded-full` |

Four spellings, two of them near-identical (differing only in gap and cap), and the one with a name,
a home, and a public export is used by none of them. The overlapping-stack grammar is a
design-system concept (glass-ui already ships `Avatar`/`AvatarFallback` — the same idiom) and it is
being re-invented per call site.

Cure: `PaletteColorStrip` grows a `variant: "strip" | "stack"` and a `max` prop, or glass-ui gains a
`SwatchStack`. Either way — one home.

---

### L-9 · MAJOR (area scope, outside the subject's import graph) — the export dual path is still alive

Named as a historical suspect in the seat brief; **confirmed live**.

- `demo/palettes/export.ts` — 4,184 bytes, the routed shipping implementation.
- `demo/palettes/export/` — 12 modules (`serializers.ts`, `json.ts`, `css.ts`, `svg.ts`, `png.ts`,
  `tailwind.ts`, `canonical.ts`, `digest.ts`, `rfc8785.ts`, `bytes.ts`, `reload.ts`, `types.ts`).

`demo/palettes/export/serializers.ts:1-9` states the situation itself:

> This module is intentionally **NOT** named `index.ts`: the sibling **legacy `../export.ts`** (the
> pre-contract routed seat that W50 will replace) still resolves `./export`; the byte-exact set is
> addressed by its explicit paths here so the two never collide.

Measured consumers:

```
$ grep -rn 'from "\(\.\.*/\)*export"' demo/          → demo/palettes/usePaletteExport.ts:9   (the app)
$ grep -rn 'export/serializers' demo/ test/          → demo/test/export/byte-exact.test.ts   (a test)
```

The W51 byte-exact contract has **exactly one consumer in the tree, and it is a test.** The shipping
app runs the legacy module. Two implementations of one concept, both alive, deliberately name-dodging
each other to coexist — a textbook **edict 2** violation, and a specifier (`./export`) that names
both a file and a directory, which is a resolution hazard even where it resolves deterministically
today.

Cure: finish W50. Route `usePaletteExport` at `export/serializers`, delete `export.ts`, rename
`export/serializers.ts` → `export/index.ts`.

---

### L-10 · INFO — the value.js public surface is clean (the negative, proven)

The seat's central question — does the demo dogfood the *published* surface — answers **yes**, and
this is the strongest thing about the lattice.

```
$ grep -rn 'from "@src\|from ".*/src/' demo/ --include="*.vue" --include="*.ts"
(no matches)

$ demo imports of @mkbabb/value.js, by subpath:
  25  @mkbabb/value.js/color
  10  @mkbabb/value.js/css
   6  @mkbabb/value.js/math
   5  @mkbabb/value.js/easing
   4  @mkbabb/value.js/quantize
   0  bare "@mkbabb/value.js"
```

Every one of the 50 reaches goes through a specifier a real consumer could write.
`package.json#exports` declares exactly seven subpaths and **no `"."`** — and nothing imports bare,
so the absence is consistent rather than a trap. `vite.config.ts:38-50` derives the self-alias set
**from `package.json#exports` programmatically**, so the demo's resolution can never drift from the
published map — the correct mechanism, and it is in place.

`AdminFlaggedPanel` imports value.js not at all, which is right: it renders `PaletteColor.css`
strings verbatim into `backgroundColor` and has no colour-math job.

### L-11 · INFO — the subject is the migration frontier for glass-ui 7's `tone` axis

`AdminFlaggedPanel.vue:81` is the **only** `tone=` usage in the entire demo:

```
$ grep -rn '<Badge' demo/ --include="*.vue" | grep -c 'tone='      → 1   (this file)
$ grep -rn '<Badge' demo/ --include="*.vue" | grep -c 'variant='   → 7
```

glass-ui 7.0.0's `dist/components/badge/Badge.vue.d.ts` documents `tone` as *"the semantic status
register … **Replaces the former `variant="destructive|success|warning|info"`** (a tone is not a
style)."* So this file is ahead of the tree and correct in both spellings it uses — `tone="destructive"`
(line 81, a status) and `variant="secondary"` (line 112, a style plate). The other seven `<Badge>`
sites should be swept onto the tone axis; this file is the reference.

---

## The greenfield lattice

No legacy, no shims, structured today. Concretely:

```
demo/
  platform/            transport · storage · auth        (unchanged — already a clean lower layer)
  palettes/
    domain/
      types.ts                       Palette, PaletteColor, Flag, PaginatedResponse<T>
      api/                           thin typed endpoint fns (unchanged)
    data/
      useOffsetPagination.ts         ONE generic  ← L-6
      useFlaggedQueue.ts             token-gated moderation ONLY        ← L-5
      useFlagReport.ts               unauthenticated report ONLY        ← L-5
      useAuditLog.ts  useAdminTags.ts  useAdminUsers.ts  useColorNameQueue.ts
    ports/
      admin.ts  browse.ts  library.ts  session.ts  uiState.ts
        — a PARTITION. No member appears on two ports. `searchQuery`/`expandedId`/
          `toggleExpand` live on `uiState`; `isAdminAuthenticated`/`userSlug` live on
          `session`; consumers inject two narrow ports rather than one wide one.   ← L-4
    browser/
      admin/
        AdminQueuePanel.vue          ONE generic queue shell            ← below
        AdminFlaggedPanel.vue        the flagged row renderer + actions only
        AdminAuditPanel.vue          the audit row renderer only
        index.ts                     the seam
      card/  dialog/  search/  slug/  status/
    export/
      index.ts                       the byte-exact contract, sole owner  ← L-9
  (demo/ui/       DELETED — name glass-ui subpaths directly)              ← L-2
  (demo/shared/   DELETED — EmptyState + PaneHeader promoted to glass-ui) ← L-3

@mkbabb/glass-ui/
  ./empty-state    ./pane-header    ./pagination    ./list-skeleton    ./swatch-stack
```

**The one transposition worth naming.** `AdminFlaggedPanel` and `AdminAuditPanel` have identical
import blocks and identical structure — toolbar with count + refresh, skeleton loading, error
`EmptyState` with Retry, true-empty `EmptyState`, `v-for` rows, `PaginationBar`. Only the row body
differs. That is a slot, not a component:

```vue
<AdminQueuePanel :queue="flagged" empty-eyebrow="· nothing flagged ·"
                 empty-message="No flagged palettes."
                 error-message="The flag queue is unreachable."
                 refresh-label="Refresh flagged palettes">
    <template #row="{ item }">…</template>
</AdminQueuePanel>
```

where `queue` is the uniform `useOffsetPagination` surface. The four-state contract
(**unauthorized** / loading / error / empty) then lives in **one** component instead of five, and
L-1's F-2 invariant becomes structurally impossible to violate in a new panel — which is the real
prize. AdminFlaggedPanel drops from 153 lines to roughly its 45-line row template.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| L-1 | **BLOCKER** | `meta.admin` has zero readers; 21 scattered `if (!token) return`; unauthenticated `/#/admin/flagged` renders a false clean moderation queue (in the Safari capture) |
| L-2 | MAJOR | `demo/ui/` = 19 alias directories onto the glass-ui root barrel; fine-grained subpaths exist; live dual path; 234 KB dev dep |
| L-3 | MAJOR | G-DEMO-1/3a/3b lint rules target `demo/@/**`, which no longer exists — zero enforcement, cited as live law by the barrel headers |
| L-4 | MAJOR | ports refactor: 275 L > the 153 L god module it replaced; 34- and 32-member ports; `flagged` provided on two ports and injected via both |
| L-5 | MAJOR | `useAdminFlagged` owns both the token-gated queue and the unauthenticated user report, one shared instance |
| L-6 | MAJOR | offset-pagination arithmetic duplicated byte-for-byte in `useAdminFlagged` and `useAdminAudit` |
| L-9 | MAJOR | `export.ts` (shipping, legacy) vs `export/` (contract, test-only) — both alive, name-dodging by design |
| L-7 | MINOR | `PaginationBar` / `AdminListSkeleton`: generic controls homed in `admin/`, outside the seam, belong in glass-ui |
| L-8 | MINOR | four parallel "render palette colours" implementations; the named one is used by none |
| L-10 | INFO | **positive** — value.js consumed only through published subpaths; zero `src/` deep reaches; self-alias derived from `exports` |
| L-11 | INFO | **positive** — the only `tone=` site in the demo; the glass-ui 7 migration frontier |
