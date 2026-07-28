# CHALLENGE-L — library structure under `AdminUsersPanel.vue` (r4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with. The seat is declared, not inherited and not defaulted.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines, area `palettes`, route `#/admin/users`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, working HEAD `4f78e57b` (spawn brief cites `c654824e`; the delta is docs-only — `git log --oneline -1` pasted below)
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface
- **Verdict: DEFECTIVE**

```
$ git log --oneline -1
4f78e57b docs(V·megatranche): register owner marks OM-11..OM-13 …
```

### Pass provenance and method

Three prior passes exist at this path and are preserved verbatim — nothing is lost:

| pass | file | findings |
|---|---|---|
| r1 (2026-07-24) | `challenge-L-library.2026-07-24-prior.md` | 11 |
| r2 (2026-07-27) | `challenge-L-library.2026-07-27-r2-prior.md` | 14 |
| r3 (2026-07-27) | `challenge-L-library.2026-07-27-r3-prior.md` | 18 |
| **r4 (this)** | `challenge-L-library.md` | **24** |

**Method, stated honestly.** I opened blind: I traced the subject's import closure, ran `madge`,
ran `ESLint --print-config`, read the four Safari captures, and drove one live Chromium probe —
**all before opening r3**. Then I reconciled. The reconciliation runs in both directions:

- **Six findings are NEW in r4** — **L-19** (the prune confirmation under-states an irreversible
  global delete), **L-20** (the paginated wire contract is discarded at the composable boundary),
  **L-21** (the admin console is homed inside the community-browse feature), **L-22** (the cluster
  runs two opposite wiring conventions — **and r3's proposed lattice adopts the minority one**),
  **L-23** (three dead exports re-grown one layer above the layer that purged them), **L-24** (the
  cycle count is **4**, not one, and no gate in this repo can see any of them). None appears in r1,
  r2 or r3.
- **Nine findings I re-derived independently** and they match r3/r2 — tagged below with the command
  I ran, where my instrument differed.
- **One correction *of* r3, in the tree's favour**: r3's greenfield lattice keeps
  `AdminUsersPanel.vue` under `browser/admin/` and re-homes it as a *props-only* view. Both halves
  are wrong — see **L-21** and **L-22**. r3 is otherwise the strongest of the three prior passes and
  I have not re-litigated its evidence.

**L-19 is the headline of this pass.** It is the only finding in four passes that puts an
irreversible destructive action behind a confirmation dialog that systematically misstates what the
action will destroy, and its mechanism is pure library structure: a pagination contract dropped at a
module boundary, three modules upstream of the button.

---

## 0 · The import lattice, traced

Every specifier in `<script setup>`, resolved to its physical home:

| # | line | specifier | resolves to | judgement |
|---|------|-----------|-------------|-----------|
| 1 | 186 | `vue` | framework | L-14 — `Transition` is a compiler built-in; the import is inert |
| 2 | 187 | `../../../color-session/keys` | `demo/color-session/keys.ts:9` | L-9 · L-18 |
| 3 | 188 | `../../../ui/button` | `demo/ui/button/index.ts` — **one** re-export line | L-5 — alias barrel |
| 4 | 189 | `../../../ui/badge` | `demo/ui/badge/index.ts` — **one** re-export line | L-5 — alias barrel |
| 5 | 190–197 | `@mkbabb/glass-ui/dialog` | glass-ui 7.0.0 published subpath (present in its `exports`) | SOUND — **and the correct form, which is what convicts #3/#4** |
| 6 | 198 | `@lucide/vue` | icon package | SOUND |
| 7 | 199 | `../../types` | `demo/palettes/types.ts` | L-16 · **L-20** — the module that declares `PaginatedResponse` the caller then discards |
| 8 | 200 | `../../usePalettePorts` | 275-line wiring module, imported for **one** `Symbol` | L-1 · L-2 · L-3 · **L-24** |
| 9 | 201 | `../card` | `demo/palettes/browser/card/index.ts` | SOUND as a barrel — **L-21** as a home |
| 10 | 202 | `../../../shared/ui/EmptyState.vue` | raw `.vue`; the area publishes no barrel | L-15 |
| 11 | 203 | `./AdminListSkeleton.vue` | sibling | L-7 · L-17 |

Two structural facts fall straight out of the table and are worth stating before any finding:

- **Row 5 is the right shape and rows 3–4 are the wrong shape, in the same file.** One component
  reaches the same design system by two different routes: a demo-local alias barrel and the
  package's published subpath. `demo/ui/dialog/index.ts` exports the identical eight `Dialog*`
  symbols this file imports from `@mkbabb/glass-ui/dialog` — the dual path is not hypothetical, both
  ends of it are live in this one component. (L-5, r3-confirmed.)
- **Row 8 is a 275-line module entered for a `Symbol`.** The injection keys are declared at the
  bottom of the module that *wires* the ports (`usePalettePorts.ts:270-274`), not in a leaf. Row 2
  shows the correct precedent already in the tree — `color-session/keys.ts` is a leaf whose only
  imports are `import type`. (L-2, r3.)

### `@mkbabb/value.js` — the published-surface axis is CLEAN, proved not assumed

The subject imports the library **not at all**. Demo-wide:

```
$ grep -rEoh "from \"(@mkbabb/value\.js[^\"]*|\.\./+src/[^\"]*|/src/[^\"]*)\"" demo \
    --include="*.vue" --include="*.ts" | sort | uniq -c | sort -rn
  24 from "@mkbabb/value.js/color"
  10 from "@mkbabb/value.js/css"
   6 from "@mkbabb/value.js/math"
   5 from "@mkbabb/value.js/easing"
   4 from "@mkbabb/value.js/quantize"
```

Five of the seven published subpaths; **zero** relative `../src/` reaches; **zero** `@src/*`
reaches; **zero** bare-root-barrel reaches. Cross-checked against the map itself:

```
$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize
```

And the Vite self-alias set is *generated* from `package.json#exports`
(`vite.config.ts:37-50`, anchored regexes), so it is structurally incapable of resolving a
specifier a real consumer could not write. **There is no false proof of the public API in this
component or in the demo tree around it.** This is the fourth consecutive pass to reach that
conclusion by an independent instrument; it should now be treated as settled and not re-audited.

---

## 1 · NEW in r4

### L-19 · BLOCKER — the prune confirmation under-states the blast radius of an irreversible, server-global delete **[NEW r4]**

The most destructive control on this surface is guarded by a dialog that names a number computed
from a *page*, while the action it authorises operates on the *corpus*. The two quantities are
unrelated whenever the roster exceeds 50 users.

**The chain, quoted end to end.**

1. The client fetches a hard-capped page and **discards the server's total**:

```ts
// demo/palettes/useAdminUsers.ts:59-61
const res = await listUsers(token, 50);
adminUsers.value = res.data;
usersLoadError.value = null;
```

`listUsers` is typed `Promise<PaginatedResponse<User>>` (`demo/palettes/api/admin-users.ts:21-26`),
and `PaginatedResponse` carries the corpus size:

```ts
// demo/palettes/types.ts:125-130
export interface PaginatedResponse<T> {
    data: T[];
    total: number;      // ← never read anywhere in demo/palettes/useAdminUsers.ts
    limit: number;
    offset: number;
}
```

2. The page length is then handed to the panel under a name that asserts it is the corpus size:

```
demo/palettes/admin/AdminPane.vue:33   :total-users="pm.adminUsers.value.length"
demo/palettes/browser/admin/AdminUsersPanel.vue:219   totalUsers: number;
demo/palettes/browser/admin/AdminUsersPanel.vue:8-10  {{ totalUsers }} user{{ … }}
```

3. The panel computes the destructive action's stated scope from that same capped array:

```ts
// AdminUsersPanel.vue:241
const emptyCount = computed(() => users.filter((u) => !(u.paletteCount ?? 0)).length);
```

```ts
// AdminUsersPanel.vue:289-298
title: `Prune ${emptyCount.value} empty users?`,
description: `This will permanently delete ${emptyCount.value} user…  This cannot be undone.`,
```

4. The action is **global on the server** — no limit, no offset, no slug list from the client:

```ts
// demo/palettes/api/admin-users.ts:69-71
export function pruneEmptyUsers(token: string): Promise<{ pruned: number }> {
    return adminRequest("/admin/users/prune-empty", token, { method: "POST" });
}
```

```ts
// api/src/modules/admin/service/users.ts:228-247
export async function pruneEmptyUsers(services, actorSlug): Promise<number> {
    const slugs = await users.findEmptyUserSlugs();      // ← the whole collection
    …
    const deleted = await services.withTransaction(async (session) => {
        await sessions.deleteByUserSlugs(slugs, session);
        return users.deleteMany(slugs, session);
    });
```

5. The panel then reports the **server's** number back to the user it just mis-quoted:

```ts
// AdminUsersPanel.vue:303-308
function onPruneDone(count: number) {
    pruneResult.value = count > 0 ? `Pruned ${count} user${…}` : "No empty users to prune";
```

**Failure scenario.** Roster of 400 users, 137 of them empty; the first 50 fetched contain 3 empty.
The admin reads **"Prune 3 empty users? This will permanently delete 3 users … This cannot be
undone."**, confirms, and 137 users plus every one of their sessions are deleted in one
transaction. The panel then prints **"Pruned 137 users"**. Nothing is recoverable and the
confirmation was off by 45×.

6. The damage compounds structurally: the local repair after prune only knows about page 1 —

```ts
// demo/palettes/useAdminUsers.ts:191-193
if (result.pruned > 0) {
    adminUsers.value = adminUsers.value.filter((u) => (u.paletteCount ?? 0) > 0);
}
```

— so after a 137-user delete the roster still shows the other 47 rows of page 1 as authoritative and
issues no refetch.

**Reproduction.** `CONFIRMED by code path`, every link quoted above and every file read this pass.
End-to-end browser reproduction requires a roster of >50 users with ≥1 empty user beyond row 50;
this seat is read-only and cannot seed the API, so I do not claim to have run it. The recipe is
deterministic: seed 51+ users where the empty ones sort past row 50, open `#/admin/users` with an
admin token, click **Prune empty**, and compare the dialog's number to the `pruned` count in the
`POST /admin/users/prune-empty` response. Nothing in the chain is conditional.

**Why this is a library-structure defect and not a copy defect.** The panel is not wrong to render
`emptyCount`; it is wrong to *possess* it. A component that receives an unlabelled array cannot know
whether it holds a corpus or a page, and nothing in the type it receives (`users: User[]`,
`totalUsers: number`) carries that distinction. The pagination contract exists, is typed, is
returned by the transport — and is destroyed one module below the component, at
`useAdminUsers.ts:60`. See **L-20**.

**Cure (architectural, not a patch).** The roster composable returns a *page-aware* value object and
never a bare array:

```ts
type Roster =
  | { state: "unauthenticated" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "loaded"; rows: User[]; total: number; offset: number; limit: number };
```

Blast-radius numbers are then *unrepresentable* from client state: the prune confirmation asks the
server for its count first (`GET /admin/users?paletteCount=0&limit=0` → `total`) and names that, or
the endpoint takes an explicit slug list and the confirmation names exactly what it will send. Both
forms make the dialog's number and the action's scope the same quantity by construction. The second
form is preferable — it also makes the operation idempotent and auditable per-slug, which the audit
log already wants (`emitAuditEvent(…, "prune-empty-users", { target: "count=…" })` currently records
a count with no membership).

---

### L-20 · MAJOR — the paginated wire contract is discarded at the composable boundary; three separate surfaces silently lie **[NEW r4]**

L-19 is the worst consequence of this; it is not the only one. `useAdminUsers.ts:59` calls
`listUsers(token, 50)` and takes `.data` alone. The signature it is calling is:

```ts
// demo/palettes/api/admin-users.ts:21-32
export function listUsers(token: string, limit = 20, offset = 0, q?: string):
    Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (q) params.set("q", q);
```

Three capabilities are published by the transport and unreachable from the UI:

| capability | transport | client |
|---|---|---|
| `total` | `PaginatedResponse.total` (`types.ts:127`) | discarded at `useAdminUsers.ts:60` → **L-19**, and the header badge (`AdminPane.vue:122`) + the `{{ totalUsers }}` line both report a page length |
| `offset` | 3rd parameter | never passed; **there is no way to reach user 51** |
| `q` (server search) | 4th parameter | never passed; `filteredAdminUsers` (`useAdminUsers.ts:29-33`) filters the 50 rows client-side, so searching for any user past row 50 renders `· roster clear · No users found.` |

And the sort is in the same position: `onUserSortChange` (`:50-52`) reorders the fetched page, so
`"newest"` shows the newest of an arbitrary 50 rather than the 50 newest.

**The cluster already owns the cure and withholds it from its largest list.** `PaginationBar.vue`
lives in this exact directory:

```
$ grep -rln "PaginationBar" demo
demo/palettes/browser/admin/AdminAuditPanel.vue
demo/palettes/browser/admin/AdminFlaggedPanel.vue
```

Two siblings paginate. The users panel — the largest file in the cluster (391 L vs 120/153/126/152)
and the one wired to the only *irreversible batch* endpoint — does not. The concept has a home in
the same folder and the subject does not reach it.

**Cure.** Fold pagination into the `Roster` value object of L-19 and render `PaginationBar`; delete
the `50` literal. The composable owns `{offset, limit, q}` and passes `q` to the server, which
deletes `filteredAdminUsers`' client-side filter outright (a second home for "which users match"
disappears with it).

---

### L-21 · MAJOR — the admin console is homed *inside* the community-browse feature, and its own parent lives outside it **[NEW r4]**

Physical layout:

```
demo/palettes/admin/AdminPane.vue                  ← the console's composition root
demo/palettes/browser/admin/AdminUsersPanel.vue    ← its children, one level deeper, inside `browser/`
                          AdminNamesPanel.vue  AdminAuditPanel.vue
                          AdminFlaggedPanel.vue  AdminTagsPanel.vue
                          AdminListItem.vue  AdminListSkeleton.vue  PaginationBar.vue
```

The parent is a **sibling** of the feature its children are **inside**. `AdminPane.vue:85` reaches
*down and across* into another feature to render its own body:

```ts
// demo/palettes/admin/AdminPane.vue:79-85
import { AdminUsersPanel, AdminNamesPanel, AdminAuditPanel, AdminFlaggedPanel, AdminTagsPanel }
    from "../browser/admin";
```

And `browser/index.ts` — the module whose header calls itself *"the palette-browser mega-feature's
TOP-LEVEL SEAM … the stable public API of the palette-browser feature"* — publishes the entire
admin console through the browse seam:

```ts
// demo/palettes/browser/index.ts:28-34
export {
    AdminUsersPanel, AdminNamesPanel, AdminAuditPanel, AdminFlaggedPanel, AdminTagsPanel,
} from "./admin";
```

**Why it is wrong, concretely.** `AdminAuditPanel` (an audit log), `AdminTagsPanel` (taxonomy
administration) and `AdminUsersPanel` (account lifecycle) have no relationship to browsing community
palettes. The one genuine dependency runs the other way — `AdminUsersPanel.vue:201` imports
`PaletteCard` from `../card` to render a user's palettes. A *card* is a browse atom; an *admin
console* is not a browse sub-feature. The current layout inverts containment to satisfy one leaf
import.

Consequences that are measurable rather than aesthetic:

- The browse feature's stable public API has 5 admin components in it. Any consumer reading the
  seam to learn what "palette-browser" is, learns wrong.
- `useAdminUsers.ts:14` reaches `./browser/admin` for a *component type* — an edge that reads as
  plausible only because the admin panels live under `browser/`. Re-homing the console makes that
  edge obviously absurd, which is the point (see L-24: the cure for L-1 becomes self-enforcing).
- r3's greenfield lattice leaves `demo/palettes/browser/admin/AdminUsersPanel.vue` at this path.
  That is the one place r3 accepted the tree's premise instead of challenging it.

**Cure.** `demo/palettes/admin/` becomes the console's whole home — pane, five panels, the row atom,
the skeleton, the pagination bar, and an `index.ts` seam. `browser/index.ts` loses its admin block
and returns to being the browse feature. The single real edge (`PaletteCard`) is then an *explicit,
minimal* cross-feature reach through `browser/card` — one named import at one call site, which is
exactly what a barrel seam is for.

---

### L-22 · MAJOR — one cluster, two opposite wiring conventions; the subject uses three channels at once — and r3's proposed cure adopts the minority convention **[NEW r4]**

Measured across the five sibling panels:

```
$ for f in AdminAuditPanel AdminFlaggedPanel AdminTagsPanel AdminNamesPanel AdminUsersPanel; do
    echo "--- $f"; grep -c "defineProps" …/$f.vue; grep -n "inject(" …/$f.vue | head -3;
    grep -n "defineExpose" …/$f.vue; done
```

| panel | `defineProps` | `inject` | `defineExpose` | convention |
|---|---|---|---|---|
| `AdminAuditPanel` | 0 | `ADMIN_PORT_KEY` @ :107 | — | **port-injecting, self-sufficient** |
| `AdminFlaggedPanel` | 0 | `ADMIN_PORT_KEY` @ :149 | — | **port-injecting, self-sufficient** |
| `AdminTagsPanel` | 0 | `ADMIN_PORT_KEY` @ :122 | — | **port-injecting, self-sufficient** |
| `AdminNamesPanel` | 1 | — | — | props/emits |
| **`AdminUsersPanel`** | **1** (6 props) | **2** (`SAFE_ACCENT_KEY` :232, `ADMIN_PORT_KEY` :234) | **1** (5 members, :389) | **all three at once** |

`AdminPane.vue` renders three of its five children bare —

```html
<AdminAuditPanel v-if="subView === 'admin-audit'" />        <!-- :61 -->
<AdminFlaggedPanel v-if="subView === 'admin-flagged'" />    <!-- :64 -->
<AdminTagsPanel v-if="subView === 'admin-tags'" />          <!-- :67 -->
```

— and the fourth with 6 props and 7 emits (`:25-41`), 5 of those props being pure `pm.*` reads of a
port the child *already injects at line 234*.

**The correction of r3.** r3's greenfield lattice specifies `AdminUsersPanel` as a *"pure view —
zero inject, zero defineExpose"* fed by props from `AdminPane`. That deletes the `defineExpose`
(correct, and the same cure I would file) but it also moves the subject **further away from three of
its four siblings**, which already inject. A cluster of five panels would then run 3 inject-only, 2
props-only, with the pane as an adapter for half its children and a passthrough for the other half.
That is not a lattice; it is the current inconsistency with the ratio changed.

**Cure (choose the majority, and make the pane thin).** The console's five panels all inject a
*narrow* console port. `AdminPane` renders them bare, owns only the sub-view switch and the header,
and stops being an adapter. The subject then keeps `inject`, loses all 6 props, all 7 emits, and the
`defineExpose` — a strictly larger deletion than r3's cure, and it converges the cluster instead of
splitting it. This is only safe once L-3's 34-member god-port is split (see §2); a narrow
`AdminUsersPort` of `{ roster, loadRoster, loadUserPalettes, deleteUser, deleteUserPalettes,
pruneEmpty }` is the unit each panel injects.

---

### L-23 · MINOR — three dead exports in `useAdminUsers`, the exact class the layer below it purged, re-grown one layer up **[NEW r4]**

```
$ for s in onImpersonate featurePaletteBySlug deletePaletteAdminBySlug; do
    echo -n "$s: "; grep -rn "$s" demo --include="*.ts" --include="*.vue" \
    | grep -v "useAdminUsers.ts" | wc -l; done
onImpersonate: 0
featurePaletteBySlug: 0
deletePaletteAdminBySlug: 0
```

All three are exported from `useAdminUsers.ts:210,218,219`, and **none** is in `adminPort`
(`usePalettePorts.ts:194-231`) or referenced anywhere else in the demo. `onImpersonate`
(`:71-80`) is the sole reader of the `impersonateUser` transport, so a live API wrapper
(`api/admin-users.ts:59`, re-exported at `api/index.ts:56`) is reachable only from dead code.
`onImpersonate`'s body, in full, is a `console.warn` of a truncated token — it has never had a UI.

This is the same class the api layer's own header records itself purging one wave earlier:

> *"W5-13 · F-5: `setUserStatus`, `importPalettes`, `batchUserAction` deleted — wired wrappers with
> zero UI consumers (`setUserStatus` was self-documented dead since E.W3)."*
> — `demo/palettes/api/admin-users.ts:8-12`

The sweep cleaned the transport layer and did not climb one level to the composable that calls it.
Edict 2 (no legacy code): delete all three, and `impersonateUser` + its `api/index.ts` re-export
with them; the server route remains and re-earns a wrapper when an affordance is built — which is
precisely the disposition the api header already states.

---

### L-24 · MAJOR — the inverted dependency is **four** measured cycles, not one, and no gate in this repository can see any of them **[NEW r4 — quantitative extension of L-1]**

r3 records the L-1 cycle as a single latent type cycle. Measured, it is four, and the mechanism of
the multiplication is itself a structural finding.

```
$ npx madge --extensions ts,vue --ts-config tsconfig.json --circular demo/palettes
Processed 127 files (468ms) (3 warnings)

✖ Found 4 circular dependencies!

1) usePalettePorts.ts > useAdminUsers.ts > browser/admin/index.ts > browser/admin/AdminAuditPanel.vue
2) usePalettePorts.ts > useAdminUsers.ts > browser/admin/index.ts > browser/admin/AdminFlaggedPanel.vue
3) usePalettePorts.ts > useAdminUsers.ts > browser/admin/index.ts > browser/admin/AdminTagsPanel.vue
4) usePalettePorts.ts > useAdminUsers.ts > browser/admin/index.ts > browser/admin/AdminUsersPanel.vue
```

**Barrel amplification.** There is exactly *one* offending source edge —

```ts
// demo/palettes/useAdminUsers.ts:14
import type { AdminUsersPanel } from "./browser/admin";
```

— but it targets a **barrel**, and three of that barrel's other members inject `ADMIN_PORT_KEY`
(L-22's table) and therefore import `usePalettePorts`, which imports `useAdminUsers`. One wrong edge
becomes four cycles because the panels that were *correctly* written (inject-only) are dragged into
a cycle by a sibling's mistake. This is the cost of reaching a barrel for a single symbol, and it is
a general lesson for the mega-tranche: **a barrel converts one bad edge into N.**

**No gate can see it.** Not a hypothesis — three checks:

```
$ node -e "const p=require('./package.json');console.log(JSON.stringify(p.scripts))"
{"lint":"eslint . --max-warnings=0","typecheck":"vue-tsc … --noEmit","test":"vitest run", …}

$ node -e "const p=require('./package.json');console.log('madge' in {...p.dependencies,...p.devDependencies})"
false

$ grep -n "no-cycle\|import/" eslint.config.js
(no output)
```

- `npm run lint` — no `import/no-cycle`, and the boundary rules that exist are dead (L-15; I
  re-derived this independently: `npx eslint --print-config demo/palettes/browser/admin/AdminUsersPanel.vue`
  → `no-restricted-imports: undefined`, same for `useAdminUsers.ts`, while
  `demo/color-picker/App.vue` → the rule is present but its ban pattern `@components/custom/…` uses
  an alias `tsconfig.demo.json:33` records as deleted). Effective coverage of the barrel-seam law:
  **16 of 250 demo `.ts`/`.vue` files nominally, 0 effectively.**
- `npm run typecheck` — module cycles are legal TypeScript; `vue-tsc` reports nothing.
- `npm test` / `npm run test:e2e` — no graph assertion exists.
- `madge` is not installed. I ran it via `npx`, i.e. it is not part of this repo's gates in any form.

Because the edge is `import type`, `verbatimModuleSyntax` erases it and there is **no runtime
cycle** — which is exactly why it has survived four passes and every gate. It is a *type-graph* and
*ownership* cycle, and it is the load-bearing evidence for L-1's severity: the direction of
dependency is inverted and nothing in the toolchain is watching.

**Cure.** One eslint object over `demo/palettes/**/use*.ts` + `demo/**/*.ts` banning `**/*.vue` and
component barrels, plus `madge --circular --extensions ts,vue` wired into `npm run lint`. Both are
absences-of-permission rather than additions of machinery, and both would have failed this cycle at
the commit that introduced it.

---

## 2 · Carried forward, re-derived this pass

Full evidence in the r2/r3 priors. What I re-derived myself, with my own instrument:

| id | sev | re-derivation in r4 |
|---|---|---|
| **L-1** | **BLOCKER** | Same five back-channel call sites found blind (`useAdminUsers.ts:95,117,132,146` + `usePalettePorts.ts:123`) against `AdminUsersPanel.vue:389`'s 5-member `defineExpose`. The state the composable reaches in to mutate — `userPalettes` (`:237`), `expandedUserSlug` (`:236`) — is *data*, owned by a view. **Extended by L-24** with the measured cycle count and the proof that no gate sees it. |
| L-3 | MAJOR | Counted `adminPort` myself: `awk 'NR>=194 && NR<=231' usePalettePorts.ts \| grep -cE "^\s+[a-zA-Z]+[:,]"` → **34** members, three of which (`audit`, `flagged`, `tags`) are *whole nested composable returns* (`useAdminAudit` alone returns 14 — `useAdminAudit.ts:87-102`), so the reachable surface is ~70+. The subject uses **one**: `pm.loadUserPalettes(slug)` at `:361`. `browsePort` measures 32 by the same command — the RF-15 "dissolution of the god facade" produced two 30+-member objects. |
| L-5 | MAJOR | `demo/ui/` is 19 directories each containing a single `index.ts` of pure re-exports (all 19 pasted this pass). Route split measured: **90** imports go through the alias barrels, **37** go direct to the glass-ui root plus ~70 more to its subpaths. `demo/ui/dialog/index.ts` exports the same eight symbols this file imports from `@mkbabb/glass-ui/dialog` — the dual path is closed inside one component. |
| L-6 | MAJOR | Re-ran the archaeology independently: `git show f2c8f565^:…/AdminUsersPanel.vue \| grep -n ConfirmDialog` → `:158 <ConfirmDialog`, `:186 import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog"`. glass-ui 7.0.0's `exports` has `./dialog` and no confirm entry; `dist/components/dialog/` contains 8 `Dialog*` files and no `Confirm*`. Cost of the fold, measured: 372 → **391** lines here (+19), and the identical composition re-grown at `PalettesPane.vue:101-121` carrying the identical comment. |
| L-7 | MAJOR | Counted the transcriptions myself — the admin row chassis exists **five** times: `AdminListItem.vue:11` (the owner), `AdminListSkeleton.vue:9`, `AdminAuditPanel.vue:62`, `AdminFlaggedPanel.vue:47+50`, `AdminUsersPanel.vue:68+80`. `AdminListSkeleton` references the atom **in a comment** (`:4-6`, *"shaped as the AdminListItem row grammar"*) rather than importing it. **Only the owner carries `min-w-0`** — the documented S.W5-12/F-1 fix for the 390 px track blowout, present at `AdminListItem.vue:11` and absent from all four copies. Whether the copies overflow at 390 is a **HYPOTHESIS**: the visual matrix reports `overflowX 0` on all four `/#/admin/users` rows (`REPORT.md:128,143,158,173`) but every capture is of the *empty* roster (screenshots read this pass), so a populated row was never measured on a phone. |
| L-12 | MAJOR | Reproduced blind on the live server before reading r3: `localStorage['palette-admin-token'] → null`, body text → `"Users 0 … 0 users Prune empty Refresh · ROSTER CLEAR · No users found."`. `useAdminUsers.ts:55-56` returns before touching `loadingUsers` **or** `usersLoadError`, so the panel takes `:63` — the empty plate. This falsifies the invariant the file annotates itself with at `:49-50` on the branch **every unauthenticated visitor takes**. Structural root, stated on this axis: `AdminPort` has no `isAdminAuthenticated`; that member is in `sessionPort` (`usePalettePorts.ts:128`) and `browsePort` (`:184`). **The admin console's own port cannot see admin auth.** |
| L-9 | MINOR | `.slug-pill` (`foundation.css:585`) is `@apply text-mono-small font-bold px-2 py-0.5 rounded-full border` and its own comment (`:584`) *mandates* the violation: *"Consumers set `color` / `border-color` per-instance via `:style`."* The subject obeys twice (`:99`, `:168`). glass-ui ships the primitive: `Chip` with `mode:"static"`, `shape:"pill"`, `size`, **`tone?: string`** (`dist/components/chip/types.d.ts`), and `chipVariants` `SIZE.sm = "gap-1 px-2.5 py-1 text-caption"`. Edict 5 with a published cure. |
| L-15 | MAJOR | Re-derived independently via `--print-config` (above, in L-24). `demo/@` does not exist (`ls -d demo/@` → No such file or directory); the only surviving `@components/` string in the demo tree is inside a comment (`browser/status/index.ts:5`). `shared/ui/` has no barrel — the subject's `:202` is a raw `.vue` cross-area reach. |
| L-14 | MINOR | `AdminUsersPanel.vue:186` is the only file importing `Transition` from `vue`; three siblings import `TransitionGroup` (also a built-in) the same way. Inert, and invisible to lint. |

r3's L-2, L-4, L-8, L-10, L-11, L-13, L-16, L-17, L-18 I read and do not dispute; I did not
re-instrument them and record no independent evidence for them here.

---

## 3 · The greenfield lattice

What I would build today with no legacy. This differs from r3 in two places, both marked ★:

```
eslint.config.js            globs re-aimed at the LIVE tree; + "a .ts never imports a .vue";
                            + madge --circular in `npm run lint`                    (L-15, L-24)
      │
      ▼
demo/shell/viewSchema.ts    auth: "admin" on the five admin views — gated ONCE       (L-12)
      ▼
demo/palettes/admin/        ★ THE CONSOLE'S WHOLE HOME — moved out of browser/       (L-21)
      ├── index.ts          the console's seam
      ├── AdminGate.vue     renders the unauthenticated plate, or its slot
      ├── AdminPane.vue     sub-view switch + header ONLY; renders all five panels
      │                     BARE — no props, no emits, no adapter role         ★     (L-22)
      ├── AdminUsersPanel.vue   injects ONE narrow port; no defineExpose, no timer,
      │                         no confirm machine, no row transcription
      ├── AdminNamesPanel.vue · AdminAuditPanel.vue · AdminFlaggedPanel.vue · AdminTagsPanel.vue
      ├── AdminListItem.vue     the ONE row atom (interactive variant included)      (L-7)
      ├── AdminListSkeleton.vue AdminListItem + <Skeleton> slots — same shape by construction (L-17)
      └── PaginationBar.vue     rendered by every list, including the roster         (L-20)

demo/shared/ui/index.ts     the missing seam; EmptyState + ActionFeedback + the
                            UNAUTH plate — 12 consumers stop reaching a raw .vue     (L-15, L-8)
demo/palettes/model/wire.ts ONE declaration of Palette · User · Tag · Flag           (L-16)
demo/palettes/keys.ts       LEAF: InjectionKeys + port types, type-only imports      (L-2)
demo/palettes/admin/ports.ts  ★ AdminUsersPort — 6 members, not 34                   (L-3, L-22)
demo/palettes/useAdminRoster.ts   returns a Roster value object:
                            unauthenticated | loading | error | {rows,total,offset,limit}  (L-19, L-20, L-12)
demo/palettes/useAdminUserPalettes.ts  owns expandedUserSlug + userPalettes          (L-1)
demo/palettes/api/admin-users.ts  transport (already correct — token is a parameter)
```

Eight rules hold it. Every one is an **absence**, which is why it holds:

1. **A `.ts` never imports a `.vue`, barrel or not.** Kills L-1 and all four cycles of L-24 by
   construction, and makes the barrel-amplification effect impossible.
2. **`defineExpose` is for parent templates only** — never for composables, never for state.
3. **Injection keys live in a leaf `keys.ts`**, never in the module that wires them (L-2). The
   precedent is in the tree and this very file consumes it correctly at `:187`.
4. **One specifier per external package.** `@mkbabb/glass-ui/<subpath>` everywhere; `demo/ui/`
   deleted (19 files leave the lattice). Kills L-5 and makes L-4-class prop drift visible.
5. **Preconditions are gated once at the boundary.** Kills L-12 and its duplicated `if (!token)
   return` guards (11 in `useAdminUsers.ts` alone by r3's count).
6. **A composable never returns a bare array where the transport returned a page.** Kills L-19 and
   L-20 — a destructive action cannot compute its blast radius from client state because the client
   state is typed as a page.
7. ★ **A feature contains its own root.** No pane lives outside the tree it renders. Kills L-21.
8. ★ **One wiring convention per cluster** — and the convention is *inject a narrow port*, because
   three of the five panels already do it correctly. Kills L-22, and the 6 props / 7 emits of
   ceremony with it.

**What leaves the subject.** The `defineExpose` and its four methods (`:367-389`); the confirm
controller (7 refs, `showConfirm`, `onConfirm` — `:254-286`); the sub-list state and
`toggleUserExpand` (`:236-238`, `:352-365`); the prune lifecycle and its uncleaned `setTimeout`
(`:239`, `:288-309`); `slugHead`/`slugTail`/`SLUG_TAIL` (`:243-252` → a `Chip` prop); the
transcribed row (`:68-132` → `<AdminListItem interactive>`); the 6 props and 7 emits; the
`Transition` import. **≈150 lines leave outright** and the file stops wearing three hats — today it
is a view, a confirm-dialog controller, and a sub-store; only the first is its job.

---

## 4 · Negative proof — checked this pass, found sound

- **The published surface is dogfooded honestly** (§0). Five of seven subpaths in use, zero `@src/`,
  zero relative `../src/`, zero root-barrel reaches, alias set generated from `package.json#exports`.
  The subject imports value.js not at all. **Fourth consecutive independent confirmation — settled.**
- **`import type` discipline (edict 8) is clean in the subject.** `:199` is the only type-only
  import and it is correct; `SAFE_ACCENT_KEY` and `ADMIN_PORT_KEY` are runtime `Symbol`s and are
  correctly value-imported.
- **Vue 3.5 reactive props destructure is used correctly** (`:205-220`), including a destructure
  default (`loadError = null`) — the idiom edict 7 asks for.
- **No runtime cycle exists.** The offending edge is `import type` and `verbatimModuleSyntax` erases
  it; the four madge cycles are type-graph and ownership cycles. I state this explicitly so the cure
  is not mis-scoped as a boot-order bug.
- **The barrels that exist are correctly shaped.** `browser/index.ts`, `browser/admin/index.ts`,
  `browser/card/index.ts` are named re-exports per PI-6 with the SFC-scoped-style tree-shake
  rationale stated in-file. The seam *form* is right; its **enforcement** (L-15), **coverage**
  (`shared/ui`, L-15) and **membership** (L-21) fail.
- **The api layer is correctly shaped.** `demo/palettes/api/admin-users.ts` takes the token as a
  parameter, delegates to one `adminRequest`, and *publishes* the pagination and search contract the
  layer above discards. The rot in L-19/L-20 is entirely in the composable, not the transport — do
  not send a fix into `api/`.
- **`Badge variant="secondary"` (`:102`) is valid** — glass-ui's `Badge` does declare `variant`
  (`demo/ui/badge/index.ts` re-exports `badgeVariants`/`BadgeVariants`). r3's L-4 is scoped to
  `Button`; a mechanical `variant` sweep that touched `Badge` would be a regression.
- **`vj-celebrate` is tokenized, not inlined** (`:16-20` → `demo/styles/animations.css:142-165`).
  Global keyframes are in `demo/styles/`; nothing was deleted or localised. Edict 6 satisfied.
- **No a11y finding is filed.** All four Safari matrices report `pageErr 0 · consoleErr 0 ·
  overflowX 0 · main 1` on `/#/admin/users` and the same 4 small tap targets, all in the dock. The
  two-engine keyboard delta (MT-F022) is confirmed out of scope for this axis and is not counted.
- **The `role="button"` disclosure row (`:78-90`) is not a library-structure defect.** The
  `target === currentTarget` guard at `:345` is load-bearing and correct; it is documented in-file.
  The row's *chassis* is a finding (L-7); its *semantics* are not.

---

## 5 · Summary

| id | sev | pass | defect |
|----|-----|------|--------|
| **L-19** | **BLOCKER** | **NEW r4** | **the prune confirmation names a count computed from a ≤50-row page while the endpoint deletes every empty user in the corpus (`api/.../users.ts:232` `findEmptyUserSlugs()`); irreversible, unrecoverable, off by an unbounded factor** |
| L-1 | **BLOCKER** | r2/r3 · re-derived | the state layer imports the SFC (`useAdminUsers.ts:14`) and drives it through `defineExpose` at 5 call sites; view owns data the composable must reach in to repair |
| **L-20** | **MAJOR** | **NEW r4** | `PaginatedResponse.total`, `offset` and `q` all discarded at `useAdminUsers.ts:59-60`; user 51 is unreachable, server search unused, `totalUsers` is a misnamed page length; `PaginationBar` sits unused in the same folder |
| **L-24** | **MAJOR** | **NEW r4** | **4** measured circular dependencies from **1** source edge (barrel amplification); no `import/no-cycle`, no madge, dead boundary rules — invisible to lint, typecheck and tests |
| **L-21** | **MAJOR** | **NEW r4** | the admin console lives inside the community-browse feature and its own pane lives outside it; `browser/index.ts:28-34` publishes 5 admin panels through the browse seam |
| **L-22** | **MAJOR** | **NEW r4** | 3 panels inject-only, 1 props-only, the subject all three at once; **r3's proposed lattice adopts the minority convention** |
| L-15 | MAJOR | r3 · re-derived | the three demo boundary rules match zero files; `no-restricted-imports: undefined` for the subject and for `useAdminUsers.ts`; a barrel comment asserts they are "enforced standing" |
| L-12 | MAJOR | r2/r3 · re-derived blind | unauthenticated costumes as `· roster clear ·`; `AdminPort` has no `isAdminAuthenticated` — the console's port cannot see its own auth |
| L-3 | MAJOR | r3 · re-derived | 34-member `adminPort` (3 members are nested composable returns) injected to call **1** method |
| L-5 | MAJOR | r3 · re-derived | `demo/ui/` = 19 pure alias barrels; 90 imports through them vs 37+ direct; both routes used in this one file |
| L-6 | MAJOR | r3 · re-derived | `ConfirmDialog` left glass-ui at `f2c8f565` and was re-grown twice (+19 lines here) |
| L-7 | MAJOR | r3 · re-derived | the row chassis exists **5×**; only the unused owner carries the `min-w-0` mobile fix |
| L-2 · L-4 · L-8 · L-10 · L-11 · L-16 · L-17 · L-18 | MAJOR/MINOR | r2/r3 | read, not disputed, not re-instrumented this pass |
| **L-23** | MINOR | **NEW r4** | 3 dead exports in `useAdminUsers` + the `impersonateUser` transport they alone reach — the class the api header records purging one wave earlier |
| L-9 | MINOR | r3 · re-derived | `.slug-pill` mandates per-instance `:style` in its own comment; glass-ui `Chip` has `mode:"static"` + `shape:"pill"` + `tone` |
| L-14 | MINOR | r3 · re-derived | `Transition` imported from `vue`; inert, invisible to disabled lint rules |
| L-13 | INFO | r3 | `export.ts` vs `export/` ambiguous specifier; off this component's closure |

**Strongest defect: L-19.** Every other finding in four passes is a boundary crossed, a concept with
two homes, or a rule that stopped firing. L-19 is the one place where the structural defect reaches
the user as an unrecoverable loss: a discarded pagination contract, three modules below the button,
turns a confirmation dialog into a false statement about an irreversible global delete. It is a
BLOCKER on any axis, and it is *this* axis's defect — the panel is not wrong to render `emptyCount`,
it is wrong to possess it, and it possesses it because `useAdminUsers.ts:60` throws away the only
value that would have told it so.

**Strongest structural defect: L-1, and L-24 is why it survived.** The direction of dependency is
inverted, and the repository has no instrument that can see a cycle: no `import/no-cycle`, no madge,
and boundary rules aimed at a directory deleted at W43. Fixing L-1 without L-24 fixes one instance of
a class the repo cannot keep fixed.

**The one-sentence indictment.** Nothing in this slice owns a whole concept — the roster's *size* is
split between a server total and a page length (L-19/L-20), its *state machine* between a composable
and a prop contract (L-12), the expanded-user list between a composable and a component (L-1), the
confirm between a deleted glass-ui primitive and two demo re-growths (L-6), the row between an atom
and four transcriptions (L-7), the design system between a package and a 19-file alias layer (L-5),
the console between two directories one of which belongs to another feature (L-21), and the wiring
convention between three panels that inject and two that do not (L-22) — while the rules that would
have caught any of it point at a directory that was deleted, and the one instrument that would have
measured the cycles is not installed (L-15/L-24).

---

## 6 · Relay items (standing glass-ui BH/BI relay edict)

Carried from r3 and unchanged — items 1–4 below are r3's and remain open. r4 adds no new glass-ui
relay: **all six new findings are value.js-side.**

1. `Button` 6→7 `variant` → `emphasis`+`tone` shipped without a consumer trap (51 silent
   regressions across 22 files here). Request `variant?: never` or `inheritAttrs:false` + an
   allowlist so an unrecognised token prop is a *visible* no-op.
2. Glass 7 removed `ConfirmDialog` with no replacement composition — two value.js consumers rebuilt
   it independently. Request a `Dialog`-family confirm composition or `useConfirm()` from
   `@mkbabb/glass-ui/dialog` (`/dialog` already ships `dialogStageContext`, the natural home).
3. `Chip` needs a tone axis to absorb `.slug-pill` (`types.d.ts` already declares `tone?: string`;
   what is missing is the *documented* recipe that makes the demo's `:style` override unnecessary).
4. `EmptyState` and a list-row `Skeleton` variant are design-system atoms living in an application
   tree — 12 and 4 consumers respectively; glass-ui's export map contains neither.

---

## 7 · Evidence index

| kind | command / artifact | result |
|---|---|---|
| cycle measurement (L-24) | `npx madge --extensions ts,vue --ts-config tsconfig.json --circular demo/palettes` | **4 circular dependencies**, all rooted at `useAdminUsers.ts:14` |
| gate absence (L-24) | `node -e "…'madge' in {...deps,...devDeps}"` → `false`; `grep -n "no-cycle\|import/" eslint.config.js` → no output | no cycle gate exists |
| dead boundary law (L-15) | `npx eslint --print-config <file>` on the subject and `useAdminUsers.ts` | `no-restricted-imports: undefined`; alive only for `demo/color-picker/**` (16 of 250 files), where its ban pattern uses the dead `@components` alias |
| published surface (§0) | `grep -rEoh "from \"(@mkbabb/value\.js…|\.\./+src/…)\"" demo` | 49 hits, all bare published subpaths; 0 deep reaches |
| pagination discard (L-19/L-20) | `demo/palettes/api/admin-users.ts:21-32` · `demo/palettes/types.ts:125-130` · `demo/palettes/useAdminUsers.ts:59-60` · `AdminPane.vue:33` · `AdminUsersPanel.vue:241,289-291` | `total`/`offset`/`q` published and unused |
| global prune (L-19) | `api/src/modules/admin/service/users.ts:228-247` | `findEmptyUserSlugs()` — whole collection, no limit |
| dead exports (L-23) | `grep -rn <name> demo … \| grep -v useAdminUsers.ts \| wc -l` | `onImpersonate` 0 · `featurePaletteBySlug` 0 · `deletePaletteAdminBySlug` 0 |
| wiring split (L-22) | `grep -c defineProps` / `grep -n "inject("` / `grep -n defineExpose` over the 5 panels | 3 inject-only · 1 props-only · 1 all-three |
| row transcription (L-7) | `grep -n "flex items-center gap-3 px-3 py-2.5\|rounded-md border border-card-edge" demo/palettes/browser/admin/*.vue` | 5 sites; `min-w-0` present only at `AdminListItem.vue:11` |
| ConfirmDialog provenance (L-6) | `git show f2c8f565^:…/AdminUsersPanel.vue \| grep -n ConfirmDialog` | `:158`, `:186 from "@mkbabb/glass-ui/confirm-dialog"`; 372 → 391 lines |
| live probe (L-12), read-only | Playwright `http://localhost:9000/#/admin/users`, one `evaluate` | `{adminToken: null}`, body reads `0 users … · ROSTER CLEAR · No users found.` |
| visual matrix | `visual/REPORT.md:128,143,158,173` + all four `shots/*/admin-users.png` read this pass | `pageErr 0 · consoleErr 0 · overflowX 0 · main 1`; every capture is the **empty, unauthenticated** roster — the populated row was never measured |
