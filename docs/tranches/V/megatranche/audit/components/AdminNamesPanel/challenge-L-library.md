# CHALLENGE-L — library structure under `AdminNamesPanel.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the 1M-context variant, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/palettes/browser/admin/AdminNamesPanel.vue` (152 lines, area `palettes`).
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.
- Written: 2026-07-28. No source edits land from this seat; everything below is READ + measured.

---

## 0. Verdict

**DEFECTIVE.** The component itself is 152 lines of competent, well-annotated markup. The *structure*
underneath it is not. Fifteen distinct defects, most of them of one family: **a boundary was
declared in prose and never in code**, or **declared in code and then the code it guarded was moved
out from under it**.

The single strongest finding, because it invalidates the premise of every other structural claim in
this tree:

> **L-1 — the barrel-seam law that `demo/palettes/browser/index.ts` says "enforces it standing" is
> not applied to this file at all.**
> `npx eslint --print-config demo/palettes/browser/admin/AdminNamesPanel.vue` →
> `no-restricted-imports = null`.

Everything the seam claims to protect is protected by comment only.

---

## 1. Import ledger — every edge traced to its home

`AdminNamesPanel.vue:122-130`:

| # | line | specifier | resolves to | verdict |
|---|------|-----------|-------------|---------|
| 1 | 123 | `vue` | `node_modules/vue` (tsconfig.demo.json:35) | OK |
| 2 | 124 | `@mkbabb/glass-ui/tabs` | glass-ui 7.0.0 `./tabs` subpath export | **OK — the correct idiom** |
| 3 | 125 | `../../../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` (ROOT barrel) | **L-5 — dual path, 13× cost** |
| 4 | 126 | `@lucide/vue` | devDependency `^1.16.0` | OK |
| 5 | 127 | `../../../color-session/color-names` (`import type`) | `demo/color-session/color-names.ts:12` | **L-3b — wrong home** |
| 6 | 128 | `./AdminListItem.vue` | same dir, raw `.vue` | OK (intra-directory) |
| 7 | 129 | `../../../shared/ui/EmptyState.vue` | `demo/shared/ui/EmptyState.vue` | **L-18 — design primitive outside the design system** |
| 8 | 130 | `./AdminListSkeleton.vue` | same dir, raw `.vue` | OK (intra-directory) |

Zero imports from `@mkbabb/value.js`. See **L-14** — that is itself the finding, not the absence of one.

`verbatimModuleSyntax` compliance: **clean.** The one type-only import (`ProposedColorName`, :127)
is `import type`. Edict 8 satisfied.

---

## 2. Findings

### L-1 — MAJOR — the boundary law protecting this file's home is a dead letter

`demo/palettes/browser/index.ts:5-7` states, of the barrel seam:

> "External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — the G-DEMO-3b boundary (**eslint.config.js**) enforces it standing."

It does not.

```
$ npx eslint --print-config demo/palettes/browser/admin/AdminNamesPanel.vue | python3 -c "…"
no-restricted-imports = null
total rules: 44
$ npx eslint demo/palettes/browser/admin/AdminNamesPanel.vue ; echo $?
0
```

All three boundary objects in `eslint.config.js` are aimed at a tree that no longer exists:

```
eslint.config.js:232-239   files: demo/color-picker/**, demo/@/components/**, demo/@/lib/**
eslint.config.js:274-277   files: demo/@/composables/**
eslint.config.js:247,295   banned group: "@components/custom/palette-browser/**/*.vue"
```

```
$ ls -d demo/@            → No such file or directory
$ find demo/@/components -type f | wc -l   → 0
$ find demo/@/lib        -type f | wc -l   → 0
$ find demo/@/composables -type f | wc -l  → 0
```

`demo/@` died at `a61094e3` ("feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)") — the
same commit that created this file. And the banned *specifier* is unmatched twice over: the `@…`
path aliases were killed in the same wave (`tsconfig.demo.json:32-34`: "the demo `@…` path aliases
were **killed** — every demo import is relative to its physical home. No `@styles`/`@components`/
`@utils`/`@lib`/`@composables`/`@assets` project alias survives"). Nothing can ever write
`@components/custom/palette-browser/…` again, so the rule can never fire.

Mechanism: **the enforcement was written against paths, the paths were renamed, and the rename did
not carry the enforcement.** Three eslint config objects (~85 lines) are inert.

Reproduction: the two commands above.

Cure: re-aim the globs at the live tree (`demo/palettes/**`, `demo/workbenches/**`, `demo/shell/**`)
and re-express the ban as a *relative-depth* rule, not an alias-prefix rule — the alias prefix was
the only thing making it expressible, and it is gone. Concretely: ban
`["**/palettes/browser/*/*.vue", "!**/palettes/browser/*/index.ts"]` from files outside
`demo/palettes/browser/**`. If that cannot be expressed cleanly, delete the three objects and the
seam prose together rather than shipping a law nobody enforces (edict 2: no masking).

---

### L-2 — MAJOR — the top-level seam has zero importers; it is a phantom public surface

```
$ grep -rn --include="*.ts" --include="*.vue" --include="*.js" --include="*.mjs" \
    -E 'from "[^"]*browser"|from "[^"]*palettes/browser"|import\("[^"]*browser"\)' \
    demo e2e test scripts src
(no output — exit 1)
```

`demo/palettes/browser/index.ts` re-exports **22 named symbols** across six sub-barrels and is
imported by **nothing**. Every real consumer reaches a sub-barrel directly:

```
demo/palettes/admin/AdminPane.vue:85     from "../browser/admin"
demo/palettes/useAdminUsers.ts:14        from "./browser/admin"
```

The file's own docstring calls itself "The stable public API of the palette-browser feature" and
spends 17 lines justifying its named-re-export discipline (PI-6) on tree-shaking grounds. The
tree-shaking argument is sound and the discipline is correct — for a barrel with consumers. This
one has none. `AdminNamesPanel` appears in it at `:29` as one of five admin panels; all five have
exactly one consumer and it is not this seam.

Mechanism: **a public surface was authored for an anticipated consumer that never arrived.**

Reproduction: the grep above.

Cure: delete `demo/palettes/browser/index.ts`. The sub-barrels are the real seams and they work.
A seam with no consumer is not a contract, it is a 22-line assertion that costs a maintenance edit
on every component rename.

---

### L-3 — MAJOR — this component is in the wrong directory, and its DTO is in the wrong area

**L-3a (home).** `AdminNamesPanel.vue` lives under `demo/palettes/browser/admin/`. Its only
consumer lives under `demo/palettes/admin/`:

```
$ grep -rn "AdminNamesPanel" demo e2e test
demo/palettes/admin/AdminPane.vue:44,81   ← the only consumer
demo/palettes/browser/index.ts:29         ← dead barrel (L-2)
demo/palettes/browser/admin/index.ts:4    ← sub-barrel
```

```
$ ls demo/palettes/admin/            → AdminPane.vue          (1 file)
$ ls demo/palettes/browser/admin/    → 5 panels + 3 atoms + index.ts  (9 files)
```

There are **two admin homes**, one containing the pane and one containing everything the pane
renders, with `browser/` — a *different feature* — interposed. Nothing in the admin cluster is a
browse concern: the panels never touch `remotePalettes`, `PaletteCard`, or the browse search
pipeline. The `browser/` prefix on the path is archaeology from a time when the whole cluster was
one "palette-browser mega-feature".

**L-3b (the DTO).** `ProposedColorName` — the type this panel is generic over — lives in
`demo/color-session/color-names.ts:12`. Its docstring says it was "Lifted out of
`palettes/api/colors.ts` at W43b3 (RF-15)". Measure who actually consumes it:

```
$ grep -rn "ProposedColorName" demo/ src/ api/src | sed 's/:.*//' | sort | uniq -c
   6 demo/palettes/useColorNameQueue.ts        ← palettes
   6 demo/palettes/browser/admin/AdminNamesPanel.vue  ← palettes
   3 demo/palettes/api/admin-colors.ts         ← palettes
   1 demo/palettes/api/index.ts                ← palettes
   4 demo/color-session/useCustomColorNames.ts ← color-session
   4 demo/color-session/color-names.ts         ← color-session (its own home)
```

**16 of 24 references, and 4 of 6 files, are in `palettes/`.** The type was moved to the minority
consumer. `demo/palettes/api/admin-colors.ts:16` now imports it back up and across:
`import type { ProposedColorName } from "../../color-session/color-names";`

Mechanism: **the W43b3 move was argued from the *name* of the concept ("colour naming is a colour
concern") rather than from the measured dependency fan-in.**

Reproduction: the two greps above.

Cure: see §3. The concept is *color-name moderation*; it is neither a browse concern nor a
color-session concern. It wants its own area.

---

### L-4 — MAJOR — `cssColorOpaque` is a dead prop, prop-drilled from an inject key

`AdminNamesPanel.vue:140` declares `cssColorOpaque: string;` in `defineProps`.

```
$ grep -c "cssColorOpaque" demo/palettes/browser/admin/AdminNamesPanel.vue
1
```

One occurrence — the declaration. It is never read in template or script. `AdminPane.vue:52` passes
it (`:css-color-opaque="cssColorOpaque"`), having obtained it at `AdminPane.vue:94` from
`inject(CSS_COLOR_KEY)!`.

Two defects stacked:
1. A **required** prop on the component's public surface that the component does not use — every
   consumer must supply it, and TypeScript enforces the lie.
2. It is prop-drilled *out of* an injection. `CSS_COLOR_KEY` exists in `demo/color-session/keys.ts`
   precisely so this value is not prop-drilled (the pattern is documented in project memory:
   "`cssColorOpaque` injected via `CSS_COLOR_KEY` (**not prop-drilled**)"). The parent injects and
   then drills anyway.

Reproduction: `grep -c` above; `grep -n cssColorOpaque demo/palettes/admin/AdminPane.vue` → `:52`, `:94`.

Cure: delete the prop and the binding. Two lines, zero behaviour change.

---

### L-5 — MAJOR — `demo/ui/` is a 19-module re-export shim over glass-ui; this file uses both paths in adjacent lines

```
AdminNamesPanel.vue:124   import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";   ← correct
AdminNamesPanel.vue:125   import { Button } from "../../../ui/button";             ← through the shim
```

```
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
```

Every one of the 19 directories under `demo/ui/` is a pure re-export of glass-ui, and **18 of 19 go
through the bare root barrel** (only `input` uses a subpath, `@mkbabb/glass-ui/forms`). That is a
migration shim layer with nothing left to migrate — a direct edict-2 violation ("no aliases,
migration shims, dual paths, back-compat") and an edict-4 violation (glass-ui is the design system;
reach it as itself).

Measured cost of the root-barrel reach, static import closure over glass-ui 7.0.0's `dist/`:

```
entry            modules   bytes
glass-ui.js         66    224,193      ← what `demo/ui/button` pulls
button.js           11     17,224      ← what `@mkbabb/glass-ui/button` pulls
tabs.js             20     50,466
```

**6× the modules, 13× the bytes, for one symbol.** (In dev this is partly masked — Vite pre-bundles
glass-ui into one optimised dep: I measured `@mkbabb_glass-ui.js?v=a019c022` as a single request on
`/#/admin/names`. The production `gh-pages` build is where the 66-module graph is real.)

Reproduction:
```
$ for d in demo/ui/*/; do echo "--- $(basename $d)"; grep -v '^//' $d/index.ts; done
$ python3 <transitive-closure over node_modules/@mkbabb/glass-ui/dist>   # numbers above
```

Cure: delete `demo/ui/` entirely; rewrite the ~50 importing sites to the glass-ui subpath. This is
the KISS reading (edict 3): the shim directory is a wrapper layer that "does not already exist" as a
concept — it exists only as indirection.

---

### L-6 — MAJOR — the async-list quad-state is transcribed six times; the missing module is an atom

Within this one file, the pending branch (`:24-73`) and the approved branch (`:75-118`) are the same
component twice:

```
$ diff <(sed -n '24,73p' AdminNamesPanel.vue) <(sed -n '75,118p' AdminNamesPanel.vue)
$ comm -12 <(sort p1) <(sort p2) | grep -c .
32
```

**32 of 44 lines identical (73%).** The delta is five substitutions: which list, which loading flag,
which error, which empty copy, which action buttons.

And the same `loading → error → empty → rows` ladder is written again in every sibling:

```
file                    Skeleton   <EmptyState>   variant="error"   lines
AdminNamesPanel            3            4               2           152
AdminFlaggedPanel          2            2               1           153
AdminTagsPanel             2            2               1           126
AdminAuditPanel            2            2               1           120
AdminUsersPanel            3            3               1           391
```

Six instances of one shape. The atom that is missing is not `AdminListItem` (which exists and is
correct) — it is the **state ladder above it**.

Mechanism: **the row anatomy was extracted; the async envelope around it was not.**

Reproduction: the diff/comm above.

Cure: `AsyncList.vue` in `demo/shared/ui/` (alongside `EmptyState.vue`, which it would own):

```vue
<AsyncList
  :state="pending"                       <!-- one discriminated union, see §3 -->
  :skeleton-rows="3"
  empty-message="No pending proposals."
  error-message="Couldn't load proposals."
  @retry="emit('retryPending')"
>
  <template #row="{ item }"> … </template>
</AsyncList>
```

This deletes ~95 lines from this file and ~200 across the cluster, and — critically — makes the
loading/error/empty *contract* single-homed, so a fix like L-11 lands once.

---

### L-7 — MAJOR — the pagination envelope is discarded; the queue silently truncates at 50

`demo/palettes/api/admin-colors.ts:21-27`:
```ts
export function getAdminQueue(token, limit = 50, offset = 0):
    Promise<PaginatedResponse<ProposedColorName>>
```
`demo/palettes/types.ts:125-130`:
```ts
export interface PaginatedResponse<T> { data: T[]; total: number; limit: number; offset: number }
```
`demo/palettes/useColorNameQueue.ts:40-41`:
```ts
const res = await getAdminQueue(token);
adminColorQueue.value = res.data;      // ← total, limit, offset dropped on the floor
```
```
$ grep -n "limit\|offset\|total" demo/palettes/useColorNameQueue.ts
(no output)
```

Meanwhile a pagination control **already lives in the same directory** and is already wired by two
of the three paginated admin surfaces:

```
$ grep -rn "PaginationBar" demo
demo/palettes/browser/admin/AdminAuditPanel.vue:83,102
demo/palettes/browser/admin/AdminFlaggedPanel.vue:126,144
```

`AdminNamesPanel` — the one with the *unbounded* corpus (a public proposal queue) — has none.

**Reproduction** (hypothesis-free; the arithmetic is in the source): with 51 pending proposals the
API returns `{data: 50 rows, total: 51, limit: 50, offset: 0}`; the panel renders 50 rows, the tab
label reads `Pending · 50`, and proposal 51 is unreachable through the UI with no affordance
suggesting it exists. Compounding: `useFilteredList` (`useColorNameQueue.ts:27-33`) filters
client-side over the loaded 50, so the "Search color names…" box silently searches one page.

Cure: keep the envelope. `useColorNameQueue` returns `{items, total, limit, offset}`; the panel
renders `<PaginationBar>` under each list exactly as `AdminAuditPanel:83` does; the search box moves
server-side or is labelled as page-local. Three-of-three consistency, one existing atom.

---

### L-8 — MAJOR — one global `searchQuery` ref serves five domains and three panes

`demo/palettes/usePalettePorts.ts:54`:
```ts
const searchQuery = ref("");
```
Consumed at `:65` (browse), `:68` (admin users), `:69` (color-name queue), `:112` (saved palettes),
and re-exported three times (`:141`, `:183`, `:224`).

Bound by `v-model` in three different panes:
```
demo/palettes/PalettesPane.vue:34   v-model="pm.searchQuery.value"
demo/palettes/BrowsePane.vue:11     v-model="pm.searchQuery.value"
demo/palettes/admin/AdminPane.vue:13 v-model="pm.searchQuery.value"   (admin-users OR admin-names)
```

**Reproduction:** type `azure` into "Search color names…" on `/#/admin/names`, then navigate to
`/#/palettes`. The My Palettes search box is pre-filled with `azure` and the saved-palette grid is
filtered by it — a query scoped to a moderation queue leaks into a personal library. (The
server-side browse reload is guarded by `usePaletteWiring.ts:173` `currentView === "browse"`, so no
stray network request fires; the *state* leak is unguarded.)

Mechanism: **"the search query" was modelled as one concept because it is one word, not because it
is one thing.** Five independent corpora share one cursor.

Cure: `useSearchQuery()` scoped per corpus. `usePalettePorts` hands each sub-composable its own ref;
the panes bind their own. Five refs, zero cross-talk, and the admin panel gets to own its filter
instead of borrowing the browse feature's.

---

### L-9 — MAJOR — the error channel is an untyped string across four layers; measured 443 chars in a 255px block

The `pendingError?: string | null` prop (`:138`) is the terminus of a four-hop plain-string relay:

```
demo/platform/transport/availability.ts:123  builds the message
demo/palettes/useColorNameQueue.ts:44        queueLoadError.value = e?.message ?? "Backend unreachable"
demo/palettes/admin/AdminPane.vue:50         :pending-error="pm.queueLoadError.value"
demo/palettes/browser/admin/AdminNamesPanel.vue:34  :detail="pendingError"
```

`EmptyState.vue` documents `detail` as "the machine truth in Fira". Live measurement, Playwright on
`http://localhost:9000/#/admin/names` (dev server, admin token present):

```json
{ "detailLen": 443, "detailH": 255, "plateH": 445, "cardH": 693, "cardW": 512 }
```

The 443-character payload is:

> "value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is targeting the
> cross-origin production API (https://api.color.babb.dev), whose CORS allow-list excludes
> localhost — every palette request will be blocked. Run `npm run dev` (the full local stack via
> scripts/dev.sh up) instead of `npm run dev:web-only`, or set VITE_API_URL to a reachable,
> CORS-permissive backend. This is a dev-config error, NOT \"backend offline\"."

A **255px operator runbook** rendered inside a 445px error plate in a 693px card. It is good text; it
is addressed to a developer and the panel has no way to know that. The type `string | null` cannot
express audience, severity, retryability, or category, so the panel cannot triage — a 500, a 401,
and a local-env misconfiguration all arrive as the same shape and all render identically.

Reproduction: `npm run dev:web-only`, set `localStorage['palette-admin-token']` to any value,
navigate to `/#/admin/names`, wait ~2s, read `[role="alert"]`.

Cure: a discriminated `LoadError` in `demo/platform/transport/` —
`{ kind: "config" | "auth" | "network" | "server", message: string, retryable: boolean }` — carried
intact to the panel. `kind: "config"` never renders to a user surface; it goes to the console and
the panel shows "Couldn't load proposals." (which is what `docs/tranches/V/megatranche/audit/
om-15-text/TEXT-CONTRIVANCE-AUDIT.md:62` already ruled REDUCE for this exact string).

---

### L-10 — MAJOR — authorization has three partial homes and no owner; the panel renders for anyone

Three mechanisms each own a slice of "is this person an admin", and none owns the whole:

1. **Router metadata — dead.** `demo/color-picker/router/index.ts:30-34` declares
   `meta: { admin: true }` on all five admin routes.
   ```
   $ grep -rn "meta.admin\|beforeEach\|beforeResolve" demo --include="*.ts" --include="*.vue"
   (no output)
   ```
   Zero navigation guards exist. The metadata is never read.
2. **Silent early-return — a masking fallback.** `useColorNameQueue.ts:36-37`:
   ```ts
   const token = getAdminToken();
   if (!token) return;                 // no error, no loading flag, no signal
   ```
   Identical at `:52-53`, `:69-70`, `:82-83`, `:93-94`. Five sites.
3. **Logout redirect only.** `usePaletteWiring.ts:167-171` watches `isAdminAuthenticated` and
   redirects *on transition to false*. Direct URL entry while unauthenticated never transitions.

Consequence, from the committed visual matrix — an unauthenticated visitor at `/#/admin/names`:

`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-names.png` shows the
dock's **"Login"** button (i.e. not authenticated) beside a fully-furnished moderation console
reading **"Pending · 0 / Approved · 0"** and **"· QUEUE CLEAR · / No pending proposals."**
`safari-mobile-dark/admin-names.png` shows the same. `REPORT.json` records `pageErrors: []`,
`consoleErrors: []` for all four matrices — the app considers this a success.

The panel is not merely exposed; it **asserts a false fact**. "Queue clear" is the report of a
moderator who checked. Nobody checked.

Mechanism: **`if (!token) return` collapses a fourth state (`unauthorized`) into the third
(`empty`)** — a masking fallback, edict 2.

Cure: one owner. A `beforeEach` guard reading `to.meta.admin` against `useAdminAuth().isAuthenticated`
that redirects to `/`. Then the five early-returns in `useColorNameQueue` become unreachable and are
deleted, and the `unauthorized` state never has to be modelled in the panel at all — which is the
elegant outcome: the state disappears rather than being handled.

---

### L-11 — MAJOR — the tab counts and the panel body are two owners of one number, and they contradict each other on screen

`AdminNamesPanel.vue:19-20` computes the tab labels from the item arrays:
```vue
{ label: `Pending · ${pendingItems.length}`, value: 'pending' },
{ label: `Approved · ${approvedItems.length}`, value: 'approved' },
```

The parent explicitly refuses to do this, six lines of comment explaining why —
`AdminPane.vue:120-128`:
> "A-3: suppress the badge while the roster/queue loads — a **'0' over the loading skeletons lies**
> (the length is 0 before data arrives)."
```ts
case "admin-names":
    return pm.loadingColorQueue.value ? null : pm.filteredColorQueue.value.length;
```

The panel re-commits, unguarded, the exact lie the parent cures. **Live proof of the contradiction**
(same probe as L-9, same instant):
```json
{ "tabs": ["Pending · 0", "Approved · 0"],
  "alerts": ["…", "The proposal queue is unreachable. …Retry"] }
```
The strip says the queue holds zero items while the body says the queue could not be read. Both are
this component's output; they disagree.

Second head of the same defect: the labels count `pendingItems` / `approvedItems`, which
`AdminPane.vue:46-47` binds to `pm.filteredColorQueue` / `pm.filteredApproved` — the **search-filtered**
lists. Type `z` in the search box and "Pending · 12" becomes "Pending · 0" with a full backlog behind
it. Combined with L-7, the number is "matches in the loaded first page", presented as the queue depth.

Cure: the count is one concept and belongs to the state layer. `useColorNameQueue` exposes
`pendingCount: Ref<number | null>` (null while loading or errored, `total` from the envelope
otherwise, per L-7); `AdminPane` and the tab strip both read it. One number, one home, no way to
disagree.

---

### L-12 — MAJOR — the demo's declared value.js public surface does not match the published one; the dogfood proof is written against a surface that does not exist

`package.json#exports` (the real, published surface — 7 keys, **no `.` root**):
```
./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
```

`tsconfig.demo.json:42-49` (the demo's declared view — 8 keys), with its comment at `:37-41` calling
it "the bare `.` root + the 7 subpath barrels … the `exports` map is a **CLOSED 8-key set**":
```
@mkbabb/value.js            → ./dist/index.d.ts             MISSING   ← phantom
@mkbabb/value.js/color      → ./dist/subpaths/color.d.ts    exists
@mkbabb/value.js/parsing    → ./dist/subpaths/parsing.d.ts  MISSING   ← phantom
@mkbabb/value.js/math       → exists
@mkbabb/value.js/easing     → exists
@mkbabb/value.js/units      → ./dist/subpaths/units.d.ts    MISSING   ← phantom
@mkbabb/value.js/transform  → exists
@mkbabb/value.js/quantize   → exists
                              (/value and /css are REAL exports and absent from this list)
```

Three phantom keys, two real keys missing, and the sets are only 5/8 aligned. `src/index.ts` does
not exist; `dist/index.*` does not exist.

**Proven against a real consumer.** I built a throwaway package outside the repo, symlinked the
checkout in as `node_modules/@mkbabb/value.js`, and resolved through Node's own exports algorithm:

```
$ node t-root.mjs        # import * as v from "@mkbabb/value.js"
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in
  …/node_modules/@mkbabb/value.js/package.json

$ node t-color.mjs       # import * as v from "@mkbabb/value.js/color"
COLOR OK 23

$ node t-parsing.mjs     # import * as v from "@mkbabb/value.js/parsing"
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]
```

Now the load-bearing consequence. `demo/shared/utils.ts:8-17` justifies the demo owning a private
copy of `debounce` and closes with:

> "the library's **root-barrel export stands for external consumers**."

It does not. There is no root barrel. An external consumer writing
`import { debounce } from "@mkbabb/value.js"` gets `ERR_PACKAGE_PATH_NOT_EXPORTED`, as proven above.

The demo exists to be the dogfood proof of the public API (`tsconfig.demo.json:38`: "the T.W1
demo-dogfood keystone"). A proof whose ledger lists three exports that cannot be imported and omits
two that can is not a proof.

*Why nothing has broken yet:* TS Bundler resolution self-references the repo's own `package.json`
when `paths` misses, so `@mkbabb/value.js/css` resolves correctly despite being absent from `paths`
(`tsc --traceResolution`: "Found 'package.json' at /Users/mkbabb/Programming/value.js/package.json
… Using 'exports' subpath './css'"). The `paths` block is therefore **almost entirely redundant** as
well as partly false — self-reference already does the whole job.

Cure: delete the `@mkbabb/value.js*` entries from `tsconfig.demo.json` `paths` and let package
self-reference resolve them — then the type program reads the *same* `exports` map the runtime alias
is generated from (`vite.config.ts:37-49`), and drift becomes structurally impossible, which is
exactly the property `vite.config.ts:28-29` already claims for the runtime side ("GENERATED (not
hand-rolled) so the alias set can never drift"). Correct `demo/shared/utils.ts:16-17` or add a `.`
root export — but pick one, do not leave the comment asserting the other.

---

### L-13 — MINOR — the current build emits 25 duplicate type declarations into a published subpath under an unchanged version number

`package.json` version is `4.0.0`, unchanged. A published `4.0.0` sits in `node_modules/@mkbabb/value.js`.
Comparing it to what HEAD's `dist/` currently produces:

```
$ for f in color value css easing math transform quantize; do cmp -s dist/subpaths/$f.d.ts \
    node_modules/@mkbabb/value.js/dist/subpaths/$f.d.ts && echo "$f SAME" || echo "$f DIFFERS"; done
color SAME · value SAME · css **DIFFERS** · easing SAME · math SAME · transform SAME · quantize SAME

$ grep -c "_2\b" dist/subpaths/css.d.ts                                → 25
$ grep -c "_2\b" node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts  → 0
$ ls -la … → 12,490 B (local, Jul 27)  vs  10,910 B (published 4.0.0, Jul 17)
```

The delta is `Alpha_2`, `Channel_2`, `ChannelsBySpace_2`, … — the dts rollup is pulling the same
`Color` type graph in through two module paths and *renaming* rather than deduplicating. 1,580 bytes
of duplicated nominal types in the `css` subpath's public surface.

Two findings in one: (a) the rollup has a dedup defect in `src/subpaths/css.ts`'s closure, and (b)
the published artifact and the repo's build of the same version number are not byte-identical — a
version-immutability break.

Reproduction: the three commands above.

Cure: find the double reach (`src/css/index` pulls `src/color/index` types through both a direct and
a re-exported path) and collapse it to one. `AdminNamesPanel` does not consume this today, but L-14
proposes that it should.

---

### L-14 — MINOR — the component paints untrusted CSS colour with none of the colour library it ships beside

`AdminNamesPanel.vue:46` and `:96`, identical:
```vue
<div class="w-8 h-8 rounded-full border border-card-edge" :style="{ backgroundColor: item.css }" />
```
`:52` and `:102`, identical:
```vue
<span class="text-mono-small text-muted-foreground truncate">{{ item.css }}</span>
```

`item.css` is a user-submitted string from a public `/colors/propose` endpoint
(`demo/color-session/color-names.ts:35-44`), replayed straight into a style binding and a readout.
`@mkbabb/value.js/css` exports exactly the two functions this wants —
`parseCssColor` and `serializeCssColor` (`src/subpaths/css.ts:36-56`) — and the component imports
neither. Zero value.js imports in the file.

Consequence: a malformed literal produces a transparent 32×32 hole with a border and no signal — the
reviewer approves a name whose colour they never saw. A `color(display-p3 …)` on a non-P3 display
paints unclamped. `docs/tranches/V/megatranche/audit/om-14-formatting/FORMAT-AUDIT.md:99-100` already
files rows A17/A18 against `:52`/`:102` as **RAW-12** — raw 12-char stored strings where a canonical
readout belongs.

This is the ownership inversion the challenge asks about, in its purest form: the moderation panel
hand-rolls "trust the string" while the library in the same repository owns "is this a colour, and
what does it canonically read as".

*Caveat, and it matters:* project memory records `R1 = live parseCssColor("oklch()") shipping crash`
from the V·π parser proof gate. The library function is not currently safe to call on adversarial
input. That does not move the ownership — it makes it urgent, because the *demo* is presently the
only thing shielding the app from a library defect, and it is shielding it by not calling the library.

Cure (after V·π lands): `useColorNameQueue` validates on ingest — `parseCssColor(item.css)` — and the
DTO the panel receives carries a parsed, canonical value plus a validity flag. Invalid proposals
render a struck swatch and cannot be approved. The panel goes back to being markup.

---

### L-15 — MINOR — `namesTab` is untyped view state, and the one admin view state that is not routable

`AdminNamesPanel.vue:151`:
```ts
const namesTab = ref<string>("pending");
```

`string` over a closed two-value set. A typo in the template's `v-if="namesTab === 'pendign'"`
compiles.

Structurally more interesting: its five sibling admin views are **routes**
(`router/index.ts:30-34`, `/admin/users`, `/admin/names`, `/admin/audit`, `/admin/flagged`,
`/admin/tags`), each with a `ViewId` in `demo/shell/viewSchema.ts:46,60,197`. Pending-vs-approved is
the same kind of state at one level deeper and is the only one held in a component-local ref. It is
not linkable, not restorable on reload, and not reachable from the dock.

Cure: `ref<"pending" | "approved">`, minimum. Properly: `/admin/names/pending` and
`/admin/names/approved`, which also gives L-7's pagination a place to live in the URL and lets the
data layer load *the tab you asked for* instead of both eagerly
(`usePaletteWiring.ts:152-153` currently fires both on view entry regardless of tab).

---

### L-16 — MINOR — same glass-ui primitive, two idioms, one of them reallocating

`AdminNamesPanel.vue:18-21` builds the options array as a template literal:
```vue
:options="[
    { label: `Pending · ${pendingItems.length}`, value: 'pending' },
    { label: `Approved · ${approvedItems.length}`, value: 'approved' },
]"
```
A fresh array + two fresh objects on every render of the panel, feeding a child's prop — a guaranteed
child re-render on any parent update, including ones that change neither count.

`demo/shell/PaneSegmentedControl.vue:30-33` — the same primitive, three files away — uses a
`computed`. Two idioms for one primitive, and the more careful one is not the one in the more
frequently-updating component.

Cure: `computed`. Or, per L-11, take the labels from a single count source and the array becomes
stable by construction.

---

### L-17 — MINOR — a design-system variant lives as `:deep()` inside one demo consumer

`demo/shell/PaneSegmentedControl.vue:36-51` carries the segmented strip's **mobile compaction** —
tab padding + caption type rung below 639px — as a scoped `:deep(.segmented-tab)` override, reaching
into glass-ui's internal class. Its own comment calls it "the **ROOT-LEVEL** compact variant … the
control compacts AT THE ROOT (never per-instance)".

It is not at the root. It is at one instance. Three demo sites use `SegmentedTabs`:

```
demo/shell/PaneSegmentedControl.vue:6     ← gets the compaction
demo/workbenches/mix/MixSourceSelector.vue:105  ← does not
demo/palettes/browser/admin/AdminNamesPanel.vue:14  ← does not
```

Two of three sites, including this one — whose labels (`Pending · 0` / `Approved · 0`) are longer
than the dock's — render at 390px with default padding and no compaction. Edicts 4 and 5 both point
the same way: a responsive variant of a design-system primitive belongs in glass-ui, expressed as a
prop or a token, reachable by every consumer.

Cure: relay to glass-ui (per the standing BH/BI relay edict) — `SegmentedTabs` gains a `density`
prop or compacts on container width at its own root. Delete the `:deep()`.

---

### L-18 — MINOR — `EmptyState` is a four-area design primitive homed outside the design system

```
$ grep -rl "EmptyState" demo --include="*.vue" --include="*.ts" | wc -l
12
```
Consumers span four areas: `palettes/` (7 files incl. this one at `:129`), `workbenches/mix/`,
`scenes/about/markdown/`, `color-picker/ErrorBoundary.vue`. It owns two ratified design species
(empty vs error, "SYNTHESIS §2.4"), a certified de-emphasis rung (`--ink-muted`), and the
owner-ruled ghost-trio register (R12/t33-audit-08). Its own scoped comment says "This is the **ONE
shared empty atom** (8 consumers incl. the admin walls), so every consumer inherits the cure."

That is a design-system primitive by every test. It lives at `demo/shared/ui/EmptyState.vue`.
glass-ui 7.0.0 ships 74 export keys and none is an empty-state
(`python3 -c "…json.load(open('node_modules/@mkbabb/glass-ui/package.json'))['exports']"`).

Edict 4 is explicit: "add variants/primitives **there**, not in demo/ui/". The letter says `demo/ui/`;
the spirit is any demo home. Note this is *not* the KISS violation of edict 3 — `demo/shared/ui/`
already exists and holds exactly two files, so nothing new is being invented; the defect is that the
concept never got relayed upward.

Cure: relay `EmptyState` to glass-ui as `@mkbabb/glass-ui/empty-state`, carrying both species and
the `--ink-muted` thread. Twelve consumers change one import line; `demo/shared/ui/` keeps
`PaneHeader.vue` and the demo stops owning a primitive.

---

### L-19 — INFO — the state layer types itself on a view component (this file is the negative witness)

`demo/palettes/useAdminUsers.ts:14`:
```ts
import type { AdminUsersPanel } from "./browser/admin";
```
A composable importing a *component* to type a template ref — features depend on shared, never the
reverse; here the state layer depends on the view. This is precisely the inversion the dead
`G-DEMO-3a` rule (`eslint.config.js:288-292`) was written to prevent, and it is unenforced for the
same reason as L-1.

Recorded because it is the sibling defect and it bears on §3's lattice. **`AdminNamesPanel` is clean
of it** — it exposes no `ref` upward, holds no template ref, and `AdminPane.vue:134` carries the
`adminUsersPanelRef` for the *other* panel only. Credit where due.

---

## 3. The greenfield lattice

Structuring this today, with no legacy. The organising principle: **one concept, one home, and the
directory name is the concept**. "Color-name moderation" is a domain. It is not a browse concern, not
a color-session concern, and not five files in three areas.

```
demo/
├── shared/ui/                      ← cross-area atoms with no domain
│   ├── PaneHeader.vue
│   └── AsyncList.vue               ← NEW (L-6): owns loading → error → empty → rows.
│                                      Six current transcriptions collapse into this one.
│                                      EmptyState is not here — it relays to glass-ui (L-18).
│
├── platform/transport/
│   └── errors.ts                   ← NEW (L-9): LoadError discriminated union.
│                                      { kind: "config"|"auth"|"network"|"server",
│                                        message, retryable }.  kind:"config" never
│                                        reaches a user surface — it is a console concern.
│
└── color-names/                    ← NEW AREA. The whole domain, one home.
    ├── types.ts                    ← ProposedColorName + ModerationQueue<T>
    │                                  (moved out of color-session — L-3b; the measured
    │                                   fan-in was 4:2 toward the moderation side)
    ├── api.ts                      ← public read/propose  +  admin queue/approve/reject/delete
    │                                  (today: color-session/color-names.ts AND
    │                                   palettes/api/admin-colors.ts, the latter also
    │                                   carrying unrelated tag CRUD — split that out)
    ├── useNameQueue.ts             ← ONE state machine. Owns:
    │                                  · its OWN searchQuery (L-8), not the global one
    │                                  · the pagination envelope, intact (L-7)
    │                                  · a single AsyncState<T> per list:
    │                                      | { s:"loading" }
    │                                      | { s:"error", e: LoadError }
    │                                      | { s:"ready", items: T[], total, limit, offset }
    │                                    — the `unauthorized` state does not exist here,
    │                                      because the route guard makes it unreachable (L-10)
    │                                  · counts: Ref<number|null>, the ONE count (L-11)
    ├── NamesPane.vue               ← header + search + the tab strip.  Replaces AdminPane's
    │                                  admin-names branch; the other four sub-views get their
    │                                  own panes and AdminPane's two switch() ladders die.
    └── NameQueueList.vue           ← ~40 lines: <AsyncList :state="…"> + the row template.
                                       Today's 152 → ~40, and the pending/approved branches
                                       become one component instantiated twice.

demo/ui/                            ← DELETED (L-5). Every site imports @mkbabb/glass-ui/<subpath>.
demo/palettes/browser/index.ts      ← DELETED (L-2). Zero importers.
demo/palettes/browser/admin/        ← DISSOLVED (L-3a). The five panels go to five domain areas
                                       (color-names/ · users/ · audit/ · flagged/ · tags/);
                                       AdminListItem/AdminListSkeleton/PaginationBar go to
                                       shared/ui/ as AsyncList's row vocabulary.
```

**Dependency direction, stated once and enforceable:**

```
shell/ ──▶ <domain areas> ──▶ shared/ui/ ──▶ glass-ui
                │
                └──────────▶ platform/ ──▶ @mkbabb/value.js/<subpath>
```

No arrow ever points left. Three concrete consequences:

1. **`color-picker/composables/usePaletteWiring.ts:152-153` disappears.** Today the app-root *boot*
   layer knows that the names view needs two specific lists and eagerly loads both. In the lattice
   the pane owns its own load-on-mount, per tab (L-15), and boot knows nothing about moderation.
2. **`usePalettePorts.ts` (275 lines, 5 domains, 1 shared search ref) dissolves into per-domain
   composables.** It is a god module by the standing definition and every domain currently reaches
   it through a single injected `ADMIN_PORT_KEY` (`AdminPane.vue:95`) — one key for five unrelated
   feature states.
3. **The eslint boundary becomes expressible again.** With areas as directories, the rule is one
   line per area — "nothing outside `demo/<area>/` may import `demo/<area>/**/*.vue`" — and it does
   not depend on a path alias that a future restructure will delete out from under it (L-1's
   mechanism, which will otherwise recur).

**Cost of the transposition,** honestly: ~14 files move, ~50 import sites rewrite (mostly the
`demo/ui/` deletion, mechanical), one glass-ui relay (`EmptyState`, plus the `SegmentedTabs` density
variant from L-17). Net line count falls — L-6 alone removes ~300 lines across the cluster and
`usePalettePorts`'s 275 lines of forwarding largely evaporate. The win is not the lines; it is that
after the move, **L-2, L-3, L-8, L-11 and L-19 become inexpressible**, and L-1's mechanism cannot
recur.

---

## 4. Negative results — checked, found sound

Recorded so the absence is evidence, not silence.

- **`verbatimModuleSyntax` (edict 8): clean.** The one type-only import at `:127` is `import type`.
  The other seven are genuine value imports.
- **`@mkbabb/glass-ui/tabs` (`:124`) is exactly right** — the published subpath, not the root barrel,
  not a demo shim. The file demonstrates the correct idiom one line above the incorrect one.
- **No deep-`src/` reach.** `grep "@src\|src/" AdminNamesPanel.vue` → 0. The T.W1 dogfood keystone
  holds *for this file*: it consumes no library internals. (The published-surface defect is L-12,
  upstream of it.)
- **`AdminListItem` is a correct atom** — pure slots, no data knowledge, verified independently at
  `docs/tranches/V/megatranche/audit/om-16-palette-scalability/SCALABILITY-AUDIT.md:54`
  ("slot-only, `AdminListItem.vue:13-15`"). The `min-w-0` chain at `:13`, `:20` and this file's
  `:13`, `:24`, `:43`, `:75`, `:93` is a genuine, correctly-diagnosed cure for the grid
  min-content blowout, not cargo cult. `overflowX: 0` on all four visual matrices confirms it holds.
- **No god module here.** 152 lines, one responsibility, five emits, no business logic, no fetch, no
  store. The god module is upstream (`usePalettePorts.ts`, 275 lines / 5 domains); this file is a
  victim of it, not a contributor.
- **No local reimplementation of a removed shared utility.** The named historical suspects were
  checked and are absent: no `useLayerTransition` clone (`grep` → 0), no `useDark` (→ 0), no
  `export.ts`/serializer duplication (→ 0), no `cn()` (→ 0 in this file).
- **No animation was deleted.** `<Transition` count is 0 — but there was never one here to remove.
  This is a *design* gap (already filed as `DESIGN-CANON-BRIEF.md:97` F034-b RED, and
  `design-canon-census.md:470` M-16), not an edict-6 violation. Recorded so the two are not conflated.
- **The visual matrix is clean of this component's own defects.** All four
  `admin/names` rows: `overflowX 0`, `pageErr 0`, `consoleErr 0`, `namelessButtons 0`, `imgNoAlt 0`.
  The four small tap targets in `REPORT.json` (22×22 "Switch to slug" / "Generate new slug" /
  "Cancel", 160×23 input) belong to `PaletteSlugBar`, not to this panel. The panel's own action
  buttons are not on screen in any captured state — every capture is the empty/error plate, which is
  itself the L-10 finding.

---

## 5. Family grouping

The fifteen defects reduce to five mechanisms:

| family | mechanism | findings |
|---|---|---|
| **Declared-not-enforced** | a boundary asserted in prose whose enforcement points at a renamed or deleted tree | L-1, L-2, L-10, L-12, L-17 |
| **Wrong home** | a concept placed by its name rather than by its measured fan-in | L-3a, L-3b, L-18, L-19 |
| **Missing atom** | a shape transcribed N times because the module that owns it was never cut | L-5, L-6, L-7 |
| **Untyped seam** | a domain concept crossing a boundary as `string` / `ref<string>` / a bare array | L-9, L-11, L-15, L-16 |
| **Unowned concept** | logic sitting in the demo that the library owns, or vice versa | L-4, L-13, L-14 |

The first family is the one worth the owner's attention. It is not a coding defect — every one of
those five was *correct when written*. The failure mode is that a restructure moved the code and left
the guard behind, and nothing in the repository can detect that a guard has stopped matching
anything. A rule that matches zero files should be a build error.
