# CHALLENGE-L — library structure under `AdminUsersPanel.vue` (r2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with. Declared at spawn, matches served tier; no inherited or undeclared seat.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines, area `palettes`, route `#/admin/users`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface
- **Verdict: DEFECTIVE**

### Pass provenance

An r1 pass of this axis existed at this path (2026-07-24, same model tier). It is preserved verbatim
at **`challenge-L-library.2026-07-24-prior.md`** — nothing is lost. This r2 report is standalone and
supersedes it. Every r1 finding I carry forward, I re-derived from the tree with my own commands;
each is tagged **[r1 · re-verified]**. Findings tagged **[NEW r2]** are absent from r1. One r1
measurement is **[CORRECTED]** and one r1 hypothesis is **[KILLED]** by a measurement r1 did not take.

| | r1 | r2 |
|---|---|---|
| findings | 11 (1 BLOCKER, 7 MAJOR, 3 MINOR) | **14** (1 BLOCKER, 7 MAJOR, 4 MINOR, 2 INFO) |
| new this pass | — | L-2, L-11, L-13, plus a new *consequence* for L-1 and a second engine for L-12 |
| corrections | — | L-5 count 35 → **48**; L-5 duplicate-instance hypothesis **killed**; L-13 "unexamined" → examined |

---

## 0 · The import lattice, traced

Every edge out of the subject file, resolved to its home.

| # | line | specifier | resolves to | judgement |
|---|------|-----------|-------------|-----------|
| 1 | 186 | `vue` | framework | **L-14** — `Transition` is a compiler built-in; the import is inert |
| 2 | 187 | `../../../color-session/keys` | `demo/color-session/keys.ts` (27 L, type-only imports) | **L-9** — avoidable cross-feature edge; the value is already at `:root` |
| 3 | 188 | `../../../ui/button` | `demo/ui/button/index.ts` — *one re-export line* | **L-5** — alias barrel |
| 4 | 189 | `../../../ui/badge` | `demo/ui/badge/index.ts` — *one re-export line* | **L-5** — alias barrel |
| 5 | 190–197 | `@mkbabb/glass-ui/dialog` | glass-ui 7.0.0 published subpath | SOUND — and the right form, which is what convicts #3/#4 |
| 6 | 198 | `@lucide/vue` | icon package | SOUND |
| 7 | 199 | `../../types` | `demo/palettes/types.ts` | SOUND — area-local domain types, `import type` ✓ |
| 8 | 200 | `../../usePalettePorts` | **275-line wiring module**, imported for one `Symbol` | **L-2 · L-3 · L-1** |
| 9 | 201 | `../card` | `demo/palettes/browser/card/index.ts` | SOUND — named barrel (PI-6), same area |
| 10 | 202 | `../../../shared/ui/EmptyState.vue` | `demo/shared/ui/EmptyState.vue`, 12 consumers | pre-existing shared atom; ownership note in L-7 |
| 11 | 203 | `./AdminListSkeleton.vue` | sibling | **L-7** — third transcription of the row grammar |

### `@mkbabb/value.js` — clean, and proved clean rather than assumed

The subject imports the library **not at all**, so I proved the negative across its whole reachable
graph instead. Transitive relative-import closure (script:
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/closure.py`,
type-only edges excluded, `.vue` `<script>` blocks parsed):

```
RUNTIME closure of AdminUsersPanel.vue: 55 local modules
bare specifiers: ['@lucide/vue', '@mkbabb/glass-ui', '@mkbabb/glass-ui/dark',
  '@mkbabb/glass-ui/dom', '@mkbabb/glass-ui/forms', '@mkbabb/glass-ui/motion',
  '@mkbabb/glass-ui/watercolor-dot', '@mkbabb/value.js/color', '@vueuse/core', 'vue']
```

`@mkbabb/value.js/color` is a published entry (`package.json#exports["./color"] → dist/subpaths/color.js`),
and the Vite self-alias set is **generated from that map** (`vite.config.ts:37-50`), so it is
structurally incapable of resolving a specifier a real consumer could not write. Demo-wide: 51
`@mkbabb/value.js/*` imports across 5 published subpaths, and
`grep -rn 'from "\(\.\./\)*src/' demo` → **no matches**. The dogfood is honest. **No finding.**

---

## 1 · Findings

Grouped by mechanism, because they are not eleven independent bugs — they are four mechanisms
throwing off symptoms.

### FAMILY A — inverted ownership

#### L-1 · BLOCKER — the state layer imports the view and drives it through a template ref **[r1 · re-verified, with a new consequence]**

`demo/palettes/useAdminUsers.ts` — a plain server-state composable — imports this SFC's type, stores
a handle to its **instance**, and mutates the component's private state by calling exposed methods:

```
demo/palettes/useAdminUsers.ts:14   import type { AdminUsersPanel } from "./browser/admin";
demo/palettes/useAdminUsers.ts:27   const adminUsersPanelRef = ref<InstanceType<typeof AdminUsersPanel> | null>(null);
demo/palettes/useAdminUsers.ts:95     adminUsersPanelRef.value?.updatePaletteTier(palette.slug, result.tier);
demo/palettes/useAdminUsers.ts:117    adminUsersPanelRef.value?.removeUserPalette(palette.slug);
demo/palettes/useAdminUsers.ts:132    adminUsersPanelRef.value?.clearUserPalettes(slug);
demo/palettes/useAdminUsers.ts:146    adminUsersPanelRef.value?.clearUserPalettes(slug);
demo/palettes/usePalettePorts.ts:123  admin.adminUsersPanelRef.value?.onPruneDone(pruned);
demo/palettes/usePalettePorts.ts:197  adminUsersPanelRef: admin.adminUsersPanelRef,   ← published on the app-wide port
demo/palettes/admin/AdminPane.vue:27        ref="adminUsersPanelRef"
demo/palettes/admin/AdminPane.vue:134 const adminUsersPanelRef = pm.adminUsersPanelRef;
demo/palettes/browser/admin/AdminUsersPanel.vue:389
    defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes });
```

Note `AdminPane.vue:134`: the mount site does not even own its template ref — it **borrows** the
composable's, so the instance handle is a member of the injected `ADMIN_PORT_KEY` surface, reachable
by any injector in the app. (This is also why `AdminPane` cannot use `useTemplateRef` and falls back
to the string-`ref=` binding — an edict-7 miss whose *cause* is this finding, not a style slip.)

**The cycle.** `useAdminUsers.ts` → `browser/admin/index.ts` → `AdminUsersPanel.vue` →
`usePalettePorts.ts` → `useAdminUsers.ts`. Acyclic at runtime *only* because line 14 is `import type`
and `verbatimModuleSyntax` erases it. The runtime **control flow** traverses the same loop anyway
(`usePalettePorts.ts:123` calls into the component). One value import in `useAdminUsers.ts` from
`./browser/admin` makes the cycle real.

**Uniqueness, measured.** Of the 25 `.ts → .vue` import edges in `demo/`, 24 are barrel re-exports;
`useAdminUsers.ts:14` is the only state module that imports a component. Of the 14 `defineExpose`
sites in `demo/`, this one is the largest (5 members), the only one whose consumer is a *composable*
rather than a parent template, and the only one exposing **mutable state** (`userPalettes`).

**Mechanism.** The concept *"the palettes of the currently expanded admin user"* has its **storage**
in the view (`AdminUsersPanel.vue:236-238`) and its **mutators** in the composable
(`useAdminUsers.ts:95/117/132/146`). Two homes, one concept, bridged by a broadcast instance handle.
Unique semantic ownership is violated in the load-bearing direction: the lower layer depends on the
higher one.

**Consequence #1 — the masking `?.` [r1].** `AdminPane.vue:26` mounts the panel under
`v-if="subView === 'admin-users'"`. `onDeleteUser` (`:140-150`) awaits the network call and *then*
calls `adminUsersPanelRef.value?.clearUserPalettes(slug)`. Switch sub-view during the await and the
optional chain silently swallows the reconciliation. Five call sites, five swallows — masking
fallbacks, forbidden by the no-legacy edict.

**Consequence #2 — a list the mutators forgot [NEW r2, CONFIRMED by code contradiction].** Because
the mutators live where the lists do not, one of them updates the wrong set. Compare the two admin
delete paths in the same file:

```
useAdminUsers.ts:101-110  onAdminDeletePalette(palette)                  // Browse path
    await deletePaletteAdmin(token, palette.slug);
    deps.remotePalettes.value = deps.remotePalettes.value.filter(...);   // ← browse list updated

useAdminUsers.ts:112-125  onAdminDeleteUserPalette(palette, ownerSlug)   // Admin-panel path
    await deletePaletteAdmin(token, palette.slug);
    adminUsersPanelRef.value?.removeUserPalette(palette.slug);           // ← panel copy updated
    // deps.remotePalettes is NEVER touched
```

Deleting a palette through the admin users panel removes it from the panel's copy and from the
server, and leaves it in `remotePalettes` — Browse keeps rendering a deleted palette until reload.
The "it cannot be in both lists" escape is closed by the codebase itself: the sibling handler
`onFeaturePalette` (`:82-99`) is bound to the *admin panel's* card (`AdminUsersPanel.vue:149` →
`AdminPane.vue:37 @feature="pm.onFeaturePalette"`) and searches `remotePalettes` for exactly that
palette at `:87`. The design assumes an admin-panel palette **is** in `remotePalettes`.

*Reproduction (exact; NOT executed — requires an admin token and the step is destructive, so this
read-only seat did not run it):* authenticate as admin → `#/browse`, note palette `P` →
`#/admin/users`, expand `P`'s owner → delete `P` from the row → `#/browse`: `P` is still listed.

**Cure (transposition).** Lift the three refs into `useAdminUserPalettes()` beside `useAdminUsers` —
it is the same server-state slice the composable already writes. The panel receives
`expandedUserSlug` / `userPalettes` / `loadingUserPalettes` as props and emits `toggleUserExpand`.
Then delete, in order: `AdminUsersPanel.vue:389`, `AdminUsersPanel.vue:352-387`,
`useAdminUsers.ts:14` + `:27` + the four `?.` sites, `usePalettePorts.ts:123` + `:197`,
`AdminPane.vue:27` + `:134`. Net: −5 exposed members, −1 port member, −1 inverted import edge,
−1 latent cycle, −5 masking fallbacks, and Consequence #2 becomes unrepresentable because one module
sees both lists.

---

#### L-2 · MAJOR — importing a `Symbol` drags 26 modules into a leaf panel; the injection keys have no home **[NEW r2]**

`AdminUsersPanel.vue:200` imports `ADMIN_PORT_KEY` from `../../usePalettePorts` — a 275-line module
that imports 15 composables, the API client, auth, session tokens and storage. Measured with the
closure script above:

```
RUNTIME closure of AdminUsersPanel.vue:  55 local modules
RUNTIME closure of usePalettePorts.ts:   25 local modules
modules NOT attributable to usePalettePorts: 29
  →  26 modules exist in this leaf's graph solely because it wants one Symbol
```

Dragged in for a `Symbol`: `demo/palettes/api/{index,colors,admin-audit}.ts`, `useSlugMigration.ts`,
`useVersionHistory.ts`, `useBrowsePalettes.ts`, `usePaletteStore.ts`, `useColorNameQueue.ts`,
`useTagEdit.ts`, `useFilteredList.ts`, `usePaletteActions.ts`, `utils.ts`, `constants.ts`,
`platform/auth/{sessionToken,sessions,useAdminAuth,useSession,useUserAuth}.ts`,
`platform/storage/useSafeStorage.ts`, `platform/transport/{client,api-problem}.ts`, …

**This is systemic, not local.** Of the 22 modules that import `usePalettePorts`, **21 import only a
key symbol** — 20 import a `*_PORT_KEY`, one imports `type BrowsePort`. Exactly one
(`demo/color-picker/composables/usePaletteWiring.ts:24`) imports `providePalettePorts`, the module's
actual product. Five of the 20 are **shell** files:

```
demo/shell/dock/Dock.vue:18                 import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/DockViewSelect.vue:8        import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/layers/SlugEditLayer.vue:5  import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
demo/shell/dock/menus/ProfileSection.vue:14 import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
demo/shell/dock/menus/MobileMenuDropdown.vue:13 import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
```

The shell reaches into the palettes **feature** to obtain an identity key that is assembled entirely
out of `demo/platform/auth/*`. Wrong owner, wrong direction — the boundary violation the brief asks
about, written from the other side.

**The right shape already exists in this repo, and this component consumes it correctly on line 187:**
`demo/color-session/keys.ts` — 27 lines, six `InjectionKey`s, type-only imports, zero runtime weight.

**Cure.** `demo/palettes/keys.ts`: the five `InjectionKey`s + the five port interfaces, type-only
imports. `usePalettePorts.ts` imports the keys in order to `provide` them; nothing else imports
`usePalettePorts` at all. Session/identity keys move one step further, to
`demo/platform/auth/keys.ts`, and the shell→feature edge dissolves. Twenty-one import lines change;
one file is added that is the twin of a file already in the tree (edict 3 satisfied: no new
directory, no new concept).

---

#### L-3 · MAJOR — the ADMIN "port" is the god facade renamed: 34 members injected to call 1 **[r1 · re-verified]**

Counted programmatically from `usePalettePorts.ts:195-231`:

```
adminPort member count: 34
adminUsers, adminUsersPanelRef, filteredAdminUsers, loadAdminUsers, loadUserPalettes, loadingUsers,
usersLoadError, onDeleteUser, onDeleteUserPalettes, onAdminDeleteUserPalette, onUserSortChange,
userSortMode, onFeaturePalette, onPrune, adminColorQueue, filteredColorQueue, loadColorQueue,
loadingColorQueue, queueLoadError, filteredApproved, loadApprovedColors, loadingApproved,
approvedLoadError, approvedLoaded, onApproveColor, onRejectColor, onDeleteColor, searchQuery,
searchPlaceholder, expandedId, toggleExpand, audit, flagged, tags
```

`AdminUsersPanel.vue:234` injects all 34. Total use: **one** — `pm.loadUserPalettes(slug)` at `:361`.

**Two data paths from one source.** `AdminPane.vue:26-42` already passes 6 props and wires 7 emit
handlers, *all* sourced from the same `pm`. The panel reads its data through props and reaches its
one behaviour through inject — one source, two mechanisms, in one parent/child pair, ten lines apart
in the same `<script setup>`.

`usePalettePorts.ts:20-30` states the intent in its own header: the dissolution of "the old
`usePaletteManager` god facade (153 L, ONE cross-everything injected blob) into FIVE narrow,
feature-owned ports." The admin port spans five unrelated sub-domains (users, colour-name queue,
audit, flagged, tags) plus search and card expansion. No consumer of this port can be reasoned about
without reading all 34 members. The facade was renamed, not dissolved (edict 1).

**Cure.** With L-1 applied the inject at `:234` deletes outright and the panel becomes purely
prop/emit driven — mountable in a test with props alone, no provider. Structurally: split
`adminPort` along its five existing sub-composable seams, which already own their slices; the port's
only work today is re-aggregating them into one blob.

---

### FAMILY B — the design-system boundary

#### L-4 · MAJOR — 51 dead `variant` props: the shadcn vocabulary outlived the Glass 7 adoption, and this one file speaks both **[r1 · re-verified independently]**

glass-ui 7.0.0 `Button` has **no `variant` prop**:

```
node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-19
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   tone?: Tone;   size?: ButtonSize;
    iconOnly?: boolean;   loading?: boolean;   type?: …;   disabled?: …;   class?: …;
}
```

```
$ grep -c "variant" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
0
```

Zero occurrences of the string in the shipped button chunk. Every button carrying `variant=` renders
at the default `emphasis="secondary"` and the prop falls through `$attrs` onto the DOM.

**In the subject file — both vocabularies, 40 lines apart** (my own scan, `<Button …>` tag-open lines):

```
demo/palettes/browser/admin/AdminUsersPanel.vue
  [(21,'outline'), (32,'outline'), (58,'outline'), (112,'outline'), (122,'ghost')]   ← all DEAD
  :174 emphasis="text"                                          ← correct Glass 7
  :175 :tone="confirmDestructive ? 'destructive' : 'neutral'"    ← correct Glass 7
```

The panel's comment at `:107-111` asserts a design invariant the design system never receives —
"the per-row destructive is quieted to ink-at-rest — red arrives on hover/focus, never as 5 resting
beacons down the list" — expressed as `variant="ghost"`, a prop glass-ui discards. The intended rung
is `emphasis="quiet"`.

**Fleet extent, re-measured this pass** (regex over every `<Button …>` opening tag in `demo/**/*.vue`):

```
Button sites with a dead `variant` prop: 51 in 22 files
  demo/palettes/browser/admin/AdminUsersPanel.vue   [(21,'outline'),(32,'outline'),(58,'outline'),(112,'outline'),(122,'ghost')]
  demo/palettes/browser/admin/AdminNamesPanel.vue   [(37,'outline'),(55,'outline'),(61,'ghost'),(87,'outline'),(106,'ghost')]
  demo/palettes/browser/admin/AdminFlaggedPanel.vue [(10,'outline'),(29,'outline'),(90,'outline'),(93,'ghost')]
  demo/workbenches/generate/GenerateControls.vue    [(157,'primary-audacious'),(165,'ghost'),(175,'ghost')]
  demo/shell/dock/menus/ProfileSection.vue          [(59,'outline'),(111,'outline'),(135,'ghost')]
  demo/palettes/browser/card/CurrentPaletteEditor.vue [(134,'outline'),(151,'outline'),(159,'ghost')]
  … 16 more files
```

Exactly reproduces r1's 51/22 by an independent method. The hard CI typecheck cannot see it:
`vue-tsc` treats an unknown lowercase prop as an HTML fallthrough attribute.

**Cure.** Mechanical: `outline`→`emphasis="secondary"`, `ghost`→`emphasis="quiet"`,
`destructive`→`tone="destructive"`, `default`→`emphasis="primary"`. Structural, and **glass-ui-side
(BH relay)**: `Button` should set `inheritAttrs: false` and spread an explicit allowlist, so an
unrecognised design-token prop is a *visible* no-op at the DOM instead of an invisible one.

---

#### L-5 · MAJOR — `demo/ui/` is 19 pure alias barrels; this file uses both the alias and the real subpath **[r1 · re-verified; count CORRECTED; one r1 hypothesis KILLED]**

Every file under `demo/ui/` is a one-line re-export — `find demo/ui -type f` → **19 files**,
`find demo/ui -type f ! -name index.ts` → **empty**:

```
demo/ui/button/index.ts   export { Button } from "@mkbabb/glass-ui";
demo/ui/badge/index.ts    export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
demo/ui/dialog/index.ts   export { Dialog, DialogClose, DialogTrigger, DialogHeader, DialogTitle,
                                   DialogDescription, DialogContent, DialogFooter } from "@mkbabb/glass-ui";
… 16 more, identical in kind
```

The subject imports `Button`/`Badge` through the barrels (`:188`, `:189`) and `Dialog*` through the
real subpath (`:190-197`) — **two specifiers for one design system in one file** — and proves the
barrel superfluous by *not* using `demo/ui/dialog`, which exists and exports the same eight symbols.

**[CORRECTED]** r1 reported 35 barrel importers. The true count is **48**:

```
$ grep -rEl 'from "(\.\./)+ui/' demo --include='*.vue' --include='*.ts' | wc -l
48
$ grep -rhoE 'from "(\.\./)+ui/[a-zA-Z./-]*"' demo --include='*.vue' --include='*.ts' | grep -c shared
0          # no shared/ui false positives
$ (files importing a demo/ui barrel AND @mkbabb/glass-ui directly)
24
```

**[HYPOTHESIS KILLED]** r1 left open whether the barrel's root-entry import costs a duplicated or
fatter module. It does not duplicate: `dist/glass-ui.js` and `dist/dialog.js` import the *same*
chunk —

```
$ grep -l "dialog-TNRDkcE4" node_modules/@mkbabb/glass-ui/dist/*.js
command-SFqDQ65h.js   dialog.js   glass-ui.js   search.js
```

— so there is **one** Dialog component instance, one style injection, one `dialogStageContext`. And
in the running dev server the dep-optimizer collapses it: 9 pre-bundled glass-ui chunks total on this
route (`performance.getEntriesByType('resource')`, measured live). **The defect is structural — an
alias layer the no-legacy edict forbids, and two names for one thing — not a runtime cost.** Stating
it honestly is worth more than an unmeasured perf claim.

**Cure.** Delete `demo/ui/` entirely (19 files); every consumer names the glass-ui subpath directly
(`@mkbabb/glass-ui/button`, `/badge`, `/dialog`, …; glass-ui publishes 74 export entries, including
granular ones for every barrel in `demo/ui/`). This *removes* a directory rather than adding one, so
it satisfies edict 3 rather than straining it. 48 files, mechanical. It also makes L-4-class drift
visible, because the import line then names the real package.

---

#### L-6 · MAJOR — the confirmation concept lost its home, so one panel re-grew it and two do without **[r1 · re-verified, with provenance and a second re-growth]**

The subject carries a 35-line hand-rolled confirm state machine — 7 refs plus `showConfirm` plus
`onConfirm` (`:254-286`, ~9 % of the file). Its two sibling destructive admin surfaces delete
irreversibly with **no confirmation at all**:

```
demo/palettes/browser/admin/AdminFlaggedPanel.vue:99   @click="flagged.deletePalette(item.paletteSlug)"
demo/palettes/browser/admin/AdminTagsPanel.vue:101     @click="tagsApi.deleteTag(tag.name)"
```

**Provenance [NEW r2].** `git show f2c8f565` (the W44 Glass 7 adoption) states it outright:
*"ConfirmDialog (/confirm-dialog) -> composed Dialog family (/dialog)"*, and the diff for this file
shows the exchange — a 21-line declarative
`<ConfirmDialog v-model:open :title :confirm-label :destructive @confirm>` became inline
`Dialog/DialogContent/DialogHeader/DialogTitle/DialogDescription/DialogFooter` markup
(`AdminUsersPanel.vue:157-181`) **plus** the state machine at `:254-286`.

**The second re-growth [NEW r2].** r1 correctly noted `showConfirm`/`confirmOpen` are unique to this
file. The *markup* is not: `demo/palettes/PalettesPane.vue:101-121` is the same
Dialog/Header/Title/Description/Footer confirm, carrying the same apologetic comment ("Glass 7:
ConfirmDialog folded onto the Dialog family"), driven by a **different** mechanism — a boolean
`showDeleteAllConfirm` living in `usePaletteActions.ts:25` and republished on the library port
(`usePalettePorts.ts:153`). Two implementations of "confirm a destructive palette action", neither
reusable by the other.

**And it is a family, not an incident.** The same commit body records *"local successor for the
removed `useLayerTransition` composable"* → `demo/shell/dock/layers/ActionBarLayer.vue:54-86`, a
demo-local re-implementation of a deleted glass-ui composable, with a comment explaining that
glass-ui "offers no public composable successor." **When glass-ui removes a primitive, this demo
grows a private copy instead of relaying the need upstream** — against the design-system edict and
against the standing glass-ui BH/BI relay law.

**Cure.** One `useConfirm()` returning `{ confirm(opts): Promise<boolean> }` plus one
`<ConfirmDialog>` composed from the Glass 7 `Dialog` family. Three call sites in this repo alone
(AdminUsers, PalettesPane, and the two panels that currently confirm nothing), so the composition
belongs **back in glass-ui** (`/dialog` already ships `dialogStageContext` — the natural home) and
this is a **BH-relay item**. −35 lines here, −20 in `PalettesPane`, +2 confirmations where there are
none today.

---

#### L-7 · MAJOR — the admin row grammar has three homes; the declared atom serves 1 of 3 **[r1 · re-verified]**

| site | home | class string |
|------|------|--------------|
| the atom | `AdminListItem.vue:12` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0` |
| the users row | `AdminUsersPanel.vue:80` | `flex items-center gap-3 px-3 py-2.5 transition-colors` (+ `border-card-edge` on the wrapper at `:68`) |
| the skeleton | `AdminListSkeleton.vue:12` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge` |

`AdminListItem` exposes exactly the three slots this row needs — `swatch` / `content` / `actions`
(`AdminListItem.vue:13-23`). `grep -rln AdminListItem demo` returns two files, and one of them
(`AdminListSkeleton.vue`) matches only in **a comment** — *"shaped as the AdminListItem row
grammar"*. That is the tell: the atom is being **transcribed**, not **used**. Its single real
consumer is `AdminNamesPanel.vue`. A change to the row rhythm must land in three files, two of which
are not the atom.

Same species, one level up: `EmptyState.vue` (12 consumers) and `AdminListSkeleton.vue` (4 consumers)
are design-system atoms with no home in the design system — glass-ui 7.0.0's 74 subpaths contain no
empty-state and no skeleton entry (`['./badge','./chip','./dialog','./sortable-list']` is the whole
match set for `empty|state|skeleton|chip|pill|badge|confirm|dialog|list`), while `AdminListSkeleton`
is literally three glass-ui `<Skeleton surface="glass" variant="breath">` in a row shape.

**Cure.** `AdminUsersPanel`'s row becomes `<AdminListItem>` with the disclosure semantics (role,
tabindex, aria-expanded, keydown) hoisted **into** the atom behind an `interactive` prop — the atom
is the right home for "an admin list row", disclosure included. `AdminListSkeleton` becomes
`<AdminListItem>` with `<Skeleton>` in its slots. One home, three consumers. `EmptyState` and the
row-skeleton variant are BH-relay candidates for glass-ui (`EmptyState variant="empty"|"error"`,
`Skeleton variant="list-row"`) — reusing existing component-type names.

---

#### L-8 · MAJOR — the transient action-result beat is reimplemented, and the reimplementation leaks its timer **[r1 · re-verified]**

The concept already has a component —
`demo/palettes/browser/card/PaletteCard/ActionFeedback.vue`: same `<Transition name="vj-celebrate">`
family, props `{ message, variant, visible, autoDismissMs = 2500 }`, and a `watch` that
`clearTimeout`s on re-trigger. The panel builds it again, worse:

```
AdminUsersPanel.vue:16-20   <Transition name="vj-celebrate"> … {{ pruneResult }}
AdminUsersPanel.vue:301-309
    function onPruneDone(count: number) {
        pruning.value = false;
        pruneResult.value = count > 0 ? `Pruned ${count} user…` : "No empty users to prune";
        setTimeout(() => { pruneResult.value = null; }, 3000);   ← no handle, no clearTimeout, no onUnmounted
    }
```

*Reproduction (HYPOTHESIS — mechanically certain from the code; not executed, an admin token is
required and the action is destructive):* two prunes inside 3 s and the first timer nulls
`pruneResult` while the second message is young. Separately, a prune followed by a sub-view switch
(`AdminPane.vue:26 v-if`) leaves a live timer writing to an unmounted component's ref.

**The structural half.** `ActionFeedback.vue` — a generic feedback atom — lives inside
`browser/card/PaletteCard/`, the private folder of one card. That wrong home is *why* the admin panel
could not find it; nothing about the concept is card-specific.

**Cure.** Move `ActionFeedback.vue` beside `EmptyState.vue`/`PaneHeader.vue` in `demo/shared/ui/`
(existing directory — no new dir) and use it here; `pruneResult` becomes `message` +
`v-model:visible`; the raw `setTimeout` deletes.

---

#### L-9 · MINOR — the live accent arrives by a second path, per-instance, into a class that institutionalises the override **[NEW r2 — supersedes r1's L-9]**

`AdminUsersPanel.vue:99` and `:168` hand-set `:style="{ color: safeAccent, borderColor: safeAccent }"`
from `inject(SAFE_ACCENT_KEY)` (`:232`) — this component's only reason to depend on
`demo/color-session/keys`. **The identical value is already on `:root` as a CSS custom property:**

```
demo/DESIGN.md:334   "--accent-live is the contrast-guarded LIVE picked color — written onto :root by
                      App.vue from the library safeAccentColor path (the SAME computation
                      SAFE_ACCENT_KEY provides; ONE color-resolution path, never a bespoke resolver)"
demo/styles/foundation.css:231   --accent-live: oklch(0.632 0.214 13.5);   /* pre-hydration literal */
```

measured live in Chromium this session:
`getComputedStyle(document.documentElement).getPropertyValue('--accent-live')` →
`oklch(47.118925176164% 0.188447570516 9.83402284231deg)`. One value, two delivery mechanisms — and
the recipe itself licenses the override, against the root-level-styling edict:

```
demo/styles/foundation.css:580-587
 * Slug pill — … Consumers set `color` / `border-color` per-instance via :style.
.slug-pill { @apply text-mono-small font-bold px-2 py-0.5 rounded-full border; }
```

Five consumers, **four** mechanisms: injected Vue value (`AdminUsersPanel:99,168`); static CSS var
inline (`shell/dock/menus/ProfileSection.vue:96`, `MobileMenuDropdown.vue:67`); Tailwind utilities
(`palettes/browser/slug/PaletteSlugBar.vue:65`); bare class with no tone
(`ProfileSection.vue:73`, `MobileMenuDropdown.vue:48`).

**Cure.** glass-ui already ships `./chip`
(`dist/components/chip/{Chip.vue.d.ts,chipVariants.d.ts,types.d.ts}` with `ChipMode`/`ChipProps`).
The slug pill **is** a Chip. Promote it — `<Chip tone="accent">` / `"muted"` / `"gold"`, tones
resolving to `var(--accent-live)` etc. at the root component level. The `.slug-pill` class, all four
mechanisms, and this component's `SAFE_ACCENT_KEY` inject (one cross-feature edge) retire together.
(r1's framing — "colour arrives by inject and by prop" — is true and subsumed: with the Chip, both
the inject *and* the question disappear.)

---

#### L-10 · MINOR — per-instance geometry overrides on a design-system primitive **[r1 · re-verified]**

`:24`, `:35`, `:116`, `:125` each hand-set `h-7 px-2.5` / `h-7 px-2` plus
`font-display text-caption cursor-pointer` on a `<Button size="sm">`. glass-ui ships
`ButtonSize = "xs" | "sm" | "md" | "lg"` (`Button.vue.d.ts:5`); `xs` is the rung being reconstructed
by hand. Fleet-wide: 22 `<Button>` sites in 11 files hand-set height in `class`. If `xs` is the wrong
height for a dock-adjacent toolbar, the token moves in glass-ui — not in eleven demo files (edict 5).

---

### FAMILY C — state modelling

#### L-11 · MINOR — one global `expandedId` serves three lists across two ID namespaces **[NEW r2]**

`usePaletteActions.ts:24-29` owns a single `expandedId: Ref<string|null>` + `toggleExpand`,
republished on **three** ports (`usePalettePorts.ts:150`, `:178`, `:214`). Its consumers do not agree
on what the string is:

```
demo/palettes/PalettesPane.vue:87        :expanded="pm.expandedId.value === palette.id"     ← client-minted crypto.randomUUID() (usePaletteStore.ts:85)
demo/palettes/BrowsePane.vue:97          :expanded="pm.expandedId.value === palette.slug"   ← server slug
demo/palettes/browser/admin/AdminUsersPanel.vue:144  :expanded="expandedId === palette.slug"  ← server slug
```

`types.ts:14-31` documents the two namespaces as deliberately disjoint ("a remote palette has NO
`id`… identified by `slug` alone"), and then one `string | null` holds either, depending on which
pane wrote last. A UUID/slug collision is not a practical risk, so this half is a type-honesty defect
rather than a crash. The *slug*-namespace half is a genuine coupling: expanding a card in
`#/admin/users` leaves the same palette expanded in `#/browse`, and collapsing it in one collapses it
in the other. *(Reproduction requires an admin session; not executed.)*

**Cure.** Expansion is a property of a list surface, not of the application. Each list owns its own
expansion state (or one keyed map, `Record<listId, string|null>`); the port stops publishing a
shared cursor to three unrelated views.

---

#### L-12 · MAJOR — the unauthenticated state is costumed as an empty roster **[r1 · re-verified, and strengthened with a second engine + a zero-network measurement]**

```
demo/palettes/useAdminUsers.ts:54-58
    async function loadAdminUsers() {
        const token = getAdminToken();
        if (!token) return;            ← returns WITHOUT touching loadingUsers or usersLoadError
        loadingUsers.value = true;
```

```
AdminUsersPanel.vue:63
  <EmptyState v-else-if="users.length === 0" eyebrow="· roster clear ·" message="No users found." />
```

The panel models three states — loading (`:46`) / error (`:51`) / empty (`:63`). The domain has four.
The fourth, *never fetched because there is no admin token*, is swallowed in the composable, so the
panel renders a TRUE-EMPTY plate and an authoritative count for a roster it never requested.

**Two-engine reproduction.**

*WebKit* — `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-users.png`
(read this pass): the dock reads **"Login"** (no admin session) and the Users panel reads
`0 users` · **"· ROSTER CLEAR ·"** · **"No users found."** All four matrices agree; `REPORT.md:128,143,158,173`
report `pageErr 0`, `consoleErr 0`, `overflowX 0`, `main 1`, text 273 desktop / 122 mobile.

*Chromium, live, this session* (`http://localhost:9000`, read-only):

```js
location.hash = '#/admin/users'; await new Promise(r => setTimeout(r, 2500));
// → { url: "#/admin/users", hasRosterClear: true, hasNoUsers: true,
//     countLine: "0 users", skeletons: 0, adminToken: null }
```

and `browser_network_requests` filtered `users|admin` → **empty**. This is the sharper claim r1's
screenshot could not make: the roster was not *fetched and found empty*, and not *fetched and
failed* — **no request was ever issued**. The app knows it is logged out (the dock says "Login")
while the panel asserts the roster is clear. The invariant this very file is annotated with
(`:49-50` — "error ≠ empty — a dead backend never costumes as an empty roster") was applied to the
`catch` branch and not to the guard branch, which is the branch every unauthenticated visitor takes.
The A-3 guard at `:5-10` ("the count speaks only once the roster resolves") is defeated by the same
hole: it gates on `loading`, which never becomes true on this path.

**The structural half.** Authorization is a *route* precondition modelled as a per-method early
return: `grep -c "if (!token)" demo/palettes/useAdminUsers.ts` → **11**; across
`useAdminUsers`/`useAdminAudit`/`useAdminFlagged`/`useAdminTags`/`useColorNameQueue` → **22**. There
is no route guard: `demo/shell/viewSchema.ts:188` declares `"admin-users"` with no auth meta.

**Cure.** One gate at the composition boundary — an `<AdminGate>` in `AdminPane.vue`, or an
`auth: "admin"` flag in `viewSchema` honoured once in `useViewManager` — rendering an authentication
plate when `!isAdminAuthenticated`. Inside the gate `getAdminToken()` is a non-null contract and all
22 guards delete. The panel then never needs an "unauthorized" state, because it never mounts
unauthorized.

---

### FAMILY D — area context

#### L-13 · INFO — an ambiguous specifier in this component's area, off its edge (proved) **[NEW r2 — r1 declared this unexamined]**

`demo/palettes/export.ts` (132 lines: `exportAsJSON`, `exportAsCSSCustomProperties`,
`exportAsTailwindConfig`, `exportAsSVG`, `exportAsPNG`, `downloadExport`) coexists with the directory
`demo/palettes/export/` (`json.ts`, `css.ts`, `tailwind.ts`, `svg.ts`, `png.ts`, `serializers.ts`,
`canonical.ts`, `digest.ts`, `rfc8785.ts`, `bytes.ts`, `reload.ts`, `types.ts`). The single importer,
`demo/palettes/usePaletteExport.ts:9`, writes `from "./export"` — a specifier ambiguous between a
file and a directory, resolving to the **file**, i.e. to the duplicate.

**Not attributable to this component**: neither module appears in the subject's 55-module closure
(measured). Recorded so a later seat homes it; the named suspect from the brief is real.

#### L-14 · MINOR — `Transition` imported from `vue` **[r1 · re-verified]**

`AdminUsersPanel.vue:186` — `import { inject, ref, computed, Transition } from "vue"`. 1 of 17
`<Transition>` users in `demo/` does this; the local binding shadows the compiler built-in.
Identical behaviour, gratuitous divergence.

---

## 2 · The greenfield lattice

Structured today with no legacy, the admin-users slice is five modules with one direction of flow:

```
demo/shell/viewSchema.ts                 auth: "admin" on the five admin views
      │ (one guard, one place)
      ▼
demo/palettes/admin/AdminGate.vue        renders the auth plate, or its slot
      ▼
demo/palettes/admin/AdminPane.vue        composition root for the console
      │  props ▼                                    ▲ emits
demo/palettes/browser/admin/AdminUsersPanel.vue     pure view — zero inject,
      │                                             zero defineExpose, zero timers
      ├── AdminListItem.vue             the ONE row atom (interactive variant included)
      ├── AdminListSkeleton.vue         AdminListItem + <Skeleton> slots
      ├── shared/ui/EmptyState.vue      the ONE empty/error/UNAUTH plate
      ├── shared/ui/ActionFeedback.vue  the ONE transient beat            (moved here)
      └── shared/ui/ConfirmDialog.vue + useConfirm()                      (3 consumers; BH-relay to glass-ui)

demo/palettes/keys.ts                    LEAF: 5 InjectionKeys + port types, type-only imports
demo/platform/auth/keys.ts               SESSION_PORT_KEY — so the shell stops importing the feature
demo/palettes/ports.ts                   providePalettePorts ONLY; imported by the composition root alone
demo/palettes/useAdminUsers.ts           roster state: "unauthenticated"|"loading"|"error"|"loaded"
demo/palettes/useAdminUserPalettes.ts    expansion state — owns expandedUserSlug/userPalettes
demo/palettes/api/admin-users.ts         transport (already correct: token as a parameter)
```

Five rules hold it, and each is an **absence** rather than an addition:

1. **A `.ts` never imports a `.vue` outside a barrel.** Kills L-1 by construction — with it the
   cycle, the five `?.` swallows, and the forgotten-list divergence.
2. **`defineExpose` is for parent templates only — never for composables, never for state.** The one
   legitimate instance handle is an imperative *command* a parent template fires (`openFilePicker`),
   not a state write.
3. **Injection keys live in a leaf `keys.ts`, never in the module that wires them.** Kills L-2; the
   precedent (`demo/color-session/keys.ts`) is already in the tree and already consumed correctly by
   this very file.
4. **One specifier per external package.** `@mkbabb/glass-ui/<subpath>` everywhere; `demo/ui/`
   deleted. Kills L-5 and makes L-4-class drift visible, because the import line names the real
   package.
5. **Preconditions are gated once at the boundary, never re-asserted per method.** Kills L-12 and
   its 22 duplicated guards.

**What this removes from the subject** (391 lines today): `defineExpose` + its four methods
(`:367-389`, 23 L), the confirm controller (`:254-286`, 33 L), the sub-list state + `toggleUserExpand`
(`:236-238`, `:352-365`, ~20 L), the prune lifecycle (`:239`, `:288-309`, ~25 L), `slugHead`/`slugTail`
(`:243-252`, 10 L → a Chip prop), the transcribed row (`:78-132` → `<AdminListItem interactive>`).
**≈111 lines leave outright** and the file stops wearing three hats — today it is simultaneously a
view, a confirm-dialog controller and a sub-store. Only the first is its job. Result: ~200 lines, no
`inject`, no `defineExpose`, no timer, no confirm machine, no row transcription — and mountable in a
test with props alone.

---

## 3 · Negative proof — what I checked on this edge and found sound

- **The published surface is dogfooded correctly.** The demo imports value.js only through bare
  published subpaths (51 imports across `color`/`css`/`math`/`easing`/`quantize`), and
  `vite.config.ts:37-50` *generates* the self-alias set from `package.json#exports`, so it cannot
  resolve a specifier a real consumer could not write. `grep -rn 'from "\(\.\./\)*src/' demo` →
  no matches. `AdminUsersPanel` imports value.js not at all — **no false proof of the public API here.**
- **No duplicate glass-ui instance** from the barrel/subpath split — shared chunk proved in L-5.
  An r1 hypothesis, killed by measurement rather than repeated.
- **The three-parallel-`useDark`-stores suspect is CURED** (r1 left it unexamined). All 9 sites now
  import `useGlobalDark` from `@mkbabb/glass-ui/dark`; the only survivors are two *comments*
  describing the historical race (`demo/scenes/about/markdown/composables/useMarkdownColors.ts:16`,
  `useMarkdownHighlighting.ts:76`). Stale prose, not live code. **No finding.**
- **No component→boot and no feature→shell edge is written by this file.** Its 11 imports touch vue,
  glass-ui, lucide, and four demo trees. The boundary violation that *does* exist (L-2) is written by
  the shell into the feature, not by this component.
- **`import type` discipline (edict 8) is clean.** `:199` `import type { Palette, User }`; `:186` and
  `:200-203` are genuine value imports.
- **Animations are rooted correctly (edict 6).** `vj-celebrate` is defined in
  `demo/styles/animations.css:142-165` with per-instance geometry passed as CSS custom properties;
  `.slug-pill` in `demo/styles/foundation.css:585`. Nothing inlined, nothing deleted.
- **`demo/shared/` is not a new contrivance.** It predates this component (3 files) and has 12
  `EmptyState` consumers; L-8's cure moves a file *into* it rather than creating anything.
- **Reactive props destructure (edict 7) is idiomatic** at `:205-220`, with a default on `loadError`;
  `emptyCount` (`:241`) reads `users` inside a `computed` and stays reactive. The single edict-7 miss
  is at the *mount site* (`AdminPane.vue:27/:134`, a string `ref=` bound to a borrowed ref) and it is
  a symptom of L-1, not a style slip — `useTemplateRef` **cannot** express what that line does, which
  is precisely the indictment.
- **No a11y defect on this route is attributable to this component.** All four `safari-*` rows report
  the same 4 small tap targets — an `input` and three 22×22 buttons ("Switch to slug", "Generate new
  slug", "Cancel"), every one in the dock (`demo/shell/dock/menus/ProfileSection.vue`), not in this
  panel; `overflowX 0`, `pageErr 0`, `consoleErr 0`, `main 1` on all four matrices. The
  roving-tabindex / Full-Keyboard-Access delta noted in the brief (MT-F022) is confirmed not a
  library-structure concern and is not counted here.
- **The api layer is correctly shaped.** `demo/palettes/api/admin-users.ts` takes the token as a
  parameter and delegates to one `adminRequest` — no ambient token, no store reach-in. The rot is
  entirely in the composable layer above it.

---

## 4 · Summary

| id | severity | pass | defect |
|----|----------|------|--------|
| L-1 | **BLOCKER** | r1 · re-verified **+ new consequence** | `useAdminUsers.ts:14/27` imports the SFC and drives it via `defineExpose`; latent cycle; 5 masking `?.`; **`onAdminDeleteUserPalette` never updates `remotePalettes` → Browse renders a deleted palette** |
| L-2 | MAJOR | **NEW r2** | injection keys live in the 275-L wiring module: **26 modules** enter this leaf's graph for one `Symbol`; **21 of 22** importers want only a key; 5 shell files import the palettes feature for an identity key |
| L-3 | MAJOR | r1 · re-verified | 34-member `adminPort` injected to call **1** method; props + inject as two paths from one source |
| L-4 | MAJOR | r1 · re-verified (51/22 reproduced independently) | dead `variant` props fleet-wide (5 here); glass-ui `Button` has no `variant` (chunk grep = 0); vue-tsc structurally blind |
| L-5 | MAJOR | r1 · **corrected + hypothesis killed** | `demo/ui/` = 19 alias barrels, both paths used in this file; **48** (not 35) barrel importers, 24 use both; **no** duplicate instance — shared chunk proved |
| L-6 | MAJOR | r1 · re-verified **+ provenance + 2nd re-growth** | ConfirmDialog re-grown after Glass 7 removed it (`git show f2c8f565`); a second copy at `PalettesPane.vue:101-121` with a different mechanism; two sibling destructive panels confirm nothing; same family as `ActionBarLayer`'s local `useLayerTransition` |
| L-7 | MAJOR | r1 · re-verified | admin row grammar transcribed in 3 places; `AdminListItem` serves 1 of 3; `EmptyState`/`AdminListSkeleton` are design-system atoms outside the design system |
| L-8 | MAJOR | r1 · re-verified | `ActionFeedback` reimplemented inline with an uncancelled `setTimeout`; the atom is homed in one card's private folder |
| L-9 | MINOR | **NEW r2** (supersedes r1 L-9) | the accent is already `--accent-live` at `:root` (measured); `.slug-pill` licenses per-instance `:style` overrides — 4 mechanisms across 5 consumers; the pill **is** a glass-ui `Chip` |
| L-10 | MINOR | r1 · re-verified | per-instance button geometry (`h-7 px-…`) — 22 sites in 11 files; `size="xs"` is the rung being hand-built |
| L-11 | MINOR | **NEW r2** | one global `expandedId` for three lists across two disjoint ID namespaces (`palette.id` UUID vs `palette.slug`) |
| L-12 | MAJOR | r1 · re-verified **+ 2nd engine + zero-network** | unauthenticated costumes as "· roster clear ·" — **no request is ever issued**; 22 duplicated `if (!token) return`; no route guard |
| L-13 | INFO | **NEW r2** | `demo/palettes/export.ts` (file) vs `demo/palettes/export/` (dir) — `from "./export"` is ambiguous; **off this component's closure**, proved |
| L-14 | MINOR | r1 · re-verified | `Transition` imported from `vue` — 1 of 17 |

**Strongest defect: L-1.** It is the only finding that inverts a layer, and it is the root of L-3
(the port carries `adminUsersPanelRef` solely to serve it). Curing L-1 deletes a port member, a
`defineExpose`, an import edge, a latent cycle, five silent failure swallows — and the
`remotePalettes` divergence, which exists only because two lists have two mutators in two modules.

**The one-sentence indictment.** Nothing in this slice owns a whole concept: the roster's state
machine is split between a composable and a prop contract (L-12), the expanded-user list is split
between a composable and a component (L-1), the confirm is split between a deleted glass-ui primitive
and two demo re-growths (L-6), the row is split between an atom and two transcriptions (L-7), the
design system is split between a package and a 19-file alias layer (L-5), and the injection keys are
split from nothing at all — they simply live in the wrong file, and drag a runtime behind them (L-2).

---

## 5 · Evidence index

| kind | where |
|---|---|
| closure measurement script | `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/closure.py` |
| WebKit capture read (vision) | `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-users.png` |
| capture-matrix rows | `docs/tranches/V/megatranche/audit/visual/REPORT.md:128,143,158,173` |
| live Chromium probes (read-only) | `http://localhost:9000#/admin/users` — roster text, `--accent-live`, network log, glass-ui chunk count |
| glass-ui surface | `node_modules/@mkbabb/glass-ui/dist/components/{button,chip,dialog}/*.d.ts`; `grep -l "dialog-TNRDkcE4" dist/*.js`; `package.json#exports` (74 entries) |
| ConfirmDialog provenance | `git show f2c8f565 -- demo/palettes/browser/admin/AdminUsersPanel.vue` |
| r1 pass, preserved verbatim | `challenge-L-library.2026-07-24-prior.md` |

**Scope receipt.** This seat wrote exactly two files, both under
`docs/tranches/V/megatranche/audit/components/AdminUsersPanel/`: this report, and the verbatim
preservation copy of the r1 report. No file in `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/**`, `scripts/dev/dev.sh` or any `INBOX.md` was modified. Browser use was
read-only: navigation and evaluation only, no click, no form entry, no mutation of any admin data.
