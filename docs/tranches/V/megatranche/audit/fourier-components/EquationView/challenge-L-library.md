claude-opus-5[1m]

# CHALLENGE — `EquationView.vue` · axis **L** (LIBRARY)

**Target** `fourier-analysis/web/src/components/equation/EquationView.vue` (469 lines; census
row `formation/fourier/lane-frontend.md:130`).
**Substrate** fourier-analysis @ `cd26c65` (census §2 C-1 correction; NOT `14d83356`),
branch `m/w1-bump-migration`, 28 uncommitted paths. **READ-ONLY.**
**Method** static + source-derived only. No browser. Livable-only claims are marked
`UNPROVEN-NEEDS-LIVE` for SS-13. Every claim carries severity + `file:line` + its falsifier.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; L-18 runs both
ways, so the superlatives (§4) carry falsifiers too.

## §0 · Read set (whole-file, read-only)

Direct imports of the target, all read end-to-end:

| File | LOC | Why in-set |
|---|---|---|
| `components/equation/EquationView.vue` | 469 | target |
| `lib/equation/api.ts` | 57 | `computeEquation` / `simplifyCoefficients` / `isAbortError` |
| `lib/equation/types.ts` | 53 | the 4 imported types |
| `lib/equation/notation.ts` | 48 | `TIER_INFO`, `energyColor` |
| `lib/types.ts` (`BasisComponent`, :1-6) | 391 | the DTO the component converts *to* |
| `components/equation/composables/useEquationCache.ts` | 49 | 4 cache accessors |
| `components/equation/composables/useCoeffHover.ts` | 106 | hover composable |
| `components/equation/FunctionInput.vue` | 261 | child; owns the two sliders |
| `components/equation/EquationResult.vue` | 101 | child; the `v-html` sink for `activeLatex` |
| `components/equation/EquationModeToggle.vue` | 80 | child; owns `eqMode` |
| `components/equation/ConvergencePlot.vue` | 410 | child; **the viz render path** |
| `components/equation/EqCoefficientsPanel.vue` | 17 | child |

Transitive reads required to falsify the above: `lib/api.ts` (672), `lib/api-problem.ts` (61),
`lib/colors.ts`, `components/equation/lib/harmonics.ts` (88),
`components/equation/composables/useCurveTransition.ts` (87),
`components/equation/convergence/ConvergenceLegend.vue` (97),
`components/ui/SliderControl.vue`, `router/index.ts:94`, `tsconfig.json`, and the wire peers
`api/routers/equations.py`, `api/models/equations.py`, `api/services/computation.py`,
`src/fourier_analysis/symbolic/{parsing,simplification}.py`.

**Corpus folded, not re-invented:** census rows `lane-frontend.md:130-146` (the equation-dir
inventory), `:559` (Path B — *"own rAF loop … a second, ungated clock"*), `:473` (`./hover-card`
removed at glass 5.0.0 — `EquationView.vue:9` is one of the 2 sites), `:472` (`./metric-badge`
×7 files, `EquationView.vue:10` among them), `CENSUS-2026-08-03.md` §2 C-4 (metric-badge is 7
**files**), and the adjudicated intake row **R5-7** (`intakes/lane-fourier-r3-r6.md:125`) whose
exemplar callsite `web/src/components/equation/FunctionInput.vue:157:Tooltip` is *this
component's direct child*. I contradict none of them; §3 extends R5-7 into this subtree.

---

## §1 · BLOCKERS (2)

### B-1 · The notation control is inert in the default display mode — `/simplify` cannot write the surface `activeLatex` reads

**Severity BLOCKER.**
`EquationView.vue:43` — `const eqMode = ref<EquationDisplayMode>("sigma")` — sigma is the **default**.
`EquationView.vue:49-51`:

```ts
const activeLatex = computed(() =>
    eqMode.value === "sigma" && displayLatexSigma.value ? displayLatexSigma.value : displayLatex.value,
);
```

`displayLatexSigma` has exactly **one** writer: `EquationView.vue:114` (`= result.value.latex_sigma`,
inside `doCompute`) plus the cache restore at `:39`. `doSimplify` writes only `displayLatex`
(`:138`). And the notation change path is `watchDebounced([notation, budget]) → doSimplify`
(`:177-181`) — it never calls `doCompute`.

Both sides of the wire confirm the response shape: `api/routers/equations.py:133-161`
`simplify_coefficients` returns `SimplifyResponse(latex, energy_captured, term_count)` and
`api/models/equations.py:42-45` declares exactly those three fields. **There is no `latex_sigma`
on the `/simplify` response at all.** Meanwhile `api/routers/equations.py:92`
(`latex_sigma = render_latex_sigma(terms, req.notation)`) proves the sigma form *is*
notation-dependent — it is simply only producible by `/compute`.

**Consequence.** On the default screen, clicking Trig → Exp → Polar fires a network round-trip,
mutates `displayEnergy` (`:139`, so the hover-card badge flickers to a new number) and advances
`lastDisplayKey` (`:140`) — while the rendered equation does not change by one glyph. The
control appears to work (a badge moves) and does not. Worse, `lastDisplayKey` now *records* the
new notation, so re-selecting it is a no-op (`:133` early return): the user cannot recover
without pressing Compute.

**Falsifier (survived).** Any one of these would kill the claim: (a) `SimplifyResponse` carrying
a sigma latex → refuted at `api/models/equations.py:42-45`; (b) a second writer of
`displayLatexSigma` → `grep -n displayLatexSigma EquationView.vue` yields only `:39`, `:50`,
`:114`; (c) `eqMode` defaulting to `"expanded"` → refuted at `:43`; (d) the notation watcher
calling `doCompute` → refuted at `:177-181`.
`UNPROVEN-NEEDS-LIVE` only for the *visual* assertion that the two latex strings differ per
notation; the code path is proven statically.

---

### B-2 · `budget` range mismatch across the wire — the UI hands the API a value pydantic rejects, and the rejection is swallowed

**Severity BLOCKER.**
Backend contract: `api/models/equations.py:22` `budget: int = Field(default=10, ge=2, le=50)`
and `:40` (same bound on `SimplifyRequest`). **Hard ceiling 50.**

Frontend range: `FunctionInput.vue:216-219` — the "Display terms" slider is
`:model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"` with
`:max="Math.max(2, vizHarmonics ?? nHarmonics)"`. `vizHarmonics` derives from `nHarmonics`
(`EquationView.vue:53-55`), and the harmonics slider is `:max="100"` (`FunctionInput.vue:184`).
**Frontend ceiling 100.** `SliderControl.vue:44-49,57` clamps to `props.min/max` — i.e. it
faithfully clamps to *100*, not 50.

Two reachable paths past 50:
1. **One drag.** Auto-harmonics is switched off by the harmonics slider itself
   (`FunctionInput.vue:186` emits `update:autoHarmonics false`), so `vizHarmonics === nHarmonics`;
   set it to 100, then drag "Display terms" to any value > 50.
2. **Programmatic, no slider involved.** `EquationView.vue:151-159` rescales
   `budget = Math.max(2, Math.round(v * ratio))` where `v = vizHarmonics` ≤ 100 and
   `ratio = budget/oldV` ≤ 1. With `budget = oldV = 20` the ratio is exactly 1, so budget tracks
   `v` all the way to 100. This write bypasses `SliderControl`'s clamp entirely.

Neither `doCompute` (`:110`) nor `doSimplify` (`:137`) clamps; `equation/api.ts:46-50` passes
`budget` straight through. The request 422s.

**Consequence, split by path.** Through `doSimplify` the 422 hits `catch (e) { if
(!isAbortError(e)) { /* silent */ } }` (`:142-144`) — *nothing happens at all*: no error, no
banner, no console line, stale equation. Through `doCompute` the user gets
`error.value = e.message` (`:123`); because FastAPI's 422 body is `{"detail": [...]}` (an array,
not a string) `ApiProblem.from` drops it (`api-problem.ts:37-46`, `typeof detail === "string"`
is false) and `title` falls back to `response.statusText` — the banner reads
**"Error: Unprocessable Entity"** with zero actionable content.

**Falsifier (survived).** (a) A clamp anywhere in between — `grep -n "budget" EquationView.vue
FunctionInput.vue lib/equation/api.ts` shows every hop is a verbatim pass-through; (b) the
backend bound being ≥100 → refuted at `api/models/equations.py:22,40`; (c) `SliderControl`
clamping to a hard 50 → refuted at `:44-49` (it clamps to the *prop*).
`UNPROVEN-NEEDS-LIVE`: the exact 422 payload rendering. The bound conflict itself is proven.

---

## §2 · MAJOR (7)

### M-1 · The plot's x-mapping is bound to **live inputs** while its data comes from the **last compute** — including an unguarded `domB - domA == 0`

**Severity MAJOR.** `EquationView.vue:309-316`:

```
:original-points="result.original_points"   ← last computed result
:coefficients="result.coefficients"         ← last computed result
:n-harmonics="vizHarmonics"
:domain="[domainStart, domainEnd]"          ← LIVE input refs
:expression="expression"                    ← LIVE input ref
```

`ConvergencePlot.vue` consumes both in one breath: `:103-104`
`const [domA, domB] = props.domain; const omega = (2 * Math.PI) / (domB - domA);` and — the
proof of coupling — `:176` `const minX = ox[0], maxX = domB;` mixes `ox` (from
`props.originalPoints`, i.e. the *old* compute) with `domB` (live input) inside a single screen
transform (`:178-181`).

So the moment the user edits either domain field, `onDomainInput` (`FunctionInput.vue:57-60`)
commits a new number, the canvas re-scales against a domain the plotted samples were never
computed on, and the tooltip (`ConvergencePlot.vue:263-264`, `props.expression`) labels the old
curve with the new expression. No dirty state, no recompute, no indication.

Degenerate case: `domainEnd === domainStart` is accepted (`parseDomainValue` only rejects
non-finite, `FunctionInput.vue:44-55`). Then `omega = Infinity` (`:104`), every harmonic sample
is `NaN` (`:144`), `maxX - minX == 0` makes `toScreen` return `±Infinity` (`:179`), and
`Math.min(...oy, ...fullSum)` is `NaN` (`:164`) — a blank/garbage canvas with no error path.
`Math.min(...oy, ...)` also spreads a 500-element array into the call stack on every `draw()`,
which is fine at 500 and is a latent ceiling at `n_eval_points` ≤ 5000
(`api/models/equations.py:20`).

**Falsifier (survived).** (a) The domain being derived from the result — refuted: the template
binds the refs; deriving it would be `result.original_points.x[0]` / `.at(-1)`; (b) a guard in
`ConvergencePlot` — `grep -n "domB - domA\|domainEnd\|<=" ConvergencePlot.vue` shows only the
raw subtraction; (c) `draw()` being gated on a recompute — refuted at `:308-319`, the watchers
fire on `props.originalPoints`/`props.coefficients`/`props.nHarmonics` but `props.domain` is
consumed by whichever `draw()` runs next, and the rAF loop (`:57-70`, census `lane-frontend.md:559`
"a second, ungated clock") calls `draw()` ~60×/s regardless.

### M-2 · Abort-race clobbers the loading flags — a superseded request turns the spinner off while its successor is still in flight

**Severity MAJOR.** `lib/api.ts:54-59` `abortable(key)` aborts the previous controller for the
same key **synchronously**, and `coreFetch` reaches it at `:161` before its first `await`. Both
equation calls use fixed keys (`"eq-compute"`, `"eq-simplify"` — `equation/api.ts:27,51`).

Sequence for two rapid `doCompute(true)` calls (reachable by clicking two presets, or Enter
twice — `FunctionInput.vue:40,102,147` all route to `@compute`):

1. A: `computing = true` (`:100`), awaits.
2. B: `computing = true`, calls `abortable("eq-compute")` → **A's fetch rejects now**.
3. A's `catch` sees `isAbortError` → correctly sets no error (`:122`) → **A's `finally` runs
   `computing.value = false` (`:126`) while B is still pending.**

With no prior result the template then evaluates: `v-if="computing && !result"` false,
`v-else-if="error && !result"` false, `v-else-if="result"` false → it falls through to the
**empty state** `"Enter a function to see its Fourier series"` (`:321-325`) *during* a compute.
`doSimplify` has the identical shape (`:135`, `:145`).

**Falsifier (survived).** (a) A per-call token/guard (`if (key !== lastComputeKey) return`) in
the `finally` — absent; (b) the abort landing *after* B resolves — impossible, the rejection is
a microtask scheduled at step 2 while B's network round-trip is not; (c) a shared counter
instead of a boolean — refuted, `computing` is a plain `ref(false)` (`:33`).

### M-3 · Two caches, two write cadences, one restored key — a reload after an un-computed edit shows a stale result *and* suppresses the corrective recompute

**Severity MAJOR.** `useEquationCache.ts` keeps `eq-tab-state-v2` and `eq-tab-result-v2` as
independent records. The **input** cache is written by a non-debounced watcher on every change
(`EquationView.vue:161-171` → `saveCachedInputState`); the **result** cache is written only
after a successful compute/simplify (`:120`, `:141`).

Restore then seeds the memo keys from the *input* cache while the result comes from the *result*
cache (`:79-80`):

```ts
let lastComputeKey = cachedRes ? `${expression.value}|${domainStart.value}|${domainEnd.value}|${nHarmonics.value}` : "";
let lastDisplayKey  = cachedRes ? `${lastComputeKey}|${notation.value}|${budget.value}` : "";
```

Edit the expression, do not press Compute, reload. `expression` restores to the **new** text;
`result` restores to the **old** computation; `lastComputeKey` is stamped with the new inputs.
Now: `:174 if (!result.value) doCompute()` does not fire (a result exists); `doSimplify`'s
`key === lastDisplayKey` guard (`:133`) early-returns; and B-1's sigma path is restored from
`cachedRes?.result?.latex_sigma` (`:39`) — the *pre-simplify* provenance — while `displayLatex`
is restored from the *post-simplify* value (`:38`). Three fields, three provenances, one screen.
The only escape is `doCompute(true)`.

**Falsifier (survived).** (a) A shared version/etag across the two records — `useEquationCache.ts`
has none; (b) the input cache being written only on success — refuted at `:161-171` (unconditional
watcher); (c) a runtime shape check on restore — refuted at `useEquationCache.ts:27-29,38-40`:
`JSON.parse(raw)` is returned under an unchecked `CachedInputState | null` / `CachedResult | null`
annotation, so a drifted record yields `result.coefficients === undefined` and `:61`
`.coefficients.map` throws inside a computed. The `-v2` key suffix is the *only* schema guard
and it is manual.

### M-4 · `retryOn429` is unreachable from `apiFetch`'s public type — a CPU-backpressure 429 is auto-amplified ×3 against the endpoint that just said it was saturated

**Severity MAJOR.** `api/services/computation.py:33-40`: when the compute semaphore cannot be
acquired within 30 s the server raises **`HTTPException(429, "Compute queue saturated, try
again shortly")`** — a *backpressure* signal, with no `RateLimit-Reset` header.

`lib/api.ts:162` `const retryOn429 = options?.retryOn429 ?? true;` and `:172-178` retry up to
`MAX_RATE_LIMIT_RETRIES = 2` with `waitSec = Math.min(reset ?? 2 ** attempt, 30)` — `reset` is
`null` here (`api-problem.ts:56-61` reads a header the FastAPI `HTTPException` never sets), so
the backoff is 1 s then 2 s.

The lock-out: `retryOn429` lives on `CoreFetchOptions` (`lib/api.ts:~100`) but is **absent from
`ApiFetchOptions`** (`lib/api.ts:205-212`), and `apiFetch` is the only exported wrapper
(`:215-224`). `equation/api.ts:27-30,51-54` therefore *cannot* opt out even in principle.

**Consequence.** One user click on a saturated backend becomes 3 enqueue attempts spanning
≥ 3 × 30 s of queue wait, with `computing` pinned true and the banner reading "Computing…" the
whole time. The retry is applied to the most expensive endpoint in the app (symbolic
integration, `api/routers/equations.py:29-118`) and it is applied *because the server asked for
relief*.

**Falsifier (survived).** (a) `retryOn429` being settable from the equation layer — refuted by
the `ApiFetchOptions` field list at `:205-212`; (b) the 429 being a genuine rate limit with a
`RateLimit-Reset` — refuted at `computation.py:36-40`; (c) a client timeout bounding the
spinner — `coreFetch` passes no `AbortSignal.timeout` (`:161`).
Note in fairness: the *compute* leg is bounded server-side by
`asyncio.wait_for(..., settings.compute_timeout_s)` → 504 (`computation.py:42-49`); the
unbounded surface is the retry-on-backpressure loop, not the job.

### M-5 · `doSimplify` swallows every non-abort failure with a `/* silent */` no-op

**Severity MAJOR.** `EquationView.vue:142-144`:

```ts
} catch (e) {
    if (!isAbortError(e)) { /* silent */ }
}
```

A 422 (B-2), a 429-after-retries, a 504 (`computation.py:47`), a 500 or an offline network all
land here and produce **no state change of any kind** — not `error`, not a console line, not a
telemetry hook. Because `lastDisplayKey` is only advanced on success (`:140`) the next identical
attempt will at least retry, but the user is told nothing: the notation pills and the "Display
terms" slider show one configuration while the equation and the energy badge show another.

Contrast the sibling path: `doCompute` at `:121-124` does surface the message. The two async
seams in the same 60-line block have *opposite* error postures, and the silent one is the one
the user drives most often (every notation click, every budget drag).

**Falsifier (survived).** (a) A global error toast — `grep -rn "toast\|useToast" components/equation/`
→ no hits in this subtree; (b) a rethrow — the block is a terminal no-op; (c) the failure being
unreachable — B-2 supplies a one-drag reproduction.

### M-6 · The `vizHarmonics` budget-rescale guard is vacuous — the user's explicit "Display terms" choice is overwritten on every harmonics change

**Severity MAJOR.** `EquationView.vue:151-159`:

```ts
watch(vizHarmonics, (v, oldV) => {
    if (budget.value > v) {
        budget.value = Math.max(2, v);
    } else if (oldV != null && oldV > 0 && budget.value <= oldV) {
        // Budget was at or near the old cap — scale it up proportionally
        const ratio = budget.value / oldV;
        budget.value = Math.max(2, Math.round(v * ratio));
    }
});
```

The comment says *"at or near the old cap"*. The condition says `budget <= oldV` — which is
true for **every** budget in range, because the budget slider's own max is `vizHarmonics`
(`FunctionInput.vue:217`) and the first branch already forces `budget ≤ v`. In every reachable
steady state exactly one of the two branches fires, so `budget` is *always* rewritten whenever
`vizHarmonics` moves. A user who deliberately set 6 display terms and then nudges the harmonics
slider gets 6 silently replaced by a proportional number, on every step of the drag.

The guard the comment describes ("near the cap") would be `budget >= oldV - ε`. The condition as
written is a tautology.

**Falsifier (survived).** Find a reachable state where neither branch fires: it requires
`budget > oldV` *and* `budget <= v`. `budget > oldV` demands a budget above the previous cap,
which only the cache-restore incoherence (M-3) can produce transiently. So: the "no-op" branch
exists but is reachable only via a *different* defect. Claim stands.
Secondary: this watcher is what feeds M-1's amplification (`v` up to 100) and B-2's overshoot
(`budget` up to 100).

### M-7 · No teardown — a route-leave leaves the compute running, and a dead instance can overwrite a fresh one's cache

**Severity MAJOR.** `EquationView.vue` registers **no** `onUnmounted` /
`onBeforeUnmount` (`grep -n "onUnmounted\|onBeforeUnmount\|onScopeDispose" EquationView.vue` →
no hits), and it is a lazily-loaded route component (`router/index.ts:94`).

The idiom exists and is used elsewhere in this very repo: `lib/api.ts:61-66` exports
`abortInflight(keys)`, and `stores/workspace.ts:90,140,202,270` calls it at four seams. The
equation route is the one async surface that does not.

Consequences on route-leave mid-compute: the request continues to completion (server work is
not cancelled either — `asyncio.to_thread` has already started); the resolved handler writes
six refs of a dead instance and calls `saveCachedResult` (`:120`); if the user has already
returned to `/equation`, that write lands **after** the new instance ran `loadCachedResult`
(`:36`) — the fresh session's cache is stamped with the dead session's payload while the live
`result` ref holds something else. That is M-3's incoherence, arrived at from the other side.

`useMediaQuery` (`:45`) and `watchDebounced` (`:177`) *are* scope-disposed by VueUse, so the
listener/timer side is clean — the gap is precisely the two fetches.

**Falsifier (survived).** (a) A router-level abort — `grep -rn "abortInflight" src/` returns only
`lib/api.ts` and `stores/workspace.ts`; (b) Vue silently discarding writes to a dead instance's
refs — it does not, refs are plain reactive cells; (c) the fetch being cancelled by GC — no.

---

## §3 · MINOR (14)

### m-1 · The `force` parameter and its memo branch are **dead code**
`EquationView.vue:91-98`. Both call sites are enumerated: `:174` `if (!result.value) doCompute();`
(so the `result.value` conjunct in the guard is false by construction) and `:210`
`@compute="doCompute(true)"` (so `!force` is false). The `key === lastComputeKey` memoization
therefore **never fires**, and every Compute press re-runs symbolic integration even when nothing
changed. *Falsifier:* a third call site — `grep -n "doCompute" EquationView.vue` yields exactly
`:91`, `:97`(recursive-adjacent `doSimplify`), `:174`, `:210`.

### m-2 · `useCoeffHover(coefficients, notation)` never reads `notation` — dead parameter, misleading contract
`useCoeffHover.ts:21-22` accepts `notation: Ref<NotationMode>`; `grep -n "notation"
useCoeffHover.ts` returns only the doc-comment (`:3`) and the parameter (`:22`). The composable's
signature advertises a notation-sensitive popover; the body renders `a_n`/`b_n`/`c_n`/`A_n` purely
off the hovered CSS class. *Falsifier:* any `notation.value` read — none exists.

### m-3 · The ±n → (a_n, b_n) fold is implemented twice, with **different epsilons and different ordering**
`useCoeffHover.ts:74-76` (`val = kind === "an" ? cP[0] + cN[0] : -(cP[1] - cN[1])`, kept when
`|val| > 1e-10`, iteration order = coefficient array order) vs `lib/harmonics.ts:41-45`
(`a_n = crP + crN; b_n = -(ciP - ciN)`, kept when `amp > 1e-14`, then `sort((a,b) => a.k - b.k)`).
Same mathematics, two thresholds four orders of magnitude apart. A harmonic with amplitude in
`(1e-14, 1e-10)` appears in the plot legend and *not* in the hover popover. *Falsifier:* the two
predicates being equivalent — they are not (`|a_n| > 1e-10` vs `√(a_n²+b_n²) > 1e-14`).
Both are also O(n²): `find` inside a loop over the same array (`useCoeffHover.ts:72-73`,
`harmonics.ts:33-34`).

### m-4 · `TrigHarmonic` is declared twice, structurally identically
`composables/useCurveTransition.ts:10-15` and `lib/harmonics.ts:9-14`. `ConvergencePlot.vue:10-11`
imports the type from `harmonics` and the *functions* from `useCurveTransition`, so the two
declarations are silently unified by structural typing — until one of them gains a field.
*Falsifier:* one being a re-export — neither is; both are `export interface`.

### m-5 · `FourierTermDTO → BasisComponent → FourierTermDTO` identity round-trip on every simplify
`EquationView.vue:59-67` maps `result.coefficients` into `BasisComponent[]`;
`equation/api.ts:38-44` maps it straight back into `FourierTermDTO[]` before POSTing. The
component *already* holds the original array in the `coefficients` computed (`:72`). Two full
array allocations per simplify, plus a field-renaming layer that exists only to satisfy a
signature. *Falsifier:* `simplifyCoefficients` needing something `BasisComponent` uniquely
provides — it needs `n/re/im/amplitude/phase`, all present on the DTO.

### m-6 · `reconstructed_points` is fetched, persisted, and read by nothing
`lib/equation/types.ts:31` declares it; `api/routers/equations.py:127` sends it (500 x + 500 y
floats); `useEquationCache.ts:48` serialises the **whole** response into `sessionStorage`.
`grep -rn "reconstructed_points" web/src/` → **1 hit, the type declaration**. Dead payload on the
wire and in storage. *Falsifier:* a consumer — there is none in `web/src`.

### m-7 · `TIER_INFO: Record<string, …>` makes the `?? TIER_INFO.spline` fallback type-dead
`lib/equation/notation.ts:20-23` keys the map by `string` though `EquationTier` exists
(`types.ts:2`). At `EquationView.vue:69` the index expression is typed non-`undefined`
(`tsconfig.json` sets `strict` but **not** `noUncheckedIndexedAccess` — verified), so the `??`
guard is unreachable to `vue-tsc` while being load-bearing at runtime (the backend types `tier`
as a bare `str`, `api/models/equations.py:29`). Keying by `EquationTier` would make the map
exhaustive *and* make the runtime fallback honest. *Falsifier:* `noUncheckedIndexedAccess` being
on — it is absent from `web/tsconfig.json`.

### m-8 · A second, **unscoped** `<style>` block ships a global class from a lazy route chunk
`EquationView.vue:455-469` defines `.info-hovercard` globally so it can reach the portaled
`HoverCardContent`. The rule enters the document only once the `/equation` chunk loads and never
leaves. `grep -rn "info-hovercard" web/src/` → exactly 2 hits (`:282` use, `:457` definition), so
there is no collision *today*; the hazard is the unnamespaced global itself.
Coupled corpus note: `HoverCard` is one of the two removed-subpath sites
(census `lane-frontend.md:473`, `./hover-card` folds into `<Popover>` at glass-ui 5.0.0) — this
global block is part of that migration's cost.

### m-9 · KaTeX `trust: true` on server-derived LaTeX injected via `v-html`, plus an **unescaped** catch-fallback
`EquationResult.vue:20-27` renders `props.latex` (= `activeLatex`, `EquationView.vue:255`) with
`trust: true` and injects it at `:37` `v-html="renderedHtml"`. `trust: true` re-enables `\href`,
`\url`, `\includegraphics`. Sharper: the catch path at `:26` returns
`` `<code>${props.latex}</code>` `` — the raw server string interpolated into HTML with **no
escaping**, and sympy latex legitimately emits `<` (inequalities in `Piecewise`).
**Honest reachability finding:** I could **not** construct a payload.
`src/fourier_analysis/symbolic/parsing.py:17-52` confines evaluation to a whitelisted namespace
and unknown identifiers must survive Python tokenisation, so `\href{...}` cannot enter the
expression. Severity therefore MINOR (posture / defence-in-depth), not MAJOR.
*Falsifier that would raise it:* an expression that makes `render_latex_sigma` emit `\href`,
`\includegraphics`, or a literal `<tag`. *Falsifier that would kill it:* `trust: false` plus an
escaped fallback — neither is present.
`UNPROVEN-NEEDS-LIVE` for the `<code>` fallback's actual trigger rate (KaTeX still throws past
`throwOnError:false` on non-parse errors such as macro-expansion limits).

### m-10 · `error` is cleared in exactly one place, so a stale banner outlives its cause
`EquationView.vue:101` (`error.value = null`) is the sole reset, and it sits *after* the
short-circuit return at `:97`. A failed compute leaves the red banner (`:243-246`) up across every
subsequent input edit and every successful simplify — the screen asserts a failure that has been
superseded. *Falsifier:* a watcher clearing it — `grep -n "error.value" EquationView.vue` →
`:35`, `:101`, `:123` only.

### m-11 · `SegmentedTabs` options literal re-allocated every render + a template cast
`EquationView.vue:188-191`: `:options="[{...},{...}]"` is a fresh array identity on every parent
render, defeating any memo in the child; and
`@update:model-value="mobileView = $event as 'controls' | 'canvas'"` casts an emit payload the
producer types more loosely. Hoist the literal to a `const` and narrow with a type guard.
*Falsifier:* the child not caring about prop identity — `UNPROVEN-NEEDS-LIVE` (producer source is
out of this read-set); the cast is proven from `:191`.

### m-12 · `popoverHtml` claims truncation that did not happen (off-by-one, inconsistent with its own sibling branches)
`useCoeffHover.ts:81`: `if (lines.length >= 6) { lines.push("\\vdots"); break; }` runs *after* the
push and without lookahead, so exactly six non-negligible harmonics still render a trailing "⋮".
The `cn` and `An` branches get it right with `if (coeffs.length > 6)` (`:89`, `:94`) — three
branches, two truncation semantics, in one 45-line computed. *Falsifier:* a 7th harmonic always
existing — refuted, the loop is over `harmonics` whose length is data-dependent.

### m-13 · Goldilocks / colocation — the orchestration is the one concern *not* extracted
469 lines total (script 182 / template 147 / style 139). The script holds 6 input refs, 8 result
refs, 6 computeds, 2 async orchestrators, 2 key builders and 3 watches. The directory next door
already holds three composables of 49–106 lines (`useEquationCache`, `useCoeffHover`,
`useCurveTransition` — census `lane-frontend.md:141-143`), i.e. the extraction pattern is
established and this one concern was skipped. A `useEquationSession()` owning
`{compute, simplify, keys, loading, error}` would take ~90 lines out of the SFC and make B-1,
M-2, M-3, M-5 and M-7 all unit-testable without mounting. *Falsifier:* 469 being within the
repo's norm — the equation dir's next largest SFC is `ConvergencePlot` at 410 and the median is
101 (census table `:130-140`).

### m-14 · **R5-7 class applied** — this subtree's only native-element loop is the per-harmonic legend, and the target's own loop leaf is empty by construction
Adjudicated intake row **R5-7** (`intakes/lane-fourier-r3-r6.md:125`, verdict TRUE /
ADOPT-AS-FACT → carry F.W4): *template-loop evidence keyed to component callsites is blind to
native HTML element loops*. Enumerating every `v-for` in `components/equation/`:

| Site | Loop host | Deriver visibility |
|---|---|---|
| `FunctionInput.vue:157` | `<Tooltip v-for>` — **component** | VISIBLE — this is the intake's own populated exemplar, `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0` |
| `NotationPills.vue:18` | `<Button v-for>` — **component** | VISIBLE |
| `convergence/ConvergenceLegend.vue:30` | `<div v-for="(h, i) in harmonics">` — **native** | **INVISIBLE** |
| `EquationView.vue` | none | leaf empty by construction |

So the one variable-cardinality surface in this subtree whose count actually scales with user
input — the legend row per harmonic, up to 100 (`FunctionInput.vue:184`) — is exactly the one a
component-callsite-keyed derivation drops, reproducing the `instance.loop.paper-sidebar = []`
signature at a second, independent site. And `EquationView` itself contributes zero loop
evidence while transitively rendering an unbounded list, so a per-component instance denominator
built for this file would read "no loops" and be wrong about its own subtree.
*Falsifier:* the legend being fixed-cardinality — refuted, `:30` iterates `props.harmonics` which
is `groupTrigHarmonics(coefficients, nHarmonics)` (`ConvergencePlot.vue:35`).
This **extends** R5-7 with a second live instance; it contradicts nothing in the intake.

---

## §3b · INFO (2)

- **i-1 · `effectiveN` is initialised to a fabricated 20** (`EquationView.vue:41`) when there is no
  cache, so `vizHarmonics = min(20, nHarmonics)` and the harmonics slider *displays* 20
  (`FunctionInput.vue:183`) before any measurement exists. `displayEnergy` likewise defaults to
  `1` = "100.0% energy" (`:40`, rendered at `:293`). Both are masked pre-first-result because the
  hover card is gated on `tierInfo`, but they are un-flagged fabrications in a component whose
  subject is numerical honesty. *Falsifier:* a `null` sentinel — absent.
- **i-2 · `onMouseMove` is unthrottled and does two `getBoundingClientRect()` plus an
  `Object.entries()` allocation per event** (`useCoeffHover.ts:28-47`), bound to the whole
  equation card (`EquationView.vue:252`). Forced-layout on every pointer sample over a KaTeX
  subtree. `UNPROVEN-NEEDS-LIVE` for the actual cost; the call shape is proven.

---

## §4 · SUPERLATIVES (5) — L-18 in the other direction

Each carries the falsifier that would demote it.

- **S-1 · `EquationView.vue:116-119` — a load-bearing ordering comment that is actually correct.**

  ```ts
  // Capture display key BEFORE effectiveN triggers the vizHarmonics→budget
  // chain, so a subsequent doSimplify can detect the budget changed.
  lastDisplayKey = displayKey();
  effectiveN.value = result.value.effective_n;
  ```
  I traced the chain: `effectiveN` → `vizHarmonics` (`:53-55`) → the watch at `:151` mutates
  `budget` → `watchDebounced` (`:177`) → `doSimplify` → `displayKey()` now differs from the
  captured `lastDisplayKey` → the guard at `:133` correctly *fails* and the expanded latex
  refreshes. **Falsifier that would demote it:** swap the two lines and the post-compute simplify
  is suppressed, because `lastDisplayKey` would already carry the new budget — i.e. the comment
  names a real hazard and the code defends it in the right order. Rare.

- **S-2 · Abort discipline applied at *both* async seams.** `:122` and `:143` both test
  `isAbortError` before touching `error`. Superseded requests are a first-class concept here, not
  an afterthought. **Falsifier that would demote it:** one seam missing the guard — then every
  rapid preset click would paint "Computation failed"; both have it. (M-5 is about what the
  simplify seam does *after* the guard, not about the guard.)

- **S-3 · `ConvergencePlot.vue:113-115, 123-127` — a frontend comment that cites a backend line
  and is still true.** It explains that the partial-sum grid keeps the backend's `endpoint=False`
  convention while the *original* curve gets a closed grid for visual wrap, citing
  `api/routers/equations.py:61`. I checked: `np.linspace(domain[0], domain[1], req.n_eval_points,
  endpoint=False)` is at **`api/routers/equations.py:59`** — a 2-line drift, the statement is the
  right one. The reasoning (periodic identification of `x = domB` with `x = domA`) is
  mathematically correct and is exactly why `oxClosed`/`oyClosed` (`:128-129`) append the wrap
  sample rather than re-sampling. **Falsifier that would demote it:** the backend using
  `endpoint=True`, which would make the whole comment a lie — it does not.

- **S-4 · `useEquationCache.ts` is storage-denial-proof and versioned.** All four accessors are
  totally wrapped (`:26-30, 33, 37-41, 48`) and both keys carry an explicit `-v2` suffix. A
  Safari private-mode `sessionStorage` throw, a quota exception, or a drifted record cannot
  white-screen the route at *load* time. **Falsifier that would demote it:** one unguarded access
  — there is none. (M-3 is about *coherence between* the two records, which the try/catch cannot
  and does not address.)

- **S-5 · `useCoeffHover` takes the container element as an argument instead of reaching for it.**
  `onMouseMove(e, cardEl)` (`useCoeffHover.ts:28`) is fed from the template at
  `EquationView.vue:252` (`(e) => onCoeffMove(e, eqCardRef)` — correct, template refs auto-unwrap
  to `HTMLDivElement | undefined`, which is exactly the declared parameter type). The composable
  never touches `document`. **Falsifier that would demote it:** a `document.querySelector(".eq-card")`
  inside the composable — which would break the instant a second instance mounted; there is none.

---

## §5 · Verdict and repair ordering

**DEFECTIVE.** 25 defect claims (2 BLOCKER · 7 MAJOR · 14 MINOR · 2 INFO) + 5 superlatives.

The component is a *route shell that grew an unextracted state machine*. Its three sharpest
failures are all one shape — **two sources of truth that were never reconciled**: the equation
surface (`displayLatex` vs `displayLatexSigma`, B-1), the plot inputs (live refs vs last result,
M-1), and the cache (input record vs result record, M-3). B-2 is a fourth instance across the
wire (frontend budget domain vs pydantic's).

Suggested order, cheapest-first, each independently landable:

1. **B-2** — clamp `budget` to 50 at the two call sites (or lift the pydantic bound); one line
   each, kills a live 422.
2. **M-5** — give `doSimplify` `doCompute`'s error posture; makes B-2 and every future failure
   visible.
3. **B-1** — either have `/simplify` return `latex_sigma`, or route a notation change through
   `doCompute`. This is a contract decision, not a patch.
4. **M-1** — derive `:domain` from `result.original_points`, and reject `domainEnd <= domainStart`
   in `parseDomainValue`.
5. **M-2 + M-7 + M-3** — fall out together from the m-13 extraction: a `useEquationSession()` that
   owns a request token (kills M-2), an `onScopeDispose` calling `abortInflight(["eq-compute",
   "eq-simplify"])` (kills M-7), and one versioned cache record (kills M-3).
6. **M-6** — make the guard say what its comment says, or delete the rescale.
7. **M-4** — add `retryOn429` to `ApiFetchOptions` and pass `false` for the two equation calls.

Corpus carries this challenge should feed forward: **m-14 → F.W4** (second live instance of
R5-7; the per-component loop denominator must count `ConvergenceLegend.vue:30`), **m-8 → the
glass-ui 5.0.0 `hover-card → Popover` fold** (census `lane-frontend.md:473`), **m-3/m-4 → the
`BasisComponent` substrate-duplication row** (census `3a · Shadows`, SOFT).
