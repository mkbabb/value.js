# CHALLENGE-C — `PaletteSlugBar.vue` · the implementation is defective (pass 5)

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context variant) —
the tier this seat was **explicitly declared** with at spawn. Declared, not inherited, not inferred
from ambient context. Receipt logged.

---

## Standing of this document

Fifth independent pass on this axis. All four predecessors are preserved verbatim:

- `challenge-C-implementation.run-1.md` — pass 1, **C-1..C-19**
- `challenge-C-implementation.run-2.md` — pass 2, **C-1..C-25**
- `challenge-C-implementation.run-3.md` — pass 3, **C-1..C-29**
- `challenge-C-implementation.run-4.md` — pass 4, **C-1..C-37** (+ the C-34 REPORT correction, the
  C-35 harness correction)

This pass was run **blind**. I read the SFC, the compiled vendor bundles it binds against, the auth
composables downstream of it, the visual REPORT and the `/#/palettes` screenshot, and built my own
mounting harness — and only opened the predecessors at write-up time, to place results and avoid
re-numbering. The convergence table in §1 is therefore genuine triangulation, not paraphrase.

**Verdict: DEFECTIVE.** Unchanged, and now with a new reason to care: the defect the disposition's
own remedy would be built to catch is *invisible to the default configuration of the test tool this
repo already ships*.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue`, 243 lines.
Repo: branch `tranche-u`; the subject file's last touch is `f2c8f565` (the glass-ui 7.0.0 adoption).

### What pass 5 contributes

1. **C-38 — a cure-blocking harness defect (MAJOR, NEW).** `@vue/test-utils` stubs `<Transition>`
   **by default**. In that configuration C-3 (the focus bug) *reads cured*. Measured both ways in
   one probe. **Pass 4's own 18-probe harness runs stubbed** — its output prints
   `<transition-stub>` — so no jsdom instrument in this audit has ever actually observed C-3, and
   the born-RED gate proposed in every prior disposition would have shipped green.
2. **C-39 — the empty-token boundary (MAJOR, NEW).** Five inputs, including `ADMIN_TOKEN=""` — the
   single most likely thing an operator pastes out of an unset `.env` — normalise to the **empty
   string** and are emitted as an *admin token*. The parent runs `clearUserSlug()` **first**, so the
   user session is destroyed and no admin session replaces it (`!!"" === false`). Silent double
   sign-out, junk persisted to `localStorage`, no error.
3. **A harness that runs, and that measures the transition.** `repro/` — 6 files, 23 assertions,
   verified green from the repo path, with the shipped `--duration-fast: 0.2s` leave replayed into
   jsdom so `mode="out-in"` behaves as it does in a browser.
4. **Eleven prior findings re-derived blind** by instruments the earlier passes did not use,
   including the first *direct* observation of C-2's mechanism (paired form-origin vs input-origin
   dispatch of the same `submit` event through the same mounted component).

---

## 0 · How to reproduce everything in this document

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/PaletteSlugBar/repro/vitest.repro.config.ts
 ✓ …/repro/probe.test.ts    (4 tests)
 ✓ …/repro/escape.test.ts   (1 test)
 ✓ …/repro/submit.test.ts   (1 test)
 ✓ …/repro/a11y.test.ts     (3 tests)
 ✓ …/repro/c5-new.test.ts   (7 tests)
 ✓ …/repro/slugbar.test.ts  (7 tests)
 Test Files  6 passed (6)
      Tests  23 passed (23)
```

`repro/vitest.repro.config.ts` resolves root and include relative to its own `import.meta.dirname`
and adds `@vitejs/plugin-vue` — which the repo's own `vitest.config.ts` does **not** have, so the
shipped gate cannot import an SFC at all (C-18). No source file was edited by this seat.

---

## 1 · Blind convergence — pass 5's instruments, pass 5's receipts

| prior | pass-5 instrument (different from every earlier pass) | receipt |
|---|---|---|
| **C-2** submit binds to the `<input>` | **paired dispatch of the same `submit` Event through one mounted component** — once from the `<form>`, once from the `<input>` | form-origin: `emitted: undefined`, `submitDefaultPrevented: false`. input-origin: `emitted: '[["alpha-bravo-charlie-delta",false]]'`, `defaultPrevented: true`. Same component, same event type, opposite outcome — the handler's node is proven by construction |
| **C-2** vendor mechanism | read of `dist/search.js` render fn | `inheritAttrs: !1`; `o = g(() => { let {class: e, ...t} = a; return t })` spread via `mergeProps` into `b("input", w({ref_key:"inputRef",…}, o.value, {…}))` — never onto `j(e.tag)` |
| **C-2** negative control | Escape dispatched from the input | `{ slugEditMode: false, inputStillMounted: false }` — `@keydown.escape.stop` **works**, because keydown *originates at* the input. Same binding, opposite event origin. This is the cleanest possible proof of placement |
| **C-1** orphan | full-tree tag grep + git archaeology on the deleting commit | 4 hits, all barrel/type-only, zero `<PaletteSlugBar` tags. `git grep 95993197^` shows the last mount site was `PaletteDialog/components/PaletteControlsBar.vue:4`, removed by a commit whose own subject reads *"the dead named set + CC-6 orphan removed, code grep-zero"* (2026-07-10) |
| **C-1** consequence | `grep -rn "slugBarRef" demo/` + read of the live twin's template | six hits, all in `useSlugMigration.ts`; nothing assigns it. And `SlugEditLayer.vue` declares `slugError` at `:13` and **never renders it** — its template `:75-119` has no error node. Both error surfaces are structurally absent |
| **C-3** focus never lands | **instrumented `HTMLElement.prototype.focus` + the shipped 0.2 s leave replayed into jsdom** | `{inputExistedWhenFocusRan: false, focusCalls: [], activeElementTag: 'BODY'}` — `focus()` was not merely ineffective, it was **never called**; the double-`?.` swallowed it |
| **C-4** in-flight state unrenderable | `slugSwitching` sampled at every point the scheduler could flush | `[false, false, false]` |
| **C-5** admin catch-all | boundary-value cases (see C-39) | `"alpha-bravo-charlie"` (one word short) → `["alpha-bravo-charlie", true]` |
| **C-6/C-7** naming + announcement | rendered-attribute census on the mounted SFC | input: `{"ariaLabel":null,"ariaDescribedby":null,"ariaInvalid":null,"id":null,"autocomplete":null,"type":"search","labelFor":undefined}`; error `<p>`: no `role`, no `aria-live`, no `id` |
| **C-8** pill unreachable | `tabIndex` read on the rendered pill | `<span class="slug-pill cursor-help" data-state="closed" data-grace-area-trigger …>` · `tabIndex: -1` |
| **C-9** dead `variant` prop | rendered DOM of both edit-mode Buttons | `class="button tap-squish focus-ring glass-wash glass-capsule shrink-0" variant="ghost"` — `glass-wash glass-capsule` is the **default `secondary`** recipe; the intended quiet weight never applies, and `variant` sits in the DOM as junk |
| **C-10** 22 px target | Tailwind v4 token arithmetic against the vendor stylesheet | `--spacing: 0.25rem`; `.p-1{padding:var(--spacing)}` = 4 px; `.w-3\.5{width:calc(var(--spacing)*3.5)}` = 14 px → **22 px**, under the audit harness's own floor (`visual/capture.mjs:98` — `.filter((m) => m.w < 24 \|\| m.h < 24)`) |
| **C-11** timer leak | `setTimeout`/`clearTimeout` spies around `unmount()` | `{timersArmedAt50ms: 3, clearTimeoutCallsOnUnmount: 0, slugEditModeAfterUnmount: true}` — three rapid clicks arm three timers, none cleared, and the callback still mutates state **after** unmount |
| **C-14** stale error | `setError()` → `resetEditMode()` replay | `"Login Slug not found."` still rendered after reset |
| **C-12** dead surface | emission census + file grep | `emitted keys: []` after `onCopySlug()`; `hasSavedPalettes` occurs exactly once in the file — its own declaration |
| **C-18** vacuous gates | both gates re-run at this HEAD | `npx vue-tsc -p tsconfig.demo.json --noEmit` → no output, **exit 0** · `npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue` → **EXIT=0** |
| **C-20** focus not restored | Cancel-button replay | `{activeElement: 'BODY', inputStillMounted: false}` |

All eleven stand. Nothing in the prior record was falsified by this pass.

---

## 2 · New findings

### C-38 · MAJOR (NEW, **cure-blocking**) — `@vue/test-utils` stubs `<Transition>` by default, and in that configuration the focus defect reads CURED

Every disposition written on this axis ends with the same remedy: *land the born-RED test first*.
That remedy has a trap in it, and it has already caught this audit.

`@vue/test-utils` v2 replaces `<Transition>` and `<TransitionGroup>` with `transition-stub` unless
the mount options say otherwise. A stub renders its child **immediately**. `mode="out-in"` — the
entire mechanism of C-3 — ceases to exist. Measured, both configurations, in one probe
(`repro/c5-new.test.ts` C-38):

```
C-38 default (Transition STUBBED):   {"transitionStubbed":true, "inputAtFocusTime":true,
                                      "focusCalls":["INPUT"], "activeElement":"INPUT"}
C-38 un-stubbed (shipped behaviour): {"transitionStubbed":false,"inputAtFocusTime":false,
                                      "focusCalls":[],         "activeElement":"BODY"}
```

Read the first line as a test result: *the input exists, `focus()` was called on it, and it is the
active element.* That is a **green** reading of a component whose shipped behaviour is
`focusCalls: []` and `activeElement: BODY`. The harness does not merely fail to catch C-3 — it
**asserts the opposite**.

This is not hypothetical. Pass 4's harness runs stubbed; its own committed output contains:

```
$ npx vitest run --config docs/…/probes/c4-vitest.config.ts
    </div>
  </transition-stub>                       ← the subject's <Transition>, erased
 ✓ …/probes/c4-slugbar.probe.test.ts (18 tests) 126ms
 Test Files  1 passed (1) · Tests 18 passed (18)
```

(Re-run at this HEAD by me: still green, still stubbed.) Pass 4 derived C-3 correctly — but from CSS
token measurement and reasoning, **not** from its jsdom instrument, which could not have seen it.
Pass 5 is the first pass to observe C-3 directly, and only because the stub was disabled.

The cure for C-38 is one mount option, and it must be written into whatever gate lands:

```ts
mount(Component, { global: { stubs: { transition: false } } })
```

…plus, if the assertion depends on transition *timing* rather than mere ordering, a replay of the
real duration — vitest runs with `css: false`, so jsdom reports `transitionDuration: ""` for
`.vj-morph-leave-active` and Vue resolves the leave in the same frame. `repro/c5-new.test.ts:19-41`
shows the four-property `getComputedStyle` shim that replays the shipped `--duration-fast: 0.2s`
(`demo/styles/animations.css:112-117` ×
`glass-ui/dist/styles/tokens/scheme-motion.css`).

**Why this is MAJOR and not INFO:** the repo's stated program is to close the vacuous gate (C-18).
A component gate authored with the tool's defaults would ship *green assertions about behaviour that
does not happen*, which is strictly worse than the current state of having no gate at all — it
converts an absence of coverage into a false certificate. It also generalises: **every** component
in this demo that uses `<Transition>` (`Dock.vue:272`, `DockViewSelect.vue:75`,
`ActionBarLayer.vue:134`, `MixPane.vue:111`, `MixResultDisplay.vue:60`,
`ExtractWorkbench.vue:102`, `ImageDropZone.vue:36` — seven `vj-morph` sites plus the `vj-enter`
family) inherits the same blind spot the moment anyone starts testing them.

**Cure (structural, not per-test):** the un-stub belongs in a shared `config.global.stubs` default
in `vitest.config.ts`'s setup file when the component gate is stood up — not in each test's mount
options, where it will be forgotten exactly once and that once will be the wave that regresses a
transition.

---

### C-39 · MAJOR (NEW) — an unset `ADMIN_TOKEN=""` line signs the user out of everything, silently, and persists an empty token

Pass 2's C-5 established the negated classifier (any non-four-word input is an admin token) and
pass 4's C-30 established that an `ADMIN_TOKEN=`-prefixed *four-word* token is mis-routed to the
public login endpoint. Neither enumerated the **empty** boundary, which is the most likely operator
input of all.

`normalizeTokenInput` (`:188-196`) strips the `ADMIN_TOKEN=` prefix and then a surrounding quote
pair. Applied to an *unset* env line, both strips succeed and nothing is left. The early guard
`if (!raw) return` at `:200` cannot see this: it tests `raw`, before normalisation. Measured
(`repro/c5-new.test.ts` C-39, five cases, all through the mounted SFC):

```
C-39 "\"\""           → [["",true]] | editModeClosed: true | error: ""
C-39 "''"             → [["",true]] | editModeClosed: true | error: ""
C-39 "ADMIN_TOKEN=\"\"" → [["",true]] | editModeClosed: true | error: ""
C-39 "ADMIN_TOKEN=''"   → [["",true]] | editModeClosed: true | error: ""
C-39 "  \"\"  "        → [["",true]] | editModeClosed: true | error: ""
```

`switchSlug("", true)`. The parent, `useSlugMigration.ts:52-56`, has no validation and no error
branch on this path — and note the **order**:

```ts
if (isAdmin) { deps.clearUserSlug(); deps.adminLogin(value); setActiveTab("saved"); return; }
```

1. `clearUserSlug()` → `useUserAuth.ts:129-133` → `_registrationCancelled = true; clearAuth()`. The
   user's session is **already gone**.
2. `adminLogin("")` → `useAdminAuth.ts:35-38` → `adminToken.value = ""` +
   `safeSetItem(localStorage, "palette-admin-token", "")`.
3. `isAuthenticated = computed(() => !!adminToken.value)` → `!!""` → **false**.

Measured against the real composable (`repro/c5-new.test.ts`, `useAdminAuth` imported unmodified):

```
C-39 useAdminAuth after login(''): {"isAuthenticated":false,"getToken":"\"\"","localStorage":"\"\""}
```

Net user-visible result: the sign-in form closes, `activeTab` switches to `"saved"`, the user is
signed out of **both** identities, an empty string is persisted under the admin key, and
`slugError` is `""` — no message, because this path never reaches the (already-dead, C-1) error
channel at all. It is not even a failed login; it is a successful destruction dressed as one.

The severity is not the empty string per se — it is that **the destructive step runs before the
constructive one**, with no validation between them, on an input class the normaliser itself
manufactures. Any `normalizeTokenInput` result that fails to be a credential should have been
rejected before `clearUserSlug()` was ever called.

**Cure:** the same single transposition C-30 asks for. One exported predicate in
`demo/platform/auth/` that returns a *decision* — `{kind:"slug"} | {kind:"admin"} | {kind:"reject",
reason}` — evaluated **before** any teardown, with `reject` rendered. `clearUserSlug()` must be
downstream of a successful classification, never upstream of an unvalidated one.

---

## 3 · Negative proofs from this pass

Reported so no later seat re-spends the probe time. These are in addition to pass 4's six.

1. **Escape is not broken.** `@keydown.escape.stop` on `<SearchBar>` reaches the handler and closes
   edit mode (`repro/escape.test.ts` → `{slugEditMode: false, inputStillMounted: false}`). It looks
   like it should share C-2's fate and it does not — the difference is event *origin*, and that
   difference is C-2's proof, not a second bug.
2. **`v-model` is unaffected by `inheritAttrs: false`.** `modelValue` is a declared prop, so it
   binds normally: `modelValue: 'alpha-bravo-charlie-delta'` after a native `input` dispatch.
3. **`searchBarRef.value?.inputRef` is a valid path.** `SearchBar` exposes
   `inputRef: Ref<HTMLInputElement | null>`
   (`glass-ui/dist/components/search/SearchBar.vue.d.ts:18`) and the instance type unwraps it. C-3
   is a timing defect, not a wrong accessor — which is exactly why `focusCalls: []` (nothing was
   called) rather than a thrown error.
4. **`Popover` props are correct.** `trigger`, `openDelay`, `closeDelay` all exist on glass-ui 7's
   `PopoverProps` (`popover/Popover.vue.d.ts:3-15`); `size="xs"` is a valid `ButtonSize`
   (`ButtonSize = Extract<Size,"xs"|"sm"|"md"|"lg">`). `variant` is the *only* API drift in the file
   (C-9) — the glass-7 adoption missed one prop, not the whole surface.
5. **The tap-target census's silence on this component is explained, not exculpatory.** The
   component contributes 0 rows to `visual/REPORT.md`'s 60 small-tap-targets only because it renders
   nowhere (C-1). Its 22 × 22 trigger would add one row per route the moment it mounts.
6. **`verbatimModuleSyntax` (edict 8) is clean** in the subject: every import is a value import and
   every one is used; the sole type-only edge (`useSlugMigration.ts:6`) is correctly `import type`.
7. **Edict 1 (no god modules) is satisfied** — 243 lines, one concern. The problem is not size.

---

## 4 · Test truth (delta on pass 4's eight mutations)

Pass 4 enumerated M-1..M-8, all still valid at this HEAD (`vue-tsc` exit 0, `eslint` EXIT=0,
`grep -rn "PaletteSlugBar\|SlugEditLayer" test/ e2e/` → zero hits). Pass 5 adds the structural
reason no *future* gate would have caught them either:

| fact | evidence |
|---|---|
| The shipped vitest project **cannot import an SFC at all** | `vitest.config.ts` declares no `@vitejs/plugin-vue`. I had to author `repro/vitest.repro.config.ts` to mount anything |
| There is **no component-mount test anywhere in the repo** | `grep -rn "mount(\|shallowMount" test/ demo/test/` → no output, across 26 test files |
| `@vue/test-utils@^2.4.10` is an **unused devDependency** | no file imports it |
| The one test that touches `.vue` files reads them as **text** | `test/picker-blob-config.test.ts:11-16` — `demoFile(...)` + string assertions |
| And a naive gate written with the tool's defaults would **assert the opposite of reality** on C-3 | C-38, measured |

Add one mutation to the list:

| # | mutation | why nothing catches it |
|---|---|---|
| **M-9** | `<Transition name="vj-morph" mode="out-in">` → `mode="in-out"` (or drop `mode` entirely) | there is no test; and a jsdom gate written with VTU defaults cannot distinguish the three modes, because `<Transition>` is stubbed to a pass-through wrapper in all of them |

---

## 5 · Ranked findings — pass-5 delta

The full carried-forward table is `challenge-C-implementation.run-4.md` §7 and stands unamended.
Insertions:

| id | severity | one-line | pass |
|---|---|---|---|
| **C-38** | **MAJOR** | **NEW · cure-blocking** — `@vue/test-utils` stubs `<Transition>` by default; in that configuration C-3 reads **cured** (`focusCalls:["INPUT"], activeElement:"INPUT"` vs the shipped `[], "BODY"`). Pass 4's own 18-probe harness runs stubbed, so no jsdom instrument in this audit had ever observed C-3. Generalises to the 7+ `vj-*` transition sites in the demo | **5** |
| **C-39** | **MAJOR** | **NEW** — `ADMIN_TOKEN=""` / `""` / `''` (5 cases measured) normalise to the empty string and emit `switchSlug("", true)`; the parent runs `clearUserSlug()` **before** `adminLogin("")`, and `!!"" === false`, so the user is signed out of both identities with an empty token persisted and **no error at all**. The early `if (!raw) return` guard tests the pre-normalisation string and cannot see it | **5** |

Severity ordering is unchanged at the top: **C-2** (submit bound to the wrong node) remains the
strongest *implementation* defect, and **C-1 + C-30 + C-39** remain the costliest *live* cluster.

---

## 6 · Disposition (delta)

Pass 4's five-step cure stands. Pass 5 amends **step 5** and adds a precondition:

> **5 (amended). Land the born-RED test first — with `global: { stubs: { transition: false } }`, and
> add `@vitejs/plugin-vue` to `vitest.config.ts` so an SFC can be imported at all.**
> Without the first, the focus assertion ships green against a broken component (C-38). Without the
> second, no component test can exist in this repo, which is why none does (C-18).

And to step 3 (the auth predicate), add C-39's ordering constraint:

> **3 (amended).** The predicate must be evaluated **before** any session teardown.
> `clearUserSlug()` currently runs on an unvalidated input; an `ADMIN_TOKEN=""` paste therefore
> destroys the user's session on the way to failing to create an admin one.

Everything else — delete the orphan, give `useSlugMigration` a real error sink, rebuild the field
out of the design system's form primitive rather than `SearchBar` — is unchanged and re-affirmed by
this pass's independent measurements.

No source edits land from this seat. All artifacts are under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/`.

---

## 7 · Probe artifacts (pass 5)

| path | what it is |
|---|---|
| `repro/vitest.repro.config.ts` | self-resolving config; adds `@vitejs/plugin-vue` (absent from the repo's own vitest project) |
| `repro/c5-new.test.ts` | **C-38** (the `<Transition>` stub trap, measured both ways) + **C-39** (5 empty-token cases through the SFC, then the real `useAdminAuth`) |
| `repro/submit.test.ts` | **C-2** by paired form-origin / input-origin dispatch of the same `submit` event |
| `repro/slugbar.test.ts` | C-3 (instrumented `focus`, real 0.2 s leave), C-4, C-5, C-12, C-14, tap-target class census |
| `repro/a11y.test.ts` | rendered-attribute census (input, pill, menu trigger, error `<p>`) + focus-restoration replay |
| `repro/probe.test.ts` | transition-class engagement, glass-7 `variant` drift in the DOM, timer-across-unmount census |
| `repro/escape.test.ts` | negative control — Escape **does** reach the handler (C-2's proof of placement) |
