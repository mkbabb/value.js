# CHALLENGE-C — `PaletteSlugBar.vue` · the implementation is defective (pass 4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
That is the tier this seat was **explicitly declared** with at spawn. It is not inherited and not
inferred from ambient context: the declaration was in the seat brief, and the id above is the one I
observe myself running as. Declared seat, receipt logged.

---

## Standing of this document

Fourth independent pass on this axis. All three predecessors are preserved verbatim:

- `challenge-C-implementation.run-1.md` — pass 1, findings **C-1..C-19**
- `challenge-C-implementation.run-2.md` — pass 2, **C-1..C-25** (re-derivation + 6 new)
- `challenge-C-implementation.run-3.md` — pass 3, **C-1..C-29** (+ a correction to C-9)

This pass was run **blind**: I read the SFC, its vendor dependencies' *compiled source*, the auth
composables it feeds, the visual REPORT/REPORT.json, the screenshots, and built my own jsdom +
Chromium harnesses **before** opening any predecessor. I opened them only at write-up time to place
my results and avoid re-numbering.

What pass 4 contributes:

1. **Eleven prior findings re-derived by instruments the earlier passes did not use** — including
   the first end-to-end *live* repro of the silent-login-failure consequence, driven through the
   real app with network + console + DOM capture.
2. **Eight new findings — C-30..C-37** — two of them security-shaped and reproduced, and one a
   **correction to the shared visual REPORT** that other component seats are reading.
3. **Six negative proofs**, four of which kill obvious-looking hypotheses (dead utility classes,
   ReDoS, hidden-focusable dock trap, shipped dead bytes).
4. **A working harness.** Pass 3's "reproducible, committed" harness does not run — see C-35. The
   pass-4 replacement resolves its probe relative to itself and is verified green from the repo path.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue`, 243 lines.
Repo state at audit: branch `tranche-u`, `git rev-parse HEAD` → `e9cf0aa4037ccce45e83ff34d800bda11ba7f635`
(moved past the brief's `c654824e`; the subject file is untouched between them —
`git log --oneline -- <file>` last touches it at `f2c8f565`, the glass-ui 7.0.0 adoption).

**Verdict: DEFECTIVE.** The component cannot perform its single function in a browser, and the
error channel it was built to own terminates in a `null` ref inside the app that shipped without it.

---

## 0 · How to reproduce everything in this document

```
# jsdom harness — 18 probes, mounts the REAL SFC against the REAL glass-ui 7
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-vitest.config.ts
 ✓ tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-slugbar.probe.test.ts (18 tests) 162ms
 Test Files  1 passed (1)
      Tests  18 passed (18)

# live Chromium probes (dev server must be up on :9000)
$ node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-live.mjs        # utility-class + token census
$ node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-live-login.mjs  # the silent-failure repro
$ node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-tap.mjs         # tap-target + ink measurement
```

No source file was edited by this seat. Every probe is read-only against the tree.

---

## 1 · Blind convergence — what pass 4 re-derived, and with what

Each row was derived from source or measurement **before** the predecessors were opened. Different
instrument, same result. For a component with zero tests, independent triangulation across four
seats is the strongest corroboration this program can produce.

| prior | pass-4 instrument | pass-4 receipt |
|---|---|---|
| **C-2** `@submit` binds to the `<input>` | read of the shipped vendor bundle `node_modules/@mkbabb/glass-ui/dist/search.js` **plus** paired jsdom dispatch | `SearchBar` is `inheritAttrs:!1`; `o = computed(() => { const {class:_, ...t} = useAttrs(); return t })` is spread onto the **`<input>`** via `mergeProps`, never onto the root `tag`. Emission count: `after form submit: 0 · after input-targeted submit: 1` |
| **C-2** consequence (native nav) | jsdom's navigation stand-in fires on the real submit button | `Error: Not implemented: HTMLFormElement.prototype.requestSubmit` on every `type="submit"` click — the browser's own submit algorithm runs, unprevented |
| **C-1** orphan | four independent instruments (below) | zero value-position importers; zero live-DOM markers; zero of 60 real-Safari captures; the e2e suite's own docstring says so |
| **C-1** consequence (silent failure) | **live end-to-end repro in Chromium against the running app** | after a failed slug login: `bodyInnerTextHits: []`, `slug: null`, `fieldValue: ""`, `activeElement: BODY`, **zero console output** — the failure is invisible in every channel |
| **C-5** admin catch-all | 11-case parameterised routing table through the mounted SFC | `"test-user" → ["test-user", true]`, `"-a-b-c-" → ["-a-b-c-", true]` — any non-4-word input is an admin token |
| **C-6** input has no name | rendered-attribute census | `INPUT ATTRS: {"type":"search","placeholder":"enter slug...","class":"input-bar-field","value":""}` — `HAS aria-label: false` |
| **C-7** error not announced | live-region census on the mounted default mode | the error `<p>` carries no `role`, no `aria-live`; `liveRegions` on the live route never contains a login message |
| **C-8** pill unreachable | focusable-node census | `focusable: ["BUTTON:Account menu"]` · `pill tag: SPAN tabIndex: -1 role: null` |
| **C-9** dead `variant` prop | vendor `.d.ts` contract + rendered DOM | `ButtonProps` = `{emphasis,tone,size,iconOnly,loading,type,disabled,class}` + `PrimitiveProps{asChild,as}`; **no `variant`**. DOM: `data-emphasis="secondary" … variant="ghost"` side by side |
| **C-10** 22 px tap target | **measured against the live cascade**, not arithmetic | `menu: {w: 22, h: 22}` — and the mechanism, below |
| **C-11** timer across unmount | fake-timer count around `unmount()` | `pending after click: 1 · after unmount: 1 · fired on advance` |
| **C-14** stale error | full replay: submit own slug → Cancel | default mode still renders `<p …>Already signed in as this slug.</p>` |
| **C-18** vacuous gates | both gates re-run at this HEAD | `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0** · `npx eslint demo/palettes/browser/slug/PaletteSlugBar.vue` → **EXIT=0** |

### 1.1 · C-1's orphanhood, proven four ways

**(a) Static — zero value-position importers.**

```
$ grep -rn "PaletteSlugBar" demo/ test/ e2e/ src/ | grep -v node_modules
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

The single consumer is `import **type**`. Under `verbatimModuleSyntax` that is fully erased. The
re-exporting barrel `demo/palettes/browser/index.ts` has **no importers at all** (`grep -rn 'palettes/browser"' demo/` → 0 hits;
every real consumer reaches `./browser/card` directly). There is no `<PaletteSlugBar` tag anywhere
in the tree.

**(b) Live DOM.** `probes/c4-live.mjs` against `http://localhost:9000/#/palettes`:

```json
"slugBarMarkers": {
  "signInWithSlug": false, "cancelSlugEdit": false, "accountMenu": false,
  "switchToSlug": true, "pills": 0
}
```

Its three authored `aria-label`s are absent. The label that *is* present — `"Switch to slug"` —
belongs to `demo/shell/dock/layers/SlugEditLayer.vue:93`, the live replacement.

**(c) The 60-capture visual matrix.** A census over `visual/REPORT.json`:

```
Sign in with slug -> false
Cancel slug edit  -> false
Account menu      -> false
SlugEditLayer labels present: true true
```

**(d) The repo's own record.** `e2e/smoke/flows/login-register.spec.ts:5-8`:

> *"The SlugBar live-app surface is only inside the PaletteDialog (currently unused by the App.vue
> shell post-D.W3 Lane A restructure), so the canonical login-register exercise on the smoke level
> is the cold-boot auto-registration path…"*

The orphaning was **known and written down at tranche D/E**, and the test suite was routed around
the dead surface rather than the surface being deleted or re-mounted. `git log -S'PaletteSlugBar'`
shows `95993197` (`T.W0 · lane t-legacy-sweep`, whose own subject line is *"the dead named set +
CC-6 orphan removed, code grep-zero"*) deleting the last mounting site. That sweep's stated law was
verify-dead-first; it deleted the *caller* and left the *callee*.

### 1.2 · C-1's live consequence, reproduced end-to-end

This is the part no prior pass drove through the real application. `useSlugMigration.ts:84-87` is
the **only** error-reporting path for slug login in the shipped app:

```ts
const status = e instanceof ApiProblem ? e.status : undefined;
if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
else if (status === 404) slugBarRef.value?.setError("Slug not found.");
else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
```

`slugBarRef` (`useSlugMigration.ts:30`) is `ref<InstanceType<typeof PaletteSlugBar> | null>(null)`.
`grep -rn "slugBarRef" demo/` returns **six** hits, all inside that one file — four reads, the
declaration and the return. **Nothing ever assigns it**, because the component it points at is
never mounted. The four `?.` operators turn every login error into a no-op, silently.

`probes/c4-live-login.mjs` drives the shipped `SlugEditLayer` form in Chromium (the field is
natively value-set + `input`-dispatched, because the collapsed dock face occludes real clicks —
see C-34), calls `form.requestSubmit()`, and waits 4 s:

```
DRIVEN: {"hasForm":true,"value":"zzzz-yyyy-xxxx-wwww"} submitBtnDisabled: false
AFTER: {
 "url": "http://localhost:9000/#/palettes?space=lab&color=lab(92%25+88.8+20+/+82.7%25)",
 "slug": null,
 "admin": null,
 "bodyInnerTextHits": [],
 "bodyInnerTextLen": 274,
 "liveRegions": ["dev misconfigured — run `npm run dev`", "92.0%", "88.8", "20.0", "82.7%",
                 "· empty plate ·No saved palettes yet.Add colors above, then save the set."],
 "fieldValue": "",
 "activeElement": "BODY:"
}
CONSOLE(last 15): [ … no message about the login attempt … ]
```

The login failed. `bodyInnerTextHits: []` — **no text matching `/not found|failed|error|already|too
many|invalid/i` appears anywhere in the rendered page.** The credential was wiped from the field.
Focus fell to `BODY`. No live region announced anything. No console line was emitted.
`localStorage` is unchanged.

And the failure is structurally unreportable even by the *live* surface: `SlugEditLayer.vue:54`
calls `pm.onSlugSwitch(...)` **without `await`**, and `useSlugMigration.onSlugSwitch` catches its own
rejection internally — so `SlugEditLayer`'s own `catch` at line 57 can never run either. Both error
channels are dead: one because its sink is unmounted, the other because the promise it would need
never rejects.

---

## 2 · New findings — C-30 … C-37

### C-30 · MAJOR (NEW, security-shaped) — the `ADMIN_TOKEN=` disambiguator is stripped and then ignored, and a four-word admin token is POSTed as a public user slug

`normalizeTokenInput` (`PaletteSlugBar.vue:188-196`) exists for exactly one reason: to let an
operator paste the line straight out of `.env`. `api/.env.example:2` is literally
`ADMIN_TOKEN=change-me-to-a-secure-random-string`. The function strips the `ADMIN_TOKEN=` prefix and
surrounding quotes — and then line 205 throws the information away:

```ts
const normalized = normalizeTokenInput(raw).toLowerCase();
const isAdmin = !looksLikeSlug(normalized);   // ← shape, not the explicit label
```

Classification is **purely shape-based**. The one unambiguous signal the user gave — *"this is an
admin token"* — is discarded before the decision. Measured routing table
(`probes/c4-slugbar.probe.test.ts` → `P4-3`, emitted `switchSlug` payloads):

| input | emitted `[value, isAdmin]` | routed to |
|---|---|---|
| `aaa-bbb-ccc-ddd` | `["aaa-bbb-ccc-ddd", false]` | user login — correct |
| **`ADMIN_TOKEN=correct-horse-battery-staple`** | **`["correct-horse-battery-staple", false]`** | **user login — WRONG** |
| **`ADMIN_TOKEN="correct-horse-battery-staple"`** | **`["correct-horse-battery-staple", false]`** | **user login — WRONG** |
| `ADMIN_TOKEN=change-me-to-a-secure-random-string` | `["change-me-to-a-secure-random-string", true]` | admin — correct |
| `ADMIN_TOKEN=S3cret!` | `["S3cret!", true]` | admin — correct |
| `test-user` | `["test-user", true]` | admin — wrong (C-5/C-24) |
| `-a-b-c-` | `["-a-b-c-", true]` | admin — wrong (C-5) |

Consequences, in order of severity:

1. **The secret leaves the machine as a slug.** `isAdmin === false` routes to
   `useUserAuth.login(value)` → `loginWithSlug` → `POST /sessions/login {"slug":"<the admin token>"}`
   (`demo/platform/auth/sessions.ts:18-25`). That endpoint is **unauthenticated** — it is the public
   login route. The admin token is transmitted in a request body to a public endpoint, where it
   lands in access logs, proxy logs and any request-body telemetry, under a field named `slug`.
2. **Admin login is unreachable for an entire token class.** Any `ADMIN_TOKEN` matching
   `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/` — i.e. the canonical four-word passphrase form, which is
   exactly the shape a "secure random string" generator that emits words produces — can *never* be
   used to log in as admin, no matter how it is typed. The user sees `"Slug not found."` at best,
   and (per §1.2) nothing at all in the shipped app.
3. **It is not confined to the orphan.** `demo/shell/dock/layers/SlugEditLayer.vue:25-54` carries a
   byte-identical `looksLikeSlug` / `normalizeTokenInput` / classification block. This defect is
   **live on `/#/palettes` today**.

Reproduction: the `P4-3` rows above, plus `demo/platform/auth/sessions.ts:18-25` for the wire shape.

Cure (gestalt, not patch): the disambiguator must *decide*, not merely clean up. A prefixed input is
an admin token by declaration; an unprefixed input is a slug **only if it matches the generator's
alphabet**, and anything else is a rejection with a message — never a silent reclassification. The
right home for that decision is one exported predicate in the auth layer
(`demo/platform/auth/`), consumed by the single surviving slug surface, so the two copies collapse
to one and the shape heuristic stops being a security boundary.

---

### C-31 · MAJOR (NEW) — the credential field is a bare `<input type="search">` with no input-hygiene attributes at all

Measured attribute census of the shipped input (`P4-1`, and confirmed on the **live** twin by
`c4-live.mjs`):

```
INPUT ATTRS: {"type":"search","placeholder":"enter slug...","class":"input-bar-field","value":""}
HAS name: false            HAS autocomplete: false     HAS autocapitalize: false
HAS autocorrect: false     HAS spellcheck: false       HAS inputmode: false
HAS aria-label: false      HAS aria-describedby: false
```

Live, from `c4-live.mjs` on `/#/palettes` (this is `SlugEditLayer`'s field — same defect, shipping):

```json
{"type":"text","placeholder":"enter slug or token...","name":null,"autocomplete":null,
 "autocapitalize":null,"spellcheck":null,"ariaLabel":null,"w":160,"h":23}
```

Neither the consumer nor `SearchBar` supplies any of them — the vendor's compiled render function
(`dist/search.js`) emits exactly `ref, type:"search", …attrs, value, placeholder, class, onInput`.

Four distinct consequences:

1. **`type="search"` is the wrong control for a credential.** User agents treat search fields as
   *search history*: Safari and Chrome persist submitted/typed search values and offer them as
   suggestions on subsequent visits. Every admin token typed here is retained by the browser and
   re-offered — on shared machines, to the next person. `autocomplete="off"` is absent, so nothing
   opts out.
2. **iOS capitalizes the first character.** The default `autocapitalize` for a text/search field is
   `sentences`. The slug branch survives (`normalized` is `.toLowerCase()`d), but the **admin branch
   emits `normalizeTokenInput(raw)` un-lowercased** (line 213), so `Sometoken` is sent where
   `sometoken` was meant. Admin login fails on mobile with the generic failure text, and per §1.2
   with no text at all. *(Labelled: the mechanism is source-proven; the iOS keystroke behaviour
   itself is a UA default, not reproduced on a device in this pass.)*
3. **`spellcheck` defaults on**, so the token is handed to the platform spellchecker (a network
   service on some configurations).
4. **No accessible name and no `aria-describedby`** — the placeholder is the only label, and it
   disappears the instant the user types. A screen-reader user who tabs back to a half-filled field
   hears the value with no indication of what it is for, and never hears the error `<p>` (C-7).

Cure: this field is not a search box. It is a credential field, and the design system already has
the right primitive (`glass-ui` `Input` / `FormFieldProps{name,required}`) — reaching for
`SearchBar` because it looked like the right *shape* is the contrivance. The replacement carries
`name`, `autocomplete="off"`, `autocapitalize="off"`, `autocorrect="off"`, `spellcheck="false"`, a
real `<label>` or `aria-label`, and `aria-describedby` pointing at the error region.

---

### C-32 · MINOR (NEW) — the press affordance is declared but not transitioned, on all six controls

Measured against the live cascade (`probes/c4-tap.mjs`, injecting the file's exact class strings):

```json
"menu":  {"w":22,"h":22,
          "transitionProperty":"color, background-color, border-color, outline-color,
                                text-decoration-color, fill, stroke, --tw-gradient-*",
          "transitionDuration":"0.2s"},
"login": {"w":96.5,"h":33, "transitionProperty":"color, background-color, …", "transitionDuration":"0.2s"}
```

Every interactive control in this file pairs `active:scale-95` (lines 73, 84) or
`active:scale-[0.98]` (lines 91, 98, 106, 113) with `transition-colors`. `transform` is **not** in
the resolved `transition-property` list, so the scale snaps instantaneously while the background
eases over 200 ms. The two halves of one press gesture run on different clocks. This is not a
missing animation (edict 6 is about deletion) — it is an animation that was written and then
excluded from its own transition by the utility chosen next to it.

Cure: the press affordance belongs to the design system, not to six hand-rolled class strings —
`glass-ui`'s `Button` already emits `tap-squish` + `data-press-armed` + the
`--glass-btn-press-t` driver (visible in the `P4-1` markup dump for the two real `Button`s in this
same file). The hand-rolled controls should be `Button`s.

---

### C-33 · MINOR (NEW measurement, corroborates C-15) — the error line is 989 px of un-wrappable text hung outside a 36 px bar

`probes/c4-tap.mjs` renders the file's exact error `<p>` class string with a realistic server
message ("Rate limit exceeded — please try again in 60 seconds and check that the slug you typed is
correct.", 105 chars):

```json
"err": {"w": 989, "h": 23}
```

The container is `min-h-9` (**measured 36 px**) and the paragraph is `absolute left-0 -bottom-4`
(**measured `bottom: -16px`**). So a 989 px, `whitespace-nowrap`, un-wrappable line is positioned
16 px *below* a 36 px bar, inside a pane that is ~700 px wide on desktop. The `else` branch at line
221 passes an **unbounded server string** straight into it. Overflow is guaranteed, and the
container's `mb-2` (8 px) is half the 16 px the error is pushed down by, so it also collides with
whatever follows.

---

### C-34 · INFO (NEW — a correction to the shared visual REPORT other seats are reading)

`visual/REPORT.md:34` books **8 small tap targets** on `safari-desktop-light /#/palettes`, four of
which belong to the slug surface:

```json
{"w":22,"h":22,"tag":"button","label":"Switch to slug"},
{"w":22,"h":22,"tag":"button","label":"Generate new slug"},
{"w":22,"h":22,"tag":"button","label":"Cancel"},
{"w":160,"h":23,"tag":"input","label":""}
```

Those four controls are **not on screen**. They live on an inactive dock face. Measured
(`probes/c4-live-login.mjs`, ancestor-chain walk from the input):

```json
{"rect":{"x":511,"y":29,"w":160,"h":23}, "visibility":"visible", "display":"block",
 "opacityChain": 0, "anyAncestorInert": true, "anyAncestorAriaHidden": true,
 "focusLanded": false}
```

Effective opacity **0**, an `inert` ancestor, `aria-hidden="true"`, and an explicit `.focus()` call
**does not land**. The probe's `getBoundingClientRect`-based census counts controls that are neither
visible nor focusable, so **4 of the 8** desktop rows on `/#/palettes` (three tap targets plus the
nameless-`input` row) are measurement artifacts. The census needs an `elementFromPoint` /
effective-opacity / `inert` filter before its counts are used as a defect budget.

The same measurement is a **negative proof** for the dock: the inactive face is correctly `inert` +
`aria-hidden`, so there is *no* hidden-focusable trap. That is the good news inside the correction.

---

### C-35 · INFO (NEW — meta, about this audit's own record)

Pass 3 states: *"Harness (reproducible, committed): `probes/c3-slugbar.probe.test.ts` +
`probes/c3-vitest.config.ts`"*, with a pasted `Tests 17 passed (17)`. It does not run:

```
$ npx vitest run --config docs/.../probes/c3-vitest.config.ts
 FAIL  …/scratchpad/slugbar.probe.test.ts
Error: Cannot find module '/private/tmp/claude-504/…/scratchpad/slugbar.probe.test.ts'
 Test Files  1 failed (1) · Tests  no tests
```

`c3-vitest.config.ts`'s `include` is an absolute path into a session scratchpad, not the committed
probe next to it. The committed probe file is never loaded. Fixed in `probes/c4-vitest.config.ts`,
which resolves both root and probe **relative to its own `import.meta.url`** and is verified:

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-vitest.config.ts
 ✓ …/probes/c4-slugbar.probe.test.ts (18 tests) 162ms
 Test Files  1 passed (1) · Tests  18 passed (18)
```

An audit finding about vacuous gates (C-18) loses standing if the audit's own gate is vacuous.

---

### C-36 · MINOR (NEW — glass-ui / reka-ui relay) — `aria-controls=""` on the closed popover trigger

From the mounted default-mode markup (`P4-6`):

```html
<button id="reka-popover-trigger-v-0" type="button" aria-haspopup="dialog"
        aria-expanded="false" aria-controls="" data-state="closed" aria-label="Account menu">
```

`aria-controls` is an **IDREF list**; the empty string is not a valid IDREF and ARIA has no
"controls nothing" value — the attribute must be omitted when there is no target. Emitted by
`reka-ui` through `glass-ui`'s `PopoverTrigger`, so it is reproduced on every popover in the demo,
not only here. Relay to the glass-ui BH inbox per the standing fond.

*(This sits alongside prior C-20's `aria-haspopup="dialog"` vs the rendered `role="group"`
contradiction — same trigger, different attribute, both from the vendor's default.)*

---

### C-37 · MINOR (NEW — glass-ui relay) · **HYPOTHESIS** — `SearchBar` hand-rolls a controlled input with no IME composition guard

`dist/search.js`, `SearchBar` setup:

```js
b("input", w({ ref_key:"inputRef", ref:s, type:"search" }, o.value, {
    value: e.modelValue, placeholder: e.placeholder, class: "input-bar-field",
    onInput: r[0] ||= (e) => i("update:modelValue", e.target.value)
}), null, 16, Q)
```

This is a hand-rolled controlled input — `:value` bound one way, `@input` pushing back — with **no
`compositionstart` / `compositionend` handling.** Vue's own `v-model` directive on a native input
installs exactly those two guards and suppresses model writes mid-composition, precisely because
re-assigning `value` during an IME composition commits or clears the pre-edit buffer. Any consumer
typing CJK/Hangul into a `SearchBar` should see composition clobbered.

**Labelled a hypothesis:** the mechanism is proven from the vendor's compiled source, but I did not
drive an IME to observe the clobber. Reproduction is `NONE` until someone types Japanese into any
`SearchBar` in the demo.

---

## 3 · Negative proofs — hypotheses this pass killed

These cost real probe time and are reported so no later seat re-spends it.

1. **No dead utility classes.** Every custom class in the file resolves against the live cascade
   (`c4-live.mjs`): `z-popover → z-index: 130` (token `--z-popover: 130`), `duration-fast →
   transition-duration: 0.2s` (token `--duration-fast: 0.2s`), `text-mono-small → 16.4px / "Fira
   Code"`, `text-small → 16.4px`, `text-caption → 14.384px`, `font-display → Fraunces`,
   `min-h-9 → 36px`, `-bottom-4 → bottom: -16px`, `.slug-pill → border-radius: 3.35544e+07px`
   (the `--radius-pill` recipe). Baselines confirm the probe discriminates (`baseline z-index: auto`,
   `baseline transition-duration: 0s`).
2. **The `vj-morph` transition is real, and confirms C-3's timing.**
   `.vj-morph-leave-active` computes `transition-property: opacity, transform, max-height` at
   `transition-duration: 0.2s, 0.2s, 0.2s`. `mode="out-in"` therefore holds insertion for ~200 ms,
   while `onStartSlugEdit`'s `nextTick` inside `setTimeout(…, 50)` resolves in the same microtask as
   the flag flip — the focus call fires roughly 200 ms before the input exists. C-3 stands, now with
   the leave duration measured rather than read off a token.
3. **`looksLikeSlug` is not ReDoS-able.** Each `[a-z]+` is delimited by a literal `-` it cannot
   match, so the automaton is deterministic. Measured (`P4-4`):
   `10 000 'a' → 0.027 ms · 20 000 'a-' pairs → 0.006 ms · 4 × 50 000-char segments + '!' (200 004
   chars) → 0.241 ms · 900 001 chars → 0.248 ms`. A paste cannot hang the tab.
4. **The orphan is not shipped dead weight.** Its only reference is `import type`, erased under
   `verbatimModuleSyntax`; the re-exporting barrel has zero importers. It costs bundle bytes: none.
   It costs maintenance, typecheck time, and — via `slugBarRef` — the app's entire login error
   channel. The cost is real but it is not payload.
5. **No hidden-focusable dock trap.** See C-34: `inert` + `aria-hidden` + `focusLanded: false`.
6. **Four of the six named local hazards are structurally absent** from this file, verified by
   reading it whole: no `requestAnimationFrame` (the PRM-RAF epidemic does not touch it), no WebGL,
   no `ValueUnit` wrapping, no oklch→HSV roundtrip, no reka-ui `Slider` (so no pointer-capture leak),
   no `defineModel` (so no stale-read hazard — its live twin `SlugEditLayer.vue:10` *does* use
   `defineModel<boolean>("active")`, but only ever writes it, never reads-after-write in the same
   turn, so that hazard is clean there too). The **only** lifecycle defect in the file is the single
   uncancelled `setTimeout` (C-11); there are no listeners, observers, intervals or subscriptions to
   leak.

---

## 4 · Test truth — the exact mutations that keep every gate green

`grep -rn "PaletteSlugBar\|SlugEditLayer" test/ e2e/` → **zero hits**. There is no unit test, no
component test and no e2e test that names either slug surface. Both gates are green at this HEAD
(`vue-tsc` EXIT=0, `eslint` EXIT=0) *with* the invalid `variant="ghost"` prop already in the file.

The one e2e that touches the login domain routes around the UI by design. `e2e/smoke/fixtures/user-auth.ts:60`
writes the slug and token **straight into `localStorage`**, and lines 84-89 stub the login endpoint
to a permanent success:

```ts
await page.route("**/sessions/login", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: SESSION_BODY }),
);
```

so **no test ever exercises the 404 / 409 / 429 branches** — the branches whose entire delivery
mechanism is the null `slugBarRef`. `FAKE_SLUG = "test-user"` is two words, which this component's
own classifier calls an admin token (C-24).

Mutations that would leave `vue-tsc`, `eslint` and the whole vitest + playwright suite green:

| # | mutation | why nothing catches it |
|---|---|---|
| M-1 | delete `@submit.prevent="onSlugSwitch"` entirely | it is already dead (C-2); no test asserts a submit |
| M-2 | `function looksLikeSlug() { return false }` | no test calls it; every input becomes an admin token |
| M-3 | `function looksLikeSlug() { return true }` | every input becomes a slug; the admin path vanishes |
| M-4 | `function setError(_msg: string) {}` | already unreachable (§1.2); zero callers can observe it |
| M-5 | delete `defineExpose` altogether | `useSlugMigration` still compiles — `InstanceType<…>` resolves, and the `?.` swallows the missing method at runtime |
| M-6 | swap the two `emit("switchSlug", …)` arguments | no test asserts the emission shape |
| M-7 | `setTimeout(…, 50)` → `setTimeout(…, 50000)` | no test observes focus or edit-mode timing |
| M-8 | delete every `aria-label` in the file | the a11y oracles never reach a route that mounts it |

Eight named mutations, zero red gates. That is a vacuous gate by enumeration, and it is *why* four
audit passes were needed to find defects that a single assertion would have caught.

---

## 5 · Standing-edict violations found in the implementation

| edict | verdict | evidence |
|---|---|---|
| 2 · no legacy code / no masking fallbacks | **VIOLATED** | `normalizeTokenInput`'s `ADMIN_TOKEN=`/quote stripping is a masking fallback that lets a mis-shaped input through *and then mis-routes it* (C-30). The unreachable `catch` at lines 216-224 still carries the `msg.includes("409")` substring mapping that `S.W2` **disproved and replaced** in `useSlugMigration.ts:78-87` — dead legacy retained verbatim beside its own documented correction. |
| 3 · KISS, no contrivance | **VIOLATED** | a login form built out of a **search bar** (C-31). The shape matched; the semantics did not, and the mismatch is the direct cause of C-2 (`inheritAttrs:false`), C-6 (no name) and C-31 (no input hygiene). |
| 4 · glass-ui is the design system | **VIOLATED** | six hand-rolled `<button class="…">` (lines 71-78, 84-86, 89-118) sitting next to two real glass-ui `Button`s in the same file. |
| 5 · root-level styling | **VIOLATED** | `variant="ghost"` is a per-instance override of a prop that does not exist on `Button` (`emphasis` is the axis); it lands in the DOM as a junk attribute beside `data-emphasis="secondary"`, and both gates pass. |
| 6 · animations never deleted | **not violated, but broken in place** | C-32 — the press animation is written and then excluded from its own transition list. |
| 7 · idiomatic Vue 3.5 | **VIOLATED** | `ref<InstanceType<typeof SearchBar> \| null>(null)` at line 166 where `useTemplateRef("searchBarRef")` is the 3.5 idiom — and the live twin `SlugEditLayer.vue:14` already uses `useTemplateRef`. The two surfaces disagree on the house idiom. |
| 1 · no god modules | satisfied | 243 lines, one concern. |
| 8 · `verbatimModuleSyntax` | satisfied | the only type-only import on the file's dependency edge (`useSlugMigration.ts:6`) is correctly `import type`. |

The **measured** consequence of edict 4 + 5 together: `probes/c4-tap.mjs` reports
`hasDataControlTarget: false` for the hand-rolled menu trigger, and the live stylesheet carries

```css
@media (pointer: coarse) {
  [data-control-target] { min-block-size: var(--touch-target, 2.75rem);
                          min-inline-size: var(--touch-target, 2.75rem); }
}
```

glass-ui's `Button` stamps `data-control-target` when `iconOnly` is set (`dist/button-Bu9F4uU6.js:54`).
The hand-rolled button does not, so on a touch device it stays at its measured **22 × 22 px** while
every design-system control in the app grows to 44 px. Hand-rolling the button is not a style
preference — it is how the component opted out of the design system's touch-target guarantee.

---

## 6 · Visual receipt

`visual/shots/safari-desktop-light/palettes.png`, read directly. The identity surface on that route
is the **dock**: a `Login` pill and an `@mbabb` pill in the floating glass dock at the top. There is
no slug bar in the pane, no three-dot account menu, no slug pill — `pills: 0` in the live DOM census.
The screenshot is consistent with §1.1 on all four instruments: the component this seat audits does
not render anywhere in the shipped application.

The route's console is clean (`consoleErr: 0` in `REPORT.md:120`) and `overflowX: 0` — but note that
C-33's 989 px error line can only be produced by a code path that never executes, so its absence
from the overflow census is not evidence of its absence from the code.

---

## 7 · Ranked findings (carried forward + pass 4)

| id | severity | one-line | pass |
|---|---|---|---|
| **C-2** | **BLOCKER** | `@submit.prevent` lands on `SearchBar`'s inner `<input>` (`inheritAttrs:false` + attrs spread onto the input) — `0` handler calls on a real form submit; the unprevented native submit runs the browser's submit algorithm | 1 · re-proven 2 · vendor-source + dispatch 4 |
| **C-1** | **BLOCKER** | mounted on zero routes / zero value-position importers / zero of 60 captures; `slugBarRef` never bound ⇒ **every login failure is silent in the live app** — reproduced end-to-end: no text, no live region, no console, credential discarded, focus dropped to `BODY` | 1 · 2 · **live E2E 4** |
| **C-30** | **MAJOR** | **NEW** — `ADMIN_TOKEN=<four-word token>` is stripped then classified as a *user slug* ⇒ the admin secret is POSTed to the unauthenticated `/sessions/login` as `{"slug":…}`, and admin login is unreachable for that whole token class; live in `SlugEditLayer.vue` too | **4** |
| **C-31** | **MAJOR** | **NEW** — the credential field is `<input type="search">` with no `name`/`autocomplete`/`autocapitalize`/`autocorrect`/`spellcheck`/`inputmode`/`aria-label`/`aria-describedby`: UA search-history retention of an admin token, iOS capitalization breaking the (un-lowercased) admin branch, spellchecker exposure, no accessible name | **4** |
| **C-5** | MAJOR | negated classifier ⇒ any non-4-word input is an admin token (`"test-user"`, `"-a-b-c-"` measured) | 1 · 2 · table 4 |
| **C-3** | MAJOR | focus never reaches the input — `nextTick` at ~0 ms vs a measured 200 ms `out-in` leave | 1 · 2 · measured 4 |
| **C-4** | MAJOR | `slugSwitching` round-trips inside one synchronous turn ⇒ spinner / in-flight name / double-submit guard all unrenderable | 1 |
| **C-21** | MAJOR | the field is unmounted and the credential discarded in the same turn as the emit ⇒ the async error can never reach the field it describes | 2 · `fieldValue: ""` 4 |
| **C-20** | MAJOR | `aria-haspopup="dialog"` vs the rendered `role="group"`; four menu buttons with no menu semantics or arrow-key nav; focus never restored on cancel | 2 |
| **C-6** | MAJOR | the slug input has no accessible name (placeholder only) | 1 · census 4 |
| **C-7** | MAJOR | error `<p>` has no `role="alert"`/`aria-live`; input has no `aria-describedby`/`aria-invalid` | 1 · live-region census 4 |
| **C-8** | MAJOR | identity pill is a `tabIndex:-1` `<span>` behind a hover-only root ⇒ unreachable by keyboard and touch | 1 · 2 · census 4 |
| **C-9** | MAJOR | `variant="ghost"` is not a glass-ui 7 `Button` prop ⇒ junk DOM attribute; 51 sites repo-wide (pass-3 correction); both gates EXIT=0 | 1 · 2 · 3 · contract 4 |
| **C-18** | MAJOR | zero tests on either slug surface; the e2e fixture seeds `localStorage` and pins `/sessions/login` to 200; **eight** named mutations keep every gate green | 1 · 2 · widened 4 |
| **C-19** | MAJOR | the slug protocol is duplicated in `SlugEditLayer.vue` and the copies have drifted | 1 |
| **C-26** | MAJOR | a rejected parent handler escapes to the global error channel (un-awaited emit) | 3 |
| **C-10** | MINOR | account-menu trigger **measured 22 × 22 px** against the live cascade (WCAG 2.2 §2.5.8 = 24); mechanism: no `data-control-target`, so the coarse-pointer 44 px rule never applies | 1 · 2 · **mechanism 4** |
| **C-11** | MINOR | uncancelled 50 ms `setTimeout` across unmount; the delay is itself C-3's cause | 1 · 4 |
| **C-12** | MINOR | dead public surface: unused **required** prop `hasSavedPalettes`, never-emitted `copy`, 2 of 3 `defineExpose` members unconsumed | 1 |
| **C-13** | MINOR | `void writeClipboard(...)` discards the discriminated `{ ok, reason }` result | 1 |
| **C-14** | MINOR | no cancel path clears `slugError` ⇒ the error persists into default mode | 1 · 2 · replay 4 |
| **C-33** | MINOR | **NEW** — the error line measures **989 px** at a realistic server message, `whitespace-nowrap`, hung `-16 px` below a measured 36 px bar | **4** |
| **C-32** | MINOR | **NEW** — `active:scale-*` on all six controls is excluded from the resolved `transition-property` (colors only, 0.2 s) ⇒ the press snaps while the colour eases | **4** |
| **C-36** | MINOR | **NEW** — the popover trigger renders `aria-controls=""` (invalid IDREF) — glass-ui/reka-ui relay | **4** |
| **C-23** | MINOR | `ADMIN_TOKEN=`/quote-stripping is a masking fallback (edict 2), called twice per submit | 2 |
| **C-22** | MINOR | the hover/touch root is chosen once from a non-reactive `matchMedia` read | 2 |
| **C-16** | MINOR | unreachable `catch` holding the substring mapping S.W2 disproved and replaced | 1 |
| **C-28** | MINOR | the focus call is double-optional-chained, so its own failure is unobservable | 3 |
| **C-37** | MINOR | **NEW · HYPOTHESIS** — `SearchBar`'s hand-rolled controlled input has no IME composition guard | **4** |
| **C-34** | INFO | **NEW** — 4 of 8 `/#/palettes` a11y rows are artifacts: measured `opacityChain: 0`, `inert`, `aria-hidden`, focus does not land. Correction to the shared visual REPORT | **4** |
| **C-35** | INFO | **NEW** — pass 3's "reproducible, committed" harness does not run (`include` → a dead scratchpad path); replaced and verified | **4** |
| **C-17** | INFO | design system reached via `demo/ui/*` pass-through shims instead of published subpaths | 1 |
| **C-24** | INFO | the e2e fixture's `FAKE_SLUG = "test-user"` would be classified as an admin token | 2 |
| **C-25** | INFO | two hypotheses killed: prop-shadowing does not mis-compile; `defineExpose` **is** ref-unwrapped | 2 |
| **C-29** | INFO | the feature's public seam is itself unreachable | 3 |
| — | INFO | six negative proofs (§3): no dead classes · `vj-morph` real at 0.2 s · no ReDoS (0.248 ms on 900 KB) · not shipped bytes (type-only import) · no hidden-focusable trap · four of six named local hazards structurally absent | **4** |

---

## 8 · Disposition

The strongest defect is **C-2**: the component's only submit path is bound to a node that never
receives the event, because `SearchBar` sets `inheritAttrs: false` and spreads `$attrs` onto its
inner `<input>` — so `@submit.prevent` decorates the input and the `<form>` runs the browser's
native submit algorithm unprevented. The component cannot perform its one function, and the reason
is a semantic mismatch (a search bar pressed into service as a login form) rather than a typo.
Everything else in this file — no accessible name, no input hygiene, the unrenderable in-flight
state, the shape-only classifier — descends from that same mismatch.

The costliest defect is **C-1 + C-30 together**, because they are not confined to a dead file:
`useSlugMigration.ts` still routes every login failure into this component's `setError`, so the
shipped application's login error channel is a `?.` against a permanent `null` (reproduced live: a
failed login produces *nothing* in any channel), and the shape-only classifier the orphan pioneered
was **copied verbatim** into the live `SlugEditLayer.vue`, where it will POST an operator's admin
token to the public login endpoint as a slug.

The idiomatic cure is one transposition, not a patch series:

1. **Delete `PaletteSlugBar.vue`, its `slug/` barrel and the `PaletteSlugBar` re-export.** It has
   been documented as dead since tranche D/E and has not rendered since. Nothing but a type import
   points at it.
2. **Give `useSlugMigration` a real error sink.** Replace `slugBarRef` with a `Ref<string | null>`
   the composable owns and the live surface renders in a `role="alert"` region. The composable
   already has the typed `ApiProblem.status` branch (`S.W2`); it only lacks somewhere to put the
   words. Deleting the orphan without this step deletes the *evidence* of the bug and keeps the bug.
3. **Move the classification decision into `demo/platform/auth/` as one exported predicate** that
   *decides* rather than falling back: an `ADMIN_TOKEN=`-prefixed input is an admin token by
   declaration; a bare input is a slug only if it matches the generator's alphabet; anything else is
   an explicit rejection. This kills C-5, C-23, C-24, C-30 and half of C-19 in a single move.
4. **Rebuild the surviving surface's field out of the design system's form primitive**, not
   `SearchBar` — which kills C-2, C-6, C-31 and C-32 by construction, because `Button`/`Input`
   already carry `data-control-target`, `tap-squish`, `name`/`required` and a real label seam.
5. **Land the born-RED test first**: a failed `/sessions/login` must render an announced error. That
   single assertion is red today against both the orphan and the shipped surface, and it closes the
   vacuous gate that let eight mutations through.

No source edits land from this seat. All artifacts are under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/`.

---

## 9 · Probe artifacts (pass 4)

| path | what it is |
|---|---|
| `probes/c4-slugbar.probe.test.ts` | 18-probe jsdom harness; mounts the real SFC against real glass-ui 7 |
| `probes/c4-vitest.config.ts` | self-resolving config (fixes C-35); verified green from the repo path |
| `probes/c4-live.mjs` | live Chromium utility-class + token census, live input-attribute census, slug-bar marker census |
| `probes/c4-live-login.mjs` | the end-to-end silent-login-failure repro + the inert/aria-hidden dock measurement (C-34) |
| `probes/c4-tap.mjs` | injects the file's exact class strings into the live cascade; tap-target, transition and error-line measurements |
