# CHALLENGE-C — PaletteSlugBar.vue · implementation is defective (pass 2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
is the tier this seat was **explicitly declared** with in its spawn, not an inherited or ambient
default. Declared seat, receipt logged.

---

## Standing of this document

This is the **second independent pass** on this axis. Run 1 is preserved verbatim at
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/challenge-C-implementation.run-1.md`
(19 findings, C-1..C-19) — nothing from it is discarded.

This pass re-derived the findings **from the source, by different methods**, and then went past them:

| | pass 1 method | pass 2 method (this seat) |
|---|---|---|
| C-2 (submit binding) | live `/@fs/` mount of the real SFC in the dev page | **jsdom + real glass-ui 7 `SearchBar`**, submit dispatched on both `<form>` and `<input>`, handler-call counts pasted |
| C-2 consequence | Playwright "execution context destroyed" | **WebKit URL + DOM-identity measurement** of an unprevented native submit in the live SPA |
| C-5 (admin catch-all) | probe emissions from the mounted orphan | **live end-to-end repro through the byte-identical twin** — real `localStorage` mutation observed |
| C-8 (pill unreachable) | measured `tabIndex`/hover on the mount | **vendor-source proof** from `reka-ui` + `glass-ui` dist of *why* (`excludeTouch`, `as:"a"`, no tabindex) |
| C-10 (tap target) | measured on the mount | **injected-markup measurement against the live stylesheet** |
| C-3 (focus) | rAF timeline, `insertedAtMs: 276` | **token corroboration** — `--duration-fast: 0.2s` read out of the shipped glass-ui token sheet |

Result: **every pass-1 finding survived re-derivation.** Six new findings are added (C-20..C-25), two
pass-2 hypotheses were **killed by measurement** and are recorded as negatives (C-25), and C-1 gains
a **named commit of provenance**.

| item | value |
|---|---|
| component | `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines) |
| barrel | `demo/palettes/browser/slug/index.ts:3` → `demo/palettes/browser/index.ts:44` |
| paired composable | `demo/palettes/useSlugMigration.ts` |
| live twin (byte-identical logic) | `demo/shell/dock/layers/SlugEditLayer.vue` |
| repo HEAD at this pass | `c654824e` (branch `tranche-u`) |
| glass-ui | `@mkbabb/glass-ui@7.0.0` (verified from `node_modules/.../package.json`) |
| dev server | `http://localhost:9000` — live, WebKit driven |

**VERDICT: DEFECTIVE.** 25 findings — **2 BLOCKER, 11 MAJOR, 9 MINOR, 3 INFO**. The component is
unreachable dead code *and* its single job is structurally broken: the login submit handler is bound
to an element that can never receive a `submit` event, so activating the form performs a **native
browser navigation that destroys the document**.

---

## C-1 · BLOCKER — mounted on zero routes; the failed-login error surface is a permanent no-op

### Re-verified (pass 2)

```
$ grep -rn "SlugBar" demo/ --exclude-dir=node_modules
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/useSlugMigration.ts:84:            if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
demo/palettes/useSlugMigration.ts:85:            else if (status === 404) slugBarRef.value?.setError("Slug not found.");
demo/palettes/useSlugMigration.ts:86:            else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
demo/palettes/useSlugMigration.ts:87:            else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
demo/palettes/useSlugMigration.ts:121:        slugBarRef,
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

Zero `<PaletteSlugBar` tags. Line 6 is `import type` → **erased at compile**. And the barrel that
re-exports it is itself dead:

```
$ grep -rn "browser/index\|from \".*browser\"\|from '.*browser'" demo/ --exclude-dir=node_modules
(no output)
```

So the component has **no value-position importer anywhere in the program**. It is not merely
unmounted — it is unreachable from the module graph.

`slugBarRef` is returned from `useSlugMigration` (line 121) but `usePalettePorts.ts:79-89` destructures
only `migration.onRegenerateSlug` / `migration.onSlugSwitch` — the ref reaches no template and no
port. **All four `setError` calls at lines 84-87 are unconditional no-ops**, silently swallowed by `?.`.

### NEW (pass 2) — the orphaning is attributable to one commit, and it broke that commit's own stated law

```
$ git log --oneline -S'<PaletteSlugBar' --all | head -4
640652df docs(V·mega): L-15.8 completeness law …
703187ba docs(V·megatranche): register owner marks OM-3/OM-4 …
7cae8bd0 docs(V·megatranche): bank the wall-interrupted challenge harvest …
95993197 refactor(T.W0 · lane t-legacy-sweep): W0-3 excisions — the dead named set + CC-6 orphan removed, code grep-zero

$ git show 95993197 | grep -n "PaletteSlugBar" | head -4
36:    - §8  PaletteSlugBar iconOnly migration — the TODO's named condition …
800:-        <PaletteSlugBar
874:-import PaletteSlugBar from "@components/custom/palette-browser/PaletteSlugBar.vue";
921:-const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
```

The deleted hunk at line 800 is in
`demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteControlsBar.vue` — the
**sole mounter**:

```vue
-        <PaletteSlugBar
-            ref="slugBarRef"
-            :user-slug="userSlug"
-            :css-color-opaque="cssColorOpaque"
-            :has-saved-palettes="hasSavedPalettes"
-            :is-admin="isAdmin"
-            @switch-slug="(slug, isAdmin) => $emit('switchSlug', slug, isAdmin)"
```

That commit's own message states its law: *"t-legacy-sweep LEG-1..8 + CC-6, all **VERIFY-DEAD-FIRST
(grep all imports before delete)**"*, and it deleted `ImagePaletteExtractor.vue` explicitly as
`CASCADE (forced consequence of CC-6, grep-confirmed)`. **`PaletteSlugBar` was the same cascade and
was not swept** — the file, its barrel line, and the now-permanently-null `slugBarRef` all survived.
The repo even records that it knew the parent died: `demo/styles/foundation.css:580` reads
*"data-state cascade died with PaletteDialog.vue at T.W0-3, CC-6."*

### NEW (pass 2) — the silent-failure consequence, reproduced live

The live surfaces route through the same `useSlugMigration.onSlugSwitch`. WebKit, `#/palettes`,
dock Login → type a well-formed but nonexistent slug → Enter:

```
$ node scratchpad/probe.mjs
C · Login button present: 1
C · error text visible: []
C · slug before/after: null / null  adminToken: null
console errs/warns: [
 "error: [value.js] value.js dev is MISCONFIGURED: … targeting the cross-origin production API … every palette request will be blocked …"
]
```

The login request cannot succeed, `useSlugMigration` catches, and the *only* authored error copy in
the app is written into a null ref. **The user typed a slug, pressed Enter, the field closed, and
nothing whatsoever happened** — no error, no login, no announcement. `error text visible: []` is the
measurement.

The twin cannot cover for it either: `SlugEditLayer.vue:54` calls `pm.onSlugSwitch(...)` **without
`await`**, and its own `slugError` ref (lines 13, 49, 59-62) is **never rendered** — grep its template
for `slugError`: zero hits outside the script block.

### Visual receipt

`docs/.../visual/shots/safari-desktop-light/palettes.png` (read at this pass): the `#/palettes` route
carries identity **only** in the dock — a `Login` pill beside `@mbabb`. There is no slug bar above
"My Palettes". The component contributes zero pixels to 60/60 captures.

*Mechanism:* an orphan left standing by a sweep whose stated precondition was exactly "grep all
importers first"; the composable's error plumbing was never re-homed onto the surviving surface.
*Cure (transposition):* delete `demo/palettes/browser/slug/` and the `browser/index.ts:44` line;
make the port's `onSlugSwitch` return `Promise<void>` so the *rendering* surface owns and displays
its own failure, and delete `slugBarRef` — the composable must stop reaching through a template ref
into a view. One slug surface, one owner (edict 1 + edict 2).

---

## C-2 · BLOCKER — `@submit.prevent` binds to the inner `<input>`, not the `<form>`; activating the form performs a native navigation that destroys the document

`PaletteSlugBar.vue:5-15`:

```vue
<SearchBar v-if="slugEditMode" ref="searchBarRef" key="slug-edit" tag="form" v-model="slugInput"
           :icon="LogIn" placeholder="enter slug..."
           @submit.prevent="onSlugSwitch"
           @keydown.escape.stop="slugEditMode = false">
```

glass-ui 7's `SearchBar` sets `inheritAttrs: false` and re-targets `$attrs` (minus `class`) at the
**inner `<input type="search">`** — from the shipped dist,
`node_modules/@mkbabb/glass-ui/dist/search.js`:

```js
$ = C({ inheritAttrs: !1, __name: "SearchBar", …
  setup(e, { expose: n, emit: r }) {
    let i = r, a = P(),                                   // a = useAttrs()
        o = g(() => { let { class: e, ...t } = a; return t; }),   // o = $attrs MINUS class
        s = O(null);
    return n({ inputRef: s }), (n, r) => (D(), _(j(e.tag), {     // ← root `tag` gets ONLY class + data-surface
        class: E(N(t)("input-bar", …, n.$attrs.class)), "data-surface": e.surface }, {
      default: L(() => [ …,
        b("input", w({ ref_key: "inputRef", ref: s, type: "search" }, o.value, { … })),  // ← $attrs land HERE
        A(n.$slots, "default")
```

### NEW (pass 2) — proven in isolation, with call counts

Mounted the **real, unmodified glass-ui 7 `SearchBar`** in jsdom with `tag="form"`, an `onSubmit`
listener, and a `type="submit"` button in the default slot:

```
$ node scratchpad/searchbar-submit.mjs
root tag       : FORM
input present  : true search
slot button in form: true
after form submit  -> handler calls: 0  event.defaultPrevented: false
after input submit -> handler calls: 1
form outerHTML: <form class="input-bar" data-surface="glass"><svg …
```

`0` calls when the `submit` event is dispatched on the `<form>` (bubbling, cancelable) and
`defaultPrevented: false`; `1` call when dispatched directly on the `<input>` — which is proof of
*where the listener actually lives*. `submit` fires on the form and propagates **upward**; it never
reaches a descendant. So `onSlugSwitch` cannot run and **nothing calls `preventDefault()`**.

### NEW (pass 2) — what the unprevented submit does to this SPA, measured

```
$ node scratchpad/probe3.mjs
url before: http://localhost:9000/#/palettes?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
url after : http://localhost:9000/?#/palettes?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
navigated : true
DOM survived (false = document replaced/reloaded): false
```

A stray `?` is spliced before the hash and **the document is replaced** — a full reload. Pressing
Enter in the slug field therefore: (a) never calls `onSlugSwitch`, (b) hard-reloads the SPA, killing
every unsaved in-memory palette, (c) corrupts the URL. On the one interaction this component exists
to perform.

Collateral from the same mechanism, in the other direction: `@keydown.escape.stop` **does** work —
because keydown fires *on the input*, which is exactly where `$attrs` landed. Two listeners on the
same element by accident; one survives, one is dead.

### Scope check (pass 2) — this consumer is unique

```
$ grep -rn -A6 "<SearchBar" demo/ --exclude-dir=node_modules | grep -E "tag=|@submit"
demo/palettes/browser/slug/PaletteSlugBar.vue-9-            tag="form"
```

The other four `SearchBar` consumers (`BrowsePane`, `PalettesPane`, `AdminPane`, and the search bar in
`AdminAuditPanel`'s comment) use the default `tag="div"` with no `@submit`. So the BLOCKER is unique
to this file and **latent** only because of C-1.

*Mechanism:* a design-system component's fallthrough contract was assumed rather than read;
`tag="form"` makes `SearchBar` *look* like a form element while `inheritAttrs:false` silently
re-routes every listener to the input.
*Cure:* never hang form semantics off a design-system input. Own the `<form>` in the consumer
(`<form @submit.prevent><SearchBar tag="div"/><Button type="submit"/></form>` — the idiom
`SlugEditLayer.vue:76-79` already uses), or (better, edict 4) give glass-ui's `SearchBar` a
first-class `@submit` emit so `tag="form"` becomes honest. Relay to the glass-ui BH inbox either way:
`tag="form"` + `inheritAttrs:false` is a trap for every future consumer.

---

## C-3 · MAJOR — the slug input is never focused; `nextTick` fires ~200 ms before the element exists

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

The swap is inside `<Transition name="vj-morph" mode="out-in">` (line 4). `out-in` holds the incoming
branch until the outgoing one has **finished leaving**.

### Corroboration (pass 2) — the leave duration, from the shipped token sheet

`demo/styles/animations.css:111-116`:

```css
.vj-morph-leave-active {
    transition:
        opacity var(--duration-fast) var(--ease-accelerate),
        transform var(--duration-fast) var(--ease-accelerate),
        max-height var(--duration-fast) var(--ease-accelerate);
```

and `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css:1`:

```
--duration-instant: 0.1s; --duration-control: 0.12s; --duration-fast: 0.2s; --duration-normal: 0.3s;
```

So the outgoing branch owns the stage for **200 ms**, while `nextTick` resolves in the same microtask
batch as the flag flip (~0 ms). `searchBarRef.value` is `null`; `?.` eats the call; there is no retry.
Pass 1's live rAF timeline measured insertion at **276 ms** with `document.activeElement` never
becoming the input at any sample — the token read is the independent confirmation of *why*.

`searchBarRef` is also `ref<InstanceType<typeof SearchBar> | null>(null)` (line 166) — the Vue 3.4
string-ref idiom, not `useTemplateRef` (edict 7). `SlugEditLayer.vue:14` already uses
`useTemplateRef<HTMLInputElement>("slugInputRef")`.

*Mechanism:* a time-based guess (`setTimeout(50)`) stacked on a lifecycle fact (`Transition` out-in
completion). Two clocks, no handshake.
*Cure:* delete the timer; focus from the transition's own `@after-enter` hook, via
`useTemplateRef`. See C-20 for the focus-*restoration* half of the same defect.

---

## C-4 · MAJOR — the in-flight state is unrenderable: `slugSwitching` round-trips inside one synchronous turn

`onSlugSwitch` (lines 198-225) is declared `async` and contains **zero `await`**. `slugSwitching` is
set `true` at 201, the emit fires at 213, `slugEditMode` is cleared at 215, and `finally` sets
`slugSwitching = false` at 223 — all inside one synchronous block. Vue never flushes a render between
the two writes.

Dead as a consequence:
* the `Loader2` spinner at line 26,
* the `aria-label="Signing in…"` in-flight name at line 24,
* the `:disabled="!slugInput.trim() || slugSwitching"` double-submit guard at line 23 — the guard the
  `disabled` binding *implies* does not exist.

Pass 1 measured this five ways (`slugSwitchingAfterSyncCall: false`, `spinnerRenderedAnyFrame: false`
for all five inputs). Pass 2 confirms by construction: the emit is fire-and-forget, so the real work
(`useSlugMigration.onSlugSwitch`, which *is* async) is not on this stack at all.

*Cure:* make the port's `onSlugSwitch` return `Promise<void>` and `await` it here. One change repairs
the spinner, the disabled guard, the error path (C-16) and the optimistic close (C-21).

---

## C-5 · MAJOR — any input that is not exactly four lowercase words is submitted as an admin token, and the parent destroys the user's session on it

Line 205: `const isAdmin = !looksLikeSlug(normalized);` — the classifier is a **negation**, so "admin"
is the catch-all. Line 185: `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/`.

The server's slug shape (`api/src/modules/session/slugWords.ts:84-90`) is
`${adj}-${verb}-${color}-${animal}`, and every word is `[a-z]+`:

```
$ node -e "…filter(w=>!/^[a-z]+$/.test(w))"
non [a-z]+ entries: ["node:crypto","./repository/user.js","findBySlug","Failed to generate unique slug after max retries"]
```

(the four hits are code strings, not word-list entries) — so the regex accepts valid slugs. The
defect is entirely on the *other* side of the negation.

The receiving end is destructive — `useSlugMigration.ts:51-57`:

```ts
if (isAdmin) { deps.clearUserSlug(); deps.adminLogin(value); setActiveTab("saved"); return; }
```

and `adminLogin` performs **no validation at all** — `demo/platform/auth/useAdminAuth.ts:34-37`:

```ts
function login(token: string) {
    adminToken.value = token;
    safeSetItem(localStorage, STORAGE_KEY, token);
}
```

with `isAuthenticated = computed(() => !!adminToken.value)`.

### NEW (pass 2) — reproduced END TO END in the live app

The classification code is byte-identical in `SlugEditLayer.vue:25-27, 39-66` (see C-19), which *is*
mounted. WebKit, `#/palettes`, dock Login, typed a **3-word typo** (a dropped slug word), Enter:

```
$ node scratchpad/probe.mjs
D · Login present after reload: 1
D · typo'd 3-word slug -> palette-admin-token: "brisk-leaping-azure"
   {"hasAdminPill":true,"snippet":"→ Palettes Tools admin @mbabb dev misconfigured — run `npm run dev` Lab 92.0 % …"}
```

**A typo wrote `palette-admin-token = "brisk-leaping-azure"` into `localStorage` and flipped the UI
into its admin state**, with no server round-trip, no confirmation, no error. On a logged-in user the
same path first calls `clearUserSlug()` → `useUserAuth.clearAuth()`, which nulls the slug ref,
`safeRemoveItem`s the slug key and clears the persisted token: **the typo signs you out and wipes your
persisted identity.**

In *this* component the path is latent behind C-2 — one binding fix away from firing.

*Mechanism:* one text field asked to carry two disjoint credential types, disambiguated by a negated
shape test that reads "unrecognisable" as "privileged".
*Cure:* make the admin route explicit and non-inferred; reject anything that is neither ("That doesn't
look like a slug — four words, e.g. `cool-blue-fox-jump`"); and **never clear the existing session
before the new credential is accepted by the server**.

---

## C-6 · MAJOR (a11y) — the slug input has no accessible name

`placeholder="enter slug..."` only (line 12) — no `<label>`, no `aria-label`, no `name`. Pass-1
measurement: `inputAria: { label: null, describedby: null, invalid: null, name: null, type: "search" }`.
Fails WCAG 4.1.2 and 3.3.2; the placeholder also vanishes on input, leaving the field unlabelled for
sighted users mid-typing. This is the same nameless-control class the visual REPORT counts.

*Cure:* `aria-label="Slug or admin token"` (which, per C-2, lands on the input — the one place the
`$attrs` re-routing helps), plus a visible label where the layout allows.

---

## C-7 · MAJOR (a11y) — the async error is never announced and never associated with the field

Lines 124-126 render the error as a bare `<p>`: no `role="alert"`, no `aria-live`; the input carries
no `aria-describedby` and no `aria-invalid`. Pass-1 measured
`errorP: { ariaLive: null, role: null }` and zero `[aria-live], [role=alert]` nodes in the whole
component. Fails WCAG 4.1.3 (Status Messages) and 3.3.1 (Error Identification).

---

## C-8 · MAJOR (a11y) — the identity pill and its explanation are unreachable by keyboard AND by touch

Lines 45-60 wrap a non-interactive `<span class="slug-pill cursor-help">` in `<Popover trigger="hover">`.

### NEW (pass 2) — measured, then explained from vendor source

Measured against the live stylesheet (exact markup from line 47-52 injected into the running page):

```
$ node scratchpad/probe2.mjs
{ "pill": { "w": 270.31, "h": 28.94 }, …, "spanTabIndex": -1 }
```

`tabIndex: -1` — a `<span>` is not focusable. Now *why* the popover is also touch-unreachable, from
`node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js`:

```js
let _ = typeof window < "u" && typeof window.matchMedia == "function"
        && window.matchMedia("(pointer: coarse)").matches,
    v = i(() => n.trigger === "hover" && !_);
E({ usesHoverRoot: v });
```

`trigger="hover"` on a **fine** pointer routes to reka-ui's `HoverCardRoot`/`HoverCardTrigger`, whose
shipped source is:

```js
props: { …, as: { default: "a" } },   // ← not a button; no href ⇒ not focusable
…
onPointerenter: … excludeTouch(rootContext.onOpen)($event),   // ← TOUCH EXPLICITLY EXCLUDED
onPointerleave: … excludeTouch(handleLeave)($event),
onFocus:  … rootContext.onOpen(),
onBlur:   … rootContext.onClose()
```

No `tabindex` is added anywhere. So: `onFocus` exists but the `<span>` can never receive focus, and
`onPointerenter` is wrapped in `excludeTouch`. The only copy in the app that explains what a slug *is*
("This is your unique identity. Use it to sign in from any device and access your palettes.") is
reachable **by fine-pointer hover only**. Fails WCAG 2.1.1 (Keyboard) and 1.4.13. `cursor-help`
promises an affordance the markup does not provide.

*Cure:* the pill is a disclosure — make it one. A real `<button>` (or `tabindex="0"` + `role="button"`)
behind glass-ui `Tooltip`/`Popover`, with a trigger mode that accepts focus. Reuse the existing
component-type name (edict 4).

---

## C-9 · MAJOR — `variant="ghost"` is not a glass-ui 7 `Button` prop; the buttons render filled and leak a junk DOM attribute

`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts` — the whole contract:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  type?: …;  disabled?: …;  class?: …;
}
```

**There is no `variant`.** Lines 19 and 31 pass `variant="ghost"` — a pre-7.0 / shadcn residue
(edict 2). Pass 1 measured the mounted result:
`{ variantAttr:"ghost", emphasis:"secondary", w:27.9, h:27.9 }` ×2 — the attribute falls through to
the DOM and the intended quiet treatment is simply absent.

### NEW (pass 2) — the residue is repo-wide and the DOM leak is live today

```
$ node scratchpad/probe.mjs
A · [variant] fallthrough: {
 "count": 2,
 "sample": [
  "BUTTON variant=outline class=button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover gap-1.5 text-mon",
  "BUTTON variant=ghost class=button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover dropdown-menu__t"
 ],
 "emphasisAttrs": 0
}
```

`[variant]` is present in the **live DOM** of `#/palettes` — proof of the fallthrough mechanism on a
mounted sibling. Repo-wide there are **20 such call sites** vs **2** uses of the real `emphasis` prop:

```
$ grep -rn 'variant="ghost"\|variant="outline"' demo/ --exclude-dir=node_modules | wc -l → 20
$ grep -rn 'emphasis="' demo/ --exclude-dir=node_modules
demo/palettes/PalettesPane.vue:113 · demo/palettes/browser/admin/AdminUsersPanel.vue:174
```

`Button` also ships a `loading` prop that this component hand-rolls with `Loader2` + `:disabled` — a
design-system bypass on top of the dead-prop residue.

**Vacuous-gate receipt (pass 2, re-run):**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0
$ npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue ; echo ESLINT_EXIT=$?
ESLINT_EXIT=0
```

Neither the typed gate nor the lint gate sees an unknown prop on a component — Vue templates admit
arbitrary fallthrough attributes, so 20 sites of dead API pass clean.

*Cure:* `emphasis="quiet"` (ghost's successor rung), and `loading` instead of the hand-rolled spinner.
A true "ghost" rung, if wanted, belongs in glass-ui's `ButtonEmphasis` union — never as a demo
override (edict 4).

---

## C-10 · MINOR (a11y) — 22 × 22 px tap target on the account menu

Line 84: `p-1` (4 px each side) around a `w-3.5 h-3.5` (14 px) icon.

### NEW (pass 2) — measured against the live cascade

The exact markup from lines 47-52, 71-78, 84-86, 89-96 injected into the running page inside
`.app-layout` so the real stylesheet applies:

```
$ node scratchpad/probe2.mjs
{
 "pill":      { "w": 270.31, "h": 28.94 },
 "threeDot":  { "w": 22,     "h": 22    },   ← the account-menu trigger
 "login":     { "w": 96.47,  "h": 32.94 },
 "menuItem":  { "w": 121.02, "h": 34.94 },
 "spanTabIndex": -1
}
```

**22 × 22** — below the WCAG 2.2 §2.5.8 floor of 24. And per C-8 it is the *only* tabbable control in
the logged-in bar, so the smallest target is also the sole target.

This is exactly the class the visual REPORT counts. My live census on `#/palettes` shows the twin's
three controls at the identical geometry:

```
B · small tap targets (<24px): 6 [{"w":22,"h":22,"name":"Switch to slug"},{"w":22,"h":22,"name":"Generate new slug"},
                                  {"w":22,"h":22,"name":"Cancel"}, {"w":23.8,"h":24.3,"name":"l channel"}, …]
```

The REPORT's `smallTapTargets` for `safari-desktop-light /#/palettes` is **8**; three of those are the
slug cluster's 22 × 22 controls. PaletteSlugBar's contribution to that column is currently **0**
because of C-1 — this is the row it *would* add.

*Cure:* adopt `DockControl compact` (the dock cluster's own primitive) or lift the control-height rule
to the glass-ui root (edict 5) rather than a per-instance `p-1`.

---

## C-11 · MINOR — uncancelled `setTimeout` across unmount

Line 176 schedules a 50 ms timer with no `onBeforeUnmount` / `onScopeDispose` clear. Unmounting within
50 ms leaves the callback to mutate a disposed component's refs and queue a `nextTick` against a dead
instance. Two rapid activations of *Login* / *Switch account* schedule two independent timers with no
coalescing. The delay is also the direct cause of C-3.

*Cure:* delete the timer (C-3's cure removes the need); if any deferral survives it belongs in a
scope-disposed `useTimeoutFn`.

---

## C-12 · MINOR — dead public surface

```
$ grep -n "hasSavedPalettes" demo/palettes/browser/slug/PaletteSlugBar.vue
147:const { userSlug, cssColorOpaque, hasSavedPalettes, isAdmin } = defineProps<{
150:    hasSavedPalettes: boolean;
$ grep -n 'emit("copy")\|\$emit(.copy' demo/palettes/browser/slug/PaletteSlugBar.vue
(no output)
$ grep -rn "resetEditMode" demo/ --exclude-dir=node_modules
demo/palettes/browser/slug/PaletteSlugBar.vue:231:function resetEditMode() {
demo/palettes/browser/slug/PaletteSlugBar.vue:236:defineExpose({ slugEditMode, setError, resetEditMode });
```

* `hasSavedPalettes` — compiled as `{ type: Boolean, required: true }` (see the compiler output in
  C-25) and read **nowhere**. Every mounter is forced to compute and pass a value that is discarded;
  the decision it once fed now lives at `useSlugMigration.ts:59`.
* `copy: []` (line 155) — declared, never emitted. `onCopySlug` writes the clipboard itself, so no
  parent can render "copied!".
* `resetEditMode` (line 231) and `slugEditMode` (exposed line 236) — **2 of the 3 exposed members have
  zero consumers**; only `setError` is referenced, and that reference is the permanent no-op of C-1.
  Exposing the raw `slugEditMode` ref additionally hands external code a writable internal flag
  (encapsulation leak) — see C-25 for what its exposed *type* actually is.

Both gates pass on all of it (`vue-tsc EXIT=0`, `eslint ESLINT_EXIT=0`).

---

## C-13 · MINOR — clipboard failure is swallowed and success is silent

Line 169: `if (userSlug) void writeClipboard(userSlug);`

glass-ui's contract, quoted from `dist/composables/dom/useClipboard.d.ts`:

```
/** A failed copy always names its channel; a successful copy carries no reason. */
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
/**
 * Stateless one-shot clipboard write — the honest primitive … Returns the
 * discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy
 * boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`.
 */
export declare function writeClipboard(text: string): Promise<CopyResult>;
```

`void` discards exactly the thing the primitive was designed to deliver. `CopyFailureReason` is
`"clipboard-api" | "no-api"` — a denied write on Safari is visually indistinguishable from success
(the menu closes; nothing happens either way). Every other demo call site awaits it.

*Cure:* `const { ok } = await writeClipboard(userSlug); emit("copy", ok)` — which finally gives the
dead `copy` emit (C-12) a reason to exist.

---

## C-14 · MINOR — asymmetric teardown leaves a stale error on screen, and no consumer can clear it

```ts
function onStartSlugEdit() { slugInput.value = ""; slugError.value = ""; … }   // clears
function resetEditMode()   { slugInput.value = ""; slugEditMode.value = false; } // does NOT
```

Nor does either cancel path: `@keydown.escape.stop="slugEditMode = false"` (line 14) and the X button
`@click="slugEditMode = false"` (line 36) both leave `slugError` intact. The error `<p>` renders
**outside** the `<Transition>` (line 124), i.e. in *both* modes — so a stale message floats under the
default pill row indefinitely. `defineExpose` offers `setError` but **no `clearError`**, so the owner
cannot clear it either.

*Cure:* one `resetSlugState()` clearing input, error and mode together, called on every entry and exit.

---

## C-15 · MINOR — the error line is `absolute` + `whitespace-nowrap`; the message length is unbounded

Line 124: `class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap"`.
The `else` branch forwards the raw server message (`useSlugMigration.ts:87`), so length is unbounded.
Pass 1 measured `overflowsHostPx: 160.6` on a realistic message. `-bottom-4` also lets it collide with
whatever sits below the bar. The REPORT's `horizontalOverflow` list is empty only because of C-1.

---

## C-16 · MINOR — the `catch` block is unreachable, and it is a *stale copy* of a mapping this repo already disproved

Lines 216-221 map `"409"/"404"/"429"` as **substrings of `e.message`**. Two independent reasons it is dead:

1. Nothing in the `try` can throw asynchronously: `emit()` is synchronous and the parent handler's
   rejection lands in the parent's microtask, never in this `try` (C-4).
2. `useSlugMigration.ts:78-82` carries the S.W2 W2-6 comment that this **exact** mapping was replaced
   *"the server titles ('Already logged in as this user', 'User not found', 'Rate limit exceeded')
   never contain '409'/'404'/'429', so those branches matched nothing and the authored copy below
   never showed"* — and the corrected `ApiProblem.status` version lives there. **The disproven version
   was left standing here** (and in the twin, `SlugEditLayer.vue:59-62`) — a legacy dual path, edict 2.

`e: any` at line 216 is also the only untyped catch parameter in the file.

---

## C-17 · INFO — the design system is reached through pass-through shims and the root barrel

```
demo/ui/button/index.ts   → export { Button } from "@mkbabb/glass-ui";
demo/ui/popover/index.ts  → export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```

Two files whose only content is a rename — shadcn-era aliases (edict 2), and `demo/ui/` is not where
the design system lives (edict 4). glass-ui publishes `./button` and `./popover` subpaths;
`SlugEditLayer.vue:4` already imports `@mkbabb/glass-ui/dock` directly. `writeClipboard` likewise
comes from the root barrel rather than `@mkbabb/glass-ui/dom`.

---

## C-18 · MAJOR (test truth) — zero tests; the gates are vacuous

```
$ grep -rn "PaletteSlugBar" test/ e2e/            → (no output)
$ grep -rn "slug" test/                            → (no output)
$ grep -rn "enter slug\|slug or token\|Switch to slug\|Login" e2e/   → (no output)
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?          → EXIT=0
$ npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue ; echo ESLINT_EXIT=$?   → ESLINT_EXIT=0
```

No unit test imports it. **No e2e spec drives the login UI at all** — for either surface. The
`user-auth` fixture *seeds* identity and bypasses the form entirely
(`e2e/smoke/fixtures/user-auth.ts:26-34`): `addInitScript` writes `palette-user-slug` /
`palette-user-token` before the first script runs. That bypass is *why* two BLOCKERs survived every
gate in the repo.

**Exact mutations that keep `vitest` + `playwright` + `vue-tsc` + `eslint` green** — each ships a
broken product:

* replace the whole `<template>` with `<div/>`;
* invert line 205 to `const isAdmin = looksLikeSlug(normalized)` — every *valid* slug becomes an admin
  token and wipes the session;
* change `looksLikeSlug`'s regex to `/^$/` — *everything* becomes an admin token;
* delete the `emit("switchSlug", …)` at line 213 — login becomes a no-op;
* delete `@submit.prevent` from line 13 — no behaviour change at all, because it was never bound (C-2).

Only removing a member of `defineExpose` breaks anything (it would fail the typed reference at
`useSlugMigration.ts:84`) — i.e. the sole gate that can see this file guards a **no-op**.

*Cure:* delete the component (C-1), and give the surviving surface three tests that would have failed
on day one: (a) a `submit` on the real form emits `switchSlug` exactly once; (b) focus lands in the
field after the transition settles; (c) a rejected login renders **and announces** its message.

---

## C-19 · MAJOR — the whole slug protocol is duplicated in two components, and the copies have drifted

| logic | `PaletteSlugBar.vue` | `SlugEditLayer.vue` |
|---|---|---|
| `looksLikeSlug` | 184-186 | 25-27 (identical regex) |
| `normalizeTokenInput` | 188-196 | 29-37 (identical) |
| submit routine | 198-225 `onSlugSwitch` | 39-66 `onSlugSubmit` |
| `onCopySlug` | 168-170 | 68-70 |
| error copy | rendered (124-126) but unreachable (C-1) | **never rendered at all** |
| already-signed-in text | "Already signed in as this slug." | "Already signed in." |
| focus after open | broken (C-3) | `useTemplateRef`, no `out-in` |
| Escape handling | on the input **by accident** (C-2) | on the input by design |
| in-flight flag | dead (C-4) | dead (same, unawaited `pm.onSlugSwitch`) |
| admin catch-all | latent (C-5) | **LIVE — reproduced above** |

Both copies carry C-4, C-5 and C-16. Fixing one leaves the other broken; the drift has already
produced two strings for one condition and one surface with no error rendering whatsoever.

*Cure (transposition):* lift `looksLikeSlug` / `normalizeTokenInput` / classify-and-switch into a
focused `slugCredential.ts` beside `useSlugMigration.ts` (a new *focused* module, not an addition to a
god module — edict 1; not a new `shared/` dir — edict 3). The port then exposes one
`submitCredential(raw): Promise<Result>`; the views render a field, a spinner and a message. One
policy, one owner, one test.

---

# NEW findings (pass 2)

## C-20 · MAJOR (a11y) — the account menu lies about its role, has no menu semantics, and never restores focus

Three defects in one construct (lines 81-120).

**(a) `aria-haspopup="dialog"` is false.** Line 84 promises a dialog. glass-ui's `PopoverContent`
renders `role="group"` — from `dist/popover-BQGYXZyO.js`:

```js
"data-material": "overlay", "data-reveal": "menu",
role: "group",
"aria-label": t.ariaLabel,
```

and no `aria-label` is passed at line 88, so the announced surface is an **unlabelled group**, not a
dialog. A screen reader announces "has popup dialog", then lands in an anonymous group. WCAG 4.1.2.

**(b) it is not a menu.** Four `<button>`s inside `role="group"`: no `role="menu"`, no
`role="menuitem"`, no arrow-key navigation, no typeahead, no `Escape`-to-close authored on the
content. The dock's own equivalent uses `DropdownMenu`/`DropdownMenuItem`
(`ProfileSection.vue:53-90`) and gets all of that from the design system — the same four commands
(Copy slug / Switch account / Logout / Regenerate slug), one primitive lower. Edict 4: reuse the
existing component-type name.

**(c) focus is never restored.** Every cancel path (`@keydown.escape.stop` at line 14, the X button at
line 36) sets `slugEditMode = false`, which unmounts the whole SearchBar branch — including the
element that had focus. Focus falls to `<body>`; a keyboard user is dumped to the top of the document
and must re-traverse to reach the pill row. Symmetric to C-3: focus is neither *placed* on open nor
*restored* on close. WCAG 2.4.3.

*Reproduction:* NONE for (c) as a live capture — the component is unmounted (C-1), so this is
**structural**: the focused node is removed by the `v-if` flip with no `restoreFocus` and no receiving
element. (a) and (b) are read directly off the vendor source above plus lines 84-118.

*Cure:* `<DropdownMenu>` + `<DropdownMenuItem>` from glass-ui (drop `aria-haspopup` — the primitive
sets its own), and restore focus to the trigger on close (reka's `onCloseAutoFocus` already does this
for the menu family, which is a fourth reason to adopt it).

---

## C-21 · MAJOR — the form closes optimistically *before* the login resolves, so the error can never reach the field it describes

Lines 213-215, in order, inside one synchronous turn:

```ts
emit("switchSlug", isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
slugInput.value = "";        // ← the user's typed credential is discarded
slugEditMode.value = false;  // ← the field is unmounted
```

The parent's work (`useSlugMigration.onSlugSwitch` → `await deps.userLogin(value)` →
`slugBarRef.value?.setError(...)`) resolves **later**. So even in the counterfactual where C-1 and C-2
were both cured:

* the error arrives after the field is gone, and renders under the **default** (pill / Login) row —
  the `<p>` sits outside the `<Transition>` (line 124), which is *why* it can render in a mode where
  the input does not exist;
* the credential has already been cleared, so every retry is a full re-type;
* there is no in-flight affordance during the gap (C-4), so the UI reads as "nothing happened" for the
  whole duration of the network call — which is exactly what my C-1 live probe measured
  (`error text visible: []`).

This is a *distinct* defect from C-4 (which is about the flag's lifetime) and from C-14 (which is
about clearing). It is the reason C-14's stale error is *orphaned from its field* rather than merely
stale.

*Reproduction:* structural — derived from the statement order at 213-215 plus the `async` parent at
`useSlugMigration.ts:74-88`. The observable end state was measured live in C-1.
*Cure:* the same `await` as C-4. Close the field on **success only**; keep the typed value on failure.

---

## C-22 · MINOR — the pill's hover/touch routing is decided once, non-reactively, for the component's lifetime

`dist/popover-BQGYXZyO.js`:

```js
let _ = typeof window < "u" && typeof window.matchMedia == "function"
        && window.matchMedia("(pointer: coarse)").matches,
    v = i(() => n.trigger === "hover" && !_);
```

`_` is a **plain `let`, read once in `setup`** — not a `matchMedia` listener, not reactive. The
`computed` around it can never re-evaluate, because its only non-constant input is the prop. A hybrid
device (tablet with a keyboard attached mid-session, a window dragged to a touch display) keeps the
wrong root — `HoverCardRoot` with `excludeTouch` handlers — for the component's entire lifetime, and
the pill's tooltip becomes silently unreachable by every input the device has.

This is a **glass-ui-side** defect surfaced by this component's `trigger="hover"` choice. Per the
standing BH/BI relay edict it belongs in the glass-ui inbox, not in a demo patch.

*Reproduction:* NONE — read from vendor source; a device-switch capture is out of this seat's reach.
Labelled a hypothesis on the runtime consequence; the non-reactivity itself is source-proven.
*Cure (consumer side):* C-8's — a focusable trigger makes the routing question moot, because focus
works on both pointer classes. *(Cure, producer side:* bind the query with
`matchMedia(...).addEventListener("change", …)`.)

---

## C-23 · MINOR — `normalizeTokenInput` is a masking fallback that silently launders shell fragments into credentials

Lines 188-196:

```ts
function normalizeTokenInput(raw: string): string {
    let token = raw.trim();
    const assignmentMatch = token.match(/^ADMIN_TOKEN\s*=\s*(.+)$/i);
    if (assignmentMatch) token = assignmentMatch[1]!.trim();
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
        token = token.slice(1, -1).trim();
    }
    return token;
}
```

A paste-from-`.env` convenience: it *accepts* `ADMIN_TOKEN="sekrit"` and quietly rewrites it. That is
a masking fallback (edict 2 — no masking fallbacks), and it is structurally load-bearing for C-5: the
`ADMIN_TOKEN=` prefix is the one signal that *could* have made the admin route explicit, and instead
of being the **trigger** it is merely tolerated, leaving the negated catch-all to do the classifying.
It is also called **twice** per submit (lines 204 and 213), re-parsing the same string.

*Cure:* invert it. Make `ADMIN_TOKEN=` (or a distinct affordance) the **only** admin path, call it
once, and reject everything that is neither a slug nor an explicit admin credential (see C-5).

---

## C-24 · INFO — the repo's own test identity would be classified as an admin token by this component

`e2e/smoke/fixtures/user-auth.ts:30`:

```ts
const FAKE_SLUG = "test-user";
```

Two words. `looksLikeSlug("test-user")` is **false** ⇒ `isAdmin` **true**. The repo's canonical test
identity is a shape this component treats as a privileged credential. It never surfaces because the
fixture seeds `localStorage` and bypasses the login UI entirely — which is the same bypass that makes
C-18's gates vacuous. The fixture's slug shape and the component's validator have drifted apart with
nothing to notice.

*Cure:* make the fixture's slug the real server shape (four words, per
`api/src/modules/session/slugWords.ts:84-90`) and add the one e2e that drives the form, so the two
definitions are forced to agree.

---

## C-25 · INFO — two pass-2 hypotheses, killed by measurement (negatives on the record)

**(a) HYPOTHESIS: the local `isAdmin` at line 205 shadows the destructured prop `isAdmin` (line 151)
and mis-compiles under reactive-props-destructure. KILLED.** Compiled the SFC with the repo's own
`@vue/compiler-sfc`:

```
$ node -e "…compileScript(descriptor,{id:'x', propsDestructure:true})…"
22:     userSlug: { type: [String, null], required: true },
24:     hasSavedPalettes: { type: Boolean, required: true },
25:     isAdmin: { type: Boolean, required: false }
42:     if (__props.userSlug) void writeClipboard(__props.userSlug);
78:         const isAdmin = !looksLikeSlug(normalized);      ← left as a LOCAL, correctly
80:         if (looksLikeSlug(normalized) && normalized === __props.userSlug) {
86:         emit("switchSlug", isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
```

The compiler's scope analysis is correct: line 78 stays a local and is *not* rewritten to
`__props.isAdmin`. The shadowing is a **readability hazard only** — inside `onSlugSwitch` the prop is
unreachable, which is fine today because it is unused there. Not a defect. (This same output is the
receipt for C-12's `required: true` claim.)

**(b) HYPOTHESIS: `defineExpose({ slugEditMode })` exposes a `Ref<boolean>` whose *type* is not
ref-unwrapped, so a consumer writing `.slugEditMode.value` typechecks but reads `undefined` at
runtime. KILLED.** Built a scratch program extending `tsconfig.demo.json`:

```ts
const r = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
const probe = r.value!.slugEditMode.value;
```

```
$ npx vue-tsc -p scratchpad/tsconfig.probe.json --noEmit
expose-probe.ts(9,37): error TS2551: Property 'value' does not exist on type 'boolean'. Did you mean 'valueOf'?
```

The public instance type **is** ref-unwrapped to `boolean` — no type/runtime mismatch. What remains is
the encapsulation point already folded into C-12: the exposed property is *writable*, so any consumer
could flip the component's internal edit mode from outside. No consumer does.

Recording both negatives so the ledger shows what was hunted and not found.

---

## Hazard sweep — the repo's known local classes (negative results, re-verified)

| hazard | result at pass 2 |
|---|---|
| `defineModel()` stale read-after-write | **N/A here** — this component uses plain `ref`s; `defineModel` appears nowhere (grep). Note for the cure: the twin `SlugEditLayer.vue:10` *does* use `defineModel<boolean>("active")` and then `slugEditMode.value = true; nextTick(() => focus())` — the same class of open-then-focus race as C-3, on the async parent round-trip. Out of this seat's scope; flagged for the twin's seat. |
| oklch→HSV hue drift / `stableHue` | **N/A** — `cssColorOpaque` is consumed as an opaque string into `color`/`borderColor` (line 49). No conversion, no hue math. |
| `ValueUnit` nesting accumulation | **N/A** — no `ValueUnit`, no value.js import at all in this file. |
| reka-ui slider pointer-capture leak | **N/A** — no slider, no pointer capture, no `setPointerCapture`. |
| ungated rAF (PRM-RAF epidemic) | **CLEAN** — zero `requestAnimationFrame`. The only motion is the shared CSS `vj-morph` family, which `animations.css` neutralises under `prefers-reduced-motion`. |
| WebGL boot / context loss | **N/A** — no canvas, no GL. (The REPORT's single `consoleError` — `safari-desktop-light /#/: "WebGL: context lost."` — belongs to the hero blob, not this component.) |
| `parseCssColor` crash class | **N/A** — nothing here parses a colour; `cssColorOpaque` passes through untouched. A malformed value degrades to an ignored style declaration, not a throw. |
| listener / observer leaks | **CLEAN** — no `addEventListener`, no observers. The only scheduled work is C-11's timer. |
| unbounded growth | **CLEAN** — five scalar refs, no collections, no caches. |
| `verbatimModuleSyntax` (edict 8) | **CLEAN** — the only type-position use is `InstanceType<typeof SearchBar>`, on an import that is also a value (the component). No type-only import is missing `import type`. |
| animations deleted (edict 6) | **CLEAN** — rides the shared `vj-morph` family from `demo/styles/animations.css`; the scoped block is comment-only (lines 239-243). |
| god module (edict 1) | **CLEAN as a file** (243 lines, one concern) — but see C-19: its *policy* is duplicated rather than owned. |

---

## Ranked findings

| id | sev | finding | pass |
|---|---|---|---|
| C-2 | **BLOCKER** | `@submit.prevent` lands on `SearchBar`'s inner `<input>` (`inheritAttrs:false`) — 0 handler calls on a real form submit; the unprevented native submit **replaces the document** and rewrites the URL | 1 · re-proven 2 |
| C-1 | **BLOCKER** | mounted on zero routes, zero value-position importers; `slugBarRef` never bound ⇒ all four `setError` calls are permanent no-ops ⇒ **failed login is silent in the live app** (measured). Orphaned by `95993197`, against that commit's own VERIFY-DEAD-FIRST law | 1 · re-proven + provenance 2 |
| C-5 | MAJOR | negated classifier ⇒ any non-4-word input is an admin token; **live repro: a 3-word typo wrote `palette-admin-token` and flipped the UI to admin**, and on a logged-in user first wipes the persisted identity | 1 · live E2E repro 2 |
| C-3 | MAJOR | focus never reaches the input — `nextTick` at ~0 ms vs a 200 ms `out-in` leave (`--duration-fast: 0.2s`), insertion measured at 276 ms | 1 · corroborated 2 |
| C-4 | MAJOR | `slugSwitching` round-trips inside one synchronous turn ⇒ spinner, in-flight name and double-submit guard all unrenderable | 1 |
| C-21 | MAJOR | **NEW** — the field is unmounted and the credential discarded in the same turn as the emit ⇒ the async error can never reach the field it describes; every retry is a re-type | **2** |
| C-20 | MAJOR | **NEW** — `aria-haspopup="dialog"` contradicts the rendered `role="group"`; four buttons with no menu semantics or arrow-key nav; focus never restored on cancel | **2** |
| C-6 | MAJOR | the slug input has no accessible name (placeholder only) | 1 |
| C-7 | MAJOR | error `<p>` has no `role=alert`/`aria-live`; input has no `aria-describedby`/`aria-invalid` | 1 |
| C-8 | MAJOR | identity pill is a `tabIndex:-1` `<span>` behind a hover root whose handlers are `excludeTouch`-wrapped ⇒ unreachable by keyboard **and** touch (vendor-source proof) | 1 · mechanism 2 |
| C-9 | MAJOR | `variant="ghost"` is not a glass-ui 7 `Button` prop ⇒ filled render + junk DOM attribute; 20 sites repo-wide, `vue-tsc` and `eslint` both EXIT=0 | 1 · census 2 |
| C-18 | MAJOR | zero tests on either slug surface; the e2e fixture seeds `localStorage` and bypasses the form; five named mutations keep every gate green | 1 · widened 2 |
| C-19 | MAJOR | the slug protocol is duplicated in `SlugEditLayer.vue` and the copies have drifted (10-row table) | 1 |
| C-10 | MINOR | account-menu trigger measured **22 × 22 px** against the live cascade (WCAG 2.2 §2.5.8 = 24) | 1 · re-measured 2 |
| C-11 | MINOR | uncancelled 50 ms `setTimeout` across unmount; the delay is itself C-3's cause | 1 |
| C-12 | MINOR | dead public surface: unused **required** prop `hasSavedPalettes`, never-emitted `copy`, 2 of 3 `defineExpose` members unconsumed | 1 |
| C-13 | MINOR | `void writeClipboard(...)` discards the discriminated `{ ok, reason }` the primitive exists to return | 1 |
| C-14 | MINOR | no cancel path clears `slugError`, and no `clearError` is exposed ⇒ stale error persists across modes | 1 · widened 2 |
| C-15 | MINOR | error line `absolute` + `whitespace-nowrap` with an unbounded server message; 160.6 px overflow measured | 1 |
| C-16 | MINOR | unreachable `catch` holding the substring mapping S.W2 disproved and replaced in the composable | 1 |
| C-23 | MINOR | **NEW** — `ADMIN_TOKEN=`/quote-stripping is a masking fallback (edict 2) and is why C-5's catch-all was never narrowed; called twice per submit | **2** |
| C-22 | MINOR | **NEW** — the hover/touch root is chosen once from a non-reactive `matchMedia` read; a device that changes pointer class keeps the wrong root for life (glass-ui relay) | **2** |
| C-17 | INFO | design system reached via `demo/ui/*` pass-through shims + root barrel instead of published subpaths | 1 |
| C-24 | INFO | **NEW** — the e2e fixture's `FAKE_SLUG = "test-user"` (2 words) would be classified as an admin token by this component | **2** |
| C-25 | INFO | **NEW** — two hypotheses killed: prop-shadowing does **not** mis-compile; `defineExpose` **is** ref-unwrapped in the public type | **2** |

**Strongest defect: C-2.** C-1 makes the component *harmless* today; C-2 is what makes it *wrong*.
The component's one job — log in with a slug — cannot execute, and attempting it destroys the
document. No gate in this repo can see it: `vue-tsc EXIT=0`, `eslint EXIT=0`, and deleting the
`@submit.prevent` binding entirely would change no observable behaviour, because it was never bound.

**Disposition.** C-1's cure (delete `demo/palettes/browser/slug/`, delete `browser/index.ts:44`,
delete `slugBarRef`) discharges C-2, C-3, C-4, C-6, C-7, C-8, C-9, C-10, C-11, C-12, C-13, C-14,
C-15, C-16, C-17, C-20, C-21, C-23 and C-25 **by excision** — 19 of 25. What must *not* be deleted with
it is the part that is LIVE in the twin: **C-5 (reproduced today, session-destroying)**, C-19's lift
into a focused `slugCredential.ts`, C-18's three missing tests, C-24's fixture shape, and C-22's
glass-ui relay. Those five carry forward regardless of whether the orphan is swept.

---

## Probe artifacts

All probes were written outside the repo, under this session's scratchpad, and modified no repo file:

| probe | what it decided |
|---|---|
| `scratchpad/probe.mjs` (WebKit, live `#/palettes`) | `[variant]` fallthrough census (C-9); `<24 px` tap-target census (C-10); silent-login-failure repro (C-1); **typo → admin-token repro (C-5)** |
| `scratchpad/probe2.mjs` (WebKit, markup injected into the live cascade) | pill / three-dot / login / menu-item geometry; `spanTabIndex: -1` (C-8, C-10) |
| `scratchpad/probe3.mjs` (WebKit) | unprevented native submit ⇒ URL rewrite + document replacement (C-2) |
| `scratchpad/searchbar-submit.mjs` (jsdom + real glass-ui 7 `SearchBar`) | submit handler-call counts on `<form>` vs `<input>` (C-2) |
| `scratchpad/expose-probe.ts` + `tsconfig.probe.json` (vue-tsc) | `defineExpose` ref-unwrapping (C-25b) |
| `node -e` + `@vue/compiler-sfc` | props compilation + prop-shadowing scope analysis (C-25a, C-12) |
