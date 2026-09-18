SERVED MODEL: claude-opus-5[1m]

# X-W1 · X.W1.a — the born-RED typecheck baselines (G-1 / NG-3)

Measured at `5657f69fb3336c38b14f6c8e951459423e5875a6`, 2026-09-18T04:45:03Z, BEFORE any cure byte.
Both programs are created by this unit; before them neither tree was in any
TypeScript program (`grep -rn 'e2e' tsconfig*.json eslint.config.*` → 0 at open).

## `npx tsc -p tsconfig.e2e.json --noEmit` — the e2e program

```
e2e/smoke/a11y-modality-support.spec.ts(77,26): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/a11y-modality-support.spec.ts(80,27): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/admin/admin-walk.spec.ts(65,17): error TS2339: Property 'path' does not exist on type '{ path: string; heading: string; control: Control; } | undefined'.
e2e/smoke/admin/admin-walk.spec.ts(65,23): error TS2339: Property 'heading' does not exist on type '{ path: string; heading: string; control: Control; } | undefined'.
e2e/smoke/admin/admin-walk.spec.ts(65,32): error TS2339: Property 'control' does not exist on type '{ path: string; heading: string; control: Control; } | undefined'.
e2e/smoke/admin/fixtures/a11y-battery.ts(113,27): error TS2532: Object is possibly 'undefined'.
e2e/smoke/admin/fixtures/a11y-battery.ts(114,25): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/admin/fixtures/a11y-battery.ts(114,31): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/admin/fixtures/a11y-battery.ts(114,37): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/admin/fixtures/a11y-battery.ts(136,27): error TS2488: Type '[number, number, number, number] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.
e2e/smoke/admin/fixtures/admin-auth.ts(35,38): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/admin/fixtures/admin-populated.ts(28,8): error TS2307: Cannot find module '../../../../demo/@/lib/palette/types' or its corresponding type declarations.
e2e/smoke/admin/fixtures/admin-populated.ts(121,50): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/admin/flows/tag-create.spec.ts(40,22): error TS2339: Property 'category' does not exist on type 'never'.
e2e/smoke/fixtures/browse-palettes.ts(19,30): error TS2307: Cannot find module '../../../demo/@/lib/palette/types' or its corresponding type declarations.
e2e/smoke/fixtures/frame-diff.ts(105,21): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/fixtures/frame-diff.ts(108,27): error TS18048: 'rawByte' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(108,37): error TS18048: 'a' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(111,27): error TS18048: 'rawByte' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(111,37): error TS18048: 'b' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(114,27): error TS18048: 'rawByte' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(114,39): error TS18048: 'a' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(114,43): error TS18048: 'b' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(117,27): error TS18048: 'rawByte' is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(117,43): error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/fixtures/frame-diff.ts(144,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(144,38): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(145,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(145,42): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(146,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(146,42): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(159,14): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(160,14): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/frame-diff.ts(161,15): error TS2532: Object is possibly 'undefined'.
e2e/smoke/fixtures/user-auth.ts(56,38): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/fixtures/user-auth.ts(57,38): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/fixtures/user-auth.ts(58,40): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
e2e/smoke/oracles/o12-blob-seat.spec.ts(150,22): error TS2379: Argument of type '{ position: undefined; force: true; }' is not assignable to parameter of type '{ force?: boolean; modifiers?: ("Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift")[]; noWaitAfter?: boolean; position?: { x: number; y: number; }; timeout?: number; trial?: boolean; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'position' are incompatible.
    Type 'undefined' is not assignable to type '{ x: number; y: number; }'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(82,28): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(82,41): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(84,21): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(84,37): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(84,53): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(442,40): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(442,53): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(444,33): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(444,49): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o14-preview-truth.spec.ts(444,65): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(119,32): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(119,45): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(121,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(121,41): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(121,57): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(245,32): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(245,45): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(247,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(247,41): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(247,57): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(480,36): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(480,49): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(482,29): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(482,45): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(482,61): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(559,34): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(559,47): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(803,36): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(803,49): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(806,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(807,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o18-contrast-census.spec.ts(808,25): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(91,29): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(91,41): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(103,33): error TS18048: 'terminal' is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(103,44): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(104,34): error TS18048: 'terminal' is possibly 'undefined'.
e2e/smoke/oracles/o1b-ground-luma-leap.spec.ts(104,45): error TS2532: Object is possibly 'undefined'.
e2e/smoke/oracles/o21-gradient-rail.spec.ts(144,21): error TS18047: 'b' is possibly 'null'.
e2e/smoke/oracles/o21-gradient-rail.spec.ts(144,27): error TS18047: 'b' is possibly 'null'.
e2e/smoke/perf/eager-payload.spec.ts(221,9): error TS2322: Type '{ lcp: number | undefined; fcp: number; tbt: number; tbtLighthouseWindow: number; cls: number; longTasks: number; tasks: { start: number; dur: number; }[]; windowEndMs: number; transferBytes: number; resources: number; }' is not assignable to type 'LoadSample'.
  Types of property 'lcp' are incompatible.
    Type 'number | undefined' is not assignable to type 'number'.
      Type 'undefined' is not assignable to type 'number'.
e2e/smoke/perf/frame-budget.ts(173,5): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(116,46): error TS2379: Argument of type '{ baseURL: string | undefined; viewport: { width: number; height: number; }; }' is not assignable to parameter of type 'BrowserContextOptions' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'baseURL' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,27): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,59): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,74): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,95): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,114): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,131): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,151): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(128,174): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,27): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,58): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,72): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,92): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,110): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,126): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,145): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(131,167): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(135,12): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(136,12): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(145,13): error TS2345: Argument of type 'LcpRecord | undefined' is not assignable to parameter of type 'LcpRecord'.
  Type 'undefined' is not assignable to type 'LcpRecord'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(147,16): error TS2345: Argument of type 'LcpRecord | undefined' is not assignable to parameter of type 'LcpRecord'.
  Type 'undefined' is not assignable to type 'LcpRecord'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(152,20): error TS18048: 'light' is possibly 'undefined'.
e2e/smoke/perf/o24-lcp-identity.spec.ts(156,20): error TS18048: 'dark' is possibly 'undefined'.
e2e/smoke/reactivity-instant.spec.ts(131,9): error TS18048: 'median' is possibly 'undefined'.
e2e/smoke/reactivity-instant.spec.ts(169,9): error TS2412: Type 'undefined' is not assignable to type 'number' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
e2e/smoke/reactivity-instant.spec.ts(197,13): error TS2412: Type 'undefined' is not assignable to type 'number' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
e2e/smoke/reactivity-instant.spec.ts(249,9): error TS18048: 'median' is possibly 'undefined'.
e2e/smoke/safari/dual-webgl-atmosphere.spec.ts(72,5): error TS2322: Type 'Promise<Disposable>' is not assignable to type 'Promise<void>'.
  Type 'Disposable' is not assignable to type 'void'.
e2e/visual/capture.ts(431,33): error TS2339: Property 'animationName' does not exist on type 'Animation'.
e2e/visual/capture.ts(431,52): error TS2339: Property 'transitionProperty' does not exist on type 'Animation'.
e2e/visual/census-parity.spec.ts(46,5): error TS2322: Type '(string | undefined)[]' is not assignable to type 'string[]'.
  Type 'string | undefined' is not assignable to type 'string'.
    Type 'undefined' is not assignable to type 'string'.
e2e/visual/census-parity.spec.ts(57,5): error TS2322: Type '(string | undefined)[]' is not assignable to type 'string[]'.
  Type 'string | undefined' is not assignable to type 'string'.
    Type 'undefined' is not assignable to type 'string'.
e2e/visual/census-parity.spec.ts(57,16): error TS2532: Object is possibly 'undefined'.
e2e/visual/census-parity.spec.ts(68,5): error TS2322: Type '(string | undefined)[]' is not assignable to type 'string[]'.
  Type 'string | undefined' is not assignable to type 'string'.
    Type 'undefined' is not assignable to type 'string'.
e2e/visual/census-parity.spec.ts(68,16): error TS2532: Object is possibly 'undefined'.
e2e/visual/census-parity.spec.ts(93,59): error TS2677: A type predicate's type must be assignable to its parameter's type.
  Type 'string' is not assignable to type 'CensusRightPane'.
e2e/visual/census-parity.spec.ts(97,27): error TS2345: Argument of type 'string' is not assignable to parameter of type 'CensusRightPane'.
e2e/visual/golden-integrity.spec.ts(153,22): error TS2532: Object is possibly 'undefined'.
e2e/visual/golden-integrity.spec.ts(154,26): error TS2532: Object is possibly 'undefined'.
e2e/visual/golden-integrity.spec.ts(155,25): error TS2532: Object is possibly 'undefined'.
e2e/visual/modality.visual.spec.ts(92,56): error TS2353: Object literal may only specify known properties, and 'reducedMotion' does not exist in type 'Fixtures<{}, {}, PlaywrightTestArgs & PlaywrightTestOptions & VisualFixtures, PlaywrightWorkerArgs & PlaywrightWorkerOptions>'.
e2e/visual/modality.visual.spec.ts(100,56): error TS2353: Object literal may only specify known properties, and 'forcedColors' does not exist in type 'Fixtures<{}, {}, PlaywrightTestArgs & PlaywrightTestOptions & VisualFixtures, PlaywrightWorkerArgs & PlaywrightWorkerOptions>'.
```

## `npx vue-tsc -p tsconfig.test.json --noEmit` — the unit program

```
test/ink.test.ts(108,62): error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
test/ink.test.ts(109,62): error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
test/ink.test.ts(114,50): error TS18048: 'a2' is possibly 'undefined'.
test/ink.test.ts(114,55): error TS18048: 'a1' is possibly 'undefined'.
test/math.test.ts(307,40): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(318,40): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(328,42): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(339,42): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(353,40): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(357,42): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(391,42): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(395,42): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/math.test.ts(400,44): error TS2345: Argument of type 'number[][]' is not assignable to parameter of type 'readonly (readonly [x: number, y: number])[]'.
  Type 'number[]' is not assignable to type 'readonly [x: number, y: number]'.
    Target requires 2 element(s) but source may have fewer.
test/status-lamp.test.ts(149,15): error TS2488: Type '[message?: any, ...optionalParams: any[]] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.
test/transform/decompose-targeted.test.ts(46,50): error TS2556: A spread argument must either have a tuple type or be passed to a rest parameter.
test/transform/decompose-targeted.test.ts(87,41): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(92,39): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(121,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(142,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(156,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(158,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(177,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(194,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(196,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(208,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(227,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(238,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(243,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(258,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(260,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(271,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(273,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(291,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(293,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(306,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(308,19): error TS2345: Argument of type 'Mat4' is not assignable to parameter of type 'number[]'.
  The type 'Mat4' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
test/transform/decompose-targeted.test.ts(334,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(353,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(372,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(394,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(416,37): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(449,41): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/transform/decompose-targeted.test.ts(461,34): error TS2345: Argument of type '[number, number, number]' is not assignable to parameter of type 'Mat4'.
  Source has 3 element(s) but target requires 16.
test/transform/decompose-targeted.test.ts(473,34): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'Mat4'.
  Target requires 16 element(s) but source may have fewer.
test/v4-c1.test.ts(53,35): error TS2556: A spread argument must either have a tuple type or be passed to a rest parameter.
test/value-domain-clamp.test.ts(35,26): error TS2339: Property 'hue' does not exist on type 'Readonly<{ key: string; min: number; max: number; unit: "" | "%" | "deg" | "K"; hue?: true; }> | { key: string; min: number; max: number; unit: "K"; }'.
  Property 'hue' does not exist on type '{ key: string; min: number; max: number; unit: "K"; }'.
test/value-domain-clamp.test.ts(51,26): error TS2339: Property 'hue' does not exist on type 'Readonly<{ key: string; min: number; max: number; unit: "" | "%" | "deg" | "K"; hue?: true; }> | { key: string; min: number; max: number; unit: "K"; }'.
  Property 'hue' does not exist on type '{ key: string; min: number; max: number; unit: "K"; }'.
test/value-domain-clamp.test.ts(63,75): error TS2339: Property 'hue' does not exist on type 'Readonly<{ key: string; min: number; max: number; unit: "" | "%" | "deg" | "K"; hue?: true; }> | { key: string; min: number; max: number; unit: "K"; }'.
  Property 'hue' does not exist on type '{ key: string; min: number; max: number; unit: "K"; }'.
```
