claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `EquationView.vue` · **v2 (superseding)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationView.vue` (469 lines)
**Axis** C — how this seat consumes value.js `0.13` · keyframes `4.3` · glass-ui `^4.0.0` · the 45-operation fourier API; props/emits contract quality; integration seams.
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` (re-verified live; matches intake X-4 / R4-9) + the in-scope working-tree modifications — `EquationView.vue` is one of the 24 dirty in-scope paths, so all line numbers below are **working tree**.
**Method** static + source-derived only. No browser tooling. Livable-only claims marked `UNPROVEN-NEEDS-LIVE` (SS-13).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries its falsifier; the superlatives carry falsifiers too (L-18 runs both ways).

---

## §0 — SUPERSESSION NOTICE (read first)

A v1 of this challenge existed at this path (2026-08-04, same served model, 27 defects / 4 BLOCKER / 4 superlatives). **It is folded whole, not discarded.** Its finding ids (`D-01`…`D-28`, `S-01`…`S-04`) are preserved verbatim so any ledger citing them stays valid.

This v2 does four things:

1. **FOLDS** every v1 row, with disposition (§1).
2. **CORRECTS two v1 rows** where the tree disagrees — `D-03` (severity overstated: the one site that touches user input does **not** set `trust`) and `D-16` (timing wrong: the oklch failure is **live today at glass-ui 4.0.0**, not a post-F.W1 risk).
3. **SHARPENS three** (`D-01` numeric receipt from the *shipped defaults*; `D-02` the exact discard mechanism; `D-11` the optional-peer nuance + the real reason 0.13.0 is pinned).
4. **ADDS 10 net-new findings** (`C-29`…`C-38`), including one BLOCKER v1 did not reach, plus **2 net-new superlatives** and the facility-19 corpus source v1 did not cite.

**v2 tally — 37 defects (5 BLOCKER · 16 MAJOR · 13 MINOR · 3 INFO) · 6 superlatives.**

**Read closure** (all read, read-only): the SFC + `FunctionInput` · `EquationResult` · `EquationModeToggle` · `ConvergencePlot` · `EqCoefficientsPanel` · `composables/{useCoeffHover,useEquationCache,useCurveTransition}` · `lib/harmonics.ts` · `lib/equation/{api,types,notation}.ts` · `lib/{api,api-problem,colors,golden-shimmer,types}.ts` · `ui/{SliderControl,CollapsibleSection,tooltip}` · `shared/CoefficientsSpectrum.vue` · `web/{package.json,vite.config.ts,src/style.css}` · `api/routers/equations.py` · `api/models/equations.py` · `api/services/computation.py` · `api/main.py` · `src/fourier_analysis/symbolic/parsing.py` · installed `@mkbabb/{value.js,glass-ui,keyframes.js}` `dist/` + `package.json` exports/peers · `web/e2e/*.spec.ts`.

**Corpus source v1 missed.** `fourier-analysis/docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md` — the value.js→fourier facility-19 letter, **sitting untracked in fourier's own tree**. It is directly on this axis (it is the F.W2 payload) and it independently establishes the colour defect. Folded at `D-16`/`C-30`.

---

## §1 — DISPOSITION OF v1 (all 28 rows + 4 superlatives)

| v1 id | v1 sev | v2 disposition |
|---|---|---|
| D-01 budget range → 422, swallowed | BLOCKER | **FOLDED + SHARPENED** — §2.1 adds the step-by-step receipt *from the shipped defaults* (v1's scenario needed `budget=11`, a non-default). |
| D-02 error surfacing collapses | BLOCKER | **FOLDED + SHARPENED** — §2.2 names the discard mechanism in `api-problem.ts:38-47`. |
| D-03 user `expression` → `trust:true` → `v-html` | BLOCKER | **CORRECTED → MINOR** — §4 `D-03`. The `trust:true` sites are server/numeric-fed; the user-input site (`ConvergencePlot.vue:256`) leaves `trust` at its `false` default. v1's own falsifier said "the ConvergencePlot leg is not falsified" — **it is**. |
| D-04 unvalidated cache parse → blank mount | BLOCKER | **FOLDED intact.** |
| D-05 `notation` inert in the default sigma mode | MAJOR | **FOLDED + PROMOTED → BLOCKER** — §2.4. `eqMode` defaults to `"sigma"` (`:43`), so this is the *default* view; a primary control that silently does nothing meets the same bar as D-01. |
| D-06 compute/simplify race, no generation guard | MAJOR | **FOLDED** + one addition: the race also writes a structurally inconsistent `(result, latex)` pair to `sessionStorage` at `:141`, which C-29's restore path reads back as authoritative. |
| D-07 `loading` computed has zero consumers | MAJOR | **FOLDED intact.** |
| D-08 `HoverCard` + global CSS reimplements installed `HoverPopover` | MAJOR | **FOLDED intact** — `dist/components/custom/hover-popover/` re-verified present at 4.0.0. |
| D-09 `.cartoon-card` × 5 on a resurrection shim | MAJOR | **FOLDED intact.** |
| D-10 3 of 5 value.js bare specifiers in this closure | MAJOR | **FOLDED intact** — independently corroborated by facility-19 **I-1** ("the bare specifier stays retired (D-1)"). |
| D-11 installed value.js violates glass-ui's peer range | MAJOR | **FOLDED + CORRECTED-IN-PART** — §3 `D-11`. The range *is* violated; v1 omits that the peer is declared **optional**, and misses *why* 0.13.0 is pinned at all. |
| D-12 2 of 4 glass-ui imports on the deletion list | MAJOR | **FOLDED intact** — matches `lane-frontend.md:472-473`. |
| D-13 triple breakpoint authority + [1023,1024) dead band | MAJOR | **FOLDED intact** (supersedes my own weaker draft of this row). |
| D-14 `reconstructed_points` dead payload | MAJOR | **FOLDED intact** — re-verified: `grep -rn "reconstructed_points" web/src web/e2e` → 1 hit, the type declaration. |
| D-15 `BasisComponent` round-trip + self-inflicted cast | MAJOR | **FOLDED intact.** |
| D-16 dead amber fallback; grey-on-failure | MAJOR | **FOLDED + CORRECTED on timing** — §3 `D-16`. The failure is **live at the installed 4.0.0**, not contingent on F.W1. |
| D-17 whole-response re-serialise per simplify | MAJOR | **FOLDED intact.** |
| D-18 hand-inlined lucide `info` SVG beside the imported `Info` | MINOR | **FOLDED intact** (`:277-279` vs `:11`/`:300`). |
| D-19 two unlinked magic `500`s across the seam | MINOR | **FOLDED intact.** |
| D-20 one hand-rolled v-model among six `v-model:` | MINOR | **FOLDED intact.** |
| D-21 unearned optionality on 4 always-passed props | MINOR | **FOLDED intact.** |
| D-22 `:disabled="!effectiveN"` can never fire | MINOR | **FOLDED intact** (sharper than my independent draft). |
| D-23 `SegmentedTabs` `string` model forces a cast | MINOR | **FOLDED intact** — producer-side; owes the glass BH inbox a relay under the standing edict. |
| D-24 `SegmentedTabs.responsive` unused | MINOR | **FOLDED intact.** |
| D-25 two shadow idioms in one file | MINOR | **FOLDED intact** (`:400` tokenised vs `:465` hardcoded `rgba(0,0,0,0.12)`, dark-mode-blind). |
| D-26 stale line citation (`:61` vs `:59`) | MINOR | **FOLDED intact** — independently re-verified. |
| D-27 `lucide-vue-next` runtime import in `devDependencies` | MINOR | **FOLDED intact.** |
| D-28 zero functional e2e on `/equation` | MINOR | **FOLDED + PROMOTED → MAJOR** — §3 `D-28`. It is the reason five blockers ship: all five are `vue-tsc`-clean. |
| S-01 E.W5 cast retirement is structural | superlative | **FOLDED intact.** |
| S-02 `useCoeffHover` extraction + delegated hit-test | superlative | **FOLDED intact.** |
| S-03 the `:116-118` ordering comment | superlative | **FOLDED intact.** |
| S-04 client documents the server's sampling convention | superlative | **FOLDED intact.** |

---

## §2 — BLOCKERS (5)

### 2.1 · D-01 — `budget` walks past the operation's bound *automatically*, from the shipped defaults

**FOLDED + SHARPENED.** v1 established the range mismatch (client offers 100, `api/models/equations.py:23,40` both `le=50`) and the silent swallow. Its failure scenario, however, required `budget = 11` at `oldV = 20` — a state the user must first create.

**The sharpening: it escalates from the shipped defaults with one gesture.** `EquationView.vue:28-29` ships `nHarmonics = 20`, `budget = 10`. Replaying `:151-159` step-by-step as the Harmonics slider is dragged (`autoHarmonics` → false on drag, so `vizHarmonics === nHarmonics`, `:53-55`):

```
nH= 30 -> budget=20        nH= 55 -> budget=45
nH= 40 -> budget=30        nH= 60 -> budget=50   (boundary)
nH= 50 -> budget=40        nH= 61 -> budget=51   *** le=50 VIOLATED ***
                           nH=100 -> budget=90   (slider max, FunctionInput.vue:184)
```

Round-half-up makes each +1 harmonic add exactly +1 budget once `ratio ≥ 0.5`, so the crossing is deterministic at **nHarmonics = 61** — reachable by dragging one visible slider, from a cold load, without touching `budget` at all. Both `:110` (compute) and `:137` (simplify) then carry the out-of-range value.

**Third entry v1 did not name:** `budget` is restored from `sessionStorage` (`:29`, `useEquationCache.ts:25-30`), so an already-escalated budget makes the **first** compute of the *next* session 422 before the user touches anything.

> **Falsifier.** Any client clamp ≤ 50, or a server bound ≥ 100. `grep -n "budget" web/src/components/equation/*.vue web/src/lib/equation/*.ts` → no bound anywhere; `SliderControl.vue:41-56` clamps to `props.max` (= `vizHarmonics`, up to 100); `api/models/equations.py:23,40` both read `le=50`; `:152` clamps down only. **Not falsified.**

### 2.2 · D-02 — the failure renders as nothing; and the server's only diagnostic is *destructured away*

**FOLDED + SHARPENED.** v1 correctly derived the collapse: `/api/equations/*` emits plain `application/json`, so `ApiProblem.from` falls to `title = response.statusText`, which is `""` over HTTP/2 ⇒ `error.value = ""` ⇒ both banners' truthiness gates fail (`:229`, `:243`) ⇒ **silence**. It also correctly noted that EquationView reads only `.message`, never `.detail`/`.status`/`.type`.

**The sharpening — the mechanism, at `lib/api-problem.ts:38-47`:**

```
const { type, title, status, detail, instance, ...extensions } = body;
return new ApiProblem(…, typeof detail === "string" ? detail : undefined, …, extensions);
```

FastAPI's `RequestValidationError` emits `{"detail": [{loc, msg, type}, …]}` — an **array**. `detail` is named in the destructure, so it is *removed from the rest spread*, and then dropped by the `typeof === "string"` test. The field-level diagnosis is therefore unreachable **even to a consumer that reads `.extensions`**. The API told the client that `budget` exceeded 50 (D-01); the client parsed that sentence and deleted it.

Compounding, per v1: the file's own header (`:8-13`) advertises extension members "e.g. fourier emits `errors` for field-level zod failures" — a shape the fourier API does not emit. `grep -n "exception_handler" api/main.py` → **one** handler, `Exception`, at `:114`. The client's error model was written against a contract the server never implemented.

> **Falsifier.** `detail` surviving in `extensions` (it cannot — it is named in the destructure), or a `RequestValidationError` handler producing problem+json (there is none). The HTTP/2-empty-`statusText` half stays `UNPROVEN-NEEDS-LIVE`; the HTTP/1.1 half is provable and *also* defective ("Unprocessable Entity", unactionable). **Not falsified.**

### 2.3 · D-04 — unvalidated `sessionStorage` → `ComputeEquationResponse`; unguarded field access blanks the route with no recovery

**FOLDED intact.** `useEquationCache.ts:36-41` returns `JSON.parse(raw)` as `CachedResult` with zero shape validation; `:59-67` guards the *object* (`if (!result.value) return []`) then dereferences the *field* (`result.value.coefficients.map`), while the correct guard sits three lines below at `:72` (`result.value?.coefficients ?? []`). A truthy-but-shapeless entry throws in the render pass; `:174`'s `if (!result.value) doCompute()` is gated on the same object check, so **no recompute ever runs** and there is no clear-cache affordance. This is the failure family value.js's own W44 "born-RED blank" records.

### 2.4 · D-05 — the Notation control is inert in the default display mode *(v1 MAJOR → v2 BLOCKER)*

**FOLDED + PROMOTED.** `:43` `eqMode = ref("sigma")` — sigma is the **default**. `:49-51` makes `activeLatex` prefer `displayLatexSigma`, which is written at exactly two lines: `:39` (cache init) and `:114` (inside `doCompute`). `doSimplify` writes only `displayLatex` (`:138`) — the expanded form the sigma view never reads. And `SimplifyResponse` carries no sigma field on either side of the seam (`lib/equation/types.ts:42-46`; `api/models/equations.py:44-47`), though the server *does* render sigma per-notation (`api/routers/equations.py:96` `render_latex_sigma(terms, req.notation)`).

So: click a Notation pill → `watchDebounced` (`:177-181`, comment "Cheap re-render on notation/budget change") fires → `POST /simplify` succeeds → `lastDisplayKey` advances → **the rendered equation does not change**. Worse, the state machine now believes the display is current for the new notation, so subsequent `doSimplify` calls early-return at `:133`. Selected notation and displayed notation diverge **permanently** until the user presses Compute.

**Promotion rationale.** v1 graded this MAJOR. It governs the *default* view of the panel's primary control, produces no error, and is self-sealing (the memo suppresses the retry). That is the same bar as D-01: a shipped broken state with no recovery signal.

> **Falsifier.** `latex_sigma` on `SimplifyResponse`, a `displayLatexSigma` write outside `doCompute`, or `eqMode` defaulting to `expanded`. None hold. **Not falsified.**

### 2.5 · C-29 — **NEW** · the two-record cache desynchronises input state from result state, and `:174` guarantees the stale pair is presented as correct

**BLOCKER — net new; v1 reached the adjacent malformed-cache case (D-04) but not this one, which is reachable by entirely normal use.**

`useEquationCache.ts:7-8` keeps **two independent** records:

```
const STATE_KEY  = "eq-tab-state-v2";    // written on EVERY input change
const RESULT_KEY = "eq-tab-result-v2";   // written ONLY after a successful compute/simplify
```

`EquationView.vue:161-171` watches the six input refs with **no debounce**, and `expression` is `v-model`'d onto a text `<input>` (`FunctionInput.vue:98-111`) — so the input record is rewritten on every keystroke. The result record is written only at `:120` and `:141`.

Type a new expression, do **not** press Compute, reload:

1. `:25-30` restores the **new** expression / domain / harmonics.
2. `:37-41` restores the **old** `result`, `latex`, `energy`, `effective_n`.
3. `:79` computes `lastComputeKey` from the **new** inputs.
4. `:174` — `if (!result.value) doCompute();` — `result.value` is truthy ⇒ **no recompute ever fires**.
5. `:255` renders the OLD series as the answer.
6. `:309-316` hands `ConvergencePlot` the **old** `original_points` + `coefficients` together with the **new** `:expression` and **new** `:domain`.

Step 6 is the quantitatively wrong part. `ConvergencePlot.vue:104` derives `omega = 2π/(domB − domA)` from the **new** domain and applies it to the **old** coefficients; `:176` sets `minX = ox[0]` (old grid) against `maxX = domB` (new domain). Harmonic curves are drawn at the wrong frequency across a mismatched extent, and `:263-264` labels the whole plot `f(x) = <the new expression>`. **A wrong Fourier series is rendered, tooltipped, and attributed to a function that was never computed** — no banner, no spinner, no error.

Recovery requires the user to notice and press Compute (`:210`, `force = true`), because the non-forced path early-returns at `:95`.

Compounds D-06: the race there writes `saveCachedResult(result.value /* NEW */, displayLatex.value /* STALE */, …)` at `:141`, manufacturing exactly this desynchronised pair *without* any user reload.

> **Falsifier.** Falsified if (a) the result record carried its own compute key that `:79`/`:174` compared, (b) the two records were one atomic write, or (c) `:174` compared keys rather than nullity. `useEquationCache.ts:19-23` — `CachedResult = { result, latex, energy }`, **no key**; `:32-34` and `:43-49` are two separate `setItem` calls under two separate keys; `:174` tests nullity only. **Not falsified.**

---

## §3 — MAJOR (16)

**Folded intact from v1** (detail in the v1 body, preserved above by id): **D-06** racing abort keys · **D-07** dead `loading` computed · **D-08** `HoverCard` + global CSS reimplements the installed `HoverPopover` · **D-09** `.cartoon-card` × 5 on a resurrection shim · **D-10** 3 of 5 value.js bare specifiers in this closure · **D-12** 2 of 4 glass-ui imports on the deletion list · **D-13** triple breakpoint authority + the [1023, 1024) dead band · **D-14** `reconstructed_points` dead payload · **D-15** `BasisComponent` round-trip + self-inflicted cast · **D-17** whole-response re-serialise per simplify.

### D-11 — the peer edge is red today, but v1 states it too strongly and misses *why* 0.13.0 is pinned

**FOLDED + CORRECTED-IN-PART.** v1's core claim verifies: installed `@mkbabb/glass-ui@4.0.0` declares `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`; installed value.js is **0.13.0**; `web/package.json` has no `overrides`/`resolutions`. Under pre-1.0 caret semantics 0.13.0 satisfies neither range. **The edge is unmet today** — and v1 is right that both `CENSUS-2026-08-03.md`'s "latent, not live" framing and `lane-frontend.md:480`'s forward-looking framing miss it.

**Correction:** glass-ui also declares `peerDependenciesMeta["@mkbabb/value.js"] = { "optional": true }`. An optional peer that is *present but out of range* still produces `EBADPEER`, but as a **warning**, not an install failure. v1's severity is right; its implied blast radius is not.

**Addition (net new, and the more consequential half):** `@mkbabb/keyframes.js@4.3.0` declares a **hard `dependencies` entry** `"@mkbabb/value.js": "^0.13.0"` — plus `optionalDependencies: { "@mkbabb/glass-ui": "~4.0.0" }`. So value.js 0.13.0 is **pinned from below by keyframes**, not merely chosen by fourier, and the tilde on glass-ui is the lock `lane-frontend.md:490` names. The corpus records the *forward* leg (keyframes@6 → value.js 4.0.0 exact) but not this *backward* one, which is what makes F.W2 un-landable alone and re-confirms census risk 1 from a second direction.

> **Falsifier.** An override/resolution, or a peer range admitting 0.13.0 — neither exists. Whether the installer *warned* is `UNPROVEN-NEEDS-LIVE`; the constraint state is proven from three `package.json`s.

### D-16 — the colour arm: v1's mechanism is right, its **timing is wrong** — the failure is live at the installed version

**FOLDED + CORRECTED.** v1's two mechanism claims hold and are excellent: (a) `VIZ_COLORS.amber` is never falsy (`colors.ts:81` seeds `"#b37a2d"`; both `cssVarToHex` returns are truthy), so `useCoeffHover.ts:65`'s `|| VIZ_COLORS.golden` is **unreachable dead code** and its comment states a false invariant; (b) the real failure mode is a truthy **grey `#888888`**, not a golden fallback.

**Correction — v1 says "the moment `--viz-amber` is authored in `oklch()`, which is what the glass-ui 7 uplift in F.W1 brings". That moment has already arrived, at the installed 4.0.0.** From `node_modules/@mkbabb/glass-ui/dist`:

```
--viz-fourier:   light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1));
--viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4));
--viz-legendre:  light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1));
--viz-amber:     var(--section-color-5);
--viz-green:     var(--section-color-4);
--section-color-4: light-dark(oklch(0.551 0.088 171.1), oklch(0.776 0.105 172.6));
--section-color-5: light-dark(oklch(0.623 0.124 69.6),  oklch(0.813 0.109 78.2));
```

`cssVarToHex` (`colors.ts:22-54`) has four arms — `#hex`, `hsl(…)`, bare `h s% l%`, `rgb(…)` — and falls through to `return "#888888"` at **`:53`** (v1 cites `:52`; off by one in the working tree). Neither `light-dark(…)` nor bare `oklch(…)` matches any arm. **So `VIZ_COLORS.fourier`, `.chebyshev`, `.legendre` and `.green` are grey right now.**

**Two additions v1 does not reach:**

1. **`--section-color-5` — the token behind `--viz-amber` — is itself oklch.** The *only* reason `VIZ_COLORS.amber` is not grey is the consumer's own override at `web/src/style.css:120`/`:125`, landed for a **WCAG contrast** reason (`D.W4.d`, comment `:113-119`), not for the parser.
2. **`EquationView`'s coefficient popover is downstream of exactly that accident.** `useCoeffHover.ts:65` feeds `amber` into `{\color{…}a_k}` at `:79`/`:87`/`:92`. The same comment records the glass-ui-side rebaseline as "held as a coordination ask" — the day it lands and the local override retires, every coefficient in the popover renders grey. Untested, unwarned.

**Corpus.** This is independently established by the facility-19 letter already in fourier's tree (`§3`, "four series painting the same grey"), which v1 does not cite. I corroborate it and add the `--section-color-5` link. **Corpus contradiction (both v1 and I agree, and I restate it with the sizing):** `CENSUS-2026-08-03.md:187-189` books F.W2 as deleting "the `colors.ts` hand-rolled arms (declared 3-line hex residual)". The *residual* is 3 lines; the **surface deleted is 5 functions / ~95 lines (`colors.ts:22-117`) with ~50 read sites and a live wrong-output defect on 4 of 5 tokens.** F.W2 reads like a formatting chore; it is a correctness repair and needs a colour-token witness.

> **Falsifier.** (a) any `--viz-*` resolving to hex/hsl/rgb through the consumer cascade — `grep -rn -- "--viz-[a-z]*:" web/src` returns **only** `style.css:120,125` (`--viz-amber`) and `:121,126` (`--section-color-5`); fourier/chebyshev/legendre/green have no consumer override. (b) `getComputedStyle().getPropertyValue()` canonicalising custom properties — unregistered custom properties compute to the substituted token stream, and **both** shipped forms (`light-dark(oklch(…))` and the bare `oklch(…)` arms) fail all four regexes, so the claim holds under either resolution. **Not falsified.** The rendered-pixel outcome is `UNPROVEN-NEEDS-LIVE (SS-13)`; the returned string is proven from bytes.

### C-30 — **NEW** · `useCurveTransition.ts` hand-rolls `lerp` on line 85 while line 8 imports the package that exports `lerp`

**MAJOR — net new, and the cleanest F.W2 case in the tree.**

```
useCurveTransition.ts:8       import { easeInOutSine } from "@mkbabb/value.js";
useCurveTransition.ts:85-87   export function lerp(a, b, t) { return a + (b - a) * t; }
```

`node_modules/@mkbabb/value.js/dist/index.d.ts` line 20:
`export { clamp, scale, lerp, lerpArray, logerp, deCasteljau, cubicBezier, … } from './math';`

The local `lerp` is imported by `ConvergencePlot.vue:11` and used at `:120`, `:135`, `:137`, `:170`, `:171` — five call sites re-implementing a primitive the file's **own import line** already reaches. Unlike the colour arm (D-16), there is no oklch-shaped excuse: `dist/value.js` defines `lerp = (a, b, t) => a + (b - a) * t` — byte-identical semantics.

Together with D-10 this is the shape of the consumption: one value.js symbol imported three times across the closure, and the primitives sitting beside it in the same barrel re-authored by hand.

> **Falsifier.** A differing signature (clamped `t`, array-valued). It is identical. **Not falsified.**

### C-31 — **NEW** · keyframes.js is a pinned dependency with its own bundle chunk and **zero** consumption here — while the closure runs **two** hand-rolled rAF engines

**MAJOR — net new. This supersedes v1's AMBER grade for keyframes (§5 of v1), which considered only the CSS-transition surface and missed the rAF engines.**

`web/package.json:11` pins `"@mkbabb/keyframes.js": "^4.3.0"`; `vite.config.ts:44-56` cuts it a dedicated `vendor-keyframes` chunk. `grep -rn "keyframes.js" web/src` → exactly two hits, **both outside this closure** (`composables/useFourierMorph.ts:14`, and a *comment* at `stores/animation.ts:47`).

Meanwhile the closure contains two independent hand-written rAF animation engines:

- `ConvergencePlot.vue:57-75` — a full ping-pong playback loop (`loopStartTime`, cycle/frac derivation, `t = cycle % 2 === 0 ? frac : 1 - frac`, manual `cancelAnimationFrame`), plus scrub start/move/end (`:282-291`) and a play toggle (`:274-278`).
- `composables/useCurveTransition.ts:34-53` — a second 500 ms rAF tween with its own `performance.now()` baseline, its own cancel closure, its own easing application.

They are mutually unaware: `ConvergencePlot.vue:308-317` cancels the transition but the playback loop keeps running, so during a data change **both engines call `draw()` on the same canvas in the same frame**. Timeline ownership, cancellation and reduced-motion gating all had to be re-derived twice.

Consumption-relevant note (axis D owns the a11y litigation, per v1's deferral): `ConvergencePlot.vue:323-327` autoplays on mount with no `prefers-reduced-motion` gate, in a file that *does* gate a 0.1 s tooltip fade at `:405-409` — and `EquationView.vue:308-317` is the mount that starts it, with no gating prop. Corroborates the census F.W4 sketch line "reduced-motion clock gating" with a named site.

> **Falsifier.** keyframes 4.3 being unable to express a scrubbable ping-pong timeline. The repo's own `useFourierMorph.ts:9` header states "All transitions are driven by keyframes.js `Animation` instances" — the capability is demonstrated **in this tree**. **Not falsified.**

### C-32 — **NEW** · no domain precondition on either side of the seam; a degenerate domain is a 500 server-side and NaN client-side

**MAJOR — net new.**

`FunctionInput.vue:44-60` (`parseDomainValue`/`onDomainInput`) accepts **any** finite number for either endpoint: no ordering check, no `start !== end` check. `EquationView.vue:26-27` holds them as bare refs; `:105-106` posts them raw. `api/models/equations.py:18-19` declares `domain_start: float = 0.0` / `domain_end: float = Field(default=6.283…)` — **no validator, no cross-field constraint**.

With `domain_start == domain_end`, `api/routers/equations.py:55` computes `period = 0` and every downstream coefficient path divides by it; the failure lands in `api/main.py:114-122`'s catch-all as `500 {"detail": "Internal server error"}` — which D-02 then renders as nothing. Client-side the same input poisons the plot before any response: `ConvergencePlot.vue:104` `omega = 2π/(domB − domA)` → `Infinity`; `:178-181`'s `toScreen` divides by `(maxX − minX)` → `NaN` for every point; the canvas silently blanks. With `domain_start > domain_end` the request *succeeds* and returns a series over a negative period — no error at any layer.

> **Falsifier.** A validator on either side. `grep -n "validator\|model_validator\|@field" api/models/equations.py` → nothing; `grep -n "domainStart\|domainEnd"` across `EquationView.vue` + `FunctionInput.vue` → assignment and formatting only. **Not falsified.** The exact 500 throw point is `UNPROVEN-NEEDS-LIVE`; the absence of any guard on either side is proven.

### D-28 — zero functional e2e on `/equation` *(v1 MINOR → v2 MAJOR)*

**FOLDED + PROMOTED.** `web/e2e/` holds 8 specs — contour-extraction, gallery, paper-performance, settings-persistence, visual-baseline, visualization-crud, visualization-ux, workspace-flow. `grep -rln "equation" web/e2e/` returns **one** file: `visual-baseline.spec.ts:34` (`{ slug: "equation", path: "/equation" }`), a screenshot/axe route entry at 375 / 1280 / 1440 — no viewport in D-13's 1023–1024 band, and no interaction with any control audited here. (`settings-persistence.spec.ts:65-100`'s "Harmonics" spinbutton is the *contour* control in the visualization workspace, not this component.)

**Promotion rationale.** All five blockers above are `vue-tsc`-clean; none is reachable by any gate this repo runs. That is not a MINOR coverage gap, it is the mechanism by which five blockers reached the working tree. Concrete instance of census risk 10 (vitest ABSENT; only `vue-tsc` + single-chromium Playwright).

---

## §4 — MINOR (13)

**Folded intact from v1:** **D-18** hand-inlined lucide `info` SVG beside the imported `Info` · **D-19** two unlinked magic `500`s across the seam · **D-20** one hand-rolled v-model among six `v-model:` · **D-21** unearned optionality on four always-passed props · **D-22** `:disabled="!effectiveN"` can never fire · **D-23** `SegmentedTabs`' `string` model forces the union cast (producer-side; **owes a glass-ui BH relay**) · **D-24** `SegmentedTabs.responsive` unused · **D-25** two shadow idioms in one file · **D-26** stale citation `:61` vs `:59` · **D-27** `lucide-vue-next` runtime import declared in `devDependencies`.

### D-03 — **CORRECTED, BLOCKER → MINOR** · the `trust:true` sites are not the user-input site

v1 graded this BLOCKER on the claim that user-typed `expression` reaches a `trust:true` KaTeX renderer and then `v-html`. **The tree disagrees.**

`grep -rn "trust" web/src/components/equation/` returns **exactly two** hits:

- `EquationResult.vue:23` — renders `activeLatex`, which comes from the API or the session cache.
- `useCoeffHover.ts:100` — renders locally-built numeric strings (`toFixed`).

The **only** site that interpolates the raw user expression is `ConvergencePlot.vue:263-264`, and its renderer is `renderKatexInline` at `:255-258`:

```
katex.renderToString(latex, { throwOnError: false, displayMode: false });
```

— **no `trust` option**, so it takes KaTeX's documented default `false`, and `\href` / `\url` / `\includegraphics` are disabled there. v1's own falsifier conceded the two `trust:true` legs are server/numeric-fed and then asserted "the ConvergencePlot leg is client-string interpolation and is **not** falsified". It is falsified: that leg has `trust` off.

Server-side closes it further: `src/fourier_analysis/symbolic/parsing.py:17-52` parses under a restricted namespace and the LaTeX is rendered from numeric terms, not echoed input.

**What genuinely survives, at MINOR:** (a) `trust: true` on two sites is a permissive default nobody needs — KaTeX's documented mitigation is a protocol-filtering `handler`; (b) `ConvergencePlot.vue:257`'s `catch { return latex; }` returns the **raw user string** into `v-html="tooltipHtml"` (`:353`), and (c) `EquationResult.vue:26-27`'s fallback interpolates raw latex into HTML **unescaped**: `` `<code>${props.latex}</code>` ``. Both catch-paths require KaTeX to throw a non-`ParseError`, which is not demonstrated. Graded MINOR, defense-in-depth, reachability `UNPROVEN-NEEDS-LIVE`.

> This is the row where L-18 cut against the prior challenge rather than against the component.

### C-33 — **NEW** · `MetricBadge` receives a label through the `unit` axis

`EquationView.vue:292-297` passes `unit="% energy"`. glass-ui separates the axes: `unit?: string` vs `label?: string` + `labelPosition?: 'inline' | 'stacked'` (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts:6-24`). "energy" is a label smuggled through the unit slot, so the badge's own typographic treatment of labels (tracked uppercase, muted, sibling `<span>` with `metric-badge__label` classnames) is bypassed and the consumer gets one undifferentiated run of text.
*Falsifier:* `label` requiring something unavailable here — it does not; `labelPosition: 'inline'` is the documented single-row mode. **Not falsified.**

### C-34 — **NEW** · the 429 retry adds up to ~3 s of invisible latency on a saturated compute queue

`lib/api.ts:172-178` retries 429 up to twice, reading `RateLimit-Reset`. fourier's compute 429 is raised by `api/services/computation.py:35-39` as a bare `HTTPException(status_code=429, detail="Compute queue saturated, try again shortly")` — **no `RateLimit-Reset` header**, so `readRateLimitResetSeconds` returns null and the client falls back to `2**attempt` = 1 s + 2 s. Under queue saturation the user waits ~3 s and then, on the simplify path, receives D-01/D-02's silence.
*Falsifier:* the 429 setting the header. `HTTPException(...)` sets none. **Not falsified.**

---

## §5 — INFO (3)

- **C-35** — `eqCardRef` uses `ref<HTMLDivElement>()` + `ref="eqCardRef"` (`:46`, `:250`) rather than Vue 3.5's `useTemplateRef`. *(I first flagged `:252` `onCoeffMove(e, eqCardRef)` as passing the Ref rather than the element — **that is wrong**: `<script setup>` top-level refs auto-unwrap in template expressions. Recorded because the falsifier killed the finding.)*
- **C-36** — `easeInOutSine` is applied at **three** nesting levels across three modules: `ConvergencePlot.vue:34` (`easedT`), again inside `harmonics.ts:74` on the local fraction of that already-eased value, and a third time on transition progress at `useCurveTransition.ts:46`. Composed easing is defensible; three independent imports of one primitive with no shared timing contract is D-10/C-30 in miniature.
- **C-37** — `:314` `:domain="[domainStart, domainEnd]"` allocates a fresh array every render. Harmless today (`ConvergencePlot` reads it imperatively in `draw()` and does not watch it) but one `watch(() => props.domain)` from an infinite loop — and `:308` already runs a `{ deep: true }` watcher over ~1000 floats on the sibling props.

---

## §6 — SUPERLATIVES (6; L-18 runs both ways)

**S-01 · The E.W5 fetch-core collapse retired two casts structurally, and committed the reasoning next to the code.** `lib/equation/api.ts:1-12` records that the local `eqFetch` was deleted for the shared `apiFetch`, and that the two `as unknown as` casts retired *because the core's `body` axis was widened* — not because someone deleted the word `as`. Verified: `grep -rn "as unknown as" web/src/lib/equation web/src/components/equation` → 1 hit, and it is the prose in that header. *Falsifier: a `body` type still requiring a cast — `lib/api.ts:89-92` types `body?: FormData | BodyInit | object`. **Survives**, with D-15's caveat (a third, self-inflicted cast at `:49`).*

**S-02 · `useCoeffHover` is a correct, minimal extraction with the right DOM strategy.** 106 lines of KaTeX rendering + hit-testing behind a two-in/five-out contract, consumed in two lines (`:75-76`). **One** delegated `mousemove` on the card (`:252`) with `closest(".eq-coeff")` — not N listeners on N KaTeX spans that KaTeX re-creates on every render — and card-relative coordinates via two `getBoundingClientRect`s, so it survives scrolled/transformed ancestors. *Falsifier: per-span listeners or scroll-fragile positioning. Neither. **Survives**, with D-16's caveat.*

**S-03 · A genuine reactive-ordering hazard is documented at the exact line where it bites.** `:116-119` captures `lastDisplayKey` **before** assigning `effectiveN`, because that assignment synchronously fires `vizHarmonics` → the `:151` watcher → `budget`. The comment names the mechanism, not the symptom. *Falsifier: swap the two lines and `displayKey()` reads the mutated `budget`, suppressing a needed re-render at `:133`. **Survives**, with D-06's caveat (the same capture breaks on the notation-mid-flight axis).*

**S-04 · The client names the server's sampling convention and cites its source line.** `ConvergencePlot.vue:113-115` and `:123-129` explain why the partial-sum grid is `endpoint=false` while the original curve gets an appended wrap sample, citing `api/routers/equations.py`. Verified: `equations.py:59` `np.linspace(domain[0], domain[1], req.n_eval_points, endpoint=False)`. A client documenting *why* its geometry differs from the payload's, with a pointer into the server, is exactly the client↔operation join R6-8 says must exist somewhere. *Falsifier runs and nicks it: the citation reads `:61`; the statement is at `:59` (D-26) — precisely the pin-hygiene rule the census books at F.W0.*

**S-05 · NEW · The cross-repo resolution posture is contract-v2 clean, and says why.** `vite.config.ts:20-26` carries **no** `@mkbabb/*` dist alias and cites the governing precept by section (`cross-repo-dev-resolution.md §2.2/§2.4`); `:63-66` declines the sibling-`src` `fs.allow` widening for the same reason. Independently confirmed at `lane-frontend.md:45`, and it matches value.js's own posture. This is load-bearing for this axis: a consumer that resolves siblings **only** through their published `exports` maps is why D-10's bare-specifier break will surface loudly at uplift instead of being silently aliased away. *Falsifier: any alias or `fs.allow` entry — `grep -n "alias\|fs\." web/vite.config.ts` → only `"@" → ./src`. **Survives.***

**S-06 · NEW · Abort is distinguished from failure at every catch.** `:122` and `:143` both guard with `isAbortError(e)` before touching error state, against the per-key `AbortController` registry at `lib/api.ts:52-59`. The component never reports a self-inflicted cancellation as a user-facing error — a discipline most fetch-consuming components skip entirely. *Falsifier: an unguarded catch on an abortable path — there is none in the closure. **Survives** — but note the falsifier's sting: it is precisely this correct-looking guard at `:143` that makes D-01/D-02's total silence read as deliberate.*

---

## §7 — CONSUMPTION VERDICT PER PRODUCER

| producer | pinned / installed | this seat's surface | verdict |
|---|---|---|---|
| **value.js** | `^0.13.0` / `0.13.0` | 0 direct imports; **3 of the repo's 5 bare-root specifiers in the closure** (D-10), all for `easeInOutSine`; `lerp` re-authored beside the import that exports it (C-30); the hand-rolled `colors.ts` arm reached via `useCoeffHover` (D-16) | **RED.** Peer edge already unmet (D-11, contradicting the corpus); the pin is held from below by keyframes' hard dep. 4 of 5 `--viz-*` tokens resolve to grey **today**, not post-uplift. F.W2's scope must widen past "3-line hex residual". |
| **keyframes.js** | `^4.3.0` / `4.3.0` | **zero** — while the closure runs two hand-rolled rAF engines and 8 hand-authored CSS transitions | **RED** *(v2 downgrades v1's AMBER — see C-31).* A pinned dependency with a dedicated bundle chunk and no consumer, in a closure that re-derived its core capability twice. |
| **glass-ui** | `^4.0.0` / `4.0.0` | 4 imports (`Button`, `HoverCard`, `MetricBadge`, `SegmentedTabs`); **2 on the deletion list** (D-12); `HoverPopover` reimplemented by hand in a global stylesheet (D-08); `.cartoon-card` × 5 on a resurrection shim (D-09); `responsive` unused (D-24); `unit` carrying a label (C-33) | **RED.** The deepest consumption debt in the component — two removed primitives, one deleted recipe class, one ignored surviving component. Subpath discipline itself is good (4/4 exact subpaths here; 8/10 across the closure). |
| **fourier API** (2 of 45 ops) | `POST /api/equations/{compute,simplify}` | client edges exist for both; contract fidelity does not | **RED.** Range mismatch (D-01), no problem+json envelope and the server's diagnostic destructured away (D-02), a control inert in the default view because the response lacks the field (D-05), racing abort keys (D-06), no domain precondition on either side (C-32), dead payload (D-14), foreign-type wrapper (D-15), duplicated magic constant (D-19), invisible 429 backoff (C-34). |

**R6-8 instantiation, restated for F.W5.** The equation pair is the **inverse** of intake R6-8's C31 case, and that is the useful part. R6-8 failed because `operation:PATCH:/api/visualizations/{slug}` embeds `clients: ["client:updateVisualization"]`, so a client-side edit mutated both leaves and the defect was unattributable. Here the client leaves live in a **separate** module (`lib/equation/api.ts`) with no back-reference, so D-01 *is* cleanly attributable: the client emits an out-of-range `budget`; the operation's `le=50` is correct and unchanged. **That legibility is the property F.W5's shared-provenance contract should preserve — operation identity independent of client identity, the join in a separate relation** (the ADDENDUM's F.W5 carry). D-19's twin `500`s are the counter-example: a constraint duplicated across the seam with no join at all is equally unattributable, from the other direction.

---

## §8 — RANKED REPAIR ORDER

1. **D-01** clamp `budget` to `min(50, …)` at the slider's `:max` *and* in the `:151` watcher — 2 lines; or lift `le=50` to one constant shared across the seam (the R6-8-correct fix).
2. **C-29** give `CachedResult` a compute key and compare it at `:79`/`:174`; or write both records atomically. Fixes the desync *and* removes D-06's poisoned-write consequence.
3. **D-05** add `latex_sigma` to `SimplifyResponse` (both models) and write it in `doSimplify` — the Notation control becomes live.
4. **D-04** guard `result.value.coefficients` at `:61` (match the already-correct `:72`) and shape-validate `loadCachedResult`.
5. **D-02** give `/api/equations/*` the problem+json envelope the rest of the API has, **and** stop discarding array-shaped `detail` in `api-problem.ts:38-47`; read `.detail`/`.status` at `:123` with a non-empty fallback.
6. **C-32** add `domain_end > domain_start` as a pydantic `model_validator` **and** a client precondition.
7. **D-06** one shared abort key across both equation operations, or a generation counter around `displayLatex`.
8. **D-10 / C-30** three-line rewrite to `@mkbabb/value.js/easing`; delete the local `lerp`. The cheapest leg of F.W1/F.W2, entirely inside this closure.
9. **D-16** delete the `colors.ts` arms per facility-19 §5.2 — with a colour-token witness, because 4 of 5 tokens are grey today.
10. **D-08 / D-12** `HoverCard` + the global `.info-hovercard` block → `<HoverPopover>`; `MetricBadge` → `Metric` at the 7.0.0 hop.
11. **C-31** retire one of the two rAF engines onto keyframes.js, and gate the clock on `prefers-reduced-motion`.
12. **D-14 / D-17** drop `reconstructed_points`; stop re-writing the whole cache on simplify.
13. **D-13** one breakpoint token shared by JS and CSS; `1023.98px` or `not all and (min-width: …)`.
14. **D-07 / D-18 / D-26 / D-03** delete `loading`; delete the inline SVG; fix the citation; replace `trust: true` with a protocol-filtering handler.
15. **D-28** every item above is invisible to CI. **One** interaction spec covering compute → notation → budget → reload-restore would have caught D-01, D-05, D-07, D-14 and C-29 mechanically.

---

## §9 — CORPUS RECONCILIATION

| corpus row | v2 |
|---|---|
| `lane-frontend.md:130` — EquationView 469 lines, `/equation` route shell | **AGREE**, exact. |
| `lane-frontend.md:263-266` — the 4 glass-ui subpath imports | **AGREE.** Extended: 8 subpath / 2 barrel across the closure (`EquationResult.vue:4` and `CollapsibleSection.vue:2` use the root barrel; `./dom` and `./collapsible` both ship the needed symbols at 4.0.0). |
| `lane-frontend.md:472-473` — `./metric-badge` removed at 7.0.0; `./hover-card` at 5.0.0 | **AGREE** (D-12). EquationView carries 2 of the 4 glass-7-breaking imports on this route — the highest concentration in one file. |
| `lane-frontend.md:480` + facility-19 **I-1** — 5 value.js bare specifiers; bare specifier retired at 4.0.0 | **AGREE, re-scoped** (D-10): **3 of the 5** are in this closure, all one symbol. |
| facility-19 **§3** — "four series painting the same grey" | **AGREE, corroborated independently** from the installed `dist/`. **Adds:** `--section-color-5` (behind `--viz-amber`) is also oklch, so the popover's colour is load-bearing on the unrelated `D.W4.d` WCAG override (D-16). |
| `CENSUS-2026-08-03.md:187-189` — F.W2 = "delete the arms (declared 3-line hex residual)" | **CONTRADICT the framing.** 5 functions / ~95 lines / ~50 read sites / live wrong output on 4 of 5 tokens. Specify F.W2 as a correctness repair with a witness. |
| `CENSUS-2026-08-03.md` "latent, not live" + `lane-frontend.md:480` | **CONTRADICT** (D-11, v1's find): the glass-ui 4.0.0 → value.js 0.13.0 peer edge is unmet **today**. **Correcting v1:** the peer is `optional`, so it warns rather than fails. **Adding:** keyframes@4.3.0 hard-deps `value.js ^0.13.0` — the pin is held from below. |
| `CENSUS-2026-08-03.md:193-195` — F.W4 "reduced-motion clock gating" | **AGREE + instance:** `ConvergencePlot.vue:323-327` autoplays ungated while `:405-409` gates a 0.1 s fade (C-31). |
| census risk 10 — "uplift lands with no unit-test net" | **AGREE + instance:** `/equation` has zero functional e2e; all 5 blockers are `vue-tsc`-clean (D-28, promoted). |
| intake **R3-7a** — 35 Tooltip callsites / 9 consumers, `FunctionInput` = 2 | **AGREE, re-verified live:** `FunctionInput.vue:157` and `:188` — exactly 2, via the local adapter `components/ui/tooltip/index.ts`. |
| intake **X-3** — 45 / 30 public-non-admin / 13 admin | **AGREE.** This seat owns 2 of the 45, both public-non-admin. |
| intake **R6-8** — operation identity must be independent of client identity | **CITED and INVERTED** — see §7. The equations pair has no back-reference, so D-01 is cleanly attributable; that is the property F.W5 must preserve. D-19 is the counter-example from the other direction. |
| intake **X-4** — HEAD `cd26c653…` | **AGREE, re-verified today**; `EquationView.vue` is among the dirty in-scope paths. |

---

## §10 — VERDICT

`EquationView` consumes glass-ui with real subpath discipline and value.js almost not at all; its own reactive reasoning is careful in the small (S-03) and unsound in the large. Five states ship broken with no recovery signal: a slider that walks `budget` past a bound the client never learned, an error path that renders the empty string, a cache that presents last session's Fourier series under this session's function, a Notation control that is inert in the default view, and an unvalidated cache parse that blanks the route. Every one of them is invisible to every gate this repo runs.

The v1 challenge found four of the five and got the mechanisms right; this v2 adds the fifth, corrects an overstated XSS blocker, and moves the colour defect from "a risk F.W1 brings" to "a defect shipping today".
