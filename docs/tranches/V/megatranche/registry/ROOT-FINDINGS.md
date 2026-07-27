# ROOT-FINDINGS — findings established directly by the root seat

These are findings the ROOT established by its own hand: a probe it ran, bytes it read, a number
it measured. They are not agent reports and carry no agent's word. Each row names the exact
reproduction so a hostile reader can destroy it.

Session 2026-07-24 · value.js `tranche-u` @ `c654824e` · every seat Opus 5.

---

## MT-F001 — `parseCssColor` crashes on empty-argument colour functions (BLOCKER, LIVE IN 4.0.0)

**Claim in the prior record:** memory logged R1 as "live `parseCssColor("oklch()")` shipping crash".
**Audited truth:** the class is **8 inputs wide**, not one.

Probe: `docs/tranches/V/megatranche/audit/probes/r1-hostile-parsecsscolor.test.ts` (26 hostile inputs).

```
8 failed | 18 passed
THROWS TypeError: Cannot read properties of undefined (reading 'replace')
  oklch()  rgb()  hsl()  lab()  lch()  color()  oklab()  hsl(  )
```

**Mechanism — a non-null assertion that is false.** `src/css/grammar.ts:181`:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

`parseCssColor` matches `^([a-z][\w-]*)\((.*)\)$`, so `oklch()` yields body `""`.
`splitTopLevel("", "/")` returns `[]`, so `slash[0]` is `undefined`, and the `!` tells TypeScript
to stop caring. `strict: true` is ON and catches nothing, because `!` is precisely the instruction
to not check.

The 18 passes are themselves informative: `var(--x)`, `color-mix(...)`, `light-dark(...)`,
`rgb(from red r g b)` and huge/NaN numerics all return failures cleanly. The parser is careful
everywhere except the empty-argument seam.

**Consequence.** This is the public API of a published package (`@mkbabb/value.js@4.0.0`,
exported from `src/css/index.ts:37` and `src/subpaths/css.ts:47`). Any consumer parsing
user-typed CSS crashes on a half-typed value — which is the single most likely input a colour
tool receives.

**Disposition: BUILD.** Born-RED. The gate is the probe above, and it fails against today's tree.

---

## MT-F002 — 297 non-null assertions in `src/` make the typecheck gate substantially vacuous

Measured, this session:

| tree | LOC | non-null assertions (`x!`) |
|---|---:|---:|
| `src/` | 3,192 | **297** |
| `demo/` | ~15,450 (.vue) + 162 .ts | **188** |

Worst offenders in `src/`: `transform/decompose.ts` **113**, `css/grammar.ts` **74**,
`transform/path.ts` **37**, `quantize.ts` 18, `css/stylesheet.ts` 18.

`npm run typecheck` runs `vue-tsc` with `strict: true` and reports 0 errors. **MT-F001 proves that
0 is not a safety claim.** One assertion per ~11 lines of library source is a systematic opt-out
from the exact analysis the gate exists to perform. The gate is not fake — it is real for every
defect class that `!` does not suppress — but it cannot be cited as evidence against
undefined-dereference, and it has been so cited.

**Disposition: BUILD.** A census wave that classifies every one of the 297 as (a) provably safe with
the proof recorded, or (b) replaced by a real narrowing. Born-RED: the gate is
"zero unproven `!` in `src/`", which is RED at 297 today.

---

## MT-F003 — no `<h1>` on any route, in any matrix

`h1: 0` on all 60 captures (4 matrices × 15 routes). Measured by
`docs/tranches/V/megatranche/audit/visual/capture.mjs`.

The document has exactly one `<main>` and one `<nav>` (both correct, and W44 asserted the `<main>`
count as a green gate — that assertion holds). But the heading outline has no root. Every AT user
entering by heading navigation finds nothing.

**Disposition: BUILD.** Shell-owned. Born-RED: `h1 count === 1` fails today at 0.

---

## MT-F004 — eight sub-24px interactive targets in the persistent shell, every route

Identical on all 60 captures because they live in the shell, not in a pane:

| element | desktop | mobile | accessible name |
|---|---|---|---|
| `input` | 160×23 | 160×20 | **(none)** |
| `button` | 22×22 | 23×23 | "Switch to slug" |
| `button` | 22×22 | 23×23 | "Generate new slug" |
| `button` | 22×22 | 23×23 | "Cancel" |
| `span` ×4 | 12×24 | 12×44 | "L channel", "A channel", "B channel", "ALPHA channel" |

The four channel spans are **12 px wide** in both matrices — mobile grows them vertically to 44 px
but never horizontally, so the touch target stays a 12 px ribbon on a phone. That is the worst row
here and it is a mobile-specific failure that a desktop-only audit would never surface.

**Disposition: BUILD.** Born-RED: minimum 24×24 for every visible interactive element; RED at 8.

---

## MT-F005 — one button with no accessible name, desktop only

30 of 60 captures (all 15 desktop routes × 2 schemes) carry exactly 1 nameless button; mobile
carries 0. Located in the dock inventory between "Extract palette" and "Open color input"
(`docs/tranches/V/megatranche/audit/probes/navprobe.mjs` output).

Desktop-only means it is behind a responsive branch — so any a11y gate run only at mobile width
passes while the defect ships.

**Disposition: BUILD.** Born-RED: zero nameless interactive elements; RED at 1 on desktop.

---

## MT-F006 — CORRECTED: routing is sound; the hazard was in the audit harness

**Initial reading (WRONG):** 15 routes rendered byte-identical content and the URL survived, which
read as a missing route↔view binding, born-REDding W47's "eleven routes direct".

**Audited truth:** the demo is a **hash-router** app — `createWebHashHistory()`,
`demo/color-picker/router/index.ts`. Canonical deep links are `/#/palettes`, not `/palettes`.
Probing the hash form (`docs/tranches/V/megatranche/audit/probes/hashprobe.mjs`):

```
deeplink #/palettes    -> /#/palettes     textLen 275  title "Palettes — Color Picker"
deeplink #/browse      -> /#/browse       textLen 318  title "Browse — Color Picker"
deeplink #/gradient    -> /#/gradient     textLen 649  title "Gradient — Color Picker"
deeplink #/admin/users -> /#/admin/users  textLen 311  title "Users — Color Picker"
in-app switch to Browse -> /#/browse?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
```

Deep links resolve, in-app switching writes the hash, titles differentiate per view, and the colour
state round-trips in the query string. **Routing works.** The 60-capture first run navigated path
URLs at a hash-router app and therefore captured the default pane fifteen times per matrix.

**What this costs and what it buys.** It cost one full capture run. It bought the discovery that a
visual audit can be *comprehensively wrong while reading entirely green* — 60 captures, 0 blank
pages, 0 page errors, 0 overflow, and every single one of them the same screen. `capture.mjs` now
carries a **sameness guard** that fails the run when more than two routes in a matrix share a
content signature. The class of error is now structurally unavailable, not merely noticed.

**Standing warning for every seat in this formation:** the shell is persistent and identical across
views. Any per-route assertion that does not discriminate the pane is measuring the shell.

---

## MT-F007 — the canon describes a `src/parsing/` tree that does not exist

Project memory's "BBNF Grammars" section asserts `src/parsing/grammars/css-values.bbnf`,
`src/parsing/grammars/css-color.bbnf`, `src/vite-env.d.ts` declaring `*.bbnf?raw`, and
`test/bbnf-equivalence.test.ts`.

Measured: `src/parsing/` **does not exist**. `find . -name '*.bbnf' -not -path '*/node_modules/*'`
returns **nothing**. The whole of `src/` is 26 files across `color/ css/ foundation/ subpaths/
transform/`. The CSS parser lives at `src/css/grammar.ts` (483 lines), hand-written.

**Disposition: FOLD** into the canon-truth wave. Memory is a session input, not a repository fact,
and this formation must not inherit its stale rows as premises.

---

## MT-F008 — the parse-that decree and the dependency tree disagree

`package.json` dependencies are exactly `@mkbabb/glass-ui ^7.0.0` and `@mkbabb/keyframes.js ^6.0.0`.
**`@mkbabb/parse-that` is not a dependency of value.js at all.**

Against that: INBOX I-11 §2 records the **OWNER DECREE — "parse-that READOPTED as published;
regex parser retired unconditionally"**. And parse-that's own `typescript/CLAUDE.md` states it
"reaches keyframes.js only via value.js's `^1.0.0`-carrying 2.0.x follow-on" — i.e. value.js
*used* to carry it and no longer does.

So the parser program's true starting position is not "improve the parser". It is: **the decreed
dependency is absent, the decreed retirement has not happened, and the thing to be retired
(`src/css/grammar.ts`) is the same file that carries MT-F001 and 74 of the 297 assertions.**

The published surface to consume is `@mkbabb/parse-that@1.0.0` with entries `.`, `./core`,
`./diagnostics`, `./packrat`, `./utils`. The idiom is the `Parser<T>` combinator set —
`then or chain map mapState skip next opt not minus peek lookAhead wrap trim many sepBy eof recover`
— over leaves `string regex any all dispatch eof`, with `lazy` for recursion and
`memoize`/`mergeMemos` for left recursion behind the `PACKRAT_ARMED` latch.

**Disposition: BUILD.** This is the spine of the parser band.

---

## MT-F009 — three parallel dark-mode stores

`demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76` documents, in its own
comment, that it is "one of three parallel dark stores". `useGlobalDark()` is a fourth consumer
path, and `demo/color-session/useContrastSafeColor.ts:242` reads
`document.documentElement.classList.contains("dark")` directly — a fifth reader, bypassing every
store.

Multiple sources of truth for one boolean is the dual-path mechanism in its purest form.

**Disposition: BUILD.** One owner for scheme state; every other reader consumes it.

---

## MT-F010 — the V·π process/product ratio

Frozen and measured by `receiving/freeze-receiving-subject.mjs`:

- V·π tree: **2,324 files · 354,220,932 bytes · entirely untracked** (0 files in HEAD).
- Accepted product: **one** operation — CSS consume-number, ~17 lines, 4 tests.
- Generations burned: consume-number G1–G16, foundation G0–G4, percentage G0–G2, dimensions G0,
  denominator V1–V9.

That is ~20.8 MB of tranche per accepted line. The number is not offered as ridicule; it is
offered because the owner's own law 9 says "KISS is a gate" and law 13 says "artifact count and
gate sophistication are not progress". By the tranche's own standards this ratio is a finding, and
the receiving audit's O5 seat is charged with ruling on it.

---

## MT-F011 — cold-boot cost is not the Q14 chronic, and must not be confused with it

First navigation to `/` reached `networkidle` in **38,454 ms**; every subsequent route in the same
matrix settled in ~3,500 ms against a fixed 2,500 ms deliberate wait. The 38 s is Vite cold
dependency optimisation on a dev server, not product boot.

The Q14 escalation (LCP 5141 ms / TBT 5988 ms) is a **built-bundle** measurement, and
`playwright.config.ts` is explicit that frame budgets are built-bundle numbers served by
`e2e/smoke/perf/serve-built.mjs` on a separate origin, because the dev server charges a one-time
transform the built chunks do not.

**Standing instruction:** no performance claim in this formation may cite a dev-server number.
The Q14 chronic is measured against the built bundle or it is not measured.

---

## MT-F012 — **P0: `npm run gh-pages` emits no application, and exits 0**

The single most consequential finding of this session. Reproduced deterministically on a clean
rebuild of the current tree, with no source edited by this session.

```
$ rm -rf dist/gh-pages && npm run gh-pages
✓ built in 3.92s
=== EXIT: 0 ===

$ ls -S dist/gh-pages/assets/*.js
   11774  quantize-worker-xMwe415C.js
     698  index-Dezn_h7o.js       ← the ENTRY
js count: 2
```

The 698-byte "entry" is, in its entirety, Vite's modulepreload polyfill IIFE. It contains **no
application code, no imports, and no reference to any app chunk**. There is no other JS in the
bundle. The Vue application is simply absent.

**Runtime consequence**, `docs/tranches/V/megatranche/audit/probes/prod-mount-probe.mjs`, at both
`localhost:8091` and `127.0.0.1:8091`, `/` and `/#/`:

```
text: 0 | #app innerHTML: 2 | main: 0
consoleErrors: []   pageErrors: []   failedRequests: []
```

Blank, and **silent** — no error of any kind. The inline classic boot script still runs
(`performance.mark('overture:b0')` is present), so the page looks alive to any probe that checks
for script execution rather than for content.

### Why this is not "a preview quirk"

CARRY-LEDGER §F carries this as a deep-audit item worded as "the gh-pages PRODUCTION preview
mounts empty in a bare 127.0.0.1 origin (prod ground-record/FOUC boot-guard quirk; dev-server
witness is the spec's canonical environment and is GREEN)". Every clause of that characterisation
is wrong:

- it is **not origin-specific** — `localhost` reproduces identically;
- it is **not a ground-record or boot-guard quirk** — the boot script completes; the app was never
  built;
- calling the dev-server witness "canonical" is precisely the substitution that let this survive.
  Dev mode renders correctly (60/60 captures in this session's visual audit). **The dev server
  cannot witness a build defect, and it was used as the witness.**

### Why no gate caught it

1. **`gh-pages ✓ built` is vacuous.** It asserts exit 0. Exit 0 is achieved while emitting nothing.
   W44's close cites "build + gh-pages exit 0" in its verbatim gate list (CARRY-LEDGER §F) as
   evidence of health. This is the **green-over-broken** close-class lie, caught in the act.
2. **`smoke-perf` measures a blank page.** `playwright.config.ts` routes the `smoke-perf` project
   at `e2e/smoke/perf/serve-built.mjs`, which serves exactly this `dist/gh-pages`. Every frame
   budget that project asserts is being asserted against an empty document. Its rationale comment
   — that built-bundle numbers are the honest ones and the dev server is "a corrupting
   substitution" — is correct reasoning applied to a substrate that renders nothing.
3. **The deploy has no content assertion.** `.github/workflows/deploy-pages.yml:109-115` runs
   `npm run gh-pages` and then `wrangler pages deploy` with nothing in between.

### Blast radius

`deploy-pages.yml` triggers on the CI workflow completing green, on a **master push**, and ships
`dist/gh-pages` to Cloudflare Pages → **color.babb.dev**. Therefore: **the next green-CI master
push deploys a blank production site.**

Production is currently HEALTHY — verified with a real browser,
`docs/tranches/V/megatranche/audit/probes/live-prod-probe.mjs`:

```
https://color.babb.dev/  HTTP 200
textLen 1789 · #app innerHTML 111983 · main 1 · h1 0
consoleErrors [] · pageErrors [] · failed []
```

So the live artefact predates the regression. The risk is entirely forward-looking, and it is
armed. (Note `h1: 0` in production too — MT-F003 confirmed on the deployed site.)

### Suspected cause

`git log -L '/"vite":/,+1:package.json'` shows the most recent bump is
**`08a7f96b feat(library/W10-β)!: Vite 7 → 8 + Rolldown`** (`^7.3.3` → `^8.0.13`; installed 8.0.16).

The demo's entry is an **inline `<script type="module">` in `<head>`**
(`demo/color-picker/index.html:205-213`) that imports `vue`, `./App.vue` and `./router/index`.
In the built HTML that inline block is emptied and replaced by
`<script type="module" crossorigin src="./assets/index-Dezn_h7o.js">` — the correct transformation
— but the emitted chunk carries only the polyfill. The build spends 58% of plugin time in the
custom `source-export` plugin and finishes in 3.92s, which is far too fast to have bundled this
application.

This is a **hypothesis** on cause. The **defect** is not a hypothesis: it is reproduced, exit-0,
and deployable.

### Disposition: BUILD — the mega-tranche's first wave, born-RED

Gates, all RED against today's tree:

| gate | command | RED today |
|---|---|---|
| the bundle contains an app | `node -e "…assert entry chunk > 100kB and imports app chunks"` | RED (0.69 kB, 0 imports) |
| the built bundle mounts | `prod-mount-probe.mjs` asserts `#app` children > 0 | RED (0 children) |
| CI cannot ship an empty bundle | a post-build content assertion in `deploy-pages.yml` before `wrangler` | RED (no such step exists) |
| `smoke-perf` runs against a real document | assert `body.innerText.length > 200` before any budget assertion | RED (blank) |

The third gate is the one that matters beyond this defect: **every artefact-producing step in this
repository needs a content assertion, not an exit code.** That generalisation is the wave's real
product.

---

## MT-F013 — the `useLayerTransition` shim is dead weight: its successor shipped in the version we already run

`demo/shell/dock/layers/ActionBarLayer.vue:53-86` locally reimplements a composable Glass 7.0.0
removed. D58.iv ratified that as an honest local shim, relay O-6 raised mark **M2** asking glass for
"a public content-swap composable or bless", and CARRY-LEDGER §F banked the retirement as
conditional: "if glass ships a public successor, retire the shim at the consuming wave (W47)".

**The condition was already satisfied at the moment of adoption.** Verified against the installed
artifact, not against anyone's prose:

```
node_modules/@mkbabb/glass-ui  version 7.0.0
  dist/components/dock/index.d.ts:5  export { default as DockCrossfade } from "./DockCrossfade.vue";
  dist/dock.js                       contains DockCrossfade
  useLayerTransition                 ABSENT from the installed dist
```

API: `{ active: string; reserve?: "block" | "inline" }`. Its own docstring names our exact case —
*"The controlled-no-rail 5-pane case (a consumer) consumes this DIRECTLY"*. Glass built it for us.

And `ActionBarLayer.vue:55` — inside the shim — **already says** "the layer size-morph + crossfade
folded INTO the DockCrossfade". The author knew the successor's name and shimmed anyway.

**Mechanism (the generalisable one):** a conditional bank whose condition nobody re-evaluates is
indistinguishable from a permanent dual path. The bank was written correctly; it was never swept.
Every banked row this formation writes must therefore carry a **mechanically checkable** re-trigger,
not a prose one.

**Disposition: RETIRE** the shim, adopt `<DockCrossfade :active>`. Clean break, no alias.
Born-RED gate: `grep -c "function useLayerTransition" demo/` must be 0; RED at 1 today.

---

## MT-F014 — the one masking fallback that must NOT be deleted yet, and why that is not a re-booking

`demo/styles/foundation.css:571-574` restates Glass's own declarations onto Glass's **private**
selector `.glass-slider[data-variant="spectrum"] .slider-range`. By the standing no-masking-fallback
edict this should die on sight.

It must not, and the reason is on the record. Glass's BJ adjudication
(`BJ/addenda/2026-07-21-convergent-hardening/W4-VALUE-CASCADE-ADJUDICATION-C4.md`, 2026-07-22) rules
it a consumer compatibility shim masking **missing public artifact bytes** — their `Slider.vue:501-505`
authors both `backdrop-filter:none` and `-webkit-backdrop-filter:none`, their shipped
`dist/glass-ui.css` retains only the prefixed leg, and their `vite.style-assets.ts:47-70` excludes
root `dist/glass-ui.css` from the post-processing seam. Chromium does not implement the `-webkit-`
alias, so **deleting our shim today makes Chromium render the spectrum track blurred** — it would
un-mask a live producer defect, not remove a lie.

Glass's disposition is producer/package/consumer **RED**, with six exact retirement conditions
(Glass 8 immutable candidate with source→built→packed→installed→served identity; `/styles`-only and
`/styles.css`-only isolated consumers; both legs retained per entry; an upstream blur sentinel so the
CSS-initial `none` cannot false-green the test; Chromium unprefixed = `none` **and real Safari**
prefixed = `none`, asserted per entry; and all four spectrum receivers preserving alpha checker,
transparent underlay, certified `trackInk`, orientation, RTL/inversion and pixels afterwards).

**Receipt integrity verified by this formation** — both hashes glass bound still match today:
CARRY-LEDGER `9e88f9e2…` ✓, `demo/styles/foundation.css` `118dbe9c…` ✓.

**Disposition: FOLD — banked with a mechanically checkable re-trigger.** This is deliberately *not*
a re-booking: a re-booking is "next tranche decides", with no condition. This row names a condition
that a script can evaluate (does the installed `@mkbabb/glass-ui` dist contain the unprefixed leg on
both public entries?) and that fires the moment Glass 8 lands. Contrast MT-F013, whose condition was
prose, went unswept for a full tranche, and thereby became a dual path.

The distinction between these two rows — F013 banked-on-prose and rotted, F014 banked-on-a-check —
is the single most transferable lesson in this registry, and it is the standing rule for every
banked row the mega-tranche writes.

---

## MT-F015 — the complete causal chain: three green gates, one shipped crash

MT-F001 is not an oversight. It is the terminus of a chain in which **every gate behaved exactly as
configured**, and the configuration is the defect. Tracing it end to end:

**1. The compiler was right.** `tsconfig.base.json:10` sets `noUncheckedIndexedAccess: true` (both
`tsconfig.lib.json` and `tsconfig.demo.json` extend it), alongside `strict: true`. TypeScript
therefore typed `splitTopLevel(...)[0]` as `string | undefined` and **correctly refused it**.

**2. The author overrode the compiler.** `src/css/grammar.ts:181` writes `slash[0]!`. The `!` exists
for no other purpose than to silence the diagnostic the strict flag had just produced. Of
`grammar.ts`'s 74 assertions, **70 are index-`!`** — i.e. 70 individual overrides of
`noUncheckedIndexedAccess`. Across `src/` there are **297**.

This reframes MT-F002 entirely. The earlier framing — "the typecheck gate is vacuous" — was too
generous to the repo and too harsh on the config. The config is genuinely rigorous. The correct
statement is: **a rigorous compiler configuration is being cancelled 297 times by hand, and nothing
counts the cancellations.**

**3. The lint gate cannot see it.** `npm run lint` is `eslint . --max-warnings=0`, which reads as
maximal severity. The rule set it enforces is not:

- `@typescript-eslint/no-non-null-assertion` — **not configured at all**. The 297 `!` are invisible.
- `@typescript-eslint/ban-ts-comment` — `"off"` (line 75). A bare `@ts-ignore` would also pass.
- `@typescript-eslint/no-explicit-any` — `"off"` (70). `@typescript-eslint/no-unused-vars` — `"off"` (71).
- Plus `no-unused-expressions`, `no-fallthrough`, `no-cond-assign`, `no-constant-condition`,
  `no-sparse-arrays`, `no-self-assign`, `no-empty`, `no-prototype-builtins`, … — **24+ rules off**.
- **No typed linting whatsoever** — no `projectService`, no `project`, no `recommendedTypeChecked`.
  So `no-unnecessary-condition` and the entire type-aware family are not merely off, they are
  unavailable.

`--max-warnings=0` over a sufficiently empty rule set is trivially satisfiable. The flag is doing
rhetorical work, not analytical work.

**4. The tests do not probe it.** The hostile-input class (empty argument lists) has no test.
26 hostile inputs took one file to write and found 8 crashes on the first run.

### The finding

```
noUncheckedIndexedAccess: true   →  flags it        →  silenced by `!`
eslint --max-warnings=0          →  no rule for `!` →  passes
npm test                         →  no hostile case →  passes
                                                     →  TypeError ships in 4.0.0's public API
```

Three independent gates, all green, one crash in a published package. Every close that cited
"typecheck 0/0 · lint clean · tests N/N" as evidence of health cited three instruments that were
each, by construction, blind to this defect class.

### Disposition: BUILD — and the cure is not "fix line 181"

Fixing `grammar.ts:181` removes one crash and leaves 296 loaded guns. The wave is:

| gate | RED today |
|---|---|
| `@typescript-eslint/no-non-null-assertion` enabled as **error** for `src/` | RED — 297 violations |
| typed linting on (`projectService`) + `no-unnecessary-condition` | RED — not configured |
| every currently-`"off"` rule either re-enabled or carrying a one-line written justification | RED — 24+ silently off |
| a hostile-input suite over every public parse entry (empty args, truncated, boundary numerics) | RED — 8 failures |

The third row is the one that generalises past this repo: **a disabled lint rule with no recorded
reason is indistinguishable from an unnoticed regression.** Whoever disabled `no-explicit-any` may
have had an excellent reason in 2026-02; nothing on disk records it, so nobody can safely re-enable
it, so it stays off forever. Every `"off"` in the mega-tranche's end-state carries its reason inline
or it is deleted.

---

## MT-F012.1 — MT-F012 root cause, isolated to eight lines

The P0 is not a mystery, a plugin interaction, or a boot-guard. It is **Vite 8 / Rolldown silently
discarding the module graph of an INLINE `<script type="module">` HTML entry.**

Minimal reproduction — stock Vite 8.0.16 via the JS API, **no repo plugins, no repo config**,
two variants differing only in how the entry is declared
(`docs/tranches/V/megatranche/audit/probes/vite-entry-repro/`):

```
=== variant: inline ===        <script type="module"> import {boot} from "./app.ts"; boot(); </script>
      698 bytes  index-Dezn_h7o.js   BOOTED-marker=NO      ← app code GONE
  script tags: <script type="module" crossorigin src="./assets/index-Dezn_h7o.js">

=== variant: external ===      <script type="module" src="./main.ts"></script>
      769 bytes  index-CA15Gc8T.js   BOOTED-marker=YES     ← app code present
  script tags: <script type="module" crossorigin src="./assets/index-CA15Gc8T.js">
```

**The conclusive detail: the repro's broken chunk and the real demo's broken chunk are the same
bytes** — 698 bytes, and Vite's content hash is identically `Dezn_h7o` in both. Two unrelated
projects cannot produce the same content hash by coincidence; they produce it because in both cases
the emitted "entry" is nothing but the modulepreload polyfill. The demo's failure IS this failure.

**The defect site.** `demo/color-picker/index.html:205-213` declares the application entry inline:

```html
<script type="module">
    import { createApp } from "vue";
    import App from "./App.vue";
    import { router } from "./router/index";
    const app = createApp(App);
    app.use(router);
    app.mount("#app");
</script>
```

Under Vite 7 this was fine. Under Vite 8 + Rolldown (`08a7f96b feat(library/W10-β)!: Vite 7 → 8 +
Rolldown`) it produces an application-free bundle, and **the build reports success**.

**The cure is one file.** Extract those eight lines to `demo/color-picker/main.ts` and reference it
as `<script type="module" src="./main.ts"></script>`. That is also the form Vite documents. The
proof that it works is the `external` variant above.

### Why this belongs in the mega-tranche and not a hotfix

The one-line cure removes today's blank deploy. It does not remove the class. The class is:
**a build step whose success is defined as exit 0, feeding a deploy step with no content assertion.**
Vite 8 introduced a silent behavioural change; nothing in this repository was capable of noticing,
because nothing anywhere asserts that the artifact contains the product. The same hole would swallow
a dropped CSS entry, an empty locale bundle, or a tree-shaken-away side-effectful module.

Accordingly the wave carries BOTH:

| gate | command | RED today |
|---|---|---|
| entry chunk contains the application | assert emitted entry > 100 kB **and** references app chunks | RED (698 B, 0 refs) |
| built bundle mounts | `prod-mount-probe.mjs`: `#app` children > 0 | RED (0 children) |
| `deploy-pages.yml` cannot ship an empty bundle | a content assertion between `npm run gh-pages` and `wrangler` | RED (no such step) |
| `smoke-perf` asserts a live document before any budget | `body.innerText.length > 200` precondition | RED (blank) |
| no inline `<script type="module">` entry in any HTML | `grep` the built + source HTML | RED (1 in `demo/color-picker/index.html:205`) |

The third row is the generalisation and the reason this is a wave rather than a patch:
**every artifact-producing step in this repository asserts an exit code where it should assert a
product.**

---

## MT-F016 — 64% of the lint gate's work is documentation, and the gate is RED

Measured by asking ESLint itself which files it lints (`eslint . --format json`, grouped by top
directory):

| directory | files linted |
|---|---:|
| **`docs/`** | **911** |
| `demo/` | 250 |
| `api/` | 125 |
| `e2e/` | 84 |
| `src/` | **26** |
| `test/` | 22 |
| everything else | 8 |

`eslint.config.ts` declares **no `ignores`**. So `npm run lint` — the gate — spends 911 of its 1,426
files, **64%**, on tranche documentation, and 26 files (1.8%) on the actual published library.

And it is **RED right now**: `npm run lint` exits **1**. The offender is
`docs/tranches/V/apotheosis/v-apotheosis-workflow.js` — a prior session's workflow script, which
legitimately uses a top-level `return` (valid for the workflow runtime, a parse error to ESLint).

**The divergence that matters.** That file is **untracked**. CI checks out clean, never sees it, and
`npm run lint` at `.github/workflows/ci.yml:33` passes. So:

- a developer running the project's own lint command locally sees **RED**;
- CI running the identical command sees **GREEN**;
- and the difference is invisible to both.

A gate whose result depends on which untracked files happen to be in your working tree is not
measuring the product. Combined with MT-F015 (24+ rules off, no typed linting, no
`no-non-null-assertion`), the picture is a gate that does a great deal of work on the wrong files
under a rule set too thin to catch the defects that actually shipped.

**Disclosure:** this formation's own workflow scripts under
`docs/tranches/V/megatranche/workflows/` are two more instances of the same parse error. They follow
the established precedent set by `v-apotheosis-workflow.js` and they do not change the gate's colour
(it was already RED). They are named here rather than hidden, and the wave below disposes of the
whole class.

**Disposition: BUILD.** Scope ESLint to the product (`src`, `demo`, `api`, `test`, `e2e`, `plugins`,
root configs) and ignore `docs/**`. Born-RED gates: `npm run lint` exits 0 (RED at 1 today); the
linted-file census contains zero `docs/` paths (RED at 911 today).

---

## MT-F017 — test truth: 346/346 is correct and current; the memory that says 1607 is stale

Measured: `npx vitest run` → **25 files, 346 tests, 346 passed, 8.35 s**.

- CARRY-LEDGER §F's W44 close cites "`npm test` 346/346" — **accurate and still true today**. That
  close row earns its credit on this gate.
- Project memory's "vitest: 1607 passing, 36 files" is **stale** — it is explicitly annotated
  "at 0.11.2, 2026-06-11 — counts drift; the per-tranche FINAL.md is authoritative", and it does.

The number worth holding onto is not 346 but the ratio it implies. 346 tests cover a 3,192-line
library plus a 15,450-line demo — and **26 hand-written hostile inputs, in one file, in one sitting,
found 8 crashes in the library's most-used public entry** (MT-F001). The suite is not weak because
it is small; it is weak because it tests the inputs the authors expected. Nothing in it asks what
happens on a half-typed value, which is the input a colour tool receives most.

**Disposition: BUILD** — a hostile-input suite over every public parse entry, as part of the
MT-F015 wave. Born-RED: 8 failures today.

**Standing correction for this formation:** every count inherited from project memory is a claim to
re-measure, not a premise. MT-F007 (a `src/parsing/` tree that does not exist), MT-F017 (1607 vs
346) and the stale shadcn-file count are three instances already. Memory records what was true when
written; the tree records what is true.

---

## MT-F018 — the `!` epidemic is value.js-specific, not a house style

Measured across the constellation's two published TypeScript libraries, same author, same idioms,
same tooling:

| library | version | src files | src LOC | non-null assertions | **LOC per `!`** | test files |
|---|---|---:|---:|---:|---:|---:|
| `@mkbabb/value.js` | 4.0.0 | 26 | 3,192 | **297** | **10.7** | 22 |
| `@mkbabb/keyframes.js` | 6.0.0 | 145 | 22,636 | 154 | **147.0** | 131 |

**keyframes.js is seven times larger and carries roughly half as many assertions — it is ~14× cleaner
per line on the exact metric that produced MT-F001.** It also carries six times the test files.

This kills the most comfortable explanation. The 297 are not a house convention, not a consequence
of the shared tsconfig (both inherit the same strictness), and not inherent to the domain. They are
localised to value.js, and within value.js they concentrate hard: `transform/decompose.ts` 113,
`css/grammar.ts` 74, `transform/path.ts` 37 — three files carry 224 of 297, **75%**.

Those three files are also the three doing the most array/tuple indexing (matrix decomposition, path
segments, split-and-index parsing) — precisely the code `noUncheckedIndexedAccess` exists to protect,
and precisely where it was switched off by hand, one site at a time.

**Consequence for the wave.** The remediation is bounded and knowable, not a repo-wide slog:
three files hold three quarters of it, and the sibling library already demonstrates the target state
is reachable in this codebase by this author. The gate "zero unproven `!` in `src/`" is therefore a
realistic born-RED, not an aspiration.

### Constellation facts established alongside (for the library band)

- `keyframes.js@6.0.0` depends on `@mkbabb/value.js` at **exactly `4.0.0`** — not a caret. This is
  the exact-pin that INBOX I-6 records as ruled **DELIBERATE** by keyframes, converged with our O-2
  answer. It means any value.js 4.1.x is invisible to keyframes until they bump, which is the
  vehicle CARRY-LEDGER §D notes for `sampleBezier`/`mixColorsInto`.
- `keyframes.js` publishes exactly **2** export keys (`.`, `./engine`) against value.js's **7**.
- `fourier-analysis` is a hybrid: a Python `api/` (`pyproject.toml`, `uv.lock`) plus
  `web/` (`fourier-analysis-web@0.1.0`) which consumes **five** `@mkbabb` packages —
  `value.js`, `glass-ui`, `keyframes.js`, `latex-paper`, `pencil-boil`. The A-band's
  "Value/Fourier API isomorphism" therefore spans a language boundary, which no prior formation
  document this session has read appears to state.

---

## MT-F019 — a second crash class in a second subpath: `PathGeometry` on any M-less path

Probe: `docs/tranches/V/megatranche/audit/probes/hostile-transform.test.ts`, re-verified through
both public entry points (`new PathGeometry(d).getTotalLength()` and `getTotalLength(d)`).

**Every drawing command that appears before a `moveto` throws** —
`TypeError: Cannot read properties of undefined (reading 'len')`:

```
THROWS  "L 10 10"  "l 10 10"  "H 10"  "V 10"
        "C 1 1 2 2 3 3"  "Q 1 1 2 2"  "A 1 1 0 0 1 2 2"  "T 1 1"  "S 1 1 2 2"  "  L 10 10"
ok      "Z" → 0 · "M 0 0 L 10 10" → 14.142135623730951 · "M 0 0 L 3 4" → 5 · "M 0 0 Z L 5 5" → 7.07
```

All nine SVG drawing commands, from a public entry of a published package. The geometry itself is
**correct** — `M 0 0 L 3 4` returns exactly 5 — so this is not a maths defect. It is the same
mechanism as MT-F001 in a different file: an unchecked index into an empty collection, in
`src/transform/path.ts` (37 non-null assertions).

An M-less path is malformed per SVG, but the correct response is an empty geometry, not an internal
`TypeError` naming a private field. Any consumer that slices or concatenates path data — and path
strings are routinely sliced — produces this input.

Also found, lower severity, in the same probe: `decomposeMatrix3D(null)` / `(undefined)` and
`recomposeMatrix3D({})` throw raw property-access TypeErrors rather than validation errors. Those
inputs violate the TypeScript signature, so a JS-only consumer is the exposure, and the defect is
the *diagnostic*, not the throw.

**Explicitly NOT a defect, recorded so it is not re-litigated:** `interpolateDecomposed` throwing
`Error: interpolateDecomposed: cannot interpolate a 2D and a 3D decomposition together` on mismatched
inputs is correct, deliberate, and well-messaged.

**Root-seat correction:** an earlier run of this probe reported `getTotalLength("M 0 0 L 10 10") = 0`
and I nearly booked it as a defect. That was my own error — I passed a `PathGeometry` instance to a
function whose signature is `(d: string)`. Re-run with the correct signature, the value is 14.142…
The lesson generalises to every seat: **a hostile probe that calls the API wrongly manufactures
findings.** Read the signature before believing the output.

**Disposition: BUILD**, folded into the MT-F015 hostile-input wave. Born-RED: 9 throws today.

---

## MT-F020 — the arc, measured: 1,005 commitments promised, 380 landed (38%)

Ten independent hostile Opus seats audited all 22 value.js tranches, each building its scope's
commitment ledger from the tranche's own documents and then checking every row against the **current
tree and git history** — never against the close document's claim.

| scope | promised | landed | % | deferred | silent drops | chronics | vacuous gates |
|---|---:|---:|---:|---:|---:|---:|---:|
| A–D | 120 | 14 | **12%** | 21 | 7 | 6 | 7 |
| E–H | 52 | 26 | 50% | 12 | 6 | 6 | 9 |
| I–L | 77 | 40 | 52% | 25 | 9 | 6 | 9 |
| M–P | 84 | 46 | 55% | 20 | 8 | 7 | 5 |
| Q–S | 82 | 45 | 55% | 21 | 8 | 7 | 8 |
| T | 149 | 70 | 47% | 18 | 7 | 8 | 7 |
| U | 104 | 35 | 34% | **77** | 7 | 6 | 8 |
| V core / V′ | 18 | 5 | 28% | 19 | 7 | 5 | 6 |
| V apotheosis | 120 | 96 | 80% | 13 | 7 | 6 | 7 |
| **V vnext (193-wave)** | 199 | 3 | **2%** | 7 | 6 | 6 | 10 |
| **TOTAL** | **1005** | **380** | **38%** | **233** | **72** | **63** | **~76** |

**38%.** Not 38% of an aspiration — 38% of what the tranches' own closing documents recorded as
delivered. The other 62% is deferrals that were never decided, drops nobody noticed, and gates that
could not fail.

### The findings that carry the most weight

- **A citation that never existed.** `docs/tranches/N/audit/lanes/n-verify-V4.md` is cited **four
  times** as primary evidence — including for the verdict that justified superseding tranche M
  entirely — and **has never existed in any git object**.
- **A memory-level falsehood.** K.W2.5, the corrective wave for a ruled precept violation, **never
  ran** (zero commits). The `development` export condition it was supposed to revert shipped to npm
  at 0.11.0 and broke 37 keyframes.js test files; an emergency `fix(pkg)` removed it four days later
  citing neither K.W2.5 nor the precept. Project memory records "reverted in K.W2.5" — **false**,
  and corrected in this session.
- **A close certified against uncommitted bytes.** J's FINAL certified "140/140 green" against a
  tree that did not land until the next day, inside a K commit.
- **Regression after the proof was deleted.** G/H's invariant-codification pillar was removed
  wholesale 8–12 days post-close (the owner's "overfit junk" ruling, `c4c58421`). Three of the six
  invariants it had codified have since regressed: `as unknown as` 2→17, `:deep` 0→21,
  demo files >400 LoC 0→5. The proof idiom was correctly retired; **nothing replaced its function.**
- **Evidence behind `.gitignore`.** 91.8% of Q/R/S visual evidence — 574 of 625 files — is untracked
  behind `.gitignore:34 *.png`. R's "π CLEAN" verdict rests on 108 screenshots of which **zero** are
  in R's close commit. This is why this formation's π obligations must name *committed* witnesses.
- **The five-close chronic.** The ~5s boot has now ridden **five closes under four names**:
  S RP-2/L20 → T Q14/O-5 → U U-F3 → V′ CH-4. Renaming is how it survived.
- **The chronic register under-counts itself.** V's RF-26 disease register dates the
  aurora-derive/blob-extirpation chronics to tranche D; they originate at **A.W6 `065c6fe`**,
  three closes earlier.

### The number that decides the mega-tranche's size

The 193-wave vnext formation stands at **3 of 199 = 2%**, with formation-wide clean credit 0/2. Set
against a 22-tranche historical delivery rate of 38%, a 193-wave program is not a plan; it is a
restatement of the problem. **The mega-tranche this formation returns must be sized to the measured
rate, and every wave in it must be individually completable.** That is the single most important
constraint the audit produced, and it is arithmetic, not opinion.

---

## MT-F021 — verification cuts both ways: two agent claims corrected, one agent vindicated against me

The registry only earns trust if the root verifies agents *and* admits when the agent was right.
Three checks, run by hand:

### (a) The proof-deletion SHA — agent partly wrong, corrected

The E–H seat attributed the wholesale deletion of the G/H invariant-codification pillar to a single
commit `c4c58421` ("overfit junk"). Checked: `c4c58421` is
`feat(K.W2a): tsconfig.lib/demo split + glass-ui source-resolution` — it *does* delete
`scripts/proof-as-any-budget.mjs`, but it is not the "overfit junk" commit and it is not where the
pillar died. The proof idiom was dismantled across **at least three** commits:
`8bbf0690 ci(T.W0 · proof-split): Q13 retain-5/excise-7`, then
`7334c793 feat(package-v4)` and `164343c1 feat(v4)!`, which together removed eleven
`scripts/gates/proof-*.mjs`. **A single-commit narrative was wrong; the deletion was gradual, which
is exactly why nobody noticed the invariants going with it.**

### (b) The regressed invariants — agent right, my first measurement wrong

I initially measured `as unknown as` at 37 and contradicted the seat's "2→17". The seat was right:
scoped correctly, `src/` is **17** — my 37 was a cross-tree sum that swept in `e2e` (18), `api` (14)
and `test` (2). Measured today, by scope:

| invariant | codified by G/H | today | scope |
|---|---:|---:|---|
| `as unknown as` | 2 | **17** | `src/` |
| `:deep(` | 0 | **22** | `demo/` |
| demo `.vue` > 400 LoC | 0 | **3** | `ColorPicker.vue` 414 · `App.vue` 417 · `Markdown.vue` 408 |

All three regressed. The seat said 21 and 5 for the latter two; I measure 22 and 3. Immaterial
drift, same verdict.

### (c) Tranche L's claim — agent right, and I nearly booked a false BLOCKER

I measured `as any` = **584** in `api` and was one keystroke from recording that tranche L's
headline invariant had catastrophically regressed. It had not. Scoped to source:

```
api/src   111 files · 10,869 LOC · `as any` = 0 · `as unknown as` = 1
the 584   node_modules/zod 570 · node_modules/mongodb 13 · @types 1   ← vendored, not ours
```

**Tranche L's "`as any`=0 · `as unknown as`=1" holds EXACTLY at HEAD, fourteen tranches later.**
The I–L seat reported precisely this and was right.

### Why (c) is the most useful finding in this section

`api/src` — 10,869 lines — has **one** unsafe cast. `src/` — 3,192 lines — has **297** non-null
assertions. Same repository, same author, same era. The difference is that tranche L enforced its
invariant *structurally* and the invariant survived fourteen tranches without any gate still running,
because the code was written not to need one.

That is the mega-tranche's model. Not "add a gate" — **write the code so the gate is uninteresting.**
L is the existence proof that this author, in this repository, can do it.

**Standing rule for every seat and for the root: scope every grep to source before believing a
count.** `node_modules`, `dist`, and `test-results` have manufactured two near-miss findings in this
session alone.

---

## MT-F022 — The state-matrix harness produced four false signals out of four; every one was the probe

**Severity.** EVIDENCE-INTEGRITY (no product defect). **Established by the root, 2026-07-24.**

The `audit/visual/states.mjs` run over 5 routes x 5 matrices emitted four signals that read as
product defects. All four were run to ground. **None survived.** Each failed in a different way, and
the four together are the strongest available argument for laws L-9 and L-12.

| # | Reported signal | Verdict | What it actually was |
|---|---|---|---|
| 1 | `rtl-*`: `dir=ltr` on all 10 rows, `err=1` | **HARNESS** | `addInitScript` throws `TypeError: null is not an object (evaluating 'document.documentElement.setAttribute')` in WebKit — documentElement does not exist at init-script time. The matrix measured an un-flipped page and the `err=1` was *my own probe throwing*. |
| 2 | `reduced-motion` `#/blob`: `anims=83` | **TIMING ARTIFACT** | Counted mid-boot. At rest: `reduce` -> 3 running / `no-preference` -> 4 running of 13. |
| 3 | `keyboard-focus`: focus never leaves `body` after 12 Tabs on 3 of 5 routes | **PLATFORM + PROBE** | Two compounding errors. (a) macOS WebKit ships Full Keyboard Access **off**, so Tab skips buttons/links by platform default: `#/gradient` measures 5 reachable in WebKit vs **44 in Chromium**, same tree. (b) My ring detector keyed focus by *label*, so 35 identically-labelled sliders collapsed to one key and truncated the walk. Re-keyed by DOM path. |
| 4 | `zoom-200`: `#/` text 859 -> 70 | **CORRECT BEHAVIOUR** | Purely the 720px breakpoint. 720-unzoomed, 1440-at-200%, and 390-mobile all measure `text=69 panes=7` identically. Content stays reachable via the pane router. This is WCAG 1.4.10 reflow working. |

**Reproduction of the corrections.**
```
node docs/tranches/V/megatranche/audit/probes/state-verify.mjs      # (1) and (2)
node docs/tranches/V/megatranche/audit/probes/kbd-reach.mjs         # (3), both engines, DOM-path keyed
node docs/tranches/V/megatranche/audit/probes/prm-zoom-verify.mjs   # (2) and (4)
```

### The three facts this established, which are GOOD and which no wave may born-RED against

- **`prefers-reduced-motion` gates the WebGL render loop, not merely CSS.** Instrumenting
  `requestAnimationFrame` directly: under `reduce`, `#/blob` fires 67 boot callbacks and then
  **0 across the next 3s**; under `no-preference`, 1075 then 816. `getAnimations()` is structurally
  blind to rAF and could never have shown this — the CSS-animation count was the wrong instrument.
- **Responsive reflow at 200% zoom is correct**, and is the same code path as mobile.
- **The keyboard tab ring is correct modulo roving tabindex** (Chromium gaps of 5-9 per route are
  largely composite widgets presenting one stop, which is the intended ARIA pattern).

### Consequences

1. **`audit/visual/states.mjs` output is quarantined.** No wave may cite the RTL, reduced-motion or
   keyboard rows of the existing run. The harness is patched (below) and must be re-run before any
   state claim is made from it.
2. **L-12 gains a corollary — the witness must not be blind to the mechanism.** A PRM gate written
   against `getAnimations()` asserts nothing about a rAF renderer, which is where the motion actually
   is. Any wave gating reduced-motion instruments rAF.
3. **L-9 gains a corollary — cross-engine before cross-examining.** Any keyboard, focus, or
   input-affordance measurement is taken in **two engines**, and a WebKit-only gap is presumed to be
   Full Keyboard Access until Chromium agrees.
4. **RTL is unclaimed, not broken.** Applied correctly post-load, `dir=rtl` yields `overflowX=0` with
   61 elements left of the viewport edge. Nothing in the tree claims RTL support. This is recorded as
   an **unclaimed capability**, not a defect, and no wave born-REDs it.

**Root's own tally for this session: three false findings caught before they entered the registry**
(MT-F006 path-vs-hash routing, MT-F019 `getTotalLength` signature, MT-F021 `node_modules` scope) plus
these four. Seven. The registry's value is what it *refused* to record.

---

## MT-F023 — The global reduced-motion guard cannot neutralise scroll-driven animations, and every pane header uses them

**Severity.** MAJOR (accessibility, app-wide surface). **BORN RED — reproduces on today's tree in
both engines.** Established by the root, 2026-07-24.

### The claim

`demo/styles/animations.css:176-193` declares itself:

> *Global prefers-reduced-motion guard — **Neutralises CSS keyframe animations and transitions
> app-wide** for users who have requested reduced motion.*

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

The selector is maximally broad and both declarations are `!important`. It reads airtight.

### The defect

`demo/shared/ui/PaneHeader.vue:178-193` drives three animations off a **scroll timeline**, not a
time timeline:

```css
@supports (animation-timeline: scroll()) {
    .pane-header::before      { animation: pane-header-veil  linear both;
                                animation-timeline: --pane-scroll; animation-range: 0px 64px; }
    .pane-header-title        { animation: pane-title-shrink linear both;
                                animation-timeline: --pane-scroll; animation-range: 0px 120px; }
    .pane-header-desc-wrap > p{ animation: pane-desc-shrink  linear both;
                                animation-timeline: --pane-scroll; animation-range: 0px 80px; }
}
```

A scroll-driven animation has `animation-duration: auto`; its progress is a pure function of scroll
offset. **Overriding `animation-duration` does nothing to it.** The guard is structurally incapable
of reaching this construct — not misconfigured, not out-specificity'd: inapplicable.

### Reproduction (cross-engine, identical result)

```
node docs/tranches/V/megatranche/audit/probes/prm-scroll-timeline.mjs
```
```
webkit   rm=reduce         titleTransform matrix(1,0,0,1,0,0) -> matrix(0.310808,...)  veil 0.52 -> 1
webkit   rm=no-preference  titleTransform matrix(1,0,0,1,0,0) -> matrix(0.310808,...)  veil 0.52 -> 1
chromium rm=reduce         titleTransform matrix(1,0,0,1,0,0) -> matrix(0.618029,...)  veil 0.52 -> 1
chromium rm=no-preference  titleTransform matrix(1,0,0,1,0,0) -> matrix(0.618029,...)  veil 0.52 -> 1
```

**The reduced-motion row and the no-preference row are identical to the last digit.** A scroll-linked
`transform: scale()` is the canonical vestibular trigger; it is exactly what the preference exists to
suppress, and it is on **every pane header in the application**.

### Scope

`PaneHeader.vue` is the shared header for every pane. `pane-desc-shrink` also scrubs a `translateY`.
`pane-header-veil` is opacity-only and is defensible under PRM; the two transform/translate lanes are
not.

### What is NOT wrong — and no wave may born-RED against it

Measured in the same run: **under `reduce` the rAF rate is 0 on all five routes** (`raf/1.5s=0` vs
260-450 in every other matrix). `useMetaballRenderer`'s single-frame path and glass-ui's internal
aurora query both work exactly as `animations.css:180-182` claims. The WebGL story is correct; the
CSS scroll-timeline story is not. The file's comment is accurate about the RAF loops it names and
false in its own headline sentence.

### Disposition — STRUCTURE, not a gate (L-8)

The cure is not a `@media` override stacked on the guard — that repeats the mistake of patching a
blunt instrument. The three declarations move **inside** `@media (prefers-reduced-motion:
no-preference)`, alongside the existing `animations.css:43` block that already uses precisely this
idiom. Motion then cannot be declared for a reduced-motion user, and no gate is required to keep it
that way.

A gate is still owed for regression, and per L-2 it asserts a product property with a stated RED
input: *"with `reducedMotion: reduce`, the computed transform of `.pane-header-title` after a 200px
scroll equals its pre-scroll value"* — RED today, in both engines, by the run above.

**Cross-engine note (not a defect, recorded so no one chases it):** the post-scroll scale differs by
engine (0.311 WebKit / 0.618 Chromium) because `--pane-title-shrink-ratio` and the scroll delivered
to the timeline resolve differently. Any DELTA obligation on this element pins per-engine values.

---

## MT-F024 — The R1 crash is PUBLISHED, and its blast radius is the entire CSS colour-function family

**Severity.** BLOCKER. **BORN RED against the published artifact.** Supersedes and enlarges MT-F001,
which recorded this as a source-level defect in `oklch()`. It is neither only source-level nor only
`oklch`.

### Evidence — the packed npm artifact, not the source tree

`npm pack` of the tree at `tranche-u` c654824e, installed into a clean consumer package, imported
through real Node exports-map resolution:

```
CRASH   "oklch()"    -> TypeError: Cannot read properties of undefined (reading 'replace')
CRASH   "oklch( )"   -> TypeError: ...
CRASH   "rgb()"      -> TypeError: ...
CRASH   "hsl()"      -> TypeError: ...
CRASH   "lab()"      -> TypeError: ...
CRASH   "color()"    -> TypeError: ...
CRASH   "oklch(/)"   -> TypeError: ...
ok      "oklch(1 2)"  -> ok=false
ok      "rgb(/ 1)"    -> ok=false
ok      "color(srgb)" -> ok=false

crashes: 7/10
    at ae (…/node_modules/@mkbabb/value.js/dist/subpaths/css.js:265:17)
```

**The empty-argument form of every major CSS colour function throws an uncaught `TypeError`.**
`rgb()`, `hsl()`, `lab()`, `oklch()`, `color()` — this is not an exotic input class; it is what a
truncated stylesheet, a mid-edit input field, or a templating gap produces.

### Why this is a contract violation, not merely a bug

```ts
export function parseCssColor(source: string): ParseResult<CssColor> {
    const input = source.trim();
    if (!input) return failure(source, "css_syntax", ["color"]);
    if (/^(?:var|env)\(/i.test(input) || CONTEXT_COLOR.test(input)) {
        return failure(source, "color_context_required", ["context-free color"]);
    }
    ...
```

The function returns `ParseResult<CssColor>` — `{ok, value, diagnostics}` — and lines 258-263 are a
careful ladder of `return failure(...)` guards. **A parser that reports failure through a result type
is a total function by construction; that is the entire reason the type exists.** Every consumer is
entitled to write `parseCssColor(untrusted)` without a `try`. The type says it cannot throw. It
throws.

### The mechanism, in one line

`src/css/grammar.ts:181`
```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

For `rgb()` the body is empty, `splitTopLevel("", "/")` returns `[]`, and `slash[0]` is `undefined`.

### The causal chain — three green gates, one shipped crash

1. `tsconfig.base.json:10` sets `noUncheckedIndexedAccess: true`. The compiler **correctly** typed
   `slash[0]` as `string | undefined` and objected.
2. The `!` silenced it. A non-null assertion is a compiler override, and it was used to override a
   correct compiler.
3. `eslint.config.ts` has **no `@typescript-eslint/no-non-null-assertion` rule** (24+ rules are
   `"off"`, and there is no typed linting), so nothing flagged the override.
4. No hostile-input test exercises the empty-argument forms, so the suite stayed green.

Every gate reported success. The crash shipped to npm at 4.0.0 and is live for every consumer today.

### Disposition — STRUCTURE, not a gate (L-8)

A test asserting `rgb()` does not throw fixes one input. The defect class is *"a non-null assertion
overriding `noUncheckedIndexedAccess` inside a function whose type promises totality"*. The wave:

- **Delete the assertion at the site** and let the `undefined` branch return `failure(source)` —
  the ladder above already has the idiom, so the cure is to *join* it, not invent anything.
- **Ban the mechanism**: enable `@typescript-eslint/no-non-null-assertion` in `eslint.config.ts`.
  Measured scope for this ban is recorded below, so the wave is sized before it is written.
- **Total-function property test** over the generated cross-product of function name x
  degenerate body (`""`, `" "`, `"/"`, `"/ 1"`, `","`), asserting `parseCssColor` returns rather
  than throws — RED today at 7 of 10 by the run above.

Gate command, with its RED input stated per L-2:
`node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` — packs the repo, installs
it into a clean consumer, and asserts zero throws over the degenerate cross-product. **RED today,
exit code 1**, output pasted below.

### The totality sweep — the full blast radius, measured

All nine public `parse*` entry points x 172 degenerate inputs (every CSS function head x every
empty-ish body), against the packed artifact:

```
RED  parseCssColor             102/172 throw
RED  parseCssScalar            102/172 throw
RED  parseCssValue              60/172 throw
RED  parseCssValues             60/172 throw
ok   parseKeyframeSelector       0/172 throw
ok   parseStylesheet             0/172 throw
ok   parseTimingFunction         0/172 throw
ok   parseAnimationTimeline      0/172 throw
ok   parseAnimationRange         0/172 throw

TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
```

**One distinct failure mode. All 324 throws trace to the single `!` at `src/css/grammar.ts:181.`**
Four of the nine public entry points inherit it because they funnel colour parsing through that
site; the other five are clean. This is the rare defect whose cure is one character and whose blast
radius is a third of the published API.

That ratio is what makes the wave completable under L-1: delete the assertion, join the existing
`failure(...)` ladder, land the property test. One session, one wave, closed on its own evidence.

### Scope of the ban, measured (L-9, `src/` only, excludes node_modules/dist)

```
$ grep -rEn '[A-Za-z0-9_])]\!(\.|\[|,|\)|;| )' src --include='*.ts' | wc -l   ->  148  (all non-null assertions)
$ grep -rEn '\[[^]]*\]\!'                        src --include='*.ts' | wc -l   ->  141  (indexed-access, 95%)
```

by file: `decompose.ts` 32 - `grammar.ts` 31 - `path.ts` 25 - `stylesheet.ts` 12 - `quantize.ts` 11 -
`operations.ts` 8 - `easing.ts` 7 - `anchors.ts` 6 - `math.ts` 5 - `timeline.ts` 4.

**141 of 148 assertions are indexed-access** — that is, `noUncheckedIndexedAccess` is switched on and
then overridden 141 times. The flag is doing its job and is being told to be quiet.

This measurement changes the wave shape, which is why it is taken at authorship (L-1). A blanket ban
is a 148-site edit and is **not** individually completable; specifying it as one wave would be an arc
wearing a wave's name. So the ban is NOT specced blanket. The wave fixes the one crashing site and
lands the totality gate; the remaining 140 are recorded as a measured population with a per-file
census, and any wave that proposes to reduce them must state its own completable scope.

**Searched for siblings and found none.** The exact crash shape — indexed access, `!`, immediate
member call — occurs at six sites:

```
src/css/stylesheet.ts:602   match[2]!.trim()          regex group, always defined -> SAFE
src/css/grammar.ts:181      slash[0]!.replace(...)    SPLIT result, may be []     -> THE DEFECT
src/css/grammar.ts:373      call[2]!.trim()           regex group                 -> SAFE
src/css/grammar.ts:420      named[1]!.toLowerCase()   regex group                 -> SAFE
src/css/timeline.ts:23      scroll[1]!.replace(...)   regex group `(.*)`          -> SAFE
src/css/timeline.ts:38      view[1]!.replace(...)     regex group `(.*)`          -> SAFE
```

Five index a regex capture group that is guaranteed once the pattern matched. Only `grammar.ts:181`
indexes a **split** result, which is `[]` for empty input. The five safe sites were each checked
rather than assumed, and are recorded here so no later wave re-litigates them.

### Coordination consequence (E13)

keyframes.js imports value.js subpaths at **61 sites** and glass-ui at **10**. Any of them that
parses user or stylesheet-derived colour text inherits this crash. An outbound packet is owed to both
instances naming the input class and the published version, so they can assess exposure without
re-deriving it.

---

## MT-F025 — Every "Safari" capture in this formation is Playwright WebKit, not Safari; a sibling repo has a real-Safari crash on bytes we ship

**Severity.** EVIDENCE-INTEGRITY, and it bounds a standing owner mark. Established 2026-07-24.

**Owner mark M-5** requires visual audit "**In safari, on mobile and desktop**". Every capture this
formation has taken — the 60-shot route matrix, the 30-row state matrix, every component seat's live
probe — ran **Playwright WebKit build 2287** (playwright 1.60.0). The machine has **Safari 26.4**.
These are not the same binary, and this formation has not yet run one frame in the browser the mark
names.

**Why it is not pedantry here.** The atlas/sci facility filed a P0 into glass-ui BJ today
(`glass-ui/docs/tranches/BJ/coordination/atlas-outbound-2026-07-24-q-audit-relay.md` §0): glass-ui
7.0.0's `.glass-dock:not(.vertical) .dock-plate` background **terminates the WebKit renderer with
SIGABRT** in Safari, evidenced by a macOS `.ips` crash report with
`WebCore::Style::toStyleColor(WebCore::CSS::ColorMix const&, …)` on the faulting thread.

The blamed construct is **byte-identical in our installed bytes**:

```
node_modules/@mkbabb/glass-ui/dist/components/dock/styles/morph.css
  sha256 70ef4937b9c17e365f7e9282ddabc6dde2a5d556c9f823905da16fda5e9165d9
  .glass-dock:not(.vertical) .dock-plate { background:
      color-mix( in srgb,
        color-mix( in oklab, var(--glass-bg-dock, var(--glass-bg-resting)),
                   var(--glass-tint-source) var(--glass-tint-strength) ) calc(var(--dock-expand-t) * 100%),
        color-mix( in oklab, var(--glass-bg-wash),
                   var(--glass-tint-source) var(--glass-tint-strength) ) ); }
```

Nested `color-mix`, both endpoints themselves `color-mix` — atlas's exact mechanism. We pin
`@mkbabb/glass-ui` `^7.0.0`, resolved **7.0.0**. Our dock is on every route.

**And we did not crash.** Playwright WebKit resolved the property to a value
(`color(srgb 0.931227 0.845921 0.816039 / 0.5392)` light, `color(srgb 0.390298 … / 0.5776)` dark)
across 5 routes x 6 state matrices with `err=0`.

**Two readings, and the honest one is not the flattering one.** Either atlas's crash is conditional
on inputs we do not produce, **or Playwright WebKit is blind to it**. Nothing measured so far
distinguishes them, and the second is entirely plausible: Playwright's WebKit is a custom
minibrowser build with a different process architecture from Safari's, and a renderer-process abort
is exactly the class a different build can diverge on.

**Therefore, bounding this formation's own claims (binding):**

- WebKit captures remain valid evidence for **layout, DOM, CSS resolution, and behaviour**.
- They are **not** evidence for "Safari does not crash", "Safari renders this", or any
  process-stability claim. No wave may cite them for that, and MT-F022's own "what is NOT wrong"
  list is scoped accordingly.
- Every π obligation touching Safari stability must name **Safari 26.4 via safaridriver**, not
  WebKit, or state plainly that it is a WebKit proxy.

**Blocked, with the exact unlock.** `safaridriver -p 4599` starts, but session creation returns:

> `Could not create a session: You must enable 'Allow remote automation' in the Developer section of
> Safari Settings to control Safari via WebDriver.`

This is a one-time manual toggle no agent can perform. **Owner action, if real-Safari witness is
wanted:** enable *Safari → Settings → Advanced → Show features for web developers*, then
*Develop → Allow Remote Automation*; `safaridriver --enable` may also prompt once. Until then the
mark M-5 "in Safari" clause is **partially unmet and is recorded as such rather than reported green**
— which is precisely the close-class lie (green-over-broken) this formation exists to refuse.

---

## MT-F026 — OWNER-MARKED: dock pills carry a floating elevation shadow while the plate they sit on casts none

**Severity.** MAJOR (visual truth / design-system boundary). **BORN RED.** Owner-marked 2026-07-24.
**Witness (committed):** `audit/visual/owner-marked/OM-1-dock-item-shadows.png`
sha256 `0acde9ceed7c240c92a3f9a60cebc33ec820e8578cee5418327ab9820c8e7fcf`.

Owner's words: *"mark these inappropriate shadows on the dock items."*

### Measured

`node docs/tranches/V/megatranche/audit/probes/owner-marked-shadows.mjs` (WebKit, 1440x900, `#/`,
dock hovered open):

```
plate box-shadow: none
"Login"   insetLayers=5   CAST LAYERS:
    color(srgb 0.11 0.098 0.09 / 0.14) 0px 8px 24px 0px
    color(srgb 0.11 0.098 0.09 / 0.05) 0px 0px 0px 0.5px
    class: button tap-squish focus-ring glass-wash glass-capsule glass-capsule-ho…
"@mbabb"  insetLayers=5   (identical)
```

**The relationship is inverted.** The container casts nothing; each child casts an 8px-down,
24px-blur elevation. A drop shadow is a claim about *height above the surface behind it* — these
pills sit **on** the dock plate and claim to float above the page. That is why they read as stickers
applied to the glass rather than controls inset into it.

### Mechanism — a design-system bypass, not a stray CSS line

The pills are hand-rolled `<button class="… glass-wash glass-capsule glass-capsule-hover">`.
In glass-ui 7.0.0:

```
dist/styles/glass/glass-capsule.css
  .glass-capsule { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom),
                               var(--glass-shadow-floating); }
dist/styles/glass/ladder.css
  .glass-wash    { box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); }
```

`box-shadow` is a single property, so one rule wins — `.glass-capsule`, carrying
**`--glass-shadow-floating`**, the elevation token for a *free-floating* surface. Applying it to a
capsule that lives inside chrome is a category error, and it is inherited rather than authored: no
line in `demo/` asks for this shadow.

Glass ships dedicated dock primitives (`DockIconButton`, `DockSelectTrigger`,
`DockDropdownTrigger`) precisely so in-chrome controls get chrome elevation. These two pills do not
use them.

### Disposition — STRUCTURE (L-8), and glass-first (standing feedback)

Not a demo override. `demo/` must not patch `box-shadow` on a glass class — that is the masking
fallback the standing edict forbids and it would silently diverge from the design system.

1. **Adopt the glass dock primitive** for the Login and profile pills, so elevation comes from the
   component that knows it is in chrome. This is the preferred cure and needs nothing from glass.
2. **If no primitive fits the pill shape**, the ask goes to glass BJ as an in-chrome capsule
   elevation variant (`--glass-shadow-inline` / a `glass-capsule` chrome modifier). Relayed in
   §G of the outbound packet — an ask, not a local edit.

**Gate (L-2, RED input stated):** *"every focusable control inside `.glass-dock` has zero non-inset
box-shadow layers."* RED today — 2 controls, 2 cast layers each, by the probe above.

**Relay:** this is a glass-ui-level row and is relayed per the standing BH/BI edict.

---

## MT-F027 — OWNER-MARKED: the cartoon cast shadow facets into sharp corners on rounded cards

**Severity.** MAJOR (visual truth). Owner-marked 2026-07-24.
**Witness (committed):** `audit/visual/owner-marked/OM-2-card-shadow-sharp-corners.png`
sha256 `2e223c1a91df6a77191e0b925709a7d9cc35cf0ac409c81c8847acb5cf6e3de8`.

Owner's words: *"mark these shadow edge artifacts--sharp corners, on some cards/palette items."*

Visible in the witness: the "Sunset · 5" palette card has a rounded silhouette, but its cast shadow
resolves to a hard right-angle wedge at the bottom corners instead of following the radius.

### Mechanism — established from source; see the honesty note below

`node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-atom.css`:

```css
.cartoon-cast {
    position: absolute; inset: 0; z-index: -1;
    border-radius: inherit;
    box-shadow: var(--shadow-cartoon-md);
    translate: calc(-1 * var(--cast-travel) + var(--cartoon-cast-dx))
               calc(var(--cast-travel) + var(--cartoon-cast-dy));
    scale: var(--cast-spread);
}
```
```css
--shadow-cartoon-md: -3px 3px 0 var(--cartoon-ink-lead),
                     -5px 5px 0 var(--cartoon-ink-mid),
                     -7px 7px 0 var(--cartoon-ink-contact);
```

**Every layer has blur radius `0`.** A zero-blur `box-shadow` reproduces the element silhouette
exactly. Three such silhouettes, offset on the *same* diagonal at 3/5/7px and painted in three inks,
form a stepped union: along the straight edges the steps are collinear and invisible, but **at a
rounded corner the three arcs are offset from one another and their union has visible facets** —
which is the hard corner in the witness. The consumer amplifies it: `PaletteCard.vue:19` composes
`rounded-card cartoon-surface` with a deliberate **`NO overflow-hidden`** (its own comment cites
S.W5-10 / S-15-A), so nothing clips the cast back to the card's radius.

### ⚠ Honesty note — what I did NOT establish

**I could not reproduce this live.** On both `#/palettes` and `#/browse` the harness measured
`cartoon-surface: 0` and `[class*=cartoon]: 0` — the data-backed palette cards do not render in an
unauthenticated headless session (the owner's witness shows a real "Sunset" palette; my probe has no
palettes). So the mechanism above is **read from source and from the token values, not measured on
the rendered element.** The radius-match hypothesis (`border-radius: inherit` resolving wrong) is
explicitly **NOT** confirmed and may be innocent — the faceting explanation does not require it.

Per L-9 and L-12 this row therefore carries a **reproduction obligation before its wave may close**:
render a data-backed `PaletteCard` (seeded fixture or authenticated session), then measure
`getComputedStyle('.cartoon-cast')` for `borderTopLeftRadius` / `borderBottomLeftRadius` against its
parent's, and capture the corner at ≥4x. A wave that cures this on my source reading alone would be
curing an unmeasured defect — exactly what MT-F022 caught this formation doing four times.

### Disposition — BUILD, cure candidates ranked but not chosen

The wave chooses on measurement, not on this note:

1. **Nest the offsets** so the three layers share a common outer silhouette (add spread to the inner
   layers: `-3px 3px 0 0`, `-5px 5px 0 -1px`, `-7px 7px 0 -2px`) — keeps the cartoon ink look, kills
   the corner facet.
2. **Single-layer cast** with the ink gradient supplied by the three-stop colour rather than three
   geometry layers.
3. **Clip the cast to the card radius** via a wrapper — rejected on sight unless (1) and (2) fail,
   because `PaletteCard.vue:16` records a prior tranche deliberately removing exactly such a clip.

`--shadow-cartoon-md` is a **glass-ui token**, so any change to its layer geometry is a glass ask,
not a demo edit; option (1) is authored there. Relayed in §G.

---

## MT-F028 — The layout baseline: mobile amputates content, ultrawide caps it, and three mechanisms fork the difference

**Severity.** MAJOR (design, app-wide). **Owner-directed (M-13), 2026-07-27.** This is the measured
baseline the layout-gestalt design band starts from; its numbers are the born-RED inputs.

**Reproduction.** `node docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs`
(WebKit; 7 routes × 6 viewports; dev server API-less — data-backed routes read low on text
everywhere, which cancels out of the mobile-vs-desktop comparison).

### The two failure ends

**Mobile does not under-use width — it under-delivers content.** At 390×844 the shell spans 92–96%
of the viewport, gutters a uniform 16px. But `#/` renders `text=69` against `893` at desktop (~8%),
`#/blob` `68` vs `748` — the pane router shows ONE pane and (per the scenes challenger) `/blob`'s
configurator leaves the DOM entirely below 1024px. Height goes void where content is thin: 73–78%
content-height coverage on `#/browse` `#/generate` `#/mix`. The mobile variant is the desktop
composition with panes amputated, not a bespoke composition.

**Pathologically wide screens get dead margin.** Content-width coverage: 86% @1440 → 70% @2560 →
**65% @3440** (~600px of symmetric dead gutter). Cause located: `demo/styles/shell.css:69-71` caps
the workspace at `calc(var(--pane-max) * 2 + var(--pane-gap))`. The 16px page gutter is a constant
at every width from 390 to 3440.

### The mechanism census (what the tree uses today)

```
@container rules        0     ← zero container-query branching
container-type          1     (shell.css:83, the pane wrapper)
cqi/cqw units          18     (all fed by that single context)
@media rules           34     ← the layout fork lives here
Tailwind lg:* fork      +     (App.vue desktop/mobile v-if + class fork)
JS isMobile fork        +     (mobilePaneIndex, per-breakpoint slot plumbing → App D-1 inert mobile controls)
dvh/svh                 8     · 100vh 0   ✓ already modern
clamp()                22     · minmax() 2 · aspect-ratio 8
subgrid                 0     · grid-template-areas 0
```

**Three parallel adaptation mechanisms** (media queries, utility-class fork, JS v-if fork) express
one decision — "what does this route look like at this width" — and they demonstrably desynchronise
(App D-1: mobile action bar inert because slot plumbing forked per breakpoint). One containment
context exists and works; nothing above the pane level uses it.

### ⛔ CENSUS CORRECTED by the M-13 tri-fold (2026-07-27) — my count was a 3.4× undercount

The band's worker-O re-measured, and the arbiter re-verified against the tree (L-10 applied to this
finding's own numbers):

- **"34 `@media`" was the TOTAL; only 7 are viewport-dimension queries.** The other 27 are
  `prefers-*`/forced-colors/print/pointer/hover — capability queries that must SURVIVE any cure.
- The true adaptation surface is **102 sites in 3 incompatible dialects**: 7 viewport `@media` +
  **58 Tailwind `sm:/md:/lg:` prefixes across 28 files** + **37 JS breakpoint references across 13
  files**. (Worker-F independently under-counted the Tailwind arm 4.8× — a gate keyed to the low
  count would have closed green with 46 prefixes alive; cf. L-2.)
- **The ultrawide dead zone is worse than my width-only measurement**: `foundation.css:479`'s
  two-axis arithmetic caps the content block at 608px at 3440×1440 — **~86% of the viewport AREA is
  dead**, against my 65%-width figure.
- Two of the 7 viewport queries are capability questions wearing a width (ConsoleRail's
  `max-width:1023px` is really `(pointer:coarse)`; DockStatusLamp's `min-width:1024px` is really
  `@container dock` — and glass ALREADY ships those dock container rules; they are **dead code**
  today because the demo never passes `container-name="dock"`).

### Disposition — BUILD, via the M-13 tri-fold design band

The cure is a design, not a patch — chartered to the layout-gestalt tri-fold: ONE composition where
befitting, bespoke variants where not, expressed in the modern facilities (container queries on the
route scene, cq units, `dvh/svh`, grid + `minmax()`/`clamp()` fluidity to kill the ultrawide cap,
subgrid/areas where they delete wrapper divs), and ONE adaptation mechanism instead of three.
