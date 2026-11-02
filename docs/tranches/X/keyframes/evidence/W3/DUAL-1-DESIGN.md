SERVED MODEL: claude-opus-5-5

# KF.W3 `.b` — DUAL-1 / `serializeCssValue` fork-unification DESIGN

**Seat** `.b`, 2026-11-02. **Design only — no product byte written.** Every keyframes.js byte below was read at `HEAD` (`git show HEAD:` / `git grep … HEAD`), kf `HEAD` = `origin/master` = `5c48e3da9bbb0df8a93ac04d1b1d136af20951e2`; the working tree's one dirty path (`KeyframeTimeline.vue`, sibling's) was never opened. value.js coordinate = the **registry tarball** `@mkbabb/value.js@4.1.0`, packed fresh into session scratch `kfw3b/` (non-durable; readings pasted here), ⟨`shasum -a1 mkbabb-value.js-4.1.0.tgz`⟩ → `d488535c9bfc747e318895417c28a753a3b7b3d6` (= registry `dist.shasum`, record OP-1 row 1). Spec: `docs/tranches/X/keyframes/waves/KF-W3.md` §B.5 censuses 1/1b/2 · G-KF3-4 · G-KF3-5 · L-6 · L-7. This file is design input to G-KF3-4 and G-KF3-5; **it turns no gate.**

## §0 Discharges, named BEFORE any edit

| gate | discharge | why (measured) |
|---|---|---|
| **G-KF3-5** | **(b) UNIFY-BY-TRUTH** | 4.1.0 publishes **no** `reverseAnimationShorthand` — census 1b: `0` on all seven subpaths (runtime keys and `.d.ts`), and ⟨`git grep -n reverseAnimationShorthand v4.1.0 -- src`⟩ in value.js → **0**. Discharge (a) would delete onto nothing (G-KF3-5 round-3 fail arm). kf's `css-text.ts:29` stands as the sole, acknowledged implementation; the PROVIDER-NAMING sentences are corrected to name kf. **No rename, no alias, no delete.** |
| **G-KF3-4** | **RETIRE onto `@mkbabb/value.js/css` `serializeCssValue`** (the gate has one discharge) | 4.1.0 `./css` exports it (census 1b) — the round-3 conjunct *"enumerable on `V`'s packed `./css` surface"* reads **TRUE**. |

## §1 Census 1 — `serializeCssValue` (LAW A, import graph at the frontier)

**Specifier alphabet, measured** (⟨`git show HEAD:tsconfig.json`⟩ `paths` :24-50 · ⟨`git show HEAD:vite.config.ts`⟩ `alias` :38-60): roots that reach `src/` = `@src/*` and the self-alias `@mkbabb/keyframes.js` → `src/animation/index.ts`; package `exports` = `.` and `./engine` only (no deep subpath). Demo roots `@utils` · `@components` · `@state` · `@composables` · `@kf-engine` · `@app` · `@styles` · `@assets` resolve under `demo/`/`assets/` — **`@utils` is the root that matters here** (§1.3).

Commands (kf, `HEAD`):
```
git grep -nF 'emit/css-text' HEAD -- .                                  # alias + long-tail spellings
git grep -nE 'from "(\.{1,2}/)+css-text"' HEAD -- .                     # every relative depth
git grep -lE "from ['\"][^'\"]*css-text['\"]" HEAD -- src demo test scripts   # any specifier, any quote
git grep -nE "import\(['\"][^'\"]*css-text" HEAD -- src demo test scripts     # dynamic imports
git grep -n  '\bserializeCssValue\b' HEAD -- src demo test scripts       # symbol census
```

### §1.1 The baseline's "22" decomposed
⟨`git grep -lE 'emit/css-text|from "\.{1,2}/css-text"' HEAD -- src demo test scripts | wc -l`⟩ → **22** (the record's baseline figure). It is a **file-mention count, not a consumer count**: ⟨any-specifier import grep `| wc -l`⟩ → **19 modules import `css-text`** (any symbol); the 3 remainder are **prose-only, non-import context** — `demo/utils/helpers.ts:71` (docblock), `src/animation/constants/types.ts:83` (docblock), `src/animation/public.ts:157` (comment). Dynamic `import()` of `css-text` → **0**. `@src/…css-text` spellings in code → **0** (two hits are in `docs/`, non-import).

Of the 19 importers, **6 import other symbols only** and are NOT consumers of the delete: `compile/adapter.ts:28` (`serializeTimingFunction`) · `compile/emit/backward/backward.ts:54` (`reverseCSSTime`) · `compile/emit/format/options.ts:19-23` (`reverseAnimationShorthand` · `reverseCSSTime` · `serializeStylesheetItem`) · `compile/emit/index.ts:57,:64` (re-exports `reverseCSSTime` · `serializeTimingFunction` · `serializeSelector`) · `compile/emit/view-transition.ts:40` (`reverseCSSTime`) · `compile/parse-facade.ts:66` (`serializeDeclaration`).

### §1.2 The delete's consumer set — **13 importing modules** + the in-file uses
| tier | module : import line (specifier) | call lines |
|---|---|---|
| src | `compile/emit/densify.ts:13` (`./css-text`) | `:51` |
| src | `compile/emit/entry.ts:37` (`./css-text`, with `reverseCSSTime`) | `:166` |
| src | `compile/emit/format/format.ts:7` (`../css-text`, with `serializeSelector`) | `:67` · `:338` (+ `:420` comment) |
| src | `compile/frame/interp-slot.ts:19` (`../emit/css-text`) | `:333` · `:336` |
| src | `engine/css/metadata.ts:38` in block `:37-40` (`../../compile/emit/css-text`) | `:158` |
| src | `resolve/browser.ts:4` (`../compile/emit/css-text`) | `:146` · `:217` |
| src | `resolve/conditional.ts:2` (`../compile/emit/css-text`) | `:84` · `:119` |
| src | `resolve/function.ts:6` (`../compile/emit/css-text`) | `:34` |
| test | `test/compile/structural-emit.test.ts:10` (`../../src/animation/compile/emit/css-text`) | `:75` |
| test | `test/resolve/emerging-css-resolve-fn.test.ts:31` (same) | `:80` |
| test | `test/resolve/emerging-css-resolve-now.test.ts:23` (same) | `:38` |
| test | `test/resolve/emerging-css-resolve-p2.test.ts:26` (same) | `:45` |
| test | `test/resolve/value4-immutable-resolve.test.ts:9` (same) | `:56` · `:66` · `:80` |

**In-file uses** (`css-text.ts`): definition `:53-68`; recursive `:55` · `:60` (die with the fork); callers `:98` (`serializeDeclaration`) · `:115` (`@property initial-value`) · `:121` (`@function` parameter default). The `:66` throw = `if (!serialized.ok) throw new TypeError("Value returned an unserializable CSS color.");` (spec cited `:54`; drift +12, INTENT at the true bytes).

**Delta vs the spec's census (14 = 8 src · 1 demo · 5 test, at `81a56990`)**: src **8 = 8** (same eight modules; anchors drifted — `format.ts:1`→`:7`, `metadata.ts:33-35`→`:37-40`); test **5 = 5** (identical, all five inside G-KF3-3 arm (c)); **demo 1 → 0** — see §1.3.

### §1.3 FINDING — the demo consumer moved off the fork onto a SECOND copy (SUBJECT-IDENTITY)
The spec's demo consumer `timelineEngine.ts:17 import { serializeCssValue } from "@src/animation/compile/emit/css-text"` **no longer exists**. At kf `b0d378b0` (2026-09-18, *"KF-CE-12 — the timeline's two emit reaches re-home to the demo's own bodies (KF.W8 .c)"*, `helpers.ts +39`) the demo was given its **own body**:
- `demo/components/instrument/timeline/utils/timelineEngine.ts:1-5` — `import { camelCaseToHyphen, hyphenToCamelCase, serializeCssValue } from "@utils/helpers";`, call `:196`.
- `demo/utils/helpers.ts:75-96` — `export const serializeCssValue = (value: CssValue): string => {…}` — **byte-for-byte the fork's algorithm** (call · list-separator · number · keyword · `serializeCssColor`), ending `:91-93` `if (!serialized.ok) { throw new TypeError("Value returned an unserializable CSS color."); }` — **the same throw text as `css-text.ts:66`**.
- Its docblock `helpers.ts:66-74` states the premise: *"value.js … publishes no value serializer; keyframes.js's own body … is library-private … The demo therefore owns its own projection of a PUBLISHED data model."* At 4.1.0 that premise is **false** (census 1b: `./css` publishes `serializeCssValue`).

So the symbol name matched the spec's anchor class while the **provider changed** — the R3-4 SUBJECT-IDENTITY class. **Consequence for G-KF3-4**: the gate's falsifier arm *"fails if green is obtained by re-implementing the fork under another name inside kf"* and its predicate *"every consumer imports it from `./css`"* both reach this copy: a retirement of `css-text.ts:53-68` alone leaves **a live, diverged fork inside kf** (same `:`/`;` divergence, §3) whose only reason to exist is a falsified premise. **Design: `.c2` deletes `helpers.ts:66-96` (docblock + body) and routes `timelineEngine.ts` to `@mkbabb/value.js/css`** — same concern, same commit (L-7). `.c2`'s planned writable set names `timelineEngine.ts` but **not** `demo/utils/helpers.ts`; this is the twin-site case of COHESION §0bt's ADJACENT-LINE rule (the dead re-export/twin of the file whose fork is deleted), so `.c2` lists `demo/utils/helpers.ts:66-96` (and its imports that the delete leaves unused — `:18` `serializeCssColor`, `:19` type `CssColor`, `:20` type `CssValue`: ⟨`git grep -n serializeCssColor HEAD -- demo/utils/helpers.ts`⟩ → `:18` import, `:91` the fork's only call) under "adjacent edits". helpers.ts has no other `serializeCssValue` consumer: ⟨symbol census, `demo/`⟩ → `timelineEngine.ts:4,:196` + `helpers.ts:75,:77,:86` only.

## §2 Census 1b — the ROUTING TARGET at the consumed coordinate (packed artifact, L-12)
Command (scratch, registry tarball untarred; `c1b.mjs` = the spec's census-1b loop, extended to list `./css`'s `serialize*`/`reverse*` names), ⟨`guarded --light -- node c1b.mjs <tarball>/package`⟩ ×2, `cmp` identical:
```
color 31 []
value 1 []
css 20 ["serializeCssValue"] ["serializeCssColor","serializeCssValue","serializeTimelineOptions"]
easing 17 []
math 9 []
transform 3 []
quantize 2 []
TOTAL 83
```
- `serializeCssValue` **IS** on `./css` (and on no other subpath); `reverseAnimationShorthand` is on **none** (`.d.ts` grep over `dist/subpaths/*.d.ts` → the single hit `css.d.ts:303`, `serializeCssValue` only). `TOTAL 83` = the record's OP-1 `runtimeExports 83`.
- Full `./css` key set (20): `coerceToSyntax collectAnimationOptions collectCustomFunctions collectDeclarations collectKeyframes collectPropertyDescriptors collectStyleRules collectTimelineOptions parseAnimationRange parseAnimationTimeline parseCssColor parseCssScalar parseCssValue parseCssValues parseKeyframeSelector parseStylesheet parseTimingFunction serializeCssColor serializeCssValue serializeTimelineOptions` — **no shorthand inverse under any name** (SUBJECT-IDENTITY for G-KF3-5).
- **Signature** `css.d.ts:303`: `export declare function serializeCssValue(value: CssValue): Result<string, ColorIssue>;` — **NOT `string`**. Source of record value.js `v4.1.0:src/css/serialize.ts:79-101`, re-exported `src/css/index.ts:91`. The retirement is therefore **an unwrap at every call site, not a specifier swap** (value's 2026-09-18 cut notice `keyframes-inbox-2026-09-18-value-4.1-cut-notice.md:111-116` already declared this).

## §3 The text differential — kf fork vs value 4.1.0 `serializeCssValue`
**Method.** `diff.mjs` (scratch) carries the fork **verbatim** from kf `HEAD` `css-text.ts:53-68`, bound to 4.1.0's own `serializeCssColor` — so the only variable is the fork's algorithm vs the published one (the colour leaf is the same function on both sides; any 4.0.0→4.1.0 colour-text change is the **repin's** attribution, `.c1`, not this retirement's). Each fixture is parsed with 4.1.0 `parseStylesheet`; every declaration value (`@keyframes` rules · `@property initial-value` · `@function` params/declarations · nested style items) is serialized both ways and compared. ⟨`guarded --light -- node diff.mjs <tarball>/package <14 fixtures from git show HEAD:test/fixtures/keyframes/*.css>`⟩ ×2, `cmp` identical.

### §3.1 The 14 fixtures — **0 text changes**
```
box-shadow.css values 2 divergent 0          multi-prop.css values 6 divergent 0
color-achromatic.css values 2 divergent 0    opacity-3stop.css values 3 divergent 0
color-chromatic.css values 2 divergent 0     per-kf-easing.css values 3 divergent 0
drop-shadow.css values 2 divergent 0         property-block.css values 3 divergent 0
filter-multi.css values 2 divergent 0        steps-easing.css values 3 divergent 0
linear-easing.css values 3 divergent 0       transform-multiarg.css values 2 divergent 0
matrix3d.css values 2 divergent 0            var-calc.css values 4 divergent 0
FIXTURES 14 VALUES 39 DIVERGENT 0
```
(re-laid two-up for width; the raw output is one line per fixture.) **No fixture's expected text changes because of the retirement** — no 14-fixture `manifest.json` divergence row is owed *by `.c2`* (G-KF3-4's falsifier concerns a re-baseline *without* a row; with zero changed texts there is nothing to re-baseline). Any 14-fixture text change `.c1`'s repin produces is the colour leaf's / parser's, attributed there.

### §3.2 The divergence, named — ONE text-change class
The O-11 §B *"2 of 3 fixtures RED"* differential was **value.js's** 3-input fixture, not kf's 14 (`value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md:78-80`; reproduced in the 4.1 cut notice `keyframes-inbox-2026-09-18-value-4.1-cut-notice.md:103-108`). Controls, same run:
```
DIFF CONTROL "if(supports(color: red): red; else: blue)" | fork: "if(supports(color : rgb(255 0 0)) : rgb(255 0 0) ; else : rgb(0 0 255))" | value: "if(supports(color: rgb(255 0 0)): rgb(255 0 0); else: rgb(0 0 255))"
DIFF CONTROL "a : b" | fork: "a : b" | value: "a: b"
```
**The single text change**: in a **space-separated list**, value collapses whitespace before a `:` or `;` keyword token — `serialize.ts:100` `joined.replace(/\s+([:;])/g, "$1")` — the fork joins with `" "` and does not. Every other branch (call · comma/slash list · number · keyword · colour) is algorithmically identical. **The second behavioural change is not text**: an un-spellable / non-finite / out-of-range colour leaf answers `{ok:false, error:{code}}` (`color_invalid_input` · `color_non_finite` · `color_out_of_range`) instead of the fork's `throw new TypeError(…)`.

### §3.3 Where the text change lands in kf (arm (c) inputs)
Second run, `diff2.mjs`: the **27 distinct CSS value literals** declared in the five census-1 test modules (⟨`git grep -hoE '\{ [a-z-]+: [^}]*\}' HEAD -- <the five>`⟩, filtered to CSS-valued props), each parsed with 4.1.0 `parseCssValue` and **every sub-node** serialized both ways (what `resolve/conditional.ts:84 serializedArgs` actually serializes is the call's args). ×2, `cmp` identical → `INPUTS 27 NODES 151 DIVERGENT 28` — **all 28 in the `:`/`;` class, all inside the 7 `if()` inputs**, e.g.
```
"if(media(min-width: 600px): 10px; else: 20px)">if[0]>[0]>media[0] | fork: "min-width : 600px" | value: "min-width: 600px"
"if(supports(color: lch(0 0 0)): red; else: blue)">if[0]>[0]>supports[0] | fork: "color : lch(0% 0 0deg)" | value: "color: lch(0% 0 0deg)"
"if(style(--p: 12px): 100px; else: 0px)">if[0]>[0]>style[0] | fork: "--p : 12px" | value: "--p: 12px"
```
The 20 non-`if()` literals (custom-function calls, `calc()`/`var()`, `translateX(…)`, `sibling-index()`/`sibling-count()`, plain lengths/colours) → **0 divergent**.

**Named behaviour changes at the retirement (every one):**
1. `resolve/conditional.ts:84` `serializedArgs` → the condition text handed to `ctx.env.supports(…)` (`:130`) and `ctx.env.matchMedia(…)` (`:133`) changes `"color : lch(…)"` → `"color: lch(…)"`, `"min-width : 600px"` → `"min-width: 600px"`. The kf tests inject argument-blind mocks (`supports: () => true|false`, `matchMedia: () => ({matches})`, emerging-css-resolve-now `:49 :62 :73 :84 :96`, value4-immutable `:52`) — **no test asserts the argument text**, so no assertion changes. The new text is the spec spelling.
2. `resolve/conditional.ts:119` `evalStyleCondition` — compares `normalize(actual)` vs `normalize(serializeCssValue(expected))`; `expected = packed(items after the colon)`, so a `:`/`;` token reaches it only from a nested `if()` in the expected value. No kf input exercises that; no assertion changes.
3. Any emit path (`densify` · `entry` · `format` · `css-text` declaration/`@property`/`@function` · `metadata` · `interp-slot` discrete/computed) serializing a declared value that **contains** an `if()` emits `if(supports(x: y): a; else: b)` instead of `if(supports(x : y) : a ; else : b)` — the fork's spelling was the lossy one (it does not round-trip the authored text); value's witness `test/v4-css-emerging.test.ts` holds the direction. No kf fixture carries an `if()` (§3.1 = 0).
4. `test/resolve/*` + `structural-emit` helper-call sites — they call the fork directly; after the retirement their `serializeCssValue(...)` returns a `Result`, so each test unwraps (`.c2`'s re-route, assertions unchanged: `structural-emit.test.ts:75` `"translateX(10px)"` and `value4-immutable-resolve.test.ts:56` `"rgb(255 0 0)"` are non-divergent texts, §3.3).

## §4 G-KF3-4 design — the retirement as an unwrap (input to `.c2`)
**Constraints (from the gate, binding on `.c2`):** (i) the fork `css-text.ts:53-68` is **deleted**, and with it the `:66` throw — the terminus of C-2's chain from `KeyframesStringControls.vue` mount (`:313`, via `useKeyframesParsing.ts:51` → `format.ts`); (ii) the demo twin `helpers.ts:66-96` is deleted with it (§1.3); (iii) **no kf-local wrapper** that re-states the fork or re-raises the same `TypeError` under another name (the round-3 *"re-implementing the fork under another name"* arm) — a `serializeOrThrow` helper is exactly that and is barred; (iv) every one of §1.2's 13 modules + the 3 surviving in-file callers + `timelineEngine.ts` imports `serializeCssValue` from `@mkbabb/value.js/css` and **handles the `Result`**; (v) no masking fallback string (no `?? ""`, no `String(value)`), no `try/catch` around the call.

**Per-site disposition — the `!ok` arm goes to the refusal channel the enclosing code already has** (measured at `HEAD`; `.c2` re-reads each at the bytes and records any drift as INTENT):

| site | enclosing contract | existing channel the `!ok` arm joins |
|---|---|---|
| `resolve/function.ts:34` `coerceArg` | returns `Resolved<CssValue>` | the adjacent `coerced.ok` arm's own fallback `param.default ?? DROP` (`:36`) — an un-serializable arg cannot be coerced, the same outcome as a refused coercion |
| `resolve/conditional.ts:84` `serializedArgs` → `:130`/`:133` | `evalCondition` returns `boolean \| undefined` | `undefined` = *"cannot decide"* — `resolveIf` already returns the unresolved `fn` on `undefined` (`:154`) |
| `resolve/conditional.ts:119` `evalStyleCondition` | `boolean` | `false` — the function's own answer for every other undecidable branch (`:91 :95 :103 :106 :110`) |
| `resolve/browser.ts:217` | numeric-scalar resolution; throws `BrowserScalarResolutionError` (`:138`, typed `code`) | that typed error, constructed with the authored value — the module's declared refusal |
| `resolve/browser.ts:146` (inside that error's message) | message text | the value's `ColorIssue.code` spelled in the message; a message builder must not itself throw |
| `compile/emit/format/format.ts:338` (premultiplied block) | returns `{ refused: true, key }` on `:332` | the same `{ refused: true, key }` |
| `compile/emit/format/format.ts:67` · `densify.ts:51` · `entry.ts:166` · `css-text.ts:98/:115/:121` · `engine/css/metadata.ts:158` · `frame/interp-slot.ts:333/:336` · `timelineEngine.ts:196` | string-returning emitters with **no** refusal channel today | **`.c2` decides at the bytes, under (iii)/(v)**: propagate a typed refusal to the nearest caller that has one (`backward.ts`'s B-15 designed refusal channel; `compileToCSS`'s named-reason refusals) — the posture *beyond* that channel (what the demo shows) is **not this wave's** (L-5: KF.W2 / KF.W7). If a site has no reachable channel without widening a public signature, that is a **Triumvirate trigger for `.c2`, not a licence for a throw** |

**Reachability note (L-5: recorded, not cured):** at value 4.1.0 a **parse-sourced** `CssValue` never carries an un-spellable colour (`.a` act 2, `sercolor.mjs`: 18 spellings, serialize `!ok` on parsed-ok colours = 0), so on the declared-template sites the `!ok` arm is reached only by a programmatic `CssValue` (hand-built `hsv`/`kelvin`/`ictcp`/`jzazbz`, or a non-finite channel from computation). That is why the arm needs a channel and not a throw: the fork's throw turned a typed data condition into an uncaught mount crash.

**Fixture / manifest:** §3.1 ⇒ `.c2` owes **no** 14-fixture divergence row for the retirement. If `.c2` lands after `.c1`, a fixture text that `.c1`'s repin already changed carries `.c1`'s dated row, not a second one. **L-7 family (one kf commit):** fork delete + `helpers.ts` twin delete + every re-route/unwrap + the five test modules' unwraps; the vjs INBOX O-11 §B discharge row is its own vjs pathspec commit in the same act (record plan).

## §5 Census 2 — `reverseAnimationShorthand` (G-KF3-5), re-read line by line at `HEAD`
⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src demo test scripts`⟩ → **10 lines**: 1 definition · 1 import · 1 call · 7 prose (`demo/`, `scripts/` → 0).
- **Implementation (sole)**: `src/animation/compile/emit/css-text.ts:29` `export const reverseAnimationShorthand = (options: CSSAnimationOptions): string => [...]` (spec `:17`; drift +12).
- **Sole live import**: `compile/emit/format/options.ts:19-23` — `import { reverseAnimationShorthand, reverseCSSTime, serializeStylesheetItem, } from "../css-text";` (symbol `:20`, block closes `:23` on **kf's own** `../css-text`). **Call** `:122` `return reverseAnimationShorthand(cssOptions);` (spec `:121`, +1).
- **Provider check**: 4.1.0 publishes it on **no** subpath (§2); value.js `v4.1.0:src` → 0. ⇒ discharge **(b)**.

**Counting rule** (spec §B.5 census 2, verbatim intent): PROVIDER-NAMING iff the sentence names a provider for `reverseAnimationShorthand`; PROVIDER-SILENT iff it names the symbol without attributing it. Each sentence read whole (`git show HEAD:<path> | sed -n`):

| # | site (sentence span) | text at `HEAD` | class | `.c3` correction (discharge (b)) |
|---|---|---|---|---|
| 1 | `backward/backward.ts:20-21` | *"The per-child `animation` shorthand is value.js's OWN `reverseAnimationShorthand` (the published inverse of its shorthand parser), NOT a bespoke re-derivation."* | **NAMING** (false) | name kf: the shorthand is kf's own `reverseAnimationShorthand` (`emit/css-text.ts`), the inverse over value.js's `CSSAnimationOptions` model (what value.js's `./css` `collectAnimationOptions(declarations) → readonly CSSAnimationOptions[]` produces, `css.d.ts:59`), of which value.js 4.1.0 does not publish an inverse of |
| 2 | `format/options.ts:10` (sentence `:9-12`) | *"…the per-child `animation` SHORTHAND via value.js's `reverseAnimationShorthand` ({@link animationShorthand})…"* | **NAMING** (false) | *"via kf's `reverseAnimationShorthand` (`../css-text`)"* |
| 3 | `format/options.ts:80-86` (sentence opens `:80`) | *"K.W10 CC-1 — the per-child `animation` SHORTHAND emit via value.js's `reverseAnimationShorthand` (the published 0.12.0 inverse of the `animation`-shorthand parser) … the parser run BACKWARD over value.js's OWN shorthand grammar, NOT a bespoke re-derivation."* | **NAMING** (false: provider, *"published 0.12.0"*, *"value.js's OWN … grammar"*) | name kf as the provider; drop *"published 0.12.0"*; keep the true clause (the inverse targets value.js's `CSSAnimationOptions` data model) |
| 4 | `src/animation/index.ts:232-233` | *"HEAVY (compile.ts statically imports value.js's reverseAnimationShorthand /sampleColorRamp + the engine)…"* | **NAMING** (false) | name kf's emit tier as the HEAVY edge; the module is `compile/emit/backward/backward.ts` (there is no `compile.ts` importing it — `compile/value/compile.ts` does not; ⟨`git grep -n reverseAnimationShorthand HEAD -- src/animation/compile/value`⟩ → 0); `sampleColorRamp` is **not** imported by kf (⟨`git grep -n sampleColorRamp HEAD -- src`⟩ → only this comment), so the sentence's value.js edge is the colour kernels via `./color` (as `backward.ts:48-49` states) |
| 5 | `backward/backward.ts:256` | *"…the verbatim declared-template projection + the animation shorthand (reverseAnimationShorthand)."* | SILENT | in §B.2's carve under KF-CE-41; true as written under (b) — `.c3` may leave it or tighten it, it is not the predicate's subject |
| 6 | `backward/backward.ts:306` | *"`reverseAnimationShorthand` already emits `options.delay`; the EXTERNAL stagger/sequence offset layers on top here."* | SILENT | true under (b) (`css-text.ts:34` emits `options.delay`) — leave |
| 7 | `test/compile/compile-roundtrip.test.ts:23` | *"Born-RED in the FRONTIER sense: before this wave no `compileToCSS` existed (`reverseAnimationShorthand` unconsumed)."* | SILENT | historical provenance note; true — leave (comment-only if touched; assertions untouched) |

**Partition at `HEAD`: 4 PROVIDER-NAMING · 3 PROVIDER-SILENT** (spec at `81a56990`: 5 · 3). **Delta recorded, not inherited** (the gate's *"closing over the frozen five"* arm): **`backward.ts:46` has LEFT the partition** — ⟨`git show HEAD:…/backward.ts | sed -n 47,51p`⟩ (the BOUNDARY block, `:47` heading) now reads *"This module reaches value.js's COLOR kernels (`mixColors`/`convertColor`/`oklab`, via `./color`) and the `./engine`/`./group`/`./sequence` runtime…"* — it no longer names `reverseAnimationShorthand` (re-worded upstream of this wave); its value.js claim is the colour kernels, outside G-KF3-5's predicate. Anchor drift: echoes `:252/:285` → `:256/:306`; `options.ts:81` sentence opens `:80` (as the spec noted).

**G-KF3-5 GREEN predicate under (b)** (for `.c3`): ⟨`git grep -n '\breverseAnimationShorthand\b' HEAD -- src test`⟩ returns exactly **one implementation** (`css-text.ts:29`) and **zero** sentences attributing it to value.js / a published inverse — re-derive the partition at `.c3`'s HEAD (if it grew, the new member is a subject). Fail arms: any rename; any alias/shim; a delete; rows 1-4 still naming value.js.

**Neighbour, not this predicate (named so it is not lost):** `css-text.ts:13-18`'s `reverseCSSTime` docblock says *"value.js's `CSSAnimationOptions` carries no unit"* — false at 4.1.0 (`durationUnit`/`delayUnit`, `css.d.ts:93,97`); it belongs to `.c4` (UIA-KF-177), which plumbs those fields.

## §6 Hand-off
- **`.c2`** executes §4 (+ §1.3's twin). Census to re-run at its HEAD: §1's five commands; the consumer set is §1.2's 13 + in-file 3 + `timelineEngine.ts`. GREEN = fork + twin deleted ∧ census-1b `./css` lists `serializeCssValue` (§2, TRUE) ∧ every consumer imports from `@mkbabb/value.js/css` ∧ ⟨`git grep -n 'Value returned an unserializable CSS color' HEAD -- src demo`⟩ → 0.
- **`.c3`** executes §5 rows 1-4 (discharge (b)); rows 5-7 at its discretion under KF-CE-41; no rename.
- **L-6**: rows 1-4 are comment-stated invariants (*"value.js's OWN"*, *"published"*) — the test obligation is G-KF3-5's grep predicate plus census 1b's runtime enumeration (the provider sentence is checked against the packed surface, not against prose).
- **L-7**: `.c2` = one kf commit (§4 family); `.c3`'s prose correction = its own meaning, its own commit.
