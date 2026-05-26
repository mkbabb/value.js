# H.W1 Lane B — `api/tsconfig.json` strictness parity with root

**Status**: LANDED.
**Authored**: 2026-05-26.
**HEAD at landing**: `tranche-h` working tree (Lane A.1 + Lane A.2 in-tree uncommitted).
**Sibling docs**:
- `docs/tranches/H/waves/H.W1.md §Lane B` — mission directive.
- `docs/tranches/H/audit/H-AUDIT-6.md §1.2` — the gap audit that surfaced the 4 missing flags.
- Root `tsconfig.json` — parity target for the 4 strictness flags.

---

## §1 — Mission

H-AUDIT-6 §1.2 named four strictness flags present in root `tsconfig.json` but absent from `api/tsconfig.json`:

| Flag | Why api/ should have it |
|---|---|
| `noUncheckedIndexedAccess` | indexed array/record access returns `T \| undefined` instead of `T` |
| `exactOptionalPropertyTypes` | `{ x?: number }` ≠ `{ x?: number \| undefined }` |
| `verbatimModuleSyntax` | enforces `import type` for type-only imports |
| `isolatedModules` | every file independently transpilable |

Lane B adds all four to `api/tsconfig.json` and repairs every error each flag surfaces — no `// @ts-ignore`, no `as any`, no `as unknown as` introduced.

---

## §2 — First-probe error counts (per flag, in isolation)

Each flag was enabled alone first to attribute errors to a specific cause; the combined run is in §4.

| Flag | First-probe error count | Files surfaced |
|---|---|---|
| `noUncheckedIndexedAccess` | 21 | `src/services/palette/oklab.ts` (only) |
| `exactOptionalPropertyTypes` | 15 | 10 files (see §3 table) |
| `verbatimModuleSyntax` | 0 | (Lane A.1+A.2 work + pre-existing discipline already paid this) |
| `isolatedModules` | 0 | (same — `verbatimModuleSyntax` satisfaction implies `isolatedModules` here) |

Combined run after enabling all four = 36 unique error messages across 10 files (some errors stack across flags). All 36 were repaired genuinely.

---

## §3 — Per-error fix-pattern summary

### §3.1 — `noUncheckedIndexedAccess` (21 errors, 1 file)

All 21 errors in `src/services/palette/oklab.ts` come from regex capture-group access (`hexMatch[1]`, `rgbMatch[1..3]`) + string-index access (`h[0]`, `h[1]`, `h[2]`). The outer `.match(...)` succeeds-or-null check guarantees the capture-group is present, but TS under `noUncheckedIndexedAccess` cannot prove regex semantics — capture groups index to `string | undefined`.

**Fix pattern**: destructure-and-validate (no asserts). Three guarded narrowings replace the unsafe indexing:

1. `const [, h] = hexMatch; if (h === undefined) throw new ValidationError(...);`
2. For the 3-char branch: `const [c0, c1, c2] = h; if (c0 === undefined || c1 === undefined || c2 === undefined) throw ...;`
3. For the rgb branch: `const [, rs, gs, bs] = rgbMatch; if (rs === undefined || gs === undefined || bs === undefined) throw ...;`

The 6/8-char branch was already safe (`h.slice()` returns `string`, not `string | undefined`).

The new `ValidationError` throws on the unreachable-via-regex paths are defensive — they would never fire under the regex's actual semantics, but they make the function provably safe to the type checker without `as` or `!`. This is the idiomatic shape under this flag.

### §3.2 — `exactOptionalPropertyTypes` (15 errors, 9 files)

The dominant pattern: zod's `.optional()` produces `T | undefined` on `parsed.data.xxx`; downstream consumer interfaces declared `xxx?: T` (which under `exactOptionalPropertyTypes` means "absent OR T" — NOT "absent OR T OR undefined"). Caller passes `xxx: parsed.data.xxx` (type `T | undefined`) into `xxx?: T` → assignment fails.

**Judgment call** (relayed): two repair shapes were considered.

**Option α** — interface uses `xxx?: T | undefined` (the wire-format-faithful shape).
**Option β** — caller strips `undefined` keys before passing (conditional-spread shape).

Option α was selected. Rationale:

- These interfaces describe API payloads that go from zod-parsed JSON inputs → service-layer → MongoDB. The wire format genuinely allows `undefined` in transit (e.g. `{"contributor": undefined}` in JS is equivalent to absent over JSON, and `parsed.data.contributor` is `string | undefined` either way). The interface should reflect what the wire actually carries.
- Option β would push noise (conditional-spread builders) into every call site — 6+ extra sites for 5 distinct interfaces — purely to satisfy a stricter-than-wire-format type. KISS argues against it.
- The `?: T | undefined` shape is consistent with how Vue 3.5 / zod / Hono ecosystems propagate optional fields. Choosing α matches the surrounding library convention.

**11 of 15 errors** were repaired by changing `xxx?: T` → `xxx?: T | undefined` on the receiving interface. Affected interfaces:

| File | Interface | Field(s) widened |
|---|---|---|
| `src/models.ts` | `PaletteColor` | `name` |
| `src/models.ts` | `Session` | `userSlug`, `expiresAt` |
| `src/models.ts` | `User` | `lastSeenAt`, `status` |
| `src/models.ts` | `AdminAuditEvent` | `ipHash`, `target`, `actorSlug`, `payload` |
| `src/services/admin/audit.ts` | `AuditEntryDTO` | `target`, `ipHash`, `actorSlug`, `payload` |
| `src/services/admin/audit.ts` | `AuditQuery` | `action`, `target`, `after`, `before` |
| `src/services/admin/users.ts` | `UserListEntry` | `lastSeenAt`, `status` |
| `src/services/color/proposals.ts` | `ProposeInput` | `contributor` |
| `src/services/palette/flags.ts` | `FlagInput` | `detail` |
| `src/services/palette/forks.ts` | `ForkInput` | `name`, `slug` |
| `src/format/palette.ts` | `FormattedPalette` | `voted` |

**1 of 15 errors** was repaired by deleting a duplicate type definition:

- `src/hash.ts` had its own local `PaletteColor` interface (struct-equivalent to `models.ts`'s but defined separately). After `PaletteColor.name` in `models.ts` was widened, the local copy DID NOT propagate → cross-module assignability broke. Fix: deleted the duplicate, replaced with `import type { PaletteColor } from "./models.js";`. This is the right repair regardless of strictness — a duplicate interface across two files was a latent bug-magnet.

**3 of 15 errors** in `src/services/palette/crud.ts` (lines 79, 80, 116) were the same root cause as the others — `PaletteColor.name` widening — and resolved automatically once `models.ts` was updated.

### §3.3 — `verbatimModuleSyntax` (0 errors)

Already satisfied. `import type` discipline was paid pre-Lane-B (likely D.W2 + E.W2 conventions). No changes needed.

### §3.4 — `isolatedModules` (0 errors)

Already satisfied. Implies no ambient cross-file type inference + no `const enum` exports + no plain `export { Type }` re-exports of type-only symbols. `verbatimModuleSyntax` discipline carries this for free.

---

## §4 — Files touched (Lane B-scoped diff)

| File | Class of change | LoC delta |
|---|---|---|
| `api/tsconfig.json` | added 4 strictness flags | +4 |
| `api/src/services/palette/oklab.ts` | regex-capture guarded narrowings | +23 / −8 |
| `api/src/hash.ts` | delete duplicate `PaletteColor`, import from `models.ts` | −5 |
| `api/src/models.ts` | 5 interfaces' optional fields widened to `\| undefined` | +14 / −7 (plus 1 JSDoc) |
| `api/src/format/palette.ts` | `voted?: boolean` → `voted?: boolean \| undefined` | +1 / −1 |
| `api/src/services/admin/audit.ts` | `AuditEntryDTO` + `AuditQuery` widening | +8 / −8 |
| `api/src/services/admin/users.ts` | `UserListEntry` widening (2 fields) | +2 / −2 |
| `api/src/services/color/proposals.ts` | `ProposeInput.contributor` widening | +1 / −1 |
| `api/src/services/palette/flags.ts` | `FlagInput.detail` widening | +1 / −1 |
| `api/src/services/palette/forks.ts` | `ForkInput` widening (2 fields) | +2 / −2 |

**Total**: 10 files touched (1 tsconfig + 9 source). Approximate diff: +56 / −35 LoC, dominated by `oklab.ts` defensive guards and JSDoc on `PaletteColor.name`.

---

## §5 — Sub-gate evidence

1. **`cd api && npx tsc --noEmit`** — exits 0 with all four flags active. Confirmed via direct invocation post-fixes.
2. **`cd api && npx vitest run`** — exits 0; **115 tests passing across 22 test files** (matches the Lane A.1 + A.2 baseline of 115). No tests modified.
3. **`cd api && npx tsc` (full emit)** — exits 0; `dist/` artifacts emit cleanly.
4. **No escape hatches introduced** — `git diff -- api/ | grep -E '@ts-ignore|@ts-expect-error|as any|as unknown as'` returns 0 added lines.
5. **`api/tsconfig.json` shape verified** — 4 new flags ordered alphabetically below `strict: true`, values match root.

---

## §6 — Judgment calls (full text)

**JC-1 (relayed)**: For `exactOptionalPropertyTypes`, chose **option α** (`?: T | undefined` on the receiving interface) over **option β** (`undefined`-stripping conditional-spread at every call site). Rationale captured in §3.2 above — the interfaces describe wire-format payloads that genuinely accept `undefined` in transit, and option β would inject 6+ noise sites for 5 distinct interfaces. The widened shape matches zod/Hono ecosystem conventions and is the idiomatic interpretation per CLAUDE.md's "no workarounds, gestalt approaches" precept. No orchestrator adjudication needed — both options are sound; α is the lower-noise idiomatic shape.

**JC-2 (incidental, not strictness-driven)**: `src/hash.ts` had a duplicate `PaletteColor` interface struct-equivalent to `models.ts`'s. Widening one without the other broke cross-module assignability. Fix unified the type to a single source-of-truth import. This is a latent-bug repair the strictness flag surfaced — the duplicate would have drifted on any future shape change. Not a strictness-substitution; a genuine architectural cleanup.

---

## §7 — Final `api/tsconfig.json` shape

```jsonc
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "Node16",
        "moduleResolution": "Node16",
        "lib": ["ES2022"],
        "outDir": "dist",
        "rootDir": "src",
        "strict": true,
        "noUncheckedIndexedAccess": true,         // +Lane B
        "exactOptionalPropertyTypes": true,       // +Lane B
        "verbatimModuleSyntax": true,             // +Lane B
        "isolatedModules": true,                  // +Lane B
        "skipLibCheck": true,
        "esModuleInterop": true,
        "resolveJsonModule": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

All four flags landed; values match root `tsconfig.json` (each `true`). api/ now compiles at root-parity strictness.
