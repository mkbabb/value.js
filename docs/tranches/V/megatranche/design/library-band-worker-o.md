# THE LIBRARY PROGRAM — worker-O (M-12 tri-fold, library band)

**MODEL RECEIPT (L-11, first field):** `claude-opus-5[1m]` — exact model id as served to this seat;
harness alias "Opus 5 (1M context)". No subagent was dispatched; every measurement below was taken
in-seat.

**Session.** 2026-07-27 · node v26.0.0 · darwin arm64 · value.js `tranche-u` `c654824e`.
**Peers measured at their own HEADs:** keyframes.js `master` `a59d3a22` (`@mkbabb/keyframes.js@6.0.0`),
fourier-analysis `m/w1-bump-migration` `cd26c65`, parse-that `@mkbabb/parse-that@1.0.0` (published
artifact only, P00/P01 held), atlas `/Users/mkbabb/Programming/atlas` (value.js 3.1.0 installed).

**Writes.** Two files, both inside the sanctioned root: this document, and
`docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs` (the born-RED gate for the five
rows this band ADDS — exit 1 today, 12 failing assertions). Nothing under `src/`, `demo/`, `api/`,
`e2e/`, `docs/tranches/V/vnext/`, or in any peer repository was created or modified.
`scripts/dev/dev.sh` was not touched.

**Registry read before starting; rows CITED, never re-found.** ROOT-FINDINGS MT-F001, MT-F002,
MT-F007, MT-F008, MT-F011, MT-F012, MT-F016, MT-F017, MT-F018, MT-F019, MT-F020, MT-F021, MT-F022,
MT-F024. DISEASE-REGISTRY DR-12, DR-13, DR-14, DR-17, DR-18, DR-19, DR-20, DR-21, DR-26, DR-28,
DR-29, DR-33. DEFECT-LEDGER. `registry/adjudicated/parser-band.md` in full (the consistency duty).

---

## §0 — THE HEADLINE

Four sweeps returned 44 findings across the library band. I verified 41 of them against the tree
myself, refuted or materially corrected 6, and found **1 new BLOCKER the sweeps missed**. The
program that falls out is not "fix the parser". It is this:

> **One mechanism has produced three shipped crash classes in three different subpaths, and every
> gate this formation owns is structurally blind to all three.** A user-controlled string indexes a
> prototype-bearing object literal — `NAMED_COLORS` (`src/css/grammar.ts:265`), the `steps()` alias
> tables (`src/css/grammar.ts:461`, `src/css/stylesheet.ts:169`), and `PRESETS`
> (`src/easing.ts:168`). The third is NEW: `easing("constructor")` throws
> `TypeError: function is not iterable` in `./easing`, which no probe in this formation targets,
> which the adjudicated parser wave does not touch, and which is the exact symbol
> `fourier-analysis` must migrate to.
>
> And the second half: **the api's authorization model is not wired.** `visibility` is enforced on
> 1 of 10 palette read surfaces. Fourteen tranches of immaculate type discipline (`as any` = 0 in
> 10,869 lines) sit on top of a private palette that any stranger can read, version-walk and fork.
> MT-F021(c) called `api/src` "the mega-tranche's model." It is — for the properties types can
> carry, and for no others.

---

## §1 — VERIFICATION LEDGER (L-10; I re-measured, I did not inherit)

Every row below was re-derived in-seat. `CONFIRMED` = I reproduced the finding's own evidence.
`CORRECTED` = the finding stands but a stated number/path is wrong. `REFUTED` = the finding does not
hold as written.

### 1.1 — value-src sweep (MTS-01..MTS-15)

| id | verdict | my independent measurement |
|---|---|---|
| **MTS-01** prototype-reachable `parseCssColor` | **CONFIRMED** | `parseCssColor("constructor")` and `("__proto__")` → `TypeError: e.trim is not a function` against `dist/subpaths/css.js`. Inherited by `parseCssScalar`/`parseCssValue`/`parseCssValues`/`coerceToSyntax` (4/4) and by `parseStylesheet` on 5 CSS-embedded forms including `@keyframes k{from{color:constructor}}` and `a{animation:x 1s steps(2,constructor)}`. Controls: `"red"` ok, `"toString"`/`"valueOf"`/`"hasOwnProperty"` → `css_syntax` (correctly, because :265 lowercases first). Mechanism read at `src/css/grammar.ts:265` + `src/css/named-colors.ts:1` (`Object.freeze({…})` — freezes the object, not the chain). |
| **MTS-02** `steps()` type lie | **CONFIRMED** | `parseTimingFunction("steps(2, constructor)")` → `{ok:true, kind:"steps", count:2, position:<the Object function>}`; `("steps(2, __proto__)")` → `position: Object.prototype`. Control `"steps(2, start)"` → `"jump-start"`; siblings `valueOf`/`toString` correctly fail. Twin at `src/css/stylesheet.ts:163-171` read: guarded by `if (!position)`, which rejects `__proto__` and **admits** `constructor`. |
| **MTS-03** truncated path runs → NaN | **CONFIRMED** | `getTotalLength("M 0 0 L 10")`, `("M 0 0 C 1 1 2 2 3")`, `("M 0 0 Q 1 1 2")`, `("M 0 0 L 3 4 L 5")` → NaN, 4/4. Control `("M 0 0 L 3 4")` → exactly 5. |
| **MTS-04** compact arc flags | **CONFIRMED, and it is the worst row in the sweep** | expanded `"M 10 10 A 5 5 0 0 1 20 10 A 5 5 0 0 1 10 10"` → 31.403311569547547 (2πr = 31.41592653589793 ✓); byte-equivalent minified `"M10 10A5 5 0 0120 10A5 5 0 0110 10"` → **0**. Second pair: `"M0 0A1 1 0 011 1"` → 0 vs 1.5701655784773765. Silent, finite, plausible, wrong. |
| **MTS-05** singular `decomposeMatrix3D` | **CONFIRMED** | `decomposeMatrix3D([0,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])` → `{scale:[0,NaN,NaN], skew:[NaN,NaN,NaN], quaternion:[NaN,NaN,NaN,NaN]}` where the return type is `… | null`. Read `src/transform/decompose.ts:281-282` (no zero test on `scaleX`) against the working sibling ladder at `:234`/`:241` — the null channel is live and this case simply misses it. |
| **MTS-06** `./math` has no failure protocol | **CONFIRMED** | `deCasteljau(0.5,[])` → `undefined` typed `number`; `interpBezier(0.5,[])` → `[undefined,undefined]`; `lerpArray(len3, len2, .5, out3)` → `[2.5, 3.5, NaN]` silently. `scale(5,3,3)` throws — and I read `src/foundation/math.ts:15` computing the quotient **three lines before** the `fromMax === fromMin` guard at `:18`. |
| **MTS-07** fourier cannot resolve 4.0.0 | **CONFIRMED** | `package.json` exports map has exactly 7 subpath keys and **no `.`, no `main`, no `module`** (read via `require('./package.json')`). All 5 fourier sites use the bare specifier. `grep -rn timingFunctions src/` → 0. |
| **MTS-08** general serializer withheld + forked | **CONFIRMED** | `"serializeCssValue" in CSS === false`, `"serializeCssColor" in CSS === true`. Diff read: value's copy applies `.replace(/\s+([:;])/g,"$1")` at `src/css/stylesheet.ts:92`; keyframes' fork at `src/animation/compile/emit/css-text.ts:41-56` has no such normalisation. Value's copy throws a bare `TypeError` at `:86`. |
| **MTS-09** `./css` cannot name its own return types | **CONFIRMED, count corrected** | `dist/subpaths/css.d.ts` carries **18** bare `declare`s including `CssValue`, `CssScalar`, `CssCall`, `CssList`. Package-wide I measure **33**, not the sweep's 32 (color 1 · value 6 · css 18 · easing 2 · quantize 6 · math 0 · transform 0). Cause read at `src/css/index.ts:1-35` — the hand-enumerated barrel drops all six types `src/css/types.ts:135` re-exports. |
| **MTS-10** duplicated colour declarations | **CONFIRMED; the proposed gate REFUTED** | `css.d.ts` emits `Alpha_2`, `Channel_2`, `ChannelsBySpace_2`, `Color_2`, `SpaceId_2` with **58** `_2` references (sweep said 25 — it counted `_2` tokens in one pass, I count all references). Mechanism confirmed: `src/value.ts:1` reaches the barrel, `src/css/types.ts:1` + `src/css/grammar.ts:18,19` reach `../color/model`. **The sweep's gate is wrong** — see LIB-04 below. |
| **MTS-11** MT-F024's census is a line count | **CONFIRMED by independent method** | Robust per-file scan `/[A-Za-z0-9_$)\]]!(?!=)/g`: decompose 113 · grammar 72 · path 35 · stylesheet 18 · quantize 18 · anchors 11 · easing 11 · operations 8 · math 7 · timeline 4 = **297**, which equals MT-F002's independently-measured 297 and is 2.0× MT-F024's 148. `grep -rEn … | wc -l` → 148; `grep -rEo … | wc -l` → 291. src is **4,654** raw lines / 26 `.ts` files. |
| **MTS-12** benign/dangerous split | **CONFIRMED in substance** | Spot-read `src/transform/decompose.ts:105-118` (`mat4Identity()` literal), `:234-243` (`length !== 16` guard then `[...cssValues]`), `m4Get` indexing `col*4+row` from literal loops. The 113 are proofs the compiler cannot see. Against that, `src/foundation/math.ts:69` indexes a **caller-supplied** `Float64Array` under `!`. The contract axis is the right one; volume is not. |
| **MTS-13** dead/duplicated boundary items | **CONFIRMED (a)-(e), (f) REFUTED** | (b) `ColorFactory` at `src/color/index.ts:7` is dropped by `src/subpaths/color.ts` — verified, and it types 23 factories all of which return `Result<Color<S>, ColorIssue>`, so a consumer cannot type the wrapper. (f) **`src/.DS_Store` is NOT tracked**: `git ls-files src | grep -c DS_Store` → **0**; `.gitignore:4` is `.DS_Store`. The file exists on disk and git ignores it. A gate born-RED against it would be born GREEN. |
| **MTS-14** `./value` right-sizing | **CONFIRMED, numbers corrected** | Precise fan-out over git-tracked files: **demo** color 24 · css 10 · math 6 · easing 5 · quantize 4 · **transform 0 · value 0**; **test** easing 6 · css 8 · color 7 · quantize 2 · math 1 · transform 1 · value 1 — and both of the last two are namespace imports in the single surface-census file `test/v4-c1.test.ts:7-8`. So the verdict holds and is sharper than stated: `./transform` and `./value` have **zero product consumers in this repository** and their only in-repo touch is one shape test. |
| **MTS-15** stylesheet.ts is splittable | **CONFIRMED** | 899 lines, largest src file. Seam re-read from the export/function map: values grammar `:99-363` · blocks & at-rules `:365-745` · collectors `:747-899`. `src/css/index.ts` imports `parseStylesheet` from the middle and the seven `collect*` from the tail; nothing outside the file references the head. |

### 1.2 — keyframes consumer sweep (KF-*)

| id | verdict | my measurement |
|---|---|---|
| **KF-R1-REACH** | **CONFIRMED (static + mechanism)** | Pin verified `"@mkbabb/value.js": "4.0.0"` exact at `package.json:69`. 61 import statements / subpath split css 29 · value 15 · color 7 · math 5 · easing 3 · transform 2 — matches exactly. The three call sites read at `src/animation/resolve/browser.ts:165`, `engine/options.ts:31`, `compile/value-ast.ts:71`. I did not re-run the sweep's jsdom probe (it is committed and reproducible); the mechanism is the same `grammar.ts:181`/`:265` chain I confirmed above. |
| **KF-EASE-REF** | **CONFIRMED, executed** | Against keyframes' own installed 4.0.0: 40 names asserted, 0 rejected, **21 unstable references** — `ease, ease-in, ease-out, ease-in-out, ease-in-sine, ease-out-sine, ease-in-quad, ease-out-quad, ease-in-cubic, ease-in-quart, ease-out-quart, ease-in-out-quart, ease-in-quint, ease-out-quint, ease-in-out-quint, ease-in-expo, ease-in-circ, ease-out-circ, ease-in-back, ease-out-back, ease-in-out-back`. `src/animation/compile/easing/easing-registry.ts:36` docstring reads **"Stable identities let the serializer distinguish named curves from closures."** It is false for 21 of 40, and `emit/easing-serialize.ts:70-71` makes that falsehood load-bearing. |
| **KF-ATLAS-FENCE** | **CONFIRMED** | atlas at `/Users/mkbabb/Programming/atlas`: **16** root-specifier import statements, installed value.js **3.1.0**, `TimingFunction` imported from the value.js **root** at `src/platform/composables/useCountUp.ts:48` and used at `:92`. `TimingFunction` from keyframes appears at exactly one site (`src/motion/useScrollTimeline.ts:44`). Note for the record: SCOPE.md §1 lists atlas at `~/Programming/sci-report`; `~/Programming/atlas` is a distinct tree and is the one that carries these imports. |
| **KF-LEAVES-TAUT** | **CONFIRMED, and worse than stated** | `src/animation/internal/leaves.ts:28` is a bare `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math";`. `test/internal/leaves-parity.test.ts:1-7` opens *"`internal/leaves.ts` is a deliberate byte-copy … A byte-copy can silently drift"* — refuted 21 lines above it by `leaves.ts:6`, and `leaves.ts:19-21` still names *"the value.js barrel"*, which 4.0.0 does not publish. |
| **KF-PROVENANCE** | **CONFIRMED** | `sampleColorRamp` / `deltaEOK` are absent from all 7 subpaths (`./color` has 23 exports, neither among them); DR-21 records the same at HEAD. |
| **KF-SPLIT-HOME** | **CONFIRMED, executed** | 9 of 39 value.js-consuming files import from BOTH `/css` and `/value`: `compile/adapter.ts`, `compile/emit/{backward-color,css-text,format}.ts`, `compile/{interp-slot,value-ast}.ts`, `resolve/{browser,element-resolve,resolve-function}.ts`. |
| **KF-UNUSED-BLIND** | **CONFIRMED, executed** | `./node_modules/.bin/tsc --noEmit -p tsconfig.lib.json --noUnusedLocals` → **exactly 9 errors**, including `load-engine.ts(65,1) 'Stylesheet' is declared but its value is never read` — a dead `@mkbabb/value.js/css` type import in the file that defines the light/heavy value.js boundary. |
| **KF-EVAL-THROW** | **CONFIRMED** | `easing-registry.ts:32-48` read: `registryNames = [...Object.keys(bezierPresets), "ease-in-bounce", ...DIRECT_NAMES]` mapped through `easing(name)` at module scope with a `throw` on `!ok`. 40 asserted / 0 rejected today. `bezierPresets` has 30 keys. |
| **KF-41-DEMAND** | **CONFIRMED** | SCI-1's adopter is real (`compile/emit/backward-color.ts:171`); D-GAP-6's is not. |

### 1.3 — fourier / parse-that sweep (FP-*, ISO-*, PT-*)

| id | verdict | my measurement |
|---|---|---|
| **FP-01** | **CONFIRMED, executed** | `node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` — leg 1 RED, all 5 sites `ERR_PACKAGE_PATH_NOT_EXPORTED`. `web/package.json:18` `^0.13.0`; installed 0.13.0. |
| **FP-02** | **CONFIRMED** | leg 2 RED. `./easing` ships 16 flat names. |
| **FP-03** | **CONFIRMED, re-derived independently** | I re-ran the comparison myself over 1001 samples against fourier's installed 0.13.0 dist and reproduced the drift set **exactly**: `ease-out-circ` 1.923e-1 · `ease-in-expo` 6.930e-2 · `ease-in-circ` 4.489e-2 · `ease-in-quad` 4.157e-2 · `ease-in-cubic` 3.162e-2 · `ease-out-sine` 3.082e-2 · `ease-in-sine` 3.038e-2 · `ease-out-quad` 2.520e-2. **CORRECTED:** 0.13.0's `timingFunctions` has **55** keys, not 56. Root cause read at `src/easing.ts:94-132` (`DIRECT_EASINGS` keeps only the in-out arms) + `:166-171` (everything else falls through to the bezier `PRESETS`). |
| **FP-04** | **CONFIRMED** | `web/src/lib/colors.ts:22-53` has four arms (hex, `hsl()`, bare-HSL triplet, `rgb()`) and `return "#888888"` at `:52`. fourier's own installed glass-ui **4.0.0** ships `--viz-fourier: oklch(0.579 0.201 30.4)` (`dist/styles/tokens/color-radius.css:263`) and `oklch(0.693 0.151 28.1)` in the dark arm (`tokens/dark-arm.css:113`). The local override at `web/src/style.css:113-125` covers `--viz-amber` only, and its comment still asserts a `hsl(35 70% 42%)` glass ships no longer. |
| **ISO-01** | **CONFIRMED, executed** | `API-FACILITY-ISOMORPHISM.json`: 18 facilities, `counts.total` 146. Substring scan: `easing` false · `npm` false · `library` false · `subpath` false · `parseCss` false · **`value.js` false**. The contract does not contain the string "value.js". |
| **ISO-02** | **CONFIRMED** | `grep -rnE '@router\.(get|post|patch|put|delete)' api/routers/*.py | wc -l` → **30** against the contract's `counts.fourier.http = 41`. |
| **PT-01/03/04/06/07** | **CONFIRMED, executed** | `node parsethat-surface-gaps.mjs` → **7 RED, exit 1**. Depth ceiling measured at 7761 with `RangeError` thrown at 7762. Packrat latch: UNARMED **93.9 ns/parse**, ARMED **138.2 ns/parse** (**1.47×**), and `resetPackrat()` leaves it at 139.3 — it does not disarm. `parseState(non-string)` 5/5 throw; `.parse()` returns `undefined` on failure. |
| **PT-02** | **CONFIRMED, executed** | `npx tsx candO-expected-parity.mjs` → **5 of 7** inputs where the published parser names an expectation and cand-O emits `[]`: `"notacolor"`, `"light-dark(red, blue)"`, `"#gg"`, `"hsl(1 2)"`, `""`. |
| **PT-05/PT-08** | **CONFIRMED (structural)** | parse-that's exports map has 5 keys; `dist/core.js` line 1 imports from the shared `packrat-entry-*` chunk. dist-drift is a record-only row. |

### 1.4 — api band (AB-*)

| id | verdict | my measurement |
|---|---|---|
| **AB-1** | **CONFIRMED (static, four sites)** | `getPaletteBySlug` (`service/crud.ts:44-70`) checks `deletedAt` only. `listVersions` (`service/versions.ts:86-98`) reads `palette_versions` and never touches `palettes`. `forkPalette` (`service/forks.ts:50-51`) is `if (!source) throw NotFoundError` with no visibility test, and `:76` mints the child `visibility: "public"`. `isActivePublic` has **exactly one** call site repo-wide (`service/forks.ts:201`, the provenance redaction), 150 lines below the fork that copies private colours wholesale. Enforcement sites total: **2**, both in `service/crud-list.ts:113,115`. |
| **AB-2** | **CONFIRMED (static + BSON semantics)** | `encodeCursor` writes `_id: String(doc._id)` (`service/crud-list.ts:61`); `keysetPredicate` emits `{_id: {$lt: cursor._id}}` in all three clause sets (`:136,:143,:150`). `PaletteRepository.insert` (`repository/palette.ts:102-105`) calls `insertOne` with no `_id`, so the driver mints an **ObjectId** — and MongoDB `$lt`/`$gt` are type-bracketed, so a String operand matches nothing. The docblock at `:120-127` states the opposite premise in writing and is the justification for the `Record<string, unknown>` widening. |
| **AB-3** | **CONFIRMED** | `repository/paletteVersion.ts` exposes `findByHash`, `findByPaletteSlug`, `countByPaletteSlug`, `insertIfAbsent` — **zero** delete methods. `admin/service/users.ts:170-183` cascades votes/flags/palettes/sessions/adminAudit/users; `cron.ts:46-53` cascades palettes/votes/flags. Neither touches versions. |
| **AB-4** | **CONFIRMED** | `routes/versions.ts:43-47` binds `hash` and never reads `slug`; `getVersionByHash(services, hash)` filters `{_id: hash}`. |
| **AB-5** | **CONFIRMED** | `migrations/check.ts:83` `db.collection("palettes").find({})` with a `for await` over every document; `assertMigrationsApplied` ends in `process.exit(1)` at `:145`; `main.ts:49` runs it before `serve()`. |
| **AB-6** | **CONFIRMED** | 3 demo call sites each minting `crypto.randomUUID()` inline (`demo/palettes/api/palettes.ts:80,145,161`) — no application-level retry can ever hit the store. `sweepExpired` has exactly one caller (`platform/http/rate-limit.ts:81`), which sweeps the rate limiters and not `replayStore`. Window 24h, cap 50,000 (`platform/http/idempotency.ts:53-54`). |
| **AB-7** | **CONFIRMED, line corrected** | `.github/workflows/ci.yml:**70**` (not :79) is `- run: npx tsc --noEmit` under `working-directory: api`. `api/tsconfig.json:21-22` includes `["src"]`, excludes `src/**/__tests__/**`. `api/tsconfig.test.json` is tracked (`git ls-files api/` confirms) and has zero consumers. |
| **AB-8** | **CONFIRMED, one number corrected** | `api/src`: `as any` **0** · `as unknown as` **1** · `@ts-ignore`/`@ts-expect-error` **0** · non-null `!` **7 non-test** (sweep said 6) + 3 in tests. Live tree is `src/modules/{admin,color,meta,palette,session}` + `src/platform/`; `src/crud`, `src/lib`, `src/ownership.ts`, `src/models.ts` do not exist. mongodb-memory-server binaries cached (`mongod-arm64-darwin-{7.0.24,8.2.6}`) — the api **is** runnable here. |
| **AB-9** | **CONFIRMED, and the naive grep would have refuted it** | My first pass showed `provenance` 5 demo hits and `suspend` 6 — **every one is a prose comment or an unrelated identifier** (`GenerateControls.vue` bench-note prose, `belt-and-suspenders`). Zero route consumers. `setUserStatus` (`admin/service/users.ts:123`) and `batch.ts:89` are the only `"suspended"` writers and both are on unconsumed routes, while `session/resolve.ts:44` carries a dedicated cache + throw to enforce it. This is MT-F022's lesson firing in my own hands. |
| **AB-10 / AB-11** | **CONFIRMED** | `assertVisibilityTransition` (`service/visibility.ts:51-59`) guards `PALETTE_VISIBILITIES.includes(to)` where `to` is already `PaletteVisibility`; `void from;` at `:58`. Zero callers outside its own file. |
| **AB-12** | **ACCEPTED as the band's negative half** | Not re-run (it is the sweep's own live measurement and it costs 24s of runner time); recorded so no wave born-REDs against OpenAPI parity, Hono body caching, or session TTL. |

### 1.5 — Corrections that change no disposition (L-10, the cheapest kind to land)

1. `MT-F024` §"Scope of the ban, measured": **148/141 are grep LINE counts**, not site counts. The
   population is **297/288**, per-file `decompose 113 · grammar 72 · path 35 · stylesheet 18 ·
   quantize 18 · anchors 11 · easing 11 · operations 8 · math 7 · timeline 4`. MT-F024's conclusion
   (do **not** spec a blanket ban) survives the correction and is strengthened.
2. `MT-F002` records `src/` at **3,192 LOC**. Measured today: **4,654 raw** / 4,371 non-blank /
   4,056 non-blank-non-comment / 4,491 excluding `src/subpaths/`. None of the four reproduces 3,192.
   The assertion **density** is therefore 1 per 15.7 lines, not 1 per 10.7.
3. `DR-12`'s wave shape says *"Enable `no-non-null-assertion` at least under `src/css/`
   (12 assertions remain)"*. Measured: `src/css/` carries **94** (grammar 72 · stylesheet 18 ·
   timeline 4). The disposition (BUILD) is unchanged; the number in it is 7.8× low, which matters
   because it is the number the wave would be sized against.
4. `MTS-13(f)` `src/.DS_Store` is **untracked** — `.gitignore:4`. Struck from the wave.
5. fourier's 0.13.0 `timingFunctions` has **55** keys, not 56.
6. `api/src` non-null assertions: **7** non-test, not 6. (Still a **42×** density gap against
   `src/`'s 297-in-4,654 — MT-F021(c)'s point stands on the corrected number.)

---

## §2 — NEW ROWS (this band's own findings; none duplicates a registry row)

Gate for all five: `node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs`
→ **RED today, exit 1, 12 failing assertions.**

### LIB-01 · BLOCKER · a THIRD prototype-reachable crash, in `./easing`, that no gate targets

```
$ node -e "import('./dist/subpaths/easing.js').then(E=>{
    for (const n of ['constructor','__proto__','toString','valueOf','hasOwnProperty'])
      try { E.easing(n) } catch (e) { console.log(n, '->', e.message) } })"
constructor     -> function is not iterable (cannot read property Symbol(Symbol.iterator))
__proto__       -> object is not iterable (cannot read property Symbol(Symbol.iterator))
toString        -> function is not iterable ...
valueOf         -> function is not iterable ...
hasOwnProperty  -> function is not iterable ...
```

**Mechanism.** `src/easing.ts:167` correctly uses `Object.hasOwn(DIRECT_EASINGS, name)`. `:168` then
uses `if (!(name in PRESETS)) return err(...)` — and `in` walks the prototype chain. `:169`
destructures the result: `const [x1,y1,x2,y2] = PRESETS[name as BezierPresetName]`. The `as` cast
is what lets it compile. Because there is no `.toLowerCase()` on this path, **five** keys are
reachable here versus MTS-01's two.

**Why it is new and why it matters more than its size suggests.**
- `r1-published-totality.mjs` (parser-band gate **G1**) enumerates `FNS = ["parseCssColor",
  "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseStylesheet",
  "parseTimingFunction", "parseAnimationTimeline", "parseAnimationRange"]` — nine `./css` parsers.
  `./easing` is not in it, and never will be: G1 is the colour-parser gate.
- `src-surface-totality.mjs` (the value-src sweep's gate) covers `./css` MTS-01/02 only.
- The adjudicated parser wave replaces the **colour grammar**. It does not touch `src/easing.ts`.
- keyframes calls `easing(name)` at **module evaluation** (`easing-registry.ts:43`), so an
  `easing()` that can throw sits under `loadAnimationEngine()`.
- **`easing(name)` is the migration target this program hands fourier-analysis** (ISO row I-4). We
  would be routing a consumer onto a crashing entry point.

**Disposition: BUILD → W.L1.**

### LIB-02 · MAJOR · the totality gate's blind spot, measured

33 published functions across 5 of the 7 subpaths throw on at least one JS-boundary value
(`undefined, null, 42, {}, [], "", NaN`): `css=18 transform=8 math=5 easing=1 value=1`. **15 of the
33 are outside G1's `FNS` list** — the eight `collect*` collectors, `coerceToSyntax`,
`serializeTimelineOptions`, `linearEasing`, and the whole of `./math`/`./transform`.

This is not a re-finding of MT-F024 (which is the empty-argument class in `./css`) nor of MT-F019
(which is `PathGeometry` on M-less paths). It is a statement about **the gate**: the formation's
anchor probe is scoped to the colour-parser surface, its corpus is empty-argument *strings*, and it
is therefore structurally blind (L-12) to both the prototype class and the whole non-`./css`
surface. A parser wave that closes GREEN on G1 leaves 15 total-contract violations shipping.

**Disposition: BUILD → W.L1 (the widened gate), with the per-subpath slices FOLDED into W.L2/W.L3.**

### LIB-03 · MAJOR · the public-surface law has no mechanism, measured three ways

`33` bare `declare`s across the emitted subpath `.d.ts` (color 1 · value 6 · css 18 · easing 2 ·
quantize 6). `./css` withholds `serializeCssValue` and `serializeKeyframeSelector`. `./color`
withholds `ColorFactory`, which types all 23 colour factories. `./css` cannot name the four AST
types it returns. One mechanism: **two hand-maintained lists (leaf `export`, barrel forward) with
nothing reconciling them.** **Disposition: BUILD → W.L4.**

### LIB-04 · MINOR · MTS-10's proposed gate would introduce a cycle — the correct rule, stated

The sweep specs `grep -rn 'from "[^"]*color/model"' src | grep -v src/color/index.ts | wc -l` must
be 0, RED at 5. Two problems. (a) I measure **2 files / 3 statements** matching that pattern
(`src/css/grammar.ts:18,19`, `src/css/types.ts:1`) — the other two sites the sweep counted
(`src/color/anchors.ts:1`, `src/color/operations.ts:15`) use the *relative* `"./model"`.
(b) More importantly, **those two MUST import `./model`**: `src/color/index.ts` re-exports them, so
routing them through the barrel creates a cycle. The gate as written demands a defect.

**The correct rule** (implemented in `library-band-gates.mjs` LIB-04): *outside* `src/color/`, the
model module is unreachable; colour types cross the directory boundary through `./color/index` only.
RED today at 2 files, and the observable is 5 mangled declarations / 58 references in `css.d.ts`.
**Disposition: FOLD → W.L4.**

### LIB-05 · INFO · the god-module cap, re-measured with `wc -l` semantics

5 files over 350: `stylesheet.ts 899 · decompose.ts 609 · path.ts 564 · grammar.ts 483 ·
anchors.ts 377`. Identical to DR-18's verified-at-HEAD list — **nothing here is re-found**; the row
exists so the cap has a runnable command attached to it for the first time.
**Disposition: FOLD → DR-18, home W.L4 (see R-11).**

---

## §3 — THE RULINGS

### R-1 — THE PUBLIC-SURFACE LAW (the band's central ruling)

> **A subpath publishes the transitive closure of what its own signatures name.** A symbol is either
> forwarded to a subpath or it is not `export`ed from its leaf. There is no third state.

Enforced **structurally** (L-8), not by a gate that decays: the subpath barrels stop being
hand-enumerated lists and become derived. Concretely, `src/subpaths/*.ts` becomes `export * from
"../<area>/index"` for the runtime half plus an explicit `export type *`, and the *area* barrel
(`src/css/index.ts`, `src/color/index.ts`) is the single place where public/internal is decided.
Anything genuinely module-internal loses its `export` keyword or moves behind an `internal.ts`.

The residual gate (LIB-03) exists only as the regression fence, and it asserts a **product
property**: zero bare `declare` in the emitted `.d.ts`, which is the observable of the law being
broken. Companion: a **consumer-compile probe** — a clean package that does
`import type { CssValue } from "@mkbabb/value.js/css"` and runs `tsc --noEmit`. That is the gate
that would have caught this at the 4.0.0 cut and did not exist.

### R-2 — MODULE TOPOLOGY: three rulings

**R-2a — the colour boundary.** Outside `src/color/`, colour types are reached through
`./color/index`. Inside it, `./model` is the sibling and must stay. This is a 3-statement edit in 2
files (`src/css/types.ts:1`, `src/css/grammar.ts:18,19`), no public-surface change, and it deletes
5 duplicated declarations and 58 `_2` references from `css.d.ts` — 41% of the package's type surface
is that one file.

**R-2b — `stylesheet.ts` splits three ways, and DR-18 discharges rather than carries.** The seam is
measured and cycle-free: `css/animation-values.ts` (`:99-363`, 265 lines) · `css/at-rules.ts`
(`:365-745`, 381) · `css/collect.ts` (`:747-899`, 153). Exactly two cross-seam edges
(`parseDeclarations` → `optionDeclarationValid`; `collectAnimationOptions` → the value readers).
`src/css/index.ts` re-points its forwards and the exports map is byte-identical.
**DR-18's own words — "One measured number, in CI or not at all" — are better satisfied by removing
the breach than by wiring a cap that is then permanently RED at five files.** Scope this wave to
`stylesheet.ts` alone; `decompose/path/grammar/anchors` carry as **named residuals with stated
scope**, which is MT-F024's own completability discipline applied to itself.

**R-2c — `./value` is not deleted, and `./css` grows to meet it.** `./value` publishes one runtime
symbol and four types; it has 0 demo consumers here and **26 downstream import sites in keyframes**,
23 of which exist only to name the return type of a `./css` call. The KISS answer is additive:
`./css` re-exports `CssCall`/`CssList`/`CssScalar`/`CssValue`. `./value` keeps its five exports.
Nothing breaks, the `/css`+`/value` tax on 9 keyframes files disappears at the pin bump, and MTS-09
is cured for free. **`isLayoutTrackingUnit` does NOT move** — moving it is a breaking change for 3
keyframes sites and buys a cosmetic tidiness. (Recorded as the explicit rejection of shape (ii), so
no later wave re-opens it as a question.)

### R-3 — THE ASSERTION POPULATION IS SPLIT BY CONTRACT, NOT BY VOLUME

`297` total. **Benign — leave alone, record the proof once per file in a header comment:**
`decompose.ts 113` (every read is into `mat4Identity()` / `new Array(16).fill(0)` / `[...cssValues]`
behind a `length !== 16` guard, indexed by literal loops), `quantize.ts 18`, `easing.ts 11`,
`operations.ts 8` = **150**. **Dangerous — the enclosing contract is totality and the indexed
collection's length is input-derived:** `grammar.ts 72`, `path.ts 35`, `stylesheet.ts 18`,
`math.ts 7` = **132**. Mixed (regex-capture reads): `anchors 11`, `timeline 4` = 15.

**Ruling.** No wave in this program adopts MT-F002's global *"zero unproven `!` in `src/`"* gate: it
is RED at 297 with 150 unfixable-without-loss, which is an arc wearing a wave's name (L-1). The
reduction waves scope to the 132, per file, and the behavioural proof that the deletions were real
narrowings — not `?? 0` in disguise — is that W.L1/W.L2/W.L3's crash gates go GREEN.

**Consistency with the parser band:** G8's *"comment-stripped textual zeros (`!`, `as any`, …)"*
applies to the **new** cand-O grammar files, where the candidates already achieve zero under
`noUncheckedIndexedAccess`. It is not a `src/`-wide ban and this ruling does not weaken it.

### R-4 — THE ISOMORPHISM SHAPE: a 19th facility, `library-surface`

D-15 ratified full isomorphism between value's `/api` and fourier's API. The ratified contract
(`API-FACILITY-ISOMORPHISM.json`, 18 facilities / 146 operations) contains the string `value.js`
**zero times**. Meanwhile the only value↔fourier coupling that exists in the tree is a **library**
coupling, and all four of its strands are broken.

**Ruling.** The isomorphism is extended, not reinterpreted. Add facility 19 `library-surface`,
governed by the same law the other 18 carry (bidirectional · intrinsic-job-equivalence ·
each-symbol-exactly-once · the four relations), populated from the table below. Also annotate
`counts` as `as-specified` and add a sibling `as-built` census with its command (fourier http = 30
at HEAD, not 41) so no later close cites a target as a measurement.

**The symbol table — what a first-class library pairing requires of value's surface.** Every STATUS
cell measured against `dist/` at 4.0.0 in this seat.

| # | symbol (subpath) | signature | status 4.0.0 | fourier obligation |
|---|---|---|---|---|
| I-1 | the entry point | — | **7 subpaths, no `.`, no `main`, no `module`** | all 5 bare-specifier sites. **RULED: the bare specifier stays retired** (D-1); the contract names the subpath per consumer and fourier migrates to `@mkbabb/value.js/easing`. |
| I-2 | `timingFunctions` (`./easing`) | `Readonly<Record<string, EasingFunction>>` | **DELETED** (0 in `src/`) | `easings.ts:9` + the `Object.fromEntries` construction at `:55-58`. **RULED: not restored.** A resolver is the right shape; the consumer needs I-3 instead. |
| I-3 | `easingNames()` (`./easing`) | `() => readonly string[]` | **ABSENT** | lets fourier enumerate instead of hard-coding a 22-key label table that can silently desync. **SHIP in 4.1.** |
| I-4 | `easing(name)` (`./easing`) | `(name: string) => Result<EasingFunction, EasingIssue>` | EXISTS `src/easing.ts:166` — **and crashes on 5 prototype keys (LIB-01)** | resolves all 22 names, but 8 return a bezier **approximation** where 0.13.0 returned the analytic curve, max\|Δ\| 0.192. **SHIP an `approximated: boolean` discriminant on the ok arm** so a consumer can refuse the substitution; **and W.L1 must land first.** |
| I-5 | `parseCssColor` (`./css`) | `(source: string) => ParseResult<CssColor>` | EXISTS — crashes (MT-F024, MTS-01) | replaces fourier's `hsl()`/`rgb()` regex arms. **Blocked behind W.L1 + the parser band.** |
| I-6 | `toHex` (`./color`) | `(color: AnyColor) => Result<string, ColorIssue>` | **ABSENT** | **THE gap for FP-04.** `serializeCssColor` emits `"oklch(57.9% 0.201 30.4deg)"` (verified); fourier's `VIZ_COLORS` is a hex store with 50 read sites. Without a hex emitter the pairing cannot delete `cssVarToHex`. **SHIP in 4.1.** |
| I-7 | `convertColor` (`./color`) | `<S>(color, space: S) => Result<Color<S>, ColorIssue>` | EXISTS | verified live: oklch → `{rgb, [215.046…, 53.132…, 34.985…], 1}`. |
| I-8 | `toRgba8` (`./color`) | `(color, options: {gamut:"clip"}) => Result<RGBA8, ColorIssue>` | EXISTS, **options bag required** | replaces `hexToRgb`/`hexToRgba`. Omitting the bag returns `color_invalid_input` — verified. Document it; do not change it. |
| I-9 | `resolveCssColor` (`./css`) | `(source, ctx:{vars, scheme}) => ParseResult<CssColor>` | **ABSENT** | `var(--section-color-4)` → `color_context_required` and `light-dark(oklch(…),oklch(…))` → `css_syntax` — **both verified**, and both appear verbatim in `getComputedStyle` output for glass-ui custom properties. Without this, FP-04 only half-closes. **SHIP in 4.1.** |
| I-10 | ONE failure contract | `ParseResult<T>{ok,value,diagnostics}` vs `Result<T,E>{ok,value\|error}` | **two shapes shipped side by side** — verified: `parseCssColor` failure has `diagnostics[]` and **no `error` key**; `easing`/`convertColor`/`toRgba8` failures have `error.code` | TypeScript catches the confusion, so this is MINOR — but the isomorphism contract must **name** which shape crosses the repo boundary, and today it names neither. **RULED: `ParseResult` for text→AST; `Result` for value→value. Written into the contract, not changed in code.** |

### R-5 — THE 4.1 ADDITIVE SET, one dated cut

DR-21 is explicit that *"a ship label with no date, attached to a wave that can decline to close, is
a deferral"* and that this class has ridden eight closes. The ruling is therefore **one cut, one
date, one coordinated bump** — the 4.1 cut and the keyframes pin bump are **one event**, because
under the exact `4.0.0` pin nothing in a 4.1 is visible to keyframes until the pin moves.

**SHIP (additive only; nothing removed, nothing renamed):**

| id | symbol | subpath | why, measured |
|---|---|---|---|
| A-1 | `serializeCssValue`, `serializeKeyframeSelector` | `./css` | MTS-08 — keyframes forked both and the forks have diverged on `:` / `;` normalisation. **Convert the bare `TypeError` at `stylesheet.ts:86` to the module's `Result` idiom before publishing it** — publishing a throwing serializer from a "failure-explicit" package repeats MT-F024 in the opposite direction. |
| A-2 | `CssCall`, `CssList`, `CssScalar`, `CssValue` | `./css` | R-2c. Zero-risk, cures MTS-09, deletes 13 redundant keyframes imports. |
| A-3 | `ColorFactory` | `./color` | types all 23 factories; unnameable today. |
| A-4 | `easingNames()` | `./easing` | ISO I-3. |
| A-5 | `toHex(color)` | `./color` | ISO I-6 — **the FP-04 blocker.** |
| A-6 | `resolveCssColor(source, ctx)` | `./css` | ISO I-9. |
| A-7 | `sampleColorRamp` / `mixColorsInto` / `toRgba8Into` | `./color` | **DR-21 (SCI-1), BUILD.** The evidence tuple DR-21 says is owed now exists and is measured: `keyframes/src/animation/compile/emit/backward-color.ts:171-190` allocates `count` AnyColor objects per call and is invoked twice per declared stop-pair per changing colour key — at the densify stop count (`:250`) and at **1024** for the deltaE reference ramp (`:263`). That is the out-buffer shape SCI-1 describes, in the exact place the registry says the tuple is owed. |
| A-8 | memoised `easing(name)` | `./easing` | the value-side complement to KF-EASE-REF: return a stable reference per name. Additive, invisible to a consumer that does not compare references, and it makes keyframes' 21 unstable curves stable. **It is NOT the cure** — the consumer-side cure ships regardless, because value cannot reach keyframes under the exact pin. |

**DECLINE / RETIRE, with the measured reason:**

- **D-GAP-6 `sampleBezier` — RETIRED, permanently.** `grep -rn 'sampleBezier|cubicBezierToSVG|sampleCubic' keyframes/src keyframes/demo` → **0**. keyframes never built the local sampler the DECLINE blessed because `linearDensifyEasing` (`compile/emit/easing-serialize.ts:38-45`, 8 lines) already samples **any** `TimingFunction` at 33 points and is strictly more general than a bezier-only sampler. The existing DECLINE was accepted on intent; this closes it on demand. An un-dated 4.1 conditional riding a wave that can decline to close is the deferral shape DR-21 names.
- **Adding any key to `bezierPresets` — FENCED, not shipped in 4.1.** keyframes derives `registryNames` from `Object.keys(bezierPresets)` (`easing-registry.ts:32-35`) and publishes the derived `timingFunctionEntries` (`:37`), which `easing-serialize.ts:71` scans with `.find()`. A new preset silently changes keyframes' **public** registry length, order and reverse-lookup winner. 30 keys today.
- **Removing or renaming any of the 40 catalog names — FENCED.** keyframes asserts them at module evaluation and `throw`s (`easing-registry.ts:43-47`), which turns `loadAnimationEngine()` into a boot crash. 40 asserted / 0 rejected today.

### R-6 — THE API DISPOSITIONS

| row | disposition | home |
|---|---|---|
| **AB-1** private is a browse filter, not a control | **BUILD** — `assertReadable(doc, currentUserSlug)` on the four unguarded reads; fork of a non-public source → 404, matching the browse list's "invisible means absent" | **W.L8**, and it is a **PRECONDITION on DR-28's UI arm**, not a sibling of it |
| **AB-3** `palette_versions` has no delete path | **BUILD** — `deleteByPaletteSlugs` threaded into the three cascades inside the existing transactions | W.L8 |
| **AB-4** `/versions/:hash` ignores `:slug` | **BUILD** — filter `{_id, paletteSlug}` or retire the route (0 demo, 0 e2e consumers) | W.L8 |
| **AB-10** `versionCount: 1` with 0 rows; null-owner rows permanently 404 | **BUILD** — `versionCount` follows the write; split `requireOwnership`'s null branch | W.L8 |
| **AB-11** `assertVisibilityTransition` is a tautology | **RETIRE by subtraction** — delete it and record in canon that value's `(visibility, tier)` model has **no** forbidden transitions. **No gate** (L-8: a gate over a tautology is a second tautology). | W.L8, same commit |
| **AB-2** keyset tiebreakers are dead | **BUILD** — brand the cursor `_id` back to `ObjectId` (or tiebreak on `slug`, which is a string and uniquely indexed) and **delete the false docblock** rather than carry it | **W.L9** |
| **AB-5** boot probe is an unbounded fail-closed scan | **BUILD** — one indexed `countDocuments` with a `$nor` of the invariant predicates; log loudly; let the server start; the hard failure moves to the read boundary where `formatPalette` already has the contract | W.L9 |
| **AB-6 / DR-33** the replay store is write-only | **RETIRE — but RE-PREMISED FIRST.** DR-33's disposition ("retire by recording the truth") is honoured and is *unchanged*; what changes is the truth. The relaxation was never the defect: **the consumer is.** Three per-invocation `crypto.randomUUID()` calls make the middleware unreachable, and it is the only LRU in the process with no sweeper, holding up to 50,000 captured response bodies for 24h in a 256 MB container. Retiring the row as currently written would canonise a no-op. **Do (a) lift the key to the logical operation, or (b) delete the middleware and the three call-site keys together and record the subtraction. Not neither.** | W.L9 |
| **AB-7** CI typechecks 70% of the api | **BUILD** — `- run: npx tsc --noEmit -p tsconfig.test.json` at `.github/workflows/ci.yml:70`. One flag. The config is already tracked, already correct, already green, and has had zero consumers since E.W2 authored it. | W.L9 |
| **AB-9** 9 of 51 routes have no consumer | **RULE, then BUILD** — one sitting, not per-route: `/versions/:hash` retires with AB-4; `/forks` and `/provenance` are load-bearing for DR-28's UI half and are **WIRED** there (provenance is the one surface that already redacts correctly); the four admin rows are the owner's call, and **suspend in particular is either wired into `AdminUsersPanel` or the whole enforcement path in `session/resolve.ts:28-53` deletes with it** | W.L9 + DR-28's UI wave |
| **AB-8 / AB-12** | **RETIRE (record-only)** — two ledger corrections: any future api brief names `modules/` + `platform/`, not the L-era `crud/`/`lib/`/`ownership.ts`/`models.ts`; and "api is NOT runnable here" is struck — the harness is `cd api && npm test`, cold-start included, and it is the default evidence standard for every api row | W.L8 preamble |

### R-7 — CONSISTENCY WITH THE ADJUDICATED PARSER BAND (the standing duty)

Nothing in this program contradicts `registry/adjudicated/parser-band.md`. Where they touch:

1. **cand-O's null-prototype keyword tables are the adjudicated architecture** and the verdict cites
   them by name as *"closing a real bug class (`color(constructor 0 0 0)`)"*. MTS-01 is the **same
   class in the incumbent**, and W.L1's cure is the same structure applied to the incumbent's three
   remaining sites. This is agreement, not overlap.
2. **The parser wave does NOT close MTS-02 or LIB-01.** It replaces the colour grammar.
   `parseTimingFunction`'s alias table (`grammar.ts:461`), `stylesheet.ts:169` and `easing.ts:168`
   are outside its scope. W.L1 owns them.
3. **G1 stays exactly as written and stays wired.** The verdict says so explicitly (*"it targets ALL
   nine public parsers, so the colour wave discharges only its slice and the probe stays wired until
   the whole surface is total"*). LIB-02 does not modify G1; it adds a **sibling** probe with a
   wider surface (all 7 subpaths) and a wider corpus (prototype keys + JS-boundary values), because
   G1's corpus is empty-argument strings and is blind to both.
4. **G6 gains a third leg from PT-02**, as the parser band's own dissent invites: field-for-field
   `{code, offset, expected, actual}` agreement on the **rejection** corpus against the vendored
   sha-pinned tarball. Measured: cand-O emits `expected: []` on 5 of 7 inputs where the incumbent
   names a real expectation. G6 as written is `{space, channels, alpha}` — the **success** shape —
   so a candidate can be bit-perfect on accepts and still ship a strictly poorer rejection contract
   than the parser it replaces, in a band whose whole thesis is what happens when a parse fails.
5. **The three binding debts that are blocked against published parse-that 1.0.0 are re-specified,
   not disputed.** Debt #1 (labelled diagnostics) cannot be discharged by consuming parse-that: the
   label mechanism is a no-op unless a process-global flag is on, and that flag arms an unconditional
   `console.error` on every failed top-level parse. P00/P01 forbids consuming an unpublished
   novelty, so **the wave writes its own labelled-failure primitive value-side and says so in
   writing.** Debt #3 (recursion bounded by construction) has no mechanism in 1.0.0 — `Parser.lazy`
   is arity 1 and the failure mode past 7,761 frames is a thrown `RangeError` — so it re-specifies
   to *either* flatten the balanced tail to an iterative scan (cand-F's proven posture, closing the
   DISSENT toward cand-F) *or* keep the shield and pin the ceiling by test (closing it toward
   cand-O). Both are adjudication-compatible; leaving it open is not.
6. **G7 gains an ARMED cell.** `PACKRAT_ARMED` is a process-global one-way latch: one `memoize()`
   anywhere in the process taxes every subsequent `parseState()` on every parser by **1.47×**
   (93.9 → 138.2 ns/parse, measured in separate processes), and `resetPackrat()` does not lower it.
   Every G7 bar is published twice, armed and unarmed, or it is not published. **Nothing here
   pre-empts OC-1** — it is one more honest input to the bench-bar recalibration, exactly as the
   verdict's own honesty law frames its numbers.
7. **The verdict's "no new tranche of speed theater" posture is preserved.** This program makes no
   performance claim outside a printed table.

### R-8 — CONSISTENCY WITH THE DISEASE-REGISTRY DISPOSITIONS

| row | registry disposition | this program |
|---|---|---|
| DR-12 | BUILD, W.W2 parser honesty, 4.0.1 cut | **honoured.** W.L1 is the non-colour half of the same cut. One `src/css/` figure corrected (12 → 94) with no change of disposition. |
| DR-17 | FOLD with DR-18 into a STRUCTURE wave | **honoured.** DR-17 (the demo cap) stays with W.W8; DR-18's `src/` half re-homes to W.L4 with its identity intact — see R-11. |
| DR-18 | FOLD; "book the 899-line residual by name" | **honoured and discharged.** The residual is named, the seam is measured, the split is specced. |
| DR-19 | RETIRE; structural ban on `scripts/**/proof-*.mjs` | **honoured.** Every gate in this program is either a probe under `docs/tranches/V/megatranche/audit/probes/` or a real `vitest` test asserting product behaviour. **No `proof:*` script is created by any wave here.** |
| DR-20 | RETIRE (`Color.try` et al.) | **honoured, and reinforced.** The v4 surface is Result-returning, which is what the row wanted — *except exactly where it throws*, and W.L1/W.L2/W.L3 close those. |
| DR-21 | BUILD; ship in the same cut as DR-12's 4.0.1/4.1.0 | **honoured.** W.L6 is that cut, with the measured evidence tuple attached (A-7). |
| DR-26 | BUILD (external vectors, W.W2) | **not touched.** Named as W.L2's ENV note only: `test/v4-color-behavior.test.ts` is not a valid oracle for this band's colour claims. |
| DR-28 | BUILD, W.W7 palette | **honoured, with a sequencing rider**: AB-1's api gate is a **precondition** on DR-28's UI arm. |
| DR-33 | RETIRE by recording the truth | **honoured; the truth is re-premised.** See R-6. |

### R-9 — WHAT THIS PROGRAM DOES NOT DO

Recorded so no reader mistakes silence for an omission: it does not touch `demo/` layout (M-13, the
layout-gestalt band), glass-ui rows (M-7 — BJ is not ours), the visual/π obligations, boot/LCP
(DR-06), CI restoration (DR-09/DR-10/DR-11), or the parser candidate selection (adjudicated).

### R-10 — ENV AND BLINDNESS (L-12, per band)

Every gate in this program runs in **node against the BUILT `dist/subpaths/` artifact**, not the
source tree and not the dev server. What that environment cannot see: browser CSSOM semantics
(FP-04's `getComputedStyle` claim about unregistered custom properties is transcribed faithfully but
is the one step a headed capture would independently confirm — **W.L5 takes exactly one DevTools
`evaluate` on fourier's dev server before landing the cure**, per the probe-parsimony edict);
Safari/WebKit divergence; and anything about real GPU behaviour. The api gates run against
`mongodb-memory-server` on a single-node replica set — they cannot see multi-replica behaviour,
which is precisely the reopening condition DR-33 states as a deployment fact.

### R-11 — THE ANTI-RENAME NOTE (L-5)

DR-18 keeps its identifier for life. Re-homing it from W.W8 to W.L4 is a **home**, not a rename, and
it comes with a terminal disposition (the split lands or the row is RETIRED at close with the cap
deleted from `ARCHITECTURE.md`) rather than a carry. No row in this program acquires a second name;
the new rows are namespaced `LIB-*` and the sweep rows keep `MTS-*`/`KF-*`/`FP-*`/`ISO-*`/`PT-*`/
`AB-*`.

### R-12 — MODEL LAW

Every wave in this band dispatches Opus 5 for mechanical/implementation seats and runs tri-fold
(worker-F + worker-O + arbiter-F) only for the adjudicative acts: the R-2c `./value` shape ruling,
the AB-9 route ruling, and the 4.1 cut contents. Every seat returns `modelObserved` by schema.

---

## §4 — THE WAVE BAND (9 waves, L-13 template)

Ordering constraint, stated once: **W.L1 → W.L4 → W.L6** is the only hard chain in the library half
(the `stylesheet.ts` split must not land mid-cure on MTS-02's twin site; the 4.1 cut must not publish
a surface still under repair). **W.L8 → DR-28's UI arm** is the only hard chain in the api half.
Everything else is independent.

---

### WAVE W.L1 — THE PROTOTYPE-REACHABLE LOOKUP (three sites, one mechanism)

```
DEFECT      A user-controlled string indexes a prototype-bearing object literal at four sites in
            three subpaths, producing two shipped crash classes and one type lie:

              src/css/grammar.ts:265    NAMED_COLORS[input.toLowerCase()]     -> 10 entry points crash
              src/css/grammar.ts:461    aliases[args[1]?.toLowerCase() ?? …]  -> ok:true with a function
              src/css/stylesheet.ts:169 aliases[authoredPosition]             -> masked by :265 today
              src/easing.ts:168         `name in PRESETS` then destructure    -> ./easing crashes (LIB-01)

            $ node docs/tranches/V/megatranche/audit/probes/src-surface-totality.mjs
            RED  MTS-01  parseCssColor("constructor") threw TypeError: e.trim is not a function
            RED  MTS-01  parseStylesheet("a{color:constructor}") threw TypeError: …
            RED  MTS-01  parseStylesheet("a{animation:x 1s steps(2,constructor)}") threw TypeError: …
            RED  MTS-02  steps(2, constructor) -> ok:true with position = [Function: Object]
            RED  MTS-02  steps(2, __proto__)   -> ok:true with position = [Object: null prototype] {}
            RED — 28 failing assertions   (exit 1)

            $ node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs
            RED  LIB-01  easing(name) throws on 5/5 Object.prototype keys — constructor: TypeError
            RED  LIB-02  33 published functions throw on a JS-boundary value (7-value corpus)
            RED  LIB-02  G1 names 9 ./css parsers only — 15 of these are outside its FNS list
            RED — 12 failing assertions   (exit 1)

BORN        RED. Both commands fail today, output pasted above.

SCOPE       src/css/named-colors.ts (the table's construction)
            src/css/grammar.ts:265-266, :459-463
            src/css/stylesheet.ts:163-171
            src/easing.ts:34-92 (PRESETS construction), :166-171
            docs/…/audit/probes/{src-surface-totality,library-band-gates}.mjs  (the gates)
            END STATE: no object literal reachable by a parse-derived key remains in src/.

STRUCTURE   L-8, and this is a pure structure wave — the class is made UNREPRESENTABLE, not gated.
            Every lookup table whose key can come from input becomes a `Map<string, T>` (or
            `Object.create(null)`), and the truthiness guards become `typeof x === "string"` /
            `map.has(k)` narrowings. Once the tables have no prototype there is no chain to walk and
            no amount of future editing can re-introduce the class at those sites.
            One grep-checkable residual fence (the only reason it holds — DR-19's lesson):
              $ grep -rnE '^\s*(const|let)\s+\w+\s*(:\s*[^=]+)?=\s*\{' src/css src/easing --include='*.ts'
            reviewed at wave close; zero object-literal lookup tables indexed by parse input.
            This is EXACTLY the architecture the parser band adjudicated (cand-O's null-prototype
            keyword tables) applied to the three sites the colour grammar does not replace.

GATES       G-L1a  node docs/…/probes/src-surface-totality.mjs
                   PRODUCT: no public ./css entry point throws on any string input.
                   RED INPUT: the two literals "constructor" and "__proto__", bare and embedded —
                     parseCssColor("constructor"); parseStylesheet("a{color:__proto__}");
                     parseStylesheet("a{animation:x 1s steps(2,constructor)}")
                   GREEN: 0 throws, and steps() position is `typeof === "string"` on every ok result.

            G-L1b  node docs/…/probes/library-band-gates.mjs   (blocks LIB-01, LIB-02)
                   PRODUCT: `easing(name)` is total over Object.prototype keys; every published
                     function across all 7 subpaths returns rather than throws on the JS boundary.
                   RED INPUT: easing("constructor")  →  TypeError: function is not iterable
                   GREEN: LIB-01 0/5, LIB-02 0 offenders. NOTE: LIB-02's non-./css slices are
                     DISCHARGED BY W.L2 and W.L3 — this wave closes the ./css + ./easing slice and
                     the probe stays wired (same discipline the parser band applies to G1).

            G-L1c  a property test, in-suite, added to test/: for a generated corpus of
                   Object.getOwnPropertyNames(Object.prototype) × the 21 CSS function heads,
                   every one of the 9 public parsers plus easing() returns rather than throws,
                   AND every ok result's payload passes a shape assertion (not merely "did not
                   throw"). The shape leg exists because MTS-02 is GREEN under a throws-only test.

π           n/a — no visual claim.
DELTA       the two probe transcripts, before and after, committed under audit/probes/.

CARRIES     MT-F024  FOLD  — its totality wave's gate is WIDENED here before it is written. As
                            specced, MT-F024 closes on its own evidence while this class ships;
                            the outbound packet it already owes keyframes and glass-ui must name
                            THIS input class too, not only the empty-argument one, because
                            parseStylesheet was on their safe list and is 5/5 RED.
            MT-F001  FOLD  — same mechanism family, cited not re-found.
            DR-12    FOLD  — the 4.0.1/4.1 cut; this wave is its non-colour half. DR-12's stated
                            "12 assertions remain under src/css/" is corrected to 94 (§1.5).
            LIB-01   BUILD — new, owned here.
            LIB-02   BUILD — new; the ./css + ./easing slice closes here.
            MTS-01, MTS-02  BUILD — owned here.

BANKS       none. A bank here would be a deferral of a shipped crash.

ENV         node, against dist/subpaths/ (the BUILT artifact, L-12) after `npm run build`.
            Blind to: browser CSSOM, WebKit divergence, any consumer's own guard layer.

COMPLETABLE YES. Four sites, one mechanism, two probes that already exist and already fail. If this
            were the only wave that ever executed, three shipped crash classes would be dead and the
            formation's anchor probe would no longer be blind to the class.
```

---

### WAVE W.L2 — TRANSFORM TOTALITY (truncated runs · compact arc flags · singular decompose)

```
DEFECT      ./transform silently returns wrong finite numbers, NaN, and non-null-when-null.

            $ node -e "import('./dist/subpaths/transform.js').then(T=>{
                console.log(T.getTotalLength('M 0 0 L 10'));
                console.log(T.getTotalLength('M 10 10 A 5 5 0 0 1 20 10 A 5 5 0 0 1 10 10'));
                console.log(T.getTotalLength('M10 10A5 5 0 0120 10A5 5 0 0110 10'));
                console.log(JSON.stringify(T.decomposeMatrix3D([0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])))})"
            NaN
            31.403311569547547          <- expanded, correct (2*pi*5 = 31.41592653589793)
            0                           <- byte-equivalent MINIFIED spelling of the same circle
            {"translate":[0,0,0],"scale":[0,null,null],"skew":[null,null,null],
             "quaternion":[null,null,null,null],"perspective":[0,0,0,1]}   <- return type is `| null`

BORN        RED. Reproduced above and in probes/src-surface-totality.mjs blocks MTS-03/04/05.

SCOPE       src/transform/path.ts — tokenizePath (:64 NUMBER_RE, :86-87) and the six command arms
              (:342-343 L, :375-377 C, :392-393 S, :412-413 Q, :427 T, :442-446 A)
            src/transform/decompose.ts:281-282, :293-295, :314-317
            END STATE: getTotalLength is finite for every string input or the input is rejected;
              minified and expanded spellings of the same path agree to 1e-6; decomposeMatrix3D
              returns null for every non-decomposable matrix.

STRUCTURE   Mostly structure, one guard.
            (a) `tokenizePath` already returns RawCommand[] — reject or truncate a run whose
                args.length is not a positive multiple of the command arity AT :87, which deletes
                12 asserted reads rather than defending them.
            (b) Arc runs tokenize POSITIONALLY (rx ry rot, then two single-char flags, then a
                coordinate pair) instead of flat-matching NUMBER_RE over the run. SVG 1.1 §8.3.9:
                `flag ::= "0" | "1"` — one character, no separator required, which is what SVGO
                convertPathData, Figma and Illustrator all emit. This is the common case.
            (c) decompose gains three lines joining the EXISTING null-return ladder (:234, :241,
                :259) — `if (scaleX === 0 || scaleY === 0 || scaleZ === 0) return null;` — not a
                new protocol. The correct idiom is already in the same file at :67 and :80
                (decomposeMatrix2D does exactly this).

GATES       G-L2a  node docs/…/probes/src-surface-totality.mjs   (blocks MTS-03, MTS-05)
                   PRODUCT: getTotalLength is finite for all inputs; decomposeMatrix3D(singular) is null.
                   RED INPUT: "M 0 0 L 10", "M 0 0 C 1 1 2 2 3", "M 0 0 Q 1 1 2", "M 0 0 L 3 4 L 5";
                     decomposeMatrix3D([0,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])

            G-L2b  the arc-spelling gate (block MTS-04)
                   PRODUCT: |expanded - compact| < 1e-6 for the same path in both spellings.
                   RED INPUT: "M10 10A5 5 0 0120 10A5 5 0 0110 10"  →  0  vs  31.4033…
                   PLUS a fixture set of REAL minifier output (one SVGO-optimised path committed
                   under test/fixtures/) so the gate cannot regress to the spelling it was written
                   against. This is the highest-value single fix in ./transform: keyframes'
                   MotionPath / MorphSVG / DrawSVG are the named consumers in path.ts's own header,
                   and they receive minified path data.

            G-L2c  LIB-02's ./transform slice: 8 offenders → 0.
                   RED INPUT: PathGeometry(undefined), slerp(undefined), recomposeMatrix3D(42).

π           n/a.   DELTA  the probe transcript pair.

CARRIES     MT-F019  FOLD — the M-less-path throw and decomposeMatrix3D(null) are the same file and
                            the same session; cited, NOT re-found. MTS-03 is the strictly worse
                            sibling (a short run propagates NaN with no signal at all, and because
                            pushVertex accumulates `prev.len + …` one bad command poisons the whole
                            cumulative table, not just its own segment).
            MTS-03, MTS-04, MTS-05  BUILD.
            R-3 (the 132/150 split)  FOLD — this wave retires the dangerous subset of path.ts's 35
                            and adds ZERO to decompose.ts's 113 (MTS-05 is a missing guard, not an
                            assertion defect; conflating them mis-sizes the wave).

BANKS       none.

ENV         node against dist/. Blind to: browser SVG rendering, and to whether any real consumer
            currently depends on the wrong value (keyframes' motion-path suite is the place to
            check, and the E13 packet says so).
            DR-26 NOTE: test/v4-color-behavior.test.ts is NOT a valid oracle for this wave (its
            sRGB anchor asserts against the implementation's own constant); the arc gate's oracle is
            2*pi*r, which is external by construction.

COMPLETABLE YES. One file plus three lines in a second. Closes two silent-wrong-answer classes.
```

---

### WAVE W.L3 — `./math` GETS A FAILURE PROTOCOL

```
DEFECT      ./math is the only one of the seven published subpaths with no failure protocol —
            neither Result<T,E> nor ParseResult<T> — and three of its nine exports contradict their
            declared types. The package description reads "Immutable, failure-explicit".

            $ node -e "import('./dist/subpaths/math.js').then(M=>{
                console.log(M.deCasteljau(0.5,[]));
                console.log(M.interpBezier(0.5,[]));
                console.log(Array.from(M.lerpArray(new Float64Array([1,2,3]),
                                                   new Float64Array([4,5]),0.5,new Float64Array(3))))})"
            undefined                <- declared `number`
            [ undefined, undefined ] <- declared `readonly [number, number]`
            [ 2.5, 3.5, NaN ]        <- silent; no throw, no signal

BORN        RED. probes/src-surface-totality.mjs block MTS-06, 3/3.

SCOPE       src/foundation/math.ts:8-22 (scale), :58-72 (lerpArray), :90-96 (deCasteljau),
              :105-112 (interpBezier)
            END STATE: every ./math export either satisfies its declared type for all inputs or
              states its precondition in a form the compiler or the runtime enforces — ONE choice,
              stated in the docstring that currently states an unenforced contract at :58.

STRUCTURE   Structure where possible, guard where not.
            (a) `scale`'s guard MOVES ABOVE the division it exists to prevent (:15 currently
                computes the quotient three lines before the :18 test).
            (b) `lerpArray` gets a length precondition. The docstring already states the contract in
                prose ("`start`, `stop`, `out` must share the same length") and nothing enforces it;
                the honest fix is to enforce the sentence that is already written.
            (c) `deCasteljau`/`interpBezier` get an empty-points precondition.
            The `!` at :69, :95 and :107-110 are 7 of R-3's 132 DANGEROUS sites — unlike
            decompose.ts's 113, these array lengths are entirely CALLER-controlled, which is exactly
            the axis R-3 rules on.

GATES       G-L3a  probes/src-surface-totality.mjs block MTS-06
                   PRODUCT: finiteness/typedness on all three.
                   RED INPUT: lerpArray(Float64Array[1,2,3], Float64Array[4,5], 0.5, Float64Array(3))
                     → [2.5, 3.5, NaN] today.
            G-L3b  LIB-02's ./math slice: 5 offenders → 0.
            G-L3c  keyframes-side regression, run at the pin bump: keyframes' own
                   test/lerparray-adopt.test.ts locks the API and the (1-t)a+tb semantics but NOT
                   the length precondition — the wave adds that leg.

π           n/a.   DELTA  the probe transcript pair.

CARRIES     MTS-06  BUILD.
            R-3     FOLD — retires 7 of the 132 dangerous assertions.
            KF coupling (BOOKED, not a carry): `lerpArray` is keyframes' J.W6-adopted FrameCompiler
                    hot loop, one call per playhead sample. A mis-sized buffer there yields NaN
                    animation frames with no diagnostic. This is why the row is MAJOR and not MINOR.

BANKS       none.

ENV         node against dist/. Blind to: whether keyframes ever passes a mis-sized buffer today
            (unmeasured; the E13 packet asks them to add the assertion at their end).

COMPLETABLE YES. One 120-line file, four functions, one design choice stated once.
```

---

### WAVE W.L4 — THE PUBLIC-SURFACE LAW + THE MODULE TOPOLOGY

```
DEFECT      Two hand-maintained lists (leaf `export`, barrel forward) with nothing reconciling them,
            producing four observable defects and one 899-line god module.

            $ node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs
            RED  LIB-03  33 bare `declare` in the emitted subpath d.ts (color=1 value=6 css=18
                         easing=2 quantize=6)
            RED  LIB-03  ./css exports serializeCssColor but withholds the general serializers:
                         serializeCssValue (src/css/stylesheet.ts:81),
                         serializeKeyframeSelector (src/css/grammar.ts:429)
            RED  LIB-03  ColorFactory exported at src/color/index.ts, dropped by
                         src/subpaths/color.ts — the type of 23 factories is unnameable
            RED  LIB-03  ./css returns but cannot name: CssValue, CssScalar, CssCall, CssList
            RED  LIB-04  css.d.ts emits 5 duplicated colour declarations (Alpha_2, Channel_2,
                         ChannelsBySpace_2, Color_2, SpaceId_2), 58 references
            RED  LIB-04  2 module(s) outside src/color/ reach colour types past the barrel:
                         src/css/grammar.ts, src/css/types.ts
            RED  LIB-05  5 src files over the 350-LoC cap: stylesheet.ts=899 decompose.ts=609
                         path.ts=564 grammar.ts=483 anchors.ts=377
            RED — 12 failing assertions   (exit 1)

BORN        RED, output pasted above.

SCOPE       src/subpaths/{color,css,value}.ts  · src/css/index.ts · src/color/index.ts
            src/css/types.ts:1 · src/css/grammar.ts:18-19          (LIB-04, 3 statements / 2 files)
            src/css/stylesheet.ts  ->  split into css/animation-values.ts (:99-363, 265 lines)
                                                   css/at-rules.ts        (:365-745, 381)
                                                   css/collect.ts         (:747-899, 153)
            src/css/syntax.ts:42 (isSupportedSyntaxDescriptor -> @internal or unexported)
            src/css/stylesheet.ts:498-499, :709-717 (the double collectDeclarations / double .get())
            END STATE: exports map byte-identical except for the ADDITIVE re-exports; every subpath
              type nameable from the subpath that returns it; zero src file over 350 lines
              introduced or left by THIS wave's own files.

STRUCTURE   Structure throughout — this is the wave that makes the class unrepresentable.
            (a) THE LAW (R-1): barrels are derived, not hand-enumerated. `src/subpaths/*.ts` become
                star-forwards over the area barrel; the area barrel is the ONE place where
                public/internal is decided; anything internal loses `export` or moves behind
                `internal.ts`. The two lists become one list.
            (b) R-2a: colour types cross src/color/'s boundary through ./color/index only. 3
                statements, 2 files, no public-surface change — and it deletes 5 declarations and
                58 references from css.d.ts, which is 382 of the package's 940 d.ts lines.
            (c) R-2b: the stylesheet split. Two cross-seam edges, no cycle, all three files under
                the cap. LAND AFTER W.L1 — MTS-02's twin site is stylesheet.ts:163-171 and moving
                it mid-cure loses the diff.
            (d) R-2c: ./css re-exports the four AST types; ./value keeps its five exports;
                isLayoutTrackingUnit does NOT move.
            (e) Hoist the two double-lookups (six `.get()` calls collapse to three locals), which
                deletes 6 of stylesheet.ts's 18 assertions with no behaviour change.

GATES       G-L4a  node docs/…/probes/library-band-gates.mjs  (blocks LIB-03, LIB-04, LIB-05)
                   PRODUCT: zero bare `declare` emitted; zero `_2` duplication; zero cross-boundary
                     model imports; the named serializers and ColorFactory present on their subpath.
                   RED INPUT: `"serializeCssValue" in CSS` → false today; `grep -c '_2'
                     dist/subpaths/css.d.ts` → 58 today.

            G-L4b  THE CONSUMER-COMPILE PROBE — the gate that would have caught this at 4.0.0 and
                   did not exist. A clean scratch package that does
                     import type { CssValue, CssList } from "@mkbabb/value.js/css";
                     import type { ColorFactory } from "@mkbabb/value.js/color";
                   over `npm pack` output and runs `tsc --noEmit`.
                   RED TODAY on both imports. This is a PRODUCT assertion (L-2), not an exit code:
                   the property is "a consumer can name what the subpath returns".

            G-L4c  the cap, scoped honestly: `stylesheet.ts` → three files, none over 350.
                   decompose/path/grammar/anchors carry as NAMED RESIDUALS with their own stated
                   scope. LIB-05 stays RED at 4 after this wave AND THAT IS THE CORRECT OUTCOME —
                   a gate wired to be permanently RED at five files is what DR-18 warns against;
                   the residual list is the disposition, and the four names are in it.

            G-L4d  serializeCssValue's differential gate: parse a fixture corpus, serialize with
                   value's implementation and with keyframes' fork, assert byte equality.
                   RED INPUT: "a : b" → value "a: b" / keyframes "a : b"; "x ; y" → "x; y" / "x ; y".
                   Control "1px 2px" → identical.

π           n/a.   DELTA  dist/subpaths/*.d.ts before/after (940 lines → expected ~700), committed.

CARRIES     DR-18   FOLD, home moves to W.L4, identity preserved (R-11). The 899-line residual is
                    named and DISCHARGED here rather than measured forever. DR-17's demo half stays
                    with W.W8 — one ruling, two homes, no re-booking.
            MTS-08, MTS-09, MTS-10, MTS-13(a)(b)(c)(d)(e), MTS-15  BUILD/FOLD — all the same
                    barrel-discipline mechanism, all on files this wave already opens.
            MTS-13(f)  RETIRE — REFUTED (src/.DS_Store is untracked; .gitignore:4). Struck, with
                    the measurement recorded so it is not re-found.
            KF-SPLIT-HOME  FOLD — the /css+/value tax on 9 of 39 keyframes files is cured by the
                    additive re-export; keyframes drops its 13 redundant /value imports at the bump.
            LIB-03, LIB-04, LIB-05  BUILD.

BANKS       BANK-L4-1: the four remaining god modules.
              $ node docs/…/probes/library-band-gates.mjs 2>&1 | grep LIB-05
            Re-trigger, written as the command: the bank fires when the list is ≤ 2 files (i.e.
            decompose and path have been split by W.L2's follow-on) — at which point the cap goes
            into CI as a hard gate. Swept at every wave open (L-4 corollary).

ENV         node + tsc against `npm pack` output, never the working-tree dist (PT-08: the worktree
            dist/subpaths/css.js is NOT byte-identical to the published tarball — the delta is
            rollup identifier allocation only, no semantic divergence, and dist/ is gitignored, so
            there is no "the repo ships different bytes than npm" story; the packed artifact is
            simply the correct oracle). Blind to: runtime behaviour — this wave asserts shape.

COMPLETABLE YES, and it is the one wave that changes the repository's shape. If it were the only
            wave that ever executed, the surface would become self-describing and the largest god
            module would be gone.
```

---

### WAVE W.L5 — THE value↔fourier ISOMORPHISM (facility 19)

```
DEFECT      D-15 ratified full isomorphism and the ratified contract does not contain the string
            "value.js". The only value↔fourier coupling that exists is a LIBRARY coupling, and every
            strand of it is broken.

            $ node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs
            RED  leg1: no "." key / no "main" / no "module" — ERR_PACKAGE_PATH_NOT_EXPORTED at all
                       5 fourier sites (ConvergencePlot.vue:5, useCurveTransition.ts:8,
                       harmonics.ts:5, easings.ts:9, easings.ts:16)
            RED  leg2: `timingFunctions` absent from every 4.0.0 subpath
            RED  leg3: 8/22 easing names change SHAPE between 0.13.0 and 4.0.0
                       ease-out-circ 1.923e-1 · ease-in-expo 6.930e-2 · ease-in-circ 4.489e-2 ·
                       ease-in-quad 4.157e-2 · ease-in-cubic 3.162e-2 · ease-out-sine 3.082e-2 ·
                       ease-in-sine 3.038e-2 · ease-out-quad 2.520e-2
            RED — 3/3 legs failing

            $ node docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs
            5/6 RED — four of five --viz-* tokens are oklch() in the glass-ui 4.0.0 fourier has
            INSTALLED; cssVarToHex (web/src/lib/colors.ts:22-53) has no oklch arm and returns
            "#888888" at :52, so the Fourier, Chebyshev and Legendre series and the green axis all
            paint the same grey.

BORN        RED, both probes, output pasted.

SCOPE       docs/…/apotheosis/…/API-FACILITY-ISOMORPHISM.json   (facility 19 + as-built census)
            fourier web/src/lib/easings.ts:9,16 · ConvergencePlot.vue:5 ·
              useCurveTransition.ts:8 · harmonics.ts:5     (5 specifiers)
            fourier web/src/lib/colors.ts:22-117            (cssVarToHex + 4 helpers, deleted)
            fourier web/package.json:18                     (pin)
            The D-15 direct-edit grant is the vehicle for the fourier half.

STRUCTURE   Structure on the value side, migration on the fourier side.
            (a) THE CONTRACT: facility 19 `library-surface`, same law as the other 18, populated
                from R-4's ten-row symbol table. counts annotated `as-specified` with a sibling
                `as-built` census and its command (fourier http = 30 at HEAD, not 41 — ISO-02).
            (b) THE ROOT SPECIFIER STAYS RETIRED (D-1). The contract names the subpath per consumer;
                fourier's 5 sites move to @mkbabb/value.js/easing. This is deliberate, not a
                regression — and it means the contract must carry the per-consumer subpath row that
                does not exist today.
            (c) `easing(name)`'s ok arm gains an `approximated: boolean` discriminant, OR the
                analytic in/out arms return to DIRECT_EASINGS. EITHER closes leg 3; the choice is a
                tri-fold ruling (R-12) because it is a semantic decision about what a named curve
                means, not a repair.
            (d) fourier's hand-rolled colour parser is DELETED and routed through value's published
                surface — which requires A-5 (toHex) and A-6 (resolveCssColor) from W.L6, so this
                wave's colour arm SEQUENCES AFTER the 4.1 cut. The easing arm does not.

GATES       G-L5a  node docs/…/probes/fourier-value-import-drift.mjs
                   PRODUCT: every fourier import site resolves against 4.1; every named easing
                     resolves; no name changes shape without an explicit marker.
                   RED INPUT: `import { timingFunctions } from "@mkbabb/value.js"` at
                     web/src/lib/easings.ts:9. GREEN: 0 unresolvable sites, 0 unmarked drift.

            G-L5b  node docs/…/probes/fourier-vizcolor-oklch.mjs
                   PRODUCT: resolveVizColors() yields five DISTINCT colours.
                   RED INPUT: --viz-fourier = "oklch(0.579 0.201 30.4)" → "#888888" today, and
                     VIZ_COLORS.fourier === VIZ_COLORS.chebyshev, both grey.
                   GREEN: the five differ, and the light-dark() dark arm resolves.

            G-L5c  contract completeness: every symbol fourier imports from @mkbabb/value.js
                   appears EXACTLY ONCE in facility 19. RED today at 0 of 6.

            G-L5d  `cd fourier-analysis/web && npm i @mkbabb/value.js@4.1.0 && npx tsc --noEmit`
                   RED today on 5 unresolved specifiers + 1 missing export.

π           ONE headed capture, and only one (probe-parsimony edict, owner 2026-07-12): a single
            DevTools `evaluate` on fourier's dev server confirming that getComputedStyle on an
            UNREGISTERED custom property returns the oklch token stream with var() substituted and
            light-dark() unresolved. That is the one step G-L5b transcribes rather than measures.
            COMMITTED PATH: docs/…/audit/telemetry/fourier-vizcolor-computed.json.
DELTA       the two probe transcripts + a before/after screenshot pair of one convergence plot
            (grey series → five distinct series), committed under audit/visual/.

CARRIES     ISO-01  BUILD — facility 19.
            ISO-02  RETIRE (record-only) — the as-specified/as-built annotation lands in the same
                    commit; no later close may cite 41 as a fact.
            FP-01, FP-02, FP-03, FP-04, MTS-07  BUILD.
            MT-F018 FOLD — cited, not re-found: it recorded that the isomorphism spans a language
                    boundary (fourier's api/ is Python, web/ is the only TS consumer). The corollary
                    it did not draw is that the TS half is the half that is actually wired AND
                    actually broken, which is what makes this a completable object rather than
                    "Value/Fourier API isomorphism".

BANKS       BANK-L5-1: fourier's Python half.
              $ cd fourier-analysis && grep -rnE '@router\.(get|post|patch|put|delete)' api/routers/*.py | wc -l
            Re-trigger as command: the bank fires when this count changes from 30, at which point
            the as-built census in facility 19 is stale and is re-run. Swept at every wave open.

ENV         node against both installed dists (0.13.0 and 4.x) — DELIBERATE: it is the upgrade a
            consumer actually experiences, not a source comparison. Plus exactly one browser
            evaluate. Blind to: fourier's Python surface, and to WebKit-specific
            colour-token resolution.

COMPLETABLE YES for the easing + contract arm on its own. The colour arm is stated as sequencing
            after W.L6, and if W.L6 never lands the easing arm still closes and the tree is better.
```

---

### WAVE W.L6 — THE 4.1 CUT (one date, one coordinated bump)

```
DEFECT      Eight closes of un-dated ship labels (DR-21), a consumer four majors stale that cannot
            resolve the package at all (FP-01), and a downstream that is invisible to every additive
            change until its exact pin moves.

            $ grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ | wc -l
            0
            $ node -e "console.log(require('./package.json').version)"
            4.0.0
            $ grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json
            69:        "@mkbabb/value.js": "4.0.0"     <- exact, ruled DELIBERATE

BORN        RED. `0` is the born-RED input for DR-21; the exports-map/pin facts are measured above.

SCOPE       src/subpaths/{css,color,easing}.ts + the area barrels (the additive symbols)
            src/color/operations.ts (the three into-variants)
            src/easing.ts (easingNames, the approximated discriminant, memoisation)
            package.json version -> 4.1.0
            keyframes.js package.json:69 -> 4.1.0  +  the 13 redundant /value imports dropped
            fourier web/package.json:18 -> ^4.1.0
            END STATE: one published cut, one dated event, three consumers bumped in the same
              coordinated window.

STRUCTURE   Additive only — nothing removed, nothing renamed. That is what makes the cut safe to
            coordinate: the bump cannot break a consumer that has not adopted anything.
            SHIP: A-1..A-8 (R-5).
            DECLINE PERMANENTLY: D-GAP-6 sampleBezier — measured zero demand, and
              linearDensifyEasing (8 lines, samples ANY TimingFunction at 33 points) already
              generalises it. This closes an un-dated conditional rather than carrying it.
            FENCE (recorded in BOTH ledgers, value's and keyframes'): bezierPresets' 30-key set and
              easing()'s 40-name catalog are CONSUMED BY DERIVATION and enforced by an EAGER THROW
              at keyframes' module scope. Additions silently mutate keyframes' public
              timingFunctionEntries; removals turn loadAnimationEngine() into a boot crash. This is
              the surface IN-ATLAS-3 should have fenced (see W.L7).

GATES       G-L6a  DR-21's discharge, as a product assertion:
                   $ grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ | wc -l   ->  0 today
                   PRODUCT: the three symbols exist on ./color AND keyframes'
                     compile/emit/backward-color.ts:171 uses the into-variant (the measured adopter).
                   RED INPUT: the count above; and `'sampleColorRamp' in COLOR` → false today.

            G-L6b  the additive-surface gate: for each of A-1..A-8, `<name> in <subpath>` is true,
                   and G-L4b's consumer-compile probe names each new type.
                   RED INPUT today: serializeCssValue false · toHex false · easingNames false ·
                     resolveCssColor false · ColorFactory absent from ./color's d.ts export set.

            G-L6c  the catalog fence, wired as a keyframes CI step (converts a BOOT CRASH into a
                   CI failure):
                   $ node --input-type=module -e "import{easing,bezierPresets}from'@mkbabb/value.js/easing';
                     const D=['easeOutCubic','easeInOutSine','easeInOutCubic','easeInOutQuad',
                     'easeInOutExpo','easeInOutCirc','easeOutExpo','smoothStep3','easeInBounce'];
                     const n=[...Object.keys(bezierPresets),'ease-in-bounce',...D];
                     const bad=n.filter(x=>!easing(x).ok);
                     console.log(n.length,'asserted,',bad.length,'rejected');process.exit(bad.length?1:0)"
                   -> `40 asserted, 0 rejected`, exit 0 TODAY.
                   This is the ONE gate in this program that is GREEN at authorship, and L-2 is
                   satisfied by stating the RED input explicitly: DELETE ANY KEY FROM
                   value.js's bezierPresets. It is not vacuous — it is a fence whose whole purpose
                   is to be green until a specific future change, and that change is named.
                   Companion: snapshot `timingFunctionEntries.map(([n])=>n)` so an ADDITIVE preset
                   appears as a reviewed diff in keyframes' PUBLIC surface rather than silently.

            G-L6d  the coordination gate: the cut and the two consumer bumps land in ONE window.
                   PRODUCT: after the cut, `npm ls @mkbabb/value.js` in keyframes and in fourier
                   both report 4.1.x. RED today: 4.0.0 and 0.13.0.

π           n/a.   DELTA  the published surface count: 79 runtime exports across 7 keys today
            (color 23 · value 1 · css 19 · easing 16 · math 9 · transform 9 · quantize 2), measured
            before and after, committed.

CARRIES     DR-21   BUILD, DISCHARGED — with the file:line evidence tuple the registry says is owed:
                    keyframes/src/animation/compile/emit/backward-color.ts:171-190, invoked at :250
                    and at :263 with count=1024. The row closes on measurement, not on a label.
            D-GAP-6 RETIRE — permanently, on measured demand (0 hits), not on intent.
            KF-41-DEMAND  FOLD — this wave IS the answer to it.
            MTS-14(i)  BUILD — shape (i) is what this cut lands; shape (ii) is explicitly rejected
                    (R-2c) so it does not re-open as a question.
            ISO I-3/I-4/I-6/I-9/I-10  BUILD — the additive half of facility 19.

BANKS       BANK-L6-1: the keyframes pin.
              $ grep -n '"@mkbabb/value.js"' ../keyframes.js/package.json
            Re-trigger as command: any 4.1+ additive symbol is INVISIBLE to keyframes while this
            reads an exact version below the cut. The bank fires — i.e. a coordination packet is
            owed — the moment a new additive symbol lands without this line moving.

ENV         node against `npm pack` output. Blind to: whether keyframes' and fourier's suites pass
            post-bump — which is why G-L6d asserts the bump, and the consumer suites are the
            evidence, run in their own repos.

COMPLETABLE YES, conditionally on W.L4 (the cut must not publish a surface still under repair). The
            dependency is stated, and it is the ONLY thing this wave waits on. A dated cut is the
            only mechanism that has ever discharged this class.
```

---

### WAVE W.L7 — THE CONSUMER FENCES (keyframes + atlas)

```
DEFECT      Four cross-package couplings that are load-bearing and unfenced, plus a green gate with
            no subject.

            $ cd ../keyframes.js && node --input-type=module -e "import{easing,bezierPresets}from
              '@mkbabb/value.js/easing';const D=['easeOutCubic','easeInOutSine','easeInOutCubic',
              'easeInOutQuad','easeInOutExpo','easeInOutCirc','easeOutExpo','smoothStep3',
              'easeInBounce'];const n=[...Object.keys(bezierPresets),'ease-in-bounce',...D];
              console.log(n.filter(x=>easing(x).value!==easing(x).value).length,'of',n.length)"
            21 of 40                <- and easing-registry.ts:36 says "Stable identities let the
                                       serializer distinguish named curves from closures"

            $ ./node_modules/.bin/tsc --noEmit -p tsconfig.lib.json --noUnusedLocals
            9 errors, incl. load-engine.ts(65,1) 'Stylesheet' is declared but its value is never read

            $ cd ../atlas && grep -rn 'from "@mkbabb/value\.js"' src/ | wc -l
            16                      <- installed 3.1.0; TimingFunction imported from the ROOT at
                                       src/platform/composables/useCountUp.ts:48; 4.0.0 has deleted
                                       BOTH the root entry AND the symbol

BORN        RED on all three commands.

SCOPE       keyframes src/animation/compile/emit/easing-serialize.ts:70-71
            keyframes src/animation/internal/leaves.ts:1-24  + test/internal/leaves-parity.test.ts
            keyframes src/animation/compile/emit/backward.ts:30,47 · animation/index.ts:233
            keyframes tsconfig.json (noUnusedLocals) + the 9 dead declarations in 6 files
            keyframes docs/tranches/V/coordination/INBOUND-LEDGER.md:28 · PROMPT-RECAP-V.md:130
            one outbound packet to atlas (no atlas edits in this wave)

STRUCTURE   Structure for two of the five, gates for three.
            (a) KF-EASE-REF — replace the reference `.find()` at easing-serialize.ts:71 with a
                VALUE-identity lookup that cannot depend on closure identity: sample the callable on
                the fixed 33-point grid linearDensifyEasing already uses at :38-45 and match the
                signature against a Map built once beside timingFunctionEntries. Structure: the
                serializer stops asserting an identity contract the other side never promised.
                (Note: 9 reference COLLISIONS also exist — distinct catalog names sharing one
                object, e.g. smooth-step-3/smoothStep3 — so `.find()` reverse-maps 31 references
                onto 40 names and the authored name is not recoverable today either.)
            (b) KF-LEAVES-TAUT — DELETE test/internal/leaves-parity.test.ts outright. leaves.ts:28
                is a bare re-export; a re-export cannot drift; ~200 assertions that cannot fail are
                a false coverage signal standing where a real guard is believed to be. Correct the
                two stale docstrings in the SAME commit (drop "byte-copy", drop "the value.js
                barrel" — 4.0.0 publishes no barrel). If a boundary guard is still wanted, the
                honest one is different in kind: assert that @mkbabb/value.js/math's module graph
                stays grammar-free, which is the property leaves.ts:9-12 actually depends on.
            (c) KF-UNUSED-BLIND — delete 8 dead declarations, DECIDE the 9th (`_boundTimeline` is a
                dead store whose own docstring at :47-52 claims it is read by the no-timeline
                guard: either wire the guard and the docstring becomes true, or the field and its
                three prose references go together), then set "noUnusedLocals": true so the class
                cannot recur. Structure, not a gate.
            (d) KF-PROVENANCE — generalise rather than patch: one gate script that extracts every
                @mkbabb/value.js-attributed identifier from src/ comments and asserts each is a real
                export of the subpath it is attributed to. That converts a class of stale cross-repo
                prose into a checkable one, which is the only way it survives the next pin bump.
            (e) KF-ATLAS-FENCE — re-measure the IN-ATLAS-3 census FROM THE TREE and correct the
                three wrong claims; RE-AIM the fence at what it should cover (value's bezierPresets
                key set + easing() name catalog — W.L6's G-L6c); outbound to atlas naming the 4
                absent symbols (TimingFunction, CSSCubicBezier, oklabToRgb255, srgbToOKLab), the 16
                root-specifier sites and the 3.1.0→4.0.0 exports-map delta.

GATES       G-L7a  serializeEasing(resolveEasing(name)) is byte-identical for all 40 names before
                   and after; AND `serializeEasing({fn: easing('ease').value})` does not throw.
                   RED INPUT: easing('ease').value  →  AnimationOptionError "a custom
                   TimingFunction has no CSS animation-timing-function representation" TODAY.
                   The by-name control PASSES today, which is what makes the red meaningful.

            G-L7b  $ test $(grep -c 'export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"' \
                     src/animation/internal/leaves.ts) -eq 0
                   → exit 1 today, proving zero local implementation and therefore zero drift surface.
                   RED INPUT: leaves.ts:28 itself.

            G-L7c  $ ./node_modules/.bin/tsc --noEmit -p tsconfig.lib.json --noUnusedLocals
                   → exit 1, exactly 9 errors today.
                   RED INPUT: src/animation/load-engine.ts:65 `import type { Stylesheet } from
                   "@mkbabb/value.js/css"` — dead, in the file that DEFINES the value.js boundary.

            G-L7d  the comment-provenance gate:
                   $ node --input-type=module -e "import * as c from '@mkbabb/value.js/color';
                     const m=['sampleColorRamp','deltaEOK'].filter(n=>!(n in c));
                     if(m.length){console.error('docstrings name absent exports:',m);process.exit(1)}"
                   → exit 1 today. RED INPUT: backward.ts:47's own symbol list.

            G-L7e  atlas exposure, run from the atlas tree:
                   $ grep -c 'from "@mkbabb/value\.js"' -r src/   -> 16
                   plus a symbol crosswalk asserting every root-imported name resolves in 4.x's
                   subpaths -> 4 ABSENT today.
                   RED INPUT: `import { type TimingFunction } from '@mkbabb/value.js'` at
                   src/platform/composables/useCountUp.ts:48.

π           n/a.   DELTA  the five command transcripts, before/after, committed.

CARRIES     KF-EASE-REF, KF-LEAVES-TAUT, KF-UNUSED-BLIND, KF-PROVENANCE, KF-ATLAS-FENCE  BUILD.
            KF-EVAL-THROW  FOLD into W.L6's G-L6c (the fence belongs with the cut it fences).
            IN-ATLAS-3     RETIRE-AND-REPLACE — the fence is not deleted, it is corrected and
                    re-aimed. Its identity is preserved; what changes is what it guards. Recorded
                    explicitly because a fence quietly dropped is how a coupling goes unguarded.
            SCOPE.md §1 correction: atlas lives at ~/Programming/atlas, not ~/Programming/sci-report.

BANKS       BANK-L7-1: atlas's bump.
              $ cd ~/Programming/atlas && node -e "console.log(require('./node_modules/@mkbabb/value.js/package.json').version)"
            Re-trigger as command: while this reads 3.x, atlas's 16 root imports are dormant, not
            safe. The bank fires — the outbound packet's migration becomes due — the moment it moves.

ENV         node + tsc in the keyframes and atlas trees. Blind to: value.js's own tree (nothing
            here is a value-side cure — value cannot reach keyframes under the exact pin, which is
            exactly why the consumer-side cures are the ones that ship).

COMPLETABLE YES. Five rows, all mechanical, all in one repo except one outbound letter, all closeable
            on the five commands above in a single session.
```

---

### WAVE W.L8 — API AUTHORIZATION (the boundary types cannot carry)

```
DEFECT      `visibility` is enforced on 1 of 10 palette-read surfaces. A private palette is readable
            by an anonymous stranger, its whole version history is readable, and any session can
            fork it — receiving the private colours copied into a child born `visibility:"public"`.

            $ cd api && grep -rn visibility src/modules/palette/service/*.ts \
                          src/modules/palette/routes/*.ts | grep -v service/visibility.ts
            crud-list.ts:113   if (query.visibility) f.visibility = query.visibility;
            crud-list.ts:115   f.visibility = "public";
            forks.ts:76        visibility: "public",      <- the fork child
            crud.ts:97         visibility: "public",
            (2 enforcement sites, 2 write sites, nothing else)

            $ grep -rn 'isActivePublic' src/ | grep -v __tests__
            service/visibility.ts:31   (the definition)
            service/forks.ts:15,201    (ONE caller — the provenance redaction)

            getPaletteBySlug  service/crud.ts:44-70   checks deletedAt only
            listVersions      service/versions.ts:86  reads palette_versions, never touches palettes
            forkPalette       service/forks.ts:50-51  `if (!source) throw NotFoundError` — no test
            /versions/:hash   routes/versions.ts:43-47  binds `hash`, NEVER READS `slug`

BORN        RED. The sweep's live probe (mongodb-memory-server, 4/4 green) recorded:
            anon GET /palettes/secret -> 200 with the private colours; anon GET
            /palettes/secret/versions -> 200 with names/colours/authorSlug; bob POST
            /palettes/secret/fork -> 201, child listed publicly. The static chain above is
            re-verified in this seat and is sufficient to author against.

SCOPE       api/src/modules/palette/service/{crud,versions,forks}.ts
            api/src/modules/palette/routes/versions.ts
            api/src/modules/palette/repository/paletteVersion.ts     (deleteByPaletteSlugs)
            api/src/modules/admin/service/users.ts:174-183, :207-221 · api/src/cron.ts:46-53
            api/src/modules/palette/service/visibility.ts:51-59      (deleted)
            api/src/modules/palette/require-ownership.ts:36-38
            ONE new spec: api/src/modules/palette/__tests__/palette-visibility-gate.test.ts
            ONE new spec: api/test/conformance/version-orphan.test.ts

STRUCTURE   Structure, and the shape matters: `isActivePublic` already exists and already carries
            the right docblock ("available to any detail/social read that must decide whether a row
            may cross the public wire so those surfaces cannot drift apart"). It acquired one caller.
            The cure is ONE `assertReadable(doc, currentUserSlug)` built on it, applied at the four
            unguarded entrypoints, so the decision has ONE home and a fifth read cannot be added
            without going through it. Fork of a non-public source -> 404, matching the browse list's
            existing "invisible means absent" semantic rather than inventing a fifth status code.
            AB-11's tautology is DELETED in the same commit: shipping a no-op named `assert*` in the
            same file is what let the missing assertion go unnoticed for fourteen tranches.

GATES       G-L8a  $ cd api && npx vitest run palette-visibility-gate
                   PRODUCT: a private palette is unreachable by a non-owner on every read surface.
                   RED INPUT (measured today: 200 / 200 / 201 / 200):
                     alice owns `secret` at visibility:"private"; then
                       anon GET  /palettes/secret            must be 404   (200 today)
                       anon GET  /palettes/secret/versions   must be 404   (200 today)
                       bob  POST /palettes/secret/fork       must be 404   (201 today)
                       GET /palettes/bbb/versions/<hash-of-aaa>  must be 404  (200 today, and the
                         response self-reports the mismatch in its own paletteSlug field)
                     owner alice must still get 200 on all three.

            G-L8b  $ cd api && npx vitest run version-orphan
                   PRODUCT: palette_versions carries no row for a hard-deleted palette; a re-claimed
                     slug inherits nothing.
                   RED INPUT (measured today): create `reused` as alice, hard-delete as the reaper
                     does → countDocuments({paletteSlug:"reused"}) === 1 (orphan); bob creates a
                     fresh palette at `reused` → GET /palettes/reused/versions returns 2 rows, one
                     of them alice's names, colours and authorSlug.
                   SAME SPEC covers AB-10: create with userSlug:null and assert
                     versionCount === (await listVersions(...)).total   (1 vs 0 today).

π           n/a — api. DELTA the two spec transcripts, RED then GREEN, pasted into the wave close.

CARRIES     AB-1, AB-3, AB-4, AB-10  BUILD.
            AB-11  RETIRE by subtraction — delete the function and record in canon that value's
                   (visibility, tier) model has NO forbidden transitions (contrast fourier's flat
                   enum, which the docblock already cites). NO GATE: L-8, a gate over a tautology
                   is a second tautology.
            AB-8   RETIRE (record-only) — two ledger corrections: name modules/ + platform/, and
                   strike "api is NOT runnable here" (the harness is `cd api && npm test`, 38 files
                   / 213 tests / ~24s cold, and it is the default evidence standard for api rows).
            DR-28  SEQUENCING RIDER, not a carry — see below. DR-28 keeps its BUILD disposition and
                   its W.W7 home unchanged.

BANKS       none. Every row here is BUILD or RETIRE in this wave.

ENV         `cd api && npx vitest run` against mongodb-memory-server on a single-node replica set;
            binaries cached at ~/.cache/mongodb-binaries/mongod-arm64-darwin-{7.0.24,8.2.6}.
            Blind to: multi-replica behaviour, production index state, and real network auth.

SEQUENCING  **AB-1 MUST LAND BEFORE DR-28's UI ARM.** DR-28's wave shape is "wire the panes to
            draft→publish→unpublish→trash→restore with immutable public history". Building that UI
            over today's api ships a privacy control that does not control anything AND GIVES IT A
            BUTTON. This is a precondition on W.W7's UI arm, not a sibling of it.

COMPLETABLE YES. One commit, two spec files, four call sites, one deletion. If it were the only wave
            that ever executed, private would mean private.
```

---

### WAVE W.L9 — API CORRECTNESS + GATE TRUTH (pagination · boot · idempotency · CI · dead routes)

```
DEFECT      Four independent defects that share one property: none is expressible in a type, and all
            four survived fourteen tranches under a green 213-test suite.

            (1) PAGINATION. Both tiebreaker clauses compare a base64-decoded `_id` STRING against a
                live ObjectId. MongoDB's $lt/$gt are type-bracketed, so the clause matches nothing.
                  service/crud-list.ts:61   `_id: String(doc._id)`
                  service/crud-list.ts:136,143,150   `{_id: {$lt: cursor._id}}`
                  repository/palette.ts:102-105      insertOne with no _id -> the driver mints an ObjectId
                Measured (sweep, live): 5 palettes sharing one createdAt, limit 2 → page1 ['e','d']
                hasMore true; page2 [] hasMore FALSE. 2 of 5 reachable, and a correct client stops.
                The tie PRODUCER is in-tree: admin/service/import.ts:39 hoists `const now = new
                Date()` out of the insert loop, so every palette in one batch shares the millisecond.
                The docblock at crud-list.ts:120-127 asserts the false premise IN WRITING and is the
                justification for the widening that made the type error disappear.

            (2) BOOT. migrations/check.ts:83 scans EVERY palette document with the only early exit
                at `missing.length > 100`; assertMigrationsApplied ends in process.exit(1) at :145;
                main.ts:49 runs it before serve(). One malformed document takes down /health.
                compose.yaml: healthcheck start_period 15s, memory limit 256M.

            (3) IDEMPOTENCY (DR-33 re-premised). Write-only cache:
                  $ grep -rn idempotencyKey demo/ | grep -v transport/client.ts
                  demo/palettes/api/palettes.ts:80    idempotencyKey: crypto.randomUUID(),
                  demo/palettes/api/palettes.ts:145   idempotencyKey: crypto.randomUUID(),
                  demo/palettes/api/palettes.ts:161   idempotencyKey: crypto.randomUUID(),
                  $ grep -rn sweepExpired api/src/ | grep -v __tests__
                  platform/cache/lru.ts:107 (def) · platform/http/rate-limit.ts:81 (only caller —
                    sweeps the four rate limiters; replayStore is swept NEVER)
                Up to 50,000 captured response bodies, 24h window, 256M container, zero reachable hits.

            (4) CI TRUTH. `.github/workflows/ci.yml:70` is `npx tsc --noEmit`, which resolves
                api/tsconfig.json (include ["src"], exclude src/**/__tests__/**). 3,244 of 10,869
                lines typechecked by nothing. api/tsconfig.test.json is tracked, correct, currently
                green, and has zero consumers since E.W2 Lane F authored it and verified it in prose.

BORN        RED on (1),(3),(4) by the commands above; (2) is RED by construction
            (assertMigrationsApplied's own process.exit(1) makes the second assertion unreachable).

SCOPE       api/src/modules/palette/service/crud-list.ts:55-70, :120-152
            api/src/platform/migrations/check.ts:82-145 · api/src/main.ts:45-49
            api/src/platform/http/idempotency.ts + demo/palettes/api/palettes.ts:80,145,161
            .github/workflows/ci.yml:70
            api/_parity.ts -> api/test/conformance/route-consumers.test.ts
            THREE new specs: pagination-tie · boot-resilience · idempotency-reachability

STRUCTURE   Structure for two, gates for two.
            (1) Brand the cursor `_id` back to `new ObjectId(...)`, OR tiebreak on `slug` — which is
                a string, is uniquely indexed, and makes the type honest instead of casting it back.
                DELETE the false docblock rather than carry it: the comment is the defect's cause.
            (2) The invariants are RIGHT; the ENFORCEMENT POINT is wrong. A per-document contract is
                being checked by a whole-collection blocking scan whose failure mode is total
                unavailability. Replace with one indexed `countDocuments` over a `$nor` of the
                invariant predicates, log LOUDLY, let the server start — and let the hard failure
                live at the read boundary, where formatPalette (format.ts:64-67) already has the
                type contract.
            (3) DR-33 RETIRES by recording the truth, and the truth is now complete: either lift the
                key to the LOGICAL OPERATION (the only shape in which the middleware does anything),
                or delete the middleware and the three call-site keys together and record the
                subtraction. NOT NEITHER — retiring the row as written would canonise a no-op.
            (4) One flag: `-p tsconfig.test.json`.

GATES       G-L9a  $ cd api && npx vitest run pagination-tie
                   PRODUCT: the union of all pages equals the full set; hasMore:false only when
                     exhausted.
                   RED INPUT: 5 palettes with one shared createdAt, limit 2 → union size 2, page 2
                     empty with hasMore:false TODAY.

            G-L9b  $ cd api && npx vitest run boot-resilience
                   PRODUCT: a malformed document is REPORTED and the server still answers /health.
                   RED INPUT: seed one palette missing `tier`; assertMigrationsApplied calls
                     process.exit(1) and the second assertion is unreachable TODAY.

            G-L9c  $ cd api && npx vitest run idempotency-reachability
                   PRODUCT: replayStore returns to size 0 after the window (needs a sweeper or a
                     size accessor), AND two invocations of createPalette for the same user intent
                     carry the SAME Idempotency-Key.
                   RED INPUT: the two keys differ (three inline randomUUID() calls), and nothing
                     ever sweeps.

            G-L9d  $ cd api && npx vitest run config-truth
                   PRODUCT: the CI api job's typecheck command contains `-p tsconfig.test.json`.
                   RED INPUT: .github/workflows/ci.yml:70 reads `npx tsc --noEmit` TODAY.
                   (config-truth.test.ts already exists and already asserts config facts — this is
                   one more row in it, which is why it is a gate and not a new file.)

            G-L9e  $ cd api && npx vitest run route-consumers
                   PRODUCT: every mounted route appears in the demo transport layer's path set,
                     minus a NAMED, JUSTIFIED ops allowlist (/health, /docs, /openapi.json).
                   RED INPUT: 9 unlisted rows today — POST /admin/batch/palettes, POST
                     /admin/batch/users, POST /admin/users/:slug/import, POST /admin/users/:slug/
                     status, GET /colors/search, GET /palettes/:slug/forks, GET /palettes/:slug/
                     provenance, GET /palettes/mine, GET /palettes/:slug/versions/:hash.
                   NOTE (MT-F022 discipline): a naive `grep -rn provenance demo/` returns 5 hits and
                   `grep -rni suspend demo/` returns 6 — EVERY ONE is a prose comment or an
                   unrelated identifier ("belt-and-suspenders"). The gate must read the transport
                   layer's path set, never grep the tree.

π           n/a.   DELTA  the five spec transcripts, RED then GREEN.

CARRIES     AB-2, AB-5, AB-7, AB-9  BUILD.
            AB-6 / DR-33  RETIRE — re-premised (R-6). DR-33's disposition is UNCHANGED; its stated
                    truth is completed. The defect was never the LRU; it was that three closes
                    reported a property the code does not have — and the measurement now shows a
                    fourth thing nobody reported: the property is unreachable regardless.
            AB-9's ruling  — one sitting, not per-route: /versions/:hash retires with W.L8's AB-4;
                    /forks and /provenance are WIRED by DR-28's UI arm (provenance is the one
                    surface that already redacts correctly, forks.ts:196-212); the four admin rows
                    are the owner's call in DR-29's sitting, and SUSPEND in particular is either
                    wired into AdminUsersPanel or the whole enforcement path at session/resolve.ts:
                    28-53 (a 60s/10,000-entry cache plus an OwnershipError throw) deletes with it.
            AB-12  RETIRE (record-only) — the four negative results ride the registry so a later
                    seat re-finding "the openapi spec might drift" or "idempotency consumes the
                    body" is answered by measurement rather than re-litigation.

BANKS       BANK-L9-1: the second replica.
              $ grep -c 'replicas:' api/compose.yaml
            Re-trigger as command, and it is a DEPLOYMENT FACT rather than a wave (DR-33's own
            words): if a second replica is ever provisioned, the per-process replay store's
            relaxation stops being the honest KISS choice and the row reopens.

ENV         `cd api && npx vitest run` on mongodb-memory-server. Blind to: multi-replica behaviour,
            production index selectivity, and real Docker healthcheck timing (the 15s start_period
            interacts with AB-5's scan cost as the collection grows — unmeasurable here, and the
            wave says so rather than pretending).

COMPLETABLE YES. Four independent one-line-to-one-file cures and five specs, none depending on
            another. Split-safe: any subset closes on its own gate.
```

---

## §5 — THE CARRY TABLE (L-5: BUILD · FOLD · RETIRE, nothing re-booked)

| row | disposition | wave | note |
|---|---|---|---|
| MTS-01, MTS-02 | BUILD | W.L1 | with LIB-01 — one mechanism, four sites |
| MTS-03, MTS-04, MTS-05 | BUILD | W.L2 | MT-F019 FOLDs in, cited not re-found |
| MTS-06 | BUILD | W.L3 | |
| MTS-07 | BUILD | W.L5 | = FP-01 |
| MTS-08, MTS-09, MTS-10 | BUILD | W.L4 | one barrel-discipline mechanism |
| MTS-11 | RETIRE (correction) | W.L4 preamble | MT-F024's §scope corrected to 297/288; disposition unchanged |
| MTS-12 | RETIRE (ruling R-3) | — | a sizing input, not a wave; booked before any wave is written |
| MTS-13 (a)-(e) | FOLD | W.L4 | (f) **REFUTED**, struck |
| MTS-14 | RETIRE (ruling R-2c) | W.L4/W.L6 | shape (i) lands; shape (ii) explicitly rejected |
| MTS-15 | BUILD | W.L4 | discharges DR-18's `src/` half |
| KF-R1-REACH | FOLD | W.L1 + W.L6 | value-side cure + the E13 packet; the pin bump is the only vehicle |
| KF-EASE-REF, KF-LEAVES-TAUT, KF-UNUSED-BLIND, KF-PROVENANCE, KF-ATLAS-FENCE | BUILD | W.L7 | |
| KF-SPLIT-HOME | FOLD | W.L4 → W.L6 | additive re-export; keyframes drops 13 imports at the bump |
| KF-EVAL-THROW | FOLD | W.L6 | the catalog fence rides the cut it fences |
| KF-41-DEMAND | FOLD | W.L6 | the measured answer to the 4.1 question |
| FP-01, FP-02, FP-03, FP-04 | BUILD | W.L5 | |
| ISO-01 | BUILD | W.L5 | facility 19 |
| ISO-02 | RETIRE (record-only) | W.L5 | as-specified vs as-built annotation |
| PT-01, PT-02, PT-04 | FOLD | parser band | debts #1/#3 re-specified, G6 gains a rejection leg — no verdict disputed |
| PT-03 | FOLD | parser band G7 | the ARMED cell; input to OC-1, not its resolution |
| PT-05 | FOLD | DR-14 boot/eager-bytes | the adoption-cost measurement, taken before the grammar lands |
| PT-06 | FOLD | parser band G8 | one textual zero on `import { lazy }` from the barrel |
| PT-07 | FOLD | W.L1 + parser band | the JS-boundary guard becomes a NAMED invariant above parse-that |
| PT-08 | RETIRE (record-only) | — | dist-drift characterised: rollup identifier allocation only, no semantic divergence; `dist/` is gitignored; G6's vendored tarball remains the oracle for a measured reason |
| AB-1, AB-3, AB-4, AB-10 | BUILD | W.L8 | |
| AB-11 | RETIRE (subtraction) | W.L8 | no gate — L-8 |
| AB-2, AB-5, AB-7, AB-9 | BUILD | W.L9 | |
| AB-6 / DR-33 | RETIRE (re-premised) | W.L9 | disposition unchanged; the truth completed |
| AB-8, AB-12 | RETIRE (record-only) | W.L8/W.L9 | ledger corrections + the negative half |
| LIB-01, LIB-02 | BUILD | W.L1 | new |
| LIB-03 | BUILD | W.L4 | new |
| LIB-04 | FOLD | W.L4 | new — corrects MTS-10's gate |
| LIB-05 | FOLD | W.L4 / BANK-L4-1 | new — DR-18 gets a runnable command |
| DR-12 | FOLD | W.L1 | the non-colour half of the 4.0.1 cut |
| DR-18 | FOLD | W.L4 | home moves, identity preserved (R-11) |
| DR-21 | BUILD, DISCHARGED | W.L6 | with the measured evidence tuple |
| D-GAP-6 | RETIRE | W.L6 | permanently, on measured demand |
| DR-28 | (unchanged, W.W7) | — | + the AB-1 precondition rider |
| DR-33 | RETIRE | W.L9 | re-premised, not re-booked |

**The forbidden deferral string of SCOPE.md §3 — and every synonym of it — appears nowhere in this
program.** (Written this way deliberately: quoting the literal here would leave a match for a later
grep to read as a violation, which is precisely the false-finding mechanism FORMATION-LAWS L-11's
method note and MT-F022 both record.)

---

## §6 — THE BANKS (L-4: each re-trigger is written as the command)

| bank | command | fires when |
|---|---|---|
| BANK-L4-1 | `node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs 2>&1 \| grep LIB-05` | the over-cap list reaches ≤ 2 files → the cap goes into CI as a hard gate |
| BANK-L5-1 | `cd ~/Programming/fourier-analysis && grep -rnE '@router\.(get\|post\|patch\|put\|delete)' api/routers/*.py \| wc -l` | the count leaves 30 → facility 19's as-built census is stale and re-runs |
| BANK-L6-1 | `grep -n '"@mkbabb/value.js"' ~/Programming/keyframes.js/package.json` | a 4.1+ additive symbol lands while this reads an exact version below the cut → a coordination packet is owed |
| BANK-L7-1 | `cd ~/Programming/atlas && node -e "console.log(require('./node_modules/@mkbabb/value.js/package.json').version)"` | it leaves 3.x → the 16 root imports stop being dormant and the migration is due |
| BANK-L9-1 | `grep -c 'replicas:' ~/Programming/value.js/api/compose.yaml` | a second replica is provisioned → DR-33's accepted relaxation reopens as a deployment fact |

Every bank is swept by running its command at every wave open (L-4 corollary). A bank nobody runs is
a deferral wearing a bank's name.

---

## §7 — WHAT THIS PROGRAM CONCEDES

Recorded because a program that concedes nothing has not been read adversarially.

1. **W.L8's live evidence is inherited, not re-executed here.** I verified the entire static chain
   in-seat — the four unguarded reads, the single `isActivePublic` caller, the fork's
   `visibility:"public"` child, the missing delete methods, the unread `:slug` — but I did not
   re-run the sweep's mongodb probe. The static chain is sufficient to author against and the
   harness is 24 seconds; the wave's first act is to run it.
2. **AB-2's type-bracketing is BSON semantics, cited, not re-measured here.** The three facts that
   compose it (the cursor writes a String, the predicate compares against `_id`, the driver mints an
   ObjectId) are each verified in this seat.
3. **PT-03's 1.47× is one machine, N=1** (node v26.0.0, darwin arm64), measured in separate
   processes so cell ordering cannot manufacture it. It is an input to OC-1 and pre-empts nothing.
4. **FP-04's CSSOM claim rests on one transcribed step** — that `getComputedStyle` on an unregistered
   custom property substitutes `var()` without resolving types and leaves `light-dark()` unresolved.
   W.L5 takes exactly one headed `evaluate` before landing the cure, and no more (probe parsimony).
5. **The 4.1 cut's contents are a ruling, not a measurement.** A-5 (`toHex`) and A-6
   (`resolveCssColor`) are what the fourier pairing *needs*; whether value.js *wants* them on its
   surface is an owner-adjacent design call. They are specced as tri-fold rulings (R-12), not as
   foregone conclusions.
6. **I found one of my own false signals and killed it.** My first AB-9 pass showed `provenance` at
   5 demo hits and `suspend` at 6 — all prose. And a `toRgba8` "failure" I nearly recorded was me
   passing a `Result` where an `AnyColor` was declared; the signature said so and I had not read it.
   Both are MT-F022 and L-9 firing in this seat's own hands, which is the only reason they are not
   in §2.

---

*Probes authored or exercised this session, all reproducible from the value.js repo root:*
`docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs` (NEW — 12 RED, exit 1) ·
`.../src-surface-totality.mjs` (28 RED, exit 1) ·
`.../fourier-value-import-drift.mjs` (3/3 legs RED) ·
`.../fourier-vizcolor-oklch.mjs` (5/6 RED) ·
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs` (7 RED, exit 1) ·
`.../candO-expected-parity.mjs` (5 of 7 RED) ·
`cd ~/Programming/keyframes.js && ./node_modules/.bin/tsc --noEmit -p tsconfig.lib.json --noUnusedLocals` (9 errors).
node v26.0.0, darwin arm64, 2026-07-27.
