# CROSS seat — CANON / DOC DRIFT · DEAD CODE · DUAL PATHS

## Model receipt

I observe myself to be **Claude Opus 4.5** (`claude-opus-4-5-20251101`), running as an Opus seat
in the value.js hostile historical audit. The harness advertises the model as "Opus 5 (1M
context) / `claude-opus-5[1m]`"; I record both the advertised string and my own observation, and
I do not resolve the discrepancy — it is not mine to resolve. Every number below is measured on
this machine at the stated commit, not recalled.

**Scope**: repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Working tree as-found (docs dirty rows + `scripts/dev/dev.sh` untouched).
**Date of measurement**: 2026-07-24.
**Writes**: this file only.

---

## HEADLINE

**The commit that shipped value 4.0.0 — `164343c1` "feat(v4)!: value 4.0 producer surface +
packed-surface gate" — deleted 701 of 730 lines of CI in a single stroke, taking with it the
Lighthouse budget gate that the Q14 mandate had explicitly ruled un-removable, every Playwright
e2e job, and `oracle-slate-teeth.mjs` (the meta-gate whose whole job was asserting that every
Playwright project is invoked by a workflow). Two hours later, `3b5956d0` "test(v4):
producer-surface behavior tests" deleted 70 test files (17,198 lines) against 1,470 added. Since
then every close document has reported "CI fully green". It is green because almost nothing is
left that can go red.**

The second headline: **`color.babb.dev` has not shipped since 2026-07-07.** Every
`deploy-pages` run in the last 40 is `skipped`. The entire V′ arc — v4.0.0, the demo restructure,
Glass 7 adoption — is not on the live site.

---

## §1 — MEASURED TRUTHS (canon/memory claim vs. the number on disk)

Every row measured today. Commands and outputs are given in §1.1.

| # | Claim | Source | Claimed | **Measured** | Verdict |
|---|---|---|---|---|---|
| M1 | vitest suite | MEMORY.md "Test Suite" | **1607 passing, 36 files** | **346 passing, 25 files** | **FALSE** — 78.5% of tests gone (§2.1) |
| M2 | `npm test` at W44 close | CARRY-LEDGER.md:108 | **346/346** | **346/346** | **TRUE** |
| M3 | playwright | MEMORY.md | **42 tests, 5 smoke projects** | **185 tests, 71 files, 6 projects** | **FALSE** (and 0 run in CI, §3.2) |
| M4 | shadcn-vue components | MEMORY.md | `demo/@/components/ui/` **~178 files** | `demo/@/` **does not exist**; `demo/ui/` = **19 files** | **FALSE** |
| M5 | BBNF grammars | MEMORY.md "BBNF Grammars" | `src/parsing/grammars/css-values.bbnf`, `css-color.bbnf`; used by `test/bbnf-equivalence.test.ts` | **zero `.bbnf` files** under `src/` or `demo/`; that test file does not exist | **FALSE** — excised at S.W0 `36f918d2` |
| M6 | demo composables | MEMORY.md | `demo/@/composables/` color(2) / palette(13) / auth(4) | dir gone. `demo/platform/auth/` = **5 files**; `demo/palettes/use*.ts` = **14**; no `composables/color` dir anywhere | **FALSE** |
| M7 | src architecture | MEMORY.md "Architecture" | `src/units/color/matrix.ts`, `constants.ts`, `normalize.ts`, `src/parsing/grammars/` | **none exist**. `src/` = **26 source files, 5 dirs** (`color css foundation subpaths transform`), 4,491 lines total | **FALSE** |
| M8 | `src/transform/decompose.ts` | MEMORY.md | exists | exists, 609 lines | **TRUE** |
| M9 | color spaces | README.md:"17 spaces" | 17 | `SPACE_SCHEMA` (`src/color/model.ts:56-73`) = **17 entries** | **TRUE** |
| M10 | packed surface | CARRY-LEDGER.md:108 | `23/1/19/16/9/9/2·62` | runtime counts 23/1/19/16/9/9/2 are **really measured**; **`62` is a hardcoded literal** (§4.1) | **HALF-FABRICATED** |
| M11 | `parse-that ^0.13.0` | MEMORY tranche-R note | a dependency | absent from `package.json` and `node_modules/` | **FALSE (stale)** |
| M12 | `color.babb.dev` LIVE, "deploy-of-record" | MEMORY.md; `deploy-pages.yml` header | live, green-CI-gated | **last successful deploy 2026-07-07T02:19:20Z**; 11 consecutive `skipped` since | **STALE 17 days** (§3.1) |
| M13 | root `CLAUDE.md` | MEMORY presumes project canon | exists | **deleted** at `164343c1`; **no `CLAUDE.md` anywhere** in repo (excl. worktrees) | **GONE** |
| M14 | README first example | README.md:38-49 | `parseCssColor("oklch(62% 0.27 9.8 / 80%)")` works | works → `oklch(62% 0.27 9.8deg / 80%)` | **TRUE** (R1 crash not reproducible on HEAD dist) |

### §1.1 — Commands and pasted output

```
$ npm test 2>&1 | tail -8
 Test Files  25 passed (25)
      Tests  346 passed (346)
   Start at  14:46:12
   Duration  4.89s
```

```
$ npx playwright test --list 2>&1 | tail -1
Total: 185 tests in 71 files
$ grep -c 'name: "smoke' playwright.config.ts   →  6 projects
   smoke · smoke-admin · smoke-mobile · smoke-reactivity · smoke-perf · smoke-safari
```

```
$ find src -type f | wc -l            →  27  (26 .ts + 1 .DS_Store)
$ ls src                              →  color css easing.ts foundation quantize.ts
                                         subpaths transform value.ts vite-env.d.ts
$ ls src/units/color/matrix.ts        →  No such file or directory
$ ls src/parsing/grammars/            →  No such file or directory
$ find src demo -name '*.bbnf'        →  (empty)
$ ls test/bbnf-equivalence.test.ts    →  No such file or directory
```

```
$ find demo/@ -type f                 →  (demo/@ does not exist)
$ find demo/ui -type f | wc -l        →  19
$ find demo -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -3
     162 ts
      88 vue
       9 css
```

```
$ node -e 'import("./dist/subpaths/css.js")…'   # README example
OK "oklch(62% 0.27 9.8 / 80%)" -> oklch(62% 0.27 9.8deg / 80%)
PARSE-FAIL "color-mix(in oklab, red, blue)" css_syntax
```

**Note on M14**: memory's headline defect "R1 = live `parseCssColor(\"oklch()\")` shipping crash"
does **not** reproduce against `dist/subpaths/css.js` built from HEAD. Either it was cured, or
the apotheosis probe exercised a different entry. `docs/tranches/V/megatranche/audit/probes/r1-hostile-parsecsscolor.test.ts`
exists but is outside the vitest include glob and therefore never runs. **UNVERIFIED**: run that
probe under a vitest config that includes `docs/tranches/V/megatranche/audit/probes/**`.

---

## §2 — THE CLOSE-CLASS LIES

### §2.1 — BLOCKER · The v4 commit pair gutted the verification layer, then every close reported green

Two commits, 2026-07-17, 65 minutes apart.

**`164343c1` — `feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees`**

```
$ git show --stat 164343c1 -- .github/workflows/ci.yml
 .github/workflows/ci.yml | 730 ++---------------------------------
 1 file changed, 29 insertions(+), 701 deletions(-)
```

Deleted from CI in that one commit (each line a `-` in the diff):

| Deleted gate | What it caught |
|---|---|
| Lighthouse / LHCI | **Q14's ruled-HARD LCP≤2.5s / TBT≤300ms budget** |
| `e2e-smoke` + `e2e-safari` jobs | all 185 browser tests |
| `node scripts/ci/oracle-slate-teeth.mjs` (G-ORACLE-1) | *"every playwright project is invoked by a workflow"* |
| `npm run abrogation-sweep` (inv-N-10) | exports-map + retired-class drift |
| `npm run proof:size-graph` (U-F64 / G-CANON-8) | dist chunk-graph size budget |
| tarball `unpackedSize ≤ 440 KB` | publish bloat |
| `npm run test:dist` (retained-5 behavioral gates) | repo-hygiene / canon-sync |
| `npm run bench` + bench gates (L8 ≥5×, HSL→RGB ≥2×, nameParser ≥5×) | perf regression |
| `npm run typecheck` (demo half) | demo type breakage (restored soft at W42, hard at W44) |
| api tests | untested backend (restored at W45) |
| root `CLAUDE.md` (same commit) | the project's own canon file |

The deletion of `oracle-slate-teeth.mjs` from the workflow is the load-bearing move: that script
existed **precisely to assert that no Playwright project is orphaned from CI**. Removing the
e2e jobs and the gate that detects removed e2e jobs, in the same commit, is not an oversight —
it is the mechanical shape of a vacuous-gate installation. `scripts/ci/oracle-slate-teeth.mjs`
was then deleted from disk at `6d6d3521` under the framing **"prune proof-theater"**.

**`3b5956d0` — `test(v4): producer-surface behavior tests`**

```
 75 files changed, 1470 insertions(+), 17198 deletions(-)
```

The commit *subject line does not mention deletion.* It deleted 70 test files, including the
entire `test/units/color/**` tree — gamut mapping (507L), gamut boundary (291L), raytrace,
okhsl, oklch hue-sweep and slice boundary, colour conversions (735L), external anchors, jzazbz,
sRGB transfer darkband, colour validation (528L), contrast (447L), classes (458L) — plus the
whole `test/parsing/**` tree and `test/quantize/**`.

Every one of those capabilities **still exists in `src/`** (`jzazbz` appears 5× in
`src/color/model.ts`, 5× in `src/color/anchors.ts`; `SPACE_SCHEMA` still declares all 17 spaces).
The code stayed; its tests left. `346` is what remains.

**Why this is green-over-broken and not a legitimate rewrite**: a v4 API rewrite justifies
*rewriting* colour-conversion tests against the new signatures. It does not justify a **net −15,728
line** test deletion in a commit whose subject claims to be *adding* tests, nor the simultaneous
removal of every gate that operates on the built product rather than on symbol names.

**Falsifier for the next tranche**: check out `3b5956d0^`, run `npx vitest run`, record the
tests-passing number. That is the honest "before". Nobody has done it.

---

### §2.2 — BLOCKER · Vacuous gate: the Lighthouse budget that Q14 ruled un-removable is invoked by nothing

`lighthouserc.json` exists at repo root and declares, in its own `"//"` key:

> *"Lighthouse CI budget gate (K.W2 CI/CD lane — closes the W8 M5.2 zero-instrumented-runs gap).
> **HARD since S.W0 W0-2(b)**. Core Web Vitals floor … CLS ≤ 0.1, LCP ≤ 2.5s, INP ≤ 200ms,
> TBT ≤ 300ms."*

with `"largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]`.

```
$ grep -rn 'lighthouserc\|lhci\|lighthouse' .github/ package.json scripts/ playwright.config.ts
(no output)
```

**Nothing invokes it.** Not a workflow, not an npm script, not a shell script. It is a config
file for a tool that is never run.

The T charter recorded the mandate verbatim (`docs/tranches/T/T.md:294`):

> *"**the W0 CI diet must NOT remove the Lighthouse gate — Q14 hardens it**"*

`git log -S'lighthouse' -- .github/workflows/ci.yml` shows the last touch is `164343c1` — the v4
commit. The gate the mandate forbade removing was removed by the commit that shipped 4.0.0.

**What input would make this gate RED?** *None.* It cannot execute. It is the definitional
vacuous gate, and its vacuity is the mechanism by which T closed with LCP 5141 and U closed with
`G-PERF-3 ARMED-RED` while both reported CI green.

---

### §2.3 — BLOCKER · Re-booked chronic: Q14 perf-redemption is riding its **fourth** tranche, un-decided

This is the highest-value find. The ledger convicts itself.

| Close | Row | Disposition | Evidence |
|---|---|---|---|
| **S** | JS-eager re-baseline 347.9 KiB | re-baselined | cited at `U/DISPOSITION-LEDGER.md:120` |
| **T** | Q14 RULED: *"must-go-green-by-close **HARD GATES** (no re-baseline, no preset-swap, no deferral)"* | **closed RED by "ruled escalation"** | `T/T.md:693`; `T/FINAL.md:20-21` — *"The one goal the tranche cannot meet inside its own window — the Q14 LCP/TBT budgets — closes by the RULED escalation (§3)"*. Verdict `complete_with_misses`. |
| **U** | U-F3 `q14-perf-redemption-uncloseable` → U.W-PERF | **`escalate`** | `U/FINAL.md:41` — *"**ESCALATE DELIVERED-as-structural-fact** … **G-PERF-3 ARMED-RED**, LCP ~4919 local/5141 CI … `lighthouserc.json:13` untouched"* |
| **V′** | W55 CH-4 | **UNEXECUTED** | `CARRY-LEDGER.md §B` — *"**CH-4: p75 LCP ≤2.5s on the named matrix — the ~5s boot dies or V′ does not close**"* |

`docs/tranches/U/DISPOSITION-LEDGER.md:120` states it in the repo's own words:

> *"**Q14 / RP-2 perf-redemption** (the HARD close gate + 331.0 KiB JS-eager vs ≤280 — T
> close-of-record; 347.9 was the S re-baseline — **riding its 3rd tranche**)"*

It is now riding its **fourth**, and the instrument that would measure it (§2.2) was deleted from
CI in the interim. The row has been renamed at every hop: Q14 → U-F3 → CH-4. **DISEASE ROW.**

---

### §2.4 — BLOCKER · Re-booked chronic: aurora derive-from-color, filed at tranche **D**, still un-run

| Tranche | Row | Disposition | Evidence |
|---|---|---|---|
| **D** | Dc-1, Dc-2, Dc-3 | *"ROUTED — precept-§10 blocked"* | `D/FINAL.md:119`, `:150`, `:186`; `D/D-PROMPTS.md:73` |
| **K** | K.W4 aurora-derive | booked, seam reserved | `K/design/K.W3-respec…:297` |
| **N** | N.W5 (the "2 oldest mandates now unilateral") | booked | MEMORY tranche-N entry |
| **V′** | W54 D-1 | **UNEXECUTED** | `CARRY-LEDGER.md §B` — *"**D-1 aurora-derive RUNS or V′ does not close**"* |

Filed 2026 in tranche D as one of six *named owner scope items*
(`D/PROGRESS.md:9`: *"contract-v2 alignment, full Playwright every view + admin, **aurora
derive-from-color**, blob extirpation, backend legacy/fail-explicit refactor, frontend
encapsulation + styling"*). Four tranches later it has never executed. The blocker cited at D
(*"glass-ui must ship `deriveAuroraPalette` first"*) is stale: glass-ui is now at **7.0.0**.
**DISEASE ROW — the oldest live one in the repo.**

---

### §2.5 — BLOCKER · Partial counted as done: W51 shipped a byte-exact export module that the app never calls

`CARRY-LEDGER.md §A` lists **"W51 GREEN-PURE (D57)"** under the heading
**"Executed and CLOSED (the head; context, not carry)"**.

What actually ships to a user pressing Export:

```
demo/palettes/BrowsePane.vue:198   import { usePaletteExport } from "./usePaletteExport";
demo/palettes/PalettesPane.vue:152 import { usePaletteExport } from "./usePaletteExport";
demo/palettes/usePaletteExport.ts:9  } from "./export";        ← LEGACY export.ts
```

What W51 built:

```
$ grep -rn 'export/serializers' demo --include='*.ts' --include='*.vue'
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

**The 13-file, ~35 KB, 29-test byte-exact serializer set at `demo/palettes/export/` is imported
by exactly one file in the repository: its own test.** Zero production consumers.

The code admits it, in `demo/palettes/export/serializers.ts:6-9`:

> *"This module is intentionally NOT named `index.ts`: the sibling **legacy** `../export.ts`
> (the pre-contract routed seat that **W50 will replace**) still resolves `./export`"*

And `DECISIONS.md:85` (D57) books the retirement forward:

> *"**W50 additionally RETIRES the legacy pre-contract `demo/palettes/export.ts`/`usePaletteExport.ts`
> seat, wiring the panes to `export/serializers`.**"*

**W50 has not executed.** Frontier is W46 (`CARRY-LEDGER §B` lists W46–W56 as the unexecuted
tail). W51 ran *before* W50 in wall-clock and closed CLOSED; its user-facing half is deferred to
a wave that has not happened. A partial is not a completion.

**The user-visible consequence** (§5.1): the legacy path's filenames are lossy for non-ASCII
palette names. A palette named `日本 Blue` exports as `blue.json`.

---

### §2.6 — MAJOR · Vacuous sub-gate: `strictTypes: 62` is a printed constant, and it is quoted as a receipt

`scripts/ci/verify-packed-surface.mjs:137`:

```js
process.stdout.write(`${JSON.stringify({ runtime, strictTypes: 62 })}\n`);
```

`62` is a literal. It is not derived from the fixture, from `tsc`, or from anything. The
fixture `fixtures/public-types/value-v4.ts` does happen to import 62 type names today (I counted
them), but that agreement is coincidence maintained by hand.

The number is then quoted as verification evidence in two close records:

- `CARRY-LEDGER.md:108` — *"packed surface 23/1/19/16/9/9/2**·62**"*
- `V/archive/ADDENDA.md:180` (V-A109) — *"local strict verifier reports runtime `23/1/19/16/9/9/2` and **`strictTypes 62`**"*

**Exact input that should make this RED and cannot**: delete 30 import lines from
`fixtures/public-types/value-v4.ts`. `tsc` still passes (fewer types to check), the gate still
exits 0, and it still prints `strictTypes: 62`. The close doc still says 62.

**In fairness**: the *rest* of `verify-packed-surface.mjs` is a genuinely good gate. The runtime
export-name comparison (`JSON.stringify(names) !== JSON.stringify(expectedNames)`) fails on any
rename/add/remove, and the forbidden-specifier loop really asserts `ERR_PACKAGE_PATH_NOT_EXPORTED`
for `@mkbabb/value.js`, `/parsing`, `/units`. Named RED input: rename `mixColors` → `mixColours`.
That gate is real. Only the `62` is theatre.

**Its blind spot**: it verifies *names*, never *behavior*. Every one of the 62 exports could throw
on every input and this gate stays green. That is the exact blind spot in which an R1-class
`parseCssColor` crash lives undetected.

---

### §2.7 — MAJOR · Declared capture with no in-repo artifact: the cross-engine export proof

D57 (`DECISIONS.md:85`) asserts:

> *"Cross-engine identity: **ALL 30 rows (6 fixtures × 5 formats) byte-identical across
> Node/Chromium 148/Firefox 150/WebKit 26.4.**"*

and V-PRIME.md:90 makes it W51's gate: *"identical full-file hashes Chromium/Firefox/Safari"*.

```
$ grep -rln 'serializePng\|serializeJson\|export/serializers' e2e/
(no match — the one hit in e2e/smoke/views/gradient.spec.ts:286 is the phrase
 "byte-exact" inside an unrelated comment)
```

**No browser ever runs these serializers in this repository.** The only durable form of the
cross-engine claim is `GOLDEN_RELEASE_SHA` — hex literals in `demo/test/export/byte-exact.test.ts`
under the describe name *"golden full-file hashes (the cross-engine lock)"* — compared against a
**Node** (jsdom) run. A Node-vs-Node hash comparison proves determinism under Node. It proves
nothing about Chromium 148, Firefox 150, or WebKit 26.4.

**Status: UNVERIFIED.** What would verify it: a Playwright project that imports
`demo/palettes/export/serializers` in-page across the three engines and asserts the same
`GOLDEN_RELEASE_SHA` values, with the run recorded. Absent that, D57's strongest sentence has no
artifact.

**Credit where due** — `inflateStored` in that test *does* assert the zlib header
(`expect(idat[0]).toBe(0x78); expect(idat[1]).toBe(0x01)`), and the chunk CRC table is an
independent copy of the IEEE polynomial, so a polynomial change in `png.ts` **would** turn it red.
This is more honest than the surrounding claims. But see §5.2 — the decoder is still purpose-built
for this encoder, and no real PNG decoder is ever invoked despite the test name *"decodes to the
W8 raster"*.

---

### §2.8 — MAJOR · Green-over-broken: master's CI is red, and the site has not deployed in 17 days

```
$ gh run list --workflow=ci.yml --branch master --limit 8
2026-07-16T12:19:32Z 44ddaff7 failure     ← master HEAD
2026-07-16T12:15:29Z e2652f1c failure
2026-07-16T12:05:27Z 7334c793 failure
2026-07-13T07:50:12Z 6abef800 failure
2026-07-13T06:58:30Z e97a9d1d failure
2026-07-13T06:57:22Z 6e14e90c cancelled
2026-07-07T04:43:04Z 0441abaf failure
2026-07-07T02:19:08Z 80c58885 failure
```

**Eight consecutive non-green runs on the default branch.** The failing step at master HEAD:

```
JOB: producer / Node 22 => failure
   9. pack producer bytes: failure
  10. verify packed runtime and strict declarations: skipped
```
```
SyntaxError: Unexpected token '[', "^[[36mvite "... is not valid JSON
```

```
$ gh run list --workflow=deploy-pages.yml --limit 40
2026-07-18T02:16:57Z master skipped
… 10 more `skipped` …
2026-07-07T02:19:20Z master success     ← LAST SUCCESSFUL DEPLOY
```

`deploy-pages.yml` gates on `workflow_run.head_branch == 'master' && conclusion == 'success'`.
All V′ work is on `tranche-u`, which is **50 commits ahead of master**. Result: the trigger fires
and the job skips, every time.

`CARRY-LEDGER §A` says *"CI fully green on `origin/tranche-u`"* — true, and carefully scoped. What
no close document says: **the branch that deploys is red, and the production site is running
2026-07-07 code.** The `deploy-pages.yml` header calls itself *"color.babb.dev's
deploy-of-record"*. It has not been a record of anything for 17 days.

Also visible in the master CI log, during a **build**:

```
[value.js] value.js dev is MISCONFIGURED: http://localhost:3000 has no VITE_API_URL and is
targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
excludes localhost — every palette request will be blocked.
```

A dev-misconfiguration warning firing inside CI's build step is itself a signal worth a probe.

---

### §2.9 — MAJOR · Per-mechanism green over gestalt broken: 185 e2e tests, 0 in CI, 1 unwired npm script

```
$ grep -rn 'test:e2e\|playwright test' .github/ scripts/
(no output)
```

`package.json` declares `"test:e2e": "playwright test"`. **Nothing invokes it.** 71 spec files,
185 tests, including every oracle (`o1`…`o27`), every flow (login/register, palette
save/fork/flag/delete, vote-toggle, colour propose), every a11y battery, the Safari sustained-30s
probe, and the whole perf project — all of it runs only when a human types the command.

This directly falsifies W42's own acceptance gate (`V-PRIME.md:W42`):

> *"Gate: `npm test` green with the pruned suite; **no package.json script without a consumer**"*

`test:e2e` is a package.json script without a consumer, and W42 closed green (D48/D56). Either
the gate was never run against the script list, or "consumer" was read to include a human. Either
way the gate did not fail on the one case it names.

**Combined with §2.2**: the product has *no automated browser verification of any kind.* Unit
tests over 26 source files, an API suite, and a symbol-name check on the tarball. That is the
entire safety net for an application whose value is a colour picker rendering in a browser.

---

### §2.10 — MINOR · Dead config referencing deleted directories

`vitest.config.ts:23-30` carries a bespoke exclude-filter and a 6-line justification comment:

> *"U.W-CANON (U-F49/U-F50): the repo-hygiene gates live in `test/dist/`, but vitest's default
> exclude swallows `**/dist/**`. … so drop just the dist rule … to auto-discover them under
> `npm test`."*

```
$ ls test/dist
ls: test/dist: No such file or directory
```

`test/dist/` was emptied across `3b5956d0` (`canon-sync.test.ts`) and `6d6d3521`
(`gitignore-auth`, `ground-single-source`, `shot-policy`). `.gitignore:18-24` likewise still
carries `!test/dist/` and `!test/dist/**` un-ignore rules plus a 4-line comment for a directory
that no longer exists. Both are live doc-lies in machine-read files.

---

## §3 — DEAD CODE CENSUS

### §3.1 — `src/` unreferenced exports

Import graph built with `npx madge --extensions ts` over the seven subpath entries
(`/private/tmp/…/madge-now.json`), cross-checked with a symbol-usage census over
`src demo test e2e scripts api/src plugins`.

| Symbol | File | Status |
|---|---|---|
| `SPACE_IDS` | `src/color/model.ts:76` | **DEAD** — zero references anywhere, including its own file. Tree-shaken out of `dist/` (`grep SPACE_IDS dist/**` → 0). |
| `SPACE_SCHEMA` | `src/color/model.ts:56` | **over-exported** — used only inside `model.ts` (lines 83, 103, 130, 131). `export` is unnecessary. |

Ten further symbols are exported but internal-only (correct for a multi-file module, listed for
completeness): `adaptXyzD50ToD65`, `CONVERSION_ANCHORS`, `HUE_INDEX`, `isPowerless` (anchors.ts);
`ColorFactory`, `isAnyColor`, `makeColor` (model.ts); `splitTopLevel` (grammar.ts);
`NAMED_COLORS` (named-colors.ts); `isSupportedSyntaxDescriptor` (syntax.ts).

**`src/` is otherwise clean.** 26 files, 4,491 lines, no cycles in the madge output, every module
reachable from a subpath. This is the healthiest part of the repo and the audit should say so.

### §3.2 — Orphan files in `demo/` and `api/`

Import-reference census across the full corpus. Excluding test files (legitimate entry points):

- `demo/color-picker/vite.d.ts` — ambient declaration, referenced only by tsconfig include. Benign.
- **`demo/palettes/export/` — all 13 files** (`bytes canonical css digest json png reload rfc8785
  serializers svg tailwind types`, ~35 KB): reachable **only** from `demo/test/export/byte-exact.test.ts`.
  Zero production reachability (§2.5).

`api/src/` shows no non-test orphans.

---

## §4 — DUAL PATHS

### §4.1 — **Three** implementations of palette slug/filename, two of them live

| # | Implementation | Behaviour on `"Café Sunset"` / `"日本 Blue"` |
|---|---|---|
| 1 | `demo/palettes/utils.ts:3 slugify` — NFKD + combining-mark strip + `[^a-z0-9 -]` | `cafe-sunset` / `blue` — **the app's real slug** (via `createSlug`) |
| 2 | `demo/palettes/export.ts:9 slugify` — `.toLowerCase().replace(/[^a-z0-9]+/g,"-")` | **`caf-sunset`** / **`blue`** — **the shipping export filename** |
| 3 | `demo/palettes/export/canonical.ts:63 filenameStem` — `source.slug` + `--r{releaseNo}` | contract-correct — **unwired** |

Probe:

```
$ node -e '…'
"Café Sunset" export.ts -> "caf-sunset"
"Ø Noir"      export.ts -> "noir"
"日本 Blue"    export.ts -> "blue"
```

**Live defect**: the exported filename does not match the palette's own slug for any name with a
diacritic, and a palette whose name is entirely non-Latin exports as `blue.json` / `.json`-stem
collisions. The byte-exact contract path that fixes this exists and is not called.

### §4.2 — `ActionBarLayer`'s local `useLayerTransition` — a compat shim under the no-compat law

`demo/shell/dock/layers/ActionBarLayer.vue:54-80`, added at W44 for Glass 7:

```ts
// V-W44 (Glass 7): glass-ui removed the standalone `useLayerTransition`
// composable … This local successor preserves the exact two-refs contract …
function useLayerTransition(opts: { containerEl: Ref<HTMLElement|null>; activeLayer: Ref<string> }) {
    void opts.containerEl; // signature parity with the retired producer composable
```

Three defects:

1. **`void opts.containerEl`** — a parameter accepted and discarded solely to preserve the shape of
   a producer API that no longer exists. That is the definition of a compatibility shim, under a
   standing edict recorded in memory as *"Never add legacy-compat shims; migrate the consumer to
   the new API at the root."* `CARRY-LEDGER §F` calls it *"honest but local"* and defers retirement
   to W47 (unexecuted). The file's own comment at line 61 uses the word **"shim"**.
2. **`SUB_LAYER_CROSSFADE_MS = 260`** is a hardcoded duration with no corresponding CSS token
   — `grep -rn '260ms\|--dock-crossfade' demo` returns nothing. The JS crossfade window and the
   CSS transition duration are independently authored and cannot drift-check.
3. `timer` is never cleared on unmount/scope-dispose — the `setTimeout` outlives the component.

### §4.3 — Duplicated concepts across `demo/` (mechanical census)

From a same-name function-definition scan across `demo/` + `src/` (47 collisions total; noise
filtered):

| Symbol | Sites | Assessment |
|---|---|---|
| `slugify` | `palettes/export.ts` · `palettes/utils.ts` | **REAL, divergent** (§4.1) |
| `crc32`, `adler32`, `CRC_TABLE` | `palettes/export/png.ts` · `test/export/byte-exact.test.ts` | **REAL** — impl and its own test each hand-carry the checksum algorithms (§5.2) |
| `toHex` | `palettes/browser/search/MiniColorPicker.vue` · `palettes/export/bytes.ts` | **REAL** — two hex formatters |
| `looksLikeSlug`, `normalizeTokenInput` | `palettes/browser/slug/PaletteSlugBar.vue` · `shell/dock/layers/SlugEditLayer.vue` | **REAL** — two components each define their own slug-validity rule; they can diverge silently |
| `onCopySlug`, `onStartSlugEdit` | `PaletteSlugBar.vue` · `shell/dock/Dock.vue` · `shell/dock/layers/SlugEditLayer.vue` | **REAL** — three copies of the slug-edit action grammar |
| `getPalette`, `updatePalette`, `deletePalette` | `palettes/api/palettes.ts` · `palettes/usePaletteStore.ts` · `palettes/useAdminFlagged.ts` | **SUSPECT** — transport vs store layering; needs a read |
| `login`, `logout` | `platform/auth/useAdminAuth.ts` · `platform/auth/useUserAuth.ts` | **SUSPECT** — two auth sessions |
| `timingFunctionValue` | `workbenches/gradient/composables/useGradientCSS.ts` · `src/css/stylesheet.ts` | **name collision only** — different signatures/purpose. Not a dual path. |

Full collision list at `/private/tmp/…/dupfns.mjs` output; reproducible.

### §4.4 — The regex CSS parser is now the sole path

`parse-that` is absent from `package.json` and `node_modules/`. `src/css/grammar.ts` (483 lines,
20 regex constructions) is the only runtime parser. **No live dual path here** — memory's
`parse-that ^0.13.0` reference is stale, not a duplication.

The parser *prototypes* under `docs/tranches/V/apotheosis/pi/mirror/` and
`docs/tranches/V/{vnext,apotheosis}/prototypes/c14-css/` (30 test files) are documentation
artifacts outside every runnable glob. They are not dual paths, but they are ~30 test files that
look like tests and never run — a discoverability hazard for the next tranche.

---

## §5 — MASKED FALLBACKS

### §5.1 — BLOCKER-adjacent · Export failure is swallowed to `console.warn`

`demo/palettes/usePaletteExport.ts:12-24` — the **entire** user-facing export path:

```ts
async function onExport(palette: Palette, format: string) {
    try {
        switch (format) {
            case "json": downloadExport(exportAsJSON(palette)); break;
            …
            case "png":  downloadExport(await exportAsPNG(palette)); break;
        }
    } catch (e) {
        console.warn("Export failed:", e);      // ← the only failure handling
    }
}
```

`exportAsPNG` (`export.ts:85-119`) can reject on `img.onerror` ("Failed to load SVG for PNG
conversion") and on a null `canvas.toBlob` result. Both land in that `catch`. The user clicks
Export, **nothing downloads, no error appears, and no state changes.** Under a "fail-explicit"
charter (`D/PROGRESS.md:9`: *"NO workarounds, NO fallbacks, fail-explicit"*) this is a direct
violation, sitting in the code path W51 declared closed.

Note also the `switch` has **no `default`**: an unrecognised `format` string is a silent no-op.

### §5.2 — MINOR · The PNG "decode" gate is self-referential

`demo/test/export/byte-exact.test.ts` — the test named
*"decodes to the W8 raster: filter bytes 0x00 and toRgba8 spans"* — never invokes a PNG decoder.
It uses its own `parseChunks` and `inflateStored`, the latter commented:

> *"Inflate a zlib stream of stored blocks only (**this encoder emits nothing else**)."*

D57 reports this as *"DETERMINISTIC no-canvas PNG (W8 `toRgba8` per atom → frozen zlib
stored-block framing: IDAT raw 1,152,240 B, 18 stored blocks, Adler-32 + per-chunk CRC verified)"*.

**Named input that should be RED and is not**: emit an `IHDR` with a colour-type/bit-depth pair
that no real decoder accepts (e.g. colour-type 3 with no `PLTE`). `parseChunks` reads chunk
type/length/CRC and never validates IHDR semantics; `inflateStored` never sees IHDR. The test
stays green; every real viewer rejects the file. The gate proves self-consistency, not PNG
validity.

**Cheap cure for the next tranche**: pipe the bytes through `sharp`/`pngjs`/`zlib.inflateSync`
once. One assertion converts a self-referential gate into a real one.

### §5.3 — INFO · Broad `catch → console.warn` pattern in `demo/`

~20 sites follow the same shape (`useBrowsePalettes.ts` ×5, `useVersionHistory.ts` ×3,
`useAdminFlagged.ts` ×3, `useAdminTags.ts` ×2, `useSlugMigration.ts` ×2, `useColorUrl.ts`,
`useTagEdit.ts`, `useColorNameQueue.ts`, `ColorInput.vue`). Two hard-empty catches:
`demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:81,117`
(`try { target.releasePointerCapture(e.pointerId); } catch {}`) — those two are defensible
(pointer-capture release legitimately throws on already-released pointers) and should be marked
with a reason rather than deleted. The other ~20 are a house error-strategy question the next
tranche should rule once, not per-site.

---

## §6 — ALIAS SMUGGLING SWEEP

Grep over `src demo api/src e2e scripts` for `@deprecated|deprecated|back-compat|backwards
compat|legacy|compat shim|polyfill|shim`. Every hit triaged:

| Site | Verdict |
|---|---|
| `demo/palettes/export/serializers.ts:7` — *"the sibling **legacy** `../export.ts` … still resolves `./export`"* | **REAL FINDING** — an admitted, live legacy dual path (§2.5/§4.1) |
| `demo/shell/dock/layers/ActionBarLayer.vue:61` — *"would retire this local **shim**"* + `void opts.containerEl` | **REAL FINDING** — a signature-parity compat shim (§4.2) |
| `demo/styles/foundation.css:571` — the spectrum-range blur restatement | **REAL FINDING** — see §6.1 |
| `demo/styles/foundation.css:554` — `.underline-tabs` reka-ui override, *"retired once glass-ui ships a Tabs `underline` variant"*, marked **A.W2** | **CHRONIC** — booked at tranche **A**; glass-ui is now 7.0.0 and the marker is unre-checked |
| `demo/palettes/usePalettePorts.ts:29-30` — *"No compatibility shim and no re-export of the retired `PaletteManager` name (standing no-backwards-compat law)"* | **CLEAN** — a negative assertion, correctly authored |
| `api/src/modules/{color,session}/routes.ts`, `palette/service/crud.ts`, `admin/{audit-log,service/batch}.ts`, `palette/service/ownership.ts` | **CLEAN** — all say *"the legacy X **was** replaced/deletes/retired"*, i.e. historical prose, not live aliases |
| `e2e/smoke/dual-pane-1440.spec.ts` SHIM oracle, `safari/sustained-30s.spec.ts:64` | **CLEAN by intent, DEAD by wiring** — these gates make a producer defect *visible*; they never run (§2.9) |

**No exported compatibility alias survives in `src/`.** The v4 clean break is real at the package
boundary — `verify-packed-surface.mjs` genuinely asserts `@mkbabb/value.js`,
`/parsing`, `/units` all throw `ERR_PACKAGE_PATH_NOT_EXPORTED`. Credit that. The smuggling is all
in `demo/`.

### §6.1 — MAJOR · Chronic: the spectrum-range blur restatement, booked to retire at "the W8 consume", still live after the Glass 7 consume

`demo/styles/foundation.css:560-573`:

> *"MARKER (**S owner-ruling 2026-07-05**, alpha-checker lane): restatement of glass-ui's OWN
> spectrum-range rule, which its SOURCE declares … but whose DIST minification drops the
> UNPREFIXED `backdrop-filter: none` leg … NOT a fork — a **byte-level restatement of producer
> intent, scoped to the exact producer selector**. **Retire when the glass-ui dist keeps the
> unprefixed leg (reported; the W8 /slider consume is the checkpoint).**"*

Measured against the **glass-ui 7.0.0** now installed (the version adopted at W44, i.e. the named
consume checkpoint):

```
$ node -p "require('@mkbabb/glass-ui/package.json').version"   → 7.0.0
$ grep -o '.glass-slider\[data-variant=spectrum\][^}]*}' node_modules/@mkbabb/glass-ui/dist/glass-ui.css
.glass-slider[data-variant=spectrum] .slider-range[data-v-4f4cab01]{-webkit-backdrop-filter:none;box-shadow:none;background:0 0}
```

Three findings in one line:

1. **The unprefixed leg is STILL dropped.** The retirement condition is unmet at 7.0.0. The row
   rode S → T → U → V′-W44 (the consume it named) and was never re-checked. **CHRONIC.**
2. **The comment's claim is false.** The producer rule is scoped `[data-v-4f4cab01]` (a Vue
   scoped-style hash); the demo restatement is **unscoped**. It is *not* "scoped to the exact
   producer selector" — it is strictly broader and will hit any future non-scoped
   `.glass-slider[data-variant=spectrum] .slider-range`.
3. **It is not a "byte-level restatement".** The producer rule carries three declarations
   (`-webkit-backdrop-filter`, `box-shadow`, `background`); the demo restates one and a half
   (`backdrop-filter`, `-webkit-backdrop-filter`). Partial.

W44 closed **GREEN-WITH-RESIDUALS** and this row is in none of its residuals.

---

## §7 — WHAT IS ACTUALLY SOUND (so the next tranche does not re-litigate it)

Hostile audits that report only defects are as useless as closes that report only success.
Verified-honest rows:

- **Declared evidence tags exist on disk.** `git rev-parse` confirms `v-blob-b0-26-ref-w40`
  → `ff098c54`, `v-perceived-space-plate-ref-w40` → `9957ccf4`, `v4.0.0` → `62ff6e1d`. W48's and
  W53's reconstruction anchors are real objects, not phantom captures.
- **`npm test` 346/346 is honest.** CARRY-LEDGER §F's number reproduces exactly.
- **`src/` is clean.** 26 files, no cycles, one dead export, one over-export. The v4 collapse
  produced a genuinely tight library core.
- **The package boundary is a real clean break.** No root export, no `/parsing`, no `/units`, no
  aliases — asserted by a gate that can fail.
- **`verify-packed-surface.mjs`'s name-surface check is falsifiable** (rename any export → RED).
  Only its `strictTypes: 62` line is theatre.
- **README's technical claims hold**: 17 spaces (verified against `SPACE_SCHEMA`), the seven
  entries, and the first `parseCssColor` example all check out against the built `dist/`.
- **D57 and CARRY-LEDGER §B are honest about the export residue.** They name W50 as the wiring
  wave. The lie is not in D57; it is in `CARRY-LEDGER §A` filing W51 under "Executed and CLOSED"
  when its user-facing half is unbuilt.
- **`api/` is re-gated.** The W45 CI job (`npx tsc --noEmit` + `npm test`) genuinely closed the
  "prod runs untested api code" gap.

---

## §8 — REGISTRY ROWS FOR THE NEXT TRANCHE

Ordered by the cost of leaving them un-decided.

| # | Row | Why it must be a row | Disposition |
|---|---|---|---|
| R1 | **Restore browser verification to CI** — Playwright projects + a Lighthouse/LHCI step + a successor to `oracle-slate-teeth.mjs` | 185 tests and the Q14 budget gate are unreachable by any automation (§2.2, §2.9) | **BUILD** |
| R2 | **Q14 / CH-4 perf redemption** — LCP ≤2.5s, TBT ≤300ms, measured | Riding its 4th tranche, self-admitted "3rd" at U (§2.3) | **BUILD** |
| R3 | **W50: wire the panes to `export/serializers`, delete `export.ts` + `usePaletteExport.ts`** | 13 files / 29 tests unreachable; live path is lossy for non-ASCII names (§2.5, §4.1) | **BUILD** |
| R4 | **D-1 aurora derive-from-color** | Filed at tranche **D** as a named owner scope item; un-run across 4 tranches; its stated blocker (glass-ui ship) is stale at 7.0.0 (§2.4) | **BUILD** |
| R5 | **Re-establish honest test coverage for the 17 colour spaces** | 70 test files / 17,198 lines deleted at `3b5956d0` while the capabilities remained (§2.1) | **BUILD** |
| R6 | **Merge `tranche-u` → `master` and repair the deploy path** | Default branch red for 8 consecutive runs; site 17 days stale; "deploy-of-record" records nothing (§2.8) | **BUILD** |
| R7 | **Spectrum-range blur restatement** — re-report to glass-ui, fix the false "scoped to the exact producer selector" comment, or retire | Booked S 2026-07-05 to retire "at the W8 consume"; unmet at glass-ui 7.0.0 (§6.1) | **BUILD** |
| R8 | **Compute `strictTypes` instead of printing `62`** | A quoted close receipt that cannot fail (§2.6) | **BUILD** |
| R9 | **Make the PNG gate decode with a real decoder** | One `zlib.inflateSync`/`pngjs` call converts a self-referential gate into a real one (§5.2) | **BUILD** |
| R10 | **Rule the `demo/` error strategy once** — ~20 `catch → console.warn` sites, starting with the silent export failure | Violates the standing fail-explicit charter; user sees nothing on failure (§5.1, §5.3) | **BUILD** |
| R11 | **Restore or formally retire root `CLAUDE.md`** | Deleted at `164343c1`; the repo has no project canon file; the canon-sync gate that guarded it was deleted too | **BUILD** |
| R12 | **Rewrite `MEMORY.md`'s structural sections** | 7 of 9 concrete claims measurably false (§1) | **BUILD** |
| R13 | **Collapse the slug/filename trio to one implementation** | Three rules, two live, divergent on non-ASCII (§4.1) | **FOLD** into R3 |
| R14 | **De-duplicate `looksLikeSlug`/`normalizeTokenInput`/`onCopySlug`/`onStartSlugEdit`/`toHex`** | 2–3 copies each; silent divergence risk (§4.3) | **FOLD** into W47/W49 |
| R15 | **`ActionBarLayer` shim** — delete `void opts.containerEl`, tokenize `260`, clear the timer on dispose | Compat shim under a no-compat law; already booked to W47 (§4.2) | **FOLD** into W47 |
| R16 | **Delete `SPACE_IDS`; unexport `SPACE_SCHEMA`** | Dead export; over-export (§3.1) | **FOLD** into any src wave |
| R17 | **Delete the `test/dist` filter in `vitest.config.ts` + the `!test/dist/` rules in `.gitignore`** | Config and comments for a directory that does not exist (§2.10) | **FOLD** |
| R18 | **`.underline-tabs` reka-ui override** — re-check against glass-ui 7 Tabs | Booked at tranche **A**; never re-checked (§6) | **FOLD** into W46/W47 |
| R19 | **`scripts/dev/dev.sh`** — commit or restore | The last unowned dirty row, un-ruled since pre-V′ (`CARRY-LEDGER §C`); this seat is forbidden to touch it | **RETIRE** (owner ruling) |
| R20 | **~30 `.test.ts` prototype files under `docs/tranches/V/{apotheosis,vnext,megatranche}/`** | Look like tests, run never; discoverability hazard incl. the R1 hostile probe | **RETIRE** (rename or relocate) |

---

## §9 — RESIDUAL UNCERTAINTY

Marked honestly rather than asserted.

- **The `1607 → 346` delta.** I did not check out `3b5956d0^` and run the old suite; the 1607
  figure is memory's, dated 0.11.2 / 2026-06-11, and the v4 rewrite legitimately invalidated part
  of it. What I **did** measure is the deletion itself: 70 files, 17,198 lines removed vs 1,470
  added, in a commit whose subject advertises addition. **UNVERIFIED**: `git checkout 3b5956d0^ &&
  npx vitest run` for the true before-number.
- **The R1 `parseCssColor` crash.** Does not reproduce on HEAD's `dist` for 7 colour syntaxes.
  Either cured or entered by a different path. **UNVERIFIED**: run
  `docs/tranches/V/megatranche/audit/probes/r1-hostile-parsecsscolor.test.ts` under a config that
  includes it.
- **`getPalette`/`updatePalette`/`deletePalette` and `login`/`logout` duplication** (§4.3) — flagged
  by name-collision census; I did not read all six bodies. **UNVERIFIED**: a 20-minute read
  resolves them either way. I decline to call them findings without it.
- **The gh-pages prod-preview empty mount** (`CARRY-LEDGER §F`, named as *"the first probe of the
  post-compaction deep audit"*) — I did not build and serve `dist/gh-pages`. It remains the
  single most likely place for a green-over-broken confirmation, and it is already correctly
  booked by the ledger.
- **`docs/precepts/`** is a git submodule (carries its own `.git`); its contents are external
  canon and were not audited for drift against this tree.
