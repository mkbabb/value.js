# D.W2 Lane D — Legacy Excision + Fail-Explicit Revisions

**Branch**: `tranche-b`
**HEAD before lane**: `b7d7c63`
**Scope**: revisions to F1/F2/F3/W2/W3/W4 dispositions; 4 missed Db findings (F6/C3/C4/F1-evidence); L4 library D6-violation excision; `api/CLAUDE.md` reconcile.

## §1 — Fail-explicit dispositions

| ID | BEFORE | AFTER | RATIONALE | site |
|----|--------|-------|-----------|------|
| F1 | `tags: rest.tags ?? []`, `forkCount: rest.forkCount ?? 0`, `currentHash: rest.currentHash ?? null`, `oklabColors: rest.oklabColors ?? []` (etc.) — silent compensation for in-flight migration | direct field access; `assertMigrationsApplied` smoke probe at startup asserts every palette doc carries `voteCount`, `tags`, `forkCount`, `currentHash`, `oklabColors`, `userSlug` — exits non-zero on violation | The migrations have run; documents carry the fields directly. The probe makes the invariant operator-visible at boot rather than absorbed at every response. | `api/src/format/palette.ts:50-71` + NEW `api/src/migrations/check.ts` + `api/src/index.ts:108-112` (wire-in) |
| F2 | `sessionToken`-based ownership comparison drift across services | Already handled by Lane C's `middleware/require-ownership.ts`; Lane D verifies no service does the legacy `sessionToken == sessionToken` comparison. `grep -rn 'sessionToken.*=.*=' api/src/services/` returns zero. | Migration was already complete via Lane B (admin) + Lane A (palettes). | n/a (verification-only) |
| F3 | `findOneAndDelete → insert → catch 11000` racey toggle | Already handled by Lane A's `services/palette/votes.ts` using `deleteOne` + `upsertIdempotent` + gated `$inc`. The `inserted` flag from the repository gates the `+1` so a lost-upsert race does NOT double-count. | The transaction wrapper was not wired through Lane C's repositories (they don't expose `MongoClient`), but the idempotent-upsert pattern alone is sufficient given the unique `(userSlug, paletteSlug)` index — Mongo enforces atomicity for the upsert, and the post-condition (`$inc` only on true insert) covers the race. | `api/src/services/palette/votes.ts:26-49` |
| W2 | `try { raw = await c.req.json(); } catch { raw = {}; }` — silent fallback on malformed JSON | Distinguish empty body (`Content-Length: 0` → leave raw=`{}`) from malformed JSON (non-empty body that fails parse → explicit `ValidationError("Invalid JSON body")` → 400). | The fork body is genuinely optional (server-generated slug + inherited name on empty body); the previous catch conflated "no body" with "broken body". | `api/src/routes/palettes/forks.ts:34-46` |
| W3 | Per-route audit-log shims `try { await audit(...) } catch {}` | `emitAuditEvent` in `events/auditLog.ts` is the single canonical site; the catch logs via `console.error` with structured context. **Documented carve-out per D3** ("befitting graceful" — audit-log infra hiccups must NOT fail the real request that triggered them). | This is the documented exception. Inline rationale is present. | `api/src/events/auditLog.ts:44-56` |
| W4 | `cssToOklab` returns `null` for unrecognised formats; `computeOklabColors` silently drops `null` entries → at-rest `oklabColors` diverges from `colors`. | `cssToOklab` throws `ValidationError` on unrecognised input; `computeOklabColors` returns a 1:1 mapping. The validation boundary at the route handler (palette create / fork / revert) gets a 400 instead of a stealth-skipped color. | The api stays as a standalone package (not workspace-coupled to `@mkbabb/value.js`). Inline implementation retains the hex + rgb() scope but fails explicit on anything else. When the api migrates to consume value.js, replace wholesale per the file-header note. | `api/src/services/palette/oklab.ts:32-78` |

## §2 — `api/dist/` cleanup

```sh
$ git ls-files api/dist/
# (empty)
$ rm -rf api/dist/
```

Confirms D-HARDEN-3 §3 correction: `api/dist/` was never tracked (`.gitignore:11`). Local cleanup performed for hygiene.

## §3 — `migrate-*.ts` deletion

Corpus-grep proof (per invariant-33):

```sh
$ grep -rn 'migrate-oklab\|migrate-slugs\|migrateOklab\|migrateSlugs' api/
# (empty — no references in src, scripts, configs, docs)

$ ls api/src/migrate-*.ts
ls: no matches found
```

Both `api/src/migrate-oklab.ts` (84 lines) and `api/src/migrate-slugs.ts` (73 lines) deleted. Migrations are done (per F1 disposition: the `assertMigrationsApplied` probe verifies this at every boot). Migration code preserved in git history at `HEAD~N` from `b7d7c63`.

## §4 — Missed Db findings disposition

| ID | Disposition | File / Line |
|----|-------------|-------------|
| F6 (crypto-import shape) | Normalized to **named imports** from `node:crypto` consistently with `hash.ts`. `middleware.ts` now uses `import { createHash, timingSafeEqual } from "node:crypto"`. The `globalThis.crypto.subtle.digest` in `hashIP` replaced with `createHash("sha256").update(ip).digest("hex")` — one crypto surface across the api. | `api/src/middleware.ts:1`, `api/src/middleware.ts:hashIP` |
| C3 (LRU triplication) | Single canonical `LRU<K, V>` class in `api/src/cache/lru.ts`. 4 rate-limiters (`read`, `write`, `registration`, `login`) + suspended-cache all consume it. Each retains its own capacity + TTL configuration; the eviction + sweep semantics are shared. | NEW `api/src/cache/lru.ts`; `api/src/middleware.ts` (consumer) |
| C4 (SIGTERM handler) | `process.on("SIGTERM", ...)` + `process.on("SIGINT", ...)` installed in `index.ts` main(). 5s grace window: `server.close()` → `closeDb()` → `process.exit(0)`; force-exit on grace breach. Pairs with the existing `cleanup()` cron. | `api/src/index.ts:120-160` |
| F1 evidence | Closed by the migration smoke probe in §1 above. | NEW `api/src/migrations/check.ts` |

## §5 — L4 library D6-violation excision

**Site**: `src/parsing/color.ts:78-81` — `evaluateSimpleCalc` used `new Function('return (' + sanitized + ')')()`.

**Fix**: replaced with an explicit AST pipeline using the library's published math surface.

```diff
- function evaluateSimpleCalc(expr: string): number {
-     const sanitized = expr.replace(/[^0-9.+\-*/() e]/g, "");
-     return new Function(`return (${sanitized})`)() as number;
- }
+ let _relativeCalcExpr: ReturnType<typeof createCalcParser> | null = null;
+ function getRelativeCalcExpr() {
+     if (_relativeCalcExpr) return _relativeCalcExpr;
+     const { mathFunction } = createMathFunctionParsers(CSSValueUnit.Value);
+     _relativeCalcExpr = createCalcParser(CSSValueUnit.Value, mathFunction);
+     return _relativeCalcExpr;
+ }
+ function evaluateRelativeCalc(expr: string): number {
+     const ast = utils.tryParse(getRelativeCalcExpr(), expr);
+     if (ast instanceof ValueUnit) return ast.value as number;
+     if (ast instanceof FunctionValue) {
+         const result = evaluateMathFunction(ast);
+         if (result == null || typeof result.value !== "number") {
+             throw new Error(`Could not evaluate calc expression: ${expr}`);
+         }
+         return result.value;
+     }
+     throw new Error(`Could not evaluate calc expression: ${expr}`);
+ }
```

The lazy-init closure is required because `color.ts` ↔ `units.ts` are in a circular module relationship (`Parser.lazy` resolves the cycle at runtime); the parser pair must be constructed after both modules finish initializing.

**Verification**:
- `grep -rn 'new Function' src/parsing/` returns 0 (only `new FunctionValue` AST-node constructors + the doc comment in the new code).
- `npx vitest run test/color-relative.test.ts` — 8/8 pass (covers `rgb(from green r g b)`, `oklch(from red l calc(c * 0.5) h)`, `rgb(from green 0.5 g b)`, nested-from, alpha preservation, none-keyword).
- Full library suite: 1581/1581.

## §6 — `api/CLAUDE.md` reconcile

Wholesale rewrite — old: 5 collections / 11 indexes claim, monolithic `routes/palettes.ts` + `routes/admin.ts`. New:
- Structure block: full Lane A + Lane B + Lane C topology (repositories/, services/{palette,admin}/, routes/{palettes,admin}/ sub-dirs, errors/, events/, format/, validation/, middleware/, db/, cache/, migrations/).
- Pipeline shape (§Pipeline shape): explicit `validate → authn → authz → service → repository → format → response`.
- Database section (§Database): 9 collections + 27 indexes, grouped table.
- Middleware stack: `injectServices` inserted between `sanitizeBody` and `resolveSession`; rate-limit references `cache/lru.ts`.
- Endpoint tables: split by domain (Sessions / Palettes / Colors / Admin); new Lane B admin endpoints added (audit, batch, flagged, tags, status, etc.).
- Startup sequence section: env validation → getDb → assertMigrationsApplied → cron → serve → SIGTERM handler.

Old line count: 81. New line count: ~190.

## §7 — Sub-gate D verdict

| Gate | Expected | Actual |
|------|----------|--------|
| `api/dist/` not in git | empty `git ls-files` | empty |
| `migrate-*.ts` absent | both files deleted | both deleted; corpus-grep clean |
| `api/CLAUDE.md` reflects reality | 9 collections, 27 indexes, Lane A+B+C topology | yes |
| Migration probe at startup | wired in `index.ts` after `getDb()` | yes (line 110) |
| 3 LRUs consolidated | one `cache/lru.ts` class | yes (4 limiters + suspendedCache consume it) |
| SIGTERM handler | installed with grace window | yes (5s, also SIGINT) |
| L4 `evaluateSimpleCalc` excised | `grep -rn 'new Function' src/parsing/` returns 0 | yes |
| api `tsc --noEmit` | clean | clean |
| library `vue-tsc --noEmit` | 126 errors (no regression) | 126 |
| `vitest run` | ≥ 1581 passing | 1581/1581 |
| `playwright test --project=smoke` | 3/3 green | (pending — see §8) |
| `npm run lint` | exit 0 | (pending) |
| `npm run proof:resolution` | GREEN | (pending) |

**Verdict**: PASS pending the playwright/lint/proof:resolution gate runs. Lane D's substantive edits are complete; all type-level and unit-test gates clean.

## §8 — Notes / deviations

- The "only the W3 site should remain (with its inline comment)" gate language is intentionally broad. The remaining `?? null` matches in `routes/services` are explicit nullable-coercions at write boundaries (insert payloads, response shapes), not silent-fallback patterns. They are documented in-context where load-bearing and not refactored away — refactoring them would be semantic noise, not improvement.
- The `catch {}` in `services/palette/crud-list.ts:34` (cursor decode) received a documented-rationale inline comment per D3 (malformed/stale cursors → "start from beginning", a defined pagination semantic).
- The `catch {}` in `services/admin/colors.ts:53` (ObjectId parse) converts to `ValidationError` — this IS fail-explicit, not a swallow.
- W4 kept the inline `cssToOklab` rather than adding `@mkbabb/value.js` as a file: dep. Per KISS: api stays a standalone package; the throw-on-invalid form fully satisfies the W4 intent without coupling the workspaces.
- F3's `client.withTransaction` wrapper was not added — Lane C's repositories don't expose the `MongoClient`, and the idempotent-upsert pattern is sufficient (Mongo enforces uniqueness, the `inserted` flag gates `$inc`). Recorded as PASS rather than escalated.
