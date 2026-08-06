claude-opus-5[1m]

# CHALLENGE · `InfoCard` · axis **L (LIBRARY)**

**Target** `fourier-analysis/web/src/components/equation/InfoCard.vue` (43 lines, `6049995`
`refactor(A.W3.c): adopt MetricBadge cohort at GalleryAdminBanner + energy readouts`)
**Substrate** fourier-analysis working tree, read-only, **dirty** (27 pre-existing modified + 1 untracked,
including the uncommitted glass-ui 3.1→4.0 `amount`→`value` prop pass — see L-1). No writes to any
product source; `git status` verified unchanged by this pass.
**Method** static + source-derived only. No browser tooling. Every claim carries severity,
`file:line` provenance, and its falsifier with the falsifier's *status* (fired / discharged).
**Posture** DEFECTIVE-until-proven. Read whole: the component, all five of its imports, its
producer's compiled `MetricBadge`, its would-be host, the API contract that feeds its two props,
and the backend that emits them.

---

## §0 · Verdict

**8 defects · 1 BLOCKER · 3 MAJOR · 2 MINOR · 2 INFO · 3 superlatives.**

The component is **born-dead**. The string `InfoCard` has never appeared in any `.vue` or `.ts`
file in the entire git history of `fourier-analysis` — it was authored, committed, ledgered as an
adoption, censused as a live glass-ui consumer, and **never imported**. Everything it renders is
inlined verbatim 240 lines away in `EquationView.vue`, where the twins have already drifted apart.

The rest of the findings are real but subordinate: they are defects in a file that costs zero
shipped bytes and consumes real audit budget, gate risk, and ledger truth. That inversion — a
file with maximum audit surface and zero runtime surface — is the whole finding.

| # | Sev | Claim | Anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | Born-dead: zero importers in the entire history; still gates `vue-tsc` and falsifies two adoption ledgers | `InfoCard.vue:1-43` |
| L-2 | MAJOR | Verbatim duplication of the live inline twin at `EquationView.vue:283-302`; already diverged in three places | `InfoCard.vue:19-41` |
| L-3 | MAJOR | The tier contract is unguarded end-to-end; `?? TIER_INFO.spline` converts an unknown tier into a *specific false provenance claim* | `InfoCard.vue:13` |
| L-4 | MAJOR | The three tier colours are hard-coded twice inside one 48-line module; the two independently-derived colour channels collide in InfoCard's own header row with no legend | `notation.ts:25/30/36` vs `:45/46/47` |
| L-5 | MINOR | Colocation: `TIER_INFO` + `energyColor` squat in a module that declares itself "Notation pill definitions"; forces a false edge from `visualization/` | `notation.ts:3-8, 20, 44` |
| L-6 | MINOR | `unit` carries a 17-char clause, not a unit; the semantically correct `label` prop **silently no-ops** without `labelPosition`, so the obvious fix renders nothing | `InfoCard.vue:33` |
| L-7 | INFO | `lucide-vue-next` imported at runtime from `devDependencies` (concrete failure mode discharged by the Dockerfile) | `InfoCard.vue:3`, `package.json` |
| L-8 | INFO | glass-ui `MetricBadge` stamps `cursor-pointer` + focus ring on a non-interactive readout — upstream, BH relay | `MetricBadge-BpC0R_Ec.js` |

---

## §1 · The component, whole

```
 1  <script setup lang="ts">
 2  import { computed } from "vue";
 3  import { Info } from "lucide-vue-next";
 4  import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
 5  import { TIER_INFO, energyColor } from "@/lib/equation/notation";
 6  import type { EquationTier } from "@/lib/equation/types";
 8  const props = defineProps<{ tier: EquationTier; energy: number }>();
13  const info   = computed(() => TIER_INFO[props.tier] ?? TIER_INFO.spline);
14  const eColor = computed(() => energyColor(props.energy));
18  <div class="cartoon-card px-3 py-2 space-y-2">          ← surface
19    <div class="flex items-center gap-2 flex-wrap">       ← header row
20-30   <span … border-[1.5px]" :style="{ color-mix 15% / 30% / solid }">{{ info.label }}</span>
31-36   <MetricBadge :value="(energy*100).toFixed(1)" unit="% energy captured" size="sm" :color="eColor"/>
38    <div class="flex gap-1.5 items-start text-sm text-muted-foreground">
39      <Info class="h-3.5 w-3.5 shrink-0 mt-0.5" />
40      <p>{{ info.description }}</p>
```

Import closure read in full: `lib/equation/notation.ts` (48), `lib/equation/types.ts` (53),
`@mkbabb/glass-ui/metric-badge` → `dist/metric-badge.js` → `dist/MetricBadge-BpC0R_Ec.js` +
`dist/components/custom/metric-badge/MetricBadge.vue.d.ts` + `dist/utils/coalesceMetric.d.ts`,
`lucide-vue-next@1.0.0` `dist/esm/Icon.js`. Transitively: `lib/api.ts` (the `as T` boundary),
`api/models/equations.py`, `api/routers/equations.py`,
`src/fourier_analysis/symbolic/simplification.py`.

---

## §2 · Findings

### L-1 · **BLOCKER** — Born-dead. Never imported, in the entire history.

**Claim.** `InfoCard.vue` has no importer. Not today, and not at any commit that has ever existed
in this repository. It is not merely unreferenced — it was never referenced.

**Provenance.**

1. `grep -rn "InfoCard" web/src` → **0 hits**. (The file cannot match itself: its own 43 lines
   never spell its own name — no `defineOptions({name})`, no self-import.)
2. `git log --oneline -S"InfoCard" -- '*.vue' '*.ts'` → **empty**. Across all history, no commit
   ever changed the occurrence-count of the string `InfoCard` in any Vue or TS file. An
   `import InfoCard from "./InfoCard.vue"` — or a `components: { InfoCard }`, or a
   `<InfoCard>` tag — would necessarily have moved that count.
3. `git grep -l "InfoCard" $(git rev-list --all) -- '*.vue' '*.ts'` → **empty**. Blob-level
   confirmation across every reachable commit, not just the first-parent line.
4. No auto-registration path exists: `web/vite.config.ts:6-22` declares exactly two plugins —
   `latexPaperPlugin` and `vue()`. There is no `unplugin-vue-components`, no
   `app.component(...)` barrel, and `grep -rn "import.meta.glob" web/src` → **0 hits**.

Every mention of `InfoCard` in the repository lives in `docs/` — audit prose enumerating files,
never code importing them.

**Working-tree caveat, discharged — and it strengthens the finding.** The substrate is dirty
(27 modified + 1 untracked, uncommitted, pre-existing; I wrote nothing). Probes 2 and 3 read *committed*
history, so they could in principle miss an importer added in the working copy. Probe 1
(`grep -rn "InfoCard" web/src`) reads the **working tree** and returns 0, and
`git diff -- web/src | grep "InfoCard"` returns only the three diff-header lines for the file
itself. No importer exists in either state. **And the diff that *is* present is the sharpest
evidence in this document:**

```
 web/src/components/equation/InfoCard.vue
-                :amount="(energy * 100).toFixed(1)"
+                :value="(energy * 100).toFixed(1)"
```

That is the glass-ui 3.1→4.0 `amount`→`value` prop migration — the one lane-frontend.md:472 records
as "the WT diff already did `amount=` → `value=` for the 3.1→4.0 hop (9 lines)". **One of those
nine lines was spent on a component that renders nowhere**, by a migration pass that had no way to
know. This is L-1(b)'s cost mechanism observed in the wild, one uplift early: the file is invisible
to users and fully visible to every tool that walks `src/**`, so it collects migration debt at the
same rate as a live component while returning nothing. The 4→7 hop (`./metric-badge` → `./metric`,
plus another prop pass — lane-frontend.md:472) will charge it again unless it is deleted first.

**Mechanism → three distinct consequences.**

**(a) Ledger falsification.** `docs/tranches/A/audit/W3-adoption-ledger.md:36` records
`MetricBadge | @mkbabb/glass-ui | web/src/components/equation/InfoCard.vue:30 → energy-% readout |
adopted`. `docs/tranches/A/PROGRESS.md:385` totals "**13** `<MetricBadge>` adoptions across **8
files** … InfoCard.vue × 1". Both count a primitive adoption that renders on zero pixels of the
running application. The true live figure is **12 adoptions across 7 files**. A design-system
adoption census is a claim about what users see; this row is a claim about what the filesystem
contains. They were conflated.

**(b) It gates the only frontend type gate — while shipping nothing.** `web/tsconfig.json:19` is
`"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue", "env.d.ts"]`. TypeScript roots every
matched file regardless of the import graph, so `vue-tsc -b` (`package.json` `build`) typechecks
`InfoCard.vue` on every build. `InfoCard.vue:4` imports `@mkbabb/glass-ui/metric-badge` — a
subpath the census records as **removed at glass-ui 7.0.0** in favour of `./metric`
(lane-frontend.md:472; CENSUS §3a "removed subpaths in live use (`metric-badge` ×7 files)"). At
the atomic tri-package uplift (CENSUS §3a 🔴: `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` is
ONE transaction), this dead file hard-breaks `vue-tsc` exactly as a live one would. Meanwhile
Rollup never emits a byte of it — no importer, no module in the graph. **Maximum gate cost, zero
product value.** The correct disposition is `git rm`, not a prop-rename.

**(c) 43 lines of maintained liability**, including two of the ~57 tonal-accent sites the M-deep-audit
booked as the single largest glass-ui gap (`findings-index.txt:352`, `raw-findings.json:2776`
naming `InfoCard.vue:23-27`) and one of the 14 `.cartoon-card` shim consumers
(`web/src/style.css:98-112`, `InfoCard.vue:18`). Every recurring sweep re-reads it, re-counts it,
and re-books it.

**Falsifier** (four probes, all fired in the same direction; none discharged):
*(i)* any static or dynamic importer of the file → none, present tree **and** whole history;
*(ii)* a global/auto component registration → none, `vite.config.ts` has no such plugin and there
is no `app.component` barrel; *(iii)* a `import.meta.glob` sweep → 0 hits in `src`; *(iv)* a
narrowed `include`/`files` in tsconfig that would exempt it from `vue-tsc` → the include is a
`src/**` wildcard. Producing **one** importer kills the finding outright.

**Corpus contradiction (explicit).** lane-frontend.md:472 lists `InfoCard.vue:4` among "**7
imports / 6 files**" of the `./metric-badge` break surface, and CENSUS §2 **C-4** corrects that to
"seven distinct files … **Budget 7 files** for the `./metric` cure." **The file count is right;
the characterisation is wrong.** Six files are live consumers; the seventh is a corpse that the
typechecker still walks. C-4's *budget* survives (7 files must be edited, because `vue-tsc` roots
all seven) — but for a completely different reason, and the seventh edit should be a deletion.
Likewise lane-frontend.md:139 (`InfoCard.vue | 43 | Metric card (MetricBadge)`) and :442
(`equation/InfoCard.vue | 43 | ./card | uses MetricBadge inside a bespoke div`, i.e. a
migrate-to-`./card` candidate) both spend planning attention on a component with no host. The
`./card` migration row should be **struck**, not scheduled.

---

### L-2 · **MAJOR** — Verbatim duplication with the live twin, already diverged.

**Claim.** `InfoCard.vue:19-41` is a near-byte-identical copy of `EquationView.vue:283-302`. The
extraction was performed and the call site was never replaced, so the codebase now carries the
component *and* the inline original — and they have already drifted.

**Provenance — the pairing.**

| Element | `InfoCard.vue` | `EquationView.vue` |
|---|---|---|
| pill classes | `:21-22` `inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold border-[1.5px]` | `:285` — same tokens, same order |
| background | `:24` `color-mix(in srgb, ${info.color} 15%, transparent)` | `:287` `…${tierInfo.color} 15%…` |
| border | `:25` `… 30%, transparent` | `:288` `… 30%, transparent` |
| text | `:26` `color: info.color` | `:289` `color: tierInfo.color` |
| label | `:29` `{{ info.label }}` | `:291` `{{ tierInfo.label }}` |
| metric | `:31-36` `MetricBadge :value="(energy*100).toFixed(1)" size="sm" :color="eColor"` | `:292-297` `:value="(displayEnergy*100).toFixed(1)" size="sm" :color="eColor"` |
| description | `:38-41` `flex gap-1.5 items-start text-sm text-muted-foreground` + `<Info>` + `<p>` | `:299-301` — same, plus `mt-2` |

Both derive `tierInfo` identically: `InfoCard.vue:13` `TIER_INFO[props.tier] ?? TIER_INFO.spline`
vs `EquationView.vue:69` `result.value ? (TIER_INFO[result.value.tier] ?? TIER_INFO.spline) : null`
— the same expression, the same fallback, the same import line (`EquationView.vue:7` /
`InfoCard.vue:5`), the same `MetricBadge` import (`EquationView.vue:10` / `InfoCard.vue:4`).

**Provenance — the drift** (three divergences, all in the copy that ships nowhere):

1. `InfoCard.vue:33` `unit="% energy captured"` vs `EquationView.vue:294` `unit="% energy"`.
2. `InfoCard.vue:39` `class="h-3.5 w-3.5"` vs `EquationView.vue:300` `class="size-3.5"`.
3. Container: `InfoCard.vue:18` `cartoon-card px-3 py-2 space-y-2` (an opaque card surface) vs
   `EquationView.vue:282` `HoverCardContent class="info-hovercard"` + an explicit `mt-2` on the
   description row (a floating hover-card behind a `Button variant="glass" size="icon"` trigger at
   `:276`).

**Consequence.** The naive cure implied by lane-frontend.md:442 — "revive InfoCard, migrate it to
`./card`, have EquationView use it" — silently changes the live UI's unit string from
`% energy` to `% energy captured` and re-hosts a hover-card's content inside a `cartoon-card`
surface it was never designed for. Any future fix applied to one twin (a prop rename at the
7.0.0 uplift, a contrast correction, an aria addition) will miss the other, and only one of the
two misses is visible to a human.

**Falsifier.** If `EquationView.vue` imported `InfoCard` (it does not — L-1 probe 1), or if the
two blocks differed structurally rather than cosmetically (they do not — the table above pairs
every element), or if the duplication were a deliberate variant with a documented rationale
(no comment in either file marks it as such; `EquationView.vue:273` says only
`<!-- Info hover card -->`). Not discharged.

---

### L-3 · **MAJOR** — The tier contract is unguarded end-to-end, and the fallback lies.

**Claim.** `InfoCard.vue:13`'s `?? TIER_INFO.spline` is the **only** runtime guard on the tier
vocabulary anywhere in the stack — and instead of resolving an unknown tier to a neutral or
unknown state, it resolves it to a *specific, confident, false claim about how the coefficients
were computed*.

**Provenance — the chain has no other guard.**

- **Producer.** `api/models/equations.py:28` — `tier: str  # "symbolic" | "identified" | "spline"`.
  The vocabulary is a **comment**, not a `Literal`, not an `Enum`, not a Pydantic `pattern`.
  Contrast the *request* side four lines up, `:22`:
  `notation: str = Field(default="trig", pattern=r"^(trig|exponential|polar)$")` — the same file
  proves the author knew how to constrain a string vocabulary and did not do it for `tier`.
- **Wire.** `web/src/lib/api.ts:191` — `return { data: (await res.json()) as T, etag, response: res }`.
  An unchecked cast. There is no schema validator in `web/src` on this path.
- **Consumer type.** `web/src/lib/equation/types.ts:2`
  `export type EquationTier = "symbolic" | "identified" | "spline"` — a union the compiler
  believes because of the cast above, not because anything checked.
- **Lookup table.** `notation.ts:20-22` —
  `export const TIER_INFO: Record<string, { label; color; description }>`. Keyed by **`string`**,
  not by `EquationTier`. The union therefore buys **zero** exhaustiveness: adding a fourth member
  to `EquationTier` produces no error in `notation.ts`, and `TIER_INFO` may be missing rows
  forever without the compiler noticing.
- **Index-access strictness.** `web/tsconfig.json` sets `"strict": true` but
  `grep -rn "noUncheckedIndexedAccess" web/tsconfig*.json` → **0 hits**. So
  `TIER_INFO[props.tier]` is typed **non-optional**, and the `??` at `:13` carries no type
  information at all — it is invisible to the checker while being fully live at runtime. The
  worst of both: no static value, full dynamic reach.

**Mechanism.** A tier the frontend does not know — a new backend tier, a rolled-back deploy, a
proxy rewriting the body, a cached response from an older/newer API — flows through the cast
untouched, misses `TIER_INFO`, and lands on `TIER_INFO.spline`. The UI then renders, in red, with
full confidence: **"Approximate"** and *"Coefficients computed numerically via cubic-spline
integration, truncated to the top terms by amplitude."* (`notation.ts:33-37`). That is a specific
factual assertion about numerical method and truncation policy, made about a computation the
frontend has just admitted it cannot identify. For a component whose *entire purpose* is
provenance disclosure — Exact / Conjectured / Approximate — a fallback that fabricates provenance
is the exact wrong failure mode. The right posture is a neutral "Unknown tier" row (or a thrown
boundary error), never a confident wrong one.

**Consequence for the fixer.** The natural cure — retype as
`Record<EquationTier, {…}>` — makes the fallback *provably* unreachable and the compiler will then
demand a row per union member. That is correct, and it is also why the current typing must go:
today the union is decorative.

**Falsifier.** *(i)* A runtime validator on the response → none (`api.ts:191` `as T`; no
zod/valibot/ajv in `web/package.json`). *(ii)* A producer-side `Literal`/`Enum`/pattern → none
(`api/models/equations.py:28` is a bare `str`; the request-side `pattern` at `:22` is the control).
*(iii)* `noUncheckedIndexedAccess` enabled, which would at least surface the guard → not set.
*(iv)* A fourth tier already emitted → **NOT today**: `api/routers/equations.py:69/74/85` assign
exactly `"symbolic"`, `"identified"`, `"spline"` and there is no other writer. **This much is
honest: the trigger is latent, not live.** The defect is the contract shape and the lying
fallback, both of which are live now; the wrong render requires a fourth tier. If the tier
vocabulary is frozen forever, downgrade to MINOR — but nothing in the tree freezes it, and
`routers/equations.py:33` ("Tries three tiers") reads as a design that expects to grow.

---

### L-4 · **MAJOR** — The tier palette is written twice in one 48-line module, and the two colour channels collide on screen.

**Claim.** `notation.ts` hard-codes the same three HSL literals in two independent places, and
`InfoCard.vue:19-37` renders both encodings **side by side in one flex row** with no legend, where
they routinely disagree.

**Provenance — byte-identical duplication.**

| Semantic | `TIER_INFO` | `energyColor` |
|---|---|---|
| green | `notation.ts:25` `hsl(142, 71%, 45%)` (symbolic / "Exact") | `notation.ts:45` `hsl(142, 71%, 45%)` (`e >= 0.99`) |
| amber | `notation.ts:30` `hsl(38, 92%, 50%)` (identified / "Conjectured") | `notation.ts:46` `hsl(38, 92%, 50%)` (`e >= 0.95`) |
| red | `notation.ts:36` `hsl(0, 84%, 60%)` (spline / "Approximate") | `notation.ts:47` `hsl(0, 84%, 60%)` (else) |

Three literals, six occurrences, one 48-line file, no shared constant, no token. Change the amber
in one and the other silently diverges — and nothing in the tree would catch it (no vitest at all:
CENSUS §3a "**vitest ABSENT** — the only frontend gates are `vue-tsc` + 29 Playwright tests").

**Mechanism — the on-screen collision.** `InfoCard.vue:20-30` paints the pill with
`info.color` (a function of **tier**, i.e. *method provenance*). `InfoCard.vue:31-36` paints the
`MetricBadge` value with `eColor` (a function of **energy**, i.e. *truncation fidelity*). Two
orthogonal quantities, one shared three-colour alphabet, adjacent in the same `flex items-center
gap-2` row. The pairs are independent, so they disagree freely:

- `tier="symbolic"` (green pill, "Exact") + `energy = 0.90` → **red** badge. A closed-form-exact
  series shown next to a red danger signal.
- `tier="spline"` (red pill, "Approximate") + `energy = 0.999` → **green** badge. A red pill next
  to a green one, in a card whose only text is the red pill's description.

A reader has no way to know the two greens mean different things. `energyColor`'s cut-points
(`0.99`, `0.95`, `notation.ts:45-46`) are also bare magic numbers with no name and no comment,
and no relation to `compute_effective_n`'s `threshold=0.9999`
(`src/fourier_analysis/symbolic/simplification.py:69`) — three fidelity thresholds in the system,
none reconciled.

**Falsifier.** If the palettes differed (they are character-for-character identical — compare
`notation.ts:25` to `:45`); if a legend or label disambiguated the two channels (`InfoCard.vue`
has no legend; the pill's only annotation is `info.label`, the badge's only annotation is the
`unit` string); if one channel were monochrome. Not discharged. The duplication half is
mechanical and certain; the collision half is a design consequence stated from the source and
would be sharpened by a live render (SS-13, see §6).

---

### L-5 · **MINOR** — Colocation: `TIER_INFO` and `energyColor` squat in a module that declares itself something else.

**Claim.** `notation.ts:3-8` opens with a docblock describing **only** `NOTATION_OPTIONS`
("Notation pill definitions with LaTeX-style icons and colors, matching the `.basis-toggle`
pattern from BasisSelector…"). `TIER_INFO` (`:20`, tier *provenance* vocabulary) and
`energyColor` (`:44`, a numeric→colour threshold ladder) have nothing to do with notation modes,
and the module's own self-description does not cover them.

**Consequence — a false dependency edge.** `InfoCard.vue:5` imports a module named *notation* for
two symbols that are not about notation, and never touches `NOTATION_OPTIONS`. Worse,
`web/src/components/visualization/EquationPanel.vue:6` imports
`{ energyColor } from "@/lib/equation/notation"` — the visualization tree now depends on the
equation-notation module for a colour ladder. The only genuine consumer of `NOTATION_OPTIONS` is
`components/equation/NotationPills.vue:3,18` (`grep -rn "NOTATION_OPTIONS" web/src` → 2 hits, one
file). So the module has one real notation consumer and three unrelated tier/energy consumers.
The Goldilocks split is `notation.ts` (notation pills) + `tier.ts` (`TIER_INFO` + `energyColor` +
the shared palette L-4 asks for), and it also gives L-4's duplication one obvious home.

**Falsifier.** If any consumer imported notation symbols *and* tier symbols together — none does
(`NotationPills.vue` imports only `NOTATION_OPTIONS`; `InfoCard.vue:5` and `EquationView.vue:7`
import only `TIER_INFO, energyColor`; `EquationPanel.vue:6` imports only `energyColor`). If the
docblock covered the module rather than one export — it does not (`:3-8`, scoped explicitly to
the pill definitions). Not discharged.

---

### L-6 · **MINOR** — `unit` carries a clause, not a unit; and the correct prop silently no-ops.

**Claim.** `InfoCard.vue:33` passes `unit="% energy captured"` — a 17-character noun phrase — into
a prop the producer documents as a unit suffix, and the semantically correct prop (`label`) is
inert unless a second prop is also set, so the obvious fix renders nothing.

**Provenance.** glass-ui 4.0.0 `dist/utils/coalesceMetric.d.ts:12-13`: *"Unit suffix appended
after the value (e.g. `"Mbps"`, `"ms"`)."* `MetricBadge.vue.d.ts:8-11` documents `label` as the
*"Full annotation slot… Tracked uppercase, muted."* The compiled renderer
(`dist/MetricBadge-BpC0R_Ec.js`) puts `unit` in
`<span class="metric-badge__unit font-mono text-muted-foreground shrink-0">` at the size ladder's
`text-micro` for `size="sm"` — i.e. a 17-char clause typeset as a monospace unit token at the
smallest rung, hard against a `.toFixed(1)` value, inside a `flex-wrap` row
(`InfoCard.vue:19`) whose wrap point nothing controls.

**The trap.** The correct migration is `unit="%"` + `label="energy captured"`. But
`MetricBadge.vue.d.ts:24-27` is explicit: *"When unset, the label slot does not render even if
`label`/`abbreviation` carry values"* — and the compiled guard confirms it,
`b = i(() => !!(c.labelPosition && (c.abbreviation || c.label)))`. So
`label="energy captured"` **without** `labelPosition="inline"` renders **nothing at all**, with no
warning, no type error (`labelPosition?` is optional), and no test to catch it (vitest absent).
The live twin at `EquationView.vue:294` already shortened this to `unit="% energy"` — still a
clause, just a shorter one — which is evidence the friction was felt and worked around rather
than fixed.

**Falsifier.** If `unit` were documented as free-text annotation → it is not
(`coalesceMetric.d.ts:12-13`). If `label` rendered without `labelPosition` → it does not
(`MetricBadge.vue.d.ts:24-27` + the compiled `b` guard). Not discharged.

---

### L-7 · **INFO** — Runtime import from `devDependencies`. Concrete failure mode discharged.

`InfoCard.vue:3` `import { Info } from "lucide-vue-next"` is a runtime import.
`web/package.json` places `lucide-vue-next: ^1.0.0` in **`devDependencies`**, not
`dependencies` — as it also does for `reka-ui`, `class-variance-authority`, `clsx`, and
`tailwind-merge`, all of which are runtime concerns. The classification is wrong on its face.

**Falsifier — fired against me.** The concrete break (`npm ci --omit=dev` in a production image
strips the package and the Vite build fails to resolve the specifier) **does not occur here**:
`web/Dockerfile:10` is a bare `RUN npm ci`, with no `--omit=dev` / `--production`, and the
`builder` stage inherits from `deps` and runs `npm run build` with dev deps present
(`Dockerfile:16-29`). The nginx `production` stage copies only `/app/dist`. So the misclassification
is inert **for this Dockerfile**, and would only bite a consumer who tightened the install flag —
the standard hardening move. Reported at INFO, not MINOR, precisely because its falsifier fired.
Not InfoCard's defect alone; it is a `package.json` hygiene row that InfoCard exercises.

---

### L-8 · **INFO** — Upstream: `MetricBadge` advertises interactivity it does not have.

glass-ui 4.0.0's compiled `MetricBadge` root is
`cn("metric-badge cursor-pointer", "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", …)`
(`dist/MetricBadge-BpC0R_Ec.js`) — `cursor-pointer` and a focus ring stamped **unconditionally**,
with no `tabindex`, no `role`, no emitted events, and no handler in the component. Rendered inside
`InfoCard.vue:31-36`, a pure readout, the energy figure shows a hand cursor and promises a click
that does nothing. The focus-visible ring is unreachable (the div is not focusable), so it is dead
CSS on top.

This is a **producer** defect at 4.0.0, not fourier's. Route to the glass-ui BH inbox per the
standing relay law (every component/glass-ui-level change relayed to the active BH inbox at root).
Note it may already be cured at 7.0.0 — the uplift renames this surface to `./metric` (`Metric`)
per lane-frontend.md:472 — so the relay should ask, not assert.

**Falsifier.** An interactive ancestor that would justify the affordance — `InfoCard.vue:18-19`
are plain `div`s with no handler, no `role`, no `tabindex`. Not discharged (for 4.0.0).

---

## §3 · Superlatives — L-18 runs both ways

### S-1 · Zero teardown surface. Nothing to leak, by construction.

`grep -cE "onMounted|onUnmounted|addEventListener|requestAnimationFrame|watch\(|canvas|getContext|WebGL"
web/src/components/equation/InfoCard.vue` → **0**. No lifecycle hook, no listener, no timer, no
observer, no rAF, no watcher, no ref to a DOM node, no `provide`/`inject`. The component is two
`computed`s over two props and a template. In a tree the census flags for **ungated rAF clocks**
(CENSUS §3a: "the two rAF clocks themselves are **ungated under `prefers-reduced-motion: reduce`**";
`ConvergencePlot.vue` "with its own ungated rAF"), a component with a provably empty teardown
obligation is worth naming. **Falsifier:** any of the eight greps above returning non-zero, or a
transitive subscription inside `MetricBadge` — the compiled `MetricBadge-BpC0R_Ec.js` is likewise
pure `computed` + render, no hooks. Holds.

### S-2 · Correct props reactivity, without leaning on sugar.

`InfoCard.vue:13-14` read `props.tier` / `props.energy` **inside** the computed getters rather than
destructuring at setup top level. This is correct under every Vue version — it does not depend on
3.5's reactive-props-destructure transform, and it survives a `<script setup>` → `defineComponent`
refactor unchanged. The failure mode it avoids (`const { tier } = defineProps()` captured into a
non-reactive closure) is the single most common props bug in Vue SFCs. **Falsifier:** a
destructure feeding a non-computed read — none present.

### S-3 · The right extraction, at the right size. The bug is that nobody imported it.

Two required props, no optionals, no `withDefaults`, no emits, no slots, no `provide`/`inject`, no
store access, no fetch — a pure function of `(tier, energy) → markup`. 43 LOC against a directory
whose median SFC is ~101 (lane-frontend.md:139 table: 469 / 410 / 261 / 247 / 146 / 101 / 97 / 80 /
47 / **43** / 17). Goldilocks-centred, honest contract, trivially testable. It is the *correct*
decomposition of the 20-line blob currently inlined inside a 469-line `EquationView`. **This is
what makes L-1 sting:** the extraction was done well and then abandoned at the last step — the call
site was never replaced. The cure for L-1 is therefore genuinely two-way: delete it, **or** finish
the job at `EquationView.vue:283-302` (paying L-2's three divergences deliberately). What is not
defensible is the present state: both, forever, drifting.

---

## §4 · R5-7 applicability — N/A here, and the mirror class this component reveals

**R5-7 does not apply.** `grep -c "v-for" web/src/components/equation/InfoCard.vue` → **0**. The
component renders no list, native or component. The intake's R5-7
(`lane-fourier-r3-r6.md:125`, **ADOPT-AS-FACT**, `instance.loop.paper-sidebar` = `[]` because
"template-loop evidence keyed to *component* callsites is blind to native HTML element loops",
cured by R6-5's `NATIVE_TEMPLATE_LOOP` family at `lane-fourier-r3-r6.md:139`) cannot bite a
component with no loops. Stated for completeness so the F.W4 per-component sweep can mark this row
closed rather than unexamined.

**But InfoCard exhibits R5-7's exact dual, and F.W4 must count it.** The two are the same root
defect seen from opposite ends:

| | R5-7 (`PaperSidebar.vue`) | This row (`InfoCard.vue`) |
|---|---|---|
| Tree says | 3 native `li v-for` at lines 65 / 87 / 105 | 0 callsites, ever |
| File/AST derivation says | (blind — no component callsite) | **1 component**, 43 LOC, 1 `MetricBadge` adoption |
| Instance derivation says | `leafValues["instance.loop.paper-sidebar"]` = `[]` | `[]` — *correctly*, and nobody reads it |
| Error direction | **undercount** — real UI invisible | **overcount** — phantom UI counted |
| Symptom | a mutation cannot reach its declared predicate | a budget, a ledger row, and a gate cost with no user |

R5-7's signature is an **empty leaf beside a populated tree**. InfoCard's signature is a
**populated file-census beside an empty leaf** — literally the same `[]`, read as noise instead of
as signal. R6-5 cured direction one by teaching the deriver to see native element loops. Direction
two needs the reciprocal check: **a component file with zero instance callsites is not a component,
it is a corpse**, and any derivation that reconciles the two registries would have surfaced
InfoCard the moment both were computed.

Concretely for F.W4: the intake's carry ("F.W4's per-component D/L/C audit must count native
element loops or it will inherit exactly this blind spot", `lane-fourier-r3-r6.md:125`) should be
extended — the audit is currently *seeded from the file enumeration* at lane-frontend.md:139,
which is the overcounting side. Seeding from files alone spends a full four-axis challenge budget
on a component with no host (this document is the proof-of-cost). The reconciliation is cheap and
mechanical: **join the file census against the instance registry; every file with zero callsites is
a deletion candidate before it is an audit candidate.** Applied across fourier's 66 SFCs, that join
is one query and would have caught this in the formation phase.

---

## §5 · The viz render path — a deliberate negative finding

The census pins fourier's viz architecture (CENSUS §3a, folding lane-frontend §6):
*"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument
reactive-redraw off a store rAF clock; **ConvergencePlot with its own ungated rAF**; FrequencyGraph
watch-driven) + 12 SVG surfaces."* Lane-frontend.md:139 sizes the two canvases in this directory:
`ConvergencePlot.vue` **410** LOC and `FrequencyGraph.vue` **247** LOC, both flagged Canvas2D.

**InfoCard touches none of it.** Zero `canvas`, `getContext`, `WebGL`, `requestAnimationFrame`, or
`ctx` references (§3 S-1 grep). Its only coupling to the render path is one scalar — `energy` —
and I checked whether that scalar is frame-driven, because a per-frame prop into a
`.toFixed(1)` + `color-mix` render would be a genuine render-path defect.

**It is not.** In the would-be host, the energy source is `EquationView.vue:40`
`const displayEnergy = ref(cachedRes?.energy ?? 1)` — a plain `ref` written at exactly two sites,
both post-response: `:115` (`displayEnergy.value = result.value.energy_captured`) and `:139`
(`= resp.energy_captured`). It is read at `:70` (`eColor`), `:120`/`:141` (cache save), `:206`
(`:energy-captured=` to the controls), and `:293` (the twin badge). The directory's rAF tween,
`composables/useCurveTransition.ts`, contains **no** reference to energy
(`grep -n "energy" useCurveTransition.ts` → 0 hits) — it tweens the plotted curve, not the scalar.
So even fully wired, InfoCard would re-render **O(1) per compute**, not per frame.

**Falsifier for the negative:** a watcher, rAF driver, or `useCurveTransition` output feeding
`displayEnergy`; or a canvas/WebGL reference in InfoCard's import closure. Checked all four; none.
Recorded so the F.W4 render-path sweep can mark InfoCard **out of scope with cause** rather than
leaving it ambiguous — and so the census's ungated-rAF carry is not mistakenly widened to this
directory's static surfaces.

---

## §6 · Falsified candidates — hypotheses I hunted and killed

Recorded because L-18 runs both ways and because each was individually plausible from the source.

- **FC-1 · "The decorative `Info` glyph lacks `aria-hidden`."** `InfoCard.vue:39` passes no a11y
  prop. **Killed:** `lucide-vue-next@1.0.0` `dist/esm/Icon.js` appends
  `...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }` — the icon
  auto-hides when it has no slot and no a11y prop, which is exactly this call. The `<p>` at `:40`
  carries the text. No defect.
- **FC-2 · "`energy` is unvalidated; `NaN` renders as the literal string `NaN`."** The wire has no
  runtime check (`api.ts:191` `as T`), and `NaN.toFixed(1)` → `"NaN"`, with `energyColor(NaN)`
  falling through both comparisons to red. **Killed at the producer:**
  `src/fourier_analysis/symbolic/simplification.py:62` —
  `energy_fraction = kept_energy / total_energy if total_energy > 0 else 1.0` — the division is
  guarded, so `NaN` is not emitted. (Note in passing, INFO-grade and out of scope for this axis:
  the `else 1.0` branch means a **degenerate all-zero series reports "100.0% energy captured" in
  green**. That is an api-side semantic, referred, not charged here.)
- **FC-3 · "A production install drops `lucide-vue-next` and the build fails."** **Killed:**
  `web/Dockerfile:10` is `RUN npm ci` with no `--omit=dev`. Downgraded L-7 to INFO. See §2 L-7.
- **FC-4 · "The dead file bloats the CSS bundle via Tailwind v4 content scanning."** **Killed by
  measurement:** every utility class InfoCard uses also appears in live files —
  `grep -rl` excluding InfoCard gives `h-3.5 w-3.5` → 14 files, `gap-1.5` → 18, `mt-0.5` → 3,
  `rounded-full` → 16, `cartoon-card` → 14, `border-[1.5px]` → 6. No class is unique to the corpse;
  emitted CSS delta ≈ 0. (JS delta is exactly 0 — with no importer, Rollup never sees the module.)
- **FC-5 · "`info.color` is interpolated raw into a CSS `color-mix()` string — injection."**
  `InfoCard.vue:23-27` builds CSS by template literal. **Killed:** `TIER_INFO` is a module
  constant (`notation.ts:20-38`); no user- or API-supplied value reaches those interpolations.
  (Would become live if `TIER_INFO` were ever server-driven — noted only as a constraint on future
  edits.)

**UNPROVEN-NEEDS-LIVE (SS-13).** Almost nothing here needs a browser, because the component does
not render anywhere — that is itself the finding, and it is proved statically. Two items would be
sharpened by a live pass **only after** a decision to revive: (a) L-4's colour-collision legibility
(two adjacent green/amber/red channels with disagreeing semantics — needs eyes, not greps);
(b) L-6's wrap behaviour for the 17-char `unit` clause inside the `flex-wrap` header row at
narrow widths. Both are deferred, not claimed.

---

## §7 · Corpus reconciliation

**Folded, not re-derived** (cited, relied upon, unchallenged):

- CENSUS-2026-08-03 §3a frontend shape, glass posture, the Canvas2D/no-WebGL viz architecture, the
  ungated-rAF carry, **vitest ABSENT** (the reason L-4's silent-divergence risk has no net), and
  the 🔴 tri-package resolution deadlock that makes the 4→7 uplift atomic — the frame for L-1(b).
- lane-frontend.md:139 (the `equation/` size table, used for S-3's Goldilocks baseline), :268 (the
  `metric-badge` import line), :442 (the shadow/`./card` candidate row), :472 (the removed-subpath
  break surface).
- `lane-fourier-r3-r6.md:125` **R5-7** and `:139` **R6-5** — both **ADOPT-AS-FACT**, both taken as
  given; §4 builds the mirror class on top of them rather than re-litigating either.
- The M-deep-audit tonal-accent finding (`findings-index.txt:352`,
  `raw-findings.json:2776` naming `InfoCard.vue:23-27` among ~57 sites) and the `.cartoon-card`
  resurrection shim (`web/src/style.css:98-112`, the D.W4.a carry) — cited as context for L-1(c),
  not re-counted.

**Contradicted, explicitly:**

1. **lane-frontend.md:472 + CENSUS §2 C-4** — "`./metric-badge` removed | **7 imports / 6 files**"
   / "The seven listed sites are seven distinct files … **Budget 7 files** for the `./metric` cure."
   **Six of the seven are live. `InfoCard.vue:4` is the seventh and it has no host.** C-4's
   file-count arithmetic and its budget both survive (all seven are `vue-tsc` roots per
   `tsconfig.json:19`), but the row's premise — that these are seven *adoptions* — is false, and
   the seventh edit is `git rm`, not a prop rename.
2. **lane-frontend.md:442** — `equation/InfoCard.vue | 43 | ./card | uses MetricBadge inside a
   bespoke div`, scheduling a migrate-to-`./card`. **Strike the row.** You cannot migrate a
   component with no call site to a producer primitive; you can only delete it, or first wire it
   (paying L-2's three divergences) and then migrate. The row as written schedules work whose
   output nobody would see.
3. **`docs/tranches/A/audit/W3-adoption-ledger.md:36` + `docs/tranches/A/PROGRESS.md:385`**
   (fourier-side, tranche A) — "MetricBadge … `InfoCard.vue:30` → energy-% readout | **adopted**"
   and "**13** adoptions across **8 files**". **The true live figures are 12 across 7.** Flagged
   here because the megatranche folds fourier's own ledgers as evidence; this row is a
   file-existence claim wearing an adoption claim's clothes.

---

## §8 · Disposition

**One decision unblocks seven of the eight findings.** Delete `InfoCard.vue`, and L-1, L-2, L-6,
L-7, and L-8 evaporate; the `./metric-badge` budget drops to six files; lane-frontend.md:442's
`./card` row is struck; the A-ledger corrects to 12/7. L-3 and L-4 survive deletion — they live in
`notation.ts` and are load-bearing for `EquationView.vue:69-70` and `EquationPanel.vue:38`, which
*do* render. Those two should be re-homed to the live twin's challenge.

The alternative — finish the extraction at `EquationView.vue:283-302` — is defensible and S-3
argues it is the better design. It costs L-2's three deliberate divergences plus a hover-card /
`cartoon-card` surface reconciliation. What is indefensible is the status quo: two copies, one
invisible, drifting, both billed to every sweep.

**Recommended precedence:** L-1 (delete) → L-3 + L-4 re-homed to `EquationView`/`notation.ts` →
L-5 (split `tier.ts` out of `notation.ts`, which gives L-4's shared palette a home) → L-8 relayed
to the glass-ui BH inbox → L-7 booked as a `package.json` hygiene row → §4's file/instance
registry join adopted as an F.W4 seeding rule.
