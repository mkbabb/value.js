# CHALLENGE-C — `ApiOfflineChip.vue` · implementation is defective

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]` — the tier this seat
was explicitly spawned with. Declared, not inherited.

**Subject** `demo/palettes/browser/status/ApiOfflineChip.vue` (91 lines · area `palettes`)
**Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u`
**HEAD at audit** `06377848` (the brief cited `c654824e`; the tranche moved under the workflow —
the subject file is byte-identical at both, `git log --oneline -1 -- demo/palettes/browser/status/ApiOfflineChip.vue`
shows no commit since T.W6)
**Live probes** dev server `http://localhost:9000` (Playwright, read-only; all mutations reverted —
see §Probe hygiene)

**VERDICT: DEFECTIVE.** Ten findings — 1 BLOCKER, 4 MAJOR, 3 MINOR, 2 INFO. The component renders a
surface the owner has ordered dead (MT-F031/OM-5), it renders it *ungated in production bundles*
where its dedicated sibling is gated, it gates the honest-degradation surface on unrelated
application state, it breaks 200 % text resize, and **not one line of it is under test** — a
mutation that deletes half the template keeps every gate green.

---

## 1. What the file actually is, measured

38 lines of script+template, 51 of scoped CSS. Two `computed`s over one injected `Ref`. No props, no
emits, no lifecycle, no async, no listeners, no timers, no rAF.

```
demo/palettes/browser/status/ApiOfflineChip.vue:35-37
const { availability } = useApiClient();
const offline = computed(() => availability.value === "unavailable");
const misconfigured = computed(() => availability.value === "misconfigured");
```

I mounted it in isolation against the live app's own module instances (same `/@fs/…` specifiers →
same module records, verified via `performance.getEntriesByType('resource')`) and drove the latch
through all four `ApiAvailability` states. **Measured render matrix:**

| `availability` | rendered? | `role` | text | box | computed `font-size` | dot animation |
|---|---|---|---|---|---|---|
| `"unknown"` | **no** (`<!--v-if-->`) | — | — | — | — | — |
| `"available"` | **no** (`<!--v-if-->`) | — | — | — | — | — |
| `"unavailable"` | yes | `status` | `backend offline — saved locally` | 212 × 23 px | `11px` | `offline-dot-pulse-cb533f05` 2.4s `cubic-bezier(0.4, 0, 0.2, 1)` |
| `"misconfigured"` | yes | `alert` | ``dev misconfigured — run `npm run dev` `` | 252 × 23 px | `11px` | same keyframes, `border-width: 0px` (filled lamp) |

The `misconfigured` row is the surface the owner killed.

---

## 2. OM-5 determination (asked explicitly by the brief)

**The banner in `OM-5-dev-misconfigured-banner.png` is `DockStatusLamp`, not this component — and
this component is a live, byte-identical *second* copy of the same ordered-dead surface.**

Proof, live:

```
// http://localhost:9000/#/palettes, latch forced to "misconfigured"
lamps: [{ cls: "dock-status-lamp fira-code", role: "alert", variant: "misconfigured",
          text: "dev misconfigured — run `npm run dev`",
          rect: { x: 1177, y: 33, w: 247, h: 23 },
          bg: "oklab(0.574284 0.191676 0.099719 / 0.12)", color: "rgb(219, 36, 36)" }]
chips: []
allMisconfigNodes: ["SPAN.lamp-label"]
```

x = 1177 / w = 247 is the dock band's inline-end pill — the witness crop's geometry and ink
(destructive @ 12 % fill, filled dot, small-caps mono) match exactly. The chip was absent because
the audit's persisted state carries `savedColors: []` (measured: `localStorage["color-picker"]` =
`{"inputColor":"lab(92% 88.8 20 / 82.7%)","savedColors":[]}`), and the chip is mounted only when
`savedColorStrings.length > 0` (`CurrentPaletteEditor.vue:116`). So the witness *cannot* be the chip
— but the chip renders the identical string the moment a colour is staged.

**Ruling consequence:** killing `DockStatusLamp` alone does not discharge MT-F031. The surface has
two seats. `ApiOfflineChip.vue:11-18` is the second, and it is the one the repo's own record already
declared dead:

```
demo/palettes/browser/status/index.ts:3-6
// DevMisconfigBanner DIED at T.W6 · W6-6 (T-9, owner order): the
// misconfigured-state affordance re-homed as the dock status lamp
// (@components/custom/dock/DockStatusLamp.vue); the S.W0-1 honesty contract lives untouched in
// @lib/palette/api/availability.ts.
```

The barrel documents the death. The SFC three files away kept the branch.

---

## 3. Findings

### C-1 · BLOCKER — the ordered-dead `misconfigured` register lives on here, duplicated verbatim

**Evidence**
- `demo/palettes/browser/status/ApiOfflineChip.vue:11-18` — `v-if="misconfigured"` → ``dev misconfigured — run `npm run dev` ``
- `demo/shell/dock/status-lamp.ts:50-55` — the *same* literal, `label: "dev misconfigured — run \`npm run dev\`"`, `role: "alert"`
- `demo/palettes/browser/status/index.ts:3-6` — the file's own barrel says the affordance was
  re-homed and the banner died by owner order
- `demo/shell/dock/DockStatusLamp.vue:2-11` — the re-home rationale, verbatim: *"never inside a
  collapsible layer, never gated on a palette save"*
- Two independent CSS implementations of the same visual register: `ApiOfflineChip.vue:41-79`
  vs `DockStatusLamp.vue:43-107`

**Mechanism** T.W6 · W6-6 re-homed the misconfig affordance to a single dock seat and deleted the
banner. It never deleted the *per-surface* copy. The result is two components, in two areas, owning
one state, with duplicated strings, duplicated ink, duplicated keyframes and one shared latch.

**Reproduction (executed)** `npm run dev:web-only` (= `vite --port 9000`, no `VITE_API_URL`; see C-2
for why that latches) with any colour staged → the string appears **twice** on screen: once at the
dock band inline-end, once inside the palette well. I proved each half separately against the live
module graph (dock lamp: §2; chip: §1 matrix) — the two `v-if`s read the same `Ref` and neither
excludes the other.

**Cure (gestalt, not patch)** Delete the `misconfigured` branch from this SFC — lines 11-18, plus
`.api-misconfig-chip` (`:68-72`), `.misconfig-dot` (`:74-79`), the `misconfigured` computed
(`:37`), and the `:8-10` comment. Under MT-F031 the dock seat dies too; the dev diagnosis already
exists and is the correct home — `availability.ts:163` `console.error("[value.js] …")`, loud,
actionable, console-resident, exactly where the owner ruled it belongs. What survives in this file
is one honest state: `unavailable`.

---

### C-2 · MAJOR — the chip's dev-only message is **not dev-gated**; its sibling is

**Evidence**
```
demo/shell/dock/status-lamp.ts:48
    if (!isDev) return null; // dev-gated — the lamp ships dark in production
```
```
demo/palettes/browser/status/ApiOfflineChip.vue:37
const misconfigured = computed(() => availability.value === "misconfigured");   // no gate
```
`DockStatusLamp.vue:31` threads `import.meta.env.DEV`. `ApiOfflineChip` reads no such flag; its only
import is `computed`.

**Mechanism** `detectDevMisconfig` (`availability.ts:112-116`) keys on *page hostname is loopback*,
not on *build is a dev build*. A **production bundle served from a loopback host** therefore latches
`misconfigured`, and the two seats diverge: the lamp goes dark (`isDev === false`), the chip shouts a
`npm run dev` instruction at a production artefact.

**Reproduction** — measured half, live:
```js
// http://localhost:9000, module graph = the app's own
{ availability: "available", BASE_URL: "http://localhost:3000", origin: "http://localhost:9000",
  detect: true }   // detectDevMisconfig({viteApiUrlSet:false, baseUrl:BASE_URL, pageOrigin, pageHostname})
```
`detect: true` for a loopback page against *any* other-origin base. `test/status-lamp.test.ts:106`
independently asserts `true` for `pageOrigin http://localhost:9000` + `baseUrl
https://api.color.babb.dev` — which is exactly what `client.ts:36-37` resolves to when
`VITE_API_URL` is unset.
Derived half (recipe, **not executed** — a build writes `dist/`, outside my write scope):
`VITE_API_URL= npm run build && npx vite preview --port 4173` from a checkout with no `.env`
`VITE_API_URL`, then open `http://localhost:4173` → `import.meta.env.DEV === false` ⇒ lamp `null`;
chip's `misconfigured` computed is `true` ⇒ the chip renders. Labelled **derived**, not observed.

**Why it is reachable at all** `.env` in this checkout defines only `CLOUDFLARE_API_TOKEN`
(`sed 's/=.*//' .env` → no `VITE_API_URL`). The running server has it because
`scripts/dev/dev.sh:287` `export VITE_API_URL="http://localhost:${BACKEND_PORT}"`. Any invocation
that bypasses `dev.sh` — `npm run dev:web-only` (`package.json` → `vite --port 9000`), a bare
`npx vite`, a CI build, a fresh clone — has it unset. That is precisely the audit server the owner's
honest-trigger note names.

**Cure** Moot once C-1 lands (the branch dies). If the branch were kept, the gate would have to be
duplicated too — which is the argument for deleting it, not for copying `import.meta.env.DEV` into a
second component.

---

### C-3 · MAJOR — the *honest* degraded state is gated on unrelated application state

**Evidence**
```
demo/palettes/browser/card/CurrentPaletteEditor.vue:116
<ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />
```
The chip's sole consumer mounts it only when the staging palette is non-empty. Measured: at
`#/palettes` with `savedColors: []` and the latch forced to `"misconfigured"`, `chips: []` — the
component is not in the DOM at all, while the dock lamp is.

**Mechanism** `v-if` on the *parent's* unrelated condition ANDs with the component's own `v-if`.
The affordance whose entire purpose is "tell the user the backend is down before they trust a save"
is invisible in the state where a user has *not yet* staged anything — i.e. the moment before the
first save. The repo already named this exact failure as the reason for the re-home:
`DockStatusLamp.vue:4-7` — *"never gated on a palette save, so the `misconfigured` state is
guaranteed visible the moment the shell paints"* — and `e2e/…/o22-status-lamp.spec.ts:55-57` asserts
it for the lamp. Nothing asserts it here, and here it is false.

**Reproduction (executed)** `#/palettes`, `localStorage["color-picker"].savedColors = []`, latch
`"misconfigured"` → `document.querySelectorAll('.api-offline-chip').length === 0`.

**Cure** The `unavailable` affordance is a property of the *transport*, not of the *palette well*.
Either mount it unconditionally in the well (drop the `v-if` at `CurrentPaletteEditor.vue:116` — its
own `v-if` already self-gates, `:5-6` says so) or accept the dock seat as the single truth and delete
the chip entirely. Do not keep a "sometimes-mounted status region".

---

### C-4 · MAJOR — `white-space: nowrap` breaks WCAG 1.4.4 (Resize Text) / 1.4.10 (Reflow)

**Evidence** `demo/palettes/browser/status/ApiOfflineChip.vue:54` `white-space: nowrap;`
The sibling lamp has explicit relief for the same string; the chip has none:
```
demo/shell/dock/DockStatusLamp.vue:67-74
.lamp-label { display: none; }
@media (min-width: 1024px) { .lamp-label { display: inline; } }
```

**Reproduction (executed, measured)** chip mounted inside a `width: 320px; overflow: hidden`
container:

| condition | `unavailable` scrollWidth | `misconfigured` scrollWidth | overflows 320 px? |
|---|---|---|---|
| root `font-size: 16px` (1×) | 210 px | 210 px | no |
| root `font-size: 32px` (2× — the WCAG 200 % text-resize case) | **427 px** | **508 px** | **yes, both** |

**Mechanism** every dimension in the chip is `rem`/`em`-derived (`font-size: var(--type-mono-caption,
0.6875rem)`, `padding: 0.3rem 0.7rem`, `letter-spacing: 0.06em`) so the box scales 1:1 with user text
size, while `nowrap` forbids the only escape. At 200 % text on a 320 CSS-px viewport the chip forces
two-dimensional scrolling — SC 1.4.10 failure — and the misconfigured string (508 px, 1.6× the
viewport) is the worse of the two.

**Cure** Drop `white-space: nowrap` (`:54`). The string is a sentence, not a token; a wrapped
two-line chip in a `flex-wrap` well is correct. If a single line is a design requirement it belongs
to a container query on the well, not to an unconditional `nowrap`.

---

### C-5 · MAJOR — **vacuous gate**: zero coverage, plus a resurrection guard that guards a corpse

**Evidence (command + output)**
```
$ grep -rn "ApiOfflineChip\|api-offline-chip\|api-misconfig-chip\|offline-dot\|misconfig-dot" test/ e2e/
(no output)
```
```
$ grep -rln "backend offline — saved locally" demo/ test/ e2e/ src/
demo/shell/dock/status-lamp.ts
demo/platform/transport/availability.ts
demo/palettes/browser/status/ApiOfflineChip.vue
test/status-lamp.test.ts
```
`test/status-lamp.test.ts` matches only because it asserts the **resolver**'s label
(`:68`, over `resolveLampState` from `demo/shell/dock/status-lamp.ts`). No test file imports this
SFC. `ls test/` — 20 files, none named for it; `test/demo/` contains one API test.

**The exact mutation that keeps every gate green** — pick either, or both:
1. delete `ApiOfflineChip.vue:11-18` and `:37` (the whole `misconfigured` branch), or
2. change `:36` to `availability.value === "available"` (invert the semantic — the chip now claims
   "backend offline" while the backend is *up*).

Then: `npm test` (`vitest run`) — green, nothing imports the file. `npm run typecheck` — green,
neither mutation changes a type. `npm run lint` — green. `npm run test:e2e` — green, because the
only oracle that touches this state (`o22-status-lamp.spec.ts`) asserts `.dock-status-lamp` and
`.dev-misconfig-banner`, never `.api-offline-chip`.

**The guard is worse than absent — it is misdirected.**
```
$ grep -rn "dev-misconfig-banner" demo/ src/ e2e/ test/
e2e/smoke/oracles/o22-status-lamp.spec.ts:13: *      never resurrects (negative watch on `.dev-misconfig-banner`).
e2e/smoke/oracles/o22-status-lamp.spec.ts:37:        await expect(page.locator(".dev-misconfig-banner")).toHaveCount(0);
```
`.dev-misconfig-banner` exists **nowhere in the product**. The "resurrection guard" watches a
selector that was deleted with the component it belonged to, so it can never fail — while the actual
live resurrection of that surface wears `.api-misconfig-chip` (`ApiOfflineChip.vue:14`) and walks
straight past it. A negative assertion whose subject cannot exist is a test that asserts `0 === 0`.

**Cure** One component test over the four-state matrix in §1 (`mount` with a stubbed
`API_CLIENT_KEY` provider; assert rendered/not, `role`, and text per state) — the same closed-form
discipline `test/status-lamp.test.ts:51-86` already applies to the lamp. Retarget the e2e negative
watch from the dead `.dev-misconfig-banner` to the live `.api-misconfig-chip` (and, post-MT-F031, to
`.dock-status-lamp[data-variant="misconfigured"]`).

---

### C-6 · MINOR — `--type-mono-caption` is a phantom token; the fallback is a hardcoded 11 px

**Evidence**
```
$ grep -rn "type-mono-caption" demo/ node_modules/@mkbabb/glass-ui/dist/
demo/picker/controls/ComponentSliders/ComponentSliders.vue:310:    font-size: var(--type-mono-caption, var(--type-caption));
demo/shell/dock/DockStatusLamp.vue:54:    font-size: var(--type-mono-caption, 0.6875rem);
demo/palettes/browser/status/ApiOfflineChip.vue:47:    font-size: var(--type-mono-caption, 0.6875rem);
```
Three references; **zero definitions** — no `--type-mono-caption:` in `demo/styles/` or in glass-ui's
`@theme` blocks. Measured computed value on the live chip: `fontSize: "11px"` = `0.6875rem`, i.e. the
fallback, always.

**Mechanism** a masking fallback (owner edict 2): the literal is dressed as a token so it reads
system-compliant, and because the token never resolves, the CSS never fails loudly. Two files, three
sites, one silent hardcode. Independently observed by the design seat —
`audit/components/picker-componentsliders/challenge-D-design.md:382` lists `ApiOfflineChip.vue:47 →
0.6875rem` in its hardcoded-type-size table.

**Cure** Consume the real token (`var(--type-caption)`, defined in the glass-ui bridge) with no
fallback, or mint `--type-mono-caption` once in glass-ui's typography theme and consume it bare. A
`var()` with a fallback that is always taken is a lie about where the value lives.

---

### C-7 · MINOR — the entire visual register is copy-pasted between two components

**Evidence** side-by-side, `ApiOfflineChip.vue:41-90` vs `DockStatusLamp.vue:43-122`: identical
`display:inline-flex / align-items:center / gap:.4rem / font-variant:small-caps /
letter-spacing:.06em / font-size:var(--type-mono-caption,0.6875rem) / line-height:1 /
border-radius:var(--radius-pill) / border:1px solid var(--card-edge) /
color:color-mix(in oklab, var(--foreground) 72%, transparent) /
background:color-mix(in oklab, var(--background) 55%, transparent) / white-space:nowrap`; identical
dot geometry (`.4rem`, `1.5px solid currentColor`); identical destructive-face recipe (55 % border,
12 % fill); and **two keyframes with different names and identical bodies** —
`offline-dot-pulse` (`ApiOfflineChip.vue:82-85`) / `lamp-dot-pulse` (`DockStatusLamp.vue:110-118`),
both `2.4s var(--ease-standard) infinite`, both `0%,100% {opacity:1} 50% {opacity:.35}`. Measured on
the chip: `animationName: "offline-dot-pulse-cb533f05"`, `2.4s`, `cubic-bezier(0.4, 0, 0.2, 1)`.
Only two bytes actually differ: inline padding (`0.7rem` vs `0.55rem`) and `var(--radius-pill)` vs
`var(--radius-pill, 9999px)`.

**Mechanism** the re-home cloned the register instead of extracting it. `DockStatusLamp.vue:41-42`
even *names* the copy ("in the ApiOfflineChip's exact register … one status language, two seats").
Two seats, two stylesheets, two keyframes — every future ink change must be made twice or drift.

**Cure** One `.status-annotation` recipe in `demo/styles/` (or, per edict 4, a glass-ui `Badge`/
`Chip` variant, which is where a design-system register belongs) consumed by whichever seat survives
MT-F031. **Do not delete the keyframes** (edict 6) — move `offline-dot-pulse` to
`demo/styles/animations.css` under the existing `@media (prefers-reduced-motion: no-preference)`
idiom and retire the duplicate name.

---

### C-8 · MINOR — `font-variant: small-caps` renders the literal shell command in small capitals

**Evidence** `ApiOfflineChip.vue:41-42` (`font-variant: small-caps; letter-spacing: 0.06em`) applied
to a string containing a verbatim command. The owner-marked witness shows the result:
`audit/visual/owner-marked/OM-5-dev-misconfigured-banner.png` reads ``DEV MISCONFIGURED — RUN `NPM
RUN DEV` `` — the user is shown a command in a case they must not type.

**Mechanism** a typographic register applied to a copy class it does not fit. A code literal inside
prose needs a `<code>`-register escape from the parent's `font-variant`.

**Cure** Moot for the misconfigured branch (it dies under C-1). For the surviving `unavailable`
string, no literal is present and small-caps is fine — this is an argument that the misconfigured
copy never belonged in this register in the first place.

---

### C-9 · INFO — `detectDevMisconfig`'s third conjunct is a tautology at its only call site

**Evidence** the predicate is documented as a *triad* including "a cross-origin resolved BASE_URL"
(`availability.ts:29-31, 107-111`). Measured live:
```js
detectDevMisconfig({ viteApiUrlSet: false, baseUrl: "http://localhost:3000",
                     pageOrigin: "http://localhost:9000", pageHostname: "localhost" })  // → true
```
`http://localhost:3000` is not "the production API" — it is this repo's own local backend
(`scripts/dev/dev.sh:287`). The predicate tests *different origin*, and origin includes port.
Further, at the sole call site the inputs are **not independent**: `availability.ts:151-158` builds
`viteApiUrlSet` from `import.meta.env.VITE_API_URL` and receives `baseUrl` from `client.ts:37`
(`import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL`). So `viteApiUrlSet === false` ⟹
`baseUrl === "https://api.color.babb.dev"` (`client.ts:36`), whose origin can never equal a loopback
page origin ⟹ `isCrossOrigin` is **always true whenever legs 1 and 2 pass**. The triad is a pair
wearing a third leg.

**Mechanism** a pure function written to be "closed-form testable" over inputs the production wiring
cannot produce. `test/status-lamp.test.ts:98-119` duly varies each leg independently and passes —
proving a matrix the app never traverses.

**Cure** Out of scope for this file, but it governs when this file renders: reduce the predicate to
what it actually decides (`!viteApiUrlSet && isLoopbackHost(hostname)`), or feed it the *real*
independent input (the raw `VITE_API_URL` string) so the third leg can be false.

---

### C-10 · INFO — the `misconfigured` invariant is defended on one side only

**Evidence**
```
demo/platform/transport/availability.ts:167-172   markApiUnreachable()
    if (apiAvailability.value === "misconfigured") return;   // guarded
demo/platform/transport/availability.ts:175-179   markApiReachable()
    if (apiAvailability.value !== "available") { apiAvailability.value = "available"; }  // unguarded
```
`grep -rn "markApiReachable" demo/ test/` → the only product call site is `client.ts:86`, downstream
of the `assertApiAttemptAllowed()` throw at `client.ts:74`, so today the hole is unreachable.
`test/status-lamp.test.ts:46` reaches it deliberately (as an `afterEach` reset), which is exactly the
shape a future caller would take.

**Mechanism** an asymmetric invariant. The comment at `:168` states the rule ("A designed misconfig
is NOT an unreachable backend — never mislabel it"); the mirror transition never learned it. This
component's `misconfigured` branch would silently vanish on any future direct `markApiReachable()`.

**Cure** Guard both transitions, or make `misconfigured` terminal by construction (it is a boot-time
configuration fact, not a runtime observation).

---

## 4. Negative proof — what I checked and found sound

Not padding: each of these was a live hypothesis from the brief's hazard list, checked and killed.

- **PRM idiom is correct here.** `@keyframes offline-dot-pulse` is declared *inside* the
  `@media (prefers-reduced-motion: no-preference)` block (`:81-89`) together with the `animation`
  declaration, so no animation exists at all under `reduce` — the mandated idiom, not the blunt
  global kill at `demo/styles/animations.css:184-192`. Measured under no-preference:
  `animationName: "offline-dot-pulse-cb533f05"`, `2.4s`, `cubic-bezier(0.4, 0, 0.2, 1)` — the
  `var(--ease-standard)` chain resolves (glass-ui `scheme-spring.css` → `--motion-ease-standard`), so
  the declaration is not invalid-at-computed-value-time and the pulse does not silently die.
- **No PRM-RAF exposure.** Zero `requestAnimationFrame`, zero `setInterval`/`setTimeout`, zero
  `addEventListener`, zero observers, zero WebGL. The pulse is a composited CSS `opacity` animation.
  There is no cleanup surface, therefore no leak class and no unmount race.
- **None of the six named local hazards apply.** No `defineModel` (no props at all → no stale
  `WritableComputedRef` read); no oklch→HSV roundtrip / `stableHue`; no `ValueUnit` wrapping; no
  reka-ui slider / pointer capture; no rAF; no WebGL. This component touches no colour math and no
  parser — the live `parseCssColor` crash class cannot reach it.
- **Error paths are total.** The only input is a four-member string union; all four are exercised in
  §1 and none throws. There is no network call, no user input, no collection, no numeric domain — no
  0 / NaN / Infinity / −0 / huge boundary exists to break. The one throw in its dependency chain is
  `useApiClient()`'s missing-provider guard (`useApiClient.ts:55-61`), which is a correct fail-fast,
  not a defect.
- **`verbatimModuleSyntax` (edict 8) is satisfied.** Both imports are value imports
  (`computed`, `useApiClient`); no type-only import is mis-declared.
- **Not a god module (edict 1).** 38 lines of logic, one responsibility.
- **Idiomatic Vue 3.5 (edict 7).** `<script setup>`, `computed` over an injected `Ref`; no
  `defineModel` round-trip to cache, so the mandated `shallowRef` cure does not apply.
- **The 23 px box is not a tap-target defect.** The element is a non-interactive `<span>` with no
  handler, no `tabindex`, no role that implies operability — the ≥24 px floor (WCAG 2.5.8) binds
  pointer *targets*, not annotations. Recorded so it is not re-raised.
- **Accessible-name and console-error rows in `audit/visual/REPORT.md`:** this component contributes
  **zero**. It rendered in none of the captured matrices — `grep -rn -i "misconfig" REPORT.md
  REPORT.json` → no hits, and the persisted `savedColors: []` means the chip's `v-if` was false for
  every shot. Its contribution to the visual audit's measured defect counts is nil *because it never
  appeared*, which is itself C-3's evidence, not a clean bill.

**Hypothesis, explicitly labelled, not a finding.** Both branches mount a live region *together with*
its content (`v-if` on the region element itself), rather than mounting an empty region ahead of the
announcement. WAI-ARIA's live-region model is defined over *changes to* a region already in the
accessibility tree, and AT behaviour for a region inserted with content is inconsistent — most
reliable for `role="alert"`, least for `role="status"`. I have **no AT reproduction**, so this is a
hypothesis: the `unavailable` announcement may never reach a screen-reader user. It would be settled
by a VoiceOver/NVDA run, or pre-empted structurally by rendering a permanently-mounted
`role="status"` wrapper whose *text* is `v-if`'d.

---

## 5. Probe hygiene

All browser work was read-only against the running dev server; every mutation was reverted in-session
and verified:

- module-graph reads via `/@fs/…` specifiers matching the app's own (`performance.getEntriesByType`
  confirms identical URLs ⇒ identical module records — no shadow copy);
- `apiAvailability.value` was driven through the matrix and **restored to `"available"`**
  (verified: `{ availability: "available" }`);
- `localStorage["color-picker"]` was seeded with three colours and **restored byte-exactly** to
  `{"inputColor":"lab(92% 88.8 20 / 82.7%)","savedColors":[]}` (verified);
- the isolation host `#__probe__` and the 320 px reflow container were removed (verified:
  `document.querySelectorAll('#__probe__').length === 0`);
- **no file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
  `scripts/dev/dev.sh` or any `INBOX.md` was read-modified. The only write from this seat is this
  report.**

Adjacent observation, out of scope, recorded for the `CurrentPaletteEditor` / `WatercolorDot` seats
because I tripped over it while trying to stage a colour: Playwright resolved `.add-slot-ghost` to
`<span data-testid="watercolor-swatch" aria-hidden="true" class="add-slot-ghost …">` — the
`tag="button"` prop at `CurrentPaletteEditor.vue:96` did not produce a `<button>`, the element is
`aria-hidden="true"`, and a sibling `<div>` intercepts its pointer events (click timed out at
5000 ms). If that reproduces, the "Add current color" affordance is neither operable by keyboard nor
present in the accessibility tree. **Unverified against those components' source — hand off, do not
bank.**

---

## 6. Disposition

| # | Severity | One line | Cure |
|---|---|---|---|
| C-1 | BLOCKER | the ordered-dead `misconfigured` surface has a second, live seat here | delete `:11-18`, `:37`, `:68-79` |
| C-2 | MAJOR | that branch is ungated in production builds; its sibling is dev-gated | dies with C-1 |
| C-3 | MAJOR | the honest `unavailable` state is gated on `savedColorStrings.length > 0` | ungate at `CurrentPaletteEditor.vue:116` |
| C-4 | MAJOR | `nowrap` → 508 px in a 320 px container at 200 % text (WCAG 1.4.4 / 1.4.10) | drop `white-space: nowrap` (`:54`) |
| C-5 | MAJOR | zero tests; e2e's resurrection guard watches a selector that cannot exist | matrix component test + retarget the negative watch |
| C-6 | MINOR | `--type-mono-caption` defined nowhere; the "token" is always 11 px | consume a real token, no fallback |
| C-7 | MINOR | the whole register + its keyframes are copy-pasted from `DockStatusLamp` | one shared recipe; move the keyframe, never delete it |
| C-8 | MINOR | small-caps renders the literal command as `NPM RUN DEV` | dies with C-1 |
| C-9 | INFO | `detectDevMisconfig`'s third conjunct is always true at its only call site | reduce the predicate to what it decides |
| C-10 | INFO | `markApiReachable()` lacks the `misconfigured` guard `markApiUnreachable()` has | guard both, or make the state terminal |

**Strongest defect: C-1.** The owner ordered this surface removed; the repo's own barrel comment
records it as already dead; it is not dead, it is duplicated — and the one gate that claims to guard
against its resurrection (`o22-status-lamp.spec.ts:37`) watches a class name that no longer exists
anywhere in the product.
