# N-Critic K1 — Factual-Accuracy Adversarial Review

**Target:** Tranche-N charter for value.js (`docs/tranches/N/{N.md,PROGRESS.md,audit/*}`)
**Substrate:** branch `tranche-f-handoff`, HEAD `0cb5dd2`, 2026-06-11
**Lens:** LENS 1 — Factual accuracy. Every count/version/hash/file:line/verdict verified against primary evidence (tree grep, file:line, `npm view`/`npm pack`, live typecheck).
**Verdict:** **sound-with-fixes** — the charter's evidentiary spine is overwhelmingly accurate, but two load-bearing claims are wrong (one is a non-reproducible headline count; one would delete a live API field if executed), plus three smaller factual drifts.

---

## METHOD

Read N.md, PROGRESS.md, synthesis.md, fold-ledger.md, prompt-coverage.md, and the V1/V2/V3/V5/E1/E3/B1/B2/C8v2(=V4) lanes. Then re-derived every load-bearing number from primary evidence rather than trusting the lanes. Ran `npm run typecheck`, `npm pack --dry-run`, `npm view @mkbabb/{glass-ui,keyframes.js}`, and byte-exact greps over `api/src`, `src/`, `demo/`.

---

## CONFIRMED-TRUE (claim survived the attack — do not re-litigate)

These all reproduced against primary evidence and are NOT findings:

- **26 WithId casts** (25 strict `as Model & {_id` + 1 parenthetical `forks.ts:206`): grep = 25 strict + 1 parenthetical. EXACT. (V2)
- **18 withTransaction sites** (19 grep − 1 JSDoc at `db.ts:10`): `grep -rn 'services\.withTransaction(' api/src` = 19; db.ts:10 is the JSDoc line. EXACT.
- **26 createIndex** in db.ts; the **3 write-only `palette_versions` indexes** (`forkedFromHash`/`rootHash`/`authorSlug+createdAt`, db.ts:55-57): no query in api/src filters on those fields. EXACT.
- **TTL-index premise**: `deleteExpired` (cron.ts:33 + `repositories/session.ts:68`) and the cron expired-session arm exist and delete sessions. The native-TTL replacement is real (caveat below in nits — the `deleteStale` arm survives a TTL on `expiresAt`).
- **compose.yaml has no replica set**: no `--replSet`, no command override. CONFIRMED.
- **Boot-fatal imports**: `ComponentSliders.vue:117` (`@mkbabb/glass-ui/glass-carousel` / `GlassCarousel`,`GlassCarouselItem`); `BouncyTabs` at `MixSourceSelector.vue:4` + `PaneSegmentedControl.vue:18`. EXACT.
- **glass-ui 3.12.0 registry**: `dist-tags.latest = 3.12.0`; exports include `./aurora ./dock ./carousel ./goo-blob ./watercolor-dot ./tabs` (no `./glass-carousel`); peer `@mkbabb/value.js: ^0.10.0 || ^0.11.0`; transitive peers `@mkbabb/pencil-boil ^0.4.1` + `perfect-freehand ^1.2.3`. ALL CONFIRMED via `npm view`.
- **Prod wire I-era**: V3's curl evidence (legacy `id`/`status`, no `published`/`atomSetHash`, J/K routes 404, NCSU alias byte-identical to babb.dev, same rate-limit pool) is internally coherent and methodologically sound. DEC-9 "retired" is false on the wire — well-supported.
- **Tarball**: `npm pack --dry-run` unpackedSize = 574121 B = **560.7 KB**, 46 files. Prettier chunks `dist/postcss-*.js` 197293 + `dist/standalone-*.js` 113556 = 310849 B = **54.1%**. Prettier is devDep-only (package.json:94) and NOT in rolldown `external` (vite.config.ts:131 lists only `vue`,`@mkbabb/parse-that`). EXACT.
- **PRM census**: mix-canvas `useMixingAnimation.ts:116,206` has RAF + zero `prefers-reduced-motion`/`matchMedia` gate → LIVE hole. CONFIRMED.
- **Phantom-class trio**: `pastel-rainbow-text` defined only in `PaletteDialogHeader.vue:94` scoped style (2 external consumers no-op); `glass-elevated` retired; `dashed-well` has zero CSS rule (the 102 grep hits are vendored `.claude/worktrees/**/*.md` doc mentions inside node_modules, not rules — V5's "zero definitions" holds). CONFIRMED.
- **Kill-list KEEP refutations**: `Katex.vue` consumed by 11 `assets/docs/*.md` (grep = 11); `ImagePaletteExtractor.vue` rendered by `PaletteDialog.vue:80,193`. CONFIRMED REFUTED — KEEP correct.
- **Gates**: vitest 1607/36, lint clean, api tsc 0, api 161/28, lib build PASS — all match B1. e2e: 0 passed (36 failed + 1 did-not-run of 37) — pass-count "0/37" correct.
- **development-key delete at 0.11.1**: commit `4c8c532` diff removes `"development": "./src/index.ts"` from exports; gone from package.json. CONFIRMED. M.W1.A "DONE-OUT-OF-BAND" correct.
- **keyframes phantom devDep**: `@mkbabb/keyframes.js` imported nowhere in src/ or demo/. CONFIRMED.
- **M-supersede table**: cross-checked vs `docs/tranches/M/M.md` wave schedule — M.W1.A=development-key, M.W2.B=WithId, M.W4=publish 0.11.0, M.W5=aurora, M.W7=blob+dock, M.W6=modern-web, M.W8=infra. All verdicts map correctly.
- **14 routes**: `viewSchema.ts` ViewId union + VIEW_MAP = 14 keys. The "14 panes/routes" framing is grounded (though see nit on panes-vs-views conflation).
- **1270-LoC blob fork** (9 files) + `webgl-utils.ts` exists. EXACT.
- **forkOfHash 3 writers**: `import.ts:60`, `crud.ts:103`, `forks.ts:95`. The writer count is correct (the reader claim is not — see P1 below).

---

## FINDINGS

### P1 — typecheck is 91 errors at HEAD, NOT "3"; the boot-truth headline count is non-reproducible

**Location:** N.md §1 ("First fatal … Latent twin: `BouncyTabs`"), N.md §4 N.W1.D ("the 37/37 fail was the boot-break"), PROGRESS.md line 47 ("typecheck ✗ (3)") and wave-status gate, fold-ledger §1 ("typecheck RED ×3"), B1.md ("FAIL — 3 errors").

**Primary evidence:** `npm run typecheck` at HEAD `0cb5dd2` exits 1 with **91 value.js type errors**: 74×TS7016 ("Could not find a declaration file for module '@mkbabb/glass-ui…' implicitly has an 'any' type") + 16×TS7006 (implicit-any params cascading from the untyped glass-ui modules) + **1×TS2307** (the glass-carousel subpath). The check-types.mjs harness already excludes glass-ui-internal diagnostics; the 91 are all value.js-demo-graph errors.

**Why it matters:** The charter's entire boot-truth framing rests on "3 cohort-skew imports" that N.W1.A fixes "gestalt." But (a) the **2 BouncyTabs TS2305 errors do not even appear** at HEAD — once glass-ui resolves to an untyped `any` module (TS7016), the named-import check never fires; and (b) fixing the 3 named imports would leave **~88 TS7016/TS7006 errors** standing, because the real dominant cause is glass-ui's local dist shipping **no `.d.ts` declarations** (the dist-flap the synthesis itself documents as "the dist-flap that broke this audit's visual lanes"). The N.W1 gate "typecheck 0" is therefore **un-meetable by value.js-side import fixes alone** — it depends on the glass-ui C-DTS dts-emitting build (deferred to glass-ui in §8). The "3" was measured (B1) during a transient warm-dist moment with dts present; it does not reproduce on the committed substrate. **Correction:** typecheck = 91 errors at HEAD (74 TS7016 + 16 TS7006 + 1 TS2307); the N.W1 "typecheck 0" gate must own the missing-dts dependency, not 3 renames.

### P1 — `forkOfHash` is NOT "0 readers"; deleting it (N.W3.C) would strip a live public-API field

**Location:** N.md §1 ("delete the write-only `forkOfHash` field (3 write sites, 0 readers)"), N.md §4 N.W3.C (same), N.md §5 critical files, fold-ledger §4 T15 ("`forkOfHash` write-only dead storage (3 writers, 0 readers) → delete field + writes + formatter").

**Primary evidence:** `forkOfHash` is **read and emitted to the wire** by the formatter: `api/src/format/palette.ts:74` `forkOfHash: rest.forkOfHash` — it is a serialized field of the palette envelope. V3's own wire dump lists `forkOfHash` in the live `/palettes` payload `keys()`. It is also a consumed type in the demo: `demo/@/lib/palette/types.ts:29` `forkOfHash?: string | null`.

**Root of the error:** the charter conflates two distinct fields. The **write-only thing** that V2 actually verified is the `palette_versions` field `forkedFromHash` (and its index at db.ts:55) — V2 never examined `forkOfHash`. `forkOfHash` (a `Palette` field) and `forkedFromHash` (a `PaletteVersion` field) are different. Executing T15/N.W3.C as written ("delete field + writes + formatter") would **remove a field clients receive today** — a breaking API change mislabeled as dead-storage cleanup. **Correction:** `forkOfHash` has ≥1 reader (formatter→wire) + a demo type consumer; it is NOT deletable as dead storage. If the intent was the write-only *index* `forkedFromHash` (db.ts:55), say so — and note `forkedFromHash` is itself read at `versions.ts:57` (`parentHash ?? forkedFromHash`) from the request DTO, so only its *index* is write-only, not the field.

### P2 — keyframes 4.1.0 deps `@mkbabb/value.js@^0.11.1`, not `^0.11.2`

**Location:** N.md §3 ("keyframes 4.1.0 (published) deps `@mkbabb/value.js@^0.11.2` ✓ satisfied").

**Primary evidence:** `npm view @mkbabb/keyframes.js@4.1.0 dependencies` → `@mkbabb/value.js: ^0.11.1` (and `@mkbabb/parse-that: ^0.9.0`). The satisfaction conclusion is unchanged (0.11.2 satisfies `^0.11.1`), but the cited range is wrong. **Correction:** the floor is `^0.11.1`.

### P2 — parseCSSColor root-fix cited at `color.ts:239`; the actual annotation site is `color.ts:593`/`635`

**Location:** N.md §1 ("`parseCSSColor` typing root-fix at the combinator annotation (`color.ts:239`)"), N.md §4 N.W2.C, N.md §5 critical files ("`src/parsing/color.ts:239` (combinator annotation)").

**Primary evidence:** `color.ts:239` is `const colorValue: Parser<ValueUnit> = Parser.lazy(...)` — an internal parser for color *channel* values (percent/angle), unrelated to the `parseCSSColor` entry type. The lane the charter cites (E1) names the real sites: `color.ts:593` `const Value: Parser<ValueUnit> = dispatch(dispatchTable)…` and `color.ts:635` `export const parseCSSColor = memoize(…)`. Grep confirms 593/635. **Correction:** the root-fix annotation is at `color.ts:593` (+ the memoize return at `:635`), not `:239`. The charter contradicts its own evidence base.

### nit — `n-verify-V4.md` does not exist; the charter cites "V4" ~15× but the file is `n-audit-C8v2.md`

**Location:** N.md §0, §1, §2, §8, PROGRESS V-ledger ("V4" rows), synthesis line 26 ("4 verification files + C8v2").

**Primary evidence:** `ls audit/lanes/n-verify-V*.md` → V1, V2, V3, V5 only. The V4 content (blob/satellite/uSatColor verification) is the file `n-audit-C8v2.md`, whose header literally reads "LANE V4 — C8 blob redeploy re-verification." The synthesis correctly accounts for this ("C8's durable file = the V4 redeploy"), so it is traceable, not a factual error — but a reader following a "(V4)" citation finds no `n-verify-V4.md`. **Correction:** rename or cross-reference so "V4" resolves.

### nit — "37/37 fail" overstates; the e2e run is 36 failed + 1 did-not-run

**Location:** N.md §4 N.W1.D ("the 37/37 fail was the boot-break").

**Primary evidence:** B2.md run = "36 failed, 0 passed, 1 did not run" (the serial `slider-keyboard` spec skipped after `spectrum-drag` failed). The pass-count framing "0/37" (used elsewhere) is correct; "37/37 fail" is not. **Correction:** 36 failed + 1 skipped of 37; 0 passed.

### nit — serialize.ts prettier import is at :136-137, charter §5 cites :131

**Location:** N.md §5 critical files ("`parsing/serialize.ts:131`").

**Primary evidence:** the dynamic `import("prettier")` / `import("prettier/plugins/postcss")` are at `serialize.ts:136-137` (E3, the cited source, says :135-137). Line 131 is off by ~5. Minor binding-site drift in a file:line table. **Correction:** :136-137.

---

## NOTE ON RAF CENSUS (reconciled, NOT a finding)

PROGRESS/inv-N-9 say "8 RAF sites"; E3 says "12 RAF call sites"; E1's table lists 7. These reconcile: `grep -rln requestAnimationFrame demo/` = 12 files, of which 4 are `hero-lab/` (a separate experimental entry both E1/E3 exclude) → 8 main-app files = the charter's "8." E1's table shows 7 because it covers `useLayerTransition.ts` separately in its section (d). The "8" is the main-app count and is defensible.

---

## NOTE ON TTL CAVEAT (minor, folded into P-list as confirmed)

N.W3.C says a TTL index on `expiresAt` "deletes `deleteExpired` + the cron expired-session arm outright." Accurate for the *expired* arm, but the cron also runs `deleteStale` (lastSeenAt < now−30d, cron.ts:34) which a TTL on `expiresAt` does NOT subsume — the session-cleanup cron cannot be fully removed. The charter scopes its claim to "expired-session arm," so this is within tolerance; flagging for the implementer.
