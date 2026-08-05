claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationPanel.vue` · axis **C · CONSUMPTION**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EquationPanel.vue` — 134 lines,
`wc -l` exact. Roster row: `formation/fourier/lane-frontend.md:92` ("KaTeX-rendered partial-sum equation overlay").

**Substrate.** fourier HEAD `cd26c65` / tree `9a66411d` — the coordinate the intake lane proved byte-identical to the
tree F.W0 opens on (`intakes/lane-fourier-r3-r6.md` R4-9, X-4). Nothing below is stale-at-HEAD.

**Posture.** DEFECTIVE-until-proven. Every row carries severity + `file:line` + its falsifier. Superlatives carry the
same burden (L-18 runs both ways). Read-only: this file is the only write.

**Tally.** 24 defects — **2 BLOCKER**, 9 MAJOR, 11 MINOR, 2 INFO — and **5 superlatives**.

---

## §0 — THE HEADLINE

EquationPanel is a **pure-render leaf that behaves like a compute client.** Every one of its three inputs — the
component set, the term budget, the notation — is already resident on the client, and the operation it calls is a
*pure function of exactly those three* (`src/fourier_analysis/symbolic/simplification.py:101-137`: no I/O, no DB, no
server state, a sort plus a string builder). It nevertheless re-serialises **401 Fourier coefficients ≈ 53 KB** to
`POST /api/equations/simplify` on every pill click and every slider settle, against a **5-requests-per-60-seconds**
compute limiter, behind a fetch core that **sleeps up to 60 s inside the spinner** on breach.

That is R6-8 (`intakes/lane-fourier-r3-r6.md:142`) instantiated in the UI layer rather than the registry layer: *the
API-operation leaf is not client-independent.* The intake proved the *model* couples client to operation; this
component proves the *runtime* does too — and here the coupling is gratuitous, because the operation carries no
knowledge the client lacks.

The second headline is a dependency-graph fact, not a code fact: the tree this component's two glass-ui imports
resolve through is **an invalid install**. `npm ls @mkbabb/value.js` exits `ELSPROBLEMS`.

On the value.js axis specifically: **EquationPanel consumes value.js zero times.** `lane-frontend.md:480` enumerates
the five value.js sites in the whole app (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`,
`harmonics.ts:5` — all `easeInOutSine`/`timingFunctions`); this file is not among them. It is instead a **fourth
independent colour island** (`energyColor`, three hand-written `hsl()` literals) sitting directly on the F.W2
migration surface. It does one thing right there, and it is the component's best moment — see **S-2**.

---

## §1 — THE CONSUMPTION MAP (what this leaf actually touches)

| Surface | Sites | Verdict |
|---|---|---|
| **value.js `^0.13.0`** | **0 imports** | Zero consumption. Hand-rolls colour instead (`notation.ts:44-48`). See C-18, C-2. |
| **keyframes.js `^4.3.0`** | **0 imports** | Zero consumption. Hand-rolls a spinner (`:108`); no mount/unmount transition on an absolutely-positioned overlay. See C-12. |
| **glass-ui `^4.0.0`** | 2 subpaths — `./button` (`:11`), `./metric-badge` (`:12`); 1 material class `glass-wash` (`:70`); 1 token `--z-controls` (`:120`) | Correct tier name (**S-3**), correct token; but the Button's size variant is defeated (C-7), the tier's shadow recipe is destroyed (C-6), the badge's label surface is unused (C-15), and `./metric-badge` is **deleted at glass-ui 7.0.0** (`lane-frontend.md:472` names `EquationPanel.vue:12` explicitly). |
| **fourier API (45-op surface)** | 1 operation — `POST /api/equations/simplify` (`api/routers/equations.py:134`), one of the 45 (`intakes/lane-fourier-r3-r6.md` §0, X-3: 45 total / 30 public-non-admin / 13 admin) | Rides the canonical `apiFetch` core correctly (**S-1**) but couples a pure client-side transform to a rate-limited compute endpoint (C-1), launders its own type (C-10), drops a response field (C-22), and under-exposes the operation's range (C-16). |
| **`@vueuse/core`** | `watchDebounced` (`:3,61`) | Correct primitive; the pending-callback lifetime is not handled (C-17). |
| **`lucide-vue-next`** | `X` (`:10`) | Runtime import from a **devDependency**; the package glass-ui 7 renames to `@lucide/vue` (C-20). |
| **`katex@0.17.0`** | `renderToString` (`:28`) | `trust: true` is provably unnecessary here (C-3); the fallback is an unescaped `v-html` sink (C-4); this is the 4th duplicate render site with a 3rd distinct option set (C-19). |
| **Local: `stores/workspace`** | `useWorkspaceStore()` (`:17,41,46`) | The component's *only* input channel. Zero props (C-8). |
| **Local: `SliderControl` / `NotationPills`** | `:97-103`, `:96` | Both consumed correctly (**S-4**, **S-5**). |

---

## §2 — BLOCKERS

### C-1 · BLOCKER · The interaction model is arithmetically incompatible with the operation's budget

**Provenance.**
- `EquationPanel.vue:45-49` — `simplifyCoefficients(store.epicycleData.components, budget.value, notation.value)`; the
  **entire** component array, unsliced.
- `EquationPanel.vue:61-65` — `watchDebounced([epicycleData, budget, notation], …, { debounce: 300, immediate: true })`.
  Every budget tick, every notation pill, every epicycle recompute, and every mount fires one request.
- `web/src/lib/defaults.ts:7-8` — `n_harmonics: 200`, `n_points: 1024`.
- `src/fourier_analysis/epicycles.py:81-93` — DC + one component per `±n` for `n ∈ [1, n_harmonics]` ⇒ **401 components**
  at the default (all indices exist and `neg_idx != n` because `N = 1024 > 400`).
- Payload, measured: `node -e 'JSON.stringify({n:-200,coefficient_re:-0.0012345678901234567,…})'` → **135 B/object**
  ⇒ `401 × 136 = 54,536 B ≈ 53.3 KB` per request. Hard floor with single-digit values: **28,070 B**.
- `api/services/rate_limiter.py:197-203` — `/api/equations/simplify` is routed to `compute_limiter`.
- `api/config.py:23` — `compute_rate_limit: int = 5`; `rate_limiter.py:168-170` — window `60 s`.
- `web/src/lib/api.ts:162,172-178` — `retryOn429` defaults **true**; on 429 the core `await new Promise(r =>
  setTimeout(r, waitSec*1000))` with `waitSec = min(RateLimit-Reset ?? 2**attempt, 30)`, up to
  `MAX_RATE_LIMIT_RETRIES = 2`. The sleep is *inside* the awaited call, so `loading.value` (`:46,57`) stays `true`
  throughout.

**The defect.** The 6th user interaction inside any 60-second window 429s. The client then blocks for up to
`2 × 30 s = 60 s` behind a spinner with no cancel affordance, and if the third attempt also breaches, surfaces
`ApiProblem.title` as raw text (`:54`, `:110`). The slider exposes 19 discrete budget values (`:100`, `min=2 max=20`)
and the pills three more — the budget is exhausted by ordinary exploration of a control the component itself supplies.
Compounding: `useViewState` persists `showEquation` to `localStorage`
(`components/visualization/composables/useViewState.ts:21`), so a reload with the flag on mounts the panel and fires
immediately.

**Why this is the CONSUMPTION defect and not merely a perf note.** The operation is *pure*
(`simplification.py:101-137` → `simplify_series` :33-64 → `truncate_by_budget` :15-31 → `render_latex`
`latex_rendering.py:272-282`). It reads no database, no session, no cache; it consumes only the three arguments the
client already holds. The client leaf is therefore coupled to a server operation for **zero server-owned knowledge** —
the exact class of seam R6-8 (`intakes/lane-fourier-r3-r6.md:142`) rules must not exist in the F.W5
shared-provenance contract.

**Falsifier.** Show either (a) `render_latex` consumes server-only state — refuted: read
`latex_rendering.py:21-153`, the three expanded renderers are pure numeric formatters; or (b) the deployment raises
`compute_rate_limit` above the interaction rate — `api/config.py:23` is the shipped default and the nginx `api_compute`
zone named at `rate_limiter.py:196` is a *second*, coarser governor, not a relaxation; or (c) `watchDebounced`
coalesces a full slider drag into one request — it does, and the finding already assumes that (the count is
*settles*, not *ticks*).

**Marked UNPROVEN-NEEDS-LIVE (SS-13):** the wall-clock spinner duration and the precise on-wire byte count. The
request *count* per interaction, the component *count*, and the limiter arithmetic are all source-derived and exact.

---

### C-2 · BLOCKER · The dependency graph this component imports through is an invalid install

**Provenance.**
- `web/node_modules/@mkbabb/glass-ui/package.json` `peerDependencies` → `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`.
- `web/package.json:17` → `"@mkbabb/value.js": "^0.13.0"`; installed **0.13.0**.
- Receipt: `npm ls @mkbabb/value.js` →
  `@mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui` … `npm error code ELSPROBLEMS`.
- Corroborated by the corpus at `lane-frontend.md:59` (`^0.10.0` peer vs `^0.13.0` pin vs `4.0.0` producer latest).
- `package-lock.json` `peerDependenciesMeta["@mkbabb/value.js"] = {optional: true}` — so `npm install` does not *fail*,
  but the range is still validated when the package is present, which is why `npm ls` is RED.
- Forward leg: `lane-frontend.md:472` — glass-ui 7.0.0 **removes** the `./metric-badge` subpath (→ `./metric`,
  `Metric`) and names `EquationPanel.vue:12` as one of the 7 breaking import sites.
- `lane-frontend.md:490-492` — the three bumps (`glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0`) are one
  atomic transaction; `keyframes@4.3.0` optional-depends `glass-ui ~4.0.0`.

**The defect.** Two of this component's twelve imports (`:11`, `:12`) resolve through a package whose declared
contract the installed tree violates, and one of the two subpaths does not exist in the producer's current major.
Any CI gate that runs `npm ls`, `npm ci --strict-peer-deps`, or a modern pnpm/yarn resolver fails on the build that
ships this file.

**Falsifier — and the honest scope limit.** I checked whether the violation reaches this component's *runtime*:
`grep -rln "@mkbabb/value.js" web/node_modules/@mkbabb/glass-ui/dist/*.js` → exactly three chunks,
`aurora.js`, `color-DweYl7pE.js`, `motion-curves.js`. **Neither `button-BNDWhAZb.js` nor `MetricBadge-BpC0R_Ec.js`
imports value.js.** So no runtime behaviour of EquationPanel is proven affected. The blocker is *install validity and
forward migration*, not paint. Anyone wishing to refute it must show that `npm ls` exits 0 — it does not.

---

## §3 — MAJOR

### C-3 · MAJOR · `trust: true` is provably unnecessary at this call site and widens KaTeX's documented XSS surface

`EquationPanel.vue:28-32` passes `trust: true`. KaTeX's `trust` option exists solely to enable the commands KaTeX
otherwise refuses — `\href`, `\url`, `\includegraphics`, `\htmlClass`/`\htmlStyle`/`\htmlData` — and the upstream
docs state plainly that it must not be used with untrusted input, because `\href{javascript:…}{x}` renders a live
anchor.

**This endpoint cannot emit any of them.** `/simplify` → `simplify_numerical_coefficients`
(`simplification.py:101`) → `simplify_series` (`:33`) → `render_latex` (`latex_rendering.py:272-282`) → `_EXPANDED`
(`:268`) = `render_trig` / `render_exponential` / `render_polar`, lines **21-153**. The only trust-gated commands in
the whole renderer are four `\htmlClass` emissions at **:175, :176, :216, :248** — all inside `render_trig_sigma`
(:154-198), `render_exponential_sigma` (:199-230), `render_polar_sigma` (:231-267), reachable only via
`render_latex_sigma` (:285-293), which `/simplify` never calls.

So the flag buys nothing and costs the whole trust surface. It is cargo — `EquationResult.vue:20-24` carries the
identical three-option block, and *that* component renders `latex_sigma`, where `\htmlClass` genuinely is required
(`EquationView.vue:414-421` styles `.eq-coeff`). The option was copied from the site that needs it to the site that
does not.

**Falsifier.** Exhibit a trust-gated command emitted by `render_trig` / `render_exponential` / `render_polar`
(`latex_rendering.py:21-153`). `grep -n "href\|\\\\url\|includegraphics\|htmlClass\|htmlData\|htmlStyle"` over that
file returns hits at 159, 175, 176, 216, 248 only — every one above line 154, i.e. sigma-only.

### C-4 · MAJOR · The KaTeX failure path interpolates an unescaped server string into `v-html`

`EquationPanel.vue:33-35` — `catch { return \`<span class="text-red-400">${latex.value}</span>\` }`, rendered through
`v-html` at `:111`. `latex.value` is `resp.latex` (`:50`), server-supplied, never escaped. Any `<` in the payload is
parsed as markup.

**Falsifier.** `throwOnError: false` (`:30`) suppresses `ParseError`, so the catch is rare — but not unreachable:
KaTeX throws non-`ParseError` exceptions on internal failures, and `renderToString` can throw on malformed macro
input regardless of `throwOnError`. To refute, prove `katex.renderToString` cannot throw for any string when
`throwOnError:false`. The KISS cure is one line — `.textContent`, or return `""` — so the defect stands on cost
grounds even if the path is cold.

### C-5 · MAJOR · The energy badge renders a green `100.0%` when no measurement exists

`EquationPanel.vue:21` — `const energy = ref(1)`. `:38` — `eColor = energyColor(energy.value)`; `notation.ts:44-45` —
`if (e >= 0.99) return "hsl(142, 71%, 45%)"` (green). `:77-82` — `<MetricBadge :value="(energy*100).toFixed(1)"
unit="%" :color="eColor" />`.

Consequences, all source-derivable:
1. **On mount**, before the first (debounced, ≥300 ms) response, the badge reads a confident green **`100.0%`**.
2. **On error** (`:52-55`), `energy` is *not* reset — the panel shows a red error string *and* the previous (or
   initial) energy figure side by side.
3. **On empty components** (`:41` early-return), nothing is cleared: `latex`, `energy`, `loading` all retain prior
   values.

The server's own convention agrees that 1.0 means "vacuously complete" (`simplification.py:62`:
`energy_fraction = kept/total if total > 0 else 1.0`) — which is exactly why 1.0 is the wrong *client* sentinel: it
is indistinguishable from a real answer. `MetricBadge` ships the correct affordance and it is unused: `value` is
typed `MetricValue = string | number | null | undefined`
(`glass-ui/dist/utils/coalesceMetric.d.ts:4`) with a documented `placeholder` prop for the empty case
(`MetricBadge.vue.d.ts`: "Substitute glyph when value is empty").

**Falsifier.** Show a guard that suppresses the badge until the first response — `:77-82` is unconditional inside a
template with no `v-if` on the badge; the only branching is on `loading`/`error` in the *body* region (`:107-111`),
which does not gate the header.

### C-6 · MAJOR · The scoped `box-shadow` destroys `glass-wash`'s material recipe and hand-copies a glass-ui token

`EquationPanel.vue:124` — `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);` on `.eq-panel`, which also carries
`glass-wash` (`:70`).

glass-ui defines the tier as
`web/node_modules/@mkbabb/glass-ui/dist/styles/glass/ladder.css:36-42`:

```
.glass-wash {
    …
    box-shadow: var(--glass-material-rim), var(--glass-shadow-wash);
}
```

`--glass-material-rim` = `0 0 0 0.5px color-mix(in srgb, var(--shadow-color) 5%, transparent)`
(`styles/tokens/shadow.css:82`) — the 0.5 px rim ring that *is* the glass edge; `--glass-shadow-wash` =
`var(--shadow-sm), var(--glass-highlight)` (`styles/tokens/glass.css:422`).

`ladder.css:6` opens `@layer components`. The component's scoped rule is **unlayered author CSS**, and unlayered
always outranks layered regardless of specificity. So the override is unconditional: the panel loses the rim and the
highlight and keeps only a flat drop shadow.

Worse, the replacement is a degraded copy of a token the library already ships:
`--glass-under-shadow-default: 0 4px 16px -2px oklch(0 0 0 / 0.08)` (`styles/tokens/glass.css:477`) — same offsets,
same blur, same alpha, minus the `-2px` spread, and in `rgba()` rather than the theme-aware `oklch`/`--shadow-color`
channel, so it does not respond to the dark arm at all.

**Falsifier.** Show that `.glass-wash`'s box-shadow survives — it cannot: unlayered beats `@layer components`, and
both declarations target the same element. Or show `--glass-material-rim` is decorative — `material.css:51-58`
documents it as the rim folded into the grain `::after`, i.e. load-bearing for the tier's identity.

### C-7 · MAJOR · `h-6 w-6` defeats the Button size variant and pins a 24 px tap target on touch

`EquationPanel.vue:83-91` — `<Button variant="ghost" size="icon" class="h-6 w-6 rounded-full text-muted-foreground">`.

glass-ui's Button composes `cn(buttonVariants({variant, size}), props.class)`
(`dist/button-BNDWhAZb.js:34`), and its `cn` is a **bespoke** merger (`dist/cn-DJXf4yaB.js`) whose conflict table
includes `["width", /^w-/]` and `["height", /^h-/]` — last wins. `size: "icon"` supplies
`h-(--control-h-md) w-(--control-h-md) p-0` (`button-BNDWhAZb.js:71`). The consumer's `h-6 w-6` therefore **replaces**
it outright.

That matters because the token is the accessibility floor, not a style:
`styles/tokens/light-dark.css:18-22`

```
@media (pointer: coarse) {
    :root {
        --ui-scale: var(--ui-coarse-scale, 1.5);
        --control-floor: var(--touch-target, 2.75rem);
    }
}
```

and `styles/tokens/offsets-sizing.css:149` — `--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor))`.
The library's own comment at `light-dark.css:11-14` states the intent verbatim: *"The WCAG-2.5.5 44px touch floor is
enforced HERE too … a consumer dialing `--ui-scale` below 1 still cannot drop a control under the target."*

The consumer drops it anyway, from the outside: **24 × 24 CSS px on every pointer type**, where the variant would
have clamped to ≥ 44 px on coarse. And the library already ships the rung the author wanted —
`size: "icon-sm"` = `h-(--control-h-xs) w-(--control-h-xs) p-0` (`button-BNDWhAZb.js:72`) — which was not used.

This is the owner's `feedback_root_styling` / `feedback_glass_ui_first_class` precepts violated at a single call
site, with a measurable a11y consequence.

**Falsifier.** Show `cn` preserves both classes — `cn-DJXf4yaB.js` `a()` keeps only the *last* class per
`scope|group` key, and `h-(--control-h-md)` and `h-6` share the key `|height`. Or show the app pins `--ui-scale: 1`
under coarse pointers — `grep -rn -- "--ui-scale" web/src/` returns nothing; the app never overrides it.

### C-8 · MAJOR · Zero props: the component's entire input contract is a global singleton

`EquationPanel.vue:15` — `defineEmits<{ close: [] }>()` and **no `defineProps`**. The data arrives via
`useWorkspaceStore()` (`:17`) and is read at `:41` and `:46`.

The parent already knows the precondition: `VisualizationView.vue:231` —
`<EquationPanel v-if="showEquation && store.epicycleData && !isEditing" @close="showEquation = false" />`. So
`store.epicycleData` is asserted twice, in two files, with two different shapes (`&& store.epicycleData` in the
parent, `store.epicycleData?.components.length` in the child), and neither is the source of truth.

Consequences: the panel cannot be unit-tested without a Pinia instance and a router (the store calls `useRouter()`
at `stores/workspace.ts:34`); it cannot be reused for the `/equation` route's coefficients (which live in
`EquationView`, not the workspace store); and it cannot be storybooked. The honest contract is one prop —
`components: BasisComponent[]` — which is precisely what `:46` passes down anyway.

**Falsifier.** Show a second consumer that benefits from store-coupling — `grep -rn "EquationPanel" web/src web/e2e`
returns exactly two hits, both the single mount at `VisualizationView.vue:26,231`.

### C-9 · MAJOR · No caching, in a tree that already ships the cache

`EquationPanel.vue:40-59` has no memo of any kind. For a fixed `epicycleData` the response space is finite and
small: 19 budgets × 3 notations = **57 outcomes**, each a deterministic function of a payload the client holds
(§0). Re-selecting a previously-visited (budget, notation) pair re-POSTs 53 KB and burns another of the five
per-minute slots.

The cure already exists in the same repo, three directories away:
`web/src/components/equation/composables/useEquationCache.ts` (49 lines, session-storage memo keyed on
`{expression, domainStart, domainEnd, nHarmonics, budget, notation}`), consumed by `EquationView.vue:20`. The
visualization-side twin ignores it, and ignores the server's own content-addressable cache posture visible one layer
up at `api/routers/contours.py:36-48` ("F.W2 T-β — content-addressable compute cache") — `/api/equations/simplify`
(`equations.py:134-163`) has **no** such cache, so there is no server-side amortisation either.

**Falsifier.** Show the response is non-deterministic for fixed inputs — `simplification.py:101-137` has no clock, no
RNG, no persistence; `truncate_by_budget` (:15-31) is a stable sort plus a slice.

### C-10 · MAJOR · The client leaf widens its own type and then casts it back

`web/src/lib/equation/api.ts:33-50`:

```ts
export async function simplifyCoefficients(
    components: BasisComponent[], budget: number, notation: string,   // ← widened
): Promise<SimplifyResponse> {
    …
    notation: notation as SimplifyRequest["notation"],                 // ← cast back
```

The caller holds a `NotationMode` (`EquationPanel.vue:18`, `ref<NotationMode>("trig")`), the request DTO wants a
`NotationMode` (`equation/types.ts:39`), and the seam in between launders it through `string`. Any typo'd literal
passed by a future caller type-checks and fails at the server's regex
(`api/models/equations.py:44`, `pattern=r"^(trig|exponential|polar)$"`) as a 422 rendered as raw text at `:110`.

This directly contradicts the file's own header. `equation/api.ts:1-12` announces that E.W5 retired "the 2
`as unknown as` casts"; `web/src/lib/api.ts:80-83` repeats the claim ("retires the 2 `as unknown as` survivors at
equation/api.ts:36+53 **structurally**"). Both are true of the `as unknown as` pair — and both step past the plain
`as` at `:49`, which the widening *created* and which no structural change removes. The parameter type is a
one-character fix (`notation: NotationMode`) that deletes the cast.

**Falsifier.** Show a caller that legitimately passes a non-`NotationMode` string — `grep -rn "simplifyCoefficients"
web/src` returns exactly two hits: the definition and `EquationPanel.vue:45`.

### C-11 · MAJOR · The Escape affordance is unreachable from the state in which the panel opens

`EquationPanel.vue:69-73` — `<div class="eq-panel glass-wash" tabindex="-1" @keydown.esc="emit('close')">`.

`tabindex="-1"` makes the element *programmatically* focusable only, and nothing focuses it: `grep -n "focus"
web/src/components/visualization/VisualizationView.vue` returns no hits, and the panel has no `onMounted` focus call.
The toggle that opens it lives outside the panel (`VisualizationView.vue:216,222`, `:show-equation` /
`@toggle-equation` on the canvas dock), so at the moment of opening, focus is on the toggle — and Escape does
nothing. The handler only becomes live *after* the user tabs into a descendant (keydown bubbles from the Button,
the pills, or the slider).

Alongside: no `role`, no `aria-label`/`aria-labelledby` on a floating overlay panel (`:69`); the "Equation" title at
`:75` is a bare `<span>`, not an accessible name; and there is no focus restoration to the toggle on close (`:88`).

**Falsifier.** Show that a `keydown` on `document` reaches the panel without focus entering it — it does not; the
listener is bound to the element, not the window. Or exhibit an autofocus — there is none in the 134 lines.

---

## §4 — MINOR

| id | severity | finding | provenance | falsifier |
|---|---|---|---|---|
| **C-12** | MINOR | Hand-rolled spinner where glass-ui ships one, and it ignores reduced motion. `<div class="h-4 w-4 animate-spin rounded-full border-[1.5px] border-border border-t-primary" />` | `EquationPanel.vue:108`. glass-ui exports `./pulse`; `dist/components/custom/pulse/*.d.ts` documents `variant: 'ring'` = "single ring spinner", and states "Reduced motion: the `breath` keyframe collapses to a static halo at media-query level". Tailwind's `animate-spin` has no such guard; the repo demonstrates it knows the pattern at `web/src/style.css:92-96`. | Show `animate-spin` respects `prefers-reduced-motion` in this Tailwind v4 config — `web/src/style.css` adds no such rule and `tw-animate-css` governs enter/exit, not `animate-spin`. |
| **C-13** | MINOR | `<X class="h-3.5 w-3.5" />` is **inert CSS** — the library's opt-out is a `size-*` class, not `h-`/`w-`. | `EquationPanel.vue:90`. Button base cva (`dist/button-BNDWhAZb.js:53`) carries `[&_svg:not([class*=size-])]:size-(--ui-glyph)`; `h-3.5 w-3.5` does not match `[class*=size-]`, so the descendant rule still applies at specificity (0,2,1) vs (0,1,0). `--ui-glyph: calc(1rem * var(--ui-scale))` (`tokens/offsets-sizing.css:177`) ⇒ 16 px fine-pointer, **24 px coarse** — a 24 px glyph inside C-7's 24 px button, zero padding. | Show Tailwind emits `.h-3\.5` at ≥ (0,2,1) or in a later layer — both are `@layer utilities`, and the arbitrary-variant selector carries an extra attribute + element component. |
| **C-14** | MINOR | Two independent raw-palette error inks instead of the `--destructive` token. `text-red-400` at both the katex fallback and the error row. | `EquationPanel.vue:34`, `:110`. The app defines a themed destructive channel via glass-ui tokens (`styles/tokens/color-radius.css`); `text-red-400` is a fixed Tailwind swatch with no dark arm. | Show `--destructive` is unavailable — `@import "@mkbabb/glass-ui/styles"` at `style.css:3` brings the token set in. |
| **C-15** | MINOR | `MetricBadge` consumed without any of its label surface, so "100.0 %" is context-free to assistive tech. | `EquationPanel.vue:77-82` passes only `value`/`unit`/`size`/`color`. `MetricBadge.vue.d.ts` documents `label`, `abbreviation`, `labelPosition` for exactly this (`label` = "Full annotation slot … Tracked uppercase, muted"). | Show the panel's `<span>Equation</span>` (`:75`) is programmatically associated with the badge — it is a sibling in a flex row with no `aria-describedby`/`aria-labelledby`. |
| **C-16** | MINOR | The client under-exposes the operation's range by 60 %. Slider `:min="2" :max="20"`; the operation accepts `ge=2, le=50`. | `EquationPanel.vue:100`; `api/models/equations.py:39` (`budget: int = Field(default=6, ge=2, le=50)`). Note the client's default (`:19`, `budget = ref(6)`) *does* match the server default — the ceiling is the drift. | Show a client-side reason for 20 — none is documented in the 134 lines or in `notation.ts`. |
| **C-17** | MINOR | A pending debounced callback survives unmount and fires a post-close request. | `EquationPanel.vue:61-65`; `web/node_modules/@vueuse/shared/dist/index.js:320-352` — `debounceFilter` uses a bare `setTimeout` with no `tryOnScopeDispose`; the timer is cleared only by a *subsequent* invocation. Closing the panel within 300 ms of a slider move still POSTs 53 KB and consumes one of the five C-1 slots. | Show `watchDebounced` registers scope cleanup for the pending timer — read the filter; it registers none. |
| **C-18** | MINOR | `energyColor` is a fourth independent colour island on the F.W2 migration surface; value.js consumption is zero. | `web/src/lib/equation/notation.ts:44-48` — three hand-written `hsl()` literals; siblings `NOTATION_OPTIONS` (:15-17) and `TIER_INFO` (:24-41) hand-write six more; `lib/colors.ts` hand-rolls `hslToHex`/`rgbToHex`/`hexToRgba` (117 lines). `lane-frontend.md:480` enumerates the five value.js sites app-wide; none is in this component's import closure. | Show value.js 0.13 cannot express a threshold ramp — it ships the colour unit + parsing surface these three functions re-implement. (Severity is MINOR, not MAJOR: the literals are correct *today*; the defect is duplication on a surface the megatranche is about to move.) |
| **C-19** | MINOR | Fourth duplicate `katex.renderToString` call site, third distinct option set, third distinct failure fallback — no shared helper. | `EquationPanel.vue:28` (`displayMode+throwOnError+trust`, fallback `<span class="text-red-400">`); `EquationResult.vue:20` (same three, fallback `<code>`); `ConvergencePlot.vue:256` (`throwOnError` + `displayMode:false`); `useCoeffHover.ts:99`. | Show the four genuinely need four option sets — C-3 already proves EquationPanel's set is wrong for its endpoint, which is what a shared helper would have prevented. |
| **C-20** | MINOR | A runtime import resolved from `devDependencies`, in the package glass-ui 7 renames. | `EquationPanel.vue:10` imports `X` from `lucide-vue-next`, declared at `web/package.json:35` under `devDependencies`. `lane-frontend.md:68,478` — glass-ui 7 peers `@lucide/vue ^1.16.0`; 35 import sites app-wide. Also under `devDependencies`: `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` — the first is a glass-ui peer, the last three are measured dead (`lane-frontend.md:70`). | Show a bundler/publish path where the misclassification bites — for a `private: true` Vite app it does not break the build; it breaks dependency auditing and the `@lucide/vue` sweep's accounting. Hence MINOR. |
| **C-21** | MINOR | Half-guarded optional chain. `store.epicycleData?.components.length` guards the parent but dereferences `.length` on an unchecked `components`. | `EquationPanel.vue:41`. `EpicycleData.components` is required in `lib/types.ts:24`, so the guard rests entirely on the DTO contract — and `computeEpicycles` (`lib/api.ts:330-343`) unwraps `res.data` with no runtime validation of the envelope. | Show a validator between wire and store — there is none; `api.ts:192` does a bare `res.json() as T`. |
| **C-22** | MINOR | `SimplifyResponse.term_count` is fetched and discarded; the UI reports the *requested* budget as "Terms". | `EquationPanel.vue:50-51` destructures only `latex` and `energy_captured`; `equation/types.ts:42-46` declares `term_count`; the server computes it as `len(truncate_by_budget(terms, budget))` (`simplification.py:136-137`). The label reads "Terms" over `budget` (`:98-99`). They diverge whenever `len(terms) <= budget` (`simplification.py:17-18` returns all terms). | Show the two can never diverge — they can, for a contour whose epicycle chain has ≤ 20 components. Rare at `n_harmonics: 200`, hence MINOR, not MAJOR. |

---

## §5 — INFO

| id | finding | provenance |
|---|---|---|
| **C-23** | The `loading` flag is cleared by a *superseded* request. When request B aborts request A (`api.ts:54-59`), A rejects with `AbortError`, skips the error branch correctly (`:53`) — and then its `finally` sets `loading.value = false` (`:56-58`) while B is still in flight, dropping the spinner mid-fetch. A per-request generation guard, or clearing `loading` only for the newest call, is the fix. | `EquationPanel.vue:44-58` + `lib/api.ts:52-59`. |
| **C-24** | `NotationPills` uses the legacy `modelValue` + `update:modelValue` pair rather than Vue 3.5's `defineModel()`, which the repo's Vue version (`^3.5.38`) supports. Cosmetic; the contract is otherwise sound (see S-5). | `NotationPills.vue:6-12`. |

---

## §6 — SUPERLATIVES (L-18, same burden of proof)

### S-1 · The abort discipline is correct, idiomatic, and consumes exactly the seam E.W5 built

`EquationPanel.vue:52-55` discriminates the abort — `if (!isAbortError(e)) { error.value = … }` — so a superseded
request never paints an error over a newer one's result. It gets that for free by routing through the canonical
core: `simplifyCoefficients` calls `apiFetch(…, "eq-simplify", …)` (`equation/api.ts:51`), and `coreFetch` resolves
`options?.signal ?? abortable(abortKey)` (`lib/api.ts:161`), where `abortable` cancels the prior controller for that
key (`:54-59`). One key, one in-flight request, one cancellation path.

This is precisely what `equation/api.ts:1-12` promised — the retirement of the bespoke fourth `eqFetch` helper — and
the component consumes it correctly rather than re-deriving it. **Falsifier:** show a stale-write race —
there is none for `latex`/`energy` (`:50-51`), because the only path to those assignments is a non-aborted
resolution, and the key guarantees at most one such resolution outstanding. (The one crack, C-23, is the `finally`,
not the writes.)

### S-2 · `color="var(--viz-fourier)"` is the right colour path — and it dodges a live bug in its sibling

`EquationPanel.vue:101` passes the CSS custom property itself, not a resolved value. `SliderControl` projects it into
`--track-color` (`:89`) and composes it in `color-mix(in srgb, var(--track-color) 25%, transparent)`
(`SliderControl.vue:145-148`), where an `oklch()` token is a first-class colour.

That matters because the app's *other* colour path is broken on exactly this token.
`web/src/lib/colors.ts:21-56` (`cssVarToHex`) branches on `#…`, `hsl(…)`, a bare Tailwind-v4 HSL triplet, and
`rgb(…)`, then falls through to `return "#888888"`. glass-ui 4.0.0 ships
`--viz-fourier: oklch(0.579 0.201 30.4)` (`dist/styles/tokens/color-radius.css:263`) and
`light-dark(oklch(…), oklch(…))` (`tokens/light-dark.css:145`) — **there is no oklch branch**, and the token is not
`@property`-registered anywhere in `dist/styles/` (`grep -rn "@property" … | grep -i viz` → empty), so
`getPropertyValue` returns the literal token text. `resolveVizColors()` (`colors.ts:89-95`, called at boot from
`App.vue:11` per `lane-frontend.md:554`) therefore overwrites the seeded `VIZ_COLORS.fourier = "#bf4040"` with grey.

EquationPanel is not exposed to that, because it never asks `colors.ts` anything. Its consumption of the design
token is the *correct* one, and the sibling path is the defect. **Falsifier / limit:** the runtime read is marked
**UNPROVEN-NEEDS-LIVE (SS-13)** — no browser was used. The code path is unambiguous (four regexes, none matching
`oklch(`/`light-dark(`), but the claim about `VIZ_COLORS` at runtime is inference, not measurement. The claim about
*EquationPanel* — that it bypasses the resolver entirely — is proven by its import list.

### S-3 · The material class is the correct post-4.0.0 tier name

`EquationPanel.vue:70` uses `glass-wash`, which is live in the installed producer
(`dist/styles/glass/ladder.css:36`, `material.css:37`) and is one of the three post-4.0.0 tier names the corpus
independently confirms in use (`lane-frontend.md:382`: "The live tier classes are `glass-wash` (4), `glass-resting`
(3), `glass-floating` (3) — the post-4.0.0 names"). This file carries none of the retired 3.x paints
(`glass-track`/`glass-fill`/`glass-thumb`/`glass-scrubber`), all of which survive elsewhere only as prose. Given
C-6 clobbers the tier's shadow, the *class choice* remains right even though its composition is broken — the two are
separable and both worth recording. **Falsifier:** show `glass-wash` is deprecated at 4.0.0 — it is the selector
group's canonical member at `material.css:37`, and `ladder.css:53` describes its intended register ("sub-perceptual").

### S-4 · The `SliderControl` scalar adaptation is consumed exactly as documented

`EquationPanel.vue:97-103` uses the explicit `:model-value` / `@update:model-value` pair rather than `v-model`,
which is correct for a wrapper that adapts reka-ui's array model to a scalar
(`SliderControl.vue:51-56`) and whose own `update:modelValue` is clamped (`:55`). The `color` prop is supplied
(it is required, `SliderControl.vue:32`), `min`/`max`/`step` are all integers matching the operation's integer
`budget`, and the wrapper's `:aria-label="label"` (`SliderControl.vue:87`) gives the control an accessible name for
free. This is the "thin API-shape adapter, not shadow" posture the corpus ratifies (`lane-frontend.md:368-371`),
consumed on contract. **Falsifier:** show a prop mismatch — `label`, `modelValue`, `min`, `max`, `step`, `color` are
the six required props and all six are passed.

### S-5 · The notation axis is type-exhaustive and matches the operation's accepted set 3-for-3

`NotationMode = "trig" | "exponential" | "polar"` (`equation/types.ts:1`) is a closed union; `NOTATION_OPTIONS`
(`notation.ts:9-18`) is the single data table the pill row iterates (`NotationPills.vue:18`), so adding a mode is one
row, not a template edit; and the union matches the server's accepted set **exactly** —
`api/models/equations.py:44`, `pattern=r"^(trig|exponential|polar)$"`. Three client values, three server values, no
drift, no stringly-typed branch in the component. In a file that otherwise launders this very type through `string`
(C-10), the *modelling* is right; only the seam is not. **Falsifier:** exhibit a fourth notation the server accepts
or the client offers — the regex and the union are both closed at three, and `latex_rendering.py:268-269` dispatches
exactly three expanded + three sigma renderers.

---

## §7 — CORPUS RECONCILIATION

| corpus row | relation | disposition here |
|---|---|---|
| **R6-8** (`intakes/lane-fourier-r3-r6.md:142`) — "an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam" | **EXTENDS, does not contradict.** The intake proved the coupling in the *registry model* (C31's client-side `api.ts` mutation flipping the operation leaf). C-1 exhibits the same seam in the *running product*, at a site where the operation carries no server-owned knowledge at all. | Both belong in the F.W5 shared-provenance contract. Add: *operation identity independent of client identity* (R6-8) **and** *a pure operation must not be the client's only route to a value it already holds* (C-1). |
| **R3-7c** (`:81`) — "36 client edges, nine gaps" of 45 operations; CARRY → F.W5 | **AGREES and refines.** `/api/equations/simplify` is one of the 36 *connected* edges — but connectedness is not health. This lane adds the inverse defect class the edge census cannot see: an edge that exists and should not carry this traffic. | F.W5 should score edges on *necessity*, not only existence. |
| **X-3** (`:154`) — 45 total / 30 public-non-admin / 13 admin | **AGREES.** `/api/equations/simplify` (`equations.py:134`) is one of the 2 `equations.py` operations inside the 30-op public arm. | Cited, unmodified. |
| **`lane-frontend.md:472`** — `./metric-badge` removed at glass-ui 7, naming `EquationPanel.vue:12` | **AGREES, exactly.** Verified live: `Object.keys(require('@mkbabb/glass-ui/package.json').exports)` in the installed 4.0.0 contains `./metric-badge`; the corpus records its removal at 7.0.0. | Folded into C-2. |
| **`lane-frontend.md:59`** — value.js `^0.10.0` peer vs `^0.13.0` pin | **AGREES and hardens.** The corpus records the gap; this lane adds the executable receipt (`npm ls` → `ELSPROBLEMS`, `invalid`) and the exact installed peer string `^0.10.0 \|\| ^0.11.0`. | Folded into C-2. |
| **`lane-frontend.md:480`** — the five value.js consumption sites | **AGREES.** EquationPanel is not among them; its import list (`:2-13`) contains no `@mkbabb/*` package except glass-ui. | Basis of C-18. |
| **`lane-frontend.md:368-371`** — the three `components/ui/` wrappers are "thin API-shape adapters … the correct posture — keep" | **AGREES.** `SliderControl` is consumed here on contract (S-4). | Cited in support. |
| **`lane-frontend.md:382`** — live tier classes are the post-4.0.0 names | **AGREES.** `glass-wash` at `:70` is one of the four counted uses (S-3). | Cited in support. |
| **census §6.7 "zero credit"** (as corrected by the intake lane §5 X-1) | **FOLLOWS THE CORRECTION.** The Codex measurements are treated as measurement, not authority; R6-8 is cited as an adjudicated finding, never as a Codex ruling. | No re-litigation. |
| **R5-7** (`:125`) — native template loops invisible to callsite-keyed derivation | **NOT APPLICABLE, checked.** `EquationPanel.vue` contains **zero** `v-for`; `NotationPills.vue:18` carries the only loop in the closure and it is on a *component* (`<Button v-for>`), so it registers. | Recorded as checked-and-clear, so the exhaustiveness gap is not silently inherited. |

---

## §8 — METHOD AND LIMITS

- **Read-only** throughout `/Users/mkbabb/Programming/fourier-analysis`. No product source in any repo was written.
  This file is the only write.
- **Files read whole:** `EquationPanel.vue` and every member of its import closure — `stores/workspace.ts`,
  `lib/equation/api.ts`, `lib/equation/notation.ts`, `lib/equation/types.ts`, `lib/api.ts`, `lib/api-problem.ts`,
  `components/ui/SliderControl.vue`, `components/equation/NotationPills.vue` — plus, for seam evidence:
  `lib/colors.ts`, `lib/defaults.ts`, `composables/useViewState.ts`, `useEquationCache.ts`, `EquationResult.vue`,
  `style.css`, `web/package.json`, `api/routers/equations.py`, `api/models/equations.py`,
  `api/services/rate_limiter.py`, `api/config.py`, `api/routers/contours.py`, `api/services/computation.py`,
  `src/fourier_analysis/symbolic/simplification.py`, `latex_rendering.py`, `epicycles.py`, and the installed
  `@mkbabb/glass-ui@4.0.0` dist (`package.json` exports, `button-BNDWhAZb.js`, `cn-DJXf4yaB.js`,
  `MetricBadge.vue.d.ts`, `utils/coalesceMetric.d.ts`, `pulse/*.d.ts`, `styles/glass/{ladder,material}.css`,
  `styles/tokens/{glass,shadow,light-dark,color-radius,offsets-sizing}.css`) and
  `@vueuse/shared@14` `dist/index.js`.
- **Tools:** `Read`, `grep`, `find`, `wc`, `sed`, `node -p/-e`, `npm ls`, `python3` (lockfile JSON). **No browser
  tooling** — per lane law.
- **UNPROVEN-NEEDS-LIVE (SS-13), explicitly:** (1) the wall-clock spinner duration and on-wire byte count under C-1;
  (2) the runtime `getComputedStyle` read behind S-2's `VIZ_COLORS` inference; (3) the painted tap-target size under
  C-7 and the painted glyph size under C-13 — the token arithmetic and the cascade are proven, the pixels are not
  measured. Everything else is source-derived and exact.
- **Not adjudicated here:** design/visual quality (axis D) and library-shape questions such as whether
  `EquationPanel` should be a glass-ui primitive at all (axis L). C-6/C-7/C-13 are filed on the **consumption** axis
  because each is a library contract consumed incorrectly, not a taste judgement.
