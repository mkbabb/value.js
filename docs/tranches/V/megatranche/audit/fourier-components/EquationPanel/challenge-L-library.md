claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationPanel.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EquationPanel.vue` — 134 lines
(matches `formation/fourier/lane-frontend.md:92`, *"`components/visualization/EquationPanel.vue` | 134 | KaTeX-rendered
partial-sum equation overlay"*).

**Axis** LIBRARY — code correctness · leaks/teardown · wrong types · duplication · colocation · module size
(Goldilocks) · composable contracts · error postures · dead code · the viz render path this component touches ·
the R5-7 native-template-loop invisibility class.

**Posture** The component is presumed DEFECTIVE until the tree proves otherwise. Every row below carries a
severity, `file:line` provenance, and the falsifier that would kill it. Superlatives carry the same burden
(L-18 runs both ways). No browser was opened; two rows whose *magnitude* is only livable-provable are marked
**UNPROVEN-NEEDS-LIVE** for SS-13.

**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the exact tree the intake lane
authenticated (`intakes/lane-fourier-r3-r6.md` R4-9, ADOPT-AS-FACT, *"the audited scope is byte-identical to the
tree F.W0 opens on"*). Nothing here is stale-at-HEAD.

---

## §0 · Scope read, and the corpus folded (not re-invented)

### 0a — files read whole (read-only)

| file | lines | why |
|---|---:|---|
| `web/src/components/visualization/EquationPanel.vue` | 134 | subject |
| `web/src/lib/equation/api.ts` | 57 | `simplifyCoefficients`, `isAbortError` re-export |
| `web/src/lib/equation/notation.ts` | 48 | `energyColor` |
| `web/src/lib/equation/types.ts` | 53 | `NotationMode`, `SimplifyRequest/Response` |
| `web/src/lib/api.ts` | 672 | `apiFetch` → `coreFetch` → `abortable` registry |
| `web/src/components/equation/NotationPills.vue` | 47 | child |
| `web/src/components/ui/SliderControl.vue` | 150 | child |
| `web/src/stores/workspace.ts` | 471 (head read + abort/epicycle paths) | `epicycleData` producer |
| `web/src/components/visualization/VisualizationView.vue` (mount region + styles) | — | the sole callsite, `:231` |
| `web/src/components/equation/EquationResult.vue` · `EquationView.vue` (:100-165) · `composables/useCoeffHover.ts` · `composables/useEquationCache.ts` | — | the duplication comparanda |
| `api/routers/equations.py` · `api/models/equations.py` · `src/fourier_analysis/symbolic/simplification.py` · `api/services/computation.py` · `src/fourier_analysis/epicycles.py` | — | the far side of the seam (payload cardinality, budget clamp, notation validation) |
| `node_modules/@vueuse/shared/dist/index.js:320-357, 1843-1849` | — | `debounceFilter` / `watchDebounced` teardown proof |
| `node_modules/@mkbabb/glass-ui/dist/styles/glass/ladder.css:36-42` · `.../metric-badge/MetricBadge.vue.d.ts` | — | `.glass-wash` material contract; `MetricBadgeProps` |

### 0b — the hitherto corpus, folded

| corpus row | what it says | how this file consumes it |
|---|---|---|
| `formation/fourier/lane-frontend.md:92` | EquationPanel = 134 LOC, "KaTeX-rendered partial-sum equation overlay" | **Confirmed exactly.** Used as the size denominator in S-L3. |
| `CENSUS-2026-08-03.md:85-87` [FE §6] | *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; …)"* | **Adopted verbatim, not re-derived.** This is the render path §4 reasons over: the subject is a `backdrop-filter` overlay pinned on top of the epicycle instrument. No WebGL claim is made anywhere below. |
| `lane-frontend.md:213` + `:298`-region import census | `@mkbabb/glass-ui/metric-badge` ×7 **REMOVED at 7.0.0**; `lucide-vue-next → @lucide/vue` ×35 | **Confirmed live** (`grep` → 7 metric-badge files, EquationPanel is #3; 35 lucide files). Booked as D-L18. |
| `lane-frontend.md:138` | `NotationPills.vue` 47 LOC — "**SHADOW candidate**, §4" (→ `./chip`) | Adopted; this file is the *only* consumer besides EquationView, so the shadow disposition is cheap. Not re-litigated here (that is the C axis). |
| `lane-frontend.md:130-131` | `EquationView.vue` **469** · `ConvergencePlot.vue` **410** | Used as the Goldilocks contrast in S-L3. |
| `intakes/lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT + CARRY→F.W4) | *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* | **Applied and extended** — §3. This component contributes a **new, fourth** blindness class that neither R5's model nor R6's cure reaches. |
| `intakes/lane-fourier-r3-r6.md` **R6-5/R6-6** (ADOPT-AS-FACT) | the `NATIVE_TEMPLATE_LOOP` family cures R5-7; `nativeTemplateLoops: 16`, gate GREEN 11/11 | Used as the *falsifier instrument* in §3 — the cure is real and it still does not see this component's DOM. |
| `intakes/lane-fourier-r3-r6.md` **R4-9** (ADOPT-AS-FACT) | HEAD `cd26c653…`, tree `9a66411d…`, worktree byte-identical | Substrate pin (header). |
| `audit/fourier-components/ConvergenceTimeline/challenge-L-library.md:287` | the *third* blindness class — producer-internal loops behind a component boundary (glass `Slider`'s `renderList`) | **Extended, with an explicit contradiction-free join**: that class applies here too (this file mounts the same `Slider` via `SliderControl`), and §3 adds a fourth that is strictly larger. |
| `audit/fourier-components/ConvergenceLegend/challenge-L-library.md:152-172` | R5-7 has ≥2 independent members; the invisible cardinality is the input to severity | Adopted as method: §3 quantifies the invisible cardinality rather than merely naming it. |

**Explicit contradiction of the corpus:** none. Every corpus figure I re-derived reproduced. Where I go beyond the
corpus I say so (§3's fourth class; §4's backdrop coupling).

---

## §1 · Findings ledger

19 rows: **0 BLOCKER · 7 MAJOR · 10 MINOR · 2 INFO**.

The zero-blocker count is itself a claim and is defended at §5b — do not read it as a soft pass.

---

### D-L1 · **MAJOR** · `loading` is not request-scoped: an aborted predecessor clears the successor's spinner

**Provenance** `EquationPanel.vue:40-58` (`loading.value = true` at `:42`; `finally { loading.value = false }` at
`:56-58`) × `lib/api.ts:54-59`:

```ts
function abortable(key: string): AbortSignal {
    inflight.get(key)?.abort();      // ← kills the PREVIOUS request for this key
    const ac = new AbortController();
    inflight.set(key, ac);
    return ac.signal;
}
```

Both requests share the literal key `"eq-simplify"` (`lib/equation/api.ts:51`).

**The defect.** `loading` is a module-level boolean shared by every invocation of `fetchSimplified`, but the
transport guarantees overlap. Trace two ticks:

1. `t=300` — request **A** runs: `loading = true` (`:42`), `await simplifyCoefficients(...)` (`:45`).
2. `t=650` — request **B** runs: `loading = true` (`:42`, already true), then `coreFetch` calls
   `abortable("eq-simplify")` (`lib/api.ts:161`) which **aborts A**.
3. A's `await` rejects with `AbortError` → `catch` at `:52` correctly *suppresses* the error via
   `isAbortError` (`:53`) → **`finally` at `:56` runs `loading.value = false`** while **B is still in flight**.

**Failure scenario (concrete).** User drags the Terms slider from 6 to 9 to 14. B is issued at `t≈650 ms`; A's
abort resolves ~1 microtask later. From `t≈650 ms` until B's response lands the panel shows `loading === false`,
so the template takes the `v-else` branch (`:111`) and paints the **stale** equation for the previous budget,
with **no** loading affordance — the spinner flashes for one microtask and vanishes. On a slow link the user
watches an equation that is wrong for the slider position, indefinitely, with the UI asserting it is settled.

**Falsifier.** Kill this row by showing either (a) that `abortable` does not abort a same-key predecessor —
refuted at `lib/api.ts:55`; or (b) that A's `finally` cannot run after B's `loading = true` — refuted by
ordering: `:42` is synchronous in B's frame and the abort is raised inside `coreFetch`, i.e. strictly after.
The 300 ms debounce does **not** save it: debounce spaces the *starts*, it does not bound the *durations*.

**Shape of the cure (not applied).** Scope the flag to the request — a monotonic `seq` captured before the
await and compared in `finally` (the store already owns exactly this idiom: `epicycleRevision` /
`basesRevision`, `stores/workspace.ts:56-58`, with the comment *"so that loadWorkspace incrementing `revision`
doesn't cause compute results to be silently discarded"*). The house pattern exists; this file did not adopt it.

---

### D-L2 · **MAJOR** · teardown gap: the debounce timer outlives the component and fires `fetchSimplified()` on a destroyed instance

**Provenance** `EquationPanel.vue:61-65` × `@vueuse/shared/dist/index.js:1843-1849` × `:320-357`.

```js
function watchDebounced(source, cb, options = {}) {          // :1843
    const { debounce = 0, maxWait = void 0, ...watchOptions } = options;
    return watchWithFilter(source, cb, { ...watchOptions, eventFilter: debounceFilter(debounce, { maxWait }) });
}
function debounceFilter(ms, options = {}) {                  // :320
    let timer; …
    timer = setTimeout(() => { … resolve(invoke()); }, duration);   // :349
    return filter;                                            // :356 — no tryOnScopeDispose anywhere
}
```

`debounceFilter` registers **no** `tryOnScopeDispose` / `tryOnUnmounted` (the symbols exist in the same bundle —
`:2013` exports both — and are simply not used on this path). Vue's `watch` stops on unmount, which prevents
*re-scheduling*; it does not clear an **already-armed** `setTimeout`.

**Failure scenario (concrete, reachable).** The close button sits 2 rows above the Terms slider
(`:86-95` vs `:99-105`). User nudges the slider, then clicks ✕ within 300 ms → `emit('close')` → parent sets
`showEquation = false` (`VisualizationView.vue:231`) → the component unmounts. ~300 ms later the orphaned timer
fires `fetchSimplified()`: `store.epicycleData` is still non-null, so the guard at `:41` passes, a **real POST
to `/api/equations/simplify` is issued**, and `loading` / `latex` / `energy` / `error` are written on a
destroyed instance. Same path via the edit toggle (`isEditing` at `VisualizationView.vue:231`), which does not
touch the watch source at all and therefore cannot be masked by a source re-evaluation.

**Falsifier.** Kill it by exhibiting a scope-dispose hook on the vueuse debounce path (grep of the shipped
bundle: absent), or by showing the component clears the timer itself (`EquationPanel.vue` has **zero**
`onUnmounted` / `onScopeDispose` / `onBeforeUnmount` — the whole `<script setup>` is 65 lines and is quoted in
full above the template). A weaker rebuttal — "the store is null by then so it early-returns" — holds only for
the `epicycleData → null` path, not for ✕ or edit-toggle, which are the two the user actually clicks.

---

### D-L3 · **MAJOR** · no unmount abort: the in-flight `eq-simplify` request is never cancelled, though the repo ships the exact instrument

**Provenance** `EquationPanel.vue` (no lifecycle hook, whole file) × `lib/api.ts:61-66`:

```ts
export function abortInflight(keys: string[]) {
    for (const key of keys) { inflight.get(key)?.abort(); inflight.delete(key); }
}
```

…and the house consumer, `stores/workspace.ts:85-91`:

```ts
function invalidateInFlightComputation() {
    revision.value++; epicycleRevision++; basesRevision++;
    api.abortInflight(["extractContour", "computeEpicycles", "computeBases", "getContour"]);
}
```

**The defect.** `"eq-simplify"` appears in **no** `abortInflight` list anywhere in the tree
(`grep -rn "eq-simplify" web/src` → `lib/equation/api.ts:51` only). Unmounting the panel mid-flight leaves the
POST running to completion; its `AbortController` also stays resident in the module-level `inflight` map
(`lib/api.ts:52`, never deleted on success — deletion happens only in `abortInflight`). The residency is
bounded by key cardinality, so this is **not** an unbounded leak; the defect is the *un-cancelled work*, not
memory.

**Failure scenario.** ✕ during a slow simplify on a 401-coefficient payload (see D-L5): the browser holds the
request, the FastAPI `submit_compute_job("simplify", …)` worker (`api/routers/equations.py:155`) burns a
compute slot for a panel nobody is looking at, and the response body is parsed and thrown away. Repeat by
toggling the panel — each toggle strands one more.

**Falsifier.** Show a hook that aborts on dispose (absent), or show the request is cheap enough not to matter —
refuted by D-L5's payload arithmetic and by the fact that `simplify` shares the same bounded job pool as the
epicycle compute (`api/services/computation.py`, `submit_compute_job`).

**Note the asymmetry with D-L2:** these are two distinct fixes. `onScopeDispose(() => abortInflight(["eq-simplify"]))`
cures D-L3 and does nothing for D-L2's armed timer; clearing the timer cures D-L2 and does nothing for a request
already on the wire. Both are required.

---

### D-L4 · **MAJOR** · the badge asserts a green **100.0 %** energy capture over an empty equation, on every single open

**Provenance** `EquationPanel.vue:21` `const energy = ref(1);` → `:38` `energyColor(energy.value)` →
`lib/equation/notation.ts:44-47` `if (e >= 0.99) return "hsl(142, 71%, 45%)"` (green) → template `:80-85`:

```html
<MetricBadge :value="(energy * 100).toFixed(1)" unit="%" size="sm" :color="eColor" />
```

**The defect.** `energy` is seeded with a *value*, not with "unknown". `MetricBadge`'s own contract has the slot
for unknown — `MetricBadgeProps.placeholder`, *"Substitute glyph when value is empty (null / undefined / "")"*
(`glass-ui/dist/components/custom/metric-badge/MetricBadge.vue.d.ts`) — and this file neither uses it nor types
`energy` as nullable. The badge is rendered **outside** the loading branch (`:80` vs the `v-if="loading"` block
at `:107`), so nothing gates it.

**Failure scenario.** Every open: the parent mounts via `v-if` (`VisualizationView.vue:231`), `watchDebounced`
waits its full 300 ms *before the first call* (`immediate: true` still routes through the filter —
`@vueuse/shared/dist/index.js:1845`, the immediate invocation is passed to `debounceFilter`, which arms a timer
at `:349`), then the RTT. For ≥ 300 ms + RTT the panel reads **"100.0 %" in success-green next to an empty
equation area** (`latex === ""` → `renderedHtml === ""` at `:26` → an empty `v-html` div at `:111`). In a
numerical-analysis instrument this is a false quantitative claim, and because the parent uses `v-if` rather than
`v-show` it is re-manufactured on every toggle rather than once per session.

**Falsifier.** Kill it by showing the badge is gated on `loading` (it is not — `:80` sits in the header row,
`:107` is the body), or by showing 1.0 is a legitimate prior. It is not: the first response routinely returns
< 1 (`simplify_series` returns `kept_energy / total_energy` for a budget of 6 over ~401 terms —
`src/fourier_analysis/symbolic/simplification.py:56-63`), so the initial paint is not merely *unknown*, it is
reliably **wrong** and biased optimistic. A weaker rebuttal — "it's only 300 ms" — is answered by the repeat
count, and by the fact that `energy` is *also* never reset between fetches, so an in-flight budget change shows
the previous budget's number as if current.

---

### D-L5 · **MAJOR** · the entire coefficient array is re-uploaded on every debounce tick to change one integer

**Provenance** `EquationPanel.vue:45-49` → `lib/equation/api.ts:38-54` (maps **all** `components` into
`FourierTermDTO[]`) → POST `/api/equations/simplify`.

**Cardinality, derived (not estimated).** `components.length = 2·n_harmonics + 1`:
`src/fourier_analysis/epicycles.py:82` appends the DC term, `:85-87` loops `for n in range(1, n_harmonics + 1)`
adding the ± pair. `n_harmonics` defaults to **200** (`web/src/lib/defaults.ts:7`) and the user may raise it to
**500** (`BasisSelector.vue:30` `Math.min(500, …)`, `:162` `max="500"`, `:172` `:max="500"`).

⇒ **401 rows by default, 1001 rows at maximum.** Each row is
`{n, coefficient_re, coefficient_im, amplitude, phase}` (`lib/equation/types.ts:4-10`) with `JSON.stringify`
float64 output, i.e. ~130-160 B ⇒ **≈ 55-65 kB per tick by default, ≈ 140-160 kB at max**.

**The defect.** The coefficients are *invariant* across the ticks that actually change: only `budget` (an int)
and `notation` (a 3-member enum) vary. The endpoint is stateless-by-value where its sibling endpoints are
identity-addressed — compare `POST /api/contours/{contour_hash}/compute/epicycles` (`lib/api.ts:330-343`), which
sends `{n_harmonics, n_points}` against a server-held hash. The panel therefore uploads O(N) bytes to move an
O(1) parameter, at up to ~3 ticks/second of slider settling.

**Failure scenario.** User at `n_harmonics = 500` drags Terms 2→20. Each 300 ms settle uploads ~150 kB; a
10-stop drag ships **~1.5 MB** upstream to compute a truncation the server could do from data it already
possesses. On mobile upstream this is the dominant latency term, and it lands on the same connection as the
epicycle/contour computes.

**Falsifier.** Kill it by showing the server needs the array each time — it does need *all* coefficients to rank
by amplitude (`truncate_by_budget`, `simplification.py:15-31`), but that argues for server-side residency keyed
by `contour_hash`, not for re-upload; the coefficients are already server-derived
(`api/services/computation.py:108-118`) and already persisted client-side in the draft
(`stores/workspace.ts:_saveDraftNow`, `epicycleData` in the `structuredClone`). Or kill it by showing the array
is small — refuted by the 2N+1 derivation above. **The cure belongs at the seam, not only in the SFC** — which
is exactly the kind of client↔operation coupling `intakes/lane-fourier-r3-r6.md` **R6-8** (CARRY→F.W5) warns the
shared-provenance contract must model explicitly.

---

### D-L6 · **MAJOR** · no same-input dedup — and the sibling consumer of the same client function has one

**Provenance** `EquationPanel.vue:61-65`:

```ts
watchDebounced(
    () => [store.epicycleData, budget.value, notation.value] as const,
    () => fetchSimplified(),
    { debounce: 300, immediate: true },
);
```

versus the *only other* caller of `simplifyCoefficients`, `EquationView.vue:130-140`:

```ts
async function doSimplify() {
    if (!components.value.length) return;
    const key = displayKey();
    if (key === lastDisplayKey) return;        // ← the guard EquationPanel does not have
    …
    lastDisplayKey = key;
}
```

**The defect.** Any identity change of `store.epicycleData` re-fires the fetch even when `(coefficients, budget,
notation)` is byte-identical to the last one answered. `epicycleData` is a `shallowRef`
(`stores/workspace.ts:43`), so *every* reassignment — a recompute that lands the same numbers, a draft restore,
a workspace reload — mints a new identity. The panel then re-uploads D-L5's 55-160 kB for a response it already
holds. The tree even ships a result memo (`components/equation/composables/useEquationCache.ts`, 49 LOC,
sessionStorage-backed) which this component does not import.

**Failure scenario.** `loadWorkspace(slug)` re-fetches and re-assigns `epicycleData` while the panel is open →
one full-payload POST whose response is bit-identical to what is already on screen.

**Falsifier.** Show the dedup lives downstream — it does not: `coreFetch` has no cache
(`lib/api.ts:115-203`), and the browser will not cache a POST. Show the re-fire cannot happen — refuted by
`stores/workspace.ts` assigning `epicycleData.value` on upload, load, and compute paths.

---

### D-L7 · **MAJOR** · duplication: the KaTeX render block is a near-verbatim clone, and `lib/equation/` is already its home

**Provenance** `EquationPanel.vue:25-36` versus `EquationResult.vue:17-28`:

| | EquationPanel `:25-36` | EquationResult `:17-28` |
|---|---|---|
| guard | `if (!latex.value) return "";` | `if (!props.latex) return "";` |
| call | `katex.renderToString(latex.value, { displayMode: true, throwOnError: false, trust: true })` | `katex.renderToString(props.latex, { displayMode: true, throwOnError: false, trust: true })` |
| fallback | `` `<span class="text-red-400">${latex.value}</span>` `` | `` `<code>${props.latex}</code>` `` |

Identical but for the source expression and the fallback markup. A third site repeats the same option triple
(`composables/useCoeffHover.ts:99-102`, `displayMode: true, throwOnError: false, trust: true`) and a fourth
varies one flag (`ConvergencePlot.vue:256`, `throwOnError: false, displayMode: false`). **4 KaTeX render sites,
3 with the identical options object, 0 shared helper.**

**Why it is a LIBRARY defect and not taste.** The colocation target already exists and is already used by this
very file: `lib/equation/notation.ts` holds `energyColor` (imported at `:6`), and `lib/equation/` is the
module the component draws its API, types, and presentation helpers from. A `renderLatex(latex, {display})`
export there would (a) collapse 4 sites to 1, (b) make D-L8/D-L9 single-site decisions instead of a 4-way
audit, and (c) give the `trust`/`throwOnError` policy exactly one owner. The absence is a colocation failure
against a boundary the file otherwise respects (see S-L5).

**Falsifier.** Kill it by showing the sites diverge materially — the table above shows they do not (the only
divergence is the fallback string, itself dead code per D-L8). Or by showing `lib/equation/` is not the home —
refuted by `:6`, which already imports a presentation helper from it.

---

### D-L8 · **MINOR** · the `catch` fallback is effectively unreachable dead code — and is an unescaped `v-html` sink

**Provenance** `EquationPanel.vue:30` `throwOnError: false` × `:33-35`:

```ts
} catch {
    return `<span class="text-red-400">${latex.value}</span>`;
}
```

…consumed at `:111` `<div v-else v-html="renderedHtml" class="eq-katex" />`.

**Two defects in one block.** (a) Under `throwOnError: false` KaTeX catches its own `ParseError` and renders the
error inline instead of throwing; with `latex.value` guarded non-empty at `:26`, the only paths that reach this
`catch` are non-`ParseError` internal faults. The branch is **effectively unreachable** — dead code that reads
as a safety net and is not one. (b) The branch it does contain interpolates `latex.value` **raw** into an HTML
string that is then injected with `v-html`, i.e. an unescaped sink. In today's tree `latex` is machine-generated
from float coefficients (`simplification.py` → `latex_rendering.render_latex`), so no exploit is demonstrable
and I do **not** claim one.

**Falsifier.** Kill (a) by exhibiting a reachable non-`ParseError` throw for a non-empty string input — I could
not construct one against `katex@^0.17.0` (`web/package.json:20`) statically. Kill (b) by showing the value can
never carry markup — that is true *of the current server*, which is precisely why this is MINOR and not MAJOR;
it is a latent sink whose safety is an accident of the producer, not a property of the consumer.

---

### D-L9 · **MINOR** · `trust: true` grants KaTeX's URL-command capability for zero benefit, at 3 sites

**Provenance** `EquationPanel.vue:31` (`trust: true`), replicated at `EquationResult.vue:23` and
`useCoeffHover.ts:101`.

**The defect.** `trust` is KaTeX's opt-in for the commands that emit URLs and raw classes — `\href`, `\url`,
`\includegraphics`, `\htmlClass`. The latex this component renders is produced by `simplify_numerical_coefficients`
from a `list[FourierTermDTO]` of floats (`api/routers/equations.py:137-155`); it contains no URL command and
cannot. The flag therefore purchases nothing and widens the sink at `:111` by exactly the class of commands one
would not want in a `v-html` target. Least-privilege violation, copied three times (a direct consequence of
D-L7's missing helper).

**Falsifier.** Kill it by finding a `\href`/`\url`/`\includegraphics` emission in the renderer —
`grep -rn "href\|url\|includegraphics" src/fourier_analysis/symbolic/latex_rendering.py` is the check, and the
render path is amplitude/phase/coefficient formatting only. If a future renderer *does* emit links, the flag
becomes load-bearing and this row converts to "document the reason at the call site".

---

### D-L10 · **MINOR** · wrong type at the client seam: `notation` widened to `string`, re-narrowed by an unchecked cast

**Provenance** `lib/equation/api.ts:33-50`:

```ts
export async function simplifyCoefficients(
    components: BasisComponent[],
    budget: number,
    notation: string,                                          // ← :36, widened
): Promise<SimplifyResponse> {
    …
    notation: notation as SimplifyRequest["notation"],         // ← :49, unchecked re-narrow
```

**The defect.** `SimplifyRequest.notation` is `NotationMode = "trig" | "exponential" | "polar"`
(`types.ts:1, 39`). **Both** callers already hold a `NotationMode` — `EquationPanel.vue:18`
`ref<NotationMode>("trig")` and `EquationView.vue:137`. The parameter is widened for no caller, and the widening
is then papered over with `as`, so `simplifyCoefficients(c, 6, "polr")` type-checks. The typo surfaces only as a
runtime 422 from the server's regex validator (`api/models/equations.py:41`,
`pattern=r"^(trig|exponential|polar)$"`) — rendered to the user as a raw error string via `:54`.

**The sharpening.** The module's own header claims this class of hole was closed: `api.ts:4-11`, *"the local
`eqFetch` + the 2 `as unknown as` casts retire … The cast retires structurally"*. The `as unknown as` pair did
retire; **this `as` survived the same wave**, in the same 57-line file, four lines below the narrower sibling
`computeEquation` which types its notation correctly through `ComputeEquationRequest` (`types.ts:18`).

**Falsifier.** Kill it by exhibiting a caller that passes a non-`NotationMode` string — `grep -rn
"simplifyCoefficients" web/src` returns exactly two call sites, both typed `NotationMode`. Narrowing the
parameter to `NotationMode` deletes the cast and breaks nothing.

---

### D-L11 · **MINOR** · the watch source allocates a fresh tuple per evaluation; change-detection is accidental

**Provenance** `EquationPanel.vue:62` `() => [store.epicycleData, budget.value, notation.value] as const`.

**The defect.** Vue compares a getter's result with `hasChanged` (`Object.is`) unless `deep` is set. A fresh
array literal is never `Object.is`-equal to its predecessor, so the comparison is a constant `true` and the
callback runs on *every* invalidation of any tracked dep, whatever the values. Today the observable behaviour is
correct — the three reads are the only deps and none can invalidate without changing — so this is a fragility,
not a live miscompare. It becomes a live defect the moment a fourth expression is added whose dep invalidates
without a value change, and it silently forfeits the per-source `(new, old)` diff that the array-of-sources form
(`[() => store.epicycleData, budget, notation]`) would give. The same anti-pattern appears at
`EquationView.vue:161-162`, so it is a house habit rather than a one-off.

**Falsifier.** Kill it by showing Vue deep-traverses a getter's array return without `deep: true` — it does not;
`traverse` is gated on the deep flag. Or by showing the behaviour differs today — I claim it does **not**, which
is why this is MINOR.

---

### D-L12 · **MINOR** · `term_count` is discarded, so the slider can lie about how many terms rendered

**Provenance** `SimplifyResponse` carries three fields (`types.ts:42-46`: `latex`, `energy_captured`,
`term_count`); `EquationPanel.vue:50-51` consumes two and drops `term_count`.

**The defect.** The server clamps: `truncate_by_budget(terms, budget)` returns `terms` unchanged when
`len(terms) <= budget` (`simplification.py:15-17`). The slider is labelled `"Terms"` and ranges 2-20
(`EquationPanel.vue:98-102`) with no relation to the number actually rendered. A contour whose chain yields 9
significant terms shows `Terms 20` in the numeric input (`SliderControl.vue:71-79`) while nine render, and every
budget from 9 to 20 produces a byte-identical equation and a byte-identical 100 % energy — three quarters of the
slider's travel is a no-op with no signal. The datum needed to say so is in the response and is thrown away.

**Falsifier.** Kill it by showing `term_count` is surfaced elsewhere for this panel — `grep -rn "term_count"
web/src` → `lib/equation/types.ts:45` only, i.e. declared and never read anywhere in the frontend.

---

### D-L13 · **MINOR** · the early-return guard silently preserves stale state; there is no empty state

**Provenance** `EquationPanel.vue:41` `if (!store.epicycleData?.components.length) return;`

**The defect.** The guard's else-path leaves `latex`, `energy`, `loading`, and `error` exactly as they were, so
the panel would keep displaying the previous contour's equation and energy against new, empty data. There is no
"no data" branch at all: the template's three branches are loading / error / html (`:107-111`), and the html
branch renders `""` as an empty box.

**Falsifier — and it partly bites.** `components.length === 0` is unreachable from the live API:
`EpicycleChain.from_signal` unconditionally appends the DC component (`epicycles.py:81-82`) before the harmonic
loop, so the server always returns ≥ 1. Reaching it requires a hand-edited draft (`stores/workspace.ts`
`_saveDraftNow` persists `epicycleData` verbatim through `structuredClone`, and `loadDraft` restores it
unvalidated) or a future producer change. **This row is therefore booked as latent, not live** — MINOR, and I
record the falsifier as *succeeding against the strong form of the claim*. What survives is the weak form: a
guard whose failure mode is "keep asserting the old answer" rather than "say nothing", with no empty state to
fall back on.

---

### D-L14 · **MINOR** · the Esc handler is dead on the path that matters

**Provenance** `EquationPanel.vue:69-72`:

```html
<div class="eq-panel glass-wash" tabindex="-1" @keydown.esc="emit('close')">
```

**The defect.** `tabindex="-1"` makes the element programmatically focusable and **not** keyboard-reachable, and
nothing focuses it: there is no `autofocus`, no `useTemplateRef` + `.focus()`, no `onMounted` hook (the whole
`<script setup>` is 65 lines), and the parent holds no ref to it (`VisualizationView.vue:231` renders it with a
single `@close` binding and no `ref`). The panel is opened from the controls dock
(`VisualizationView.vue:222` `@toggle-equation`), so focus remains on the dock button, outside the panel — and
`keydown` does not bubble *down*. Esc therefore does nothing until the user first clicks inside the panel
(landing focus on the glass `<Button>` or the slider input), after which it works.

**Falsifier.** Kill it by finding a focus call — none exists in the subject, the parent, or `Transition`
(`VisualizationView.vue:230`, `name="fade"`, no `@after-enter`). Or by arguing Esc is not promised — but the
handler *is* the promise, and it is the only keyboard affordance the component offers.

---

### D-L15 · **MINOR** · component-owned control state is destroyed by the parent's `v-if` on every toggle

**Provenance** `EquationPanel.vue:18-19` (`notation`, `budget` owned locally) ×
`VisualizationView.vue:231` `v-if="showEquation && store.epicycleData && !isEditing"`.

**The defect.** Three independent conditions unmount the component, and `v-if` destroys rather than hides. A
user who sets Polar / 14 terms, toggles into the contour editor, and toggles back gets **trig / 6** and a fresh
network round-trip (`immediate: true`, `:64`). The tree demonstrates it knows this problem — `useEquationCache.ts`
exists precisely to persist `{budget, notation, …}` across the `/equation` route's remounts — and this panel
uses neither that composable, nor `v-show`, nor lifted state.

**Falsifier.** Kill it by showing the state is restored — `grep` for `loadCachedInputState` in
`components/visualization/` returns nothing; the composable is imported only by `EquationView.vue`.

---

### D-L16 · **MINOR** · the scoped `box-shadow` silently overrides the glass ladder's rim

**Provenance** `EquationPanel.vue:118-126`:

```css
.eq-panel {
    @apply absolute flex flex-col gap-2 p-2.5 rounded-xl;
    …
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);     /* :123 */
}
```

versus the material contract, `glass-ui/dist/styles/glass/ladder.css:36-42`:

```css
.glass-wash {
    background: color-mix(…);
    backdrop-filter: var(--glass-blur-wash);
    border: 1px solid var(--glass-border-wash);
    box-shadow: var(--glass-material-rim), var(--glass-shadow-wash);   /* :41 */
}
```

**The defect.** The element carries both classes (`:70` `class="eq-panel glass-wash"`). Scoped SFC styles are
**unlayered**, and unlayered rules beat any `@layer` regardless of specificity — so `:123` replaces the ladder's
pair wholesale and the rim (`--glass-material-rim`, `tokens/shadow.css:82`, a 0.5 px hairline ring) is dropped,
not composed. The panel is the outlier among the four `.glass-wash` consumers in the tree: `EquationModeToggle.vue`
(`.eq-toggle`) and `ConvergenceLegend.vue` (`.legend-overlay`) set no `box-shadow` on the glass element at all
(`ConvergenceLegend.vue:79` is a `.legend-dot--golden` glow, a different element), and `PaperView.vue`'s
`.overlay-btn` is a hand-rolled non-`glass-wash` surface.

**Falsifier.** Kill it by showing scoped styles land inside a layer (Vue SFC scoped CSS is emitted unlayered) or
by showing the rim is re-applied elsewhere (`grep -n "glass-material-rim" web/src` → no hits). Booked MINOR and
flagged as a **cross-axis hand-off to D** — it is a design-token contract violation surfaced by a library read.

---

### D-L17 · **MINOR** · zero automated coverage, and no unit-test runner exists to add any

**Provenance** `web/package.json:6-12` — the entire script block is `dev`, `build`, `preview`, `test:e2e`,
`test:e2e:ui`. There is **no vitest/jest config** in `web/` (`ls web/` → no `vitest.config.*`), so the SFC has
no unit-test surface at all. On the e2e side, `web/e2e/` holds 8 specs and the only equation-adjacent reference
is `visual-baseline.spec.ts:34` `{ slug: "equation", path: "/equation" }` — which snapshots the `/equation`
**route** (`EquationView.vue`), a different component in a different subtree. `grep -rn "EquationPanel\|eq-panel"
web/e2e` → **0 hits**.

**Why it is a LIBRARY row.** Six of the seven MAJORs above (D-L1, D-L2, D-L3, D-L4, D-L6, D-L12) are precisely
the class a component test catches in seconds — overlapping-request flag state, post-unmount invocation,
first-paint values, dedup, dropped response fields. The absence of a runner is the reason they are all still
here at HEAD.

**Falsifier.** Kill it by exhibiting any test that mounts this component. None exists in either repo half.

---

### D-L18 · **INFO** · the glass-uplift break surface lands on two of this file's imports

**Provenance** `EquationPanel.vue:10` `import { X } from "lucide-vue-next";` and `:12`
`import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";` × `lane-frontend.md:213` (*"7
@mkbabb/glass-ui/metric-badge ← REMOVED at 7.0.0"*) and the `lucide-vue-next → @lucide/vue` ×35 row.

**Live re-derivation (corpus confirmed, not re-invented).** `grep -rn "@mkbabb/glass-ui/metric-badge" web/src` →
exactly **7** files; EquationPanel is one (`EditorControlsDock`, `GalleryAdminBanner`, **`EquationPanel`**,
`AnimationControls`, `GalleryDraftsSection`, `InfoCard`, `EquationView`). `grep -rl "lucide-vue-next" web/src`
→ exactly **35**. Both census figures reproduce.

Booked INFO because it is a scheduled migration, not a defect — recorded so F.W3's uplift budget can count this
file explicitly rather than by silence. Note the interaction with D-L4: the `MetricBadgeProps.placeholder` field
that cures D-L4 is part of the surface being migrated, so the two should be done in one touch.

---

### D-L19 · **INFO** · the two consumers of `simplifyCoefficients` have opposite error postures

**Provenance** `EquationPanel.vue:52-55` surfaces the message:

```ts
} catch (e) { if (!isAbortError(e)) { error.value = e instanceof Error ? e.message : "Failed"; } }
```

versus `EquationView.vue:142-143`, which swallows it:

```ts
} catch (e) { if (!isAbortError(e)) { /* silent */ } }
```

One client function, two callers, opposite contracts — and the surfaced string is the raw `ApiProblem`/`Error`
message (`lib/api-problem.ts`), i.e. server prose rendered directly into the panel at `:110`. Booked INFO
because the panel's choice is the *better* of the two; the defect is that the seam has no posture, so which
behaviour a user gets depends on which surface they opened.

**Falsifier.** Kill it by finding a documented posture — `lib/equation/api.ts`'s header (`:1-12`) specifies the
fetch core and says nothing about who reports.

---

## §2 · Superlatives (L-18 both ways — each carries its falsifier)

**S-L1 · The abort posture at the call site is correct and complete.** `isAbortError` is imported (`:5`) and
checked before any error is written (`:53`), so a superseded request never paints a failure. This is not
universal in the tree: `stores/workspace.ts` needs the same discipline and has it (`:127`), but the *pattern* is
easy to miss and this file does not. **Falsifier:** it would be hollow if aborts could not occur — they demonstrably
can (`lib/api.ts:55`, shared key `"eq-simplify"`), which is exactly what makes D-L1 real; the file gets the error
half right and the flag half wrong.

**S-L2 · The display state machine is genuinely exclusive.** `:107-111` is `v-if="loading"` /
`v-else-if="error"` / `v-else`, over three independent refs. There is no path that paints a spinner and an
equation, or an error and an equation, simultaneously — a failure mode present in plenty of hand-rolled panels.
**Falsifier:** it would be undermined if a fourth state existed unmodelled; one does (no-data, D-L13), but that
state is unreachable today, so the exclusivity claim stands for every reachable state.

**S-L3 · The module size is in the Goldilocks band, on the right side of it.** 134 lines total; 65 of script;
four named collaborators (`SliderControl`, `NotationPills`, `Button`, `MetricBadge`) and **zero** inline canvas,
DOM, or geometry code. Contrast the same subsystem's `EquationView.vue` **469** and `ConvergencePlot.vue` **410**
(`lane-frontend.md:130-131`). **Falsifier — and it lands partially:** smallness is cheap if it is bought by
duplication, and D-L7 shows some of it was (the KaTeX block was copied rather than shared). So the superlative
is *qualified*: the size is right and one of its inputs was wrong.

**S-L4 · Clean substrate posture: zero direct reka-ui, zero shadcn copy.** Both UI primitives come from
glass-ui subpaths (`:11-12`), the third goes through the tree's documented thin adapter
(`SliderControl.vue`, whose header records the P.W5/A.W3.b migration and the CR-2 dock-key retirement at
`:2-21`). This is the file-level instance of the census's *"deepest, cleanest consumer in the constellation …
0 direct reka-ui; 0 shadcn copies"* (`CENSUS-2026-08-03.md:82-84`). **Falsifier:** it would be void if a
primitive were inlined — none is; the only bespoke DOM in the file is the 1-line spinner div at `:108`.

**S-L5 · The `lib/equation/` boundary is respected — for everything except KaTeX.** `energyColor` is imported
(`:6`) rather than inlined; `NotationMode` comes in as a type (`:7`); the API client is not hand-rolled (`:5`).
Three of four presentation/transport concerns are correctly colocated. **Falsifier:** the fourth (KaTeX) is not,
which is D-L7 — the superlative is what makes that row a *deviation from this file's own standard* rather than
an absent convention.

---

## §3 · R5-7 — the native-template-loop invisibility class, applied and extended

**The class, adopted not re-derived.** `intakes/lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT, CARRY→F.W4):
*"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — proven there
by `leafValues["instance.loop.paper-sidebar"] === []` while the sibling `instance.loop.presets` is populated and
keyed `"callsiteId": "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`.
**R6-5/R6-6** cure it with the `NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`, gate GREEN 11/11).

### 3a — Direct application: **the class does not bite this file**

`EquationPanel.vue` contains **zero** `v-for`. Its rendered subtree contains exactly one template loop, in the
child `NotationPills.vue:17-18` (`<Button v-for="opt in NOTATION_OPTIONS" :key="opt.value">`) — and that is a
loop over a **component** callsite, therefore already visible to the pre-cure R5-era callsite-keyed deriver.
Recorded explicitly, per the discipline `ContourPreview/challenge-C-consumption.md:278` established, so F.W4's
denominator can mark this component **not-applicable by measurement** rather than by silence.

### 3b — The third class (adopted from a sibling challenge) **does** bite

`ConvergenceTimeline/challenge-L-library.md:287` names a third, orthogonal blindness class:
**producer-internal loops behind a component boundary** — the glass `Slider` renders its thumbs via
`renderList(t.modelValue, …)` inside a `node_modules` SFC, invisible to *both* the R5 component-keyed model and
R6's `NATIVE_TEMPLATE_LOOP` model, because both scan the **consumer** tree. This file mounts that same `Slider`
through `SliderControl.vue:81-90`, so it is a second member of that class. Harmless in magnitude here (the model
is `computed<number[]>(() => [props.modelValue])`, `SliderControl.vue:53-56` — exactly one element, so exactly
one thumb, always). Recorded for the denominator, not as a defect.

### 3c — **A fourth class this component contributes: runtime-injected `v-html` subtrees**

Neither model reaches the largest DOM surface this component produces.

**The mechanism.** `:111` `<div v-else v-html="renderedHtml" class="eq-katex" />`. `renderedHtml` is a *string*
built at runtime by `katex.renderToString` (`:28`). The subtree it becomes exists in **no template**, in
**no** SFC, in **neither** repo half — it is `innerHTML`-parsed from a library's output. A consumer-side
deriver keyed on component callsites (R5) sees one `<div>`; a deriver keyed on native template loops (R6's
`NATIVE_TEMPLATE_LOOP`, the cure) *also* sees one `<div>`, because there is no loop to find — there is no
markup at all. This is strictly outside both models, and outside the third class too, because it is not behind
a component boundary; it is behind a **string** boundary.

**The cardinality is not small.** KaTeX's HTML output is per-atom: every symbol, operator, superscript,
fraction rule, and spacing unit becomes its own `<span>` with `mord`/`mbin`/`mrel`/`vlist` classes, plus a
parallel MathML tree under `<span class="katex-mathml">`. A 20-term trigonometric partial sum — the slider's
maximum, `:100` `:max="20"` — is on the order of 20 × (coefficient digits + `\cos`/`\sin` + index + operator),
i.e. several hundred atoms, each an element, doubled by the MathML arm. **The exact node count is
UNPROVEN-NEEDS-LIVE** (SS-13: mount `/w/:slug`, open the panel at budget 20, read
`document.querySelector('.eq-katex').getElementsByTagName('*').length`). What is statically provable, and is
the point, is that the count is **unbounded by anything in the template and invisible to every derivation model
in the corpus**, while the model-visible count for this file is `1`.

**Why it matters to F.W4 specifically.** The corpus has already established (`ConvergenceLegend/challenge-L-library.md:170`)
that *the invisible cardinality is the input to severity*. Here the invisible subtree is not decorative: it is
`v-html`-replaced wholesale on **every** response (D-L6 shows responses fire more often than inputs change), it
lives inside a `max-h-32` scroll box (`:107`), and it sits on the animating overlay analysed in §4. A per-component
D/L/C denominator that books EquationPanel as "1 div" will rank it trivial when it is one of the heaviest
churn surfaces in the visualization route.

**Cardinality of the fourth class, measured.** `grep -rn "v-html" web/src` → **10 sites** across 6 files:
`PaperView.vue:373`, `PaperSearchModal.vue:100`, `PaperSidebar.vue:80,100,116`, `PaperSearchDropdown.vue:58`,
**`EquationPanel.vue:111`**, `EquationResult.vue:37`, `ConvergencePlot.vue:353`, `EquationView.vue:264`. Four of
the ten are KaTeX (the heavy ones); the `PaperSidebar` three are *inside* the very `<li v-for>` loops R5-7 is
named for, so that file is a member of two classes at once. **This is not a one-off**: like R5-7 itself, the
class has multiple independent members in different subtrees.

**Falsifier for the whole of §3c.** Kill it by showing a derivation model in the corpus that inspects
`v-html`-bound expressions and estimates their output — R6's cure is `NATIVE_TEMPLATE_LOOP`, a *template*
family (`intakes/lane-fourier-r3-r6.md:139`, expressions `(section, si) in sections` etc.), and no leaf in
either registry keys on `v-html`. Or kill it by showing the injected subtrees are trivially small — refuted for
the KaTeX four by the per-atom span structure; conceded for `highlightFuzzy`/`renderTitle`, which are small,
which is why the class is stated over the four heavy members and not all ten.

---

## §4 · The viz render path where this component touches it

**The census row, adopted verbatim** (`CENSUS-2026-08-03.md:85-87`, [FE §6]): *"Canvas2D throughout, **WebGL/WebGPU
ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot
with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces."* This component owns **no** canvas and
issues **no** rAF — a real virtue for a 134-line overlay. It touches the render path in exactly two ways:

**4a — It is a `backdrop-filter` surface pinned over canvas #1.** `:70` `class="eq-panel glass-wash"` +
`:118-124` `position: absolute; top: 3.5rem; left: 0.5rem; z-index: var(--z-controls)` (= `20`,
`glass-ui/dist/styles/tokens/scheme-motion.css:336`), rendered inside the `#stage` slot directly over
`<BasisCanvas>` (`VisualizationView.vue:196-232`). `.glass-wash` carries
`backdrop-filter: var(--glass-blur-wash)` (`glass-ui/dist/styles/glass/ladder.css:39`). A backdrop-filtered
element must re-sample and re-blur whatever repaints beneath it — and beneath it is the epicycle instrument
redrawing off the store rAF clock (`BasisCanvas.vue:416,425-426`, which itself documents *"Off-screen rAF gating
(I.γ) — Park the shared animation clock when this canvas is scrolled out of the viewport"*, i.e. the clock is
free-running while visible). **The coupling is static-provable; the per-frame cost is UNPROVEN-NEEDS-LIVE**
(SS-13: trace with the panel open vs closed while the animation runs, and read the compositor/filter track).
Recorded because the corpus's frame-budget work must know that opening this panel converts a plain canvas
composite into a filtered one for as long as it is open.

**4b — It puts a synchronous KaTeX parse plus an `innerHTML` re-parse on the animation thread.**
`renderedHtml` is a `computed` (`:25`), so `katex.renderToString` runs **synchronously inside Vue's render
tick**, and its result is assigned through `v-html`, which discards and re-parses the whole subtree (§3c) rather
than patching it. Both land on the same main thread as the rAF redraw. Frequency is set by D-L6: the panel
re-renders on every response, and responses fire more often than the inputs change. **Magnitude
UNPROVEN-NEEDS-LIVE**; the structure is not in doubt.

**What this component does *not* do — stated so the row cannot be over-read.** It registers no rAF, no
`ResizeObserver`, no `IntersectionObserver`, no window listener, and no canvas context. Its only lifecycle
resource is the debounce timer, which is the subject of D-L2. Given the corpus's PRM-RAF history
(`Constellation grand-audit`: *"the PRM-RAF epidemic (~40 ungated loops)"*), the absence is worth booking as a
positive.

---

## §5 · Tally and defence

### 5a — Rows

| id | sev | class | one-line |
|---|---|---|---|
| D-L1 | MAJOR | correctness / race | aborted predecessor's `finally` clears the successor's `loading` (`:56-58` × `api.ts:55`) |
| D-L2 | MAJOR | teardown | vueuse `debounceFilter` has no scope-dispose; the armed timer fires `fetchSimplified()` post-unmount |
| D-L3 | MAJOR | teardown | in-flight `eq-simplify` never aborted on unmount, though `abortInflight` is the house idiom |
| D-L4 | MAJOR | correctness | `energy = ref(1)` paints a green **100.0 %** over an empty equation, on every open |
| D-L5 | MAJOR | efficiency / seam | 401-1001 coefficient rows (~55-160 kB) re-POSTed per tick to move one int |
| D-L6 | MAJOR | correctness / dup | no same-input dedup; the sibling caller (`EquationView:132-133`) has one |
| D-L7 | MAJOR | duplication | KaTeX block cloned from `EquationResult:17-28`; 4 sites, 0 helper, `lib/equation/` is the home |
| D-L8 | MINOR | dead code / sink | `catch` unreachable under `throwOnError:false`, and interpolates raw into `v-html` |
| D-L9 | MINOR | error posture | `trust: true` buys nothing over machine-generated latex; replicated ×3 |
| D-L10 | MINOR | wrong type | `notation: string` + `as` cast (`api.ts:36,49`) though both callers hold `NotationMode` |
| D-L11 | MINOR | fragility | `as const` tuple getter ⇒ `hasChanged` always true; semantics accidental |
| D-L12 | MINOR | dropped contract | `term_count` discarded; the slider can claim 20 terms while 9 render |
| D-L13 | MINOR | stale state | guard's early return preserves the previous answer; no empty state (latent — see falsifier) |
| D-L14 | MINOR | dead handler | `@keydown.esc` on an unfocused `tabindex="-1"` container |
| D-L15 | MINOR | state loss | `v-if` remount resets `notation`/`budget` and re-fires the request |
| D-L16 | MINOR | token contract | scoped `box-shadow` (unlayered) overrides the ladder rim; outlier of 4 `glass-wash` consumers |
| D-L17 | MINOR | coverage | no unit runner in `web/` at all; 0 e2e references to the overlay |
| D-L18 | INFO | uplift surface | `metric-badge` (removed at 7.0.0, 1 of 7) + `lucide-vue-next` (1 of 35) |
| D-L19 | INFO | error posture | the two callers of one client function have opposite postures |

**defects = 19 · blockers = 0 · superlatives = 5**

### 5b — Why zero BLOCKERs, defended

I looked for one and did not find one, and I record the search so the count is falsifiable rather than
charitable. No row produces an unhandled exception (the one `catch`-less path, `energyColor`, is total over
ℝ — `notation.ts:44-47`); none corrupts or loses persisted data (the panel is read-only with respect to the
store and never writes a draft); none is a demonstrable security exploit (D-L8/D-L9 are latent sinks over a
provably numeric producer, and I decline to inflate them); none breaks the build (D-L18's removals are scheduled,
not applied — `web/package.json:14` pins `@mkbabb/glass-ui: ^4.0.0`, and the removal lands at 7.0.0). The
closest candidates are D-L2 (post-unmount execution — real, but its blast radius is a wasted request and writes
to garbage) and D-L4 (a false quantitative claim — repeated, but self-correcting within one RTT). **The honest
verdict is a component with seven genuine MAJORs and no blocker**, and the reason all seven survive at HEAD is
D-L17: there is no unit-test runner in this repo half at all.

### 5c — Corpus rows extended by this challenge

| corpus row | extension |
|---|---|
| **R5-7** (`intakes/lane-fourier-r3-r6.md:125`) | **Explicitly not-applicable here** (zero `v-for`), recorded by measurement — plus **a fourth blindness class** (§3c, runtime-injected `v-html` subtrees, 10 sites / 4 heavy) that neither R5's model nor R6's `NATIVE_TEMPLATE_LOOP` cure reaches. |
| `ConvergenceTimeline/challenge-L-library.md:287` (third class) | **Second member found** — glass `Slider` via `SliderControl.vue:81-90`; magnitude 1 thumb, recorded for the denominator. |
| `CENSUS-2026-08-03.md:85-87` [FE §6] | **Consumer-side extension** — an overlay that adds `backdrop-filter` + a synchronous KaTeX/`innerHTML` re-parse on top of canvas #1's free-running rAF clock (§4). |
| `lane-frontend.md:213` (uplift break surface) | **Per-file localisation** — EquationPanel is 1 of the 7 `metric-badge` consumers and 1 of the 35 lucide consumers; D-L4's cure (`MetricBadgeProps.placeholder`) is inside the migrating surface, so schedule them together. |
| `intakes/lane-fourier-r3-r6.md` **R6-8** (CARRY→F.W5) | **A second instance of the client↔operation coupling** — D-L5's O(N)-payload-for-O(1)-parameter shape is a client-side symptom of an operation modelled by value instead of by identity, unlike its sibling `/compute/epicycles`. |
