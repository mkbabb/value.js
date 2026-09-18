# CHALLENGE-L — library structure under `demo/palettes/admin/AdminPane.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

## Provenance

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD at audit time = `e39da983`**, not the `c654824e` named in the brief (`git log --oneline -1`
  → `e39da983 docs(V·mega): M-19 — glass execution HERALDED…`). Two commits landed after the brief
  was cut; neither touches `demo/`. Every line number below is against `e39da983`.
- Subject: `demo/palettes/admin/AdminPane.vue`, 135 lines.
- Live probe: dev server at `http://localhost:9000` (HTTP 200), driven read-only via Playwright.
  The browser is shared with other seats; I restored the app to `#/` and cleared the field I typed
  into.

## Verdict — **DEFECTIVE**

AdminPane is not a component. It is a **second router with a duplicate label table, wrapping a
prop-forwarding shell over an injection context its children already hold.** Every one of its 135
lines exists because a structural decision was made one layer up (`usePaneRouter.componentFor`
collapses 5 distinct `LeftPane` ids into 1 component) or one layer down (2 of its 5 panels take
props while the other 3 inject the identical port). Delete both decisions and the file's correct
length is zero.

Underneath it sits the real finding: **the `palettes/` module has no unique semantic ownership of
any of its three central concepts** — search state, admin data, and the design-system import route
each have two live homes.

**Strongest defect: L-1** — one `searchQuery` ref is exposed on three ports and `v-model`-bound by
three panes; typing in the admin search field verbatim rewrites the user's saved-palette filter.
Reproduced live, measured, pasted below.

---

## Findings

### L-1 · MAJOR · One `searchQuery` ref, three features, three `v-model`s

**Defect.** `usePalettePorts.ts:54` creates a single `const searchQuery = ref("")` and hands the
*same ref object* to the library port (`usePalettePorts.ts:141`), the browse port (`:183`) and the
admin port (`:224`). Three panes then `v-model` it: `AdminPane.vue:13`, `BrowsePane.vue:11`,
`PalettesPane.vue:34` — the identical `v-model="pm.searchQuery.value"` binding at all three. Three semantically disjoint search scopes
(admin roster · public wall · private library) share one term.

**Reproduction — run live, output pasted verbatim.** Typed into the admin roster field, then
navigated by hash; no reload:

```js
location.hash = '#/admin/users';                       // …wait 1200ms
setNative(input[placeholder="Search users..."], 'zzq-leak-probe');
location.hash = '#/browse';                            // …wait 1500ms
location.hash = '#/palettes';                          // …wait 1200ms
```
```json
{
  "adminUsersSearchValue": "zzq-leak-probe",
  "browseSearchValue":     "zzq-leak-probe",
  "palettesSearchValue":   "zzq-leak-probe"
}
```

**Mechanism.** Shared mutable state with no owner. `useFilteredList(savedPalettes, searchQuery, …)`
(`usePalettePorts.ts:112`) then filters the user's own library by a term they typed at a different
feature: after an admin visit, "My Palettes" renders empty until the field is manually cleared. The
same aliasing makes `usePaletteWiring.ts:157` (`watch(ports.browse.searchQuery, …)`) fire on admin
keystrokes — it is saved only by the `currentView === "browse"` guard inside the handler, i.e. by a
runtime check compensating for a structural mistake.

**Cure (transposition).** Search term is a property of *a list*, not of the palette domain. Each
list-owning composable declares its own `searchQuery` (`useAdminUsers`, `useColorNameQueue`,
`useBrowsePalettes`, `usePaletteStore`); `useFilteredList` already takes the ref as a parameter, so
this is a construction-site change, not a redesign. Zero shared refs survive; the
`currentView === "browse"` guard in the wiring watcher dies with it.

---

### L-2 · MAJOR · AdminPane forwards 12 bindings to a child that already injects the same port

**Defect.** `AdminUsersPanel.vue:234` reads `const pm = inject(ADMIN_PORT_KEY)!`. AdminPane injects
the *same key* at `AdminPane.vue:95` and then forwards, from that same object, 5 props and 7
handlers (`AdminPane.vue:28-40`):

| forwarded (AdminPane) | already reachable as (AdminUsersPanel) |
|---|---|
| `:users="pm.filteredAdminUsers.value"` | `pm.filteredAdminUsers` |
| `:loading="pm.loadingUsers.value"` | `pm.loadingUsers` |
| `:load-error="pm.usersLoadError.value"` | `pm.usersLoadError` |
| `:expanded-id="pm.expandedId.value"` | `pm.expandedId` |
| `:total-users="pm.adminUsers.value.length"` | `pm.adminUsers` |
| `@delete-user-palettes`, `@delete-user`, `@toggle-expand`, `@feature`, `@admin-delete-user-palette`, `@prune`, `@refresh` | `pm.onDeleteUserPalettes`, `pm.onDeleteUser`, `pm.toggleExpand`, `pm.onFeaturePalette`, `pm.onAdminDeleteUserPalette`, `pm.onPrune`, `pm.loadAdminUsers` |

All 12 targets are members of `adminPort` (`usePalettePorts.ts:195-231`). **12 of 12 are redundant.**

**Dual idiom, one file.** Of the five panels AdminPane renders, three inject the port and take no
props at all — `AdminAuditPanel.vue:107`, `AdminFlaggedPanel.vue:149`, `AdminTagsPanel.vue:122`, each
`inject(ADMIN_PORT_KEY)!` plus its own `onMounted(() => load…())` (`:119`, `:152`, `:125`). Two are prop-driven. The template
therefore encodes two contradictory answers to "who owns the port boundary" fifteen lines apart
(`AdminPane.vue:25-41` vs `:61-67`).

**Reproduction.** NONE — this is a structural finding, not a runtime failure. It is verified by
reading, not hypothesised: the injection at `AdminUsersPanel.vue:234` and the forwarding at
`AdminPane.vue:28-40` are both present in the shipped source.

**Cure.** Adopt the majority idiom the three self-sufficient panels already prove: panels inject
their own port slice, AdminPane's forwarding dies, and `AdminNamesPanel` (the one true prop-driven
panel, which does *not* inject) joins them.

---

### L-3 · MAJOR · The pane title table is a second copy of `VIEW_MAP`, and the prop union is a sixth copy of `ViewId`

**Defect.** `viewSchema.ts` opens by declaring itself "**the single source of truth** for `ViewId`,
the pane layout map (`VIEW_MAP`)…" and states it was extracted "to retire the 4-copy `ViewId`
enumeration that grew across the demo" (`viewSchema.ts:1-15`). Both claims are false at AdminPane:

| concept | schema home | AdminPane copy |
|---|---|---|
| the 5 admin view ids | `viewSchema.ts:45-49` | `AdminPane.vue:91` (inline union in `defineProps`) |
| `"Users"` | `viewSchema.ts:191` (`label`) + `:192` (`leftLabel`) | `AdminPane.vue:99` |
| `"Names"` | `viewSchema.ts:200-201` | `AdminPane.vue:100` |
| `"Audit Log"` | `viewSchema.ts:209` | `AdminPane.vue:101` |
| `"Flagged"` | `viewSchema.ts:218-219` | `AdminPane.vue:102` |
| `"Tags"` | `viewSchema.ts:226-227` | `AdminPane.vue:103` |

The screenshot confirms both tables are live and agree today:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-users.png` renders the
dock select reading **"Users"** (from `VIEW_MAP.label`) above a pane header reading **"Users"** (from
`AdminPane.headerTitle`). Two independent sources rendering the same word on one screen.

**Reproduction.** NONE (hypothesis for the divergence, certain for the duplication): renaming
`VIEW_MAP["admin-audit"].label` to `"Audit"` changes the dock and leaves the pane header saying
"Audit Log". Nothing structural prevents it — no type, no test, no lint.

**Cure.** `PaneConfig` gains `description: string` (it already carries `label`, `leftLabel`,
`rightLabel`, `icon`, `accentHueShift`). `PaneHeader` reads title + description from
`viewManager.currentConfig`. All nine panes stop hardcoding their own header strings
(`BrowsePane.vue:3`, `PalettesPane.vue:10`, `GradientPane.vue:21`, `MixPane.vue:75`,
`GeneratePane.vue:32`, `ExtractPane.vue:7`, `AboutPane.vue:15`, AdminPane's two switches). The
`subView` union becomes unnecessary; where a subset type is genuinely needed it is
`Extract<ViewId, \`admin-${string}\`>`, derived, never re-typed.

---

### L-4 · MAJOR · AdminPane is a second router; its own prop is untyped at the only call site

**Defect.** `usePaneRouter.componentFor` maps every left pane 1:1 to a component — except admin:

```
usePaneRouter.ts:80-92   if (name === "browse")   return BrowsePane;   … (9 exact matches)
usePaneRouter.ts:93      if (name.startsWith("admin-")) return AdminPane;
usePaneRouter.ts:140     if (name.startsWith("admin-")) return { subView: name };
```

`leftProps` returns `Record<string, unknown>` (`usePaneRouter.ts:64`), so the carefully-declared
5-member union at `AdminPane.vue:91` is **never checked at the only call site**. AdminPane then
re-dispatches the same string through five `v-if`s and two exhaustive `switch`es that have no
`default` for title/description (`AdminPane.vue:97-115`).

**Mechanism.** A prefix-matched string dispatch duplicating a registry that already exists one layer
up. The registry's own five entries (`viewSchema.ts:188-231`) each name a distinct `left` pane;
AdminPane exists only to undo that distinction and re-make it.

**Reproduction.** HYPOTHESIS — requires a 6th admin view. Add `"admin-reports"` to `ViewId` +
`VIEW_MAP`: `componentFor` routes it to AdminPane (prefix match), `leftProps` passes
`subView: "admin-reports"` (unchecked), every `v-if` misses, both `computed` switches fall off the
end returning `undefined` → a Card with a blank header and an empty body. No type error, no console
error, no test failure.

**Cure.** Register the five panels directly in `componentFor` — the same shape the other nine panes
already have. AdminPane deletes. The panels each render their own `Card` + `PaneHeader` exactly as
`BrowsePane.vue:2-3` does; three of the five already own their data lifecycle
(`AdminAuditPanel.vue:119`, `AdminFlaggedPanel.vue:152`, `AdminTagsPanel.vue:125`).

---

### L-5 · MAJOR · Two live import routes to the one design system, both used inside AdminPane

**Defect.** `AdminPane.vue` reaches glass-ui **two different ways in eight lines**:

```
AdminPane.vue:74   import { Card }  from "../../ui/card";        → demo shim → glass-ui ROOT barrel
AdminPane.vue:75   import { Badge } from "../../ui/badge";       → demo shim → glass-ui ROOT barrel
AdminPane.vue:87   import { SearchBar } from "@mkbabb/glass-ui/search";   → published subpath
```

`demo/ui/` holds **19 barrels, 18 of which are a single re-export line** (measured:
`for d in demo/ui/*/; do wc -l $d/index.ts; done` → all `1` except `alert` at `11`, whose 10 lines
are a comment explaining that its local implementation was already deleted). Example in full:

```ts
// demo/ui/card/index.ts — the entire file
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

**48 demo files** import through these shims (`grep -rl 'from "[^"]*\.\./ui/' demo/ | wc -l` → 48);
the same files import other glass-ui pieces by bare subpath (37 root + 15 `/dock` + 11
`/watercolor-dot` + 9 `/dark` + … ). This is an **alias layer / dual path** — standing edict 2, in a
tree whose own `demo/ui/alert/index.ts:1-8` records that the previous occupant of this directory was
already ruled a design-system violation.

**Measured cost of the shim route.** glass-ui 7.0.0's root entry is `dist/glass-ui.js` =
**25,239 bytes** which statically imports **43 distinct chunk files**
(`grep -oE '"\./[^"]+\.js"' glass-ui.js | sort -u | wc -l` → 43). The per-component subpaths are
one line each:

```
dist/card.js   = 217 bytes  → 1 chunk (card-Bk96VI2R.js)
dist/badge.js  =  92 bytes  → 1 chunk (badge-u65NClWn.js)
```

glass-ui declares `"sideEffects": ["*.css"]`, so the production build tree-shakes this away — the
cost is **dev-server and HMR only** (43 module fetches instead of 1, on every admin route, which is
`defineAsyncComponent`-loaded at `usePaneRouter.ts:76` and therefore paid on first admin
navigation). I state that honestly: this is a boundary defect first and a dev-performance defect
second, not a shipped-bundle regression.

**Cure.** Delete `demo/ui/` entirely; rewrite the 48 files' imports to the glass-ui subpath that
already exists for each (`./card`, `./badge`, `./button`, `./dialog`, `./input`, `./select`,
`./popover`, `./tooltip`, `./separator`, `./label`, `./switch`, `./slider`, `./collapsible`,
`./dropdown-menu` — all present in the 7.0.0 exports map, verified). One route to the design system,
no demo-side barrel to drift.

---

### L-6 · MAJOR · `adminPort` is a 34-member god object; the RF-15 dissolution redistributed the facade rather than dissolving it

**Defect.** `usePalettePorts.ts:22-30` states the file "dissolves the old `usePaletteManager` god
facade (153 L, ONE cross-everything injected blob) into FIVE narrow, feature-owned ports." Measured
member counts of the resulting objects:

```
adminPort  members: 34     (usePalettePorts.ts:195-231)
browsePort members: 32     (usePalettePorts.ts:157-192)
```

AdminPane touches **27 of adminPort's 34** (`grep -o "pm\.[a-zA-Z]*" AdminPane.vue | sort -u | wc -l`
→ 27). A 34-member injected object consumed 27-at-a-time by one component is the same object the
comment says was retired, at 22% of the line count.

The port is also not cohesive: it carries the colour-name queue (10 members, `usePalettePorts.ts:210-222`),
the audit/flagged/tags sub-facades (`:229-231`), *and* the users roster — four independent data
domains behind one symbol, because five panels happen to render under one route prefix.

**Reproduction.** NONE — measurement, not failure.

**Cure.** The sub-composables are already correct and already separate (`useAdminUsers`,
`useColorNameQueue`, `useAdminAudit`, `useAdminFlagged`, `useAdminTags`). Provide them under four
keys instead of one aggregate — `ADMIN_USERS_KEY`, `COLOR_QUEUE_KEY`, `ADMIN_AUDIT_KEY`,
`ADMIN_MODERATION_KEY` — each injected by exactly the panel that renders it. The aggregation step is
the only thing to delete; nothing needs writing.

---

### L-7 · MAJOR · A composable owns a component instance and calls methods on it; AdminPane exists partly to wire that inversion

**Defect.** `useAdminUsers.ts:27` declares
`const adminUsersPanelRef = ref<InstanceType<typeof AdminUsersPanel> | null>(null)` — a *composable*
holding a *component instance*. It calls into that instance at four sites
(`useAdminUsers.ts:99, 121, 136, 150`), and `usePalettePorts.ts:121-124` adds a fifth:

```ts
async function onPrune() {
    const pruned = await admin.onPruneEmpty();
    admin.adminUsersPanelRef.value?.onPruneDone(pruned);
}
```

The round trip is: `AdminUsersPanel` emits `prune` → `AdminPane.vue:39` calls `pm.onPrune` →
`usePalettePorts.onPrune` calls `admin.onPruneEmpty()` → then reaches **back into the emitting
component's instance** via a ref bound by a *third* component (`AdminPane.vue:134`,
`ref="adminUsersPanelRef"`) to deliver a number the emitter asked for. Three layers and an
`InstanceType` dependency to return an integer to its own caller. `AdminUsersPanel.vue:389`
`defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes })`
is the imperative surface that makes it possible.

**Two edict violations ride along.** (a) The `?.` at `usePalettePorts.ts:123` is a **masking
fallback** (edict 2): when `subView !== "admin-users"` the ref is null and the prune result is
silently discarded rather than surfacing. (b) `AdminPane.vue:134`
`const adminUsersPanelRef = pm.adminUsersPanelRef;` is the pre-3.5 exposed-variable template-ref
idiom — `useTemplateRef` (edict 7) **cannot** be used here, because the ref must be the composable's
object rather than one the component creates. The structure forbids the idiom.

**Reproduction.** NONE for a runtime break; the inversion is read directly from the five call sites.

**Cure.** Invert it back. `onPruneEmpty()` already returns the count; the panel awaits its own
action and updates its own state (`AdminUsersPanel.vue:303 onPruneDone` becomes a local function,
not an exposed one). `defineExpose` drops to empty, `adminUsersPanelRef` and the
`InstanceType<typeof AdminUsersPanel>` import both delete from `useAdminUsers.ts`, and the last
reason for `AdminPane` to hold a template ref disappears.

---

### L-8 · MINOR · Required prop `cssColorOpaque` on `AdminNamesPanel` is never read

**Defect.** `AdminNamesPanel.vue:140` declares `cssColorOpaque: string;` as a **required** prop.
`grep -rn "cssColorOpaque\|css-color" demo/palettes/browser/admin/AdminNamesPanel.vue` returns
exactly one line — the declaration. It appears in no template binding and no script expression.
`AdminPane.vue:52` supplies it (`:css-color-opaque="cssColorOpaque"`), which is one of the two
reasons AdminPane injects `CSS_COLOR_KEY` at `AdminPane.vue:94`.

**Reproduction.** `grep -c cssColorOpaque demo/palettes/browser/admin/AdminNamesPanel.vue` → `1`.

**Cure.** Delete the prop and the binding. (The other consumer is real: `AdminUsersPanel.vue:145`
forwards `cssColor` into `PaletteCard`.)

---

### L-9 · MINOR · `searchPlaceholder` has two implementations; the port's copy is dead

**Defect.** `usePalettePorts.ts:104-111` computes a `searchPlaceholder` — `"Search users..."` /
`"Search color names..."` / `"Search palettes..."` — and exports it on `adminPort`
(`usePalettePorts.ts:225`). AdminPane ignores it and inlines the same two strings as a ternary:

```
AdminPane.vue:15   :placeholder="subView === 'admin-users' ? 'Search users...' : 'Search color names...'"
```

`BrowsePane.vue:14` hardcodes a third (`"Search the commons..."`) that the port's `default` branch
does not even produce. `grep -rn searchPlaceholder demo/` → the definition and the port export only;
**zero consumers**.

**Reproduction.** NONE — dead code plus a duplicate, both read directly.

**Cure.** Delete `searchPlaceholder` from the port. A placeholder is a property of the field, which
is a property of the panel that owns the list (see L-1 and L-2): it belongs in the panel's template,
once.

---

### L-10 · MINOR · The header badge means two different things in one `computed`, and duplicates a number the panel already renders

**Defect.** `AdminPane.vue:117-131`:

- `admin-users` → `pm.adminUsers.value.length` — the **unfiltered** roster.
- `admin-names` → `pm.filteredColorQueue.value.length` — the **filtered** queue, with the
  `S.W5-7 (F-12)` comment stating the rule is "the badge is the ACTIONABLE queue — the old sum
  matched neither visible list."

The users branch violates the rule the names branch documents: with a search term active the list
shows the filtered rows (`:users="pm.filteredAdminUsers.value"`, `AdminPane.vue:28`) while the badge
reports the total. Additionally `AdminUsersPanel.vue:9` renders `{{ totalUsers }} user(s)` from the
prop AdminPane forwards — so the same number is painted twice, six lines apart in the DOM. Visible in
`shots/safari-desktop-light/admin-users.png`: a `0` badge beside the "Users" heading and `0 users`
immediately below it.

**Reproduction.** Type any non-matching term in the admin users field: rows → 0, badge → N.
(Untestable end-to-end here — the roster is empty against this dev API; the divergence is read from
`AdminPane.vue:122` vs `:28`.)

**Cure.** The count is the panel's; the panel already renders it. Delete the badge, or make it
`filteredAdminUsers.length` and delete the panel's line — one of the two, never both.

---

### L-11 · MINOR · The feature's declared "top-level seam" has zero importers, and the lint that enforces it is a no-op

**Defect.** `demo/palettes/browser/index.ts:1-8` declares itself "the mega-feature's **TOP-LEVEL
SEAM** … External consumers reach the feature through THIS seam … the G-DEMO-3b boundary
(eslint.config.js) enforces it standing." Measured:

```
$ grep -rn 'from "\./browser"\|from "\.\./browser"' demo/
(no output)
```

Zero importers. Every consumer, AdminPane included, reaches the sub-barrels
(`AdminPane.vue:85` `from "../browser/admin"`, `:86` `from "../browser/search"`).

The enforcement is also dead. `eslint.config.js:232-255` scopes the rule to
`demo/color-picker/**`, `demo/@/components/**`, `demo/@/lib/**` and bans the pattern
`@components/custom/palette-browser/**/*.vue`. But `ls demo/@` → *No such file or directory*, and
`vite.config.ts:69-72` records that "W43 (RF-15) killed the demo `@…` path aliases". The banned
specifier cannot be written and the guarded directories do not exist; `demo/palettes/**` is not in
the glob at all. `npx eslint demo/palettes/admin/AdminPane.vue` → clean, as it would be for any
import whatsoever.

**Reproduction.** Commands above. No *current* violation exists
(`grep -rn 'browser/[a-z]*/[A-Za-z]*\.vue"' demo/ | grep -v '^demo/palettes/browser/'` → empty), so
the invariant holds **by convention only**.

**Cure.** Either delete the unused seam and the stale rule (honest: sub-barrels are the real API), or
re-aim the rule at `demo/**` banning `demo/palettes/browser/*/*.vue`. Do not keep a barrel nobody
imports guarded by a lint that cannot fire.

---

### L-12 · MINOR · The "pane shell" is a concept with no home: 9 hand-copies, and `PaneHeader` owns an unscoped style for a class it never applies

**Defect.** `AdminPane.vue:2` is:

```html
<Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

Nine panes repeat this by hand, with three gratuitous variants (`mx-auto` present in 3 of 9,
`relative` in 1, `flex-1` in 1): `AdminPane.vue:2`, `BrowsePane.vue:2`, `PalettesPane.vue`,
`AboutPane.vue`, `GradientPane.vue`, `MixPane.vue`, `GeneratePane.vue`, `ExtractPane.vue`,
`ConfigSliderPane.vue`. Six utility classes on the design-system root at every call site is
per-instance styling of a glass root — standing edict 5.

Worse, the CSS for that class lives in the **header**: `PaneHeader.vue:54-57` defines
`.pane-scroll-fade` in an **unscoped** `<style>` block, and `PaneHeader.vue:43-52` documents exactly
why it must be unscoped — "the class is applied across siblings of PaneHeader (not its
descendants)". A component styling its own siblings' root element is a producer/consumer inversion
stated in a comment instead of fixed.

**Reproduction.** NONE — read from the ten sites listed.

**Cure (glass-ui, not demo).** "Card + sticky scroll-driven header + named scroll-timeline host" is a
design-system primitive, and glass-ui 7.0.0 already ships every ingredient (`./card`, `./surface`,
`./fading-scroll`, `./scroll-progress-rim`, the `SURFACE_TIERS` ladder). Ask glass-ui for `Pane`
(root + `header` slot, `tier` on the ladder). That satisfies edict 4 (variants live in glass-ui) and
avoids the demo-side wrapper that edict 3 forbids. Interim, if glass-ui declines: the class string
becomes one `.pane-shell` rule in `demo/styles/`, applied at nine sites — never six utilities copied
nine times.

---

### L-13 · MINOR · `.search-seated` is a per-instance override of a glass-ui component, ×3, and the booked cure did not land in 7.0.0

**Defect.** `AdminPane.vue:14`, `BrowsePane.vue:12` and `PalettesPane.vue:35` each apply
`class="search-seated"` to the glass-ui `SearchBar`. `demo/styles/utils.css:132-155` overrides
`background`, `backdrop-filter`, `border`, `box-shadow`, `max-width` and the descendant
`.input-bar-field` font — the component's entire material — from the consumer side, self-documented
at `utils.css:126-131` as an "INTERIM DEMO SEAT … BOOKED SWAP … dies onto glass-ui's P3 seated
field-chrome rung — GLASSUI-T-ASKS ASK-D (`variant="seated"`) at the adopt event."

**The adopt event happened and the ask did not land.** glass-ui 7.0.0 is installed and adopted
(W44/D58). Measured against the shipped types:

```
node_modules/@mkbabb/glass-ui/dist/components/search/searchVariants.d.ts
  VARIANT = { inline, bare, floating }     ← no "seated"
node_modules/@mkbabb/glass-ui/dist/components/search/SearchBar.vue.d.ts
  props: modelValue, placeholder, icon, tag, size, surface, variant
```

`SearchBar` *does* now carry a `surface` prop on the `SURFACES = ["glass","veil","opaque"]` axis
(`_shared/axes.d.ts:2`) — the design system grew a material axis while the demo kept overriding
material by class.

**Reproduction.** NONE — file contents.

**Cure.** Re-send ASK-D against 7.x with the measurement above (`variant: "seated"`, or confirm
`surface="opaque"` + a tier already expresses the seated rung). Delete `.search-seated` and the three
class attributes on landing. Until then this is a *tracked* interim, not an unknown — recorded here
so the mega-tranche does not lose it.

---

### L-14 · MINOR · `ViewId` has two import routes, kept alive by a source-compat re-export for a deleted alias

**Defect.** `viewSchema.ts:1-15` is the declared single source of truth. `useViewManager.ts:16-19`
re-exports its types with the comment: "Re-export the schema types so existing consumers that import
from `@composables/useViewManager` continue to resolve cleanly … this re-export preserves
source-compat with the pre-D.W3-Lane-D import paths." The `@composables` alias no longer exists
(`vite.config.ts:69-72`, W43 killed the demo `@…` aliases). Three files still take the shim route —
including AdminPane's own port module:

```
demo/palettes/usePalettePorts.ts:19            import type { ViewId } from "../shell/useViewManager";
demo/shell/dock/composables/useDockAdminMode.ts:5   import type { ViewId, ViewManager } from "../../useViewManager";
demo/color-picker/composables/boot/useAtmosphereBoot.ts:55  import type { PaneConfig } from "../../../shell/useViewManager";
```

while three others import from `viewSchema` directly. A back-compat shim (edict 2) preserving
compatibility with an alias that was deleted.

**Reproduction.** NONE — grep output above.

**Cure.** Delete `useViewManager.ts:16-19`; repoint the three importers at `./viewSchema`.

---

### L-15 · INFO · `demo/palettes/export.ts` vs `demo/palettes/export/` — a self-labelled legacy dual path where the tested implementation is not the shipped one

Named in the brief; confirmed. Not in AdminPane's import closure — recorded because the seat asks for
the `palettes/` module lattice.

- `demo/palettes/export.ts` — 132 lines, its own `slugify`, `exportAsJSON`,
  `exportAsCSSCustomProperties`, `exportAsTailwindConfig`, `exportAsSVG`, `exportAsPNG`.
- `demo/palettes/export/` — 12 modules, 941 lines, `serializeJson`/`serializeCss`/`serializeTailwind`/
  `serializeSvg`/`serializePng` over one immutable `ExportSnapshot`, with RFC-8785 canonicalisation
  and content digests.

A file shadowing a directory of the same name at the same level. `usePaletteExport.ts:9` imports
`from "./export"` — there is **no `export/index.ts`**, so this resolves to `export.ts`. The
directory's own barrel says so out loud (`export/serializers.ts:5-9`): "This module is intentionally
NOT named `index.ts`: the sibling **legacy** `../export.ts` (the pre-contract routed seat that W50
will replace) still resolves `./export`; the byte-exact set is addressed by its explicit paths here
so the two never collide."

Consumers: the app ships `export.ts` (`BrowsePane.vue:324`, `PalettesPane.vue:211` via
`usePaletteExport`); the byte-exact set is reached **only** by
`demo/test/export/byte-exact.test.ts:23`. **941 lines of tested, unshipped implementation beside 132
lines of shipped, untested implementation.** Edict 2 in the plainest terms, with a `W50` IOU attached.

**Cure.** Land W50 or delete one side. A specifier whose resolution depends on
file-before-directory precedence must not exist in this tree at all.

---

### L-16 · INFO · The published `exports` map has no root, but `tsconfig.demo.json` declares three specifiers that cannot resolve

Repo-level, reachable from the seat's mandate ("does it import from `@mkbabb/value.js` correctly").
AdminPane itself imports nothing from the library — its closure reaches it only via
`demo/palettes/export/png.ts:11` and `demo/palettes/mix.ts:14`, both correctly through published
subpaths.

`package.json#exports` has **7 keys and no `"."`**, and no `main`/`module`/`types`. Measured against
the installed 4.0.0 artifact:

```
$ node --input-type=module -e 'import("@mkbabb/value.js").catch(e=>console.log(e.code, e.message))'
ERR_PACKAGE_PATH_NOT_EXPORTED  No "exports" main defined in …/package.json
$ node --input-type=module -e 'import("@mkbabb/value.js/parsing")…'
ERR_PACKAGE_PATH_NOT_EXPORTED  Package subpath './parsing' is not defined by "exports"
$ node --input-type=module -e 'import("@mkbabb/value.js/units")…'
ERR_PACKAGE_PATH_NOT_EXPORTED  Package subpath './units' is not defined by "exports"
```

`tsconfig.demo.json` nevertheless declares TS `paths` for all three
(`"@mkbabb/value.js"`, `"@mkbabb/value.js/parsing"`, `"@mkbabb/value.js/units"`) and **omits two
that do exist** (`./value`, `./css` — the latter used 10× in the demo, resolving only because Vite's
generated alias set covers it). The Vite self-alias is generated from `package.json#exports`
(`vite.config.ts:44-51`), so it has no entry for those three either.

**Consequence — a false-green surface.** A demo file writing
`import { debounce } from "@mkbabb/value.js"` **typechecks** (the tsconfig path points at
`dist/index.d.ts`) and **fails to resolve** at dev and build. This is not theoretical: the demo's own
`shared/utils.ts:8-20` re-implements `debounce` locally and its comment states "the library's
root-barrel export stands for external consumers" — that root barrel is not exported to any external
consumer.

**Reproduction.** The three `node` invocations above, output pasted.

**Cure.** The tsconfig `paths` block must be *generated from* `package.json#exports`, exactly as the
Vite alias set already is (`vite.config.ts:44-51`) — one source, two consumers, no drift. Then decide
the root deliberately: either add `"."` to `exports` (and the demo may use it), or delete
`dist/index.*` and the root-barrel prose along with it.

---

## The greenfield lattice

Structured today with no legacy, `demo/palettes/` is four layers with one home per concept and no
aggregation step:

```
demo/palettes/
  domain/          types.ts · constants.ts · utils.ts          (no vue, no fetch)
  data/            usePaletteStore · useBrowsePalettes · useAdminUsers · useColorNameQueue
                   useAdminAudit · useAdminFlagged · useAdminTags · useVersionHistory · useTagEdit
                     ← each owns its OWN searchQuery/filter/loading/error  (kills L-1, L-9)
                     ← each provides itself under its OWN key              (kills L-6)
  export/          the byte-exact serializers; export.ts deleted           (kills L-15)
  panes/           BrowsePane · PalettesPane
                   AdminUsersPane · AdminNamesPane · AdminAuditPane
                   AdminFlaggedPane · AdminTagsPane
                     ← 5 sibling panes, registered 1:1 in usePaneRouter    (kills L-4, AdminPane)
                     ← each injects its own key, no props forwarded        (kills L-2, L-8)
                     ← each is a <Pane> with title/description from VIEW_MAP (kills L-3, L-12)
  parts/           card/ · search/ · dialog/ · slug/ · status/ · admin-list/
                     ← presentational only; props in, events out; no port injection
```

Three transpositions carry it:

1. **The router registers panes, not prefixes.** `componentFor` gains five entries and loses one
   `startsWith`. AdminPane, its `subView` union, its label switch, its description switch, its badge
   `computed` and its template-ref line all delete together — 135 lines to 0. Nothing is
   re-implemented: the five panels already exist and three already own their lifecycle.

2. **The pane header reads the schema.** `PaneConfig` gains `description`; `PaneHeader` reads
   `currentConfig`. One table of nine titles and nine descriptions, in `viewSchema.ts`, which already
   claims to be the source of truth.

3. **One route to the design system.** `demo/ui/` deletes; 48 files repoint to the glass-ui subpath
   that already exists for each symbol. `Pane` (root + header + scroll host) is asked of glass-ui, so
   the nine-times-copied shell class and the sibling-reaching unscoped style both go home.

Ordering: (3) is mechanical and independent — do it first. (1) then (2) are one wave; (1) is a
prerequisite for retiring `adminPort` (L-6), which is a prerequisite for L-7's inversion.

---

## What I checked and found sound

- **No import cycle.** `demo/palettes/browser/**` does not import `demo/palettes/admin/**`
  (`grep -rn "palettes/admin" demo/palettes/browser/` → empty). The `admin/ → browser/admin` edge is
  wrong-shaped (a pane reaching into a sibling feature's subtree for its own panels) but acyclic.
- **No deep `src/` reach.** No demo file imports value.js internals; the T.W1 dogfood keystone holds.
  The only `@src` survivor is the documented `assets/docs/*.md?source` exemption
  (`vite.config.ts:66-72`).
- **Every library import that exists uses a real published subpath.** `@mkbabb/value.js/color` (24),
  `/css` (10), `/math` (6), `/easing` (5), `/quantize` (4) — all five are live keys in
  `package.json#exports`. AdminPane's own closure touches only `/color`.
- **glass-ui consumes value.js correctly too** — `grep -rho '"@mkbabb/value\.js[^"]*"'
  node_modules/@mkbabb/glass-ui/dist/` → `/color` (7), `/css` (4), `/easing` (2), zero bare-root
  imports. The missing `"."` export (L-16) does not break the installed sibling.
- **`verbatimModuleSyntax` (edict 8) is satisfied.** AdminPane has no type-only import; the type-only
  imports in its children are all `import type`
  (`AdminUsersPanel.vue:199`, `AdminNamesPanel.vue:127`, `usePalettePorts.ts:2,19`).
- **Reactive props destructure (edict 7) is correct.** `AdminPane.vue:90`
  `const { subView } = defineProps<…>()` — the Vue 3.5 idiom, used correctly.
- **No animation was deleted.** The scroll choreography lives in `PaneHeader.vue`'s scoped block
  (veil / title-shrink / desc-shrink keyframes, all present); `.pane-scroll-fade` provides the named
  timeline. My L-12 cure moves the host class, never the keyframes.
- **Lint is clean on the subject.** `npx eslint demo/palettes/admin/AdminPane.vue` → no output.
  (L-11 explains why that proves less than it appears to.)
- **Named suspects outside this component, checked:** `ActionBarLayer`'s `useLayerTransition`
  reimplementation and the three `useDark` stores are not in AdminPane's import closure — no seat
  claim made. The `export.ts` / `export/` duplication **is** in `demo/palettes/` and is reported as
  L-15.
- **The visual matrix shows no render defect attributable to this component.** All 20 admin captures
  (5 routes × 4 matrices): 0 blank, 0 page errors, 0 console errors, 0 horizontal overflow,
  `main` = 1, settle 3.3–3.5 s. The constant `smallTapTargets: 4` on every admin route in every
  matrix is invariant across all five sub-views, which places it in the shared dock chrome, not in
  AdminPane — the a11y seat's row, not mine.
