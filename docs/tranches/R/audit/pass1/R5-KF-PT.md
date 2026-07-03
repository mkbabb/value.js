# Lane R5-KF-PT — the keyframes.js + parse-that linkage frontier

> value.js Tranche R development audit, pass 1. Read-only across siblings. Maps every
> open ASK that keyframes.js (through tranches P/Q/R/S) or parse-that places on value.js,
> plus the linkage risks that gate value.js R work. Spine:
> **parse-that → value.js → keyframes.js → glass-ui**.

## TL;DR

- **The entire VJ-Q roster (VJ-Q1…Q9) SHIPPED** in value.js `1.1.1` (`fd3c7ce`, VJ-Q1) +
  `1.2.0` (`e80b359`, VJ-Q2…Q9). keyframes.js R has **consumed / recorded / killed all of
  them** — DM-5 S8 `.fnName` VERIFIED-GREEN, DQ-3 `contrast-color()` KILLed (no kf
  use-case), VJ-Q9 serialization RECORDED-covered. See `keyframes.js/docs/tranches/R/FINAL.md:41-44`.
- **keyframes.js R and S open NO new formal value.js dispatch.** There is no
  `KF-TO-VALUEJS-R.md` or `-S.md` (confirmed: `find docs/tranches/R docs/tranches/S -iname '*VALUEJS*'` → empty).
  R is an internal 7-zone refactor; S is planning-only (`SPEC-v1.md`).
- **ONE live implicit value.js ask survives**: the `extractFunctions` param-shape naming
  friction (kf's R.W3 §2C `normalizeParam` workaround; S ledger item 61 `VJS_PARAM_BUG_MAX`).
- **parse-that is at 0.13.0** — value.js's `^0.13.0` pin is **current** (no pending gate today).
  But parse-that S.H2 plans a **1.0.0 legacy cut** that will break the caret and force a value.js re-pin.
- **The N-era easing-picker donor question is RESOLVED**: glass-ui shipped
  `EasingPicker.vue`/`EasingConfigurator.vue` + a `@mkbabb/glass-ui/easing` subpath that
  **consumes value.js easing callables** — a live downstream dependency to keep stable.

---

## 1. Open-asks ledger

### A. VJ-Q roster — ALL SHIPPED, ALL CONSUMED (no residual)

Source of asks: `keyframes.js/docs/tranches/Q/KF-TO-VALUEJS-Q.md`. Shipped in value.js
per commit stat inspection of `fd3c7ce` (1.1.1) and `e80b359` (1.2.0).

| Ask | What shipped in value.js | kf consume state (R) | Residual |
|---|---|---|---|
| **VJ-Q1** `contrast-color()` L7 + dead L6 stub delete | `1.1.1`: WCAG leaf in `units/color/contrast.ts` (`wcagRelativeLuminance`/`wcagContrastRatio`/`contrastColor`), `contrast-color()` eager-eval arm in `parsing/color.ts`, dead `color-contrast()` bbnf stub retired, gate `proof:contrast-color` | **KILL — reasoned** (no kf demo use-case; `R/FINAL.md:43`, `R.W8.md:162-167`) | none |
| **VJ-Q2** egress out-param family (gamut 37→<12) | `1.2.0`: `xyz2rgbFamilyInto` + per-space `*Into` + `getXyzFromIntoFn`; measured **37→9 allocs/call**; `proof:gamut-alloc` `N_TARGET` re-baselined 40→11 | inherited transparently | none |
| **VJ-Q3** `mixColorsInto` + `sampleColorRampAt` + structural `clone()` | `1.2.0`: all three (for…in clone drops the 3-array `Object.entries` form) | inherited | none |
| **VJ-Q4** `flatLeaf .fnName` (S8 terminal) | `1.2.0`: 7th `ValueUnit` ctor field, `clone()`-stable, stamped by `flattenObject` | **DM-5 S8 VERIFIED-GREEN** on 1.2.0 dist (`R/FINAL.md:41`, `R/PROGRESS.md:161`); kf WeakMap ceremony retired | none |
| **VJ-Q5** `/math` parse-that-free contract hold | `1.2.0`: `proof:subpath-budget`/`-resolve` confirm `@mkbabb/value.js/math` = one math-* chunk, zero grammar | kf `leaves.ts` externalized onto `/math` (R.W3 §2E narrowed the dep-cruiser rule to exempt `/math`) | see risk #4 (importmap) |
| **VJ-Q6** dashed-call arm + `<syntax>` validator | `1.2.0`: `--ident(args)` → `FunctionValue`, `scanDashedIdentFast`; `parsing/syntax.ts` (`validateSyntax`/`coerceToSyntax`/`parseSyntaxDescriptor`) | consumed; **but see the param-shape friction, ask B below** | partial (B) |
| **VJ-Q7** `if()` multibranch | `1.2.0`: `handleIf` emits full ordered clause list; N-branch serializer | consumed (kf `resolveIf` generalized) | none |
| **VJ-Q8** `ColorChannelPlan` SoA | `1.2.0`: `buildColorChannelPlan`+`packColorChannels`+`lerpColorChannels` (~5× fold, `bench/color-soa-fold.mjs`) | consumed | none |
| **VJ-Q9** none-channel + `color()`-wrapper round-trip | `1.2.0`: `Color.toString()` via `Number(v)` (none≠NaN); `formatColor` honors `COLOR_FUNCTION_FORM` | **RECORD — covered GREEN** by kf `proof:roundtrip-fidelity`+`proof:grammar-fuzz` (`R/FINAL.md:44`, `R/PROGRESS.md:164`) | none |

**Verdict:** the VJ-Q cross-repo contract is fully closed. Nothing from P or Q remains open against value.js.

### B. The ONE live implicit ask — `extractFunctions` param-shape naming

- **kf evidence**: `keyframes.js/docs/tranches/R/waves/R.W3.md:106-128` — kf's
  `resolve-values.ts` carries a `normalizeParam` **workaround** because "value.js 1.2.0…
  malformed output shape." R.W3.md:128 explicitly says **"File the upstream fix as a
  value.js dispatch."** Carried into S as ledger item **61 `VJS_PARAM_BUG_MAX`**
  (`SPEC-v1.md`, wave S.C4): *"deleted per its own lifecycle if extractFunctions is fixed upstream."*
- **value.js ground truth** (`src/parsing/stylesheet.ts:44-47`, `:637-661`): the
  `CustomFunctionParameter` type is `{ name; type?; defaultValue? }` — the `<syntax>`
  declaration is carried on the field named **`type`** (line 46 comment: *"the `<syntax>`
  declaration, e.g. `<length>` (VERBATIM)"*), and the default on **`defaultValue`**.
- **The friction**: value.js's OWN `@property` descriptor uses a field literally named
  **`syntax`** (`stylesheet.ts:38,456-458`), but `@function` params reuse **`type`** for
  the identical concept — an internal naming inconsistency kf reads as "mislaid." kf
  expected `{ syntax, default }`; got `{ type, defaultValue }`, so it shims.
- **The value.js R decision**: either (a) rename `CustomFunctionParameter.type` → `syntax`
  (+ `defaultValue` → `default`) to match the `@property` descriptor and let kf delete
  `normalizeParam`, or (b) explicitly RECORD the `{type, defaultValue}` shape as canonical
  (then kf's workaround is permanent-by-contract, not a bug). This is a **contract
  ratification**, not a defect fix — the parse is correct, only the field names differ from
  kf's expectation. **BC caveat**: option (a) is a breaking rename of a published 1.2.0
  descriptor field → a value.js MINOR at least, coordinated with a kf re-pin.

### C. parse-that asks that touch value.js (from kf S.H dispatch + r6 research)

kf's Tranche S opens a parse-that dispatch (`SPEC-v1.md §S.H`). These are parse-that-owned
but flow through value.js (value.js is parse-that's primary consumer):

| S.H wave | Ask | value.js relevance |
|---|---|---|
| **S.H1** packrat-epoch arming (perf, patch) | `PACKRAT_ARMED` gate so `packratEnter/Exit` are no-ops until a `memoize()` exists — today **3 fresh Maps allocate on EVERY default-path parse** (`r6-sota-parsing.md` F1: `parser.ts:43`, `packrat.ts:189-203`) | value.js **never opts into parse-that packrat** (uses its own `memoize`, `value.js/src/utils.ts:116`) → this is a **pure transparent GC win** value.js inherits on re-pin; "flows straight through value.js into every keyframes.js compile" (r6 F1). No value.js action. |
| **S.H2** 1.0.0 legacy cut + `chain()` fix | delete `span.ts` + all 15 `*Span` exports; fix `chain()` truthiness (`!state.isError`) | **0 value.js consumers of `*Span`** (r6 confirmed) → BC-safe by API. **BUT a 0.x→1.0.0 MAJOR breaks the `^0.13.0` caret** → forces a value.js re-pin `^1.0.0` (risk #1). |
| **S.H3** Pratt combinator (DEVELOP-only) | binding-power combinator over the Parser core "with the identified value.js `math.ts` consume-edge; **NOT implemented without value.js ratification**" (`SPEC-v1.md §S.H3`) | value.js hand-rolls Pratt/precedence in `math.ts` (`calc()` grammar). This is a **future design ask that would refactor value.js's calc parsing** onto a parse-that primitive. Design-only; awaits value.js sign-off on a consume-edge sketch. Not a build ask yet. |
| **S.H4** ledger closure | verify DQ-1 (packrat re-entrancy) + DQ-2 (dead API) landed in 0.13.0; **verify the color2Into cross-repo WATCH at re-pin** (S ledger item 46) | value.js verify-only; item 46 (P-era `color2Into` WATCH) resolves by the 1.2.0 VJ-Q2 shipment. |

---

## 2. Pin / version state (verified 2026-07-02)

| Package | Published | value.js pin | Status |
|---|---|---|---|
| `@mkbabb/parse-that` | **0.13.0** (`typescript/package.json`; tag `v0.13.0`; HEAD `2c806fb` "Tranche Q (0.13.0)") | `^0.13.0` (`value.js/package.json`) | **CURRENT** — pin matches published. No pending parse-that gate on value.js today. |
| `@mkbabb/value.js` | **1.2.0** (`e80b359`, branch `tranche-q`) | — | kf pins `^1.1.0` (auto-consumed 1.1.1) + explicit `^1.2.0` re-pin at Q.WG4 for the 1.2.0 family |
| `@mkbabb/keyframes.js` | **5.1.0** (`3b191ef`; R closed at 5.1.0) | consumes value.js `^1.2.0` | R = internal refactor; S = planning-only (audit pass1 on disk, `docs/tranches/S/audit/pass1/`) |

**parse-that pin is NOT a gate on value.js R work today.** The value.js `^0.13.0` caret is
satisfied. The next parse-that motion that touches value.js is the S.H2 **1.0.0 cut**, which
is planning-only in kf's S tranche (unbuilt) — a future re-pin, not a current blocker.

---

## 3. The easing-selector / configurator donor question — RESOLVED

The N-era ask ("port the kf easing picker → glass-ui") is **CLOSED — landed in glass-ui**:

- glass-ui shipped `src/components/custom/easing/EasingPicker.vue` +
  `EasingConfigurator.vue` + `composables/useEasingPicker.ts` under
  **BB.W-EASING-PRIMITIVE** (`git log`: `dfb67f98`, `5102fe24`).
- It is published as its OWN subpath `@mkbabb/glass-ui/easing` (`src/subpaths/easing.ts`),
  deliberately carved OFF the value.js-free `/motion` barrel because it is the
  **"value.js-BEARING leaf of the motion system."**
- **The linkage that matters for value.js**: the picker **consumes value.js easing
  callables** — `CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`, `parseSteps`
  (`EasingPicker.vue:8-12,248,290,316`; `subpaths/easing.ts` header). All are on value.js's
  public barrel (`src/index.ts:243,249,250,255`), verified present.
- **kf 5.1.0** has NO easing picker of its own to donate — kf's easing work is
  `compile/easing-option` (a re-export carve, which kf S.C3 plans to DELETE per
  `SPEC-v1.md:309`). The picker UI is a **glass-ui** concern; the curve **math** is
  **value.js**. Clean boundary, already realized. **No value.js action** beyond keeping the
  five easing exports stable (a de-facto API-stability contract with glass-ui's published
  `/easing` subpath — risk #3).

---

## 4. Linkage risks

1. **parse-that 1.0.0 cut breaks the `^0.13.0` caret (MEDIUM, future).** kf S.H2 plans to
   delete `span.ts` + all 15 `*Span` and cut parse-that to 1.0.0. value.js has 0 `*Span`
   consumers (API-safe) but a 0.x→1.x MAJOR **escapes the `^0.13.0` caret** — value.js must
   re-pin `^1.0.0` and re-verify the 1912+ test suite when parse-that cuts. Not urgent (kf S
   is planning-only), but the value.js R/next-tranche should book the re-pin as a known edge.

2. **`extractFunctions` param-shape ratification (MEDIUM, live).** kf carries a
   `normalizeParam` workaround (R.W3 §2C) + a forever-open ledger row (S item 61) waiting on
   value.js to either rename `CustomFunctionParameter.type`→`syntax`/`defaultValue`→`default`
   (BC-breaking → coordinated minor + kf re-pin) or RECORD the current shape as canonical.
   Left unresolved, it is a soft perpetual across kf tranches. **This is the one genuine open
   value.js dispatch** buried in kf's R/S prose (no formal `KF-TO-VALUEJS` doc raised it).

3. **glass-ui `/easing` subpath silently depends on 5 value.js easing exports (LOW,
   standing).** `CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms`/`parseSteps` are
   now a **published cross-repo contract** (glass-ui `@mkbabb/glass-ui/easing` composes them).
   Any value.js rename/removal of these breaks glass-ui's picker. No gate guards this edge
   from the value.js side today — a rename would surface only at glass-ui build time.

4. **`@mkbabb/value.js/math` subpath importmap fragility (LOW, environmental).** kf's DM-13
   probe (`R/FINAL.md:125`) shows a lone lib-probe failing on `@mkbabb/value.js/math` being
   **unmapped in the local quiet-host vendor importmap** (the built `dist/keyframes.js` does
   NOT reference it; verifies in CI post-npm-install). value.js's `/math` subpath is
   contract-correct (VJ-Q5 held), but the subpath resolution is sensitive to consumer
   importmap setup — worth noting the `/math` leaf is a load-bearing externalization target.

5. **S.H3 Pratt combinator would refactor value.js `math.ts` (LOW, design-horizon).** If
   parse-that adopts a Pratt/precedence primitive, value.js's hand-rolled `calc()` precedence
   in `math.ts` becomes the ratifying consume-edge. Explicitly gated on value.js sign-off
   (`SPEC-v1.md §S.H3`) — a future architectural transposition opportunity, not a current ask.

---

## 5. Net for value.js Tranche R

- **No inbound build asks from kf P/Q/R** — the VJ-Q contract is fully consumed. value.js R
  is **unblocked** by the kf linkage on the ask side.
- **The one thing to schedule**: resolve the `extractFunctions` param-shape contract (risk #2)
  — either the `type`→`syntax` rename (kf deletes its workaround) or a canonical RECORD.
- **Two edges to book (not build)**: the future parse-that 1.0.0 re-pin (risk #1) and the
  standing glass-ui `/easing` export-stability contract (risk #3).
- parse-that pin `^0.13.0` is current; nothing gates value.js there today.
