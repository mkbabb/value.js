# Lane t-coloc-backend — Colocation Census 3 (E-1, backend befitting)

**Tranche T · DEVELOPMENT (design direction only, ZERO product-code changes).**
Substrate: `tranche-t` = master @ `cc4f4fa` (the S close).
Scope: `api/src/**` mapped against **E-1 THE COLOCATION GRAND EDICT** (§2), abstracted for
Hono/TypeScript server idioms, plus `scripts/` and `e2e/` structure. All cures must hold the
tranche-L boundary laws (typed `ApiError`; routes→services, never `repositories.*` directly;
≤ 350 LoC per file).

---

## §0 The edict, abstracted for the server

E-1 (mandate §2, verbatim tail): *"Similar treatment and enforcement should be applied to all
backend files, too — though abstracted and made befitting for those languages and
implementations."* Frontend E-1 = colocate a component with its sub-components / composables /
skeletons / constants / styles; a **truly** module/global thing lives in a `composables/` dir at
its level; long-running dirs break into common modules; no grab-bag utils.

The **befitting server transposition** of that thesis is **package-by-feature (bounded-context
modules) over a shared platform layer** — the modular-monolith idiom. Its litmus is identical to
the frontend's: *to change one feature you touch ONE place.* The current `api/src` fails that
litmus because it is sliced **layer-first** (horizontal), so a single feature is smeared across
5+ top-level directories.

The load-bearing reconciliation is that the tranche-L pipeline (`validate → authn → authz →
service → repository → format`) is a law about **dependency DIRECTION**, not about top-level folder
grouping. Package-by-feature keeps the direction intact *inside* each module (route → service →
repository) while colocating the domain. So the whole census is a **MOVE + REGROUP, not a
rewrite** — that is what makes the transposition idiomatic (E-3) and low-risk.

---

## §1 Current state (ground truth)

`api/src` is organized **by technical layer**. To work one feature you cross the tree:

| Feature (bounded context) | routes | services | repositories (collections) | schema | model | other |
|---|---|---|---|---|---|---|
| **palette** (palettes, palette_versions, votes, flags) | `routes/palettes/{crud,versions,forks,votes,flags,diff,publish,index}.ts` | `services/palette/{crud,crud-list,forks,votes,flags,versions,oklab,ownership,visibility,diff}.ts` | `repositories/{palette,paletteVersion,vote,flag}.ts` | `validation/palette.ts` | 4 shapes in `models.ts` | `format/palette.ts`, `hash.ts`, `lib/crud/atomdiff.ts`, `middleware/{etag,require-ownership}.ts` |
| **color-names** (proposed_names, tags) | `routes/colors.ts` | `services/color/{queries,proposals}.ts` | `repositories/{proposedName,tag}.ts` | `validation/color.ts` | 2 shapes in `models.ts` | `regex.ts` (shared) |
| **session/auth** (sessions, users) | `routes/sessions.ts` | `services/session/auth.ts` | `repositories/{session,user}.ts` | `validation/session.ts` | 2 shapes + brands in `models.ts` | `slugWords.ts`, `middleware/resolve-session.ts` |
| **admin** (admin_audit + cross-domain moderation) | `routes/admin/{colors,palettes,users,impersonate,tags,flagged,audit,batch,index}.ts` | `services/admin/{colors,palettes,users,impersonate,import,tags,flagged,audit,batch}.ts` | `repositories/adminAudit.ts` | `validation/admin.ts` | 1 shape in `models.ts` | `events/auditLog.ts`, `middleware/admin-auth.ts` |
| **meta** (health/docs/openapi) | `routes/{meta,meta-routes}.ts` | — | — | — | — | — |

Genuinely cross-cutting infra: `index.ts` (composition root, 211 LoC), `db.ts` + `db/collections.ts`,
`middleware/{cors,rate-limit,sanitize-body,ip,idempotency,inject-services}.ts`, `errors/index.ts`,
`cache/lru.ts`, `migrations/{check,migrate-soft-delete}.ts`, `models.ts`, `types.ts`, `cron.ts`.

Domain boundaries between the **service** dirs are already clean: the only cross-service-domain
edge is a **type-only** import (`services/admin/flagged.ts:13` pulls `FlaggedPalette` from
`repositories/flag.ts`). That cleanliness is exactly what makes the vertical regroup safe.

---

## §2 Findings

Owner tags: **src** = api code owned in this repo; **joint** = spans a policy doc (CLAUDE.md /
tranche-L reference) as well as code.

### F1 — Layer-first organization is the direct structural anti-thesis of E-1 *(src; primary)*
**Evidence**: the §1 table — every non-trivial feature spans `routes/ + services/ + repositories/ +
validation/ + models.ts` and often `format/ + middleware/ + hash/lib`. Palette = 8 route files, 10
service files, 4 repo files, 1 schema, 4 model shapes, 5 satellites across 5 top-level dirs.
**Root cause**: the pre-E-1 layered-monolith convention (D.W2/E.W2/L-era splits partitioned *within*
each layer — `routes/palettes.ts` → `routes/palettes/*`, never *across* into a feature module).
**Cure direction (gestalt)**: transpose to **domain modules + a `platform/` layer**. Proposed shape:

```
api/src/
├── main.ts                # composition root: env-validate, serve(), cron, SIGTERM (from index.ts §124-211)
├── app.ts                 # Hono assembly: middleware stack + route mounting (from index.ts §24-122)
├── platform/              # the server analogue of the frontend "global composables/" dir
│   ├── db/                # db.ts (client singleton, closeDb) + collections.ts  (dissolve the 1-file db/ dir up)
│   ├── http/              # the GLOBAL middleware stack: cors, rate-limit, sanitize-body, ip, idempotency, inject-services
│   │   └── errors/        # ApiError hierarchy + toResponseEnvelope (errors/index.ts, unchanged — the typed-error law's home)
│   ├── cache/             # lru.ts
│   ├── text/              # regex.ts (escapeRegex) — the one genuinely-shared string util
│   ├── identity/          # the SessionToken/UserSlug brands (see F4) — or re-exported from session/
│   └── migrations/        # check.ts + migrate-soft-delete.ts
├── modules/
│   ├── palette/           # routes/ (7 concern routers + barrel) · service/ (10) · repository/ (palette,paletteVersion,vote,flag) · schema.ts · model.ts · format.ts · hash.ts · atomdiff.ts · etag.ts · require-ownership.ts · __tests__/
│   ├── color/             # routes.ts · service/ (queries,proposals) · repository/ (proposedName,tag) · schema.ts · model.ts · __tests__/
│   ├── session/           # routes.ts · service/auth.ts · repository/ (session,user) · schema.ts · model.ts (+brands) · slugWords.ts · resolve-session.ts · __tests__/
│   ├── admin/             # routes/ (9 + barrel) · service/ (9) · repository/adminAudit.ts · schema.ts · model.ts · audit.ts (emitAuditEvent) · admin-auth.ts · __tests__/
│   └── meta/              # routes.ts (health/docs/openapi, from meta.ts + meta-routes.ts) · __tests__/
├── models.ts → carved (F4) ; types.ts (AppEnv) stays as the shared context vocabulary
```

The long-running sub-dirs (`palette/service/` = 10 files, `admin/routes/` = 9) stay split into
**common modules within the module** — E-1's "long-running dirs broken into common modules and
encapsulated" applied recursively. No file is merged; the ≤ 350 LoC law is untouched because this
is a MOVE, not a consolidation.

### F2 — `api/test/` is a mirror shadow tree, not colocated *(src; primary)*
**Evidence**: `api/test/{repositories,services,routes,conformance}/*.test.ts` — 37 test files whose
directory layout *duplicates* the src layer tree (`test/repositories/palette.test.ts` shadows
`repositories/palette.ts`, `test/services/palette-crud.test.ts` shadows
`services/palette/crud.ts`, etc.). This is the single largest backend colocation defect: it is the
literal negation of "colocate the test with the code."
**Root cause**: the layer-first src forces a layer-first mirror; a mirror tree is the only way to
keep tests navigable *given* the horizontal src.
**Cure direction**: fold each test **into its module** as `modules/<domain>/__tests__/*.test.ts` (or
`*.test.ts` beside source). The mongodb-memory-server harness + `vitest.config.ts`/`tsconfig.test.json`
already reach `src/` freely, so colocation is a glob change, not a harness change. If a residual
top-level `test/conformance/` (cross-module contract suites — `crud`/`diff`/`idempotency`) is kept
deliberately, it must be a **NAMED exception with rationale** (contract-level, not unit-level), never
accretion — mirroring the frontend precept that only *truly* global things escape colocation.

### F3 — The DI `Services` seam is the reconciliation key, and it holds the L boundary *(src; design constraint — NOT a defect)*
**Evidence**: `middleware/inject-services.ts:30-40` aggregates all 9 repositories into
`Services.repositories`; `services/admin/*` reach across domains through it —
`services/admin/palettes.ts` (PaletteTier), `admin/users.ts` (User + Palette + escapeRegex),
`admin/tags.ts` (Tag), `admin/colors.ts` (ProposedName). Repositories are therefore a **shared data
layer**, not private-per-feature.
**Root cause / why it matters**: a naïve package-by-feature that makes `repository/` private to its
module would break admin's legitimate cross-domain reach — and would *tempt* a boundary violation
(admin importing the palette module's service internals).
**Cure direction**: keep the seam AS the platform composition root. `platform/http/inject-services.ts`
imports **one repository class from each module** (`modules/palette/repository`, `modules/session/repository`,
…) and assembles `Services.repositories`; admin services consume other domains' data **only through
`c.var.services.repositories.*`**, never by importing another module's internals. This is an acyclic
aggregation (platform depends on modules' repository *exports*; modules depend on platform's *types* —
`AppEnv`, `Services`, `WithTransaction`). Result: routes→services→repository-via-DI is preserved
**verbatim**; the L boundary is not weakened, it is made *legible* by the module walls.

### F4 — `models.ts` is a 265-LoC monolith carrying 9 collection shapes + the identity brands *(src)*
**Evidence**: `models.ts` (265 LoC) holds all 9 document interfaces + `SessionToken`/`UserSlug`
brands + `asSessionToken`/`asUserSlug`; **34** files import it. The brands are consumed across three
domains — `middleware/resolve-session.ts`, `repositories/{palette,session,user}.ts`,
`services/{admin/batch,admin/impersonate,admin/users,palette/crud,palette/crud-list,session/auth}.ts`.
**Root cause**: a single models file was the natural home when the tree was layer-first (every layer
imports "the models"); L.W2 already reasoned about brand *home* (`models.ts` over `types.ts`, the
`brandHome` note) but within the monolith.
**Cure direction**: carve per-domain — `modules/palette/model.ts` (Palette/PaletteVersion/Vote/Flag),
`modules/color/model.ts` (ProposedName/Tag), `modules/session/model.ts` (Session/User **+ the
brands**), `modules/admin/model.ts` (AdminAudit). The brands describe session/user ids → their
honest home is the session module; palette/admin import the **type only** (`import type` +
`verbatimModuleSyntax` erase the edge at runtime), keeping the graph acyclic. This is the exact
tranche-L `brandHome` reasoning, now expressed as module colocation instead of file-internal comment.

### F5 — Single-file dirs masquerade as cross-cutting infra; two are actually domain-private *(src)*
**Evidence**: `cache/lru.ts`, `db/collections.ts`, `errors/index.ts`, `events/auditLog.ts`,
`format/palette.ts`, `lib/crud/atomdiff.ts` are each the **sole** file in their directory
(`lib/crud/` is a 3-level nest for ONE file). Consumer analysis proves two of them are **not** global:
- `format/palette.ts` — every consumer is palette-domain (`routes/palettes/{forks,versions}`,
  `services/palette/{crud,crud-list,visibility}`). **Palette-private.**
- `events/auditLog.ts` — every consumer is admin (`repositories/adminAudit`, `services/admin/*` ×8).
  **Admin-private**, despite the "global-sounding" `events/` dir.
- `lib/crud/atomdiff.ts` — consumed only by `models.ts` + `services/palette/{versions,forks,diff}`.
  **Palette-versioning-private.**
**Root cause**: directory-per-file ceremony — the layered tree created a folder for each cross-cutting
*category* before it had more than one member, and mislabeled domain files as infra.
**Cure direction**: dissolve the ceremony dirs. Move domain-private files INTO their module
(`format.ts`, `atomdiff.ts` → `modules/palette/`; `audit.ts` → `modules/admin/`). Keep only
genuinely-global singletons in `platform/` (`cache/lru.ts`, `db/collections.ts` merged with `db.ts`,
`errors/`). `events/` and `format/` and `lib/` disappear entirely.

### F6 — `middleware/` is a mixed bag: global stack vs domain-private authz *(src)*
**Evidence**: `middleware/` (10 files, 726 LoC) mixes the **global request stack** (`cors`,
`rate-limit`, `sanitize-body`, `ip`, `idempotency`, `inject-services`) with **domain-private**
middleware: `etag.ts` + `require-ownership.ts` are palette-only (imported by `routes/palettes/crud`,
`services/palette/ownership`), `admin-auth.ts` is admin-only, `resolve-session.ts` is
session-authn.
**Root cause**: E.W2 Lane E split the 279-LoC god middleware into per-concern files — correctly by
*concern*, but flat, so global and domain middleware sit side by side.
**Cure direction**: the global stack → `platform/http/`; domain middleware → its module
(`etag.ts`/`require-ownership.ts` → `modules/palette/`; `admin-auth.ts` → `modules/admin/`;
`resolve-session.ts` → `modules/session/`). `app.ts` composes the global stack from `platform/http`
and each module contributes its own authz to its own routes — colocation, not a central authz grab-bag.

### F7 — `scripts/` is a grab-bag with a tranche-era `proof:*` accretion + a dead favicon script *(joint)*
**Evidence**: `scripts/` (19 files) mixes four unrelated purposes with no grouping — deploy
(`deploy.sh`, `deploy-hook.sh`), dev (`dev.sh`), CI probes (`boot-smoke.mjs`,
`css-emission-probe.mjs`, `abrogation-sweep.mjs`), and **11 `proof-*.mjs`** behavioral gates. The
proof scripts are **born-RED gates keyed to CLOSED tranches** — headers self-declare O.W0
(`proof-css-parity`), O.W2 (`subpath-*`), O.W5 (`round-trip-idempotent`), O.W6 (`perf-target`),
VJ-P.W0 (`progress-honesty`), Q (`color-arch-q`, `grammar-q`, `contrast-color`,
`serialize-fidelity`, `gamut-alloc`) — yet still wired as 13 `proof:*` scripts in the **root
package.json**. This **contradicts CLAUDE.md**, which states *"The grep-based `proof:*` invariant
scripts (G/H-era) were retired as overfit"* and MEMORY's proof-idiom-retired feedback. (These are
*behavioral* proofs over the built `dist/`, not the grep-based ones — so the retirement was
partial and the package.json wiring drifted.) `scripts/generate-favicon.mjs` has **0 references**
(not in package.json, deploy, or dev) — a manual-only or dead one-shot.
**Root cause**: `scripts/` is the canonical long-running grab-bag — every tranche dropped its
born-RED gate here and none were swept at close; the retirement note covered the grep idiom but not
the behavioral-gate accretion.
**Cure direction**: group by purpose — `scripts/deploy/`, `scripts/dev/`, `scripts/ci/` (the standing
probes `boot-smoke`, `css-emission-probe`, `abrogation-sweep`), `scripts/gates/` (the *still
load-bearing* regression guards — `perf-target`, `round-trip-idempotent`, `serialize-fidelity`,
`css-parity` — promoted to a named CI-invoked common module). **Retire** the closed-tranche one-offs
whose invariant now stands by the type system / build (`progress-honesty` is VJ-P.W0-specific;
`color-arch-q`, `grammar-q`, `subpath-*` guarded O/Q-era cuts) and **sweep** `generate-favicon.mjs` if
confirmed dead. Reconcile the package.json `proof:*` block with the CLAUDE.md retirement claim — one
of them is lying (E-3: NO legacy).

### F8 — `e2e/` is the GOOD colocation exemplar; only a mild residual *(src; low priority)*
**Evidence**: `e2e/smoke/{admin,flows,views,perf,mobile,safari}/` already groups by domain/surface,
with **colocated fixtures** (`admin/fixtures/`, `smoke/fixtures/`) and a **colocated common helper**
(`perf/frame-budget.ts`). This is precisely the befitting shape and should be cited as the
in-repo model for F1's module dirs. Residual nit: the flat top-level `e2e/smoke/*.spec.ts`
(`page-load`, `view-switch`, `webgl-*`, `atmosphere-cold-load`, `url-color-precedence`,
`color-space-switching`, `reactivity-instant`, `accent-contrast-guard`) sit **beside** the grouped
subdirs — a partial grouping.
**Cure direction**: complete the grouping (`smoke/boot/`, `smoke/webgl/`, `smoke/color/`) so the
top level is subdirs-only, matching `admin/`/`views/`/`flows/`. Playwright `testMatch`/`testDir`
globs in `playwright.config.ts` absorb the move. Low priority — e2e is already 80% befitting.

### F9 — Loose top-level domain utils at `api/src/` root *(src)*
**Evidence**: `hash.ts` (computeContentHash — consumers all palette-domain:
`format/palette`, `services/palette/{forks,versions,crud,diff}`, `lib/crud/atomdiff`), `slugWords.ts`
(generateUniqueSlug — sole consumer `services/session/auth.ts`), `regex.ts` (escapeRegex — consumers
`services/color/queries`, `services/admin/{users,audit}`). Three domain utilities parked at the tree
root because there was no module to own them.
**Cure direction**: `hash.ts` → `modules/palette/`; `slugWords.ts` → `modules/session/`; `regex.ts`
is the one genuinely-shared util → `platform/text/`. After F1/F4/F5/F9 the `api/src` root holds only
`main.ts`, `app.ts`, `types.ts` (the `AppEnv`/`Services` context vocabulary), `cron.ts`, and the
`platform/` + `modules/` dirs — a two-word answer to "where does X live."

---

## §3 Boundary-law reconciliation (must hold under the transposition)

| L law (api/CLAUDE.md §"L invariants") | Held? | How |
|---|---|---|
| Typed `ApiError`, no ad-hoc envelopes | ✅ | `errors/` moves intact to `platform/http/errors/`; `onError`/`toResponseEnvelope` unchanged. |
| routes → services, never `repositories.*` | ✅ | Preserved *inside* each module; admin reaches other domains only via the `Services` DI seam (F3), never module internals. |
| Only `repositories/` + factory touch `db` | ✅ | `platform/db` + module `repository/` dirs; the DI factory (F3) is the sole assembler. |
| No legacy palette fields | ✅ | Pure move; no schema touch. F7 flags a *policy* legacy (the stale `proof:*` wiring) for E-3 cleanup. |
| ≤ 350 LoC per file | ✅ | MOVE + REGROUP, not consolidation; long-running sub-dirs (`palette/service/`, `admin/routes/`) stay split (E-1 common-module rule). |
| `as any`=0 / `as unknown as`=1 | ✅ | The lone `index.ts` `server.close()` cast moves to `main.ts`, still policy-commented. |

The transposition is a **relocation of already-correct files**, which is why it does not risk the L
closure — it *strengthens* it by making each boundary a wall you can see.

---

## §4 Sequencing note (development-only; for the T charter)

Because §3 shows the transposition is move-only, the befitting-backend work is a **low-risk
mechanical wave** gated behind two design decisions the T corpus must ratify, in order:
1. **Naming** — `modules/` vs `features/`; `platform/` vs `core/` vs `foundation/`. (Recommend
   `modules/` + `platform/` — reads as "bounded contexts over shared infra.")
2. **Test policy** — colocated `__tests__/` per module, with an explicitly-named `test/conformance/`
   cross-module exception (F2), or full colocation. This choice sets the vitest glob + the
   api/CLAUDE.md "Structure" rewrite.

Both are pure design (E-3 gestalt), not implementation — this lane authors the direction; the T
close ceremony carries the api/CLAUDE.md + package.json (`proof:*`) reconciliation as the paired doc
edits.
