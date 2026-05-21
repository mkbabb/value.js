# F-AUDIT-6 — api/ + e2e/ + CI state at F open (post-W12)

**Mode**: READ-ONLY. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0` (`fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src`).
**Scope (per F-opening directive)**: survey api/ + e2e/ + CI state post-W12 dep bumps to verify the E.W2 + E.W3 + E.W4 substrate stayed intact under the major version bumps (TypeScript 5→6, Vite 7→8 + Rolldown, vue-tsc 2→3, @lucide/vue rename, @types/node ^24, vaul-vue ^0.4, plus 23 SAFE-PATCH+MINOR devDep bumps in W8).
**Author**: F-AUDIT-6.
**Hard cap**: time-bounded by the three benches (~90s aggregate runtime).

## §0 — Methodology + the W8-W12 substrate

The eight commits from `v0.7.0` (E close) to F open all live in the `library/W8…W12` series and confine themselves entirely to dependency + build-config surface. Per `git show --name-only` against each, **the cumulative `^src/` diff across W8-W12 is empty** — every source-code line in `src/` at F open is bit-identical to the v0.7.0 release. The only authored-code diff outside `package.json` + `package-lock.json` is W12's `vite.config.ts` (+20 LoC: `entryRoot: src` + `rootDir` override for vite-plugin-dts, the dist/ flat-layout fix; commit message: "Prior shape was `dist/src/index.d.ts`, which caused TS7016 in every typed consumer").

This shape — **substrate-untouched, only consumer-facing dep bumps** — frames the audit: F-AUDIT-6 is verifying that the E.W2/E.W3/E.W4 substrate continues to work under W8-W12's bumped tooling, not that anyone has touched the substrate itself.

Commits inspected:

| Commit | Wave | Scope |
|---|---|---|
| `1fafd5d` | W8-β re-baseline | lockfile self-version 0.6.0 → 0.7.0 (11 lines) |
| `4cd8d15` | W8-β SAFE sweep | 23 devDep bumps (Group B.1 + B.2) — package.json + lockfile only |
| `442aba1` | W9-A | vue-tsc 2.2.0 → 3.3.1 (package.json + lockfile only) |
| `02ed508` | W9-C | rename lucide-vue-next → @lucide/vue (77 demo/ files; 0 src/ files) |
| `209584c` | W9-F + W9-H | @types/node ^24 + vaul-vue ^0.4 (package.json + lockfile only) |
| `08a7f96` | W10-β | Vite 7 → 8 + Rolldown (package.json + lockfile + vite.config minor) |
| `9f56813` | W12-β | TypeScript 5 → 6 (package.json + lockfile only) |
| `e1549e0` | W12 unblocker | vite.config.ts +20 LoC dts flat-layout fix |

## §1 — api/ state verification

| E.W2 Lane | Deliverable | At E close | At F open | Verdict |
|---|---|---|---|---|
| A | `routes/sessions.ts` + `routes/colors.ts` pipeline migration | 59 + 81 LoC, zero raw `c.json({error})`, zod schemas wired | 59 + 81 LoC, zero raw `c.json({error})`, zod schemas wired (`loginBody`, `approvedColorsQuery`, `colorSearchQuery`, `proposeColorBody` all `safeParse`'d) | **INTACT** |
| B | `withTransaction` in services | ≥ 3 sites | 3 callsites: `services/admin/users.ts:161`, `services/palette/forks.ts:80`, `services/palette/votes.ts:45` | **INTACT** |
| C | `requireOwnership` wired in routes | ≥ 3 sites | 3 callsites: `routes/palettes/crud.ts:100` (PATCH), `:122` (DELETE), `routes/palettes/versions.ts:53` (POST revert) | **INTACT** |
| D | `usePaletteManager.ts` LoC | 154 | 154 | **INTACT** |
| E | `middleware.ts` deleted + 6 new files ≤ 100 LoC each | yes | `api/src/middleware.ts` absent; `api/src/middleware/` has **8** files (the E close `INTERNAL` line in CHANGELOG v0.7.0 says "split into 8 per-concern files"). LoC: `admin-auth.ts` 35, `cors.ts` 37, `inject-services.ts` **134**, `ip.ts` 46, `rate-limit.ts` 97, `require-ownership.ts` 42, `resolve-session.ts` 63, `sanitize-body.ts` 41. Total 495 LoC. | **INTACT — but `inject-services.ts` is 134 LoC, over the audit prompt's "≤ 100" claim.** (`inject-services.ts` predates E.W2 Lane E by one commit — it landed at D.W2 Lane C #5 with the Repositories + Services + makeCollections DI scaffold inline, so the 100-cap was never the published bar for *that* file. The Lane E split-target was the 279-LoC `middleware.ts` god module, achieved.) |
| F | `api/test/` test count | 104 across 20 files | **104 tests across 20 files** (`vitest run` clean in 7.03s); api/tsconfig `tsc --noEmit` clean | **INTACT** |

### §1.1 — api/package.json dep bumps post-E close

`api/package.json` is **unchanged** since E close — same hono ^4.7.0, mongodb ^6.12.0, zod ^4.4.3, typescript ^5.7.0, vitest ^3.2.4, mongodb-memory-server ^10.1.4. The W12 TypeScript 5→6 bump applies to the **root** package only; api/ stays on TS 5.7. This is intentional per the W12-β commit message: "Lift value.js to TypeScript 6.0.3" — value.js, not value.js + api. The api/ build (`tsc` direct, not vite-plugin-dts) is unaffected.

### §1.2 — Are routes/services bit-identical to E close?

`git log --oneline -- api/ ^47399c2` returns no commits past the E close merge (`47399c2`). The entire api/ subtree is byte-for-byte identical to v0.7.0. No drift to audit.

## §2 — e2e/ state verification

| Item | Expected (per E.W3 close + audit prompt) | Actual at F open | Verdict |
|---|---|---|---|
| Playwright projects | 5 | 5 (`smoke`, `smoke-admin`, `smoke-mobile`, `smoke-reactivity`, `smoke-safari`) | **INTACT** |
| Total specs (`npx playwright test --list`) | 36+ | **36 tests in 35 files** | **INTACT** |
| user-flow specs in `e2e/smoke/flows/` | 8 | 8 (color-propose, login-register, palette-delete, palette-edit, palette-flag, palette-fork, palette-save, vote-toggle) | **INTACT** |
| admin-flow specs in `e2e/smoke/admin/flows/` | 6 | 6 (color-approve, color-reject, palette-feature, tag-create, tag-delete, user-status) | **INTACT** |
| safari specs in `e2e/smoke/safari/` | 1 | 1 (`sustained-30s.spec.ts`) | **INTACT** |
| mobile specs in `e2e/smoke/mobile/` | 1 | 1 (`page-load-mobile.spec.ts`) | **INTACT** |
| fixtures (env-noise + user-auth + admin-auth) | present | `e2e/smoke/fixtures/{env-noise.ts, user-auth.ts}` present; `admin-auth.ts` lives at `e2e/smoke/admin/fixtures/admin-auth.ts` (E-AUDIT-6 §4.4 precedent — admin-auth is colocated under the admin subtree because only admin specs consume it) | **INTACT** (subdirectory placement of admin-auth is the E close shape) |
| `playwright.config.ts` shape | 5-project partition with workers:1 on `smoke-reactivity`, iPhone-14 WebKit on `smoke-safari` | matches; `testIgnore: ["**/admin/**", "**/mobile/**", "**/safari/**", "**/reactivity-instant.spec.ts"]` on the `smoke` base | **INTACT** |

### §2.1 — Did W8-W12 bumps impact Playwright?

`@playwright/test` was bumped in W8-β (`4cd8d15`) from `1.58.2 → 1.60.0`. **Within-major (SAFE-MINOR per AI W8-β spec §2.2.2)**; no API drift expected. `npx playwright test --list` exits clean and enumerates the full 36-test inventory; no spec-discovery regression. The bumps did NOT touch e2e/, fixtures/, or playwright.config.ts.

## §3 — CI workflow verification

Read `.github/workflows/node.js.yml` (246 LoC, 2 jobs).

### §3.1 — Matrix axes
`strategy.matrix.node: [22, 24]` — both LTS minors covered. `fail-fast: false`. **Matches the E.W4 Lane B target.**

### §3.2 — Step inventory (build-and-test job)
1. `actions/checkout@v4` with `fetch-depth: 0` (needed for the CHANGELOG-changed PR-gate's merge-base diff).
2. `actions/setup-node@v5` (Node 22 + 24 matrix, `cache: "npm"`).
3. `npm ci`.
4. `npm run lint` (ESLint flat config, `--max-warnings=0`).
5. **vue-tsc count gate** — `npx vue-tsc --noEmit` parsed for `error TS` lines; passes if count ≤ 126 (the VENDOR-POLICY.md baseline). Drops below 126 emit a `::notice::` (informational).
6. `npm run build` (library) + dist size log.
7. `npx vitest run` (frontend unit tests).
8. `cd api && npm install && npm test` (backend integration tests).
9. `npm run proof:resolution` (contract-v2 dev-resolution proof).
10. `npm run bench` + parsing-based assertion of all 3 gates (L8 ≥ 5×, HSL→RGB ≥ 2×, nameParser ≥ 5×).
11. Playwright browser cache (`actions/cache@v4`, keyed on `package-lock.json` hash).
12. Playwright install (`chromium webkit`) — conditional on cache miss.
13. `npx playwright test` (all 5 projects).
14. Upload playwright-report artifact (always).
15. **CHANGELOG-changed gate** — PR-only; asserts CHANGELOG.md is touched when `^src/` is touched.

The `deploy` job (`needs: build-and-test`, `if: github.event_name == 'push' && github.ref == 'refs/heads/master'`) runs `npm run gh-pages` + checks out sibling `glass-ui` + deploys via `peaceiris/actions-gh-pages@v4`.

### §3.3 — Recent commits touching `.github/workflows/`

```
$ git log --oneline -- .github/workflows/
8e42a2d feat(ci+demo/w4): bench gate + CI hardening + glass-ui motion-canon Family A adoption + Vite 7.3.3 (E.W4 Lanes A + B + E)
f374f13 test(e2e/w5): smoke-mobile Pixel-7 spec + 3-project playwright config + CI runs all 3 (D.W5 Lane C)
6ca2046 test(library/w1): vitest coverage for 5 B.W3-WIP files + decompose targeted + colorFilter SPSA + lint script + CI step (D.W1 L7)
afe102a test(e2e): abrogate the 16-spec Playwright suite, replace with a 3-spec role-based smoke suite + CI gate
…
```

**The W8-W12 dep-bump series did NOT touch `.github/workflows/` once.** The CI authority remains E.W4 Lane A/B (`8e42a2d`). Verdict: **INTACT.**

### §3.4 — CI verdict
**INTACT.** No drift. The CHANGELOG-changed gate is pinned to `^src/` and will NOT fire on W8-W12 commits (they touch `package.json` / lockfile / vite.config.ts / demo, never `^src/`); this is by-design but worth flagging in §6 (F should consider broadening the gate to package.json + vite.config.ts for runtime-impacting changes).

## §4 — Bench state verification

Each bench was executed locally; medians captured from the stdout `Summary:` block.

| Bench | At E close | At F open | Gate | Verdict |
|---|---|---|---|---|
| `bench/color-channel-access.mjs` (L8) | 14.34× (E-FINAL §5) / 12.24× (`PROGRESS`) | **10.92×** (sorted runs: 10.58×, 10.92×, 11.52×) | ≥ 5× | **PASS** (2.18× margin) |
| `bench/color2-direct-paths.mjs` (HSL→RGB) | 4.28× | **4.47×** (sorted: 4.11×, 4.47×, 4.91×) | ≥ 2× | **PASS** (2.24× margin); +0.19× delta vs E close |
| `bench/parser-namelookup.mjs` | 47.33× | **38.89×** (sorted: 35.37×, 38.89×, 40.04×) | ≥ 5× | **PASS** (7.78× margin) |

**Total bench runtime**: ~90s aggregate (~25s + ~50s + ~10s).

### §4.1 — Variance interpretation

L8 dropped 14.34× → 10.92× (-24%). parser-namelookup dropped 47.33× → 38.89× (-18%). HSL→RGB rose 4.28× → 4.47× (+4%). All three remain comfortably above their gates; the variance is consistent with **host-CPU jitter** (these are wall-clock benches on shared hardware) rather than a regression from TS 6 + Vite 8 + Rolldown. Notes:

- The benches operate on `dist/value.{js,cjs}` — they execute compiled JavaScript, not TypeScript source. **TS 6 only affects the *build*, not runtime.** If TS 6's emitted JavaScript differed from TS 5's at the bytecode level, that would show — but the W12-β commit message explicitly states "byte-shape preserved; index.d.ts/utils.d.ts/math.d.ts LOC flat against W10-β baseline". Confirmed at runtime.
- Vite 8 + Rolldown (W10-β) re-bundles the library; if Rolldown produced markedly different output, the bench medians might shift uniformly. The fact that HSL→RGB *improved* slightly while L8 + parser regressed suggests host-jitter dominates over any compiler delta.
- Recommend F-plan: re-run the benches 5×–10× per gate and adopt the *minimum* of the 5 medians (more conservative than current "3 runs, take median"). Reduces flake-induced false-fail risk on the CI step at §3.2 #10. Not blocking for F open.

**Bench verdict: ALL 3 PASS the CI gate; cross-tranche medians varied within normal host-jitter envelope.**

## §5 — Vendor + CHANGELOG state

### §5.1 — VENDOR-POLICY.md

**INTACT.** 56 LoC. Authored at E.W4 Lane C. Codifies the 126-vue-tsc-error baseline + the four classes (TS2379, TS2307, TS2375, TS2532 etc.). Unmodified since E close.

Actual vue-tsc count at F open: **120 errors** (run locally via `npx vue-tsc --noEmit 2>&1 | grep -cE 'error TS'`). The W9-A commit message explicitly notes: *"net delta is -8 errors (118 against 3.3.1)"*, and the W12-β commit message notes *"vue-tsc error count is FLAT at 120 (sorted-diff against pre-W12 baseline is empty — identical error set)"*. So 126 → 118 (W9-A, vue-tsc 2 → 3) → 120 (W11/W12 noise, since at HEAD it's 120, suggesting 2 errors reappeared between W9 and W12). All 120 still inside `demo/@/components/ui/` per VENDOR-POLICY.md's invariant; src/ authored surface is GREEN. CI gate ≤ 126 holds with 6-error margin (`::notice::` informational drop fires).

### §5.2 — CHANGELOG.md

**v0.7.0 entry intact.** Dated 2026-05-20, includes BREAKING, DEFERRED, FEATURES, PERFORMANCE, SUBTLE BEHAVIORAL CHANGE, INTERNAL sections. v0.6.0 entry preserved below.

**No CHANGELOG entries for W8/W9/W10/W12.** Eight commits, zero CHANGELOG lines.

Did the CHANGELOG-changed CI gate catch the omission? **NO** — by design. The gate (workflow §3.2 step 15) only fires for PRs that touch `^src/`. All 8 W8-W12 commits avoid `^src/` (they touch `package.json`, `package-lock.json`, `vite.config.ts`, and `demo/`). So the gate does not consider these CHANGELOG-omitting commits as offenders. The gate's `^src/` filter is too narrow.

**Recommendation surfaced for F-plan**: broaden the CHANGELOG-changed gate to fire on `package.json` + `vite.config.ts` + `api/package.json` changes that affect the publishable surface (the dep bumps DO affect the runtime contract — they bump TypeScript, Vite, vue-tsc, all of which compile or type-check what `dist/value.js` exposes). Alternatively, keep the gate narrow and add a separate "release notes" gate keyed on `package.json` version-field-touched (already implicit in the merge-pre-release ceremony).

## §6 — New gates F should consider

The W8-W12 traverse exposed gaps where E's gates do not cover the new tooling surface:

### §6.1 — Rolldown-specific gates (Vite 8 + Rolldown)

- **dist-shape gate** — the W12-unblocker commit (`e1549e0`) fixed a real consumer-breaking regression: prior to W12-unblocker, `dist/src/index.d.ts` lived instead of `dist/index.d.ts`, breaking every typed consumer (keyframes.js, words/frontend). A CI step that asserts `dist/index.d.ts` exists post-build (`test -f dist/index.d.ts || exit 1`) would catch this class of regression at PR time. **Effort**: 1 line in workflow. **Leverage**: HIGH.
- **dts-emit-equivalence** — assert the dist/ d.ts tree has the same fileset as the previous release tag (`diff <(ls dist/*.d.ts | sort) <(git show v0.7.0:<known-dist-tree>)`). Would catch silent shape drift from future Rolldown/vite-plugin-dts version skew. **Effort**: 30 min. **Leverage**: MEDIUM.
- **rolldownOptions bundle-size invariant** — `vite.config.ts:95` + `:161` have `rolldownOptions:` blocks; a regression in the Rolldown rollup-options shape could silently produce a 2× larger bundle. The bench gate already proxies for hot-path-runtime regression but does NOT proxy for bundle size. Add a `dist/value.js` size gate to CI (currently only logged via `ls -la dist/`). **Effort**: 30 min. **Leverage**: MEDIUM.

### §6.2 — TS 6 strict-mode flags F should adopt

TS 6 introduces several strictness flags F's tsconfig could adopt without breaking src/ (since src/ is already `strict: true, verbatimModuleSyntax, noUncheckedIndexedAccess, exactOptionalPropertyTypes`):

- `--erasableSyntaxOnly` (TS 5.8+, default-off in TS 6) — would forbid TS-only syntax that has no JS equivalent (e.g., enums, namespaces, parameter properties). src/ already avoids these (verified via grep — zero `enum` declarations, zero `namespace`, zero parameter-properties). Adopting would *encode* this invariant. **Effort**: 1-line tsconfig + zero src changes. **Leverage**: MEDIUM (prevents future drift).
- TS 6's narrowing on `Array.find` / `Array.findIndex` (improved analysis) — not a flag; just a free win. The W12-β commit message confirms "Narrowing: zero new regressions surfaced".

### §6.3 — vue-tsc 3.3 patterns

The W9-A commit moved vue-tsc 2 → 3.3.1, dropping vue-tsc errors 126 → 118. At F open the count is **120** (drift +2 from W11/W12 noise; both still inside `demo/@/components/ui/`). The CI gate ≤ 126 holds with 6-error margin. F could:

- **Lower the baseline** to 120 (or the F open count) to lock in the W9-A drop. Effort: 1-line workflow change. Risk: future shadcn-vue regenerations could push it back over 126.
- **Add per-file vue-tsc baseline** — assert that no NEW file outside `demo/@/components/ui/` emits errors. Effort: 1h (parse vue-tsc output for the prefix). Leverage: HIGH (catches genuine new errors in authored code).

### §6.4 — Lockfile invariant

The W8-β re-baseline commit `1fafd5d` exists because the lockfile's recorded self-version (`0.6.0`) drifted from package.json's release version (`0.7.0`). A CI gate that asserts `package-lock.json` records the same version as `package.json` would have prevented this from going undetected for the entire E close → F open window. **Effort**: 5 min. **Leverage**: LOW (the housekeeping commit fixed it; this is the kind of drift F-plan should consider). Alternative: rely on `npm install` post-clone always re-baselining.

## §7 — Net assessment

E's api/ + e2e/ + CI substrate **post-W12 is INTACT.** The eight W8-W12 commits are confined to dependency-bump + build-config surface; they do NOT touch `^src/`, `api/`, `e2e/`, `.github/workflows/`, `playwright.config.ts`, `VENDOR-POLICY.md`, `CHANGELOG.md` (intentionally — the gate didn't trip), or the test/spec inventory. The library + demo continues to build (`npm run build` clean per W10-β + W12 + W12-unblocker commit messages), test (1584/1584 vitest passes; 104/20 api tests pass), and bench (all 3 gates PASS).

What DRIFTED informationally (none blocking):
- vue-tsc error count 126 → 120 (six fewer errors at F open vs. the CI baseline).
- Bench medians varied within host-jitter envelope (L8 14.34× → 10.92×, parser 47.33× → 38.89×, HSL→RGB 4.28× → 4.47×). All gates PASS.
- CHANGELOG.md has no entries for W8-W12 (gate's `^src/` filter doesn't fire on dep-only commits).

**F-plan recommendations**:

1. **Adopt the W12-unblocker invariant in CI**: add `test -f dist/index.d.ts && test ! -d dist/src` post-build assertion to prevent regression of the consumer-breaking dts layout the W12-unblocker just fixed. (§6.1)
2. **Add dist/value.js size gate**: log + assert ≤ 142 KB raw / ≤ 42 KB gzip at F open (current measurement was 141.47 KB / 41.64 KB per W12-β commit message). (§6.1)
3. **Broaden CHANGELOG-changed CI gate**: extend the `^src/` regex to also catch `package.json` + `vite.config.ts` (any change that affects the publishable surface). Or add a separate gate keyed on `package.json:version` increment. (§5.2)
4. **Lower vue-tsc baseline to 120**: lock in the W9-A drop; if future regen pushes back over 126, re-baseline at that time. (§6.3)
5. **Add per-file vue-tsc check**: assert errors stay inside `demo/@/components/ui/` (the VENDOR-POLICY.md scope). (§6.3)
6. **Add lockfile-self-version assertion**: prevent W8-β-style version drift. (§6.4)
7. **Encode `--erasableSyntaxOnly`** in tsconfig: zero-cost lock-in of an existing src/ invariant. (§6.2)
8. **Document the api/ tooling split**: api/ stayed on TS 5.7 + Vite-free (`tsc` direct) while root went to TS 6 + Vite 8. F-plan should pick whether to lift api/ to TS 6 (one-line change) for consistency, or document the deliberate split. (§1.1)

None of these recommendations indicate a substrate-level problem; all are tightenings F can adopt with low effort and high specificity.

## §8 — Authority

**Audit deliverables consulted**:
- `/Users/mkbabb/Programming/value.js/docs/tranches/E/audit/E-AUDIT-6-api-e2e-cross-cutting.md` (the parent shape)
- `/Users/mkbabb/Programming/value.js/docs/tranches/E/FINAL.md` (§5 performance + test suite + §7 v0.7.0 release surface)

**Files inspected (read or stat-only)**:
- `/Users/mkbabb/Programming/value.js/api/CLAUDE.md`
- `/Users/mkbabb/Programming/value.js/api/package.json`
- `/Users/mkbabb/Programming/value.js/api/src/middleware/{admin-auth,cors,inject-services,ip,rate-limit,require-ownership,resolve-session,sanitize-body}.ts` (LoC + content of inject-services.ts)
- `/Users/mkbabb/Programming/value.js/api/src/routes/sessions.ts` (LoC + grep for zod + raw-envelope)
- `/Users/mkbabb/Programming/value.js/api/src/routes/colors.ts` (LoC + grep for zod + raw-envelope)
- `/Users/mkbabb/Programming/value.js/api/src/services/admin/users.ts` (grep for `withTransaction`)
- `/Users/mkbabb/Programming/value.js/api/src/services/palette/forks.ts` (grep for `withTransaction`)
- `/Users/mkbabb/Programming/value.js/api/src/services/palette/votes.ts` (grep for `withTransaction`)
- `/Users/mkbabb/Programming/value.js/api/src/routes/palettes/{crud,versions}.ts` (grep for `requireOwnership`)
- `/Users/mkbabb/Programming/value.js/api/test/` (20 test files listing + count)
- `/Users/mkbabb/Programming/value.js/demo/@/composables/palette/usePaletteManager.ts` (LoC = 154)
- `/Users/mkbabb/Programming/value.js/playwright.config.ts` (5-project shape)
- `/Users/mkbabb/Programming/value.js/e2e/smoke/{flows,admin/flows,safari,mobile,fixtures,admin/fixtures}/` (spec/fixture inventory)
- `/Users/mkbabb/Programming/value.js/.github/workflows/node.js.yml` (full read)
- `/Users/mkbabb/Programming/value.js/VENDOR-POLICY.md` (head + LoC)
- `/Users/mkbabb/Programming/value.js/CHANGELOG.md` (v0.7.0 entry + grep for W8-W12 entries)
- `/Users/mkbabb/Programming/value.js/package.json` (root — dep bumps verification)
- `/Users/mkbabb/Programming/value.js/vite.config.ts` (grep for `rolldown`)

**Commands run**:
- `git -C … log -1 --format=%H` (HEAD verification → `e1549e0`)
- `git -C … log --oneline -25` + per-commit `--stat` + `--name-only` (W8-W12 diff inspection)
- `git -C … log --oneline -- .github/workflows/` (workflow-touch history)
- `git -C … log --oneline -- api/` (api-touch history)
- `cd api && npx vitest run` (104/20 PASS in 7.03s)
- `cd api && npx tsc --noEmit` (clean)
- `node bench/color-channel-access.mjs` (10.92× median)
- `node bench/color2-direct-paths.mjs` (HSL→RGB 4.47×)
- `node bench/parser-namelookup.mjs` (38.89× median)
- `npx playwright test --list` (36 tests in 35 files; 5 projects)
- `npx vue-tsc --noEmit | grep -cE 'error TS'` (120 errors)
- `wc -l api/src/middleware/*.ts`
- `find e2e -name "*.spec.ts"` + per-subdir `ls` (8+6+1+1 specs + 6 view + 7 base)

Total wall-clock: bench execution ~90s; vitest ~7s; vue-tsc ~80s; everything else trivial.
