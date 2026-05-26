# H.W3 Lane A — `demo/@/lib/palette/api.ts` decomposition

**Wave**: H.W3 Lane A
**Substrate**: `tranche-h` @ `3b0d933` (H.W2 closed)
**Target**: `demo/@/lib/palette/api.ts` — H-AUDIT-5 §demo flagged this 484-LoC
file as the clearest decomposition candidate at H open.
**Precedent**: G.W1 Lane B `src/units/color/utils.ts → conversions/*.ts` —
cohesion-honest sub-domain modules + a pure aggregate barrel.

## Outcome

| Before | After |
|---|---|
| 1 god module @ 484 LoC | 9 sub-modules + 1 barrel; max sub-module 110 LoC |
| Mixed sessions / palettes / forks / colours / admin under sectional comments | One sub-domain per file; section comments retired into per-file docblocks |
| `request` / `adminRequest` private to the module | Lifted to `client.ts` as the shared infra primitive |

The old `api.ts` is **deleted**, not shimmed. The barrel `api/index.ts`
re-exports every public symbol so the 14 existing consumers — all of which
import from the directory path `@lib/palette/api` — resolve through
`api/index.ts` without any per-consumer edit.

## 9 sub-modules

The plan's 8-module estimate was based on H-AUDIT-5's surface scan; the
actual sectional grouping cohered honestly into **9** (the spec explicitly
permits deviating from the count target). The added module is `client.ts`,
which extracts the shared `request` / `adminRequest` / `setSessionToken` /
`BASE_URL` transport primitives — these are infrastructure consumed by
every other sub-module and cannot honestly live inside any single
domain-cohering file.

| Module | LoC | Sub-domain |
|---|---:|---|
| `client.ts`         |  67 | `request` / `adminRequest` / `setSessionToken` / `BASE_URL` (HTTP transport infra) |
| `sessions.ts`       |  32 | session lifecycle: `createSession` / `loginWithSlug` / `deleteSession` / `getMe` |
| `palettes.ts`       | 110 | user palette CRUD + vote + flag (10 fns + `ListPalettesOptions`) |
| `versions.ts`       |  71 | versions + forks + provenance (6 fns) |
| `colors.ts`         |  47 | public colour-name + tag listing (4 fns) |
| `admin-palettes.ts` |  64 | admin palette moderation + batch + flagged triage (5 fns) |
| `admin-users.ts`    | 108 | admin user CRUD + lifecycle + batch (9 fns) |
| `admin-colors.ts`   |  81 | admin colour-proposal queue + admin tag CRUD (8 fns) |
| `admin-audit.ts`    |  36 | admin audit log (1 fn + `AuditLogOptions`) |
| `index.ts` (barrel) |  90 | pure re-export aggregator (no logic) |
| **Total** | **706** | — |

**Largest sub-module**: `palettes.ts` @ 110 LoC — well under the 350-LoC
per-file cap (and far under the 400-LoC wave allowance).

### Cohesion notes

- **`palettes.ts`** folds the §FLAGGING `flagPalette` call into the
  user-palette CRUD module: flagging is a session-scoped user action
  against a palette, parallel to `votePalette` and `deletePaletteUser`.
  The matching admin moderation surface (`getFlaggedPalettes`,
  `dismissFlags`) lives separately in `admin-palettes.ts`.
- **`versions.ts`** unifies the original §VERSIONING + §FORKING /
  PROVENANCE sections — both are palette-history operations and share
  `Palette` / `PaletteVersion` / `ProvenanceNode` type imports. Splitting
  them would have produced two ≤ 50-LoC modules with overlapping types.
- **`admin-palettes.ts`** absorbs the palette-half of §ADMIN — BATCH
  ACTIONS (`batchPaletteAction`) + the flagged-triage admin pair. All
  three subsections are admin moderation over the palette corpus; keeping
  them together avoids cross-importing for shared concerns.
- **`admin-users.ts`** absorbs the user-half of §ADMIN — BATCH ACTIONS
  (`batchUserAction`) for the same reason.
- **`admin-colors.ts`** unifies §ADMIN — COLORS + §ADMIN — TAGS — both
  are admin curation of the colour-vocabulary corpus, mirroring how
  `colors.ts` unifies the public-read counterparts.
- **`admin-audit.ts`** is its own module: audit-log entries cross-cut
  every other admin surface (palettes, users, colours, tags, flags); it
  doesn't honestly belong inside any single one of them. The audit log
  is consumed exclusively by `useAdminAudit.ts` (exposed as `pm.audit`).

## Consumer impact

`grep -rln "lib/palette/api" demo/` identified **14** consumer files. All
14 import via the directory path `@lib/palette/api` (no deep imports like
`@lib/palette/api/<symbol>`). The barrel `api/index.ts` resolves through
TypeScript + Vite directory-import semantics, so **0 consumer edits** were
required:

| Consumer | Symbols imported | Update needed? |
|---|---|---|
| `demo/@/components/custom/color-picker/composables/useCustomColorNames.ts` | `getApprovedColorNames` | no — barrel |
| `demo/@/components/custom/color-picker/controls/ColorInput.vue` | `proposeColorName` | no — barrel |
| `demo/@/composables/auth/useAdminUsers.ts` | listUsers / getUserPalettes / setUserStatus / deleteUser / deleteUserPalettes / impersonateUser / pruneEmptyUsers / importPalettes / batchUserAction (multi) | no — barrel |
| `demo/@/composables/auth/useSession.ts` | `createSession`, `setSessionToken` | no — barrel |
| `demo/@/composables/auth/useUserAuth.ts` | `createSession`, `deleteSession`, `loginWithSlug`, `setSessionToken` | no — barrel |
| `demo/@/composables/palette/useAdminAudit.ts` | `getAuditLog`, type `AuditLogOptions` | no — barrel |
| `demo/@/composables/palette/useAdminFlagged.ts` | flagged-triage symbols | no — barrel |
| `demo/@/composables/palette/useAdminTags.ts` | `getAdminTags`, `createTag`, `deleteTag` | no — barrel |
| `demo/@/composables/palette/useBrowsePalettes.ts` | browse / vote / rename symbols | no — barrel |
| `demo/@/composables/palette/useColorNameQueue.ts` | admin-colour-queue symbols | no — barrel |
| `demo/@/composables/palette/usePaletteActions.ts` | `publishPalette` | no — barrel |
| `demo/@/composables/palette/useSlugMigration.ts` | `publishPalette` | no — barrel |
| `demo/@/composables/palette/useTagEdit.ts` | `getTags`, `updatePalette` | no — barrel |
| `demo/@/composables/palette/useVersionHistory.ts` | `listVersions`, `revertPalette`, `forkPalette` | no — barrel |

**Auto-resolved**: 14 / 14. **Explicit edits**: 0.

## Deletion confirmation

```
$ test -f demo/@/lib/palette/api.ts && echo "STILL EXISTS" || echo "DELETED OK"
DELETED OK
```

The old `api.ts` is gone — not renamed, not shimmed, not re-exported.

## Sub-gate evidence

| Gate | Result |
|---|---|
| `wc -l demo/@/lib/palette/api/*.ts` — each ≤ 350 LoC | PASS (max 110) |
| `demo/@/lib/palette/api.ts` does not exist | PASS |
| `npm run build` exits 0 | PASS (727 ms, 42 modules) |
| `npm run gh-pages` exits 0 | PASS (1.09 s) |
| `npx vue-tsc --noEmit` exits 0 | PASS |
| `npx vitest run` — 1584/34 pass | PASS (1584 tests across 34 files, unchanged) |
| Zero residual importers of the old `api.ts` path | PASS (all 14 consumers resolve through the barrel — confirmed via grep) |

## Judgment calls

1. **9 modules, not 8.** The shared HTTP infra (`request` / `adminRequest`)
   could not honestly live inside any single domain module without forcing
   the other 8 to import from a "lead" module. Promoting it to `client.ts`
   as its own infrastructure file is the cohesion-honest move (matches the
   `src/units/color/conversions/index.ts` precedent which also has support
   modules adjacent to the domain modules — e.g. `direct.ts` for perf paths).
2. **`flagPalette` lives in `palettes.ts`**, not in a standalone `flags.ts`
   module. The original §FLAGGING section contained exactly one user-side
   function. A 16-LoC `flags.ts` for one fn would be contrived; folding it
   in next to `votePalette` keeps the user-palette-action surface together.
   The admin flag-moderation surface remains separate in `admin-palettes.ts`.
3. **Versions + forks + provenance unified in `versions.ts`.** All three
   are palette-history concerns sharing the same type imports
   (`Palette`, `PaletteVersion`, `ProvenanceNode`). Splitting would produce
   three tiny modules with cross-cutting type imports — contrived.
4. **No public-surface change.** Every name exported by the old `api.ts`
   is re-exported by the barrel with identical signatures (verified by the
   vue-tsc + build + vitest triple). The decomposition is invisible to
   consumers; future single-endpoint imports MAY use the sub-module path
   (e.g. `@lib/palette/api/sessions`) for tighter dependency graphs, but
   no existing consumer was migrated — the spec says "if the existing
   imports work via the barrel, leave them".

## Refs

- Spec: H.W3 Lane A row (this wave plan).
- Precedent: `docs/tranches/G/audit/G.W1-lane-b-color-utils-decomposition.md`
  (G.W1 Lane B — `src/units/color/utils.ts → conversions/*.ts`).
- Pre-decomposition file: `demo/@/lib/palette/api.ts` (deleted in this lane;
  git blame trail preserved at the parent commit).
- Audit-source: `docs/tranches/H/audit/H-AUDIT-5-architecture.md` §demo.
