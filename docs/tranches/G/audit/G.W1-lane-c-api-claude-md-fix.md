# G.W1 Lane C — DOCS-1: `api/CLAUDE.md` services/ block drift fix

**Task**: DOCS-1 (`audit/G-AUDIT-6 §6` → G-OPP-DOCS-1). Deferred F.W4 Lane 3 carry-forward.
**Branch / HEAD at dispatch**: `tranche-g` @ `704195e`.
**Mode**: documentation correction only — no source changes, no git operations.
**Files modified**:
- `api/CLAUDE.md` — `services/` structure block + Pipeline-shape `service` bullet.
- `docs/tranches/G/audit/G.W1-lane-c-api-claude-md-fix.md` — this audit doc (NEW).

---

## §1 — The defect

`api/CLAUDE.md`'s `services/` structure block enumerated only **2 of 4** subdirs.
`api/src/services/` actually contains **4** subdirs. `color/` and `session/` were
added at the E.W2 Lane A service-split lane but never folded into `api/CLAUDE.md`;
the omission carried through F (deferred F.W4 Lane 3 item).

---

## §2 — Before-state

`api/CLAUDE.md` structure block (lines 29–32 pre-fix):

```
│   ├── services/             # business logic, depends on repositories via Services DI
│   │   ├── palette/          # crud + crud-list + forks + votes + flags + versions + oklab
│   │   └── admin/            # colors + palettes + users + impersonate + import + tags +
│   │                         #  flagged + audit + batch
```

`api/CLAUDE.md` Pipeline-shape `service` bullet (pre-fix):

```
- **service** — `services/{palette,admin}/*.ts`; receives `Services` from `c.var.services`.
```

Both miss `color/` and `session/`.

---

## §3 — Actual tree (`ls -R api/src/services/`)

```
admin
color
palette
session

api/src/services//admin:
audit.ts   batch.ts   colors.ts   flagged.ts   impersonate.ts
import.ts  palettes.ts   tags.ts   users.ts

api/src/services//color:
proposals.ts   queries.ts

api/src/services//palette:
crud-list.ts   crud.ts   flags.ts   forks.ts   oklab.ts
versions.ts   votes.ts

api/src/services//session:
auth.ts
```

4 subdirs: `admin/` (9 files), `color/` (2 files), `palette/` (7 files),
`session/` (1 file).

### §3.1 — `color/` subdir contents (inspected, not invented)

- `color/queries.ts` — read-side of the public color-name surface. File header:
  *"Owns the read-side of the public color-name surface: GET /colors/approved →
  paginated list of status="approved" names; GET /colors/search → text + regex
  search (status="approved" only); GET /colors/tags → all tags, sorted by name."*
- `color/proposals.ts` — write-side of the public color-name surface. File header:
  *"Owns the write-side of the public color-name surface: POST /colors/propose →
  submit a new color name (status="proposed")."*

### §3.2 — `session/` subdir contents (inspected, not invented)

- `session/auth.ts` — session auth service. File header:
  *"Owns: register (POST /sessions) → creates user + session; login
  (POST /sessions/login) → creates session for existing user; revoke
  (DELETE /sessions) → deletes current session; me (GET /sessions/me) →
  current user info."*

---

## §4 — Route-consumer cross-reference evidence

Verified by reading the actual route files in `api/src/routes/`:

| Service subdir | Consumed by | Import evidence |
|---|---|---|
| `services/palette/` | `routes/palettes/` | (per-pipeline barrel, already documented) |
| `services/admin/` | `routes/admin/` | (per-pipeline barrel, already documented) |
| `services/color/` | `routes/colors.ts` | `import { … } from "../services/color/queries.js";` (line 27) + `import { proposeColor } from "../services/color/proposals.js";` (line 28) |
| `services/session/` | `routes/sessions.ts` | `import { … } from "../services/session/auth.js";` (line 21–26) |

The route filenames are `colors.ts` and `sessions.ts` — confirmed present in
`api/src/routes/` (alongside the `palettes/` and `admin/` subdir barrels). The
prompt's expected mapping (`routes/colors.ts` ↔ `services/color/`,
`routes/sessions.ts` ↔ `services/session/`) holds verbatim.

---

## §5 — After-state

`api/CLAUDE.md` structure block (post-fix):

```
│   ├── services/             # business logic, depends on repositories via Services DI
│   │   ├── palette/          # crud + crud-list + forks + votes + flags + versions + oklab
│   │   │                     #  (consumed by routes/palettes/)
│   │   ├── admin/            # colors + palettes + users + impersonate + import + tags +
│   │   │                     #  flagged + audit + batch (consumed by routes/admin/)
│   │   ├── color/            # color-name surface: queries (approved + search + tags) +
│   │   │                     #  proposals (propose) (consumed by routes/colors.ts)
│   │   └── session/          # auth — register + login + revoke + me
│   │                         #  (consumed by routes/sessions.ts)
```

`api/CLAUDE.md` Pipeline-shape `service` bullet (post-fix):

```
- **service** — `services/{palette,admin,color,session}/*.ts`; receives `Services` from `c.var.services`.
```

The `color/` and `session/` entries follow the existing `palette/` + `admin/`
style: a `# ...` description listing the constituent files/concerns. Route-consumer
cross-references were added to all four entries for parity (the original `palette/`
and `admin/` entries lacked the consumer annotation; adding it uniformly keeps the
block self-consistent rather than annotating only the new pair).

---

## §6 — Sub-gate C result

| Criterion | Result |
|---|---|
| services block enumerates all 4 subdirs accurately (verified vs `ls api/src/services/`) | PASS — `palette/`, `admin/`, `color/`, `session/` all present |
| each subdir entry accurate to actual files (no invented descriptions) | PASS — `color/` + `session/` descriptions drawn from the files' own header comments (§3.1, §3.2) |
| route consumers cross-referenced correctly (verified vs `api/src/routes/`) | PASS — `color/` ↔ `routes/colors.ts`, `session/` ↔ `routes/sessions.ts` confirmed by import-grep (§4) |
| Pipeline-shape `service` bullet kept consistent | PASS — `{palette,admin}` → `{palette,admin,color,session}` |

**Sub-gate C: PASS.**
