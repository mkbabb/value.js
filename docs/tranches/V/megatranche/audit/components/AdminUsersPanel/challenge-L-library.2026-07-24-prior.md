# CHALLENGE-L — library structure under `AdminUsersPanel.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)** — the tier declared at spawn. Seat
declaration matches served tier; no inherited/undeclared seat.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface
- Verdict: **DEFECTIVE**

---

## 1. The traced import graph

Every edge out of the subject file, with its home and a boundary judgement.

| # | Line | Specifier | Resolves to | Judgement |
|---|------|-----------|-------------|-----------|
| 1 | 186 | `vue` | framework | **DEFECT (L-10)** — `Transition` is imported; 1 of 17 `<Transition>` users does this |
| 2 | 187 | `../../../color-session/keys` | `demo/color-session/keys.ts` | **DEFECT (L-9)** — feature→feature edge; sibling colour datum arrives as a prop |
| 3 | 188 | `../../../ui/button` | `demo/ui/button/index.ts` → `@mkbabb/glass-ui` | **DEFECT (L-4)** — pure alias barrel |
| 4 | 189 | `../../../ui/badge` | `demo/ui/badge/index.ts` → `@mkbabb/glass-ui` | **DEFECT (L-4)** — pure alias barrel |
| 5 | 190–197 | `@mkbabb/glass-ui/dialog` | glass-ui 7.0.0 subpath | SOUND — and it is the *right* form, which is why #3/#4 are wrong |
| 6 | 198 | `@lucide/vue` | icon package | SOUND |
| 7 | 199 | `../../types` | `demo/palettes/types.ts` | SOUND — area-local domain types, `import type` ✓ |
| 8 | 200 | `../../usePalettePorts` | `demo/palettes/usePalettePorts.ts` | **DEFECT (L-2)** — 34-member god port injected for 1 method; also closes a cycle (L-1) |
| 9 | 201 | `../card` | `demo/palettes/browser/card/index.ts` | SOUND — named barrel, same area |
| 10 | 202 | `../../../shared/ui/EmptyState.vue` | `demo/shared/ui/EmptyState.vue` | SOUND — pre-existing shared atom, 12 consumers |
| 11 | 203 | `./AdminListSkeleton.vue` | sibling | **DEFECT (L-6)** — third copy of the row grammar |

**`@mkbabb/value.js` is not imported by this component at all.** The public-surface question is
therefore vacuous here, and I confirmed the demo-wide dogfood is clean anyway — see §4 (negative
proof). No deep `src/` import exists anywhere on this component's edge.

---

## 2. Findings

### L-1 · BLOCKER — the state layer imports the view and drives it through a template ref

The direction of dependency is inverted. `useAdminUsers` — a domain/server-state composable — imports
the SFC, holds a ref to its instance, and mutates the component's private state by calling four
exposed methods.

```
demo/palettes/useAdminUsers.ts:14   import type { AdminUsersPanel } from "./browser/admin";
demo/palettes/useAdminUsers.ts:27   const adminUsersPanelRef = ref<InstanceType<typeof AdminUsersPanel> | null>(null);
demo/palettes/useAdminUsers.ts:95     adminUsersPanelRef.value?.updatePaletteTier(palette.slug, result.tier);
demo/palettes/useAdminUsers.ts:117    adminUsersPanelRef.value?.removeUserPalette(palette.slug);
demo/palettes/useAdminUsers.ts:132    adminUsersPanelRef.value?.clearUserPalettes(slug);
demo/palettes/useAdminUsers.ts:146    adminUsersPanelRef.value?.clearUserPalettes(slug);
demo/palettes/usePalettePorts.ts:123  admin.adminUsersPanelRef.value?.onPruneDone(pruned);
demo/palettes/admin/AdminPane.vue:27         ref="adminUsersPanelRef"
demo/palettes/admin/AdminPane.vue:134 const adminUsersPanelRef = pm.adminUsersPanelRef;
demo/palettes/browser/admin/AdminUsersPanel.vue:389
    defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes });
```

**The module cycle.** `useAdminUsers.ts` → `browser/admin/index.ts` → `AdminUsersPanel.vue` →
`usePalettePorts.ts` → `useAdminUsers.ts`. It is acyclic *at runtime only* because line 14 is
`import type` and `verbatimModuleSyntax` (`tsconfig.base.json:8`) erases it. The runtime *control
flow* traverses the same loop anyway (line 123 of `usePalettePorts.ts` calls into the component).
The day anyone needs a value from `./browser/admin` in `useAdminUsers.ts`, the cycle becomes real.

**Uniqueness, measured.** Of the 25 `.ts → .vue` import edges in `demo/`, 24 are barrel re-exports
(`export { default as X } from "./X.vue"`). `useAdminUsers.ts:14` is the **only** state module that
imports a component:

```
$ grep -rn --include='*.ts' 'from "[^"]*\.vue"' demo/ | wc -l
25            # 24 barrels + useAdminUsers.ts:14
```

Of the 14 `defineExpose` sites in `demo/`, `AdminUsersPanel`'s is the largest (5 members), the only
one whose consumer is a **composable** rather than a parent template, and the only one exposing
**mutable state** (`userPalettes`).

**Mechanism.** `expandedUserSlug` / `userPalettes` / `loadingUserPalettes` are server state for "the
palettes of the expanded user". The component *owns* them (`AdminUsersPanel.vue:236-238`); every
mutation *originates* in `useAdminUsers`. Ownership and mutation sit in different layers, so the
composable has to reach across the layer boundary through a ref. Unique semantic ownership is
violated: the concept has one home for storage and another for change.

**Reproduction — the `?.` is a masking fallback (edict 2).** `AdminPane.vue:26` mounts the panel
under `v-if="subView === 'admin-users'"`. `useAdminUsers.onDeleteUser` (`:140-150`) awaits
`deleteUser(token, slug)` and *then* calls `adminUsersPanelRef.value?.clearUserPalettes(slug)`.
Switch the admin sub-view during that await and `adminUsersPanelRef.value` is `null`; the optional
chain silently swallows the reconciliation. The panel remounts later with `userPalettes` never
cleared — the deleted user's palette list is still in the component. Every one of the five call
sites carries the same swallow.

**Cure (transposition).** Lift the three refs into a `useAdminUserPalettes()` composable colocated
with `useAdminUsers` — it is the same server-state slice the composable already writes. The panel
receives `expandedUserSlug`, `userPalettes`, `loadingUserPalettes` as props and emits
`toggleUserExpand`. Then delete, in order: `AdminUsersPanel.vue:389` (`defineExpose`),
`AdminUsersPanel.vue:352-387` (four state functions), `useAdminUsers.ts:14` + `:27` + the `?.` at
`:95/:117/:132/:146`, `usePalettePorts.ts:123` + `:197`, `AdminPane.vue:27` + `:134`. Net: −5 exposed
members, −1 port member, −1 inverted import edge, −1 latent cycle, −5 masking fallbacks.

---

### L-2 · MAJOR — the ADMIN "port" is the god facade renamed; this component injects 34 members to call 1

```
$ node -e '…count adminPort members in usePalettePorts.ts…'
adminPort members: 34
adminUsers, adminUsersPanelRef, filteredAdminUsers, loadAdminUsers, loadUserPalettes,
loadingUsers, usersLoadError, onDeleteUser, onDeleteUserPalettes, onAdminDeleteUserPalette,
onUserSortChange, userSortMode, onFeaturePalette, onPrune, adminColorQueue, filteredColorQueue,
loadColorQueue, loadingColorQueue, queueLoadError, filteredApproved, loadApprovedColors,
loadingApproved, approvedLoadError, approvedLoaded, onApproveColor, onRejectColor, onDeleteColor,
searchQuery, searchPlaceholder, expandedId, toggleExpand, audit, flagged, tags
```

`AdminUsersPanel.vue:234` injects all 34. Its total use:

```
$ grep -n "pm\." demo/palettes/browser/admin/AdminUsersPanel.vue
233:// D.W3 Lane B: route through pm.loadUserPalettes (was: direct getUserPalettes)   ← comment
361:        userPalettes.value = await pm.loadUserPalettes(slug);                     ← the only use
```

**Two data paths from one source.** `AdminPane.vue:26-42` already passes 6 props and wires 7 emit
handlers, *all* sourced from the same `pm`. So the panel reads its data through props and reaches
its one behaviour through inject. One source, two mechanisms, in one parent/child pair.

`usePalettePorts.ts:20-30` states the intent in its own header: the RF-15 dissolution of "the old
`usePaletteManager` god facade (153 L, ONE cross-everything injected blob) into FIVE narrow,
feature-owned ports." The admin port spans five unrelated sub-domains — users, colour-name queue,
audit, flagged, tags — plus search and card-expansion. 34 members is not narrower than 153 lines in
any sense a consumer can feel: no consumer of this port can be reasoned about without reading all 34.
The facade was renamed, not dissolved (edict 1).

**Cure.** With L-1 applied, `loadUserPalettes` moves to the parent and the inject at `:234` deletes
outright — the panel becomes purely prop/emit driven, testable without a provider. Structurally,
split `adminPort` along its five real seams; the sub-composables (`useAdminUsers`,
`useColorNameQueue`, `useAdminAudit`, `useAdminFlagged`, `useAdminTags`) already exist and already
own their slices — the port's only work today is re-aggregating them into one blob.

---

### L-3 · MAJOR — 51 dead `variant` props: the shadcn vocabulary survived the Glass 7 adoption, and this one file speaks both

glass-ui 7.0.0 `Button` has **no `variant` prop**:

```
node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;                 // semantic intent, orthogonal to emphasis
    size?: ButtonSize; iconOnly?: boolean; loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```

```
$ grep -o "outline\|ghost" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | sort | uniq -c
(no output — zero matches)

$ grep -o 'emphasis: { default[^,}]*' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
emphasis: { default: "secondary"
```

The strings `outline` and `ghost` do not exist anywhere in the shipped button chunk. Every button
carrying them renders at `emphasis="secondary"`.

**In the subject file — both vocabularies, 40 lines apart:**

| Line | Prop | Status |
|------|------|--------|
| 22 | `variant="outline"` (Prune empty) | DEAD → renders `secondary` |
| 33 | `variant="outline"` (Refresh) | DEAD |
| 58 | `variant="outline"` (Retry) | DEAD |
| 114 | `variant="outline"` (Palettes) | DEAD |
| 123 | `variant="ghost"` (Delete user) | DEAD |
| 174 | `emphasis="text"` (Cancel) | correct Glass 7 |
| 175 | `:tone="confirmDestructive ? 'destructive' : 'neutral'"` | correct Glass 7 |

The panel's own comment at `:107-111` asserts a design invariant the design system never receives:
"the per-row destructive is quieted to ink-at-rest — red arrives on hover/focus, never as 5 resting
beacons down the list." The quieting is expressed as `variant="ghost"` — a prop glass-ui discards.
The intended rung is `emphasis="quiet"`.

**Live DOM proof** (Playwright `browser_evaluate` against http://localhost:9000, verbatim output):

```json
{"tag":"BUTTON","text":"Login","variant":"outline","aria":null}
{"tag":"BUTTON","text":"@mbabb","variant":"ghost","aria":null}
{"tag":"BUTTON","text":"Try again","variant":"outline","aria":null}
```

The prop falls through `$attrs` and ships as a literal HTML attribute on the rendered `<button>`.

**Fleet extent** (script over every `<Button …>` opening tag in `demo/**/*.vue`):

```
Button sites passing a dead `variant` prop: 51
files: 22
  demo/palettes/browser/admin/AdminUsersPanel.vue [(21,'outline'),(32,'outline'),(58,'outline'),(112,'outline'),(122,'ghost')]
  demo/palettes/browser/dialog/FlagReportDialog.vue [(38,'outline'),(41,'destructive')]   ← a TONE passed as a dead variant
  demo/palettes/browser/dialog/MigratePalettesDialog.vue [(14,'default'),(22,'outline'),(31,'ghost')]
  demo/workbenches/generate/GenerateControls.vue [(157,'primary-audacious'),…]
  … 18 more files
```

**The gate does not catch it:**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
vue-tsc exit=0
0 errors
```

vue-tsc treats an unknown lowercase prop on a component as an HTML fallthrough attribute, so the
hard CI typecheck landed at W44 is structurally blind to this whole class.

**Cure.** Mechanically: `variant="outline"` → `emphasis="secondary"`, `variant="ghost"` →
`emphasis="quiet"`, `variant="destructive"` → `tone="destructive"`, `variant="default"` →
`emphasis="primary"`. Structurally, the reason 51 sites can carry a dead prop for a whole tranche is
that nothing rejects it: glass-ui `Button` should set `inheritAttrs: false` and spread an explicit
allowlist so an unrecognised design-token prop is a visible no-op at the DOM instead of an invisible
one — **this half is a glass-ui-side change and belongs in the BH relay**, not in `demo/`.

---

### L-4 · MAJOR — `demo/ui/`: 19 pure alias barrels; this file uses both the alias and the real subpath

Every file under `demo/ui/` is a one-line re-export:

```
demo/ui/button/index.ts     export { Button } from "@mkbabb/glass-ui";
demo/ui/badge/index.ts      export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
demo/ui/dialog/index.ts     export { Dialog, DialogClose, DialogTrigger, DialogHeader, DialogTitle,
                                     DialogDescription, DialogContent, DialogFooter } from "@mkbabb/glass-ui";
… 16 more, all identical in kind
```

The subject file imports `Button`/`Badge` through the barrels (`:188`, `:189`) and `Dialog*` through
the real subpath (`:190-197`) — **two specifiers for one design system in one file**, and the file
even proves the barrel is unnecessary by not using `demo/ui/dialog`, which exists and exports the
same eight symbols.

```
$ (files importing from a demo/ui barrel)                                     35
$ (files importing from BOTH a demo/ui barrel and @mkbabb/glass-ui directly)  24
```

This is precisely the alias/dual-path the standing no-legacy law forbids. It also widens the declared
module graph: glass-ui 7.0.0 publishes **74 export entries** including granular `./button`, `./badge`,
`./card`, `./dialog`, `./select`, `./slider`, `./switch`, `./tooltip`, `./popover`, `./label`,
`./separator`, `./collapsible`, `./dropdown-menu`. Measured:

```
dist/button.js       → 1 chunk   (import { t as e } from "./button-Bu9F4uU6.js")
dist/glass-ui.js     → 43 relative chunks, 25 239 bytes
```

`demo/ui/button` names the 43-chunk root entry where `@mkbabb/glass-ui/button` names one.
(*Hypothesis, unmeasured:* Rollup tree-shaking likely recovers most of this in the production build.
The **dev-server graph is not tree-shaken**, and W44's boot-cost carries in `CARRY-LEDGER.md` §F make
this worth measuring before it is dismissed.)

**Cure.** Delete `demo/ui/` entirely; every consumer imports the glass-ui subpath directly. This
*removes* a directory rather than adding one, so it satisfies edict 3 rather than straining it.
35 files, mechanical.

---

### L-5 · MAJOR — the unauthorized state is costumed as an empty roster; the auth precondition is duplicated 22×

```
demo/palettes/useAdminUsers.ts:54-58
    async function loadAdminUsers() {
        const token = getAdminToken();
        if (!token) return;              ← returns WITHOUT touching loadingUsers or usersLoadError
        loadingUsers.value = true;
```

```
AdminUsersPanel.vue:63
  <EmptyState v-else-if="users.length === 0" eyebrow="· roster clear ·" message="No users found." />
```

**Reproduction — the certified visual audit already captured it.**
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-users.png`: the dock reads
**"Login"** (no admin session) and the Users panel reads **"· ROSTER CLEAR · / No users found."**
`REPORT.json` for that row: `consoleErrors: []`, `pageErrors: []`, `bodyTextLength: 273`,
`counts.button: 15` — the full admin console renders to an unauthenticated visitor and affirmatively
reports a clear roster. All four matrices (desktop/mobile × light/dark) show the same.

The component's own comment at `:49-50` states the invariant it breaks:

> "W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never costumes as an empty roster."

The cure was applied to the `catch` branch (`useAdminUsers.ts:62-65` → `loadError` → the error
`EmptyState` at `:51-62`) and not to the guard branch — which is the branch every unauthenticated
visitor takes. The panel models three states (loading / error / empty); the domain has four.

**The structural half.** Authorization is a *route* precondition modelled as a per-method early
return:

```
$ grep -c "if (!token)" demo/palettes/useAdminUsers.ts
11
$ grep -rn --include='*.ts' "if (!token)" demo/ | wc -l
22       # across useAdminUsers, useAdminAudit, useAdminFlagged, useAdminTags, useColorNameQueue
```

and there is no route guard: `grep` over `demo/shell/` for `beforeEnter|requiresAdmin|guard` on admin
views returns nothing, and `demo/shell/viewSchema.ts:188` declares `"admin-users"` with no auth meta.

**Cure.** One gate, at the composition boundary: an `<AdminGate>` wrapper in `AdminPane.vue` (or an
`auth: "admin"` flag in `viewSchema` honoured by one guard in `useViewManager`) that renders an
authentication plate when `!isAdminAuthenticated`. Inside the gate, `getAdminToken()` is a non-null
contract and all 22 `if (!token) return` guards delete. The panel then never needs an "unauthorized"
state at all, because it never mounts unauthorized.

---

### L-6 · MAJOR — the admin row grammar has three homes, and the declared atom is used by one of three sites

| Site | Home | Class string |
|------|------|--------------|
| the atom | `AdminListItem.vue:13` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0` |
| the users row | `AdminUsersPanel.vue:80` | `flex items-center gap-3 px-3 py-2.5 transition-colors` (+ `border-card-edge` on the wrapper at `:68`) |
| the skeleton | `AdminListSkeleton.vue:12` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge` |

`AdminListItem` already exposes exactly the three slots this row needs — `swatch` / `content` /
`actions`. Its only consumer is `AdminNamesPanel.vue` (`:44`, `:94`).
`AdminListSkeleton.vue:4-5` names its own source in a comment — *"shaped as the AdminListItem row
grammar"* — which is the tell: the atom is being **transcribed** rather than **used**. A change to the
row rhythm must now land in three files, two of which are not the atom.

**Cure.** `AdminUsersPanel`'s row becomes `<AdminListItem>` with the disclosure semantics (role,
tabindex, aria-expanded, keydown) hoisted *into* the atom behind an `interactive` prop — the atom is
the right home for "an admin list row", disclosure included. `AdminListSkeleton` becomes
`<AdminListItem>` with `<Skeleton>` in its slots. One home, three consumers.

---

### L-7 · MAJOR — the transient action-result beat is reimplemented, and the reimplementation leaks its timer

The concept already has a component:

```
demo/palettes/browser/card/PaletteCard/ActionFeedback.vue
  <Transition name="vj-celebrate">          … the same family
  props: { message, variant, visible, autoDismissMs = 2500 }
  watch(() => props.visible, v => { if (timer) clearTimeout(timer); … })   ← cancels on re-trigger
```

The panel builds it again, worse:

```
AdminUsersPanel.vue:16-20   <Transition name="vj-celebrate"> … {{ pruneResult }}
AdminUsersPanel.vue:301-309
    const pruneResult = ref<string | null>(null);
    function onPruneDone(count: number) {
        pruning.value = false;
        pruneResult.value = count > 0 ? `Pruned ${count} user…` : "No empty users to prune";
        setTimeout(() => { pruneResult.value = null; }, 3000);   ← no handle, no clearTimeout, no onUnmounted
    }
```

**Reproduction (HYPOTHESIS — mechanically certain from the code; not executed, an admin token is
required and the dev server has no seeded admin session):** two prunes inside 3 s and the first
timer nulls `pruneResult` while the second message is still young — the second confirmation vanishes
in under 3 s. Separately, a prune followed by a sub-view switch (`AdminPane.vue:26 v-if`) leaves a
live timer writing to an unmounted component's ref.

**The structural half.** `ActionFeedback.vue` is a generic feedback atom living inside
`browser/card/PaletteCard/` — the private folder of one card. That wrong home is *why* the admin
panel could not find it; nothing about the concept is card-specific.

**Cure.** Move `ActionFeedback.vue` beside `EmptyState.vue`/`PaneHeader.vue` in `demo/shared/ui/`
(existing directory — no new dir, edict 3 satisfied) and use it here. The panel's `pruneResult`
becomes `message` + `v-model:visible`; the raw `setTimeout` deletes.

---

### L-8 · MAJOR — the confirmation concept has no home, so exactly one of three destructive admin panels confirms

The panel carries a 35-line hand-rolled confirm state machine — 7 refs plus `showConfirm` plus
`onConfirm` (`:254-286`, ~9 % of the file). It is the only one in the repo:

```
$ grep -rln --include='*.vue' 'confirmOpen' demo/
demo/palettes/browser/admin/AdminUsersPanel.vue
$ grep -rn --include='*.vue' --include='*.ts' 'function showConfirm' demo/
demo/palettes/browser/admin/AdminUsersPanel.vue:263
```

Its two sibling destructive admin surfaces delete irreversibly with **no confirmation at all**:

```
demo/palettes/browser/admin/AdminFlaggedPanel.vue:99   @click="flagged.deletePalette(item.paletteSlug)"
demo/palettes/browser/admin/AdminTagsPanel.vue:101     @click="tagsApi.deleteTag(tag.name)"
```

(`AdminTagsPanel:98` also uses a raw `<button>` rather than the design-system `Button` — a fourth
path to a button.)

`AdminUsersPanel.vue:280-282` records the cause: "Glass 7 folded ConfirmDialog onto the Dialog
family … the old ConfirmDialog auto-close, made explicit at the call site." The fold removed the
shared home and left the reimplementation at the one call site that bothered. The safety invariant
"a destructive admin action is confirmed" is now enforced by whichever panel happened to hand-roll it.

**Cure.** One `useConfirm()` composable next to the admin panels returning `{ confirm(opts): Promise<boolean> }`
plus one `<ConfirmDialog>` composed from the Glass 7 `Dialog` family, sited in `demo/shared/ui/`.
All three panels call it. −35 lines here, +2 confirmations there. If the ConfirmDialog *composition*
is generally useful (it is — three call sites in this repo alone), the preset belongs back in
glass-ui, and that is a BH-relay item.

---

### L-9 · MINOR — one component, one concern (colour), two mechanisms

`safeAccent` is injected from `demo/color-session/keys` at `:232`. `cssColor` arrives as a prop
(`:209`) that `AdminPane.vue:133` itself obtained by `inject(CSS_COLOR_KEY)` — from the *same module*.
Two adjacent colour data, one injected across a feature boundary and one prop-drilled through the
pane. `demo/palettes/**` reaching directly into `demo/color-session/**` is a feature→feature edge
taken by 11 files. Pick one: either the colour session is an app-wide ambient (then `cssColor` is
injected too and the prop deletes) or it is a pane-level input (then `safeAccent` is a prop).

### L-10 · MINOR — `Transition` imported from `vue`

```
$ grep -rn --include='*.vue' 'from "vue"' demo/ | grep -w Transition
demo/palettes/browser/admin/AdminUsersPanel.vue:186:import { inject, ref, computed, Transition } from "vue";
$ grep -rl --include='*.vue' '<Transition' demo/ | wc -l
17
```

1 of 17 `<Transition>` users imports it. The local binding shadows the compiler built-in — identical
behaviour, gratuitous divergence.

### L-11 · MINOR — per-instance geometry overrides on a design-system primitive (edict 5)

`:24`, `:35`, `:116`, `:125` each hand-set `h-7 px-2.5` / `h-7 px-2` plus `font-display text-caption
cursor-pointer` on a `<Button size="sm">`. glass-ui ships `size: "xs" | "sm" | "md" | "lg"`; `xs` is
the rung being reconstructed by hand. Fleet-wide: **22 `<Button>` sites in 11 files hand-set height
in `class`** (measured). If `xs` is not the right height for a dock-adjacent toolbar, the token moves
in glass-ui — not in eleven demo files.

---

## 3. The greenfield lattice

Structured today with no legacy, the admin-users slice is five modules with one direction of flow:

```
demo/shell/viewSchema.ts        auth: "admin" on the five admin views
      │ (one guard, one place)
      ▼
demo/palettes/admin/AdminGate.vue        renders the auth plate or its slot
      ▼
demo/palettes/admin/AdminPane.vue        composition root for the console
      │  props ▼                                   ▲ emits
demo/palettes/browser/admin/AdminUsersPanel.vue    pure view — zero inject,
      │                                            zero defineExpose, zero refs
      ├── AdminListItem.vue          the ONE row atom (interactive variant included)
      ├── AdminListSkeleton.vue      AdminListItem + <Skeleton> slots
      ├── shared/ui/EmptyState.vue   the ONE empty/error plate  (unchanged)
      ├── shared/ui/ActionFeedback.vue  the ONE transient beat   (moved here)
      └── shared/ui/ConfirmDialog.vue + useConfirm()             (new home, 3 consumers)

demo/palettes/useAdminUsers.ts         roster state  — no token guards, no component import
demo/palettes/useAdminUserPalettes.ts  expansion state — owns expandedUserSlug/userPalettes
demo/palettes/api/admin-users.ts       transport (already correct: token as a parameter)
```

Four rules that make it hold, each of which is an *absence* rather than an addition:

1. **`.ts` never imports `.vue` outside a barrel.** Kills L-1 by construction, and with it the cycle
   and the five `?.` swallows.
2. **`defineExpose` is for parent templates only, never for composables, and never for state.**
   The one legitimate use of an instance handle is an imperative *command* a parent template fires
   (`openFilePicker`), not a state write.
3. **One specifier per external package.** `@mkbabb/glass-ui/<subpath>` everywhere; `demo/ui/`
   deleted. Kills L-4, and makes L-3-class drift visible because the import line names the real
   package.
4. **Preconditions are gated once at the boundary, never re-asserted per method.** Kills L-5 and its
   22 duplicated guards.

The port layer survives, split five ways along its existing sub-composable seams. `AdminUsersPanel`
becomes a leaf: 391 lines → roughly 200, no `inject`, no `defineExpose`, no timer, no confirm machine,
no row transcription — and mountable in a test with props alone.

---

## 4. Negative proof — what I checked on this edge and found sound

- **The published surface is dogfooded correctly.** The demo imports value.js only through the
  seven bare subpaths (`@mkbabb/value.js/{color,css,easing,math,quantize,transform,value}`), and
  `vite.config.ts:37-50` *generates* the self-alias set from `package.json#exports` so it cannot
  drift. `grep` for `@src/`, `../../src/`, or any deep path in `demo/` returns nothing.
  `AdminUsersPanel` imports value.js not at all — no false proof of the public API here.
- **`import type` discipline (edict 8) is clean.** `:199` `import type { Palette, User }`; `:186`
  and `:200-203` are all genuine value imports. `vue-tsc -p tsconfig.demo.json --noEmit` exits 0.
- **Animations are rooted correctly (edict 6).** `vj-celebrate` is defined in
  `demo/styles/animations.css:142-165` with per-instance geometry passed as CSS custom properties;
  `slug-pill` in `demo/styles/foundation.css:585`. Nothing is inlined, nothing was deleted.
- **`demo/shared/` is not a new contrivance.** It predates this component and has 12 `EmptyState`
  consumers; L-7's cure moves a file *into* it rather than creating anything.
- **Reactive props destructure (edict 7) is idiomatic.** `:205-220` destructures `defineProps` with a
  default on `loadError`; `emptyCount` at `:241` reads `users` inside a `computed` and stays reactive.
- **No a11y defect on this route is attributable to this component.** All four
  `safari-*` rows in `REPORT.json` report the same 4 `smallTapTargets` — a 160×23 `input` and three
  22×22 buttons labelled "Switch to slug", "Generate new slug", "Cancel". Every one is in the dock
  (`demo/shell/dock/menus/ProfileSection.vue`), not in `AdminUsersPanel`. `namelessButtons: 0`,
  `imgNoAlt: 0`, `overflowX: 0`, `consoleErrors: []`, `pageErrors: []` on all four matrices. The
  roving-tabindex / Full-Keyboard-Access delta noted in the brief (MT-F022) is confirmed not a
  library-structure concern and is not counted here.
- **Named historical suspects are not on this edge.** `ActionBarLayer`'s local `useLayerTransition`
  reimplementation, `demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers`, and the
  three parallel `useDark` stores are all reachable from `demo/palettes/` but none is on any import
  path out of `AdminUsersPanel.vue`. Out of scope for this seat; unexamined here.
- **The api layer is correctly shaped.** `demo/palettes/api/admin-users.ts` takes the token as a
  parameter and delegates to one `adminRequest` — no ambient token, no store reach-in. The rot is
  entirely in the composable layer above it.

---

## 5. Summary

| id | severity | defect |
|----|----------|--------|
| L-1 | BLOCKER | `useAdminUsers.ts:14/27` imports the SFC and drives it via `defineExpose`; latent module cycle; 5 masking `?.` |
| L-2 | MAJOR | 34-member `adminPort` injected for one method; props + inject as two paths from one source |
| L-3 | MAJOR | 51 dead `variant` props fleet-wide (5 here); both Glass 7 and shadcn vocabularies in one file; vue-tsc blind |
| L-4 | MAJOR | `demo/ui/` = 19 alias barrels; barrel and real subpath both used in this file; 24 files use both |
| L-5 | MAJOR | unauthorized costumes as "· roster clear ·" (screenshot); 22 duplicated `if (!token) return`; no route guard |
| L-6 | MAJOR | admin row grammar transcribed in 3 places; the declared atom serves 1 of 3 |
| L-7 | MAJOR | `ActionFeedback` reimplemented inline with an uncancelled `setTimeout`; the atom is homed in a card's private folder |
| L-8 | MAJOR | confirm machine hand-rolled here; the two sibling destructive panels confirm nothing |
| L-9 | MINOR | colour arrives by inject and by prop in the same component |
| L-10 | MINOR | `Transition` imported from `vue` — 1 of 17 |
| L-11 | MINOR | per-instance button geometry (`h-7 px-…`) — 22 sites in 11 files |

**Strongest defect: L-1.** It is the only one that inverts a layer, and it is the root of L-2 (the
port carries `adminUsersPanelRef` only to serve it). Curing L-1 deletes a port member, a
`defineExpose`, an import edge, a latent cycle and five silent failure swallows in one move.
