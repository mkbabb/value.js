# CHALLENGE-C — PaletteSlugBar.vue · implementation is defective (pass 3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was **explicitly declared** with at spawn; I did not inherit it and did not
infer it from ambient context. Declared seat, receipt logged.

---

## Standing of this document

Third independent pass on this axis. Both predecessors are preserved verbatim:

- `challenge-C-implementation.run-1.md` — pass 1, findings **C-1..C-19**
- `challenge-C-implementation.run-2.md` — pass 2, findings **C-1..C-25** (re-derivation + 6 new)

Nothing from either is discarded. **This pass was run blind**: I read the SFC, its composables, its
vendor dependencies, the API slug generator, the visual REPORT and the screenshots, and built my own
harness *before* opening either predecessor. I opened them only at write-up time, to place my results.

What this pass contributes:

1. **Independent re-derivation of 13 prior findings by different instruments** (blind convergence).
2. **One CORRECTION to a prior measurement** — C-9's repo-wide census was understated by 2.5× and
   missed 3 of the 5 dead values. Corrected below.
3. **Four new findings** — C-26..C-29.
4. **Three new negative proofs** — including a full 268,435,456-slug enumeration against the API's
   real word lists, which *bounds* C-5 and kills the obvious over-claim.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines).
Repo state at audit: branch `tranche-u`, HEAD `f36f780c` (moved from the c654824e in the brief;
the subject file is byte-identical at both — last touched by `f2c8f565`).

---

## Blind convergence — what pass 3 re-derived, and with what

Every row below was found from source *before* reading run-1/run-2, and each is confirmed. Blind
agreement across three seats with different instruments is the strongest form of corroboration this
program can produce for a finding that has no failing test.

| prior finding | pass-3 instrument | pass-3 receipt |
|---|---|---|
| C-2 submit binds to `<input>` | vendor source read of `dist/search.js` + jsdom dispatch on **both** nodes | `0` handler calls on `<form>` submit, `1` on `<input>`-targeted submit |
| C-2 consequence (native nav) | jsdom's navigation stand-in | `Not implemented: HTMLFormElement.prototype.requestSubmit` on the submit-button click |
| C-1 orphan | repo-wide grep + `git log -S` + REPORT.json string census + screenshot read | `95993197` deleted `PaletteControlsBar.vue`, the only `<PaletteSlugBar>` site; 0/60 captures contain its aria-labels |
| C-3 focus never lands | CSS source arithmetic on `.vj-morph-leave-active` | leave rides `--duration-fast`; `nextTick` inside `setTimeout(50)` resolves in the same microtask, ~200 ms early |
| C-4 in-flight state unrenderable | jsdom mount with a **forever-pending** parent handler | `spinner nodes while parent pending: 0`, `form still mounted: false` |
| C-5 admin catch-all | 6-case parameterised emission probe | 6/6 near-miss inputs emit `isAdmin=true` |
| C-6 input has no name | rendered-markup dump | `<input type="search" placeholder="enter slug..." class="input-bar-field">` — no `aria-label`, no label |
| C-7 error not announced | rendered-markup dump | `aria-live: undefined  role: undefined` |
| C-8 pill unreachable | focusable-node census on the mounted default mode | `focusable nodes: ['BUTTON:Account menu']` — the pill is a bare `SPAN`, `tabindex: undefined` |
| C-9 dead `variant` prop | `.d.ts` contract + rendered DOM | `variant="ghost"` present as a junk attribute beside `data-emphasis="secondary"` |
| C-10 22 px tap target | class arithmetic + the glass-ui coarse-pointer rule it opts out of | `p-1`(4)+`w-3.5`(14)+4 = **22 px**; `[data-control-target]{min-block-size:2.75rem}` never applies |
| C-11 timer across unmount | fake-timer count around `unmount()` | `pending timers at unmount: 1 · after unmount: 1 · fired on advance` |
| C-12 dead public surface | prop-warning capture + emit census | `[Vue warn]: Missing required prop: "hasSavedPalettes"`; `emitted after mount: []` |
| C-14 stale error | full user-path replay (submit own slug → press Cancel) | error **still rendered in default mode**: `"Already signed in as this slug."` |
| C-18 vacuous gates | re-run both gates | `vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0, 0 diagnostics**; `eslint <file>` → **0 problems** |

Harness (reproducible, committed): `probes/c3-slugbar.probe.test.ts` + `probes/c3-vitest.config.ts`.

```
$ npx vitest run --config docs/.../probes/c3-vitest.config.ts
Tests  17 passed (17)
```

It mounts the **real SFC against the real glass-ui 7.0.0 `SearchBar`/`Button`/`Popover`** — no stubs
of the subject's dependencies — so every number below is the shipped component's behaviour.

---

## CORRECTION to C-9 — the dead-`variant` residue is 51 sites, not 20, across 5 values

Pass 2 wrote:

> Repo-wide there are **20 such call sites** …
> `$ grep -rn 'variant="ghost"\|variant="outline"' demo/ --exclude-dir=node_modules | wc -l → 20`

That grep is **line-anchored and value-anchored**: it counts lines (not tags), and only two of the
values in use. A tag-aware scan of every `<Button …>` open tag in `demo/`:

```
$ python3 -  # regex over <Button\b[^>]*?> in every demo/**/*.vue
total <Button variant=...> sites: 51
Counter({'outline': 28, 'ghost': 19, 'primary-audacious': 2, 'destructive': 1, 'default': 1})
files: 22
naive grep count (the pass-2 command, re-run today): 57
```

Three consequences:

1. The residue is **51 sites in 22 files**, ~2.5× the reported figure.
2. **Three values were missed entirely** — `primary-audacious`, `destructive`, `default`. The first
   is not even a shadcn-era value; it is an invented rung that exists in no design system, dead on
   arrival. `ButtonEmphasis = "primary" | "secondary" | "quiet" | "text"` is the whole contract
   (`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4`).
3. The pass-2 command **no longer returns its own number** (57 today, 20 as quoted) — a census stated
   as a bare `wc -l` cannot be re-verified later. Findings in this program should carry the *shape*
   of the count, not just the integer.

PaletteSlugBar's own contribution is unchanged: **2 sites**, lines 19 and 31, both `variant="ghost"`.
The finding stands; the blast radius is larger than recorded.

*Cure (unchanged, restated):* `emphasis="quiet"` here, and `loading` instead of the hand-rolled
`Loader2` + `:disabled` pair. If a true ghost rung is wanted it belongs in glass-ui's
`ButtonEmphasis` union — never as a demo-side attribute (edict 4).

---

## C-26 · MAJOR (NEW) — a rejected parent handler escapes to the **global** error channel

Pass 1/2 established that the `catch` in `onSlugSwitch` (lines 216-221) is unreachable and that the
in-flight state cannot render (C-4, C-16). Neither pass measured where the parent's failure actually
*goes*. It does not vanish — it escapes the component entirely:

```
[B] rendered error text: null
[B] unhandled rejections captured: [ 'Error: 404 Slug not found' ]
[Vue warn]: Unhandled error during execution of component event handler
  at <PaletteSlugBar userSlug="azure-drifting-teal-fox" … >
```

**Mechanism.** `emit("switchSlug", …)` (line 213) invokes the listener through Vue's
`callWithAsyncErrorHandling`. The listener in the live wiring is `async onSlugSwitch`
(`demo/palettes/useSlugMigration.ts:51`). Its returned promise is **not** returned to the emitter,
so the component's `try/catch` — which has already run to completion synchronously — cannot see it.
Vue routes the rejection to `app.config.errorHandler`; with none installed it becomes a warn plus a
process-level `unhandledRejection`.

**Why this matters beyond C-4/C-16.** It converts a *typed, recoverable* API failure into an
*untyped global* one. `useSlugMigration` only catches inside its own body; anything thrown after the
first `await` in a nested action (e.g. `publishAllLocal` → `createAndSavePalette`) lands here. In a
browser this is an uncaught promise rejection in the console — the exact class of noise the
mega-tranche visual audit counts per route (`consoleErrors`, `pageErrors` in
`audit/visual/REPORT.json`). The component is a *manufacturer* of that class.

*Reproduction:* `probes/c3-slugbar.probe.test.ts` → `PROBE B`.

*Cure:* the emit contract must be honest about being asynchronous. Either the parent owns the whole
in-flight/error state (component becomes presentational, `pending`/`error` as props), or the event
carries a completion handle (`switchSlug: [slug, isAdmin, done: (err?) => void]`). Do **not** patch
by adding `.catch()` at the emit site — that re-hides the failure one level down.

---

## C-27 · MAJOR (NEW) — the classifier's *positive* side is sound; the defect is exactly and only the negation

C-5 (any non-4-word input becomes an admin token) is correct and severe. But the natural sharpening
of it — "and the regex probably also rejects legitimate server slugs" — is **false**, and a repair
built on that assumption would be wasted work. I enumerated the entire slug space the API can mint.

`api/src/modules/session/slugWords.ts:84-90`:

```ts
export function generateSlug(): string {
    const adj = ADJECTIVES[…], verb = VERBS[…], color = COLOR_TERMS[…], animal = ANIMALS[…];
    return `${adj}-${verb}-${color}-${animal}`;
}
```

```
$ node   # parse the 4 word lists out of slugWords.ts, cross-product all of them
ADJECTIVES 128 unique 128
VERBS      128 unique 128
COLOR_TERMS 128 unique 128
ANIMALS    128 unique 128
NON-[a-z]+ WORDS: none
slug space 268435456   looksLikeSlug failures 0
```

**All 268,435,456 minted slugs pass** `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/`, and no word in any list
contains a hyphen or a non-`[a-z]` character (a single `off-white`-style entry would have made every
user carrying it unable to sign in — it would have been classified as an admin token and their local
identity wiped). So the classifier is a **total, sound acceptor of the real slug space**.

That is what makes the finding precise and the cure cheap: the defect is **not** the predicate, it is
the unconditional `else` at line 205 —

```ts
const isAdmin = !looksLikeSlug(normalized);
```

— which treats "not a slug" as "therefore a credential of a different kind". The predicate needs no
change; the classification needs a third outcome (`invalid`). This also raises C-27's own severity
note for the API side: the word lists are now a **load-bearing contract of the client's parser**.
Adding a hyphenated word to `slugWords.ts` would silently start logging users out. That coupling is
undocumented in both files.

*Cure:* three-way outcome — `slug | adminToken | invalid`, where `adminToken` is only reachable via
the explicit `ADMIN_TOKEN=` sentinel (which `normalizeTokenInput` already parses, line 190) or a
separate affordance; everything else is `invalid` and renders an error **without touching session
state**. And a comment in `slugWords.ts` naming the client-side shape contract.

---

## C-28 · MINOR (NEW) — the focus call is double-optional-chained, so its own failure is unobservable

Line 179:

```ts
searchBarRef.value?.inputRef?.focus();
```

C-3 proved this focus never lands (the `out-in` leave has not finished, so the branch — and hence the
ref — does not exist yet). The *reason the bug survived nine months of passes over this file* is on
this line: **two optional chains swallow the miss silently**. `searchBarRef.value` is `null`, the
expression short-circuits to `undefined`, nothing throws, nothing warns, no test observes it.

This is a masking fallback in the sense of standing edict 2 — the guard is not protecting against a
legitimate absent case (the component *always* intends to focus here); it is converting a hard
failure into a no-op. Compare the live sibling, which has the same shape but *works*, because it
enters edit mode synchronously with no transition to lose the race against
(`demo/shell/dock/layers/SlugEditLayer.vue:20-22`).

*Reproduction:* NONE in jsdom — VTU stubs `<Transition>`, so the harness's `enterEditMode` succeeds
and focus resolves. This is precisely why the jsdom instrument cannot see C-3 and the live instrument
(pass 1, `insertedAtMs: 276`) can. Labelled: the *silent-swallow mechanism* is proven by reading; the
*focus miss* is proven by pass 1's live measurement, which I corroborate by CSS arithmetic below.

Corroboration of C-3 from a third source (`demo/styles/animations.css:111-116`):

```css
.vj-morph-leave-active {
    transition:
        opacity var(--duration-fast) var(--ease-accelerate),
        transform var(--duration-fast) var(--ease-accelerate),
        max-height var(--duration-fast) var(--ease-accelerate);
}
```

`mode="out-in"` mounts the enter branch only after that leave completes. `nextTick` (line 178)
resolves on the current microtask queue. The gap is the whole `--duration-fast` (200 ms per pass 2's
token read). The focus call runs into `null` every time.

*Cure:* drop the timer and the chain together — bind focus to the branch's own lifecycle
(`@after-enter` on the `<Transition>`, or `autofocus` on the field), and let a genuinely-absent ref
be a loud failure, not a shrug.

---

## C-29 · INFO (NEW) — the feature's public seam is itself unreachable

`demo/palettes/browser/index.ts` is authored as "the mega-feature's TOP-LEVEL SEAM (U.W-DEMO ·
U-F47) … External consumers reach the feature through THIS seam". It has **zero importers**:

```
$ grep -rn 'palettes/browser' demo/ | grep -v node_modules
demo/workbenches/mix/MixSourceSelector.vue:8   → ../../palettes/browser/card
demo/workbenches/generate/GenerateControls.vue:16 → ../../palettes/browser/card
demo/workbenches/extract/ExtractWorkbench.vue:200 → ../../palettes/browser/card
demo/color-picker/App.vue:176                  → ../palettes/browser/dialog
```

Every real consumer reaches a **sub-barrel**; nothing imports the top-level barrel. The barrel's own
header anticipates this ("App.vue's eager `index.js` chunk therefore still reaches
`MigratePalettesDialog` through the `dialog/` sub-barrel directly") — i.e. the file documents that
the tree-shake-honest path bypasses it, and then keeps existing as a contract nobody signs.

This matters to C-1's disposition, which is why it is filed rather than dropped: the barrel is the
*only* thing that still references `PaletteSlugBar` in value position
(`export { PaletteSlugBar } from "./slug";`, line 44). Deleting the orphan is a **three-line** change
(SFC, `slug/index.ts`, `browser/index.ts:44`), not a refactor — nothing can break, because nothing
imports the seam. The 4th reference, `useSlugMigration.ts:6/30`, is a type-only import plus a ref
that is never bound.

*Cure:* delete the orphan and its two export lines; then either delete the empty seam or give it a
consumer. A seam with no importers is a claim, not an interface.

---

## Hazard sweep — negative results (pass 3, independently run)

The brief names specific local hazard classes. Each was checked; each is **absent** here. Recording
the negatives so the next pass need not re-spend the probes.

| hazard | result | evidence |
|---|---|---|
| `defineModel` stale-read round-trip | **absent** — this component uses none (`ref` + `defineExpose` only). The *live sibling* does use it (`SlugEditLayer.vue:10`) but reads it only in the template. | compiled SFC output |
| oklch→HSV hue drift / `stableHue` | **N/A** — no color math; `cssColorOpaque` is passed straight to `:style` | lines 49 |
| `ValueUnit` nesting accumulation | **N/A** — no `ValueUnit` construction | grep |
| reka slider pointer-capture leak | **N/A** — no slider | grep |
| ungated rAF (PRM-RAF epidemic) | **absent** — no `requestAnimationFrame`, no per-frame work at all | grep |
| WebGL boot / context loss | **N/A** — no canvas | grep |
| `parseCssColor` crash class | **absent** — the component parses no CSS colour; the only parsing is the slug regex | read |
| **ReDoS on the slug regex** | **absent, measured** | 50 000-char adversarial inputs: `noDash 0.072 ms`, `dashes 0.007 ms`. `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/` has no nested quantifier over an overlapping class; backtracking is linear. |
| **`type: [String, null]` runtime prop** | **handled, not a bug** | the compiler emits `userSlug: { type: [String, null], required: true }`; Vue 3.5.35 guards it — `runtime-core.cjs.js:5094` `if (ctor === null)` |
| **props-destructure shadowing** | **compiles correctly** | line 205's local `const isAdmin` shadows the prop; the compiled output keeps the local and rewrites only the true prop reads to `__props.*`. Confusing, not defective. (Independently reproduces pass 2's C-25.) |
| `border-muted-foreground` (line 65) | **valid utility** | `--color-muted-foreground` is registered in `glass-ui/dist/styles/theme/bridges.css` |
| CSS injection via `cssColorOpaque` | **absent** | Vue object-`:style` sets through `el.style` — no declaration-splitting surface |

---

## Visual receipt (pass 3, read not asserted)

`audit/visual/shots/safari-desktop-light/palettes.png` (viewed): the identity affordance on
`/#/palettes` is the **dock** `Login` pill; the "My Palettes" pane carries a search field, a
"Start a new palette" tile and an empty state — **no slug pill, no three-dot menu, no `enter slug…`
field**. `REPORT.json` contains **0** occurrences of `Account menu`, `Cancel slug edit`,
`Sign in with slug`, `Switch account` or `Signing in` across all 60 captures. The component is
absent from the product, as C-1 states.

---

## Ranked findings (carried forward + pass 3)

Severity is the union across three passes; the "pass" column records where each was established.

| id | severity | one line | pass |
|---|---|---|---|
| C-2 | **BLOCKER** | `@submit.prevent` lands on `SearchBar`'s inner `<input>` (`inheritAttrs:false`) — **0** handler calls on a real form submit; the unprevented native submit replaces the document | 1 · 2 · **3** |
| C-1 | **BLOCKER** | zero render paths; `slugBarRef` never bound ⇒ all four `setError` calls are permanent no-ops ⇒ failed login is silent. Orphaned by `95993197`, which deleted the only consumer `PaletteControlsBar.vue` | 1 · 2 · **3** |
| C-5 | MAJOR | negated classifier ⇒ any non-4-word input is submitted as an admin token; on a logged-in user the parent first wipes the persisted identity | 1 · 2 · **3** |
| C-26 | MAJOR | **NEW** — the parent's rejection escapes as a global `unhandledRejection` + Vue warn; the component manufactures console-error noise | **3** |
| C-27 | MAJOR | **NEW** — the predicate is a *total sound acceptor* of all 268,435,456 minted slugs; the defect is exactly the `else`. Bounds C-5's cure and exposes an undocumented client↔`slugWords.ts` contract | **3** |
| C-3 | MAJOR | focus never reaches the input — `nextTick` resolves ~200 ms before the `out-in` enter branch exists | 1 · 2 · **3** |
| C-4 | MAJOR | `slugSwitching` round-trips inside one synchronous turn ⇒ spinner, in-flight name and double-submit guard unrenderable | 1 · **3** |
| C-21 | MAJOR | field unmounted and credential discarded in the same turn as the emit ⇒ the async error can never reach the field it describes | 2 |
| C-20 | MAJOR | `aria-haspopup="dialog"` vs the rendered `role="group"`; four buttons with no menu semantics or arrow-key nav; focus never restored | 2 |
| C-6 | MAJOR | slug input has no accessible name (placeholder only) | 1 · **3** |
| C-7 | MAJOR | error `<p>` has no `role=alert`/`aria-live`; input has no `aria-describedby`/`aria-invalid` | 1 · **3** |
| C-8 | MAJOR | identity pill is a bare `<span>` behind a hover-only root ⇒ unreachable by keyboard and by touch | 1 · 2 · **3** |
| C-9 | MAJOR | `variant="ghost"` is not a glass-ui 7 `Button` prop ⇒ filled render + junk DOM attribute. **Census corrected: 51 sites / 22 files / 5 dead values (was 20)** | 1 · 2 · **3 (corrected)** |
| C-18 | MAJOR | zero tests on either slug surface; `vue-tsc` EXIT=0 and `eslint` 0 problems over a dead, broken file | 1 · 2 · **3** |
| C-19 | MAJOR | the slug protocol is duplicated in `SlugEditLayer.vue`; `looksLikeSlug` and `normalizeTokenInput` are **byte-identical**, `onSlugSwitch`/`onSlugSubmit` 57.7 % similar | 1 · **3** |
| C-10 | MINOR | account-menu trigger is **22 × 22 px** (WCAG 2.2 §2.5.8 = 24) and, being hand-rolled, opts out of glass-ui's `[data-control-target]` 44 px coarse-pointer floor | 1 · 2 · **3** |
| C-11 | MINOR | uncancelled 50 ms `setTimeout` survives unmount and fires into a destroyed instance | 1 · **3** |
| C-12 | MINOR | dead public surface: unused **required** prop `hasSavedPalettes`, never-emitted `copy`, 2 of 3 `defineExpose` members unconsumed | 1 · **3** |
| C-13 | MINOR | `void writeClipboard(...)` discards the `{ ok }` result every other demo consumer awaits | 1 |
| C-14 | MINOR | no exit path clears `slugError` ⇒ the message persists into default mode after Cancel | 1 · 2 · **3** |
| C-28 | MINOR | **NEW** — the focus call's double optional chain silently swallows its own failure; a masking fallback (edict 2) and the reason C-3 survived | **3** |
| C-15 | MINOR | error line `absolute` + `whitespace-nowrap` with an unbounded server message; 160.6 px overflow measured | 1 |
| C-16 | MINOR | unreachable `catch` holding the 409/404/429 substring mapping that S.W2 W2-6 already disproved and replaced | 1 · **3** |
| C-23 | MINOR | `ADMIN_TOKEN=`/quote-stripping is a masking fallback and is why C-5's catch-all was never narrowed | 2 |
| C-22 | MINOR | hover/touch root chosen once from a non-reactive `matchMedia` read (glass-ui relay) | 2 |
| C-17 | INFO | design system reached via `demo/ui/*` pass-through shims + the root barrel instead of published subpaths | 1 |
| C-29 | INFO | **NEW** — `demo/palettes/browser/index.ts`, the declared "top-level seam", has zero importers; deleting the orphan is a 3-line change | **3** |
| C-24 | INFO | the e2e fixture's `FAKE_SLUG = "test-user"` (2 words) would be classified as an admin token | 2 |
| C-25 | INFO | two hypotheses killed: prop-shadowing does not mis-compile; `defineExpose` is ref-unwrapped | 2 · **3** |

---

## Disposition

**Verdict: DEFECTIVE.** Two BLOCKERs, thirteen MAJORs, nine MINORs, four INFOs — on 243 lines that
render on zero routes.

The cure is not a patch list. Ordered:

1. **Rule the orphan first (C-1, C-29).** Nothing else is worth spending until it is decided whether
   this component exists. If it does not: delete the SFC + `slug/index.ts` + `browser/index.ts:44`,
   and delete the never-bound `slugBarRef` and its type-only import in `useSlugMigration.ts` — then
   fix the *live* error path, which is currently a no-op for a reason nobody would guess from
   reading either file.
2. **If it is to live, the transposition — not the patch — is:** the slug protocol
   (`looksLikeSlug` / `normalizeTokenInput` / the three-way classification of C-27) becomes **one
   module** with tests, consumed by both surfaces (C-19); the component becomes **presentational**
   with `pending` / `error` as props and a completion-carrying event (C-4, C-21, C-26); the form is
   a real `<form>` the component owns, with `SearchBar` as a field inside it — or glass-ui grows a
   `submit` emit, which is the design-system-side home (C-2); the classification's third outcome is
   `invalid`, never "therefore a credential" (C-5, C-27).
3. **The gates must be made non-vacuous** (C-18). Five mutations keep `vue-tsc`, `eslint` and
   `vitest` green today; the cheapest honest gate is a mounted test of the *live* surface's submit
   path, which would have failed on C-2 the day it was written.

---

## Probe artifacts (pass 3)

- `probes/c3-slugbar.probe.test.ts` — 17 probes (G, G2, A, B, C, C2, D×6, E, F, F2, H, H2), mounts the
  real SFC against real glass-ui 7.0.0.
- `probes/c3-vitest.config.ts` — root-pinned config; `npx vitest run --config <it>` reproduces every
  number in this document.

Commands re-run for this pass, with their exits:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo exit=$?     → exit=0   (0 lines of output)
$ npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue      → (no output; 0 problems)
$ npx vitest run --config probes/c3-vitest.config.ts            → Tests 17 passed (17)
$ git log -S '<PaletteSlugBar' --oneline --all | head -1        → 95993197 (T.W0 legacy sweep)
```
