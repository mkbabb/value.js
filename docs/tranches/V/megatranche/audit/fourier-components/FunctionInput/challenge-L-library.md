claude-opus-5[1m] (served model id)

# CHALLENGE · `FunctionInput.vue` · axis **L — LIBRARY**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FunctionInput.vue` (261 lines).
**Posture** Assumed DEFECTIVE until the tree proved otherwise. Every row carries severity + `file:line` +
its own falsifier. L-18 runs both ways: §4 is the superlative set, held to the same standard.
**Mode** Static, read-only. No dev server, no browser tooling, no product-source mutation in any repo.
The only write this lane made is this file.
**Substrate** fourier HEAD `cd26c65` / tree `9a66411d` — unmoved (intake R4-9, re-verified at fold; CENSUS
addendum ¶1). Installed producers: glass-ui **4.0.0**, keyframes 4.3.0, value.js 0.13.0 [FE §1 dep table].

**Read whole (subject + its complete import closure):** `FunctionInput.vue`; `lib/equation/presets.ts`;
`lib/equation/types.ts`; `lib/equation/notation.ts` (via `NotationPills`); `components/ui/CollapsibleSection.vue`;
`components/ui/SliderControl.vue`; `components/ui/tooltip/{index.ts,Tooltip.vue}`; `components/equation/NotationPills.vue`;
plus the seam files the claims cross into: `components/equation/EquationView.vue` (the **sole** call site),
`components/equation/ConvergencePlot.vue`, `components/equation/composables/{useEquationCache.ts,useCurveTransition.ts}`,
`lib/equation/api.ts`, `lib/api.ts`, `api/models/equations.py`, `api/routers/equations.py`,
`src/fourier_analysis/symbolic/{simplification.py,integration.py,parsing.py}`, and the installed
`@mkbabb/glass-ui` d.ts surface for `button` / `slider` / `collapsible` / `toggle-chip`.

**Tally — 20 defects (3 BLOCKER · 5 MAJOR · 12 MINOR) · 4 superlatives · 3 INFO.**

---

## §0 · What this component is, structurally

A 261-line stateless control panel: 6 `defineModel`s + 4 read-only props + 2 emits, two `cartoon-card`
`CollapsibleSection`s ("Function" / "Controls"), zero lifecycle hooks, zero listeners, zero timers,
zero canvas. One call site (`EquationView.vue:198-210`). It is the **sole editor** of every input that
feeds `POST /api/equations/compute` and the **sole author** of the domain that the Path-B convergence
canvas divides by ([FE §6] `ConvergencePlot.vue:104`). That combination — no internal state, total
authority over the request envelope — is exactly why its missing invariants are the whole finding.

Module size is **Goldilocks-correct at the file level** (261 lines: 76 script / 139 template / 31 style),
but see **L-M5**: ~36 of those script lines are a domain-notation library wearing a component costume.

---

## §1 · BLOCKERS

### L-B1 — the "Display terms" slider range exceeds the API's own `budget` ceiling; Compute hard-fails 422

`FunctionInput.vue:217` `:max="Math.max(2, vizHarmonics ?? nHarmonics)"`. `vizHarmonics` derives from
`nHarmonics`, whose slider max is **100** (`:184`). The API caps `budget` at **50** on *both* routes:

- `api/models/equations.py:23` — `ComputeEquationRequest.budget: int = Field(default=10, ge=2, le=50)`
- `api/models/equations.py:40` — `SimplifyRequest.budget: int = Field(default=6, ge=2, le=50)`

`budget` is sent verbatim on the compute path (`EquationView.vue:110`) and the simplify path
(`:137`). So any `budget ∈ (50, 100]` makes **Compute** 422 with an opaque banner
(`EquationView.vue:123` `error.value = e instanceof Error ? e.message : "Computation failed"`), and
makes **simplify** 422 into a `catch` that is *literally* annotated
`/* silent */` (`EquationView.vue:143`) — the Display-terms slider then moves with no visible effect
and `lastDisplayKey` is never advanced, so the debounced watcher (`:177-181`) re-fires the same losing
request on every subsequent change.

**Reachable in two drags, and — worse — reachable without ever touching the offending slider.** The
parent scales `budget` *proportionally* when the harmonic count rises
(`EquationView.vue:154-157`: `ratio = budget/oldV; budget = Math.max(2, Math.round(v * ratio))`), and
that write bypasses `SliderControl`'s clamp entirely (the clamp at `SliderControl.vue:40,55` only guards
the slider's own emit). Concretely: set Harmonics = 30, set Display terms = 30 (legal, `:max` = 30),
then drag Harmonics to 100 → `ratio = 1` → `budget = 100` → next Compute 422s. The user is given no
signal that 50 is the wall.

**Falsifier.** Any of: (a) `:max` on `:217` clamped by 50, e.g. `Math.min(50, Math.max(2, …))`;
(b) `le=50` absent or ≥100 in `api/models/equations.py:23,40`; (c) a clamp between
`EquationView.vue:157` and the request body at `:110`. None hold — I read all three.
**Not falsifiable statically:** whether FastAPI's 422 body renders a *useful* string in the banner —
`UNPROVEN-NEEDS-LIVE (SS-13)`. The 422 itself is certain from the pydantic constraint.

### L-B2 — `parseDomainValue` guards finiteness on only one of its two return paths; `NaN`/`Infinity` enter the model

```
:47   const m = s.match(/^([+-]?\d*\.?\d*)\*?pi(?:\/(\d+))?$/);
:48   if (m) {
:49       const coeff = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : parseFloat(m[1]);
:50       const denom = m[2] ? parseInt(m[2]) : 1;
:51       return (coeff * Math.PI) / denom;      // ← NO finiteness check
:52   }
:53   const n = parseFloat(s);
:54   return Number.isFinite(n) ? n : null;      // ← the check, on the OTHER path
```

Two concrete escapes, both matching the regex:

- **`".pi"`** → `m[1] === "."` → not `""`, not `"+"`, not `"-"` → `parseFloat(".")` = **NaN** →
  returns `NaN`. (`".5pi"` is fine; deleting one character is not.)
- **`"pi/0"`** → `denom = 0` → returns **`Infinity`**.

Blast radius, all three consumers, all static:
1. **The field itself lies permanently.** `formatDomain` has no non-finite arm: `NaN/π` fails all five
   equality tests (`:64-68`), `Math.round(NaN*d)` = NaN fails the table loop (`:70-71`), so it falls to
   `:77` `val.toFixed(4)` → `"NaN"` / `"Infinity"`, and that is what the input renders.
2. **Every compute 422s.** `lib/api.ts:156` `body = JSON.stringify(rawBody)`; `JSON.stringify(NaN)` and
   `JSON.stringify(Infinity)` both emit `null`; `domain_start: float` / `domain_end: float`
   (`api/models/equations.py:18-19`) reject explicit `null` (a default only applies to an *absent* key).
3. **The viz goes blank.** `ConvergencePlot.vue:104` `omega = 2π/(domB − domA)` → NaN →
   `Math.cos(h.k * omega * x)` (`:144`, `:161`) → NaN → `Math.min(...oy, ...fullSum)` (`:164`) → NaN →
   every screen coordinate NaN → Canvas2D silently discards NaN path segments.

Session-scoped recovery exists only by retyping; the sessionStorage round-trip does self-heal on reload
(`JSON.stringify(NaN)` → `null` → `null ?? 0` → `0`, `useEquationCache.ts:26-29` + `EquationView.vue:26-27`),
which is luck, not design.

**Falsifier.** Move the `Number.isFinite` gate to a single exit, or reject `denom === 0` /
`Number.isNaN(coeff)`. Also falsified if the regex could not match `".pi"` — it can: `[+-]?` optional,
`\d*` matches empty, `\.?` matches `.`, `\d*` matches empty, then `pi`.

### L-B3 — no cross-field domain invariant: one keystroke produces `domainStart === domainEnd` and a silently blank canvas

FunctionInput owns both domain inputs (`:116-139`) and the compute trigger (`:147`), and asserts
**nothing** about their relation. Typing `0` into "Domain end" (default `π` or `2π`, `EquationView.vue:27`)
and blurring commits `domainEnd = 0` with `domainStart = 0`.

Downstream, statically certain in the frontend alone:
- `ConvergencePlot.vue:104` — `omega = 2π/0` = **Infinity**; `Math.cos(k·Infinity·x)` = **NaN**
  (`:144`, `:161`); `minY`/`maxY` NaN (`:164`); the plot renders nothing, with no error state.
- `composables/useCurveTransition.ts:70` — the *same* unguarded division, a second site.
- The plot surfaces this within one frame because Path B runs an **ungated** rAF that calls `draw()`
  every tick ([FE §6 Path B]; `ConvergencePlot.vue:60-71`, `:324` `playing.value = true`) — note the
  plot's watchers (`:308`, `:319`) do **not** watch `props.domain`, so the ungated clock is the only
  reason the corruption is even visible rather than latent.

Inverted domains (`end < start`) are equally unguarded: `omega` goes negative, `cos` is even and `sin`
is odd, so the reconstruction silently mirrors against the original curve — wrong, not blank, which is
worse.

**Falsifier.** A guard in `onDomainInput` (`:57-60`), a `watch` in `EquationView`, or a
`domain_end > domain_start` validator in `api/models/equations.py:16-23`. I read all three: none exists;
the pydantic model has only per-field defaults. **UNPROVEN-NEEDS-LIVE (SS-13):** the backend's exact
behaviour at `period = 0` — `integration.py:110` computes `omega = 2*sp.pi/T` where sympy yields `zoo`
rather than raising, and the tier-3 spline path over `np.linspace(a, a, 500)` was not executed. The
*frontend* NaN chain above needs no backend at all.

---

## §2 · MAJOR

### L-M1 — uncontrolled `:value` + `@change` + silent-reject parser ⇒ the visible domain lies about the computed domain

`:120/:121` and `:132/:133` bind one-way (`:value="formatDomain(...)"`) and commit on `@change`;
`onDomainInput` (`:57-60`) drops unparseable input on the floor — `if (val !== null) setter(val)`,
no else, no error, no `aria-invalid`.

The failure is a Vue-runtime certainty, not a guess: an unparseable edit performs **no reactive write**,
therefore **no re-render**, therefore no `value` patch — the rejected text stays in the DOM while the
model keeps its old value, and Compute silently uses the old value. Even a *successful* edit that
formats to the identical string (`"2*pi"` into a field already showing `"2π"`) leaves the un-normalized
text in place, because the vnode diff sees `prev === next` and skips `patchProp`.

**Reproduce (static, no browser needed to see it):** type `abc` — or `PI`, or `e`, all of which are
valid mathematical input in the sibling *expression* field per `parsing.py:37-39` — into "Domain start"
and blur. Model unchanged; DOM shows `abc`; the plot and the LaTeX are computed over the old domain.

**Falsifier.** A `v-model` with a normalizer, an `@blur` resync, a `:key` forcing re-render, or an
error affordance. None present. Compounds with **L-B2** (the escapes there produce a `"NaN"` string
that *does* stick, because it goes through the model) and with **L-M5** (untestable in place).

### L-M2 — the "Display terms" slider is handed a degenerate range and, separately, a value below its own `min`

`:216` `:model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"` · `:217` `:min="2"
:max="Math.max(2, vizHarmonics ?? nHarmonics)"`.

Two distinct defects in one binding pair:

1. **`min === max`** whenever the effective harmonic count ≤ 2. `Math.max(2, 1)` = 2 = `:min`. A
   zero-length range makes the universal slider position formula `(v − min)/(max − min)` a division by
   zero. The value reaches `reka-ui`'s `SliderRoot` unmodified — `SliderControl.vue:53-56` clamps only
   on `set`, never on `get`.
2. **`modelValue < min`.** With `nHarmonics = 1` (legal: `:184` `:min="1"`) the parent's guard sets
   `budget = Math.max(2, 1)` = 2 (`EquationView.vue:152-153`), while `:216` computes
   `Math.min(2, 1)` = **1** against `:min="2"`. The displayed value is then *never* the model value,
   and the chassis's numeric input is simultaneously `:min="2" :max="2" :value="1"`
   (`SliderControl.vue:72-78`) — HTML-constraint-invalid on its face.

Reachable with one drag of the Harmonics slider to its own minimum.
**Falsifier.** `Math.max(2, Math.min(budget, …))` on `:216`, or a `:min` derived from the same
expression as `:max`. **UNPROVEN-NEEDS-LIVE (SS-13):** the exact visual outcome (thumb at `-Infinity%`
vs. reka clamping and emitting a correction that loops back through `@update:model-value` on `:219`).
The invalid inputs are certain; the render is not.

### L-M3 — the Auto tooltip prints a number its own sentence forbids

`:200-207`:

> "**Auto (Parseval's theorem)** — Sets N to the minimum harmonics capturing ≥99.99% of total energy ‖f‖²."
> `N_eff = {{ effectiveN }} · {{ (energyCaptured * 100).toFixed(1) }}% energy`

`energyCaptured` is bound to `displayEnergy` (`EquationView.vue:206`), and after any simplify
`displayEnergy` is the **budget-truncated** energy (`EquationView.vue:139` ← `SimplifyResponse.energy_captured`
← `api/routers/equations.py:155` ← `simplification.py:60-64` `energy_fraction = kept_energy/total_energy`,
where `kept` is the top-`budget` terms). It is **not** the energy at `N_eff`.

So whenever `budget < effectiveN` — the default state, `budget` 10 vs `effectiveN` commonly 20-40 — the
tooltip renders e.g. `N_eff = 40 · 62.3% energy` directly beneath a sentence asserting ≥99.99%. The two
numbers are structurally incapable of being about the same series. This is a **correctness** defect, not
a copy nit: the pairing is what makes a user believe the auto-N is under-converging.

**Falsifier.** Bind a distinct `energyAtEffectiveN` (the compute-path `energy_captured`,
`EquationView.vue:115`), or drop the `· % energy` span. Falsified also if `simplify` returned full-series
energy — it does not (`simplification.py:60-64` reads `kept`).

### L-M4 — three inconsistent in-template derivations of "effective N", correct only by an invariant the component cannot see

| line | expression |
|---|---|
| `:183` | `autoHarmonics && vizHarmonics ? vizHarmonics : nHarmonics` |
| `:216` | `vizHarmonics ?? nHarmonics` |
| `:217` | `vizHarmonics ?? nHarmonics` |

One concept, three spellings, and `:216/:217` **ignore `autoHarmonics` entirely**. They agree with
`:183` only because `EquationView.vue:53-54` guarantees `vizHarmonics === nHarmonics` when auto is off.
Nothing in FunctionInput states that: the props are `autoHarmonics?: boolean` (`:15`) and
`vizHarmonics?: number` (`:17`), both optional, and the sole doc-comment (`:16`) documents the *opposite*
half — "may differ from nHarmonics when auto is on" — while saying nothing about the equality that the
Display-terms cap actually rests on. A second consumer that passes a `vizHarmonics` decoupled from
`nHarmonics` silently mis-caps `budget` and walks straight into **L-B1**.

**Falsifier.** A single named `computed` (`effectiveHarmonics`) used at all three sites, or a required
non-optional prop contract, or a doc-comment stating the invariant. None exist.

### L-M5 — colocation: a domain-notation library is trapped inside an SFC, where no runner can reach it

`parseDomainValue` (`:43-55`), `onDomainInput` (`:57-60`) and `formatDomain` (`:62-78`) are ~36 lines of
**pure**, component-free, framework-free functions. They are the tree's *only* domain-notation authority
(`grep -rln "parseDomainValue\|formatDomain" web/src` → `FunctionInput.vue` alone). They are non-trivial
(a regex parser, a rational-π table, an inverse pair) and they are **provably fallible** — L-B2, L-m7 and
L-m9 are all defects in these 36 lines and every one of them is a textbook unit test.

The cure is already the local pattern: this component's *siblings* externalize exactly this way —
`lib/equation/presets.ts` (the preset table) and `lib/equation/notation.ts` (`NOTATION_OPTIONS`,
`TIER_INFO`, `energyColor`). `lib/equation/` is the named, existing, correct home. Inside a `.vue` SFC
these functions cannot be imported by a node test at all — and the tree has **no unit runner** to begin
with (vitest ABSENT, [FE §0, §9]; the only gates are `vue-tsc` + 29 single-chromium Playwright tests),
which makes the colocation defect the *first* thing that must move when the F.W4 "unit-test floor
decision" (CENSUS §4 item 5) lands.

**Falsifier.** Another consumer of these helpers (none), or an existing test importing them (none), or
the absence of a `lib/equation/` home (it exists, with two precedents).

---

## §3 · MINOR

- **L-m1 · dead guards.** `:disabled="!effectiveN"` (`:193`) and `v-if="effectiveN"` (`:205`) can never
  be false in this tree: `compute_effective_n` returns `max(minimum=3, …)` on *every* exit
  (`simplification.py:68-98`, `minimum: int = 3` at `:71`), and the parent seeds the ref at 20
  (`EquationView.vue:41`). Dead code with one call site.
  *Falsifier:* a `compute_effective_n` return path bypassing `max(minimum, …)` — there is none: the two
  exits are `:96` `return max(minimum, k)` and `:98` `return max(minimum, max_k)`, plus the early
  `:83 return minimum`.

- **L-m2 · numeric-falsy guards.** `v-if="energyCaptured"` (`:207`) hides the row for a legitimate
  `energy_captured === 0`; `autoHarmonics && vizHarmonics` (`:183`) falls back to `nHarmonics` for a
  legitimate `vizHarmonics === 0`. Both should be `!= null`.
  *Falsifier:* a type excluding 0 — both are plain `number`.

- **L-m3 · contract asymmetry.** Six `defineModel`s (`:25-30`) plus **one** hand-rolled prop+emit pair
  for the seventh two-way value (`:15`, `:21`, `:33`), forcing the parent to hand-write
  `@update:auto-harmonics="autoHarmonics = $event"` (`EquationView.vue:209`) where the other six are
  `v-model:`. `toggleAuto` (`:32-34`) additionally conflates `undefined` with `false` via `!props.autoHarmonics`.
  *Falsifier:* a reason `autoHarmonics` cannot be a `defineModel<boolean>` — none; it is a plain boolean
  the parent stores in a plain `ref` (`EquationView.vue:42`).

- **L-m4 · triplicated defaults, already drifting.** `domainEnd` defaults to `2*Math.PI` here (`:27`)
  and to `Math.PI` in the parent (`EquationView.vue:27`) — already divergent. `nHarmonics` 20 /
  `budget` 10 / `notation` "trig" are duplicated verbatim across `FunctionInput.vue:28-30`,
  `EquationView.vue:28-30`, and `api/models/equations.py:20-23`. Three copies of one default set, and
  the copies do not agree.
  *Falsifier:* a shared defaults constant — `useEquationCache.ts` defines the *shape* (`:11-18`) but no
  defaults, so there is a home and it is unused.

- **L-m5 · `.preset-pill` is a fifth copy of an active-pill recipe the installed producer already ships
  — and CENSUS §3a's cure target does not exist.** `:241-248` (`border-radius: 9999px` +
  `color-mix(… 12%)` background + `color-mix(… 40%)` border + token colour) is byte-equivalent to
  `NotationPills.vue:38-45`, `BasisSelector.vue:269-272`, `GallerySearchBar.vue:214-219`,
  `GalleryCard.vue:271` / `GalleryCardModal.vue:209`. **I contradict the census here, twice:** (a)
  CENSUS §3a routes "NotationPills→`./chip`" — glass-ui **4.0.0 exports no `./chip`**; the real subpath
  is **`./toggle-chip`** (`node_modules/@mkbabb/glass-ui/package.json` exports; `ToggleChip` with
  `variant="chip"` and selected styling on `data-state="on"`, per its own d.ts header); (b) the F.W3
  budget names only NotationPills — `FunctionInput.vue:241-248` is an unbudgeted site of the same
  shadow. The cure is available at the *installed* version, not gated on the 4→7 uplift.
  *Falsifier:* `grep exports ./chip` in the installed manifest (absent), or a material difference
  between the two local recipes (there is none but the token name).

- **L-m6 · three `!important` fighting the design system.** `:250-253` overrides glass-ui's
  `variant="glass"` Button with `!important` on colour, border and background — a consumer-side
  specificity war against the producer, contrary to the standing glass-first law. The same button is a
  toggle with no `aria-pressed`, where `BasisSelector.vue:269` already demonstrates the
  `aria-pressed`-driven idiom in this very tree.
  *Falsifier:* a producer variant that cannot express an "active" state — `./toggle-chip`'s
  `data-state="on"` and `BasisSelector`'s `[aria-pressed="true"]` both prove otherwise.

- **L-m7 · the display/parse round-trip is lossy off the π-table.** `:77` `val.toFixed(4)` is the
  fallback for anything outside {0, ±π, ±2π} ∪ {nπ/d : d ∈ [2,3,4,6]}. `π/5` displays as `0.6283` and
  re-parses to `0.6283` — a 5.3e-5 absolute perturbation of the period that propagates into `omega`
  (`ConvergencePlot.vue:104`) and the backend `np.linspace` grid (`api/routers/equations.py:59`).
  *Falsifier:* extend the denominator table, or store the authored string alongside the number. Bounded
  and small — reported as MINOR, deliberately not inflated.

- **L-m8 · label/accessible-name mismatch.** `<label for="fn-domain-start">Domain</label>` (`:115`) is
  overridden by `aria-label="Domain start"` (`:119`), so the visible label is not the accessible name;
  the "Domain end" input (`:129-139`) carries an `aria-label` and **no** id/label association at all.
  *Falsifier:* WAI spec precedence of `aria-label` over `<label for>` — it wins. (Cross-axis with D.)

- **L-m9 · whitespace-stripping and case-sensitivity silently mis-parse.** `:45`
  `.replace(/\s+/g, "")` turns `"1 2"` into `12` and commits it. `.replace(/π/g,"pi")` is
  case-sensitive, so `"PI"`, `"Pi"`, `"E"` — all legal in the sibling expression field
  (`parsing.py:37-39`) — fall through `:53` to `null` and the silent-reject path of **L-M1**.
  *Falsifier:* an `i` flag or an alias table. Neither exists.

- **L-m10 · inconsistent commit semantics across three affordances of one form.** Enter computes in the
  expression field (`:102`); a preset click computes implicitly (`:40`); a domain edit commits on
  `change` and **never** computes, with no Enter handler. Three different contracts in one card.
  *Falsifier:* a domain watcher in the parent — `EquationView.vue:161-170` watches the domain only to
  write sessionStorage.

- **L-m11 · untyped colour token with no fallback.** `color="var(--viz-fourier)"` (`:185`, `:218`) is
  typed `color: string` (`SliderControl.vue:32`) and injected raw as `--track-color`
  (`SliderControl.vue:89`); a wrong token voids `color-mix(in srgb, var(--track-color) 25%, transparent)`
  (`SliderControl.vue:145-148`) and the range paints nothing, silently. No `var(--track-color, …)`
  fallback anywhere. Adjacent: `--viz-amber` (`:251-253`) is a **local WCAG-darken carry**
  (`web/src/style.css:113-125`) that [FE §3, §8] books as a glass-BH relay — this component is one of
  its consumers and should ride that relay.
  *Falsifier:* a token union type or a fallback in the `color-mix`. Neither.

- **L-m12 · inherited teardown gap + redundant prop, ×2.** Each `CollapsibleSection` mount (`:94`,
  `:176`) arms an uncancelled `setTimeout(…, 250)` inside a `watch` (`CollapsibleSection.vue:17-33`)
  with no `onUnmounted` clear. Damage is currently nil — the callback early-returns on
  `if (!el) return` (`:22`) — so this is hygiene, not a leak, and is reported as such. Separately,
  `:default-open="true"` at both call sites is dead: `withDefaults` already sets it
  (`CollapsibleSection.vue:11`).
  *Falsifier:* a `clearTimeout` in the composable (absent), or observable damage from the fire (none —
  hence MINOR, not MAJOR).

---

## §4 · SUPERLATIVES (L-18 both ways — same evidentiary bar)

- **S-1 · Zero leak surface, in a tree that has a documented ungated-clock problem.**
  `grep -n "onMounted\|onUnmounted\|onBeforeUnmount\|addEventListener\|setTimeout\|setInterval\|requestAnimationFrame\|new IntersectionObserver\|new ResizeObserver\|new MutationObserver\|getContext\|watch(" FunctionInput.vue`
  → **empty**. Against [FE §0]'s 20 rAF sites / 8 files and [FE §6 Path B]'s second **ungated** clock in
  its own sibling `ConvergencePlot.vue`, this 261-line panel contributes **nothing** to the teardown or
  clock surface. That is not the default in this codebase; it is a real property.
  *Falsifier:* any one of those tokens appearing in the file.

- **S-2 · Zero type escapes.** `grep -n "any\|@ts-" FunctionInput.vue` → **empty**. The single cast in
  the file is `(e.target as HTMLInputElement)` (`:58`) — the irreducible DOM-event narrowing, and the
  same one `SliderControl.vue:47` uses. No `as any`, no `as unknown as`, no suppression comment.
  *Falsifier:* any of those tokens.

- **S-3 · The user-facing physics copy is right where the backend's own comment is wrong.** The
  tooltip's "≥99.99% of total energy" (`:203`) matches the implementation exactly —
  `compute_effective_n(terms, threshold: float = 0.9999, minimum: int = 3)`
  (`src/fourier_analysis/symbolic/simplification.py:68-71`). Meanwhile `api/models/equations.py:35`
  documents the very same field as `# harmonics needed for ~99.5% energy`. On this one point the Vue
  component is the accurate authority and the Python model is stale.
  *Falsifier:* the `threshold` default. It is `0.9999`. (Defect filed against the backend comment, not
  against this component. Note this is *independent* of **L-M3**, which is about the number printed
  beside `N_eff`, not the threshold prose.)

- **S-4 · The π round-trip is exact across its entire declared table, and every shipped preset lands
  inside it.** I traced `formatDomain`/`parseDomainValue` (`:43-78`) as an inverse pair over
  {0, ±π, ±2π} ∪ {nπ/d : d ∈ [2,3,4,6]}: `3π/4 → "3π/4" → 3π/4`; `−2π/3 → "-2π/3" → −2π/3`;
  `π/3 → "π/3" → π/3`. The `\.?0+$` trailing-strip on `:77` is also correct under backtracking
  (`"100.0000" → "100"`, `"30.5000" → "30.5"`, `"0.0000" → "0"`) — the obvious greedy-regex bug is
  *not* present. And all eight `PRESETS` domains are `0`, `π`, `2π` or `−π` (`presets.ts:6,13,20,27,34,41,48,55`),
  so the preset → display → re-parse loop is lossless for every shipped path.
  *Falsifier:* a preset domain outside the table (none), or a rational in the table that fails to
  round-trip (I found none).

---

## §5 · INFO — the R5-7 template-loop invisibility class does **not** apply here (and this component is the proof)

- **L-i1.** FunctionInput's only template loop is `<Tooltip v-for="preset in PRESETS">` at **`:157`** — a
  **component** callsite, therefore fully visible to the deriver. It is in fact the deriver's *positive
  control*: the intake's R5-7 receipt cites the populated sibling leaf `instance.loop.presets` keyed
  `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0`
  (`lane-fourier-r3-r6.md` §3 R5-7), and `grep -n "v-for" FunctionInput.vue` in the live tree returns
  exactly `157` — the same line, corroborating R4-9 at file granularity. Its only looping child,
  `NotationPills.vue:18`, also loops on a **component** (`<Button v-for="opt in NOTATION_OPTIONS">`).
  **Native element loops in this subtree: zero. R5-7 exposure: zero.**
  *Falsifier:* a `v-for` on a native element anywhere in `FunctionInput.vue` or `NotationPills.vue` —
  `grep -n "v-for"` over both returns `FunctionInput.vue:157` and `NotationPills.vue:18` and nothing else.
  (Contrast `PaperSidebar.vue:65,87,105`, the three nested native `<li v-for>` that R5-7 is about.)

- **L-i2.** R3-7a's Tooltip migration budget records "FunctionInput 2". Verified live: `:157` and `:188`.
  Both route through the local thin adapter `components/ui/tooltip/Tooltip.vue`, which the census keeps
  (§3a "3 local `components/ui/` files are documented thin adapters, keep") — consistent, no contradiction.

- **L-i3.** The collapse state is the one piece of this panel's state that is **not** persisted:
  `useEquationCache.ts:11-18` caches six fields; `open` is a bare local ref
  (`CollapsibleSection.vue:14`) and `props.defaultOpen` is copied once and never re-synced. Collapsing
  "Function" and reloading loses it, while every value inside it survives.

---

## §6 · Method, scope and limits

- Read-only throughout. `/Users/mkbabb/Programming/fourier-analysis` was treated as evidence; no file in
  any repo was mutated except this one.
- Probes used: `cat` / `sed` / `awk` / `grep` / `wc` / `node -e` over the installed `@mkbabb/glass-ui`
  manifest and d.ts surface. **No browser tooling.** Three claims are marked
  `UNPROVEN-NEEDS-LIVE (SS-13)` and named inline: the rendered text of the 422 banner (L-B1), the
  sympy/numpy behaviour at `period = 0` (L-B3), and reka-ui's response to `value < min` with
  `min === max` (L-M2). Each is the *decorative* half of its finding; the load-bearing half of all three
  is static.
- Denominator hygiene per **X-9**: no percentage is claimed anywhere in this file. Counts are absolute
  and each carries its probe.
- Corpus folded, not re-invented: CENSUS-2026-08-03 §1/§3a/§4/§5 + its addendum; lane-frontend
  §0/§1/§3/§6/§8/§9; the adjudicated intake `lane-fourier-r3-r6.md` (R3-7a, R4-9, R5-7, X-9).
  **Explicit contradiction of the corpus: one** — CENSUS §3a's chip subpath and its F.W3 shadow budget
  (**L-m5**).
- Suggested routing: **L-B1 / L-B2 / L-B3 → F.W4** (the per-component D/L/C audit; L-B1 also touches the
  F.W5 contract surface since it is a client↔operation envelope mismatch of exactly the R6-8 shape —
  the client's range and the operation's constraint disagree, and today nothing on either side notices).
  **L-M5 → F.W4** as the first candidate for the vitest-floor decision. **L-m5 / L-m6 → F.W3**, folded
  into the R3-7a/shadow-retirement budget with the `./toggle-chip` correction.
