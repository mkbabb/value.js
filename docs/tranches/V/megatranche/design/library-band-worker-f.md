# LIBRARY BAND — PROGRAM (M-12 tri-fold, worker-F)

**MODEL RECEIPT (L-11).** This seat ran on **Fable 5**, exact model id **`claude-fable-5`**, as served
by the harness and declared in the system prompt. It is **not** Opus 5. Under M-12/L-14 this is the
*designated* worker-F seat (Fable executes the tri-fold's F arm; worker-O runs the same brief on Opus
5 blind to this document; arbiter-F adjudicates). Recorded, not relabeled — no Opus credit is claimed
for anything below.

Session 2026-07-27 · node v26.0.0 · darwin arm64 · value.js `tranche-u` @ `c654824e`.
Sibling HEADs read: keyframes.js `master`, fourier-analysis `m/w1-bump-migration`,
parse-that `@mkbabb/parse-that@1.0.0` (published artifact only — P00/P01 held).

**Scope (L-9).** Every count below excludes `node_modules`, `dist` (except where the built artifact
*is* the subject), and `test-results`. Every number carries the command that produced it.

**Writes.** Read-only everywhere except `docs/tranches/V/megatranche/`. This session created exactly
two files: this document and
`docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs`. `scripts/dev/dev.sh` was
not touched.

**Registry discipline.** `ROOT-FINDINGS.md`, `DISEASE-REGISTRY.md`, `DEFECT-LEDGER.md` and
`registry/adjudicated/parser-band.md` were read before any measurement. Rows already in the registry
are **cited, never re-found**: MT-F001, MT-F007, MT-F008, MT-F012, MT-F015, MT-F016, MT-F017,
MT-F018, MT-F019, MT-F020, MT-F021, MT-F022, MT-F024; DR-12, DR-14, DR-17, DR-18, DR-19, DR-20,
DR-21, DR-28, DR-29, DR-33; and every clause of the parser-band adjudication (verdict cand-O, the
five binding debts, G1–G8, the four dissents).

---

## §0 — VERIFICATION LEDGER (the duty discharged first)

I re-derived every sweep finding this program stands on. **Nothing below is adopted on a sibling
seat's word.** Verdicts: **CONFIRMED** = I reproduced it; **CONFIRMED-CORRECTED** = the defect is
real, a stated number or scope is wrong; **REFUTED** = the claim does not hold.

### Confirmed by live execution against the built artifact

```
$ node --input-type=module -e "import {parseCssColor,parseTimingFunction,parseStylesheet,coerceToSyntax} from './dist/subpaths/css.js'; …"
color constructor      -> THROW TypeError: e.trim is not a function     [MTS-01]
color __proto__        -> THROW TypeError: e.trim is not a function     [MTS-01]
color red (control)    -> {"ok":true,"value":{"space":"rgb",...}}
stylesheet a{color:constructor} -> THROW  (parseStylesheet, MT-F024 certified ok 0/172)
coerce constructor     -> THROW  (coerceToSyntax — a 10th entry point)
steps(2, constructor)  -> ok:true, position = [Function: Object]        [MTS-02]
steps(2, __proto__)    -> ok:true, position = [Object: null prototype]  [MTS-02]
steps(2, start)        -> ok:true, position = 'jump-start'  (control)

$ node --input-type=module -e "… from './dist/subpaths/transform.js' / math.js / css.js / value.js"
getTotalLength("M 0 0 L 10")            -> NaN                          [MTS-03]
getTotalLength("M 0 0 C 1 1 2 2 3")     -> NaN                          [MTS-03]
getTotalLength("M 0 0 L 3 4")           -> 5        (control)
arc expanded  "M 10 10 A 5 5 0 0 1 …"   -> 31.403311569547547           [MTS-04]
arc compact   "M10 10A5 5 0 0120 10…"   -> 0        (same circle)       [MTS-04]
decomposeMatrix3D(singular Mat4)        -> {scale:[0,NaN,NaN], quaternion:[NaN×4]}, not null  [MTS-05]
deCasteljau(0.5, [])                    -> undefined, typed number      [MTS-06]
interpBezier(0.5, [])                   -> [undefined, undefined]       [MTS-06]
lerpArray(len3, len2, .5, out3)         -> [2.5, 3.5, NaN]              [MTS-06]
"serializeCssValue" in CSS              -> false ; "serializeCssColor" in CSS -> true  [MTS-08]
Object.keys(value subpath)              -> ['isLayoutTrackingUnit']     [MTS-14]
```

| id | verdict | note |
|---|---|---|
| MTS-01 | **CONFIRMED** | Mechanism verified at source: `src/css/grammar.ts:265` `NAMED_COLORS[input.toLowerCase()]` over `src/css/named-colors.ts:1` `Object.freeze({…})` — a prototype-bearing literal. Line 266 re-enters `parseCssColor(named)` with a **function**, `:258 source.trim()` throws. Blast radius includes `parseStylesheet` and `coerceToSyntax`, both of which MT-F024's sweep certified `ok 0/172`. **MT-F024's "one distinct failure mode / the cure is one character" is false at HEAD** — deleting `grammar.ts:181`'s `!` leaves this intact. |
| MTS-02 | **CONFIRMED** | `src/css/grammar.ts:457-461` `aliases[args[1]?.toLowerCase() ?? "jump-end"]` guarded only by `!== undefined`. Twin at `src/css/stylesheet.ts:163-169`, currently masked by MTS-01 on the same token — curing MTS-01 alone **unmasks** it. |
| MTS-03 | **CONFIRMED** | 4/4 RED. |
| MTS-04 | **CONFIRMED** | The compact spelling is what SVGO/Figma/Illustrator emit; `NUMBER_RE` (`src/transform/path.ts:64`) flat-matches the whole arc run so `0 0120 10` tokenizes `[0,120,10]`. Highest-value single fix in `transform/`. |
| MTS-05 | **CONFIRMED** | `decomposeMatrix2D` guards the identical condition correctly 200 lines above (`decompose.ts:67,:80`); the null channel is live (`:234`, `:241`) and this case simply misses it. |
| MTS-06 | **CONFIRMED** | `scale()`'s guard order verified at `src/foundation/math.ts:15-20`: the division is computed **three lines before** the `fromMax === fromMin` check it exists to prevent. |
| MTS-08 | **CONFIRMED** | Divergence mechanism verified in both trees: value.js `stylesheet.ts:92` applies `result.replace(/\s+([:;])/g,"$1")` on space lists; keyframes' fork (`src/animation/compile/emit/css-text.ts:41`) has no such normalisation. value.js's copy also throws a bare `TypeError` at `:86` — the only throwing function in `src/css/`, called by `parseStylesheet` at `:500`. |
| MTS-09 | **CONFIRMED, and strengthened** | I built an independent consumer-compile probe (below). The observable defect is `error TS2459: Module '"@mkbabb/value.js/css"' declares 'CssValue' locally, but it is not exported.` |
| MTS-13 (a–e) | **CONFIRMED** | `src/css/types.ts:131` re-exports six types `src/css/index.ts` drops; `test/v4-c1.test.ts:9` imports `serializeKeyframeSelector` from `../src/css/grammar` — a deep path no consumer can take; `stylesheet.ts:498-499` builds `collectDeclarations(...)` twice back-to-back; `:709-717` double-`get`s six keys, each with a `!` on the second call. |
| MTS-14 | **CONFIRMED-CORRECTED** | Runtime keys on `./value` = `['isLayoutTrackingUnit']`, exactly as claimed. Fan-out re-measured by my own command (`grep -rhn 'from "@mkbabb/value.js' demo test`): **color 28** (seat said 29), css 13, math 6, easing 5, quantize 4, **transform 0, value 0**. The one-count delta on `./color` is immaterial; the load-bearing zeros hold. |
| MTS-15 | **CONFIRMED-CORRECTED** | `src/css/stylesheet.ts` = 899 lines; the five over-350 files match exactly. **But see LB-N2 — the 350 number is not canon for `src/`.** |
| MT-F019 fold | **CONFIRMED** (cited, not re-found) | |
| KF-EASE-REF | **CONFIRMED** | Run in keyframes' own tree against its installed 4.0.0: `40 names asserted, 0 rejected, 21 UNSTABLE refs` — including `ease`, `ease-in`, `ease-out`, `ease-in-out`. `easing-serialize.ts:71` matches by `func === easing.fn`. |
| KF-EVAL-THROW | **CONFIRMED** | `easing-registry.ts:29-48` — top-level `.map` with `throw` inside; `registryNames` derived from `Object.keys(bezierPresets)`. |
| KF-LEAVES-TAUT | **CONFIRMED** | `src/animation/internal/leaves.ts:28` is a bare re-export; `test/internal/leaves-parity.test.ts` compares it to itself. |
| KF-UNUSED-BLIND | **CONFIRMED** | `grep -n noUnused tsconfig.json tsconfig.lib.json` → zero hits. |
| KF-PROVENANCE | **CONFIRMED** | `./color` has 23 exports; `sampleColorRamp`/`deltaEOK` absent from all seven subpaths; the three hits in `src/` are comments only. |
| KF-SPLIT-HOME | **CONFIRMED** | My own census: 9 files import from **both** `/css` and `/value`. Files-per-subpath: css 27, value 14, color 6, math 5, easing 3, transform 2. |
| KF-41-DEMAND | **CONFIRMED** | `sampleRamp` at `backward-color.ts:171`, called `:250` and `:263` (1024 samples). Pin is exact `"@mkbabb/value.js": "4.0.0"` at `package.json:69`. |
| FP-01 / MTS-07 | **CONFIRMED, independently, twice** | `exports` keys = `["./color","./value","./css","./easing","./math","./transform","./quantize"]`; `main`/`module`/`types` all absent. Five fourier sites verified by grep. Node's own resolver: `ERR_PACKAGE_PATH_NOT_EXPORTED`. Two seats found this independently (value-src MTS-07 and fourier FP-01) — genuine convergence, not an echo. |
| FP-02 | **CONFIRMED** | `grep -rn timingFunctions src/` → **0**. |
| FP-03 | **CONFIRMED** | Probe re-run by me: 8/22 names drift ≥1e-3, max `ease-out-circ` 1.923e-1. |
| FP-04 | **CONFIRMED, and its premise verified at the source** | fourier's installed glass-ui is **4.0.0**; token definitions found at `dist/styles/tokens/color-radius.css:263-267` (`--viz-fourier: oklch(0.579 0.201 30.4)` …, `--viz-green: var(--section-color-4)`) and `dist/styles/tokens/light-dark.css:145-147` (`light-dark(oklch(…), oklch(…))`). `cssVarToHex` (`web/src/lib/colors.ts:22-53`) has hex / `hsl()` / bare-HSL / `rgb()` arms and `return "#888888"` at `:52`. Four series paint identical grey. |
| ISO-01 | **CONFIRMED** | `API-FACILITY-ISOMORPHISM.json`: 18 facilities, `counts.total 146`; substring scan for `easing`/`npm`/`library`/`subpath`/`parsecss` → **all false**. |
| ISO-02 | **CONFIRMED** | My own re-measure: `grep -rnE '@router\.(get\|post\|patch\|put\|delete)' api/routers/*.py \| wc -l` → **30** vs the contract's `counts.fourier.http = 41`. |
| PT-01 | **CONFIRMED** | `dist/diagnostics-DDazRHgl.js:14` `state.expected = diagnosticsEnabled && label ? [label] : void 0`; `dist/packrat-entry-*.js:881` `if (isDiagnosticsEnabled()) console.error(...)`. |
| PT-03 | **CONFIRMED (latch)** | `packrat-entry:678 let PACKRAT_ARMED = false`, `:722 PACKRAT_ARMED = true`, `:682`/`:714` read it — **no assignment back to false anywhere in the bundle**. |
| PT-04 | **CONFIRMED** | Probe: `Parser.lazy` arity 1, deepest OK 7761, then thrown `RangeError`. |
| PT-07 | **CONFIRMED** | 5/5 non-string inputs throw raw `TypeError`; `.parse()` returns `undefined` on failure. |
| AB-1 | **CONFIRMED** | `service/crud.ts:44-69` checks `deletedAt` only; `service/versions.ts:86-94` reads `palette_versions` by slug and never touches `palettes`; `service/forks.ts:76` births the child `visibility:"public"`. Enforcement census: exactly **two** sites (`crud-list.ts:113,:115`). |
| AB-2 | **CONFIRMED** | `crud-list.ts:60-68` `_id: String(doc._id)`; `:129-151` emits `{_id:{$lt: cursor._id}}` (a string). **The docblock at `:123-127` is false**: `model.ts:115` declares `_id?: ObjectId` and `repository/palette.ts:102-105` `insertOne(palette)` passes no `_id`, so the driver mints an ObjectId. MongoDB type-brackets `$lt`, so both tiebreaker clauses are dead. Tie producer confirmed: `admin/service/import.ts:39` hoists `const now = new Date()` out of the insert loop. |
| AB-3 | **CONFIRMED** | `repository/paletteVersion.ts` exposes findByHash / findByPaletteSlug / countByPaletteSlug / insertIfAbsent and **zero** delete methods; `grep -rn 'paletteVersions\.' api/src/ \| grep -v __tests__` → 7 hits, all reads or inserts. |
| AB-4 | **CONFIRMED** | `routes/versions.ts:43-47` binds `hash` and never reads `slug`. |
| AB-6 | **CONFIRMED** | Three demo sites literally `idempotencyKey: crypto.randomUUID(),` (`demo/palettes/api/palettes.ts:80,:145,:161`); `sweepExpired` has exactly one caller, `rate-limit.ts:81` — the replay store is never swept. |
| AB-7 | **CONFIRMED** | `.github/workflows/ci.yml:70` is a bare `npx tsc --noEmit`; `api/tsconfig.json:21-22` includes only `src` and excludes `src/**/__tests__/**`; `api/tsconfig.test.json` is tracked and unused. |
| AB-8 | **CONFIRMED** | `as any` = **0**, `as unknown as` = **1** in `api/src`. Live tree is `modules/` + `platform/`; `api/src/{crud,lib,ownership.ts,models.ts}` do not exist. |
| AB-10 | **CONFIRMED** | `service/crud.ts:106` `versionCount: 1` unconditional; `:116-118` writes the version record only `if (userSlug)`. |
| AB-11 | **CONFIRMED** | `service/visibility.ts:51-59` — `PALETTE_VISIBILITIES` is `as const`, so `.includes(to)` cannot be false for any value that typechecks; `void from` is in the body. Zero callers outside the file. |

### Corrections I am booking (L-10 duty, against sibling seats)

| # | Correction | Measurement |
|---|---|---|
| **C-1** | **MTS-13(f) REFUTED.** `src/.DS_Store` exists on disk but is **NOT tracked**. | `git ls-files \| grep DS_Store` → no output. The proposed gate `git ls-files src \| grep -c DS_Store` returns **0** — it is GREEN today and would be a vacuous gate (L-2). Dropped from the program. |
| **C-2** | **MTS-10 census CORRECTED, 5 → 3, and the rule TIGHTENS.** | `grep -rn 'from "[^"]*color/model"' src --include='*.ts' \| grep -v 'src/color/index.ts'` → **3**: `src/css/grammar.ts:18`, `:19`, `src/css/types.ts:1`. `anchors.ts:1` and `operations.ts:15` import `from "./model"` **inside `src/color/`**, which is the barrel's own directory and is correct. The rule is therefore *no module outside `src/color/` imports `color/model`* — 3 sites, all in `src/css/`, a 3-line edit. |
| **C-3** | **MTS-11 CONFIRMED exactly, by three independent counts.** | `grep -rEn … \| wc -l` → **148** (MT-F024's figure, a LINE count); `grep -rEo … \| wc -l` → **291**; robust per-file JS count → **297** — matching MT-F002/MT-F018's independent 297. Per file: decompose 113 · grammar 72 · path 35 · stylesheet 18 · quantize 18 · anchors 11 · easing 11 · operations 8 · foundation/math 7 · timeline 4. `src` = **4,654 lines / 26 files** (density 1 per 15.7, not 1 per 10.7). |
| **C-4** | **PT-08's proposed standing gate is ALREADY satisfied — no wave needed.** | `scripts/ci/verify-packed-surface.mjs:8-9` takes a tarball path as `argv[2]` and throws without it; it never reads the worktree `dist/`. Recorded as a negative result so no wave born-REDs against it. The row that *does* survive is DR-12's item 4: `:137` still emits a hardcoded `strictTypes: 62`. |

### NEW findings — mine, not in any sweep return

**LB-N1 — BLOCKER (mechanism) · Nothing in this repository resolves value.js from a consumer's
position, which is why the entire public-surface class survived the 4.0.0 cut.**

Measured (`test/` only, L-9):

```
$ grep -rn 'from "@mkbabb/value.js' test --include='*.ts' | wc -l    ->   7   (4 files)
$ grep -rn 'from "\.\./src/'        test --include='*.ts' | wc -l    ->  19
$ grep -rn 'from "\.\./dist'        test --include='*.ts' | wc -l    ->   0
$ ls test/*.ts | wc -l                                               ->  19
```

19 of 26 import statements take a deep `../src/...` path. The other 7 use the package specifier — but
`vite.config.ts:41-50` builds a self-alias set that rewrites `@mkbabb/value.js/X` to an absolute
**file path** (`conditions.import`), so even those never ask Node's exports resolver, and `tsc` is
never run from a consumer's position at all (`api/tsconfig.json` has no `paths`; the root has none).

**Consequence.** The test suite is *structurally blind* to exports-map defects. That single fact
explains MTS-08, MTS-09, MTS-10, MTS-13(a–c), MTS-14, KF-SPLIT-HOME and FP-01 as **one** disease with
one mechanism, not seven findings. It is the L-12 shape exactly: the witness environment cannot see
the defect class, and it was used as the witness.

**Cure is structure, not a gate (L-8):** a probe that stands outside the repo's resolution shortcuts.
I wrote it and it is RED today:

```
$ node docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs ; echo $?
RED  LEG1  2 public type(s) unnameable from the subpath that returns them:
       leg1.ts(2,15): error TS2459: Module '"@mkbabb/value.js/css"' declares 'CssValue' locally, but it is not exported.
       leg1.ts(3,15): error TS2459: Module '"@mkbabb/value.js/color"' declares 'ColorFactory' locally, but it is not exported.
RED  LEG2  root specifier does not type-resolve:
       leg2.ts(2,31): error TS2307: Cannot find module '@mkbabb/value.js' or its corresponding type declarations.
RED  LEG2  Node runtime resolution of the root specifier -> ERR_PACKAGE_PATH_NOT_EXPORTED
RED — 4 failing assertion(s)
1
```

It builds a throwaway package whose only dependency is a symlink to this repo, then runs `tsc` and
Node's resolver — precisely what fourier does. This is the gate that would have caught 4.0.0.

**LB-N2 — MAJOR (canon truth) · DR-17/DR-18's "350-LoC cap" is misattributed: canon applies it to
`api/src`, never to `src/`, and `api/src` HOLDS.**

`ARCHITECTURE.md` does not exist at the repository root — `git ls-files | grep -i architecture`
returns only tranche audit documents plus `docs/tranches/V/ARCHITECTURE.md`. That file, at
**lines 943-945**, states the caps verbatim:

> **No god modules**: every `demo/` file (excluding the vendored `demo/@/components/ui/` shadcn-vue
> tree) stays ≤ 400 LoC; no `api/src` file exceeds 350 LoC.

Measured at HEAD:

```
$ find api/src -name '*.ts' | xargs wc -l | awk '$1>350 && $2!="total"'      -> (empty)  CANON HOLDS
$ find demo -name '*.ts' -o -name '*.vue' | grep -v '/components/ui/' \
      | xargs wc -l | awk '$1>400 && $2!="total"'
    414 demo/picker/ColorPicker.vue
    417 demo/color-picker/App.vue
    453 demo/test/export/byte-exact.test.ts
    408 demo/scenes/about/markdown/Markdown.vue
    406 demo/color-picker/composables/boot/useAtmosphere.ts               -> 5 BREACHES
$ find src -name '*.ts' | xargs wc -l | awk '$2!="total"{if($1>m){m=$1;f=$2}}END{print m,f}'
    899 src/css/stylesheet.ts                                             -> NO CANON CAP EXISTS
```

So: the library tree `src/` has **never** had a stated LoC cap; DR-18 measures it against a number
canon applies to a different tree. Meanwhile the cap canon *does* state for `api/src` is **true**, and
the one canon cap that is **false** today (`demo/` ≤ 400, five breaches) belongs to the demo band, not
this one. Asserting a cap retroactively and then declaring it breached is the manufactured-finding
shape MT-F022 warns about — so this program does **not** born-RED any wave against a 350-line `src/`
cap. See ruling **R-T1**.

---

## §1 — RULINGS

### Module topology

**R-T1 — The `src/` LoC cap is not restored; it is replaced by a RATCHET, and `stylesheet.ts` is
split on its measured seam.**
Rationale: LB-N2. A cap the tree has never met, wired into CI, sits permanently RED and becomes the
78th unwalked gate (DR-19's lesson). A cap deleted with nothing behind it licenses the next 900-line
file. The ratchet is the only shape with a real RED input and no exception list: **`max(wc -l` over
`src/**/*.ts)` may not increase.** It is 899 today; W.L1 and W.L3 do not move it; the
`stylesheet.ts` split (MTS-15, folded into W.W8 per DR-18) drops it to 609, and the ratchet locks
the gain. `docs/tranches/V/ARCHITECTURE.md:943-945` is amended to state the ratchet for `src/`
and to keep the two caps it already states — one of which (`demo/` ≤ 400) is handed to the demo band
as a live breach, by name, rather than absorbed here.

**R-T2 — `color/model` is reachable from `src/color/` and from nothing else.**
Three sites (C-2), all in `src/css/`. Grep-checkable, 3-line edit, kills the `_2` duplication that
makes `css.d.ts` 41% of the published type surface. Structure, not a gate — but the grep is cheap and
is kept as a fence.

**R-T3 — `./css` re-exports the CSS value AST types; `./value` is NOT deleted.**
MTS-14 option (i). Additive, zero breakage, cures MTS-09 for `CssValue` for free, and lets keyframes
drop 13 of its 15 `/value` imports at the pin bump. Deleting `./value` would break 26 downstream sites
at once and is refused. `isLayoutTrackingUnit` **stays** on `./value` — moving it is a major for a
3-site cosmetic gain, and KISS wins (`feedback_kiss_no_contrivance`).

**R-T4 — `./transform` and `./math` get a consumer-shaped smoke suite, because zero in-repo
consumption is *why* they broke.**
Measured: `./transform 0`, `./value 0` consumers in `demo`+`test`. The two least-exercised subpaths
hold four live NaN/crash classes (MTS-03/04/05/06). The suite is not coverage theatre: it asserts the
four product properties in W.L2's gate and nothing else.

### The public-surface law (PSL) — three clauses, binding on every future cut

- **PSL-1 (derivation).** A subpath barrel is **mechanically derived** from the modules it forwards. A
  symbol is either forwarded to its subpath or is not `export`ed from its leaf. No hand-maintained
  pair of lists — that pair is the single mechanism behind MTS-08, MTS-09, MTS-10 and MTS-13(a–d).
- **PSL-2 (nameability).** Every type appearing in a published signature is nameable from the subpath
  that publishes that signature. Enforced by LB-N1's consumer probe (`TS2459` is the failure), plus
  the census `grep -cE '^declare (type|interface)' dist/subpaths/*.d.ts` → 0 (today: css 18, quantize
  6, value 6, color 1, easing 1; math and transform already clean).
- **PSL-3 (declared failure shapes, not unified ones).** `./css` `parse*` returns `ParseResult`
  (`{ok, value, diagnostics}` — **no `error` key**); `./color`, `./easing`, `./quantize` return
  `Result` (`{ok, value|error}`). ISO-10 shows a consumer trained on one gets `undefined` from the
  other. **Ruling: do NOT unify them** — that is a breaking change across 61 keyframes sites for an
  ergonomics gain TypeScript already catches. Instead the shape is *named per boundary* in the
  isomorphism contract and in each function's docstring. Weaker than unification and deliberately so;
  cf. `feedback_no_backwards_compat` — a converter shim would be the wrong cure.

### The value ↔ fourier isomorphism shape

**R-I1 — the library half is a CORRESPONDENCE ledger, not a mirror.**
D-15's ratified contract (`API-FACILITY-ISOMORPHISM.json`, 18 facilities / 146 ops) is an HTTP
artifact whose law is *bidirectional, each operation exactly once*. That law cannot be transposed to
the npm boundary: fourier is an application, not a library, and demanding it publish a mirrored
surface would be an isomorphism in name only. Facility **19 — `library-surface`** therefore carries a
different, stated law:

> Every symbol fourier imports from `@mkbabb/value.js` appears **exactly once** in the contract, with
> its subpath, its status against the shipped version, and the fourier obligation it discharges.
> Direction is one-way (value publishes, fourier consumes); completeness is bidirectional (no
> unlisted import, no listed symbol without a consumer).

Populated from the I-1..I-10 table the fourier seat measured, with I-1 resolved by **R-4.1-7** below.

**R-I2 — `counts` in the contract is annotated `as-specified`, and an `as-built` sibling census is
added with its command.** ISO-02: the contract says `fourier.http = 41`; the tree says **30**
(`grep -rnE '@router\.(get|post|patch|put|delete)' api/routers/*.py | wc -l`). Neither number is
wrong — one is a spec and one is a scan, and the defect is reading a spec as a measurement (L-10).

### The value 4.1 additive set — DECIDED

One **dated cut**, versioned **4.1.0**, carrying both the fix-shaped and the additive-shaped work.
DR-12 asks for 4.0.1 and DR-21 for "4.0.1/4.1.0"; the additive surface makes it a minor either way,
and — decisive — keyframes pins `4.0.0` **exactly**, so *nothing reaches them until they bump*.
Two cuts would mean two bumps to coordinate; there is exactly one bump event, so there is exactly one
cut. (KF-41-DEMAND point 3, verified: `package.json:69`.)

| # | Ruling | Basis |
|---|---|---|
| **R-4.1-1** | **SHIP** SCI-1: `sampleColorRamp` / `mixColorsInto` / `toRgba8Into`. | DR-21 BUILD, ninth carry forbidden. The evidence tuple DR-21 owes is now measured and named: `keyframes.js src/animation/compile/emit/backward-color.ts:171` (`sampleRamp`), called at `:250` (densify) and `:263` (1024-sample deltaE reference). |
| **R-4.1-2** | **SHIP** `toHex(color): Result<string, ColorIssue>` on `./color`. | I-6. Both fourier (`colors.ts:101,:111`) and the demo hand-roll hex. Without it FP-04 cannot delete `cssVarToHex` cleanly and the isomorphism's colour row cannot close. |
| **R-4.1-3** | **SHIP** the barrel corrections as public surface: `CssValue`/`CssScalar`/`CssCall`/`CssList` re-exported from `./css` (R-T3); `serializeCssValue` + `serializeKeyframeSelector` exported (MTS-08); `ColorFactory` exported (MTS-13b); every unexported `declare` in `dist/subpaths/*.d.ts` closed (PSL-2). | W.L3 lands them; the cut publishes them. |
| **R-4.1-4** | **SHIP** `easingNames(): readonly string[]` and **restore the analytic in/out arms to `DIRECT_EASINGS`**. | I-3 + FP-03. `ease-out-circ` drifts `max\|Δ\| = 0.192` between 0.13.0 and 4.0.0 — a visible animation change shipped under an unchanged name. Owner ruling D-21 says "easing MEASURE FIRST"; the measurement is adverse. Restoration is a **declared divergence row** in the outbound packet, because at their bump keyframes' 8 affected names change rendered output. |
| **R-4.1-5** | **SHIP** stable references from `easing(name)` (memoize the resolver). | KF-EASE-REF: 21 of 40 registry names return a fresh closure per call, including all four native CSS keywords. keyframes' `easing-serialize.ts:71` matches by reference. Additive and non-breaking; it does not *replace* the consumer-side cure (which is the one that ships under the exact pin) — it removes the trap for the next consumer. |
| **R-4.1-6** | **DECLINE, PERMANENTLY** — D-GAP-6 `sampleBezier`. | KF-41-DEMAND, verified: `grep -rn 'sampleBezier\|cubicBezierToSVG\|sampleCubic' src/ demo/` → **0** at keyframes HEAD. `linearDensifyEasing` (`compile/emit/easing-serialize.ts:38-45`, 8 lines) already samples **any** `TimingFunction` at 33 points and is strictly more general. The standing "adopt only if a future 4.1 ships it" conditional is **closed**, not carried — an un-dated conditional riding a wave that can decline to close is the deferral shape M-10 forbids. |
| **R-4.1-7** | **DO NOT restore the `.` root entry. Retire it by declaration, and deliver the migration.** | The 7-key map is owner ruling D-1. A root barrel re-imports the eager-bytes problem the subpath split exists to solve, and re-creates the dual path `feedback_no_backwards_compat` forbids. But a retirement whose consumers were never told is a break, not a decision — so the ruling is inseparable from W.L4's migration of fourier's 5 sites and the outbound packet naming atlas's 16. Consumers kept whole (M-8) by *doing the migration*, not by restoring the shim. |
| **R-4.1-8** | **FENCE** `bezierPresets`'s key set and `easing()`'s name catalog as coordinated surface. | KF-EVAL-THROW: keyframes derives `registryNames` from `Object.keys(bezierPresets)` and throws at **module evaluation** on any miss, so a removal is a `loadAnimationEngine()` boot crash; an addition silently mutates keyframes' public `timingFunctionEntries`. This is the fence IN-ATLAS-3 should have carried instead of keyframes' `TimingFunction` (KF-ATLAS-FENCE). R-4.1-4's restoration is *within* the fence (same names, changed curves) and is therefore a declared row, not a silent change. |

### API dispositions

**R-A1 — AB-1 is a PRECONDITION on DR-28's UI arm, not a sibling of it.** DR-28 BUILD wires the panes
to `draft→publish→unpublish→trash→restore`. Built over today's api that ships a privacy control that
controls nothing — and gives it a button. The gate lands first, in its own commit, with its own spec.

**R-A2 — DR-33 keeps its RETIRE disposition; its PREMISE is corrected (not re-booked).** DR-33 retires
by "recording the truth as the accepted single-replica design". AB-6 measures a larger truth: all
three demo call sites mint `crypto.randomUUID()` inline per invocation, so no stored entry can ever be
hit, while the store holds up to 50,000 captured response bodies for 24h in a 256 MB container and is
**never swept** (`sweepExpired` has one caller, and it sweeps the rate limiters). Recording "the
honest KISS choice for this deployment" would canonise a no-op with a memory bill. The disposition
stands; the recorded truth is the full one, and one decision lands in the same commit: **lift the key
to the logical operation, or delete the middleware and the three keys together.** Not neither. This is
a corrected premise under L-10, not a rename under L-5.

**R-A3 — AB-8's structural correction enters canon.** Any future api brief names `modules/` +
`platform/`, never the tranche-L names `crud/`, `lib/`, `ownership.ts`, `models.ts` (verified absent).
And "api is NOT runnable here" is struck: `cd api && npm test` runs the full suite cold. Every api row
in this band is CONFIRMED by static reading of the exact cited lines; the api seat additionally
confirmed four of them by live execution.

---

## §2 — THE WAVE BAND (7 waves)

Sizing (L-1): the measured landing rate is 38% across 22 tranches (MT-F020). Seven waves, each
closeable on its own evidence by one session, with no wave depending on another having landed. Where
an order is *preferable* it is stated as a preference with the alternative spelled out — never as a
dependency.

**DR-19 compliance, stated once for all seven:** no gate in this band is a
`scripts/**/proof-*.mjs`. Every gate is either a probe under
`docs/tranches/V/megatranche/audit/probes/`, a vitest spec asserting product behaviour, or a
structural grep with a named RED input.

---

### WAVE W.L1 — PROTOTYPE-INDEXING TOTALITY

**DEFECT.** A second shipped crash class inside `parseCssColor`, independent of MT-F024, whose blast
radius is strictly larger — it also takes down `parseStylesheet` and `coerceToSyntax`, which
MT-F024's sweep certified `ok 0/172`. Plus a type lie that escapes through a **successful**
`ParseResult` and is therefore invisible to every throw-based totality gate, including G1.

```
$ node --input-type=module -e "import {parseCssColor,parseStylesheet} from './dist/subpaths/css.js'; parseCssColor('constructor')"
TypeError: e.trim is not a function
$ node --input-type=module -e "import {parseTimingFunction} from './dist/subpaths/css.js'; console.log(parseTimingFunction('steps(2, constructor)'))"
{ ok: true, value: { kind: 'steps', count: 2, position: [Function: Object] }, diagnostics: [] }
```

**BORN.** RED. `node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs` → exit **1**,
28 failing assertions, of which blocks MTS-01 (15) and MTS-02 (2) are this wave's.

**SCOPE.** `src/css/named-colors.ts:1`, `src/css/grammar.ts:265-266`, `src/css/grammar.ts:457-462`,
`src/css/stylesheet.ts:163-170`. End state: no user-controlled string indexes a prototype-bearing
object anywhere in `src/css/`.

**STRUCTURE (L-8).** The lookup tables become `Object.create(null)`-filled (or `Map`), and the
truthiness guards become `typeof x === "string"` narrowings. This is **exactly cand-O's idiom**, which
I verified closes the class by construction:

```
$ cd docs/tranches/V/megatranche/prototypes/css-parser && npx tsx -e "import {parseColor} from './cand-o/index.ts'; …"
constructor -> reject css_syntax      __proto__ -> reject css_syntax
toString    -> reject css_syntax      red       -> {"space":"rgb","channels":[255,0,0],"alpha":1}
```
(`cand-o/grammar.ts:74-76` — "`Object.create(null)` + fill — a lookup table that cannot answer
`toString`"; asserted at `cand-o/idiom.test.ts:194,:203`.)

**RELATION TO THE ADJUDICATED PARSER BAND — read this before authoring.** cand-O's null-prototype
tables structurally close the **colour-name** arm (MTS-01). They do **not** cover
`grammar.ts:457-462` (`steps()` position aliases) or `stylesheet.ts:163-170` (its twin), because
neither is inside the colour grammar the port replaces. So this wave is the **complement** of the
port, not a competitor to it, and its cure is forward-compatible with it — the interim colour-arm fix
is subsumed byte-for-byte when the port lands. Nothing here amends the cand-O verdict.

**SEQUENCING NOTE, load-bearing.** Curing MTS-01 alone **unmasks** MTS-02's stylesheet twin, which is
currently hidden because the colour crash fires first on the same token. The two must land together
or the wave manufactures a new live defect.

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L1-G1 | `node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs` (MTS-01 block) | no public `./css` entry throws on a prototype-member colour name | `parseCssColor("constructor")`, `parseCssColor("__proto__")`, `a{color:constructor}`, `@keyframes k{from{color:constructor}}`, `a{background:linear-gradient(constructor,red)}` |
| L1-G2 | same probe (MTS-02 block) | every `ok:true` `parseTimingFunction` result has `typeof position === "string"` | `steps(2, constructor)` → `[Function: Object]`; `steps(2, __proto__)` → `Object.prototype` |
| L1-G3 | `grep -rEn '\b[A-Za-z_]+\[[a-z][A-Za-z0-9_.?]*\]' src/css --include='*.ts' \| grep -v 'Object.create(null)'` reviewed to zero | no object-literal index expression in `src/css` whose key derives from parse input | the three sites: `grammar.ts:265`, `grammar.ts:461`, `stylesheet.ts:169` |

**π / DELTA.** None — no visual surface. (L-7 does not apply; stated rather than omitted.)

**CARRIES.** MT-F024 — **FOLD**, identity preserved, with its §"one distinct failure mode" clause
corrected by measurement (it is two, and the second survives the one-character cure). DR-12 —
**FOLD** into W.W2 as adjudicated; this wave is its non-colour complement and does not re-book it.

**BANKS.** None.

**ENV.** Node against `dist/subpaths/css.js` (the shape that ships). Blind to: browser CSSOM
differences, and to any defect that only appears through the exports map (see LB-N1 / W.L3).

**COMPLETABLE.** Yes. If this were the only wave that ever ran, a live crash reachable from five CSS
spellings and a type lie in the timing-function AST would both be gone, and the probe would be green
on 17 of its 28 assertions.

---

### WAVE W.L2 — NUMERIC-LEAF TOTALITY (`./transform` + `./math`)

**DEFECT.** Four silent-corruption classes in the two subpaths with **zero in-repo consumers**:
truncated path argument runs return `NaN` (MTS-03); compact SVG arc flags — what every minifier emits
— mis-tokenize to **0 length** with no error (MTS-04); `decomposeMatrix3D` returns a fully-populated
all-`NaN` object where its own signature has a live `null` channel and its 2D sibling guards correctly
(MTS-05); `./math` has no failure protocol at all and three exports contradict their declared types
(MTS-06). Plus MT-F019's nine M-less-path throws (cited, folded, not re-found).

**BORN.** RED.
```
$ node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs   # blocks MTS-03..06 -> 9 RED
getTotalLength("M 0 0 L 10") -> NaN ;  compact arc: expanded 31.4033 vs compact 0
decomposeMatrix3D(singular)  -> {scale:[0,NaN,NaN], quaternion:[NaN,NaN,NaN,NaN]}   (expected null)
lerpArray(len3, len2, .5, out3) -> [2.5, 3.5, NaN]
```

**SCOPE.** `src/transform/path.ts` (tokenizer `:64,:86-87`; the 12 asserted strided reads at
`:342-343, :375-377, :392-393, :412-413, :427, :442-446`), `src/transform/decompose.ts:281-317`,
`src/foundation/math.ts:15-20, :58-69, :95, :107-110`.

**STRUCTURE (L-8).** Three structural moves, no new protocols invented — each joins an idiom already
present in the same file:
1. `tokenizePath` rejects or truncates a run whose `args.length` is not a positive multiple of the
   command arity, and **arcs tokenize positionally** (`rx ry rot`, then two single-character flags,
   then a coordinate pair) instead of flat-matching. The 12 `!` reads are then **deleted**, not
   guarded — the narrowing becomes real.
2. `decomposeMatrix3D` joins its own existing null-return ladder: `if (scaleX===0||scaleY===0||scaleZ===0) return null;`.
3. `./math` states one precondition policy and enforces it (length precondition on `lerpArray`,
   empty-points precondition on `deCasteljau`/`interpBezier`), and `scale`'s guard moves **above** the
   division it exists to prevent.

**MTS-12 IS THIS WAVE'S SIZING INPUT, and it changes the scope.** The 297 assertions split by
*contract*, not by volume: **150 are provably benign** (the collection is constructed locally at a
literal size and the index is bounded by a literal loop) — `decompose.ts` **113 of 113**,
`quantize.ts` 18/18, `easing.ts` 11/11, `operations.ts` 8/8. **132 are dangerous** (the enclosing
function's declared contract is totality and the asserted read is into a split/tokenize/caller-sized
collection) — `grammar.ts` 72, `path.ts` 35, `stylesheet.ts` 18, `foundation/math.ts` 7. This wave
retires **42** of the dangerous population (path 35 + math 7) and adds **zero** work in
`decompose.ts` — MTS-05 is a *missing guard*, not an assertion defect, and conflating them would
mis-size the wave by 113 sites. **A global "zero unproven `!` in `src/`" gate is explicitly NOT
adopted** (MT-F002 specs one): it is RED at 297 with 150 unfixable-without-loss, which is an arc
wearing a wave's name (L-1).

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L2-G1 | `node docs/…/probes/src-surface-totality.mjs` (MTS-03 block) | `Number.isFinite(getTotalLength(d))` for every syntactically-truncated run | `"M 0 0 L 10"`, `"M 0 0 C 1 1 2 2 3"`, `"M 0 0 Q 1 1 2"`, `"M 0 0 L 3 4 L 5"` |
| L2-G2 | same probe (MTS-04 block) + one SVGO-optimised fixture | expanded and compact spellings of one circle agree to 1e-6 | `"M10 10A5 5 0 0120 10A5 5 0 0110 10"` → 0 vs 31.4033 |
| L2-G3 | same probe (MTS-05 block) | `decomposeMatrix3D(singular) === null` | `[0,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]` |
| L2-G4 | same probe (MTS-06 block) | every `./math` export returns a finite value or a **declared** failure | `deCasteljau(0.5,[])`, `interpBezier(0.5,[])`, `lerpArray(len3,len2,.5,out3)` |
| L2-G5 | `npx vitest run docs/tranches/V/megatranche/audit/probes/hostile-transform.test.ts` | no public `./transform` entry throws on any of the 9 SVG drawing commands before a `moveto` | `"L 10 10"` (MT-F019, 9 throws today) |
| L2-G6 | `npx eslint src/transform src/foundation --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'` | the 42 retired assertions stay retired in these two directories | any re-introduced `!` |

**π / DELTA.** None (no visual surface), stated rather than omitted.

**CARRIES.** MT-F019 — **FOLD**, identity preserved. MT-F015's hostile-input wave — **FOLD**; this is
its `./transform` + `./math` slice. MT-F002's blanket-ban gate — **RETIRE**, with the written
rationale above (150 of 297 are proofs the compiler cannot see; deleting them buys noise).

**BANKS.** One, with its command: *if `./transform` or `./math` acquires an in-repo consumer, the
smoke suite (R-T4) is re-scoped to that consumer's real inputs* —
`grep -rc 'from "@mkbabb/value.js/\(transform\|math\)"' demo test` must stay `0`; the day it is not,
the bank fires.

**ENV.** Node against `dist/subpaths/{transform,math}.js`. Blind to: browser `SVGGeometryElement`
disagreements — deliberately, since the library's own geometry is the subject.

**COMPLETABLE.** Yes. Alone it removes every known silent-NaN and crash class from two published
subpaths and retires 42 of the 132 dangerous assertions.

---

### WAVE W.L3 — THE PUBLIC-SURFACE LAW

**DEFECT (one mechanism, seven symptoms — LB-N1).** Hand-maintained barrels with nothing reconciling
leaf `export`s against subpath forwards, in a repository where **no compile ever resolves the package
from a consumer's position**. Symptoms: `./css` cannot name the types its own eight public signatures
return (MTS-09, 18 unexported declares in `css.d.ts`; 32 package-wide); the general CSS-value
serializer is unexported and the downstream consumer's fork has **diverged** (MTS-08); `ColorFactory`
is unnameable so no consumer can type the 17 colour factories (MTS-13b); the `color/model` barrel
bypass duplicates five core types into `css.d.ts` under `_2` names (MTS-10 / C-2); nine of keyframes'
39 value-consuming files must take a second subpath dependency to name what the first returned
(KF-SPLIT-HOME).

**BORN.** RED.
```
$ node docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs ; echo $?
RED  LEG1  leg1.ts(2,15): error TS2459: Module '"@mkbabb/value.js/css"' declares 'CssValue' locally, but it is not exported.
     LEG1  leg1.ts(3,15): error TS2459: Module '"@mkbabb/value.js/color"' declares 'ColorFactory' locally, but it is not exported.
RED — 4 failing assertion(s)
1
```

**SCOPE.** `src/css/index.ts`, `src/subpaths/css.ts`, `src/subpaths/color.ts`, `src/color/index.ts`,
`src/css/types.ts:131`, `src/css/grammar.ts:18-19`, `src/css/stylesheet.ts:81` and `:86`,
`src/css/grammar.ts:429`. End state: PSL-1, PSL-2 and PSL-3 hold.

**STRUCTURE (L-8).** The barrel stops being a hand-kept list. Each subpath forwards **every type its
own emitted signatures reference**, derived mechanically from the `.d.ts` rather than by eye; and the
one grep-checkable import rule (R-T2) removes the dual module identity that produced the `_2`
duplication. The consumer probe is the standing structural witness — it is not a gate over source
text, it is a *second resolution path* that the repo's aliases and deep imports cannot fake.

**One correctness precondition inside this wave.** `serializeCssValue` throws a bare `TypeError` at
`stylesheet.ts:86` and is called by `parseStylesheet` at `:500, :652, :657, :665, :709-717`.
Publishing a throwing serializer from a package whose description reads "failure-explicit" repeats
MT-F024's contract violation in the opposite direction — so the throw joins the module's `Result`
idiom **before** the symbol is exported, not after.

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L3-G1 | `node docs/…/probes/consumer-surface-compile.mjs` (LEG1) | every type in a published signature is nameable from the subpath that publishes it | `import type { CssValue } from "@mkbabb/value.js/css"` → TS2459 |
| L3-G2 | `test $(grep -chE '^declare (type\|interface)' dist/subpaths/*.d.ts \| paste -sd+ \| bc) -eq 0` | zero unexported declares in the published type surface | today: css 18, quantize 6, value 6, color 1, easing 1 = **32** |
| L3-G3 | `test $(grep -c '_2' dist/subpaths/css.d.ts) -eq 0` **and** `test $(grep -rn 'from "[^"]*color/model"' src --include='*.ts' \| grep -v 'src/color/index.ts' \| wc -l) -eq 0` | one module identity per declaration set | today: **25** `_2` refs; **3** bypass sites (C-2) |
| L3-G4 | `node --input-type=module -e "import * as C from './dist/subpaths/css.js'; process.exit(('serializeCssValue' in C) ? 0 : 1)"` | the general serializer is on the public surface | today `false` |
| L3-G5 | differential: parse a fixture corpus, serialize with value.js and with keyframes' fork, assert byte equality | the two implementations agree | `"a : b"` → `"a: b"` vs `"a : b"`; `"x ; y"` → `"x; y"` vs `"x ; y"` (2 of 3 fixtures RED) |

**π / DELTA.** None (no visual surface).

**CARRIES.** MTS-13(e) — **FOLD** (hoist the six double `declarations.get()` calls at
`stylesheet.ts:709-717` into locals; deletes six dangerous assertions with no behaviour change).
MTS-13(d) — **FOLD** (`isSupportedSyntaxDescriptor` marked `@internal`). MTS-13(f) — **RETIRE**,
refuted (C-1: `src/.DS_Store` is untracked; the proposed gate is green today and would be vacuous).
KF-SPLIT-HOME — **FOLD**; goes green consumer-side at the pin bump.

**BANKS.** One: *the `./value` deletion question stays closed until keyframes' `/value` import count
reaches zero* — `cd ~/Programming/keyframes.js && grep -rc 'from "@mkbabb/value.js/value"' src \| paste -sd+ \| bc`
must read **0** before the question may be re-opened. Today: 14 files / 15 statements. (R-T3 refuses
the deletion now; this is the only condition under which it becomes cheap.)

**ENV.** `tsc` + Node's exports resolver, from **outside** the repo (a temp package with a symlinked
dependency). This is the environment the repo has never had. It is blind to: runtime behaviour (that
is W.L1/W.L2's job) and to bundler-specific resolution.

**COMPLETABLE.** Yes. Alone it makes the 4.0.0 surface nameable by its own consumers and installs the
witness that would have caught the whole class at the cut.

---

### WAVE W.L4 — FOURIER: ROOT-ENTRY RETIREMENT, COLOUR ROUTING, AND THE 19TH FACILITY

**DEFECT.** Owner ruling D-15 makes fourier first-class, and fourier **cannot import value.js 4.0.0
at all**: five bare-specifier sites against an exports map with no `.` key, one symbol
(`timingFunctions`) deleted with no successor of its shape, and eight easing names that still resolve
but return a **different curve** (max `|Δ|` 0.192). Separately and independently live *today*:
fourier hand-rolls a CSS colour parser that value.js exists to own, and it is **broken** — four of
five `--viz-*` tokens are `oklch()` in the glass-ui fourier already has installed, `cssVarToHex` has
no oklch arm, and the Fourier, Chebyshev and Legendre series plus the green axis all paint the same
`#888888`. And the ratified isomorphism contract covers 146 server operations and **zero** library
symbols, so none of this is in it.

**BORN.** RED, three independent commands:
```
$ node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs ; echo $?
RED leg1: 5 unresolvable bare-specifier sites (ERR_PACKAGE_PATH_NOT_EXPORTED)
RED leg2: `timingFunctions` absent from every 4.0.0 subpath
RED leg3: 8/22 easing names change SHAPE (ease-out-circ max|Δ| = 1.923e-1)
RED — 3/3 legs failing
1
$ node docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs ; echo $?   -> 5/6 RED, 1
$ node docs/tranches/V/megatranche/audit/probes/consumer-surface-compile.mjs           -> LEG2 RED, 1
```

**SCOPE.** fourier `web/src/components/equation/ConvergencePlot.vue:5`,
`web/src/components/equation/lib/harmonics.ts:5`,
`web/src/components/equation/composables/useCurveTransition.ts:8`, `web/src/lib/easings.ts:9` and
`:16`, `web/src/lib/colors.ts:22-117`, `web/package.json:18`; plus
`docs/tranches/V/apotheosis/snapshot-vnext-2/API-FACILITY-ISOMORPHISM.json` (facility 19). The D-15
direct-edit grant is the vehicle for the fourier half.

**THREE ACTS.**
1. **Migrate the five sites** to `@mkbabb/value.js/easing`; resolve `timingFunctions` to
   `easingNames()` + `easing(name)` and record the mapping; bump the pin off `^0.13.0`.
2. **Delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba`** (`colors.ts:22-117`) and
   route through value's published surface. **This does not wait on a 4.1** — the KISS route exists at
   4.0.0 today: `parseCssColor` → `convertColor(c,"rgb")` → a 3-line hex formatter, with the two
   context forms resolved by fourier itself (it already owns the DOM read and observes the theme via
   the `MutationObserver` at `App.vue:11,13`, so it can read `--section-color-4` directly and pick the
   `light-dark()` arm). R-4.1-2's `toHex` *simplifies* this later; it is not a precondition. Booking
   it as one would be the deferral M-10 forbids.
3. **Write facility 19** per R-I1, populated from the I-1..I-10 symbol table, and annotate `counts`
   `as-specified` with the `as-built` census per R-I2.

**ORDER INDEPENDENCE (L-1), stated explicitly.** This wave does not depend on W.L5. If it runs first,
it migrates onto 4.0.0 and books the eight drifted curves as a **declared, probe-pinned divergence
row**; if W.L5 runs first, R-4.1-4 has already restored the analytic arms and leg 3 goes green for
free. Both orders close the wave.

**STRUCTURE (L-8).** The hand-rolled parser is **deleted**, not extended with an oklch arm — an
extended copy is a second implementation of value's declared authority and will drift again the next
time glass-ui changes a token, which is exactly how it broke (the comment at fourier
`style.css:113-118` still asserts a glass-ui vintage that no longer exists).

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L4-G1 | `node docs/…/probes/fourier-value-import-drift.mjs` | zero unresolvable value.js specifiers in fourier `web/src` | `import { easeInOutSine } from "@mkbabb/value.js"` at `ConvergencePlot.vue:5` |
| L4-G2 | `cd ~/Programming/fourier-analysis/web && npx tsc --noEmit` | fourier typechecks against the pinned value.js | 5 unresolved specifiers + 1 missing export |
| L4-G3 | `node docs/…/probes/fourier-vizcolor-oklch.mjs` | every `--viz-*` token resolves to a distinct colour | all four oklch tokens → `#888888`; assert `VIZ_COLORS.fourier !== VIZ_COLORS.chebyshev` |
| L4-G4 | schema check: every symbol fourier imports from `@mkbabb/value.js*` appears exactly once in facility 19 | the correspondence ledger is complete | today **0 of 6** symbols are in the contract |
| L4-G5 | `node docs/…/probes/consumer-surface-compile.mjs` (LEG2) | the root retirement is *declared* — the probe's LEG2 expectation flips to "retired, and the migration table names every consumer" | today: TS2307 + `ERR_PACKAGE_PATH_NOT_EXPORTED` with no migration table |

**π (L-7).** This wave has a visual product and therefore a real π obligation: fourier's convergence
plot at the default route, light and dark, WebKit desktop + mobile (M-6), selector = the series
canvas; committed capture paths under
`docs/tranches/V/megatranche/audit/probes/app-wave/fourier-viz-{light,dark}-{before,after}.png`,
**force-added** past `.gitignore:34 *.png`. **DELTA**: the before pair shows four identical grey
curves; the after pair shows four distinct hues. A witness that is not committed does not exist.

**CARRIES.** MTS-07 — **FOLD** (same finding, second seat; identity preserved as a convergence
receipt). ISO-01, ISO-02 — **BUILD**, this wave. KF-ATLAS-FENCE — **FOLD**: the three factually wrong
claims in keyframes' `INBOUND-LEDGER.md:28` and `PROMPT-RECAP-V.md:130` are corrected by the outbound
packet in W.L5, and the fence is re-aimed at `bezierPresets` per R-4.1-8.

**BANKS.** One, with its command — the **atlas** exposure (16 root-specifier statements, 4 symbols
absent from all 7 subpaths: `TimingFunction`, `CSSCubicBezier`, `oklabToRgb255`, `srgbToOKLab`). atlas
is a *consumer to keep whole* (M-8), not a subject, so value.js does not edit it. Re-trigger:
`cd ~/Programming/atlas && grep -rc 'from "@mkbabb/value\.js"' src \| paste -sd+ \| bc` — the bank
fires when this is non-zero **and** atlas's installed value.js version moves off 3.1.0. The packet is
sent in W.L5 regardless.

**ENV.** Node + `tsc` in the fourier tree; the π captures in WebKit. Blind to: fourier's Python
`api/` half entirely — stated, because MT-F018 records the isomorphism spans a language boundary and
this wave deliberately scopes to the TS half, which is the half that is wired and the half that is
broken.

**COMPLETABLE.** Yes. Alone: fourier compiles against a current value.js, its four series render in
four colours, and D-15's contract finally covers the coupling that actually exists.

---

### WAVE W.L5 — THE 4.1 CUT (dated) + THE OUTBOUND PACKETS

**DEFECT.** DR-21's additive API ask has ridden **eight closes** under a ship label with no date
(`sampleColorRamp` in tranche dirs N O Q R T U V W; `mixColorsInto` in O Q R S V W), and
`grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/` → **0** at HEAD. DR-21's own diagnosis:
"a ship label with no date, attached to a wave that can decline to close, is a deferral." A ninth
carry is forbidden.

**BORN.** RED.
```
$ grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ | wc -l      -> 0
$ node --input-type=module -e "import * as c from './dist/subpaths/color.js'; \
    const m=['sampleColorRamp','mixColorsInto','toRgba8Into','toHex'].filter(n=>!(n in c)); \
    console.error('absent:',m); process.exit(m.length?1:0)"                -> exit 1, absent: all four
```

**SCOPE.** `src/color/`, `src/subpaths/color.ts`, `src/easing.ts:62-132` and `:166-171`,
`src/subpaths/easing.ts`, `package.json` version, `CHANGELOG.md`,
`scripts/ci/verify-packed-surface.mjs:137`. Plus three outbound packets (E13 mail law).

**THE CUT'S CONTENTS** — exactly R-4.1-1 through R-4.1-8, plus the surface W.L3 lands. **One cut, one
version, one bump event**, because keyframes pins `4.0.0` exactly (`package.json:69`, ruled DELIBERATE
per MT-F018) and therefore sees a 4.0.1 and a 4.1.0 as the same single migration.

**STRUCTURE (L-8).** The into-variants are additive overloads that cannot express the wrong thing: an
`out` parameter typed to the exact element count, so a mis-sized buffer is a **compile** error rather
than the silent `NaN` MTS-06 measures in `lerpArray` today. That is the structural answer to the same
disease in the same subpath, and it is why R-4.1-1 and W.L2 act 3 belong in one design even though
they land in different waves.

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L5-G1 | the absence probe above | the four new symbols exist on `./color` | all four absent today |
| L5-G2 | `node scripts/ci/verify-packed-surface.mjs <npm-pack-tarball>` with its **behavioural half** — one smoke invocation per runtime export | the packed tarball's exports actually run | DR-12 item 4; today the script asserts shape only and prints a hardcoded `strictTypes: 62` at `:137` |
| L5-G3 | `node --input-type=module -e "import{easing}from'./dist/subpaths/easing.js'; const n=['ease','ease-in','ease-out','ease-in-out']; process.exit(n.every(x=>easing(x).value===easing(x).value)?0:1)"` | `easing(name)` returns a stable reference (R-4.1-5) | today **21 of 40** names return a fresh closure |
| L5-G4 | fourier's drift probe leg 3 | the 8 restored analytic arms match 0.13.0 to <1e-3 (R-4.1-4) | `ease-out-circ` max\|Δ\| 0.192 |
| L5-G5 | `git log -1 --format=%s -- CHANGELOG.md \| grep -qE '4\.1\.0'` **and** the cut carries a date | the cut is **dated** — DR-21's stated cure | an undated ship label |

**π / DELTA.** None (no visual surface).

**CARRIES.**
- DR-21 — **BUILD, discharged here**, with the evidence tuple it has owed for eight closes now
  written into the same commit (keyframes `backward-color.ts:171/:250/:263`).
- DR-12 items 4 and 5 — **FOLD** (the behavioural half of `verify-packed-surface`, the hardcoded
  `strictTypes: 62` deletion, and the publish).
- D-GAP-6 `sampleBezier` — **RETIRE**, permanently, per R-4.1-6, with the measured reason (zero
  demand; `linearDensifyEasing` strictly generalises it). This closes a standing 4.1 conditional
  rather than carrying it.
- SCI-1's "dischargeable-on-adopt" framing — **RETIRE**; superseded by a dated cut.
- **L-10 correction booked here:** DR-12 item 3 ("enable `no-non-null-assertion` … 12 assertions
  remain") **understates its own scope**. The measured `src/css/` population is **90** (grammar 72 +
  stylesheet 18); if "12" meant the crash *shape*, MT-F024's own enumeration finds 6 such sites, of
  which 1 is the defect and 5 are proven safe. The disposition (BUILD) survives; only the sizing
  changes, and the rule is therefore enabled **per directory as each wave lands its files** —
  `src/css/` at W.W2+W.L1, `src/transform/`+`src/foundation/` at W.L2 (gate L2-G6).

**THREE OUTBOUND PACKETS (E13), each a named deliverable of this wave.**
1. **keyframes.js** — (a) the MT-F024 input class **widened**: not "parses colour text" but *any CSS
   scalar* — `parseCssScalar` throws on 24 of 26 zero-arg heads, `parseCssValues` on the 10 colour
   heads; plus MTS-01's **new** class (`constructor` / `__proto__`, reaching `parseStylesheet`, which
   was on their safe list). (b) The three reachable call sites with per-site verdicts:
   `resolve/browser.ts:165`, `engine/options.ts:31` (JS options API only — the CSS shorthand route is
   NOT reachable), `compile/value-ast.ts:71` (the primary authored-input surface, reachable from
   `fromString`). (c) `serializeCssValue` published — delete the diverged fork at
   `compile/emit/css-text.ts:41`. (d) The four keyframes-side waves value.js cannot land:
   **K1** KF-EASE-REF (replace the reference `.find()` at `easing-serialize.ts:71` with a sampled
   value-identity match on the 33-point grid `linearDensifyEasing` already uses);
   **K2** KF-LEAVES-TAUT (delete `test/internal/leaves-parity.test.ts` — a re-export cannot drift —
   and correct the two docstrings that assert a byte-copy and a nonexistent barrel);
   **K3** KF-UNUSED-BLIND (`tsc --noEmit -p tsconfig.lib.json --noUnusedLocals` → 9 errors today;
   set the flag);
   **K4** KF-PROVENANCE (three docstrings name `sampleColorRamp`/`deltaEOK`, which do not exist —
   gate: assert every value.js-attributed identifier in a comment is a real export of the subpath it
   is attributed to). Each carries the runnable gate the keyframes seat measured.
   (e) R-4.1-8's fence, and R-4.1-4's declared curve change.
2. **atlas** — the 16 root-specifier statements, the 4 absent symbols, and the 3.1.0→4.0.0 exports-map
   delta (`.`, `/parsing`, `/units` removed), so their bump is a planned migration and not a discovery.
3. **glass-ui** (standing BH/BI relay edict) — the MTS-01 input class, since glass-ui 7.0.0 imports
   `parseCssColor` and feeds it user-supplied strings.

**ENV.** Node against the **packed tarball** (`npm pack`), never the worktree `dist/` — PT-08 measured
a real byte delta between them (`css.js` sha `ca87007b…` vs published `8b538130…`, 43,973 vs 43,972
bytes) whose content is rollup identifier allocation only, with 0 behavioural differences across a
19-input corpus. `verify-packed-surface.mjs` already targets a tarball argument (C-4) and must keep
doing so.

**COMPLETABLE.** Yes. Alone it discharges the repository's most-carried additive row on its ninth
appearance, with a date.

---

### WAVE W.L6 — THE API AUTHORIZATION BOUNDARY (precondition on DR-28's UI arm)

**DEFECT.** `visibility` is enforced on **one** of ten palette-read surfaces. A `visibility:"private"`
palette is fully readable by an anonymous stranger at `GET /palettes/:slug`; its entire version
history (names, colours, `authorSlug`) is readable at `GET /palettes/:slug/versions`; any session can
`POST /palettes/:slug/fork` it and receive the private colours copied into a child born
`visibility:"public"`. Private is not a privacy control; it is a browse-list filter. Alongside:
`palette_versions` has **no delete path anywhere in the api**, and slugs are re-claimable, so the next
owner of a freed slug inherits the previous owner's history; `GET /:slug/versions/:hash` never reads
its own `:slug`; `versionCount: 1` is written for rows that get no version record; and
`assertVisibilityTransition` is a tautology the type system cannot make false.

**BORN.** RED. Static reproduction (each line verified by me at the cited file:line):
```
service/crud.ts:44-69       getPaletteBySlug  — checks deletedAt only, never visibility
service/versions.ts:86-94   listVersions      — reads palette_versions by slug, never touches palettes
service/forks.ts:165-171    forkPalette       — no visibility test on the source
service/forks.ts:76         the child is born visibility:"public"
$ grep -rn visibility api/src/modules/palette/service/*.ts api/src/modules/palette/routes/*.ts \
    | grep -v service/visibility.ts        -> 2 enforcement sites (crud-list.ts:113,:115), rest writes/comments
$ grep -rn '"private"' api/src/modules/palette/__tests__ api/test | wc -l   -> 4, none asserting non-owner denial
$ grep -rn 'paletteVersions\.' api/src/ | grep -v __tests__               -> 7 hits, all reads/inserts, zero deletes
routes/versions.ts:43-47    the :slug param is never bound
```

**SCOPE.** `api/src/modules/palette/service/{crud,versions,forks}.ts`,
`api/src/modules/palette/repository/paletteVersion.ts`,
`api/src/modules/palette/routes/versions.ts`, `api/src/modules/admin/service/users.ts:174-221`,
`api/src/cron.ts:46-53`, `api/src/modules/palette/service/visibility.ts`.

**STRUCTURE (L-8).** One `assertReadable(doc, currentUserSlug)` built on the existing
`isActivePublic` — which was authored at V·W45 with the docblock "available to any detail/social read
that must decide whether a row may cross the public wire so those surfaces cannot drift apart" and
then acquired **exactly one caller**. The four unguarded entrypoints take it; a fork of a non-public
source returns 404, matching the browse-list's existing "invisible means absent" semantic.
`palette_versions` gains `deleteByPaletteSlugs`, threaded into the three existing cascade transactions
(`admin/service/users.ts:174-183`, `:207-221`, `cron.ts:46-53`). `assertVisibilityTransition` is
**deleted** rather than gated (L-8: a gate over a tautology is a second tautology), with the ruling
recorded in canon that value.js's `(visibility, tier)` model has no forbidden transitions — which is
the honest finding, and shipping a no-op named `assert*` in the same file is part of why the missing
guard went unnoticed.

**GATES.** One new spec, `api/src/modules/palette/__tests__/palette-visibility-gate.test.ts`, run by
`cd api && npx vitest run palette-visibility-gate`:
| # | assertion | RED today |
|---|---|---|
| L6-G1 | anon `GET /palettes/:slug` on a private palette == 404 | **200** with the private colours |
| L6-G2 | anon `GET /palettes/:slug/versions` == 404 | **200** with names, colours, `authorSlug` |
| L6-G3 | bob `POST /palettes/:slug/fork` of alice's private palette == 404 | **201**, colours copied, child public, listed publicly |
| L6-G4 | owner alice still gets 200 on all three | (must not regress) |
| L6-G5 | `GET /palettes/bbb/versions/<hash owned by aaa>` == 404 | **200** with the foreign document, self-reporting `paletteSlug:"aaa"` |
| L6-G6 (`version-orphan.test.ts`) | after hard-delete, `palette_versions.countDocuments({paletteSlug})` == 0; re-create under a second user → `/versions` total == 1 | **1** orphan; total **2** |
| L6-G7 (same spec) | create with `userSlug: null` → `versionCount === listVersions(...).total` | **1 vs 0** |

**RED INPUT (stated once, per L-2).** alice creates `secret`, `setVisibility({target:"private"})`;
bob and an anonymous client then perform G1–G3.

**π / DELTA.** None in this wave — deliberately. The UI is DR-28's arm and must not land first
(R-A1).

**CARRIES.** DR-28 — **BUILD**, and this wave is recorded as its **precondition**, not its sibling.
AB-11 — **RETIRE** by subtraction, with the rationale above.

**BANKS.** None.

**ENV.** `cd api && npm test` against `mongodb-memory-server` (binaries cached at
`~/.cache/mongodb-binaries/`; the full suite is 38 files / 213 tests / ~24s). Blind to: production
replica-set behaviour and to any authorization enforced at a proxy rather than in the app.

**COMPLETABLE.** Yes. Alone it makes `private` mean private.

---

### WAVE W.L7 — API INTEGRITY, BOOT, AND GATE SCOPE

**DEFECT.** Four unrelated-looking rows with one shared property — each is an invariant a type system
was never going to carry, in the repository the registry holds up as the model of type discipline
(MT-F021c: `as any` = 0, `as unknown as` = 1 in 10,869 lines, re-measured by me and confirmed).
(1) Both tiebreaker clauses of the keyset pagination predicate are **dead** — they compare a
base64-decoded `_id` *string* against a live `ObjectId`, and MongoDB type-brackets `$lt`/`$gt`, so any
group of palettes sharing a `createdAt` millisecond at a page boundary truncates the browse feed and
page 2 returns empty with `hasMore:false`. (2) The startup migration probe is an unbounded
full-collection scan that `process.exit(1)`s before any route mounts, so one malformed document takes
down `/health` too. (3) The idempotency replay store is write-only and never swept (R-A2). (4) CI
typechecks 70% of the api: `npx tsc --noEmit` resolves `api/tsconfig.json`, which excludes
`src/**/__tests__/**` and never includes `test/`, while the correct config is tracked and unused.

**BORN.** RED, each with its own reproduction:
```
crud-list.ts:60-68   encodeCursor -> _id: String(doc._id)
crud-list.ts:129-151 keysetPredicate -> {_id:{$lt: <string>}}   (dead: type bracketing)
model.ts:115         _id?: ObjectId          <- the docblock at crud-list.ts:123-127 says otherwise
repository/palette.ts:102-105  insertOne(palette) with no _id  -> the driver mints an ObjectId
admin/service/import.ts:39     const now = new Date()  hoisted OUT of the insert loop  (the tie producer)
migrations/check.ts:82-118     find({}) full scan ; :124-145 process.exit(1) ; main.ts:45-49 before serve()
demo/palettes/api/palettes.ts:80,:145,:161   idempotencyKey: crypto.randomUUID()  (per call)
grep -rn sweepExpired api/src/ | grep -v __tests__  -> one caller, rate-limit.ts:81 (limiters only)
.github/workflows/ci.yml:70    npx tsc --noEmit  ;  api/tsconfig.json:21-22 include ["src"] / exclude __tests__
```

**SCOPE.** `api/src/modules/palette/service/crud-list.ts`,
`api/src/platform/migrations/check.ts`, `api/src/platform/http/idempotency.ts`,
`demo/palettes/api/palettes.ts`, `.github/workflows/ci.yml:70`.

**STRUCTURE (L-8).** (1) The cursor tiebreaks on **`slug`** — which *is* a string, *is* uniquely
indexed, and cannot be silently type-bracketed — rather than re-branding `_id` to `ObjectId`; and the
false docblock is deleted rather than carried. (2) The boot probe becomes one indexed
`countDocuments` with a `$nor` of the invariant predicates instead of an unbounded scan, logs loudly,
and lets the server start — the hard failure moves to the read boundary where `formatPalette`'s type
contract already lives. (3) `-p tsconfig.test.json` in CI.

**GATES.**
| # | command | asserted property | RED input |
|---|---|---|---|
| L7-G1 | `cd api && npx vitest run pagination-tie` | the union of all pages' slugs equals the collection; `hasMore:false` only when exhausted | 5 palettes with one shared `createdAt`, `limit:2` → page1 `['e','d']` hasMore **true**, page2 `[]` hasMore **false**, 2 of 5 reachable |
| L7-G2 | `cd api && npx vitest run boot-resilience` | one malformed document is reported **and** `GET /health` still answers 200 | a palette missing `tier` → `process.exit(1)`, second assertion unreachable |
| L7-G3 | `cd api && npx vitest run idempotency-reachability` + a demo unit | two invocations for one user intent carry the **same** `Idempotency-Key`; the store returns to 0 after the window | today the keys differ and nothing sweeps |
| L7-G4 | `cd api && npx vitest run config-truth` (the spec already exists and already asserts config facts) | the CI api typecheck command contains `-p tsconfig.test.json` | `.github/workflows/ci.yml:70` is a bare `npx tsc --noEmit`; 3,244 of 10,869 lines typechecked by nothing |
| L7-G5 | `cd api && npx vitest run route-consumers` | every mounted route appears in the demo transport path set, minus a **named, justified** ops allowlist (`/health`, `/docs`, `/openapi.json`) | 9 of 51 unlisted, incl. the only writer of `user.status = "suspended"` |

**RULING inside L7-G5 (AB-9), so the wave does not become a survey.** The nine split in one sitting:
`GET /:slug/versions/:hash` **RETIRES** with W.L6; `/:slug/forks` and `/:slug/provenance` are **WIRED**
by DR-28's UI arm (provenance is the one surface that already redacts correctly, `forks.ts:196-212`);
the four admin rows (`/batch/palettes`, `/batch/users`, `/users/:slug/import`, `/users/:slug/status`)
go to the **W.W0 owner sitting** alongside DR-29's other owner-held rows — and suspend in particular
is either wired into `AdminUsersPanel` or the entire enforcement path in `session/resolve.ts:28-53`
(a dedicated 60s/10,000-entry `suspendedCache` plus an `OwnershipError` throw) is deleted with it;
`GET /colors/search` and `GET /palettes/mine` have e2e coverage and are **WIRED** by naming their
consumer.

**π / DELTA.** None.

**CARRIES.** DR-33 — **RETIRE, premise corrected** per R-A2, in this wave's commit. AB-12's four
negative results — **RECORDED**, so no wave born-REDs against them: OpenAPI/route-table parity is
exact (51 = 51, both differences empty); Hono's body cache makes the idempotency middleware's up-front
`c.req.text()` safe; sessions cannot be immortal (`repository/session.ts:28-34` gates on
`expiresAt: {$gt: new Date()}` in the query); the suite is 38 files / 213 tests green in 24.4s.

**BANKS.** One: *DR-33 reopens as a DEPLOYMENT FACT, not a wave* — re-trigger
`grep -c 'replicas:' api/compose.yaml` reading non-zero, or any second app replica appearing in the
deploy. Stated as a command per L-4.

**ENV.** `cd api && npm test` (mongodb-memory-server, cached binaries) + the GitHub Actions api job.
Blind to: multi-replica behaviour — which is precisely the property DR-33 relaxes, hence the bank.

**COMPLETABLE.** Yes. Alone: the browse feed stops silently truncating, one bad row stops taking down
`/health`, and CI typechecks the 30% of the api it currently does not.

---

## §3 — CARRY DISPOSITIONS (L-5: BUILD · FOLD · RETIRE, original ids preserved)

| row | disposition | where |
|---|---|---|
| MT-F024 | **FOLD** into W.L1 + W.W2; its "one distinct failure mode / one character" clause corrected by measurement | W.L1 |
| MT-F019 | **FOLD** (cited, not re-found) | W.L2 |
| MT-F015 hostile-input wave | **FOLD**; W.L2 is its `./transform`+`./math` slice | W.L2 |
| MT-F002 blanket `!` gate | **RETIRE** — 150 of 297 are compiler-invisible proofs; a global gate is an arc | W.L2, rationale in MTS-12 |
| MT-F018 / MTS-11 census | **FOLD** into W.W0's canon-truth act with MT-F007: correct 148→297 (line-count vs site-count), 3,192→4,654 lines, density 1/15.7 | W.W0 |
| MTS-12 | **not a wave** — the sizing input, booked before authorship (L-1) | W.L2 |
| MTS-15 | **FOLD** into W.W8 with DR-18, as the disposition DR-18 stops short of: the 899-line file has a cycle-free three-way seam (265 / 381 / 153) with exactly two cross-seam call edges, so the residual is dischargeable rather than carried. **Land after W.L1** — MTS-02's twin is at `stylesheet.ts:163-169`. | W.W8 |
| DR-12 | **FOLD** (its colour slice is W.W2's; W.L1 is the non-colour complement; items 4–5 ride W.L5). Sizing corrected: `src/css/` holds 90 assertions, not 12. | W.W2 / W.L1 / W.L5 |
| DR-17 / DR-18 | **FOLD**, with LB-N2's correction: canon's 350 applies to `api/src` (which **holds**), not `src/`. Ruling R-T1 replaces the phantom cap with a ratchet. The real canon breach (`demo/` ≤ 400, **5 files**) is handed to the demo band by name. | W.W8 |
| DR-19 | **RETIRE** — honoured, not re-litigated: zero `proof-*.mjs` in this band | all waves |
| DR-21 (SCI-1) | **BUILD, discharged** on a dated cut, evidence tuple attached | W.L5 |
| D-GAP-6 `sampleBezier` | **RETIRE**, permanently, on measured zero demand | W.L5 |
| DR-28 | **BUILD**; W.L6 is its **precondition**, not its sibling | W.L6 / W.W7 |
| DR-33 | **RETIRE**, premise corrected (unreachable, not merely non-durable) | W.L7 |
| DR-29 | **FOLD** — the four dead admin routes (AB-9) join the single owner sitting | W.W0 |
| IN-ATLAS-3 fence | **FOLD** — re-aimed at `bezierPresets`/`easing()` per R-4.1-8; the census corrected | W.L5 |
| MTS-13(f) `.DS_Store` | **RETIRE** — refuted (C-1) | — |
| PT-08 dist-drift | **RETIRE** — record-only; the standing gate is already satisfied (C-4) | — |
| KF-R1-REACH, KF-EASE-REF, KF-LEAVES-TAUT, KF-PROVENANCE, KF-UNUSED-BLIND, KF-EVAL-THROW | **BUILD, keyframes-side (K1–K4 + the R1 packet)** — delivered by outbound packet with runnable gates; value.js cannot land them and does not pretend to | W.L5 |
| atlas root-specifier exposure | **BANK** with a runnable re-trigger + an outbound packet | W.L4 / W.L5 |

**L-5 compliance.** Every row above carries BUILD, FOLD or RETIRE. The forbidden deferral string of
L-5 §"Law" — and every synonym of it — appears nowhere in this program. (Deliberately paraphrased
rather than quoted: quoting it here would make an automated sweep flag this document, which is the
grep-without-context hazard L-11's own method note records.)

---

## §4 — CONSISTENCY ATTESTATION

**Against `registry/adjudicated/parser-band.md`.** Nothing here contradicts the verdict, the five
binding debts, G1–G8 or the four dissents.

- **cand-O stands as the base.** W.L1 is explicitly the *complement* of the port (the `steps()` alias
  table and its stylesheet twin are outside the colour grammar), and its cure is cand-O's own
  null-prototype idiom, which I verified rejects `constructor`/`__proto__`/`toString` cleanly. The
  interim colour-arm fix is subsumed byte-for-byte when the port lands.
- **G1 is untouched** and remains the band's anchor (`r1-published-totality.mjs`, exit 1 today,
  verified by me). W.L1's probe is a *sibling* covering a class G1's throw-based sweep cannot see
  (MTS-02 escapes through `ok:true`) and one G1's own 172-input corpus does not contain
  (`constructor`).
- **G6 stands as adjudicated; a leg is ADDED, not changed.** PT-02 measures cand-O emitting
  `expected: []` on 5 of 7 rejections where the published parser names a real expectation, which G6's
  `{space, channels, alpha}` success-shape agreement structurally cannot see. **G6b**: field-for-field
  `{code, offset, expected, actual}` agreement on the rejection corpus against the same
  sha-pinned vendored tarball. Strengthening, not contradiction.
- **Debt #1 is re-specified, not weakened.** The band asks for labelled failures in cand-F's style.
  PT-01 establishes (and I re-verified at `dist/diagnostics-DDazRHgl.js:14` and
  `packrat-entry:881`) that parse-that 1.0.0's label mechanism is a no-op unless a process-global
  flag is on, and that flag arms an unconditional `console.error` on every failed top-level parse. So
  the labelled-failure primitive is written **value-side**, independent of that flag — which is what
  P00/P01 requires anyway, since the 1.1.0 ask letter is not a published surface. The debt is
  discharged, by a stated mechanism.
- **Debt #3 is re-specified with its two options preserved.** PT-04 (`Parser.lazy` arity 1, ceiling
  7761, thrown `RangeError`) shows no depth bound exists in 1.0.0, so the band's stated precondition
  for removing the shield is unreachable as written. Both of the band's own options survive: flatten
  the balanced tail to an iterative scan (cand-F's proven posture, closing the DISSENT toward cand-F)
  or keep the shield and pin the ceiling by test (closing it toward cand-O). **This program does not
  pick** — the try/catch dissent is preserved as live disagreement, exactly as adjudicated.
- **G7 gains an ARMED cell.** PT-03's latch is real and verified (`PACKRAT_ARMED` set at `:722`,
  never cleared). Every bar is published armed and unarmed or it is not published. This is one more
  honest input to **OC-1** and pre-empts nothing about the bench bar.
- **The token-juxtaposition and non-finite dissents are owner-held and are left untouched.**

**Against `DISEASE-REGISTRY.md`.** Every disposition I rely on is preserved: DR-12 BUILD, DR-18 FOLD,
DR-19 RETIRE (honoured structurally — zero `proof-*.mjs` in this band), DR-20 RETIRE (untouched),
DR-21 BUILD-on-a-dated-cut (discharged, not re-booked), DR-28 BUILD (W.L6 is its precondition), DR-29
FOLD (the four admin routes join the sitting), DR-33 RETIRE (kept, premise corrected under L-10 — a
corrected premise is not a rename). The two corrections I make to registry rows (DR-12's item-3
sizing; DR-17/DR-18's misattributed cap) change **no disposition** — which is the cheapest kind of
correction to land, and the kind L-10 exists to produce.

---

## §5 — WHAT I WOULD TELL THE ARBITER

1. **The strongest finding in this band is a mechanism, not a defect.** LB-N1 — nothing in this
   repository resolves value.js from a consumer's position — collapses seven separately-reported
   symptoms into one disease with one structural cure. If the arbiter keeps one thing from this
   document, keep the probe: it is committed, it is RED, and it is the gate that would have caught
   4.0.0.
2. **MT-F024's most-quoted sentence is false at HEAD**, and this is load-bearing rather than
   pedantic: the cure is not one character, and `parseStylesheet` — certified `ok 0/172` — crashes on
   `a{color:constructor}` today. Any wave written against MT-F024's stated blast radius will close on
   its own evidence while the defect ships.
3. **I refute one sweep row and correct three.** `src/.DS_Store` is not tracked (C-1); MTS-10's
   bypass census is 3, not 5, which *tightens* the rule (C-2); MTS-11's 297 is exactly right and
   MT-F024's 148 is a line count (C-3); PT-08's proposed gate is already satisfied (C-4). And LB-N2
   finds the 350-LoC cap misattributed — canon applies it to `api/src`, where it **holds**.
4. **The two seats that converged independently converged on the real thing.** MTS-07 and FP-01 are
   the same finding reached from opposite directions (library-surface census vs consumer sweep), and
   I verified it a third way with Node's own resolver. Under L-14's corollary, this is agreement that
   earns belief because the routes were genuinely different.
5. **Where I chose the smaller answer, I said so.** PSL-3 declines to unify the two failure contracts;
   R-T3 declines to delete `./value`; R-4.1-7 declines to restore the root barrel; R-A2 keeps DR-33's
   disposition. Each refusal is a place a bigger program was available and the record says bigger
   programs do not land (MT-F020: 38%).
