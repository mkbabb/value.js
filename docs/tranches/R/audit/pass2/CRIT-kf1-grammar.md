# CRIT · kf1-grammar (Pass-2) — the `parseFunctionParameters` grammar fix

**Critic**: Pass-2 · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/kf1-grammar.md`
**Ancestor**: pass-1 SPEC critic §1.1 + PASS1-VERDICT §2.9 / §5 P0-1 / §9 (KF-1 grammar bug)
**Verdict**: the CORE deliverable is SOUND, prototyped, green, and ports to the live tree; **P0-1 is discharged**. But the report carries one **false load-bearing side-finding** (§6/§8.3) and a **misstated baseline** (§ header) — both traceable to a stale worktree. Amendment, not re-derivation.

**convergencePct: 89**

---

## 1. What I verified GREEN (the load-bearing spine holds)

Every core claim checked against the live trees:

1. **The grammar bug is LIVE at the current head `e80b359` (1.2.0).** `src/parsing/stylesheet.ts:637-661` (main tree) still does the `indexOf(":")` mis-split (`name = slice(0,colonIdx)`, second colon → default), and `serialize.ts:136` still emits `p.defaultValue` with two colons. The diagnosis is not stale.
2. **The fix is correctly implemented in the worktree.** `topLevelColonIndex` (`stylesheet.ts:643-671`) tracks paren/bracket depth + string state; `parseFunctionParameters` (`:673-696`) splits `decl` at the first top-level colon, then splits name/`syntax` at the first whitespace. Spec-faithful to `<custom-property-name> <css-type>? [ : <default-value> ]?`.
3. **The serializer mirrors it** (`serialize.ts:127-150`): `name <syntax>: default`.
4. **Tests are rewritten off the CORRECT grammar, not the buggy canon.** `test/grammar-2026-atrules.test.ts:43,58,89,100,111` assert `{name:"--x", syntax:"<length>", default:"0px"}` etc. Ran targeted suite in the worktree: **69 passed (37 + 32)** — matches the report.
5. **`npx tsc --noEmit -p tsconfig.lib.json` → exit 0** (re-ran in the worktree). The `type→syntax` / `defaultValue→default` rename has no stray consumers.
6. **The kf `normalizeParam` deletion map is ACCURATE against the live kf tree.** `keyframes.js/src/animation/resolve/resolve-function.ts`: `VJS_PARAM_BUG_MAX="1.2.0"` (:35), the name-glue/`fromType` recovery (:69-92), the `CUSTOM_FN_ARG_DROP` 1.2.0-bug arm (:122-135). §5's every-recovery-case-goes-dead table is faithful. The S7 lifecycle (:30-33) is reachable exactly as claimed.
7. **Q5/Q6 reframing is coherent and honest.** The (A) grammar-fix (patch-arguable) / (B) rename (major) decomposition is correct; the §8-fallback strike is justified (it would canonize a spec-violating parse); the BUNDLE-into-2.0.0 recommendation is well-argued.
8. **PASS1-VERDICT §5 P0-1 is genuinely DISCHARGED** — not paraphrased away. R.W1 is re-specced as grammar-fix+rename with the spec vector `--x <length>: 0px`; the §8 fallback is struck; Q5/Q6 are re-framed on the fix/rename split. The mustFix is actually satisfied.

**Crucially, the fix PORTS to the live tree.** `git diff --stat 15b0382 e80b359` over `stylesheet.ts`, `serialize.ts`, and both test files is **empty** — the four touched files are **byte-identical** between the worktree base and the current head. So the line citations hold at `e80b359` and the patch applies cleanly.

---

## 2. DEFECTS a ratifier must not co-sign as-is

### D1 (MAJOR) — §6 side-finding is FALSE at the current tree; §8.3 recommends spurious work

§6 claims: *"`extractFunctions` … is ABSENT from the committed source"* and recommends (§8 point 3) an R.W1 sub-item to *"restore `extractFunctions` to `src/parsing/extract.ts` + barrel."*

**This is wrong against the live tree.** At `e80b359` (1.2.0):
- `src/parsing/extract.ts:124` — `export const extractFunctions = (`
- `src/index.ts:291` — re-exports it
- `src/subpaths/parsing.ts:47` — re-exports it
- kf's `node_modules/@mkbabb/value.js/dist/index.d.ts:37` ships it, and `coerceToSyntax` (`:39`) too

`extractFunctions` was added to **source** at commit `23d1a91` (Tranche P, 1.1.0) — `git log -S "export const extractFunctions" -- src/parsing/extract.ts` confirms. The report observed it "absent" **only because the worktree is pinned at `15b0382` (1.0.2)**, which predates Tranche P (`git grep extractFunctions 15b0382 -- 'src/*'` → nothing). The gap the report escalates onto the R.W1 critical path **does not exist** — it is already closed in the live tree. §6 and §8.3 must be **struck**, or they inject phantom work and a false "a fresh build drops the export" alarm into SPEC-v2.

### D2 (MAJOR) — the baseline is misstated; the report is built on a 3-commit-stale worktree

The header (line 4) says *"worktree off `tranche-q` @ `e80b359` (1.2.0)"* and the status line (5) repeats "1.2.0". **The worktree HEAD is actually `15b0382` (v1.0.2)** — three commits behind (`23d1a91` P/1.1.0, `fd3c7ce` Q/1.1.1, `e80b359` Q/1.2.0). This is not cosmetic: it is the direct cause of D1, and it undermines confidence in every line citation until independently re-checked (I checked — they hold only because the four core files happen to be byte-identical across the range; that is luck, not diligence). SPEC-v2 must re-base/re-apply the patch on `e80b359` and re-verify, and the report must state the true base.

### D3 (MINOR) — the "1877/1877" full-suite count is a 1.0.2 number

The full-suite claim (`§4`, `§9`) is measured at the stale worktree. The live tree already differs: `grammar-2026-atrules.test.ts` is **31 tests at `e80b359`** vs the worktree's 37 (the fix adds 6). The greenness at the current head is *inferable* (byte-identical core files) but was **not re-measured**. Restate the count against `e80b359` after re-basing.

### D4 (MINOR) — rename sweep must include the subpath barrel

The rename touches the **public** type. Besides `src/index.ts`, `src/subpaths/parsing.ts:40` also re-exports `CustomFunctionParameter`. The SPEC-v2 landing note should name it so the renamed shape propagates through the subpath entry too (tsc caught nothing because it is a pure type re-export, but the descriptor's public surface spans both barrels).

---

## 3. Precepts / staleness vs glass-ui 4.2.0 / kf 5.1.0

- **NO-legacy**: the §8-fallback strike is the correct precept call (record-as-canonical = freezing a spec-violating parse forever). Good.
- **No over-scoping**: §8.3's "restore extractFunctions" would have been over-scope even if real; being false, it is doubly out. Strike it.
- **glass-ui/kf staleness**: this lane is value.js-internal + kf-consume; nothing depends on glass-ui 4.2.0/BG surface. kf 5.1.0's `resolve-function.ts` is the live consumer and matches §5. No cross-repo staleness beyond D1/D2.

---

## 4. Disposition

The substantive judgment — KF-1 is a live grammar bug requiring a fix + rename, bundled into 2.0.0, unblocking kf's `normalizeParam` deletion — is **correct, prototyped, and green**, and it ports to the current tree. That is the whole point of the lane and it is delivered. But the report ships a **factually wrong load-bearing section** (§6) that recommends spurious R.W1 work, on top of a **misstated baseline** that a reader must catch by hand. These are amendment-scoped, not re-derivation — hence 89, not lower; but they are real integrity defects, so not ≥95.

### mustFix
1. **Strike §6 and §8 point 3.** `extractFunctions` is present in current source (`src/parsing/extract.ts:124`, re-exported `src/index.ts:291`, `src/subpaths/parsing.ts:47`), added at Tranche P (1.1.0, `23d1a91`). The "absent from source / fresh build drops it" claim is a stale-worktree artifact (worktree pinned at `15b0382`/1.0.2). Remove the phantom R.W1 sub-item.
2. **Correct the baseline (header + status).** The worktree is at `15b0382` (1.0.2), not `e80b359` (1.2.0). State that the fix nonetheless ports because `stylesheet.ts` / `serialize.ts` / both test files are byte-identical across `15b0382..e80b359` (verified — empty diff). Re-base or re-apply the patch on `e80b359` before SPEC-v2 lands it, and re-verify there.
3. **Re-measure the full suite at `e80b359`** (the "1877/1877" is a 1.0.2 number; `grammar-2026-atrules.test.ts` is 31 at head vs 37 in the worktree) and add `src/subpaths/parsing.ts` to the rename sweep note.
