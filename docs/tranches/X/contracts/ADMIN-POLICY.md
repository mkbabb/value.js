SERVED MODEL: claude-opus-5[1m]

# ADMIN-POLICY — the admin operation target

**Authored by** X-W3 unit `X.W3.6` (class 9 · G-17), 2026-09-18, at HEAD `504819ea`.
**Implementation of record:** `api/src/modules/admin/policy.ts`.
**Callers:** `api/src/modules/admin/service/palettes.ts`.

**Why this file and not the contract JSON.** `docs/tranches/V/vnext/api-contract.source.json`
is **FROZEN-AS-INHERITED** (M-15; `W3.md` §Dispositions **D-7**) and is not written by this
wave or any seat of it. The re-measure recorded the consequence plainly: the live admin surface
carries **0** rows in that file, so the admin class *"has no operation-level target, only the
API-POLICY prose — that is a formation gap, not a source gap"*
(`api-gap-remeasure.md` §9). This file is that target, authored where it is lawful to author it.

---

## 1. The gap this closes

`API-POLICY §4` names the target for class 9: **an audited policy branch; never ownership
impersonation, never repository bypass.**

Three of its four limbs had already landed and are **not** rebuilt here:

| limb | where it landed | status |
|---|---|---|
| bearer authentication, `timingSafeEqual`, 503 / 401 / 403 | `admin/auth.ts:37-57` | closed |
| a resolvable actor identity (`ADMIN_ACTOR_SLUG = "system:admin"`, set on `c.var.adminActor`) | `admin/auth.ts:35,53-55` (U-F40) | closed |
| route-local repository access | routes call services (`admin/routes/palettes.ts:18-41`) | closed — `W3.md` **D-6** |

The fourth did not exist. `admin/service/palettes.ts` reached
`services.repositories.palettes` directly at `:34-35` and `:59,64`, composing **no**
palette-domain predicate. The audit row answered *who* acted and never *under which authority*:
an admin featuring a public palette and an admin deleting a private one emitted
indistinguishable rows, and that difference is the whole of moderation review.

## 2. The branch

One entry point — `authorizeAdminPaletteOp(services, slug)` — resolves the palette, refuses what
does not exist, and names the branch it took. It decides by **calling** the class-1 read
predicate (`palette/service/visibility.ts` `isReadable`, landed at X.A1), never by re-deriving
it: a second spelling of the read rule is precisely the drift G-1 exists to close.

| branch | condition | meaning |
|---|---|---|
| `public` | `isReadable(palette, undefined)` | the row is readable to any caller. The admin exercised no privilege the public did not already hold. |
| `admin-override` | otherwise — private, trashed, or moderation-withdrawn | the admin reached **past** the object-read policy on the strength of the bearer token alone. **This is the reviewable event.** |

The viewer passed to the predicate is `undefined` on purpose. The question asked is *"could the
public read this?"*, and the answer is what the branch records. The admin is **never** handed the
owner's slug to obtain the second branch: that is the ownership impersonation the target forbids,
and it would make the audit row a lie about who acted.

**This is not a refusal surface.** An authenticated admin is authorized for both branches by
design. The cure is that the branch is decided **in one place** and **recorded** — not that some
admin operation begins to fail. The only refusal here is the one both call sites already
performed: a palette that does not exist is `404` (`NotFoundError`), now thrown by the policy
rather than by each service separately.

## 3. Where the branch is written

Both renderings come from the same decision, through `describeAdminPolicy` and
`adminPolicyPayload`, so they cannot drift.

| field | value | why |
|---|---|---|
| `AdminAuditEvent.target` | `… policy=ADMIN-POLICY:<branch>` appended to the existing readout | `target` is the **only** field the operator surface renders (`demo/palettes/browser/admin/AdminAuditPanel.vue:77`). A policy decision that lived only in the structured payload would be invisible exactly where moderation is reviewed — CC-039's failure mode (a relaxation disclosed only in source) in a new coat. |
| `AdminAuditEvent.payload` | `{ policy: "ADMIN-POLICY", branch }` | the model's own designated home for new emits (`admin/model.ts:20-21`), and the queryable form. |

Measured rows (⟨cmd⟩ the G-17 runtime probe, transcript at
`docs/tranches/X/waves/artefacts/W3/W3-6-g17-admin-policy-probe.txt`):

```
[public/feature]  target = slug=mod featured=true tier=featured policy=ADMIN-POLICY:public
[private/feature] target = slug=mod featured=true tier=featured policy=ADMIN-POLICY:admin-override
[private/delete]  target = slug=mod policy=ADMIN-POLICY:admin-override
```

## 4. The operations under this policy today

Two — the pair `admin/service/palettes.ts` owns:

| operation | route | policy call | audit action |
|---|---|---|---|
| set featured tier (idempotent) | `POST /admin/palettes/{slug}/feature` | `authorizeAdminPaletteOp` | `set-featured` |
| soft-delete a palette | `DELETE /admin/palettes/{slug}` | `authorizeAdminPaletteOp` | `delete-palette` |

Re-measured live at this authoring (⟨cmd⟩ `GET /openapi.json`, generated from the mounted route
registry; artefact `W3-6-openapi-admin-after.json`): **45 path rows · 51 operations · 21 admin
path rows · 23 admin operations** — byte-identical to the `W3.md` G-17 baseline, because this
cut adds no route. (The re-measure doc's "17 operations" remains superseded by that measurement.)

### 4.1 The honest bound — four admin services still reach the palette repository

`admin/service/palettes.ts` is the **only** service this wave's `§4 File Bounds` grant it the
right to rewire, and it is now fully mediated. It is **not** the only admin service that touches
the palette repository. Measured:

⟨cmd⟩ `grep -lE "(^|[^.[:alnum:]])palettes\." api/src/modules/admin/service/*.ts` → **5 files**

| service | reaches | under ADMIN-POLICY? |
|---|---|---|
| `palettes.ts` | `update`, `decrementForkCount` — after the policy decision | **YES** |
| `batch.ts` | `deleteManyBySlugs`, `updateManyBySlugs` (`:38,44,49`) | no |
| `users.ts` | `findByUserSlug`, `deleteManyByUserSlug` (`:90,172,177,209,220`) | no |
| `tags.ts` | `pullTagFromAll` (`:89`) | no |
| `import.ts` | `insert` (`:45`) | no |

The four are **set-valued** operations (a slug list, a user's whole roster, a tag pulled from
every row, a bulk import) — the per-object branch this policy names is not the right shape for
them, and inventing one here would be authoring a predicate no gate measures. **They are
recorded, not smuggled and not silently claimed**: G-17's own baseline names three read loci, all
three in `palettes.ts`, and this wave cures exactly those. A set-shaped admin policy is a
successor's row, and §7 states the condition that opens it.

The earlier draft of this section asserted the bound from
`grep -rn "repositories.palettes" api/src/modules/admin`. That probe is **unsound** — four of the
five services destructure (`const { palettes } = services.repositories`) and the grep misses them.
Corrected at the bytes before this file was committed; the sound probe is the one quoted above.

## 5. What this policy does NOT claim

- **It is not the AdminGate identity.** The demo-side navigation guard landed in the same unit
  (`demo/color-picker/router/guards.ts`, G-18), but the admin **pane's** unauthorized state — the
  21 `if (!token)` early-returns across five composables — is **X-W7's**. Per COHESION §0k.3
  **S-6** and `X-W3-FOLD.md` §CrossEdges §A, neither wave reports the AdminGate identity closed
  alone, and X-W7's gate may not go green over X-W3's edit.
- **It does not enumerate "admin".** The four disagreeing enumerations the fold measured (router
  meta on 5 · the dock's 7+7 literals · the schema's hue fan · `DockViewSelect.vue:116`) are
  **X-W8's** `G-C` derivation (fold §CrossEdges §E). This wave lands the guard and the branch, and
  derives nothing.
- **It does not cascade.** `admin/service/palettes.ts`'s docstring claimed *"delete palette +
  cascade votes/flags"* and the body cascaded neither — a soft delete, with
  `repository/flag.ts`'s `deleteByPaletteSlug(slug, session)` uncalled anywhere. Fold **S-10**
  binds the correction to whichever wave touches the file; this wave corrected the **sentence** to
  what the code does. The cascade itself remains unbuilt and unclaimed.
- **The two writes stay direct.** `palettes.update(...)` and `decrementForkCount(...)` are the
  operations themselves, reached only *after* an authorized, branch-recorded decision. G-17's
  baseline names the three **read** loci (`:34-35`, `:59`, `:64`); those are what now route
  through the policy.

## 6. Falsifier (L-19)

The gate fails for exactly one reason. Pin the branch to a constant —

```
const branch: AdminPolicyBranch = "public";
```

— and the two private-palette probes red, naming the substitution:

```
AssertionError: expected 'slug=mod featured=true tier=featured …' to contain 'policy=ADMIN-POLICY:admin-override'
AssertionError: expected 'slug=mod policy=ADMIN-POLICY:public'    to contain 'policy=ADMIN-POLICY:admin-override'
Tests  2 failed | 2 passed (4)
```

Restored, `4 passed`. The branch is therefore derived from the class-1 predicate at runtime, not
asserted by a literal.

## 7. Reopening condition

This policy widens on a **source fact**, never on a scheduled wave:

1. a **third** per-object admin palette mutation is authored in `admin/service/palettes.ts`, or
2. the count from ⟨cmd⟩ `grep -lE "(^|[^.[:alnum:]])palettes\." api/src/modules/admin/service/*.ts`
   rises above **5**, or one of the four §4.1 services gains a **per-object** (single-slug)
   palette mutation — at which point it belongs under this branch and the grant to rewire it is
   the thing a successor wave must carry.

Both are checkable from the tree at any moment. Neither is owed to a calendar.
