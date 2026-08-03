# CHALLENGE-L — library structure under `AdminTagsPanel.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat
was explicitly spawned with. Not inherited, not undeclared.

**Subject:** `demo/palettes/browser/admin/AdminTagsPanel.vue` (126 lines, area `palettes`).
**Repo state:** branch `tranche-u`. The brief names HEAD `c654824e`; the working HEAD at audit time
is **`e39da983`** (`docs(V·mega): M-19 — glass execution HERALDED`). Every line reference below is
against `e39da983`.
**Verdict:** **DEFECTIVE.** The component itself is small and legible; the *library structure*
beneath it is not. 15 findings, 6 MAJOR.

---

## 0. The import ledger (every edge traced to its home)

`AdminTagsPanel.vue:112-125` — the entire script block:

```ts
import { inject, onMounted } from "vue";
import { Button } from "../../../ui/button";        // → demo/ui/button/index.ts
import { Input } from "../../../ui/input";          // → demo/ui/input/index.ts
import { Skeleton } from "../../../ui/skeleton";    // → demo/ui/skeleton/index.ts
import { Plus, RefreshCw, X } from "@lucide/vue";   // devDependency
import EmptyState from "../../../shared/ui/EmptyState.vue";
import { ADMIN_PORT_KEY } from "../../usePalettePorts";
```

| Edge | Resolves to | Verdict |
|---|---|---|
| `../../../ui/button` | `export { Button } from "@mkbabb/glass-ui";` | **alias barrel** — L-6 |
| `../../../ui/input` | `export { Input } from "@mkbabb/glass-ui/forms";` | **alias barrel** — L-6 |
| `../../../ui/skeleton` | `export { Skeleton } from "@mkbabb/glass-ui";` | **alias barrel** — L-6 |
| `@lucide/vue` | real devDependency | clean |
| `../../../shared/ui/EmptyState.vue` | demo-local design primitive, 105 L, 8 consumers | L-2 family |
| `../../usePalettePorts` | the **composition root**, 276 L, 34-member port | **L-4 / L-5** |

**Does it import `@mkbabb/value.js` correctly?** It does not import it *at all* — zero library
specifiers, zero `@src/*`. That is simultaneously the cleanest fact about this file (§Clean
negatives, N-1) and the sharpest structural indictment (§L-16).

---

## Findings

### L-1 · MAJOR · The unauthenticated state is rendered as a *true empty* — the panel's own F-2 law, broken by its own data source

`demo/palettes/useAdminTags.ts:49-51`:

```ts
async function loadTags() {
    const token = getToken();
    if (!token) return;          // ← silent; loading stays false, loadError stays null
```

The template branches on exactly three states (`AdminTagsPanel.vue:52 / :69 / :82`). With no admin
token the composable mutates nothing, so the panel falls to the third branch and renders
`eyebrow="· no tags minted ·" message="No tags yet."` — the **TRUE-empty specimen annotation** — for
a viewer who is simply not logged in.

**Evidence (measured, 4 matrices).** `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-tags.png`
shows the dock rendering a **"Login"** button (i.e. `isAdminAuthenticated === false`) beside a panel
reading **"0 tags"** / **"· NO TAGS MINTED ·"** / **"No tags yet."**. The same pair appears in
`safari-desktop-dark`, `safari-mobile-light`, `safari-mobile-dark`.

**Reproduction:** fresh browser profile (no `palette-admin-token` in `localStorage`) →
`http://localhost:9000/#/admin/tags` → "0 tags · No tags yet." with zero network requests issued.
Confirmed by `browser_network_requests(filter: "admin|tags|colors")` returning **empty** on the
admin/tags route. (A full live confirmation of the *no-token* render was blocked by a polluted
Playwright profile that restores a stale `FAKE-AUDIT-TOKEN`; the captured audit matrix above *is*
the no-token render, so the finding rests on measurement, not inference.)

**Mechanism.** The auth precondition is expressed as a *silent early return inside the data
composable* instead of as a state of the resource. It is a masking fallback — standing edict 2. The
component carries a comment at `:67` — *"W5-5 (F-2, the P0 case): error ≠ empty"* — and the identical
class of lie (unauthenticated ≠ empty) is live three lines above it.

**Family — 21 sites, 5 composables** (`grep -rn "if (!token) return" demo | wc -l` → **21**):
`useAdminTags.ts:51,:89` · `useColorNameQueue.ts:37,:53,:70,:83,:94` · `useAdminAudit.ts:50` ·
`useAdminFlagged.ts:61,:83,:95` · `useAdminUsers.ts:56,:73,:84,:107,:118,:133,:146,:159,:171,:181`.
Two of them silently substitute a *value* (`return []` at `:159`, `return 0` at `:181`).

**Cure (transposition, not patch).** One `useAdminResource<T>(fetcher)` primitive in
`demo/palettes/admin/` returning a discriminated status —
`{ status: "unauthenticated" } | { status: "loading" } | { status: "error", problem } | { status: "ready", data }`
— and the auth gate hoisted to the pane (`AdminPane.vue`) so no panel can render at all without a
token. The 21 silent returns collapse to one `if (!token) return { status: "unauthenticated" }` in a
single module, and the "error ≠ empty" law becomes structural rather than per-panel prose.

---

### L-2 · MAJOR · The tag chip is a hand-rolled second implementation of glass-ui `Chip`

`AdminTagsPanel.vue:91-105` builds a removable pill from utility classes:

```html
<div class="group flex items-center gap-1 rounded-full border border-card-edge bg-muted/30
            px-2.5 py-1 text-mono-small transition-colors hover:bg-accent/50">
  <span>{{ tag.name }}</span>
  <button class="ml-0.5 p-0.5 rounded-sm opacity-0 transition-all group-hover:opacity-100
                 hover:bg-accent/50 active:scale-95 active:bg-accent/70 cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
                 focus-visible:opacity-100" :aria-label="`Delete tag ${tag.name}`">
```

glass-ui 7 **already ships this exact primitive.**
`node_modules/@mkbabb/glass-ui/package.json#exports` includes `"./chip"`, and
`node_modules/@mkbabb/glass-ui/dist/components/chip/types.d.ts` declares:

```ts
export type ChipMode = "static" | "selectable" | "action" | "removable";
export interface RemovableChipProps extends ChipVisualProps {
    mode: "removable";
    /** Accessible name for the sole remove button in removable mode. */
    removeLabel: string;
}
```

and `chipVariants.d.ts` — `SIZE.sm = "gap-1 px-2.5 py-1 text-caption"`, `SHAPE.pill = ""`. That is
**`gap-1 px-2.5 py-1`** — character-for-character the geometry the panel re-types by hand, plus the
remove-button semantics, plus its accessible name, plus its focus ring.

The primitive is **already adopted in this repo**: `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:14`
— `import { Chip } from "@mkbabb/glass-ui/chip";`. AdminTagsPanel is therefore not an
early-adoption gap; it is a live **second implementation**. Edicts 4 and 5, together.

**Reproduction:** compare `AdminTagsPanel.vue:94` against `chipVariants.d.ts` `SIZE.sm`; render both
— identical box, divergent hover/focus ink.

**Cure:** `<Chip mode="removable" size="sm" :remove-label="\`Delete tag ${tag.name}\`" @remove="…">{{ tag.name }}</Chip>`.
Delete lines 91-105. If a tag chip needs an affordance `Chip` lacks, that variant is authored **in
glass-ui**, not here.

---

### L-3 · MAJOR · "Tag" has four homes in the client and one on the server

| Home | File | Owns |
|---|---|---|
| 1 | `demo/palettes/api/colors.ts:15` | `getTags()` — the public catalog. Module is named *colors* and contains **only tags** (17 lines, one function). |
| 2 | `demo/palettes/api/admin-colors.ts:58-82` | `getAdminTags` / `createTag` / `deleteTag`. Module is named *colors*; its own header admits it holds "Two cohering admin concerns". |
| 3 | `demo/palettes/useAdminTags.ts` | admin tag state + `groupedTags` |
| 4 | `demo/palettes/useTagEdit.ts` | the public catalog + per-palette tag patch, with its own `loaded` cache |

The **server already has the right lattice**: `api/src/modules/admin/routes/tags.ts`,
`api/src/modules/admin/service/tags.ts`, `api/src/modules/color/repository/tag.ts`,
`api/src/modules/admin/__tests__/admin-tags.test.ts`. Tags are a first-class module there and a
smear here. The client's module boundaries do not mirror the boundaries the API already publishes —
which is the natural seam, since the client transport is a 1:1 wrapper of those routes.

Consequence: two independent caches of the same catalog (`useAdminTags.tags` and
`useTagEdit.allTags`), fed by two different endpoints (`/admin/tags` vs `/colors/tags`), never
reconciled. Creating a tag in AdminTagsPanel does not invalidate `useTagEdit.allTags` (whose
`loadAllTags` short-circuits on `loaded.value` — `useTagEdit.ts:35`), so `TagEditPopover` shows a
stale catalog until a forced reload.

**Reproduction (hypothesis — not executed; requires an admin token against a live API):** open
`TagEditPopover` (populates `allTags`, sets `loaded=true`) → navigate to `/#/admin/tags` → create a
tag → reopen the popover → the new tag is absent, because `loadAllTags()` returns at
`useTagEdit.ts:35` without refetching. **Labelled a hypothesis.**

**Cure:** one `demo/palettes/tags/` capsule — `transport.ts` (public + admin endpoints, the only
file that knows the URLs), `useTags.ts` (one catalog, one cache, admin writes invalidate it),
`TagChip.vue` / `TagsPanel.vue` / `TagEditPopover.vue`. `api/colors.ts` disappears; `admin-colors.ts`
keeps only the proposal queue and is renamed to what it is.

---

### L-4 · MAJOR · `ADMIN_PORT_KEY` is a 34-member god port; this panel injects all of it to read one member

`usePalettePorts.ts:195-231` — measured member count:

```
$ awk 'NR>=195 && NR<=231' demo/palettes/usePalettePorts.ts | grep -cE "^\s+[a-zA-Z]+[,:]"
34
$ awk 'NR>=157 && NR<=192' demo/palettes/usePalettePorts.ts | grep -cE "^\s+[a-zA-Z]+[,:]"
32
```

`AdminTagsPanel.vue:122-123`:

```ts
const pm = inject(ADMIN_PORT_KEY)!;
const tagsApi = pm.tags;
```

It consumes **1 of 34**. It is typed against, and version-coupled to, the other 33 — the user
roster, the colour-name queue, the prune bridge, the search placeholder, the expanded-card id.

The file's own header (`usePalettePorts.ts:21-31`) states the intent: *"the RF-15 §b6 dissolution of
the old `usePaletteManager` god facade (153 L, ONE cross-everything injected blob) into FIVE narrow,
feature-owned ports."* Measured outcome: the assembler is **276 lines** (against the retired
facade's 153), `adminPort` is **34 members**, `browsePort` is **32**. The god module was not
dissolved; it was renamed and split in two, and both halves are larger than the original's line
count suggests.

Edict 1 ("never add to a god module") is unenforceable here — *every* new admin capability must be
added to `adminPort`, because that is the only key the panels can inject.

**Cure.** Delete the port aggregation. `useAdminAuth.ts:17-24` already proves the idiom this repo
should use — a lazily-initialised module-level singleton:

```ts
let _adminToken: Ref<string | null> | null = null;
function getAdminToken() { if (!_adminToken) _adminToken = ref(...); return _adminToken; }
```

Make `useAdminTags()` a singleton the same way and let `AdminTagsPanel.vue` write
`const tags = useAdminTags();` — one import, one concept, no injection key, no composition-root
coupling, no 33 unused members. The provide/inject ceremony buys testability only if the seam is
ever substituted; nothing in the tree substitutes it.

---

### L-5 · MAJOR · Keys live with the provider, so every leaf imports the composition root — and the state layer imports the view layer (a type-level cycle)

Two coupled defects.

**(a) Key colocation.** `ADMIN_PORT_KEY` is declared at `usePalettePorts.ts:274`, in the same module
as `providePalettePorts`. So `AdminTagsPanel.vue:119` — a leaf feature component — statically pulls
in a module that itself imports 14 composables plus `../platform/auth/*` (`:5-7`) and
`../shell/useViewManager` (`:19`). A tag panel's static graph therefore contains slug migration,
palette actions, browse sorting, and the shell's view manager.

The repo **already has the right idiom** and does not use it here: `demo/color-session/keys.ts`
(the only `keys.ts` in the tree — `find demo -name "keys.ts"` returns exactly one). `AdminUsersPanel.vue:187`
imports `SAFE_ACCENT_KEY` from it correctly.

**(b) Inverted dependency + cycle.** `demo/palettes/useAdminUsers.ts:14`:

```ts
import type { AdminUsersPanel } from "./browser/admin";
...
const adminUsersPanelRef = ref<InstanceType<typeof AdminUsersPanel> | null>(null);
```

and then drives the component imperatively from the state layer — `useAdminUsers.ts:99, :121, :136, :150`:

```ts
adminUsersPanelRef.value?.updatePaletteTier(palette.slug, result.tier);
adminUsersPanelRef.value?.removeUserPalette(palette.slug);
adminUsersPanelRef.value?.clearUserPalettes(slug);
```

The closed cycle, all edges verified:

```
usePalettePorts.ts:9   → useAdminUsers.ts
useAdminUsers.ts:14    → browser/admin/index.ts
browser/admin/index.ts:7 → AdminTagsPanel.vue
AdminTagsPanel.vue:119 → usePalettePorts.ts        ← closes
```

The `import type` at `:14` is erased under `verbatimModuleSyntax`, so there is **no runtime cycle** —
but the type graph is cyclic, and the architectural direction is inverted: the composable owns a
handle to a component instance and mutates the view, instead of the view reading state. This is the
"wrong direction of dependency" in its pure form, and `AdminTagsPanel` sits inside the barrel that
closes the loop.

**Cure.** (i) `demo/palettes/admin/keys.ts` (or no keys at all — see L-4). (ii) Delete
`adminUsersPanelRef` entirely; `updatePaletteTier` / `removeUserPalette` / `clearUserPalettes` are
mutations of state the composable **already owns** (`adminUsers`, and a per-user palette map it
should own too) — the panel then re-renders because the state changed, which is the only reason
`useAdminUsers` exists.

---

### L-6 · MAJOR · Two live import paths to the same design system; `demo/ui/` is 20 alias barrels

All 20 files under `demo/ui/*/index.ts` are pure re-exports of glass-ui. In full:

```
demo/ui/button/index.ts    → export { Button } from "@mkbabb/glass-ui";
demo/ui/input/index.ts     → export { Input } from "@mkbabb/glass-ui/forms";
demo/ui/skeleton/index.ts  → export { Skeleton } from "@mkbabb/glass-ui";
… 17 more, identical in kind
```

Measured split across `demo/`:

```
$ grep -rl "@mkbabb/glass-ui" demo | wc -l                 → 82   (direct)
$ grep -rlE 'from "(\.\./)+ui/(button|input|…)"' demo | wc -l → 48   (via barrel)
$ files doing BOTH                                          → 24
```

**24 files import the same design system through two different paths simultaneously.** The
subject's own siblings are among them — `AdminNamesPanel.vue:124` takes `SegmentedTabs` from
`@mkbabb/glass-ui/tabs` while `:125` takes `Button` from `../../../ui/button`;
`AdminUsersPanel.vue:197` takes the dialog cluster from `@mkbabb/glass-ui/dialog` while `:188-189`
take `Button`/`Badge` from the barrels.

A pass-through re-export barrel is an **alias** — standing edict 2, verbatim: *"no aliases,
migration shims, dual paths"*. `demo/ui/alert/index.ts` even documents its own history as a
converted shim. The conversion is what removed the *duplication*; it did not remove the *alias*.

Second-order cost: the barrels flatten glass-ui's subpath map. `Input` really lives at
`@mkbabb/glass-ui/forms`, `Chip` at `@mkbabb/glass-ui/chip`, `Skeleton` at the root — the barrels
erase that topology, so a reader of `AdminTagsPanel.vue` cannot see which glass-ui capsules the
component actually depends on, and (see L-2) cannot discover that `Chip` exists.

**Cure:** delete `demo/ui/` (20 files, ~20 lines total) and rewrite the 48 barrel importers to the
real subpaths. Mechanical, no behaviour change, and it makes L-2-class duplication visible at the
import line.

---

### L-7 · MINOR · The admin feature is split across two directories, and its panels are exported through the *browse* feature's public barrel

```
demo/palettes/admin/AdminPane.vue                 ← the container (1 file)
demo/palettes/browser/admin/AdminTagsPanel.vue    ← the panels    (8 files)
```

`AdminPane.vue:79-86` reaches sideways for its own children:

```ts
import { AdminUsersPanel, AdminNamesPanel, AdminAuditPanel, AdminFlaggedPanel, AdminTagsPanel }
    from "../browser/admin";
```

and `demo/palettes/browser/index.ts:27-34` re-exports all five panels as part of **browse's** public
surface. Admin is not a sub-feature of browse: it shares a `PaletteCard` and nothing else. The only
reason the panels live under `browser/` is that the pre-split `palette-browser/` directory was where
they were born (`useAdminTags.ts:8` records it: *"Migration source: `palette-browser/AdminTagsPanel.vue`"*).

**Cure:** one `demo/palettes/admin/` capsule holding `AdminPane.vue`, the five panels, the shared
`AdminListItem`/`AdminListSkeleton`/`PaginationBar`, and the admin composables; `browser/index.ts`
stops exporting admin anything.

---

### L-8 · MINOR · One view identity, seven declaration sites

`"admin-tags"` is declared independently at:

1. `demo/shell/viewSchema.ts:49` — the `ViewId` union
2. `demo/shell/viewSchema.ts:63` — the `LeftPane` union
3. `demo/shell/viewSchema.ts:224` — the `PaneConfig` record (label, icon, panes)
4. `demo/shell/dock/composables/useDockAdminMode.ts:27` — the `adminViews` array literal
5. `demo/color-picker/router/index.ts:35` — the route record
6. `demo/palettes/admin/AdminPane.vue:91` — the `subView` prop union
7. `demo/palettes/admin/AdminPane.vue:67 / :103 / :113` — the render `v-if`, the title switch, the
   description switch

Adding an admin sub-view requires seven coordinated edits, and nothing in the type system catches
six-of-seven. Unique semantic ownership fails.

**Cure:** one record per view in `viewSchema.ts` carrying `{ id, label, description, icon, left,
right, component, adminOnly }`; derive `ViewId` (`keyof typeof VIEWS`), the dock's admin list
(`filter(v => v.adminOnly)`), the route table (`Object.entries(VIEWS).map(…)`), and `AdminPane`'s
title/description/`<component :is>` from it. Seven sites collapse to one.

---

### L-9 · MINOR · `meta: { admin: true }` is dead declaration; the admin routes are ungated

`demo/color-picker/router/index.ts:31-35` marks five routes `meta: { admin: true }`. Measured:

```
$ grep -rn "to.meta|route.meta|\.meta\.admin|beforeEach|beforeResolve" demo   → (no output)
$ grep -rn "beforeEach" demo | wc -l                                          → 0
```

**Zero navigation guards exist.** No code reads `meta.admin`. The flag is inert metadata that reads
as a security control and is not one — and the visual audit proves the consequence: `/#/admin/tags`
renders fully for an unauthenticated visitor (L-1). Standing edict 2 (no dead/legacy code).

Note the *shape* of the router itself: 15 routes, every one bound to
`const Stub = { render: () => null }` (`:19`), because rendering is driven by `viewSchema` +
`useViewManager`. vue-router is used purely as a URL-state bus running in parallel with a second,
authoritative view lattice — the substrate of L-8.

**Cure:** either a real `router.beforeEach` reading `to.meta.admin` against `useAdminAuth()`, or
delete the `meta` field. Do not ship a flag that describes a guard that does not exist.

---

### L-10 · MINOR · `tsconfig.demo.json` `paths` has silently drifted from `package.json#exports` — three entries point at files that do not exist

`package.json#exports` — measured, a closed 7-key set with **no `"."`**:

```
$ node -e "const p=require('./package.json');console.log(Object.keys(p.exports));console.log('main:',p.main,'types:',p.types)"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]
main: undefined types: undefined
```

`tsconfig.demo.json` declares **8** keys and calls them *"the CLOSED 8-key set"*. Cross-check:

| `paths` key | target | exists on disk? | in `exports`? |
|---|---|---|---|
| `@mkbabb/value.js` | `./dist/index.d.ts` | **NO** | **NO** (no `"."` key) |
| `@mkbabb/value.js/parsing` | `./dist/subpaths/parsing.d.ts` | **NO** | **NO** |
| `@mkbabb/value.js/units` | `./dist/subpaths/units.d.ts` | **NO** | **NO** |
| `@mkbabb/value.js/color` | `./dist/subpaths/color.d.ts` | yes | yes |
| `@mkbabb/value.js/math` / `/easing` / `/transform` / `/quantize` | … | yes | yes |
| — | `./value` **missing from paths** | yes | yes |
| — | `./css` **missing from paths** | yes | yes |

```
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
```

No `index.d.ts`, no `parsing.*`, no `units.*`. Three of the eight declared public keys name files
that have never existed in this build.

**Why nobody noticed:** the demo's 10 `@mkbabb/value.js/css` imports typecheck *without* a `paths`
entry, via Node/TS **package self-reference**. Traced against a real repo file:

```
$ npx tsc --ignoreConfig --noEmit --traceResolution --moduleResolution bundler \
    demo/workbenches/gradient/composables/gradientParse.ts | grep -A12 "Resolving module '@mkbabb/value.js/css'"

======== Resolving module '@mkbabb/value.js/css' from '…/demo/workbenches/gradient/composables/gradientParse.ts'. ========
File '…/demo/package.json' does not exist.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
```

The package resolves itself through its **own `exports` map** — the exact mechanism a real consumer
uses. The `paths` block is therefore not load-bearing; it is a stale mirror that has drifted three
keys out of alignment while masking the drift. Standing edict 2 (a masking fallback).

Demo subpath usage histogram (`grep -rohE '@mkbabb/value\.js(/[a-z]+)?' demo`):
`/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4, bare ×1 (a *comment* in
`demo/shared/utils.ts:12`, not an import). `/value` and `/transform`: **zero demo consumers** — two
of the seven published subpaths are undogfooded.

**Cure:** delete the entire `paths` block from `tsconfig.demo.json` (keep only the `vue` /`@vue/*`
dedupe entries) and delete `valueJsSelfAlias` from `vite.config.ts`. Self-reference already gives
both programs *exactly* the published surface, by construction, with no possibility of drift — which
is precisely what the T.W1 dogfood keystone was for.

---

### L-11 · INFO · The local `dist/subpaths/css.d.ts` emits duplicated nominal types absent from the published 4.0.0

Found while tracing L-10. `node_modules/@mkbabb/value.js` is a real installed copy of **4.0.0**
(a transitive dependency; it is not in this repo's `dependencies`, and it is **not** a symlink —
`readlink` → "not a symlink"). Diffing it against this checkout's build:

```
$ diff node_modules/@mkbabb/value.js/dist/subpaths/color.d.ts dist/subpaths/color.d.ts   → identical
$ diff node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts   dist/subpaths/css.d.ts     → 32 lines added
$ wc -l  → published 350, local 382
```

The local build emits `Alpha_2`, `Channel_2`, `SpaceId_2`, `ChannelsBySpace_2`, `Color_2` — a
`.d.ts` rollup name-collision artifact — and rewires `CssColorSpaceMap` to the duplicate:

```diff
-    [S in CssColorSpace]: Color<S>;      // published 4.0.0
+    [S in CssColorSpace]: Color_2<S>;    // this checkout's build
```

A consumer writing `Color<"oklch">` from `/color` and passing it to a `/css` API gets two
structurally identical but separately-declared types. **Reproduction:** the two `diff` commands
above. **Caveat:** `dist/` is a build artifact; I did not run `npm run build`, so I cannot certify
that HEAD's source still produces this. Verify with a clean rebuild before acting.

---

### L-12 · MINOR · Per-instance geometry overrides on design-system primitives; the mobile placeholder clips

`AdminTagsPanel.vue` overrides glass-ui sizing at four sites:

- `:10` `<Button variant="outline" size="sm" class="h-7 px-2">` — `size="sm"` then overridden
- `:38-40` same pair on the create button
- `:26` `<Input size="sm" class="flex-1 min-w-0 font-mono">`
- `:34` `<Input size="sm" class="w-36 font-mono">` — a **hard 144px reservation**

Measured live at 1440×900 (`document.querySelectorAll('input')` + `getBoundingClientRect`):

| placeholder | w | h | accessible name |
|---|---|---|---|
| `Tag name...` | 274 | 36 | `New tag name` ✓ |
| `Category...` | **144** | 36 | `New tag category` ✓ |

At 390px (mobile), `w-36` still claims 144px — 37% of the viewport — before `gap-2` ×2 and the
create button. The name well collapses and **clips its own placeholder**:
`shots/safari-mobile-dark/admin-tags.png` renders `Tag namε` with the text cut at the field edge.
The comment at `:17-19` claims the opposite outcome — *"the pair sized honestly … the category well
no longer clips its own placeholder"* — which is true of the category well at desktop and false of
the name well at mobile.

Standing edict 5: style at the design-system root, never per-instance. A two-field-plus-action row
is a *form-row* concern; glass-ui exports `./labeled-field` and `./forms`.

**Cure:** author the create-row as a glass-ui form-row geometry (or give `Input` a `flex` sizing
rung) and delete all four class overrides. `h-7` on a `size="sm"` Button is the design system being
argued with, per instance, in a leaf.

---

### L-13 · MINOR · The grouped tag list is semantically flat

`AdminTagsPanel.vue:85-107`: the category grouping renders as
`<div class="mb-1.5 section-label">{{ category }}</div>` over `<div class="flex flex-wrap">` over
`<div>` chips. No `<section>`, no heading element, no `<ul>`/`<li>`. A screen reader receives an
undifferentiated run of text where the visual design plainly presents a two-level taxonomy.

Route-level measurement, `docs/tranches/V/megatranche/audit/visual/REPORT.json` (`/#/admin/tags`,
all four matrices): `"counts": { "main": 1, "h1": 0, "nav": 1, "button": 14 }`. The route has **no
h1**; the highest heading is `PaneHeader.vue:21`'s `<h3>`. So the outline is
`(nothing) → h3 "Tags" → div "category"`.

**Cure:** `<section>` per group, `<h4>` for the category (correct under the pane's h3), `<ul>` /
`<li>` for the chips. The h1 gap is `PaneHeader`'s to own, not this component's.

---

### L-14 · MINOR · Error-message derivation is re-implemented per composable, in `any`, discarding the typed RFC 7807 problem

`useAdminTags.ts:56-59`:

```ts
} catch (e: any) {
    loadError.value = e?.message ?? "Backend unreachable";
    console.warn("Failed to load tags:", e);
}
```

`demo/platform/transport/api-problem.ts` defines a typed `ApiProblem` (RFC 7807, with `title`,
`detail`, `status`) — and it has **three** consumers repo-wide
(`api-problem.ts`, `client.ts`, `useSlugMigration.ts`), while `e?.message ?? "…"` appears **11**
times. `catch (e: any)` appears 11 times in `demo/palettes/*.ts` alone (`useAdminUsers.ts` ×10,
`useAdminTags.ts`, `useAdminAudit.ts`, `useAdminFlagged.ts`, `usePaletteActions.ts`).

So the panel's error banner (`AdminTagsPanel.vue:72`, `:detail="tagsApi.loadError.value"`) shows a
JS `Error.message` and throws away `problem.detail` — the field the API authored specifically to be
shown. `any` also punches through `strict` in a codebase whose `tsconfig.base.json` sets
`strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.

**Cure:** `client.ts` throws `ApiProblem` (it already constructs one); one exported
`problemMessage(e: unknown): string` in `platform/transport/`; every `catch (e: any)` becomes
`catch (e)` with `unknown`. 11 sites → one.

---

### L-15 · INFO · Two loading registers, one of them anonymous

`AdminListSkeleton.vue` exists beside the subject and is used by **all four** sibling panels
(`AdminNamesPanel.vue:130`, `AdminAuditPanel.vue:101`, `AdminFlaggedPanel.vue:143`,
`AdminUsersPanel.vue:203`). `AdminTagsPanel` is the sole panel that inlines its own
(`:51-65`), with an alternating-width literal:

```html
<Skeleton v-for="i in 5" surface="glass" variant="breath" class="h-7 rounded-full"
          :class="i % 2 ? 'w-20' : 'w-14'" />
```

The chip-shaped register is a legitimate second *shape* (chips are not rows) — but it has no module
home, so it cannot be reused and cannot be kept in step with `AdminListSkeleton` when the ink
register changes. The comment at `:49-50` asserts *"the ONE loading-ink register"*; there are two,
and only one is named.

**Cure:** once L-2 lands, the chip skeleton is `<Chip>` geometry with the skeleton surface — i.e. it
follows `Chip` automatically. Failing that, `AdminSkeleton` with `shape="row" | "chip"`.

---

### L-16 · INFO · The structural frame: 2 120 lines of moderation console inside a colour library's demo

`AdminTagsPanel` imports nothing from `@mkbabb/value.js` and neither does any other admin file. The
admin surface measures:

```
$ wc -l demo/palettes/admin/AdminPane.vue demo/palettes/browser/admin/*.vue \
        demo/palettes/useAdmin*.ts demo/palettes/api/admin-*.ts \
        demo/platform/auth/useAdminAuth.ts demo/shell/dock/composables/useDockAdminMode.ts
   2120 total
$ find demo -name "*.vue" -o -name "*.ts" | xargs wc -l | tail -1
  31096 total
```

**6.8% of the demo** is a CRUD moderation console that demonstrates none of the library's
capabilities, yet occupies five of fifteen routes, five arms of the `ViewId` union, four `paths`
programs' typecheck budget, and — per L-1 — 60 of the visual audit's captures. The demo's job is to
be the library's proof surface. Where the tag panel could dogfood something (`groupedTags`'
`localeCompare` sort; the tag/category colour taxonomy), it dogfoods nothing.

This is context, not an actionable defect on its own — recorded so the greenfield lattice below is
read against the right question.

---

## Greenfield lattice (stated concretely, not hedged)

```
demo/
  platform/            # transport, auth, storage — knows nothing about palettes
    transport/         # request(), adminRequest(), ApiProblem, problemMessage()
    auth/              # useAdminAuth (singleton), useUserAuth, useSession
  palettes/
    tags/              # ← the whole "tag" concept, one home (kills L-3)
      transport.ts     #   listTags / listAdminTags / createTag / deleteTag
      useTags.ts       #   ONE catalog + cache; admin writes invalidate it
      TagsPanel.vue    #   the subject, rebuilt on glass-ui <Chip mode="removable">
      TagEditPopover.vue
    admin/             # ← ONE admin capsule (kills L-7)
      AdminPane.vue
      useAdminResource.ts   # the discriminated-status primitive (kills L-1 ×21)
      users/ names/ audit/ flagged/   # each a folder, each its own resource+panel
    browse/  library/  export/
  shell/
    views.ts           # ONE record per view; ViewId, routes, dock list, panes DERIVED (kills L-8)
  (demo/ui/ deleted — import @mkbabb/glass-ui/* directly)          (kills L-6)
  (demo/shared/ui/EmptyState.vue → glass-ui, 8 consumers)          (edict 4)
```

Four structural moves, in dependency order:

1. **Delete `demo/ui/`.** 20 alias files, 48 importers rewritten to real glass-ui subpaths. This is
   the prerequisite for L-2: once `Chip` is one import away and visible, the hand-rolled pill is
   obviously redundant.
2. **`useAdminResource<T>`** with a discriminated status, and hoist the auth gate to `AdminPane`.
   21 silent early-returns and 11 `catch (e: any)` blocks collapse; "error ≠ empty ≠ unauthenticated"
   becomes structural.
3. **One `tags/` capsule; one `admin/` capsule.** `browser/index.ts` stops exporting admin;
   `useAdminUsers`'s `adminUsersPanelRef` and its four imperative calls are deleted, which breaks
   the type cycle at its source.
4. **Retire the ports.** Singleton composables imported directly (the `useAdminAuth` idiom already
   in the tree). `usePalettePorts.ts` — 276 lines, 5 keys, 34+32-member surfaces — disappears
   entirely; leaves stop importing the composition root.

Then delete the `paths` block from `tsconfig.demo.json` and `valueJsSelfAlias` from
`vite.config.ts`: package self-reference is the honest mechanism, and it *cannot* drift from
`package.json#exports` because it *is* `package.json#exports`.

---

## Clean negatives (proved, not assumed)

- **N-1 · No demo → `src/` internal reach.** `grep -rn '"@src' demo | wc -l` → **0**. The T.W1
  dogfood keystone holds: `AdminTagsPanel` (and every demo file) can reach the library only through
  the published subpath map. No import here is one a real consumer could not write.
- **N-2 · `verbatimModuleSyntax` satisfied.** `AdminTagsPanel.vue:113-119` imports only values
  (`inject`, `onMounted`, three components, three icons, one `const` injection key). No type-only
  import is mis-declared.
- **N-3 · Styling tokens are properly rooted in glass-ui, not forked.** `section-label` and
  `text-mono-small` are glass-ui `@utility` registrations
  (`demo/styles/foundation.css:88`; `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`);
  `--card-edge` is owned once at `demo/styles/foundation.css:136` and consumed via the first-class
  `border-card-edge` utility, not a `border-[var(--card-edge)]` reach. The violation in L-12 is
  *geometry* overrides, not token forks.
- **N-4 · The route's 4 flagged tap targets are not this component's.**
  `REPORT.json` `/#/admin/tags` → `smallTapTargets: [ {input, 160×23, label:""},
  {button 22×22 "Switch to slug"}, {button 22×22 "Generate new slug"}, {button 22×22 "Cancel"} ]`.
  Live DOM probe identifies the 160×23 input as the slug/token login form
  (`placeholder: "enter slug or token..."`), inside a `<FORM>` — the migrate dialog cluster, present
  on every route. None belongs to AdminTagsPanel.
- **N-5 · glass-ui `Input` forwards `aria-label` to the real `<input>`.** Live probe: both tag
  fields carry `aria-label` **on the `<input>` element itself** (`New tag name`, `New tag category`).
  The W5-a11y annotations at `:25`, `:31` are real, not decorative.
- **N-6 · Route hygiene.** `REPORT.json`, all four matrices, `/#/admin/tags`: `pageErrors: []`,
  `consoleErrors: []`, `failedRequests: []`, `overflowX: 0`, `counts.main: 1`,
  `a11y.namelessButtons: 0`. Nothing in this component throws, overflows, or ships a nameless
  control.

---

## Severity roll-up

| ID | Severity | One line |
|---|---|---|
| L-1 | MAJOR | Unauthenticated renders as TRUE-empty; 21 silent `if (!token) return` sites |
| L-2 | MAJOR | Hand-rolled tag chip duplicates glass-ui `Chip mode="removable"` (already adopted elsewhere) |
| L-3 | MAJOR | "Tag" has 4 client homes vs 1 server module; two unreconciled catalog caches |
| L-4 | MAJOR | `ADMIN_PORT_KEY` = 34 members; panel injects all to read 1; the "dissolved" god facade grew |
| L-5 | MAJOR | Keys colocated with provider → leaves import the composition root; state layer imports + drives the view layer (type cycle) |
| L-6 | MAJOR | 82 direct vs 48 barrel glass-ui importers, **24 both**; `demo/ui/` = 20 alias barrels |
| L-7 | MINOR | Admin split across two dirs; panels exported through *browse*'s public barrel |
| L-8 | MINOR | `"admin-tags"` declared at 7 independent sites |
| L-9 | MINOR | `meta: { admin: true }` dead — **0** navigation guards in `demo/` |
| L-10 | MINOR | `tsconfig.demo.json` `paths` drifted: 3 keys → nonexistent files, 2 real subpaths undeclared |
| L-11 | INFO | Local `dist/subpaths/css.d.ts` emits duplicate nominal types absent from published 4.0.0 |
| L-12 | MINOR | Four per-instance geometry overrides; `w-36` clips the mobile placeholder |
| L-13 | MINOR | Category groups are `div`s; route has `h1: 0` |
| L-14 | MINOR | 11 ad-hoc `catch (e: any)` + `e?.message ?? …`; typed `ApiProblem` has 3 consumers |
| L-15 | INFO | Two loading registers; the chip one has no module home |
| L-16 | INFO | 2 120 LOC (6.8% of demo) of moderation console with zero library usage |

**Strongest defect: L-1** — the component's own governing law ("error ≠ empty", W5-5/F-2) is broken
by its own data source, in a way the mega-tranche's visual audit captured **60 times** without the
capture harness recognising it, because the panel reports the lie as a designed empty state.

---

*Written by the CHALLENGE-L seat. No source edits land from this formation. Read-only browser probes
against `http://localhost:9000`; all repo writes confined to
`docs/tranches/V/megatranche/audit/components/AdminTagsPanel/`.*
