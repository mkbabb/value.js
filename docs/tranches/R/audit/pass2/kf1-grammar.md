> _Hoisted 2026-07-02 (R.W0-14) by lane L2-kf1-reverify from `.claude/worktrees/wf_d9a4e4d9-899-3/docs/tranches/R/audit/pass2/kf1-grammar.md`. **Amended** (not byte-faithful): header/status baseline corrected, suite counts re-measured at head `e80b359`, §6 + §8 point 3 STRUCK (the `extractFunctions` "dist-only" side-finding is false — the symbol is in source since 1.1.0), and the rename-sweep note extended (M1+M2+M3 of PASS2-VERDICT §3)._

# Pass-2 · kf1-grammar — the `parseFunctionParameters` grammar fix (KF-1 / R.W1)

**Lane**: kf1-grammar (seed 3) · **Descends from**: CRIT-SPEC §1.1 + PASS1-VERDICT §2.9 / §5 P0-1 / §9
**Date**: 2026-07-02 · **Worktree baseline (CORRECTED, M2)**: `15b0382` (v**1.0.2**) — **3 commits STALE**, and unlike boot-blast-radius (seed 2) it did **NOT** self-correct. The original header's "`e80b359` (1.2.0)" was aspirational, not the tree the prototype was measured on. · **Re-verified at head**: `tranche-q` @ `e80b359` (v1.2.0) by lane L2-kf1-reverify, 2026-07-02.
**Status (CORRECTED, M2+M3)**: PROTOTYPED + GREEN at the worktree base. The 4 touched files (`stylesheet.ts`, `serialize.ts`, `grammar-2026-atrules.test.ts`, `round-trip.test.ts`) are **byte-identical across `15b0382..e80b359`** (empty `git diff`, verified twice), so the `+141/−30` patch re-applies at head with a guaranteed-clean apply. **Re-measured at head** (`npx vitest run`, node_modules symlinked from the main install): clean head = **1934 passed / 51 files**; patched head = **1939 passed / 1 FAILED / 1940 total**. `grammar-2026-atrules.test.ts` = **31 at head base → 37 patched** (the fix adds 6); `round-trip.test.ts` = 32; targeted `69 passed`. `tsc -p tsconfig.lib.json` exit **0** (lib typecheck spans only `src/`). The old "**1877/1877**" was the 1.0.2/`15b0382`-base number (46 files) — a stale-worktree artifact. **The single head failure is NOT a defect in the fix — it is a rename-sweep gap the stale worktree could not see: `test/parsing-extract-functions.test.ts` (added in `23d1a91`, absent at `15b0382`) reads the renamed `.type` field at `:36`. See §4.**

---

## 1. Verdict

CRIT-SPEC §1.1 is **CONFIRMED against both trees and now fixed in prototype**. KF-1 is **two disjoint changes wearing one label**:

- **(A) a live grammar BUG** in `parseFunctionParameters` (`src/parsing/stylesheet.ts:637-660` @ 1.2.0) — the typed-param split is wrong; it mislays `<css-type>` onto `name` and the default onto `type`. This is a **behaviour fix** (changes previously-garbage output). **Patch-arguable.**
- **(B) a field RENAME** `type→syntax`, `defaultValue→default` on the published `CustomFunctionParameter` descriptor. This is the **true BC break**. **Major (2.0.0).**

The pass-1 SPEC (§8 KF-1, §3.1 R.W1) inherited R5 §B's false claim that "the parse is correct, only the field names differ." It is not correct. A rename **alone** cannot unblock kf's `normalizeParam` deletion — the shim compensates for the mis-split, not the field names. The R.W1 item must be re-specced as **grammar-fix + rename**, and the §8 fallback ("RECORD `{type,defaultValue}` canonical, shim permanent-by-contract") must be **struck** — it would canonize a spec-violating parse (garbage on every typed param), a NO-legacy violation at the contract level.

---

## 2. The bug, mechanically (1.2.0 baseline)

`src/parsing/stylesheet.ts:637-660` (pre-fix) split each param segment at the **first `indexOf(":")`** and treated a **second** colon as the syntax/default separator — i.e. it assumed the grammar `--name : <syntax> [ : <default> ]?` (a colon *after the name*). Its own comment (`:641`) declared this: `` `--x: <length>: 0` → name "--x", type "<length>", default "0" ``.

**That grammar does not exist.** CSS Functions & Mixins L1 §3.1 (confirmed live via WebFetch of `drafts.csswg.org/css-mixins-1/`):

```
<function-parameter> = <custom-property-name> <css-type>? [ : <default-value> ]?
<css-type>          = <syntax-component> | <type()>
<type()>            = type( <syntax> )
<default-value>     = <declaration-value>?
```

The `<css-type>` follows the name by **whitespace**; a **single top-level colon** introduces the default. Fed the spec form `--x <length>: 0px`, the 1.2.0 parser splits at the first colon → `{ name: "--x <length>", type: "0px" }`: `<syntax>` glued onto `name`, the default mis-landed on `type`. Reproduced exactly by kf's own ground-truth comment at `keyframes.js/src/animation/resolve/resolve-function.ts:46-51`.

**The serializer carried the identical bug** (`src/parsing/serialize.ts:132-139` @ 1.2.0): it emitted `name: type: default` (two colons). Parse and serialize were **symmetrically wrong**, which is why the O.W4-S7 round-trip test (`grammar-2026-atrules.test.ts:57`) passed — it was a **self-consistent garbage loop**, not evidence of correctness. Worse, the two existing unit assertions **codified the bug as canon**: `:28` used `--double(--x: <length>)` (colon-after-name) and `:48` used `--f(--a: <number>: 1)` (two colons) — exactly the "garbage codified" hazard CRIT-SPEC §1.1 point 2 named.

---

## 3. The fix (prototyped, green)

Three source edits + two test-file edits, all inside the worktree.

### 3.1 Type — `src/parsing/stylesheet.ts:44-48`
```ts
export type CustomFunctionParameter = {
    name: string;      // a <dashed-ident>, e.g. "--x"
    syntax?: string;   // the <css-type> declaration, e.g. "<length>" (VERBATIM)
    default?: string;  // the optional default value, VERBATIM
};
```
(`type→syntax`, `defaultValue→default` — the rename half.)

### 3.2 Parser — `src/parsing/stylesheet.ts:637-706`
New helper `topLevelColonIndex(text)` finds the **first depth-0 colon outside strings** (mirrors `splitSelectorList`'s depth/string tracking, `:483-526`) — so a colon nested in `type( … )`, `url( a:b )`, or a quoted string does **not** introduce a phantom default. Then each segment (already isolated at top-level commas by `splitSelectorList`):

1. `colonIdx = topLevelColonIndex(segment)` → splits `decl` (name + optional css-type) from the default.
2. Split `decl` at the **first whitespace** → `name` = leading `<custom-property-name>`, `syntax` = trailing `<css-type>` (or none).
3. Default = everything after the colon (or none).

The single top-level colon reliably introduces the default because `<syntax>` grammar (`<...>`, `|`, `+`, `#`, `type(…)`) contains **no top-level colon**.

### 3.3 Serializer — `src/parsing/serialize.ts:132-140`
Emit `name <syntax>: <default>` — **whitespace** before the css-type, **colon** before the default. Now byte-faithful to the spec grammar (and to the fixed parser).

---

## 4. Test vectors — all GREEN

Suite: `test/grammar-2026-atrules.test.ts` (rewritten off the buggy canon) + `test/round-trip.test.ts` (comparison helper `:124-126` re-keyed `type→syntax`, `defaultValue→default`).

| # | Input param | Parsed output | Note |
|---|---|---|---|
| KF-1 vector | `--x <length>: 0px` | `{name:"--x", syntax:"<length>", default:"0px"}` | the binding spec vector |
| no type/no default | `--x` | `{name:"--x"}` | bare |
| type, no default | `--x <length>` | `{name:"--x", syntax:"<length>"}` | |
| default, no type | `--x: 0px` | `{name:"--x", default:"0px"}` | colon-only |
| comma-nested default | `--x <length>: var(--y, 1px)` | `{name:"--x", syntax:"<length>", default:"var(--y, 1px)"}` | inner comma survives (splitSelectorList) + inner has no top-level colon |
| `type()` notation | `--x type(<length>)` | `{name:"--x", syntax:"type(<length>)"}` | no phantom default from any nested colon |
| multiple, mixed | `--x <length>: 0px, --y <color>: red, --z` | 3 params, mixed shapes | positional list |
| round-trip | `--f(--x <length>: var(--y, 1px), --z <color>)` | `parse(serialize(parse)) == parse` | parser+serializer agree on the *correct* grammar |

Run results **RE-MEASURED at head `e80b359`** (L2-kf1-reverify; the original worktree numbers were the stale `15b0382`/1.0.2 base — corrected here):
- `npx vitest run test/grammar-2026-atrules.test.ts test/round-trip.test.ts` → **69 passed** (37 + 32) — unchanged at head (`grammar-2026-atrules.test.ts` base is 31 at head, +6 from the fix = 37).
- `npx vitest run` (full) → **1939 passed / 1 FAILED / 1940 total, 51 files** (clean-head base is **1934 / 51 files**; the old "1877 / 46 files" was the 1.0.2 base). The **1 failure is `test/parsing-extract-functions.test.ts:36`** — a head-only test (added `23d1a91`, tranche P 1.1.0; **absent** at the `15b0382` worktree base) that asserts `desc!.parameters![0]!.type` on the input `--double(--x: <number>)`. The rename (`type→syntax`) removes `.type`, and under the corrected grammar the colon-after-name `--x: <number>` now parses as `{name:"--x", default:"<number>"}` (colon introduces the default), so the assertion must become `.default === "<number>"` **or** the input must be corrected to the spec form `--x <number>` asserting `.syntax === "<number>"`. This is a **rename-sweep extension the stale worktree could not observe** (§8/§9), not a flaw in the parser fix. It is the only residual; the parser+serializer behaviour is correct on all 8 §4 vectors.
- `npx tsc --noEmit -p tsconfig.lib.json` → **exit 0** (`tsconfig.lib` includes only `src/`; the field rename has zero stray consumers in `src/`. NOTE: the head **test suite** does have one consumer — `parsing-extract-functions.test.ts:36`, above — which lib typecheck does not cover; `grep` confirms `demo/` + `api/` reference neither field).

---

## 5. kf `normalizeParam` becomes deletable — the recovery-case map

kf ground truth: `keyframes.js/src/animation/resolve/resolve-function.ts`. With value.js emitting the **clean split fields**, every recovery case in `normalizeParam` (`:69-92`) maps to a **direct field read**:

| kf recovery mechanism (1.2.0 shim) | line | disposition under the fix |
|---|---|---|
| name-glue split (`rawName.search(/\s/)` → `ident` + `nameTail`) | `:70-75` | **DEAD** — `param.name` is already the clean `<dashed-ident>` |
| `nameTail`→`syntax` with `<…>` guard | `:76-80` | **DEAD** — `param.syntax` is a dedicated field |
| default = `defaultValue ?? fromType`, with the "`type` is-a-`<syntax>`" guard | `:81-90` | **DEAD** — `param.default` is a dedicated field; `type` no longer exists |
| `coerceArg` FAIL-EXPLICIT `try/catch` → `CUSTOM_FN_ARG_DROP` diagnostic ("default mis-assigned to `type`, failed to parse") | `resolve-function.ts:122-135` | the **generic** DROP-on-mismatch path stays (a real type-mismatch with no default still DROPs); the **1.2.0-bug arm** goes dead — `param.default` now parses because it is the actual default string, not a mis-landed `<syntax>` token |
| `VJS_PARAM_BUG_MAX = "1.2.0"` version assertion | `:35` | **DELETE** and bump — the mis-recovery guard has no bug to guard |

`normalizeParam` collapses to a 1:1 rename adapter (`{ident: p.name, syntax: p.syntax, defaultValue: p.default}`), or — cleaner — kf **deletes** `NormalizedParam` entirely and threads `CustomFunctionParameter` directly, reading `.name`/`.syntax`/`.default` at `coerceArg`/`resolveFunctionCall` (`:111-136`, `:189-`, the `.map(normalizeParam)` at `:205`). Either way the S7 lifecycle from the kf comment (`:30-33`) completes: **upstream fix → kf consume → DELETE `normalizeParam` + bump `VJS_PARAM_BUG_MAX`.** The gate "kf deletes `normalizeParam` and re-pins" is now **reachable** — it was **unreachable** under a rename-only R.W1.

---

## 6. ~~LOAD-BEARING SIDE-FINDING — `extractFunctions` is dist-only, absent from source~~ — **STRUCK (M1: FALSE — stale-worktree artifact)**

> **STRUCK 2026-07-02 by lane L2-kf1-reverify (PASS2-VERDICT §3 M1).** This entire side-finding was a stale-worktree artifact. `extractFunctions` **IS in committed source**, and has been **since 1.1.0 (`23d1a91`, tranche P)** — it was simply absent from the `15b0382`/1.0.2 tree this worktree was (stalely) checked out on. Verified at head `e80b359`:
> - `src/parsing/extract.ts:124` — `export const extractFunctions = (` (with its `// ─── extractFunctions (VJ-CSS1) ───` header at `:99`).
> - `src/index.ts:291` — re-exported from the public root barrel.
> - `src/subpaths/parsing.ts:47` — re-exported from the `@mkbabb/value.js/parsing` subpath barrel.
> - `test/parsing-extract-functions.test.ts` (7 tests, added `23d1a91`) exercises it directly against `../src/parsing/extract` **and** `../src/index`, asserting `extractFunctionsRoot === extractFunctions` (`:16-19`).
>
> A fresh `npm run build` therefore **keeps** `extractFunctions` — there is no missing-export hazard, and no R.W1 sub-item to "restore" it (§8 point 3 below is likewise struck). This false finding was elevated across five sections of SYNTHESIS-v2 and is corrected there under the same M1 (spec-v3 edit). The contradiction was visible inside the pass's own inputs — boot-blast-radius §0/§6 names `extractFunctions` as a P/Q-era barrel export the stale tree lacked.

---

## 7. Ratification re-framing — Q5 / Q6 (the honest 2.0.0-vs-1.3.0 split)

Pass-1 SYNTHESIS §11 posed Q5 (the param rename: clean break vs record-as-canonical) and Q6 (bundle into one 2.0.0 vs ship gamut-policy alone as 1.3.0). CRIT-SPEC §1.1 point 3 correctly says the framing shifts once KF-1 is understood as **two changes**. Re-framed:

### Q5 — RESOLVED to a defect fix, not a taste question
The pass-1 fallback ("RECORD `{type,defaultValue}` canonical, shim permanent-by-contract") is **struck**: it canonizes a **spec-violating parse** — every typed param arrives as garbage (`{name:"--x <length>", type:"0px"}`). Making that permanent-by-contract is the NO-legacy precept violated at the contract level, and it freezes kf's string-surgery shim **forever** for a bug value.js can fix in ~40 lines (this prototype). **Q5 collapses**: the grammar **must** be fixed. The only surviving sub-question is the field *names*, folded into Q6.

### Q6 — the semver split, argued honestly on the (A)/(B) decomposition
Two independently-classifiable changes travel under KF-1:

- **(A) grammar fix** — changes output **only** for typed-param input, and **only** from garbage (`{name:"--x <length>", type:"0px"}`) to correct (`{name:"--x", syntax:"<length>", default:"0px"}`). No caller could have depended on the garbage shape as *specified* behaviour; the sole real consumer (kf) actively **works around** it. By the "you can't break what was never correct" reading, **(A) is patch-eligible (→ 1.2.1 / 1.3.0)**.
- **(B) field rename** `type→syntax`, `defaultValue→default` — renames keys on a **published** descriptor type. Any consumer reading `.type`/`.defaultValue` breaks at the type boundary. This is an **unambiguous BC break → 2.0.0**. It is *elective* (the fix could keep `type`/`defaultValue` names and still be correct) — but it aligns the descriptor with `@property`'s `syntax` vocabulary and drops the misleading `type` name, and it is the change kf's clean-consume wants.

**Two honest cuts, pick one:**

| Option | Cut | Contents | Cost |
|---|---|---|---|
| **Split** | 1.3.0 (grammar fix, keep `type`/`defaultValue` names) → later 2.0.0 (rename) | (A) ships as a minor; kf's shim SIMPLIFIES (name-glue + default-on-type recovery both die) but is not fully deletable until (B); (B) deferred | two dispatches; kf touched twice; `VJS_PARAM_BUG_MAX` lingers until 2.0.0 |
| **Bundle** (pass-1 §11 head, endorsed) | 2.0.0 (grammar fix + rename, co-shipped with the gamut-policy α=1.0 change) | (A)+(B) land together; kf deletes `normalizeParam` **fully** in one re-pin `^2.0.0`; one relay letter | one clean major; the keyframes-2.2.0 semver-honesty lesson honored |

**Recommendation: BUNDLE (2.0.0).** The rename (B) is already a hard major and the gamut-policy change (seed-1 lane) *also* alters observable output — semver honesty says **one clean major, not two euphemistic minors dragging a lingering shim**. Splitting buys nothing: it forces kf to consume twice and keeps `VJS_PARAM_BUG_MAX` alive across a 1.3.0 that still can't delete the shim (the shim's name-glue death needs (A), but its full deletion needs (B) too). The only argument for Split is if the gamut-policy 2.0.0 slips and the grammar fix is wanted sooner — a scheduling contingency, not a design preference. **Table for R.W1 ratification: bundle (A)+(B) into 2.0.0; strike the §8 record-as-canonical fallback; the §11-Q5 taste-question is retired (defect fix); Q6 answered = one 2.0.0.**

---

## 8. R.W1 re-spec — precise edits for SPEC-v2

1. **§3.1 R.W1 / §8 KF-1 row**: replace "field rename" with **"grammar-fix + field-rename"**. The grammar fix = `parseFunctionParameters` whitespace-split + single-top-level-colon default (`stylesheet.ts:637-706`, prototyped here) **and** the mirror serializer fix (`serialize.ts:132-140`). Add the spec-form vector `--x <length>: 0px → {name:"--x", syntax:"<length>", default:"0px"}` to the gate.
   - **Rename-sweep note (CORRECTED at head, M3):** the public type `CustomFunctionParameter` is re-exported from **two** barrels — `src/index.ts` (root) **and** `src/subpaths/parsing.ts:40` (the `@mkbabb/value.js/parsing` subpath) — so the `type→syntax` / `defaultValue→default` rename spans both. At head the sweep must ALSO update **`test/parsing-extract-functions.test.ts:36`** (`.type` read on the buggy-canon input `--x: <number>`; absent at the `15b0382` worktree base, which is why the prototype's suite showed no consumer — see §4). Under the corrected grammar that input parses to `{name:"--x", default:"<number>"}`, so the assertion becomes `.default === "<number>"` (or correct the input to the spec form `--x <number>` and assert `.syntax`).
2. **Strike the §8 fallback** ("RECORD `{type,defaultValue}` canonical … permanent-by-contract"). It canonizes garbage.
3. ~~**Add the R.W1 sub-item** from §6 above: restore `extractFunctions` to source + barrel + assert in published `.d.ts` (dist-only today; a fresh build drops it).~~ — **STRUCK (M1):** `extractFunctions` is in source since 1.1.0 (`src/parsing/extract.ts:124`, `src/index.ts:291`, `src/subpaths/parsing.ts:47`) and a fresh build keeps it. There is nothing to restore. See the struck §6.
4. **§11**: mark Q5 RESOLVED (defect fix, not taste); Q6 answered = bundle into 2.0.0 (§7 above).
5. **kf S7 completion** (post-publish, kf-owned): delete `normalizeParam` + `NormalizedParam` + `VJS_PARAM_BUG_MAX`; simplify `coerceArg`'s 1.2.0-bug arm; re-pin `^2.0.0`; read `.name`/`.syntax`/`.default` directly.

## 9. Files touched (worktree only)

- `src/parsing/stylesheet.ts` — type `:44-48`; `topLevelColonIndex` + rewritten `parseFunctionParameters` `:637-706`.
- `src/parsing/serialize.ts` — `serializeFunction` param emit `:132-140`.
- `test/grammar-2026-atrules.test.ts` — O.W4-S7 block rewritten off the buggy canon (+6 adversarial vectors).
- `test/round-trip.test.ts` — comparison helper re-keyed `:124-126`.

Diff: 4 files, +141 / -30. **At head `e80b359` (re-measured, L2-kf1-reverify)**: patched full suite **1939 passed / 1 FAILED / 1940 (51 files)** — the sole failure is the rename-sweep gap at `test/parsing-extract-functions.test.ts:36` (§4/§8-item-1), NOT this diff; a complete R.W1 fix adds that one-line test sweep (a 5th file). `tsc -p tsconfig.lib.json` exit 0. (The old "1877/1877" was the stale `15b0382`/1.0.2 base — 46 files.)
