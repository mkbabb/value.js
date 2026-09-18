# CHALLENGE-L — library structure under `demo/workbenches/mix/MixPane.vue`

> **This file is the consolidated CHALLENGE-L record (pass E).**
> Four prior CHALLENGE-L seats ran this component. All four are **preserved verbatim,
> byte-identical**:
> - pass A — `challenge-L-library-pass-a.md` (sha1 `7e422be6…`, 39 471 B; F-1…F-17)
> - pass B — `challenge-L-library-pass-b.md` (sha1 `aee5d9d2…`, 30 860 B; B-1…B-5)
> - pass C — `challenge-L-library-pass-c.md` (sha1 `e5ae388e…`, 28 306 B; C-1…C-6)
> - pass D — `challenge-L-library-pass-d.md` (sha1 `0bf28a3e…`, 28 727 B; D-1…D-6)
>   — copied from this file's prior contents at pass E open (`diff -q` → byte-identical);
>   nothing altered or discarded.
>
> This file carries **pass E**: an independent fifth audit at `c654824e` under standing edict E-1,
> recording only what A, B, C and D did not have. Pass E contributes **one new MAJOR that no prior
> pass touched and that is the mechanical root cause of five already-filed findings**, **one
> severity upgrade of pass A's F-17 from INFO to MAJOR by direct measurement of a mechanism F-17
> did not name**, **two new MINORs**, one census extension, and **one withdrawn upgrade** recorded
> with the prior-pass evidence that killed it.
>
> Read pass A for F-1…F-17, B for B-1…B-5, C for C-1…C-6, D for D-1…D-6, this file for E-1…E-5 and
> the merged index.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
explicitly declared at this seat's spawn. The declaration is explicit, not inherited.

## Scope + method

Subject: `demo/workbenches/mix/MixPane.vue` (124 lines incl. trailing newline) and the module
lattice beneath it. Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD
`c654824e`.

Method, chosen to be disjoint from all four priors. A and B read the **source**; C read the
**rendered DOM**; D read the **live Vue component instances**. Pass E read the **enforcement
layer and the module graph as a graph** — I asked, of every structural rule the repo believes it
has, *does this rule currently match any file?*, and, of every import edge in MixPane's closure,
*what does this edge cost?* Two throwaway closure walkers (preserved, see Method note) measured
the demo-source and built-`dist` graphs. That is the one angle none of A–D took, and it is the
angle that finds why four passes of findings could accumulate without a gate objecting once.

**No source was edited. No file outside `…/wb-mix-pane/` was written.**

---

## Verdict

**DEFECTIVE.** Pass C's C-1 remains the ceiling and pass E does not displace it — a feature with no
working entry point outranks everything here.

Pass E's own strongest contribution is **E-1**, and it is a different *kind* of finding from the
prior 29: every one of those describes a structure that is wrong. E-1 describes why nothing
*noticed*. The three `no-restricted-imports` guards that `eslint.config.js` installs to keep the
demo module graph acyclic and correctly-directed — `G-DEMO-1`, `G-DEMO-3a`, `G-DEMO-3b`, each
carrying a paragraph of commentary asserting it is "wired STANDING so a future feature edit cannot
silently re-invert the demo module graph" — are aimed at `demo/@/**`, a directory the W43 `RF-15`
alias kill deleted. **They match zero files.** The one surviving glob bans a specifier prefix
(`@components/…`) that the same refactor retired. The demo has had no mechanical direction
enforcement since W43, and F-9 / C-3 / D-1 / F-17 / F-13 / E-2 are what grew in that gap.

---

# Pass E findings — the delta

## E-1 · MAJOR · NEW — the demo's three architectural ESLint guards match **zero files**; the module graph has been mechanically unenforced since W43

No prior pass touched this (`grep -n "G-DEMO\|demo/@" challenge-L-library-pass-{a,b,c}.md
challenge-L-library.md` → **no output**). Passes B and D both examined `eslint.config.js` — B-5
filed its *relaxation rationale* as false at HEAD, F-16 filed it as "structurally blind" for unused
vars. Both read the rule **values**. Neither read the file **globs**.

**The guards.** `eslint.config.js` installs three demo bans, each with extensive commentary:

```js
// G-DEMO-3b — reach palette-browser through its barrel seam, never a raw .vue file
files: ["demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
        "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
        "demo/@/lib/**/*.ts", "demo/@/lib/**/*.vue"]

// G-DEMO-1 + G-DEMO-3a — the shared composables layer is a CLEAN LOWER LAYER;
//   never reach UP into app-root boot, never into a feature's internal composables
files: ["demo/@/composables/**/*.ts", "demo/@/composables/**/*.vue"]
```

**The measurement.**

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ find demo -path 'demo/@/composables/*' | wc -l
       0
$ find demo -path 'demo/@/components/*' -o -path 'demo/@/lib/*' | wc -l
       0
```

`demo/@/` does not exist. `tsconfig.demo.json` states why, in its own words:

> W43 (RF-15): the demo `@…` path aliases were killed — every demo import is relative to its
> physical home. No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/`@assets` project alias
> survives.

The guards were not re-aimed when the tree moved.

**The one glob that still matches live files is disarmed too.** `demo/color-picker/**/*.{ts,vue}`
exists — but the pattern it bans is `@components/custom/palette-browser/**/*.vue`, an alias
specifier the same RF-15 retired:

```
$ grep -rn "@components/" --include='*.ts' --include='*.vue' demo/
demo/palettes/browser/status/index.ts:5:// (@components/custom/dock/DockStatusLamp.vue); the S.W0-1 …
```

One hit, inside a comment. Nothing in the demo can violate that pattern because nothing in the demo
can write that specifier.

**Control — the guard that still works.** `inv-K-1` (`files: ["src/**/*.ts"]`, ban
`@mkbabb/glass-ui*`) targets a live glob and a live specifier, and is genuinely load-bearing. So
this is not "ESLint is off"; it is precisely and only the **demo-layering** guards that died, and
they died silently because a config object with a non-matching `files` glob is not an error in flat
config — it is a no-op.

**Failure scenario — and it has already happened, five times.** With no direction enforcement:
- `demo/workbenches/mix/` acquired a value import of the composition root's provider module (E-2),
- the shell acquired an `any`-typed imperative reach *into* a feature (F-9 / C-3 / D-1),
- a 19-module alias layer onto the design system persisted uncontested (F-13),
- `test/` acquired an import of `demo/` (F-14),
- `demo/palettes/mix.ts` ended up with zero consumers in its own directory and two in another
  feature (B-2 / D-5).

Every one of those is an edge a live layer ban would have refused at author time. The config
asserts, in prose, that this cannot happen. It has been unable to object since W43.

**Reproduction** — the `ls`, two `find`s and the `grep` above, verbatim, at `c654824e`.

**Cure — re-aim at the lattice that actually exists.** The post-RF-15 demo layers, read off the
tree:

```
demo/platform/       transport · auth · storage          leaf
demo/color-session/  the colour spine (keys.ts is leaf)  may import platform
demo/palettes/       palette domain (+ ports.ts, E-2)    may import platform, color-session
demo/workbenches/    features                            may import palettes, color-session, shared
demo/shell/          router · dock · action bar          may import workbenches (registry only)
demo/color-picker/   boot / App.vue                      composition root; nobody imports it
```

Three `no-restricted-imports` objects encode the whole thing:

1. `files: ["demo/platform/**", "demo/color-session/**"]` — ban `**/shell/**`, `**/workbenches/**`,
   `**/color-picker/**`.
2. `files: ["demo/palettes/**"]` — ban `**/shell/**`, `**/workbenches/**`, `**/color-picker/**`.
3. `files: ["demo/workbenches/**", "demo/shared/**"]` — ban `**/color-picker/**`.

One object per file region, never two — flat config resolves `no-restricted-imports` last-match-wins
with no array merge, which the existing config already documents at length and which is exactly why
`G-DEMO-1`/`3a`/`3b` were fused into single objects in the first place. That reasoning was sound;
only the globs rotted.

**Note on the alias-kill lesson.** RF-15 was a good refactor — pass D's N-D3 re-confirms the demo's
value.js consumption is structurally clean, and killing the `@…` aliases is why. The defect is that
a tree move invalidated the guards protecting the tree, and no gate reports a zero-match ESLint
glob. If a single mechanical follow-up lands from this whole audit, it should be a check that every
`files:` glob in `eslint.config.js` matches ≥ 1 file.

---

## E-2 · MAJOR · **UPGRADES pass A's F-17 from INFO to MAJOR** — the injection *key* is co-homed with the god provider, so importing a `Symbol` drags 34.2% of MixPane's static closure

F-17 filed this as INFO and framed it as **API granularity**: *"a pane that saves a palette should
depend on saving a palette, not on the whole local-library surface."* That is correct and it is not
what this is. F-17 measured the *port object* (19 members, 1 used). Pass E measured the **module
graph**, which F-17 did not look at, and the mechanism there is different and worse.

**The mechanism.** `demo/palettes/usePalettePorts.ts:271-275` declares the five injection keys —
plain `Symbol`s — **inside the same module as `providePalettePorts()`**, whose lines 4-18 statically
import fifteen composables. `MixPane.vue:10` and `MixSourceSelector.vue:6` each write a **value**
import to obtain one of those Symbols:

```ts
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
```

A value import pulls the module's entire static closure. The key cannot be reached without the
provider.

**The measurement.** Demo-source static-import closure, `import type` edges excluded (so every byte
is a byte the dev server and bundler must actually fetch), dynamic `import()` excluded:

```
MixPane full closure      : 81 modules 313693 bytes
MixPane WITHOUT ports edge: 52 modules 206276 bytes
reachable ONLY via ports  : 29 modules 107417 bytes 34.2%
```

**34.2% of a colour-mixing workbench's static closure exists to obtain one `Symbol`.** Enumerated,
those 29 modules are the admin console, the auth stack and the HTTP transport:

```
demo/palettes/api/admin-audit.ts       demo/platform/auth/sessionToken.ts
demo/palettes/api/admin-colors.ts      demo/platform/auth/sessions.ts
demo/palettes/api/admin-palettes.ts    demo/platform/auth/useAdminAuth.ts
demo/palettes/api/admin-users.ts       demo/platform/auth/useSession.ts
demo/palettes/api/versions.ts          demo/platform/auth/useUserAuth.ts
demo/palettes/useAdminUsers.ts         demo/platform/transport/client.ts
demo/palettes/useColorNameQueue.ts     demo/platform/storage/useSafeStorage.ts
demo/palettes/useSlugMigration.ts      demo/platform/transport/api-problem.ts
demo/palettes/useAdminFlagged.ts       … (+11)
```

**The cure already exists in this repo, twelve directories away, and nobody has noticed.**
`demo/color-session/keys.ts` is the same concept done correctly — six injection keys, `import type`
only, and:

```
demo/color-session/keys.ts     1 modules  1474 bytes
```

One module. 1,474 bytes. `MixPane.vue:11` imports `CSS_COLOR_KEY` from it and pays nothing.
`demo/palettes/` simply never received the same treatment, and the asymmetry is invisible at every
gate because both imports look identical at the call site.

**Why MAJOR and not INFO.** F-17's framing is an ergonomics complaint — a wide port is ugly. This is
a hard dependency-direction violation with a number on it: `demo/workbenches/mix/` cannot be
compiled, unit-tested, chunk-split, or extracted without `demo/platform/auth/` and
`demo/palettes/api/admin-*`. Pass B measured (B, line 406) that MixPane's *lazy chunk* adds zero
bytes because these modules are already eager via `App.vue` — that is true and it is the reason this
is MAJOR rather than BLOCKER, but it is also the trap: the cost is invisible in the bundle precisely
*because* the composition root already pays it, so the graph can keep degrading with no bundle
signal.

**Reproduction:**
`node /private/tmp/claude-504/…/scratchpad/demograph.mjs demo/workbenches/mix/MixPane.vue demo/palettes/usePalettePorts.ts demo/color-session/keys.ts`
→ `81/313693`, `31/108763`, `1/1474`; plus the ban-one-edge variant printed above.

**Cure — transposition, not patch.** `demo/palettes/ports.ts`: the five port **interfaces** stated
explicitly, plus the five `InjectionKey` constants. Zero value imports. `usePalettePorts.ts` then
does `import type { LibraryPort, … } from "./ports"` and `satisfies LibraryPort` on each assembled
object. Under `verbatimModuleSyntax: true` (`tsconfig.base.json:8`) the type edge erases completely,
so `ports.ts` is a true leaf and consumers pay 1 module instead of 31.

This also fixes something F-17 wanted but could not get: `LibraryPort` stops being a
`ReturnType<typeof providePalettePorts>` shadow of whatever the provider happens to return and
becomes a **stated contract**. Once the contract is written down, F-17's granularity split (a narrow
`createPalette`-shaped port) is a one-line interface change instead of a refactor. And with E-1's
layer bans live, the edge that produced this could not have been written.

---

## E-3 · MINOR · NEW — one injection key, two contradictory contracts, four files apart; one of them is dead masking

Not in any prior index (`grep -n "pm?\.\|inject(LIBRARY_PORT_KEY)"` across A–D → no output).

**The two contracts.**

`MixPane.vue:16` — asserted present:
```ts
const pm = inject(LIBRARY_PORT_KEY)!;
```

`MixSourceSelector.vue:33-34` — masked absent:
```ts
const pm = inject(LIBRARY_PORT_KEY);
const savedPalettes = computed(() => pm?.savedPalettes.value ?? []);
```

Same key. Same feature directory. Sibling components, one the parent of the other.

**The provider settles it.** There is exactly one:

```
$ grep -rn "providePalettePorts" --include='*.ts' --include='*.vue' demo/
demo/color-picker/composables/usePaletteWiring.ts:60:    const ports = providePalettePorts({
```

`usePaletteWiring` is invoked from `App.vue`, above every pane in the tree. `LIBRARY_PORT_KEY` is
therefore **unconditionally provided** whenever either component can mount. `MixPane`'s `!` states
the truth; `MixSourceSelector`'s `pm?.` + `?? []` is a **dead masking fallback** — edict 2's exact
prohibition, and the same species as the `?.()` masks pass A filed as F-9 and pass D confirmed
lethal in D-1.

**Failure scenario.** If the provider ever *did* go missing — a pane mounted outside `App`, a future
test harness, a storybook-style isolation — the two components produce different symptoms for one
cause: `MixPane` throws at line 43 (`pm.createPalette`), `MixSourceSelector` renders an empty
palette list and reports nothing. Divergent failure modes for identical missing state is strictly
worse than either failing consistently.

**Cure.** One contract: `inject(LIBRARY_PORT_KEY)!` in both, matching the provider's actual
guarantee, and delete the `?? []`. Falls out for free while landing E-2's `ports.ts`, which is the
natural moment to state the contract once and stop re-deciding it per file.

---

## E-4 · MINOR · NEW — MixPane is a courier for a dependency its child already knows how to inject

Not in any prior index (`grep -n "CSS_COLOR_KEY\|prop-drill\|courier"` across A–D → no output).

`MixPane.vue:15` injects `CSS_COLOR_KEY`. Its **only** use is passing it straight down:

```ts
const cssColorOpaque = inject(CSS_COLOR_KEY)!;      // :15  — sole declaration
```
```html
:css-color-opaque="cssColorOpaque"                  <!-- :84 — sole use -->
```

The receiving child injects a *different* key on its own account four lines into its setup
(`MixSourceSelector.vue:33`), so it is plainly capable of injecting this one. Two mechanisms for
dependency acquisition inside a single parent/child pair.

The prop version also **weakens the contract**: `MixPane` has `ComputedRef<string>` guaranteed
present (`inject(…)!`), but hands it over as `cssColorOpaque?: string`
(`MixSourceSelector.vue:21`), which forces a guard the injection would not need:

```ts
function addCurrentColor() {
    if (cssColorOpaque) { emit("addColor", cssColorOpaque, "picker"); }   // :69-73
}
```

A required dependency became optional in transit, and the optionality is then handled by silently
doing nothing — the same masking shape as E-3, arrived at from the other direction.

Project law, from memory of record: *"`cssColorOpaque` injected via `CSS_COLOR_KEY` (not
prop-drilled)."* MixPane is the exception.

**Cure.** `MixSourceSelector` injects `CSS_COLOR_KEY` directly. The prop, its optional type, the
`if` guard, and `MixPane.vue:15` all delete. MixPane's script drops to a single inject
(`LIBRARY_PORT_KEY`, itself deletable under F-17's granularity cure) plus the composable call.

---

## E-5 · CENSUS EXTENSION to pass D's D-2 — the missing affordance behind the two algebras, counted

D-2 established the root cause: two incompatible failure shapes across two subpaths, and two unwrap
adapters eight lines apart in `picker-color.ts`. Pass E adds the fleet census and a second,
independent reason the adapters proliferate.

**The census.**

```
$ grep -rn 'if (!.*\.ok) throw new Error' --include='*.ts' --include='*.vue' demo/ | wc -l
      18
```

Eleven in non-test source, seven in `demo/test/export/byte-exact.test.ts`. **Four wrap `mixColors`
specifically**, each with a bespoke message and no shared taxonomy:

```
demo/palettes/mix.ts:36                                     `Color mix failed: ${result.error.code}`
demo/workbenches/gradient/…/useGradientInterpolation.ts:37  `Gradient color mix failed: …`
demo/workbenches/mix/MixAnimationCanvas/…/mixStage.ts:106   `Pigment mix failed: …`
demo/color-session/ink.ts:153                               `Muted ink mix failed: …`
```

**Two of the four are on MixPane's own chain** — `demo/palettes/mix.ts` via `useMixingState.ts:21`,
and `mixStage.ts` via `MixAnimationCanvas`. So the single act of pressing "Mix" traverses two
independently hand-rolled unwrap adapters for one library call.

**The second cause, complementary to D-2's.** Even with one algebra, the published surface offers no
way to *consume* it. `src/foundation/result.ts` is six lines:

```ts
export type Result<T, E> = { readonly ok: true; readonly value: T }
                         | { readonly ok: false; readonly error: E };
export const ok  = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

`src/subpaths/color.ts:1-13` re-exports `Result` as a **type only**. Neither `ok` nor `err` nor any
combinator (`unwrap`, `unwrapOr`, `expect`, `mapResult`) reaches any of the seven published subpaths
— verified by reading `src/subpaths/color.ts` in full. The package's headline property is
*failure-explicit* (`package.json:5`) and it ships nothing with which to be explicit about failure.
Eighteen adapters is the predictable result, and the eighteen live in the one consumer the
maintainer controls; an external consumer writes the nineteenth.

**Cure — additive to D-2's.** After D-2 unifies the algebra, publish from every `Result`-returning
subpath:

```ts
export function unwrap<T, E extends { readonly code: string }>(r: Result<T, E>, context: string): T;
```

Eighteen bespoke adapters collapse to eighteen call sites of one function with one message shape and
one place to change the taxonomy. This enlarges the *library* rather than the consumer, which is the
correct direction whenever N consumers each re-derive the same adapter — and here N is measurable.

---

## Negatives — pass E's own

### N-E1 · **WITHDRAWN UPGRADE** — I re-measured the glass-ui root-barrel cost intending to raise F-13 to MAJOR, and pass B had already disproved the severity

Independently, before reading the priors, I measured `demo/ui/`:

```
$ for d in demo/ui/*/; do … done      → 19 directories, each ONE index.ts, each a single-line
                                        re-export from the glass-ui ROOT barrel
$ node .../closure.mjs
glass-ui.js       66 files  224193 bytes      ← what `demo/ui/card` reaches
card.js           10 files   18979 bytes      ← what `@mkbabb/glass-ui/card` reaches
select.js         11 files   18628 bytes
collapsible.js     3 files    7407 bytes
```

and confirmed glass-ui publishes **68** subpath exports including every name the alias layer covers,
and that the *same feature folder* straddles both paths — `MixResultDisplay.vue:3,6` and
`MixSourceSelector.vue:4,7` import `/dock`, `/watercolor-dot`, `/tabs` correctly by subpath, while
`MixPane.vue:3`, `MixConfigBar.vue:9,10` and `MixSourceSelector.vue:5` go through the alias to the
root barrel.

**Pass C measured the identical 66 / 224,193 figure** (pass C, line 367) and **pass B measured the
downstream consequence and found it null** (pass B, lines 398-406): the root barrel carries 43
static chunk edges and MixPane's lazy chunk *"adds zero"*, because the composition root already
loads it. My upgrade would have double-counted a cost pass B had already shown is not paid at the
bundle. **F-13 stays MINOR. The upgrade is withdrawn.**

**What survives, and it is worth one paragraph.** Neither B nor C connected `demo/ui/` to the repo's
own written ruling on exactly this pattern. `demo/shared/utils.ts:12-18`:

> `debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier — the
> full-barrel import that drags the scroll-timeline grammar chunk (~36 KiB gz) into the eager graph
> for a 40-line timer utility.

That ruling was executed against value.js and it worked — the demo now writes zero bare
`@mkbabb/value.js` specifiers (verified: `grep -rn '@mkbabb/value\.js' demo/ | grep -v 'value\.js/'`
→ one hit, the comment itself). It was never applied to glass-ui, which is the larger barrel: 37
demo files still import `@mkbabb/glass-ui` root against 15 `/dock`, 11 `/watercolor-dot`, 9 `/dark`,
9 `/aurora`. F-13's cure (delete `demo/ui/`, 19 modules of zero behaviour) is therefore not a
judgement call — it is the *already-ratified* policy applied to the one package it skipped.

### N-E2 · The `gh-pages` production artifact contains no application code — **recorded as an environment observation, deliberately not reproduced**

`dist/gh-pages/assets/` holds four non-font files; `index-Dezn_h7o.js` is 698 bytes and contains
only Vite's modulepreload-polyfill IIFE — no Vue runtime, no component chunk, no CSS bundle.
`index.html` references that file and nothing else.

**Not filed as a finding.** Three `vite build` processes were running concurrently during this audit
(`ps aux | grep -c "[v]ite build"` → 3) and the artifact's mtime (`Jul 29 10:23`) falls inside this
session's window, so it may be a mid-flight write by a concurrent seat. I deliberately did **not**
run `npm run gh-pages` to reproduce: it writes `dist/`, and every other seat in this formation
resolves `@mkbabb/value.js/*` through that directory — reproducing would have corrupted their
evidence. Recorded because it matches the `CARRY-LEDGER §F` W44 carry ("the gh-pages prod-preview
empty-mount = the first deep-audit probe"); **whoever owns the build lane should reproduce it in
isolation.**

This follows pass D's N-D1 discipline directly: a measured absence proves nothing until its cause is
ruled out, and here I could not rule it out without damaging the run.

### N-E3 · MixPane's own module hygiene is clean, and the live route is clean — the axis is bounded

Positive evidence, recorded so the defect list is not mistaken for a verdict on the file itself:

- **`verbatimModuleSyntax` (edict 8): fully satisfied.** `MixPane.vue:13`
  (`import type { PaletteColor }`), `useMixingState.ts:19,20,23`, `MixAnimationCanvas.vue:3,4,6`,
  `MixConfigBar.vue:12,13,14,15`, `MixResultDisplay.vue:7`, `MixSourceSelector.vue:10,11` — every
  type-only import in the cone is `import type`. Zero violations.
- **No deep-path reach into `src/`.** `grep -rn 'from "@src' demo/` → 0 (third confirmation, after
  pass B and pass D's N-D3). Every value.js import in MixPane's closure is one a real npm consumer
  could write — the T.W1 demo-dogfood keystone holds.
- **The live route is clean.** `docs/tranches/V/megatranche/audit/visual/REPORT.md:123,138,153,168` —
  `/#/mix` across all four Safari matrices: **0** page errors, **0** console errors, **0** horizontal
  overflow, `main` count exactly **1**, `darkClassMissing` **0**. (`smallTapTargets: 8` desktop / `4`
  mobile is an a11y-axis row; noted and passed on.)
- **The screenshot renders correctly.** `shots/safari-desktop-light/mix.png` read directly: header,
  `SegmentedTabs`, the empty "Selected" dashed well, both selects (OKLab / Shorter), the correctly
  disabled Mix button. `MixConfigBar`'s preview ramps are absent, which is **correct** —
  `MixPane.vue:103` passes `operand-colors` as `[]` with no selection, exactly as the T.W6 comment
  at lines 92-96 states.

**Nothing in the visual evidence contradicts any finding across five passes, and nothing in it adds
one.** These defects are invisible at runtime by construction — which, with E-1, is the whole
explanation for how they accumulated through eight closed V′ units.

---

## The greenfield lattice — merged

Pass A's lattice as amended by B, C and D is correct and pass E adopts it whole. Pass E amends two
lines and adds one law.

**`demo/palettes/`** — amended: **`ports.ts` is a leaf** holding the five port *interfaces* and the
five `InjectionKey`s, with zero value imports; `usePalettePorts.ts` imports the types and
`satisfies` them (E-2). The existing `demo/color-session/keys.ts` is the in-repo proof this shape
works and costs 1,474 bytes.

**`eslint.config.js`** — amended: **three layer bans aimed at globs that match live files** (E-1),
plus a check that no `files:` glob in the config matches zero files. Without this the lattice is a
document; with it, the lattice is a gate.

**New cross-cutting law pass E adds — *a structural rule that matches no file is worse than no rule,
because it reads as coverage.*** The demo carries three such rules, each with a paragraph of prose
asserting a guarantee it has not been able to provide since W43. Five of the twenty-nine findings in
this merged index are edges those rules were written to refuse. The rule that makes structural
linting trustworthy: **a guard must fail when you delete its subject, not fall silent.** Concretely —
assert the match count, or scope the ban by *specifier* (which survives tree moves) rather than by
*file glob* (which does not). `inv-K-1` does the latter and is the only demo-adjacent guard still
working.

---

## Merged findings index — pass A (F-*) + B (B-*) + C (C-*) + D (D-*) + E (E-*)

| id | sev | family | finding | anchor | pass |
|---|---|---|---|---|---|
| **C-1** | BLOCKER | D | `WatercolorDot` prop contract is fiction at glass-ui 7.0.0; both colors-mode add paths dead | `MixSourceSelector.vue:166,215` | C |
| F-1 | MAJOR | A | N-ary mix order-dependent — measured 120° hue divergence | `demo/palettes/mix.ts:39` | A |
| F-2 | MAJOR | B | Two clipboard impls + two serializers, divergent UX | `MixPane.vue:49` / `MixResultDisplay.vue:42` | A |
| F-3 | MAJOR | B | `MixResult` not a discriminated union → 11 masking guards | `useMixingState.ts:32` | A |
| F-4 | MAJOR | A | `Result` erased by throwing adapter; no failure surface | `picker-color.ts:104` | A |
| D-2 | MAJOR | A | Library publishes TWO incompatible failure algebras (`.error` vs `.diagnostics`) — root cause under F-4 | `src/css/types.ts:26` / `picker-color.ts:104,113` | D |
| **E-5** | **MAJOR** | **A** | **D-2 censused: 18 hand-rolled unwrap adapters in demo, 4 wrapping `mixColors`, 2 on MixPane's chain; `ok`/`err`/no combinator reach ANY published subpath** | **`src/foundation/result.ts` / `src/subpaths/color.ts:1`** | **E** |
| B-1 | MAJOR | D | Pigment travels through the DOM as JSON + silent `catch` | `mixStage.ts:140,150` | B |
| C-2 | MAJOR | D | `[data-mix-target]` never exists → B-1's invented-geometry fallback is the ONLY branch taken | `MixResultDisplay.vue:68` / `mixStage.ts:121` | C |
| F-6 | MAJOR | C | `paths` forked from `exports`; 3 dead keys, 2 missing | `tsconfig.demo.json:42` | A (B·C-1, C·N-C1, D·N-D3, E re-derived) |
| F-7 | MAJOR | C | Two resolution mechanisms in one file | `picker-color.ts:1,28` | A (B·C-1, D·N-D3) |
| F-8 | MAJOR | C | Undeclared frozen `value.js@4.0.0`; `css.d.ts` differs from checkout (10,910 vs 12,490 B) | `node_modules/@mkbabb/value.js` | A (B·C-2, E re-measured) |
| F-9 | MAJOR | D | Shell→feature `Ref<any>` + `?.()` masks | `usePaneRouter.ts:107,220` | A (B·C-4) |
| C-3 | MAJOR | D | F-9's channel never bound in the mobile layout — CONFIRMED by D-1 | `App.vue:83,319,331` | C (D-1) |
| D-1 | MAJOR | D | C-3 closed by direct instance read: mobile `mixPaneRef` = null, all 3 dock actions rendered; desktop = live | live `App.setupState` | D |
| **E-1** | **MAJOR** | **D** | **The 3 demo architectural ESLint guards (G-DEMO-1/3a/3b) target `demo/@/**`, deleted at W43 — 0 files matched; the surviving glob bans a retired specifier. No mechanical direction enforcement since W43 — the enabler under F-9/C-3/D-1/F-17/F-13/F-14** | **`eslint.config.js` (G-DEMO objects)** | **E** |
| F-14 | MAJOR | D | `test/` imports `demo/`; `test/` in no tsconfig program | `test/mix-v4.test.ts:3` | A (D-5) |
| B-4 | MAJOR | B | `PickerColorIn<S>` forces 6 casts, 2 `as unknown as`, on library returns | `picker-color.ts:36` | B |
| **E-2** | **MAJOR** | **D** | **F-17 upgraded INFO→MAJOR by measurement: the injection Symbol is co-homed with the god provider — 29 modules / 107,417 B / 34.2% of MixPane's static closure reachable ONLY via that edge (admin API + auth + transport). In-repo cure precedent: `demo/color-session/keys.ts` = 1 module / 1,474 B** | **`usePalettePorts.ts:272` / `MixPane.vue:10`** | **E** |
| F-5 | MINOR | A | Space type 17-wide, UI offers 9 | `useMixingState.ts:44` | A |
| F-10 | MINOR | D | Child defines parent's scroll host, unscoped | `PaneHeader.vue:40` | A (D-6) |
| F-11 | MINOR | B | `export/` (11 modules) test-only; `export.ts` is live | `demo/palettes/export*` | A |
| F-12 | MINOR | D | Duplicated pane chrome | `MixPane.vue:61` | A (D-6, E re-derived: 6 `Card tier="resting"` sites) |
| D-6 | MINOR | D | F-12 re-censused: 4 independently-duplicated layers; MixPane's outer wrapper inert | `MixPane.vue:61-62` | D |
| F-13 | MINOR | D | `demo/ui/` = 19 pure aliases onto the glass-ui ROOT barrel; 48 importers, 24 straddle | `demo/ui/card/index.ts` | A (B·C-3, C-6, E·N-E1) |
| F-16 | MINOR | D | Dead `computed` import; lint AND `noUnusedLocals` both structurally blind | `MixPane.vue:2` | A (B-5, E re-derived) |
| B-2 | MINOR | A | `demo/palettes/mix.ts` consumed from another feature | `useMixingState.ts:24` | B (D-5) |
| D-5 | MINOR | A | B-2 re-censused: 3 importers (2 demo + 1 test), ZERO in `demo/palettes/` | `demo/palettes/mix.ts` | D |
| B-3 | MINOR | B | `INTERPOLATION_SPACES` re-exported by the vacated path | `useGradientInterpolation.ts:17` | B |
| B-5 | MINOR | D | Lint relaxation's rationale false at HEAD | `eslint.config.js:8` | B |
| C-4 | MINOR | D | Three parallel homes for demo tests (10 / 1 / 3) | `vitest.config.ts:20` | C |
| C-5 | MINOR | D | `test/dist/` workaround outlives the deleted directory | `vitest.config.ts:25` | C |
| D-3 | MINOR | D | `MixConfigBar` type-imports `reka-ui` directly, bypassing glass-ui; 4 sites fleet-wide | `MixConfigBar.vue:15` | D (E re-derived) |
| D-4 | MINOR | A | `PaletteMixOptions.weights` dead surface kept alive by its own test; `weight`/`weights` name two concepts | `demo/palettes/mix.ts:25` | D |
| **E-3** | **MINOR** | **D** | **One injection key, two contradictory contracts 4 files apart: `inject(…)!` vs `inject(…)` + `pm?.` + `?? []`. Provider proven unconditional at App root → the `?.` is dead masking (edict 2)** | **`MixPane.vue:16` / `MixSourceSelector.vue:33-34`** | **E** |
| **E-4** | **MINOR** | **D** | **MixPane is a courier for `CSS_COLOR_KEY` — sole use is prop pass-through, to a child that already injects a different key itself; required→optional in transit, guarded by silence** | **`MixPane.vue:15,84` / `MixSourceSelector.vue:21,69`** | **E** |
| F-15 | — | B | superseded by B-4 (INFO → MAJOR) | `picker-color.ts:35` | A→B |
| F-17 | — | D | superseded by E-2 (INFO → MAJOR) | `MixPane.vue:16` | A→E |

**Totals: 33 live findings — 1 BLOCKER, 17 MAJOR, 15 MINOR, 2 superseded.** Pass E contributes 4 new
(2 MAJOR, 2 MINOR), one severity upgrade with a new mechanism (F-17 → E-2, INFO → MAJOR), one census
extension (D-2 → E-5, MAJOR), and one **withdrawn** upgrade recorded in full with the prior-pass
evidence that killed it (N-E1, F-13 stays MINOR).

**Strongest defect overall (all five passes): C-1** — unchanged. A feature with no working entry
point outranks everything structural.

**Strongest defect pass E contributes: E-1.** It is the only finding in thirty-three that is about
the **enforcement layer** rather than the structure, and it is the mechanical reason the other
thirty-two could accumulate. Three `no-restricted-imports` guards, each carrying prose asserting the
demo module graph "cannot silently re-invert", have matched zero files since W43 deleted `demo/@/`.
Five of the filed findings are edges those guards were written to refuse. Every other finding across
five passes says *this is wrong*; E-1 says *and nothing was watching*.
