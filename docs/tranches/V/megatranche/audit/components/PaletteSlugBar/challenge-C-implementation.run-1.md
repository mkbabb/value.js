# CHALLENGE-C — PaletteSlugBar.vue · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat was
explicitly spawned with. Declared, not inherited.

---

## Subject & substrate

| item | value |
|---|---|
| component | `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines) |
| barrel | `demo/palettes/browser/slug/index.ts` → `demo/palettes/browser/index.ts:44` |
| paired composable | `demo/palettes/useSlugMigration.ts` |
| live twin | `demo/shell/dock/layers/SlugEditLayer.vue` |
| repo HEAD at audit | `7cae8bd0` (branch `tranche-u`) |
| dev server | `http://localhost:9000` (live, used for every measurement below) |

**Probe method.** The component is mounted on **zero routes** (finding C-1), so it cannot be reached
through the app UI. To measure the real thing under the real stylesheet in a real browser, I mounted
the *unmodified* SFC into the live dev page over Vite's `/@fs/` module route, reusing the page's own
Vue instance so glass-ui resolves to the single runtime:

```js
const COMP = "/@fs/Users/mkbabb/Programming/value.js/demo/palettes/browser/slug/PaletteSlugBar.vue";
const src  = await (await fetch(COMP)).text();
const vue  = await import(src.match(/from "(\/@fs\/[^"]*deps\/vue\.js[^"]*)"/)[1]);
const mod  = await import(COMP);            // → the real compiled SFC
vue.createApp({ render: () => vue.h(mod.default, { … }) }).mount(host);
```

No repo file was modified. All numbers below are pasted tool output.

**Verdict: DEFECTIVE.** 19 findings, **2 BLOCKER**, 8 MAJOR. The component is unreachable dead code,
and — separately — its one job (log in with a slug) is *structurally broken*: the submit handler is
bound to an element that can never receive a submit event, so activating it performs a **native
browser form navigation** instead of a login.

---

## C-1 · BLOCKER — the component renders on zero routes; its error surface is a permanent no-op

`PaletteSlugBar` is exported, typed against, and reasoned about by a composable — and mounted
**nowhere**.

```
$ grep -rn "SlugBar\|slug-bar" --include=*.vue --include=*.ts . | grep -v node_modules
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
e2e/smoke/flows/login-register.spec.ts:6: * The SlugBar live-app surface is only inside the PaletteDialog
```

There is no `<PaletteSlugBar …>` tag in any template in the repo. `PaletteDialog` — the surface the
e2e comment names — no longer exists (`demo/palettes/browser/dialog/` holds
`FlagReportDialog`/`MigratePalettesDialog`/`VersionHistoryDrawer` only).

**The consequence is not cosmetic.** `useSlugMigration.ts:30` declares `slugBarRef`, and lines 84–87
are the *only* place a failed slug login produces user-visible copy:

```ts
const status = e instanceof ApiProblem ? e.status : undefined;
if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
else if (status === 404) slugBarRef.value?.setError("Slug not found.");
else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
```

`slugBarRef` is never bound (no template holds it), and `usePalettePorts.ts:126-135` does not even
re-export it from the session port — so **every one of those four `setError` calls is an
unconditional no-op**. `?.` swallows it silently. A user who mistypes their slug on the live surface
gets *no* feedback at all. (The live surface, `SlugEditLayer.vue`, writes its own `slugError` ref at
lines 49/59-62 and **never renders it** — its template has no `{{ slugError }}`. So the error copy
authored in S.W2 reaches the screen through neither path.)

**Negative-evidence receipt from the visual audit** — the component contributes nothing to 60
Safari captures, while its live twin appears in all 60:

```
$ for s in "Account menu" "Sign in with slug" "Cancel slug edit" "Switch to slug" "Copy slug"; do
    printf "%-22s -> %s\n" "$s" "$(grep -c "$s" docs/tranches/V/megatranche/audit/visual/REPORT.json)"; done
Account menu           -> 0     ← PaletteSlugBar-unique
Sign in with slug      -> 0     ← PaletteSlugBar-unique
Cancel slug edit       -> 0     ← PaletteSlugBar-unique
Switch to slug         -> 60    ← SlugEditLayer (live), all 60 captures
Copy slug              -> 0     ← PaletteSlugBar-unique
```

*Mechanism:* orphaned surface left behind by the D.W3 Lane A restructure; the composable's error
plumbing was never re-homed to the surviving dock surface.
*Cure (gestalt, not patch):* delete `demo/palettes/browser/slug/` and its barrel line, and move the
error rendering into `SlugEditLayer.vue` as an owned, rendered `slugError` region — the port already
carries `onSlugSwitch`; give it an `onSlugError` cell (or return `Promise<void>` from `onSlugSwitch`
and let the layer `await` it) so the composable stops reaching through a template ref at all. Edict-2
(no legacy/dual paths) and edict-1 (no god modules) both point the same way: one slug surface, one
owner.

---

## C-2 · BLOCKER — `@submit.prevent` binds to the `<input>`, not the `<form>`: submitting the login form performs a **native page navigation**

`PaletteSlugBar.vue:5-15` puts the handler on the glass-ui `SearchBar` component:

```vue
<SearchBar v-if="slugEditMode" ref="searchBarRef" tag="form" v-model="slugInput"
           @submit.prevent="onSlugSwitch"
           @keydown.escape.stop="slugEditMode = false">
```

glass-ui 7's `SearchBar` **opts out of attribute inheritance and re-targets `$attrs` at the inner
input** (`node_modules/@mkbabb/glass-ui/dist/search.js:309-345`):

```js
$ = C({ inheritAttrs: !1, __name: "SearchBar", …
    setup(e, { expose: n, emit: r }) {
      let a = P(),                                  // useAttrs()
          o = g(() => { let { class: e, ...t } = a; return t; }),   // $attrs minus class
      …
      return (n, r) => (D(), _(j(e.tag), {          // ← the <form> root gets ONLY class + data-surface
          class: E(N(t)("input-bar", …, n.$attrs.class)), "data-surface": e.surface }, {
        default: L(() => [ …,
          b("input", w({ ref_key: "inputRef", ref: s, type: "search" }, o.value, { … }))  // ← $attrs land HERE
```

`onSubmit` therefore sits on an `<input type="search">`. The `submit` event is dispatched on the
`<form>` and does not travel *down* to descendants, so **`onSlugSwitch` can never fire, and nothing
ever calls `preventDefault()`** — the browser performs the form's default GET submission.

**Reproduction (live, real Chrome, real component).** Mount, click *Login*, type a slug, click the
`type="submit"` button:

```
before:  http://localhost:9000/#/extract
click submit →  Playwright: "Execution context was destroyed, most likely because of a navigation."
after:   http://localhost:9000/?#/extract          ← the "?" is the native GET submission
sessionStorage.PROBE_SWITCH === null               ← the switchSlug emit NEVER fired
```

A second, navigation-safe run (capture-phase `preventDefault` installed by the probe) confirms the
handler is absent rather than merely losing a race:

```
formVei: null        inputVei: null        (no Vue event invokers on either element)
eventsAfterSubmit: []                      (switchSlug not emitted)
```

So: **pressing Enter or clicking the arrow in the slug bar reloads the whole SPA and logs nobody
in.** Every unsaved local palette in memory dies with the reload.

Collateral from the same mechanism (both directions of the same bug):
* `@keydown.escape.stop` *does* work — because keydown fires on the input, which is exactly where
  `$attrs` landed. Measured: `editModeBeforeEsc: true → editModeAfterEsc: false`. The template's two
  listeners are bound to the same wrong element; one happens to survive, one does not.

*Mechanism:* a component's fallthrough contract was assumed rather than read; `tag="form"` makes
`SearchBar` *look* like a form element while its `inheritAttrs: false` re-routes listeners.
*Cure:* never hang form semantics off a design-system input. Own the `<form>` in the consumer —
`<form @submit.prevent="…"><SearchBar tag="div" …/><Button type="submit"/></form>` — or (better,
edict-4) push a first-class `@submit` emit onto glass-ui's `SearchBar` so `tag="form"` is honest.
`SlugEditLayer.vue:76-79` already does the former with a native `<form>`; that is the idiom to
converge on.

---

## C-3 · MAJOR — the slug input is never focused: `nextTick` fires ~226 ms before the element exists

`PaletteSlugBar.vue:172-182`:

```ts
function onStartSlugEdit() {
    slugInput.value = ""; slugError.value = "";
    // Delay to let the Popover fully close before swapping to input mode
    setTimeout(() => {
        slugEditMode.value = true;
        nextTick(() => { searchBarRef.value?.inputRef?.focus(); });
    }, 50);
}
```

The swap sits inside `<Transition name="vj-morph" mode="out-in">` (line 4). `out-in` holds the
*incoming* branch until the outgoing one finishes leaving, and `.vj-morph-leave-active`
(`demo/styles/animations.css:111-116`) runs on `--duration-fast`, measured on the live page as
**`0.2s`**. `nextTick` resolves in the same microtask batch as the flag flip, ~226 ms early, so
`searchBarRef.value` is `null` and `?.` eats the call. There is no retry.

**Reproduction** (rAF-polled insertion time + `document.activeElement` timeline, live):

```
durFast: "0.2s"
insertedAtMs: 276                 ← <input> first appears 276 ms after the Login click
timeline (ms → input present / document.activeElement):
    0  → false / BUTTON.dock-trigger…
   62  → false / BUTTON.dock-trigger…
   82  → false / BUTTON.dock-trigger…
  155  → false / BUTTON.dock-trigger…
  305  → true  / BUTTON.dock-trigger…
  606  → true  / BUTTON.dock-trigger…
 1207  → true  / BUTTON.dock-trigger…
```

`activeElement` never becomes the input, at any sample. In a real click the *Login* button that had
focus is removed from the DOM mid-transition, so focus falls to `<body>`: a keyboard user is dropped
to the top of the document and must re-traverse the page to reach the field they just opened
(WCAG 2.4.3 Focus Order / 3.2.1).

*Mechanism:* a time-based guess (`setTimeout(50)`) layered on a lifecycle fact (`Transition`
`out-in` completion). Two clocks, no handshake.
*Cure:* drop the `setTimeout` and the guess entirely; focus from the transition's own
`@after-enter` hook (`<Transition … @after-enter="inputRef?.focus()">`), and restore focus to the
trigger on cancel/escape. Also switch `ref(null)` + string ref to `useTemplateRef("searchBarRef")`
per edict 7 (`SlugEditLayer.vue:14` already does).

---

## C-4 · MAJOR — the in-flight state is unrenderable: `slugSwitching` round-trips inside one synchronous turn

`onSlugSwitch` (lines 198-225) is `async` but contains **no `await`**. Its `try { … } finally {
slugSwitching.value = false; }` therefore runs to completion before the caller's stack unwinds, so
the `true` value never survives to a render. The spinner at line 26 and the
`:disabled="… || slugSwitching"` guard at line 23 are both dead — the double-submit guard the
`disabled` implies does not exist.

**Reproduction** (calling the component's real `onSlugSwitch` through the dev instance handle;
`slugSwitching` read *synchronously* on return, then 6 rAF frames of DOM sampling, ×5 inputs):

```
probe "cool-blue-fox-jump"   slugSwitchingAfterSyncCall: false   spinnerRenderedAnyFrame: false
probe "cool-blue-fox"        slugSwitchingAfterSyncCall: false   spinnerRenderedAnyFrame: false
probe "COOL-BLUE-FOX-JUMP"   slugSwitchingAfterSyncCall: false   spinnerRenderedAnyFrame: false
probe "cool2-blue-fox-jump"  slugSwitchingAfterSyncCall: false   spinnerRenderedAnyFrame: false
probe 'ADMIN_TOKEN="sekrit"' slugSwitchingAfterSyncCall: false   spinnerRenderedAnyFrame: false
```

*Mechanism:* a loading flag wrapped around a *fire-and-forget* `emit` — the actual network work
happens in the parent (`useSlugMigration.onSlugSwitch`, which *is* async), and the child has no
handle on it.
*Cure:* make the port's `onSlugSwitch` return `Promise<void>` and `await` it here; the flag then
brackets real work, `finally` lands after it, and the same `await` gives the `catch` in C-16 an
actual rejection to catch. One change repairs the spinner, the disabled guard, and the error path.

---

## C-5 · MAJOR — any input that is not exactly four lowercase words is submitted as an **admin token**, and the parent destroys the user's session on it

Line 205: `const isAdmin = !looksLikeSlug(normalized);` — the classifier is a *negation*, so the
"admin" branch is the catch-all. Every malformed slug is an admin login attempt.

**Reproduction** (real component, `switchSlug` emissions captured live):

```
"cool-blue-fox-jump"   → (no emit; "Already signed in as this slug.")
"cool-blue-fox"        → ["switchSlug", "cool-blue-fox",        true]   ← 3-word typo ⇒ isAdmin
"COOL-BLUE-FOX-JUMP"   → (no emit; correctly lowercased and matched)
"cool2-blue-fox-jump"  → ["switchSlug", "cool2-blue-fox-jump",  true]   ← one digit ⇒ isAdmin
'ADMIN_TOKEN="sekrit"' → ["switchSlug", "sekrit",               true]
```

Boundary enumeration of the same predicate (`node -e`, pasted):

```
"cool-blue-fox-jump"      -> isAdmin= false
"cool-blue-fox"           -> isAdmin= true
"cool blue fox jump"      -> isAdmin= true
"cool-blue-fox-jump-extra"-> isAdmin= true
"cool2-blue-fox-jump"     -> isAdmin= true
"cool--blue-fox-jump"     -> isAdmin= true
""                        -> isAdmin= true      (unreachable — guarded by the `if (!raw) return`)
"cool-blue-fox-jum p"     -> isAdmin= true
```

The receiving end is **destructive** (`useSlugMigration.ts:51-57`):

```ts
if (isAdmin) { deps.clearUserSlug(); deps.adminLogin(value); setActiveTab("saved"); return; }
```

`clearUserSlug` → `useUserAuth.clearSlug()` → `clearAuth()` (`useUserAuth.ts:44-48`), which nulls the
slug ref, `safeRemoveItem(localStorage, SLUG_KEY)` and `clearPersistedToken()`. So **a typo in the
slug field silently signs the user out and wipes their persisted identity**, then stores the typo as
an admin token in `localStorage`. No confirmation, no error, no undo. In this component the path is
currently latent behind C-2; it is one binding fix away from firing, and the byte-identical code is
LIVE today in `SlugEditLayer.vue:46,54`.

*Mechanism:* one text field asked to carry two disjoint credential types, disambiguated by a
negated shape test that treats "not recognisable" as "privileged".
*Cure:* make the admin route explicit and non-inferred (a distinct affordance / the `ADMIN_TOKEN=`
prefix as the *only* admin trigger), and reject anything that is neither — `"That doesn't look like
a slug (four words, e.g. cool-blue-fox-jump)."` Never clear the existing session before the new
credential is accepted by the server.

---

## C-6 · MAJOR (a11y) — the slug input has no accessible name

Measured on the mounted component:

```
inputAria: { label: null, describedby: null, invalid: null, name: null, type: "search" }
```

Placeholder-only (`placeholder="enter slug..."`), no `<label>`, no `aria-label`, no `name`. Fails
WCAG 4.1.2 (Name, Role, Value) and 3.3.2 (Labels or Instructions); the placeholder also vanishes on
input, leaving the field unlabelled for everyone. This is exactly the nameless-control class the
visual REPORT counts (its `/#/` row already logs `{"w":160,"h":23,"tag":"input","label":""}` for the
live twin).

*Cure:* `aria-label="Slug or admin token"` on the field via glass-ui `SearchBar`'s `$attrs` passthrough
(which, per C-2, lands on the input — the one place the passthrough helps), plus a visible label
where the layout allows.

---

## C-7 · MAJOR (a11y) — the async error is never announced and never associated with the field

`PaletteSlugBar.vue:124-126` renders the error as a bare `<p>`:

```vue
<p v-if="slugError" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">
```

Measured after forcing `setError(...)`:

```
errorP: { ariaLive: null, role: null }
live-region count in the whole component: 0   (querySelectorAll("[aria-live], [role=alert]").length === 0)
inputAria.describedby: null      inputAria.invalid: null
```

A screen-reader user submits, and nothing is spoken. Fails WCAG 4.1.3 (Status Messages) and 3.3.1
(Error Identification).

*Cure:* `role="alert"` (or `aria-live="polite"`) on the `<p>`, give it an `id`, and bind
`aria-describedby` + `aria-invalid="true"` on the input while `slugError` is non-empty.

---

## C-8 · MAJOR (a11y) — the identity pill and its explanation are unreachable by keyboard and by touch

Lines 45-60 wrap a non-interactive `<span class="slug-pill cursor-help">` in a `trigger="hover"`
Popover. Measured on the logged-in render:

```
pill: { tag: "SPAN", tabIndex: -1, role: null, ariaDescribedby: null, w: 199.7, h: 29 }
pill.focus() → document.activeElement === pill : false
tabbables in the whole logged-in bar: [ "BUTTON/Account menu" ]     ← exactly one
popoverBefore: false → popoverAfterHover: true                      ← mouse-only
```

The only copy explaining what a slug *is* ("This is your unique identity. Use it to sign in from any
device…") is behind a hover the keyboard cannot perform and a touch device cannot hold. Fails WCAG
2.1.1 (Keyboard) and 1.4.13 (Content on Hover or Focus — dismissible/hoverable/persistent).
`cursor-help` promises an affordance the markup does not provide.

*Cure:* the pill is a *disclosure*, so make it one — glass-ui `Tooltip`/`Popover` on a real
`<button>` (or the span with `tabindex="0"` + `role="button"`), `trigger` accepting focus as well as
hover. Reuse the existing component-type name (edict 4) rather than hand-rolling.

---

## C-9 · MAJOR — `variant="ghost"` is not a glass-ui 7 `Button` prop: the buttons render as filled *secondary* and leak a junk DOM attribute

Lines 17-39 pass `variant="ghost"` to `Button`. glass-ui 7's contract
(`dist/components/button/Button.vue.d.ts`) has **no `variant`** — the axes are `emphasis`
(`"primary" | "secondary" | "quiet" | "text"`) and `tone`; `_shared/axes.d.ts` even states the tone
axis is *"NEVER a `variant` member."*

Measured DOM of the two edit-mode buttons:

```
{ type:"submit", aria:"Sign in with slug",  variantAttr:"ghost", emphasis:"secondary", w:27.9, h:27.9 }
{ type:"button", aria:"Cancel slug edit",   variantAttr:"ghost", emphasis:"secondary", w:27.9, h:27.9 }
```

`variant="ghost"` falls through as a non-standard HTML attribute; `data-emphasis` is the **default
`secondary`**. The intended quiet treatment is simply absent — two filled secondary buttons sit
inside a search field. This is a pre-7.0 API residue (edict 2: no legacy) and an edict-4 violation
(design-system contract not honoured).

**Vacuous gate receipt:** `vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`, zero diagnostics. The
typed gate does not catch an unknown prop on a component, because Vue templates admit arbitrary
fallthrough attributes.

*Cure:* `emphasis="quiet"` (the ghost's successor rung). If a true "ghost" rung is wanted it belongs
in glass-ui's `ButtonEmphasis` union, not in a demo override.

---

## C-10 · MINOR (a11y) — 22 × 22 px tap target on the account menu

Line 84's three-dot trigger is `p-1` (4 px) around a `w-3.5 h-3.5` (14 px) icon. Measured:

```
defaultModeControls: [ { tag:"BUTTON", aria:"Account menu", w:22, h:22 } ]
```

22 < 24 → fails WCAG 2.2 §2.5.8 (Target Size, Minimum). It is the *only* tabbable control in the
logged-in bar (C-8), so the smallest target is also the only one. It matches the live twin's
`{"w":22,"h":22}` rows that the visual REPORT counts on every route.

*Cure:* `p-1` → `p-1.5` with the glass-ui control-height token, or adopt `DockControl compact`
(which the dock cluster already uses) so the size rule lives at the design-system root (edict 5),
not per instance.

---

## C-11 · MINOR — uncancelled `setTimeout` across unmount; the 50 ms "let the Popover close" delay is contrivance

`onStartSlugEdit` schedules a 50 ms timer (line 176) with no `onBeforeUnmount`/`onScopeDispose`
clear. Unmounting the bar within 50 ms (route change, dialog close) leaves the callback to run and
mutate a disposed component's refs and schedule a `nextTick` against a dead instance. Same site as
C-3: the delay exists only to paper over the Popover close animation, and it is what desynchronises
the focus call.

*Cure:* delete the timer (C-3's cure removes the need for it); if any deferral survives, it belongs
in a `useTimeoutFn` from `@vueuse/core` whose scope disposal is automatic.

---

## C-12 · MINOR — dead public surface: an unused required prop, an emit that is never emitted, an exposed method nobody calls

* `hasSavedPalettes: boolean` — declared **`required: true`** (compiled output confirms
  `hasSavedPalettes: { type: Boolean, required: true }`) and read **nowhere** in template or script.
  Every call site is forced to compute and pass a value that is discarded. The decision it once fed
  now lives in `useSlugMigration.ts:59` (`deps.savedPalettes.value.length > 0`).
* `copy: []` — declared at line 155, **never emitted**. `onCopySlug` (line 168) performs the
  clipboard write itself, so the parent can never render "copied!" feedback.
* `resetEditMode` — exposed at line 236, called from nowhere in the repo.

`vue-tsc … EXIT=0` and `eslint.config.js:153-154,182` (`vue/no-unused-vars`, `vue/no-unused-components`,
`vue/no-unused-properties` all `"off"`) mean no gate reports any of it.

*Cure:* delete all three (they die with the component under C-1's cure).

---

## C-13 · MINOR — clipboard failure is swallowed and success is silent

Line 169: `if (userSlug) void writeClipboard(userSlug);`

glass-ui's contract is `writeClipboard(text: string): Promise<CopyResult>` with
`const { ok } = await writeClipboard(text)` documented at
`dist/composables/dom/useClipboard.d.ts:35-37`. The `void` discards `ok` *and* the promise. On Safari
a rejected/denied clipboard write produces **no visual difference from success** — the menu closes
and nothing happens either way. Every other demo call site at least `await`s it
(`MixPane.vue:54`, `GenerateControls.vue:107`, `GradientVisualizer.vue:128`), so this site is the
outlier.

*Cure:* `const { ok } = await writeClipboard(userSlug); emit("copy", ok)` — which finally gives the
dead `copy` emit (C-12) a reason to exist, and lets the owner render one feedback affordance for all
copy actions.

---

## C-14 · MINOR — `resetEditMode()` leaves a stale error on screen

```ts
function onStartSlugEdit() { slugInput.value = ""; slugError.value = ""; … }   // clears
function resetEditMode()   { slugInput.value = ""; slugEditMode.value = false; } // does NOT
```

Asymmetric teardown: the error `<p>` renders *outside* the `<Transition>` (line 124), so an error
from a previous attempt survives `resetEditMode()` and floats under the default pill row.

*Cure:* one `resetSlugState()` that clears input, error, and mode together; both entry and exit call it.

---

## C-15 · MINOR — the error line is `absolute` + `whitespace-nowrap` and overflows its bar by a measured 160.6 px

```
errorP: { text: "Something went catastrophically wrong with your slug login a…",
          right: 600.6, hostRight: 440, overflowsHostPx: 160.6 }
```

The message is server-supplied on the `else` branch (`useSlugMigration.ts:87` forwards
`e.message`), so its length is unbounded. On a 390 px viewport the `whitespace-nowrap` line escapes
its container. The visual REPORT's `horizontalOverflow` defect list is currently empty — because the
component never renders (C-1); this is the row it would contribute.

*Cure:* drop `whitespace-nowrap`, let it wrap, and reserve the space in flow instead of `absolute`
+ `-bottom-4` (which also lets the message collide with whatever sits below the bar).

---

## C-16 · MINOR — the `catch` block is unreachable, and it is a *stale copy* of a mapping the repo already fixed

Lines 216-221 map `"409"/"404"/"429"` **substrings of `e.message`**. Two independent reasons this is dead:

1. `emit()` is synchronous and the parent handler is `async`; its rejection becomes an unhandled
   promise rejection in the parent's microtask, never a throw in this `try`. Nothing inside the
   `try` can throw. (Confirmed: 5 live invocations, `ss.slugError` only ever set by the *explicit*
   line-208 assignment.)
2. `useSlugMigration.ts:78-87` carries the S.W2 comment explaining that this exact substring mapping
   was replaced because *"the server titles … never contain '409'/'404'/'429', so those branches
   matched nothing and the authored copy below never showed."* The corrected `ApiProblem.status`
   version lives there; **the disproven version was left behind here** — a legacy dual path
   (edict 2).

`e: any` at line 216 is also the only untyped catch parameter in the file.

*Cure:* delete the block; C-4's `await` gives the one honest error path, typed on `ApiProblem.status`.

---

## C-17 · INFO — the component reaches the design system through pass-through shims and the root barrel

```
demo/ui/button/index.ts   → export { Button } from "@mkbabb/glass-ui";
demo/ui/popover/index.ts  → export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```

Two files that exist only to rename an import path — shadcn-era aliases (edict 2: no aliases /
dual paths; edict 4: glass-ui is the design system, not `demo/ui/`). glass-ui publishes `./button`
and `./popover` subpaths (`package.json#exports`), and `SlugEditLayer.vue:4` already imports
`@mkbabb/glass-ui/dock` directly. This component's `writeClipboard` also comes from the root barrel
rather than `@mkbabb/glass-ui/dom`.

*Cure:* import the subpaths directly; retire `demo/ui/button` and `demo/ui/popover`.

---

## C-18 · MAJOR (test truth) — zero tests; the gates are vacuous

```
$ grep -rn "PaletteSlugBar\|slug-pill\|enter slug\|Switch account\|Regenerate slug" test/ e2e/
e2e/smoke/oracles/o18-contrast-census.spec.ts:639   .slug-pill      ← matches the DOCK pill
e2e/smoke/admin/admin-populated.spec.ts:26          .slug-pill      ← matches the DOCK pill
(no hit names PaletteSlugBar)
$ ls demo/test/**/*.ts
demo/test/glass/aurora-bracket.test.ts  demo/test/glass/aurora-motion.test.ts  demo/test/export/byte-exact.test.ts
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0
```

No unit test imports it. No e2e spec exercises it — `e2e/smoke/flows/login-register.spec.ts:6-9`
*documents in prose* that the surface is unused and then tests a different path entirely (cold-boot
`POST /sessions` via a vote click).

**Exact mutations that keep every gate green** (each one silently ships a broken product):
* replace the entire `<template>` with `<div/>` — `vitest run`, `playwright test`, `vue-tsc`, `eslint` all pass;
* invert line 205 to `const isAdmin = looksLikeSlug(normalized)` — every valid slug becomes an admin token;
* change `looksLikeSlug`'s regex to `/^$/` — everything becomes an admin token, wiping sessions (C-5);
* delete the `emit("switchSlug", …)` call at line 213 — login becomes a no-op.

That is the definition of a vacuous gate: the observable behaviour of the component is entirely
outside the tested surface, and the two BLOCKERs above (unmounted; submit unbound) both survived
every gate in the repo.

*Cure:* the honest one is C-1's — delete the component, and give the *surviving* slug surface a
component test that (a) asserts a `submit` on the real form emits `switchSlug` exactly once, (b)
asserts focus lands in the field after the transition settles, and (c) asserts a rejected login
renders and announces the message. Those three tests would have failed on day one for this file.

---

## C-19 · MAJOR — the whole slug protocol is duplicated verbatim in two components, and the copies have already drifted

`looksLikeSlug`, `normalizeTokenInput`, the submit routine, and `onCopySlug` exist twice, byte-for-byte
in places:

| logic | `PaletteSlugBar.vue` | `SlugEditLayer.vue` |
|---|---|---|
| `looksLikeSlug` | 184-186 | 25-27 |
| `normalizeTokenInput` | 188-196 | 29-37 |
| submit routine | 198-225 (`onSlugSwitch`) | 39-66 (`onSlugSubmit`) |
| `onCopySlug` | 168-170 | 68-70 |
| error copy | rendered (124-126) but unreachable (C-1) | **never rendered at all** |
| already-signed-in text | "Already signed in as this slug." | "Already signed in." |
| focus after open | broken (C-3) | works (`useTemplateRef`, no `out-in`) |
| Escape handling | on the input by accident (C-2) | on the input by design |

Both copies carry C-4 (no `await`), C-5 (negated admin classifier), and C-16 (dead substring catch).
Fixing one leaves the other broken; the drift already produced two different strings for the same
condition and one surface with no error rendering whatsoever.

*Mechanism:* credential-parsing policy living in the view layer, so a second view needed a second copy.
*Cure (architectural transposition, not a patch):* lift `looksLikeSlug` / `normalizeTokenInput` /
the classify-and-switch routine into `useSlugMigration.ts` (or a sibling `slugCredential.ts` beside
it — a *focused* module, not an addition to a god module, edict 1). The port then exposes one
`submitCredential(raw): Promise<Result>`; the layers render a field, a spinner, and a message. One
policy, one owner, one test.

---

## Hazard sweep (the repo's known local classes) — negative results

Checked and **not** found in this component; recorded so the negative is on the record:

| hazard | result |
|---|---|
| `defineModel()` stale-read round-trip | **N/A** — this component uses plain `ref`s only; no `defineModel`. (`SlugEditLayer.vue:10` does use `defineModel<boolean>("active")`, out of this seat's scope.) |
| oklch→HSV `stableHue` drift | **N/A** — `cssColorOpaque` is consumed as an opaque string for `color`/`borderColor` (lines 49) with no conversion. |
| `ValueUnit` nesting accumulation | **N/A** — no `ValueUnit` construction, no value.js import at all. |
| reka-ui slider pointer-capture leak | **N/A** — no slider, no pointer capture. |
| ungated `requestAnimationFrame` (PRM-RAF) | **CLEAN** — no rAF; the only motion is CSS `vj-morph`, which `animations.css` neutralises under `prefers-reduced-motion`. |
| WebGL boot / context loss | **N/A** — no canvas, no GL. |
| `parseCssColor` crash class | **N/A** — no parsing of colour input; `cssColorOpaque` is passed through untouched. |
| listener / observer leaks | **CLEAN** — no `addEventListener`, no observers. Only the timer of C-11. |
| unbounded growth | **CLEAN** — five scalar refs, no collections. |
| `verbatimModuleSyntax` (edict 8) | **CLEAN** — the only type-position import is `InstanceType<typeof SearchBar>` on a value import that is also used as a component; no type-only import is missing `import type`. |
| animations deleted (edict 6) | **CLEAN** — rides the shared `vj-morph` family, scoped block is comment-only. |

---

## Ranked findings

| id | sev | finding |
|---|---|---|
| C-1 | BLOCKER | mounted on zero routes; `slugBarRef` never bound ⇒ all four `setError` calls are permanent no-ops |
| C-2 | BLOCKER | `@submit.prevent` lands on `SearchBar`'s inner `<input>` (`inheritAttrs:false`) ⇒ submitting navigates the page natively; `switchSlug` never emitted |
| C-3 | MAJOR | focus never reaches the input — `nextTick` at ~50 ms vs element insertion at 276 ms under `mode="out-in"` |
| C-4 | MAJOR | `slugSwitching` round-trips synchronously ⇒ spinner + double-submit guard unrenderable |
| C-5 | MAJOR | negated classifier ⇒ any malformed slug is an admin token; parent `clearAuth()`s the user's identity on a typo |
| C-6 | MAJOR | slug input has no accessible name |
| C-7 | MAJOR | error `<p>` has no `aria-live`/`role=alert`, no `aria-describedby`/`aria-invalid` |
| C-8 | MAJOR | identity pill is a non-focusable `<span>` behind a hover-only Popover — keyboard/touch unreachable |
| C-9 | MAJOR | `variant="ghost"` is not a glass-ui 7 prop ⇒ buttons render filled `secondary`, junk attr in DOM |
| C-18 | MAJOR | zero tests; four named mutations keep `vitest`/`playwright`/`vue-tsc`/`eslint` green |
| C-19 | MAJOR | slug protocol duplicated verbatim in `SlugEditLayer.vue`; copies already drifted |
| C-10 | MINOR | 22 × 22 px account-menu tap target (WCAG 2.2 §2.5.8 = 24) |
| C-11 | MINOR | uncancelled 50 ms `setTimeout` across unmount; the delay itself is the C-3 cause |
| C-12 | MINOR | unused required prop `hasSavedPalettes`; never-emitted `copy`; uncalled `resetEditMode` |
| C-13 | MINOR | `void writeClipboard(...)` discards `{ ok }` — silent clipboard failure, silent success |
| C-14 | MINOR | `resetEditMode()` leaves a stale `slugError` on screen |
| C-15 | MINOR | error line `absolute` + `whitespace-nowrap` overflows the bar by 160.6 px measured |
| C-16 | MINOR | unreachable `catch` holding the substring mapping S.W2 already disproved and replaced |
| C-17 | INFO | imports the design system through `demo/ui/*` pass-through shims and the root barrel |

**Strongest defect: C-2.** C-1 makes the component *harmless* today; C-2 is what makes it *wrong* —
and it is wrong in a way no gate in this repo can see, on the one interaction the component exists to
perform.
