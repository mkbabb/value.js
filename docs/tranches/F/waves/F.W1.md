# F.W1 — Post-W12 transpositions + dead-code sweep

**Opens after**: F.W0 close.
**Lanes**: 3 — A (`@ts-ignore` strengthening via typed memoize), B (Rolldown declarative `codeSplitting`), C (zero-consumer shadcn-vue subdir dead-code sweep).
**Status**: planned.

## Scope

F.W1 lands the 3 NEW transpositions surfaced by F-AUDIT-5 §5. E1 binding: architectural transposition over patching. KISS-binding: only the 3 named items; no scope creep.

### Lane A — `@ts-ignore` strengthening via typed memoize return-shape

Per F-AUDIT-5 §5.3. `src/parsing/utils.ts:146` carries the sole `@ts-ignore` in `src/`. The site is a `memoize` return-shape mismatch — the `memoize` helper returns a generic function shape; the call site receives a more specific (single-arg) return type.

Strategy:
1. **Read `src/parsing/utils.ts:146` in context** — understand what type the `memoize` is wrapping + what type the caller expects.
2. **Strengthen `memoize`'s type signature** in `@mkbabb/parse-that` IF that's where it lives, OR in a local wrapper IF parse-that's signature is structural. Per the cross-repo boundary (parse-that is a peer), prefer the local wrapper.
3. **Pattern**: write a typed `memoizeWithKey<TArgs, TReturn>(fn, keyFn)` that preserves the function's call-signature in the return type. Replace the `@ts-ignore` site with the typed wrapper.
4. **Verify**:
   - `grep -rn '@ts-ignore' src/` returns ZERO.
   - `grep -rn 'as any' src/` count drops by 1 (the audit anticipated 37 → 36 if the strengthening also removes an `as any` on the way).
   - vitest 1584/34 still green.
   - vue-tsc count unchanged (the `@ts-ignore` was suppressing a single error; verify the strengthening makes the type proper without re-introducing the error).

**Sub-gate A**:
- `grep -rn '@ts-ignore' src/` returns ZERO.
- `grep -rn 'as any' src/` count down ≥ 1 from F.W0 baseline.
- Gates GREEN (vitest, vue-tsc, build, lint).

### Lane B — Rolldown declarative `codeSplitting`

Per F-AUDIT-5 §5.2. Vite 8 + Rolldown (W10-β) provides a declarative `codeSplitting` config that replaces the imperative `manualChunks` pattern. Vite 9 future-proofing.

Strategy:
1. **Read `vite.config.ts`** — verify the current chunk-split shape (currently `output.manualChunks` per Vite 7 pattern, possibly carried into Vite 8 with a deprecation warning).
2. **Adopt the declarative shape** per Rolldown's documentation (or the Vite 8 docs that thinly wrap it). Likely shape: `build.rolldownOptions.codeSplitting: { ... }` or similar.
3. **Verify build output is byte-equivalent** OR documented-different. Run `npm run build` pre + post. Compare:
   - `dist/value.js` size.
   - `dist/standalone-*.js` + `dist/postcss-*.js` chunk count + sizes.
   - The chunking strategy (which modules end up in which chunk).
4. **Verify gh-pages output unchanged** (post-F.W0 Lane A).

**Sub-gate B**:
- `vite.config.ts` adopts the declarative form.
- Build output documented (byte-equivalent OR explicit delta with rationale).
- Gates GREEN.

### Lane C — Zero-consumer shadcn-vue subdir dead-code sweep

Per F-AUDIT-5 §1 + VENDOR-POLICY follow-on. Some `demo/@/components/ui/` subdirs (`auto-form/`, `chart/*`, `v-calendar/`, etc.) may have ZERO grep'd consumer in `demo/`. Delete-or-justify each.

Strategy:
1. **Enumerate** `demo/@/components/ui/` subdirs:
   ```
   ls -la demo/@/components/ui/
   ```
2. **Per subdir, grep for consumers**:
   ```
   grep -rn "from ['\"]@/components/ui/<subdir>" demo/@/ --include='*.vue' --include='*.ts'
   ```
3. **Categorize**:
   - **CONSUMED**: keep.
   - **ZERO-CONSUMER**: delete the subdir.
   - **AMBIGUOUS** (e.g., used by another shadcn component that's itself unused): trace transitively.
4. **Update `VENDOR-POLICY.md`** with the post-sweep vue-tsc error count + the deleted-subdir list.

**Sub-gate C**:
- Each subdir has an explicit verdict (CONSUMED / DELETED).
- vue-tsc count drops if subdirs deleted (record pre/post).
- VENDOR-POLICY.md updated.

## File bounds

| Lane | Files |
|---|---|
| A | `src/parsing/utils.ts` (memoize strengthening), `audit/F.W1-lane-a-ts-ignore.md` (new) |
| B | `vite.config.ts` (codeSplitting declarative), `audit/F.W1-lane-b-rolldown.md` (new) |
| C | `demo/@/components/ui/<subdir>/` (deletes if zero-consumer), `VENDOR-POLICY.md` (updated), `audit/F.W1-lane-c-vendor-sweep.md` (new) |

## Gate

Conjunction of sub-gates A + B + C. Wave-level:
- `grep -rn '@ts-ignore' src/` returns ZERO.
- vue-tsc count ≤ F.W0 baseline (drops if Lane C deletes subdirs).
- All E gates GREEN (lint, vitest, build, gh-pages, proof:resolution, smoke 36/36, bench medians).

## Verification artefacts

3 per-lane audit docs.

## Commit plan

- `refactor(library/w1): strengthen memoize type signature; @ts-ignore drops to zero in src/ (F.W1 Lane A)`
- `chore(build/w1): adopt Rolldown declarative codeSplitting (Vite 9 future-proofing; F.W1 Lane B)`
- `chore(demo/w1): zero-consumer shadcn-vue subdir sweep + VENDOR-POLICY refresh (F.W1 Lane C)`

## Dependencies

- Depends on: F.W0 close (gh-pages unblock + state-at-open baseline).
- Blocks: F.W2 (cross-repo write happens on a clean F.W1 substrate).
